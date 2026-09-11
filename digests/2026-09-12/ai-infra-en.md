# AI Infrastructure Digest 2026-09-12

> Generated: 2026-09-11 23:30 UTC | Projects covered: 9

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

# Cross-Project Infrastructure Report — 2026-09-12

**Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth, Claude Code Router (CCR), CC Switch, New API

---

## 1. Ecosystem Overview

The stack is converging on **DeepSeek-V4.1-Flash** as the integration target of the moment — it appears in six of nine digests — and it is simultaneously the main source of engine instability (H20/H200 crash clusters in vLLM, FP4-KV and MegaMoE groundwork in SGLang). **Speculative decoding has become the dominant performance lever and the dominant correctness risk**, with DFlash2/DSpark/n-gram bugs spanning vLLM, SGLang, and llama.cpp. The gateway layer is professionalizing fast (cosign-signed images in LiteLLM, billing expressions in New API, native Responses-API routing in CC Switch) while the serving engines have paused releases to absorb correctness debt — llama.cpp being the outlier with **8 point releases in 24h**. AMD ROCm enablement is now a cross-layer effort (RDNA3/4, MI350X/MI355X, gfx950), and Blackwell SM120 remains a correctness minefield at every tier.

---

## 2. Activity Comparison

| Project | Layer | Issues (referenced)* | PRs (referenced)* | Releases (24h) | Headline signal |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~21 | ~12 | ❌ None | Batch-invariance thread #27433 (90+ comments); 0.28/0.29 host-memory regression #54237 |
| **SGLang** | Serving engine | ~19 | ~18 | ❌ None | Unified-memory/PD-disagg stack (#37506/37418/37507) in review |
| **llama.cpp** | Local runtime/kernels | ~13 | ~15 | ✅ **8** (b10902→b10917) | Blackwell sm_120 IQ-quant miscompile #28784 |
| **Ollama** | Local distribution | ~22 | ~12 | ❌ None | 0.34.0 cloud wedge #18381; tool-call bug cluster (5 open) |
| **LiteLLM** | LLM gateway | ~23 | ~15 | ✅ v1.102.0-dev.2 | Cosign signing; ReDoS #32353 open |
| **Unsloth** | Fine-tuning | **38 (stated)** | **95 (stated)** | ❌ None | Security: HF-token fallback #10809; ROCm Docker #10820 |
| **Claude Code Router** | Agent-side router | ~1 | ~3 | ❌ None (v3.0.22) | Cost = $0 for aliased models #1787 |
| **CC Switch** | Agent-side switcher | ~17 | ~13 | ✅ v3.20.3 | Kimi → native Responses; `model_mapper`→`model_router` rename #7317 |
| **New API** | Gateway/billing | ~12 | ~12 | ✅ v1.0.0-rc.37 | New pricing-expression system; nil-map panic fix #7323 pending merge |

\* Unique items cited in today's digests — a proxy for attention, not total repo throughput. Unsloth figures are self-reported in its digest header (38 issues / 95 PRs updated).

**Read:** Engines are issue-heavy (correctness debt), llama.cpp ships fastest, gateways and local runtimes are mid-cadence. Unsloth's PR volume is the day's largest single-project flow.

---

## 3. Model Support Race

| Model | vLLM | SGLang | llama.cpp | Ollama | Gateways/routers |
|---|---|---|---|---|---|
| **DeepSeek-V4.1(-Flash)** | Engram DP sharding #56512, DSpark PP prefill #53577, ROCm RFC #56506; crashes #56389/#56443 | Hopper FP4 KV #38902, MegaMoE #38700, FP4 indexer #39046 | deepseek2 MTP KV fix (b10907) | Cloud support #18360 (27👍) | CC Switch vision fix #7286 |
| **GLM-5.3(-Flash)** | ROCm accuracy regression #54924 | **Leading:** SM120 qualification #37813 + 3 fix PRs | Open request #27922 | `glm-5.3:cloud` reasoning loop #18193 | CC Switch GLM 5.2 fix (resolved) |
| **Qwen3.5/3.8 family** | GDN kernel wins #56529/#56534 | gfx950 fused TP4 #39140 | Tool-arg parsing #28742 | Quant + tool-call bugs #18297/#17778 | CC Switch regression #7221; New API name-trim fix #7201 |
| **Other** | — | VDN-H3 & LLaDA-Image diffusion #37903/#37907; SenseNova-U1 #37742 | **Maple 20B-A1B** ternary MoE #27000 | Gemma-4 / GPT-OSS loading | Grok 4.6 effort #7318; GPT-5.6 Bedrock #40080; gpt-image-2.x pricing (New API) |

**Verdict:** **vLLM and SGLang lead frontier-model serving**, splitting the crown — vLLM is deepest on DeepSeek-V4.1 multi-node scale-out (merged/rebased work), while SGLang shows the widest architectural breadth (only project landing diffusion backends, plus hybrid Mamba/GDN). llama.cpp leads on edge and exotic quant formats (ternary TQ1_0/TQ2_0). Gateway-layer "support" is now mostly preset/pricing plumbing that trails engine enablement by days.

---

## 4. Performance Frontier

- **KV-cache & memory mobility ( hottest area ):** SGLang's unified-memory pool stack unifying PD-disaggregation, HiCache, and CUDA-graph capture (#37506/#37418/#37507); Hopper packed-FP4 KV (#38902). llama.cpp's `--cache-disk` (#20697, 👍48, top open enhancement) confirms demand extends to the edge. Counter-signal: vLLM's #54237 host-RAM exhaustion regression shows memory management is where releases break.
- **Speculative decoding:** Engine-wide push — vLLM DSpark/DFlash2 perf work shadowed by a correctness cluster (#54928, #53777, #54094); SGLang DFlash TP>1 with deterministic tie-break (#37069); llama.cpp proposing a full overhaul with probabilistic drafters + rejection sampling (#27694) while its n-gram cache poisons slots (#27852, acceptance 86%→11%).
- **Quantization (FP4 family):** NVFP4/MXFP4 everywhere, with traps: vLLM's `flashinfer_b12x` silently running W4A16 as W4A4 (#56535, Marlin = safe path); llama.cpp sm_120 nvcc miscompile producing garbage IQ1/IQ2/IQ3 outputs (#28784); SGLang NVFP4 blockscale live-reload (#39141).
- **Distributed serving:** PD disaggregation and decode context-parallelism (SGLang), pipeline-parallel prefill for spec decode (vLLM #53577), and — notably — **determinism at scale** (vLLM batch invariance under SP #56370; persistent TopK #55122).
- **Kernels:** SGLang's restored Mamba2 SSD autotune is the day's single biggest measured win (**>10× prefill**, #39130); vLLM AWQ GEMM profiling and Qwen3 GDN fusion; llama.cpp Metal fusion-table consolidation, RDNA4 WMMA FA, GCN MMQ tuning.

---

## 5. Layer Positioning

- **Datacenter serving engines — vLLM, SGLang:** Direct competitors on DeepSeek-V4.1, disaggregation, and spec decoding. Today both froze releases while absorbing correctness debt; differentiation is vLLM's scale-out/reproducibility focus vs. SGLang's memory-pool unification and model breadth.
- **Local runtime — llama.cpp:** The kernel/quantization substrate. **Ollama sits on top of it**, and the dependency is visible: Ollama's `/api/embed` port exhaustion (#18392) and projector OOMs (#18396) are llama-server issues underneath; its MLX pipeline PR (#14969) begins decoupling it from GGUF on Apple silicon.
- **Gateways — LiteLLM vs. New API:** LiteLLM = enterprise LLM gateway (supply-chain security, OTel, cost governance); New API = billing/quota-centric gateway (pricing expressions, channel health, org primitives #7312). CCR and CC Switch are thin agent-side routers for the Claude Code/Codex workflow — small surface, but riding the same Responses-API migration.
- **Fine-tuning — Unsloth:** Training layer, but increasingly shipping its own runtime (Studio/llama-server bundling), where its worst bugs (slot starvation #10671, tool-call guards) now live.

---

## 6. Trend Signals

1. **Speculative decoding is both the top speedup and the top silent-corruption risk.** Three projects reported spec-decode output changes/crashes today. Agent devs: disable spec decoding for structured output (vLLM #53777 breaks `json_object` + xgrammar) and diff outputs before/after enabling.
2. **Tool-calling is the ecosystem's weakest seam — at every layer.** Five open Ollama issues, vLLM's silent `tool_choice:"required"` drop (#54808), LiteLLM's dropped concatenated tool args (#40582), CC Switch tool-message ordering (#4741), Unsloth's approval-slot starvation (#10671). Treat tool calls as untrusted input; validate names/args at the app layer.
3. **The Responses-API migration wave has started.** CC Switch v3.20.3 moved all major Chinese vendors to native Responses; LiteLLM is gating reasoning params for it. If you maintain Anthropic↔OpenAI conversion logic, budget for migration now (`model_mapper`→`model_router` rename #7317 is the template).
4. **Gateway security is maturing under pressure.** Cosign verification (LiteLLM), the closed Trivy PyPI compromise, an open ReDoS crash-loop (#32353), Unsloth's HF-token privilege leak (#10809). Verify image signatures; audit gateway keys.
5. **Determinism is becoming a first-class requirement** — vLLM's 90+-comment batch-invariance thread and `VLLM_BATCH_INVARIANT` parity work on Intel XPU (#55881) suggest reproducible inference is transitioning from niche to expected.
6. **Version-pinning is the operative defense today:** vLLM ≤0.27.1 (host-mem regression), Ollama 0.33.1 (cloud wedge), llama.cpp ≥b10917 on Windows / ≥b10906 for multimodal, New API on PR #7323 for the panic fix.
7. **Cost observability remains unsolved at the gateway layer** — LiteLLM untracked `cached_tokens` (#22984) and Azure-router spend (#40728), CCR's $0 aliased models (#1787), New API tiered-billing mismatches (#7296). Reconcile against upstream bills; don't trust internal spend dashboards yet.
8. **KV-cache mobility is being built for agents specifically** — session-aware routing (#25760), `session_id` in cache events (#37482), HiCache, disk offload. This is the capability to track for long-context agent economics in H2 2026.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-12

## Today's Highlights

The community continues to push on **batch invariance** (the thread for Issue #27433 has now exceeded 90 comments and is the day's most active tracker), with a new bug report #56370 showing the `VLLM_BATCH_INVARIANT=1` flag is silently broken under sequence parallelism / async TP — a non-trivial correctness regression for reproducible inference. Separately, the **DeepSeek-V4.1-Flash** ecosystem is stabilizing: two new SM90/H200/H20 crash reports (#56389, #56443) landed within hours, while the Engram async-prefetch + DP sharding work (#56512) and the DSpark pipeline-parallel prefill path (#53577) are progressing toward merge.

## Releases & Breaking Changes

*No new releases in the last 24h.* No API or config breakage reported today.

## New Model & Hardware Support

- **Intel XPU / MoE + batch-invariant:** #55881 adds `VLLM_BATCH_INVARIANT=1` support for MoE models on XPU, auto-selecting the Triton MoE backend and switching to a deterministic fixed-rank-order reduction instead of XCCL all-reduce. Important parity work for Intel GPU users running reproducible inference.
- **DeepSeek-V4.1 Engram DP sharding:** #56512 (re-open of #56357, rebased onto main) introduces async prefetch for offloaded engram lookups plus DP sharding for engram embeddings. Required for scaling DS-V4.1-Flash to multi-node.
- **DSpark pipeline-parallel prefill:** #53577 extends DSpark spec decoding to support PP targets in disaggregated serving, with a separate fix for unsafe padded graph batches.
- **FlashInfer b12x MoE backend caveat:** #56535 documents a bug where `flashinfer_b12x` silently runs W4A16 checkpoints as W4A4 on `Qwen3.6-35B-A3B-NVFP4` — a correctness issue to watch before enabling this backend on Blackwell SM12x for weight-only models.

## Performance & Optimization

- **Qwen3.x GDN decode: ~1% E2E speedup** by inlining the zero-padding kernel during MTP decodes (#56529). Enables further fusion work.
- **Qwen3 GDN QKVZ + BA projection overlap** (#56534, WIP, stacked on #56530) — overlap work between input projections in the GDN decode layer.
- **ROCm DeepSeek-V4.1-Flash tuning RFC** (#56506) reports measured 8×MI355X TP4 MXFP4+DSpark MTP at 35.89 out tok/s (concurrent=1) and identifies substantial headroom on gfx950.
- **AWQ CUDA GEMM profiling** (#55462) shows the kernel is heavily L1/memory-bound on RTX 3070 Ti; profiling data published to motivate future optimization.
- **MRV2 Proton CUDA-graph attribution** (#51084) — adds replay attribution so profilers can attribute replayed kernels back to their capture context, a useful infra improvement for MRV2 perf work.
- **Hybrid GDN prefix-cache restore under MTP** (#52244) — fixes a regression where replayed prompts on Qwen3.5-122B-A10B with MTP spec decoding never reached the depth the prefix cache could deliver (zero-hit on multiples of the hash unit). Live measurements quoted.
- **Persistent TopK determinism** (#55122) — `csrc/libtorch_stable/persistent_topk.cuh` (QSA / sparse-indexer block selection) had order-nondeterminism and buffer-overflow hazards; this PR makes it deterministic.

## Stability & Regressions

**High severity (crashes / OOM / silent correctness):**

- **#54237 — Host memory exhaustion on v0.28.0 and v0.29.0 at startup.** Regression vs. v0.27.1. Engines freeze and consume all host RAM. *No fix PR yet in this batch.* Affected: any production deploys that have upgraded to 0.28.0/0.29.0. Recommend pinning 0.27.1 or triaging before next rollout.
- **#56389 — `dsv4_topk` Triton illegal memory access under high concurrency on 8×H20 (SM90).** Mitigated by `max_num_seqs=256`. DeepSeek-V4.1-Flash.
- **#56443 — CUDA device-side assert in `map_draft_to_target` at DSpark draft warmup on H200 (SM90) with Marlin MXFP4 MoE.** DeepSeek-V4.1-Flash + DSpark spec decode.
- **#54928 — DFlash2 changes greedy Qwen3.8 thinking output at token 30**, including K=1 and `--enforce-eager`. Spec-decoding correctness bug.
- **#53777 — DFlash2 + xgrammar deterministic "Failed to advance FSM" on `json_object` grammar** (same draft token every time). Breaks structured outputs when paired with the new DFlash2 drafter (merged via #52816).
- **#54094 — DFlash2 + YaRN zero prefix-cache reuse on identical 1.04M-token prompts** (target-only reuses ~1.039M tokens).
- **#54924 — GLM-5.3 accuracy collapses on ROCm (GSM8K 91.6% → 14.9%) after #53155 forces MRV1.** Quantization/correctness regression on gfx950.
- **#56370 — Batch invariance broken under sequence parallelism / async TP** (`VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp`). Bit-level reproducibility promise of the flag does not hold with SP enabled. Repro on 4×RTX PRO 6000 Blackwell PCIe.

**Medium severity:**

- **#45101 — FP8 MoE on SM120 (RTX PRO 6000 Blackwell) crashes in Triton `fused_moe`:** `AssertionError: Unsupported lhs dtype fp8e4nv`. `VLLM_MOE_FORCE_MARLIN=1` not honored.
- **#54808 — `qwen3_coder` / `qwen3_xml` parser silently ignores `tool_choice: "required"` and named-function `tool_choice`** on `/v1/chat/completions` (v0.28.0). The model behaves as if `tool_choice="auto"`.
- **#36802 — Tesla T4 shared-memory OOM** in Triton kernel (Required 81920, hardware limit 65536). Triton block-size tuning needed for legacy T4.
- **#54919 — Qwen3.8-Flash-Next long-prefill workload starves active decode for 3–7 minutes** on 2-node DGX Spark TP2.

**Closed/resolved (info only):**

- **#53504 — MTP first repeat missed prefix cache on hybrid Mamba/GDN** — closed (likely fixed via #52244).
- **#47654 — `--enable-sleep-mode` leaks HBM for `--mm-encoder-tp-mode data`** — closed.
- **#49013 — ~2x structured-output decode regression since #45424** — closed.
- **#45178 — `VLLM_MEMORY_PROFILER_ESTIMATE_CUDAGRAPHS` overestimates memory and lowers KV-cache space** — closed.
- **#36954 — `KeyError 'layers.0.mlp.experts.w2_weight'` with MTP+Qwen3.5-122B-GPTQ-Int4 (moe_wna16)** — closed.
- **#42303 — `prompt_token_ids` dropped in `EmbedsInput` pipeline** — closed.

## What This Means for Application Developers

- **Pin or test before upgrading to 0.28.0 / 0.29.0.** Issue #54237 reports a host-memory regression that freezes the engine at startup. If you're on a recent release, validate startup on your largest model before deploying, or hold on 0.27.1.
- **DeepSeek-V4.1-Flash deployments on H20/H200 need conservative `max_num_seqs`** (≤256) until #56389 and #56443 are resolved. On Blackwell SM12x, the FlashInfer `b12x` MoE backend (#56535) is unsafe for W4A16 checkpoints — stick with Marlin.
- **Tool calling on Qwen3 with v0.28.0 silently drops `tool_choice: "required"`.** If you rely on forced tool calls for agent reliability, do not rely on `qwen3_coder` / `qwen3_xml` parsers in 0.28.0 — enforce in the prompt or wait for a fix.
- **Batch-invariance is not yet uniform.** Reproducible-inference users should *not* enable `pass_config.enable_sp` until #56370 is fixed. On Intel XPU, #55881 brings parity, but the underlying primitive (Triton MoE + fixed-rank reduce) is newer than the CUDA path — expect subtle drift.
- **Structured outputs + DFlash2 spec decoding are broken on `json_object` grammar** (#53777). If you use xgrammar with a recently-merged DFlash2 drafter, disable speculative decoding or switch to `json_schema` mode.
- **Hybrid Mamba/GDN prefix-cache restoration under MTP** (#52244) is a meaningful correctness/perf fix for Qwen3.5-122B-A10B replays; expect merged-into-main improvements for long-context agents.
- **Security/ops note:** #56537 adds an opt-in `X-Trust` HMAC middleware for the OpenAI entrypoint to annotate (not block) human vs bot traffic — worth reviewing for multi-tenant gateways.

---

*Sources: [vllm-project/vllm issues](https://github.com/vllm-project/vllm/issues) and [pull requests](https://github.com/vllm-project/vllm/pulls), updated 2026-09-11 → 2026-09-12.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-12

## Today's Highlights

The day's PR activity centers on three converging themes: GLM-5.3-Flash integration hardening (decode-context-parallelism restore, HiCache DSA-index preservation, Mamba checkpoint tracking at #39117/#38212/#37818), a stacked series unifying PD disaggregation, HiCache, and CUDA-graph capture under the `--enable-unified-memory` path (#37506/#37418/#37507), and continued preparation for DeepSeek-V4.1 with Hopper FP4 KV storage (#38902) and MegaMoE shared-to-sparse expert fusion (#38700). AMD ROCm progress remains active across both consumer (RDNA3/RDNA4 tracking) and datacenter (MI350X/MI355X cookbook fix) lanes.

## Releases & Breaking Changes

No new releases in the last 24h.

## New Model & Hardware Support

- **GLM-5.3-Flash on SM120 (RTX PRO 6000 Blackwell)** — qualification tracker [#37813](https://github.com/sgl-project/sglang/issues/37813) and live fix PR restoring decode CP [#39117](https://github.com/sgl-project/sglang/pull/39117); HiCache correctness work [#38212](https://github.com/sgl-project/sglang/pull/38212).
- **GLM-5.3 (full)** — crash under disagg decode + DP-attention + speculative decoding reported [#39072](https://github.com/sgl-project/sglang/issues/39072).
- **SenseNova-U1 / U1.5** — feature & performance tracking issue opened [#37742](https://github.com/sgl-project/sglang/issues/37742).
- **DeepSeek-V4 / V3.2 DSML tool-call parser** — spurious `arguments`/`input` wrapping bug [#38924](https://github.com/sgl-project/sglang/issues/38924).
- **DeepSeek-V4.1 (C1/C2)** — Hopper packed-FP4 main KV cache proposal [#38902](https://github.com/sgl-project/sglang/issues/38902), complementing the FP4 KV roadmap [#29913](https://github.com/sgl-project/sglang/issues/29913).
- **DFlash V2** — TP>1 Domino rollout with CUDA Graph + eager fallback [#37069](https://github.com/sgl-project/sglang/pull/37069); Mamba-state checkpoint tracking [#37818](https://github.com/sgl-project/sglang/pull/37818).
- **Diffusion: VDN-H3** — hybrid window-softmax + Video Delta linear attention MiniMax-H3, 8-NFE DMD2 distill, `hybrid_window_attn_h3` backend [#37903](https://github.com/sgl-project/sglang/pull/37903); targets 8x B200.
- **Diffusion: LLaDA-Image / LLaDA-Image-Turbo (+ FP8)** — T2I + image editing + sequence parallelism [#37907](https://github.com/sgl-project/sglang/pull/37907).
- **AMD consumer Radeon RDNA3/RDNA4** (`gfx1100/1101/1200/1201`) — official support tracker/enablement plan [#30599](https://github.com/sgl-project/sglang/issues/30599).
- **AMD Qwen3-Next on gfx950** — fused TP4 all-reduce + Gemma RMSNorm + per-group FP8 quant [#39140](https://github.com/sgl-project/sglang/pull/39140).

## Performance & Optimization

- **Mamba2 SSD Triton kernels** — autotune restored after being silently capped at `BLOCK_SIZE_*=16`; author reports **>10× loss on prefill** without it [#39130](https://github.com/sgl-project/sglang/pull/39130). High-impact win once merged.
- **Hopper FP4 indexer** — skip FP4 decode + query loads + two dot products on invisible tiles [#39046](https://github.com/sgl-project/sglang/pull/39046); targeted at the DS-V4.1 indexer from #38798.
- **DSV4 DeepGEMM MegaMoE** — fuse shared → sparse expert paths [#38700](https://github.com/sgl-project/sglang/issues/38700).
- **Unified-memory pool stack** (review bottom-up: #37507 → #37418 → #37506) — PD disagg across every pool shape, prefill CUDA-graph capture, and HiCache load-back with SWA row binding + Mamba slot translation [#37506](https://github.com/sgl-project/sglang/pull/37506), [#37418](https://github.com/sgl-project/sglang/pull/37418), [#37507](https://github.com/sgl-project/sglang/pull/37507), [#38521](https://github.com/sgl-project/sglang/pull/38521).
- **DFlash TP>1 rollout** — full-vocab TP gather for small logits, deterministic global tie-break [#37069](https://github.com/sgl-project/sglang/pull/37069).
- **sglang-miles NVFP4 blockscale** — keep padding on input device during live weight reload, avoiding GPU→CPU→GPU round trip [#39141](https://github.com/sgl-project/sglang/pull/39141), [#39142](https://github.com/sgl-project/sglang/pull/39142).

## Stability & Regressions

- **High severity — GLM-5.3 disagg decode crash** under DP-attention + spec decode [#39072](https://github.com/sgl-project/sglang/issues/39072). No fix PR yet; likely related to the in-progress decode-CP restore [#39117](https://github.com/sgl-project/sglang/pull/39117).
- **High severity — HiCache corruption under resumption**: DSA index buffers omitted; divergent suffixes can share compressed index rows; recurrent state saved beyond owning prefix [#38212](https://github.com/sgl-project/sglang/pull/38212) targets this; tracking [#37813](https://github.com/sgl-project/sglang/issues/37813).
- **High severity — DFlash Mamba-state checkpoint miss** when accepted verify tokens cross a tracking boundary [#37817](https://github.com/sgl-project/sglang/issues/37817) → fix [#37818](https://github.com/sgl-project/sglang/pull/37818).
- **High severity — Tri-pool HiCache load-back broken** on Inkling: SWA rows unbound, Mamba slots untranslated [#38521](https://github.com/sgl-project/sglang/pull/38521) fixes.
- **High severity — Encoder-decoder KV cache double-free** of the shared boundary page when `page_size > 1` [#38840](https://github.com/sgl-project/sglang/issues/38840).
- **Medium severity — LoRA streamed upserts publish before refresh completes** because `non_blocking=True` copies return without sync; fix in [#39143](https://github.com/sgl-project/sglang/pull/39143).
- **Medium severity — Generation health checks perturb DP routing state** and collapse long-prefill throughput [#35241](https://github.com/sgl-project/sglang/issues/35241).
- **Medium severity — `flash_attn_with_kvcache` advertised on sm_89** but no sm_89 cubin ships; `ver` arg ignored [#38980](https://github.com/sgl-project/sglang/issues/38980).
- **Medium severity — OpenAI `include_reasoning=false` still emits reasoning** across `/v1/responses`, `/v1/chat/completions`, `/v1/completions` [#39103](https://github.com/sgl-project/sglang/issues/39103).
- **Medium severity — JSON-Schema DFA state explosion / CPU hang** on deeply nested or recursive untrusted schemas [#39125](https://github.com/sgl-project/sglang/issues/39125).
- **Medium severity — TRTLLM MLA target verification** misses fused FP8 KV/Q prep in `forward_extend` [#39107](https://github.com/sgl-project/sglang/issues/39107).
- **Medium severity — DeepSeek V4/V3.2 DSML parser** wraps args in spurious top-level key [#38924](https://github.com/sgl-project/sglang/issues/38924).
- **Medium severity — H20 8-card can't launch Qwen3.8-Flash-Next-FP8** [#38793](https://github.com/sgl-project/sglang/issues/38793) (closed; verify on rebuild).
- **Low severity — Kimi-K3 MI350X/MI355X cookbook** aborts in DSPARK HIP graph capture; cookbook image re-pinned with measured cell numbers in [#39029](https://github.com/sgl-project/sglang/pull/39029).
- **CI tracking** [#17050](https://github.com/sgl-project/sglang/issues/17050) — 1 broken, 6 flaky, 995 recently fixed as of 22:34 UTC 2026-09-11.

## What This Means for Application Developers

- **If you're serving agentic workloads**, the active PD-disaggregation + HiCache + unified-memory stack [#37506](https://github.com/sgl-project/sglang/pull/37506) is the path you want to track — once it lands, long-context agent loops should benefit from fewer cross-rank KV round trips and cleaner host-pool semantics. The session-aware router work [#25760](https://github.com/sgl-project/sglang/issues/25760) and `session_id` metadata in `BlockStored` events [#37482](https://github.com/sgl-project/sglang/pull/37482) are prerequisites for external KV routers.
- **If you're on GLM-5.3-Flash**, expect bumpy landings on SM120 — pin to commits that include both the DFlash Mamba fix [#37818](https://github.com/sgl-project/sglang/pull/37818) and the DSA-index HiCache fix [#38212](https://github.com/sgl-project/sglang/pull/38212); the decode-CP restore [#39117](https://github.com/sgl-project/sglang/pull/39117) is in flight.
- **If you're using LoRA hot-reload**, hold for [#39143](https://github.com/sgl-project/sglang/pull/39143) — without it, sampled tokens after a streamed upsert can use stale weights.
- **If you're integrating tool calls from DeepSeek V4 / V3.2**, validate parser output; spurious top-level `arguments` wrapping has been reported [#38924](https://github.com/sgl-project/sglang/issues/38924).
- **If you're on constrained decoding**, harden your schema validator — deeply nested JSON Schemas can currently DoS the compiler [#39125](https://github.com/sgl-project/sglang/issues/39125). Set depth limits at the gateway.
- **If you're on RDNA3/RDNA4 consumer Radeon or MI350X/MI355X**, expect first-class enablement soon; track [#30599](https://github.com/sgl-project/sglang/issues/30599) and [#39029](https://github.com/sgl-project/sglang/pull/39029).
- **If you're on diffusion workloads**, VDN-H3 and LLaDA-Image (incl. FP8) are landing as native backends [#37903](https://github.com/sgl-project/sglang/pull/37903), [#37907](https://github.com/sgl-project/sglang/pull/37907).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-12

## Today's Highlights
A broad, low-friction maintenance day: eight point-releases shipped covering MSVC build hygiene, speculative decoding after image tokens, Metal/Vulkan kernel fixes, and HIP/ROCm Flash Attention tuning on RDNA4 (gfx1201). On the application side, work continues on speculative decoding fidelity (#27694, server subproc refactor #28555), SYCL graph capture (#28725), and JSON schema tooling (#28736).

## Releases & Breaking Changes
Eight builds landed in the last 24h (b10902 → b10917). No ABI/API breakage reported; behavior changes worth noting:
- [b10906](https://github.com/ggml-org/llama.cpp/releases) — `llama-server` now passes the actual position (not token count) to drafters after an image, fixing post-multimodal speculation. Affects all drafters, not just DFlash.
- [b10917](https://github.com/ggml-org/llama.cpp/releases) — Skips PCH for `llama-server` under MSVC. Directly addresses the LNK2001 link failure reported in [#28758](https://github.com/ggml-org/llama.cpp/issues/28758) (closed the same day).
- [b10905](https://github.com/ggml-org/llama.cpp/releases) — HIP: enables WMMA Flash Attention for head size 256 on RDNA4 and retunes stream-K vs whole-tile grids.
- [b10902](https://github.com/ggml-org/llama.cpp/releases) — OpenCL: adds A8 Q4_0 mm binary kernel support.

## New Model & Hardware Support
- [PR #27000](https://github.com/ggml-org/llama.cpp/pull/27000) — **Maple 20B-A1B** (DeepGrove ternary MoE: 24L, 256 experts/8 active, SWA-512 + global 3:1) added via TQ1_0/TQ2_0. Merging-blocker looks to be the lack of TQ1_0/TQ2_0 ARM i8mm paths tracked in [#27276](https://github.com/ggml-org/llama.cpp/issues/27276).
- [PR #27841](https://github.com/ggml-org/llama.cpp/pull/27841) — Per-arch MMQ config for AMD GCN (wave64, nthreads 512) so AMD GCN no longer falls back to RDNA2.
- [PR #28784](https://github.com/ggml-org/llama.cpp/pull/28784) — Correctness fix for **Blackwell (sm_120)**: IQ1_S / IQ2_S / IQ3_S produce garbage due to a nvcc 13.2 byte-extract miscompile. Important if you're shipping quant-only ggufs on RTX 50-series.
- [PR #28779](https://github.com/ggml-org/llama.cpp/pull/28779) — `nemotron-h` MTP layer SIGFPE guard (zero divisor on `n_ff_exp` fallback).
- [b10907](https://github.com/ggml-org/llama.cpp/releases) — Correct KV-cache allocation for MTP in `deepseek2`, `glm4moe`, `cohere2moe` (#28630).

## Performance & Optimization
- [b10909](https://github.com/ggml-org/llama.cpp/releases) — Metal fusion patterns consolidated into a single table in `ggml-metal-fuse.cpp` (#28164). Cleaner graph-optimizer code path; expect modest launch-latency reductions.
- [b10908](https://github.com/ggml-org/llama.cpp/releases) — Metal `iq1_s/iq1_m/iq*` mul_mv kernels no longer leave idle threads when `ne00 < 1024` (#28692).
- [b10903](https://github.com/ggml-org/llama.cpp/releases) — Vulkan `argsort` data-race + OOB fixed (#28705). CI was occasionally tripping here.
- [PR #28785](https://github.com/ggml-org/llama.cpp/pull/28785) — Skip `ggml-cpu` threadpool when graphs are views-only (common in full-GPU offload). PR reports meaningful decode-latency drops.
- [PR #28782](https://github.com/ggml-org/llama.cpp/pull/28782) — Per-thread stream for buffer-init `cudaMemset` to stop collisions with parallel HIP/CUDA graph captures.
- [PR #27986](https://github.com/ggml-org/llama.cpp/pull/27986) — **Mirror NUMA strategy** (replicate weights on each node); claims decode throughput matches first-touch `--numa distribute` without the convergence delay.
- [PR #27841](https://github.com/ggml-org/llama.cpp/pull/27841) — AMD GCN MMQ config (above) likely yields a throughput bump on older Instinct cards.

## Stability & Regressions
Reported today or yesterday, ranked by severity:
1. **Critical** — [#28758](https://github.com/ggml-org/llama.cpp/issues/28758) Windows/MSVC `llama-server` link failure (LNK2001) after PCH changes — **fixed in b10917**.
2. **High** — [#28784](https://github.com/ggml-org/llama.cpp/pull/28784) Blackwell sm_120 garbage output for IQ1_S/IQ2_S/IQ3_S — PR open, not yet merged into a release.
3. **High** — [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) Severe Vulkan/RDNA3 prompt-processing regression after b10780 — **no fix yet**.
4. **High** — [#28726](https://github.com/ggml-org/llama.cpp/issues/28726) OpenVINO backend SIGILL on Core Ultra 7 265K (AVX-512 path) — no fix yet.
5. **Medium** — [#28742](https://github.com/ggml-org/llama.cpp/pull/28742) Qwen3-Coder complex-arg parsing improvement (ref #26833).
6. **Medium** — [#28660](https://github.com/ggml-org/llama.cpp/issues/28660) SYCL oneDNN scratchpad breaks LIFO pool on Intel Arc Pro B70 — fix pending.
7. **Medium** — [#28648](https://github.com/ggml-org/llama.cpp/issues/28648) Vulkan on Intel Arc 140V (Windows) garbage output, batch-setting dependent.
8. **Medium** — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633) CUDA silently falls back to CPU for 4-bit KV cache (`q4_0/q4_1`) with no log message — ~30× prefill slowdown, very hard to diagnose.
9. **Medium** — [#28630 / b10907](https://github.com/ggml-org/llama.cpp/issues/28626) MTP context KV-cache misallocation for MoE architectures — **fixed in b10907**.
10. **Low–Med** — [#27852](https://github.com/ggml-org/llama.cpp/issues/27852) n-gram speculative decoding keeps stale slot context (acceptance 86% → 11%).

Long-running but updated today: [#16393](https://github.com/ggml-org/llama.cpp/issues/16393) cached-model management (👍21), [#20697](https://github.com/ggml-org/llama.cpp/issues/20697) `--cache-disk` context offloading (👍48, highest-voted open enhancement), [#23704](https://github.com/ggml-org/llama.cpp/issues/23704) router-mode multi-preset per model, [#27922](https://github.com/ggml-org/llama.cpp/issues/27922) GLM5.3 (flash) support.

## What This Means for Application Developers
- **Re-base on b10917 if you ship Windows builds** — the MSVC link failure from #28091 is resolved there. Anything older will fail to link `llama-server` under MSVC.
- **Multimodal pipelines should pin ≥ b10906** — speculative decoding is now correct after image tokens. If you're using DFlash or any custom drafter and feed images, prior builds silently corrupted positions.
- **Blackwell (RTX 50-series) IQ1/IQ2/IQ3 users** must pull #28784 once merged — current `master` produces wrong outputs for these quants.
- **Speculative decoding overhaul incoming.** [#27694](https://github.com/ggml-org/llama.cpp/pull/27694) proposes probabilistic drafters + rejection sampling (no more "draft sampler → discard → take top-k"); [#27852](https://github.com/ggml-org/llama.cpp/issues/27852) shows the n-gram cache currently poisons slot context across requests. Worth tracking if you depend on speculation for TTFT.
- **Server surface area continues to harden.** [#28736](https://github.com/ggml-org/llama.cpp/pull/28736) cleans up JSON-schema → grammar with a proper internal `common_schema` representation; [#28053](https://github.com/ggml-org/llama.cpp/pull/28053) adds `-sysf` to `llama-server`; [#28787](https://github.com/ggml-org/llama.cpp/pull/28787) bumps cpp-httplib to 0.56.0.
- **AMD path is getting serious attention.** RDNA4 FA tuning (b10905), GCN MMQ config (#27841), per-thread HIP memset (#28782). If you're deploying on AMD Instinct or RDNA, expect steady throughput gains over the next few weeks.
- **Watch the open-feature leaders.** `--cache-disk` (#20697) and router-mode multi-preset (#23704) are the most-requested open enhancements — both directly unblock larger-context agent deployments and multi-tenant serving.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-12

## Today's Highlights
No new releases shipped in the last 24h, but a notable regression cluster is emerging: multiple users report **cloud model instability on 0.34.0** (requests wedge after ~45 min) and **slower model loading across versions**, while a significant new bug surfaces around `/api/embed` exhausting loopback ports on Windows. On the positive side, several tool-calling and projector-offload fixes (gemma3n CPU guard, ROCm APU projector, tool `args` parser) were merged or are queued, and a large architectural PR (`#16590`) for manifest-list storage moves forward.

## Releases & Breaking Changes
- No new releases in the last 24h.
- Open PR [`#18393`](https://github.com/ollama/ollama/pull/18393) reverts the built-in agent from the Ollama CLI back to the legacy chat interface — a notable UX change if merged.
- Open PR [`#18383`](https://github.com/ollama/ollama/pull/18383) gates Codex Settings recommendations on integration use, aligning with Claude's existing eligibility check.

## New Model & Hardware Support
- **Cloud/Model requests:** DeepSeek-V4.1-Flash cloud support (closed, [`#18360`](https://github.com/ollama/ollama/issues/18360) — 27 👍) and a follow-up request for downloadable files ([`#18379`](https://github.com/ollama/ollama/issues/18379)). Tencent Hy4 Preview model request ([`#18287`](https://github.com/ollama/ollama/issues/18287)).
- **Quantization:** New bug report that `IQ3_S` quant of Qwen3.8-27B-GSQ-RCO-GGUF returns empty content ([`#18297`](https://github.com/ollama/ollama/issues/18297)). Functional smoke suite shows `qwen2.5-coder:3b-instruct` is broken at q2_K/q3_K_S/q3_K_M/q3_K_L while sibling quants pass ([`#18252`](https://github.com/ollama/ollama/issues/18252)).
- **AMD ROCm:** RX 9060 XT (gfx1200) fails with `Could not load "TensileLibrary_lazy_gfx1200.dat"` ([`#17782`](https://github.com/ollama/ollama/issues/17782)). Counter-PR [`#16767`](https://github.com/ollama/ollama/pull/16767) re-enables multimodal projector offload for ROCm APUs (false positive in shared-memory heuristic).
- **ARM/ppc64le:** Long-standing [`#796`](https://github.com/ollama/ollama/issues/796) bumped; no maintainer commitment.
- **Jetson:** Gemma 4 E4B multimodal projector OOMs the host on Jetson Orin Nano 8GB ([`#18396`](https://github.com/ollama/ollama/issues/18396)).
- **Backend:** [`#14969`](https://github.com/ollama/ollama/pull/14969) adds server-side MLX create pipeline (safetensors imports), removing GGUF conversion as a side effect — material change for Apple-silicon workflows.

## Performance & Optimization
- **Cloud wedge fix (in flight):** [`#18382`](https://github.com/ollama/ollama/pull/18382) adds bounded connect + TTFB timeouts to the cloud proxy, addressing [`#18381`](https://github.com/ollama/ollama/issues/18381) where requests hang indefinitely on 0.34.0.
- **gemma3n projector guard (merged intent):** [`#18376`](https://github.com/ollama/ollama/pull/18376) (closed) — Gemma3n's MobileNetV5 projector silently corrupts image embeddings on CPU; keeps it off-CPU. Also relevant to the Jetson OOM in [`#18396`](https://github.com/ollama/ollama/issues/18396).
- **Model-loading regression:** [`#18373`](https://github.com/ollama/ollama/issues/18373) reports GPT-OSS:120b loading significantly slower on 0.30+ vs 0.23.4. Related: [`#16501`](https://github.com/ollama/ollama/issues/16501) — Qwen3.5 122B on Strix Halo went from 61s (0.24) → 116s (0.30.4), PP 40% faster.
- **Manifest lists:** [`#16590`](https://github.com/ollama/ollama/pull/16590) lays groundwork for runner-specific manifests under one tag, with lazy local-compat patches to preserve v1 anchors. Plumbing for future heterogeneous backends.
- **/api/embed throughput:** [`#18392`](https://github.com/ollama/ollama/issues/18392) — at ~55 docs/s on Windows with bge-m3:567m-fp16, llama-server's HTTP client (keep-alive disabled) exhausts ephemeral loopback ports (HTTP 400, `Only one usage of each socket address`).

## Stability & Regressions (ranked by severity)

| Severity | Issue | Notes |
|---|---|---|
| 🔴 High | [`#18381`](https://github.com/ollama/ollama/issues/18381) — Cloud models wedge after ~45 min on 0.34.0; 0.33.1 OK | Fix PR [`#18382`](https://github.com/ollama/ollama/pull/18382) open |
| 🔴 High | [`#17778`](https://github.com/ollama/ollama/issues/17778) — `ResponseError: no user query found in messages (500)` during qwen3.8 tool-call loops | 28 comments, 25 👍; no fix yet |
| 🔴 High | [`#18392`](https://github.com/ollama/ollama/issues/18392) — `/api/embed` exhausts loopback ports on Windows (keep-alive disabled) | No fix yet; affects bulk embedding workloads |
| 🟠 Medium | [`#18373`](https://github.com/ollama/ollama/issues/18373) — Model-loading regression on 0.30+ | No fix yet |
| 🟠 Medium | [`#18346`](https://github.com/ollama/ollama/issues/18346) — Anthropic `/v1/messages` drops tool calls to literal text with complex schemas | No fix yet |
| 🟠 Medium | [`#17274`](https://github.com/ollama/ollama/issues/17274) — Tool-call output silently discarded when parse fails | No fix yet |
| 🟠 Medium | [`#18193`](https://github.com/ollama/ollama/issues/18193) — `glm-5.3:cloud` endless reasoning aborts tasks | No fix yet |
| 🟡 Low | [`#18390`](https://github.com/ollama/ollama/issues/18390) — gemma4 tool calls with spaces in keys dropped as empty | Fix PR [`#18388`](https://github.com/ollama/ollama/pull/18388) open (parses `args` field) |
| 🟡 Low | [`#18357`](https://github.com/ollama/ollama/issues/18357) — Gemma3n tool model returns empty `tool_calls` via `/v1` | Related to `#18376` merged PR |
| 🟡 Low | [`#18387`](https://github.com/ollama/ollama/issues/18387) — `>10` ellipses in TOC input causes `cancel task` | No fix yet |
| 🟢 Closed | [`#18344`](https://github.com/ollama/ollama/issues/18344) — FD leak in `ollama serve` | **Withdrawn by reporter** (false alarm from lsof scoping) |
| 🟢 Closed | [`#17087`](https://github.com/ollama/ollama/pull/17087) — Invalid bool env var incorrectly defaulted to `true` | **Fixed** |
| 🟢 Closed | [`#17528`](https://github.com/ollama/ollama/pull/17528) — Sidebar open animation on load | **Fixed** |

Also: `install.sh` is being hardened ([`#12478`](https://github.com/ollama/ollama/issues/12478) — `curl --retry` proposal), and Windows uninstaller now removes the user PATH entry ([`#18386`](https://github.com/ollama/ollama/pull/18386)).

## What This Means for Application Developers

- **Pin 0.33.1 if you depend on cloud routing.** The 0.34.0 cloud-proxy wedge is unrecovered for ~45-min sessions; if you're running `*:cloud` traffic through Ollama as a gateway, hold the upgrade or follow [`#18382`](https://github.com/ollama/ollama/pull/18382) closely.
- **Tool-calling is brittle across models.** Five separate open issues (`#17274`, `#14601`, `#18346`, `#18390`, `#18357`) describe different failure modes — silent drops, schema malformation, parser failures, Anthropic-compat breakage. Treat tool-call results as untrusted; validate tool names/args before executing. The in-flight PRs [`#18388`](https://github.com/ollama/ollama/pull/18388) (parser) and [`#18391`](https://github.com/ollama/ollama/pull/18391) (template JSON rendering) are the most concrete upcoming fixes.
- **Bulk embedding on Windows is risky.** Disable keep-alive in your HTTP client OR run on Linux/macOS until [`#18392`](https://github.com/ollama/ollama/issues/18392) is addressed; the underlying fix likely belongs inside llama-server's HTTP client.
- **AMD users: check gfx1200 support** before upgrading — RX 9060 XT 16GB is hitting `TensileLibrary_lazy_gfx1200.dat` load failures mid-session ([`#17782`](https://github.com/ollama/ollama/issues/17782)).
- **MLX path is shifting.** If you build Modelfiles for Apple-silicon, [`#14969`](https://github.com/ollama/ollama/pull/14969) will move you off GGUF conversion to direct safetensors via server-side MLX — start testing imports against that branch.
- **Manifest digest in responses.** If you cache evaluation results by model name, [`#18394`](https://github.com/ollama/ollama/issues/18394) proposes adding the served manifest digest to `/api/chat` — important if you observe tag oscillation between requests.
- **CLI UX change incoming.** [`#18393`](https://github.com/ollama/ollama/pull/18393) would revert the built-in CLI agent; if you script against `ollama` interactive mode, audit your expectations.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-12

## Today's Highlights

Development pushes toward **v1.102.0-dev.2** with cosign-signed Docker images becoming the new distribution norm, while the long-running **Trivy supply-chain compromise** (#24518) was formally contained — affected PyPI packages (v1.82.7/v1.82.8) have been removed and replaced. Underneath, the most urgent operational signals are a **ReDoS vulnerability in `secret_redaction`** (#32353) that crash-loops the proxy and a **PostgreSQL bind-variable overflow in budget reset** (#40564) that has now shipped a fix.

## Releases & Breaking Changes

- **v1.102.0-dev.2** — development cut with formal Docker image signature verification via [cosign](https://docs.sigstore.dev/cosign/overview/). All images signed with the key introduced in commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0). Operators should refresh image-pull policies to enforce signature validation. ([release notes](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.2))
- **Trivy supply-chain incident closed** (#24518): v1.82.7 and v1.82.8 on PyPI were compromised; all affected artifacts have been deleted and current releases are clean. See the [Security Townhall post](https://docs.litellm.ai/blog/security-townhall-updates) for full timeline. (136 👍, 119 comments)

## New Model & Hardware Support

- **OpenAI pricing sync — 83 models, 2 new** ([#40797](https://github.com/BerriAI/litellm/pull/40797)). Refreshes `model_prices_and_context_window.json` and the backup file, including `babbage-002` batch pricing and corrected sources.
- **TinyFish Agent provider** added as an A2A completion-bridge with per-step spend tracking ([#40796](https://github.com/BerriAI/litellm/pull/40796)) — first-class billing for goal-based web-automation agent calls.
- **OCR provider expansion (Rust-native facade)**: Azure Document Intelligence ([#40534](https://github.com/BerriAI/litellm/pull/40534)), Azure Mistral native auth ([#40502](https://github.com/BerriAI/litellm/pull/40502)), Reducto legacy + v3 ([#40535](https://github.com/BerriAI/litellm/pull/40535)), Vertex Mistral ([#40507](https://github.com/BerriAI/litellm/pull/40507)), Vertex DeepSeek ([#40509](https://github.com/BerriAI/litellm/pull/40509)). All close into a 7-PR stack on `litellm_internal_staging` @ `8a4fae0e17`.
- **Bedrock Mantle / OpenAI Responses path** now correctly gates `reasoning.summary` to `auto` for Codex CLI on gpt-5.x ([#40798](https://github.com/BerriAI/litellm/pull/40798)).
- Open provider request still pending: **Kimi-K2.6 on Together AI** in `model_prices_and_context_window*.json` ([#27450](https://github.com/BerriAI/litellm/issues/27450)).

## Performance & Optimization

- **OTel v2: span-attribute capping** ([#40562](https://github.com/BerriAI/litellm/pull/40562)) — OpenInference message attributes were unbounded; a 60-turn chat could push a span past the 128-attribute limit and evict `model`, `tokens`, `cost`, and `finish_reason`. Cap is now enforced span-wide.
- **OTel v2: Langfuse trace naming restored** ([#40793](https://github.com/BerriAI/litellm/pull/40793)) — reads `langfuse_trace_name` header first, then `metadata.trace_name`. Fixes a v1→v2 regression that left every trace named `POST /v1/chat/completions`.
- **Prompt-cache affinity TTL alignment** ([#40776](https://github.com/BerriAI/litellm/pull/40776)) — detects `cache_control.ttl` on messages/tools/system blocks and binds routing affinity for the full TTL instead of the hardcoded 5 minutes, so 1-hour Anthropic caches stop getting evicted mid-life.
- **OCR native lifecycle dispatch** ([#40676](https://github.com/BerriAI/litellm/pull/40676), [#40734](https://github.com/BerriAI/litellm/pull/40734)) — Rust picks pre/post/terminal completion; Python retains callback iteration. Removes the duplicated dispatch and surfaces provider errors that were silently swallowed.

## Stability & Regressions

**Severity-ranked, with fix PRs noted where available:**

1. **[CRITICAL] ReDoS in `secret_redaction.redact_string()`** ([#32353](https://github.com/BerriAI/litellm/issues/32353), 👍 2). Catastrophic regex backtracking on long exception strings blocks the event loop for minutes, kills liveness probes, and crash-loops every replica. **No fix PR linked yet** — operators with chatty upstream errors should monitor `task: non-zero exit` events and consider pinning to a build with this regex audited.
2. **[HIGH] Secret redaction entropy gap** ([#40190](https://github.com/BerriAI/litellm/pull/40190)). The 4.5-bit Shannon-entropy ceiling can't flag credentials under ~23 chars, so `REDIS_PASSWORD=aB3dE6gH9jK2mN5p` leaks through unredacted. PR proposes restoring coverage without the floor.
3. **[HIGH] PostgreSQL bind-variable overflow on end-user budget reset** ([#40564](https://github.com/BerriAI/litellm/issues/40564), closed). `_reset_expired_budget_cascade` issues a single `update_many({"user_id": {"in": [...]}})` that exceeds PG's 32,767-param limit and never completes. Closed — fix shipped.
4. **[HIGH] `bedrock_converse` rejects agent follow-ups without `tools=` array** ([#40735](https://github.com/BerriAI/litellm/issues/40735)). Raises `UnsupportedParamsError` before the request leaves the proxy when a turn carries tool-call history but no re-declared `tools`. Open.
5. **[HIGH] Config-file models evicted on `litellm_params` edit, never restored** ([#40761](https://github.com/BerriAI/litellm/issues/40761)). With `store_model_in_db: true`, editing any params field removes the deployment from every running pod and nothing re-adds it until restart. Open.
6. **[HIGH] `/metrics` returns empty after 1.88.0** ([#30079](https://github.com/BerriAI/litellm/issues/30079)). Prometheus scrape sees a 307 redirect to a path that emits nothing. Open — affects every observability stack pinned to 1.88.x.
7. **[MEDIUM] VLLM `cached_tokens` not cost-tracked** ([#22984](https://github.com/BerriAI/litellm/issues/22984)). The token-cost calculator ignores the cached-input portion, overstating spend. Open, stale.
8. **[MEDIUM] Streaming fallback inconsistent with non-stream on key-level router settings** ([#25843](https://github.com/BerriAI/litellm/issues/25843)). Same config: stream ignores the fallback mapping, non-stream honors it. Open.
9. **[MEDIUM] Responses-API bridge drops SpendLogs row for non-streaming `/v1/chat/completions`** ([#36426](https://github.com/BerriAI/litellm/issues/36426)). `StandardLoggingPayload` never built → SpendLogs write aborted → silent loss of billing data. Open.
10. **[MEDIUM] OpenAI-compatible stream silently drops in-band `{"error": ...}` events** ([#40578](https://github.com/BerriAI/litellm/issues/40578), closed). `chunk_parser` returns empty success instead of raising. Closed.
11. **[MEDIUM] `parse_tool_call_arguments` drops tool calls with concatenated JSON arguments** ([#40582](https://github.com/BerriAI/litellm/issues/40582)). `split_concatenated_json_objects` exists but isn't on this path. Open.
12. **[MEDIUM] JWT auth mints a fresh "virtual key" per token** ([#40398](https://github.com/BerriAI/litellm/issues/40398)). Each refresh adds a new `hashed-jwt-…` row to Top Virtual Keys. Open.
13. **[MEDIUM] Azure AI model router has no cost tracking** ([#40728](https://github.com/BerriAI/litellm/issues/40728)). Spend UI stays empty for any deployment routed through Azure AI router. Open.
14. **[MEDIUM] GPT-5.6 cross-region inference profiles on Bedrock reject image input** ([#40080](https://github.com/BerriAI/litellm/issues/40080)). Routed through Converse instead of OpenAI endpoint, which doesn't accept the `image` field. Open.
15. **[MEDIUM] Vertex AI Realtime hardcodes `pcm16` to 24 kHz** ([#40563](https://github.com/BerriAI/litellm/issues/40563)). Corrupts `gemini-3.5-transcribe-live-preview` quality at other sample rates. Open.
16. **[MEDIUM] Qwen3.8 tool result not consumed via native Ollama provider** ([#40575](https://github.com/BerriAI/litellm/issues/40575)). OpenAI-compatible Ollama path works; native path doesn't. Open.
17. **[LOW] MCP OAuth temporary server doesn't inherit OAuth URLs** ([#20495](https://github.com/BerriAI/litellm/issues/20495), closed). Closed.
18. **[LOW] Hardcoded ANSI escape codes in formatter** ([#29799](https://github.com/BerriAI/litellm/issues/29799), closed). Closed.

**Resolved (notable):** MCP OAuth URL inheritance (#20495), budget reset DB overflow (#40564), in-band stream error swallowing (#40578), OpenAPI MCP inline schema stripping (#29715), OTel `gen_ai.input.messages` key normalization (#29756), `/v1/audio/transcriptions` speaker-reference collapse (#29766), UI request-log page jump (#40661).

## What This Means for Application Developers

- **Pin images by digest and verify cosign signatures.** With v1.102.0-dev.2, signature verification is the supported path; operators should configure admission policies (Kyverno, Connaisseur, or `cosign verify` in CI) to refuse unsigned images.
- **Audit your `master_key`.** The newly merged warning ([#40758](https://github.com/BerriAI/litellm/pull/40758)) flags the example `sk-1234` or a missing key — approximately 1 in 10 exposed gateways have been found accepting it. Rotate before the warning becomes an error in a future release.
- **Cost dashboards may under-report.** Azure AI Router deployments (#40728), native Ollama Qwen tool calls (#40575), and the Responses-API bridge for non-streaming completions (#36426) all leak billing events today. Reconcile against upstream provider bills for any of these paths until the fixes land.
- **Avoid the `1.88.x` Prometheus trap** ([#30079](https://github.com/BerriAI/litellm/issues/30079)). Either stay on 1.87.x, jump to a build that includes the redirect fix, or pin your scrape

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-12

## 1. Today's Highlights

Studio/Desktop received a concentrated bug-fix sweep (10+ PRs from @NilayYadav and others) addressing CSV training, API-key leakage, broken stop-text on transformers models, Anthropic mid-stream error handling, and a security issue where API keys without Hugging Face tokens could train using the server owner's HF login. Parallel effort landed the long-requested **AMD ROCm Docker image** (PR #10820) mirroring the CUDA/Blackwell image, plus an ARM64 CPU-only target (PR #10766). Underneath, several tool-call / llama-server correctness bugs are surfacing — most notably a queue-blocking issue where one chat waiting on tool approval parks a slot and starves all queued chats (#10671).

## 2. Releases & Breaking Changes

No tagged releases in the last 24h.

**Unannounced breaking change to flag for integrators:**
- [#10785](https://github.com/unslothai/unsloth/issues/10785) — `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'` in docker image dated 2026-09-11 (package `2026.9.4`). `max_seq_length` has been renamed to `max_length`. Pip-installed users are unaffected; docker users need to update training scripts or pin to a previous tag.

## 3. New Model & Hardware Support

- **AMD ROCm Docker image (RDNA2/3/4 + CDNA/Instinct)** — PR [#10820](https://github.com/unslothai/unsloth/pull/10820) (resync of #6231) brings the ROCm image in line with the CUDA/Blackwell layout from #5748. Tracks issues [#6230](https://github.com/unslothai/unsloth/issues/6230) and [#9581](https://github.com/unslothai/unsloth/issues/9581).
- **ARM64 CPU-only Docker target** — PR [#10766](https://github.com/unslothai/unsloth/pull/10766) adds a CUDA-free build for ARM64 hosts without a GPU.
- **DGX Spark (GB10 / sm_121a / aarch64)** report — PR [#10491](https://github.com/unslothai/unsloth/pull/10491) (no diff): current `unsloth/unsloth` arm64 images run llama.cpp on CPU; GPU acceleration is not yet working on this platform.
- **accelerate cap on Windows ROCm** — PR [#10819](https://github.com/unslothai/unsloth/pull/10819) pins `accelerate<1.15` on Windows because 1.15.0 unconditionally imports `torch._distributed_c10d`, which AMD's Windows ROCm wheels don't ship. Worth noting for anyone running ROCm training on Windows.
- **FLUX.2 Klein** image pipeline — [#10768](https://github.com/unslothai/unsloth/issues/10768) reports a `CUBLAS_STATUS_NOT_INITIALIZED` during VAE decoding on multi-GPU setups.

## 4. Performance & Optimization

- **B200 + Qwen3.5-9B LoRA: GPU mostly idle each step** — [#10806](https://github.com/unslothai/unsloth/issues/10806). Root cause: `fla` rebuilds its autotune key on every `unsloth-cli.py` launch instead of caching it. Single-step wall-time is dominated by autotune, not GEMM. Concrete numbers not yet posted; issue is fresh.
- **Gemma-4-12B QAT GGUF image crashes llama-server** — PR [#10683](https://github.com/unslothai/unsloth/pull/10683) raises the projector micro-batch; a 1400×1400 image (862 prompt tokens) tripped `GGML_ASSERT((cparams.causal_attn || cparams.n_ubatch >= n_tokens_a…))` on RTX 6000 Ada with build 10840. Fixes #10559.
- **ARM64 llama.cpp CPU fallback** is a regression risk for inference latency on GH200/DGX Spark until GPU support is added (#10491).

## 5. Stability & Regressions (ranked by severity)

| Severity | Item | Notes |
|---|---|---|
| 🔴 High | [#10809](https://github.com/unslothai/unsloth/pull/10809) — API key without HF token falls back to **server owner's HF login**, allowing private-model training | **Fix PR open.** Security boundary violation; treat Studio as having full HF access of the server user until merged. |
| 🔴 High | [#10785](https://github.com/unslothai/unsloth/issues/10785) — `SFTConfig(... max_seq_length=...)` raises in current docker image | Rename to `max_length`. Affects docker users only. |
| 🟠 Med  | [#10671](https://github.com/unslothai/unsloth/issues/10671) — Queued chats blocked while one chat waits on tool approval; context budget retained on parked slot | Open, no fix PR. Impacts multi-tenant serving. |
|  Med  | [#10768](https://github.com/unslothai/unsloth/issues/10768) — FLUX.2 Klein VAE decode fails with `CUBLAS_STATUS_NOT_INITIALIZED` on multi-GPU | Open. Blocks diffusion workflows. |
|  Med  | [#10806](https://github.com/unslothai/unsloth/issues/10806) — `fla` autotune rebuilt every launch on B200 | Open. Effective throughput collapse for CLI training. |
|  Med  | [#10355](https://github.com/unslothai/unsloth/issues/10355) — `--tensor-split` silently ignored | Open since 09-05, multiple users. |
| 🟡 Low  | [#10813](https://github.com/unslothai/unsloth/pull/10813) — Blank CSV cells trained as literal `None` | **Fix PR open.** |
| 🟡 Low  | [#10812](https://github.com/unslothai/unsloth/pull/10812) — Stop text ignored on transformers (NVIDIA) backends | **Fix PR open.** |
| 🟡 Low  | [#10821](https://github.com/unslothai/unsloth/issues/10821) — `--fit on` logged while `--fit off` is launched (Manual GPU mode) | Cosmetic/log-only. |
|  Low  | [#10769](https://github.com/unslothai/unsloth/issues/10769) — Large code blocks cause UI lag in Desktop | Open. |
| 🟡 Low  | [#10786](https://github.com/unslothai/unsloth/issues/10786) — Web UI 404s on `127.0.0.1`/`localhost`, serves on LAN IP | Open. |
| 🟡 Low  | [#10795](https://github.com/unslothai/unsloth/issues/10795) — X11 + NVIDIA: WebKit leaks DMA-BUF fds → EMFILE → blank window | Open. |
| 🟡 Low  | [#10793](https://github.com/unslothai/unsloth/issues/10793) — Default Studio/llama-server logs lack troubleshooting context | Feature request. |

**Closed since yesterday:** #10208 (audio-cpp/music generation — declined), #10479 (tool-call budget hallucination), #10756 (conflicting 4-bit/16-bit loader), #10722 (Windows installer with spaces in username), #10155 (image attach after token-limit history).

## 6. What This Means for Application Developers

- **Treat Studio as having the server user's Hugging Face scope** until #10809 merges. If you expose Studio/API keys to untrusted users, set an explicit HF token on every key or sandbox the server user.
- **Pin your docker image** if you train with `max_seq_length` — the rename to `max_length` is live in the 2026-09-11 image.
- **Tool-calling reliability caveats for agent builders:**
  - Duplicate-call guard is too aggressive — re-running a command after editing a file gets skipped (#10792, fix PR #10810).
  - Replayed tool-call argument keys are sorted, causing llama-server to re-process multi-parameter calls (#10791).
  - A chat parked on tool approval holds its slot and blocks queued chats even with free capacity (#10671).
- **Stop sequences don't work on transformers (NVIDIA) backend** today; PR #10812 fixes it. Don't rely on `stop` strings for cost control on that path yet.
- **AMD GPU path is converging** — ROCm Docker is here (#10820); if you're considering an Instinct/MI build, expect rough edges but the layout matches CUDA.
- **DGX Spark / GH200** inference currently runs on CPU. Don't deploy on these for latency-sensitive workloads.
- **Deep Research link rewriting** (#10814 fix) was stripping web addresses out of code blocks — agent-generated code with URLs may need re-verification until the fix rolls into an image.

*Generated from 38 updated issues and 95 updated PRs against `unslothai/unsloth` over the trailing 24h.*

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — Daily Digest
**Date:** 2026-09-12
**Repository:** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. Today's Highlights

OpenCode provider coverage is being expanded with first-class Go support ([PR #1786](https://github.com/musistudio/claude-code-router/pull/1786)), while a new cost-tracking bug surfaces for rule-aliased models where usage logs record the alias name instead of the resolved model ([Issue #1787](https://github.com/musistudio/claude-code-router/issues/1787)). Separately, a long-standing Requesty provider preset PR received an update ([PR #1451](https://github.com/musistudio/claude-code-router/pull/1451)), signaling renewed activity on multi-provider routing. No releases shipped in the last 24 hours.

---

## 2. Releases & Breaking Changes

No new releases in the last 24 hours. Latest published version remains **v3.0.22**, which is the version referenced in the open bug report.

---

## 3. New Model & Hardware Support

No new model architectures, quantization formats, or hardware backends (CUDA / ROCm / Metal / CPU) were introduced. The provider-side additions worth noting:

- **OpenCode Go (`opencode-go`)** — distinct provider record from the existing OpenCode Zen (`opencode`), with separate credentials and potentially overlapping model IDs. The local importer is being updated to handle both reliably ([PR #1786](https://github.com/musistudio/claude-code-router/pull/1786)).
- **Requesty** — OpenAI-compatible routing aggregator in front of OpenAI, Anthropic, Google and others, being added as a first-class preset alongside OpenRouter and NVIDIA ([PR #1451](https://github.com/musistudio/claude-code-router/pull/1451)).

---

## 4. Performance & Optimization

No throughput, latency, memory, or kernel-level performance work landed or proposed in the last 24 hours.

---

## 5. Stability & Regressions

**[#1787 — Estimated cost stays $0 for rule-aliased models](https://github.com/musistudio/claude-code-router/issues/1787)** (OPEN, 🟡 moderate)
- **Severity:** Moderate — affects billing/usage visibility but does not break request flow.
- **Symptom:** When a request is dispatched through a routing rule that aliases one model to another (e.g. `default` → `provider/model-x`), the usage record stores the *alias* string rather than the resolved downstream model. Cost estimation consequently computes `$0` because the alias is not in the pricing catalog.
- **Reported on:** CCR v3.0.22 and confirmed still present on current `master`; the code path involved is unchanged since v3.0.22.
- **Environment:** Container build via official Dockerfile, Claude Code CLI client over Anthropic `/v1/messages` protocol, default `usage` storage backend.
- **Fix PR:** None open yet.

Also worth flagging as recently closed context: [#1785](https://github.com/musistudio/claude-code-router/pull/1785) — a prior OpenCode Go PR was closed (likely superseded by [#1786](https://github.com/musistudio/claude-code-router/pull/1786)); the related `x-opencode-session` header fix referenced issues #1754 and #1780.

---

## 6. What This Means for Application Developers

- **Don't trust CCR cost reporting for rule-aliased models until [#1787](https://github.com/musistudio/claude-code-router/issues/1787) is resolved.** If your routing config maps aliases like `default` or `fast` to underlying models, your usage dashboards will silently underreport spend. Mitigation: query the resolved model directly via CCR logs rather than relying on the stored `model` field, or avoid aliases for cost-sensitive routing.
- **OpenCode users get a clearer separation between Zen and Go providers** once [#1786](https://github.com/musistudio/claude-code-router/pull/1786) merges. Expect two distinct provider entries, non-overlapping import records, and correct `x-opencode-session` header handling — which was the root cause of the recently closed [#1785](https://github.com/musistudio/claude-code-router/pull/1785).
- **Multi-provider routing is trending more plug-and-play.** The Requesty preset ([#1451](https://github.com/musistudio/claude-code-router/pull/1451)) would let teams fan out across OpenAI/Anthropic/Google via a single OpenAI-compatible endpoint with `ccr://provider` deep-link import, reducing the manual JSON config burden when adding providers.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-12

## 1. Today's Highlights

CC Switch **v3.20.3** ships with Kimi's Codex preset migrated to the native OpenAI Responses API, completing a sweep that now puts DeepSeek, Zhipu GLM, Qwen, MiMo, LongCat, Kimi, Volcengine Doubao, and Tencent Hunyuan on direct vendor endpoints (no local format-conversion routing). On the proxy side, the queue is dominated by **Responses-API edge cases**: minimal `max_tokens`, `detail: "original"` on images, and `description: null` on hosted tools are all being hardened this week, while a breaking refactor in **PR #7317** renames `model_mapper` → `model_router`.

## 2. Releases & Breaking Changes

- **v3.20.3** released ([release notes](https://github.com/farion1231/cc-switch/releases/tag/v3.20.3)) — Kimi Codex presets switched from Chat Completions translation to native Responses. Existing users with older Chat-format Kimi cards must re-add the preset or flip "upstream format" to **Resp** in the edit page.
- **Upcoming breaking change — PR #7317** ([#7317](https://github.com/farion1231/cc-switch/pull/7317)): `model_mapper` is replaced by `model_router`. Any downstream consumer, plugin, or fork depending on the old key will need to migrate. New feature: rule-based model routing across Claude/Codex/Gemini.
- **PR #6792** ([#6792](https://github.com/farion1231/cc-switch/pull/6792)): Grok providers now keep separate account credentials; Codex usage import is hardened against Windows mtime-skipped writes.
- **Dependabot sweep** ([#7285](https://github.com/farion1231/cc-switch/pull/7285)): 53 Rust dependency updates in `src-tauri`.

## 3. New Model & Hardware Support

- **Kimi Codex preset** now native Responses ([v3.20.3](https://github.com/farion1231/cc-switch/releases/tag/v3.20.3)).
- **DeepSeek V4.1 Flash** — `deepseek-flash` carries `input_modalities: ["text","image"]`; the legacy alias `deepseek-v4-flash` remains a valid vision alias. CC Switch's built-in catalog was patched in **PR #7286** ([#7286](https://github.com/farion1231/cc-switch/pull/7286)) so image blocks no longer get replaced with `[Unsupported image...]`.
- **Grok 4.6** reasoning effort properly propagated via **PR #7318** ([#7318](https://github.com/farion1231/cc-switch/pull/7318)) — `grok-4.6` and `grok-4.6-build` were missing from the `supports_reasoning_effort` whitelist, causing `/effort xhigh` to be silently dropped.
- **cocodot** added as a new Claude Code + Codex provider ([#7313](https://github.com/farion1231/cc-switch/pull/7313)) — Anthropic-native for Claude, Chat Completions via local route for Codex.
- **MiMo adaptation** request closed by v3.20.3 ([#4073](https://github.com/farion1231/cc-switch/issues/4073)).

## 4. Performance & Optimization

- **PR #7307** ([#7307](https://github.com/farion1231/cc-switch/pull/7307)): adds a **probe timeout** to `fetch_npm_dist_tags`, eliminating the stuck "checking version" spinner in the local environment panel. Root cause: `zsh -lic "{tool} --version"` returns in ~0.6 s locally; the remote npm call was the one hanging indefinitely.
- **PR #7287** ([#7287](https://github.com/farion1231/cc-switch/pull/7287)): clamps sub-floor `max_tokens` (1–15) to the Responses API minimum of 16. Claude Desktop probes with `max_tokens=1`, which was causing strict upstream providers (OpenCode Zen Go) to 400 and mark the model "unavailable".
- **PR #7293** ([#7293](https://github.com/farion1231/cc-switch/pull/7293)): bypasses inherited system proxies for **loopback upstream targets** (`127.0.0.1`). Previously, enabling ClashX/Verge/v2rayN globally made local OpenAI-compatible servers unreachable.
- **PR #7094** ([#7094](https://github.com/farion1231/cc-switch/pull/7094)): persistent per-provider Claude Code sessions (replaces the temporary `--settings` overlay), improving MCP/plugin isolation and switching cost.
- **PR #6636** ([#6636](https://github.com/farion1231/cc-switch/pull/6636)): session search now indexes full transcripts instead of metadata only — restores the documented "search by content" behavior.

## 5. Stability & Regressions

Ranked by impact. **Bold** items are still open with no merged fix PR as of today.

- **[HIGH, OPEN]** **[#4341](https://github.com/farion1231/cc-switch/issues/4341)** — Codex conversations with third-party providers auto-disconnect mid-thread (49 comments, no fix yet).
- **[HIGH, OPEN]** **[#7224](https://github.com/farion1231/cc-switch/issues/7224)** — Abnormal memory usage on 3.20.x (5 comments).
- **[HIGH, OPEN]** **[#4741](https://github.com/farion1231/cc-switch/issues/4741)** — `/responses` proxy fails on tool messages lacking preceding `tool_calls` (HTTP 400 from DeepSeek). Mitigated in spirit by **PR #7319** but the exact tool-message-ordering bug is still open.
- **[HIGH, OPEN]** **[#7221](https://github.com/farion1231/cc-switch/issues/7221)** — 3.20.2 regresses Claude Code to `haiku`-only on `qwen3.8 27B`; other model selections error.
- **[MEDIUM, OPEN]** **[#4679](https://github.com/farion1231/cc-switch/issues/4679)** / **[#4642](https://github.com/farion1231/cc-switch/issues/4642)** — local proxy caches macOS system proxy state and doesn't refresh on proxy change → 502s; partial fix in **PR #7293**.
- **[MEDIUM, OPEN]** **[#5687](https://github.com/farion1231/cc-switch/issues/5687)** — Codex 3.18.0 sync permanently defers parent when fork occurs after idle gap; related fix in **PR #7093** (paginated rollout merge).
- **[MEDIUM, OPEN]** **[#7264](https://github.com/farion1231/cc-switch/issues/7264)** — Codex usage under-counts; activity log growth without mtime change is skipped.
- **[MEDIUM, OPEN]** **[#7029](https://github.com/farion1231/cc-switch/issues/7029)** — All usage queries & connectivity checks fail after system proxy tool restart until CC Switch is relaunched.
- **[MEDIUM, OPEN]** **[#6936](https://github.com/farion1231/cc-switch/issues/6936)** — macOS 13: all provider checks and in-app updates broken; Codex API also fails.
- **[RESOLVED]** [#7236](https://github.com/farion1231/cc-switch/issues/7236) (Claude Code 2.1.265 → Deepseek/ZAI), [#5028](https://github.com/farion1231/cc-switch/issues/5028) (GLM 5.2 streaming → empty `thinking` blocks), [#5860](https://github.com/farion1231/cc-switch/issues/5860) (Responses→Chat infinite-reason loop on DeepSeek), [#7088](https://github.com/farion1231/cc-switch/issues/7088) (OpenCodeGo `x-opencode-session` header), [#6529](https://github.com/farion1231/cc-switch/issues/6529) (Codex Responses→Chat commentary split), [#4404](https://github.com/farion1231/cc-switch/issues/4404) (fragmented `content_block_start` on reasoning models).

## 6. What This Means for Application Developers

- **Migrate Codex presets now.** With v3.20.3, the Chat-Completions path is the legacy option; all major Chinese open-source providers route directly to the Responses endpoint. Expect lower latency and fewer streaming-edge-case bugs, but validate any custom Anthropic→OpenAI conversion logic against the new path.
- **Plan around the `model_mapper` → `model_router` rename** before **PR #7317** lands. If you fork CC Switch or write plugin extensions that introspect routing config, abstract the lookup behind your own shim now.
- **Use full reasoning effort on Grok 4.6.** Before **PR #7318**, `/effort xhigh` silently degraded to default; if you ship an agent that depends on maximum-depth reasoning on Grok, ensure your users update.
- **Loopback providers are now first-class.** Self-hosted OpenAI-compatible servers (`127.0.0.1:port`) will actually receive traffic on proxy-enabled hosts after **PR #7293** — useful for local stack debugging and CI.
- **Tool-definition hygiene matters.** Per **PR #7319**, any upstream that strict-validates `tools.N.function.description` will reject Anthropic hosted tools (web_search, web_fetch, text_editor) when proxied through older builds. If you maintain an MCP server, ensure `description` is either a non-null string or omitted, never `null`.
- **Heads-up on the `[Unsupported image...]` regression**: if you were sending image content to `deepseek-v4-flash`, older builds were silently dropping it; **PR #7286** restores vision. Update before declaring any vision agent EOL on DeepSeek.
- **System-proxy lifecycle is still rough on macOS** ([#4642](https://github.com/farion1231/cc-switch/issues/4642), [#7029](https://github.com/farion1231/cc-switch/issues/7029)). For agents that toggle VPN/proxy at runtime, recommend users relaunch CC Switch or pin providers to direct mode until the caching bug is fully resolved.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-12

## 1. Today's Highlights

The **v1.0.0-rc.37** release ships the new **Pricing Configuration** system (old pricing model deprecated) alongside enhanced **Task Plugins** with streaming and per-plugin billing expressions. A high-severity **`InitChannelCache` nil-map panic** that was causing production container restarts got fixed via [#7323](https://github.com/QuantumNous/new-api/pull/7323), and the gateway gained optional **Langfuse observability** ([#7313](https://github.com/QuantumNous/new-api/pull/7313)).

## 2. Releases & Breaking Changes

- **[v1.0.0-rc.37](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.37)** — Pricing Configuration, Task Plugins, Passkey
  - **Deprecation**: legacy pricing model will be removed; admins can convert current prices into a billing-expression draft and preview effective prices before saving.
  - **New pricing editor**: conditional pricing, per-call fees, time-based rules, image-usage & image-cache accounting.
  - **Built-in billing expressions** for `gpt-image-2`, `gpt-image-2.5-sunburst`, `gpt-image-2.5-flare`; existing admin overrides still take priority.
  - **Task plugins**: streaming output, per-plugin usage pricing & billing expressions, plugin-detail changelog view, English fallback.
- **GA criteria request** — [#7279](https://github.com/QuantumNous/new-api/issues/7279) (👍 5): maintainer asked to clarify v1.0.0 GA criteria while on rc.36/rc.37.
- **OpenCode Zen Provider** first-party channel support merged — [#7329](https://github.com/QuantumNous/new-api/issues/7329).

## 3. New Model & Hardware Support

- **New upstream provider**: official **OpenCode Zen** channel adapter added via [#7329](https://github.com/QuantumNous/new-api/issues/7329).
- **New built-in pricing**: `gpt-image-2`, `gpt-image-2.5-sunburst`, `gpt-image-2.5-flare` ship with default billing expressions in rc.37.
- **Qwen3 family regression fix**: `qwen3.7-max` / `qwen3.8-max` were being trimmed to `qwen3.7` / `qwen3.8` since rc.31 — [#7201](https://github.com/QuantumNous/new-api/issues/7201) closed.
- **Veo / Gemini video plugin fixes** ([#7311](https://github.com/QuantumNous/new-api/pull/7311), [#7314](https://github.com/QuantumNous/new-api/pull/7314)): switch request payload from unsupported `parameters.numberOfVideos` to `sampleCount`, and read the correct URI from `generatedSamples` rather than the Python-SDK-shaped path.

## 4. Performance & Optimization

- **Channel-health probing dedup** — [#7328](https://github.com/QuantumNous/new-api/pull/7328) (closed/merged): adds `/status` and `/api/status-check`; probes are issued once per `(channel, model)` and fanned out to the owning groups, eliminating redundant upstream checks.
- **Multi-Key channel "Test All Keys"** — [#7112](https://github.com/QuantumNous/new-api/pull/7112): concurrent key validation, auto-disable rules, mobile-UI fixes.
- **Retry-priority preservation after auto-disable** — [#7294](https://github.com/QuantumNous/new-api/pull/7294): ensures disabled-channel removal doesn't disturb the remaining channel ordering.
- **Overload sentinel now reads container metrics** — [#7317](https://github.com/QuantumNous/new-api/pull/7317): `system_cpu_overloaded` no longer trips on host CPU under containerized deployments; adds continuity & freshness checks.
- **Retry-logic rework proposed** — [#4236](https://github.com/QuantumNous/new-api/issues/4236): open design discussion on smarter retry decisions.

## 5. Stability & Regressions

Ranked by severity, today's most material items:

| Severity | Issue | Status | Fix |
|---|---|---|---|
| 🔴 Critical (production crash) | [`InitChannelCache` nil-map panic](https://github.com/QuantumNous/new-api/issues/7331) when an enabled channel's group has no abilities row — restarts the container every sync cycle | OPEN | [PR #7323](https://github.com/QuantumNous/new-api/pull/7323) ready |
| 🟠 High (data loss) | [BatchUpdater drops accumulated deltas on shutdown](https://github.com/QuantumNous/new-api/issues/7325) when `BATCH_UPDATE_ENABLED=true` | CLOSED (invalid per maintainer) | None yet |
| 🟠 High (overload false-positive) | [`system_cpu_overloaded` uses host CPU](https://github.com/QuantumNous/new-api/issues/7316) → traffic tripped inside containers | CLOSED (invalid per maintainer) | [PR #7317](https://github.com/QuantumNous/new-api/pull/7317) |
| 🟡 Medium (correctness) | [Tiered billing logs misreport "dynamic billing · no match result"](https://github.com/QuantumNous/new-api/issues/7296) | OPEN | [PR #7324](https://github.com/QuantumNous/new-api/pull/7324) |
| 🟡 Medium (correctness) | [`qwen3.7-max` / `qwen3.8-max` trimmed to base name](https://github.com/QuantumNous/new-api/issues/7201) | CLOSED | Merged |
| 🟡 Medium (correctness) | [Veo video URI read from wrong JSON path](https://github.com/QuantumNous/new-api/pull/7314) | OPEN | [PR #7314](https://github.com/QuantumNous/new-api/pull/7314) |
| 🟡 Medium (correctness) | [Veo sends unsupported `numberOfVideos`](https://github.com/QuantumNous/new-api/pull/7311) | OPEN | [PR #7311](https://github.com/QuantumNous/new-api/pull/7311) |
| 🟢 Low | [Audio extension is case-sensitive](https://github.com/QuantumNous/new-api/issues/7319) | OPEN | [PR #7321](https://github.com/QuantumNous/new-api/pull/7321) |
| 🟢 Low (info-leak) | [Model-square perf page leaks hidden groups](https://github.com/QuantumNous/new-api/issues/7309) | OPEN | [PR #7326](https://github.com/QuantumNous/new-api/pull/7326) |

> Note: [#7322](https://github.com/QuantumNous/new-api/issues/7322) was the same panic as #7331 but was auto-closed by the reviewer bot for missing the bug-report template; #7331 re-submits with the correct form and [PR #7323](https://github.com/QuantumNous/new-api/pull/7323) supersedes it.

## 6. What This Means for Application Developers

- **Migrate pricing off the legacy model now**: rc.37 gives you a one-click conversion + preview flow; locking this in early avoids surprises when the old schema is removed.
- **Pin to a fixed RC for production**: the rc.37 `InitChannelCache` panic and Veo parameter bugs both have unmerged fixes — deploy [PR #7323](https://github.com/QuantumNous/new-api/pull/7323) (or pin to the next rc once it ships) before scaling up.
- **Use the new Langfuse integration** ([#7313](https://github.com/QuantumNous/new-api/pull/7313)) for per-request traces and retry metadata — it's async/batched so it doesn't sit on the hot path.
- **Plan around quota automation**: [#7320](https://github.com/QuantumNous/new-api/pull/7320) adds global + per-user recurring quota reset, useful for credit-pool or seat-based billing models.
- **Expect organization/team primitives soon**: [#7312](https://github.com/QuantumNous/new-api/issues/7312) (shared quota, member roles, resource isolation) is gaining traction and would let you stop bolting tenancy on top of the user table.
- **Bulk operations UX is filling in**: [#7318](https://github.com/QuantumNous/new-api/issues/7318) (bulk user delete) is in the enhancement queue — relevant if you administer large end-user bases.
- **Provider reach grows**: the official OpenCode Zen channel ([#7329](https://github.com/QuantumNous/new-api/issues/7329)) gives you another first-party upstream without a custom adapter.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*