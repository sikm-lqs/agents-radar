# AI Infrastructure Digest 2026-09-15

> Generated: 2026-09-15 11:30 UTC | Projects covered: 9

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

The ecosystem is converging on two workloads: **DeepSeek-V4/V4.1-class frontier serving** and **agent-driven long-context inference** — and both are straining the same subsystems (KV cache hierarchy, speculative decoding, tool-call parsing). Engine-layer activity (vLLM, SGLang) is dominated by SM100/DeepSeek performance work and hybrid SSM-attention (GDN/Mamba/SWA) correctness, while the local-runtime layer (llama.cpp v0.4.1, Ollama v0.34.1-rc2) shipped the only real releases today. Gateway projects (LiteLLM, New API) are in heavy reliability/billing churn, with agent protocols (Responses API, tool calling, Codex-style loops) generating the majority of defects. Speculative decoding (MTP, DFlash, EAGLE) is simultaneously the biggest throughput lever and the single largest source of open regressions across every engine.

## 2. Activity Comparison

| Project | Issues* | PRs* | Release status (24h) |
|---|---|---|---|
| vLLM | ~25 | ~16 | None; Transformers v5.17.0 bump in flight (#56108) |
| SGLang | ~25 | ~19 | None |
| llama.cpp | ~24 | ~21 | **v0.4.1** + 5 b-tags; ABI break (sampler `int→int32_t`) |
| Ollama | ~18 | ~11 | v0.34.1-rc2 (pre-release) |
| LiteLLM | ~30 | ~8 | **v1.101.0** (cosign-signed images) |
| Unsloth | ~40 | ~16 | None (~10 PRs from one maintainer) |
| Claude Code Router | 5 | 0 | None; v3.1.0 regression cluster, zero fixes landed |
| CC Switch | n/a | n/a | None (digest truncated — data unavailable) |
| New API | 41† | 21† | None; v1.0.0-rc.37, GA criteria undefined (#7279) |

\* Counts of items referenced in each 24h digest — a proxy for triage/discussion volume, not exact updated totals. † Self-reported in digest footer.

**Takeaway:** llama.cpp and SGLang show the highest merged-PR throughput; Unsloth and LiteLLM show issue-heavy profiles (installer/AV pain and governance bugs respectively); CCR is the outlier with reports but no engineering response in-window.

## 3. Model Support Race

| Model / Arch | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|---|---|---|---|---|---|
| DeepSeek-V4/V4.1 | ✅ Deep perf (mHC overlap, Mega-mHC, DSpark PP) | ✅ FlexKV hybrid pools, NPU context parallel, MI-targeted | ⚠️ DSV4-Flash SWA KV exhaustion (#25452) | — | — |
| GLM-5.x | ✅ Tool-call recovery (#47190), PCP eval fix | 🔴 5.3-Flash load crash blocks serving (#36711) | — | ⚠️ glm-5.3-flash works; kimi-k3 crashes (#18426) | — |
| Qwen3.5/3.6/3.8 | ⚠️ Hybrid prefix-cache bug (#43587) | ⚠️ FP8 KV cache error (#37379); NPU decode opts | ⚠️ qwen4_exp RSS growth (#28933), linear decode slowdown (#28734) | ⚠️ qwen3.8-27b runs clean on GB10 | — |
| Gemma 4 | ⚠️ Tool parser drops bare calls (#53431) | 🔴 Vision tower crash kills scheduler (#26751) | ⚠️ Trailing-garbage + Vulkan corruption (#28827, #27007) | ⚠️ Jetson OOM (#18396); nvfp4 vision fix landing | 🔴 Bedrock path dead, Mantle route unimplemented (#30657) |
| Nemotron-3 | ⚠️ SM121 spec-decode crash (#37754) | — | — | — | — |
| New architectures | — | — | ✅ **Maple 20B-A1B, Tencent Hy 4, Spark2.5, MiniCPM3 FA** | Via b10969 bump | — |

**Who's ahead:** llama.cpp leads on **time-to-support** (3 new architectures shipped in one release, propagated to Ollama same-day). vLLM leads on **depth** for DeepSeek-V4.1 on NVIDIA SM100. SGLang leads on **hardware breadth** (ROCm HiCache, Ascend NPU, SM100 NVFP4 KV). Gateways are followers by design — LiteLLM currently has two open model-coverage gaps.

## 4. Performance Frontier

- **KV-cache hierarchy is the structural battleground.** vLLM: offload telemetry (#56867), admission-policy and disk-tier RFCs (#51240, #54363). SGLang: FlexKV multi-group pools, ROCm/XPU HiCache, Mooncake tracing (#37976). Ollama: experimental prefill/KV persistence (`OLLAMA_PREFILL_CACHE=1`, #17953). llama.cpp's #21831 (SWA/recurrent full re-processing) shows the cost of getting this wrong.
- **DeepSeek-V4.1 execution:** vLLM's mHC overlap + Mega-mHC + DSpark pipeline-parallel cluster vs. SGLang's single-batch NVLink PD (#38984) and NPU prefill context parallelism (#39427). Both target TP8/EP/SP on SM100.
- **Quantization is moving from weights into KV:** NVFP4 KV on SM100 (SGLang #36340), packed FP4 KV on Hopper (#38902), Q8KV8 sparse prefill (#37236), MXFP4+Humming (vLLM), Q1_0 ARM and GGUF Q2_0 at the edge.
- **Kernel fusion:** vLLM (InternVL pixel-shuffle fusion, MRoPE fusion), llama.cpp (Vulkan int8 coopmat MMQ across 13 formats, sparse FA, SYCL GPU-resident TOP_K, HIP fp32 accumulation), SGLang (AITER FP4 GEMM, CUTLASS 4.6 epilogues).
- **Speculative decoding: highest activity, highest fragility.** vLLM: SM121 crashes, 4× long-context DFlash slowdown, MTP hangs. llama.cpp: Windows TDR on dual Arc. SGLang: EAGLE TP deadlocks (closed/inactive).
- **Gateway-layer latency:** New API's SSE one-frame-lag removal (#7033) and LiteLLM's cross-region rate limits via Redis read-replicas (#41221) — meaningful p50 wins at the routing tier.

## 5. Layer Positioning

- **Datacenter serving engines — vLLM, SGLang:** near-feature-parity rivals; vLLM is NVIDIA-first and production-hardening-focused, SGLang differentiates on DeepSeek specialization and heterogeneous silicon (AMD, Ascend NPU, XPU).
- **Local runtimes — llama.cpp, Ollama:** llama.cpp is the kernel/quantization portability layer; Ollama is the product layer atop it (llama.cpp b10969 + MLX bumps today), competing on Apple-Silicon memory management and agent-loop ergonomics rather than raw throughput.
- **Gateways — LiteLLM, New API, CCR, CC Switch:** LiteLLM is moving enterprise-grade (cosign signing, budget governance, multi-region); New API is a self-hosted billing/relay specialist now integrating vLLM/SGLang as native channels (#7332); CCR and CC Switch are thin client-side routers for Claude Code/Codex — the only layer with zero merged engineering activity today.
- **Fine-tuning — Unsloth:** evolving from notebooks into a Studio desktop product (local serving, image gen, MCP), with today's work almost entirely on operational hardening (GPU detection, AV false positives) rather than training kernels.

**Notable:** the stack is vertically consolidating — New API↔vLLM/SGLang channels, Ollama↔llama.cpp/MLX, Unsloth↔per-model llama.cpp INI (#10783), gateways converging on Anthropic/OpenAI-compat surfaces for agent clients.

## 6. Trend Signals

1. **Hybrid SSM-attention models are breaking caching assumptions everywhere** (vLLM #43587, SGLang #39342/#39147, llama.cpp #21831). Expect radix-cache redesigns to dominate the next quarter.
2. **Agent tool-calling is the top cross-layer defect class** — from token parsers (vLLM, llama.cpp) to empty-completion agent loops (Ollama #18419) to gateway MCP semantic rewrites. End-to-end tool-call validation is now mandatory.
3. **KV offload/tiering is becoming first-class infrastructure**, not a tweak — disk tiers, Mooncake, FlexKV, prefill persistence all advanced in one day.
4. **Error-semantics fidelity matters at the gateway tier:** CCR masking `context_length_exceeded` (#1799) disables Claude Code's auto-compact — happy-path compatibility is no longer sufficient.
5. **Heterogeneous hardware (XPU, NPU, RDNA, edge NPUs) is approaching but not at parity** — every non-NVIDIA path carries at least one open correctness issue today.
6. **Supply-chain and governance maturity is arriving at the gateway layer first** (cosign, budgets, rate limits) while engines still trade correctness for performance.

**Watchlist:** vLLM Transformers v5 upgrade (#38379 — ecosystem-wide dependency event); SGLang GLM-5.3-Flash load crash (#36711); llama.cpp #21831 and #25452 (SWA long-context); LiteLLM streaming regression under load (#41187); Ollama 0.34.x stable + prefill cache GA; New API v1.0.0 GA checklist (#7279).

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-15

## Today's Highlights

No new releases were published in the last 24 hours. Development focus remains on DeepSeek-V4.1 performance (DSpark pipeline-parallel targets, shifted mHC overlap, Mega-mHC kernel integration), Intel XPU parity work (weight cache, spec decoding bugs), and a wave of stability fixes targeting FlashInfer on SM90/SM120 and RDNA3/ROCm backends. A notable regression report describes DFlash speculative decoding degrading from ~71 tok/s to ~16 tok/s at ~185k context on hybrid GDN models, highlighting a missing per-sequence-length disable hook.

## Releases & Breaking Changes

No releases in the last 24h.

Notable in-flight build updates:
- [#56108](https://github.com/vllm-project/vllm/pull/56108) — Bump Transformers to **v5.17.0** (CPU/Mistral CI updates, fix for Poolside's Laguna config `rope_parameters` conflict).
- [#38379](https://github.com/vllm-project/vllm/issues/38379) — Living tracker for the Transformers v5 upgrade; several blockers remain.

## New Model & Hardware Support

- **LongCat-Flash-Lite / Engram embedding** — Feature request [#33528](https://github.com/vllm-project/vllm/issues/33528) for Meituan's token-embedding offload pattern.
- **Intel XPU weight cache** — [#56999](https://github.com/vllm-project/vllm/pull/56999) adds daemon-side pinned-host weight cache for XPU where IPC handles are unavailable (today's XPU).
- **GLM-4.7 / GLM-5.x tool-calling recovery** — [#47190](https://github.com/vllm-project/vllm/pull/47190) recovers malformed `tool_namearg<arg_key>...` openers before streaming.
- **GLM PCP eval stabilization** — [#55879](https://github.com/vllm-project/vllm/pull/55879) fixes FlashInfer DCP warmup for B200 GLM-5.2 across TP/PCP/DCP grid.
- **Hardware-agnostic model definitions** (RFC) — [#44219](https://github.com/vllm-project/vllm/issues/44219) follow-up to [#42770](https://github.com/vllm-project/vllm/issues/42770) proposing separation of model defs by hardware type.

## Performance & Optimization

- **InternVL pixel shuffle + LayerNorm fusion** — [#56965](https://github.com/vllm-project/vllm/pull/56965) collapses the v2 downsampling path (`view → permute → contiguous → view → permute → contiguous → LayerNorm`) into a single stride-aware Triton kernel.
- **ROCm MRoPE fusion** — [#50212](https://github.com/vllm-project/vllm/pull/50212) extends `QkNormRopeKvCacheFusionPass` to Qwen3-VL 3D MRoPE, eliminating three GPU launches per layer on AITER.
- **ROCm shared-expert gate dispatcher** — [#54185](https://github.com/vllm-project/vllm/pull/54185) routes the fused shared-expert gate through the platform dispatcher when `VLLM_ROCM_USE_AITER_FUSION_SHARED_EXPERTS=1`.
- **DeepSeek-V4.1 mHC overlap** — [#56611](https://github.com/vllm-project/vllm/pull/56611) overlaps shifted mHC coefficient generation with attention/FFN under `VLLM_DSV41_MHC_OVERLAP=1` (SM100, TP8/EP/SP, ≤256 tokens).
- **Mega-mHC kernel integration** — [#56962](https://github.com/vllm-project/vllm/pull/56962) reopens #56255 retargeted to `deepseek_v41`.
- **DSpark pipeline-parallel targets** — [#56956](https://github.com/vllm-project/vllm/pull/56956) supports DSpark on PP targets in aggregated (non-PD) serving, with draft broadcast across stages.
- **Humming before Marlin backends** — [#56997](https://github.com/vllm-project/vllm/pull/56997) prefers Humming where applicable (stacked on #56685).
- **DeepSeek-V4.1-Flash on MI355X** (RFC) — [#56506](https://github.com/vllm-project/vllm/issues/56506) reports 35.89 out tok/s at c=1, TP4 on 8× MI355X; significant headroom remains on gfx950.
- **TP MoE collectives via torch.compile** — [#29139](https://github.com/vllm-project/vllm/issues/29139) proposes a custom pass to avoid redundant collectives; sequence parallelism exists in DeepSeek since #24134/#24982 but needs compile-pass integration.
- **DSv4.1-Flash + MXFP4 + DSpark MTP** numbers in #56506 also call out DSpark scaling at higher concurrency.

## Stability & Regressions

**High severity (crashes / silent corruption)**
- **FlashInfer + MTP speculative decoding crashes on SM121 (DGX Spark)** with Nemotron-3-Super-120B-A12B-NVFP4 (GQA=16). Triton backend works. [#37754](https://github.com/vllm-project/vllm/issues/37754)
- **DeepSeek-V4.1-Flash `dsv4_topk` Triton illegal memory access on H20** under high concurrency; mitigated by `max_num_seqs=256`. [#56389](https://github.com/vllm-project/vllm/issues/56389)
- **Silent persistent output corruption on Arc Pro B70 (XPU)**: 27B W4A16 emits endless "!" / token 0 under sustained concurrent decode; HTTP 200, no error. [#53480](https://github.com/vllm-project/vllm/issues/53480)
- **DFlash fused-KV projection calls `F.linear` on a sliced `qkv_proj` weight** — silently corrupts weight-quantized drafters. [#51581](https://github.com/vllm-project/vllm/issues/51581)
- **Batch invariance broken** with `VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp` on 4× RTX PRO 6000 Blackwell. [#56370](https://github.com/vllm-project/vllm/issues/56370) — affects reproducibility/testing.
- **FlashInfer SM90 sparse MLA mixed batches OOB** — fix PR [#56969](https://github.com/vllm-project/vllm/pull/56969).

**High severity (correctness on production paths)**
- **GLM-5.3-Flash degenerates into repeated-token "word salad"** in multi-turn agentic use. [#56605](https://github.com/vllm-project/vllm/issues/56605)
- **DFlash2 changes greedy Qwen3.8 thinking output at token 30** (with `--enforce-eager`, K=1). [#54928](https://github.com/vllm-project/vllm/issues/54928)
- **DeepSeek-V4-Pro TP=8 worker hang → EngineDeadError** during MTP speculative decoding. [#41530](https://github.com/vllm-project/vllm/issues/41530)
- **Prefix caching fails for incremental multimodal requests on Mamba-attention hybrids** (Qwen3.5). [#43587](https://github.com/vllm-project/vllm/issues/43587)
- **KV block leak with fault tolerance in P/D disaggregation** — fix PR [#56430](https://github.com/vllm-project/vllm/pull/56430).
- **DSpark uninitialized EPLB state** when target uses different expert topology than drafter — fix PR [#56387](https://github.com/vllm-project/vllm/pull/56387).
- **SM100 `fp8_ds_mla` cache scale mismatch** (writer vs reader) — fix PR [#49435](https://github.com/vllm-project/vllm/pull/49435).

**Medium / closed**
- **OTLP tracer init never sends spans** (--otlp-traces-endpoint, instrument_otel/manual_instrument_otel never invoked). [#56696](https://github.com/vllm-project/vllm/issues/56696) — closed.
- **RDNA3 fused MoE hardcodes 2× gated-activation factor**, breaks non-gated (relu2) Nemotron-3. [#56790](https://github.com/vllm-project/vllm/issues/56790) — closed.
- **Gemma4 tool parser drops bare `<|tool_call>:name{...}`** silently. [#53431](https://github.com/vllm-project/vllm/issues/53431) — closed.
- **XPU speculative decoding error on Qwen3.6-35B-A3B**. [#52262](https://github.com/vllm-project/vllm/issues/52262)
- **vLLM lacks Blackwell unified-memory paging telemetry** — references DGX Spark monitoring; no fix PR. [#54200](https://github.com/vllm-project/vllm/issues/54200)

## What This Means for Application Developers

- **Long-context DFlash is a footgun on hybrid GDN models (Qwen3.5/3.6/3.8)**: a ~4× slowdown at 185k context is reported in [#54691](https://github.com/vllm-project/vllm/issues/54691). If you're serving these models at long context, treat DFlash as a short-context-only win and benchmark before enabling.
- **Spec decoding is still fragile on Blackwell / SM120 / DGX Spark**. If you deploy Nemotron-3-Super or DeepSeek-V4.1-Flash on those parts, pin Triton attention backend for Nemotron and cap `max_num_seqs≤256` on H20 until the upstream fixes land.
- **Sequence parallelism + `VLLM_BATCH_INVARIANT=1` are mutually broken** today ([#56370](https://github.com/vllm-project/vllm/issues/56370)). If you depend on deterministic outputs for evals, do not enable SP until a fix ships.
- **P/D disaggregation with fault tolerance leaks KV blocks** under worker failures — fixed in [#56430](https://github.com/vllm-project/vllm/pull/56430); pin this PR if you run PD-FT in production.
- **Tool-calling parsers are still leaking edge cases** (Gemma4 [#53431](https://github.com/vllm-project/vllm/issues/53431), GLM-4.7 recovery in [#47190](https://github.com/vllm-project/vllm/pull/47190)). Validate streamed tool-call responses end-to-end, not just on golden prompts.
- **KV offload is becoming first-class**: a new generic info metric `vllm:kv_offload_config_info` lands in [#56867](https://github.com/vllm-project/vllm/pull/56867), and admission-policy RFCs [#51240](https://github.com/vllm-project/vllm/issues/51240) and FS-tier integrity RFC [#54363](https://github.com/vllm-project/vllm/issues/54363) are converging on production-grade disk-tier behavior.
- **Intel XPU is approaching parity but not there yet**: weight cache [#56999](https://github.com/vllm-project/vllm/pull/56999) shipped today, but spec decoding (#52262) and silent output corruption (#53480) remain open — keep XPU deployments behind conservative concurrency limits.
- **DeepSeek-V4.1 is the active performance target**. DSpark PP, mHC overlap, and Mega-mHC integration all landed/reopened today; expect measurable DSv4.1 throughput gains on SM100 in the next release.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-15

## 1. Today's Highlights

- **DeepSeek V4 ecosystem hardening** dominates activity: FlexKV multi-group layouts ([#31781](https://github.com/sgl-project/sglang/pull/31781)), AMD FP8 unified-attn HiCache ([#37778](https://github.com/sgl-project/sglang/pull/37778)), intra-node NVLink layer batching for DSV4 ([#38984](https://github.com/sgl-project/sglang/pull/38984)), NPU prefill context parallelism ([#39427](https://github.com/sgl-project/sglang/pull/39427)), and NPU indexer top-k results ([#39060](https://github.com/sgl-project/sglang/pull/39060)) all advanced.
- A new **dLLM (block-diffusion) serving roadmap** ([#39499](https://github.com/sgl-project/sglang/issues/39499)) was opened, continuing the prior RFC thread and laying out full-sequence model support alongside future sampling/scheduler work.
- **Mamba/unified radix-cache correctness fixes** landed and shipped — a checkpoint-stamping bug on shorter insert keys is patched ([#39209](https://github.com/sgl-project/sglang/pull/39209)), and MHA prefill graphs now honor agreed cache prefixes ([#38716](https://github.com/sgl-project/sglang/pull/38716)).

## 2. Releases & Breaking Changes

No new tagged releases in the last 24h. Notable API/surface changes landing in `main`:

- **Platform abstraction completion:** [#33718](https://github.com/sgl-project/sglang/pull/33718) (closed) finalized routing of `empty_cache()`/`synchronize()` through `current_platform`; its follow-up [#34544](https://github.com/sgl-project/sglang/pull/34544) (closed) routes 398 test call sites across 122 files. OOT platform plugins (XPU, CPU) and TSMC-style accelerators no longer crash on hardcoded `torch.cuda.*` calls.
- **CI maintenance mode policy** ([#21065](https://github.com/sgl-project/sglang/issues/21065)) was reactivated and re-closed within 24h — auto-rotation between normal and maintenance CI remains the operational model.
- `disable_piecewise_cuda_graph` `ServerArgs` kwarg removal continues: [#37032](https://github.com/sgl-project/sglang/pull/37032) (closed) updates 5 scripted chunked-prefill test classes that referenced the removed parameter.

## 3. New Model & Hardware Support

- **Apple Silicon (MPS)** — standard Torch runner on macOS, not just MLX ([#36780](https://github.com/sgl-project/sglang/pull/36780), tracking [#32321](https://github.com/sgl-project/sglang/issues/32321)).
- **DeepSeek V4 (C4A / C128A, SWA + C4A indexer/state)** — FlexKV multi-group pools composed with UnifiedRadixCache for hybrid SWA bookkeeping ([#31781](https://github.com/sgl-project/sglang/pull/31781)); ROCm HiCache for DSV4 FP8 unified attention ([#37778](https://github.com/sgl-project/sglang/pull/37778)); NPU DSV4 prefill context parallelism with interleave + zigzag ([#39427](https://github.com/sgl-project/sglang/pull/39427)).
- **DeepSeek-V4.1 — packed FP4 main KV on Hopper** proposed ([#38902](https://github.com/sgl-project/sglang/issues/38902), baseline [#38798](https://github.com/sgl-project/sglang/issues/38798)).
- **SM100 NVFP4 KV cache** via TRT-LLM GenMHA + optional FlashInfer FP8 dequant prefill path, with CUDA Graph capture ([#36340](https://github.com/sgl-project/sglang/pull/36340)).
- **AMD AITER ASM FP4 GEMM** for Quark W4A4 dense-linear, opt-in via shared `a4w4_blockscale_tuned_gemm.csv` model tables ([#39598](https://github.com/sgl-project/sglang/pull/39598)).
- **Intel XPU HiCache** wired up, with a use-after-free fix in the async write/load streams ([#32503](https://github.com/sgl-project/sglang/pull/32503)).
- **NPU qwen3.5 / qwen3.6 decoding** optimization (double-buffer pinned memory, fused sigmoid) ([#35958](https://github.com/sgl-project/sglang/pull/35958)); Qwen3.5-122B-A10B FP8 KV cache path also in scope ([#37379](https://github.com/sgl-project/sglang/issues/37379)).
- **AITER upgrade readiness tracker** updated ([#21302](https://github.com/sgl-project/sglang/issues/21302), AITER scout [#26890](https://github.com/sgl-project/sglang/issues/26890)).

## 4. Performance & Optimization

- **Ascend/NPU sampling**: removes a device sync in the `torch.all((top_ks<=1024)&(top_ks>=1))` gate before `npu_top_k_top_p` ([#39404](https://github.com/sgl-project/sglang/pull/39404)).
- **DeepSeek V4 INTRA_NODE_NVLINK PD**: pack all layers into a single batch instead of per-layer microbatches ([#38984](https://github.com/sgl-project/sglang/pull/38984)).
- **Native SM90 Q8KV8 sparse prefill Step 3**: quantizes main-attention q/k/v into FP8 E4M3 with an opt-in path on Hopper for FP8 KV cache workloads ([#37236](https://github.com/sgl-project/sglang/pull/37236)).
- **MHA prefill CUDA graphs**: default request count derived from `chunked_prefill_size // 512` was incorrectly excluding otherwise-eligible MHA batches; graphs now expanded and cached-prefix variants unified ([#38716](https://github.com/sgl-project/sglang/pull/38716)).
- **Mooncake per-request context propagation** through HiCache read path for end-to-end request tracing ([#37976](https://github.com/sgl-project/sglang/pull/37976)).
- **Diffusion CLI**: backend auto-detection no longer eagerly imports the diffusion runtime when `--model-type` is unset ([#39407](https://github.com/sgl-project/sglang/pull/39407)).
- **CUTLASS 4.6 dynamic epilogue fusions** + IKET profiling under investigation ([#30809](https://github.com/sgl-project/sglang/issues/30809)).
- **KVTC KV-cache compression** RFC from Ascend NPU contributors ([#30419](https://github.com/sgl-project/sglang/issues/30419)).

## 5. Stability & Regressions

Ranked by likely user impact:

| Sev | Issue | Status | Notes |
|-----|-------|--------|-------|
| High | [GLM-5.3-Flash (`glm5_next`, 288 routed + 1 shared expert, FP8) crashes on weight load](https://github.com/sgl-project/sglang/issues/36711) when MoE runner forces `disable_shared_experts_fusion` (e.g. `flashinfer_trtllm`/`flashinfer_cutedsl`/`flashinfer_trtllm_routed`); `IndexError: index 288 out of bounds in logical_to_all_physical` | OPEN | Blocks MoE-routed GLM-5.3-Flash serving entirely |
| High | [ROCm DeepSeek-V4.1 FP4 indexer still exhausts HBM under long-context AgentX](https://github.com/sgl-project/sglang/issues/39441) after #37660 | OPEN | Memory regression on AMD preview image |
| High | [`--enable-mixed-chunk` corrupts mamba radix-cache checkpoints on hybrid GDN](https://github.com/sgl-project/sglang/issues/39342); mixed-batch path skips `extra_buffer` write but still donates the slot | OPEN | Fix PR [#39209](https://github.com/sgl-project/sglang/pull/39209) addresses a related checkpoint-stamping bug; this one still needs a PR |
| High | [HiCacheFile `batch_exists_v2` false hit on hybrid prefix when an auxiliary pool cannot restore](https://github.com/sgl-project/sglang/issues/39147) | OPEN | Silent correctness bug in `ALL_PAGES` mixed-pool lookups |
| High | [HiCache `write_through` can evict a first-seen prefix before all of its KV is backed up to Mooncake](https://github.com/sgl-project/sglang/issues/39444) | OPEN | Replay after eviction produces incorrect state |
| High | [Gemma-4 mm: single non-RGB image crashes vision tower and kills the scheduler](https://github.com/sgl-project/sglang/issues/26751) (`mat1 256 vs 768`), dropping in-flight requests | OPEN | Multiplies across two layered bugs in channel guard + shared tokenization |
| Med  | [EAGLE greedy verify lacks TP broadcast → rank-divergence deadlock at `tp>1`](https://github.com/sgl-project/sglang/issues/31071) | CLOSED, inactive | Worth checking against your EAGLE config |
| Med  | [EAGLE + DP attention + PD disagg deadlock on `index_share_for_mtp_iteration` (GLM-5.2)](https://github.com/sgl-project/sglang/issues/32527) | CLOSED, inactive | |
| Med  | [DCP > 1 decode retraction crash in `get_cpu_copy` (PD-disagg)](https://github.com/sgl-project/sglang/issues/38645) | CLOSED | |
| Med  | [Qwen3.5-122B-A10B RuntimeError with `--kv-cache-dtype fp8_e4m3` + `--quantization-param-path`](https://github.com/sgl-project/sglang/issues/37379) | OPEN | Reproducible on `main` and v0.5.16, L20×8 / TP=8 |
| Med  | [MoE deferred finalize unreachable for models with their own routing (`FLASHINFER_TRTLLM_ROUTED` excluded)](https://github.com/sgl-project/sglang/issues/39299) | OPEN | |
| Med  | [Unified radix cache prunes MAMBA component nodes instead of downgrading on eviction](https://github.com/sgl-project/sglang/issues/33713) | OPEN | Breaks H→D load-back for hybrid-KDA prefixes |
| Low  | [OpenAI-compat HTTP server does not validate `model` field per spec](https://github.com/sgl-project/sglang/issues/31404) | CLOSED, inactive | |
| Low  | [Model Gateway silently rewrites MCP `tool_choice="required"` to `"auto"`](https://github.com/sgl-project/sglang/issues/31459) | CLOSED, inactive | Semantic regression for `/v1/responses` MCP users |
| Low  | [`SGLANG_SHARED_EXPERT_TP1=1` corrupts output when post-experts all-reduce is skipped](https://github.com/sgl-project/sglang/issues/31475) | CLOSED, inactive | |
| Low  | [v0.5.12 DeepGemm regression on B300 (sm_103)](https://github.com/sgl-project/sglang/issues/255

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-15

## Today's Highlights

The **v0.4.1 release** lands with three new architectures (Maple 20B-A1B, Tencent Hy 4, Spark2.5), ggml v0.24.0, and improved JSON schema and chat parsing — while `b10978` plugs a real Metal regression that broke MiniCPM3 because no `(HSK=96, HSV=64)` flash-attention instantiation existed. On the backend side, **HIP flash-attention gets substantial fixes** (fp32 accumulation on CDNA via b10970, fully-masked KV-tile skipping in WMMA via #28943) addressing the gfx1151/Strix Halo regressions that have been open since June.

## Releases & Breaking Changes

- **[v0.4.1](https://github.com/ggml-org/llama.cpp/releases/tag/v0.4.1)** — Adds Maple 20B-A1B, Tencent Hy 4, and Spark2.5 architectures; improves JSON schema handling, chat parsing, logging, and server child-process management; bumps ggml to **v0.24.0**. API change: `llama_sampler_chain_n()` now returns `int32_t` instead of `int` — downstream bindings will need a recompile.
- **[b10964](https://github.com/ggml-org/llama.cpp/releases/tag/b10964)** — Version bump commit for 0.4.1.
- **[b10977](https://github.com/ggml-org/llama.cpp/releases/tag/b10977)** — CUDA Windows x64 toolchain bumped to 13.4.1 (#28930).
- **[b10969](https://github.com/ggml-org/llama.cpp/releases/tag/b10969)** — Ubuntu CUDA builds (12.8/13.3, x64 + arm64) now part of the release artifact set (#28186); adds GCC 14 for arm64.
- **[b10976](https://github.com/ggml-org/llama.cpp/releases/tag/b10976)** — Fixes Android release pipeline (#28936).

Migration note: any C/C++ consumer linking against `libllama` will see an ABI-incompatible `int` → `int32_t` change in the sampler API.

## New Model & Hardware Support

- **MiniCPM3** — Metal flash-attention kernels added for `(HSK=96, HSV=64)` ([b10978 / #28599](https://github.com/ggml-org/llama.cpp/pull/28599)); previously `-fa` failed silently for this model.
- **Maple 20B-A1B, Tencent Hy 4, Spark2.5** — New architectures in v0.4.1.
- **fraunhofer-iis/elmod-2.7b-it** — New `escape_after_split` pre-tokenizer ([#28845](https://github.com/ggml-org/llama.cpp/pull/28845)), fixes #28804.
- **Q1_0 quantization on ARM** — Repack kernels (4x4 NEON+DP, 4x8 NEON+DP+I8MM) merged-ready ([#23492](https://github.com/ggml-org/llama.cpp/pull/23492)), useful for Bonsai-style LLMs.
- **HIP/ROCm AllReduce** — Implementation enabled on HIP now that the underlying CUDA-equivalent primitives exist ([#27825](https://github.com/ggml-org/llama.cpp/pull/27825)), unblocks multi-GPU ROCm.
- **HIP MoE RDNA 3.5** — Broadened `ncols_opt` tile heuristic ([#28935](https://github.com/ggml-org/llama.cpp/pull/28935)).
- **OpenCL generic `ssm_scan`** — Removes subgroup-size=64 and `d_state∈{128,256}` restrictions ([#28881](https://github.com/ggml-org/llama.cpp/pull/28881)).
- **OpenVINO** — Major improvements to stateful decode, GPU MoE inference (compressed expert fusion + grouped 8-bit re-quant), NPU cacheless encoder models, weight spilling ([#28638](https://github.com/ggml-org/llama.cpp/pull/28638)).

## Performance & Optimization

- **HIP/AMD CDNA fattn-mma** — Switched to fp32 accumulators ([b10970 / #28576](https://github.com/ggml-org/llama.cpp/pull/28576)); addresses accuracy concerns with reduced-precision MFMA paths.
- **HIP WMMA FA** — Skips fully-masked KV tiles for shared-cache prefill ([#28943](https://github.com/ggml-org/llama.cpp/pull/28943)), references #28495.
- **Vulkan on Strix Halo** — `SHMEM_STRIDE_PAD` 4 → 6 ([#28941](https://github.com/ggml-org/llama.cpp/pull/28941)); the PR notes ~85–90% of GPU time at 128 tokens is `MUL_MAT`, so this is a meaningful PP uplift on gfx1151.
- **Vulkan int8 coopmat1 matmul (RDNA3/RDNA4)** — New MMQ cm1 shader covering q4_0, q4_1, q5_0, q5_1, q8_0, q3_k/q4_k/q5_k/q6_k, mxfp4, nvfp4, iq4_nl ([#27952](https://github.com/ggml-org/llama.cpp/pull/27952)).
- **SYCL TOP_K** — GPU-resident radix-select implementation for `k > 32` ([b10956 / #28670](https://github.com/ggml-org/llama.cpp/pull/28670)); previously fell back to a CPU backend round-trip per call.
- **Vulkan sparse Flash Attention** — Backend support landed ([#28105](https://github.com/ggml-org/llama.cpp/pull/28105), merge ready).
- **CUDA `GGML_OP_SUM_ROWS`** — Now supports F32 row-contiguous tensors via a stride-aware kernel ([#26308](https://github.com/ggml-org/llama.cpp/pull/26308), merged).
- **RPC hash-cache** — `ggml_backend_rpc_buffer_set_tensor` to hash only weight transfers, not activations ([#28789](https://github.com/ggml-org/llama.cpp/pull/28789)).
- **CI server coverage** — Small CUDA pytest subset now runs pre-merge on PRs ([#28746](https://github.com/ggml-org/llama.cpp/pull/28746)).
- **Self-hosted Vulkan + WebGPU** in HuggingFace Jobs CI ([#28712](https://github.com/ggml-org/llama.cpp/pull/28712)).

## Stability & Regressions

**High severity (still open, large blast radius):**

- **#21831 — Server forces full prompt re-processing on SWA/recurrent memory** ([link](https://github.com/ggml-org/llama.cpp/issues/21831), 52 comments, 👍30). Affects CUDA on Windows, affects all SWA and recurrent models (DSV4-Flash, Mamba/SSM families). No fix PR linked yet.
- **#24066 — Vulkan performance drop in recent builds** ([link](https://github.com/ggml-org/llama.cpp/issues/24066), 45 comments). RX 6600 + Qwen3.5-9B Q5_K_M. Vulkan users on RDNA2 should test before upgrading.
- **#28753 — `ggml_backend_sched_alloc_splits: unexpected graph reallocation` crash** ([link](https://github.com/ggml-org/llama.cpp/issues/28753), 8 comments). SYCL on Intel Arc Pro B50 + A770.
- **#27888 — SYCL multi-GPU crash (Intel Arc Pro B50 + Arc A770)** ([link](https://github.com/ggml-org/llama.cpp/issues/27888), 12 comments).
- **#28778 — SYCL DFlash2 draft model triggers Windows TDR on dual Arc Pro B70** ([link](https://github.com/ggml-org/llama.cpp/issues/28778), 6 comments). Speculative decoding is the trigger.
- **#27638 — Vulkan/ANV FA fallback to SCALAR path** ([link](https://github.com/ggml-org/llama.cpp/issues/27638)). O(N²) PP + device loss on Intel Arc B580.

**Correctness (high impact):**

- **#28827 — Gemma4 emits progressively long trailing garbage during "thinking"** ([link](https://github.com/ggml-org/llama.cpp/issues/28827)). Vulkan mixed-GPU config.
- **#28211 — HIP/ROCm on gfx1151 (Strix Halo) wrong logits when prompt > n_ubatch** ([link](https://github.com/ggml-org/llama.cpp/issues/28211)). Silent corruption, not a crash.
- **#28768 — HIP on gfx1201 (R9700): batched target scoring changes logits/top-1** ([link](https://github.com/ggml-org/llama.cpp/issues/28768)).
- **#27007 — Gemma 4 26B A4B QAT output corruption on Vulkan (Radeon 890M gfx1150)** ([link](https://github.com/ggml-org/llama.cpp/issues/27007)). Isolated to fused MMVQ kernel.
- **#25452 — DSV4-Flash SWA KV-cache exhaustion (crash + stall)** ([link](https://github.com/ggml-org/llama.cpp/issues/25452)).
- **#28726 — OpenVINO backend STATUS_ILLEGAL_INSTRUCTION on AVX-512 (Core Ultra 7 265K)** ([link](https://github.com/ggml-org/llama.cpp/issues/28726)).
- **#28933 — qwen4_exp (Qwen3.8-Flash-Next): RSS+swap grows during normal chat on 128 GB unified memory (DGX Spark)** ([link](https://github.com/ggml-org/llama.cpp/issues/28933)).
- **#28734 — qwen4_exp CUDA: decode slows linearly with context** ([link](https://github.com/ggml-org/llama.cpp/issues/28734)).
- **#28902 — M-RoPE embedding batches read `batch.pos` past end of documented `n_tokens` array** ([link](https://github.com/ggml-org/llama.cpp/issues/28902)). Potential memory-safety issue.
- **#28752 — Vulkan RDNA3 prompt-processing regression after b10780** ([link](https://github.com/ggml-org/llama.cpp/issues/28752)).
- **#24437 — HIP `GGML_HIP_ROCWMMA_FATTN=ON` −41% prefill regression on gfx1151 (Strix Halo)** ([link](https://github.com/ggml-org/llama.cpp/issues/24437)).
- **#28814 — Linker error for `bin/ggml-rpc-server` with LLVM 23 + HIP** ([link](https://github.com/ggml-org/llama.cpp/issues/28814)).

**Fixed / closed:**

- **#28275** — Docker missing SemVer tags / release builds (closed; SemVer tagging shipped).
- **#28441** — Qwen2.5-Omni audio corruption on Metal under system load (closed in b10978 area).
- **#28722** — WebGPU hy_v4 crashes on macOS (closed).
- **#27025** — Muse Glimmer tool-call format mismatch (closed).
- **#28938** ([PR](https://github.com/ggml-org/llama.cpp/pull/28938)) — Server no longer forwards `--api-key-file` to router-spawned children; fixes a 401 on `--api-key` clients in router mode.

## What This Means for Application Developers

- **Pin your build to v0.4.1 if you're shipping MiniCPM3 on Apple Silicon** — earlier Metal builds will reject `-fa`. Pre-b10978 builds were dropping to a non-FA fallback for this model.
- **Plan a recompile** if you bind against `llama.h`: the sampler `int → int32_t` change is ABI-breaking. Python `llama-cpp-python` wheels should refresh shortly, but verify the changelog before bumping.
- **SYCL / Intel Arc users**: today's HIP/Metal fixes don't help you. Issues #28753, #27888, #28778, and #28728 indicate multi-GPU Arc and large-model SYCL paths are still rough — keep `-ngl` lower and avoid speculative decoding (DFlash2) on Windows Arc until #28778 is resolved.
- **Vulkan on RDNA2/3 should validate before upgrading** — #24066 and #28752 indicate performance regressions in recent builds. If you target consumer AMD GPUs, pin to a known-good b-number and benchmark.
- **Strix Halo / gfx1151 (Ryzen AI MAX) owners** are the big winners today: b10970's fp32-accum fattn-mma, #28943's masked-tile skip, and #28941's `SHMEM_STRIDE_PAD` tweak are all targeting your hardware. But #28211 (silent wrong logits) and #24437 (−41% prefill with WMMA FA) mean **correctness validation is mandatory** before enabling those kernels on inference workloads.
- **OpenVINO users on Core Ultra** should disable AVX-512 or roll back until #28726 is fixed.
- **Server operators in router mode** should pull the next build containing #28938 — there's a real auth regression where `--api-key` clients get 401'd against router children.
- **CI/CD**: the new self-hosted Vulkan/WebGPU runners (#28712) and pre-merge CUDA server tests (#28746) should reduce the rate of regressions landing on these backends over the next few weeks.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-15

## 1. Today's Highlights

Ollama shipped **v0.34.1-rc2** with MLX memory-management fixes (free-memory gating, prefix-cache eviction) and raised the token-repeat limit. A coordinated batch of MLX correctness fixes is landing alongside an MLX and llama.cpp upstream version bump — addressing nvfp4 multimodal corruption, structured-output leakage after `</think>`, and tool-call parsing regressions that have been generating user-reported empty completions.

## 2. Releases & Breaking Changes

- **v0.34.1-rc2** ([release](https://github.com/ollama/ollama/releases/tag/v0.34.1))
  - `app`: fixed ChatGPT model selector spacing.
  - `mlxrunner`: evict prefix-cache snapshots from the active conversation before teardown.
  - `mlxrunner`: check host free memory and wait for evicted runners before loading the next MLX model.
  - `llm`: token-repeat limit raised from a lower default to **100**, and a repeat-exceeded condition now returns an explicit error instead of silent truncation.

- **API deprecation**: `typical_p` is being removed for new model creation; existing GGUF manifests with the setting remain readable ([PR #18448](https://github.com/ollama/ollama/pull/18448)).

## 3. New Model & Hardware Support

- **GGUF Q2_0 tensors** added to the fs/ggml reader and importer path ([PR #18443](https://github.com/ollama/ollama/pull/18443)). Previously, any GGUF containing Q2_0 tensors failed with a tensor-size overflow.
- **llama.cpp bumped to b10969** ([PR #18446](https://github.com/ollama/ollama/pull/18446)), resolving duplicate-symbol conflicts between `libllama` and `libmtmd` introduced in the upstream build changes.
- **MLX / MLX-C upstream bump** ([PR #18449](https://github.com/ollama/ollama/pull/18449)) that includes a fix for **quantized matmul corruption affecting nvfp4 multimodal models** (notably the Gemma 4 vision tower). Thread-local stream/sync APIs are deferred for now.
- **Hardware requests still open**:
  - Qualcomm Dragonwing IQ-9075 (HTP NPU + Adreno 663) — used in Raxda Fogwise Airbox ([#18445](https://github.com/ollama/ollama/issues/18445)).
  - Rock-chip NPU (RK3588 / RK3576) — long-standing request ([#9268](https://github.com/ollama/ollama/issues/9268)).

## 4. Performance & Optimization

- **MLX prefix-cache eviction** ([#18461](https://github.com/ollama/ollama/pull/18461) shipped area) and free-memory gating reduce the chance of swapping under concurrent agent workloads — concrete budget stays at the hard-coded **8 GiB**, now flagged as a tuning concern rather than a leak ([#18131](https://github.com/ollama/ollama/issues/18131)).
- **Experimental prefill/KV cache persistence across runner reloads** behind `OLLAMA_PREFILL_CACHE=1` ([PR #17953](https://github.com/ollama/ollama/pull/17953)). When a runner unloads, the processed prompt state is preserved so the next request skips full prefill — material for long-context / agentic loops.
- **MLX load-progress reporting and stall detection** ([PR #17834](https://github.com/ollama/ollama/pull/17834)) binds the listener before load and uses lazy weights to avoid spurious cancellations on large models.
- **Manifest-list storage** lays the groundwork for runner-specific manifests under a single tag ([PR #16590](https://github.com/ollama/ollama/pull/16590)) — expected to improve storage efficiency when multiple runners (e.g., CUDA + MLX) serve the same logical model.

## 5. Stability & Regressions

**High severity**
- **kimi-k3:cloud crashes (HTTP 500) on image content in tool-role messages** — regression from kimi-k2.6 / glm-5.3-flash which both work ([#18426](https://github.com/ollama/ollama/issues/18426)). No fix PR yet.
- **Gemma 4 E4B multimodal OOMs on Jetson Orin Nano 8GB** despite a CPU-projector configuration succeeding ([#18396](https://github.com/ollama/ollama/issues/18396)). Affects a popular edge device class.
- **MLX runner fatal OOM mid-request at long context** when prefix cache holds paged-out snapshots; eviction works but there is no alloc-failure retry ([#18231](https://github.com/ollama/ollama/issues/18231)).
- **Tool-call output silently discarded on parse failure** — empty content, no `tool_calls`, completion tokens reported ([#17274](https://github.com/ollama/ollama/issues/17274)). **Fix:** [PR #18461](https://github.com/ollama/ollama/pull/18461) returns buffered output as `content` when no tool call is parsed.

**Medium severity**
- **Anthropic-compat: system-role messages hoisted into the system block** ([#18431](https://github.com/ollama/ollama/issues/18431)) defeats the prefix cache for Claude Code workflows that inject system messages after every tool result. No fix PR yet.
- **gemma4:26b concurrent decode loses EOS** at `num_predict`, while `qwen3.8-27b` runs clean on the same GB10 harness ([#18442](https://github.com/ollama/ollama/issues/18442)). Suggests a model-specific decode correctness bug under concurrency.
- **MLX structured output with thinking enabled** prefixes JSON with a stray `.` ([#18441](https://github.com/ollama/ollama/issues/18441)). **Fix:** [PR #18459](https://github.com/ollama/ollama/pull/18459) adds an MLX-specific structural-tag grammar that avoids the off-by-one token leak.
- **muse-glimmer:30b-mlx (NVFP4) repeatedly stuck in "Stopping…"** on M4 Air 32GB ([#18269](https://github.com/ollama/ollama/issues/18269)). The MLX nvfp4 corruption fix in [PR #18449](https://github.com/ollama/ollama/pull/18449) is the likely mitigation once propagated.
- **`/api/codex/v1/responses` returns empty completion for `previous_response_id` tool follow-up** ([#18419](https://github.com/ollama/ollama/issues/18419)), breaking Codex-style agent loops.

**Low severity**
- **`ollama launch claude` advertises 1M context but runs with a 200K window**; a 262K model is labelled 1M ([#18463](https://github.com/ollama/ollama/issues/18463)).
- **Intermittent `model not found` errors** when many manifests exist ([#18447](https://github.com/ollama/ollama/issues/18447)). **Fix:** [PR #18438](https://github.com/ollama/ollama/pull/18438) fixes case-insensitive canonicalization across compound model names.
- **`/api/codex/v1/responses` empty completion on `previous_response_id`** ([#18419](https://github.com/ollama/ollama/issues/18419)) — follow-up renders zero input/output tokens.
- **Undocumented per-model Ollama version requirements** on the library page ([#18414](https://github.com/ollama/ollama/issues/18414)).
- **IQ3_S quantization for Qwen3.8-27B-GSQ-RCO-GGUF returns empty content** ([#18297](https://github.com/ollama/ollama/issues/18297), closed) — was a parser issue, now fixed.
- **Tokenizer: WordPiece drops Unicode punctuation** into unknown tokens ([PR #18462](https://github.com/ollama/ollama/pull/18462), open) — correctness issue for multilingual inputs.
- **Two background-goroutine leak bugs in GGUF lazy reader and `/api/create` converter** closed ([#17180](https://github.com/ollama/ollama/issues/17180), [#17179](https://github.com/ollama/ollama/issues/17179)) — stability hardening landed.

## 6. What This Means for Application Developers

- **Tool-call consumers can now recover gracefully.** With [PR #18461](https://github.com/ollama/ollama/pull/18461) shipped, parsers that fail on malformed tool calls will emit the buffered text as `content` instead of returning an empty response. Application-side "did the model actually call a tool?" checks become reliable again.
- **Long-context agent workloads on Apple Silicon remain a tight squeeze.** The 8 GiB MLX prefix-cache budget is hard-coded and now confirmed as a known tuning knob rather than a leak ([#18131](https://github.com/ollama/ollama/issues/18131)). Plan headroom for `qwen3.8:27b-mlx` style agents on 32 GB Macs, and watch for the alloc-failure retry ([#18231](https://github.com/ollama/ollama/issues/18231)).
- **MLX nvfp4 multimodal models (Gemma 4 vision tower included) should be re-pulled** after the [MLX-C bump](https://github.com/ollama/ollama/pull/18449) lands in a release — corruption was a known upstream issue.
- **Anthropic-compatible integrations with Claude Code are currently cache-hostile.** If your agent pipeline injects `role: "system"` after tool results, Ollama's `/v1/messages` endpoint merges it into the top system block, invalidating the prefix cache. Either restructure the message or pin to the `/v1/chat/completions` endpoint until [#18431](https://github.com/ollama/ollama/issues/18431) is fixed.
- **Prepare for `typical_p` removal** in the next minor ([PR #18448](https://github.com/ollama/ollama/pull/18448)). Existing Modelfiles keep working, but new model creation will no longer accept the parameter.
- **Prefill cache persistence** ([PR #17953](https://github.com/ollama/ollama/pull/17953)) is the most consequential agent-throughput improvement on the horizon — opt in with `OLLAMA_PREFILL_CACHE=1` once 0.34.x ships and benchmark against your current cold-start prefill cost.
- **Version pinning matters more now.** With undocumented per-model Ollama version requirements appearing ([#18414](https://github.com/ollama/ollama/issues/18414)), production deployments should track `ollama show <model>` output and pin to the minimum compatible server version rather than assuming library-page metadata is complete.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-15

## Today's Highlights

The v1.101.0 release ships with cosign-signed Docker images (anchored to commit `0112e5304`), giving operators a stable root of trust for supply-chain verification. Behind that, the project is consolidating three streams in parallel: governance correctness (per-team rate limiting #34140, stale-spend budget errors #27735, tag budgets across pre-call hooks #41218), provider plumbing for SAP/Bedrock/Anthropic/Responses-API, and a multi-region architectural shift (#41221) that lets rate limits enforce across regions via Redis read-only replicas instead of paying a global-Redis hop per request.

## Releases & Breaking Changes

- **v1.101.0** — release notes (https://github.com/BerriAI/litellm/releases/tag/v1.101.0). Headline change: every LiteLLM Docker image is now signed with [cosign](https://docs.sigstore.dev/cosign/overview/) using the key introduced in commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). Operators should verify image provenance on pull.

## New Model & Hardware Support

- **Gemma 4 via the Mantle endpoint** — request #30657 (https://github.com/BerriAI/litellm/issues/30657). The previous Bedrock path (#30264) no longer resolves; a Mantle route needs to be wired in. Open, low comment traffic, 2 👍.
- **OpenAI-compatible `video_url` content for Gemini (Vertex AI / Google AI Studio)** — request #30501 (https://github.com/BerriAI/litellm/issues/30501). Open, not yet implemented.
- **Bedrock runtime's native Responses API for OpenAI models** — PR #38489 (https://github.com/BerriAI/litellm/pull/38489). Author explicitly flags a **merge-ordering dependency on #38388**: landing first opens an authorization gap on a new route. Not yet merged.

## Performance & Optimization

- **Cross-region rate limits via Redis read-only replicas** — PR #41221 (https://github.com/BerriAI/litellm/pull/41221). Today, each region enforces limits against its own Redis, so a key active in two regions effectively gets ~2× its quota; the only alternative is a single global Redis adding a cross-region hop per request. The PR introduces an opt-in replica list so a region can read sibling regions' counters locally, with writes still local. Meaningful latency win for active-active multi-region deployments.

## Stability & Regressions

### Open, high-impact

- **#34281 — Health checks crash hard on offline hosts** (https://github.com/BerriAI/litellm/issues/34281). Ad-hoc HomeLab hosts cause hard failures rather than graceful degradation. 13 comments, no fix PR yet.
- **#27735 — Virtual key `BudgetExceededError` uses stale spend** (https://github.com/BerriAI/litellm/issues/27735). Proxy rejects requests on a team-scoped virtual key while `/key/info` reports spend below the cap. Follow-on to #27639. No fix PR yet.
- **#34140 — v3 rate limiter double-counts `model_per_team` limits** (https://github.com/BerriAI/litellm/issues/34140). Configured RPM/TPM is enforced at half the intended value. 7 comments, no fix PR yet.
- **#20962 — Non-admin users cannot create API keys** (https://github.com/BerriAI/litellm/issues/20962). UI forces team selection; API blocks non-admins from setting `team_id`. Deadlock for `internal_user` role. 5 comments, 6 👍, no fix PR yet.
- **#41187 — `streaming_handler` regression in v1.94.0** (https://github.com/BerriAI/litellm/issues/41187). OpenAI-compatible streams can fail with `'MockValSer' object cannot be converted to 'SchemaSerializer'`, surfacing as 500. Affects self-hosted `hosted_vllm` under load. Fix PR not yet open at time of digest.
- **#41159 — `POST /v1/responses` 500 with raw Python `TypeError` when `input` is omitted** (https://github.com/BerriAI/litellm/issues/41159). Fix: PR #41184 (https://github.com/BerriAI/litellm/pull/41184) returns a 400 and names `input`.
- **#39431 — `/v1/messages` streaming delays `message_start` until thinking finishes** (https://github.com/BerriAI/litellm/issues/39431). Affects adaptive-thinking Bedrock models (e.g. Claude Sonnet 5) even with no fallbacks. Fix PR not yet open.
- **#28216 — `Router.aresponses(stream=True)` bypasses mid-stream fallback** (https://github.com/BerriAI/litellm/issues/28216). `MidStreamFallbackError` is not handled; configured cross-provider fallbacks never fire when the primary stream breaks mid-flight. Fix PR not yet open.
- **#40404 — Router/proxy never tries fallback on abnormally-ended upstream streams** (https://github.com/BerriAI/litellm/issues/40404). Cut, stalled, or malformed chunk tails the request instead of failing over. Fix PR not yet open.
- **#40388 — SAP AI Core streaming terminates early with Pydantic validation** (https://github.com/BerriAI/litellm/issues/40388). Same `MockValSer` failure class. Two PRs in flight: #41222 (sync OpenAI params) and #34900 (normalize SAP stream chunks + cleaner missing-deployment error).
- **#29268 — Docker image still bundles `ddtrace` 2.19.0** (https://github.com/BerriAI/litellm/issues/29268). Breaks `/embeddings` on Python 3.13 when APM tracing is enabled. Long-standing (originally #8744, auto-closed as stale). Fix PR not yet open.
- **#30539 — Responses → Chat bridge forwards `tools: []` and vLLM 422s** (https://github.com/BerriAI/litellm/issues/30539). Tool-less requests send an empty tools array to strict OpenAI-compatible upstreams. Fix PR not yet open.
- **#30008 — Custom redaction tags (`keyword_redaction_tag`, `pattern_redaction_format`) broken since v1.87.1** (https://github.com/BerriAI/litellm/issues/30008). Fix PR not yet open.
- **#27849 — Bulk-invite users get tokens without `sk-` prefix** (https://github.com/BerriAI/litellm/issues/27849). Tokens rejected on every call. Fix PR not yet open.
- **#35599 — `/v1/rag/query` bypasses `vector_store_registry` credential resolution** (https://github.com/BerriAI/litellm/issues/35599). Calls `litellm.vector_stores.asearch()` directly, skipping the credential resolver that the standalone `/v1/vector_stores/{id}/search` uses. Fix PR not yet open.
- **#41176 — `/invitation/new` 400s with misleading "User id does not exist" on fresh API-only deploy** (https://github.com/BerriAI/litellm/issues/41176). No prior UI login. Fix PR not yet open.
- **#17993 — Day-rollover bug in `get_next_standardized_reset_time`** (https://github.com/BerriAI/litellm/issues/17993). Large duration values produce incorrect budget reset times. Stale, no fix PR yet.
- **#30301 — Provider transforms leak LiteLLM-internal `optional_params` into request bodies** (https://github.com/BerriAI/litellm/issues/30301). Strict providers reject the forwarded fields. No fix PR yet.

### Recently closed (fixed or otherwise)

- **#36566 — `litellm_content_filter` evaluations missing from logs and Guardrails Monitor** — closed (https://github.com/BerriAI/litellm/issues/36566).
- **#26552 — `/v1/images/edits` with mask** — closed (https://github.com/BerriAI/litellm/issues/26552).
- **#40548 — `Created By`/`Updated At` columns showing `Unknown`** — closed (https://github.com/BerriAI/litellm/issues/40548).
- **#28444 — Post-API hook not enabled for passthrough endpoints** — closed (https://github.com/BerriAI/litellm/issues/28444).
- **#38401 — Bedrock Realtime session acknowledged before provider readiness** — closed (https://github.com/BerriAI/litellm/issues/38401).
- **#25940 — Langfuse telemetry fails with `AttributeError` in v1.83** — closed (https://github.com/BerriAI/litellm/issues/25940); tracked by SDK-v4 migration PR #36741 (https://github.com/BerriAI/litellm/pull/36741).
- **#41029 — Admin UI full-page reload + 404 prefetch storm on navigation** — closed (https://github.com/BerriAI/litellm/issues/41029).
- **#30035 — Output exceeds size limit (Python 3.13 traceback)** — closed (https://github.com/BerriAI/litellm/issues/30035).

### Notable fix PRs in flight (not yet merged)

- **#41218 — Enforce tag budgets for tags a pre-call hook adds** (https://github.com/BerriAI/litellm/pull/41218). Closes a gap where guardrail-set tags are charged but never blocked.
- **#41092 — A project may only attach to keys of its own team** (https://github.com/BerriAI/litellm/pull/41092). Fixes #41089; previously `_check_project_key_limits` never verified project ownership.
-

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-15

## Today's Highlights

A heavy maintenance day on Unsloth Studio: danielhanchen shipped or opened ~10 PRs aimed at **GPU-downgrade regressions** (CUDA llama-server silently falling back to CPU when nvidia-smi is missing/stale) and **antivirus false-positive hardening** on `install.ps1`/`install.sh`, with a new measurement framework finally able to prove the changes move the needle. On the user-facing side, several Studio UX bugs were filed or fixed around MCP tool loading, Ollama model auto-switch, AMD/ROCm image generation, and a recurring `torch._dynamo` circular import that breaks Z-Image GGUF on Windows.

## Releases & Breaking Changes

*No new tagged releases in the last 24h.*

Notable behavior changes already merged or staged behind PRs:
- **PR #11009** — Compile-cache bundle write moved off the image-generation request path into a background worker; the 37s synchronous write at "100%" is gone.
- **PR #10989** — `diffusers` and friends pre-imported in the post-warm worker.
- **PR #10981** — Closes the `torch._dynamo` partial-init window on the diffusion load path.
- **PR #10783** — New per-model custom llama.cpp INI mode; explicitly **owns** llama.cpp tuning and bypasses Studio's optimizer/startup fallback rewriting.

## New Model & Hardware Support

- **AMD ROCm Docker image** (Issue #6230, closed) — adds a ROCm container variant mirroring the Blackwell image; targets RDNA2/3/4 and CDNA/Instinct.
- **MLX auto-switch on Apple Silicon** (Issue #10951, open) — installed MLX models still 404 on auto-switch unless preloaded.
- **Gemma 4 image input via llama-server** (Issue #10559, closed) — GGUF ubatch-size fix for diffusion-style image inputs.
- **Z-Image GGUF** (Issues #10350, #10963, open) — desktop support broken by `torch._dynamo` circular import on Windows; fix in PR #10981.
- **Ollama-installed models exposed via Studio API** (PR #10763, open) — `_best_model_for_provider` and `_resolve_local_filename` reworked.
- **Per-model llama.cpp INI** (PR #10783, open) — fine-grained, user-owned backend tuning.
- **OpenAI `video_url` content parts** (PR #10439, open) — Studio's `/v1/chat/completions` will accept video parts that currently parse as `UnknownContentPart`.

## Performance & Optimization

- **First-diffusion-load time** (PR #10989) — measured import cost moved into the post-warm worker:
  | Import | Time | RSS |
  |---|---|---|
  | `diffusers` | 1.63 s | 169.8 MB |
  | `diffusers.hooks` | 2.38 s | 104.5 MB |
  | pipeline classes | (measured, table in PR) | — |

  Net effect: first image load no longer pays this on the user-facing request path.

- **Image generation latency** (PR #11009) — `save_async` for the compile-cache bundle; previous inline write blocked "100%" for ~37 s.
- **NVIDIA driver library probing** (PRs #11007, #11008) — `install_llama_prebuilt.py` / `setup.sh` now read the driver libraries directly when `nvidia-smi` is absent, stale, or hangs; fixes GPU-downgrade reports (#10985, #5941 family).
- **Windows CUDA prebuilt selection** (PR #11006) — re-orders by detected DLLs rather than filtering against them; portable fallback now attempted; SM-coverage gate applied to `keep paths`.
- **AV hardening with measurement** (PRs #10992, #10996) — first quantitative baseline: `install.ps1` @ `1ad44677d` hashes to `ec29980b…`, matching VirusTotal verdict. Enables before/after comparison for the six prior hardening passes (#7822, #8586, #6326, #10540, #10560, #10504).

## Stability & Regressions

Ranked by blast radius:

1. **Silent GPU → CPU downgrade on CUDA hosts** (Issue #9255, closed; PR #10994, PRs #11005/11006/11007/11008, open)
   - `install_llama_prebuilt.py` falls back to a source build that compiles without `nvcc`, producing a CPU-only llama.cpp while reporting success. Embeddings and generation lose the GPU with no warning. The PR wave from #10985 restores GPU-precedence, driver-library probing, and `setup.ps1` GPU-prebuilt retention.

2. **`torch._dynamo` partial-init crash on Z-Image GGUF (Windows desktop)** (Issues #10350, #10963; PR #10981)
   - Same trace: `partially initialized module 'torch._dynamo' has no attribute 'utils'`. Fix closes the lazy-submodule window on the diffusion load path.

3. **Docker mounts that lose downloaded models** (Issue #10923, open, 7 comments)
   - Docs say mount `/workspace/work`, but model downloads land elsewhere; users lose state on container restart. Documentation fix, not a code fix.

4. **`--tensor-split` ignored** (Issue #10355, closed) — multi-GPU tensor parallelism argument silently dropped; cost a user "hours" of debugging.

5. **Windows ROCm / Flux import failures** (Issue #8406, open) — text GGUF reaching the diffusion image loader, and `torch.distributed.Work` import failing for Flux on Radeon PRO W7900/W7500 + ROCm 7.13.99004.

6. **MLX model 404 unless preloaded** (Issue #10951, open) — auto-switch resolver returns 404 for installed MLX models; PR #10763's resolver work touches the same code path.

7. **MCP context bloat / truncation** (Issues #10822, #10839, #10997, open) — Notion MCP eats ~61K tokens of a 24 GB-VRAM model's context; separate report of systematic MCP call truncation (suspected dedup).

8. **Studio UX / state divergence** (Issues #10817 closed, #10904 open, #10917 open, #10929 open, #10995 open, #11002 open) — Run-settings sidebar vs model-dropdown drafts disagree silently; misleading error on revoked-HF-but-locally-cached; test collection broken from `studio/backend/tests/` `loggers` stub; Data Recipe worker receiving SIGTERM non-deterministically.

9. **AV false-positive blocking installers** (Issue series #8523, #6326, #6588, #6648, #10540, #10805; PRs #10979, #10986, #10990, #10992, #10994, #10996) — no product/detection/AMSI provider was ever captured; vendors need hashes + detection names for clearance. New telemetry PRs capture both, drop the two fixture archives that vendors were flagging, and stop emitting classifier-readable prose about AV in installers.

10. **Lower-severity** — `#10637` dataset download button (closed), `#10425` Code-tool file previews (closed), `#9649` Ollama Thinking controls (closed), `#10894` audio/image UX (open), `#10983` durable chat runs leaking media URIs (open), `#10699` Codex TUI `stdout is not a terminal` on Windows (open), `#10795` X11 WebKit DMA-BUF fd leak (closed), `#10945-#10947` low-quality/spam reports (closed).

## What This Means for Application Developers

- **Pin your Unsloth Studio version explicitly** if you rely on multi-GPU or any `--tensor-split` semantics; the regression in #10355 and the GPU-downgrade family in #9255/#10985 mean silent perf cliffs are real until the next patch sweep lands. Track PRs #11005–#11008.
- **On Windows + AMD or + Z-Image GGUF**, hold off on `Unsloth Desktop` diffusion loads until #10981 lands — the `torch._dynamo` partial-init trace is deterministic.
- **MCP integrators**: context bloat is the #1 reported pain (#10839, #10997). Lazy tool-loading and a curated MCP hub are both in flight (#10822, #10997) — design your prompts assuming tool schemas are *opt-in*, not default.
- **Ollama + Studio users**: model auto-switch and Thinking/reasoning control have known gaps (#10951, #9649, #10763). If you're routing reasoning workloads through Ollama, verify `reasoning_effort` actually reaches the upstream proxy.
- **Image-generation latency budgets**: the synchronous compile-cache bundle write (~37 s) is being moved off the request path in #11009; if you're timing user-visible "generation done" events in your app, expect a step-change once it ships.
- **Antivirus-aware deploys**: if your enterprise AV quarantines `install.ps1`, capture the **detection name + AMSI provider** before whitelisting; PR #10986 finally instruments this in the installer. Today there is no reliable signal at all.
- **Long-context chat apps**: the "model leaves a self-note before compaction" idea (#10904) is open for 👍 — worth weighing in if you maintain agent memory layers on top of Unsloth Studio.

---

*Data window: GitHub issues/PRs updated in the 24h ending 2026-09-15. Repository: [unslothai/unsloth](https://github.com/unslothai/unsloth).*

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-15

## Today's Highlights

No new releases or pull requests in the last 24 hours, but **issue activity is concentrated on stability regressions introduced (or surfaced) in v3.1.0** — most notably a Windows-only auth loop and a Windows env-escape bug in the wrapper launcher, plus a gateway-level error-masking issue that suppresses upstream `context_length_exceeded` signals and breaks Claude Code's auto-retry/auto-compact behavior. A UI clipping bug in the dashboard heatmap widget is also reported. One discussion thread explores a potential paid "Token Plan" tier for GLM-5.3.

## Releases & Breaking Changes

*No new releases in the last 24h.* The most recent tagged version referenced across the open issues is **v3.1.0** (Desktop, Windows), against which three of today's issues are filed.

## New Model & Hardware Support

- **#1747** — *Discussion only, not a code change*: musistudio is gauging community interest in a token-plan tier targeted at **GLM-5.3**, with stated plans for "specific optimizations for Claude Code and Codex." No backend, quantization, or runtime (CUDA/ROCm/Metal/CPU) implications in this thread. ([#1747](https://github.com/musistudio/claude-code-router/issues/1747))

## Performance & Optimization

*No performance-related PRs or issues in the last 24h.*

## Stability & Regressions

Ranked by user-visible severity:

1. **[Critical] Gateway masks upstream context-length errors → "All target providers failed"** ([#1799](https://github.com/musistudio/claude-code-router/issues/1799))
   CCR's fallback aggregator collapses upstream 400s from vLLM / OpenAI-compatible endpoints (notably `context_length_exceeded`) into a generic `"All target providers failed."` message. As a result, Claude Code CLI does **not** auto-reduce `max_tokens` and does **not** trigger auto-compact — behavior that *does* work against the native Anthropic error format. No fix PR linked.

2. **[High] `autoMode:true` from Claude sessions breaks `apiKeyHelper` on Windows v3.1.0** ([#1798](https://github.com/musistudio/claude-code-router/issues/1798))
   Sessions writing `autoMode: true` into profile settings cause CCR Desktop to sync that flag into the config store and rewrite `settings.json` on every launch. End state: Claude Code reports **"Not logged in"** and ignores `apiKeyHelper`. No fix PR linked. Filed for **Desktop v3.1.0 on Windows, port 3456**.

3. **[Medium] Windows wrapper command double-escapes environment variables** ([#1797](https://github.com/musistudio/claude-code-router/issues/1797))
   Inconsistency between `Ec()` (emits unquoted `set KEY=value`) and `ce()` (emits quoted `set "KEY=value"`) means carets and `%%` survive into the child process env. Concrete symptom: model names containing `()` reach the child as `^(self hosted^)`. Affects **Desktop v3.1.0 on Windows**. No fix PR linked.

4. **[Low] Dashboard activity (token heatmap) bottom rows clipped at wide widget sizes** ([#1800](https://github.com/musistudio/claude-code-router/issues/1800))
   Cosmetic UI regression in `packages/ui/src/pages/home/components/dashboard.tsx` (`OverviewActivityGrid`). Reproducible on `main` and in the Electron app. No fix PR linked.

> Pattern note: issues #1797, #1798, and #1799 all report behavioral defects in the **v3.1.0** Desktop / Windows path, but no PRs or commits have landed against them in the 24h window. Engineering review on this cluster is warranted before further rollout.

## What This Means for Application Developers

- **Don't rely on Claude Code's native context-overflow recovery when traffic flows through CCR today.** Build your own `max_tokens` backoff or surface the raw upstream error to your agent loop until #1799 is fixed, otherwise long-context sessions will hit the catch-all `"All target providers failed."` and stall. ([#1799](https://github.com/musistudio/claude-code-router/issues/1799))
- **If you're on Windows Desktop v3.1.0, pin or downgrade before shipping auth flows.** The `autoMode`/`apiKeyHelper` interaction (#1798) will silently break login on every relaunch, and #1797 will mangle model names containing parentheses — avoid choosing self-hosted model identifiers like `my-org/llama-3.1-8b (q4)` until both are patched. ([#1798](https://github.com/musistudio/claude-code-router/issues/1798), [#1797](https://github.com/musistudio/claude-code-router/issues/1797))
- **Dashboard widgets: hold off on wide layouts** if you're embedding CCR's `OverviewActivityGrid` until the clipping fix in #1800 lands. ([#1800](https://github.com/musistudio/claude-code-router/issues/1800))
- **Track #1747** if you're cost-modeling GLM backends — it's a pricing/plan signal, not a compatibility one, but the mention of Claude-Code/Codex-specific optimizations is a forward-looking indicator of where upstream provider routing is heading. ([#1747](https://github.com/musistudio/claude-code-router/issues/1747))

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-15

## 1. Today's Highlights

CC Switch shows no new release in the last 24 hours, but the codebase is dominated by **Codex integration regressions** (v3.20.0 → v3.20.3) and a coordinated push toward **Google Antigravity** as the official Gemini successor. The most impactful landing PRs focus on proxy correctness (inline `

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-15

*Project: [QuantumNous/new-api](https://github.com/QuantumNous/new-api) — LLM gateway / unified model-serving proxy*

---

## 1. Today's Highlights

The project is deep in the **v1.0.0 release-candidate phase (currently `rc.37`)** with a heavy churn of stability fixes around the streaming/billing relay path. Most notable landing today: PRs [#7395](https://github.com/QuantumNous/new-api/pull/7395), [#7388](https://github.com/QuantumNous/new-api/pull/7388), [#7387](https://github.com/QuantumNous/new-api/pull/7387), [#7389](https://github.com/QuantumNous/new-api/pull/7389), [#7386](https://github.com/QuantumNous/new-api/pull/7386) all addressing cross-protocol conversion, Gemini routing, and tiered-billing memory regressions reported in the last week. **No new tagged release in the last 24h.**

---

## 2. Releases & Breaking Changes

- **No new releases in the last 24h.** Latest referenced build is `v1.0.0-rc.37` (see [#7385](https://github.com/QuantumNous/new-api/issues/7385), [#7392](https://github.com/QuantumNous/new-api/issues/7392)).
- **GA criteria still undefined.** [#7279](https://github.com/QuantumNous/new-api/issues/7279) (👍8, 9 comments) requests the maintainers publish a concrete GA checklist for v1.0.0 — `rc.36` was the trigger. Operators should treat current RC tags as non-production until GA.
- **V1 frontend feedback hub** [#4687](https://github.com/QuantumNous/new-api/issues/4687) (44 comments, closed) is the canonical place to file V1-UI issues; it has now been closed for re-aggregation. [#7145](https://github.com/QuantumNous/new-api/pull/7145) fixed a nav-bar shift on the pricing-sort menu.

---

## 3. New Model & Hardware Support

- **vLLM and SGLang channels** — [#7332](https://github.com/QuantumNous/new-api/pull/7332) adds first-class channel adapters for vLLM and SGLang backends, enabling self-hosted inference as a New-API upstream.
- **Aliyun Bailian TTS** — [#6811](https://github.com/QuantumNous/new-api/pull/6811) implements `/v1/audio/speech` translation to Aliyun Bailian, including voice mapping, speed conversion, and per-character billing.
- **Ollama OpenAI-compatible chat switch** — [#7382](https://github.com/QuantumNous/new-api/pull/7382) lets an Ollama channel be addressed via OpenAI chat-completions semantics on a per-channel basis.
- **DeepSeek CNY→USD balance normalisation** — [#6814](https://github.com/QuantumNous/new-api/pull/6814) closes [#5063](https://github.com/QuantumNous/new-api/issues/5063): channel-balance fetches now correctly store USD by default.

No new hardware backends (CUDA/ROCm/Metal/CPU) or quantization formats reported today.

---

## 4. Performance & Optimization

- **Tiered-billing body-read skip** — [#7395](https://github.com/QuantumNous/new-api/pull/7395) skips reading the entire request body into memory when the tiered expression contains no `param()` call, closing the OOM-class issue [#7394](https://github.com/QuantumNous/new-api/issues/7394) and restoring disk-cache effectiveness. Same fix family as the earlier relay-path OOM [#6949](https://github.com/QuantumNous/new-api/issues/6949).
- **In-memory rate-limiter rewrite** — [#6807](https://github.com/QuantumNous/new-api/pull/6807) replaces the pre-allocated slice with an LRU linked list; this is the structural fix for the GLOBAL_API_RATE_LIMIT OOM [#6732](https://github.com/QuantumNous/new-api/issues/6732) (high `maxRequestNum` previously pinned large buffers even when idle).
- **SSE forward latency** — [#7033](https://github.com/QuantumNous/new-api/pull/7033) removes the one-frame lag in `OaiStreamHandler` (the implementation held `lastStreamData` and only emitted the previous frame on the next tick). First-token latency should now be one upstream frame shorter on every OpenAI-compatible stream; the recorded `FirstResponseTime` metric will shift correspondingly.
- **Cross-protocol stream usage** — [#7389](https://github.com/QuantumNous/new-api/pull/7389) now requests `stream_options.include_usage` on every cross-protocol conversion, fixing billing drift when upstream sends only the terminal usage chunk.
- **Param-override on passthrough path** — [#7346](https://github.com/QuantumNous/new-api/pull/7346) reintroduces channel-level param overrides on the pass-through relay branch (previously silently dropped when `pass_through_body_enabled`).

---

## 5. Stability & Regressions

Ranked by severity/impact. ✅ = fix PR exists or merged.

| Severity | Issue | Description | Fix |
|---|---|---|---|
| 🔴 High | [#6732](https://github.com/QuantumNous/new-api/issues/6732) | Setting `GLOBAL_API_RATE_LIMIT=1000000` → memcg OOM due to pre-sized limiter slices | ✅ [#6807](https://github.com/QuantumNous/new-api/pull/6807) |
| 🔴 High | [#7394](https://github.com/QuantumNous/new-api/new-api/issues/7394) | `tiered_expr` pre-consumes whole request body into memory even when expression never calls `param()`, defeats disk cache, retained until settlement | ✅ [#7395](https://github.com/QuantumNous/new-api/pull/7395) |
| 🔴 High | [#7283](https://github.com/QuantumNous/new-api/issues/7283) | Gemini `:countTokens` path is matched as `generateContent` — no totalTokens, 24–44s latency, billed as generation | ✅ [#7388](https://github.com/QuantumNous/new-api/pull/7388) rejects unknown route |
| 🟠 Med  | [#6822](https://github.com/QuantumNous/new-api/issues/6822) | `/v1/responses` streaming: when upstream `created_at` is float, three snapshot events are dropped, usage lost, billing falls back to estimation | Closed; [#7389](https://github.com/QuantumNous/new-api/pull/7389) hardens related path |
| 🟠 Med  | [#6939](https://github.com/QuantumNous/new-api/issues/6939) | `deepseek-v4-flash` in thinking mode: `400 reasoning_content must be passed back` when reasoning context not echoed | Closed (workaround documented) |
| 🟠 Med  | [#6639](https://github.com/QuantumNous/new-api/issues/6639) | Advanced custom routing + model mapping cannot forward correctly when both are configured | OPEN |
| 🟠 Med  | [#3448](https://github.com/QuantumNous/new-api/issues/3448) | Idle 20–30 min → channel test hangs, external curl returns 500; recovers after one curl | Closed (likely connection-pool reconnect) |
| 🟠 Med  | [#5233](https://github.com/QuantumNous/new-api/issues/5233) | Anthropic via OpenRouter returns persistent region 403; restart fixes | Closed |
| 🟡 Low  | [#7385](https://github.com/QuantumNous/new-api/issues/7385) | `/v1/audio/speech` `stream_format=audio` real-time streaming pass-through not implemented | OPEN |
| 🟡 Low  | [#7393](https://github.com/QuantumNous/new-api/issues/7393) | Dashboard charts drop real time buckets and synthesise 7 fake buckets when fewer than 7 returned | OPEN |
| 🟡 Low  | [#7392](https://github.com/QuantumNous/new-api/issues/7392) | After switching a model from token-based to expression-based pricing, Model Plaza renders all prices as "dynamic" | OPEN |
| 🟡 Low  | [#3255](https://github.com/QuantumNous/new-api/issues/3255) | Claude Code image-upload errors on `v0.11.4-alpha.2` | Closed (out-of-date alpha) |
| 🟡 Low  | [#7087](https://github.com/QuantumNous/new-api/issues/7087) | Responses SSE: missing empty `item` array loses Codex active item | Closed |
| 🟢 Info | [#7146](https://github.com/QuantumNous/new-api/issues/7146) | Add vendor website jump button in channel list | Closed (enhancement) |
| 🟢 Info | [#7010](https://github.com/QuantumNous/new-api/issues/7010) / [#7011](https://github.com/QuantumNous/new-api/issues/7011) | Peak/valley pricing & `weekday()` expression support | Closed (tracked for pricing engine expansion) |

---

## 6. What This Means for Application Developers

- **Use `rc.37+` only behind feature flags.** v1.0.0 is not GA ([#7279](https://github.com/QuantumNous/new-api/issues/7279)). If you depend on accurate streaming billing for `/v1/responses`, codex, or Gemini paths, pin to a release that includes [#7242](https://github.com/QuantumNous/new-api/pull/7242), [#7388](https://github.com/QuantumNous/new-api/pull/7388), [#7389](https://github.com/QuantumNous/new-api/pull/7389), and [#7387](https://github.com/QuantumNous/new-api/pull/7387) — terminal-event billing drift was a real source of revenue leakage.
- **New self-host backends.** You can now wire vLLM and SGLang ([#7332](https://github.com/QuantumNous/new-api/pull/7332)) as channels; this is the most direct path to running open-weight inference behind a single OpenAI-compatible endpoint.
- **TTS surface is growing.** Aliyun Bailian TTS ([#6811](https://github.com/QuantumNous/new-api/pull/6811)) joins existing audio channels; still no real-time audio-streaming relay ([#7385](https://github.com/QuantumNous/new-api/issues/7385) is open).
- **Ollama reliability.** Tool-call drops in streaming ([#7376](https://github.com/QuantumNous/new-api/pull/7376), [#7380](https://github.com/QuantumNous/new-api/pull/7380)) are now fixed — agents relying on Ollama channels for function-calling should upgrade.
- **Operational watch-list for the next 24–48h:** [#6639](https://github.com/QuantumNous/new-api/issues/6639) (route + mapping interaction), [#7392](https://github.com/QuantumNous/new-api/issues/7392) (model-plaza UI mis-renders after pricing-mode switch). If you expose the admin UI to customers, audit before user impact.
- **Memory tuning.** If you previously raised `GLOBAL_API_RATE_LIMIT` to mitigate 429s, verify you've taken [#6807](https://github.com/QuantumNous/new-api/pull/6807) before raising the value further — the previous implementation was the OOM source.

---

*Digest generated from 41 updated issues and 21 updated PRs on 2026-09-15. Sources: [issues](https://github.com/QuantumNous/new-api/issues), [pulls](https://github.com/QuantumNous/new-api/pulls).*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*