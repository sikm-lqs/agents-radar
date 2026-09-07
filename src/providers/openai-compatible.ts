/**
 * Base class for OpenAI-compatible providers.
 *
 * Shared by OpenAI, GitHub Copilot, and OpenRouter providers.
 */

import OpenAI from "openai";
import type { LlmProvider } from "./types.ts";

/**
 * Some models (observed: MiniMax-M3) inline their reasoning into the content
 * field as `<think>...</think>` blocks — possibly several, possibly multiline,
 * not necessarily at the start. Left in, they leak raw chain-of-thought into
 * the generated markdown reports (seen in the 2026-09-07 digest files).
 * Reasoning models that use a separate `reasoning_content` field (GLM) are
 * unaffected — that field never lands in `content`.
 */
function stripThinkBlocks(text: string): string {
  return text.replace(/<think>[\s\S]*?<\/think>/g, "").trim();
}

export abstract class OpenAICompatibleProvider implements LlmProvider {
  abstract readonly name: string;
  protected readonly client: OpenAI;
  protected readonly model: string;
  private readonly extraBody?: Record<string, unknown>;

  constructor(opts: {
    apiKey?: string;
    baseURL?: string;
    model: string;
    extraBody?: Record<string, unknown>;
  }) {
    this.model = opts.model;
    this.extraBody = opts.extraBody;
    this.client = new OpenAI({
      apiKey: opts.apiKey,
      baseURL: opts.baseURL,
    });
  }

  async call(prompt: string, maxTokens: number): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: this.model,
      max_completion_tokens: maxTokens,
      messages: [{ role: "user", content: prompt }],
      ...this.extraBody,
    } as OpenAI.ChatCompletionCreateParamsNonStreaming);
    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error(`Unexpected empty response from ${this.name}`);
    const cleaned = stripThinkBlocks(text);
    // A response that is *only* think blocks (reasoning model spent the whole
    // completion budget thinking) must be treated as a failure so the retry /
    // fallback chain kicks in — returning "" would silently save an empty
    // report body (seen in the 2026-09-07 ai-trending zh report).
    if (!cleaned) throw new Error(`Empty response from ${this.name} after stripping think blocks`);
    return cleaned;
  }
}
