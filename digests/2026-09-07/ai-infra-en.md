# AI Infrastructure Digest 2026-09-07

> Generated: 2026-09-07 13:28 UTC | Projects covered: 9

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

# Cross-Project Infrastructure Report — 2026-09-07

## 1. Ecosystem Overview

Today's activity splits cleanly along infrastructure layers: serving engines (vLLM, SGLang) are racing to enable and optimize the new wave of hybrid/linear-attention models (GLM-5.3-Flash, Kimi-K3, Qwen3.8-Flash-Next, DeepSeek-V4) while re-architecting KV cache management; local runtimes (llama.cpp, Ollama) continue their high-cadence consumer-hardware march (Vulkan, SYCL, Metal, SM120). Above them, gateways (LiteLLM, New API) are converging on `/v1/responses` compatibility and billing correctness, with New API shipping the day's only tagged release (v1.0.0-rc.34, security-focused). Two cross-cutting pain points dominate bug queues everywhere: **speculative decoding interactions** (prefix-cache loss, KV pool sizing, non-determinism) and **consumer Blackwell (SM120) instability**. Meanwhile, fine-tuning tooling (Unsloth) is blurring layer boundaries by building serving capability (llama-server-backed KV preemption) directly into Studio.

## 2. Activity Comparison

| Project | Layer | Issues (open/closed)* | PRs (surfaced)* | Release (24h) |
|---|---|---|---|---|
| **vLLM** | Serving engine | 18 / 2 (+2 trackers) | 17 | None (pending default flip #54268) |
| **SGLang** | Serving engine | 13 / 2 | ~19 | None |
| **llama.cpp** | Local runtime | 16 / 9 (auto-stale) | 25 | **10 builds (b10827–b10839)** |
| **Ollama** | Local runtime/dist. | 12 / 3 | 8 | None |
| **LiteLLM** | Gateway | 16 / 3 | 13 | None (v1.99.1 latest) |
| **Unsloth** | Fine-tuning | 20 / 2 | 13 | None |
| **Claude Code Router** | Agent CLI router | 1 / 0 | 2 | None |
| **CC Switch** | Agent CLI proxy | 9 / 6 | ~15 (repo-wide: 48 issues, 56 PRs active) | None |
| **New API** | Gateway/billing | 6 / 8 | 10 | **v1.0.0-rc.34** |

\* Counts are items surfaced in each digest, not exhaustive repo totals. llama.cpp is the release-cadence outlier (10 binaries/day vs. zero for engines); New API shows the highest issue-closure ratio, reflecting batch triage around the rc.34 security ship.

## 3. Model Support Race

| Model / Arch | vLLM | SGLang | llama.cpp | Ollama | Gateways/Other |
|---|---|---|---|---|---|
| **GLM-5.3-Flash** | Perf suite landed (FlashKDA 1.7–3.8×) while arch tracker #54062 still open | SM120 tracking (#37813) | HC tensor mapping shared for future HC models (#28451) | — | — |
| **Kimi-K3** | FlashInfer KDA kernels + ROCm reland; 1P1D disagg corruption open (#52627) | DSPARK draft-pool OOM open (#38202) | — | — | New API: kimi-k3 dynamic tools fixed (rc.34) |
| **Qwen3.8-Flash-Next** | fp8 KV on QSA path; A100 FP8 startup fails (#54318) | NVFP4 GenMHA KV **with spec-decoding validated** (#36340) | — | — | CC Switch: Qwen 3.8 preset refresh + QwenCloud rebrand |
| **DFlash2/DFLASH drafting** | K=0 skip fix; XPU 0% acceptance + YaRN prefix-cache bugs | **Beam-tree drafting landed** (#36196) | — | — | — |
| **DeepSeek-V4** | SM12x NaN/IMA bugs open | Ascend CANN 9.1 CI suites | Vulkan hyper-connection fused ops (last backend gap closed) | — | CC Switch: DSH first-class app type |
| **Spark X2.5** | — | — | **b10828, first mover** | Via llama.cpp bump b10829 (#18279) | — |
| **Gemma 4** | — | — | Vulkan perf (~4%) | — | Unsloth: base-model BOS tokenizer fix (#10312) |
| **Wan video** | — | VAE + diffusion perf CI baselines | — | — | New API: Wan3 channel; Unsloth: ROCm TI2V OOM open |
| **Cohere Compass, SarvamMLA, SAGE_ATTN, TQ1_0** | ✓ (3 unique additions) | — | TQ1_0 (Vulkan) | — | — |

**Verdict:** vLLM leads on breadth of datacenter-tier additions (three unique model/backend entries today); llama.cpp leads on time-to-local (Spark X2.5 shipped end-to-end in one day, Ollama inherits within 9 builds); SGLang leads on silicon frontier (Ascend/NPU, SM100/SM103 NVFP4). Notable pattern: engines are landing *performance* PRs for GLM-5.3-Flash before base architecture support is fully closed — enablement and optimization now overlap.

## 4. Performance Frontier

Optimization effort concentrates in five buckets, in rough order of investment:

1. **KV cache architecture (heaviest concentration).** SGLang opened a 4-part logical-page sharding series (#37614, 1/4 landed) plus an out-of-process HiCache RFC via device-memory IPC (#37372), and fixed chunked-prefill host backup (#36647). vLLM landed fp8 main-KV for QSA (#55557) and fixed fp8 startup on SM90 sparse MLA. The bug side mirrors the investment: Ollama MLX restores prefixes only to 8192-token multiples (**17–27s re-prefill tax**), llama.cpp `--kv-unified` drops pp 42–54% (#28495), vLLM EAGLE prefix loss costs **30–40% batch throughput** (#53670).
2. **Hybrid/linear-attention kernels.** vLLM's FlashKDA chunked prefill (1.7–3.8×), sparse-MLA prefill, and decode hot-path cleanups; ROCm L2/MALL hash-collision padding (**up to 13% TTFT**); llama.cpp Vulkan RMS_NORM fusion (~4% Gemma 4) and SYCL L2_NORM batching (12,480→6,240 dispatches).
3. **Quantization.** NVFP4 is now first-class on Blackwell (SGLang GenMHA with spec-decode; vLLM 8% E2E disagg gain), vLLM unified online MXFP4 quant behind one API, llama.cpp added TQ1_0 end-to-end plus a codebook-quant research track.
4. **Speculative decoding.** SGLang's DFLASH2 beam-tree drafting; llama.cpp's probabilistic drafter + rejection-sampling verifier and a deterministic-draft plugin SDK. This is simultaneously the top perf lever and the top bug source across all three runtimes.
5. **Distributed/disaggregated serving.** vLLM multi-node deadlock closed, MoE disagg all2all default flip pending (+8%); SGLang fighting PP-disagg abort-storm deadlocks (#34572) and B300 MNNVL+HiCache hangs (#38300).

## 5. Layer Positioning

- **Serving engines (vLLM, SGLang):** Own the datacenter data plane — distributed inference, disaggregated prefill/decode, spec-decode, and new-silicon enablement. Differentiation is narrowing; both spent today on the same models (GLM-5.3-Flash, Kimi-K3) and the same primitives (NVFP4 KV, DFLASH-class drafting).
- **Local runtimes (llama.cpp, Ollama):** llama.cpp is the upstream kernel/quantization substrate with extreme release cadence; Ollama is a distribution and UX layer (scheduler, MLX runner, OpenAI-compat surface) that inherits model support via bumps — today's Spark X2.5 is purely upstream-derived. Their frontier is hardware breadth (Vulkan iGPUs, SYCL Arc, gfx APUs), not throughput.
- **Gateways (LiteLLM, New API):** Own protocol translation, multi-provider routing, tenancy, and money. Today's work is `/v1/responses` lifecycle correctness (LiteLLM MCP streaming, background polling) and billing/security (New API rc.34 scoped proofs, TOTP/Passkey, audit log; two billing bugs with fixes staged).
- **Fine-tuning (Unsloth):** Training plus an increasingly real serving layer — Studio now delegates KV preemption to a patched `llama-server` (#10358) and controls stream framing (#10362). The layer boundary is deliberately dissolving.
- **Agent-CLI control plane (CCR, CC Switch):** A new micro-layer handling provider switching, session-bound auth, and capability negotiation for coding agents (CC Switch's `supported_endpoints` routing, classifier traffic splitting). Their breaking events come from *upstream client updates* (Codex 2026.9.2), not kernels.

Dependency chain worth remembering: gateways sit on engines (LiteLLM's `stream_options` leak produces vLLM 400s, #29431); Ollama and Unsloth Studio sit on llama.cpp forks.

## 6. Trend Signals

1. **`/v1/responses` is the interop battleground — and it is pre-stable everywhere.** LiteLLM (MCP streaming `AssertionError`, uncharged streams), New API (zero-billing on `response.incomplete`), Ollama (`agent_message` rejected), Unsloth (proprietary frames now opt-in). Agent developers should treat Responses-surface behavior as unreleased-candidate grade and pin versions.
2. **Speculative decoding is the highest-variance feature in the stack.** Every runtime shows spec-decode correctness bugs today (vLLM prompt_logprobs corruption; SGLang draft-pool OOM under DP attention; llama.cpp repeated-token degeneration; Ollama Blackwell crash during MTP warmup). Re-benchmark acceptance rates on your workload before enabling; Unsloth's request for an acceptance-rate metric (#10401) reflects real operator need.
3. **KV cache is being re-architected, not just tuned.** Out-of-process HiCache, logical-page sharding, server-side preemption, fp8/NVFP4 KV — expect prefix-cache semantics (and its bugs) to churn through the next quarter.
4. **Consumer Blackwell (SM120) is the least-trustworthy deployment target.** vLLM Xid 13 under sustained FP8, Ollama flash-attention warmup crash, SGLang SM120 tracking still open. Validate on exact SKUs; workarounds exist (`--enforce-eager`, kernel disable lists) but at real perf cost.
5. **Gateway money-handling needs reconciliation.** New API's double-charging/zero-billing pair and LiteLLM's missing SpendLog rows mean usage-based billing at the proxy layer is lossy today — reconcile against provider-side logs.
6. **Determinism is becoming a first-class requirement.** vLLM's batch-invariance tracker (88 comments, opt-out rollout), llama.cpp top-k tie-breaking non-determinism, and temperature-0 divergence issues all point to rising demand for reproducible inference in eval/agent pipelines.
7. **Watch list for app developers:** the `flashinfer_nvlink_one_sided` default flip in vLLM (re-benchmark before pulling nightly), SGLang's CP V1 deprecation wave (HIP/NPU/MUSA rollouts), llama.cpp's GDN normalization fix (b10829 changes outputs — recompute cached references), and Codex-class client updates as breaking events for router tooling.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-07

## Today's Highlights

A dense day of landing and triaging, with GLM-5.3-Flash perf dominating the queue (three independent PRs from a single author shipping FlashKDA prefill, sparse-MLA prefill, and decode hot-path cleanups). Kimi-K3 ROCm work resumes with a gfx950-only KDA fusion reland, and the long-running batch-invariant determinism tracker ([#27433](https://github.com/vllm-project/vllm/issues/27433)) crossed 88 comments as the project moves toward an opt-out rollout. Two notable regressions closed (multi-node Ray deadlock and OffloadingConnector with MTP/EAGLE on hybrid GDN), but several Blackwell/Ada determinism and CUDA-IMA bugs remain open.

## Releases & Breaking Changes

- **No releases in the last 24h.**
- Pending default flip: [#54268](https://github.com/vllm-project/vllm/pull/54268) proposes enabling `flashinfer_nvlink_one_sided` as the default `all2all` backend **for CUDA only** (8% E2E gain on disaggregated Qwen3.5 397B NVFP4). ROCm/XPU keep current defaults — application deployments should re-benchmark before pulling nightly.
- [#51800](https://github.com/vllm-project/vllm/pull/51800) removes Quark-specific silent online MXFP4 quantization in favor of the unified vLLM online-quant API. Custom Quark pipelines should migrate to [`features/quantization/online`](https://docs.vllm.ai/en/stable/features/quantization/online/).

## New Model & Hardware Support

- **[#54774](https://github.com/vllm-project/vllm/pull/54774) — Cohere Compass (`North-Micro-Vision-Instruct`)** added via Transformers v5 path.
- **[#55732](https://github.com/vllm-project/vllm/pull/55732) — `SAGE_ATTN` attention backend**, backed by SageAttention PR #402 (seqlens + paged KV decode).
- **[#55364](https://github.com/vllm-project/vllm/pull/55364) — FlashInfer KDA kernels** integrated for Kimi K3 (bf16 cache state, prefill + decode). Default backends unchanged.
- **[#55557](https://github.com/vllm-project/vllm/pull/55557) — Qwen3.8-Flash-Next: `fp8_e4m3` main KV cache on QSA path** (side caches and GDN state stay bf16). Scoped to `--kv-cache-dtype fp8`.
- **[#54062](https://github.com/vllm-project/vllm/issues/54062)** GLM-5.3-Flash `Glm5NextTextLinearAttention` arch still not supported on nightly — ongoing onboarding.
- **[#38425](https://github.com/vllm-project/vllm/issues/38425)** InternVL2 sub-issue for Transformers v5 meta-device loading (part of tracking [#38379](https://github.com/vllm-project/vllm/issues/38379)) — open for contribution.
- **[#55728](https://github.com/vllm-project/vllm/pull/55728)** SarvamMLA promoted to `hf` reason for Transformers v5 gating.

## Performance & Optimization

- **GLM-5.3-Flash perf suite** (4x GB300, FP8, `FLASHINFER_MLA_SPARSE`):
  - **[#55737](https://github.com/vllm-project/vllm/pull/55737) — FlashKDA chunked prefill**: 1.7–3.8× over the ~15-kernel Triton `chunk_kda_with_fused_gate` path.
  - **[#55738](https://github.com/vllm-project/vllm/pull/55738) — Dense/masked-MHA sparse prefill** for the (256, 0, 256) NoPE MLA layout; skips the NoPE K concat.
  - **[#55736](https://github.com/vllm-project/vllm/pull/55736) — Decode hot-path cleanups**: strided KDA recurrent reads, NoPE MQA query without concat, removes a duplicate router GEMM.
  - **[#55222](https://github.com/vllm-project/vllm/pull/55222)** fixes `--kv-cache-dtype fp8` startup on SM90 sparse MLA + right-sizes the indexer prefill workspace.
- **ROCm gfx11/3.5 ([#55090](https://github.com/vllm-project/vllm/pull/55090))**: weight-row-stride padding by one 128B cache line dodges L2/MALL hash collisions → **TTFT up to 13%, TPOT up to 3%**.
- **ROCm Kimi-K3 ([#54038](https://github.com/vllm-project/vllm/pull/54038))**: gfx950-only reland of fused KDA prefill kernels, **~5% throughput**.
- **MoE disagg ([#54268](https://github.com/vllm-project/vllm/pull/54268))**: `flashinfer_nvlink_one_sided` default for CUDA → 8% on Qwen3.5 397B NVFP4.
- **ROCm MLA ([#55741](https://github.com/vllm-project/vllm/pull/55741))**: BMM abstraction for MQA decode + standardized online `kv_b_proj` quantization (MXFP4/FP8 paths).
- **[#53426](https://github.com/vllm-project/vllm/pull/53426)** opt-in skip of the K=0 draft sync forward (MTP + DFlash) — addresses prefix-cache-reuse throughput regression reported in [#53670](https://github.com/vllm-project/vllm/issues/53670).

## Stability & Regressions

**High severity (correctness / production-blockers):**

- **[#55571](https://github.com/vllm-project/vllm/issues/55571)** — Xid 13 / CUDA illegal-memory access on RTX PRO 5000 (SM120) under sustained FP8 load. **Workarounds available**: `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` or `--enforce-eager`. No fix PR yet.
- **[#54521](https://github.com/vllm-project/vllm/issues/54521)** — Greedy decoding non-deterministic on `Qwen3.8-Flash-Next-FP8` when prompt length crosses `indexer_budget` (persistent_topk in prefill, SM121/GB10). Five identical requests, five different outputs.
- **[#53726](https://github.com/vllm-project/vllm/issues/53726)** — Silent CUDA IMA (exit 0) with hybrid GDN + MTP k=3 + async scheduling on RTX 3090; persists through #50021/#45100/#53613-class hardening.
- **[#49896](https://github.com/vllm-project/vllm/issues/49896)** — DeepSeek-V4 on SM12x: NaN MQA logits in `top_k_per_row_prefill` lead to uninitialized smem → illegal memory access.
- **[#46710](https://github.com/vllm-project/vllm/issues/46710)** — DeepSeekV4-Flash produces incorrect output with inline system messages after PR #46025 (template raises vs. preserves in-place paths diverge).

**Medium severity (performance / functional):**

- **[#53670](https://github.com/vllm-project/vllm/issues/53670)** — EAGLE/MTP prefix-cache drops last block → 1,648-token recompute per hit → **30–40% batch throughput loss** on prefix-reusing workloads (hybrid Qwen3.8 GDN). Mitigation PR: [#53426](https://github.com/vllm-project/vllm/pull/53426).
- **[#49210](https://github.com/vllm-project/vllm/issues/49210)** — Engine core livelock (100% CPU, no crash) with MTP + xgrammar structured outputs — regression from v0.24.0.
- **[#53488](https://github.com/vllm-project/vllm/issues/53488)** — `prompt_logprobs` silently corrupted for some requests when MTP speculative decoding is enabled (Qwen3.5 family, chunked prefill; two builds, two checkpoints).
- **[#53257](https://github.com/vllm-project/vllm/issues/53257)** — DeepSeek-V4-Flash non-deterministic at temperature=0, rate scales with concurrency (NVFP4 + DSpark draft head, B300).
- **[#54906](https://github.com/vllm-project/vllm/issues/54906)** — `thinking_token_budget` ignored by Model Runner V2 with Qwen3.8 NVFP4 + MTP.
- **[#55250](https://github.com/vllm-project/vllm/issues/55250)** — DFlash2 draft 0% acceptance with `--dtype float16` on XPU (bf16 works) — Qwen3.8-27B + incoai/Qwen3.8-27B-DFlash2.
- **[#54318](https://github.com/vllm-project/vllm/issues/54318)** — `Qwen3.8-Flash-Next-FP8` fails to start on 4× A100 (SM80 lacks `fp8e4nv`). Use SM90+ for FP8 deployment.
- **[#52627](https://github.com/vllm-project/vllm/issues/52627)** — Kimi-K3 silent output corruption in 1P1D NIXL Direct-PD disagg (MooncakeStoreConnector + NixlConnector via MultiConnector); NIXL-only PD is clean.
- **[#54094](https://github.com/vllm-project/vllm/issues/54094)** — DFlash2 + YaRN identical 1.04M prompt: zero prefix-cache reuse while target-only reuses ~1.039M tokens.

**Closed (regression resolved):**

- **[#52735](https://github.com/vllm-project/vllm/issues/52735)** (CLOSED) — OffloadingConnector stored CPU KV but served 0 hits when MTP/EAGLE speculative decoding enabled (hybrid GDN, XPU). Fix in [#55118](https://github.com/vllm-project/vllm/pull/55118) (don't pop a verified full-attn eagle prefix chunk).
- **[#52907](https://github.com/vllm-project/vllm/issues/52907)** (CLOSED) — Multi-node startup deadlock in `in_the_same_node_as()` gloo barrier at 2 nodes × TP-16 with the Ray executor (regression between `0.26.1rc1.dev78` and `0.26.1rc1.dev148`).
- **[#55369](https://github.com/vllm-project/vllm/pull/55369)** (CLOSED) — Qwen3.5 multimodal MTP `n_predict` resolved from `text_config`.

**Long-running trackers:**

- **[#27433](https://github.com/vllm-project/vllm/issues/27433)** — Batch Invariant feature/performance optimization tracker (88 comments; vLLM project board #29). Active.
- **[#38256](https://github.com/vllm-project/vllm/issues/38256)** — RFC: Incremental

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-07

## Today's Highlights

The most significant work today centers on **KV cache architecture**. An RFC was opened to move HiCache's data plane out-of-process via device-memory IPC (#37372), and the first of a four-part logical-page KV cache sharding series landed (#37614). On the model-serving side, SM100/SM103 native NVFP4 KV cache through TRT-LLM GenMHA is now usable with speculative decoding (#36340), and DFLASH2 introduced selector-based beam-tree drafting (#36196).

## Releases & Breaking Changes

*No new releases in the last 24 hours.*

However, a number of PRs signal upcoming API/behavior changes:

- **CP V1 Deprecation (3.5/5)** — #38293 deprecates legacy HIP/NPU/MUSA prefill context-parallel implementations ahead of a CP refactor. CUDA's strategy-based prefill CP, DCP, and ordinary non-CP inference remain unaffected.
- **TRT-LLM allreduce fusion accumulation** — #34603 (closed) discussed whether trtllm allreduce fusion should accumulate in fp32 like mnnvl backends.
- **GlmMoeDsa / GLM-5.2 NVFP4 + EAGLE** — illegal memory access in flashinfer_trtllm bf16 batched-GEMM is tracked in #30209; triton `nextn` default is HIP-gated after #30137.

## New Model & Hardware Support

- **GLM-5.2 on NPU** — #38250 adds GLM-5.2 inference support on 950PR/DT NPU with FP8 KV cache and MLAProlog, plus packed FP8 KV through existing quant sparse attention. #37373 (closed) added NPU arch35 support and enhanced DSV4 processing.
- **GLM-5.3-Flash on SM120** — tracking issue #37813 covers serving on 2× 96 GB RTX PRO 6000 Blackwell GPUs (TP2, W4A16 routed experts, FP8 KV, vision, native MTP).
- **DeepSeek-V4-Flash on Ascend** — CI work #37386 (plog persistence + debug-only nightly perf) and #38332 (CANN 9.1.0 nightly suites) push Ascend coverage forward.
- **LongCat 2.0 on Ascend NPU** — #30224 (closed/inactive) documents INT8 LongCat 2.0 deployment on a four-node Atlas 800I A3 cluster.
- **Diffusion / Wan 2.1 VAE** — #38182 keeps the Wan VAE decoder `channels_last` and adds a Triton NHWC nearest upsample (follow-up to #38020).
- **Transformers loader compatibility** — #38336 adds offline Transformers loader compatibility checks.

## Performance & Optimization

- **DFLASH2 tree drafting** (#36196) — extends DFLASH from single-path drafting to selector-based beam-tree drafting; the selector already produces top-K candidates and transition scores, which are now retained instead of collapsed.
- **SM100 NVFP4 GenMHA KV cache** (#36340) — packed NVFP4 K/V with speculative-decoding path validated; part of the broader NVFP4 work tracked in #29913.
- **KV-cache sharding (1/4): Logical-page placement** (#37614) — pure-arithmetic index space + new allocator; not runtime-reachable yet but lays the foundation for the next three PRs in the series.
- **HiCache write-through host backup for chunked prefills** (#36647, fixes #33714) — fixes a regression where prompts longer than `chunked_prefill_size` were never backed up to host, causing full recompute on eviction.
- **Trim MLP-sync padding from hybrid target verify** (#37587) — fixes a case where 38 requests × 6 draft tokens produced 232 physical rows on TP8 instead of 228, breaking hybrid recurrent attention reshaping.
- **Fuse static FP8 activation quantization** (#31504, proposal) — for `modelopt_fp8`/`modelopt_mixed` checkpoints (Nemotron, Llama, Qwen FP8, Qwen3.5-V2), the standalone `_static_quant_fp8` kernel before every FP8 GEMM is the target; on Qwen3.5-397B-A17B-NVFP4-V2 the overhead is significant.
- **Diffusion perf CI baseline** (#38335) — `PerformanceValidator` previously didn't check ten diffusion perf cases (`expected_e2e_ms: 0.0`); comparison against the residency-planner stack (#37918) showed `hunyuanvideo_modelopt_fp8_t2v` regressing 2.6 s → 6.9–10.1 s and `lingbot_video_moe_t2v` 6.6 s+ — baselines now locked in.
- **CPU fused scale-shift / norm kernels for diffusion** (#33452) — three new sgl-kernel ops for CPU diffusion.

## Stability & Regressions

Ranked by severity:

1. **TP2 hang with HiCache + FlashInfer MNNVL on B300** (#38300, NEW today, v0.5.18, FlashInfer 0.6.17) — breakable prefill CUDA graphs combined with HiCache and FlashInfer MNNVL cause hangs on 2× B300 in a single NVLink domain. *No fix PR yet.*
2. **DFLASH/DSPARK draft KV pool OOM under DP attention (Kimi-K3)** (#38202, NEW today) — draft KV budget uses `tp_size` instead of `attn_tp_size`. *No fix PR yet.*
3. **Disconnected streaming client → zombie request** (#36333) — regression from #34160 revert; request runs to `max_tokens` and floods `TokenizerManager` with "state was deleted" errors. *No fix PR yet.*
4. **PP disaggregated prefill hangs under abort storms** (#34572) — bootstrap queue history diverges across PP stages, leading to microbatch-selection mismatch and P2P deadlock. Author provided RCA + fix series. *Fix in progress.*
5. **GLM-5.2 FP4 + EAGLE: illegal memory access in flashinfer_trtllm bf16 batched-GEMM** (#30209) — TP4/TP8 on B200 & B300 with `nextn` draft MoE. Triton path is HIP-gated. *Workaround: switch draft backend.*
6. **Hybrid GDN model (Qwen3.6-27B NVFP4) loses ~50 GB VRAM with EAGLE/MTP** (#29857, v0.5.14) — KV pool token capacity capped far below free VRAM; disabling speculative decoding restores normal behavior. *No fix PR yet.*
7. **DeepSeekV4TokenToKVPool (SWA/HiSparse) crash on decode retract** (#33385) — `get_cpu_copy()` returns `NotImplementedError`; offload is unconditional, not gated on `--disaggregation-decode-enable-offload-kvcache`. *No fix PR yet.*
8. **`--enable-eplb + --speculative-algorithm DSPARK` crashes during draft CUDA graph capture** (#34974) — `scatter_add_` dimension mismatch from `layer_idx=None`. *No fix PR yet.*
9. **DeepSeek-V4-Flash-0731 `reasoning_effort` off-by-one** (#33185) — `high` is a no-op and vendor `max` is unreachable; persists in v0.5.16 and current `main`. *No fix PR yet.*
10. **MoE tuner writes configs the runtime never reads (int4_w4a16)** (#35252). *No fix PR yet.*
11. **DSPARK: draft worker inherits `speculative_num_draft_tokens (gamma+1)` into its attention backend** (#30555, closed/inactive) — proposer emits `gamma` rows → OOB KV reads with triton draft backend. *Was inactive; revisit before re-enabling `sglang-dspark` branch.*
12. **`/v1/responses` `created_at` type mismatch** (#34716) — float in streaming events, int in non-streaming responses. *No fix PR yet.*

The CI tracking issue #17050 continues to monitor flaky/broken tests (3 broken, 16 flaky, 953 recently fixed as of 12:25 UTC).

## What This Means for Application Developers

- **Treat B300 + HiCache + FlashInfer MNNVL combinations as suspect.** If you rely on disaggregated prefill on B300, pin FlashInfer <0.6.17 or disable MNNVL until #38300 is resolved, and validate with breakable prefill CUDA graphs explicitly.
- **NVFP4 KV cache on Blackwell is now first-class.** If you're serving SM100/SM103 with NVFP4 checkpoints and want speculative decoding, #36340 lands the validated path; you no longer need a custom attention backend for GLM-class NVFP4 workloads.
- **DFLASH2 tree drafting is the new default expectation.** Beam-tree draft acceptance will improve throughput on long-context workloads (#36196) — re-benchmark your DSPARK/EAGLE pipelines against the new selector to capture gains.
- **HiCache + chunked prefill is now correct.** Prompts longer than `chunked_prefill_size` are now actually backed up to host L3 (#36647); if you previously worked around the no-host-backup bug by tuning chunked prefill, revisit your settings.
- **Watch the CP V1 deprecation wave.** #38293 is step 3.5/5 of removing legacy prefill context-parallel on HIP/NPU/MUSA; multi-platform rollouts should test against the strategy-based prefill CP path.
- **Reasoning-effort control is currently broken on DeepSeek-V4-Flash.** Until #33185 is fixed, avoid relying on `reasoning_effort: high` or `max`; treat only `medium`/`low` as actionable.
- **Diffusion latency regressions are now caught by CI.** #38335 baselines ten diffusion perf cases, so future residency-planner-style regressions will fail CI rather than silently land.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-07

## 1. Today's Highlights

Vulkan performance work dominates the day: **RMS_NORM fusion** lands for ~4% gain on Gemma 4, **TQ1_0 quantization support** is added end-to-end, and **DeepSeek-V4 hyper-connection fused ops** close a backend gap vs. CUDA/Metal. On CUDA, a divergent-barrier fix in fp16 flash attention and a long-standing **GDN normalization bug (`max` → `rsqrt`)** ship together, while a new `--fuse-qkv` flag and **Spark2_5ForCausalLM** model support expand the conversion/runtime surface.

## 2. Releases & Breaking Changes

Ten binaries cut in 24h (b10827 → b10839). No API/CLI flag removals, but worth flagging:

- **b10830** introduces `convert --fuse-qkv`, a new flag that fuses Q/K/V projections during HF→GGUF conversion. Optional but will change GGUF tensor layout when used ([#22780](https://github.com/ggml-org/llama.cpp/pull/22780)).
- **b10829** corrects the **GDN q/k normalization** formula (`max` → `rsqrt`). Models using Gated Delta Net will produce different (correct) outputs vs. previous builds; treat as a behavior fix rather than a regression ([#28068](https://github.com/ggml-org/llama.cpp/pull/28068)).
- **b10835** fixes a divergent barrier in CUDA f16 flash attention ([#27870](https://github.com/ggml-org/llama.cpp/pull/27870)).
- **b10834** lets backend inputs avoid creating an extra graph split ([#28387](https://github.com/ggml-org/llama.cpp/pull/28387)).
- **b10839** adds type-aligned Vulkan `GET_ROWS` with CPU fallback for misaligned offsets ([#28253](https://github.com/ggml-org/llama.cpp/pull/28253)).

## 3. New Model & Hardware Support

- **Spark2_5ForCausalLM** added in **b10828** ([#27868](https://github.com/ggml-org/llama.cpp/pull/27868)).
- **Vulkan: TQ1_0** support (mm, mat-vec, mat-vec-id, dequant, get_rows) in **b10831** ([#27765](https://github.com/ggml-org/llama.cpp/pull/27765)).
- **Vulkan: DeepSeek-V4 hyper-connection fused ops** (`DSV4_HC_COMB/PRE/POST`) — last major backend without them — PR [#26578](https://github.com/ggml-org/llama.cpp/pull/26578).
- **HIP: gfx90c / gfx909** reclassified as Vega (GCN) instead of CDNA, fixing duplicate-token outputs on those APUs ([#26454](https://github.com/ggml-org/llama.cpp/pull/26454)).
- **OpenCL**: weights-pack selection for `q4_K`/`q5_K` `mul_mat` ([#28402](https://github.com/ggml-org/llama.cpp/pull/28402)).
- **Hy4-preview** conversion refactor — HC tensor mapping moved to the global map so GLM-5.3-Flash and future HC models share it ([#28451](https://github.com/ggml-org/llama.cpp/pull/28451)).
- **MoE diagnostic tool**: new `examples/moe-trace` logs per-token routed-expert choices ([#28544](https://github.com/ggml-org/llama.cpp/pull/28544)).
- **Metal**: tune D512 decode to NE2 on M5 Max ([#28534](https://github.com/ggml-org/llama.cpp/pull/28534)).

## 4. Performance & Optimization

| Area | Change | Impact |
|---|---|---|
| Vulkan RMS_NORM fusion | RMS_NORM + MUL + ADD (+ MUL), RMS_NORM + VIEW + SET_ROWS, ROPE+VIEW+SET_ROWS w/ IMROPE ([#28024](https://github.com/ggml-org/llama.cpp/pull/28024)) | **~4% on Gemma 4** |
| Vulkan MoE coopmat1 | Skip unneeded work in `MUL_MAT_ID` when expert rows < tile ([#25483](https://github.com/ggml-org/llama.cpp/pull/25483)) | Pending land |
| Vulkan unary fusion | UNARY(GELU/SIGMOID/SILU/SOFTPLUS)+MUL, matches CUDA ([#27220](https://github.com/ggml-org/llama.cpp/pull/27220)) | Pending land |
| CUDA RDNA3 MoE MMQ | Size N-tiles from typical expert width ([#24546](https://github.com/ggml-org/llama.cpp/pull/24546)) | Routed MoE prefill on RDNA3 |
| SYCL L2_NORM batching | Merge consecutive F32 L2_NORM siblings ([#28222](https://github.com/ggml-org/llama.cpp/pull/28222)) | L2_NORM dispatches 12480 → 6240 on Arc B70 |
| qwen4exp QSA decode | Gather-based sparse attention — only run on indexer-selected cells ([#28213](https://github.com/ggml-org/llama.cpp/pull/28213)) | Sparse-attn prefilter fix |
| Scheduler UMA | Ring buffer for input tensors + sanitizer hardening ([#27311](https://github.com/ggml-org/llama.cpp/pull/27311)) | Stability, not perf |
| **Speculative decoding** | Probabilistic drafter + rejection-sampling verifier for MTP / simple draft ([#27694](https://github.com/ggml-org/llama.cpp/pull/27694)) | Uses drafter's distribution instead of top-1 |
| **Deterministic draft plugin SDK** ([#26551](https://github.com/ggml-org/llama.cpp/pull/26551)) | Pluggable SPI for validation |
| **RFC: MoE mlock hot-expert pinning** ([#28545](https://github.com/ggml-org/llama.cpp/pull/28545)) | Pin hottest expert slices in mmap to avoid page-cache thrash on small-RAM boxes |
| **Quantization lab** — new per-tensor codebook quants + recipe generator ([#19941](https://github.com/ggml-org/llama.cpp/pull/19941)) | Research track |
| **CUDA FA quant control**: replace `GGML_FA_ALL_QUANTS` with `GGML_FA_QUANTS` ([#28079](https://github.com/ggml-org/llama.cpp/pull/28079)) | Smaller binaries, only viable KQ combos compiled |

## 5. Stability & Regressions

**Open — high impact**

- **[#20837](https://github.com/ggml-org/llama.cpp/issues/20837)** *(60 comments)* — Qwen3.5 9B prints XML tool calls and stops when thinking is enabled. **Chat-parser bug**, not a model bug.
- **[#23577](https://github.com/ggml-org/llama.cpp/issues/23577)** *(32 comments)* — Qwen3.6 27B + MTP emits repeated `////` after long sessions (CUDA).
- **[#26845](https://github.com/ggml-org/llama.cpp/issues/26845)** *(11)* — SYCL garbage on second prompt (Arc Pro B60).
- **[#24324](https://github.com/ggml-org/llama.cpp/issues/24324)** *(10)* — `fattn.cu:579: fatal error` on CUDA. Related: [#24440](https://github.com/ggml-org/llama.cpp/issues/24440) — same fatal error after editing system message on Gemma 4 31B + MTP + `-sm tensor`.
- **[#26382](https://github.com/ggml-org/llama.cpp/issues/26382)** *(10)* — `-ctk q5_1` without `-ctv` is rejected for V-less models (GLM-5.2).
- **[#27756](https://github.com/ggml-org/llama.cpp/issues/27756)** *(6)* — Qwen3.5-hybrid 64-layer silent instant-EOS beyond ~130k context (CUDA + CPU).
- **[#28495](https://github.com/ggml-org/llama.cpp/issues/28495)** *(6)* — `--kv-unified` + `-np 2` drops prompt-processing 42–54% from second long request onward. Cause identified: CUDA/HIP FA masks skip only `KV_max` tails, not interior all-`-INF` blocks.
- **[#28497](https://github.com/ggml-org/llama.cpp/issues/28497)** *(3)* — qwen4exp QSA indexer top-k non-determinism on CUDA (CUB `DeviceTopK` over tied scores).
- **[#27634](https://github.com/ggml-org/llama.cpp/issues/27634)** *(5)* — Vulkan on Intel iGPU/i915: kernel watchdog silently cancels queued submissions; embeddings collapse with no error.
- **[#28160](https://github.com/ggml-org/llama.cpp/issues/28160)** *(4)* — After commit `257813839`, `--lazy-mode auto` halves pp512 for qwen4exp on Vulkan/AMD iGPU.
- **[#27734](https://github.com/ggml-org/llama.cpp/issues/27734)** *(3)* — ~78% decode-throughput cliff at 131072 context on Vulkan/RDNA3; workaround `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`.
- **[#26663](https://github.com/ggml-org/llama.cpp/issues/26663)** *(3)* — RX 9070 XT (gfx1201), hidden_size ≥ 4096: Vulkan 5–7× slower than HIP, ~100 GB/s effective BW.
- **[#27217](https://github.com/ggml-org/llama.cpp/issues/27217)** *(4)* — `tool_choice:"required"` accepted but not enforced on templates with `supports_preserve_reasoning:true`.
- **[#28336](https://github.com/ggml-org/llama.cpp/issues/28336)** *(6)* — llama-server browser UI: SVG image appears missing parts (display only — copy/download is fine).
- **[#27981](https://github.com/ggml-org/llama.cpp/issues/27981)** *(8)* — llama-ui reasoning-level selection menu won't open on desktop.

**Closed (auto-stale)**

- **b8143 Vulkan/Mac x86 AMD garbage** — [#20029](https://github.com/ggml-org/llama.cpp/issues/20029) — `b8142` known good.
- **SYCL xe2 segfault** — [#25808](https://github.com/ggml-org/llama.cpp/issues/25808).
- **Vulkan split-mode row regression on hybrid AMD/Intel** since `74976e1` — [#25884](https://github.com/ggml-org/llama.cpp/issues/25884).
- **Vulkan CoopMat2 SPIR-V cap 5432 build failure** — [#25985](https://github.com/ggml-org/llama.cpp/issues/25985).
- **Flaky Vulkan unit tests on Intel Battlemage Linux** — [#25767](https://github.com/ggml-org/llama.cpp/issues/25767).
- **SYCL multi-GPU GTT mirror not in `VmRSS`** — [#22116](https://github.com/ggml-org/llama.cpp/issues/22116).
- **NaN logits at ~80K context Qwen3.6-35B-A3B** — [#23606](https://github.com/ggml-org/llama.cpp/issues/23606).
- **qwen4exp 1K+ slowdown on HIP/Strix Halo** — [#27856](https://github.com/ggml-org/llama.cpp/issues/27856).
- **Windows OpenVINO can't see GPU** — [#26393](https://github.com/ggml-org/llama.cpp/issues/26393).

## 6. What This Means for Application Developers

- **GDN outputs changed (b10829).** If you pin llama.cpp for Gated Delta Net models (e.g., Qwen-style hybrid), recompute any cached reference outputs; "rsqrt(x²+ε)" inside the root is the corrected form.
- **Qwen3.5/3.6 + MTP is still rough.** Repeated tokens ([#23577](https://github.com/ggml-org/llama.cpp/issues/23577)), instant-EOS at 130k+ ([#27756](https://github.com/ggml-org/llama.cpp/issues/27756)), and `fattn.cu:579` crashes after system-prompt edits ([#24440](https://github.com/ggml-org/llama.cpp/issues/

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-07

## Today's Highlights

The day's traffic centers on **MLX runner context handling** and **OpenAI-compatibility parity**. A series of related PRs (#18261, #18263, #18285, #18258) refines how `num_ctx` flows from the scheduler into the MLX subprocess, while the OpenAI-compatible endpoints get attention for silently dropping `num_ctx` (#16825) and Modelfile-defined `temperature` (#17744). On the upstream side, llama.cpp is bumped to b10829 primarily to land **Spark X2.5 architecture support** (#18279).

## Releases & Breaking Changes

No new releases in the last 24 hours.

## New Model & Hardware Support

- **Spark X2.5 architecture (SparkLLM/Spark-X2.5-4B / -1.7B)** — `spark2_5` is being added via a llama.cpp bump b10760 → b10829 ([PR #18279](https://github.com/ollama/ollama/pull/18279), tracks [Issue #18195](https://github.com/ollama/ollama/issues/18195)). Once merged, `ollama run SparkLLM/Spark-X2.5-4B` should move from "downloads but cannot start inference" to actually serving.
- **Hy4 (Tencent preview)** — community request for native Ollama support ([Issue #18287](https://github.com/ollama/ollama/issues/18287)); awaiting maintainer pickup.
- **Vulkan backend on AMD iGPU** — [Issue #18272](https://github.com/ollama/ollama/issues/18272) reports a regression: a model that loads cleanly on v0.32.9 fails with `Not enough memory for command submission` on v0.32.12 and later when using Vulkan on AMD iGPU (66 GB model on Winux 11.26.03.1). CUDA path is unaffected.

## Performance & Optimization

- **MLX prefix-cache restore truncation** — [Issue #18267](https://github.com/ollama/ollama/issues/18267) quantifies a fixed tax: the MLX runner always restores to a multiple of 8192 tokens below the matched prefix, causing **17–27 s re-prefill on every cold prompt** in agent workloads (Claude Code against a local model). No fix PR is open yet; the day's MLX PRs address context sizing but not cache alignment.
- **MLX runner: requested context length enforced** — [PR #18261](https://github.com/ollama/ollama/pull/18261) (now closed, superseded) plumbed the scheduler's `num_ctx` into the MLX subprocess and reported the effective limit back to `/api/ps`.
- **MLX runner: explicit vs. soft context** — [PR #18285](https://github.com/ollama/ollama/pull/18285) preserves the existing automatic `softContextLength` (used for VRAM sizing) while only honoring explicit `num_ctx` as a hard cap passed via `--ctx-size`.
- **MLX runner: Qwen static YaRN contexts** — [PR #18263](https://github.com/ollama/ollama/pull/18263) parses YaRN metadata from the active RoPE config and applies frequencies/scaling to text RoPE and multimodal M-RoPE, allowing contexts up to `factor * original_max_position_embeddings`.
- **Qwen Code context alignment** — [PR #18258](https://github.com/ollama/ollama/pull/18258) makes the Qwen Code CLI's `generationConfig.contextWindow` track Ollama's effective local context (resolved via a model-only load + `/api/ps`), instead of guessing.
- **Transfer path: finish `.tmp` that's already the whole blob** — [PR #18280](https://github.com/ollama/ollama/pull/18280) closes the remaining edge of [Issue #15320](https://github.com/ollama/ollama/issues/15320) so a `.tmp` that already equals the expected size is promoted to its final blob path instead of re-requested.

## Stability & Regressions

**High severity (crashes / data-plane failures)**

- **Blackwell sm_120 flash-attention crash** — [Issue #18276](https://github.com/ollama/ollama/issues/18276): `ollama run qwen3-coder:30b` exits with `0xc0000409` (`CUDA error: shared object initialization failed`) on RTX 5070 Ti Laptop after the auto-enabled flash-attention warmup. Memory fit succeeds and all 49 layers load — the failure is in the kernel init. No fix PR yet.
- **Vulkan AMD iGPU regression (since v0.32.12)** — [Issue #18272](https://github.com/ollama/ollama/issues/18272). Workaround: pin to v0.32.9 on affected systems.
- **MLX NVFP4 "Stopping..." deadlock** — [Issue #18269](https://github.com/ollama/ollama/issues/18269): `muse-glimmer:30b-mlx` (NVFP4, digest `015fa21845be`) repeatedly enters a persistent `Stopping…` state on M4 Air 32 GB, with watchdog-triggered restarts.

**Medium severity (correctness / wasted compute)**

- **gemma4 tool-call parser unparseable + degenerate loop** — [Issue #18275](https://github.com/ollama/ollama/issues/18275): `gemma4:12b`'s `BEGIN_ARG`/`END_ARG` syntax can't be repaired into JSON; repair fails and the model then loops emitting malformed `<|channel>thought` blocks to the token limit, returning HTTP 200 with no usable content. Hits agent-mode use cases (Continue.dev).
- **OpenAI-compat `/v1/responses` rejects `agent_message`** — [Issue #18286](https://github.com/ollama/ollama/issues/18286): input items of `"type": "agent_message"` return `400 invalid_request_error: unknown input item type`. Breaks Codex CLI multi-agent.
- **OpenAI-compat `/v1/responses` drops tool `namespace`** — [Issue #18284](https://github.com/ollama/ollama/issues/18284) (now closed without merge on the issue side) — namespace was folded into `name` on returned `function_call` items.

**Lower severity (UX / observability)**

- **MLX compile-cache CHECK spam on non-MLX hardware** — [Issue #18283](https://github.com/ollama/ollama/issues/18283): every `ollama` invocation on Windows without CUDA/Apple Silicon prints `ERROR ... CHECK failed: mlx_compile_cache_new_` before any output.
- **Model-name 80-char limit too short for long HF repo names** — [Issue #18274](https://github.com/ollama/ollama/issues/18274); [PR #18278](https://github.com/ollama/ollama/pull/18278) raises the model-part limit to 96 to align with HuggingFace's `repo_name` spec.
- **Modelfile `PARAMETER temperature 0` ignored on `/v1/chat/completions`** — [Issue #17744](https://github.com/ollama/ollama/issues/17744): manifest value replaced by a server-side default when the request omits `temperature`; `/api/chat` honours it.
- **`num_ctx` ignored on OpenAI-compat requests** — [Issue #16814](https://github.com/ollama/ollama/issues/16814) (closed) — [PR #16825](https://github.com/ollama/ollama/pull/16825) fixes by forwarding `num_ctx` into `options`.
- **Scheduler eviction loop on impossible contexts** — [Issue #18282](https://github.com/ollama/ollama/issues/18282) (closed) — manifests requesting e.g. `num_ctx 262144` caused the scheduler to repeatedly evict, reload, and evict again instead of erroring fast.

## What This Means for Application Developers

- **OpenAI-compat parity is being actively worked on**, but several holes remain. Today, treat `/v1/chat/completions` and `/v1/responses` as a *partial* OpenAI surface: `num_ctx` is silently ignored (fix in flight via [#16825](https://github.com/ollama/ollama/pull/16825)), Modelfile `temperature` is ignored when request omits it, `agent_message` input items are rejected, and namespaced tools lose their `namespace` on the way out. For deterministic behavior, prefer the native `/api/chat` or set request-level values explicitly.
- **Agent workloads on MLX pay a fixed ~17–27 s cost per cold prompt** because of prefix-cache truncation to multiples of 8192. If you're hitting MLX in an agent loop (Claude Code, Continue.dev, etc.), budget for it or pre-warm.
- **Local Qwen3-coder-class models on Blackwell laptops (sm_120) currently crash during warmup** when flash attention is auto-enabled. If you're targeting RTX 50-series mobile, validate on your exact model before shipping.
- **Vulkan users on AMD iGPU should pin Ollama ≤ v0.32.9** until [#18272](https://github.com/ollama/ollama/issues/18272) is resolved; CUDA path is unaffected.
- **Long-named HuggingFace models will start pulling cleanly** once [#18278](https://github.com/ollama/ollama/pull/18278) lands — useful if you curate models with verbose repo names like `hf.co/DavidAU/...`.
- **Prompt-cache support on Ollama Cloud** ([Issue #16714](https://github.com/ollama/ollama/issues/16714)) remains the most-upvoted open feature request from a paying-customer perspective; worth tracking if you're evaluating Ollama Cloud for agentic workloads.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-07

## Today's Highlights
Activity is dominated by `/v1/responses` lifecycle fixes (MCP auto-execute streaming, background polling after client disconnect, container ownership on streamed responses) and Bedrock/Anthropic bridge regressions that strip or leak provider-specific parameters. A persistent memory-leak report (#38193) remains open and several new providers (OpenCode Zen/Go, API Route, Z.AI native passthrough, Jalapeno) landed behind lightweight PRs.

## Releases & Breaking Changes
No new releases in the last 24h. v1.99.0 (referenced in #39145 for the `prompt_cache_key` fix) and v1.99.1 (referenced in #39310 for Z.AI UI rendering) are the most recent tagged versions.

## New Model & Hardware Support
- **OpenCode Zen & Go providers** with required `x-opencode-session` header ([#39549](https://github.com/BerriAI/litellm/pull/39549))
- **API Route** added as an OpenAI-compatible provider ([#40024](https://github.com/BerriAI/litellm/pull/40024))
- **Z.AI (Zhipu) native Anthropic Messages + OpenAI Responses passthrough**, preserving thinking signatures and native Responses wire semantics ([#40106](https://github.com/BerriAI/litellm/pull/40106))
- **Jalapeno Cloud** provider with chat/completions, Responses, and Messages support ([#40101](https://github.com/BerriAI/litellm/pull/40101))
- **Model registry refresh**: xAI Imagine video, Gemini Live 2.5 cards, lyria-3.5, Voyage, ChatGPT GPT-5.5/5.6, Vertex Haiku 4.5, Bedrock Mantle, Scaleway dates, `computer-use-preview` deprecation ([#31884](https://github.com/BerriAI/litellm/pull/31884))
- **DashScope/Qwen**: distinguish explicit vs. implicit cache pricing modes ([#40111](https://github.com/BerriAI/litellm/pull/40111))

## Performance & Optimization
- **Rolling model-pricing corrections** to align cost/adapter reads with provider docs (xAI, Gemini Live, Voyage, Vertex Haiku 4.5, Bedrock Mantle) ([#31884](https://github.com/BerriAI/litellm/pull/31884))
- **Background polling survives client disconnect** for `/v1/responses` (`background: true` + `polling_via_cache`) — fixes silent empty-output completions ([#40114](https://github.com/BerriAI/litellm/pull/40114))
- **Single lifecycle across MCP auto-execute rounds** — collapses two-stream emission that broke OpenAI SDK `responses.stream()` with an `AssertionError` ([#40121](https://github.com/BerriAI/litellm/pull/40121))
- **Per-request `SERVER_ROOT_PATHS`** replaces single-scalar `SERVER_ROOT_PATH`, enabling one deployment to serve multiple client-visible URL prefixes without 404s ([#35935](https://github.com/BerriAI/litellm/pull/35935))
- **OS CA store + `SSL_CERT_DIR` trust** in addition to certifi — fixes TLS for enterprise CAs installed via `update-ca-certificates` ([#40113](https://github.com/BerriAI/litellm/pull/40113))

## Stability & Regressions

**High severity**
- **Unbounded memory growth, no reclamation after OOM restart** ([#38193](https://github.com/BerriAI/litellm/issues/38193)) — WSS climbs from ~23 GiB to OOM, drops on restart, then climbs again. No fix PR linked. Production deployments should monitor RSS and restart prophylactically until resolved.
- **Concurrent first requests for an unknown end user bypass `max_end_user_budget_id`** ([#40095](https://github.com/BerriAI/litellm/issues/40095)) — race in `custom_auth_run_common_checks` path; budget enforcement is silently skipped.
- **Streaming `/v1/responses` SpendLog crashes** — `'dict' object has no attribute 'usage'` → no `LiteLLM_SpendLogs` row written, requests uncharged ([#29913](https://github.com/BerriAI/litellm/issues/29913)). Long-standing bug; no PR linked.

**Medium severity**
- **`HiddenParamsAsyncIteratorWrapper` regression** — `completed_response` not propagated, container-ownership recording skipped on streamed Responses ([#40120](https://github.com/BerriAI/litellm/issues/40120)). Same class of regression as #30210/#30213.
- **Bedrock `invoke` transform leaks LiteLLM-internal `optional_params`** into upstream body — Converse already filters them ([#30371](https://github.com/BerriAI/litellm/issues/30371)).
- **Bedrock Converse silently drops `reasoning_effort`** for Qwen3 (i.e., for any non-Anthropic / non-Nova2 / non-gpt-oss family) ([#34105](https://github.com/BerriAI/litellm/issues/34105)).
- **Anthropic `/v1/messages` → Responses bridge drops OpenAI reasoning-model prompt cache** (`encrypted_content` not carried forward, even after #37953) ([#39339](https://github.com/BerriAI/litellm/issues/39339)).
- **`cache_control_injection_points` is a no-op and triggers a deterministic Claude tool-call loop** when serving `/v1/responses` ([#29810](https://github.com/BerriAI/litellm/issues/29810)).
- **Anthropic → chat/completions bridge keeps diagnostics** on the re-merge path; fix PR #40110 open.
- **Bedrock adaptive-thinking capability lookup fails for opaque model IDs** — must resolve via `base_model`; fix PR #40109 open.
- **`stream_options` leaks into non-streaming requests → 400 from vLLM** ([#29431](https://github.com/BerriAI/litellm/issues/29431)).
- **Headroom CCR streaming conversion leaves `stream_options` after `stream=false`** → DeepSeek 400 ([#40068](https://github.com/BerriAI/litellm/issues/40068)).
- **`/v1/images/edits` with mask raises streaming-read error** ([#26552](https://github.com/BerriAI/litellm/issues/26552)).
- **MCP server (openapi spec) health check reports "unhealthy"** ([#40079](https://github.com/BerriAI/litellm/issues/40079)).

**Low severity / closed**
- MCP OAuth2 returned 500 instead of 401+WWW-Authenticate ([#29261](https://github.com/BerriAI/litellm/issues/29261)) — closed.
- Guardrail policies not persisted from config ([#29416](https://github.com/BerriAI/litellm/issues/29416)) — closed.
- MCP server `credentials.auth_value` not persisted on POST ([#29408](https://github.com/BerriAI/litellm/issues/29408)) — closed.
- `openrouter/openai/gpt-5.6-sol` missing from pricing JSON ([#40102](https://github.com/BerriAI/litellm/issues/40102)) — open, one-line registry fix.
- Internal-user `max_budget` blocks zero-cost models (ignores `skip_budget_checks`) ([#29912](https://github.com/BerriAI/litellm/issues/29912)) — open.
- Request Logs date-range filter interprets picker local time as UTC ([#39979](https://github.com/BerriAI/litellm/issues/39979)) — open.
- Virtual Key model alias cannot be edited after creation ([#28164](https://github.com/BerriAI/litellm/issues/28164)) — open.

## What This Means for Application Developers
- **Treat `/v1/responses` + MCP as pre-stable.** If you auto-execute MCP tools through the Responses surface, hold upgrades or pin a commit until #40121 and the `HiddenParamsAsyncIteratorWrapper` regression (#40120) are in a release — otherwise you risk `AssertionError` from the OpenAI SDK, broken prompt-cache carry-over (#39339), or uncharged streamed requests (#29913).
- **Budgeting on multi-tenant proxies is racy.** Concurrent first requests from a new end-user can bypass `max_end_user_budget_id` (#40095), and streamed Responses may never write to `LiteLLM_SpendLogs` (#29913). Reconcile spend against provider usage logs if you bill by token counts.
- **Watch proxy RSS.** The #38193 leak has no fix — provision external restarts and alerts, especially on long-lived deployments.
- **Bedrock routing is uneven.** If you mix Qwen3, Mantle, or other non-Anthropic Bedrock models, expect `reasoning_effort` to silently disappear (#34105) and possibly internal `optional_params` to leak into the wire body (#30371). Validate with provider-side request logging, not just LiteLLM logs.
- **New providers are first-class:** OpenCode (Zen/Go), API Route, Jalapeno, and native Z.AI passthrough all wired today. If you maintain a multi-provider gateway, this is a good window to test routing and cost tracking against them before the next tagged release.
- **Security hardening landing soon.** The `disable_env_credential_login` setting (#40116) and the broader move off the master-key-as-UI-password pattern (#29435) are worth tracking for SSO/Entra rollouts.
- **Time-zone bug in Request Logs UI** (#39979) will silently shift your audit window if you’re outside UTC — account for this in any log-driven alerting until it ships.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-07

## 1. Today's Highlights

The headline work today is in Unsloth Studio's runtime and serving layer: KV-cache preemption is being delegated to a slot-parking `llama-server` ([PR #10358](https://github.com/unslothai/unsloth/pull/10358)), and OpenAI-compatible streams now gate Studio's proprietary UI control frames behind an opt-in `X-Unsloth-Events` header ([PR #10362](https://github.com/unslothai/unsloth/pull/10362)) — both touch client compatibility. On the platform side, Apple Silicon gets a coherent stack of fixes (tokenizers pin, MLX memory pricing, `--no-torch` self-heal), while Studio gains per-account isolation for shared installs ([PR #10375](https://github.com/unslothai/unsloth/pull/10375)).

## 2. Releases & Breaking Changes

No releases in the last 24h. Note the following **behavior change in flight** that downstream OpenAI clients should be aware of:

- **OpenAI stream control frames become opt-in** ([PR #10362](https://github.com/unslothai/unsloth/pull/10362)): `tool_start`, `tool_end`, `tool_output`, `tool_args`, `tool_status`, `reasoning_summary`, and `diffusion_frame` frames on `/v1/chat/completions` SSE will no longer be visible to clients unless they send `X-Unsloth-Events: 1`. Strict schema validators that previously broke on these frames will start passing; clients that relied on parsing them must opt in.

## 3. New Model & Hardware Support

- **Gemma 4 base-model tokenizer fix** ([PR #10312](https://github.com/unslothai/unsloth/pull/10312)): Forces `add_bos_token=True` at load for E2B, E4B, 31B, and 26B-A4B Gemma 4 base families (including `-unsloth-bnb-4bit` variants). Without BOS the models degenerate into repeated text — this is required for usable base-model inference. Closes [#7903](https://github.com/unslothai/unsloth/issues/7903).
- **Apple Silicon / MLX coverage expanding** ([PR #10287](https://github.com/unslothai/unsloth/pull/10287)): The Load Model memory panel now prices MLX loads via a dedicated planner routed to Apple Silicon hosts; GGUF still uses the existing planner. Non-GGUF hosts previously got `not_gguf` and no figures.
- **AMD/ROCm fused-attention gap exposed** ([Issue #10415](https://github.com/unslothai/unsloth/issues/10415)): Wan2.2 TI2V on RX 9060 XT falls back to SDPA math, OOM-ing on a video workload that has no fused kernel available. No fix PR yet — worth tracking for any AMD video-pipeline work.
- **Intel Arc still broken at import** ([Issue #3533](https://github.com/unslothai/unsloth/issues/3533)): Long-standing bug in `unsloth_zoo/temporary_patches/gpt_oss.py:540` calling `torch.xpu.memory.mem_get_info()`, which Intel Arc does not expose. No PR yet.

## 4. Performance & Optimization

- **KV preemption moved server-side** ([PR #10358](https://github.com/unslothai/unsloth/pull/10358), stacked on [#10301](https://github.com/unslothai/unsloth/pull/10301), paired with `unslothai/llama.cpp#184` and `#190`): When the launched `llama-server` supports `--preempt-ram`, Studio stands down its own preemption so every chat can use the full context without Studio's eviction policy in the middle. Effectively trades a fixed Studio-side preemption step for a per-slot parking primitive that has to live in the server.
- **MLX memory estimation** ([PR #10287](https://github.com/unslothai/unsloth/pull/10287)): Replaces the frontend heuristic fit verdict on Apple Silicon with an actual server-side planner; context is now fit to available memory instead of guessed.
- **Speculative-decoding acceptance-rate metric requested** ([Issue #10401](https://github.com/unslothai/unsloth/issues/10401)): No way today to measure whether a draft model is worth serving before deploying it; the only signal is tokens/sec post-deploy. Targeting the acceptance rate of the draft against the target as the deciding metric.
- **Late-response dropping under cancellation** ([PR #10388](https://github.com/unslothai/unsloth/pull/10388)): Closes a mailbox race in `_direct_reader` where responses for already-released requests could be forwarded into the current request after cancel.

## 5. Stability & Regressions

Ranked by likely blast radius:

| Severity | Issue | Status |
|----------|-------|--------|
| High | [#10415](https://github.com/unslothai/unsloth/issues/10415) AMD ROCm Wan2.2 TI2V OOM, no fused attention kernel for RX 9060 XT | No fix PR |
| High | [#10389](https://github.com/unslothai/unsloth/issues/10389) qwen3.6 35B A3B MLX API request fails via both base64 and URL inputs | No fix PR |
| High | [#10341](https://github.com/unslothai/unsloth/issues/10341) "No RAM Offload" unchecked on ROCm/AMD still moves the model to RAM | No fix PR |
| High | [#7203](https://github.com/unslothai/unsloth/issues/7203) qwen3.5 9b never reaches first step; Gemma 4 26B A4B OOMs at QLoRA batch=1 on 96 GB | No fix PR |
| High | [#3533](https://github.com/unslothai/unsloth/issues/3533) Unsloth fails to import on Intel Arc B580 (torch.xpu API gap) | No fix PR |
| Medium | [#10355](https://github.com/unslothai/unsloth/issues/10355) `--tensor-split` ignored by loader | No fix PR |
| Medium | [#10385](https://github.com/unslothai/unsloth/issues/10385) `orcarouter/Qwen3.8-27B-Uncensored-MLX` tokenizer crash on macOS 27 | No fix PR |
| Medium | [#10390](https://github.com/unslothai/unsloth/issues/10390) Constant CPU usage when idle in Studio | No fix PR |
| Medium | [#10400](https://github.com/unslothai/unsloth/issues/10400) Keyless auth fails when harness sends empty bearer | No fix PR |
| Medium | [#10411](https://github.com/unslothai/unsloth/issues/10411) `RSAES-OAEP: input message length is too long` on 238-char API keys | No fix PR |
| Medium | [#10436](https://github.com/unslothai/unsloth/issues/10436) "Tell the model today's date" overrides Ollama Modelfile `SYSTEM` prompt | No fix PR |
| Medium | [#10397](https://github.com/unslothai/unsloth/issues/10397) SSH blocked at command level but allowed via Paramiko / Python libs | No fix PR |
| Medium | [#10300](https://github.com/unslothai/unsloth/issues/10300) Workspace source files (.cs/.php/.js) still not readable/writable/indexable after [#8843](https://github.com/unslothai/unsloth/issues/8843) fix | No fix PR |
| Low | [#10227](https://github.com/unslothai/unsloth/issues/10227) Custom model settings (context length, KV cache quant) ignored on auto-load via API | **Closed** (no PR linked) |
| Low | [#10428](https://github.com/unslothai/unsloth/issues/10428) Prompt queue cleared on Stop / model reload | No fix PR |
| Low | [#10425](https://github.com/unslothai/unsloth/issues/10425) Code-tool output files hidden inside collapsed tool card | No fix PR |
| Low | [#10109](https://github.com/unslothai/unsloth/issues/10109) Deep Research hardcoded to `127.0.0.1` | No fix PR |
| Low | [#10299](https://github.com/unslothai/unsloth/issues/10299) Image menu only shows Create even on ImageToImage-capable models | **Closed** |
| Low | [#9519](https://github.com/unslothai/unsloth/issues/9519) Duplicate Remote/LAN access surfaces in API and Settings | No fix PR |

Notable **fixes landing** that mitigate outstanding issues:

- [#10431](https://github.com/unslothai/unsloth/pull/10431) pins `tokenizers` to a `transformers`-compatible window on macOS arm64 to keep Train/Export importable.
- [#10409](https://github.com/unslothai/unsloth/pull/10409) stops the runtime from re-installing MLX on `--no-torch` Apple Silicon installs.
- [#10433](https://github.com/unslothai/unsloth/issues/10433) / [#10434](https://github.com/unslothai/unsloth/issues/10434) expose a real bug in the Studio installer's `_select_torchcodec_spec` (torch 2.3/2.4 get the torch-2.10 torchcodec line; cu128 has no 0.12+ even though ABI is exempt). Expect follow-up PRs.
- [#10414](https://github.com/unslothai/unsloth/pull/10414) splits the notebook validator's shell-reading logic out of the oversized [#7474](https://github.com/unslothai/unsloth/pull/7474) and states the torch↔torchcodec contract explicitly.
- [#10370](https://github.com/unslothai/unsloth/pull/10370) names the llama.cpp backend in the install log and stops labelling Windows ROCm torch as CPU — important for debugging Strix Halo / Vulkan bundles.

## 6. What This Means for Application Developers

- **Prepare for the OpenAI stream change.** Strict OpenAI clients (anything that schema-validates SSE payloads) should start passing once [#10362](https://github.com/unslothai/unsloth/pull/10362) lands. Clients that were parsing Studio's `tool_*` and `reasoning_summary` frames must send `X-Unsloth-Events: 1` to keep seeing them. This is a quiet compatibility win for third-party harnesses.
- **Gemma 4 base inference needs the upcoming tokenizer fix.** Anyone shipping non-instruct Gemma 4 (E2B/E4B/31B/26B-A4B) should pin to a build with [#10312](https://github.com/unslothai/unsloth/pull/10312) merged, or expect repetitive output.
- **AMD ROCm video / Intel Arc / Studio-on-shared-host users have real open bugs with no fix in flight yet** — [#10415](https://github.com/unslothai/unsloth/issues/10415), [#10341](https://github.com/unslothai/unsloth/issues/10341), [#3533](https://github.com/unslothai/unsloth/issues/3533), [#10397](https://github.com/unslothai/unsloth/issues/10397). If you're targeting those platforms in production, track the issues and avoid upgrading until fixes land.
- **Deep Research on remote connections is hard-capped at 16 384 tokens.** [#10254](https://github.com/unslothai/unsloth/pull/10254) lets users raise that on saved connections, but it's not yet a per-model field — worth flagging if your app chains Deep Research.
- **Studio shared installs gain per-account isolation** ([#10375](https://github.com/unslothai/unsloth/pull/10375)) and **agentic turns become durable across tab-close** ([#10365](https://github.com/unslothai/unsloth/pull/10365) + [#10406](https://github.com/unslothai/unsloth/pull/10406)). These change the deployment and UX story for multi-user Studio boxes and long-running tool loops respectively — review for any custom tooling that depends on the current shared-state model.
- **MLX memory estimation is now real, not guessed** ([#10287](https://github.com/unslothai/unsloth/pull/10287)). Apple Silicon deployments should re-check their load-time budgets once the PR lands.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-07

## Today's Highlights

A single new bug report against local OpenAI-compatible endpoints (#1765) signals a real interoperability gap with corporate/self-hosted inference servers, while two open PRs address editor-side defects and forward-compat with TypeScript 7. No releases shipped in the last 24h, so the project is in maintenance mode today rather than feature mode.

## Releases & Breaking Changes

*No releases in the last 24h.*

## New Model & Hardware Support

*No new model, backend (CUDA/ROCm/Metal/CPU), or quantization format additions reported today.*

## Performance & Optimization

*No performance or kernel work landed today.*

## Stability & Regressions

- **[Issue #1765](https://github.com/musistudio/claude-code-router/issues/1765) — [OPEN] Problem with openai API endpoint**
  Reporter (`purum-pum-pum`) describes that CCR fails against a corporate OpenAI-compatible endpoint hosting local models (Deepseek, Gemma), even though Open WebUI and raw `curl` work fine. CCR was verified working against DeepInfra, isolating the regression to the corp-local endpoint. **Severity: medium-high** — this affects enterprise users routing Claude Code through private LLM gateways, a primary CCR use case. No fix PR linked yet.

- **[PR #1763](https://github.com/musistudio/claude-code-router/pull/1763) — [OPEN] fix: provider model list not loading when editing a Claude Code provider**
  Author `diogomcd` addresses a UX-correctness bug: model list loads when *creating* a Claude Code local-agent provider, then returns empty when *editing* it. Root cause described as two combined defects. **Severity: medium** (operator-facing, not data-corrupting). Fix is in review, not yet merged.

- **[PR #1764](https://github.com/musistudio/claude-code-router/pull/1764) — [OPEN] chore(tsconfig): drop baseUrl so the configs survive TypeScript 7**
  Author `ntdatt812` notes `baseUrl` is deprecated in TS 6 and will stop functioning in TS 7. Repo currently pins `typescript@5.9.3` so CI stays quiet, but editors on newer TS toolchains surface the error. **Severity: low** — dev-tooling only, no runtime impact. PR also adds `ignoreDeprecations: "6.0"` guidance.

## What This Means for Application Developers

- **Validate your upstream endpoint before relying on CCR in production.** If you're proxying to a self-hosted OpenAI-compatible API (vLLM, LiteLLM, TGI, or in-house gateways serving Deepseek/Gemma), exercise the full request path through CCR today. Issue [#1765](https://github.com/musistudio/claude-code-router/issues/1765) indicates CCR is stricter or diverges from the spec in ways that break on at least one corp endpoint, even when `curl` succeeds — subscribe to the issue or test against [DeepInfra](https://deepinfra.com) as a known-good reference.
- **Avoid editing existing Claude Code providers until PR #1763 merges.** If you need to change model selection on a local-agent provider, recreating it is currently safer than editing.
- **Track TypeScript 7 readiness if you fork or extend CCR.** PR [#1764](https://github.com/musistudio/claude-code-router/pull/1764) is a low-risk but forward-looking cleanup; merging it now will save a noisy upgrade later for anyone running modern TS toolchains.
- **No action required for runtime behavior** — there are no breaking changes or performance shifts today.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-07

**Repo:** [farion1231/cc-switch](https://github.com/farion1231/cc-switch) · 48 issues and 56 PRs active in the last 24h

---

## 1. Today's Highlights

No release shipped in the last 24 hours; today's activity is entirely PRs and issue triage. The headline work in flight: per-provider **multi-API-key support** ([#7188](https://github.com/farion1231/cc-switch/pull/7188), superseding the closed [#7186](https://github.com/farion1231/cc-switch/pull/7186)), **GitHub Copilot managed accounts for Codex** with capability-driven Responses/Chat routing ([#7157](https://github.com/farion1231/cc-switch/pull/7157)), and a **Qwen 3.8 refresh plus DashScope→QianwenAI/QwenCloud rebrand** across all seven supported apps ([#7183](https://github.com/farion1231/cc-switch/pull/7183)). The long-running new-CLI-tool tracker ([#1855](https://github.com/farion1231/cc-switch/issues/1855), 199 comments) remains the project's busiest thread, and the widely-hit `settings.json` full-rewrite bug ([#3631](https://github.com/farion1231/cc-switch/issues/3631), 7 👍) was closed.

## 2. Releases & Breaking Changes

None in the last 24 hours. Forward-compat note: the repo pins `typescript@5.9.2`, and [#7193](https://github.com/farion1231/cc-switch/pull/7193) removes the deprecated `baseUrl` tsconfig option before TypeScript 7 breaks the build in editors running newer compilers.

## 3. New Model & Hardware Support

- **Qwen 3.8 generation** rolled into presets for Claude Code, Claude Desktop, Codex, Hermes, OpenClaw, OpenCode, and Pi; domestic DashScope (百炼) presets rebranded to **QianwenAI**, plus a QwenCloud preset ([#7183](https://github.com/farion1231/cc-switch/pull/7183)).
- **GitHub Copilot as a Codex managed-account provider**: Codex clients always hit the local Responses entrypoint; the proxy picks Responses vs. Chat Completions forwarding based on the model's `supported_endpoints` and upstream format, handling auth and response adaptation ([#7157](https://github.com/farion1231/cc-switch/pull/7157)).
- **Token Market built-in presets** for six apps — Anthropic Messages for Claude apps, native OpenAI Responses for Codex, OpenAI-compatible chat for OpenCode/OpenClaw/Hermes ([#7184](https://github.com/farion1231/cc-switch/pull/7184)).
- **DeepSeek Harness (DSH)** added as a first-class app type: `DSH_HOME`/`~/.dsh` resolution, `settings.yaml` provider writer ([#6526](https://github.com/farion1231/cc-switch/pull/6526)), plus an importer for its zstd-compressed JSONL session usage ledgers ([#6724](https://github.com/farion1231/cc-switch/pull/6724)).
- GPT-6 usage issue resolved/closed ([#7129](https://github.com/farion1231/cc-switch/issues/7129)). Still-open requests: Antigravity ([#7171](https://github.com/farion1231/cc-switch/issues/7171)), Cursor ([#2242](https://github.com/farion1231/cc-switch/issues/2242)), unified router proxy ([#7146](https://github.com/farion1231/cc-switch/issues/7146)).

## 4. Performance & Optimization

- No throughput/latency/kernel work landed. The routing-optimization item of note is the **classifier queue** ([#6602](https://github.com/farion1231/cc-switch/pull/6602)): routes Claude Code Auto Mode's pre-Bash security-classifier requests to a dedicated provider chain, enabling cross-provider traffic splitting (conversation on provider A, classifier on provider B) — complementary to same-provider `model`-field overrides (#4987/#6113).
- Known latency landmine (stale, unresolved): Claude Desktop → Aliyun Bailian hangs **~150s** on a dead IPv6 NLB address because the proxy lacks happy-eyeballs fallback ([#5096](https://github.com/farion1231/cc-switch/issues/5096)).

## 5. Stability & Regressions

Ranked by severity:

1. **Session-bricking on DeepSeek** — Codex heartbeat automation injects a `function_call_output` missing `call_id`; every subsequent request on that thread gets HTTP 400 from `api.deepseek.com/v1/responses` with no self-healing. Reproduced on v3.20.1. No fix PR yet ([#6995](https://github.com/farion1231/cc-switch/issues/6995), OPEN).
2. **Codex 2026.9.2 regression** — after the upstream update, once quota is exhausted and a relay API is switched in, model selection stops working ([#7056](https://github.com/farion1231/cc-switch/issues/7056), OPEN).
3. **Stale auth bindings in Codex sessions** — old account-era sessions keep calling `api.openai.com` → 401 after switching to a third-party provider, even with `preserveCodexOfficialAuthOnSwitch = true` ([#5672](https://github.com/farion1231/cc-switch/issues/5672), OPEN; same class as [#6966](https://github.com/farion1231/cc-switch/issues/6966)). A related recovery fix for dangling managed-account bindings has merged ([#7060](https://github.com/farion1231/cc-switch/pull/7060)).
4. **DNS override side effect** — enabling the local proxy makes `api.deepseek.com` resolve to `127.0.0.1` system-wide via DNS cache override; users report it as unexpected hijacking ([#7125](https://github.com/farion1231/cc-switch/issues/7125), OPEN).
5. **OpenCodeGo header regression since 09/06** — some requests missing `x-opencode-session` may now fail upstream ([#7088](https://github.com/farion1231/cc-switch/issues/7088), OPEN).
6. **Closed/resolved today**: `settings.json` full-rewrite wiping `enabledPlugins`/`statusLine` ([#3631](https://github.com/farion1231/cc-switch/issues/3631)); WSL Pi "no models" ([#7140](https://github.com/farion1231/cc-switch/issues/7140)); image-generation 404s through the local route ([#5429](https://github.com/farion1231/cc-switch/issues/5429), [#6745](https://github.com/farion1231/cc-switch/issues/6745)); Kimi `/responses` 400 ([#6861](https://github.com/farion1231/cc-switch/issues/6861)).
7. **Merged fixes**: `mask_url` panic on multi-byte UTF-8 at the truncation boundary ([#6908](https://github.com/farion1231/cc-switch/pull/6908)); workflow `journal.jsonl` polluting the Claude session list ([#6043](https://github.com/farion1231/cc-switch/pull/6043)); updater swallowing error details ([#6482](https://github.com/farion1231/cc-switch/pull/6482)); tests writing to the real Claude Desktop config on Windows ([#6078](https://github.com/farion1231/cc-switch/pull/6078)). Pending: opt-in Claude Code steer rectifier converting `system`→`user` on Chat Completions routes ([#7167](https://github.com/farion1231/cc-switch/pull/7167), refs #7166).

## 6. What This Means for Application Developers

- **Model provider configs are becoming key arrays, not strings.** Multi-API-key support ([#7188](https://github.com/farion1231/cc-switch/pull/7188)) adds per-key notes and single-select activation with legacy-string compatibility — if you script against CC Switch provider configs, plan for key rotation without config edits.
- **Auth lives in the session, not just the config.** After switching Codex providers, start new sessions; #7060 adds recovery for dangling bindings, but pre-switch threads can still 401 (#5672, #6966).
- **Treat upstream CLI updates as breaking events.** Codex 2026.9.2 broke model switching behind relays (#7056); pin versions in CI and re-test provider switching after every client update.
- **Avoid heartbeat automations on DeepSeek `/responses`** until #6995 is fixed — a single heartbeat trigger permanently bricks the thread.
- **The proxy is evolving from endpoint mapping to capability negotiation** (#7157's `supported_endpoints` routing, #6602's classifier queue). Don't assume raw passthrough; validate Responses-vs-Chat semantics per provider and per traffic class (conversation vs. tool calls vs. safety classifiers).
- **Audit local-proxy blast radius** on shared machines: system-wide DNS overrides (#7125), no happy-eyeballs on dual-stack upstreams (#5096, ~150s hangs), and 502s on self-signed HTTPS certs (#5042) can take down unrelated tooling.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-07

## Today's Highlights

The team shipped **v1.0.0-rc.34** with a significant security overhaul: unified OAuth (Telegram migrated), TOTP/Passkey mutual backup factors, scoped one-time proofs for sensitive ops (account deletion, password change, 2FA enrollment, channel key reveal), and a dedicated audit log. On the relay side, two billing correctness bugs landed with PRs ready — `response.incomplete` zero-billing on streaming `/v1/responses` (#7241/#7242) and image-cache double-charging (#7229/#7230) — alongside channel-mapping fixes for pass-through requests (#7249) and Gemini thinking-level normalization (#7245).

---

## Releases & Breaking Changes

- **v1.0.0-rc.34** — Account security sweep. Notable items:
  - Login and sensitive operations share a unified verification flow.
  - Registered TOTP and Passkey act as mutual backup factors.
  - System access tokens gain view/rotate/revoke plus access history.
  - Independent audit log introduced.
  - Account deletion, binding changes, password changes, Passkey/2FA enrollment, and channel-key viewing now require a **scoped, single-use proof bound to the initiating session**.
  - **Telegram login migrated to unified OAuth** — admins must register `/oauth/telegram` in the BotFather Login Widget and configure Client ID / Client Secret. Existing Telegram Login Widget configurations need migration.
- No protocol break announced for OpenAI/Anthropic/Gemini relay paths, but deployments using Telegram auth should review the OAuth migration steps before upgrading.

---

## New Model & Hardware Support

- **Alibaba Wan 3.0 all-in-one video models** — [#7240](https://github.com/QuantumNous/new-api/pull/7240) (closed via review in [#7244](https://github.com/QuantumNous/new-api/pull/7244)) added Wan3 support; [#7238](https://github.com/QuantumNous/new-api/issues/7238) was filed but marked invalid. [#4078](https://github.com/QuantumNous/new-api/pull/4078) added Wan2.7 series earlier.
- **Huawei MaaS channel** — [#7239](https://github.com/QuantumNous/new-api/pull/7239) in progress (closes the request in [#7236](https://github.com/QuantumNous/new-api/issues/7236)).
- **Rerank model classification fix** — [#7181](https://github.com/QuantumNous/new-api/pull/7181) stops misclassifying rerank models as embedding during channel test (closes [#7177](https://github.com/QuantumNous/new-api/issues/7177); relates [#5958](https://github.com/QuantumNous/new-api/issues/5958)).

---

## Performance & Optimization

- **Per-channel TTFB timeout with automatic fallback** — [#7228](https://github.com/QuantumNous/new-api/pull/7228). When an upstream sends headers but stalls before the first data chunk, requests no longer wait for the full streaming timeout; they fall back to another channel at the TTFB boundary. Concrete thresholds are per-channel configurable.
- **Channel model_mapping now applied to pass-through bodies** — [#7249](https://github.com/QuantumNous/new-api/pull/7249). Previously, pass-through mode skipped model_mapping, causing 404s on the upstream (closes [#6002](https://github.com/QuantumNous/new-api/issues/6002), [#6639](https://github.com/QuantumNous/new-api/issues/6639)).

---

## Stability & Regressions

**Open bugs with PRs in flight (high priority):**

- **Streaming `/v1/responses` zero-bills on `response.incomplete`** — [#7241](https://github.com/QuantumNous/new-api/issues/7241). Usage is discarded for terminal `incomplete`/`cancelled`/`failed` events, so the request is billed as 0. Fix in [#7242](https://github.com/QuantumNous/new-api/pull/7242). Reproduced on rc.30; related [#6904](https://github.com/QuantumNous/new-api/issues/6904), [#7059](https://github.com/QuantumNous/new-api/issues/7059), [#7066](https://github.com/QuantumNous/new-api/issues/7066).
- **Image cache double-billing** — [#7229](https://github.com/QuantumNous/new-api/issues/7229). When cached tokens include image tokens, image quota is charged twice. Fix in [#7230](https://github.com/QuantumNous/new-api/pull/7230) (deducts cached image tokens in `calculateTextQuotaSummary`).

**Closed today / resolved:**

- **Non-stream request continues upstream after client timeout, still bills** — [#7231](https://github.com/QuantumNous/new-api/issues/7231) (closed).
- **Higress gateway chunked-body parse failure** — [#7247](https://github.com/QuantumNous/new-api/issues/7247) (closed). Higress sent `Transfer-Encoding: chunked`; new-api returned 400 `invalid JSON request body`. Missing reproduction details, so likely handled on the Higress side.
- **`reasoning_text.delta` vs `reasoning_summary_text.delta` in chat→responses** — [#7114](https://github.com/QuantumNous/new-api/pull/7114). Conversion was emitting the wrong event type, breaking downstream reasoning consumers.
- **Multipart filename escaping for OpenAI image edits** — [#7246](https://github.com/QuantumNous/new-api/pull/7246) (open but small, well-scoped fix found by Codex).
- **kimi-k3 dynamic tool calling** — [#7235](https://github.com/QuantumNous/new-api/issues/7235) (closed on rc.34).
- **GPT-5.2 `system`→`developer` role rewrite** — [#2542](https://github.com/QuantumNous/new-api/issues/2542) (closed, 10 comments, 1 👍).

**Open enhancement requests worth tracking:**
- [#7234](https://github.com/QuantumNous/new-api/issues/7234) — Ship SQL upgrade scripts with every release (operational/upgrade safety).
- [#6679](https://github.com/QuantumNous/new-api/issues/6679) — Per-channel-key concurrency limit (1 👍, 3 comments).
- [#2597](https://github.com/QuantumNous/new-api/issues/2597) — OCR model support (DeepSeek OCR, PaddleOCR-VL); marked stale.
- [#7210](https://github.com/QuantumNous/new-api/issues/7210), [#7209](https://github.com/QuantumNous/new-api/issues/7209) — Rate-setting & billing pluginization (closed today).

---

## What This Means for Application Developers

- **Audit your billing telemetry if you're on rc.30 or earlier.** Two real revenue/cost bugs surfaced today: `response.incomplete` streams on `/v1/responses` are not being billed, and cached-image requests may be double-charged. Operators on rc.30 should reconcile usage before deploying rc.34; [#7242](https://github.com/QuantumNous/new-api/pull/7242) and [#7230](https://github.com/QuantumNous/new-api/pull/7230) will land in rc.35+.
- **Telegram auth admins: configure BotFather before rc.34 rollout.** Register `/oauth/telegram` in the Login Widget and provide Client ID/Secret, or the new unified OAuth flow will fail and users won't be able to log in.
- **Sensitive operations now require per-session proof.** If you automate channel-key inspection, account deletion, or 2FA enrollment, your integration will need to handle the new scoped single-use proof token mechanism — plan refactors against rc.34.
- **Pass-through requests finally respect channel `model_mapping`.** If you've been routing clients directly to upstream model names through pass-through, [#7249](https://github.com/QuantumNous/new-api/pull/7249) means name rewriting will now apply — double-check mappings to avoid surprise rewrites.
- **TTFB-aware failover is coming.** [#7228](https://github.com/QuantumNous/new-api/pull/7228) lets you set per-channel first-token timeouts and automatically fall back. This matters a lot for agent apps that chain multiple model calls where a slow cold-start on one upstream silently degrades the whole flow.
- **Huawei MaaS and Wan3 video channels are imminent.** If you're shipping into CN markets or building video pipelines, [#7239](https://github.com/QuantumNous/new-api/pull/7239) and [#7240](https://github.com/QuantumNous/new-api/pull/7240) (via [#7244](https://github.com/QuantumNous/new-api/pull/7244)) will unlock new upstream options without custom adapter code.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*