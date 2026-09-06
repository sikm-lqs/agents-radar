/**
 * MiniMax provider — MiniMax via its OpenAI-compatible endpoint.
 *
 * Env vars:
 *   MINIMAX_API_KEY   - API key
 *   MINIMAX_BASE_URL  - endpoint override (default: the endpoint below)
 *   MINIMAX_MODEL     - model name (default: MiniMax-M3)
 *
 * MiniMax-M3 is not a reasoning model and showed no 429s under sustained load
 * in load testing (25 requests in 113 s), which is why the workflow uses it as
 * the primary provider with GLM as the fallback.
 */

import { OpenAICompatibleProvider } from "./openai-compatible.ts";

const MINIMAX_BASE_URL = "https://api.minimax.cn/v1";

export class MinimaxProvider extends OpenAICompatibleProvider {
  readonly name = "minimax";

  constructor(opts?: { apiKey?: string; baseURL?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["MINIMAX_API_KEY"],
      baseURL: opts?.baseURL ?? process.env["MINIMAX_BASE_URL"] ?? MINIMAX_BASE_URL,
      model: opts?.model ?? process.env["MINIMAX_MODEL"] ?? "MiniMax-M3",
    });
  }
}
