# AI Infrastructure Digest 2026-09-08

> Generated: 2026-09-07 23:30 UTC | Projects covered: 9

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

## 1. Ecosystem Overview

The serving-engine layer (vLLM, SGLang) is absorbing the newest frontier architectures — DeepSeek-V4, GLM-5.x, Kimi-K3, Qwen3.8 hybrid-GDN — and paying for it in correctness debt, with speculative decoding and prefix-cache interactions now the single largest source of silent-corruption bugs (30–40% throughput loss in vLLM #53670, greedy divergence in llama.cpp #25618). Optimization effort has shifted from raw kernels toward memory-tier and lifecycle management: SGLang's Weight Cache Daemon collapses 235B FP8 loads from ~5 minutes to <1s, while Rust cores and cold-start elimination signal that autoscaling economics now matter as much as steady-state throughput. The gateway layer is converging on the OpenAI Responses API as the new integration boundary, with billing/spend correctness emerging as its weakest point. Consumer Blackwell silicon (SM120/121, B300 sm_103) remains a persistent support gap across all engines. It was a quiet release day — only 2 tagged releases across 9 projects — but merge activity stayed heavy.

## 2. Activity Comparison

*Counts are distinct issues/PRs surfaced in today's digests, not full-repo totals.*

| Project | Layer | Issues | PRs | Release Status |
|---|---|---|---|---|
| vLLM | Serving engine | 23 | 17 | None (nightlies only) |
| SGLang | Serving engine | 21 | 20 | None; main carries a broken `transformers` pin (#38183) |
| llama.cpp | Local runtime substrate | 20 | ~26 | **10 build bumps** (b10831–b10850) |
| Ollama | Local runtime/UX | 15 | 14 | None; 0.33.x carries a ~5× CUDA regression (#18225) |
| LiteLLM | Enterprise gateway | 22 | 14 | None cut; v1.100.1 in prep (#40176) |
| Unsloth | Fine-tuning tooling | 16 | 9 | None |
| Claude Code Router | Client-side agent router | 3 | 3 | None |
| CC Switch | Client-side agent router | 15 | 14 | **v3.20.2** (Codex/Grok compat) |
| New API | Multi-provider relay | 15 | 10 | **v1.0.0-rc.35** (Wan 3.0, plugin routing) |

## 3. Model Support Race

**Leaders: vLLM and SGLang**, both shipping first-class support for the Q4-2026 frontier generation — but support ≠ stability:

- **Qwen3.8 / hybrid-GDN family** — vLLM (EAGLE/MTP fixes, NVFP4+MTP paths) and SGLang (Qwen3-Next rebase) are ahead; llama.cpp and Ollama are still fighting load and parser bugs on the same architectures.
- **DeepSeek-V4** — vLLM (warmup migration in flight), SGLang (AMD KV-layout flag), llama.cpp (Vulkan fused hyper-connection ops). All three engines engaged; vLLM carries open non-determinism bugs (#53257).
- **GLM-5.x / Kimi-K3** — concentrated in vLLM + SGLang, with three open GLM correctness bugs on SGLang's side and Kimi-K3 PD-disagg corruption in vLLM (#52627).
- **Quantization breadth** — llama.cpp leads (TQ1_0 on Vulkan); SGLang adds NVFP4 MoE dispatch.
- **API-level models** — the gateway trio races separately: New API ships Wan 3.0 video and Huawei MaaS in review; CC Switch adds Grok via native Responses API and Copilot-as-provider; LiteLLM lags with **broken registry entries** for `gpt-6-astra` and `gpt-5.6-sol` (#40123, #40102).

**Local tier lags by design**: Ollama's Spark X2.5 support is gated on a llama.cpp bump (b10829), and Unsloth's Qwen 3 AVL support is still a request (#10459).

## 4. Performance Frontier

Optimization effort clusters in five areas:

1. **Speculative decoding** — the dominant lever and dominant risk. vLLM is fixing a 30–40% batch-throughput loss from EAGLE/MTP prefix-cache last-block drops (#52244); llama.cpp has greedy-output divergence on quantized targets (#25618); Unsloth shipped acceptance-rate measurement tooling (`unsloth/spec_decoding`) — evidence the ecosystem wants spec decoding gated on evidence, not vibes.
2. **Memory/KV management** — SGLang's Rust radix-tree core (SWA branching cache, Mamba/Full-KV arena eviction, hybrid page freeing) is the deepest investment; vLLM's work is fix-shaped (prefix-cache/MTP interactions, YaRN reuse #54094).
3. **MoE kernels & quantization** — vLLM's H20 block-FP8 retune (+21%, #54668), SGLang's FP8 epilogue-fusion proposal, GLM-5.2 fp32 router-bias fix; llama.cpp pushes branchless unpack + expert H2D prefetch.
4. **Cold start / lifecycle** — SGLang's Weight Cache Daemon (306–327s → <1s for 235B FP8) and vLLM's build-time bytecode precompilation (8,706 `.pyc` eliminated) directly change autoscaling and canary-rollout economics.
5. **Distributed serving** — SGLang's Context-Parallelism Q3 roadmap and TBO metadata fixes vs. vLLM's Elastic EP on Model Runner V2; llama.cpp's RDMA RPC closed pending rework.

## 5. Layer Positioning

- **Datacenter serving engines (vLLM, SGLang):** compete on frontier-model velocity, PD disaggregation, EP/CP scaling, spec decoding. Highest blast radius — their bugs are silent output corruption, not 500s.
- **Local runtime stack (llama.cpp → Ollama):** llama.cpp is the quantization/kernel substrate; Ollama is the UX layer with a hard version dependency (its Spark X2.5 and MLX YaRN work sits one bump above upstream). Both now chase agent-workload features (tool parsers, HF Discover, metrics).
- **Gateways (LiteLLM, New API):** LiteLLM is enterprise-grade on auth/encryption (MCP secret encryption, RBAC landed today) but weak on spend correctness (uncharged streaming #29913, halved rate limits #34140). New API is stronger on relay mechanics (TTFB failover, pass-through model mapping) and weaker on API surface breadth.
- **Client-side agent routers (CCR, CC Switch):** thin layers over Claude Code/Codex CLI behavior; their risk profile is upstream drift (Codex heartbeats corrupting sessions #6995, Cowork tool-name normalization #1766), not serving capacity. CC Switch's classifier-queue routing (#6602) is the most architecturally novel item in this tier.
- **Fine-tuning (Unsloth):** bridges training and serving via llama.cpp integration and spec-decoding measurement — the only project whose unit of work is the *model artifact*, not the request.

## 6. Trend Signals

1. **Speculative decoding is graduating from optimization to liability.** Three of five projects have open spec-decoding correctness bugs. Watch: treat MTP/EAGLE as opt-in with an eval gate; Unsloth's acceptance-rate tooling is the template.
2. **Hybrid/linear-attention models are breaking cache layers everywhere** — prefix-cache misses (vLLM), HiCache restore corruption (SGLang #38031), recurrent rollback crashes (llama.cpp #28425). If you serve GDN/DSA/Mamba hybrids, cache-hit-rate dashboards are now a correctness monitor, not just a cost monitor.
3. **The Responses API is the new battleground** — Ollama accepting `agent_message`, New API fixing `reasoning_text.delta`, CC Switch proxying Codex `/responses`, LiteLLM's bridge dropping `encrypted_content`. Budget for bridge conformance testing.
4. **Billing correctness is the gateway blind spot** — New API bills incomplete responses as 0 (#7241) and charges after disconnect (#7231); LiteLLM writes no spend rows on streaming failures (#29913). Run independent usage reconciliation; don't trust gateway spend logs as ground truth.
5. **Cold-start collapse changes fleet economics** — sub-second 235B loads (SGLang) make ephemeral/autoscaled GPU fleets viable; expect vLLM to match.
6. **Blackwell consumer silicon is the support frontier** — Xid 13 crashes (vLLM #55571, SGLang #34340), sm_103 family-check bugs, DGX Spark kernel gating. Meanwhile A100/SM80 FP8 paths are actively regressing in three projects. Pin hardware-specific nightlies and validate before fleet rollout.
7. **Tool-call parsing remains the #1 agent-layer fragility** — Qwen XML-in-`<think>` (vLLM #39056), Gemma 4 malformed args (Ollama), parallel-call mangling (llama.cpp #28522), Ollama streaming tool_calls dropped (New API #7252). Content-aware parser testing should be part of every promotion gate for agentic traffic.

**Bottom line:** engines are winning the throughput war but accruing silent-corruption debt exactly where agents are most sensitive (determinism, tool calls, cache reuse); gateways are winning on integration breadth but leaking money at the billing seam. The projects that instrument correctness (acceptance rates, cache-hit telemetry, usage reconciliation) will define the next quarter's defaults.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-08

## Today's Highlights

The DSv4 warmup migration continued advancing through the queue (#50176, #50178, #53567) alongside an active Kimi-K3 stabilization push (#55774, #55747), while a long-running batch-invariant inference thread crossed 89 comments (#27433). The day's most consequential signal for production users is a flurry of EAGLE/MTP + prefix-cache interactions (#53670, #52244, #54094) that together account for 30–40% throughput loss on hybrid GDN layouts — a fix is already in flight.

## Releases & Breaking Changes

*No new releases in the last 24h.* The current `vllm/vllm-openai` nightly tags referenced in the issue threads include `vllm/vllm-openai-xpu nightly 2026-09-02` (vLLM 0.28.1rc1) and `vllm/vllm-openai:nightly-aarch64` (vLLM 0.26.1rc1.dev1102).

## New Model & Hardware Support

- **EAGLE3 for Sarvam MLA** — `SarvamMLAModel` now uses `EagleModelMixin` to expose auxiliary hidden states for an EAGLE3-compatible drafter on a single pipeline stage ([#53052](https://github.com/vllm-project/vllm/pull/53052)).
- **Granite tool parser → streaming Parser Engine** — fixes surrounding-text wrapping bugs as a side effect of the engine migration ([#49648](https://github.com/vllm-project/vllm/pull/49648)).
- **Attention sinks in Transformers backend** — backports the `GraniteSWA`/`GraniteMoeSWA` correctness fix to the Transformers modeling path that previously dropped sink tokens silently ([#52156](https://github.com/vllm-project/vllm/pull/52156)).
- **XPU int8 quant test coverage** — `test_per_token_group_quant_int8` is no longer gated on `torch.cuda.is_available()` ([#55681](https://github.com/vllm-project/vllm/pull/55681)).
- **ROCm fp32 router for `glm_moe_dsa`** — fixes GLM-5.3's declared `moe_router_dtype` policy ([#55378](https://github.com/vllm-project/vllm/pull/55378)).
- **Elastic EP on Model Runner V2** — removes the V1 fallback once MRV2 becomes default ([#53934](https://github.com/vllm-project/vllm/pull/53934)).

## Performance & Optimization

- **H20 block-FP8 fused MoE low-batch retune (+21%)** — `BLOCK_SIZE_N=128` → wider N tile for `E=256, N=256`; relevant for GLM-5.3 TP=8 and DeepSeek-family K=7168 ([#54668](https://github.com/vllm-project/vllm/pull/54668)).
- **Hybrid GDN prefix-cache hit restoration under MTP** — `Qwen3.5-122B-A10B` replay currently never reaches full depth and misses entirely when prompt length aligns to the hash unit; PR brings it back to expected reuse ([#52244](https://github.com/vllm-project/vllm/pull/52244)).
- **Python bytecode compiled at image build time** — eliminates per-container `.pyc` generation; measured 8,706 `.pyc` files added on first startup of vLLM 0.28.0 ([#55422](https://github.com/vllm-project/vllm/pull/55422)).
- **Opt-in `v<release>-x86_64-zstd` image tag** — addresses image-size complaints tracked in #28656 ([#55608](https://github.com/vllm-project/vllm/pull/55608)).
- **Length-aware batch composition RFC** — interleaves largest/smallest prompts inside a scheduling step; the OP ships evidence and a fairness analysis but explicitly calls out where the heuristic breaks ([#55265](https://github.com/vllm-project/vllm/issues/55265)).

## Stability & Regressions

**Critical (crashes / data corruption)**
- **Xid 13 / illegal memory access on RTX PRO 5000 (SM120) with FP8 sustained load** — reproducible; cleanly gone with `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` or `--enforce-eager` ([#55571](https://github.com/vllm-project/vllm/issues/55571)).
- **Silent CUDA IMA (exit 0), hybrid GDN + MTP k=3, RTX 3090** — persists across #50021/#45100/#53613-class fixes ([#53726](https://github.com/vllm-project/vllm/issues/53726)).
- **Kimi-K3 silent output corruption in 1P1D NIXL Direct-PD** — NIXL-only path is clean; corruption appears only with MooncakeStore + NixlConnector via MultiConnector ([#52627](https://github.com/vllm-project/vllm/issues/52627)). Fix in flight: [#55774](https://github.com/vllm-project/vllm/pull/55774), [#55747](https://github.com/vllm-project/vllm/pull/55747).
- **DeepSeek-V4-Flash incorrect output with inline system messages** — regression from PR #46025's three-way behavior split for `chat_template` raises/loose/in-place ([#46710](https://github.com/vllm-project/vllm/issues/46710)).
- **DeepSeek-V4 NaN MQA logits → uninitialized smem as indices** on SM12x — prefill-only crash path ([#49896](https://github.com/vllm-project/vllm/issues/49896)).
- **Engine core livelock (100% CPU, no crash)** — MTP spec decoding + xgrammar structured outputs, regressed from v0.24.0 ([#49210](https://github.com/vllm-project/vllm/issues/49210)).

**High (correctness / determinism)**
- **Qwen3.8-Flash-Next greedy decoding is non-deterministic** when prompt length crosses `indexer_budget`; five identical requests, five different completions on a GB10 ([#54521](https://github.com/vllm-project/vllm/issues/54521)).
- **DeepSeek-V4-Flash non-deterministic at temperature=0**, rate scales with concurrency on B300 SXM6 ([#53257](https://github.com/vllm-project/vllm/issues/53257)).
- **vLLM 0.19 loses tool calls** when `Qwen/Qwen3.5-35B-A3B-FP8` emits XML `<tool_call>` markup inside `<think>` with `--reasoning-parser qwen3 --tool-call-parser qwen3_coder` ([#39056](https://github.com/vllm-project/vllm/issues/39056)).
- **EAGLE/MTP prefix-cache last-block drop** — 1,648-token recompute per hit on one hybrid Qwen3.8 GDN layout, 30–40% batch throughput loss ([#53670](https://github.com/vllm-project/vllm/issues/53670)). Fix PR: [#52244](https://github.com/vllm-project/vllm/pull/52244).
- **`prompt_logprobs` silently corrupted** under MTP spec decoding on Qwen3.5-family with chunked prefill — observed on two independent builds and checkpoints ([#53488](https://github.com/vllm-project/vllm/issues/53488)).
- **FlashInfer + MTP crashes on SM121 (DGX Spark)** with GQA=16; Triton path works ([#37754](https://github.com/vllm-project/vllm/issues/37754)).
- **Mamba-2 Triton kernels `cudaErrorIllegalInstruction`** on SM121 in async mode (DGX Spark); `CUDA_LAUNCH_BLOCKING=1` masks it ([#37431](https://github.com/vllm-project/vllm/issues/37431)).

**Medium (workaround exists or narrow scope)**
- **Qwen3.8-Flash-Next-FP8 fails to start on A100 (SM80)** — Triton `fp8e4nv` unsupported below SM89. Fix PR: [#54287](https://github.com/vllm-project/vllm/pull/54287).
- **Mamba `mamba_ssm_cache_dtype` crashes EngineCore** when not float32 and not equal to activation dtype. Fix PR: [#54123](https://github.com/vllm-project/vllm/pull/54123).
- **DFlash2 + YaRN zero prefix-cache reuse** for identical 1.04M prompts while target-only reuses ~1.039M ([#54094](https://github.com/vllm-project/vllm/issues/54094)).
- **DFlash2 draft gets 0% acceptance with `--dtype float16` on XPU** for Qwen3.8-27B; bf16 works ([#55250](https://github.com/vllm-project/vllm/issues/55250)).
- **GLM-5.3-Flash `Glm5NextTextLinearAttention` not supported** on vLLM nightly ([#54062](https://github.com/vllm-project/vllm/issues/54062)).
- **`thinking_token_budget` ignored by Model Runner V2** with Qwen3.8 NVFP4 + MTP ([#54906](https://github.com/vllm-project/vllm/issues/54906)).
- **GLM-5.3 NVFP4 KV cache not wired on SM120** — FlashInfer ships the kernels, vLLM doesn't use them; OP has a working prototype hitting 245K ctx on a 5090 ([#49011](https://github.com/vllm-project/vllm/issues/49011)).

**Low**
- **Spurious `EngineDeadError` traceback** on graceful shutdown ([#48745](https://github.com/vllm-project/vllm/issues/48745)).
- **Local GGUF path fails** for `qwen35` even with `--hf-config-path` ([#36456](https://github.com/vllm-project/vllm/issues/36456)).

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-08

## Today's Highlights

The 24-hour window shows continued hardening of the **GLM-5.x family** (FP4/EAGLE illegal memory access in flashinfer-trtllm batched-GEMM, HiCache host-tier load-back corrupting GLM-5.3-Flash generation, B300 sm_103 support gaps), alongside meaningful infrastructure work on **unified memory management** (Rust TreeCore SWA branching-point caching, Mamba/Full KV eviction, HiCache host-pointer alias fixes on AMD). A long-running roadmap on **Context Parallelism for 2026 Q3** saw fresh activity.

## Releases & Breaking Changes

*No new releases in the last 24h.*

Two near-breaking changes are landing in `main`:

- **AMD DSV4 KV layout flag rename** ([#38373](https://github.com/sgl-project/sglang/pull/38373)) — the `SGLANG_HACK_FLASHMLA_BACKEND=unified_kv_triton` env is being replaced by `--dsv4-kv-layout {paged,ring}`. The old env now fails at startup with a migration message; default `paged` behavior is unchanged.
- **Transformers pin breakage on main** ([#38183](https://github.com/sgl-project/sglang/issues/38183)) — `import sglang` fails at the current pinned `transformers==5.12.1` from both directions; pin bump pending.

## New Model & Hardware Support

- **Intel XPU** added for six models in one PR ([#35304](https://github.com/sgl-project/sglang/pull/35304)): `bge-base-en-v1.5`, `nomic-embed-text-v1.5`, `granite-embedding-english-r2`, `InternVL3_5-30B-A3B`, `Hunyuan-A13B-Instruct`, `step3`.
- **NVFP4 dispatch** for MoE via standard FlashInfer TRTLLM and CuTe DSL backends ([#38216](https://github.com/sgl-project/sglang/pull/38216)).
- **GigaChat-3.5-432B-A28B** support ([#29189](https://github.com/sgl-project/sglang/pull/29189)).
- **Kimi-K3 embedding-cache leases** pre-acquired on the final DP route to avoid redundant VLM preprocessing ([#34411](https://github.com/sgl-project/sglang/pull/34411)).
- **AArch64 + CUDA 13 gencodes** `sm_110a` / `sm_121a` added to `infllm_ops` ([#37641](https://github.com/sgl-project/sglang/pull/37641)) — closes a long-standing gap on Grace-Hopper/Grace-Blackwell wheels.
- **AMD gfx950 assembly attention** for EAGLE verify / draft extend / decode on MI355X ([#37465](https://github.com/sgl-project/sglang/pull/37465)).
- **GLM-5.2 MoE bias kept in fp32** to preserve top-8 expert resolution ([#37133](https://github.com/sgl-project/sglang/pull/37133)) — bias values in [6.817, 7.063] lose ~8 levels of discrimination in bf16.
- **Qwen3-Next rebase** ([#37500](https://github.com/sgl-project/sglang/pull/37500)) — original PR #36497 re-pushed.

## Performance & Optimization

- **Weight Cache Daemon** roadmap ([#33522](https://github.com/sgl-project/sglang/issues/33522)) — Phase 1 ([#27139](https://github.com/sgl-project/sglang/pull/27139)) lands post-quantized weights in a per-rank daemon, served over CUDA IPC. Reported **Qwen3-235B FP8 weight load: 306–327s → <1s**. Phase 2 (out-of-process HiCache IPC) is now an RFC ([#37372](https://github.com/sgl-project/sglang/issues/37372)).
- **Unified Radix Tree → Rust core**: SWA branching-point caching ported from Python ([#37584](https://github.com/sgl-project/sglang/pull/37584)) and iterative DFS weight ordering ([#38313](https://github.com/sgl-project/sglang/pull/38313)).
- **Hybrid SWA page freeing** ([#38159](https://github.com/sgl-project/sglang/pull/38159)) — `free_swa_segment(idx, *, start_pos)` frees one representative per page on `page_size > 1`, reducing fragmentation cost on the SWA side.
- **Mamba/Full KV arena eviction** ([#36713](https://github.com/sgl-project/sglang/pull/36713)) — Mamba allocations are now constrained by both free virtual IDs *and* backing bytes, with cross-pool eviction when one side falls short.
- **AMD HiCache host-pointer alias fix** ([#35233](https://github.com/sgl-project/sglang/pull/35233)) — `hipDeviceAttributeCanUseHostPointerForRegisteredMem=false` on MI355X no longer causes custom-kernel GPU faults.
- **Fuse static FP8 quantization** into norm/activation/allreduce epilogue ([#31504](https://github.com/sgl-project/sglang/issues/31504)) — proposal targets the standalone `_static_quant_fp8` launch before every FP8 GEMM; concrete speedups not yet posted.
- **Context Parallelism 2026 Q3 roadmap** ([#21788](https://github.com/sgl-project/sglang/issues/21788), high priority, 👍 16) — prior CP work covers prefill CP for DSA (DeepSeek v32/GLM-5) and MHA/GQA on Qwen3-MoE + FA3; decode CP and unified TP+CP remain open.
- **AMD TBO dynamic forward metadata** ([#37598](https://github.com/sgl-project/sglang/pull/37598)) — proxies through the two-batch-overlap backend to fix DSV4-Pro prefill CP nightly failures across ROCm 7.2.0/7.2.4/10.

## Stability & Regressions

*Severity ordered. All new/recently active.*

1. **GLM-5.3-Flash HiCache load-back corrupts generation** ([#38031](https://github.com/sgl-project/sglang/issues/38031)) — host-tier restore loses DSA index buffers even without speculative decoding; produces dropped tool calls and degenerate repetition. **Fix PR #38212** ([link](https://github.com/sgl-project/sglang/pull/38212)) — same author.
2. **TP2 hang on B300** with HiCache + breakable prefill CUDA graphs + FlashInfer MNNVL ([#38300](https://github.com/sgl-project/sglang/issues/38300)) — fresh repro on `v0.5.18-cu130`.
3. **GLM-5.2 FP4 + EAGLE illegal memory access** in `flashinfer_trtllm` bf16 batched-GEMM for `nextn` draft MoE ([#30209](https://github.com/sgl-project/sglang/issues/30209)); triton `nextn` is now HIP-gated after #30137, so NV path is the only workaround.
4. **SM10x-gated kernels broken on B300 sm_103** ([#34340](https://github.com/sgl-project/sglang/issues/34340)) — `is_sm100_supported()` is a family check; cutedsl TGV BF16 GEMM hits Xid 13 CGA "CTA Not Present"; trtllm-gen MoE finalize hangs silently. CUDA coredumps surfaced both.
5. **DSPARK OOM under DP attention on Kimi-K3** ([#38202](https://github.com/sgl-project/sglang/issues/38202)) — draft KV pool budget uses `tp_size` instead of `attn_tp_size`.
6. **PP disaggregated prefill hangs under abort storms** ([#34572](https://github.com/sgl-project/sglang/issues/34572)) — per-stage bootstrap queue history diverges; RCA + fix series in progress.
7. **EPLB + DSPARK scatter_add_ dim mismatch** during draft CUDA graph capture ([#34974](https://github.com/sgl-project/sglang/issues/34974)).
8. **Disconnected streaming client → zombie request** flooding `state was deleted in TokenizerManager` ([#36333](https://github.com/sgl-project/sglang/issues/36333)) — regression from #34160 revert.
9. **`fp8e4nv` unsupported on A100 (SM80)** when serving Qwen3.8-Flash-Next-FP8 ([#38291](https://github.com/sgl-project/sglang/issues/38291)).
10. **FlashInfer backend not supported on Blackwell** ([#35080](https://github.com/sgl-project/sglang/issues/35080)).
11. **DeepSeekV4TokenToKVPool (SWA/HiSparse) lacks `get_cpu_copy()`** → decode-mode retract crashes with `NotImplementedError`; offload is unconditional, not gated on `--disaggregation-decode-enable-offload-kvcache` ([#33385](https://github.com/sgl-project/sglang/issues/33385)).
12. **`/v1/responses` `created_at` type mismatch** between streaming (float) and non-streaming (int) ([#34716](https://github.com/sgl-project/sglang/issues/34716), 👍 1).
13. **`--default-chat-template-kwargs reasoning_effort`** silently overrides the per-request value ([#38104](https://github.com/sgl-project/sglang/issues/38104)).
14. **MoE tuner writes int4_w4a16 configs the runtime never reads** ([#35252](https://github.com/sgl-project/sglang/issues/35252)).
15. **DP-attention `recv_requests()` startup crash** when `attn_tp>1` and `attn_cp>1` — `TypeError: object of type 'NoneType' has no len()`; **fix PR #37643** ([link](https://github.com/sgl-project/sglang/pull/37643)).
16. **CUDA Coredump Tracker** ([#26340](https://github.com/sgl-project/sglang/issues/26340)) — auto-collected coredumps from `pr-test.yml`; comment volume (294) is operational noise, not user action.

CI state ([#17050](https://github.com/sgl-project/sglang/issues/17050), auto-updated 2026-09-07 23:01 UTC): **1 broken, 9 flaky, 962 recently fixed**.

## What This Means for Application Developers

- **Pin carefully on `main`.** The `transformers==5.12.1` pin is broken both above and below; expect a bump shortly. Production deployments should stay on tagged `v0.5.18` images until next release.
- **GLM-5.x rollout needs attention.** Three open correctness/availability bugs (EAGLE on FP4, HiCache host-tier, B300 sm_103 family-check) all affect GLM-5.2/5.3-Flash; #38212 is the only one with a fix PR merged in this window. If you deploy on B300 or rely on HiCache, validate with a tool-call regression suite before promoting.
- **Cold-start times are about to collapse.** The Weight Cache Daemon ([#27139](https://github.com/sgl-project/sglang/pull/27139)/[#33522](https://github.com/sgl-project/sglang/issues/33522)) takes FP8 235B-class loads from ~5 minutes to under a second — relevant for autoscaling, canary rollouts, and CI ephemeral clusters.
- **AMD path is converging on parity.** gfx950 attention for EAGLE, HiCache host-pointer fix, and unified KV eviction all land together; MI355X is becoming a first-class target for DSV4-Pro nightly.
- **Intel XPU** now covers both embedding models (bge/nomic/granite) and chat VLMs (InternVL3_5, Hunyuan-A13B, Step3-VL) — useful if you're targeting heterogeneous fleets.
- **API drift to watch.** The `/v1/responses` `created_at` int-vs-float mismatch will silently break downstream parsers that strict-type the field; pin to one mode in client code.
- **Tool-call grammar gap:** the Spark-X2.5 parser currently falls back to `glm45` ([#37642](https://github.com/sgl-project/sglang/pull/37642)) — verify tool-call extraction if you serve Spark-X2.5 today; fix is in flight.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-08

## 1. Today's Highlights

The master branch pushed 10 build bumps (b10831–b10850) focused on Vulkan kernel maturation: TQ1_0 support, RMS_NORM fusion (~4% on gemma4), DSV4 hyper-connection fused ops, GET_ROWS alignment fixes, plus CUDA-side branchless Q4_K/Q5_K unpack and L2 prefetch for DGX Spark, and HIP gfx90c support. On the stability front, two severe regressions surfaced — a 78% Vulkan decode-throughput cliff at 131k context and silent CUDA MoE / fattn crashes with expert offload — and a new speculative-decoding bug shows greedy outputs diverging on quantized targets. The server/UI story advanced substantially with the Hugging Face Discover dialog and end-to-end model download pipeline landing across ~10 PRs.

## 2. Releases & Breaking Changes

10 new build bumps shipped in the last 24h. No explicit version API breaks declared, but behavioral notes:

- **b10850** — tests: L2_NORM batch initialization fix (compiler-uninit warnings, no runtime effect). [#28553](https://github.com/ggml-org/llama.cpp/pull/28553)
- **b10844** — vulkan: adds DSV4_HC_COMB/PRE/POST fused ops (parity with CUDA/Metal for DeepSeek-V4). [#26578](https://github.com/ggml-org/llama.cpp/pull/26578)
- **b10842** — ggml: gfx90c HIP support added. [#26454](https://github.com/ggml-org/llama.cpp/pull/26454)
- **b10840** — CUDA: branchless Q4_K/Q5_K mmvq scale unpack; L2 prefetch on DGX Spark (gated). [#26705](https://github.com/ggml-org/llama.cpp/pull/26705)
- **b10839** — vulkan: type-aligned GET_ROWS with CPU fallback for misaligned offsets. [#28253](https://github.com/ggml-org/llama.cpp/pull/28253)
- **b10837** — caps: recheck typed content when template requires string. [#28511](https://github.com/ggml-org/llama.cpp/pull/28511)
- **b10835** — ggml-cuda: fix divergent barrier in f16 flash attention. [#27870](https://github.com/ggml-org/llama.cpp/pull/27870)
- **b10834** — ggml: backend inputs no longer force an extra split. [#28387](https://github.com/ggml-org/llama.cpp/pull/28387)
- **b10833** — vulkan: RMS_NORM fusion (RMS+VIEW+SET_ROWS, +MUL+ADD). [#28024](https://github.com/ggml-org/llama.cpp/pull/28024)
- **b10831** — vulkan: TQ1_0 (mm, mat-vec, dequant, get_rows). [#27765](https://github.com/ggml-org/llama.cpp/pull/27765)

## 3. New Model & Hardware Support

- **DeepSeek-V4 hyper-connection fused ops** on Vulkan (DSV4_HC_COMB/PRE/POST) — closes the backend parity gap with CUDA/Metal. [#26578](https://github.com/ggml-org/llama.cpp/pull/26578)
- **TQ1_0 quantization** added to Vulkan (mm, mat-vec, mat-vec-id, dequant, get_rows) — terse-3-base quant now fully GPU-accelerated. [#27765](https://github.com/ggml-org/llama.cpp/pull/27765)
- **gfx90c (AMD ROCm)** HIP backend support added in ggml. [#26454](https://github.com/ggml-org/llama.cpp/pull/26454)
- **Hexagon (Qualcomm)** backend gains f32 RELU and LEAKY_RELU ops. [#28585](https://github.com/ggml-org/llama.cpp/pull/28585)
- **RFC**: diffusion GGUF ingestion for image/video/audio generation (LTX-2). [#28541](https://github.com/ggml-org/llama.cpp/issues/28541)

## 4. Performance & Optimization

- **Vulkan RMS_NORM fusion** (RMS + MUL + ADD + MUL, RMS + VIEW + SET_ROWS, ROPE + VIEW + SET_ROWS with IMROPE) → ~**4% gain on gemma4**. [#28024](https://github.com/ggml-org/llama.cpp/pull/28024)
- **CUDA Q4_K/Q5_K branchless unpack** → stops per-column scale re-execution in mmvq; meaningful at batch > 1. [#26705](https://github.com/ggml-org/llama.cpp/pull/26705)
- **CUDA L2 prefetch** on DGX Spark (gated). [#26705](https://github.com/ggml-org/llama.cpp/pull/26705)
- **ggml: backend input split avoidance** — fewer graph splits when a tensor is consumed by only one backend. [#28387](https://github.com/ggml-org/llama.cpp/pull/28387)
- **In-progress**: `--prefetch-experts-slots N` for lookahead H2D prefetch of host-resident MoE experts (offload-heavy scenarios). [#28414](https://github.com/ggml-org/llama.cpp/pull/28414)
- **In-progress**: ggml-rpc RDMA (RoCEv2) transport — claimed substantial wins for two-node iGPU cluster splits; PR closed today (likely needs rework). [#20590](https://github.com/ggml-org/llama.cpp/pull/20590)
- **In-progress**: structured `LOG_JSON` macro for machine-readable server logs, supersedes --list-devices-format json work. [#28586](https://github.com/ggml-org/llama.cpp/pull/28586)

## 5. Stability & Regressions

Ranked by severity; fix status noted.

**High**
- [#28448](https://github.com/ggml-org/llama.cpp/issues/28448) — `ggml_gallocr` silently reuses stale allocation plan on node identity change at same graph position → silent memory corruption on **sparse MoE** routing. **No fix merged yet.**
- [#27734](https://github.com/ggml-org/llama.cpp/issues/27734) — **~78% decode throughput cliff at 131072 context** on Vulkan (AMD RX 7900 XTX, Windows). Root cause: default ~1 GiB suballocation block fragments at 128k; workaround `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`. **No fix merged.**
- [#28425](https://github.com/ggml-org/llama.cpp/issues/28425) — recurrent/hybrid architectures (`qwen4exp`) rollback (`n_rs_seq`) only reachable inside speculative decoding → crash or unbounded memory growth for non-spec paths. **No fix merged.**
- [#26609](https://github.com/ggml-org/llama.cpp/issues/26609) — CUDA illegal memory access in `cudaStreamSynchronize` on flash-attn path with **Qwen3.6-35B MoE + partial expert offload**; deterministic on b10107/b10243; `-fa off` sidesteps. **No fix merged.**
- [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) — Speculative decoding (draft-mtp/draft-dspark) under greedy sampling diverges on **quantized targets** (Q4_K_M) but matches on bf16; ngram spec is fine. **No fix merged.**

**Medium**
- [#24324](https://github.com/ggml-org/llama.cpp/issues/24324) — `fattn.cu:579 fatal error` on CUDA builds with `GGML_CUDA_FA_ALL_QUANTS=ON`. **No fix merged.**
- [#25060](https://github.com/ggml-org/llama.cpp/issues/25060) — Blackwell GGML-CUDA SOFT_MAX crash on large 35B+ models; community patch proposed, not merged. **No fix merged.**
- [#28211](https://github.com/ggml-org/llama.cpp/issues/28211) — HIP/ROCm on gfx1151 (Strix Halo) produces **wrong logits** (not a crash) for prompts longer than `n_ubatch`. **No fix merged.**
- [#28361](https://github.com/ggml-org/llama.cpp/issues/28361) — K2-Horizon GGUF models fail to load. **No fix merged.**
- [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) — `--lazy-mode auto` halves pp512 for qwen4exp on Vulkan AMD iGPU after commit 257813839. Regression vs. PR #27837; **no fix merged.**
- [#28441](https://github.com/ggml-org/llama.cpp/issues/28441) — intermittent silent Qwen2.5-Omni **audio corruption** on Metal under system load (b10809). **No fix merged.**

**Low / resolved today**
- [#28518](https://github.com/ggml-org/llama.cpp/pull/28518) — `GET /v1/models` emitting enum ints as booleans (regression in b10585) → fix PR open.
- [#28406](https://github.com/ggml-org/llama.cpp/pull/28406) — server deadlock when removing finished download → fix PR open.
- [#20029](https://github.com/ggml-org/llama.cpp/issues/20029) — Mac x86 Vulkan AMD GPU garbage (since b8143) → **closed** as stale.
- [#25884](https://github.com/ggml-org/llama.cpp/issues/25884) — Windows/Vulkan split-mode broken on hybrid AMD/Intel (since 74976e1) → **closed** as stale.
- [#27856](https://github.com/ggml-org/llama.cpp/issues/27856) — qwen4exp decode slowdown beyond 1k on HIP gfx1151 → **closed**.
- [#25985](https://github.com/ggml-org/llama.cpp/issues/25985) — CoopMat2 shaders fail on glslc -O (Polaris RX 580) → **closed** as stale.
- [#25767](https://github.com/ggml-org/llama.cpp/issues/25767) — Flaky Vulkan unit tests on Intel Battlemage Linux → **closed** as stale.

## 6. What This Means for Application Developers

- **Avoid qwen4exp (`Qwen3.8-Flash-Next`/`qwen4exp` arch) on AMD iGPU Vulkan with `--lazy-mode auto`** — prefill is halved since 257813839; pin a build before that or test before shipping. [#28160](https://github.com/ggml-org/llama.cpp/issues/28160)
- **Vulkan + 128k+ context needs the suballocation workaround**: set `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` until the cliff is fixed — without it you lose ~78% decode throughput. [#27734](https://github.com/ggml-org/llama.cpp/issues/27734)
- **MoE + partial expert offload on CUDA is unsafe today**: Qwen3.6-35B (and likely siblings) deterministically crash in flash-attn with expert offload; either fully offload or stay on bf16 until [#26609](https://github.com/ggml-org/llama.cpp/issues/26609) is resolved.
- **Don't rely on speculative decoding with quantized targets**: greedy outputs diverge from vanilla on Q4_K_M; for deterministic outputs either stay bf16 or use ngram speculation. [#25618](https://github.com/ggml-org/llama.cpp/issues/25618)
- **Long-context hybrid models (Qwen3.5-hybrid, ~130k+) silently emit instant-EOS** on both CUDA and CPU — don't trust `finish_reason` heuristics in agents serving these without verifying content length. [#27756](https://github.com/ggml-org/llama.cpp/issues/27756)
- **Server UI upgrade**: the new Hugging Face Discover dialog and download pipeline (PRs #27947, #27959, #28418, #28419, #28405) plus memory-fit estimation (#27957) let end-users browse and pull GGUF + sidecars (mmproj, imatrix, mtp/dflash/dspark/eagle3 drafts) without leaving `llama-server`. Expect cache entries to be split `<quant>-<sidecar>` going forward.
- **Tool-call parsers on Qwen are still fragile**: #20837 (XML in thinking block, 60 comments) and #28522 (parallel tool_calls mangled with ~48 optional params) remain open. For tool-use reliability, gate on content-aware parsers and don't assume XML or JSON across prompt templates.
- **Server child-process management is being modernized** toward a single-threaded async model (PRs #28539, #28555) — useful context if you operate multi-model routers; `--models-memory-margin` (#21231) is the dynamic-unload knob to watch.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-08

## 1. Today's Highlights

The 2026-09-08 activity is dominated by **OpenAI-compatibility hardening and Gemma 4 parsing**: PR #18299 adds Gemma 4 `BEGIN_ARG` tool-call parsing, PR #18298 makes `/v1/responses` accept Codex-style `agent_message` items, PR #18296 fixes the `tsc_` tool-search ID prefix, and PR #16825 finally forwards `num_ctx` through `/v1/chat/completions`. In parallel, llama.cpp was bumped to **b10829** (PR #18279) to unlock Spark X2.5 support, while two fresh reports flag a **~5× CUDA regression in 0.33.x** vs 0.32.13 that should be on every infra team's radar.

## 2. Releases & Breaking Changes

No new tagged releases in the last 24h.

However, the active issue stream documents a meaningful behavior delta for anyone upgrading to **0.33.x**:
- [#18225](https://github.com/ollama/ollama/issues/18225) — `0.33.2` ~5× slower than `0.32.13` on CUDA (RTX 3090, GA102) with identical model/GPU.
- [#18129](https://github.com/ollama/ollama/issues/18129) — Scheduler reloads `llama-server` with default 4096 context immediately after a successful load.
- [#18210](https://github.com/ollama/ollama/issues/18210) (closed) — `OLLAMA_DEBUG_LOG_REQUESTS` persists full request bodies without redaction; treat as a credential/PII exposure if enabled in production.

## 3. New Model & Hardware Support

- **[PR #18279](https://github.com/ollama/ollama/pull/18279)** — llama.cpp bumped `b10760 → b10829`, the prerequisite for the Spark X2.5 family (SparkLLM/Spark-X2.5-4B, -1.7B); unblocks [#18195](https://github.com/ollama/ollama/issues/18195) and [#18290](https://github.com/ollama/ollama/issues/18290).
- **[PR #18299](https://github.com/ollama/ollama/pull/18299)** — `model/parsers`: Gemma 4 `BEGIN_ARG`/`END_ARG` tool-call parser, with malformed-channel error surfacing.
- **[PR #18263](https://github.com/ollama/ollama/pull/18263)** — MLX runner: Qwen3.5/3.8 **static YaRN** parsing, M-RoPE scaling, contexts up to `factor * original_max_position_embeddings`.
- **[PR #18285](https://github.com/ollama/ollama/pull/18285)** — MLX runner: distinguish explicit vs automatic `num_ctx`, preserves soft VRAM sizing when caller didn't pin a value.
- **[PR #18258](https://github.com/ollama/ollama/pull/18258)** — `launch`: align Qwen Code's `generationConfig.contextWindow` with the running Ollama model.
- **[#18287](https://github.com/ollama/ollama/issues/18287)** — Request: Tencent **Hy4-preview** model support (pending GGUF artifacts).

## 4. Performance & Optimization

- **[PR #16998](https://github.com/ollama/ollama/pull/16998)** — Opt-in Prometheus `GET /metrics` (`OLLAMA_METRICS=1`) exposing `ollama_requests_queued`, `ollama_queue_capacity`, `ollama_models_loaded`, `http_requests_total`, plus per-model token metrics. Big win for SRE/auto-scaling setups.
- **[PR #18282](https://github.com/ollama/ollama/pull/18282)** (closed) — Scheduler now fails fast instead of looping eviction when a model can never fit (e.g. `num_ctx 262144` on small VRAM).
- **[PR #18289](https://github.com/ollama/ollama/pull/18289)** — Scheduler reload path when two tags share a blob but require different runner flags (e.g. MTP on/off across Modelfiles built `FROM` the same base).
- **[PR #18280](https://github.com/ollama/ollama/pull/18280)** — `x/transfer`: finalize a `.tmp` that already equals the full blob; closes the last edge of [#15320](https://github.com/ollama/ollama/issues/15320) on resumable downloads.
- **[PR #18291](https://github.com/ollama/ollama/pull/18291)** — `fs/gguf`: fixes `int64` overflow + `float64` round-trip in `TensorInfo.NumValues()`/`NumBytes()`; correctness fix for very large tensors.

## 5. Stability & Regressions

Ranked by likely infrastructure impact:

| Severity | Issue | Summary | Fix? |
|---|---|---|---|
| **High** | [#18225](https://github.com/ollama/ollama/issues/18225) | 0.33.2 ~5× slower than 0.32.13 on CUDA (RTX 3090) | None yet |
| **High** | [#18208](https://github.com/ollama/ollama/issues/18208) | Long-lived `keep_alive -1` runner emits `<unused49>` garbage after a second model is loaded; only fixed by full restart | None yet |
| **High** | [#17841](https://github.com/ollama/ollama/issues/17841) (closed) | 0.32.14 silently falls back to CPU on sm_86 (RTX 30/A40/A6000) — CUDA 13 drops 8.6, CUDA 12 fallback broken | Tracker only |
| **High** | [#17870](https://github.com/ollama/ollama/issues/17870) (closed) | Vulkan on gfx1151 (Strix Halo) `ErrorDeviceLost` on long-prompt prefill; `num_batch=128` works around | Closed w/ info |
| **Med** | [#18129](https://github.com/ollama/ollama/issues/18129) | Scheduler restarts `llama-server` with default ctx immediately after load | None yet |
| **Med** | [#17910](https://github.com/ollama/ollama/issues/17910) (closed) | 0.32.11→0.32.15 regression: long completions never stop (M1 Max / macOS) | Closed w/ info |
| **Med** | [#17782](https://github.com/ollama/ollama/issues/17782) | `qwen3.8:27b` ROCm crash loading `TensileLibrary_lazy_gfx1200.dat` (RX 9060 XT) | None yet |
| **Low** | [#18286](https://github.com/ollama/ollama/issues/18286) | `/v1/responses` rejects `agent_message` | Fixed by [#18298](https://github.com/ollama/ollama/pull/18298) |
| **Low** | [#16814](https://github.com/ollama/ollama/issues/16814) (closed) | `/v1/chat/completions` ignores `num_ctx` | Fixed by [#16825](https://github.com/ollama/ollama/pull/16825) |
| **Low** | [#18274](https://github.com/ollama/ollama/issues/18274) | 80-char model-name validation rejects long HF names | None yet |

## 6. What This Means for Application Developers

- **If you ship through `/v1/chat/completions`**, you can finally rely on request-level `num_ctx` ([#16825](https://github.com/ollama/ollama/pull/16825)) — no more "set `OLLAMA_CONTEXT_LENGTH` env or fall back to `/api/chat`" workarounds.
- **Codex-based agents** that delegate sub-tasks as `agent_message` items will now round-trip cleanly via Ollama Cloud ([#18298](https://github.com/ollama/ollama/pull/18298), [#18296](https://github.com/ollama/ollama/pull/18296)).
- **Gemma 4 tool-calling agents** get a real parser ([#18299](https://github.com/ollama/ollama/pull/18299)); expect malformed `BEGIN_ARG` blocks to surface as parser errors rather than silent corruption.
- **On-prem Apple Silicon (MLX) users** with Qwen3.5/3.8 can now hit long-context YaRN windows without manually tuning (`PR #18263`, `#18285`).
- **Pin your version carefully on CUDA**: 0.32.13 currently outperforms 0.33.x for at least one RTX 3090 workload ([#18225](https://github.com/ollama/ollama/issues/18225)); test before rolling forward.
- **Prompt-cache parity with OpenRouter/Zen** is the top open feature ask for Ollama Cloud subscribers ([#16714](https://github.com/ollama/ollama/issues/16714), 37 comments, 4 👍) — relevant if you're choosing an aggregator for agentic workloads.
- **Security**: turn off `OLLAMA_DEBUG_LOG_REQUESTS` outside isolated debugging ([#18210](https://github.com/ollama/ollama/issues/18210)) — request bodies (system prompts, tool defs, RAG context) are written verbatim.
- **Watch for upcoming** [#17566](https://github.com/ollama/ollama/pull/17566) (token-budgeted `think` blocks) — directly addresses Gemma 4 reasoning loops that currently consume entire context windows.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-08

## 1. Today's Highlights

No release was cut in the last 24h, but maintainers opened [PR #40176](https://github.com/BerriAI/litellm/pull/40176) to backport spend-row identity fixes and cut **v1.100.1** from `stable/1.100.x`. Security posture improved with two closed PRs: proxy-admin RBAC on `GET /customer/info` ([#39524](https://github.com/BerriAI/litellm/pull/39524)) and at-rest encryption of MCP static headers/stdio environment secrets ([#40164](https://github.com/BerriAI/litellm/pull/40164)). The most operationally urgent item remains external: OpenCode Go's managed inference API began rejecting requests without an `x-opencode-session` header on 09/05, affecting ~635 LiteLLM customer orgs ([Issue #39503](https://github.com/BerriAI/litellm/issues/39503), 41 👍).

## 2. Releases & Breaking Changes

- **No new release** in the window. **v1.100.1 is being prepped** via [PR #40176](https://github.com/BerriAI/litellm/pull/40176): fixes double-hashed spend rows appearing as `key-hash-...` with no alias/email in Usage/BI dashboards, and health-check spend rows rendering as raw sha256. Operators on 1.100.0 should plan the patch upgrade.
- **External breaking change:** OpenCode Go rejects requests lacking `x-opencode-session` (per-conversation routing ID) since 09/05; LiteLLM has no mechanism to inject per-conversation headers ([Issue #39503](https://github.com/BerriAI/litellm/issues/39503)). No workaround documented yet.
- **Contributor workflow change ahead:** [PR #40172](https://github.com/BerriAI/litellm/pull/40172) removes the main-branch source guard, signaling an imminent default-branch switch.

## 3. New Model & Hardware Support

- **Gandr TTS provider** proposed in [PR #36624](https://github.com/BerriAI/litellm/pull/36624) — mirrors the ElevenLabs adapter shape; wav by default (also pcm), speed clamped to 0.6–1.5.
- **Fireworks AI native Responses API** config closed/merged in [PR #39826](https://github.com/BerriAI/litellm/pull/39826) — enables server-side MCP tools (`type: "mcp"`), which the chat-completions bridge rejected outright, plus `previous_response_id`.
- **Registry gaps on new models:** `openrouter/openai/gpt-5.6-sol` missing from `model_prices_and_context_window.json` ([Issue #40102](https://github.com/BerriAI/litellm/issues/40102)); `gpt-6-astra` registered as `mode: "chat"`, so tool calls over `/v1/chat/completions` are rejected and the Responses bridge never engages ([Issue #40123](https://github.com/BerriAI/litellm/issues/40123)).

## 4. Performance & Optimization

- **Rust/Python boundary gating:** [PR #40008](https://github.com/BerriAI/litellm/pull/40008) adds 45 release-wheel benchmarks through production paths — evidence the Rust core rewrite is being performance-gated going forward.
- **Auto-router cost controls:** new "Shunt" toggle bounds large file reads and delegates boilerplate codegen to cheaper models ([PR #40158](https://github.com/BerriAI/litellm/pull/40158)); declarative custom dimensions for the heuristic complexity scorer ([PR #40156](https://github.com/BerriAI/litellm/pull/40156)); classification spend now itemized separately from LLM spend in the UI ([PR #40168](https://github.com/BerriAI/litellm/pull/40168)).
- **Cost accounting:** `/cost/estimate` gains cache and reasoning token inputs ([PR #40174](https://github.com/BerriAI/litellm/pull/40174)); one-shot Claude Code subagents will skip useless cache-write injection ([PR #40175](https://github.com/BerriAI/litellm/pull/40175)).
- **DB resilience:** default `max_idle_connection_lifetime=60` merged ([PR #38600](https://github.com/BerriAI/litellm/pull/38600)) — eliminates `Error { kind: Closed }` from silently-dropped idle connections on RDS/Cloud SQL/Azure.
- **Negative signal:** v3 rate limiter double-counts `model_per_team` limits, halving effective RPM/TPM ([Issue #34140](https://github.com/BerriAI/litellm/issues/34140)).

## 5. Stability & Regressions

Ranked by severity; all are open unless noted.

1. **Budget-enforcement race** — concurrent first requests from an unknown end user bypass the default budget (`max_end_user_budget_id` path) ([Issue #40095](https://github.com/BerriAI/litellm/issues/40095), filed 09/07). No fix PR visible.
2. **Uncharged streaming traffic** — streaming `/v1/responses` success logger crashes on `'dict' object has no attribute 'usage'`; no spend rows written, requests go unbillable ([Issue #29913](https://github.com/BerriAI/litellm/issues/29913)).
3. **v1.91.0 regression, Claude Code tool-use** — `sanitize_tool_use_ids_in_anthropic_messages` breaks multi-turn tool calls on vLLM/Kimi K2.7 pass-through; open since early July ([Issue #32214](https://github.com/BerriAI/litellm/issues/32214)).
4. **Rate limits halved** — per-team per-model limits enforced at ~N/2 ([Issue #34140](https://github.com/BerriAI/litellm/issues/34140)).
5. **Regression of the #30210 class** — `HiddenParamsAsyncIteratorWrapper` hides `completed_response`, skipping container ownership on streaming `/v1/responses` ([Issue #40120](https://github.com/BerriAI/litellm/issues/40120)).
6. **Bedrock passthrough** returns HTTP 200 with empty body on non-streaming `/converse` ([Issue #40131](https://github.com/BerriAI/litellm/issues/40131)); separately, the invoke path leaks internal `optional_params` into request bodies ([Issue #30371](https://github.com/BerriAI/litellm/issues/30371)).
7. **Silent param drop** — `reasoning_effort` discarded for non-Anthropic/Nova2/GPT-OSS Bedrock models (e.g., Qwen3) ([Issue #34105](https://github.com/BerriAI/litellm/issues/34105)).
8. **`drop_params` bugs** — per-model `drop_params` leaks as a multipart field into `/v1/images/edits` ([Issue #40153](https://github.com/BerriAI/litellm/issues/40153)); string-valued `"true"` read as off in all providers — fix PR open since July ([PR #33738](https://github.com/BerriAI/litellm/pull/33738)).
9. **Cache correctness** — v1.99.0's `prompt_cache_key` fix pins the key to `user_id`, so it never changes ([Issue #39145](https://github.com/BerriAI/litellm/issues/39145)); Anthropic→OpenAI Responses bridge drops `encrypted_content`, so reasoning-model prompt caches never carry forward ([Issue #39339](https://github.com/BerriAI/litellm/issues/39339)).
10. **Misc:** Headroom CCR leaves `stream_options` after forcing `stream=false` → DeepSeek 400 ([Issue #40068](https://github.com/BerriAI/litellm/issues/40068)); all five `/v1/files` routes emit literal `"None"` for error `type`/`param` ([Issue #40135](https://github.com/BerriAI/litellm/issues/40135)); pass-through chunk parsing fails for non-standard hosts ([Issue #40117](https://github.com/BerriAI/litellm/issues/40117)).

**Closed/resolved:** post-OOM memory growth ([#38193](https://github.com/BerriAI/litellm/issues/38193)), OAuth2 MCP returning 500 instead of 401+WWW-Authenticate ([#29261](https://github.com/BerriAI/litellm/issues/29261)), Gemini tool-arg hallucination from claude-agent-sdk bare-field schemas ([#28515](https://github.com/BerriAI/litellm/issues/28515)), guardrail policy persistence ([#29416](https://github.com/BerriAI/litellm/issues/29416)), MCP template guardrail creation ([#30953](https://github.com/BerriAI/litellm/issues/30953)).

## 6. What This Means for Application Developers

- **OpenCode Go users are likely broken right now.** If you route to it through LiteLLM, requests have been erroring since 09/05 without `x-opencode-session`; there's no native per-conversation header injection yet — watch [#39503](https://github.com/BerriAI/litellm/issues/39503) and consider a header-injecting shim in front of the gateway.
- **Claude Code on vLLM/Kimi K2.7:** multi-turn tool workflows are broken on ≥v1.91.0 pass-through ([#32214](https://github.com/BerriAI/litellm/issues/32214)) — pin older or use a non-pass-through route.
- **Audit your cache hit rates.** If you bridge Anthropic-format clients to OpenAI reasoning models, or upgraded to v1.99.0+, prompt caching is likely not working as expected ([#39145](https://github.com/BerriAI/litellm/issues/39145), [#39339](https://github.com/BerriAI/litellm/issues/39339)) — you may be paying full price for repeated context.
- **Gateway operators:** verify spend logs capture streaming `/v1/responses` traffic ([#29913](https://github.com/BerriAI/litellm/issues/29913)) and sanity-check whether team per-model limits are throttling at half their configured value ([#34140](https://github.com/BerriAI/litellm/issues/34140)). Plan the v1.100.1 upgrade to restore readable spend identities.
- **Don't adopt `gpt-6-astra` or `gpt-5.6-sol` via LiteLLM yet** — registry mode/price entries are broken ([#40123](https://github.com/BerriAI/litellm/issues/40123), [#40102](https://github.com/BerriAI/litellm/issues/40102)).
- **Strict budget enforcement has a race:** concurrent first requests from new end users can exceed the default budget ([#40095](https://github.com/BerriAI/litellm/issues/40095)) — pre-provision end-user budgets where hard caps matter.
- **Security hygiene:** upgrade promptly to pick up encrypted MCP secrets and customer-info RBAC; if your DB was ever exposed, rotate MCP static headers and stdio environment credentials ([PR #40164](https://github.com/BerriAI/litellm/pull/40164), [PR #39524](https://github.com/BerriAI/litellm/pull/39524)).

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-08

## Today's Highlights

The day's activity is dominated by **Studio quality-of-life fixes** (multiple narrowly-scoped PRs from the Studio team covering MCP image passthrough, tool-call persistence, offload behaviour, and GitHub API rate-limit avoidance) alongside **two infrastructure pieces worth tracking**: the landing of `unsloth/spec_decoding` for measuring draft-model acceptance rates ([#10416](https://github.com/unslothai/unsloth/pull/10416)), and continued hardening of the Windows-on-ARM and AMD ROCm install paths. No package releases shipped in the last 24h.

## Releases & Breaking Changes

No new releases in the last 24h.

## New Model & Hardware Support

- **Qwen 3 AVL 2B / 0.6B** requested ([Issue #10459](https://github.com/unslothai/unsloth/issues/10459)) — combined LM + ViT + ASR architectures; community requesting first-class Unsloth support.
- **Windows on ARM + NVIDIA** — PR [#10282](https://github.com/unslothai/unsloth/pull/10282) enables a native ARM64 CUDA stack for GB10 / N1X / RTX Spark hosts; previously every ARM64 Windows box was treated as "no GPU."
- **AMD on mixed NVIDIA+AMD hosts** — [Issue #10450](https://github.com/unslothai/unsloth/issues/10450) reports the installer picks CUDA PyTorch and never probes the AMD card; training side has no per-GPU picker (chat has the Vulkan workaround already).
- **qwen3.6 35B A3B via MLX API** — [Issue #10389](https://github.com/unslothai/unsloth/issues/10389) reports vision inputs (base64 and URL) silently fail to reach the model on the MLX API path.

## Performance & Optimization

- **Speculative-decoding acceptance-rate measurement** — New module `unsloth/spec_decoding` ([PR #10416](https://github.com/unslothai/unsloth/pull/10416) closing [#10401](https://github.com/unslothai/unsloth/issues/10401)). Surfaces the draft/target acceptance-rate metric for `llama.cpp --model-draft` and MTP drafter sidecars so users can decide whether a draft model is worth serving before deployment.
- **Offload planner v. llama.cpp's own fitter** ([PR #9872](https://github.com/unslothai/unsloth/pull/9872)) — Adds a cost gate, sub-FFN spill ladder, context-aware device reserve, and launch ordering for `llama-server` loads. All changes gated behind `UNSLOTH_SMART_OFFLOAD`.
- **Reduce GitHub API pressure during update** ([PR #10461](https://github.com/unslothai/unsloth/pull/10461)) — Installer was re-fetching every llama.cpp release's file list individually after already receiving the full payload in one request; now uses the cached list. Closes [#10449](https://github.com/unslothai/unsloth/issues/10449).

## Stability & Regressions

Ranked by severity. Fix PRs noted where they exist.

**High**
- **[#3533](https://github.com/unslothai/unsloth/issues/3533) — Unsloth fails to import on Intel Arc B580.** `unsloth_zoo/temporary_patches/gpt_oss.py:540` calls `torch.xpu.memory.mem_get_info()`, which is unsupported on Intel Arc. Open since 2025-10-30; no fix PR. Blocks any XPU user trying to load GPT-OSS-family models.
- **[#10415](https://github.com/unslothai/unsloth/issues/10415) — Wan2.2 TI2V OOM on AMD RX 9060 XT** due to no fused attention kernel available; SDPA math fallback pushes memory over budget. No fix PR.
- **[#10389](https://github.com/unslothai/unsloth/issues/10389) — qwen3.6 35B A3B MLX API drops images.** Both base64 and URL inputs ignored; model responds without seeing attached image. No fix PR.

**Medium**
- **[#10433](https://github.com/unslothai/unsloth/issues/10433) / [#10434](https://github.com/unslothai/unsloth/issues/10434) — torchcodec version-resolution bugs in the installer.** Torch 2.3 / 2.4 fall through to the torch-2.10 torchcodec line; the ABI-stable exemption for `torchcodec>=0.12` is applied even when no 0.12+ wheel exists for cu128. Affects multiple CUDA 12.8 installs.
- **[#10341](https://github.com/unslothai/unsloth/issues/10341) — "No Ram Offload" checkbox ignored on AMD ROCm.** Model still unloaded to RAM despite the toggle being set (Studio v0.1.806-beta, llama.cpp b10798-mix-659e406, W7900+W7500).
- **[#10437](https://github.com/unslothai/unsloth/issues/10437) — GGUF quantizations vanish after switching the model download folder.** Fix in [PR #10438](https://github.com/unslothai/unsloth/pull/10438) keeps one repo row and discovers variants across cache folders.
- **[#10460](https://github.com/unslothai/unsloth/issues/10460) — Windows venv-hardening test failing on both PowerShell shells** (CI red since #10386). Fix in [PR #10462](https://github.com/unslothai/unsloth/pull/10462) decodes the pipe as UTF-8.

**Lower**
- **[#10436](https://github.com/unslothai/unsloth/issues/10436) — Studio "Tell the model today's date" overrides Ollama Modelfile SYSTEM prompt.** Fix in [PR #10463](https://github.com/unslothai/unsloth/pull/10463).
- **[#10400](https://github.com/unslothai/unsloth/issues/10400) — Keyless auth rejects empty bearer tokens** from some harnesses (CLOSED).
- **[#10411](https://github.com/unslothai/unsloth/issues/10411) — `RSAES-OAEP: input message length is too long` on long API keys** (238 chars) (CLOSED).

## What This Means for Application Developers

- **Don't pin torchcodec to a version tied to torch 2.10** if you're on torch 2.3/2.4 — Studio's installer is currently mis-mapping the spec. Wait for [#10433](https://github.com/unslothai/unsloth/issues/10433) to land, or override the line explicitly.
- **AMD ROCm users with mixed workloads** should hold off on the "No Ram Offload" toggle ([#10341](https://github.com/unslothai/unsloth/issues/10341)) and on Wan2.2 TI2V inference ([#10415](https://github.com/unslothai/unsloth/issues/10415)) until the missing attention kernels land.
- **If you're deploying draft-model speculative decoding**, the new `unsloth/spec_decoding` tool ([PR #10416](https://github.com/unslothai/unsloth/pull/10416)) gives you a deterministic acceptance-rate number per draft/target pair — much better than eyeballing tokens/sec.
- **Ollama Modelfile users** on Studio: the SYSTEM prompt was being clobbered by the date injection; [PR #10463](https://github.com/unslothai/unsloth/pull/10463) fixes it.
- **MCP toolchains**: [PR #10088](https://github.com/unslothai/unsloth/pull/10088) finally forwards MCP-returned images to the model as separate message parts instead of letting the model hallucinate their contents.
- **Studio `unsloth start`** ([PR #10453](https://github.com/unslothai/unsloth/pull/10453)) now stops killing in-flight model downloads; expect first-launch times on large models / slow links to lengthen legitimately rather than fail with a misleading "did not become ready" message.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-08

## Today's Highlights
CCR had a quiet release day but a busy triage day: all three new issues have matching PRs already opened by the community, covering a tool-name normalization bug that breaks web search for Claude Cowork, persistent settings loss on CCR restart, and a corporate OpenAI-compatible endpoint that CCR fails to detect. The TypeScript 7 forward-compatibility work also landed via a small `tsconfig` cleanup. No new release was published in the last 24h.

## Releases & Breaking Changes
No releases published in the last 24h. None of the open PRs (#1769, [#1767](https://github.com/musistudio/claude-code-router/pull/1767), [#1764](https://github.com/musistudio/claude-code-router/pull/1764)) are merged yet, so no migration notes apply.

## New Model & Hardware Support
None reported in today's activity.

## Performance & Optimization
No throughput/latency/memory work in today's diffs.

## Stability & Regressions

1. **High — Fusion `web_search` silently broken for Claude Cowork** ([#1766](https://github.com/musistudio/claude-code-router/issues/1766))
   The gateway's tool-name matcher (`coreGatewayWebSearchToolNameMatches()`) normalizes client tool names with `toLowerCase().replace(/[-.]/g, "_")`. Claude Cowork ships its search capability as a plain function tool named `WebSearch` (camelCase, no `type` field), which becomes `"websearch"` and misses all three current checks (`=== "web_search"`, `endsWith("_web_search")`, `includes("search_web")`). Net effect: Cowork web search is silently dropped by CCR's fusion layer.
   **Fix PR:** [#1767](https://github.com/musistudio/claude-code-router/pull/1767) — adds explicit CamelCase handling in the matcher.

2. **High — User settings still wiped on every CCR restart after #1736** ([#1768](https://github.com/musistudio/claude-code-router/issues/1768))
   #1736 fixed the takeover-apply path to preserve unknown fields, but the *quit-time* restore (`restoreClaudeAppGatewayConfig`) still overwrites the active configLibrary entry with a bare 12-field stub and rewrites the root config. Files like `/configLibrary/8f69f2f1….json` vanish at shutdown and reappear as stripped entries. Any settings Claude writes into the active entry (`chatTabEnabled`, `modelPrefer1mContext`, etc.) are lost.
   **Fix PR:** [#1769](https://github.com/musistudio/claude-code-router/pull/1769) — makes the quit-time restore surgical, undoing only the keys the takeover actually wrote.

3. **Medium — Custom/corporate OpenAI-compatible endpoints not auto-detected** ([#1765](https://github.com/musistudio/claude-code-router/issues/1765))
   CCR works against public providers (e.g. DeepInfra) but fails to recognize a company's internal OpenAI-format endpoint serving local models (Deepseek, Gemma). `curl` and Open WebUI work fine against the same endpoint, so this looks like a probe/protocol-detection gap rather than a wire-format issue.
   **Fix PR:** None open. Worth watching for a maintainer response on supported endpoint shapes.

4. **Low — `tsconfig` `baseUrl` deprecation noise under TS 6+** ([#1764](https://github.com/musistudio/claude-code-router/pull/1764))
   TypeScript 6 emits `"baseUrl" is deprecated… will stop functioning in TypeScript 7.0`. The repo is pinned to `typescript@5.9.3` so CI is green, but editors on newer TS surface the warning. PR drops it outright to keep configs compatible with TS 7.

## What This Means for Application Developers
- **Cowork users will need to wait for #1767** before relying on web search through CCR's fusion layer — today it silently no-ops. If you depend on Cowork search, pin to a pre-regression build or disable the fusion `web_search` rule as a workaround.
- **Settings loss on restart (#1768) is a real reliability hazard for any deployment that mutates config at runtime.** Until #1769 merges, treat every CCR restart as a destructive operation: snapshot `/configLibrary/*.json` and the root config before bouncing the process. After merge, validate that `chatTabEnabled`, `modelPrefer1mContext`, and similar runtime toggles survive a stop/start cycle.
- **Running CCR against an internal OpenAI-compatible gateway (#1765)?** Today you must bypass CCR's auto-detection — point the provider entry directly with explicit base URL and protocol hints. A clean fix here would materially expand CCR's viability inside enterprise perimeters.
- **Upstream TypeScript toolchain drift is small but real.** If your editor is on TS 6 today, expect `baseUrl` warnings on this codebase; [#1764](https://github.com/musistudio/claude-code-router/pull/1764) resolves it without semantic change.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-08

## Today's Highlights

CC Switch v3.20.2 ships as a Codex-focused compatibility patch, finally getting **xAI Grok** to route through the native Responses API alongside Codex while fixing four upstream-specific edge cases (tool schema, integer/float coercion, multi-agent email injection, unknown Codex role IDs). The PR pipeline today is dominated by gateway/router extensions: a **GitHub Copilot provider for Codex** with capability-driven Responses/Chat routing, a new **classifier queue** to split Auto Mode security-classifier traffic onto a separate provider chain, and **multi-API-key per provider** support landing across all major CLIs.

## Releases & Breaking Changes

- **[v3.20.2](https://github.com/farion1231/cc-switch/releases/tag/v3.20.2)** — Codex-side compatibility release. No breaking config changes noted; users on v3.20.1 who route Grok via OAuth should upgrade (v3.20.1's switch gate was incorrectly blocking Grok OAuth). Other fixes bundled: Codex no longer stuck at login after take-over; GPT-6 via Codex OAuth no longer reports "needs Codex update"; Claude Code path also touched.

## New Model & Hardware Support

- **GitHub Copilot hosted accounts for Codex** ([PR #7157](https://github.com/farion1231/cc-switch/pull/7157)) — Codex always enters via the local Responses endpoint; the proxy inspects `supported_endpoints` and upstream format to choose Responses vs. Chat Completions, handle auth, and adapt the response. Effectively turns Copilot into a managed provider inside CC Switch.
- **Qwen 3.8 family refresh across all 7 apps** ([PR #7183](https://github.com/farion1231/cc-switch/pull/7183)) — Domestic "Bailian" preset rebranded to **千问AI平台 (QwenAI Platform)**; Qwen models bumped to 3.8 generation across Claude Code, Claude Desktop, Codex, Hermes, OpenClaw, OpenCode, Pi.
- **Token Market provider preset** ([PR #7184](https://github.com/farion1231/cc-switch/pull/7184)) — Built-in preset for 6 apps using Anthropic Messages for Claude, OpenAI Responses for Codex, and Chat Completions for OpenCode/OpenClaw/Hermes.
- **DeepSeek Harness (DSH) app type** ([PR #6526](https://github.com/farion1231/cc-switch/pull/6526)) — New app type writing `settings.yaml` with official `baseURL`; resolves `DSH_HOME` then falls back to `~/.dsh`.

## Performance & Optimization

- **Classifier queue for Claude Code Auto Mode** ([PR #6602](https://github.com/farion1231/cc-switch/pull/6602)) — Routes security-classifier requests (issued before Bash execution) to an independent provider chain with its own `base_url` and credentials, complementary to the in-provider model swap from #4987. Enables cross-provider fan-out where the conversation runs on provider A and the classifier on provider B. No quantitative numbers yet — three independent request signatures identified for matching.
- **CLI prompt cache hit potential** ([Issue #3990](https://github.com/farion1231/cc-switch/issues/3990), closed) — Closed as stale; the discussion concerned intercepting Claude Code's auto-injected task reminders in the system prompt to improve cache reuse on reroutes.
- **Dependabot: cargo-deps group bump** ([PR #7195](https://github.com/farion1231/cc-switch/pull/7195)) — 52 Rust dependency updates in `src-tauri` (serde, serde_json, log, etc.). No perf claims; routine hygiene.

## Stability & Regressions

**High severity:**
- **Codex + DeepSeek heartbeat injection corrupts sessions permanently** ([Issue #6995](https://github.com/farion1231/cc-switch/issues/6995)) — Heartbeat automation injects a `function_call_output` missing `call_id` against `/v1/responses`, after which the upstream 400s every subsequent request and the thread is unrecoverable (new threads are fine). No fix PR yet.
- **Old Codex sessions leak to api.openai.com after provider switch** ([Issue #5672](https://github.com/farion1231/cc-switch/issues/5672)) — With `preserveCodexOfficialAuthOnSwitch = true`, only the **old** account-era sessions hit `api.openai.com` and 401; new sessions work correctly. Open.
- **Codex model stuck after quota exhaustion + relay switch** ([Issue #7056](https://github.com/farion1231/cc-switch/issues/7056)) — After Codex 2026.9.2 update hit the quota limit, switching relay API can't change model anymore. Open.

**Medium severity:**
- **Claude Code `settings.json` overwrites `enabledPlugins` / `statusLine`** ([Issue #3631](https://github.com/farion1231/cc-switch/issues/3631)) — Each provider switch does a full rewrite, clearing plugin state and resetting `statusLine.command`. Closed (likely fixed in recent releases).
- **Codex `/responses` streaming disconnects before `response.completed`** ([Issue #2750](https://github.com/farion1231/cc-switch/issues/2750)) — Windows + Codex desktop via local proxy to OpenAI-compatible relay; direct connection works. Closed.
- **`requires_openai_auth = true` bypasses CC Switch routing** ([Issue #4393](https://github.com/farion1231/cc-switch/issues/4393)) — Routing-mode writes forced Codex to bypass the proxy to OpenAI auth. Closed.
- **Codex local proxy missing `/v1/images/generations` → 404** ([Issue #5429](https://github.com/farion1231/cc-switch/issues/5429)) — Closed.
- **Proxy 502 on self-signed HTTPS for custom provider** ([Issue #5042](https://github.com/farion1231/cc-switch/issues/5042)) — Open, stale.
- **Proxy hangs ~150s on dead IPv6 for Aliyun Bailian (no happy-eyeballs)** ([Issue #5096](https://github.com/farion1231/cc-switch/issues/5096)) — Open, stale.

**Lower severity / closed:**
- GPT-6-ASTRA 400 on Claude Code ([#7131](https://github.com/farion1231/cc-switch/issues/7131)), Kimi 400 ([#6968](https://github.com/farion1231/cc-switch/issues/6968)), Kimi-for-coding `/responses` 400 ([#6861](https://github.com/farion1231/cc-switch/issues/6861)), DeepSeek v4-vision upload failure on Codex ([#6998](https://github.com/farion1231/cc-switch/issues/6998)).

**Fix PRs landed today:**
- Codex dangling managed-account recovery ([PR #7060](https://github.com/farion1231/cc-switch/pull/7060))
- Skills installer tolerates `skillId` ≠ directory name ([PR #6381](https://github.com/farion1231/cc-switch/pull/6381))
- External edits to `CLAUDE.md` / `AGENTS.md` now refresh Prompts panel ([PR #7194](https://github.com/farion1231/cc-switch/pull/7194))
- tsconfig drops `baseUrl` ahead of TypeScript 7 ([PR #7193](https://github.com/farion1231/cc-switch/pull/7193))
- Cost-pricing dropdown width fix for EN/JA ([PR #6980](https://github.com/farion1231/cc-switch/pull/6980))
- i18n key completion for Pi form ([PR #6768](https://github.com/farion1231/cc-switch/pull/6768), follow-up [#7187](https://github.com/farion1231/cc-switch/pull/7187))

## What This Means for Application Developers

- **Mixed-vendor routing is becoming first-class.** The classifier-queue PR (#6602) is the most architecturally significant change for agent builders: you can now route Auto Mode's safety classifier to a different provider (and credentials) than the main conversation. If you're building agents on Claude Code and want a cheap/fast classifier on a local or alternative model, this is the lever — but it's opt-in and disabled by default.
- **Per-provider multi-API-key is landing** ([PR #7188](https://github.com/farion1231/cc-switch/pull/7188), closes [#7185](https://github.com/farion1231/cc-switch/issues/7185)) — Backwards compatible with legacy single-string storage. Covers Claude, Codex, Gemini, OpenCode, OpenClaw, Hermes. Enables failover and rotation inside a single provider definition; useful for teams managing capacity across multiple billing accounts.
- **The Codex Responses-API proxy is the de facto integration boundary.** Three things to watch: (1) DeepSeek-style providers that inject their own heartbeat/automation will need their `call_id` handling validated before shipping — see [#6995](https://github.com/farion1231/cc-switch/issues/6995); (2) `preserveCodexOfficialAuthOnSwitch = true` does **not** retroactively redirect already-open Codex sessions ([#5672](https://github.com/farion1231/cc-switch/issues/5672)) — instruct users to start fresh sessions after switching; (3) quota exhaustion on Codex + relay failover is currently broken ([#7056](https://github.com/farion1231/cc-switch/issues/7056)).
- **Copilot users finally get a managed account path** through Codex ([PR #7157](https://github.com/farion1231/cc-switch/pull/7157)) — capability-driven endpoint selection means adding new Copilot models shouldn't require CC Switch updates as long as they expose `supported_endpoints`.
- **Operational warning:** if you deploy CC Switch behind Aliyun NLB endpoints with IPv6, you currently lack happy-eyeballs and will see 150s tail latency ([#5096](https://github.com/farion1231/cc-switch/issues/5096)) — pin to IPv4 or front the proxy until that's fixed.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-08

## 1. Today's Highlights

The v1.0.0-rc.35 release ships **Wan 3.0 video model support** and a major refactor of **task plugin routing** — disabling a plugin no longer silently falls back to a built-in plugin of the same name, and built-in plugins now echo the request's model name (respecting model redirection) instead of the upstream ID. This is a behavioral change that anyone running customized task pipelines must review. On the stability side, two billing-correctness bugs surfaced today (#7241, #7231) where streams terminating abnormally either charge nothing or charge after the client has disconnected.

## 2. Releases & Breaking Changes

**v1.0.0-rc.35** ([release notes](#)): Wan 3.0 Video, Plugin Routing.

- **Task Plugin Controls simplified to two layers:** master switch + per-plugin toggle. Closing a named plugin no longer routes that model through a same-named built-in plugin.
- **Model echo semantics:** Built-in plugins now return the requested model name (post model redirection) rather than the upstream's real model ID. Logging, billing display, and any downstream fingerprinting that relied on upstream IDs need to be re-verified.
- **Migration:** Operators who depended on auto-fallback to built-in plugins should explicitly enable the relevant built-in plugin before upgrading, or pin models via the model-redirect map.

## 3. New Model & Hardware Support

- **Alibaba Wan 3.0 all-in-one video** — merged via [#7240](https://github.com/QuantumNous/new-api/pull/7240) (review pass [#7244](https://github.com/QuantumNous/new-api/pull/7244) by Calcium-Ion). Builds on the earlier wan2.7 series ([#4078](https://github.com/QuantumNous/new-api/pull/4078)).
- **Huawei MaaS channel** — in review ([#7239](https://github.com/QuantumNous/new-api/pull/7239), discussion [#7236](https://github.com/QuantumNous/new-api/issues/7236)). Would add Huawei Cloud as a first-class upstream type alongside existing providers.
- **Normalized Gemini thinking levels** — [#7245](https://github.com/QuantumNous/new-api/pull/7245) makes the relay accept canonicalized thinking level strings, closing [#7205](https://github.com/QuantumNous/new-api/issues/7205).
- **xAI Grok Imagine Video (async)** — discussion open in [#7251](https://github.com/QuantumNous/new-api/issues/7251); existing advertise-but-fail path covered by [#6358](https://github.com/QuantumNous/new-api/issues/6358).
- **Rerank misclassification fix** — [#7181](https://github.com/QuantumNous/new-api/pull/7181) ensures rerank models are no longer detected as embedding in channel tests (closes [#7177](https://github.com/QuantumNous/new-api/issues/7177)).

## 4. Performance & Optimization

- **Per-channel TTFB timeout with auto-fallback** — [#7228](https://github.com/QuantumNous/new-api/pull/7228) introduces a first-token timeout independent of the overall streaming timeout. When an upstream sends headers but stalls before the first data chunk, the relay now fails over to the next channel instead of waiting for the full stream timeout. Concrete numbers: tunable per-channel; expected to cut tail latency on flaky providers.
- **Pass-through `model_mapping` enforcement** — [#7249](https://github.com/QuantumNous/new-api/pull/7249) ensures channel-level model mappings are applied to the body even when pass-through mode is on, preventing 404s on upstream-foreign model names (closes the long-standing #6002 / #6639 pattern).
- **OpenAI image-edit multipart filename escaping** — [#7246](https://github.com/QuantumNous/new-api/pull/7246) hardens the relay against filenames containing characters that broke multipart parsing.
- **Responses streaming reasoning event fix** — [#7114](https://github.com/QuantumNous/new-api/pull/7114) corrects `chat→responses` conversion to emit `response.reasoning_text.delta` rather than `response.reasoning_summary_text.delta`, eliminating a redundant event class for downstream consumers.

## 5. Stability & Regressions

Ranked roughly by severity (billing > silent data loss > functional break):

| Sev | ID | Title | Status | Fix |
|---|---|---|---|---|
| 🔴 High | [#7241](https://github.com/QuantumNous/new-api/issues/7241) | Streaming `/v1/responses` discards usage on `response.incomplete` → billed as 0 | OPEN | [#7242](https://github.com/QuantumNous/new-api/pull/7242) open |
| 🔴 High | [#7231](https://github.com/QuantumNous/new-api/issues/7231) | Non-streaming request continues upstream after client timeout; charges after disconnect | CLOSED | landed in rc.35 |
| 🟠 Med | [#7194](https://github.com/QuantumNous/new-api/issues/7194) | Video task succeeds but artifact fetch returns 404 on `/v1/videos/<id>` | OPEN | no PR yet |
|  Med | [#7252](https://github.com/QuantumNous/new-api/issues/7252) | Ollama streaming drops `tool_calls` when emitted only in final `done:true` frame (e.g. qwen3-coder) | OPEN | no PR yet |
|  Med | [#7243](https://github.com/QuantumNous/new-api/issues/7243) / [#7253](https://github.com/QuantumNous/new-api/issues/7253) | Claude Messages → Gemini 3.8 Flash returns HTTP 200 with unusable body (rc.31–rc.34) | CLOSED | duplicate, awaiting actual fix |
|  Low | [#7247](https://github.com/QuantumNous/new-api/issues/7247) | Higress gateway chunked request body → 400 invalid JSON | CLOSED | needs repro per maintainer |
|  Low | [#7235](https://github.com/QuantumNous/new-api/issues/7235) | Kimi-K3 dynamic tool-call parsing | CLOSED | landed |
| 🟡 Low | [#6358](https://github.com/QuantumNous/new-api/issues/6358) | xAI `grok-imagine-video` advertised but route fails (`invalid_api_platform: 48`) | OPEN | no PR yet |

**Operators on rc.30–rc.34** should review response-streaming billing logs closely until [#7242](https://github.com/QuantumNous/new-api/pull/7242) merges; under-billed requests are not auto-corrected.

## 6. What This Means for Application Developers

- **Upgrade path to rc.35 is not drop-in** if you rely on task-plugin fallback. Audit your `task` plugin list — anything previously implicit via name collision must now be explicitly toggled on. Re-test video-generation flows end-to-end; the model-name echo change can break downstream log parsing or per-model cost dashboards.
- **Streaming billing is not trustworthy on rc.30–rc.34** for `/v1/responses`. If you operate a billed gateway in production, either pin to a known-clean rc or instrument your own usage reconciliation against upstream tokens until [#7242](https://github.com/QuantumNous/new-api/pull/7242) lands.
- **New timeout knob (when [#7228](https://github.com/QuantumNous/new-api/pull/7228) merges) is per-channel and streaming-only.** Useful for multi-provider setups where one provider's slow-headers behavior was masking its outages behind long stream timeouts.
- **Tool-calling with Ollama + qwen3-coder** is currently broken for `stream:true` ([#7252](https://github.com/QuantumNous/new-api/issues/7252)). Workaround: use `stream:false`, or route Ollama tool-calling workloads through a non-streaming code path until fixed.
- **Pass-through + model_mapping** now play nicely together ([#7249](https://github.com/QuantumNous/new-api/pull/7249)). If you previously couldn't use model aliasing on pass-through channels because of 404s, this is the change you were waiting for.
- **Huawei MaaS and async Grok video** are both in flight. If either is on your roadmap, watch [#7239](https://github.com/QuantumNous/new-api/pull/7239) and [#7251](https://github.com/QuantumNous/new-api/issues/7251) for review and design feedback opportunities.

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*