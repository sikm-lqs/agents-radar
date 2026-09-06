/**
 * GLM provider — Zhipu AI (BigModel) via its OpenAI-compatible endpoint.
 *
 * Env vars:
 *   GLM_API_KEY   - API key
 *   GLM_BASE_URL  - endpoint override (default: the coding plan endpoint below)
 *   GLM_MODEL     - model name (default: glm-5.3)
 *
 * glm-5.3 is a reasoning model: responses carry an extra `reasoning_content`
 * field, but the final answer still lands in `choices[0].message.content`,
 * which is what OpenAICompatibleProvider reads — no special handling needed.
 */

import { OpenAICompatibleProvider } from "./openai-compatible.ts";

const GLM_BASE_URL = "https://open.bigmodel.cn/api/coding/paas/v4";

export class GlmProvider extends OpenAICompatibleProvider {
  readonly name = "glm";

  constructor(opts?: { apiKey?: string; baseURL?: string; model?: string }) {
    super({
      apiKey: opts?.apiKey ?? process.env["GLM_API_KEY"],
      baseURL: opts?.baseURL ?? process.env["GLM_BASE_URL"] ?? GLM_BASE_URL,
      model: opts?.model ?? process.env["GLM_MODEL"] ?? "glm-5.3",
    });
  }
}
