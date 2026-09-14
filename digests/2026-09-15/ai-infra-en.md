# AI Infrastructure Digest 2026-09-15

> Generated: 2026-09-14 23:30 UTC | Projects covered: 9

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

# AI Infrastructure Cross-Project Report — 2026-09-15

**Scope:** vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth, Claude Code Router (CCR), CC Switch, New API
*Methodology note: counts are digest-surfaced items in the 24h window, not total repo volume; only New API publishes explicit counts (41 issues / 31 PRs).*

---

## 1. Ecosystem Overview

The ecosystem's center of gravity today is **DeepSeek-V4/V4.1**, which dominates kernel-level work at both vLLM and SGLang — and simultaneously produces the worst production-stability bugs (TP-worker hangs, illegal memory accesses, HBM exhaustion). **AMD gfx950/MI350X has effectively reached first-class status**, with both engines landing FP8/FP4 MoE paths for the platform within the same 24-hour window. A quieter theme is **correctness debt around hybrid linear-attention models** (Qwen3.5/GDN, mamba hybrids, Nemotron-3): prefix-cache and spec-decode bugs now span every serving layer. Above the engines, the **agent tooling stratum** (gateways, routers, protocol translators) is maturing fast but fragile, with reasoning-block translation and tool-call fidelity as the recurring failure points. Release discipline is mixed: only llama.cpp (v0.4.1) and Ollama (v0.34.1-rc1) shipped, while New API sits at RC.37 with an unfixed ~24× memory regression.

---

## 2. Activity Comparison

| Project | Layer | Issues (24h) | PRs (24h) | Release status | Dominant theme |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~20 | ~15 | None (v0.29.0) | DSV4.1 ROCm perf (RFC #56506), MRV2 consolidation, 12-item stability backlog |
| **SGLang** | Serving engine | ~16 | ~14 | None | DSV4.1 kernel unification (#39370), AMD enablement, HiCache correctness bugs |
| **llama.cpp** | Local inference core | ~10 | ~14 | **v0.4.1** (ggml v0.24.0, breaking API) | Backend robustness; SYCL graph replay; RPC multi-client |
| **Ollama** | Local runtime | ~17 | ~8 | **v0.34.1-rc1** | MLX hardening; regression wave since 0.30 (CUDA 5×, load slowdown) |
| **LiteLLM** | LLM gateway | ~19 | ~15 | None | Responses-bridge reasoning loss; spend/budget correctness; control-plane OOM fixes |
| **Unsloth** | Fine-tuning → agent runtime | ~17 | ~11 | None (0.1.808-beta) | Studio hardening; sandbox-escape fix (#10907); training stack silent |
| **CCR** | Agent proxy/router | ~5 | ~4 | None | Codex desktop launch fix (#1796); protocol translation cleanup |
| **CC Switch** | Provider switcher/proxy | ~20 | ~17 | None (v3.20.3) | Codex session persistence; Antigravity migration |
| **New API** | Self-hosted gateway | **41** | **31** | None (v1.0.0-rc.37) | RC.37 memory regression (#7361); users demanding GA criteria (#7279) |

**Takeaway:** Fix velocity is high everywhere, but only llama.cpp converted it into a clean tagged release. New API shows the highest raw volume with the weakest release posture (37 RCs and counting).

---

## 3. Model Support Race

| Model / architecture | vLLM | SGLang | llama.cpp / Ollama | Others |
|---|---|---|---|---|
| **DeepSeek-V4/V4.1** | Perf RFC + gfx950 kernels (#56743, #56560); TP-hang #41530, H20 crash #56389 | DSpark unification #39370; **working DSV4.1-Flash on MI350X** #39186 | — | LiteLLM: DSML tool-parser hardening (#38924 upstream) |
| **Hybrid GDN / mamba (Qwen3.5, Nemotron-3)** | Supported; prefix-cache + MTP bugs (#53142, #43587, #54691, #56790) | Supported; checkpoint corruption #39342, MAMBA pruning #33713 | Qwen3.5 MTP under-tuned on sm_120 (#28196: 76% roofline) | Ollama: model-specific EOS loss (#18442) |
| **New architectures this cycle** | — | — | **Maple 20B-A1B, Tencent Hy 4, Spark2.5 shipped**; GigaChat-3.5-432B in flight (#25342) | — |
| **GLM-5.3-Flash** | Quality bug: repeated-token collapse (#56605) | Crash #39072; AMD FP8 KDA #38764 | — | Ollama: tool-call fragility (#18390) |
| **Diffusion / image gen** | — | **LLaDA-Image native diffusion serving #37907** + SenseNova U1.5 #38593 (unique) | — | Unsloth: Gemma 4 image input fixed (#10559) |
| **Spec decoding** | Kimi K2.6 EAGLE3-MLA validated stack closed (#40608); DDTree/UNO proposals | DSpark MTP integrated | MTP/DFlash2 present, perf + TDR issues | — |

**Verdict:** llama.cpp leads **breadth** (3 new architectures + 1 in-flight, uncontested). vLLM/SGLang lead **frontier depth** on DSV4.1 — SGLang is ahead on shipping a *working* AMD path, vLLM ahead on systematic optimization (RFC-driven) and validated spec-decode stacks. SGLang is alone in expanding beyond LLM serving into diffusion.

---

## 4. Performance Frontier

Effort concentrates in six clusters:

1. **Frontier MoE kernels (DSV4.1)** — decode top-k (gfx950 K=512 #56743), MXFP8 dequant-once (#56560), DSpark decode+prefill unification (#39370), CUTLASS 4.6 dynamic epilogue fusions tracked (#30809). vLLM's RFC explicitly concedes "a lot of the device left on the table" (baseline: 8.97 out-tok/s/GPU, TP4, 8×MI355X).
2. **KV cache — correctness before speed** — vLLM extensible-KV productization (#56492), FS-tier offload RFCs (#54363, #51240), Mooncake heterogeneous-TP (#54307); SGLang Intel-XPU HiCache (#39447) but **three open HiCache correctness bugs** (#39444, #39147, #33713); Ollama experimental prefill persistence (#17953) vs. hard 8 GiB cap (#18131). Distributed KV for agents is a top-voted roadmap item (SGLang #21846, 30 👍).
3. **Launch-overhead elimination** — llama.cpp SYCL graph record/replay (#28725), GPU-resident TOP_K (#28670); SGLang JIT-build hoisting off the hot path (#37525); vLLM CUDA-graph padding-slot write skip (#35351 upstream pattern).
4. **Scheduling/batching** — vLLM cost-aware preemption victim selection (#56897) and native forward-pass metrics (#52061); llama.cpp reranker batch-splitting (#28876).
5. **Speculative decoding growing pains** — vLLM DFlash is a **4.4× net loss at 185k context** on hybrid GDN (#54691) with no per-length disable hook; speculative prefill abandoned (#39060); sm_120 MTP under-tuned (#28196). MTP + long context + hybrid attention is the unsolved triangle.
6. **Gateway data plane** — LiteLLM usage-aggregation OOM fix (top-100-key cap, #41143) and health-check write amplification (#41145); New API LRU rate-limiter rewrite (#6807). This is control-plane memory, not inference perf.

---

## 5. Layer Positioning

- **Serving engines (vLLM, SGLang)** — near-identical workload focus today. vLLM: broader hardware matrix + architectural consolidation (MRV2 → default). SGLang: faster frontier-model enablement (AMD paths landed first, diffusion arriving) and disagg/PD depth — but the Rust frontend drops PD bootstrap fields (#39412), a disagg-traffic blocker.
- **Local inference core (llama.cpp)** — the portability/breadth play. Multi-vendor backend hardening (SYCL/HIP/CUDA/Vulkan) plus RPC multi-client (#28916) quietly positions it as a *serving substrate* for router-mode multi-model deployments — i.e., infrastructure for the layers above it.
- **Local runtime (Ollama)** — product layer over llama.cpp + MLX, currently in a regression trough (CUDA ~5× #18225, load slowdown #18373, MLX long-context OOM #18231). MLX is both its differentiator and its dominant bug surface.
- **Gateways (LiteLLM, New API)** — LiteLLM is the multi-vendor enterprise gateway (spend, budgets, guardrails) — but billing-correctness bugs (#27735, #39370, #22984) undercut its core value prop. New API is the self-hosted relay/billing play, now making **vLLM and SGLang first-class channels** (#7332) — the two are converging from opposite directions.
- **Agent routing (CCR, CC Switch)** — single-user/desktop protocol shims whose entire surface is Anthropic↔OpenAI↔Responses translation and provider-identity management. They hit the same fragility LiteLLM sees at tenant scale, at desktop scale.
- **Fine-tuning (Unsloth)** — nominally the training layer, but ~all of today's activity is agent-runtime hardening (sandbox escape #10907, tool-call re-execution #10791). **Layer blurring:** Unsloth is drifting toward local agent runtime; the training stack was silent.

---

## 6. Trend Signals

1. **DeepSeek-V4.1 is the workload of record — and the top crash source.** Test beyond happy paths: concurrency >256 (vLLM #56389) and long-context HBM pressure (SGLang #39441).
2. **AMD reached parity for FP8/FP8 MoE serving** — same-day kernel landings in both engines. Counter-signal: llama.cpp #28211 (silent *wrong logits* on gfx1151/Strix Halo) shows consumer-AMD correctness still lagging datacenter AMD.
3. **Prefix/KV-cache correctness is now a cost line-item.** Silent cache misses (Ollama #18431 per-turn invalidation via Anthropic-compat, SGLang #39444/#39147, vLLM #43587) directly inflate spend and break agent latency budgets.
4. **Reasoning-block fidelity across protocol bridges is the #1 integration fragility** — LiteLLM drops `reasoning_text` (#40654, #40887), CCR strips it to survive upstream 400s (#1784, #1702), CC Switch duplicated it into 120k-token loops (#5860, fixed). Verify reasoning end-to-end through any bridge.
5. **Tool calling is the weakest primitive at every layer** (Ollama silent discard #17274; Unsloth nested-field drops + double-execution #10935/#10791; New API Ollama streaming fix #7376). Treat `tool_calls: []` as suspect; app-layer retries and audit logs remain mandatory.
6. **Release hygiene is diverging** — llama.cpp ships clean with breaking-change migration notes; New API is at RC.37 with a 75 MB → 1.8 GB memory regression and users formally requesting GA exit criteria (#7279). Current pin guidance: New API **rc.36**; Ollama **0.32.13** for CUDA paths / **v0.34.1-rc1** for MLX; vLLM `max_num_seqs=256` mitigation on H20 DSV4.1.
7. **Speculative decoding is default-on in marketing, net-negative in the tails** — demand per-context-length disable hooks before enabling MTP/DFlash on hybrid models at long context (vLLM #54691).
8. **Security is arriving at the local agent layer** — Unsloth's sandbox-escape fix (#10907) and CC Switch's move to reversible typed masking (#7306) foreshadow tighter scrutiny of runtimes with filesystem/tool access.

**Watch list for the next cycle:** SGLang's HiCache fix cluster (unblocks Mooncake-backed agent deployments); LiteLLM #41144-class bridge fixes; vLLM RFC #56506 follow-up kernels (AMD headroom); llama.cpp #28211 HIP correctness fix; New API RC.38 memory fix; Ollama CUDA regression resolution.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-15

## 1. Today's Highlights

- **DeepSeek-V4.1 is the dominant workload focus today**: a new performance RFC ([#56506](https://github.com/vllm-project/vllm/issues/56506)) lays out MI355X/gfx950 headroom with concrete throughput numbers, paired with two landing ROCm kernels — the gfx950 K=512 decode top-k path ([PR #56743](https://github.com/vllm-project/vllm/pull/56743)) and an MXFP8 dequant-once fallback when `tl.dot_scaled` cannot be used ([PR #56560](https://github.com/vllm-project/vllm/pull/56560)).
- **Model Runner V2 (MRV2) is consolidating into default territory**: buffer simplifications ([PR #56888](https://github.com/vllm-project/vllm/pull/56888)), a TPU cleanup ([PR #56898](https://github.com/vllm-project/vllm/pull/56898)), WSL pinned-memory tolerance ([PR #56908](https://github.com/vllm-project/vllm/pull/56908)), and a merged pooling fix on non-final PP ranks ([PR #56666](https://github.com/vllm-project/vllm/pull/56666)) close several long-standing sharp edges in one sweep.
- **Two reliability bugs deserve immediate attention**: the OTLP traces endpoint silently dropping spans ([Issue #56696](https://github.com/vllm-project/vllm/issues/56696), already closed) and a Triton illegal-memory-access in `dsv4_topk` on 8×H20 under high concurrency ([Issue #56389](https://github.com/vllm-project/vllm/issues/56389)) — both affect `v0.29.0`-era serving stacks.

## 2. Releases & Breaking Changes

No new releases in the last 24h. Note that `v0.29.0` is the current shipping wheel and is affected by several issues catalogued below (#56696, #56605, #53142, #41530, #56370). No API/config breakage was introduced today.

## 3. New Model & Hardware Support

- **ROCm/MI355X (gfx950)** — explicit K=512 top-k path for DSV4.1 decode in [PR #56743](https://github.com/vllm-project/vllm/pull/56743); MXFP8 weight dequant path added in [PR #56560](https://github.com/vllm-project/vllm/pull/56560).
- **RDNA3 (gfx1100)** — bug surfaced showing the fused MoE path hardcodes 2× gated activation factor, breaking non-gated (relu2) models like Nemotron-3 ([Issue #56790](https://github.com/vllm-project/vllm/issues/56790)). Fix expected in a follow-up.
- **NVIDIA RTX PRO 6000 (Blackwell, sm_120)** — DeepSeek-V4 fails to load on this SKU ([Issue #40821](https://github.com/vllm-project/vllm/issues/40821)); recurring Xid 13 warp errors on SM120 under sustained Nemotron-3.5-NVFP4 / hybrid Mamba load ([Issue #52225](https://github.com/vllm-project/vllm/issues/52225)).
- **H20 (SM90)** — MoE routing kernel `dsv4_topk` illegal memory access at `max_num_seqs > 256` for DeepSeek-V4.1-Flash ([Issue #56389](https://github.com/vllm-project/vllm/issues/56389)).
- **Kimi K2.6 / EAGLE3-MLA MTP** — closed tracking issue documenting the validated Blackwell serving stack and the PR chain to reconstruct it from upstream ([Issue #40608](https://github.com/vllm-project/vllm/issues/40608)).
- **WSL** — MRV2 now tolerates absent pinned memory via UVA fallbacks ([PR #56908](https://github.com/vllm-project/vllm/pull/56908)).
- **New speculative decoder proposals**: DDTree ([Issue #40809](https://github.com/vllm-project/vllm/issues/40809)) and UNO diffusion-augmented LLM ([Issue #55267](https://github.com/vllm-project/vllm/issues/55267)).
- **Spec-decoding feature, speculative prefill** (draft-assisted sparse prefill) closed as not-pursued in its current form ([Issue #39060](https://github.com/vllm-project/vllm/issues/39060)).

## 4. Performance & Optimization

- **DSV4.1-Flash on 8× MI355X, TP4, MXFP4 MoE + DSpark MTP** — baseline (RFC [#56506](https://github.com/vllm-project/vllm/issues/56506)): 35.89 out-tok/s per node at concurrency 1 (8.97/GPU); the RFC explicitly identifies "a lot of the device left on the table" on gfx950 and motivates the two PRs above.
- **DFlash on Qwen3.5 hybrid GDN models** — single-stream decode collapses from ~71 tok/s (spec off) to ~16 tok/s (DT=4) at ~185k context; at short context the same setup gives 218 tok/s at DT=8. Drafter rescans accumulated KV every cycle and there is no per-sequence-length disable hook. Tracked in [Issue #54691](https://github.com/vllm-project/vllm/issues/54691).
- **Hybrid GDN prefix-cache + MTP spec decoding** — fix PR restores hits for prompts that previously got zero hits when length was a multiple of the hash unit ([PR #52244](https://github.com/vllm-project/vllm/pull/52244), tested live on Qwen3.5-122B-A10B with a 1072-token GDN page).
- **Hybrid mamba prefix-cache resume** — illegal memory access in `MambaHybridModelState.add_request` when explicit `--block-size` seeds the state column with the wrong block size ([Issue #53142](https://github.com/vllm-project/vllm/issues/53142), v0.27.1 / V2 runner).
- **V1 scheduler preemption** — cost-aware victim selection under KV-cache pressure landed in [PR #56897](https://github.com/vllm-project/vllm/pull/56897); current behavior picks by iteration order which doesn't account for KV footprint.
- **Native forward-pass metrics** — opt-in async emission including for speculative decoding, without adopting Dynamo's `InstrumentedScheduler` ([PR #52061](https://github.com/vllm-project/vllm/pull/52061)).
- **KV offload tiering** — RFCs on data integrity / I/O liveness for the FS tier ([#54363](https://github.com/vllm-project/vllm/issues/54363)) and admission policy to stop cascade/promotion pile-ups ([#51240](https://github.com/vllm-project/vllm/issues/51240)). Mooncake Store heterogeneous-TP sharing for hybrid KV cache extends in [PR #54307](https://github.com/vllm-project/vllm/pull/54307).
- **Extensible KV cache** — productization of the demonstration PR ([#56492](https://github.com/vllm-project/vllm/pull/56492)); foundational for pluggable KV policies.
- **MoE routed-expert payloads over the Rust frontend** — terminal-frame auxiliary serialization without breaking Rust schema ([PR #56778](https://github.com/vllm-project/vllm/pull/56778)).
- **CI/runtime** — `pytorch-fullgraph-test` sharded 1→4 ([PR #56877](https://github.com/vllm-project/vllm/pull/56877)); V1 KV Connectors sharded 1→4, dropping the job from ~44.2 min p90 to within a 20-min budget ([PR #56324](https://github.com/vllm-project/vllm/pull/56324)); MI250 DinD deprecation ([PR #56162](https://github.com/vllm-project/vllm/pull/56162)).

## 5. Stability & Regressions

Ranked by deployment impact:

1. **[Issue #56389](https://github.com/vllm-project/vllm/issues/56389) — Triton illegal memory access in `dsv4_topk` on 8×H20, DSV4.1-Flash at high concurrency.** Mitigated by `max_num_seqs=256`. No fix PR linked yet.
2. **[Issue #41530](https://github.com/vllm-project/vllm/issues/41530) — TP worker hang → `EngineDeadError` on DeepSeek-V4-Pro TP=8 + MTP.** `sample_tokens` RPC times out; affects production serving stacks.
3. **[Issue #56696](https://github.com/vllm-project/vllm/issues/56696) — `--otlp-traces-endpoint` initializes tracer but never sends spans** (`instrument_otel`/`manual_instrument_otel` never invoked). Closed; reproducer on `vllm/vllm-openai:latest` and on dev fork. If you rely on OTLP trace export for SLOs/cost attribution, treat current 0.29.0 as not exporting.
4. **[Issue #56370](https://github.com/vllm-project/vllm/issues/56370) — Batch invariance broken with `VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp`.** Reproduced on 4× RTX PRO 6000 PCIe with main @ 7470082f5 / precompiled 0.29.0.
5. **[Issue #54691](https://github.com/vllm-project/vllm/issues/54691) — DFlash net loss at long context on hybrid GDN models**, ~4.4× slowdown at 185k. No per-sequence-length disable hook.
6. **[Issue #52225](https://github.com/vllm-project/vllm/issues/52225) — Recurring Xid 13 chip-wide warp errors on SM120** under sustained Nemotron-3.5-NVFP4 / hybrid Mamba load; Xid 13 implies GPU reset risk.
7. **[Issue #53142](https://github.com/vllm-project/vllm/issues/53142) — Hybrid mamba illegal memory access on prefix-cache resume with explicit `--block-size`.**
8. **[Issue #56605](https://github.com/vllm-project/vllm/issues/56605) — GLM-5.3-Flash "word salad" (repeated-token collapse) in multi-turn agentic use.** Quality, not crash, but high user-visible impact.
9. **[Issue #43587](https://github.com/vllm-project/vllm/issues/43587) — Prefix caching fails for incremental multimodal requests on Qwen3.5 (Mamba-Attention hybrid).**
10. **[Issue #32588](https://github.com/vllm-project/vllm/issues/32588) — Whisper segment timestamps increasingly offset (~0.5 s/segment) when audio > 30 s.** Long-form transcription timestamps are unreliable.
11. **[Issue #36802](https://github.com/vllm-project/vllm/issues/36802) — Triton OOR shared memory on Tesla T4** (need 81920, hardware cap 65536).
12. **[Issue #39408](https://github.com/vllm-project/vllm/issues/394

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-15

## Today's Highlights

The SGLang team's attention today is dominated by DeepSeek-V4/V4.1 performance work and a wave of KV-cache correctness bugs. Highlights: PR [#39370](https://github.com/sgl-project/sglang/pull/39370) combines the DSpark decode+prefill kernel optimizations for DSV4.1, and PR [#39186](https://github.com/sgl-project/sglang/pull/39186) lands DeepSeek-V4.1-Flash on AMD MI350X (gfx950). On the stability side, three new bugs surfaced within the last 24 hours — Rust frontend PD bootstrap fields silently dropped ([#39412](https://github.com/sgl-project/sglang/issues/39412)), `HiCache write_through` failing to persist first-seen prefixes before eviction ([#39444](https://github.com/sgl-project/sglang/issues/39444)), and mamba radix cache checkpoints being corrupted by `--enable-mixed-chunk` ([#39342](https://github.com/sgl-project/sglang/issues/39342)). No release was published in the last 24 hours.

---

## Releases & Breaking Changes

No new SGLang releases were published in the last 24 hours. Note that PR [#39012](https://github.com/sgl-project/sglang/pull/39012) bumps `transformers` 5.12.1 → 5.17.0 (and `tokenizers` 0.22.2 → 0.23.2), which removes the long-standing `tokenizers<0.23` compat constraint and lands the upstream vision rotary refactor — once merged, downstream consumers no longer need to pin the older tokenizers.

---

## New Model & Hardware Support

- **AMD MI350X (gfx950) — DeepSeek-V4.1-Flash** ([#39186](https://github.com/sgl-project/sglang/pull/39186)): TP4+EP4 with HIP siblings of the DeepSeek V4 JIT kernels, sorted epilogue in the AOT top-k transformer, and cross-platform dispatch hooks. Stacked on the `dsv4.1` branch.
- **AMD Qwen3-Next on gfx950** ([#39140](https://github.com/sgl-project/sglang/pull/39140)): fused TP4 all-reduce + Gemma RMSNorm + per-group FP8 quant. The two layers are independently useful.
- **AMD GLM5 PTPC FP8 KDA projections** ([#38764](https://github.com/sgl-project/sglang/pull/38764)): opt-in repack of selected GLM-5.3-Flash KDA projections to per-channel FP8, including `o_proj` via fused gated RMSNorm.
- **LLaDA-Image diffusion serving** ([#37907](https://github.com/sgl-project/sglang/pull/37907)): native Diffusion path for `InclusionAI/LLaDA-Image` (and -Turbo, FP8 variants), covering T2I, image editing, sequence parallelism.
- **SenseNova-U1.5 prompt enhancement** ([#38593](https://github.com/sgl-project/sglang/pull/38593)): prompt enhancement for T2I on top of the base text-to-image support, tracked under [#37742](https://github.com/sgl-project/sglang/issues/37742).
- **Intel XPU HiCache L1/L2 transfer backend** ([#39447](https://github.com/sgl-project/sglang/pull/39447)): initial implementation of HiCache host/device transfer on XPU.
- **DeepSeek-V4.1 perf tracking on NVIDIA** ([#33636](https://github.com/sgl-project/sglang/issues/33636)) and **DeepSeek-V4 / V3.2 DSML tool-call parser** hardening (issue [#38924](https://github.com/sgl-project/sglang/issues/38924)) continue.

---

## Performance & Optimization

- **DSV4.1 DSpark kernel unification** ([#39370](https://github.com/sgl-project/sglang/pull/39370)): combines PRs #39301 / #39336 with the existing `dsv4.1` optimizations and auto-selects the supported small-batch paths. Targets decode time lost to small kernel launches and padded attention heads.
- **DSV4 BCG Indexer memory reduction** ([#36534](https://github.com/sgl-project/sglang/pull/36534)): optimizes the heavy memory use of the C4 Indexer when BCG (block-sparse compressed generation?) is enabled.
- **MXFP8-KV padding slot skip** ([#35351](https://github.com/sgl-project/sglang/pull/35351)): skips writes to the reserved CUDA-graph padding slot in the KV pool — padded lanes no longer perform dummy K/V writes.
- **Engine response wait refactor** ([#39486](https://github.com/sgl-project/sglang/pull/39486)): avoids `asyncio.wait_for` timeouts when no HTTP request object is involved; awaits `state.event.wait()` directly. HTTP callers keep the timed wait and disconnect check.
- **TRTLLM-MLA `fixup_zero_kv` prebuild** ([#37525](https://github.com/sgl-project/sglang/pull/37525)): moves nvcc JIT build out of the request hot path on Blackwell.
- **CUTLASS 4.6 dynamic Epilogue Fusions / IKET profiling** investigation ([#30809](https://github.com/sgl-project/sglang/issues/30809)): tracking item for the next GEMM optimization wave.

---

## Stability & Regressions

**Newly opened (last 24h):**

- **[Bug, high signal] Rust frontend drops PD bootstrap fields** ([#39412](https://github.com/sgl-project/sglang/issues/39412)): on `/v1/chat/completions` and `/v1/completions`, `bootstrap_host` / `bootstrap_port` / `bootstrap_room` are silently lost during lowering to `GenerateRequest` because `dynamo-protocols` request structs don't carry them. Related fix PR [#38939](https://github.com/sgl-project/sglang/pull/38939) addresses missing chat-template fallback, but the bootstrap fields themselves still need a separate patch.
- **[Bug] `--enable-mixed-chunk` corrupts mamba radix cache checkpoints** ([#39342](https://github.com/sgl-project/sglang/issues/39342)): hybrid GDN models' checkpoints are corrupted because mixed batches skip the `extra_buffer` write while still donating the slot.
- **[Bug] HiCache `write_through` does not fully persist first-seen prefixes before eviction** ([#39444](https://github.com/sgl-project/sglang/issues/39444)): with Mooncake Store, a first-seen prefix can be evicted from L1/L2 before all of its KV is backed up; replays miss.
- **[Bug, ROCm] DeepSeek-V4.1 FP4 indexer exhausts HBM under long-context AgentX** ([#39441](https://github.com/sgl-project/sglang/issues/39441)): regression after #37660, on the AMD preview image from the SGLang cookbook.

**Pre-existing, still active:**

- **[Severity: high] HiCacheFile reports unrestorable prefix for hybrid cache pools** ([#39147](https://github.com/sgl-project/sglang/issues/39147)): `HiCacheFile.batch_exists_v2()` returns a hit even when an auxiliary pool cannot restore the prefix.
- **[Severity: high] GLM-5.3 crash on disagg decode + dp-attention + spec decode** ([#39072](https://github.com/sgl-project/sglang/issues/39072)). Fix candidate: PR [#39487](https://github.com/sgl-project/sglang/pull/39487) localizes widened KV ids in the MLA retraction CPU backup/restore (DCP, fixes #38645).
- **[Severity: high] CUDA_ERROR_ILLEGAL_ADDRESS in MXFP8FP4/W4A8 MegaMoE on B300** ([#37559](https://github.com/sgl-project/sglang/issues/37559)).
- **[Severity: medium] CUDA illegal memory access in QSA extend forward** ([#37633](https://github.com/sgl-project/sglang/issues/37633)): triggered at ~22 concurrent requests on Qwen3.8-Flash-Next-FP8 / H20 TP8; suppressed by `CUDA_LAUNCH_BLOCKING=1` and `--disable-overlap-schedule`.
- **[Severity: medium] Gemma-4 mm scheduler crash on non-RGB image** ([#26751](https://github.com/sgl-project/sglang/issues/26751)): single grayscale/RGBA JPEG kills the scheduler and drops every unrelated in-flight request.
- **[Severity: medium] Unified radix cache prunes MAMBA nodes instead of downgrading on device eviction** ([#33713](https://github.com/sgl-project/sglang/issues/33713)): host-tier load-back never attempted.
- **[Severity: medium] DeepSeek V4/V3.2 DSML tool-call parser wraps args in spurious "arguments"/"input"** ([#38924](https://github.com/sgl-project/sglang/issues/38924)).
- **[Severity: low] NPU router GEMM returns bf16 instead of fp32** ([#34861](https://github.com/sgl-project/sglang/issues/34861)).

Tracking/roadmap issues driving the next wave: distributed KV-cache for agentic workloads ([#21846](https://github.com/sgl-project/sglang/issues/21846), high priority, 30 👍), DCP/Helix parallelism ([#29736](https://github.com/sgl-project/sglang/issues/29736)), and the DeepSeek V4 perf-tracking ([#33636](https://github.com/sgl-project/sglang/issues/33636)).

---

## What This Means for Application Developers

- **Agent workloads, beware HiCache.** Two new correctness bugs in the same subsystem (#39444 `write_through` non-persistence, #39147 hybrid-pool false hit) and the long-standing MAMBA pruning issue (#33713) are real risks for any agent setup that relies on prefix caching across requests. Treat current `main` as unsafe for production agent traffic on Mooncake-backed HiCache until both are fixed, and pin to a known-good release.
- **DeepSeek-V4.1 is the path of least resistance on AMD now.** With [#39186](https://github.com/sgl-project/sglang/pull/39186) bringing V4.1-Flash to MI350X and [#39140](https://github.com/sgl-project/sglang/pull/39140) / [#38764](https://github.com/sgl-project/sglang/pull/38764) landing FP8 paths for Qwen3-Next and GLM5 on gfx950, AMD deployments are no longer FP8-second-class citizens — but keep an eye on [#39441](https://github.com/sgl-project/sglang/issues/39441) for long-context HBM exhaustion.
- **Rust frontend in motion, do not depend on PD bootstrap via OpenAI-compatible endpoints yet.** Issue [#39412](https://github.com/sgl-project/sglang/issues/39412) shows PD bootstrap fields are silently dropped today; if you're routing PD-disaggregated traffic through the Rust server's `/v1/chat/completions`, validate end-to-end before relying on it. PR #38939 is at least restoring chat-template fallback for template-less models.
- **Diffusion and image generation are gaining first-class support.** LLaDA-Image ([#37907](https://github.com/sgl-project/sglang/pull/37907)) and SenseNova-U1.5 prompt enhancement ([#38593](https://github.com/sgl-project/sglang/pull/38593)) suggest SGLang is positioning for multimodal generation workloads, not just LLM serving.
- **`transformers` 5.17.0 is coming.** When [#39012](https://github.com/sgl-project/sglang/pull/39012) lands, downstream code that assumed `tokenizers<0.23` or hand-rolled vision rotary shims should drop that logic. The CLIPTokenizer slow/fast round-trip is now identical, which simplifies test fixtures.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-15

## 1. Today's Highlights

The **v0.4.1 release** lands with ggml v0.24.0, expanding model support to **Maple 20B-A1B, Tencent Hy 4, and Spark2.5**, while introducing a small but breaking API change (`llama_sampler_chain_n()` now returns `int32_t`). Backend robustness is the dominant theme across the merged commits and open PRs — HIP/CUDA BF16 fallback, SYCL oneDNN scratchpad pooling, ggml-cpu PCH heap-corruption fix, and a long-standing SYCL TOP_K GPU offload regression all saw fixes. The most consequential platform items are a port of **CUDA graph record/replay to SYCL** ([#28725](https://github.com/ggml-org/llama.cpp/pull/28725)) and a fix that lets **ggml-rpc serve multiple clients per thread** ([#28916](https://github.com/ggml-org/llama.cpp/pull/28916)), unblocking router-mode multi-model deployments.

## 2. Releases & Breaking Changes

- **[v0.4.1](https://github.com/ggml-org/llama.cpp/releases/tag/b10964)** released today (builds b10950 → b10970), bumping ggml to **v0.24.0**.
  - **API change (breaking for downstream bindings):** `llama_sampler_chain_n()` return type changed from `int` to `int32_t` ([#28900](https://github.com/ggml-org/llama.cpp/pull/28900)).
  - **CI/release:** Ubuntu-CUDA builds (12.8 / 13.3, x64 + arm64) added to the release pipeline ([#28186](https://github.com/ggml-org/llama.cpp/pull/28186) → b10969); GCC 14 used for CUDA arm64.
  - **Server:** child-process management and logging overhauled; JSON-schema and chat-template parsing tightened.
  - **Migration note:** anyone embedding the C API must update sampler header usage and recompile downstream native bindings (Python `llama-cpp-python`, Rust `llama-cpp-rs`, Go, etc.).

## 3. New Model & Hardware Support

- **New model architectures in v0.4.1:** Maple 20B-A1B, Tencent Hy 4 (HY_v4), Spark2.5.
- **In-flight model PRs:**
  - [PR #25342](https://github.com/ggml-org/llama.cpp/pull/25342) — **GigaChat-3.5-432B-A28B** (DeepSeek-V3-style MLA + MoE, hybrid attention).
  - [PR #28845](https://github.com/ggml-org/llama.cpp/pull/28845) — new `escape_after_split` vocab flag for **fraunhofer-iis/elmod-2.7b-it**.
- **Backend / hardware:**
  - **HIP/CDNA**: fattn-mma switched to fp32 accumulators ([#28576](https://github.com/ggml-org/llama.cpp/pull/28576), b10970) — correctness/perf improvement on AMD CDNA.
  - **CUDA**: automatic F32 fallback on devices lacking hardware BF16 (Ampere/RDNA3/CDNA floor) ([#28846](https://github.com/ggml-org/llama.cpp/pull/28846), b10950).
  - **SYCL**: radix-select GPU-resident `TOP_K` now handles `k > 32` on-device instead of round-tripping to CPU ([#28670](https://github.com/ggml-org/llama.cpp/pull/28670), b10956).
  - **ggml-rpc**: per-client threading added ([#28916](https://github.com/ggml-org/llama.cpp/pull/28916)) — fixes multi-model router hangs.
- **Quantization / file formats:** no new quant types this cycle.

## 4. Performance & Optimization

- **[PR #28918](https://github.com/ggml-org/llama.cpp/pull/28918)** — SYCL MKL flash-attention online-softmax rewritten: replaces one-work-item-per-row with coalesced chunk loads; expected to reduce kernel latency on Intel Arc / Data Center GPU Max.
- **[PR #28536](https://github.com/ggml-org/llama.cpp/pull/28536)** — CUDA FA shared-memory swizzle refactor (WIP), swizzling currently disabled for MHA while hardware-isolated tuning continues.
- **[PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725)** — **SYCL graph record/replay** port of CUDA graphs; uses SYCL async memory extensions. Eliminates per-token launch overhead for Intel discrete GPUs.
- **[#28670 / b10956](https://github.com/ggml-org/llama.cpp/pull/28670)** — TOP_K GPU-resident path; eliminates CPU round-trip and the per-call backend fence above `k = 32`.
- **[#28821](https://github.com/ggml-org/llama.cpp/pull/28821)** — CUDA unary kernels now accept contiguous_rows, unlocking fusion of ops previously forced to a copy.
- **[#28876](https://github.com/ggml-org/llama.cpp/pull/28876)** — `RANK` pooling batch-splitting for causal-LLM rerankers (Qwen3, Qwen3-VL-Rerank); removes the all-in-one-batch constraint previously carried over from BERT-style cross-encoders, allowing much larger reranker batches.

## 5. Stability & Regressions

Ranked roughly by user impact:

| Severity | Issue | Status | Notes |
|---|---|---|---|
| **High** | [#24066](https://github.com/ggml-org/llama.cpp/issues/24066) — Vulkan perf drop on RX 6600 / Qwen3.5-9B-MTP | OPEN, 44 comments | Long-running; no upstream PR yet. |
| **High** | [#27888](https://github.com/ggml-org/llama.cpp/issues/27888) — SYCL multi-GPU crash, Arc Pro B50 + A770 | OPEN, 12 comments | Mixed-Intel topology still flaky. |
| **High** | [#28196](https://github.com/ggml-org/llama.cpp/issues/28196) — Qwen3.5 MTP on RTX 5090 hits 76 % of roofline on native Linux; ~1.5–1.6× slower on Windows/Ollama path | OPEN, 11 comments | Linear-attention delta-net layers under-tuned on sm_120. |
| **High** | [#28778](https://github.com/ggml-org/llama.cpp/issues/28778) — SYCL + DFlash2 draft on dual Arc Pro B70 triggers GPU TDR reset | OPEN, 6 comments | Hard driver crash; needs SYCL graph + scratchpad work. |
| **High** | [#28211](https://github.com/ggml-org/llama.cpp/issues/28211) — HIP/ROCm **wrong logits** on gfx1151 (RDNA 3.5 Strix Halo) when prompt exceeds `n_ubatch` | OPEN, 7 comments | Silent correctness bug — high priority to land. |
| **High** | [#28860](https://github.com/ggml-org/llama.cpp/issues/28860) — SYCL demands 2 GB+ scratchpad when `--ngram-mod` is on | OPEN, 6 comments | Allocation regression; allocator rework in [#28905](https://github.com/ggml-org/llama.cpp/pull/28905) addresses the class of bug (closed WIP). |
| **Medium** | [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) — Vulkan PP regression after b10780 on RDNA3 | OPEN, 7 comments | Prompt-processing slowdown, not corruption. |
| **Medium** | [#27638](https://github.com/ggml-org/llama.cpp/issues/27638) — Vulkan/ANV FA SCALAR fallback → O(N²) PP + device loss on Arc B580 | OPEN, 7 comments | Flash-attention path falls back to scalar under specific Vulkan drivers. |
| **Medium** | [#28753](https://github.com/ggml-org/llama.cpp/issues/28753) — `ggml_backend_sched_alloc_splits: unexpected graph reallocation` crash on Arc Pro B50 | OPEN, 7 comments | Scheduler re-entrancy bug. |
| **Medium** | [#28827](https://github.com/ggml-org/llama.cpp/issues/28827) — Gemma4 emits progressively long trailing garbage in `

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-15

## Today's Highlights
- **v0.34.1-rc1** ships with MLX runner hardening (prefix-cache snapshot eviction, free-memory gating before loading), an LLM-side raise of the token repeat limit to 100, and a UX fix to the ChatGPT model selector spacing — a small release aimed at stabilizing the 0.34 line before GA.
- The MLX backend continues to dominate the bug surface: long-context OOM, stuck "Stopping…" runners, hard-coded 8 GiB prefix-cache budget, and structured-output JSON corruption are all open or freshly reported, while a community fix for the intermittent `model not found` errors is now in review.
- Tool-call reliability on Gemma 4 and the OpenAI Responses compatibility layer (Codex/Claude Code workflows via `previous_response_id`) both regressed enough to draw multiple reports; a corrective PR for the latter is already queued.

## Releases & Breaking Changes
- **v0.34.1-rc1** ([release](https://github.com/ollama/ollama/releases/tag/v0.34.1))
  - `app: fix ChatGPT model selector spacing`
  - `mlxrunner: Evict prefix cache snapshots from the active conversation`
  - `mlxrunner: check system free memory and wait for evicted runners before loading the next MLX model`
  - `llm: raise token repeat limit to 100 and return error instead`
- **PR #18448 — API: Deprecate `typical_p`** ([link](https://github.com/ollama/ollama/pull/18448)): New Modelfiles can no longer set `typical_p`; existing GGUF models carrying the parameter will still be honored. Migration note: remove `typical_p` from any programmatic Modelfile generation.

## New Model & Hardware Support
- **Q2_0 GGUF tensors** — PR #18443 ([link](https://github.com/ollama/ollama/pull/18443)) adds reader definitions for GGML type 42 / file type 41, fixing metadata import on Q2_0 GGUFs that previously failed with a tensor-size overflow.
- **llama.cpp bump to b10969** — PR #18446 ([link](https://github.com/ollama/ollama/pull/18446)) fixes duplicate symbols between `libllama` and `libmtmd` introduced in upstream build changes.
- **Qualcomm IQ-9075 (Dragonwing IQ9)** — Issue #18445 ([link](https://github.com/ollama/ollama/issues/18445)) requests NPU/GPU support for the dual Hexagon HTP + Adreno 663 SoC (Raxda Fogwise Airbox class).
- **ROCm 10 for Windows** — Issue #18435 ([link](https://github.com/ollama/ollama/issues/18435)) requests support for the Strix Halo (Ryzen AI Max 395, gfx1151) on Windows per AMD's matrix.
- **Rockchip NPU** — Issue #9268 ([link](https://github.com/ollama/ollama/issues/9268)) is still open and resurfaced in the last 24h for RK3588/RK3576.

## Performance & Optimization
- **MLX load stall detection** — PR #17834 ([link](https://github.com/ollama/ollama/pull/17834)) implements progress-based stall detection so MLX loads that exceed the default timeout are no longer pre-emptively cancelled; lazy weight loading and listener-binding changes included.
- **Experimental prefill/KV cache persistence across runner reloads** — PR #17953 ([link](https://github.com/ollama/ollama/pull/17953)) adds `OLLAMA_PREFILL_CACHE=1`, saving processed-prompt state so reloads don't re-prefill from scratch.
- **Hugging Face direct-URL resolution bound** — PR #18437 ([link](https://github.com/ollama/ollama/pull/18437)) caps each resolution attempt at 10s to prevent a stalled lookup from consuming Ollama's full 30s retry context.
- **MLX prefix-cache hard 8 GiB cap** — Issue #18131 ([link](https://github.com/ollama/ollama/issues/18131)) documents heavy swap on 32 GB Apple Silicon under agent workloads; expected behavior, not a leak, but the budget needs configurability.
- **MLX OOM at long context** — Issue #18231 ([link](https://github.com/ollama/ollama/issues/18231)) reports HTTP 500 mid-request on 64 GB Apple Silicon when prefix cache holds paged-out snapshots — eviction succeeds but no alloc-failure retry exists.
- **Model loading regression since 0.30.0** — Issue #18373 ([link](https://github.com/ollama/ollama/issues/18373)) reports significant slowdown versus 0.23.4 across GPT-OSS-120B and other models; no fix PR yet.
- **CUDA ~5× regression (0.33.x vs 0.32.13)** — Issue #18225 ([link](https://github.com/ollama/ollama/issues/18225)) closed `needs more info`; remains unfixed on RTX 3090 / CUDA 13.2 / driver 595.84.

## Stability & Regressions
| Sev | Issue | Status | Notes |
|---|---|---|---|
| High | #17274 Tool-call output silently discarded on parse failure ([link](https://github.com/ollama/ollama/issues/17274)) | Open, 21 comments | Empty content, no tool_calls, tokens still counted; long-running thread. |
| High | #18419 `/api/codex/v1/responses` empty completion on `previous_response_id` follow-up ([link](https://github.com/ollama/ollama/issues/18419)) | Open | PR #18439 ([link](https://github.com/ollama/ollama/pull/18439)) proposes rejecting the field rather than silently answering nothing. |
| High | #18447 Intermittent `model "xxx" not found` ([link](https://github.com/ollama/ollama/issues/18447)) | Open | Case-insensitive canonicalization in `getExistingName`; PR #18438 ([link](https://github.com/ollama/ollama/pull/18438)) matches full names atomically. |
| High | #18431 Anthropic-compat `/v1/messages` hoists `system` messages out of `messages` array, breaking prefix cache for Claude Code ([link](https://github.com/ollama/ollama/issues/18431)) | Open | Token-cache invalidation per turn; no fix yet. |
| Med | #18390 gemma4 tool-call with object key containing spaces is dropped as empty response ([link](https://github.com/ollama/ollama/issues/18390)) | Open | Affects `/api/chat` and `/v1/chat/completions`; only trace is a server-side log. |
| Med | #18442 `gemma4:26b` concurrent decode loses EOS (`finish_reason: length`) ([link](https://github.com/ollama/ollama/issues/18442)) | Open | `qwen3.8:27b` on identical harness is 3/3 clean — model-specific. |
| Med | #18441 MLX structured output prefixes JSON with stray `.` when thinking enabled ([link](https://github.com/ollama/ollama/issues/18441)) | Open | Disappears with thinking off. |
| Med | #18269 `muse-glimmer:30b-mlx` (NVFP4) stuck in "Stopping…" on 32 GB M4 Air ([link](https://github.com/ollama/ollama/issues/18269)) | Open | `ollama ps` shows stuck state; watchdog triggers. |
| Med | #18396 Jetson Orin Nano 8GB OOM loading Gemma 4 E4B multimodal ([link](https://github.com/ollama/ollama/issues/18396)) | Open | CPU-projector configuration works; default OOMs the host. |
| Low | #18208 Long-lived runner (`keep_alive -1`) emits `<unused49>` placeholders after coexisting with a second model ([link](https://github.com/ollama/ollama/issues/18208)) | Closed `needs more info` | On AMD Ryzen AI Max+ mini PC. |
| Low | #18225 CUDA ~5× slower token generation on RTX 3090 ([link](https://github.com/ollama/ollama/issues/18225)) | Closed `needs more info` | |

## What This Means for Application Developers
- **Pin to v0.34.x carefully.** If you run MLX-backed workflows on Apple Silicon, v0.34.1-rc1's eviction and free-memory gating are the safest target; if you don't need them, hold on 0.32.13 to avoid the CUDA throughput regression in 0.33.x and the unresolved model-loading slowdown reported from 0.30.0 onward.
- **Gemma 4 tool calls are fragile in 0.34.x.** Avoid object keys with spaces; treat dropped tool calls as parse failures on your side and surface a retry instead of trusting `tool_calls: []`.
- **Anthropic-compat with Claude Code degrades the prefix cache.** If you route Claude Code through `/v1/messages`, expect per-turn cache misses until #18431 is fixed — track tokens accordingly.
- **OpenAI Responses (`/v1/responses`, `/api/codex/v1/responses`) does not yet support `previous_response_id` continuations reliably.** Expect HTTP 200 with empty output; consider short-term workarounds of re-sending full history or applying PR #18439 / #18434 once available.
- **MLX structured outputs need `thinking: false`** (or output sanitization) until #18441 lands — the stray `.` prefix breaks downstream JSON parsers.
- **For long-context MLX sessions**, monitor resident-set growth versus the 8 GiB hard cap and budget requests so you don't hit the paged-snapshot OOM path described in #18231.
- **Multi-model agents** should not rely on `keep_alive: -1` runners when swapping models — issue #18208's corruption mode is unrecovered until full restart.
- **Operators with Strix Halo, Dragonwing IQ9, or Rockchip hardware** can track #18435 / #18445 / #9268; none have landed yet but all resurfaced within the last 24h.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-15

## 1. Today's Highlights

The proxy/SDK surface around the **OpenAI Responses → Chat bridge is showing real fragility**: multiple reports in the last 24 hours describe dropped `reasoning_text`, lost incremental reasoning progress in streaming, stale cache-write token retention, and missing `usage` that prevents spend rows from being written. These are critical correctness issues for anyone proxying OpenAI Agents SDK / Responses traffic through LiteLLM. On the operational side, maintainers merged/landed several high-leverage fixes — capping per-key rollups at 100 in the Global Usage query to stop OOM kills, skipping redundant health-check DB writes, and reconciling budget reservations before DB enqueue — alongside a first-class `opencode_zen` / `opencode_go` provider pair.

## 2. Releases & Breaking Changes

No new tagged releases in the last 24 hours.

## 3. New Model & Hardware Support

- **OpenCode Zen & OpenCode Go** — new first-class providers with route-aware dispatch across chat/messages/responses endpoints; OpenCode Go now requires a session id, which the PR handles. ([PR #40964](https://github.com/BerriAI/litellm/pull/40964))
- **TinyFish Agent API passthrough** — `/tinyfish/*` route to `agent.tinyfish.ai` with per-step billing (`num_of_steps × $0.016`) keyed to the calling virtual key for chargeback. ([PR #41099](https://github.com/BerriAI/litellm/pull/41099))
- **Vertex AI cost map sync** — 14 models updated from provider-published pricing (closed). ([PR #40955](https://github.com/BerriAI/litellm/pull/40955))
- **Gemma 4 on Mantle endpoint** — outstanding request to re-enable Gemma routing via the mantle endpoint now that it is no longer available on Bedrock. ([Issue #30657](https://github.com/BerriAI/litellm/issues/30657))
- **FOCUS export → Ternary** — adds Ternary as a pure-sink FOCUS destination (no separate export job, callback-style). ([PR #39795](https://github.com/BerriAI/litellm/pull/39795))
- **Microsoft Agent 365 MCP guardrail** — pre-execution tool-call evaluation with Entra On-Behalf-Of exchange. ([PR #38241](https://github.com/BerriAI/litellm/pull/38241))

## 4. Performance & Optimization

- **Global Usage aggregation OOM** — cap per-`api_key` rollups at the top 100 keys by spend in the aggregated usage query. The six per-key groupings were making the Prisma result set balloon and get OOM-killed at 45–59s on large deployments. ([PR #41143](https://github.com/BerriAI/litellm/pull/41143))
- **Health-check table write amplification** — when the "latest row per model" read fails, the gate previously treated it as "no rows" and wrote every model every cycle on every pod. Now skipped on read failure. ([PR #41145](https://github.com/BerriAI/litellm/pull/41145))
- **Budget reservation double-count** — reconcile the reseed + settled cost *before* enqueuing the spend row to the DB to avoid a periodic flush interleaving between the counter update and the DB floor. ([PR #40310](https://github.com/BerriAI/litellm/pull/40310))
- **Prompt-cache cost prediction** — closed PR comparing observed warm/partial/stale/unknown cache states and pricing both deployments with cache-aware rates so cheaper models don't rebuild an expensive cache. ([PR #40877](https://github.com/BerriAI/litellm/pull/40877))
- **CodeQL noise reduction** — four audited Python quality query categories excluded from PR feedback while retaining log-injection and other security queries. ([PR #41142](https://github.com/BerriAI/litellm/pull/41142))

## 5. Stability & Regressions

Ranked by user-visible impact.

**High severity — reasoning / Responses bridge**
- Responses-to-Chat streaming loses incremental reasoning items and cached reasoning state; bridge only attaches `reasoning_items` on terminal events, not deltas. ([Issue #40887](https://github.com/BerriAI/litellm/issues/40887))
- Responses-to-Chat drops raw `reasoning_text` in both streaming and non-streaming responses when routed via `openai/responses/<model>` → `/v1/chat/completions`. ([Issue #40654](https://github.com/BerriAI/litellm/issues/40654))
- Streaming usage merger retains stale cache-write tokens after an explicit zero update — corrupts cache-cost accounting. ([Issue #40736](https://github.com/BerriAI/litellm/issues/40736))
- **Fix in flight**: Responses bridged-to-chat kwargs are now filtered to match the native Responses path so deployment-side `chat_template_kwargs` no longer leak through and cause 400s. ([PR #41144](https://github.com/BerriAI/litellm/pull/41144))

**High severity — spend / billing correctness**
- Virtual-key `BudgetExceededError` fires while `/key/info` still reports spend below `max_budget` — same class of stale-counter bug as the team-key report referenced in #27639. ([Issue #27735](https://github.com/BerriAI/litellm/issues/27735))
- Reset-budget job silently zeroes spend every tick for rows with `budget_duration=null` but a non-null, past `budget_reset_at`; never self-heals. ([Issue #39370](https://github.com/BerriAI/litellm/issues/39370))
- Admin UI model-edit persists derived pricing; price-map reload then records Azure spend as $0 — related to #30081. ([Issue #40649](https://github.com/BerriAI/litellm/issues/40649))
- VLLM `cached_tokens` not handled by the token cost calculator; cached-prompt costs silently missing. ([Issue #22984](https://github.com/BerriAI/litellm/issues/22984))
- Streaming `/v1/responses` success logger crashes with `'dict' object has no attribute 'usage'` → no spend log written, request uncharged (closed). ([Issue #29913](https://github.com/BerriAI/litellm/issues/29913))

**Medium — rate limiting / routing**
- v3 rate limiter double-counts `model_per_team` → effective RPM/TPM is half the configured value. ([Issue #34140](https://github.com/BerriAI/litellm/issues/34140))
- Saved team/key provider weights do not control traffic; global weights always win. Fix landed: deployment weights validated and applied per-request, supports 80/20 splits inside one public model group. ([PR #41072](https://github.com/BerriAI/litellm/pull/41072))
- Cooldown TTL conflates 429-rate-limit with 429-quota-exhausted (closed as informational; design change implied). ([Issue #27470](https://github.com/BerriAI/litellm/issues/27470))

**Medium — guardrails / logging**
- Custom code guardrail always receives `user_id`/`team_id`/`end_user_id` as `None` and empty `metadata` on `/v1/messages`, `/v1/responses`, batches, and files. Fix landed. ([Issue + PR #41126](https://github.com/BerriAI/litellm/pull/41126))
- Prompt Security guardrail treats `created` as an error and 500s every image/file request with the guardrail on; fix keeps polling through non-terminal statuses. ([PR #41131](https://github.com/BerriAI/litellm/pull/41131))
- `StandardLoggingPayloadSetup._get_user_agent_tags` does a case-sensitive `User-Agent` lookup, missing any variant-cased header. ([Issue #40979](https://github.com/BerriAI/litellm/issues/40979))
- Custom redaction tags (`keyword_redaction_tag`, `pattern_redaction_format`) silently ignored in v1.87.1. ([Issue #30008](https://github.com/BerriAI/litellm/issues/30008))

**Medium — health / install**
- Health checks fail hard when an ad-hoc host is offline instead of degrading gracefully. ([Issue #34281](https://github.com/BerriAI/litellm/issues/34281))
- Self-hosted install fails because `prisma generate` is not permitted in the install script. ([Issue #26097](https://github.com/BerriAI/litellm/issues/26097))

**Low — UI / spec compliance**
- Admin UI does a full page reload + Next.js prefetch 404 storm on every sidebar click (closed). ([Issue #41029](https://github.com/BerriAI/litellm/issues/41029))
- WebSocket `/v1/responses` requires `?model=` query param, violating OpenAI WS spec which puts `model` inside `response.create` (closed). ([Issue #25532](https://github.com/BerriAI/litellm/issues/25532))
- Per-team response cache scoping (cross-tenant reuse) closed without action — operators should still isolate cache keys via their own tenant-prefixed model names. ([Issue #29955](https://github.com/BerriAI/litellm/issues/29955))

## 6. What This Means for Application Developers

- **If you proxy the OpenAI Agents SDK through `/v1/responses`:** expect the bridged-to-chat reasoning path to be lossy right now — reasoning text and incremental reasoning deltas can be silently dropped. Pin to native `/v1/responses` deployments where you can, and treat reasoning-sensitive traffic as at-risk until PR #41144-class fixes land across the bridge.
- **If you bill internal teams off virtual-key spend:** your dashboards and enforcement are temporarily inconsistent — `BudgetExceededError` can fire against spend that `/key/info` still reports below cap (#27735, #39370). Add a defensive client-side retry-with-backoff on `BudgetExceededError` and reconcile from `/key/info` before alerting users. The reservation reconcile in PR #40310 should reduce, but not yet eliminate, double-count risk on the write path.
- **If you run a large multi-tenant proxy:** PR #41143's 100-key cap on Global Usage is the single biggest operational win this week — if your `Global Usage` page has been timing out or OOM-killing the pod, redeploy after the fix lands. Expect the same cap to apply to per-key drill-downs until a paginated variant ships.
- **If you use Anthropic on `/v1/responses` with cache injection:** #29810 (closed) shows the hook is a silent no-op *and* can wedge Claude into a deterministic tool-call loop until MaxTurns. Disable `cache_control_injection_points` for that path until the maintainers post a regression-tested fix.
- **New providers to evaluate:** OpenCode Zen / Go (#40964) and TinyFish passthrough (#41099) are drop-in via standard config; both bill to the calling virtual key, so you can expose them to specific teams without opening the underlying provider credentials.
- **Observability:** if you rely on Langfuse via the OTel v2 path, PR #41140 now maps `trace_user_id`, `session_id`, and tags onto root + generation spans — you should start seeing user attribution again without a config change.
- **Cost-map hygiene:** the Vertex price sync (#40955) and closed SambaNova cleanup (#29011) mean the bundled cost map is closer to current than usual, but if you run on SambaNova or a non-default Azure deployment, audit your `model_prices_and_context_window.json` overrides — the #40649 "Azure spend = $0 after edit" failure mode is still possible until Admin UI pricing persistence is reworked.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-15

## 1. Today's Highlights

The 24-hour window shows **no new releases** but heavy Studio/Desktop maintenance activity, dominated by **llama-server / llama.cpp tool-call correctness fixes** (nested field ordering, argument key sorting causing re-processing, GGML_ASSERT on Gemma 4 image inputs), a notable **sandbox-escape security fix** for chat tools reading/writing outside the session directory, and **broader hardware coverage** with AMD ROCm Docker images closed and ARM64 DGX Spark reporting. The team's current focus is clearly hardening Studio as a production agent runtime rather than training-stack changes.

## 2. Releases & Breaking Changes

- **No new releases** published in the last 24 hours.
- No version bumps, deprecations, or API/config-breaking changes detected. Desktop beta users remain on the 0.1.808-beta / 2026.9.x line referenced across issues.

## 3. New Model & Hardware Support

- **AMD ROCm Docker image** — Issue [#6230](https://github.com/unslothai/unsloth/issues/6230) (closed) lands an ROCm-flavored container mirroring the CUDA/Blackwell image structure; targets RDNA2/3/4 and CDNA/Instinct.
- **ARM64 DGX Spark (GB10 / sm_121a)** — Report-only PR [#10491](https://github.com/unslothai/unsloth/pull/10491) documents that the published `unsloth/unsloth` ARM64 image currently runs llama.cpp on CPU; no code change yet.
- **Local model discovery in Docker** — PR [#10936](https://github.com/unslothai/unsloth/pull/10936) makes `docker/run.sh` mount LM Studio, Ollama, and Hermes model directories as read-only so Studio lists them.
- **Gemma 4 image input path** — Issue [#10559](https://github.com/unslothai/unsloth/issues/10559) (closed) was a `llama-server` GGML_ASSERT on default ubatch sizing; the path now exists for Gemma 4 multimodal via llama.cpp.
- **Apple MLX auto-switch** — Issue [#10951](https://github.com/unslothai/unsloth/issues/10951) flags installed MLX models returning 404 unless preloaded on macOS 26.6.2.
- **Intel Arc 140T laptops** — Issue [#8632](https://github.com/unslothai/unsloth/issues/8632) (still open) reports install failures on Windows + Intel Arc 140T; not yet supported.

## 4. Performance & Optimization

- **`auto` transformer precision walks int8 first on every tier** — PR [#10888](https://github.com/unslothai/unsloth/pull/10888) removes the previous `_prefer_consumer_scheme` split (fp8-first on data-center Ada/Hopper/Blackwell, int8-first on consumer/workstation); int8 is now tried before fp8 universally, likely trading some VRAM headroom for fewer precision-mismatch failures on mixed fleets.
- **Blocked-command regex compiled once** — PR [#10927](https://github.com/unslothai/unsloth/pull/10927) (closed) hoists the blocked-word alternation out of per-command evaluation, eliminating an `re.escape`-per-name overhead per sandboxed call.
- **Memory growth after llama.cpp update** — Issue [#10921](https://github.com/unslothai/unsloth/issues/10921) reports a web-UI regression in steady-state memory since the last llama.cpp bump; no numbers yet, tracking only.
- **DGX Spark context-limit regression** — Issue [#9889](https://github.com/unslothai/unsloth/issues/9889) (closed) closed without a public benchmark in the thread.

## 5. Stability & Regressions

Ranked by severity for inference/agent workloads:

| Severity | Item | Status | Fix |
|---|---|---|---|
| **High** | **Sandbox escape via chat tools** — local model read/wrote files outside the sandbox on a different partition; `os.remove()` not blocked even though shell `rm` was ([#10929 report, #10907 fix PR](https://github.com/unslothai/unsloth/pull/10907)) | Open | ✅ [#10907](https://github.com/unslothai/unsloth/pull/10907) — prompt before out-of-sandbox I/O |
| **High** | **Tool-call argument sorting causes re-processing** — replayed `edit_file` calls have keys sorted, llama.cpp re-runs the call ([#10791](https://github.com/unslothai/unsloth/issues/10791)) | Closed | PR needed |
| **High** | **Nested tool-call fields dropped** when schema order ≠ written order; e.g. Notion `start_cursor` silently lost, calls dedup against previous ([#10935](https://github.com/unslothai/unsloth/pull/10935)) | Open PR | ✅ [#10935](https://github.com/unslothai/unsloth/pull/10935) |
| **High** | **`llama-server` GGML_ASSERT on Gemma 4 image input** (default ubatch too small) ([#10559](https://github.com/unslothai/unsloth/issues/10559)) | Closed | Implied fix landed |
| **High** | **Safety check bypassable** with crafted commands (`reboot`, `rm` via subshell `$(...)`) ([#10835](https://github.com/unslothai/unsloth/issues/10835)) | Closed | Implied fix landed |
| **Medium** | **MCP responses truncated**, cannot be bypassed — suspected dedup ([#10839](https://github.com/unslothai/unsloth/issues/10839)) | Open | — |
| **Medium** | **`unsloth start pi` "Error: terminated"** on slow CPU hosts with low free RAM ([#10912](https://github.com/unslothai/unsloth/issues/10912)) | Open | Referenced fix in [#10911](https://github.com/unslothai/unsloth/pull/10911) |
| **Medium** | **MLX model auto-switch 404** unless preloaded ([#10951](https://github.com/unslothai/unsloth/issues/10951)) | Open | — |
| **Medium** | **Revoked HF model loads locally** with misleading errors ([#10929](https://github.com/unslothai/unsloth/issues/10929)) | Open | — |
| **Medium** | **MLX streamed gemma-4** shows bare `<|channel>` spliced into reasoning ([#10905 fix PR](https://github.com/unslothai/unsloth/pull/10905)) | Open→closed | ✅ [#10905](https://github.com/unslothai/unsloth/pull/10905) closed |
| **Low** | **Run-settings sidebar vs model dropdown** keep separate drafts, silently disagree ([#10817](https://github.com/unslothai/unsloth/issues/10817)) | Closed | — |
| **Low** | **`min_p` and `logit_bias`** not supported when Desktop connects to vLLM ([#10573](https://github.com/unslothai/unsloth/issues/10573)) | Closed | — |
| **Low** | **`--tensor-split` ignored** by Desktop ([#10355](https://github.com/unslothai/unsloth/issues/10355)) | Closed | — |
| **Low** | **Inline Python plots** (`![Plot](line_plot.png)`) render as `[Image blocked: Plot]` in final answer ([#10954 fix PR](https://github.com/unslothai/unsloth/pull/10954)) | Open | ✅ [#10954](https://github.com/unslothai/unsloth/pull/10954) |
| **Low** | **Studio update doesn't reinstall missing PyTorch**, leaves install in chat-only mode ([#10956 fix PR](https://github.com/unslothai/unsloth/pull/10956)) | Open | ✅ [#10956](https://github.com/unslothai/unsloth/pull/10956) |
| **Low** | **Test fixture uninstalls torch** from Studio venv ([#10955 fix PR](https://github.com/unslothai/unsloth/pull/10955)) | Open | ✅ [#10955](https://github.com/unslothai/unsloth/pull/10955) |
| **Low** | **Docker `run.sh` instructions** don't tell users to mount a model dir ([#10923](https://github.com/unslothai/unsloth/issues/10923)) | Open | — |
| **Low** | **Tooltips cover Windows controls** in Image/Video generation ([#10226](https://github.com/unslothai/unsloth/issues/10226)) | Closed | — |
| **Low** | **FastVisionModel** breaks Gemma 4 `gemma4_unified` spatial localization ([#6028](https://github.com/unslothai/unsloth/issues/6028)) | Closed | — |

## 6. What This Means for Application Developers

- **If you deploy agents through Unsloth Studio/Desktop**, the merged/imminent security fix in [#10907](https://github.com/unslothai/unsloth/pull/10907) changes runtime behavior — any model that legitimately touches files outside the sandbox will now prompt. Test your prompts against the new approval gate before the next Desktop beta.
- **Tool calls on third-party APIs (Notion, Qwen-style outputs, etc.) have been silently dropping nested optional fields** when argument keys arrive out of schema order. If you observe "duplicate-looking" tool calls or missing cursor arguments, [#10935](https://github.com/unslothai/unsloth/pull/10935) is the relevant fix to track.
- **Edit-file / multi-parameter tool calls were being silently re-executed** due to key reordering on replay ([#10791](https://github.com/unslothai/unsloth/issues/10791)). Treat any destructive tool executed via Studio on the current beta as potentially double-issued until the fix ships; consider audit logs.
- **Gemma 4 multimodal through `llama-server`** is now viable for image inputs (the GGML_ASSERT on ubatch is resolved). If you were holding off Gemma 4 image workloads pending this, you can unblock.
- **AMD ROCm Docker image is now real** ([#6230](https://github.com/unslothai/unsloth/issues/6230) closed) — evaluate it on Instinct and RDNA nodes if you've been blocked on NVIDIA-only containers.
- **Apple MLX paths are still rough**: auto-switch 404s, streamed gemma-4 control-token splicing ([#10951](https://github.com/unslothai/unsloth/issues/10951), [#10905](https://github.com/unslothai/unsloth/pull/10905)). Pin to preloaded models and validate MLX streams end-to-end.
- **Precision default change** ([#10888](https://github.com/unslothai/unsloth/pull/10888)): int8-first now applies on data-center GPUs too. If you have quality-sensitive workloads, validate outputs against the previous fp8-first behavior; you may want to pin `bf16` explicitly until you've characterized the regression.
- **No new releases today** — production rollouts should stay on the current `2026.9.x` / `0.1.808-beta` line until the next tagged release; the queue of merged-but-unreleased fixes is substantial.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — Daily Digest

**Date:** 2026-09-15
**Project:** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
**Window:** Last 24 hours

---

## 1. Today's Highlights

The community's focus has shifted decisively to **Codex desktop app integration** and **cross-protocol translation correctness**. A cluster of related bugs around the Codex profile (app-server handshake, `fast_mode` injection, Speed-control catalog parsing) is converging into a coordinated fix set, while two PRs sharpen Anthropic↔OpenAI Responses compatibility by stripping thinking/reasoning blocks that trigger `HTTP 400 array_above_max_length` on upstreams. A Windows-only env-escaping regression in the wrapper cmd also surfaced.

## 2. Releases & Breaking Changes

*No new releases in the last 24 hours.* No version-tag or migration notes to report.

## 3. New Model & Hardware Support

No new model, backend, or quantization support landed in this window.

## 4. Performance & Optimization

- **Config-acceptance timeout raised and made configurable** — [#1794](https://github.com/musistudio/claude-code-router/pull/1794) replaces the hardcoded 5000 ms child-boot budget with a configurable knob. The existing value measures child *spawn + require()* of the real gateway entry, which is often too tight; raising the budget eliminates spurious failed starts on cold boxes without requiring a code change for everyone else.

## 5. Stability & Regressions

Ranked by severity (highest first).

1. **[HIGH] Codex desktop profile fails to launch through CCR** — [#1795](https://github.com/musistudio/claude-code-router/issues/1795) *(OPEN)*. App-server handshake aborts with `This app server did not provide application network requirements`. Paired with in-flight fix [#1796](https://github.com/musistudio/claude-code-router/pull/1796), which stops CCR from injecting `fast_mode` into a `null` config requirements object — the proximate cause of the handshake failure. Track the PR for a near-term merge.
2. **[HIGH] Cross-protocol fallback returns HTTP 400 on retry** — [#1615](https://github.com/musistudio/claude-code-router/issues/1615) *(CLOSED)*. When a fallback chain mixes protocols (e.g., `anthropic_messages` → `openai_responses`), the retry path skipped body re-translation. Closed after the upstream behavior was clarified; the underlying family of translation issues is now addressed by [#1702](https://github.com/musistudio/claude-code-router/pull/1702) and [#1784](https://github.com/musistudio/claude-code-router/pull/1784).
3. **[HIGH] OpenAI Responses upstream rejects translated reasoning items** — [#1784](https://github.com/musistudio/claude-code-router/pull/1784) *(OPEN)*. Codex-style upstreams reject `reasoning` input items whose `content` array is non-empty (`array_above_max_length`). Any translated Claude thinking block produces such an item. Fix strips the non-empty `content` from reasoning items. Should land alongside its sibling.
4. **[MEDIUM] Anthropic thinking blocks leaking to OpenAI upstreams** — [#1702](https://github.com/musistudio/claude-code-router/pull/1702) *(CLOSED/MERGED)*. `stripUnsupportedOpenAiRequestParameters` now also strips `type: "thinking"` / `type: "redacted_thinking"` content blocks in message history. Eliminates a class of `HTTP 400` failures on chat/responses upstreams.
5. **[MEDIUM] Windows wrapper cmd double-escapes env values** — [#1797](https://github.com/musistudio/claude-code-router/issues/1797) *(OPEN)*. `Ec()` escapes for unquoted `set`, but `ce()` wraps in quotes, so caret/percent escaping survives into the child. Symptom: model names containing parentheses arrive as `^(self hosted^)`. Windows-only; affects Desktop **v3.1.0**.
6. **[MEDIUM] Claude Code loses apiKeyHelper after CCR sync** — [#1798](https://github.com/musistudio/claude-code-router/issues/1798) *(OPEN)*. CCR syncs `autoMode: true` from sessions into the config store and rewrites `settings.json` on every launch, causing Claude Code to ignore `apiKeyHelper` and report "Not logged in". Windows / Desktop **v3.1.0**.
7. **[LOW] Codex app hides Speed control for custom providers** — [#1683](https://github.com/musistudio/claude-code-router/issues/1683) *(CLOSED)*. Confirmed a client-side display quirk of the Codex app — CCR's catalog data is complete; no CCR change required.

## 6. What This Means for Application Developers

- **If you proxy Codex (desktop app or CLI) through CCR:** upgrade tracking closely — [#1796](https://github.com/musistudio/claude-code-router/pull/1796) targets the launch-time `fast_mode` injection bug that is currently breaking Codex desktop startup. Until merged, expect app-server handshakes to fail with `This app server did not provide application network requirements`.
- **If you mix Anthropic and OpenAI Responses backends in a fallback chain:** the family of cross-protocol translation bugs is being closed out this week. [#1702](https://github.com/musistudio/claude-code-router/pull/1702) strips `thinking` blocks from history sent to OpenAI upstreams; [#1784](https://github.com/musistudio/claude-code-router/pull/1784) finishes the job for `reasoning` items carrying non-empty content. Until both are in your build, you may see intermittent `HTTP 400 array_above_max_length` on retries that re-send translated history.
- **If you run CCR Desktop on Windows:** treat **v3.1.0** as carrying two known regressions — model-name parenthesization via the wrapper cmd (#1797) and `apiKeyHelper` being clobbered by session-driven config rewrites (#1798). Avoid putting parens in model display names and avoid relying on `apiKeyHelper` sync until a fix ships.
- **Operators bringing up cold CCR instances:** [#1794](https://github.com/musistudio/claude-code-router/pull/1794) exposes the previously hardcoded 5000 ms gateway-start timeout. Tune it upward if you observe spawn-time `gateway:config-accepted` failures on slow disks or loaded hosts.
- **Catalog/UI:** No action needed for the Codex Speed-control display issue (#1683) — the upstream Codex app intentionally hides that control for non-OpenAI providers.

---
*Sources: [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) issues & pull requests, last 24h.*

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-15

## Today's Highlights

CC Switch saw no published releases in the last 24 hours, but the codebase absorbed heavy maintenance across its Codex provider-switching, Google Antigravity migration, and cross-protocol proxy paths. The most consequential landing is a wave of fixes for Codex session persistence after switching providers (old threads still pin `model_provider = "custom"` and hit 401 against `api.openai.com`), backed by both regression reports ([#5672](https://github.com/farion1231/cc-switch/issues/5672), [#7377](https://github.com/farion1231/cc-switch/issues/7377), [#7362](https://github.com/farion1231/cc-switch/issues/7362)) and matching PRs ([#7386](https://github.com/farion1231/cc-switch/pull/7386), [#7395](https://github.com/farion1231/cc-switch/pull/7395)). In parallel, the Google Antigravity adapter is being finalized with backward compatibility ([#7402](https://github.com/farion1231/cc-switch/pull/7402)) and Claude Desktop 3P profile support on Linux closed out ([#7331](https://github.com/farion1231/cc-switch/pull/7331), [#7389](https://github.com/farion1231/cc-switch/pull/7389)).

## Releases & Breaking Changes

No new releases in the last 24 hours. Current line stable at **v3.20.3** per [#7401](https://github.com/farion1231/cc-switch/issues/7401).

- **Regression to watch (no release yet):** commit `5c053626` introduced a one-click "quick set" bug where the user-supplied default fallback model (`ANTHROPIC_MODEL`) is shadowed by the panel's top-down lookup and silently overwritten back to the previous preset ([#7401](https://github.com/farion1231/cc-switch/issues/7401)). Fix is staged in [PR #7407](https://github.com/farion1231/cc-switch/pull/7407) (restoring fallback as first priority, falling back to top-down only when unset).
- **Codex config file convention change incoming:** [PR #7386](https://github.com/farion1231/cc-switch/pull/7386) explicitly allows `model_provider = "openai"` in the unified session bucket injection so the official Codex provider template is no longer early-rejected. Expect minor Codex `config.toml` diffs after upgrade.

## New Model & Hardware Support

- **Google Antigravity CLI (`agy`) — first-class:** session/usage/skill sync rewritten to scan `~/.gemini/antigravity{, -cli, -ide}/...` while keeping legacy `~/.gemini/tmp/*/chats/` paths for backward compat ([#7402](https://github.com/farion1231/cc-switch/pull/7402)). Closes the long-standing "Gemini CLI sessions not imported" class ([#3938](https://github.com/farion1231/cc-switch/issues/3938), [#7385](https://github.com/farion1231/cc-switch/pull/7385)). Old `gemini-cli` binary detection is now a dead path — flagged for removal in [#7345](https://github.com/farion1231/cc-switch/issues/7345).
- **MiniMax Code (CLI harness):** full provider/model management, MCP, Skills, global instructions, local session history and usage added as a first-class app following the Pi/OpenCode pattern ([#7383](https://github.com/farion1231/cc-switch/pull/7383)).
- **VS Code Copilot BYOK + GitHub Copilot CLI:** new first-class apps with their own catalog/state/resources/sessions/usage view; Custom Endpoint BYOK providers modeled as shared endpoint/key/protocol groups ([#6286](https://github.com/farion1231/cc-switch/pull/6286)). Drives the earlier "Cline + Copilot management" feature ask ([#3338](https://github.com/farion1231/cc-switch/issues/3338)).
- **Grok:** separate account credentials per provider, request-mode + reasoning-effort now recorded in usage logs, built-in model prices refreshed ([#6792](https://github.com/farion1231/cc-switch/pull/6792)).
- **muse-spark models:** added to `supports_reasoning_effort()` so Anthropic→Responses transform stops silently dropping `output_config.effort` ([#7398](https://github.com/farion1231/cc-switch/pull/7398), tracks [#7397](https://github.com/farion1231/cc-switch/issues/7397) and same-class [#7314](https://github.com/farion1231/cc-switch/issues/7314) / [#7318](https://github.com/farion1231/cc-switch/issues/7318)).
- **oh-my-pi (community) adapter:** enhancement request opened ([#6422](https://github.com/farion1231/cc-switch/issues/6422), 9 👍), no implementation yet.
- **Hermes Agent usage import:** read-only aggregate sync from `session_model_usage` into the Usage Dashboard, treated as a separate data source (no conversion into `proxy_request_logs`, no per-request inference) ([#6120](https://github.com/farion1231/cc-switch/pull/6120)).

## Performance & Optimization

- **SOCKS5 vs HTTP CONNECT parity:** reqwest's `socks5://` was resolving targets locally (sending IP literals through the proxy, breaking Clash/mihomo GeoIP rules and causing WebDAV sync timeouts). Switched to remote-resolution semantics so `socks5://` and `http(s)://` behave identically against a mixed listener ([#7406](https://github.com/farion1231/cc-switch/pull/7406), tracks [#7393](https://github.com/farion1231/cc-switch/issues/7393)).
- **DeepSeek infinite-loop fix (closed):** Responses→Chat converter was splitting one assistant turn into two adjacent messages and duplicating `reasoning_content`, causing 12–14万-token loops. Merged ([#5860](https://github.com/farion1231/cc-switch/issues/5860), closed).
- **Streaming message_start correctness:** OpenAI→Anthropic converter was emitting `message_start.message` without the required `content: []`, causing strict Anthropic SDK clients to reject the first content block as a snapshot mismatch ([#7396](https://github.com/farion1231/cc-switch/pull/7396)).
- **Inline `` injected by Chat-Completions-compatible upstreams (MiniMax M3, OpenCode Go routes) before forwarding, so reasoning and answer no longer arrive as a single plaintext blob ([#7408](https://github.com/farion1231/cc-switch/pull/7408), tracks [#7271](https://github.com/farion1231/cc-switch/issues/7271)).
- **Outbound masking upgrade (in flight):** replacing opaque `***` masking with reversible typed placeholders (`{{PHONE_1}}` etc.) so models can still reason over entities and multiple values don't collide ([#7306](https://github.com/farion1231/cc-switch/pull/7306)).

## Stability & Regressions

Ranked roughly by user-impact scope:

1. **Codex session/provider desync (high):** switching provider, then continuing an old official-Login session, still routes to `api.openai.com` → 401 ([#5672](https://github.com/farion1231/cc-switch/issues/5672), [#7377](https://github.com/farion1231/cc-switch/issues/7377)). Root cause: `state_5.sqlite → threads.model_provider` pinned to `custom`. Fixes in flight: [PR #7386](https://github.com/farion1231/cc-switch/pull/7386) (openai-route allow), [PR #7395](https://github.com/farion1231/cc-switch/pull/7395) (rebind stale account on takeover). Related discussion in [#7362](https://github.com/farion1231/cc-switch/issues/7362).
2. **Quick-set fallback model regression (medium):** commit `5c053626` makes "default fallback model" non-effective and overwrites user input ([#7401](https://github.com/farion1231/cc-switch/issues/7401)). Fix staged: [#7407](https://github.com/farion1231/cc-switch/pull/7407).
3. **Codex 400 missing `call_id`/`name` (medium):** v3.20.2 cross-task `send_message_to_thread` triggers HTTP 400 on multi-tool flows ([#7230](https://github.com/farion1231/cc-switch/issues/7230)). No PR yet.
4. **Codex switch parse errors / "account does not exist" (medium):** generic switch failures reported on v3.20.x ([#7265](https://github.com/farion1231/cc-switch/issues/7265), [#7032](https://github.com/farion1231/cc-switch/issues/7032)).
5. **GPT-5.6 reasoning-effort downgrade (medium, stale):** explicit `max` effort silently mapped to `xhigh` in Claude→Responses ([#5367](https://github.com/farion1231/cc-switch/issues/5367)). Muse-spark analog was just fixed ([#7398](https://github.com/farion1231/cc-switch/pull/7398)) — same code path likely covers GPT-5.6.
6. **DeepSeek official Responses API 404 (medium, stale):** Codex via DeepSeek official ([#5408](https://github.com/farion1231/cc-switch/issues/5408)).
7. **Claude→Responses streaming primed indefinitely (medium, stale):** no visible output under certain conditions ([#5368](https://github.com/farion1231/cc-switch/issues/5368)).
8. **Skills ghost entries (low, stale):** deleted skills still surface in the UI ([#5352](https://github.com/farion1231/cc-switch/issues/5352)).
9. **DNS hijack regression (low, closed):** cc-switch was resolving `api.deepseek.com` to `127.0.0.1` under proxy mode — closed ([#7125](https://github.com/farion1231/cc-switch/issues/7125)).
10. **ARM64 Kylin V10 GLIBC mismatch (low, closed):** GLIBC 2.31 build request closed without delivery — track separately if you need it ([#1120](https://github.com/farion1231/cc-switch/issues/1120)).

## What This Means for Application Developers

- **If you script Codex sessions across provider switches:** pin to v3.20.3 with [PR #7386](https://github.com/farion1231/cc-switch/pull/7386) and [#7395](https://github.com/farion1231/cc-switch/pull/7395) merged, or plan for migration: every existing Codex thread records its provider in SQLite, so either your tool must rebind on takeover or accept that pre-switch conversations become un-openable. Test continuity before relying on long Codex histories.
- **Routing/multi-vendor combination:** the long-standing request for composite routing ([#3703](https://github.com/farion1231/cc-switch/issues/3703), 17 comments, 6 👍) is still open and the only "router" PR landed was closed as not-merged ([#7387](https://github.com/farion1231/cc-switch/pull/7387)). Don't assume CC Switch will fan-out/fail-over between providers in this release — bring your own gateway.
- **If you target Google Gemini workflows:** Gemini CLI as a standalone is effectively EOL upstream; switch your integration assumptions to Google Antigravity (`agy`, `~/.gemini/antigravity*/brain/...`) as soon as [#7402](https://github.com/farion1231/cc-switch/pull/7402) ships, and don't depend on `~/.gemini/tmp/*/chats/` paths beyond this release cycle.
- **Reasoning-effort routing:** any custom model your gateway adds must be listed in `supports_reasoning_effort()` (or the equivalent registry), or effort parameters will silently no-op in the Anthropic→Responses transform. Verify with a probe before advertising reasoning-tier behavior.
- **Masking is changing:** if you parse proxy request/response logs, opaque `*` redactions in outbound bodies are being replaced by reversible typed placeholders ([#7306](https://github.com/farion1231/cc-switch/pull/7306)). Update any log analyzers before upgrading.
- **SOCKS5 outbound proxies:** prefer `socks5h://` (or `http(s)://` against a mixed listener) for upstream proxies that rely on remote DNS resolution / GeoIP rules. The pure `socks5://` path in CC Switch will now resolve locally, which can break mihomo/Clash routing.
- **New provider targets to integrate with:** VS Code Copilot BYOK ([#6286](https://github.com/farion1231/cc-switch/pull/6286)), Grok account profiles ([#6792](https://github.com/farion1231/cc-switch/pull/6792)), MiniMax Code CLI ([#7383](https://github.com/farion1231/cc-switch/pull/7383)), and Hermes aggregate usage ([#6120](https://github.com/farion1231/cc-switch/pull/6120)) — all ready for end-user testing even though no release has shipped them yet.
- **Security posture:** the proposed security-audit pass against upstream relay "中转站" (prompt-injection

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-15

A daily snapshot of activity in [QuantumNous/new-api](https://github.com/QuantumNous/new-api), the unified LLM gateway / inference orchestration project. Focus: stability, regressions, and infrastructure-relevant changes.

---

## 1. Today's Highlights

The project remains in the **v1.0.0-rc.** series (currently at RC.37), and today's traffic is dominated by a **critical memory regression in RC.37** (resident memory jumped from ~75 MB to ~1.8 GB, causing OOM on small instances, [#7361](https://github.com/QuantumNous/new-api/issues/7361)) alongside a previously-merged **memory-rate-limiter rewrite** using LRU linked lists that cuts in-memory limiter footprint ([#6807](https://github.com/QuantumNous/new-api/pull/6807)). On the channel-backend side, new **vLLM and SGLang channel integrations** landed ([#7332](https://github.com/QuantumNous/new-api/pull/7332)), and the Ollama streaming `tool_calls` drop bug — particularly visible on qwen3-coder — was fixed in two near-simultaneous patches ([#7376](https://github.com/QuantumNous/new-api/pull/7376), [#7380](https://github.com/QuantumNous/new-api/pull/7380)).

---

## 2. Releases & Breaking Changes

- **No new tagged releases in the last 24 h.**
- Project is on **v1.0.0-rc.37** (see [#7279](https://github.com/QuantumNous/new-api/issues/7279), which requests a written **GA exit criteria** now that the RC count is at 37 — 👍 8, the highest-trafficked item today). No response from maintainers in this window.
- **Deployment-relevant changes merged/closed today:**
  - **Pass-through relay no longer silently drops channel `param_override`** ([#7346](https://github.com/QuantumNous/new-api/pull/7346)). Previously, when `pass_through_body_enabled` was set on a channel, the gateway replayed the original body verbatim and skipped `ApplyParamOverrideWithRelayInfo`; the two features were effectively mutually exclusive. The fix introduces `buildPassthroughRequestBody` so channel overrides are applied even on passthrough. Operators relying on passthrough to bypass gateway rewrites should **re-test overrides** — behavior on passthrough channels has changed.
  - **Global URL prefix support** ([#7350](https://github.com/QuantumNous/new-api/pull/7350)). New `NEW_API_ROUTE_PREFIX` env var; `/v1`, `/api`, `/pg`, `/mj`, `/oauth` are now mounted under that prefix and routing helpers are prefix-aware. This is a **mount-path-affecting change** — any reverse-proxy config that hard-coded those paths should be reviewed before upgrade.
  - **DeepSeek balance fix under CNY pricing** ([#6814](https://github.com/QuantumNous/new-api/pull/6814)). Distinguishes CNY vs USD responses, defaults DB `Balance` to USD, and converts when only CNY is returned. Closes [#5063](https://github.com/QuantumNous/new-api/issues/5063).

---

## 3. New Model & Hardware Support

- **vLLM and SGLang channels** ([#7332](https://github.com/QuantumNous/new-api/pull/7332), closed). The gateway can now front self-hosted vLLM and SGLang deployments as first-class channels — meaningful for self-hosted inference backends that were previously reachable only by treating them as generic OpenAI-compatible channels.
- **Ollama per-channel OpenAI-compatible switch** ([#7382](https://github.com/QuantumNous/new-api/pull/7382), closed). Adds a per-channel toggle to use OpenAI-compatible framing against Ollama, useful when Ollama is fronted by an OpenAI shim.
- **Huawei MaaS channel** ([#7239](https://github.com/QuantumNous/new-api/pull/7239), still **OPEN**, awaiting maintainer feedback). Would add direct routing to Huawei's MaaS service.
- **Aliyun Bailian "HappyHorse" model** ([#7375](https://github.com/QuantumNous/new-api/issues/7375)) — closed as invalid / not a real model; ignore.
- **Vertex AI → controlled GCS proxy** enhancement request ([#7121](https://github.com/QuantumNous/new-api/issues/7121)) still open; relevant for ops that need egress-controlled file generation pipelines.
- No new GPU/quantization-format support landed today (no CUDA/ROCm/Metal/INT4/AWQ/GPTQ changes).

---

## 4. Performance & Optimization

- **In-memory rate limiter rewrite — LRU + linked list** ([#6807](https://github.com/QuantumNous/new-api/pull/6807), closed). The previous implementation pre-allocated `make([]int64, 0, maxRequestNum)` per limiter instance, which caused OOM when `GLOBAL_API_RATE_LIMIT` was set very high (see [#6732](https://github.com/QuantumNous/new-api/issues/6732), [#6159](https://github.com/QuantumNous/new-api/issues/6159)). The new implementation allocates on demand and actively evicts. This is the proper fix for the long-standing high-rate-limit OOM, and **supersedes (or runs alongside) the RC.37 change** that has itself been reported as a memory regression. Operators should validate which version is actually deployed.
- **OpenAI relay — restore client-disconnect drain wiring** ([#7379](https://github.com/QuantumNous/new-api/pull/7379), closed). A regression introduced when merging RC.31 reverted 5 OpenAI stream handlers to bare `NewStreamScanner`, dropping the project's `TextStream…` lifecycle that drains the upstream on client cancel. Restoring this prevents wasted upstream compute on cancelled requests. (Pairs with [#7134](https://github.com/QuantumNous/new-api/issues/7134), which complains that client-cancelled streams were being **counted as failures** in the performance success-rate metric — that accounting bug is still open.)
- **Pricing-page sort menu horizontal jitter fix** ([#7145](https://github.com/QuantumNous/new-api/pull/7145)) and **model-square 24h success bar spacing** ([#7284](https://github.com/QuantumNous/new-api/pull/7284)) — UI-only.
- **Self usage-history API** now supports case-insensitive substring filter on `model_name` ([#7381](https://github.com/QuantumNous/new-api/pull/7381)).

No concrete throughput / tokens-per-second / latency numbers were published today.

---

## 5. Stability & Regressions

**Critical**

- **RC.37 memory regression: ~75 MB → ~1.8 GB resident, OOM on small VMs** ([#7361](https://github.com/QuantumNous/new-api/issues/7361), closed-without-fix in the data window). Reported against the official Docker image, self-hosted. **No PR linked in today's window.** **Recommendation: hold RC.36 in production until a fix is tagged.**

**High**

- **`GLOBAL_API_RATE_LIMIT` OOM** ([#6732](https://github.com/QuantumNous/new-api/issues/6732), closed). Root-caused to the pre-allocated limiter slice; addressed by [#6807](https://github.com/QuantumNous/new-api/pull/6807) — but operators on RC.37 should confirm whether that PR is in their build.
- **Pass-through relay silently ignored channel `param_override`** ([#7346](https://github.com/QuantumNous/new-api/pull/7346), closed). Correctness bug — settings were being eaten, not just inefficient. Fix is merged.
- **Ollama streaming `tool_calls` dropped on the final `done:true` frame** ([#7252](https://github.com/QuantumNous/new-api/issues/7252), closed). Reproduced on qwen3-coder; both [#7376](https://github.com/QuantumNous/new-api/pull/7376) and [#7380](https://github.com/QuantumNous/new-api/pull/7380) (CLOSED) address it. Multiple fix attempts in the same day suggests a brief race — track which one the next RC picks.
- **Creem payment webhook returns 403** ([#2650](https://github.com/QuantumNous/new-api/issues/2650), open/stale, 8 comments). Documentation/configuration gap, not a code crash.

**Medium**

- **`/v1/responses` SSE: floating-point `created_at` causes 3 snapshot events to be dropped, usage lost, billing falls back to estimate** ([#6822](https://github.com/QuantumNous/new-api/issues/6822), closed). Material for anyone using the Responses streaming path with non-integer timestamps.
- **DeepSeek channel returns balance in wrong currency under CNY pricing** ([#5063](https://github.com/QuantumNous/new-api/issues/5063) → [#6814](https://github.com/QuantumNous/new-api/pull/6814)). Fixed.
- **Advanced custom routing + model mapping conflict** ([#6639](https://github.com/QuantumNous/new-api/issues/6639), open). Requests not forwarded correctly when both are configured.
- **`/v1/responses` system prompt not injected for non-Codex channels** ([#6879](https://github.com/QuantumNous/new-api/pull/6879), still open). Refactor into `ResponsesHelper` to centralize injection.
- **Channel retry selects by channel ID order instead of priority** ([#7007](https://github.com/QuantumNous/new-api/issues/7007), closed).
- **Pricing expression language lacks `weekday()` — can't express Mon–Fri peak pricing** ([#7011](https://github.com/QuantumNous/new-api/issues/7011), closed).
- **Tiered-billing models log "dynamic pricing · no match" incorrectly** ([#7296](https://github.com/QuantumNous/new-api/issues/7296), closed).
- **Performance success-rate metric polluted by client-cancelled streams** ([#7134](https://github.com/QuantumNous/new-api/issues/7134), open). Independent of #7379's drain fix — the accounting side still needs work.
- **Stale issues still open** (low recent activity but worth noting): stale-bug [#2650](https://github.com/QuantumNous/new-api/issues/2650), stale [#3240](https://github.com/QuantumNous/new-api/issues/3240) (LiteLLM-style `encrypted_content_affinity`), stale [#3260](https://github.com/QuantumNous/new-api/issues/3260) (video preview broken since 0.11.4).

---

## 6. What This Means for Application Developers

- **Hold production on v1.0.0-rc.36** until the RC.37 memory regression has a tagged fix. RC.37 ships feature work you want (e.g. pass-through param override, global URL prefix, Ollama tool_calls fix) but the resident-memory blow-up is a showstopper on <2 GB containers.
- **Re-test pass-through channels.** If you were relying on `param_override` being a no-op on passthrough (some teams do this to "lock down" certain channels), behavior has changed — the override is now actually applied. Validate downstream contracts.
- **Reverse-proxy / path routing**: the `NEW_API_ROUTE_PREFIX` env var can shift mount paths. If you pinned `/v1`, `/api`, `/pg`, `/mj`, `/oauth` in nginx/Caddy/Traefik, plan a config update before next upgrade.
- **New backend option for self-hosters:** vLLM and SGLang are now first-class channels, so you can route subsets of traffic to GPU pools running either engine without pretending they're generic OpenAI endpoints. Useful for capacity planning across heterogeneous hardware.
- **Ollama + tool calling in stream mode** is fixed — if you previously disabled tools when streaming against Ollama (qwen3-coder and similar), re-enable them after the next RC that contains [#7376](https://github.com/QuantumNous/new-api/pull/7376) or [#7380](https://github.com/QuantumNous/new-api/pull/7380).
- **WebSocket Responses relay** ([#5062](https://github.com/QuantumNous/new-api/pull/5062), closed) is a notable capability for Codex-style sessions over WS — worth a look for real-time agent loops.
- **Set sane rate limits.** Until you confirm the LRU limiter from [#6807](https://github.com/QuantumNous/new-api/pull/6807) is in your build, avoid very high `GLOBAL_API_RATE_LIMIT` values — the legacy pre-allocated slice is the OOM source.
- **Pricing/billing correctness** is getting active attention: CNY/USD accounting (DeepSeek), tiered-billing summaries, retry-priority, and `weekday()` peak pricing are all landing. If you're an operator with multi-region or peak/off-peak pricing requirements, watch the next RC for these.

*Compiled from 41 issues and 31 PRs updated in the QuantumNous/new-api repository over the last 24 h. No releases were tagged in that window.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*