# AI Infrastructure Digest 2026-09-06

> Generated: 2026-09-06 15:33 UTC | Projects covered: 9

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

# Cross-Project Infrastructure Report — 2026-09-06

**Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth, Claude Code Router (CCR), CC Switch, New API

---

## 1. Ecosystem Overview

The stack is absorbing a heavy new-model wave — DeepSeek-V4-Flash, GLM-5.3-Flash (321B hybrid), Qwen3.8-Flash-Next, GPT-6 Astra — and the strain shows unevenly: llama.cpp shipped GLM-5-Next inference while SGLang is sitting on a six-issue GLM-5.3-Flash bug cluster. The dominant engineering theme is the **memory hierarchy below GPU HBM** (host-resident KV in vLLM's HiSparse series, SGLang's KV-shard split, llama.cpp's lazy Q8_0 KV quantization and MoE expert-cache proposals), driven by the economics of 300B+ sparse/hybrid MoE models. Hardware diversification is accelerating — DGX Spark/SM121, Strix Halo, ROCm, and Apple Silicon all saw first-class work today, frequently ahead of stability. Meanwhile the gateway layer is maturing on **security and billing correctness** (New API's TOTP/Passkey milestone, LiteLLM's cost-accounting bug sweep), and Rust is infiltrating every tier (vLLM renderer, SGLang TreeCore, LiteLLM execution harness).

---

## 2. Activity Comparison

*Counts = issues/PRs surfaced in each project's 2026-09-06 digest, not exhaustive repo activity.*

| Project | Layer | Issues | PRs | Release status | Dominant theme today |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~20 (top issue: 105 comments) | ~18 | None (0.24.0/0.27.1 in field) | HiSparse 7-PR series; hybrid-model bug cluster |
| **SGLang** | Serving engine | ~22 | ~18 | None | GLM-5.3-Flash bug cluster; Apple Silicon RFC |
| **llama.cpp** | Local runtime/kernel | ~20 | ~20 | **4 releases** (b10821–b10825) | Spec-decode correctness; AMD kernel wins |
| **Ollama** | Local runtime/UX | ~14 | ~8 | **1 RC** (v0.34.0-rc1) | MLX maturation; 8 GiB cache-leak fix |
| **LiteLLM** | Gateway | ~29 | ~17 | **2** (v1.100.0 stable, v1.101.0-rc.1) | Rust execution layer; billing correctness |
| **Unsloth** | Fine-tuning/serving | ~30 **closed** | ~19 | None | Studio: DGX Spark 2-node, voice, Strix Halo |
| **CCR** | Client-side router | 2 | 1 | None | Gateway startup reliability |
| **CC Switch** | Client-side router | ~16 | ~16 | None (v3.20.1) | Codex Responses↔Chat translation bugs |
| **New API** | Gateway/relay | 6 | 7 | **1** (v1.0.0-rc.34) | Account-security overhaul; GPT-6 Astra relay |

**Takeaway:** llama.cpp, LiteLLM, Ollama, and New API are shipping; vLLM and SGLang are in deep-development cycles (large stacked PR series, no tags); Unsloth spent the day on hygiene (30+ closures) plus Studio features.

---

## 3. Model Support Race

| Model family | vLLM | SGLang | llama.cpp | Ollama | Gateways |
|---|---|---|---|---|---|
| **DeepSeek-V4-Flash** | ✅ Ahead: C4 sparse-MLA (#53592), MXFP4×FP8 fused MoE (#54032); ⚠️ SM8x/Ampere gated (#50576, 105 comments) | ⚠️ V4-Flash-Vision FP4 OOM (#37931), DSA top-k crash (#37892) — unfixed | — | — | CC Switch catalog fix (#6750) |
| **GLM-5.3-Flash / GLM-5-Next (321B hybrid)** | Fixes: SM90 fp8 KV startup (#55222) | 🔴 Blocked: 6-issue cluster (HiCache corruption #38031, PP KeyError #36906, SM120 #37105) | ✅ **Shipped end-to-end** (#27754) | ⚠️ `:cloud` infinite-reasoning loop (#18193) | Pricing rows landed (CC Switch #7163) |
| **Qwen3.8-Flash-Next (hybrid)** | ✅ PLE-Offload serving-ready, TP4+MTP (#53899) | ⚠️ MTP acceptance decays to ~0 (#37326) | ⚠️ Silent EOS >130k on hybrids (#27756) | ✅ MLX YaRN long-context (#18263) | — |
| **GPT-6 Astra** (closed) | — | — | — | — | ✅ New API relay support (#7211); CC Switch pricing (#7162) |
| **Spark2_5** | — | — | ✅ Shipped (#27868) | ❌ Downloads but won't infer (#18195) | — |

**Verdict:** **vLLM leads datacenter open-model enablement** (DeepSeek-V4 sparse-MLA + Qwen3.8 FP8); **llama.cpp leads edge coverage and was first to run GLM-5.3-Flash**; SGLang is ambitious but stability-trailing on the newest hybrids; the **GPT-6 Astra gap is gateway-only territory**, where New API leads. On hardware: SGLang is alone on T-Head PPU; Unsloth and llama.cpp own Strix Halo/gfx1201; Apple Silicon is contested across SGLang (RFC #32321), Ollama (MLX wins), and llama.cpp (M2 Max FA tuning).

---

## 4. Performance Frontier

1. **KV/expert memory tiering (hottest area).** vLLM's HiSparse series (7 PRs: hot-buffering, NIXL per-region geometry, Prometheus hit/miss metrics) keeps sparse-MLA pages on device until forced host-spill; its MoE-offload RFC (#38256) adds pinned expert weights + LFRU GPU caching. SGLang landed KV-shard split 1/4 (#37614), HiCache Mooncake fixes, and closed the unified-vs-static DCP decode gap on B300 (#37926). llama.cpp shipped lazy Q8_0 KV quantization (#28267) and is designing a two-tier MoE expert cache (#20757). Ollama capped llama-server prompt-cache RAM (`OLLAMA_CACHE_RAM`, #18265) after an 8 GiB untracked leak.
2. **Disaggregated P/D goes mainstream.** vLLM: DBO full CUDA-graph capture (#51700), direct GPU landing for P/D (#55398). SGLang: PP16 prefill has a measured ~7.8 s admission floor (#38206). Even llama.cpp has an official disaggregated prefill/decode roadmap (#21266).
3. **Quantization kernels.** llama.cpp: HIP Q2_0 **+33–35%** token-gen on gfx1201, bit-exact (#26753); Vulkan MMVQ path fix (#28489) that is both perf and correctness. vLLM: FlashInfer SM90 MXFP4×FP8 fused MoE (#54032). SGLang: W4A8 CUTLASS retuned for GLM-5.2 on H200 (#38220), NVFP4 via TRTLLM/CuTe DSL (#38216).
4. **Native-layer rewrites (plumbing phase, no published deltas).** LiteLLM's 9-PR Rust harness consolidation toward a single `LITELLM_RUST` toggle; vLLM's standalone Rust renderer image (#51503); SGLang's Rust TreeCore SWA port (#37584).
5. **Gateway-level optimization.** LiteLLM sequence-length-bucketed latency metrics (#40059); New API batched deep-copy on Responses (#7221) + channel-probe throttling (#7161); CC Switch's flagship-planner/cheap-subagent routing proposal (#7165) pushes optimization into *cost* rather than latency.

---

## 5. Layer Positioning

- **Datacenter serving engines (vLLM, SGLang):** Competing on memory hierarchy and disagg. vLLM plays breadth-and-ecosystem (NIXL, FlashInfer, 8+ model families); SGLang plays performance-first and experimental (DCP, DPC, diffusion residency planner) but is paying a stability tax on GLM-5.3-Flash.
- **Local runtimes (llama.cpp, Ollama):** llama.cpp is the kernel/substrate layer — its GGUF and backends underpin Ollama and Unsloth Studio. Ollama is distribution and UX (ChatGPT Desktop integration in v0.34.0-rc1, MLX runner, cloud tags), one layer above the metal.
- **Gateways (LiteLLM, New API):** Server-side, multi-tenant, enterprise-facing. Today's work was security and money: New API shipped TOTP/Passkey + audit trail; LiteLLM fixed AdaptiveRouter and OAuth2 crashes while fighting billing-accuracy bugs.
- **Client-side routers (CCR, CC Switch):** Desktop proxies for coding agents; their hard problem is *protocol translation* (Responses ↔ Chat ↔ Anthropic), evidenced by 6+ open CC Switch translation bugs and CCR's opaque 502s.
- **Fine-tuning (Unsloth):** Originating in training, but today's activity (DGX Spark two-node serving orchestrator #10323, SSE control frames, `/v1/embeddings`) shows it building *down*-stack into serving. **Layer boundaries are visibly blurring** — engines add observability (vLLM, Ollama `/metrics`), runtimes add server features, trainers add serving, gateways add execution.

---

## 6. Trend Signals

1. **Hybrid/sparse architectures are the correctness frontier.** Three vLLM high-severity hybrid bugs, SGLang's GLM cluster, llama.cpp's silent-EOS-at-130k, and temp=0 non-determinism (#54521) all landed in one day. These architectures ship before their state-management semantics are solid.
2. **Below-HBM memory tiering is the 2026 economics story** — every runtime project moved on host-tier KV, expert offload, or unified memory today. This decides who can serve 300B+ MoE on A100/H100-class fleets.
3. **Ampere-fleet anxiety is real:** vLLM #50576 (105 comments) shows A100/RTX-30xx operators feel abandoned by new-model enablement.
4. **Tool-calling/protocol fidelity is the #1 agent-facing risk**, cutting across *every* layer: vLLM parser bugs (Qwen2.5, Gemma4, `strict` leakage), llama.cpp GBNF schema bugs, CC Switch translation bugs, New API `reasoning_effort` mapping, Ollama cloud JSON splitting. **Agent developers should pin tool-call regression suites and treat parser behavior as unstable across minor versions.**
5. **Edge AI clusters (DGX Spark, Strix Halo, SM120) are getting first-class treatment** despite crash-level rough edges on SM121 across vLLM, SGLang, and llama.cpp.
6. **Gateway layer is professionalizing** (security MFA, signed images, audit trails) while billing correctness lags — LiteLLM's $0-cost custom models (#35691), double-billed cache reads (#40006), and over-billed Vercel cache tokens (#39088) are live production risks.

**Watch list for the next 1–2 weeks:** SGLang GLM-5.3-Flash trackers (#37524, #37813); vLLM #50576 (Ampere unblock); llama.cpp #28489 (spec-decode fix — audit quantized-target outputs now); LiteLLM billing fixes before trusting spend logs; Ollama v0.34.0 stable (17–27 s MLX re-prefill fix, #18267); New API's Telegram OAuth migration is a **hard breaking change** at rc.34 cutover.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-06

## 1. Today's Highlights

Activity in the past 24 hours is dominated by two threads. The DeepSeek-V4-Flash SM8x (Ampere A100/A800, RTX 30xx) enablement request has reached 105 comments and is now the most-discussed issue on the repo ([#50576](https://github.com/vllm-project/vllm/issues/50576)). On the PR side, the HiSparse series for host-resident sparse-MLA decode continues to land in stacked parts — including hot-buffering ([#53781](https://github.com/vllm-project/vllm/pull/53781)), per-region NIXL transfer geometry ([#53780](https://github.com/vllm-project/vllm/pull/53780)), and DeepSeek V4 C4 support ([#53592](https://github.com/vllm-project/vllm/pull/53592)).

## 2. Releases & Breaking Changes

No new tagged releases in the last 24h.

Behavioral change worth flagging:
- **OpenAI `strict` flag leaks into chat templates** — vLLM 0.24.0 renders `tools[].function.strict` into the model-visible chat template, changing tool-call behavior on Qwen3.6-27B-FP8 ([#52741](https://github.com/vllm-project/vllm/issues/52741)). Gate behind a flag or fix before relying on `strict=true` semantics.
- **Pinned `--block-size` corrupts mamba hybrid state on prefix-cache resume** — affects Qwen3.8-27B on vLLM 0.27.1, V2 GPU runner, RTX 3090 ([#53142](https://github.com/vllm-project/vllm/issues/53142)). Avoid `--block-size` overrides on hybrid GDN/mamba models until the fix lands.

## 3. New Model & Hardware Support

- **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731** — SM8x enablement is the open gating issue; latest checkpoint released 2026-07-31 ([#50576](https://github.com/vllm-project/vllm/issues/50576)).
- **Qwen3.8-Flash-Next (FP8)** — PLE-Offload support PR is up and serving-ready at `-tp 4` with MTP speculative decoding + prefix caching ([#53899](https://github.com/vllm-project/vllm/pull/53899)).
- **DeepSeek V4 C4 sparse MLA** — HiSparse resident + host-backed cache paths, including compressed slot/block geometry and split FP8 value/scale page layout ([#53592](https://github.com/vllm-project/vllm/pull/53592)).
- **GLM-5.3-Flash** — Fixes for SM90 sparse MLA `--kv-cache-dtype fp8` startup failure and oversized indexer prefill workspace ([#55222](https://github.com/vllm-project/vllm/pull/55222)).
- **ROCm gfx942 / gfx950** — HY V4 graph-mode serving path optimized with AITER fused biased-sigmoid top-k and additional graph tuning ([#54594](https://github.com/vllm-project/vllm/pull/54594)).
- **FlashInfer SM90 MXFP4 × FP8 fused MoE backend** — opt-in `--moe-backend flashinfer_cutlass_humming` for DeepSeek-V4-family MXFP4 expert weights ([#54032](https://github.com/vllm-project/vllm/pull/54032)).
- **InternVL2 with Transformers v5** — meta-device init path tracked separately ([#38425](https://github.com/vllm-project/vllm/issues/38425)).
- **Standalone Rust renderer Docker image** — engine-free `vllm-rs` binary, `docker buildx bake rust-renderer` ([#51503](https://github.com/vllm-project/vllm/pull/51503)).

## 4. Performance & Optimization

- **HiSparse (7 PRs active)** — host-resident tier beneath GPU KV cache for sparse-MLA decode; keeps pages on device until capacity forces a host spill ([#53781](https://github.com/vllm-project/vllm/pull/53781)). Direct GPU landing for P/D when the decoder has capacity ([#55398](https://github.com/vllm-project/vllm/pull/55398)). Shared/private Host pool modes resolved in the planner, with private fallback for unsupported Indexer layouts ([#52760](https://github.com/vllm-project/vllm/pull/52760)). Prometheus metrics for hot-buffer hits/misses and host↔device bytes, sampled every 2,000 worker steps to avoid per-step sync ([#53782](https://github.com/vllm-project/vllm/pull/53782)).
- **NIXL KV Connector** — per-region stride/capacity/size metadata carried through descriptor construction; supports packed cache storage and pure-MLA peers ([#53780](https://github.com/vllm-project/vllm/pull/53780)). Same-node reads staged through registered device buffers with two-leg completion gating ([#53263](https://github.com/vllm-project/vllm/pull/53263)).
- **DBO (Disaggregated Batch Optimization) on MRV2** — full CUDA-graph capture for microbatched steps lands as the second half of the RFC stack ([#51700](https://github.com/vllm-project/vllm/pull/51700)).
- **Multimodal cache fast path** — opt-in `VLLM_EARLY_UUID_LOOKUPS` skips video/image decoding entirely on a UUID hit ([#55583](https://github.com/vllm-project/vllm/pull/55583)).
- **GLM video backends** — replaces O(source_frames) timestamp scan in `GLM46VVideoBackend` and `GLMGAVideoBackend` ([#55582](https://github.com/vllm-project/vllm/pull/55582)).
- **MOE offloading RFC** — pinned-memory expert weights + LFRU GPU cache + cross-layer prediction to run oversize MoE on smaller hardware; PR 1 open ([#38256](https://github.com/vllm-project/vllm/issues/38256)).

## 5. Stability & Regressions

**High severity (crash / silent corruption):**
- **FlashInfer + MTP spec-decode illegal memory access on SM121 (GB10 / DGX Spark)** with GQA=16 models (Nemotron-3-Super-120B-A12B-NVFP4). Triton backend is unaffected. No fix PR yet. ([#37754](https://github.com/vllm-project/vllm/issues/37754))
- **Spec-decode FULL cudagraph misroutes prefill** when `prompt_tokens == uniform_decode_query_len * num_reqs` → silent GDN state loss and garbage output on hybrid Qwen3-Next. No fix PR yet. ([#53051](https://github.com/vllm-project/vllm/issues/53051))
- **Hybrid mamba align precopy** populates the state column with the wrong block size on prefix-cache resume with explicit `--block-size` — illegal memory access. No fix PR yet. ([#53142](https://github.com/vllm-project/vllm/issues/53142))

**Medium severity (correctness):**
- **Qwen3.8-Flash-Next non-determinism at temperature=0** when context crosses `indexer_budget` (QSA switches dense → top-k). Five byte-identical requests → five different completions on sm121/GB10. ([#54521](https://github.com/vllm-project/vllm/issues/54521))
- **DBO microbatch survivor deref** when one microbatch exits its `UBatchContext` before peers complete on the V2 runner. Fix PR exists. ([#55586](https://github.com/vllm-project/vllm/pull/55586))
- **OffloadingConnector zeros offload hits under MTP/EAGLE** — KV stored on CPU tier but reusable-token count returned as zero. Fix PR exists. ([#52771](https://github.com/vllm-project/vllm/pull/52771))
- **GLM-5.3-Flash fp8 plan dtype mismatch** on SM90 sparse MLA — `uint8` storage vs `float8_e4m3fn` view causes `plan()` failure. Fix PR exists. ([#55222](https://github.com/vllm-project/vllm/pull/55222))
- **`assert` as runtime control flow** in KV-cache / entrypoints / mamba utilities — silently wrong under `python -O` (e.g. `set.pop()` on multi-element sets returns arbitrary value). Fix PR exists. ([#55187](https://github.com/vllm-project/vllm/pull/55187))
- **T4 (SM 7.5) extreme slowness / indefinite hang** on Qwen3.5-27B even after the SM<8.0 TORCH_SDPA fallback from #36357 ([#36589](https://github.com/vllm-project/vllm/issues/36589)).

**Tool-calling surface (low–medium):**
- **Qwen2.5 tool parser + OpenAI content format** fails chat requests ([#54491](https://github.com/vllm-project/vllm/issues/54491)).
- **Gemma4 tool parser** drops the bare `<|tool_call>:name{...}` opener — no tool call, no content, on both streaming and non-streaming ([#53431](https://github.com/vllm-project/vllm/issues/53431)).
- **OpenAI `strict` flag leaks into the chat template** — see §2 ([#52741](https://github.com/vllm-project/vllm/issues/52741)).

**Already closed (progress):** RFC #8913 quantized-linear decouple ([#33314](https://github.com/vllm-project/vllm/issues/33314)), fp4 scaled-mm kernel abstraction ([#31823](https://github.com/vllm-project/vllm/issues/31823)), Qwen3-Next automatic prefix caching ([#25874](https://github.com/vllm-project/vllm/issues/25874)), PluggableLayer / vLLM-IR CustomOp replacement tracker ([#32676](https://github.com/vllm-project/vllm/issues/32676)), sleep-mode `torch.cuda` counters ([#33625](https://github.com/vllm-project/vllm/issues/33625)).

## 6. What This Means for Application Developers

- **Don't pin on Ampere yet for DeepSeek-V4-Flash.** If your fleet is A100/A800 or RTX 30xx, #50576 is the unblocker; track it before promising the model in production.
- **HiSparse is the new default for sparse-MLA serving.** If you operate P/D disaggregation, the new per-region NIXL metadata and host-staged reads remove a class of pinned-memory friction. Plan to retest with NIXL peers before the series is merged.
- **Hybrid GDN/mamba models are still the highest-risk surface.** Three distinct crash/correctness bugs in the last 24h alone (mamba block-size state, spec-decode prefill misroute, FlashInfer SM121). If you serve Qwen3-Next / Qwen3.8 hybrid, hold a known-good torch.compile config and avoid `--block-size` overrides for now.
- **Tool-calling is brittle across parsers.** Qwen2.5, Gemma4, and the OpenAI `strict` flag each have open defects. Pin tool-call behavior tests in CI; do not rely on parser compatibility from one minor to the next.
- **Newly (re)opened features worth re-evaluating:** DRY sampler ([#8581](https://github.com/vllm-project/vllm/issues/8581)), attention-score output ([#3192](https://github.com/vllm-project/vllm/issues/3192)), multi-LoRA for classification ([#19623](https://github.com/vllm-project/vllm/issues/19623), [#12829](https://github.com/vllm-project/vllm/issues/12829)), and a max waiting-queue length knob ([#18826](https://github.com/vllm-project/vllm/issues/18826)) — all active and could land soon.
- **Multimodal latency wins are landable.** `VLLM_EARLY_UUID_LOOKUPS` ([#55583](https://github.com/vllm-project/vllm/pull/55583)) and the GLM video-frame scan fix ([#55582](https://github.com/vllm-project/vllm/pull/55582)) are low-risk once they merge; if you pre-process repeated media, the UUID short-circuit is essentially free.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-06

## Today's Highlights
- **GLM-5.3-Flash dominates the bug tracker.** A cluster of open issues (#36906, #37105, #37524, #37813, #38031, #38207) reports crashes, KV-cache corruption, and HiCache host-tier load-back corruption across SM120, pipeline-parallel, and DPC configurations — drivers in the GLM-5.3-Flash bug tracker (#37524) and SM120 fix tracker (#37813) are not yet fully closed.
- **Apple Silicon serving is being redesigned.** [#32321](https://github.com/sgl-project/sglang/issues/32321) is an active RFC proposing a Torch-owned SRT path with an exported whole-model MLX region, sitting on top of prior [#32984](https://github.com/sgl-project/sglang/issues/32984) Torch/MLX interop work.
- **Compressed-tensors quant embedding produced silent all-NUL output.** [#38143](https://github.com/sgl-project/sglang/issues/38143) reported MiniMax-M3 W4A16 on 2× DGX Spark serving correctly but generating token id 0 for every step; same fix-day PR [#38224](https://github.com/sgl-project/sglang/pull/38224) makes `CompressedTensorsConfig` reject quantized embeddings instead of silently producing garbage.

## Releases & Breaking Changes
No new releases in the last 24h.

## New Model & Hardware Support
- **T-Head PPU** (ZW810 / ZW810E / ZW-M890P) upstreams roadmap — [#37519](https://github.com/sgl-project/sglang/issues/37519).
- **Mamba 1/2 inference support** (WIP) — [#34556](https://github.com/sgl-project/sglang/pull/34556).
- **Nemotron latent-MoE fused projection + shared-expert add** — [#30430](https://github.com/sgl-project/sglang/pull/30430).
- **AMD dense-FP8 path for Quark MXFP4 checkpoints** (fused silu/mul/activation quant) — [#28932](https://github.com/sgl-project/sglang/pull/28932).
- **NVFP4 dispatch via standard FlashInfer TRTLLM and CuTe DSL backends** — [#38216](https://github.com/sgl-project/sglang/pull/38216).
- **Apple Silicon roadmap continuation** ([#19137](https://github.com/sgl-project/sglang/issues/19137)) + redesign RFC ([#32321](https://github.com/sgl-project/sglang/issues/32321)).

## Performance & Optimization
- **Unified-memory DCP decode gap on Blackwell** — [#37926](https://github.com/sgl-project/sglang/pull/37926) closes a 1.96% regression vs static pool measured on B300 / Kimi-Linear / TP2 DCP2 with `cutedsl_mla`; the prior Hopper fix did not carry over.
- **W4A8 MoE tuning for GLM-5.2 on H200** — [#38220](https://github.com/sgl-project/sglang/pull/38220) replaces the (n,k)-keyed CUTLASS dispatcher that was tuned for DeepSeek configs.
- **Unified Radix Cache: SWA branching-point caching ported to the Rust TreeCore** — [#37584](https://github.com/sgl-project/sglang/pull/37584); Rust core is a parallel implementation, not a binding, so it had not inherited #34565.
- **KV-shard split, 1/4: logical-page placement** — [#37614](https://github.com/sgl-project/sglang/pull/37614) lands the index space only, behind no runtime flag.
- **Diffusion residency planner series**: reversible residency pre-warmup ([#36703](https://github.com/sgl-project/sglang/pull/36703)), single-iteration probe calibration honoring pipeline step minimums ([#37809](https://github.com/sgl-project/sglang/pull/37809)), read-only safetensors mapping ([#37822](https://github.com/sgl-project/sglang/pull/37822)), quiet internal warmup frame searches ([#38226](https://github.com/sgl-project/sglang/pull/38226)), H3 reference audio stabilization ([#38225](https://github.com/sgl-project/sglang/pull/38225)).
- **HiCache Mooncake linker loads kept queued after abort** — [#38195](https://github.com/sgl-project/sglang/pull/38195) restores the UMBP-style behavior.

## Stability & Regressions
Ranked by blast radius.

- **GLM-5.3-Flash HiCache host-tier corruption** (8×H100 TP8, no speculative decoding) — [#38031](https://github.com/sgl-project/sglang/issues/38031). Dropped tool calls and degenerate repetition loops; no fix PR yet.
- **DeepSeek-V4-Flash-Vision FP4 weight-load OOM on 2× DGX Spark** — [#37931](https://github.com/sgl-project/sglang/issues/37931). Scheduler OOM-killed during FP8→FP4 MoE conversion, 5/5 reproductions. Unfixed.
- **DeepSeek-V4 long-context prefill illegal memory access** in DSA indexer top-k kernel (`topk_v1.cuh:348`); paged prefill path can never reach the v2 kernel — [#37892](https://github.com/sgl-project/sglang/issues/37892). Unfixed.
- **DFLASH/DSPARK draft KV pool uses `tp_size` instead of `attn_tp_size`** → OOM under DP attention in Kimi-K3 — [#38202](https://github.com/sgl-project/sglang/issues/38202). Unfixed.
- **PP16 disaggregated prefill: ~7.8 s bootstrap admission wait** under concurrent long-input — [#38206](https://github.com/sgl-project/sglang/issues/38206). Unfixed.
- **GLM-5.3-Flash startup `KeyError: 'residual'` under PP** — [#36906](https://github.com/sgl-project/sglang/issues/36906). Unfixed.
- **GLM-5.3-Flash on RTX PRO 6000 (sm_120): two DSA backend blockers after deep_gemm NameError** — [#37105](https://github.com/sgl-project/sglang/issues/37105). Tracked under [#37813](https://github.com/sgl-project/sglang/issues/37813).
- **MiniMax-M3 W4A16 all-NUL output on 2× DGX Spark** — [#38143](https://github.com/sgl-project/sglang/issues/38143). **Fix:** [#38224](https://github.com/sgl-project/sglang/pull/38224) (compressed-tensors now refuses quantized embeddings rather than silently dropping the quant method).
- **NEXTN/MTP draft acceptance decays to ~0 over server uptime** on qwen4_exp (Qwen3.8-Flash-Next); restored by restart — [#37326](https://github.com/sgl-project/sglang/issues/37326). Unfixed.
- **OpenAI Responses API: `POST /v1/responses/{id}/cancel` returns 200 on foreground responses** — [#38087](https://github.com/sgl-project/sglang/pull/38087) restricts cancel to `background=true` responses.
- **OTel tracing loses Scheduler spans when `--tokenizer-worker-num>1`** — [#38210](https://github.com/sgl-project/sglang/issues/38210). **Fix:** [#38211](https://github.com/sgl-project/sglang/pull/38211) (multi-tokenizer/detokenizer routers now call `process_tracing_init`).
- **GLM-5.3 DPC crashes** — [#38207](https://github.com/sgl-project/sglang/issues/38207). Newly opened.
- **Step-3.5-Flash multi-layer EAGLE KV-cache batch-size mismatch (expected 4, got 7)** in eager mode — [#30354](https://github.com/sgl-project/sglang/issues/30354). Closed inactive.
- **ROCm multimodal CUDA-IPC fallback crash on `MmItemMemoryPool` overflow** — [#29687](https://github.com/sgl-project/sglang/issues/29687). Closed inactive; intended workaround.
- **sgl_kernel SM121 aarch64 wheels missing on DGX Spark** — [#29317](https://github.com/sgl-project/sglang/issues/29317). Closed inactive.
- **CUDA coredump auto-collector tracker** — [#26340](https://github.com/sgl-project/sglang/issues/26340) (CI infrastructure, 293 comments).
- **CI Test Failures and Fixes tracker** — [#17050](https://github.com/sgl-project/sglang/issues/17050): 5 broken, 13 flaky, 944 recently fixed (auto-update 2026-09-06 14:59 UTC).

## What This Means for Application Developers
- **Don't roll out GLM-5.3-Flash to production yet.** Active bugs span HiCache corruption, pipeline-parallel startup, and consumer Blackwell GPUs. Track [#37524](https://github.com/sgl-project/sglang/issues/37524) and [#37813](https://github.com/sgl-project/sglang/issues/37813) before deploying.
- **DGX Spark (GB10 / SM121) is a known rough edge.** DeepSeek-V4-Flash-Vision (#37931), MiniMax-M3 W4A16 (#38143 — fix landing today), and the SM121 aarch64 wheel gap (#29317) all converge here. Pin to the recent images and validate workloads before scaling.
- **Compressed-tensors serving is safer today.** PR [#38224](https://github.com/sgl-project/sglang/pull/38224) converts a silent-correctness failure into a hard refusal, so deployments will no longer serve broken-looking token streams from quantized embedding tables.
- **OTel tracing on sharded tokenization now works.** If you run with `--tokenizer-worker-num>1` and rely on Scheduler spans, [#38211](https://github.com/sgl-project/sglang/pull/38211) restores them.
- **PP/PD disagg prefill at PP16 has a 7.8 s admission floor.** If your SLO is latency-sensitive under concurrent long inputs, avoid PP16 prefill until [#38206](https://github.com/sgl-project/sglang/issues/38206) is addressed.
- **Responses API `/cancel` semantics are now OpenAI-compatible.** Foreground cancels now return 400 ([#38087](https://github.com/sgl-project/sglang/pull/38087)); update client error handling accordingly.
- **Unified memory on Blackwell decode is no longer regressed.** #37926 lands the closure of the unified-vs-static decode gap; unified memory is viable for DCP decode workloads on B300.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-06

## 1. Today's Highlights

Four point releases (b10821–b10825) shipped in the last 24h, bringing Metal M2 Max FlashAttention tuning, a `--log-jsonl` flag, simplified CMake UI embedding, and a grammar repetition-threshold fix. The active issue and PR queues are dominated by **speculative-decoding correctness on quantized targets**, **tool-call grammar/JSON-schema bugs**, and **backend perf work** (HIP Q2_0 +33–35%, gfx1201 FlashAttention, Vulkan MMVQ path fix). Several long-standing issues are also converging on fixes — notably the disaggregated prefill/decode roadmap and KV-cache lazy quantization.

## 2. Releases & Breaking Changes

| Build | Highlights | PR |
|---|---|---|
| **b10825** | `grammar`: fix max-repetition threshold | [#28469](https://github.com/ggml-org/llama.cpp/pull/28469) |
| **b10823** | `common`: add `--log-jsonl` (rename `unknown` → `none`) | [#28437](https://github.com/ggml-org/llama.cpp/pull/28437) |
| **b10822** | `ui`: embed assets directly via CMake — removes external gzip dep & cross-compile helper | [#28445](https://github.com/ggml-org/llama.cpp/pull/28445) |
| **b10821** | `metal`: add remaining fa-vec tunings for **M2 Max** | [#28458](https://github.com/ggml-org/llama.cpp/pull/28458) |

**Migration notes:**
- `--log-jsonl` introduces a new structured log sink; pipelines parsing stdout should switch to this flag rather than regexing stderr.
- Grammar max-repetition change (#28469) can affect constrained-output workflows — revalidate any test cases that previously hit the old threshold.
- UI asset embedding (#28445) simplifies packaging: `gzip` is no longer a build dependency for `llama-server` WebUI.

## 3. New Model & Hardware Support

- **Spark2_5ForCausalLM** — GGUF conversion, tensor mapping, tokenizer pre-tokenizer, end-to-end inference ([#27868](https://github.com/ggml-org/llama.cpp/pull/27868))
- **HrmTextForCausalLM / DFM Mimir 1B** — dual-stack HRM-Text transformer with fused gqkv projection ([#27625](https://github.com/ggml-org/llama.cpp/pull/27625))
- **GLM-5-Next (GLM-5.3-Flash)** — 321.3B hybrid linear/sparse-attention MoE with vision tower; requires `NVIDIA_TF32_OVERRIDE=0` ([#27754](https://github.com/ggml-org/llama.cpp/pull/27754))
- **OpenCL** — fixed compiler-version detection when platform reports 3.0 but driver only supports 1.2 ([#28499](https://github.com/ggml-org/llama.cpp/pull/28499))
- **CPU quantization** — IQ2_NL / IQ3_NL types added so 256-block super-block K/I-quants can be used on tensors whose row length is **not** a multiple of 256 ([#27322](https://github.com/ggml-org/llama.cpp/pull/27322))
- **CPU op** — BF16 support for `GET_ROWS_BACK` (was FP32/FP16 only) ([#28493](https://github.com/ggml-org/llama.cpp/pull/28493))
- **RPC / RDMA** — `rdma_cm` fallback path for **iWARP** (no IP-mapped GIDs; RoCE probe fails silently today) ([#28494](https://github.com/ggml-org/llama.cpp/pull/28494))
- **AMD GCN** — per-arch MMQ config to avoid fallback to RDNA2 path on wave64 / 512-thread configs ([#27841](https://github.com/ggml-org/llama.cpp/pull/27841))

## 4. Performance & Optimization

- **HIP Q2_0 (gfx1201)** — native AMD permutation replaces generic HIP byte-permutation: **~33–35% token-generation speedup**, bit-exact across all 65,536 packed Q2 values ([#26753](https://github.com/ggml-org/llama.cpp/pull/26753))
- **CUDA/HIP FlashAttention (gfx1201 / R9700 PRO)** — head-size-256 bug fixed in general FA path; long-context prefill no longer "abysmal" on 32 GB R9700 PRO ([#28102](https://github.com/ggml-org/llama.cpp/pull/28102))
- **Vulkan MMVQ path** — was forcing F32 DMMV for `N=1` decode while `N>1` speculative verify used Q8_1 + integer-dot MMVQ; precision mismatch flipped greedy picks at near-ties (root cause of #25618). Now path-selection is independent of batch size ([#28489](https://github.com/ggml-org/llama.cpp/pull/28489))
- **Metal M2 Max** — remaining fa-vec FlashAttention tunings landed in b10821 ([#28458](https://github.com/ggml-org/llama.cpp/pull/28458))
- **KV-cache lazy Q8_0 quantization** — opt-in flag to down-quant the cache only when the FP16 cache fills up; upstream of strict KV-rotation metadata save/restore ([#28267](https://github.com/ggml-org/llama.cpp/pull/28267), [#28498](https://github.com/ggml-org/llama.cpp/pull/28498))
- **`llama-bench --bandwidth`** — opt-in column reporting estimated `model_size × t/s` GB/s for token generation ([#28459](https://github.com/ggml-org/llama.cpp/pull/28459))
- **ROCm AllReduce** — re-enabled on HIP (previously disabled due to missing host APIs) ([#27825](https://github.com/ggml-org/llama.cpp/pull/27825))
- **MoE expert cache** — pluggable two-tier GPU+RAM cache for expert offload (closed proposal, design discussion ongoing) ([#20757](https://github.com/ggml-org/llama.cpp/issues/20757))
- **CPU MoE FFN band selection** — `--n-cpu-mode` for `--n-cpu-ffn` to pin FFN shards to specific cores ([#27987](https://github.com/ggml-org/llama.cpp/pull/27987))

## 5. Stability & Regressions

| Severity | Issue | Status |
|---|---|---|
| 🔴 High | **Speculative decoding (draft-mtp / draft-dspark) greedy divergence on Q4_K_M targets** — matches bf16 but not quantized; ngram spec fine. Vulkan root-cause identified as F32 DMMV vs Q8_1 MMVQ precision flip ([#25618](https://github.com/ggml-org/llama.cpp/issues/25618)) | **Fix PR** [#28489](https://github.com/ggml-org/llama.cpp/pull/28489) |
| 🔴 High | **CUDA graphs hang GPU channel (RC watchdog + Xid 8) on RTX 5090 Laptop / sm_120** ([#27330](https://github.com/ggml-org/llama.cpp/issues/27330)) | Workaround: `GGML_CUDA_DISABLE_GRAPHS=1` |
| 🔴 High | **Blackwell GGML-CUDA SOFT_MAX crash** on RTX 5090 (SM 12.0, CUDA 13.3, driver 580.17) with 35B+ models ([#25060](https://github.com/ggml-org/llama.cpp/issues/25060)) | Fix patch proposed by user, under review |
| 🟠 Med | **NaN logits at ~80K+ context, Qwen3.6-35B-A3B, single GPU CUDA** ([#23606](https://github.com/ggml-org/llama.cpp/issues/23606)) | Stale |
| 🟠 Med | **Silent instant-EOS at >130k context on Qwen3.5-hybrid 64-layer (DeltaNet)** — both CUDA and CPU; consistent with recurrent-state depth × layer-count degradation ([#27756](https://github.com/ggml-org/llama.cpp/issues/27756)) | Open |
| 🟠 Med | **Qwen3.6-27B-MTP + `--fit on` + `--sleep-idle-seconds`** fails when `tensor_buft_overrides` already set ([#24684](https://github.com/ggml-org/llama.cpp/issues/24684)) | Fix provided |
| 🟠 Med | **SYCL/OpenCL P2P crash on multi-GPU Arc** via `dev2dev_memcpy` / `ext_oneapi_can_access_peer` ([#27168](https://github.com/ggml-org/llama.cpp/issues/27168)) | Open |
| 🟠 Med | **SYCL multi-GPU host-side GTT mirror not visible in VmRSS / free** ([#22116](https://github.com/ggml-org/llama.cpp/issues/22116)) | Stale |
| 🟡 Low | **JSON-schema → GBNF**: nested `string.maxLength ≥ 2000` emits un-parseable GBNF ([#25746](https://github.com/ggml-org/llama.cpp/issues/25746)); empty-object schema and large maxLength also reject otherwise-valid tool-call requests ([#25923](https://github.com/ggml-org/llama.cpp/issues/25923)) | Open |
| 🟡 Low | **`peg-native` tool-call grammar generator emits GBNF that fails its own parser** (Kimi K2.7-Code, 22-tool fan-out) ([#24658](https://github.com/ggml-org/llama.cpp/issues/24658)) | Stale |
| 🟡 Low | **OpenAI-compatible tool calling emits malformed/incomplete JSON** for simple object schemas ([#22072](https://github.com/ggml-org/llama.cpp/issues/22072)) | Stale |
| 🟡 Low | **`common_peg_until_parser` returns SUCCESS** when delimiter is absent in a non-lenient parse ([#27772](https://github.com/ggml-org/llama.cpp/issues/27772)) | Open |
| 🟡 Low | **`llama-ui`: reasoning-level selection menu does not open on desktop** ([#27981](https://github.com/ggml-org/llama.cpp/issues/27981)) | Open |
| 🟡 Low | **MSVC does not detect AVX-VNNI** → no VNNI on supported CPUs ([#28295](https://github.com/ggml-org/llama.cpp/issues/28295)) | Open |
| 🟡 Low | **ggml_metal_synchronize / `kIOGPUCommandBufferCallbackErrorInnocentVictim` crash on Mac M4 Pro Tahoe 26.3** ([#20141](https://github.com/ggml-org/llama.cpp/issues/20141)) | Stale |
| 🟡 Low | **ggml-backend-meta split-axis assertion** on MiniMax M2.7 / UD-Q2_K_XL, 4×3090 ([#24015](https://github.com/ggml-org/llama.cpp/issues/24015)) | Stale |
| 🟢 Info | **Roadmap: disaggregated prefill/decode for `llama-server`** ([#21266](https://github.com/ggml-org/llama.cpp/issues/21266)) — 34 comments, 15 👍 | Open |
| 🟢 Info | **Roadmap: `llama-server` REST API changelog** ([#9291](https://github.com/ggml-org/llama.cpp/issues/9291)) — 20 comments, 20 👍 | Open |
| 🟢 Info | **Roadmap: `libllama` API changelog** ([#9289](https://github.com/ggml-org/llama.cpp/issues/9289)) — 13 comments | Open |

## 6. What This Means for Application Developers

- **If you use speculative decoding with quantized targets**, audit outputs vs vanilla greedy — the F32-vs-Q8_1 MMVQ mismatch (PR [#28489](https://github.com/ggml-org/llama.cpp/pull/28489)) could be silently flipping tokens. Pin to the latest build or disable spec decoding until the fix lands.
- **Tool-call / function-calling reliability**: the JSON-schema → GBNF generator has multiple open bugs around nested `maxLength`, empty-object schemas, and large tool fan-out. If you serve complex OpenAI-style tool definitions, expect intermittent `failed to parse grammar` errors — keep schema payloads minimal and avoid `maxLength ≥ 2000`.
- **`llama-server` WebUI** is now self-contained (no external gzip) — Docker images and air-gapped builds drop a dependency.
- **New deployment targets** are landing fast: iWARP/RDMA RPC transports, MoE expert-cache eviction policies, `--n-cpu-mode` FFN pinning, and lazy Q8_0 KV quantization are all progressing — worth tracking if you run multi-host, MoE, or long-context inference.
- **Roadmap signal**: disaggregated prefill/decode is officially on the table ([#21266](https://github.com/ggml-org/llama.cpp/issues/21266)) — useful for capacity planning if you're architecting multi-tenant LLM gateways on top of `llama-server`.
- **Operator hygiene**: `--log-jsonl` ([#28437](https://github.com/ggml-org/llama.cpp/pull/28437)) is the right way to ship structured logs into Loki/Splunk/etc. — start migrating off `stderr` regex scraping.
- **ROCm/AMD users** get a real win: ~33–35% token-gen on gfx1201 Q2_0 ([#26753](https://github.com/ggml-org/llama.cpp/pull/26753)) and FlashAttention tuning for R9700 PRO ([#28102](https://github.com/ggml-org/llama.cpp/pull/28102)). Re-run `llama-bench --bandwidth` to capture before/after deltas.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-06

## Today's Highlights

The v0.34.0 release candidate is out, headlined by native integration of Ollama models inside ChatGPT Desktop and improved structured-output performance on Apple Silicon ([v0.34.0-rc1](https://github.com/ollama/ollama/releases/tag/v0.34.0)). On the platform side, a serious llama-server prompt-cache memory leak (up to 8 GiB per runner, untracked) has been reported and fixed in the same window ([#18264](https://github.com/ollama/ollama/issues/18264), [#18265](https://github.com/ollama/ollama/pull/18265)). The MLX runner on Apple Silicon is also getting a coordinated cleanup — context-length enforcement, Qwen YaRN support, and prefix-cache truncation fixes all landed or are landing today.

## Releases & Breaking Changes

- **v0.34.0-rc1** ([release](https://github.com/ollama/ollama/releases/tag/v0.34.0)) — Ollama models can now be used directly inside ChatGPT Desktop (MacOS setup via the Ollama app). Structured-output performance on Apple Silicon is improved. Release notes truncated in source; expect a `/metrics` opt-in (see PR #16998 below) and tighter MLX context handling to be candidates before stable.
- **API change implied:** launch subsystem now needs to reconcile external CLI tools' context-window defaults with Ollama's loaded runner (see #18256, #18257, #18259). No explicit break yet, but operators should re-test `ollama launch` workflows with Claude Code, Codex CLI, and Qwen Code on 0.34.0-rc1.

## New Model & Hardware Support

- **New architecture request:** `spark2_5` (Spark-X2.5-4B / 1.7B from SparkLLM) — currently downloads but cannot start inference ([#18195](https://github.com/ollama/ollama/issues/18195)).
- **MLX runner extensions:** Qwen3.5/3.8 static YaRN metadata now parsed and applied to text RoPE + multimodal M-RoPE, allowing contexts up to `factor * original_max_position_embeddings` ([#18263](https://github.com/ollama/ollama/pull/18263)).
- **Bugfix coverage:** `glm-ocr` legacy GGUFs now register `<|user|>` as EOT to prevent runaway generation under llama-server ([#17195](https://github.com/ollama/ollama/pull/17195)).
- **Vulkan / AMD iGPU:** 66 GB model loads regressed since v0.32.12 — "Not enough memory for command submission" ([#18272](https://github.com/ollama/ollama/issues/18272)). Last known good: v0.32.9.
- **Apple Silicon (MLX):** `num_ctx` from Modelfile now enforced; scheduler passes the value into the subprocess, runner reports effective context back to `/api/ps` ([#18261](https://github.com/ollama/ollama/pull/18261), addresses [#18125](https://github.com/ollama/ollama/issues/18125)).

## Performance & Optimization

- **Prefix-cache, MLX:** Restore was truncated to multiples of 8192 tokens, costing a fixed **17–27 s re-prefill** on the turn after every cold prefill on Claude Code–style workloads. Fix in flight ([#18267](https://github.com/ollama/ollama/issues/18267)).
- **Prompt cache accounting:** llama-server's `--cache-ram` default of **8192 MiB** is now bounded by a new `OLLAMA_CACHE_RAM` env var and surfaced inside Ollama's memory accounting ([#18265](https://github.com/ollama/ollama/pull/18265), closes [#18264](https://github.com/ollama/ollama/issues/18264)).
- **LLM renderer ↔ llama-server:** When Ollama renders prompts with a Go renderer and hits llama-server's raw `/completion`, it now sends `message_delimiters` so llama-server can place context checkpoints at user-turn boundaries ([#18271](https://github.com/ollama/ollama/pull/18271)).
- **Observability:** An opt-in Prometheus-compatible `GET /metrics` endpoint behind `OLLAMA_METRICS=1` is on the runway — exposes `ollama_requests_queued`, `ollama_queue_capacity`, `ollama_models_loaded`, `http_requests_total`, plus per-model/token metrics ([#16998](https://github.com/ollama/ollama/pull/16998), [#3144](https://github.com/ollama/ollama/issues/3144)).

## Stability & Regressions

Ranked roughly by severity / blast radius.

1. **Vulkan + AMD iGPU regression** — 66 GB models fail to load with `Not enough memory for command submission` since v0.32.12 ([#18272](https://github.com/ollama/ollama/issues/18272)). No PR yet. **Workaround:** pin to v0.32.9.
2. **Cloud latency / stream errors on `kimi-k2.6:cloud`** — single requests taking **10+ minutes**, intermittent `INTERNAL_ERROR` on streamed `/api/chat`, recurring for days ([#16845](https://github.com/ollama/ollama/issues/16845)). No fix PR.
3. **Cloud reasoning JSON split on `:cloud` models** (e.g. `minimax-m3:cloud`) — JSON output is split between `message.reasoning` and `message.content` on the OpenAI-compat endpoint; `content` alone is invalid JSON, breaking structured consumers ([#17987](https://github.com/ollama/ollama/issues/17987)). No fix PR.
4. **`glm-5.3:cloud` infinite reasoning** — both OpenCode and ZCode can spin into endless reasoning loops until task abort; the official Z.AI API is unaffected ([#18193](https://github.com/ollama/ollama/issues/18193)).
5. **MLX runner stuck in "Stopping…"** — `muse-glimmer:30b-mlx` repeatedly hangs in `ollama ps` "Stopping…" state even with `OLLAMA_KEEP_ALIVE=30`; one occurrence coincided with a full macOS restart ([#18269](https://github.com/ollama/ollama/issues/18269)).
6. **Long-standing: digest mismatch on `ollama pull`** ([#941](https://github.com/ollama/ollama/issues/941)) and **download progress reverts** ([#8484](https://github.com/ollama/ollama/issues/8484)) continue to receive churn; both remain open.
7. **License notice distribution** — Ollama still does not ship MIT copyright notices for statically-linked llama.cpp in its release artifacts; high community signal (👍272) but no progress ([#3185](https://github.com/ollama/ollama/issues/3185)).
8. **`ollama launch` context-mismatch bugs** — Qwen Code silently uses its 1,000,000-token default ([#18256](https://github.com/ollama/ollama/issues/18256)); Codex CLI falls back to 128K ([#18257](https://github.com/ollama/ollama/issues/18257)); Claude Code with `kimi-k2.7-code:cloud` falls into a conservative 200K auto-compact ([#17717](https://github.com/ollama/ollama/issues/17717)). PR #18259 lands the Codex fix today.

## What This Means for Application Developers

- **Pin carefully across 0.33.x → 0.34.0-rc1.** The Apple Silicon structured-output improvements are real, but the MLX runner is mid-refactor (context enforcement, YaRN, prefix-cache restore). If you run Qwen3.5/3.8 MLX, validate cold-prompt latency before promoting the RC.
- **Vulkan / AMD iGPU customers should stay on v0.32.9** until #18272 is resolved — large-model loads will fail otherwise.
- **Cloud-tag reliability is uneven.** Treat `:cloud` reasoning models as best-effort for production agent loops: JSON-mode clients should defensively reassemble `content` + `reasoning`, and long-running agentic workloads on `kimi-k2.6:cloud` / `glm-5.3:cloud` should have timeouts and a fallback model. If you depend on these for paying workloads, file tickets and track [#16845](https://github.com/ollama/ollama/issues/16845), [#17987](https://github.com/ollama/ollama/issues/17987), [#18193](https://github.com/ollama/ollama/issues/18193).
- **Memory accounting is becoming real.** With `OLLAMA_CACHE_RAM` and an on-deck `/metrics` endpoint, you can finally cap and observe host-RAM growth from prompt-cache KV — set this explicitly on long-lived runners before the 8 GiB surprise hits you (#18265).
- **Launch integrations need a sanity check.** If you embed `ollama launch` against Claude Code / Codex / Qwen Code, don't trust the CLI's advertised context window — verify against `/api/ps` and watch for PR #18259's rollout in 0.34.x.
- **Structured-output on Apple Silicon is a v0.34.0 selling point** — if you're targeting Mac clients (especially for tool-use / JSON-mode agents), this release is worth piloting.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-06

## Today's Highlights

LiteLLM shipped **v1.100.0 (stable)** and **v1.101.0-rc.1**, with continued momentum on the **native Rust execution layer** — a series of refactor PRs consolidate provider dispatch, OCR, callbacks, auth, and bridge execution under a unified Rust harness. Operational hot fixes land across Bedrock (sampling params, Voxtral transcription, file deletion), Vercel AI Gateway pricing, and the MCP toolset update path. Several long-standing correctness bugs — most notably the **AdaptiveRouter `gammavariate` crash on persisted alpha/beta=0** and the **MCP OAuth2 managed-flow regression introduced in 1.96** — were closed today.

## Releases & Breaking Changes

- **v1.101.0-rc.1** (release candidate) — https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.1
- **v1.100.0** (stable) — https://github.com/BerriAI/litellm/releases/tag/v1.100.0
- All Docker images are signed with cosign (key from commit `0112e53`).
- **Behavior regressions worth flagging during upgrade:**
  - **MCP managed OAuth2** opened the LiteLLM UI instead of the vendor auth page after upgrading 1.95.1 → 1.99.0 — fixed in #39665. [#39665](https://github.com/BerriAI/litellm/issues/39665)
  - **Anthropic `reasoning_effort` silently dropped** when passed as a `Reasoning(...)` dict in v1.85.0 — closed. [#28196](https://github.com/BerriAI/litellm/issues/28196)
  - **Responses→Chat path dropped `input_file` in `function_call_output`** for Vertex / Bedrock — closed. [#28232](https://github.com/BerriAI/litellm/issues/28232)

## New Model & Hardware Support

- **New provider: The Grid** — added as a JSON-configured OpenAI-compatible provider, supersedes #35085 (5,408 commits stale). [#39907](https://github.com/BerriAI/litellm/pull/39907)
- **Cloudflare Workers AI reranking** via `/ai/run` — fills the gap that Cloudflare's `/ai/v1` OpenAI surface does not expose rerank. [#40053](https://github.com/BerriAI/litellm/pull/40053)
- **Anthropic Claude Apps Gateway** support requested — not yet merged. [#34924](https://github.com/BerriAI/litellm/issues/34924)
- **Bedrock Voxtral audio transcription** — provider path enabled but needed a system-message removal fix. [#39806](https://github.com/BerriAI/litellm/pull/39806)
- **Vercel AI Gateway** price-import coverage expanded — 117 of 373 live models previously crashed the importer due to missing `output` price. [#40057](https://github.com/BerriAI/litellm/pull/40057)
- **SambaNova cost map is stale** (12 of 17 entries are deprecated on SambaNova Cloud with no `deprecation_date`); remains open. [#29011](https://github.com/BerriAI/litellm/issues/29011)

## Performance & Optimization

- **Prometheus: latency bucketed by input sequence length** — opt-in labels for TTFT and request latency so short vs. long prompts no longer mix. [#40059](https://github.com/BerriAI/litellm/pull/40059)
- **Native Rust execution layer (multi-PR series by `yujonglee-berri`)**: 
  - Provider discovery moved to shared dispatch boundaries [#39939](https://github.com/BerriAI/litellm/pull/39939)
  - OCR lifecycle fully migrated to Rust [#39765](https://github.com/BerriAI/litellm/pull/39765)
  - Callback contracts and shared callback runtime [#39484](https://github.com/BerriAI/litellm/pull/39484)
  - `ai-gateway` dependency dropped in the Python bridge; OCR + WebSocket lifecycle unified in core [#40054](https://github.com/BerriAI/litellm/pull/40054)
  - Per-request enablement flags removed in favor of single `litellm.rust(bool)` / `LITELLM_RUST` toggle [#39928](https://github.com/BerriAI/litellm/pull/39928)
  - Fallback restricted to `RustBridgeDeclined` so native errors stop replaying through Python [#39923](https://github.com/BerriAI/litellm/pull/39923)
  - Preflight APIs replaced with typed execution declines [#39986](https://github.com/BerriAI/litellm/pull/39986)
  - "Send-once" authorization boundary on the wire encoding [#40055](https://github.com/BerriAI/litellm/pull/40055)
  - Shared SDK auth foundation (discovery, expiry, isolation contracts) [#40056](https://github.com/BerriAI/litellm/pull/40056)
- No published throughput/latency deltas yet — these are architectural land-the-plumbing PRs; benchmarks expected once the refactors settle.

## Stability & Regressions

**High severity (closed today):**
- **AdaptiveRouter "gammavariate: alpha and beta must be > 0.0" permanent 500.** One persisted cell with `alpha=0` or `beta=0` bricks the router until manual cleanup. Two duplicate issues (#29397, #35590) closed. [#29397](https://github.com/BerriAI/litellm/issues/29397) [#35590](https://github.com/BerriAI/litellm/issues/35590)
- **MCP managed OAuth2 flow opens LiteLLM UI instead of vendor auth page** (regression from 1.95.1 → 1.99.0). [#39665](https://github.com/BerriAI/litellm/issues/39665)
- **Bedrock `DELETE /v1/files/{file_id}` returns 500** — `BedrockFilesConfig` does not support deletion; orphaned files accumulate. [#39715](https://github.com/BerriAI/litellm/issues/39715)

**Medium severity (open):**
- **Non-streaming `/chat/completions` never cancels upstream work on client disconnect** — distinct from the streaming fix in #30244/#30245. [#37140](https://github.com/BerriAI/litellm/issues/37140)
- **Spend logs record `$0` (`cost_breakdown.total_cost = 0`)** for custom models not in the built-in cost map, while `response.usage.estimated_cost` is correct — billing divergence. [#35691](https://github.com/BerriAI/litellm/issues/35691)
- **Vercel AI Gateway streaming drops `prompt_tokens_details`** — cached prompt tokens billed at full input rate. [#39088](https://github.com/BerriAI/litellm/issues/39088)
- **`custom_cost_per_token` bills Anthropic cache-read tokens twice** when `cache_read_input_token_cost` is set. [#40006](https://github.com/BerriAI/litellm/issues/40006)
- **`POST /config/reload` returns 404** on `litellm-database:main-stable` — endpoint missing. [#30772](https://github.com/BerriAI/litellm/issues/30772)
- **OpenAI Codex CLI incompatible with LiteLLM** — stream disconnects before completion. [#29818](https://github.com/BerriAI/litellm/issues/29818)
- **`/user/update` always 400s on documented `blocked` param** — column missing on `LiteLLM_UserTable`, breaks Terraform provider's `litellm_user`. [#39564](https://github.com/BerriAI/litellm/issues/39564)
- **AdaptiveRouter reads cost from `litellm_params.input_cost_per_token`** instead of `model_info` — silently zeros out cost-weighted routing. [#31481](https://github.com/BerriAI/litellm/issues/31481)
- **Model access check ignores `access_group_ids` on a Virtual Key.** [#28464](https://github.com/BerriAI/litellm/issues/28464)
- **WebSocket `/v1/responses` requires `?model=` query param**, breaking OpenAI spec (9 👍). [#25532](https://github.com/BerriAI/litellm/issues/25532)
- **False "Budget has been exceeded"** — enforced cost (`111.29`) far exceeds recorded spend on `/v1/messages`. [#40050](https://github.com/BerriAI/litellm/issues/40050)
- **`litellm_settings.max_budget` arms a process-local `_current_cost` cap that never resets.** [#40020](https://github.com/BerriAI/litellm/issues/40020)
- **`/model/new` never reaches a gateway-only process** with misleading error logs. [#39547](https://github.com/BerriAI/litellm/issues/39547)
- **Anthropic `/v1/messages` erases OpenAI Responses refusal blocks** into empty `content` array. [#39721](https://github.com/BerriAI/litellm/issues/39721)
- **Request Logs date-range filter treats local picker times as UTC.** [#39979](https://github.com/BerriAI/litellm/issues/39979)

**Low severity / operational:**
- `/ui/login` returns 404 on pip install (1.85.1) — likely nginx rule missing. [#29340](https://github.com/BerriAI/litellm/issues/29340)
- Azure Sentinel logging fails on payloads > 1MB / fields > 256KB. [#26450](https://github.com/BerriAI/litellm/issues/26450)
- `v1.83.14-stable` `linux/arm64` manifest contains amd64 binaries. [#29382](https://github.com/BerriAI/litellm/issues/29382)
- Trim whitespace from email addresses when creating users in UI. [#28880](https://github.com/BerriAI/litellm/issues/28880)
- Multi-key daily usage comparison in Usage dashboard — enhancement. [#28234](https://github.com/BerriAI/litellm/issues/28234)
- Signed cost-map fetch for air-gapped installs — proposal. [#40051](https://github.com/BerriAI/litellm/issues/40051)

**Fix PRs landed today for several regressions:**
- #40060 preserves omitted metadata during scalar updates.
- #40057 makes pricing/token limits optional in the Vercel gateway importer.
- #39834 drops unsupported sampling params on Bedrock converse reasoning models.
- #39806 removes the system message from Bedrock Voxtral transcription.
- #40022 honors explicit `null` on toolset updates and adds MCP lifecycle e2e.

## What This Means for Application Developers

- **Pin and verify cosign signatures** when pulling the new Docker images; key reference commit is `0112e53`.
- **If you use the AdaptiveRouter**, audit persisted state for `alpha`/`beta` cells equal to 0 — a single bad cell permanently 500s the model group. Drain or recreate affected rows before the next restart.
- **If you rely on `max_budget`** on virtual keys or `litellm_settings.max_budget`, expect a process-local cost cap that may not reset on its own — verify behavior against #40020 / #40050 before relying on budget enforcement in production.
- **Cost accuracy**: for any custom model or `custom_cost_per_token` deployment, double-check that cached / cache-read tokens are not double-billed and that custom (non-built-in) models don't silently show `$0` in spend logs (#35691, #40006). If your accounting depends on these, hold the upgrade and verify per-model.
- **Vercel AI Gateway users on streaming**: cached prompt tokens are currently over-billed; track #39088.
- **Bedrock users**: file deletion is broken (orphaned files); the RC likely addresses it.
- **OpenAI Codex CLI** is not currently usable through the proxy — track #29818.
- **Long term**, the Rust native-execution refactor is consolidating config under `litellm.rust(bool)` / `LITELLM_RUST`. Once merged end-to-end, expect a single switch to control Rust acceleration across providers — but per-route toggles are being removed, so review any custom configs that set per-endpoint Rust flags.
- **For new provider onboarding**, The Grid (#39907) and Cloudflare Workers AI rerank (#40053) are ready to test if you need cheap rerank or another OpenAI-compatible endpoint.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-06

## Today's Highlights

Studio is the focus of today's activity: a two-node DGX Spark serving orchestrator with an async replica router landed (PR #10323), the conversation half of the long-pending voice mode (#6527) was reconstructed on current `main` by @donaldfilimon (PR #10373, #10374), and the AMD Vulkan backend is now routed for Strix Halo (gfx1150/gfx1151) ahead of ROCm (PR #10381). On the stability front, more than 30 long-standing issues were closed in the last 24h, including Docker volume docs (#4396), Triton pointer errors during Qwen3-235B loading (#4137), Qwen3.5 packing/NaN grads (#4160), and the Gemma-3 `ConstantVariable` error (#3996).

## Releases & Breaking Changes

No new releases published in the last 24h. Several merged/landing changes carry behavior shifts worth flagging:

- **PR #10362** — `/v1/chat/completions` SSE will gate Unsloth's own UI control frames (`tool_start`, `tool_end`, `tool_output`, `tool_args`, `tool_status`, `reasoning_summary`, `diffusion_frame`) behind an `X-Unsloth-Events` opt-in. Strict OpenAI clients currently fail schema validation on frames with no `choices`.
- **PR #10387 / #7140** — Studio will stop serving the seeded admin password in the served page and replace it with a one-time setup token. The first-login screen does not change, but downstream proxies or reverse-proxied deployments that relied on the bootstrap string will need updating.
- **PR #10304** — `push_to_ollama` is currently broken because `create_ollama_modelfile()`'s signature changed (no longer accepts `gguf_location`). The PR forwards the new required args.

## New Model & Hardware Support

- **AMD Strix Halo (gfx1150 / gfx1151)** — Vulkan llama.cpp prebuilt is now selected over ROCm; existing ROCm installs are offered the swap via the update banner ([PR #10381](https://github.com/unslothai/unsloth/pull/10381)).
- **DGX Spark two-node serving** — Stacked on the DGX Spark branch, adds a topology-aware orchestrator (`spark_cluster.recommend_topology`) with an async replica router so both Sparks work whenever the workload allows ([PR #10323](https://github.com/unslothai/unsloth/pull/10323)).
- **torch 2.11 compatibility** — `install.sh` CUDA branch `TORCH_CONSTRAINT` is being raised to allow torch 2.11 with a per-minor torchcodec pin ([PR #7474](https://github.com/unslothai/unsloth/pull/7474), split out validator rewrite in [PR #10376](https://github.com/unslothai/unsloth/pull/10376)).
- **Steam Deck / Linux CPU torch 2.11 + gfx1033 gate + Vulkan for AMD** — Six installer bugs split out from #8343 ([PR #8412](https://github.com/unslothai/unsloth/pull/8412)).
- **aarch64 container image request** — Community-requested; issue closed without a shipped image ([Issue #4198](https://github.com/unslothai/unsloth/issues/4198)).

## Performance & Optimization

- **Kaggle CI runner time** — Dispatch-and-collect replaces holding a runner for the kernel poll. Measured on the confirmed two-account path: T4 smoke runner held **41.5 min** with only **~4 min** of useful build/push time ([PR #10183](https://github.com/unslothai/unsloth/pull/10183)).
- **GGUF → Hub export** — Stopped running the merge → convert → quantize sequence twice. First run no longer writes to the save folder only to be re-converted into the system temp folder inside `push_to_hub_gguf` ([PR #10317](https://github.com/unslothai/unsloth/pull/10317)).
- **Studio UI responsiveness** — Sidebar, chat-row and project menus were locking the whole page; fixed to open without freezing the page, keeping scroll and screen-reader behavior intact ([PR #10262](https://github.com/unslothai/unsloth/pull/10262)).
- **Inference response drops** — Cancelled generations whose mailbox is gone will no longer leak late responses into a subsequent request ([PR #10388](https://github.com/unslothai/unsloth/pull/10388)).

## Stability & Regressions

All issues listed below were updated within the last 24h and are now **CLOSED**; severity is the operator-facing impact, not the issue triage label.

| Severity | Issue | Title | Notes |
|---|---|---|---|
| High | [#4137](https://github.com/unslothai/unsloth/issues/4137) | `Pointer argument (at 4) cannot be accessed from Triton (cpu tensor?)` when training Qwen3-235B-A22B with `device_map="balanced"` | Closed; review whether the fix changed `device_map` interaction with 4-bit loading. |
| High | [#3996](https://github.com/unslothai/unsloth/issues/3996) | Gemma3 fine-tuning: `ConstantVariable(str: 'Missing required positional argument: x')` | Closed. |
| High | [#3553](https://github.com/unslothai/unsloth/issues/3553) | `No GPU detected` when following DGX Spark manual | Closed; relevant to today's DGX Spark serving work. |
| High | [#4160](https://github.com/unslothai/unsloth/issues/4160) | Qwen3.5 packing → NaN grad norm at step 1 | Closed; instruct and non-base variants unaffected per reporter. |
| High | [#3729](https://github.com/unslothai/unsloth/issues/3729) | `GptOssTopKRouter` has no `weight` attribute | Closed; surfaced inside the unsloth Docker image. |
| Medium | [#6022](https://github.com/unslothai/unsloth/issues/6022) | `gemma-4-12b-it-GGUF UD-Q4_K_XL` fails to load (`llama-server failed to start`) on RTX 5070 Ti 16 GB | Closed. |
| Medium | [#3124](https://github.com/unslothai/unsloth/issues/3124) | `gpt-oss-20b` GGUF fails: `invalid tensor type` across quantizations | Closed. |
| Medium | [#3670](https://github.com/unslothai/unsloth/issues/3670) | Cannot load local DeepSeek-OCR via `FastVisionModel` | Closed. |
| Medium | [#2230](https://github.com/unslothai/unsloth/issues/2230) | `BackendCompilerFailed: backend='inductor'` (`PY_SSIZE_T_CLEAN` macro) on VLM training notebook | Closed; affected Py 3.10–3.12 + CUDA 12.6 / Ubuntu 24.04. |
| Medium | [#5008](https://github.com/unslothai/unsloth/issues/5008) | Windows installer (`install.ps1` → `unsloth studio setup`) fails on CPU-only machines, with and without `--no-torch` | Closed; chat-only/GGUF mode was non-functional on Windows CPU. |
| Medium | [#9482](https://github.com/unslothai/unsloth/issues/9482) | Latest update fails to load model on 16 GB integrated GPU without setting `UNSLOTH_ALLOW_HOST_OFFLOAD=1` | Closed. |
| Medium | [#9986](https://github.com/unslothai/unsloth/issues/9986) | Studio Ollama integration: wrong `source`, schema crash, models withheld from inventory | Closed. |
| Medium | [#3854](https://github.com/unslothai/unsloth/issues/3854) | Nemotron 3 Nano LoRA merge fails | Closed. |
| Low | [#4396](https://github.com/unslothai/unsloth/issues/4396) | Docker install docs had wrong volume flags | Docs-only; closed. |
| Low | [#3762](https://github.com/unslothai/unsloth/issues/3762) | "Does unsloth have llama-cpp-python support?" | Closed. |
| Low | [#1616](https://github.com/unslothai/unsloth/issues/1616) | `ModuleNotFoundError: No module named 'torch'` despite torch being installed | Closed. |
| Low | [#2503](https://github.com/unslothai/unsloth/issues/2503) | Llama-3.1-8B unsupported in `2024.09.post2`, cannot upgrade | Closed. |
| Low | [#2124](https://github.com/unslothai/unsloth/issues/2124) | How to generate different outputs from same model (temperature/top_k not affecting output) | Closed. |
| Low | [#1578](https://github.com/unslothai/unsloth/issues/1578) | Continual pretraining: unexpected trainable parameters on small (1–2B) PEFT models | Closed. |
| Low | [#2261](https://github.com/unslothai/unsloth/issues/2261) | Inference with Mistral Small 3.1 | Closed. |
| Low | [#1941](https://github.com/unslothai/unsloth/issues/1941) | Trying to run GKD with Unsloth | Closed. |
| Low | [#1210](https://github.com/unslothai/unsloth/issues/1210) | Continued pretraining notebook broken with `unsloth/Llama-3.2-1B-bnb-4bit` | Closed. |
| Low | [#2707](https://github.com/unslothai/unsloth/issues/2707) | Diffusion model fine-tuning feature request (HF diffusers) | Closed without shipping. |
| Low | [#2395](https://github.com/unslothai/unsloth/issues/2395) | 3-day Windows 10 / WSL install struggle report | Marked inactive; closed. |
| Low | [#725](https://github.com/unslothai/unsloth/issues/725) | Does Unsloth support `rloo_trainer` from TRL? | Closed. |
| Low | [#7472](https://github.com/unslothai/unsloth/issues/7472) | Compaction / rolling context window feature request | Closed without shipping. |
| Low | [#876](https://github.com/unslothai/unsloth/issues/876) | Flux (diffusion transformer) feature request | Closed. |
| Low | [#4963](https://github.com/unslothai/unsloth/issues/4963) | Unsloth Studio Native Edition (Electron/Tauri llama.cpp wrapper) | Closed without shipping. |
| Low | [#3771](https://github.com/unslothai/unsloth/issues/3771) | GRPO VRAM: FP8 vs 4-bit on RTX 4090 with Qwen3-4B-Instruct-2507 | Closed; guidance discussion only. |

Open follow-ups still in flight on related axes:
- **PR #10315** — `/v1/embeddings` will serve from the Studio-configured embedding model instead of the chat slot (which currently returns 503 / 501).
- **PR #10314** — `/v1/messages` will return an explicit error when tools are sent to a GGUF whose chat template has no tool support, instead of silently dropping them (Claude Code / Anthropic SDK target).
- **PR #10383** — Four load/update messages that misdirected users (e.g., blaming the model when the build was at fault) corrected with log evidence.
- **PR #10375** — Per-account isolation for shared Studio installs (multi-user on one machine or one GPU box) using one-time setup codes.

## What This Means for Application Developers

- **DGX Spark owners:** the two-node orchestrator ([PR #10323](https://github.com/unslothai/unsloth/pull/10323)) plus closed [#3553](https://github.com/unslothai/unsloth/issues/3553) means Studio should now reliably detect both GPUs and route GGUF serving across them. Expect a small experimental flag to be required while the orchestrator is still in review.
- **AMD / Strix Halo:** if you're on gfx1150/1151, plan to switch to the Vulkan prebuilt on next update ([PR #10381](https://github.com/unslothai/unsloth/pull/10381)). ROCm users on other silicon are unaffected; existing ROCm installs get an in-app offer to swap.
- **OpenAI-compatible clients integrating with Studio:** prepare for `/v1/chat/completions` to optionally multiplex Unsloth UI control frames only when you send `X-Unsloth-Events` ([PR #10362](https://github.com/unslothai/unsloth/pull/10362)). If you use Claude Code or the Anthropic SDK against Studio, you'll soon get a proper error when the loaded model has no tool support instead of a silently dropped `tools` array ([PR #10314](https://github.com/unslothai/unsloth/pull/10314)).
- **Embedding workloads:** once #10315 lands, point `/v1/embeddings` at the embedding model configured in Settings rather than the chat model; today the chat slot returns 501/503 on most GGUFs.
- **Ollama export pipelines:** if you call `push_to_ollama` against current `main`, it will raise `TypeError: create_ollama_modelfile() got an unexpected keyword argument 'gguf_location'` until [#10304](https://github.com/unslothai/unsloth/pull/10304) merges.
- **Studio security posture:** stop relying on the seeded admin password being embedded in the served page. After #10387 / #7140 land, expect a one-time setup token instead.
- **Voice:** the reconstructed conversation-loop half of #6527 ([PR #10373](https://github.com/unslothai/unsloth/pull/10373)) plus its latency-benchmark sibling ([PR #10374](https://github.com/unslothai/unsloth/pull/10374)) suggest voice mode is moving toward a mergeable state; until then don't ship against it.
- **Long-tail stability

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — Daily Digest
**Date:** 2026-09-06
**Repository:** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. Today's Highlights

Today's activity is dominated by reliability concerns rather than feature work. A new issue documents a **hardcoded 5s config-acceptance timeout** that causes the managed core gateway (port 3456) to fail on boot under moderate host load, while a separate report surfaces a **502 Bad Gateway from the codex `/v1/responses` route**. On the feature side, a new provider preset for **Kunavo** was proposed, extending CCR's multi-protocol routing coverage to a single-endpoint gateway serving Claude, Gemini, and GPT.

---

## 2. Releases & Breaking Changes

*No new releases in the last 24 hours.*

---

## 3. New Model & Hardware Support

No new model architectures, backends, or quantization formats were merged or proposed today.

The only provider-side addition is [**PR #1760**](https://github.com/musistudio/claude-code-router/pull/1760) — *"feat(providers): add Kunavo provider preset"*, which registers **Kunavo** as an OpenAI-compatible upstream exposing Claude, Gemini, and GPT families behind a single API key on a pay-as-you-go basis. Once merged, this effectively gives CCR a unified multi-vendor endpoint without separate config entries per protocol.

---

## 4. Performance & Optimization

No merged or proposed performance changes today. However, issue [#1761](https://github.com/musistudio/claude-code-router/issues/1761) implicitly touches performance: the 5s timeout currently conflates *event-loop responsiveness* with *gateway readiness*, meaning the configured budget is sensitive to ambient load rather than to actual startup cost. Any fix will likely need a measurable readiness signal (port probe, IPC handshake, health endpoint) to decouple perceived latency from real readiness.

---

## 5. Stability & Regressions

Ranked by severity:

1. **[HIGH — Startup/availability]** — [Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761): *"Gateway fails to start under load: 5s hardcoded config-acceptance timeout measures parent event-loop congestion, not child readiness"*
   The web/management server (3458) starts, but the managed core gateway (3456) reliably fails to come up on every restart/boot on moderately loaded hosts with log: `Failed to start gateway during web startup: Core gateway did not accept runtime config within 5000ms.`
   This is a hard regression vector for any production deployment on shared/cloud hosts. **No fix PR is open yet** — this is a candidate for a fast-tracked patch.

2. **[MEDIUM — Routing failure, no retry semantics confirmed]** — [Issue #1762](https://github.com/musistudio/claude-code-router/issues/1762): *"codex: unexpected status 502 Bad Gateway: Unknown error, url: http://127.0.0.1:3456/v1/responses"*
   Codex CLI calls hitting the local `/v1/responses` endpoint return a 502 with the generic `Unknown error` body, making root-cause triage difficult from the client side. The error originates from CCR (127.0.0.1:3456), suggesting either upstream connectivity issues to the codex-compatible provider or an internal CCR error not being surfaced. **No fix PR is open yet.**

---

## 6. What This Means for Application Developers

- **Don't rely on the managed gateway (port 3456) starting on the first attempt** on busy hosts. If you're scripting CCR into a devcontainer, systemd unit, or boot sequence, add an external readiness probe against `/v1/models` or your configured health route rather than trusting the embedded 5s wait. Issue [#1761](https://github.com/musistudio/claude-code-router/issues/1761) is worth tracking and pinning against if you depend on auto-start.
- **Treat `/v1/responses` 502s as opaque for now.** Issue [#1762](https://github.com/musistudio/claude-code-router/issues/1762) shows that CCR currently surfaces upstream failures with a non-actionable `Unknown error`. Add your own upstream health-check and request logging on the calling side until CCR improves error passthrough.
- **Kunavo support is incoming.** If you're consolidating multi-vendor LLM access behind a single paid key, watch [PR #1760](https://github.com/musistudio/claude-code-router/pull/1760) — it will let you route Claude/Gemini/GPT traffic through one OpenAI-compatible preset without per-provider configuration blocks.
- **Production hardening guidance for CCR deployments:** run the managed gateway on a host with reserved CPU, or move to a process supervisor that retries child readiness independently of the parent's event-loop tick rate.

---

*Digest generated from GitHub public activity. No code or configuration recommendations constitute a commitment; validate against the upstream repository before applying changes.*

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-06

## 1. Today's Highlights

CC Switch saw an active day centered on **Codex proxy translation correctness** and **cross-provider routing**: a high-comment thread (#1198) on startup-time `settings.json` overwriting was closed, while multiple new bugs surfaced around Codex Responses↔Chat Completions bridging (tool_call_id length, empty `thinking` blocks, split assistant messages). On the feature side, GitHub Copilot support for Codex landed in #7157 and a new "cross-provider subagent routing in takeover mode" was proposed in #7165, enabling flagship-model planners with cheap-model subagents.

## 2. Releases & Breaking Changes

- **No new releases in the last 24h.** Latest shipping version referenced in current bugs/PRs remains **v3.20.1**.
- **PR #6887** (open): Changes Codex live-write semantics — unmanaged `[model_providers.*]` sections in `~/.codex/config.toml` will be preserved instead of stripped. Will require users on heavily customized Codex configs to verify post-merge.
  https://github.com/farion1231/cc-switch/pull/6887
- **PR #7153** (closed/merged): Tray left-click behavior change — in normal mode, left click now directly restores/focuses the main window; lightweight mode unchanged.
  https://github.com/farion1231/cc-switch/pull/7153
- **PR #5882** (closed): Takeover mode now exposes `claude-opus-5` instead of the retired `claude-opus-4-8` alias.
  https://github.com/farion1231/cc-switch/pull/5882
- **PR #7120** (open): Adds `proxy_restore_on_startup` setting (default off) — opt-in Clash-style auto-restore behavior.
  https://github.com/farion1231/cc-switch/pull/7120

## 3. New Model & Hardware Support

- **Codex: GitHub Copilot** — first-class provider added with capability-driven Responses/Chat routing (#7157). Codex client always hits local Responses entrypoint; CC Switch selects upstream format from `supported_endpoints`.
  https://github.com/farion1231/cc-switch/pull/7157
- **Native OMP ("oh-my-pi") support** — full first-class support: provider management, session browsing, usage tracking, config sync (#7152).
  https://github.com/farion1231/cc-switch/pull/7152
- **Grok account profiles** with retained credentials and improved usage tracking (#6792).
  https://github.com/farion1231/cc-switch/pull/6792
- **Tencent Pi presets** — 8 new presets covering TokenHub pay-as-you-go and Token Plan subscription lines (#7159).
  https://github.com/farion1231/cc-switch/pull/7159
- **New built-in pricing rows** added to `seed_model_pricing`:
  - GPT-6 Astra — $10/M in, $50/M out, $1/M cache read, $12.5/M cache write (#7162)
  - Gemini 3.8 Flash — $0.75/M in, $3.75/M out, $0.075/M cache read (#7164)
  - GLM-5.3 Flash — $0.15/M in, $0.50/M out, $0.03/M cache read (#7163)
- **Vendor catalog fix**: vision-capable models not in the official DeepSeek catalog (e.g. `deepseek-v4-flash-vision-exp`) now correctly resolve `input_modalities` instead of inheriting text-only fallback (#6750).
  https://github.com/farion1231/cc-switch/pull/6750

## 4. Performance & Optimization

- **Cross-provider subagent routing in takeover mode** (#7165) — designed for cost optimization: keep main conversation on flagship provider A while delegating Task/subagent work to cheap provider B. The current proxy takeover only routes the top-level session; this extends routing into subagent calls.
  https://github.com/farion1231/cc-switch/pull/7165
- **Gemini Native proxy fixes** (#7143) — three classes of long-standing multi-turn/tool-use bugs fixed for Gemini 2.5/3.x when bridged via Claude Code/Desktop and Codex: Claude-side Part-level `thoughtSignature` handling, Codex `thought_signature` backfill, and provider-form unlock. Supersedes #5298.
  https://github.com/farion1231/cc-switch/pull/7143
- **Claude Code steer rectifier** (#7167) — opt-in (default off) translator that converts matching steer messages from `system` to `user` role on Chat Completions routes, preserving content/position.
  https://github.com/farion1231/cc-switch/pull/7167
- **Lightweight mode startup optimization** (#7158) — `lightweight_mode` preference now persisted and used to auto-enter lightweight mode on launch/close, avoiding full window reconstruction when users want a tray-only session.
  https://github.com/farion1231/cc-switch/pull/7158

## 5. Stability & Regressions

**High severity (config loss / data integrity):**

- **#1198 [CLOSED]** — On macOS, CC Switch v3.10.x immediately overwrites `~/.claude/settings.json` on startup, dropping user `hooks`, `permissions`, `contextFiles`, etc. and replacing with a "takeover/proxy" stub. 16 comments, 9 👍. *Closed today but worth auditing whether a fix landed or only a workaround was documented.*
  https://github.com/farion1231/cc-switch/issues/1198
- **#6887 (PR, open)** addresses the related Codex-side version of the same class of bug (#6860): unmanaged `[model_providers.*]` sections in `config.toml` were being stripped on live write.
  https://github.com/farion1231/cc-switch/pull/6887

**High severity (Codex Responses↔Chat translation):**

- **#7156** — v3.20.1: `tool_call_id` length insufficient on DeepSeek Chat upstream (HTTP 400) when sub-agent triggers tool calls. Single-turn OK; retry ineffective.
  https://github.com/farion1231/cc-switch/issues/7156
- **#6260** — Local proxy writes "empty thinking" blocks from streaming into Codex session history; next request fails with upstream 400 "thinking 长度不足".
  https://github.com/farion1231/cc-switch/issues/6260
- **#6697** — Codex image-only tool output is silently dropped on vision-less upstreams → orphaned `tool_calls` → permanent 400.
  https://github.com/farion1231/cc-switch/issues/6697
- **#6529** — Codex Responses→Chat translator splits commentary + tool calls into consecutive `assistant` messages, breaking downstream chat-model semantics.
  https://github.com/farion1231/cc-switch/issues/6529
- **#6473** — Anthropic→Codex Responses bridge does not preserve optional tool-argument semantics (related to #6394, #5774).
  https://github.com/farion1231/cc-switch/issues/6473
- **#4973** — v3.16.5 regression: `invalid tool_call_id` (HTTP 400) routing Codex→SenseNova on `deepseek-v4-flash`; v3.16.4 was fine.
  https://github.com/farion1231/cc-switch/issues/4973
- **#5001** — Codex `/responses` tool-call argument client-side parse failures don't surface real root cause in CC Switch error reporting.
  https://github.com/farion1231/cc-switch/issues/5001
- **#5087** — SenseNova `reasoning_content` streaming returns empty `finish_reason`, causing Claude Desktop assistant message to vanish.
  https://github.com/farion1231/cc-switch/issues/5087

**High severity (crash / platform):**

- **#5609** — Linux Wayland: app crash at startup with `EGL_BAD_PARAMETER` (12 comments). No fix PR visible.
  https://github.com/farion1231/cc-switch/issues/5609

**Medium severity (usage / monitoring):**

- **#7084** — Codex usage sync: paginated parent rollout + forked child subagent is permanently stuck as "parent rollout not yet written to child fork time" → GPT-5.6-Sol usage fully lost on v3.20.1/macOS.
  https://github.com/farion1231/cc-switch/issues/7084
- **#7137** — Usage dashboard cannot record GPT-5-Astra usage; row mislabeled as "SOL" (#7133 is the closed English-language variant for GPT-6 Astra cost calc).
  https://github.com/farion1231/cc-switch/issues/7137
- **#4752** — Codex → upstream frequently throws `429 Too Many Requests` ("exceeded retry limit"). Provider-side rate-limit handling needs review.
  https://github.com/farion1231/cc-switch/issues/4752

**Auth / config:**

- **#4925** — OpenCode Go `glm-5.2` via Claude Desktop returns 401 "Missing API key"; `chat/completions` auth field is being written as `ANTHROPIC_API_KEY` instead of provider key.
  https://github.com/farion1231/cc-switch/issues/4925

## 6. What This Means for Application Developers

- **Treat the proxy as a moving target.** The Codex Responses↔Chat Completions bridge has at least six open bugs around tool-call ID shape, empty thinking blocks, dropped image tool output, and split assistant turns. If you route subagents or tool-heavy flows through CC Switch, pin a known-good version (e.g. v3.16.4 if avoiding #4973) and instrument upstream 4xx errors — many currently mask their true cause.
- **Config preservation is the dominant risk.** Two independent reports (#1198 for Claude, #6860/#6887 for Codex) describe CC Switch destroying user-managed sections of the underlying client config on every write. If you rely on custom hooks, permissions, or extra `[model_providers]`, watch #6887's merge and validate your `config.toml`/`settings.json` after any v3.20.x → v3.21+ upgrade.
- **New provider surface area is expanding fast.** GitHub Copilot (#7157), OMP/oh-my-pi (#7152), Grok with account profiles (#6792), and Tencent Pi presets (#7159) are now first-class. If you build on top of any of these via CC Switch's local proxy, expect capability-driven routing (`supported_endpoints`) rather than fixed protocol mapping — design your client to be explicit about which Responses/Chat entrypoint it hits.
- **Cost-optimized agent architectures are gaining traction.** #7165 explicitly enables a "flagship planner + cheap subagent" pattern. If you ship agentic apps, this is a strong signal that mixed-model delegation will become a standard CC Switch workflow — plan provider abstraction accordingly.
- **Pricing data is becoming authoritative.** New rows for GPT-6 Astra, Gemini 3.8 Flash, and GLM-5.3 Flash ship directly in `seed_model_pricing` with regression tests. The earlier GLM-5.3 row (#6591) closed with the same author writing the Flash variant the next day — expect this catalog to refresh aggressively; don't hardcode price lists client-side.
- **Linux Wayland users remain blocked.** No fix for #5609 yet — if you target Linux desktop, recommend X11 or remote-desktop workflows for now.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-06

## Today's Highlights
- **v1.0.0-rc.34 ships** with a major account-security overhaul: unified login/sensitive-op verification, TOTP + Passkey as mutual backup factors, system access tokens with view/rotate/revoke + audit trail, and migration of Telegram login to OAuth.
- **GPT-6 Astra relay support landed** via capability-aware model-specific chat parameter handling ([#7211](https://github.com/QuantumNous/new-api/pull/7211)), alongside a fix that restores the originally requested model name in responses when channel `model_mapping` is in effect ([#6975](https://github.com/QuantumNous/new-api/pull/6975)).
- **Routing/cache correctness work** continues: the channel cache is now aligned with ability status semantics ([#6997](https://github.com/QuantumNous/new-api/pull/6997)), and a Responses-to-Chat relay fix preserves multimodal tool outputs ([#7227](https://github.com/QuantumNous/new-api/pull/7227)).

## Releases & Breaking Changes
- **[v1.0.0-rc.34](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.34)** — Account Security milestone:
  - Single verification flow for login and sensitive operations; TOTP and Passkey act as mutual backup factors.
  - System access tokens: list, rotate, revoke, and access logs.
  - Independent audit log surface.
  - One-time scoped proof required for: account deletion, bindings, password change, Passkey/2FA enrollment, and channel key viewing — bound to the originating session.
  - **Migration note (Telegram login):** Telegram auth moved to unified OAuth. Admins must register `/oauth/telegram` in the BotFather Login Widget and populate `Client ID` / `Client Secret`. Existing Telegram-only flows will stop working until reconfigured.

## New Model & Hardware Support
- **GPT-6 Astra** — explicit support added in relaykit with dedicated capability descriptors for `max_tokens` (`max_completion_tokens`), `developer` role, and sampling parameters ([#7211](https://github.com/QuantumNous/new-api/pull/7211)). The PR explicitly lists GPT-6 Astra and dated snapshots rather than over-generalizing via GPT-5 prefix matching.
- No new hardware backends or quantization formats reported in this window.

## Performance & Optimization
- **[#7221](https://github.com/QuantumNous/new-api/pull/7221)** — `perf(common): batched RawMessage copy`, optimizing deep-copy on Responses requests (follow-up to commit `3f4cca31`; finalized in `2f3c5e0a`).
- **[#7161](https://github.com/QuantumNous/new-api/pull/7161)** — Adds a switch for active channel probing with refined throttling behavior to reduce health-check overhead on large channel fleets (in review).

## Stability & Regressions
Ranked by impact; fix PRs noted where present.

1. **[#7215](https://github.com/QuantumNous/new-api/issues/7215) — `reasoning_effort` not mapped from Anthropic → OpenAI upstream (CLOSED).** Affects v1.0.0-rc.30 callers using Anthropic-format requests that should be relayed to OpenAI-compatible upstreams. No fix PR linked in the snapshot — verify rc.34 behavior before relying on the mapping.
2. **[#7220](https://github.com/QuantumNous/new-api/issues/7220) — Gemini 3.8 Flash model variant changed during relay on rc.31 → rc.33 (CLOSED, duplicate).** Upgrade-path regression; worth a smoke test if you pinned Gemini 3.8 Flash.
3. **[#7222](https://github.com/QuantumNous/new-api/issues/7222) — Model square card view: switching group jumps to last page and "previous" is broken (OPEN).** Fix proposed in [#7223](https://github.com/QuantumNous/new-api/pull/7223) — `fix(pricing): reset card grid page when filtered models change`. UX-only, low severity.
4. **[#7225](https://github.com/QuantumNous/new-api/issues/7225) — `settleTestQuota` missing group multiplier (CLOSED, invalid).** No action; flagged against rc32.
5. **[#7224](https://github.com/QuantumNous/new-api/issues/7224) — `ParseContent()` drops `cache_control` (CLOSED, invalid).** No action; if you rely on prompt-cache hint propagation, validate on rc.34.
6. **[#7217](https://github.com/QuantumNous/new-api/new-api/issues/7217) — Enhancement: `thinking_model_blacklist` UI toggle or per-channel effort-suffix stripping (CLOSED).** No code change; tracks operator demand for finer-grained thinking-effort control.

## What This Means for Application Developers
- **Plan an rc.34 cutover window.** The security additions are additive, but Telegram login is a hard breaking change — reconfigure the BotFather Login Widget and credentials before flipping traffic, or you will lock out Telegram-authenticated users.
- **Re-validate cross-format relays.** If your stack sends Anthropic-format requests through channels backed by OpenAI-compatible upstreams, re-test `reasoning_effort` propagation on rc.34 — issue #7215 was a real bug at rc.30 and the fix path isn't visible in this snapshot.
- **Use `model_mapping` with confidence again.** PR #6975 closes a long-standing observability gap where the response `model` field diverged from the requested model after channel mapping — clients keying off `response.model` for routing/billing will now see the originally requested name. Worth re-checking any dedup or cost-attribution logic built on the prior behavior.
- **GPT-6 Astra clients should pin rc.34+** to get correct `max_completion_tokens`, `developer` role, and sampling defaults rather than falling back to GPT-5-era heuristics.
- **Prompt caching hints** (`cache_control`) on Anthropic-format traffic are worth a quick verification on rc.34 given issue #7224 was filed; even though closed as invalid, explicit assertion in your tests is cheap insurance.
- **Operational UX:** the model-square pagination fix (#7223) is open — if your console users hit this daily, consider pinning to a build that includes it or holding deploys until it merges.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*