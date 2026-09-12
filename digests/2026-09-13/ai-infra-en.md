# AI Infrastructure Digest 2026-09-13

> Generated: 2026-09-12 23:30 UTC | Projects covered: 9

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

**Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth, Claude Code Router (CCR), CC Switch, New API

---

## 1. Ecosystem Overview

The ecosystem's center of gravity today is the **DeepSeek-V4 / V4.1-Flash rollout**, which is simultaneously driving the fastest feature velocity (vLLM, SGLang) and the densest concentration of correctness debt — particularly on consumer Blackwell (SM120/SM121: GB10, DGX Spark, RTX 6000D) and multi-host deployments. A retrieval-correctness bug reproducing across vLLM, SGLang, *and* commercial providers (#55927) signals shared-risk dependencies at the kernel/attention layer rather than isolated defects. Below the engine layer, **llama.cpp continues its industrial release cadence (10 builds/day)** while the gateway tier (LiteLLM, New API, CC Switch, CCR) competes on billing correctness, protocol translation, and coding-agent routing rather than raw throughput. Unsloth spent the cycle on stabilization (main branch recovery, Docker fixes) and AMD ROCm expansion. Net posture: **high velocity, uneven trust — silent-wrong-output bugs outnumber loud crashes in today's digests.**

---

## 2. Activity Comparison

*Counts = distinct issues/PRs surfaced in today's digests (opened, updated, or closed); not a measure of total repo traffic.*

| Project | Layer | Issues (ref'd) | PRs (ref'd) | Release Status (24h) | Dominant Theme |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~23 (6 stale-closed) | ~23 | None | DS-V4.1 ROCm kernel push; DSpark disagg; DS-V4.x bug cluster |
| **SGLang** | Serving engine | ~22 (6 closed) | ~17 | None | Blackwell SM120/121 correctness cluster; MLA/TRTLLM fusion |
| **llama.cpp** | Local runtime | ~25 (9 closed/fixed) | ~22 | **10 builds** (b10921–b10932) | Backend breadth (HIP, OpenCL, WebGPU, Vulkan); IQ-quant safety |
| **Ollama** | Local runtime | ~13 | ~9 | None | Corrective maintenance; tool-call parser fixes |
| **LiteLLM** | Gateway | ~24 (8 fixed/closed) | ~14 | None | Cost/billing correctness sweep; Responses↔Chat bridge |
| **Unsloth** | Fine-tuning | ~12 | ~15 | None | Main-branch recovery; ROCm Docker; Studio security report |
| **Claude Code Router** | Coding-agent router | ~6 | ~3 | None | Cost attribution fix; non-streaming reasoning corruption |
| **CC Switch** | Desktop switcher/proxy | ~22 (11 stale/closed) | ~19 | None | Codex/DeepSeek `/responses` fixes; `model_mapper`→`model_router` rename |
| **New API** | Self-hosted gateway | ~10 | ~15 | None (v1.0.0-rc.37 line) | Security hardening (SSRF); vLLM channel; billing accuracy |

**Read:** Engine projects carry the heaviest open-issue load relative to fix throughput (vLLM lists ~11 open bugs with *no fix PR*, several affecting flagship models). llama.cpp is the only project shipping releases today, consistent with its small-surface, high-frequency model. The four gateway/router projects together show ~64 issues/51 PRs — proportionally heavy activity for a layer that "just proxies."

---

## 3. Model Support Race

| Model family | vLLM | SGLang | llama.cpp | Ollama | Gateways (LiteLLM / New API / CCR / CC Switch) |
|---|---|---|---|---|---|
| **DeepSeek-V4 / V4.1-Flash** | Registration merged (#56214); DSpark MTP in PP disagg (#53577); sparse-MLA PCP+DCP (#56157). **Broken**: H20 (#56389), GB10 (#56461), Ampere blocked | MXFP4 MI355X recipes (#39230), unified two-pool KV (#37413), FP4-KV RFC (#38902). **Broken**: silent 25% GEMM errors on SM121 (#39193) | — | — | LiteLLM: Prism native provider (#40914). CC Switch: vision capability gap (#7308), sub-agent failures (#6178). Unsloth: GGUF request unanswered (#10838) |
| **GLM-5.2 / 5.3-Flash** | GLM-5.3-Flash degeneration bug (#56605) | GLM-5.2 MXFP4 recipes shipped (#39230) | GLM-5.2 dense-MLA corruption, open (#26027) | — | CCR: non-streaming content corruption (#1793); GLM-5.3 token plan RFC (#1747) |
| **Gemma 4** | GemmaRMSNorm Triton path (#56308) | Tool-call parser fix (#39240) | OpenVINO load failure (#24415) | Deepest: vision detection (#16879), 2 parser PRs (#18400, #18398), Jetson OOM (#18396) | — |
| **Qwen 3.5/3.8/4** | Qwen4Exp QSA OOM (#56457); hybrid GDN prefix-cache fix (#52244) | MLX Qwen3.5 crash+quality fixes (#39238, #39242) | Sparse FA for Qwen4 (#28770); Qwen3-Coder parsing (#28742) | qwen3.8 streaming 500 (#17778, fix pending) | — |
| **Long tail** | Kimi K3 perf tracker (#50587) | Kimi K3 disagg TTFT (#34815); MiniMax H3 GGUF (#38904) | ELMOD 2.7b (#28818); Ling 3.0/Bailing V3 parsers (#28682) | Hy4 declined (#18287) | Meta Muse Voice (LiteLLM #39395); Gemini 3.x suffix + Agentic Video (New API #7339, #7337); Databricks Gemini 2.5 (LiteLLM #40909) |

**Verdict:** **vLLM and SGLang lead on frontier MoE support** but ship it pre-stabilized — DS-V4.1-Flash is simultaneously "supported" and unsafe on two major GPU tiers. **llama.cpp leads on architecture breadth** (niche models, 7+ backends). **Gateways lead on time-to-route** (metadata within days of model availability). The quant/local ecosystem (Unsloth GGUF, Ollama) visibly **lags the frontier by weeks**, which is where consumer demand is queuing (#10838, #18287).

---

## 4. Performance Frontier

Optimization effort concentrates in five areas:

- **Kernels — the AMD MI355X/gfx950 push is the biggest single investment.** vLLM landed four DS-V4.1 ROCm PRs in one day (TileLang 64-wide wavefront fix that averts a 91.1%→23.7% GSM8K regression, MXFP8 dequant fallback, fused `combine_topk_swa_indices`, fused SwiGLU clamp); SGLang added TRTLLM MLA fused FP8 KV/Q prep (#39232) and VibeCUDA MSA routing (#39233). Reported ceiling: 35.89 tok/s @ concurrency 1 on 8× MI355X (vLLM #56506) — clearly headroom left.
- **KV cache & quantization:** SGLang's FP4-KV RFC (#38902) and two-pool unified KV (#37413); DeepEP v2 BF16 batch-invariant mode (#38160); llama.cpp's IQ-quant→cuBLAS fallback for Blackwell (#28823) — a correctness-over-speed concession. Unsloth pushes NVFP4/EXL3 on the training side.
- **Speculative decoding is universally deployed and universally fragile:** vLLM's DFlash shows FSM failures with `xgrammar` (#53777), a 4–13× net *loss* at 185k context (#54691), and Mamba zero-reuse (#54381); SGLang's quantized DFlash2 drafts silently accept ~0% (#39087); llama.cpp's MTP prefill is 57× slower on MSVC (#28790).
- **Distributed/disaggregated serving:** vLLM's DSpark PP targets in disagg (#53577), Elastic EP under MRV2 (#53934), NIXL topology (#56645); SGLang's open 30s TTFT floor on PP8 Kimi-K3 (#34815).
- **Scheduling & host-side overhead:** SGLang's GPU-sync removal in sampling (#39234) and contention-aware EPLB batching RFC (#39192); vLLM's MoE expert-offloading RFC (#38256); Ollama's keep-alive fix (free embedding throughput, #18392); llama.cpp dist-tags probe (CC Switch #7346, MB-scale bandwidth savings).

**Gap to watch:** edge/local perf is regressing relative to datacenter — qwen35 hits 86% of memory-bandwidth roofline on RTX 4090 but only ~28% on RTX 5090/Windows (#28196), and CUDA-graph hangs persist on sm_120 (#27330, #28404).

---

## 5. Layer Positioning

| Layer | Projects | Value proposition | Today's evidence |
|---|---|---|---|
| **Datacenter serving engines** | vLLM, SGLang | Kernel-level throughput, TP/EP, disagg, spec decode | 40 perf/kernel PRs across both; competing DS-V4.1 recipes |
| **Local runtimes** | llama.cpp, Ollama | Backend breadth (CUDA/HIP/Vulkan/OpenCL/SYCL/WebGPU/Metal) and packaging/usability | llama.cpp: 10 releases, 6 backend families touched. Ollama: stability polish, inherits llama.cpp defects (e.g., keep-alive) |
| **Gateways & routers** | LiteLLM, New API, CC Switch, CCR | Multi-provider routing, billing, protocol translation, coding-agent ergonomics | Billing-correctness sweeps (LiteLLM ×4 fixes; New API Anthropic cache tokens #7305; CCR #1790); Responses↔Chat↔Messages translation fixes everywhere |
| **Fine-tuning** | Unsloth | Memory-efficient training, quantization, Studio tooling | TRL-0.20 compat, ROCm Docker, EXL3; main-branch recovery |

**Key structural observation:** the layers are fusing. New API added a *native vLLM channel* (#7332); LiteLLM is absorbing *memory tools into the gateway* (#40918); CC Switch/CCR are becoming mini-gateways specialized for Claude Code/Codex; Ollama's bugs are increasingly llama.cpp's bugs surfaced. The engine ↔ gateway boundary is the active interface.

---

## 6. Trend Signals

1. **DeepSeek-V4.x is the ecosystem's stress test.** It appears in 6 of 9 projects — as feature, recipe, billing metadata, or bug source. Support surface is expanding faster than stabilization; treat "supported" as "supported on specific GPU tiers" (H200/MI355X ≠ H20 ≠ SM120/121 ≠ Ampere).
2. **Consumer Blackwell (SM120/121) is the least trustworthy tier.** Silent 25% GEMM errors (SGLang #39193), capture-time crashes (#39226, #39173), CUDA-graph hangs (llama.cpp #27330), Marlin corruption (vLLM #49546). Notably, several failures are *silent* — no error, no warning.
3. **Silent correctness failures are the dominant risk class**, ahead of crashes: KV state bleed across requests (Ollama #17847), ghost tool calls (vLLM #56642), 0%-acceptance spec decode (SGLang #39087), dropped top-k candidates (vLLM #51782), cross-engine retrieval errors (vLLM #55927). The cross-engine reproduction suggests shared kernel lineage — diversifying backends may not diversify risk.
4. **Speculative decoding has crossed from differentiator to liability-management.** Every engine shipped a spec-decode correctness/perf bug today. Until per-context-length auto-disable exists, spec-decode wins must be re-benchmarked per workload.
5. **AMD is now a first-class target, coordinated across layers:** vLLM ROCm CI overhaul + 4 kernel PRs, SGLang MI355X recipes, llama.cpp per-arch GCN tables, Unsloth ROCm Docker. The MI355X-vs-H100/B200 race is the perf story of the quarter.
6. **The gateway layer differentiates on money and protocol, not routing.** Five of nine projects shipped billing/attribution fixes (LiteLLM cached-audio 2× overbilling, Gemini Live double-billing, Azure $0 regression; New API cache-token metering; CCR $0 aliases). Anyone using gateway spend data for chargeback should freeze dashboards and reconcile after these land.
7. **Coding agents are the fastest-growing routing surface.** CC Switch's Codex/DeepSeek `/responses` cluster, CCR subagent routing fixes, LiteLLM Codex quirks, Ollama/llama.cpp tool-parser PRs — plus hygiene concerns (client fingerprint headers leaking through transforms, CC Switch #7305).
8. **The Responses API is the protocol fault line.** Reasoning-content loss (LiteLLM #40654/#40887), corrupted non-streaming blocks (CCR #1793), reasoning-replay sanitization (CC Switch #7342), `include_reasoning` ignored (SGLang #39103). Translation layers are one release behind the protocol.
9. **Security debt is surfacing at every layer simultaneously:** LiteLLM Helm root-by-default (#40822), Unsloth Studio sandbox bypass (#10835), New API SSRF fixes, LMCache cache-key collisions (vLLM #56643). Supply-chain-adjacent, all fixable, none optional.

**For agent/application developers — action items from today's data:** pin engine images and avoid DS-V4.1 on SM120/121 and H20 (cap `max_num_seqs ≤ 256`); disable DFlash for long-context or structured-output workloads; treat gateway cost dashboards as provisional until the billing fixes merge; validate non-streaming reasoning paths end-to-end; implement client-side resilience — a single TCP reset can currently kill an SGLang engine (#39216).

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-13

## Today's Highlights

The DeepSeek-V4 / V4.1-Flash support surface keeps expanding and so do its edge-case failures: a Triton `dsv4_topk` illegal memory access on H20, a serving incompatibility on GB10/SM120-SM121, and a deep-context retrieval correctness bug reproducible across vLLM and SGLang. On the performance side, a stream of ROCm DeepSeek-V4.1 kernel PRs (TileLang mHC pre on 64-wide wavefronts, MXFP8 dequant path, fused `combine_topk_swa_indices`, fused SwiGLU clamp) landed as the AMD MI355X tuning push continues. DFlash speculative decoding is also accumulating bug reports — FSM failure with `xgrammar`/`json_object`, net slowdown on hybrid GDN at 185k context, and a zero-reuse WIP fix for Mamba-style drafts.

## Releases & Breaking Changes

No new releases in the last 24h. Nothing flagged as breaking.

## New Model & Hardware Support

- **DeepSeek-V4.1-Flash** model registration merged ([#56214](https://github.com/vllm-project/vllm/pull/56214), referenced via [#56461](https://github.com/vllm-project/vllm/issues/56461)) — but several deployment platforms (H20 SM90, GB10 SM120/SM121) are still broken (see Stability section).
- **DeepSeek-V4-Flash-0731** checkpoint raised by users requesting **SM8x (Ampere A100/A800, RTX 30xx) support** — still blocked by issue [#40851](https://github.com/vllm-project/vllm/issues/50576)).
- **DSpark (DeepSeek multi-token prediction)** now supports **pipeline-parallel targets in disaggregated serving**, plus padded-graph-batch safety — [#53577](https://github.com/vllm-project/vllm/pull/53577).
- **PCP + DCP** enabled on **sparse-MLA models** (merged via [#56157](https://github.com/vllm-project/vllm/pull/56157)); NIXL transfer-rank topology follow-up in [#56645](https://github.com/vllm-project/vllm/pull/56645).
- **Elastic Expert Parallel** now supported under **Model Runner V2** — [#53934](https://github.com/vllm-project/vllm/pull/53934).
- **ROCm CI**: Stage G gating adds 15 AMD mirrors ([#50922](https://github.com/vllm-project/vllm/pull/50922)); DinD deprecated across all 37 MI250 groups ([#56162](https://github.com/vllm-project/vllm/pull/56162)).
- **ROCm** fused `clamp+SwiGLU` activation now wired into the `SiluAndMulWithClamp` op — [#54074](https://github.com/vllm-project/vllm/pull/54074).
- **CUDA** Triton path added for `GemmaRMSNorm` with FP32 normalize + fused residual — [#56308](https://github.com/vllm-project/vllm/pull/56308).

## Performance & Optimization

- **DeepSeek-V4.1, ROCm** ([#56342](https://github.com/vllm-project/vllm/pull/56342)): fix TileLang mHC-pre kernels for 64-wide wavefronts; without the fix, AMD path regresses from **91.1% → 23.7% on GSM8K**. Both commits land together.
- **DeepSeek-V4.1, ROCm** ([#56560](https://github.com/vllm-project/vllm/pull/56560)): pre-dequantize MXFP8 weights to BF16 when `K % 128 ≠ 0` so `tl.dot_scaled` is no longer a hard requirement.
- **DeepSeek-V4.1, ROCm** ([#56638](https://github.com/vllm-project/vllm/pull/56638)): re-enable fused `combine_topk_swa_indices` Triton kernel on gfx950.
- **DeepSeek-V4.1, generic** ([#56633](https://github.com/vllm-project/vllm/pull/56633)): fold the mHC post block into the next sublayer's delayed pre projection to remove the split-k projection that re-reads residuals.
- **DeepSeek-V4.1-Flash on MI355X** is leaving throughput on the table — [#56506](https://github.com/vllm-project/vllm/issues/56506) RFC tracks a perf plan. Reported numbers: TP4, MXFP4 MoE + DSpark MTP, 8× MI355X: concurrency 1 → 35.89 out tok/s (8.97/GPU), TTFT p50 0.898s.
- **Incremental MoE Expert Offloading (RFC)** — [#38256](https://github.com/vllm-project/vllm/issues/38256); first PR [#37190](https://github.com/vllm-project/vllm/pull/37190) open. CPU-pinned expert pool + LFRU GPU cache + cross-layer prefetch; targets MoE models that exceed VRAM.
- **Batch Invariant** feature still being hardened — [#27433](https://github.com/vllm-project/vllm/issues/27433) tracker; one correctness gap found this week ([#56370](https://github.com/vllm-project/vllm/issues/56370), see Stability).
- **Kimi K3 perf** checklist — [#50587](https://github.com/vllm-project/vllm/issues/50587); shared JIT warmup from [#47456](https://github.com/vllm-project/vllm/pull/47456) keeps landing model-level de-JITification ([#49349](https://github.com/vllm-project/vllm/issues/49349)).

## Stability & Regressions

Ranked roughly by potential user impact:

1. **[Bug, DeepSeek-V4.1-Flash, H20]** CUDA illegal memory access in `dsv4_topk` Triton kernel under high concurrency; mitigated by `max_num_seqs=256`. [#56389](https://github.com/vllm-project/vllm/issues/56389) — **no fix PR yet**.
2. **[Bug, DeepSeek-V4.1-Flash, GB10/SM120-SM121]** Cannot serve on Blackwell consumer parts — SWA block 32 vs SM120 decode page 64, ratio-1 indexer block_kv=128 vs DeepGEMM sm120 (64 only). [#56461](https://github.com/vllm-project/vllm/issues/56461) — **no fix PR yet**.
3. **[Bug, DeepSeek-V4-Flash-0731, multi-host]** Deterministic wrong token on deep-context exact retrieval at 1-in-4 prompt lengths (`PROVOCATIVE-8417` → `PROVOCATIVE-8411`, T=0). Reproduces on vLLM 0.28.0 + SGLang, on DeepInfra and Baidu; OpenInference correct. [#55927](https://github.com/vllm-project/vllm/issues/55927) — **no fix PR yet**; high blast radius for agentic workloads.
4. **[Bug, Qwen4Exp QSA indexer, GB10 SM121, unified memory]** Per-chunk logits buffer grows with `max_seq_len`; caching allocator retains every size → OOM/hang during long prefill. [#56457](https://github.com/vllm-project/vllm/issues/56457) — **no fix PR yet**.
5. **[Bug, GLM-5.3-Flash]** Degenerates into repeated-token "word salad" in multi-turn agentic use. [#56605](https://github.com/vllm-project/vllm/issues/56605) — **fresh issue, no fix PR yet**.
6. **[Bug, DFlash + xgrammar `json_object`]** Deterministic `Failed to advance FSM`; always the same draft token. [#53777](https://github.com/vllm-project/vllm/issues/53777) — **no fix PR yet**.
7. **[Bug, DFlash on hybrid GDN at ~185k context]** Net loss: ~71 → ~16 tok/s at DT=4 (vs ~218 tok/s at DT=8 short context); no per-sequence-length disable hook. [#54691](https://github.com/vllm-project/vllm/issues/54691) — **no fix PR yet**.
8. **[Bug, Batch Invariance + Sequence Parallelism]** `VLLM_BATCH_INVARIANT=1` with `pass_config.enable_sp` breaks batch invariance on 4× RTX PRO 6000 Blackwell. [#56370](https://github.com/vllm-project/vllm/issues/56370) — **no fix PR yet**.
9. **[Bug, ROCm DS V4 MRV2 + `FULL_DECODE_ONLY` graph]** Accuracy drops on MI350/MI355. [#52644](https://github.com/vllm-project/vllm/issues/52644) — **no fix PR yet**.
10. **[Bug, Marlin W4A8-FP8 on GB10/sm_121a]** Silent output corruption (WNA16 INT4 MoE emits repeated `` loop at temp 0; kernel runs ~2.5% faster). [#49546](https://github.com/vllm-project/vllm/issues/49546) — **no fix PR yet**.
11. **[Bug, `persistent_topk` histogram binning]** Silently drops top-k candidates when many values share a coarse histogram bin (Blackwell B300, SM103). [#51782](https://github.com/vllm-project/vllm/issues/51782) — **no fix PR yet**.
12. **[Security, LMCache connector]** External cache keys derived from token IDs after 16-bit truncation of media ID; never mixes `cache_salt` or LoRA identity. Fix PR: [#56643](https://github.com/vllm-project/vllm/pull/56643) — **fix is in review**.
13. **[Bug, DSML tool-call recovery]** Truncated `<｜DSML｜invoke name="` commits a ghost call with empty arguments. Fix PR: [#56642](https://github.com/vllm-project/vllm/pull/56642) — **fix is in review**.
14. **[Bug, ROCm Elastic EP scaling deadlock]** During scale up/down. Fix PR merged [#56610](https://github.com/vllm-project/vllm/pull/56610) — **fixed**.
15. **[Bug, MRV2 init on UVA-less hosts]** Bare `RuntimeError: UVA is not available` from `UvaBuffer` when V2 runner is default. Fix PR: [#54655](https://github.com/vllm-project/vllm/pull/54655) — **fix in review**.
16. **[Bug, encoder-only + `--enable-prompt-embeds`]** Opaque `torch._dynamo.exc.Unsupported` during warmup. Fix PR: [#55233](https://github.com/vllm-project/vllm/pull/55233) — **fix in review**.
17. **[Bug, Hybrid GDN prefix-cache under MTP spec decode]** Multiples of hash unit get zero hits on Qwen3.5-122B-A10B. Fix PR: [#52244](https://github.com/vllm-project/vllm/pull/52244) — **fix in review**.
18. **[Bug, DFlash + Mamba zero-reuse]** WIP fix in [#54381](https://github.com/vllm-project/vllm/pull/54381).
19. **[ROCm CI/build] Qwen3.8 B200 AIME25 lane** failed 25/30 (0.8333), one below 0.85 floor; stochastic threshold being adjusted in [#56644](https://github.com/vllm-project/vllm/pull/56644).
20. Stale-bug cleanups: [#42024](https://github.com/vllm-project/vllm/issues/42024) (NIXL connector silently disables HMA), [#42381](https://github.com/vllm-project/vllm/issues/42381), [#42385](https://github.com/vllm-project/vllm/issues/42385), [#42525](https://github.com/vllm-project/vllm/issues/42525), [#42489](https://github.com/vllm-project/vllm/issues/42489), [#42125](https://github.com/vllm-project/vllm/issues/42125) all closed as stale.

## What This Means for Application Developers

- **DeepSeek-V4.1-Flash on consumer/edge Blackwell is not safe in production yet.** If you target GB10/SM120/SM121 (DGX Spark, RTX PRO 6000), pin to a commit *before* the SWA block size / DeepGEMM-64 regression and watch [#56461](https://github.com/vllm-project/vllm/issues/56461). On H20 SM90, cap `max_num_seqs ≤ 256` until [#56389](https://github.com/vllm-project/vllm/issues/56389) is fixed.
- **Multi-host DeepSeek-V4-Flash-0731 serving is producing deterministic wrong tokens on needle-in-haystack at specific prompt-length mod-4 alignments**, independent of reasoning mode and reproducible across providers. Treat any temperature-0 deep-retrieval workflow as suspect; cross-check with a second backend.
- **DFlash speculative decoding is not a free win.** Disable it (`--speculative-method dflash` off, or via the proposed per-sequence hook in [#54691](https://github.com/vllm-project/vllm/issues/54691)) for any hybrid GDN workload with context beyond ~64k tokens, and avoid combining it with `xgrammar` `json_object` output until [#53777](https://github.com/vllm-project/vllm/issues/53777) is fixed.
- **LMCache deployments should re-evaluate cache-key isolation.** The PR in [#56643](https://github.com/vllm-project/vllm/pull/56643) is not yet merged — if you serve multimodal or per-tenant LoRA traffic, ensure no collision risk at the connector layer today.
- **Disaggregated serving

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-13

## Today's Highlights

The DeepSeek-V4/V4.1 stack on Blackwell (SM120/121) generated a dense cluster of bug reports covering **silently incorrect numerics**, **CUDA-graph capture failures**, and **MoE backend acceptance gaps** — operators on 4× DGX Spark and RTX 6000D should pin a known-good image and watch #39226/#39193/#39173/#39235 together. On the perf side, the **TRTLLM MLA target-verify path** (#39232, closes [#39107](https://github.com/sgl-project/sglang/issues/39107)) now reuses the fused FP8 KV/Q prep kernel, and SGLang is preparing a stricter diffusion CI gate that makes perf regressions terminal ([#39206](https://github.com/sgl-project/sglang/pull/39206)). MLX/Apple Silicon saw a coordinated three-PR cleanup landing today.

---

## Releases & Breaking Changes

No releases in the last 24h. Note the following behavior changes in flight:

- **[#39122](https://github.com/sgl-project/sglang/pull/39122)** — `/v1/responses` persistence will be gated behind `--enable-response-store` (default **off**). Two unbounded in-memory dicts (`response_store`, `msg_store`) will no longer leak by default; prefill-node bookkeeping behavior changes.
- **[#39239](https://github.com/sgl-project/sglang/pull/39239)** — `local/sglang-metal` M1 Max MLX working-tree snapshot rebased onto `main` (closed). Coordinated MLX changes continue via [#39238](https://github.com/sgl-project/sglang/pull/39238) and [#39242](https://github.com/sgl-project/sglang/pull/39242).
- **[#30145](https://github.com/sgl-project/sglang/issues/30145)** — RFC "Unified Radix Cache Split: TreeCore" closed (inactive).

---

## New Model & Hardware Support

- **DSV4.1 FP4 KV on Hopper** — [#38902](https://github.com/sgl-project/sglang/issues/38902) proposes packing the C1/C2 main KV cache in FP4; baseline at #38798.
- **AMD MI355X GLM-5.2 MXFP4** — [#39230](https://github.com/sgl-project/sglang/pull/39230) maps `Low-Latency` (TP8/EP1) and `High-Throughput` (TP4/EP4) recipes using MTP 5-1-6, FP8 KV, Triton DSA; MXFP4 image pinned to validated v0.5.19.
- **AMD gfx950 DSV4 FP8 two-pool unified KV** — [#37413](https://github.com/sgl-project/sglang/pull/37413) enables unified KV across two pools for DSV4 FP8.
- **Blackwell VibeCUDA MSA** — [#39233](https://github.com/sgl-project/sglang/pull/39233) adds explicit routing to FlashInfer `backend="vibecuda"` with fail-closed provider selection and CUDA-Graph-safe metadata.
- **DeepEP v2 BF16 + batch-invariant inference** — [#38160](https://github.com/sgl-project/sglang/pull/38160) enables BF16 expert checkpoints and batch-invariant mode under `--moe-a2a-backend deepep_v2`; FP8 prefill argument bug also fixed.
- **MLX/Apple Silicon** — Headless trunk resolution for VL-family wrappers ([#39242](https://github.com/sgl-project/sglang/pull/39242)), `MlxAuxiliaryStateComponent` mamba grid attributes ([#39238](https://github.com/sgl-project/sglang/pull/39238)); both gate crashes seen on Qwen3.5-family checkpoints.
- **Gemma 4 tool-call parsing** — [#39240](https://github.com/sgl-project/sglang/pull/39240) tolerates missing opening `<|"|>` delimiters emitted by `gemma-4-26B-A4B-it`.

---

## Performance & Optimization

- **TRTLLM MLA target-verify fused FP8 prep** — [#39232](https://github.com/sgl-project/sglang/pull/39232). `forward_extend` was redundantly running the per-launch bf16→fp8 quantize + KV scatter + `[q_nope | q_rope]` concat; now reuses the fused `set_mla_kv_concat_q_fp8` that `forward_decode` already used. Closes [#39107](https://github.com/sgl-project/sglang/issues/39107).
- **GLM-5.3-Flash KPool metadata fusion restored** — [#38852](https://github.com/sgl-project/sglang/pull/38852), [#38858](https://github.com/sgl-project/sglang/pull/38858) (depends on [#38845](https://github.com/sgl-project/sglang/pull/38845)). Re-enables `SGLANG_EXPERIMENTAL_DSA_INGRAPH_VERIFY_METADATA*` flags removed by #38071; restores fused decode/verify/draft-extend construction.
- **Sampling-path GPU sync removal** — [#39234](https://github.com/sgl-project/sglang/pull/39234). Reuses CPU-known request rows to avoid `nonzero()`, scalar GPU reads, and boolean-indexing syncs in custom logit processors; preserves legacy fallback.
- **DeepGEMM CI gating tightened** — [#39241](https://github.com/sgl-project/sglang/pull/39241) bounds release validation; Blackwell attention alone was running 106–195 min and H200 timed out.
- **Regression report** — [#36131](https://github.com/sgl-project/sglang/issues/36131) (closed): the unified-cache default flip regressed long-prefix decode throughput on Spark/Thor post-`ebc144ce` (#34653). Watch next release for the fix landing.
- **Open perf items** — [#34815](https://github.com/sgl-project/sglang/issues/34815) PP8 disagg-prefill shows a load-independent ~30 s TTFT floor on Kimi-K3 (👍2); [#30815](https://github.com/sgl-project/sglang/issues/30815) FP8 KV-cache decode suffers from unfused K/V quantization + per-layer Q conversion.
- **Diffusion CI hardening** — [#39206](https://github.com/sgl-project/sglang/pull/39206) makes missing/non-finite/non-positive E2E latency records terminal failures, even for `run_perf_check=False` cases.

---

## Stability & Regressions

Ranked by likely blast radius:

1. **[#39216](https://github.com/sgl-project/sglang/issues/39216)** — **Critical**: Client disconnect during an active request crashes the entire engine. An `asyncio.CancelledError` propagates past `except Exception` guards in the request loop. Affects 4× RTX 6000D (SM120) on `lmsysorg/sglang:dev-dsv41` serving DeepSeek-V4.1. **No fix PR yet.**
2. **[#39193](https://github.com/sgl-project/sglang/issues/39193)** — DeepSeek-V4.1 fp8 `wo_a` absorb GEMM silently returns ~25% wrong results on SM121 (GB10) when `DEEPGEMM_SCALE_UE8M0=False`; per-token activation scales that are not powers of two are passed to `deep_gemm.fp8_einsum`. **Correctness bug; no error, no warning.**
3. **[#39226](https://github.com/sgl-project/sglang/issues/39226)** — `--moe-runner-backend deep_gemm` is accepted for DSV4.1 MXFP4 experts, loads 75 GB of weights, then dies in CUDA-graph capture on a `layout.hpp:108` assertion (sm_121, TP4/EP2). Argument validation happens too early.
4. **[#39235](https://github.com/sgl-project/sglang/issues/39235)** — DeepSeek-V4 SM120 decode pads `q` to 64 heads for an SM90 constraint; removing the pad is +0.50% decode step at TP4 but changes greedy output despite the kernel being bit-identical. Author wants second-opinion before PR.
5. **[#39173](https://github.com/sgl-project/sglang/issues/39173)** — DSV4.1-Flash + Engram "compact ragged verify" SPS table dies in CUDA-graph capture: *"engram target-verify expects one equal block per request"*.
6. **[#39087](https://github.com/sgl-project/sglang/issues/39087)** — Quantized DFlash2 draft checkpoint yields ~0% acceptance silently (no error, no warning); unquantized works. Quiet counterpart to #36599.
7. **[#39147](https://github.com/sgl-project/sglang/issues/39147)** — `HiCacheFile.batch_exists_v2()` reports hybrid prefix as a hit even when a required auxiliary pool cannot restore it; only correct under contiguous `ALL_PAGES`.
8. **[#39103](https://github.com/sgl-project/sglang/issues/39103)** — `include_reasoning: false` is ignored across `/v1/responses`, `/v1/chat/completions`, and `/v1/completions`.
9. **[#38980](https://github.com/sgl-project/sglang/issues/38980)** — `flash_attn_with_kvcache` advertises sm_89 support, no sm_89 cubin ships, and `ver` argument is ignored; raw CUDA error instead of clean rejection (RTX 4080 SUPER, Ada).
10. **[#38904](https://github.com/sgl-project/sglang/issues/38904)** — MiniMax H3 GGUF text encoder fails loading folded Conv3D patch embedding.
11. **[#38815](https://github.com/sgl-project/sglang/issues/38815)** (closed) — SWA branching attached a later Mamba checkpoint to an earlier prefix; fixed.
12. **[#37817](https://github.com/sgl-project/sglang/issues/37817)** (closed) — DFlash missed Mamba checkpoints across tracking boundaries; fixed.
13. **[#31053](https://github.com/sgl-project/sglang/issues/31053)** (closed, inactive) — Streaming ASR sliding-window / server-side VAD; archived.
14. **[#37134](https://github.com/sgl-project/sglang/pull/37134)** — ROCm EAGLE spec-decode verify was committing `argmax` regardless of `temperature`/`top_p`, causing repetition loops at `temp>0`. Fix lands the correct sampling branch.
15. **CI tracker** — [#17050](https://github.com/sgl-project/sglang/issues/17050): last auto-update reports 4 broken / 10 flaky / 994 recently fixed on `main`.

---

## What This Means for Application Developers

- **Pin images carefully on Blackwell consumer/Spark.** Multiple correctness and capture-time crashes cluster on SM120/SM121 for DeepSeek-V4.x; #39226, #39193, #39235, and #39173 share the same family. If you're on `dev-dsv41`, treat it as pre-release for production traffic and avoid `--moe-runner-backend deep_gemm` with MXFP4 DSV4.1 until #39226 is fixed.
- **Add client-side resilience.** [#39216](https://github.com/sgl-project/sglang/issues/39216) means a single client TCP reset can take down your whole engine. Treat your gateway as the authoritative circuit breaker and instrument `CancelledError` propagation through your client SDK.
- **Streaming-reasoning clients may see a behavior change soon.** [#39122](https://github.com/sgl-project/sglang/pull/39122) defaults `/v1/responses` persistence off; if your app depends on server-side replay of past Responses IDs, you'll need to flip `--enable-response-store` or carry IDs yourself.
- **Apple Silicon / MLX Qwen3.5 is becoming usable.** The two MLX PRs today fix a hard crash (`mamba_checkpoint_grid`) and a silent quality issue (headless trunk missing → full-vocab logits over non-final chunked-prefill chunks). Good moment to retest hybrid models on M-series.
- **AMD MI355X GLM-5.2 MXFP4 has a documented recipe** ([#39230](https://github.com/sgl-project/sglang/pull/39230)); match the v0.5.19 image and TP/EP layout or expect to retune.
- **Inference on Ada (sm_89) with FA3-style attention paths** is fragile — #38980 shows the kernel claim is wider than reality. Probe with the explicit `ver` you need before adopting.
- **Diffusion pipelines will become stricter.** [#39206](https://github.com/sgl-project/sglang/pull/39206) means flaky E2E latency now blocks CI; if you ship diffusion models via SGLang, expect CI to catch perf drift earlier than before.
- **Worth tracking RFCs:** [#39192](https://github.com/sgl-project/sglang/issues/39192) "Contention-aware batching for dynamic EPLB" and [#21052](https://github.com/sgl-project/sglang/issues/21052) "Further Ngram Speculative Decoding" are both open with community input welcome.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-13

## 1. Today's Highlights

A burst of backend polish shipped in 10 new builds (b10921–b10932), headlined by an **AMD GCN-specific HIP config table for ggml-cuda** ([#27841](https://github.com/ggml-org/llama.cpp/pull/27841), b10929), an **OpenCL backend stability fix** ([#27630](https://github.com/ggml-org/llama.cpp/pull/27630), b10923), and a **WebGPU tensor-binding alignment fix** for block-quantized views ([#28382](https://github.com/ggml-org/llama.cpp/pull/28382), b10921). On the correctness front, a **Blackwell IQ-quant fallback to cuBLAS** ([#28823](https://github.com/ggml-org/llama.cpp/pull/28823)) addresses the long-standing Unsloth Dynamic quant corruption, and CI now runs `test-backend-ops` as a dedicated multi-backend pass ([#28740](https://github.com/ggml-org/llama.cpp/pull/28740)). Several open regressions — a 57× MTP prefill slowdown on Windows MSVC ([#28790](https://github.com/ggml-org/llama.cpp/issues/28790)), CUDA-graph hangs on RTX 5090 laptops ([#27330](https://github.com/ggml-org/llama.cpp/issues/27330)), and Vulkan/RDNA3 prompt-processing collapse after b10780 ([#28752](https://github.com/ggml-org/llama.cpp/issues/28752)) — remain unfixed.

## 2. Releases & Breaking Changes

Ten releases in the last 24h; no API breakage observed.

| Build | Notable Change | PR |
|---|---|---|
| b10932 | cmake: drop PCH timestamps for clang (ccache portability fix) | [#28816](https://github.com/ggml-org/llama.cpp/pull/28816) |
| b10931 | ui: add client-side cache | [#28802](https://github.com/ggml-org/llama.cpp/pull/28802) |
| b10930 | server: allow model downloads at model-limit boundary (fixes #26809) | [#28530](https://github.com/ggml-org/llama.cpp/pull/28530) |
| b10929 | ggml-cuda/HIP: per-architecture config table for AMD GCN | [#27841](https://github.com/ggml-org/llama.cpp/pull/27841) |
| b10927 | vendor: cpp-httplib → 0.56.0 | [#28787](https://github.com/ggml-org/llama.cpp/pull/28787) |
| b10926 | syscl: graceful failure on unsupported `tq1_0` quants | [#28681](https://github.com/ggml-org/llama.cpp/pull/28681) |
| b10924 | server: frame router child state command on its own line | [#28747](https://github.com/ggml-org/llama.cpp/pull/28747) |
| b10923 | opencl: several backend-abort fixes | [#27630](https://github.com/ggml-org/llama.cpp/pull/27630) |
| b10922 | opencl: A8 Q4_K non-MoE binary kernel | [#28677](https://github.com/ggml-org/llama.cpp/pull/28677) |
| b10921 | webgpu: align tensor bindings to type block size | [#28382](https://github.com/ggml-org/llama.cpp/pull/28382) |

## 3. New Model & Hardware Support

- **New architecture**: ELMOD 2.7b (German research GPTNeoX with custom tokenizer) — [#28818](https://github.com/ggml-org/llama.cpp/pull/28818)
- **AMD GCN tuning**: per-arch config table in ggml-cuda/HIP should improve perf across older AMD parts — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841)
- **OpenCL expansion**: new `gemm_noshuffle_q4_k_f32` binary kernel (Qualcomm-contributed) — [#28677](https://github.com/ggml-org/llama.cpp/pull/28677)
- **Vulkan/Intel A770**: IQ3_S MMQ matmul kernel path — [#28822](https://github.com/ggml-org/llama.cpp/pull/28822)
- **Sparse FlashAttention**: enabled for Qwen4 architecture — [#28770](https://github.com/ggml-org/llama.cpp/pull/28770)
- **ANE backend** (Apple Neural Engine) remains an open roadmap item — [#10453](https://github.com/ggml-org/llama.cpp/issues/10453) (44 👍, no progress reported)
- **Roadmap signal**: Web UI decoupled from llama-server core — [#22531](https://github.com/ggml-org/llama.cpp/issues/22531)

## 4. Performance & Optimization

- **Sparse FA for Qwen4** avoids re-scoring the entire KV cache per step — [#28770](https://github.com/ggml-org/llama.cpp/pull/28770)
- **OpenCL Q4_K A8 non-MoE binary kernel** (Qualcomm) reduces shader dispatch overhead — [#28677](https://github.com/ggml-org/llama.cpp/pull/28677)
- **WebGPU** block-quantized views now use valid element offsets (correctness + likely perf) — [#28382](https://github.com/ggml-org/llama.cpp/pull/28382)
- **Scheduler reserve skipped** when toggling `causal_attn` — [#28751](https://github.com/ggml-org/llama.cpp/pull/28751)
- **AMD GCN-specific HIP configs** — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841)
- **CI now runs `test-backend-ops` for all backends in parallel** — [#28740](https://github.com/ggml-org/llama.cpp/pull/28740)
- **User-reported baseline**: qwen35 on RTX 4090 (Linux) reaches **~86% of memory-bandwidth bound**; same model on RTX 5090 (Windows) only **~28%**, with draft-MTP a further 1.5–1.6× slower — [#28196](https://github.com/ggml-org/llama.cpp/issues/28196)
- **Proposed default**: `GGML_CUDA_FA_ALL_QUANTS=ON` to silently fall back to GPU instead of CPU for 4-bit KV (avoids ~30× slowdown) — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633)

## 5. Stability & Regressions

**Critical (open):**

- [#28790](https://github.com/ggml-org/llama.cpp/issues/28790) — **MTP prefill ~57× slower** on Windows MSVC + CUDA 12.8 (32.7 vs 1867 tok/s). Official Clang/CUDA 13.3 build unaffected. No fix PR yet.
- [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) — **Severe Vulkan/RDNA3 prompt-processing regression** introduced at b10780.
- [#28813](https://github.com/ggml-org/llama.cpp/issues/28813) — **Consistent OOM crashes** with `-np 3` since b10930 on a 1×4090 + 3×3090 box (192 GB RAM).
- [#27330](https://github.com/ggml-org/llama.cpp/issues/27330) — **CUDA graphs hang the GPU channel** on RTX 5090 Laptop (`sm_120`); `GGML_CUDA_DISABLE_GRAPHS=1` works around it.
- [#28404](https://github.com/ggml-org/llama.cpp/issues/28404) — **Second `llama-server` replica deterministically dies** at `ggml-cuda.cu:107` after CUDA-graph reuse on 2× RTX 5060 Ti (Windows, sm_120). Closed without a confirmed fix.
- [#26027](https://github.com/ggml-org/llama.cpp/issues/26027) — **GLM-5.2 (glm_moe_dsa) dense-MLA CUDA path produces corrupted output** whenever any real transformer layer is GPU-offloaded.
- [#28196](https://github.com/ggml-org/llama.cpp/issues/28196) — **qwen35 on RTX 5090 at 76% roofline** (vs 86% on 4090); Windows/Ollama path additionally 1.5–1.6× slower at every draft depth.

**High (open):**

- [#25913](https://github.com/ggml-org/llama.cpp/issues/25913) — `/slots` save/restore silently loses all prompt reuse on hybrid/recurrent models.
- [#24415](https://github.com/ggml-org/llama.cpp/issues/24415) — Cannot load gemma-4-12B with OpenVINO (CPU/GPU/NPU).
- [#25807](https://github.com/ggml-org/llama.cpp/issues/25807) — ROCm 7.14 build fails with `libhipblas.so.3` missing at runtime.
- [#24946](https://github.com/ggml-org/llama.cpp/issues/24946) — `-cb` pins Intel Arc Pro B70 at `gt-c0`/boost, never idles.
- [#22360](https://github.com/ggml-org/llama.cpp/issues/22360) — Server throughput degrades significantly over time on Vulkan/7900XTX.

**Closed/mitigated today:**

- [#26220](https://github.com/ggml-org/llama.cpp/issues/26220) — RDNA4 FA 2× regression from rocWMMA removal (closed).
- [#24177](https://github.com/ggml-org/llama.cpp/issues/24177) — RPC `top_k` argsort shared-memory assert (closed).
- [#25808](https://github.com/ggml-org/llama.cpp/issues/25808) — `GGML_SYCL_DEVICE_ARCH=xe2` segfault (closed).
- [#20260](https://github.com/ggml-org/llama.cpp/issues/20260) — `peg-native` parser edge case (closed).
- [#28590](https://github.com/ggml-org/llama.cpp/issues/28590) — Vulkan validation VUID on Intel B70 (closed).
- [#28491](https://github.com/ggml-org/llama.cpp/issues/28491) — `BUILD_SHARED_LIBS=OFF` Mac Metal link error (closed).

**Fixes merged for previously-reported issues:**

- Blackwell IQ-quant corruption (#21371) → [#28823](https://github.com/ggml-org/llama.cpp/pull/28823) (forces cuBLAS for IQ1/IQ2/IQ3/IQ4 on sm_120+).
- Jinja dot-property integer literals (#28786) → [#28817](https://github.com/ggml-org/llama.cpp/pull/28817).
- MSVC PCH breakage → [#28763](https://github.com/ggml-org/llama.cpp/pull/28763).
- iWARP RPC silently falling back to TCP → [#28494](https://github.com/ggml-org/llama.cpp/pull/28494).

## 6. What This Means for Application Developers

- **Pin your build or note the version in bug reports**: the Vulkan/RDNA3 prompt regression ([#28752](https://github.com/ggml-org/llama.cpp/issues/28752)) appeared at b10780 and a multi-replica OOM at b10930 ([#28813](https://github.com/ggml-org/llama.cpp/issues/28813)). Rolling forward is not yet safe on every configuration — keep `GGML_CUDA_DISABLE_GRAPHS=1` as a known-good fallback for `sm_120` deployments.
- **MTP speculative decoding on Windows**: do not enable `--spec-type draft-mtp` on MSVC + CUDA 12.8 self-builds — expect a ~57× prefill penalty ([#28790](https://github.com/ggml-org/llama.cpp/issues/28790)). The official Clang/CUDA 13.3 build is unaffected.
- **Smaller quant formats now safer**: Blackwell IQ-quants (Unsloth Dynamic, IQ2/IQ3/IQ4) get a cuBLAS fallback via [#28823](https://github.com/ggml-org/llama.cpp/pull/28823); upstream is no longer silently producing wrong outputs.
- **Hybrid / recurrent state**: do not trust `/slots` save/restore to preserve prompt cache on Qwen3.5/DeltaNet-style models ([#25913](https://github.com/ggml-org/llama.cpp/issues/25913)) — implement application-side resumption.
- **OpenAI-conformant clients**: `video_url` and `data:` video URIs are still rejected by `llama-server` ([#27921](https://github.com/ggml-org/llama.cpp/pull/27921) — open). Multimodal agent stacks should plan for a custom transport or wait.
- **New chat-parser coverage**: Ling 3.0 / Bailing V3 ([#28682](https://github.com/ggml-org/llama.cpp/pull/28682)) and improved Qwen3-Coder complex-arg parsing ([#28742](https://github.com/ggml-org/llama.cpp/pull/28742)) — tool-calling reliability is improving across vendors.
- **Distributed inference**: iWARP RPC path is now reachable via rdma_cm fallback ([#28494](https://github.com/ggml-org/llama.cpp/pull/28494)), unlocking cluster deployments that previously silently degraded to TCP.
- **CI/backend confidence**: `test-backend-ops` now runs across all backends in CI ([#28740](https://github.com/ggml-org/llama.cpp/pull/28740)), so regressions like the recent Vulkan prompt-processing collapse should be caught earlier going forward.
- **Roadmap watch**: ANE backend (#10453), cached-model management CLI (#16393), and Web-UI decoupling (#

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-13

## Today's Highlights
A corrective maintenance day rather than a feature day. The two most consequential items are the truncation fix landing for [#17778](https://github.com/ollama/ollama/issues/17778) — the long-running "no user query found in messages" 500 in multi-step tool loops — and the immediate reversal of the built-in CLI agent in [#18393](https://github.com/ollama/ollama/pull/18393). Several high-severity correctness bugs (KV-cache bleed on ROCm Strix Halo, hybrid-GPU SIGABRT, Windows embed port exhaustion) were also updated and are still open.

## Releases & Breaking Changes
No new releases in the last 24h. Note the closed PR [#18393](https://github.com/ollama/ollama/pull/18393) ("cmd: remove built-in agent") indicates an in-flight CLI behavioral change that reverts to the older chat interface; downstream shell scripts that depend on the agent mode should verify which build they pin to.

## New Model & Hardware Support
- **Gemma 4 vision**: long-open PR [#16879](https://github.com/ollama/ollama/pull/16879) (dhiltgen) restructures unified vision-capability detection across `/api/tags` and single-GGUF Gemma 4 mmproj paths — still open but actively maintained.
- **Gemma 4 E4B on Jetson Orin Nano 8GB**: being exercised in the wild ([#18396](https://github.com/ollama/ollama/issues/18396)), but currently fails to load because the multimodal projector demands more VRAM than the device can spare even when CPU-only projection is otherwise configured.
- **qwen3.8:27b version coupling**: [#18414](https://github.com/ollama/ollama/issues/18414) flags that some models have undocumented minimum Ollama versions; relevant for anyone pinning older runtimes.
- **Hy4 (Tencent) request**: [#18287](https://github.com/ollama/ollama/issues/18287) closed without action — no GGUF assets surfaced yet.

## Performance & Optimization
- **Embedding throughput on Windows**: [#18392](https://github.com/ollama/ollama/issues/18392) reports a bge-m3:567m-fp16 bulk-embed pipeline hitting ~55 docs/s until loopback port exhaustion. The root cause is `llama-server`'s internal HTTP client having keep-alive disabled — fixing this is a free throughput win once landed.
- **Context-shift safety knob**: [#18399](https://github.com/ollama/ollama/pull/18399) proposes `OLLAMA_CONTEXT_SHIFT` to make the server *refuse* over-long prompts instead of silently truncating to ~half the window — important for any deployment where silent prompt loss is unacceptable.
- **Thinking budget**: [#17566](https://github.com/ollama/ollama/pull/17566) (per-request / per-model token budget for `think`) is still open; relevant for Gemma 4 loops that burn entire contexts.

## Stability & Regressions
Ranked by severity:

1. **[#17847](https://github.com/ollama/ollama/issues/17847) — ROCm Strix Halo KV state bleed.** On `gfx1151` (Radeon 8060S iGPU), alternating short/long prompts return the previous request's content. No fix PR yet; high severity for shared/sequential workloads on AMD APUs.
2. **[#18412](https://github.com/ollama/ollama/issues/18412) — Linux hybrid graphics (Intel iGPU + RTX 4080) SIGABRT.** `llama-server` aborts during backend/device load — mirror of [#16667](https://github.com/ollama/ollama/issues/16667) on Windows, now Linux-side. No fix PR.
3. **[#18392](https://github.com/ollama/ollama/issues/18392) — `/api/embed` port exhaustion on Windows.** Caused by keep-alive being off in llama-server's loopback HTTP client; intermittent 400s under load.
4. **[#18411](https://github.com/ollama/ollama/issues/18411) — Responses `web_search` ordering bug.** `function_call` is emitted before reasoning completes; breaks Codex tool replay. Fix PR [#18413](https://github.com/ollama/ollama/pull/18413) already opened same day.
5. **[#17778](https://github.com/ollama/ollama/issues/17778) — qwen3.8 chat streaming 500 ("no user query found").** Fix PR [#17894](https://github.com/ollama/ollama/pull/17894) (preserve most recent user message during truncation) is open.
6. **[#18094](https://github.com/ollama/ollama/issues/18094) — gemma3:12b structured output truncation** on double-quoted input. No fix PR.
7. **[#16599](https://github.com/ollama/ollama/issues/16599) — Multi-GPU model splitting** despite one card having enough VRAM. Long-standing.
8. **[#17562](https://github.com/ollama/ollama/issues/17562) — Three Gemma 4 / Qwen tool-call defects** (repetition guard, truncated calls, dropped call on missing brace). Related Gemma 4 tool-parser PRs [#18400](https://github.com/ollama/ollama/pull/18400) and [#18398](https://github.com/ollama/ollama/pull/18398) address the missing-brace variant and bare keys with spaces.
9. **[#18396](https://github.com/ollama/ollama/issues/18396) — Jetson Orin Nano OOM** on Gemma 4 E4B multimodal projector. No fix PR.
10. **[#14259](https://github.com/ollama/ollama/issues/14259) — Silent chat-history truncation**; partially addressed by [#17894](https://github.com/ollama/ollama/pull/17894).
11. **Embedding/import hardening landed**: [#18406](https://github.com/ollama/ollama/pull/18406) rejects all-zero vectors from runners with 500 instead of 200; [#18407](https://github.com/ollama/ollama/pull/18407) preserves uploaded GGUF blobs across quantization (no double-write / digest drift).

## What This Means for Application Developers
- **If you run multi-step tool loops with qwen3.8 or any renderer-based model**, watch [#17894](https://github.com/ollama/ollama/pull/17894) — until it's merged you can still hit a hard 500 when the conversation outgrows the context. Set conservative `num_ctx` or pre-truncate history.
- **Tool-calling pipelines on Gemma 4** should expect at least two parser fixes ([#18400](https://github.com/ollama/ollama/pull/18400), [#18398](https://github.com/ollama/ollama/pull/18398)) for keys with spaces and bare-key parsing. The repeated-defense fixes for the underlying behavior are still open.
- **Anything using `/api/embed` at scale on Windows** is one configuration away from HTTP 400 storms; consider client-side connection reuse or pacing before scaling up.
- **OpenAI Responses consumers using `web_search`**: if you depend on deterministic item ordering for replay (e.g., Codex-style clients), pin against the pre-0.34.0 Responses behavior or wait for [#18413](https://github.com/ollama/ollama/pull/18413).
- **Multi-GPU hosts**: [#16599](https://github.com/ollama/ollama/issues/16599) remains unresolved — until it is, explicitly constrain with `OLLAMA_GPU_LAYERS` or single-GPU env vars when VRAM is fragmented across mixed-size cards.
- **Pinned-version hygiene**: [#18414](https://github.com/ollama/ollama/issues/18414) is a reminder that Ollama library cards don't always state minimum runtime requirements. Track this in your model-bake pipeline.
- **Upcoming opt-in**: if silent prompt truncation is a compliance/observability concern, vote on [#18399](https://github.com/ollama/ollama/pull/18399) — it's the cleanest path to a fail-loud mode.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-13

## Today's Highlights

- **Cost/billing correctness sweep is the dominant theme**: PRs landed (or queued) to fix cached realtime audio token overbilling (~2x) ([#40627](https://github.com/BerriAI/litellm/pull/40627)), OCR deployment custom pricing being silently dropped ([#40767](https://github.com/BerriAI/litellm/pull/40767), replaces [#36609](https://github.com/BerriAI/litellm/issues/36608)), and Gemini Live session end-to-end billing ([#40915](https://github.com/BerriAI/litellm/pull/40915), incl. fix for double-billed grounded search). Operator spend dashboards should be re-verified.
- **Active work on the Responses↔Chat bridge**: multiple coordinated fixes for reasoning_text/reasoning_content loss in streaming and non-streaming conversions ([#40654](https://github.com/BerriAI/litellm/issues/40654), [#40887](https://github.com/BerriAI/litellm/issues/40887), [#40918](https://github.com/BerriAI/litellm/pull/40918)) and a `gpt-5.x/o-series/codex` reasoning fallback generalization ([#40902](https://github.com/BerriAI/litellm/pull/40902)). Anyone routing `openai/responses/*` to `/v1/chat/completions` should pin and test.
- **Security-relevant Helm regression flagged**: `helm/litellm-helm/values.yaml` ships empty `podSecurityContext`/`securityContext`, so deployments run as root by default ([#40822](https://github.com/BerriAI/litellm/issues/40822)) — no fix PR in tree yet.

## Releases & Breaking Changes

No new releases in the last 24h.

## New Model & Hardware Support

- **Prism registered as a native provider** with Chat Completions, Responses, and Messages routing, plus DeepSeek V4 and V4.1 Flash metadata ([#40914](https://github.com/BerriAI/litellm/pull/40914); [#40782](https://github.com/BerriAI/litellm/pull/40782) closed as duplicate).
- **Meta Muse Voice realtime transcription** — `meta/muse-voice-transcribe-1.0` with binary PCM streaming mapped to OpenAI transcription events ([#39395](https://github.com/BerriAI/litellm/pull/39395)).
- **OpenAI reasoning-family fallback generalization** — unmapped `gpt-5.x`/`gpt-6`/`o-series`/`codex`/`deep-research`/`chat-latest` ids now resolve `supports_reasoning` correctly so the Responses API stops dropping `reasoning` params ([#40902](https://github.com/BerriAI/litellm/pull/40902)).
- **Databricks-hosted Gemini 2.5** — `reasoning_effort` is now translated to `thinking` instead of triggering a 400 ([#40909](https://github.com/BerriAI/litellm/pull/40909)).
- Still open: HTTP/2 outbound to upstreams ([#30362](https://github.com/BerriAI/litellm/issues/30362)) and GPT-Live (`gpt-live-1`) OpenAI-compatible support ([#40888](https://github.com/BerriAI/litellm/issues/40888)).

## Performance & Optimization

- **Bounded spend-log fan-out** — `create_many` for `LiteLLM_SpendLogToolIndex` / `LiteLLM_SpendLogGuardrailIndex` is now bounded by the same statement budgets as the source transactions, preventing single-request fan-out storms ([#40561](https://github.com/BerriAI/litellm/pull/40561)).
- **Atomic counter TTL** — `RedisCache.async_increment` no longer leaves orphan TTL-less counters when a request is cancelled mid-INCRBYFLOAT/EXPIRE ([#40715](https://github.com/BerriAI/litellm/pull/40715)).
- **Log flooding protection** — a burst of timed-out `LoggingWorker` callbacks now logs one bounded summary instead of N full tracebacks ([#40912](https://github.com/BerriAI/litellm/pull/40912)).
- **TLS-termination-safe Admin UI** — `/ui` redirects are now path-relative, fixing https→http downgrade behind reverse proxies ([#40916](https://github.com/BerriAI/litellm/pull/40916)).
- **Cache analytics attribution** — gate-rejected requests (bad/blocked key, budget, 403) and info-route failures are now bucketed to their endpoint instead of collapsing into "Unknown" ([#40824](https://github.com/BerriAI/litellm/pull/40824)).

## Stability & Regressions

**High severity**

- **Helm chart runs as root by default** — empty `podSecurityContext`/`securityContext` in `values.yaml`; `runAsNonRoot`/`runAsUser`/`allowPrivilegeEscalation`/`capabilities.drop` are only commented examples. No fix PR yet. ([#40822](https://github.com/BerriAI/litellm/issues/40822))
- **OTEL callback causes constant container restarts** — `NoneType` crash when the OpenTelemetry collector callback is enabled. Open since June. ([#30061](https://github.com/BerriAI/litellm/issues/30061))
- **Azure spend recorded as $0** — Admin UI model edit persists derived pricing; on price-map reload Azure spend silently drops to zero (combines [#30081](https://github.com/BerriAI/litellm/issues/30081) and follow-ups). Open. ([#40649](https://github.com/BerriAI/litellm/issues/40649))

**Medium severity**

- **`/v1/messages` passthrough drops `adaptive_thinking` and effort** — native passthrough on self-hosted OpenAI-compatible servers loses these params. ([#40890](https://github.com/BerriAI/litellm/issues/40890))
- **Responses-to-Chat bridge drops `reasoning_text`** — raw `response.reasoning_text.delta` events are not mapped to Chat `reasoning_content`. Downstream plaintext loss confirmed in a fork. Fix PR opened: [#40918](https://github.com/BerriAI/litellm/pull/40918). ([#40654](https://github.com/BerriAI/litellm/issues/40654), [#40887](https://github.com/BerriAI/litellm/issues/40887))
- **`enable_anthropic_prompt_caching` starves the vector-store pre-call hook** — interaction with `vector_store_ids` prompt-caching path. ([#40908](https://github.com/BerriAI/litellm/issues/40908))
- **`LiteLLM_SpendLogs.session_id` does not reflect `litellm_session_id`** — silently overwritten with a per-call correlation id, breaking session grouping for analytics. ([#40851](https://github.com/BerriAI/litellm/issues/40851))
- **`Router._embedding` sync path bypasses team/access-group scoping** — `request_kwargs` not forwarded, so a sync caller can land on deployments they shouldn't see. ([#31260](https://github.com/BerriAI/litellm/issues/31260))
- **Streaming usage merger retains stale cache-write tokens after a zero update** — `cached_tokens_details` write count isn't cleared on explicit zero. ([#40736](https://github.com/BerriAI/litellm/issues/40736))
- **Bedrock streaming drops cache counts before usage handling** — `cached_tokens_details` lost between Invoke streaming and cost layer (related to [#15263](https://github.com/BerriAI/litellm/issues/15263)). ([#40736](https://github.com/BerriAI/litellm/issues/40736))
- **False "Budget exceeded" on `/v1/messages` (Claude Code)** — enforced cost ~100 vs. actual `max_budget=100` triggers 429 well before real spend. Closed. ([#40050](https://github.com/BerriAI/litellm/issues/40050))
- **Key limit silently accepted above its team's limit** — `rpm_limit` larger than team's is stored but never effective. No warning. ([#40866](https://github.com/BerriAI/litellm/issues/40866))

**Lower severity / closed**

- Vertex AI models misreported "Unhealthy" since v1.84.0 — fixed. ([#28206](https://github.com/BerriAI/litellm/issues/28206))
- `ResetBudgetJob` global crash on `budget_limits` list serialization — fixed. ([#27171](https://github.com/BerriAI/litellm/issues/27171))
- `max_budget` ignored after monthly reset — fixed. ([#27300](https://github.com/BerriAI/litellm/issues/27300))
- Bedrock 11-field validation error from Cursor — fixed. ([#19384](https://github.com/BerriAI/litellm/issues/19384))
- AWS External ID missing for Bedrock embeddings — fixed. ([#27835](https://github.com/BerriAI/litellm/issues/27835))
- `/v1/responses` server_tool_use surfaced as generic `function_call` for Anthropic native web_search on Vertex — fixed. ([#33546](https://github.com/BerriAI/litellm/issues/33546))
- `openai/`-prefixed self-hosted models route `/v1/messages` to Responses, silently losing multimodal — still open. ([#40780](https://github.com/BerriAI/litellm/issues/40780))
- `lite codex` silently bypasses the proxy when `-c` is passed after a Codex subcommand — still open. ([#40651](https://github.com/BerriAI/litellm/issues/40651))
- OpenAI image generation sends `extra_headers` in the JSON body (breaks Cloudflare AI Gateway) — still open. ([#40628](https://github.com/BerriAI/litellm/issues/40628))

## What This Means for Application Developers

- **Reconcile your spend tables now.** The cluster of cost/billing fixes (cached audio, OCR custom pricing, Gemini Live grounded search double-billing, admin UI Azure $0 regression) means historical spend in the last few weeks may be understated or zero. Pin a known-good build before re-running cost reports.
- **Self-hosted Helm users: harden or override.** Until [#40822](https://github.com/BerriAI/litellm/issues/40822) is fixed, explicitly set `runAsNonRoot: true`, `runAsUser`, `allowPrivilegeEscalation: false`, and drop capabilities in your values overlay — defaults are unsafe.
- **Reasoning/streaming users on the Responses↔Chat bridge**: if you call `/v1/chat/completions` against `openai/responses/<model>`, expect `reasoning_content` gaps until [#40918](https://github.com/BerriAI/litellm/pull/40918) lands. Avoid the bridge for agent harnesses that branch on `tool_calls` after preamble text — gpt-5.x+ with tools currently emits two choices.
- **New provider surface**: Prism (DeepSeek V4 / V4.1 Flash) is wired natively ([#40914](https://github.com/BerriAI/litellm/pull/40914)); Meta Muse Voice transcription is reachable via the realtime endpoint ([#39395](https://github.com/BerriAI/litellm/pull/39395)). Unmapped OpenAI reasoning ids now resolve correctly through the registry fallback ([#40902](https://github.com/BerriAI/litellm/pull/40902)).
- **Reliability improvements land in your hot path**: bounded `create_many` for spend-log index rows ([#40561](https://github.com/BerriAI/litellm/pull/40561)) and atomic TTL on Redis counters ([#40715](https://github.com/BerriAI/litellm/pull/40715)) reduce database and Redis pressure under bursty traffic — measurable win for high-RPM multi-tool workloads.
- **Memory tools moving into the gateway** ([#40894](https://github.com/BerriAI/litellm/pull/40918)) — worth tracking if you currently orchestrate persistent memory client-side; the gateway-side path would preserve native client tools across Chat Completions / Responses / Messages.
- **OpenAI image generation + Cloudflare AI Gateway**: still broken until [#40628](https://github.com/BerriAI/litellm/issues/40628) is addressed; route around by setting `

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-13

## 1. Today's Highlights

A 24-hour sprint focused on **stabilizing the main branch** and **expanding the deployment surface**: danielhanchen's [PR #10832](https://github.com/unslothai/unsloth/pull/10832) flipped `main` from red to green (it had been failing since commit `22bbff627` on 2026-09-11, breaking ~25 open PRs and all `Backend CI` runs), and oobabooga's [PR #10825](https://github.com/unslothai/unsloth/pull/10825) fixed a Docker Studio regression where `ENV UNSLOTH_ALLOW_CPU=1` was silently disabling Unsloth's TRL patches on GPU hosts, breaking every training path (Train page, notebooks, `unsloth train`, GRPO). On the platform side, [PR #10820](https://github.com/unslothai/unsloth/pull/10820) introduced a long-requested **AMD ROCm Docker image** spanning RDNA2 → RDNA4 and CDNA.

## 2. Releases & Breaking Changes

No formal releases were published in the last 24h, but the following migration-relevant changes landed or were discussed:

- **[PR #10816](https://github.com/unslothai/unsloth/pull/10816) — `upload_to_huggingface` model card `method` arg**: A required positional `method` argument was being thrown away silently in the generated model card. Fix is backward-compatible (no signature change), but model cards pushed before this fix ship with `method = ""`.
- **[PR #10740](https://github.com/unslothai/unsloth/pull/10740) — TRL 0.20 compatibility**: Studio text/CPT branches were passing `max_seq_length` and `tokenizer` kwargs that were removed in `trl >= 0.20`, causing `TypeError: SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`. Anyone pinning against `trl 0.20+` needs to consume this fix.
- **[PR #10837](https://github.com/unslothai/unsloth/pull/10837) — `max_tokens` → `max_completion_tokens`**: When Studio proxies to custom OpenAI-compatible endpoints (e.g. enterprise Azure GPT-5 gateways), it was sending the deprecated `max_tokens`, which newer models reject. Migration is automatic for Studio users; custom gateway operators should update.

## 3. New Model & Hardware Support

- **[PR #10820](https://github.com/unslothai/unsloth/pull/10820) — AMD ROCm Docker image**: Adds a ROCm sibling to the CUDA image from #5748, covering RDNA2 → RDNA4 consumer and CDNA datacenter parts. Same `docker/` layout and `build.sh` / `run.sh` entry points.
- **[PR #7115](https://github.com/unslothai/unsloth/pull/7115) — EXL3 (ExLlamaV3) quantization backend** *(still open)*: Adds 2/3/4/6/8-bit and fractional bitrates, plus MoE quantization that bitsandbytes cannot do under transformers 5. Additive; no behavior change for existing users.
- **[PR #10819](https://github.com/unslothai/unsloth/pull/10819) — `accelerate` Windows ROCm pin**: Caps `accelerate < 1.15` on Windows because 1.15.0 unconditionally imports `torch._C._distributed_c10d`, which AMD's Windows ROCm wheels do not ship — every training run was failing at `Accelerator.prepare_model`.
- **[PR #10788](https://github.com/unslothai/unsloth/pull/10788) — Image text-encoder precision control**: Exposes `Default / FP8 storage / FP8 compute / INT8 / NVFP4` choices in the Images page UI; previously the precision was displayed but not selectable.
- **[Issue #10838](https://github.com/unslothai/unsloth/issues/10838) — Deepseek v4.1 Flash GGUF**: User feature request for GGUF quantization and `llama.cpp` support in Unsloth Studio. No maintainer response yet.

## 4. Performance & Optimization

- **[PR #10834](https://github.com/unslothai/unsloth/pull/10834) — Live inference phase in API monitor**: GGUF requests now surface `Prompt processing · N%` during llama.cpp prompt eval and `Token generation` once decoding starts. Useful for diagnosing TTFT vs. TPS bottlenecks without strace.
- **[PR #10088](https://github.com/unslothai/unsloth/pull/10088) — MCP image returns visible to model**: Previously an MCP tool that returned an image was shown in the tool card but only sent a text stub ("an image was attached") to the model, forcing hallucination. Now the image is forwarded as a proper message part, fixing #10057.
- **[PR #10830](https://github.com/unslothai/unsloth/pull/10830) — `trust_remote_code` resolution off the event loop**: `GET /api/inference/status` was doing `hf_hub_download` inline inside an `async def`, which could stall the Studio event loop on cache misses.

## 5. Stability & Regressions

**Severity-ranked (highest first):**

1. **Docker Studio unusable on GPU hosts** — [PR #10825](https://github.com/unslothai/unsloth/pull/10825). Training path fully broken (`TypeError` at trainer construction). **Fix merged (CLOSED).**
2. **`main` red for ~24h** — [PR #10832](https://github.com/unslothai/unsloth/pull/10832). ~25 PRs touched by `Repo tests (CPU)` inheritance of the failure. **Fix merged (CLOSED).**
3. **`accelerate 1.15.0` breaks all ROCm training on Windows** — [Issue implicit / PR #10819](https://github.com/unslothai/unsloth/pull/10819). **Fix PR open.**
4. **Studio safety bypass via tool permission settings** — [Issue #10835](https://github.com/unslothai/unsloth/issues/10835). Setting tool permissions to "Run automatically" or "Full access" reportedly allows `reboot`/`rm` to execute without confirmation, bypassing the sandbox. **No fix yet — security-sensitive, expect a hotfix.**
5. **Manual GPU-memory `--fit` verdict logged incorrectly** — [PR #10831](https://github.com/unslothai/unsloth/pull/10831). The log line interpolates `use_fit` before the Manual branch turns it off; the launch six lines later carries `--fit: off`. Cosmetic for users, misleading for diagnostics.
6. **Studio IPv6 bind blackhole** — [PR #10803](https://github.com/unslothai/unsloth/pull/10803). Backend bound `127.0.0.1:8888` then went silent; HF token check hung for ~80s, desktop app reported `unresponsive_health_check`. **Fix PR open.**
7. **False `ALL_COLUMNS_DROPPED` in recipe export** — [Issue #10738](https://github.com/unslothai/unsloth/issues/10738) / [PR #10836](https://github.com/unslothai/unsloth/pull/10836). Recipe Studio fails "Check recipe" even when seed columns are kept. **Fix PR open.**
8. **AppImage missing `hf_xet`** — [Issue #10840](https://github.com/unslothai/unsloth/issues/10840). Large GGUF downloads (e.g. Qwen 3.8 Flash Next Q5_K_XL) fail with `ValueError: The file is too large to be downloaded using the regular download method`. **No fix yet.**
9. **MCP call systematically truncated** — [Issue #10839](https://github.com/unslothai/unsloth/issues/10839). Possibly related to the tool-call deduplication behavior discussed in [Issue #10379](https://github.com/unslothai/unsloth/issues/10379).
10. **Studio New-chat crash** — [Issue #10288](https://github.com/unslothai/unsloth/issues/10288). `tapClientLookup: Index 1 out of bounds (length: 0)` and `MessagePartText can only be used inside text or reasoning message parts`.
11. **Run-settings sidebar / dropdown state divergence** — [Issue #10817](https://github.com/unslothai/unsloth/issues/10817). Two panels edit the same per-model settings with separate drafts that silently disagree.
12. **Inline graphs / Python visuals not rendered in chat** — [Issue #10539](https://github.com/unslothai/unsloth/issues/10539) **[CLOSED]**.
13. **Voice typing does not work over LAN** — [Issue #10824](https://github.com/unslothai/unsloth/issues/10824).

## 6. What This Means for Application Developers

- **If you run Unsloth Studio on GPU via the official Docker image**, [PR #10825](https://github.com/unslothai/unsloth/pull/10825) restores training. Pull the rebuilt image before any GRPO / Train / notebook run.
- **If you proxy Studio to enterprise Azure OpenAI / custom OpenAI-compatible gateways**, [PR #10837](https://github.com/unslothai/unsloth/pull/10837) fixes 400-rejection on newer models by switching to `max_completion_tokens`. Verify your gateway accepts both during rollout.
- **If you target AMD GPUs**, [PR #10820](https://github.com/unslothai/unsloth/pull/10820) unblocks the ROCm Docker path on RDNA2+ and CDNA, but Windows ROCm users must stay on `accelerate < 1.15` until #10819 merges ([PR #10819](https://github.com/unslothai/unsloth/pull/10819)).
- **If you build agent / MCP workflows on Studio**, watch [Issue #10379](https://github.com/unslothai/unsloth/issues/10379) (tool-call dedup toggle), [Issue #10822](https://github.com/unslothai/unsloth/issues/10822) (one-click MCP installs), and [PR #10088](https://github.com/unslothai/unsloth/pull/10088) (MCP image round-trip). The deduplication behavior is currently causing legitimate repeated tool calls to be silently dropped — relevant to any agent loop that re-invokes the same tool.
- **If you self-host on a network with IPv6 quirks**, [PR #10803](https://github.com/unslothai/unsloth/pull/10803) addresses a backend silent-hang on `127.0.0.1:8888`. Worth backporting even if you don't run Studio.
- **Security note for Studio desktop operators**: [Issue #10835](https://github.com/unslothai/unsloth/issues/10835) reports that "Run automatically" / "Full access" tool permissions bypass the sandbox. Until a fix lands, prefer "Ask every time" or scope tool allow-lists aggressively.
- **TRL >= 0.20 users** must consume [PR #10740](https://github.com/unslothai/unsloth/pull/10740) for Studio to construct a trainer.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-13

## Today's Highlights

The router's gateway/observability layer saw concentrated churn overnight, with three independently-reported defects producing a corrected cost-tracking path ([PR #1790](https://github.com/musistudio/claude-code-router/pull/1790) for [#1787](https://github.com/musistudio/claude-code-router/issues/1787)) and a subagent-routing instrumentation fix ([PR #1788](https://github.com/musistudio/claude-code-router/pull/1788)). A proposed attribution-header mitigation for the OpenCode Go zero-cache symptom ([#1791](https://github.com/musistudio/claude-code-router/issues/1791)) was withdrawn after verification did not reproduce the hypothesis, leaving that issue unresolved. A new correctness bug was filed: non-streaming completions through `openai_chat_completions` to reasoning-capable models (e.g., `z-ai/glm-5.3` via OpenRouter) produce fragmented or corrupted content blocks ([#1793](https://github.com/musistudio/claude-code-router/issues/1793)). No new releases shipped in the last 24 hours.

---

## Releases & Breaking Changes

*No new releases in the last 24 hours.* Build activity is limited to in-flight PRs against `master`.

---

## New Model & Hardware Support

- **Reasoning-model coverage gap surfaced** — `z-ai/glm-5.3` routed via OpenRouter exposes a content-block corruption bug in non-streaming mode under the `openai_chat_completions` provider capability ([#1793](https://github.com/musistudio/claude-code-router/issues/1793)). No fix has been merged.
- **GLM-5.3 "Token Plan" proposal** — Maintainer opened a feature/survey issue ([#1747](https://github.com/musistudio/claude-code-router/issues/1747)) exploring a paid token plan specifically optimized for GLM-5.3 in Claude Code and Codex contexts.
- **Feature request: Qoder CN enterprise sub-accounts** — [#1789](https://github.com/musistudio/claude-code-router/issues/1789) requests native routing support for distributed Qoder CN sub-accounts, a common distribution model in mainland China.

No new hardware backends, quant formats, or architectures were touched in this window.

---

## Performance & Optimization

- **Subagent routing instrumentation hardened** — [PR #1788](https://github.com/musistudio/claude-code-router/pull/1788) fixes three independent defects in the gateway/observability path: a quoted routing element (`CCR-SUBAGENT-MODEL`) could previously re-route the very request reviewing it; uncaptured upstream HTTP statuses are now recorded; and subagent routing elements are correctly scoped to genuine subagent launches rather than parent requests.
- **Attribution-header experiment withdrawn** — [PR #1792](https://github.com/musistudio/claude-code-router/pull/1792) (closed, not merged) proposed defaulting `CLAUDE_CODE_ATTRIBUTION_HEADER=0` in CCR-managed profiles to reduce system-prompt prefix variation. The author has since retracted the root-cause hypothesis; the cache-hit behavior in [#1791](https://github.com/musistudio/claude-code-router/issues/1791) remains unfixed.
- **Cost tracking correctness** — [PR #1790](https://github.com/musistudio/claude-code-router/pull/1790) fixes how usage is priced when a request is routed via a Router alias: cost now keys on the resolved upstream model ID (the `modelMetadata` lookup target) rather than the alias echoed back to the client, and request logs are aligned to the same upstream identity. No throughput numbers were provided.

---

## Stability & Regressions

Ranked by severity:

1. **[HIGH] Corrupted content blocks for reasoning models (non-streaming)** — [#1793](https://github.com/musistudio/claude-code-router/issues/1793). Reproduced with `z-ai/glm-5.3` over OpenRouter through `openai_chat_completions`. Root cause not yet isolated. **No fix PR exists.** Affects any Claude Code / Anthropic-protocol client requesting non-streaming completion against reasoning-capable models.
2. **[HIGH] All target providers failing (400)** — [#1658](https://github.com/musistudio/claude-code-router/issues/1658). Open since 2026-08-12. Same target (`nvidia/nemotron-3-ultra-550b-a55b`) works in `cc-switch` and direct Claude Code but fails with `"All target providers failed"` when routed through CCR. **No fix PR exists.**
3. **[MEDIUM] Estimated cost `$0` for rule-aliased models** — [#1787](https://github.com/musistudio/claude-code-router/issues/1787). Persists on `master` since v3.0.22. Usage records the alias instead of the resolved upstream model ID, so `modelMetadata` lookup misses and billing is wrong. **Fix in flight: [PR #1790](https://github.com/musistudio/claude-code-router/pull/1790).**
4. **[MEDIUM] Zero cache usage via OpenCode Go** — [#1791](https://github.com/musistudio/claude-code-router/issues/1791). Attribution-header mitigation withdrawn; symptom still uncharacterized.
5. **[MEDIUM] Subagent routing / upstream-status observability gaps** — Three defects covered by [PR #1788](https://github.com/musistudio/claude-code-router/pull/1788); the self-referential reroute case is the most consequential and warrants priority review.

---

## What This Means for Application Developers

- **Treat non-streaming reasoning-model completions as broken in current `master`.** Until [#1793](https://github.com/musistudio/claude-code-router/issues/1793) is resolved, prefer streaming or route reasoning models (`z-ai/glm-5.3`, etc.) through a provider capability you have validated end-to-end. Always verify the parsed Anthropic Messages response before consuming.
- **Do not trust cost dashboards while running an alias-heavy config.** Until [PR #1790](https://github.com/musistudio/claude-code-router/pull/1790) merges, any rule-aliased model will under-report (or randomly report) cost in the usage store. If you rely on the router's usage data for billing or budgeting, pin to the resolved upstream model ID for now.
- **Watch [#1791](https://github.com/musistudio/claude-code-router/issues/1791) if you use OpenCode Go with Claude Code.** Cache hits are reportedly zero in that combination; no mitigation is currently recommended, and the previously proposed header workaround has been retracted.
- **Subagent launchers should validate routing assertions** before relying on the public fix in [PR #1788](https://github.com/musistudio/claude-code-router/pull/1788) — particularly the case where a `CCR-SUBAGENT-MODEL` element in a reviewer's request body could itself be matched and re-routed.
- **Plan around upcoming GLM-5.3 and Qoder CN integrations.** Maintainer is soliciting feedback on a GLM-5.3 "Token Plan" ([#1747](https://github.com/musistudio/claude-code-router/issues/1747)) and a feature request for Qoder CN sub-accounts ([#1789](https://github.com/musistudio/claude-code-router/issues/1789)) is open. Worth tracking if either is on your 2026 roadmap.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-13

## Today's Highlights

CC Switch's last 24 hours show heavy proxy/routing work: a **breaking rename of `model_mapper` → `model_router`** landed via [PR #7317](https://github.com/farion1231/cc-switch/pull/7317) (advanced provider options now route by rule rather than map), a **per-vendor external API proxy** feature was proposed in [PR #7290](https://github.com/farion1231/cc-switch/pull/7290), and the long-running **Universal Route Proxy** effort in [PR #5617](https://github.com/farion1231/cc-switch/pull/5617) continues to iterate. On the bug side, multiple **Codex + DeepSeek tool-call/JSON deserialization regressions** are clustered around the `/responses` endpoint, with one related fix already closed ([#3575](https://github.com/farion1231/cc-switch/issues/3575)) and several open.

## Releases & Breaking Changes

- **No new releases in the last 24h.**
- **Breaking config rename (in review):** `model_mapper` → `model_router` in [PR #7317](https://github.com/farion1231/cc-switch/pull/7317). Anything in scripts, MCP servers, or third-party tools reading the old field will need migration. Author notes the existing "model mapping" advanced option is being repositioned as a routing concept with multiple matching strategies.
- **Codex `model_catalog_json` storage fix (backend semantic change):** [PR #7349](https://github.com/farion1231/cc-switch/pull/7349) proposes writing an absolute path again because newer Codex builds re-read `config.toml` during permission profile resolution and deserialize this field as absolute. Since #3614, only the bare filename has been stored.

## New Model & Hardware Support

CC Switch is a Tauri-based provider switcher/local proxy, not a training/inference stack, so backend (CUDA/ROCm/Metal) and quantization items do not apply. New surface area instead:

- **New provider presets:** `cocodot` for both Claude Code (native Anthropic-compatible) and Codex (Chat Completions via local routing) in [PR #7313](https://github.com/farion1231/cc-switch/pull/7313); `DaoXE` universal preset in [issue #5258](https://github.com/farion1231/cc-switch/issues/5258).
- **Zhipu OpenAI Responses model-list compatibility:** [PR #7330](https://github.com/farion1231/cc-switch/pull/7330) wires the three Zhipu model-list endpoints (one per API style) so listing actually returns usable IDs.
- **New CLI tool targets requested:**
  - **Antigravity CLI** as a replacement for the (now-discontinued) Gemini CLI — affects entry config and usage stats ([issue #7198](https://github.com/farion1231/cc-switch/issues/7198)).
  - **Pi (pi-coding-agent)** as an MCP sync target ([issue #7220](https://github.com/farion1231/cc-switch/issues/7220); current sync targets are Claude Code, Codex, Gemini, OpenCode, GrokBuild, Hermes).
  - **DeepSeek Harness** compatibility ([issue #6430](https://github.com/farion1231/cc-switch/issues/6430), 13 👍).
  - The [CLI Tool Support Tracker #1855](https://github.com/farion1231/cc-switch/issues/1855) (201 comments) remains the canonical backlog.
- **Linux desktop parity:** Claude Desktop 3P configuration support on Linux (Flatpak-aware, `$XDG_CONFIG_HOME` fallback) in [PR #7331](https://github.com/farion1231/cc-switch/pull/7331) (replacement of the closed [PR #6408](https://github.com/farion1231/cc-switch/pull/6408)).

## Performance & Optimization

- **Tool version probe bandwidth:** [PR #7346](https://github.com/farion1231/cc-switch/pull/7346) replaces full-packument fetches (`https://registry.npmjs.org/{package}`) with the dedicated `dist-tags` endpoint, with the existing probe timeout. Previously tens of MB per request, which kept Codex/OpenCode/OpenClaw cards stale.
- **WSL version probe accuracy:** [PR #7348](https://github.com/farion1231/cc-switch/pull/7348) filters shell startup banners so the WSL path returns the real tool version instead of the distro release string (`24.04.4` was masquerading as Claude Code 2.1.270).
- **Codex macOS usage accounting:** [PR #7341](https://github.com/farion1231/cc-switch/pull/7341) (Draft) reads `~/Library/Logs/com.openai.codex/YYYY/MM/DD/*.log` to surface background generations (`thread_title`, `ambient_suggestions`, `ambient_suggestion_safety`) that never produce importable session JSONL.
- **Session virtualization:** [PR #7327](https://github.com/farion1231/cc-switch/pull/7327) keeps selected DOM nodes mounted so cross-message text selection survives scrolling.
- **Prompt freshness:** [PR #7194](https://github.com/farion1231/cc-switch/pull/7194) reloads `CLAUDE.md` / `AGENTS.md` into the active prompt and refreshes on focus, so external edits show immediately.

## Stability & Regressions

Ranked by severity (highest first). Most recent 24h activity is bolded.

- **[HIGH] Codex + DeepSeek tool-call 400s after image inserts (v3.20.1).** [Issue #7190](https://github.com/farion1231/cc-switch/issues/7190) reports intermittent `HTTP 400: No tool output found for tool call` on `/responses` after `image_resize_notice` interleaves; a related **sanitization fix** lands in [PR #7342](https://github.com/farion1231/cc-switch/pull/7342) (strip incompatible reasoning replay when crossing third-party ↔ official Responses providers).
- **[HIGH] Windows Codex `config.toml` overwritten on provider switch.** [Issue #7235](https://github.com/farion1231/cc-switch/issues/7235) — plugins and appearance settings lost. Related [PR #7332](https://github.com/farion1231/cc-switch/pull/7332) tracks ownership of takeover-generated Codex routes so cleanup restores the built-in provider without deleting user-authored tables.
- **[HIGH] Codex + DeepSeek JSON deserialization failures** — closed today via [issue #3575](https://github.com/farion1231/cc-switch/issues/3575) ("local proxy failed while handling Codex endpoint. failed to deserialize the JSON body into the target").
- **[MED] macOS: requests fail hard after proxy tool exit/switch.** [Issue #7029](https://github.com/farion1231/cc-switch/issues/7029) — usage queries and connectivity checks all return `error sending request`; only an app restart recovers. [PR #7292](https://github.com/farion1231/cc-switch/pull/7292) proposes a UI toggle to **disable "follow system proxy"** and show the currently effective outbound proxy.
- **[MED] Codex UI settings rolled back when switching providers.** [Issue #6600](https://github.com/farion1231/cc-switch/issues/6600) — font/theme restored from stale snapshot; references fix #3697.
- **[MED] Codex sub-agent failure on DeepSeek v4-flash.** [Issue #6178](https://github.com/farion1231/cc-switch/issues/6178); root cause still unclear whether it's cc-switch or the model.
- **[MED] DeepSeek v4.1-flash reports "model does not support images" with Codex.** [Issue #7308](https://github.com/farion1231/cc-switch/issues/7308) — vision capability not exposed through the Codex adapter despite being a multimodal model.
- **[MED] URL auto-suffix `chat/completion` regression.** [Issue #6261](https://github.com/farion1231/cc-switch/issues/6261) (closed) — every provider re-edit reverts to auto-suffix, breaking models that need explicit full-path URLs.
- **[MED] Claude Code `input_image.detail = "original"` rejected upstream.** [PR #7104](https://github.com/farion1231/cc-switch/pull/7104) (closed) normalized `"original"` → `"high"` in `responses_to_chat_completions` because Responses-only value wasn't accepted on the Chat Completions side.
- **[MED] Code-switching fingerprint headers leak through transform paths.** [PR #7305](https://github.com/farion1231/cc-switch/pull/7305) strips Claude Code / Stainless SDK headers when converting to OpenAI Chat, OpenAI Responses, or Gemini — upstream gateways can still fingerprint the original client even after format conversion.
- **[LOW] SQLite database crash on Windows, temp files keep growing, reinstall doesn't help.** [Issue #5279](https://github.com/farion1231/cc-switch/issues/5279) (stale).
- **[LOW] SiliconFlow balance query returns negative CNY despite website showing ¥0.** [Issue #5272](https://github.com/farion1231/cc-switch/issues/5272) (stale).
- **[LOW] `model_name` mapping silently dropped after skill re-import → upstream 400s.** [Issue #5312](https://github.com/farion1231/cc-switch/issues/5312) (stale).
- **[LOW] Codex Windows app reachable but self-check reports no connection.** [Issue #5278](https://github.com/farion1231/cc-switch/issues/5278) (stale).
- **[LOW] Tauri overlay title bar broken on KDE.** Buttons unclickable and window grows on each restore — fixed in [PR #4298](https://github.com/farion1231/cc-switch/pull/4298) by overriding `titleBarStyle: "Visible"` for Linux.
- **[LOW] Claude Code v3.16.5 appends empty thinking block → TUI render glitch.** [Issue #5257](https://github.com/farion1231/cc-switch/issues/5257) (stale).
- **[LOW] Tray menu not refreshed after `ccswitch://` deep-link import.** [Issue #5255](https://github.com/farion1231/cc-switch/issues/5255) (stale).
- **[LOW] env-var prompt dismiss button dead after click.** [Issue #5294](https://github.com/farion1231/cc-switch/issues/5294) (stale).
- **[LOW] `base_url` strips `/v1` for `openai_responses` providers → breaks Bailian native Responses.** [Issue #5276](https://github.com/farion1231/cc-switch/issues/5276) (stale).
- **[LOW] Codex "enhanced mode keeps official login" group: GPT-5.4/5.5 reported as not existing.** [Issue #5286](https://github.com/farion1231/cc-switch/issues/5286) (stale).

## What This Means for Application Developers

- **v3.20.1 Codex+DeepSeek users with vision tool calls should pin or roll back.** [#7190](https://github.com/farion1231/cc-switch/issues/7190) breaks entire sessions intermittently; the targeted fix in [PR #7342](https://github.com/farion1231/cc-switch/pull/7342) only covers reasoning replay sanitization, not the image interleaving cause. Watch the next release notes for a full fix.
- **Track the `model_mapper` → `model_router` rename.** [PR #7317](https://github.com/farion1231/cc-switch/pull/7317) is a breaking change at the config level. If you script around `model_mapper` or persist provider JSONs outside the app, audit before merging into your workflow.
- **Plan for richer routing.** With Universal Route Proxy ([#5617](https://github.com/farion1231/cc-switch/pull/5617)), per-vendor external proxies ([#7290](https://github.com/farion1231/cc-switch/pull/7290)), and rule-based routing on the horizon, multi-provider setups will be able to fan out by upstream channel and model name rather than doing hard switches.
- **Multi-tenant / shared machines:** the new "don't follow system proxy" toggle in [PR #7292](https://github.com/farion1231/cc-switch/pull/7292) directly addresses the silent `error sending request` failures when the host's proxy env vars go stale — relevant if you run CC Switch on CI or shared dev VMs.
- **Codex Desktop on Linux is finally landing.** [PR #7331](https://github.com/farion1231/cc-switch/pull/7331) handles Flatpak vs native `$XDG_CONFIG_HOME` correctly, so Linux users can route Claude Desktop through cc-switch without manual config copying.
- **Header hygiene is being tightened.** [PR #7305](https://github.com/farion1231/cc-switch/pull/7305) means transformed requests will no longer advertise Claude Code / Stainless to upstreams — useful if you're routing through gateways that apply per-client policy.
- **MCP users: Pi agent is the next sync gap.** If you're using `pi-coding-agent` alongside Claude/Codex/Gemini, expect to keep MCP config duplicated until [issue #7220](https://github.com/farion1231/cc-switch/issues/7220) lands.
- **Provider telemetry quirk:** [PR #7341](https://github.com/farion1231/cc-switch/pull/7341) exposes Codex Desktop background tokens (titles, ambient suggestions) that previously fell off the radar — budgeting code that assumes session JSONL = total spend should be revisited.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-13

A daily snapshot of activity in [QuantumNous/new-api](https://github.com/QuantumNous/new-api), the unified LLM gateway/router (successor to One-API). Today's cycle is heavy on security hardening and bug-fix follow-throughs, with one notable new backend integration.

---

## 1. Today's Highlights

- **Security sweep from `mc-yzy15`**: two PRs land SSRF-safe URL validation in the ratio-sync path ([#7344](https://github.com/QuantumNous/new-api/pull/7344)) and stricter checks on user-setting webhook/Bark URLs ([#7343](https://github.com/QuantumNous/new-api/pull/7343)) — important since new-api lets unprivileged users register notification endpoints.
- **Container-aware memory monitoring finally fixed**: PR [#7335](https://github.com/QuantumNous/new-api/pull/7335) closes long-standing [#6744](https://github.com/QuantumNous/new-api/issues/6744), switching `system_monitor` from host `/proc/meminfo` to cgroup stats so `monitor_memory_threshold` actually trips inside Docker/K8s.
- **New backends and protocol surface**: a native **vLLM channel** ([#7332](https://github.com/QuantumNous/new-api/pull/7332)) and **Gemini Agentic Video Understanding** ([#7337](https://github.com/QuantumNous/new-api/pull/7337) closes [#7336](https://github.com/QuantumNous/new-api/issues/7336)) land on the same day, extending the gateway's coverage of self-hosted and multimodal traffic.

---

## 2. Releases & Breaking Changes

No new release tags were published in the last 24h. Current pre-release line is **v1.0.0-rc.37** in the wild.

- **[#7279](https://github.com/QuantumNous/new-api/issues/7279)** — open enhancement requesting explicit GA criteria now that v1.0.0 has reached rc.36. Maintainers have not committed to a timeline; downstream operators running rc.x should continue tracking channel notes for breaking changes.
- **Backwards-incompatible behavior change in closed PR [#6948](https://github.com/QuantumNous/new-api/pull/6948)**: trailing-slash enforcement on `/api/channel` GET/POST — reverse proxies that strip trailing slashes will need a path-rewrite rule.

---

## 3. New Model & Hardware Support

| Item | Type | Link |
|---|---|---|
| **vLLM channel** (`feat: vllm channel`) | New backend adapter — targets self-hosted OpenAI-compatible endpoints served by vLLM, likely with vLLM-specific metadata fields | [#7332](https://github.com/QuantumNous/new-api/pull/7332) |
| **Gemini Agentic Video Understanding** | Adds native Gemini API + Vertex AI relay support for video/media + tool-trace fields, routing Vertex-native agentic requests to the correct path | [#7337](https://github.com/QuantumNous/new-api/pull/7337) |
| **Responses WebSocket relay** (still open, last touched today) | New `/v1/responses` WS route for `response.create` events, with channel selection, upstream WS forwarding, usage metering, and refund-on-failure | [#5062](https://github.com/QuantumNous/new-api/pull/5062) |
| **Gemini 3.x compute-tier suffix preservation** | Fix so `gemini-3.8-flash` → `gemini-3.8-flash-high` mapping survives `ApplyReasoningModelSuffix` | [#7339](https://github.com/QuantumNous/new-api/pull/7339) |
| **Multi-Key channel "Test All Keys"** (closed) | Concurrent key testing + auto-disable rules for multi-key channels; mobile UI follow-ups | [#7112](https://github.com/QuantumNous/new-api/pull/7112) |
| **Active channel probe switch** (open) | Per-channel on/off for active probing, with throttling refinements | [#7161](https://github.com/QuantumNous/new-api/pull/7161) |
| **Internal API key** (open) | New auth path; review pending | [#7342](https://github.com/QuantumNous/new-api/pull/7342) |

No new quantization formats, CUDA/ROCm/Metal variants, or hardware targets are explicitly described in today's diffs.

---

## 4. Performance & Optimization

- **Container memory accounting** ([#7335](https://github.com/QuantumNous/new-api/pull/7335)): replaces `/proc/meminfo`-based accounting with cgroup v1/v2 reads. Effect: `monitor_memory_threshold` becomes actionable in containerized deployments; previously it either never fired or fired on host pressure, depending on whether `memory.limit_in_bytes`/`memory.max` was set. No concrete numbers published yet.
- **Billing accuracy — Anthropic cache tokens** ([#7305](https://github.com/QuantumNous/new-api/pull/7305), closes [#7290](https://github.com/QuantumNous/new-api/issues/7290)): prompt-cache read/write tokens now counted into the `consume_log` input totals. Operators should re-validate ratio calculations against upstream invoices for the past reporting period.
- **Active probe throttling** ([#7161](https://github.com/QuantumNous/new-api/pull/7161)): introduces a switch + refined throttling to reduce probe storms on cold-start and during deploys.

---

## 5. Stability & Regressions

Ranked by severity. Where a fix exists and was updated today, it is called out.

| Severity | Issue | Status / Fix |
|---|---|---|
| 🔴 Critical | **[#7331](https://github.com/QuantumNous/new-api/issues/7331)** — `InitChannelCache` panic: `assignment to entry in nil map` when an enabled channel's group has no abilities row. Reproduces on `main` (`bdef11750`) and a rc.30 fork; production incident reported. | **Open**, no fix PR yet. Mitigation: ensure every group referenced by an enabled channel has at least one `abilities` row. |
| 🔴 High | **[#6972](https://github.com/QuantumNous/new-api/issues/6972)** — "Active login session count limit reached" surface during normal use; the in-app "Sign out other sessions" UX fails to clear. | **Open**, 9 comments, no fix PR. Likely a state-desync bug between the session table and the active-session counter. |
| 🟠 High | **[#6744](https://github.com/QuantumNous/new-api/issues/6744)** — Container `monitor_memory_threshold` never triggers (reads host memory). | **Fix in [#7335](https://github.com/QuantumNous/new-api/pull/7335)** (open, awaiting review). |
| 🟠 High | **[#7338](https://github.com/QuantumNous/new-api/issues/7338)** — OAuth sensitive-operation verification fails when the IdP returns `Cross-Origin-Opener-Policy`, blocking high-privilege flows. | **Open**, no fix PR. |
| 🟡 Medium | **[#6503](https://github.com/QuantumNous/new-api/issues/6503)** — Auto-disabling the last channel in a group surfaces "database consistency broken" to clients during retry. | Fix **[#6504](https://github.com/QuantumNous/new-api/pull/6504)** landed today (closed). |
| 🟡 Medium | **[#7340](https://github.com/QuantumNous/new-api/issues/7340)** — `aspect_ratio` / `resolution` silently dropped from `/v1/images/generations` relay because `relaykit/dto.ImageRequest.MarshalJSON` deliberately does not re-emit `Extra`. | Fix **[#7341](https://github.com/QuantumNous/new-api/pull/7341)** opened today (open). |
| 🟡 Medium | **[#6708](https://github.com/QuantumNous/new-api/issues/6708)** — `/v1/responses` non-passthrough mode drops model mapping for MiMo. | Closed as `invalid` today; report likely mis-diagnosed routing. |
| 🟢 Low | **[#1069](https://github.com/QuantumNous/new-api/issues/1069)** — Request for an "ignore self-signed HTTPS cert" toggle for upstream calls. | Closed; no action. |
| ⚪ Invalid | **[#7334](https://github.com/QuantumNous/new-api/pull/7334)** merge PR | Closed; bot housekeeping. |
| ⚪ Invalid | **[#7013](https://github.com/QuantumNous/new-api/pull/7013)** fix(ali): route Responses to compatible-mode endpoint | Closed. Direct-MaaS users should confirm endpoint routing post-merge. |

---

## 6. What This Means for Application Developers

- **Self-hosted backends are first-class now.** With [#7332](https://github.com/QuantumNous/new-api/pull/7332) adding a vLLM channel, teams running internal inference fleets can route client traffic through new-api without losing vLLM-specific signals (assuming the adapter exposes them — verify against the merged schema before relying on it in production).
- **Multimodal agents on Gemini just got wider.** [#7337](https://github.com/QuantumNous/new-api/pull/7337) wires up Gemini's Agentic Video Understanding end-to-end, including tool-trace and media fields. If you're building video-understanding agents today on a different relay, this is a viable migration target — but wait for the PR to merge and verify rate-limit handling on Vertex.
- **Billing reconciliation is about to drift — or self-correct.** [#7305](https://github.com/QuantumNous/new-api/pull/7305) changes how Anthropic cache tokens are counted. If your usage dashboards source from new-api's `consume_log`, expect a one-time upward correction in `input_tokens` once you redeploy. Update finance/observability before the next billing cycle.
- **Containerized deployments should re-tune `monitor_memory_threshold`.** [#7335](https://github.com/QuantumNous/new-api/pull/7335) changes the basis from host to cgroup. If you previously set the threshold based on host-RAM percentages, your effective trigger point will shift significantly — re-derive from your cgroup limit.
- **Three open bugs deserve immediate workarounds.** The `InitChannelCache` panic ([#7331](https://github.com/QuantumNous/new-api/issues/7331)) is the highest priority — audit `group → abilities` integrity before the next deploy, or gate channels behind a config-validated startup check. The OAuth-COP failure ([#7338](https://github.com/QuantumNous/new-api/issues/7338)) will break any IdP that emits `COOP: same-origin`; until fixed, prefer IdPs without COOP or downgrade sensitive-operation checks.
- **WebSocket Responses is still pending.** [#5062](https://github.com/QuantumNous/new-api/pull/5062) has been open since May; if your agent stack depends on streaming Responses, track this rather than building around it.

---

*Sources: [QuantumNous/new-api issues](https://github.com/QuantumNous/new-api/issues) and [pull requests](https://github.com/QuantumNous/new-api/pulls) updated 2026-09-12 → 2026-09-13.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*