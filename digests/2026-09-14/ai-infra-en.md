# AI Infrastructure Digest 2026-09-14

> Generated: 2026-09-14 11:30 UTC | Projects covered: 9

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

# Cross-Project AI Infrastructure Report — 2026-09-14

## 1. Ecosystem Overview

Today's activity splits cleanly along the stack: serving engines (vLLM, SGLang) are absorbing the correctness cost of the newest model architectures — hybrid Mamba/attention, MoE with sparse indexers, and speculative decoding — while hardware surface area keeps expanding (Ascend NPU, ROCm, SM120/SM100, B300, GB200). The local/runtime layer (llama.cpp, Ollama) is in pure stabilization mode, shipping rapid build cadences against regressions rather than new capabilities. The gateway layer (LiteLLM, New API, Claude Code Router, CC Switch) is converging on the same two problems: faithful translation of the OpenAI Responses protocol (especially reasoning content and tool calls) and trustworthy cost/cache accounting. Fine-tuning (Unsloth) is racing ahead on FP4-family quantization for diffusion models and quietly expanding into serving and agent tooling.

## 2. Activity Comparison

Counts are artifacts referenced in each digest (not full-repo stats), except SGLang, whose digest self-reports aggregates.

| Project | Layer | Issues referenced | PRs referenced | Release status (24h) |
|---|---|---|---|---|
| **vLLM** | Serving engine | 21 | 15 | None; implicit breaking change: `VLLM_ENABLE_SCALE_OUT_ENDPOINTS` env → `--enable-scale-out` flag (#55176/#56819) |
| **SGLang** | Serving engine | ~16 (48 active per digest) | ~20 (~500 updated per digest) | None |
| **llama.cpp** | Local runtime/kernels | 3 | 26 | **8 builds** (b10944–b10955), incl. critical macOS arm64 heap-corruption fix |
| **Ollama** | Local platform | 16 | 10 | None |
| **LiteLLM** | Gateway | 24 | 13 | None |
| **Unsloth** | Fine-tuning | 23 | 20 | None |
| **Claude Code Router** | Agent router | 3 | 4 | None |
| **CC Switch** | Agent config/proxy | ~20 | ~14 | None |
| **New API** | Gateway | ~22 | 18 | None; line at v1.0.0-rc.37 |

**Takeaway:** llama.cpp is the only project releasing today (8 builds — a rapid-fix posture after its PCH regression). SGLang shows the highest aggregate velocity by its own reporting; vLLM and LiteLLM show the deepest issue backlogs relative to digest size, concentrated in correctness rather than features.

## 3. Model Support Race

| Domain | Leader today | Evidence |
|---|---|---|
| Frontier model bring-up | **vLLM & SGLang (tied)** | Both racing on DeepSeek-V4.x/DSpark, GLM-5.x, Qwen3.x hybrids, Kimi K3. vLLM: Kimi K3 TP8/PP2/EP8 (#54347), GLM-5.3-Flash TP-sharded indexer (#54951), Nanbeige 4.2, Ling-3.0-flash-VL CUDA graphs. SGLang: MiniMax-M3 sparse prefill (#39345), LLaDA2.2 diffusion MoE (#31768), Step3p7 multimodal, SenseNova tracking. |
| Hardware breadth | **SGLang** | Ascend NPU is a first-class target today: HiCache L3, NCCL weight loader, context parallelism, MXFP4 W4A4 MoE, plus AMD MegaMoEv2 and Intel CPU. vLLM counters with ROCm W4A16/CSA/DSA work. |
| Exotic quant formats | **llama.cpp** | Maple 20B-A1B ternary MoE (TQ1_0/TQ2_0) merged; GigaChat-3.5-432B in conversion. |
| Quantized checkpoints | **Unsloth** | Whole-model NVFP4 for Wan2.2 and HunyuanVideo-1.5 DiTs, per-layer FP4 + flashinfer backend for image DiTs. |
| Provider reach | **LiteLLM / New API** | Opper provider, ChatGPT OAuth device flow (LiteLLM); vLLM/SGLang relay channels + Huawei MaaS (New API #7332/#7239). |

Notable negative results: GLM-5.x NoPE MLA is **unusable on SM120** (SGLang #39302) and DSv4 fails to load on RTX PRO 6000 in vLLM (#40821) — consumer Blackwell is lagging data-center Blackwell significantly on frontier architectures.

## 4. Performance Frontier

Optimization effort concentrates in five areas:

- **KV/prefix-cache correctness and hierarchy.** Roughly half of today's high-severity bugs are cache-related: Qwen3.5 multi-turn multimodal prefix misses (vLLM #56818), DFlash+YaRN zero cache reuse at 1M context (#54094), hybrid-mamba resume corruption (#53142), mamba radix-cache corruption under mixed chunking (SGLang #39342), false HiCache hits on hybrid pools (#39147). On the build side: vLLM's RDMA-capable NIXL OBJ offload tier (#56192) and SGLang's NPU HiCache L3 (#36188). Cache *determinism* is now as important as cache *speed*.
- **Speculative decoding at scale.** vLLM landed DSpark draft-mapping fixes (#55133, #56448) but DFlash on hybrid GDN is a 4× *slowdown* at 185k context (#54691) with no per-sequence disable hook; DDTree and UNO RFCs signal a successor generation. SGLang unlocked split-KV EAGLE verify on CUDA Triton (#39316) and cut ~75 µs/verify-cycle of NCCL all-gathers in DSpark draft heads via NVLink collectives (#39414).
- **FP4-family quantization everywhere.** NVFP4/MXFP4 work spans all layers: vLLM (Marlin MXFP4 on H200), SGLang (W4A8/MXFP8FP4 on B300, with an illegal-address bug #37559), llama.cpp (forced W4A8 for NVFP4 layers on Blackwell), Unsloth (NVFP4 DiTs + int8-first precision ladder).
- **Disaggregated P/D serving.** vLLM identified descriptor submission — not fabric bandwidth — as the GB200 bottleneck for GLM-5.3 (91k–120k descriptors/TP-rank; RDMA beats MNNVL, #55434). SGLang's Rust frontend silently drops PD bootstrap params (#39412) — a reminder that the newest frontends are the least hardened.
- **Kernel-level fusion.** AITER-fused DSA indexer prologue replacing 4 kernels (vLLM #51315), ROCm W4A16 tile retuning (gfx1151), SYCL top_k radix select (K=2048 offload eliminated), Vulkan IQ3_S MMQ for Intel Arc.

## 5. Layer Positioning

- **Serving engines (vLLM, SGLang):** own throughput, scheduling, and model bring-up. Differentiation is thinning — both chase the same models and hardware; SGLang leans heterogeneous-silicon and router-integrated disagg, vLLM leans spec-decode breadth and NIXL-based memory tiers.
- **Local runtime (llama.cpp) vs. platform (Ollama):** llama.cpp is the portability substrate (SYCL, Vulkan, s390x, RPC, ternary quants); Ollama adds product surface — protocol compatibility (Anthropic `/v1/messages`, Codex `/responses`), tool-call rendering, storage hygiene. Ollama's bugs today are product bugs (schema ordering, EXIF, blob orphans), not kernel bugs.
- **Gateways (LiteLLM, New API):** LiteLLM is the enterprise control plane (budgets, spend logs, cooldowns, cache isolation) and is paying for it with accounting-correctness debt (#39370 silent spend zeroing, #22984 uncached-token pricing on vLLM). New API is the reseller/unified-gateway play, now reaching *down* the stack with native vLLM/SGLang channels — early evidence of gateway/engine convergence.
- **Client-side routers (CCR, CC Switch):** thin protocol translators for the Claude Code / Codex desktop ecosystems. Their entire risk surface is cross-protocol leakage: thinking blocks causing 400s (CCR #1784), DeepSeek Responses→Chat loops burning 120k+ tokens (CC Switch #5860), `call_id` rejections. CC Switch's most-requested feature — multi-provider routing (#3703) — remains unimplemented.
- **Fine-tuning (Unsloth):** pivoting from LoRA-training library toward an end-to-end studio (hosted quantized checkpoints, API inference with concurrency controls, MCP tools, agent UX). It now overlaps Ollama's territory more than vLLM's.

## 6. Trend Signals

1. **Hybrid linear-attention models are the new correctness tax.** Qwen3.5/K3/GDN/KDA bugs appear at every layer that touches sequences — prefix cache, radix cache, spec decode, KV offload. Anyone deploying these architectures should budget for a validation cycle, not just a benchmark.
2. **The Responses protocol is fracturing the gateway layer.** Every translation-centric project had a Responses↔Chat bug today: LiteLLM drops reasoning deltas (#40887/#40654), CCR leaks thinking blocks into 400s, CC Switch loops on DeepSeek. Multi-turn agents with persisted history are the epicenter.
3. **Cache determinism is now a cost line-item.** Ollama's tool-schema ordering fix (#18433), the Claude Code system-message hoisting bug (#18431), and LiteLLM's cached-token accounting gaps (#22984) all silently inflate spend. Prefix-cache behavior deserves CI monitoring like latency does.
4. **Speculative decoding has a long-context cliff.** vLLM's 4× slowdown at 185k context (#54691) and SGLang's disagg+spec crash (#39072) suggest spec-decode defaults should be treated as short/medium-context features until proven otherwise.
5. **Hardware diversification is accelerating unevenly.** Ascend NPU investment (SGLang) is substantial and real; consumer/workstation Blackwell (SM120) is the neglected tier — GLM-5.x NoPE MLA simply cannot run there today.
6. **FP4 is crossing from experimental to default.** NVFP4 appears in engines, runtimes, and training-side checkpoints; Unsloth's int8-first ladder change means "auto" precision silently shifts on upgrade — pin explicitly.

**Watch items for agent developers:** vLLM #56370 (batch invariance broken under sequence parallelism — affects RL/eval reproducibility), Ollama #18431 (Claude Code cost regression), New API #7361 (24× memory bloat on rc.37 — pin rc.36 on small VMs), CCR #1796 (Codex desktop launch blocker), and CC Switch #6995/#7156 (sub-agent + heartbeat flows on DeepSeek are the current failure points).

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Daily Digest — 2026-09-14

## 1. Today's Highlights

With no new release tags in the last 24h, the project's velocity is concentrated in **hybrid (Mamba/Attention) KV-cache correctness**, **speculative decoding for long-context hybrid models**, and **GLM-5.3 / DeepSeek-V4 family bring-up on Blackwell and ROCm**. The two most consequential items are a P1-style correctness bug where `VLLM_BATCH_INVARIANT=1` is violated when sequence parallelism is enabled ([#56370](https://github.com/vllm-project/vllm/issues/56370)) and a concrete fix landing for the Qwen3.5 multi-turn prefix-cache miss ([#56818](https://github.com/vllm-project/vllm/pull/56818), related to [#43587](https://github.com/vllm-project/vllm/issues/43587)).

## 2. Releases & Breaking Changes

*No new releases in the last 24h.*

Implicit breaking change worth flagging: the scale-out endpoints gate `VLLM_ENABLE_SCALE_OUT_ENDPOINTS=1` was replaced by a CLI flag `--enable-scale-out` in [#55176](https://github.com/vllm-project/vllm/pull/55176). The EC E2E launcher is being updated accordingly in [#56819](https://github.com/vllm-project/vllm/pull/56819). Operators upgrading CI jobs should swap the env var for the flag.

## 3. New Model & Hardware Support

- **Nanbeige 4.2 (NanbeigeForCausalLM)** via the transformers backend — [PR #56071](https://github.com/vllm-project/vllm/pull/56071)
- **Ling-3.0-flash-VL vision-encoder CUDA graph capture** (`SupportsEncoderCudaGraph` on `BailingMoeV3VLForConditionalGeneration`) — [PR #56820](https://github.com/vllm-project/vllm/pull/56820) (part of the ViT full CUDA graph tracker [#38175](https://github.com/vllm-project/vllm/issues/38175))
- **Nemotron VL — LoRA on the language model only** — [PR #56231](https://github.com/vllm-project/vllm/pull/56231)
- **Kimi K3 sequence parallelism with pipeline parallelism** (TP8/PP2/EP8 topology, DeepGEMM MegaMoE path) — [PR #54347](https://github.com/vllm-project/vllm/pull/54347)
- **GLM-5.3-Flash indexer prefill sharded across TP** — [PR #54951](https://github.com/vllm-project/vllm/pull/54951)

## 4. Performance & Optimization

- **GLM-5.3-Flash indexer prefill**: partition independent query rows into cost-balanced contiguous slices, each TP rank scores against full K history, `all_gatherv` reassembles — reduces duplicated sparse-indexer MQA scoring/top-k. [PR #54951](https://github.com/vllm-project/vllm/pull/54951)
- **ROCm W4A16 prefill dequant (RDNA3)**: Triton fused-dequant GEMM was VALU-issue-bound; reworked tile selection on gfx1151. [PR #55711](https://github.com/vllm-project/vllm/pull/55711)
- **ROCm CSA multi-stream overlap for DeepSeek-V4** (compress_ratio=4): forks three HIP streams to overlap wqa+wkv GEMM, RMSNorm, wq_b paths. (Closed PR, kept for context.) [PR #51794](https://github.com/vllm-project/vllm/pull/51794)
- **RDMA-capable NIXL OBJ tier for KV offload**: adds accelerated object-store config to the existing OBJ tier without changing the JSON shape. [PR #56192](https://github.com/vllm-project/vllm/pull/56192)
- **ROCm DSA indexer prologue fused via AITER** (`indexer_qk_rope_quant_and_cache` replaces four kernels: K-norm, Q/K RoPE, FP8 quant, K-cache write). [PR #51315](https://github.com/vllm-project/vllm/pull/51315)
- **GLM-5.3 P/D on GB200 — KV-connector descriptor bottleneck**: 91k–120k descriptors per TP-rank transfer make MNNVL/cuda_ipc slower than RDMA; tracking issue. [#55434](https://github.com/vllm-project/vllm/issues/55434)
- **DFlash on long-context hybrid GDN**: same setup is ~218 tok/s @ DT=8 short-context vs ~16 tok/s @ DT=4 at 185k context (vs ~71 tok/s spec off); no per-sequence-length disable hook. [#54691](https://github.com/vllm-project/vllm/issues/54691)

## 5. Stability & Regressions

Ranked roughly by severity / blast radius.

1. **`VLLM_BATCH_INVARIANT=1` violated when `pass_config.enable_sp` is on.** Batch-invariance is silently broken on hybrid setups (4× RTX PRO 6000, PCIe). The two arms diverge. No fix PR yet. — [#56370](https://github.com/vllm-project/vllm/issues/56370)
2. **RDNA3 fused MoE hardcodes a 2× gated-activation factor**, breaking non-gated (relu2) models like Nemotron-3 on gfx1100. Open since today, 5 comments. — [#56790](https://github.com/vllm-project/vllm/issues/56790)
3. **OTLP traces endpoint initializes the tracer but never sends spans** (`instrument_otel/manual_instrument_otel` never invoked) — observability silently lost on `vllm-openai:0.29.0` and dev builds. — [#56696](https://github.com/vllm-project/vllm/issues/56696)
4. **DeepSeek-V4.1-Flash + DSpark hits CUDA device-side assert in `map_draft_to_target` at draft warmup on H200 (SM90) with Marlin MXFP4 MoE.** Fix PR: [#56448](https://github.com/vllm-project/vllm/pull/56448) — caps profiling dummy-run query batch for DFlash/DSpark, fixing [#56443](https://github.com/vllm-project/vllm/issues/56443).
5. **sm100 (B200/B300) only: CUDA graph replay changes greedy output for gemma-4-26B-A4B-it with torch.compile off in both arms.** Bit-identical on H200 / RTX PRO 6000 / A100 — so this is a real sm_100-only reproducibility bug. — [#55238](https://github.com/vllm-project/vllm/issues/55238)
6. **DFlash + YaRN: identical 1.04M prompt gets zero prefix-cache reuse** while target-only reuses ~1.039M tokens. — [#54094](https://github.com/vllm-project/vllm/issues/54094)
7. **Hybrid mamba: illegal memory access on prefix-cache resume** with explicit `--block-size` (state column seeded with wrong block size) — affects Qwen3.8-27B W4A16. — [#53142](https://github.com/vllm-project/vllm/issues/53142)
8. **Qwen3.5 multi-turn prefix-cache miss on incremental multimodal requests** — first-sibling miss remains beyond the originally-reported 4→5 image case. Partial fix lands in [#56818](https://github.com/vllm-project/vllm/pull/56818) (related to [#43587](https://github.com/vllm-project/vllm/issues/43587)).
9. **Whisper segment timestamps drift by ~0.5s per segment on audio > 30s** (1s low-energy window chunking). — [#32588](https://github.com/vllm-project/vllm/issues/32588)
10. **Recurring Xid 13 chip-wide warp errors under sustained multi-hour load** with Nemotron-3.5-Lightning-30B-A3B-NVFP4, marlin MoE, hybrid Mamba on SM120 (ROCm path). — [#52225](https://github.com/vllm-project/vllm/issues/52225)
11. **KDA / gated-delta-rule chunked-scan buffers are outside memory profiling** — runtime OOM at large `--max-num-batched-tokens`. — [#54775](https://github.com/vllm-project/vllm/issues/54775)
12. **Filesystem KV offload tier has no integrity verification and no I/O liveness bound.** RFC proposing data-integrity + liveness work. — [#54363](https://github.com/vllm-project/vllm/issues/54363) (RFC)
13. **Long-standing vLLM hang on engine process start** (still receiving updates 16 months later). — [#17676](https://github.com/vllm-project/vllm/issues/17676)
14. **DSv4 fails to load on RTX PRO 6000** (8× Blackwell) — Blackwell model-loading track. — [#40821](https://github.com/vllm-project/vllm/issues/40821)
15. **GLM-5.3-Flash degenerates into repeated-token "word salad" in multi-turn agentic use.** — [#56605](https://github.com/vllm-project/vllm/issues/56605)
16. **T4 triton OOM** on shared memory (80k required vs 65k hardware limit). — [#36802](https://github.com/vllm-project/vllm/issues/36802)

Spec-decode ecosystem updates worth noting: **DSpark draft-to-target `lm_head` mapping fix** for padded-vocab drafts in [PR #55133](https://github.com/vllm-project/vllm/pull/55133); **DDTree** speculative decoding proposed as a DFlash successor in [#40809](https://github.com/vllm-project/vllm/issues/40809); **UNO** (diffusion-augmented LLM) RFC in [#55267](https://github.com/vllm-project/vllm/issues/55267); **MoRI-IO KV block-offset fix for MTP** in [PR #55053](https://github.com/vllm-project/vllm/pull/55053).

## 6. What This Means for Application Developers

- **If you rely on deterministic decoding** (reproducible evals, RL rollouts, test pinning), do not turn on `pass_config.enable_sp` until [#56370](https://github.com/vllm-project/vllm/issues/56370) is resolved. `VLLM_BATCH_INVARIANT=1` is not a guarantee when SP is in the picture.
- **If you run Qwen3.5 (or any Mamba/Attention hybrid) in multi-turn agentic loops with multimodal inputs**, expect prefix-cache misses on incremental turns. [PR #56818](https://github.com/vllm-project/vllm/pull/56818) narrows the original reproducer on 0.29.0 but does not yet cover the "producer continues past final multimodal feature" path. Pin to a known state and revalidate.
- **If you use DFlash/DSpark on hybrid GDN models at long context**, disable it. At ~185k context on Qwen3.5 the speculative path is a 4× slowdown; there is no per-sequence-length disable hook yet. Track [#54691](https://github.com/vllm-project/vllm/issues/54691).
- **If you depend on OTLP for traces**, your spans are likely not being exported on 0.29.0 with `--otlp-traces-endpoint`. Verify on the collector side and follow [#56696](https://github.com/vllm-project/vllm/issues/56696).
- **If you serve on RDNA3 (gfx1100/1151) with non-gated MoE models (e.g. Nemotron-3)**, the fused MoE path will mis-execute. Treat the RDNA3 MoE as gated-only until [#56790](https://github.com/vllm-project/vllm/issues/56790) is resolved.
- **If you operate P/D disaggregation for GLM-5.3 on GB200**, prefer RDMA-backed transports over MNNVL/cuda_ipc; the descriptor submission path is the dominant cost, not fabric bandwidth ([#55434](https://github.com/vllm-project/vllm/issues/55434)).
- **If you KDA-serve at large `--max-num-batched-tokens`**, expect OOMs — the chunked-scan buffers are not in the startup memory profile. Add headroom or lower `max-num-batched-tokens` until [#54775](https://github.com/vllm-project/vllm/issues/54775) lands.
- **CI operators**: replace `VLLM_ENABLE_SCALE_OUT_ENDPOINTS=1` with `vllm serve --enable-scale-out` (per [#56819](https://github.com/vllm-project/vllm/pull/56819)).
- **New capability unlocks**: Nanbeige 4.2 via transformers backend, Ling-3.0-flash-VL with full vision-encoder CUDA graphs, Nemotron VL language-model LoRA, and Kimi K3 SP+PP — all usable behind the vLLM OpenAI server on main.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Daily Digest — 2026-09-14

## Today's Highlights

- **No releases** in the last 24h, but the project remains in heavy development with ~500 PRs updated and 48 issues active. The dominant theme today is **Ascend NPU maturation** (HiCache L3, NCCL weight loader, context parallelism, MXFP4 MoE quant) alongside **DeepSeek V4/DSpark perf hardening** (MegaMoEv2 on AMD, NVLink collectives, B300 MegaMoE buffer fix).
- A cluster of **high-severity stability bugs** were updated/filed: a QSA illegal-memory-access crash on Qwen3.8-Flash-Next-FP8 at 22 concurrent requests (#37633), an MXFP8FP4/W4A8 MegaMoE `CUDA_ERROR_ILLEGAL_ADDRESS` on B300 (#37559), GLM-5.3 crashing under disagg + dp-attention + spec decode (#39072), and GLM-5.x NoPE MLA being completely unsupportable on SM120 (#39302). Two new bugs opened today (#39412 rust frontend drops PD bootstrap params, #39342 mixed-chunk corrupts mamba radix cache) need prompt attention.
- On the **speculative-decoding and HiCache** fronts, split-KV EAGLE verify is being enabled on CUDA Triton (#39316), HiCacheFile's hybrid-pool prefix lookup is being patched (#39147), and HiCache + write-back total token availability got a landed improvement (#38681, closed).

## Releases & Breaking Changes

_No releases published in the last 24h._

## New Model & Hardware Support

- **DeepSeek V4.1 / DSpark** — NVLink collectives and DSpark draft head vocab gather on the NCCL ring ([#39414](https://github.com/sgl-project/sglang/pull/39414)). MegaMoE buffer allocation/caching fixed for effective SM budgets ([#39223](https://github.com/sgl-project/sglang/pull/39223)). MegaMoEv2 integrated via Aiter/FlyDSL on AMD ([#35619](https://github.com/sgl-project/sglang/pull/35619)). SWA mask device mismatch on DSpark verify fixed for NPU ([#39353](https://github.com/sgl-project/sglang/pull/39353)).
- **GLM-5.x family** — Bug-hunting ongoing; perf/feature tracking continues ([#33636](https://github.com/sgl-project/sglang/issues/33636), related bugs #39072, #39302, #29162).
- **Qwen3.8-Next-Flash / -Flash-Next-FP8** — Prefill context parallelism added ([#39062](https://github.com/sgl-project/sglang/pull/39062)); CUDA illegal-memory-access bug observed at TP8 on 8×H20 ([#37633](https://github.com/sgl-project/sglang/issues/37633)).
- **Qwen3.5 MoE on Ascend NPU** — Online + offline W4A4 MXFP4 quantization for fused experts ([#32602](https://github.com/sgl-project/sglang/pull/32602)).
- **MiniMax-M3 (a.k.a. MiniMax-M3) sparse prefill** — Native SM90 FP8 QK block-score kernel lands as Step 1, with Triton Step 2 unchanged ([#39345](https://github.com/sgl-project/sglang/pull/39345)).
- **MiniMax H3 on Ascend A3** — Inference opens with precision issues reported ([#39386](https://github.com/sgl-project/sglang/issues/39386)).
- **MiniMax-M2.7 on Intel CPU** — Remaining optimization TODOs tracking ([#26439](https://github.com/sgl-project/sglang/issues/26439)).
- **LLaDA2.2** — Block-routing MoE serving-side support ([#31768](https://github.com/sgl-project/sglang/pull/31768)).
- **Step3p7** — Batched multimodal image features (multi-item vision encoding) ([#38874](https://github.com/sgl-project/sglang/pull/38874)).
- **Jet-Nemotron-2B on Ascend NPU** — Initial NPU dispatch path so warmup no longer hits the CUDA recurrent gated-delta-rule kernel ([#32805](https://github.com/sgl-project/sglang/pull/32805)).
- **SenseNova-U1/U1.5** — Feature & perf tracking opened, anchored to the upstream OpenSenseNova reference ([#37742](https://github.com/sgl-project/sglang/issues/37742)).
- **Nemotron-3-Ultra-550B-A55B** — SM100 perf tracking continues ([#27286](https://github.com/sgl-project/sglang/issues/27286)).
- **Ascend NPU infra** — HiCache L3 via MemCache storage backend ([#36188](https://github.com/sgl-project/sglang/pull/36188), closed); HiCache adapted for K3 hybrid (MLA + KDA/mamba) models ([#39415](https://github.com/sgl-project/sglang/pull/39415)); NCCL backend for `--remote-instance-weight-loader` ([#39413](https://github.com/sgl-project/sglang/pull/39413)); DeepSeek-V4 prefill context parallelism (interleave/zigzag with layersplit) on NPU ([#38251](https://github.com/sgl-project/sglang/pull/38251)); CUDA graph serialization docs for NPU ([#39091](https://github.com/sgl-project/sglang/pull/39091)); PR-test code-coverage collection ([#38339](https://github.com/sgl-project/sglang/pull/38339)); CI `multimodal_gen` filter fix + scheduled daily run ([#39411](https://github.com/sgl-project/sglang/pull/39411)).

## Performance & Optimization

- **DSV4.1 draft head over NVLink** — DSpark's `markov_w2` sharded across TP issues ~75 µs of all-gathers per verify cycle at bs=1 (5× 13–18 µs NCCL ring hops + a 5 µs fp32 reduce). New PR #39414 targets this with NVLink collectives and on-the-fly vocab gather.
- **MegaMoE buffer sizing on heterogeneous SM budgets** — DeepGEMM derives buffer layout from runtime SM count; SGLang's SM-budget filter previously left oversized buffers. [#39223](https://github.com/sgl-project/sglang/pull/39223) realigns allocation to the effective SM budget, with idle-DP-rank graph-safe handling.
- **Split-KV EAGLE verify on CUDA (Triton backend)** — Currently gated to AMD MI35x via `is_gfx95_supported()`; falls back to `extend_attention_fwd` on CUDA. [#39316](https://github.com/sgl-project/sglang/pull/39316) removes the gate, unlocking the flash-decode-style target-verify grid on Triton CUDA.
- **HiCache + write-back** — Total prefix-cache tokens available when combining HiCache with write-back improved ([#38681](https://github.com/sgl-project/sglang/pull/38681), closed).
- **EAGLE QSA indexer import** — Tilelang was force-imported even on non-Qwen-sparse models, breaking speculative decoding on some images. [#39082](https://github.com/sgl-project/sglang/pull/39082) defers the import below an early return.

## Stability & Regressions

Ranked by likely production impact. Fix PRs noted where one is open/landed.

| Severity | Issue | Summary | Fix status |
|---|---|---|---|
| 🔴 High | [#37633](https://github.com/sgl-project/sglang/issues/37633) | CUDA illegal memory access in QSA extend forward at ~22 concurrent requests on Qwen3.8-Flash-Next-FP8 (TP8, 8×H20, BF16 KV). Suppressed by `CUDA_LAUNCH_BLOCKING=1` / `--disable-overlap-schedule`. | Open |
| 🔴 High | [#37559](https://github.com/sgl-project/sglang/issues/37559) | `CUDA_ERROR_ILLEGAL_ADDRESS` in MXFP8FP4/W4A8 MegaMoE path on B300 with `sgl-deep-gemm` 0.1.7. | Open |
| 🔴 High | [#39072](https://github.com/sgl-project/sglang/issues/39072) | GLM-5.3 crashes under disagg decode + dp-attention + spec decode combination. | Open |
| 🔴 High | [#39302](https://github.com/sgl-project/sglang/issues/39302) | GLM-5.x NoPE MLA (`qk_rope_head_dim=0`, absorbed head dim = `kv_lora_rank` 512) cannot run on SM120 (RTX PRO 6000 Blackwell) — every DSA prefill/decode sparse-MLA backend is unavailable. | Open |
| 🔴 High | [#39412](https://github.com/sgl-project/sglang/issues/39412) | **Opened today.** PD bootstrap params (`bootstrap_host/port/room`) silently dropped by the Rust frontend's OpenAI endpoints during lowering to `GenerateRequest` via `dynamo-protocols`. | Open |
| 🔴 High | [#39342](https://github.com/sgl-project/sglang/issues/39342) | **Opened today.** `--enable-mixed-chunk` corrupts mamba radix cache checkpoints on hybrid GDN models (mixed batch skips extra_buffer write but slot still donated). | Open |
| 🟠 Medium | [#39147](https://github.com/sgl-project/sglang/issues/39147) | `HiCacheFile.batch_exists_v2()` reports unrestorable hybrid prefixes as hits when a required auxiliary pool can't satisfy the prefix. | Open |
| 🟠 Medium | [#39063](https://github.com/sgl-project/sglang/issues/39063) | SM120 grouped FP8 DeepGEMM weight preparation skips UE8M0 requantization guard. | Open |
| 🟠 Medium | [#31206](https://github.com/sgl-project/sglang/issues/31206) | `sgl-router` PD: open circuit breaker still dispatches to decode, producing a permanent "fake-dead" prefill. | Open |
| 🟠 Medium | [#34861](https://github.com/sgl-project/sglang/issues/34861) | NPU: Router GEMM

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-14

## Today's Highlights

A rapid sequence of stability-focused builds (b10944 → b10955) landed today, most notably resolving a **macOS arm64 heap corruption introduced by the ggml-cpu precompiled header** ([b10955 / PR #28882](https://github.com/ggml-org/llama.cpp/pull/28882)) and a **SYCL oneDNN scratchpad pool-order violation** ([b10952 / PR #28704](https://github.com/ggml-org/llama.cpp/pull/28704)). Vulkan remains the most-reported regression hot spot, with three open high-severity issues covering RDNA3 prompt-processing drops and Flash-Attention SCALAR fallbacks. On the model side, the **Maple 20B-A1B ternary MoE** architecture was merged ([PR #27000](https://github.com/ggml-org/llama.cpp/pull/27000)) and work continues on GigaChat 3.5 432B-A28B.

## Releases & Breaking Changes

Eight builds shipped in the last 24h; treat this as a "bump forward" window:

| Build | Change | PR / Issue |
|---|---|---|
| **b10955** | ggml-cpu: disable PCH + fix `CACHE_LINE_SIZE` ambiguity (heap corruption on macOS arm64) | [#28882](https://github.com/ggml-org/llama.cpp/pull/28882), fixes [#28858](https://github.com/ggml-org/llama.cpp/issues/28858) |
| **b10952** | SYCL: fix oneDNN scratchpad breaking pool free order | [#28704](https://github.com/ggml-org/llama.cpp/pull/28704), fixes [#28660](https://github.com/ggml-org/llama.cpp/issues/28660) |
| **b10951** | common: move `llama_n_rs_seq` before `llama_decode`; remove `goto` | [#28749](https://github.com/ggml-org/llama.cpp/pull/28749) |
| **b10950** | ggml-cuda: BF16 → F32 fallback on devices without hardware BF16 (NVIDIA pre-AMPERE, AMD pre-RDNA3 / pre-CDNA) | [#28846](https://github.com/ggml-org/llama.cpp/pull/28846) |
| **b10948** | tests: exclude `HY_V4` from WebGPU `test-llama-archs` | [#28855](https://github.com/ggml-org/llama.cpp/pull/28855) |
| **b10947** | models: guard expert FFN size fallback against zero divisor in nemotron-h NextN/MTP loop | [#28779](https://github.com/ggml-org/llama.cpp/pull/28779) |
| **b10946** | ggml-cpu(s390x): guard VXE-only repack helpers | [#28775](https://github.com/ggml-org/llama.cpp/pull/28775) |
| **b10944** | SYCL: fix `get mem error` (unsupported zes API) + Level Zero SDK detection | [#28227](https://github.com/ggml-org/llama.cpp/pull/28227) |

**Migration note:** the PCH removal ([#28091](https://github.com/ggml-org/llama.cpp/pull/28091)) is being rolled back per [PR #28892](https://github.com/ggml-org/llama.cpp/pull/28892) — downstream build configs that relied on `UNITY_BUILD` / PCH speedups will see slower incremental builds until/unless a corrected PCH strategy lands.

## New Model & Hardware Support

- **Maple 20B-A1B** (DeepGrove) — ternary MoE, 24 layers, 256 experts (8 active), SWA-512 + global attention at 3:1, **TQ1_0 / TQ2_0** ternary quant — **merged** ([PR #27000](https://github.com/ggml-org/llama.cpp/pull/27000)).
- **GigaChat-3.5-432B-A28B** — DeepSeek-V3-style MLA + MoE with hybrid attention, still in conversion ([PR #25342](https://github.com/ggml-org/llama.cpp/pull/25342)).
- **ROCm Linux build matrix** now includes `gfx1103` (Radeon 780M iGPU) ([PR #28423](https://github.com/ggml-org/llama.cpp/pull/28423)).
- **MiMo V2** SWA pattern load fix ([PR #28865](https://github.com/ggml-org/llama.cpp/pull/28865), fixes [#28831](https://github.com/ggml-org/llama.cpp/issues/28831)).
- Model-load correctness sweep: `get_key_or_arr` misuse corrected across several architectures ([PR #28868](https://github.com/ggml-org/llama.cpp/pull/28868)).

## Performance & Optimization

- **Vulkan / Intel Arc A770** — IQ3_S MMQ matmul kernels added (workaround for not enabling `VK_KHR_cooperative_matrix` on Intel), [PR #28822](https://github.com/ggml-org/llama.cpp/pull/28822).
- **SYCL top_k** — radix select to eliminate CPU offload for K=2048 (qwen3.8-flash-next); **merged** ([PR #28670](https://github.com/ggml-org/llama.cpp/pull/28670)).
- **CUDA Flash Attention** — shared-mem swizzle refactor on Blackwell, MHA swizzle disabled by default pending per-arch tuning ([PR #28536](https://github.com/ggml-org/llama.cpp/pull/28536)).
- **NVFP4 W4A8 path** — force W4A8 for NVFP4_W4A16 layers on Blackwell where the default W4A4 path is undesirable ([PR #24364](https://github.com/ggml-org/llama.cpp/pull/24364)).
- **RPC** — hash-cache restricted to weight transfers only (avoids hashing activations), [PR #28789](https://github.com/ggml-org/llama.cpp/pull/28789). Bigger RPC work (`-sm tensor`, async graph compute, custom all_reduce) on [PR #26610](https://github.com/ggml-org/llama.cpp/pull/26610).
- **q8_0 quant** — uses full −128..127 range (was −127..127), matching q5_0/q6_0 ([PR #25493](https://github.com/ggml-org/llama.cpp/pull/25493)).
- **Server rerankers** — RANK pooling batch splitting extended to causal LLM rerankers (Qwen3, Qwen3-VL) ([PR #28876](https://github.com/ggml-org/llama.cpp/pull/28876)).
- **CI / test infra** — fusion baselines get a README + broader triggers ([PR #28893](https://github.com/ggml-org/llama.cpp/pull/28893)); KleidiAI runners bumped 22.04 → 24.04 ([PR #28885](https://github.com/ggml-org/llama.cpp/pull/28885)); ARM `nrc=2` tests added ([PR #28850](https://github.com/ggml-org/llama.cpp/pull/28850)); s390x non-VXE build coverage added ([PR #28776](https://github.com/ggml-org/llama.cpp/pull/28776)).

## Stability & Regressions

Ranked highest → lowest severity. Items with a fix are explicitly noted.

| Sev | Area | Issue | Status |
|---|---|---|---|
| 🔴 Critical | ggml-cpu / macOS arm64 | Heap corruption from PCH ([#28858](https://github.com/ggml-org/llama.cpp/issues/28858)) | **FIXED in b10955** |
| 🔴 Critical

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-14

## 1. Today's Highlights

No new releases shipped in the last 24 hours, but the queue is dominated by **prompt-cache and tool-call correctness bugs** that directly affect Claude Code, qwen3-coder, and the Codex-compatible endpoint. On the upside, two targeted fixes are already in flight: **stable tool schema key ordering** ([PR #18433](https://github.com/ollama/ollama/pull/18433)) and **JPEG EXIF orientation normalization** ([PR #18432](https://github.com/ollama/ollama/pull/18432)). Storage hygiene and integrations also moved forward with a blob-cleanup fix and new `ollama launch` / observability tooling entries.

## 2. Releases & Breaking Changes

No new tagged releases in the last 24 hours. No API or config-breaking changes merged.

## 3. New Model & Hardware Support

- **ROCm 10 on Windows** — Feature request opened ([#18435](https://github.com/ollama/ollama/issues/18435)) citing AMD's official AI ecosystem compatibility matrix for Ryzen AI Max 395. No code changes yet.
- **New model requests:** [Gnani Evon-v3.3 30B-A3B](https://github.com/ollama/ollama/issues/18427), [SARVAM-30b/105b](https://github.com/ollama/ollama/issues/14319).
- **Vulkan integrated GPUs** — Regression fix for Virtio-GPU/Venus and other integrated Vulkan adapters (model-load timeout) landed and closed: [PR #18124](https://github.com/ollama/ollama/pull/18124) (`llama-server` direct I/O, matching CUDA/ROCm).
- **Windows image generation** — [PR #13806](https://github.com/ollama/ollama/pull/13806) closed (carries MLX/MLX-C patches pending upstream merge).
- **Integrations / launch targets:** [Atomic Agent](https://github.com/ollama/ollama/pull/17992) added to `ollama launch`; [Genie](https://github.com/ollama/ollama/pull/18428) added to desktop integrations; [ollama-top](https://github.com/ollama/ollama/pull/18436) added to observability tools; [n8n + ComfyUI examples](https://github.com/ollama/ollama/pull/18316) updated.

## 4. Performance & Optimization

- **Prompt cache hit-rate restored for qwen3-coder:** [PR #18433](https://github.com/ollama/ollama/pull/18433) fixes [#18430](https://github.com/ollama/ollama/issues/18430) by rendering a tool's extra schema keys in a deterministic order instead of relying on Go's randomized map iteration. Identical `/api/chat` and `/v1/chat/completions` requests will now produce identical prompts.
- **Responses-API continuation support:** [PR #18434](https://github.com/ollama/ollama/pull/18434) adds `previous_response_id` continuation to the OpenAI-compatible path. Larger namespace-tool PR [#16263](https://github.com/ollama/ollama/pull/16263) (Responses namespace tool calls, streaming + non-streaming) is still open.
- **Storage hygiene:** [PR #18424](https://github.com/ollama/ollama/pull/18424) cleans up the unreferenced F16 blob left behind by `ollama create --quantize` from a safetensors directory. Reporter measured 830 GB of orphan blobs against 188 GB reported by `ollama list`.
- **Reported (not yet fixed) regressions:**
  - **~5× slower token generation on CUDA** (RTX 3090, 0.33.x vs 0.32.13) — [#18225](https://github.com/ollama/ollama/issues/18225), closed awaiting more info.
  - **Model loading regression** since 0.23.4 across many models (GPT-OSS:120b cited) — [#18373](https://github.com/ollama/ollama/issues/18373).
  - **Multimodal projector OOM on Jetson Orin Nano 8GB** (Gemma 4 E4B) despite CPU-projector config — [#18396](https://github.com/ollama/ollama/issues/18396).

## 5. Stability & Regressions

Ranked by likely user impact:

| Sev | Issue | Summary | Fix? |
|-----|-------|---------|------|
| High | [#18431](https://github.com/ollama/ollama/issues/18431) | Anthropic-compat `/v1/messages` hoists `role: "system"` entries from inside `messages` into the top system block, defeating the prefix cache for Claude Code's per-tool-result system message. | No PR yet |
| High | [#18426](https://github.com/ollama/ollama/issues/18426) | `kimi-k3:cloud` returns HTTP 500 on image content in `tool`-role messages; `kimi-k2.6` and `glm-5.3-flash` work. | No PR yet |
| High | [#18419](https://github.com/ollama/ollama/issues/18419) | `/api/codex/v1/responses` silently returns empty `output_text` + zero token counts on `previous_response_id` tool follow-up. | [#18434](https://github.com/ollama/ollama/pull/18434) (open) addresses `previous_response_id` but not empty-content path |
| Med | [#18390](https://github.com/ollama/ollama/issues/18390) | Gemma 4 tool calls with object keys containing spaces are dropped (empty content, `finish_reason: stop`). Affects `/api/chat` and `/v1/chat/completions`. | No PR yet |
| Med | [#18430](https://github.com/ollama/ollama/issues/18430) | qwen3-coder prompt-cache misses due to non-deterministic tool schema rendering. | [#18433](https://github.com/ollama/ollama/pull/18433) (open) |
| Med | [#16532](https://github.com/ollama/ollama/issues/16532) | gemma4 ignores attached images on Windows. | No PR yet |
| Med | [#18396](https://github.com/ollama/ollama/issues/18396) | Gemma 4 E4B multimodal OOMs Jetson Orin Nano 8GB host even when projector is on CPU. | No PR yet |
| Low | [#18387](https://github.com/ollama/ollama/issues/18387) | ≥10 ellipses between TOC titles and page numbers triggers server-side `cancel task`. | No PR yet |
| Low (closed) | [#18225](https://github.com/ollama/ollama/issues/18225), [#18208](https://github.com/ollama/ollama/issues/18208), [#18185](https://github.com/ollama/ollama/issues/18185) | Performance regression, corrupted `<unused49>` tokens from long-lived runners, custom GPU/CPU allocation. All closed as "needs more info." | — |
| Hygiene | [#3185](https://github.com/ollama/ollama/issues/3185) | Long-standing (2024) report that Ollama's release artifacts don't ship MIT copyright notices for statically linked dependencies like llama.cpp. 275 👍, 58 comments, still open. | No PR yet |

**JPEG EXIF note:** [PR #18432](https://github.com/ollama/ollama/pull/18432) is in flight to normalize EXIF orientations 2–8 at the shared media-construction boundary so llama-server and MLX runners both see upright pixels (fixes [#18418](https://github.com/ollama/ollama/issues/18418)). This is especially relevant for teams feeding camera/phone photos into VLMs on Windows.

## 6. What This Means for Application Developers

- **Cache-sensitive Claude Code users** should pin to a build *before* the affected changes or watch [#18431](https://github.com/ollama/ollama/issues/18431) — system messages injected after each tool result are no longer being kept in place, so cost and latency will rise even with the same conversation.
- **`qwen3-coder:30b` tool callers** should expect prompt-cache misses on retries today; review [#18433](https://github.com/ollama/ollama/pull/18433) and consider disabling client-side tool schema normalization that may amplify the nondeterminism.
- **Cloud endpoint users** should avoid `kimi-k3:cloud` for tool + image flows ([#18426](https://github.com/ollama/ollama/issues/18426)) and prefer `kimi-k2.6` / `glm-5.3-flash`; the `/api/codex/v1/responses` continuation path is currently unreliable for tool follow-ups ([#18419](https://github.com/ollama/ollama/issues/18419)).
- **Self-hosted operators** running 0.33.x on CUDA (especially RTX 3090-class) should benchmark against 0.32.13 and consider pinning if they see the ~5× slowdown in [#18225](https://github.com/ollama/ollama/issues/18225). Also audit `~/.ollama/models/blobs` if you've used `ollama create --quantize` from safetensors; [PR #18424](https://github.com/ollama/ollama/pull/18424) gives a manual cleanup recipe in the description.
- **VLM + Windows / integrated-GPU users**: gemma4 image inputs don't work on Windows yet ([#16532](https://github.com/ollama/ollama/issues/16532)), and Virtio-GPU/Venus loads were fixed but only on the closed Vulkan path ([#18124](https://github.com/ollama/ollama/pull/18124)). Plan around these until EXIF normalization ([#18432](https://github.com/ollama/ollama/pull/18432)) merges.
- **ROCm on Windows** is not yet supported — pin to Linux or CPU/Metal stacks until [#18435](https://github.com/ollama/ollama/issues/18435) is addressed.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-14

## 1. Today's Highlights

Activity is dominated by **accounting and telemetry correctness** work: two open bugs report that the Responses↔Chat bridge drops incremental reasoning deltas and plaintext reasoning text (#40887, #40654), and the `/model/info` listing endpoint is being rewritten with `orjson` after a 973-row response was measured at ~440 ms (#41061). On the stability side, a serious budget-reset edge case was filed (#39370) where rows with `budget_duration=null` and a stale `budget_reset_at` cause spend to be silently zeroed on every reset tick — there is a related fix PR #40940 that addresses the cache-invalidation side of the same problem class.

## 2. Releases & Breaking Changes

No releases were published in the last 24 hours. No API or config-level breaking changes are visible in the current data.

## 3. New Model & Hardware Support

- **Opper provider** — PR #36075 adds a new `opper/` provider modeled on OpenRouter, with a price-map entry for the 600+ model gateway catalog and `usage.cost` forwarding.
- **Bourse provider (proposed)** — Issue #41042 requests adding Bourse, an OpenAI-compatible reseller; today it works as a generic `openai/` endpoint but lacks first-class routing.
- **Rust pipeline parity for Ollama** — PR #40326 routes `ollama_chat` through the Rust core with a Python fallback and adds provider-parity e2e tests.
- **Vertex AI Claude versioned IDs** — Issue #40363 reports `vertex_ai/claude-haiku-4-5*` entries capped at 8192 output tokens instead of 64000, and that versioned IDs receive a silent 4096 `max_tokens` default.
- **ChatGPT OAuth device-flow provider** — Issue #41017 (closed) exercised the `chatgpt/` provider end-to-end against `chatgpt.com/backend-api/codex/responses` with `gpt-5.6-sol`, surfacing a response-parsing gap.

## 4. Performance & Optimization

- **Proxy `/model/info` serialization** — PR #41061 serializes the ~6 MB, 973-row listing once with `orjson` and returns a prebuilt `Response`, eliminating FastAPI's per-request `jsonable_encoder` walk. Baseline ~440 ms for the listing.
- **Async success handler deduplication** — PR #41058 stops `wrapper_async` from re-submitting the sync success pipeline, which was running logging callbacks twice per call and racing on the logging object.
- **Type-safety refactor** — PR #40251 removes 715 `Any` errors across 114 backend files (part of a 10,720-error sweep across 1,160 files), making untyped payloads visible to review.
- **End-user budget reset batching** — PR #40587 (closed) chunks end-user ID filters into 30,000-ID batches to stay inside PostgreSQL's bind-variable limit.

## 5. Stability & Regressions

Ranked by severity; open items have fix candidates noted where present.

**High severity — accounting & spend correctness**

- **#39370** — `budget_duration=null` rows with a stale `budget_reset_at` are picked up by the reset job every tick and silently zero spend forever. No fix PR yet.
- **#29913** *(closed)* — Streaming `/v1/responses` never wrote a `LiteLLM_SpendLogs` row, leaving requests uncharged.
- **#40736** — Streaming usage merger retains stale cache-write tokens after an explicit zero update; relates to #34497 (Bedrock Invoke drops cache counts) and #15263 (older negative cached-prompt-cost).
- **#22984** — VLLM `cached_tokens` are not fed into the cost calculator, so cached-token pricing is ignored on VLLM-backed deployments.
- **#40649** — Admin UI model edit persists derived pricing; after a price-map reload Azure spend records as $0 (relates to #30081).
- **#29955** *(closed)* — Response-cache key is derived only from request params, so cross-tenant cache reuse was possible on multi-team proxies.
- **#40940** *(fix PR, open)* — Invalidate stale key/user/team caches and retry Redis spend-counter resets on budget reset; complements #40587.

**High severity — protocol & provider transforms**

- **#40887** — Responses-to-Chat streaming bridge never maps incremental `delta.reasoning_item`s and only attaches `reasoning_items` on terminal events, losing reasoning progress and cached reasoning state.
- **#40654** — Same Responses-to-Chat bridge drops provider plaintext `reasoning_text` in both streaming and non-streaming results.
- **#30301** — LiteLLM-internal `optional_params` leak into request bodies and are rejected by strict providers; same failure class across multiple issues.
- **#40583** — `custom_code` and `tool_permission` pre-call guardrails cannot see or block MCP tools delivered via Anthropic `/v1/messages`.
- **#40860** *(fix PR, open)* — Translates Anthropic `content_filter` → `refusal` so filtered responses are no longer indistinguishable from success.
- **#40853** *(fix PR, open)* — Responses WebSocket was dropping explicit deployment API keys before the upstream handshake.
- **#41064** *(fix PR, open)* — Bedrock Nova Sonic realtime failures after the WebSocket handshake were swallowed, so the router never counted failures, never cooled down, and acked `session.updated` too early.
- **#25532** *(closed)* — WebSocket `/v1/responses` required `model` as a query param instead of inside the `response.create` payload, breaking OpenAI spec.
- **#29810** *(closed)* — `cache_control_injection_points` on `/v1/responses` was a silent no-op and triggered a deterministic Claude tool-call loop until MaxTurns.
- **#27470** *(closed)* — Router cooldown TTL conflated 429 rate-limit and 429 quota-exhausted, which have very different retry semantics.
- **#40363** — Vertex AI Claude versioned IDs and `vertex_ai/claude-haiku-4-5*` map entries have wrong `max_tokens` defaults/caps.

**Medium severity — operability & UX**

- **#10788** — `LITELLM_LOG=ERROR` does not silence per-request `INFO` lines on the proxy; long-standing, no fix.
- **#26097** — Self-hosted install fails because `prisma generate` is not permitted in the install script.
- **#41029** *(closed)* — Admin UI sidebar navigation triggers a full page reload plus a 404 prefetch storm from Next's link prefetcher on every route.
- **#40553** *(closed)* — Public team aliases listed in `/v1/models` lose model metadata on `GET /v1/models/{id}`.
- **#19105** — Confusion around team vs. team-member budget limit configuration; originally a discussion thread.
- **#39057** — Design question: on cache hits, `spend=0` but `tokens` replay the original usage — which column should downstream reports aggregate on?
- **#33371** — RFC for a structured, machine-readable provider-error / route-health contract from the router (modeled on OpenRouter's `openrouter_metadata`).

**Medium severity — internal regressions caught by tests**

- **#31427** — `safe_dumps` false-positive circular reference when the same value appears in two sibling (non-nested) positions.
- **#41058** *(open PR)* — Async success pipeline running twice per call.
- **#31822** *(open PR)* — Realtime auto-injects `response.create` on transcription completion even without an active `realtime_input_transcription` guardrail.
- **#31204** *(open PR)* — Anthropic `count_tokens` drops custom `api_base`/`ANTHROPIC_API_BASE`.
- **#41056** *(open PR)* — `/v1/moderations`, Assistants, threads, and batches responses never carry `x-litellm-call-id`; header builder now falls back to call-id from response metadata.
- **#35150** *(open PR)* — Active lock eviction in the spend-adjustment registry can lose concurrent charges and refunds.
- **#41029** *(closed)* — Admin UI full reload + 404 prefetch storm.

## 6. What This Means for Application Developers

- **Reasoning streaming through the proxy is currently lossy.** If you route a `responses`-style model through `/v1/chat/completions`, expect missing incremental reasoning deltas (#40887) and dropped `reasoning_text` (#40654). Until those land, prefer hitting the native `/v1/responses` endpoint or the upstream provider directly for reasoning-critical flows.
- **Multi-tenant deployments should re-verify cache isolation.** The cross-tenant response-cache leak (#29955) is closed, but anyone running an older build should audit whether their cache key actually incorporates the team/virtual-key, and not just model + prompt.
- **Budget-reset behavior on edge rows is unsafe in current builds.** Teams/keys with `budget_duration=null` plus a stale `budget_reset_at` will be silently zeroed every tick (#39370); treat those configurations as at-risk until the upstream fix lands. Pair this with #40940 once it merges to also pick up the cache-invalidation correction.
- **Cost accounting for cached tokens is uneven.** VLLM deployments ignore cached-token pricing entirely (#22984), and streaming usage can carry stale cache-write tokens (#40736). Until those are fixed, dashboards that rely on cached-token math should be cross-checked against raw provider usage.
- **`/model/info` is about to get meaningfully faster.** A 973-row listing dropping from ~440 ms via the `orjson` short-circuit (#41061) will affect any control-plane polling against that endpoint — including UI listings and external inventory sync jobs.
- **Anthropic content-filter responses are now distinguishable.** PR #40860 maps `content_filter` to `refusal` so your downstream refusal-handling paths will start firing where they previously missed. If you have logic gated on the old behavior, review it before upgrading.
- **Realtime robustness on Bedrock Nova Sonic is being tightened.** PR #41064 ensures deferred handshake failures reach the router, so failures will now correctly trigger cooldown/fallback instead of silently consuming the session.
- **New build target on the horizon.** Ollama is moving onto the Rust core (#40326) with parity tests; expect proxy startup and per-request overhead on Ollama routes to change once that path becomes default.
- **Operational frictions that remain.** You still cannot silence request-level `INFO` logs via `LITELLM_LOG` (#10788), self-hosted installs can fail on `prisma generate` permissions (#26097), and the Admin UI does full page reloads on every sidebar click on older builds (#41029, closed — verify you're on the fixed version).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-14

## Today's Highlights

Heavy focus on NVFP4 quantization across Studio's video/image diffusion stack — three coordinated PRs (#10883, #10729, #10730) introduce per-layer and whole-model FP4 with flashinfer backend and hosted pre-quantized checkpoints, alongside a default precision ladder change (#10888) that walks int8 first on every GPU tier. Platform breadth also expanded with the first official AMD ROCm Docker image (#10820), and tool/MCP infrastructure gained a Parallel Search MCP provider (#10286) and per-server image attachments for MCP tools (#10871).

## Releases & Breaking Changes

No releases published in the last 24h. Several merged/closed PRs imply behavior changes for existing installs — review carefully:

- **#9222 (merged)** — Unsloth Studio Desktop on Linux now defaults to native OS-trust-store TLS; the AppImage/.deb launcher doesn't read shell profiles, so `UNSLOTH_STUDIO_NATIVE_TLS=1` is no longer required. ([PR #9222](https://github.com/unslothai/unsloth/pull/9222))
- **#10888 (open)** — `auto` transformer precision now prefers int8 over fp8 on data-center Ada/Hopper/Blackwell parts (previously consumer-only). Behavioral change for users on auto mode. ([PR #10888](https://github.com/unslothai/unsloth/pull/10888))
- **#10687 (closed/superseded)** — DGX Spark (GB10) integrated-GPU memory sizing now uses unified system pool (matching MPS), so flux.2-klein-class loads will no longer be refused for false-positive OOM. ([PR #10687](https://github.com/unslothai/unsloth/pull/10687))

## New Model & Hardware Support

- **NVFP4 whole-model for video DiTs** — Wan2.2-TI2V-5B, Wan2.2-T2V-A14B (both experts), HunyuanVideo-1.5 (480p/720p); torchao backend with hosted pre-quantized denoisers. ([PR #10729](https://github.com/unslothai/unsloth/pull/10729))
- **NVFP4 per-layer + flashinfer FP4 backend for image DiTs** — GPTQ builder, baked activation scales, gated auto-ladder entry. ([PR #10730](https://github.com/unslothai/unsloth/pull/10730))
- **Flashinfer NVFP4 kernel items** — device guard, persistent barrier, bias path, cached dispatch. ([PR #10731](https://github.com/unslothai/unsloth/pull/10731))
- **Official image defaults to hosted INT8/FP8 checkpoint** when available — analogous to the MiniMax H3 hosted-denoiser pattern. ([PR #10883](https://github.com/unslothai/unsloth/pull/10883))
- **AMD ROCm Docker image** — RDNA2/3/4 and CDNA support, mirroring the existing CUDA image's `docker/` layout and `build.sh`/`run.sh` entrypoints. ([PR #10820](https://github.com/unslothai/unsloth/pull/10820))
- **Krea2 LoRA training** requested by users ([Issue #10881](https://github.com/unslothai/unsloth/issues/10881)); not yet implemented.

## Performance & Optimization

- **NVFP4 GPU time budget + DiT VAE decode compile** ([PR #10889](https://github.com/unslothai/unsloth/pull/10889)) — measurement pass identified denoiser GEMMs and VAE decode as top-cost items; per-render budget added and VAE decode now compiled.
- **Auto precision ladder walks int8 first** ([PR #10888](https://github.com/unslothai/unsloth/pull/10888)) — eliminates the consumer/data-center split that previously put fp8 ahead on Ada/Hopper/Blackwell.
- **API inference concurrency gate** ([PR #5482](https://github.com/unslothai/unsloth/pull/5482)) — adds `UNSLOTH_API_MAX_CONCURRENCY` / `--api-max-concurrency` and `wait`/`reject` queue policies (`UNSLOTH_API_QUEUE_POLICY`), default kept at one concurrent request.
- **DGX Spark unified-memory budgeting** ([PR #10687](https://github.com/unslothai/unsloth/pull/10687)) — fixes the 24 GB / 0 GB usable misclassification on integrated CUDA.
- **GGUF context release during tool approval** ([PR #10673](https://github.com/unslothai/unsloth/pull/10673)) — parked chats now free context reservations so queued chats can use reported free slots.
- **Studio markdown render scope fix** ([PR #10924](https://github.com/unslothai/unsloth/pull/10924), stacked on #10688) — eliminates full-document re-renders triggered by false link-definition probes.

## Stability & Regressions

**Newly reported (open)**
- **High: `Error: terminated` / retry exhaustion on `unsloth start pi`** on slow CPU hosts with limited RAM; fix in #10911. ([Issue #10912](https://github.com/unslothai/unsloth/issues/10912))
- **High: `--tensor-split` silently ignored** — author reports hours lost; no fix PR linked. ([Issue #10355](https://github.com/unslothai/unsloth/issues/10355))
- **Medium: Nemotron attention handling broken** since at least 2026-07; one 👍, six comments, still open. ([Issue #7527](https://github.com/unslothai/unsloth/issues/7527))
- **Medium: Memory usage growth since last llama.cpp update** in Studio web UI; fresh report. ([Issue #10921](https://github.com/unslothai/unsloth/issues/10921))
- **Medium: Cloud model connections fail due to conflicting Run settings** — parameters from saved runs conflict with provider-specific defaults. ([Issue #10917](https://github.com/unslothai/unsloth/issues/10917))
- **Medium: Windows ARM64 desktop installer fails on `pyarrow`**; CLI install succeeds. ([Issue #10875](https://github.com/unslothai/unsloth/issues/10875))
- **Medium: install.ps1 flagged by Windows antivirus**, blocking PowerShell update path. ([Issue #10805](https://github.com/unslothai/unsloth/issues/10805))
- **Low: Docker mode doesn't persist downloaded models** — docs need a mounted volume callout. ([Issue #10923](https://github.com/unslothai/unsloth/issues/10923))
- **Low: Intel ARC 140T Laptop GPU installation failing on Windows** — still open since 2026-08-13. ([Issue #8632](https://github.com/unslothai/unsloth/issues/8632))

**Closed today**
- Desktop GGUF `-ngl -1` not releasing system RAM after model moves to VRAM. ([Issue #9033](https://github.com/unslothai/unsloth/issues/9033))
- vLLM connection rejects `min_p` / `logit_bias`. ([Issue #10573](https://github.com/unslothai/unsloth/issues/10573))
- Replayed tool calls sort argument keys, forcing llama-server to re-process multi-param calls. ([Issue #10791](https://github.com/unslothai/unsloth/issues/10791))
- Duplicate tool-call guard prevents re-running commands after file changes (e.g., re-running tests). ([Issue #10792](https://github.com/unslothai/unsloth/issues/10792))
- Studio can't train local HF-cache model — allowlist misses `model-00000-of-00001.safetensors`. ([Issue #10853](https://github.com/unslothai/unsloth/issues/10853))
- Tooltip covers Windows window controls in image/video space. ([Issue #10226](https://github.com/unslothai/unsloth/issues/10226))

**Fix PRs available for open issues**
- RAG tombstoning on project recreate: [#10583](https://github.com/unslothai/unsloth/pull/10583) fixes [#10567](https://github.com/unslothai/unsloth/issues/10567).
- torchcodec 0.12 ABI exemption ignoring cu128 wheel index: [#10582](https://github.com/unslothai/unsloth/pull/10582) fixes [#10434](https://github.com/unslothai/unsloth/issues/10434).
- Docker Studio `unsloth-studio-update --ref` killing the in-container Studio: [#10826](https://github.com/unslothai/unsloth/pull/10826).

## What This Means for Application Developers

- **Studio inference throughput is changing shape under you.** The int8-first auto ladder and NVFP4 image/video paths mean that simply upgrading can shift which quant gets selected for your model. Pin precision explicitly if you depend on determinism, or audit render benchmarks after upgrade.
- **MCP tooling is becoming first-class.** Parallel Search MCP ([PR #10286](https://github.com/unslothai/unsloth/pull/10286)) is a free authless web search provider you can opt into without API keys, and per-server MCP image attachments ([PR #10871](https://github.com/unslothai/unsloth/pull/10871)) give you a default-off way to feed vision into tool calls. A "one-click MCP Hub" is requested ([Issue #10822](https://github.com/unslothai/unsloth/issues/10822)).
- **Agent safety and UX primitives are landing.** Manual `rm` approval ([Issue #9972](https://github.com/unslothai/unsloth/issues/9972)), configurable tool-response truncation ([Issue #10135](https://github.com/unslothai/unsloth/issues/10135)), pre-compaction self-notes ([Issue #10904](https://github.com/unslothai/unsloth/issues/10904)), and a native Agent Builder with reusable profiles ([Issue #10773](https://github.com/unslothai/unsloth/issues/10773)) are the shape of agent UX users are asking for.
- **Data prep gets a correctness primitive.** `audit_supervision` ([PR #10852](https://github.com/unslothai/unsloth/pull/10852)) is a pre-flight report of what an SFT dataset actually supervises — valuable whenever `train_on_responses_only` masks instruction tokens on Phi-3/4, Mistral `[INST]`, Qwen3, or non-Llama templates using Llama-3 chat templates.
- **Dataset download without HF publishing** is now exposed via `GET /api/data-recipe/jobs/{job_id}/download` ([PR #10708](https://github.com/unslothai/unsloth/pull/10708)) — JSONL by default, parquet zip optional. Useful for CI pipelines that want to consume Data Recipes without HF round-trips.
- **Linux server-side Studio users will see TLS handling change** with #9222; verify corporate CA bundles still work, since the OS trust store now drives certificate validation.
- **AMD is now a deployment target** via the ROCm Docker image. If you've been holding off on AMD hardware (RDNA2/3/4, CDNA) for Unsloth workloads, this is the first end-to-end image.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-14

## Today's Highlights
Activity continues to cluster around **Codex integration** and **cross-protocol translation correctness**. A newly opened issue (#1795) and matching PR (#1796) address a Codex desktop-app launch failure tied to `fast_mode` injection, while PR #1784 targets a 400-class error from OpenAI Responses upstreams when translated Claude thinking blocks leak into `reasoning` input items. A separate PR #1794 raises the gateway config-acceptance timeout, which has been a longstanding flakiness source under cold-start conditions.

## Releases & Breaking Changes
*No new releases in the last 24h. No public API or config-format changes announced today.*

## New Model & Hardware Support
*None reported in the current data set.*

## Performance & Optimization
- **PR #1794 [OPEN]** — *fix(gateway): raise and make configurable the core config-acceptance timeout*. The hardcoded 5s budget in `spawnGatewayProcess` measures child startup **and** `require()` of the real gateway entry, causing spurious failures on slower boxes. The change makes this budget configurable. ([PR #1794](https://github.com/musistudio/claude-code-router/pull/1794))

## Stability & Regressions
Ranked by likely user impact:

1. **[HIGH] Codex desktop-app launch failure (Issue #1795 [OPEN]).** Launching the Codex profile through CCR fails immediately after the app-server initialize handshake with *"This app server did not provide application network requirements."* Reported on macOS 26.7.0 / ChatGPT desktop 26.908 / `codex-cli` 0.154.0-alpha.6.2. **Fix:** [PR #1796](https://github.com/musistudio/claude-code-router/pull/1796) prevents `fast_mode` injection into a `null` config-requirements payload. ([Issue #1795](https://github.com/musistudio/claude-code-router/issues/1795))
2. **[MEDIUM] HTTP 400 on cross-protocol fallback (Issue #1615 [CLOSED]).** When a fallback chain mixed `anthropic_messages` and `openai_responses`, a retryable failure on the first hop returned 400 on the second because the executor did not re-run protocol translation. Closed today; resolution referenced from the issue thread. ([Issue #1615](https://github.com/musistudio/claude-code-router/issues/1615))
3. **[MEDIUM] OpenAI Responses rejects translated thinking blocks (PR #1784 [OPEN]).** Codex API rejects `reasoning` input items with non-empty `content` arrays (HTTP 400 `array_above_max_length`), which occurs whenever a translated Claude `thinking` block is present in history. Related groundwork landed in [PR #1702](https://github.com/musistudio/claude-code-router/pull/1702) (now closed), which strips top-level `thinking`/`reasoning_split` and `type: "thinking"`/`"redacted_thinking"` content blocks for OpenAI upstreams. ([PR #1784](https://github.com/musistudio/claude-code-router/pull/1784))
4. **[LOW] Codex app hides Speed control for custom providers (Issue #1683 [CLOSED]).** Root cause is the Codex app's catalog reader, not CCR's middleware; CCR data is verified complete. Closed as upstream-side. ([Issue #1683](https://github.com/musistudio/claude-code-router/issues/1683))

## What This Means for Application Developers
- **Avoid mixing protocols in fallback chains until #1615 is fully verified.** If you route Codex traffic through `openai_responses` with an `anthropic_messages` fallback (or vice versa), verify the fix is present in your pinned build before relying on automatic retries — a single retryable error could otherwise become a hard 400.
- **Codex-desktop users on CCR should track PR #1796.** The `fast_mode` injection bug blocks the Codex profile from starting at all on recent ChatGPT desktop builds; the fix is in review today.
- **Treat reasoning/thinking content carefully in multi-turn Codex sessions.** Even after #1784/#1702 land, anything that retains Claude-style thinking blocks in persisted history and then replays them against an OpenAI Responses upstream risks 400s. If you store or replay conversation history, plan to strip `thinking`/`redacted_thinking` blocks yourself or stay on a single-protocol upstream.
- **Operators on cold/slow hosts should review PR #1794.** The 5s config-acceptance budget has been a hidden SPOF for parent-process supervision; making it configurable removes a class of flaky-startup incidents on large images or restricted CI runners.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-14

## 1. Today's Highlights

No new releases in the last 24 hours; activity is dominated by **Codex-side proxy correctness fixes** (DeepSeek responses↔chat conversion, reasoning-effort passthrough, stream priming) and **ecosystem expansion** with first-class app integrations for DeepSeek Harness and MiniMax Code landing as open PRs. A long-running top feature request — **multi-provider routing** (#3703, 17 comments, 6 👍) — is still unaddressed and continues to attract the most community engagement.

## 2. Releases & Breaking Changes

No new tagged releases in the last 24h. Notable merged-pending behavior changes visible in today's PRs:

- **CLI/Codex sessions unification gate** (#7386) — explicit `model_provider = "openai"` will now pass through `inject_codex_unified_session_bucket`, enabling official OpenAI routes in the unified-session path. Affects users migrating between 3rd-party relays and official Codex.
- **Claude Desktop 3P profiles on Linux** — #7331 (closed) and #7389 (closed, supersedes) added `XDG_CONFIG_HOME` resolution with Flatpak fallback to host `~/.config`. Already shipped in #4855.
- **DNS resolution behavior change** (#7125, closed) — Fix removes a bug where the local proxy hijacked `api.deepseek.com` to `127.0.0.1`. Users on patched builds should re-test direct DeepSeek routes.

## 3. New Model & Hardware Support

- **DeepSeek Harness (DSH)** as a first-class app — [#7356](https://github.com/farion1231/cc-switch/pull/7356). App type, native YAML/credential writer, Codex-style provider form, live-state commands. Supersedes #6526.
- **MiniMax Code harness** support — [#7383](https://github.com/farion1231/cc-switch/pull/7383). Provider/model management, MCP, Skills, global instructions, local session history, and usage tracking, all using native config files shared with the TUI/desktop.
- **Tencent CodeBuddy / WorkBuddy** integration — [#7176](https://github.com/farion1231/cc-switch/pull/7176). Usage stats, session import, managed API switching.
- **Gemini CLI JSONL session import** — [#2771](https://github.com/farion1231/cc-switch/pull/2771) and [#7385](https://github.com/farion1231/cc-switch/pull/7385) restore token-usage sync for `session-*.jsonl`, broken since the Gemini CLI 0.45.2 format change. Long-standing gap also tracked in [#3938](https://github.com/farion1231/cc-switch/issues/3938).
- **Muse Spark reasoning-effort passthrough** — [#7397](https://github.com/farion1231/cc-switch/issues/7397) / [#7398](https://github.com/farion1231/cc-switch/pull/7398). `muse-spark-*` added to `supports_reasoning_effort()` so `/effort` is no longer silently dropped in Anthropic→Responses.
- **Laonong API** presets across multiple apps — [#7296](https://github.com/farion1231/cc-switch/pull/7296).

## 4. Performance & Optimization

- **Outbound redaction with reversible placeholders** — [#7306](https://github.com/farion1231/cc-switch/pull/7306). Replaces fixed `*`-masking with typed tokens like `{{PHONE:...}}`, restoring entity identity to the model and reducing cross-entity collisions. Improves downstream agent reasoning quality without changing the redacted surface to the relay.
- **Hermes usage aggregation** — [#6120](https://github.com/farion1231/cc-switch/pull/6120). Read-only import of `session_model_usage` into the Usage Dashboard as a separate data source with delta-based trend windowing. Notably does **not** require traffic to traverse the local proxy.
- **Provider error envelopes surfaced** — [#6912](https://github.com/farion1231/cc-switch/pull/6912). Some relays (e.g. GLM's native Codex endpoint) return `200` with an error envelope; previously model fetch silently produced empty lists. Misconfiguration becomes visible instead of failing as "no models found".

## 5. Stability & Regressions

Ranked by severity and reproducibility.

🔴 **High**
- **DeepSeek infinite loop on Responses→Chat** — [#5860](https://github.com/farion1231/cc-switch/issues/5860) (closed). The transform duplicated an assistant turn and copied `reasoning_content`, causing Codex+DeepSeek to loop up to 120k–140k tokens per turn. Closure noted; downstream DeepSeek path still fragile.
- **Codex heartbeat breaks DeepSeek sessions** — [#6995](https://github.com/farion1231/cc-switch/issues/6995). Heartbeat auto-injects `function_call_output` without `call_id`; `/v1/responses` returns 400 and the thread is permanently wedged. New thread required.
- **DeepSeek Chat upstream rejects short `tool_call_id`** — [#7156](https://github.com/farion1231/cc-switch/issues/7156). Sub-agent tool calls (Codex `26.901.x`) deterministically 400 via tokenrhythm relay. Compensating fix shipped in [#7378](https://github.com/farion1231/cc-switch/pull/7378) (omits null `description`); `tool_call_id` length still open.
- **DNS hijack of `api.deepseek.com` → `127.0.0.1`** — [#7125](https://github.com/farion1231/cc-switch/issues/7125) (closed). Local proxy resolved upstream hostnames to loopback. Resolved.

🟡 **Medium**
- **OAuth takeover leaves stale account bindings** — [#7377](https://github.com/farion1231/cc-switch/issues/7377), [#7395](https://github.com/farion1231/cc-switch/pull/7395). After deleting a managed ChatGPT account and re-logging-in, switching provider fails until manual rebind. Fix PR open.
- **CC Switch forces `requires_openai_auth` in Codex `config.toml`** — [#7211](https://github.com/farion1231/cc-switch/issues/7211).
- **Provider switch breaks Codex history (`model_provider` mismatch)** — [#7362](https://github.com/farion1231/cc-switch/issues/7362), [#7257](https://github.com/farion1231/cc-switch/issues/7257), [#7310](https://github.com/farion1231/cc-switch/issues/7310) (closed). `state_5.sqlite` stores `model_provider` per thread; flipping 3rd-party ↔ official orphans conversations. Partial mitigation in [#7386](https://github.com/farion1231/cc-switch/pull/7386).
- **OMO ≥ 4.19.3 silent fallback when OpenCode config lives on WSL** — [#7367](https://github.com/farion1231/cc-switch/pull/7367) fixes detection; without it, writes go to a legacy file OMO no longer reads — appears to succeed but doesn't.
- **Claude→Responses stream priming can hang** — [#5368](https://github.com/farion1231/cc-switch/issues/5368) (stale).
- **GPT-5.x `explicit max effort` downgraded to `xhigh`** — [#5367](https://github.com/farion1231/cc-switch/issues/5367) (stale).
- **DeepSeek Responses 404 on Codex 3.17.0** — [#5408](https://github.com/farion1231/cc-switch/issues/5408) (stale).

🟢 **Low / Cosmetic**
- DeepSeek multimodal flash model rejected on Codex when image input attached — [#7308](https://github.com/farion1231/cc-switch/issues/7308).
- Deleted skills still listed in UI — [#5352](https://github.com/farion1231/cc-switch/issues/5352).
- Local detection errors for Claude / Codex / Gemini / OpenCode on Windows — [#2824](https://github.com/farion1231/cc-switch/issues/2824).

## 6. What This Means for Application Developers

- **Don't ship a multi-provider demo on Codex + DeepSeek** until [#6995](https://github.com/farion1231/cc-switch/issues/6995) and [#7156](https://github.com/farion1231/cc-switch/issues/7156) are fully resolved — sub-agent flows and any heartbeat/retry automation are the failure points, not single-turn chat.
- **Pin your Codex `model_provider`** in deployment scripts. Provider switching today is destructive to local session history; treat `~/.codex/state_5.sqlite` migration as part of your release process until [#7362](https://github.com/farion1231/cc-switch/issues/7362) is closed.
- **If you proxy through a relay, instrument the Responses↔Chat boundary.** Two of today's top regressions (DeepSeek loops, tool-call `call_id` rejection) originate there; a capture-proxy in front of CC Switch — as the [#5860](https://github.com/farion1231/cc-switch/issues/5860) reporter did — is the fastest path to root cause.
- **Reasoning-effort passthrough is a moving target.** The fix in [#7398](https://github.com/farion1231/cc-switch/pull/7398) for `muse-spark-*` mirrors prior fixes for Grok (#7314/#7318). If you add a new model family, audit `supports_reasoning_effort()` explicitly — silent degradation is the default.
- **Security posture for relay users is now an explicit community ask** ([#7357](https://github.com/farion1231/cc-switch/issues/7357)). Until upstream LLM/KW audit lands, treat prompt-injection-style exfiltration of credentials from relays as in-scope threat and keep secrets out of `config.toml`.
- **The "router / multi-provider fanout" feature** ([#3703](https://github.com/farion1231/cc-switch/issues/3703), [#3986](https://github.com/farion1231/cc-switch/issues/3986) for CLI/headless) remains the most-requested capability and is **not** in any open PR today. Plan fallbacks; don't depend on it landing soon.
- **Evaluate new first-class app integrations** (DeepSeek Harness [#7356](https://github.com/farion1231/cc-switch/pull/7356), MiniMax Code [#7383](https://github.com/farion1231/cc-switch/pull/7383), CodeBuddy [#7176](https://github.com/farion1231/cc-switch/pull/7176)) early — they share the provider/skill/MCP substrate and reduce per-agent glue code.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-14

Project: [QuantumNous/new-api](https://github.com/QuantumNous/new-api) (LLM gateway / unified model-serving proxy)

## 1. Today's Highlights

- **No new release in the last 24h**; the line is sitting at **v1.0.0-rc.37**, with one open enhancement asking maintainers to publish explicit GA criteria for v1.0.0 ([#7279](https://github.com/QuantumNous/new-api/issues/7279)).
- **Memory regression reported on rc.37**: resident memory jumped from ~75 MB (rc.36) to ~1.8 GB, triggering OOM on small instances ([#7361](https://github.com/QuantumNous/new-api/issues/7361)). Severity is high for constrained deployments until root-caused.
- **Inference-backend integration expands**: a new PR adds first-class **vLLM** and **SGLang** relay channels ([#7332](https://github.com/QuantumNous/new-api/pull/7332)), and **Huawei MaaS** support is in review ([#7239](https://github.com/QuantumNous/new-api/pull/7239)).

## 2. Releases & Breaking Changes

- No published releases in the last 24h.
- Behavior changes worth tracking (closed PRs that shipped into rc.37 lineage):
  - Global `NEW_API_ROUTE_PREFIX` mount layer across `/v1`, `/api`, `/pg`, `/mj`, `/oauth` ([#7350](https://github.com/QuantumNous/new-api/pull/7350)) — operators behind a path-based reverse proxy should re-verify their routing.
  - Deploy script exec-bit fix ([#7306](https://github.com/QuantumNous/new-api/pull/7306)) — re-pull install artifacts.
  - Case-insensitive audio extension handling in `GetAudioDuration` ([#7321](https://github.com/QuantumNous/new-api/pull/7321), closes [#7319](https://github.com/QuantumNous/new-api/issues/7319)).

## 3. New Model & Hardware Support

- **vLLM channel** — direct relay adapter for vLLM-served models ([#7332](https://github.com/QuantumNous/new-api/pull/7332)).
- **SGLang channel** — companion adapter for SGLang-served models ([#7332](https://github.com/QuantumNous/new-api/pull/7332)).
- **Huawei MaaS channel** — adds Huawei Cloud ModelArts MaaS as a provider ([#7239](https://github.com/QuantumNous/new-api/pull/7239)).
- **Wan provider icon** unified model-provider detection, adding a Wan (Alibaba) icon ([#7373](https://github.com/QuantumNous/new-api/pull/7373)).
- **Vertex AI storage proxy** — controlled GCS access for Vertex AI channels via per-bucket allow-list (`storage:gs:<bucket>`) ([#7121](https://github.com/QuantumNous/new-api/issues/7121), implementation PR [#6779](https://github.com/QuantumNous/new-api/pull/6779)).
- **Langfuse observability** — proposed as an optional gateway tracing export ([#7371](https://github.com/QuantumNous/new-api/issues/7371), [#7370](https://github.com/QuantumNous/new-api/issues/7370); PR [#7313](https://github.com/QuantumNous/new-api/pull/7313)).
- **Gemini normalized thinking levels** accepted by `relaykit` ([#7245](https://github.com/QuantumNous/new-api/pull/7245)).
- **Coding-plan pricing** still requested as an enhancement for upstream quote handling ([#4341](https://github.com/QuantumNous/new-api/issues/4341)) — not yet shipped.

## 4. Performance & Optimization

- **Resident-memory regression in rc.37** ([#7361](https://github.com/QuantumNous/new-api/issues/7361)):
  - rc.36 → ~75 MB steady-state
  - rc.37 → ~1.8 GB steady-state (≈24×)
  - Operator-side impact: OOM kills on ≤2 GB instances; cost increase on cloud VMs.
  - Closed as `needs reproduction / insufficient info` for now — needs a heap profile before fix.
- **`tiered_expr` body materialisation concern** ([#7378](https://github.com/QuantumNous/new-api/issues/7378)) — closed as invalid, but it illustrates an active focus on request-body lifetime and GC pressure in the relay path.
- **`EstimateToken` 5× over-estimation with `ensure_ascii=True`** ([#7368](https://github.com/QuantumNous/new-api/issues/7368)) — closed as invalid, but worth re-measuring token accounting if you send non-ASCII payloads via Python clients.
- **OpenAI stream drain regression fixed** — re-wires the 5 OpenAI stream handlers into the project's drain lifecycle after a bad merge at rc.31 ([#7379](https://github.com/QuantumNous/new-api/pull/7379)).
- **Long-standing retry-logic refactor still open** ([#4236](https://github.com/QuantumNous/new-api/issues/4236)) — no concrete numbers landed.

## 5. Stability & Regressions

Ranked by severity, with linked fixes where present.

| Severity | Item | Status | Fix |
|---|---|---|---|
| High | **rc.37 memory bloat / OOM on small instances** ([#7361](https://github.com/QuantumNous/new-api/issues/7361)) | CLOSED (needs repro) | — pending |
| High | **`InitChannelCache` panic** when a channel's `group` has no abilities row — `assignment to entry in nil map` ([#7331](https://github.com/QuantumNous/new-api/issues/7331)) | CLOSED | [#7323](https://github.com/QuantumNous/new-api/pull/7323) (merged) |
| Medium | **Cancelled client streams counted as model failures**, skewing success-rate metrics ([#7134](https://github.com/QuantumNous/new-api/issues/7134)) | OPEN | — |
| Medium | **OpenAI stream drain regression** introduced in rc.31 merge ([#7379](https://github.com/QuantumUsers/new-api/pull/7379)) | CLOSED (fix merged) | [#7379](https://github.com/QuantumNous/new-api/pull/7379) |
| Medium | **Ollama streaming loses `tool_calls`** when `done:true` frame carries them; clients see empty `content` + `finish_reason:"stop"` (PRs [#7380](https://github.com/QuantumNous/new-api/pull/7380), [#7376](https://github.com/QuantumNous/new-api/pull/7376)) | OPEN | in review |
| Low | Tiered-billing log misreports "dynamic billing · no match" ([#7296](https://github.com/QuantumNous/new-api/issues/7296)) | CLOSED | — |
| Low | Time-based billing tier display on pricing page ([#7268](https://github.com/QuantumNous/new-api/issues/7268)) | CLOSED | — |
| Low | `codex-*` models missing OpenAI icon in usage logs ([#7363](https://github.com/QuantumNous/new-api/issues/7363)) | CLOSED | [#7364](https://github.com/QuantumNous/new-api/pull/7364) |
| Low | Dashboard weekly granularity default range ([#7354](https://github.com/QuantumNous/new-api/issues/7354)) | CLOSED | [#7355](https://github.com/QuantumNous/new-api/pull/7355) |
| Low | Model-square 24h success-rate bar spacing ([#7282](https://github.com/QuantumNous/new-api/issues/7282)) | CLOSED | [#7284](https://github.com/QuantumNous/new-api/pull/7284) |
| Low | Endpoint-Type combobox auto-opens on dialog autofocus ([#7358](https://github.com/QuantumNous/new-api/issues/7358), [#7359](https://github.com/QuantumNous/new-api/issues/7359), [#7360](https://github.com/QuantumNous/new-api/issues/7360)) | CLOSED | [#7365](https://github.com/QuantumNous/new-api/pull/7365) |
| Low | Flaky frontend test suite (motion/animation timing races) ([#7367](https://github.com/QuantumNous/new-api/pull/7367)) | CLOSED (fix merged) | [#7367](https://github.com/QuantumNous/new-api/pull/7367) |

Also noted but **invalid / closed**: HappyHorse model request for Aliyun Bailian plugin ([#7375](https://github.com/QuantumNous/new-api/issues/7375)); Langfuse observability duplicate ([#7370](https://github.com/QuantumNous/new-api/issues/7370)).

## 6. What This Means for Application Developers

- **Pin to rc.36 in production if you run on small VMs.** The rc.37 RSS jump is unverified-but-reported and could OOM ≤2 GB containers; wait for a fix or capture a heap profile before upgrading.
- **Self-hosted vLLM / SGLang users get a native path soon.** Once [#7332](https://github.com/QuantumNous/new-api/pull/7332) lands, you can register local inference backends as first-class channels rather than shimming them through OpenAI-compatible relays — useful for cost control and on-prem agents.
- **Tool-call reliability on Ollama improves.** The two open Ollama stream fixes ([#7380](https://github.com/QuantumNous/new-api/pull/7380), [#7376](https://github.com/QuantumNous/new-api/pull/7376)) specifically recover `tool_calls` delivered in the terminal SSE frame. Agent frameworks that depend on tool invocation should re-test once merged.
- **Metric fidelity on streaming endpoints is being hardened.** Cancelled streams will (per [#7134](https://github.com/QuantumNous/new-api/issues/7134)) stop poisoning the per-model success-rate dashboard; until that lands, treat the success-rate KPI on long-running streaming endpoints as an upper bound on actual failures.
- **Pricing flexibility is still pending.** Coding-plan style upstream quote handling ([#4341](https://github.com/QuantumNous/new-api/issues/4341)) and a separate upstream-cost configuration module ([#7377](https://github.com/QuantumNous/new-api/issues/7377)) are still open — if you resell or pass through AI subscription tiers, weigh in on those threads.
- **Routing changes to verify after upgrade.** The `NEW_API_ROUTE_PREFIX` rework ([#7350](https://github.com/QuantumNous/new-api/pull/7350)) rewires `/v1`, `/api`, `/pg`, `/mj`, `/oauth`. If you front new-api with a reverse proxy that strips paths or does path-based rate limiting, re-validate routes after pulling.
- **Observability options are broadening.** Langfuse export ([#7313](https://github.com/QuantumNous/new-api/pull/7313)) and a controlled Vertex AI GCS proxy ([#6779](https://github.com/QuantumNous/new-api/pull/6779)) are both reviewable now if you need per-request tracing or managed-asset handling through the gateway.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*