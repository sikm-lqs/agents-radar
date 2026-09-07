# AI Infrastructure Digest 2026-09-07

> Generated: 2026-09-07 01:16 UTC | Projects covered: 9

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

# AI Infrastructure Cross-Project Report — 2026-09-07

## 1. Ecosystem Overview

The ecosystem is absorbing a new frontier-model generation (GLM-5.3-Flash, DeepSeek-V4, Qwen3.8-Flash-Next, Kimi K3, MiniMax-M3) simultaneously across every layer — engines, local runtimes, and gateways — with hybrid linear-attention architectures (GDN/DeltaNet, DSA/MLA sparse indexers) plus speculative decoding (MTP, EAGLE-3, DFlash) as the dominant enablement target and, concurrently, the dominant source of **silent correctness failures**. Hardware surface is widening fast: Blackwell edge parts (SM120/SM121, GB10, DGX Spark), AMD RDNA3/4 and MI325X/MI355X, and NPUs (Ascend Atlas A5, T-Head PPU) all saw material work today. Meanwhile the gateway layer (LiteLLM, New API, CC Switch) is maturing toward security, billing accuracy, and cross-provider cost routing — with billing math emerging as its own production risk class. Notably, no engine released today while two gateways did (LiteLLM v1.100.0, New API rc.34), and llama.cpp shipped nine builds — the velocity asymmetry itself is a signal.

## 2. Activity Comparison

| Project | 24h PRs (surfaced) | 24h Issues (surfaced) | Release status | High-severity open items |
|---|---|---|---|---|
| **vLLM** | ~17 | ~11 | None; DeepGEMM vendored pin rolled back (#53680) | 4 (incl. 2 silent-wrong-output bugs) |
| **SGLang** | **292** (reported) | **38** (reported) | None; CI: 1 broken / 12 flaky / 953 recently fixed | ~7 correctness blockers (incl. all-zeros output #38143) |
| **llama.cpp** | ~12 | ~9 | **9 builds** (b10821–b10830) | 5 (incl. silent instant-EOS >130k ctx) |
| **Ollama** | 4 fix PRs | ~8 | None | 3 (Vulkan AMD, Blackwell FA crash, cloud latency) |
| **LiteLLM** | ~6 | ~12 | **v1.100.0 + v1.101.0-rc.1** | 3 (2 billing, 1 Bedrock file deletion) |
| **Unsloth** | ~15 | ~5 open / ~14 closed | None | 3 (96GB OOM at bs=1, Ollama integration, Smart App Control) |
| **Claude Code Router** | 1 | 3 | None | 1 (gateway startup under load) |
| **CC Switch** | ~12 open / 4 merged | ~10 open / 8 closed | None (v3.20.1 line carries regression) | 5 (tool_call_id rewrite #7156 top) |
| **New API** | ~5 (3 merged) | ~8 | **v1.0.0-rc.34** | 1 critical billing (fix PR ready) |

*Note: only SGLang reports raw counts; other figures are items surfaced in each digest, a floor rather than a total.*

## 3. Model Support Race

| Model | llama.cpp | vLLM | SGLang | Gateways (LiteLLM / New API / CC Switch) |
|---|---|---|---|---|
| **GLM-5.3-Flash** | Sparse FA hints (#27970) | ✅ Full spec-decode wiring (EAGLE-3/DFlash, 3 PRs) | ⚠️ SM120 qualification mid-flight, 11-defect tracker | CC Switch pricing; New API reasoning mapping |
| **DeepSeek-V4** | Sparse FA | ✅ MXFP4×FP8 MoE backend (SM90) | ⚠️ NPU/AMD pushes + open IMA bug in DSA indexer | Vision-variant catalog fix (CC Switch) |
| **Qwen3.8-Flash-Next** | ✅ qwen4exp prefill 2× on GB10 | ✅ FP8 main-KV on QSA + PLE CPU offload | ✅ New model intro (#36497) | ⚠️ `reasoning_effort` still unconfigurable via LiteLLM |
| **Kimi K3** | — | ✅ AITER MXFP4 MoE on MI325X | ✅ AMD ROCm gluon path | — |
| **Spark2_5** | ✅ Full pipeline day-one | — | — | ❌ Ollama downloads but can't run (#18195) |
| **MiniMax-M3** | — | — | ❌ All-zero tokens on sm_121 (#38143) | ❌ Ollama cloud JSON-splitting |
| **GPT-6 Astra / Gemini 3.8 Flash** | — | — | — | ✅ CC Switch + New API (capability handling, pricing) |

**Who's ahead:** llama.cpp remains fastest for *new architectures* (Spark2_5 end-to-end in one build). vLLM and SGLang are effectively tied on *frontier-scale* enablement, but with different risk profiles — vLLM's GLM-5.3-Flash spec-decoding landed as coordinated merges, while SGLang's is mid-qualification with a public defect tracker (arguably more transparent). The gateways lead on *API-surface* models (GPT-6, Gemini) that engines don't serve. Striking asymmetry: MiniMax-M3 W4A16 produces correct output on vLLM but all-zeros on SGLang (#38143) — same weights, divergent engine maturity.

## 4. Performance Frontier

- **KV cache is the day's #1 battleground**, spanning every layer: vLLM's FP8 main-KV on sparse-attention paths; SGLang's unified-KV pool sizing fix and host-tier HiCache (with a load-back corruption bug); llama.cpp's non-contiguous cell restore for agentic sessions; Unsloth's KV preemption + `--preempt-ram` host parking; Ollama's MLX prefix-cache tax (**17–27s re-prefill per turn**). Prefix-cache *reuse* failures (vLLM #54094/#53504, llama.cpp #28495's 42–54% throughput drop) show the cost of getting this wrong.
- **Speculative decoding** is now table stakes — and the top correctness risk: vLLM's TurboQuant+MTP silent degeneration, SGLang's acceptance decay-to-zero over uptime (#37326), llama.cpp's greedy divergence on quantized targets (#25618). Perf wins are real (SGLang DSA top-k v2: **+4.9% throughput, −3.5% TPOT** at ISL 70k) but correctness lags.
- **Quantization**: MXFP4 is consolidating as the cross-vendor format — vLLM now has *three* MXFP4 MoE backends plus native HIP and AITER paths. FP8 remains unstable on Blackwell edge (SM120 Xid 13 under load).
- **Kernels & hardware tuning**: DeepGEMM pin rollback (vLLM), CUDA race fixes (llama.cpp b10826), OpenCL/Metal/RDNA4 per-kernel tuning, ROCm fused DSA metadata.
- **Cold start / tail latency**: vLLM's ~100s Dynamo-subgraph fix and sampler warmup; New API's per-channel TTFB timeout with auto-fallback — the gateway layer is starting to optimize what the engines expose.

## 5. Layer Positioning

- **Serving engines (vLLM, SGLang)**: Frontier enablement, speculative decoding, kernel-level optimization, distributed topologies (TP/PP). Highest velocity, highest correctness risk. Both are effectively model-vendor co-engineering platforms today (GLM, DeepSeek, Qwen support landed in vendor-coordinated PR sets).
- **Local runtimes (llama.cpp, Ollama)**: llama.cpp is the *substrate* — Ollama and Unsloth both build on it, and its 9-build cadence propagates downstream. Ollama differentiates on packaging, cloud tags (now a liability), and — finally — observability (Prometheus endpoint). llama.cpp's hardware reach (RDNA4, Hexagon, GB10, M2 Max) is unmatched.
- **Gateways/routers (LiteLLM, New API, CC Switch, Claude Code Router)**: Translation correctness, auth/security (New API rc.34's TOTP/Passkey overhaul), billing, and fallback. Today's risk profile is *spend math* (LiteLLM's 2× cache-read double-billing, New API's image double-charge) and *tool-call protocol translation* (CC Switch's tool_call_id rewriting). Notably, LiteLLM's Foundry Local provider and Ollama's `:cloud` tags are blurring the local/hosted boundary from both directions.
- **Fine-tuning/local platform (Unsloth)**: Orchestration and hardware packaging rather than kernels — KV preemption UX, DGX Spark two-node routing, ARM64 CUDA, Strix Halo backend selection (Vulkan > ROCm, a rare measured verdict).

## 6. Trend Signals

1. **Silent-wrong-output is the failure mode to fear.** MiniMax-M3 all-zero tokens with a healthy server, TurboQuant+MTP degeneration, instant-EOS past 130k context, greedy non-determinism on DSV4/Qwen3.8. If you run frontier hybrid models in production, output-level evals (not just uptime probes) are now mandatory. Watch: SGLang #38143, vLLM #53180/#53257, llama.cpp #27756.
2. **Hybrid linear attention is the new baseline — and it's immature.** GDN/DeltaNet/DSA support is spreading to every layer, but the recurring bugs (recurrent-state degradation with depth/layers, indexer kernel faults, non-determinism scaling with concurrency) suggest the ecosystem is one model generation ahead of its verification tooling.
3. **Blackwell edge (SM120/121, GB10, DGX Spark) is mid-qualification everywhere.** FP8 instability (vLLM Xid 13), flash-attention crashes (Ollama #18276), engine-specific blockers (SGLang #37105). Expect patch-release churn this week; don't commit production to SM120 until vLLM #55571 and SGLang's #37813 tracker close.
4. **Billing correctness is the gateway layer's new battleground.** Two independent double-billing bugs (LiteLLM #40006, New API #7229) on the same day. If you charge back on gateway spend logs, audit against provider invoices this week.
5. **Agentic workloads are reshaping engine internals.** KV-cache restore for long sessions, prefix-reuse fixes, tool-call parser robustness (gemma4 unparseable in Ollama), and reasoning-parameter plumbing (`thinking` vs `enable_thinking` vs `reasoning_effort`) remain inconsistent across layers — validate end-to-end, per model.
6. **AMD and NPUs are closing the gap asymmetrically.** AMD got MXFP4 + Kimi K3 + DSV4 capacity fixes today; NPU work (Ascend, T-Head) is concentrated almost entirely in SGLang — if domestic-accelerator support matters to you, SGLang is currently the only credible engine track.
7. **Cost-routing is becoming a first-class feature.** CC Switch's cross-provider subagent routing (#7165 — flagship on main thread, flash model on subagents) previews where every router is heading; New API's TTFB-aware fallback (#7228) does the same for resilience.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-07

## Today's Highlights

GLM-5.3-Flash speculative-decoding support landed as a coordinated set of three PRs (#55622, #55620, #55621) that wire EAGLE-3/DFlash drafters through the model's dedicated KV grouping and MLA-aware dtype selection. Meanwhile, two high-severity correctness bugs surface for production users: an Xid 13 / CUDA illegal-memory-access on RTX PRO 5000 (SM120) with FP8 under load (#55571), and TurboQuant k8v4 silently producing degenerate tokens when combined with MTP speculative decoding on hybrid GDN models (#53180).

## Releases & Breaking Changes

No new releases in the last 24h. Behavior changes worth flagging for ops:

- **DeepGEMM pin rollback on `nv_dev`** ([PR #53680](https://github.com/vllm-project/vllm/pull/53680)): vendored DeepGEMM is being pinned back to `a6b593d` until [deepseek-ai/DeepGEMM#419](https://github.com/deepseek-ai/DeepGEMM/pull/419) restores SM12x pure-FP8 1d1d kernels. Expect differing GEMM performance on Blackwell SM120/SM121 workloads until that upstream lands.
- **LoRA validation tightened** ([PR #55310](https://github.com/vllm-project/vllm/pull/55310)): adapters with no matching `target_modules` will now be rejected at load time rather than at request time. Fixes [#55193](https://github.com/vllm-project/vllm/issues/55193).
- **`resolve_enable_thinking()` helper** ([PR #53389](https://github.com/vllm-project/vllm/pull/53389)): clients/templates passing `thinking` will now be treated as `enable_thinking` aliases in reasoning parsers. Fixes #43728. Should be backward-compatible but worth a smoke test for Qwen/Kimi tool-calling paths.
- **EAGLE-3 + pipeline parallelism** is now officially supported and the [Known Feature Incompatibility note](https://github.com/vllm-project/vllm/pull/55623) has been corrected ([PR #55623](https://github.com/vllm-project/vllm/pull/55623)).

## New Model & Hardware Support

- **GLM-5.3-Flash + EAGLE-3 / DFlash drafters** ([PR #55620](https://github.com/vllm-project/vllm/pull/55620), [PR #55622](https://github.com/vllm-project/vllm/pull/55622), [PR #55621](https://github.com/vllm-project/vllm/pull/55621)): exposes auxiliary hidden states for DFlash2 and routes the drafter's GQA attention layers correctly through the GLM-5.3 KV layout — required for `incoai/GLM-5.3-Flash-DFlash2` to actually load.
- **Qwen3.8-Flash-Next FP8 main KV cache on QSA path** ([PR #55557](https://github.com/vllm-project/vllm/pull/55557)): `fp8_e4m3` is now allowed for the main K/V on sparse-attention layers; side caches (raw-key ring, compressed keys, GDN state) stay in bf16.
- **FlashInfer MXFP4 × FP8 fused MoE for SM90** ([PR #54032](https://github.com/vllm-project/vllm/pull/54032)): third MXFP4 MoE backend for DeepSeek-V4-family weights, opt-in via `--moe-backend flashinfer_cutlass_humming`. Kernel-internal FP8 activation quantization, no model-side changes required.
- **Native HIP MXFP4 (dense + MoE) for RDNA3** ([PR #46676](https://github.com/vllm-project/vllm/pull/46676)): closes the gap where compressed-tensors MXFP4 checkpoints refused to load on RX 7900 XTX.
- **AITER MXFP4 MoE on gfx942 (MI325X) for Kimi K3** ([PR #50817](https://github.com/vllm-project/vllm/pull/50817)): also fixes MLA decode abort and CDNA4-sized tile shapes leaking into CDNA3.
- **Qwen3.8-Flash-Next UVA-based PLE offload + N-gram parallelism** ([PR #54371](https://github.com/vllm-project/vllm/pull/54371)): pinned-CPU embedding lookup via UVA, gated on `VLLM_PLE_CPU_OFFLOAD=1`.
- **XPU batched LoRA** ([PR #51613](https://github.com/vllm-project/vllm/pull/51613)): collapses per-slice LoRA launches into one kernel call, aligning with Triton multi-slice semantics.
- **MRv2 multi-config sampler warmup** ([PR #54630](https://github.com/vllm-project/vllm/pull/54630)): warms seeded and greedy dispatch paths so first-request latency is no longer penalized by FlashInfer compile, fixes #54425 and #54455.

## Performance & Optimization

- **~100s cold-start reduction** by removing `layer_name` from `unified_kv_cache_update` ([PR #50973](https://github.com/vllm-project/vllm/pull/50973), closed): Dynamo was emitting constant guards per layer and producing 65 separate compiled submodules. Notable because the change was reverted-closed during the day — likely a rebase collision; the optimization itself is sound and worth re-landing.
- **ROCm split-KV decode kernel** now admits gfx11 ([Issue #50264](https://github.com/vllm-project/vllm/issues/50264) update 2026-08-28): hybrid-Mamba long-context decode no longer collapses on RDNA, fix exists upstream via [#45916](https://github.com/vllm-project/vllm/pull/45916) and the `on_gfx12x()` gate has been widened.
- **XPU LoRA launch latency**: replacing per-slice `bgmv_shrink/expand` with batched `lora_shrink/expand` removes Python overhead ([PR #51613](https://github.com/vllm-project/vllm/pull/51613)).
- **DeepGEMM 1d1d pin** ([PR #53680](https://github.com/vllm-project/vllm/pull/53680)) restores SM12x pure-FP8 performance to the last-known-good `a6b593d` until upstream lands.

## Stability & Regressions

Ranked by potential production impact:

| Severity | Issue | What breaks | Fix? |
|---|---|---|---|
| 🔴 High | [#55571](https://github.com/vllm-project/vllm/issues/55571) — Xid 13 / CUDA illegal memory access on RTX PRO 5000 (SM120) FP8 sustained load | GPU fault mid-request; vanishes with `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` or `--enforce-eager`, pointing at FlashInfer FP8 scaled-mm | Open |
| 🔴 High | [#53180](https://github.com/vllm-project/vllm/issues/53180) — TurboQuant k8v4 + MTP silently produces degenerate tokens on hybrid GDN | Silent, no exception; output is wrong | Open |
| 🔴 High | [#53257](https://github.com/vllm-project/vllm/issues/53257) — DeepSeek-V4-Flash non-deterministic at `temperature=0`, scales with concurrency | Breaks reproducibility for any DSV4 production workload | Open |
| 🔴 High | [#54521](https://github.com/vllm-project/vllm/issues/54521) — Qwen3.8-Flash-Next greedy non-determinism near `indexer_budget` | Same byte-identical request → 5 different outputs on SM121/GB10 | Open |
| 🟠 Med | [#54094](https://github.com/vllm-project/vllm/issues/54094) — DFlash2 + YaRN: identical 1.04M prompt gets zero prefix-cache reuse | Long-context replay pays full prefill cost | Open |
| 🟠 Med | [#53504](https://github.com/vllm-project/vllm/issues/53504) — MTP first repeat misses prefix cache on hybrid Mamba/GDN | First replay re-prefills in full; reuse begins on second | Partial — [PR #52244](https://github.com/vllm-project/vllm/pull/52244) in progress |
| 🟠 Med | [#54369](https://github.com/vllm-project/vllm/issues/54369) — ROCm Sparse-MLA/kpool rebuild attention metadata per draft step | Caps useful MTP depth at k=4 on GLM-5.3-Flash ROCm | Open |
| 🟠 Med | [#51977](https://github.com/vllm-project/vllm/issues/51977) — `openai_harmony.HarmonyError` on gpt-oss-120b tool calling (v0.26.0) | Intermittent tool-calling 500s | Open |
| 🟡 Low | [#52907](https://github.com/vllm-project/vllm/issues/52907) (closed) — Multi-node Ray/TP-16 gloo-barrier deadlock 0.26.1rc1.dev78→dev148 | 30-min idle then OOM; DeepSeek-R1 FP8 | Closed — landed in RC |
| 🟡 Low | [#50264](https://github.com/vllm-project/vllm/issues/50264) — RDNA hybrid-Mamba decode collapse | Resolved by [#45916](https://github.com/vllm-project/vllm/pull/45916) widening gfx gate | Resolved upstream |
| 🟡 Low | [#28172](https://github.com/vllm-project/vllm/issues/28172) — `max_tokens` off-by-one | Stale but still open | Open |

## What This Means for Application Developers

- **If you're serving DeepSeek-V4-Flash, GLM-5.3-Flash, or Qwen3.8-Flash-Next at scale:** pin a known-good vLLM build and avoid mixing speculative decoding (MTP/EAGLE-3) with experimental KV-cache formats until [#53180](https://github.com/vllm-project/vllm/issues/53180), [#53257](https://github.com/vllm-project/vllm/issues/53257), and [#54521](https://github.com/vllm-project/vllm/issues/54521) close. Run with `--enforce-eager` or disable FlashInfer FP8 scaled-mm as a short-term mitigation for the SM120 Xid 13.
- **Long-context workloads on Qwen3.8-Flash-Next or hybrid Mamba/GDN:** prefix-cache reuse is broken on the first repeat ([#54094](https://github.com/vllm-project/vllm/issues/54094), [#53504](https://github.com/vllm-project/vllm/issues/53504)). Either warm with two identical requests, or hold off on those code paths until [PR #52244](https://github.com/vllm-project/vllm/pull/52244) lands.
- **Multi-LoRA on classification heads:** still no native support — three open issues ([#19623](https://github.com/vllm-project/vllm/issues/19623), [#12829](https://github.com/vllm-project/vllm/issues/12829), [#23719](https://github.com/vllm-project/vllm/issues/23719)). Plan to maintain a custom model subclass or run multiple vLLM instances per task.
- **AMD users:** RDNA3 finally gets native MXFP4 ([PR #46676](https://github.com/vllm-project/vllm/pull/46676)) and MI325X gets usable Kimi-K3 inference ([PR #50817](https://github.com/vllm-project/vllm/pull/50817)). If you're holding off on AMD for cost reasons, the gap is closing.
- **Cold-start sensitive deployments:** the ~100s Dynamo-subgraph fix ([PR #50973](https://github.com/vllm-project/vllm/pull/50973)) should reduce MRv2 first-token latency substantially when it relands — worth tracking for autoscale-heavy setups.
- **Reasoning / tool-calling clients:** audit any client that passes `thinking` instead of `enable_thinking` — the new alias in [PR #53389](https://github.com/vllm-project/vllm/pull/53389) means Qwen/Kimi templates will start honoring it; verify the resulting behavior matches expectations.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-07

## 1. Today's Highlights

The repository saw 292 PRs and 38 issues touched in 24 hours, with three threads dominating traffic: **GLM-5.3-Flash** continues its rolling SM120/RTX PRO 6000 integration (tracking issue [#37524](https://github.com/sgl-project/sglang/issues/37524) consolidates 11 open defects, with [#38031](https://github.com/sgl-project/sglang/issues/38031) HiCache corruption and [#36906](https://github.com/sgl-project/sglang/issues/36906) pipeline-parallel `KeyError: 'residual'` as the highest-impact open bugs); **DeepSeek-V4** is seeing parallel NPU and AMD pushes ([#37373](https://github.com/sgl-project/sglang/pull/37373) adds Atlas A5 support, [#38192](https://github.com/sgl-project/sglang/pull/38192) fixes unified-KV sizing) alongside a serious long-context illegal-memory-access in the DSA indexer ([#37892](https://github.com/sgl-project/sglang/issues/37892)); and the **Apple Silicon** track gets a refreshed RFC proposing a Torch-owned SRT path with an exported whole-model MLX region ([#32321](https://github.com/sgl-project/sglang/issues/32321)).

## 2. Releases & Breaking Changes

No new releases in the last 24h. CI metrics ([#17050](https://github.com/sgl-project/sglang/issues/17050)) report 1 broken, 12 flaky, and 953 recently fixed tests — stable enough for daily use but worth watching.

## 3. New Model & Hardware Support

- **Apple Silicon — MLX region design** ([#32321](https://github.com/sgl-project/sglang/issues/32321)): RFC redesign proposes Torch owns the SRT path and the whole model is exported into an MLX region, superseding earlier proposals. Implementation PR is [#36164](https://github.com/sgl-project/sglang/pull/36164).
- **T-Head PPU (ZW810 / ZW810E / ZW-M890P)** ([#37519](https://github.com/sgl-project/sglang/issues/37519)): new roadmap for first-class domestic-CPU/accelerator support.
- **Atlas A5 (Ascend NPU) + DeepSeek-V4** ([#37373](https://github.com/sgl-project/sglang/pull/37373)): NPU side of DSV4 work, also touches HiCache, unified-radix-cache, and memory-pool.
- **Qwen 3.8 Flash Next** ([#36497](https://github.com/sgl-project/sglang/pull/36497)): new model introduction.
- **Kimi K3 on AMD ROCm** ([#37601](https://github.com/sgl-project/sglang/pull/37601), [#37691](https://github.com/sgl-project/sglang/pull/37691)): aiter gluon path extended to `qlen>1`; chunked-KV attention added.
- **SenseNova-U1.5-8B-MoT** ([#36606](https://github.com/sgl-project/sglang/pull/36606)): native text-to-image in `sglang generate` / `multimodal_gen`.
- **DFlash2 speculative decoding on NPU** ([#35629](https://github.com/sgl-project/sglang/pull/35629)): Ascend adaptation now closed.
- **Qwen3.5 GDN multi-item scoring fix** ([#33922](https://github.com/sgl-project/sglang/pull/33922)): hybrid GDN/full-attention packing bug for scored outputs.
- **GLM-5.3-Flash SM120 qualification tracker** ([#37813](https://github.com/sgl-project/sglang/issues/37813), [#37524](https://github.com/sgl-project/sglang/issues/37524)): TP2 / W4A16 / FP8 KV / vision / native MTP on 2× RTX PRO 6000.

## 4. Performance & Optimization

- **DSA prefill top-k v2 kernel for GLM-5.x** ([#37889](https://github.com/sgl-project/sglang/pull/37889)): extends v2 to packed score rows. Measured on H100 at ISL 70,000 / OSL 300: **+4.9% token throughput per GPU, −3.5% median TPOT** (geometric mean over concurrency 4–64); the prefill top-k path was previously dropping ~73%. GSM8k reported at 0.927.
- **ROCm fused DSA metadata kernels** ([#37124](https://github.com/sgl-project/sglang/pull/37124)): drops redundant work from the absorb path on GLM-5.2-MXFP4 / MI355X / TP4.
- **AMD DSV4 unified-KV pool + SWA ring accounting** ([#38192](https://github.com/sgl-project/sglang/pull/38192)): relands the fix from [#30315](https://github.com/sgl-project/sglang/pull/30315), fully gated. Pool was previously reserving memory the runtime never allocated, capping full-token capacity well below card capacity.
- **Breakable CUDA Graph buffer sizing** ([#36749](https://github.com/sgl-project/sglang/pull/36749)): sizes BCG buffers by token rows and supports `LogitsProcessorOutput` — fixes speculative-decoding graph capture.
- **Diffusion CI rebalancing** ([#38239](https://github.com/sgl-project/sglang/pull/38239)): H100 2-GPU shards were 32 / 17 / 21 min; new LPT + 45 min timeout tightens CI.
- **Qwen3.5 GDN multi-item scoring** ([#33922](https://github.com/sgl-project/sglang/pull/33922)): previously the GDN prefill processed the packed suffix as one continuous recurrent sequence — correctness fix with perf implications for retrieval/scoring workloads.

## 5. Stability & Regressions

**Closed today (good news):**
- [#28484](https://github.com/sgl-project/sglang/issues/28484) — Spec v2 + Mamba extra_buffer `NoneType` crash on H100/TP1 with EAGLE on v0.5.13.
- [#30480](https://github.com/sgl-project/sglang/issues/30480) — Non-streaming leaked raw `<tool_call>` markup when truncated by `max_tokens` (hermes, qwen25).
- [#30549](https://github.com/sgl-project/sglang/issues/30549) — `--speculative-adaptive` startup crash from shared logits buffer sized for active draft tokens, not max adaptive candidate.
- [#30505](https://github.com/sgl-project/sglang/issues/30505) — DSA + fp8 KV (`flashmla_kv`) ~1 GiB prefill transients OOM-crashing 8×H100 with GLM-5.2-W4AFP8.
- [#30555](https://github.com/sgl-project/sglang/issues/30555) — DSPARK draft worker inherited `speculative_num_draft_tokens` into its attention backend while proposer emitted `gamma` rows → OOB KV reads.
- [#30556](https://github.com/sgl-project/sglang/issues/30556) — N Options broken.
- [#30442](https://github.com/sgl-project/sglang/issues/30442) — Rename `_biased_grouped_topk_postprocess` for clarity.

**Still open — high severity (correctness):**
- [#38143](https://github.com/sgl-project/sglang/issues/38143) — **MiniMax-M3 W4A16 (compressed-tensors) on 2× DGX Spark (sm_121, TP=2): server runs but every output token is id 0** on the Triton `MiniMaxSparse` path. Same weights produce correct output on vLLM. No fix PR linked; treat as a **blocker for MiniMax-M3 deployments on Blackwell-edge hardware**.
- [#37892](https://github.com/sgl-project/sglang/issues/37892) — **DeepSeek-V4 long-context prefill: illegal memory access in the DSA indexer top-k kernel** (`topk_v1.cuh:348`); paged prefill can never reach the v2 kernel. Repro on standard config.
- [#38031](https://github.com/sgl-project/sglang/issues/38031) — GLM-5.3-Flash (DSA) HiCache host-tier load-back corrupts generation even without speculative decoding → dropped tool calls, degenerate repetition loops on 8×H100/TP8.
- [#36906](https://github.com/sgl-project/sglang/issues/36906) — GLM-5.3-Flash crashes at startup under pipeline parallelism (`KeyError: 'residual'`).
- [#37105](https://github.com/sgl-project/sglang/issues/37105) — GLM-5.3-Flash on RTX PRO 6000 (sm_120): two DSA backend blockers after the `deep_gemm` `NameError`.
- [#38207](https://github.com/sgl-project/sglang/issues/38207) — GLM-5.3 DPC crashes.
- [#29857](https://github.com/sgl-project/sglang/issues/29857) — EAGLE/MTP on hybrid GDN (Qwen3.6-27B NVFP4): KV pool profiler caps capacity far below free VRAM, leaving ~50 GB idle. No fix PR.
- [#37326](https://github.com/sgl-project/sglang/issues/37326) — NEXTN/MTP draft acceptance decays to ~0 over server uptime on Qwen3.8-Flash-Next; restart restores it (likely state-leak in proposer).
- [#33185](https://github.com/sgl-project/sglang/issues/33185) — DeepSeek-V4-Flash-0731: `reasoning_effort` mapped one level off — `high` is a no-op, vendor `max` unreachable.
- [#37524](https://github.com/sgl-project/sglang/issues/37524) — GLM-5.3-Flash master bug tracker (11 sub-issues).

## 6. What This Means for Application Developers

- **Hold off on MiniMax-M3 + DGX Spark (sm_121) W4A16** in production until [#38143](https://github.com/sgl-project/sglang/issues/38143) is resolved — the silent all-zero-output failure mode is particularly dangerous because the server reports healthy.
- **DeepSeek-V4 long-context** deployments should watch [#37892](https://github.com/sgl-project/sglang/issues/37892); until the indexer top-k illegal-access is patched, pin to the v2-routed prefill path where possible (PR [#37889](https://github.com/sgl-project/sglang/pull/37889) is the upstreaming vehicle).
- **GLM-5.3-Flash on RTX PRO 6000** is mid-qualification; track [#37813](https://github.com/sgl-project/sglang/issues/37813) before committing to SM120 production. Expect one or two patch releases this week.
- **Speculative decoding users** benefit from this batch: the `--speculative-adaptive` startup crash ([#30549](https://github.com/sgl-project/sglang/issues/30549)), DSPARK OOB reads ([#30555](https://github.com/sgl-project/sglang/issues/30555)), and Spec v2 + Mamba crash ([#28484](https://github.com/sgl-project/sglang/issues/28484)) are all closed. If you're still on v0.5.13–v0.5.14, bump.
- **AMD/ROCm customers** get meaningful DSV4 capacity gains from [#38192](https://github.com/sgl-project/sglang/pull/38192) and GLM-5.2 throughput from the fused metadata kernels ([#37124](https://github.com/sgl-project/sglang/pull/37124)). Worth benchmarking on MI300X/MI355X fleets.
- **Apple Silicon**: still pre-merge, but the new RFC ([#32321](https://github.com/sgl-project/sglang/issues/32321)) is the most credible path yet — if you have a Mac and want to dogfood, PR [#36164](https://github.com/sgl-project/sglang/pull/36164) is where to test.
- **OpenAI-compatible `max_thinking_tokens`** ([#36750](https://github.com/sgl-project/sglang/pull/36750)): end-to-end wired through `GenerateReqInput`, gated on `--enable-strict-thinking`. Drop-in for stricter reasoning-budget control.
- **MLX + Ascend + Intel XPU + T-Head PPU**: the platform-port surface continues to widen; if you're picking hardware for a new deployment, NPU (Atlas A5) and Intel XPU have the most active day-over-day engineering here.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Daily Digest — 2026-09-07

## 1. Today's Highlights

The day's activity is dominated by **model and performance work**: end-to-end **Spark2_5** support shipped in b10828, **qwen4exp prefill more than doubles** on GB10 via direct PLE-table reads (#28136), and a long-standing **GDN normalization correctness bug** (max → rsqrt) was fixed in b10829. Multiple **CUDA race-condition fixes** (b10826), OpenCL/Metal kernel tuning, and a regression in `--lazy-mode auto` for qwen4exp on Vulkan were all landed in the same window.

## 2. Releases & Breaking Changes

Nine build bumps in 24 hours (b10821–b10830). Most notable deltas:

- **b10830** — New `--fuse-qkv` flag for HF→GGUF conversion; merges Q/K/V projections at convert time. ([#22780](https://github.com/ggml-org/llama.cpp/pull/22780))
- **b10829** — **Correctness fix**: gated delta net (GDN) q/k normalization switched from `max` to `rsqrt` to match `flash-linear-attention`'s `l2norm(x) = x * rsqrt(sum(x*x) + eps)`. ([#28068](https://github.com/ggml-org/llama.cpp/pull/28068))
- **b10828** — Spark2_5 model support ([#27868](https://github.com/ggml-org/llama.cpp/pull/27868)).
- **b10827** — OpenCL: correct weights pack for q4_K / q5_K `mul_mat`. ([#28402](https://github.com/ggml-org/llama.cpp/pull/28402))
- **b10826** — **CUDA race fixes in `mmid` and `mmf`** ([#28475](https://github.com/ggml-org/llama.cpp/pull/28475)).
- **b10825** — Grammar: fix max repetition threshold. ([#28469](https://github.com/ggml-org/llama.cpp/pull/28469))
- **b10823** — New `--log-jsonl` flag for structured JSONL logging. ([#28437](https://github.com/ggml-org/llama.cpp/pull/28437))
- **b10822** — UI assets now embedded directly via CMake (drops external gzip dependency, simplifies cross-compilation). ([#28445](https://github.com/ggml-org/llama.cpp/pull/28445))
- **b10821** — Metal: remaining fa-vec tunings for M2 Max. ([#28458](https://github.com/ggml-org/llama.cpp/pull/28458))

No API-breakage noted; only additive flags and per-kernel correctness/perf fixes.

## 3. New Model & Hardware Support

- **Spark2_5ForCausalLM** — full pipeline: GGUF conversion, architecture registration, tensor mappings, tokenizer pre-tokenizer, inference graphs ([#27868](https://github.com/ggml-org/llama.cpp/pull/27868)).
- **HrmTextForCausalLM (DFM Mimir 1B)** — fused gqkv projection with (gate,q,k,v) order, low/high alternating cycles ([#27625](https://github.com/ggml-org/llama.cpp/pull/27625)).
- **AMD RDNA4 (gfx1200 / gfx1201)** — Q6_K / Q2_K mul_mat fixes and MMVQ warp tuning ([#25940](https://github.com/ggml-org/llama.cpp/pull/25940), [#24386](https://github.com/ggml-org/llama.cpp/pull/24386)); Flash Attention tuning for R9700 PRO ([#28102](https://github.com/ggml-org/llama.cpp/pull/28102)).
- **Qualcomm Hexagon** — batch buffer bounds and strided copy dispatch corrected ([#28516](https://github.com/ggml-org/llama.cpp/pull/28516)).
- **Apple Silicon M2 Max** — final fa-vec tunings ([#28458](https://github.com/ggml-org/llama.cpp/pull/28458)).
- **mtmd sharded mmproj GGUF** — loader now handles split mmproj files correctly ([#28517](https://github.com/ggml-org/llama.cpp/pull/28517)).

## 4. Performance & Optimization

- **qwen4exp prefill >2× on GB10** — direct reads for the lazy PLE table eliminate a major hotspot; "700+ tok/s benchmarks" vs. "300 tok/s real tasks" gap closed ([#28136](https://github.com/ggml-org/llama.cpp/pull/28136)).
- **qwen4exp on Vulkan (AMD iGPU) regression fixed** — `--lazy-mode auto` was halving pp512 since #27837; PR #28326 redefines `auto` = "pick a good mode for the system", moves the old behavior to `large`, adds new `all`. ([#28326](https://github.com/ggml-org/llama.cpp/pull/28326), tracks [#28160](https://github.com/ggml-org/llama.cpp/issues/28160))
- **Sparse flash-attention for DSV4 / GLM** — API-hint-driven sparse FA landed ([#27970](https://github.com/ggml-org/llama.cpp/pull/27970)).
- **KV cache non-contiguous cell restore** — agentic workloads (long Qwen3.5+ sessions) optimized ([#27991](https://github.com/ggml-org/llama.cpp/pull/27991)).
- **R9700 PRO Flash Attention** — prefill at long contexts for Qwen3.8 27B tuned; also fixes a head-size 256 bug in the general CUDA FA path ([#28102](https://github.com/ggml-org/llama.cpp/pull/28102)).
- **RDNA4 MMVQ** — `ncols_dst==1` warp counts tuned for Q4_K / Q6_K on gfx1200 ([#24386](https://github.com/ggml-org/llama.cpp/pull/24386)).
- **RDNA4 mul_mat** — Q6_K, Q2_K fixes and MMQ condition updates ([#25940](https://github.com/ggml-org/llama.cpp/pull/25940)).
- **OpenCL q4_K/q5_K** — proper weights-pack selection for `mul_mat` ([#28402](https://github.com/ggml-org/llama.cpp/pull/28402)).
- **Metal M2 Max** — additional fa-vec tuning entries ([#28458](https://github.com/ggml-org/llama.cpp/pull/28458)).
- **HF→GGUF conversion** — `--fuse-qkv` allows fusing Q/K/V at conversion time, simplifying downstream inference and slightly reducing metadata overhead ([#22780](https://github.com/ggml-org/llama.cpp/pull/22780)).

## 5. Stability & Regressions

Ranked roughly by user impact:

| Severity | Issue | Summary | Fix |
|---|---|---|---|
| High | [#20837](https://github.com/ggml-org/llama.cpp/issues/20837) | Qwen3.5 9B emits XML tool calls and stops mid-output when thinking is enabled (60 comments). | Open |
| High | [#28495](https://github.com/ggml-org/llama.cpp/issues/28495) | With `-np 2` + `--kv-unified`, prompt processing drops **42–54%** from the second long request onward on single-GPU CUDA/HIP. Root cause: unified-KV FA kernels only skip KQ-mask tails, not interior all-`-INF` blocks. | Open |
| High | [#27756](https://github.com/ggml-org/llama.cpp/issues/27756) | Qwen3.5-hybrid 64-layer (Qwen3.8-27B): **silent instant-EOS** beyond ~130k context on both CUDA and CPU; consistent with DeltaNet recurrent-state depth × layer-count degradation. | Open |
| High | [#23577](https://github.com/ggml-org/llama.cpp/issues/23577) | MTP with Qwen3.6 27B outputs repeated `////` after long sessions (CUDA). | Open |
| High | [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) | Greedy speculative decoding (draft-mtp / draft-dspark) **diverges** from vanilla on quantized targets (bf16 matches). Ngram speculation matches. | Open |
| Med | [#26845](https://github.com/ggml-org/llama.cpp/issues/26845) | SYCL: garbage output on the second prompt (Arc Pro B60). | Open |
| Med | [#26382](https://github.com/ggml-org/llama.cpp/issues/26382) | `-ctk q5_1` without `-ctv` errors on models without a V cache (e.g. GLM-5.2). | Open |
| Med | [#27981](https://github.com/ggml-org/llama.cpp/issues/27981) | llama-ui: cannot open reasoning-level selection menu on desktop (b10687). | Open |
| Med | [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) | Vulkan regression: `--lazy-mode auto` halves pp512 for q

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-07

## Today's Highlights
The most significant development is **PR #16998**, which finally lands an opt-in Prometheus-compatible `/metrics` endpoint — addressing a long-standing community request ([#3144](https://github.com/ollama/ollama/issues/3144)) that has accumulated 116 👍 over more than two years. On the stability side, a **regression in the Vulkan backend on AMD iGPUs** was reported for 66 GB model loads since v0.32.12 ([#18272](https://github.com/ollama/ollama/issues/18272)), and several **cloud-served models** (kimi-k2.6, glm-5.3, MiniMax-M3) are exhibiting latency, looping, and JSON-splitting failures that are impacting production agents.

## Releases & Breaking Changes
No new releases in the last 24h. The absence is notable given the volume of regressions reported (Vulkan AMD iGPU, Blackwell flash attention, MLX stop state, gemma4 tool parser) — operators on affected hardware/models should pin to their last-known-good version.

## New Model & Hardware Support
- **New architecture requested:** `spark2_5` for the Spark-X2.5 family (4B / 1.7B) — currently downloads but cannot start inference ([#18195](https://github.com/ollama/ollama/issues/18195)).
- **Tool-call parser gap:** `gemma4:12b` `BEGIN_ARG`/`END_ARG` syntax is unparseable, causing a degenerate `<|channel>thought` loop that returns HTTP 200 with no usable content ([#18275](https://github.com/ollama/ollama/issues/18275)).
- **GLM-OCR fix in flight** — PR [#17195](https://github.com/ollama/ollama/pull/17195) registers `<|user|>` as the EOT token for legacy `glmocr` GGUFs to prevent runaway generation.
- **Hardware coverage notes:** Issues filed against Vulkan/AMD iGPU, MLX/Apple Silicon, and Blackwell sm_120 indicate active testing across all major backends, but regressions remain.

## Performance & Optimization
- **MLX runner prefix-cache tax:** Cache restore is aligned to multiples of 8192 tokens, costing a fixed **17–27 s re-prefill** at the start of every turn following a cold prompt. On Claude Code-class agent workloads against local models, this is a per-turn overhead ([#18267](https://github.com/ollama/ollama/issues/18267)).
- **Context checkpoint fidelity:** PR [#18271](https://github.com/ollama/ollama/pull/18271) wires Go-side renderer message delimiters into llama-server's `/completion` so user-turn checkpoints are placed correctly, enabling more accurate prefix-cache reuse.
- **Observability:** PR [#16998](https://github.com/ollama/ollama/pull/16998) adds an opt-in `OLLAMA_METRICS=1` endpoint emitting `ollama_requests_queued`, `ollama_queue_capacity`, `ollama_models_loaded`, `http_requests_total`, plus per-model token metrics — Prometheus-compatible.
- **License compliance gap:** Issue [#3185](https://github.com/ollama/ollama/issues/3185) (272 👍) remains open — statically linked llama.cpp dependencies are not distributing the required MIT copyright notices in release artifacts.

## Stability & Regressions
Ranked by severity for production operators:

1. **[HIGH] Vulkan/AMD iGPU regression since v0.32.12** — `"Not enough memory for command submission"` on 66 GB models. v0.32.9 works; v0.32.12+ fails. ([#18272](https://github.com/ollama/ollama/issues/18272))
2. **[HIGH] Blackwell sm_120 + qwen3moe flash attention crash** — `ollama run qwen3-coder:30b` exits `0xc0000409` ("shared object initialization failed") after a successful memory fit; auto-enabled FA is the trigger. ([#18276](https://github.com/ollama/ollama/issues/18276))
3. **[HIGH] Cloud latency — kimi-k2.6:cloud** — single `/api/chat` requests hanging 10+ minutes; stream `INTERNAL_ERROR` recurring for days. ([#16845](https://github.com/ollama/ollama/issues/16845))
4. **[MEDIUM] Cloud reasoning split — MiniMax-M3:cloud** — JSON output intermittently split across `message.reasoning` and `message.content`; `content` alone is never valid JSON, breaking structured-output pipelines on the OpenAI-compatible endpoint. ([#17987](https://github.com/ollama/ollama/issues/17987))
5. **[MEDIUM] Cloud reasoning loops — glm-5.3:cloud** — model enters endless reasoning and aborts in OpenCode/ZCode while the official Z.AI API works normally. ([#18193](https://github.com/ollama/ollama/issues/18193))
6. **[MEDIUM] MLX model stuck in "Stopping..."** — `muse-glimmer:30b-mlx` on M4 MacBook Air enters a non-resolving Stopping state even with `OLLAMA_KEEP_ALIVE=30`; one occurrence coincided with a full macOS restart. ([#18269](https://github.com/ollama/ollama/issues/18269))
7. **[LOW] Model name length cap (80 chars)** — blocks long HuggingFace identifiers from being pulled. ([#18274](https://github.com/ollama/ollama/issues/18274))
8. **[LOW] Download progress reversion** — long-standing closed report [#8484](https://github.com/ollama/ollama/issues/8484); worth noting as users still hit it intermittently on flaky networks.

Fix PRs are present for: metrics observability (PR [#16998](https://github.com/ollama/ollama/pull/16998)), checkpoint placement (PR [#18271](https://github.com/ollama/ollama/pull/18271)), glm-ocr EOT (PR [#17195](https://github.com/ollama/ollama/pull/17195)), and Windows tray UX (PR [#18273](https://github.com/ollama/ollama/pull/18273)). No fix PRs are yet visible for the Vulkan AMD regression, the Blackwell FA crash, or the cloud model failures.

## What This Means for Application Developers
- **Don't chase head on `:cloud` tags for agentic JSON contracts yet.** MiniMax-M3:cloud is splitting structured output across reasoning/content fields, and glm-5.3:cloud is looping until abort. If you depend on deterministic tool calls, prefer local serving or fall back to vendor APIs until these stabilize.
- **Pin your Ollama version carefully.** If you serve large models on **AMD iGPUs via Vulkan**, stay on **v0.32.9**. If you run **qwen3-coder:30b on Blackwell laptops**, expect a flash-attention crash on warmup — disable FA or use an alternative tag until [#18276](https://github.com/ollama/ollama/issues/18276) is resolved.
- **Agent loops on MLX are paying a 17–27 s tax per turn** after every cold prompt ([#18267](https://github.com/ollama/ollama/issues/18267)). If you're building local agents on Apple Silicon, design for warm-cache continuity or batch turns aggressively.
- **Observability is coming.** When PR [#16998](https://github.com/ollama/ollama/pull/16998) merges behind `OLLAMA_METRICS=1`, you can wire `ollama_requests_queued`, `http_requests_total`, and per-model token counters into Prometheus — plan your SLO instrumentation around request-queue depth, which is the strongest leading indicator of cloud-side degradation.
- **Tool-call compatibility is uneven.** gemma4's native tool format isn't yet parseable; validate that your chosen model tag has a working parser before shipping agent integrations that rely on it.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-07

## 1. Today's Highlights

LiteLLM ships **v1.100.0** (stable) and the first **v1.101.0-rc.1** release candidate, with the focus areas being LLM-translation correctness (Anthropic refusal blocks, Bedrock file deletion, cache-control injection, and `custom_cost_per_token` double-billing). On the platform side, a new **Foundry Local** provider lands, **Bedrock Mantle Responses** gets SigV4/IAM auth, and several long-standing proxy staleness issues get rotated out — but a fresh wave of cost-tracking and budget-enforcement bugs (#40006, #40050, #39979) suggests spend/billing plumbing remains the riskiest layer for production tenants.

## 2. Releases & Breaking Changes

- **[v1.100.0](https://github.com/BerriAI/litellm/releases/tag/v1.100.0)** — latest stable. Docker images signed with cosign (key from commit `0112e53`).
- **[v1.101.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.1)** — first release candidate on the 1.101 line. Worth tracking if you pin to release candidates for early visibility on translation fixes.

No explicit breaking-change notes are visible in the release snippets, but the cache-cost double-billing fix (#40006 area) and the `/config/reload` 404 (#30772) on `main-stable` indicate that database-backed deployments should validate spend math after upgrading.

## 3. New Model & Hardware Support

- **Foundry Local provider** — PR [#29449](https://github.com/BerriAI/litellm/pull/29449) adds `foundry_local/` as a first-class OpenAI-compatible provider, including dashboard metadata, docs, and the official logo. Useful for local-first inference on Windows/edge.
- **OpenRouter Qwen + cache_control** — PR [#29335](https://github.com/BerriAI/litellm/pull/29335) restores `cache_control` / `cache_control_injection_points` parameters that were being stripped from OpenRouter Qwen payloads (closes #29322).
- **DashScope Qwen 3.6/3.7 pricing gap** — Issue [#29922](https://github.com/BerriAI/litellm/issues/29922) (👍 2) flags missing pricing data in `model_prices_and_context_window.json`, causing `$0` cost entries for several Qwen models. Affects any team using `dashscope/*` wildcards.
- **Qwen3.8-27B-FP8 reasoning_effort** — Issue [#37359](https://github.com/BerriAI/litellm/issues/37359) (👍 7, highest community signal) reports `reasoning_effort` is not configurable on Qwen3.8-27B-FP8 through LiteLLM, despite the model supporting it natively. Worth a 👍/watch if you use this SKU.
- **Azure AI MAI image generation** — PR [#40074](https://github.com/BerriAI/litellm/pull/40074) hardens MAI image requests: rejects `n>1` (provider silently returns 1 image) and removes unsupported `size` values up front instead of letting them surface as opaque 400s.

## 4. Performance & Optimization

- **Rust CI flake remediation** — PR [#40073](https://github.com/BerriAI/litellm/pull/40073) serializes retained-callback tests to eliminate a ~20% flake on the `LiteLLM Rust > release wheel` job (race against `gc.collect`). No user-facing perf change, but it unblocks the Rust release artifact pipeline.
- **Router fallback correctness** — PR [#27462](https://github.com/BerriAI/litellm/pull/27462) deep-copies `kwargs` per fallback attempt (fixes #24764), preventing state bleed between fallback hops that could otherwise produce incorrect retries or stuck model selection.
- **Adaptive router state reload** — PR [#29398](https://github.com/BerriAI/litellm/pull/29398) merges persisted deltas onto the cold-start Beta prior on reload instead of overwriting it, fixing a `gammavariate: alpha and beta must be > 0.0` 500 after proxy restarts (#29397).

## 5. Stability & Regressions

Ranked by user-visible impact. "Fix PR" noted where one is open/merged.

| Severity | Item | Status | Fix |
|---|---|---|---|
| 🔴 High | [#40050](https://github.com/BerriAI/litellm/issues/40050) `/v1/messages` (Claude Code) throws false "Budget has been exceeded" — enforced cost is reported far above actual spend, locking keys out at 429 | OPEN | None yet |
| 🔴 High | [#40006](https://github.com/BerriAI/litellm/issues/40006) `custom_cost_per_token` with `cache_read_input_token_cost` bills Anthropic cache-read tokens **twice** | OPEN | None yet |
| 🔴 High | [#39715](https://github.com/BerriAI/litellm/issues/39715) `DELETE /v1/files/{file_id}` returns 500 on Bedrock — managed files are un-deletable | OPEN | None yet |
| 🟠 Med  | [#39979](https://github.com/BerriAI/litellm/issues/39979) Request Logs date-range picker treats local times as UTC, silently shifting windows for non-UTC operators | OPEN | None yet |
| 🟠 Med  | [#30772](https://github.com/BerriAI/litellm/issues/30772) `POST /config/reload` returns **404** on `litellm-database:main-stable` (June 2026 image) | OPEN | None yet |
| 🟠 Med  | [#39721](https://github.com/BerriAI/litellm/issues/39721) Anthropic `/v1/messages` pass-through silently drops OpenAI Responses `refusal` content blocks into an empty array | CLOSED (stale) | Incoming |
| 🟠 Med  | [#26552](https://github.com/BerriAI/litellm/issues/26552) `POST /v1/images/edits` with `mask` through proxy → OpenAI errors with "Attempted to access streaming request content, without having called read()" | OPEN (stale, oldest still-open issue in this list) | None yet |
| 🟡 Low  | [#29912](https://github.com/BerriAI/litellm/issues/29912) Internal-user `max_budget` blocks zero-cost models — `_PROXY_MaxBudgetLimiter` ignores `skip_budget_checks` | OPEN | PR [#29918](https://github.com/BerriAI/litellm/pull/29918) open |
| 🟡 Low  | [#29261](https://github.com/BerriAI/litellm/issues/29261) Interactive OAuth2 MCP server returns 500 instead of 401+`WWW-Authenticate` when only `x-litellm-api-key` is present | CLOSED (stale) | — |
| 🟡 Low  | [#29911](https://github.com/BerriAI/litellm/issues/29911) Information disclosure — `/model/info` returns full model config to unauthenticated callers (security) | OPEN | None yet |
| 🟡 Low  | [#29810](https://github.com/BerriAI/litellm/issues/29810) `cache_control_injection_points` on `/v1/responses` is a no-op AND triggers a Claude tool-call loop until `MaxTurns` | OPEN | None yet |

## 6. What This Means for Application Developers

- **Audit your spend math on Anthropic + cached tokens.** [#40006](https://github.com/BerriAI/litellm/issues/40006) means if you've set `custom_cost_per_token.cache_read_input_token_cost`, your reported cost on cache-hit responses is roughly 2× the real cost. If you bill end-users on LiteLLM's `spend` log, this is a customer-trust issue — not a finance rounding error.
- **Don't trust `max_budget` enforcement as an absolute ceiling for Claude Code keys.** [#40050](https://github.com/BerriAI/litellm/issues/40050) shows keys can be locked out well before real spend approaches the limit. Until this is fixed, build client-side retry/backoff logic that detects 429 + "Budget" and forces a manual check rather than treating it as a hard policy.
- **Bedrock managed-file workflows are leaking storage.** [#39715](https://github.com/BerriAI/litellm/issues/39715) means your S3-backed Bedrock files can't be cleaned up via the OpenAI-compatible `DELETE /v1/files/{id}`. Build cleanup directly against the Bedrock control plane if you depend on file lifecycle.
- **Skip `/config/reload` on `litellm-database:main-stable`.** Until [#30772](https://github.com/BerriAI/litellm/issues/30772) is resolved, plan a rolling restart for config changes on the database build rather than relying on the reload endpoint.
- **The admin UI has a low-severity, unauthenticated information-leak on `/model/info`** ([#29911](https://github.com/BerriAI/litellm/issues/29911)). If your proxy is exposed beyond a trusted boundary, front it with an auth layer that blocks this path, or restrict at the ingress.
- **The `/v1/responses` cache-control path is broken for Claude backends** ([#29810](https://github.com/BerriAI/litellm/issues/29810)). If you use `cache_control_injection_points` with the OpenAI Agents SDK against Claude, disable injection points or you risk runaway `MaxTurns` loops and zero cache reuse.
- **Pin to `v1.100.0` over RC** unless you specifically need a 1.101-rc-only fix; the 1.100 line has the most battle-testing from the 1.99.x rollout.
- **Watch for #40050 / #40006** to land in 1.101.x — both are high-impact enough that the maintainers are likely to cut a patch release once a fix is merged.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-07

## 1. Today's Highlights

The dominant theme is **KV-cache preemption** for the bundled llama-server: a pair of stacked PRs ([#10301](https://github.com/unslothai/unsloth/pull/10301), [#10358](https://github.com/unslothai/unsloth/pull/10358)) rework how parallel Studio chats share a single server, pairing with upstream `unslothai/llama.cpp#184`/`#190` to let the server park slots in host RAM. On the platform side, **DGX Spark** gets a two-node serving orchestrator with an async replica router ([#10323](https://github.com/unslothai/unsloth/pull/10323)) and **Windows on ARM NVIDIA hosts** (GB10 / N1X) finally get a native ARM64 CUDA stack ([#10282](https://github.com/unslothai/unsloth/pull/10282)). AMD Strix Halo (gfx1150/1151) is routed to the Vulkan llama.cpp prebuilt over ROCm after measured wins ([#10381](https://github.com/unslothai/unsloth/pull/10381)).

## 2. Releases & Breaking Changes

No new releases in the last 24h. No version-tagged API or config changes to report.

## 3. New Model & Hardware Support

- **DGX Spark two-node paired topology** — Studio/Desktop now picks one of three topologies from `spark_cluster.recommend_topology` and routes across both Sparks asynchronously. Stacked on `feature/dgx-spark-two-node`. [#10323](https://github.com/unslothai/unsloth/pull/10323)
- **Windows on ARM with NVIDIA GPUs** — Native ARM64 CUDA stack installed on GB10 / N1X hosts; no change to non-NVIDIA or non-ARM paths. [#10282](https://github.com/unslothai/unsloth/pull/10282)
- **AMD Strix Halo (gfx1150/gfx1151) → Vulkan prebuilt** — Detection now installs Vulkan llama.cpp instead of ROCm on these parts; existing ROCm installs are offered the swap via the update banner. [#10381](https://github.com/unslothai/unsloth/pull/10381)
- **Apple Silicon MLX on fresh installs** — The MLX dependency step is restored when `SKIP_STUDIO_BASE=1` is not used, so Train/Export no longer land disabled. [#10403](https://github.com/unslothai/unsloth/pull/10403)
- **aarch64 container images** — Open feature request for official ARM64 container images; xformers-from-source is a known pain point on aarch64 clusters. [#4198](https://github.com/unslothai/unsloth/issues/4198)
- **Aged model-support tickets** (closed, no new code) — `gpt-oss-20b` GGUF tensor-type failures [#3124](https://github.com/unslothai/unsloth/issues/3124), `gemma-4-12b-it` UD-Q4_K_XL on 16 GB [#6022](https://github.com/unslothai/unsloth/issues/6022), Gemma3 fine-tuning `Missing required positional argument` [#3996](https://github.com/unslothai/unsloth/issues/3996), `GptOssTopKRouter` missing `weight` attribute [#3729](https://github.com/unslothai/unsloth/issues/3729).

## 4. Performance & Optimization

- **KV preemption (parallel chats)** — One llama-server launched with `--parallel N --kv-unified -c N` gives N slots a shared pool of N cells, but currently only polices `prompt_tokens < slot.n_ctx`. PR #10301 introduces Studio-side preemption so independent chats don't kill each other. [#10301](https://github.com/unslothai/unsloth/pull/10301)
- **Server-side parking via `--preempt-ram`** — Pairs with `unslothai/llama.cpp#184`/`#190`. When the server can park a slot in host RAM itself, Studio stands its own preemption down and lets every chat use the full context. [#10358](https://github.com/unslothai/unsloth/pull/10358)
- **Strix Halo Vulkan > ROCm** — Measured on a Radeon 8060S CI runner; numbers are summarized in #10381 but the PR body is the place to look for the per-workload breakdown. [#10381](https://github.com/unslothai/unsloth/pull/10381)
- **Integrated-GPU prompt cache** — On a Strix Halo log bundle, leaving the llama-server prompt cache off cost a user **44 hours** in a 48.8-hour session. #10382 keeps it on for integrated-GPU full-offload (the discrete-GPU trade from #5692 is preserved). [#10382](https://github.com/unslothai/unsloth/pull/10382)
- **Kaggle CI runner time** — Measured on the two-account path: T4 smoke held a runner for **41.5 min** with ~4 min of useful work. New PR dispatches the kernel and collects later instead. [#10183](https://github.com/unslothai/unsloth/pull/10183)
- **Single uv cache for install + backend** — Three places pick a uv cache; only two agree today. The `unsloth studio update` path is brought in line. [#10386](https://github.com/unslothai/unsloth/pull/10386), [#10410](https://github.com/unslothai/unsloth/pull/10410)

## 5. Stability & Regressions

**Open (not yet fixed)**

- **Qwen3.5 9B never reaches first step; Gemma 4 26B-A4B OOM with batch size 1 on 96 GB** — Cloud, RTX Pro 6000. **High severity** because a 96 GB box can't run batch=1 QLoRA. [#7203](https://github.com/unslothai/unsloth/issues/7203)
- **Ollama integration in Studio** — `source` field is wrong, schema crashes, models are almost always withheld from inventory on a normal `~/.ollama` directory. **High severity** for desktop users. [#9986](https://github.com/unslothai/unsloth/issues/9986)
- **Code integrity / Smart App Control** — Studio installs and launches, then `llama-server.exe` is blocked as a "Bad Image" until Smart App Control is disabled; returns after reboot. New PR adds a Windows probe and CI bundle-signature audit. [#10408](https://github.com/unslothai/unsloth/pull/10408)
- **torchcodec vs torch 2.11** — Fresh NVIDIA install on `main` ends with a torchcodec that doesn't match torch; the existing compatibility guard stays silent. PR covers torch 2.11 and pins per torch minor. [#7474](https://github.com/unslothai/unsloth/pull/7474)

**Closed (fix landed or staged)**

- **push_to_ollama TypeError** — Called `create_ollama_modelfile()` with a removed `gguf_location` kwarg and missing required ones. PR #10304 aligns the signature. [#10304](https://github.com/unslothai/unsloth/pull/10304)
- **Apple Silicon MLX self-heal into `--no-torch`** — Runtime was reinstalling MLX on a `--no-torch` (GGUF-only) install. PR #10409 makes `--no-torch` truly torch-free. [#10409](https://github.com/unslothai/unsloth/pull/10409)
- **DGX Spark "No GPU detected"** — Closed. [#3553](https://github.com/unslothai/unsloth/issues/3553)
- **Qwen3-235B training — Triton CPU-tensor error** — Closed. [#4137](https://github.com/unslothai/unsloth/issues/4137)
- **Qwen3.5 packing → unstable grads (NaN at step 1)** — Closed. [#4160](https://github.com/unslothai/unsloth/issues/4160)
- **llama-cpp-python / Ollama local save support** — Closed. [#3762](https://github.com/unslothai/unsloth/issues/3762)
- **Studio UI freezes when opening menus** — Sidebar, chat row, and project menus locked the page (scrollbar jumps, screen readers told the rest of the app is hidden). PR #10262 fixes. [#10262](https://github.com/unslothai/unsloth/pull/10262)
- **Composer send/stop icon misaligned on non-Retina** — Fixed; offsets removed, flex centering retained. [#10407](https://github.com/unslothai/unsloth/pull/10407) (and the earlier variant [#10405](https://github.com/unslothai/unsloth/pull/10405))
- **Windows installer fails on CPU-only** — Both default and `--no-torch` paths broke on `unsloth studio setup`. Closed. [#5008](https://github.com/unslothai/unsloth/issues/5008)
- **Docker volume docs** — Corrected. [#4396](https://github.com/unslothai/unsloth/issues/4396)
- **VLM training `PY_SSIZE_T_CLEAN` inductor error** — Closed. [#2230](https://github.com/unslothai/unsloth/issues/2230)
- **DeepSeek-OCR local load failure** — Closed. [#3670](https://github.com/unslothai/unsloth/issues/3670)
- **Nemotron 3 Nano LoRA merge failure** — Closed. [#3854](https://github.com/unslothai/unsloth/issues/3854)

## 6. What This Means for Application Developers

- **Concurrent chat UX in Studio is about to change.** With KV preemption rolling out, parallel chats will compete for a single shared KV pool rather than each claiming `n_ctx`. Plan for slot-based admission control and visible preemption events in your agents; if you build on top of Studio, expect `--preempt-ram` to become the default on capable llama-server builds.
- **Target hardware is widening meaningfully.** Windows on ARM NVIDIA laptops (GB10/N1X) and DGX Spark pairs are first-class targets now. If you're shipping a fine-tuning or local-inference product on edge ARM, the aarch64 container thread ([#4198](https://github.com/unslothai/unsloth/issues/4198)) is worth watching. On Strix Halo, prefer the Vulkan llama.cpp build.
- **Apple Silicon users: don't combine `--no-torch` with the MLX runtime self-heal.** The fix in #10409 makes the install honor "GGUF-only" cleanly — re-run a clean install if you've been seeing MLX appear unexpectedly.
- **Several long-standing training bugs (Qwen3.5 packing, GptOssTopKRouter, Gemma3, Qwen3-235B) are now closed.** Re-test on the latest `unsloth` + `unsloth_zoo` before assuming your workaround is still needed; especially for Qwen3.5 packing and Qwen3-235B.
- **Ollama + Studio path is still shaky** ([#9986](https://github.com/unslothai/unsloth/issues/9986)). Until #10304 lands and the schema/inventory issues are resolved, treat local Ollama inventory as best-effort.
- **Windows + Smart App Control is a known failure mode** for `llama-server.exe`. On fresh Windows installs, expect to either disable Smart App Control or wait for the signed-bundle fix in #10408.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-07

## Today's Highlights
A focused day for the project: one open PR addresses a UX defect where the model catalog fails to populate when editing an existing Claude Code provider, while two freshly reported issues surface reliability concerns — a 502 Bad Gateway from the local `/v1/responses` endpoint and a startup failure caused by a hardcoded 5s config-acceptance timeout that conflates parent event-loop congestion with child process readiness. No releases shipped in the last 24h.

## Releases & Breaking Changes
No new releases in the last 24h.

## New Model & Hardware Support
No new model, architecture, or backend support announced in this window.

## Performance & Optimization
No performance or optimization work landed in the last 24h. However, [#1761](https://github.com/musistudio/claude-code-router/issues/1761) implicitly calls out a latency/responsiveness concern: the 5000ms hardcoded wait for the child gateway to accept runtime config is itself a perf-related code smell (synchronous-style timeout in an async startup path, no jitter/retry/backoff).

## Stability & Regressions
Ranked by likely impact:

1. **[HIGH] [#1761 — Gateway fails to start under load](https://github.com/musistudio/claude-code-router/issues/1761)** — On a moderately loaded host, the managed core gateway on port 3456 fails every restart/boot, while the web/management server on port 3458 comes up fine. Root cause is the hardcoded 5s `Core gateway did not accept runtime config within 5000ms` check, which fires when the parent event loop is congested rather than when the child is actually unhealthy. No fix PR exists yet. This is a systemic reliability issue for anyone running the managed gateway on busy hosts.

2. **[MEDIUM] [#1762 — 502 Bad Gateway on `/v1/responses`](https://github.com/musistudio/claude-code-router/issues/1762)** — `codex: unexpected status 502 Bad Gateway: Unknown error, url: http://127.0.0.1:3456/v1/responses`. Likely correlated with #1761 (upstream gateway unhealthy), but reported as a separate symptom. Worth tracking to see if it resolves once the gateway-startup issue is addressed, or whether there's an independent routing/upstream handling bug. No fix PR exists yet.

3. **[LOW] [#1763 — Provider model list empty when editing](https://github.com/musistudio/claude-code-router/issues/1763)** *(fix in flight)* — When editing an existing Claude Code (local agent) provider, the model dropdown comes back empty even though it populated correctly on initial creation. Fix PR [#1763](https://github.com/musistudio/claude-code-router/pull/1763) by `diogomcd` is open and addresses two combined defects in the edit flow.

## What This Means for Application Developers

- **Don't rely on the managed gateway's 5s readiness window.** If you run the router on a loaded box (CI runners, shared VMs, hosts under memory pressure), expect intermittent startup failures. Until [#1761](https://github.com/musistudio/claude-code-router/issues/1761) is resolved, prefer launching the core gateway as a standalone process under your own supervisor (systemd/pm2) rather than relying on the embedded startup path.
- **Treat 502s from `/v1/responses` as a gateway-health signal first.** Before debugging downstream codex/provider configuration, verify the core gateway on port 3456 is actually up and accepting config — [#1762](https://github.com/musistudio/claude-code-router/issues/1762) may be a symptom of [#1761](https://github.com/musistudio/claude-code-router/issues/1761) rather than an upstream routing issue.
- **Watch the PR [#1763](https://github.com/musistudio/claude-code-router/pull/1763) merge for smoother provider editing.** If you currently avoid the "edit existing provider" path because models don't reload, the fix removes that workaround. Two defects combined to cause it, so reviewers should confirm both are addressed before adopting.
- **No release to upgrade to today** — pin your existing version and watch for a patch release once #1761/#1762 are resolved, given they affect core startup reliability.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-07

## Today's Highlights

CC Switch saw heavy issue traffic around **Codex proxy correctness** — particularly tool-call ID handling, empty `thinking` blocks, and image-only tool outputs that orphan subsequent turns on upstreams lacking vision support. On the bright side, the long-standing data-loss issue where CC Switch overwrote `~/.claude/settings.json` on startup has been **closed** (#1198), and a meaningful performance win landed for the in-app "About" page, which previously pulled ~55 MB of npm packument payloads and now hits the lightweight dist-tags endpoint (~3.3 KB total).

## Releases & Breaking Changes

No releases were tagged in the last 24 hours. The current shipping line is **v3.20.1**, which carries at least one open regression — see #7156 below — so users on the latest build should weigh holding back or applying workarounds until the fix lands.

## New Model & Hardware Support

- **GPT-6 Astra pricing** seeded in the built-in pricing table (PR [#7162](https://github.com/farion1231/cc-switch/pull/7162)) — USD 10/M in, 50/M out, 1/M cache-read, 12.5/M cache-write. Combined with #7129 being closed, GPT-6 should now be routable.
- **Gemini 3.8 Flash pricing** added (PR [#7164](https://github.com/farion1231/cc-switch/pull/7164)) — USD 0.75/M in, 3.75/M out, 0.075/M cache-read.
- **GLM-5.3 Flash pricing** added at list price (PR [#7163](https://github.com/farion1231/cc-switch/pull/7163)); GLM-5.3 flagship pricing was closed earlier via PR [#6591](https://github.com/farion1231/cc-switch/pull/6591).
- **GitHub Copilot managed-account provider for Codex** with capability-driven Responses/Chat routing (PR [#7157](https://github.com/farion1231/cc-switch/pull/7157)).
- **Grok account profiles** with separate credentials, plus Windows-friendly Codex usage imports (PR [#6792](https://github.com/farion1231/cc-switch/pull/6792)).
- **Tencent Pi presets** for TokenHub PAYG and Token Plan subscription lines (PR [#7159](https://github.com/farion1231/cc-switch/pull/7159)).
- **Vendor-catalog fix** so unknown DeepSeek variants (e.g. `deepseek-v4-flash-vision-exp`) inherit correct `input_modalities` rather than being mis-cloned from the text-only flagship (PR [#6750](https://github.com/farion1231/cc-switch/pull/6750)).

## Performance & Optimization

- **About-page version checks** migrated from full npm packument fetches to `/-/package/{pkg}/dist-tags`. For 6 npm tools this drops aggregate payload from ~55 MB to ~3.3 KB and removes serial-request latency (PR [#6191](https://github.com/farion1231/cc-switch/pull/6191)).
- **Tray UX**: left-click on the tray icon now opens the main window directly in normal mode; lightweight mode keeps left+right = menu (PR [#7153](https://github.com/farion1231/cc-switch/pull/7153), closed — fixes #7118).
- **Local-routing autostart** toggle (PR [#7120](https://github.com/farion1231/cc-switch/pull/7120)) — Clash-style `proxy_restore_on_startup` persistence, default off.

## Stability & Regressions

**High severity (open)**

- [#7156](https://github.com/farion1231/cc-switch/issues/7156) — **v3.20.1 regression**: Codex sub-agent tool calls against DeepSeek (via tokenrhythm.studio) return HTTP 400 because the proxy-rewritten `tool_call_id` is "too short." Reproduces on every sub-agent invocation; single-turn is fine. No fix PR yet.
- [#6697](https://github.com/farion1231/cc-switch/issues/6697) — Codex image-only `tool` outputs are silently dropped on vision-less upstreams, leaving orphan `tool_calls` and bricking the session with persistent 400s.
- [#6260](https://github.com/farion1231/cc-switch/issues/6260) — Proxy writes empty `thinking` blocks back into the Codex session history; the next turn uploads them and the upstream rejects with "thinking length insufficient."
- [#4973](https://github.com/farion1231/cc-switch/issues/4973) — **v3.16.5 regression**: Codex → SenseNova on `deepseek-v4-flash` yields HTTP 400 `invalid tool_call_id`. v3.16.4 was clean. Fix candidate: PR [#6175](https://github.com/farion1231/cc-switch/pull/6175) was merged for adjacent media-replacement content-shape issues but does not cover this report.
- [#5096](https://github.com/farion1231/cc-switch/issues/5096) — Claude Desktop → Aliyun Bailian hangs ~150s before failing because the proxy only tries dead IPv6 addresses on the NLB endpoint; no happy-eyeballs fallback.
- [#4752](https://github.com/farion1231/cc-switch/issues/4752) — Codex models frequently exceed retry limit with `429 Too Many Requests`. No upstream or local rate-budget mitigation surfaced yet.
- [#5609](https://github.com/farion1231/cc-switch/issues/5609) — Linux Wayland launches crash with `EGL_BAD_PARAMETER` (Tauri/WebKit GPU init). Reproducible; no fix.
- [#7084](https://github.com/farion1231/cc-switch/issues/7084) — Codex usage sync breaks when the parent thread is paginated: forked child agents are permanently reported as "parent rollout not yet written," dropping all GPT-5.6-Sol usage.

**Medium severity (open)**

- [#5116](https://github.com/farion1231/cc-switch/issues/5116) — Responses→Chat Completions conversion produces malformed payloads for large/complex `tool_call` arguments, returning `400 InvalidParameter`.
- [#5099](https://github.com/farion1231/cc-switch/issues/5099) — Editing a provider's `base_url` doesn't sync `provider_endpoints.url`, so the model-list/test requests keep hitting the old address.
- [#5042](https://github.com/farion1231/cc-switch/issues/5042) — Custom provider with self-signed HTTPS cert returns 502 (proxy doesn't honor a trust override).
- [#5461](https://github.com/farion1231/cc-switch/issues/5461), [#6967](https://github.com/farion1231/cc-switch/issues/6967) — Generic GLM and unspecified error reports; no clear root cause yet.
- [#6697](https://github.com/farion1231/cc-switch/issues/6697), [#6260](https://github.com/farion1231/cc-switch/issues/6260) — see above.

**Closed in last 24h**

- [#1198](https://github.com/farion1231/cc-switch/issues/1198) — **CC Switch overwrote `~/.claude/settings.json` on launch**, dropping user hooks/permissions/contextFiles. 16 comments, 9 👍. Closing this is the single biggest user-data safety win of the cycle.
- [#7140](https://github.com/farion1231/cc-switch/issues/7140) — WSL Pi install: app launched but reported no models.
- [#7129](https://github.com/farion1231/cc-switch/issues/7129) — "Can't use gpt 6" — resolved alongside the GPT-6 Astra pricing seed (#7162).
- [#5876](https://github.com/farion1231/cc-switch/issues/5876) — Kimi coding plan unable to map `opus-5`.
- [#4605](https://github.com/farion1231/cc-switch/issues/4605) — Request for a Codex trace-log off-skill.
- [#5530](https://github.com/farion1231/cc-switch/issues/5530) — Multi-Codex-account generic-config improvements.
- [#6570](https://github.com/farion1231/cc-switch/issues/6570) — Make local environment checks flexible.
- Closed PRs: [#5882](https://github.com/farion1231/cc-switch/pull/5882) (expose `claude-opus-5` in takeover), [#6175](https://github.com/farion1231/cc-switch/pull/6175) (SenseNova image content-array wrapping), [#6591](https://github.com/farion1231/cc-switch/pull/6591) (GLM-5.3 flagship pricing), [#7153](https://github.com/farion1231/cc-switch/pull/7153) (tray click behavior).

## Notable In-Progress Work

- **Cross-provider subagent routing in takeover mode** (PR [#7165](https://github.com/farion1231/cc-switch/pull/7165)) — flagship upstream for the main thread, cheap upstream (e.g. GLM flash) for `subagent` work; today takeover routes the whole session to one provider.
- **Gemini Native Part-level `thoughtSignature` + Codex `thought_signature` backfill** (PR [#7143](https://github.com/farion1231/cc-switch/pull/7143)) — supersedes #5298; aims to make Gemini 2.5/3.x work cleanly under Claude Code/Desktop and Codex CLI/Desktop.
- **Named/colored Skill groups** with per-app toggles (PR [#7008](https://github.com/farion1231/cc-switch/pull/7008)).
- **Opt-in Claude Code steer-message rectifier** on Chat Completions routes — default off, converts matching `system` steer blocks to `user` while preserving order (PR [#7167](https://github.com/farion1231/cc-switch/pull/7167), refs #7166).
- **Unix env-var path with embedded colons** fixed for delete/restore (PR [#7170](https://github.com/farion1231/cc-switch/pull/7170)).
- **Usage importer: recover model name** when Anthropic-compatible gateways echo empty `model` in `message_start` (PR [#7161](https://github.com/farion1231/cc-switch/pull/7161), fixes #7160).
- **Portuguese-BR localization** (PR [#7046](https://github.com/farion1231/cc-switch/pull/7046)).
- [#7171](https://github.com/farion1231/cc-switch/issues/7171) — Antigravity support requested.

## What This Means for Application Developers

- **Pin carefully around v3.20.1**: if your agent workflow leans on Codex sub-agents against DeepSeek or any upstream that is strict about `tool_call_id` length, the unfixed #7156 will hard-fail every tool call. Track #7156/#4973 and either pin to v3.20.0 or plan a contingency model.
- **Guard the conversation history**: two open bugs (#6260 empty-thinking, #6697 orphan-image tool calls) mean a single misbehaving turn can permanently poison a Codex session. If you script Codex, add a defensive session reset on the first 400 with these signatures, rather than retrying indefinitely.
- **IPv6-only upstreams are a real footgun**: if you proxy through Aliyun Bailian or any NLB-fronted provider (#5096), configure your resolver to prefer IPv4 or add happy-eyeballs — CC Switch will not save you from a 150s hang today.
- **Settings.json is now safe to live alongside CC Switch again** (#1198 closed). If you'd previously advised users to back up `~/.claude/settings.json` before launching CC Switch, you can relax that guidance, but still recommend a one-time backup for users who run other tools that touch the same file.
- **Cost-optimization story is getting sharper**: cross-provider subagent routing (#7165) plus the new GitHub Copilot (#7157) and Grok (#6792) account profiles mean you can put cheap flash models on subagents and keep a flagship on the main thread — plan your routing config for that world even before #7165 lands.
- **Pricing/cost dashboards are mostly current**: GLM-5.3, GLM-5.3 Flash, Gemini 3.8 Flash, and GPT-6 Astra now have seed rows — your cost calculators can include them without manual entry.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-07

## 1. Today's Highlights

The rc.34 release ships a comprehensive **account-security overhaul**: unified login/sensitive-op verification, TOTP+Passkey mutual-factor pairing, full system-token lifecycle (view/rotate/revoke/audit), and migration of Telegram login to a unified OAuth flow that requires admin reconfiguration in BotFather. Separately, a **critical billing bug (#7229)** — image tokens being double-charged on cache hits — was reported and already has a fix PR (#7230) ready, and a per-channel **TTFB timeout with automatic fallback (#7228)** is in review to address long-stall streaming failures.

## 2. Releases & Breaking Changes

- **[v1.0.0-rc.34](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.34)** — Account security milestone.
  - Unifies login and sensitive-op verification flows.
  - TOTP + Passkey act as backup factors for each other.
  - System access tokens gain view/rotate/revoke + access log; independent audit log introduced.
  - **Breaking**: Telegram login moved to unified OAuth. Admins must register `/oauth/telegram` in the BotFather Login Widget and supply Client ID/Secret.
  - One-time scope-bound step-up proof required for account deletion, binding, password change, Passkey/2FA enrollment, and channel-key viewing — tied to the originating session.

## 3. New Model & Hardware Support

- **GPT-6 Astra** — per-model capability handling (PR [#7211](https://github.com/QuantumNous/new-api/pull/7211), merged): explicit token field, `developer` role and sampling rules; `temperature` cleared for Astra. Future GPT majors are no longer inferred from the GPT-5 prefix.
- **Gemini 3.8 Flash** — variant regression on rc.33 closed ([#7220](https://github.com/QuantumNous/new-api/issues/7220)).
- **GPT-5.2 / `openai/gpt-5.2`** — relay bug where `role:system` was forcibly rewritten to `role:developer` (causing upstream errors) reported in [#2542](https://github.com/QuantumNous/new-api/issues/2542), closed.

No new hardware backends (CUDA/ROCm/Metal/CPU) or quantization formats in this window.

## 4. Performance & Optimization

- **Deep-copy batching for `RawMessage`** (PR [#7221](https://github.com/QuantumNous/new-api/pull/7221), merged): reduces per-request allocation cost in the Responses path; landing was split across a follow-up commit by the repo owner.
- **Per-channel TTFB timeout + auto-fallback** (PR [#7228](https://github.com/QuantumNous/new-api/pull/7228), open): when upstream sends headers but stalls before first byte, request is failed over rather than waiting on the much longer overall stream timeout — addresses a tail-latency footgun rather than raw throughput.
- **Channel cache / ability alignment** (PR [#6997](https://github.com/QuantumNous/new-api/pull/6997), merged): unifies in-memory channel index with `Ability.enabled` semantics; eliminates the divergent-channel-selection path when a single group/model ability is disabled.
- **Active-channel probe switch + refined throttling** (PR [#7161](https://github.com/QuantumNous/new-api/pull/7161), open): allows operators to disable background probing and tune probe traffic.

## 5. Stability & Regressions

Ranked by severity:

| Severity | Issue | Status | Notes |
|---|---|---|---|
| 🔴 Critical | [#7229](https://github.com/QuantumNous/new-api/issues/7229) — image-cache hits **double-billed** for image tokens on rc.30 | OPEN | Fix ready in PR [#7230](https://github.com/QuantumNous/new-api/pull/7230) (`calculateTextQuotaSummary` now subtracts cached image tokens before applying the image-tier rate). Recommend waiting for merge before billing reconciliation. |
| 🟠 High | [#7231](https://github.com/QuantumNous/new-api/issues/7231) — non-streaming request: client-side timeout **does not abort upstream**, and quota is still deducted after disconnect (rc.25) | OPEN | No fix PR yet. Combined-failure scenario; treat as expected-loss on transient client drops until patched. |
| 🟡 Medium | [#2542](https://github.com/QuantumTous/new-api/issues/2542) — GPT-5.2 requests: `role:system` forcibly rewritten to `role:developer`, upstream 4xx | CLOSED | Resolved upstream; rc.34 lineage. |
| 🟡 Medium | [#7215](https://github.com/QuantumNous/new-api/issues/7215) — Anthropic-format `thinking` level not mapped to upstream `reasoning_effort` | CLOSED | Resolved. |
| 🟢 Low | [#7220](https://github.com/QuantumNous/new-api/issues/7220) — Gemini 3.8 Flash variant regressed in rc.33 (closed as duplicate of an earlier report) | CLOSED | |
| 🟢 Low | [#7225](https://github.com/QuantumNous/new-api/issues/7225), [#7224](https://github.com/QuantumNous/new-api/issues/7224) — `settleTestQuota` group multiplier / `ParseContent()` `cache_control` loss | CLOSED as invalid | Reporter was on rc.32; not reproducible on supported versions. |
| ⚪ Invalid | [#7232](https://github.com/QuantumNous/new-api/issues/7232) — upstream media URL rewrite feature request | CLOSED | Submitted by AI coding agent without prior agreement; re-opened as PR [#7233](https://github.com/QuantumNous/new-api/pull/7233) for review. |

Two PRs materially close today's reported regressions: [#7230](https://github.com/QuantumNous/new-api/pull/7230) for the billing bug and [#7211](https://github.com/QuantumNous/new-api/pull/7211) for GPT-5.2/GPT-6 Astra capability mapping.

## 6. What This Means for Application Developers

- **If you use Telegram login**, schedule a maintenance window: admins must create a Telegram Login Widget (`/setdomain`/Login Widget) configured for `/oauth/telegram` and paste the resulting Client ID/Secret into the New API admin settings, or Telegram login will stop working on rc.34+.
- **If you're on rc.30 or earlier with image workloads**, audit your billing logs for cache-hit image requests — #7229 over-charges those. PR #7230 is the targeted fix; cherry-pick if you can't upgrade immediately, but expect quota corrections.
- **If you build Anthropic-format agents that reason on OpenAI upstreams**, your `thinking` budget levels are now reliably translated to `reasoning_effort` — you can drop client-side effort remapping.
- **If you depend on stable streaming latency**, #7228 (when merged) lets you tune TTFB per channel instead of relying on the global stream timeout; useful for rescue/fallback architectures.
- **Operator UI**: PR [#5396](https://github.com/QuantumNous/new-api/pull/5396) exposes chat-export and CC Switch as first-class row buttons — easier client onboarding, less support load.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*