# AI Infrastructure Digest 2026-09-09

> Generated: 2026-09-09 11:30 UTC | Projects covered: 9

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

# Cross-Project Comparison Report — 2026-09-09

**Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth, Claude Code Router (CCR), CC Switch, New API

---

## 1. Ecosystem Overview

The inference ecosystem is now clearly stratified into four layers — datacenter serving engines (vLLM, SGLang), local runtimes (llama.cpp, Ollama), gateway/routing tiers (LiteLLM, New API, CCR, CC Switch), and fine-tuning/workstation tooling (Unsloth) — and today's activity shows each layer absorbing the same underlying industry shifts differently. The dominant technical theme is the collision between **hybrid/linear-attention architectures (Mamba, GDN, DSA sparse attention) plus speculative decoding (MTP/EAGLE)** and the prefix-caching contract that agentic workloads depend on, with open regressions in vLLM (30–40% throughput loss) and active mitigation work in SGLang. A second cross-cutting theme is **consumer Blackwell (sm_120/121) instability**, hitting vLLM, llama.cpp, and Ollama users independently. At the upper stack, the gateway projects are converging on **billing correctness and Claude Code/Codex CLI integration** as their differentiators, while supply-chain security (cosign signing, model signing, RCE fixes) moves from afterthought to roadmap item.

---

## 2. Activity Comparison

*Counts = unique issues/PRs referenced in each project's digest (≈24h window); not full-repo queries.*

| Project | Issues referenced | PRs referenced | Release status |
|---|---|---|---|
| **llama.cpp** | ~22 | ~27 | **9 tags** (b10865–b10875); `--mmap`/`--mlock`/`--direct-io` removed in b10875 |
| **SGLang** | ~21 | ~19 | No release; heavy merge activity across AMD/NPU/CPU/diffusion |
| **vLLM** | ~17 | ~14 | **v0.29.0** — 594 commits, 277 contributors (91 new); MRV2 now default |
| **CC Switch** | ~18 | ~14 | No release; Cursor (+4,123 LOC) and DSH support landed |
| **New API** | ~15 | ~14 | **v1.0.0-rc.36** — Task Plugins & Marketplace |
| **Unsloth** | ~15 | ~12 | **v0.1.807-beta** — AMD Vulkan default, RCE fix |
| **Ollama** | ~15 | ~10 | No release; fixes staged for next minor |
| **LiteLLM** | ~7 | ~13 | **v1.102.0-dev.1** (cosign-signed) + stable/1.87.x backports |
| **Claude Code Router** | 7 | 2 | No release (v3.0.22); issue-heavy, PR-light |

**Takeaway:** llama.cpp, SGLang, and vLLM show the highest raw throughput of merged work; CCR is the outlier with a 7:2 issue-to-PR ratio and no fixes landing for its top problems.

---

## 3. Model Support Race

| Project | New models/architectures this window |
|---|---|
| **SGLang** | DeepSeek-V4 (CPU kernels, Mooncake/UMBP linkers), Kimi-K3 (NPU CI), GLM-5.2 (NPU FP8-KV + MLAProlog), **VDN-H3 diffusion hybrid** (`vdn-minimax-h3`, 8-NFE DMD2), SenseNova-U1 tracking |
| **vLLM** | Gemma4 QKV-Fuser, BailingMoeV2 RoPE fix, Qwen3-VL PP fix, Mistral/Magistral reasoning parser (Rust), NVFP4-on-XPU emulation; DeepSeek-V4-Flash Ampere support still open (#50576) |
| **llama.cpp** | GLM-5.3-Flash MTP (in progress, 15👍), HRM-Text/DFM Mimir 1B, Granite 3 MoE fixes, NVFP4 W4A8 forced on Blackwell, IQ-quants for MoE |
| **Ollama** | No new local models; cloud catalog requests (Longcat 2.0, Jamba, Hunyuan Hy3…) |
| **New API** | Veo 3.1 (Vertex), MiniMax H3 video V2 with pre-charge/refund semantics |
| **CC Switch / CCR / LiteLLM** | Provider/platform integrations rather than models (Copilot-hosted Codex, Laonong preset, Vertex Claude versioned IDs) |

**Who's ahead:** **SGLang** has the broadest frontier-architecture coverage — it is the only project simultaneously shipping DeepSeek-V4, Kimi-K3, GLM-5.2, and a diffusion hybrid, across four hardware stacks (CUDA, ROCm, NPU, CPU). **vLLM** trades breadth for Transformers-backend depth and Blackwell enablement; **llama.cpp** wins on quantization formats (IQ, NVFP4, TQ) and exotic targets (RISC-V, s390x, OpenVINO NPU). The gateway layer merely tracks model velocity via pricing/config entries — note Azure DeepSeek-V4 pricing still pending in LiteLLM (#30129).

---

## 4. Performance Frontier

Optimization effort clusters into six axes:

1. **KV cache & prefix caching (the center of gravity).** vLLM: CUDA-graph memory profiling for KV auto-sizing, tiering observability metrics, context-aware retention RFC (#37003), and the critical hybrid-GDN prefix-cache fix (#52244). SGLang: HiCache extended to hybrid SWA/Mamba models (#38634), Mooncake end-to-end tracing, 512K-token DSA cluster path rework. Unsloth: KV preemption so N parallel chats share one cache (`--parallel N --kv-unified`). Ollama: eliminated 17–27s MLX re-prefill on cold agent turns.
2. **Speculative decoding correctness.** MTP/EAGLE is now table stakes but is the proximate cause of most severe open bugs: vLLM's 30–40% throughput loss on hybrid GDN, llama.cpp's inter-request MTP state leakage, SGLang's DFlash/DSpark TP deadlocks (now fixed via deterministic top-p/top-k kernels, #38565).
3. **Cold start & weight loading — a newly explicit optimization axis.** SGLang's Weight Cache Daemon: Qwen3-235B FP8 load from ~306–327s to **<1s**. Ollama's unified GGUF metadata cache removes repeated extraction.
4. **Kernels.** Helion proposal for vLLM ROCm custom-ops (1.382–1.785× geomean on H100); AITER fused DSA indexer prologue; llama.cpp Vulkan iq4_xs (+6–17% RDNA4), CPU VNNI tiled mul_mat (3–7×), Metal FA tile widening (+6.8%).
5. **Quantization.** NVFP4 is now a load-bearing format across vLLM, SGLang, and llama.cpp — but with maturity costs (SGLang's ~4% `tiny_gemm` regression, vLLM sm_120 crashes with NVFP4 + FP8-KV).
6. **Gateway overhead.** The only gateway-layer perf work: CCR's linear-with-provider-count latency bug (#1775/#1777) and New API's ~25% homepage improvement via `/api/status` de-dup.

---

## 5. Layer Positioning

- **Datacenter serving engines — vLLM, SGLang.** Compete on multi-GPU parallelism (TP/PP/DP), spec decoding, disaggregation, and scheduler sophistication. Their risk profile is architectural churn: vLLM's MRV2 default flip in v0.29.0 changes sampler/logprobs semantics mid-flight; SGLang carries deep per-platform forks (AITER, CANN, CPU) that multiply its test surface.
- **Local runtime core — llama.cpp.** The substrate layer: quantization formats, GGUF, and the widest hardware matrix (including OpenVINO NPU, Adreno, s390x). Everything downstream (Ollama, Unsloth serving) builds on it — llama.cpp's `--preempt-ram` directly enables Unsloth's KV preemption feature.
- **Local distribution & UX — Ollama.** Adds packaging, model registry, MLX runner, and a cloud tier. Its problems are integration-shaped (Vulkan regressions, cloud-vs-vendor divergence like `glm-5.3:cloud`) rather than kernel-shaped.
- **Gateways — LiteLLM (enterprise: auth, budgets, spend, signed images), New API (multi-tenant resale: billing, quota, marketplace).** Their failure modes are money, not tokens: today alone New API fixed a realtime double-charge and a `:countTokens`-billed-as-generation bug, while LiteLLM backported Anthropic stream cost recovery. **CCR and CC Switch** occupy a newer niche — client-side routing specifically for agentic coding CLIs (Claude Code, Codex, OpenCode, now Cursor and DSH) — and live or die by upstream protocol churn.
- **Fine-tuning/workstation — Unsloth.** QLoRA performance plus an opinionated local serving stack (Studio, Spark orchestration). Notably expanding laterally into serving (two-Spark orchestrator, KV preemption) rather than vertically into distributed training.

---

## 6. Trend Signals

1. **Hybrid attention breaks the prefix-cache contract — the #1 agent-infra risk.** Every engine has open bugs here (vLLM #53670/#53142, SGLang hybrid HiCache work, llama.cpp `gated_delta_net` fusion). Since agent economics rest on prefix-cache hits, treat hybrid-model + spec-decode stacks as unstable until the vLLM #52244-class fixes land and are verified on your workload.
2. **Consumer Blackwell (sm_120/121/RTX 5090/GB10) is a reliability wildcard.** Three independent projects report crashes/hangs on the same silicon generation. Practical posture: workarounds exist (`GGML_CUDA_DISABLE_GRAPHS=1`, `TRITON_ATTN`), pin versions, and don't treat Blackwell workstation deployments as production-grade yet.
3. **Billing correctness is the gateway layer's systemic weakness.** Cache-token undercounting (New API #7290, CC Switch #6626), double-charging, dropped interrupted-stream costs (LiteLLM) — all emerging *because* agentic caching makes token accounting non-trivial. Expect prompt-cache billing accuracy to become a procurement checkbox.
4. **The agentic CLI ecosystem is now a first-class integration target.** CCR and CC Switch exist entirely for Claude Code/Codex routing; a single upstream header change (`x-opencode-session`, enforced 2026-09-05/06) broke one router and was preemptively fixed in the other within days. Watch for config-overwrite hazards (CC Switch #6875 destroys `~/.codex/` state).
5. **Security moves up the stack.** Unsloth shipped a prompt-injection-to-RCE fix for markerless tool calls; LiteLLM cosigns images; Ollama is staging model signing. Local agents with shell/tool access are a real attack surface — patch Studio installs immediately.
6. **Non-NVIDIA momentum is compounding.** Vulkan as default backend (Unsloth, +20%), ROCm 10 CI consolidation (SGLang), aiter DCP, CANN 9.1 NPU suites, DeepSeek-V4 on CPU. Multi-vendor is shifting from parity project to shipped capability.
7. **AI-generated contributions are scaling.** New API's maintainers triaged a coordinated flood of agent-authored PRs of decent quality — review burden, especially on billing paths, is the new operational cost.

**Watch list for developers:** vLLM PR #52244 (hybrid prefix cache) and the MRV2 logprobs RFC #42259; SGLang #33549 verification for long-context DeepSeek-V4; Ollama v0.32.9 as the last-good AMD iGPU pin; Unsloth PR #10507 (RCE); New API rc.30–35 billing reconciliation; CCR #1780/#1781 if you route to opencode-go or Meta Responses tool flows.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-09

## Today's Highlights

**v0.29.0 shipped** with 594 commits from 277 contributors (91 new), promoting **Model Runner V2 to the default for all models** — a major architectural milestone that also lands CUDA graph memory profiling for KV cache auto-sizing. The community is simultaneously filing a cluster of serious **prefix-cache regressions on hybrid Mamba/GDN models under speculative decoding (MTP/EAGLE)**, reporting 30–40% throughput loss when prompts are replayed, and several **Blackwell (sm_120) and GB10 (sm_121) crashes** tied to FlashInfer attention and Qwen3.8-Flash-Next numerics.

---

## Releases & Breaking Changes

- **v0.29.0 released** — [release notes](https://github.com/vllm-project/vllm/releases/tag/v0.29.0)
  - *Model Runner V2 (MRV2) is now default for all models* (PR [#53183](https://github.com/vllm-project/vllm/pull/53183)). Previously only pooling models used MRV2 by default.
  - MRV2 gains CUDA graph memory profiling for KV cache auto-sizing.
  - **Migration note:** Existing V1-specific logs/logprobs assumptions should be re-verified — see the new [MRV2 logprobs/logits semantics RFC #42259](https://github.com/vllm-project/vllm/issues/42259).

---

## New Model & Hardware Support

- **Gemma4 QKV-Fuser** enabled on the Transformers backend — fuses `q/k/v` projections into a single `QKVParallelLinear` GEMM ([PR #55690](https://github.com/vllm-project/vllm/pull/55690)).
- **BailingMoeV2 RoPE fix** for Transformers v5 compatibility — merges top-level `rope_theta` into `rope_parameters` ([PR #56066](https://github.com/vllm-project/vllm/pull/56066)).
- **Qwen3-VL(-MoE) pipeline parallelism** bug fix — engine init now succeeds with `--pipeline-parallel-size > 1` ([PR #43272](https://github.com/vllm-project/vllm/pull/43272), fixes [#43271](https://github.com/vllm-project/vllm/issues/43271)).
- **Mistral/Magistral reasoning parser** added to the Rust frontend ([PR #48013](https://github.com/vllm-project/vllm/pull/48013), part of Rust parity [#44280](https://github.com/vllm-project/vllm/issues/44280)).
- **XPU NVFP4 quantization** — `EmulationNvFp4LinearKernel` now registered so NVFP4 checkpoints load on Intel GPUs ([PR #56060](https://github.com/vllm-project/vllm/pull/56060)).
- **DeepSeek-V4-Flash / -Flash-0731 SM8x (Ampere) support** — still **OPEN**, no fix ([#50576](https://github.com/vllm-project/vllm/issues/50576), 14 👍, 106 comments).

---

## Performance & Optimization

- **MTP/EAGLE prefix-cache hit loss on Qwen3.8 GDN** — first repeat of a prompt misses cache and re-prefills in full; ~30–40% batch throughput loss on prefix-reusing workloads ([#53670](https://github.com/vllm-project/vllm/issues/53670)). Fix candidate: [PR #52244](https://github.com/vllm-project/vllm/pull/52244) restores hybrid GDN prefix-cache hits under MTP spec decoding.
- **ROCm sparse prefill MQA logits fill skipped** — passes `clean_logits=False` to AITER, removes an FP32 `-inf` fill per step ([PR #51314](https://github.com/vllm-project/vllm/pull/51314)).
- **ROCm DSA indexer prologue fused with AITER** — collapses K-norm / RoPE / FP8 quant / K-cache write into one kernel ([PR #51315](https://github.com/vllm-project/vllm/pull/51315)).
- **XPU W8A8 block-FP8 GEMM tuned for Arc Pro B70** — ships tuned Triton configs for `block_shape=[128,128]` ([PR #56063](https://github.com/vllm-project/vllm/pull/56063)).
- **CUTLASS Lamport GEMM + AllReduce integration proposed** for SM100/Blackwell — would replace the existing GEMM-Reduction split-kernel path ([#55261](https://github.com/vllm-project/vllm/issues/55261)).
- **Helion for selected vLLM CustomOps (ROCm RFC)** — three benchmarked Helion kernels achieve **1.382–1.785× geomean speedup on H100** vs. current CUDA implementations ([#53788](https://github.com/vllm-project/vllm/issues/53788)).
- **KV-offload tiering observability** — new `vllm:kv_offload_tiering_promotion_latency_seconds` histogram, labeled by tier, buckets 100µs→10s ([PR #53910](https://github.com/vllm-project/vllm/pull/53910)).
- **KV offload `block`→`chunk` rename** — disambiguates GPU allocator unit vs. offload transfer unit ([PR #52615](https://github.com/vllm-project/vllm/pull/52615)).
- **Frontend: defer reasoning usage recounts** — avoids re-decoding entire history on every delta for non-continuous chat streams ([PR #56067](https://github.com/vllm-project/vllm/pull/56067)).

---

## Stability & Regressions

🔴 **High severity**
- **FlashInfer attention: CUDA illegal memory access on sm_120 with NVFP4 + fp8 KV cache** — crashes on a 16-token request; `TRITON_ATTN` unaffected. Affects RTX PRO 6000 Blackwell Max-Q on vLLM 0.27.1 ([#54225](https://github.com/vllm-project/vllm/issues/54225)).
- **Qwen3.8-Flash-Next: CUBLAS_STATUS_INTERNAL_ERROR / illegal memory access in GDN path with prefix caching on GB10 (sm_121)**; `--no-async-scheduling` does not help ([#54173](https://github.com/vllm-project/vllm/issues/54173)).
- **Hybrid mamba align precopy: illegal memory access on prefix-cache resume with explicit `--block-size`** — Mamba state column seeded with wrong block size ([#53142](https://github.com/vllm-project/vllm/issues/53142)). *No fix PR linked.*
- **Qwen3.8-Flash-Next: non-deterministic greedy decoding from `persistent_topk`** in prefill when prompt length nears `indexer_budget` (Qwen Sparse Attention dense→top-k switch) on sm_121/GB10 — five identical requests, five different completions ([#54521](https://github.com/vllm-project/vllm/issues/54521)).
- **Recurring Xid 13 chip-wide warp errors on SM120** under sustained multi-hour Nemotron-3.5-Lightning-30B-A3B-NVFP4 + marlin MoE + hybrid Mamba ([#52225](https://github.com/vllm-project/vllm/issues/52225)).
- **`persistent_topk` silently drops top-k candidates** when many values share a coarse histogram bin — observed on B300 (sm_103) ([#51782](https://github.com/vllm-project/vllm/issues/51782)).

🟠 **Medium**
- **`thinking_token_budget` ignored by Model Runner V2 with Qwen3.8 NVFP4 + MTP** — tool-calling budget miscount ([#54906](https://github.com/vllm-project/vllm/issues/54906)).
- **Host memory not released after loading model on Intel XPU** ([#50269](https://github.com/vllm-project/vllm/issues/50269)).
- **Structured-output (-1 padded spec-decoding tokens) can crash engine** when entering the grammar — invalid `token_id`s stop the engine ([#51450](https://github.com/vllm-project/vllm/pull/51450) proposes fix).

⚪ **Closed / informational**
- Intel Arc B50 (Battlemage) TP=2 `zeMemOpenIpcHandle` crash — **closed** ([#48953](https://github.com/vllm-project/vllm/issues/48953)).
- Rust frontend feature parity tracking — **closed** as roadmap issue ([#44280](https://github.com/vllm-project/vllm/issues/44280)); work continues via sub-issues.
- Partial cache hits for hybrid models RFC — **closed** ([#45702](https://github.com/vllm-project/vllm/issues/45702)).

---

## What This Means for Application Developers

1. **Pin and validate before upgrading to v0.29.0.** MRV2 default means sampler semantics, logprobs ordering, and `thinking_token_budget` behavior can shift; check the open [logprobs/logits determinism RFC #42259](https://github.com/vllm-project/vllm/issues/42259) and reproduce any RL/eval pipelines against the new runner.
2. **Hold off on speculative decoding for hybrid Qwen3.8 GDN/Mamba workloads until [PR #52244](https://github.com/vllm-project/vllm/pull/52244) lands** — first-prompt prefix-cache misses can cost the entire prefill; for production agents this is a serious tail-latency issue.
3. **Blackwell sm_120 + GB10 sm_121 users: do not enable FlashInfer attention with NVFP4 + fp8 KV cache on 0.27.1.** Use `TRITON_ATTN` or wait for the fix in 0.29.x. The `persistent_topk` and prefix-cache precopy crashes will produce hangs or wrong outputs without clear errors.
4. **Tool-calling on Qwen3.8 reasoning models with NVFP4+MTP:** verify `thinking_token_budget` enforcement — it is silently dropped under MRV2 ([#54906](https://github.com/vllm-project/vllm/issues/54906)).
5. **For ROCm deployments**, the AITER-backed sparse prefill and fused DSA indexer paths ([PR #51314](https://github.com/vllm-project/vllm/pull/51314), [#51315](https://github.com/vllm-project/vllm-project/vllm/pull/51315)) are worth backporting via custom builds, and the Helion proposal ([#53788](https://github.com/vllm-project/vllm/issues/53788)) is worth tracking if you target H100.
6. **Context-aware KV-cache retention (prioritized eviction)** for agentic workloads is in active RFC ([#37003](https://github.com/vllm-project/vllm/issues/37003)) — if you serve tool-using agents, this is the API to watch for breaking prefix-cache behavior.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-09

## Today's Highlights

- **Weight Cache Daemon momentum** — Phase 1 (per-rank CUDA-IPC daemon, <1s weight load for Qwen3-235B FP8) is shipping, and the roadmap thread (#33522, 23 comments) is now actively planning further recovery optimizations. [#33522](https://github.com/sgl-project/sglang/issues/33522)
- **Two production-blocking correctness bugs surface** — DeepSeek-V4 TP8 hangs at ~245K context with all GPUs pinned at 100% (#33549), and a ~4% decode regression on DeepSeek-R1 NVFP4 was traced to the unified `tiny_gemm` swap in #34693 (#38628). PR #38565 lands a deterministic top-p/top-k fix that is the root cause of the DFlash/DSpark TP>1 deadlocks.
- **Platform consolidation across AMD, NPU, and CPU** — AMD CI is collapsing onto ROCm 10 (#38632), NPU CI gains CANN 9.1.0 coverage (#38332), and aiter gains DCP support (#34432), while CPU and NPU paths continue gaining first-class DSv4/GLM-5.2/Kimi-K3 features.

## Releases & Breaking Changes

No new releases in the last 24 hours. No breaking API/config changes announced.

## New Model & Hardware Support

- **Diffusion / VDN-H3** — Support added for OpenVDN `vdn-minimax-h3` (MiniMax-H3 hybrid window-softmax + Video Delta linear attention, 8-NFE DMD2 distill) via a new `hybrid_window_attn_h3` backend. [#37903](https://github.com/sgl-project/sglang/pull/37903)
- **CPU sgl-kernel for DeepSeek-V4** — Part I: flash-MLA-with-KV-cache attention (FP8 KV, sparse), FusedMoE, and group-GEMM. [#32222](https://github.com/sgl-project/sglang/pull/32222)
- **Diffusion AMX optimizations for CPU** — Re-land of #28527 with the duplicate-`process_weight_after_loading` issue fixed. [#30719](https://github.com/sgl-project/sglang/pull/30719)
- **AMD/ROCm** — Aiter backend gains Decode Context Parallelism (DCP) (Part 1/N) [#34432](https://github.com/sgl-project/sglang/pull/34432); aiter asm paged-varlen FP8 page-64 prefill for gfx950 [#36505](https://github.com/sgl-project/sglang/pull/36505); DeepSeek-V4 unified KV in UMBP/Mooncake direct external linkers [#38269](https://github.com/sgl-project/sglang/pull/38269).
- **NPU** — GLM-5.2 inference on 950PR/DT with FP8 KV + MLAProlog plus reduced indexer cache footprint [#38250](https://github.com/sgl-project/sglang/pull/38250); GLM HiCache integrated with memfabric memcache [#38200](https://github.com/sgl-project/sglang/pull/38200); CANN 9.1.0 nightly suites mirroring DSv4-Flash, GLM-5.2, Kimi-K3 tests [#38332](https://github.com/sgl-project/sglang/pull/38332); router GEMM fp32 follow-up [#34861](https://github.com/sgl-project/sglang/issues/34861).
- **CI** — AMD workflows consolidated onto ROCm 10 (ROCm 7 fallback removed). [#38632](https://github.com/sgl-project/sglang/pull/38632)
- **Model tracking (open)** — SenseNova-U1/U1.5 [#37742](https://github.com/sgl-project/sglang/issues/37742); diffusion: ideogram4 / JoyEcho ✅, `nvidia/omni-dreams` ⏳ [#27214](https://github.com/sgl-project/sglang/issues/27214).

## Performance & Optimization

- **Weight Cache Daemon (roadmap)** — Phase 1 result: weight load Qwen3-235B FP8 dropped from ~306–327s to <1s; Phase 2 now being scoped. [#33522](https://github.com/sgl-project/sglang/issues/33522)
- **Deterministic sampling** — `sgl_kernel.top_p_renorm_probs` / `top_k_renorm_probs` now deterministic by default, eliminating TP rank divergence that caused DFlash/DSpark TP>1 deadlocks (#33549, #33289). [#38565](https://github.com/sgl-project/sglang/pull/38565)
- **Long-context DSA** — Reworked the top-k v2 cluster path for the small-batch / 512k-token regime where the GPU is otherwise idle. [#38640](https://github.com/sgl-project/sglang/pull/38640)
- **dLLM scheduling** — Prefill chunk size decoupled from decode block size so long prompts can advance multiple blocks per scheduler round. [#31586](https://github.com/sgl-project/sglang/pull/31586) (closes the perf goal from #24644 / #24645).
- **HiCache** — Decode-side HiCache now works for hybrid SWA models and Mamba/SSM models under the unified radix tree. [#38634](https://github.com/sgl-project/sglang/pull/38634)
- **Kimi multimodal** — `_gpu_preprocess_images` no longer accumulates full fp32 patch tensors per request before `torch.cat`. [#34987](https://github.com/sgl-project/sglang/pull/34987)
- **Observability** — Mooncake per-request context now propagated through the store RPC for end-to-end request tracing through HiCache KV read/write. [#37976](https://github.com/sgl-project/sglang/pull/37976)
- **Memory accounting** — Unified-memory allocator now evicts Full KV on Mamba byte shortfalls instead of leaking. [#36713](https://github.com/sgl-project/sglang/pull/36713)
- **AITER** — Open PR readiness tracker continues; per-version feature/uptake accounting. [#21302](https://github.com/sgl-project/sglang/issues/21302)

## Stability & Regressions

Ranked roughly by severity for production deployments.

1. **DeepSeek-V4 (dsv4 + DSPARK), TP=8 on 8×H20: decode hangs indefinitely at ~245K context** — all GPUs at 100% util / low power; watchdog kills the server. PR #38565 fixes the underlying TP divergence, but per-issue work is still open. [#33549](https://github.com/sgl-project/sglang/issues/33549) · partial fix: [#38565](https://github.com/sgl-project/sglang/pull/38565)
2. **GLM-5.2 FP4 + EAGLE (nextn draft MoE) — illegal memory access in flashinfer_trtllm bf16 batched-GEMM on B200/B300** — Triton nextn default is HIP-gated after #30137. [#30209](https://github.com/sgl-project/sglang/issues/30209) — no fix PR linked.
3. **`tiny_gemm` regresses DeepSeek-R1 NVFP4 decode ~4% on Blackwell** (vs the faster standalone kernel); cause traced to PR #34693 / `cb6dd58`. PR notes: do **not** just revert. [#38628](https://github.com/sgl-project/sglang/issues/38628)
4. **MegaMoE sparse-DP hang under SUM_LEN prefill CUDA-graph replay** — fixed by keeping a shared MAX_LEN bucket when the graph captures a DP gather. [#37933](https://github.com/sgl-project/sglang/pull/37933) closes [#37561](https://github.com/sgl-project/sglang/issues/37561).
5. **DFLASH/DSPARK draft KV pool uses `tp_size` instead of `attn_tp_size`** → OOM under DP attention on Kimi-K3. [#38202](https://github.com/sgl-project/sglang/issues/38202)
6. **`max_running_requests` (4096) and `cuda_graph_max_bs` (32) are derived independently** → crossing the graph ceiling is an absorbing state. [#33483](https://github.com/sgl-project/sglang/issues/33483)
7. **Kimi-K3 strict tool-call grammar** — `additionalProperties` dilutes a named property's type constraint under xgrammar. [#38587](https://github.com/sgl-project/sglang/issues/38587) (new today).
8. **Kimi-K3 `tool_choice=required` hangs until ReadTimeout** in 2P2D TP8/DCP8 deployment. [#37430](https://github.com/sgl-project/sglang/issues/37430)
9. **FlashInfer backend unsupported on Blackwell** — users still selecting it via `--attention-backend flashinfer` for MLA hit the failure path with no warning. Closed-mitigation PR: warn on MLA + SM100. [#35080](https://github.com/sgl-project/sglang/issues/35080) · [#26557](https://github.com/sgl-project/sglang/pull/26557)
10. **Rust TreeCore (v0.5.19) e2e regression at concurrency** on small dense model with short shared prefix vs the Python TreeCore. [#38536](https://github.com/sgl-project/sglang/issues/38536)
11. **Diffusion native-fallback loading silently drops CPU-offload decisions** (incl. `--text-encoder-cpu-offload`) → OOM on 8GB GPUs. [#34772](https://github.com/sgl-project/sglang/issues/34772)
12. **Anthropic endpoint** — `output_config.effort` forwarded unvalidated → 500; `xhigh` is unreachable. [#36741](https://github.com/sgl-project/sglang/issues/36741)
13. **Prefill breakable CUDA graph reuses weak-ref'd break inputs across buckets** → wrong greedy output / IMA; end-to-end validation of #37448. [#37606](https://github.com/sgl-project/sglang/issues/37606)
14. **CI status** — auto-update at 2026-09-09 11:19 UTC: 1 broken, 10 flaky, 972 recently fixed. [#17050](https://github.com/sgl-project/sglang/issues/17050)

## What This Means for Application Developers

- **DeepSeek-V4 / DSPARK is still risky at long context (≥245K) on 8×H20.** If you operate on this stack, hold long-context DSPARK traffic off production until #33549 + #38565 are verified on your deployment, and consider falling back to plain DSv4 decoding.
- **DFlash / DSpark with TP>1 just got safer to deploy** with #38565. Previously you needed the #33614 broadcast workaround; that workaround should now be removable.
- **Sampling determinism** is now a kernel-level guarantee rather than relying on broadcast workarounds — useful for reproducible evals and tracing replay.
- **Prefix caching gains a per-request opt-out** (`skip_cache_insert`). Useful for workloads with high-entropy prefixes or for A/B tests that need to isolate caching effects. [#38069](https://github.com/sgl-project/sglang/issues/38069)
- **HiCache observability** is meaningfully better on Mooncake — request context now survives the KV read/write RPC, so end-to-end tracing for HiCache paths is finally tractable. [#37976](https://github.com/sgl-project/sglang/pull/37976)
- **dLLM long-prompt latency** should drop materially once #31586 lands, since prefill no longer advances one decode-block per scheduler tick. Worth re-benchmarking any dLLM serving path.
- **Watch the Kimi-K3 tool-calling story** — two related defects (strict grammar [#38587](https://github.com/sgl-project/sglang/issues/38587) and `tool_choice=required` 2P2D hang [#37430](https://github.com/sgl-project/sglang/issues/37430)) are still open; pin a known-good build if you're shipping agentic workloads on Kimi-K3 today.
- **Diffusion on small-GPU boxes (≤8GB)** is fragile: the native-fallback path silently drops CPU-offload flags ([#34772](https://github.com/sgl-project/sglang/issues/34772)). Avoid relying on fall-through loading when offload flags are set.
-

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-09

## Today's Highlights
The most consequential change is the **final removal of legacy `--mmap` / `--mlock` / `--direct-io` CLI flags** in [b10875 / #28334](https://github.com/ggml-org/llama.cpp/pull/28334), completing the migration to the unified `--load-mode` flag. On the perf side, Vulkan continues to mature on AMD: a new iq4_xs mat-vec shader ([#28426](https://github.com/ggml-org/llama.cpp/pull/28426)) yields ~6–17% tok/s on RDNA4, and an int8 coopmat1 matmul ([#27952](https://github.com/ggml-org/llama.cpp/pull/27952)) covers q4/q5/q8/q3_k/q4_k/q5_k/q6_k/mxfp4/nvfp4/iq4_nl on RDNA3/4. Stability concerns are mounting around **CUDA on RTX 5090 / sm_120**, with multiple open issues covering GPU hangs, full-chip resets, and broken mmq builds.

## Releases & Breaking Changes
- **[b10875](https://github.com/ggml-org/llama.cpp/releases/tag/b10875)** — Officially deprecates `--mmap`/`--mlock`/`--direct-io` ([#28334](https://github.com/ggml-org/llama.cpp/pull/28334)). Users must migrate to `--load-mode`. Already merged.
- **[b10867](https://github.com/ggml-org/llama.cpp/releases/tag/b10867)** — Disables lazy tensor loading by default on iGPUs ([#28326](https://github.com/ggml-org/llama.cpp/pull/28326)). Addresses prior iGPU regression noted in [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) (pp512 halved for qwen4exp on AMD iGPU / Vulkan).
- **[b10865](https://github.com/ggml-org/llama.cpp/releases/tag/b10865)** — Reverts HIP `prop.integrated` restoration ([#28604](https://github.com/ggml-org/llama.cpp/pull/28604)).
- **[b10874](https://github.com/ggml-org/llama.cpp/releases/tag/b10874)** — Granite 3 MoE parameter count fix ([#28632](https://github.com/ggml-org/llama.cpp/pull/28632)); follow-up [#28643](https://github.com/ggml-org/llama.cpp/pull/28643) widens this to the whole Granite family.
- **[b10872](https://github.com/ggml-org/llama.cpp/releases/tag/b10872)** — Jinja: `null in <map>` now returns `false` instead of erroring ([#28620](https://github.com/ggml-org/llama.cpp/pull/28620)). Affects templates that default optionals to `none`.
- **[b10873](https://github.com/ggml-org/llama.cpp/releases/tag/b10873)** — mtmd: propagate video ID to bitmap ([#28601](https://github.com/ggml-org/llama.cpp/pull/28601)).

## New Model & Hardware Support
- **GLM-5.3-Flash MTP** drafting support in progress ([#27917](https://github.com/ggml-org/llama.cpp/pull/27917)) alongside [#27922](https://github.com/ggml-org/llama.cpp/issues/27922) (15 👍).
- **HRM-Text / DFM Mimir 1B** (`HrmTextForCausalLM`) conversion & inference — open PR [#27625](https://github.com/ggml-org/llama.cpp/pull/27625).
- **NVFP4 W4A8 forced path on Blackwell** for NVFP4_W4A16 layers ([#24364](https://github.com/ggml-org/llama.cpp/pull/24364)).
- **IQ-type handling for MoE** landed in [b10868](https://github.com/ggml-org/llama.cpp/releases/tag/b10868) / [#28476](https://github.com/ggml-org/llama.cpp/pull/28476).
- **Quantization correctness**: gguf-py fix for sign-loss on wide-tensor Q8_0/TQ1_0/TQ2_0 (NumPy ≥2 temporary elision regression) — [#28523](https://github.com/ggml-org/llama.cpp/pull/28523).
- **CPU backends**: RISC-V Q4_0 8×8 gemv/gemm for `vlenb=16` ([#28642](https://github.com/ggml-org/llama.cpp/pull/28642)); s390x Q1_0 vector intrinsics ([#28606](https://github.com/ggml-org/llama.cpp/pull/28606)); ARM Q1_0 4×4/4×8 NEON repack ([#23492](https://github.com/ggml-org/llama.cpp/pull/23492)); Apple Metal — wide query tile in FA ([#28439](https://github.com/ggml-org/llama.cpp/pull/28439)).
- **OpenVINO**: cacheless encoder models on NPU, GPU MoE expert fusion + grouped 8-bit requant, weight spilling — [#28638](https://github.com/ggml-org/llama.cpp/pull/28638).
- **Metal multi-GPU on Intel Macs** (eGPU + dGPU) requested — [#28565](https://github.com/ggml-org/llama.cpp/issues/28565).
- **XDNA backend** request still open — [#21725](https://github.com/ggml-org/llama.cpp/issues/21725) (32 👍).
- **RDMA over RPC backends** still open — [#9493](https://github.com/ggml-org/llama.cpp/issues/9493).

## Performance & Optimization
- **Vulkan / AMD RDNA4**: dedicated iq4_xs mat-vec shader → **+6–17% token generation** ([b10871](https://github.com/ggml-org/llama.cpp/releases/tag/b10871) / [#28426](https://github.com/ggml-org/llama.cpp/pull/28426)).
- **Vulkan / AMD RDNA3 & RDNA4**: int8 coopmat1 matmul ([#27952](https://github.com/ggml-org/llama.cpp/pull/27952)) reportedly improves Strix Halo prompt processing.
- **Vulkan / Intel coopmat1**: f16 B-type matmul pipelines + warp-tile tuning ([b10870](https://github.com/ggml-org/llama.cpp/releases/tag/b10870) / [#27471](https://github.com/ggml-org/llama.cpp/pull/27471)).
- **Vulkan / Strix Halo**: mat-vec row tuning for batched inference ([#27909](https://github.com/ggml-org/llama.cpp/pull/27909)).
- **CUDA RDNA3 / MoE MMQ N-tile sizing** ([#28552](https://github.com/ggml-org/llama.cpp/pull/28552)) — refinement of routed-expert tile selection.
- **CUDA Flash Attention build control**: `GGML_FA_ALL_QUANTS` → `GGML_FA_QUANTS` to trim compile matrix ([#28079](https://github.com/ggml-org/llama.cpp/pull/28079)).
- **Metal FA**: query tile 8→16 rows for `ne01 ≥ 64`; **+6.8% at 32 rows** on M5 ([#28439](https://github.com/ggml-org/llama.cpp/pull/28439)).
- **Metal fusion rewrite**: single-source `ggml_metal_fuse` table + `gated_delta_net` cache fusion ([#28164](https://github.com/ggml-org/llama.cpp/pull/28164)).
- **CPU VNNI tiled mul_mat for k-quants**: **3–7× CPU mul_mat speedup** claimed ([#27851](https://github.com/ggml-org/llama.cpp/pull/27851)).
- **s390x Q1_0 intrinsics**: **+139.53% PP, +131.59% TG** ([#28606](https://github.com/ggml-org/llama.cpp/pull/28606)).
- **OpenVINO stateful decode + GPU MoE**: improved KV-cache handling (sliding window, per-layer heads), compressed expert fusion ([#28638](https://github.com/ggml-org/llama.cpp/pull/28638)).
- **Test init cost**: data-init thread count now scales with element count ([#28325](https://github.com/ggml-org/llama.cpp/pull/28325)).

## Stability & Regressions
Ranked by likely impact:

1. **[#27330](https://github.com/ggml-org/llama.cpp/issues/27330) — OPEN, severe** — CUDA graphs hang the GPU channel on **RTX 5090 Laptop (sm_120)**, triggering RC watchdog + Xid 8; `GGML_CUDA_DISABLE_GRAPHS=1` is a complete workaround.
2. **[#27910](https://github.com/ggml-org/llama.cpp/issues/27910) — OPEN** — **RTX 5090** display black-out + NVIDIA GSP / full-chip reset when running Qwen3.8-27B Q6_K under Linux (reproducible via Codex/DeepSeek Harness).
3. **[#18363](https://github.com/ggml-org/llama.cpp/issues/18363) — CLOSED** — CUDA mmq build broken for compute capability 120 (sm_120) — fixed in tree.
4. **[#26845](https://github.com/ggml-org/llama.cpp/issues/26845) — CLOSED** — **SYCL** garbage on second prompt (Intel Arc Pro B60, KAT-Coder-V2.5).
5. **[#28211](https://github.com/ggml-org/llama.cpp/issues/28211) — OPEN, correctness** — HIP/ROCm on **gfx1151 / Strix Halo APU** produces **wrong logits** (not a crash) when prompt length > `n_ubatch`.
6. **[#26425](https://github.com/ggml-org/llama.cpp/issues/26425) — OPEN** — MTP retains inter-request state causing **non-deterministic output and model degradation** (Qwen3.6-35B-A3B-MTP).
7. **[#27296](https://github.com/ggml-org/llama.cpp/issues/27296) — OPEN** — MTP breaks long/short inference consistency.
8. **[#23268](https://github.com/ggml-org/llama.cpp/issues/23268) — CLOSED** — Speculative decoding intermittent timeout on Vulkan (AMD 395, Qwen3.6-35B-A3B-UD-Q8_K_XL).
9. **[#28581](https://github.com/ggml-org/llama.cpp/issues/28581) — OPEN** — **IQ3_S** produces garbage on RTX 5060 Ti 16GB (Blackwell).
10. **[#26285](https://github.com/ggml-org/llama.cpp/issues/26285) — CLOSED** — MMQ incorrectly disabled on **RTX 3090** due to shared-memory threshold; prefill fell back to slow path.
11. **[#28522](https://github.com/ggml-org/llama.cpp/issues/28522) — CLOSED** — Parallel `tool_calls` mangled or hang on Qwen models with ~48 optional params.
12. **[#28580](https://github.com/ggml-org/llama.cpp/issues/28580) — CLOSED** — Server `input_video` cache poisoning: frames reused across requests because video bitmaps lacked a sha256 id (images had one). Affects any agent serving OpenAI-compatible video prompts.
13. **[#28160](https://github.com/ggml-org/llama.cpp/issues/28160) — CLOSED** — Vulkan (AMD iGPU) pp512 regression under default `--lazy-mode auto`; mitigated by [b10867](https://github.com/ggml-org/llama.cpp/releases/tag/b10867).
14. **[#28635](https://github.com/ggml-org/llama.cpp/issues/28635) — OPEN** — Adreno 830 Vulkan: `vkCreateComputePipelines VK_ERROR_UNKNOWN` for `mul_mat_vec_q4_k` traced to shaderc/NDK producing non-deterministic SPIR-V.
15. **[#28234](https://github.com/ggml-org/llama.cpp/issues/28234) — OPEN** — Vulkan shader-optimizer failure on Termux.
16. **[#27849](https://github.com/ggml-org/llama.cpp/issues/27849) — CLOSED** — Vulkan crash on prompt read (Intel Meteor Lake iGPU).
17. **[#27835](https://github.com/ggml-org/llama.cpp/issues/27835) — OPEN** — `llama-server` crashes under concurrent CUDA connections (RTX PRO 6000 Blackwell).
18. **[#27953](https://github.com/ggml-org/llama.cpp/issues/27953) — OPEN** — Qwen Next Flash Attention over-allocates compute buffer on mixed GPU setups (≥3 GPUs).
19. **[#28640](https://github.com/ggml-org/llama.cpp/pull/28640) — MERGED** — Fix for SM70 (V100 Volta) FA crash on non-standard head dims (e.g., Mistral-4).

## What This Means for Application Developers
- **Migration action item**: Audit your launch scripts and tool wrappers for `--mm

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-09

## 1. Today's Highlights

The dominant theme in the last 24 hours is **hardware regressions on AMD/Vulkan paths** and **MLX runner stabilization** ahead of (presumably) a near-term release. Multiple confirmed regressions on AMD Radeon iGPUs (780M, 9060 XT) and on Vulkan command submission with large (66 GB) models were updated or filed, while the maintainers landed fixes for MLX prefix-cache re-prefill cost (17–27 s) and MLX compile-cache log spam on Windows. On the enablement side, Intel Level Zero refinement for Arc Discrete GPUs on Linux (PR [#18333](https://github.com/ollama/ollama/pull/18333)) and a unified GGUF metadata cache (PR [#17858](https://github.com/ollama/ollama/pull/17858)) both moved forward.

## 2. Releases & Breaking Changes

No new releases in the last 24 hours. Several merged-but-closed PRs (#18329, #18328, #18309, #18332, #18330, #18179) were rolled into other in-flight branches rather than shipped standalone — no public version bump implied.

## 3. New Model & Hardware Support

- **Intel Arc Discrete GPUs on Linux via Vulkan + Level Zero** ([PR #18333](https://github.com/ollama/ollama/pull/18333)) — non-intrusive refinement layer using `libze.so.1` / `libze_intel_gpu.so.1` to detect Intel Arc B70 32 GB and similar parts on the Vulkan path. Worth tracking for Intel-GPU Ollama deployments.
- **Model signing initiative** ([PR #11573](https://github.com/ollama/ollama/pull/11573)) still in flight, child PR [#11526](https://github.com/ollama/ollama/pull/11526) merged for the signing primitives; integrity verification before model load is being staged.
- **Cloud model catalog requests** ([Issue #17100](https://github.com/ollama/ollama/issues/17100)) — community request for Ornith, Longcat 2.0, Mimo v2.5/pro, Olmo 3.1, Laguna xs 2.1, Hunyuan Hy3, Jamba, Step 3.7 on Ollama Cloud.
- **IQ3_S for Qwen3.8-27B-GSQ-RCO-GGUF** ([Issue #18297](https://github.com/ollama/ollama/issues/18297)) — user reports `done_reason: stop` but **empty `content`**; effectively broken on this quant today.

## 4. Performance & Optimization

- **GGUF metadata extraction & capability unification** ([PR #17858](https://github.com/ollama/ollama/pull/17858)) — metadata is now extracted once per blob and cached at `<OLLAMA_MODELS>/metadata/sha256-<hex>.json`, replacing two divergent caches that also produced inconsistent capability results across models. Material startup / `ollama show` / API handshakes improvement, and the deduplication of capabilities fixes correctness for some models.
- **MLX prefix-cache restore, fixed** ([Issue #18267](https://github.com/ollama/ollama/issues/18267), closed) — restore was always landing on a multiple of 8192 tokens below the matched prefix, causing a fixed 17–27 s re-prefill on every cold turn of agent workloads (Claude Code against a local model). Fix is in.
- **MLX array lifetime scoping** ([PR #18327](https://github.com/ollama/ollama/pull/18327)) — replaces global "pin + sweep" with scoped lifetimes; eliminates the long-running memory accumulation path the prefix-cache eviction was hitting. Important for long-lived MLX serve sessions.
- **MLX compile-cache log spam on non-MLX Windows** ([PR #18335](https://github.com/ollama/ollama/pull/18335), closes [#18283](https://github.com/ollama/ollama/issues/18283)) — lazy symbol resolution instead of `CHECK failed: mlx_compile_cache_new_` printed to stderr on every `ollama` invocation.
- **macOS app lifecycle** ([PR #17558](https://github.com/ollama/ollama/pull/17558)) — window-close now hides the app instead of leaving it in the Dock. UX, not perf, but worth noting for headless setups where the menu bar icon was persisting.

## 5. Stability & Regressions

Ranked roughly by blast radius:

- **🔴 Vulkan regression on AMD iGPU — "Not enough memory for command submission"** ([Issue #18272](https://github.com/ollama/ollama/issues/18272)). Works on **v0.32.9**, fails on **v0.32.12+** with a 66 GB model on AMD iGPU. **No fix PR yet.** If you pin to AMD iGPU on Linux/Win11, hold at v0.32.9 until this is resolved.
- **🔴 AMD Radeon 780M Vulkan regression ≥ v0.32.10** ([Issue #17748](https://github.com/ollama/ollama/issues/17748), 👍 3). Same `radv/amdgpu: Not enough memory for command submission` / `vk::Queue::submit: ErrorDeviceLost` failure mode. No fix PR.
- **🔴 ROCm `TensileLibrary_lazy_gfx1200.dat` load failure on rx 9060 XT 16 GB** ([Issue #17782](https://github.com/ollama/ollama/issues/17782)). Affects `qwen3.8:27b` after running for a while; appears to be a mid-session ROCm/library unload issue rather than a startup failure. No fix PR.
- **🟠 qwen2.5-coder:3b-instruct broken low-bit quants** ([Issue #18252](https://github.com/ollama/ollama/issues/18252)). `q2_K`, `q3_K_S`, `q3_K_M`, `q3_K_L` all return fluent but functionally useless output (0/15 on a HumanEval+ smoke suite); sibling higher-bit quants are unaffected. Suggests a model-side or registry artifact problem; track before recommending these tags in CI.
- **🟠 `gemma3:12b` structured output truncates on double-quoted input** ([Issue #18094](https://github.com/ollama/ollama/issues/18094)). Premature `done_reason: stop` with low `eval_count` when JSON-schema `format` encounters `"` in source text. Affects any extraction agent on this model.
- **🟠 `glm-5.3:cloud` enters endless reasoning and aborts** ([Issue #18193](https://github.com/ollama/ollama/issues/18193)). Reproduces through OpenCode and ZCode against the Ollama Cloud endpoint; Z.AI's official API is unaffected. No fix PR.
- **🟡 Codex/Claude Desktop integration regressions** — [#16177](https://github.com/ollama/ollama/issues/16177) (Codex native pipe trust broken by `ollama launch codex-app`), [#18188](https://github.com/ollama/ollama/issues/18188) ("Restart Claude Desktop" toggle silently reverts, no gateway config written). Multiple related proxy PRs ([#18331](https://github.com/ollama/ollama/pull/18331), [#18332](https://github.com/ollama/ollama/pull/18332)) were iterated on and closed within the day, suggesting the fixes were folded into a larger branch.
- **🟡 `IQ3_S` returns empty content** for `Qwen3.8-27B-GSQ-RCO-GGUF` ([Issue #18297](https://github.com/ollama/ollama/issues/18297)). Looks like a quant-loading path regression; treat this tag as unusable until confirmed.
- **🟢 Closed-but-watchlist**: [#1599](https://github.com/ollama/ollama/issues/1599) (partially downloaded model cleanup), [#16821](https://github.com/ollama/ollama/issues/16821) (Gemma/Qwen native function calling with OpenWebUI), [#16773](https://github.com/ollama/ollama/issues/16773) (cloud 403 surfacing), [#18267](https://github.com/ollama/ollama/issues/18267) (MLX prefill), [#18283](https://github.com/ollama/ollama/issues/18283) (MLX log spam) — all closed with fixes landing.

## 6. What This Means for Application Developers

- **AMD iGPU / Vulkan users: do not upgrade past v0.32.9** until [#18272](https://github.com/ollama/ollama/issues/18272) and [#17748](https://github.com/ollama/ollama/issues/17748) are resolved. Add a regression-check in your deployment pipeline before pulling the next minor.
- **On the MLX (Apple Silicon) runner, expect a measurable cold-turn speedup** in the next release: 17–27 s of re-prefill is being eliminated on agent workloads ([#18267](https://github.com/ollama/ollama/issues/18267)) and long-session memory accumulation is being fixed ([#18327](https://github.com/ollama/ollama/pull/18327)). Worth re-running your agent latency budgets after upgrade.
- **`gemma3:12b` + `format` (structured output) is unsafe for extraction tasks** that may see `"` in source text ([#18094](https://github.com/ollama/ollama/issues/18094)). Either pre-sanitize input, switch to `llama3.x`, or pin to a non-format generation mode until the truncation is fixed.
- **Avoid `qwen2.5-coder:3b-instruct` low-bit quants** (`q2_K`, `q3_K_S/K_M/K_L`) — currently 0% functional on a standard HumanEval+ subset ([#18252](https://github.com/ollama/ollama/issues/18252)). Stick to `q4_K_M` and above.
- **Codex/Claude Desktop launchers are in flux**: [#18188](https://github.com/ollama/ollama/issues/18188) and [#16177](https://github.com/ollama/ollama/issues/16177) show two distinct breakage modes (gateway config not written; native pipe trust lost). Multiple proxy PRs were iterated in a single day — expect a bundled fix soon, but validate the launcher in your CI today.
- **Cloud endpoints are not 1:1 with vendor APIs**: `glm-5.3:cloud` diverges from Z.AI's behavior ([#18193](https://github.com/ollama/ollama/issues/18193)). If you're an integrator, treat cloud tags as a distinct inference target with its own regression suite, not as a drop-in for the upstream provider.
- **OpenAI-compatible tool schemas now accept nested `required: object|null`** ([PR #18140](https://github.com/ollama/ollama/pull/18140)) — should reduce rejection of legitimate third-party tool schemas passing through Ollama's `/v1` surface.
- **Hardware roadmap signal**: Intel Arc Discrete on Linux is becoming a first-class target via Level Zero + Vulkan ([#18333](https://github.com/ollama/ollama/pull/18333)); and model signing ([#11573](https://github.com/ollama/ollama/pull/11573)) is on a real path to landing, which matters if your threat model includes model-supply-chain integrity.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-09

## Today's Highlights
A `v1.102.0-dev.1` dev cut ships with cosign-signed Docker images, establishing a fixed-key provenance chain operators can enforce at admission time. Security and auth hygiene dominate the day: an unredacted `print_verbose` stdout leak ([#34705](https://github.com/BerriAI/litellm/issues/34705)), a coordinated auth-hardening bundle (breached-password detection [#39321](https://github.com/BerriAI/litellm/pull/39321), force-reset [#40107](https://github.com/BerriAI/litellm/pull/40107), self-service password change [#39562](https://github.com/BerriAI/litellm/pull/39562)), and webhook alerting for internal-user budget enforcement ([#40396](https://github.com/BerriAI/litellm/pull/40396)). On the protocol side, encrypted-reasoning affinity across the `/v1/messages` → Responses API bridge is being repaired end-to-end ([#39339](https://github.com/BerriAI/litellm/issues/39339) / [#40237](https://github.com/BerriAI/litellm/issues/40237) / [#40377](https://github.com/BerriAI/litellm/pull/40377)).

## Releases & Breaking Changes
- **[`v1.102.0-dev.1`](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.1)** — no documented breaking changes. All Docker images are signed with cosign using the key pinned at commit `0112e53`; verify with `cosign verify` against the published tag.
- **`stable/1.87.x` backport bundle** — [PR #31177](https://github.com/BerriAI/litellm/pull/31177) ships five already-merged fixes centered on Anthropic streaming cost recovery (interrupted and agentic streams were being dropped or under-counted). No version bump.

## New Model & Hardware Support
- **ChatGPT Codex** for OAuth/proxy deployments — image edits, structured review (strict JSON schema), realtime voice signaling, plus ChatGPT image adapters incl. JSON reference images. [PR #40366](https://github.com/BerriAI/litellm/pull/40366).
- **Vertex AI versioned Claude IDs** — [PR #40376](https://github.com/BerriAI/litellm/pull/40376) corrects the default `max_tokens` resolver for ids like `claude-haiku-4-5@20251001`; sibling [PR #40374](https://github.com/BerriAI/litellm/pull/40374) updates the cost-map fill to 64000. Requests without explicit `max_tokens` no longer cap at 4096.
- **Azure GPT-5.6 Luna** pricing corrected (input/output/cache) with regression coverage. [PR #36279](https://github.com/BerriAI/litellm/pull/36279).
- **Azure AI DeepSeek v4 Flash / Pro** pricing entries pending in `model_prices_and_context_window.json` (and backup). [Issue #30129](https://github.com/BerriAI/litellm/issues/30129).
- **Volcano Ark `doubao-embedding-vision-251215`** integration closed. [Issue #29570](https://github.com/BerriAI/litellm/issues/29570).

## Performance & Optimization
- **Rate-limit enforcement accuracy** — [PR #37789](https://github.com/BerriAI/litellm/pull/37789) fixes the v3 rate-limiter that was deducting identical `(key, value)` descriptors twice, halving effective team per-model RPM/TPM ([issue #34140](https://github.com/BerriAI/litellm/issues/34140)). Deduping is done once at descriptor assembly so all counter consumers benefit transparently.
- **Proxy budget isolation** — [PR #40037](https://github.com/BerriAI/litellm/pull/40037) (fixes [#40020](https://github.com/BerriAI/litellm/issues/40020)) decouples `litellm_settings.max_budget` in `config.yaml` from the process-local SDK `_current_cost` tracker, restoring intended global spend-limit semantics enforced via `_global_proxy_budget_check`.
- **Anthropic streaming cost recovery** — [PR #31177](https://github.com/BerriAI/litellm/pull/31177) lands interrupted/agentic stream billing back onto `stable/1.87.x`.
- **Encrypted-reasoning affinity** — [PR #40377](https://github.com/BerriAI/litellm/pull/40377) preserves encoding flags in chat metadata so first-turn requests correctly enable response-marker encoding under the bridged chat path.
- **Terraform provider metadata drift** — [PR #40395](https://github.com/BerriAI/litellm/pull/40395) strips proxy

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-09

## Today's Highlights

The v0.1.807-beta release ships substantial performance and reliability wins: AMD Vulkan is now the default backend (~20% prefill/decoding boost over ROCM), Windows `llama-server.exe` is code-signed (mitigating antivirus false positives), and AMD gibberish output on Strix/iGPUs is resolved upstream. In parallel, the team is landing major architectural work — a security-critical patch blocking markerless tool-call RCE in Studio, KV preemption to let parallel chats share one cache instead of evicting each other, and a two-Spark serving orchestrator for DGX clusters.

## Releases & Breaking Changes

- **[v0.1.807-beta](https://github.com/unslothai/unsloth/releases)** — "Large Perf Improvements + Fixes." AMD Vulkan now default; signed Windows binary; AMD Strix/iGPU correctness fixes. Compatible with existing Studio/Desktop installs but AMD users will see a backend switch.
- **[PR #10604](https://github.com/unslothai/unsloth/pull/10604)** — Removes the staged background desktop update introduced in 805; restores the classic `studio update` in-place flow. The four Windows-side fixes from #9890 stay.
- **[PR #10587 (closed)](https://github.com/unslothai/unsloth/pull/10587)** — Switches NPP runtime request from `nvidia-npp-cu13` (a deprecated stub) to plain `nvidia-npp` for CUDA 13 installs.

## New Model & Hardware Support

- **[Issue #10562 (closed)](https://github.com/unslothai/unsloth/issues/10562)** — IFM K2 model support request resolved.
- **[PR #10282](https://github.com/unslothai/unsloth/pull/10282)** — Native ARM64 CUDA stack install for Windows-on-ARM NVIDIA hosts (GB10 / N1X, RTX Spark parts). Today `install.ps1` treats ARM64 Windows as "no GPU"; this fixes that without changing any other host's behavior.
- **[Issue #9932](https://github.com/unslothai/unsloth/issues/9932)** — Open feature request for ROCm 10 support + a multi-version selector (ROCm 7.14 etc.). AMD shipped ROCm 10 / TheRock-10.0; no PR yet.
- **[PR #10323](https://github.com/unslothai/unsloth/pull/10323)** — Two-Spark serving orchestrator with async replica router for paired DGX Spark hosts; picks topology from `spark_cluster.recommend_topology` and keeps both nodes busy when the workload allows.

## Performance & Optimization

- **AMD Vulkan default** ([v0.1.807-beta](https://github.com/unslothai/unsloth/releases)) — ~20% prefill/decoding throughput improvement vs ROCm path.
- **[PR #10301](https://github.com/unslothai/unsloth/pull/10301) + [#10358](https://github.com/unslothai/unsloth/pull/10358)** — KV preemption redesign: one `llama-server` is launched with `--parallel N --kv-unified -c N`, so N slots share N cells instead of each chat needing its own context. Pairs with llama.cpp `--preempt-ram` so the server can park slots in host RAM. Net effect: parallel chats no longer kill each other's cache.
- **[PR #9872](https://github.com/unslothai/unsloth/pull/9872)** — Offload planner now weighs a spill against llama.cpp's own fitter. Adds a cost gate, sub-FFN spill ladder, context-aware device reserve, and load ordering. All behavior gated by `UNSLOTH_SMART_OFFLOAD`.
- **[PR #8323](https://github.com/unslothai/unsloth/pull/8323)** — Enable PyTorch's fast AOTriton ROCm attention kernels on launch. On some AMD cards the slow fallback's O(n²) memory caused a 3.4k-token request to ask for 66 GiB; flipping the env var fixes it. Fixes [#8225](https://github.com/unslothai/unsloth/issues/8225).

## Stability & Regressions

**Security (HIGH severity)**
- **[PR #10507](https://github.com/unslothai/unsloth/pull/10507)** — Two prompt-injection-to-RCE findings in Studio. Markerless tool-call parsers promoted bare `call:NAME{...}`, `NAME[ARGS]{json}`, or `{"name":...}` from anywhere in assistant text into a real tool call, gated only on whether `NAME` was enabled. This PR blocks that promotion path. Strongly recommend pinning.

**Crashes / correctness**
- **[Issue #10559](https://github.com/unslothai/unsloth/issues/10559)** — `llama-server` crashes with `GGML_ASSERT` on image input for Gemma 4 because the default `ubatch` is too small. Open.
- **[Issue #10549](https://github.com/unslothai/unsloth/issues/10549)** — Unsloth layer/tensor mode behave identically; "fake BF16 mode" reports as enabled but does not actually change tensor storage. Open.
- **[PR #10526](https://github.com/unslothai/unsloth/pull/10526)** — Minimal OS sandbox (bubblewrap on Linux, Seatbelt on macOS) for Studio's Python and Terminal tools, replacing purely-software safeguards. Not yet merged.
- **[PR #10540](https://github.com/unslothai/unsloth/pull/10540)** — Windows installer emits the native path helper as a precompiled text file rather than running `csc.exe` at install time, which Bitdefender was flagging as `Gen:Variant.MSILHeracles`.
- **[Issue #10579](https://github.com/unslothai/unsloth/issues/10579)** — Desktop update reinstalls all dependencies from scratch every time; users report hours-long, sometimes failing updates. PR #10604 partially addresses.
- **[Issue #10598](https://github.com/unslothai/unsloth/issues/10598)** — `install.sh` floors torch at 2.4 while the torchcodec table floors at 2.5; no logging of the gap, so torchcodec is silently skipped on torch 2.4 installs.
- **[Issue #10563](https://github.com/unslothai/unsloth/issues/10563)** — `fast_dequantize` caches an import-time stream instead of using the live PyTorch stream; unsafe when the current GPU stream changes (observed as repeated GPU resets on RX 7900 XTX / gfx1100 during QLoRA).
- **[Issue #10599](https://github.com/unslothai/unsloth/issues/10599)** — Models downloaded before a newer mmproj or MTP head landed never pick them up; full delete + redownload required.
- **[Issue #10428](https://github.com/unslothai/unsloth/issues/10428)** — Prompt queue is cleared on every stop or model reload.
- **[Issue #10516](https://github.com/unslothai/unsloth/issues/10516)** — Eight `_PYTORCH_WHL_BASE` URL sites concatenate the accelerator leaf into the `UNSLOTH_PYTORCH_MIRROR` query token rather than appending it to the path.
- **[Issue #9337 (closed)](https://github.com/unslothai/unsloth/issues/9337)**, **[#9218 (closed)](https://github.com/unslothai/unsloth/issues/9218)**, **[#6528 (closed)](https://github.com/unslothai/unsloth/issues/6528)** — Resolved: stats refresh, self-signed certificate trust, diffusiongemma generation error.

## What This Means for Application Developers

- **AMD users should upgrade to 807-beta immediately** — Vulkan default delivers ~20% throughput, and the Strix/iGPU gibberish fix is correctness-critical. Expect a backend switch in logs.
- **Patch your Studio install for tool-call RCE ASAP** — PR #10507 blocks a path where untrusted assistant output can invoke enabled tools without proper markers. If you expose Studio to untrusted prompts (web UI, multi-tenant), this is a must-merge.
- **Plan for KV preemption changes** — once #10301/#10358 land, your parallel chat throughput on a single `llama-server` will improve, but slot accounting and per-request `n_ctx` semantics change. Re-test any code that infers KV pressure from `llama-server` responses.
- **Spark operators**: the two-Spark orchestrator (#10323) and the `--preempt-ram` pairing with llama.cpp mean you can serve larger models across paired DGX Sparks without manual orchestration, but only once you upgrade both `unsloth` and the bundled `llama.cpp` to the matching revisions.
- **Windows-on-ARM NVIDIA users** (RTX Spark, GB10 laptops): #10282 unblocks first-class installs; expect `install.ps1` behavior to differ from x64.
- **Studio CLI gotcha** ([Issue #10595](https://github.com/unslothai/unsloth/issues/10595), fixed by [PR #10608](https://github.com/unslothai/unsloth/pull/10608)) — every `unsloth studio run` was creating a fresh `cli` API key in Settings. Once 10608 lands, the key is reused; expect one extra `cli` entry to remain in your Settings until cleaned up.
- **Open WebUI interop is in flux** ([Issue #10610](https://github.com/unslothai/unsloth/issues/10610)) — model residency display and explicit load/unload endpoints diverge between the `llama.cpp` provider and what Unsloth actually serves. If you front Studio with Open WebUI, expect rough edges until this is reconciled.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-09

## Today's Highlights

The 24-hour window is dominated by a **performance cluster** in the gateway: three related issues (#1775, #1776, #1777) report that per-request work scales linearly with configured provider count — an uncached metadata lookup recomputes on every request, `findProvider()` rebuilds identity Sets 800k+ times per request at 46 providers, and `getAppInfo` RPC consistently takes ~7.2s. On the compatibility front, three upstream-specific failures emerged (#1780 opencode-go `x-opencode-session` header, #1781 Meta Responses format with `call_id`/`max_tokens`, #1779 OIDC federation not activating), and two open PRs (#1773, #1774) target aggregate error surfacing and per-model usage attribution.

## Releases & Breaking Changes

No new releases in the last 24h. The latest published version referenced in user reports is **CCR v3.0.22** (see [#1779](https://github.com/musistudio/claude-code-router/issues/1779)).

## New Model & Hardware Support

No new model, backend, or quantization support announced in this window.

## Performance & Optimization

Three correlated issues filed by `Osamious` describe uncached per-request work in the gateway hot path:

- **#1775** — Per-request latency scales **linearly** with configured provider count due to an uncached provider-display-metadata lookup recomputed every request. ([link](https://github.com/musistudio/claude-code-router/issues/1775))
- **#1777** — `Cy.prototype.findProvider(t)` linearly scans `Providers` and re-derives an identity `Set` per provider on every call, observed at **~800k+ Set constructions per request** with 46 providers. ([link](https://github.com/musistudio/claude-code-router/issues/1777))
- **#1776** — `getAppInfo` RPC measured at **~7.2s** repeatably, while `getConfig` answers in ~6ms against the same gateway — pointing at a distinct slow path unrelated to provider count. ([link](https://github.com/musistudio/claude-code-router/issues/1776))

Together these suggest a small set of low-risk memoization fixes (cached provider metadata + selector identity maps) would meaningfully cut latency at high provider counts. No PRs have landed yet for this cluster.

## Stability & Regressions

Ranked roughly by user impact:

1. **[#1780](https://github.com/musistudio/claude-code-router/issues/1780)** — **Severe / broad.** Since 2026-09-05, `opencode.ai/zen/go/v1` enforces an `x-opencode-session` header; CCR sends none and gets `400 MissingSessionID` for every POST. Any CCR provider with `api_base_url` pointing at the opencode-go endpoint is fully broken. *No fix PR yet.*
2. **[#1781](https://github.com/musistudio/claude-code-router/issues/1781)** — **Severe / scoped.** `anthropic_messages` → OpenRouter → `meta/muse-spark-1.3-contributor` converts tool turns into Meta Responses `input[]` but drops the required `call_id` and enforces a `max_tokens` floor that the upstream rejects. Affects tool-use flows only. *No fix PR yet.*
3. **[#1779](https://github.com/musistudio/claude-code-router/issues/1779)** — **Medium.** CCR 3.0.22 sets `oidc_federation_*` env vars for Claude Code but never activates the mode, so Claude Code reports "Not logged in" against OpenRouter `:free` models on Ubuntu 26.04 headless. *No fix PR yet.*
4. **[#1778](https://github.com/musistudio/claude-code-router/issues/1778)** — **Medium.** Router dispatches via `gemini_generate_content` protocol even when that option is unchecked and reports Unavailable — indicates a stale/incorrect availability flag. *No fix PR yet.*
5. **Performance cluster (#1775/#1776/#1777)** — **Medium (latency, not correctness).** No crashes reported, but high-provider-count deployments see degraded TTFT. *No fix PR yet.*

Open PRs addressing stability/observability (not yet merged):
- **[#1773](https://github.com/musistudio/claude-code-router/pull/1773)** — Surfaces per-attempt failure details (`stage`, `status`, `message`) inside the aggregate `All target providers failed.` error, instead of returning only the generic message.
- **[#1774](https://github.com/musistudio/claude-code-router/pull/1774)** — Attributes client-visible provider-prefixed response models (e.g., `dashscope-private/ZHIPU/GLM-5.3`) back to the bare model in per-model usage stats; currently these only inflate unfiltered totals.

## What This Means for Application Developers

- **Audit your upstream providers today.** If you route to `opencode.ai/zen/go/v1` (#1780) or Meta Responses–style models through OpenRouter with tools (#1781), expect failures; pin or switch endpoints until fixes ship.
- **Plan for a latency cliff at high provider counts.** The #1775/#1777 root cause means gateway overhead grows with `Providers.length`. If you carry many providers in a single CCR config, expect TTFT to grow non-trivially — consider sharding or trimming until the cache fix lands.
- **OIDC federation is effectively a no-op on 3.0.22** (#1779). If you rely on CCR-managed auth for Claude Code against OpenRouter, don't trust the current login flow — work around with explicit env vars.
- **Telemetry is about to get better.** PRs #1773 and #1774, once merged, will make failure debugging and per-model cost attribution significantly more usable — useful for anyone running CCR in production dashboards.
- **No new release today** — if you're about to upgrade, there's nothing new to chase; track the open issues for the next tagged version.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-09

## 1. Today's Highlights

The CC Switch repository saw heavy activity across provider/proxy plumbing and platform expansion: a long-standing **CLI Tool Support Tracker** (#1855, 200 comments) continues to drive the roadmap, while two substantial new-app PRs landed — **Cursor support** (#6124, +4123 LOC) and **DeepSeek Harness (DSH) as a first-class AppType** (#7244). On the proxy side, the team shipped fixes for the circuit-breaker HalfOpen permit leak (#7207), macOS system-proxy refresh (#7030), and Codex rollout sync on Windows (#7219), plus a feature to stamp the now-mandatory `x-opencode-session` header (#7246).

## 2. Releases & Breaking Changes

- **No new releases in the last 24h.**
- ⚠️ **Upcoming deprecation note (issue #7198):** Gemini CLI is officially no longer maintained; users request a migration to **Antigravity CLI** for entry configuration and usage statistics. Expect config-key churn for `gemini-cli` providers in a future release.
- **Provider API-format churn (issue #6258):** OpenCode Go's Anthropic-compatible endpoint expects a different auth-header shape than Claude Desktop's. CC Switch provider cards currently cannot select the auth field, forcing `401 Missing API key` errors.

## 3. New Model & Hardware Support

- **New provider preset:** Laonong API (`laonongapi`) — OpenAI-compatible gateway exposing GPT-4o, Claude 3.5 Sonnet, DeepSeek, Gemini. [PR #7245](https://github.com/farion1231/cc-switch/pull/7245)
- **GitHub Copilot hosted-account routing for Codex** (Responses + Chat Completions, auth/profile auto-selected per `supported_endpoints`). [PR #7157](https://github.com/farion1231/cc-switch/pull/7157)
- **DeepSeek Harness (DSH)** added as a managed app alongside Claude/Codex/Gemini; reads `~/.dsh/settings.yaml` with `apiKeyEnv` secret refs. [PR #7244](https://github.com/farion1231/cc-switch/pull/7244)
- **Cursor (BYOK)** added as the 9th managed app — uses cloudflared Quick Tunnel to expose the local proxy as HTTPS, with config in `cursor_config.rs` and DB migrations v17/v18. [PR #6124](https://github.com/farion1231/cc-switch/pull/6124)
- **LongCat reasoning format** for Pi — switched to Pi's binary thinking wire format with explicit `thinking.type` values (off/high). [PR #7201](https://github.com/farion1231/cc-switch/pull/7201)

## 4. Performance & Optimization

- **Circuit-breaker correctness/perf (#7207):** RAII `HalfOpenPermitGuard` now disarms without leaking permits and stops the destructure-then-release pattern that defeated `max_half_open_requests=1` rate limiting. This restores proper bulkhead behavior under partial outages.
- **Volcengine usage routing (#7096):** Separates Agent Plan vs. Coding Plan detection so users with both subscriptions see the correct per-plan quota instead of one card mirroring both.
- **Codex rollout incremental sync (#7219):** Replaces mtime-only detection with a persisted **byte cursor + size** check, fixing Windows cases where an actively-written rollout keeps mtime unchanged while growing.
- **Codex `/images/edits` proxy coverage (#7177):** Closes the P2 gap where `imagegen` tool calls with `referenced_image_paths` failed; also handles streamed image-gen usage metering.

## 5. Stability & Regressions

Ranked by likely blast radius:

| Severity | Issue | Description | Fix PR |
|----------|-------|-------------|--------|
| **P0** | [#7236](https://github.com/farion1231/cc-switch/issues/7236) | After Claude Code 2.1.265, Deepseek and ZAI providers return errors via CC Switch | — |
| **P0** | [#6875](https://github.com/farion1231/cc-switch/issues/6875) | Switching/enabling a Codex provider **fully overwrites** `config.toml` and `auth.json`; external config and tokens lost with no file backup | — |
| **P1** | [#7084](https://github.com/farion1231/cc-switch/issues/7084) | Codex usage sync: paginated parent rollouts cause forked child sessions to be permanently tagged "parent not yet at fork point" → GPT-5.6-Sol usage dropped | [#7219](https://github.com/farion1231/cc-switch/pull/7219) partial |
| **P1** | [#7088](https://github.com/farion1231/cc-switch/issues/7088) | OpenCode Go requests missing `x-opencode-session` may start erroring from 2026-09-06 | [#7246](https://github.com/farion1231/cc-switch/pull/7246) ✅ |
| **P1** | [#7252](https://github.com/farion1231/cc-switch/issues/7252) | Cache misses from Claude Code steer messages / token reminders when routed via a Chat-Completions gateway | [#7253](https://github.com/farion1231/cc-switch/pull/7253) ✅ (opt-in fix) |
| **P1** | [#4679](https://github.com/farion1231/cc-switch/issues/4679) | CC Switch 3.16.3 caches system-proxy state; after disabling proxy, requests still try to go through it → 502 | [#7030](https://github.com/farion1231/cc-switch/pull/7030) ✅ (macOS only) |
| **P2** | [#7080](https://github.com/farion1231/cc-switch/issues/7080) | Local env-monitor cannot detect latest Codex version → manual update blocked | — |
| **P2** | [#7211](https://github.com/farion1231/cc-switch/issues/7211) | CC Switch forcibly overwrites Codex CLI `config.toml` `requires_openai_auth` value | — |
| **P2** | [#6258](https://github.com/farion1231/cc-switch/issues/6258) | Claude Desktop provider UI lacks auth-field selector → Anthropic-compatible upstream returns 401 | — |
| **P2** | [#6626](https://github.com/farion1231/cc-switch/issues/6626) | Claude Code 2.1.235 reports zero cache tokens for DeepSeek (related: #3908, #4247) | — |
| **P3** | [#7240](https://github.com/farion1231/cc-switch/pull/7240) | Windows WebView2 startup blank/white screen on some hosts | ✅ Fix in PR #7240 |
| **P3** | [#7208](https://github.com/farion1231/cc-switch/pull/7208) | Windows Terminal launches `cmd.exe` regardless of `defaultProfile` (#5322, #2830) | ✅ Fix in PR #7208 |
| **Stale** | [#5171](https://github.com/farion1231/cc-switch/issues/5171), [#5342](https://github.com/farion1231/cc-switch/issues/5342), [#5197](https://github.com/farion1231/cc-switch/issues/5197), [#5185](https://github.com/farion1231/cc-switch/issues/5185) | image_gen tool conflict, Codex+ChatGPT field mismatch, `/responses` translation 400, WebView2 no-window | — |

## 6. What This Means for Application Developers

- **If you route Claude Code through CC Switch to a non-Anthropic Chat-Completions gateway:** enable the new "conversation system conversion" toggle (#7253). Without it, steer messages and todo/background reminders won't be downgraded from `system` to `user`, killing prompt-cache hits on long agentic sessions.
- **If you use Codex:** pin a version of CC Switch that includes PR #7219, or expect usage-sync gaps on Windows when rollouts are actively written. The `config.toml`/`auth.json` overwrite risk (#6875) means **back up `~/.codex/` before toggling providers** until a fix lands.
- **If you operate an OpenCode Go upstream:** the local proxy now stamps `x-opencode-session` automatically (#7246) — no client-side change required, but verify your own gateway isn't double-stamping the header.
- **If you maintain CI on macOS:** the proxy-refresh fix (#7030) means reqwest clients are now rebuilt when SCDynamicStore changes propagate; restarts are no longer required after toggling a system proxy tool.
- **If you build on Cursor:** the BYOK tunnel pattern in #6124 (cloudflared Quick Tunnel → localhost proxy → HTTPS) is a useful reference for handing off local-only proxies to non-loopback clients.
- **Roadmap signal (#1855):** requests to add Cline, Aider, Roo Code, Continue, and Windsurf as managed apps remain the highest-engagement tracker item — expect more provider/CLI abstraction surfaces to land.

---

*Sources: [farion1231/cc-switch Issues](https://github.com/farion1231/cc-switch/issues) and [Pull Requests](https://github.com/farion1231/cc-switch/pulls), activity window 2026-09-08 → 2026-09-09.*

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-09

## 1. Today's Highlights

The v1.0.0-rc.36 release ships the **Task Plugins & Marketplace** overhaul (plugin icons, metadata, capability tags, currency-switchable pricing) alongside quota/logs improvements. The dominant theme across issues and PRs today is **billing correctness**: multiple high-severity bugs around double-charging, missing cache tokens, and the Gemini `:countTokens` endpoint being misrouted as `generateContent` (charging for generation on what should be a free count call). A noteworthy meta-pattern: a large share of today's merged PRs were produced by AI coding agents (Claude Code, Codex CLI) in a coordinated "PR contribution" effort.

## 2. Releases & Breaking Changes

- **[v1.0.0-rc.36 — Task Plugins, Pricing Configuration, and Quota](https://github.com/QuantumNous/new-api/releases)** ([release notes in repo](https://github.com/QuantumNous/new-api))
  - Task Plugins & Marketplace: plugin icon, website URL, metadata and capability descriptors surfaced; channel creation now auto-populates the matching plugin.
  - Model management, catalog, marketplace display and pricing config reworked.
  - API key / user quota / usage log / redemption code flows improved.
  - Pricing currency is now display-switchable to the site currency for entry/readability; **quota deduction still occurs in USD**. This is a behavior change that operators must communicate to end users — billing amounts shown in ¥/$ may differ from the USD actually deducted.
- No explicit GA criteria published yet for v1.0.0 → flagged in [#7279](https://github.com/QuantumNous/new-api/issues/7279).

## 3. New Model & Hardware Support

- **Google Veo 3.1 video generation** with resolution- and duration-based dynamic pricing on Vertex AI (channel 41) and Gemini channels — [#7280](https://github.com/QuantumNous/new-api/pull/7280).
- **MiniMax H3 (Video Generation V2)** task adapter in [#6591](https://github.com/QuantumNous/new-api/pull/6591): `/v1/videos` submit, multimodal content validation, V2 task-status polling, OpenAI Video response mapping. The same MiniMax channel selects V1/V2 per upstream mapping and stores it on the task record so the poller reuses the correct protocol. Pre-charged at official per-second rate.
- **MiniMax RAI-filtered video failure handling**: when `raiMediaFilteredCount > 0` and no video is returned, tasks are now marked FAILURE and refunded — [#6858](https://github.com/QuantumNous/new-api/pull/6858).
- **VolcEngine (火山方舟) channel** model-list endpoint 404 fix (type=45 was hitting `/v1/models` instead of the correct path) — [#7203](https://github.com/QuantumNous/new-api/pull/7203).
- No new hardware backends or quantization formats noted today.

## 4. Performance & Optimization

- **Frontend `/api/status` de-duplication** [#7189](https://github.com/QuantumNous/new-api/pull/7189) (closes [#7157](https://github.com/QuantumNous/new-api/issues/7157)) — claim: **~25% faster homepage load** under high concurrency by collapsing duplicate status requests; reduces backend origin pressure.
- **Gemini `:countTokens` path fix** [#7285](https://github.com/QuantumNous/new-api/pull/7285) — beyond correctness, removes 24–44s latency incurred when count calls were being executed as generation requests ([#7283](https://github.com/QuantumNous/new-api/issues/7283)).
- **Cache-token accounting** for Claude usage logs and TPM stats — [#7271](https://github.com/QuantumNous/new-api/pull/7271) closes [#7290](https://github.com/QuantumNous/new-api/issues/7290); prior code undercounted `prompt_tokens` by omitting cached input, which also distorted TPM dashboards.

## 5. Stability & Regressions

Ranked by revenue/correctness impact:

| Severity | Issue | Notes |
|---|---|---|
| 🔴 **Critical (billing)** | Realtime (WSS) **double-charge**: per-segment deductions plus session-summary settlement — net ≈ 2× — [#7273](https://github.com/QuantumNous/new-api/issues/7273) | **Fixed** by [#7274](https://github.com/QuantumNous/new-api/pull/7274): settlement now only tops up the gap. |
| 🔴 **Critical (billing)** | **Image cache-hit double billing** — [#7229](https://github.com/QuantumNous/new-api/issues/7229) | No fix PR in the last 24h; still open on rc.30. |
| 🔴 **Critical (concurrent state)** | Multi-key rotation: stale snapshot overwrites fresh `channel_info`, silently re-enabling auto-disabled keys — [#7275](https://github.com/QuantumNous/new-api/issues/7275) | **Fixed** by [#7276](https://github.com/QuantumNous/new-api/pull/7276) (lost-update race). |
| 🟠 **High (correctness/UX)** | Gemini `:countTokens` executed as `generateContent` — wrong token counts, 24–44s latency, billed as generation — [#7283](https://github.com/QuantumNous/new-api/issues/7283) | **Fixed** by [#7285](https://github.com/QuantumNous/new-api/pull/7285). |
| 🟠 **High (billing observability)** | Claude `prompt_tokens` log only records fresh (non-cached) tokens — [#7290](https://github.com/QuantumNous/new-api/issues/7290) | **Fixed** by [#7271](https://github.com/QuantumNous/new-api/pull/7271). |
| 🟡 **Medium** | Users-table quota display regression after commit `ea7cb0ba4` — [#7267](https://github.com/QuantumNous/new-api/issues/7267) | **Fixed** by [#7266](https://github.com/QuantumNous/new-api/pull/7266). |
| 🟡 **Medium** | Time-based billing tiers not rendered correctly on pricing page — [#7268](https://github.com/QuantumNous/new-api/issues/7268) | **Fixed** by [#7269](https://github.com/QuantumNous/new-api/pull/7269). |
| 🟡 **Medium** | Marketplace 24h success-rate bar spacing uneven — [#7282](https://github.com/QuantumNous/new-api/issues/7282) | **Fixed** by [#7284](https://github.com/QuantumNous/new-api/pull/7284). |
| 🟡 **Medium** | "Advanced custom" channel config: "Add Split" button missing — [#7286](https://github.com/QuantumNous/new-api/issues/7286) | **Fixed** by [#7289](https://github.com/QuantumNous/new-api/pull/7289). |
| 🟢 **Low / Cosmetic** | Subscription-plan card hardcodes "$" instead of honoring site currency ([#7278](https://github.com/QuantumNous/new-api/issues/7278)), 充值金额小数点过多 ([#3177](https://github.com/QuantumNous/new-api/issues/3177)), pricing tier display ([#7268](https://github.com/QuantumNous/new-api/issues/7268)). | Tied to the rc.36 currency-display rework — verify on upgrade. |
| 🟠 **Stale but unfixed** | Qwen3 `enable_thinking` not correctly forwarded to Aliyun (non-stream must disable thinking) — [#1013](https://github.com/QuantumNous/new-api/issues/1013). Stale since 2025-04; no fix yet. | Affects Qwen3 non-stream reliability on Aliyun channels. |
| 🟠 **Stale, auth** | Multi-instance email verification codes lost across instances — [#3126](https://github.com/QuantumNous/new-api/issues/3126) | **Mitigation PR** [#5475](https://github.com/QuantumNous/new-api/pull/5475): Redis-backed code store with hashed keys, in-memory fallback. |

## 6. What This Means for Application Developers

- **Audit realtime (WSS) and image-cache billing** if you bill through new-api. If you were on rc.30/rc.35 between Sep 6–9, real-time sessions and image cache hits may have double-charged end users — consider issuing refunds and reconciling quota ledgers before publishing the next invoice cycle.
- **Upgrade path to rc.36 carries UX-visible change**: pricing is now displayable in non-USD site currency while deduction remains in USD. Make sure your customer-facing documentation, dashboards, and refund/tax tooling account for the dual-currency display.
- **Claude/Anthropic dashboards**: cached-input tokens are now correctly counted. Expect TPM and `prompt_tokens` numbers to *increase* after upgrading — this is a correctness fix, not a regression. Update any capacity dashboards and alerting baselines accordingly.
- **Gemini CLI users**: the `:countTokens` fix unblocks long-running CLI sessions; if you instrumented for 24–44s pauses, those will disappear on the next release containing [#7285](https://github.com/QuantumNous/new-api/pull/7285).
- **Multi-instance deploys**: PR [#5475](https://github.com/QuantumNous/new-api/pull/5475) (Redis-backed verification codes, in-memory fallback) materially improves multi-pod reliability for email/2FA flows — relevant if you run new-api horizontally.
- **New video capabilities** (Veo 3.1, MiniMax H3) are usable end-to-end with proper pre-charge and refund-on-failure semantics — safer to expose in product than ad-hoc integrations.
- **Process-level note**: maintainers are clearly triaging a flood of agent-generated PRs ([#7274](https://github.com/QuantumNous/new-api/pull/7274), [#7276](https://github.com/QuantumNous/new-api/pull/7276), [#7285](https://github.com/QuantumNous/new-api/pull/7285), [#7284](https://github.com/QuantumNous/new-api/pull/7284), [#7189](https://github.com/QuantumNous/new-api/pull/7189)). Quality is generally good — fixes are tightly scoped, reference issues, and cite related work — but treat each landed patch as you would any external contribution: read the diff, especially for billing paths, before pinning to it.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*