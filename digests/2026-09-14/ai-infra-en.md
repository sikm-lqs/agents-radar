# AI Infrastructure Digest 2026-09-14

> Generated: 2026-09-13 23:30 UTC | Projects covered: 9

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

# Cross-Project Infrastructure Report — 2026-09-14

## 1. Ecosystem Overview

Today's activity is dominated by a single forcing function: **DeepSeek-V4.1 bring-up**, whose hybrid attention (MLA + Mamba/GDN), sparse MoE, and MTP speculative decoding are forcing every serving engine to rework KV-cache and spec-decode internals — vLLM merged SWA-bounded replay and PCP+DCP plumbing while SGLang landed a six-PR unified memory-pool refactor. The local-runtime layer moved fastest on release cadence (llama.cpp shipped nine point releases), while the gateway layer (LiteLLM, New API, CC Switch) is increasingly consumed by **agent-protocol correctness** — Responses-API bridging, MCP tool handling, and tool-call schema fidelity — rather than raw throughput. Hardware diversification continues unevenly: Blackwell sm100, Intel Arc, ROCm MI355X/RDNA4, and NPUs all saw activity, but several platforms carry open correctness defects. Supply-chain hardening (cosign-signed images, SSRF fixes) signals the ecosystem's shift toward production-grade operational posture.

## 2. Activity Comparison

| Project | Layer | Issues (cited) | PRs (cited) | Release status |
|---|---|---|---|---|
| **vLLM** | Serving engine | ~15 | ~12 | None in 24h (0.29.0 current) |
| **SGLang** | Serving engine | ~17 | ~19 | None; DeepSeek V4.1 on branch |
| **llama.cpp** | Local runtime core | ~12 | ~24 | **9 releases** (b10934–b10948) |
| **Ollama** | Local runtime / cloud | ~14 | ~4 | None |
| **LiteLLM** | Gateway/proxy | ~20 | ~13 | **v1.102.0-rc.1** (cosign-signed) |
| **Unsloth** | Fine-tuning | 21 (stated) | 170+ in flight (~15 cited) | None; breaking kwarg change documented |
| **Claude Code Router** | Client-side router | 0 | 1 | None |
| **CC Switch** | Client-side router | ~18 | ~19 | None; tracking v3.20.x |
| **New API** | Gateway/relay | ~10 | ~12 | None; rc.37 regression open |

*Counts reflect items surfaced in today's digests, not total repo volume. llama.cpp and LiteLLM are the only projects that shipped; Unsloth has the largest in-flight PR backlog.*

## 3. Model Support Race

| Model / arch | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek V4.1 / Flash** | Deepest: SWA bounded replay (#56227), sparse indexer, MTP under PCP+DCP | Native registration PR #38798 (pre-release, 2 open bugs) | Conversion PR #28696 | — | — |
| **Kimi-K3** | — | — | Conversion (#26185, hybrid KDA+MLA) | Cloud (HTTP 500 bug #18426) | — |
| **GLM-5.3-Flash** | Debugging degeneration (#56605) | **AMD Day-0** gfx950/AITER track | — | Cloud works | — |
| **Qwen3.5 (hybrid GDN)** | Long-context perf bugs (#54691) | Prior issue closed | — | — | LoRA training on B200 |
| **Qwen3-Coder** | — | — | Schema parsing + cache fix | Cloud schema bug + local int64 fix | — |
| **Gemma-4** | MTP + tool-parser fixes | — | SWA/thinking-mode bugs | E4B multimodal OOM | — |

**Verdict:** vLLM leads datacenter frontier bring-up (only engine combining DeepSeek V4.1 with disaggregation + MTP); llama.cpp leads on breadth and time-to-local (Kimi-K3, elmod-2.7b, MiMo V2, nemotron-h); SGLang differentiates on **AMD day-0** and non-OpenAI-ecosystem models (SenseNova, OLMo3). Notably, no engine has DeepSeek V4.1 fully production-ready — every layer carries open bugs against it.

## 4. Performance Frontier

- **KV cache & memory pools** (heaviest concentration): SGLang's page-envelope stack (#38592→#36729) unifying H2D/D2H, PD transfer, spec decode, and hybrid SWA; vLLM's SWA-bounded replay and filesystem-offload integrity RFC (#54363); llama.cpp HiCache scale fixes. Driver: hybrid-attention models break page-level KV assumptions.
- **Speculative decoding as default**: vLLM persistent top-k + TP-aware ngram; llama.cpp draft-cap safety (#26575); SGLang spec-decode memory translation. The open frontier is spec-decode × prefix-caching interaction (vLLM #47930 acceptance collapse, #54691 drafter KV re-scan).
- **MoE & memory tiering**: llama.cpp's SSD expert-streaming (#25294) — 100B+ MoE beyond RAM — is the day's most consequential infra change; vLLM sparse-indexer buffer sizing and UMMA M-tile routing.
- **Kernels & graph capture**: SYCL CUDA-graph parity (#28725), grammar-engine 1.2–1.3× (#26885), MMVQ nwarps restore, ROCm gather-grid fixes.
- **Gateway overhead**: LiteLLM's Rust migration (sub-1ms target), CC Switch's npm dist-tags probe (tens-of-MB savings/request), New API allocation reduction, SGLang router load-balancing with vLLM-metric parity.

## 5. Layer Positioning

- **Datacenter engines (vLLM vs SGLang)**: direct feature-parity race — PD disaggregation, DP attention, spec decode, DeepSeek support. vLLM differentiates on distributed breadth (PCP+DCP, 2-node TP); SGLang on router maturity and unified memory architecture.
- **Local runtime**: llama.cpp is the substrate — Ollama and Unsloth's GGUF path both sit atop it (Ollama still carries the unresolved MIT-notice issue, #3185). Ollama's bug profile is now protocol/schema-level (cloud routing, Anthropic-compat caching), not kernels — it behaves like a distribution + cloud broker.
- **Gateways**: LiteLLM = enterprise proxy (budgets, guardrails, OTel, Rust rewrite); New API = multi-provider relay/billing, now reaching *down* the stack with a native vLLM channel (#7332); CC Switch and Claude Code Router = client-side coding-agent routers, where the hard problem is Codex/Claude session-format compatibility, not latency.
- **Training**: Unsloth alone, but blurring — Studio's multi-GGUF residency and OpenAI-compatible serving make it a mini serving stack. Layers are vertically converging in both directions.

## 6. Trend Signals

1. **Hybrid attention is the new normal** — MLA+Mamba/KDA models are forcing KV-cache subsystem rewrites everywhere. Watch prefix-caching correctness with SWA/Mamba branches (SGLang #38815, vLLM #54094).
2. **Spec decode × prefix caching is the #1 open correctness/perf frontier** — acceptance collapse and KV re-scan bugs span vLLM and llama.cpp.
3. **Agent protocols now generate more gateway defects than throughput work** — Responses↔Chat↔Anthropic bridging (call_id poisoning, reasoning-block rejection) is fragile across LiteLLM, CC Switch, and New API; MCP payload handling is buggy at every layer (llama.cpp deadlock >1–5 KB, Unsloth truncation, LiteLLM guardrail bypass). Cap tool-argument sizes client-side.
4. **Cache economics are silent cost leaks** — Ollama's cache-defeating message hoisting (#18431) and random-order schema re-rendering (#18430), plus LiteLLM's stale cache-write token accounting (#40736), hit bills directly.
5. **Hardware long tail is unevenly mature** — Blackwell sm100 CUDA-graph correctness, Intel Arc silent corruption, RDNA4 quantized-KV regressions. Heterogeneous fleets need per-platform equivalence tests, not just benchmarks.
6. **Pin guidance today**: vLLM 0.28.x if you need OTel traces; avoid sgl-router v0.2.4 PD mode; New API rc.36 (rc.37 has a 75 MB→1.8 GB memory regression); llama.cpp ≥ b10934 for schema-driven tooling; hold Ollama Cloud for structured output.
7. **What's next**: DeepSeek V4.1 GA across engines within weeks; LiteLLM's Rust gateway beta; MoE SSD-streaming as the template for memory-hierarchy extension beyond GPU/host RAM.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-14

## 1. Today's Highlights

The day's traffic is dominated by **speculative-decoding plumbing for DeepSeek-V4 / V4.1-Flash**: a stack of new PRs extends PCP+DCP+Mamba/MLA support, fixes KV-cache replay bugs on hybrid GDN models, and tightens ROCm indexer/prefill kernels. Alongside that, several correctness bugs surfaced on Blackwell sm100 and Intel Arc Pro B70 that warrant attention before upgrading production stacks, and a new RFC lays out integrity guarantees for the filesystem KV-offload tier.

## 2. Releases & Breaking Changes

No new releases in the last 24h. No public API or config-deprecation notices in the active issue/PR set.

## 3. New Model & Hardware Support

- **DeepSeek-V4.1-Flash, SWA-bounded replay** — [#56227](https://github.com/vllm-project/vllm/pull/56227) implements encoder-side "SWA bounded replay" so the 128-token sliding-window KV cache per layer opts out of prefix caching and KV connectors. Prerequisite for efficient long-context serving of V4.1.
- **FlashMLASparse + MTP under PCP/DCP > 1** — [#56722](https://github.com/vllm-project/vllm/pull/56722) declares `FlashMLASparse` MTP support at `decode_context_parallel_size > 1` for NIXL prefill/decode disaggregation; [#56723](https://github.com/vllm-project/vllm/pull/56723) fixes DSpark/DFlash `tp_size=1 must be divisible by dcp_size=8` config validation when PCP+DCP are combined.
- **DeepSeek-V4 sparse indexer prefill buffer sizing** — [#51252](https://github.com/vllm-project/vllm/pull/51252) corrects the K-gather workspace to `max_prefill_buffer_size // compress_ratio` rows.
- **ROCm, DeepSeek-V4.1-Flash perf** — [#56720](https://github.com/vllm-project/vllm/pull/56720) resizes the K-cache gather grid by the gathered length instead of a fixed `(num_reqs, 128)` launch, eliminating per-token dependent loads.

## 4. Performance & Optimization

- **Persistent top-k with sampled filtering** — [#56346](https://github.com/vllm-project/vllm/pull/56346) lands DeepSelect-style coalesced sampling for long FP32 sparse-indexer decode top-k (target: DeepSeek-V4 family).
- **TP-aware Ngram-CPU spec decode** — [#56732](https://github.com/vllm-project/vllm/pull/56732) revives a TP-aware ngram-CPU path so duplicate lookups across ranks are eliminated (supersedes #26056).
- **Humming indexed MoE routing** — [#56731](https://github.com/vllm-project/vllm/pull/56731) keeps gate/up and down projections' M-tile metadata independent on SM100 (UMMA M=128 vs M=64/96).
- **DFlash long-context overhead** — Issue [#54691](https://github.com/vllm-project/vllm/issues/54691) reports DFlash going from 71 → 16 tok/s at 185k context on Qwen3.5 hybrid GDN; the drafter re-scans full accumulated KV each cycle. No public disable hook per sequence length yet.
- **DFlash2 + YaRN zero prefix-cache reuse** — Issue [#54094](https://github.com/vllm-project/vllm/issues/54094) shows target-only path reuses ~1.039M tokens but identical prompt in DFlash2 + YaRN reuses 0. Affects Blackwell RTX PRO 6000.
- **ROCm DeepSeek-V4.1-Flash headroom** — Issue [#56506](https://github.com/vllm-project/vllm/issues/56506) reports only 35.89 tok/s out per request (TP4, MXFP4 + DSpark MTP) on 8× MI355X; concrete numbers for TTFT/ITL/E2EL p50 published.
- **Logprobs kernel mid-request JIT** — [#55918](https://github.com/vllm-project/vllm/pull/55918) fixes `_topk_log_softmax_kernel` recompiling on first sight of a new `num_logprobs` mid-request.
- **OpenAI LM-eval server startup budget** — [#56725](https://github.com/vllm-project/vllm/pull/56725) raises the NVIDIA fallback from 480 s → 600 s; the H200 correctness job has failed twice in one day under the old limit.

## 5. Stability & Regressions

**High severity — likely blocks deployments**

- **OTLP traces endpoint silent failure** — [#56696](https://github.com/vllm-project/vllm/issues/56696): `--otlp-traces-endpoint` initializes the tracer but `instrument_otel/manual_instrument_otel` is never invoked, so no spans are exported. Affects 0.29.0 official image. New, no fix yet.
- **sm100 (B200/B300) CUDA-graph replay breaks greedy outputs** — [#55238](https://github.com/vllm-project/vllm/issues/55238): reproducible on compute capability 10.x with `torch.compile` off in both arms for Gemma-4-26B-A4B-it. Bit-identical on H200/A100/RTX PRO 6000. Scope corrected this week — no fix PR yet.
- **Intel Arc Pro B70 silent output corruption** — [#53480](https://github.com/vllm-project/vllm/issues/53480): W4A16 27B Qwen-family model intermittently emits only "!" (token 0) under sustained concurrent decode. HTTP 200, no error surfaced. Affects XPU/Battlemage. No fix yet.
- **Hybrid GDN/Mamba 2-node TP prefix-cache crash** — [#56646](https://github.com/vllm-project/vllm/issues/56646): `MambaModelConfig.derived mamba_cache_mode` never propagates to remote ranks; assert on engine init with `--enable-prefix-caching`. Closed (likely fixed in tree; verify before pinning).
- **DFlash + automatic prefix caching acceptance collapse** — [#47930](https://github.com/vllm-project/vllm/issues/47930): DFlash/DSpark draft acceptance drops when prefix caching is enabled.

**Medium severity**

- **Batch invariance broken with SP + async TP** — [#56370](https://github.com/vllm-project/vllm/issues/56370): `VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp` produces different outputs across runs on 4× RTX PRO 6000. New.
- **GLM-5.3-Flash repeated-token degeneration in multi-turn agentic use** — [#56605](https://github.com/vllm-project/vllm/issues/56605): model collapses into "word salad" of repeated tokens during tool-call loops. New.
- **Gemma-4 MTP engine init crash** when target is quantized/calibrated-KV but drafter is BF16 — [#56539](https://github.com/vllm-project/vllm/pull/56539) (fix) addresses missing KV-scale parameter validation.
- **CUTLASS 3.x `scaled_mm` ignores leading strides of sliced tensors** — [#55534](https://github.com/vllm-project/vllm/issues/55534): affects H800/PCIe on vLLM 0.28.0 wheel. No fix yet.
- **NVFP4 MoE silent zero init → inf gscale → NaN** — [#45212](https://github.com/vllm-project/vllm/issues/45212): unvalidated zero-init for missing `input_scale` keys.
- **Concurrency defect sweep (Chinese)** — [#56251](https://github.com/vllm-project/vllm/issues/56251): six concurrency defects verified against latest `main` as still open, including paths in `multiproc_executor.py`, `shm_broadcast.py`, `kv_events.py`. Worth scanning.

**Long-standing**

- **Engine start hang** — [#17676](https://github.com/vllm-project/vllm/issues/17676) (since 2025-05, 10 👍): `waiting engine process to start` never returns. No fix yet.
- **Gemma-4 tool-calling parser misses bare `call:` transitions** — [#54257](https://github.com/vllm-project/vllm/pull/54257) fixes this for reasoning-mode Gemma-4.

## 6. What This Means for Application Developers

- **Hold off on `0.29.0` for production observability**: the OTLP `--otlp-traces-endpoint` flag is a no-op until [#56696](https://github.com/vllm-project/vllm/issues/56696) is fixed; if you rely on distributed tracing for SLO dashboards, pin to `0.28.x` or apply a local patch.
- **DeepSeek-V4 / V4.1 deployments on Blackwell need scrutiny**: the sm100 CUDA-graph regression and the DFlash/prefix-cache interaction are both still open. Run the vLLM greedy-output equivalence test before rolling forward.
- **Long-context agentic workloads on hybrid GDN models (Qwen3.5 family)** should explicitly disable DFlash beyond ~100k tokens until [#54691](https://github.com/vllm-project/vllm/issues/54691) lands a per-sequence-length hook; the default 185k drop to 16 tok/s is a near-total denial of service.
- **Intel Arc Pro B70 deployments** should add a token-distribution liveness probe (e.g., entropy collapse detection) — the silent corruption in [#53480](https://github.com/vllm-project/vllm/issues/53480) returns HTTP 200.
- **Disaggregated prefill/decode on DeepSeek-V4** can now safely combine PCP+DCP with FlashMLASparse MTP and DSpark drafts; users on the older NIXL path should pull [#56722](https://github.com/vllm-project/vllm/pull/56722) + [#56723](https://github.com/vllm-project/vllm/pull/56723) to avoid the validation crash.
- **KV-cache filesystem offload users** should review the new RFC [#54363](https://github.com/vllm-project/vllm/issues/54363) — there are currently no integrity checks and no bound on I/O latency; this is worth weighing if you rely on the secondary tier for fault tolerance.
- **Gemma-4 tool-calling** users running BF16 drafters in front of NVFP4 targets must take [#56539](https://github.com/vllm-project/vllm/pull/56539) to avoid engine init crashes.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-14

## 1. Today's Highlights

No new releases in the last 24 hours, but the project shows concentrated engineering momentum in three areas: (1) **DeepSeek V4.1 native support** landing via [#38798](https://github.com/sgl-project/sglang/pull/38798), (2) the **unified memory pool** refactor across H2D/D2H, PD transfer, speculative decoding, and SWA hybridization (PRs [#38592](https://github.com/sgl-project/sglang/pull/38592), [#37627](https://github.com/sgl-project/sglang/pull/37627), [#37496](https://github.com/sgl-project/sglang/pull/37496), [#36730](https://github.com/sgl-project/sglang/pull/36730), [#36731](https://github.com/sgl-project/sglang/pull/36731), [#36729](https://github.com/sgl-project/sglang/pull/36729)), and (3) **sgl-router maturity** — both new queue/saturation load-balancing features and a serious open circuit-breaker bug in PD mode.

## 2. Releases & Breaking Changes

*No new tagged releases in the last 24h.*

## 3. New Model & Hardware Support

- **DeepSeek V4.1 (dsv4.1 branch)** — native model registration PR [#38798](https://github.com/sgl-project/sglang/pull/38798) (open, awaiting `run-ci` label). Bugs already filed against the branch: image-placeholder rejection in [#39274](https://github.com/sgl-project/sglang/issues/39274) and DeepSeek-V4.1-Flash + Engram CUDA-graph capture failure in [#39173](https://github.com/sgl-project/sglang/issues/39173).
- **AMD GLM-5.3-Flash Day 0** — the gfx950/ROCm AITER support track is being re-applied after prior support-branch merges: FP8 + Quark MXFP4 MoE ([#38546](https://github.com/sgl-project/sglang/pull/38546)), DSA top-k/preshuffle/HIP fused JIT ([#38542](https://github.com/sgl-project/sglang/pull/38542), [#38543](https://github.com/sgl-project/sglang/pull/38543), [#38544](https://github.com/sgl-project/sglang/pull/38544)), and zero-width RoPE tail handling ([#38541](https://github.com/sgl-project/sglang/pull/38541)). All four are currently closed-as-replacement and need re-opening on current main.
- **SenseNova-U1 / U1.5** — feature & perf tracking opened in [#37742](https://github.com/sgl-project/sglang/issues/37742) against the OpenSenseNova reference repo.
- **OLMo3 (Olmo3ForCausalLM)** — feature request [#31175](https://github.com/sgl-project/sglang/issues/31175) to reuse the existing Olmo2 implementation; currently falls back to the Transformers backend.
- **LoRA + DP Attention** — backend-level support PR [#36389](https://github.com/sgl-project/sglang/pull/36389).
- **NPU decode context parallel for DSA models** — PR [#37787](https://github.com/sgl-project/sglang/pull/37787).
- **Quantization** — request to extend FlashInfer MXFP4 routed MoE to serialized static-FP8 MXFP4 checkpoints on SM120/SM121 in [#31235](https://github.com/sgl-project/sglang/issues/31235).

## 4. Performance & Optimization

- **Semantic KV cache reuse (opt-in)** — fuzzy-match radix backend behind a pluggable interface in [#31057](https://github.com/sgl-project/sglang/pull/31057); aims to reuse KV across paraphrased/RAG prompts with reordered context. No published speedup numbers yet.
- **Unified memory pool page-envelope work** — a coordinated stack translating every device read/write path to physical envelopes:
  - Intra-page **token-major dense views** [#38592](https://github.com/sgl-project/sglang/pull/38592)
  - **Speculative decoding** read/write translation [#37627](https://github.com/sgl-project/sglang/pull/37627) (+1021/−166 on top of #38592)
  - **H2D/D2H** transfers must address current physical envelopes [#37496](https://github.com/sgl-project/sglang/pull/37496)
  - **PD disaggregation** page-envelope contract with independent target/draft index vectors [#36730](https://github.com/sgl-project/sglang/pull/36730)
  - **Decode host pools** that preserve unified envelopes under dynamic Full/SWA byte sharing [#36731](https://github.com/sgl-project/sglang/pull/36731)
  - **Shared byte budget** for unified hybrid-SWA memory [#36729](https://github.com/sgl-project/sglang/pull/36729)
- **SGLang ↔ vLLM Prometheus parity** — adds `vllm:gpu_cache_usage_perc` as `kv_cache_usage_perc` gauge ([#34714](https://github.com/sgl-project/sglang/pull/34714), addresses #5979) to simplify monitoring migrations.
- **GLM-4.7 EBNF-constrained decoding** for non-strict tool calls [#38890](https://github.com/sgl-project/sglang/pull/38890) (reasoning + text + XML tool structure).
- **HiCacheFile**: fixes for scale (ENOSPC under flat directory, [#28653](https://github.com/sgl-project/sglang/issues/28653)) and hybrid-pool prefix restoration correctness ([#39147](https://github.com/sgl-project/sglang/issues/39147)).

## 5. Stability & Regressions

Ranked by likely production impact:

1. **[HIGH] sgl-router PD circuit-breaker dispatches to dead decode** — [#31206](https://github.com/sgl-project/sglang/issues/31206) (sgl-router v0.2.4, `sgl_model_gateway`, PD mode, nightly `b94ac87e`). After client-side timeout bursts the breaker opens but prefill still routes to a permanently-fake-dead decode. No fix PR linked yet.
2. **[HIGH] `/health` timeout leaks scheduler-side requests** — [#35884](https://github.com/sgl-project/sglang/issues/35884). Orphaned health-check entries accumulate and crash paged-prefill batching. No fix PR.
3. **[HIGH] Client disconnect crashes entire engine** — [#39216](https://github.com/sgl-project/sglang/issues/39216) (RTX 6000D, DeepSeek-V4.1 dev image). Uncaught `asyncio.CancelledError` bypasses `except Exception`. No fix PR.
4. **[MED] MoE deferred finalize unreachable for custom-routing models** — [#39299](https://github.com/sgl-project/sglang/issues/39299). Models that must use `trtllm_fp4_block_scale_routed_moe` are permanently excluded from deferred finalize.
5. **[MED] DeepSeek-V4.1 image-placeholder token rejected with 400** — [#39274](https://github.com/sgl-project/sglang/issues/39274) in `encoding_dsv41.py`. Affects any user text containing the literal placeholder.
6. **[MED] Grammar token sync creates singleton NCCL group under DP attention** — [#35826](https://github.com/sgl-project/sglang/issues/35826); focused follow-up to #8400.
7. **[MED] SWA branching attaches later Mamba checkpoint to earlier prefix** — [#38815](https://github.com/sgl-project/sglang/issues/38815) on joint Full/SWA/Mamba caches. No fix PR.
8. **[LOW/CLOSED, noted for tracking]** Long-running Qwen3.5-4B perf regression on RTX 5090 ([#31120](https://github.com/sgl-project/sglang/issues/31120)) and GLM-5.2 NVFP4 + EAGLE CUDA illegal memory access ([#31093](https://github.com/sgl-project/sglang/issues/31093)) — both now closed/inactive but illustrate the breadth of decode-CUDA-graph regressions.
9. **CI infrastructure** — [#17050](https://github.com/sgl-project/sglang/issues/17050) auto-update: 6 broken, 11 flaky, 990 recently fixed on scheduled `main` CI. [#26340](https://github.com/sgl-project/sglang/issues/26340) continues to auto-collect CUDA coredumps from `pr-test.yml` (299 comments).

## 6. What This Means for Application Developers

- **Avoid sgl-router v0.2.4 PD mode in production until [#31206](https://github.com/sgl-project/sglang/issues/31206) is fixed** — a burst of client timeouts can wedge the prefill side on a fake-dead decode, with no automatic recovery.
- **Don't rely on `/health` to be self-cleaning** if you scrape it aggressively ([#35884](https://github.com/sgl-project/sglang/issues/35884)); an upstream fix or external timeout on health probes is advisable.
- **DeepSeek V4.1 is still pre-release** — if you're on the `dsv4.1` branch, expect image-placeholder encoding issues ([#39274](https://github.com/sgl-project/sglang/issues/39274)) and avoid Engram + speculative decoding combos ([#39173](https://github.com/sgl-project/sglang/issues/39173)).
- **Monitor migration gets easier soon**: the new `kv_cache_usage_perc` gauge ([#34714](https://github.com/sgl-project/sglang/pull/34714)) gives vLLM-compatible KV-utilization metrics — useful if you're running dashboards across both engines.
- **LoRA workloads can plan for DP Attention** — [#36389](https://github.com/sgl-project/sglang/pull/36389) is in flight and removes a current blocker for multi-replica LoRA serving.
- **Unified memory pool changes are still landing** — if you pin nightly builds and hit H2D/D2H, speculative-decoding, or SWA/Mamba allocation bugs, check the page-envelope translation stack (#38592 → #37627 → #37496 → #36730 → #36731 → #36729) before bisecting unrelated memory regressions.
- **Router improvements worth tracking** for high-fleet PD deployments: `k`-random min-load fallback (`--min-load-choices`, [#39170](https://github.com/sgl-project/sglang/pull/39170)) and queue-flood pin-to-owner (`--saturation-queue-floor`, [#39169](https://github.com/sgl-project/sglang/pull/39169)).

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-14

## 1. Today's Highlights

The release cadence continued with **nine point releases (b10934–b10948)** focused on backend hardening and JSON-schema tooling. Most notable are the **MoE disk-streaming PR #25294** (enabling models larger than RAM via expert offload to SSD), the **SYCL graph record/replay port in #28725** (mirroring the CUDA graph path), and a **Vulkan NV driver queuesubmit workaround** ([b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938)) that mutex-locks submission until the upstream driver bug is fixed. A new **`common_schema` JSON-schema internal representation** landed in [b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934), unifying how `qwen3-coder` and other tool/structured-output models parse complex schemas.

## 2. Releases & Breaking Changes

| Tag | Summary | PR |
|---|---|---|
| [b10948](https://github.com/ggml-org/llama.cpp/releases/tag/b10948) | Exclude HY_V4 from WebGPU test-llama-archs | [#28855](https://github.com/ggml-org/llama.cpp/pull/28855) |
| [b10947](https://github.com/ggml-org/llama.cpp/releases/tag/b10947) | nemotron-h: guard expert FFN size fallback against zero divisor in NextN/MTP tail loop | [#28779](https://github.com/ggml-org/llama.cpp/pull/28779) |
| [b10946](https://github.com/ggml-org/llama.cpp/releases/tag/b10946) | ggml-cpu(s390x): guard VXE-only repack helpers | [#28775](https://github.com/ggml-org/llama.cpp/pull/28775) |
| [b10944](https://github.com/ggml-org/llama.cpp/releases/tag/b10944) | SYCL: fix `get mem` error, optimize code, detect level-zero SDK/dev package | [#28227](https://github.com/ggml-org/llama.cpp/pull/28227) |
| [b10941](https://github.com/ggml-org/llama.cpp/releases/tag/b10941) | tests: reduce FA test sizes | [#28842](https://github.com/ggml-org/llama.cpp/pull/28842) |
| [b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938) | vulkan: mutex around `vkQueueSubmit` to dodge NV driver sync bug | [#28830](https://github.com/ggml-org/llama.cpp/pull/28830) |
| [b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937) | opencl: extend noshuffle row-alignment rule to q4_K/q5_K/q8_0 (was q6_K only) | [#28575](https://github.com/ggml-org/llama.cpp/pull/28575) |
| [b10936](https://github.com/ggml-org/llama.cpp/releases/tag/b10936) | chat: improve complex-type parsing for qwen3-coder | [#28742](https://github.com/ggml-org/llama.cpp/pull/28742) |
| [b10935](https://github.com/ggml-org/llama.cpp/releases/tag/b10935) | common: `LOG_JSON` macro for structured logging | [#28586](https://github.com/ggml-org/llama.cpp/pull/28586) |
| [b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) | common: introduce `common_schema` IR + JSON-schema optimizer, refactor grammar pipeline | [#28736](https://github.com/ggml-org/llama.cpp/pull/28736) |

**Migration notes:** The `common_schema` refactor in [b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) reworks json-schema-to-grammar internals; downstream consumers that link `common` should rebuild. No public API removals flagged.

## 3. New Model & Hardware Support

- **DeepSeek-V4.1 (DeepseekV41ForCausalLM)** conversion added — subclass of the V4 path with text-params nested under `text_config`. PR [#28696](https://github.com/ggml-org/llama.cpp/pull/28696).
- **Kimi-K3** text model conversion ([#26185](https://github.com/ggml-org/llama.cpp/pull/26185)) — hybrid KDA (linear) + MLA (full) attention with cross-layer residual attention, latent MoE (routed experts at `n_expert_latent`), and situ activation.
- **elmod-2.7b-it** (fraunhofer-iis) pretokenizer support — introduces an `escape_after_split` flag in `llama-vocab`. PR [#28845](https://github.com/ggml-org/llama.cpp/pull/28845).
- **Responses API `input_image` content** in `function_call_output` for Codex `view_image` round-tripping. PR [#28847](https://github.com/ggml-org/llama.cpp/pull/28847).
- **OpenCL row-alignment** extended to q4_K/q5_K/q8_0 in [b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937).
- **CUDA: BF16→F32 fallback** for devices lacking native BF16 matrix acceleration (pre-CDNA / pre-RDNA3 AMD, where rocBLAS picks a 64×32×8 stub tile). PR [#28846](https://github.com/ggml-org/llama.cpp/pull/28846).
- **MiMo V2 SWA pattern load** fix ([#28865](https://github.com/ggml-org/llama.cpp/pull/28865)), `get_key_or_arr` correctness sweep across model loaders ([#28868](https://github.com/ggml-org/llama.cpp/pull/28868)).

## 4. Performance & Optimization

- **MoE disk streaming (PR #25294)** — Optional SSD offload of routed-expert weights lets a model larger than host RAM run; layers keep a small device-side cache of `n_slots` expert slabs with a CPU id-remap custom op afterward. Significant for 100B+ MoE deployments on commodity boxes. [link](https://github.com/ggml-org/llama.cpp/pull/25294)
- **SYCL graph record/replay (#28725)** — Port of CUDA graph capture path to SYCL with a SYCL-specific reordering workaround for async alloc extensions; unlocks the graph optimization for Intel Arc GPUs that previously only worked on CUDA. [link](https://github.com/ggml-org/llama.cpp/pull/28725)
- **CUDA dynamic MMVQ `nwarps` (#20831)** — Fixes MoE decode regression introduced by #19478; `nwarps=8` was correct for wide decode weights but starved narrow expert FFN (512–2048 cols). Restores bs=1 TG throughput on RDNA3/RDNA4-class MoE. [link](https://github.com/ggml-org/llama.cpp/pull/20831)
- **Grammar engine: 1.2–1.3× speedup** via single-lookup optimization and removal of extra copies (PR [#26885](https://github.com/ggml-org/llama.cpp/pull/26885)) — relevant for tool-call heavy workloads using the in-house grammar backend (not llguidance).
- **Draft cap safety (#26575)** — `draft-dflash`/`draft-dspark` now respect `min(params.n_max, dp.n_max…)` before constructing the block decode, avoiding wasted speculative tokens at long context.
- **Prompt-cache reuse fix (#28869)** — `qwen3-coder` chat now emits `\n` (matching the template) when the reasoning budget is forced, restoring prompt-cache hit rate for multi-turn agent traffic.

## 5. Stability & Regressions

**Severe (data corruption / crash):**

1. **[#28753](https://github.com/ggml-org/llama.cpp/issues/28753)** — `ggml_backend_sched_alloc_splits: unexpected graph reallocation` SIGSEGV on Intel Arc (Linux x86_64). No fix PR yet.
2. **[#28827](https://github.com/ggml-org/llama.cpp/issues/28827)** — `gemma4` "thinking" mode emits progressively longer trailing garbage tokens on Vulkan (RX 9070 XT + Tesla P40 mixed).
3. **[#28805](https://github.com/ggml-org/llama.cpp/issues/28805)** — `qwen4exp` on Metal at long context emits 1 token then EOS; threshold varies with quant type, KV quant, and `n_ctx`. Silent empty output, stochastic at the threshold.
4. **[#28778](https://github.com/ggml-org/llama.cpp/issues/28778)** — SYCL + DFlash2 draft model triggers Windows GPU TDR (`VIDEO_TDR_TIMEOUT_DETECTED`) on dual Arc Pro B70.
5. **[#28723](https://github.com/ggml-org/llama.cpp/issues/28723)** — stdio MCP server spawned from config deadlocks permanently on tool-call payloads >1–5 KB.
6. **[#27309](https://github.com/ggml-org/llama.cpp/issues/27309)** — `llama-server` reports "model loaded" and binds the port after a fatal Metal OOM during init; every subsequent request 500s. A init-failure should release the socket.
7. **[#25751](https://github.com/ggml-org/llama.cpp/issues/25751)** — SWA on Gemma 4 forgets key details on CUDA (4×3090). Eval-quality regression.
8. **[#28728](https://github.com/ggml-org/llama.cpp/issues/28728)** — SYCL produces bad output for Qwen3.6 35B A3B on B580.

**Performance regressions:**

9. **[#28752](https://github.com/ggml-org/llama.cpp/issues/28752)** — Severe Vulkan prompt-processing speed drop after b10780 on RDNA3.
10. **[#27638](https://github.com/ggml-org/llama.cpp/issues/27638)** — Vulkan/ANV Flash-Attention fallback to SCALAR path causes O(N²) PP degradation and device loss on Intel Arc B580 (Mesa 26.1.2).
11. **[#27796](https://github.com/ggml-org/llama.cpp/issues/27796)** — HIP quantized KV cache *slower* than f16 on RDNA4 (gfx1201, R9700); deficit grows with type unpacking cost.
12. **[#28768](https://github.com/ggml-org/llama.cpp/issues/28768)** — HIP/ROCm on Windows gfx1201 (R9700): batched target scoring changes logits / top-1; Vulkan control is stable. Correctness concern.

**Older or closed items still in the discussion stream:** #25808 (SYCL xe2 segfault, closed), #20934 (ROCm vs Vulkan RX 7900 XTX, closed), #26282 (embedding quality regression, closed), #20141 (Metal M4 Pro Tahoe crash, closed). Most recent SYCL fixes in b10944 are related to #25808.

**Fix PRs landed or merge-ready for today's issues:**
- Vulkan RDNA3 PP regression (#28752) — no PR yet.
- MMVQ MoE TG (#20831, [#19478](https://github.com/ggml-org/llama.cpp/pull/19478)) — addresses one cause of MoE decode slowdown noted across multiple issues.

## 6. What This Means for Application Developers

- **Pin your build on or after b10934** if you use JSON-schema/structured-output with `qwen3-coder` or other grammar-driven models; the `common_schema` refactor materially improves complex-type fidelity.
- **For long-context agent traffic on Metal with MoE models, treat #28805 as a known-unsafe regime** until the threshold issue is root-caused. Test on your target `n_ctx` and quant combo before shipping.
- **stdio MCP servers**: payloads above ~1–5 KB currently deadlock the server (#28723). Either size-cap tool arguments, or move to HTTP/SSE MCP transport until this is fixed.
- **SYCL/Intel Arc**: the graph record/replay port in #28725 is significant — if you're deploying on B580/B70, watch for graph-related throughput uplifts once the PR merges, and validate against #28728/#28778 if you're using draft-model speculative decoding.
- **MoE on memory-constrained hosts**: PR #25294 is the most consequential infra change this cycle. If you've been blocked from running 70B+ MoE on a 64–128 GB box, this is the design to track; expect an opt-in flag rather than default behavior.
- **Vulkan NVIDIA users**: [b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938) adds a mutex around `vkQueueSubmit` to dodge an NV driver bug. Throughput on multi-stream workloads may drop slightly; correctness is the trade.
- **HIP/ROCm RDNA4**: avoid quantized KV cache until [#27796](https://github.com/ggml-org/llama.cpp/issues/27796) is resolved — f16 is currently the fastest *and* safest choice on gfx1201.
- **CUDA BF16 fallback**: [#28846](https://github.com/ggml-org/llama.cpp/pull/28846) silently routes BF16→F32 on pre-CDNA/pre-RDNA3 GPUs; if you're running mixed hardware, audit numerics before relying on bytewise-identical outputs across nodes.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-14

## Today's Highlights

The 24-hour window was dominated by **cloud-backend regressions and prompt-cache inefficiencies** rather than new releases. Two community-reported bugs in `qwen3-coder:480b-cloud` and `kimi-k3:cloud` produced HTTP 500s on inputs that work fine on local models, while two Anthropic-compat / tool-schema issues (#18430, #18431) cause identical chat requests to miss the prompt cache and silently burn tokens. On the bright side, **two of today's bugs already have merge-ready fixes**: PR #18424 cleans up the ~50 GB F16 blob left behind by `ollama create --quantize`, and PR #18422 fixes Qwen3-Coder's int64 truncation of large tool arguments.

## Releases & Breaking Changes

No new releases in the last 24h. No breaking API changes announced.

## New Model & Hardware Support

- **Model requests** (no merge yet): [SARVAM-30b / 105b (#14319)](https://github.com/ollama/ollama/issues/14319), [Gnani Evon-v3.3-30B-A3B (#18427)](https://github.com/ollama/ollama/issues/18427).
- **Vulkan backend fix shipped**: PR [#18124](https://github.com/ollama/ollama/pull/18124) (now closed/merged) restores direct I/O on integrated Vulkan GPUs (Virtio-GPU/Venus in VMs, iGPUs), matching the CUDA/ROCm path. Fixes a regression introduced between 0.32.9 and 0.32.10 that caused `timed out waiting for llama-server to start` even though the server was alive and still loading weights.
- **Windows image generation support**: PR [#13806](https://github.com/ollama/ollama/pull/13806) closed/merged — image generation is now carried into the Windows build (carries upstream mlx / mlx-c patches until they land upstream).

## Performance & Optimization

- **Quantization disk-usage fix** ([PR #18424](https://github.com/ollama/ollama/pull/18424), open): `ollama create --quantize` from a safetensors dir will no longer leave the intermediate F16 blob behind. The reporter in [#18416](https://github.com/ollama/ollama/issues/18416) had **69 unreferenced blobs totalling 830 GB** while `ollama list` summed to only 188 GB. Significant for anyone batch-importing 20B+ MoE models.
- **Tool parser correctness** ([PR #18422](https://github.com/ollama/ollama/pull/18422), open): Stops coercing whole-valued floats outside the int64 range into `9223372036854775807`. Relevant for any tool call passing scientific-notation numerics (e.g. `x=1e20`).
- **Vulkan integrated-GPU load path** ([#18124](https://github.com/ollama/ollama/pull/18124)): Reduces time-to-first-token regressions on VM-based and iGPU-only Vulkan setups.

## Stability & Regressions

Ranked by likely blast radius, not by upvote count.

| Severity | Issue | Status | Fix |
|---|---|---|---|
| 🔴 High | [#18426](https://github.com/ollama/ollama/issues/18426) `kimi-k3:cloud` returns HTTP 500 on image content inside tool-role messages; `kimi-k2.6` and `glm-5.3-flash` work. | Open | None |
| 🔴 High | [#12362](https://github.com/ollama/ollama/issues/12362) `qwen3-coder:480b-cloud` ignores the JSON reply schema — returns free-form JSON that fails downstream validation. Works on local `qwen3-coder:30b`. | Open | None |
| 🟠 Medium | [#18416](https://github.com/ollama/ollama/issues/18416) Quantization leaves ~50 GB unreferenced F16 blob per import; `ollama rm` does not reclaim it. | Open | [#18424](https://github.com/ollama/ollama/pull/18424) ready |
| 🟠 Medium | [#18431](https://github.com/ollama/ollama/issues/18431) Anthropic-compat `/v1/messages` hoists inline `role:system` messages into the system block, defeating Claude Code's prefix cache after each tool result. | Open | None |
| 🟠 Medium | [#18430](https://github.com/ollama/ollama/issues/18430) `qwen3-coder:30b` re-renders identical tool schemas in random key order, so identical requests only partially hit the prompt cache. | Open | None |
| 🟡 Low | [#18421](https://github.com/ollama/ollama/issues/18421) Qwen3-Coder tool parser clamps `number` arguments to int64. | Open | [#18422](https://github.com/ollama/ollama/pull/18422) ready |
| 🟡 Low | [#18419](https://github.com/ollama/ollama/issues/18419) `/api/codex/v1/responses` silently returns empty `output_text` on `previous_response_id` follow-ups; tokens report as zero. | Open | None |
| 🟡 Low | [#18396](https://github.com/ollama/ollama/issues/18396) Gemma 4 E4B multimodal OOMs host on Jetson Orin Nano 8GB despite successful CPU-projector setup. | Open | None |
| 🟡 Low | [#18418](https://github.com/ollama/ollama/issues/18418) EXIF orientation tag is not applied before vision models see the image. | Open | None |
| 🟡 Low | [#18297](https://github.com/ollama/ollama/issues/18297) `IQ3_S` quant of Qwen3.8-27B-GSQ-RCO-GGUF returns empty content with `done_reason: stop`. | Open | None |
| 🟡 Low | [#18387](https://github.com/ollama/ollama/issues/18387) Long runs of ellipses (10+) in chat input trigger `cancel task` mid-stream. | Open | None |
| 🟠 Persistent | [#3185](https://github.com/ollama/ollama/issues/3185) Ollama does not redistribute MIT notices for statically linked `llama.cpp` (275 👍, 58 comments, open since 2024). | Open | None |

## What This Means for Application Developers

- **If you route to Ollama Cloud**: Pin to a specific model and add a fallback. Both `kimi-k3:cloud` and `qwen3-coder:480b-cloud` currently misbehave on inputs that are fine on local weights — JSON schema enforcement and image-in-tool-role are not safe to depend on yet.
- **If you use Claude Code or Anthropic SDK against `/v1/messages`**: System messages inside `messages[]` (Claude Code injects these after tool results) are hoisted into the system block, so the prefix cache misses every turn. Treat cloud-Anthropic-compat as cache-unfriendly until #18431 lands.
- **If you ship tools with large numeric ranges** to `qwen3-coder`: Numbers like `1e20` are silently clamped to `int64.max`. PR #18422 fixes this; until it merges, either pre-validate ranges client-side or pass them as strings.
- **If you `ollama create --quantize` from safetensors**: You are leaking the full F16 weight set. Check `~/.ollama/models/blobs` — `ollama rm` will not reclaim it. PR #18424 is the fix; until it merges, manually delete unreferenced blobs after each import.
- **If you run in a VM or on an iGPU via Vulkan**: Upgrade to pick up #18124 — model load on integrated Vulkan GPUs no longer hangs.
- **Disk hygiene note**: Even after #18424 merges, `ollama rm` still does not GC manifest-unreferenced blobs; expect to script periodic `blobs/` cleanup if you do many `--quantize` runs.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-14

## Today's Highlights

The community continues to focus on LiteLLM's **Rust migration** as the marquee infrastructure initiative (#31263, 26 comments, 20 👍), with the parent tracker gathering active questions from prospective beta testers. On the stability side, the day's issue and PR traffic is dominated by **streaming/Responses-bridge correctness bugs** (e.g. #40887, #41017, #31332, #41014) and **model-cost / token-default misconfigurations** (#40363, #40471, #41016), while v1.102.0-rc.1 lands with cosign-signed Docker images.

## Releases & Breaking Changes

- **v1.102.0-rc.1** ([release](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1)) — new release candidate. Notable: all Docker images are now **cosign-signed** with a key introduced in commit `0112e53`. Operators should update their image-verification pipelines; unsigned images will no longer be authoritative for this line.
- No public deprecation notes surfaced in this window, but the staging branch `litellm_oss_staging_230626` has lost several merged-but-unreleased callbacks (see #38383), worth tracking if you pin by branch.

## New Model & Hardware Support

- **NVIDIA Riva ASR — offline mode** ([PR #41021](https://github.com/BerriAI/litellm/pull/41021)): adds `riva_offline: true` to handle Parakeet TDT and Whisper deployments that reject streaming with `INVALID_ARGUMENT`.
- **Inception `mercury-2.5` cost map completion** ([PR #41016](https://github.com/BerriAI/litellm/pull/41016), [#40746](https://github.com/BerriAI/litellm/issues/40746)): adds `cache_read_input_token_cost` and `supports_prompt_caching` so cached Mercury 2.5 tokens stop billing $0.
- **Bedrock native passthrough** ([PR #40938](https://github.com/BerriAI/litellm/pull/40938)): forward declared Bedrock / Bedrock Mantle endpoints (chat completions, Responses, messages) **without translation**, eliminating Invoke/Converse/Responses-bridge mangling.
- **Vertex AI Claude versioned IDs** ([PR #40376](https://github.com/BerriAI/litellm/pull/40376), [#40363](https://github.com/BerriAI/litellm/issues/40363)): corrected default `max_tokens` resolution and `claude-haiku-4-5*` map entries (8192 → 64000).
- **OpenRouter video generation** ([#27724](https://github.com/BerriAI/litellm/issues/27724)) — request closed without implementation; operators should not expect video-gen routing yet.

## Performance & Optimization

- **Rust gateway** — sub-1ms overheads as headline goal ([#31263](https://github.com/BerriAI/litellm/issues/31263)); the parent tracker remains the right place to coordinate beta testing.
- **OTel metric export** ([PR #41022](https://github.com/BerriAI/litellm/pull/41022)): v2 metric reader now honors `OTEL_METRIC_EXPORT_INTERVAL` (was hardcoded to 5s and re-shipping cumulative histograms ~12×/min). Backends billed per datapoint can finally throttle export.
- **MCP tool-list caching** ([#23544](https://github.com/BerriAI/litellm/issues/23544)): HTTP MCP servers still re-call `list_tools` on every `tools/call`, doubling latency — a fix is in progress but not yet merged.
- **x-litellm-tags on MCP** ([PR #35777](https://github.com/BerriAI/litellm/pull/35777)): tag-based usage attribution is finally extended to MCP routes.

## Stability & Regressions

Ranked by user impact, with linked fixes where available:

1. **Self-hosted install fails at `prisma generate`** ([#26097](https://github.com/BerriAI/litellm/issues/26097), 7 comments) — affects every Docker/prod install on current schema. No fix PR linked yet.
2. **Guardrails cannot see/block MCP tools on Anthropic `/v1/messages`** ([#40583](https://github.com/BerriAI/litellm/issues/40583)) — security-relevant. **Fix: [PR #41011](https://github.com/BerriAI/litellm/pull/41011)** (pre_call reads Anthropic-format tool names).
3. **`reasoning_effort=xhigh` silently downgraded instead of refused** ([#40471](https://github.com/BerriAI/litellm/issues/40471)) — correctness/safety issue. Related Responses-side enforcement: [PR #38897](https://github.com/BerriAI/litellm/pull/38897).
4. **Responses→Chat streaming drops reasoning progress** ([#40887](https://github.com/BerriAI/litellm/issues/40887)) — bridge fails to map incremental reasoning items; only attaches on terminal events.
5. **`chatgpt/` provider returns empty `output[]` for `gpt-5.6-sol`** ([#41017](https://github.com/BerriAI/litellm/issues/41017)) — **Fix: [PR #31332](https://github.com/BerriAI/litellm/pull/31332)** (backfill from `output_item.done`) and [PR #41014](https://github.com/BerriAI/litellm/pull/41014) (bridge rebuild).
6. **`/v1/embeddings` returns duplicate `index` values in mixed cached/uncached batches** ([#41002](https://github.com/BerriAI/litellm/issues/41002)). **Fix: [PR #41020](https://github.com/BerriAI/litellm/pull/41020)**.
7. **Streaming usage merger retains stale cache-write tokens** ([#40736](https://github.com/BerriAI/litellm/issues/40736)) — cost-tracker reliability issue.
8. **Valkey semantic cache fails due to wrong kwargs** ([#32324](https://github.com/BerriAI/litellm/issues/32324)) — production cache silently broken.
9. **Vertex AI Claude versioned IDs default to 4096 max_tokens** ([#40363](https://github.com/BerriAI/litellm/issues/40363)). **Fix: [PR #40376](https://github.com/BerriAI/litellm/pull/40376)**.
10. **Internal litellm params leaking into provider JSON** ([PR #41018](https://github.com/BerriAI/litellm/pull/41018)) — GPT-5.4 + tools 400s on `model_alias_map`. **Backport in flight to stable.**
11. **"Test Connection" misreads custom-pricing fields as credentials** ([PR #41024](https://github.com/BerriAI/litellm/pull/41024)) — UI/admin friction.
12. **Budget reservation skipped when cost can't be estimated** ([#35524](https://github.com/BerriAI/litellm/issues/35524)) — concurrency-bypass risk on unpriced routes.
13. **Componentized gateway/backend ignore DB pool limits + IAM refresh drops URL params** ([#33021](https://github.com/BerriAI/litellm/issues/33021)).
14. **Case-insensitive User-Agent header lookup bug** ([#40979](https://github.com/BerriAI/litellm/issues/40979)) — observability tagging.
15. **`langfuse_otel` doesn't set observation output for `/v1/rerank`** ([#36537](https://github.com/BerriAI/litellm/issues/36537)) — tracing gap.
16. **Ollama provider `KeyError` on custom prompt templates omitting `initial/final_prompt_value`** ([#39759](https://github.com/BerriAI/litellm/issues/39759)).

## What This Means for Application Developers

- **Verify your images.** With cosign-signed Docker images now standard on v1.102.0-rc.1, lock your supply chain tooling to the published signature before promoting the RC to prod.
- **Re-validate streaming/agent flows against 1.102.0-rc.1.** The Responses↔Chat bridge, MCP tool calls, and Responses WebSocket have all had correctness fixes queued in the same 24h window (#31332, #41011, #41014, #40591).
- **Pricing regressions are real and silent.** If you route to Vertex Claude versioned IDs, custom-priced OCR, or Inception Mercury, audit your bills — several cost-map fixes have shipped that change what uncached vs cached tokens bill at.
- **Guardrail posture on Anthropic `/v1/messages`.** Until you pick up PR #41011, MCP tools are effectively ungoverned on that endpoint. Treat any tool-allow/deny list as advisory, not enforced, when calling via `/v1/messages`.
- **Plan for the Rust gateway.** If you're optimizing tail-latency on the proxy, sign up for the beta program linked from [#31263](https://github.com/BerriAI/litellm/issues/31263); sub-1ms overhead is the target for production agents.
- **OWASP ASI06 readiness.** Memory-poisoning defenses for agentic deployments are an open feature request (#27949); if you're persisting agent memory across sessions through LiteLLM, expect to add your own audit layer for now.
- **Embedding batch consumers.** If you batch cached + uncached inputs through `/v1/embeddings`, pin to a build containing PR #41020, or verify `data[i].index` mapping downstream — otherwise vectors can be silently re-ordered.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-14

## Today's Highlights

The Unsloth repo had no new releases in the last 24h, but the activity is heavy: 21 issues touched and 170+ PRs in flight. The dominant themes are **Studio agent/UI correctness fixes** (Anthropic streaming errors, HF-cache weight allowlists, duplicate tool-call guards, MCP image attachments, multi-resident GGUF), **Q-GaLore optimizer correctness** with bitsandbytes 0.50.2, and a **B200 performance regression** where `fla` rebuilt its autotune cache on every launch, leaving the GPU idle for most of each step.

## Releases & Breaking Changes

No new tagged releases in the last 24h.

A latent breaking change was **closed/answered** in [#10785](https://github.com/unslothai/unsloth/issues/10785): `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`. `max_seq_length` has been renamed to `max_length` in the latest docker image (`2026.9.4`). Users on `transformers`-style `SFTConfig` need to migrate this kwarg.

## New Model & Hardware Support

- **PR [#10766](https://github.com/unslothai/unsloth/pull/10766)** — Proposal for an official **ARM64 CPU-only Docker** image (CUDA-free), complementing the existing `linux/arm64` GPU build that targets GH200/DGX Spark.
- **PR [#10480](https://github.com/unslothai/unsloth/pull/10480)** — Studio: enable **video-clip input on MLX chat models** via `mlx-vlm`. Previously only GGUF/`llama.cpp` (`input_video`) could receive video, so MLX vision backends were turned away before being asked.
- **PR [#10439](https://github.com/unslothai/unsloth/pull/10439)** — Studio: accept OpenAI-shaped `video_url` content parts on `/v1/chat/completions` for backends that can decode them.
- **PR [#10876](https://github.com/unslothai/unsloth/pull/10876)** — Studio: support **multiple resident GGUF models** simultaneously, each in its own `LlamaCppBackend`/`llama-server` process, with explicit model routing in requests.
- **PR [#10865](https://github.com/unslothai/unsloth/pull/10865)** — Add **Greek (`el-GR`)** to Studio's dictation and read-aloud language options (Whisper already supports it).

## Performance & Optimization

- **[#10806](https://github.com/unslothai/unsloth/issues/10806) — B200 regression: GPU idle most of each step.** Training a Qwen3.5-9B LoRA via `unsloth-cli.py` on 1× NVIDIA B200 (sm_100, CUDA 12.8). The `fla` library rebuilds its autotune key on every launch, so the kernel falls back to a non-fused path. Unsloth-side workaround confirmed (build key once and reuse); awaiting an upstream-style fix.
- **PR [#10879](https://github.com/unslothai/unsloth/pull/10879)** — *Correctness/perf*: invalidate packed-attention caches when lengths change. Three caches compared tensor identity without checking for mutations, so a `sequence_length` mutation caused stale boundaries and attention across wrong samples — silently expensive and incorrect.
- **PR [#10649](https://github.com/unslothai/unsloth/pull/10649)** — `unsloth studio update` re-runs the full 16-step Python dependency pass on every update. New manifest records what each pass consumed and skips a step only when three invariants hold. Significant Windows update-time win where evidence had to be kept.
- **PR [#10874](https://github.com/unslothai/unsloth/pull/10874)** — Q-GaLore now passes optimizer options to bitsandbytes **by name**. In bitsandbytes 0.50.2, removed positional args bound `percentile_clipping=100` to `max_unorm` and `block_wise=True` to `skip_zeros`, so norm clipping erased projected-parameter updates against a zero-filled buffer.

## Stability & Regressions

Ranked by blast radius:

1. **[#10806](https://github.com/unslothai/unsloth/issues/10806) — B200 GPU idle (open).** High impact on B200 owners doing Qwen3.5-9B LoRA training; no upstream `fla` fix merged yet.
2. **[#10355](https://github.com/unslothai/unsloth/issues/10355) — `--tensor-split` ignored (open).** Multi-GPU serving config silently dropped; user spent hours discovering it.
3. **[#10839](https://github.com/unslothai/unsloth/issues/10839) — MCP call systematically truncated (open).** Output dedup appears to clip responses; bypass not exposed.
4. **[#10875](https://github.com/unslothai/unsloth/issues/10875) — Windows ARM64 desktop installer fails on `pyarrow` (open).** CLI path works; desktop path does not.
5. **[#10859](https://github.com/unslothai/unsloth/issues/10859) — Installer ignores chosen folder (open).** Dependencies still land in `~/.unsloth` regardless.
6. **[#10018](https://github.com/unslothai/unsloth/issues/10018) / [#10844](https://github.com/unslothai/unsloth/issues/10844) — Intel XPU Triton replacement (open).** Initial patch landed; second-round fix in progress.
7. **[#10805](https://github.com/unslothai/unsloth/issues/10805) — `install.ps1` flagged by antivirus (open).** Blocks PowerShell-based update flow.
8. **[#10835](https://github.com/unslothai/unsloth/issues/10835) — Safety check bypassed (open).** `reboot`, `rm`, and command substitution (`$(ls /usr/bi…)`) reach execution because the safety regex misses "devised" command forms.
9. **[#10792](https://github.com/unslothai/unsloth/issues/10792) — Duplicate tool-call guard (closed by [#10810](https://github.com/unslothai/unsloth/pull/10810)).** Agent couldn't re-run a command after editing a file because every successful call was remembered for the whole reply.
10. **[#10785](https://github.com/unslothai/unsloth/issues/10785) — `SFTConfig.max_seq_length` (closed).** Renamed to `max_length` in the `2026.9.4` image.
11. **[#10853](https://github.com/unslothai/unsloth/issues/10853) — HF-cache model allowlist misses `model-00000-of-00001.safetensors` (closed).** MiniCPM5-1B/2B failed Studio training with "no trainable weights" until the allowlist was broadened.
12. **[#8854](https://github.com/unslothai/unsloth/issues/8854) — RAG tool can't list project files (open).** vec0 KNN query requires an explicit LIMIT on SQLite <3.41; fix landed in PR [#10861](https://github.com/unslothai/unsloth/pull/10861).
13. **[#7527](https://github.com/unslothai/unsloth/issues/7527) — Nemotron attention handling (open).** Still tracked after 6 comments; no fix PR linked.
14. **[#946](https://github.com/unslothai/unsloth/issues/946) — Phi3.5 single-token/binary loss → 0 (open, low priority).** Long-standing, 15 comments, no recent activity.

Additional closed Studio fixes worth noting:
- [#10811](https://github.com/unslothai/unsloth/pull/10811) — Anthropic mid-reply failures now surface as errors instead of silently saving partial answers.
- [#10808](https://github.com/unslothai/unsloth/pull/10808) — Full fine-tune export now produces a real 16-bit model (was silently saving the loaded 4-bit weights).
- [#10809](https://github.com/unslothai/unsloth/pull/10809) — API key without an HF token can no longer train using the **server's** HF login; closes a cross-tenant data exposure path.
- [#10797](https://github.com/unslothai/unsloth/pull/10797) — Clears `importlib.metadata` directory cache before scanning installed records (otherwise manifests written after a scan stayed invisible).

## What This Means for Application Developers

- **Pin the Q-GaLore + bitsandbytes combination.** PRs [#10874](https://github.com/unslothai/unsloth/pull/10874) and [#10878](https://github.com/unslothai/unsloth/pull/10878) fix two silent correctness bugs in Q-GaLore against bitsandbytes 0.50.2 (zero-filled update buffer erasing updates; low-rank gradients leaking into the next backward). Pull the latest `main` before re-running Q-GaLore jobs that previously "looked fine."
- **B200 users: validate training utilization.** Issue [#10806](https://github.com/unslothai/unsloth/issues/10806) means a Qwen3.5-9B LoRA run on B200 may be CPU/launch-bound, not GPU-bound. Profile step time vs. `nvidia-smi` utilization before assuming SM_100 perf.
- **Multi-GPU serving: do not trust `--tensor-split` yet ([#10355](https://github.com/unslothai/unsloth/issues/10355)).** Validate with `nvidia-smi` per-GPU memory after launch.
- **HF token hygiene.** If you expose Studio with API keys, upgrade: an API key without its own HF token can no longer piggyback on the server's login ([#10809](https://github.com/unslothai/unsloth/pull/10809)).
- **MCP / tool-call pipelines.** Several open bugs affect agent reliability: truncated MCP outputs ([#10839](https://github.com/unslothai/unsloth/issues/10839)), safety checks that can be bypassed by command substitution ([#10835](https://github.com/unslothai/unsloth/issues/10835)), and the still-open "nudging" revisit ([#9686](https://github.com/unslothai/unsloth/issues/9686)). For production agents, layer your own allowlist on top of Studio's safety check and your own truncation policy until these land.
- **Video in Studio.** OpenAI-compatible `video_url` content parts now reach backends that can decode them ([#10439](https://github.com/unslothai/unsloth/pull/10439)), and MLX vision models can finally receive a clip ([#10480](https://github.com/unslothai/unsloth/pull/10480)). Useful for multi-modal app developers standardizing on the OpenAI chat schema.
- **Windows / ARM64 / Intel XPU.** The desktop installer remains the roughest path: `pyarrow` failures on Windows ARM64 ([#10875](https://github.com/unslothai/unsloth/issues/10875)), antivirus blocks on `install.ps1` ([#10805](https://github.com/unslothai/unsloth/issues/10805)), XPU Triton still flaky ([#10844](https://github.com/unslothai/unsloth/issues/10844)). CLI on Linux is currently the most reliable install path.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-14

## 1. Today's Highlights

Activity was light over the last 24 hours, with no new releases or freshly reported issues. The single meaningful signal is PR #1794, which addresses a long-standing latent stability bug in `spawnGatewayProcess`: the 5 s config-acceptance timer is hardcoded in the parent and can race with slower child startup paths, causing spurious gateway-start failures on cold starts.

## 2. Releases & Breaking Changes

*No new releases in the last 24h. No version bumps, tag announcements, or breaking-change notes to report.*

## 3. New Model & Hardware Support

*No new model, backend (CUDA/ROCm/Metal/CPU), or quantization format changes were landed or proposed in this window.*

## 4. Performance & Optimization

Nothing in this window directly targets throughput, latency, memory, or kernel work. PR #1794 is configuration-shaped rather than throughput-shaped; once merged it will, however, allow operators to tune the startup handshake budget instead of being capped at the current 5000 ms ceiling.

## 5. Stability & Regressions

**Severity: Medium — latent startup-race condition, mitigation PR open.**

- **PR #1794 — `fix(gateway): raise and make configurable the core config-acceptance timeout`** ([link](https://github.com/musistudio/claude-code-router/pull/1794))
  - **Symptom:** Parent fires `gateway:start`, then arms a hardcoded 5000 ms timer. The child only emits `gateway:config-accepted` after process boot *and* `require()`-ing the real gateway entry — so on cold starts (large config trees, slow disks, or debug builds with extra require work) the timer can expire before the reply arrives, surfacing as a gateway-start failure despite the child being healthy.
  - **Fix shape:** Raises the default budget and exposes it as a configurable knob, letting ops teams tune it for their environment instead of inheriting a brittle constant.
  - **Status:** Open as of 2026-09-13, no review comments yet. No associated issue link in the PR body, so root-cause history isn't visible from this digest window.

No other crashes, correctness bugs, or regressions were filed in the last 24h.

## 6. What This Means for Application Developers

- **Short term:** If you've ever seen a flaky `gateway:start` failure right after a cold deploy — particularly with large `config.json`, plugins, or on slower filesystems — that is very likely this race. PR #1794 will make it tunable; until it lands, no action is required, but be aware the window is real.
- **Post-merge:** Expect a new config field for the acceptance timeout (name not finalized in the PR description). Operators running Claude Code Router as a managed service should revisit their startup SLOs and provisioning probes; the change effectively converts an unpredictable binary failure into a configurable, observable parameter.
- **Operational hygiene:** Even with the fix, set your health-check grace period above the configured acceptance timeout plus a comfortable margin, otherwise orchestrators (systemd, k8s, PM2) may kill the process before it has a chance to advertise readiness.
- **No release-driven upgrades today:** there is nothing version-pin-related to act on; continue tracking `main` if you want early visibility into this fix.

---
*Sources: [musistudio/claude-code-router PR #1794](https://github.com/musistudio/claude-code-router/pull/1794). Window: 2026-09-13 → 2026-09-14.*

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Daily Digest — 2026-09-14

## 1. Today's Highlights

The dominant story is a cluster of **Codex cross-provider session-replay failures** that surface whenever a user toggles between a third-party endpoint (DeepSeek, Grok, custom relays) and OpenAI Official: missing `call_id` on `function_call_output` items, foreign `reasoning` blocks, and `model_provider` pinning in `state_5.sqlite` combine to permanently break old threads. SailingLoong shipped two same-day proxy fixes ([#7374](https://github.com/farion1231/cc-switch/pull/7374), [#7373](https://github.com/farion1231/cc-switch/pull/7373)) targeting the empty-id class of bugs, while [#7362](https://github.com/farion1231/cc-switch/issues/7362) and [#7257](https://github.com/farion1231/cc-switch/issues/7257) escalate the provider-pinning problem as a feature request. The Codex usage-sync refactor continues to pay off — three more cursor bugs ([#6027](https://github.com/farion1231/cc-switch/pull/6027), [#6080](https://github.com/farion1231/cc-switch/pull/6080), [#6246](https://github.com/farion1231/cc-switch/pull/6246)) closed today.

## 2. Releases & Breaking Changes

No new tags in the last 24h. The active development branch is still tracking toward v3.20.x (the issue tracker references v3.20.1, v3.20.2, v3.20.3). No deprecation or config-format breaks landed today.

## 3. New Model & Hardware Support

- **Grok 4.x reasoning whitelist** — [#7369](https://github.com/farion1231/cc-switch/pull/7369) generalizes the `grok-4.5/4.6` literal match to `grok-4.x (x>=5)`, so future Grok releases no longer need a code change to keep `reasoning.effort` flowing.
- **o-series reasoning clamp** — [#7370](https://github.com/farion1231/cc-switch/pull/7370) clamps Claude Code's `xhigh` (and pre-existing `max` / `thinking: adaptive`) down to `high` for o1/o3/o4-mini, which only accept low/medium/high.
- **Zhipu OpenAI Responses model listing** — [#7330](https://github.com/farion1231/cc-switch/pull/7330) adds schema compatibility for Zhipu's `/models` endpoints across chat/responses/embedding API styles.
- **Volcengine plan routing** — [#6518](https://github.com/farion1231/cc-switch/pull/6518) routes usage probes to `GetCodingPlanUsage` or `GetAFPUsage` based on the provider's `base_url`, so dual-subscription accounts surface the correct quota on each card.

## 4. Performance & Optimization

- **npm version probe overhaul** — [#7346](https://github.com/farion1231/cc-switch/pull/7346) and [#7307](https://github.com/farion1231/cc-switch/pull/7307) replace full-packument fetches with `registry.npmjs.org/-/package/<name>/dist-tags` and add an explicit timeout. The author reports tens-of-MB-per-request savings on packages like `codex`/`opencode`/`openclaw` and eliminates spinning "checking version" cards.
- **TPS in RequestLogTable** — [#3369](https://github.com/farion1231/cc-switch/pull/3369) surfaces `output_tokens / latency` in the request log when both are valid, giving operators a direct throughput diagnostic.
- **Backup retention bug** — [#7320](https://github.com/farion1231/cc-switch/issues/7320) flagged `cleanup_old_backups` only pruning `.json` snapshots; SQLite `.db` backups grew to **530 MB in 11 days** in one install (closed after triage).

## 5. Stability & Regressions

**High severity (open, recurring):**

- **Missing `call_id` on tool outputs → DeepSeek 400 / session deadlock** — [#6995](https://github.com/farion1231/cc-switch/issues/6995) and [#7074](https://github.com/farion1231/cc-switch/issues/7074) report Codex Desktop's heartbeat automation and `send_message_to_thread` injecting `function_call_output` items without `call_id`. Once the thread is poisoned, every subsequent request returns 400 and the session cannot self-heal; only opening a new thread works. **Fix shipped:** [#7374](https://github.com/farion1231/cc-switch/pull/7374) re-emits these as user messages on both Responses→Chat and Responses→Anthropic paths.
- **`tool_call_id` length / `tool_use_id=""` from sub-agents** — [#7156](https://github.com/farion1231/cc-switch/issues/7156) and [#7230](https://github.com/farion1231/cc-switch/issues/7230) (Codex sub-agents, 8/8 tasks fail). Same root cause as above; included in [#7374](https://github.com/farion1231/cc-switch/pull/7374).
- **Empty text blocks on Anthropic passthrough** — [#7373](https://github.com/farion1231/cc-switch/pull/7373) (open) addresses [#7243](https://github.com/farion1231/cc-switch/issues/7243) where stale Claude Code jsonl with empty assistant text blocks cause every replay to 400 on `messages: text content blocks must be non-empty`.
- **Cross-provider replay with foreign `reasoning` fields** — [#7333](https://github.com/farion1231/cc-switch/issues/7333) (closed) saw Codex sessions on third-party routes replay a `reasoning` payload that the official Responses endpoint rejects.
- **Codex provider switching breaks old threads** — [#6658](https://github.com/farion1231/cc-switch/issues/6658), [#7211](https://github.com/farion1231/cc-switch/issues/7211), [#7310](https://github.com/farion1231/cc-switch/issues/7310), [#7362](https://github.com/farion1231/cc-switch/issues/7362), [#7257](https://github.com/farion1231/cc-switch/issues/7257), [#7353](https://github.com/farion1231/cc-switch/issues/7353). Codex stores `model_provider` per-thread in `~/.codex/state_5.sqlite`; switching providers leaves threads that reference a now-unknown provider, which Codex refuses to load. Active feature thread is [#7362](https://github.com/farion1231/cc-switch/issues/7362); [#7311](https://github.com/farion1231/cc-switch/pull/7311) covers the related stale-managed-OAuth-switch case.
- **WSL atomic-write failure** — [#6596](https://github.com/farion1231/cc-switch/issues/6596) reports `os error 50` (`\\wsl.localhost\Debian\...` does not support the rename-based atomic write used for safe credential restore). No fix yet.

**Medium severity:**

- **Reasoning effort silently dropped on Grok 4.6** — closed via [#7318](https://github.com/farion1231/cc-switch/pull/7318); follow-ups in [#7369](https://github.com/farion1231/cc-switch/pull/7369) and [#7370](https://github.com/farion1231/cc-switch/pull/7370).
- **Tool `description: null` serializes to strict OpenAI gateways** — closed via [#7319](https://github.com/farion1231/cc-switch/pull/7319).
- **Trailing `reasoning_content` after text opens a phantom thinking block on Anthropic SSE** — [#6911](https://github.com/farion1231/cc-switch/pull/6911) (closes [#6903](https://github.com/farion1231/cc-switch/issues/6903)).
- **Hosted web_search tool_choice mismatch** — [#7366](https://github.com/farion1231/cc-switch/pull/7366) (open) maps Anthropic `tool_choice: {type:"tool", name:"web_search"}` to Responses `tool_choice: "required"` because Grok/xAI New-API gateways don't recognize the OpenAI hosted selector.
- **URL-only MCP servers corrupted on Codex import** — [#6755](https://github.com/farion1231/cc-switch/pull/6755) (open) infers `type=http` instead of `stdio` when only `url=` is set.

**Platform / packaging:**

- **Linux AppImage blank window** on Wayland — [#7335](https://github.com/farion1231/cc-switch/issues/7335) (closed) traced to a bundled `libwayland-client` failing `EGL_BAD_PARAMETER`; shipped appimage needs to drop or update the bundled lib.
- **deb/rpm in-app updater fails with `os error 13`** — [#7336](https://github.com/farion1231/cc-switch/issues/7336) (closed) — binaries don't carry the bundle-type marker that `tauri-plugin-updater` 2.10.0 expects.
- **WSL tool version shows Ubuntu MOTD** — [#7347](https://github.com/farion1231/cc-switch/issues/7347) (closed) — version probe parses the distro release number out of `MOTD` output.
- **OMO config not detected when OpenCode dir lives inside WSL** — [#7367](https://github.com/farion1231/cc-switch/pull/7367) (open) adds `derive_wsl_home_dir` so OMO ≥ 4.19.3's unified config is located on the WSL side.
- **Windows Terminal default profile ignored** — [#5322](https://github.com/farion1231/cc-switch/issues/5322) still affects v3.17.0; two hardcoded `wt cmd /K` launch paths bypass the user's default profile.

**Usage-sync regressions (closed):**

- Windows leaves JSONL `mtime` unchanged while appending → usage missing since 2026-08-01. Fixed in three layers ([#6027](https://github.com/farion1231/cc-switch/pull/6027), [#6080](https://github.com/farion1231/cc-switch/pull/6080), [#6246](https://github.com/farion1231/cc-switch/pull/6246)) by persisting a `last_size` cursor alongside `mtime` and treating a rollout as changed if either moves.

## 6. What This Means for Application Developers

- **If you proxy Codex Desktop traffic to DeepSeek (or any gateway that requires non-empty `call_id`/`tool_use_id`):** upgrade to the build containing [#7374](https://github.com/farion1231/cc-switch/pull/7374). Without it, a single heartbeat or sub-agent dispatch can permanently poison a thread — there is no in-app recovery.
- **Treat Codex threads as provider-scoped.** Switching providers via CC Switch does not rewrite `state_5.sqlite`, so any pre-existing thread that references the old `model_provider` will fail to load. Until [#7362](https://github.com/farion1231/cc-switch/issues/7362) lands, advise users to start a fresh thread after a provider switch, or back up and edit `model_provider` manually.
- **Reasoning-effort values are no longer safe to forward verbatim.** o-series accepts only low/medium/high ([#7370](https://github.com/farion1231/cc-switch/pull/7370)), and Grok ≥ 4.5 needs explicit whitelist coverage ([#7369](https://github.com/farion1231/cc-switch/pull/7369)). If you configure a custom provider, pin `reasoning.effort` on the client side rather than relying on passthrough.
- **Linux distribution users: prefer AppImage that ships a recent `libwayland-client`** or run under XWayland; the stock v3.20.3 AppImage exhibits a blank window on GNOME Wayland until [#7335](https://github.com/farion1231/cc-switch/issues/7335)'s fix is rebuilt. `dpkg`/`rpm` users should update via the package manager, not in-app.
- **Request-log operators now get TPS** in [#3369](https://github.com/farion1231/cc-switch/pull/3369); useful for spotting provider-side slowdowns before they show up as user-facing latency.
- **Volcengine dual-plan accounts** ([#6518](https://github.com/farion1231/cc-switch/pull/6518)) — make sure each provider's `base_url` correctly identifies the plan (`/api/coding` vs `/api/plan`); otherwise quota numbers will be wrong even though the rest of the routing works.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-14

## Today's Highlights

The most consequential item is a **critical memory regression** flagged in [Issue #7361](https://github.com/QuantumNous/new-api/issues/7361): `v1.0.0-rc.37` is reported to hold ~1.8 GB resident memory versus ~75 MB on `rc.36`, triggering OOM on small-memory hosts. On the security side, [PR #7344](https://github.com/QuantumNous/new-api/pull/7344) hardens upstream URL validation in the ratio-sync path against SSRF, and the long-standing silent interaction between `param_override` and `pass_through_body_enabled` is fixed in [PR #7346](https://github.com/QuantumNous/new-api/pull/7346). Otherwise the queue is dominated by front-end polish and small relay-stream edge cases.

---

## Releases & Breaking Changes

No new tagged releases in the last 24 hours. Operators on `rc.37` should weigh the memory-regression report (#7361) before rolling out, especially on ≤1 GB hosts. Migration notes will likely accompany the next release once #7361 is triaged.

---

## New Model & Hardware Support

- **vLLM channel backend** — [PR #7332](https://github.com/QuantumNous/new-api/pull/7332) (`feat: vllm channel`) introduces a first-class vLLM channel type, broadening the set of inference engines new-api can natively relay to alongside the existing OpenAI / Anthropic / Gemini adapters.
- **Gemini 3.x compute-tier suffix preservation** — [PR #7339](https://github.com/QuantumNous/new-api/pull/7339) (now closed/merged) prevents `ApplyReasoningModelSuffix` from stripping `-high` / `-low` style suffixes after model mapping, so requests like `gemini-3.8-flash → gemini-3.8-flash-high` survive the relay pipeline. ([Issue](https://github.com/QuantumNous/new-api/issues) context inside the PR.)
- **Codex model recognition** — [PR #7364](https://github.com/QuantumNous/new-api/pull/7364) ensures `codex-*` model names render with the OpenAI icon in usage logs, fixing the cosmetic bug in [#7363](https://github.com/QuantumNous/new-api/issues/7363).

No new quantization format or hardware backend (CUDA/ROCm/Metal/CPU) changes were landed today.

---

## Performance & Optimization

- **Allocation reduction on chat responses fallback** — [PR #5577](https://github.com/QuantumNous/new-api/pull/5577) (`perf: reduce chat responses fallback usage allocation`) targets the `relaykit/relayconvert` Responses-stream fallback path. Lower per-request allocation in this branch translates directly to less GC pressure on high-QPS relays that occasionally round-trip through the Responses API.
- **Stream finalization on OAI→Claude conversion** — [PR #7351](https://github.com/QuantumNous/new-api/pull/7351) force-finalizes the stream when the upstream OpenAI-compatible gateway omits a usage chunk, preventing clients from hanging or mis-accounting tokens. Reduces tail latency variance for Claude-format calls behind non-standards-compliant gateways.
- **Frontend test stability** — [PR #7367](https://github.com/QuantumNous/new-api/pull/7367) addresses flaky motion/visibility races in the web test suite, shortening CI feedback loops rather than user-facing perf.

Concrete throughput numbers are not provided in these PRs; expect them on `main` only after benchmarks are run.

---

## Stability & Regressions

Ranked by severity:

1. **[HIGH] Resident-memory regression on `rc.37`** — [Issue #7361](https://github.com/QuantumNous/new-api/issues/7361). Reported jump from ~75 MB to ~1.8 GB; OOM on small VPS instances. No fix PR yet — **operators on `rc.37` should hold or pin to `rc.36`** until triaged.
2. **[MEDIUM] `param_override` silently dropped on passthrough channels** — [Issue #7348](https://github.com/QuantumNous/new-api/issues/7348) (duplicates #7345, #7347 closed as invalid). Fixed by [PR #7346](https://github.com/QuantumNous/new-api/pull/7346): a new `buildPassthroughRequestBody` helper applies `param_override` on the passthrough path. Severity is medium because the two flags are now confirmed mutually exclusive and behavior matches documentation going forward.
3. **[MEDIUM] SSRF surface in `FetchUpstreamRatios`** — [PR #7344](https://github.com/QuantumNous/new-api/pull/7344) is the fix; flagging here for awareness of the underlying risk in unpatched instances.
4. **[LOW] `Endpoint Type` combobox auto-opens on dialog focus** — [Issue #7360](https://github.com/QuantumNous/new-api/issues/7360) (duplicates #7358, #7359 closed as invalid). Fixed by [PR #7365](https://github.com/QuantumNous/new-api/pull/7365).
5. **[LOW] Dashboard weekly default range unselected** — [Issue #7354](https://github.com/QuantumNous/new-api/issues/7354); fixed by [PR #7355](https://github.com/QuantumNous/new-api/pull/7355).
6. **[LOW] `xAI grok-imagine-video` listing but failing** — [Issue #7352](https://github.com/QuantumNous/new-api/issues/7352) closed as duplicate of a prior report; no new fix shipped today.
7. **[LOW] `codex-*` model icon** — [#7363](https://github.com/QuantumNous/new-api/issues/7363), fixed by [#7364](https://github.com/QuantumNous/new-api/pull/7364).

PRs closed without merge today: [#7102](https://github.com/QuantumNous/new-api/pull/7102) (refactor, Go `max`/`min`), [#7342](https://github.com/QuantumNous/new-api/pull/7342) (internal API key), [#7349](https://github.com/QuantumNous/new-api/pull/7349) (initial commit), [#7353](https://github.com/QuantumNous/new-api/pull/7353) (video routing by supplier cost), [#7362](https://github.com/QuantumNous/new-api/pull/7362) (Claude archive). None indicate a regression on `main`.

---

## What This Means for Application Developers

- **Pin your build carefully.** If you self-host on a ≤1 GB VM, do **not** upgrade to `rc.37` until #7361 is resolved; stay on `rc.36` or whichever tag your deployment has baseline-tested.
- **Passthrough + param_override now behaves as documented.** If you were avoiding `param_override` on passthrough channels as a workaround, [PR #7346](https://github.com/QuantumNous/new-api/pull/7346) re-enables it on the next release — review your override payloads for fields that should remain user-controlled.
- **New vLLM channel is coming.** [PR #7332](https://github.com/QuantumNous/new-api/pull/7332) means you can route traffic directly to a self-hosted vLLM endpoint as a peer to OpenAI/Anthropic channels, simplifying hybrid SaaS + self-hosted topologies.
- **Long-stream Claude calls are safer.** [PR #7351](https://github.com/QuantumNous/new-api/pull/7351) eliminates the edge-case where OpenAI-compatible upstreams that don't honor `stream_options.include_usage` would leave Claude-format clients without a final usage/timing event.
- **Observability upgrades.** [PR #7356](https://github.com/QuantumNous/new-api/pull/7356) adds CSV export for usage logs (admin: all rows; user: self-only, up to 10k), which is convenient for offline cost reconciliation without scraping the UI.
- **Sub-path deployments get easier.** [PR #7350](https://github.com/QuantumNous/new-api/pull/7350) introduces a global `NEW_API_ROUTE_PREFIX` for `/v1`, `/api`, `/pg`, `/mj`, `/oauth`, etc. — relevant if you sit new-api behind a reverse proxy with a non-root mount point.
- **Security posture improves.** [PR #7344](https://github.com/QuantumNous/new-api/pull/7344) closes the ratio-sync SSRF gap; if you expose the admin API on a public ingress, prioritize this update.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*