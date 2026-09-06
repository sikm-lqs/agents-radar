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

  constructor(opts: { apiKey?: string; baseURL?: string; model: string }) {
    this.model = opts.model;
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
    });
    const text = response.choices[0]?.message?.content;
    if (!text) throw new Error(`Unexpected empty response from ${this.name}`);
    return stripThinkBlocks(text);
  }
}
