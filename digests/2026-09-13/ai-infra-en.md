# AI Infrastructure Digest 2026-09-13

> Generated: 2026-09-13 11:31 UTC | Projects covered: 9

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

# Cross-Project AI Infrastructure Report — 2026-09-13

## 1. Ecosystem Overview

Today's activity is dominated by the industry-wide race to productionize **DeepSeek-V4.1(-Flash)** — vLLM has a seven-PR cluster on SP/PP communication, Engram overlap and microbatching, SGLang is landing a Mooncake-backed Engram host backend, and llama.cpp has the GGUF conversion in flight — yet no project has it clean: both major engines carry sev-1/sev-2 defects on the stack. A second front is **alternative silicon**, with vLLM expanding ROCm CI (~45 new jobs) and publishing an MI355X performance RFC while SGLang ships GLM-5.3-Flash on AMD gfx950 with FP8/MXFP4. At the layers above, the **OpenAI Responses/Codex surface has become the de facto contract**, generating a heavy bug tail across Ollama, LiteLLM, CC Switch and New API. The most alarming cross-cutting signal is **silent failure**: HTTP 200s with corrupted or empty output (vLLM/Intel Arc, Ollama IQ3_S), ~0% speculative acceptance without warning (SGLang), and $0 cost telemetry (Claude Code Router, LiteLLM budgets). Release discipline varies wildly — llama.cpp shipped 10 tagged builds in 24h while everyone else shipped nothing or RC-churn.

## 2. Activity Comparison

*Counts = issues/PRs referenced in each digest (activity proxy, not official GitHub totals).*

| Project | Layer | Issues | PRs | Release Status |
|---|---|---|---|---|
| **vLLM** | Serving engine | ~22 (18 open, 4 closed) | ~14 | No release in window |
| **SGLang** | Serving engine | ~18 (9 new high-sev) | ~14 | None; last tagged v0.5.15 |
| **llama.cpp** | Local runtime / kernels | ~24 (8 closed in 24h) | ~22 | **10 builds** (b10930–b10941) |
| **Ollama** | Local runtime / distribution | 17 | 11 | None; on 0.34.0 |
| **LiteLLM** | LLM gateway | ~27 | ~20 | **v1.102.0-rc.1** (cosign-signed images) |
| **Unsloth** | Fine-tuning | ~9 | ~16 | None; docker 2026.9.4 |
| **Claude Code Router** | Agent router | 3 | 1 (withdrawn) | None; 3.0.22 |
| **CC Switch** | Agent router / switcher | ~15 | ~16 | None |
| **New API** | Gateway / relay | ~10 | ~17 | None; v1.0.0-rc.37 internal |

**Takeaway:** llama.cpp is the volume and cadence leader; LiteLLM is the most active gateway; vLLM/SGLang show deep-but-unreleased engineering on a single model family; the agent-router layer (CCR, CC Switch) is small but fixing contract-level bugs that matter to every agent developer.

## 3. Model Support Race

| Model / Architecture | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek-V4.1 / V4.1-Flash** | Deepest: SP/PP/Engram/mHC/microbatch cluster; **but** H20 CUDA crash (#56389), GB10 blocked (#56461) | Engram + Mooncake host backend (#39205); CUDA-graph capture failure (#39173), tokenizer 400 (#39274) | Conversion in progress (#28696) | — | GGUF requested, no maintainer response (#10838) |
| **GLM-5.3-Flash** | Degeneration bug open (#56605) | **Winner**: AMD gfx950 FP8+MXFP4, graph-mode EAGLE (#39273) | — | — | — |
| **Qwen3.5/3.6/3.8/Coder** | Perf context (hybrid GDN + DFlash) | GLM-5.2 NextN FP8 on AMD (#39155) | JSON-schema fixes for qwen3-coder | Tool-parser bug cluster; 2 same-day fix PRs | Trains Qwen3.5-9B on B200 (perf ref.) |
| **Gemma4** | CUDA-graph determinism bug on B200/B300 (#55238) | — | SWA/assistant-init bugs | Vision unification still open (#16879); Jetson OOM | — |
| **Niche** | Humming quant SM120/121 | SenseNova-U1 tracking | ELMOD 2.7b, DFM Mimir 1B, RPC-over-iWARP | GSQ-RCO quant gap (#18297) | MiniCPM5 blocked by allowlist gap (#10853) |

**Verdict:** vLLM leads on **DSV4.1 integration depth**, SGLang leads on **AMD + GLM generation and quantization breadth**, llama.cpp leads on **format/backend coverage**. Nobody has DSV4.1 production-clean — it's a land-grab phase where the fastest correct implementation wins the deployment wave.

## 4. Performance Frontier

- **KV cache / memory hierarchy** (SGLang's center of gravity): unified-memory capacity accounting (#39294), HiCache→TensorCast backend (#27265), page-envelope PD transfers for virtual/physical index translation (#36730); vLLM counters with MoE expert offloading (CPU-pinned + LFRU + cross-layer prediction, #38256).
- **Batching / overlap** (vLLM's center of gravity): Engram lookup overlap gated by workload (#56436), mHC statistics overlap (#56611), microbatch position correctness (#56440); SGLang fixes non-streaming TTFT batching (#39270) and fuses SWA page-lookup ops into Triton (#38948).
- **Quantization**: MXFP4 on MI355X (vLLM RFC #56506; SGLang GLM serving) and **NVFP4 becoming first-class in Unsloth** (#10730/#10731) — FP4 is now the deployment-default format conversation on Blackwell/MI355X.
- **Distributed serving**: vLLM SP all-to-all embedding redistribution (#56435), PP cache relay with Gloo/NCCL hybrid (#56439), batch invariance work (#27433); llama.cpp adds RDMA/iWARP RPC reach.
- **Kernels**: llama.cpp's tiled VNNI `mul_mat` (**3–7× CPU speedup**, #27851) and fused Q4_K Gate/Up+SwiGLU prefill (#28702); vLLM's MI355X RFC does per-kernel gap analysis (MoE routing, indexer, SWA attention).
- **Host-side overhead — the new bottleneck**: Unsloth's 0.85→0.66 s/step (**~22%**) win on B200 is mostly *CPU-side* (fla autotune key rebuilds); LiteLLM is rewriting the gateway in **Rust targeting sub-1ms overhead** (#31263). Once GPU kernels saturate, the tail latency lives on the host and in the proxy.

## 5. Layer Positioning

- **Distributed serving engines — vLLM, SGLang**: multi-GPU TP/PP/EP/SP, PD disaggregation, spec-decode runtimes. Competing on DSV4.1 execution efficiency vs. memory-hierarchy sophistication, respectively.
- **Local runtimes — llama.cpp (kernels/GGUF), Ollama (distribution/UX)**: llama.cpp is the substrate — Ollama bundles it, Unsloth ships its artifacts — so its kernel wins and its regressions (MTP 57× prefill slowdown, #28790) propagate downstream automatically.
- **Gateways — LiteLLM (enterprise), New API (relay/billing)**: protocol translation, spend control, routing. Both are in RC-churn with correctness debt concentrated in Responses↔Chat translation and billing accuracy.
- **Agent routers — Claude Code Router, CC Switch**: thin but contract-critical; today's work is entirely about Codex `state_5.sqlite` session pinning, SSE sanitization, and provider preset expansion (DSH, Command Code, Zhipu).
- **Fine-tuning — Unsloth**: consumes the ecosystem (pins vLLM 0.29, #10858), adds NVFP4 training-to-serving paths, and is uniquely focused on single-GPU/B200 efficiency.

Bugs flow **up** this stack: llama.cpp regressions surface in Ollama; vLLM pin moves break Unsloth CI; gateway translation bugs break every agent above them.

## 6. Trend Signals

1. **Speculative decoding is mainstream but fragile.** Acceptance cliffs everywhere: quantized DFlash2 drafts silently collapse to ~0% acceptance (SGLang #39087); DFlash is a net *loss* above ~185k context on hybrid GDN (71→16 tok/s, vLLM #54691); MTP prefill is 57× slower on MSVC+CUDA 12.8 (llama.cpp #28790). **Watch for:** length-gated and quantization-aware adaptive spec-decode — do not enable it unconditionally.
2. **Hybrid/recurrent state breaks KV-cache assumptions.** Mamba/SWA/Engram state doesn't fit save/restore, prefix caching, or PD transfer semantics designed for pure attention (open bugs in all three runtimes). **Watch for:** state-aware cache interfaces becoming a differentiator.
3. **Silent failure is the dominant production risk.** Corrupted output with HTTP 200 (vLLM #53480), empty `content` with `done_reason: stop` (Ollama #18297), $0 billing under aliases (CCR #1787), unenforced budgets (LiteLLM #35524). **Watch for:** output-sanity and cost-reconciliation checks moving client-side by default.
4. **The Responses/Codex API is the new compatibility battleground.** Four of nine projects spent the day on it (`previous_response_id` replay, reasoning-item ordering, tool_choice mapping). **Watch for:** agent developers should treat stateless Chat Completions as the safe path and pin gateway versions aggressively.
5. **AMD is arriving for real.** vLLM's CI expansion + MI355X RFC (8.97 tok/s/GPU at conc-1, with identified kernel gaps) and SGLang's gfx950 GLM serving make ROCm a credible second source. **Watch for:** MI355X kernel closures in vLLM over the next cycles.
6. **FP4 (MXFP4/NVFP4) is becoming normative**, from serving (MI355X, gfx950) through fine-tuning pipelines (Unsloth). Budget for FP4 in 2026 capacity planning.
7. **Supply-chain and release discipline diverge.** LiteLLM's cosign signing is a first; llama.cpp's 10-builds-a-day cadence contrasts with GA-gate ambiguity elsewhere (New API #7279, Ollama's "almost stable" 0.34.0). **Watch for:** signed images and explicit GA criteria becoming table stakes for enterprise adoption.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-13

## Today's Highlights

The DeepSeek-V4.1 stack is the center of gravity today: six related PRs (#56435–#56440, #56611) advance SP/PP communication, Engram lookup overlap, and microbatching, paired with a performance RFC on ROCm MI355X showing substantial headroom ([#56506](https://github.com/vllm-project/vllm/issues/56506)). A cluster of speculative-decoding (DFlash) regressions hit long-context hybrid GDN models and structured-output grammars ([#54691](https://github.com/vllm-project/vllm/issues/54691), [#53777](https://github.com/vllm-project/vllm/issues/53777), [#54094](https://github.com/vllm-project/vllm/issues/54094)). Cross-cutting work continues on batch invariance, zero-JIT warmup, and a long-standing request for SM8x/Ampere coverage of DeepSeek-V4-Flash ([#50576](https://github.com/vllm-project/vllm/issues/50576)).

## Releases & Breaking Changes

No new releases in the last 24 hours. No API or configuration flag is being removed.

## New Model & Hardware Support

- **Humming quantization SM120/SM121 support** — new GPU targets added via `VLLM_HUMMING_ONLINE_QUANT_CONFIG` with optional Hadamard transforms ([#56685](https://github.com/vllm-project/vllm/pull/56685)).
- **FlashInfer multimodal-prefix attention** — `supports_mm_prefix()` now probes the merged FlashInfer `variant_owns_mask` flag, avoiding backend switching for PrefixLM/mm-prefix batches ([#46558](https://github.com/vllm-project/vllm/pull/46558)).
- **LoRA for DeepSeek-V4-Flash-Vision-Exp** ([#55897](https://github.com/vllm-project/vllm/pull/55897), fixes [#55683](https://github.com/vllm-project/vllm/issues/55683)).
- **Speculators DFlash attention causality preserved** — full-attention layers no longer flipped to causal when loading Speculators-format DFlash checkpoints ([#56692](https://github.com/vllm-project/vllm/pull/56692)).
- **ROCm CI coverage expanded** — Stage H adds ~30 AMD mirrors and 15 standalone jobs across `mi250_1`, `mi300x`, and `mi355x` targets ([#56679](https://github.com/vllm-project/vllm/pull/56679)).

## Performance & Optimization

**DeepSeek-V4.1 series (PR cluster from `0z5a` / `gcanlin`):**
- **SP embedding redistribution via all-to-all** — Engram head shards staged directly into the SP communication buffer, avoiding a separate tail-row pass ([#56435](https://github.com/vllm-project/vllm/pull/56435)).
- **PP stage cache/index relay** — scheduler CPU block tables carried into attention metadata; cache IDs validated CPU-side; Gloo/NCCP hybrid transport; CPU send buffers retained to completion ([#56439](https://github.com/vllm-project/vllm/pull/56439)).
- **Dependency validation before layer construction** — invalid PP cuts rejected with source/consumer detail; projected cache groups allocated only for local layers ([#56437](https://github.com/vllm-project/vllm/pull/56437)).
- **Engram lookup overlap gated by workload** — defaulted **off**, opt-in only within an explicit workload limit; preserves correctness for non-eligible batches ([#56436](https://github.com/vllm-project/vllm/pull/56436)).
- **mHC statistics overlap with attention/FFN** — opt-in via `VLLM_DSV41_MHC_OVERLAP=1` (SM100, TP8/EP/SP, ≤256 tokens; no DBO/speculation/LoRA) ([#56611](https://github.com/vllm-project/vllm/pull/56611)).
- **Microbatch position / Engram history correctness** — fixes positions when a request crosses a microbatch boundary ([#56440](https://github.com/vllm-project/vllm/pull/56440)).

**RFCs / in-progress work:**
- **DeepSeek-V4.1-Flash on AMD MI355X (8x, TP4, MXFP4 + DSpark MTP)** — measured 35.89 out tok/s at concurrency 1 (8.97/GPU), TTFT p50 0.898 s; identified per-kernel gaps in MoE routing, indexer, and SWA attention ([#56506](https://github.com/vllm-project/vllm/issues/56506)).
- **Incremental MoE Expert Offloading** — expert weights in CPU pinned memory with fixed GPU cache + LFRU + cross-layer prediction (PR 1 at [#37190](https://github.com/vllm-project/vllm/pull/37190)) ([#38256](https://github.com/vllm-project/vllm/issues/38256)).
- **Batch Invariant** — tracking issue for the Thinking Machines–style determinism work; 93 comments, still open ([#27433](https://github.com/vllm-project/vllm/issues/27433)).
- **Zero-JIT runtime compilation** — DeepSeek V4 de-JITification underway; tracked under shared warmup infrastructure ([#49349](https://github.com/vllm-project/vllm/issues/49349), [#50587](https://github.com/vllm-project/vllm/issues/50587)).

## Stability & Regressions

**Critical / sev-1:**
- **DeepSeek-V4.1-Flash CUDA illegal memory access on H20** — `dsv4_topk` Triton MoE routing kernel crashes under high concurrency; **mitigated by `max_num_seqs=256`** ([#56389](https://github.com/vllm-project/vllm/issues/56389)). No fix PR yet.
- **Silent persistent output corruption on Intel Arc Pro B70 (W4A16 27B)** — sustained concurrent decode degenerates to endless `!`/token 0; HTTP 200, `finish_reason: "stop"` — caller cannot detect ([#53480](https://github.com/vllm-project/vllm/issues/53480)). No fix PR yet.

**High / sev-2:**
- **DeepSeek-V4.1-Flash cannot serve on SM120/SM121 (GB10)** — SWA cache block size 32 vs SM120 decode page 64; indexer `block_kv=128` vs DeepGEMM sm120 64-only ([#56461](https://github.com/vllm-project/vllm/issues/56461)).
- **DFlash2 + YaRN: zero prefix-cache reuse for 1.04M prompts** — target-only reuses ~1.039M tokens ([#54094](https://github.com/vllm-project/vllm/issues/54094)).
- **DFlash2 + xgrammar `json_object` FSM stuck on same draft token** — deterministic "Failed to advance FSM" ([#53777](https://github.com/vllm-project/vllm/issues/53777)).
- **DFlash net loss at ~185k context on hybrid GDN models** — single-stream decode drops from ~71 tok/s (spec OFF) to ~16 tok/s (DT=4); short-context wins remain (218 tok/s at DT=8). No per-sequence-length disable hook ([#54691](https://github.com/vllm-project/vllm/issues/54691)).
- **Batch invariance broken with `VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp`** — sequence parallelism / async TP path no longer bit-identical ([#56370](https://github.com/vllm-project/vllm/issues/56370)). Reproduced on Blackwell sm_120.
- **CUDA-graph replay changes greedy output for gemma-4-26B-A4B-it on B200/B300 only** — clean on H200, RTX PRO 6000, and A100 ([#55238](https://github.com/vllm-project/vllm/issues/55238)).

**Medium / sev-3:**
- **GLM-5.3-Flash degenerates into repeated-token "word salad" in multi-turn agentic use** ([#56605](https://github.com/vllm-project/vllm/issues/56605)).
- **Six vLLM concurrency defects** — cross-checked against latest `main` (`b28c3e15`, 2026-09-10); all six synchronization gaps in `multiproc_executor.py`/`shm_broadcast.py`/`kv_events.py` remain ([#56251](https://github.com/vllm-project/vllm/issues/56251)).
- **CUTLASS 3.x `scaled_mm` ignores leading strides of sliced tensors** on H800 ([#55534](https://github.com/vllm-project/vllm/issues/55534)).
- **GatedDeltaNet metadata builder misclassifies stateless first chunk as decode** — reads uninitialized mamba state page on reallocation ([#51562](https://github.com/vllm-project/vllm/issues/51562)).
- **Native weight transfer can leave a tied `lm_head` on previous weights** — TP2/PP2 + tied HF Qwen3-0.6B trainer reproduces ([#56689](https://github.com/vllm-project/vllm/pull/56689)). Fix PR exists.
- **LoRA unload only updates frontend registry** — engine keeps worker-side slot and CPU cache entry ([#54939](https://github.com/vllm-project/vllm/pull/54939)). Fix PR exists.

**Recently closed (no longer action items):**
- 2-node TP Mamba `mamba_cache_mode` cross-worker KV-spec assert with `--enable-prefix-caching` on hybrid GDN models ([#56646](https://github.com/vllm-project/vllm/issues/56646)).
- ROCm DSV4-Flash `rocm_dequantize_blocked_k_cache` materializes entire KV cache pool (OOM) ([#41962](https://github.com/vllm-project/vllm/issues/41962)).
- DSV4 MRV2 accuracy drops with `FULL_DECODE_ONLY` graph on MI350/MI355 ([#52644](https://github.com/vllm-project/vllm/issues/52644)).
- ngram speculative decoding breaks greedy on Qwen3-0.6B/A100 ([#41758](https://github.com/vllm-project/vllm/issues/41758)).

## What This Means for Application Developers

- **DeepSeek-V4.1 on H20 / H100**: production deployments at `max_num_seqs > 256` should pin `max_num_seqs=256` until [#56389](https://github.com/vllm-project/vllm/issues/56389) is resolved. GB10 / SM120 is not currently a viable target ([#56461](https://github.com/vllm-project/vllm/issues/56461)).
- **DeepSeek-V4.1 on AMD MI355X**: usable but with measurable headroom; if you're locked into ROCm, follow the RFC ([#56506](https://github.com/vllm-project/vllm/issues/56506)) for tuning and upcoming kernel work.
- **DFlash speculative decoding** should not be enabled unconditionally on long-context hybrid GDN workloads (Qwen3.5 family) — it is a **net loss** above ~185k tokens ([#54691](https://github.com/vllm-project/vllm/issues/54691)). For YaRN-extended contexts, prefix-cache reuse is

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-13

## Today's Highlights

The SGLang repo had no new release in the last 24 hours, but development momentum remains strong on three fronts: **DeepSeek-V4.1 integration** (a new Mooncake Engram host backend for DSV4.1-Flash in [#39205](https://github.com/sgl-project/sglang/pull/39205), plus a fresh bug on the image-placeholder tokenizer in [#39274](https://github.com/sgl-project/sglang/issues/39274)), **AMD/GLM enablement** (FP8 + MXFP4 serving for GLM-5.3-Flash on gfx950 in [#39273](https://github.com/sgl-project/sglang/pull/39273) and per-channel FP8 for the GLM-5.2 NextN draft on AMD in [#39155](https://github.com/sgl-project/sglang/pull/39155)), and **stability hardening** of the unified-memory / HiCache stack ([#39294](https://github.com/sgl-project/sglang/pull/39294), [#38836](https://github.com/sgl-project/sglang/pull/38836), [#38483](https://github.com/sgl-project/sglang/pull/38483), [#36730](https://github.com/sgl-project/sglang/pull/36730)).

## Releases & Breaking Changes

No new releases in the last 24 hours. The most recent release referenced in the data is `v0.5.15` (mentioned in the GLM-5.2 + EAGLE CUDA-graph-capture issue [#31093](https://github.com/sgl-project/sglang/issues/31093)); a `sgl-deep-gemm 0.2.0rc0` bump is staged as a non-merge test PR in [#39275](https://github.com/sgl-project/sglang/pull/39275).

## New Model & Hardware Support

- **DeepSeek-V4.1-Flash + Engram (Mooncake host backend, CUDA Graphs)** — [#39205](https://github.com/sgl-project/sglang/pull/39205) adds local/RDMA Mooncake-backed Engram tables for the `dsv4.1` branch.
- **GLM-5.3-Flash on AMD gfx950 (FP8 + MXFP4)** — [#39273](https://github.com/sgl-project/sglang/pull/39273) enables native zero-RoPE sparse attention, FP8 KV cache, and graph-enabled EAGLE 5/1/6.
- **GLM-5.2 NextN on AMD** — [#39155](https://github.com/sgl-project/sglang/pull/39155) casts the MTP draft (layer 78) fused MoE to per-channel FP8.
- **Diffusion SP gather correctness** — [#39291](https://github.com/sgl-project/sglang/pull/39291) makes `USPAttention._gather_sharded_sequence` produce contiguous shards (currently relies on PyTorch ignoring size-1 dim strides).
- **HiSparse code-ownership housekeeping** — [#38682](https://github.com/sgl-project/sglang/pull/38682) (already closed) wires up `hisparse_coordinator.py` and the allocator directory owners.
- **TensorCast as a HiCache backend** — long-running [#27265](https://github.com/sgl-project/sglang/pull/27265) continues to land; module lives under `python/sglang/srt/mem_cache/storage/tensorcast_store`.
- **Tracking issues still open**: [SenseNova-U1 / U1.5 feature & perf tracking #37742](https://github.com/sgl-project/sglang/issues/37742), [Intel CPU Roadmap 2026Q2 #24921](https://github.com/sgl-project/sglang/issues/24921) (closed/inactive), [Ngram speculative decoding roadmap #21052](https://github.com/sgl-project/sglang/issues/21052).

## Performance & Optimization

- **TTFT / speculative output batching** — [#39270](https://github.com/sgl-project/sglang/pull/39270) fixes non-streaming TTFT being delayed until the force-stream interval (default 50 tokens). Now `first_token_time` in `TokenizerManager` records the real first output batch.
- **SWA page lookup + mapping clear fusion** — [#38948](https://github.com/sgl-project/sglang/pull/38948) fuses two separate Torch ops into one Triton kernel, reducing per-free scheduler dispatch overhead while preserving page ownership and deferred frees.
- **Unified-memory capacity accounting** — [#39294](https://github.com/sgl-project/sglang/pull/39294) prevents false-positive eviction under `--enable-unified-memory` when FULL+SWA share bytes, with a regression test using a real shared pool.
- **Diffusion CI E2E metrics made terminal** — [#39206](https://github.com/sgl-project/sglang/pull/39206) rejects missing/invalid E2E durations and missing performance logs, making diffusion performance regressions CI-blocking.
- **Unified memory page-envelope PD transfers** — [#36730](https://github.com/sgl-project/sglang/pull/36730) adds the physical-index translation contract needed because unified pools expose virtual token IDs while transfer backends see physical buffers.

## Stability & Regressions

**High severity (newly reported, no fix merged yet):**

- **[Bug] Client disconnect during active request crashes entire engine** — [#39216](https://github.com/sgl-project/sglang/issues/39216). Uncaught `asyncio.CancelledError` bypasses `except Exception` on 4×RTX 6000D (Blackwell, PCIe-only) running `dev-dsv41` with DeepSeek-V4.1. No fix PR yet.
- **[Bug] DeepSeek-V4.1 image-placeholder token rejected with 400** — [#39274](https://github.com/sgl-project/sglang/issues/39274). `encoding_dsv41.py` raises a hard error on any literal occurrence of `<｜deepseek_image｜>` in user text.
- **[Bug] DeepSeek-V4.1-Flash + Engram SPS table dies in CUDA-graph capture** — [#39173](https://github.com/sgl-project/sglang/issues/39173). "engram target-verify expects one equal block per request" during compact ragged-verify capture.
- **[Bug] Quantized DFlash2 draft yields ~0% acceptance, silently** — [#39087](https://github.com/sgl-project/sglang/issues/39087). Same checkpoint unquantized hits ~3.7 acceptance; quantized collapses to ~1.0 with no error/warning. Tagged as the quiet counterpart to #36599.
- **[Bug] HiCacheFile reports unrestorable prefix for hybrid cache pools** — [#39147](https://github.com/sgl-project/sglang/issues/39147). `batch_exists_v2()` reports a hit even when an auxiliary pool can't restore that prefix.
- **[Bug] `/health` handler timeout leaks orphaned health-check requests into paged-prefill batching** — [#35884](https://github.com/sgl-project/sglang/issues/35884). Scheduler-side request isn't cancelled, eventually crashing prefill.
- **[Bug] Grammar token sync creates singleton NCCL group under DP attention** — [#35826](https://github.com/sgl-project/sglang/issues/35826). Follow-up to #8400.
- **[Bug] SWA branching attaches later Mamba checkpoint to earlier prefix** — [#38815](https://github.com/sgl-project/sglang/issues/38815). Marked high-priority; affects joint Full/SWA/Mamba cache with Inkling's MAMBA component.
- **[Bug] `include_reasoning=false` still produces reasoning tokens** — [#39103](https://github.com/sgl-project/sglang/issues/39103). Affects `/v1/chat/completions`, `/v1/completions`, and `/responses`.

**Medium severity (related fixes in flight):**

- **Unified-memory Mamba lazy buffers & PD capacity memo invalidation** — [#38836](https://github.com/sgl-project/sglang/pull/38836) addresses PR-side fix for the unified-Mamba + Mamba-pool configuration drift; tracks issues like [#38815](https://github.com/sgl-project/sglang/issues/38815).
- **HiCacheFile flat-dir ENOSPC at scale** — [#28653](https://github.com/sgl-project/sglang/issues/28653) (closed/inactive) reports millions of `.bin` files under one directory; complement PR [#38483](https://github.com/sgl-project/sglang/pull/38483) is the storage-cleanup anchor-lock release that closes a related teardown leak.
- **Custom all-reduce V2 one-shot push deadlock under two streams** — [#31117](https://github.com/sgl-project/sglang/issues/31117) (closed/inactive). Deadlock reproducer uses split SM120 green contexts on the same communicator.
- **Unified-cache default-flip regression on Spark/Thor long-prefix decode** — [#36131](https://github.com/sgl-project/sglang/issues/36131) (closed); introduced by PR #34653 / merge `ebc144ce3f7dfca68d5e705c05051ab8f93ec158`. Already resolved.

**Lower severity (closed/inactive but recently updated):**

- Prometheus `avg_request_queue_latency` not collected — [#6357](https://github.com/sgl-project/sglang/issues/6357) (good-first-issue, still open since 2025-05-16, only 1 👍).
- PD `KVTransferError` on GLM-5.2 nightly image — [#30609](https://github.com/sgl-project/sglang/issues/30609).
- Qwen3-VL video frame double-sampling when `--mm-process-config` sets fps — [#31200](https://github.com/sgl-project/sglang/issues/31200).

## What This Means for Application Developers

- **TTFT on non-streaming calls is about to improve.** If you've been seeing 50-token "first-batch" latency on `sglang:time_to_first_token_s` for non-streaming requests (especially with EAGLE/NextN drafters via SPEC_V2), [#39270](https://github.com/sgl-project/sglang/pull/39270) should land soon — re-benchmark after picking up the fix.
- **GLM-5.3-Flash users on AMD MI355X-class (gfx950) get a real path.** FP8 weights + MXFP4 quantized variant + graph-mode EAGLE in [#39273](https://github.com/sgl-project/sglang/pull/39273) means you no longer need an Nvidia box to serve the GLM-5.3 generation at production latencies.
- **DeepSeek-V4.1-Flash + Engram serving is solidifying.** If you're piloting Engram (stateful-recurrent draft) on `dsv4.1`, watch [#39205](https://github.com/sgl-project/sglang/pull/39205) for the Mooncake host backend; until then be aware of the CUDA-graph capture failure in [#39173](https://github.com/sgl-project/sglang/issues/39173) and the tokenizer bug in [#39274](https://github.com/sgl-project/sglang/issues/39274). Avoid embedding the `<｜deepseek_image｜>` placeholder in user text on `dsv4.1` branches.
- **Client disconnect = whole-engine crash in current main on `dev-dsv41`.** [#39216](https://github.com/sgl-project/sglang/issues/39216) means if your gateway aggressively times out connections (mobile clients, proxy idle timeouts, WebSocket lifecycle), you can take the whole decode pod down. Add client-side retries but also wrap requests in your own timeouts rather than relying on socket close.
- **Reasoning suppression is broken.** Setting `include_reasoning=false` still leaks reasoning tokens into responses per [#39103](https://github.com/sgl-project/sglang/issues/39103) — don't rely on it for cost control; filter client-side until a fix ships.
- **HiCache deployments at scale.** Two related issues matter for production: the flat-dir ENOSPC in [#28653](https://github.com/sgl-project/sglang/issues/28653) (shard your `SGLANG_HICACHE_FILE_BACKEND_STORAGE_DIR` or move to a hierarchical backend like TensorCast in [#27265](https://github.com/sgl-project/sglang/pull/27265)) and the unrestorable-prefix reporting in [#39147](https://github.com/sgl-project/sglang/issues/39147) which can silently under-hit when using hybrid pools.
- **Diffusion stack CI is tightening.** Once [#39206](https://github.com/sgl-project/sglang/pull/39206) lands, diffusion performance regressions will block CI — useful signal if you're consuming SGLang's diffusion serving paths.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-13

## Today's Highlights

llama.cpp shipped 10 build bumps (b10930–b10941) in the last 24 hours, dominated by **tooling/CI fixes** (FA test sizing, Vulkan queue-submit workaround, clang PCH timestamps, JSON-schema refactor for qwen3-coder) and **infrastructure work** (Vulkan/WebGPU self-hosted CI, `test-backend-ops` job capping, per-thread CUDA memset). On the performance side, two notable CPU/CUDA kernel rewrites are landing — a tiled `mul_mat` for k-quants claiming **3–7× speedups via VNNI**, and a fused Q4_K Gate/Up + SwiGLU prefill kernel. Several server/API papercuts (KV-cache save for vision models, slot-state restore, MCP stdio deadlocks, MTP prefill regression) remain active.

## Releases & Breaking Changes

| Build | Headline | Notes |
|---|---|---|
| [b10941](https://github.com/ggml-org/llama.cpp/releases/tag/b10941) | tests: reduce FA test sizes ([#28842](https://github.com/ggml-org/llama.cpp/pull/28842)) | CI durability fix |
| [b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938) | vulkan: workaround NV queuesubmit driver bug ([#28830](https://github.com/ggml-org/llama.cpp/pull/28830)) | Adds mutex around `vkQueueSubmit` until NVIDIA fixes internal sync |
| [b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937) | opencl: apply noshuffle row-alignment to q4_K/q5_K/q8_0 ([#28575](https://github.com/ggml-org/llama.cpp/pull/28575)) | Correctness parity with q6_K |
| [b10936](https://github.com/ggml-org/llama.cpp/releases/tag/b10936) | chat: improve complex-type parsing for qwen3-coder ([#28742](https://github.com/ggml-org/llama.cpp/pull/28742)) | Tool-call schema fidelity |
| [b10935](https://github.com/ggml-org/llama.cpp/releases/tag/b10935) | common: add `LOG_JSON` macro ([#28586](https://github.com/ggml-org/llama.cpp/pull/28586)) | Structured logs for ops/telemetry |
| [b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) | common: refactor `common_schema` + JSON-schema-to-grammar ([#28736](https://github.com/ggml-org/llama.cpp/pull/28736)) | Internal cleanup, no public API break |
| [b10933](https://github.com/ggml-org/llama.cpp/releases/tag/b10933) | jinja: dot-property integer literals ([#28817](https://github.com/ggml-org/llama.cpp/pull/28817)) | Fixes [#28786](https://github.com/ggml-org/llama.cpp/issues/28786) |
| [b10932](https://github.com/ggml-org/llama.cpp/releases/tag/b10932) | cmake: drop timestamp from clang precompiled headers ([#28816](https://github.com/ggml-org/llama.cpp/pull/28816)) | Fixes cached-PCH reuse across checkouts |
| [b10931](https://github.com/ggml-org/llama.cpp/releases/tag/b10931) | ui: add cache ([#28802](https://github.com/ggml-org/llama.cpp/pull/28802)) | llama-ui responsiveness |
| [b10930](https://github.com/ggml-org/llama.cpp/releases/tag/b10930) | server: allow model downloads at model limit ([#28530](https://github.com/ggml-org/llama.cpp/pull/28530)) | Fixes [#26809](https://github.com/ggml-org/llama.cpp/issues/26809) |

No breaking API/CLI changes; all bumps are additive fixes and refactors.

## New Model & Hardware Support

- **DeepSeek-V4.1-Flash** (`DeepseekV41ForCausalLM`) — conversion in progress ([#28696](https://github.com/ggml-org/llama.cpp/pull/28696)). Subclasses the V4 path, isolates `text_config` nesting.
- **ELMOD 2.7b** (Fraunhofer IIS, GPTNeoX-based, custom tokenizer) — conversion + new Metaspace-style pre-tokenizer flag (`escape_after_split`) ([#28818](https://github.com/ggml-org/llama.cpp/pull/28818), [#28845](https://github.com/ggml-org/llama.cpp/pull/28845)). Closed without merging today.
- **HrmTextForCausalLM** (DFM Mimir 1B) — two-stack alternating transformer ([#27625](https://github.com/ggml-org/llama.cpp/pull/27625)).
- **ggml::RPC over iWARP** — RDMA CM fallback when GID probe fails ([#28494](https://github.com/ggml-org/llama.cpp/pull/28494)). Unlocks RoCE-style transports that don't advertise IP-mapped GIDs.
- **ANE backend** — still tracking on the roadmap ([#10453](https://github.com/ggml-org/llama.cpp/issues/10453)), 44 👍.
- **Self-hosted Vulkan + WebGPU in HF Jobs CI** ([#28712](https://github.com/ggml-org/llama.cpp/pull/28712)) — broader backend coverage in nightly tests.

## Performance & Optimization

- **CPU `mul_mat` for k-quants (tiled, VNNI)** — [PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851) claims **3–7× speedup** by sliding a 256×256 int8 window instead of repeatedly unpacking quants. Big deal for CPU-only and mixed-CPU offload deployments.
- **CUDA: fused Q4_K Gate/Up + SwiGLU prefill** — [PR #28702](https://github.com/ggml-org/llama.cpp/pull/28702) quantizes the shared input once, eliminates duplicate activation quantization and FP32 round-trips. Should noticeably cut prefill time on dense MoE-free models.
- **ggml-cuda: per-thread stream for buffer-init `memset`** — [PR #28782](https://github.com/ggml-org/llama.cpp/pull/28782) prevents collision with parallel HIP graph captures.
- **`ggml` cross-backend: `MUL_MAT_ID` with `-1` to skip computation** — [PR #26631](https://github.com/ggml-org/llama.cpp/pull/26631) touches every backend (Vulkan/SYCL/Metal/CUDA/Ascend/OpenCL/Hexagon/WebGPU/zDNN/ZenDNN). 100% AI-generated per author note — worth a careful review before merge.
- **OpenCL quantization row-alignment fix** for q4_K/q5_K/q8_0 ([#28575](https://github.com/ggml-org/llama.cpp/pull/28575)) — corrects misaligned outputs on OpenCL devices.

## Stability & Regressions

**High severity (active):**

- **[#28790](https://github.com/ggml-org/llama.cpp/issues/28790) — MTP (`--spec-type draft-mtp`) → ~57× prefill slowdown on Windows MSVC + CUDA 12.8** (32.7 tok/s vs 1867 tok/s). Official prebuilt (Clang + CUDA 13.3) unaffected. Likely a compiler/runtime mismatch worth pinning around.
- **[#28752](https://github.com/ggml-org/llama.cpp/issues/28752) — Vulkan prompt-processing regression on RDNA3 after b10780** ([PR lander](https://github.com/ggml-org/llama.cpp/pull/28752)). Bisect to b10780.
- **[#27330](https://github.com/ggml-org/llama.cpp/issues/27330) — CUDA graphs hang GPU channel (RC watchdog + Xid 8) on RTX 5090 Laptop / sm_120**; workaround is `GGML_CUDA_DISABLE_GRAPHS=1`.
- **[#28778](https://github.com/ggml-org/llama.cpp/issues/28778) — SYCL: DFlash2 draft model triggers Windows GPU TDR on dual Arc Pro B70.**
- **[#28753](https://github.com/ggml-org/llama.cpp/issues/28753) — `ggml_backend_sched_alloc_splits: unexpected graph reallocation` crash** on Intel Arc (oneAPI/IntelLLVM 2026.1.1).
- **[#28723](https://github.com/ggml-org/llama.cpp/issues/28723) — stdio MCP server deadlocks permanently on tool calls above ~1–5 KB** (Windows, b10900).

**Medium severity:**

- **[#19466](https://github.com/ggml-org/llama.cpp/issues/19466) — `/slots/3?action=save` broken for vision-enabled models** (KV cache restore).
- **[#25913](https://github.com/ggml-org/llama.cpp/issues/25913) — `/slots` save/restore silently drops prompt reuse on hybrid/recurrent models** (checkpoints never persisted).
- **[#27309](https://github.com/ggml-org/llama.cpp/issues/27309) — Server reports "model loaded" and binds port after fatal Metal OOM; every request 500s.**
- **[#25751](https://github.com/ggml-org/llama.cpp/issues/25751) — SWA on Gemma 4 forgets key details** (eval bug).
- **[#24343](https://github.com/ggml-org/llama.cpp/issues/24343) — Gemma 4 assistant init failure** (`E llama_init_from_model: failed to initialize the context: Gemma4Assistant`).
- **[#24840](https://github.com/ggml-org/llama.cpp/issues/24840) — `update_slots()` `batch_view` offset not propagated to `ctx_dft`** (subtle server bug).
- **[#27097](https://github.com/ggml-org/llama.cpp/issues/27097) — Vulkan slow token gen on AMD dGPU when Resizable BAR disabled.**
- **[#27110](https://github.com/ggml-org/llama.cpp/issues/27110) — Eval bug reproduces with both internal AllReduce and NCCL** on multi-GPU.

**Closed/resolved in last 24h:**

- [#25808](https://github.com/ggml-org/llama.cpp/issues/25808) SYCL `xe2` segfault, [#25876](https://github.com/ggml-org/llama.cpp/issues/25876) ggml-hexagon HMX garbled output, [#25890](https://github.com/ggml-org/llama.cpp/issues/25890) RPC serialized load, [#26282](https://github.com/ggml-org/llama.cpp/issues/26282) embedding corruption, [#28404](https://github.com/ggml-org/llama.cpp/issues/28404) co-resident replica CUDA-graph crash, [#28813](https://github.com/ggml-org/llama.cpp/issues/28813) `-np 3` OOM, [#23422](https://github.com/ggml-org/llama.cpp/issues/23422) CLIP warmup SIGSEGV, [#12917](https://github.com/ggml-org/llama.cpp/issues/12917) `llama-bench --tensor-split`.

**Relevant fix PRs in flight:**

- [PR #27530](https://github.com/ggml-org/llama.cpp/pull/27530) — K/V and recurrent-state cleanup after failed restores (addresses [#25913](https://github.com/ggml-org/llama.cpp/issues/25913)).
- [PR #28837](https://github.com/ggml-org/llama.cpp/pull/28837) — Server: forward `--api-key`/`--api-key-file` to router-spawned children.

## What This Means for Application Developers

- **Pin a build carefully if you depend on Windows + MSVC + CUDA 12.8 with speculative decoding.** MTP prefill is ~57× slower in that combo ([#28790](https://github.com/ggml-org/llama.cpp/issues/28790)). Either upgrade to CUDA 13.3 / Clang-built prebuilts or disable `--spec-type draft-mtp` until the regression is isolated.
- **CUDA graphs are still hazardous on sm_120 (RTX 5090 Laptop) and multi-GPU Windows replicas.** Keep `GGML_CUDA_DISABLE_GRAPHS=1` in production defaults until [#27330](https://github.com/ggml-org/llama.cpp/issues/27330) / [#28404](https://github.com/ggml-org/llama.cpp/issues/28404)-class bugs settle.
- **Slot-state semantics are not safe for hybrid/recurrent models.** If you're persisting `/slots` across restarts (e.g., long-running agent workflows), follow [#25913](https://github.com/ggml-org/llama.cpp/issues/25913) and PR [#27530](https://github.com/ggml-org/llama.cpp/pull/27530). For vision models, `/slots/3?action=save` is broken ([#19466](https://github.com/ggml-org/llama.cpp/issues/19466)).
- **Vulkan on RDNA3 prompt processing

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-13

## Today's Highlights

A heavy triage day on the `ollama/ollama` repository (0.34.0 era), with **17 updated issues and 11 PRs but no new tagged release**. The dominant themes are (1) a cluster of **tool-parser correctness bugs** across the Qwen3 family (3.5, 3.6, 3.8, Coder) — two of which already have merge-ready fixes ([PR #18422](https://github.com/ollama/ollama/pull/18422), [PR #17894](https://github.com/ollama/ollama/pull/17894)), and (2) a wave of **Codex-compatible `/api/responses` bugs** around reasoning ordering and `previous_response_id` replay. The still-open [PR #16879](https://github.com/ollama/ollama/pull/16879) for unified Gemma4 vision support is the main ongoing architectural change.

## Releases & Breaking Changes

No new tagged releases in the last 24h. The codebase is still on **0.34.0**.

Notable closed-but-not-merged changes:

- [PR #18393](https://github.com/ollama/ollama/pull/18393) (closed): revert of the built-in agent in the `ollama` CLI, returning to the legacy chat interface. Treat as a UX rollback until a tagged release confirms the direction.
- [PR #18386](https://github.com/ollama/ollama/pull/18386) (closed) → superseded by [PR #18409](https://github.com/ollama/ollama/pull/18409): Windows installer now removes the Ollama install path from the user `PATH` on uninstall.

## New Model & Hardware Support

- [Issue #18287](https://github.com/ollama/ollama/issues/18287) (closed): request for Tencent `Hy4-preview` Ollama-format GGUF assets.
- [Issue #18297](https://github.com/ollama/ollama/issues/18297): `IQ3_S` quantization of `Qwen3.8-27B-GSQ-RCO-GGUF` produces empty `content` despite `done_reason: stop` — **not a model-add, but a compatibility gap** worth flagging before users wire up GSQ-RCO derivatives.
- [PR #16879](https://github.com/ollama/ollama/pull/16879): moves GGUF metadata scanning into `fs/gguf`, lets single-GGUF Gemma4 models self-report vision/audio capability through `/api/tags`, and lets an Ollama-format Gemma4 GGUF act as its own `mmproj`. Still open; this is the work needed to unify Gemma4 vision across backends.
- [Issue #18396](https://github.com/ollama/ollama/issues/18396): on **Jetson Orin Nano 8GB (unified CPU/GPU memory)**, Gemma4 E4B multimodal OOMs the host even after a CPU-projector configuration succeeds on Ollama 0.34.0 — relevant for edge/ARM64 deployments.

## Performance & Optimization

No new landed perf work in this window. Indirect perf/footprint concerns raised:

- [Issue #18416](https://github.com/ollama/ollama/issues/18416): `ollama create --quantize q4_K_M` from a safetensors directory leaks a ~50 GB **unreferenced F16 blob** per import (12 × 26B imports → 600 GB unreclaimable). `ollama rm` does not delete it because it is not in the manifest. This is effectively a disk-amplification regression worth measuring in your CI/import pipelines.
- [Issue #18396](https://github.com/ollama/ollama/issues/18396): on Jetson Orin Nano 8GB the Gemma4 E4B multimodal projector chooses GPU layers it cannot fit on unified memory; an enforced CPU projector still OOMs, indicating the layer-split heuristic is not aware of projector weight overhead.

## Stability & Regressions

Ranked by likely user impact. **BOLD = fix PR exists and is open.**

**High severity**

- [Issue #18412](https://github.com/ollama/ollama/issues/18412): `llama-server` (bundled with `ollama serve`) **SIGABRTs during backend/device load** on Linux hybrid-graphics laptops (Intel Raptor Lake-S iGPU + RTX 4080 Laptop, compute 8.9). Same family as the earlier Windows report #16667, now reproduced on Linux. **No fix PR yet.**
- [Issue #18421](https://github.com/ollama/ollama/issues/18421) → **[PR #18422](https://github.com/ollama/ollama/pull/18422)**: Qwen3-Coder tool parser coerces any whole-valued float to `int64`; `x=1e20` is silently rewritten to `9223372036854775807`, negatives outside range also mangled. Hot-fix-ready; both opened today.
- [Issue #17778](https://github.com/ollama/ollama/issues/17778) → **[PR #17894](https://github.com/ollama/ollama/pull/17894)**: `qwen3.8` returns `500: no user query found in messages` when a multi-step tool loop pushes the history past `num_ctx` and the renderer drops the latest user turn during truncation. Fix preserves the most recent user message. 30 comments, 25 👍 — this is the highest-engagement issue in the window.

**Medium severity**

- [Issue #18411](https://github.com/ollama/ollama/issues/18411) → **[PR #18413](https://github.com/ollama/ollama/pull/18413)**: on the Responses `web_search` path, Ollama emits a client `function_call` before the open `reasoning` item completes; items also share an `output_index` and finish at different indices, breaking Codex tool replay.
- [Issue #18419](https://github.com/ollama/ollama/issues/18419): `POST /api/codex/v1/responses` with `previous_response_id` returns HTTP 200 but an empty assistant `output_text` and zero token counts on the `function_call_output` follow-up. **No fix PR.**
- [Issue #16383](https://github.com/ollama/ollama/issues/16383): `qwen3.6`/`qwen3.5` parser/renderer mismatch — the qwen3.5 parser intermittently fails to unmarshal qwen3.6 tool calls and returns 500 instead of tolerating drift. Long-standing; no PR linked.
- [Issue #18094](https://github.com/ollama/ollama/issues/18094): `gemma3:12b` `/api/generate` with `format` (JSON schema) truncates early on input containing double-quoted terms — the schema-driven decoder is dropping/escaping tokens mid-stream.
- [Issue #17562](https://github.com/ollama/ollama/issues/17562): three separate agent-loop bugs in Gemma4 / Qwen derivatives via Cline — repetition guard misfires, tool calls truncated mid-JSON, and a missing brace drops the entire tool call. Patched branches offered by the reporter.
- [Issue #18297](https://github.com/ollama/ollama/issues/18297): `IQ3_S` quant of Qwen3.8-27B GSQ-RCO returns `done_reason: stop` with empty `content`. Looks like a dequant/output-tensor bug rather than a missing-model issue.
- [Issue #18416](https://github.com/ollama/ollama/issues/18416): quantize-import leaks the F16 source blob (described above). Storage correctness, not just perf.

**Lower severity**

- [Issue #18387](https://github.com/ollama/ollama/issues/18387): a chat message containing more than ten ellipses between TOC entries triggers `stop: cancel task` in `servers.log` on Windows. Likely a tokenizer/sampler trip-wire.
- [Issue #18418](https://github.com/ollama/ollama/issues/18418): Gemma4-based multimodal sees rotated images — EXIF orientation tags (e.g. tag=3 → 180°) are honored by the viewer but not by the image ingestion pipeline feeding the model.
- [Issue #18415](https://github.com/ollama/ollama/issues/18415): on Windows 10, launching the Ollama desktop 0.34.0 from the Start menu briefly flashes a PowerShell window. Cosmetic.
- [Issue #18414](https://github.com/ollama/ollama/issues/18414): models like `qwen3.8:27b` carry undocumented minimum Ollama version requirements — should be surfaced on the library page.
- [Issue #2894](https://github.com/ollama/ollama/issues/2894) (closed): perennial "Ollama won't use my RTX 4090 on Windows 11" — closed as user-side config.

## What This Means for Application Developers

- **Pin and re-test on the next tag.** The tool-parser cluster is moving fast: two same-day fix PRs ([#18422](https://github.com/ollama/ollama/pull/18422), [#17894](https://github.com/ollama/ollama/pull/17894)) plus [#18413](https://github.com/ollama/ollama/pull/18413) for the Responses API. If you ship agents on `qwen3-coder`, `qwen3.6`, or `qwen3.8`, treat 0.34.0 as "almost stable but not yet" and budget for a patch release.
- **Avoid the `/api/codex/v1/responses` surface for stateful flows.** Until [#18411](https://github.com/ollama/ollama/issues/18411) and [#18419](https://github.com/ollama/ollama/issues/18419) are resolved, `previous_response_id` follow-ups and `web_search` in the same response are not safe to rely on — they can silently return empty completions or emit out-of-order tool calls. Stick to stateless Chat Completions for production.
- **Clean up `~/.ollama/models/blobs` manually** if you ran `ollama create --quantize` from safetensors on 0.34.0; `ollama rm` will not reclaim the F16 leftovers ([#18416](https://github.com/ollama/ollama/issues/18416)). Expect a manifest-aware GC before this matters at scale.
- **Treat Gemma4 as still-in-flux.** Unified vision ([#16879](https://github.com/ollama/ollama/pull/16879)) is open, the Jetson multimodal path OOMs ([#18396](https://github.com/ollama/ollama/issues/18396)), and the tool-call parser for Gemma4 derivatives has at least three reported failure modes ([#17562](https://github.com/ollama/ollama/issues/17562)). If you depend on Gemma4 vision in production, gate on a tagged release that includes #16879.
- **Expect a CLI UX revert.** [#18393](https://github.com/ollama/ollama/pull/18393) (closed but not tagged) signals the built-in agent in `ollama` is being rolled back. Don't write automation around the current CLI agent.
- **EXIF-rotated images will mislead multimodal models** ([#18418](https://github.com/ollama/ollama/issues/18418)). Pre-process uploads by stripping/applying EXIF orientation before sending to Ollama.
- **Linux hybrid-GPU users on Intel iGPU + discrete NVIDIA should hold off** on 0.34.0 in production until [#18412](https://github.com/ollama/ollama/issues/18412) is addressed; the server is currently crashing at startup.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-13

## Today's Highlights

LiteLLM published **v1.102.0-rc.1** with cosign-verified Docker image signing, while the **Rust migration tracker (#31263)** remains the strategic center of gravity — aiming for sub-1ms gateway overheads and already the most-discussed issue in the repo. The past 24 hours also surfaced a cluster of **Responses-to-Chat streaming defects** (reasoning delta loss, raw reasoning text drop, stale reasoning state) that together suggest the Responses↔Chat bridge is the current hot-spot for correctness work.

## Releases & Breaking Changes

- **v1.102.0-rc.1** ([release notes](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1)) — All LiteLLM Docker images are now signed with [cosign](https://docs.sigstore.dev/cosign/overview/) using a single key introduced in commit `0112e53`. Operators can now verify image authenticity directly from the release pipeline.

## New Model & Hardware Support

- **OpenCode Go provider** requested in [#31568](https://github.com/BerriAI/litellm/issues/31568) — client loads cost info from the upstream catalog.
- **Cohere Command A+ in Azure** tracking [#32628](https://github.com/BerriAI/litellm/issues/32628) (open).
- **Kimi K2.7-Code in Azure** — closed via [#32613](https://github.com/BerriAI/litellm/issues/32613).
- **Gondola as an OpenAI-compatible provider** in PR [#34484](https://github.com/BerriAI/litellm/pull/34484) — JSON-configured in `providers.json` alongside nano-gpt/chutes.
- **Scaleway dashboard logo** — PR [#35094](https://github.com/BerriAI/litellm/pull/35094) ships the provider brand in the Admin UI.
- **Reasoning fallback for MiniMax M2.7** in PR [#38212](https://github.com/BerriAI/litellm/pull/38212) — fixes the `<think>...` wrapping when `reasoning_split` is unset.
- **OpenRouter video generation** — closed as completed in [#27724](https://github.com/BerriAI/litellm/issues/27724).

## Performance & Optimization

- **Rust migration (sub-1ms overhead target)** — [#31263](https://github.com/BerriAI/litellm/issues/31263) is the parent ticket; beta sign-ups are open. This is the largest performance initiative in flight.
- **MCP `list_tools` caching for HTTP servers** — [#23544](https://github.com/BerriAI/litellm/issues/23544) reports an extra round-trip on every `tools/call`; caching the upstream tool list would roughly halve MCP call latency for HTTP-backed servers.
- **Atomic counter TTL in `RedisCache.async_increment`** — PR [#40956](https://github.com/BerriAI/litellm/pull/40956) replaces the INCRBYFLOAT/EXPIRE two-step with a single pipeline so cancelled requests don't leak permanently-TTL'd counters.
- **Token-counter test suite** — PR [#40999](https://github.com/BerriAI/litellm/pull/40999) locks down empty-string, whitespace, and model-name normalization invariants.
- **`tpd_limit` (tokens per day) for batch submissions** — PR [#40997](https://github.com/BerriAI/litellm/pull/40997) introduces a batch-shaped rate-limit dimension to partition daily vendor capacity across internal teams.
- **Router 429 naming for all-deployments-in-cooldown** — PR [#40995](https://github.com/BerriAI/litellm/pull/40995) makes "everything cooling down" distinguishable from generic routing failures, which is what callers actually need to drive retries.

## Stability & Regressions

**High severity**

- **Anthropic `vector_store_ids` 400 in SDK translation** — [#23741](https://github.com/BerriAI/litellm/issues/23741) (14 comments, 👍13). Forwarding Anthropic-shaped request bodies with `vector_store_ids` / `vector_store_files` fields causes 400. No fix PR linked.
- **Self-hosted install failure (`prisma generate`)** — [#26097](https://github.com/BerriAI/litellm/issues/26097). Blocks default installs on certain environments.
- **Budget reservation silently skipped when cost is unestimable** — [#35524](https://github.com/BerriAI/litellm/issues/35524). Configured budgets can be overrun for routes whose cost cannot be estimated before the request; a security/finance-grade concern.

**Medium severity**

- **Responses-to-Chat streaming loses reasoning delta + cached state** — [#40887](https://github.com/BerriAI/litellm/issues/40887). Bridge only attaches `reasoning_items` on terminal events.
- **Responses-to-Chat drops raw `reasoning_text`** — [#40654](https://github.com/BerriAI/litellm/issues/40654). Plaintext reasoning is lost on `/v1/chat/completions`.
- **`codex` silently bypasses proxy when `-c` follows a subcommand** — [#40651](https://github.com/BerriAI/litellm/issues/40651). `lite codex exec/resume/review` skips the proxy entirely.
- **`custom_code` / `tool_permission` guardrails cannot see MCP tools on `/v1/messages`** — [#40583](https://github.com/BerriAI/litellm/issues/40583). Guardrails running pre-call are blind to MCP tools when the client uses the Anthropic-compatible endpoint.
- **Valkey semantic cache forwards `**kwargs` instead of `metadata`** — [#32324](https://github.com/BerriAI/litellm/issues/32324). Two `_get_async_embedding()` call sites.

**Lower severity but notable**

- **Ollama provider `KeyError` on minimal custom prompt templates** — [#39759](https://github.com/BerriAI/litellm/issues/39759).
- **Streaming usage merger retains stale cache-write tokens after explicit zero update** — [#40736](https://github.com/BerriAI/litellm/issues/40736). Related: #34497, #15263.
- **`langfuse_otel` never sets observation output for `/v1/rerank`** — [#36537](https://github.com/BerriAI/litellm/issues/36537).
- **`reasoning_effort=xhigh` silently downgraded instead of refused** — [#40471](https://github.com/BerriAI/litellm/issues/40471).
- **Key limit above team limit accepted silently** — [#40866](https://github.com/BerriAI/litellm/issues/40866). Fix in PR [#40998](https://github.com/BerriAI/litellm/pull/40998) (warn on generate/update).
- **Admin UI model-edit persists derived pricing → Azure spend logged as $0** — [#40649](https://github.com/BerriAI/litellm/issues/40649). Related to #30081.
- **`LiteLLM_SpendLogs.session_id` doesn't reflect `litellm_session_id`** — [#40851](https://github.com/BerriAI/litellm/issues/40851). Breaks session-grouped analytics.
- **Case-insensitive User-Agent header lookup in `_get_user_agent_tags`** — [#40979](https://github.com/BerriAI/litellm/issues/40979).
- **`spend-log` batches dropped on non-transport DB write failure** — [#33873](https://github.com/BerriAI/litellm/issues/33873) (closed; partial fix already landed, transport-failure path fixed).
- **`simple-shuffle` ignores weights when first healthy deployment has none** — [#33329](https://github.com/BerriAI/litellm/issues/33329) (closed).
- **`model_max_budget` shares one budget window start across models/durations** — [#33326](https://github.com/BerriAI/litellm/issues/33326) (closed).
- **Friendli deprecated `meta-llama-3.1-70b/8b-instruct` entries still in price map** — PR [#41000](https://github.com/BerriAI/litellm/pull/41000) removes stale catalog entries that bill against a non-existent upstream.

**Fix PRs landed in the last 24h for older issues**

- PR [#40998](https://github.com/BerriAI/litellm/pull/40998) — warn when key limits exceed team caps (fixes #40866).
- PR [#40589](https://github.com/BerriAI/litellm/pull/40589) — split concatenated tool-call JSON after repair.
- PR [#40603](https://github.com/BerriAI/litellm/pull/40603) — salvage concatenated JSON in tool-call arguments (fixes #40582; closed).
- PR [#38209](https://github.com/BerriAI/litellm/pull/38209) — preserve SSO client secret on partial settings update.
- PR [#32136](https://github.com/BerriAI/litellm/pull/32136) — enforce customer `model_max_budget` on auth paths.
- PR [#34900](https://github.com/BerriAI/litellm/pull/34900) — normalize SAP stream chunks; clearer empty-deployment error.
- PR [#40988](https://github.com/BerriAI/litellm/pull/40988) — route mid-stream Responses errors through `exception_type` so `content_policy_fallbacks` fire.
- PR [#40957](https://github.com/BerriAI/litellm/pull/40957) — check key allowlist on team-alias targets.
- PR [#40199](https://github.com/BerriAI/litellm/pull/40199) — DashScope rerank now honors `instruction` (`→` `instruct`).
- PR [#37719](https://github.com/BerriAI/litellm/pull/37719) — Openlayer as a native OTEL logging callback.
- PR [#37165](https://github.com/BerriAI/litellm/pull/37165) — NeuralTrust TrustGuard as a native guardrail.
- PR [#35606](https://github.com/BerriAI/litellm/pull/35606) — route Usage "Ask AI" through the Router so proxy aliases resolve.

## What This Means for Application Developers

- **The Responses↔Chat bridge is the riskiest path today.** If you're a SDK user driving `/v1/chat/completions` against a `openai/responses/<model>` deployment, expect reasoning content to be incomplete or lost. If your product depends on streaming reasoning, stay on native `/v1/responses` or wait for the bridge to settle; tracking [#40887](https://github.com/BerriAI/litellm/issues/40887), [#40654](https://github.com/BerriAI/litellm/issues/40654), [#39354](https://github.com/BerriAI/litellm/issues/39354).
- **Anthropic-shaped clients must scrub `vector_store_ids` / `vector_store_files`** before hitting the proxy, or you'll get 400s. See [#23741](https://github.com/BerriAI/litellm/issues/23741).
- **Codex CLI via `lite codex` is unreliable** for non-interactive subcommands; the `-c` override can be silently dropped, bypassing the proxy. See [#40651](https://github.com/BerriAI/litellm/issues/40651).
- **Guardrails are blind to MCP tools on `/v1/messages`.** If you're using `custom_code` or `tool_permission` to gate tool use, they won't see MCP tools on the Anthropic-compatible path. See [#40583](https://github.com/BerriAI/litellm/issues/40583).
- **Budgets are not enforced when cost can't be estimated.** Don't assume spend caps will save you on routes with unmapped providers — pre-flight the cost map (#35524).
- **`session_id`-based analytics are currently broken** in spend logs; the field is being overwritten by a per-call correlation id. Treat per-session rollups as unreliable until #40851 lands.
- **For high-volume deployments**, prefer `RedisCache`-backed rate limiting once #40956 ships — the fix prevents TTL-leaked counters from accumulated cancellations.
- **Verify your Docker images**: starting with v1.102.0-rc.1, every LiteLLM image is cosign-signed; plug that into your admission controller if supply-chain integrity matters.
- **Long-term**: the Rust gateway initiative (#31263) is the most consequential direction in flight — operators planning 2026 capacity should watch for beta access.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-13

## Today's Highlights

- **TRL 0.20 compatibility pass**: Studio's SFT text/CPT branches were passing removed kwargs (`max_seq_length`, `tokenizer`), breaking all text training on `trl>=0.20`. Fix landed in [#10740](https://github.com/unslothai/unsloth/pull/10740); users on the docker image `2026.9.4` were hitting this directly per [#10785](https://github.com/unslothai/unsloth/issues/10785).
- **Concrete B200 perf win**: [#10744](https://github.com/unslothai/unsloth/pull/10744) cuts Qwen3.5-9B LoRA SFT per-step time from **0.85 s → 0.66 s** on a single B200, mostly by removing CPU-side per-step overhead tied to `fla`'s autotune key rebuild (the user-reported symptom in [#10806](https://github.com/unslothai/unsloth/issues/10806)).
- **NVFP4 quantization is becoming a first-class path in Studio**: per-layer NVFP4 image policies, a flashinfer `mm_fp4` linear backend, a GPTQ builder with baked activation scales, and a gated `auto` ladder land together in [#10730](https://github.com/unslothai/unsloth/pull/10730) with kernel-side follow-ups in [#10731](https://github.com/unslothai/unsloth/pull/10731).

## Releases & Breaking Changes

- **No tagged releases in the last 24h.** Build artifacts discussed in issues reference the docker image `2026.9.4` (Sept 4 package).
- **TRL 0.20 migration (breaking for Studio users)**: `SFTConfig` no longer accepts `max_seq_length` (renamed to `max_length`) and `SFTTrainer` no longer accepts `tokenizer`. [#10785](https://github.com/unslothai/unsloth/issues/10785) is closed via [#10740](https://github.com/unslothai/unsloth/pull/10740). Anyone running Studio's text/CPT recipes against `trl>=0.20` needs this PR or a downgrade.
- **vLLM tag coverage gap**: the upstream-pinning test stopped at `v0.20.1` while vLLM is at `0.29.0`. [#10858](https://github.com/unslothai/unsloth/pull/10858) extends tracking through 0.29 and pins `bitsandbytes` symbols after vLLM 0.28 moved bnb to `vllm-bnb-plugin` (which had been causing `import unsloth_zoo.vllm_utils` to raise `ModuleNotFoundError` at module scope).

## New Model & Hardware Support

- **NVFP4 on image DiTs**, with a flashinfer `mm_fp4` linear backend and a GPTQ builder carrying baked activation scales. The `auto` ladder only promotes `nvfp4` when the reviewed gate record says so — [#10730](https://github.com/unslothai/unsloth/pull/10730), [#10731](https://github.com/unslothai/unsloth/pull/10731).
- **Image text-encoder precision control** added to the Studio Images page (Default / FP8 storage / FP8 compute / INT8 / NVFP4); the choice propagates to download planning and stays pinned through loading — [#10788](https://github.com/unslothai/unsloth/pull/10788).
- **B200 (sm_100) targeting**: NVLink detection moved from `nvidia-smi topo -m` to NVML, dropping the gate from ~1.2 s to ~tens of ms on an 8×B200 host — [#10720](https://github.com/unslothai/unsloth/pull/10720). B200 LoRA perf work — [#10744](https://github.com/unslothai/unsloth/pull/10744).
- **Local HF-cache model allowlist gap**: Studio's "select local model" misses `model-00000-of-00001.safetensors`, so single-shard models like `openbmb/MiniCPM5-2B` are reported as containing no trainable weights — [#10853](https://github.com/unslothai/unsloth/issues/10853). No fix PR yet.
- **DeepSeek V4.1 Flash GGUF in llama.cpp**: user-requested, no maintainer response yet — [#10838](https://github.com/unslothai/unsloth/issues/10838).
- **JSON / Markdown validator blocks** added to Recipe Studio (target generated fields, formula, sampler; registers `unsloth_json_validator` / `unsloth_markdown_validator`) — [#10710](https://github.com/unslothai/unsloth/pull/10710).

## Performance & Optimization

- **Qwen3.5-9B LoRA SFT on B200**: **0.85 s → 0.66 s** per step (≈22% faster) at batch 1; the bulk of the win is from removing CPU-side per-step work rather than GPU kernels — [#10744](https://github.com/unslothai/unsloth/pull/10744). Root-cause write-up tied to [#10806](https://github.com/unslothai/unsloth/issues/10806).
- **NVLink detection**: replacing `nvidia-smi topo -m` with NVML removes a ~1.2 s shell-out from every Studio launch that needs `GGML_CUDA_P2P` gating — [#10720](https://github.com/unslothai/unsloth/pull/10720).
- **`fla` autotune-key rebuild**: identified as a source of GPU idle between steps on B200; experimental mitigations discussed in [#10744](https://github.com/unslothai/unsloth/pull/10744), tracking issue [#10806](https://github.com/unslothai/unsloth/issues/10806).
- **`fast_cross_entropy_loss`**: previously rejected strided/transposed batches at `.view()` and read non-unit-stride dims inside Triton kernels, producing silently wrong losses/gradients. Fixed by using `reshape` and materializing strided label/vocab slices — [#10713](https://github.com/unslothai/unsloth/pull/10713). **Correctness, not just perf.**
- **bitsandbytes native calls**: use PyTorch's live current accelerator stream instead of the stream pointer cached at module init, addressing the cached-stream discrepancy from [#10563](https://github.com/unslothai/unsloth/issues/10563) — [#10745](https://github.com/unslothai/unsloth/pull/10745).
- **`studio update` validation**: skip re-validation of prebuilt llama.cpp (13–63 s saved on macOS, ~5 s on Windows), whisper.cpp release fetch, and `node -v`/`npm --version` spawns when the installed release already matches — [#10648](https://github.com/unslothai/unsloth/pull/10648).
- **uv cache sharing on POSIX**: `install.sh` no longer overrides the cache selector, so a warm shared cache is actually seen and `setup.sh` honors the recorded choice — [#10647](https://github.com/unslothai/unsloth/pull/10647).
- **Backend bring-up**: if `127.0.0.1` is unreachable (IPv6-only environment), the backend now falls back instead of failing the health check 80 s later — [#10803](https://github.com/unslothai/unsloth/pull/10803).

## Stability & Regressions

Ranked by severity. Status: **fix PR open** / **no fix yet**.

**High — training broken**

- **TRL 0.20 + Studio text training** — `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`. Affects every Studio text run on `trl>=0.20`, including the docker image `2026.9.4`. **Fix: [#10740](https://github.com/unslothai/unsloth/pull/10740)**. Tracking: [#10785](https://github.com/unslothai/unsloth/issues/10785).
- **Local HF-cache model rejected** — Studio's weight-file allowlist misses `model-00000-of-00001.safetensors`, so single-shard HF cache models (e.g. `MiniCPM5-1B/2B`) report "no trainable weights" on an 8 GB RTX 4060. **No fix yet.** — [#10853](https://github.com/unslothai/unsloth/issues/10853).
- **`fla` autotune-key rebuilt every launch on B200** — GPU idle for most of each step training Qwen3.5-9B LoRA via `unsloth-cli.py`. Experimental mitigations in [#10744](https://github.com/unslothai/unsloth/pull/10744). **No upstream fix yet.** — [#10806](https://github.com/unslothai/unsloth/issues/10806).

**High — silent correctness**

- **`fast_cross_entropy_loss` on strided inputs** — was emitting incorrect loss/gradients without raising. **Fix: [#10713](https://github.com/unslothai/unsloth/pull/10713)**.
- **`TextPreprocessor.clean_text` deletes every non-ASCII character** — strips accents/diacritics silently across entire training corpora (`"Le café était très bon." → "Le caf tait trs bon."`). **Fix: [#10741](https://github.com/unslothai/unsloth/pull/10741)**.
- **`Phi3.5` binary-classification loss collapses to 0** — long-standing, still no reproducer pinned down. — [#946](https://github.com/unslothai/unsloth/issues/946).

**Medium — Studio bring-up / install**

- **IPv6-only host** — backend bound `127.0.0.1`, hung for ~80 s, then exited with `unresponsive_health_check`. **Fix: [#10803](https://github.com/unslothai/unsloth/pull/10803)**.
- **Intel XPU installer shadowing** — first patch (PR #10073) didn't fully prevent `triton-windows` from shadowing torch's XPU Triton. **Follow-up issue: [#10844](https://github.com/unslothai/unsloth/issues/10844)** (referenced #10018 closed).
- **Installer ignores chosen folder on Windows** — installs dependencies into `~/.unsloth` regardless. **No fix yet.** — [#10859](https://github.com/unslothai/unsloth/issues/10859).
- **Desktop AppImage can't download large models** — missing `hf_xet`; downloads of files like Qwen 3.8 Flash Next Q5_K_XL raise `ValueError: The file is too large to be downloaded using the regular download method.` **No fix yet**; users must `pip install hf_xet`. — [#10840](https://github.com/unslothai/unsloth/issues/10840).
- **Studio can't download gated HF models** — download path checked a supplied token but missed the saved `huggingface-cli login`. **Fix: [#10758](https://github.com/unslothai/unsloth/pull/10758)**.
- **Diffusers pipeline construction can't be cancelled** — Eject and the loader both needed the same lock; cancel checks were impossible mid-construction, so a cancelled load could still become "ready". **Fix: [#10780](https://github.com/unslothai/unsloth/pull/10780)**.

**Medium — agent/tooling behaviour**

-

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-13

## 1. Today's Highlights

No new releases shipped in the last 24 hours, but three active issues surface meaningful operational concerns: a **billing/cost-tracking defect** in v3.0.22 where rule-aliased models report zero estimated cost because usage records persist the request alias rather than the resolved upstream model ([#1787](https://github.com/musistudio/claude-code-router/issues/1787)), a **non-streaming response corruption** bug when routing reasoning-capable models (e.g., `z-ai/glm-5.3`) through the `openai_chat_completions` provider capability ([#1793](https://github.com/musistudio/claude-code-router/issues/1793)), and a withdrawn attribution-header hypothesis behind ongoing zero-cache-hit reports from OpenCode Go clients ([#1791](https://github.com/musistudio/claude-code-router/issues/1791)).

## 2. Releases & Breaking Changes

*No new releases in the last 24 hours. Last published version remains **3.0.22**.*

## 3. New Model & Hardware Support

*No new model, backend, or quantization support announced today.*

## 4. Performance & Optimization

*No landed or proposed performance/optimization work in the last 24 hours.*

## 5. Stability & Regressions

Ranked by severity:

1. **[HIGH — Billing correctness] [#1787](https://github.com/musistudio/claude-code-router/issues/1787)** — Estimated cost stays `$0` for rule-aliased models. Reported on **v3.0.22** and confirmed still present on current `master`; the responsible code path is unchanged since v3.0.22. The persistence layer records the user-supplied request name (alias) instead of the resolved upstream model, so cost calculation resolves against an unknown entry. **Impact:** cost dashboards and budget enforcement are silently broken for any deployment relying on CCR rules/aliases. **No fix PR open.**

2. **[HIGH — Response correctness] [#1793](https://github.com/musistudio/claude-code-router/issues/1793)** — Non-streaming requests to reasoning-capable models routed through `openai_chat_completions` (tested with `z-ai/glm-5.3` via OpenRouter) produce fragmented or corrupted content blocks in the Anthropic Messages response. Streaming path appears unaffected. **Impact:** callers using `non_stream=True` against reasoning models on this provider capability get unusable output. **No fix PR open; root cause not yet isolated.**

3. **[MEDIUM — Cache effectiveness, under investigation] [#1791](https://github.com/musistudio/claude-code-router/issues/1791)** — Zero cache usage observed with Claude Code when fronted by OpenCode Go against a custom base URL. The proposed `CLAUDE_CODE_ATTRIBUTION_HEADER=0` fix ([PR #1792](https://github.com/musistudio/claude-code-router/pull/1792)) was **closed/withdrawn** after verification did not support the attribution-header attribution hypothesis. The underlying cache symptom remains unresolved.

## 6. What This Means for Application Developers

- **Audit your cost telemetry immediately** if you run CCR ≥ 3.0.22 and rely on rule aliases — aliased traffic is almost certainly being billed at `$0`. Until [#1787](https://github.com/musistudio/claude-code-router/issues/1787) is fixed, derive spend from upstream provider usage records rather than CCR's `usage.json`.
- **Avoid non-streaming mode for reasoning-capable models** on the `openai_chat_completions` provider capability (e.g., `z-ai/glm-5.3`). Either force `stream=true` in your client config or route reasoning models through a provider capability whose non-streaming path is known good (e.g., Anthropic-native). See [#1793](https://github.com/musistudio/claude-code-router/issues/1793).
- **Prefix-cache debugging is still open.** The most recent hypothesis (attribution header) did not pan out ([#1791](https://github.com/musistudio/claude-code-router/issues/1791), [#1792](https://github.com/musistudio/claude-code-router/pull/1792)). If you're seeing zero cache hits via OpenCode Go against custom base URLs, expect continued investigation and don't ship a workaround yet.
- **Stay pinned to the last known-good build** until [#1787](https://github.com/musistudio/claude-code-router/issues/1787) is resolved; no patched release is currently available, so plan for upstream-provider-side reconciliation of costs in the interim.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-13

## Today's Highlights

The most consequential activity centers on **Codex session continuity when providers change**: at least four parallel issues (#6658, #7310, #7362, #7257) and a dedicated fix PR (#7342) address the recurring "old conversations break after switching between Official OpenAI and third-party relays" failure caused by Codex pinning `model_provider` in `state_5.sqlite`. Separately, **DeepSeek Harness (DSH)** was promoted to a first-class app type in [#7356](https://github.com/farion1231/cc-switch/pull/7356) (superseding #6526), bringing native YAML/credential writers, source-aware provider lifecycle, and a Codex-style provider form to a second major Chinese coding agent.

## Releases & Breaking Changes

No new releases in the last 24h. Headline in-flight changes worth flagging for downstream users:

- **DeepSeek Harness as a first-class app** ([#7356](https://github.com/farion1231/cc-switch/pull/7356)) — introduces an `app_type` for DSH and a native writer for `settings.yaml` under `DSH_HOME` (default `~/.dsh`). This will expand the install footprint and may affect detection logic for users who already have DSH installed.
- **WSL OMO config detection** ([#7363](https://github.com/farion1231/cc-switch/issues/7363)) — OMO's `~/.omo/omo.jsonc` is currently probed using the Windows home, not the WSL home; users on Windows+WSL2 may silently miss OMO providers. Fix PR not yet open.
- **Antigravity CLI migration** ([#7198](https://github.com/farion1231/cc-switch/issues/7198)) — Gemini CLI is reportedly no longer maintained; entry point and usage stats need to be migrated to Antigravity CLI.

## New Model & Hardware Support

- **Command Code provider presets + quota** ([#7358](https://github.com/farion1231/cc-switch/pull/7358)) — adds presets, endpoint/model configuration, and coding-plan usage queries (5-hour, weekly, monthly) for both Claude Code and Codex.
- **DeepSeek Harness (DSH) full support** ([#7356](https://github.com/farion1231/cc-switch/pull/7356)) — app type, native YAML/credential writer, source-aware provider lifecycle.
- **Zhipu OpenAI Responses model-list compatibility** ([#7330](https://github.com/farion1231/cc-switch/pull/7330)) — fixes model-list response parsing across Zhipu's three API styles (Anthropic-compatible, OpenAI Chat, OpenAI Responses).
- **TokenRouter preset requested** ([#5319](https://github.com/farion1231/cc-switch/issues/5319)) — community request to add `https://api.tokenrouter.com` (Anthropic + OpenAI compatible surfaces) as a preset. No PR yet.
- **Codex account-scoped quota activation** ([#7351](https://github.com/farion1231/cc-switch/pull/7351)) — opt-in flow for managed Codex OAuth accounts with a SQLite ledger enforcing one activation per (account, bucket, reset).

## Performance & Optimization

- **Output TPS in RequestLogTable** ([#3369](https://github.com/farion1231/cc-switch/pull/3369), closed) — adds tokens/sec display in the output-tokens cell when latency and token count are valid. Closes the long-standing [#5936](https://github.com/farion1231/cc-switch/issues/5936).
- **Trailing reasoning delta suppression in Anthropic SSE** ([#6911](https://github.com/farion1231/cc-switch/pull/6911)) — fixes a duplicate empty thinking block emitted by the chat-completions → Anthropic SSE converter when upstreams like Kimi append a trailing `reasoning_content` after text. Closes #6903. No throughput number, but reduces wasted content blocks and prevents client-side parser confusion.
- **Multimodal `function_call_output` handling** ([#4724](https://github.com/farion1231/cc-switch/pull/4724)) — Responses → ChatCompletions translator now converts image arrays to proper `image_url` parts instead of base64-stringifying the whole canonical JSON, eliminating a costly round-trip on Codex `view_image` calls.

## Stability & Regressions

Ranked by severity and user impact:

1. **Critical — Codex session replay broken after provider switch** ([#7362](https://github.com/farion1231/cc-switch/issues/7362), [#7310](https://github.com/farion1231/cc-switch/issues/7310), [#6658](https://github.com/farion1231/cc-switch/issues/6658), [#7257](https://github.com/farion1231/cc-switch/issues/7257)). Root cause: Codex pins `model_provider` in `threads` rows of `state_5.sqlite`; switching providers leaves orphaned references. **Fix PR:** [#7342](https://github.com/farion1231/cc-switch/pull/7342) — sanitizes incompatible reasoning replay for official Responses. Multiple users affected; community workaround proposed in #7257.
2. **High — Codex automation orphan `function_call_output` → DeepSeek 400** ([#7074](https://github.com/farion1231/cc-switch/issues/7074)). **Fix PR:** [#7124](https://github.com/farion1231/cc-switch/pull/7124) revives the sanitizer originally dropped upstream.
3. **High — Claude Code WebSearch 422 on Grok/xAI Responses** ([#7365](https://github.com/farion1231/cc-switch/issues/7365), [#7241](https://github.com/farion1231/cc-switch/issues/7241)). `tool_choice: {type:"web_search"}` is rejected by xAI New-API gateways. **Fix PR:** [#7366](https://github.com/farion1231/cc-switch/pull/7366) maps the forced hosted WebSearch to Responses `tool_choice: "required"`.
4. **High — WSL OMO config silently ignored** ([#7363](https://github.com/farion1231/cc-switch/issues/7363)). Windows+WSL2 users cannot manage OMO providers via CC Switch. No fix PR.
5. **Medium — GPT login invalidation blocks provider switching** ([#7361](https://github.com/farion1231/cc-switch/issues/7361)). When a GPT/Codex OAuth session expires, the switcher refuses to move to a different provider. No fix PR.
6. **Medium — Codex local proxy ignores `wire_api=chat`** ([#7360](https://github.com/farion1231/cc-switch/issues/7360)). Always writes Responses; breaks xAI Grok OAuth → 502 on `/v1/responses`. Related to #7241.
7. **Medium — WSL tool-version probe shows distro release number** ([#7348](https://github.com/farion1231/cc-switch/pull/7348) is the fix) — `try_get_version_wsl` reads shell startup output. PR filters it.
8. **Medium — Codex `model_catalog_json` written as bare filename** ([#7349](https://github.com/farion1231/cc-switch/pull/7349)) — newer Codex builds re-read `config.toml` during permission-profile validation and deserialize the field as absolute; fix writes an absolute pointer for native config dirs.
9. **Medium — `deepMerge` replaces provider entries on common-config array union** ([#6144](https://github.com/farion1231/cc-switch/pull/6144)) — fix in review; merges as deduplicated union and treats common-config arrays as subsets.
10. **Medium — MCP url-only servers corrupted on Codex import** ([#6755](https://github.com/farion1231/cc-switch/pull/6755)) — defaults to `stdio`; fix infers `http` when only `url` is set. Closes #6719.
11. **Medium — Volcengine quota always reads Agent Plan** ([#6518](https://github.com/farion1231/cc-switch/pull/6518)) — fix routes by provider `base_url` to `GetCodingPlanUsage` vs `GetAFPUsage`.
12. **Low — Claude Desktop Linux config detection** ([#7331](https://github.com/farion1231/cc-switch/pull/7331)) — adds 3P support, honors `$XDG_CONFIG_HOME`, and unwraps Flatpak to the host `~/.config`.

## What This Means for Application Developers

- **Plan for provider-switch side effects on Codex-based agents.** If your agent persists Codex session state (threads, SQLite) and lets users change upstream providers, you will hit the `model_provider` mismatch class of bug. [#7342](https://github.com/farion1231/cc-switch/pull/7342) is the canonical workaround; consider mirroring its sanitization in your own replay path rather than relying on the upstream Codex CLI to heal.
- **Treat your SSE/Replay boundary as a contract.** Multiple fixes this week ([#6911](https://github.com/farion1231/cc-switch/pull/6911), [#7366](https://github.com/farion1231/cc-switch/pull/7366), [#7124](https://github.com/farion1231/cc-switch/pull/7124), [#4724](https://github.com/farion1231/cc-switch/pull/4724)) are about gateway-side quirks (trailing reasoning blocks, hosted-tool `tool_choice` mapping, orphan tool outputs, multimodal tool outputs). If you sit behind a multi-vendor relay, build defensive sanitizers — don't trust upstream tool-call ordering.
- **Cross-platform path resolution is still a hot zone.** WSL detection bugs in [#7363](https://github.com/farion1231/cc-switch/issues/7363) and [#7348](https://github.com/farion1231/cc-switch/pull/7348) are good reminders to always probe both Windows and POSIX homes, and to strip shell startup banner output before version probing.
- **Expect a richer provider ecosystem in the next release.** DSH, Command Code, and Zhipu Responses all land in the same window. If you target Chinese coding tools, validate against both Anthropic-compatible and OpenAI Responses surfaces; [#7330](https://github.com/farion1231/cc-switch/pull/7330) is a useful reference for the wire-format divergences.
- **Quota windows are getting more structured.** The account-scoped quota-window activation in [#7351](https://github.com/farion1231/cc-switch/pull/7351) (five-hour-first, weekly-only fallback) is a clean pattern if your own agent needs to coordinate multi-bucket usage refreshes without double-activation races.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-13

## Today's Highlights
The project continues rapid iteration on the v1.0.0 release-candidate line (currently at rc.37 in self-hosted builds, rc.36 referenced in discussions), with an active community request to formalize GA criteria (#7279). Today's traffic is dominated by **bug-fix PRs targeting relay correctness and SSRF hardening**, alongside notable new capabilities: CSV export of usage logs (#7356), global URL prefix routing (#7350), and Gemini Agentic Video Understanding (#7337).

## Releases & Breaking Changes
*No new releases in the last 24h.* The community is calling for an explicit v1.0.0 GA gate ([#7279](https://github.com/QuantumNous/new-api/issues/7279)); project remains on the `v1.0.0-rc.*` line.

## New Model & Hardware Support
- **Gemini Agentic Video Understanding** — new relay feature ([PR #7337](https://github.com/QuantumNous/new-api/pull/7337), closes [#7336](https://github.com/QuantumNous/new-api/issues/7336)) supporting Google/Gemini API video-understanding flows.
- **Gemini 3.x tiered model naming** — preservation of `-high`/`-low` style compute-tier suffixes after model mapping ([PR #7339](https://github.com/QuantumNous/new-api/pull/7339), merged/closed).
- **Claude streaming via OAI-compatible upstreams** — completion-event forcing when upstream emits no usage chunk ([PR #7351](https://github.com/QuantumNous/new-api/pull/7351)).

## Performance & Optimization
- **Video request routing by supplier cost** ([PR #7353](https://github.com/QuantumNous/new-api/pull/7353), closed/not merged) — proposed cost-aware scheduler for video generation suppliers.
- **Active channel probing** with refined throttling ([PR #7161](https://github.com/QuantumNous/new-api/pull/7161)) — long-running feature work for health checks.
- **Code simplification** replacing custom min/max with stdlib built-ins ([PR #7102](https://github.com/QuantumNous/new-api/pull/7102), merged).

## Stability & Regressions

| Severity | Issue | Status | Fix / Link |
|---|---|---|---|
| **High** | SSRF in `FetchUpstreamRatios` — arbitrary upstream URLs in ratio sync not validated against SSRF policy | Open | [PR #7344](https://github.com/QuantumNous/new-api/pull/7344) |
| **High** | Webhook/Bark URLs in user settings not validated against SSRF policy | Open | [PR #7343](https://github.com/QuantumNous/new-api/pull/7343) |
| **High** | Channel `param_override` silently ignored when `pass_through_body_enabled` is on (mutually exclusive behavior, undocumented) | Closed (bug confirmed) | [Issue #7348](https://github.com/QuantumNous/new-api/issues/7348) · Fix [PR #7346](https://github.com/QuantumNous/new-api/pull/7346) |
| **High** | OAuth sensitive-op verification always fails when IdP returns `Cross-Origin-Opener-Policy` | Open | [Issue #7338](https://github.com/QuantumNous/new-api/issues/7338) |
| **Medium** | Image generation: `aspect_ratio`/`resolution` silently dropped on relay (DTO `MarshalJSON` discards `Extra`) | Closed (bug confirmed) | [Issue #7340](https://github.com/QuantumNous/new-api/issues/7340) · Fix [PR #7341](https://github.com/QuantumNous/new-api/pull/7341) |
| **Medium** | "Database consistency broken" error on retry when auto-disable empties the last channel in a group | Closed | [Issue #6503](https://github.com/QuantumNous/new-api/issues/6503) · Fix [PR #6504](https://github.com/QuantumNous/new-api/pull/6504) |
| **Medium** | Dashboard weekly-granularity default time range not pre-selected | Open | [Issue #7354](https://github.com/QuantumNous/new-api/issues/7354) · Fix [PR #7355](https://github.com/QuantumNous/new-api/pull/7355) |
| **Medium** | Anthropic cache tokens missing from consume-log input totals (billing) | Open | [PR #7305](https://github.com/QuantumNous/new-api/pull/7305) (closes [#7290](https://github.com/QuantumNous/new-api/issues/7290)) |
| **Medium** | OAI→Claude stream lacks termination event when upstream omits `usage` chunk | Open | [PR #7351](https://github.com/QuantumNous/new-api/pull/7351) |
| **Low** | `xAI grok-imagine-video` listed in catalog but fails with `invalid_api_platform: 48` | Closed (duplicate) | [Issue #7352](https://github.com/QuantumNous/new-api/issues/7352) |
| **Low** | Self-signed HTTPS certificate handling for internal model endpoints | Closed (stale) | [Issue #1069](https://github.com/QuantumNous/new-api/issues/1069) |
| **Info** | "Internal API key" feature PR closed | Closed | [PR #7342](https://github.com/QuantumNous/new-api/pull/7342) |
| **Suspicious** | New contributor `premshharmaa` "Initial commit" PR (#7349) — review carefully before any interaction | Open | [PR #7349](https://github.com/QuantumNous/new-api/pull/7349) |

## What This Means for Application Developers
- **Don't combine `pass_through_body_enabled` with `param_override`** on the same channel until PR #7346 lands in your build; param_override will be silently dropped, and downstream prompts/temperature overrides will not apply.
- **Plan for the v1.0.0 GA timeline**: the project has shipped rc.36/rc.37 with no published GA criteria yet ([#7279](https://github.com/QuantumNous/new-api/issues/7279)). Pin to a known rc tag and budget for re-pinning once GA is cut.
- **SSRF posture is being tightened** in ratio sync and user webhook URLs ([#7343](https://github.com/QuantumNous/new-api/pull/7343), [#7344](https://github.com/QuantumNous/new-api/pull/7344)); if you sync ratios from private/internal controllers or use webhook/Bark notifications to private hosts, validate reachability before upgrading.
- **Image generation to xAI/Grok or any provider using `aspect_ratio`/`resolution`** will lose those fields on relay today ([#7340](https://github.com/QuantumNous/new-api/issues/7340)). Wait for [#7341](https://github.com/QuantumNous/new-api/pull/7341) if you depend on geometric params.
- **Billing accuracy**: if you bill customers by input tokens for Anthropic traffic, note that cache tokens are not currently counted ([#7305](https://github.com/QuantumNous/new-api/pull/7305)) — verify reconciliation against upstream invoices.
- **New operational tool**: the upcoming CSV export ([#7356](https://github.com/QuantumNous/new-api/pull/7356)) — admin-scoped `ExportAllLogs` and user-scoped `ExportUserLogs`, up to 10k rows with existing filter parity — will let ops teams replace ad-hoc DB dumps for usage analytics.
- **Subpath deployments**: PR [#7350](https://github.com/QuantumNous/new-api/pull/7350) introduces `NEW_API_ROUTE_PREFIX` so the entire service (api/relay/dashboard/task/video/plugin) can be mounted under a custom prefix — useful for reverse-proxy and ingress layouts.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*