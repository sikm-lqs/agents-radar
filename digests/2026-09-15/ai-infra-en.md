# AI Infrastructure Digest 2026-09-15

> Generated: 2026-09-14 17:02 UTC | Projects covered: 9

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

# Cross-Project AI Infrastructure Report — 2026-09-15

## 1. Ecosystem Overview

The AI infrastructure stack shows clear stratification today: datacenter serving engines (vLLM, SGLang) are heads-down hardening DeepSeek-V4.1 support and distributed/agentic serving paths, while edge runtimes (llama.cpp, Ollama, Unsloth Studio) race to cover new architectures across an unusually broad hardware matrix. The gateway layer (LiteLLM, New API, CC Switch, Claude Code Router) is consumed by protocol-translation correctness — particularly OpenAI Responses ↔ Chat bridges and Anthropic compatibility — plus billing/rate-limit integrity. Only one project shipped a release (llama.cpp 0.4.1), suggesting the ecosystem is in a stabilization rather than feature-shipping phase. The recurring cross-cutting failure classes are tool-call fidelity, reasoning-content transport, and prefix-cache behavior under agentic multi-turn traffic.

## 2. Activity Comparison

*Counts are unique issues/PRs referenced in today's digests — a proxy for triage-relevant activity, not raw GitHub volume.*

| Project | Issues referenced | PRs referenced | Release status |
|---|---|---|---|
| **vLLM** | ~22 | ~17 | No release; v0.29.0 in the wild |
| **SGLang** | ~18 | ~19 | No release; rust frontend evolving |
| **llama.cpp** | ~16 | ~25 | **✅ v0.4.1 (b10964) shipped** — heap-corruption fix, BF16 fallback, SYCL TOP_K |
| **Ollama** | ~14 | ~5 | No release (0.33.x era); bug-dominated day |
| **LiteLLM** | ~30 | ~20 | No release; highest issue volume in digest set |
| **Unsloth** | ~20 | ~18 | No release; Studio hardening + NPU groundwork |
| **Claude Code Router** | ~3 | ~4 | No release; narrow, focused thread |
| **CC Switch** | ~21 | ~19 | No release; v3.20.3 flagged with regressions (#7401) |
| **New API** | ~17 | ~12 | No release; **rc.37 flagged not production-safe** (#7361) |

**Notable:** SGLang reports the healthiest CI posture (`1 broken / 14 flaky / 999 recently fixed`), while two projects carry explicit "don't upgrade/pin now" advisories (CC Switch v3.20.3, New API rc.37).

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | Gateways/Other |
|---|---|---|---|---|---|
| **DeepSeek V4 / V4.1-Flash** | ✅ SWA bounded replay, H20, MI355X, DCP+DFlash fix | ✅ Perf board, TBO, R3 MXFP4, AMD DSA | — | — | CC Switch `tool_call_id` bug (#7156); New API reasoning echo (#6939) |
| **GLM-5.2 / 5.3-Flash** | ⚠️ NVFP4 autotune fix; "word salad" bug open | ✅ gfx942/gfx950 AMD paths; disagg crash open | — | — | GLM Codex error-envelope surfacing (CC Switch #6912) |
| **Qwen3.8-Flash-Next / Qwen4Exp** | — | ✅ NPU QSA + graph mode + MTP | ✅ hyperconnection ops (`hc_pre`/`hc_comb`); ⚠️ long-context EOS bug on Metal | — | — |
| **Qwen3.5 family** | ⚠️ hybrid GDN regressions | ✅ mamba radix-cache fixes | ✅ embedding GGUF conversion | ✅ coder cache fix (#18433) | — |
| **Gemma 4** | — | ⚠️ vision tower crash on non-RGB | ⚠️ Vulkan crash, thinking garbage | ⚠️ tool-call key bug (#18390) | Unsloth vision fix (#6028) |
| **MiniMax (H3 / Code)** | — | ⚠️ NPU precision | — | — | CC Switch: new MiniMax Code harness + `<think>` leak fix |
| **New entrants** | UNO spec-decode RFC, DDTree | SenseNova-U1 tracking | STQ1_0 ternary quant | SARVAM, Gnani requests | Huawei MaaS channel (New API) |

**Verdict:** vLLM and SGLang are effectively tied at the frontier on NVIDIA, with SGLang arguably ahead on AMD/Intel/NPU breadth this cycle and vLLM ahead on DeepSeek-V4.1-Flash feature depth (SWA replay, DFlash+DCP). llama.cpp leads consumer/edge backend coverage by a wide margin (Metal, Vulkan, SYCL, OpenCL, Hexagon, WebGPU). The gateways don't "support models" — they inherit and expose the engines' bugs, which is exactly what today's issue lists show.

## 4. Performance Frontier

- **KV cache & disaggregation (largest cluster).** vLLM: HiSparse P/D direct-GPU landing (#55398), SWA bounded replay slashing KV transfer cost, KV-offload metrics. SGLang: distributed KVCache roadmap for agentic traffic (#21846, 30👍), SWA page-lookup fusion, MXFP8 padding-write skip, FP4 KV quant/store fusion proposal.
- **Speculative decoding mainstreaming — with caveats.** DFlash gives ~3× short-context wins but a ~4× *loss* past ~185k tokens on hybrid GDN (71→16 tok/s, vLLM #54691); SGLang proposes LiLiCorr reranking for DFlash incoherence; MTP/NEXTN appears in vLLM, SGLang, llama.cpp, and Unsloth (VRAM budgeting #10149).
- **Quantization.** MXFP4/NVFP4 dominates engine work (Triton 3.8 adapter, FlashInfer W4A16→W4A4 silent-degrade bug #56535, SGLang online MXFP4 updates); llama.cpp pushes the low end with 1.25-bit ternary (STQ1_0).
- **Distributed serving.** vLLM PCP full decode-only CUDA graphs (#53867) and FlashInfer one-sided all2all (+8% on disagg Qwen3.5 397B NVFP4); SGLang EP+MoE-TP all-reduce merge — which also fixed a GSM8k crash to **0.012 accuracy** from a skipped reduction (#32963), a reminder that parallelism refactors carry correctness risk.
- **Kernels.** ROCm tuned-GEMM refactor (vLLM), DeepGEMM MegaMoE buffer sizing (SGLang), SYCL GPU-resident TOP_K, OpenCL batch-aware MoE matmul (llama.cpp).
- **Control-plane latency.** The gateway perf story is auth-path milliseconds (LiteLLM #41087: cached team lookups), not FLOPs — a different optimization regime entirely.

## 5. Layer Positioning

- **Datacenter serving engines — vLLM, SGLang.** Own the model-parallelism, KV, and kernel surface. Competing directly on DeepSeek-V4.1 and disagg; both now treat agentic multi-turn traffic as a first-class design constraint.
- **Local/edge runtimes — llama.cpp (backend fabric), Ollama (application layer on top).** llama.cpp is the portable substrate everyone builds on; Ollama differentiates on UX and API compatibility, and today's bugs (EXIF, prompt-cache, tool-call parsing) sit squarely at that app layer.
- **Gateways / proxies — LiteLLM (enterprise: budgets, rate limits, spend logs), New API (relay + billing, multi-tenant).** Both are fighting accounting-integrity battles today: LiteLLM's half-enforced RPM limits (#34140) and silent spend-zeroing (#39370); New API's rc.37 24× RSS regression and usage-loss on Responses snapshots (#6822).
- **Agent-routing specialists — Claude Code Router, CC Switch.** Protocol translation (Anthropic ↔ OpenAI Responses/Chat) and provider-switching for coding harnesses (Codex, MiniMax Code, DeepSeek Harness, Antigravity). This is the newest and buggiest layer.
- **Fine-tuning — Unsloth.** Primarily training-side, but Studio increasingly ships an inference/serving surface, and its backend plumbing (llama.cpp bundles, Vulkan routing, MTP VRAM) makes it a peer of the runtime layer. Layer boundaries are visibly blurring — New API adding native vLLM/SGLang channels (#7332) is the same signal from the other direction.

## 6. Trend Signals

1. **DeepSeek V4.1 is the ecosystem's integration event.** Bugs span every layer: kernels (vLLM #56389, SGLang #39402), parsing (SGLang DSML tool-call wrapper #38924), and gateways (CC Switch `tool_call_id` #7156, New API #6939). Budget integration-test time before adopting it on any stack.
2. **Protocol translation is the new failure surface.** Reasoning content is lost or mangled in Responses↔Chat bridges at LiteLLM (#40887, #40654), CC Switch (#5860 — 120–140k-character repetition loops), and New API (#6822). Pin one API surface per stack until bridges mature; treat OpenAI Responses as a distinct upstream, not a Chat alias.
3. **Agentic workloads are exposing KV-cache architecture limits.** SGLang's distributed-KVCache roadmap, vLLM's KV-offload integrity RFC (#54363), and prefix-cache bugs at Ollama (#18431 — system-role hoisting defeats Claude Code caching) and vLLM (#54094) all point the same direction. Autoscaling on token-usage metrics is currently unreliable (SGLang #30909).
4. **Tool-calling is the #1 app-layer bug class.** Ollama silently bills ~40 tokens for dropped calls (#17274), New API dropped Ollama final-frame `tool_calls` (#7252), Unsloth truncates MCP payloads (#10839). End-to-end tool-call smoke tests are now table stakes.
5. **Security is arriving late but arriving.** SGLang's unauthenticated `PUT /route` (#39400) demands immediate port lockdown; Unsloth's safety-check bypass (#10835) and CC Switch's prompt-injection scanning proposal (#7357) show the agent layer waking up to it.
6. **Non-NVIDIA acceleration is maturing from "compiles" to "tuned"** — vLLM MI355X perf RFCs, SGLang gfx942/950 + Intel XPU, llama.cpp Hexagon/OpenCL/SYCL, Unsloth NPU/Vulkan — but every project still carries open correctness bugs on these paths. Treat AMD/NPU as beta.
7. **Operational guidance for today:** cap `max_num_seqs ≤ 256` on H20 DeepSeek-V4.1 (vLLM #56389); disable speculative decoding past ~185k context on hybrid GDN; don't bill customers from LiteLLM proxy usage without reconciliation; pin New API to rc.36 and CC Switch ≤ v3.20.3 until flagged regressions clear; don't rely on vLLM OTLP traces for SLO alerting (#56696) — they export nothing on 0.29.0.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-15

## Today's Highlights

The DeepSeek-V4.1 serving stack continues to harden on main: the encoder-side SWA bounded replay landed behind [#56227](https://github.com/vllm-project/vllm/pull/56227) with the decoder-side companion stacked on top in [#56752](https://github.com/vllm-project/vllm/pull/56752), and a parallel boot-blocker for DFlash + DCP graph capture is fixed in [#56869](https://github.com/vllm-project/vllm/pull/56869). Observability gaps are also closing — KV offload capacity/config metrics arrive in [#56867](https://github.com/vllm-project/vllm/pull/56867) and [#53902](https://github.com/vllm-project/vllm/pull/53902), while [#56696](https://github.com/vllm-project/vllm/issues/56696) documents that `--otlp-traces-endpoint` initializes a tracer but never actually exports spans.

## Releases & Breaking Changes

No tagged releases in the last 24h. Headline recent version reported in the wild remains `vllm/vllm-openai:latest` shipping v0.29.0 (e.g. [#56696](https://github.com/vllm-project/vllm/issues/56696)).

Breaking-style changes to be aware of from recently merged work:
- **Scale-out endpoint flag renamed** — `VLLM_ENABLE_SCALE_OUT_ENDPOINTS=1` is gone; use `vllm serve --enable-scale-out` instead. EC E2E launcher updated in [#56819](https://github.com/vllm-project/vllm/pull/56819).
- **Triton 3.8 mxfp4 MoE API reshuffle** — `matmul_ogs`→`matmul`, `RoutingData`→`RaggedTensorMetadata`, `weight_scale`→`b_mx_scale`, in-kernel scatter+topk-reduce dropped. Adapter is version-gated to land standalone: [#55934](https://github.com/vllm-project/vllm/pull/55934).

## New Model & Hardware Support

- **DeepSeek-V4.1-Flash — SWA bounded replay** (encoder #56227, decoder #56752): 128-token sliding-window KV cache per layer opts out of prefix-cacheable storage and KV-connector transport, dramatically reducing KV transfer cost.
- **GLM-5.3-Flash** — reports of "word salad" degeneration in multi-turn agentic use, see [#56605](https://github.com/vllm-project/vllm/issues/56605). PR [#55879](https://github.com/vllm-project/vllm/pull/55879) reserves autotuning headroom for GLM TP2/PCP2 NVFP4 eval to keep PCP autotune from OOMing on main build 87636.
- **DeepSeek-V4.1-Flash on ROCm / MI355X** — first-pass perf data shared in [#56506](https://github.com/vllm-project/vllm/issues/56506): 8×MI355X, TP4, MXFP4 MoE + DSpark MTP, ~8.97 out-tok/s/GPU at concurrency 1 — the RFC is explicitly calling out significant headroom left on the device.
- **RDNA3 fused MoE** — bug filed: hardcoded 2× gated-activation factor breaks non-gated (relu2) models, e.g. Nemotron-3 on gfx1100: [#56790](https://github.com/vllm-project/vllm/issues/56790).
- **H20 (SM90) DeepSeek-V4.1-Flash** — `dsv4_topk` Triton MoE routing kernel hits CUDA illegal-memory access under high concurrency with `max_num_seqs > 256`; capped at 256 as mitigation: [#56389](https://github.com/vllm-project/vllm/issues/56389).
- **Transformers v5 upgrade** — living tracker maintained in [#38379](https://github.com/vllm-project/vllm/issues/38379), still in progress.
- **UNO spec decoding** — RFC proposed for native vLLM serving of the diffusion-augmented LLM: [#55267](https://github.com/vllm-project/vllm/issues/55267).
- **DDTree speculative decoding** — long-running feature request still open: [#40809](https://github.com/vllm-project/vllm/issues/40809).
- **Watermarking** — implementation PR #54053 referenced from tracking issue [#56105](https://github.com/vllm-project/vllm/issues/56105); compat/quality tests now being scoped.

## Performance & Optimization

- **DeepSeek-V4.1-Flash on 8×MI355X, TP4, MXFP4 MoE + DSpark MTP** ([#56506](https://github.com/vllm-project/vllm/issues/56506)):
  - Concurrency 1: 35.89 out-tok/s total, 8.97 out-tok/s/GPU, TTFT p50 0.898s.
  - RFC notes "leaves a lot of the device on the table" and is soliciting optimization proposals.
- **FlashInfer NVLink one-sided all2all** — proposed as CUDA default in [#54268](https://github.com/vllm-project/vllm/pull/54268): 8% faster disagg serving allgather_reducescatter on Qwen3.5 397B NVFP4 vs current default.
- **PCP autotuning OOM mitigation** ([#55879](https://github.com/vllm-project/vllm/pull/55879)) — unvalidated; addresses an autotune failure observed in TP2/PCP2/EP GLM-5.2 NVFP4.
- **Prefill-context-parallel decode-only FULL CUDA graphs** — [#53867](https://github.com/vllm-project/vllm/pull/53867) enables `FULL_DECODE_ONLY` and `FULL_AND_PIECEWISE` for PCP, with persistent rank-local input buffers.
- **DFlash long-context regression** — hybrid GDN models (Qwen3.5-family) drop from ~71 tok/s → ~16 tok/s at DT=4 / 185k context vs ~218 tok/s at DT=8 short-context win ([#54691](https://github.com/vllm-project/vllm/issues/54691)); a per-sequence-length disable hook is requested.
- **MoE MBU accounting** — [#54228](https://github.com/vllm-project/vllm/pull/54228) replaces the "perfect load balancing" upper bound with a distinct-activated-experts estimate, behind `--enable-mfu-metrics`.
- **HiSparse P/D direct GPU landing** ([#55398](https://github.com/vllm-project/vllm/pull/55398)) — receives prefill imports directly into final GPU pages when the decoder has capacity; falls back to host landing otherwise.
- **ROCm tuned-GEMM refactor** ([#55001](https://github.com/vllm-project/vllm/pull/55001)) — deletes hand-maintained hardcoded shapes/pandas scraping in `vllm/_aiter_ops.py`, calls aiter's `get_gemm_config` directly.

## Stability & Regressions

Ranked roughly by blast radius:

1. **Engine-start hang on `--help`-style early failure paths** — [#17676](https://github.com/vllm-project/vllm/issues/17676) (43 comments, 👍10, open since 2025-05). No fix PR linked yet. Severity: high for fresh deploys on broken configs.
2. **OTLP traces silently not exported** — [#56696](https://github.com/vllm-project/vllm/issues/56696). `--otlp-traces-endpoint` initializes a tracer but never invokes `instrument_otel`/`manual_instrument_otel`. Reproduced on `vllm-openai:latest` 0.29.0 and dev. Severity: high — observability silently broken.
3. **Batch invariance broken under sequence parallelism / async TP** — [#56370](https://github.com/vllm-project/vllm/issues/56370). `VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp` produces non-deterministic outputs across runs. Severity: high for any reproducibility-sensitive workload.
4. **Hybrid mamba prefix-cache resume crash (W4A16, custom `--block-size`)** — [#53142](https://github.com/vllm-project/vllm/issues/53142). Illegal memory access in `MambaHybridModelState.add_request`; state column seeded with wrong block size. Severity: high.
5. **Prefix caching fails for incremental multimodal requests on Mamba-Attention hybrid (Qwen3.5)** — [#43587](https://github.com/vllm-project/vllm/issues/43587). Severity: medium-high for hybrid-model multi-turn agents.
6. **Xid 13 chip-wide warp errors on SM120 under multi-hour load** — [#52225](https://github.com/vllm-project/vllm/issues/52225). Misaligned address / illegal instruction / out-of-range register; Nemotron-3.5-Lightning-30B-A3B-NVFP4 with marlin MoE hybrid Mamba. Severity: high for long-running production.
7. **DeepSeek-V4.1-Flash DCP + DFlash boot-blocker** — fixed by [#56869](https://github.com/vllm-project/vllm/pull/56869) (DFlash speculator ranks must be aligned before graph capture). PR open.
8. **FlashInfer `flashinfer_b12x` MoE runs W4A16 NVFP4 as W4A4** — [#56535](https://github.com/vllm-project/vllm/pull/56535). Activations are silently dequantized twice on Qwen3.6-35B-A3B-NVFP4. PR open.
9. **DFlash2 + YaRN identical 1.04M prompt gets zero prefix-cache reuse** — [#54094](https://github.com/vllm-project/vllm/issues/54094). Target-only reuses ~1.039M tokens. Severity: medium.
10. **GLM-5.3-Flash degenerates into repeated-token "word salad" in multi-turn agents** — [#56605](https://github.com/vllm-project/vllm/issues/56605). Severity: medium.
11. **Whisper segment timestamps drift ~0.5s/segment after 30s** — [#32588](https://github.com/vllm-project/vllm/issues/32588). Long-form ASR quality bug.
12. **DeepSeek-V4 failed to load on 8×RTX PRO 6000 (Blackwell)** — [#40821](https://github.com/vllm-project/vllm/issues/40821), still open, 👍6. Likely model-loader compat with custom Blackwell image.
13. **T4 (Turing) `out of resource: shared memory` on triton kernels** — [#36802](https://github.com/vllm-project/vllm/issues/36802). `Required 81920, HW limit 65536`.
14. **Qwen3-ASR encoder pre-allocated cache size limit** — [#39408](https://github.com/vllm-project/vllm/issues/39408).
15. **CudaGraph unit test boot-fail** — [#56808](https://github.com/vllm-project/vllm/pull/56808) fixes a test that constructs `CudaGraphManager` via `__new__` and missed the new `ubatch_runner` from PR #51700.
16. **Kimi K2.5 vision eager `torch.compile`** — [#53011](https://github.com/vllm-project/vllm/pull/53011) fixes eager `torch.compile` in `get_rope_shape` that could initialize Triton before vLLM's cache dirs.
17. **MultiConnector cannot combine piecewise prefix from two connectors** — addressed by [#54240](https://github.com/vllm-project/vllm/pull/54240) (open).

Two adjacent observability gaps worth flagging:
- **Blackwell unified-memory paging telemetry absent** in vLLM despite the reference mapping living in `dgx-spark-monitoring` — [#54200](https://github.com/vllm-project/vllm/issues/54200).
- **KV offload filesystem tier** has no integrity verification and no bound on a single I/O op latency — RFC [#54363](https://github.com/vllm-project/vllm/issues/54363).

## What This Means for Application Developers

- **If you depend on reproducible outputs**: do not enable `pass_config.enable_sp` together with `VLLM_BATCH_INVARIANT=1` until [#56370](https://github.com/vllm-project/vllm/issues/56370) is fixed — outputs will diverge across runs. Pin one mode.
- **If you rely on distributed tracing**: `--otlp-traces-endpoint` currently exports nothing on `vllm-openai:0.29.0`. Don't depend on it for SLO alerting; expect a fix and re-validate once a release ships.
- **Speculative decoding is not free on hybrid GDN models**: DFlash gives a ~3× win short-context but a ~4× loss past ~185k tokens ([#54691](https://github.com/vllm-project/vllm/issues/54691)). Plan for a per-context-length toggle or disable at long context.
- **DeepSeek-V4.1 production deploys on H20** should cap `max_num_seqs ≤ 256` until [#56389](https://github.com/vllm-project/vllm/issues/56389) lands; for Blackwell RTX PRO 6000, treat the loader path as still WIP ([#40821](https://github.com/vllm-project/vllm/issues/40821)).
- **ROCm / MI355

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-15

## 1. Today's Highlights

- **Security disclosure surfaces a real production risk**: SGLang's bootstrap HTTP server exposes an unauthenticated `PUT /route` endpoint that allows route poisoning and metadata redirection (#39400) — operators with exposed bootstrap ports should treat this as immediate-action.
- **Distributed KVCache for agentic workloads is officially on the roadmap** (#21846, 30 👍): the existing PD-disaggregation + HiCache stack is acknowledged as a bottleneck for agentic traffic, with a tracked plan to overhaul it.
- **DeepSeek V4 stabilization continues at full pace**: HiSparse token-usage inflation (#30909), DeepGEMM MegaMoE buffer sizing (#39223), non-EP TBO correctness on attention-TP>1 (#33250), and R3 MXFP4 online updates (#39392) are all converging on the NVIDIA path, while AMD-side work (#39253, #39340) addresses a GSM8k accuracy gap and GLM-5.3-Flash DSA support.

## 2. Releases & Breaking Changes

No new releases in the last 24h. The rust frontend continues to evolve under the hood (see #39412 below), and the next release should be expected to fold in the HiCache file-backend hybrid-pool fix and the bootstrap hardening.

## 3. New Model & Hardware Support

| Item | Scope | Ref |
|---|---|---|
| SenseNova-U1 / U1.5 | Tracking issue opened; reference impl OpenSenseNova/SenseNova-U1 | [#37742](https://github.com/sgl-project/sglang/issues/37742) |
| DeepSeek V4 (NVIDIA SM90/SM10X) | Perf-tracking board; FlashInfer MNNVL already merged, TRT-LSM attention integration in progress | [#33636](https://github.com/sgl-project/sglang/issues/33636) |
| Qwen3.8-Flash-Next on NPU | QSA + graph mode + NEXTN/MTP speculative decoding, draft NPU | [#37570](https://github.com/sgl-project/sglang/pull/37570) |
| GLM-5.2 / GLM-5.3-Flash (AMD) | gfx942 shared-expert fusion opt-in (#39247), gfx950 PTPC FP8 KDA (#38764), DSA page-table transform supporting non-2048 top-k widths (#39340) | [#39247](https://github.com/sgl-project/sglang/pull/39247), [#38764](https://github.com/sgl-project/sglang/pull/38764), [#39340](https://github.com/sgl-project/sglang/pull/39340) |
| Intel XPU | PD-disaggregation staging-buffer KV transfer generalized away from `torch.cuda`; weekly model enablement consolidation | [#26501](https://github.com/sgl-project/sglang/pull/26501), [#39439](https://github.com/sgl-project/sglang/pull/39439) |
| NPU diffusion (Wan2.2, FLUX) | Modelslim W4A4F8 / W8A8F8 quantization paths | [#39438](https://github.com/sgl-project/sglang/pull/39438) |
| XGrammar 0.2.6 | Lark grammar compilation exposed through the existing API | [#39380](https://github.com/sgl-project/sglang/pull/39380) |
| DFlash speculative decoding | LiLiCorr candidate-lattice reranker proposed to address per-position vs joint-distribution incoherence | [#37462](https://github.com/sgl-project/sglang/pull/37462) |
| CPU backend | `fp8_per_tensor_scaled_mm_cpu` kernel added | [#32618](https://github.com/sgl-project/sglang/pull/32618) |

## 4. Performance & Optimization

- **HiSparse DeepSeek V4 token usage** — empty KV caches were reporting high `full token usage` due to a 20:1 logical-to-compressed ratio being misread; PR fixes startup reporting accuracy (#30909).
- **MegaMoE buffer sizing** — DeepGEMM derives its buffer from runtime SM count; SGLang's prior SM-budget logic left buffer slots wasted. Resizing aligns buffer allocation with the effective SM budget (#39223).
- **EP+MoE-TP all-reduce merge** — with `--tp-size 4 --ep-size 2`, the two orthogonal-group all-reduces post-experts are now fused into one `_TP` reduction. Without the fix, GSM8k accuracy was observed at 0.012 due to the skipped `_MOE_EP` reduction (#32963).
- **SWA page-lookup fusion** — peer-page lookup and FULL-to-SWA mapping clear are merged into one Triton kernel, reducing per-free scheduler dispatch overhead (#38948).
- **MXFP8 KV cache padding-slot write skip** — writes to the reserved CUDA-graph padding sink are skipped, eliminating a class of wasted store traffic on padded lanes (#35351).
- **DeepSeek-V4 TBO (non-EP, attn-TP>1)** — full-TP variable-length collectives were incorrectly treating replica tensors as independent; fix lands (#33250).
- **DSV4 R3 capture + MXFP4 online updates** — replaces an auto-closed PR whose `sglang-miles` branch was deleted; the fix is re-submitted with a one-commit head (#39392).
- **FP4 MXBlock16 KV cache quant/store fusion** — proposal to fuse the four indexed writes plus separate K/V quantization into one pass (#39429).
- **AMD EAGLE verify** — temperature sampling in the verify step closes a GSM8k-class accuracy gap on DeepSeek-V4 benchmark runs (#39253).

## 5. Stability & Regressions

Ranked by severity:

| Sev | Issue | Status / Fix | Ref |
|---|---|---|---|
| 🔴 Security | **Unauthenticated `PUT /route` on Bootstrap HTTP allows route poisoning & metadata redirection** | OPEN, no fix yet — operators should restrict the bootstrap port now | [#39400](https://github.com/sgl-project/sglang/issues/39400) |
| 🔴 Crash | `ep_scatter_from_psum` missing `expert_start/num_experts` args → `TypeError` on deepep_v2 prefill | OPEN | [#39402](https://github.com/sgl-project/sglang/issues/39402) |
| 🔴 Crash | GLM-5.3 crash on disagg decode + dp-attention + spec decode | OPEN | [#39072](https://github.com/sgl-project/sglang/issues/39072) |
| 🔴 Crash | `--enable-mixed-chunk` corrupts mamba radix cache checkpoints on hybrid GDN models (mixed batch skips `extra_buffer` write) | OPEN, design discussion in [#39430](https://github.com/sgl-project/sglang/pull/39430) which adds a fail-fast guard for non-mamba archs | [#39342](https://github.com/sgl-project/sglang/issues/39342) |
| 🔴 Crash | CUDA_ERROR_ILLEGAL_ADDRESS in MXFP8FP4 / W4A8 MegaMoE on B300 (sgl-deep-gemm 0.1.7) | OPEN | [#37559](https://github.com/sgl-project/sglang/issues/37559) |
| 🔴 Crash | CUDA illegal memory access in QSA extend forward at 8 concurrent requests (Qwen3.8-Flash-Next-FP8, H20 TP8); suppressed by `CUDA_LAUNCH_BLOCKING=1` and `--disable-overlap-schedule` | OPEN | [#37633](https://github.com/sgl-project/sglang/issues/37633) |
| 🟠 Correctness | HiCacheFile reports unrestorable prefix as a hit for hybrid cache pools (`batch_exists_v2` min-over heuristic) | OPEN | [#39147](https://github.com/sgl-project/sglang/issues/39147) |
| 🟠 Correctness | SM120 grouped FP8 DeepGEMM weight preparation skips UE8M0 requantization | OPEN | [#39063](https://github.com/sgl-project/sglang/issues/39063) |
| 🟠 Correctness | DeepSeek V4 / V3.2 DSML tool-call parser occasionally wraps arguments in a spurious `"arguments"` / `"input"` key | OPEN | [#38924](https://github.com/sgl-project/sglang/issues/38924) |
| 🟠 Correctness | NPU Ascend A3 inference of MiniMax H3 has precision issues | CLOSED (likely stale / not reproducible with new info) | [#39386](https://github.com/sgl-project/sglang/issues/39386) |
| 🟠 Correctness | Gemma-4 mm: non-RGB image survives the channel guard, crashes the vision tower, and takes down the scheduler (mat1 256 vs 768) | OPEN | [#26751](https://github.com/sgl-project/sglang/issues/26751) |
| 🟡 Functional | PD bootstrap params (`bootstrap_host/port/room`) silently dropped on rust frontend OpenAI endpoints | OPEN — root cause is `dynamo-protocols` request type not carrying them through lowering to `GenerateRequest` | [#39412](https://github.com/sgl-project/sglang/issues/39412) |
| 🟡 Test infra | `test_expert_pack_mxfp4.py` intermittently hangs while loading JIT extension on H200 | CLOSED | [#38408](https://github.com/sgl-project/sglang/issues/38408) |
| 🟡 Docs | Duplicated content between SGLang Docs and SGLang Cookbook — long-standing cleanup task | OPEN | [#18427](https://github.com/sgl-project/sglang/issues/18427) |

CI: the central tracking issue (#17050) reports `1 broken / 14 flaky / 999 recently fixed` as of 2026-09-14 16:34 UTC — overall health is strong, with one known broken test to track.

## 6. What This Means for Application Developers

- **Lock down your bootstrap port today.** Until #39400 is patched, do not expose SGLang's bootstrap HTTP service to untrusted networks. Front it with a local-only listener or a sidecar that authenticates upstream.
- **DeepSeek V4 on NVIDIA is converging but not yet boring.** If you depend on `--tp-size N --ep-size M` with M>1, watch the all-reduce merge PR (#32963) and the non-EP TBO fix (#33250) for accuracy regressions in your GSM8k/MMLU/IFBench pipelines. Verify a known-good eval set against a candidate build before swapping in production.
- **HiSparse + DeepSeek V4 memory accounting is unreliable until #30909 lands.** If you autoscale on `full token usage`, expect over-eager scale-outs at startup; treat startup metrics with a warm-up window or override on the SGLang side.
- **Agentic workloads need to plan for KVCache sharding.** The roadmap in #21846 acknowledges HiCache + PD-disaggregation as inadequate for long-context, multi-turn agentic traffic. If you run agents with sustained KV footprints, follow that issue for the eventual distributed KVCache design and budget accordingly.
- **NPU + Qwen3.8-Flash-Next is still draft.** Production users should stay on the mainline generic path; graph-mode + MTP on NPU is in active development (#37570).
- **Rust frontend PD bootstrap is silently broken** (#39412). If you use the dynamo/rust frontend for PD-disagg with bootstrap room routing, expect dropped fields — pin to the python frontend or apply the openai-compat shim yourself until the fix lands.
- **Tool-call parsers for DeepSeek V4/V3.2 are not 100% reliable** (#38924). Add a JSON-shape validator on the client side if you consume `tool_calls` directly without a downstream parser.
- **Speculative decoding on DFlash drafts may produce jointly-incoherent blocks**; #37462 (LiLiCorr) is a candidate reranker proposal worth evaluating for any DFlash-served latency-sensitive path.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-15

## Today's Highlights

Version **0.4.1** is cut ([#28900](https://github.com/ggml-org/llama.cpp/pull/28900)) over a stack of small but high-impact fixes — most notably a ggml-cpu precompiled-header regression that was silently corrupting the heap on macOS arm64 ([#28882](https://github.com/ggml-org/llama.cpp/pull/28882) / [issue #28858](https://github.com/ggml-org/llama.cpp/issues/28858)). The same 24h also ships a CUDA BF16→F32 fallback path for pre-Ampere NVIDIA / pre-RDNA3 AMD silicon and a SYCL rewrite of `TOP_K` that keeps large-k sampling on-device instead of bouncing to the CPU. Backend breadth keeps expanding: OpenCL is gaining a generic `ssm_scan` and MoE matmul batch-size selection, Metal gets a long-missing (96, 64) flash-attention tile for MiniCPM3, Hexagon restores a contiguous copy fast-path, and Vulkan picks up sparse Flash Attention.

## Releases & Breaking Changes

- **[b10964 — 0.4.1](https://github.com/ggml-org/llama.cpp/releases/tag/b10964)** ([#28900](https://github.com/ggml-org/llama.cpp/pull/28900)): official version bump. macOS/Apple Silicon, Linux, Windows artifacts attached; SLSA attestations published.
- **Behavior changes folded into 0.4.1** worth flagging to downstream packagers:
  - [b10955](https://github.com/ggml-org/llama.cpp/pull/28882) — `ggml-cpu` precompiled header **disabled** and `CACHE_LINE_SIZE` ambiguity resolved. Resolves heap corruption seen on macOS arm64 with AppleClang; the `std::hardware_destructive_interference_size` branch is gone, so any out-of-tree build that relied on it must adapt.
  - [b10950](https://github.com/ggml-org/llama.cpp/pull/28846) — `ggml-cuda` now transparently downgrades BF16 ops to F32 on devices without hardware BF16 (NVIDIA pre-Ampere, AMD pre-RDNA3 / pre-CDNA). Expect numerical drift on older cards.
  - [b10956](https://github.com/ggml-org/llama.cpp/pull/28670) — SYCL `TOP_K` lifted to a GPU-resident radix-select implementation, removing the artificial `k > 32` → CPU-fallback path.
  - [b10952](https://github.com/ggml-org/llama.cpp/pull/28704) — SYCL oneDNN scratchpad no longer breaks the VMM pool's LIFO free order (see [#28660](https://github.com/ggml-org/llama.cpp/issues/28660)).
  - [b10951](https://github.com/ggml-org/llama.cpp/pull/28749) — `llama_n_rs_seq()` reordering: an out-of-range sequence-id count now short-circuits before `llama_decode`, changing observable behavior for callers that relied on the old `goto`/res path.
  - [b10947](https://github.com/ggml-org/llama.cpp/pull/28779) — `nemotron-h` NextN/MTP expert FFN size derivation guarded against `n_expert_used == 0`.
  - [b10946](https://github.com/ggml-org/llama.cpp/pull/28775) — `ggml-cpu` s390x VXE-only repack helpers guarded so non-VXE builds compile.
  - [b10948](https://github.com/ggml-org/llama.cpp/pull/28855) — WebGPU test arch matrix no longer includes HY_V4.

## New Model & Hardware Support

- **Qwen3.5 embedding models** added to `convert_hf_to_gguf.py` ([#27920](https://github.com/ggml-org/llama.cpp/pull/27920)) — unlocks GGUF conversion for `Qwen3_5TextModel` checkpoints (e.g. `Rebine/Qwen3.5-Embedding-0.8B`).
- **Qwen4Exp (Qwen3.8-Flash-Next) hyperconnection ops** — `hc_pre` (per-element gate) and `hc_comb` (NULL comb) added at the graph level ([#28901](https://github.com/ggml-org/llama.cpp/pull/28901)); enables correct inference on Metal/CUDA/SYCL/Vulkan backends for this new architecture.
- **MiniCPM3 on Metal** — flash-attention tile pair `(HSK=96, HSV=64)` added ([#28599](https://github.com/ggml-org/llama.cpp/pull/28599)), fixing the `-fa auto` crash on this model.
- **OpenCL backend expansion** — generic `ssm_scan` removing the subgroup-size==64 / `d_state ∈ {128,256}` constraints ([#28881](https://github.com/ggml-org/llama.cpp/pull/28881)); MoE expert matmul chosen by runtime batch size rather than mere availability, important for speculative/MTP small-batch decode ([#27637](https://github.com/ggml-org/llama.cpp/pull/27637)).
- **Hexagon (Qualcomm) backend** — DMA fast-path added to `hex-cpy` for contiguous src/dst ([#28906](https://github.com/ggml-org/llama.cpp/pull/28906)); missing contiguous copy and `hvx_copy_uu` per-run paths restored after [#28589](https://github.com/ggml-org/llama.cpp/pull/28589) regression ([#28886](https://github.com/ggml-org/llama.cpp/pull/28886)).
- **CUDA build CI** — Ubuntu CUDA binaries to be added to release.yml ([#28186](https://github.com/ggml-org/llama.cpp/pull/28186)).
- **ROCm build matrix** — `gfx1103` (Radeon 780M / iGPU) restored to Linux release builds ([#28423](https://github.com/ggml-org/llama.cpp/pull/28423)).
- **STQ1_0 (Sparse Ternary Quantization)** — new 1.25-bit ternary kernel with ARM NEON `vec_dot` under review ([#22836](https://github.com/ggml-org/llama.cpp/pull/22836)).
- **WebGPU** test arch coverage adjusted ([#28848](https://github.com/ggml-org/llama.cpp/pull/28855)).

## Performance & Optimization

- **Qwen4Exp PP +~3%** from enabling `rms_norm + mul` graph fusion ([#28896](https://github.com/ggml-org/llama.cpp/pull/28896)).
- **SYCL `TOP_K`** — large-k sampling no longer pays a backend round-trip per call; GPU-resident radix-select parallelised across the device ([#28670](https://github.com/ggml-org/llama.cpp/pull/28670)).
- **ggml-cpu** — skip threadpool worker spawn / wakeup when the graph contains only views/NOPs (common under full GPU offload); calling-thread priority/affinity kept in sync with active pool ([#28785](https://github.com/ggml-org/llama.cpp/pull/28785)).
- **Hexagon** — measurable PP/TG regression on Qwen3.5-4B/IQ-9075 traced to missing contiguous fast-path; recovery PR lands it ([#28886](https://github.com/ggml-org/llama.cpp/pull/28886)). DMA `cpy` adds another path for large-reshape models like Qwen3.x ([#28906](https://github.com/ggml-org/llama.cpp/pull/28906)).
- **OpenCL** — MoE expert matmul now batch-size aware, expected to lift small-batch speculative / MTP decode ([#27637](https://github.com/ggml-org/llama.cpp/pull/27637)).
- **gguf index cache (proposed)** — opt-in index to accelerate `llama-model` info load ([#28903](https://github.com/ggml-org/llama.cpp/pull/28903); closed without merge but worth tracking).
- **Speculative prefill (open PR)** — ICML 2025 "Speculative Prefill" port aiming at TTFT improvements ([#27692](https://github.com/ggml-org/llama.cpp/pull/27692)).
- **Vulkan sparse Flash Attention** in progress ([#28105](https://github.com/ggml-org/llama.cpp/pull/28105)) — tracking upstream sparse FA work ([#27970](https://github.com/ggml-org/llama.cpp/pull/27970)).

## Stability & Regressions

Ranked by potential blast radius. "Fix available" is noted where a merged or open PR addresses the report.

1. **macOS arm64 heap corruption from `ggml-cpu` PCH** — silent, can affect any Metal/CPU workload built with AppleClang. **Fix shipped in 0.4.1** via [b10955](https://github.com/ggml-org/llama.cpp/pull/28882). Tracking: [#28858](https://github.com/ggml-org/llama.cpp/issues/28858).
2. **Vulkan PP O(N²) regression on RDNA3 since b10780** — Ling-3.0-tiny-Q8_0 + Arc B580 falls back to SCALAR Flash Attention, causing prompt-processing degradation severe enough to drop the device ([#27638](https://github.com/ggml-org/llama.cpp/issues/27638), [#28752](https://github.com/ggml-org/llama.cpp/issues/28752), [#24066](https://github.com/ggml-org/llama.cpp/issues/24066)). Long-standing; **no fix in this drop**.
3. **CUDA `argsort` corruption on sm_50 with CCCL 2.x** — CUB radix-sort called in-place (`d_keys_in == d_keys_out`) overwrites its own input mid-pass. Fix open: [#28389](https://github.com/ggml-org/llama.cpp/pull/28389).
4. **CUDA misaligned address in `op_sigmoid`** on RTX 5090 Laptop (sm_120), long prompts; regression between `d3146f2b5` and `ad6c66839` ([#28877](https://github.com/ggml-org/llama.cpp/issues/28877)).
5. **SYCL multi-GPU / oneDNN pool corruption** — driver TDR or pool crash when scratchpad allocation perturbs LIFO ordering. Multiple reports: dual Arc Pro B70 ([#28778](https://github.com/ggml-org/llama.cpp/issues/28778)), Arc Pro B50 + A770 ([#27888](https://github.com/ggml-org/llama.cpp/issues/27888)), pool free-ordering root cause ([#28660](https://github.com/ggml-org/llama.cpp/issues/28660)). **Partial fix in 0.4.1** via [b10952](https://github.com/ggml-org/llama.cpp/pull/28704); residual reports suggest more than one underlying trigger.
6. **SYCL scratchpad balloon with `--lookup-ngram-min`** — ngram-mod enabled on SYCL requests 2 GB+ scratchpad ([#28860](https://github.com/ggml-org/llama.cpp/issues/28860)). No fix yet.
7. **SYCL bad output on Qwen3.6 35B A3B** ([#28728](https://github.com/ggml-org/llama.cpp/issues/28728)) — correctness bug, no fix PR yet.
8. **Qwen4Exp (Qwen3.8-Flash-Next) on Metal: 1-token-then-EOS at long context** ([#28805](https://github.com/ggml-org/llama.cpp/issues/28805)) — stochastic threshold dependent on quant / KV-quant / `n_ctx`. Model-side support just landed in [#28901](https://github.com/ggml-org/llama.cpp/pull/28901); behavior at long context still open.
9. **`ggml_backend_sched_alloc_splits` unexpected graph reallocation** crash ([#28753](https://github.com/ggml-org/llama.cpp/issues/28753)) — likely tied to the allocator rework tracked in [#28905](https://github.com/ggml-org/llama.cpp/pull/28905).
10. **`gemma4` thinking emits ever-longer trailing garbage** ([#28827](https://github.com/ggml-org/llama.cpp/issues/28827)).
11. **Qwen2.5-Omni intermittent silent audio corruption on Metal** under load ([#28441](https://github.com/ggml-org/llama.cpp/issues/28441)).
12. **`qwen35` on RTX 5090 sm_120 runs ~28% of bandwidth bound; 1.5–1.6× slower on Windows vs Linux** ([#28196](https://github.com/ggml-org/llama.cpp/issues/28196)).
13. **Vulkan load crash on RX 7900 XTX for Gemma4 / Muse Glimmer**

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-15

## 1. Today's Highlights

The day's activity is dominated by **prompt-cache and tool-call correctness bugs** across multiple model integrations, with concrete fix PRs landing for two of them. The Anthropic-compatible endpoint, qwen3-coder, and Gemma 4 are all surfacing subtle issues that silently degrade agent workflows — either by dropping tool calls entirely or by invalidating the prefix cache on identical requests.

## 2. Releases & Breaking Changes

No new releases published in the last 24h.

Notable merged PRs (closed, not yet tagged):
- **#18235** — MLX version bump ([link](https://github.com/ollama/ollama/pull/18235))
- **#18372** — Apps layout refresh and copy-to-clipboard feedback ([link](https://github.com/ollama/ollama/pull/18372))

## 3. New Model & Hardware Support

- **Model requests** (pending maintainer review): SARVAM-30b / 105b ([#14319](https://github.com/ollama/ollama/issues/14319)), Gnani Evon-v3.3-30B-A3B ([#18427](https://github.com/ollama/ollama/issues/18427))
- **Hardware backends**: Feature request to support ROCm 10 on Windows for AMD Ryzen AI Max 395 ([#18435](https://github.com/ollama/ollama/issues/18435))

## 4. Performance & Optimization

- **Model loading regression** reported between 0.23.4 and 0.30.x with GPT-OSS:120b — investigation still open ([#18373](https://github.com/ollama/ollama/issues/18373))
- **CUDA ~5× token-generation slowdown** on RTX 3090 between 0.32.13 and 0.33.2 — closed awaiting more info ([#18225](https://github.com/ollama/ollama/issues/18225))
- **JPEG EXIF orientation normalization** PR addresses a long-standing multimedia input correctness issue and should reduce repeated re-encoding in multimodal pipelines ([#18432](https://github.com/ollama/ollama/pull/18432))
- **Prompt-cache hit-rate work**: [#18433](https://github.com/ollama/ollama/pull/18433) stabilizes rendering of a tool's extra schema keys so identical requests produce identical prompts for qwen3-coder — directly fixes [#18430](https://github.com/ollama/ollama/issues/18430)

## 5. Stability & Regressions

Ranked by impact on production agents:

| Severity | Issue | Summary | Fix PR |
|---|---|---|---|
| **High** | [#17274](https://github.com/ollama/ollama/issues/17274) | Tool-call output silently discarded on parse failure — empty `content`, no `tool_calls`, but ~40 completion tokens still billed | — |
| **High** | [#18390](https://github.com/ollama/ollama/issues/18390) | Gemma 4 tool-call object keys with spaces cause parser to drop the whole call; only server-side trace remains | — |
| **High** | [#18431](https://github.com/ollama/ollama/issues/18431) | Anthropic-compat endpoint hoists `role: "system"` messages out of `messages` into the top system block, breaking the prefix cache for Claude Code | — |
| **Medium** | [#18396](https://github.com/ollama/ollama/issue/18396) | Jetson Orin Nano 8GB: Gemma 4 E4B multimodal projector triggers host OOM despite successful CPU projector config | — |
| **Medium** | [#18373](https://github.com/ollama/ollama/issues/18373) | Significant model-loading regression across all model families post-0.23.4 | — |
| **Medium** | [#18430](https://github.com/ollama/ollama/issues/18430) | qwen3-coder: extra tool schema keys rendered in random Go-map order, fragmenting prompt cache | [#18433](https://github.com/ollama/ollama/pull/18433) ✅ |
| **Medium** | [#18419](https://github.com/ollama/ollama/issues/18419) | `/api/codex/v1/responses` returns empty completion for `previous_response_id` tool follow-ups | [#18434](https://github.com/ollama/ollama/pull/18434) ✅ |
| **Low** | [#18208](https://github.com/ollama/ollama/issues/18208) | Long-lived runner with `keep_alive -1` emits corrupted `<unused49>` tokens after a second model loads | — |
| **Low** | [#3185](https://github.com/ollama/ollama/issues/3185) | Statically linked MIT-licensed deps missing notice files in release artifacts (275 👍, open since 2024) | — |
| **Low** | [#18225](https://github.com/ollama/ollama/issues/18225), [#18185](https://github.com/ollama/ollama/issues/18185) | Closed/needs-more-info (CUDA regression, custom GPU/CPU allocation) | — |

## 6. What This Means for Application Developers

- **Audit your tool schemas for qwen3-coder before deploying at scale.** The Go-map iteration bug means identical requests can miss the prompt cache on a non-trivial fraction of sends. Pin to a version that includes [#18433](https://github.com/ollama/ollama/pull/18433) once merged.
- **Treat Gemma 4 tool calls as best-effort until [#18390](https://github.com/ollama/ollama/issues/18390) is fixed.** Avoid object keys with spaces in tool parameter names, and add client-side validation that asserts `tool_calls` is non-empty when you expect one.
- **If you're routing Claude Code through `ollama.com/v1/messages`,** the system-role hoisting in [#18431](https://github.com/ollama/ollama/issues/18431) will inflate token spend and defeat the cache. Expect a fix, but monitor costs in the meantime.
- **OpenAI Responses API users (`/api/codex/v1/responses`)** gain `previous_response_id` continuations via [#18434](https://github.com/ollama/ollama/pull/18434) — this unblocks Codex-style multi-turn tool loops locally.
- **Multimodal pipelines**: the EXIF normalization in [#18432](https://github.com/ollama/ollama/pull/18432) is byte-stable for unrotated images, so it's safe to adopt without re-uploading existing datasets.
- **Performance regression watch**: if you pinned to ≤0.23.4 for predictable load times, [#18373](https://github.com/ollama/ollama/issues/18373) is worth tracking before you upgrade.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-15

## 1. Today's Highlights

The dominant theme in the last 24 hours is **correctness in the proxy accounting and translation layers**, not new features. Three clusters dominate: (a) multiple bugs in the Responses→Chat bridge that drop or mangle reasoning content and cache-write tokens in streaming (#40887, #40654, #40736, #29913); (b) a confirmed regression in the v3 rate limiter where `model_rpm_limit`/`model_tpm_limit` per-team limits are enforced at **half** their configured value (#34140); and (c) several budget/job bugs where `BudgetExceededError` is raised against stale spend or where the reset-budget loop silently zeroes spend forever on rows with `budget_duration = null` (#27735, #39370, #19105). On the upside, there is a coordinated push on real-infrastructure CircleCI coverage (#41066, #41070, #41073, #41075, #41078) and small latency wins in the auth path (#41087).

## 2. Releases & Breaking Changes

No releases published in the last 24h. No deprecations or config-format breakages surfaced today.

## 3. New Model & Hardware Support

No new provider integrations or hardware backends landed in the last 24h. Issues touching the model surface today are mostly translation/cost-map defects:

- **Alibaba Cloud DeepSeek V4.1 Flash** — `reasoning_content` is missing from streaming chat-completions responses on the proxy. Reported today, no fix PR yet. [#41049](https://github.com/BerriAI/litellm/issues/41049)
- **Vertex AI Claude (versioned ids + `claude-haiku-4-5*`)** — silent 4096-token output cap, and the `vertex_ai/claude-haiku-4-5*` map entries cap output at 8192 instead of the model's 64000. No PR. [#40363](https://github.com/BerriAI/litellm/issues/40363)
- **ChatGPT subscription (`chatgpt/`) provider** — `gpt-5.6-sol` returns an empty `output[]` in `response.completed` despite streamed content, raising `Unknown items in responses API response: []`. Issue closed but root-cause unclear. [#41017](https://github.com/BerriAI/litellm/issues/41017)
- **SambaNova cost map** — 12 of 17 entries point at retired models and several have wrong pricing/context. Closed as stale. [#29011](https://github.com/BerriAI/litellm/issues/29011)

## 4. Performance & Optimization

- **Auth path latency.** PR [#41087](https://github.com/BerriAI/litellm/pull/41087) loads team membership once per request and skips the Prisma call entirely on an L1 cache hit. Report cites several extra seconds before tokens start on small chat completions, paid twice under burst, and a slow Redis write holding the reply. Concrete numbers not provided in the PR body, but the change targets the dominant hot-path cost. No merge yet.
- **Router pre-call checks on `/embeddings`.** PR [#35661](https://github.com/BerriAI/litellm/pull/35661) counts embedding input as text and fixes an `AttributeError: 'str' object has no attribute 'get'` that previously caused every list-string input to skip context-window filtering. No benchmarks posted.
- **Websearch objective + multi-query.** PR [#40399](https://github.com/BerriAI/litellm/pull/40399) lets the intercepted web-search tool emit an objective plus multiple queries instead of a single `query` string — relevant for Parallel AI's search API. No perf numbers.
- **FOCUS export destinations.** PR [#39795](https://github.com/BerriAI/litellm/pull/39795) adds Ternary as a first-class FOCUS sink (`callbacks: ["ternary"]`). Operational/perf impact: removes a separate export job.
- **Uvicorn access-log noise.** PR [#41096](https://github.com/BerriAI/litellm/pull/41096) finally honors the (already-documented) `LITELLM_DISABLE_ACCESS_LOG_PATHS` env var, attaching an `AccessLogPathFilter` to `uvicorn.access` for health/metrics probes. Log volume, not request latency.
- **Integration test foundation.** PRs [#41066](https://github.com/BerriAI/litellm/pull/41066), [#41070](https://github.com/BerriAI/litellm/pull/41070), [#41073](https://github.com/BerriAI/litellm/pull/41073), [#41075](https://github.com/BerriAI/litellm/pull/41075), [#41078](https://github.com/BerriAI/litellm/pull/41078) add real PostgreSQL/Redis/HTTP/TCP-peer contracts covering key regeneration, partition DDL, bearer/STS resolution, Anthropic cache-token accounting, MCP/OAuth discovery, and guardrail correlation. This is throughput/correctness scaffolding, not a user-visible speedup.

## 5. Stability & Regressions

Ranked by severity for production operators.

### High severity

- **V3 rate limiter double-counts per-team per-model limits** — `#34140`. `model_rpm_limit`/`model_tpm_limit` set on a team via `POST /team/update` are enforced at half their value; a limit of N starts returning 429 after ~N/2. Reproducible with provided repro. **No fix PR.** [Issue #34140](https://github.com/BerriAI/litellm/issues/34140)
- **`BudgetExceededError` raised against stale spend** — `#27735`. Team-scoped virtual keys are rejected even though `/key/info` reports spend below `max_budget`. Production-blocking. **No fix PR.** [Issue #27735](https://github.com/BerriAI/litellm/issues/27735)
- **Reset-budget job silently zeroes spend forever** — `#39370`. Rows with `budget_duration = null` and a stale, past `budget_reset_at` are picked up by the reset loop on every tick, so spend goes to zero without bound. **No fix PR.** [Issue #39370](https://github.com/BerriAI/litellm/issues/39370)
- **Streaming `/v1/responses` requests are never spend-logged** — `#29913` (closed). Streaming requests to the Responses surface fail with `'dict' object has no attribute 'usage'` in the success logger, so no `LiteLLM_SpendLogs` row is written and the request goes uncharged. **Closed but unresolved in the underlying code path.** [Issue #29913](https://github.com/BerriAI/litellm/issues/29913)

### Medium severity

- **Responses→Chat streaming drops reasoning progress and cached reasoning** — `#40887`. The bridge handles tool-call/message output items but never maps incremental reasoning items. Affects agent-style clients on the chat surface that rely on streamed `reasoning_content`. **No fix PR.** [Issue #40887](https://github.com/BerriAI/litellm/issues/40887)
- **Responses→Chat bridge drops raw `reasoning_text` in both streaming and non-streaming** — `#40654`. When configured as `openai/responses/<model>` and called via `/v1/chat/completions`, the provider's plaintext reasoning is lost. **No fix PR.** [Issue #40654](https://github.com/BerriAI/litellm/issues/40654)
- **Streaming usage merger retains stale cache-write tokens after an explicit zero update** — `#40736`. Related to the Bedrock Invoke drops (#34497) and the older negative cached-prompt-cost (#15263) issues. **No fix PR.** [Issue #40736](https://github.com/BerriAI/litellm/issues/40736)
- **Admin UI model edit persists derived pricing → Azure spend recorded as $0 after price-map reload** — `#40649`. Custom deployment pricing is overwritten, then the price-map reload zeros Azure costs. Combines #30081. **No fix PR.** [Issue #40649](https://github.com/BerriAI/litellm/issues/40649)
- **Self-hosted install fails on `prisma generate`** — `#26097`. Permissions issue blocks the install script. 👍 4, no fix PR. [Issue #26097](https://github.com/BerriAI/litellm/issues/26097)
- **Health checks fail hard when a host is offline** — `#34281`. No graceful handling for ad-hoc / HomeLab deployments. **No fix PR.** [Issue #34281](https://github.com/BerriAI/litellm/issues/34281)
- **`INFO` logging of incoming requests cannot be switched off** — `#10788`. `LITELLM_LOG=ERROR` does not suppress per-request access lines. Long-standing, no fix PR. [Issue #10788](https://github.com/BerriAI/litellm/issues/10788)

### Low severity / resolved today

- **Realtime `response.create` duplicate without transcript guardrails** — fix PR [#31822](https://github.com/BerriAI/litellm/pull/31822) stops auto-injecting `response.create` on transcription completion when no `realtime_input_transcription` guardrail is active. Open.
- **Anthropic pass-through: reject requests whose content blocks are all unrecognized** — fix PR [#41095](https://github.com/BerriAI/litellm/pull/41095) for [#41091](https://github.com/BerriAI/litellm/issues/41091). Empty `messages[]` is no longer dispatched upstream.
- **`litellm_session_id` honored in spend-log `session_id`** — fix PR [#41004](https://github.com/BerriAI/litellm/pull/41004) for [#40851](https://github.com/BerriAI/litellm/issues/40851). The per-call trace id no longer overwrites the caller-supplied session id.
- **Anthropic Messages: suppress `reasoning_content`→thinking when thinking is absent/disabled** — fix PR [#32337](https://github.com/BerriAI/litellm/pull/32337).
- **Org admins regain visibility of their teams in other orgs** — fix PR [#41086](https://github.com/BerriAI/litellm/pull/41086).
- **Model `info` returns full group list for proxy admins even with restricted UI keys** — fix PR [#41094](https://github.com/BerriAI/litellm/pull/41094).
- **Configurable DB / credential reload interval** — closed today ([#40972](https://github.com/BerriAI/litellm/issues/40972)) without an apparent merge.
- **Model access check ignores `access_group_ids` on virtual keys** — closed ([#28464](https://github.com/BerriAI/litellm/issues/28464)).
- **Cooldown TTL does not distinguish 429-rate-limit from 429-quota-exhausted** — closed as a question ([#27470](https://github.com/BerriAI/litellm/issues/27470)); an RFC to expose structured route-health state is now open in [#33371](https://github.com/BerriAI/litellm/issues/33371).
- **`cache_control_injection_points` no-op + Claude tool-call loop on `/v1/responses`** — closed ([#29810](https://github.com/BerriAI/litellm/issues/29810)) without a clear fix.
- **WebSocket `/v1/responses` requires `?model=` query param, breaking OpenAI spec** — closed ([#25532](https://github.com/BerriAI/litellm/issues/25532), 👍 9) without a clear fix; SDK users should still send `model` in the body and not rely on `?model=`.
- **Admin UI does full reload + 404 prefetch storm on every nav** — closed today ([#41029](https://github.com/BerriAI/litellm/issues/41029)) without an apparent merge.
- **Per-team response-cache scoping** — closed ([#29955](https://github.com/BerriAI/litellm/issues/29955)) without a fix; cross-tenant cache reuse still possible.
- **Custom redaction tags broken in v1.87.1** — [#30008](https://github.com/BerriAI/litellm/issues/30008), no fix.

### Other PRs worth flagging

- **Project keys must belong to the team's own project** — fix PR [#41092](https://github.com/BerriAI/litellm/pull/41092) closes a cross-team key-attach gap.
- **Opt-in `fill_missing_fields` from fallback generalization rules** — PR [#41093](https://github.com/BerriAI/litellm/pull/41093) so mapped entries missing `supports_reasoning` etc. can be filled without regressing wandb / Claude numeric guesses.
- **Airia guardrail as a built-in provider** — PR [#40784](https://github.com/BerriAI/litellm/pull/40784).
- **Team/key provider traffic splits via the dashboard** — PR [#41072](https://github.com/BerriAI/litellm/pull/41072).

## 6. What This Means for Application Developers

- **Do not deploy the v3 per-team per-model RPM/TPM limits to production yet.** [#34140](https://github.com/BerriAI/litellm/issues/34140) makes the configured value a *ceiling on the doubled count*, so under-rate-limiting is the failure mode rather than over-rate-limiting — protect yourself with a global rate limit or a sidecar until this is fixed.
- **Treat budget enforcement as advisory on the proxy.** Three separate open bugs ([#27735](https://github.com/BerriAI/litellm/issues/27735), [#39370](https://github.com/BerriAI/litellm/issues/39370), [#19105](https://github.com/BerriAI/litellm/issues/19105)) mean false-positive rejections *and* silent spend zeroing. If you bill back to teams, reconcile against your own usage store rather than trusting proxy `/key/info`.
- **The Responses→Chat bridge is unsafe for streaming reasoning.** If your agent uses the OpenAI Responses API on one side and the chat surface on the other, you will lose reasoning content ([#40887](https://github.com/BerriAI/litellm/issues/40887), [#40654](https://github.com/BerriAI/litellm/issues/40654)). Pin to a single API surface across your stack.
- **Cache-token accounting is fragile in streaming.** Bedrock, Anthropic, and openai/responses each have their own edge cases ([#40736](https://github.com/BerriAI/litellm/issues/40736), [#22984](https://github.com/BerriAI/litellm/issues/22984), [#29913](https://github.com/BerriAI/litellm/issues/29913)). Don't bill customers off `cached_tokens` from the proxy without reconciliation; consider showing them the raw usage object.
- **`openai/responses/<model>` pricing is unsafe to override from the Admin UI.** [#40649](https://github.com/BerriAI/litellm/issues/40649) shows custom deployment pricing can be silently overwritten and Azure spend recorded as $0. Edit `model_prices_and_context_window.json` (or your config) directly, not the UI.
- **Logging volume.** If you tail the proxy, expect noise: `

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-15

## Today's Highlights
No tagged releases in the last 24h, but the merge queue is dominated by **Unsloth Studio** backend hardening (OpenAI/Codex compatibility, tool-call fidelity, MCP plumbing) and a quietly important step toward **non-NVIDIA accelerators**: Ascend NPU device detection is landing and Windows AMD hosts are being routed to Vulkan instead of the CPU bundle. The Studio frontend has also taken a notable UX turn, with several "Run settings" disagreements and a handful of memory-leak reports now closed.

## Releases & Breaking Changes
*No new tagged releases in the last 24h.*

Notable merged-but-not-released behavioral changes worth flagging:
- **PR #4989** (open since April, now active): `HF_ENDPOINT` env var support in Studio backend/frontend — relevant if you mirror HF inside a region. ([PR #4989](https://github.com/unslothai/unsloth/pull/4989))
- **PR #10686** + **PR #10684**: removing the CUDA-hardcoded device from `get_device_type()` and `StoppingCriteriaSub` — these change behavior on non-CUDA accelerators and are prerequisites for NPU/XPU paths.

## New Model & Hardware Support
- **Ascend NPU** — `get_device_type()` now recognizes `"npu"` instead of raising `NotImplementedError` at import. Stopping-criteria no longer hardcodes CUDA. ([PR #10686](https://github.com/unslothai/unsloth/pull/10686), [PR #10684](https://github.com/unslothai/unsloth/pull/10684))
- **AMD Windows GPU → Vulkan** — Studio's resolver now picks the Vulkan llama.cpp bundle on Windows AMD hosts with no usable ROCm, matching the Linux behavior. Strix Halo self-hosted validation cited. ([PR #10908](https://github.com/unslothai/unsloth/pull/10908))
- **Windows CPU → GPU preservation** — in-app updates were silently downgrading inference to CPU; the flavor-invariant fix landed via #10906. ([PR #10906](https://github.com/unslothai/unsloth/pull/10906))
- **Quantization defaults for image models** — official BF16 image picks now default to the hosted INT8/FP8 checkpoint, mirroring the MiniMax H3 image-stack convention. ([PR #10883](https://github.com/unslothai/unsloth/pull/10883))
- **MTP / speculative decoding VRAM reservation** — Studio now reads `<arch>.nextn_shared_target_tensors` from drafter GGUF metadata and adds the draft weight/KV estimate into `--fit-target` for shared-MTP drafters. Self-contained and CPU-offloaded drafters are intentionally unchanged. Targets QwQ-style architectures. ([PR #10149](https://github.com/unslothai/unsloth/pull/10149))
- **AMD Docker support** closed (#6230) — ROCm container mirrors the Blackwell/CUDA image.
- **Gemma 4 vision** — `FastVisionModel` vs plain transformers spatial-localization divergence fixed in #6028.
- **Open feature requests still open**: Krea2 LoRA training (#10881), Intel ARC 140T install on Windows (#8632).

## Performance & Optimization
- **Media family overrides made structural** — long-running refactor (#10150) that supersedes #8622; intended to remove a class of regression where the wrong media family was selected.
- **MTP VRAM budgeting** (see above) — improves the chance that GPU-resident shared-MTP drafters actually fit, avoiding silent CPU fallback.
- **Whisper transcription regression test** (#10077) — locks in that text-only turns get an explicit 400 instead of silently misrouting; protects against future regressions.
- **MLX stream dedup** (#10905) — fixes duplicated native control tokens in Gemma-4 streamed replies on the MLX path, which had been inflating apparent token counts.
- **Open memory/perf issues**:
  - [#10921](https://github.com/unslothai/unsloth/issues/10921) Memory usage growth since the last llama.cpp update — web UI.
  - [#10912](https://github.com/unslothai/unsloth/issues/10912) `unsloth start pi` frequent `Error: terminated` on slow CPU hosts; PR #10911 referenced as the fix.

## Stability & Regressions
Ranked by likely blast-radius for production users:

1. **MCP tool calls being silently truncated** ([#10839](https://github.com/unslothai/unsloth/issues/10839)) — systematic truncation of MCP payloads, suspected dedup. **Open**, no fix PR yet. High impact for any agent using MCP.
2. **Safety check bypassed by crafted commands** ([#10835](https://github.com/unslothai/unsloth/issues/10835)) — `reboot` and `rm` (and `$(ls …)` injection patterns) executed despite the guard. **Closed**; verify your installed build contains the fix before relying on the safety check.
3. **Cloud model connections failing due to conflicting Run-settings params** ([#10917](https://github.com/unslothai/unsloth/issues/10917)) — fresh bug filed today in Studio web UI.
4. **Misleading errors when a revoked HF model is loaded from local cache** ([#10929](https://github.com/unslothai/unsloth/issues/10929)) — log noise; HF model access was revoked but Studio keeps retrying with confusing diagnostics.
5. **Nested tool-call field reordering** ([#10935](https://github.com/unslothai/unsloth/pull/10935)) — llama.cpp's grammar requires nested object fields in schema order; Qwen-vs-Notion ordering caused silent cursor loss and a false "same call" dedup. Fix PR open.
6. **Codex loop on oversize chats** ([#10938](https://github.com/unslothai/unsloth/pull/10938)) — when context overflowed, Studio returned `400` as a raw number, which Codex retried 5× before giving up. Fix PR open.
7. **Windows ARM64 desktop installer fails on `pyarrow`** ([#10875](https://github.com/unslothai/unsloth/issues/10875)) — CLI install works; desktop bundle does not. Open.
8. **Run-settings sidebar vs dropdown draft divergence** ([#10817](https://github.com/unslothai/unsloth/issues/10817)) — two UI panels editing the same per-model config silently disagreed. Closed; verify in your Studio build.
9. **Replayed tool calls re-sort argument keys** ([#10791](https://github.com/unslothai/unsloth/issues/10791)) — caused llama.cpp to reprocess every multi-param call. Closed.
10. **Duplicate tool-call guard blocks legitimate reruns** ([#10792](https://github.com/unslothai/unsloth/issues/10792)) — closed.
11. **`--tensor-split` ignored** ([#10355](https://github.com/unslothai/unsloth/issues/10355)) — closed.
12. **`min_p` and `logit_bias` not supported through Studio → vLLM** ([#10573](https://github.com/unslothai/unsloth/issues/10573)) — closed.
13. **Studio GGUF: system RAM not released after full VRAM offload** ([#9033](https://github.com/unslothai/unsloth/issues/9033)) — closed.
14. **DGX Spark context-limit** ([#9889](https://github.com/unslothai/unsloth/issues/9889)) — closed.
15. **Windows toolbar tooltips obscure controls** ([#10226](https://github.com/unslothai/unsloth/issues/10226)) — closed.

## What This Means for Application Developers
- **Don't pin to a Studio version blindly.** Several "closed" bugs were UI-config coherence, MCP safety, and tool-call fidelity — all of which directly affect agent behavior. If you're shipping an agent on top of Unsloth Studio, validate that the version you deploy contains #10835 (safety), #10791/#10792 (tool-call dedup), and #10906 (CPU fallback preservation) before cutting a release.
- **OpenAI/Codex SDK compatibility is improving fast.** PRs #10937 (accept message `name` field), #10939 (force tool-use honoring), #10933 (per-model reasoning effort and image capability lookup), and #10938 (graceful context-overflow signaling) collectively unblock LangChain/LangGraph/AutoGen/Codex integrations. If you previously had to fork Studio's request schema, re-test on `main`.
- **If you're behind the GFW or HF is throttled**, PR #4989 finally gives you `HF_ENDPOINT` in Studio — but it's still open, so you'd need to build from that branch.
- **Training on MTP-augmented checkpoints** (QwQ-style) — the new `--fit-target` accounting in #10149 means you can plan VRAM budgets more accurately when using a shared drafter. If you were previously working around silent CPU fallback, retest on the latest PR.
- **Planning AMD or Ascend deployment?** The NPU import crash is going away (#10686), the AMD Windows → Vulkan path is in (#10908), and the AMD ROCm Docker track is closed (#6230). Treat this as "alpha on NPU, beta on AMD-Vulkan, beta on AMD-Docker" rather than production-ready.
- **MCP ecosystem is still rough.** Truncation (#10839) and the lack of a hub/installer (#10822) are the two biggest pain points. Until those land, sandbox your MCP servers and validate payloads end-to-end.
- **For data pipelines:** if you were exporting chats for SFT/DPO, note PR #10941 — ShareGPT export now drops regenerated replies and edited prompts, matching the Training JSONL behavior. Stop preprocessing exports to filter those manually.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-15

## 1. Today's Highlights

The past 24 hours were dominated by correctness fixes around the **Codex desktop app integration** and **Anthropic ↔ OpenAI protocol translation**. Two open issues driving the activity are Codex-profile launch failures (#1795) and OpenAI Responses upstream rejections of translated reasoning items (#1784); both have matching PRs in flight (#1796 and #1784 respectively). No new releases shipped.

## 2. Releases & Breaking Changes

*No new releases in the last 24 hours.*

## 3. New Model & Hardware Support

*No new model, backend, or quantization support announced.*

## 4. Performance & Optimization

Direct throughput/latency work is absent, though two items improve operational reliability:

- **[PR #1794](https://github.com/musistudio/claude-code-router/pull/1794)** — Raises and makes configurable the gateway's `gateway:config-accepted` timeout. The current hard-coded 5 s budget measures child-process spawn **and** full entry-point `require()`, which is fragile on slow CI/Windows paths. After the change, operators can size the timeout to their environment instead of hitting it spuriously.

## 5. Stability & Regressions

Ranked by impact on running deployments:

| Severity | Item | Status | Notes |
|---|---|---|---|
| 🔴 High | [#1795](https://github.com/musistudio/claude-code-router/issues/1795) Codex profile (desktop ChatGPT app) fails to launch: *"This app server did not provide application network requirements"* | OPEN | Affects macOS Codex users on `default-codex`. Direct fix in PR #1796. |
| 🔴 High | [#1784](https://github.com/musistudio/claude-code-router/pull/1784) OpenAI Responses upstreams reject `reasoning` items with non-empty `content` arrays (HTTP 400 `array_above_max_length`) | OPEN (PR) | Triggered when prior Claude `thinking` blocks are translated into Responses history. |
| 🟡 Med | [#1794](https://github.com/musistudio/claude-code-router/pull/1794) Config-acceptance timeout too tight / not configurable | OPEN (PR) | See §4. |
| 🟢 Closed | [#1615](https://github.com/musistudio/claude-code-router/issues/1615) Cross-protocol fallback skipped body re-translation → HTTP 400 | CLOSED | Fixed; retry on 429/5xx now re-runs protocol translation across heterogeneous chains (e.g. `anthropic_messages` → `openai_responses`). |
| 🟢 Closed | [#1683](https://github.com/musistudio/claude-code-router/issues/1683) Codex app hides Speed control for custom providers | CLOSED | Root cause is the Codex app's own catalog loader, not CCR data. No CCR-side change required. |
| 🟢 Closed | [#1702](https://github.com/musistudio/claude-code-router/pull/1702) Strip Anthropic `thinking` / `redacted_thinking` blocks for OpenAI upstreams | CLOSED (merged) | Supersedes the prior top-level-only stripping in `stripUnsupportedOpenAiRequestParameters`. Pairs with #1784 for full Responses coverage. |

Pattern: the burst of activity is a single coherent thread — **CCR ↔ OpenAI Responses protocol fidelity**, especially around reasoning/thinking content and Codex app-server handshakes. The Codex desktop profile path in particular appears to be the integration that still has rough edges.

## 6. What This Means for Application Developers

- **If you route Codex desktop traffic through CCR** (macOS ChatGPT app via the `codex` profile): expect a startup failure on current `main` until [#1796](https://github.com/musistudio/claude-code-router/pull/1796) lands. Pin to a commit predating the affected codex-config path or watch the PR.
- **If you use multi-model fallback chains that mix `anthropic_messages` and `openai_responses` / `openai_chat`**: the [#1615](https://github.com/musistudio/claude-code-router/issues/1615) fix means 429/5xx retries now correctly re-translate bodies. Long chains that previously appeared to "work" because the first leg always succeeded may now exercise the re-translation path for the first time — re-validate logs.
- **If you ever feed Anthropic `thinking` history into an OpenAI Responses/Chat upstream**: ensure you are on a build that includes [#1702](https://github.com/musistudio/claude-code-router/pull/1702) (merged) **and** ideally [#1784](https://github.com/musistudio/claude-code-router/pull/1784) (pending). The merged fix strips thinking blocks; the pending fix additionally cleans translated `reasoning` items whose `content` array was being populated by the translation. Until both land, expect intermittent HTTP 400s from Codex API-shaped upstreams after the first assistant turn.
- **Operators**: when upgrading, monitor gateway startup time. [#1794](https://github.com/musistudio/claude-code-router/pull/1794) makes the `gateway:config-accepted` budget tunable, which is the right knob for cold-start-heavy environments (large plugin trees, slow FS, Windows).
- **Roadmap signal**: the cluster of Codex-app + Responses-protocol fixes suggests CCR is hardening its role as a multi-protocol, multi-surface gateway (CLI *and* desktop app). Treat OpenAI Responses as a first-class target upstream when designing routing chains, not as a drop-in for `openai_chat`.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-15

## Today's Highlights
The 24-hour window is dominated by **proxy/conversion correctness fixes** in the Anthropic ↔ OpenAI Responses ↔ Chat Completions translation layer (streaming message-start payload, `tool_call_id` length, reasoning-effort preservation, inline `<think>` stripping) and by **provider-switch reliability work for Codex** (stale account bindings, missing `content` field breaking strict Anthropic SDKs, session-history invalidation on provider swap). On the feature side, two new first-class harnesses — **MiniMax Code** (#7383) and **DeepSeek Harness** (#7356) — were added, alongside a long-awaited **Google Antigravity** integration that supersedes the deprecated Gemini CLI path (#7402).

## Releases & Breaking Changes
No new tagged releases in the last 24h. The latest shipped versions referenced in filed bugs remain **v3.20.2 / v3.20.3**. Two latent regressions warrant operator attention before upgrading further:
- **#7401** — commit `5c053626` causes editing the "default fallback model" (`ANTHROPIC_MODEL`) and pressing "One-click Set" to silently fail and *overwrite* the value back. Affects v3.20.3 / macOS / Claude Code.
- **#7230** — v3.20.2: Codex `send_message_to_thread` returns HTTP 400 (missing `call_id`/`name`) on cross-task messages.

## New Model & Hardware Support
- **MiniMax Code harness** added as a first-class app: provider/model management, MCP, Skills, global instructions, local session history, and usage dashboard ([PR #7383](https://github.com/farion1231/cc-switch/pull/7383)).
- **DeepSeek Harness (DSH)** promoted to first-class with native YAML/credential writer and Codex-style provider form, supersedes #6526 ([PR #7356](https://github.com/farion1231/cc-switch/pull/7356)).
- **Google Antigravity (`agy`)** integration replaces the deprecated Gemini CLI path. Adds session scanning of `~/.gemini/{antigravity,antigravity-cli,antigravity-ide}/brain/*/transcript.jsonl`, protobuf-based usage from `conversations/*.db`, and WAL-aware incremental sync. Backward-compatible with existing Gemini configs ([PR #7402](https://github.com/farion1231/cc-switch/pull/7402), [Issue #7345](https://github.com/farion1231/cc-switch/issues/7345), [PR #5230](https://github.com/farion1231/cc-switch/pull/5230) closed).
- **Grok Official** providers now keep separate account credentials; usage tracking handles Windows file-mtime quirks ([PR #6792](https://github.com/farion1231/cc-switch/pull/6792)).
- **Hermes Agent** cumulative `session_model_usage` ingested into the Usage Dashboard as an independent data source with first-run baseline (no historical backfill) ([PR #6120](https://github.com/farion1231/cc-switch/pull/6120)).
- **Claude Desktop 3P profiles on Linux** — `XDG_CONFIG_HOME` resolution with `~/.config` fallback, Flatpak-aware path handling ([PR #7389](https://github.com/farion1231/cc-switch/pull/7389) closed, [PR #7331](https://github.com/farion1231/cc-switch/pull/7331) closed, [Issue #4855](https://github.com/farion1231/cc-switch/issues/4855) closed).
- **Gemini JSONL session support** — backend parser now accepts both `.json` and `.jsonl` and supports incremental ingestion of appended events ([PR #2771](https://github.com/farion1231/cc-switch/pull/2771), [PR #7385](https://github.com/farion1231/cc-switch/pull/7385)).

## Performance & Optimization
No benchmark numbers landed. Tangentially performance-relevant:
- **Model list fetch** ([PR #6912](https://github.com/farion1231/cc-switch/pull/6912)) now surfaces provider error envelopes instead of returning a silent empty list when auth fails (e.g. GLM Codex endpoint returning HTTP 200 + `{"code":1001,...}`); should reduce time spent debugging "why are models missing."
- **Windows Terminal handling** ([PR #7208](https://github.com/farion1231/cc-switch/pull/7208), [PR #7381](https://github.com/farion1231/cc-switch/pull/7381)) stops CC Switch from forcing `wt cmd /K ...`, which previously overrode the user's `defaultProfile`.
- **Outbound redaction** ([PR #7306](https://github.com/farion1231/cc-switch/pull/7306)) replaces irreversible `*`-masking with **typed reversible placeholders** (`{{PHONE:1}}` etc.), so the model retains entity types and round-trips can restore originals on the response side — improves downstream tool-calling accuracy.

## Stability & Regressions
Ranked by blast radius for production users:

| Severity | Item | Status |
|---|---|---|
| **High** | [#7396](https://github.com/farion1231/cc-switch/pull/7396) — OpenAI→Anthropic streaming emits `message_start.message` without the required `content` array; strict Anthropic SDK clients treat the snapshot as final and fail on the first content block. | **Fix PR open** |
| **High** | [#7386](https://github.com/farion1231/cc-switch/pull/7386) — Codex provider switch silently breaks old sessions (config.toml `Model provider 'custom' not found`); unified-session gate never opens for `model_provider = "openai"`. | **Fix PR open** |
| **High** | [#7362](https://github.com/farion1231/cc-switch/issues/7362) — Switching provider in CC Switch pins new `model_provider` into Codex's `state_5.sqlite` → `threads.model_provider`, orphaning prior conversations. | Issue open, PR pending |
| **High** | [#7377](https://github.com/farion1231/cc-switch/issues/7377) — After official Codex login expires inside CCS, switching provider fails. | Issue open |
| **High** | [#7401](https://github.com/farion1231/cc-switch/issues/7401) — `5c053626` breaks "default fallback model" save in v3.20.3 (regression, override-instead-of-save). | Issue open |
| **High** | [#7230](https://github.com/farion1231/cc-switch/issues/7230) — Codex cross-task `send_message_to_thread` → HTTP 400 in v3.20.2. | Issue open |
| **Med**  | [#7398](https://github.com/farion1231/cc-switch/pull/7398) / [#7397](https://github.com/farion1231/cc-switch/issues/7397) — `muse-spark-*` models missing from `supports_reasoning_effort()`; `output_config.effort` silently dropped in Anthropic→Responses. Related class of bug fixed earlier for Grok (#7314/#7318). | **Fix PR open** |
| **Med**  | [#7156](https://github.com/farion1231/cc-switch/issues/7156) — DeepSeek Chat upstream rejects CCS-generated `tool_call_id` as too short (HTTP 400), 100% reproducible on sub-agent tool calls. | Issue open |
| **Med**  | [#7271](https://github.com/farion1231/cc-switch/issues/7271) — Claude path leaks inline `<think>` blocks from OpenAI Chat upstream (e.g. MiniMax M3 / OpenCode Go) into final assistant turn. | Issue open |
| **Med**  | [#5860](https://github.com/farion1231/cc-switch/issues/5860) — Responses→Chat conversion splits one assistant turn into two adjacent messages and duplicates `reasoning_content` → DeepSeek V4 infinite repetition (12–14万字). | **Closed** (investigation complete) |
| **Med**  | [#7211](https://github.com/farion1231/cc-switch/issues/7211) — CCS forcibly rewrites Codex CLI `config.toml` `requires_openai_auth`, breaking non-CCS-managed Codex flows. | Issue open |
| **Med**  | [#5367](https://github.com/farion1231/cc-switch/issues/5367) — GPT-5.6 explicit `max` effort silently downgraded to `xhigh` in Claude→Responses. | Issue (stale, re-surfaced) |
| **Med**  | [#5368](https://github.com/farion1231/cc-switch/issues/5368) — Claude→Responses semantic stream priming can hang indefinitely. | Issue (stale) |
| **Low**  | [#7265](https://github.com/farion1231/cc-switch/issues/7265) / [#7032](https://github.com/farion1231/cc-switch/issues/7032) — Provider switch fails with parse error / "account does not exist." | Issues open |
| **Low**  | [#7125](https://github.com/farion1231/cc-switch/issues/7125) — DNS cache override resolves `api.deepseek.com` to `127.0.0.1` when CCS enabled. | **Closed** |
| **Low**  | [#5352](https://github.com/farion1231/cc-switch/issues/5352) — Deleted Skills still appear in UI. | Issue (stale) |
| **Low**  | [#3938](https://github.com/farion1231/cc-switch/issues/3938) — Gemini CLI 0.45.2 `session-*.jsonl` not imported. | Superseded by #7402 Antigravity path |

## What This Means for Application Developers
- **Don't upgrade past v3.20.3** if you depend on Codex session continuity across provider switches, on `tool_call_id` round-tripping to DeepSeek V4, or on Anthropic SDKs that strictly validate `message_start.message.content`. Pin a known-good build until [#7396](https://github.com/farion1231/cc-switch/pull/7396), [#7386](https://github.com/farion1231/cc-switch/pull/7386), and [#7156](https://github.com/farion1231/cc-switch/issues/7156) are merged.
- **Anthropic↔OpenAI conversion is the riskiest surface.** Roughly half of today's open bugs are in the proxy's protocol-translation layer. If you build agents that emit custom tool schemas or stream long reasoning, add a smoke test against CCS's proxy before each release — and budget time to consume `output_config.effort` yourself if you rely on Grok / Muse-Spark reasoning control.
- **Plan for Antigravity, not Gemini CLI.** Google has effectively deprecated the standalone `gemini` binary; new CC Switch versions will write `~/.gemini/antigravity*` paths. Agents that hard-code `~/.gemini/tmp/*/chats/` for usage scraping need a fallback.
- **Model discovery is now reliable.** With [#6912](https://github.com/farion1231/cc-switch/pull/6912), providers returning HTTP-200 error envelopes (GLM, ...) will surface the error to the user instead of silently showing no models — useful when you script provider onboarding.
- **Redaction is no longer one-way.** The reversible placeholder scheme ([#7306](https://github.com/farion1231/cc-switch/pull/7306)) means downstream code that pattern-matches against masked PII (e.g. `****-****-****-1234`) will break; migrate to placeholder-aware matching.
- **Headless/CLI mode is the most-requested missing feature** ([#3986](https://github.com/farion1231/cc-switch/issues/3986), 5 👍). If your CI/CD runs provider switches, plan to keep using the current GUI or wrap CCS today; a server edition (#5374) is also being requested.
- **Security audit on the roadmap.** [#7357](https://github.com/farion1231/cc-switch/issues/7357) proposes scanning upstream responses for prompt-injection / credential-exfiltration patterns — relevant if you route sensitive traffic through 中转站 / shared gateways.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-15

## Today's Highlights

The new-api project continues its rapid v1.0.0 release-candidate cycle (now at rc.37) with notable activity around streaming reliability, channel expansion, and billing accuracy. The most consequential items are two open **Ollama streaming bugs** where tool_calls are silently dropped from the final frame (#7252, #6807-adjacent) — fixed in #7376 and #7380 — and a reported **memory regression in rc.37** (~1.8GB resident vs ~75MB on rc.36) that may push low-memory deployments to OOM (#7361). On the feature side, new **vLLM and SGLang relay channels** were added (#7332) and a Huawei MaaS channel is in review (#7239).

## Releases & Breaking Changes

- **No new tagged releases in the last 24h.** Latest tracked version referenced by issues/PRs: **v1.0.0-rc.37** (issue #7375), with rc.36 still widely deployed.
- **Behavior change risk (rc.37):** A user-reported jump in resident memory from ~75MB (rc.36) to ~1.8GB (rc.37) on small instances is being investigated — [#7361](https://github.com/QuantumNous/new-api/issues/7361). Treat rc.37 as not production-safe on memory-constrained hosts until triaged.
- **Routing change:** A new global `NEW_API_ROUTE_PREFIX` env/router helper has been merged, replacing hard-coded `/v1`, `/api`, `/pg`, `/mj`, `/oauth` path checks with prefix-aware helpers — [#7350](https://github.com/QuantumNous/new-api/pull/7350). Operators behind reverse proxies should re-verify mount points after upgrading.
- **Release-process ask:** Community is requesting explicit GA criteria for v1.0.0 (currently at rc.36/rc.37 with no published cutoff) — [#7279](https://github.com/QuantumNous/new-api/issues/7279) (👍 8).

## New Model & Hardware Support

- **vLLM and SGLang self-hosted channels** (PR [#7332](https://github.com/QuantumNous/new-api/pull/7332), by `seefs001`) — extends relay coverage to two of the most common OSS inference backends. Closed/merged within the last 24h.
- **Huawei MaaS channel** (PR [#7239](https://github.com/QuantumNous/new-api/pull/7239), open) — adds first-class support for Huawei Cloud's MaaS endpoint.
- **Ollama OpenAI-compatible chat switch** (PR [#7382](https://github.com/QuantumNous/new-api/pull/7382), open) — per-channel toggle to expose Ollama over OpenAI's chat schema.
- **Vertex AI / GCS proxy** (issue [#7121](https://github.com/QuantumNous/new-api/issues/7121)) — proposed controlled Google Cloud Storage proxy for Vertex channels.
- **Aliyun Bailian task plugin — HappyHorse model** request was closed as invalid ([#7375](https://github.com/QuantumNous/new-api/issues/7375)); HappyHorse is not in scope for that plugin.

## Performance & Optimization

- **In-memory rate limiter rewrite** — replaces the fixed `make([]int64, 0, maxRequestNum)` allocation with a linked-list + LRU to reduce baseline memory and free slots promptly. PR [#6807](https://github.com/QuantumNous/new-api/pull/6807) is open; useful for high-concurrency tenants.
- **Possible rc.37 memory regression** — [#7361](https://github.com/QuantumNous/new-api/issues/7361) reports ~24× RSS growth (75MB → ~1.8GB). No root cause PR yet; recommend pinning to rc.36 in production until resolved.
- **OpenAI stream drain regression fix** — PR [#7379](https://github.com/QuantumNous/new-api/pull/7379) restores `TextStreamScanner` lifecycle wiring that was lost in the rc.31 merge, recovering graceful client-disconnect handling on five stream handlers.
- **Self-usage token log filter** — PR [#7381](https://github.com/QuantumNous/new-api/pull/7381) moves a case-insensitive `model_name` substring filter ahead of count/pagination, reducing query load on the usage-history endpoint.

## Stability & Regressions

**High severity**

- **Ollama streaming drops tool_calls on final frame** — when `stream: true` + `tools` is used, some models (e.g. `qwen3-coder`) only emit tool_calls in the `done: true` frame, which `ollamaStreamHandler` previously ignored, so clients saw an empty `content` delta and `finish_reason: "stop"` with no tool calls. Fixes landed in [#7376](https://github.com/QuantumNous/new-api/pull/7376) (closed) and [#7380](https://github.com/QuantumNous/new-api/pull/7380) (closed). Tracked as [#7252](https://github.com/QuantumNous/new-api/issues/7252). Recommend cherry-picking/verifying the fix is in your deployed RC.
- **rc.37 memory regression** — [#7361](https://github.com/QuantumNous/new-api/issues/7361), cause unconfirmed, OOM on small boxes. Pin to rc.36 until cleared.
- **Client cancel counted as model failure** — downstream disconnects on Chat Completions (converted to Responses SSE) are unconditionally recorded as failures, polluting success-rate metrics. [#7134](https://github.com/QuantumNous/new-api/issues/7134). No fix PR yet.

**Medium severity**

- **DeepSeek reasoning_content not echoed back** — `deepseek-v4-flash` in thinking mode errors with `400 "reasoning_content" in the thinking mode must be passed back`. [#6939](https://github.com/QuantumNous/new-api/issues/6939) (closed as needs-repro).
- **/v1/responses streaming snapshot `created_at` is a float** — three snapshot events are dropped, `usage` is lost, billing falls back to estimation. [#6822](https://github.com/QuantumNous/new-api/issues/6822) (closed, fix implied).
- **Tiered-pricing model logs report "dynamic pricing · no match"** even when billed correctly. [#7296](https://github.com/QuantumNous/new-api/issues/7296) (closed).
- **Advanced custom route + model mapping misroutes** when both configured. [#6639](https://github.com/QuantumNous/new-api/issues/6639) (open).
- **Channel retry picks by ID order, not priority**. [#7007](https://github.com/QuantumNous/new-api/issues/7007) (closed as needs-repro).
- **DeepSeek CNY/USD balance sync** — when CNY pricing is configured, balances are still computed in USD. [#5063](https://github.com/QuantumNous/new-api/issues/5063) closed; fix in [#6814](https://github.com/QuantumNous/new-api/pull/6814).
- **Creem payment webhook returns 403** despite config. [#2650](https://github.com/QuantumNous/new-api/issues/2650) (open, stale).

**Low severity / UX**

- Expression-mode pricing lacks `weekday()` — blocks peak/off-peak weekday pricing. [#7011](https://github.com/QuantumNous/new-api/issues/7011) (closed).
- Model Square 24h success-rate bar spacing is uneven. [#7282](https://github.com/QuantumNous/new-api/issues/7282) — fixed in [#7284](https://github.com/QuantumNous/new-api/pull/7284).
- Test-Channel dialog: Endpoint Type combobox auto-opens. [#7360](https://github.com/QuantumNous/new-api/issues/7360) (closed).
- Top nav shifts horizontally when sorting menu opens. [#7144](https://github.com/QuantumNous/new-api/issues/7144) — fixed in [#7145](https://github.com/QuantumNous/new-api/pull/7145).

## What This Means for Application Developers

- **Verify your Ollama integration today.** If you stream with `tools` enabled and depend on `tool_calls` (function-calling agents, code-execution tools), the bug in #7252 could silently break you on affected models. Confirm #7376/#7380 are in your deployed image before shipping tool-calling flows through Ollama.
- **Pin away from rc.37 in memory-tight deployments.** Until [#7361](https://github.com/QuantumNous/new-api/issues/7361) is root-caused, rc.36 is the safer target.
- **Cancel-aware metrics are coming but not yet here.** If you alert on per-channel success rate, expect false positives from user-initiated disconnects ([#7134](https://github.com/QuantumNous/new-api/issues/7134)). Consider filtering on HTTP completion status rather than raw success rate in the interim.
- **New self-host options.** The vLLM/SGLang channels ([#7332](https://github.com/QuantumNous/new-api/pull/7332)) and the Ollama OpenAI-compatible switch ([#7382](https://github.com/QuantumNous/new-api/pull/7382)) let you standardize on one gateway in front of mixed-backend fleets without per-backend adapters.
- **Huawei Cloud users** can review [#7239](https://github.com/QuantumNous/new-api/pull/7239) and provide testing feedback — it's still open.
- **Reverse-proxy operators** should audit mount paths after upgrading — the prefix refactor in [#7350](https://github.com/QuantumNous/new-api/pull/7350) changes the assumptions built into existing `/v1`, `/api`, `/pg`, `/mj`, `/oauth` routing.
- **Responses API consumers:** watch [#6822](https://github.com/QuantumNous/new-api/issues/6822) — `created_at`-as-float in upstream snapshots caused usage loss; if your billing reconciles on token counts, validate end-to-end on your target RC.
- **Process signal:** the request for v1.0.0 GA criteria ([#7279](https://github.com/QuantumNous/new-api/issues/7279), 👍 8) is worth upvoting if you depend on a stable commitment from this fork.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*