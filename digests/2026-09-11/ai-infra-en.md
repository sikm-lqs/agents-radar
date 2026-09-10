# AI Infrastructure Digest 2026-09-11

> Generated: 2026-09-10 23:30 UTC | Projects covered: 9

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

# Cross-Project AI Infrastructure Report — 2026-09-11

## 1. Ecosystem Overview

Today's activity is dominated by the industry-wide transition to **hybrid-attention architectures** (linear/GDN + sparse-indexer layers): GLM-5.3-Flash, Qwen3.8-Flash-Next, and the upcoming DeepSeek V4.1 are forcing every layer of the stack — KV pools, radix caches, PD-disaggregation, and speculative decoding — to be re-plumbed. **DeepSeek V4.1 is the most anticipated near-term release**, with SGLang running coordinated day-0 preparation while Ollama and LiteLLM position on the consumption side. Meanwhile, the most dangerous failure mode across the ecosystem has shifted from crashes to **silent correctness loss**: random tokens, dropped checkpoint weights, stale KV cells, and billing drift. llama.cpp remains the highest-cadence project (10 tagged builds in 24h), while gateway-layer projects (LiteLLM, CC Switch, New API) accumulate protocol-shim complexity and operational debt.

## 2. Activity Comparison

| Project | Issues (digest scope)* | PRs (digest scope)* | Release status (24h) |
|---|---|---|---|
| **vLLM** | 28 | 14 | None |
| **SGLang** | 21 | 20 | None (deprecation RFCs progressing) |
| **llama.cpp** | 19 | 22 | **10 builds** (b10889–b10901) |
| **Ollama** | 16 | 16 | None tagged; llama.cpp b10864 + MLX bumps merged |
| **LiteLLM** | 20 | 11 | **v1.100.1** (stable) + **v1.101.0-rc.2** |
| **Unsloth** | 15 | 17 | None |
| **Claude Code Router** | 4 | 6 | **v3.1.0** |
| **CC Switch** | 37 | 32 | None (queued on `main`) |
| **New API** | 17 | 8 | None |

\* Distinct issues/PRs referenced in each project's digest; only CC Switch publishes exact scope counts (37/32). CC Switch and llama.cpp show the widest issue surface; vLLM and SGLang carry the heaviest per-item complexity (multi-GPU, multi-vendor repro matrices).

## 3. Model Support Race

| Model | vLLM | SGLang | llama.cpp | Ollama | Gateways |
|---|---|---|---|---|---|
| **GLM-5.3-Flash** (320B hybrid) | Firefighting: CUDA IMA crashes, MXFP4 ROCm fix in flight (#56176) | SM120 qualification open (#37813); **silent checkpoint weight-drop bug** (#38618) | **First architecture PR** opened (#27773), text+vision | Cloud streaming fix shipped (#18351) | — |
| **DeepSeek V4 / V4.1** | V4-Flash SM8x request = highest-engagement open issue (#50576) | **Day-0 V4.1 prep**: 6 coordinated PRs (KV pool, HiCache, PD, Blackwell prefill) | — | V4.1-Flash cloud requested (#18360, 27👍) | LiteLLM: Vertex DeepSeek OCR adapter; pricing stale (#37255); CC Switch catalog fixes |
| **Qwen3.8-Flash-Next** (qwen4exp) | Spec-decode + tool-call bug cluster | PD state transfer for recurrent state (#36651) | Incremental QSA indexer cache PR (#28699) | qwen3-coder parser fixes; H20 launch blocker (#38793) | CC Switch refreshed Qwen 3.8 presets |
| Others | OmniLingual ASR request | LLaDA-Image (diffusion T2I), SenseNova-U1, MiniMax-H3, Kimi-K3 | Hexagon NPU, RDNA3.5, WinARM64 | DeepSeek/Gemma4 tooling | Laonong API preset (CC Switch); Mistral Files/Batches (LiteLLM) |

**Verdict:** **llama.cpp leads on architecture first-landing** (GLM-5.3-Flash and qwen4exp support arriving in-tree first, plus the broadest hardware backend work). **SGLang leads on forward-looking datacenter serving** — it is the only project doing pre-release DeepSeek V4.1 enablement. vLLM, normally the pace-setter, is currently in a stabilization phase for GLM-5.3-Flash rather than extending the frontier.

## 4. Performance Frontier

- **KV-cache & memory architecture (SGLang's stronghold):** unified shared byte budget across Full/SWA pools, the `kv-shard` logical-page series, HiCache physical-envelope fixes; vLLM countermoves with filesystem-KV-offload and KV-key-partitioning conformance RFCs; llama.cpp eliminated indexer V-cache allocation (b10889).
- **Cold start as a first-class SLO:** SGLang's Weight Cache Daemon cut Qwen3-235B FP8 load from **306–327s to <1s** via CUDA-IPC daemon — the single biggest number of the day. Ollama is investigating a load-time regression since 0.23.4.
- **Vendor-specific kernels:** vLLM — CUTLASS Lamport fused GEMM+AllReduce proposal for SM100, **+13% TTFT** from gfx11 row-stride padding; llama.cpp — **3–7× CPU k-quant mul_mat**, Vulkan `topk_moe` prefill fusion; Unsloth — **1.28× B200 LoRA step** (experimental).
- **Speculative decoding correctness:** vLLM restored hybrid-GDN prefix-cache hits under MTP (recovering a 30–40% throughput loss) and added per-draft-length acceptance histograms; llama.cpp and SGLang still carry open MTP/DFlash divergence bugs.
- **Gateway hot-path:** LiteLLM offloaded spend tracking to a sidecar (was the top CPU contributor on the request path) — evidence the routing layer is now optimizing its own p99.

## 5. Layer Positioning

| Layer | Projects | Today's defining concern |
|---|---|---|
| **Datacenter serving engines** | vLLM, SGLang | Multi-GPU/multi-vendor correctness, PD disaggregation, spec decoding, quantized kernels (MXFP4/FP8/NVFP4) |
| **Local/edge runtime** | llama.cpp (kernel layer), Ollama (packaging/GUI/cloud), Unsloth Studio (local UX) | Hardware breadth (Vulkan/PowerVR/Hexagon/MLX), memory lifecycle, consumer tool-call reliability |
| **Gateway / proxy / router** | LiteLLM (enterprise: auth, spend, routing, guardrails), New API (multi-provider billing/channels), CC Switch & Claude Code Router (desktop protocol shims) | Protocol translation fidelity (Anthropic↔OpenAI↔Responses), billing correctness, session/config persistence |
| **Training / fine-tuning** | Unsloth | Single-GPU Blackwell LoRA throughput, MLX MoE fusion, offline/air-gapped workflows |

A notable blurring: Ollama now bridges local and cloud (Cloud stream fixes, DeepSeek-V4.1-Flash requests); Unsloth exposes Ollama models via its API; CC Switch's local proxy is doing genuine protocol-shim work upstream CLIs don't handle.

## 6. Trend Signals

1. **Hybrid attention is the new baseline topology — and it breaks caching assumptions.** Radix-cache semantics, KV pool layout, and draft-model state transfer are all being redesigned (SGLang `kv-shard`, vLLM #52244, llama.cpp #28699). Expect a 1–2 quarter correctness tail.
2. **Silent corruption is the top-severity pattern ecosystem-wide:** vLLM GlmMoeDsa random tokens (#54300), SGLang GLM-5.3 dropped weights (#38618), Ollama broken q2_K quants (#18252), llama.cpp stale Vulkan KV (#26744), LiteLLM $0 spend rows (#35691). Audit outputs, not just uptime.
3. **DeepSeek V4.1 will reset long-context economics.** SGLang's 32 GiB prefill-workspace bounding plus <1s reloads signal a cost/latency step-change on landing. Watch for vLLM's response.
4. **The Ampere fleet refuses to die:** SM8x support for DeepSeek-V4-Flash is vLLM's highest-engagement issue; Turing issues still being filed. Vendor roadmaps are out of sync with deployment reality.
5. **Tool-calling is a cross-layer battleground:** Ollama parser fixes, SGLang Kimi-K3 grammar dilution, New API `input_json_delta` truncation, llama.cpp 500-on-malformed-JSON. Defensive validation (unwrap `"arguments"`/`"input"`, check for empty `tool_calls` + `done`) remains mandatory.
6. **Gateway-layer debt is maturing into risk:** Ollama's 4-month-old CVE backlog (36 vulns), Ollama FD leak requiring periodic restarts, LiteLLM billing drift across three independent bugs, CC Switch's 22 GB DB growth. Treat gateways as production infrastructure with real SLOs.

**Immediate watch list:** pin GLM-5.3-Flash deployments (vLLM 0.27.x safest); hold Qwen3.8-Flash-Next-FP8 on H20 fleets; verify Prometheus scraping after LiteLLM upgrades; don't route `thinking`-history sessions to Responses-API upstreams (CCR #1783); expect DeepSeek V4.1-related releases from SGLang and llama.cpp within days.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Project Digest — 2026-09-11

## Today's Highlights

Heavy engineering activity continues to center on **GLM-5.3-Flash** integration (multiple crash regressions, a new `Glm5NextTextLinearAttention` path, and ROCm Quark MXFP4 load fixes), alongside meaningful progress on **speculative decoding with hybrid attention models** — a fix for hybrid-GDN prefix-cache hits under MTP landed in PR #52244 and a follow-up metric for per-draft-length acceptance is now in review. The long-standing request for **DeepSeek-V4-Flash on Ampere (SM8x)** remains the highest-engagement open issue, reflecting the breadth of A100/A800 deployments still in production.

## Releases & Breaking Changes

No releases published in the last 24 hours.

## New Model & Hardware Support

- **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731 on SM8x (Ampere A100/A800, RTX 30xx)** — open feature request tracking SM8x support for the new `DeepseekV4ForCausalLM` architecture ([#50576](https://github.com/vllm-project/vllm/issues/50576)).
- **GLM-5.3-Flash Quark MXFP4 on ROCm** — ROCm load + inference of the `amd/GLM-5.3-Flash-Quark-MXFP4` checkpoint being fixed in ([#56176](https://github.com/vllm-project/vllm/pull/56176)); covers both weight-load bugs.
- **MoonEP balanced expert-parallel backend (BF16, eager)** — first item of the MoonEP all2all integration roadmap ([#52101](https://github.com/vllm-project/vllm/pull/52101)) behind `--all2all-backend moonep`.
- **Aiter MLA decode — non-causal DFlash draft block** — rebase of the original PR onto current `main`, fixing the flattened non-causal draft query path ([#55966](https://github.com/vllm-project/vllm/pull/55966)).
- **OmniLingual ASR (1600+ languages)** — open new-model request to leverage vLLM's serving stack for Meta's recently-released multi-lingual ASR ([#28509](https://github.com/vllm-project/vllm/issues/28509)).
- **DSA nvfp4_ds_mla from the fused norm+rope kernel** — rebase-catch-up to make the fused kernel write the NVFP4 MLA layout alongside fp8 ([#55538](https://github.com/vllm-project/vllm/pull/55538)).
- **RFC: Data integrity & I/O liveness for filesystem KV offload tier** ([#54363](https://github.com/vllm-project/vllm/issues/54363)) and **RFC: conformance suite for KV-cache key partitioning** ([#53194](https://github.com/vllm-project/vllm/issues/53194)) — both moving toward a stronger KV-cache correctness contract.

## Performance & Optimization

- **CUTLASS Lamport fused GEMM + AllReduce on SM100 (Blackwell)** proposed for vLLM integration ([#55261](https://github.com/vllm-project/vllm/issues/55261)).
- **GEMM weight row-stride padding for L2 cache on gfx11 (RDNA3/3.5)** — measured **TTFT up to +13%, TPOT up to +3%** ([#55090](https://github.com/vllm-project/vllm/pull/55090)).
- **Shared-expert multi-stream overlap enabled on ROCm** via `is_cuda_alike()` ([#51117](https://github.com/vllm-project/vllm/pull/51117)).
- **Restore hybrid-GDN prefix-cache hits under MTP speculative decoding** — fixes 1,648-token recompute per hit (~30–40% throughput loss) on Qwen3.5-122B-A10B ([#52244](https://github.com/vllm-project/vllm/pull/52244)); aligns with the underlying performance complaint in ([#53670](https://github.com/vllm-project/vllm/issues/53670)).
- **Per-draft-length acceptance histogram** added to the spec-decode opt-in response so `(1,1),(3,2)` and `(2,1),(2,2)` are no longer collapsed ([#56278](https://github.com/vllm-project/vllm/pull/56278)).
- **Zero-JIT warmup follow-up** — adoption and per-model de-JITification tracker ([#49349](https://github.com/vllm-project/vllm/issues/49349)) with shared infrastructure from #47456.
- **Batch-invariant inference tracking** continues to gather design proposals ([#27433](https://github.com/vllm-project/vllm/issues/27433)).
- **CustomOp cleanup** (a long-standing `CompilationConfig` defaults conversation) remains active ([#19817](https://github.com/vllm-project/vllm/issues/19817)).

## Stability & Regressions

Ranked by user-impact severity:

1. **GLM-5.3-Flash recurring CUDA illegal memory access on 4×B200** across three unrelated kernels (KDA linear-attention, MHC TileLang, TRT-LLM fused MoE) — high severity, no fix PR linked yet ([#54317](https://github.com/vllm-project/vllm/issues/54317)).
2. **GLM-5.3-Flash checkpoint load crash on v0.29.0 with TP2×EP2** — closed without public fix confirmation; load fix for the Quark MXFP4 path is in flight ([#56007](https://github.com/vllm-project/vllm/issues/56007), fix in [#56176](https://github.com/vllm-project/vllm/pull/56176)).
3. **GlmMoeDsa regression 0.27→0.28+ with decode-context-parallel** — crashes on 0.28.0, **silently returns random tokens on 0.29.0** on AMD/ROCm — silent-corruption variant is the most dangerous ([#54300](https://github.com/vllm-project/vllm/issues/54300)).
4. **Qwen3.8-Flash-Next non-deterministic greedy decoding** when prompt length nears `indexer_budget` on sm121/GB10 due to `persistent_topk` ([#54521](https://github.com/vllm-project/vllm/issues/54521)), with a related silent top-k drop in the same kernel ([#51782](https://github.com/vllm-project/vllm/issues/51782)).
5. **Marlin W4A8-FP8 silently corrupts output on GB10/sm_121a** with WNA16 INT4 MoE — repeated `</think>` loop at temp 0; **~2.5% faster** as a tell ([#49546](https://github.com/vllm-project/vllm/issues/49546)).
6. **custom_all_reduce IPC handle failure with `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True`** when both DP>1 and TP>1 ([#42609](https://github.com/vllm-project/vllm/issues/42609)).
7. **Stale Triton kernel cache on DGX Spark (sm_121)** producing garbled outputs — wiping `~/.triton/cache` is the workaround ([#41871](https://github.com/vllm-project/vllm/issues/41871), closed).
8. **Heterogeneous PP transfer completion in Mooncake** when prefill and decode PP sizes differ — fix in ([#56033](https://github.com/vllm-project/vllm/pull/56033)).
9. **Multi-decode P/D disagg misrouting race-condition on ROCm + mori-io** — fix in ([#51681](https://github.com/vllm-project/vllm/pull/51681)).
10. **Logprobs Triton kernel JIT-compiles mid-request** on first unseen `num_logprobs` — fix in ([#55918](https://github.com/vllm-project/vllm/pull/55918)).
11. **Mamba1 `mamba_ssm_cache_dtype` opaque crash** when SSM state dtype ≠ float32 and ≠ activation dtype — fix in ([#54123](https://github.com/vllm-project/vllm/pull/54123)).
12. **FP8 Triton MoE opaque compile crash below SM89** — early validation fix in ([#54287](https://github.com/vllm-project/vllm/pull/54287)).
13. **Tool-calling bugs with Qwen3.8-Flash-Next** (tool_choice="required" + thinking off; xgrammar FSM failures with thinking on + MTP) — closed ([#55552](https://github.com/vllm-project/vllm/issues/55552)).
14. **Mistral3 multimodal profiling failure on text-only `LLM()` init** — closed ([#50706](https://github.com/vllm-project/vllm/issues/50706)).
15. **Tesla T4 (Turing) shared-memory exhaustion** in current attention kernels ([#36802](https://github.com/vllm-project/vllm/issues/36802)) — and a separate Gemma4-on-Turing shared-memory finding ([#38918](https://github.com/vllm-project/vllm/issues/38918)).
16. **`chunk_gated_delta_rule` Triton compile failure on MI210/gfx90a** with `num_stages=4` ([#44973](https://github.com/vllm-project/vllm/issues/44973)).
17. **DeepSeek-V4-Pro `mlir_global_dtors()` error on 8×H20-3e** ([#44949](https://github.com/vllm-project/vllm/issues/44949)) and **v0.22.0 failing offline `LLM` mode for Qwen3.5-9B** ([#44985](https://github.com/vllm-project/vllm/issues/44985)) — both stale, no recent activity.
18. **No sm_121 support on aarch64 (DGX Spark / Acer GN100)** — kernel builds missing for the GB10 Grace Blackwell Superchip on ARM ([#36821](https://github.com/vllm-project/vllm/issues/36821)).
19. **TP-MoE collectives redundancy** — sequence-parallelism surgical removal via `torch.compile` passes still open ([#29139](https://github.com/vllm-project/vllm/issues/29139)).
20. **Thinking-budget not enforced with MTP** — closed without a public fix ([#39573](https://github.com/vllm-project/vllm/issues/39573)).

Also notable but lower severity: **scheduler only runs ~3 concurrent sequences at batch ≥ 4 for Hybrid GDN (Qwen3.5/Qwen3.8 27B-class) + MTP** ([#55533](https://github.com/vllm-project/vllm/issues/55533)), and **DFlash is unusable for GLM-5.3-Flash on ROCm** because the model lacks `SupportsEagle3` and AITER MLA sparse has no non-causal path ([#54451](https://github.com/vllm-project/vllm/issues/54451)).

## What This Means for Application Developers

- **Pin your vLLM version carefully when serving GLM-5.3-Flash.** The 0.28→0.29 transition introduced a silent-token-corruption regression on AMD (`GlmMoeDsa` + decode-context-parallel) and persistent CUDA IL memaccess on NVIDIA. Either stay on 0.27.x or track the open PR ([#56176](https://github.com/vllm-project/vllm/pull/56176)) and the GLM-5.3 issue cluster ([#54062](https://github.com/vllm-project/vllm/issues/54062), [#54317](https://github.com/vllm-project/vllm/issues/54317), [#54300](https://github.com/vllm-project/vllm/issues/54300)).
- **Speculative decoding on hybrid-attention models (Qwen3.5/Qwen3.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-11

## Today's Highlights

DeepSeek V4.1 preparation is now the dominant workstream on `main`: a coordinated set of PRs (#38954, #38957, #38956, #36730, #36729, #36731) is reshaping the KV pool, HiCache, PD disaggregation, and Blackwell prefill paths to fit V4.1's compressed-indexer topology. Alongside that, the **Weight Cache Daemon** roadmap (#33522) reports Phase 1 results — Qwen3-235B FP8 weight load drops from 306–327s to under 1 second via a per-rank CUDA-IPC daemon — and the `kv-shard` series (PR #38356) begins moving tree-cache placement from `RadixCache` onto the new `UnifiedRadixCache` core.

## Releases & Breaking Changes

No new releases in the last 24h. Two deprecation RFCs progressed this week and are worth flagging for upgrade planning:

- [PR #32112](https://github.com/sgl-project/sglang/pull/32112) — Deprecate non-Marlin GPTQ kernel and Dual Chunk Flash Attention backend (closed).
- [PR #32111](https://github.com/sgl-project/sglang/pull/32111) — Deprecate `--attention-backend cutlass_mla` (already disabled on SM 10.0/B200; closed).
- [Issue #35765](https://github.com/sgl-project/sglang/issues/35765) — Sampling masks without finite top-k now supported; affects OpenAI chat extension clients that previously relied on finite top-k as a reconstruction bound (closed).
- [PR #38769](https://github.com/sgl-project/sglang/pull/38769) — Bundled NVSHMEM pinned at 3.4.5 missing `NVSHMEM_IB_GID_INDEX`; bump to 3.7.2 is now required for some IB/RoCE fabrics.

## New Model & Hardware Support

- **LLaDA-Image / LLaDA-Image-Turbo** (diffusion): PR [#37907](https://github.com/sgl-project/sglang/pull/37907) adds T2I, image editing, sequence parallelism, and FP8 serving.
- **SenseNova-U1 / U1.5** tracking: Issue [#37742](https://github.com/sgl-project/sglang/issues/37742) opened for end-to-end support.
- **GLM-5.3-Flash on SM120** (2× 96 GB RTX PRO 6000 Blackwell): Issue [#37813](https://github.com/sgl-project/sglang/issues/37813) tracks TP2/W4A16 routed experts/FP8 KV/vision/MTP qualification.
- **DeepSeek V4.1** in progress: PRs [#38954](https://github.com/sgl-project/sglang/pull/38954) (compressed-pool generalization), [#38957](https://github.com/sgl-project/sglang/pull/38957) (encoder SWA replay), [#38956](https://github.com/sgl-project/sglang/pull/38956) (Blackwell prefill workspace bounding), gated on upstream [#38798](https://github.com/sgl-project/sglang/pull/38798).
- **DeepSeek V4 + DSV4 DeepGEMM MegaMoE** sparse expert fusion: Issue [#38700](https://github.com/sgl-project/sglang/issues/38700).
- **Qwen3.8-Flash-Next** PD state transfer: PR [#36651](https://github.com/sgl-project/sglang/pull/36651) moves non-KV recurrent/sparse-attention state across prefill/decode.
- **Rust frontend** fallback: PR [#38939](https://github.com/sgl-project/sglang/pull/38939) uses Dynamo native renderers when HF `chat_template` is missing (e.g., DeepSeek V4).
- **ROCm MoE**: PR [#38328](https://github.com/sgl-project/sglang/pull/38328) admits the unified Triton router on ROCm including single-group routing.
- **NPU**: Issue [#34861](https://github.com/sgl-project/sglang/issues/34861) tracks router-GEMM output dtype (should always be fp32).

## Performance & Optimization

- **Weight Cache Daemon (Phase 1)** — Issue [#33522](https://github.com/sgl-project/sglang/issues/33522): Qwen3-235B FP8 weight load time **306–327s → <1s** via per-rank daemon + CUDA IPC. Phase 2 in progress.
- **`kv-shard` 1/4 — logical-page placement** — PR [#38356](https://github.com/sgl-project/sglang/pull/38356): moves tree-cache half from `RadixCache` onto `UnifiedRadixCache` / `UnifiedTreeCore` (which is what `registry.default_radix_cache_factory` actually returns).
- **Unified memory shared byte budget** — PR [#36729](https://github.com/sgl-project/sglang/pull/36729): full-attention and sliding-window pools now share one dynamic byte arena instead of static per-pool gates.
- **Unified memory PD page-envelope transfers** — PR [#36730](https://github.com/sgl-project/sglang/pull/36730) and [#36731](https://github.com/sgl-project/sglang/pull/36731): explicit logical→physical translation and shared byte budget applied to PD decode host pools.
- **DSV4.1 Blackwell prefill workspace** — PR [#38956](https://github.com/sgl-project/sglang/pull/38956): bounds the dense `[query_rows=8192, context_length=1,048,576]` FP32 indexer score tensor (32 GiB); switches to candidate-scored compact indexing.
- **GB300 QSA paged sparse-decode gather** — PR [#38851](https://github.com/sgl-project/sglang/pull/38851): memory-safe rewrite (zero-fill scratch, int64 offsets, on-gather FP8 dequant) for `--kv-cache-dtype fp8_e4m3` MTP/NEXTN verify on GB300 SM103.
- **HiCache physical-transfer fix** — PR [#37496](https://github.com/sgl-project/sglang/pull/37496): unified-memory H2D/D2H now address current physical envelopes rather than stable logical IDs.
- **NCCL 2.30 integration roadmap** — Issue [#32774](https://github.com/sgl-project/sglang/issues/32774): NCCL EP, M-to-N reshard, zero-SM one-sided, runtime RAS, communicator checkpointing, elastic communicators.
- **Evaluation unification** — PR [#38953](https://github.com/sgl-project/sglang/pull/38953): GSM8K and MMLU consolidated onto `sgl-eval` to avoid chat-template vs. raw completion confusion.

## Stability & Regressions

Ranked by severity:

1. **[Bug, DCP/PD Disagg] Decode retraction CUDA assert** — Issue [#38645](https://github.com/sgl-project/sglang/issues/38645): `retract_decode` crashes inside `get_cpu_copy` with DCP > 1; index-space mismatch in CPU backup/restore. No fix PR yet. **High severity** — affects PD-disagg decode reliability.
2. **[Bug] DFlash2 output divergence** — Issue [#38009](https://github.com/sgl-project/sglang/issues/38009): greedy output diverges from target-only Qwen3.8-27B when thinking is enabled. No fix PR yet.
3. **[Bug] DeepSeek-V4-Flash-0731 progressive output corruption** — Issue [#33397](https://github.com/sgl-project/sglang/issues/33397): 2× H200 + DP attention shows corruption under concurrency. No fix PR yet.
4. **[Bug] GLM-5.3 checkpoint weight drop** — Issue [#38618](https://github.com/sgl-project/sglang/issues/38618): checkpoints written by transformers load with MoE/mHC/KDA weights silently dropped. **High severity** — silent correctness loss.
5. **[Bug] H20 8-card cannot launch Qwen3.8-Flash-Next-FP8** — Issue [#38793](https://github.com/sgl-project/sglang/issues/38793): model fails to start on H20. **High severity** — blocks deployments on H20 fleets.
6. **[Bug] MiniMax-H3 GGUF patch-embedding load failure** — Issue [#38904](https://github.com/sgl-project/sglang/issues/38904): folded Conv3D patch embedding cannot be loaded via GGUF text-encoder path.
7. **[Bug] MiniMax-H3 FL2VA corrupted video with layerwise offloading** — Issue [#38605](https://github.com/sgl-project/sglang/issues/38605) (closed, follow-ups likely).
8. **[Bug] Kimi-K3 strict tool-call grammar dilution** — Issue [#38587](https://github.com/sgl-project/sglang/issues/38587): xgrammar constraint allows `additionalProperties` to satisfy a named property.
9. **[Bug] DeepSeek V4/V3.2 DSML tool-call parser spurious key** — Issue [#38924](https://github.com/sgl-project/sglang/issues/38924): occasionally wraps arguments under `"arguments"`/`"input"`.
10. **[Bug] Mamba radix cache 0-hit after split** — Issue [#22935](https://github.com/sgl-project/sglang/issues/22935): fresh prefill matches collapse to 0-hit on `MambaRadixCache` after split. No fix PR yet.
11. **[Bug] Scripted-runtime rid reuse race → 60s recv timeout** — Issue [#38788](https://github.com/sgl-project/sglang/issues/38788): three `test/manual/chunked_prefill` tests red.
12. **[HiCache] HiRadixCache TP-deadlock** — Issue [#28429](https://github.com/sgl-project/sglang/issues/28429) (closed): divergent `write_backup`/`load_back` enqueue decisions. PR likely landed.
13. **[Bug] DeepSeek V4 Pro TP24 vocab-padding failure on Hopper** — PR [#31801](https://github.com/sgl-project/sglang/pull/31801) (open, fix in flight).
14. **[DeepSeek V4] non-EP TBO for attention TP > 1** — PR [#33250](https://github.com/sgl-project/sglang/pull/33250) (open, depends on #31700).
15. **[HiCache] HybridLinear/Mamba PP correctness** — Issue [#38866](https://github.com/sgl-project/sglang/issues/38866): cache-transfer completion and consumers use different layer indices on non-first PP stages (Nemotron-H family). Fix PR linked.
16. **[Fork-sync prerequisite]** — Issue [#38818](https://github.com/sgl-project/sglang/issues/38818): 82 conflicts blocking DeepSeek-V4.1 sync (closed after trial).
17. **CI signal** — Issue [#17050](https://github.com/sgl-project/sglang/issues/17050): 1 broken, 8 flaky, 986 recently fixed as of 2026-09-10 23:18 UTC.

## What This Means for Application Developers

- **Long-context DeepSeek workloads will get noticeably cheaper to serve** once V4.1 lands: the combination of Weight Cache Daemon (<1s reloads on Qwen3-235B FP8) and DSV4.1 prefill workspace bounding (32 GiB → much smaller) materially reduces cold-start cost and per-request GPU memory pressure. Until then, pin DeepSeek V4 to known-good configs and avoid mixing `moe_a2a_backend=none` with DP attention TP > 1 ([#33250](https://github.com/sgl-project/sglang/pull/33250)).
- **PD disaggregation is being re-plumbed for unified memory**. The `kv-shard` series ([#38356](https://github.com/sgl-project/sglang/pull/38356), [#36730](https://github.com/sgl-project/sglang/pull/36730), [#36731](https://github.com/sgl-project/sglang/pull/36731)) means clients should not assume physical page IDs are stable across requests or even within a single request lifecycle — but downstream this enables much higher effective KV-cache utilization for hybrid Full/SWA models.
- **Tool-calling clients should validate against upstream quirks**: Kimi-K3 strict grammars can pass `additionalProperties` against a named property ([#38587](https://github.com/sgl-project/sglang/issues/38587)), and DeepSeek V4/V3.2 DSML parsing can wrap arguments under `"arguments"`/`"input"` ([#38924](https://github.com/sgl-project/sglang/issues/38924)). If you are validating tool calls strictly server-side, defensively unwrap these keys before passing to your validator.
- **InfiniBand/RoCE deployments on restricted fabrics** need the NVSHMEM 3.7.2 bump ([#38769](https://github.com/sgl-project/sglang/pull/38769)) to set `NVSHMEM_IB_GID_INDEX`. Confirm your container image before scaling out on IDC fabrics that pin GID explicitly.
- **GLM-5.3-Flash on Blackwell PRO 6000 is still pre-qualification** ([#37813](https://github.com/sgl-project/sglang/issues/37813)) — and transformers-exported GLM-5.3 checkpoints drop weights silently on load ([#38618](https://github.com/sgl-project/sglang/issues/38618)). Prefer native-format checkpoints until that issue is closed.
- **H20 fleets**: Qwen3.8-Flash-Next-FP8 currently cannot launch on 8× H20 ([#38793](https://github.com/sgl-project/sglang/issues/38793)). Hold the rollout or pin to Qwen3.8-Flash-Next base ([#37500](https://github.com/sgl-project/sglang/pull/37500)) for now.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-11

## 1. Today's Highlights

The Vulkan backend received the most concentrated attention in this window: a sequence of releases (b10891 → b10901) added topk_moe prefill fusion, small-M matrix optimizations for Qwen, PowerVR compatibility fallbacks, and idle-context CPU writes for async copies. On the model side, **GLM-5.3-Flash (GLM5-Next)**, a 320B hybrid (34 KDA + 11 DSA layers) with mHC and vision, opened a support PR, and a substantial **qwen4exp** performance PR (#28699) introduced an incremental pooled-key cache for the QSA indexer — the dominant remaining decode cost at depth.

## 2. Releases & Breaking Changes

| Build | Change | PR |
|------|--------|-----|
| **b10901** | vulkan: use CPU writes in `ggml_backend_vk_cpy_tensor_async` when context is idle | [#28618](https://github.com/ggml-org/llama.cpp/pull/28618) |
| **b10900** | vulkan: enable `topk_moe` fusion for prefill via `add_alloc_dep` | [#28422](https://github.com/ggml-org/llama.cpp/pull/28422) |
| **b10899** | vulkan: small-M `mul_mat` optimizations for Qwen (A/B swap, split_k, tile selection by M) | [#28457](https://github.com/ggml-org/llama.cpp/pull/28457) |
| **b10897** | ci: switch WoA CUDA builds from 13.4 dev preview to 13.4.1 GA redistributables | [#28687](https://github.com/ggml-org/llama.cpp/pull/28687) |
| **b10896** | spec: fix DFlash mtmd chunk decode failure (vision draft models) | [#28587](https://github.com/ggml-org/llama.cpp/pull/28587) |
| **b10894** | models: prune dead switch branches in old `llama_model_` cases | [#28669](https://github.com/ggml-org/llama.cpp/pull/28669) |
| **b10893** | tests: relax tolerance for Add fusion tests | [#28691](https://github.com/ggml-org/llama.cpp/pull/28691) |
| **b10892** | tests: drop SYCL special-casing in `test-backend-ops.cpp` | [#28688](https://github.com/ggml-org/llama.cpp/pull/28688) |
| **b10891** | vulkan: PowerVR dmmv fall back to shared-memory reduction (subgroup-only path fails on Imagination compiler) | [#28341](https://github.com/ggml-org/llama.cpp/pull/28341) |
| **b10889** | memory: stop allocating V cache for indexer (unused) — saves memory on DSA / Lightning Indexer | [#28330](https://github.com/ggml-org/llama.cpp/pull/28330) |

No ABI or CLI flag breaks.

## 3. New Model & Hardware Support

- **GLM-5.3-Flash (GLM5-Next)** — 320B hybrid (34 KDA + 11 DSA layers, mHC, DeepSeek-style attention), text + vision via mtmd. PR opened for architecture, conversion, and testing. [#27773](https://github.com/ggml-org/llama.cpp/pull/27773)
- **qwen4exp (Qwen3.8-Flash-Next)** architecture refinement: incremental pooled-key cache for the QSA indexer to avoid re-pooling the entire KV cache every step. [#28699](https://github.com/ggml-org/llama.cpp/pull/28699)
- **GDN normalization fix** landed (closed PR): `max` → `rsqrt` form to match QwenLM/FlashQLA and FLA backends. [#28068](https://github.com/ggml-org/llama.cpp/pull/28068)
- **Hexagon backend** overhaul: multi-NPU device support (IQ9, IQ10), fully asynchronous graph compute / events / tensor copy / cross-device fences. [#26501](https://github.com/ggml-org/llama.cpp/pull/26501)
- **ROCm RDNA3.5**: batched WMMA `mmq` kernels. [#28714](https://github.com/ggml-org/llama.cpp/pull/28714)
- **Windows ARM64 + MSVC `cl.exe`** build path (previously required clang). [#28362](https://github.com/ggml-org/llama.cpp/pull/28362)
- **CUDA DP4A emulation via DP2A** requested for older / non-DP4A NVIDIA parts. [#24616](https://github.com/ggml-org/llama.cpp/issues/24616)

## 4. Performance & Optimization

- **CPU mul_mat for k-quants (tiled, VNNI)**: 3–7× speedup claimed for `ggml-cpu` `mul_mat`, replacing the duplicated unpack work in vec_dot with 256×256 int8 windows. [#27851](https://github.com/ggml-org/llama.cpp/pull/27851)
- **qwen4exp QSA indexer**: caching block summary keys incrementally instead of regathering from the full cache per token — addresses the linear-with-context decode-cost growth flagged in [#28012](https://github.com/ggml-org/llama.cpp/issues/28012). [#28699](https://github.com/ggml-org/llama.cpp/pull/28699)
- **Vulkan prefill**: `topk_moe` fusion enabled via `add_alloc_dep` (b10900); small-M `mul_mat` swap + split_k + better tile selection for Qwen (b10899); idle-context CPU writes for async copies (b10901); argsort data-race and OOB fixes ([#28705](https://github.com/ggml-org/llama.cpp/pull/28705)).
- **Memory**: avoiding V-cache allocation for indexer layers (DSA / Lightning Indexer) reduces VRAM footprint on Qwen4Exp-class models (b10889, [#28330](https://github.com/ggml-org/llama.cpp/pull/28330)).

## 5. Stability & Regressions

**High severity (crashes / non-determinism / data corruption):**

- **MTP speculative decoding on Qwen3.6-35B-A3B** retains inter-request state → non-deterministic output and model degradation. [#26425](https://github.com/ggml-org/llama.cpp/issues/26425)
- **MTP triggers reproducible CUDA lockups** with Qwen3.8-27B under `--split-mode tensor`. [#27122](https://github.com/ggml-org/llama.cpp/issues/27122)
- **CUDA illegal memory access in flash-attn path** (`cudaStreamSynchronize`) on Qwen3.6-35B MoE with partial expert offload; deterministic across builds, disappears with `-fa off`. [#26609](https://github.com/ggml-org/llama.cpp/issues/26609)
- **qwen4exp `ggml_abort` on SM121 (DGX Spark)** under sustained load. [#27780](https://github.com/ggml-org/llama.cpp/issues/27780)
- **MTP/DFlash draft failure on Tesla P100 (sm_60)** in Docker. [#27212](https://github.com/ggml-org/llama.cpp/issues/27212)
- **qwen4exp multi-seq split replay corrupts recurrent state** when `rs` rollback is force-enabled. [#28019](https://github.com/ggml-org/llama.cpp/issues/28019)
- **SYCL crash** in `ggml_sycl_pool_vmm::free` on Intel Arc Pro B70 — oneDNN scratchpad breaks LIFO pool order. [#28660](https://github.com/ggml-org/llama.cpp/issues/28660)

**Medium severity (correctness / wrong output):**

- **Speculative decoding (MTP / dspark) diverges from vanilla on quantized targets** under greedy sampling — bf16 targets match. [#25618](https://github.com/ggml-org/llama.cpp/issues/25618)
- **llama-spec fails at 16k context boundary** on Vulkan (gpt-oss-20b) — non-consecutive KV cache position tracking. [#26478](https://github.com/ggml-org/llama.cpp/issues/26478)
- **Vulkan flash attention lets stale K/V in freed cells** influence output (RADV, Strix Halo). [#26744](https://github.com/ggml-org/llama.cpp/issues/26744)
- **Vulkan on Intel Arc 140V outputs garbage** with GPU-resident layers; batch-dependent. [#28648](https://github.com/ggml-org/llama.cpp/issues/28648)
- **DSA / Lightning Indexer V-cache waste** confirmed and partly addressed in b10889. [#28296](https://github.com/ggml-org/llama.cpp/issues/28296) (closed)
- **</think> tag detection** matches string `"</think>"` rather than the special token. [#28679](https://github.com/ggml-org/llama.cpp/issues/28679)
- **Server cross-request KV cache reuse with different LoRA adapters** silently contaminates output. [#26207](https://github.com/ggml-org/llama.cpp/issues/26207) — PR [#28707](https://github.com/ggml-org/llama.cpp/pull/28707) addresses related `--lora-init-without-apply` semantics.
- **Speculation after an image** corrupts drafter position. Fixed by [#28715](https://github.com/ggml-org/llama.cpp/pull/28715).

**Low severity:**

- **SYCL sysman free-memory query unavailable** on Windows. [#28239](https://github.com/ggml-org/llama.cpp/issues/28239)
- **`GGML_CUDA_FA_ALL_QUANTS=ON` not default** → silent CPU fallback for q4_0/q4_1 KV cache, ~30× prefill slowdown. [#28633](https://github.com/ggml-org/llama.cpp/issues/28633)
- **Malformed tool-call JSON → HTTP 500** instead of 4xx. [#25510](https://github.com/ggml-org/llama.cpp/issues/25510)
- **Ling 3.0 chat parser** mis-classifies tool calls as reasoning. Fixed by [#28682](https://github.com/ggml-org/llama.cpp/pull/28682).
- **Invalid UTF-8 in generated text** crashes server's parser. Fixed by [#28724](https://github.com/ggml-org/llama.cpp/pull/28724).

## 6. What This Means for Application Developers

- **Qwen3.x hybrid / MTP deployments remain fragile.** Multiple open high-severity issues around MTP-driven non-determinism, CUDA lockups, and qwen4exp recurrent-state corruption. If you run Qwen3.6-35B-A3B, Qwen3.8-27B, or Qwen3.8-Flash-Next in production, pin a known-good build, prefer bf16 targets when using dspark/MTP, and keep `-fa` off if you see intermittent illegal-memory-access crashes.
- **Vulkan is now a first-class target on consumer hardware** (PowerVR, RDNA3.5, Intel Arc), but Intel Arc 140V still produces garbage under certain batch settings — keep CPU offload as a fallback on Lunar/Meteor Lake.
- **Hybrid recurrent + DSA models (Qwen3.8-Flash-Next, upcoming GLM-5.3-Flash)** are landing in tree but consume memory inefficiently in this window. The indexer V-cache removal (b10889) and incremental QSA pooling (#28699) are important VRAM / latency wins worth tracking.
- **`llama-server` API hygiene**: malformed tool calls still surface as 500s, cross-request KV cache reuse can bleed LoRA-A output into LoRA-B requests, and image-then-speculation corrupts drafter positions. Multiple small fixes landed (#28707, #28711, #28715, #28724) — upgrade to b10901+ if you rely on these flows.
- **CI / packaging**: Windows ARM64 builds are now reachable via stock `cl.exe` (no clang requirement), and the Vulkan + WebGPU CI matrix is expanding on HF jobs — expect faster regression coverage on these paths.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-11

## 1. Today's Highlights

A wave of tool-call parser fixes landed across `gemma4`, `qwen3-coder`, and `gemma3n` (PRs #18299, #18366, #18351), addressing silent breakage where valid calls were returned as empty `content` or leaked into plain text. UI-side work to expose 1M context windows (#18364, #18365) and ChatGPT Desktop / TealKit / Atomic Agent integrations signal a continued push toward agent/IDE workflows. The most operationally concerning open issue is a **file-descriptor leak in `/api/generate`** (#18344) that accumulates for the server's lifetime.

## 2. Releases & Breaking Changes

No new tagged releases in the last 24h. Notable upstream version bumps merged into the working tree:
- **llama.cpp b10864** — [PR #18317](https://github.com/ollama/ollama/pull/18317)
- **MLX** — [PR #18235](https://github.com/ollama/ollama/pull/18235)

## 3. New Model & Hardware Support

- **DeepSeek-V4.1-Flash** requested for Ollama Cloud ([#18360](https://github.com/ollama/ollama/issues/18360), 27 👍; sibling #18178 closed). Watch for upcoming cloud availability.
- **Gemma3n projector** routed off CPU to prevent silent image-embedding corruption on the CPU backend ([#18376](https://github.com/ollama/ollama/pull/18376)). CPU-only Gemma3n inference will now error rather than return wrong-image descriptions.
- **Server-side MLX imports** continue progressing toward dropping GGUF conversion in `ollama create` ([#14969](https://github.com/ollama/ollama/pull/14969)).

## 4. Performance & Optimization

- **MLX memory lifecycle rewrite** — array lifetimes are now scoped instead of pinned-and-swept, fixing the long-running retention bug where non-pinning callers' allocations accumulated until OOM ([#18327](https://github.com/ollama/ollama/pull/18327)).
- **MLX runner memory-aware loading** — checks host free memory and waits for evicted runners before loading the next MLX model ([#18345](https://github.com/ollama/ollama/pull/18345), closed/merged).
- **MLX prefix-cache snapshot eviction** — active conversation snapshots can now be evicted when the cache is over budget ([#18353](https://github.com/ollama/ollama/pull/18353)).
- **GGUF metadata unified cache** — single extracted `metadata/sha256-<hex>.json` replaces two divergent caches and unifies capability reporting ([#17858](https://github.com/ollama/ollama/pull/17858)).
- **Model-loading regression report** — GPT-OSS:120b and others reportedly slower to load since 0.23.4 ([#18373](https://github.com/ollama/ollama/issues/18373)); under investigation.

## 5. Stability & Regressions

Ranked by severity (critical → minor):

| Severity | Issue | Status / Fix |
|---|---|---|
| 🔴 Critical | **FD leak in `/api/generate`** — one descriptor retained per successful request, never released ([#18344](https://github.com/ollama/ollama/issues/18344)) | OPEN, no fix yet |
| 🔴 Critical | **Vulkan ggml runner wedge** on AMD Strix Halo UMA APU (0.24.0); single thread pegged 100% CPU, generations never complete ([#18370](https://github.com/ollama/ollama/issues/18370)) | OPEN |
| 🔴 Critical | **macOS GUI silent failure** at ~6k tokens on M4 Pro, 128k context ([#18368](https://github.com/ollama/ollama/issues/18368)) | OPEN |
| 🟠 High | **CVE backlog** — 36 vulnerabilities (1 CRITICAL, 11 HIGH) in `ollama` Go binary, reported 2026-05-07, still open ([#16033](https://github.com/ollama/ollama/issues/16033)) | OPEN, no fix yet |
| 🟠 High | **`qwen2.5-coder:3b-instruct` q2_K/q3_K_* artifacts functionally broken** — 0/15 on smoke suite where siblings score 87–100% ([#18252](https://github.com/ollama/ollama/issues/18252)) | OPEN |
| 🟠 High | **Cloud stream silent failures** — `glm-5.3:cloud` enters endless reasoning and aborts mid-stream ([#18193](https://github.com/ollama/ollama/issues/18193)) | Fixed by [#18351](https://github.com/ollama/ollama/pull/18351) |
| 🟡 Medium | **gemma4 string-placeholder collision** silently drops valid tool calls ([#18354](https://github.com/ollama/ollama/issues/18354)) | Fixed by [#18366](https://github.com/ollama/ollama/pull/18366) |
| 🟡 Medium | **qwen3-coder parser drops tool calls** when model omits opening `<tool_call>` tag ([#16686](https://github.com/ollama/ollama/issues/16686)) | OPEN |
| 🟡 Medium | **Anthropic `/v1/messages` complex schemas** → tool call emitted as literal text ([#18346](https://github.com/ollama/ollama/issues/18346)) | OPEN |
| 🟡 Medium | **gemma4 native `/api/chat`** emits 31 repeated `<unused50>` then EOF without `done` ([#18359](https://github.com/ollama/ollama/issues/18359)) | OPEN |
| 🟡 Medium | **gemma3n tool model** returns empty `tool_calls` via `/v1` despite `tools` capability ([#18357](https://github.com/ollama/ollama/issues/18357)) | OPEN |
| 🟡 Medium | **qwen2.5vl:3b JPEG-specific grammar stack collapse** on GPU only ([#18369](https://github.com/ollama/ollama/issues/18369)) | OPEN |
| 🟢 Minor | **Context slider capped at 256K** despite 1M-capable models ([#18352](https://github.com/ollama/ollama/issues/18352)) | Addressed by [#18364](https://github.com/ollama/ollama/pull/18364) |
| 🟢 Minor | **Install path mismatch** — `install.sh` creates user with `/usr/share/ollama` home on Fedora Silverblue ([#18361](https://github.com/ollama/ollama/issues/18361)) | OPEN |

## 6. What This Means for Application Developers

- **Restart `ollama serve` periodically on long-running deployments** until [#18344](https://github.com/ollama/ollama/issues/18344) is fixed — FD growth is unbounded per request.
- **Tool-call reliability is improving but uneven.** Validators should still sanity-check for the "empty content + empty tool_calls + `done_reason: stop`" pattern on gemma4 paths until [#18366](https://github.com/ollama/ollama/pull/18366) ships broadly.
- **Claude Code + Anthropic proxy users** should pin to a build with [#18351](https://github.com/ollama/ollama/pull/18351) merged to get correct error propagation instead of partial cloud responses.
- **1M-context models become first-class citizens** in the macOS GUI via [#18364](https://github.com/ollama/ollama/pull/18364); CLI users can already set arbitrary context.
- **AMD Strix Halo / Vulkan users on 0.24.0** should avoid auto-restart logic — the runner wedge requires manual restart ([#18370](https://github.com/ollama/ollama/issues/18370)).
- **New agent integrations** (ChatGPT Desktop [#18377](https://github.com/ollama/ollama/pull/18377), TealKit [#18371](https://github.com/ollama/ollama/pull/18371), Atomic Agent [#17992](https://github.com/ollama/ollama/pull/17992)) extend Ollama's footprint as a backend for local-first agent frameworks.
- **Security:** the CVE issue [#16033](https://github.com/ollama/ollama/issues/16033) has been open for 4 months — production deployments should track patched releases and consider compensating controls (network policy, container isolation) until remediated.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-11

## Today's Highlights

The v1.101 release cycle is now in `rc.2` alongside a patch-level `v1.100.1`, with the team landing several reliability fixes targeting the proxy hot path — most notably offloading spend tracking to a sidecar collector ([#40545](https://github.com/BerriAI/litellm/pull/40545)) and converting open Redis circuit-breaker events from per-request traceback storms into a single DEBUG log ([#40624](https://github.com/BerriAI/litellm/pull/40624), [#40620](https://github.com/BerriAI/litellm/pull/40620)). On the feature side, provider coverage expanded with Mistral Files/Batches plus per-page OCR batch pricing ([#40484](https://github.com/BerriAI/litellm/pull/40484)), a new Vertex DeepSeek OCR adapter ([#40509](https://github.com/BerriAI/litellm/pull/40509)), HTTP/2 for the Vertex AI Search vector store ([#40631](https://github.com/BerriAI/litellm/pull/40631)), and the ConductGuard guardrail integration ([#38143](https://github.com/BerriAI/litellm/pull/38143)).

## Releases & Breaking Changes

- **[v1.100.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.1)** — Patch release following the v1.100.0 retry-breadcrumb soak incident (see regression note below). Docker images continue to be signed via cosign.
- **[v1.101.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.2)** — Release candidate carrying the Redis circuit-breaker, sidecar spend, Mistral batches, Vertex DeepSeek OCR, and HTTP/2 changes above. No formal migration notes yet; upgrade is intended to be drop-in.
- Behavioral note: `internal_user` role no longer receives prompt bodies from `/spend/logs/ui` ([#34099](https://github.com/BerriAI/litellm/issues/34099), closed) — admins still do. If your application relies on internal users reading their own raw prompts, validate after upgrading.
- Repo hygiene: blank GitHub issues are now disabled ([#40629](https://github.com/BerriAI/litellm/pull/40629)) — bug and feature templates are mandatory.

## New Model & Hardware Support

- **Vertex DeepSeek OCR adapter** ([#40509](https://github.com/BerriAI/litellm/pull/40509)) — adds a deployable OCR codec beside the Vertex provider consumer and rejects request-owned Vertex endpoints that would otherwise leak host credentials.
- **Mistral Files / Batches** ([#40484](https://github.com/BerriAI/litellm/pull/40484)) — Mistral is now usable as a Files or Batches provider; `/v1/ocr` is accepted as a batch endpoint, with **per-page OCR batch cost tracking** rather than token-based billing.
- **HTTP/2 transport for Vertex AI Search vector store** ([#40631](https://github.com/BerriAI/litellm/pull/40631)) — `AsyncHTTPHandler`/`HTTPHandler` now accept `http2=True`, allowing Vertex AI Search vector-store calls to multiplex concurrent multi-datastore queries instead of queuing on per-request HTTP/1.1 setup.
- **ConductGuard guardrail** ([#38143](https://github.com/BerriAI/litellm/pull/38143)) — first-class pre-call policy enforcement for any provider routed through the proxy.
- **Envoy external-processor gRPC → HTTP proxy** ([#40607](https://github.com/BerriAI/litellm/pull/40607)) — follow-up to #40281 enabling Google Agent Gateway integration.

## Performance & Optimization

- **Spend tracking offloaded to a pod-local collector sidecar** ([#40545](https://github.com/BerriAI/litellm/pull/40545)) — opt-in via config. Moves `_PROXY_track_cost_callback` and `DBSpendUpdateWriter` off the request hot loop so a slow DB/Redis no longer inflates inference tail latency; py-spy confirmed these were the top CPU contributors.
- **Open Redis circuit breaker demoted to a single DEBUG log** ([#40624](https://github.com/BerriAI/litellm/pull/40624), [#40620](https://github.com/BerriAI/litellm/pull/40620)) — previously, a single Redis blip opened the breaker and the per-request ERROR traceback formatting pinned a CPU core per replica for ~60s. Now: one log line, then silent cache misses until recovery. Sync timeouts are also now counted as timeouts by least-busy routing.
- **Cached realtime audio tokens billed at the audio cache-read rate** ([#40627](https://github.com/BerriAI/litellm/pull/40627)) — fixes ~2× overbilling on OpenAI Realtime requests with cached audio; preserves the `cached_tokens_details` text/audio split end-to-end.
- **Router fallback from an unhealthy auto-router tier** ([#40486](https://github.com/BerriAI/litellm/pull/40486)) — singleton auto-router tiers that can't serve now fall through to a healthy default instead of returning an error; regression coverage drives real Router caches across chat, Responses, and assistants paths.

## Stability & Regressions

**High severity — open**

- **#34281 — Health checks fail hard when an upstream is offline** ([#34281](https://github.com/BerriAI/litellm/issues/34281), 12 comments). Ad-hoc home-lab hosts should be tolerated gracefully; current behavior hard-fails. *No fix PR linked yet.*
- **#27955 — `max_parallel_requests` is unreliable with the Anthropic adapter** ([#27955](https://github.com/BerriAI/litellm/issues/27955), 5 comments). The Redis counter **monotonically increases** when clients cancel streaming `/v1/messages` mid-stream; eventually every request exceeds the limit. This is a correctness bug in concurrency accounting, not a tuning problem.
- **#29764 — Anthropic `/v1/messages/count_tokens` ignores configured `api_base`** ([#29764](https://github.com/BerriAI/litellm/issues/29764)). Hardcodes `api.anthropic.com` even when `custom_llm_provider: anthropic` is set against a self-hosted vLLM Anthropic-compatible backend, so token counting routes upstream rather than locally.
- **#30079 — `/metrics` endpoint returns empty data after upgrade to 1.88.0** ([#30079](https://github.com/BerriAI/litellm/issues/30079)). A 307 redirect from the metrics scrape path silently breaks Prometheus collection; verify your dashboards on upgrade.
- **#40020 — `litellm_settings.max_budget` arms a process-local cap that never resets** ([#40020](https://github.com/BerriAI/litellm/issues/40020)). Distinct from the trailing-30-day global budget tracker (#31292); be cautious if you rely on `max_budget` for per-process enforcement.

**Medium severity — open**

- **#35691 — Spend logs record $0 for custom models not in the built-in cost map** ([#35691](https://github.com/BerriAI/litellm/issues/35691)). `cost_breakdown.total_cost` is zero even though `response.usage.estimated_cost` is correct; reconciliation against provider bills will drift.
- **#30135 — Tiered pricing fields (`*_above_200k_tokens`) are silently ignored** ([#30135](https://github.com/BerriAI/litellm/issues/30135)). Custom `model_info` pricing applies the base rate flat to all tokens; verify any cost reports against provider invoices if you use long-context models.
- **#37255 — DeepSeek V4 Pro/Flash prices are stale** ([#37255](https://github.com/BerriAI/litellm/issues/37255)). Time-of-day pricing no longer matches the provider's published rates at any hour.
- **#37039 — `chatgpt/*` non-streaming chat completions fail** ([#37039](https://github.com/BerriAI/litellm/issues/37039), 3 👍). `Unknown items in responses API response: []` regressed after 1.88.1; streaming still works. Affects ChatGPT OAuth-backed routes only.
- **#24771 — MCP OAuth2 callback redirects to a non-existent `/ui/mcp/oauth/callback`** ([#24771](https://github.com/BerriAI/litellm/issues/24771)). GitHub App-based MCP setup lands users on a 404.
- **#35563 — Reused `x-litellm-call-id` silently drops spend-log rows** ([#35563](https://github.com/BerriAI/litellm/issues/35563)). Clients that reuse the header collide on the primary key; the proxy accepts the collision and discards the row.
- **#32142 — Native MCP `/mcp` endpoint misinterprets `SERVER_ROOT_PATH` as a server name** ([#32142](https://github.com/BerriAI/litellm/issues/32142)). Path-prefixed deployments via Helm chart return 0 tools.
- **#25427 — Authentication failure from Claude Code** ([#25427](https://github.com/BerriAI/litellm/issues/25427)). Affects the documented `claude_non_anthropic_models` setup path; worth validating if you proxy Claude Code to non-Anthropic upstreams.

**Closed today (regression/hygiene wins)**

- **#16582** — `spend_log_cleanup.py` retention job silently errored in HA Kubernetes ([#16582](https://github.com/BerriAI/litellm/issues/16582)).
- **#37611** — `SharedHealthCheckManager` reloaded the entire unbounded `LiteLLM_HealthCheckTable` per cycle, producing DB storms and near-OOM with multiple workers ([#37611](https://github.com/BerriAI/litellm/issues/37611)).
- **#34099** — `internal_user` role read prompt bodies from `/spend/logs/ui` even though they shouldn't ([#34099](https://github.com/BerriAI/litellm/issues/34099)). Privacy fix; behavior change worth noting in your access-control review.
- **#33702** — Admin UI couldn't delete virtual keys referenced by `LiteLLM_JWTKeyMapping` ([#33702](https://github.com/BerriAI/litellm/issues/33702)).
- **#29491** — Anthropic streaming format dropped `input_json_delta` for `tool_use` via custom OpenAI-compatible providers ([#29491](https://github.com/BerriAI/litellm/issues/29491)).
- **#23559** — Logs-page tag filter shipped ([#23559](https://github.com/BerriAI/litellm/issues/23559)).
- **#34069** — `aws_session_tags` for Bedrock role assumption (CUR 2.0 cost attribution) shipped ([#34069](https://github.com/BerriAI/litellm/issues/34069)).

## What This Means for Application Developers

- **Audit your spend-tracking math before upgrading.** Three cost bugs converge right now: tiered pricing fields are ignored (#30135), custom-model cost maps write $0 rows (#35691), and DeepSeek V4 flat rates are stale (#37255). If you bill customers or reconcile against provider invoices, regenerate reports from raw usage tokens for the affected period — `response.usage.estimated_cost` is more trustworthy than the spend-log row in these cases.
- **Treat `max_parallel_requests` as advisory on the Anthropic adapter until #27955 ships.** If you run streaming Claude Code workloads and cancel mid-stream, you will accumulate phantom usage in Redis. Don't size capacity assuming the counter reflects real concurrent requests.
- **Verify Prometheus scraping after upgrade.** The `/metrics` 307 regression (#30079) silently empties dashboards. Add an alert on `up == 0` or a synthetic scrape check before rolling forward.
- **Test the new internal-user permission boundary.** The fix for #34099 is a security improvement but a behavior change: internal users no longer see raw prompt/response bodies in their own spend logs. If your UI assumes otherwise, gate it.
- **Adopt the sidecar spend collector on Redis-dependent deployments.** PR #40545 is opt-in; for any fleet that has historically seen tail-latency spikes correlated with DB or Redis pressure, this is the single highest-leverage perf win in this digest.
- **Pinning strategy.** `v1.100.1` is the conservative target this week; `v1.101.0-rc.2` is reasonable for non-production if you specifically want the sidecar spend, HTTP/2 vertex search, or ConductGuard features and can soak-test. Avoid mid-stream-cancel workloads on any Anthropic-adapter build until #27955 is fixed.
- **ChatGPT OAuth users on `chatgpt/*`:** pin to a pre-1.88.1 release or only use streaming until #37039 is resolved.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-11

## 1. Today's Highlights

The team shipped a concentrated wave of Studio reliability PRs — three stacked changes from `@danielhanchen` make `unsloth studio update` skip work when evidence holds, rebuild only stale transformers sidecars, and tolerate unreachable PyPI with `UV_OFFLINE` set ([#10649](https://github.com/unslothai/unsloth/pull/10649), [#10650](https://github.com/unslothai/unsloth/pull/10650), [#10651](https://github.com/unslothai/unsloth/pull/10651)). On the training side, an experimental PR reports **1.28× faster Qwen3.5-9B LoRA steps on a single B200** via 8 targeted changes to `unsloth-cli.py` ([#10744](https://github.com/unslothai/unsloth/pull/10744)). Bug triage closed two notable Studio regressions: silent output corruption from `GGML_CUDA_P2P=1` on non-NVLink GPUs and a DGX Spark "no GPU after update" report ([#10613](https://github.com/unslothai/unsloth/issues/10613), [#10691](https://github.com/unslothai/unsloth/issues/10691)).

## 2. Releases & Breaking Changes

No releases published in the last 24 hours. No declared breaking changes in merged PRs.

## 3. New Model & Hardware Support

- **AMD RDNA 2 refresh GPUs now recognized** — `RX 6950 XT` (Navi 21), `RX 6850M XT` (Navi 22), and `RX 6550M` (Navi 24) were falling through to CPU torch when the marketing name was the only arch source (e.g. Windows without `rocminfo`). PR [#10746](https://github.com/unslothai/unsloth/pull/10746) extends the AMD name → gfx table.
- **Qwen3.5-9B LoRA on Blackwell** — performance characterization and acceleration work in [PR #10744](https://github.com/unslothai/unsloth/pull/10744).
- **MLX MoE on Apple Silicon** — optional gate/up fusion and recurrent decode fusion integrated into Studio, with adapter-scoped fusion that restores the base model after generation ([PR #10733](https://github.com/unslothai/unsloth/pull/10733)).
- **Ollama-managed models exposed via Studio API** — previously installed-but-unlisted models are now addressable by name ([PR #10763](https://github.com/unslothai/unsloth/pull/10763)).

## 4. Performance & Optimization

- **Qwen3.5-9B LoRA SFT on 1× B200: 1.28× faster step** from 8 changes spanning kernel dispatch, packing, and dispatch ordering in `unsloth-cli.py`. Marked experimental; discussion invited ([PR #10744](https://github.com/unslothai/unsloth/pull/10744)).
- **Live PyTorch streams for bitsandbytes** — replace cached stream pointers with the current accelerator stream for direct bnb dequantize and GEMV/GEMM calls, addressing the cached-stream discrepancy in [#10563](https://github.com/unslothai/unsloth/issues/10563) ([PR #10745](https://github.com/unslothai/unsloth/pull/10745)).
- **MLX MoE gate/up fusion + recurrent decode fusion** in Studio, with base-model packing held from load to unload rather than repacking per request ([PR #10733](https://github.com/unslothai/unsloth/pull/10733)).
- **Reasoning-window pagination for long chains** — bounded pages for long reasoning without the broader streaming-render rewrite ([PR #10717](https://github.com/unslothai/unsloth/pull/10717), follow-up to validated direction in #9477).
- **Agent startup no longer blocks on catalog scans** — new resident-model endpoint avoids 30 s HTTP deadline failures when local/media discovery is slow ([PR #10728](https://github.com/unslothai/unsloth/pull/10728)).
- **Studio update dependency pass is incremental** — each step's evidence is recorded so unchanged steps are skipped; the pass no longer forces full sidecar rebuilds ([PR #10649](https://github.com/unslothai/unsloth/pull/10649), [#10650](https://github.com/unslothai/unsloth/pull/10650)).

## 5. Stability & Regressions

Ranked by impact; closed items resolved in the same window.

- **🔴 High — Context reprocessed slowly after every tool call** (open). Users see multi-minute waits after each tool call once context exceeds ~30k tokens; recent Studio update suspected as a regression. *No fix PR yet.* [#10698](https://github.com/unslothai/unsloth/issues/10698)
- **🔴 High — Long Qwen3.8 GGUF chats take ~11 min full prefill after reload** (open). Reusable prompt state appears to be discarded; reproducible in Studio desktop. [#9037](https://github.com/unslothai/unsloth/issues/9037)
- **🟠 Medium — `--tensor-split` silently ignored** (open). User-reported multi-hour debugging cost; legitimate split not applied. [#10355](https://github.com/unslothai/unsloth/issues/10355)
- **🟠 Medium — Studio forces full re-dep on offline update** (open → fix). Fixed by [#10651](https://github.com/unslothai/unsloth/pull/10651): verified install preserved when PyPI is unreachable with `UV_OFFLINE`.
- **🟠 Medium — Diffusion: models unload after every generation; no LoRA** (open). Affects HDDs significantly; user-filed via Reddit relay. [#10716](https://github.com/unslothai/unsloth/issues/10716)
- **🟠 Medium — Studio CLI `unsloth start codex` fails with `stdout is not a terminal` on Windows** (open). Agent TUI never starts even in real interactive consoles. [#10699](https://github.com/unslothai/unsloth/issues/10699)
- **🟠 Medium — Data Recipe "all columns dropped" false-positive** (open). Bug template filing; reports incorrect drop warning on a valid recipe. [#10738](https://github.com/unslothai/unsloth/issues/10738)
- **🟡 Low — Windows/PowerShell installer fails on paths with spaces** (open). [#10722](https://github.com/unslothai/unsloth/issues/10722)
- **🟡 Low — CLI regenerates a new API key every Studio run** (closed, fix in [#10595](https://github.com/unslothai/unsloth/issues/10595)).
- **🟢 Resolved — `GGML_CUDA_P2P=1` corruption on non-NVLink GPUs** (RTX 6000 Ada, RTX PRO 6000, L40/L40S, L4). Closed; allowlist correction shipped. [#10613](https://github.com/unslothai/unsloth/issues/10613)
- **🟢 Resolved — DGX Spark no GPU after update**. Closed. [#10691](https://github.com/unslothai/unsloth/issues/10691)
- **🟢 Resolved — DGX Spark image generation OOM (flux.2-klein)**. Closed. [#9919](https://github.com/unslothai/unsloth/issues/9919)
- **🟢 Resolved — AMD 6950 XT not detected**. Addressed by [#10746](https://github.com/unslothai/unsloth/pull/10746). [#10468](https://github.com/unslothai/unsloth/issues/10468)
- **🟢 Resolved — PDF ingestion drops image-only pages / rejects scans**. Closed. [#10619](https://github.com/unslothai/unsloth/issues/10619)

## 6. What This Means for Application Developers

- **Offline/air-gapped Studio updates now viable.** The [#10649](https://github.com/unslothai/unsloth/pull/10649) / [#10650](https://github.com/unslothai/unsloth/pull/10650) / [#10651](https://github.com/unslothai/unsloth/pull/10651) stack means `unsloth studio update` skips already-verified steps, no longer rebuilds three transformers sidecars on every run (~60–90 s saved on Windows), and tolerates unreachable PyPI when `UV_OFFLINE` is set — practical for managed or restricted networks.
- **Tool-using agents get more durable UX.** Agentic turns survive tab close with durable streaming and explicit `interrupted` labels ([PR #10365](https://github.com/unslothai/unsloth/pull/10365)); chat history references are now restored so follow-ups don't lose context ([PR #10761](https://github.com/unslothai/unsloth/pull/10761)); tool-returned images are no longer dropped before reaching the model ([PR #10762](https://github.com/unslothai/unsloth/pull/10762)); partial research reports are preserved on failure ([PR #10759](https://github.com/unslothai/unsloth/pull/10759)); and Anthropic search errors are surfaced instead of showing `(search complete)` ([PR #10757](https://github.com/unslothai/unsloth/pull/10757)).
- **Hugging Face auth is finally respected for gated downloads** in Studio ([PR #10758](https://github.com/unslothai/unsloth/pull/10758)), and merged-model uploads honor the chosen branch/PR with atomic file delivery ([PR #10760](https://github.com/unslothai/unsloth/pull/10760)).
- **Apple Silicon and Blackwell trains are getting real attention.** MLX MoE fusion ([#10733](https://github.com/unslothai/unsloth/pull/10733)) and B200-side LoRA gains ([#10744](https://github.com/unslothai/unsloth/pull/10744)) suggest near-term speedups for local MLX stacks and single-GPU Blackwell training jobs respectively.
- **Caveats for production users.** Two open Studio regressions materially affect long-context tool-using apps ([#10698](https://github.com/unslothai/unsloth/issues/10698), [#9037](https://github.com/unslothai/unsloth/issues/9037)); if you depend on long contexts or repeated tool calls, pin to a known-good build or self-host outside Studio until fixes land. The `GGML_CUDA_P2P=1` fix is meaningful for anyone running multi-GPU boxes with L40S / RTX 6000 Ada / RTX PRO 6000 / L4 — verify you are on a build that includes the allowlist correction.
- **Requested capabilities to watch.** A rolling context-window / compaction feature ([#7472](https://github.com/unslothai/unsloth/issues/7472), 7 👍) and native RTL/BiDi rendering in the chat UI ([#8912](https://github.com/unslothai/unsloth/issues/8912)) remain open community asks that would unblock long-session and non-Latin workflows.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-11

## Today's Highlights

Today's activity is dominated by **v3.1.0** shipping with profile-aware config sync and a model-discovery cache invalidation fix, alongside three operational bugs in the Claude App gateway stack that were triaged and patched in the same window. The most consequential open issue is **#1783**, where Codex API (openai_responses) upstreams return HTTP 400 because translated Anthropic `thinking` blocks land in the Responses history with non-empty `content` arrays — two PRs (#1692, #1784) are already in flight to address it.

## Releases & Breaking Changes

- **v3.1.0** released — no breaking changes flagged.
  - feat: respect profile Entry mode when syncing the Claude App config — [#1720](https://github.com/musistudio/claude-code-router/pull/1720)
  - fix: invalidate Claude gateway model discovery cache when the profile allowlist changes — [partial release notes](https://github.com/musistudio/claude-code-router)
  - **Migration note:** none required. Users who maintain profiles with custom entry modes should verify their Claude App config syncs as expected after upgrade.

## New Model & Hardware Support

No new model architectures, backends, or quantization formats were introduced in this window.

## Performance & Optimization

No new throughput/latency numbers published. The most relevant landing is the **model-discovery cache invalidation fix in v3.1.0**: when the profile allowlist changes, the gateway now correctly drops its cached model list instead of returning stale entries. This is a correctness fix first, but it removes the workaround of restarting the daemon after every allowlist edit.

## Stability & Regressions

Ranked by user impact:

1. **[HIGH — OPEN] `#1783` — `openai_responses` upstream 400 on reasoning items**
   Routing any conversation that contains an Anthropic `thinking` block to an `openai_responses` provider (Codex API) fails with `All target providers failed`. The Responses API requires `reasoning` items to carry an empty `content` array, but the gateway currently forwards translated thinking blocks with non-empty content. Two fixes in flight: [#1692](https://github.com/musistudio/claude-code-router/pull/1692) (drop non-replayable items) and [#1784](https://github.com/musistudio/claude-code-router/pull/1784) (strip content in place). Until either lands, expect hard failures on long sessions with reasoning history.

2. **[HIGH — CLOSED via #1769] `#1768` — CCR restart wipes Claude App gateway settings**
   The quit-time `restoreClaudeAppGatewayConfig` path deleted the active `configLibrary/*.json` entry and rolled back the root config on every restart, losing user-set flags like `chatTabEnabled` and `modelPrefer1mContextWindow`. Fixed in [#1769](https://github.com/musistudio/claude-code-router/pull/1769), which makes restore surgical (undo only the keys the takeover wrote).

3. **[MEDIUM — CLOSED via #1767] `#1766` — Fusion `web_search` blind to Claude Cowork**
   Claude Desktop's Cowork tab declares its search capability as a function tool named `WebSearch` (camelCase, no separator). The matcher's `toLowerCase().replace(/[-.]/g, "_")` normalization collapsed it to `websearch`, failing all three substring checks. Fixed in [#1767](https://github.com/musistudio/claude-code-router/pull/1767) by adding a CamelCase-aware match.

4. **[LOW — OPEN] `#1782` — `ccr start --daemon` rejected as unknown option**
   Documented CLI flag `ccr start --daemon` / `ccr serve --daemon` errors with `Unknown web option: --daemon`. Fix in [#1782](https://github.com/musistudio/claude-code-router/pull/1782) adds the flag to the parser (closes long-standing #1246). Affects users following older CLI docs only.

5. **[LOW — CLOSED] `#1734` — Overview statistics cannot be reset** — pure UX gap; no implementation yet, closed as a feature request.

## What This Means for Application Developers

- **Upgrade to v3.1.0** if you rely on Claude App config sync from profiles, or if you change allowlists at runtime — the cache invalidation bug could otherwise serve stale model lists. The Claude App gateway restore regression (#1768) is fixed in this release lineage; make sure your deploy picks up #1769.
- **Avoid routing long reasoning sessions to `openai_responses` upstreams for now.** Any Anthropic-side conversation that produced `thinking` blocks will 400 against Codex-style providers until #1692 or #1784 lands. If you must support this path today, sanitize `thinking` history client-side or constrain those sessions to Anthropic-compatible providers.
- **Claude Cowork users get web search back** via #1767 — no client-side changes required; just upgrade past the merged fix.
- **Daemon flag** — `#1782` restores `ccr start --daemon`; if your orchestration or systemd units depend on that flag, watch for the merge.
- **Operational tip:** #1768's root cause was the gateway treating user-edited config as takeover artifacts. If you script CCR restarts, re-validate the active `configLibrary` entry after each cycle until you're on a build that includes #1769.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-11

## 1. Today's Highlights

The Codex integration continues to be the dominant source of churn: a cluster of open bugs (#5974, #6340, #6596, #6679, #7217, #6529, #7278, #7283) touches session-history unification, WSL/UNC filesystem quirks, the new `responses_http` transport on macOS, and DeepSeek catalog drift. On the proxy side, two surgical fixes (#7287, #7282) address sub-floor `max_tokens` rejection on the Responses path and upstream-inlined `<mm:think>` blocks leaking through Claude → Chat conversions. No new release was published in the last 24h; all changes are queued on `main`.

## 2. Releases & Breaking Changes

- **No new release in the last 24h.**
- **Provider preset renames (merged via #7183):** the domestic DashScope/百炼 presets are rebranded to **千问AI平台**, with the full Qwen family refreshed to the **3.8 generation** across all seven supported apps (Claude Code, Claude Desktop, Codex, Hermes, OpenClaw, OpenCode, Pi). Existing user-configured providers are unaffected, but the preset names in the picker will change.
- **Laonong API preset (#7245, open):** adds a unified OpenAI-SDK-compatible gateway covering 40+ models.

## 3. New Model & Hardware Support

- **DeepSeek vision enablement (#7286, open):** mirrors the official catalog so `deepseek-flash` is registered as a vision-capable model, and un-gates the legacy `deepseek-v4-flash` alias that the DeepSeek refresh script is in the process of removing. Closes the loop with issue #7283 (images being replaced by `[Unsupported Image]`).
- **DeepSeek rename follow-up (#7278, open):** calls out that the upstream `deepseek-flash` is now natively multimodal and that the old alias should be retired in presets.
- **Qwen 3.8 across the board (#7183, merged):** preset refresh for the domestic provider covering all target apps.
- **New preset: Laonong API (#7245, open)** — OpenAI-SDK gateway aggregator.

## 4. Performance & Optimization

- **Database growth bound (#6873, open):** addresses #6706 where the DB folder grew to ~22 GB (≈2.4 GB live DB × 10 full-image backups + an orphaned `.db-journal`). Caps oversized error bodies, the dedup ledger, and applies backup hygiene.
- **Session-usage syncer fix (#7281, open):** both Codex and Claude syncers previously treated an unchanged `mtime` as "no change" and skipped parsing, so accumulated usage was lost while the log kept growing. Fix reparses on content length delta regardless of mtime.
- **Dependency refresh (#7285, #6435, both open):** 53 Rust crate updates and 56 frontend updates via Dependabot; #7195 (same scope) was closed/merged.

## 5. Stability & Regressions

Ranked by user impact and recency.

| Severity | Item | Status | Notes |
|---|---|---|---|
| **High** | Claude Code **2.1.265** regression breaks Deepseek / ZAI routing (#7236) | Closed | 11 comments; recent upstream Claude Code change interacting with CC Switch routing. |
| **High** | App crash on enabling local proxy + failover; also crashes mid-use (#936) | Closed | 15 comments, longest-running thread; fix merged. |
| **High** | Codex local routing bypassed on Desktop 26.905 / CLI 0.153.x: requests skip `127.0.0.1:15721` and hit `api.openai.com` directly; third-party relays blocked because Codex forces `responses` transport (#7217) | Open | Companion to #6256 (macOS-only variant, now closed) — Windows users also affected by newer Codex transport default. |
| **High** | Codex routing on WSL: `hard_link` returns `os error 50` because the Codex auth path `\\wsl.localhost\Debian\root\.codex\auth.json` does not support safe restore (#6596, #6679) | Open | Duplicate reports; affects anyone storing auth under WSL UNC. |
| **Medium** | `unifyCodexSessionHistory` silently fails for **OpenAI Official** because the local-routing path hardcodes the `cc-switch-official` bucket (#5974); companion plain-routing report #6340 shows explicit `model_provider` blocks injection and the migration gate never fires | Open | Two complementary root-cause reports. |
| **Medium** | Memory usage anomaly in 3.20.x (#7224) | Open | No concrete numbers in the issue body. |
| **Medium** | Claude Code 3.20.2 only exposes `haiku` when pointing at qwen3.8 27B; other models error (#7221) | Open | Suggests model-list filtering or upstream compatibility issue. |
| **Medium** | Codex Responses → Chat translator emits two consecutive assistant messages when a turn contains commentary followed by `function_call` (#6529) | Open | Fix proposed in #7280 — coalesce adjacent commentary with pending tool calls. |
| **Medium** | Multi ChatGPT plan binding: quota popover shows no current plan usage (#7267) | Open | UI/dashboard issue. |
| **Low** | Codex session deletion leaves ghost entries in `~/.codex/session_index.jsonl`, breaking sidebar parse on next launch (#7272, PR open) | Open | Fix in PR #7272. |
| **Low** | Codex Desktop Voice 404s on `/v1/live` during proxy takeover (#6959) | Open | New Codex surface not yet routed by the local proxy. |
| **Low** | `glm-5.2` via CC Switch produces persistent line-break artifacts in Responses output (#6439) | Open | Long-standing. |
| **Low** | Codex failover settings overwritten by Claude settings on restart (#7204) | Closed | Fix landed via #7210 (`stop_with_restore_keep_state` no longer rewrites all-app config from the Claude row). |
| **Low** | Universal provider sync overwrites child metadata (#7212, merged) | Closed | `meta`, `created_at`, `sort_index` now preserved on Claude/Codex/Gemini children. |
| **Low** | Proxy environment switch routing fails (#7270) | Closed | |
| **Low** | HiDPI / UI scaling on Linux/WSL (#4622) | Open, stale | Awaiting maintainer attention. |

Proxy / engine-side fixes landing or proposed that address the above:

- **#7287** clamps `max_output_tokens` in the 1–15 range up to 16 before sending to strict Responses upstreams; Claude Desktop's `max_tokens=1` availability probe was making mapped providers appear unavailable under local routing.
- **#7282** splits upstream-inlined `<mm:think>` reasoning (e.g. MiniMax M3, OpenCode Go) out of plain text on the Claude → Chat path so the visible reply and the hidden reasoning block are not concatenated.
- **#7177 (closed/merged)** adds `/images/edits` proxying plus Images API follow-ups (base_url handling, streaming image-gen usage).
- **#7280** coalesces commentary+function_call items into a single assistant turn (#6529).
- **#6915** lets the unified MCP form accept OpenCode-native array-form `command` (with `environment` instead of `env`) instead of silently rejecting.

## 6. What This Means for Application Developers

- **Codex on Windows / WSL is still rough.** Two independent bugs (`hard_link` on UNC paths, session-history bucket hardcoding) mean you should not store Codex auth under `\\wsl.localhost\...` if you rely on CC Switch's restore-on-failover, and you should not expect `unifyCodexSessionHistory` to merge OpenAI-Official sessions until #5974 / #6340 land. Track PRs #7286, #7272, #7274 for the session-management side.
- **The local proxy is becoming a real protocol shim, not just a rewriter.** Sub-floor `max_tokens` clamping (#7287), Anthropic→Responses translation edge cases, Responses→Chat turn coalescing (#7280), and `responses_http` transport enforcement (#7217, #6256) are all evidence the proxy is taking on compatibility work that the upstream CLIs do not handle uniformly. If you depend on strict pass-through semantics (e.g. for token-accounting at the upstream), validate the proxy's behavior against your target model.
- **Database growth is a real operational risk.** Issue #6706 showed 22 GB local folders from error-body retention plus backup rotation. Fix #6873 is the right mitigation; until it ships, prune `~/.cc-switch/db_backup_*.db` periodically if you generate large upstream errors.
- **Preset catalogs drift faster than the app.** The DeepSeek rename (#7283, #7278, #7286) and the Qwen 3.8 / DashScope → 千问AI平台 rebrand (#7183) both show that provider metadata needs active maintenance. For self-hosted setups, pin to a known-good release rather than chasing `main`.
- **MCP and Grok Build surfaces are still maturing.** #6915 (OpenCode array-form `command`) and #6510 (Grok Build `api_backend` persistence across `responses` / `chat_completions` / `messages`) are open and worth watching if you script multi-protocol providers.

---
*Digest generated from issues/PRs updated 2026-09-10 UTC. 37 issues and 32 PRs in scope; top items by comment count and recency.*

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-11

*Source: github.com/QuantumNous/new-api*

---

## 1. Today's Highlights

No new releases shipped in the last 24h, but the issue and PR queues show heavy activity around **multi-provider protocol normalization** — particularly Gemini (`countTokens` routing, JSON-Schema unions for tool params) and Vertex AI (404 on API-Key mode, plus incoming OpenAI-compatible embeddings support). A cluster of billing/retry-logic fixes and several AI-agent-authored PRs (Claude Code, Codex, Grok, Cursor) point to a maintenance cycle focused on cross-vendor compatibility rather than feature expansion.

---

## 2. Releases & Breaking Changes

*No new releases in the last 24h — section omitted per format guidelines.*

---

## 3. New Model & Hardware Support

- **Vertex AI — OpenAI-compatible embeddings (in review).** PR #6776 adds `/v1/embeddings` support for Vertex channels, converting requests to Vertex `:predict` `instances` and returning OpenAI-shaped `data[]` with prompt token usage. [PR #6776](https://github.com/QuantumNous/new-api/pull/6776)
- **Gemini `:countTokens` (in review).** PR #7285 implements a dedicated `countTokens` path so the call is no longer routed into `generateContent` — relevant for any deployment using Gemini CLI or token-counting pre-checks. [PR #7285](https://github.com/QuantumNous/new-api/pull/7285)
- **Vertex AI API-Key mode (broken).** Issue #6250 reports that the API-Key auth mode builds the request URL without `project_id`, yielding 404 on official Vertex endpoints. **No fix PR linked yet.** [Issue #6250](https://github.com/QuantumNous/new-api/issues/6250)

---

## 4. Performance & Optimization

- **Retry logic overhaul (open discussion).** Issue #4236 — "optimize retry request logic" — has been reopened after recent activity; discussion likely touches fallback timing, circuit-breaking, and backoff. [Issue #4236](https://github.com/QuantumNous/new-api/issues/4236)
- **Channel retry priority after auto-disable (in review).** PR #7294 preserves ordering when a channel is auto-disabled mid-failover, addressing a long-standing annoyance in distributed channel pools. [PR #7294](https://github.com/QuantumNous/new-api/pull/7294)
- **Billing summary misreport (open bug).** Issue #7296 — tiered billing models produce a "动态计费 · 无匹配结果" warning in request logs even when the billed amount is correct; purely a logging/UX inefficiency, not a billing correctness issue. [Issue #7296](https://github.com/QuantumNous/new-api/issues/7296)

No concrete throughput / latency / memory numbers were published today.

---

## 5. Stability & Regressions

Ranked by severity (high → low):

1. **HIGH — Claude→OpenAI protocol conversion corrupts strict upstreams.** Issue #7307 (closed as "missing reproduction steps") reports that mid-conversation `system` messages leak through during Anthropic→OpenAI conversion, breaking upstreams that reject interleaved system roles. Closed without fix; reopens likely once repro is added. [Issue #7307](https://github.com/QuantumNous/new-api/issues/7307)
2. **HIGH — `/v1/messages` streaming tool_use `input_json_delta` truncated.** Issue #7302 (open, resubmitted with full repro from closed #7301) shows tool-call argument JSON being clipped at stream tail, producing invalid JSON for clients. **No fix PR linked.** [Issue #7302](https://github.com/QuantumNous/new-api/issues/7302) / [#7301](https://github.com/QuantumNous/new-api/issues/7301)
3. **MED — Vertex AI API-Key mode 404.** See Section 3 — blocks API-Key auth path entirely. [Issue #6250](https://github.com/QuantumNous/new-api/issues/6250)
4. **MED — SQL error when a channel is bound to many groups.** Issue #6017 — channels with a high number of associated groups trip an INSERT error. Open since July. [Issue #6017](https://github.com/QuantumNous/new-api/issues/6017)
5. **MED — Cluster deployment registration captcha error.** Issue #6840 — captcha validation fails in multi-node setups. [Issue #6840](https://github.com/QuantumNous/new-api/issues/6840)
6. **MED — Model Plaza / Performance page leaks hidden groups.** Issues #7309 / #7310 — a privacy/access-control bug where hidden groups are exposed via the public performance page. #7309 open, #7310 closed as duplicate. [Issue #7309](https://github.com/QuantumNous/new-api/issues/7309)
7. **LOW — Deploy script exec bit.** PR #7306 fixes a missing executable bit on a deploy script. [PR #7306](https://github.com/QuantumNous/new-api/pull/7306)
8. **LOW — `User.Username` max-length validation on balance edit.** Issue #1214 (closed today after long inactivity) — minor validation edge case. [Issue #1214](https://github.com/QuantumNous/new-api/issues/1214)

**Fix PRs landed or in flight:**
- PR #7305 — counts Anthropic cache tokens in consume log input totals. Closes #7290. [PR #7305](https://github.com/QuantumNous/new-api/pull/7305)
- PR #6777 — normalizes nullable / literal unions in Gemini tool schemas. [PR #6777](https://github.com/QuantumNous/new-api/pull/6777)

**Closed-as-invalid / duplicate today** (mostly agent-authored drafts that didn't follow templates): #7301, #7303, #7293, #7295, #7297, #7298, #7299, #7310. No action required.

---

## 6. What This Means for Application Developers

- **Don't rely on Vertex AI in API-Key mode yet.** Until #6250 is fixed, stick to service-account / ADC auth for Vertex channels, otherwise you'll see 404s.
- **Gemini tool-calling is being hardened.** Two PRs (#7285, #6777) materially improve Gemini protocol fidelity; if you've been avoiding Gemini because of `countTokens` or tool-schema errors, re-test on `main` after they merge.
- **Anthropic-via-OpenAI gateway is fragile.** The mid-conversation `system` leak (#7307) and `tool_use` truncation (#7302) are real — if you're proxying Claude traffic through new-api to OpenAI-shaped upstreams, pin to a known-good build and validate end-to-end tool flows before deploying to users.
- **AI-agent PRs are landing.** Almost every PR opened in this window explicitly discloses AI-assistance (Claude Code, Codex, Cursor Grok). Treat the diff, not the author; review the agent-generated tests carefully, especially billing changes.
- **Security / access-control backlog.** Hidden-group leakage (#7309) and 2FA enforcement (#7263) are unresolved; if your deployment exposes the model plaza publicly or serves multi-tenant users, gate those endpoints now rather than waiting for an upstream fix.
- **Desktop login handoff (#7308) and CXM/ranking/agent merges (#7300)** were both closed today as not-meeting-template — they're being reworked. Track for an official feature announcement rather than a quick patch.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*