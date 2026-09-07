# AI Infrastructure Digest 2026-09-07

> Generated: 2026-09-07 01:51 UTC | Projects covered: 9

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

# Cross-Project AI Infrastructure Report — 2026-09-07

## 1. Ecosystem Overview

The stack is simultaneously shipping fast and paying down correctness debt. Serving engines (vLLM, SGLang) spent the day triaging the collision of three waves — Blackwell silicon (sm120/sm121), low-precision formats (FP8/NVFP4/W4A16), and hybrid linear-attention architectures — which is producing non-determinism, silent output degeneration, and prefix-cache misses rather than simple crashes. llama.cpp shipped **ten point releases in 24 hours**, remaining the highest-cadence project in the ecosystem, while both API gateways (LiteLLM, New API) are fighting billing-correctness bugs — a strong signal that the gateway layer has become revenue-critical infrastructure. Finally, agent workloads (tool calls, long multi-turn sessions, prefix reuse) are now the dominant shaping force at *every* layer: from KV-cache fragmentation fixes in llama.cpp to tool-call translation bugs in CC Switch and startup fragility in Claude Code Router.

## 2. Activity Comparison

| Project | Layer | Issues tracked | PRs tracked | Release status (24h) |
|---|---|---|---|---|
| **vLLM** | Serving engine | ~29 | ~18 | None (zstd container feature declined) |
| **SGLang** | Serving engine | 39 updated | 295 updated | None; CI: 1 broken, 9 flaky, 957 recently fixed |
| **llama.cpp** | Local runtime | ~20 | ~15 | **10 releases** (b10821–b10830) |
| **Ollama** | Local runtime | 3 | 2 | None (metrics PR landed) |
| **LiteLLM** | Gateway / proxy | ~14 | ~8 | **v1.100.0 stable + v1.101.0-rc.1** (cosign-signed) |
| **Unsloth** | Fine-tuning / local serving | ~18 | ~20 | None |
| **Claude Code Router** | Agent router | 2 | 1 | None |
| **CC Switch** | Agent router / switcher | ~20 | ~15 | None |
| **New API** | Gateway / relay | ~8 | ~10 | **v1.0.0-rc.34** (security milestone) |

*Methodology: counts reflect items referenced in each project's digest, not total repo activity; SGLang's counts are explicitly stated in its digest footer. llama.cpp and the two gateways were the only projects to cut releases; engines and fine-tuning layers worked exclusively on `main`.*

## 3. Model Support Race

**Shipped (released) today — llama.cpp leads.** It is the only project that actually *shipped* new architecture support: end-to-end **Spark2_5ForCausalLM** (b10828), a GDN normalization correctness fix affecting all Gated Delta Net models (b10829), and `--fuse-qkv` GGUF conversion (b10830). **HrmText/DFM Mimir 1B** and **Kimi-K3** speculative-decoding state rollback are in flight as open PRs.

**Frontier depth in-flight — vLLM.** Support work for **Qwen3.8-Flash-Next** (QSA sparse attention, #55272) and **DeepSeek-V4** on sm12x (DeepGEMM pin #53680, TileLang fallback #53055) dominates its PR flow, but the headline news is that these newest paths carry the worst open bugs (non-determinism #54521, #53257).

**Hardware breadth — SGLang.** Widest surface area by far: T-Head PPU (ZW810), Ascend Atlas A5 NPU with DSV4, ROCm gfx950 assembly attention (MI355X), Apple Silicon MLX RFC (#32321), and next-gen Xeon CBB topology detection. Its model work (GLM-5.3-Flash, DeepSeek-V4) is currently *stability-bounded*, not capability-bounded — five separate GLM-5.3-Flash bug clusters are open.

**API-only flagships — gateways, instantly.** GPT-6 Astra, Gemini 3.8 Flash, and GLM-5.3 Flash became "supported" the same day via pricing seeds (CC Switch #7162–7164) and capability tables (New API #7211). At this layer, model support is routing/billing metadata, not kernels — but it ships in hours, not weeks.

**Trailing — Ollama.** Its `spark2_5` request (#18195) fails at inference and is blocked on upstream llama.cpp support trickling down — a structural consequence of its position one layer above llama.cpp.

## 4. Performance Frontier

**KV cache and prefix reuse is the single largest concentration of effort** — present in 7 of 9 projects today:

- *SGLang*: four-part KV-cache sharding refactor (#37614 is 1/4), HiCache swap-in planner fix, unified-KV SWA accounting.
- *vLLM*: hybrid-Mamba prefix-cache misses (#53504, #43587, #54094), CPU-offload memory accounting (#54014), connector serialization causing **12× TTFT inflation** on shared 10k prefixes (#44294).
- *llama.cpp*: agentic non-contiguous KV restore (#27991) — but also the day's worst new perf regression: **−42–54% prefill throughput** under `-np 2 --kv-unified` (#28495).
- *Ollama*: MLX prefix-restore rounding wastes **17–27 s per turn** on agent workloads (#18267).
- *Unsloth*: KV preemption for parallel chats (#10301, #10358); one user lost **44 hours of a 48.8 h run** to a disabled prompt cache (#10382).

**Kernels**: vLLM's ROCm MLA decode fusion (RoPE + Q/KV concat + FP8 KV write) and DeepGEMM pinning for sm12x; SGLang's gfx950 assembly attention for EAGLE verify paths; llama.cpp's branchless Q4_K/Q5_K mmvq scale unpack plus RDNA4/Metal M2 Max tuning.

**Speculative decoding/MTP is maturing — but specifically *unsafe* at the intersection with quantized targets and hybrid attention**: llama.cpp #25618 (draft divergence on quantized targets, fine on bf16), vLLM #53180 (silent degeneration: turboquant KV + MTP + hybrid GDN), SGLang #37326 (MTP acceptance decays to ~0 over uptime). Kimi-K3's bounded recurrent-state rollback (#28466) is the architectural answer for linear-attention spec decode.

**Quantization**: the Blackwell FP8/NVFP4 determinism cluster (vLLM #54521/#53257/#55571) and compressed-tensors W4A16 all-NUL output (SGLang #38143) show quantized paths are where correctness bugs now concentrate.

**Gateway-level "performance"** is resilience, not throughput: New API's per-channel **TTFB timeout with automatic fallback** (#7228) is the most operationally significant latency fix of the day.

## 5. Layer Positioning

- **Serving engines (vLLM, SGLang)** — correctness-bearing kernel layer. Their roadmaps are converging on the identical problem set (determinism, hybrid attention, spec decode, disagg); differentiation is narrowing to focus: vLLM on NVIDIA/ROCm kernel depth and observability (MFU metrics #55624), SGLang on hardware breadth and KV allocator architecture.
- **llama.cpp is the substrate, not just a runtime.** Both Ollama and Unsloth build directly on `llama-server` (Ollama's `spark2_5` gap; Unsloth's `--parallel N --kv-unified` topology and `--preempt-ram` integration). One C++ codebase now underpins three product layers — which also means upstream regressions like #28495 propagate outward to both.
- **Ollama** — packaging/UX layer, finally adding production observability (Prometheus `/metrics`, PR #16998, two years after request #3144).
- **Unsloth** — nominally the fine-tuning layer, but today's activity is almost entirely *serving orchestration*: installers, Strix Halo Vulkan routing, DGX Spark topology selection, cache management. It is strategically drifting from "training framework" toward "local AI desktop" — the most notable layer blur in this digest.
- **Gateways (LiteLLM, New API)** — revenue-critical proxy layer. LiteLLM = enterprise spend-management proxy (its bugs are *money* bugs); New API = multi-provider relay with quota/billing plus a serious security milestone (TOTP/Passkey, scope-bound proofs, audit logs in rc.34).
- **Agent routers (Claude Code Router, CC Switch)** — single-user, client-side; their failure modes are translation fidelity (Responses↔Chat, `tool_call_id` semantics) and destructive config-file writes, not scale.

## 6. Trend Signals

1. **Blackwell quantization correctness debt is systemic, not project-specific.** FP8/NVFP4 non-determinism (vLLM), SM120/121 crashes and all-NUL quantized output (SGLang, Ollama). *Rule: validate quantized checkpoints on the actual target silicon; H100-passing artifacts do not transfer.*
2. **Hybrid linear attention is the new frontier — and the new bug farm.** The hardest open bugs live at the three-way intersection of **hybrid attention × prefix caching × speculative decoding** (vLLM #53180/#53504; SGLang #29857; llama.cpp #25618, silent EOS past 130k in #27756). Expect 1–2 more quarters of instability here.
3. **`/v1/responses` is the least-hardened API surface across gateways.** LiteLLM streams it without writing spend logs (#29913) and can trap agents in tool-call loops (#29810); CCR returns 502s on it (#1762); CC Switch's Responses↔Chat translation is its biggest bug cluster. Agents migrating to the Responses API should expect rough edges and carry retries.
4. **Billing correctness is the gateway layer's maturity crisis.** LiteLLM: uncharged streaming traffic, double-billed cache reads, false budget-exceeded 429s. New API: cached-image double-charging, post-disconnect charging. Both in the same 24 h — audit spend logs now.
5. **Prefix-cache hit rate is now a financial metric.** Today's regressions cost 17–27 s/turn (Ollama), 44 GPU-hours (Unsloth), 12× TTFT (vLLM), and 42–54% throughput (llama.cpp). Treat cache reuse as a first-class SLO.
6. **Observability/security hardening wave**: Ollama metrics, llama.cpp `--log-jsonl`, LiteLLM cosign signing, New API TOTP/audit logs — the ecosystem is productionizing in lockstep.
7. **Hardware long tail keeps lengthening** (T-Head PPU, Ascend, Strix Halo, Hexagon, RDNA4, MLX) — multi-vendor deployments need per-backend smoke gates.

**Watchlist for agent/application developers:** pin SHAs and gate every chat-template upgrade behind tool-call smoke tests; use bf16 targets (or disable speculation) on correctness-critical spec-decode paths; back up `~/.claude/settings.json` and `~/.codex/config.toml` before touching CC Switch (destructive writes, #1198/#3631 unresolved); supervise Claude Code Router startup externally (5 s hardcoded deadline fails under load, #1761); and if you run multi-slot unified-KV topologies, test explicitly against llama.cpp #28495 before rolling out.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-07

## 1. Today's Highlights

The last 24 hours did not bring any new releases, but the discussion list is dominated by **non-determinism and prefix-cache regressions on Blackwell-class GPUs (sm120/sm121, GB10, B300)** with FP8/NVFP4 Qwen3.x and DeepSeek-V4-Flash models (#54521, #53257, #55571), and by a cluster of **prefix-cache misses in hybrid Mamba/Attention + MTP/DFlash setups** (#54094, #53504, #43587). On the constructive side, ROCm MLA kernel fusion is progressing (#47757, #55230), and a number of long-stale bugs and refactors have finally been merged or closed.

## 2. Releases & Breaking Changes

*No new releases in the last 24h.*

Note: the `#28656` "Zstd Docker images" feature request was **closed** (not implemented), so gzip remains the container compression default for now.

## 3. New Model & Hardware Support

- **Qwen3.8-Flash-Next (QSA / sparse attention)** — ongoing support work. [#55272](https://github.com/vllm-project/vllm/pull/55272) removes `torch.compile` for the NVIDIA implementation in favor of eager break points to fix [#54688](https://github.com/vllm-project/vllm/issues/54688). The accompanying bug [#54521](https://github.com/vllm-project/vllm/issues/54521) exposes non-determinism in `persistent_topk` once the prompt crosses `indexer_budget`.
- **DeepSeek-V4 / DSv4** — multiple targeted fixes land on `nv_dev`: [#53680](https://github.com/vllm-project/vllm/pull/53680) pins DeepGEMM to `a6b593d` until pure-FP8 1d1d is restored for sm12x, [#53522](https://github.com/vllm-project/vllm/pull/53522) gates indexer paged-MQA metadata on actual DeepGEMM support, [#53055](https://github.com/vllm-project/vllm/pull/53055) adds a TileLang fallback for `mhc_pre_broadcast`, and [#43146](https://github.com/vllm-project/vllm/pull/43146) hardens `cutedsl` probing.
- **GPT-OSS-120b** — intermittent `openai_harmony.HarmonyError` on v0.26.0 with `gpt-oss-120b` tool calls tracked in [#51977](https://github.com/vllm-project/vllm/issues/51977).
- **Transformers v5 / InternVL2** — meta-device migration sub-task [#38425](https://github.com/vllm-project/vllm/issues/38425) is open and looking for contributors (help wanted, good first issue).
- **DFlash2 / DFlash draft heads** — incompatibility surfaced on RTX PRO 6000 Blackwell Max-Q [#54094](https://github.com/vllm-project/vllm/issues/54094) and H200 [#44889](https://github.com/vllm-project/vllm/issues/44889).
- **LoRA high-rank MoE** — [#55161](https://github.com/vllm-project/vllm/pull/55161) adds a graceful fallback when `max_lora_rank > 128`, fixing [#55158](https://github.com/vllm-project/vllm/issues/55158).

## 4. Performance & Optimization

- **MFU/MBU analytics** — [#55624](https://github.com/vllm-project/vllm/pull/55624) extends the `--enable-mfu-metrics` estimator (closes [#38170](https://github.com/vllm-project/vllm/issues/38170)) so sliding-window attention and hybrid Mamba layers are no longer silently mis-modeled.
- **ROCm MLA decode fusion** — [#47757](https://github.com/vllm-project/vllm/pull/47757) and [`#55230`](https://github.com/vllm-project/vllm/pull/55230) collapse `RoPE + Q/KV concat + FP8 KV-cache write` for sparse MLA on the AITER path; together they target the per-layer decode prep hot path for DeepSeek-R1.
- **ROCm Sparse-MLA + MTP** — [#54369](https://github.com/vllm-project/vllm/issues/54369) identifies that fused multi-step draft decode is not supported by `DEEPSEEK_V32_INDEXER`, `KPOOL_TAIL`, or `ROCM_AITER_MLA_SPARSE`, capping useful MTP depth at `k=4` on GLM-5.3-Flash.
- **RDNA hybrid-Mamba decode** — [#50264](https://github.com/vllm-project/vllm/issues/50264) is unblocked upstream by [#45916](https://github.com/vllm-project/vllm/issues/45916)'s split-KV decode kernel now admitting gfx11; falls back from hybrid attention to Triton paged attention at long context otherwise.
- **AWQ kernel profiling** — [#55462](https://github.com/vllm-project/vllm/issues/55462) profiles `gemm_forward_4bit_cuda_m16nXk32` (RTX 3070 Ti) as heavily L1/memory bound; awaiting optimization proposals.
- **KV offload memory accounting** — [#54014](https://github.com/vllm-project/vllm/pull/54014) adds a cgroup-memory headroom check alongside `/dev/shm` for SHM-backed CPU KV offload, preventing late OOM kills.
- **DP coordinator liveness** — [#43611](https://github.com/vllm-project/vllm/pull/43611) makes the DP ZMQ 30s timeout configurable (previously hardcoded in [#37452](https://github.com/vllm-project/vllm/pull/37452)).

## 5. Stability & Regressions

Ranked by potential blast radius for production deployments.

**High severity (correctness / determinism)**
- [#54521](https://github.com/vllm-project/vllm/issues/54521) — Greedy decoding non-deterministic on `Qwen3.8-Flash-Next-FP8` (sm121 / GB10) once prompts exceed `indexer_budget` (33 comments). Root cause: `persistent_topk` in Qwen Sparse Attention prefill. No fix PR yet.
- [#53257](https://github.com/vllm-project/vllm/issues/53257) — DeepSeek-V4-Flash NVFP4 returns different outputs at `temperature=0` with rate scaling with concurrency on B300 SXM6.
- [#53180](https://github.com/vllm-project/vllm/issues/53180) — `--kv-cache-dtype turboquant_k8v4` combined with MTP spec-decoding produces *silently* degenerate text on hybrid GDN models (v0.27.1). No fix PR.

**High severity (crashes / OOM)**
- [#55571](https://github.com/vllm-project/vllm/issues/55571) — Xid 13 "Out Of Range Address" / CUDA illegal memory access on RTX PRO 5000 (SM120) under sustained FP8 load. Workaround: `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` or `--enforce-eager`.
- [#52907](https://github.com/vllm-project/vllm/issues/52907) — **Closed** without an obvious merge — multi-node startup deadlock in `in_the_same_node_as()` gloo barrier with Ray executor (regression 0.26.1rc1.dev78 → .148). Worth re-validating on production multi-node Ray deployments.
- [#44889](https://github.com/vllm-project/vllm/issues/44889) — CUDA illegal memory access with Gemma-4-31B-it + DFlash speculator on H200 (KServe, v0.22.0).

**Medium severity (correctness / API)**
- [#54094](https://github.com/vllm-project/vllm/issues/54094) — DFlash2 + YaRN 1.04M prompt: zero prefix-cache reuse; target-only reuses ~1.039M tokens. RTX PRO 6000 Blackwell Max-Q.
- [#53504](https://github.com/vllm-project/vllm/issues/53504) — MTP first repeat misses prefix cache on hybrid Mamba/GDN; reuses only from the 2nd identical prompt.
- [#43587](https://github.com/vllm-project/vllm/issues/43587) — Prefix caching fails for incremental multimodal requests on Qwen3.5 hybrid models (V1 engine).
- [#39056](https://github.com/vllm-project/vllm/issues/39056) — vLLM 0.19 loses tool calls for Qwen3.5-35B-A3B-FP8 when XML tool markup is emitted inside `<think>` (non-streaming, `qwen3` reason parser + `qwen3_coder` tool parser).
- [#51977](https://github.com/vllm-project/vllm/issues/51977) — `HarmonyError: unexpected tokens remaining in message header` on `gpt-oss-120b` tool calls (v0.26.0, H100). Pinned upstream; awaiting patched `openai_harmony`.
- [#44249](https://github.com/vllm-project/vllm/issues/44249) — `lmcache_connector.start_load_kv` asserts on degraded LMCache instead of falling back to recompute.
- [#44294](https://github.com/vllm-project/vllm/issues/44294) — `OffloadingConnector._blocks_being_loaded` serialises concurrent requests behind a single load → 12× TTFT inflation with a 10k-token shared prefix.

**Medium severity (fixes available, not yet merged)**
- [#42359](https://github.com/vllm-project/vllm/pull/42359) — "Ghost block race" in `FullAttentionManager.cache_blocks()` committing prefix block hashes to `BlockPool` *before* the GPU forward writes KV values. Same-step `get_computed_blocks()` can mis-hit. Needs rebase.
- [#47505](https://github.com/vllm-project/vllm/pull/47505) — Guard `lmcache_mp_connector` state transition on `num_external_tokens` so it no longer hijacks load decisions when used as a non-chosen sub-connector in MultiConnector.
- [#42961](https://github.com/vllm-project/vllm/pull/42961) — Reject non-object JSON bodies (e.g. `[]`, `null`, `123`) with HTTP 400 instead of crashing deeper in the pipeline with `AttributeError`.

**Closed (verified, no longer action items)**
- [#41865](https://github.com/vllm-project/vllm/issues/41865) — FlashInfer GDN JIT multi-worker deadlock (closed).
- [#41860](https://github.com/vllm-project/vllm/issues/41860) — NIXL Disagg missing GDN support (closed).
- [#41864](https://github.com/vllm-project/vllm/issues/41864) — Multi-node PP blocked on V1 engine (closed).
- [#41906](https://github.com/vllm-project/vllm/issues/41906) — `collect_env.py` crashes on macOS/Windows; fixed in [#41998](https://github.com/vllm-project/vllm/pull/41998) (assert → early `return None`).
- [#41843](https://github.com/vllm-project/vllm/issues/41843) — DeepStream video-loader backend RFC (closed).
- [#41768](https://github.com/vllm-project/vllm/pull/41768) — Spec-decode thinking-state resync before target logits in rejection sampling (closes [#41758](https://github.com/vllm-project/vllm/issues/41758) on greedy/ngram divergence).
- [#41936](https://github.com/vllm-project/vllm/pull/41936) — Removed 30s audio cap in `Qwen3ASRDummyInputsBuilder` that was under-sizing encoder-cache profiling budget.

## 6. What This Means for Application Developers

- **Pin versions carefully on Blackwell.** If you are on RTX PRO 5000/6000 (SM

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-07

## Today's Highlights

The day's activity is dominated by **stability work on GLM-5.3-Flash** across multiple backends (DSA on H100, SM120 Blackwell, PPC, and HiCache) and **sustained progress on Apple Silicon** — both the long-standing roadmap (#19137) and the new Torch-owned SRT path with an exported MLX region (#32321) saw activity. On the kernel/runtime side, a major test-cleanup PR lands **net −11.4K lines** (#37436) and the first of a four-part KV-cache sharding series ships the logical-page index space (#37614).

## Releases & Breaking Changes

No new releases in the last 24h. CI snapshot from tracking issue #17050 (auto-updated 2026-09-07 01:35 UTC): **1 broken, 9 flaky, 957 recently fixed**.

A documentation PR (#38242) flags that `--cuda-graph-max-bs` and `--cuda-graph-bs` are `DeprecatedAliasStoreAction` aliases and updates docs to prefer `--cuda-graph-*-decode`. Worth auditing launch scripts.

## New Model & Hardware Support

- **T-Head PPU** (ZW810 / ZW810E / ZW-M890P) — new upstreaming roadmap opened (#37519).
- **NPU Atlas A5** — first-class support plus enhanced DSV4 processing on the DeepSeek-V4 path is in flight via #37373.
- **LongCat 2.0 (1.6T INT8)** on Ascend NPUs using 4-node Atlas 800I A3 clusters — issue #30224 closed as inactive (deployment notes landed in tree).
- **MLX / Apple Silicon** — torch-owned SRT path with an exported whole-model MLX region RFC (#32321) updated; implementation tracking in #36164.
- **Intel XPU 2026Q2** roadmap (#24922) closed as inactive after the quarter concluded.
- ROCm **gfx950 assembly attention** for EAGLE verify/draft-extend/decode (MI355X) in #37465 — targets Qwen3.5-397B FP8 KV at head dim 256.
- ROCm/AMD **breakable CUDA graph prefill** for DeepSeek-V4 HIP radix backend (#37810).
- CPU **Compute Building Block (CBB)** core topology detection for next-gen Xeon in #36850.

## Performance & Optimization

- **Sliding window + per-head sinks** in Triton varlen prefill attention — #38142 lands the `window_size=(left, right)` distance mask and tightens the KV-block loop on both ends.
- **HiSparse swap-in planner fix** below `swap_in_block_size 512` — #38243 corrects a prefix-scan corruption in `load_cache_to_device_buffer_kernel` (warp-0 chunk counter mismatch).
- **Unified-KV SWA per-request ring** runtime accounting for AMD DSV4 — #31040 (closed) finalizes the runtime side after #30315 (pool sizing) and #29168 (HiSparse device pool).
- **HiCache all-reduce reduction for PP** — #37562 adapts the #30511 optimization to pipeline-parallel deployments.
- **KV-cache sharding series (1/4)** — #37614 introduces logical-page placement as pure arithmetic + allocator, behind no server flag, so it is invisible at runtime until the remaining three PRs land.
- **HiCache `@rank_consensus` rollout** — #37425 adds validators to HiCache functions and enables the checker in `test/registered/hicache` and `test/registered/radix_cache/unified_radix_tree`.
- **Diffusion LongLive2 warmup noise** — #38226 silences the per-candidate Wan/causal-frame warning spam.
- **Diffusion 2-GPU CI rebalance** — #38239 cuts `multimodal-gen-test-2-gpu` from a 4h timeout to 45 min by re-sharding (observed 32/17/21 min split).
- **Test consolidation** — #37436 combines #37428/#37429/#37433 into one diff: **201 files, −12,636 / +1,186 = net −11,450 lines**.

## Stability & Regressions

Ranked by potential blast radius:

1. **GLM-5.3-Flash (DSA) HiCache host-tier load-back corruption** (#38031) — dropped tool calls and degenerate repetition loops on 8×H100 TP8, reproducible without speculative decoding. Multiple related bugs tracked in #37524.
2. **GLM-5.3-Flash startup crash under PP** (#36906) — `KeyError: 'residual'` during pipeline-parallel init.
3. **GLM-5.3-Flash on RTX PRO 6000 (SM120)** (#37105) — two DSA backend blockers downstream of an earlier `deep_gemm` NameError; tracking issue #37813.
4. **GLM-5.3-Flash DPC crashes** (#38207) — newly opened today.
5. **DeepSeek-V4 long-context prefill OOB** (#37892) — illegal memory access in the DSA indexer `topk_v1.cuh:348`; the paged prefill path can't reach the v2 kernel. **No fix PR linked yet.**
6. **DeepSeek-V4-Flash-0731 `reasoning_effort` mapping** (#33185) — `high` is a no-op, vendor `max` is unreachable on v0.5.16 and current `main`.
7. **Qwen3.8-Flash-Next NEXTN/MTP acceptance decay** (#37326) — draft acceptance falls to ~0 over server uptime on `qwen4_exp`; full recovery only on restart.
8. **MiniMax-M3 W4A16 (compressed-tensors) all-NUL output on SM121 sparse path** (#38143) — serves but every token is id 0 on 2× DGX Spark TP=2; same weights behave on vLLM. Not yet re-verified on v0.5.19.
9. **v0.5.14 EAGLE/MTP + hybrid GDN (Qwen3.6-27B NVFP4) KV pool underprovisioning** (#29857) — ~50 GB VRAM left idle, capacity capped.
10. **MLX test `test_batched_decode_matches_solo` over-constrains backends** (#32441) — asserts bitwise solo/batched equality no shape-varying backend can satisfy.
11. **MLX `SchedulerProfilerManager._start_profile` returns `success=False` under mocked Metal capture** (#30550) — likely CI-only.
12. **v0.5.13 Mamba `set_mamba_track_indices_from_reqs` NoneType crash with Spec v2 + EAGLE** (#28484) — closed as inactive.
13. **H3 reference audio instability on repeated requests** (#38225) — `snake` activation graph switch after profiling changes output determinism. Closed.

## What This Means for Application Developers

- **If you serve GLM-5.3-Flash, hold the upgrade path.** Bugs span DSA prefill, PP startup, SM120, HiCache host-tier, and DPC. Use tracking issue #37524 as the gate. Issue #38031 in particular corrupts generation without speculative decoding, so simply disabling EAGLE is not enough.
- **DeepSeek-V4 users on long context should test explicitly against #37892** before pushing the latest `main` — there is no fix PR yet, and the paged prefill path cannot route around the bad kernel.
- **If you rely on `--speculative-adaptive` or the sglang-dspark branch,** stay on the last known-good version. The closed #30549 (shared logits buffer) and #30555 (draft-worker OOB KV) are fixed but worth confirming are in the version you're pinning.
- **If you use SGLang on CPU with next-gen Xeon,** the CBB auto-detect in #36850 changes how cores are partitioned — re-benchmark if you pin NUMA layout.
- **KV cache sharding is in the middle of a four-PR refactor** (#37614 is 1/4). Expect no behavior change on `main` yet, but the next three will change allocator semantics; pin your SHA if you operate near memory-pool limits.
- **Documentation-only deprecations** in #38242 are safe to ignore today, but you'll get one release of warning noise — clean up your launch scripts when convenient.
- **MLX / Apple Silicon is still pre-release** in practical terms. Both the 2026 Q2 roadmap (#19137) and the new RFC (#32321) are about getting a real serving path; if you depend on Apple hardware, plan around a research-mode experience for now.
- **Quantization edge cases are landing hard on SM120/SM121** — W4A16 and NVFP4 paths both have open bugs. Validate your compressed-tensors and FP4 checkpoints on the actual target silicon, not just H100.

---

*Generated from 39 issues and 295 PRs updated on 2026-09-06/07 in `sgl-project/sglang`. Top-30 issues and top-20 PRs by comment count were reviewed.*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Daily Digest — 2026-09-07

## Today's Highlights

A burst of ten point releases (b10821–b10830) shipped in the last 24 hours, headlined by **Spark2_5 model support** (#27868), a **correctness fix for Gated Delta Net (GDN) normalization** switching from `max` to `rsqrt` (#28068), and **CUDA race fixes in `mmid`/`mmf`** (#28475). On the roadmap side, ggerganov's disaggregated prefill/decode server issue (#21266) and the new Kimi-K3 recurrent-state rollback PR (#28466) signal maturing speculative-decoding support for linear-attention architectures.

## Releases & Breaking Changes

Ten binary releases in the last 24 hours; none appear to introduce breaking C/C++ API changes, but several are user-visible:

- **b10830** — `convert`: new `--fuse-qkv` flag to fuse Q/K/V projections during HF→GGUF conversion (#22780).
- **b10829** — `models`: GDN q/k normalization corrected from `max` to `rsqrt` per flash-linear-attention definition (#28068). Worth verifying quantized outputs for Gated Delta Net models against prior builds.
- **b10828** — New architecture: **Spark2_5ForCausalLM** end-to-end support (#27868). Conversion, tensor mapping, tokenizer pre-tokenizer, and inference graph all landed.
- **b10827** — `opencl`: correct weights-pack selection for `q4_K`/`q5_K` `mul_mat` (#28402).
- **b10826** — `cuda`: race-condition fixes in `mmid` and `mmf` (#28475).
- **b10825** — `grammar`: fix max-repetition threshold (#28469). May change behavior of constrained-output decoding under heavy repetition.
- **b10823** — `common`: new `--log-jsonl` flag for structured logging (#28437). Useful for ops/SRE pipelines.
- **b10822** — UI assets now embedded directly via CMake, removing the external gzip helper (#28445). Simplifies cross-compilation.
- **b10821** — `metal`: remaining `fa-vec` flash-attention tunings for **M2 Max** (#28458).

## New Model & Hardware Support

- **Spark2_5ForCausalLM** — full GGUF/inference pipeline added in b10828 (#27868).
- **HrmTextForCausalLM (DFM Mimir 1B)** — alternating low/high transformer cycles, fused `gqkv` mapping (#27625). Open PR.
- **Kimi-K3** — ongoing work on bounded recurrent-state rollback for speculative decoding (#28466).
- **RDNA 4 / gfx1200 / gfx1201** — multi-PR tune-up:
  - Q6_K / Q2_K mmq fixes and condition updates via HIP (#25940).
  - MMVQ warp tuning for K-quants on RDNA 4 (#24386).
  - Flash-Attention tuning on gfx1201 (R9700 PRO) including an HS=256 bug fix in general CUDA FA (#28102).
- **Hexagon (HTP)** — batch-buffer bounds assertion moved before `n_bufs++`; strided-copy fast paths corrected (#28516).
- **WebUI/PWA** — service-worker cache no longer pins liveness endpoints (#28508).

## Performance & Optimization

- **CUDA Q4_K/Q5_K mmvq** (#26705) — branchless scale unpack eliminates per-column scale-unpack re-execution at batch sizes > 1; Spark path adds prefetch. Specific throughput numbers pending benchmarks in the PR.
- **KV cache non-contiguous cell restore** (#27991, merged) — optimization targeted at agentic workloads where tool results fragment the cache; motivated by qwen3.5-Claude-Code scenarios.
- **RDNA 4 MMVQ** (#24386) — measured single-token decode throughput improvement on gfx1200 for Q4_K_M GGUF models; other quant types unchanged.
- **R9700 PRO flash-attention** (#28102) — prefill at long contexts was the user's reported bottleneck; new tuning addresses it and fixes an HS=256 kernel bug.
- **Metal M2 Max fa-vec** (#28458 → b10821) — completes the tuning matrix for M2 Max.
- **MLSys/mtmd** (#28517) — sharded `mmproj` GGUF loading now works with `clip_model_loader`, enabling multimodal models whose projector is split via `llama-gguf-split`.
- **WebUI** — liveness endpoints excluded from service worker cache to stop the UI from appearing connected to a dead server (#28508).

## Stability & Regressions

Ranked roughly by user impact / comment volume:

- **#28495 (NEW, open)** — `llama-server -np 2 --kv-unified`: prompt-processing throughput drops **42–54% from the second long request onward** on a single GPU with no spill and no speculation. Reporter identifies cause as the unified-KV limitation in CUDA/HIP flash-attention kernels, which only mask tail cells, not interior all-`-INF` blocks. Severity: **high** for concurrent request workloads.
- **#20837 (open, 60 comments)** — Qwen3.5 9B prints tool calls inside the `<think>` block and stops when thinking mode is enabled; XML wrappers instead of native tool-call tokens. Persistent community pain point.
- **#23577 (open, 32 comments)** — Multi-Token Prediction (MTP) with Qwen3.6 27B emits repeated `////` after long sessions.
- **#27756 (open)** — Qwen3.5-hybrid 64-layer DeltaNet models (e.g., Qwen3.8-27B) hit silent instant-EOS past ~130k context on both CUDA and CPU; correlated with recurrent-state depth × layer-count degradation.
- **#26845 (open, 11 comments)** — SYCL backend produces garbage on the second prompt on Intel Arc Pro B60.
- **#26382 (open, 10 comments)** — Loading GLM-5.2 with `-ctk q5_1` without `-ctv` enforces the same type for V cache on a model that has no V cache.
- **#25618 (open, 21 comments)** — Speculative decoding (draft-MTP / draft-DSpark) diverges from vanilla on **quantized targets** under greedy sampling; matches on bf16. N-gram spec is unaffected.
- **#27217 (open)** — `tool_choice: "required"` accepted but not enforced for templates with `supports_preserve_reasoning: true`. Relevant for OpenAI-compatible agent stacks.
- **#27981 (open, 8 comments)** — `llama-ui` desktop: reasoning-level selection menu won't open.
- **#28336 (open)** — Browser UI SVG outputs render with missing parts on-screen but the bytes are correct (display-only).
- **#20141 (closed)** — `ggml_metal_synchronize` "Innocent Victim" crash on M4 Pro / Tahoe 26.3 (stale-closed).
- **#24684 (closed)** — `--fit on` + `--sleep-idle-seconds` aborts when `tensor_buft_overrides` already set; fix PR landed earlier.
- **#25746 (closed)** — json-schema-to-grammar nested `maxLength ≥ 2000` emits un-parseable GBNF for tool calls (b10034).
- **#25808 (closed)** — `GGML_SYCL_DEVICE_ARCH=xe2` segfault at startup.

Two important correctness fixes **landed today**: GDN `max→rsqrt` (b10829) and CUDA `mmid`/`mmf` races (b10826). Users running Gated Delta Net models should re-validate outputs against references. The PR **#28523** also fixes a NumPy-1.x wide-tensor sign-loss regression affecting Q8_0/TQ1_0/TQ2_0 quantization (resolves #28438).

## What This Means for Application Developers

- **Agent/tool-call reliability is still bumpy.** Issues #20837 (Qwen3.5 tool calls inside thinking blocks), #27217 (`tool_choice: required` not enforced with `supports_preserve_reasoning`), and the b10825 grammar fix show the tool-call story is fragile across templates. If you're shipping an agent product, pin a specific commit, gate behind your own tool-call normalizer, and test each chat template upgrade end-to-end.
- **Quantized targets + speculative decoding are unsafe for some draft models** (#25618). Prefer bf16 targets when using draft-MTP/draft-DSpark, or disable speculation in production correctness paths.
- **`--log-jsonl`** (b10823) is now first-class — wire it into your log aggregator if you previously scraped stdout for structured events.
- **`--fuse-qkv`** (b10830) can shrink checkpoint size and speed up prefill for models whose HF checkpoints ship Q/K/V as separate projections; re-export your GGUFs to benefit.
- **WebUI PWA caveat** — until users clear the old service worker, the UI may appear connected to a dead server (#28508). Add a manual cache-bust step in your rollout runbook.
- **Linear-attention long-context is the active frontier** — Qwen3.5-hybrid / Kimi-K3 / Spark2_5 work all landed or is in flight in the same window. Expect rapid iteration here; expect some instabilities (silent EOS, MTP divergence, tool-call parsing) to remain first.
- **GPU backend diversity is paying off** — RDNA 4 / Hexagon / Metal M2 Max all saw improvements today, but each still has open correctness issues (RDNA 4 Vulkan splits #25884; Hexagon buffer/dispatch fixes #28516; SYCL multi-GPU OpenCL crashes #27168). For multi-vendor deployments, gate rollouts on per-backend smoke tests.

---

*Sources: [ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) releases, issues, and pull requests updated 2026-09-07.*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-07

## Today's Highlights
- A long-awaited **Prometheus `/metrics` endpoint** lands as [PR #16998](https://github.com/ollama/ollama/pull/16998), finally addressing the 2-year-old request in [#3144](https://github.com/ollama/ollama/issues/3144) — opt-in via `OLLAMA_METRICS=1`.
- A **MLX runner regression** is causing 17–27 s of wasted re-prefill on every cold prompt because the prefix-cache restore point is rounded down to a multiple of 8192 tokens ([#18267](https://github.com/ollama/ollama/issues/18267)) — a significant per-turn latency tax for local agent workloads.
- A cluster of **stability reports on Blackwell (sm_120)** and **AMD Vulkan** backends filed in the last 24h, including flash-attention warmup crashes and command-buffer OOM on large models.

## Releases & Breaking Changes
_No new releases in the last 24h._

## New Model & Hardware Support
- **New architecture request — `spark2_5`** ([#18195](https://github.com/ollama/ollama/issues/18195)): native support for the SparkLLM/Spark-X2.5 family (4B and 1.7B). Downloads succeed but inference fails because the runtime does not yet recognize the architecture. 👍4.
- **Blackwell (sm_120) coverage is being shaken out**: flash-attention auto-enabled on `qwen3-coder:30b` crashes `llama-server` at warmup on an RTX 5070 Ti Laptop despite a successful memory fit ([#18276](https://github.com/ollama/ollama/issues/18276)). Looks like an FA-2 init bug specific to sm_120, not a true OOM.
- **AMD iGPU / Vulkan path**: a 66 GB model fails with "Not enough memory for command submission" on AMD iGPU starting in v0.32.12 (last working version: v0.32.9) ([#18272](https://github.com/ollama/ollama/issues/18272)). Likely tied to recent Vulkan buffer-accounting changes.

## Performance & Optimization
- **PR #16998 — `/metrics` endpoint** ([#16998](https://github.com/ollama/ollama/pull/16998)): opt-in Prometheus-compatible metrics including `ollama_requests_queued`, `ollama_queue_capacity`, `ollama_models_loaded`, `http_requests_total`, plus per-model/token counters. Foundation for production observability.
- **PR #18271 — renderer message delimiters** ([#18271](https://github.com/ollama/ollama/pull/18271)): forwards `message_delimiters` from the Go renderer to `llama-server`'s `/completion` so context checkpoints can be placed at user-turn boundaries, enabling incremental decode across long agent sessions.
- **MLX prefix-cache regression** ([#18267](https://github.com/ollama/ollama/issues/18267)): restore point is rounded down to a multiple of 8192 tokens, forcing up to 8191 tokens of re-prefill on the turn after any cold prefill — measured at a **fixed 17–27 s** penalty per turn on Claude-Code-style agent loads against local models. No fix PR yet

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-07

## 1. Today's Highlights

LiteLLM shipped **v1.100.0 (stable)** and cut **v1.101.0-rc.1** (both cosign-signed). The dominant theme today is **billing correctness**: four active issues report uncharged or mis-charged traffic — streaming `/v1/responses` requests skipping spend logs entirely, $0 costs for custom-priced models, double-billed Anthropic cache reads, and a false "Budget has been exceeded" loop blocking Claude Code clients. Fresh fix PRs landed for DeepSeek CCR stream conversion (#40075) and Azure MAI image-generation parameter validation (#40074).

## 2. Releases & Breaking Changes

- **v1.101.0-rc.1** — release candidate now available; verify with cosign before deploying ([release](https://github.com/BerriAI/litellm/releases)).
- **v1.100.0** — new stable ([release](https://github.com/BerriAI/litellm/releases)). All Docker images are signed with the cosign key introduced in commit `0112e53`; supply-chain hardening is now part of the standard release flow.
- No explicit breaking API/config changes announced in either release body — treat v1.100.0 as a low-risk upgrade target, but see the regression cluster in §5 before rolling out.

## 3. New Model & Hardware Support

- **Foundry Local provider** added as a first-class OpenAI-compatible backend (SDK-first, no web server required) — [#29449](https://github.com/BerriAI/litellm/pull/29449) (closed/merged).
- **Bedrock Mantle Responses API + SigV4/IAM auth** in progress — unlocks IAM-only deployments (EKS/ECS) on the `/openai/v1/responses` route — [#29711](https://github.com/BerriAI/litellm/pull/29711) (open).
- **Azure MAI image generation**: PR to reject `n>1` and unsupported sizes upfront instead of silently returning one image or opaque 400s — [#40074](https://github.com/BerriAI/litellm/pull/40074).
- **Pricing gaps**: DashScope Qwen 3.6/3.7 models missing from `model_prices_and_context_window.json`, causing $0 tracking under `dashscope/*` wildcards — [#29922](https://github.com/BerriAI/litellm/issues/29922). Qwen3.8-27B-FP8 users report inability to enable `reasoning_effort` — [#37359](https://github.com/BerriAI/litellm/issues/37359) (7 👍).

## 4. Performance & Optimization

- **Adaptive router state fix merged**: persisted deltas now merge onto cold-start Beta priors on reload instead of overwriting them — eliminates `gammavariate: alpha and beta must be > 0.0` 500s after proxy restart — [#29398](https://github.com/BerriAI/litellm/pull/29398).
- **Router fallback hardening (open)**: deep-copy kwargs per fallback attempt to prevent mutation leakage across retries — [#27462](https://github.com/BerriAI/litellm/pull/27462), fixes [#24764](https://github.com/BerriAI/litellm/issues/24764).
- **Rust CI flake fixed**: the `LiteLLM Rust > release wheel` job was failing ~20% of runs due to a `gc.collect` race in lifecycle-contract tests; now serialized — [#40073](https://github.com/BerriAI/litellm/pull/40073).
- **CCR stream conversion fix (open)**: drops `stream_options` when CCR converts streaming calls to non-streaming upstreams (DeepSeek rejects it) — [#40075](https://github.com/BerriAI/litellm/pull/40075).

## 5. Stability & Regressions (ranked by severity)

**Critical — billing/revenue impact:**
1. Streaming `/v1/responses` requests write no `LiteLLM_SpendLogs` row — usage goes **uncharged**; logger crashes on `'dict' object has no attribute 'usage'` — [#29913](https://github.com/BerriAI/litellm/issues/29913) (open, no fix PR yet).
2. Virtual keys get **false 429 "Budget has been exceeded"** on `/v1/messages` (Claude Code); enforced cost (111.29) far exceeds recorded spend — [#40050](https://github.com/BerriAI/litellm/issues/40050) (new, open).
3. `custom_cost_per_token` **bills Anthropic cache-read tokens twice** — [#40006](https://github.com/BerriAI/litellm/issues/40006) (new, open).
4. Spend logs record **$0** for custom models absent from the cost map despite correct `estimated_cost` in responses — [#35691](https://github.com/BerriAI/litellm/issues/35691).

**High — functional breakage:**
5. `cache_control_injection_points` is a silent **no-op** on `/v1/responses` **and** triggers a deterministic Claude tool-call loop until MaxTurns — [#29810](https://github.com/BerriAI/litellm/issues/29810).
6. `/v1/images/edits` with mask fails on proxy — "Attempted to access streaming request content" — [#26552](https://github.com/BerriAI/litellm/issues/26552).
7. `POST /config/reload` returns 404 on `litellm-database:main-stable` — [#30772](https://github.com/BerriAI/litellm/issues/30772).
8. Langfuse callbacks silently fail since v1.83 (`AttributeError: 'NoneType'`) — no traces sent — [#25940](https://github.com/BerriAI/litellm/issues/25940). (Related parity fix for OEL per-key environments merged in [#29440](https://github.com/BerriAI/litellm/pull/29440).)
9. Bedrock `DELETE /v1/files/{id}` always 500s — files can't be cleaned up — [#39715](https://github.com/BerriAI/litellm/issues/39715).

**Security-relevant:**
10. `/model/info` discloses full model/deployment config to unauthenticated callers — [#29911](https://github.com/BerriAI/litellm/issues/29911).
11. Response cache keys ignore team/key — **cross-tenant cache reuse** on multi-tenant proxies — [#29955](https://github.com/BerriAI/litellm/issues/29955).

**Minor:** Request Logs date picker treats local times as UTC — [#39979](https://github.com/BerriAI/litellm/issues/39979); fixed this week: Anthropic route erasing OpenAI refusal blocks ([#39721](https://github.com/BerriAI/litellm/issues/39721), closed) and OAuth2 MCP 500-instead-of-401 ([#29261](https://github.com/BerriAI/litellm/issues/29261), closed).

## 6. What This Means for Application Developers

- **Audit your spend logs today** if you serve streaming `/v1/responses` traffic or custom-priced models (#29913, #35691) — you may be under-billing; conversely, Claude Code users hitting spurious 429s should compare enforced vs. recorded key spend (#40050) before raising budgets.
- **Multi-tenant operators**: response-cache entries are shared across teams (#29955) — if teams can receive identical prompts, treat cached responses as potentially cross-tenant until this lands. Also lock down `/model/info` (#29911).
- **Do not rely on `custom_cost_per_token` cache-read pricing** for Anthropic-style responses until #40006 is resolved; you're likely overcharging internally.
- **OpenAI Agents SDK + Claude via `/v1/responses`**: disable `cache_control_injection_points` for now — it does nothing and can trap agents in tool-call loops (#29810).
- **On v1.100.0**: Foundry Local is now usable as a first-class provider; verify cosign signatures on pulled images; watch #40075/#40074 if you're on DeepSeek CCR or Azure MAI image gen.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-07

## Today's Highlights

Today's batch is dominated by **Studio hardening work** aimed at consumer and edge hardware: AMD Strix Halo (gfx1150/gfx1151) integrated GPUs are now auto-routed to the Vulkan llama.cpp prebuild instead of ROCm, Windows on ARM laptops with NVIDIA GB10/N1X get a native ARM64 CUDA install path, and a new KV-preemption layer lets parallel Studio chats share a single llama-server cache instead of evicting each other. Behind the scenes, the team also landed accuracy fixes for `engine_stats` throughput reporting and a Windows probe for Smart App Control code-integrity blocks, both of which had been silently mis-informing users.

## Releases & Breaking Changes

No new releases in the last 24h.

## New Model & Hardware Support

- **AMD Strix Halo (gfx1150/gfx1151) → Vulkan llama.cpp backend**: Studio now installs the Vulkan prebuilt on integrated Radeon GPUs, since Vulkan measurably outperforms ROCm there. Existing ROCm installs get an in-app upgrade banner. [PR #10381](https://github.com/unslothai/unsloth/pull/10381)
- **Windows on ARM + NVIDIA (GB10 / N1X / RTX Spark)**: `install.ps1` previously treated all ARM64 Windows hosts as CPU-only. This adds the native ARM64 CUDA stack on NVIDIA hosts without changing behavior for other architectures. [PR #10282](https://github.com/unslothai/unsloth/pull/10282)
- **MLX stack on fresh macOS installs**: A `SKIP_STUDIO_BASE=1` flag was unintentionally skipping the MLX dependency pass, leaving Apple Silicon installs in chat-only mode. The MLX step now runs on fresh training installs. [PR #10403](https://github.com/unslothai/unsloth/pull/10403)
- **DGX Spark paired-serving topology**: Studio/Desktop now picks one of three serving topologies from `spark_cluster.recommend_topology` when loading a GGUF on a paired DGX Spark, with an async replica router so both nodes work whenever the workload allows. [PR #10323](https://github.com/unslothai/unsloth/pull/10323)
- **Docker aarch64 images** (feature request closed; status of merged image not specified in this batch). [Issue #4198](https://github.com/unslothai/unsloth/issues/4198)

## Performance & Optimization

- **KV preemption for parallel Studio chats**: A single llama-server is launched with `--parallel N --kv-unified -c N` so N slots share one KV cache and chats that each fit individually no longer evict each other. The current guard `prompt_tokens < slot.n_ctx` is being replaced by an actual capacity check. [PR #10301](https://github.com/unslothai/unsloth/pull/10301)
- **Native slot parking in llama-server**: When the server supports `--preempt-ram` (paired with unslothai/llama.cpp#184/#190), Studio drops its own preemption layer and lets every chat use the full context window — a meaningful throughput and tail-latency win for high-concurrency chat. [PR #10358](https://github.com/unslothai/unsloth/pull/10358)
- **Prompt cache retention on integrated GPUs**: The Windows full-offload tuning path was previously disabling the llama-server prompt cache globally, which cost one Strix Halo user 44 hours across a single 48.8 h run. Cache is now preserved on shared-memory GPUs. [PR #10382](https://github.com/unslothai/unsloth/pull/10382)
- **Kaggle CI dispatch fix**: The poll-loop runner that held a Kaggle node for **41.5 minutes** during a 4-minute build/push is being replaced by an enqueue + collect-later flow. [PR #10183](https://github.com/unslothai/unsloth/pull/10183)
- **uv cache alignment**: `install.sh`, `install.ps1`, and `storage_roots._setup_cache_env` were picking a `UV_CACHE_DIR` independently; `unsloth studio update` now reads the cache the backend actually uses, avoiding unnecessary re-downloads. [PR #10386](https://github.com/unslothai/unsloth/pull/10386), [PR #10410](https://github.com/unslothai/unsloth/pull/10410)
- **UI menu opening no longer freezes the page**: Sidebar, chat row, and project menus were locking layout while open; refactored to non-blocking. [PR #10262](https://github.com/unslothai/unsloth/pull/10262)

## Stability & Regressions

**Open / unresolved:**
- **Qwen3.5-9B never reaches first step; Gemma-4-26B-A4B OOM QLoRA bs=1 on 96 GB VRAM** ([Issue #7203](https://github.com/unslothai/unsloth/issues/7203)) — two notable training-path failures on a current-gen RTX Pro 6000. This is the only OPEN issue in the top 30 by activity and the most actionable for new adopters.

**Recently closed bugs worth flagging to your teams:**
- **NaN grad norm at step 1 with Qwen3.5 packing** — only observed with packing; instruct and base variants unaffected. [Issue #4160](https://github.com/unslothai/unsloth/issues/4160)
- **`GptOssTopKRouter` missing `weight`** when loading gpt-oss via FastLanguageModel. [Issue #3729](https://github.com/unslothai/unsloth/issues/3729)
- **Triton CPU-tensor pointer error on Qwen3-235B** with `device_map="balanced"` and 4-bit load. [Issue #4137](https://github.com/unslothai/unsloth/issues/4137)
- **Gemma-4-12B GGUF UD-Q4_K_XL fails to load** in llama-server (insufficient VRAM at 16 GB). [Issue #6022](https://github.com/unslothai/unsloth/issues/6022)
- **Gemma3 fine-tuning** ConstantVariable error on the A100 conversational notebook. [Issue #3996](https://github.com/unslothai/unsloth/issues/3996)
- **DeepSeek-OCR** fails to load via `FastVisionModel`. [Issue #3670](https://github.com/unslothai/unsloth/issues/3670)
- **Nemotron-3 Nano** merge-to-LoRA failure on H200. [Issue #3854](https://github.com/unslothai/unsloth/issues/3854)
- **PyTorch Inductor `PY_SSIZE_T_CLEAN` macro error** during VLM training under CUDA 12.6 / Python 3.10–3.12. [Issue #2230](https://github.com/unslothai/unsloth/issues/2230)
- **Windows installer fails on CPU-only machines** (both default and `--no-torch` paths). [Issue #5008](https://github.com/unslothai/unsloth/issues/5008)

**Newly reported/remediated infra-correctness fixes:**
- **`engine_stats` was reporting 0 tok/s almost always and a rate above hardware capability twice** on Strix Halo — Studio's throughput metric was effectively lying. [PR #10384](https://github.com/unslothai/unsloth/pull/10384)
- **Four misleading load/update error messages** mis-attributed failures to the wrong layer (model vs. build vs. memory vs. arch). Each is documented with the specific log evidence. [PR #10383](https://github.com/unslothai/unsloth/pull/10383)
- **Smart App Control blocking `llama-server.exe`** with a "Bad Image" status on `llama-common`. A Windows probe and a CI signature audit are being added. [PR #10408](https://github.com/unslothai/unsloth/pull/10408)
- **`torchcodec` ↔ `torch` version mismatch** on fresh NVIDIA installs: the compatibility guard allowed `torch-2.11.0+cu128` but the guard stayed quiet; pin per torch minor now. [PR #7474](https://github.com/unslothai/unsloth/pull/7474)
- **`push_to_ollama` calling `create_ollama_modelfile` with a removed kwarg** (`gguf_location`) — was broken at the API boundary. [PR #10304](https://github.com/unslothai/unsloth/pull/10304)
- **MLX being self-healed into a `--no-torch` install** — Apple Silicon CPU-only installs were silently promoted to a training-capable stack on first launch; now honored. [PR #10409](https://github.com/unslothai/unsloth/pull/10409)
- **Composer send/stop icon misalignment at non-Retina scales** — fixed and verified via Playwright. [PR #10405](https://github.com/unslothai/unsloth/pull/10405), [PR #10407](https://github.com/unslothai/unsloth/pull/10407)
- **Docker volume instructions** corrected in docs. [Issue #4396](https://github.com/unslothai/unsloth/issues/4396)
- **DGX Spark "no GPU detected"** manual path fixed. [Issue #3553](https://github.com/unslothai/unsloth/issues/3553)
- **Agentic/tool turns now survive a browser close**; tool cards and offsets replay exactly on reopen, walk-aways labeled `interrupted`. [PR #10365](https://github.com/unslothai/unsloth/pull/10365)
- **Ollama inventory in Studio** was assigning wrong `source`, crashing the schema, and dropping models — now fixed. [Issue #9986](https://github.com/unslothai/unsloth/issues/9986)

## What This Means for Application Developers

- **Edge / consumer-hardware deployments get more first-class**: Strix Halo and Windows-on-ARM NVIDIA laptops are now genuinely supported install targets rather than best-effort paths. If you're shipping a local-first agent, validate against the Vulkan + integrated-GPU prompt-cache path before recommending it.
- **Multi-chat Studio deployments will see real tail-latency wins**: KV preemption ([#10301](https://github.com/unslothai/unsloth/pull/10301), [#10358](https://github.com/unslothai/unsloth/pull/10358)) means parallel users stop evicting each other; expect noticeably higher effective throughput per dollar on shared Studio instances once these ship.
- **Don't trust `engine_stats` numbers from prior Studio builds**: throughput telemetry was both under- and over-reporting. If you've used it for SLO/cost dashboards, treat historical values as unreliable and re-baseline after [#10384](https://github.com/unslothai/unsloth/pull/10384) lands in your installed version.
- **Two known training hazards to verify against before release**: Qwen3.5 + packing NaNs ([#4160](https://github.com/unslothai/unsloth/issues/4160)) and Qwen3.5-9B not completing step 1 ([#7203](https://github.com/unslothai/unsloth/issues/7203)). If your pipeline combines these, add a smoke-test step.
- **`push_to_ollama` was silently broken** at the create-modelfile boundary ([#10304](https://github.com/unslothai/unsloth/pull/10304)) — if your tooling depended on this path, pin a build with the fix and re-validate Ollama exports end-to-end.
- **Smart App Control on Windows** can silently block `llama-server.exe` even after a successful install; advise Windows users accordingly and track [#10408](https://github.com/unslothai/unsloth/pull/10408) for the proper fix.
- **Agentic UIs**: tool-loop streams are now durable across tab-close and replay with correct offsets ([#10365](https://github.com/unslothai/unsloth/pull/10365)). If you're building on Studio's chat surface, you no longer need to design your own resume-replay protocol for walk-aways.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — Daily Digest
**Date:** 2026-09-07
**Repository:** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. Today's Highlights

Activity was modest but operationally focused: one open PR (#1763) addresses a UX bug where the model catalog returns empty when editing an existing Claude Code provider, while two freshly filed issues (#1761, #1762) surface startup-timeout and upstream 502 failures against the managed core gateway on port 3456. Net effect for operators: existing edits to local agent providers are broken, and the gateway is fragile under modest host load.

---

## 2. Releases & Breaking Changes

*No new releases in the last 24 hours.* No version tags, config-format changes, or migration notes to communicate.

---

## 3. New Model & Hardware Support

*No new model, backend (CUDA/ROCm/Metal/CPU), or quantization-format additions reported.*

---

## 4. Performance & Optimization

The headline item is the gateway-startup timeout flagged in [Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761). The current implementation uses a **5-second hardcoded deadline** for the child gateway to accept its runtime config, which conflates parent event-loop congestion with child readiness. On a moderately loaded host, this deadline is regularly missed, causing every restart/boot to fail even though the management plane (port 3458) is healthy. A proper fix likely involves making the deadline configurable and/or decoupling the readiness signal from the parent's event-loop latency — no PR is attached yet, so this is open design work rather than landed performance work.

---

## 5. Stability & Regressions

Ranked by likely operational impact:

1. **[HIGH] Gateway fails to start under host load** — [Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761)
   - Symptom: `Core gateway did not accept runtime config within 5000ms` on every restart.
   - Root cause: hardcoded 5s timeout measured against a parent event loop that itself may be congested; not a true signal of child readiness.
   - Mitigation: none in-repo yet; operators on busy hosts will see repeated start failures.
   - Fix PR: **none open**.

2. **[MEDIUM] 502 Bad Gateway from `/v1/responses` (codex path)** — [Issue #1762](https://github.com/musistudio/claude-code-router/issues/1762)
   - Symptom: `unexpected status 502 Bad Gateway: Unknown error, url: http://127.0.0.1:3456/v1/responses`.
   - Likely related to the same startup-readiness window above: the `/v1/responses` endpoint is returning 502, suggesting the core gateway either crashed, never finished initializing, or its upstream is unreachable.
   - Fix PR: **none open**.

3. **[LOW — UX] Empty model list when editing a Claude Code provider** — [PR #1763](https://github.com/musistudio/claude-code-router/pull/1763)
   - Symptom: model catalog returns empty on edit, though it loads correctly on initial create.
   - Status: **fix proposed** (PR open, awaiting review). Track this for merge.

---

## 6. What This Means for Application Developers

- **Expect intermittent 502s on the `/v1/responses` route** until the startup-timeout work lands; add client-side retry with backoff for codex-style request flows hitting the local gateway.
- **Do not rely on the 5s startup window** as an SLA — if you orchestrate the router as a subprocess in a busier host, treat boot as best-effort and supervise restarts externally (systemd `Restart=on-failure`, container restart policy, etc.).
- **Hold off on programmatic re-edits** of existing Claude Code providers until [PR #1763](https://github.com/musistudio/claude-code-router/pull/1763) merges, or surface a warning in your admin UI that model selection will appear empty.
- **Watch the issue tracker closely** for the next 24–48h: #1761 in particular is the kind of issue where maintainers typically request a small, targeted PR — early contributors have an opportunity to land the timeout fix quickly.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-07

## 1. Today's Highlights

CC Switch shows no new release in the last 24 hours, but active development is concentrated on hardening the **Codex Responses↔Chat Completions translation layer** (parallel tool calls, `tool_call_id` semantics, empty thinking blocks, subagent routing) and on **Claude-side provider isolation** via `CLAUDE_CONFIG_DIR`. A persistent user pain point continues to dominate the issue tracker: CC Switch overwrites `~/.claude/settings.json` and `~/.codex/config.toml` in a destructive way that strips user-owned fields (`enabledPlugins`, `statusLine`, hooks, permissions), with at least two high-comment issues (#1198, #3631) closed without an obvious fix yet.

---

## 2. Releases & Breaking Changes

No new releases published in the last 24 hours. In-flight work that may land as breaking behavior:

- **PR #7094** — *"Isolated provider sessions and model-routed gateway"*: replaces the temporary `claude --settings` overlay with persistent per-provider directories and honors `CLAUDE_CONFIG_DIR` for settings/MCP/plugins/sessions/launchers. This is an architectural shift away from the legacy shared-`settings.json` model that today's overwrite bugs stem from. [farion1231/cc-switch#7094](https://github.com/farion1231/cc-switch/pull/7094)
- **PR #7094 / #7165** together imply a transition toward *takeover mode* as the canonical routing path and a future deprecation of legacy switching. [#7094](https://github.com/farion1231/cc-switch/pull/7094), [#7165](https://github.com/farion1231/cc-switch/pull/7165)

---

## 3. New Model & Hardware Support

- **Pricing seeds** added for three flagship models:
  - **GLM-5.3 Flash** — $0.15/M in, $0.50/M out, $0.03/M cache read. [PR #7163](https://github.com/farion1231/cc-switch/pull/7163)
  - **GPT-6 Astra** — $10/M in, $50/M out, $1/M cache read, $12.50/M cache write. [PR #7162](https://github.com/farion1231/cc-switch/pull/7162)
  - **Gemini 3.8 Flash** — $0.75/M in, $3.75/M out, $0.075/M cache read. [PR #7164](https://github.com/farion1231/cc-switch/pull/7164)
- **Codex GitHub Copilot** — new managed-account provider routed via capability-driven Responses/Chat selection. [PR #7157](https://github.com/farion1231/cc-switch/pull/7157)
- **Grok official** — now retains separate account credentials; usage importer more tolerant of Windows mtime quirks. [PR #6792](https://github.com/farion1231/cc-switch/pull/6792)
- **Claude Opus 5** alias exposed in takeover mode (replaces retired `claude-opus-4-8`). [PR #5882](https://github.com/farion1231/cc-switch/pull/5882)
- **Gemini Native Part-level `thoughtSignature`** handling restored + Codex `thought_signature` backfill + provider-form unlock. [PR #7143](https://github.com/farion1231/cc-switch/pull/7143)
- **Vendor catalog fix** — unknown vision models in DeepSeek catalog (e.g. `deepseek-v4-flash-vision-exp`) no longer inherit `input_modalities: ["text"]` from the flagship entry. [PR #6750](https://github.com/farion1231/cc-switch/pull/6750)
- **Skill groups** — persistent named, color-coded grouping with per-app visibility. [PR #7008](https://github.com/farion1231/cc-switch/pull/7008)
- **i18n** — Portuguese-BR translation + README added. [PR #7046](https://github.com/farion1231/cc-switch/pull/7046)

---

## 4. Performance & Optimization

- **Parallel tool calls for Codex OAuth** — fixed `parallel_tool_calls: false` default that was forcing serialized tool use on Anthropic→Responses routes. Reduces round trips and context re-emission for multi-step tasks. [PR #5722](https://github.com/farion1231/cc-switch/pull/5722), [PR #7024](https://github.com/farion1231/cc-switch/pull/7024)
- **Lightweight npm version probe** — About-page version checks now use `/-/package/{pkg}/dist-tags` instead of full packument fetches; **~55 MB across 6 packages → ~3.3 KB** and removes multi-MB JSON parsing per request. [PR #6191](https://github.com/farion1231/cc-switch/pull/6191)
- **Tray left-click** — single click now restores/focuses the main window instead of opening a context menu. [PR #7153](https://github.com/farion1231/cc-switch/pull/7153)
- **Cross-provider subagent routing in takeover mode** — Task/subagent traffic can be sent to a different (typically cheaper) provider than the main conversation, enabling flagship+cheap-tier cost splits. [PR #7165](https://github.com/farion1231/cc-switch/pull/7165)

---

## 5. Stability & Regressions

**Critical — destructive config overwrite (no clear fix yet)**

- #1198 — Launching CC Switch rewrites `~/.claude/settings.json` on macOS, dropping hooks/permissions/contextFiles. 16 comments, 👍9. [Issue #1198](https://github.com/farion1231/cc-switch/issues/1198)
- #3631 — Every provider switch fully rewrites `~/.claude/settings.json`; `enabledPlugins` clobbered to `{}`, `statusLine.command` reset. 12 comments, 👍7. [Issue #3631](https://github.com/farion1231/cc-switch/issues/3631)

**High — Codex Responses↔Chat translation regressions**

- #7156 — v3.20.1: DeepSeek upstream rejects `tool_call_id` as too short on Chat route; subagent tool calls always fail. [Issue #7156](https://github.com/farion1231/cc-switch/issues/7156)
- #6260 — Streaming "empty thinking" written into Codex history → next request rejected with 400 "thinking 长度不足". [Issue #6260](https://github.com/farion1231/cc-switch/issues/6260)
- #6697 — Pure image tool output dropped at vision-less upstream → orphan `tool_calls` → permanent 400. [Issue #6697](https://github.com/farion1231/cc-switch/issues/6697)
- #6529 — Commentary + tool calls emitted as two consecutive assistant messages, breaking downstream Chat models. [Issue #6529](https://github.com/farion1231/cc-switch/issues/6529)
- #6473 — Anthropic→Codex Responses bridge drops optional tool-argument semantics. [Issue #6473](https://github.com/farion1231/cc-switch/issues/6473)
- #5116 — Responses→Chat produces illegal upstream payload on large/complex `tool_call arguments` → 400 InvalidParameter. [Issue #5116](https://github.com/farion1231/cc-switch/issues/5116)
- #4973 — v3.16.5 regression: `invalid tool_call_id` (400) routing Codex→SenseNova on `deepseek-v4-flash`. [Issue #4973](https://github.com/farion1231/cc-switch/issues/4973)

**High — Codex routing/usage**

- #7084 — Paginated parent rollout → forked child agent permanently mis-attributed; **GPT-5.6-Sol usage entirely lost** (v3.20.1, macOS). [Issue #7084](https://github.com/farion1231/cc-switch/issues/7084)
- #7056 — After Codex quota exhaustion, switching relay-API provider fails to swap models. [Issue #7056](https://github.com/farion1231/cc-switch/issues/7056)
- #4752 — Persistent 429 "exceeded retry limit" when routing through Codex. [Issue #4752](https://github.com/farion1231/cc-switch/issues/4752)
- Fix candidate: **#7161** recovers model name from session-log rows when a gateway echoes empty `model` field. [PR #7161](https://github.com/farion1231/cc-switch/pull/7161)

**Medium — environment, network, platform**

- #5609 — Linux Wayland startup crash, `EGL_BAD_PARAMETER`. [Issue #5609](https://github.com/farion1231/cc-switch/issues/5609)
- #5096 — Claude Desktop + Bailian proxy hangs ~150 s on dead IPv6 (no Happy-Eyeballs fallback). [Issue #5096](https://github.com/farion1231/cc-switch/issues/5096)
- #5042 — Custom providers with self-signed HTTPS cert → 502. [Issue #5042](https://github.com/farion1231/cc-switch/issues/5042)
- #5099 — Editing Codex `base_url` leaves `provider_endpoints.url` stale; model list/test still hits old address. [Issue #5099](https://github.com/farion1231/cc-switch/issues/5099)
- #7140 — WSL: `pi` installed and path correct, but app reports "no model". [Issue #7140](https://github.com/farion1231/cc-switch/issues/7140)
- #5001 — Codex `/responses` tool-arg parse failures surface a misleading root cause. [Issue #5001](https://github.com/farion1231/cc-switch/issues/5001)
- Fix candidate: **#7170** — preserve colons in Unix env source paths so cleanup/deletion doesn't truncate. [PR #7170](https://github.com/farion1231/cc-switch/pull/7170)

**Closed without high-impact**

- #4605, #5530, #6570, #5876, #7129, #7140 — closed as completed/handled. [Issue #4605](https://github.com/farion1231/cc-switch/issues/4605), [Issue #5530](https://github.com/farion1231/cc-switch/issues/5530), [Issue #6570](https://github.com/farion1231/cc-switch/issues/6570), [Issue #5876](https://github.com/farion1231/cc-switch/issues/5876), [Issue #7129](https://github.com/farion1231/cc-switch/issues/7129)

The cross-cutting enhancement request **#4371** — replace Codex's overwriting `config.toml` writes with Codex's official incremental profile mechanism — remains open and would structurally resolve several of the regression patterns above. [Issue #4371](https://github.com/farion1231/cc-switch/issues/4371)

---

## 6. What This Means for Application Developers

- **Back up `~/.claude/settings.json` and `~/.codex/config.toml` before every CC Switch update.** Until #1198/#3631 are structurally fixed and PR #7094's per-provider isolation lands, expect any field CC Switch doesn't own to be at risk on every launch and provider switch.
- **Treat the Codex proxy as an adapter layer with real surface area.** Tool-call IDs, thinking blocks, image-only tool outputs, and multi-`function_call` turns are all sources of 400s today; avoid upstream-only assumptions and always surface a clear error from the client (see #5001's complaint about poor error reporting).
- **For cost-optimized agent stacks**, the in-flight *takeover-mode subagent routing* (PR #7165) and *isolated provider sessions* (PR #7094) are worth tracking — they enable running a flagship planner with subagent fan-out on cheaper relays while keeping state fully partitioned per provider.
- **Pricing is now an explicit, version-controlled table.** Three new flagship seeds (GLM-5.3 Flash, GPT-6 Astra, Gemini 3.8 Flash) shipped with regression tests; if you're benchmarking cost, pin the seed commit and verify the four-field pricing (`input/output/cache_read/cache_write`) is in USD/M.
- **For self-hosted relays**, enable Happy-Eyeballs-style IPv4 fallback if you deploy CC Switch against IPv6-only endpoints (#5096), and plan to ship CA or signing trust for self-signed TLS certs (#5042) — the proxy currently cannot negotiate them.
- **Per-user auditability** is improving: usage import now records request mode and reasoning effort and tolerates Windows mtime anomalies (PR #6792); pairing that with PR #7161's empty-model recovery gives cleaner session-log reconstruction when gateways misbehave.
- **i18n and UX**: pt-BR is shipping (PR #7046); Skill groups are becoming first-class organizational units (PR #7008). If you maintain marketplace content or curated skill bundles, plan around the group/ungrouped model.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-07

## 1. Today's Highlights

The rc.34 release lands a comprehensive account-security overhaul (TOTP/Passkey, session-bound scope proofs, system access token rotation, audit logs) and unifies Telegram login under the standard OAuth flow. On the relay side, the focus is on **billing correctness and streaming resilience**: an open double-billing bug for cached image tokens (#7229, with fix PR #7230) and a non-streaming charge-after-disconnect issue (#7231) take priority, while #7228 introduces a long-requested per-channel **TTFB (first-token) timeout with automatic fallback** for stuck streaming upstreams.

## 2. Releases & Breaking Changes

- **[v1.0.0-rc.34](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.34)** — Account security milestone:
  - Login and sensitive operations share a single verification flow; TOTP and Passkey are mutual fallback factors.
  - System access tokens can now be viewed, rotated, revoked, and audited; standalone audit log introduced.
  - Account deletion, bindings, password reset, Passkey/2FA enrollment, and channel-key viewing all require a one-shot scope proof bound to the originating session.
  - **Telegram login migrated to unified OAuth**: admins must register `/oauth/telegram` in BotFather Login Widget and provide Client ID / Client Secret.
  - **Migration action required** for any deployment using Telegram login prior to rc.34.

- Notable merged PRs in this window (behaviors landing in subsequent RCs):
  - [#7211](https://github.com/QuantumNous/new-api/pull/7211) — Model-specific OpenAI Chat capability tables; GPT-6 Astra gets its own rules rather than reusing GPT-5 heuristics, and clears `temperature` correctly.
  - [#6975](https://github.com/QuantumNous/new-api/pull/6975) — Restores the **original (client-requested) model name in responses** when `model_mapping` rewrites upstream to a different name; the upstream name is still preserved in `other.upstream_model_name`.
  - [#6997](https://github.com/QuantumNous/new-api/pull/6997) — Aligns in-memory channel cache with the `Ability.enabled` selection path to prevent divergent channel routing after per-group disabling.
  - [#7221](https://github.com/QuantumNous/new-api/pull/7221) — Batch-copies `RawMessage` to reduce deep-copy overhead in Responses relay.
  - [#7213](https://github.com/QuantumNous/new-api/pull/7213) — Multi-domain support.

## 3. New Model & Hardware Support

No new model families, architectures, or backends (CUDA/ROCm/Metal/CPU) added in this window. Routing/capability work centers on existing providers:
- Rerank classification bug fixed ([#7181](https://github.com/QuantumNous/new-api/pull/7181), closes [#7177](https://github.com/QuantumNous/new-api/issues/7177)).
- GPT-6 Astra and OpenAI Chat token/sampling rules get dedicated handling ([#7211](https://github.com/QuantumNous/new-api/pull/7211)).
- Gemini 3.8 Flash variant preservation regression under rc.33 noted ([#7220](https://github.com/QuantumNous/new-api/issues/7220), closed; verify before pinning to rc.33).

## 4. Performance & Optimization

- [#7221](https://github.com/QuantumNous/new-api/pull/7221) — Batch `RawMessage` copy in relay, reducing request-side deep-copy cost (no posted benchmarks, expected to be measurable on long-context Responses traffic).
- [#7228](https://github.com/QuantumNous/new-api/pull/7228) — **Per-channel TTFB (first-token) timeout with automatic fallback** for streaming. Headers-received-but-no-first-byte stalls no longer wait for the full streaming timeout; the gateway fails over to the next channel. This is the single biggest latency-resilience improvement of the window.
- [#7161](https://github.com/QuantumNous/new-api/pull/7161) — Active channel probing toggle (open) for liveness-based routing decisions.

## 5. Stability & Regressions

Ranked by severity (highest first). Severity reflects user-visible impact and blast radius.

| Severity | Item | Status | Fix |
|---|---|---|---|
| High | [#7229](https://github.com/QuantumNous/new-api/issues/7229) — Image cache hit **double-charges** tokens (image quota path double-counts cached image tokens). rc.30 reported. | OPEN | [#7230](https://github.com/QuantumNous/new-api/pull/7230) — Fix in `service/text_quota.go::calculateTextQuotaSummary`: `imageTokensNotCached = max(0, imageTokens - cacheTokens)`. Open. |
| High | [#7231](https://github.com/QuantumNous/new-api/issues/7231) — Non-streaming client: upstream request continues after client timeout, and quota is still deducted after the client disconnects. rc.25 reported. | OPEN | None linked. Investigate context-cancellation propagation in non-streaming relay. |
| Medium | [#7215](https://github.com/QuantumNous/new-api/issues/7215) — Anthropic `thinking` level not mapped to OpenAI upstream `reasoning_effort` (rc.30). | CLOSED | Fix landed. |
| Medium | [#2542](https://github.com/QuantumNous/new-api/issues/2542) — Force-rewrites `role:system` to `role:developer` on `openai/gpt-5.2`, breaking the upstream call. | CLOSED | Fix landed. |
| Medium | [#7220](https://github.com/QuantumNous/new-api/issues/7220) — rc.33 regression: Gemini 3.8 Flash variant name altered during relay. | CLOSED | Reported as duplicate of already-handled path. |
| Low | [#7217](https://github.com/QuantumNous/new-api/issues/7217) — No UI toggle for `thinking_model_blacklist` / no per-channel switch to keep effort suffix. | CLOSED | Awaiting implementation decision. |
| Low | [#7232](https://github.com/QuantumNous/new-api/issues/7232) — Upstream media URL host rewrite to hide provider domain (declined as invalid). | CLOSED | Re-opened as feature in [#7233](https://github.com/QuantumNous/new-api/pull/7233) (OPEN). |
| Invalid | [#7225](https://github.com/QuantumNous/new-api/issues/7225), [#7224](https://github.com/QuantumNous/new-api/issues/7224) — `settleTestQuota` group multiplier and `ParseContent()` cache_control loss reports (rc.32). | CLOSED (invalid) | Reproducers declined; verify on rc.34 before re-reporting. |

Note: a significant share of merged PRs this window are AI-assisted (Codex Desktop / DeepSeek Harness / Trae). Reviewers should pay standard attention to model-routing and billing paths in particular.

## 6. What This Means for Application Developers

- **If you authenticate via Telegram login, plan a configuration migration to rc.34** before upgrading — BotFather Login Widget must register `/oauth/telegram` and new Client ID/Secret must be set, or Telegram sign-in will break.
- **Audit your billing on rc.30 deployments**: the cached-image double-charge (#7229) and the post-disconnect non-streaming charge (#7231) can both inflate usage on production traffic. If you operate at scale, pause before upgrading past rc.30 and re-validate reconciliations against fix PR #7230 once merged.
- **Streaming reliability is about to improve materially**: #7228 (per-channel TTFB + auto-fallback) addresses a long-standing class of "headers received, body stalled" hangs. Expect meaningfully fewer stuck-stream client timeouts once it ships — but treat the new fallback as a routing behavior change and confirm your retry/idempotency logic still holds when a mid-stream channel switch occurs.
- **Model-name round-tripping is now consistent** (#6975): when `model_mapping` rewrites `a → b`, clients will receive `model: "a"` in the response while `other.upstream_model_name` carries `"b"`. If your code keys telemetry, caching, or assertions on `response.model`, you can stop seeing "model names you never asked for".
- **Per-channel knobs are getting richer**: TTFB timeout (#7228), post-creation key-storage mode switch (#7196), and active channel probing (#7161) are all converging. If you operate multi-tenant or multi-provider setups, expect to need per-channel config migrations in the next 1–2 release cycles.
- **Rerank endpoints stop being misrouted** (#7181): clients that select a rerank model should no longer fall into the embedding test path — re-verify end-to-end after upgrade if you expose rerank.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*