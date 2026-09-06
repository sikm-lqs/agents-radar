/**
 * LLM invocation, file I/O, and GitHub issue creation helpers.
 */

import fs from "node:fs";
import path from "node:path";
import { type Lang, FOOTER } from "./i18n.ts";
import { buildTranslationPrompt } from "./prompts.ts";
import { sleep } from "./date.ts";

// ---------------------------------------------------------------------------
// LLM token budget constants
// ---------------------------------------------------------------------------

export const LLM_TOKENS_DEFAULT = 4096;
export const LLM_TOKENS_TRENDING = 6144;
/** Table-formatted listing reports (HN, PH, ArXiv, HF, Community, News) need extra
 *  headroom for the multi-row tables plus 2-sentence summaries. */
export const LLM_TOKENS_LISTING = 6144;
export const LLM_TOKENS_WEB = 8192;
import { type LlmProvider, type ProviderName, createProvider } from "./providers/index.ts";

const provider: LlmProvider = createProvider();

/**
 * Optional second provider, tried once when the primary has exhausted its
 * retry ladder. Configured via LLM_FALLBACK_PROVIDER (the workflow runs
 * minimax as primary with glm as fallback). Lazily created and cached;
 * `undefined` means "not yet resolved", `null` means disabled.
 */
let fallbackProvider: LlmProvider | null | undefined;

function getFallbackProvider(): LlmProvider | null {
  if (fallbackProvider === undefined) {
    const name = process.env["LLM_FALLBACK_PROVIDER"];
    if (!name) {
      fallbackProvider = null;
    } else {
      try {
        fallbackProvider = createProvider(name as ProviderName);
      } catch (err) {
        console.error(`[llm] Invalid LLM_FALLBACK_PROVIDER "${name}" — fallback disabled: ${err}`);
        fallbackProvider = null;
      }
    }
  }
  return fallbackProvider;
}

// ---------------------------------------------------------------------------
// Concurrency limiter — prevents rate-limit (429) errors when many LLM calls
// are fired in parallel. At most LLM_CONCURRENCY requests are in-flight at
// any given time; the rest queue and run as slots free up.
// ---------------------------------------------------------------------------

const LLM_CONCURRENCY = 5;
let llmSlots = LLM_CONCURRENCY;
const llmQueue: Array<() => void> = [];

function acquireSlot(): Promise<void> {
  if (llmSlots > 0) {
    llmSlots--;
    return Promise.resolve();
  }
  return new Promise((resolve) => llmQueue.push(resolve));
}

function releaseSlot(): void {
  const next = llmQueue.shift();
  if (next) {
    next();
  } else {
    llmSlots++;
  }
}

// ---------------------------------------------------------------------------
// LLM
// ---------------------------------------------------------------------------

// ---------------------------------------------------------------------------
// Health accounting
//
// Every caller of callLlm() degrades gracefully — a failed summary becomes a
// "generation failed" notice, a failed translation falls back to English. That
// is right per report and wrong for the run as a whole: on 2026-09-03 all ~30
// calls failed, and the pipeline cheerfully published a digest of placeholders
// and reported success. These counters let main() tell "one report is thin"
// apart from "the provider was down", and abort in the second case.
// ---------------------------------------------------------------------------

export const llmStats = { attempted: 0, failed: 0 };

/** Fraction of LLM calls that exhausted their retries. 0 when none were made. */
export function llmFailureRatio(): number {
  return llmStats.attempted === 0 ? 0 : llmStats.failed / llmStats.attempted;
}

/** Test seam — the counters and fallback cache are module state shared by the whole run. */
export function resetLlmStats(): void {
  llmStats.attempted = 0;
  llmStats.failed = 0;
  fallbackProvider = undefined;
}

/**
 * Fraction of failed calls above which the run is a total loss rather than a
 * degraded one. Half is deliberately far from the noise floor: a bad-but-usable
 * day loses one or two calls out of forty (~5%), an outage loses all of them.
 */
const LLM_ABORT_RATIO = 0.5;

/**
 * Below this many calls the ratio is meaningless — two failures out of three on
 * a very quiet day must not kill a run that had almost nothing to summarize.
 */
const LLM_MIN_SAMPLES = 5;

export function llmHealthLine(): string {
  const { attempted, failed } = llmStats;
  return `${failed}/${attempted} LLM calls failed (${Math.round(llmFailureRatio() * 100)}%)`;
}

/**
 * Throw when the LLM provider is effectively down.
 *
 * Every individual call site degrades gracefully, so without this check a total
 * outage still walks the whole pipeline: it writes placeholder reports, commits
 * them, opens eight GitHub issues and pushes a Telegram message with no
 * highlights — and exits 0, so nothing alerts. That is exactly what happened on
 * 2026-09-03. Throwing makes `pnpm start` exit non-zero, which fails the job and
 * skips the commit, notify and issue steps, so the day is simply missing rather
 * than published wrong — and a manual re-dispatch can still fill it in.
 */
export function assertLlmHealthy(stage: string): void {
  if (llmStats.attempted < LLM_MIN_SAMPLES) return;
  if (llmFailureRatio() < LLM_ABORT_RATIO) return;
  throw new Error(
    `LLM provider appears to be down — ${llmHealthLine()} by the end of the ${stage} phase. ` +
      `Aborting before anything is published; re-run this workflow once the provider recovers.`,
  );
}

/**
 * Log the final tally, and surface it on the Actions run page when calls were
 * lost. A run below the abort ratio still publishes, but a report that quietly
 * came back thin should not need a log dive to notice.
 */
export function reportLlmHealth(): void {
  const line = llmHealthLine();
  if (llmStats.failed === 0) {
    console.log(`  [llm] ${line}`);
    return;
  }
  console.warn(`  [llm] ${line} — some reports are degraded`);
  const summaryPath = process.env["GITHUB_STEP_SUMMARY"];
  if (summaryPath) {
    fs.appendFileSync(summaryPath, `⚠️ **Degraded LLM output** — ${line}\n`, "utf-8");
  }
}

/**
 * Provider rate limits are enforced per minute, so the old 5/10/20 s ladder
 * never outlived the window — under sustained GLM load on 2026-09-06, 21 of 61
 * calls exhausted it and failed. Four rungs spanning 5 minutes cover a
 * per-minute limit window with room to spare.
 */
const RETRY_429_LADDER_MS = [15_000, 45_000, 90_000, 150_000] as const;
const MAX_RETRIES_429 = RETRY_429_LADDER_MS.length;
/**
 * Connection failures get a much longer ladder than 429s. A rate limit is the
 * provider pushing back on *us*; an unreachable endpoint is a network outage
 * that lasts minutes and clears on its own.
 *
 * On 2026-09-03 the DashScope cn-beijing endpoint was unreachable from the
 * GitHub runner for the entire LLM phase (00:36–00:40 UTC). Every one of the
 * ~30 calls burned its 5+10+20 s ladder inside the first 35 s, gave up, and the
 * run published a digest built entirely out of "generation failed" placeholders.
 * Six retries capped at 60 s cover ~3 min of outage instead of 35 s.
 */
const MAX_RETRIES_CONNECTION = 6;
const RETRY_BASE_MS = 5_000;
/** Backoff cap. Uncapped, attempt 6 would sleep 160 s and blow the job timeout. */
const RETRY_MAX_MS = 60_000; // ladder: 5, 10, 20, 40, 60, 60 -> 195 s of cover

export function is429(err: unknown): boolean {
  return (err as { status?: number })?.status === 429 || String(err).includes("429");
}

/** Node/undici error codes for a connection that never carried a request. */
const CONNECTION_ERROR_CODES = new Set([
  "ETIMEDOUT",
  "ECONNRESET",
  "ECONNREFUSED",
  "ENOTFOUND",
  "EAI_AGAIN",
  "EPIPE",
  "UND_ERR_CONNECT_TIMEOUT",
  "UND_ERR_HEADERS_TIMEOUT",
  "UND_ERR_SOCKET",
]);

/**
 * True when the request never reached the model — DNS, TCP or TLS failed.
 *
 * The signal is buried: the OpenAI SDK reports these as `APIConnectionError`
 * with `status: undefined`, wrapping a `TypeError: fetch failed`, wrapping the
 * `AggregateError` that actually carries `code`. So walk the cause chain rather
 * than inspecting only the outermost error. The depth cap guards against a
 * self-referencing chain.
 */
export function isConnectionError(err: unknown): boolean {
  for (let cur: unknown = err, depth = 0; cur != null && depth < 5; depth++) {
    const e = cur as { name?: string; code?: string; message?: string; cause?: unknown };
    if (e.name === "APIConnectionError" || e.name === "APIConnectionTimeoutError") return true;
    if (typeof e.code === "string" && CONNECTION_ERROR_CODES.has(e.code)) return true;
    if (typeof e.message === "string" && /fetch failed|Connection error/i.test(e.message)) return true;
    cur = e.cause;
  }
  return false;
}

/**
 * Retry rate limits and connection failures; let everything else through.
 *
 * A 4xx that is not 429 will fail identically on the next attempt, and retrying
 * a 5xx risks a duplicate generation that already billed.
 */
export function isRetryable(err: unknown): boolean {
  return is429(err) || isConnectionError(err);
}

/** Retry ladder for a single provider: 429s get the minute-window ladder,
 *  connection failures the longer exponential one; everything else throws. */
async function callWithRetries(p: LlmProvider, prompt: string, maxTokens: number): Promise<string> {
  for (let attempt = 0; ; attempt++) {
    await acquireSlot();
    let released = false;
    try {
      return await p.call(prompt, maxTokens);
    } catch (err) {
      const rateLimited = is429(err);
      const maxRetries = rateLimited ? MAX_RETRIES_429 : MAX_RETRIES_CONNECTION;
      if (attempt < maxRetries && isRetryable(err)) {
        releaseSlot();
        released = true;
        const wait = rateLimited
          ? RETRY_429_LADDER_MS[attempt]!
          : Math.min(RETRY_BASE_MS * 2 ** attempt, RETRY_MAX_MS);
        const reason = rateLimited ? "429" : "connection error";
        console.error(`[llm] ${reason} — retry ${attempt + 1}/${maxRetries} in ${wait / 1000}s...`);
        await sleep(wait);
        continue;
      }
      throw err;
    } finally {
      if (!released) releaseSlot();
    }
  }
}

/** One attempt through the concurrency limiter — used for the fallback call. */
async function callOnce(p: LlmProvider, prompt: string, maxTokens: number): Promise<string> {
  await acquireSlot();
  try {
    return await p.call(prompt, maxTokens);
  } finally {
    releaseSlot();
  }
}

export async function callLlm(prompt: string, maxTokens = LLM_TOKENS_DEFAULT): Promise<string> {
  llmStats.attempted++;
  try {
    return await callWithRetries(provider, prompt, maxTokens);
  } catch (err) {
    // The fallback provider gets exactly one attempt: the primary already
    // burned minutes on its ladder, and a provider that is down is down.
    const fallback = getFallbackProvider();
    if (fallback) {
      console.error(
        `[llm] ${provider.name} exhausted its retries — trying fallback "${fallback.name}" once.`,
      );
      try {
        return await callOnce(fallback, prompt, maxTokens);
      } catch (fallbackErr) {
        console.error(`[llm] fallback "${fallback.name}" also failed: ${fallbackErr}`);
      }
    }
    llmStats.failed++;
    throw err;
  }
}

// ---------------------------------------------------------------------------
// Translation
// ---------------------------------------------------------------------------

/**
 * Translate a finished English report body into Chinese.
 *
 * Report bodies are generated once in English and translated from there. The
 * previous design ran the whole pipeline twice — once per language — over the
 * same GitHub/API data, which doubled the bill for identical information. A
 * translation prompt carries only the finished report instead of the raw item
 * dump, so it costs a fraction of the input tokens.
 *
 * `maxTokens` should match the budget the English body was generated with, or
 * a long report gets truncated mid-translation.
 *
 * Falls back to the English text on failure: a Chinese report that is partly
 * English still carries the day's information, an empty one carries none.
 */
export async function translateToZh(text: string, maxTokens = LLM_TOKENS_DEFAULT): Promise<string> {
  if (!text.trim()) return text;
  try {
    return await callLlm(buildTranslationPrompt(text), maxTokens);
  } catch (err) {
    console.error(`[translate] Failed, falling back to English: ${err}`);
    return text;
  }
}

// Matches ASCII control characters U+0000–U+001F. Built from a string so no
// literal control character appears in the source (keeps it readable + lint-clean).
// eslint-disable-next-line no-control-regex
const CONTROL_CHARS = new RegExp("[\\u0000-\\u001F]", "g");

/**
 * Parse JSON returned by an LLM. Strips markdown code fences and replaces raw
 * control characters with spaces before parsing. The model occasionally emits
 * an unescaped control character (e.g. a bare newline) inside a string literal,
 * which is illegal in JSON and makes `JSON.parse` throw "Bad control character
 * in string literal". Control chars outside strings are only insignificant
 * whitespace, so replacing them is safe either way.
 *
 * If the strict parse still fails, the payload is repaired once (drop any prose
 * wrapper around the JSON, strip trailing commas) and retried — a single stray
 * character (e.g. a trailing comma before `}`) used to wipe an entire language's
 * highlights.json.
 */
export function parseLlmJson<T = unknown>(raw: string): T {
  const cleaned = raw
    .replace(/```json?\n?/g, "")
    .replace(/```/g, "")
    .replace(CONTROL_CHARS, " ")
    .trim();
  try {
    return JSON.parse(cleaned) as T;
  } catch (err) {
    const repaired = repairJson(cleaned);
    if (repaired !== cleaned) return JSON.parse(repaired) as T;
    throw err;
  }
}

/**
 * Best-effort repair of common LLM JSON defects: narrow to the outermost
 * object/array (dropping surrounding prose) and remove trailing commas before a
 * closing brace or bracket. Returns the input unchanged when nothing applies.
 */
function repairJson(s: string): string {
  const first = s.search(/[{[]/);
  const lastBrace = s.lastIndexOf("}");
  const lastBracket = s.lastIndexOf("]");
  const last = Math.max(lastBrace, lastBracket);
  const narrowed = first >= 0 && last > first ? s.slice(first, last + 1) : s;
  return narrowed.replace(/,(\s*[}\]])/g, "$1");
}

// ---------------------------------------------------------------------------
// File output
// ---------------------------------------------------------------------------

export function saveFile(content: string, ...segments: string[]): string {
  const filepath = path.join("digests", ...segments);
  fs.mkdirSync(path.dirname(filepath), { recursive: true });
  fs.writeFileSync(filepath, content, "utf-8");
  return filepath;
}

export function autoGenFooter(lang: Lang = "zh"): string {
  const digestRepo = process.env["DIGEST_REPO"] ?? "";
  if (!digestRepo) return "";
  return `\n\n---\n*${FOOTER.autoGen[lang]} [agents-radar](https://github.com/${digestRepo})${lang === "en" ? "." : " 自动生成。"}*`;
}
