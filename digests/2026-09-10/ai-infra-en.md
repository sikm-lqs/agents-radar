# AI Infrastructure Digest 2026-09-10

> Generated: 2026-09-10 11:30 UTC | Projects covered: 9

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

# Cross-Project Infrastructure Report — 2026-09-10

## 1. Ecosystem Overview

The serving-engine duopoly (vLLM, SGLang) is in a head-to-head race on the same three fronts — Blackwell-native kernels, IPC-based weight caching, and disaggregated/multi-rank serving — with both shipping near-identical cold-start daemons in the same 24-hour window. llama.cpp continues its strategy of silicon breadth (Hexagon, MetaX, s390x, Vulkan-on-PowerVR) rather than datacenter depth, while Ollama layers UX and API-compat semantics on top and absorbs upstream parser regressions. The gateway/control-plane layer (LiteLLM, New API, CC Switch, Claude Code Router) is dominated by billing-integrity and tool-calling-protocol bugs rather than performance work. Across all layers, the dominant risk class has shifted from crashes to **silent correctness failures** — random tokens, zero-vector embeddings, non-deterministic greedy decoding, and truncated tool-call JSON.

## 2. Activity Comparison

| Project | Issues (referenced)* | PRs (referenced)* | Release status | Dominant theme |
|---|---|---|---|---|
| **vLLM** | ~26 | ~20 | No release (0.29.x line) | Blackwell kernels; GLM-5.3/Qwen3.8-Flash-Next correctness fires |
| **SGLang** | ~22 | ~13 | No release | Weight Cache Daemon; unified cache; NVFP4 regression |
| **llama.cpp** | ~15 | ~22 (11 commits merged) | Rolling (b10878–b10891) | Vulkan hardening; persistent disk cache; new backends |
| **Ollama** | ~16 | ~17 | No release (PRs queuing for next tag) | Gemma4 parser bugs; CVE backlog |
| **LiteLLM** | ~17 | ~13 | **v1.101.0-rc.2** (cosign-signed) | Spend-tracking correctness; Claude Code path |
| **Unsloth** | ~18 | ~13 | **v0.1.808-beta** | Studio infra; diffusion/ROCm perf |
| **Claude Code Router** | 3 | 7 | **v3.1.0** | Config-restore and tool-matching fixes |
| **CC Switch** | ~20 | ~17 | No release (3.20.x) | Codex/macOS routing; session management |
| **New API** | 17 new (8 closed invalid) | ~6 | No release (rc.36) | Billing/log correctness; tool-call streaming |

\* Counts reflect distinct issues/PRs surfaced in each 24h digest, not GitHub query results. Notable volume signals: vLLM's batch-invariant thread (#27433) drew 90 comments; SGLang's CUDA coredump tracker (#26340) accumulated **296 comments in 24h**; New API's invalid-issue rate (~47%) indicates AI-agent-generated report spam.

## 3. Model Support Race

| Model family | vLLM | SGLang | llama.cpp | Ollama | Gateways |
|---|---|---|---|---|---|
| **DeepSeek V4 / V4.1 (+Flash)** | ✅ Mega-mHC DeepGEMM, mHC warmup | ✅ Unified KV on AMD, FP4 Mooncake linkers | ✅ V4.1 conversion PR (#28696) | ❌ Cloud requests open (#18178) | ⚠️ LiteLLM pricing stale (#37255); CC Switch adds DeepSeek Harness |
| **Qwen3.8-Flash-Next** | ⚠️ FP8 KV RFC (~2× KV pool); greedy non-determinism open | ⚠️ H20×8 launch failure | ✅ SYCL top_k k=2048, Arc FILL fix | — | CC Switch ships DashScope presets |
| **GLM-5.3 / 5.2** | ⚠️ Multiple critical bugs; de-JITification in flight | ⚠️ NVFP4+EAGLE crash | — | ✅ 1M-context UI selectable | — |
| **Kimi-K3** | ✅ ROCm AITER KDA prefill | ⚠️ Tool-grammar bug; DSPARK+DCP crash | — | — | — |
| **Gemma4 / 3n / Granite 4.1** | — | — | ✅ Granite param-count fix | ⚠️ 5+ open parser bugs; Granite MLX added | — |
| **MiMo-V2.5-Pro, SenseNova-U1** | — | ✅ mxfp4 + DFlash on Ascend NPU; U1 tracker | — | — | — |

**Verdict:** **vLLM leads on model breadth** (DeepSeek V4.1, Nemotron VL LoRA, Cohere ASR, Mamba2 determinism, Kimi-K3 ROCm); **SGLang leads on hardware heterogeneity** (Ascend NPU with L2/L3 HiCache is now first-class, not a port); **llama.cpp is fastest to GGUF parity** on new checkpoints. Ollama trails upstream by a release cycle (DeepSeek-V4.1-Flash unactioned). Chinese model families (DeepSeek, Qwen, GLM, Kimi, MiMo, SenseNova) account for the overwhelming majority of engine integration load.

## 4. Performance Frontier

- **Cold-start / weight loading (the day's convergent innovation):** SGLang's Weight Cache Daemon cuts Qwen3-235B FP8 reload from **306–327s to <1s** via per-rank CUDA IPC (#33522); vLLM shipped the functionally equivalent Fast-Start daemon-to-daemon cache (#56047) the same window. llama.cpp attacks the adjacent problem with persistent disk prompt cache (#28092) and GPU-resident LRU for offloaded MoE experts (#27861).
- **Blackwell kernels:** vLLM integrates Mega-mHC (DeepGEMM) and proposes CUTLASS Lamport fused GEMM+AllReduce for SM100; SGLang *regressed* ~4% on DeepSeek-R1 NVFP4 decode via a `tiny_gemm` swap (#38628) — isolated-kernel wins are not translating to end-to-end wins.
- **KV-cache architecture:** SGLang's unified radix cache is converging AMD, NPU, and draft-speculative caches behind one API; vLLM's FP8 KV on the QSA path doubles effective KV pool (~2×, #54426); llama.cpp eliminates unused V-cache for indexer layers.
- **Speculative decoding — pervasive but fragile:** vLLM quantified a **1,648-token recompute / 30–40% batch throughput loss** on prefix-reusing workloads with EAGLE/MTP (#53670), plus three separate MTP correctness bugs; SGLang crashes on DCP+PD-disagg retraction; llama.cpp leaks VRAM under DSpark.
- **Determinism as a performance feature:** vLLM's batch-invariant mode (Mamba2 now bit-identical) is the busiest thread in the repo — evidence that reproducibility is now a buying criterion, not a nicety.

## 5. Layer Positioning

- **Datacenter serving engines — vLLM vs SGLang:** Direct competitors with near-feature-parity roadmaps (weight daemons, unified caches, Blackwell kernels, disaggregation). vLLM skews toward model/kernel breadth and enterprise determinism; SGLang skews toward speculative decoding, PD-disagg, and non-CUDA silicon.
- **Local runtime substrate — llama.cpp:** The portability layer everything else builds on (Ollama, Unsloth Studio both consume it). Its value is backend count, not throughput.
- **Distribution/UX — Ollama:** Increasingly a *semantic* layer — tool-call parsers, embeddings endpoints, context-window UX — which is exactly where its bug concentration now sits. Its zero-vector embeddings bug (#17878) is a platform-trust issue, not an inference issue.
- **Gateway/control plane — LiteLLM vs New API:** LiteLLM is moving up the enterprise maturity curve (cosign signing, budget webhooks, agent-identity auth); New API remains focused on multi-tenant channel operations (both are bleeding on billing telemetry accuracy).
- **Client-side routing shims — CC Switch, Claude Code Router:** Not gateways but *protocol fixers* for coding agents — system→user message conversion, header stamping, config takeover. Fragile by nature (broke within days of Claude Code 2.1.265).
- **Training entry layer — Unsloth:** Reaching down into inference (Studio, offload planner, unified KV across parallel chats), effectively building a managed local-serving stack on llama.cpp.

## 6. Trend Signals

1. **Cold-start economics are now a first-class battleground.** Two independent IPC weight-cache daemons shipped simultaneously — driven by autoscaling, PD-disaggregation, and RL rollout restarts. Watch for this becoming a table-stakes feature, then a differentiator on multi-model fleets.
2. **Silent correctness failures outrank crashes as the operational risk.** GLM-5.3 random tokens (vLLM #54300), greedy non-determinism (#54521), 200-OK zero-vector embeddings (Ollama #17878), truncated tool JSON (New API #7302). **Action:** add vector-norm checks, deterministic replay tests, and upstream-vs-gateway diffing to CI before trusting any layer.
3. **Speculative decoding is the highest-leverage, highest-fragility feature.** Every engine reported spec-dec bugs today, usually at *intersections* (MTP+structured output, DSpark+DCP, spec+prefix cache). Benchmark the combination, not the feature.
4. **Tool-calling reliability is a cross-layer systemic weakness** — engine grammars (SGLang Kimi-K3), delta encoding (New API), client parsers (Ollama Gemma4), model registration (LiteLLM gpt-6-astra). Buffer-and-validate tool-call JSON at the application layer until this stabilizes.
5. **Non-CUDA silicon is maturing unevenly.** Ascend NPU is first-class in SGLang (DFlash, L3 cache); ROCm remains second-class (silent CUDA-wheel fallback in vLLM); exotic backends accumulate in llama.cpp. Factor engine choice by accelerator roadmap, not just GPU.
6. **Supply-chain hardening reached the gateway tier** (LiteLLM cosign, Ollama CVE backlog closure, CCR unauthenticated-exposure warnings). Wire image-signature verification into admission policies now.
7. **Version pinning guidance of the day:** vLLM 0.27.x for GLM-5.3 traffic; SGLang pre-#34693 for NVFP4 decode; avoid Ollama embeddings under sustained load; New API users prefer non-streaming tool calls.

**Bottom line:** the engine layer is commoditizing fast on performance and differentiating on correctness guarantees (determinism, tool-calling fidelity); the gateway layer's moat is billing accuracy and supply-chain trust — and both layers currently have open bugs in exactly those moats.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-10

## 1. Today's Highlights

The mainline remains active on next-generation model families: GLM-5.3 Flash continues to surface loading, attention-architecture, and ROCm-sparse bugs ([#56007](https://github.com/vllm-project/vllm/issues/56007), [#54062](https://github.com/vllm-project/vllm/issues/54062), [#54300](https://github.com/vllm-project/vllm/issues/54300), [#54451](https://github.com/vllm-project/vllm/issues/54451)), while Qwen3.8-Flash-Next exposes a `persistent_topk` non-determinism in greedy decoding and structured-output regressions on `tool_choice="required"` ([#54521](https://github.com/vllm-project/vllm/issues/54521), [#55552](https://github.com/vllm-project/vllm/issues/55552)). On the kernel side, the project is pushing Blackwell-native optimization: Mega-mHC from DeepGEMM is being integrated for DSv4.1 ([#56255](https://github.com/vllm-project/vllm/pull/56255)), CUTLASS Lamport GEMM+AllReduce is proposed ([#55261](https://github.com/vllm-project/vllm/issues/55261)), and a Fast-Start daemon-to-daemon weight cache shipped ([#56047](https://github.com/vllm-project/vllm/pull/56047)). The batch-invariant mode continues to harden with Mamba2 joining prefill/decode parity ([#55627](https://github.com/vllm-project/vllm/pull/55627)).

## 2. Releases & Breaking Changes

No new releases published in the last 24 hours. A new tracking issue was opened for watermarking hardening (compatibility + quality/perf regression monitoring) following the watermarking RFC ([#53916](https://github.com/vllm-project/vllm/issues/53916)) and the implementation PR ([#54053](https://github.com/vllm-project/vllm/pull/54053)) — see [#56105](https://github.com/vllm-project/vllm/issues/56105).

## 3. New Model & Hardware Support

- **DeepSeek V4 / DSv4.1**: Mega-mHC from DeepGEMM integrated; ELF utilities added to Dockerfile ([#56255](https://github.com/vllm-project/vllm/pull/56255)). Note: temporarily drops sm_120 support until `nv_dev` rebases onto main.
- **DeepSeek V4 NVIDIA path**: mHC warmup fix for the `DeepseekV4DecoderLayer` (recognizes NVIDIA path, warms TileLang pre/fused-post/pre/post with real attention and FFN norm parameters) ([#51802](https://github.com/vllm-project/vllm/pull/51802)).
- **Nemotron VL**: LoRA support for the language-model component only — previously raised `ValueError: NemotronH_Nano_VL_V2 does not support LoRA yet` ([#56231](https://github.com/vllm-project/vllm/pull/56231)).
- **Qwen3.8-Flash-Next (FP8) KV cache on QSA path**: RFC with working patch proposing fp8_e4m3 KV cache via Triton read-side wiring; reports ~2× KV pool on a single GB10 ([#54426](https://github.com/vllm-project/vllm/issues/54426)).
- **Cohere ASR**: Fused relative-attention content-score accumulation via `torch.baddbmm` ([#55190](https://github.com/vllm-project/vllm/pull/55190)).
- **Mamba2**: Bit-identical prefill/chunked-prefill/decode under `VLLM_BATCH_INVARIANT=1` ([#55627](https://github.com/vllm-project/vllm/pull/55627)).
- **GLM-5.3 / GLM5.2 / GLM5Next**: ongoing de-JITification on MRV2 ([#55348](https://github.com/vllm-project/vllm/pull/55348)).
- **Kimi-K3 on ROCm**: AITER KDA prefill integration (BF16 fused QKV Conv1D + FlashKDA, Triton fallback retained) ([#56036](https://github.com/vllm-project/vllm/pull/56036)).
- **GLM-5.3-Flash / DeepSeek V4 on ROCm**: CSA multi-stream overlap gated by `VLLM_ROCM_DSV4_CSA_MULTI_STREAM` (default off) ([#51794](https://github.com/vllm-project/vllm/pull/51794)).
- **FlashInfer SM120 sparse MLA**: now explicitly rejects NoPE head sizes (e.g. GLM-5.3-Flash, `qk_rope_head_dim=0`), restricting head size to 576 ([#55778](https://github.com/vllm-project/vllm/pull/55778)).
- **Ling3 parser**: closed reasoning block now returned as `reasoning` in non-streaming, matching streaming and `glm47` behavior ([#55972](https://github.com/vllm-project/vllm/pull/55972)).

## 4. Performance & Optimization

- **Batch Invariant mode** — feature tracking issue with the highest comment volume today (90 comments), targeting deterministic inference per the Thinking Machines recipe ([#27433](https://github.com/vllm-project/vllm/issues/27433)). Mamba2 layers are the latest to land bit-identical prefill/decode ([#55627](https://github.com/vllm-project/vllm/pull/55627)).
- **CUTLASS Lamport fused GEMM + AllReduce (SM100/Blackwell)** — proposal to benchmark and integrate the new CUTLASS kernel into vLLM's existing GEMM-Reduction path ([#55261](https://github.com/vllm-project/vllm/issues/55261)).
- **EAGLE/MTP prefix-cache last-block drop** — measured **1,648-token recompute per hit on a hybrid Qwen3.8 GDN layout**, costing **~30–40% batch throughput** on prefix-reusing workloads with speculative decoding enabled ([#53670](https://github.com/vllm-project/vllm/issues/53670)).
- **Qwen3.6-35B-A3B-FP8 on RTX PRO 6000 Blackwell** — decode throughput much lower than expected; missing FP8 MoE config for E=256,N=256 ([#44688](https://github.com/vllm-project/vllm/issues/44688)).
- **SM90 blockwise FP8 CUTLASS** — bugfix: caller now honors leading strides when `cutlass_scaled_mm` receives aligned/padded tensor views, preventing mis-read rows / padded writes ([#56248](https://github.com/vllm-project/vllm/pull/56248)).
- **ROCm sparse prefill MQA logits** — removed redundant `-inf` fill by passing `clean_logits=False` to AITER; saves one FP32 fill per logits kernel ([#51314](https://github.com/vllm-project/vllm/pull/51314)).
- **ROCm indexer fp8 cache dtype** — resolved once at import instead of per-layer per-forward call ([#53792](https://github.com/vllm-project/vllm/pull/53792)).
- **Fast-Start Daemon-to-Daemon** — keeps loaded/quantized/TP-sharded weights in GPU memory so subsequent vLLM engines can start via CUDA IPC without re-reading checkpoints ([#56047](https://github.com/vllm-project/vllm/pull/56047)).
- **torch.compile defunctionalization** — preserves `control_deps` ordering edges when replacing `auto_functionalized` nodes, unblocking FX compilation paths ([#56213](https://github.com/vllm-project/vllm/pull/56213)).

## 5. Stability & Regressions

**Severity: critical (correctness)**
- **GLM-5.3 (GlmMoeDsa) + decode-context-parallel** — crashes on 0.28.0 and silently returns random tokens on 0.29.0 (regression from 0.27) ([#54300](https://github.com/vllm-project/vllm/issues/54300)). No fix PR yet.
- **Qwen3.8-Flash-Next FP8 greedy decoding non-deterministic** — five byte-identical requests at `temperature=0` return five different completions when context exceeds `indexer_budget` (QSA switches dense→top-k) ([#54521](https://github.com/vllm-project/vllm/issues/54521)). Root-caused to `persistent_topk` in prefill. No fix PR yet.
- **`persistent_topk` silently drops top-k candidates** when many values share a coarse histogram bin on B300/SM103 ([#51782](https://github.com/vllm-project/vllm/issues/51782)). No fix PR yet.

**Severity: high (crash / startup)**
- **GLM-5.3-Flash loading checkpoints** — `WorkerProc failed to start` from `multiproc_executor.py` on v0.29.0 with TP2/EP2 ([#56007](https://github.com/vllm-project/vllm/issues/56007), closed). No linked fix PR in the feed.
- **0.28.0 / 0.29.0 host-memory blow-up** — consumes all host memory and freezes at start; OK on 0.27.1 ([#54237](https://github.com/vllm-project/vllm/issues/54237)). No fix PR yet.
- **GLM5Next `Glm5NextTextLinearAttention` not supported** — nightly install errors at startup ([#54062](https://github.com/vllm-project/vllm/issues/54062)). No fix PR yet.
- **`custom_all_reduce` IPC handle fails** when `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True` AND DP>1 AND TP>1 (`cudaIpcGetMemHandle: invalid argument`) on 4×H200 ([#42609](https://github.com/vllm-project/vllm/issues/42609)). No fix PR yet.
- **MTP speculative + full CUDA graph capture** fails on `InputBatch.make_dummy` assert when combining `num_speculative_tokens_per_batch_size` and MTP drafter with FP8 KV cache ([#48494](https://github.com/vllm-project/vllm/issues/48494)). No fix PR yet.
- **`expandable_segments` + LM-head LoRA + batch-sharded sampling** — startup crash for models with `compute_logits_local` (llama, qwen3_5, deepseek_v4-nvidia). Fix in [#56074](https://github.com/vllm-project/vllm/pull/56074) (rejects the combo at startup).

**Severity: high (correctness / functional)**
- **Thinking-token budget not enforced with MTP speculative decoding** — introduced in #20859, broken when MTP is on (works without MTP) on Qwen3.5-35B-A3B-FP8 + B300 ([#39573](https://github.com/vllm-project/vllm/issues/39573), closed). No linked fix PR.
- **`tool_choice="required"` not enforced with Qwen3.8-Flash-Next** when `enable_thinking=false`; xgrammar "Failed to advance FSM" with thinking on + MTP ([#55552](https://github.com/vllm-project/vllm/issues/55552), closed). No linked fix PR.
- **PP>1 + async scheduling + structured output** returns HTTP 500 / "Failed to advance FSM" ([#56250](https://github.com/vllm-project/vllm/pull/56250) fixes MRV1; MRV2 path may need follow-up).
- **`response_format` + `tool_choice=auto`** — fix drops `response_format` constraint to honor tool-calling ([#56086](https://github.com/vllm-project/vllm/pull/56086)).

**Severity: medium (hardware / platform)**
- **sm_121 (Blackwell) on aarch64 / DGX Spark** — no support ([#36821](https://github.com/vllm-project/vllm/issues/36821)). No fix PR yet.
- **Gemma4 on Turing (SM 7.5)** — every attention backend exceeds shared-memory limits ([#38918](https://github.com/vllm-project/vllm/issues/38918)). No fix PR yet.
- **Tesla T4 shared-memory overrun** in Triton (81920 > 65536) ([#36802](https://github.com/vllm-project/vllm/issues/36802)). No fix PR yet.
- **ROCm install silently falls back to CUDA abi3 wheel on Python < 3.12** — no ROCm abi3 / cp311 / cp313 wheels ([#44660](https://github.com/vllm-project/vllm/issues/44660)). No fix PR yet.
- **`chunk_gated_delta_rule` Triton compile fails on MI210/gfx90a** with `num_stages=4` ([#44973](https://github.com/vllm-project/vllm/issues/44973)). No fix PR yet.
- **DFlash on GLM-5.3-Flash / ROCm** — target model lacks `SupportsEagle3`, and `ROCM_AITER_MLA_SPARSE` has no non-causal path ([#54451](https://github.com/vllm-project/vllm/issues/54451)). No fix PR yet.

**Closed-but-watched**: the AMD Q3 2026 development roadmap ([#44091](https://github.com/vllm-project/vllm/issues/44091)), AMD test issues ([#44092](https://github.com/vllm-project/vllm/issues/44092)), `cp38-abi3` wheel shipping `cp312` bindings ([#41487](https://github.com/vllm-project/vllm/issues/41487)), and the multimodal frame-list parser misclassification ([#55326](https://github.com/vllm-project/vllm/pull/55326)).

## 6. What This Means for Application Developers

- **Pin GLM-5.3 Flash to 0.27.x or stay on nightly with caution.** The 0.28 → 0.29 regression window for `GlmMoeDsa` is severe — silent random-token output is worse than a crash. Validate any 0.28+/0.29+ rollout with deterministic sampling on a known workload before serving.
- **Don't trust greedy decoding on Qwen3.8-Flash-Next at long context.** If you depend on temperature=0 reproducibility (caching, evaluation, replay), the `persistent_topk` path needs mitigation until #54521 / #51782 land fixes.
- **Avoid the deadly combo: `expandable_segments=True` + DP>1 + TP>1.** Workers will fail to init via `cudaIpcGetMemHandle`. Either drop the allocator flag or run pure TP or pure DP.
- **MTP speculative decoding is fragile.** Three separate issues today — thinking-budget enforcement, CUDA-graph capture with `num_speculative_tokens_per_batch_size`, and the 1,648-token prefix-cache recompute — affect different stacks. If you rely on MTP for Qwen3.5/Qwen3.8 hybrid GDN, benchmark carefully and consider disabling MTP for correctness-sensitive traffic.
- **Structured-output + tool-calling constraint slot is single-tenant.** New behavior (`#56086`) prioritizes `tool_choice` over `response_format`. If your client sends both, plan for the dropped constraint.
- **PP>1 + async scheduling + structured output is currently broken on MRV1** but fixed in #56250; if you're on MRV2 watch for follow-up. Existing callers hitting HTTP 500 / "Failed to advance FSM" can move off MRV1 as the immediate workaround.
- **LoRA + batch-sharded sampling is now refused at startup** (vs. crashing mid-sample) — adjust your launcher to not pass both for `llama`, `qwen3_5`, `deepseek_v4-nvidia`, or `minimax_m3-nvidia`.
- **Waterm

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-10

## Today's Highlights
- **Fast engine recovery lands Phase 1.** A per-rank Weight Cache Daemon now serves post-quantized weights over CUDA IPC, cutting weight-load time on Qwen3-235B FP8 from 306–327s to under 1s ([#33522](https://github.com/sgl-project/sglang/issues/33522)). This is the headline operational improvement for large-model cold starts.
- **Unified Cache series continues shipping.** A second Wave of PRs extends the unified radix cache to AMD, draft-speculative (MTP/EAGLE/DSpark) KV caches, NPU mRoPE, and Rust TreeCore external linkers ([#38269](https://github.com/sgl-project/sglang/pull/38269), [#37914](https://github.com/sgl-project/sglang/pull/37914), [#36959](https://github.com/sgl-project/sglang/pull/36959), [#38862](https://github.com/sgl-project/sglang/pull/38862)).
- **Several Blackwell/NVFP4 regressions surfaced.** A `tiny_gemm` swap costs ~4% DeepSeek-R1 NVFP4 decode on B200/B300, and a CUDA coredump tracker accumulated 296 comments of CI signal in 24h ([#38628](https://github.com/sgl-project/sglang/issues/38628), [#26340](https://github.com/sgl-project/sglang/issues/26340)).

## Releases & Breaking Changes
No new releases in the last 24h. Note that two deprecation RFCs closed in the period — non-Marlin GPTQ kernels + Dual Chunk FA backend ([#32112](https://github.com/sgl-project/sglang/issues/32112)) and CUTLASS MLA attention ([#32111](https://github.com/sgl-project/sglang/issues/32111)) — both intended to simplify the quantization/attention backend surface.

## New Model & Hardware Support
- **SenseNova-U1 / U1.5** — dedicated tracking issue opened against the OpenSenseNova reference repo ([#37742](https://github.com/sgl-project/sglang/issues/37742)).
- **Qwen3.5 MTP partial MXFP4** — Quark checkpoints with mixed MTP-expert precision now load correctly ([#38870](https://github.com/sgl-project/sglang/pull/38870)).
- **DeepSeek-V4 unified KV on AMD** — UMBP and Mooncake direct external linkers extended for DS-V4's FP4 payload/scale layout ([#38269](https://github.com/sgl-project/sglang/pull/38269)).
- **MiMo-V2.5-Pro (mxfp4) on Ascend NPU** — full DFlash speculative decoding path: mxfp4 expert weight load, NPU graph replay, DP attention, PD disaggregation ([#37565](https://github.com/sgl-project/sglang/pull/37565)).
- **NPU HiCache L2 + L3** — Memfabric `acc_offload` for the L2 path ([#38826](https://github.com/sgl-project/sglang/pull/38826)) and a new Ascend Memcache L3 backend ([#38827](https://github.com/sgl-project/sglang/pull/38827)).
- **NPU mRoPE** — `npu_mrope` reused from the unified radix cache instead of a CPU fallback ([#36959](https://github.com/sgl-project/sglang/pull/36959)).
- **NCCL 2.30 roadmap** — explicit plan to adopt NCCL EP, cross-group M-to-N transfer, zero-SM one-sided, RAS monitoring, and communicator checkpointing ([#32774](https://github.com/sgl-project/sglang/issues/32774)).

## Performance & Optimization
- **Weight Cache Daemon (Phase 1, landed)** — Qwen3-235B FP8 weight reload drops from ~5min to <1s via per-rank IPC-served post-quantized cache ([#33522](https://github.com/sgl-project/sglang/issues/33522)). This is the single largest cold-start improvement in the dataset.
- **MiniMax-M3 decode path optimizations** — sparse-decode K/V loads by paged 128-token tiles plus a tiny GEMM for the router projection, both on GB300 sm_103 / TP4 NVFP4 ([#38841](https://github.com/sgl-project/sglang/pull/38841)). Full kernel numbers pending CI but the kernel-isolation numbers suggest the GEMM is faster standalone.
- **DSA fused top-k** — overflow-bin edge case fixed so the fused top-k stays exact when the threshold bin exceeds the tie-count cap ([#37941](https://github.com/sgl-project/sglang/pull/37941)).
- **Router GEMM unification RFC** — proposal to fold `dsv3_router_gemm` and friends behind one gate layer with deterministic precision ([#38695](https://github.com/sgl-project/sglang/issues/38695)).
- **Host duplicate reclaim parity** — Rust TreeCore now honors `SGLANG_HICACHE_SKIP_HOST_DUPLICATE_RECLAIM` so host-DRAM eviction behavior matches the Python TreeCore ([#38862](https://github.com/sgl-project/sglang/pull/38862)).
- **AMD CI consolidation** — ROCm 7.0 workflows retired, single PR/Nightly pipeline across supported ROCm versions ([#38632](https://github.com/sgl-project/sglang/pull/38632)).

## Stability & Regressions
Ranked by likely blast radius; newest and unfixed first.

1. **`tiny_gemm` swap regresses DeepSeek-R1 NVFP4 decode ~4% on Blackwell** — PR #34693's unified GEMM path costs decode throughput despite faster isolated kernel numbers ([#38628](https://github.com/sgl-project/sglang/issues/38628)). No fix PR linked yet.
2. **DCP + PD-disagg decode retraction crashes with CUDA device-side assert** — `retract_decode` → `get_cpu_copy` index mismatch on DCP>1 decode servers ([#38645](https://github.com/sgl-project/sglang/issues/38645)). Open, no fix PR.
3. **Kimi-K3 strict tool-call grammar** — `additionalProperties` schema dilutes a named property's type constraint under xgrammar, allowing malformed arguments ([#38587](https://github.com/sgl-project/sglang/issues/38587)). Open, no fix PR.
4. **H20 ×8 cannot launch Qwen3.8-Flash-Next-FP8** — fresh launch failure reported same day ([#38793](https://github.com/sgl-project/sglang/issues/38793)).
5. **GLM-5.2 NVFP4 + EAGLE illegal memory access** — `flashinfer_trtllm` bf16 batched-GEMM on nextn draft MoE; Triton nextn is HIP-gated since #30137, narrowing the workaround surface ([#30209](https://github.com/sgl-project/sglang/issues/30209)). Open.
6. **DeepSeek-V4-Flash progressive output corruption under concurrency** — 2×H200 with DP attention exhibits deterministic drift ([#33397](https://github.com/sgl-project/sglang/issues/33397)).
7. **Kimi K3 decode crash: DSPARK + DCP** — `dcp/planner.py` `cumsum(extend_prefix_lens=None)` `TypeError` ([#34920](https://github.com/sgl-project/sglang/issues/34920)).
8. **Mamba radix cache degrades fresh prefill hits to 0-hit** — split-eviction vs lookup-intent mismatch in `MambaRadixCache` ([#22935](https://github.com/sgl-project/sglang/issues/22935)).
9. **Attention metadata inconsistency after post-plan padding** — newly opened correctness concern ([#38580](https://github.com/sgl-project/sglang/issues/38580)).
10. **Closed in period (notable):** HiRadixCache `writing_check` TP deadlock ([#28429](https://github.com/sgl-project/sglang/issues/28429)), Kimi-K3 multi-node MegaMoE CUDA-graph deadlock post-#33871 ([#37561](https://github.com/sgl-project/sglang/issues/37561)), BF16 RL `update_weights_from_tensor` shape mismatch ([#27787](https://github.com/sgl-project/sglang/issues/27787)), empty SSE chunk breaking AI SDK providers ([#29441](https://github.com/sgl-project/sglang/issues/29441)), Qwen3.5-9B runtime LoRA tool-call swallowing ([#30744](https://github.com/sgl-project/sglang/issues/30744)).

The CUDA coredump tracker ([#26340](https://github.com/sgl-project/sglang/issues/26340)) is the single biggest infrastructure signal of the day — 296 auto-collected comments, indicating broad instability across recent PRs on Blackwell.

## What This Means for Application Developers
- **Cold starts on large MoE just became cheap.** If you restart engines, reload quantized weights, or autoscale, the Weight Cache Daemon makes ~5min reloads disappear. Plan around per-rank IPC instead of filesystem weight re-load.
- **Tool-calling grammars still have sharp edges on Kimi-K3 strict mode.** Until #38587 is fixed, treat strict tool schemas on Kimi-K3 as best-effort; consider relaxing `additionalProperties` or fall back to non-strict parsing at the agent layer.
- **PD-disaggregation + DCP > 1 has known crash paths** — retraction (#38645) and DSPARK verify (#34920) both fail. If you operate decoders with DCP, pin to single-rank or stay on the previous SGLang line until both close.
- **DeepSeek-R1 NVFP4 decode on Blackwell is currently 4% slower than the previous kernel path.** If you're benchmarking today, hold the version that pre-dates PR #34693 or expect to roll back once a non-revert fix lands.
- **Unified Cache is closing the gap between AMD, NPU, and CUDA.** If you currently shard cache logic by backend, expect a single external-linker API soon — worth tracking the [Unified Cache series](https://github.com/sgl-project/sglang/pull/37914) before committing to backend-specific glue.
- **NPU is becoming a first-class target.** Memfabric-backed L2, Ascend Memcache L3, native mRoPE, and DFlash on MiMo mean Ascend deployments are no longer a CUDA-port-after-the-fact story — but expect rougher edges than the CUDA path.
- **CI is currently in a noisy period** (per #17050: 7 broken, 20 flaky, 964 recently fixed). Treat cutting-edge `main` as a moving target; pin to a recent tagged release for production.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-10

## 1. Today's Highlights

The release cadence in the last 24 hours is dominated by **Vulkan hardening** (10+ PRs landed across b10878–b10891), including a PowerVR compiler workaround, an Intel Arc A770 FILL dispatch fix, command-buffer debug labels for profilers, and a spec-constant-based mul_mm. On the **server side**, a long-standing enhancement request for a persistent prompt cache (`--cache-disk`, #20697) has finally landed a working PR (#28092). Two **correctness/security** server bugs also drew attention: cross-request LoRA-contaminated KV cache (#26207) and malformed tool-call JSON returning HTTP 500 instead of 4xx (#25510).

## 2. Releases & Breaking Changes

Eleven commits pushed to `master` today; the most notable shipped fixes:

- **b10891** — [vulkan: fall back to shared-memory reduction for dmmv on PowerVR](https://github.com/ggml-org/llama.cpp/commit/b10891) ([#28341](https://github.com/ggml-org/llama.cpp/pull/28341)). Resolves `vkCreateComputePipelines` failures on Imagination's proprietary compiler.
- **b10889** — [memory: avoid allocating V cache for indexer (it's not used)](https://github.com/ggml-org/llama.cpp/commit/b10889) ([#28330](https://github.com/ggml-org/llama.cpp/pull/28330)). Closes [#28296](https://github.com/ggml-org/llama.cpp/issues/28296). Frees a redundant V-cache slice for DSA/Lightning-Indexer layers.
- **b10888** — [vulkan: command-buffer debug labels for GPU profilers](https://github.com/ggml-org/llama.cpp/commit/b10888) ([#28101](https://github.com/ggml-org/llama.cpp/pull/28101)).
- **b10887 / b10886** — s390x CPU backend: Q4_0 repack and Q1_0 vector intrinsic support ([#28667](https://github.com/ggml-org/llama.cpp/pull/28667), [#28606](https://github.com/ggml-org/llama.cpp/pull/28606)).
- **b10885** — [model: fix all granite family parameter counts](https://github.com/ggml-org/llama.cpp/commit/b10885) ([#28643](https://github.com/ggml-org/llama.cpp/pull/28643)). Correctness fix for Granite conversions.
- **b10883** — [vulkan: spec constant for mul_mm A-type](https://github.com/ggml-org/llama.cpp/commit/b10883) ([#25773](https://github.com/ggml-org/llama.cpp/pull/25773)).
- **b10881** — [vulkan: 2D workgroup distribution for FILL](https://github.com/ggml-org/llama.cpp/commit/b10881) ([#28592](https://github.com/ggml-org/llama.cpp/pull/28592)). Closes the Intel Arc A770 `maxComputeWorkGroupCount` assertion in [#28247](https://github.com/ggml-org/llama.cpp/issues/28247) that affected Qwen 3.8 Flash Next.
- **b10878** — [llama: `int32_t` return type for `llama_sampler_chain_n`](https://github.com/ggml-org/llama.cpp/commit/b10878) ([#28631](https://github.com/ggml-org/llama.cpp/pull/28631)). Type-narrowing fix for users embedding sampler APIs.
- **b10877** — [CUDA: size routed MoE MMQ N-tiles from typical expert width on RDNA3](https://github.com/ggml-org/llama.cpp/commit/b10877) ([#28552](https://github.com/ggml-org/llama.cpp/pull/28552)).

No breaking changes flagged; all are additive or fixes.

## 3. New Model & Hardware Support

- **DeepSeek-V4.1-Flash conversion** — [PR #28696](https://github.com/ggml-org/llama.cpp/pull/28696) adds `DeepseekV41ForCausalLM` support (subclasses existing V4 path; handles nested `text_config`).
- **MetaX MACA backend (base)** — [PR #28694](https://github.com/ggml-org/llama.cpp/pull/28694) adds runnable inference support for MetaX GPUs; performance work is held in a separate branch.
- **Hexagon (Qualcomm NPU) multi-device + async backend** — [PR #26501](https://github.com/ggml-org/llama.cpp/pull/26501) merged, enabling IQ9/IQ10 multi-NPU setups with async graph compute, events, and tensor copy.
- **Windows-on-ARM CUDA builds** — [PR #28362](https://github.com/ggml-org/llama.cpp/pull/28362) enables MSVC `cl.exe` builds for WoA; [PR #28687](https://github.com/ggml-org/llama.cpp/pull/28687) promotes CUDA 13.4 WoA from Preview to 13.4.1 GA.
- **s390x CPU** — Q4_0 repack and Q1_0 intrinsics now first-class (above).
- **OpenVINO request** — [#28567](https://github.com/ggml-org/llama.cpp/issues/28567) asks when Qwen3.5 will be validated on Intel NPU (no ETA).

## 4. Performance & Optimization

- **Persistent prompt cache (`--cache-disk`)** — [PR #28092](https://github.com/ggml-org/llama.cpp/pull/28092) addresses [#20697](https://github.com/ggml-org/llama.cpp/issues/20697) (the 48-👍, 19-comment long-standing request). Supports hybrid/SWA checkpoints, LRU eviction, and corrupt-entry cleanup. This is the headline memory/perf feature for long-context serving.
- **GPU-resident LRU cache for host-offloaded MoE experts** — [PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861) caches recently used experts on-device when using `-ot ...exps=CPU` / `-ncmoe`, eliminating host-RAM bandwidth as the decode bottleneck for MoE.
- **Metal: single-source fusion table + gated_delta_net cache fusion** — [PR #28164](https://github.com/ggml-org/llama.cpp/pull/28164) by @ggerganov consolidates packing/compute fusion so the optimizer and encoders can no longer disagree; also adds Metal cache fusion for GDN layers.
- **Metal: fix idle threads in iq mul_mv kernels** — [PR #28692](https://github.com/ggml-org/llama.cpp/pull/28692) extends the row-split from #28086 to `iq1_s/m`, `iq2_xxs/xs/s`, `iq3_s` for `ne00 < 1024`.
- **SYCL radix-select top_k** — [PR #28670](https://github.com/ggml-org/llama.cpp/pull/28670) lifts the `k<=32` guard so Qwen3.8-Flash-Next's `k=2048` TOP_K stays on-device instead of falling back to CPU.
- **NVFP4 W4A8 forced path on Blackwell** — [PR #24364](https://github.com/ggml-org/llama.cpp/pull/24364) opens a path to force W4A8 for W4A16_NVFP4 layers (active still).
- **RISC-V VLEN=16 8x8 gemv/gemm for Q4_0** — [PR #28642](https://github.com/ggml-org/llama.cpp/pull/28642).
- **Vulkan mul_mm spec constant + FILL 2D distribution** (shipped above) — concrete wins on Qwen 3.8 Flash Next on Intel Arc and on Imagination PowerVR.
- **CI runner upgrade** — [PR #28659](https://github.com/ggml-org/llama.cpp/issues/28659) plans to bump Linux Vulkan CI to NVIDIA r615 to fix intermittent coopmat1 failures.

## 5. Stability & Regressions

*Ranked by severity. Closed items indicate fixes are already in `master`/a build.*

### High — Open

- **[#26207](https://github.com/ggml-org/llama.cpp/issues/26207) Server: prompt cache reused across requests with different per-request `lora`** — KV computed under adapter A is silently re-used for requests selecting adapter B. Contaminates output; treat as correctness/security issue. No fix PR visible yet.
- **[#26609](https://github.com/ggml-org/llama.cpp/issues/26609) CUDA illegal memory access in `cudaStreamSynchronize` (flash-attn path) with Qwen3.6-35B MoE + partial expert offload** — Deterministic, cross-build (b10107/b10243), disappears with `-fa off`. Long-standing flash-attn path bug.
- **[#27155](https://github.com/ggml-org/llama.cpp/issues/27155) VRAM leak with DeepSeek V4 Flash + DSpark** — Draft KV cache grows ~10 MB per PP+TG cycle until OOM.
- **[#28648](https://github.com/ggml-org/llama.cpp/issues/28648) Vulkan on Intel Arc 140V (Windows) outputs garbage with layers on GPU** — Batch-setting dependent; reproduces across b10831, b10850, b10865, b10872.
- **[#28660](https://github.com/ggml-org/llama.cpp/issues/28660) SYCL crash in `ggml_sycl_pool_vmm::free`** — oneDNN scratchpad breaks LIFO pool order on Intel Arc Pro B70 (b10879).
- **[#28441](https://github.com/ggml-org/llama.cpp/issues/28441) Intermittent silent Qwen2.5-Omni audio corruption on Metal under system load** — On Apple M5 Max, b10809.
- **[#28239](https://github.com/ggml-org/llama.cpp/issues/28239) [SYCL] Sysman free-memory query may be unavailable** — Affects `llama-server` resource reporting.
- **[#27911](https://github.com/ggml-org/llama.cpp/issues/27911) CUDA "invalid configuration argument" in `ggml_cuda_op_rms_norm_fused`** — Under concurrent batching on sm_70 (Tesla V100 era), qwen4_exp / Qwen3.8-Flash-Next.
- **[#25510](https://github.com/ggml-org/llama.cpp/issues/25510) Malformed tool-call arguments return HTTP 500 instead of 4xx** — Server contract issue; should be a client error.

### Medium — Open

- **[#26478](https://github.com/ggml-org/ll

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-10

## Today's Highlights

The day's activity is dominated by **Gemma-family parser bugs and parallel security hardening**. Multiple new Gemma3n/Gemma4 tool-call parsing defects were filed and at least two are already paired with merged-style PRs ([#18355](https://github.com/ollama/ollama/pull/18355), [#18363](https://github.com/ollama/ollama/pull/18363)). On the security side, the long-standing CVE backlog against the bundled Go binary ([#16033](https://github.com/ollama/ollama/issues/16033)) is finally being closed out by dependency bumps ([#17095](https://github.com/ollama/ollama/pull/17095), [#18356](https://github.com/ollama/ollama/pull/18356)).

## Releases & Breaking Changes

No releases in the last 24h. Several closed PRs from yesterday ([#17935](https://github.com/ollama/ollama/pull/17935), [#18298](https://github.com/ollama/ollama/pull/18298), [#18348](https://github.com/ollama/ollama/pull/18348), [#18347](https://github.com/ollama/ollama/pull/18347)) are landing in `main` and will shape the next tag — see "Stability" for behavioral changes.

## New Model & Hardware Support

- **Granite 4.1 (MLX)** — Adds `GraniteForCausalLM` to the experimental MLX backend via mlx_lm conversion ([#17972](https://github.com/ollama/ollama/pull/17972)).
- **qwen3.5 / qwen3.5moe parallelism restored** — The hardcoded `numParallel = 1` blocklist is removed now that the upstream llama.cpp crash is fixed, unblocking hybrid-architecture throughput ([#17144](https://github.com/ollama/ollama/pull/17144)).
- **DeepSeek-V4.1-Flash** — Two open requests for the Flash variant on Ollama Cloud ([#18178](https://github.com/ollama/ollama/issues/18178), [#18360](https://github.com/ollama/ollama/issues/18360)). No upstream action yet.
- **MLX safetensors import** — Server-side MLX import pipeline, with GGUF create narrowed to wrap-only ([#14969](https://github.com/ollama/ollama/pull/14969)). MLX prefix-cache eviction policy is also being fixed ([#18353](https://github.com/ollama/ollama/pull/18353)).

## Performance & Optimization

- **qwen3.5 multi-turn re-render fix** — Renderer now always emits the assistant think block on history replay, eliminating full-prompt reprocessing for `qwen3.5` ([#18358](https://github.com/ollama/ollama/pull/18358)).
- **MLX prefix cache eviction** — Active-conversation snapshots can now be freed when over budget, relevant for MoE/KV-cached models ([#18353](https://github.com/ollama/ollama/pull/18353)).
- **1M context UI** — 512k / 1M options added to the settings slider so users can actually select the context lengths already advertised by GLM-5.3 Flash and similar models ([#18364](https://github.com/ollama/ollama/pull/18364), addresses [#18352](https://github.com/ollama/ollama/issues/18352)).
- **MLX startup noise** — Missing-symbol errors no longer print to stderr on non-CUDA/non-Apple Windows machines ([#18335](https://github.com/ollama/ollama/pull/18335)).

## Stability & Regressions

**Critical / High**
- **Silent zero-vector embeddings under load** — `/v1/embeddings` and `/api/embed` return HTTP 200 with correct dimensionality but all-zero vectors under sustained load; no log distinguishes success from failure ([#17878](https://github.com/ollama/ollama/issues/17878)). **No fix PR yet.** Highest operational risk: clients cannot detect the failure.
- **CVE backlog in Go binary** — 1 CRITICAL + 11 HIGH CVEs reported against `/usr/local/bin/ollama` ([#16033](https://github.com/ollama/ollama/issues/16033)). Fix in progress via [#17095](https://github.com/ollama/ollama/pull/17095) and [#18356](https://github.com/ollama/ollama/pull/18356) (WebP decoder DoS advisories GO-2026-5061 / GO-2026-6222). Recommend shipping rebuilt binaries promptly.
- **File-descriptor leak in `ollama serve`** — One FD retained per successful `/api/generate` request, no upper bound, requires restart ([#18344](https://github.com/ollama/ollama/issues/18344)). No fix PR yet.
- **Gemma4:e2b startup crash** — `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS)` on `ollama run gemma4:e2b` in WSL2 ([#16506](https://github.com/ollama/ollama/issues/16506)). 22 comments, 8 👍. No fix PR.

**Medium**
- **qwen3-coder tool-call parser** — Drops tool calls when the opening `<tool_call>` tag is omitted; entire call leaks into `content` as text ([#16686](https://github.com/ollama/ollama/issues/16686)). **Fix PR open:** [#16693](https://github.com/ollama/ollama/pull/16693).
- **Gemma4 string-placeholder collision** — Valid tool calls with 45 scalar strings followed by a 2-string array silently produce empty `tool_calls` ([#18354](https://github.com/ollama/ollama/issues/18354)). **Fix PR open:** [#18355](https://github.com/ollama/ollama/pull/18355).
- **FunctionGemma empty arrays serialize as null** — `items: []` becomes `{"items": null}` in API output ([#18363](https://github.com/ollama/ollama/pull/18363) fix PR open).
- **Gemma3n `/v1` empty tool_calls** — Native `<tool_call>` emission not converted to OpenAI-compatible output ([#18357](https://github.com/ollama/ollama/issues/18357)).
- **Native Gemma4 stream desync** — `/api/chat` emits 31 repeated `<unused50>` content frames then EOFs without `done:true` ([#18359](https://github.com/ollama/ollama/issues/18359)).
- **Anthropic `/v1/messages` complex tool schemas** — Models emit tool calls as literal text instead of `tool_use` blocks when schemas are non-trivial ([#18346](https://github.com/ollama/ollama/issues/18346)).
- **Multi-GPU VRAM accounting** — Scheduler looks up devices by discovery name (`CUDA1`) while maps are keyed by child llama-server log name (`CUDA0`), causing divergence ([#18349](https://github.com/ollama/ollama/issues/18349)).
- **qwen2.5-coder:3b broken library artifacts** — q2_K / q3_K_S/M/L produce non-functional output (0/15 on smoke tests), sibling quants unaffected ([#18252](https://github.com/ollama/ollama/issues/18252)).

**Low / already addressed**
- AMD Vulkan regression since v0.32.12 ([#18272](https://github.com/ollama/ollama/issues/18272)) and the broader AMD 780M Vulkan regression ([#17748](https://github.com/ollama/ollama/issues/17748)) — both still OPEN, no fix PR yet despite `radv/amdgpu: Not enough memory for command submission` being a hard block.
- `/v1/responses` rejecting `agent_message` — **FIXED** ([#18298](https://github.com/ollama/ollama/pull/18298) closed).
- `codex-app` namespace tool failure — **FIXED** by filtering namespace tools before llama-server ([#17630](https://github.com/ollama/ollama/pull/17630) closed).
- `tool_choice` silently ignored on OpenAI/Anthropic compat — **FIXED** ([#17935](https://github.com/ollama/ollama/pull/17935) closed).
- Standalone named function outputs across compaction — **FIXED** ([#18348](https://github.com/ollama/ollama/pull/18348) closed).

## What This Means for Application Developers

- **Do not trust 200 OK on `/v1/embeddings` blindly.** With [#17878](https://github.com/ollama/ollama/issues/17878) open, vector-norm checks (e.g. reject if L2 norm < ε) are a necessary defensive layer in RAG and retrieval pipelines until the bug is fixed upstream.
- **Codex/agent integrations got safer.** `agent_message` items now pass through `/v1/responses` ([#18298](https://github.com/ollama/ollama/pull/18298)), and standalone `function_call_output` items survive compaction ([#18348](https://github.com/ollama/ollama/pull/18348)). If you run Codex against Ollama Cloud, GLM-session compaction should no longer 400.
- **`tool_choice` is now honored on both compat layers.** Apps that relied on `tool_choice: "none"` to suppress calls or `required` to force calls will see correct behavior post-merge of [#17935](https://github.com/ollama/ollama/pull/17935).
- **Gemma4 tool calls are still flaky in production.** Multiple parser regressions surfaced today ([#18354](https://github.com/ollama/ollama/issues/18354), [#18359](https://github.com/ollama/ollama/issues/18359)). If you ship Gemma4 tool-calling, pin a known-good build or apply the pending parser PRs before exposing it to users.
- **Watch FD count on long-running `ollama serve`.** Issue [#18344](https://github.com/ollama/ollama/issues/18344) means `/api/generate` traffic will exhaust ulimits over time — schedule restarts or front the server with a connection-pooling proxy until fixed.
- **1M-context models are now selectable in the UI** ([#18364](https://github.com/ollama/ollama/pull/18364)); expect the setting to no longer silently truncate when models advertise larger windows.
- **Security posture:** if you ship the Ollama binary in containers or appliance images, pull in [#17095](https://github.com/ollama/ollama/pull/17095) and [#18356](https://github.com/ollama/ollama/pull/18356) before your next release; the listed WebP and crypto CVEs are reachable from default image-input paths.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-10

## Today's Highlights
- **v1.101.0-rc.2 cut** with a new supply-chain hardening note: every LiteLLM Docker image is now signed with [cosign](https://docs.sigstore.dev/cosign/overview/) using a key anchored to commit `0112e53` ([#unreleased](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.2)). Operators should wire cosign verification into their admission policies before promoting the RC.
- **Billing integrity is the dominant theme**: a fresh class of spend-tracking bugs surfaced (Bedrock on client disconnect, RPM limits freezing after first key cache hit, custom-model cost-map misses, in-memory reseed double-counting) — multiple PRs landed today addressing them.
- **Anthropic/Claude Code path hardening continues**: `prompt_cache_key` mis-derivation, `/v1/messages/count_tokens` hardcoded `api.anthropic.com`, and `response.failed` swallowing on the Responses bridge are all under active fix.

---

## Releases & Breaking Changes
- **v1.101.0-rc.2** ([release notes](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.2)) — Docker images are now cosign-signed with a key pinned to commit `0112e53`. Verify with `cosign verify --key <pubkey> ghcr.io/berriai/litellm:v1.101.0-rc.2`. No public changelog beyond the signing note was included in the cutoff data; treat as RC and pin to a specific digest before promotion.

## New Model & Hardware Support
- **fal.ai (new provider request)** — Sora 2, Veo 3.1, and other video/image models requested ([#16073](https://github.com/BerriAI/litellm/issues/16073)).
- **DeepSeek V4 Pro / Flash** — pricing reported stale against the provider's new time-of-day rates ([#37255](https://github.com/BerriAI/litellm/issues/37255)); PR #40569 simultaneously ships an updated Jina reranker rate.
- **gpt-6-astra** — registered with `mode: "chat"`, breaking `/v1/chat/completions` tool calls against OpenAI; Responses bridge fails to engage ([#40123](https://github.com/BerriAI/litellm/issues/40123)).
- **A2A agents** — prefix-routing fix so `a2a/<agent>` is reachable via `/chat/completions` even when wildcard model groups exist ([#39513](https://github.com/BerriAI/litellm/pull/39513)).
- **ChatGPT / Codex** — image edits, structured-review JSON schema, and realtime voice signaling added to the ChatGPT OAuth deployment path ([#40366](https://github.com/BerriAI/litellm/pull/40366)).

## Performance & Optimization
- **Streaming usage correctness** — `_usage_chunk_calculation_helper` was corrupting `prompt_tokens`/`completion_tokens` for reasoning models when chaining LiteLLM proxies, because `"prompt_tokens" in usage_chunk` failed on Pydantic `CompletionUsage`. Fixed in [#40282](https://github.com/BerriAI/litellm/pull/40282) (reasoning tokens + usage now preserved end-to-end).
- **Cache size enforcement regression** — `InMemoryCache.check_value_size()` used `__sizeof__()` on containers, which only measured the shallow header, so multi-MB payloads passed a 1 KB limit. Container size now respected ([#40254](https://github.com/BerriAI/litellm/pull/40254)).
- **Alias-aware `/v1/models`** — limits are now resolved from the underlying deployment rather than the public alias; previously a 1M-context deployment surfaced as 200k ([#39296](https://github.com/BerriAI/litellm/pull/39296)).
- **least-busy routing starvation** — root-cause analysis now public: response-cache hits drift the counter negative, ties always pick the first deployment, and the counter is not shared across workers ([#39322](https://github.com/BerriAI/litellm/issues/39322)). No fix PR yet.
- **Reasoning + content preservation on Responses bridge** — combined chunks no longer drop incremental visible text; reasoning deltas can now arrive before their summary part opens ([#36329](https://github.com/BerriAI/litellm/pull/36329)).

## Stability & Regressions
Ranked by user impact today:

1. **Spend log $0 for unknown custom models** ([#35691](https://github.com/BerriAI/litellm/issues/35691), Open) — `cost_breakdown.total_cost = 0` in spend logs even though `response.usage.estimated_cost` is correct. Affects any custom model not in the built-in cost map (e.g. `deepinfra/deepseek-ai/DeepSeek-V4-Flash-0731`). *No fix PR yet.*
2. **Per-customer RPM limits stop applying once virtual key is cached** ([#39713](https://github.com/BerriAI/litellm/issues/39713), Open, fresh) — `max_end_user_budget_id` enforcement leaks after first cache hit. *No fix PR yet.*
3. **`max_parallel_requests` counter monotonically grows on Anthropic adapter** ([#27955](https://github.com/BerriAI/litellm/issues/27955), Open) — Redis counter never decrements on client-stream cancellation; eventually every request is rejected. *No fix PR yet.*
4. **Bedrock non-streaming spend tracking on client disconnect** ([#13245](https://github.com/BerriAI/litellm/issues/13245), Open) — LiteLLM records partial cost even though AWS charges for the full completed request.
5. **In-memory spend counter double counting** ([#40572](https://github.com/BerriAI/litellm/pull/40572), Open PR) — without Redis, reseeding adds DB balance to a populated counter, inflating spend. Fix in PR.
6. **`prompt_cache_key` derived from `user_id` never changes** ([#39145](https://github.com/BerriAI/litellm/issues/39145), Closed today) — Claude Code caching broken by the v1.99.0 fix; reverted.
7. **MCP OAuth2 callback 404** ([#24771](https://github.com/BerriAI/litellm/issues/24771), Open) — GitHub App MCP OAuth flow redirects to `/ui/mcp/oauth/callback`, which doesn't exist.
8. **`/v1/messages/count_tokens` hardcodes `api.anthropic.com`** ([#29764](https://github.com/BerriAI/litellm/issues/29764), Open) — breaks vLLM Anthropic-compatible backends.
9. **Complexity auto-router leaks `reasoning.encrypted_content`** across model groups ([#40237](https://github.com/BerriAI/litellm/issues/40237), Closed today) — `/v1/responses` follow-ups moved model groups mid-conversation.
10. **Health checks fail hard when host offline** ([#34281](https://github.com/BerriAI/litellm/issues/34281), Open) — ad-hoc homelab hosts trip the proxy; should fail open or degrade.
11. **Cursor MCP `cursor://` callback scheme rejected** ([#23339](https://github.com/BerriAI/litellm/issues/23339), Open).
12. **Tiered pricing fields (`*_above_200k_tokens`) silently ignored** ([#30135](https://github.com/BerriAI/litellm/issues/30135), Open) — base rate applied flat; over-bills or under-bills depending on direction.
13. **`/v1/responses` with `background:true` + `polling_via_cache` returns empty output** ([#36275](https://github.com/BerriAI/litellm/issues/36275), Closed today) — regression from v1.91.0; v1.83.7 confirmed working.
14. **Anthropic streaming drops `input_json_delta` for tool_use** via custom OpenAI-compatible provider ([#29491](https://github.com/BerriAI/litellm/issues/29491), Closed today).
15. **In-container `curl` missing** — healthchecks on Coolify-style platforms broken; `curl` added to Dockerfile runtime stage ([#36367](https://github.com/BerriAI/litellm/pull/36367)).

## What This Means for Application Developers
- **Verify the RC before pinning**. `v1.101.0-rc.2` introduces cosign signing — set up `cosign verify` in your CI/admission controller now so production rollouts can trust the digest.
- **If you proxy Bedrock or rely on per-customer rate limits, stay on a stable line** (≤ v1.99.0 for `prompt_cache_key` correctness; verify Bedrock non-streaming accounting end-to-end). Multiple billing-path bugs are open with no fix PR; expect surprises on the ledger.
- **Self-hosted vLLM with the Anthropic adapter**: `count_tokens` still hardcodes `api.anthropic.com` ([#29764](https://github.com/BerriAI/litellm/issues/29764)) — pin a workaround in your client or hold the upgrade.
- **Claude Code users**: the v1.99.0 `prompt_cache_key` change broke caching. The bug is closed today ([#39145](https://github.com/BerriAI/litellm/issues/39145)) but the fix is a revert — confirm your cache hit rate returns to baseline before declaring victory.
- **Reasoning-model streaming chains**: PR [#40282](https://github.com/BerriAI/litellm/pull/40282) restores usage accounting when you chain LiteLLM proxies (e.g., edge → central). If your token accounting looks off today, that's why.
- **Cost controls**: per-customer budgets now support a shared fallback pool (PR [#40573](https://github.com/BerriAI/litellm/pull/40573)) and emit webhook alerts (PR [#40396](https://github.com/BerriAI/litellm/pull/40396)) — both useful for multi-tenant SaaS rollouts.
- **Agent identity on Agent 365**: the new `auth_mode: agent_identity` for the Microsoft 365 guardrail ([#40568](https://github.com/BerriAI/litellm/pull/40568)) lets headless agents authenticate without an end-user Entra token.
- **Observability**: the new PointFive logging callback ([#38509](https://github.com/BerriAI/litellm/pull/38509)) adds another cost-analysis export option alongside Langfuse/Spend Logs.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-10

## 1. Today's Highlights

The v0.1.808-beta release delivers **1.2–1.7x faster diffusion inference and a 20% AMD ROCm boost via Vulkan**, alongside a 2x faster `studio update` pipeline and Windows-specific stability fixes (SAC/AV false positives removed). The PR pipeline is dominated by Studio infrastructure work — a 23,636-line comment cleanup, background prefetch updates, per-account isolation, and KV preemption that lets parallel chats share one cache without killing each other. Two notable regressions on DGX Spark (capped context length, diffusion refusing to load) have landed fixes.

## 2. Releases & Breaking Changes

- **[v0.1.808-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta)** — "Large Performance Gains + Fixes"
  - 1.2–1.7x faster diffusion inference
  - 20% AMD ROCm perf boost via Vulkan
  - 2x faster `studio update` (skip-if-evidence-holds logic)
  - SAC + AV false positives removed on Windows
  - Blender MCP integration, Hermes detection
  - AMD gibberish bug reported upstream to AMD (fixed in this release)

## 3. New Model & Hardware Support

- **AMD Vulkan backend**: 20% performance improvement on ROCm via Vulkan path
- **DGX Spark fixes** ([PR #10704](https://github.com/unslothai/unsloth/pull/10704), [PR #10705](https://github.com/unslothai/unsloth/pull/10705)): resolved context capping at 8192 instead of 262144, and diffusion load refusals on unified-memory APUs
- **NVLink detection** ([PR #10720](https://github.com/unslothai/unsloth/pull/10720)): now reads NVLink fabric via NVML instead of `nvidia-smi topo -m` shell-out — ~1.2s → ~tens of ms on 8x B200 hosts
- **Agent Skills** ([PR #10247](https://github.com/unslothai/unsloth/pull/10247)): discover/validate skills from `~/.agents/skills` and `~/.claude/skills`, expose paginated `read_skill` tool across Studio inference paths
- **Apple Silicon support** ([Issue #4](https://github.com/unslothai/unsloth/issues/4)): still on roadmap; 644 👍, marked help wanted — no PR landed

## 4. Performance & Optimization

- **Diffusion inference**: 1.2–1.7x speedup in v0.1.808-beta
- **AMD ROCm + Vulkan**: +20% performance
- **`studio update` 2x faster** via evidence-based skip logic ([PR #10649](https://github.com/unslothai/unsloth/pull/10649)) — dependency pass now records what it consumed in the install manifest and skips steps when previous evidence holds
- **Transformers sidecar rebuild**: only rebuilds stale sidecars ([PR #10650](https://github.com/unslothai/unsloth/pull/10650)) — previously 60–90s on Windows per update
- **uv reuse** ([PR #10659](https://github.com/unslothai/unsloth/pull/10659)): avoids re-downloading pinned uv archive when a previous run installed it
- **Background prefetch update** ([PR #10653](https://github.com/unslothai/unsloth/pull/10653)): `unsloth studio prefetch-update` runs hidden, dry-runs the core step against live venv before offering UI update
- **Offload planner** ([PR #9872](https://github.com/unslothai/unsloth/pull/9872)): weighs spill cost against llama.cpp's own fitter, with cost gate, sub-FFN spill ladder, context-aware device reserve, and launch ordering — all behind `UNSLOTH_SMART_OFFLOAD`
- **KV preemption** ([PR #10301](https://github.com/unslothai/unsloth/pull/10301), [PR #10358](https://github.com/unslothai/unsloth/pull/10358)): parallel chats now share one KV cache (`--parallel N --kv-unified -c N`) without slot preemption; pairs with `unslothai/llama.cpp#184`/`#190`
- **Comment cleanup** ([PR #10504](https://github.com/unslothai/unsloth/pull/10504)): removed 23,636 comment lines across installers, CLI, package, and backend utilities
- **Log redactor fix** ([PR #10721](https://github.com/unslothai/unsloth/pull/10721)): stops quadratic backtracking on cut ANSI sequences

## 5. Stability & Regressions

### Recently closed bugs (fixes shipped)
- **Unsloth Desktop / Studio**:
  - RAM not released on `-ngl -1` GGUF loads ([Issue #9033](https://github.com/unslothai/unsloth/issues/9033), OPEN — no fix PR shown)
  - Multi-turn determinism smoke flakes intermittently ([Issue #10004](https://github.com/unslothai/unsloth/issues/10004)) — CLOSED
  - Installer reports AMD GPU while backend runs CPU-only ([Issue #8473](https://github.com/unslothai/unsloth/issues/8473)) — CLOSED
  - AMD Strix Halo APU restricted to 22 GB system RAM instead of 110 GB GPU memory ([Issue #6834](https://github.com/unslothai/unsloth/issues/6834)) — CLOSED, 5 👍
  - Auto-picks CPU forever after restart ([Issue #5807](https://github.com/unslothai/unsloth/issues/5807)) — CLOSED
  - GGUF export failure on RTX 5080 + WSL ([Issue #4845](https://github.com/unslothai/unsloth/issues/4845)) — CLOSED
- **vLLM integration**: `min_p and logit_bias not supported` error on v0.1.807-beta ([Issue #10573](https://github.com/unslothai/unsloth/issues/10573)) — OPEN
- **Qwen3-Coder-Next-Base OOM on 2xA100 QLoRA** ([Issue #4040](https://github.com/unslothai/unsloth/issues/4040)) — CLOSED, currently fixing
- **Qwen 2 Kaggle `NameError: slice_indices`** ([Issue #3450](https://github.com/unslothai/unsloth/issues/3450)) — CLOSED, fixed
- **Gemma 3n maximum recursion depth** ([Issue #3650](https://github.com/unslothai/unsloth/issues/3650)) — CLOSED
- **Prompt-completion dataset support** ([Issue #3399](https://github.com/unslothai/unsloth/issues/3399)) — CLOSED
- **Intel Arc B580 import failure** ([Issue #3533](https://github.com/unslothai/unsloth/issues/3533)) — `torch.xpu.memory.mem_get_info()` unsupported, CLOSED
- **Multi-GPU fine-tuning** ([Issue #1707](https://github.com/unslothai/unsloth/issues/1707)) — CLOSED
- **Vision `NameError: fetch_video`** ([Issue #3086](https://github.com/unslothai/unsloth/issues/3086)) — CLOSED

### Open security regression
- **[Issue #10545](https://github.com/unslothai/unsloth/issues/10545)** — `pip scan-packages` baseline needs re-review after unsloth-zoo bump; 164 findings, 93 suppressed (60 CRITICAL, 33 HIGH). **Severity: HIGH** — security audit lane is red on `main`.

### Feature requests trending
- **[Issue #10637](https://github.com/unslothai/unsloth/issues/10637)**: "Download Dataset" button in Data Recipes — OPEN
- **[Issue #5141](https://github.com/unslothai/unsloth/issues/5141)**: Codex + llama.cpp docs outdated for Responses API — CLOSED

## 6. What This Means for Application Developers

- **Studio update overhead roughly halves** — if you've been avoiding frequent updates because of the 60–90s Windows rebuild or repeated uv downloads, v0.1.808-beta + the PR stack makes the update path evidence-aware. Worth re-running `studio update` to pick up the gains.
- **Parallel chat throughput** — the new `--parallel N --kv-unified` mode means multiple concurrent conversations no longer compete for KV cache slots. If you're running an agent that spawns parallel inference streams against one model, this is a meaningful capacity unlock.
- **DGX Spark users**: update now to recover native context length (262k) and unlock diffusion loads on unified memory.
- **AMD ROCm users**: the Vulkan path gives +20% for free on the new release; previously reported AMD gibberish issues are resolved.
- **Apple Silicon**: still no PR, but issue #4 remains the most-upvoted feature request in the repo (644 👍) — anyone with Metal expertise contributing upstream kernels would land high-impact work.
- **Studio security baseline**: if you depend on `unsloth-zoo` in a CI/CD pipeline gated by `pip-audit`, watch Issue #10545 — the hf-stack lane is failing post-bump and may need a baseline update or dependency pin before merging.
- **For vLLM-integrated apps on Studio Desktop 0.1.807-beta**: avoid passing `min_p` or `logit_bias` until #10573 is resolved; consider pinning to v0.1.806 if those sampling parameters are in your production path.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-10

## Today's Highlights

Today's activity is dominated by **stability fixes landing in v3.1.0**, addressing two production-blocking regressions: (1) Claude App gateway restore silently deleting the active config entry and rolling back the root config on every CCR restart (#1768 → [#1769](https://github.com/musistudio/claude-code-router/pull/1769)), and (2) `fusion` web-search detection failing for Claude Cowork clients because the tool-name normalizer collapsed `WebSearch` to `websearch`, missing all match patterns ([#1766](https://github.com/musistudio/claude-code-router/issues/1766) → [#1767](https://github.com/musistudio/claude-code-router/pull/1767)). The release also tightens config-sync semantics by honoring the profile Entry mode and invalidating the gateway model-discovery cache when the profile allowlist changes.

## Releases & Breaking Changes

- **[v3.1.0](https://github.com/musistudio/claude-code-router/releases/tag/v3.1.0)** — Community-contributed by @diogomcd
  - `feat`: `claudeAppConfigSync` now respects the profile's **Entry mode** instead of unconditionally writing the active profile ([#1720](https://github.com/musistudio/claude-code-router/pull/1720)). Operators who relied on auto-promotion of the active profile into Claude Desktop's entry may see different behavior; verify your profile `entry` setting after upgrade.
  - `fix`: Gateway model-discovery cache is now invalidated when the profile allowlist changes, preventing stale model lists after editing `config.json` ([#1720](https://github.com/musistudio/claude-code-router/pull/1720)). No action required, but expect fresh `/v1/models` responses after allowlist edits.

No CLI flag or schema-breaking changes in this release.

## New Model & Hardware Support

_No new model, architecture, backend, or quantization support in this digest window._

## Performance & Optimization

- **Gateway cache invalidation correctness** ([#1720](https://github.com/musistudio/claude-code-router/pull/1720)) — Previously, mutating the profile allowlist could leave clients reading a cached model list that no longer reflects upstream availability. The fix ensures cache TTL is bounded by allowlist identity; no measured numbers, but eliminates a class of "ghost model" 404s.
- No throughput, latency, or memory optimizations landed today.

## Stability & Regressions

Ranked by user-facing severity. All three highest-severity items now have a fix (two merged, one open).

| Severity | Issue | Status | Fix |
|---|---|---|---|
| 🔴 High | [#1768](https://github.com/musistudio/claude-code-router/issues/1768) — `restoreClaudeAppGatewayConfig` deletes `configLibrary/*.json` on CCR exit, and `apply` rebuilds a 12-field "naked" entry on next start, losing Claude-written settings like `chatTabEnabled`, `modelPrefer1mContext`, etc. | **CLOSED** | [#1769](https://github.com/musistudio/claude-code-router/pull/1769) merged — restore is now surgical (removes only takeover-injected keys) instead of file-level rollback. |
| 🔴 High | [#1766](https://github.com/musistudio/claude-code-router/issues/1766) — `coreGatewayWebSearchToolNameMatches()` normalizes `WebSearch` → `websearch` (no separator), so `=== "web_search"`, `endsWith("_web_search")`, and `includes("search_web")` all miss; Cowork's web tool silently degrades. | **CLOSED** | [#1767](https://github.com/musistudio/claude-code-router/pull/1767) merged — additional regex/case-insensitive match handles camelCase tool declarations. |
| 🟡 Medium | [#1246](https://github.com/musistudio/claude-code-router/issues/1246) (referenced) — `ccr start --daemon` rejected with `Unknown web option: --daemon`, breaking documented usage. | **OPEN** | [#1782](https://github.com/musistudio/claude-code-router/pull/1782) by @syf2211 — adds `--daemon` parsing to both `start` and `serve`. Awaiting review. |
| 🟢 Low | [#1225](https://github.com/musistudio/claude-code-router/pull/1225) — `<CCR-SUBAGENT-MODEL>` override unreliable when tag sat in `system[1].text` or `req.body.model` returned early. | **CLOSED** | Merged — tag detection broadened. |
| 🟢 Low | [#1224](https://github.com/musistudio/claude-code-router/pull/1224) — OpenRouter provider `headers` in `config.json` not forwarded to upstream requests. | **CLOSED** | Merged — custom headers now merged before `fetch`. |
| 🟢 Low | [#865](https://github.com/musistudio/claude-code-router/pull/865) — Missing API key silently overrode `HOST` to `127.0.0.1`, breaking containerized deployments. | **CLOSED** | Merged — emits a warning instead. |

## What This Means for Application Developers

- **Upgrade to v3.1.0 promptly** if you use the Claude Desktop / Cowork gateway. The two high-severity fixes (#1769, #1767) are non-optional for users who (a) edit settings via Claude Desktop's UI and expect them to persist across CCR restarts, or (b) route Cowork traffic through `fusion` and rely on its web-search tool. Without these fixes you are silently losing config and losing web-grounding capability.
- **Profile Entry mode is now authoritative.** If you previously assumed the Claude App entry would auto-track the active profile, audit your `config.json` profile `entry` field. Stale profiles that should be promoted now require an explicit `entry` value.
- **`ccr start --daemon` works on the next release** ([#1782](https://github.com/musistudio/claude-code-router/pull/1782)). Until it merges, prefer the PID-file approach or run under your init system of choice — don't rely on the flag in scripts yet.
- **OpenRouter custom headers are now end-to-end.** If you use OpenRouter app attribution, ranking, or abuse-detection headers, you can declare them in `config.json`'s `providers[].headers` and they will reach the upstream — useful for cost attribution and per-app rate-limit isolation across multi-tenant gateways.
- **Subagent model overrides (`<CCR-SUBAGENT-MODEL>`)** are reliable again. If you were seeing the parent model handle subagent turns intermittently, retest on HEAD; the broadened tag detection ([#1225](https://github.com/musistudio/claude-code-router/pull/1225)) should resolve it.
- **Operational note:** The `HOST` no-longer-overridden-on-missing-API-key change ([#865](https://github.com/musistudio/claude-code-router/pull/865)) means unauthenticated deployments are now reachable on whatever interface you configure — ensure firewalling if you deploy without an API key and rely on the previous implicit loopback behavior.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-10

> Tracking [farion1231/cc-switch](https://github.com/farion1231/cc-switch) — a multi-provider switcher/router for Claude Code, Codex, and other AI coding apps.

## Today's Highlights

CC Switch saw a heavy day of Codex-related bug activity, with several long-standing issues around macOS local routing (#3585, #6256, #7217) and session management (#7273, #7274, #7272) finally getting fix PRs queued. A Claude Code `2.1.265` update broke DeepSeek and ZAI providers (#7236, 11 comments), while work on DeepSeek Harness (#6526, #7244) and a `system → user` prompt conversion proxy mode (#7253) signals the project's expansion beyond the Claude/Codex duopoly.

## Releases & Breaking Changes

No new releases in the last 24h. Active development continues against the current 3.20.x line — note the following shipping regressions that may already affect 3.20.2 users:

- **Claude Code `2.1.265` compatibility** — DeepSeek and ZAI providers break ([#7236](https://github.com/farion1231/cc-switch/issues/7236))
- **v3.20.2 regression** — `qwen3.8 27B` only works with `haiku`; other Claude Code models error ([#7221](https://github.com/farion1231/cc-switch/issues/7221))
- **Universal sync wipes child metadata** — usage queries and app-specific toggles lost ([#7134](https://github.com/farion1231/cc-switch/issues/7134), fix in [#7212](https://github.com/farion1231/cc-switch/pull/7212))
- **Codex failover settings overwritten by Claude settings on restart** ([#7204](https://github.com/farion1231/cc-switch/issues/7204), fix in [#7210](https://github.com/farion1231/cc-switch/pull/7210))

## New Model & Hardware Support

- **DeepSeek Harness (DSH)** — first-class `AppType` target with provider writer for `~/.dsh/settings.yaml` ([#7244](https://github.com/farion1231/cc-switch/pull/7244), [#6526](https://github.com/farion1231/cc-switch/pull/6526)). This is a meaningful new surface area beyond Claude/Codex/Gemini.
- **Grok Build** — independent routing path, decoupled from Codex ([#5364](https://github.com/farion1231/cc-switch/pull/5364))
- **Laonong API preset** — OpenAI-SDK-compatible gateway with 40+ models ([#7245](https://github.com/farion1231/cc-switch/pull/7245))
- **Qwen 3.8 generation** — DashScope presets rebranded to "千问AI平台" and refreshed across all seven supported apps ([#7183](https://github.com/farion1231/cc-switch/pull/7183))

## Performance & Optimization

No benchmark numbers landed today, but several proxy-path optimizations are queued:

- **System → user conversion for Claude Code steer/reminder messages** ([#7253](https://github.com/farion1231/cc-switch/pull/7253)) — targets cache-miss reproduction on Chat Completions gateways.
- **Image edits + Images API proxy follow-ups** ([#7177](https://github.com/farion1231/cc-switch/pull/7177)) — covers `/images/edits` coverage, base_url full-URL handling, and streaming image-gen usage accounting.
- **Full-URL proxy fallback** ([#7259](https://github.com/farion1231/cc-switch/pull/7259)) — concatenation when the configured URL stops at `/v1`.
- **`x-opencode-session` header stamping** for OpenCode Go upstream affinity/caching ([#7246](https://github.com/farion1231/cc-switch/pull/7246)).

## Stability & Regressions

Ranked by user-visible severity, top-down:

| Severity | Issue | Status |
|---|---|---|
| **Critical** | Claude Code `2.1.265` breaks DeepSeek/ZAI — ([#7236](https://github.com/farion1231/cc-switch/issues/7236)) | Closed (11 comments) |
| **High** | Local route returns `502 Bad Gateway` on `127.0.0.1:15721/v1/responses` — ([#3585](https://github.com/farion1231/cc-switch/issues/3585)) | Closed (18 comments) |
| **High** | Crash on opening CLI tool when local proxy + failover enabled — ([#936](https://github.com/farion1231/cc-switch/issues/936)) | Closed (15 comments) |
| **High** | Codex routing bypasses local proxy (`:15721`/`:15722`) and goes direct to `api.openai.com` on macOS — ([#7217](https://github.com/farion1231/cc-switch/issues/7217), [#6256](https://github.com/farion1231/cc-switch/issues/6256)) | Open; PR [#7263](https://github.com/farion1231/cc-switch/pull/7263) queued |
| **High** | `preserve_codex_official_auth_on_switch=true` causes 401 on resumed account-era Codex sessions — ([#5672](https://github.com/farion1231/cc-switch/issues/5672)) | Open; PR [#7262](https://github.com/farion1231/cc-switch/pull/7262) queued |
| **Medium** | Memory footprint anomaly — ([#7224](https://github.com/farion1231/cc-switch/issues/7224)) | Open |
| **Medium** | Codex session manager leaves undeletable ghost tasks in `local_thread_catalog` — ([#6784](https://github.com/farion1231/cc-switch/issues/6784)) | Open; PR [#7272](https://github.com/farion1231/cc-switch/pull/7272) cleans `session_index.jsonl` residue |
| **Medium** | Codex resume/revert fragments listed as duplicate incomplete sessions — ([#7273](https://github.com/farion1231/cc-switch/issues/7273)) | Open; PR [#7274](https://github.com/farion1231/cc-switch/pull/7274) groups by thread |
| **Medium** | macOS 13 — provider checks, in-app update, and Codex API calls all fail — ([#6936](https://github.com/farion1231/cc-switch/issues/6936)) | Open |
| **Medium** | Codex Desktop Voice 404 on `/v1/live` during proxy takeover — ([#6959](https://github.com/farion1231/cc-switch/issues/6959)) | Open |
| **Medium** | WSL UNC path: Codex routing fails (`hard_link` `os error 50`) — ([#6679](https://github.com/farion1231/cc-switch/issues/6679)) | Open |
| **Low** | `<think>` block leak into Claude responses via OpenAI Chat upstream — ([#7271](https://github.com/farion1231/cc-switch/issues/7271)) | Open |
| **Low** | Proxy env switch routing failure — ([#7270](https://github.com/farion1231/cc-switch/issues/7270)) | Open |
| **Low** | DeepSeek API fails via VSCode Claude Code plugin on Mac — ([#7277](https://github.com/farion1231/cc-switch/issues/7277)) | Open |

## What This Means for Application Developers

- **If you rely on Codex CLI/Desktop as a downstream client of CC Switch's local proxy, validate on macOS before shipping.** At least three open issues (#7217, #6256, #6936) describe requests bypassing `127.0.0.1:15721`/`15722` and hitting `api.openai.com` directly. PR [#7263](https://github.com/farion1231/cc-switch/pull/7263) should land soon — pin your version or watch the release notes.
- **Cross-app config isolation is not yet airtight.** [#7204](https://github.com/farion1231/cc-switch/issues/7204) and [#7210](https://github.com/farion1231/cc-switch/pull/7210) show Codex retry/timeout fields being clobbered by Claude settings on restart. If you script multi-app configs, export before/after to detect drift.
- **The proxy is becoming a richer transformation layer, not just a forwarder.** System-message conversion ([#7253](https://github.com/farion1231/cc-switch/pull/7253)), `x-opencode-session` stamping ([#7246](https://github.com/farion1231/cc-switch/pull/7246)), and image-edit proxying ([#7177](https://github.com/farion1231/cc-switch/pull/7177)) mean CC Switch can now sit between incompatible SDKs and stable third-party gateways with semantic fixes, not just network rewrites.
- **DeepSeek Harness (DSH) is becoming a supported target.** If you're building on DSH, the `~/.dsh/settings.yaml` writer in [#7244](https://github.com/farion1231/cc-switch/pull/7244) and [#6526](https://github.com/farion1231/cc-switch/pull/6526) is the integration surface to track.
- **Platform caveats:** Windows WebView2 startup blank-screen fix is queued ([#7240](https://github.com/farion1231/cc-switch/pull/7240)); Linux HiDPI/UI scaling ([#4622](https://github.com/farion1231/cc-switch/issues/4622)) and dynamic theme sync on KDE/GNOME ([#6714](https://github.com/farion1231/cc-switch/pull/6714)) still pending. Plan for Linux/WSL edge cases if your team is heterogeneous.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-10

## 1. Today's Highlights

Today's activity in the `QuantumNous/new-api` repository is dominated by **billing/log correctness fixes** and a **legitimate streaming bug** that breaks Claude tool-call JSON on `/v1/messages`. Notably, a significant share of newly-opened issues (8 of 17) were closed as invalid — a mix of AI-coding-agent submissions that bypassed the bug-report template and prior duplicates — so the underlying change surface is smaller than the issue count suggests. Two notable PRs target Gemini routing (`countTokens`) and channel retry priority after auto-disable, both addressing real production pain points.

## 2. Releases & Breaking Changes

*No new releases in the last 24h.* The project remains on the `v1.0.0-rc.36` line (see [#7279](https://github.com/QuantumNous/new-api/issues/7279) for the ongoing discussion on GA criteria).

## 3. New Model & Hardware Support

No new model or backend additions in this window. Work is concentrated on protocol/billing correctness for **already-supported Anthropic and Gemini** paths rather than expanding provider coverage.

## 4. Performance & Optimization

- **Retry logic overhaul — open, in progress.** [#4236](https://github.com/QuantumNous/new-api/issues/4236) requests optimization of upstream retry behavior. No concrete numbers yet; this is a design-stage enhancement.
- **`/api/status` request deduplication — merged in spirit, but PR closed.** [#7189](https://github.com/QuantumNous/new-api/pull/7189) deduplicated `/api/status` polling (related to [#7157](https://github.com/QuantumNous/new-api/pull/7157)); PR was closed as invalid for template reasons, but the underlying optimization landed.
- **Channel key-storage mode switch — open.** [#7196](https://github.com/QuantumNous/new-api/pull/7196) (closes [#7115](https://github.com/QuantumNous/new-api/issues/7115)) allows toggling key storage mode post-creation, reducing operational toil.

## 5. Stability & Regressions

Ranked by severity:

| Severity | Issue / PR | Status | Notes |
|---|---|---|---|
| **High** | [#7302](https://github.com/QuantumNous/new-api/issues/7302) — `/v1/messages` streaming `tool_use.input_json_delta` truncation produces invalid JSON for clients (Claude / Anthropic Messages API path) | Open, no fix PR yet | Re-submission of [#7301](https://github.com/QuantumNous/new-api/issues/7301) with full repro; compare upstream vs. gateway before logging |
| **Medium** | [#7291](https://github.com/QuantumNous/new-api/pull/7291) — Anthropic consume logs omit cached-input tokens, underreporting TPM and total input | Open PR, addresses [#7290](https://github.com/QuantumNous/new-api/issues/7290) | Billing accounting gap; pricing calculations themselves are correct, only the log summary is missing cache tokens |
| **Medium** | [#7296](https://github.com/QuantumNous/new-api/issues/7296) — Tiered/阶梯-pricing log summary incorrectly reports "动态计费 · 无匹配结果" | Open, no fix PR | Amounts are charged correctly; only the human-readable log line is wrong. Related to closed [#7295](https://github.com/QuantumNous/new-api/issues/7295) (expression pricing variant) |
| **Medium** | [#6017](https://github.com/QuantumNous/new-api/issues/6017) — Channel with many associated groups fails on SQL insert (group-in-channel association count exceeds DB param limit) | Open since 2026-07-08, no fix PR | Affects operators managing large group mappings; needs a join-table or batch-insert refactor |
| **Low** | [#6840](https://github.com/QuantumNous/new-api/issues/6840) — Cluster-mode registration shows incorrect captcha/verification code | Open since 2026-08-14 | Self-hosted cluster deployments only |
| **Low** | [#1214](https://github.com/QuantumNous/new-api/issues/1214) — Initial admin username validation rejects edits on the balance page | Closed (community-mod template + resolved) | Documents a known legacy validation quirk in `User.Username` |

Closed-as-invalid items (template violations, agent spam, duplicates) — informational only: [#7297](https://github.com/QuantumNous/new-api/issues/7297), [#7298](https://github.com/QuantumNous/new-api/issues/7298), [#7299](https://github.com/QuantumNous/new-api/issues/7299), [#7300](https://github.com/QuantumNous/new-api/pull/7300), [#7301](https://github.com/QuantumNous/new-api/issues/7301), [#7303](https://github.com/QuantumNous/new-api/issues/7303), [#7293](https://github.com/QuantumNous/new-api/issues/7293), [#7295](https://github.com/QuantumNous/new-api/issues/7295), [#7189](https://github.com/QuantumNous/new-api/pull/7189).

Other open items worth monitoring (no fix PR yet):
- [#7279](https://github.com/QuantumNous/new-api/issues/7279) — request to publish GA criteria for `v1.0.0` (now at `rc.36`).
- [#7263](https://github.com/QuantumNous/new-api/issues/7263) — admin-enforced 2FA for all users (security hardening ask).
- [#7292](https://github.com/QuantumNous/new-api/issues/7292) — per-channel endpoint-type restriction (multi-tenant isolation ask).

## 6. What This Means for Application Developers

- **Streaming Claude/Anthropic tool calls are at risk.** If your agent relies on `/v1/messages` streaming `tool_use` blocks parsed incrementally, you may currently see malformed JSON. Until [#7302](https://github.com/QuantumNous/new-api/issues/7302) is resolved, prefer non-streaming mode for tool-calling, or buffer+validate the full delta before parsing.
- **Anthropic billing telemetry is underreporting cached input.** If you use cached prompts as a cost-control lever, your internal dashboards derived from `new-api` consume logs will not reflect the savings until [#7291](https://github.com/QuantumNous/new-api/pull/7291) merges. Cross-check against upstream token-usage headers or your provider console for the next release.
- **Gemini `countTokens` calls were being routed to `generateContent`.** PR [#7285](https://github.com/QuantumNous/new-api/pull/7285) (closes [#7283](https://github.com/QuantumNous/new-api/issues/7283)) fixes this — operators using Gemini CLI or other clients that legitimately call `countTokens` should pull this once merged; today those requests will not return correct token counts.
- **Channel auto-disable now preserves retry order (once [#7294](https://github.com/QuantumNous/new-api/pull/7294) merges).** Today, when a channel trips the auto-disable threshold, subsequent retries may not honor the configured priority. If you depend on ordered failover for cost or rate-limit reasons, validate behavior after upgrade.
- **Operational scale ceilings remain.** Channels with many group associations can still hit a SQL parameter limit ([#6017](https://github.com/QuantumNous/new-api/issues/6017)). If you are modeling large multi-tenant groups, watch this issue before scaling.
- **Submission hygiene.** A large fraction of today's issues were closed for not following the project's bug-report template (especially AI-agent-generated reports). If you need maintainer attention, mirror the exact section structure required in the template and provide upstream-vs-gateway comparison data — otherwise expect the issue to be closed quickly.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*