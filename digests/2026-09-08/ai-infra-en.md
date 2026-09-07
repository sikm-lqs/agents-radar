# AI Infrastructure Digest 2026-09-08

> Generated: 2026-09-07 16:38 UTC | Projects covered: 9

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

# Cross-Project AI Infrastructure Report — 2026-09-08

## 1. Ecosystem Overview

The inference stack is stratifying into four distinct layers — datacenter serving engines, local runtimes, gateways/routers, and fine-tuning tooling — and today's activity shows each layer racing to absorb the same three shocks: Blackwell-class hardware (SM120/121, B200/B300) whose kernels are not yet determinism-safe, hybrid linear-attention architectures (GDN/DSA-family: DeepSeek-V4, GLM-5.x, Kimi-K3, Qwen3.8), and the OpenAI Responses API becoming the new interop battleground. llama.cpp continues its exceptional release cadence (13 tagged builds in 24h) while both shipping releases today came from the gateway layer (CC Switch v3.20.2, New API v1.0.0-rc.35), confirming that value capture is currently concentrating in routing/billing rather than raw serving. The single most consequential cross-cutting signal: **greedy decoding is not yet trustworthy on newest silicon**, with four projects independently reporting nondeterminism or crashes on the same hardware generation.

## 2. Activity Comparison

*Counts are issues/PRs referenced in today's digests, not full repo stats.*

| Project | Issues referenced | PRs referenced | Release status | Notable severity profile |
|---|---|---|---|---|
| **vLLM** | ~31 | 16 | None | 6 open critical crash-class bugs (SM120/121, MTP, GDN) |
| **SGLang** | ~19 | ~16 | None | 4 high-severity (FP4+EAGLE IMA, HiCache corruption, DP-attention OOM, B300 hang) |
| **llama.cpp** | ~16 | ~20 | **13 builds (b10828–b10840)** | 3 severe open regressions (−42–54% pp, gfx1151 wrong logits, QSA nondeterminism) |
| **Ollama** | ~20 | 11 | None | Consumer-hardware regression cluster (AMD Vulkan, sm_120, MLX Windows) |
| **LiteLLM** | ~15 | 11 | None | Billing/routing correctness focus; 4 high bugs |
| **Unsloth** | ~21 | 12 | None | Studio hardening; install-matrix correctness; Intel Arc B580 still broken |
| **Claude Code Router** | 2 | 1 | None | Quiet day; 2 real integration breaks |
| **CC Switch** | ~19 | ~15 | **v3.20.2** | Codex/Responses interop churn largely resolved |
| **New API** | ~21 | 15 | **v1.0.0-rc.35** | 3 billing-correctness bugs in 24h |

## 3. Model Support Race

- **llama.cpp leads on time-to-architecture.** Spark2_5ForCausalLM shipped same-day (b10828) plus TQ1_0 on Vulkan and `--fuse-qkv` conversion. Ollama follows within days via its llama.cpp bump (#18279, b10760→b10829) — a tight, functioning dependency chain.
- **vLLM/SGLang lead on frontier hardware × frontier model matrix.** vLLM: NVFP4 KV cache prototype at 245K context on a single RTX 5090, DeepSeek-V4 CuTeDSL kernels, FP8 KV on SM100. SGLang: LongCat 2.0 INT8 on Ascend NPU, Intel XPU chunked-prefill coverage, GLM-5.3 reasoning-effort mapping. Both are absorbing Kimi-K3, GLM-5.x, DeepSeek-V4-Flash, and Qwen3.8 — with nearly mirror-image bug portfolios (Kimi-K3 corruption/OOM appears in both trackers, as does the Qwen3.8-Flash-Next-FP8 SM80 incompatibility).
- **Gateways lead on provider/API surface.** New API shipped Wan 3.0 video + Huawei MaaS in flight; CC Switch added Grok-via-xAI-Responses, GitHub Copilot as Codex provider, and multi-key failover; LiteLLM added Hubris and fixed Gemini 3+/4 version detection.
- **Verdict:** no single winner — llama.cpp wins breadth/speed, vLLM/SGLang win frontier serving, and the gateway layer wins upstream coverage. Notably absent from all engines today: GLM-5.3-Flash linear attention still unsupported in vLLM nightly.

## 4. Performance Frontier

| Area | Where the effort is |
|---|---|
| **KV cache** | The largest single investment. vLLM: NVFP4/FP8 KV dtypes, Mooncake lifecycle fixes, Context-Aware Retention RFC for agentic >90% prefix-reuse. SGLang: UnifiedRadixCache/KV-shard refactor, HiCache L3 unified layout (~1.4TB/21M-key scale). Ollama: MLX prefix-cache alignment (fixing 17–27s re-prefill tax). llama.cpp: fighting a −42–54% unified-KV regression. |
| **Kernels/quantization** | llama.cpp's tiled VNNI k-quant matmul (**3–7× CPU**) is the day's biggest single win; Vulkan RMS_NORM fusion (+~4%); CUDA branchless Q4_K/Q5_K unpack. vLLM: batch-invariant persistent matmul configs, PDL. SGLang: proposal to fuse static FP8 activation quant into producer kernels. |
| **Speculative decoding** | Ubiquitous but paying a tax: vLLM quantifies 30–40% batch-throughput loss from EAGLE/MTP prefix-cache last-block recompute; DFlash2+YaRN shows zero reuse on 1.04M-token prompts. SGLang pushes n-gram draft trees; llama.cpp adds MTP graph reuse and model-free suffix decoding; Unsloth is only now requesting acceptance-rate observability. |
| **Batching/scheduling/routing** | vLLM: length-aware batch composition RFC, quadratic-polling fix in CPU offload worker. SGLang: runtime P↔D role switching. Gateway analog: New API's per-channel TTFB timeout with auto-fallback (#7228) — the most operationally significant gateway perf feature in flight. |

## 5. Layer Positioning

| Layer | Projects | Today's posture |
|---|---|---|
| **Datacenter serving engines** | vLLM, SGLang | Head-to-head on Blackwell determinism, PD disaggregation, spec decoding; correctness debt accumulating faster than fixes (vLLM: 6 criticals, 1 in-flight fix) |
| **Local/edge runtime** | llama.cpp → Ollama → Unsloth Studio | llama.cpp is the kernel foundation (13 builds/day); Ollama packages it for consumers; Unsloth Studio adds GUI/model-prep on top — a functioning vertical chain, with today's Spark X2.5 flowing through it |
| **Gateway/router** | LiteLLM, New API, CC Switch, Claude Code Router | Both shipped releases today; focus has shifted from protocol translation to **billing correctness, failover, and Responses-API conformance** |
| **Fine-tuning** | Unsloth (alone) | Studio hardening dominates; core-package work is install-matrix and hardware-gap cleanup (ROCm fused-attention missing for Wan2.2, Arc B580 broken) |

The layers are also visibly coupled through today's bugs: LiteLLM #40132 fixes tool-id mangling *against vLLM/Kimi*; New API #7252 is a tool-call bug *against Ollama*; vLLM's NVFP4 KV waits *on FlashInfer*.

## 6. Trend Signals

1. **Determinism is the new correctness frontier.** Top-k/indexer selection nondeterminism appears independently in vLLM (`persistent_topk`, #54521) and llama.cpp (CUB `DeviceTopK` in QSA, #28497); Ollama and SGLang report Blackwell crashes. Batch-invariance work (vLLM PR #55676) is becoming a first-class feature, not a nicety.
2. **Speculative decoding + prefix caching is the unresolved collision.** Every engine layer reported a bug or measured cost in this seam today. Treat spec-dec as an A/B-testable option, not a default.
3. **The Responses API is the interop battleground.** LiteLLM (prompt-cache loss, unlogged streaming spend), New API (bills zero on `incomplete`), Ollama (rejects `agent_message`), SGLang (`created_at` type drift), CC Switch (400-class provider mismatches) — all in one day. Codex/Claude Code clients are driving this; expect another quarter of churn.
4. **Tool calling remains the #1 application-layer failure surface** — 7+ distinct bugs across six projects (silent drops, mangled parallel calls, parser loops, id sanitization). Client-side validation is mandatory.
5. **Hardware fragmentation is widening faster than validation.** Ascend, XPU, ROCm, MLX, and consumer Blackwell (SM120/121 — the buggiest tier) all active, all with open defects; vLLM temporarily disabled Ascend CI.
6. **Edge/CPU inference is quietly winning** (3–7× matmul, MTP graph caching, WebGPU backward kernels) while datacenter engines fight fires.

**Watchlist for agent developers:** pin engines to known-good images (esp. SGLang v0.5.18-cu130/B300); snapshot and assert on `temperature=0` outputs; reconcile gateway billing against upstream receipts (LiteLLM #29913, New API #7241); normalize `reasoning_effort` client-side (SGLang #33185, #38104); and track PR #55122 (vLLM) + the HiCache/L3 cluster (SGLang) as the leading indicators of when the current correctness debt gets paid down.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-08

## 1. Today's Highlights

The dominant theme across the last 24 hours is **inference determinism and kernel correctness on Blackwell-class hardware (SM120/SM121)**. Multiple high-comment threads target batch-invariant matmul tuning ([#27433](https://github.com/vllm-project/vllm/issues/27433), [PR #55676](https://github.com/vllm-project/vllm/pull/55676)), non-deterministic `persistent_topk` in Qwen3.8-Flash-Next prefill ([#54521](https://github.com/vllm-project/vllm/issues/54521), [PR #55122](https://github.com/vllm-project/vllm/pull/55122)), and DeepSeek-V4-Flash non-determinism that scales with concurrency ([#53257](https://github.com/vllm-project/vllm/issues/53257)). On the infrastructure side, NVFP4 KV cache wiring for SM120 ([#49011](https://github.com/vllm-project/vllm/issues/49011)) and a meaningful `SimpleCPUOffloadWorker` quadratic-polling fix ([PR #55756](https://github.com/vllm-project/vllm/pull/55756)) are landing.

## 2. Releases & Breaking Changes

No new releases in the last 24 hours. Behavior-changing work in flight that may affect upgrade paths:

- **[PR #54835](https://github.com/vllm-project/vllm/pull/54835)** — GPU-less render server (`vllm launch render`) will start honoring model-default reasoning parsers; currently breaks gpt-oss (Harmony) derender. Migration: clients relying on empty `reasoning_parser` should set it explicitly.
- **[PR #55489](https://github.com/vllm-project/vllm/pull/55489)** — Adds `X-KV-Cache-Report-Mode` request header (`incremental` | `full`); body field remains canonical. No breaking change, but proxies that strip headers need updating.
- **[PR #55710](https://github.com/vllm-project/vllm/pull/55710)** — `--quick` and `--max-tokens 0` will be honored as explicit values rather than ignored; operators that relied on default behavior may see new generations.
- **[PR #48240](https://github.com/vllm-project/vllm/pull/48240)** *(closed)* — Rust frontend `POST /init_weight_transfer_engine`, `/start_weight_update`, `/update_weight` lifecycle endpoints (development mode) are being iterated for RL weight transfer.

## 3. New Model & Hardware Support

- **Inkling FP8 e4m3 KV cache on SM100** — [PR #54705](https://github.com/vllm-project/vllm/pull/54705) (RFC [#54704](https://github.com/vllm-project/vllm/issues/54704)) adds opt-in `--kv-cache-dtype fp8` with per-tensor scales; depends on the upstream tml-fa4 `rescale_threshold` fix.
- **NVFP4 KV cache on SM120 (RTX 5090 / RTX PRO 5000)** — [#49011](https://github.com/vllm-project/vllm/issues/49011) reports a working prototype at 245K context on a single 5090 with `unsloth/Qwen3.6-27B-NVFP4`; awaiting FlashInfer kernel wiring in vLLM.
- **DeepSeek-V4 NVIDIA CuTeDSL attention kernels** — [PR #53566](https://github.com/vllm-project/vllm/pull/53566) (5/N in the warmup/de-JIT campaign tracked by [#49349](https://github.com/vllm-project/vllm/issues/49349)).
- **GLM-5.3-Flash `Glm5NextTextLinearAttention`** — [#54062](https://github.com/vllm-project/vllm/issues/54062) reports this architecture is not yet supported in vLLM nightly.
- **Transformers v5 InternVL2 migration** — [#38425](https://github.com/vllm-project/vllm/issues/38425) (good first issue, help wanted).
- **Ascend NPU CI temporarily disabled** — [PR #55379](https://github.com/vllm-project/vllm/pull/55379); step kept commented out for easy re-enable.
- **XPU AWQ gate fix** — [PR #54391](https://github.com/vllm-project/vllm/pull/54391) makes `MoeWNA16Config` work on XPU where `device_capability` is intentionally `None`.

## 4. Performance & Optimization

- **Granite batch-invariant matmul on Ada** — [PR #55676](https://github.com/vllm-project/vllm/pull/55676) adds four tuned BF16 persistent-matmul configs (`BLOCK_M=BLOCK_N=BLOCK_K=64`, 4 warps, 4 stages) covering Granite-4.0-H-350M linear shapes; concrete shapes listed.
- **Avoid quadratic event polling in `SimpleCPUOffloadWorker`** — [PR #55756](https://github.com/vllm-project/vllm/pull/55756) replaces `list.pop(0)`-driven drains and per-step full pending-event scans with `OrderedDict`-based structures; burst completion was previously quadratic in backlog, no-progress polls linear in pending count.
- **Incremental MoE Expert Offloading** — [#38256](https://github.com/vllm-project/vllm/issues/38256) tracks PR [#37190](https://github.com/vllm-project/vllm/pull/37190): pinned-CPU expert weights, fixed-size GPU cache, LFRU + cross-layer prediction; intended to let models exceeding VRAM run on smaller hardware.
- **EAGLE/MTP prefix-cache last-block drop** — [#53670](https://github.com/vllm-project/vllm/issues/53670) quantifies ~1,648-token recompute per hit on a hybrid Qwen3.8 GDN layout, costing 30–40% batch throughput on prefix-reusing speculative workloads.
- **Length-aware batch composition (RFC)** — [#55265](https://github.com/vllm-project/vllm/issues/55265) proposes a largest/smallest interleaving admission policy with experimental evidence and failure cases.
- **Benchmark sweep bounds fix** — [PR #55740](https://github.com/vllm-project/vllm/pull/55740) uses the effective prompt count (last repeated option, hyphenated JSON keys) for `vllm bench sweep serve_workload` initial bounds.
- **PDL enablement for `fusedQKNormRopeKernel`** — [PR #55755](https://github.com/vllm-project/vllm/pull/55755) (lightweight kernel pipeline improvement).
- **Context-Aware KV-Cache Retention API (RFC)** — [#37003](https://github.com/vllm-project/vllm/issues/37003) proposes prioritized evictions for agentic workloads where >90% of tokens are prefix-reused under concurrent load.

## 5. Stability & Regressions

Ranked by comment volume and severity (crashes/correctness first):

| Severity | Issue | Summary | Fix in flight |
|---|---|---|---|
| **Critical (crash)** | [#54521](https://github.com/vllm-project/vllm/issues/54521) | `Qwen3.8-Flash-Next-FP8` non-deterministic greedy decoding on SM121/GB10 once prompt exceeds `indexer_budget`; root cause is `persistent_topk` (5 byte-identical requests → 5 different completions) | [PR #55122](https://github.com/vllm-project/vllm/pull/55122) makes `persistent_topk` deterministic |
| **Critical (crash)** | [#37431](https://github.com/vllm-project/vllm/issues/37431) | Mamba-2 Triton kernels → `cudaErrorIllegalInstruction` on SM121 (DGX Spark) under async scheduling | None in last 24h |
| **Critical (crash)** | [#37754](https://github.com/vllm-project/vllm/issues/37754) | FlashInfer + MTP speculative decoding illegal memory access on SM121 with GQA=16 (Nemotron-3-Super-120B-A12B-NVFP4); Triton backend works | None |
| **Critical (crash)** | [#53726](https://github.com/vllm-project/vllm/issues/53726) | Silent CUDA IMA (exit 0) in hybrid GDN + MTP k=3 + async scheduling on RTX 3090; persists through prior fix classes | None |
| **Critical (crash)** | [#55571](https://github.com/vllm-project/vllm/issues/55571) | Xid 13 / CUDA illegal memory access on RTX PRO 5000 (SM120) under sustained FP8 load; resolves with `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` or `--enforce-eager` | None |
| **Critical (crash)** | [#49896](https://github.com/vllm-project/vllm/issues/49896) | DeepSeek-V4 on SM12x: NaN MQA logits → `top_k_per_row_prefill` emits uninitialized smem as indices → illegal memory access | None |
| **High (correctness)** | [#46710](https://github.com/vllm-project/vllm/issues/46710) | `DeepSeekV4-Flash` produces incorrect output with inline system messages after PR #46025 when `preserved in-place` | None |
| **High (correctness)** | [#54318](https://github.com/vllm-project/vllm/issues/54318) | `Qwen3.8-Flash-Next-FP8` won't start on 4× A100 because `fp8e4nv` is unsupported on SM80 | None (expected hardware gap) |
| **High (hang)** | [#52907](https://github.com/vllm-project/vllm/issues/52907) *(closed)* | Multi-node startup deadlock in `in_the_same_node_as()` gloo barrier at 2 nodes × TP-16 with Ray executor (regression between 0.26.1rc1.dev78 and .dev148); 30-min timeout | Closed — fix landed |
| **High (silent corruption)** | [#52627](https://github.com/vllm-project/vllm/issues/52627) | Kimi-K3 intermittent silent output corruption in 1P1D NIXL Direct-PD with MooncakeStoreConnector + NixlConnector via MultiConnector; NIXL-only PD OK | None |
| **High (correctness)** | [#53488](https://github.com/vllm-project/vllm/issues/53488) | `prompt_logprobs` silently corrupted for some requests under MTP speculative decoding (Qwen3.5-family, chunked prefill) | None |
| **High (correctness)** | [#53257](https://github.com/vllm-project/vllm/issues/53257) | DeepSeek-V4-Flash non-deterministic output at temperature=0; rate scales with concurrency | [PR #55122](https://github.com/vllm-project/vllm/pull/55122) partially relevant |
| **High (correctness)** | [#54094](https://github.com/vllm-project/vllm/issues/54094) | DFlash2 + YaRN 1.04M identical prompt: zero prefix-cache reuse; target-only reuses ~1.039M tokens | None |
| **High (perf regression)** | [#53670](https://github.com/vllm-project/vllm/issues/53670) | EAGLE/MTP prefix-cache last-block drop — 30–40% throughput loss on prefix-reusing workloads | None |
| **Medium (livelock)** | [#49210](https://github.com/vllm-project/vllm/issues/49210) | Engine core livelock (100% CPU, no crash) with MTP + xgrammar; regression from v0.24.0 | None |
| **Medium (correctness)** | [#39056](https://github.com/vllm-project/vllm/issues/39056) | vLLM 0.19 may lose tool calls for `Qwen3.5-35B-A3B-FP8` when XML tool_call is emitted inside `<think>` with `--reasoning-parser qwen3 --tool-call-parser qwen3_coder` | None |
| **Medium (load failure)** | [#52735](https://github.com/vllm-project/vllm/issues/52735) *(closed)* | `OffloadingConnector` stores but never serves when MTP/EAGLE is enabled on hybrid GDN model (XPU) | Closed — fix landed; related **[PR #50984](https://github.com/vllm-project/vllm/pull/50984)** reports failed Mooncake remote KV loads to the scheduler instead of stranding requests |
| **Medium (correctness)** | [#55250](https://github.com/vllm-project/vllm/issues/55250) | DFlash2 draft gets 0% acceptance with `--dtype float16` on XPU (bf16 works); Qwen3.8-27B + incoai/Qwen3.8-27B-DFlash2 | None |
| **Medium (feature bug)** | [#54906](https://github.com/vllm-project/vllm/issues/54906) | `thinking_token_budget` ignored by Model Runner V2 with Qwen3.8 NVFP4 + MTP | None |
| **Medium (UX)** | [#36456](https://github.com/vllm-project/vllm/issues/36456) | Local GGUF path fails with "architecture qwen35 is not supported yet" even when `--hf-config-path` is provided | None |
| **Low (logging)** | [#48745](https://github.com/vllm-project/vllm/issues/48745) | Spurious `EngineDeadError` traceback during graceful shutdown | None |

Two important **engine-lifecycle bugfixes** landed today:
- **[PR #50984](https://github.com/vllm-project/vllm/pull/50984)** — Mooncake: report failed remote KV loads to the scheduler so requests leave `WAITING_FOR_REMOTE_KVS` instead of stranding and stalling the D node under traffic. Fixes [#50719](https://github.com/vllm-project/vllm/issues/50719).
- **[PR #55290](https://github.com/vllm-project/vllm/pull/55290)** — EC CPU connector: fail the request, not the engine, when a remote encoding can't arrive. Under sustained multimodal load with `ECCPUConnector`, decode instances were losing their EngineCore within ~40s.

## 6. What This Means for Application Developers

- **Don't trust `temperature=0` yet on Blackwell-class or hybrid GDN models.** Multiple independent reports — Qwen3.8-Flash-Next-FP8 on SM121 ([#54521](https://github.com/vllm-project/vllm/issues/54521)), DeepSeek-V4-Flash on B300 ([#53257](https://github.com/vllm-project/vllm/issues/53257)), and DeepSeek-V4 on SM12x via NaN logits ([#49896](https://github.com/vllm-project/vllm/issues/49896)) — describe output divergence that worsens with concurrency. For reproducible agent loops, snapshot outputs and assert or run on Triton/eager backends as a stopgap. [PR #55122](https://github.com/vllm-project/vllm/pull/55122) is the upstream path.
- **Speculative decoding + prefix caching has a real throughput cost.** [#53670](https://github.com/vllm-project/vllm/issues/53670) reports 30–40% batch-throughput loss on prefix-reusing workloads with EAGLE/MTP enabled due to last-block recompute. If your agent workload reuses system prompts or tool schemas across requests, A/B test with speculative decoding off before assuming it's a free win.
- **DFlash2 + YaRN currently gives zero prefix-cache reuse** for identical 1.04M prompts ([#54094](https://github.com/vllm-project/vllm/issues/54094)). Long-context speculative drafts are not yet cache-friendly; budget for redundant prefill.
- **KV-cache connector reliability matters for PD deployments.** The Mooncake fix ([PR #50984](https://github.com/vllm-project/vllm/pull/50984)) changes request lifecycle behavior — requests now fail fast instead of hanging. If you have alerting on "request abandoned," expect a transient spike after upgrade. Also note Kimi-K3 silent corruption with MultiConnector ([#52627](https://github.com/vllm-project/vllm/issues/52627)) — prefer NIXL-only PD until fixed.
- **Reasoning/tool-call parsing on Qwen3.x has sharp edges.** XML tool calls emitted inside `<think>` blocks can be silently dropped ([#390

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-08

## Today's Highlights

- **HiCache & UnifiedRadixCache hardening is the dominant theme.** A cluster of fix PRs landed today addressing side-pool allocator routing ([#38350](https://github.com/sgl-project/sglang/pull/38350)), SWA-only failure modes ([#38348](https://github.com/sgl-project/sglang/pull/38348), [#38349](https://github.com/sgl-project/sglang/pull/38349)), external-linker crash recovery ([#38352](https://github.com/sgl-project/sglang/pull/38352)), and Mooncake direct-linker partial-batch handling ([#38347](https://github.com/sgl-project/sglang/pull/38347)) — reflecting real production pain in large-tier deployments (DeepSeek-V4-Flash, GLM-5.x).
- **DSA-family models + speculative decoding remain the top bug source.** New reports include an OOM in DFLASH/DSPARK draft KV under DP attention ([#38202](https://github.com/sgl-project/sglang/issues/38202)), an FP4 + EAGLE illegal memory access on B200/B300 ([#30209](https://github.com/sgl-project/sglang/issues/30209)), and a HiCache host-tier corruption on GLM-5.3-Flash ([#38031](https://github.com/sgl-project/sglang/issues/38031)). The KV-shard-with-sequence-split refactor ([#30501](https://github.com/sgl-project/sglang/pull/30501), [#38356](https://github.com/sgl-project/sglang/pull/38356)) is progressing as the foundational fix path.
- **Latent regressions hitting production users.** Several open bugs from recent releases — `created_at` int/float divergence in `/v1/responses` ([#34716](https://github.com/sgl-project/sglang/issues/34716)), reasoning-effort one-level-off mapping on DeepSeek-V4-Flash ([#33185](https://github.com/sgl-project/sglang/issues/33185)), and a zombie-request flood on streaming client disconnect ([#36333](https://github.com/sgl-project/sglang/issues/36333)) — are still unaddressed.

## Releases & Breaking Changes

_No releases in the last 24h._

## New Model & Hardware Support

- **LongCat 2.0 INT8 on Ascend NPU** (4-node Atlas 800I A3) — closed/inactive tracking issue [#30224](https://github.com/sgl-project/sglang/issues/30224).
- **Intel XPU 2026Q2 roadmap** — closed tracking issue [#24922](https://github.com/sgl-project/sglang/issues/24922); chunked-prefill scenario coverage with UTs continues in [#33804](https://github.com/sgl-project/sglang/pull/33804).
- **Ray metric backend** for `ServerArgs.stat_loggers` (Grafana dashboards under Ray Serve LLM) — PR [#31415](https://github.com/sgl-project/sglang/pull/31415).
- **Multi-modal: opaque type removal** in `sglang-server` mirroring the Python multiplexer cleanup — PR [#38095](https://github.com/sgl-project/sglang/pull/38095).
- **Mapping OpenAI/Anthropic `reasoning_effort` names** to template-declared levels (e.g. GLM-5.3 allowlist `low|high|max`) — PR [#37977](https://github.com/sgl-project/sglang/pull/37977).

## Performance & Optimization

- **KV Cache Shard with Sequence Split** — the Blackwell-targeted refactor continues; PR [#30501](https://github.com/sgl-project/sglang/pull/30501) lays the seam and [#38356](https://github.com/sgl-project/sglang/pull/38356) (1/4) moves logical-page placement onto `UnifiedRadixCache`.
- **Unified Full KV Cache Layout in L3** — PR [#33651](https://github.com/sgl-project/sglang/pull/33651) restructures HiCache L3 naming around the unified layout.
- **MTP / EAGLE / DSpark draft KV caches in the external linker** — PR [#37914](https://github.com/sgl-project/sglang/pull/37914) (7/N of Unified Cache).
- **Fuse static FP8 activation quantization into producer kernels** (norm / activation / allreduce epilogue) — proposal [#31504](https://github.com/sgl-project/sglang/issues/31504); motivated by `modelopt_fp8` / `modelopt_mixed` checkpoints (Nemotron, Llama, Qwen) where standalone `_static_quant_fp8` is launched before every FP8 GEMM on Qwen3.5-397B-A17B-NVFP4-V2.
- **Hopper: TRTLLM allreduce fusion fp32 accumulation** parity with MNNVL backends — issue [#34603](https://github.com/sgl-project/sglang/issues/34603).
- **N-gram speculative decoding roadmap** — [#21052](https://github.com/sgl-project/sglang/issues/21052) lays out BFS-trie draft token trees with recency / priority-queue ranking.
- **Prefill↔Decode runtime role switching (mori backend)** — PR [#28403](https://github.com/sgl-project/sglang/pull/28403) addresses rebalancing P:D ratio without tearing down servers.
- **Rust TreeCore hardening & CI parity** — PR [#37303](https://github.com/sgl-project/sglang/pull/37303) closes correctness gaps (stale-node panic poisoning, SWA prefetch window rules).

## Stability & Regressions

Ranked by potential blast radius in production:

| Severity | Issue | Summary | Fix PR |
|---|---|---|---|
| **High** | [#30209](https://github.com/sgl-project/sglang/issues/30209) | `nvidia/GLM-5.2-NVFP4` + EAGLE crashes with `CUDA error: illegal memory access` in FlashInfer TRTLLM bf16 batched-GEMM (`nextn` draft MoE) on B200/B300. Triton nextn path is HIP-gated after #30137. | None linked |
| **High** | [#38031](https://github.com/sgl-project/sglang/issues/38031) | GLM-5.3-Flash (DSA) HiCache host-tier load-back corrupts generation without speculative decoding: dropped tool calls, degenerate repetition loops (8×H100, TP8). | None linked |
| **High** | [#38202](https://github.com/sgl-project/sglang/issues/38202) | DFLASH/DSPARK draft KV pool budget uses `tp_size` instead of `attn_tp_size` → OOM under DP attention in Kimi-K3. | None linked |
| **High** | [#38300](https://github.com/sgl-project/sglang/issues/38300) | TP2 hang with HiCache + breakable prefill CUDA graphs + FlashInfer MNNVL on B300 (`v0.5.18-cu130`, FlashInfer 0.6.17). | None linked |
| **Medium** | [#29857](https://github.com/sgl-project/sglang/issues/29857) | v0.5.14: EAGLE/MTP on hybrid GDN (Qwen3.6-27B NVFP4) leaves ~50 GB VRAM idle, KV-pool token capacity capped. | None linked |
| **Medium** | [#36333](https://github.com/sgl-project/sglang/issues/36333) | Disconnected streaming client leaves zombie request that decodes to `max_tokens` and floods `state was deleted in TokenizerManager` (regression from #34160 revert). | None linked |
| **Medium** | [#34974](https://github.com/sgl-project/sglang/issues/34974) | `--enable-eplb` + DSPARK crash during draft CUDA graph capture: `on_select_experts scatter_add_` dimension mismatch (`layer_idx=None`). | None linked |
| **Medium** | [#33185](https://github.com/sgl-project/sglang/issues/33185) | DeepSeek-V4-Flash-0731: `reasoning_effort` mapped one level off — `high` is a no-op, vendor `max` unreachable (still present in v0.5.16 + main). | [#37977](https://github.com/sgl-project/sglang/pull/37977) in flight |
| **Medium** | [#38291](https://github.com/sgl-project/sglang/issues/38291) | `fp8e4nv` not supported on A100 (SM80) when serving Qwen3.8-Flash-Next-FP8. | None linked |
| **Low** | [#38183](https://github.com/sgl-project/sglang/issues/38183) | `transformers` pin 5.12.1 incompatible with main — `import sglang` fails on both sides of the version line. | None linked |
| **Low** | [#38104](https://github.com/sgl-project/sglang/issues/38104) | `--default-chat-template-kwargs` with `reasoning_effort` silently overrides the per-request value. | None linked |
| **Low** | [#34716](https://github.com/sgl-project/sglang/issues/34716) | `/v1/responses` `created_at` is float in streaming events but int in non-streaming responses. | None linked |
| **Low** | [#33385](https://github.com/sgl-project/sglang/issues/33385) | `DeepSeekV4TokenToKVPool` (SWA/HiSparse) has no `get_cpu_copy()` → decode-mode retract crashes with `NotImplementedError` (offload is unconditional, not gated on `--disaggregation-decode-enable-offload-kvcache`). | None linked |
| **Low** | [#34572](https://github.com/sgl-project/sglang/issues/34572) | PP disaggregated prefill hang: bootstrap queue history diverges across stages under abort storms. | None linked |
| **Low** | [#35252](https://github.com/sgl-project/sglang/issues/35252) | MoE tuner writes `int4_w4a16` config files that the runtime never reads. | None linked |

CI tracker ([#17050](https://github.com/sgl-project/sglang/issues/17050)) shows 2 broken, 13 flaky, 958 recently fixed — healthy enough to ship but the two persistent breakages should be monitored before pinning to current `main`.

## What This Means for Application Developers

- **If you serve DSA-family models (DeepSeek-V4-Flash, GLM-5.2/5.3, Kimi-K3) with speculative decoding**, pin a known-good image rather than `main`. The combination of EAGLE/MTP + HiCache + DP attention surfaces the worst class of bugs (OOM, corruption, illegal memory access). Track v0.5.18-cu130 specifically — [#38300](https://github.com/sgl-project/sglang/issues/38300) is a current image-level regression on B300.
- **Reasoning-effort API quirks to handle client-side.** Both the level-mapping bug on DeepSeek-V4-Flash ([#33185](https://github.com/sgl-project/sglang/issues/33185)) and the `--default-chat-template-kwargs` silent override ([#38104](https://github.com/sgl-project/sglang/issues/38104)) mean that if you are routing between vendor-specific and OpenAI-style effort levels, your gateway should normalize and explicitly verify per-request. PR [#37977](https://github.com/sgl-project/sglang/pull/37977) will help once merged.
- **`/v1/responses` clients must accept either `int` or `float` for `created_at`** in streaming vs non-streaming modes — [#34716](https://github.com/sgl-project/sglang/issues/34716).
- **Streaming disconnect handling is currently buggy on the server side.** Disconnected clients may leave requests that decode to `max_tokens` and spam error logs ([#36333](https://github.com/sgl-project/sglang/issues/36333)). Use short `max_tokens` ceilings and aggressive client-side timeouts as a mitigation until the server-side fix lands.
- **HiCache L3 is becoming production-shaped.** With external-linker crash handling ([#38352](https://github.com/sgl-project/sglang/pull/38352)), Mooncake direct-linker partial-load recovery ([#38347](https://github.com/sgl-project/sglang/pull/38347)), and namespace-scoped L3 keys ([#37058](https://github.com/sgl-project/sglang/pull/37058)) landing together, multi-tier prefix-cache deployments at the ~1.4TB / 21M-key scale are moving toward safe-by-default operation. Plan gateway-side key namespacing (`cache_salt` / `extra_key`) if you haven't already.
- **Intel XPU and Ray Serve LLM pathways maturing.** If you are evaluating non-NVIDIA hardware or Ray-based orchestration, the chunked-prefill XPU coverage ([#33804](https://github.com/sgl-project/sglang/pull/33804)) and Ray metrics backend ([#31415](https://github.com/sgl-project/sglang/pull/31415)) are worth a pilot in the next sprint.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-08

## Today's Highlights
Today's cut leans heavily on **backend breadth**: a 3–7× CPU `mul_mat` speedup lands via tiled VNNI k-quants (#27851), the Vulkan path gains RMS_NORM fusion (+~4% on gemma4), TQ1_0 support and aligned `GET_ROWS`, while CUDA gets branchless Q4_K/Q5_K unpack with L2 prefetch on DGX Spark and a divergent-barrier fix in f16 flash attention. On the model side, **Spark2_5** causal LM support lands (#27868) and a long-standing GDN normalization bug (`max` → `rsqrt`) is corrected (#28068). Correctness is still bleeding: a unified-KV prompt-processing regression (-42–54% on the 2nd long request, #28495), a Vulkan suballocation cliff at 131k context (#27734), and a Ryzen AI Max `gfx1151` wrong-logits bug (#28211) are all open and impacting production.

## Releases & Breaking Changes
A burst of commits landed in the **b10828–b10840** range over the last 24h. Notable versioned changes:

- **b10840** ([#26705](https://github.com/ggml-org/llama.cpp/pull/26705)) — CUDA branchless Q4_K/Q5_K unpack in `mmvq` + L2 prefetch on DGX Spark; expect improved batched quant throughput.
- **b10839** ([#28253](https://github.com/ggml-org/llama.cpp/pull/28253)) — Vulkan: `GET_ROWS` now type-aligned; falls back to CPU when offsets violate `minStorageBufferOffsetAlignment`. Behavior change for misaligned offset tensors (was an assert).
- **b10837** ([#28511](https://github.com/ggml-org/llama.cpp/pull/28511)) — Capability checker re-evaluates typed content when templates check strings.
- **b10835** ([#27870](https://github.com/ggml-org/llama.cpp/pull/27870)) — CUDA flash attention: divergent barrier fix + duplicate metadata setup removed.
- **b10834** ([#28387](https://github.com/ggml-org/llama.cpp/pull/28387)) — Backend inputs may now opt out of creating another split.
- **b10833** ([#28024](https://github.com/ggml-org/llama.cpp/pull/28024)) — Vulkan RMS_NORM fusion: `RMS_NORM(+MUL+ADD(+MUL))` and `RMS_NORM+VIEW+SET_ROWS`; `ROPE+VIEW+SET_ROWS` extended for IMROPE.
- **b10831** ([#27765](https://github.com/ggml-org/llama.cpp/pull/27765)) — Vulkan TQ1_0 quantization support.
- **b10830** ([#22780](https://github.com/ggml-org/llama.cpp/pull/22780)) — New HF→GGUF conversion flag `--fuse-qkv` to fuse Q/K/V projections.
- **b10829** ([#28068](https://github.com/ggml-org/llama.cpp/pull/28068)) — **Correctness fix**: GDN q/k normalization switched from `max` to `rsqrt(x*x + eps)` (flash-linear-attention spec). Users evaluating gated-delta-net models should re-run quality tests; previously cached weights aren't invalidated but eval results may shift.
- **b10828** ([#27868](https://github.com/ggml-org/llama.cpp/pull/27868)) — Spark2_5 causal LM architecture added.

## New Model & Hardware Support
- **New architectures**: Spark2_5ForCausalLM ([#27868](https://github.com/ggml-org/llama.cpp/pull/27868)).
- **New quant formats**: TQ1_0 fully supported on Vulkan ([#27765](https://github.com/ggml-org/llama.cpp/pull/27765)) — mm, mat-vec, mat-vec-id, dequant, get_rows; constants packed into 32-bit.
- **Conversion tooling**: `--fuse-qkv` for HuggingFace→GGUF ([#22780](https://github.com/ggml-org/llama.cpp/pull/22780)) — useful for memory-mapped Q/K/V reuse and slightly smaller files.
- **WebGPU**: Backward kernels added ([#28269](https://github.com/ggml-org/llama.cpp/pull/28269)) — first step toward browser-only finetuning.
- **Metal**: Multi-GPU selection fix — one backend device per physical GPU, with cross-device copy guard for Intel Mac + eGPU configs ([#28568](https://github.com/ggml-org/llama.cpp/pull/28568)).
- **CPU**: Tiled `mul_mat` for k-quants via VNNI ([#27851](https://github.com/ggml-org/llama.cpp/pull/27851)) — **3–7× faster CPU matmul** with 256×256 int8 windows; a major CPU-side win.
- **DGX Spark / DGX-class GPUs**: CUDA L2 prefetch tuning (#26705).

## Performance & Optimization
- **CPU `mul_mat` (k-quants)**: 3–7× via tiled VNNI implementation ([#27851](https://github.com/ggml-org/llama.cpp/pull/27851)).
- **CUDA `mmvq` (Q4_K/Q5_K)**: Branchless unpack stops re-executing scale decode per column; benefits scale with batch size > 1 ([#26705](https://github.com/ggml-org/llama.cpp/pull/26705)).
- **CUDA flash attention**: Divergent barrier fix removes a likely silent perf/correctness cliff for f16 ([#27870](https://github.com/ggml-org/llama.cpp/pull/27870)).
- **Vulkan RMS_NORM fusion**: ~4% end-to-end on gemma4 ([#28024](https://github.com/ggml-org/llama.cpp/pull/28024)).
- **MTP speculative decoding (CUDA)**: Reuse single graph across alternating shapes via cache key separation — eliminates repeated graph capture ([#28549](https://github.com/ggml-org/llama.cpp/pull/28549)).
- **qwen4exp QSA decode**: Gather-based sparse attention — top-2048 indexer picks now actually skip cells instead of just masking ([#28213](https://github.com/ggml-org/llama.cpp/pull/28213)).
- **CUDA MoE MMQ**: N-tile sizing adapted to typical expert width on RDNA3 ([#28552](https://github.com/ggml-org/llama.cpp/pull/28552)).
- **mtmd (multimodal) encoder**: CLIP context now routes through `CPU_REPACK` extra-buffer fast path ([#28563](https://github.com/ggml-org/llama.cpp/pull/28563)).
- **Suffix decoding**: Initial model-free spec-dec implementation ([#26283](https://github.com/ggml-org/llama.cpp/pull/26283)) — online tree built from matched suffix; wins scale with match length.
- **Krea Vulkan / Flash Attention**: Optimization series ([#27494](https://github.com/ggml-org/llama.cpp/pull/27494)) continues to land.

## Stability & Regressions
Ranked by likely production impact:

1. **Unified-KV prompt-processing collapse (-42 to -54%)** ([#28495](https://github.com/ggml-org/llama.cpp/issues/28495)) — `--np 2 --kv-unified` with long sequential requests on CUDA/HIP. Root cause identified: flash-attention kernels skip only KQ mask *tails* (`KV_max`), not interior all-`-INF` blocks. **No fix PR yet.**
2. **Vulkan suballocation cliff at 131k context (~78% decode loss)** ([#27734](https://github.com/ggml-org/llama.cpp/issues/27734)) — fixed by setting `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`; default 1 GiB fragments on RDNA3.
3. **HIP/ROCm wrong logits on `gfx1151` (Strix Halo) when prompt > n_ubatch** ([#28211](https://github.com/ggml-org/llama.cpp/issues/28211)) — not a crash; silent corruption. **No fix yet.**
4. **qwen4exp severe decode slowdown beyond ~1k context on HIP/gfx1151** ([#27856](https://github.com/ggml-org/llama.cpp/issues/27856)) — **closed** (likely fixed in recent Vulkan/HIP changes).
5. **qwen4exp QSA indexer nondeterminism (CUDA)** ([#28497](https://github.com/ggml-org/llama.cpp/issues/28497)) — CUB `DeviceTopK` over tied block scores picks different cells per run. **No fix yet.**
6. **Vulkan on Intel iGPU/i915: kernel watchdog silently cancels submissions** ([#27634](https://github.com/ggml-org/llama.cpp/issues/27634)) — embeddings collapse with no error message.
7. **Vulkan RX 9070 XT (gfx1201) 5–7× slower than HIP for hidden_size ≥ 4096** ([#26663](https://github.com/ggml-org/llama.cpp/issues/26663)) — ~100 GB/s effective bandwidth.
8. **`--lazy-mode auto` halves `pp512` for qwen4exp on Vulkan (AMD iGPU)** ([#28160](https://github.com/ggml-org/llama.cpp/issues/28160)) — regression after #27837. **No fix yet.**
9. **`--tensor-split` intermittent output degeneration on long-context MoE** ([#28185](https://github.com/ggml-org/llama.cpp/issues/28185)) — reproducible via raw API calls, independent of client.
10. **MTP Qwen3.6 27B repeated `////`** ([#23577](https://github.com/ggml-org/llama.cpp/issues/23577)) — eval corruption after long sessions.
11. **Gemma 4 31B + MTP crash (`fattn.cu:579`)** when editing system message with `-sm tensor` ([#24440](https://github.com/ggml-org/llama.cpp/issues/24440)).
12. **Blackwell GGML-CUDA SOFT_MAX crash (RTX 5090)** ([#25060](https://github.com/ggml-org/llama.cpp/issues/25060)) — patch proposed by non-maintainer.
13. **GLM-5.2 same-KV-type enforced despite no V cache** ([#26382](https://github.com/ggml-org/llama.cpp/issues/26382)) — `-ctk q5_1` propagates incorrectly.
14. **Anthropic `/v1/messages` drops `id_slot` slot pin** ([#28554](https://github.com/ggml-org/llama.cpp/pull/28554) — fix PR open).
15. **Server: `tool_choice: "required"` accepted but not enforced on `supports_preserve_reasoning=true` templates** ([#27217](https://github.com/ggml-org/llama.cpp/issues/27217)).
16. **Parallel `tool_calls` mangled/hung on Qwen with ~48 optional params** ([#28522](https://github.com/ggml-org/llama.cpp/issues/28522)).
17. **Qwen3.5 9B emits XML tool calls inside `<thinking>` blocks** ([#20837](https://github.com/ggml-org/llama.cpp/issues/20837)) — high comment count, chat-template edge case.

Already addressed today: **GDN normalization bug** ([#28068](https://github.com/ggml-org/llama.cpp/pull/28068)) and the **`fattn.cu:579` flash-attention divergent barrier** ([#27870](https://github.com/ggml-org/llama.cpp/pull/27870)).

## What This Means for Application Developers
- **Rerun GDN-model evals after upgrading to b10829+.** The `max` → `rsqrt` fix will shift quality scores for any gated-delta-net architecture; cache any "ground truth" baselines generated against older builds.
- **If you serve with `--kv-unified` on multi-slot CUDA, pin workloads until #28495 is resolved** — your 2nd concurrent long-context request is paying 40–50% pp latency silently.
- **Long-context Vulkan (RDNA3) on Windows: set `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`** for contexts ≥ 128k; otherwise expect ~78% decode loss at the 131k boundary.
- **CPU-only deployments get a major win from #27851** — tiled k-quant `mul_mat` with VNNI is a free 3–7× for any quantized workload; no migration needed, just rebuild.
- **MTP speculative decoding on CUDA is now graph-cached** ([#28549](https://github.com/ggml-org/llama.cpp/pull/28549)) — expect lower first-token variance and better steady-state throughput for Qwen3.6 MTP and similar.
- **If you build tool-calling agents against Qwen**, watch for #27217 (slot pin lost on Anthropic API path) and #28522 (parallel `tool_calls` mangling); apply the fix PR #28554 for `/v1/messages` slot handling.
- **Spark2_5 is now servable** through `llama-server`; if you're evaluating Alibaba Spark models, you can drop them into existing pipelines.
- **WebGPU finetuning** ([#28269](https://github.com/ggml-org/llama.cpp/pull/28269)) is experimental but signals a future where browser-only personalization is viable — useful for privacy-sensitive agentic apps.
- **HF→GGUF conversion**: the new `--fuse-qkv` flag ([#22780](https://github.com/ggml-org/llama.cpp/pull/22780)) produces tighter packed weight files for models with separate Q/K/V projections — bake into your model import pipeline.

---
*Sources: github.com/ggml-org/llama.cpp — releases b10828–b10840, 30 most-commented issues, 20 most-commented PRs in the 24h window ending 2026-09-08.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-08

## Today's Highlights

Activity in the Ollama repo concentrated on three fronts: landing **MLX runner context-management fixes** (a cluster of PRs around `num_ctx`, static YaRN, and prefix-cache alignment), adding support for the new **Spark X2.5 architecture** via a llama.cpp bump, and a wave of **hardware regressions** — notably Vulkan/AMD, Blackwell sm_120 flash-attention, and an MLX compile-cache log-spam issue on Windows. No new tagged release was published in the last 24h.

## Releases & Breaking Changes

No new releases in the last 24h.

## New Model & Hardware Support

- **Spark X2.5 architecture (SparkLLM/Spark-X2.5-4B / -1.7B, 1M context)** — `spark2_5` is requested and arriving. Issue [#18195](https://github.com/ollama/ollama/issues/18195) (👍 6) tracks native support, and [#18290](https://github.com/ollama/ollama/issues/18290) (the library-tag request) was closed as a duplicate. PR [#18279](https://github.com/ollama/ollama/pull/18279) bumps vendored llama.cpp `b10760 → b10829` to pick up the upstream arch support.
- **Tencent Hy4 preview** — requested in [#18287](https://github.com/ollama/ollama/issues/18287); no GGUF artifacts attached yet.
- **AMD ROCm gfx1200 (RX 9060 XT)** — first-time hardware show-up: issue [#17782](https://github.com/ollama/ollama/issues/17782) reports `Could not load "TensileLibrary_lazy_gfx1200.dat"` after a few minutes of running `qwen3.8:27b`. Useful signal that Ollama is reaching wider consumer-AMD parts.
- **NVIDIA Blackwell sm_120 (RTX 5070 Ti Laptop)** — newly exercised via `qwen3-coder:30b`; see the regression in [#18276](https://github.com/ollama/ollama/issues/18276) below.

## Performance & Optimization

- **MLX prefix-cache truncation, 17–27 s re-prefill on every cold prompt** ([#18267](https://github.com/ollama/ollama/issues/18267)). On the MLX runner, restored prefix-cache lands on a multiple of 8192 tokens below the matched prefix, wasting up to 8191 tokens (≈17–27 s on Claude-Code-style agent traffic). No fix PR linked yet — high-impact.
- **MLX runner: Qwen static YaRN contexts** ([#18263](https://github.com/ollama/ollama/pull/18263)) — parses Qwen3.5/3.8 static YaRN metadata, applies YaRN frequencies to text RoPE + multimodal M-RoPE, and lets the runner honor `factor * original_max_position_embeddings`. Adjacent PR [#18285](https://github.com/ollama/ollama/pull/18285) refines `num_ctx` propagation and [#18261](https://github.com/ollama/ollama/pull/18261) (now closed) had enforced the context length end-to-end.
- **MLX runner: Qwen Code launch alignment** ([#18258](https://github.com/ollama/ollama/pull/18258)) — resolves effective local context via `ollama ps` and writes it into Qwen Code's `generationConfig.contextWindow`.
- **GGUF parser integer overflow** ([#18291](https://github.com/ollama/ollama/pull/18291)) — `TensorInfo.NumValues()`/`NumBytes()` did unchecked `int64` math plus a `float64` round-trip; correct guards already exist in the internal helpers, this aligns the exported API.
- **Transfer resume: finish `.tmp` that is already the whole blob** ([#18280](https://github.com/ollama/ollama/pull/18280)) — closes the long-standing [#15320](https://github.com/ollama/ollama/issues/15320) by handling the case where the tmp file is already complete.
- **Server: reload runner when two tags share a blob but need different llama-server flags** ([#18289](https://github.com/ollama/ollama/pull/18289)) — `schedulerModelKey()` currently keys on `ModelPath`, so Modelfile-derived tags inherit flags they shouldn't.

## Stability & Regressions

Ranked by blast radius for production users.

1. **Scheduler eviction loop on impossible contexts** ([#18282](https://github.com/ollama/ollama/issues/18282), **closed**). Manifests with `num_ctx 262144` cause the scheduler to evict/reload runners in a loop instead of failing fast. Closed by Kickflip73 with a fix in the same pass.
2. **`num_ctx` silently ignored on OpenAI-compat endpoints** ([#16814](https://github.com/ollama/ollama/issues/16814), **closed**). `/v1/chat/completions` and `/v1/completions` don't forward `num_ctx`; only `OLLAMA_CONTEXT_LENGTH` worked. PR [#16825](https://github.com/ollama/ollama/pull/16825) by Vitaliy-Pikalo fixes it.
3. **Vulkan + AMD iGPU regression since v0.32.9** ([#18272](https://github.com/ollama/ollama/issues/18272), 👍 1). 66 GB model on an AMD iGPU fails with `Not enough memory for command submission` starting at v0.32.12; v0.32.9 still works. No fix PR yet — pinned version is the workaround.
4. **qwen3moe + Blackwell sm_120: flash-attention crash at warmup** ([#18276](https://github.com/ollama/ollama/issues/18276)). `qwen3-coder:30b` exits `0xc0000409` (`CUDA error: shared object initialization failed`) on an RTX 5070 Ti Laptop *after* a successful memory fit; auto-enabled FA looks implicated. No fix PR.
5. **MLX compile-cache `CHECK failed` spams every ollama command on Windows** ([#18283](https://github.com/ollama/ollama/issues/18283)). `ollama list`, `ollama serve`, `ollama run` all emit `CHECK failed: mlx_compile_cache_new_` even with no MLX hardware. No fix PR.
6. **qwen2.5-coder:3b-instruct q2_K / q3_K_S / q3_K_M / q3_K_L library artifacts are 0/15 on HumanEval+** ([#18252](https://github.com/ollama/ollama/issues/18252)). Fluent but non-functional output; sibling quant levels unaffected. No fix PR.
7. **gemma4:12b tool-call parser can't parse `BEGIN_ARG`/`END_ARG`** ([#18275](https://github.com/ollama/ollama/issues/18275)). Falls into a degenerate `<|channel|>thought` loop and returns HTTP 200 with no usable content. No fix PR — PR [#18288](https://github.com/ollama/ollama/pull/18288) addresses an adjacent close-tag leak in `Gemma4CollectingContent`.
8. **`PARAMETER temperature 0` honored on `/api/chat` but sampled on `/v1/chat/completions`** ([#17744](https://github.com/ollama/ollama/issues/17744)). OpenAI-compat endpoint overwrites the Modelfile value with a server default when the request omits `temperature`. No fix PR.
9. **`/v1/responses` rejects `agent_message` input items** ([#18286](https://github.com/ollama/ollama/issues/18286)). Companion to [#18284](https://github.com/ollama/ollama/issues/18284) (now closed), which also flagged namespace folding on tool calls — Codex CLI multi-agent is reported unusable against Ollama today.
10. **JSON schema ignored by Ollama Cloud** ([#12362](https://github.com/ollama/ollama/issues/12362)). `qwen3-coder:480b-cloud` returns JSON that doesn't follow the reply schema, while local `qwen3-coder:30b` does. No fix PR.
11. **Frequent "model unavailable" errors mid-session** ([#18293](https://github.com/ollama/ollama/issues/18293)). Intermittent; switching models temporarily works. No fix PR.
12. **`muse-glimmer:30b-mlx` NVFP4 stuck in "Stopping…" + watchdog trigger** ([#18269](https://github.com/ollama/ollama/issues/18269)). Persists on 32 GB M4 Air; `ollama ps` reports stuck state. No fix PR.
13. **`tool_calls` missing from `qwen2.5-coder` (v0.11.7/0.11.8)** ([#12174](https://github.com/ollama/ollama/issues/12174), 👍 2). Long-standing; no fix PR.
14. **AMD gfx1200 `TensileLibrary_lazy_gfx1200.dat` load failure mid-run** ([#17782](https://github.com/ollama/ollama/issues/17782)). Survives a few minutes then fails; no fix PR.
15. **Old download-progress-reversion thread** ([#8484](https://github.com/ollama/ollama/issues/8484), 👍 30) finally **closed** after 20 months.
16. **Model-name validation capped at 80 chars** ([#18274](https://github.com/ollama/ollama/issues/18274)) — fix PR [#18278](https://github.com/ollama/ollama/pull/18278) raises it to 96 to align with HuggingFace's `repo_name` limit.

## What This Means for Application Developers

- **If you depend on OpenAI-compat endpoints, pin to a build with [#16825](https://github.com/ollama/ollama/pull/16825)** once it ships: `num_ctx` has been silently dropped on `/v1/chat/completions` and `/v1/completions`, which can manifest as silent context truncation. The same fix makes `temperature` from the Modelfile more reliable to set via `OLLAMA_*` env vars than via `/v1`.
- **Codex CLI / agentic clients hitting `/v1/responses`** should expect breakage on `agent_message` items and namespaced tool calls ([#18286](https://github.com/ollama/ollama/issues/18286), [#18284](https://github.com/ollama/ollama/issues/18284)). Until the responses endpoint matures, prefer `/api/chat` for agent loops.
- **MLX-based local agents on Apple Silicon** are about to get materially faster cold-prompt handling once [#18263](https://github.com/ollama/ollama/pull/18263) lands — it unlocks static YaRN scaling for Qwen3.5/3.8 and lets the runner honor long contexts requested through `num_ctx`. The existing 8192-aligned prefix-cache re-prefill ([#18267](https://github.com/ollama/ollama/issues/18267)) is the single biggest latency tax on agent workloads today.
- **AMD Vulkan users on consumer iGPUs/APUs** should pin to **v0.32.9** until [#18272](https://github.com/ollama/ollama/issues/18272) is fixed; **RTX 5070 Ti Laptop / Blackwell sm_120** users running MoE models should disable flash attention until [#18276](https://github.com/ollama/ollama/issues/18276) is addressed. **Windows + non-Apple/CUDA boxes** will keep seeing MLX `CHECK failed` log spam ([#18283](https://github.com/ollama/ollama/issues/18283)) — cosmetic, but noisy.
- **Pulling long-named HuggingFace repos** will start working once [#18278](https://github.com/ollama/ollama/pull/18278) ships (80 → 96 chars). If you're scripting `ollama pull` against HF, today's 80-char limit may already be rejecting valid repo names.
- **Gemma 4 tool calling** ([#18275](https://github.com/ollama/ollama/issues/18275)) is unreliable on hard prompts — treat Gemma 4 tool calls as best-effort and validate the JSON shape client-side.
- **Spark X2.5 (1M context) on Ollama** is days away: [#18279](https://github.com/ollama/ollama/pull/18279) brings it in via llama.cpp bump. Plan quantization and disk budget accordingly — these are 1M-context, ~4 B-param checkpoints.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-08

## Today's Highlights

The 24-hour window is dominated by **router correctness fixes and Anthropic-format edge cases** that block production traffic. Most notably, PR #40132 ships a targeted fix for the v1.91.0 `sanitize_tool_use_ids` regression against vLLM/Kimi K2.7 (issue #32214), and PR #40009 addresses long-standing least-busy balancing drift across proxy replicas by sharing in-flight counters. On the provider front, Hubris lands as a new JSON-configured OpenAI-compatible provider (#39897), while Bedrock passthrough and Converse translation continue to surface silently-failing or malformed request bodies (#34105, #30371, #40131).

## Releases & Breaking Changes

No new releases in the last 24 hours. Active in-flight changes that may surface in the next release:

- **Anthropic tool-id handling rewrite** (#40132) — vLLM/Kimi passthrough will stop mangling `tool_use_id`s. Still rewrites for `azure_ai`, `github_copilot`, `bedrock`, `vertex_ai`. Pin users on v1.91.0 hitting Claude Code + vLLM should re-test once this lands.
- **Model-management `PATCH /model/{id}/update`** (#40047) — explicit `null` will now *clear* `max_input_tokens`, `mode`, and price fields instead of being silently dropped. Operators relying on `null = no-op` semantics should review.
- **Langfuse session tracing** (#40134) — multi-turn Claude Code sessions will emit one trace per turn instead of upserting a single trace per session header.

## New Model & Hardware Support

- **New provider**: Hubris added as a JSON-configured OpenAI-compatible provider ([#39897](https://github.com/BerriAI/litellm/pull/39897)), registered via `litellm/llms/openai_like/providers.json` with no Python changes required.
- **Model registry updates**:
  - EmpirioLabs pricing/context refreshed ([#37972](https://github.com/BerriAI/litellm/pull/37972))
  - `openrouter/openai/gpt-5.6-sol` missing from `model_prices_and_context_window.json` ([#40102](https://github.com/BerriAI/litellm/issues/40102)) — open
- **Gemini detection**: PR #37145 switches Gemini 3+ detection from a `gemini-3` substring match to a major-version check. This unblocks `gemini-flash-latest` (resolves to Gemini 3.x) and pre-empts `gemini-4-*` aliases that currently fail tool-call replay with `400 missing a thought_signature`.

## Performance & Optimization

- **Least-busy router** ([#40009](https://github.com/BerriAI/litellm/pull/40009)) — replaces per-process in-flight counters with a single counter keyed per deployment, shared across workers/replicas. Eliminates the failure mode where streaming-capable deployments were starved because workers wrote stale counts.
- **Router retry logic** ([#40014](https://github.com/BerriAI/litellm/pull/40014), closed) — `BadRequestErrorRetries` and `ContentPolicyViolationErrorRetries` no longer re-pick the deployment that just refused, since 400s never bench a deployment.
- **Stream response headers** ([#40091](https://github.com/BerriAI/litellm/pull/40091)) — streaming chat completions now propagate `_response_headers` on both fallback and primary paths so `llm_provider-*` headers reflect the *current* deployment, not a stale one.
- **Rust callback bridge** ([#40070](https://github.com/BerriAI/litellm/pull/40070)) — retained-callback plumbing being added to the Rust router SDK so Python integrations see the original object, not a copy.

## Stability & Regressions

**Severity-ranked bugs filed or hot in the last 24h:**

1. **HIGH — Bedrock passthrough returns HTTP 200 with empty body** on `/bedrock/model/{model_name}/converse` ([#40131](https://github.com/BerriAI/litellm/issues/40131)). Non-streaming only; `/converse-stream` is fine. No fix PR yet — affects spend logging and client error handling.
2. **HIGH — v3 rate limiter double-counts `model_per_team`** ([#34140](https://github.com/BerriAI/litellm/issues/34140)). A configured `N` RPM/TPM trips 429 after ~`N/2` requests. No fix PR yet.
3. **HIGH — Anthropic `/v1/messages` → vLLM tool-use regression** ([#32214](https://github.com/BerriAI/litellm/issues/32214)). Fix lands in #40132.
4. **HIGH — OpenAI reasoning-model prompt cache lost on `/v1/messages` → Responses bridge** ([#39339](https://github.com/BerriAI/litellm/issues/39339)). `encrypted_content` dropped even after #37953; no fix PR.
5. **MEDIUM — Bedrock Converse drops `reasoning_effort`** for non-Anthropic / non-Nova2 / non-gpt-oss models ([#34105](https://github.com/BerriAI/litellm/issues/34105)). Qwen3-on-Bedrock users affected.
6. **MEDIUM — Bedrock invoke leaks LiteLLM-internal `optional_params`** ([#30371](https://github.com/BerriAI/litellm/issues/30371)). Converse path filters; invoke path does not.
7. **MEDIUM — `/v1/responses` streaming spends never logged** ([#29913](https://github.com/BerriAI/litellm/issues/29913)) — `usage` shape mismatch in streaming success logger → uncharged requests.
8. **MEDIUM — `HiddenParamsAsyncIteratorWrapper` swallows `completed_response`** ([#40120](https://github.com/BerriAI/litellm/issues/40120)). Container ownership recording skipped on streaming `/v1/responses`. Fix PR #40133 in review.
9. **MEDIUM — Concurrent first requests for unknown end-user bypass default budget** ([#40095](https://github.com/BerriAI/litellm/issues/40095)). Race in custom-auth flow.
10. **MEDIUM — Responses-API bridge doesn't fire for router wildcard deployments** ([#35879](https://github.com/BerriAI/litellm/issues/35879)) — `mode: "responses"` models 404 on chat completions when deployed via wildcard.
11. **MEDIUM — `cache_control_injection_points` no-op + tool-call loop** on Claude via `/v1/responses` ([#29810](https://github.com/BerriAI/litellm/issues/29810)).
12. **LOW — Azure image generation ignores keyless auth headers** ([#40127](https://github.com/BerriAI/litellm/pull/40127), fix PR open). Workload Identity / Entra ID users get 401.
13. **LOW — Z.AI provider form fields don't render** in dashboard ([#39310](https://github.com/BerriAI/litellm/issues/39310)). Provider appears in dropdown but credential inputs are hidden.
14. **LOW — Headroom CCR streaming leaves `stream_options` in upstream request** ([#40068](https://github.com/BerriAI/litellm/issues/40068)). DeepSeek 400.
15. **LOW — MCP OpenAPI-spec health check always reports unhealthy** ([#40079](https://github.com/BerriAI/litellm/issues/40079)).

**Recently closed (good signal):** OAuth2 MCP server 500 → 401+WWW-Authenticate (#29261), OOM/memory growth (#38193), guardrail policies not persisting from config (#29416), Langfuse session collapse (#40134 fix lands), MCP server `auth_value` persistence (#29408), OpenRouter Auto routed-model name (#29406).

## What This Means for Application Developers

- **If you run Claude Code through LiteLLM → vLLM/Kimi**, watch for #40132 and pin/upgrade accordingly; the v1.91.0 sanitization is the regression source.
- **If you enforce per-team per-model RPM/TPM**, verify your limits are actually 2× what you configured. Until #34140 is fixed, double the configured value or apply limits via a different mechanism.
- **If you bridge Anthropic-format clients to OpenAI reasoning models**, prompt caching is currently broken end-to-end (#39339). Until fixed, expect higher token spend.
- **If you stream `/v1/responses`**, your spend logs may be missing rows (#29913). Reconcile against upstream billing until the streaming usage shape is normalized.
- **If you use Hubris**, it works out-of-the-box with `openai_like` config ([#39897](https://github.com/BerriAI/litellm/pull/39897)).
- **If you rely on `gemini-flash-latest` or future `gemini-4-*` aliases**, tool-call replay will start working once #37145 lands — useful for flash-tier pipelines that previously errored on `missing a thought_signature`.
- **If you operate multi-replica proxies**, least-busy routing is now consistent across workers (#40009) — expect better tail latency on heterogeneous deployment mixes.
- **If you use Azure keyless auth with image generation**, #40127 (open) is a hard blocker until merged; fall back to API keys in the interim.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-08

## 1. Today's Highlights

The day's PR traffic is dominated by **Unsloth Studio hardening** — OpenAI-stream API conformance (gating UI frames behind `X-Unsloth-Events`), MCP tool image passthrough, MLX memory planning, an offload planner that weighs a spill against llama.cpp's own fitter, and several crash/teardown/UX regressions landed with fixes. On the **core package** side, attention is on torch/torchcodec install correctness (CUDA 12.8, XPU, MLX self-heal) and a long-standing **Intel Arc B580 import failure** that remains unresolved despite renewed activity. No new releases shipped in the last 24 hours.

## 2. Releases & Breaking Changes

No releases in the last 24 hours.

One API behavior change is staged in PRs and worth flagging for downstream consumers:
- **OpenAI stream control-frame gating** ([PR #10362](https://github.com/unslothai/unsloth/pull/10362)) — `/v1/chat/completions` will multiplex Unsloth's `tool_*` / `reasoning_summary` / `diffusion_frame` frames only behind an `X-Unsloth-Events: 1` opt-in. Strict OpenAI clients currently fail schema validation because these frames carry no `choices`.

## 3. New Model & Hardware Support

- **Gemma 4 base (non-instruct) inference** — fix for `add_bos_token` shipped for E2B/E4B/31B/26B-A4B families and `-unsloth-bnb-4bit` variants ([PR #10312](https://github.com/unslothai/unsloth/pull/10312), closes [#7903](https://github.com/unslothai/unsloth/issues/7903)). Without this, base-model inference degenerates into repeated text.
- **MLX (Apple Silicon) memory pricing in Studio** — adds a non-GGUF planner path so MLX loads get real numbers in the memory panel and an unpinned context fits available memory ([PR #10287](https://github.com/unslothai/unsloth/pull/10287)).
- **Intel XPU training** — `adamw_torch` is now normalized as the only bnb 8-bit path on XPU, before route-level VRAM coordination ([PR #10213](https://github.com/unslothai/unsloth/pull/10213)).
- **AMD ROCm fused-attention gap for Wan2.2 TI2V** — `RX 9060 XT` falls back to SDPA math and OOMs; no fused kernel available ([#10415](https://github.com/unslothai/unsloth/issues/10415)). No fix PR.
- **Intel Arc B580** — still failing to import via `torch.xpu.memory.mem_get_info()` in `unsloth_zoo/temporary_patches/gpt_oss.py:540` ([#3533](https://github.com/unslothai/unsloth/issues/3533)). 15 comments, no resolution.

## 4. Performance & Optimization

- **Smart offload planner (UNSLOTH_SMART_OFFLOAD)** — cost gate, sub-FFN spill ladder, context-aware device reserve, launch ordering tuned for `llama-server` ([PR #9872](https://github.com/unslothai/unsloth/pull/9872), line of work tracked in [#9861](https://github.com/unslothai/unsloth/issues/9861)).
- **Speculative-decoding observability** — feature request to expose draft/target acceptance rate from llama.cpp `--model-draft` and Studio MTP drafter sidecars ([#10401](https://github.com/unslothai/unsloth/issues/10401)). No concrete numbers yet; current decision metric is eyeballed tokens/sec.
- **Apple Silicon MLX install path** — `--no-torch` no longer silently self-heals into an MLX install on first launch ([PR #10409](https://github.com/unslothai/unsloth/pull/10409)).
- **Linux AppImage WebKit perf on NVIDIA X11** — `sync_file` descriptor leak fix restores accelerated WebKit compositing ([PR #10214](https://github.com/unslothai/unsloth/pull/10214)).
- **Studio constant CPU usage** reported ([#10390](https://github.com/unslothai/unsloth/issues/10390)) — no fix yet.

## 5. Stability & Regressions

Ranked roughly by impact on infrastructure:

- **Studio teardown crash on signalled exit** — follow-up to [#10369](https://github.com/unslothai/unsloth/pull/10369); second P2 surfaced. Fix staged in [PR #10430](https://github.com/unslothai/unsloth/pull/10430).
- **torchcodec install matrix incorrectness**
  - cu128 has no `torchcodec>=0.12` available but the ABI-stable exemption silently treats it as satisfied ([#10434](https://github.com/unslothai/unsloth/issues/10434)).
  - Studio installer maps `torch 2.3`/`2.4` to the `torch 2.10` torchcodec line (`torchcodec>=0.10,<0.11`) ([#10433](https://github.com/unslothai/unsloth/issues/10433)).
  - Fix candidate: [PR #10414](https://github.com/unslothai/unsloth/pull/10414) (split from #7474) restates the torch/torchcodec contract in the notebook validator.
- **AMD ROCm: model still in RAM with "No Ram Offload" checked** ([#10341](https://github.com/unslothai/unsloth/issues/10341), W7900/W7500).
- **AMD ROCm: Wan2.2 TI2V OOM** due to missing fused attention / SDPA math fallback on RX 9060 XT ([#10415](https://github.com/unslothai/unsloth/issues/10415)).
- **Qwen3.5 9B never reaches first step + Gemma 4 26B-A4B QLoRA OOM at batch 1 on 96 GB** ([#7203](https://github.com/unslothai/unsloth/issues/7203)).
- **Qwen3.6 35B-A3B via MLX API fails** for both base64 and URL image inputs ([#10389](https://github.com/unslothai/unsloth/issues/10389)).
- **`--tensor-split` ignored** — cost the reporter hours; no fix ([#10355](https://github.com/unslothai/unsloth/issues/10355)).
- **GGUF quantizations disappear after switching download folder** ([#10437](https://github.com/unslothai/unsloth/issues/10437)) — fix in [PR #10438](https://github.com/unslothai/unsloth/pull/10438) (repository-level dedup hiding the second copy).
- **Prompt queue cleared on Stop / settings change** ([#10428](https://github.com/unslothai/unsloth/issues/10428)) — fix in [PR #10445](https://github.com/unslothai/unsloth/pull/10445) (Composer Stop now pauses instead of deleting the run).
- **API auth**
  - `RSAES-OAEP: input message length is too long` on 238-char API keys ([#10411](https://github.com/unslothai/unsloth/issues/10411)).
  - Keyless auth rejected when harness sends an empty `Authorization: Bearer` ([#10400](https://github.com/unslothai/unsloth/issues/10400)).
- **Studio UX / API correctness**
  - "Tell the model today's date" overrides Ollama Modelfile SYSTEM prompt ([#10436](https://github.com/unslothai/unsloth/issues/10436)).
  - Duplicated Remote/LAN access entry in Settings vs API panel ([#9519](https://github.com/unslothai/unsloth/issues/9519)).
  - Workspace files with `.cs/.php/.js/…` extensions remain inaccessible for read/write/index ([#10300](https://github.com/unslothai/unsloth/issues/10300)).
  - Un-install leaves disk space; users must run `uv cache clean` ([#9651](https://github.com/unslothai/unsloth/issues/9651)).
  - SSH blocklist bypass via Paramiko ([#10397](https://github.com/unslothai/unsloth/issues/10397)).
  - Workspace Code-tool output hidden, no `.html` preview ([#10425](https://github.com/unslothai/unsloth/issues/10425)).

## 6. What This Means for Application Developers

- **Pin your torch/torchcodec pairing on CUDA 12.8 hosts.** Today the install path is unsound for both the `>=0.12` ABI-stable line and the legacy per-minor mapping. Until [PR #10414](https://github.com/unslothai/unsloth/pull/10414) lands, validate manually before deploying.
- **If you call `/v1/chat/completions` with strict OpenAI clients**, expect a behavior change once [PR #10362](https://github.com/unslothai/unsloth/pull/10362) merges: tool/reasoning/diffusion frames will be off by default; send `X-Unsloth-Events: 1` to keep them.
- **MCP tool images now reach the model.** Previously, MCP-returned images were shown in the UI but never sent to the model ([PR #10088](https://github.com/unslothai/unsloth/pull/10088), fixes [#10057](https://github.com/unslothai/unsloth/issues/10057)). Builds that read MCP image content should start to behave correctly once this ships.
- **Apple Silicon Studio deploys** get real MLX memory estimates ([PR #10287](https://github.com/unslothai/unsloth/pull/10287)) and a non-leaky `--no-torch` install ([PR #10409](https://github.com/unslothai/unsloth/pull/10409)) — useful if you ship GGUF-only Mac builds.
- **Speculative-decoding ROI** will eventually be measurable ([#10401](https://github.com/unslothai/unsloth/issues/10401)). Worth watching if you plan draft-model pairings.
- **AMD ROCm users should assume no fused attention for new video models** (Wan2.2 TI2V) and budget for SDPA math fallback memory.
- **Long-tail XPU caveat remains** — Intel Arc B580 import is still broken ([#3533](https://github.com/unslothai/unsloth/issues/3533)); do not advertise Unsloth support on that GPU.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — Daily Digest
**Date:** 2026-09-08
**Repository:** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. Today's Highlights

No new releases were published in the last 24 hours, so attention today centers on community-reported integration gaps: a corporate OpenAI-compatible endpoint fails to be detected as a supported protocol, and Claude Cowork's `WebSearch` tool collides with CCR's normalization logic in the Fusion pipeline, breaking web search for that client. A minor build-config PR (#1764) prepares the codebase for TypeScript 7 by removing the deprecated `baseUrl` tsconfig option.

---

## 2. Releases & Breaking Changes

*No new releases in the last 24 hours. Nothing to migrate.*

---

## 3. New Model & Hardware Support

*No new model, architecture, backend, or quantization support reported today.*

---

## 4. Performance & Optimization

*No performance, throughput, latency, memory, or kernel work landed or discussed today.*

---

## 5. Stability & Regressions

Reported in the last 24 hours, ordered by likely severity:

- **[High] Tool-name normalization breaks web search for Claude Cowork** — [#1766](https://github.com/musistudio/claude-code-router/issues/1766) (open)
  Cowork registers its web-search capability as a function tool named `WebSearch` (camelCase, no separator). CCR's three matching checks in Fusion (`=== "web_search"`, `endsWith("_web_search")`, `includes("search_web")`) all run *after* a `toLowerCase().replace(/[-.]/g, "_")` normalization, so `WebSearch` collapses to `websearch` and matches none of the patterns. Result: `web_search` silently never fires for any Cowork-using Claude variant. A normalization rule that splits camelCase (or matches the raw token) would fix it. **No fix PR yet.**

- **[Medium] Custom corporate OpenAI-compatible endpoints not detected as supported** — [#1765](https://github.com/musistudio/claude-code-router/issues/1765) (open)
  A user's in-house OpenAI-compatible API hosting local models (Deepseek, Gemma) is rejected by CCR's protocol-detection path, while Open WebUI and plain `curl` work fine. CCR works correctly against DeepInfra, suggesting the regression is specific to non-vendor, non-public OpenAI-compatible hosts — possibly strict path, header, or model-list probing. **No fix PR yet; reproducer details (curl request) attached in the thread.**

- **[Low] Forward-compat build warning for TypeScript 7** — [#1764](https://github.com/musistudio/claude-code-router/pull/1764) (open)
  `tsconfig.base.json` still uses `baseUrl`, which TypeScript 6 deprecates and TypeScript 7 will refuse. The repo pins `tsc@5.9.3`, so CI is quiet today, but any developer on a newer editor already sees the warning. The PR drops `baseUrl` and migrates consumers to relative paths. Pure hygiene; no runtime impact.

---

## 6. What This Means for Application Developers

- **Cowork users: expect web search to be silently disabled.** If you route Cowork traffic through CCR with Fusion enabled, `WebSearch` tool calls will no-op today. Workarounds: disable Fusion's web-search tool for Cowork sessions, or use a non-Fusion transformer until [#1766](https://github.com/musistudio/claude-code-router/issues/1766) is resolved. Track the issue before relying on retrieval in production Cowork flows.
- **Self-hosted OpenAI-compatible stacks: validate before deploying.** If you proxy local models (Deepseek, Gemma, Qwen, etc.) behind an OpenAI-shaped `/v1` endpoint behind a corporate firewall, smoke-test the path with CCR *before* committing. The current detection logic appears to favor well-known public hosts ([#1765](https://github.com/musistudio/claude-code-router/issues/1765)). Consider pinning to a known-good release and keeping logs from the protocol-detection stage when filing reports.
- **Plugin/transformer authors: be careful with camelCase tool names.** If you build custom transformers, do not assume tool names passed in are already snake_case. CCR's internal normalization strips only `-` and `.`, leaving camelCase untouched — meaning any upstream tool using `XxxYyy` naming can be missed by string matchers.
- **Contributors on newer TypeScript:** the `tsconfig` cleanup ([#1764](https://github.com/musistudio/claude-code-router/pull/1764)) is small and safe to review/merge; expect it to land as housekeeping soon.
- **General posture:** a quiet day on releases but two real integration sharp edges surfaced within 24 hours — both are user-visible (broken search, broken endpoint detection). If you depend on CCR for production routing, pin your version and subscribe to these issues.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-08

## Today's Highlights

v3.20.2 ships as a compatibility-fix patch centered on making **Grok work end-to-end through Codex routing via xAI's native Responses API**, resolving four interlocking schema/auth mismatches (xAI's tool schema rejection, Codex's int/float coercion, multi-agent email injection, and Codex role model strings). The Codex-as-router story continues to expand with new provider integrations (GitHub Copilot, Token Market, QianwenAI/QwenCloud), while a long-standing regression — Claude Code `settings.json` being fully rewritten on every provider switch — is finally closed.

---

## Releases & Breaking Changes

- **[v3.20.2](https://github.com/farion1231/cc-switch)** — Codex-focused compatibility release:
  - Grok now routable through Codex via xAI native Responses API; fixes tool-schema rejection, int/float coercion, role-model mismatch, and multi-agent email injection
  - Grok OAuth card no longer blocked by v3.20.1's switch gate
  - Codex takeover no longer leaves Codex stuck at the login screen
  - GPT-6 over Codex OAuth no longer reports "Codex update required"
  - Note for users on v3.20.1: upgrade is recommended; the OAuth switch-gate fix in particular removes an unintended blocker introduced in the prior minor.

---

## New Model & Hardware Support

- **Grok via xAI native Responses API** (v3.20.2) — first-class support for routing Grok through Codex's `/responses` endpoint rather than falling back to Chat Completions.
- **GitHub Copilot as a managed Codex provider** — [PR #7157](https://github.com/farion1231/cc-switch/pull/7157) introduces capability-driven routing: the local Responses proxy selects Responses vs. Chat Completions based on each model's `supported_endpoints`, handling auth and response adaptation. Default model preconfigured.
- **DeepSeek Harness (DSH) app support** — [PR #6526](https://github.com/farion1231/cc-switch/pull/6526) adds a DSH app type and provider writer aligned with the official Harness / DSH Desktop config layout (`~/.dsh/settings.yaml`, `DSH_HOME` override, `baseURL` field). Companion usage importer in [PR #6724](https://github.com/farion1231/cc-switch/pull/6724) reads zstd-compressed JSONL session ledgers.
- **QianwenAI / QwenCloud presets** — [PR #7183](https://github.com/farion1231/cc-switch/pull/7183) rebrands the domestic DashScope (Bailian) presets as **千问AI平台** and refreshes the entire Qwen 3.8 family across all seven supported apps (Claude Code, Claude Desktop, Codex, Hermes, OpenClaw, OpenCode, Pi). Closes the prior `Bailian → QwenCloud` request in [#6214](https://github.com/farion1231/cc-switch/issues/6214).
- **Token Market presets** — [PR #7184](https://github.com/farion1231/cc-switch/pull/7184) adds Token Market across Claude Code/Desktop (Anthropic Messages), Codex (Responses), and OpenCode/OpenClaw/Hermes (Chat Completions).
- **DeepSeek vision in Codex** — image-upload pipeline for DeepSeek models routed through Codex fixed; see [Issue #6998](https://github.com/farion1231/cc-switch/issues/6998).
- **GPT-6 over Codex OAuth** — "needs Codex update" error resolved in v3.20.2; GPT-6-ASTRA 400 errors against Claude Code addressed via [PR #7131](https://github.com/farion1231/cc-switch/issues/7131).

---

## Performance & Optimization

- **Classifier queue for Claude Code Auto Mode** — [PR #6602](https://github.com/farion1231/cc-switch/pull/6602) routes Auto Mode's pre-Bash security-classifier requests to a *separate* provider chain (different `base_url` + credentials) from the conversation path. Complements the in-provider cache-reuse work in #4987/#6113 by covering cross-provider fan-out and provider-failover cases. Three independent request signatures are used for classification to avoid Claude-side fingerprint evasion.
- **Multi-API-Key per provider** — [PR #7188](https://github.com/farion1231/cc-switch/pull/7188) (and closed counterpart [#7186](https://github.com/farion1231/cc-switch/pull/7186)) enable multiple API keys per provider with notes and single-active selection, covering Claude/Codex/Gemini/OpenCode/OpenClaw/Hermes forms. Backwards-compatible with legacy single-string storage. This is the most pragmatic local failover primitive shipped to date; closes [#7185](https://github.com/farion1231/cc-switch/issues/7185).
- **Prompts list refresh** — [PR #7194](https://github.com/farion1231/cc-switch/pull/7194) re-reads `CLAUDE.md` / `AGENTS.md` from disk when loading the Prompts list and on panel refocus, eliminating stale entries after external edits.
- **TypeScript 7 readiness** — [PR #7193](https://github.com/farion1231/cc-switch/pull/7193) drops the deprecated `baseUrl` tsconfig option so the project builds cleanly under TS 7.0 without an `ignoreDeprecations` shim.
- **Dep dependency churn** — [PR #7195](https://github.com/farion1231/cc-switch/pull/7195) (52 cargo updates) and [#7100](https://github.com/farion1231/cc-switch/pull/7100) (51 updates, closed) bump `serde_json`, `serde`, `log`, and the wider Tauri-side crate set. Routine, but worth noting if you maintain vendored forks.

---

## Stability & Regressions

Ranked by user impact and recurrence across the open/closed issue mix:

| Severity | Issue | Status | Notes |
|---|---|---|---|
| **High** | [Codex heartbeat injects `function_call_output` with missing `call_id` → DeepSeek `/responses` 400 → session permanently stuck](https://github.com/farion1231/cc-switch/issues/6995) | OPEN | Self-heal not possible; new threads required. Only reproduces when CC Switch proxies to DeepSeek via Responses. |
| **High** | [Local proxy fails handling Codex `/responses` → Kimi For Coding 400](https://github.com/farion1231/cc-switch/issues/6861), [→ Zhipu GLM 400](https://github.com/farion1231/cc-switch/issues/7142), [→ Kimi 400](https://github.com/farion1231/cc-switch/issues/6968), [→ Kimi routing to Codex desktop 400](https://github.com/farion1231/cc-switch/issues/6942) | All closed in/around v3.20.2 | A recurring class: Codex Responses-wire-format expectations not matching third-party providers' validation. Worth keeping an eye on if you add new providers. |
| **High** | [Routing-mode forced `requires_openai_auth = true` makes Codex bypass proxy and hit OpenAI auth directly](https://github.com/farion1231/cc-switch/issues/4393) | CLOSED | Routing silently bypassed for affected sessions; same root cause as [#5672](https://github.com/farion1231/cc-switch/issues/5672) (old account-bound sessions still hitting `api.openai.com`). |
| **High** | [`/v1/images/generations` not proxied → 404](https://github.com/farion1231/cc-switch/issues/5429) | CLOSED | Only `/v1/chat/completions` and `/v1/responses` were initially proxied. |
| **Medium** | [Claude Code `settings.json` fully rewritten on every switch → `enabledPlugins`, `statusLine` cleared](https://github.com/farion1231/cc-switch/issues/3631) | CLOSED | Long-standing community pain point (12 comments, 7 👍). Plugins like `claude-hud` and custom status bars were silently reset each switch. |
| **Medium** | [Codex Desktop old sessions keep hitting `api.openai.com` after switch to third-party → 401](https://github.com/farion1231/cc-switch/issues/5672) | OPEN | Even with `preserveCodexOfficialAuthOnSwitch = true`, account-bound sessions bypass the proxy. New sessions work fine. |
| **Medium** | [Quota exhausted → switching providers fails to change model](https://github.com/farion1231/cc-switch/issues/7056) | OPEN | Post-2026.9.2 Codex update; model-swap path appears wedged after upstream 429s. |
| **Medium** | [Codex `/responses` tool-call `arguments` parse failures surface generic errors instead of root cause](https://github.com/farion1231/cc-switch/issues/5001) | OPEN | Operator debuggability issue; masks actual upstream rejection reason. |
| **Medium** | [Claude Desktop + Aliyun Bailian proxy hangs ~150s on dead IPv6 NLB (no happy-eyeballs)](https://github.com/farion1231/cc-switch/issues/5096) | OPEN, stale | Affects Anthropic-Messages protocol against `token-plan.cn-beijing.maas.aliyuncs.com`; users on IPv6-only or dual-stack with broken v6 see 150s stalls. |
| **Medium** | [Codex provider `base_url` edit not synced to `provider_endpoints.url`](https://github.com/farion1231/cc-switch/issues/5099) | OPEN, stale | Model list and test calls still hit the old URL. |
| **Low** | [Self-signed HTTPS cert on custom provider → proxy 502](https://github.com/farion1231/cc-switch/issues/5042) | OPEN, stale | |
| **Low** | [OpenCode missing `x-opencode-session` header — upstream starts rejecting as of 09/06](https://github.com/farion1231/cc-switch/issues/7088) | OPEN | Likely a single-line fix; tracks an upstream OpenCode tightening. |
| **Low** | [Updater swallows command error details on failed update checks](https://github.com/farion1231/cc-switch/pull/6482) | PR CLOSED | Fix landed in repo. |
| **Low** | [Codex managed-account dangling bindings prevent rebind/switch-away](https://github.com/farion1231/cc-switch/pull/7060) | PR CLOSED | [PR #7060](https://github.com/farion1231/cc-switch/pull/7060) now recovers when the persisted store is out of sync with memory, while preserving native Codex credentials. |

---

## What This Means for Application Developers

- **Multi-provider failover is now first-class.** Combine **multi-API-Key per provider** ([#7188](https://github.com/farion1231/cc-switch/pull/7188)) with the **classifier queue** ([#6602](https://github.com/farion1231/cc-switch/pull/6602)) and you can architect: (a) per-request model failover within one provider, (b) classifier traffic on a totally separate provider chain from conversational traffic. This is enough to build a self-healing agent runtime against provider outages without app-level retry logic.
- **Codex is becoming a true Responses-API gateway.** Capability-driven routing in [PR #7157](https://github.com/farion1231/cc-switch/pull/7157) means a single Codex client can transparently fan out to Responses-or-Chat-Completions providers based on each model's declared endpoints. If you're building an agent that should "just work" against heterogeneous upstream APIs, the Codex provider form is now the most pragmatic entry point.
- **Claude Code `settings.json` semantics matter to integrators.** The [closed #3631](https://github.com/farion1231/cc-switch/issues/3631) confirms the project now preserves user-managed keys like `enabledPlugins` and `statusLine` across provider switches — plugins and status-bar scripts will no longer vanish silently. If you ship a Claude Code plugin or status HUD, your installed state is now stable across model swaps.
- **Watch the Codex Responses / third-provider interop matrix.** The bulk of v3.20.2's churn (Kimi, Zhipu GLM, GPT-6, Grok, DeepSeek) is in this seam. If you proxy a new provider through Codex, exercise: heartbeat automation, tool-call `arguments` parse paths, image generation, and OAuth-bound legacy sessions — these are the historical failure surfaces.
- **Operator observability gap remains.** [Issue #5001](https://github.com/farion1231/cc-switch/issues/5001) (generic errors masking real upstream causes on Codex `/responses`) is still open. Until it lands, plan for verbose logging on the upstream side when debugging 400s in production.
- **Networking hygiene.** If you operate against Aliyun Bailian or any dual-stacked upstream, [#5096](https://github.com/farion1231/cc-switch/issues/5096) tells you happy-eyeballs isn't applied at the proxy layer — disable IPv6 at the OS or pin IPv4 in your routing policy until this is addressed upstream.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-08

## 1. Today's Highlights

**v1.0.0-rc.35 ships** with a redesigned two-layer task plugin control system and Alibaba **Wan 3.0** video model support, marking the most user-facing configuration change of the cycle ([release](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.35), [PR #7240](https://github.com/QuantumNous/new-api/pull/7240)). On the reliability side, three distinct **billing correctness bugs** were filed or patched in 24 hours — Responses stream usage on `incomplete`, image-token double-charging under cache hits, and post-disconnect charging on non-streaming requests — each with accompanying PRs. A new **per-channel TTFB streaming timeout with auto-fallback** ([PR #7228](https://github.com/QuantumNous/new-api/pull/7228)) is the most consequential reliability feature in flight.

---

## 2. Releases & Breaking Changes

### v1.0.0-rc.35 — "Wan 3.0 Video, Plugin Routing"

**Task Plugin Controls simplified to two layers** (master switch + per-plugin toggle). This is a behavioral change worth flagging to operators:

- **Disabling a plugin no longer falls back to a same-named built-in plugin**, and the same-named model will not continue to be handled by the built-in plugin. Previously implicit fallback behavior is now explicit opt-out.
- **Built-in plugins now echo back the request's model name** (respecting model redirection) rather than the upstream's true model ID. This affects what your dashboard/logs display, not what the upstream receives.
- Plugin routing policy is reorganized — review any automation that depended on prior fallback semantics.

### Schema / migration notes

- [#7234](https://github.com/QuantumNous/new-api/issues/7234) (closed) requests per-release SQL upgrade scripts; not yet resolved.
- No explicit migration note is included in the rc.35 announcement beyond the plugin-toggle change above.

---

## 3. New Model & Hardware Support

| Item | Status | Reference |
|------|--------|-----------|
| **Alibaba Wan 3.0 all-in-one video** (T2V / I2V / R2V / Edit) | Merged (rc.35) | [PR #7240](https://github.com/QuantumNous/new-api/pull/7240), [PR #7244](https://github.com/QuantumNous/new-api/pull/7244) (review) |
| **Alibaba Wan 2.7 video** family | Merged | [PR #4078](https://github.com/QuantumNous/new-api/pull/4078) |
| **Huawei MaaS channel type** | Open PR | [PR #7239](https://github.com/QuantumNous/new-api/pull/7239), [Issue #7236](https://github.com/QuantumNous/new-api/issues/7236) |
| **xAI Grok Imagine Video** async task routing | Open issue | [Issue #7251](https://github.com/QuantumNous/new-api/issues/7251) (related open bug [#6358](https://github.com/QuantumNous/new-api/issues/6358)) |
| **OCR models** (PaddleOCR, DeepSeek OCR) | Stale enhancement request | [Issue #2597](https://github.com/QuantumNous/new-api/issues/2597) |
| **Rerank models misclassified as embedding** in channel test | Fix PR open | [PR #7181](https://github.com/QuantumNous/new-api/pull/7181) |
| **Gemini normalized thinking levels** accepted by relaykit | Fix PR open | [PR #7245](https://github.com/QuantumNous/new-api/pull/7245) |

No new hardware backend (CUDA / ROCm / Metal / NPU) or quantization format work appeared in the last 24 hours — new-api is provider-agnostic at the transport layer and continues to extend upstream coverage rather than local inference.

---

## 4. Performance & Optimization

- **Per-channel TTFB (first-token) timeout with automatic fallback** — [PR #7228](https://github.com/QuantumNous/new-api/pull/7228). When an upstream returns response headers but stalls before the first chunk, requests previously waited for the full streaming timeout. The new feature fails fast at the TTFB boundary and reroutes via existing fallback logic. Concrete numbers will depend on operator-configured values; the PR adds per-channel config plus fallback integration.
- **Pass-through mode now applies channel `model_mapping`** — [PR #7249](https://github.com/QuantumNous/new-api/pull/7249). Closes [#6002](https://github.com/QuantumNous/new-api/issues/6002) and [#6639](https://github.com/QuantumNous/new-api/issues/6639). Previously, pass-through forwarded the client's public model name verbatim, causing 404s at upstream; now `ModelMappedHelper` rewrites the request body copy used downstream. Operationally this is a correctness fix but it also avoids forced fallback retries on misrouted models.
- **Chat → Responses conversion emits correct reasoning event name** — [PR #7114](https://github.com/QuantumNous/new-api/pull/7114). Streaming `reasoning_content` now emits `response.reasoning_text.delta` instead of `response.reasoning_summary_text.delta`, fixing consumer parsers that broke on the wrong field.

---

## 5. Stability & Regressions

Ranked by severity for operators and billing integrity.

### 🔴 High — Billing / revenue correctness

| Issue | Description | Status |
|-------|-------------|--------|
| [#7241](https://github.com/QuantumNous/new-api/issues/7241) | `/v1/responses` streaming **discards usage on `response.incomplete`** and bills the request as zero. Affects rc.30. | **Fix PR open**: [#7242](https://github.com/QuantumNous/new-api/pull/7242) |
| [#7231](https://github.com/QuantumNous/new-api/issues/7231) | Non-streaming client timeout leaves upstream request running; user is **charged after disconnect** on rc.25. | Closed (reproducer only — check release notes for follow-up) |
| [#7230](https://github.com/QuantumNous/new-api/pull/7230) | **Image tokens double-charged** when cache hits include images. | **Fix PR open** — claim #7229 |
| [#7209](https://github.com/QuantumNous/new-api/issues/7209) | Billing plugin-ization proposal. | Closed (tracking) |

### 🟠 Medium — Correctness / functional

| Issue | Description | Status |
|-------|-------------|--------|
| [#7252](https://github.com/QuantumNous/new-api/issues/7252) | Ollama streaming **drops `tool_calls`** when they appear in the final `done:true` frame (e.g. `qwen3-coder`). Reported on rc.35. | Open |
| [#7194](https://github.com/QuantumNous/new-api/issues/7194) | Video generation completes but artifact preview fails; task status 404. Affects rc.30. | Open |
| [#6358](https://github.com/QuantumNous/new-api/issues/6358) | `xAI grok-imagine-video` advertised but routing returns `invalid_api_platform: 48`. | Open |
| [#7235](https://github.com/QuantumNous/new-api/issues/7235) | `kimi-k3` dynamic tool calling anomaly on rc.34. | Closed |
| [#2542](https://github.com/QuantumNous/new-api/issues/2542) | `gpt-5.2` requests have `role:system` forcibly rewritten to `role:developer`, causing upstream rejection. | Closed |
| [#7247](https://github.com/QuantumNous/new-api/issues/7247) | **Higress AI gateway** sends `Transfer-Encoding: chunked` request bodies that new-api fails to parse (400 invalid JSON). Closed without confirmed repro path — flag for upstream-mesh users. | Closed (missing repro) |

### 🟡 Low — Process / DX

- [#7234](https://github.com/QuantumNous/new-api/issues/7234) Per-release SQL upgrade script workflow.
- [#7210](https://github.com/QuantumNous/new-api/issues/7210) Rate-setting UX feedback.
- [#6679](https://github.com/QuantumNous/new-api/issues/6679) Per-key concurrency limits on channels.
- [#7250](https://github.com/QuantumNous/new-api/pull/7250) Playground truncates model-group names; hover full name fix open.
- [#7246](https://github.com/QuantumNous/new-api/pull/7246) Multipart filename escaping for image-edit API.
- [#6514](https://github.com/QuantumNous/new-api/pull/6514) Admin bulk-email selected users.
- [#6408](https://github.com/QuantumNous/new-api/pull/6408) Add invitation-rebate switch; add `claude-` route prefix for Claude Code desktop. Merged.
- [#7233](https://github.com/QuantumNous/new-api/pull/7233) Configurable upstream media-URL host rewriting (privacy).

> **Note on noise:** Several issues ([#7237](https://github.com/QuantumNous/new-api/issues/7237), [#7238](https://github.com/QuantumNous/new-api/issues/7238), [#7243](https://github.com/QuantumNous/new-api/issues/7243), [#7232](https://github.com/QuantumNous/new-api/issues/7232)) are agent/permission probes or were filed against the wrong repo and closed as `invalid`. Treat any issue body carrying an "Agent / Tool / Model (full id)" block as machine-generated until validated.

---

## 6. What This Means for Application Developers

- **If you run rc.35 in production, audit your task-plugin toggles now.** Disabling a plugin no longer routes the same-named model to the built-in counterpart — you must explicitly re-enable the built-in or expect 404s. Also expect model names in logs/UI to reflect the *client* model (with redirects applied), not the upstream ID, which simplifies troubleshooting but may surprise existing dashboards.
- **Treat `/v1/responses` streaming accounting as a known risk** until [#7242](https://github.com/QuantumNous/new-api/pull/7242) merges. Incomplete or cancelled responses currently bill 0. If you bill end users based on new-api records, cross-check against upstream receipts for the next release cycle.
- **Watch the image-cache billing fix** ([#7230](https://github.com/QuantumNous/new-api/pull/7230)) — if your workloads cache image-heavy prompts, recent bills may be inflated and warrant a reconciliation pass once merged.
- **Streaming + Ollama + tools (`qwen3-coder` and similar) is currently broken** in the final chunk ([#7252](https://github.com/QuantumNous/new-api/issues/7252)). Avoid relying on streamed tool_calls from Ollama backends on rc.35.
- **Pass-through mode is safer to use** now that channel `model_mapping` is honored ([#7249](https://github.com/QuantumNous/new-api/pull/7249)). If you previously disabled pass-through to work around 404s, re-evaluate.
- **Alibaba Wan 3.0 video models are available** ([#7240](https://github.com/QuantumNous/new-api/pull/7240)) — useful for video generation pipelines that already route through new-api; expect a brief integration window as upstream async task semantics settle.
- **Huawei MaaS** ([#7239](https://github.com/QuantumNous/new-api/pull/7239)) and **per-channel TTFB fallback** ([#7228](https://github.com/QuantumNous/new-api/pull/7228)) are the two features most worth tracking if you operate multi-vendor fleets — TTFB fallback in particular addresses a common pain point where one slow channel stalls an entire fallback chain.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*