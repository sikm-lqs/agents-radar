# AI Infrastructure Digest 2026-09-12

> Generated: 2026-09-12 11:30 UTC | Projects covered: 9

- [vLLM](https://github.com/vllm-project/vllm)
- [SGLang](https://github.com/sgl-project/sglang)
- [llama.cpp](https://github.com/ggml-org/llama.cpp)
- [Ollama](https://github.com/ollama/ollama)
- [LiteLLM](https://github.com/BerriAI/litellm)
- [Unsloth](https://github.com/unslothai/unsloth)
- [Claude Code Router](https://github.com/musistudio/claude-code-router)
- [CC Switch](https://github.com/farion1231/cc-switch)
- [New API](https://github.com/QuantumNous/new-api)

---

## Cross-Project Comparison

# Cross-Project Comparison Report — 2026-09-12

## 1. Ecosystem Overview

The ecosystem's center of gravity today is unmistakably **DeepSeek-V4.1/V4.1-Flash maturation**: between vLLM, SGLang, and CC Switch, the model dominates kernel work (MegaMoE fusion, FP4 KV, NVFP4 GEMMs), the bug queues, and even gateway capability flags. A second structural shift is the arrival of **hybrid linear-attention architectures** (GLM-5.3's KDA+DSA layers, Qwen3.5/4-Next Gated DeltaNet) as mainstream workloads rather than exotic ones — llama.cpp shipped 320B-class hybrid support before the datacenter engines stabilized it. Meanwhile the **gateway layer is professionalizing fast** (billing expressions, auth-path optimization, Responses-API convergence), and the day's most operationally dangerous findings across all layers share one signature: **silent failure** — wrong numerics, zero-acceptance drafts, cross-request KV contamination, and 30× slowdowns that never raise an error.

## 2. Activity Comparison

| Project | Layer | Issues surfaced* | PRs surfaced* | Release status |
|---|---|---|---|---|
| **vLLM** | Serving engine | ~17 | ~13 | No release; heavy merged-candidate flow |
| **SGLang** | Serving engine | ~18 | ~20 | No release; CI tracker: 2 broken / 14 flaky tests |
| **llama.cpp** | Local runtime / kernels | ~14 | ~23 | **10 builds in 24h** (b10909→b10927) |
| **Ollama** | Local runtime / distribution | ~14 | ~15 | No release; ~12 PRs in flight |
| **LiteLLM** | Enterprise gateway | ~30 (21 open) | ~11 | No release; ≥1.84.0 urged (CVEs in 1.83.x) |
| **Unsloth** | Fine-tuning | ~14 | ~16 | No release; **main CI red ~24h**, ~25 PRs blocked |
| **Claude Code Router** | Dev-tool router | 3 | 4 | No release; low-volume, fix-oriented day |
| **CC Switch** | Desktop provider switcher | ~17 | ~13 | **v3.20.3 shipped** (Kimi → native Responses) |
| **New API** | Gateway / billing platform | ~10 | ~9 | **v1.0.0-rc.37 shipped** (pricing overhaul) |

\* Counts are items surfaced in today's digests, not total repo activity. llama.cpp remains the release-velocity outlier (rolling builds); SGLang and vLLM carry the deepest issue queues tied to new silicon and new models; LiteLLM's open-issue load skews toward production/enterprise failure modes rather than model support.

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | Gateways |
|---|---|---|---|---|---|
| **DeepSeek-V4.1(-Flash)** | Maturing: H20 crash fix (#56598), SM120 geometry (#56509), MegaMoE fusion (#56568) | Maturing: NVFP4 W4A16 opt-in (#39210), FP4-KV proposal (#38902); 2 new bugs (#39193, #39173) | — | — | CC Switch: multimodal flag bug (#7308) |
| **GLM-5.3(-Flash), 320B hybrid KDA+DSA** | Accuracy collapse on MI350 (#54924) | Crash w/ disagg+dp-attn+spec (#39072) | **Shipped** — PR #27773, text+vision | Cloud reasoning loop (#18193) | CCR token-plan poll (#1747); CC Switch Zhipu presets |
| **Qwen3.5 / 3.8 / 4-Next** | PLE n-gram + PP (#56444), prefix-cache fix (#52244) | PP encoder fix (#37204) | Qwen4-Next multi-GPU PR (#28623); RTX 5090 perf gap (#28196) | numParallel>1 unblocked (#17144); 2 parser bugs | LiteLLM Ollama tool-result bug (#40575); New API `-max` name truncation (#7201) |
| **Kimi-K3** | — | Multimodal Responses encoder (#35487); PP8 TTFT floor (#34815) | — | — | CC Switch: **native Responses** in v3.20.3 |
| **LLaDA-Image (diffusion)** | — | **Shipped** — native Diffusion serving incl. FP8 (#37907) | — | — | — |
| **GPT-5.6-sol / image-2.x** | — | — | — | — | LiteLLM Bedrock Mantle (#40849); New API billing defaults |

**Verdict:** vLLM and SGLang lead datacenter-model velocity on DeepSeek-V4.1 and Kimi-K3, but are paying for it in correctness debt. **llama.cpp is ahead on architectural breadth** — first to ship a 320B hybrid (GLM-5.3-Flash) plus new quant types (IQ2/IQ3_NL) and edge backends. Qwen has the widest cross-layer footprint, but mostly as a source of regressions. SGLang is uniquely positioned in diffusion serving. Gateways compete on provider presets and protocol translation, not architectures.

## 4. Performance Frontier

- **MoE kernels are the hot spot — with convergent evolution.** Both vLLM (#56568, zero-padding shared experts to 2560 for MegaMoE) and SGLang (#38700, shared-to-sparse fusion in DeepGEMM MegaMoE) independently landed shared-expert fusion for DSV4 this week. vLLM is also stripping runtime kernel specialization to kill first-request recompiles (#56580) and "de-JITifying" warmup (#56323).
- **KV cache is entering the FP4 era.** SGLang proposes packed FP4 KV for Hopper (#38902) and ships opt-in NVFP4 W4A16 (#39210); counterpoints are the unfused FP8-KV decode penalty (#30815) and llama.cpp's silent CPU fallback for 4-bit KV (~30× prefill slowdown, #28633).
- **Speculative decoding is now default — and the buggiest perf feature.** DFlash2 long-context regression in vLLM (71→16 tok/s, #54691), ~0% silent draft acceptance in SGLang (#39087), ngram-cache state pollution in llama.cpp (86%→11%, #27852). Perf wins exist (vLLM MTP prefix-cache restore #52244) but correctness is lagging.
- **Distributed serving:** SGLang's EPLB contention-aware batching RFC (#39192) and the PP8 disagg ~30s TTFT floor (#34815); llama.cpp adds Hexagon multi-device row-split (b10920) but hits co-resident CUDA-graph crashes (#28404).
- **Gateway-layer performance is round-trips, not FLOPS:** LiteLLM's auth collapse from ~43 Redis calls to 1 MGET (#40834/#40841) is the day's largest measurable latency win anywhere in the stack; New API dedupes health probes per (channel, model) (#7328).
- **Hardware gap watch:** DSV4.1-Flash on 8× MI355X delivers only 8.97 tok/s/GPU at concurrency 1 (vLLM #56506) — AMD's software gap remains structural despite ROCm momentum in every project.

## 5. Layer Positioning

- **Serving engines (vLLM, SGLang):** Compete on kernel-level MoE/spec-decode maturity for frontier open models. Today both carry high-severity *silent numerics* bugs on new silicon (vLLM Marlin W4A8-FP8 `</think>` loop on GB10 #49546; SGLang 25%-off FP8 GEMM on SM121 #39193) — differentiation is now reliability, not just throughput.
- **Local runtime (llama.cpp → Ollama):** llama.cpp is the substrate — Ollama's `numParallel` unblock (#17144) explicitly depends on an upstream llama.cpp fix, and its GGUF pipeline sits on `llama-server`. Ollama differentiates on operational guards (all-zero embedding detection #18406, opt-in truncation refusal #18399) and model packaging. llama.cpp differentiates on backend breadth (Hexagon, WebGPU/WASI, OpenCL/Adreno, Metal fusion rework).
- **Gateways — three distinct tiers:** LiteLLM = enterprise proxy (auth, budgets, spend, OTEL); New API = multi-tenant billing platform (pricing expressions, channel routing, now a **first-class vLLM channel type** #7332 — gateways absorbing engines as backends); CCR and CC Switch = developer-desktop routing for Claude Code/Codex, where the battleground is **Responses-API translation** (CC Switch's v3.20.3 retires local format translation for all major Chinese providers).
- **Fine-tuning (Unsloth):** Moving down-stack into quantization (EXL3 #7115, MoE-capable, filling the bitsandbytes/transformers-5 gap) and up-stack into a desktop app (Studio), while remaining hostage to upstream churn (SFTConfig `max_seq_length`→`max_length` breakage #10785, `accelerate<1.15` pin #10819).

## 6. Trend Signals

1. **DeepSeek-V4.1 is the new reference workload** — DSA sparse attention + MoE + MTP is the benchmark every engine is being judged on, exactly as V3/R1 was in 2025.
2. **The Responses API is becoming the universal protocol.** CC Switch completed native-Responses migration for Chinese providers; New API is adding a WebSocket relay (#5062); SGLang ships a Kimi-K3 Responses encoder; LiteLLM's worst open bugs (#40846, #40736) are Responses-path. Build for `/v1/responses` semantics now.
3. **FP4 is arriving for weights *and* KV cache**, but FP8-on-new-silicon numerics are the minefield — treat quantized outputs on SM121/GB10 and MI350 as unverified until diffed against BF16.
4. **Silent failure is the #1 operational risk class** across all nine projects (wrong GEMMs, 0% spec acceptance, KV cross-request contamination, silent truncation, dead memory alerts). Instrument what you can't trust: spec-decode acceptance rate, output-schema validation, embedding sanity, and numerics spot-checks.
5. **Tool calling remains fragile at every layer** (Ollama Gemma 4 parser, SGLang DSML arg-wrapping, vLLM `tool_choice` ignoring, LiteLLM Bedrock tool re-declaration, CC Switch DeepSeek image tool 400s). Auto-executing agents need a schema-validation pass regardless of backend.
6. **AMD is everywhere and not yet production-safe**: Strix Halo KV contamination (Ollama #17847), GLM-5.3 accuracy collapse on MI350 (vLLM #54924), MI355X perf cliff. Defer hardware commitments; both vLLM #56506 and SGLang #30599 are the tracking signals.
7. **Watch-items for the next 30 days:** vLLM batch-invariance RFC #27433 (reproducibility for evals/distillation), Transformers v5 migration churn, Unsloth EXL3 landing (MoE fine-tuning unlock), New API legacy pricing cutover, and LiteLLM's ReDoS/root-container hardening (#32353, #40821/22) if you self-host the gateway.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Project Digest — 2026-09-12

## 1. Today's Highlights

The community is pushing hard on **DeepSeek-V4.1-Flash** correctness and on **DSv4 "de-JITification"**: PR #56598 fixes the `dsv4_topk` illegal memory access on H20, PR #56509 patches SM120/GB10 geometry, and PR #56568 enables native MegaMoE fusion across all 40 layers by zero-padding shared experts. The top-tracked issue of the day is still the **Batch-Invariant Feature RFC** ([#27433](https://github.com/vllm-project/vllm/issues/27433), 92 comments), with stable guardrails for xgrammar/structured output, MoE offloading, and the Transformers v5 upgrade also active.

## 2. Releases & Breaking Changes

*No new releases in the last 24 hours.*

Notable behavioral-change PRs landing as merged candidates (still open):

- [#56509](https://github.com/vllm-project/vllm/pull/56509) — DSv4.1-Flash now sets SWA `block_size=64` on SM120/SM121 (was 32 elsewhere).
- [#56568](https://github.com/vllm-project/vllm/pull/56568) — DSV4.1-Flash shared experts padded to 2560 for MegaMoE fusion (checkpoint-shaped weights preserved).
- [#56580](https://github.com/vllm-project/vllm/pull/56580) — Triton MoE kernels drop runtime `EM` / `num_valid_tokens` alignment specialization to avoid first-request kernel recompiles.

## 3. New Model & Hardware Support

- **DeepSeek-V4.1-Flash**: SM120/GB10 geometry fix ([#56509](https://github.com/vllm-project/vllm/pull/56509)), `dsv4_topk` GPU crash on H20 SM90 ([#56598](https://github.com/vllm-project/vllm/pull/56598)), MegaMoE shared-expert fusion across 40 layers ([#56568](https://github.com/vllm-project/vllm/pull/56568)).
- **Qwen4Exp**: N-gram Prompt Lookup Encoding now supported with pipeline parallelism for NVIDIA + AMD backends ([#56444](https://github.com/vllm-project/vllm/pull/56444)).
- **DeepSeek Sparse Attention (DSA)**: DeepSelect TopK integrated via CMake FetchContent, making every decode top-k implementation explicitly selectable ([#56464](https://github.com/vllm-project/vllm/pull/56464)).
- **ROCm MI355X / gfx950**: Track for DSv4.1-Flash perf RFC ([#56506](https://github.com/vllm-project/vllm/issues/56506)) and GLM-5.3 accuracy issue ([#54924](https://github.com/vllm-project/vllm/issues/54924)).
- **Arm CPU CI**: Shard timeout extended to accommodate kernel tests ([#56601](https://github.com/vllm-project/vllm/pull/56601)).
- **DSv4 warmup coverage**: `[6/N]` PR migrates sampling + DFlash JIT kernels into the warmup contract ([#56323](https://github.com/vllm-project/vllm/pull/56323)); integration reference is #49627 ([#49627](https://github.com/vllm-project/vllm/pull/49627)).

## 4. Performance & Optimization

- **DSv4.1-Flash on 8× MI355X** (TP4, MXFP4 MoE + DSpark MTP): at concurrency 1, only **8.97 out-tok/s/GPU** and **0.898 s TTFT p50** — a substantial gap vs. H100-class hardware; full RFC in [#56506](https://github.com/vllm-project/vllm/issues/56506).
- **DFlash spec-decode regression**: on hybrid GDN models, ~71 tok/s → ~16 tok/s at 185k context (DT=4); short-context win of 218 tok/s at DT=8 ([#54691](https://github.com/vllm-project/vllm/issues/54691)).
- **Persistent top-k (MoE routing)**: `persistent_topk` silently drops candidates when many values share a coarse histogram bin on B300/SM103 — relevant for FP8/quantized MoE serving ([#51782](https://github.com/vllm-project/vllm/issues/51782)).
- **AWQ CUDA GEMM**: profiled L1-/memory-bound on RTX 3070 Ti; optimization proposal in [#55462](https://github.com/vllm-project/vllm/issues/55462).
- **SiLU block quant**: portable warp-shuffle implementation restored (revert of revert), now ROCm-wave64 safe ([#56586](https://github.com/vllm-project/vllm/pull/56586)).
- **MTP prefix-cache restore (V1)**: hybrid GDN models gain back their prefix-cache hits under MTP spec decoding — fixes the "first repeat misses cache" symptom on Qwen3.5-122B-A10B ([#52244](https://github.com/vllm-project/vllm/pull/52244), closes [#53504](https://github.com/vllm-project/vllm/issues/53504)).

## 5. Stability & Regressions

Ranked roughly by impact:

| Sev | Issue | Notes |
|---|---|---|
| **High — silent corruption** | [#49546](https://github.com/vllm-project/vllm/issues/49546) | `VLLM_MARLIN_INPUT_DTYPE=fp8` (Marlin W4A8-FP8) emits repeated `</think>` loop at temp 0 on GB10/sm_121a; kernel runs ~2.5% faster, masking the bug. No fix PR yet. |
| **High — GPU crash** | [#56389](https://github.com/vllm-project/vllm/issues/56389) | DSv4.1-Flash `dsv4_topk` CUDA illegal memory access on H20/SM90 above `max_num_seqs=256`. **Fix PR** [#56598](https://github.com/vllm-project/vllm/pull/56598). |
| **High — accuracy collapse** | [#54924](https://github.com/vllm-project/vllm/issues/54924) | GLM-5.3 GSM8K drops 91.6% → 14.9% on MI350/MI355 after #53155 forces MRV1. No fix PR. |
| **High — accuracy** | [#52644](https://github.com/vllm-project/vllm/issues/52644) | DeepSeek V4 accuracy drops with MRV2 on MI350/MI355 under `FULL_DECODE_ONLY` graph. No fix PR. |
| **Medium — silent output drift** | [#54928](https://github.com/vllm-project/vllm/issues/54928) | DFlash2 changes greedy Qwen3.8 thinking output at token 30, even with `--enforce-eager`. |
| **Medium — spec-decode correctness** | [#53777](https://github.com/vllm-project/vllm/issues/53777) | DFlash2 + xgrammar `json_object` hits deterministic "Failed to advance FSM". |
| **Medium — tool-calling** | [#54808](https://github.com/vllm-project/vllm/issues/54808) | `qwen3_coder` / `qwen3_xml` parser silently ignores `tool_choice: "required"` and named function on 0.28.0. |
| **Medium — scheduler** | [#42381](https://github.com/vllm-project/vllm/issues/42381) | Scheduler deadlocks after `VLLMValidationError` when prompt exceeds `max_model_len` by 1 token. **Closed** (fix landed). |
| **Medium — HMA** | [#42024](https://github.com/vllm-project/vllm/issues/42024) | NIXL connector silently disables HMA, halving KV-cache capacity. **Closed** — request is to flip default to HMA=on. |
| **Low — config** | [#48426](https://github.com/vllm-project/vllm/pull/48426) | `SamplingParams._verify_args` raises raw `TypeError` on non-numeric `top_k`; one-line fix. |
| **Low — sampling** | [#36802](https://github.com/vllm-project/vllm/issues/36802) | Tesla T4 shared-memory exhaustion (81920 > 65536). Workaround: reduce block sizes / `num_stages`. |
| **Low — CI flake** | [#56602](https://github.com/vllm-project/vllm/pull/56602) | GSM8K dataset 503s flake; retry helper PR. |

## 6. What This Means for Application Developers

- **DSv4.1-Flash is still rough around the edges.** Treat H20 deployments as needing `max_num_seqs ≤ 256` until [#56598](https://github.com/vllm-project/vllm/pull/56598) lands, and avoid GB10/sm_121a with Marlin W4A8-FP8 entirely — outputs can silently loop. Pin to a known-good build and add a smoke test that catches `</think>` repetition.
- **Hybrid GDN / Mamba + MTP serving is mostly recovered.** If you saw first-repeat prefix-cache misses after upgrading, [#52244](https://github.com/vllm-project/vllm/pull/52244) (closing [#53504](https://github.com/vllm-project/vllm/issues/53504)) is the fix to track.
- **Structured-output spec-decode (DFlash2) has multiple open correctness bugs.** If you serve JSON grammars with DFlash2 drafters, disable spec decoding for those routes or stay on `ngram`/`medusa` until [#54928](https://github.com/vllm-project/vllm/issues/54928) and [#53777](https://github.com/vllm-project/vllm/issues/53777) are resolved — the bug is deterministic and reproducible.
- **Tool-calling regressions with Qwen3 parsers.** Apps that rely on `tool_choice: "required"` or named-function forcing with `qwen3_coder` / `qwen3_xml` on 0.28.0 should upgrade or fall back to a different parser until [#54808](https://github.com/vllm-project/vllm/issues/54808) is fixed.
- **Transformers v5 upgrade is in flight** ([#38379](https://github.com/vllm-project/vllm/issues/38379)) — expect sub-issue churn and a likely future bump; downstream users of `transformers` ≥ 5 should stage compatibility testing now.
- **ROCm parity is converging for DSV4 but not yet on GLM-5.3** — if you're evaluating AMD MI355X, watch both [#56506](https://github.com/vllm-project/vllm/issues/56506) and [#54924](https://github.com/vllm-project/vllm/issues/54924) before committing hardware.
- **Batch-invariance is still a moving target.** If you depend on reproducible logprobs (evals, A/B testing, distillation), follow [#27433](https://github.com/vllm-project/vllm/issues/27433) before assuming identical inputs now yield identical outputs across batch shapes.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-12

## Today's Highlights

The day's activity is dominated by DeepSeek-V4.1 maturation work: a feature request to store C1/C2 main KV in packed FP4 on Hopper ([#38902](https://github.com/sgl-project/sglang/issues/38902)), a perf-target proposal to fuse shared-to-sparse experts in DSV4 DeepGEMM MegaMoE ([#38700](https://github.com/sgl-project/sglang/issues/38700)), an opt-in NVFP4 W4A16 path for FlashInfer MegaMoE ([#39210](https://github.com/sgl-project/sglang/pull/39210)), plus two new correctness bugs — a silent ~25% wrong FP8 `wo_a` absorb GEMM on SM121 ([#39193](https://github.com/sgl-project/sglang/issues/39193)) and a CUDA-graph capture crash in the Engram verify path for DSV4.1-Flash ([#39173](https://github.com/sgl-project/sglang/issues/39173)). On the speculative-decoding front, quantized DFlash2 drafts are silently yielding ~0% acceptance with no error ([#39087](https://github.com/sgl-project/sglang/issues/39087)), and an RFC for contention-aware batching under dynamic EPLB expert migration was opened ([#39192](https://github.com/sgl-project/sglang/issues/39192)).

## Releases & Breaking Changes

No new releases in the last 24h.

## New Model & Hardware Support

- **LLaDA-Image / LLaDA-Image-Turbo (Diffusion)** — native SGLang Diffusion serving including FP8 variants, text-to-image, image editing, and sequence parallelism ([PR #37907](https://github.com/sgl-project/sglang/pull/37907)).
- **FlashInfer MegaMoE — NVFP4 W4A16** — opt-in via `SGLANG_FLASHINFER_CUTEDSL_NVFP4_W4A16=1` and `--quantization nvfp4_online`, expert activations and EP transport stay in BF16 ([PR #39210](https://github.com/sgl-project/sglang/pull/39210)). Depends on FlashInfer #5019.
- **AMD consumer Radeon (RDNA3/RDNA4)** — official support tracking umbrella for `gfx1100/1101/1200/1201`; currently ROCm path is `gfx942/950`-only ([#30599](https://github.com/sgl-project/sglang/issues/30599)).
- **NPU CANN 9.1.0** — nightly suites added mirroring DeepSeek-V4-Flash, GLM-5.2, and Kimi-K3 tests; code-coverage collection added to the PR test suite ([PR #38332](https://github.com/sgl-project/sglang/pull/38332), [PR #38339](https://github.com/sgl-project/sglang/pull/38339)).
- **DeepSeek-V4.1 packed FP4 KV** — proposed for C1/C2 main KV on Hopper ([#38902](https://github.com/sgl-project/sglang/issues/38902)).

## Performance & Optimization

- **Weight-cache daemon multi-tenancy** — daemon paths now keyed by config digest so a single GPU can host multiple caches for different model configs, unblocking parallel workflows ([PR #37459](https://github.com/sgl-project/sglang/pull/37459)).
- **Diffusion CI per-attempt diagnostics** — preserves each pytest invocation/retry in separate artifact directories and flushes metrics before validation ([PR #39206](https://github.com/sgl-project/sglang/pull/39206)).
- **DSV4 DeepGEMM MegaMoE** — fuse shared-to-sparse experts for higher MoE throughput ([#38700](https://github.com/sgl-project/sglang/issues/38700)).
- **AMD Triton kernel launcher fix** — pass `USE_PDL` explicitly to fused MoE gate launches to avoid `torch.compile`/Triton 3.7 signature mismatch on ROCm ([PR #35685](https://github.com/sgl-project/sglang/pull/35685)).
- **Known regressions / ceilings**:
  - **Kimi-K3 PP8 disaggregated prefill** exhibits a load-independent ~30 s TTFT floor ([#34815](https://github.com/sgl-project/sglang/issues/34815)).
  - **FP8 KV-cache decode** slowdown from unfused K/V quantization + per-layer Q conversion overhead ([#30815](https://github.com/sgl-project/sglang/issues/30815)).
  - **Generation health checks** can perturb DP user routing state and collapse long-prefill throughput ([#35241](https://github.com/sgl-project/sglang/issues/35241)).

## Stability & Regressions

Ranked by likely operational impact.

| Severity | Issue | Summary | Fix PR |
|---|---|---|---|
| High | [#39193](https://github.com/sgl-project/sglang/issues/39193) | DSV4.1 FP8 `wo_a` absorb GEMM silently ~25% wrong on SM121 when `DEEPGEMM_SCALE_UE8M0=false` | None |
| High | [#39087](https://github.com/sgl-project/sglang/issues/39087) | Quantized DFlash2 draft silently yields ~0% acceptance — no error, decode slower than no-drafter | None |
| High | [#39072](https://github.com/sgl-project/sglang/issues/39072) | GLM-5.3 crash on disagg decode + dp-attention + spec decode | None |
| Medium | [#39173](https://github.com/sgl-project/sglang/issues/39173) | DSV4.1-Flash + Engram profiled SPS table dies in CUDA-graph capture | None |
| Medium | [#39147](https://github.com/sgl-project/sglang/issues/39147) | `HiCacheFile.batch_exists_v2()` reports unrestorable hybrid prefix as hit | None |
| Medium | [#38980](https://github.com/sgl-project/sglang/issues/38980) | `flash_attn` `is_fa3_supported()` claims sm_89 support but no sm_89 cubin ships; `ver` arg ignored | None |
| Medium | [#38924](https://github.com/sgl-project/sglang/issues/38924) | DSV4/V3.2 DSML tool-call parser wraps args in spurious `"arguments"`/`"input"` key | None |
| Medium | [#39125](https://github.com/sgl-project/sglang/issues/39125) | Potential DFA state explosion & CPU hang in JSON-Schema grammar compiler under deeply nested/cyclic schemas (security-relevant) | None |
| Low | [#39103](https://github.com/sgl-project/sglang/issues/39103) | `include_reasoning=false` still emits reasoning in chat/completions/responses | None |
| Low (closed) | [#38815](https://github.com/sgl-project/sglang/issues/38815) | SWA branching attaches later Mamba checkpoint to earlier prefix | [#39209](https://github.com/sgl-project/sglang/pull/39209) |

Other fix PRs landing today (worth tracking in your CI): Hybrid backend unwrap for FP8 DSA MHA ([#38508](https://github.com/sgl-project/sglang/pull/38508)), HarmonyParser stream-end flush ([#37722](https://github.com/sgl-project/sglang/pull/37722)), Mamba prefix-cache capacity warning ([#37594](https://github.com/sgl-project/sglang/pull/37594)), Ollama `/api/chat` input + context handling ([#37730](https://github.com/sgl-project/sglang/pull/37730)), Spark2.5 attention gate activation mode ([#37727](https://github.com/sgl-project/sglang/pull/37727)), xgrammar `pattern`+`minLength` rejection ([#37726](https://github.com/sgl-project/sglang/pull/37726)), whitespace-only reasoning fallback ([#37719](https://github.com/sgl-project/sglang/pull/37719)), GLM-4V mRoPE mask alignment ([#37599](https://github.com/sgl-project/sglang/pull/37599)), Qwen3.5 PP encoder weight preservation ([#37204](https://github.com/sgl-project/sglang/pull/37204)), speculative sampler rejects zero-prob CDF-boundary tokens ([#35788](https://github.com/sgl-project/sglang/pull/35788)), multimodal Kimi-K3 Responses encoder ([#35487](https://github.com/sgl-project/sglang/pull/35487)), `sgl-model-gateway` Qwen3 reasoning prefilled parse ([#35249](https://github.com/sgl-project/sglang/pull/35249)).

The CI failure tracker ([#17050](https://github.com/sgl-project/sglang/issues/17050)) reports 2 broken, 14 flaky, and 989 recently fixed tests as of 11:23 UTC.

## What This Means for Application Developers

- **Do not pin DSV4.1 fp8 on SM121 (GB10) yet.** The `wo_a` absorb GEMM can be silently ~25% off when `DEPGEMM_SCALE_UE8M0` is false ([#39193](https://github.com/sgl-project/sglang/issues/39193)). If you're running DeepSeek-V4.1 on Blackwell consumer parts, validate numerics against a BF16 reference before serving.
- **Treat quantized draft checkpoints as untrusted.** Quantized DFlash2 loads and serves but produces drafts with ~0% acceptance and no warning ([#39087](https://github.com/sgl-project/sglang/issues/39087)). Always monitor spec-decoding acceptance rate in metrics, not just throughput.
- **Untrusted JSON Schema is a DoS vector.** Deeply nested or cyclic schemas can blow up the structured-decoding compiler on CPU and hang requests ([#39125](https://github.com/sgl-project/sqlang/issues/39125) — see [correct link](https://github.com/sgl-project/sglang/issues/39125)). Put a depth/size cap in front of any user-supplied JSON Schema you forward to SGLang.
- **`include_reasoning=false` is currently leaky.** Reasoning text still appears in chat/completion/responses when the model emits it ([#39103](https://github.com/sgl-project/sglang/issues/39103)). Don't rely on the flag for redacted-reasoning UX; post-filter until fixed.
- **DeepSeek-V4/V3.2 tool calls can be malformed.** The DSML parser occasionally wraps arguments under `"arguments"` or `"input"` instead of the real parameter names ([#38924](https://github.com/sgl-project/sglang/issues/38924)). If you auto-execute tool calls, add a schema-validate pass.
- **GLM-5.3 + disagg + dp-attention + spec-decode combination is currently unstable** ([#39072](https://github.com/sgl-project/sglang/issues/39072)); run with one of those flags off in production until a fix lands.
- **Hybrid cache prefix hits from `HiCacheFile` may be false positives** when auxiliary pools can't restore the prefix ([#39147](https://github.com/sgl-project/sglang/issues/39147)). If correctness depends on cache hits (e.g., deduplication, billing), validate with a `batch_exists` probe before assuming a prefix served from disk.
- **Structured-decoding fixes in this batch are user-visible**: xgrammar will now reject `pattern` + `minLength` combos that previously compiled silently and dropped the length constraint ([#37726](https://github.com/sgl-project/sglang/pull/37726)) — if you have clients depending on the old lax behavior, you may see new rejections.
- **For multimodal Kimi-K3 on `/v1/responses`**, ensure your client-side serialization uses `processed_messages` rather than the decoded prompt — multimodal requests were returning HTTP 400 ([#35487](https://github.com/sgl-project/sglang/pull/35487)).
- **AMD RDNA3/RDNA4 is not officially supported yet**; if you're targeting consumer Radeon, expect to be on your own until [#30599](https://github.com/sgl-project/sglang/issues/30599) lands.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-12

## Today's Highlights

Backend breadth continues to expand: OpenCL bug fixes and a new binary Q4_K GEMM kernel ship today, alongside **multi-device row-split support for Hexagon** (Qualcomm) and a **Dawn refresh for WebGPU**. Server-side correctness gets attention with fixes for tool-choice routing, download race conditions, and SYCL oneDNN scratchpad crashes, while a **Metal fusion table rework** (b10909) consolidates all fusable patterns into a single source of truth for the graph optimizer.

## Releases & Breaking Changes

Ten new builds pushed in the last 24h (`b10909` → `b10927`):

- **b10927** — vendor: cpp-httplib → 0.56.0 ([#28787](https://github.com/ggml-org/llama.cpp/pull/28787))
- **b10926** — syscl: handle unsupported `tq1_0` quants gracefully ([#28681](https://github.com/ggml-org/llama.cpp/pull/28681))
- **b10924** — server: frame router child state command as a whole line, fixing stdout/stderr pipe interleaving ([#28747](https://github.com/ggml-org/llama.cpp/pull/28747))
- **b10923** — opencl: fix several backend-aborting bugs ([#27630](https://github.com/ggml-org/llama.cpp/pull/27630))
- **b10922** — opencl: add `kernel_gemm_noshuffle_q4_k_f32_32b_trans_ila_a8_bin` binary kernel for A8 Q4_K ([#28677](https://github.com/ggml-org/llama.cpp/pull/28677))
- **b10921** — webgpu: align tensor bindings to type block size for block-quantized views ([#28382](https://github.com/ggml-org/llama.cpp/pull/28382))
- **b10920** — hexagon: multi-device model split (row-split) with work splitting in fused kernels ([#28589](https://github.com/ggml-org/llama.cpp/pull/28589))
- **b10919** — ggml-webgpu: bump to a recent Dawn, disable module scanning ([#28683](https://github.com/ggml-org/llama.cpp/pull/28683))
- **b10917** — cmake: skip PCH for `llama-server` when targeting MSVC ([#28763](https://github.com/ggml-org/llama.cpp/pull/28763))
- **b10909** — metal: single-source fusion table + debug rework ([#28164](https://github.com/ggml-org/llama.cpp/pull/28164))

No formal API/version-bump announcements in this window.

## New Model & Hardware Support

- **GLM-5.3-Flash (GLM5-Next)** — PR [#27773](https://github.com/ggml-org/llama.cpp/pull/27773) adds support for the 320B hybrid model (34 KDA linear layers + 11 DSA layers, mHC + De…) with text and vision (mtmd) coverage.
- **Qwen4-Next-Flash multi-GPU** — PR [#28623](https://github.com/ggml-org/llama.cpp/pull/28623) addresses multi-GPU and buffer-size issues; works behind `LLAMA_PLE_RESIDENT=1` plus NUMA balancing disabled.
- **Hexagon multi-device (row-split)** — landing in b10920 enables splitting a model across multiple Qualcomm Hexagon devices with cooperative fused-kernel work distribution.
- **WebGPU on WASI** — PR [#27069](https://github.com/ggml-org/llama.cpp/pull/27069) disables Dawn native features on WASI, so the backend now compiles cleanly against `wasi:webgpu`.
- **IQ2_NL / IQ3_NL quantization** — staged roll-out across CPU, Metal, CUDA and Vulkan: [#27322](https://github.com/ggml-org/llama.cpp/pull/27322) (CPU), [#27324](https://github.com/ggml-org/llama.cpp/pull/27324) (+ Metal), [#27325](https://github.com/ggml-org/llama.cpp/pull/27325) (+ CUDA), [#27983](https://github.com/ggml-org/llama.cpp/pull/27983) (+ Vulkan). These new 32-block types enable optimal quantization on tensors whose row length isn't a multiple of 256, where K/I-quants currently degrade.

## Performance & Optimization

- **Metal fusion overhaul (b10909, [#28164](https://github.com/ggml-org/llama.cpp/pull/28164))** — All Metal fusable patterns are now declared once in `ggml-metal-fuse.cpp` and consumed by both the graph optimizer and the kernel emitter. Simplifies the fusion pass and unlocks cleaner debug instrumentation; concrete throughput deltas are still pending reports.
- **OpenCL Q4_K binary kernel (b10922, [#28677](https://github.com/ggml-org/llama.cpp/pull/28677))** — New A8 (Adreno 8) non-MoE GEMM kernel avoids layout conversions that previously fell back to scalar paths.
- **ggml-cpu: skip threadpool for NOP-only graphs ([#28785](https://github.com/ggml-org/llama.cpp/pull/28785))** — When the graph only contains views or no-ops (typical with full GPU offload), the worker pool is not created or woken. Includes table of CPU benchmarks; no regression cited for graphs that actually use CPU.
- **WebGPU tensor alignment (b10921, [#28382](https://github.com/ggml-org/llama.cpp/pull/28382))** — Binding offset is walked back to a whole-number-of-blocks boundary so block-quantized views get a valid element offset in the shader. Should remove a class of crashes/hangs in block-quant WebGPU paths.
- **Hexagon fused-kernel work-splitting (b10920)** — Multi-device fused kernels now partition work across devices in addition to the row-split layer partition.
- **Open closed regression** — RDNA4 native MMA FlashAttention prefill regression (up to **2× slower** at depth, [#26220](https://github.com/ggml-org/llama.cpp/issues/26220)) after rocWMMA removal is now closed; expect a follow-up fix commit.

## Stability & Regressions

**Open (active) bugs, ranked by severity:**

1. **Vulkan prompt processing regression after b10780 on RDNA3** — [#28752](https://github.com/ggml-org/llama.cpp/issues/28752). Severe drop in prefill throughput. No fix PR linked yet.
2. **CUDA co-resident `llama-server` crash on Windows** — [#28404](https://github.com/ggml-org/llama.cpp/issues/28404). Two GPU-pinned instances (e.g. 2× RTX 5060 Ti, sm_120) deterministically die in `ggml-cuda.cu` at CUDA graph reuse. Workaround: `GGML_CUDA_DISABLE_GRAPHS=1`.
3. **CUDA silent CPU fallback for 4-bit KV cache** — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633). `ggml_cuda_fattn_kv_type_supported` rejects `q4_0`/`q4_1` with no diagnostic, dropping prefill to CPU speed (~30× slowdown). Fix PR proposed to make `GGML_CUDA_FA_ALL_QUANTS=ON` the default.
4. **GLM-5.2 dense-MLA CUDA correctness** — [#26027](https://github.com/ggml-org/llama.cpp/issues/26027). Real transformer layers offloaded to GPU produce partially-coherent text on 2× RTX PRO 6000 Blackwell. No fix PR.
5. **OpenVINO AVX-512 crash** — [#28726](https://github.com/ggml-org/llama.cpp/issues/28726). `STATUS_ILLEGAL_INSTRUCTION` on Core Ultra 7 265K with default build flags; multiple models trigger it.
6. **qwen35 RTX 5090 (sm_120) decode underperformance** — [#28196](https://github.com/ggml-org/llama.cpp/issues/28196). Hybrid Gated DeltaNet + full-attention runs at ~28% of bandwidth bound on Windows vs ~86% on RTX 4090/Linux; MTP draft performance also degraded. No fix PR.
7. **MTP breaks multimodality in StepFun Step-3.7-Flash** — [#25129](https://github.com/ggml-org/llama.cpp/issues/25129). Speculative decoding produces "inconsistent sequence positions" / "failed to process speculative batch" on vision inputs.
8. **ngram-cache speculative decoding state pollution** — [#27852](https://github.com/ggml-org/llama.cpp/issues/27852). `begin()` is a no-op, so per-slot ngram cache survives across requests; acceptance collapses from 86% → 11%.

**Recently closed (fixed in flight):**

- [#26220](https://github.com/ggml-org/llama.cpp/issues/26220) RDNA4 FA regression — closed.
- [#20260](https://github.com/ggml-org/llama.cpp/issues/20260) Qwen3.5 `peg-native` chat format parser crash — closed.
- [#25808](https://github.com/ggml-org/llama.cpp/issues/25808) SYCL `xe2` segfault — closed.
- [#26208](https://github.com/ggml-org/llama.cpp/issues/26208) ROCm 7.14 VRAM allocation on gfx1201 — closed.
- [#25807](https://github.com/ggml-org/llama.cpp/issues/25807) ROCm 7.14 `libhipblas.so.3` missing — closed.
- [#24177](https://github.com/ggml-org/llama.cpp/issues/24177) RPC top-k argsort crash on AMD — closed.

## What This Means for Application Developers

- **Tool-routing correctness is tightening.** PR [#28806](https://github.com/ggml-org/llama.cpp/pull/28806) makes `llama-server` reject invalid named `tool_choice` instead of silently downgrading to `auto` — agents that previously got away with a wrong tool name on `/v1/chat/completions` will now get an explicit error and should add validation upstream.
- **Multi-process serving on a single host needs caution.** The CUDA-graph crash on co-resident servers ([#28404](https://github.com/ggml-org/llama.cpp/issues/28404)) is a production hazard for sharded model servers; pin `GGML_CUDA_DISABLE_GRAPHS=1` for now if you run >1 GPU-pinned `llama-server` on the same machine.
- **4-bit KV cache is silently slow on CUDA.** If your prefill throughput drops by ~30× without explanation, check your KV cache quant type and verify it's not silently falling back ([#28633](https://github.com/ggml-org/llama.cpp/issues/28633)).
- **Model catalog widening for hybrid architectures.** GLM-5.3-Flash ([#27773](https://github.com/ggml-org/llama.cpp/pull/27773)) and the Qwen4-Next multi-GPU path ([#28623](https://github.com/ggml-org/llama.cpp/pull/28623)) are landing — plan to test 320B-class hybrid (KDA + DSA) workloads if you target Chinese-model deployments.
- **Observability is improving.** `LOG_JSON` macro ([#28586](https://github.com/ggml-org/llama.cpp/pull/28586)) adds additive structured logging alongside existing `LOG_*` macros — useful for ingesting into Loki/Elastic without log-parse regexes.
- **ABI safety net incoming.** The compatibility-check script in [#28579](https://github.com/ggml-org/llama.cpp/pull/28579) will let downstream packagers detect when SOVER must be bumped — good news for anyone embedding libllama in a long-lived binary.
- **Web UI adds file download for chat outputs ([#26928](https://github.com/ggml-org/llama.cpp/pull/26928))** — handy for agent UIs that surface generated code/scripts directly in the conversation rather than via tool calls.
- **Concurrent downloads are now safe.** [#28803](https://github.com/ggml-org/llama.cpp/pull/28803) adds a lock-file protocol so two `llama-server` instances downloading the same GGUF won't corrupt each other's progress files.
- **Edge / WASM path is moving.** WebGPU WASI builds now compile cleanly without Dawn native features ([#27069](https://github.com/ggml-org/llama.cpp/pull/27069)) — worth re-evaluating browser-side inference if you'd written it off earlier.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-12

## Today's Highlights

A wave of correctness and reliability fixes landed in PRs today: the `/api/embed` loopback port exhaustion bug on Windows (Issue [#18392](https://github.com/ollama/ollama/issues/18392)) is addressed by PR [#18397](https://github.com/ollama/ollama/pull/18397) which restores HTTP keep-alives to the llama-server client, and the Gemma 4 tool-call parser dropping calls with space-bearing object keys (Issue [#18390](https://github.com/ollama/ollama/issues/18390)) gets two converging fixes ([#18398](https://github.com/ollama/ollama/pull/18398), [#18400](https://github.com/ollama/ollama/pull/18400)). Several new server-side guards (PRs [#18406](https://github.com/ollama/ollama/pull/18406), [#18407](https://github.com/ollama/ollama/pull/18407), [#18408](https://github.com/ollama/ollama/pull/18408)) add explicit error handling for previously silent failure modes (all-zero embeddings, GGUF import drift, swallowed chat-stream errors).

## Releases & Breaking Changes

No releases published in the last 24 hours.

Behavior-changing work in flight that operators should review before pulling the next build:

- **PR [#18399](https://github.com/ollama/ollama/pull/18399)** — introduces `OLLAMA_CONTEXT_SHIFT`, an opt-in switch that makes the server **refuse** over-long prompts with HTTP 400 instead of silently truncating them (current default still truncates and returns HTTP 200).
- **PR [#17566](https://github.com/ollama/ollama/pull/17566)** — proposes a per-request or per-model thinking-token budget (`think` becomes more than binary) so a reasoning model that loops no longer empties the context window.
- **PR [#17144](https://github.com/ollama/ollama/pull/17144)** — removes the hardcoded `numParallel = 1` blocklist for `qwen35` / `qwen35moe` now that the upstream llama.cpp crash is fixed (2026-03-08); throughput will increase for these architectures.

## New Model & Hardware Support

- **MLX backend bump** — PR [#18235](https://github.com/ollama/ollama/pull/18235) tracks an MLX upgrade (`b6368984…ec5f6ff7`).
- **ROCm / Strix Halo (gfx1151)** — Issue [#17847](https://github.com/ollama/ollama/issues/17847) documents that the Strix Halo iGPU build `0.32.14-rocm` **bleeds KV state across sequential requests** on the same socket; response to prompt B describes prompt A's content. No fix PR yet — treat as a known-broken state.
- **AMD gfx1200 (RDNA4, RX 9060 XT)** — Issue [#17782](https://github.com/ollama/ollama/issues/17782) reports `Could not load "TensileLibrary_lazy_gfx1200.dat"` crashes mid-session with `qwen3.8:27b`.
- **NVIDIA Jetson Orin Nano 8GB** — Issue [#18396](https://github.com/ollama/ollama/issues/18396): `0.34.0` cannot load Gemma 4 E4B multimodal because the projector is staged for GPU despite a CPU-projector config, triggering host OOM.
- **Qwen3.8-27B-GSQ-RCO-GGUF `IQ3_S`** — Issue [#18297](https://github.com/ollama/ollama/issues/18297) reports the run completes with `done_reason: "stop"` but returns empty `content`; unclear if quantization or parsing.
- **Model request** — Issue [#18287](https://github.com/ollama/ollama/issues/18287) requests Ollama-format files for Tencent Hy4-preview.
- **Manifest-list support** — PR [#16590](https://github.com/ollama/ollama/pull/16590) prepares per-runner manifests under a single tag (v1 retained as a downgrade anchor). Affects show/list/copy/remove/pull/push semantics.
- **Long-standing** — `ppc64le` request ([#796](https://github.com/ollama/ollama/issues/796), open since 2023) remains unaddressed.

## Performance & Optimization

- **Embed throughput on Windows** — PR [#18397](https://github.com/ollama/ollama/pull/18397) re-enables HTTP keep-alive to `llama-server` for the embed path, removing the "Only one usage of each socket address" port-exhaustion failures at ~55 docs/s with `bge-m3:567m-fp16` (Issue [#18392](https://github.com/ollama/ollama/issues/18392)).
- **Qwen3.5 / Qwen3.5-MoE parallelism** — PR [#17144](https://github.com/ollama/ollama/pull/17144) restores `numParallel > 1` after the upstream llama.cpp crash was fixed 2026-03-08; expect significant throughput gains on these hybrid architectures.
- **Model load time regression** — Issue [#16501](https://github.com/ollama/ollama/issues/16501): Qwen3.5 122B on Strix Halo loads in 116s on `0.30.4` vs 61s on `0.24`; PP also slowed ~40%. No fix yet.
- **GGUF import** — PR [#18407](https://github.com/ollama/ollama/pull/18407) stops `llama-quantize` from rewriting the uploaded blob (changes digest, doubles disk write) by validating the COPY output to `/dev/null` and reusing the original blob.
- **Log noise** — PR [#16941](https://github.com/ollama/ollama/pull/16941)) (closed/merged) keeps `--log-verbosity 4` for scheduler accounting while filtering per-request `slot`/`srv`/sampler spam.
- **GPU scheduling** — Issue [#16599](https://github.com/ollama/ollama/issues/16599): `0.30.6` shards Gemma 4 31B across a 3090 + 4060 even though the 3090 alone has the 30GB needed (~30 tok/s single-GPU). `OLLAMA_*_VRAM` env vars do not override.

## Stability & Regressions

Ranked by severity for production users:

1. **[CRITICAL — correctness] Strix Halo KV cross-request contamination** — Issue [#17847](https://github.com/ollama/ollama/issues/17847). Response to request B describes request A's content. Affects `ollama/ollama:0.32.14-rocm` on gfx1151. **No fix PR.** Workaround: one process per request or different models per session.
2. **[HIGH] Gemma 4 tool calls dropped when keys contain spaces** — Issue [#18390](https://github.com/ollama/ollama/issues/18390). Returns empty `content`, `finish_reason: "stop"`. Fix in flight: PRs [#18398](https://github.com/ollama/ollama/pull/18398) and [#18400](https://github.com/ollama/ollama/pull/18400).
3. **[HIGH] `qwen 3.8` chat streaming 500 "no user query found in messages"** — Issue [#17778](https://github.com/ollama/ollama/issues/17778), 28 comments / 👍25. Hits during long-context (~205k) tool-calling loops. **No fix PR.**
4. **[HIGH] `glm-5.3:cloud` endless reasoning** — Issue [#18193](https://github.com/ollama/ollama/issues/18193) via Ollama Cloud; upstream Z.AI unaffected. Upstream provider artifact, but worth tracking.
5. **[HIGH] Silent chat-history truncation** — Issue [#14259](https://github.com/ollama/ollama/issues/14259): `slog.Debug`-only message at `server/prompt.go:73`. Linked to PR [#18399](https://github.com/ollama/ollama/pull/18399) which adds an opt-in hard-fail mode.
6. **[MEDIUM] `IQ3_S` Qwen3.8-GSQ-RCO returns empty content** — Issue [#18297](https://github.com/ollama/ollama/issues/18297).
7. **[MEDIUM] ROCm gfx1200 TensileLibrary crash mid-session** — Issue [#17782](https://github.com/ollama/ollama/issues/17782).
8. **[MEDIUM] Jetson Orin Nano 8GB OOM loading Gemma 4 E4B multimodal** — Issue [#18396](https://github.com/ollama/ollama/issues/18396).
9. **[MEDIUM] Windows `/api/embed` loopback port exhaustion** — Issue [#18392](https://github.com/ollama/ollama/issues/18392); **fix PR #18397**.
10. **[LOW] Qwen3 tool calling via `/api/chat` `tools` parameter** — Issue [#14601](https://github.com/ollama/ollama/issues/14601), prompt-construction bug; works fine when tools are inlined in the system prompt.
11. **[LOW] Gemma 4 / Qwen "cancel task" on long inputs** — Issue [#18387](https://github.com/ollama/ollama/issues/18387) (>10 ellipses in TOC triggers cancel).
12. **[LOW] Install/uninstall hygiene** — PR [#18386](https://github.com/ollama/ollama/pull/18386) fixes the Windows uninstaller leaving the Ollama PATH entry.
13. **[INFO] Closed: `mistral3` defaults to Ministral parser** — PR [#16934](https://github.com/ollama/ollama/pull/16934) merged; tool calls on `mistral3` GGUF now resolve correctly out-of-the-box.

**New defensive guardrails landing:**

- PR [#18406](https://github.com/ollama/ollama/pull/18406) — detects all-zero embeddings from the runner and returns HTTP 500 instead of a silent 200.
- PR [#18408](https://github.com/ollama/ollama/pull/18408) — surfaces HTTP errors, failed reads, malformed JSONL, and premature EOF in the inline chat error UI; a missing terminal event is no longer treated as success.
- PR [#18394](https://github.com/ollama/ollama/issue/18394) (proposal) — add served manifest digest to local `/api/chat` responses so evals can bind scores to artifacts (tags can flip A→B→A mid-request).

## What This Means for Application Developers

- **Embed services on Windows** should track PR [#18397](https://github.com/ollama/ollama/pull/18397) and verify it lands in the next release — bulk embed workloads have been quietly failing under sustained load. Until then, throttle batches below ~32 or implement client-side retry with jittered backoff.
- **Gemma 4 tool integrations** should avoid human-readable object keys with spaces (e.g. `"Basic LLM Chain": …`) until PRs [#18398](https://github.com/ollama/ollama/pull/18398) / [#18400](https://github.com/ollama/ollama/pull/18400) ship. After upgrading, validate downstream consumers against both schemas.
- **Reasoning agents** built on `glm-5.3:cloud` should enforce a server- or client-side step/token cap; Ollama currently allows unbounded internal reasoning loops. If PR [#17566](https://github.com/ollama/ollama/pull/17566) (per-request thinking budget) is accepted, prefer that mechanism over application-level workarounds.
- **Long-context Qwen3.8** users should monitor Issue [#17778](https://github.com/ollama/ollama/issues/17778); until fixed, agent loops against the 205k context are at risk of dropping the user message mid-tool-call and returning a 500.
- **Multi-GPU hosts** with mixed VRAM (3090 + 4060) should pin models explicitly via env vars; Issue [#16599](https://github.com/ollama/ollama/issues/16599) confirms automatic sharding ignores available headroom on the larger card in `0.30.6`.
- **ROCm / Strix Halo** is currently unsafe for any multi-tenant or alternating-prompt workload per Issue [#17847](https://github.com/ollama/ollama/issues/17847). Do not deploy until a fix ships; single-request, deterministic workloads only.
- **Provenance / eval hygiene** — PR [#18394](https://github.com/ollama/ollama/pull/18394) proposes exposing the served manifest digest; if you run local evals, comment +1 on the PR and align your harness to consume it once shipped.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-12

## 1. Today's Highlights

The big story today is a stack of auth-path performance work that collapses a cold-key lookup from 43 Redis round trips down to a single `MGET` plus one Postgres query and one pipeline (#40834, #40841), with a follow-up that releases `max_parallel_requests` slots eagerly so completed requests stop triggering spurious 429s (#40843, #40846). Two security-flavored issues landed on the deployment surface in the same window — the official runtime image and Helm chart both run as root by default (#40821, #40822) — and the cookbook pin-bump PR (#40574) is quietly important because 1.83.14 carries published auth-bypass CVEs.

## 2. Releases & Breaking Changes

No new releases published in the last 24h. No API- or config-level breaking changes were merged. Note: a cookbook example was updated to pin `litellm==1.84.0` because 1.83.14 has known auth-bypass CVEs — [#40574](https://github.com/BerriAI/litellm/pull/40574).

## 3. New Model & Hardware Support

- **Bedrock Mantle** — added `bedrock_mantle/us-gov-west-1/openai.gpt-5.6-sol`, closes the last open piece of [#40102](https://github.com/BerriAI/litellm/issues/40102) and mirrors the OpenRouter sibling. [#40849](https://github.com/BerriAI/litellm/pull/40849)
- **Gemini catalog sync** — 33 Gemini models repriced from Google's published list; 2 held pending enrichment. [#40832](https://github.com/BerriAI/litellm/pull/40832)
- **New provider: Requesty** — OpenAI-compatible LLM gateway wired up using the standard `provider/model` naming convention (same shape as OpenRouter). [#32893](https://github.com/BerriAI/litellm/pull/32893)
- **Guardrail update: Singulr** — payload reshaped to current Singulr contract; adds logging-only mode and pre/post-MCP hooks. [#37464](https://github.com/BerriAI/litellm/pull/37464)

## 4. Performance & Optimization

- **Auth lookup collapse** — for a cold key, auth now does 1 Redis `MGET` for {user, team, membership, org, project, budget} instead of one GET per object, plus one Postgres query and one pipeline for spend counters. Stated win: cold key path drops from ~43 Redis round trips to 1. [#40834](https://github.com/BerriAI/litellm/pull/40834)
- **Post-call spend counters** — single `MGET` + pipeline, no team/user/org refetch on the response path; stacked on #40834. [#40841](https://github.com/BerriAI/litellm/pull/40841)
- **Concurrency slot release** — completed `/v1/responses` requests now release `max_parallel_requests` slots in the awaited post-call path instead of holding them until async success-logging finishes, serialized per request to avoid races. [#40843](https://github.com/BerriAI/litellm/pull/40843)
- **Streaming usage merger** — explicit `0` cache_creation/cache_read now replaces prior counts instead of being merged through, eliminating the double-billed-cache-write / negative-uncached-input bug. [#40845](https://github.com/BerriAI/litellm/pull/40845)

## 5. Stability & Regressions

Ranked by impact on production deployments.

| Severity | Issue | Status | Notes |
|---|---|---|---|
| **Critical** | [#32353](https://github.com/BerriAI/litellm/issues/32353) ReDoS in `secret_redaction.redact_string()` — catastrophic regex backtracking on large exception strings blocks the event loop for minutes, kills liveness probes, crash-loops all replicas | Open | No fix PR yet; hot-patch the redaction pattern or short-circuit long strings |
| **Critical (security)** | [#40821](https://github.com/BerriAI/litellm/issues/40821) Official runtime image ends in `USER root`; proxy, entrypoint and Prisma migrations all run as UID 0 | Open | Sibling images in the repo already drop privileges |
| **Critical (security)** | [#40822](https://github.com/BerriAI/litellm/issues/40822) Helm chart ships empty `podSecurityContext`/`securityContext`; pods run as root by default | Open | Hardening keys exist only as commented-out examples |
| **High** | [#30061](https://github.com/BerriAI/litellm/issues/30061) OTEL `NoneType` crash — enabling the OTEL collector callback crash-loops containers | Open | |
| **High** | [#40846](https://github.com/BerriAI/litellm/issues/40846) Completed `/v1/responses` requests hold `max_parallel_requests` slots until deferred logging finishes → spurious 429s | Open | Fix PR #40843 |
| **High** | [#40735](https://github.com/BerriAI/litellm/issues/40735) `bedrock_converse` rejects follow-up agent turns that carry tool-call history without re-declaring `tools=` | Open | Surfaces as `litellm.UnsupportedParamsError` before the request leaves the proxy |
| **High** | [#40736](https://github.com/BerriAI/litellm/issues/40736) Streaming usage merger retains stale cache-write tokens after an explicit zero update → uncached input goes negative, cache writes billed twice | Open | Fix PR #40845 |
| **High** | [#40398](https://github.com/BerriAI/litellm/issues/40398) JWT auth mints a new "virtual key" per token refresh → Usage dashboard fills with `hashed-jwt-…` rows | Open | |
| **Medium** | [#40780](https://github.com/BerriAI/litellm/issues/40780) Any model declared with the `openai/` prefix routes `/v1/messages` to the Responses API, silently dropping multimodal | Open | Affects vLLM, llama.cpp, SGLang, TGI, LM Studio |
| **Medium** | [#40080](https://github.com/BerriAI/litellm/issues/40080) GPT-5.6 cross-region inference profiles on Bedrock fail with image input (routed through Converse instead of OpenAI endpoint) | Open | |
| **Medium** | [#40563](https://github.com/BerriAI/litellm/issues/40563) Vertex AI Realtime (`gemini-3.5-transcribe-live-preview`) hardcodes `pcm16` to 24000 Hz → corrupted transcription | Open | |
| **Medium** | [#40728](https://github.com/BerriAI/litellm/issues/40728) Azure AI model router has no cost tracking | Open | |
| **Medium** | [#40761](https://github.com/BerriAI/litellm/issues/40761) With `store_model_in_db: true`, editing any `litellm_params` of a config-file model evicts the deployment from running pods and never restores it until restart | Open | |
| **Medium** | [#40783](https://github.com/BerriAI/litellm/issues/40783) `POST /team/update` with a new `team_member_budget` returns 200 but doesn't apply to existing members | Open | |
| **Medium** | [#40628](https://github.com/BerriAI/litellm/issues/40628) OpenAI image generation sends `extra_headers` in the JSON body (breaks Cloudflare AI Gateway `cf-aig-authorization`) | Open | |
| **Medium** | [#40575](https://github.com/BerriAI/litellm/issues/40575) Native Ollama provider doesn't consume tool results on Qwen3.8 (OpenAI-compatible Ollama works) | Open | Related to earlier #26094 / PR #26122 |
| **Medium** | [#36426](https://github.com/BerriAI/litellm/issues/36426) Responses-API bridge drops `SpendLogs` row for non-streaming `/v1/chat/completions` | Open | Sibling failure mode to vLLM passthrough #33210 |
| **Medium** | [#22984](https://github.com/BerriAI/litellm/issues/22984) VLLM `cached_tokens` not honored in cost calculator | Open | |
| **Low** | [#30355](https://github.com/BerriAI/litellm/issues/30355) Gemini `part.thought` metadata not preserved on image responses | Open | |
| **Low** | [#30362](https://github.com/BerriAI/litellm/issues/30362) No HTTP/2 for outbound requests to upstream providers | Open | |
| **Low** | [#30208](https://github.com/BerriAI/litellm/issues/30208) Feature: enable fake-streaming globally (not just per-route) | Open | |

**Closed/resolved (last 24h):** Vertex AI "Unhealthy" dashboard since v1.84.0 [#28206](https://github.com/BerriAI/litellm/issues/28206); Bedrock tool validation error [#19384](https://github.com/BerriAI/litellm/issues/19384); `max_budget` ignored after reset [#27300](https://github.com/BerriAI/litellm/issues/27300); `ResetBudgetJob` JSON crash [#27171](https://github.com/BerriAI/litellm/issues/27171); false "Budget has been exceeded" on `/v1/messages` (Claude Code) [#40050](https://github.com/BerriAI/litellm/issues/40050); missing AWS external ID for Bedrock embeddings [#27835](https://github.com/BerriAI/litellm/issues/27835); bare `ValueError` → HTTP 500 for invalid `reasoning_effort` on Gemini/Vertex [#40474](https://github.com/BerriAI/litellm/issues/40474); Datadog tool-call observability follow-up [#40580](https://github.com/BerriAI/litellm/issues/40580); unrelated notebook OOM [#29831](https://github.com/BerriAI/litellm/issues/29831).

## 6. What This Means for Application Developers

- **If you're on 1.83.x, upgrade to ≥1.84.0** — the cookbook pin-bump PR ([#40574](https://github.com/BerriAI/litellm/pull/40574)) is a useful prompt: that older line carries published auth-bypass CVEs.
- **Plan around the auth-path perf PRs** ([#40834](https://github.com/BerriAI/litellm/pull/40834), [#40841](https://github.com/BerriAI/litellm/pull/40841)) if you self-host with Redis-backed auth — cold-key p50/p99 should drop materially once merged.
- **Watch #40843** ([PR](https://github.com/BerriAI/litellm/pull/40843)) if you've been chasing intermittent 429s under `/v1/responses` with `max_parallel_requests` set — the slot-release fix is small and surgical.
- **For self-hosted OpenAI-compatible servers (vLLM, SGLang, llama.cpp, TGI, LM Studio)** declared as `openai/<model>`, [#40780](https://github.com/BerriAI/litellm/issues/40780) means `/v1/messages` multimodal traffic is silently routed wrong — prefer a non-`openai/` prefix for those backends until this lands a fix.
- **Bedrock agent loops** with tool history should re-declare `tools=` on every turn until [#40735](https://github.com/BerriAI/litellm/issues/40735) ships a fix, or you'll see `litellm.UnsupportedParamsError` before the request leaves the proxy.
- **Security hygiene on deployment:** if you consume the published Docker image or Helm chart, set explicit `runAsNonRoot` / `runAsUser` / `allowPrivilegeEscalation: false` / `capabilities.drop: [ALL]` at the pod level — the upstream defaults are empty ([#40821](https://github.com/BerriAI/litellm/issues/40821), [#40822](https://github.com/BerriAI/litellm/issues/40822)).
- **Watch the proxy for ReDoS-shaped symptoms** — [#32353](https://github.com/BerriAI/litellm/issues/32353) turns a long exception string into a multi-minute event-loop block and a crash-loop; consider a sidecar cap on request-error body length as a stop-gap.
- **New capability available upstream:** automatic gateway-managed memory with admin policies is being added ([#40844](https://github.com/BerriAI/litellm/pull/40844)), which moves memory orchestration out of the application layer — relevant if you've been bolting memory on per-agent.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-12

## Today's Highlights

The `main` branch has been red for ~24 hours since commit `22bbff627` (merged 2026-09-11), with every Backend CI run failing and roughly 25 PRs collateral-damaged by a single stale assertion. [#10832](https://github.com/unslothai/unsloth/pull/10832) by danielhanchen targets the five root causes and should land as a priority unblock. Significant AMD ROCm momentum continues alongside that: [#10820](https://github.com/unslothai/unsloth/pull/10820) adds an AMD ROCm Docker image (RDNA2/3/4 + CDNA) mirroring the Blackwell CUDA setup, while [#10819](https://github.com/unslothai/unsloth/pull/10819) caps `accelerate` below 1.15 on Windows because 1.15 unconditionally imports `torch.distributed.tensor`, which AMD's ROCm wheels don't ship. The long-awaited [#7115](https://github.com/unslothai/unsloth/pull/7115) EXL3 (ExLlamaV3) quantization backend — 2/3/4/6/8-bit plus fractional bitrates and MoE support — is still progressing.

## Releases & Breaking Changes

No new releases in the last 24h.

**Breaking config change in flight:** `SFTConfig` renamed `max_seq_length` → `max_length` in the 2026.9.4 Docker image. Training scripts that pass `max_seq_length=` now error with `unexpected keyword argument 'max_seq_length'`. See [#10785](https://github.com/unslothai/unsloth/issues/10785). Pin to the prior image or update kwargs until the trainer path catches up.

## New Model & Hardware Support

- **AMD ROCm Docker image** ([#10820](https://github.com/unslothai/unsloth/pull/10820), tracks [#6230](https://github.com/unslothai/unsloth/issues/6230)): parallel `docker/` layout to the Blackwell image, RDNA2/3/4 and CDNA/Instinct targets. Resyncs the auto-closed #6231.
- **EXL3 / ExLlamaV3 quantization backend** ([#7115](https://github.com/unslothai/unsloth/pull/7115), `>3000` lines, additive to bitsandbytes): 2/3/4/6/8-bit + fractional, MoE-capable (which bitsandbytes cannot do under transformers 5).
- **ARM64 CPU-only Docker build** ([#10766](https://github.com/unslothai/unsloth/pull/10766)): lightweight CUDA-free image for non-GPU ARM hosts.
- **Image text-encoder precision control** ([#10788](https://github.com/unslothai/unsloth/pull/10788)): Studio gains Default / FP8 storage / FP8 compute / INT8 / NVFP4 choices, surfaced to both download planning and loading.
- **Image-model download-without-load** ([#10789](https://github.com/unslothai/unsloth/pull/10789)): new `Download only` mode alongside the default `Download and load`, so users can stage assets offline.
- **macOS Homebrew install documented** ([#9834](https://github.com/unslothai/unsloth/pull/9834)): `brew install --cask unsloth` is now in the README (cask PR #282132).
- **Qwen3.5-9B LoRA on B200** being exercised via the CLI ([#10806](https://github.com/unslothai/unsloth/issues/10806)) — useful signal that Blackwell + Qwen3.5 LoRA is now a supported combo worth benchmarking.

## Performance & Optimization

- **GPU idle on B200 (Qwen3.5-9B LoRA, unsloth-cli)**: `fla` rebuilds its autotune key on every launch, leaving the GPU idle for most of each step. Reproduction in [#10806](https://github.com/unslothai/unsloth/issues/10806) — environment: 1× B200 sm_100, CUDA 12.8, driver 580.126.20, torch 2.11.0, unsloth `main`@`89976f1c2`, unsloth_zoo 2026.9.2. Worth a cache-key fix.
- **Studio setup reuses cached `uv`** ([#10659](https://github.com/unslothai/unsloth/pull/10659)): stops re-downloading the pinned uv archive when the installer's PATH doesn't include the previously installed copy.
- **Managed llama.cpp source-build refresh on Blackwell** ([#9963](https://github.com/unslothai/unsloth/pull/9963)): when no prebuilt matches, the source tree used to go stale and the "Update llama.cpp" button disappeared. Now the manager refreshes it, so new GGUF architectures stay installable.
- **Studio MLX VLM prefill fix** ([#10778](https://github.com/unslothai/unsloth/pull/10778)): drops the forced 256-token grid on mlx-vlm prompts; cached and cold turns now match bitwise and cold answers equal upstream mlx-vlm output.
- **Studio chat streaming lag on large code blocks** ([#10779](https://github.com/unslothai/unsloth/pull/10779)): Streamdown was running Shiki on every frame inside an unclosed code fence; renderer now defers highlighting until the fence closes.
- **Diffusion load cancellation** ([#10780](https://github.com/unslothai/unsloth/pull/10780)): split the construction lock so Eject can cancel mid-pipeline; cancelled loads can no longer transition to ready.

## Stability & Regressions

**Critical / CI-blocking**
- **`main` red since 2026-09-11 11:18Z** ([#10832](https://github.com/unslothai/unsloth/pull/10832) — fix PR by maintainer). Every Backend CI run since then failed; ~25 open PRs went red because of `Repo tests (CPU)` propagation. Fix targets five root causes. **Apply this PR before merging anything else.**

**High**
- **X11 + NVIDIA: WebKitWebProcess leaks DMA-BUF `sync_file` fds** until EMFILE → blank/frozen Studio window that looks like a hang ([#10795](https://github.com/unslothai/unsloth/issues/10795)). Linux Mint 21.3, kernel 6.8. No fix PR yet.
- **Studio IPv6 blackhole** ([#10803](https://github.com/unslothai/unsloth/pull/10803) — fix PR by Lwrless): backend bound `127.0.0.1:8888`, hung at HF token check for ~80s, then `terminal_reason=unresponsive_health_check`. Companion PR [#10830](https://github.com/unslothai/unsloth/pull/10830) moves a `hf_hub_download` off the event loop in `/api/inference/status`.

**Medium**
- **Manual GPU mode logs wrong `--fit` verdict** ([#10821](https://github.com/unslothai/unsloth/issues/10821), fix [#10831](https://github.com/unslothai/unsloth/pull/10831)): log line reads `use_fit` before the Manual branch flips it off, so launches log the opposite of what they actually run.
- **`SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`** ([#10785](https://github.com/unslothai/unsloth/issues/10785)) in Docker image `2026.9.4`. See breaking-change note above.
- **Duplicate tool-call guard blocks legitimate rerun** ([#10792](https://github.com/unslothai/unsloth/issues/10792)) and **replayed tool calls sort argument keys**, causing llama-server to reprocess multi-param calls ([#10791](https://github.com/unslothai/unsloth/issues/10791)). Both affect Studio agent workflows on Windows 11 Pro / 26200.
- **Manual multi-GPU layer split missing `--split-mode layer`** ([#10770](https://github.com/unslothai/unsloth/pull/10770), fixes #10549): backend relied on llama.cpp's default, leaving intent ambiguous and risking tensor-mode fallback.
- **install.ps1 flagged by antivirus** ([#10805](https://github.com/unslothai/unsloth/issues/10805)): blocks update-via-PowerShell on AV-strict hosts.
- **Windows installer fails when username has spaces** ([#10722](https://github.com/unslothai/unsloth/issues/10722), closed): PowerShell path-quoting fix landed.

**Low / Studio UX**
- **Run-settings panel duplication** ([#10817](https://github.com/unslothai/unsloth/issues/10817)): sidebar and model-dropdown Run Settings keep separate drafts and silently disagree.
- **`tapClientLookup: Index 1 out of bounds`** on "New chat" ([#10288](https://github.com/unslothai/unsloth/issues/10288)) + `MessagePartText` misuse. Intermittent crash.
- **Inline graphs / Python visuals don't render in Studio** ([#10539](https://github.com/unslothai/unsloth/issues/10539), closed).
- **Voice typing over LAN** ([#10824](https://github.com/unslothai/unsloth/issues/10824)) and **PocketPal autoload via API** ([#10306](https://github.com/unslothai/unsloth/issues/10306)): LAN-mode feature gaps.
- **Eval loss becomes constant** ([#1067](https://github.com/unslothai/unsloth/issues/1067), tagged `currently fixing`, `good first issue`) — long-standing Llama 3.1 8B Instruct issue, still open since 2024.

## What This Means for Application Developers

- **Hold merges into `main`-derived branches** until [#10832](https://github.com/unslothai/unsloth/pull/10832) lands; expect red CI on PRs that touch `Repo tests (CPU)` in the meantime.
- **Update your trainer configs**: replace `max_seq_length=` with `max_length=` if you're pulling Docker image `2026.9.4`, or pin the prior image until the SFTConfig path is consistent ([#10785](https://github.com/unslothai/unsloth/issues/10785)).
- **AMD is becoming a first-class target.** If you're deploying on RDNA/Instinct, the new Docker image ([#10820](https://github.com/unslothai/unsloth/pull/10820)) and the `accelerate<1.15` Windows cap ([#10819](https://github.com/unslothai/unsloth/pull/10819)) make ROCm a real option; expect rough edges around the WebKit fd leak ([#10795](https://github.com/unslothai/unsloth/issues/10795)) on Linux+X11.
- **EXL3 is on the horizon** ([#7115](https://github.com/unslothai/unsloth/pull/7115)). If you've been blocked from fine-tuning MoE models under transformers 5 because bitsandbytes can't quantize them, plan to retest once this lands.
- **Blackwell + Blackwell-adjacent hosts** get a real upgrade path now: the managed llama.cpp source refresh ([#9963](https://github.com/unslothai/unsloth/pull/9963)) plus image-precision controls ([#10788](https://github.com/unslothai/unsloth/pull/10788)) make Studio usable on RTX 50-series / B200 without manual rebuilds.
- **Studio agent workflows** get several quality-of-life fixes worth pulling: IPv6 startup ([#10803](https://github.com/unslothai/unsloth/pull/10803)), MLX VLM prefill correctness ([#10778](https://github.com/unslothai/unsloth/pull/10778)), streaming lag on large code ([#10779](https://github.com/unslothai/unsloth/pull/10779)), and the `--split-mode layer` fix ([#10770](https://github.com/unslothai/unsloth/pull/10770)) for multi-GPU manual placement.
- **Tool-call reliability on Windows Studio** still needs attention ([#10791](https://github.com/unslothai/unsloth/issues/10791), [#10792](https://github.com/unslothai/unsloth/issues/10792)). If you ship Studio-mediated agents that edit files and re-run commands, monitor these — they currently re-process or block legitimate reruns.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-12

## 1. Today's Highlights

Today's activity centers on **observability and routing correctness fixes** rather than new features. The most consequential change is PR #1790, which corrects how the gateway prices usage for requests whose client-facing model name is a router alias — prior to the fix, costs were reported as `$0` or as a `models.dev` lookup of the alias rather than the upstream model. PR #1788 addresses a subtle subagent dispatch bug where a quoted `CCR-SUBAGENT-MODEL` element could re-route the very request that was reviewing it, along with two related observability gaps.

## 2. Releases & Breaking Changes

No releases published in the last 24 hours. No API or config-breaking changes shipped today.

## 3. New Model & Hardware Support

- **PR #1786 — OpenCode Go (`opencode-go`) provider import.** Adds first-class local import support for OpenCode's Go provider, distinct from Zen (`opencode`). Go has separate credentials and may overlap in model IDs with Zen; the importer previously could not handle this cleanly. ([#1786](https://github.com/musistudio/claude-code-router/pull/1786))
- **PR #1451 — Requesty provider preset.** Adds `requesty.ai` (an OpenAI-compatible multi-provider router) to the provider preset list, alongside OpenRouter, NVIDIA, etc., and exposes it via `ccr://provider` deep-link import. ([#1451](https://github.com/musistudio/claude-code-router/pull/1451))
- **Issue #1747 — Token Plan / GLM-5.3.** Maintainer poll on a paid token-plan tier optimized for Claude Code and Codex around the upcoming GLM-5.3 release. ([#1747](https://github.com/musistudio/claude-code-router/issues/1747))
- **Issue #1789 — Qoder Cn enterprise sub-account support.** Feature request to recognize Qoder Cn (Chinese enterprise distribution) sub-accounts. ([#1789](https://github.com/musistudio/claude-code-router/issues/1789))

No new hardware backends or quantization formats were added today.

## 4. Performance & Optimization

No throughput, latency, memory, or kernel-level performance work landed today. The two routing/usage fixes in this digest are *correctness* fixes (avoiding incorrect $0 or wrong-model cost reports), not performance improvements.

## 5. Stability & Regressions

Ranked by severity:

1. **[High] Subagent routing could self-re-route under quoting — PR #1788 ([#1788](https://github.com/musistudio/claude-code-router/pull/1788)).** A `CCR-SUBAGENT-MODEL` value embedded inside a request's first-turn fields could trigger re-routing for the reviewing request itself. This is a logic/correctness defect in the gateway path; fix PR is open. Two additional defects addressed in the same PR: subagent routing elements were not properly scoped to real subagent launches, and uncaptured upstream HTTP status codes were not being logged.

2. **[Medium] Usage pricing incorrectly keyed on router alias — PR #1790 ([#1790](https://github.com/musistudio/claude-code-router/pull/1790)).** `modelMetadata` is indexed by the real upstream model ID, but usage/cost reporting was reading the alias echoed in the response. Result: cost reported as `$0` or a random `models.dev` lookup. Fix PR is open. Request logs had a parallel miss described in the same PR.

3. **[Medium] "All target providers failed" with NVIDIA Nemotron Ultra — Issue #1658 ([#1658](https://github.com/musistudio/claude-code-router/issues/1658)).** Reports that `nvidia/nemotron-3-ultra-550b-a55b` works via cc-switch and manual config but returns `400 All target providers failed` through CCR. No fix PR linked yet; worth watching for a provider-config or transformer incompatibility.

## 6. What This Means for Application Developers

- **Reconcile cost dashboards against the #1790 fix.** If you are metering Claude Code traffic through CCR and aggregating per-model spend, recent usage records for any aliased model may show `$0` or wrong-model pricing. Once #1790 lands, you will likely need to backfill or re-price historical usage for affected clients.
- **Audit subagent dispatch behavior on #1788.** If you use `CCR-SUBAGENT-MODEL` headers or routing rules, deploy the fix promptly — without it, a quoted routing directive in a review-style prompt can cause an unintended re-route. The fix is gateway-side, no config changes required.
- **OpenCode Go users gain parity.** With #1786, you can import Go credentials and the Go catalog through the same `ccr` import flow you already use for Zen, avoiding manual provider setup for the Go provider.
- **New routing option: Requesty.** If you operate multi-provider fleets and want a single OpenAI-compatible front in front of OpenAI / Anthropic / Google, PR #1451 will let you onboard Requesty via the standard preset flow once merged.
- **Track the GLM-5.3 / Token Plan discussion (#1747).** If you are budgeting for Claude Code or Codex usage through CCR, the maintainer's Token Plan proposal may change how GLM-5.3 capacity is allocated and priced — worth weighing in on the issue.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-12

## 1. Today's Highlights

CC Switch **v3.20.3** consolidates a months-long migration: Kimi's Codex presets now talk directly to the vendor's native OpenAI Responses endpoint, joining DeepSeek, Zhipu GLM, Qwen, MiniMax, Xiaomi MiMo, LongCat, Volcano/Doubao, and Tencent Hunyuan. The local format-translation router is no longer needed for any major Chinese open-source model in Codex. On the engineering side, the proxy layer is receiving the largest set of changes in the cycle — vendor-level outbound proxy, reversible PII masking, configurable model routing, and Anthropic→Responses/Grok reasoning-effort fidelity.

## 2. Releases & Breaking Changes

- **[v3.20.3](https://github.com/farion1231/cc-switch/releases/tag/v3.20.3)** — Kimi's Codex presets converted from Chat Completions to **native Responses** direct-to-vendor. Users with older Kimi Codex cards should re-add the preset or flip "Upstream Format" to `Responses` in the editor.
- **[PR #7317 — feat(proxy): configurable model routing](https://github.com/farion1231/cc-switch/pull/7317)** — ⚠️ **Breaking rename**: `model_mapper` is replaced by `model_router`. Any downstream tooling, scripts, or DB queries referencing the old module/field must be updated. Adds rule-based mapping of client-requested model names to upstream model IDs for Claude/Codex/Gemini.
- **[PR #7290 — vendor-level external API proxy](https://github.com/farion1231/cc-switch/pull/7290)** — Each provider can now have its own outbound proxy, with the external model ID shown in the provider list.
- **[PR #7292 — global outbound proxy control](https://github.com/farion1231/cc-switch/pull/7292)** — Adds a toggle to **stop inheriting the system proxy** and surfaces the currently effective proxy in settings (Clash/v2rayN stale-`HTTP_PROXY` bug class).
- **[PR #7306 — reversible PII masking](https://github.com/farion1231/cc-switch/pull/7306)** — Replaces irreversible `*`-masking with typed placeholders (`{{PHONE}}`, etc.) that are restored on the response side.

## 3. New Model & Hardware Support

- **[PR #7313 — cocodot provider for Claude Code + Codex](https://github.com/farion1231/cc-switch/pull/7313)** — New vendor preset (native Anthropic endpoint for Claude Code; Chat Completions via local routing for Codex); 5 model IDs shipped.
- **[PR #7296 — Laonong API preset across multiple apps](https://github.com/farion1231/cc-switch/pull/7296)** — Universal relay/gateway preset added to the catalog.
- **[PR #7330 — Zhipu OpenAI Responses model-list compatibility](https://github.com/farion1231/cc-switch/pull/7330)** — Adds model-list endpoint shape for the three Zhipu API styles so /v1/models works on Responses-mode providers.
- **[Issue #5258 — DaoXE universal preset request](https://github.com/farion1231/cc-switch/issues/5258)** — Anthropic Messages-compat provider still pending.
- No new hardware backends (CUDA/ROCm/Metal/CPU) or quantization formats in this window.

## 4. Performance & Optimization

- **[PR #7104 — normalize `image_url.detail` original→high](https://github.com/farion1231/cc-switch/pull/7104)** — Prevents 400s from strict upstreams when Codex Responses sends the Responses-only `detail:"original"` value; no measurable throughput cost, but eliminates an entire failure class for image-bearing turns.
- **[PR #7307 — npm dist-tag probe timeout](https://github.com/farion1231/cc-switch/pull/7307)** — Caps the version-check fetch that was hanging ~6 of 7 tool cards in *About → Local Environment Check*. Local probe (~0.6s) was fine; the remote leg had no timeout.
- **[PR #7327 — preserve text selection while scrolling](https://github.com/farion1231/cc-switch/pull/7327)** — Virtualized session list no longer unmounts selected DOM nodes outside the render range; fixes a perceived "selection shrinkage" regression in long sessions.

## 5. Stability & Regressions

**High severity**
- **[Issue #7190 — DeepSeek 400 "No tool output found for tool call"](https://github.com/farion1231/cc-switch/issues/7190)** — Codex image tool calls (`view_image`) cause upstream HTTP 400; `image_resize_notice` tool-call ordering suspected. Affects v3.20.1+. No fix PR merged yet.
- **[Issue #7308 — DeepSeek-V4.1-flash declared as non-multimodal](https://github.com/farion1231/cc-switch/issues/7308)** — Codex refuses images on a vision-capable model; looks like a capability-flag mismatch in the preset.
- **[Issue #5687 — 3.18.0 Codex sync permanently defers completed parent on post-idle fork](https://github.com/farion1231/cc-switch/issues/5687)** — Session import can stall indefinitely. **[PR #7297](https://github.com/farion1231/cc-switch/pull/7297)** addresses it (parent file stamp validation + regression test).
- **[Issue #7029 — macOS proxy tool exit breaks all usage/connectivity checks until app restart](https://github.com/farion1231/cc-switch/issues/7029)** — `error sending request` persists across reqwest connections after Clash/v2rayN exit. Likely related to PR #7292's system-proxy-disconnect control.

**Medium severity**
- **[Issue #3575 (closed) — Codex+DeepSeek "local proxy failed … failed to deserialize"](https://github.com/farion1231/cc-switch/issues/3575)** — Closed; root cause was the Chat→Responses migration completed in v3.20.3.
- **[Issue #6261 (closed) — `/v1` re-appended after every provider edit](https://github.com/farion1231/cc-switch/issues/6261)** — Save logic was stripping user `/v1` and re-prepending `chat/completion`; fixed for Bailian/百炼 Responses in **[PR #5276 lineage](https://github.com/farion1231/cc-switch/issues/5276)**.
- **[Issue #7235 — Windows: `config.toml` overwritten by CC Switch](https://github.com/farion1231/cc-switch/issues/7235)** — Plugins/UI settings lost when CC Switch re-syncs Codex; **[Issue #6600](https://github.com/farion1231/cc-switch/issues/6600)** documents the same class for theme/font preservation.
- **[Issue #2898 (closed) — `openai_chat` Auto Mode classifier exhausts `max_tokens`](https://github.com/farion1231/cc-switch/issues/2898)** — Closed; thinking-block transform path corrected.
- **[Issue #5312 — model name mapping silently dropped after skill re-import → 400s](https://github.com/farion1231/cc-switch/issues/5312)** — Re-import flow clobbers the mapping table; OpenCode upstream returns 400 until restart.
- **[Issue #7029](#)** and **[Issue #5278 — Codex Windows self-check false negative](https://github.com/farion1231/cc-switch/issues/5278)** — Connectivity probe false-negative even though the app works.
- **[PR #7302 — macOS Tahoe blank-window fix](https://github.com/farion1231/cc-switch/pull/7302)** — Adds WKWebView sandbox entitlements for macOS 26 (CVE-class tightening).

**Low severity / UX**
- **[PR #4298 — KDE tray restore: buttons unclickable + window grows each open](https://github.com/farion1231/cc-switch/pull/4298)** — `titleBarStyle: Overlay` misbehaves under GTK CSD on Linux/KDE.
- **[Issue #4457 — Gemini function calling errors](https://github.com/farion1231/cc-switch/issues/4457)**, **[Issue #5257 — empty thinking block breaks Claude Code TUI](https://github.com/farion1231/cc-switch/issues/5257)**, **[Issue #5279 — DB crash loop on Windows](https://github.com/farion1231/cc-switch/issues/5279)**.

## 6. What This Means for Application Developers

- **Migrate Codex presets once now.** Any Chinese open-source provider you had wired up in Codex via Chat Completions should be re-added or flipped to `Responses` to stop paying the local-translation tax (and to get the v3.20.x correctness fixes around `/v1` stripping and JSON deserialization).
- **Plan for `model_mapper` → `model_router` rename** if you script CC Switch's DB or build on its proxy. The new router is rule-based per-client (Claude/Codex/Gemini) and goes deeper than the old per-provider mapping.
- **You can stop fighting your OS proxy.** v3.20.x lets each provider pin its own outbound proxy, and the global toggle (PR #7292) prevents CC Switch from inheriting stale `HTTP_PROXY` after a VPN/client exit. If you saw intermittent `error sending request` failures, that's the targeted fix.
- **PII handling is about to become round-trippable.** The reversible-placeholder pipeline (PR #7306) means the model now sees typed placeholders rather than `*`s — useful if you were avoiding the feature because it destroyed reasoning quality.
- **MCP sync is being extended.** **[Issue #7220](https://github.com/farion1231/cc-switch/issues/7220)** requests Pi (`pi-coding-agent`) as a new MCP sync target; existing targets are Claude Code / Codex / Gemini / OpenCode / GrokBuild / Hermes.
- **Watch the DeepSeek/Codex image regression (#7190)** before shipping image-heavy workflows on v3.20.1–v3.20.3; expect a patch soon given the active thread.
- **Linux KDE users** should pull PR #4298 once it lands; macOS 26 Tahoe users should pull PR #7302 to fix the blank-window crash class.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-12

A daily snapshot of [`QuantumNous/new-api`](https://github.com/QuantumNous/new-api), the unified LLM gateway and billing platform.

---

## 1. Today's Highlights

The headline is **v1.0.0-rc.37**, which ships a major **pricing configuration overhaul** — a new billing-expression editor replaces the legacy pricing model (now marked for deprecation), with conditional pricing, per-call and time-based metering, plus image-usage and image-cache tracking. On the same day, two notable capability PRs landed: **Gemini / Vertex AI Agentic Video Understanding** ([#7337](https://github.com/QuantumNous/new-api/pull/7337)) and **vLLM as a first-class channel type** ([#7332](https://github.com/QuantumNous/new-api/pull/7332)). Two production-relevant stability fixes also merged or are ready: **cgroup-aware container memory monitoring** ([#7335](https://github.com/QuantumNous/new-api/pull/7335)) and a **nil-map panic guard in `InitChannelCache`** ([#7323](https://github.com/QuantumNous/new-api/pull/7323)).

---

## 2. Releases & Breaking Changes

- **[v1.0.0-rc.37](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.37)** — *Pricing Configuration, Task Plugins, and Passkey*
  - **Old pricing mode is deprecated.** A one-way migration tool converts current prices into billing-expression *drafts*; admins preview the effective price before saving.
  - New expression editor supports **conditional pricing, per-call billing, time-based conditions, image-usage and image-cache meters**.
  - Built-in default billing expressions for **`gpt-image-2`**, **`gpt-image-2.5-sunburst`**, **`gpt-image-2.5-flare`** — existing admin overrides still win.
  - **Task plugins**: streaming output support; pricing configuration can attach per-plugin usage prices and billing expressions; plugin details page now surfaces a changelog with an English fallback.
  - **Passkey** authentication shipped.
  - *Migration note:* operators should validate billing expressions against live traffic before flipping to the new mode; the old mode is still active in rc.37 but will be removed in a subsequent release.

- **Closed fixes shipping alongside rc.37 lineage:**
  - [PR #7013](https://github.com/QuantumNous/new-api/pull/7013) — Aliyun adapter now routes `/v1/responses` to the correct compatible-mode endpoint (was returning `InternalError: No gRPC response received` against direct MaaS hosts).
  - [PR #6948](https://github.com/QuantumNous/new-api/pull/6948) — Trailing-slash fix for `/api/channel` GET/POST (admin channel list/create was 404-ing).

---

## 3. New Model & Hardware Support

- **Gemini API + Vertex AI Agentic Video Understanding** — [PR #7337](https://github.com/QuantumNous/new-api/pull/7337) (closes [#7336](https://github.com/QuantumNous/new-api/issues/7336)). Passes media and tool-trace fields end-to-end and routes Vertex-native agentic requests appropriately. Tracks Google's [video-understanding docs](https://ai.google.dev/gemini-api/docs/video-understanding) and [Vertex AI docs](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video-understanding).
- **vLLM channel type** — [PR #7332](https://github.com/QuantumNous/new-api/pull/7332). A new channel adapter for vLLM-served models, enabling self-hosted inference engines to be exposed through the same gateway, billing, and routing stack as managed providers.
- **Image-model coverage with built-in billing defaults** — `gpt-image-2`, `gpt-image-2.5-sunburst`, `gpt-image-2.5-flare` ship with default billing expressions in rc.37.

---

## 4. Performance & Optimization

- **Container memory monitoring correctness** — [PR #7335](https://github.com/QuantumNous/new-api/pull/7335) (closes [#6744](https://github.com/QuantumNous/new-api/issues/6744)). `system_monitor` now reports memory from **cgroup limits** instead of host `/proc/meminfo`, so `monitor_memory_threshold` actually fires inside Docker/Kubernetes. Concrete effect: alerts tied to memory pressure will now trigger inside containers; previously the threshold could never be reached.
- **Channel health probing — de-duplicated by `(channel, model)`** — [PR #7328](https://github.com/QuantumNous/new-api/pull/7328). Adds `/status` and `/api/status-check`; the probe runs once per `(channel, model)` pair and the result fans out to all groups referencing that pair. Reduces probe traffic multiplicatively for gateways with many overlapping group→model mappings.
- **WebSocket relay for `/v1/responses`** — [PR #5062](https://github.com/QuantumNous/new-api/pull/5062) (still open, long-running). Adds WS `response.create` event handling with gateway-side model validation, channel selection, upstream WS forwarding, usage metering, and failure refunds. Will materially reduce tail latency for long-lived Responses streams vs. HTTP polling.
- **Dependency hygiene** — [PR #7327](https://github.com/QuantumNous/new-api/pull/7327) bumps `js-yaml` 4.3.1 → 4.3.2 in `/electron`.

---

## 5. Stability & Regressions

Ranked by severity (highest first):

| Sev | Issue | Summary | Fix? |
|---|---|---|---|
| 🔴 High | [#7331](https://github.com/QuantumNous/new-api/issues/7331) | `InitChannelCache` panics with `assignment to entry in nil map` when an enabled channel's group has no `abilities` row. Reproduces on `main` and rc.30. | ✅ [#7323](https://github.com/QuantumNous/new-api/pull/7323) open |
| 🔴 High | [#6744](https://github.com/QuantumNous/new-api/issues/6744) | `monitor_memory_threshold` never triggers in containers — `system_monitor` reads host `/proc/meminfo`, not cgroup. | ✅ [#7335](https://github.com/QuantumNous/new-api/pull/7335) open |
| 🟠 Medium | [#7201](https://github.com/QuantumNous/new-api/issues/7201) — **closed** | `qwen3.7-max` / `qwen3.8-max` get trimmed to `qwen3.7` / `qwen3.8` after v1.0.0-rc.31, breaking routing for newer Qwen model names. | Closed (no PR linked in today's activity) |
| 🟠 Medium | [#7319](https://github.com/QuantumNous/new-api/issues/7319) | `audio` modality not matched case-insensitively — capitalised variants silently bypass capability checks on rc.26. | No fix PR today |
| 🟡 Low | [#7309](https://github.com/QuantumNous/new-api/issues/7309) | "Model Plaza → Performance" page leaks groups the viewer shouldn't see. Information-disclosure class bug. | No fix PR today |
| 🟡 Low | [#6972](https://github.com/QuantumNous/new-api/issues/6972) | Active session cap reached with no escape hatch for self-revocation in some deployments. UX/support friction. | No fix PR today |
| ⚪ Invalid | [#6708](https://github.com/QuantumNous/new-api/issues/6708) — closed | `model_mapping` on `/v1/responses` non-passthrough — closed as invalid. | n/a |
| ⚪ Invalid | [#7329](https://github.com/QuantumNous/new-api/issues/7329) — closed | Feature request for first-party OpenCode Zen provider. | Closed (no in-flight PR) |
| ⚪ Invalid | [#7330](https://github.com/QuantumNous/new-api/issues/7330) — closed | Off-topic commercial vendor search. | Closed |

**Already-landed stability fixes** (merged today): [#7013](https://github.com/QuantumNous/new-api/pull/7013) (Aliyun Responses routing) and [#6948](https://github.com/QuantumNous/new-api/pull/6948) (channel-list API trailing slash). [#7328](https://github.com/QuantumNous/new-api/pull/7328) landing-page + channel-health + gateway hardening also closed.

---

## 6. What This Means for Application Developers

- **Plan a pricing-model migration window.** If you operate New API on rc.25 or older, rc.37 introduces a parallel billing-expression system but the legacy mode is flagged for removal. Use the in-product "convert to draft" path, sanity-check the preview against current invoices, and save — don't wait for the legacy path to be cut off.
- **Self-hosted inference just got easier.** The new **vLLM channel** ([#7332](https://github.com/QuantumNous/new-api/pull/7332)) lets you front your own vLLM deployments with New API's routing, retries, and metering — useful for hybrid setups that mix commercial providers with on-prem models under a unified billing surface.
- **Video-understanding agents on Gemini/Vertex are unblocked.** [PR #7337](https://github.com/QuantumNous/new-api/pull/7337) ships the request/response plumbing for Agentic Video Understanding including tool traces. Expect to wire this into agent loops that need frame-level reasoning.
- **Container deployments: your memory alerts will start firing.** Once [#7335](https://github.com/QuantumNous/new-api/pull/7335) lands, any operator relying on `monitor_memory_threshold` should re-tune the threshold — prior values were effectively dead because the monitor was reading host memory, which is almost always larger than the cgroup limit.
- **Watch out for Qwen model-name regressions.** [#7201](https://github.com/QuantumNous/new-api/issues/7201) shows `qwen3.7-max`/`qwen3.8-max` are being truncated to `qwen3.7`/`qwen3.8` on rc.31+. If you pin those model IDs, validate routing end-to-end after upgrading.
- **Pin to rc.37+ if you rely on `/v1/responses` against Aliyun.** The compat-mode routing bug ([#7013](https://github.com/QuantumNous/new-api/pull/7013)) caused silent `InternalError` failures — update to a build that includes this fix.
- **Long-running streams coming.** PR [#5062](https://github.com/QuantumNous/new-api/pull/5062) brings a WebSocket relay for the Responses API; if you're building long-lived agent sessions, this will eventually replace your HTTP-polling workarounds — worth tracking the PR for when it merges.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*