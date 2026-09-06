/**
 * Feishu (Lark) notification — reads manifest.json and sends a card message
 * with links to the latest reports. Skips silently if secrets are not set.
 *
 * Required env vars:
 *   FEISHU_WEBHOOK_URLS — comma-separated list of custom bot webhook URLs
 *                         (also accepts legacy FEISHU_WEBHOOK_URL for one URL)
 * Optional:
 *   FEISHU_SECRET       — custom bot signature secret; when set, every request
 *                         carries `timestamp` + `sign` (HMAC-SHA256)
 *   PAGES_URL           — GitHub Pages base URL (defaults to the public deployment)
 */

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { NOTIFY_LABELS } from "./i18n.ts";
import type { Highlights } from "./notify.ts";

const PAGES_URL_DEFAULT = "https://duanyytop.github.io/agents-radar";

function getWebhookUrls(): string[] {
  const raw = process.env["FEISHU_WEBHOOK_URLS"] ?? process.env["FEISHU_WEBHOOK_URL"] ?? "";
  return raw
    .split(",")
    .map((u) => u.trim())
    .filter(Boolean);
}

/**
 * Custom-bot signature (official algorithm): the string to sign is
 * `timestamp + "\n" + secret`, used as the HMAC-SHA256 *key* with an empty
 * message; the digest is Base64-encoded.
 */
export function computeFeishuSign(timestamp: string, secret: string): string {
  return crypto.createHmac("sha256", `${timestamp}\n${secret}`).update("").digest("base64");
}

async function sendToOneWebhook(webhookUrl: string, title: string, content: string): Promise<void> {
  const body: Record<string, unknown> = {
    msg_type: "interactive",
    card: {
      header: {
        title: { tag: "plain_text", content: title },
        template: "blue",
      },
      elements: [{ tag: "markdown", content }],
    },
  };

  // Bots with signature verification enabled reject unsigned requests.
  const secret = process.env["FEISHU_SECRET"] ?? "";
  if (secret) {
    const timestamp = String(Math.floor(Date.now() / 1000));
    body["timestamp"] = timestamp;
    body["sign"] = computeFeishuSign(timestamp, secret);
  }

  const res = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const resBody = await res.text();
    throw new Error(`Feishu API ${res.status}: ${resBody}`);
  }
}

async function sendFeishu(title: string, content: string): Promise<void> {
  const urls = getWebhookUrls();
  const results = await Promise.allSettled(urls.map((url) => sendToOneWebhook(url, title, content)));
  const failures = results.filter((r) => r.status === "rejected");
  if (failures.length) {
    const msgs = failures.map((r) => (r as PromiseRejectedResult).reason);
    console.error(`[feishu] ${failures.length}/${urls.length} webhook(s) failed:`, msgs);
    if (failures.length === urls.length) throw new Error("All Feishu webhooks failed");
  }
}

export function buildFeishuMessage(
  date: string,
  reports: string[],
  pagesUrl?: string,
  highlights?: Highlights | null,
): string {
  // `||` (not `??`): the workflow injects `${{ vars.PAGES_URL }}`, which is an
  // empty string when the var is unset — that must fall back to the default.
  const PAGES_URL = ((pagesUrl ?? process.env["PAGES_URL"]) || PAGES_URL_DEFAULT).replace(/\/$/, "");
  const ordered = reports.filter((r) => !r.endsWith("-en"));
  const lines: string[] = [`📡 **agents-radar · ${date}**`];

  const zhHighlights = highlights?.zh ?? {};
  const enHighlights = highlights?.en ?? {};

  for (const r of ordered) {
    const zhLabel = NOTIFY_LABELS[r]?.zh ?? r;
    const zhUrl = `${PAGES_URL}/#${date}/${r}`;
    const enKey = `${r}-en`;

    lines.push("");
    if (reports.includes(enKey)) {
      const enLabel = NOTIFY_LABELS[r]?.en ?? "EN";
      const enUrl = `${PAGES_URL}/#${date}/${enKey}`;
      lines.push(`• [${zhLabel}](${zhUrl})  ·  [${enLabel}](${enUrl})`);
    } else {
      lines.push(`• [${zhLabel}](${zhUrl})`);
    }

    // Fall back to en when a report's zh highlights are missing so a
    // single-language failure never blanks the message.
    const items = zhHighlights[r] ?? enHighlights[r];
    if (items?.length) {
      for (const h of items) {
        lines.push(`  ◦ ${h}`);
      }
    }
  }

  lines.push(`\n[🌐 Web UI](${PAGES_URL})  ·  [⊕ RSS](${PAGES_URL}/feed.xml)`);
  return lines.join("\n");
}

async function main(): Promise<void> {
  const urls = getWebhookUrls();
  if (!urls.length) {
    console.log("[feishu] FEISHU_WEBHOOK_URLS not set — skipping.");
    return;
  }

  if (!fs.existsSync("manifest.json")) {
    console.log("[feishu] manifest.json not found — skipping.");
    return;
  }

  const { dates } = JSON.parse(fs.readFileSync("manifest.json", "utf-8")) as {
    dates: { date: string; reports: string[] }[];
  };

  const latest = dates?.[0];
  if (!latest) {
    console.log("[feishu] manifest is empty — skipping.");
    return;
  }
  const { date, reports } = latest;

  let highlights: Highlights | null = null;
  const highlightsPath = path.join("digests", date, "highlights.json");
  if (fs.existsSync(highlightsPath)) {
    try {
      highlights = JSON.parse(fs.readFileSync(highlightsPath, "utf-8")) as Highlights;
    } catch {
      console.log("[feishu] Failed to parse highlights.json — sending without highlights.");
    }
  }

  const title = `📡 agents-radar · ${date}`;

  const content = buildFeishuMessage(date, reports, undefined, highlights);

  console.log(`[feishu] Sending to ${urls.length} webhook(s) for ${date} (${reports.length} reports)…`);
  await sendFeishu(title, content);
  console.log("[feishu] Done!");
}

// Only auto-send when run directly (`tsx src/feishu.ts`). Guard prevents an
// accidental send when another module imports from here.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e: unknown) => {
    console.error("[feishu]", e instanceof Error ? e.message : e);
    process.exit(1);
  });
}
