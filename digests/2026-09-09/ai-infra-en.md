# AI Infrastructure Digest 2026-09-09

> Generated: 2026-09-08 23:30 UTC | Projects covered: 9

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

# Cross-Project Infrastructure Report — 2026-09-09

**Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth, Claude Code Router, CC Switch, New API

---

## 1. Ecosystem Overview

The stack is visibly stratifying into four layers — frontier serving engines (vLLM, SGLang), local runtimes (llama.cpp, Ollama, Unsloth), and gateway/routing tiers (LiteLLM, New API, Claude Code Router, CC Switch) — and today's activity shows each layer failing in its own characteristic way: the engines on **speculative-decoding correctness over hybrid linear-attention architectures and Blackwell GPUs**, the local runtimes on **backend stability (Vulkan/AMD, Windows)**, and the gateways on **billing, quota enforcement, and tool-call fidelity**. Two model families — Qwen3.8 and GLM-5.x — dominate integration effort across every layer, while DeepSeek-V4 support is consolidating on Hopper/Blackwell and effectively abandoning Ampere. Agent workloads (Claude Code, Codex, MCP tool loops) have become the primary load model shaping optimization priorities: prefix-cache reuse, streaming tool-call fidelity, and TTFT accuracy.

---

## 2. Activity Comparison

*Counts = items explicitly referenced in today's digests (proxy for activity, not full repo throughput).*

| Project | Layer | Issues referenced | PRs referenced | Release status | Dominant theme |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~20 | ~13 | No release; v0.27.x mainline | Ampere support gap; spec-decode correctness |
| **SGLang** | Serving engine | ~19 | ~18 | No release; v0.5.18 prod / v0.5.19 dev | DFlash deadlock fix; weight-cache daemon |
| **llama.cpp** | Local runtime | ~22 | ~23 | **10 tagged builds** (b10853–b10867) | Vulkan/AMD stability; MoE offload |
| **Ollama** | Local runtime | ~9 | ~11 | No release; engine bumps queued | MLX hardening; API compatibility |
| **LiteLLM** | Gateway | ~24 (highest) | ~12 | No release; rc/1.101.0 branch | Rate-limit + security correctness |
| **Unsloth** | Fine-tuning/local | ~16 | ~13 | **v0.1.807-beta shipped** | Vulkan-by-default on AMD; Windows hardening |
| **Claude Code Router** | Agent gateway | 5 | 4 | No release | O(provider-count) latency |
| **CC Switch** | Agent config router | ~21 (incl. closed) | 13 | No release; v3.20.1 (regressions) | Codex integration; Responses proxy |
| **New API** | Gateway/billing | ~14 | ~9 | **v1.0.0-rc.36 shipped** | Billing correctness; plugin marketplace |

**Read:** llama.cpp shows the highest raw merge velocity (~33 items, 10 releases); SGLang has the healthiest PR:issue ratio among engines; LiteLLM carries the largest open correctness backlog relative to its layer's criticality.

---

## 3. Model Support Race

| Model family | vLLM | SGLang | llama.cpp | Ollama | Others |
|---|---|---|---|---|---|
| **DeepSeek-V4 / DFlash** | Runs on Hopper/Blackwell; **Ampere blocked** (#50576, 106 comments) | **Leader** — TP>1 deadlock root-caused (#38565); TRT-LLM attn on SM100/103 (#30805) | — | — | Unsloth ships `-mtp` GGUF builds |
| **Qwen3.8 / Flash-Next** | Runs; 4 open correctness bugs (determinism, spec-decode) | NVFP4 mixed-precision shipped (#38569); H20 prefill IMA open (#37633) | Runs; Arc workgroup assert (#28247) | MLX YaRN long-context shipped | CC Switch presets refreshed; Unsloth quants |
| **GLM-5.2 / 5.3-Flash** | **Partial** — linear-attention variant unsupported (#54062); ROCm MXFP4 in flight | Runs but **degraded** — HiCache corruption (#38031), fp8-KV unusable (#36830) | **Requested, not started** (#27922) | Cloud-only issue (#18193) | — |
| **Kimi-K3** | — | DP-attention KV budget bug (#38202) | **Recurrent-state rollback shipped** (b10853) | — | — |
| **MiniMax-M3** | Sparse-attn ROCm + CUTLASS decode PRs (#52664, #55838) | — | — | — | — |
| **Nemotron 3.x** | ROCm Xid errors (#52225) | — | MTPv2 draft-head fix shipped (#28617) | — | — |

**Verdict:**
- **Frontier engines:** SGLang leads on **DeepSeek-V4 stability** (root-cause fix vs. vLLM's open Ampere tracker); vLLM leads on **breadth** (MiniMax-M3 sparse attention, ROCm paths, Mamba hybrids).
- **llama.cpp** remains fastest to *working* GGUF support for new architectures (Kimi-K3, Nemotron MTPv2 landed within the day).
- **GLM-5.3-Flash is the ecosystem's common gap** — broken or unsupported at every layer from llama.cpp through cloud. Plan for a lag before hybrid DSA models are production-viable anywhere.

---

## 4. Performance Frontier

Where optimization effort concentrated today:

| Area | Key data points | Maturity |
|---|---|---|
| **KV cache / prefix reuse** | Ollama killed a fixed **17–27s** re-prefill on MLX (agent workloads); vLLM quantified **30–40% throughput loss** from EAGLE prefix-cache misses (#53670); SGLang shipped KV age/reuse telemetry (#38559); Unsloth unified KV preemption for parallel chats | Hottest area — directly tied to agent economics |
| **Cold start / weight loading** | SGLang Weight Cache Daemon: Qwen3-235B FP8 load **~306–327s → <1s**; Ollama deduplicating GGUF metadata caches; vLLM still has 5-min ModelOpt load issue (#31624) | SGLang clearly ahead |
| **Kernels & determinism** | vLLM Helion RFC: **1.38–1.79× geomean** over CUDA baselines; batch-invariant Marlin MoE landed (RL/eval use); SGLang deterministic top-p/k renorm fixed a TP>1 deadlock class; llama.cpp Vulkan UNARY+MUL fusion, Metal simdgroup split, HIP SWAR | Active across all engines |
| **MoE offload economics** | llama.cpp host-resident expert **LRU cache** (#27861) + lookahead H2D prefetch (#28414) — targets `-ot exps=CPU` decode throughput | Emerging; prototype-grade |
| **Distributed / disaggregation** | vLLM NIXL eviction-correctness and PP-prefill-push fixes; SGLang MNNVL TP2 hang on B300 **unresolved** (#38300) | Blackwell distributed still fragile |
| **Quantization** | NVFP4 touched by 5 of 9 projects (SGLang mixed-precision shipped; vLLM FlashInfer crash; llama.cpp quantizer fixed); MXFP4, W4A16, fp8-KV in flight | NVFP4 is the format of record for 2026 |
| **Gateway hot paths** | CCR's O(provider-count) latency (**~800k redundant Set constructions/request at 46 providers**); LiteLLM moved Bedrock SigV4 off the event loop; CC Switch fixed TTFT-vs-total-latency conflation | Gateways now optimizing, not just routing |

---

## 5. Layer Positioning

- **Serving engines (vLLM, SGLang):** Own frontier model enablement, multi-GPU correctness, and quantization formats. Diverging — vLLM toward breadth + disaggregated (NIXL) + Rust frontend parity; SGLang toward raw performance (weight daemon, HiCache, aggressive Blackwell/TRT-LLM paths). Their failure modes are kernel-level and architectural.
- **Local runtimes (llama.cpp, Ollama):** llama.cpp is the **substrate** — backend kernels, GGUF format, ~10 releases/day cadence; it degrades gracefully (quantization tiers, CPU offload) rather than crashing. Ollama is the **product layer** on top — OpenAI/Anthropic API surfaces, MLX runner, session UX — and inherits llama.cpp bumps with a lag (b10864 PR currently queued). Their failure modes are hardware-driver interactions and API-shape bugs.
- **Fine-tuning (Unsloth):** The only training-layer project here; increasingly also a local-serving surface (Studio, signed llama-server.exe, KV preemption). Rides llama.cpp as its inference backend — note the coupling risk surfaced by broken AMD detection on the latest upstream build (#7485).
- **Gateways (LiteLLM, New API):** Enterprise control plane — routing, budgets, tenancy, observability. Notably, today's issues are **financial and security correctness** (double-counted quotas, half-enforced limits, key-hash leaks, double-billing), not latency. Metering is the new correctness battleground.
- **Agent-CLI routers (Claude Code Router, CC Switch):** A new specialist sub-layer optimizing for a single client family (Claude Code / Codex). Their backlog is dominated by **upstream client churn** — Codex versions bypassing proxies, config schema drift — a maintenance treadmill generic gateways don't face.

---

## 6. Trend Signals

1. **Speculative decoding is 2026's dominant correctness frontier.** MTP/EAGLE appears as a bug source in 6 of 9 digests: vLLM (silent CUDA IMA, prefix-cache misses on hybrid GDN), SGLang (GLM DSA corruption), llama.cpp (state retention across requests, DeviceLost with draft-MTP), Kimi-K3 (rollback needed), Nemotron (draft-head tensors). **Guidance: keep speculative decoding off production hybrid-architecture paths until the current fix wave lands.**
2. **Blackwell is still bleeding edge; Ampere is being abandoned.** sm_120 crashes in vLLM (FlashInfer NVFP4), SGLang (B300 MNNVL hang), llama.cpp (RTX 5090 GSP resets) — while DeepSeek-V4-Flash explicitly won't run on SM8x. **Hardware refresh planning should assume Hopper/Blackwell for frontier models.**
3. **Hybrid linear-attention (GDN/Mamba/DSA) breaks caching assumptions everywhere** — prefix-cache alignment, fp8-KV compatibility, and state rollback all needed rework across four projects. Expect this architecture class to drive engine churn for another quarter.
4. **Rust migration of hot paths is a cross-project race** (vLLM frontend, SGLang TreeCore/server, LiteLLM SDK callback path) — but SGLang's Rust TreeCore shipping with a measured e2e regression is a caution flag: none of this is safe to enable by default yet.
5. **Agent workloads are the design center.** Tool-call fidelity bugs span four projects (Ollama `/v1/responses` silent drops, LiteLLM dropped `tool_calls[].id`, llama.cpp parallel tool-call mangling, CC Switch Codex deadlocks). The OpenAI **Responses API is becoming the standard surface but is the least mature** — prefer `/v1/chat/completions` for production agent traffic today.
6. **Gateway metering cannot yet be trusted blindly.** LiteLLM enforces TPM/RPM at ~half of configured values (#34140, #24677) and leaks key hashes on 401s; New API double-bills cached images (#7229). **Audit metering against ground truth before basing chargeback or SLOs on it.**
7. **AMD is fragmenting into Vulkan vs. ROCm paths.** Unsloth defaulted to Vulkan for +20%; llama.cpp's Vulkan is simultaneously its riskiest backend (DeviceLost, 78% decode cliff at 131k ctx). vLLM is investing in ROCm gfx942/950. AMD deployment requires an explicit backend decision per stack, not an assumption.
8. **Determinism demand is rising** — batch-invariant kernels (vLLM) and deterministic sampling renorm (SGLang) both justified by RL rollouts and reproducible evals. If you run RL pipelines, `VLLM_BATCH_INVARIANT=1` is now broadly usable for Marlin MoE quantizations.

**Watch list for the next cycle:** vLLM #50576 (Ampere DSV4-Flash), SGLang #38300 (B300 MNNVL) and #38031 (GLM HiCache corruption), GLM-5.3-Flash landing in llama.cpp, Ollama `/v1/responses` fixes, and LiteLLM rate-limiter correctness on `rc/1.101.0`.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-09

## Today's Highlights
The community is converging on a major capability gap: **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731 cannot run on SM8x (Ampere A100/A800, RTX 30-series)**, with issue #50576 amassing 106 comments as the de-facto tracker for Hopper/Blackwell-only model coverage. Parallel work continues on **batch invariance for inference kernels** (#27433, #46639) and a cluster of correctness regressions in hybrid GDN/Mamba + MTP/EAGLE speculative decoding on Qwen3.8-class models.

## Releases & Breaking Changes
*No new releases in the last 24h.* Current mainline appears to be in the **v0.27.x** range based on issue references (e.g., #53726 pins v0.27.1, #54225 cites v0.27.1 image). No public API or config-flag deprecations announced today.

## New Model & Hardware Support
| Item | Status | Link |
|---|---|---|
| DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731 SM8x (Ampere) | Requested; blocker tracking #40851 | [#50576](https://github.com/vllm-project/vllm/issues/50576) |
| GLM-5.2-MXFP4 on ROCm (gfx942/gfx950) via `deepseek_v32` path | PR open, opt-in routing | [#51915](https://github.com/vllm-project/vllm/pull/51915) |
| MiniMax-M3 sparse attention with ROCm AITER indexer/top-k kernels | PR open, depends on #52849 | [#52664](https://github.com/vllm-project/vllm/pull/52664) |
| MiniMax-M3 CUTLASS MSA decode for small batch steps (<16) | PR open; fixes silent Triton-fallback regression | [#55838](https://github.com/vllm-project/vllm/pull/55838) |
| GLM DCP indexer interleave guard removed (NIXL interleave=64 enabled) | PR open, draft | [#55802](https://github.com/vllm-project/vllm/pull/55802) |
| GLM-5.3-Flash `Glm5NextTextLinearAttention` | **Not yet supported** | [#54062](https://github.com/vllm-project/vllm/issues/54062) |
| Transformers backend: generic `MergedColumnParallelFuser` | PR open | [#55301](https://github.com/vllm-project/vllm/pull/55301) |
| Paged shared-memory storage for MM tensor IPC (`--mm-processor-cache-type paged_shm`) | PR open, multi-modal | [#51349](https://github.com/vllm-project/vllm/pull/51349) |
| InternVL2 on Transformers v5 (meta-device init) | Tracking issue | [#38425](https://github.com/vllm-project/vllm/issues/38425) |

## Performance & Optimization
- **Batch invariance** landed for `moe_wna16_marlin_gemm` under `VLLM_BATCH_INVARIANT=1`, covering AWQ-INT4, GPTQ-INT4/INT8, MXFP4 schemes ([#46639](https://github.com/vllm-project/vllm/pull/46639)). Project tracker: [#27433](https://github.com/vllm-project/vllm/issues/27433).
- **Helion for CustomOps** (RFC, [#53788](https://github.com/vllm-project/vllm/issues/53788)) reports **1.382–1.785× geomean speedup** on H100 across three benchmarked kernels vs current CUDA — strong case for kernel-rewrite path.
- **MiniMax-M3 small-batch decode** ([#55838](https://github.com/vllm-project/vllm/pull/55838)): cuts the dispatch gate so batches `<16` stop silently falling back to Triton split-K, closing a latency cliff.
- **KV cache fragmentation** ([#55841](https://github.com/vllm-project/vllm/pull/55841)): prefer contiguous block runs in the V1 free queue to reduce disaggregated-transfer fragmentation.
- **KV prefetching timing** ([#41784](https://github.com/vllm-project/vllm/issues/41784)): identified GPU-idle window in LMCache integration when prefetch is spawned after `num_computed_tokens == 0`.
- **Partial cache hits for hybrid models** RFC ([#45702](https://github.com/vllm-project/vllm/issues/45702)) **closed** — landed direction for full-attention block size in hybrid Mamba stacks.

## Stability & Regressions
| Severity | Issue | Notes |
|---|---|---|
| 🔴 High | **Qwen3.8-Flash-Next greedy decoding non-deterministic** when prompt crosses `indexer_budget` (persistent_topk switch) on sm121/GB10 ([#54521](https://github.com/vllm-project/vllm/issues/54521)) | Five identical `temperature=0` requests produce five different completions; no fix PR yet. |
| 🔴 High | **FlashInfer CUDA illegal-memory access** on sm_120 (RTX PRO 6000 Blackwell Max-Q) with NVFP4 + fp8 KV cache; TRITON_ATTN unaffected ([#54225](https://github.com/vllm-project/vllm/issues/54225)) | Workaround: switch attention backend to Triton. |
| 🔴 High | **Silent CUDA IMA (exit 0)** in hybrid GDN + MTP k=3 + async scheduling on RTX 3090 ([#53726](https://github.com/vllm-project/vllm/issues/53726)) | Persists through #50021/#45100/#53613-class fixes. |
| 🔴 High | **AMD ROCm Xid 13 warp errors** under sustained load on SM120 with Nemotron-3.5-Lightning-30B-A3B-NVFP4 + Marlin MoE + hybrid Mamba ([#52225](https://github.com/vllm-project/vllm/issues/52225)) | Misaligned address / illegal instruction / out-of-range register. |
| 🟠 Med | **EAGLE/MTP prefix-cache last-block drop** forces a ~1,648-token recompute per hit on Qwen3.8 GDN layouts → **30–40% throughput loss** on prefix-reusing workloads ([#53670](https://github.com/vllm-project/vllm/issues/53670)) | Related fix attempt: [#52244](https://github.com/vllm-project/vllm/pull/52244). |
| 🟠 Med | **MTP first-repeat misses prefix cache** on hybrid Mamba/GDN (`mamba_cache_mode="align"`); re-prefills in full; reuse only from 2nd repeat ([#53504](https://github.com/vllm-project/vllm/issues/53504)) | Same family of GDN/MTP caching bugs. |
| 🟠 Med | **Intel Arc B50 (Battlemage) TP=2** crashes at worker init with `zeMemOpenIpcHandle INVALID_ARGUMENT` ([#48953](https://github.com/vllm-project/vllm/issues/48953)) | **Closed** — superseded by #41663. |
| 🟠 Med | **Host memory not released** after model load on Intel XPU ([#50269](https://github.com/vllm-project/vllm/issues/50269)) | |
| 🟠 Med | **ModelOpt Llama-4 (Scout 17B-16E-Instruct-FP8)** takes 5+ min to load even from CPU page cache ([#31624](https://github.com/vllm-project/vllm/issues/31624)) | Long-standing. |
| 🟡 Low | **ROCm cuda-graph capture crash with LoRA** ([#41622](https://github.com/vllm-project/vllm/issues/41622)) | **Closed.** |
| 🟡 Low | **GPU CC silent input corruption / remote DoS** via pinned-memory misclassification ([#50671](https://github.com/vllm-project/vllm/pull/50671)) | Security PR open — recommend tracking. |
| 🟡 Low | **v0.18.0 cu128 wheel URL returns 404** ([#37847](https://github.com/vllm-project/vllm/issues/37847)) | **Closed.** |

## What This Means for Application Developers
- **Hardware planning**: If you operate **Ampere (A100/A800, RTX 30-series)**, treat DeepSeek-V4-Flash as **unsupported today**. Plan deployments on Hopper or Blackwell. Track [#50576](https://github.com/vllm-project/vllm/issues/50576) before committing.
- **Speculative decoding is fragile on hybrid architectures**: Multiple open bugs show EAGLE/MTP losing prefix-cache hits on Qwen3.8 GDN layouts with **30–40% throughput regression** ([#53670](https://github.com/vllm-project/vllm/issues/53670), [#53504](https://github.com/vllm-project/vllm/issues/53504), [#53726](https://github.com/vllm-project/vllm/issues/53726)). Pin to non-speculative paths in production until [#52244](https://github.com/vllm-project/vllm/pull/52244) and related fixes land.
- **Attention backend selection matters on Blackwell**: FlashInfer + NVFP4 + fp8 KV crashes on sm_120 ([#54225](https://github.com/vllm-project/vllm/issues/54225)); `TRITON_ATTN` is the safe fallback today.
- **Determinism guarantees**: Batch-invariance is now broadly available for Marlin MoE ([#46639](https://github.com/vllm-project/vllm/pull/46639)) — relevant for RL rollouts and reproducible evaluations. Set `VLLM_BATCH_INVARIANT=1`.
- **KV-cache offload + HMA** combinations still break on subsequent chat requests ([#41515](https://github.com/vllm-project/vllm/issues/41515)); avoid mixing the two in multi-turn serving until fixed.
- **ROCm on gfx942/gfx950** is getting first-class GLM-5.2 support ([#51915](https://github.com/vllm-project/vllm/pull/51915)) — worth re-evaluating AMD capacity for GLM-class workloads.
- **Disaggregated inference (NIXL)**: A correctness fix lands preventing eviction of engines mid-read ([#54689](https://github.com/vllm-project/vllm/pull/54689)), and attention-HMA layouts gain PP prefill push support ([#50494](https://github.com/vllm-project/vllm/pull/50494)). Disaggregated stacks should pull these before next rollout.
- **Rust frontend** gaining parity: `--enable-force-include-usage` now implemented ([#55971](https://github.com/vllm-project/vllm/pull/55971)) — useful if you need usage chunks on every streaming event for billing/telemetry.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-09

## 1. Today's Highlights

The most consequential updates center on **DeepSeek-V4 / DFlash stability and a sampling correctness fix**. PR [#38565](https://github.com/sgl-project/sglang/pull/38565) introduces deterministic top-p / top-k renorm by default in `sgl_kernel`, identifying and fixing the *root cause* of the DFlash/DSpark TP>1 deadlocks behind [#33549](https://github.com/sgl-project/sglang/issues/33549) and [#33289](https://github.com/sgl-project/sglang/issues/33289). The **Weight Cache Daemon** roadmap ([#33522](https://github.com/sgl-project/sglang/issues/33522)) confirms Phase 1 is live: Qwen3-235B FP8 weight load is down from ~306–327 s to <1 s. Several **production-grade hazard reports** remain open on Blackwell + HiCache, most notably [#38300](https://github.com/sgl-project/sglang/issues/38300) (TP2 hang on B300 with FlashInfer MNNVL).

## 2. Releases & Breaking Changes

- **No new tagged releases in the last 24 h.** Public Docker image referenced in user reports remains `lmsysorg/sglang:v0.5.18-cu130` (v0.5.18, FlashInfer 0.6.17). v0.5.19 is referenced in mainline work (Rust TreeCore opt-in).
- **CUDA 13.4 container merge draft:** [#38576](https://github.com/sgl-project/sglang/pull/38576) — adds a CUDA 13.4 build path; affects consumers on older toolchains.
- **CP V1 deprecation 5/5 (docs):** [#36230](https://github.com/sgl-project/sglang/pull/36230) — cookbook/CLI updates users off v1 prefill-CP aliases. Migration: use `--enable-prefill-cp --cp-strategy {zigzag,interleave}`.
- **LoRA + HiCache page-isolation:** [#38577](https://github.com/sgl-project/sglang/pull/38577) — semantics change: L3 storage hashes now seeded with `extra_key`, so identical prompts across adapters will no longer collide.
- **Rust server DP-attention port fix:** [#34430](https://github.com/sgl-project/sglang/pull/34430) — port allocation now derived from scheduler placement (no more offset collision across nodes).

## 3. New Model & Hardware Support

- **Qwen3.8-Flash-Next-NVFP4 (ModelOpt MIXED_PRECISION):** [#38569](https://github.com/sgl-project/sglang/pull/38569) — NVFP4 routed experts + FP8 PLE n-gram table + FP8_BLOCK_SCALES MTP. Follows the generic mixed-precision infrastructure from #37500.
- **DeepSeek-V4 TRT-LLM Attention on SM100/103:** [#30805](https://github.com/sgl-project/sglang/pull/30805) — first-class Blackwell DSv4 attention path.
- **FlashInfer Mega MoE:** [#31470](https://github.com/sgl-project/sglang/pull/31470) — forked into mainline.
- **Mamba 1/2 inference:** [#34556](https://github.com/sgl-project/sglang/pull/34556) — SSM/hybrid architecture support.
- **GLM-5.3-Flash on SM120 (RTX PRO 6000, TP2, W4A16):** tracking [#37813](https://github.com/sgl-project/sglang/issues/37813); not yet qualified.
- **DiT INT8 quantization (ConvRot, online W8A8):** [#38040](https://github.com/sgl-project/sglang/pull/38040) — `sgl-kernel` + `convrot_int8_customkernel`; targets Qwen-Image (38 GiB BF16 DiT).
- **Aaronson-Gumbel text watermarking (opt-in):** [#37577](https://github.com/sgl-project/sglang/pull/37577) — for EU AI Act Art. 50 provenance flows.

## 4. Performance & Optimization

- **Weight Cache Daemon Phase 1 (shipped):** per-rank daemon holds post-quantized weights and serves them over CUDA IPC. Qwen3-235B FP8 weight load: **~306–327 s → <1 s** ([#33522](https://github.com/sgl-project/sglang/issues/33522), [#27139](https://github.com/sgl-project/sglang/pull/27139)).
- **TRTLLM ragged prefill host-sync removal:** [#38502](https://github.com/sgl-project/sglang/pull/38502) — FlashInfer 0.6.18 added an empty-row scan that read back `indptr` to host; fix avoids a per-layer per-prefill host stall.
- **Qwen3-VL unique-image serving on H100:** [#36411](https://github.com/sgl-project/sglang/pull/36411) — drops 24 GiB of always-on preprocessing reservation; one-pass streaming traffic no longer pays for cache-hot bookkeeping.
- **Inkling MTP draft metadata staging:** [#38169](https://github.com/sgl-project/sglang/pull/38169) — moves shared request/KV reads before verify so the scheduler can advance immediately.
- **KV-cache observability:** [#38559](https://github.com/sgl-project/sglang/pull/38559) — adds KV age at hit/eviction, lifetime, and reuse-count metrics for RadixCache and HiRadixCache.
- **Rust TreeCore (opt-in, v0.5.19):** [#38536](https://github.com/sgl-project/sglang/issues/38536) — measured e2e regression vs Python TreeCore at concurrency on small dense models with short shared prefixes. **Do not enable in production yet.**
- **AMD/AITER verify runtime sizing restored:** [#38575](https://github.com/sgl-project/sglang/pull/38575) — fixes a #34647 reversion on the verify path.

## 5. Stability & Regressions

**Critical / production-blocking**

- **[#33549](https://github.com/sgl-project/sglang/issues/33549)** DeepSeek-V4 (dsv4 + DSPARK), TP=8 on 8×H20: decode forward hangs indefinitely at ~245K context, all GPUs 100% util / low power, watchdog kills the server. **Root-cause fix in [#38565](https://github.com/sgl-project/sglang/pull/38565)** (deterministic renorm). Workaround in [#33614](https://github.com/sgl-project/sglang/pull/33614) (broadcast rank 0).
- **[#30209](https://github.com/sgl-project/sglang/issues/30209)** GLM-5.2 NVFP4 + EAGLE on B200/B300: `flashinfer_trtllm` bf16 batched-GEMM IMA on the nextn-draft MoE path. No fix yet.
- **[#37633](https://github.com/sgl-project/sglang/issues/37633)** Qwen3.8-Flash-Next-FP8, H20 TP8: CUDA IMA in the QSA extend prefill path at ~22 concurrent requests; suppressed by `CUDA_LAUNCH_BLOCKING=1` or `--disable-overlap-schedule`.
- **[#38300](https://github.com/sgl-project/sglang/issues/38300)** TP2 hang on 2×B300 (FlashInfer MNNVL) with HiCache + breakable prefill CUDA graphs. Open, no fix.
- **[#38031](https://github.com/sgl-project/sglang/issues/38031)** GLM-5.3-Flash (DSA), 8×H100 TP8: HiCache host-tier load-back corrupts generation even **without** speculative decoding (dropped tool calls, degenerate repetition). Open.
- **[#36830](https://github.com/sgl-project/sglang/issues/36830)** GLM-5.3-Flash: `--kv-cache-dtype fp8_e4m3` is unusable on 8×H20. `index_kpool=4` excludes `flashmla_kv`, and no CUDA DSA backend supports bf16-query × fp8-KV.

**High**

- **[#38202](https://github.com/sgl-project/sglang/issues/38202)** DFLASH/DSPARK draft KV pool budget uses `tp_size` instead of `attn_tp_size` → OOM under DP attention on Kimi-K3.
- **[#33483](https://github.com/sgl-project/sglang/issues/33483)** `max_running_requests=4096` vs `cuda_graph_max_bs=32` defaults are derived independently; crossing the graph ceiling is an absorbing state.
- **[#36537](https://github.com/sgl-project/sglang/issues/36537)** Qwen3.8-Flash-Next thinking + `qwen3_coder` tool parser loops on token ID 0.
- **[#36333](https://github.com/sgl-project/sglang/issues/36333)** Disconnected streaming clients leave zombie requests that decode to `max_tokens` and flood `"state was deleted in TokenizerManager"` — regression from the #34160 revert.
- **[#35080](https://github.com/sgl-project/sglang/issues/35080)** FlashInfer backend reported as "not supported on Blackwell GPUs" — clarify before shipping Blackwell deployments.

**Medium / lower-priority**

- **[#30245](https://github.com/sgl-project/sglang/issues/30245)** (closed inactive) ROCm RDNA3 (gfx1100): fused-MoE blocked by upstream Triton AMD backend.
- **[#30632](https://github.com/sgl-project/sglang/issues/30632)** (closed inactive) Accuracy regression tied to `transformers` 5.8 → 5.12.1.
- **[#30598](https://github.com/sgl-project/sglang/issues/30598)** (closed inactive) On-the-fly `--quantization fp8` quantizes GDN `in_proj_qkvz/in_proj_ba` that official static-FP8 checkpoints exclude.
- **[#38019](https://github.com/sgl-project/sglang/issues/38019)** (closed) Unified radix cache + HiCache + CP=2 livelock on KV-pool-full retractions.

**CI status ([#17050](https://github.com/sgl-project/sgl

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-09

## Today's Highlights

A wave of backend stability fixes shipped in builds **b10853–b10867**, led by **b10867** which changes the default for lazy tensor loading on iGPUs after `--lazy-mode auto` was found to halve prompt-processing throughput on AMD iGPUs (#28326). Vulkan continues to dominate the regression reports — particularly on AMD RDNA3 (RADV/Vega 8/Strix Halo) and Intel Arc — with several DeviceLost crashes, workgroup-count asserts, and a 78% decode-throughput cliff at 131k context that is already mitigated via a suballocation-block-size knob. On the feature side, two MoE optimization PRs (host-resident expert LRU cache and lookahead H2D prefetch) are now in active review, signaling that offloaded-expert performance is becoming a first-class concern for sparse models.

## Releases & Breaking Changes

- **b10867** — [`llama: disable lazy tensor loading by default on iGPUs`](https://github.com/ggml-org/llama.cpp/pull/28326). `--lazy-mode auto` now picks a sensible default per system; the old auto behavior (>4 GiB lazy) is now `large`, and "lazy all" is `all`. This is a behavioral change for AMD/Intel iGPU users who relied on the old auto semantics. ([release](https://github.com/ggml-org/llama.cpp/releases))
- **b10865** — [Revert `restore prop.integrated on HIP builds` (#24233)](https://github.com/ggml-org/llama.cpp/pull/28604). Restores prior HIP integrated-GPU detection; users on Strix Halo / Phoenix may need to re-validate their `LLAMA_HIP_UMA` / `-ot` strategy.
- **b10864** — [Server checkpoint min-step eviction fix](https://github.com/ggml-org/llama.cpp/pull/28302). `create_checkpoint()` now only applies min-step spacing when the checkpoint list is actually full, fixing prompt eviction for short contexts on SWA/recurrent models.
- **b10863** — Metal `mul_mv_iq3_xxs` half-idle simdgroup fix for `ne00 < 1024`; dispatches a separate 8-row split kernel instead of relying on the 4-row path. ([#28086](https://github.com/ggml-org/llama.cpp/pull/28086))
- **b10859** — Header-include fix landing via PR #28566 (resolves #28557, #28559 compile errors).
- **b10858** — [Vulkan UNARY(GELU|SIGMOID|SILU|SOFTPLUS)+MUL fusion](https://github.com/ggml-org/llama.cpp/pull/27220) behind `UNARY_MUL_FUSION` with per-op specialized pipelines; expect modest decode-speedup on transformer FFN paths.
- **b10857** — Vulkan-Hpp non-dispatchable handle fix on 32-bit targets. ([#22892](https://github.com/ggml-org/llama.cpp/pull/22892))
- **b10856** — [Chat: split specialized parsers into `common/parsers`](https://github.com/ggml-org/llama.cpp/pull/27764). 14 template parsers moved out of `chat.cpp`; no behavior change, but watch for downstream build systems that glob sources there.
- **b10855** — [OpenCL conv2d non-contiguous stride fix](https://github.com/ggml-org/llama.cpp/pull/28503).
- **b10853** — [Model: Kimi-K3 recurrent-state rollback support](https://github.com/ggml-org/llama.cpp/pull/28466). Required for proper long-context handling on Kimi-K3 inference.

## New Model & Hardware Support

- **Kimi-K3** — recurrent-state rollback (#28466).
- **HrmTextForCausalLM (DFM Mimir 1B)** — conversion writer for fused `gqkv` projection + new arch support proposed ([#27625](https://github.com/ggml-org/llama.cpp/pull/27625)).
- **Nemotron 3 Super MTPv2** — draft-head loading bug fixed; previously only 19 of 21 tensors were created ([#28617](https://github.com/ggml-org/llama.cpp/pull/28617)).
- **Windows ARM64 + MSVC `cl.exe`** — new build path proposed ([#28362](https://github.com/ggml-org/llama.cpp/pull/28362)) removing the clang dependency for WoA developers.
- **Metal multi-GPU (eGPU + dGPU) on Intel Macs** — feature request opened ([#28565](https://github.com/ggml-org/llama.cpp/issues/28565)).
- **XDNA (AMD Ryzen AI NPU) backend** — long-standing feature request continues to accrue reactions ([#21725](https://github.com/ggml-org/llama.cpp/issues/21725)).
- **GLM 5.3 (flash)** — support requested ([#27922](https://github.com/ggml-org/llama.cpp/issues/27922)).
- **LTX-2 diffusion GGUFs** — RFC for image/video/audio generation pipeline ([#28541](https://github.com/ggml-org/llama.cpp/issues/28541)).

## Performance & Optimization

- **Vulkan suballocation fragmentation cliff** — ~78% decode-throughput drop at 131 072 context on RX 7900 XTX traced to the default ~1 GiB suballocation block; mitigated by `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` ([#27734](https://github.com/ggml-org/llama.cpp/issues/27734)). A code-level fix has not yet landed.
- **Vulkan CPU-side writes when context idle** — proposed fast path for `ggml_backend_vk_cpy_tensor_async`, targeting the ~50 µs fence-wait overhead on split-model transfers ([#28618](https://github.com/ggml-org/llama.cpp/pull/28618)).
- **Vulkan UNARY+MUL fusion** — landed in b10858; specialized pipelines per op instead of runtime branches ([#27220](https://github.com/ggml-org/llama.cpp/pull/27220)).
- **Metal `mul_mv_iq3_xxs` half-idle simdgroup** — fixed via split kernel dispatch for `ne00/32 < 32` (b10863, [#28086](https://github.com/ggml-org/llama.cpp/pull/28086)).
- **HIP branch-free SWAR** — replaces loop-emulated `__vsub4`/`__vcmpne4`/`__vcmpeq4`; also corrects a saturate-vs-wrap bug in `__vsub4` ([#28616](https://github.com/ggml-org/llama.cpp/pull/28616)).
- **MoE host-resident expert prefetch (lookahead H2D)** — `--prefetch-experts-slots N` flag proposed with 327 LoC ([#28414](https://github.com/ggml-org/llama.cpp/pull/28414)).
- **MoE GPU-resident LRU cache for offloaded experts** — caches recently used experts from `-ot ...exps=CPU` paths to avoid system-RAM streaming per token ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861)).
- **`qwen4exp` `-sm tensor` re-enable** — scheduler-placement abort (not QSA) is fixed; test fixture updated ([#28569](https://github.com/ggml-org/llama.cpp/pull/28569)).
- **NVFP4 quantization scale tensors** — `llama-quantize NVFP4` no longer UB; per-tensor `.scale` / `.input_scale` (F32 scalar) now emitted ([#22897](https://github.com/ggml-org/llama.cpp/pull/22897)).

## Stability & Regressions

Ranked by severity for production serving:

1. **[Critical] Vulkan `vk::Queue::submit: ErrorDeviceLost` on RADV (gfx1151) with `--spec-type draft-mtp`** — dies mid-prompt at tens of thousands of tokens; same argv with MTP off survives 125k+. A single-line diagnostic has been identified ([#27306](https://github.com/ggml-org/llama.cpp/issues/27306)). No PR landed yet.
2. **[Critical] RTX 5090 display loss / NVIDIA GSP full-chip reset on Qwen3.8-27B Q6_K** — black screen after several inference requests, reboot required ([#27910](https://github.com/ggml-org/llama.cpp/issues/27910)).
3. **[High] CUDA illegal memory access in `cudaStreamSynchronize` (flash-attn path) with Qwen3.6-35B MoE + partial expert offload** — deterministic, cross-build (b10107, b10243), disappears with `-fa off` ([#26609](https://github.com/ggml-org/llama.cpp/issues/26609)).
4. **[High] Vulkan on Intel Arc A770 hits `GGML_ASSERT(wg0 <= ctx->device->properties.limits.maxComputeWorkGroupCount...)` running Qwen 3.8 flash next** ([#28247](https://github.com/ggml-org/llama.cpp/issues/28247)).
5. **[High] Vulkan `ErrorDeviceLost` on Vega 8 iGPU after ~50K context** ([#26447](https://github.com/ggml-org/llama.cpp/issues/26447)).
6. **[High] SYCL/OpenCL `Experimental P2P feature is not implemented` on multi-GPU Arc** — `dev2dev_memcpy` crash ([#27168](https://github.com/ggml-org/llama.cpp/issues/27168)).
7. **[Medium] MTP retains inter-request state — non-deterministic output / model degradation** on Qwen3.6-35B-A3B-MTP ([#26425](https://github.com/ggml-org/llama.cpp/issues/26425)).
8. **[Medium] HIP/ROCm on gfx1151 produces wrong logits (not a crash) for prompts longer than `n_ubatch`** ([#28211](https://github.com/ggml-org/llama.cpp/issues/28211)).
9. **[Medium] Vulkan/ANV flash-attention fallback to SCALAR path → O(N²) PP degradation + device loss on Arc B580** ([#27638](https://github.com/ggml-org/llama.cpp/issues/27638)).
10. **[Medium] Parallel `tool_calls` mangled or hung across Qwen models on a tool with ~48 optional params** — affects agent/tool frameworks ([#28522](https://github.com/ggml-org/llama.cpp/issues/28522)).
11. **[Medium] Qwen2.5-Omni intermittent silent audio corruption on Metal under system load** ([#28441](https://github.com/ggml-org/llama.cpp/issues/28441)).
12. **[Low] `tools/ui/dist` stale assets break headless `llama-server` builds even with `LLAMA_BUILD_UI=OFF`** — closed/stale ([#25443](https://github.com/ggml-org/llama.cpp/issues/25443)). Mitigated in newer builds.
13. **[Low] `--lazy-mode auto` halves pp512 for qwen4exp on Vulkan (AMD iGPU)** — directly addressed by **b10867 / #28326**.

Build/infra fixes shipped or proposed: **cmake `build-info.cmake` no longer picks up a parent git repo** ([#28462](https://github.com/ggml-org/llama.cpp/pull/28462), fixes #28397); **CI sanitizer tests** ([#28583](https://github.com/ggml-org/llama.cpp/pull/28583)); **API/ABI compatibility checker script** ([#28579](https://github.com/ggml-org/llama.cpp/pull/28579)).

## What This Means for Application Developers

- **Re-benchmark your iGPU and Vulkan-AMD pipelines against b10867+.** `--lazy-mode auto` no longer lazy-loads on iGPUs; if you were relying on the old auto semantics for memory savings, set `--lazy-mode large` or `--lazy-mode all` explicitly.
- **Vulkan on AMD is still the riskiest production path right now.** If you target RDNA3 (RADV) with MTP-draft or any model that pushes beyond ~50k context, pin to a stable build, test with a known-good model+driver matrix, and be prepared for DeviceLost. Until #27306 / #26609 / #26447 land fixes, treat Vulkan as best-effort on those configs.
- **Hit the 131k decode cliff?** Set `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` for now (RX 7900 XTX confirmed). Track for an upstream default change.
- **Tool/agent frameworks on Qwen:** if you use parallel function calls with wide parameter schemas, validate outputs on Qwen-class models — there is an open bug with mangled/hung calls (#28522). Also watch DSML handling for DeepSeek V3.2 (#28612) and the Jinja null-in-map edge case fixed in #28620.
- **MoE model serving:** two upcoming optimizations (LRU cache #27861, lookahead prefetch #28414) target the host-offloaded expert bottleneck. If your serving stack uses `-ot ...exps=CPU` or `-ncmoe`, prototype against these PRs — they should substantially improve decode throughput on Qwen3-class MoE.
- **Long-context SWA/hybrid slot restore:** b10864 fixes checkpoint eviction on `slot save/restore` for SWA and recurrent models (#26004 still in flight for the broader context-checkpoint preservation). If your app persists sessions across slot recycle, re-test.
- **NVFP4 quantization is now actually usable** — if you were blocked by UB or missing scale tensors, the merged fix in #22897 unblocks CUDA MMA dequant paths for NVFP4 weights.
- **Build hardening for headless/embedded deployments:** the cmake `build-info.cmake` fix (#28462) closes a footgun where release tarballs inherited the wrong git SHA from a parent directory — re-run your release builds.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-09

## Today's Highlights

The merge queue was dominated by **MLX runner hardening** and **OpenAI/Anthropic API compatibility fixes**. Two notable MLX pain points closed — the 17–27 s re-prefill caused by prefix-cache misalignment to 8192-token boundaries ([#18267](https://github.com/ollama/ollama/issues/18267)) and an MLX array-lifetime refactor that replaces sweeping with scoped lifetimes ([#18327](https://github.com/ollama/ollama/pull/18327)). On the API side, the `500 "no user query found in messages"` failure for tool-only turns on `/v1/messages` and `/v1/chat/completions` was fixed ([#18303](https://github.com/ollama/ollama/issues/18303)), but a new family of silent-failure bugs opened against `/v1/responses` (developer-role items dropped, `tool_search` results never surfaced to the model).

## Releases & Breaking Changes

No releases in the last 24h. Underlying engine bumps are queued:
- [llama.cpp b10864](https://github.com/ollama/ollama/pull/18317) (PR open, from b10760)
- [MLX version bump](https://github.com/ollama/ollama/pull/18235) (PR open)

## New Model & Hardware Support

- **MLX: Qwen3.5/3.8 static YaRN** — parses YaRN metadata from active RoPE config and honors contexts up to `factor × original_max_position_embeddings`, including multimodal M-RoPE. ([#18263](https://github.com/ollama/ollama/pull/18263), closed)
- **MLX: safetensors import path** — server-side MLX imports added; GGUF create restricted to wrapping existing GGUF inputs into Ollama manifests. ([#14969](https://github.com/ollama/ollama/pull/14969), open)
- **FunctionGemma multi-line tool arguments** — parser fix so `write_file`-style calls with newlines in string args are no longer dropped. ([#18322](https://github.com/ollama/ollama/pull/18322), open)
- **IQ3_S on Qwen3.8-27B-GSQ-RCO-GGUF** — user reports empty `content` with `done_reason: "stop"`; upstream Ollama support for this quantization is unconfirmed. ([#18297](https://github.com/ollama/ollama/issues/18297), open)
- **AMD ROCm (RDNA4 / gfx1200)** — `qwen3.8:27b` intermittently fails loading `TensileLibrary_lazy_gfx1200.dat`; RX 9060 XT 16 GB user-affected. ([#17782](https://github.com/ollama/ollama/issues/17782), open)
- **Model signing (Sigstore-style)** — long-running PR #11573 continues adding signing + integrity verification before model load.

## Performance & Optimization

- **MLX prefix-cache alignment fix** — restore now lands on the exact matched prefix instead of rounding down to a multiple of 8192, eliminating the fixed 17–27 s cold-prompt re-prefill observed on Claude Code–style agent workloads. ([#18267](https://github.com/ollama/ollama/issues/18267), closed)
- **MLX array-lifetime refactor** — bindings now scope lifetimes instead of sweep-based freeing; the prefix-cache eviction path was the trigger (each merge previously accumulated held arrays). ([#18327](https://github.com/ollama/ollama/pull/18327), open)
- **MLX context honoring** — distinguishes explicit hard `num_ctx` from automatic soft sizing; `--ctx-size` only passed to the MLX subprocess when the user/model actually requested it. ([#18285](https://github.com/ollama/ollama/pull/18285), closed)
- **Server: GGUF metadata extraction** — metadata extracted once per blob into `<OLLAMA_MODELS>/metadata/sha256-<hex>.json`, eliminating duplicate caches and the inconsistency between capability implementations. ([#17858](https://github.com/ollama/ollama/pull/17858), open)
- **Server: compaction retry on context overflow** — auto-retry compaction after dropping ~20% of oldest removable transcript on overflow, preserving user/assistant boundaries. ([#18324](https://github.com/ollama/ollama/pull/18324), closed)

## Stability & Regressions

Ranked by user impact:

1. **HIGH — Tool-only turns → HTTP 500 on `/v1/messages` and `/v1/chat/completions`** — fixed in [PR #18303](https://github.com/ollama/ollama/issues/18303) (closed). Same root cause as [#17778](https://github.com/ollama/ollama/issues/17778) for `qwen3.8` at 205k context — that issue remains open awaiting backport/verification.
2. **HIGH — `/v1/responses` silently drops `developer`-role items** — 200 OK, `status: "completed"`, no error, content never reaches model. System/user equivalents work. ([#18305](https://github.com/ollama/ollama/issues/18305), open)
3. **HIGH — Responses API `tool_search` results never offered as callable tools** — Codex CLI / MCP clients affected; tools are visible inside the search result but not on the model's tool list. ([#18306](https://github.com/ollama/ollama/issues/18306), open)
4. **MED — ROCm `TensileLibrary_lazy_gfx1200.dat` failure on RDNA4** — hard crash after some uptime on RX 9060 XT 16 GB. ([#17782](https://github.com/ollama/ollama/issues/17782), open)
5. **MED — `gemma3:12b` structured output (`format`) truncates on quoted input** — `done_reason: "stop"` with very low `eval_count` when source contains escaped double quotes. ([#18094](https://github.com/ollama/ollama/issues/18094), open)
6. **MED — `glm-5.3:cloud` enters endless reasoning and aborts** — only on Ollama Cloud; upstream Z.AI API unaffected. ([#18193](https://github.com/ollama/ollama/issues/18193), open)
7. **LOW — IQ3_S Qwen3.8 GSQ-RCO GGUF produces empty content** — suspected quantization-format support gap. ([#18297](https://github.com/ollama/ollama/issues/18297), open)
8. **LOW — Data races in `progress` render loop and `sched` LogValue** — race between `Stop`/`StopAndClear` and in-flight render on shared `bufio.Writer`; fields in `runnerRef.LogValue` were read without `refMu`. Fixed in [PR #18319](https://github.com/ollama/ollama/pull/18319) (closed).

## What This Means for Application Developers

- **Agent loops on tool-only turns are now safe** on both `/v1/chat/completions` and `/v1/messages` (the typical Claude Code / OpenAI Codex round pattern). If you're on Ollama's 0.30.x branch, validate against the next release; the 500 is recoverable but breaks mid-conversation state.
- **`/v1/responses` is not yet production-grade.** Two silent-failure paths opened today (developer-role items dropped, `tool_search` results not surfaced). Until both ship fixes, prefer `/v1/chat/completions` for Codex-CLI-style MCP workloads, and verify that any `developer`-role instructions you send are actually reaching the model.
- **MLX on Apple Silicon just got meaningfully faster for agent workloads** — the 17–27 s tax at the start of every cold conversation is gone, and YaRN context extension for Qwen3.5/3.8 now works end-to-end through the runner (relevant for long-context code agents). Watch the open [#18327](https://github.com/ollama/ollama/pull/18327) refactor for additional memory-stability wins.
- **Cold-start latency will improve further** when the GGUF metadata extraction PR lands — currently the server hits two parallel caches with inconsistent capability results, which is the kind of thing that surfaces as subtle per-model behavior drift in production gateways.
- **Model provenance** is on the roadmap: PR #11573 is laying down Sigstore-style signing + verification on load. If you run an internal registry or proxy in front of Ollama, start thinking about pinning/verification policies now so you can opt in when it ships.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-09

## Today's Highlights

The activity is dominated by **rate-limiting and security correctness issues** rather than new features. Two related reports show that per-team/per-model quotas (`#34140`) and virtual-key TPM limits (`#24677`) are enforced at roughly half the configured value, and two separate reports (`#40217`, `#39757`) show that auth failures are leaking key hashes and backend identity to unauthenticated callers. On the positive side, a critical Bedrock async-signing fix (`#40270`) lands to take SigV4 off the event loop, and a new opt-in `NON_REASONING` routing tier (`#40273`) is added below `SIMPLE` for agent workloads that just relay tool output.

## Releases & Breaking Changes

No new releases in the last 24h. The most recent shipped work (closed PRs) consists of internal staging promotion (`#40307`), dashboard dependency bumps to Next.js 16.3.3 / Vitest 4.1.11 (`#40312`), and an MLflow streaming memory-leak fix (`#39049`).

## New Model & Hardware Support

- **gpt-6-astra (OpenAI)** — broken on `/v1/chat/completions`; the family is not yet recognized by `is_model_gpt_5_model` / `is_model_gpt_5_4_plus_model`, so `max_tokens` is rejected. Tracked in [#40279](https://github.com/BerriAI/litellm/issues/40279).
- **QwenCloud provider migration path** — request for an official provider for the international Qwen/Wan/CosyVoice platform, OpenAI- and Anthropic-compatible. Tracked in [#36150](https://github.com/BerriAI/litellm/issues/36150).
- **vLLM `/v1/realtime` endpoint** — still open, requesting native provider support. Tracked in [#23102](https://github.com/BerriAI/litellm/issues/23102).
- **Model-group composition ("group of groups")** — feature request reopened/discussed. [#28125](https://github.com/BerriAI/litellm/issues/28125).

No new hardware backends or quantization formats were touched.

## Performance & Optimization

- **Bedrock signing off the event loop** — `/v1/messages`, Converse, count tokens, and pass-through now sign requests asynchronously; previously a botocore credential refresh could freeze the whole worker. [PR #40270](https://github.com/BerriAI/litellm/pull/40270).
- **MLflow streaming leak fixed** — `_stream_id_to_span` is now popped in a `finally` block and mlflow 2.x `end_trace` is called positionally. [PR #39049](https://github.com/BerriAI/litellm/pull/39049).
- **MCP schema discovery proxy mode** — large catalogs are no longer eagerly loaded into every client session; new `/mcp/proxy` exposes `search_tools`, `get_tool_schema`, `call_tool`. [PR #40298](https://github.com/BerriAI/litellm/pull/40298).
- **`NON_REASONING` auto-router tier** — adds a fifth built-in tier below `SIMPLE` so tool-output relay turns don't pay SIMPLE prices while still inheriting adaptive escalation. [PR #40273](https://github.com/BerriAI/litellm/pull/40273).
- **Guardrail tool-call rewrites into streams** — post-call guardrails that rewrite a streamed tool call now actually reach chat, Responses, and Messages streams instead of being discarded. [PR #40271](https://github.com/BerriAI/litellm/pull/40271).
- **OTel v2 per-tenant trace destinations backport** — key/team-scoped trace routing from [#39654](https://github.com/BerriAI/litellm/pull/39654) is being cherry-picked onto `rc/1.101.0`. [PR #40321](https://github.com/BerriAI/litellm/pull/40321).
- **Rust SDK callback invocation** — refactor to support retained-reference callback invocation ahead of moving route execution to Rust. [PR #40070](https://github.com/BerriAI/litellm/pull/40070).

## Stability & Regressions

**Severity: Critical**
- Bedrock requests blocking the event loop on credential refresh — **fixed** in [PR #40270](https://github.com/BerriAI/litellm/pull/40270). Report: [#40270](https://github.com/BerriAI/litellm/pull/40270).

**Severity: High (active, no fix yet)**
- v3 rate limiter double-counts `model_per_team` limits; effective RPM/TPM is half configured. [#34140](https://github.com/BerriAI/litellm/issues/34140).
- Virtual-key TPM limits are still enforced at the wrong value in v1.82.3 despite being marked fixed in #18953. [#24677](https://github.com/BerriAI/litellm/issues/24677).
- Concurrent first requests for an unknown end user bypass the configured default budget. [#40095](https://github.com/BerriAI/litellm/issues/40095).
- Azure Entra Redis auth (`azure_redis_ad_token`) cannot start the proxy in cluster mode — `init_redis_cluster` has no credential provider path. [#37726](https://github.com/BerriAI/litellm/issues/37726).

**Severity: High (translation / correctness)**
- Reasoning-model prompt cache (`encrypted_content`) never carries forward through `/v1/messages` → Responses API bridge, even after #37953. [#39339](https://github.com/BerriAI/litellm/issues/39339).
- Streaming re-chunker drops `tool_calls[].id` and `function.name` when upstream sends a full tool_call in one delta. [#39796](https://github.com/BerriAI/litellm/issues/39796).
- Complexity auto-router moves `reasoning.encrypted_content` follow-ups across model groups. [#40237](https://github.com/BerriAI/litellm/issues/40237).

**Severity: Medium**
- ChatGPT/Codex Responses streaming drops function call args when upstream emits `response.function_call_arguments.done` without deltas. [#27144](https://github.com/BerriAI/litellm/issues/27144).
- Anthropic streaming `tool_use` is lost before internal tool-call chunks on v1.95.0. [#36262](https://github.com/BerriAI/litellm/issues/36262).
- Anthropic `/v1/messages` silently drops `role:"system"` entries inside `messages[]`. [#36917](https://github.com/BerriAI/litellm/issues/36917).
- `token_counter` raises on OpenAI `input_audio` blocks; pre-call context-window and prompt-cache checks silently skip. [#38459](https://github.com/BerriAI/litellm/issues/38459).
- Custom redaction tags (`keyword_redaction_tag`, `pattern_redaction_format`) not honored in v1.87.1. [#30008](https://github.com/BerriAI/litellm/issues/30008).
- `DELETE /v1/files/{file_id}` returns 500 on Bedrock-managed files; cleanup is impossible. [#39715](https://github.com/BerriAI/litellm/issues/39715).
- SearXNG search adapter turns upstream 429/503 into a successful empty result. [#38628](https://github.com/BerriAI/litellm/issues/38628).
- Models exposed by both name and provider type on the proxy API. [#14257](https://github.com/BerriAI/litellm/issues/14257).
- SSO: multiple `app_roles` in payload only the first is honored. [#33434](https://github.com/BerriAI/litellm/issues/33434).

**Severity: Medium (security / information disclosure)**
- 401 on wrong key echoes the stored key hash and the key's full model allowlist. [#40217](https://github.com/BerriAI/litellm/issues/40217).
- Wrong-key 401 also leaks backend software name, DB table name, and SHA-256 of the submitted key. [#39757](https://github.com/BerriAI/litellm/issues/39757).

**Lower-severity / closed**
- Error responses on `/v1/files`, rerank, images, realtime, anthropic, pass-through routes emit literal `"None"` for `type` and `param` — **fixed** in [PR #39536](https://github.com/BerriAI/litellm/pull/39536).
- `lite login` session tokens freeze team models at login time — **fixed** in [PR #40318](https://github.com/BerriAI/litellm/pull/40318).
- Spend-tracking shows `key-hash-...` rows for CLI session tokens — **fixed** in [PR #40275](https://github.com/BerriAI/litellm/pull/40275).
- Tool Permission Guardrail over-logging at WARNING — **closed** via [#32778](https://github.com/BerriAI/litellm/issues/32778).
- MCP `/health` passthrough — **closed** via [#24450](https://github.com/BerriAI/litellm/issues/24450).

## What This Means for Application Developers

- **Re-validate your rate-limit config.** If you set a per-team per-model RPM/TPM via `metadata.model_rpm_limit`, expect clients to hit 429 at roughly half the value until [#34140](https://github.com/BerriAI/litellm/issues/34140) ships. For safety today, double your configured limits or budget based on observed traffic rather than the configured number.
- **Do not yet rely on prompt-cache continuity when bridging Anthropic → OpenAI reasoning models.** `encrypted_content` is being dropped before the upstream sees it ([#39339](https://github.com/BerriAI/litellm/issues/39339)), and the auto-router may also move a follow-up to a different model group, invalidating the cache ([#40237](https://github.com/BerriAI/litellm/issues/40237)). For cost-sensitive reasoning pipelines, pin the upstream model explicitly.
- **Bedrock deployments get a real latency tail win** once [#40270](https://github.com/BerriAI/litellm/pull/40270) is on the release branch; previously a single credential refresh could head-of-line-block every other request on the worker. Worth upgrading for.
- **Agent cost optimization** is now easier with the new `NON_REASONING` tier ([#40273](https://github.com/BerriAI/litellm/pull/40273)). If your agent has many turns that just relay tool output back to the model, route those through the new tier instead of paying SIMPLE prices.
- **Tool-call streaming on /v1/messages is still flaky.** Both v1.95.0 drop-cases ([#36262](https://github.com/BerriAI/litellm/issues/36262), [#39796](https://github.com/BerriAI/litellm/issues/39796)) affect Anthropic-shaped streaming; if your client relies on streaming tool calls, validate against your target LiteLLM version before rollout.
- **Treat LiteLLM

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-09

## Today's Highlights
Unsloth shipped **v0.1.807-beta**, its largest performance release in a while, headlined by switching AMD GPUs to **Vulkan by default** for a ~20% prefill/decoding uplift over ROCm and signing the Windows `llama-server.exe` to cut antivirus false positives. The day also saw heavy investment in **KV-cache preemption** so parallel chats in Studio share a single unified cache without evicting each other ([PR #10301](https://github.com/unslothai/unsloth/pull/10301), [PR #10358](https://github.com/unslothai/unsloth/pull/10358)), plus a wave of Windows installer hardening to suppress Defender/Bitdefender detections.

## Releases & Breaking Changes
- **[v0.1.807-beta — Large Perf Improvements + Fixes](https://github.com/unslothai/unsloth/releases)** — Headline change: AMD now uses Vulkan by default (~20% prefill/decoding lift over ROCm). `llama-server.exe` is now signed on Windows to reduce SAC/Defender false positives. AMD gibberish on Strix and iGPUs fixed (upstream). Migration: nothing required, but AMD users should re-test ROCm-specific workloads since Vulkan is the new default path.

## New Model & Hardware Support
- **AMD Vulkan as default backend** — replaces ROCm as the default AMD path in v0.1.807-beta ([release notes](https://github.com/unslothai/unsloth/releases)).
- **AMD device-node permission handling** — [PR #10473](https://github.com/unslothai/unsloth/pull/10473) probes `/dev/kfd` and `/dev/dri/renderD*` for *openability*, not just existence, so non-`render`-group accounts now get an explicit error instead of silently seeing zero HIP devices (closes [#10466](https://github.com/unslothai/unsloth/issues/10466)).
- **GGUF multi-build handling** — [PR #10556](https://github.com/unslothai/unsloth/pull/10556) surfaces every GGUF build a repo publishes at the same quant (e.g. plain vs. `-mtp` on `AngelSlim/Hy3-GGUF`) instead of collapsing them into one row.
- **Wan2.2 TI2V on AMD ROCm** — attention now falls back cleanly when no fused kernel is available; the RX 9060 XT OOM is being tracked ([#10415](https://github.com/unslothai/unsloth/issues/10415)).
- **MiCA (Minor Component Adaptation)** — open feature request to add MiCA as a LoRA-compatible init in `FastLanguageModel.get_peft_model()` ([#6730](https://github.com/unslothai/unsloth/issues/6730), +4 👍).
- **Qwen3-omni TTS voice cloning** — request to extend the existing Qwen2.5-omni support to Qwen3-omni ([#3636](https://github.com/unslothai/unsloth/issues/3636)).

## Performance & Optimization
- **+20% AMD prefill & decoding** via defaulting to Vulkan over ROCm ([v0.1.807-beta](https://github.com/unslothai/unsloth/releases)).
- **KV-cache preemption for parallel chats** — [PR #10301](https://github.com/unslothai/unsloth/pull/10301) launches llama-server with `--parallel N --kv-unified -c N`, giving N slots a single shared N-cell pool. Pairs with unslothai/llama.cpp#184/#190 so the server can park slots to host RAM itself in [PR #10358](https://github.com/unslothai/unsloth/pull/10358), letting Studio stand down its own preemption layer.
- **Document uploads off the event loop** — [PR #10552](https://github.com/unslothai/unsloth/pull/10552) makes the three upload routes stream to disk and probe the embedder in a worker, so a large PDF no longer freezes streaming replies.
- **Local-model VRAM estimate accuracy** — [PR #10558](https://github.com/unslothai/unsloth/pull/10558) sizes local models by one copy of the weights (no longer double-counts `original/` and `optimizer.pt`), which feeds the full-finetune VRAM estimate.
- **15-min startup cap, smarter version** — [PR #10551](https://github.com/unslothai/unsloth/pull/10551) lets `unsloth start` keep polling even when the server child hasn't printed its early API-key line; [PR #10550](https://github.com/unslothai/unsloth/pull/10550) extends the same cap to LoRA adapters' base-model downloads.

## Stability & Regressions
Ranked by impact and discussion volume.

- **[OPEN] Latest llama.cpp build broke AMD GPU detection** — multiple users see zero AMD devices on gfx1201 with fresh installs ([#7485](https://github.com/unslothai/unsloth/issues/7485), 5 comments). No fix PR yet.
- **[OPEN] Security-audit `hf-stack` lane red on `main`** — `scan_packages` baseline needs re-review after the `unsloth-zoo` bump; 60 CRITICAL / 33 HIGH findings flagged ([#10545](https://github.com/unslothai/unsloth/issues/10545)).
- **[OPEN] Windows: conversation recall order flaky when two turns land in one tick** — `test_conversation_archive.py` ordering assertion fails on the Windows lane ([#10544](https://github.com/unslothai/unsloth/issues/10544)).
- **[OPEN] `parity (windows-latest)` red** — `test_a_non_ascii_marker_survives_the_rollback` fails on both PowerShell and pwsh ([#10460](https://github.com/unslothai/unsloth/issues/10460)).
- **[OPEN] AMD/ROCm Wan2.2 TI2V OOM** — fused attention kernel missing on RX 9060 XT, SDPA math fallback blows VRAM ([#10415](https://github.com/unslothai/unsloth/issues/10415)).
- **[OPEN] AMD device node reporting zero GPUs** for accounts outside the `render` group ([#10466](https://github.com/unslothai/unsloth/issues/10466)) — fixed by [PR #10473](https://github.com/unslothai/unsloth/pull/10473).
- **[OPEN] KV admission: tool-bearing requests bypass the uncapped-cap retry** — broader exemption than the retry that motivated it ([#10176](https://github.com/unslothai/unsloth/issues/10176)).
- **[OPEN] `hasGlobalLinkReference` markdown probe misroutes ordinary replies** to full-document render ([#10529](https://github.com/unslothai/unsloth/issues/10529)).
- **[OPEN] Layer-mode / tensor-mode reported identical, "fake BF16 mode"** on x3 3090 ([#10549](https://github.com/unslothai/unsloth/issues/10549)).
- **[CLOSED] Bitdefender block on first-run Windows install** — `powershell.exe → csc.exe → %TEMP%\*.dll` chain flagged as `Gen:Variant.MSILHeracles`; mitigated by [PR #10540](https://github.com/unslothai/unsloth/pull/10540) (emit pre-compiled native path helper) and [PR #10560](https://github.com/unslothai/unsloth/pull/10560) (CLI stops pairing `Hidden` + `Bypass`).
- **[CLOSED] Windows `Access denied` on `llama-server.exe` when Studio runs unelevated after elevated install** ([#4846](https://github.com/unslothai/unsloth/issues/4846), 15 comments) — addressed via signing in v0.1.807-beta and uninstaller ownership fixes in [PR #10471](https://github.com/unslothai/unsloth/pull/10471).
- **[CLOSED] Stats panel not refreshing summary on day/month toggle** ([#9337](https://github.com/unslothai/unsloth/issues/9337)).
- **[CLOSED] Keyless auth fails for harnesses sending an empty bearer** ([#10400](https://github.com/unslothai/unsloth/issues/10400)).
- **[CLOSED] `unsloth studio update` hammers the GitHub API** ([#10449](https://github.com/unslothai/unsloth/issues/10449)).
- **[CLOSED] Studio "Tell the model today's date" overrides Ollama Modelfile SYSTEM** ([#10436](https://github.com/unslothai/unsloth/issues/10436)).

## What This Means for Application Developers
- **AMD users get a free ~20% throughput bump** by upgrading to v0.1.807-beta and accepting Vulkan as the default backend — but re-test any workload that depended on ROCm-specific numerics or memory layout.
- **Multi-tenant / shared-chat workloads on Studio are about to scale better**: the KV preemption rework lets N concurrent chats share one cache without evicting each other, and the LoRA base-model download fix ([PR #10550](https://github.com/unslothai/unsloth/pull/10550)) means long-running adapter loads no longer trip the startup watchdog.
- **Windows deployment is materially safer**: signed `llama-server.exe` plus the AV-shape guard changes ([PR #10540](https://github.com/unslothai/unsloth/pull/10540), [PR #10560](https://github.com/unslothai/unsloth/pull/10560)) should eliminate the Bitdefender/Defender blocks that have been bricking first-run installs.
- **Python/Terminal tools in Studio gain a real OS sandbox** on Linux (bubblewrap) and macOS (Seatbelt) via [PR #10526](https://github.com/unslothai/unsloth/pull/10526) — if you embed Studio's tool layer, audit any path that assumes host FS/network access.
- **Multi-user installs ship per-account isolation** in [PR #10375](https://github.com/unslothai/unsloth/pull/10375) (Settings → Accounts, one-time setup codes, isolated caches) — relevant for shared GPU boxes and kiosks.
- **Caveats**: `main` is currently red on `Security audit / hf-stack` and `parity (windows-latest)`; pin to a tagged release rather than tracking head until [#10545](https://github.com/unslothai/unsloth/issues/10545) and [#10460](https://github.com/unslothai/unsloth/issues/10460) close. AMD GPU detection on the latest upstream llama.cpp is still broken pending [#7485](https://github.com/unslothai/unsloth/issues/7485).

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — Daily Digest
**Date:** 2026-09-09
**Repository:** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. Today's Highlights

The community focus today is squarely on **gateway performance at scale**: three related issues (#1775, #1776, #1777) detail a provider-count-driven latency regression, with measured costs of "~800k+ redundant Set constructions per request at 46 providers" and a `getAppInfo` RPC clocked at ~7.2s. On the fix side, two PRs (#1773, #1774) tighten observability around failed fallbacks and per-model usage attribution, while #1772 surfaces a forward-compatibility break with newer Claude Desktop config schema validation.

---

## 2. Releases & Breaking Changes

*No new releases in the last 24h.*

Notable **compatibility change** reported:
- [#1772](https://github.com/musistudio/claude-code-router/issues/1772) — Newer Claude Desktop builds validate `configLibrary` against a schema and emit `Ignoring local configuration value … not a recognized configuration key` warnings for 4 keys that CCR writes (`authentication` and others). Mitigation pending; operators seeing log noise should track this issue.

---

## 3. New Model & Hardware Support

*No new model, backend, or quantization additions reported today.*

---

## 4. Performance & Optimization

All three items come from a single performance investigation by user `@Osamious` and form a coordinated picture of uncached per-request work scaling with `Providers.length`.

- **[#1775 — Linear latency vs. provider count](https://github.com/musistudio/claude-code-router/issues/1775):** Request latency through the gateway grows **linearly** with the number of configured providers because an internal provider-display-metadata lookup is recomputed every request. Measured on an isolated sandbox with a near-zero upstream, each additional provider adds roughly constant overhead — concrete numbers in the issue body.
- **[#1777 — `findProvider()` re-derives identity Sets per call](https://github.com/musistudio/claude-code-router/issues/1777):** `Cy.prototype.findProvider(t)` rebuilds each provider's identity `Set` on every invocation rather than normalizing selectors once. At 46 configured providers this amounts to **~800k+ redundant operations per request**. Trivial fix candidate (precompute / memoize).
- **[#1776 — `getAppInfo` RPC ≈ 7.2s](https://github.com/musistudio/claude-code-router/issues/1776):** A separate code path that does not obviously scale with provider count is repeatedly returning in ~7.2s while `getConfig` answers in ~6ms on the same gateway. Filed separately because the root cause is not yet linked to #1775.

No merged performance fixes today, but the three issues together give maintainers a clear, measurable backlog.

---

## 5. Stability & Regressions

Ranked by likely user impact:

1. **[HIGH] #1778 — Wrong protocol used when unchecked](https://github.com/musistudio/claude-code-router/issues/1778)** — Router invokes `gemini_generate_content` even when that protocol checkbox is left off and the UI marks it *Unavailable*. Affects users who expect provider-disabled state to actually disable routing. *No fix PR yet.*
2. **[MEDIUM] #1772 — Schema warnings on Claude Desktop](https://github.com/musistudio/claude-code-router/issues/1772)** — Cosmetic but persistent: every Claude Desktop launch emits 4 "not a recognized configuration key" warnings. *No fix PR yet.*
3. **[MEDIUM] #1775/#1776/#1777 — Latency regressions](https://github.com/musistudio/claude-code-router/issues/1775)** — See Performance section. Functionally correct but materially degrades throughput for users with many providers.
4. **[LOW] #1771 — `tsc -b` fails: TS18003 in `tsconfig.node.json`](https://github.com/musistudio/claude-code-router/pull/1771)** — Build-time only; PR open to fix the `include` glob for `build/**/*.mjs`.
5. **[LOW] #1770 — Docker image missing `log-body.worker.js`](https://github.com/musistudio/claude-code-router/pull/1770)** — Docker builds skip `buildRequestLogBodyWorker()`, so the worker file referenced by the UI bundle is absent in the image, breaking in-browser log body rendering.

Fix PRs landed (open, awaiting merge):
- **[#1773 — Per-attempt failure details in aggregate errors](https://github.com/musistudio/claude-code-router/pull/1773)** — When all targets fail, the gateway will now surface each attempt's `stage`/`status`/`message` instead of only `"All target providers failed."`. Direct quality-of-life improvement for incident triage.
- **[#1774 — Usage stats attribution for `provider/model` selectors](https://github.com/musistudio/claude-code-router/pull/1774)** — Per-model usage counters currently ignore requests routed via explicit `provider/model` (e.g. env-configured defaults), inflating the unfiltered total. The fix attributes them to the bare model name.

---

## 6. What This Means for Application Developers

- **Operators with large provider pools (tens of providers) should expect measurable per-request overhead today.** If you're seeing unexplained gateway latency, check your configured `Providers` count and subscribe to [#1775](https://github.com/musistudio/claude-code-router/issues/1775) / [#1777](https://github.com/musistudio/claude-code-router/issues/1777) — fixes here are likely to be small (memoization) and high-impact.
- **Treat the "Unavailable" checkbox as advisory, not enforced**, pending [#1778](https://github.com/musistudio/claude-code-router/issues/1778). If you've intentionally disabled `gemini_generate_content` and are seeing Gemini traffic, audit your routes.
- **Usage dashboards will be more honest after #1774 lands.** If you rely on CCR's per-model stats to forecast cost or allocate budgets, expect historical undercounting on any traffic routed through explicit `provider/model` defaults.
- **Fallback debugging becomes materially easier once #1773 merges** — each attempt's HTTP status and error message will be available in the aggregate error payload, which is a meaningful change for retry / circuit-breaker logic on the client side.
- **Self-hosters on Docker should pull a build that includes [#1770](https://github.com/musistudio/claude-code-router/pull/1770)** — otherwise the UI's request-log detail view is broken.
- **Expect (and ignore) `not a recognized configuration key` warnings** on Claude Desktop until [#1772](https://github.com/musistudio/claude-code-router/issues/1772) is resolved; they are not affecting functionality.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-09

## Today's Highlights

A coordinated wave of **Responses API proxy hardening** landed overnight, addressing stream truncation, reasoning-summary fidelity, empty `reasoning_content` block churn, and TTFT accuracy on streaming Responses. The Codex integration remains the dominant source of bug reports — six of the top 15 issues are Codex-related, ranging from a v3.20.1 auth-binding migration deadlock to usage-sync cursor failures on Windows and macOS direct-connection bypasses. Meanwhile, the Qwen preset catalog was rebranded to **千问AI平台** with a full 3.8-generation refresh across all seven supported apps.

## Releases & Breaking Changes

No new releases in the last 24h. Current tracking version per issues: **v3.20.1** with known regressions (see Stability section).

## New Model & Hardware Support

- **Qwen 3.8 generation full refresh** — Domestic DashScope presets rebranded as **千问AI平台**, model catalog updated across Claude Code, Claude Desktop, Codex, Hermes, OpenClaw, OpenCode, and Pi ([PR #7183](https://github.com/farion1231/cc-switch/pull/7183)).
- **Auto Mode classifier routing** — New dedicated provider chain for Claude Code Auto Mode's pre-Bash security-classifier requests, enabling cross-provider split between conversation and classifier traffic ([PR #6602](https://github.com/farion1231/cc-switch/pull/6602)).
- **Configurable Codex Provider IDs** — Official unified-history and takeover Provider IDs are now device-level configurable (defaults `custom` / `cc-switch-official`) ([PR #7073](https://github.com/farion1231/cc-switch/pull/7073)).
- **Cross-app provider copy** — Copy provider cards between applications with per-target success/skip/fail reporting and protocol-following metadata ([PR #7225](https://github.com/farion1231/cc-switch/pull/7225)).

No new hardware backend (CUDA/ROCm/Metal/CPU) or quantization format changes — CC Switch is a configuration-routing layer, not a compute runtime.

## Performance & Optimization

- **TTFT accuracy on Responses streaming** — First-byte timing no longer waits for end-of-stream `usage`; decoupled to fire on the first valid event. Addresses TTFT ≈ total-latency symptoms ([PR #7233](https://github.com/farion1231/cc-switch/pull/7233), related [#6637](https://github.com/farion1231/cc-switch/issues/6637)).
- **Eliminated streaming block churn** — OpenAI Chat → Anthropic SSE converter no longer closes/opens empty `thinking` blocks on every chunk when upstreams emit empty-string `reasoning_content` placeholders ([PR #7227](https://github.com/farion1231/cc-switch/pull/7227)).
- **Responses truncation handling** — Synthesizes clean `content_block` close before `stream_truncated` on web-search-limit cutoffs; closes dangling blocks on incomplete termination ([PR #7044](https://github.com/farion1231/cc-switch/pull/7044)).
- **Codex usage-sync stuck-rollout fix** — Persisted byte cursor plus size comparison detects Windows cases where mtime is unchanged but file content grows ([PR #7219](https://github.com/farion1231/cc-switch/pull/7219)).
- **Codex Responses Lite tool preservation** — Direct `input[].type = "additional_tools"` carriers now retained through Chat conversion instead of being dropped as noise ([PR #6159](https://github.com/farion1231/cc-switch/pull/6159)).
- **Responses reasoning summaries for Claude Code** — Visible summaries requested when Claude thinking is on; translated into replayable Anthropic `thinking` blocks instead of `redacted_thinking` ([PR #6814](https://github.com/farion1231/cc-switch/pull/6814)).

## Stability & Regressions

**High severity (functional deadlocks / data loss):**

- **Codex auth-binding migration deadlock on v3.20.1** — `authBinding.accountId` not migrated when workspace primary key changed; users locked out of all providers with "账号不存在". Windows 11 confirmed ([Issue #6969](https://github.com/farion1231/cc-switch/issues/6969)). *No fix PR identified.*
- **Codex fork usage loss (GPT-5.6-Sol)** — Child sub-agents forked from paginated rollouts permanently tagged "父 rollout 尚未写到 child fork 时刻"; all fork usage dropped on macOS v3.20.1 ([Issue #7084](https://github.com/farion1231/cc-switch/issues/7084)). *No fix PR identified.*
- **Codex config.toml `requires_openai_auth` override** — CCS force-overwrites user's intended value, breaking custom routing ([Issue #7211](https://github.com/farion1231/cc-switch/issues/7211)).
- **Proxy 400 on Codex `/responses`** — `tool`-role messages rejected when not preceded by `tool_calls`; DeepSeek + `gpt-5.5` combination failing ([Issue #4741](https://github.com/farion1231/cc-switch/issues/4741)).
- **macOS Codex bypasses local proxy** — Codex CLI (v0.147.0) hits `wss://api.openai.com` directly, ignoring `127.0.0.1:15722`; requires explicit `transport_kind = responses_http`. Windows unaffected ([Issue #6256](https://github.com/farion1231/cc-switch/issues/6256)). *Partial mitigation: [PR #7213](https://github.com/farion1231/cc-switch/pull/7213) adds `NSLocalNetworkUsageDescription`.*

**Medium severity:**

- **Codex 429 rate-limit storm** — `exceeded retry limit, last status: 429` during normal Codex calls ([Issue #4752](https://github.com/farion1231/cc-switch/issues/4752)).
- **Codex dashboard "真实消耗 Tokens" stale** — Incremental sync writes but summary card only refreshes after manual rebuild ([Issue #7135](https://github.com/farion1231/cc-switch/issues/7135)).
- **Common-config array replace loses providers** — `deepMerge` clobbers provider entries; PR treats common-config arrays as subsets with deduped union merge ([Issue/PR #6144](https://github.com/farion1231/cc-switch/pull/6144)).
- **OpenCodeGo missing `x-opencode-session`** — Provider rejects requests without header from 09/06 ([Issue #7088](https://github.com/farion1231/cc-switch/issues/7088)).
- **Symlink replacement on config edit** — Editing config files destroys existing symlinks ([Issue #5129](https://github.com/farion1231/cc-switch/issues/5129)).
- **v3.16.3 cached proxy state → 502** — Proxy flag remains true after toggle-off ([Issue #4679](https://github.com/farion1231/cc-switch/issues/4679)).

**Lower severity / configuration:**

- Claude Desktop Anthropic protocol errors ([Issue #6605](https://github.com/farion1231/cc-switch/issues/6605)); Code field mismatch after Codex + ChatGPT merge ([Issue #5342](https://github.com/farion1231/cc-switch/issues/5342)); `X-OpenAI-Internal-Codex-Responses-Lite` model-not-supported ([Issue #4862](https://github.com/farion1231/cc-switch/issues/4862)); LAN API unreachability ([Issue #7109](https://github.com/farion1231/cc-switch/issues/7109)); default-app focus on launch ([Issue #6935](https://github.com/farion1231/cc-switch/issues/6935)); OpenCodeGo image processing via CLI ([Issue #5141](https://github.com/farion1231/cc-switch/issues/5141)).

**Recently closed:** ZCode support request ([Issue #4744](https://github.com/farion1231/cc-switch/issues/4744)); OpenAI Codex v0.150.1 `unknown variant 'custom'` ([Issue #6944](https://github.com/farion1231/cc-switch/issues/6944)); Windows `claude` not found ([Issue #1438](https://github.com/farion1231/cc-switch/issues/1438)); settings.json login issue ([Issue #404](https://github.com/farion1231/cc-switch/issues/404)).

## What This Means for Application Developers

1. **Avoid v3.20.1 for Codex-heavy workflows** — Two unfixed deadlocks (auth migration, fork-usage tracking) and a macOS direct-connection bypass can silently break routing and lose usage records. Pin to v3.20.0 or wait for the next patch if you rely on Codex.
2. **Plan for Qwen 3.8 migration** — All Qwen presets are now 3.8-generation; review model names in any pinned scripts, CI matrix, or cost dashboards before pulling the preset refresh.
3. **Streaming telemetry is finally trustworthy** — TTFT is no longer pegged to total latency on Responses streams. If you instrument CC Switch via the dashboard, the metrics from the upcoming release will reflect real first-token behavior.
4. **Cross-provider Auto Mode routing is now possible** — The classifier queue lets you pin a cheap/fast model to security-classifier traffic while keeping a stronger model for conversation. Useful for cost control on Claude Code Auto Mode.
5. **macOS users need Local Network permission granted** — After upgrading, expect a one-time prompt; otherwise LAN APIs will silently fail ([PR #7213](https://github.com/farion1231/cc-switch/pull/7213)).
6. **Provider management got better** — Cross-app copy ([PR #7225](https://github.com/farion1231/cc-switch/pull/7225)) and metadata-preserving universal sync ([PR #7212](https://github.com/farion1231/cc-switch/pull/7212)) reduce the risk of losing per-app usage scripts when adding a unified provider upstream.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-09

## Today's Highlights

The team shipped **v1.0.0-rc.36** centered on Task Plugins, the Plugin Marketplace, and pricing/quota configuration, with a notable new option to display pricing in a site's local currency while still deducting quotas in USD. On the maintenance side, two billing/metrics correctness issues surfaced (#7229 image cache double-charge, #7134 cancelled streams counted as failures) that operators should track, while the AWS default credential chain proposal (#7257) was closed as invalid only to reappear as an open implementation PR (#7258).

## Releases & Breaking Changes

- **v1.0.0-rc.36 — Task Plugins, Pricing Configuration, and Quota** ([release](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.36))
  - Adds plugin icon, website, metadata, and capability fields; new-channel flows can auto-populate matching plugin info.
  - Pricing configuration now allows entering/viewing prices in the site's display currency, **but quota deductions remain in USD** — operators should audit user-facing pricing screens to confirm the dual-currency UX is consistent.
  - Improvements to model management, catalog/square presentation, API key & user quota handling, usage logs, and redemption codes.

## New Model & Hardware Support

- **xAI Grok Imagine Video async tasks** proposed ([#7251](https://github.com/QuantumNous/new-api/issues/7251)) — would add a dedicated path for Grok's video-generation async job model alongside existing video channels.
- **AWS Bedrock default credential chain** ([#7258](https://github.com/QuantumNous/new-api/pull/7258), closes [#7257](https://github.com/QuantumNous/new-api/issues/7257)) — supports instance roles / IRSA / IAM Roles Anywhere for AWS channels, removing the need to bake static keys into deployments.
- **DaoXE channel type** request ([#7264](https://github.com/QuantumNous/new-api/issues/7264)) — closed as invalid; users can already onboard via the generic OpenAI-compatible custom channel plus base URL.

## Performance & Optimization

- **Multi-Key channel "Test All Keys"** ([#7112](https://github.com/QuantumNous/new-api/pull/7112), open) — concurrent testing of all keys in a multi-key channel plus auto-disable rules; meaningful speedup for operators managing large channel fleets.
- **Active channel probing toggle** ([#7161](https://github.com/QuantumNous/new-api/pull/7161), open) — refined throttling and an opt-in switch for probing, reducing wasted upstream calls on cold channels.
- **Cancelled-stream metric pollution fix path** ([#7134](https://github.com/QuantumNous/new-api/issues/7134)) — when a downstream client disconnects mid-stream, the request is currently folded into the failure-rate denominator; a fix would materially improve apparent channel reliability on dashboards.
- **Closed exploratory PRs this window**: Responses WebSocket v2 consolidation ([#6914](https://github.com/QuantumNous/new-api/pull/6914)), SSE buffering for non-stream Claude callers ([#6292](https://github.com/QuantumNous/new-api/pull/6292)), live-refresh usage logs ([#6291](https://github.com/QuantumNous/new-api/pull/6291)), Responses compatibility policy on channel-test ([#6290](https://github.com/QuantumNous/new-api/pull/6290)), hourly USD FX feed ([#7265](https://github.com/QuantumNous/new-api/pull/7265)).

## Stability & Regressions

Ranked by severity for self-hosters:

1. **[BUG, serious] Image cache hit triggers duplicate billing** — [#7229](https://github.com/QuantumNous/new-api/issues/7229) (open, v1.0.0-rc.30). Cached image responses appear to bill twice. **Action:** audit image-generation usage logs for duplicate quota entries; consider capping daily image quota until patched.
2. **[BUG] Client-cancelled streams counted as failures** — [#7134](https://github.com/QuantumNous/new-api/issues/7134) (open). Inflates channel failure rates; full root-cause analysis is included in the issue.
3. **[BUG] Qwen3 `enable_thinking` not forwarded to Aliyun** — [#1013](https://github.com/QuantumNous/new-api/issues/1013) (open, stale, 6 comments). Non-stream Qwen3 calls silently inherit the default thinking-on behavior, which Aliyun disallows for non-stream responses.
4. **[BUG] SMTP verification code not sent on signup** — [#3126](https://github.com/QuantumNous/new-api/issues/3126) (open, stale). SMTP test sends fine; only the registration flow fails to trigger.
5. **[BUG] Recharge amount over-decimal display** — [#3177](https://github.com/QuantumNous/new-api/issues/3177) (open, stale).
6. **[BUG] Audio handler missing parameter overrides** — [#3191](https://github.com/QuantumNous/new-api/issues/3191) (open, stale).
7. **[BUG] CNY display divides subscription price by FX rate a second time** — [#3206](https://github.com/QuantumNous/new-api/issues/3206) (open, stale) — financial correctness, worth verifying post-upgrade.

**Fix PRs that landed this window:**

- **SSE encoding hardening** ([#7259](https://github.com/QuantumNous/new-api/pull/7259), open) — fixes a latent `data.(string)` panic in `common/custom-event.go` for any future channel emitting non-string SSE payloads, plus closes a Coze streaming body leak and removes dead default-password code. Strongly recommended to merge quickly; this is a panic-on-edge-input risk.

## What This Means for Application Developers

- **Upgrade to v1.0.0-rc.36 for the marketplace/plugin improvements**, but review how the dual-currency pricing display (local for display, USD for deduction) is communicated to end-users — accidental under-charging bugs (cf. #3206) remain a recurring class of issue in this codebase.
- **If you self-host with AWS Bedrock**, watch PR [#7258](https://github.com/QuantumNous/new-api/pull/7258) — once merged it removes the need to distribute long-lived AWS keys to relay pods.
- **If you route Grok Image → Grok Imagine Video**, request access via [#7251](https://github.com/QuantumNous/new-api/issues/7251); an async job model will require new client integration patterns (poll vs. webhook).
- **Operational dashboards may overstate failure rates today** because of [#7134](https://github.com/QuantumNous/new-api/issues/7134); until fixed, filter cancelled-stream samples before alerting on channel SLOs.
- **For image workloads, gate quota at the application layer** as a short-term defense against [#7229](https://github.com/QuantumNous/new-api/issues/7229)'s double-billing until a fix lands.
- **Admin/security posture hardening** is incoming via [#7262](https://github.com/QuantumNous/new-api/issues/7262) (API key max-expiry enforcement), [#7263](https://github.com/QuantumNous/new-api/issues/7263) (org-wide 2FA), and [#7261](https://github.com/QuantumNous/new-api/issues/7261) (admin view/manage user API keys) — plan tenant-communication around these once they ship.
- **Closed-as-invalid #7256 (desktop login relay)** indicates the maintainers are not pursuing a browser-to-desktop auth handoff at the gateway layer; desktop tool authors like LoongPort will need to keep that flow client-side.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*