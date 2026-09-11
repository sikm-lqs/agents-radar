# AI Infrastructure Digest 2026-09-11

> Generated: 2026-09-11 11:30 UTC | Projects covered: 9

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

**Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth, Claude Code Router (CCR), CC Switch, New API

---

## 1. Ecosystem Overview

The ecosystem is in a heavy model bring-up phase: DeepSeek-V4.x/DSpark, GLM-5.3-Flash, and the Qwen3.5/3.8/Next family dominate activity at every layer, from vLLM's `dsv41-feat` branch merge to gateway catalog updates. Two systemic themes cut across projects: **speculative decoding / MTP correctness** (bugs or fixes in vLLM, SGLang, llama.cpp, Unsloth) and **bumpy Blackwell-variant enablement** (SM120/SM121/GB10 quantization corruption and crash clusters). Gateway-layer work is dominated by billing integrity and Anthropic↔OpenAI↔Responses protocol translation, while Unsloth signals a strategic pivot from fine-tuning tooling toward an agentic platform. llama.cpp was the day's only high-cadence releaser (6 tagged releases); all other projects shipped fixes to `main` only.

---

## 2. Activity Comparison

*Counts are items referenced in today's digests (open + closed), not total repo traffic.*

| Project | Layer | Issues (ref.) | PRs (ref.) | Release status |
|---|---|---|---|---|
| **vLLM** | Serving engine | ~20 | ~20 | None; `dsv41-feat` merged to `main` (#56214) |
| **SGLang** | Serving engine | ~25 (incl. 8 closed) | ~17 | None |
| **llama.cpp** | Local runtime | ~13 | ~22 | **6 releases** (b10902–b10907; 12 builds/24h) |
| **Ollama** | Local runtime + cloud | ~16 | ~10 | None; critical fix merged, unreleased (#18382) |
| **LiteLLM** | Gateway | ~20 (incl. 7 closed) | ~13 | **2 releases** (v1.100.1, v1.102.0-dev.2) |
| **Unsloth** | Fine-tuning / Studio | ~14 | ~16 | None tagged; breaking Docker `2026.9.4` |
| **Claude Code Router** | Client router | ~5 | ~4 | None (v3.0.22) |
| **CC Switch** | Client router | ~26 (incl. ~10 closed) | ~15 | None (v3.20.2 carries a regression) |
| **New API** | Gateway / relay | ~16 | ~12 | None (`v1.0.0-rc.36`) |

**Read:** llama.cpp and CC Switch show the highest fix throughput; vLLM and SGLang show the deepest engineering per PR (kernel-level, multi-GPU topologies); CC Switch and New API carry the largest open backlog relative to project size.

---

## 3. Model Support Race

| Model family | Where it landed today | Maturity signal |
|---|---|---|
| **DeepSeek-V4/V4.1 (DSpark/DFlash)** | vLLM: deepest — KV-only context insert (#55654, #56441), PP prefill targets (#53577), JIT warmup (#56323). SGLang: HiSparse, DeepGEMM MegaMoE (#38700), DeepEP-V2 dispatch. Ollama: cloud-only (#18360). CC Switch: vision-capable `deepseek-flash` catalog (#7286) | **vLLM leads**; but H20 `dsv4_topk` crash caps `max_num_seqs ≤ 256` (#56389) |
| **GLM-5.3-Flash** | vLLM: TP-sharded indexer prefill (#54951) vs. 3 open crash bugs (#54317, #54300, #55434). SGLang: chat-template/tool-call fix (#38297), SM120 tracker (#37813). llama.cpp: **feature request only** (#27922, 15👍). Ollama: cloud reasoning-loop bug (#18193) | **Most-demanded, least-stable** model in the ecosystem today |
| **Qwen3.5/3.8/Next** | vLLM: MTP position fixes (#55390, #56447). SGLang: NVFP4 ModelOpt loader (#38569). llama.cpp: NextN/MTP refactor (#28192). Ollama/Unsloth/CC Switch: streaming, prefill, and routing regressions | Present in **6 of 9 projects** — the de facto compatibility test suite |
| **Quant formats** | vLLM: FP8-K/NVFP4-V mixed KV cache (#53770). SGLang: NVFP4 + FP8 PLE/MTP mixed precision | NVFP4 consolidating as the Blackwell checkpoint standard |
| **Long tail** | llama.cpp: Maple 20B ternary MoE (#27000), Ling 3.0 parser. SGLang: SenseNova-U1 NPU batching. vLLM: TeleChat3-YaRN. Unsloth: Ascend NPU RFC (#10772) | llama.cpp uniquely absorbs niche/CN-market architectures |

**Verdict:** vLLM and SGLang lead frontier-model serving depth; llama.cpp leads hardware/architecture breadth; Ollama leads distribution reach (cloud + consumer); gateways trail by design, absorbing models via catalog and translation fixes only.

---

## 4. Performance Frontier

- **KV-cache compression** is the hottest kernel surface: vLLM's 12.5-bit/token FP8-K + NVFP4-V mixed dtype (#53770), SGLang's NVFP4 KV roadmap (#29913), and HiCache L2/L3 host-tier offload events (#38486). Counter-signal: llama.cpp's 4-bit KV **silently falls back to CPU (~30× slowdown)** with default builds (#28633).
- **Disaggregated P/D serving**: vLLM adds PP prefill targets and EPLB migration batching, but NIXL hits a descriptor-scaling wall on GB200 (91k–120k descriptors/transfer, #55434) — a control-plane, not bandwidth, bottleneck. SGLang attacks bootstrap latency (#38959) and DeepEP-V2 prefill dispatch.
- **Kernel fusion**: concentrated on AMD — vLLM's AITER QuickReduce+RMSNorm and DSA indexer prologue (4 kernels → 1); SGLang's coordinated 3-PR AMD DSA prefill series. llama.cpp fuses across CUDA (Q4_K Gate/Up+SwiGLU), Vulkan (topk_moe, small-M matmul), and HIP (RDNA4 FA).
- **Host-side/scheduler**: vLLM vectorizes causal-conv1d metadata and de-JITs DeepSeek-V4; SGLang budgets spec-decode KV pools by `attn_tp_size` (#38203); llama.cpp ships GDN chunked prefill (#26001).
- **Notable drag**: a meaningful share of "performance" effort is actually correctness remediation on Blackwell variants (Marlin W4A8-FP8 silent corruption on GB10, UE8M0 requant skip on SM120), consuming cycles that would otherwise go to throughput.

---

## 5. Layer Positioning

- **Serving engines (vLLM, SGLang):** scale-out inference — TP/PP/EP topologies, disaggregation, MoE and sparse-attention kernels. vLLM optimizes for breadth and fleet features (Prometheus NIXL compatibility gauges, #52999); SGLang differentiates on agentic/long-context stack (HiCache, session-aware router #25760) and non-text modalities (diffusion).
- **Local runtimes (llama.cpp, Ollama):** llama.cpp is the cross-vendor kernel foundation (CUDA/HIP/Vulkan/SYCL/Metal/OpenCL/CPU-SIMD) whose fixes propagate downstream; Ollama wraps it (plus MLX, now first-class) for consumer UX and adds a managed cloud tier — today's critical cloud-proxy fix (#18382) shows the operational weight of that tier.
- **Gateways (LiteLLM, New API):** LiteLLM is the enterprise control plane (security, cost attribution, guardrails — including a closed privilege-escalation #31580 and silent under-billing fix #30383); New API is the multi-vendor relay/quota plane, still pre-GA (`rc.36`) and grinding through translation and panic-class bugs.
- **Client-side routers (CCR, CC Switch):** coding-agent specialists whose entire bug surface is protocol translation (Anthropic thinking blocks vs. Responses API reasoning items; split assistant turns vs. Chat Completions) — the same failure class recurring in both projects independently.
- **Fine-tuning (Unsloth):** efficiency tooling (Triton kernels, NVML probing) plus a visible product pivot: Skills, Memory, Agent Builder, and multi-agent orchestration requests define a platform ambition beyond LoRA training.

---

## 6. Trend Signals

1. **MTP/speculative decoding is the ecosystem's #1 correctness risk.** Independent bugs in vLLM (#55533 concurrency collapse), SGLang (#39072 disagg+spec crash), llama.cpp (inter-request contamination #26425; quantized-target divergence #25618), and Unsloth's GGUF reload state loss (#9037). If you need reproducible or deterministic outputs, treat spec decoding as opt-in, not default — llama.cpp's divergence on Q4_K_M targets is unresolved.
2. **"Silent failure" is the dominant bug class at every layer**: silent token corruption (vLLM Marlin), silent under-billing (LiteLLM #30383), silent `tool_calls` drops (Ollama #18357, LiteLLM #40582), silent CPU fallback (llama.cpp #28633), silently dropped spend rows. Budget for explicit-warning/observability work in your own stack.
3. **Blackwell consumer/edge (SM120/SM121/GB10) is the new instability frontier** — quantization kernels there are shipping with correctness bugs, not just perf gaps. Qualify per-GSKU, not per-architecture.
4. **Agentic workloads are reshaping infrastructure roadmaps**: SGLang's session-aware router and distributed KV cache, vLLM's prefix-cache and tool-template fixes, Unsloth's platform pivot, and the gateway translators' tool-call merge rules (CC Switch #7280 is the reference implementation).
5. **Non-CUDA investment is accelerating**, partly China-market-driven: ROCm/AITER fusion series, SenseNova NPU and Ascend RFCs, TeleChat3, plus llama.cpp's Vulkan/SYCL/OpenCL breadth.
6. **AI-agent-authored contributions now generate material triage noise** (New API explicitly notes bot-closed invalid issues) — expect repo signal-to-noise to degrade across the ecosystem.

**Immediate operator actions:** pin Ollama ≤0.33.1 until #18382 ships; pin Unsloth Docker pre-`2026.9.4` (`max_seq_length` break); cap `max_num_seqs=256` for DeepSeek-V4.1-Flash on H20; avoid GLM-5.3-Flash with disagg+DP-attention+spec on SGLang; pin `ray==2.48.0` for vLLM multi-node; treat cost dashboards at CCR and LiteLLM (`max_budget` #40020 still open) as advisory until patched.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-11

## 1. Today's Highlights

The past 24 hours were dominated by **DeepSeek-V4 / DSpark** and **GLM-5.3-Flash** performance work, with a cluster of TP-sharded prefill, KV-only context insert, and PP-target PRs landing or rebasing onto `main` after `dsv41-feat` merged. On the stability side, multiple high-impact bugs surfaced around **DGX Spark (GB10/sm_121) quantization correctness**, **GLM-5.3-Flash CUDA illegal memory access on 4×B200**, and **DeepSeek-V4.1-Flash dsv4_topk crash on H20** — all with concrete config workarounds. A new **SageAttention (SAGE_ATTN) attention backend** PR was also opened for explicit `–attention-backend` routing.

## 2. Releases & Breaking Changes

No new releases in the last 24 hours. Notable upstream merges that change baselines:
- `dsv41-feat` branch merged into `main` via #56214 on 2026-09-11 — enables the resubmission chain for DSpark/DSv4.1 work (e.g. #56441). Operators on `main` should expect DeepSeek-V4.1-Flash paths to become available.

## 3. New Model & Hardware Support

- **SageAttention backend (NVIDIA)** — PR [#55732](https://github.com/vllm-project/vllm/pull/55732) integrates [SageAttention PR #402](https://github.com/thu-ml/SageAttention/pull/402) (seqlens + paged KV decode) as an explicit `--attention-backend SAGE_ATTN` path. Author-validated on stack; needs rebase.
- **FP8-K / NVFP4-V KV cache** — PR [#53770](https://github.com/vllm-project/vllm/pull/53770) adds a compact `--kv-cache-dtype fp8_k_nvfp4_v` through FlashInfer TRTLLM-Gen (12.5 bits/token). New quantization format with zero-copy K/V views.
- **GLM-5.3-Flash shard long-context indexer prefill across TP** — PR [#54951](https://github.com/vllm-project/vllm/pull/54951): partitions sparse-indexer query rows into cost-balanced slices with `all_gatherv` reassembly.
- **DSpark PP prefill in disaggregated serving** — PR [#53577](https://github.com/vllm-project/vllm/pull/53577) supports pipeline-parallel prefill targets (plus padded graph batch safety).
- **TeleChat3-YaRN folded into plain YaRN** — PR [#56446](https://github.com/vllm-project/vllm/pull/56446) collapses a vendor rope_type copy back into Transformers' standard YaRN path, unlocking existing YaRN guards.
- **ROCm/AITER QuickReduce + RMSNorm fusion** — PR [#48249](https://github.com/vllm-project/vllm/pull/48249) routes fused prefill calls through AITER's QR+RMSNorm fused kernel (AITER #4104).
- **AITER DSA indexer prologue fusion** — PR [#51315](https://github.com/vllm-project/vllm/pull/51315) replaces 4 separate indexer kernels (K-norm, Q/K RoPE, FP8 quant, K-cache write) with one fused kernel.

## 4. Performance & Optimization

- **DSpark KV-only context insert + fused kv_norm** — PR [#55654](https://github.com/vllm-project/vllm/pull/55654): DSpark context-KV write becomes 1× KV-only GEMM + 3× fused `kv_norm`+RoPE+quant+insert (was 3× Q+KV GEMM + 3× standalone `kv_norm` + dummy-Q insert).
- **DSpark KV-only context insertion across V4.1 cache formats** — PR [#56441](https://github.com/vllm-project/vllm/pull/56441) (resubmission of #56320 now that `dsv41-feat` is on `main`).
- **Vectorize causal-conv1d metadata offsets** — PR [#55469](https://github.com/vllm-project/vllm/pull/55469) eliminates the per-sequence Python `extend(range(...))` loop in `compute_causal_conv1d_metadata`; host-side cost drops with prefill batch size.
- **ROCm: skip cleaning sparse prefill MQA logits** — PR [#51314](https://github.com/vllm-project/vllm/pull/51314) passes `clean_logits=False` to AITER, removing a per-step FP32 `-inf` fill.
- **EPLB contention-aware expert migration batching** — PR [#52641](https://github.com/vllm-project/vllm/pull/52641) coalesces expert migrations by directed rank pair (peer limit = 1) to limit concurrent NIC traffic during async inference. Partially addresses #31671.
- **DSpark JIT warmup migration (sampling + DFlash)** — PR [#56323](https://github.com/vllm-project/vllm/pull/56323) continues the de-JITification track (#49349) for DeepSeek-V4.
- **Batch Invariant performance tracking** — issue [#27433](https://github.com/vllm-project/vllm/issues/27433) (107 likes-region activity) continues collecting follow-up work for batch-invariant inference per the Thinking Machines blog.
- **MLARoPE KV cache cat fusion manual port** — issue [#43504](https://github.com/vllm-project/vllm/issues/43504): port `MLARoPEKVCacheCatFusionPass` to manual fusion.
- **TP MoE torch.compile collective optimization** — issue [#29139](https://github.com/vllm-project/vllm/issues/29139) still open: sequence-parallel collectives in MoE under torch.compile.
- **CustomOp cleanup** — issue [#19817](https://github.com/vllm-project/vllm/issues/19817) for CompilationConfig defaults across Blackwell/AMD.

## 5. Stability & Regressions

**High severity (operational impact):**
- **[GLM-5.3-Flash] CUDA illegal memory access on 4×B200** — issue [#54317](https://github.com/vllm-project/vllm/issues/54317): recurs in three unrelated kernels (KDA linear-attention, MHC TileLang, TRT-LLM fused MoE) on `vllm-openai:glm53-flash-x86_64-cu130` (0.1.dev20051+g487ecf187). No fix PR yet.
- **[DeepSeek-V4.1-Flash] Triton `dsv4_topk` illegal memory access on 8×H20 under high concurrency** — issue [#56389](https://github.com/vllm-project/vllm/issues/56389): **mitigated by setting `max_num_seqs=256`**. Fresh today.
- **[GLM-5.3 / GlmMoeDsa] Regression 0.27→0.28+ with decode-context-parallel** — issue [#54300](https://github.com/vllm-project/vllm/issues/54300): 0.28.0 crashes, 0.29.0 silently returns random tokens on AMD ROCm.
- **[Qwen3.8-Flash-Next] Long-prefill workload starves active decode 3–7 minutes on 2-node DGX Spark TP2** — issue [#54919](https://github.com/vllm-project/vllm/issues/54919).
- **[Hybrid GDN + MTP] Scheduler runs only ~3 concurrent sequences at batch ≥ 4** — issue [#55533](https://github.com/vllm-project/vllm/issues/55533): acceptance/throughput collapse for Qwen3.5/Qwen3.8 27B-class.
- **0.28.0/0.29.0 host-memory OOM at start** — issue [#54237](https://github.com/vllm-project/vllm/issues/54237): freezes on Ubuntu 26.04.1; 0.27.1 OK.
- **[GLM-5.3 P/D on GB200] NIXL submits 91k–120k KV descriptors per rank-transfer** — issue [#55434](https://github.com/vllm-project/vllm/issues/55434): MNNVL/cuda_ipc now slower than RDMA on this workload (descriptor-bound, not bandwidth-bound).

**Medium severity (correctness):**
- **DGX Spark / sm_121: Marlin W4A8-FP8 silent corruption** — issue [#49546](https://github.com/vllm-project/vllm/issues/49546): `VLLM_MARLIN_INPUT_DTYPE=fp8` kernel runs ~2.5% faster than baseline while emitting repeated `</think>` loops at temp 0 — strong signal of a kernel-level bug. **Avoid Marlin W4A8-FP8 on GB10 until fixed.**
- **DGX Spark / sm_121: stale Triton kernel cache produces garbled outputs** — issue [#41871](https://github.com/vllm-project/vllm/issues/41871) (closed): wipe `~/.triton/cache` to recover. Useful mitigation note for ops.
- **DGX Spark / sm_121: FP8 MoE crashes in Triton `fused_moe` (SM120/RTX PRO 6000 Blackwell)** — issue [#45101](https://github.com/vllm-project/vllm/issues/45101): `VLLM_MOE_FORCE_MARLIN=1` not honored; "Unsupported lhs dtype fp8e4nv" assertion.
- **DFlash2 + YaRN: zero prefix-cache reuse on identical 1.04M prompts** — issue [#54094](https://github.com/vllm-project/vllm/issues/54094): target-only reuses ~1.039M tokens; combined path reuses 0.
- **Sleep-mode leaks HBM for `--mm-encoder-tp-mode data`** — issue [#47654](https://github.com/vllm-project/vllm/issues/47654) (closed): blocks multi-container sleep-swap.
- **`VLLM_MEMORY_PROFILER_ESTIMATE_CUDAGRAPHS` overestimates memory (lowers KV cache space)** — issue [#45178](https://github.com/vllm-project/vllm/issues/45178) (closed).
- **MTP speculative decoding breaks thinking token budget** — issue [#39573](https://github.com/vllm-project/vllm/issues/39573) (closed): works correctly without MTP.
- **Mistral3 (HF format) multimodal profiling failure** — issue [#50706](https://github.com/vllm-project/vllm/issues/50706) (closed).
- **Ray executor fails on ray 2.55.1** — issue [#45318](https://github.com/vllm-project/vllm/issues/45318): pin to `ray==2.48.0` (matches vLLM's CI lockfile) as workaround.

**Fix PRs landing today:**
- PR [#56447](https://github.com/vllm-project/vllm/pull/56447) — GLM-OCR MTP position masking during CUDA graph capture.
- PR [#55390](https://github.com/vllm-project/vllm/pull/55390) — annotate MTP draft KV cache groups positionally on the hybrid grouping path (Qwen3.5, Qwen3-Next).
- PR [#56446](https://github.com/vllm-project/vllm/pull/56446) — TeleChat3-YaRN folding.
- PR [#56372](https://github.com/vllm-project/vllm/pull/56372) — Qwen3-VL modality-scoped `mm_processor_kwargs` (images_kwargs/videos_kwargs).
- PR [#56017](https://github.com/vllm-project/vllm/pull/56017) — warn when serving original Qwen3 reranker without chat template.
- PR [#55326](https://github.com/vllm-project/vllm/pull/55326) — multimodal parser now correctly treats a list of decoded NumPy/PyTorch frames as a single video.

## 6. What This Means for Application Developers

- **DGX Spark / GB10 (sm_121) operators:** treat all quantization paths on this hardware as suspect today. Specifically avoid `VLLM_MARLIN_INPUT_DTYPE=fp8` (W4A8-FP8) entirely; pin `ray==2.48.0` for multi-node; and `rm -rf ~/.triton/cache` if you see garbled tokens across restarts. The Triton `fused_moe` FP8 assertion on SM120 (RTX PRO 6000 Blackwell) remains open.
- **DeepSeek-V4.1-Flash on H20:** keep `max_num_seqs ≤ 256` until the `dsv4_topk` illegal-memory-access in issue [#56389](https://github.com/vllm-project/vllm/issues/56389) is resolved. This is the single most actionable config knob from today's issues.
- **GLM-5.3-Flash on B200 / GB200:** several open stability issues (illegal memory access, NIXL descriptor explosion on P/D). If you're running EPD disaggregation on GB200, expect NIXL/MNNVL to underperform RDMA until the descriptor overhead is addressed (issue [#55434](https://github.com/vllm-project/vllm/issues/55434)).
- **Rolling-upgrade-aware routers:** PR [#52999](https://github.com/vllm-project/vllm/pull/52999) exposes a `vllm:nixl_config_info` Prometheus gauge with the NIXL compatibility hash. Worth wiring into your scheduler/router now so P/D pod pairing survives mixed-version deploys.
- **Speculative decoding on Qwen3.5/Qwen3.8 hybrid-GDN:** known scheduler bug caps effective concurrency at ~3 sequences under MTP (issue [#55533](https://github.com/vllm-project/vllm/issues/55533)). Either disable MTP or hold on hybrid-GDN deployments until a fix lands.
- **Performance headroom worth tracking:** the DSpark KV-only context insert (PR [#55654](https://github.com/vllm-project/vllm/pull/55654)) and TP-sharded GLM-5.3 indexer prefill (PR [#54951](https://github.com/vllm-project/vllm/pull/54951)) are both staged for merge and directly target long-context prefill costs — if you serve either model family, plan a re-benchmark after they land on `main`.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-11

## Today's Highlights

The dominant theme is **scaling the serving stack for agentic and large-context workloads**: the Distributed KVCache System roadmap ([#21846](https://github.com/sgl-project/sglang/issues/21846)) remains the highest-thumbs-up tracking issue, while the new lightweight SessionAware Router ([#25760](https://github.com/sgl-project/sglang/issues/25760)) advances the PD-disaggregation roadmap. On the hardware side, AMD DSA/AITER prefill landed a coordinated three-PR fix for FP8 KV caches and metadata reuse ([#39083](https://github.com/sgl-project/sglang/pull/39083), [#39085](https://github.com/sgl-project/sglang/pull/39085), [#39084](https://github.com/sgl-project/sglang/pull/39084)), and a fresh NPU track for SenseNova-U1 batching opened ([#39076](https://github.com/sgl-project/sglang/pull/39076)).

## Releases & Breaking Changes

No new releases in the last 24h. Notable behavioral tightening landed or in flight:

- [#38338](https://github.com/sgl-project/sglang/pull/38338) — `--default-chat-template-kwargs` no longer outranks a per-request `reasoning_effort` (production-reported regression fix).
- [#38936](https://github.com/sgl-project/sglang/pull/38936) — Disables NCCL graph buffer registration for the TP LM-head all-to-all, resolving a pure-DP decode hang under request bursts.
- [#38297](https://github.com/sgl-project/sglang/pull/38297) — Auto-detects GLM-5.3 chat templates as `glm45/glm47`; previously resolved to `deepseek-r1` and broke tool calling (0/200 in replay).

## New Model & Hardware Support

- **SenseNova-U1/U1.5** — feature/performance tracking opened ([#37742](https://github.com/sgl-project/sglang/issues/37742)) with NPU request-batching + fused denoise ([#39076](https://github.com/sgl-project/sglang/pull/39076)).
- **GLM-5.3-Flash on SM120** (2× RTX PRO 6000 Blackwell, TP2, W4A16 routed experts, FP8 KV, MTP) — integration tracker [#37813](https://github.com/sgl-project/sglang/issues/37813).
- **Qwen3.8-Flash-Next-NVFP4** — ModelOpt `MIXED_PRECISION` (NVFP4 routed experts + FP8 PLE n-gram + FP8_BLOCK_SCALES MTP) loader added ([#38569](https://github.com/sgl-project/sglang/pull/38569)); FP8 launch bug on H20 8-card closed ([#38793](https://github.com/sgl-project/sglang/issues/38793)).
- **Qwen4 GB10 / DGX Spark** — file-backed PLE offload with TP prefetch fix ([#38570](https://github.com/sgl-project/sglang/pull/38570)).
- **DeepEP-V2 expanded dispatch** — faster prefill path ([#37261](https://github.com/sgl-project/sglang/pull/37261)).
- **NVSHMEM → 3.7.2** — required for `NVSHMEM_IB_GID_INDEX` on restrictive IB fabrics ([#38769](https://github.com/sgl-project/sglang/issues/38769)).
- **NVFP4 KV cache** — roadmap tracker moved forward ([#29913](https://github.com/sgl-project/sglang/issues/29913)).
- **Setwise scoring** in Score API — caller-chosen extraction token for SequenceClassification ([#38965](https://github.com/sgl-project/sglang/pull/38965)).
- **Per-role attention backend override** for diffusion ([#35310](https://github.com/sgl-project/sglang/pull/35310)).
- **FLUX.2** — `sage_attn` backend regression since #22423 (whitelist exclude); reported today ([#39070](https://github.com/sgl-project/sglang/issues/39070)).

## Performance & Optimization

- **AMD DSA prefill** — three coordinated PRs cut memory + CPU overhead: avoid wide page-table expansion in chunked DSA prefill ([#39084](https://github.com/sgl-project/sglang/pull/39084)), fix AITER integration with FP8 KV ([#39083](https://github.com/sgl-project/sglang/pull/39083)), and reuse AITER metadata across layers ([#39085](https://github.com/sgl-project/sglang/pull/39085)).
- **HiCache UnifiedRadixCache** — publish a host-store event on L2/L3 storage-prefetch refills ([#38486](https://github.com/sgl-project/sglang/pull/38486)); enable `@rank_consensus` across hicache/unified-radix tests ([#37425](https://github.com/sgl-project/sglang/pull/37425)).
- **Spec decoding** — DFLASH/DSPARK draft KV pool now budgeted by `attn_tp_size`, fixing OOM on Kimi-K3 under DP attention ([#38203](https://github.com/sgl-project/sglang/pull/38203)).
- **HiSparse (DeepSeek V4)** — corrected inflated full-token usage at startup ([#30909](https://github.com/sgl-project/sglang/pull/30909)).
- **DeepGEMM MegaMoE (DSV4)** — feature to fuse shared → sparse experts ([#38700](https://github.com/sgl-project/sglang/issues/38700)).
- **PD disaggregation bootstrap** — WIP to reduce consensus latency ([#38959](https://github.com/sgl-project/sglang/pull/38959)).
- **Diffusion** — direct O_DIRECT reads for mapped layers when the host cannot cache them ([#39022](https://github.com/sgl-project/sglang/pull/39022)).
- **Triton / radix router** — wait on PDL dependency before loading router bias ([#38568](https://github.com/sgl-project/sglang/pull/38568)).
- **Constrained decoding in TP** — open feature to reduce overhead ([#13809](https://github.com/sgl-project/sglang/issues/13809)).
- **sgl_kernel flash_attn** — `is_fa3_supported()` accepts sm_89 but ships no sm_89 cubin; `ver` argument ignored (regression risk on Ada, e.g. RTX 4080 SUPER) ([#38980](https://github.com/sgl-project/sglang/issues/38980)).

## Stability & Regressions

CI health (per [#17050](https://github.com/sgl-project/sglang/issues/17050), auto-update 2026-09-11 11:15 UTC): **2 broken, 8 flaky, 989 recently fixed** — broadly stable but a small set of persistent flakes remains. The CUDA coredump tracker ([#26340](https://github.com/sgl-project/sglang/issues/26340)) remains the highest-volume artifact collector.

Fresh bugs reported today (sorted by likely blast radius):

1. **[Bug, GLM-5.3] crash on disagg decode + dp-attention + spec decode** — [#39072](https://github.com/sgl-project/sglang/issues/39072). High severity: blocks a flagship serving topology; no fix PR yet.
2. **[Bug, SM120 grouped FP8 DeepGEMM] weight prep skips UE8M0 requantization** — [#39063](https://github.com/sgl-project/sglang/issues/39063). Correctness risk on Blackwell GeForce.
3. **[Bug, regression since #36228] `is_musa()` graph-breaks TorchDynamo (gb0069)**, killing `tc_piecewise` prefill CUDA-graph capture — [#39054](https://github.com/sgl-project/sglang/issues/39054). Re-introduced by the CP v1 deprecation series.
4. **[Bug, FLUX.2 + sage_attn] regression since #22423** — model whitelist excludes `SAGE_ATTN` — [#39070](https://github.com/sgl-project/sglang/issues/39070).
5. **[Bug, encoder-decoder KV cache] shared boundary page double-freed when `page_size > 1`** — [#38840](https://github.com/sgl-project/sglang/issues/38840). Memory-safety bug; needs urgent triage.
6. **[Bug, multimodal processor] fatal lookup errors omit processor import failures**, hiding root cause — [#39073](https://github.com/sgl-project/sglang/issues/39073).
7. **[Bug] `UnifiedRadixCache` L3 never consulted when a prefix survives only as backuped stubs after host-tier eviction** — [#38452](https://github.com/sgl-project/sglang/issues/38452). Functional regression in HiCache prefetch path.

Closed (inactive) since yesterday — these were either already auto-rotated or quickly resolved:
- Stop regex tail-buffer bound mis-treating single-char negated classes ([#30932](https://github.com/sgl-project/sglang/issues/30932))
- `minilb` missing `abort_request` proxy ([#30955](https://github.com/sgl-project/sglang/issues/30955))
- PD disagg missing handoff token in reasoning usage ([#32897](https://github.com/sgl-project/sglang/issues/32897))
- Uppercase `--log-level` (e.g. `WARN`) hanging HTTP server ([#30353](https://github.com/sgl-project/sglang/issues/32897))
- Sampling masks without finite top-k ([#35765](https://github.com/sgl-project/sglang/issues/35765))
- Step3-VL / DeepSeek-OCR2 JPEG path with GPU tensor decode ([#24699](https://github.com/sgl-project/sglang/issues/24699))
- `TokenizerManager` reporting deleted state when passing token ids ([#15486](https://github.com/sgl-project/sglang/issues/15486))
- Build-without-CUDA request ([#30931](https://github.com/sgl-project/sglang/issues/30931))

CI/infra trackers also updated: AMD PR-test failure tracker ([#37451](https://github.com/sgl-project/sglang/issues/37451)).

## What This Means for Application Developers

- **Production stability is the headline risk today.** If you serve GLM-5.3 with PD disaggregation + DP-attention + spec decoding, **do not upgrade** until [#39072](https://github.com/sgl-project/sglang/issues/39072) is fixed; and on Blackwell GeForce / SM120 grouped-FP8 paths, pin a build before [#39063](https://github.com/sgl-project/sglang/issues/39063) is resolved.
- **CUDA-graph capture can silently break.** The `is_musa()` TorchDynamo break ([#39054](https://github.com/sgl-project/sglang/issues/39054)) means `tc_piecewise` prefill capture no longer works on the current `main` — if you depend on graph capture for prefill latency, stay on a pre-`b6c31b155c` commit or vendor a fix.
- **Tool-calling on GLM-5.3 is now reliable** with [#38297](https://github.com/sgl-project/sglang/pull/38297) — auto-detection now picks the correct `glm45/glm47` parsers, so the silent 0/N tool-call failure should be gone after upgrade.
- **Agentic / long-context deployments** should watch the Distributed KVCache System roadmap ([#21846](https://github.com/sgl-project/sglang/issues/21846)) and HiCache’s L2/L3 event channel ([#38486](https://github.com/sgl-project/sglang/pull/38486)) — these will define the next tier of cache offload and observability for prefix-heavy agent traces.
- **NVFP4 + ModelOpt MIXED_PRECISION** is now first-class via [#38569](https://github.com/sgl-project/sglang/pull/38569); expect Qwen3.8-Flash-Next-NVFP4 to become the recommended checkpoint for Blackwell-class hardware.
- **InfiniBand operators**: plan to bundle NVSHMEM 3.7.2 once [#38769](https://github.com/sgl-project/sglang/issues/38769) lands — GID-index pinning is required on many restrictive IB fabrics.
- **Score API** gains setwise extraction ([#38965](https://github.com/sgl-project/sglang/pull/38965)) — useful for reranking pipelines that want a head read at every separator token rather than only the final position.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-11

## Today's Highlights

A heavy day of speculative-decoding and MTP (Multi-Token Prediction) remediation. The team shipped six releases (b10902–b10907) that fix KV-cache allocation for DeepSeek2/GLM4MoE/Cohere2MoE MTP layers, repair server-side speculation position tracking after image inputs, and land a wave of AMD HIP Flash Attention tuning for RDNA4 (gfx1201). Vulkan and SYCL stability work continues in parallel with the new SYCL graph record/replay port and a Vulkan topk_moe prefill fusion.

## Releases & Breaking Changes

Twelve builds shipped in the last 24 hours. Notable user-visible ones:

- **[b10907](https://github.com/ggml-org/llama.cpp/releases/tag/b10907)** — `model`: fix MTP context KV cache allocation for DeepSeek2, GLM4MoE, Cohere2MoE (#28626/#28630). Adds inverse-architecture gating and comprehensive architecture testing for the MTP layer filter. **Practical impact:** expect cleaner state isolation when serving these MoE MTP models in multi-request workloads.
- **[b10906](https://github.com/ggml-org/llama.cpp/releases/tag/b10906)** — `server`: fix speculation after an image (#28715). Passes the actual position to the drafter after image tokens instead of token count; renames draft `n_past` → `pos0`. Fixes vision-model throughput regressions reported against DFlash and likely affects every speculative drafter.
- **[b10905](https://github.com/ggml-org/llama.cpp/releases/tag/b10905)** — HIP Flash Attention tuning for gfx1201 (RDNA4) (#28102): enables MMA FA for head size 256, prefers whole-tile FA grids over stream-k on AMD WMMA, revised stream-k logic.
- **[b10903](https://github.com/ggml-org/llama.cpp/releases/tag/b10903)** — Vulkan: fix data race and OOB access in `argsort(large)` (#28705); surfaced by VVL.
- **[b10902](https://github.com/ggml-org/llama.cpp/releases/tag/b10902)** — OpenCL: A8 Q4_0 mm binary kernel added (#28268).
- **[b10900](https://github.com/ggml-org/llama.cpp/releases/tag/b10900)** — Vulkan: enables `add_alloc_dep` to unlock topk_moe fusion during prefill (#28422).
- **[b10899](https://github.com/ggml-org/llama.cpp/releases/tag/b10899)** — Vulkan: small-M matrix-multiplication optimizations targeting Qwen (#28457); small-vs-medium tile selection for coopmat2 now depends on M, not just N.
- **[b10897](https://github.com/ggml-org/llama.cpp/releases/tag/b10897)** — CI: Windows-on-ARM CUDA builds moved from 13.4 dev preview to 13.4.1 GA redistributables (#28687).

No deprecations or CLI-breaking changes were introduced.

## New Model & Hardware Support

- **Maple 20B-A1B (DeepGrove ternary MoE)** — initial CPU architecture PR open: [#27000](https://github.com/ggml-org/llama.cpp/pull/27000). 24 layers, 256 experts / 8 active, SWA-512 interleaved 3:1 with global attention, ternary weights via TQ1_0/TQ2_0.
- **Ling 3.0 (Bailing V3)** — dedicated chat parser PR [#28682](https://github.com/ggml-org/llama.cpp/pull/28682) to handle pre-opened ``.
- **GLM5.3 (flash)** — feature request [#27922](https://github.com/ggml-org/llama.cpp/issues/27922) (15 👍, trending).
- **Qwen NextN/MTP refactor** — [#28192](https://github.com/ggml-org/llama.cpp/pull/28192) moves `LLM_KV_NEXTN_PREDICT_LAYERS` loading out of the generic `llama_model_base::load_hparams` path into Qwen3.5, Qwen3.5 MoE, and Qwen3-Next architecture handlers.
- **Metal/MoE** — PR [#28301](https://github.com/ggml-org/llama.cpp/pull/28301) makes `kernel_mul_mm_id` skip the empty half of the token tile and loads iq2/iq3 codebooks as `uint32`.
- **CPU/SIMD** — s390x Q4_0 repack ([#28667](https://github.com/ggml-org/llama.cpp/pull/28667)) lands: ~1.60× prompt processing, ~1.10× token generation vs. plain dot. ARM Q1_0 4×4 and 4×8 NEON/DP/I8MM repack kernels ([#23492](https://github.com/ggml-org/llama.cpp/pull/23492)) for Bonsai LLM.
- **SYCL graph record/replay** — port of CUDA graphs ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725)).

## Performance & Optimization

- **CUDA GDN chunked prefill** — [#26001](https://github.com/ggml-org/llama.cpp/pull/26001) adds a chunked mode to the Gated Delta Net operator; significant prefill speedup at ≥128 tokens versus the recurrent token-by-token kernel.
- **CUDA Q4_K fused Gate/Up + SwiGLU prefill** — [#28702](https://github.com/ggml-org/llama.cpp/pull/28702): one Q8_1 quantize pass, single fused kernel for both projections, SwiGLU after the full K reduction. Removes duplicate activation quantization and FP32 round-trips.
- **HIP Flash Attention (RDNA4 / gfx1201)** — [#28102](https://github.com/ggml-org/llama.cpp/pull/28102): MMA FA enabled for head size 256, prefers whole-tile grids over stream-k on AMD WMMA, revised stream-k logic. AI-assisted (Claude + Codex).
- **Vulkan topk_moe prefill fusion** — `add_alloc_dep` plumbing ([#28422](https://github.com/ggml-org/llama.cpp/pull/28422)) unblocks an MoE prefill fusion path on Vulkan.
- **Vulkan small-M matmul** — [#28457](https://github.com/ggml-org/llama.cpp/pull/28457): `m=1` mul_mat swap, split_k allowed for small M, M-aware tile selection for coopmat2. Targets Qwen prefill/decode paths.
- **Vulkan CPU-writes for async tensor copies** — [#28618](https://github.com/ggml-org/llama.cpp/pull/28618): uses CPU writes when the Vulkan context is idle, reducing GPU sync overhead.
- **Vulkan sparse Flash Attention** — [#28105](https://github.com/ggml-org/llama.cpp/pull/28105) (paired with ggml PR #27970).
- **CPU Kronecker product** — [#28490](https://github.com/ggml-org/llama.cpp/pull/28490): supports non-power-of-two dimensions; cleans SYCL test special-casing.

## Stability & Regressions

Sorted by severity. ★ = fix PR exists.

- ★ **MTP inter-request state contamination on Qwen3.6-35B-A3B-MTP** — [#26425](https://github.com/ggml-org/llama.cpp/issues/26425). State from prior requests retained in MTP buffers causes non-deterministic outputs and quality degradation. Related KV-cache allocation fix landed in b10907.
- ★ **MTP CUDA lockups under `--split-mode tensor`** — [#27122](https://github.com/ggml-org/llama.cpp/issues/27122) (RTX 5070TI + RTX 3060TI, Qwen3.8-27B). Reproducible; same Qwen NextN/MTP family touched by [#28192](https://github.com/ggml-org/llama.cpp/pull/28192).
- ★ **Speculative decoding divergence on quantized targets** — [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) (23 comments). Greedy sampling with draft-mtp / draft-dspark produces different text than non-speculative runs on Q4_K_M targets; bf16 matches. Ngram speculation on the same target is unaffected. **High severity for any application that requires reproducible output.**
- ★ **Server speculation position bug after image input** — [#28715](https://github.com/ggml-org/llama.cpp/pull/28715) fixes a vision-input throughput regression (already landed in b10906).
- **Vulkan crashes on Intel B70 with MoE (Qwen3.6-35B-A3B-MTP)** — [#23769](https://github.com/ggml-org/llama.cpp/issues/23769) (stale, 11 comments).
- **Vulkan garbage output on Intel Arc 140V (Windows)** — [#28648](https://github.com/ggml-org/llama.cpp/issues/28648), depends on batch settings; reproduces across b10831–b10865.
- **Vulkan validation error VUID-10167 on Intel B70 Linux** — [#28590](https://github.com/ggml-org/llama.cpp/issues/28590); cooperative-matrix flexible-dimensions violation.
- **Gemma4 infinite generation on gfx1151 (Strix Halo, HIP, Windows)** — [#26239](https://github.com/ggml-org/llama.cpp/issues/26239); `<unused49>` token causes runaway output on long prompts.
- **qwen4exp graph-builder abort on DGX Spark (SM121)** — [#27780](https://github.com/ggml-org/llama.cpp/issues/27780); `ggml_abort` under sustained load.
- ★ **SYCL oneDNN scratchpad pool-order crash** — [#28660](https://github.com/ggml-org/llama.cpp/issues/28660) on Intel Arc Pro B70; fix PR [#28704](https://github.com/ggml-org/llama.cpp/pull/28704) reallocates the scratchpad per `gemm` call.
- **OpenVINO NPU does not work at all** — [#28726](https://github.com/ggml-org/llama.cpp/issues/28726) (Core Ultra 7 265K, Windows 11 25H2); GPU/CPU paths also failing. New regression worth flagging.
- **CUDA + Volta (sm_70) Qwen3-Embedding-8B NaN wedge** — [#26044](https://github.com/ggml-org/llama.cpp/issues/26044); certain inputs return all-NaN embedding and permanently wedge the server; CPU is correct. Not a recent regression — flag if you still serve Volta.
- **CUDA silent CPU fallback for 4-bit KV cache** — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633). With default flags, q4_0/q4_1 KV silently drops prefill to CPU (~30× slowdown) with no warning; proposed to flip `GGML_CUDA_FA_ALL_QUANTS=ON` to default.
- **`` detector matches literal strings rather than the special token; if you split reasoning from content, validate that downstream.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-11

## Today's Highlights

The standout story is a **critical cloud stability regression on 0.34.0**: `*:cloud` models wedge after ~45 minutes of sustained traffic, returning 502s with no upstream error ([#18381](https://github.com/ollama/ollama/issues/18381)). A fix is already merged ([#18382](https://github.com/ollama/ollama/pull/18382)) bounding the cloud proxy's connect/TTFB timeouts — operators should watch for the next patch release. On the platform side, the long-running **MLX-as-first-class-backend work** is consolidating: server-side MLX imports with GGUF-conversion dropped ([#14969](https://github.com/ollama/ollama/pull/14969)), an MLX version bump ([#18235](https://github.com/ollama/ollama/pull/18235)), and three memory/correctness fixes landed ([#18327](https://github.com/ollama/ollama/pull/18327), [#18345](https://github.com/ollama/ollama/pull/18345), [#18353](https://github.com/ollama/ollama/pull/18353)).

## Releases & Breaking Changes

*No new tagged releases in the last 24h.* Several behavior-level changes merged in main are worth flagging for upgrade planning:

- **Cloud proxy now uses bounded connect + TTFB timeouts** ([#18382](https://github.com/ollama/ollama/pull/18382)) — long-hung cloud requests will now return an error instead of stalling the runner.
- **Cloud stream failures propagate to clients** ([#18351](https://github.com/ollama/ollama/pull/18351)) — partial upstream failures no longer appear as normal `done:true` completions (fixes [#18193](https://github.com/ollama/ollama/issues/18193)).
- **Native `/api/generate` now correctly separates reasoning from visible text** for thinking-capable Jinja templates without Go delimiters ([#18300](https://github.com/ollama/ollama/pull/18300)).
- **MLX array lifetimes reworked** ([#18327](https://github.com/ollama/ollama/pull/18327)): prefix-cache eviction paths now release snapshots that previously leaked until OOM.
- **Token-repeat cutoff raised to 100**; overshoot now returns an error rather than truncated output ([#18374](https://github.com/ollama/ollama/pull/18374)).

## New Model & Hardware Support

- **DeepSeek-V4.1-Flash cloud** request merged/closed quickly ([#18360](https://github.com/ollama/ollama/issues/18360)) with high community demand (27 👍); the downloadable variant is still pending ([#18379](https://github.com/ollama/ollama/issues/18379)).
- **`glm-5.3:cloud`** surfaced in the bug tracker with an infinite-reasoning loop regression that doesn't occur against the upstream Z.AI API ([#18193](https://github.com/ollama/ollama/issues/18193)).
- **`qwen3.8` family** has a chat-streaming regression under long tool-call loops ([#17778](https://github.com/ollama/ollama/issues/17778), 25 👍, 26 comments — high signal).
- **Vulkan ggml backend** issues on AMD Strix Halo UMA APUs are now being reported ([#18370](https://github.com/ollama/ollama/issues/18370)) — worth tracking for ROCm-less AMD users.
- **GGUF metadata unified into a single on-disk cache** ([#17858](https://github.com/ollama/ollama/pull/17858)) — `/api/show` and `/api/tags` capability divergence (e.g. [#16969](https://github.com/ollama/ollama/issues/16969)) should be resolved.

## Performance & Optimization

- **Cloud proxy**: connect and TTFB timeouts now bounded via `http.Client` with explicit limits ([#18382](https://github.com/ollama/ollama/pull/18382)) — eliminates indefinite hangs but no published latency numbers yet.
- **MLX memory path** materially improved across three merged PRs:
  - [#18345](https://github.com/ollama/ollama/pull/18345) — pre-load free-memory check that waits for evicted runners, preventing Metal OOM cascades.
  - [#18353](https://github.com/ollama/ollama/pull/18353) — prefix cache now actively evicts from the active conversation instead of pinning it.
  - [#18327](https://github.com/ollama/ollama/pull/18327) — scoped array lifetimes replace sweep-based GC; prefix-cache long-path eviction no longer leaks.
- **GGUF metadata caching** ([#17858](https://github.com/ollama/ollama/pull/17858)) eliminates redundant metadata extraction — meaningful for models that load many GGUF blobs.
- **Reported regression**: GPT-OSS:120b model loading regressed significantly between 0.23.4 and 0.30.0 ([#18373](https://github.com/ollama/ollama/issues/18373)); no concrete multipliers published yet.

## Stability & Regressions (ranked by severity)

| Severity | Item | Status |
|---|---|---|
| **Critical** | [Issue #18381](https://github.com/ollama/ollama/issues/18381) — `*:cloud` wedges after ~45 min on 0.34.0, 502 with no error; 0.33.1 unaffected. | **Fix merged** ([#18382](https://github.com/ollama/ollama/pull/18382)) |
| **High** | [Issue #18370](https://github.com/ollama/ollama/issues/18370) — Runner wedges indefinitely on Vulkan ggml backend (AMD Strix Halo UMA), one thread 100% CPU, GPU idle. | Open, no fix yet |
| **High** | [Issue #18369](https://github.com/ollama/ollama/issues/18369) — `qwen2.5vl:3b` deterministically fails on a specific 640×360 JPEG with `Unexpected empty grammar stack`, GPU-only. | Open |
| **High** | [Issue #18252](https://github.com/ollama/ollama/issues/18252) — Official `qwen2.5-coder:3b-instruct` library artifacts at q2_K/q3_K_S/q3_K_M/q3_K_L score 0/15 on functional tasks; sibling quants unaffected. | Open — treat these quantizations as broken |
| **Medium** | [Issue #17778](https://github.com/ollama/ollama/issues/17778) — `qwen 3.8` chat streaming returns 500 "no user query found in messages" during long tool-call loops at 205k context. | Open, high community engagement |
| **Medium** | [Issue #18373](https://github.com/ollama/ollama/issues/18373) — Significant model-loading regression between 0.23.4 and 0.30.0. | Open |
| **Medium** | [Issue #18368](https://github.com/ollama/ollama/issues/18368) — macOS GUI silently fails after ~6k tokens with no notification (M4 Pro, 0.34.0, 128k context). | Open |
| **Medium** | [Issue #18359](https://github.com/ollama/ollama/issues/18359) — Native `/api/chat` emits repeated `<unused50>` frames and HTTP 200 EOF without `done:true` on `gemma4:12b`. | Open |
| **Low** | [Issue #18346](https://github.com/ollama/ollama/issues/18346) — Anthropic `/v1/messages` proxy emits complex tool schemas as literal text instead of `tool_use` blocks. | Open |
| **Low** | [Issue #18357](https://github.com/ollama/ollama/issues/18357) — `gemma3n` variant emits `<tool_call>` natively but OpenAI-compat proxy drops both `tool_calls` and content. | Open |
| **Low** | [Issue #18375](https://github.com/ollama/ollama/issues/18375) — `/api/codex/v1/responses` returns 502 (ChatGPT app side). | Open |
| **Low (withdrawn)** | [Issue #18344](https://github.com/ollama/ollama/issues/18344) — originally reported FD leak per `/api/generate`; reporter withdrew the claim after a methodology correction. | Closed (withdrawn) |

## What This Means for Application Developers

- **If you're serving long-lived cloud traffic**, pin to **0.33.1** until a release containing [#18382](https://github.com/ollama/ollama/pull/18382) ships; otherwise your requests will silently wedge after ~45 minutes.
- **Avoid the official `qwen2.5-coder:3b-instruct` quantizations at q2_K, q3_K_S, q3_K_M, q3_K_L** ([#18252](https://github.com/ollama/ollama/issues/18252)) — they emit fluent but non-functional code. Stick to higher-bit variants or rerun a smoke suite before deployment.
- **Tool schemas against the Anthropic-compat proxy** must remain simple/flat ([#18346](https://github.com/ollama/ollama/issues/18346)); nested `$defs`/recursion are likely to fall back to literal text output, breaking Claude Code and similar clients.
- **Gemma3n and Gemma4 tool-calling clients** should not rely on the OpenAI-compat proxy yet — parsed `tool_calls` can be silently dropped ([#18357](https://github.com/ollama/ollama/issues/18357)) and the native endpoint can EOF mid-stream ([#18359](https://github.com/ollama/ollama/issues/18359)).
- **MLX on Apple Silicon** is materially safer to run now: the three merged PRs ([#18327](https://github.com/ollama/ollama/pull/18327), [#18345](https://github.com/ollama/ollama/pull/18345), [#18353](https://github.com/ollama/ollama/pull/18353)) close long-standing OOM/leak paths, and server-side safetensors imports are landing ([#14969](https://github.com/ollama/ollama/pull/14969)) — GGUF wrapping is being intentionally deprioritized for new model creation.
- **`/api/show` capability reporting should now be consistent across endpoints** thanks to the unified metadata cache ([#17858](https://github.com/ollama/ollama/pull/17858)); tooling that conditionally enables tools/thinking based on capability flags should be re-validated.
- **Cloud SDK errors are now visible**: [#18351](https://github.com/ollama/ollama/pull/18351) means upstream stalls produce real client-side errors rather than premature `done:true` — update retry/timeout logic accordingly.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-11

## Today's Highlights

A security-and-billing day for LiteLLM: a team-level privilege-escalation in `team.model_aliases` was closed (#31580), a hard-to-detect silent under-billing bug from dashboard-registered deployments was fixed (#30383), and a "stuck forever" end-user budget reset on large PostgreSQL deployments was repaired (#40639 → #40564). On the feature side, ChatGPT OAuth gains Codex image edits + structured review + realtime (#40366), and a "logging_only" mode for Model Armor eliminates the buffering delay on streaming scans (#40702).

## Releases & Breaking Changes

- **v1.102.0-dev.2** published ([release](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.2)) — all images cosign-signed.
- **v1.100.1** published ([release](https://github.com/BerriAI/litellm/releases/tag/v1.100.1)) — cosign-signed.
- **BREAKING (effective next release):** `/v1/messages` now returns Anthropic-shaped error envelopes so `error.error.type` is switchable in Anthropic SDK clients — PR [#30385](https://github.com/BerriAI/litellm/pull/30385).
- Trivy-related PyPI supply-chain incident (v1.82.7 + v1.82.8) remains **contained**; affected versions deleted. See [#24518](https://github.com/BerriAI/litellm/issues/24518) and the [Security Townhall](https://docs.litellm.ai/blog/security-townhall-updates).

## New Model & Hardware Support

- **ChatGPT / Codex OAuth**: image edits, structured-review JSON schema enforcement, voice realtime (sidebands + multipart) — PR [#40366](https://github.com/BerriAI/litellm/pull/40366).
- **Ollama**: streaming tool-call fix — tool JSON no longer leaks into `delta.content`; `delta.tool_calls` and `finish_reason="tool_calls"` now produced correctly ([#36341](https://github.com/BerriAI/litellm/pull/36341)).
- **Vertex AI Gemini**: `generate_content` path now records `vertex_location` so regional pricing uplift is applied in the cost calculator — PR [#40712](https://github.com/BerriAI/litellm/pull/40712), fixes [#40692](https://github.com/BerriAI/litellm/issues/40692).
- **Guardrails**: first-party **Spanda** pure-CPU uncertainty-quantification & mode-collapse guardrail added (no external judge/embedding call; target sub-50 ms) — PR [#40384](https://github.com/BerriAI/litellm/pull/40384).
- **NVIDIA NeMo Guardrails** integration still open as a feature request ([#25255](https://github.com/BerriAI/litellm/issues/25255)).

## Performance & Optimization

- **Lazy-loaded provider passthrough routes** — `/bedrock/*`, `/mistral/*`, etc. are no longer registered at boot, eliminating the sequential route-table match cost on every request when those paths are unused — PR [#40691](https://github.com/BerriAI/litellm/pull/40691).
- **Dedicated in-memory cache partition for user keys** — keys no longer share the 200-entry `UserApiKeyCache` with teams/end-users/tags/memberships, so churn in those objects no longer evicts hot keys and forces a DB lookup — PR [#40713](https://github.com/BerriAI/litellm/pull/40713).
- **Test-suite reliability** — five flaking tests pinned to deterministic fixtures (Redis `sys.modules` leak, LangSmith init loop patch, wall-clock stagger assertion, fake-prisma zombie grandchild check, pgbouncer readiness budget) — PR [#39895](https://github.com/BerriAI/litellm/pull/39895).
- **Background health-check OOM storm** — `SharedHealthCheckManager` no longer blasts every worker with the full unbounded `LiteLLM_HealthCheckTable` every cycle; DB persistence now leader-gated ([#37611](https://github.com/BerriAI/litellm/issues/37611), closed).

## Stability & Regressions

| Severity | Issue | Status |
|---|---|---|
|  High — **security** | `team.model_aliases` bypasses `key.models` allowlist ([#31580](https://github.com/BerriAI/litellm/pull/31580)) | Fixed & merged |
| 🟠 High — **silent under-billing** | Dashboard-registered deployments missing cost fields; cache-heavy traffic under-counted ([#30383](https://github.com/BerriAI/litellm/pull/30383)) | Fixed & merged |
|  High — **silent cost over/under-count** | `litellm_settings.max_budget` arms a process-local `_current_cost` cap that never resets ([#40020](https://github.com/BerriAI/litellm/issues/40020)) | Open |
| 🟠 High — **budget reset deadlock** | `_reset_expired_budget_cascade` exceeds PostgreSQL's 32 767 bind-variable limit; customers stay blocked forever ([#40564](https://github.com/BerriAI/litellm/issues/40564)) | Fixed via [#40639](https://github.com/BerriAI/litellm/pull/40639) (reset by budget link, not user id) |
|  Medium — **tool-call drops** | `parse_tool_call_arguments` silently drops MCP tool calls with concatenated JSON; helper `split_concatenated_json_objects` exists but isn't invoked ([#40582](https://github.com/BerriAI/litellm/issues/40582)) | Open (1.101.0) |
| 🟡 Medium — **spend-log loss** | Reused `x-litellm-call-id` silently drops spend-log rows ([#35563](https://github.com/BerriAI/litellm/issues/35563)) | Open |
|  Medium — **streaming TTFT** | Pass-through streaming collapses `completionStartTime` onto `endTime` for SpendLogs ([#30384](https://github.com/BerriAI/litellm/pull/30384)) | Fixed & merged |
|  Medium — **gateway bug** | Native MCP `/mcp` misinterprets `SERVER_ROOT_PATH` prefix as a scoped server name, returns 0 tools ([#32142](https://github.com/BerriAI/litellm/issues/32142)) | Open |
| 🟡 Medium — **auth/observability** | `/cursor/chat/completions` returns 200 and charges the provider but creates no SpendLog entry (1.88.1) ([#30126](https://github.com/BerriAI/litellm/issues/30126)) | Open |
|  Low — **observability** | `/metrics` returns empty after upgrade to 1.88.0 due to 307 redirect ([#30079](https://github.com/BerriAI/litellm/issues/30079)) | Open |
|  Low — **cost calc** | VLLM `cached_tokens` not handled in token cost calculator ([#22984](https://github.com/BerriAI/litellm/issues/22984)) | Open |
|  Low — **router** | Prompt-cache affinity TTL hardcoded to 5 min — breaks 1-hour ephemeral cache routing ([#28427](https://github.com/BerriAI/litellm/issues/28427)) | Open |

Also closed: MCP OAuth `authorization_url`/`token_url` propagation ([#20495](https://github.com/BerriAI/litellm/issues/20495)), GPT-5.4 tool-call + `reasoning_effort` via openai-agents SDK ([#23156](https://github.com/BerriAI/litellm/issues/23156)), audio-transcriptions diarize speaker collapse ([#29766](https://github.com/BerriAI/litellm/issues/29766)), OTel part-key normalization ([#29756](https://github.com/BerriAI/litellm/issues/29756)), hardcoded ANSI escape codes in log formatter ([#29799](https://github.com/BerriAI/litellm/issues/29799)), dashboard log tag filter ([#23559](https://github.com/BerriAI/litellm/issues/23559)), Bedrock session tags for CUR 2.0 ([#34069](https://github.com/BerriAI/litellm/issues/34069)).

## What This Means for Application Developers

- **Pin and verify.** If you're on v1.82.7 or v1.82.8, upgrade immediately and verify your image via `cosign verify`. Validate you're not pulling a compromised package.
- **Audit your allowlist math.** If you use `team.model_aliases` to expose curated model names, upgrade to a build containing #31580 — keys could otherwise reach models outside their own allowlist.
- **Reconcile cache-heavy spend.** If you register deployments via the `/model/new` dashboard form (or DB-load them), check that your cost figures match upstream billing — they were likely under-counted. #30383 backfills the canonical entry.
- **Plan for the Anthropic error envelope change (#30385).** If any of your code inspects `error.type` from `/v1/messages`, the shape will now match the Anthropic spec exactly — generally a beneficial change, but a breaking one if you had a shim.
- **Model Armor users:** the new `mode: logging_only` lets you keep content flowing to clients while still capturing scan results for audit — important if your latency budget can't tolerate the full-stream scan wait.
- **Ollama + tools + streaming** now works end-to-end (#36341) — re-test any agent flows that were silently getting JSON in `delta.content`.
- **Watch the open budget cap bug (#40020):** `litellm_settings.max_budget` currently installs a process-local cost cap that never resets; don't rely on it as a hard ceiling until that's fixed.
- **Operator breakpoints honored (#40686):** explicit `cache_control` injection points are no longer erased by automatic markers — if you were relying on the old overwrite behavior, re-test your prompt-cache hit rates.
- **Cost attribution:** `vertex_location` is now consistently threaded on the Gemini `generate_content` path (#40712), so regional Gemini pricing will now reflect the region you actually deployed to.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-11

## Today's Highlights

The Studio product line is pivoting hard toward an **agentic platform**: a single wave of feature requests (Skills, persistent Memory, Agent Builder, Multi-agent orchestration, Model routing) outlines a coherent next-gen architecture. On the stability side, several high-impact regressions surfaced — most notably a breaking `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'` from the latest Docker image, plus full-context reprocessing after every tool call — both of which are actively being addressed by codex-converged PRs.

## Releases & Breaking Changes

No new tagged releases in the last 24h. The Docker image published today (package `2026.9.4`) ships a breaking change for fine-tuning users:

- **`SFTConfig` no longer accepts `max_seq_length`** — it has been renamed to `max_length`. Training starts fail outright. ([#10785](https://github.com/unslothai/unsloth/issues/10785))
- API parity regression: Studio still passes `max_tokens` while the upstream expects `max_completion_tokens`. ([#10787](https://github.com/unslothai/unsloth/issues/10787))
- `tool_execution_mode` in PR #10615 restricts accepted values to `auto` and a sandbox-required variant — **breaking change** for any custom tool integrations. ([#10615](https://github.com/unslothai/unsloth/pull/10615))

## New Model & Hardware Support

- **Ascend NPU (Huawei 昇腾) backend** — RFC opened for first-class support to unlock the Chinese DC market. ([#10772](https://github.com/unslothai/unsloth/issues/10772))
- **AMD 6950XT** — reported as not supported; investigate before recommending for consumer deployments. ([#10468](https://github.com/unslothai/unsloth/issues/10468))
- **MLX VLM** — prompt-cache prefill grid fix lands today (was forcing 256-token chunks, breaking cold-path equivalence). ([#10778](https://github.com/unslothai/unsloth/pull/10778))
- **GGUF / Qwen3.8** — full long-chat regression traced to state loss after model reload (11-minute prefill). ([#9037](https://github.com/unslothai/unsloth/issues/9037))
- **Diffusion models** (Z-Image-Turbo and family): LoRA export path and load-cancellation race fixed; tooltips now model-neutral. ([#10716](https://github.com/unslothai/unsloth/issues/10716), [#10780](https://github.com/unslothai/unsloth/pull/10780), [#10782](https://github.com/unslothai/unsloth/pull/10782))
- **Image models**: text-encoder precision now exposed (Default / FP8 storage / FP8 compute / INT8 / NVFP4). ([#10788](https://github.com/unslothai/unsloth/pull/10788))
- **ONNX false-rejection**: `sentence-transformers/all-MiniLM-L6-v2` was wrongly rejected — fixed in PR. ([#10784](https://github.com/unslothai/unsloth/pull/10784))

## Performance & Optimization

- **NVLink detection** replaced a 1.2s `nvidia-smi topo -m` shell-out with a direct NVML read. On 8× B200 this drops a per-load probe to negligible cost. ([#10720](https://github.com/unslothai/unsloth/pull/10720))
- **`Fast_Layernorm` Triton kernels** now materialize strided inputs/gradients — fixes silent correctness bugs and potential `view` failures on transposed leading dims. ([#10675](https://github.com/unslothai/unsloth/pull/10675))
- **Transformers sidecars** (`.venv_t5_530` / `_550` / `_510`) now rebuild only when on-disk evidence is stale, cutting Windows `studio update` from 60–90 s to roughly the duration of a single sidecar refresh. ([#10650](https://github.com/unslothai/unsloth/pull/10650))
- **Offline `studio update`** now keeps a verified install when PyPI is unreachable and `UV_OFFLINE` is set, instead of failing partway. ([#10651](https://github.com/unslothai/unsloth/pull/10651))
- **Reasoning-window pagination** carried forward from #9477 — long CoT traces stay responsive without rewriting the streaming render. ([#10717](https://github.com/unslothai/unsloth/pull/10717))
- **Agentic tab-close durability** — server-side tool loops now stream durably and park on approval; replays match watched runs exactly. ([#10365](https://github.com/unslothai/unsloth/pull/10365))

## Stability & Regressions (ranked by severity)

| Severity | Issue | Status |
|---|---|---|
| **Critical** | `SFTConfig` rejects `max_seq_length` after `2026.9.4` Docker update — training fails to start. [#10785](https://github.com/unslothai/unsloth/issues/10785) | Open, no fix PR yet |
| **High** | Full context reprocessed after every tool call (regression after upgrade). [#10698](https://github.com/unslothai/unsloth/issues/10698) | Open |
| **High** | Qwen3.8 GGUF: ~11 min full prefill after model reload. [#9037](https://github.com/unslothai/unsloth/issues/9037) | Open |
| **High** | `--tensor-split` silently ignored, costing users hours. [#10355](https://github.com/unslothai/unsloth/issues/10355) | Open |
| **High** | Long GGUF chat waiting for tool approval parks its slot, blocking other queued chats even when monitor reports 4 free slots. [#10671](https://github.com/unslothai/unsloth/issues/10671) | Open |
| **Medium** | Unsloth "layer mode" and "tensor mode" are identical; claims of BF16 mode are misleading. [#10549](https://github.com/unslothai/unsloth/issues/10549) | Open |
| **Medium** | `CUBLAS_STATUS_NOT_INITIALIZED` during FLUX.2 Klein VAE decoding on multi-GPU. [#10768](https://github.com/unslothai/unsloth/issues/10768) | Open |
| **Medium** | Studio drops Anthropic web-search error details — failures appear as `(search complete)`. PR #10757 surfaces them. | Fix in [#10757](https://github.com/unslothai/unsloth/pull/10757) |
| **Medium** | Chat history restoration — model could answer follow-ups without prior turns. Fixed in [#10761](https://github.com/unslothai/unsloth/pull/10761) | Fix landed |
| **Medium** | Tool-returned images from Claude Code dropped before being sent to the model. Fixed in [#10762](https://github.com/unslothai/unsloth/pull/10762) | Fix landed |
| **Medium** | Merged-model upload ignoring the requested branch/PR. Fixed in [#10760](https://github.com/unslothai/unsloth/pull/10760) | Fix landed |
| **Low** | Web UI returns 404 on `127.0.0.1`/`localhost` loopback, works on LAN IP. [#10786](https://github.com/unslothai/unsloth/issues/10786) | Open |
| **Low** | Desktop UI lags with large code blocks (RTX 4090, Win 11 25H2). [#10769](https://github.com/unslothai/unsloth/issues/10769) | Open |
| **Low** | Android browser loses connection and aborts generation when backgrounded. [#10739](https://github.com/unslothai/unsloth/issues/10739) | Open |

## What This Means for Application Developers

1. **Pin your Docker image if you depend on `max_seq_length`** — the rename to `max_length` is unannounced and breaks training out of the box. Audit training scripts before pulling `2026.9.4`.
2. **Tool-calling agents are getting real** — the cluster of PRs around tab-close durability (#10365), tool-result image handling (#10762), chat-history restoration (#10761), and tool-approval slot accounting (#10671) collectively mean Studio is becoming a viable host for long-running, tool-using sessions rather than just chat. Watch these land before betting on them in production.
3. **Multi-host serving will get noticeably cheaper on B200/H100 pods** — NVLink-via-NVML and sidecar-rebuild trimming directly translate to faster cold starts and shorter update windows in fleet operations.
4. **Plan for an Agent-platform API surface** — the new feature requests (Skills, Memory, Agent Builder, Model Router, Supervisor/Subagents) imply a multi-tier abstraction (Skill Packs → Agent Profiles → Supervisor routing). Architect downstream integrations with this hierarchy in mind even before it ships.
5. **Local-only stack still has rough edges** — ONNX false-rejections, RTL rendering, network-loss handling on mobile, and diffusion LoRA export gaps are all live. If you're shipping to non-NVIDIA-desktop or RTL markets, gate on these.
6. **Diffusion on Studio is stabilizing fast** — load-cancellation races and tooltip accuracy just landed; safe to start prototyping image-gen workflows in earnest.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — Daily Digest
**Date:** 2026-09-11
**Repository:** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. Today's Highlights

The dominant theme is **OpenAI Responses / Codex API compatibility**: two parallel PRs (#1692, #1784) converge on the same root cause — translated Claude thinking blocks produce non-empty `content` arrays on `reasoning` input items, which the Responses upstream rejects with HTTP 400. Additionally, an **OpenCode Go provider** import path is landing via PR #1786, and a new bug report (#1787) shows rule-aliased models are tracked under their alias name, breaking cost reporting.

---

## 2. Releases & Breaking Changes

No new releases in the last 24h. Latest stable remains **v3.0.22** (referenced in [#1787](https://github.com/musistudio/claude-code-router/issues/1787)).

No breaking changes reported.

---

## 3. New Model & Hardware Support

**OpenCode Go provider** — first-class support added for `https://opencode.ai/zen/go/v1` as a distinct provider from OpenCode Zen.

- [#1786 feat(opencode): add first-class OpenCode Go local import](https://github.com/musistudio/claude-code-router/pull/1786) — OPEN. Adds `opencode-go` alongside the existing `opencode` (Zen) importer; separate credential record and catalog entries to handle overlapping model IDs.
- [#1785 feat(opencode): add first-class OpenCode Go support](https://github.com/musistudio/claude-code-router/pull/1785) — CLOSED (superseded by #1786). Notably, this PR also added the missing `x-opencode-session` header, fixing [#1754](https://github.com/musistudio/claude-code-router/issues/1754) and [#1780](https://github.com/musistudio/claude-code-router/issues/1780).

No new model architectures, quantization formats, or compute backends reported.

---

## 4. Performance & Optimization

No throughput, latency, or kernel-level performance changes landed today. The PRs in flight target correctness/feature parity, not perf.

---

## 5. Stability & Regressions

Ranked by severity (highest first):

1. **[HIGH] `openai_responses` 400 on reasoning item with non-empty content** — affects Claude Code → Codex API routing. Reproduced in v3.0.22 and `master`.
   - Issue: [#1783](https://github.com/musistudio/claude-code-router/issues/1783) (OPEN)
   - Fix PRs in flight (overlapping):
     - [#1692 Drop non-replayable reasoning items from openai_responses input](https://github.com/musistudio/claude-code-router/pull/1692) (OPEN, updated today) — drops thinking blocks at the gateway during Anthropic→Responses translation.
     - [#1784 fix(openai): strip non-empty content from Responses reasoning input items](https://github.com/musistudio/claude-code-router/pull/1784) (OPEN) — narrower fix that strips non-empty `content` while preserving the reasoning item.
   - **Action:** Watch both PRs; maintainers will likely choose one approach. Until merged, users routing to Codex API on multi-turn conversations will see `All target providers failed` and silent fallback off the requested model.

2. **[MEDIUM] Estimated cost stuck at $0 for rule-aliased models** — usage records the *rule alias* instead of the resolved upstream model, so the cost lookup misses.
   - Issue: [#1787](https://github.com/musistudio/claude-code-router/issues/1787) (OPEN, new today, v3.0.22 + master)
   - **Fix PR:** None yet.
   - **Action:** Treat cost figures as unreliable if you use the rules engine to alias models; verify against upstream provider dashboards.

3. **[LOW] Overview statistics cannot be reset** — feature gap, not a regression.
   - Issue: [#1734](https://github.com/musistudio/claude-code-router/issues/1734) (CLOSED as question; feature request effectively open).
   - **Fix PR:** None.

---

## 6. What This Means for Application Developers

- **If you route Claude Code sessions to OpenAI Codex (`openai_responses`)**, expect 400s on multi-turn conversations until #1692 or #1784 lands. Workaround: avoid Anthropic thinking blocks in session state for those routes, or temporarily disable the affected providers.
- **If you rely on the built-in cost dashboard**, do not trust dollar figures for any model accessed via a router rule alias. Cross-check with the upstream provider's billing export. Track [#1787](https://github.com/musistudio/claude-code-router/issues/1787).
- **If you use OpenCode as a backend**, the upcoming [#1786](https://github.com/musistudio/claude-code-router/pull/1786) will let you import both Zen and Go credentials independently — useful if you operate separate accounts for each tier.
- **Operations note:** No release today; pin your deployment to v3.0.22 or `main` deliberately. The two reasoning-fix PRs are mutually exclusive approaches — wait for maintainer signal before merging either into a production fork.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-11

## Today's Highlights

The biggest story today is a coordinated push to fix `Codex Responses → Chat Completions` conversion bugs. Several distinct failure modes (DeepSeek infinite loops from split assistant turns, fragmented `content_block_start` events on reasoning models, negative `max_tokens`) all closed or moved forward in the last 24 hours, with [#7280](https://github.com/farion1231/cc-switch/pull/7280) coalescing commentary with pending tool calls and [#7286](https://github.com/farion1231/cc-switch/pull/7286) mirroring DeepSeek's updated vision-capable catalog.

A second cluster targets proxy hygiene: three open PRs ([#7292](https://github.com/farion1231/cc-switch/pull/7292), [#7293](https://github.com/farion1231/cc-switch/pull/7293), [#1264](https://github.com/farion1231/cc-switch/issues/1264)) all address the same root cause — CC Switch silently inheriting stale or system-wide proxy settings, breaking loopback providers, internal-network endpoints, and post-restart connectivity.

## Releases & Breaking Changes

No new releases in the last 24 hours. Version 3.20.2 appears to ship a regression affecting non-Haiku Claude Code models with Qwen 3.8 27B — see [#7221](https://github.com/farion1231/cc-switch/issues/7221).

## New Model & Hardware Support

- **DeepSeek catalog refresh** — [#7286](https://github.com/farion1231/cc-switch/pull/7286) mirrors `deepseek-flash` (vision-capable) and un-gates the legacy `deepseek-v4-flash` alias so image blocks pass through instead of being stripped to `[Unsupported...]`. Related tracking: [#7278](https://github.com/farion1231/cc-switch/issues/7278) requesting preset updates for V4.1 Flash renaming.
- **Token Market presets** — [#7184](https://github.com/farion1231/cc-switch/pull/7184) adds a unified relay across Claude Code, Codex, OpenCode, OpenClaw, and Hermes (Anthropic, OpenAI Responses, and Chat-compatible endpoints respectively).
- **Laonong API presets** — [#7296](https://github.com/farion1231/cc-switch/pull/7296) integrates a universal relay/gateway provider across the same multi-app surface.
- **Claude Science launcher** — [#5440](https://github.com/farion1231/cc-switch/pull/5440) wires the new Claude Science beta through CC Switch's local proxy, isolating state under `~/.cc-switch/claude-science-proxy` to keep the default profile and real Claude credentials untouched.
- **Vendor-level proxy override** — [#7290](https://github.com/farion1231/cc-switch/pull/7290) lets individual providers specify an external proxy API with per-provider model ID display.
- **Mimo code adapter** — still open as an enhancement request: [#4073](https://github.com/farion1231/cc-switch/issues/4073).

## Performance & Optimization

- [#7307](https://github.com/farion1231/cc-switch/pull/7307) adds a probe timeout to `fetch_npm_dist_tags` so the "About → Environment Check" cards stop hanging on slow npm registry lookups. The local `zsh -lic "{tool} --version"` probe was confirmed fast (~0.6s); the regression was entirely on the remote latest-version path.
- [#7297](https://github.com/farion1231/cc-switch/pull/7297) stabilizes Codex session import: validates the opened parent file stamp before and after the full timeline scan and only caches a stable snapshot, avoiding unnecessary deferred forks after parent idle gaps.
- [#6852](https://github.com/farion1231/cc-switch/pull/6852) reclassifies upstream `"Model is unavailable"` 400s as retryable so they count toward the circuit breaker and trigger failover instead of pinning to a dead model.

## Stability & Regressions

**High severity (still open, with active traffic):**

- [#4341](https://github.com/farion1231/cc-switch/issues/4341) — 49 comments. Codex sessions with third-party models auto-disconnect mid-conversation; root cause not yet publicly identified.
- [#7217](https://github.com/farion1231/cc-switch/issues/7217) — Codex v0.153.x bypasses the local 15721 route and goes direct to OpenAI official; CC Switch's local routing is effectively disabled for third-party relays.
- [#7221](https://github.com/farion1231/cc-switch/issues/7221) — v3.20.2 regression: Claude Code returns errors on all models except Haiku when pointed at Qwen 3.8 27B.
- [#7224](https://github.com/farion1231/cc-switch/issues/7224) — Memory usage anomaly reported 2026-09-08.
- [#6605](https://github.com/farion1231/cc-switch/issues/6605) — Claude Desktop over the Anthropic protocol is throwing errors.

**Medium severity:**

- [#4741](https://github.com/farion1231/cc-switch/issues/4741) — Tool-role messages without a preceding `tool_calls` message rejected by upstream (HTTP 400) on DeepSeek / `gpt-5.5`.
- [#4679](https://github.com/farion1231/cc-switch/issues/4679) — Cached system-proxy state causes 502 after the user disables their proxy. Fix incoming via [#7292](https://github.com/farion1231/cc-switch/pull/7292).
- [#4642](https://github.com/farion1231/cc-switch/issues/4642) — Same class of bug on macOS: proxy settings not re-read after change.
- [#7029](https://github.com/farion1231/cc-switch/issues/7029) — macOS: killing/switching a proxy tool (Clash, v2rayN, etc.) breaks every usage query and connectivity check until CC Switch is restarted.
- [#6596](https://github.com/farion1231/cc-switch/issues/6596) — WSL filesystem (`\\wsl.localhost\Debian\...`) reports `os error 50` on auth.json atomic replace, blocking Codex route switching.
- [#5974](https://github.com/farion1231/cc-switch/issues/5974) — With Codex local routing + `unifyCodexSessionHistory`, the OpenAI Official path hardcodes the `cc-switch-official` bucket and splits official vs. third-party session history.
- [#7264](https://github.com/farion1231/cc-switch/issues/7264) — Codex usage sync misses activity logs whose mtime doesn't change on update (Windows rollout scenario).
- [#6936](https://github.com/farion1231/cc-switch/issues/6936) — macOS 13: provider check, in-app updates, and Codex API requests all fail.
- [#5028](https://github.com/farion1231/cc-switch/issues/5028) — GLM 5.2 streaming → Anthropic conversion emits empty thinking blocks and broken text. **Closed** but worth monitoring on the next GLM bump.
- [#2569](https://github.com/farion1231/cc-switch/issues/2569) — WebDAV cloud sync non-functional.
- [#1149](https://github.com/farion1231/cc-switch/issues/1149) — Outbound PII redaction feature still open as enhancement; [#7306](https://github.com/farion1231/cc-switch/pull/7306) advances this with reversible typed placeholders (`{{PHONE_1}}`) instead of length-only masking, so the model retains type info and round-trip restoration is possible.

**Recently closed (good news):**

- [#7236](https://github.com/farion1231/cc-switch/issues/7236) — Claude Code 2.1.265 broke DeepSeek/ZAI; **closed**.
- [#5860](https://github.com/farion1231/cc-switch/issues/5860) — DeepSeek infinite-reply loop from split assistant turns; **closed** via [#7280](https://github.com/farion1231/cc-switch/pull/7280).
- [#6529](https://github.com/farion1231/cc-switch/issues/6529) — Same root cause as #5860 (commentary + function_call split); **closed** via #7280.
- [#7088](https://github.com/farion1231/cc-switch/issues/7088) — OpenCodeGo requests missing `x-opencode-session` header; **closed**.
- [#4404](https://github.com/farion1231/cc-switch/issues/4404) — Reasoning-model fragmented `content_block_start` events; **closed**.
- [#4714](https://github.com/farion1231/cc-switch/issues/4714) — Negative `max_tokens` on `/responses`; **closed**.
- [#6060](https://github.com/farion1231/cc-switch/issues/6060) — Windows Codex usage mtime skip; **closed** (companion to still-open [#7264](https://github.com/farion1231/cc-switch/issues/7264)).
- [#782](https://github.com/farion1231/cc-switch/issues/782) — `everything-claude-code` plugin config wiped after CC Switch restart; **closed**.
- [#1634](https://github.com/farion1231/cc-switch/issues/1634) — Add-provider panel tab visibility on Windows; **closed**.

**Platform-specific fixes in flight:**

- [#7302](https://github.com/farion1231/cc-switch/pull/7302) — Fixes blank/invisible window on macOS 26 Tahoe by adding WebKit sandbox entitlements (`entitlements.plist` with executable-memory and library-validation entries for the WKWebView WebContent process).
- [#6714](https://github.com/farion1231/cc-switch/pull/6714) — Fixes "System" theme mode on Linux/KDE/GNOME by switching to XDG Desktop Portal so theme switches propagate live without restart.
- [#6572](https://github.com/farion1231/cc-switch/pull/6572) — Recognizes Homebrew Caskroom installs so Codex upgrades route through `brew upgrade --cask` instead of `npm i -g`.

## What This Means for Application Developers

1. **Treat Codex Responses as the fragile surface.** If you're routing Codex through a relay and your upstream is Chat-Completions-shaped, the `assistant` turn shape matters: any commentary item adjacent to `function_call` items must coalesce into a single assistant message, otherwise Chat targets either ignore the tool call or echo the commentary in a loop. [#7280](https://github.com/farion1231/cc-switch/pull/7280) is the canonical reference; if you're hand-rolling a similar translator, copy its merge rule.

2. **Don't trust the system proxy.** Three independent bugs ([#4679](https://github.com/farion1231/cc-switch/issues/4679), [#4642](https://github.com/farion1231/cc-switch/issues/4642), [#7029](https://github.com/farion1231/cc-switch/issues/7029)) all stem from reqwest or HTTP clients inheriting `HTTP_PROXY`/`HTTPS_PROXY`/`ALL_PROXY` that the user no longer wants. If you build providers in CC Switch, assume: (a) detect loopback upstreams and bypass any inherited proxy, (b) re-read proxy state on every request, not at startup. [#7293](https://github.com/farion1231/cc-switch/pull/7293) and [#7292](https://github.com/farion1231/cc-switch/pull/7292) are the patterns to follow.

3. **DeepSeek is now a vision-capable target.** With [#7286](https://github.com/farion1231/cc-switch/pull/7286) merged, image input works through `deepseek-flash` and the legacy `deepseek-v4-flash` alias. If you've been stripping image blocks as a workaround, you can remove that code path.

4. **macOS Tahoe is the new minimum target.** [#7302](https://github.com/farion1231/cc-switch/pull/7302) ships new sandbox entitlements; if you ship your own Tauri/WebKit app, expect the same requirement. Conversely, macOS 13 is showing its age ([#6936](https://github.com/farion1231/cc-switch/issues/6936)) — plan an OS floor bump.

5. **WSL auth.json atomicity is a known limit.** If your users run Codex inside WSL, the `auth.json` swap path on `\\wsl.localhost\...` will fail with `os error 50`. There is no fix in flight; communicate this limitation rather than work around it silently.

6. **If you're a Claude Code user, pin around 3.20.2 for Qwen-derived models.** [#7221](https://github.com/farion1231/cc-switch/issues/7221) shows a regression specific to that pairing; downgrade or wait for the patch.

7. **The new presets are meaningful.** Token Market ([#7184](https://github.com/farion1231/cc-switch/pull/7184)) and Laonong ([#7296](https://github.com/farion1231/cc-switch/pull/7296)) give you two more neutral relays if you need budget failover that doesn't go through any single major provider's API gateway.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-11

## Today's Highlights

New API had no tagged releases in the last 24 hours, but a wave of AI-coding-agent-authored issues and PRs (Claude Code, Codex, Grok Build, Hermes Agent) drove the queue — many were closed as invalid or duplicate, while the mergeable ones cluster around reliability (nil-map panic in `InitChannelCache`, host-CPU false circuit breaker, audio case sensitivity, Veo field bugs) and a sizeable new feature line: recurring quota resets, a vendor-management dialog, optional Langfuse telemetry, and Vertex-compatible embeddings.

## Releases & Breaking Changes

No new releases in the last 24 hours. The codebase is still on the `v1.0.0-rc.36` line; Issue [#7279](https://github.com/QuantumNous/new-api/issues/7279) requests the maintainers publish an explicit GA criteria before locking `v1.0.0`.

## New Model & Hardware Support

- **Vertex AI — OpenAI-compatible embeddings** (open). PR [#6776](https://github.com/QuantumNous/new-api/pull/6776) adds `/v1embeddings` translation to Vertex `:predict`, returning OpenAI-shaped `data[]` with prompt token usage.
- **Google Veo (Gemini video) plugin fixes** (open). PRs [#7311](https://github.com/QuantumNous/new-api/pull/7311) (drops unsupported `numberOfVideos`, sends `sampleCount`) and [#7314](https://github.com/QuantumNous/new-api/pull/7314) (reads video URI from `generatedSamples` rather than the incorrect `generatedVideos[].video.uri`).
- **Anthropic cache-token accounting** (open). PR [#7305](https://github.com/QuantumNous/new-api/pull/7305) ensures cached read/write tokens are counted in the consume-log input total (closes [#7290](https://github.com/QuantumNous/new-api/issues/7290)).
- No new hardware/backend additions (CUDA/ROCm/Metal/CPU) or new quantization paths reported today.

## Performance & Optimization

- **Billing log clarity for tiered pricing** (merged). PR [#7324](https://github.com/QuantumNous/new-api/pull/7324) renders complex time-rule multipliers correctly instead of the misleading "dynamic pricing · no match" string (closes [#7296](https://github.com/QuantumNous/new-api/issues/7296)).
- **Sentinel CPU sampling fixed to container scope** (open). PR [#7317](https://github.com/QuantumNous/new-api/pull/7317) replaces the host-wide `system_cpu_overloaded` probe with a container-scoped one plus continuity/freshness checks, eliminating false trip-outs inside pods (closes [#7316](https://github.com/QuantumNous/new-api/issues/7316)).
- **Perf-metrics access control** (merged). PR [#7326](https://github.com/QuantumNous/new-api/pull/7326) hides groups the viewer cannot access on the model-square performance page, removing an information-leak vector (closes [#7309](https://github.com/QuantumNous/new-api/issues/7309); dup [#7310](https://github.com/QuantumNous/new-api/issues/7310)).
- **Retry-priority preservation after auto-disable** (open). PR [#7294](https://github.com/QuantumNous/new-api/pull/7294) keeps the original retry ordering when a channel self-disables mid-failover so the second/third attempts aren't shuffled.
- **Retry-logic cleanup** (open, stale). Issue [#4236](https://github.com/QuantumNous/new-api/issues/4236) is still requesting a cleaner retry/retry-policy design — no concrete numbers landed today.

## Stability & Regressions

Ranked by impact. Severity legend: 🔴 critical · 🟠 high · 🟡 medium.

- 🟠 **InitChannelCache panic on nil group map — recurring crash.** Issue [#7322](https://github.com/QuantumNous/new-api/issues/7322) reports `assignment to entry in nil map` panicking every sync cycle when an enabled channel's group has no abilities row, and one container restarted in production. Fix PR [#7323](https://github.com/QuantumNous/new-api/pull/7323) (open) adds the nil-map guard; note that an earlier PR [#6687](https://github.com/QuantumNous/new-api/pull/6687) at the same panic site is marked DIRTY and the author is unresponsive — a backport of the guard is recommended regardless.
- 🟠 **Vertex AI API Key mode 404s on official endpoints.** Issue [#6250](https://github.com/QuantumNous/new-api/issues/6250) — the API-Key path builds the URL without `project_id`, so requests to first-party Vertex endpoints miss the project segment. No fix PR for the URL builder yet (only the embeddings PR [#6776](https://github.com/QuantumNous/new-api/pull/6776) is adjacent).
- 🟡 **Audio duration fails on uppercase extensions.** Issue [#7319](https://github.com/QuantumNous/new-api/issues/7319) — `GetAudioDuration` is case-sensitive on file extensions. Fix PR [#7321](https://github.com/QuantumNous/new-api/pull/7321) (open) makes it case-insensitive.
- 🟡 **BatchUpdater drops accumulated deltas on shutdown.** Issue [#7325](https://github.com/QuantumNous/new-api/issues/7325) (closed invalid) — when `BATCH_UPDATE_ENABLED=true`, in-memory deltas only flush on the ticker; nothing flushes on graceful shutdown, so the last sub-tick window of quota/usage changes is silently lost. Worth revisiting even though the bot closed it.
- 🟡 **Perf page leaks hidden groups.** Issue [#7309](https://github.com/QuantumNous/new-api/issues/7309) — visibility-bypass on the model-square performance page; fixed by PR [#7326](https://github.com/QuantumNous/new-api/pull/7326).
- 🟡 **Claude→OpenAI conversion leaks mid-conversation system messages** to strict upstreams. Issue [#7307](https://github.com/QuantumNous/new-api/issues/7307) (closed) — closed without merge, but the underlying behavior remains unpatched; treat strict OpenAI-compatible upstreams as risky for multi-turn Claude traffic until a fix lands.
- 🟡 **Veo (Gemini video) two bugs** — wrong field for the video URI ([#7314](https://github.com/QuantumNous/new-api/pull/7314)) and sending the unsupported `numberOfVideos` ([#7311](https://github.com/QuantumNous/new-api/pull/7311)). Both have open PRs.
- 🟢 **Billing log "dynamic pricing · no match" false positive** for tiered models — [#7296](https://github.com/QuantumNous/new-api/issues/7296), display-only, fixed by [#7324](https://github.com/QuantumNous/new-api/pull/7324).

## What This Means for Application Developers

- **Telemetry just got optional and standards-friendly.** PR [#7313](https://github.com/QuantumNous/new-api/pull/7313) (open) adds a toggleable Langfuse reporter that ships request outcomes and retry metadata asynchronously in batches — the primary request path is unchanged. If you're already paying for Langfuse, this is the path of least resistance to drop in.
- **Quotas can now reset on a schedule.** PR [#7320](https://github.com/QuantumNous/new-api/pull/7320) (open) implements recurring wallet resets with a global default plus per-user overrides (closes the long-standing [#3165](https://github.com/QuantumNous/new-api/issues/3165)). Worth a close look before relying on it: the model exposes a per-user opt-out and admin-triggered immediate run, but no dry-run flag yet.
- **Vertex users should hold the upgrade.** The API-Key mode 404 in [#6250](https://github.com/QuantumNous/new-api/issues/6250) is unpatched for the URL builder; if your upstream is the official Vertex endpoint, stay on a pre-bug commit or supply a full custom URL until a fix lands.
- **New capability hooks worth tracking for roadmaps:**
  - Vendor management dialog (PR [#7029](https://github.com/QuantumNous/new-api/pull/7029), closed-merged).
  - Channel endpoint-type allowlisting ([#7292](https://github.com/QuantumNous/new-api/issues/7292)) — useful if you split internal/external channels.
  - Desktop-client login relay via one-time auth codes ([#7308](https://github.com/QuantumNous/new-api/issues/7308)) — relevant for CLI/Electron integrations.
  - Org/team abstraction with shared quotas and roles ([#7312](https://github.com/QuantumNous/new-api/issues/7312)) — still open, design-phase.
  - Bulk user delete ([#7318](https://github.com/QuantumNous/new-api/issues/7318)) — still open.
- **Operational note:** an unusual share of today's traffic is AI-coding-agent submissions that get closed by the issue bot (template-mismatch, duplicate, invalid). Expect higher noise in the queue over the next RC cycle — pin a known-good tag (`v1.0.0-rc.36`) for production and watch the GA criteria thread [#7279](https://github.com/QuantumNous/new-api/issues/7279) before adopting the next bump.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*