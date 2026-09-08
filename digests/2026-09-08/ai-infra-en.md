# AI Infrastructure Digest 2026-09-08

> Generated: 2026-09-08 11:30 UTC | Projects covered: 9

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

*Scope: vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth, Claude Code Router, CC Switch, New API. Counts below are items surfaced in today's digests, not exhaustive repo totals.*

---

## 1. Ecosystem Overview

The ecosystem is converging on three pressure points: **hybrid-attention frontier models** (Qwen3.8-Flash-Next, GLM-5.x, DeepSeek-V4) whose linear-attention/DSA components are breaking KV-cache and speculative-decoding assumptions built for dense transformers, and **the OpenAI Responses API** rapidly becoming the lingua franca for agentic clients (Ollama parity, New API WebSocket transport, CC Switch Codex routing, LiteLLM streaming fixes). Meanwhile a **security-hardening wave** is hitting the gateway and tooling layers (LiteLLM's unauthenticated key-hash disclosure, Unsloth Studio's prompt-injection-to-RCE, Ollama's debug-log retention). The dominant engineering risk across all layers has shifted from crashes to **silent correctness failures** — non-deterministic greedy decoding, dropped tool calls, and wrong logits on quantized paths — which are far harder to detect in production.

---

## 2. Activity Comparison

| Project | Issues Surfaced | PRs Surfaced | Release Status |
|---|---|---|---|
| **vLLM** | ~21 open (+7 closed) | ~17 | No release; rolling `main` |
| **SGLang** | ~23 | ~16 | No release; v0.5.18-cu130 reference |
| **llama.cpp** | ~18 | ~20 | **8 releases in 24h** (b10840–b10856) |
| **Ollama** | ~18 | ~10 | No release; 0.33.x stabilizing |
| **LiteLLM** | ~19 | ~15 | No release |
| **Unsloth** | ~16 | ~17 | No release; Feb-2026 baseline tag |
| **Claude Code Router** | 4 | 6 | No release |
| **CC Switch** | ~19 | ~20 | **v3.20.2** shipped |
| **New API** | ~10 | ~8 | **v1.0.0-rc.35** shipped |

**Read:** The two datacenter engines (vLLM, SGLang) carry the deepest issue backlogs, dominated by the newest model classes. llama.cpp remains the highest-cadence releaser. The desktop/gateway tier (CC Switch, New API) is shipping, while Ollama and Unsloth are in defensive hardening phases rather than feature phases.

---

## 3. Model Support Race

| Model family | vLLM | SGLang | llama.cpp | Ollama | Gateways |
|---|---|---|---|---|---|
| **Qwen3.8-Flash-Next** | Perf config for B200 (#55890); **A100 startup broken** (#54318), **greedy non-determinism** (#54521) | QSA illegal-memory-access (#37633), tool-parser loops (#36537) | RDNA4 FA tuning WIP (#28102) | Streaming 500s (#17778, 25 comments) | Presets refreshed (CC Switch #7183) |
| **GLM-5.x** | GLM-5.2-FP8 in AMD CI (#53885); **5.3-Flash unsupported on B200** (#54062) | NPU support (#38250); **critical HiCache corruption** (#38031), FP8-KV broken on H20 (#36830) | Feature request open (#27922) | — | — |
| **DeepSeek-V4** | Inline-system-message wrong output (#46710) | NPU perf suite; **decode hang at ~245K ctx** (#33549) | **Vulkan fused hyper-connection shipped** (b10844) | — | — |
| **Kimi-K3** | — | KV-pool budget OOM under DP (#38202) | Recurrent-state rollback shipped (b10853) | — | — |
| **Nemotron / MiniMax-H3** | MTP lm-head quantization (#54574) | VDN-H3 hybrid backend (#37903) | — | — | — |
| **Diffusion / video** | — | Component offload for diffusion (#36727) | **LTX-2.3 GGUF RFC** (#28541) | — | Wan 3.0 (New API rc.35), Grok Imagine (LiteLLM #40238) |

**Verdict:** vLLM and SGLang lead on *breadth* of frontier MoE/hybrid support but are shipping it with open critical bugs — neither can call GLM-5.3-Flash or DeepSeek-V4 long-context GA. llama.cpp leads on *backend parity and scope expansion* (Vulkan now matches CUDA/Metal on DSV4 fused ops; first moves into diffusion serving). The gateways lead only on multimodal *provider* integration, which is their layer's job.

---

## 4. Performance Frontier

Optimization effort clusters into five fronts:

1. **KV-cache correctness & lifecycle (vLLM-dominant).** The partitioning conformance suite (#53194 / PR #55886), Mooncake shared-KV connector RFC (#38474), context-aware retention API (#37003), and the EAGLE/MTP prefix-cache recompute fix (#53670: ~1,648-token recompute, 30–40% batch throughput loss). SGLang counters with host-tier HiCache FP8 on gfx950; Unsloth is pushing unified KV pools into `llama-server` (#10301/#10358).
2. **Quantized kernels.** vLLM: +5.9–23.4% Qwen3.8-Flash-Next-FP8 TP4 on B200 via tuned Triton MoE (#55890), AITER shared-cache attention, Marlin FP8 fallback for A100. llama.cpp: proposed 3–7× CPU k-quant matmul via VNNI tiling (#27851), Vulkan int8 coopmat1 on RDNA3/4 (#27952), NVFP4 W4A8 on Blackwell (#24364).
3. **Weight/serving lifecycle.** SGLang's Weight Cache Daemon Phase 1 is the day's single biggest operational number: Qwen3-235B FP8 load **306–327s → <1s** via CUDA IPC (#33522). Directly attacks recovery time, not throughput.
4. **Scheduling & admission.** vLLM length-aware batch composition (#55265); llama.cpp session-priority scheduling to cut KV-swap churn (#28532); SGLang FDFO anti-head-of-line-blocking (rework pending).
5. **Distributed/topology.** SGLang's Context Parallelism roadmap beyond prefill (#21788, 16 👍) and DWDP expert-transfer MoE design (#22084); vLLM's disaggregated (1P1D) CI expansion on AMD.

**Signal:** the frontier has moved from raw kernels toward *cache semantics, recovery, and scheduling* — the levers that matter once batch inference at scale is table stakes.

---

## 5. Layer Positioning

| Layer | Projects | Today's Character |
|---|---|---|
| **Datacenter serving engines** | vLLM, SGLang | Absorbing architecture shocks (hybrid attention, MTP, FP8/FP4); issue volume reflects frontier-model risk. Competing on perf tuning + disaggregated/EP topologies. |
| **Local runtimes** | llama.cpp (engine), Ollama (platform) | llama.cpp is the substrate innovating on backend breadth (Vulkan, Hexagon, gfx90c) and now diffusion. Ollama adds product surface (Responses API, parsers) and consumes upstream — currently paying integration tax (5× CUDA regression #18225, MTP offload #18186). |
| **Gateways / proxies** | LiteLLM (cloud-first), New API (multi-tenant/billing), CC Switch & CCR (desktop agent routing) | Distinct niches: LiteLLM on provider breadth + budget/routing semantics; New API on billing, plugins, WebSocket Responses; CC Switch/CCR on multi-app agent orchestration (Codex/Claude takeover, classifier-queue routing #6602). All are converging on SSE/streaming and tool-call fidelity as the hard problems. |
| **Fine-tuning** | Unsloth | Uniquely straddles layers: training-side (DoRA on MLX, vendored GDN kernels) plus its own local serving via llama.cpp. Today's work is operational hardening (installers, ROCm detection, Studio security) more than training throughput. |

Notable: the layers are *fusing* — Unsloth ships serving, llama.cpp ships a server + schedulers, gateways do protocol translation once considered engine territory (thinking-block synthesis in CC Switch #6814).

---

## 6. Trend Signals

**For the industry:**

- **Hybrid attention is the new correctness frontier.** GDN/DSA/linear-attention models appear in 6 of 9 digests, always alongside KV-cache or state-rollback bugs (vLLM #53194 tracker, SGLang #37524 umbrella, Unsloth's rollback CI). Expect a quarter of conformance-suite building before these are boring.
- **Speculative decoding × quantization = silent drift.** llama.cpp #25618 (greedy divergence on Q4_K_M targets), vLLM #54521 (temperature-0 non-determinism), Ollama #18302 (MTP broken under tensor split). MTP/EAGLE is production-default latency tech that still fails golden-output tests on non-trivial configurations.
- **The Responses API is the agentic contract.** Four projects hardened it today (Ollama, New API WS transport #6914, LiteLLM streaming fixes #40232, CC Switch Grok-via-Responses). Betting against it is now contrarian.
- **Security debt is being paid at the routing layer.** LiteLLM's unauthenticated 401/403 leaks (#40217/#39757), Unsloth's markerless tool-call RCE (#6967), Ollama's debug-log retention (#18210). Anyone exposing these to untrusted input should treat this week as patch week.
- **Vendor diversification is real.** Ascend NPU (SGLang), ROCm/gfx90c/RDNA4 (llama.cpp, vLLM, Unsloth), Intel XPU (SGLang, vLLM), Hexagon. NVIDIA-first is no longer a safe engineering assumption at any layer.

**What agent/application developers should watch:**

1. **Treat silent failure as the default failure mode.** Run golden-output smoke tests on exact model+quant+spec-config combinations (Ollama's 0/15 HumanEval+ on low-bit quants #18252; llama.cpp gfx1151 wrong logits #28211).
2. **Pin, don't float.** Concrete bad windows exist today: Ollama 0.32.11–0.32.15 and 0.33.x CUDA; New API rc.35 for Ollama-channel tool calls (#7252); SGLang for DSV4 >200K context (#33549) and GLM-5.3-Flash HiCache (#38031); vLLM Qwen3.8-Flash-Next on A100 (#54318).
3. **Client-side cancellation is mandatory** for long-context streaming (SGLang zombie-request regression #36333; New API counting cancels as failures #7134 — your reliability dashboards may be lying).
4. **Long-lived agentic sessions are reshaping schedulers** (session-priority in llama.cpp #28532, unified KV in Unsloth, retention APIs in vLLM). Re-benchmark concurrency assumptions when these land.
5. **Watch LiteLLM #40231 (key-hash leak fix) and Unsloth #6967 (RCE fix) for merge**, and rotate credentials exposed in the interim.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-08

## Today's Highlights

Today's traffic is dominated by speculative-decoding + hybrid architectures (Qwen3.8-Flash-Next, GLM-5.x, Nemotron) and by a cluster of KV-cache partitioning bugs being formalized into a conformance suite ([#53194](https://github.com/vllm-project/vllm/issues/53194), [PR #55886](https://github.com/vllm-project/vllm/pull/55886)). A meaningful performance land arrives in [PR #55890](https://github.com/vllm-project/vllm/pull/55890) — **5.9–23.4% throughput uplift** for Qwen3.8-Flash-Next-FP8 at TP4 on B200 via tuned Triton MoE. No new releases were published in the last 24h.

## Releases & Breaking Changes

*No new releases in the last 24 hours.* Nothing in the merged PR stream indicates an imminent breaking release; rolling `main` continues to add new quantization paths (Cutlass FP8 on A100, separate MTP lm heads) without churn to existing APIs.

## New Model & Hardware Support

- **[PR #55890](https://github.com/vllm-project/vllm/pull/55890)** — Qwen3.8-Flash-Next-FP8 TP4 Triton MoE config for B200 (E=512, top-k=10, 32×32 FP8 blocks).
- **[PR #53885](https://github.com/vllm-project/vllm/pull/53885)** — `GLM-5.2-FP8` added to the AMD MoRIIO disaggregated CI catalog (1P1D TP8 and Wide-EP DP8) using AITER kernels for MLA/MoE/RMSNorm/fusion.
- **[PR #54574](https://github.com/vllm-project/vllm/pull/54574)** — Enables `nemotron_h_mtp` to use a separate (optionally quantized) lm head for MTP speculative decoding.
- **[PR #55817](https://github.com/vllm-project/vllm/pull/55817)** — `torch.compile` enabled for `SarvamMLAModel` with explicit dynamic dims for `input_ids`, `positions`, `intermediate_tensors`, `inputs_embeds`.
- **[Issue #54062](https://github.com/vllm-project/vllm/issues/54062)** — GLM-5.3-Flash's `Glm5NextTextLinearAttention` is **not yet supported**; reported on B200.
- **[Issue #38425](https://github.com/vllm-project/vllm/issues/38425)** — Transformers v5 meta-device load path still under validation for InternVL2.
- **[PR #55889](https://github.com/vllm-project/vllm/pull/55889)** — ColQwen3 models are now loaded once per module across six pooling tests (18 loads → 3), no API change.

## Performance & Optimization

- **[PR #55890](https://github.com/vllm-project/vllm/pull/55890)** — Qwen3.8-Flash-Next-FP8 TP4 on B200: **+5.9% to +23.4% model throughput** across 14 token counts (1–8192), measured against prior Triton config.
- **[PR #55154](https://github.com/vllm-project/vllm/pull/55154)** — Adds HY V4 iHC head op, custom-op registration, and a tensor-core path for large batches (continues #55059).
- **[PR #55888](https://github.com/vllm-project/vllm/pull/55888)** — FlexAttention no longer recompiles when request counts change; persistent Q-offset / seq-len buffers preserve CUDA-graph capture across single-request batches.
- **[PR #55864](https://github.com/vllm-project/vllm/pull/55864)** — Narrow fix for FlashInfer KV sharing with omitted K/V (resolves #55789 regression, preserves #54917).
- **[PR #55887](https://github.com/vllm-project/vllm/pull/55887)** — AITER attention now reads K/V from the shared cache during (chunked) prefill; gather workspace scoped per group. Covers NHD/SHUFFLE, FP8 caches, sliding window.
- **[Issue #41784](https://github.com/vllm-project/vllm/issues/41784)** — KV prefetching with LMCache can be spawned too late and force GPU idle; RFC-style analysis attached.
- **[Issue #53670](https://github.com/vllm-project/vllm/issues/53670)** — EAGLE/MTP prefix-cache last-block drop forces a **1,648-token recompute per hit** on a hybrid Qwen3.8 GDN layout, measured at **~30–40% batch throughput loss** on prefix-reusing workloads.
- **[PR #55170](https://github.com/vllm-project/vllm/pull/55170)** *(closed)* — Preferring W4A4 NVFP4 over W4A16 on SM120/121; landed as W4A4 NVFP4 kernel path on Blackwell Max-Q.

## Stability & Regressions

Ranked roughly by severity / breadth of impact.

1. **[Issue #54521](https://github.com/vllm-project/vllm/issues/54521)** — `Qwen3.8-Flash-Next-FP8` greedy decoding is **non-deterministic** when prompt length nears `indexer_budget` on SM121/GB10; five byte-identical requests at `temperature=0` return five different completions. Tied to `persistent_topk` in prefill once Qwen Sparse Attention switches from dense to top-k selection. **No fix PR yet.**
2. **[Issue #54318](https://github.com/vllm-project/vllm/issues/54318)** — Qwen3.8-Flash-Next-FP8 **fails to start on 4× A100** (`SM 8.0`) because `fp8e4nv` is unsupported on SM80. **Fix available:** [PR #55884](https://github.com/vllm-project/vllm/pull/55884) routes A100 FP8 linear to Marlin via `cutlass_fp8_supported`.
3. **[Issue #54062](https://github.com/vllm-project/vllm/issues/54062)** — GLM-5.3-Flash cannot start on B200 (CUDA 13, driver 580); `Glm5NextTextLinearAttention` not supported.
4. **[Issue #53726](https://github.com/vllm-project/vllm/issues/53726)** — Silent CUDA illegal-memory access (exit 0) on RTX 3090 with hybrid GDN + MTP k=3 + async scheduling; **persists through the #50021/#45100/#53613-class hardening fixes**. No fix PR.
5. **[Issue #37754](https://github.com/vllm-project/vllm/issues/37754)** — FlashInfer + MTP speculative decoding **illegal memory access** on SM121/DGX Spark when serving Nemotron-3-Super-120B-A12B-NVFP4 (GQA=16). Triton backend works.
6. **[Issue #46710](https://github.com/vllm-project/vllm/issues/46710)** — DeepSeekV4-Flash produces **incorrect output with inline system messages** after PR #46025's `preserved in-place` path; behavior diverges depending on whether the template raises, strips, or preserves. No fix PR.
7. **[Issue #49210](https://github.com/vllm-project/vllm/issues/49210)** — Engine-core livelock (100% CPU, no crash) with MTP + xgrammar on Qwen3.6-27B-NVFP4, **regression from v0.24.0** (reproduced on 0.25.1).
8. **[Issue #41515](https://github.com/vllm-project/vllm/issues/41515)** — `kv_offload + HMA` fails on the second chat request.
9. **[Issue #54094](https://github.com/vllm-project/vllm/issues/54094)** — DFlash2 + YaRN: identical 1.04M prompt gets **zero prefix-cache reuse** while target-only reuses ~1.039M tokens (Blackwell Max-Q, RTX PRO 6000).
10. **[Issue #31624](https://github.com/vllm-project/vllm/issues/31624)** — ModelOpt Llama-4 (Scout-17B-16E-Instruct-FP8) takes **5+ minutes** to load weights even from CPU page cache due to legacy MoE state-dict reshape path.
11. **[Issue #50269](https://github.com/vllm-project/vllm/issues/50269)** — Host memory does not reduce after model load on Intel XPU.
12. **Closed but worth noting:**
    - [Issue #52735](https://github.com/vllm-project/vllm/issues/52735) — `OffloadingConnector` stored but never served under MTP/EAGLE on hybrid GDN (XPU).
    - [Issue #41622](https://github.com/vllm-project/vllm/issues/41622) — CUDA-graph capture `hipErrorCapturedEvent` crash on ROCm with LoRA.
    - [Issue #41494](https://github.com/vllm-project/vllm/issues/41494) — `Qwen3ForEmbedding` regression.
    - [Issue #37847](https://github.com/vllm-project/vllm/issues/37847) — v0.18.0 cu128 release wheel URL 404 in docs.
- **KV-cache partitioning bugs (active tracker):** [Issue #53194](https://github.com/vllm-project/vllm/issues/53194) catalogs ~10 separate defects where a dimension fails to partition the KV-cache keyspace in some tier or path; [PR #55886](https://github.com/vllm-project/vllm/pull/55886) starts a conformance suite for `cache_salt` survival across OpenAI entrypoints.
- **Prefix-cache correctness fixes landing:**
  - [PR #52244](https://github.com/vllm-project/vllm/pull/52244) — Restores hybrid GDN prefix-cache hits under MTP spec decoding (needs rebase).
  - [PR #54998](https://github.com/vllm-project/vllm/pull/54998) — `SimpleCPUOffload` respects `skip_reading_prefix_cache` for prompt-logprob requests.
  - [PR #55674](https://github.com/vllm-project/vllm/pull/55674) — Fixes `UnboundLocalError` in Triton/ROCm cascade-attention meta builders.
  - [PR #55869](https://github.com/vllm-project/vllm/pull/55869) — Fixes `HashableDict`/`HashableList` nested-value crash in `lru_cache`.

## RFCs & Design in Flight

- **[Issue #38474](https://github.com/vllm-project/vllm/issues/38474)** — Mooncake Store Connector for shared KV cache reuse across instances (RFC).
- **[Issue #37003](https://github.com/vllm-project/vllm/issues/37003)** — Context-Aware KV-Cache Retention API (prioritized evictions for agentic workloads; llm-d tracker doc).
- **[Issue #42259](https://github.com/vllm-project/vllm/issues/42259)** — Logprobs/Logits semantics and determinism under Model Runner V2.
- **[Issue #55265](https://github.com/vllm-project/vllm/issues/55265)** — Length-aware batch composition for admission scheduling (V1); includes fairness fix proposal.
- **[Issue #54864](https://github.com/vllm-project/vllm/issues/54864)** — Truncate mode for `thinking_token_budget` (better fit for RL rollouts than current `reasoning_end_str` forcing).
- **[Issue #49569](https://github.com/vllm-project/vllm/issues/49569) / [PR #55485](https://github.com/vllm-project/vllm/pull/55485)** — Incremental MyPy rollout in `tests/` (4/N: medium-hard dirs).

## What This Means for Application Developers

- **Qwen3.8-Flash-Next-FP8 on A100 is currently broken** at startup. If you're pinned to A100, either wait for [#55884](https://github.com/vllm-project/v

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-08

## 1. Today's Highlights

No new releases in the last 24 hours, but the activity is dominated by **stability work on the newest model classes** (DeepSeek-V4, GLM-5.3-Flash, Qwen3.8-Flash-Next) and **hardware-port PRs for NPU/AMD/Intel XPU**. The most consequential engineering signal is the **Weight Cache Daemon Phase 1** landing (Qwen3-235B FP8 load 306–327s → <1s) plus a serious **DeepSeek-V4 decode hang at ~245K context** on 8×H20 that watchdog-kills the server. Expect more focused work on DSA-style models and Blackwell/NPU matrix coverage this week.

## 2. Releases & Breaking Changes

*No new releases in the last 24 hours.*

- **v0.5.18-cu130** remains the reference image in user bug reports (e.g. [#38300](https://github.com/sgl-project/sglang/issues/38300)).
- Docs cleanup: [#38497](https://github.com/sgl-project/sglang/pull/38497) removes a ghost CLI flag (`--custom-sigquit-handler`, which is a Python-only engine field) from Ascend `support_features.mdx`.

## 3. New Model & Hardware Support

- **GLM-5.2 on Ascend 950PR/DT NPU** with FP8 KV cache and MLAProlog — [#38250](https://github.com/sgl-project/sglang/pull/38250).
- **DeepSeek-V4 on NPU**: host-memory cache management ([#37382](https://github.com/sgl-project/sglang/pull/37382)), native MRoPE ([#36959](https://github.com/sgl-project/sglang/pull/36959)), and CP allgather/bmm overlap ([#38299](https://github.com/sgl-project/sglang/pull/38299)).
- **AMD DSV4 (gfx950)**: HiCache on FP8 unified attention ([#37778](https://github.com/sgl-project/sglang/pull/37778)), FP8 two-pool unified KV ([#37413](https://github.com/sgl-project/sglang/pull/37413)).
- **Intel XPU**: speculative decoding with `intel_xpu` attention backend (topk=1 only) — [#30548](https://github.com/sgl-project/sglang/pull/30548); DFLASH speculative decoding on XPU — [#32798](https://github.com/sgl-project/sglang/pull/32798).
- **VDN-H3 (MiniMax-H3 hybrid window softmax + Video Delta linear attention, 8-NFE DMD2 distill)** — new `hybrid_window_attn_h3` backend — [#37903](https://github.com/sgl-project/sglang/pull/37903).
- **GLM-5.3-Flash SM120 qualification tracker** — [#37813](https://github.com/sgl-project/sglang/issues/37813); bug umbrella — [#37524](https://github.com/sgl-project/sglang/issues/37524).
- **ROCm consumer GPU support** issue marked inactive — RDNA3 (`gfx1100`) fused-MoE blocked by upstream Triton AMD bug, see [#30245](https://github.com/sgl-project/sglang/issues/30245).

## 4. Performance & Optimization

- **Fast Engine Recovery: Weight Cache Daemon — Phase 1 shipped** ([#33522](https://github.com/sgl-project/sglang/issues/33522)). Per-rank daemon holding post-quantized weights and serving them over CUDA IPC cuts **Qwen3-235B FP8 weight load from 306–327s to <1s**. Linked LMSYS blog: 2026-08-21.
- **dLLM FDFO scheduler** to remove head-of-line blocking in `LowConfidence`-style batching — [#25280](https://github.com/sgl-project/sglang/pull/25280) (closed, may be reworked).
- **Mamba prefix-cache SSM checkpoint at correct dtype** — [#34820](https://github.com/sgl-project/sglang/pull/34820) (high priority): previously pinned to bf16 regardless of configured SSM dtype.
- **Diffusion: no-D2H component offload** via layerwise-style host store ([#36727](https://github.com/sgl-project/sglang/pull/36727)) and **file-backed fused weight copies** on shared CPU/GPU pool ([#37819](https://github.com/sgl-project/sglang/pull/37819) → [#37822](https://github.com/sgl-project/sglang/pull/37822)). Targets shared-memory/GB10-class devices.
- **DiT RoPE unification** behind `CustomOp` (NPU/diffusion) — [#33555](https://github.com/sgl-project/sglang/pull/33555).
- **Roadmap: Context Parallelism (2026 Q3)** — [#21788](https://github.com/sgl-project/sglang/issues/21788) tracks extending CP beyond prefill to decode + heterogeneous attention; high-priority, 16 👍.
- **DWDP (Distributed Weight Data Parallelism) for Sparse MoE** — [#22084](https://github.com/sgl-project/sglang/issues/22084): async point-to-point expert weight transfer, no AllReduce/AllGather on the MoE path.
- **AITER upgrade readiness tracker** — [#21302](https://github.com/sgl-project/sglang/issues/21302).
- **NVFP4 / trtllm MHA** for Gemma4 — [#26596](https://github.com/sgl-project/sglang/issues/26596) closed/inactive; most items still open.

## 5. Stability & Regressions

Ranked by severity / production reach.

1. **[CRITICAL] DeepSeek-V4 (`dsv4` + DSPARK) TP=8 on 8×H20 — decode forward hangs at ~245K context** ([#33549](https://github.com/sgl-project/sglang/issues/33549), 8 comments). All GPUs spin at 100% util / low power; watchdog kills the server. No fix PR yet.
2. **[CRITICAL] GLM-5.3-Flash + HiCache — host-tier load-back corrupts generation** ([#38031](https://github.com/sgl-project/sglang/issues/38031), 4 👍): dropped tool calls, degenerate repetition loops on 8×H100 TP8 without speculative decoding. Tracked under [#37524](https://github.com/sgl-project/sglang/issues/37524).
3. **[HIGH] GLM-5.3-Flash cannot use FP8 KV cache on SM90 (8×H20)** ([#36830](https://github.com/sgl-project/sglang/issues/36830)). `index_kpool: 4` excludes `flashmla_kv`; no CUDA DSA backend supports bf16-query × fp8-KV. Works on GLM-5.2 with identical hw/image.
4. **[HIGH] Qwen3.8-Flash-Next + `qwen3_coder` tool parser loops on token ID 0** ([#36537](https://github.com/sgl-project/sglang/issues/36537), 15 comments, high priority). Day-0 official image.
5. **[HIGH] TP2 hang with HiCache + breakable prefill CUDA graphs + FlashInfer MNNVL on B300** ([#38300](https://github.com/sgl-project/sglang/issues/38300), 3 comments). Reproduced on `sglang:v0.5.18-cu130` / FlashInfer 0.6.17.
6. **[HIGH] QSA extend forward CUDA illegal memory access at 8 concurrent requests** on Qwen3.8-Flash-Next-FP8 / H20 TP8 ([#37633](https://github.com/sgl-project/sglang/issues/37633)); suppressed under `CUDA_LAUNCH_BLOCKING=1` and `--disable-overlap-schedule`.
7. **[HIGH] GLM-5.2 FP4 + EAGLE illegal memory access** in `flashinfer_trtllm` bf16 batched-GEMM (nextn draft MoE); triton nextn path is HIP-gated after #30137 ([#30209](https://github.com/sgl-project/sglang/issues/30209)).
8. **[MEDIUM] SM10x-gated kernels break on B300 (sm_103)** — `cutedsl` TGV BF16 GEMM Xid 13 CGA "CTA Not Present" and `trtllm-gen` MoE finalize hang ([#34340](https://github.com/sgl-project/sglang/issues/34340)). Root cause: `is_sm100_supported()` is a family check (`major == 10`).
9. **[MEDIUM] FlashInfer backend not supported on Blackwell GPUs** — [#35080](https://github.com/sgl-project/sglang/issues/35080).
10. **[MEDIUM] Streaming-client disconnect → zombie request decodes to `max_tokens`** and floods "state was deleted in TokenizerManager"; **regression from the #34160 revert** — [#36333](https://github.com/sgl-project/sglang/issues/36333).
11. **[MEDIUM] DFLASH/DSPARK draft KV pool budget uses `tp_size` not `attn_tp_size`** → OOM under DP attention on Kimi-K3 — [#38202](https://github.com/sgl-project/sglang/issues/38202).
12. **[LOW] DFlash misses Mamba checkpoints across tracking boundaries** — [#37817](https://github.com/sgl-project/sglang/issues/37817).
13. **[LOW] DeepSeek-V4-Flash-Vision multi-turn tool calls wrapped in `{"arguments": {...}}`** — [#38450](https://github.com/sgl-project/sglang/issues/38450).

Closed/inactive items to note (no active fix):
- ROCm RDNA3 fused-MoE blocked ([#30245](https://github.com/sgl-project/sglang/issues/30245)).
- FP8 on-the-fly quant wrongly quantizes GDN gate projections ([#30598](https://github.com/sgl-project/sglang/issues/30598)).
- Accuracy regression from `transformers` 5.8 → 5.12.1 ([#30632](https://github.com/sgl-project/sglang/issues/30632)).
- Detokenizer worker load imbalance ([#29366](https://github.com/sgl-project/sglang/issues/29366)).
- KV-events `extra_keys` for `cache_salt` / multimodal IDs ([#27682](https://github.com/sgl-project/sglang/issues/27682)).

## 6. What This Means for Application Developers

- **Pin cautiously on the newest DSA models.** DeepSeek-V4 (dsv4 backend) and GLM-5.3-Flash both have open, high-severity bugs at meaningful production context lengths (≥245K for DSV4, mid-context for GLM-5.3). Treat them as **not GA for long-context workloads** until #33549 / #37524 close.
- **Long-context streaming needs explicit client-side cancellation.** The #34160-related zombie bug means a half-closed SSE/stream request can still burn GPU and produce a `max_tokens`-long error cascade. Always cancel from the client and add upstream timeouts.
- **GLM-5.3-Flash on H20: do not enable FP8 KV cache yet** ([#36830](https://github.com/sgl-project/sglang/issues/36830)). On H100, also avoid HiCache for this model until #38031 is resolved.
- **Prefer `modelopt_fp4` + non-FlashInfer paths on B200/B300 for EAGLE on GLM-5.2** until the `flashinfer_trtllm` nextn-MoE path in #30209 is fixed. Triton nextn is HIP-gated.
- **Wealth load times are about to drop sharply** for FP8/MoE deployments via the Weight Cache Daemon ([#33522](https://github.com/sgl-project/s

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-08

## Today's Highlights

A heavy Vulkan + backend-parity day: Vulkan finally lands the DeepSeek-V4 hyper-connection fused ops ([b10844](https://github.com/ggml-org/llama.cpp/releases/tag/b10844)) and int8 coopmat1 matmul for AMD RDNA3/4 ([#27952](https://github.com/ggml-org/llama.cpp/pull/27952)), bringing it in line with CUDA and Metal. Meanwhile, speculative decoding under quantized targets continues to surface correctness drift ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618)), and a new RFC for LTX-2 diffusion GGUF generation ([#28541](https://github.com/ggml-org/llama.cpp/issues/28541), [#28540](https://github.com/ggml-org/llama.cpp/pull/28540)) signals llama.cpp's expansion beyond LLMs.

---

## Releases & Breaking Changes

Eight b-numbers shipped in 24h, all backend-internal except the chat refactor:

- **b10856** — `chat.cpp` template parsers split into `common/parsers/*` (one file per template), mirroring the `src/models` layout. No behavior change, easier for adding new chat templates. ([PR #27764](https://github.com/ggml-org/llama.cpp/pull/27764))
- **b10855** — OpenCL backend: proper handling of non-contiguous inputs to `conv2d`. ([PR #28503](https://github.com/ggml-org/llama.cpp/pull/28503))
- **b10853** — Model: Kimi-K3 recurrent-state rollback support. ([PR #28466](https://github.com/ggml-org/llama.cpp/pull/28466))
- **b10852** — Hexagon backend: add `RELU` and `LEAKY_RELU` ops. ([PR #28585](https://github.com/ggml-org/llama.cpp/pull/28585))
- **b10850** — Tests: bind `L2_NORM` batch count to a local to silence GCC maybe-uninit warning.
- **b10844** — Vulkan: add `DSV4_HC_COMB/PRE/POST` fused ops (backfills parity with CUDA/Metal). ([PR #26578](https://github.com/ggml-org/llama.cpp/pull/26578))
- **b10842** — ggml: HIP support for gfx90c (Radeon APUs). ([PR #26454](https://github.com/ggml-org/llama.cpp/pull/26454))
- **b10840** — CUDA: branchless Q4_K/Q5_K unpack in mmvq + L2 prefetch on DGX Spark; perf win at batch > 1, gated off from DGX Spark for now. ([PR #26705](https://github.com/ggml-org/llama.cpp/pull/26705))

No API/config breakage. macOS arm64 and website artifacts (`llama.app`) continue to ship with each build.

---

## New Model & Hardware Support

- **DeepSeek-V4 hyper-connection** — fully fused across CUDA, Metal, and now Vulkan ([b10844](https://github.com/ggml-org/llama.cpp/releases/tag/b10844)).
- **Kimi-K3** — recurrent-state rollback support added ([b10853](https://github.com/ggml-org/llama.cpp/releases/tag/b10853)).
- **AMD gfx90c** — HIP backend gains support ([b10842](https://github.com/ggml-org/llama.cpp/releases/tag/b10842)).
- **AMD gfx1201 (RDNA4, R9700)** — Flash Attention tuning WIP ([#28102](https://github.com/ggml-org/llama.cpp/pull/28102)), targeting prefill perf for Qwen3.8 27B.
- **NVFP4 W4A8 on Blackwell** — PR [#24364](https://github.com/ggml-org/llama.cpp/pull/24364) forces W4A8 for NVFP4_W4A16 layers; new GGUF metadata for output weight.
- **GLM5.3 (flash)** — open feature request ([#27922](https://github.com/ggml-org/llama.cpp/issues/27922), 👍 13).
- **LTX-2.3 diffusion GGUF** — RFC + draft for image/video/audio generation server ([#28541](https://github.com/ggml-org/llama.cpp/issues/28541), [#28540](https://github.com/ggml-org/llama.cpp/pull/28540)). Would serve OpenAI-compatible `/v1/images/generations`.
- **Adaptive MTP draft depth** — new `--spec-type draft-mtp-adaptive` ([#27210](https://github.com/ggml-org/llama.cpp/pull/27210), suggested with `--spec-draft-n-max 12`).
- **Metal MiniCPM3** — automatic flash-attention selection crashed on `(dk, dv)=(96, 64)`; fix in [#28599](https://github.com/ggml-org/llama.cpp/pull/28599).
- **qwen4exp `-sm tensor`** — re-enabled after a scheduler placement abort on Meta device ([#28569](https://github.com/ggml-org/llama.cpp/pull/28569)).

---

## Performance & Optimization

- **CPU mul_mat for k-quants (proposed):** [#27851](https://github.com/ggml-org/llama.cpp/pull/27851) — generic tiled mul_mat over 256×256 int8 windows using VNNI, claims **3–7× faster CPU k-quant matmul**.
- **Vulkan int8 coopmat1 (proposed):** [#27952](https://github.com/ggml-org/llama.cpp/pull/27952) — new MMQ cm1 shader for q4_0/q4_1/q5_0/q5_1/q8_0/q3_k/q4_k/q5_k/q6_k/mxfp4/nvfp4/iq4_nl on RDNA3/4; large Strix Halo prefill wins reported.
- **CUDA Q4_K/Q5_K mmvq:** branchless unpack stops scale re-execution per column → faster at batch > 1 ([b10840](https://github.com/ggml-org/llama.cpp/releases/tag/b10840)).
- **Vulkan Intel coopmat1:** f16 B-type pipelines + warp-tile tuning for Xe1-ARL_H ([#27471](https://github.com/ggml-org/llama.cpp/pull/27471)).
- **Metal fa-vec tunings landed:**
  - M3 Max, M5, M5 Pro tuning rows merged ([#27863](https://github.com/ggml-org/llama.cpp/pull/27863)).
  - M5 Max F16 D=512 decode tuned `{1,4}→{1,2}` (NE2 wins, ~269.5 vs 314/315) ([#28534](https://github.com/ggml-org/llama.cpp/pull/28534)).
- **Vulkan suballocation:** fixing the **~78% decode cliff at 131k context** with `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` ([#27734](https://github.com/ggml-org/llama.cpp/issues/27734)).
- **Server scheduling:** [#28532](https://github.com/ggml-org/llama.cpp/pull/28532) prioritizes existing sessions over queued ones to reduce KV-swap churn.
- **Vulkan lazy-mode regression:** `qwen4exp` pp512 halved on AMD iGPU after lazy-mode changes; refactor PR [#28326](https://github.com/ggml-org/llama.cpp/pull/28326) makes `auto` mean "pick a good mode" and moves old `auto` to `large`.

---

## Stability & Regressions

Ranked by severity / blast radius:

1. **Speculative decoding divergence on quantized targets** ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618), 22 comments) — greedy `temperature=0` output diverges from vanilla when **target is Q4_K_M**; ngram spec is fine, bf16 target is fine. Suggests draft-mtp/draft-dspark mismatch in target quantization handling. **Open, no fix PR yet.**

2. **RTX 5090 display loss / GSP reset** ([#27910](https://github.com/ggml-org/llama.cpp/issues/27910)) — running Qwen3.8-27B Q6_K on RTX 5090/Linux can black-screen the entire display; only reboot recovers. **Open, no fix PR yet.**

3. **CUDA illegal memory access on flash-attn path** ([#26609](https://github.com/ggml-org/llama.cpp/issues/26609)) — deterministic crash on `cudaStreamSynchronize` with Qwen3.6-35B MoE + partial expert offload; reproducible across b10107 / b10243; disappears with `-fa off`. **Open, no fix PR yet.**

4. **Vulkan DeviceLost at ~50K context on Vega 8 iGPU** ([#26447](https://github.com/ggml-org/llama.cpp/issues/26447), 12 comments) — `vk::Queue::submit: ErrorDeviceLost` with smaller models surviving longer. **Open.**

5. **Blackwell GGML-CUDA SOFT_MAX crash** ([#25060](https://github.com/ggml-org/llama.cpp/issues/25060)) — 35B models on RTX 5090 / CUDA 13.3 / Driver 580.17. **Open, no fix PR yet.**

6. **draft-mtp DeviceLost mid-prompt on AMD RADV gfx1151** ([#27306](https://github.com/ggml-org/llama.cpp/issues/27306)) — `common_speculative_process` calls `llama_decode(ctx_dft)` after every prefill ubatch; tens-of-thousands tokens in. **Open.**

7. **Vulkan GGML_ASSERT on Intel Arc A770** ([#28247](https://github.com/ggml-org/llama.cpp/issues/28247)) — `wg0 > ctx->device->properties.limits.maxComputeWorkGroupCount` running Qwen 3.8 flash next. **Open.**

8. **SYCL/OpenCL P2P on multi-GPU Arc** ([#27168](https://github.com/ggml-org/llama.cpp/issues/27168)) — `ur_die 'Experimental P2P feature is not implemented for OpenCL adapter'` on dev2dev memcpy. **Open.**

9. **HIP/ROCm gfx1151 wrong logits (silent)** ([#28211](https://github.com/ggml-org/llama.cpp/issues/28211)) — **no crash**, just wrong outputs when prompt > n_ubatch on Strix Halo. Particularly dangerous — pure correctness bug.

10. **`ggml_gallocr` silent reuse of stale plan** ([#28448](https://github.com/ggml-org/llama.cpp/issues/28448)) — `needs_realloc()` returns false when a node at the same graph position changes identity; corrupts sparse-MoE outputs. **Open, no fix PR yet.**

11. **Server "model loaded" before fatal init OOM** ([#27309](https://github.com/ggml-org/llama.cpp/issues/27309)) — Metal OOM during init still binds the port; every request 500s. **Open.**

12. **IQ3_S garbage on RTX 5060 Ti 16GB** ([#28581](https://github.com/ggml-org/llama.cpp/issues/28581)) — Blackwell-specific quant correctness regression. **Open.**

13. **Parallel tool_calls mangled/hang on Qwen + ~48-param tools** ([#28522](https://github.com/ggml-org/llama.cpp/issues/28522)) — affects agentic workloads using OpenAI-compatible tool calls.

14. **Closed (stale)**: SYCL garbage on second prompt ([#26845](https://github.com/ggml-org/llama.cpp/issues/26845)), Vulkan Strix Halo regression b9660→b9672 ([#24734](https://github.com/ggml-org/llama.cpp/issues/24734)), cublasSgemm_v2 large-context error ([#25061](https://github.com/ggml-org/llama.cpp/issues/25061)), stale `tools/ui/dist` blocking headless builds ([#25443](https://github.com/ggml-org/llama.cpp/issues/25443)), multi-batch decode perf ([#25804](https://github.com/ggml-org/llama.cpp/issues/25804)).

---

## What This Means for Application Developers

- **Treat speculative decoding as unsafe on quantized targets until #25618 is resolved.** If your agent pipeline relies on `draft-mtp` or `draft-dspark` for latency, run a golden-output smoke test against a non-speculative baseline on the exact quantized target. Ngram spec is the safer fallback for now.
- **Long-context (>50K) on iGPU/Vulkan is not yet robust.** Two separate `ErrorDeviceLost` reports (Vega 8 iGPU, RADV gfx1151) and the 131k-context cliff on RDNA3 ([#27734](https://github.com/ggml-org/llama.cpp/issues/27734)) mean production long-context servers should pin to `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` on RDNA3 and avoid Vulkan for very long contexts on iGPUs until fixes land. CUDA Blackwell long-context has its own instability ([#27910](https://github.com/ggml-org/llama.cpp/issues/27910)) — pin to a known-good build or disable `-fa`.
- **Track your build number carefully.** Eight b-numbers in 24h means rolling artifacts is fine but the moving target is real; the regression PRs (lazy-mode iGPU [#28326](https://github.com/ggml-org/llama.cpp/pull/28326), MiniCPM3 FA [#28599](https://github.com/ggml-org/llama.cpp/pull/28599)) each fix a specific model/arch — CI matrix per model is increasingly necessary.
- **Vulkan is becoming a first-class backend for AMD.** RDNA3/4 int8 coopmat1 ([#27952](https://github.com/ggml-org/llama.cpp/pull/27952)) plus DeepSeek-V4 fused ops ([b10844](https://github.com/ggml-org/llama.cpp/releases/tag/b10844)) close the gap with CUDA/Metal. If you ship on Strix Halo or RDNA3 dGPUs, re-benchmark — but watch for the open flash-attn fallback regression on ANV ([#27638](https://github.com/ggml-org/llama.cpp/issues/27638)) and the `maxComputeWorkGroupCount` assert on Arc ([#28247](https://github.com/ggml-org/llama.cpp/issues/28247)).
- **Server scheduling is shifting toward throughput over latency** ([#28532](https://github.com/ggml-org/llama.cpp/pull/28532)). If you have strict per-request SLOs, validate the new behavior against your concurrency patterns before deploying.
- **LTX-2 image/video/audio diffusion GGUF serving is being prototyped** ([#28540](https://github.com/ggml-org/llama.cpp/pull/28540)). Single binary, OpenAI-compatible `/v1/images/generations` — relevant if you're consolidating inference infrastructure.
- **Metal multi-GPU on Intel Macs** is an open feature request ([#28565](https://github.com/ggml-org/llama.cpp/issues/28565)) — if you target eGPU + dGPU Apple setups, watch that thread.
- **Tool-calling reliability** — parallel tool_calls on Qwen with many optional params is broken ([#28522](

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-08

## Today's Highlights
Ollama had a quiet release day but a very active development cycle focused on **Responses API parity** with OpenAI and **Gemma 4 parser hardening**. The cluster of issues #17778, #18186, #18252, and #18297, combined with the regression in #18225 (0.33.x ~5× slower than 0.32.13 on CUDA), suggests the 0.33.x line is still stabilizing around `qwen3.8` and multi-modal/quantized workflows. Multiple bug-fix PRs already exist for the OpenAI-compat surface area (#18298, #18296, #18315, #18309) — application developers on `/v1/responses` should track these.

## Releases & Breaking Changes
No new releases in the last 24h.

## New Model & Hardware Support
- **Gemma 4 parser work** — three open PRs from `mann1x` and `lorenzozanee` close parser gaps:
  - [#18299](https://github.com/ollama/ollama/pull/18299) parses `call:<name>:` + `BEGIN_ARG`/`END_ARG` tool calls (malformed channel markers now surface as parser errors).
  - [#18307](https://github.com/ollama/ollama/pull/18307) fixes the asymmetry where a tool call can open before the thinking channel closes.
  - [#17626](https://github.com/ollama/ollama/pull/17626) stops the sampler from echoing the `thought\n` header that the parser had stripped.
- **Native generate thinking** — [#18300](https://github.com/ollama/ollama/pull/18300) initializes the thinking parser for native `/api/generate` when a Jinja template lacks Go-template delimiters (fixes [#18221](https://github.com/ollama/ollama/issues/18221)).
- **Long HF repo names / GGUF filenames** — [#18301](https://github.com/ollama/ollama/pull/18301) raises the maximum part length from 80 to 255 characters (fixes [#18274](https://github.com/ollama/ollama/issues/18274)).
- **Model requests** (community, not yet merged):
  - [#18287](https://github.com/ollama/ollama/issues/18287) Hy4 preview (Tencent).
  - [#18290](https://github.com/ollama/ollama/issues/18290) Spark-X2.5 4B/1.7B (iFlytek).
- **Quantization gap** — [#18297](https://github.com/ollama/ollama/issues/18297) reports `IQ3_S` on `Qwen3.8-27B-GSQ-RCO-GGUF` finishes with `done_reason: "stop"` but emits empty content; no fix PR yet.
- **Hardware allocation feature request** — [#18185](https://github.com/ollama/ollama/issues/18185) asks for explicit GPU/CPU layer pinning per model when VRAM is partially occupied.

## Performance & Optimization
- **MTP + tensor split fix** — [#18302](https://github.com/ollama/ollama/pull/18302) skips `--spec-draft-backend-sampling` when `SPLIT_MODE_TENSOR` is set; llama.cpp rejects backend sampling under tensor sharding, so the current behavior silently breaks speculative decoding on multi-GPU setups.
- **CUDA regression in 0.33.x** — [#18225](https://github.com/ollama/ollama/issues/18225): RTX 3090 / GA102, `qwen3:8b` runs ~5× slower on 0.33.2 vs. 0.32.13 with identical model file. No bisect or workaround posted yet; worth pinning to 0.32.x for production CUDA workloads until this is closed.
- **Scheduler thrash** — [#18129](https://github.com/ollama/ollama/issues/18129): on Windows 11 / RX 9070 XT, the scheduler spontaneously restarts `llama-server` with the default 4096 context immediately after a successful load, forcing a redundant reload on the next request.
- **MTP-induced CPU offload** — [#18186](https://github.com/ollama/ollama/issues/18186): enabling MTP for `qwen3.8:27b` on a 32 GB RTX 5090 pushes layers to CPU and tanks throughput.
- **CPU fallback on sm_86 GPUs** — [#17841](https://github.com/ollama/ollama/issues/17841): 0.32.14 on Windows / RTX A6000 / driver R576 silently routes inference to CPU (~7 tok/s); closes with a fix.

## Stability & Regressions
Ranked by likelihood to bite production users.

1. **[#17778](https://github.com/ollama/ollama/issues/17778) — `qwen3.8` chat streaming 500** *(Open, 25 comments, 23 👍)*
   `Error: ResponseError during chat streaming: no user query found in messages` while the model is mid tool-call loop. No fix PR.
2. **[#18252](https://github.com/ollama/ollama/issues/18252) — `qwen2.5-coder:3b-instruct` low-bit quants broken**
   `q2_K`, `q3_K_S`, `q3_K_M`, `q3_K_L` produce fluent but non-functional output (0/15 on a basic HumanEval+ smoke suite; sibling quants score 87–100%). Library artifact issue, no fix yet.
3. **[#17910](https://github.com/ollama/ollama/issues/17910) — Long-completion regression in 0.32.11–0.32.15**
   Generation runs past any natural stop until killed; 0.32.9 unaffected. Mac Studio M1 Max / Tahoe. Confirms a known-bad window if you're on 0.32.11+ but pre-0.33.
4. **[#18208](https://github.com/ollama/ollama/issue/18208) — Long-lived runner emits `<unused49>` tokens**
   With `keep_alive -1`, after loading a second model and returning to the first, output is corrupted with placeholder tokens until the runner is fully stopped and reloaded. GMKtec EVO-X2 / Ryzen AI Max+ 395.
5. **[#18210](https://github.com/ollama/ollama/issues/18210) — Security: `OLLAMA_DEBUG_LOG_REQUESTS` retains full prompts**
   Persists complete request bodies (system prompts, tool defs, RAG snippets) to a temp dir with no retention/rotation/redaction. Treated as a security ticket and now closed; if you enabled this for debugging, scrub `/tmp` and rotate now.
6. **[#18305](https://github.com/ollama/ollama/issues/18305) — `/v1/responses` silently drops `developer` items**
   Returns `200` / `"status: completed"` with no error; content never reaches the model. Partially addressed upstream by [#18315](https://github.com/ollama/ollama/pull/18315) (normalize developer→system in Go templates), but the `/v1/responses` path is still being patched.
7. **[#18286](https://github.com/ollama/ollama/issues/18286) — `/v1/responses` rejects `agent_message` items**
   Codex-style spawned-agent tasks get `400 invalid_request_error: unknown input item type`. Fixed in-flight by [#18298](https://github.com/ollama/ollama/pull/18298).
8. **[#17782](https://github.com/ollama/ollama/issues/17782) — ROCm: `qwen3.8:27b` fails with `TensileLibrary_lazy_gfx1200.dat`** (RX 9060 XT 16 GB). Open, 0 👍.
9. **Closed regressions worth noting:**
   - [#16547](https://github.com/ollama/ollama/issues/16547) `unknown model architecture: 'mllama'` for Llama3.2-Vision.
   - [#17841](https://github.com/ollama/ollama/issues/17841) CPU fallback on sm_86 GPUs.
   - [#17870](https://github.com/ollama/ollama/issues/17870) Vulkan `ErrorDeviceLost` on gfx1151 (Strix Halo) under long prefill.
   - [#17832](https://github.com/ollama/ollama/issues/17832) `CUDA_VISIBLE_DEVICES` ignored on 3×H200 / 0.32.14.
   - [#17860](https://github.com/ollama/ollama/issues/17860) `install.sh` fails silently on fresh Ubuntu 26.04 without `zstd`.

## What This Means for Application Developers
- **Pin 0.32.13 (or wait for 0.33.3+) if you rely on CUDA throughput on RTX 30/40-series.** The 5× regression in [#18225](https://github.com/ollama/ollama/issues/18225) and the stop-token regression [#17910](https://github.com/ollama/ollama/issues/17910) in 0.32.11–0.32.15 bracket 0.32.x in a bad window. Avoid 0.32.11–0.32.15 for long completions or large CUDA fleets.
- **Avoid the low-bit `qwen2.5-coder:3b-instruct` quants** (`q2_K`, `q3_K_S/M/L`) — [#18252](https://github.com/ollama/ollama/issues/18252) shows silent total functional failure. Stay on `q4_K_M` or higher until the library artifacts are republished.
- **Don't enable `OLLAMA_DEBUG_LOG_REQUESTS` in any environment that touches user prompts.** [#18210](https://github.com/ollama/ollama/issues/18210) confirms full request bodies are written and persisted; this should never be on in production.
- **If you build against the OpenAI Responses API**, expect three behavior changes landing soon: developer-role items get folded into system ([#18315](https://github.com/ollama/ollama/pull/18315)), `agent_message` is accepted ([#18298](https://github.com/ollama/ollama/pull/18298)), and tool-search call IDs switch to the `tsc_` prefix ([#18296](https://github.com/ollama/ollama/pull/18296)). If you swap models between Ollama and OpenAI in the same Codex conversation, the `ts_` → `tsc_` change matters today.
- **MTP / speculative decoding** has rough edges across the stack: CPU offload on a single 5090 ([#18186](https://github.com/ollama/ollama/issues/18186)) and tensor-split incompatibility ([#18302](https://github.com/ollama/ollama/pull/18302)). Treat MTP as experimental across multi-GPU and constrained-VRAM setups.
- **Long-running runners on AMD APUs** can corrupt output after loading a second model — [#18208](https://github.com/ollama/ollama/issues/18208). If you fan out to multiple models on Strix Halo / Ryzen AI Max, restart the runner between models or use short `keep_alive` windows.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-08

## 1. Today's Highlights

Security disclosure dominates the news cycle: two issues (#40217, #39757) detail how LiteLLM's 401/403 responses leak key hashes, SHA-256 fingerprints, backend identity, and DB table names to unauthenticated callers — fix #40231 is already open. On the feature side, the Anthropic story deepens with auto-injected `context-1m` beta headers and reasoning-effort translation (#40239, #40240, #40241), and xAI/Grok gets multi-account OAuth failover plus Imagine image/video support (#40238, #40242).

## 2. Releases & Breaking Changes

No new releases in the last 24 hours. Worth noting from open work:

- **#40240 — `thinking` / `reasoning_effort` translation from `model_info`**: this is a behavior change for SDK users who previously had to hand-map provider-specific shapes. Plan to audit `model_info` blocks in `config.yaml` before upgrading.
- **#40028 — stop advertising `zstd` on upstream requests**: proxy clients will no longer request zstd compression from providers. Users in OCI/streaming-heavy environments should retest.
- **#31611 (closed)** was superseded by #40239 (context-1m beta header); the new branch is the canonical implementation.

## 3. New Model & Hardware Support

- **#37134 — Xinference rerank support** (sync + async): closes a long-standing gap for self-hosted rerankers. [PR #37134](https://github.com/BerriAI/litellm/pull/37134)
- **#40238 — xAI Grok Imagine image generation/edit and video jobs** plus data-URI acceptance for image edit. [PR #40238](https://github.com/BerriAI/litellm/pull/40238)
- **#40242 — xAI multi-account SuperGrok OAuth with automatic failover** (spending-limit 403 → `RateLimitError`). [PR #40242](https://github.com/BerriAI/litellm/pull/40242)
- **#40239 — Anthropic `[1m]` model-suffix auto-injects `context-1m` beta header**. [PR #40239](https://github.com/BerriAI/litellm/pull/40239)
- **#36150 — QwenCloud migration path for DashScope provider** (open feature request from QianWen AI). [Issue #36150](https://github.com/BerriAI/litellm/issues/36150)
- **#40243 — typed `response.failed` events for Responses streaming** (lossless error reporting). [PR #40243](https://github.com/BerriAI/litellm/pull/40243)

## 4. Performance & Optimization

- **#40236 — kwargs sort before cache-key build** (fixes #40128): previously, identical requests with reordered parameters produced different cache hashes and never hit cache. Net effect is a meaningful cache-hit uplift for clients that vary dict ordering across calls. [PR #40236](https://github.com/BerriAI/litellm/pull/40236)
- **#40233 — spend counter cache capacity raised to 10,000 entries** (from default 200). Eviction-before-TTL was silently dropping active budget counters; a regression test covers 300 concurrent budget scopes. [PR #40233](https://github.com/BerriAI/litellm/pull/40233)
- **#40229 — per-request `routing_strategy` override selectors no longer leak into `litellm.callbacks`**. Under `usage-based-routing-v2` this was causing phantom rpm-429s on unrelated requests. [PR #40229](https://github.com/BerriAI/litellm/pull/40229)
- **#40028 — zstd disabled on outgoing requests** to preserve per-event SSE framing (avoids `cannot use a decompressobj multiple times` 500s in OCI and any zstd-per-frame provider). [PR #40028](https://github.com/BerriAI/litellm/pull/40028)
- **#40209 — resolve `max_tokens` to the chosen tier model's ceiling after auto-routing**: prevents starvation (Haiku-sized budget on Sonnet thinking) and Haiku rejection that triggers needless Sonnet fallback. [PR #40209](https://github.com/BerriAI/litellm/pull/40209)

## 5. Stability & Regressions

Ranked by severity and impact:

- **HIGH · Security: 401/403 information disclosure** — #40217 reports that 401 responses echo the stored key hash and 403 responses reveal the full model allowlist. #39757 reports the wrong-key 401 also leaks backend identity, DB table name, and SHA-256 of the submitted key. **Fix already open: #40231** (omits hash from `user_api_key_auth.py`, omits `models=` from `auth_checks.py`). [Issue #40217](https://github.com/BerriAI/litellm/issues/40217) · [Issue #39757](https://github.com/BerriAI/litellm/issues/39757) · [PR #40231](https://github.com/BerriAI/litellm/pull/40231)
- **HIGH · Streaming tool-call data loss (OpenAI Responses / Codex)** — #39796: streaming re-chunker drops `tool_calls[].id` and `function.name` when upstream sends a full tool call in one delta. #27144: Codex Responses streaming drops function-call args when emitted via `response.function_call_arguments.done`. **Fix open: #40232** (one-line `has_tool_calls` fix for Codex). [Issue #39796](https://github.com/BerriAI/litellm/issues/39796) · [Issue #27144](https://github.com/BerriAI/litellm/issues/27144) · [PR #40232](https://github.com/BerriAI/litellm/pull/40232)
- **HIGH · v1.91.0 regression on multi-turn tool use (vLLM/Kimi K2.7)** — #32214: `sanitize_tool_use_ids_in_anthropic_messages` breaks Anthropic-format pass-through to vLLM Kimi K2.7. Fix not yet attached. [Issue #32214](https://github.com/BerriAI/litellm/issues/32214)
- **HIGH · OpenAI reasoning-model prompt-cache bridge failure** — #39339: prompt cache never carries forward through `/v1/messages` → Responses API bridge; `encrypted_content` is dropped even after #37953. No fix yet. [Issue #39339](https://github.com/BerriAI/litellm/issues/39339)
- **HIGH · Rate limiter double-counting team per-model limits** — #34140: `model_rpm_limit` per team is enforced at half the configured value (v3 limiter). No fix yet. [Issue #34140](https://github.com/BerriAI/litellm/issues/34140)
- **MEDIUM · Bedrock `/v1/files` cleanup broken** — #39715: `DELETE /v1/files/{file_id}` returns 500 "BedrockFilesConfig does not support file deletion". **Fix open: #40235** for the underlying `getattr(e, "type", "None")` pattern; the Bedrock-specific gap remains. [Issue #39715](https://github.com/BerriAI/litellm/issues/39715) · [PR #40235](https://github.com/BerriAI/litellm/pull/40235)
- **MEDIUM · Bedrock reasoning_effort silently dropped for Qwen3** — #34105: only Anthropic, Nova 2, and gpt-oss models propagate `reasoning_effort`. No fix yet. [Issue #34105](https://github.com/BerriAI/litellm/issues/34105)
- **MEDIUM · `token_counter` 500s on `input_audio`** — #38459: OpenAI multimodal audio blocks are not handled in `/utils/token_counter`, so pre-call context-window and cache checks silently skip. No fix yet. [Issue #38459](https://github.com/BerriAI/litellm/issues/38459)
- **MEDIUM · Azure Entra Redis auth blocks cluster-mode startup** — #37726: `init_redis_cluster` has no credential-provider path. No fix yet. [Issue #37726](https://github.com/BerriAI/litellm/issues/37726)
- **MEDIUM · Concurrent unknown end-user requests bypass default budget** — #40095: race condition with `max_end_user_budget_id` under custom auth. No fix yet. [Issue #40095](https://github.com/BerriAI/litellm/issues/40095)
- **MEDIUM · Anthropic `/v1/messages` silently drops `role:"system"` inside `messages[]`** — #36917. No fix yet. [Issue #36917](https://github.com/BerriAI/litellm/issues/36917)
- **MEDIUM · Complexity auto-router crosses model groups with encrypted content** — #40237 (new today): `/v1/responses` follow-ups get `reasoning.encrypted_content` from a different tier model. No fix yet. [Issue #40237](https://github.com/BerriAI/litellm/issues/40237)
- **LOW · Bedrock/Vertex AI S3 log filenames are URI-unsafe** — #40234 (new today): cloud-storage URI file IDs aren't sanitised for log file paths. No fix yet. [Issue #40234](https://github.com/BerriAI/litellm/issues/40234)
- **LOW · Custom redaction tags ignored since v1.87.1** — #30008: `keyword_redaction_tag`/`pattern_redaction_format` no longer applied. [Issue #30008](https://github.com/BerriAI/litellm/issues/30008)
- **OPEN with broad impact · OpenCode Go `x-opencode-session` header** — #39503: starting 09/05, OpenCode Go (635 LiteLLM-using orgs) requires this header for routing; LiteLLM doesn't send one. 42 👍. Affects users of `litellm/1.98.0`. [Issue #39503](https://github.com/BerriAI/litellm/issues/39503)

## 6. What This Means for Application Developers

- **If you operate a public-facing LiteLLM proxy, prioritize upgrading once #40231 lands.** Until then, an unauthenticated probe can extract stored key hashes and your entire model allowlist — treat the proxy as if it leaks route inventory to the internet.
- **Anthropic `[1m]` suffix users** get native 1M-context beta-header support out-of-the-box with #40239; no header plumbing required on the client.
- **Auto-router (complexity) users**: review #40209 and #40237 before the next bump. `max_tokens` will be re-resolved to the tier model's ceiling post-routing, and you may see fewer cross-tier encrypted-content mismatches.
- **Cache-hit-sensitive workloads** should benefit noticeably from #40236 if your client ever varies kwarg ordering (it almost certainly does).
- **Streaming agents on Responses / Codex**: confirm whether #40232 is in your pinned version before shipping tool-calling agents — tool calls silently disappearing mid-stream is a debugging nightmare.
- **OpenCode Go customers** must track #39503 — after 09/05, requests without the session header error on the provider side. A workaround will be needed until LiteLLM emits the header.
- **xAI / Grok power users** with multi-account OAuth can now get automatic failover (#40242), and Grok Imagine image/video is reachable from the SDK (#40238) — useful for media-generating agents.
- **Spend-counter / budget observability** gets more headroom with #40233 (10k cache entries), reducing eviction-driven budget drift on busy proxies.
- **Self-hosted rerank** users on Xinference finally have a first-class path via #37134.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-08

## 1. Today's Highlights

No releases shipped in the last 24h; activity is concentrated in Studio security hardening and hardware-stack robustness. The headline items are a fix for two HIGH-severity prompt-injection-to-RCE paths in Studio's tool-call parsing ([#6967](https://github.com/unslothai/unsloth/pull/6967)), a shift from seeded admin passwords to one-time setup tokens ([#10387](https://github.com/unslothai/unsloth/pull/10387)), and multi-user per-account isolation for shared Studio/desktop installs ([#10375](https://github.com/unslothai/unsloth/pull/10375)). A large batch of AMD/ROCm detection and installer work also landed in review ([#10473](https://github.com/unslothai/unsloth/pull/10473), [#10474](https://github.com/unslothai/unsloth/pull/10474), [#10490](https://github.com/unslothai/unsloth/pull/10490)).

## 2. Releases & Breaking Changes

None in the last 24h. Baseline remains the February-2026 tag (trl 0.27.1, transformers 5.1.0); the TRL version-bump complaint [#4190](https://github.com/unslothai/unsloth/issues/4190) was closed today, suggesting pin coverage has caught up.

## 3. New Model & Hardware Support

- **DoRA on Apple Silicon** — closed today. The MLX backend now builds DoRA wrappers (via unsloth-zoo#954), and Studio's blanket `NotImplementedError` for `use_dora` is removed. [#7508](https://github.com/unslothai/unsloth/pull/7508)
- **Windows on ARM / NVIDIA GB10 & N1X** — installs the native ARM64 CUDA stack instead of treating ARM64 hosts as GPU-less; unblocks RTX Spark-class laptops. [#10282](https://github.com/unslothai/unsloth/pull/10282)
- **Mixed NVIDIA+AMD hosts** — installers currently return early on `nvidia-smi` success; this adds an explicit opt-in for the ROCm torch stack on dual-vendor boxes. [#10474](https://github.com/unslothai/unsloth/pull/10474)
- **GDN kernels vendored** — Studio stops installing `flash-linear-attention`, `fla-core`, `tilelang`, and `apache-tvm-ffi` for Qwen3.5/Qwen3.6/Qwen3-Next training; unsloth_zoo now ships the gated-delta-net kernels directly. [#10487](https://github.com/unslothai/unsloth/pull/10487)
- **Docker docs corrected** — arm64 images carry no xformers (no cu128 aarch64 wheel); GB10 runs via PTX. [#10492](https://github.com/unslothai/unsloth/pull/10492)
- The Qwen3-omni TTS voice-cloning request [#3636](https://github.com/unslothai/unsloth/issues/3636) was closed; no merged support is visible in today's data.

## 4. Performance & Optimization

- **KV preemption rework** (in review, stacked): one `llama-server` with `--parallel N --kv-unified` lets N slots share one KV pool; paired llama.cpp work (`--preempt-ram`, unslothai/llama.cpp#184/#190) moves slot parking into the server itself, so Studio stands down its own preemption and every chat can use the full context window instead of chats evicting each other. [#10301](https://github.com/unslothai/unsloth/pull/10301), [#10358](https://github.com/unslothai/unsloth/pull/10358)
- **Install/startup trimming** — dropping the FLA/tilelang/tvm-ffi install step (see #10487) cuts training-worker setup time and dependency surface for Qwen3-Next-family runs.
- **Import-time fix confirmed closed** — the 60s-vs-5s entry-point import regression (root cause in `PatchFastRL`) is resolved. [#1859](https://github.com/unslothai/unsloth/issues/1859)
- **Counter-examples (open)**: on ROCm, models reportedly park in system RAM despite "No RAM offload" being checked [#10341](https://github.com/unslothai/unsloth/issues/10341), and Wan2.2 TI2V OOM from SDPA math fallback on RX 9060 XT was closed [#10415](https://github.com/unslothai/unsloth/issues/10415).

## 5. Stability & Regressions

1. **HIGH — prompt injection → RCE (fix in review):** markerless tool-call parsers promoted bare `call:NAME{...}` / `NAME[ARGS]{json}` / `{"name":...}` from anywhere in assistant text into real tool calls; #6967 blocks markerless execution-class promotion. Treat as unpatched until merged. [#6967](https://github.com/unslothai/unsloth/pull/6967)
2. **CI red on Windows:** `test_a_non_ascii_marker_survives_the_rollback` fails on `parity (windows-latest)` in both shells (2 failed / 670 passed / 9 skipped); pre-existing since #10386, now tracked. [#10460](https://github.com/unslothai/unsloth/issues/10460)
3. **AMD GPU detection broken by latest llama.cpp build** (gfx1201, 2×ROCm) — still open. [#7485](https://github.com/unslothai/unsloth/issues/7485)
4. **ROCm Studio cluster (v0.1.806-beta, llama.cpp b10798, W7900/W7500):** model-unload error [#10339](https://github.com/unslothai/unsloth/issues/10339), unwanted RAM residency [#10341](https://github.com/unslothai/unsloth/issues/10341), token counting broken [#10337](https://github.com/unslothai/unsloth/issues/10337), and Switch Back reloading at 4096 context [#10338](https://github.com/unslothai/unsloth/issues/10338) — fix PR exists for the latter: [#10447](https://github.com/unslothai/unsloth/pull/10447).
5. **Prompt queue wiped on stop** — fix in review: Stop now pauses rather than deleting the queued run. [#10428](https://github.com/unslothai/unsloth/issues/10428) → [#10445](https://github.com/unslothai/unsloth/pull/10445)
6. **Windows code-integrity blocks:** Smart App Control flags `llama-server.exe` as "Bad Image"; PR adds a probe plus CI bundle-signature audits. [#10408](https://github.com/unslothai/unsloth/pull/10408). Related ACL-on-admin-install bug closed: [#4846](https://github.com/unslothai/unsloth/issues/4846)
7. **Toolchain pinning hazard (tracked):** Linux "final torch repair" can swap the accelerator family without re-pinning torchao; #10490 pins the accelerator index with a starvation fallback. [#10493](https://github.com/unslothai/unsloth/issues/10493) → [#10490](https://github.com/unslothai/unsloth/pull/10490)

## 6. What This Means for Application Developers

- **Treat Studio as unhardened until #6967 and #10387 merge.** Don't feed untrusted web/document content into tool-enabled chats, and don't expose `unsloth studio -H 0.0.0.0` without a tunnel — #10485 extends the password gate to raw binds, but until then that path is ungated. Plan to rotate the seeded admin password once the one-time-token flow ships.
- **Attachments can vanish silently** on `/v1/responses` (files/images dropped with a success response); #10261 will surface errors, but until then validate attachments client-side. [#10261](https://github.com/unslothai/unsloth/pull/10261)
- **Concurrency semantics are changing:** once #10301/#10358 land, parallel chats share one unified KV cache with server-side slot parking — better multi-session throughput per GPU, but memory profile under load will differ; re-benchmark.
- **Agentic behavior quirk:** models (e.g., Qwen 3.8 Flash Next) may self-ration tool calls after ~20 invocations even with caps disabled [#10479](https://github.com/unslothai/unsloth/issues/10479) — watch prompt-injected "budget" framing in system defaults.
- **AMD operators:** check `/dev/kfd` and `renderD*` group permissions before filing "no GPU" bugs — #10473 will name unopenable device nodes instead of misreporting; dual-vendor hosts get an explicit ROCm opt-in via #10474.
- **Ops notes:** the empty-bearer keyless-auth failure in harnesses is fixed ([#10400](https://github.com/unslothai/unsloth/issues/10400)); offline/air-gapped Desktop install guidance exists ([#10356](https://github.com/unslothai/unsloth/issues/10356)); on arm64 Docker images, don't assume xformers is present.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — Daily Digest
**Date:** 2026-09-08
**Repository:** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. Today's Highlights

No releases were published in the last 24 hours. Activity centered on **stability fixes for the Claude Desktop integration**: PRs #1769 and #1767 directly address user-reported data loss on CCR restart ([#1768](https://github.com/musistudio/claude-code-router/issues/1768)) and broken `web_search` fusion detection for the Cowork client ([#1766](https://github.com/musistudio/claude-code-router/issues/1766)). A separate build/observability gap — a missing Web Worker in Docker images ([#1770](https://github.com/musistudio/claude-code-router/pull/1770)) — and richer aggregate error reporting ([#1773](https://github.com/musistudio/claude-code-router/pull/1773)) round out the day's changes.

---

## 2. Releases & Breaking Changes

*No new releases in the last 24 hours.*

Pending compatibility notes (not yet shipped):
- **TypeScript 7 readiness:** [#1764](https://github.com/musistudio/claude-code-router/pull/1764) drops the deprecated `baseUrl` option so builds don't break under TypeScript 7. Repo currently pins `typescript@5.9.3`, so this is forward-compat only.
- **Claude Desktop config schema:** [#1772](https://github.com/musistudio/claude-code-router/issues/1772) flags that newer Claude Desktop builds warn on 4 keys (`authentication`, and three others) that CCR writes into `configLibrary/*.json`. No remediation PR yet — users see warnings on every launch.

---

## 3. New Model & Hardware Support

No new model, architecture, backend, or quantization support announced today.

Related compatibility issue worth flagging: [#1765](https://github.com/musistudio/claude-code-router/issues/1765) reports CCR fails to work with a **corporate-local OpenAI-compatible endpoint** (hosting Deepseek/Gemma), while public endpoints like Deepinfra function normally. Suggests a protocol-detection gap rather than a true model-support gap — no PR filed.

---

## 4. Performance & Optimization

No throughput, latency, or kernel-level work landed today.

Indirect performance/observability improvements in flight:
- **Better failure diagnostics:** [#1773](https://github.com/musistudio/claude-code-router/pull/1773) surfaces per-attempt upstream errors (status, stage, message) inside the gateway's aggregate "All target providers failed." response, so retries/failover paths become debuggable instead of a single opaque string.
- **UI build completeness:** [#1770](https://github.com/musistudio/claude-code-router/pull/1770) fixes the Docker image shipping without `log-body.worker.js`, restoring the request-log viewer (which silently 404'd the worker chunk).

---

## 5. Stability & Regressions

Ranked by user impact:

1. **[HIGH — data loss] [Issue #1768](https://github.com/musistudio/claude-code-router/issues/1768)** — On every CCR restart, the Claude App takeover path *deletes* the active `configLibrary/<id>.json` entry and the apply step recreates a bare 12-field stub, discarding user settings (`chatTabEnabled`, `modelPrefer1mContextWindow`, etc.). Reportedly a partial regression of #1736. **Fix in flight:** [PR #1769](https://github.com/musistudio/claude-code-router/pull/1769) scopes `restoreClaudeAppGatewayConfig` to only undo keys CCR wrote, leaving the entry file and root config intact.

2. **[MEDIUM — feature break] [Issue #1766](https://github.com/musistudio/claude-code-router/issues/1766)** — Fusion's `web_search` detection fails for Claude Cowork because Cowork declares the tool as camelCase `WebSearch` (no separators). The matcher normalizes via `toLowerCase().replace(/[-.]/g, "_")` → `websearch`, missing all three patterns (`=== "web_search"`, `endsWith("_web_search")`, `includes("search_web")`). **Fix in flight:** [PR #1767](https://github.com/musistudio/claude-code-router/pull/1767).

3. **[MEDIUM — config compatibility] [Issue #1772](https://github.com/musistudio/claude-code-router/issues/1772)** — Newer Claude Desktop validates `configLibrary` against a schema; 4 keys CCR writes (`authentication` among them) trigger "not a recognized configuration key" warnings on every launch. No fix PR yet.

4. **[MEDIUM — deployment bug] [PR #1770](https://github.com/musistudio/claude-code-router/pull/1770)** — Docker images are missing `assets/log-body.worker.js` because `buildRequestLogBodyWorker()` is not invoked during the Docker build, even though the UI bundle references it. Request-log viewer is silently broken in container deployments.

5. **[LOW — build/CI] [PR #1771](https://github.com/musistudio/claude-code-router/pull/1771)** — `tsc -b` fails with TS18003 ("No inputs were found in config file 'tsconfig.node.json'") because `include` points at `build/**/*.mjs` that doesn't exist pre-build. Same error surfaces in IDEs.

6. **[LOW — interop] [Issue #1765](https://github.com/musistudio/claude-code-router/issues/1765)** — Corporate OpenAI-compatible endpoints (running Deepseek/Gemma locally) aren't detected/served by CCR, while Deepinfra works. No fix PR yet.

---

## 6. What This Means for Application Developers

- **Pin your Docker image tag carefully** over the next few days. The current published image silently breaks the request-log viewer ([#1770](https://github.com/musistudio/claude-code-router/pull/1770)); wait for the merged fix or build from source before relying on log-body features in production containers.
- **If you rely on takeover-mode settings persistence**, treat the current `main` as lossy — every restart will wipe non-gateway fields in the active configLibrary entry. Track [#1769](https://github.com/musistudio/claude-code-router/pull/1769) for merge; until then, back up `~/.claude/configLibrary/*.json` before any CCR restart.
- **Cowork users** will see `web_search` routing silently fail until [#1767](https://github.com/musistudio/claude-code-router/pull/1767) lands. If your agent depends on Cowork's built-in search, configure a non-fusion provider as a fallback.
- **Plan for Claude Desktop's stricter config schema.** Even after #1768/#1769 merge, [#1772](https://github.com/musistudio/claude-code-router/issues/1772) will keep emitting warnings on launch — investigate whether downstream tools parse these warnings as errors before upgrading Desktop.
- **Diagnosability improves with #1773.** Once merged, gateway 5xx bodies will include a structured `attempts[]` array with per-upstream status/stage/message — useful for building retry policies and SLO dashboards on top of CCR.
- **Internal/private OpenAI-compatible gateways** are currently a soft incompatibility ([#1765](https://github.com/musistudio/claude-code-router/issues/1765)). If you're routing enterprise traffic through such an endpoint, validate end-to-end before depending on CCR for that path.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-08

## 1. Today's Highlights

CC Switch **v3.20.2** ships as a compatibility-fix wave around the Codex routing layer, with the headline being Grok now functioning through xAI's native Responses API under Codex routing — resolving a cluster of schema, role-name, and OAuth-side friction that was blocking the path. The 24h PR flow (~20 PRs) is dominated by **proxy/SSE streaming correctness fixes** (thinking-block churn, interleaved reasoning, HalfOpen permit leaks) and **cross-app provider copy** infrastructure, indicating the project is hardening both its local LLM gateway and the multi-app provider model rather than adding new providers.

## 2. Releases & Breaking Changes

- **v3.20.2** ([release notes](https://github.com/farion1231/cc-switch/releases/tag/v3.20.2)): Codex-line compatibility release. Notable fixes:
  - Grok works end-to-end via xAI native Responses API under Codex routing (xAI-rejected tool schemas, Codex-rejected integer floats, multi-agent email injection, and unrecognized role names all addressed).
  - Grok OAuth no longer blocked by the v3.20.1 toggle gate; takeover no longer freezes Codex at login; GPT-6 via Codex OAuth no longer prompts "needs Codex update".
  - Claude Code path also receives stability fixes (release notes truncated in summary).
- No API/config breaking changes called out, but maintainers should watch **v3.20.0 → v3.20.1 migration**: [#6969](https://github.com/farion1231/cc-switch/issues/6969) documents `authBinding.accountId` not migrating with the new workspace primary key, causing Codex OAuth cards to deadlock in "账号不存在" state.

## 3. New Model & Hardware Support

- **Qwen 3.8 generation refresh** across all seven supported apps (Claude Code, Claude Desktop, Codex, Hermes, OpenClaw, OpenCode, Pi) via [PR #7183](https://github.com/farion1231/cc-switch/pull/7183). DashScope is rebranded **百炼 → 千问AI平台** in presets.
- No new hardware backend (CUDA/ROCm/Metal/CPU) or quantization format changes in this window.

## 4. Performance & Optimization

- **Rate-limiter fix** [PR #7207](https://github.com/farion1231/cc-switch/pull/7207): P0 bug in `forwarder.rs` where `AllowRequestResult` was destructured immediately, releasing the `HalfOpenPermitGuard` and effectively disabling `max_half_open_requests=1`. With RAII guard, circuit-breaker rate limiting is restored; secondary `disarm()` permit-leak fix also landed.
- **Codex usage import on Windows** [PR #7219](https://github.com/farion1231/cc-switch/pull/7219): sticky-rollout detection now compares persisted byte cursor against file size (not just mtime), preventing usage-import stalls when Windows holds an active rollout's mtime constant while contents grow.
- **Streaming block churn** [PR #7227](https://github.com/farion1231/cc-switch/pull/7227) / [#7214 (closed dup)](https://github.com/farion1231/cc-switch/pull/7214): OpenAI→Anthropic converter was opening/closing thinking blocks on every chunk when upstream sent empty `reasoning_content` placeholders; now skipped.
- **Interleaved thinking blocks** [PR #5706](https://github.com/farion1231/cc-switch/pull/5706): when visible text begins, subsequent `reasoning_content` deltas are ignored to prevent repeated thinking↔text block transitions; regression test added.
- **Anthropic SSE byte alignment / state preservation** [PR #6814](https://github.com/farion1231/cc-switch/pull/6814): Responses reasoning summaries are translated into replayable Anthropic thinking blocks for Claude Code rather than leaking `redacted_thinking`.

## 5. Stability & Regressions

Ranked by user impact and active-ness:

| Severity | Issue | Status | Notes |
|----------|-------|--------|-------|
| **High** | [#6969](https://github.com/farion1231/cc-switch/issues/6969) Codex OAuth `authBinding.accountId` not migrated after v3.20.1, "账号不存在" deadlock, can't switch providers | Open | Affects all upgraded users on Windows; likely tied to the same root cause as #7211 and #4393 |
| **High** | [#4741](https://github.com/farion1231/cc-switch/issues/4741) Local proxy `/responses` fails for DeepSeek with `tool` role messages (HTTP 400) | Open | Root cause: missing preceding `tool_calls`; proxy normalization gap |
| **High** | [#4752](https://github.com/farion1231/cc-switch/issues/4752) Frequent `exceeded retry limit, last status: 429 Too Many Requests` when Codex routes through CC Switch | Open | Likely related to PR #7207's HalfOpen permit leak fix above |
| **High** | [#3449](https://github.com/farion1231/cc-switch/issues/3449) CC-Switch-written `config.toml` not recognized by Codex CLI, custom routes never take effect | Open | Format-compat issue; no fix PR yet |
| **Med** | [#5129](https://github.com/farion1231/cc-switch/issues/5129) Editing config files breaks existing symlinks by replacing the file | Open (stale) | Use-after-edit issue affecting users symlinking configs |
| **Med** | [#4946](https://github.com/farion1231/cc-switch/issues/4946) Local route startup, model requests fail | Open | |
| **Med** | [#6605](https://github.com/farion1231/cc-switch/issues/6605) Claude Desktop Anthropic-protocol errors | Open | |
| **Med** | [#4341](https://github.com/farion1231/cc-switch/issues/4341) Codex ↔ third-party models auto-disconnect mid-conversation | Open (48 comments) | Long-running complaint, no fix PR yet |
| **Med** | [#6967 (closed)](https://github.com/farion1231/cc-switch/issues/6967), [#7211 (closed)](https://github.com/farion1231/cc-switch/issues/7211), [#4393 (closed)](https://github.com/farion1231/cc-switch/issues/4393) `requires_openai_auth = true` forced write breaking Codex routing | Closed | Sequence of related reports; appears under active remediation |
| **Low** | [#6935](https://github.com/farion1231/cc-switch/issues/6935) CC Switch always opens first-priority app on relaunch, not last-focused (Win11) | Open | |
| **Low** | [#7088](https://github.com/farion1231/cc-switch/issues/7088) OpenCodeGo missing `x-opencode-session` header since 09/06 | Open | Upstream behavior change; CC Switch may need to inject |

Closed-but-recent regressions worth noting: [#2750](https://github.com/farion1231/cc-switch/issues/2750) (Codex `Reconnecting…` before `response.completed`), [#3848](https://github.com/farion1231/cc-switch/issues/3848) (model-catalog schema vs Codex), [#6998](https://github.com/farion1231/cc-switch/issues/6998) (DeepSeek vision image upload via Codex) — all closed in the last 24h, likely tied to v3.20.2.

## 6. What This Means for Application Developers

- **If you proxy Codex through CC Switch**, the v3.20.2 line is currently the safer track; but **#6969 indicates v3.20.0 → v3.20.1 still has an account-binding migration bug**, so test upgrades on a non-primary profile or back up `authBinding` state before bumping patch versions.
- **The local proxy is the right abstraction layer to watch**: a third of today's PRs are SSE/reasoning-block correctness fixes. If you're writing an upstream that sends `reasoning_content: ""` placeholders, your streams now traverse the converter without spurious thinking-block churn — but expect strict Anthropic-side validation (no interleaved reasoning after text begins, per [#5706](https://github.com/farion1231/cc-switch/pull/5706)).
- **Cross-app provider portability is coming**: [PR #7225](https://github.com/farion1231/cc-switch/pull/7225) introduces "copy to other apps" with protocol-following semantics (`apiFormat` carried in meta, Anthropic-native apps copied as-is, Codex/Gemini transcoded). Once merged, you can author a provider once and distribute it across all supported apps without per-app YAML drift.
- **Auto Mode traffic shaping** is being productized: [PR #6602](https://github.com/farion1231/cc-switch/pull/6602) adds a **classifier queue** that routes Claude Code Auto Mode's pre-Bash security-classifier requests to a *separate* provider chain from the main conversation. Useful if you want classification on a cheaper/faster model while keeping premium inference for the main thread.
- **macOS LAN endpoints** need `NSLocalNetworkUsageDescription` per [PR #7213](https://github.com/farion1231/cc-switch/pull/7213) — if you target LAN-resolved providers (e.g. local Ollama/llama.cpp boxes), expect the app to prompt for Local Network permission.
- **Live config isolation is tightening**: [PR #7210](https://github.com/farion1231/cc-switch/pull/7210) stops the shutdown-time Codex retry/timeout fields from being overwritten by Claude's row, and [PR #7212](https://github.com/farion1231/cc-switch/pull/7212) preserves child-provider `meta` (usage scripts, per-app switches) during universal sync. If you build usage-collection scripts that read provider meta, expect them to survive provider edits now.
- **Outstanding integration gaps** to track before committing to a stack: ZCode ([#4205](https://github.com/farion1231/cc-switch/issues/4205), [#4744 closed](https://github.com/farion1231/cc-switch/issues/4744)), mimo code ([#4073](https://github.com/farion1231/cc-switch/issues/4073)), Cursor ([#2242](https://github.com/farion1231/cc-switch/issues/2242)), qoder ([#5112](https://github.com/farion1231/cc-switch/issues/5112)) — ZCode appears to be landing first.
- **WSL + native Windows dual config**: [#4043](https://github.com/farion1231/cc-switch/issues/4043) (32 comments, 7 👍) is the most-upvoted enhancement in the window — if your dev workflow spans WSL and native, voice your support; it's clearly a high-demand ergonomic feature.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-08

## Today's Highlights

The `v1.0.0-rc.35` release ships **Wan 3.0 Video** support and a simplified **Task Plugin Controls** model (master switch + per-plugin toggle), with built-in plugins now echoing the request's model name rather than the upstream real ID. On the wire-protocol side, the long-running **Responses API over WebSocket** effort is converging: PR [#6914](https://github.com/QuantumNous/new-api/pull/6914) merges and hardens [#5062](https://github.com/QuantumNous/new-api/pull/5062)'s v1 implementation against the v2 protocol. Meanwhile, an active bug ([#7134](https://github.com/QuantumNous/new-api/issues/7134)) is skewing per-channel reliability metrics by counting client-cancelled streams as upstream failures.

## Releases & Breaking Changes

- **[v1.0.0-rc.35](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.35)** — *Wan 3.0 Video, Plugin Routing*
  - **Task Plugin Controls simplified to two layers**: master switch + per-plugin toggle. Turning a plugin off no longer silently falls back to a same-named built-in; same-named models are no longer silently handled by built-in plugins either.
  - **Model echo behavior changed**: built-in plugins now reflect the request's model name (honoring model redirection) rather than the upstream real ID. Any tooling or audit logic that depends on the upstream ID inside the plugin layer will need to be re-validated.
  - Adds Wan 3.0 video model support and plugin routing.
  - **Migration note**: operators relying on fallback behavior for disabled plugins should audit their channel→plugin mappings before upgrading.

## New Model & Hardware Support

- **New video model**: **Wan 3.0** (`Wan 3.0 Video`) routed via the plugin system — surface via plugin enablement in the new two-layer control.
- **Provider/edge gateway onboarding discussion**: [#7251](https://github.com/QuantumNous/new-api/issues/7251) — discussion thread on adding first-class async support for **xAI Grok Imagine Video**. Note the related broken-state report in [#6358](https://github.com/QuantumNous/new-api/issues/6358) (`invalid_api_platform: 48` on the video route) — currently no fix PR is open.
- **AWS credential chain** (proposed): [#7258](https://github.com/QuantumNous/new-api/pull/7258) introduces support for the AWS default credential chain (instance role / IRSA / IAM Roles Anywhere) on AWS channels, broadening zero-secret deployment options.
- **DaoXE multi-model gateway** ([#7264](https://github.com/QuantumNous/new-api/issues/7264)) was closed as invalid; integrators continue to use the generic OpenAI-compatible + custom base-URL path. Worth noting for operators in CN/edge markets: the upstream also exposes a native Anthropic Messages surface, which the current channel type does not natively target.
- No new quantization format, CUDA/ROCm/Metal, or local-backend changes in this window.

## Performance & Optimization

- **Streaming reliability metrics** — [#7134](https://github.com/QuantumNous/new-api/issues/7134) reports that downstream-cancelled SSE streams are unconditionally recorded as model failures, persistently deflating the per-channel success-rate KPI. The reporter traces the classification in new-api's own telemetry path (not pass-through or Coding Plan paths). No fix PR yet; this is effectively a metrics-accuracy regression.
- **SSE wire-path hardening** — PR [#7259](https://github.com/QuantumNous/new-api/pull/7259) eliminates a latent panic in `common/custom-event.go::writeData` by replacing an unguarded `data.(string)` assertion with `fmt.Sprint(data)` + prefix check, and adds a regression test. Low-frequency crash, but a hard fail when triggered.
- **Coze stream body leak** — also in [#7259](https://github.com/QuantumNous/new-api/pull/7259): fixes an unclosed Coze streaming response body that was leaking upstream connections under load.
- **Pass-through model mapping** — PR [#7249](https://github.com/QuantumNous/new-api/pull/7249) (closed/merged) makes `model_mapping` apply to the actual request body in pass-through mode. Before the fix, upstream saw the client-facing model name and 404'd, hiding misconfiguration behind opaque errors (#6002, #6639).
- **Claude non-stream buffering** — PR [#6292](https://github.com/QuantumNous/new-api/pull/6292) (closed) adds SSE buffering for non-stream Claude requests when the upstream returns `text/event-stream` despite `stream: false`, preventing truncated bodies on misbehaving compatible upstreams.
- No benchmark numbers (tokens/s, p50/p99 latency, RSS) were posted in this window.

## Stability & Regressions

Ranked by likely operational impact:

1. **[HIGH] Client-cancelled streams counted as model failures** — [#7134](https://github.com/QuantumNous/new-api/issues/7134). Pollutes channel success-rate KPIs, can cause auto-disable rules to trip, and misdirects capacity-planning signals. No fix PR.
2. **[HIGH] Ollama streaming `tool_calls` dropped on `done:true` frame** — [#7252](https://github.com/QuantumNous/new-api/issues/7252). Affects Ollama channels with `stream: true` + `tools` on models like `qwen3-coder`: client receives an empty `content` delta and `finish_reason: "stop"` with no `tool_calls`. Reproduced on `v1.0.0-rc.35`. No fix PR — **regression introduced in the just-released version**.
3. **[MED] xAI Grok Imagine Video routes return `invalid_api_platform: 48`** — [#6358](https://github.com/QuantumNous/new-api/issues/6358). The model is advertised in the UI but the video path is not wired correctly. Still open, no fix PR.
4. **[MED] SSE encoding panic** — [#7259](https://github.com/QuantumNous/new-api/pull/7259) provides the fix; pending merge. Hard crash on any non-string payload reaching `writeData`.
5. **[LOW] Coze upstream connection leak** — same PR [#7259](https://github.com/QuantumNous/new-api/pull/7259). Slow resource exhaustion, not an immediate outage.
6. **[LOW] Pass-through ignores `model_mapping`** — [#7249](https://github.com/QuantumNous/new-api/pull/7249) fixes it; merged. Surfaces as opaque 404s from upstream.
7. **Closed/withdrawn**: [#7243](https://github.com/QuantumNous/new-api/issues/7243), [#7253](https://github.com/QuantumNous/new-api/issues/7253) (both 撤回作废), [#7264](https://github.com/QuantumNous/new-api/issues/7264), [#7257](https://github.com/QuantumNous/new-api/issues/7257), [#7256](https://github.com/QuantumNous/new-api/issues/7256), [#7255](https://github.com/QuantumNous/new-api/pull/7255).

## What This Means for Application Developers

- **Re-validate agent tool-calling against Ollama on rc.35** — if your agent stack runs `qwen3-coder` (or similar) through an Ollama channel, pin to **rc.34** until [#7252](https://github.com/QuantumNous/new-api/issues/7252) is resolved. Tool calls will silently disappear, which is worse than a hard error.
- **Don't trust success-rate dashboards while [#7134](https://github.com/QuantumNous/new-api/issues/7134) is open** — auto-disable thresholds and any SLO based on the per-channel success rate are unreliable inputs. If you wire alerting or capacity decisions off these metrics, tag them as degraded and gate on request-completion counts instead.
- **Plan for the plugin-control semantics change** — the new two-layer model is stricter: a disabled plugin is truly disabled, no silent fallback. Review `relay/` plugin maps and any IaC that toggles plugins, especially around Wan 3.0 and other video plugins, before promoting rc.35.
- **Pass-through + `model_mapping` now works** — with [#7249](https://github.com/QuantumNous/new-api/pull/7249) merged, you can safely use channel-level `model_mapping` with the request-body pass-through mode to alias client-facing names to upstream IDs without 404s.
- **Responses over WebSocket is approaching usability** — if you have long-lived agent loops that benefit from bidirectional Responses (`response.create` event flow), watch the merge of [#6914](https://github.com/QuantumNous/new-api/pull/6914) onto `main`. This unlocks native Codex/OpenAI Responses sessions through the gateway with usage accounting.
- **Multi-key channel UX is improving** — PR [#7112](https://github.com/QuantumNous/new-api/pull/7112) adds concurrent "Test All Keys", auto-disable rules, and mobile UI fixes. Once merged, it materially lowers the cost of operating key pools for high-QPS agents.
- **Admin/security ergonomics in flight** — three related enhancements from a single author ([#7261](https://github.com/QuantumNous/new-api/issues/7261), [#7262](https://github.com/QuantumNous/new-api/issues/7262), [#7263](https://github.com/QuantumNous/new-api/issues/7263)) push toward org-level policy enforcement (API-key expiry caps, mandatory 2FA, cross-user key visibility). If you run multi-tenant new-api for a team, these will reduce bespoke admin tooling once they ship.
- **Email tooling for ops** — PR [#6514](https://github.com/QuantumNous/new-api/pull/6514) (open since late July) adds audited, rate-limited bulk email to selected users. Useful for incident comms, plan changes, and deprecation notices.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*