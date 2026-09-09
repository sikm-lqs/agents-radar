# AI Infrastructure Digest 2026-09-10

> Generated: 2026-09-09 23:30 UTC | Projects covered: 9

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

# Cross-Project Infrastructure Report — 2026-09-10

## 1. Ecosystem Overview

The serving-engine layer is in a land-grab phase around the new wave of hybrid sparse/linear-attention frontier models (Qwen3.8-Flash-Next, GLM-5.3-Flash, DeepSeek-V4, Kimi-K3), and the pattern is consistent: support lands fast, correctness debt follows (non-deterministic decoding, prefix-cache illegal accesses, 245K-context hangs). Local runtimes (llama.cpp, Ollama, Unsloth) are expanding hardware breadth — Vulkan, SYCL/Intel Arc, ARM I8MM, AMD Strix Halo — rather than chasing raw datacenter throughput. The gateway and router layer (LiteLLM, New API, CCR, CC Switch) is fighting a different war: money-path correctness (double billing, half-enforced rate limits) and rapid upstream contract churn driven by AI coding-agent clients. Notably, AI-assisted patch authorship is now visible in the contribution stream itself (New API's same-day critical billing fixes), raising review-integrity questions. Overall posture across all nine projects: productionization and hardening, not greenfield feature racing.

## 2. Activity Comparison

*Counts are items surfaced in the 24h digest window (newly filed, closed, or actively referenced) — a proxy for churn, not total repo activity.*

| Project | Issues referenced | PRs referenced | Release status |
|---|---|---|---|
| **vLLM** | ~16 (13 open / 3 closed) | 19 | ✅ **v0.29.0** shipped (MRV2 default) |
| **SGLang** | ~22 (incl. 5 closed) | 16 | None; CI: 1 broken / 6 flaky runs |
| **llama.cpp** | ~15 | ~22 | ✅ **11 builds** (b10871→b10883) |
| **Ollama** | ~17 | 16 | None |
| **LiteLLM** | ~17 (10 open / 7 closed) | 16 | ✅ v1.102.0-dev.1 (cosign-signed) |
| **Unsloth** | ~18 (10 open / 8 closed) | 11 | ✅ v0.1.808-beta |
| **Claude Code Router** | 3 | 4 | None (at 3.0.22) |
| **CC Switch** | ~19 | 17 | None |
| **New API** | ~10 | 12 | None (v1.0.0-rc.36) |

Six of nine projects shipped or cut a release in the window; llama.cpp's 11-build cadence remains the ecosystem's fastest integration loop. vLLM and SGLang carry the heaviest open-issue load, concentrated in the new model families.

## 3. Model Support Race

| Model / Arch | vLLM | SGLang | llama.cpp | Others |
|---|---|---|---|---|
| **Qwen3.8-Flash-Next (QSA)** | Deep work (fp8 KV patch, #54426) but 3 open correctness bugs | — | TOP_K radix-select + FA tuning (#28670, #28102) | — |
| **GLM-5.3-Flash / GLM-5-Next** | Loading broke on 0.29.0, fixed (#56007) | Breakable prefill CUDA graphs **default-on** (#38522) | ✅ **Merged** — 321B hybrid + vision (#27754) | CC Switch presets; New API AI-patch authors used it |
| **DeepSeek-V4** | — (R1-family sparse-MLA: PCP+DCP, #56157) | dsv4+DSPARK backend; **245K-context hang** (#33549) | Supported; DSpark VRAM leak (#27155) | — |
| **Kimi-K3** | ROCm TP>1 fixes (#56167, #56098) | Multiple tool-call/PD/DCP defects open | — | — |
| **MiniMax-M3** | ROCm AITER fusion (#54535) | — | — | CC Switch default preset; New API H3 V2 video |
| **GigaChat 3.5 432B** | — | — | ✅ Merged (#25342) | — |
| **Nemotron-3.5 / SeedOSS / Ling-3.0 / SenseNova-U1** | ✅ / ✅ / — / — | — / — / ✅ / tracking | — / — / — / — | — |
| **Hosted frontier (gpt-6-astra, grok-4.x, Veo 3.1)** | — | — | — | LiteLLM registry; New API relay + dynamic billing |

**Verdict:** **llama.cpp is first-to-merge** on exotic hybrid architectures (GLM-5-Next, GigaChat 3.5) with fewer caveats besides a TF32 override. **vLLM has the widest engine coverage** but is shipping new-model support with visible correctness debt on the Qwen3.8 path. **SGLang is deepest on integration features** (agent caching, disagg) but its frontier models are "supported-with-caveat." Hardware long-tail leadership is genuinely contested: vLLM on GB10/sm_121, SGLang on gfx950, llama.cpp on RDNA4/Adreno/Intel Arc, Ollama adding Intel SYCL.

## 4. Performance Frontier

Optimization effort clusters in six areas:

- **KV cache & prefix management (hottest area):** vLLM fp8 KV-cache ≈**2× pool** on GB10 (#54426) and HiSparse host-resident sparse-MLA design (#56109); SGLang's T-LRU for TTFT-SLO agent workloads (#34012) and decode-side HiCache on hybrid/Mamba (#38634); llama.cpp MTP over-allocation fix (#28630); Unsloth unified KV pools for parallel chats (#10301/#10120).
- **Cold start / restart economics:** SGLang's Weight Cache Daemon is the day's standout number — Qwen3-235B FP8 weight load **306–327s → <1s** (#33522). Directly attacks the autoscaling critical path.
- **Speculative decoding (table stakes, still fragile):** vLLM **+9% decode / −58% cache-hit TTFT** BS=1 (#54485); SGLang Inkling MTP staging and the closed 32K-context accept-rate fix; llama.cpp DSpark/MoE crash fixes. Countervailing lesson: SGLang's `tiny_gemm` regression (**−4% Blackwell decode**, #38628) proves kernel microbench wins ≠ serving wins.
- **Quantization:** NVFP4/MXFP4/FP8 across engines (SGLang online bf16→MXFP4 for MTP drafts #38748); GGUF kernel work on consumer hardware (ARM I8MM q4_K **+34.3%**, Vulkan iq4_xs **+6–17% TG**).
- **CUDA graph coverage:** vLLM MRV2 graph memory profiling; SGLang breakable prefill graphs going default — but with a severe weak-ref correctness bug (#37606) and llama.cpp sm_120 hangs showing the risk side.
- **Host/runtime efficiency (non-GPU):** LiteLLM moving Bedrock signing off the event loop (#40270) — one blocking call froze an entire worker; Ollama's FD leak (#18344) is a perf-adjacent reliability limit.

## 5. Layer Positioning

- **Datacenter serving engines — vLLM, SGLang:** competing on frontier MoE/hybrid attention, spec decode, and PD disaggregation. Differentiators today: vLLM's hardware breadth vs. SGLang's operational features (weight cache, agent-aware caching, router HTTP/2, graceful drain).
- **Local runtime — llama.cpp (kernel substrate), Ollama (distribution + compat API):** Ollama builds *on* llama.cpp (SYCL backend is a llama.cpp engine PR); its own value-add is compatibility surface (OpenAI/Anthropic/Codex) and fleet UX — which is also where its bugs live (FD leak, zero-vector embeddings, VRAM accounting).
- **Gateway/proxy — LiteLLM (enterprise: rate limiting, spend, OTEL), New API (billing relay):** the "money layer." Today's defects are almost entirely billing/accounting correctness, not latency.
- **Client-side routing — CCR, CC Switch:** thin proxies purpose-built for Claude Code/Codex. Their roadmap is dictated by upstream client drift (e.g., `x-opencode-session` became mandatory 2026-09-05/06 and broke/inconvenienced both within days).
- **Fine-tuning — Unsloth:** unique in touching training (1.2–1.7× diffusion) *and* inference delivery (Studio on llama-server); its open bugs reveal cross-layer coupling — #10573 is really a vLLM capability gap (`min_p`+`logit_bias`).

## 6. Trend Signals

1. **Hybrid sparse attention is where bugs cluster.** Indexer/top-k/prefix-cache interplay produced non-determinism (vLLM #54521), GB10 illegal accesses (#54173), and long-context hangs (SGLang #33549) across three independent codebases. Treat these architectures as fast-moving, not yet boring.
2. **Agent workloads are reshaping cache design** — session attribution on KV events, T-LRU, prefix-pinning headers (`X-Data-Parallel-Rank`), per-request cache opt-outs. If you run agents, engine choice now has cache-policy consequences.
3. **Client contract churn is a proxy-layer tax.** Claude Code and Codex point-releases broke CCR/CC Switch routing multiple times this month. Budget for absorbing upstream drift.
4. **Money-path integrity is the gateway story:** LiteLLM rate limits under-enforcing by 2× (#34140) and limits silently vanishing after cache warmup (#39713); New API's same-day double-billing fixes. **Operators: over-provision limits and recompute cache-token analytics after upgrades.**
5. **Supply-chain assurance is rising to release-gate status:** LiteLLM cosign-signs images; Unsloth's red security lane (#10545) blocks a clean release; New API flags AI-authored billing patches for extra scrutiny.
6. **Silent-failure modes are the scariest:** Ollama's HTTP-200 all-zero embeddings (#17878) and SGLang's ROCm EAGLE greedy degeneration — both return plausible-looking success. Instrument for *absence of errors*, not just errors.

**Near-term watchlist:** vLLM 0.27.1 pin guidance (host-memory regression), SGLang GLM-5.3 default graph flip (#38522), llama.cpp b10878 ABI break for out-of-tree integrations, LiteLLM v1.102.0 GA (Bedrock signing fix), and Unsloth's Apple Silicon #4 closure — the biggest ecosystem-signal item of the day if it lands as real MLX support.

---

## Per-Project Reports

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-10

## Today's Highlights

- **v0.29.0 ships** with Model Runner V2 now the default for *all* models (594 commits, 277 contributors), but the rollout has surfaced at least one critical regression on the 0.28 → 0.29 line: host-memory exhaustion at startup on multiple configurations.
- The **Qwen3.8-Flash-Next** path is the dominant theme this cycle: a high-traffic non-determinism bug in `persistent_topk` prefill (#54521), a GB10 illegal-memory-access in the GDN + prefix-cache path (#54173), an MRV2 `thinking_token_budget` regression (#54906), and an fp8 KV-cache patch that roughly doubles KV pool on a single GB10 (#54426).
- Speculative-decoding and MoE collective efficiency keep producing concrete wins: **+9% decode / −58% cache-hit TTFT** for BS=1 DFlash/DSpark (#54485), Mooncake P2P failures are now surfaced back to the scheduler (#56166), and an MRV2 fast-prefill lane is in flight (#56145).

---

## Releases & Breaking Changes

**v0.29.0** ([release](https://github.com/vllm-project/vllm/releases/tag/v0.29.0))

- **Model Runner V2 is now the default for all models** ([#53183](https://github.com/vllm-project/vllm/issues/53183)). Pooling models switched in 0.27.x; this completes the rollout. Existing `VLLM_USE_V2` opt-ins become no-ops; verify your configs still load.
- MRV2 gained **CUDA graph memory profiling** for KV-cache auto-sizing (truncated notes — see release body for the rest of the highlight list).
- Migration notes (today's traffic):
  - Users on **0.27.1 → 0.28/0.29** are reporting host-memory exhaustion at startup ([#54237](https://github.com/vllm-project/vllm/issues/54237)). Pin to 0.27.1 if you can't tolerate the regression; root-cause appears to be MRV2-related.
  - **GLM5.3-Flash** checkpoint loading is broken on 0.29.0 with TP×EP worker spawn ([#56007](https://github.com/vllm-project/vllm/issues/56007), closed — fix path looks resolved).
  - On **Model Runner V2**, `thinking_token_budget` is ignored for **Qwen3.8 NVFP4 + MTP** ([#54906](https://github.com/vllm-project/vllm/issues/54906)).
  - **Cohere Chat/Embed and Generative Scoring** accepted arbitrarily large `priority` ints that overflow MessagePack instead of returning a client error ([#56146](https://github.com/vllm-project/vllm/pull/56146), closed/merged).

---

## New Model & Hardware Support

- **Qwen3.8-Flash-Next (QSA)**: aggressive work landing across prefill/decode; fp8 KV-cache on the QSA path is now a working patch on a GB10 ([#54426](https://github.com/vllm-project/vllm/issues/54426)). GDN path with prefix caching still OOMs/illegal-accesses on sm_121 ([#54173](https://github.com/vllm-project/vllm/issues/54173)).
- **Sparse-MLA models (DeepSeek family)**: **PCP + DCP** enabled together so KV-cache sharding and prefill query split coexist ([#56157](https://github.com/vllm-project/vllm/pull/56157)).
- **Kimi-K3 on ROCm (TP>1)**: shared-expert multi-stream overlap gated correctly ([#56167](https://github.com/vllm-project/vllm/pull/56167)) and wvSplitKrc regressions fixed ([#56098](https://github.com/vllm-project/vllm/pull/56098)).
- **MiniMax-M3 on ROCm**: packed LBHNC AITER QK-norm fusion rebased onto the current main ([#54535](https://github.com/vllm-project/vllm/pull/54535)); sparse GQA prefill attention optimized ([#52963](https://github.com/vllm-project/vllm/pull/52963)).
- **GLM5.3-Flash** (regression noted above, fix in flight).
- **gpt-oss on ROCm**: TRITON_ATTN + spec-decode silently produced no output (closed issue, [#32434](https://github.com/vllm-project/vllm/issues/32434)).
- **SeedOSS** turn-boundary tokens wired into `SeedOssParser` ([#54264](https://github.com/vllm-project/vllm/pull/54264), closed).
- **Quantization formats**: AITER **b-preshuffle blockscale GEMM** for DeepSeek-R1 linears ([#55253](https://github.com/vllm-project/vllm/pull/55253)); RDNA3 **W4A16 GPTQ split-K** accuracy/determinism fixed ([#54706](https://github.com/vllm-project/vllm/pull/54706)); Triton-attn int8 KV **128B-aligned** scale caches ([#56164](https://github.com/vllm-project/vllm/pull/56164)).
- **Backends**: ROCm (`gfx950`, `gfx11`/RDNA3) and **sm_121 / GB10 (DGX Spark)** both received first-class attention; **Intel XPU** still has open host-memory reclamation bugs ([#50269](https://github.com/vllm-project/vllm/issues/50269)).

---

## Performance & Optimization

- **Spec decode, BS=1 (Nemotron-3.5-Lightning-NVFP4 + DSpark)**: **+9% decode, −58% cache-hit TTFT** at 32K cached / 2K in / 256 out ([#54485](https://github.com/vllm-project/vllm/pull/54485)).
- **Sparse GQA prefill (gfx950)**: kernel is bandwidth-bound — a no-math version still takes 103% of the full kernel time; neighbouring queries share ~22 of ~256 blocks over 4 tokens, opening clear headroom for block-reuse optimization ([#52963](https://github.com/vllm-project/vllm/pull/52963)).
- **FlexAttention block-mask memory** made independent of KV-cache size — fixes 8.45 GiB OOM on `google/gemma-3-1b-it` at default `gpu_memory_utilization` on H100 ([#55977](https://github.com/vllm-project/vllm/pull/55977)).
- **Custom all-reduce buffers** now sized at init so batch-invariant mode can use them consistently ([#50505](https://github.com/vllm-project/vllm/pull/50505)).
- **Qwen3.8-Flash-Next fp8 KV-cache on QSA**: ≈2× KV pool on a single GB10 vs bf16 ([#54426](https://github.com/vllm-project/vllm/issues/54426)).
- **HiSparse (host-resident sparse-MLA decode)**: design landed as draft on top of the WIP branch ([#56109](https://github.com/vllm-project/vllm/pull/56109)) — host pool becomes an ordinary block pool with evictable resident pages.
- **ROCm AITER** GEMM-config plumbing refactored to call `get_gemm_config` directly, removing hand-maintained shape tables ([#55001](https://github.com/vllm-project/vllm/pull/55001)).
- **Triton compile keys** derived for 33 migrated sampling/spec-decode/DFlash/MTP/WNA16 kernels, removing the rejection-sampler dummy-execution warmup ([#56154](https://github.com/vllm-project/vllm/pull/56154)).
- RFCs worth tracking: **CUTLASS SM100 Lamport fused GEMM+AllReduce** ([#55261](https://github.com/vllm-project/vllm/issues/55261)); **Triton `tl.make_tensor_descriptor` adoption** ([#42545](https://github.com/vllm-project/vllm/issues/42545)); **TP-MoE collective optimization via torch.compile pass** ([#29139](https://github.com/vllm-project/vllm/issues/29139)).

---

## Stability & Regressions

| Severity | Item | Status |
|---|---|---|
| 🔴 Critical correctness | [#54521](https://github.com/vllm-project/vllm/issues/54521) — Non-deterministic greedy decoding on Qwen3.8-Flash-Next when prompts exceed `indexer_budget`; `persistent_topk` prefill is the suspect. | Open |
| 🔴 Severe regression | [#54237](https://github.com/vllm-project/vllm/issues/54237) — 0.28.0 / 0.29.0 consume all host memory and freeze at start; 0.27.1 fine. | Open |
| 🔴 Severe correctness | [#54173](https://github.com/vllm-project/vllm/issues/54173) — `CUBLAS_STATUS_INTERNAL_ERROR` / illegal memory access in GDN path with prefix caching on GB10 (sm_121); `--no-async-scheduling` does not help. | Open |
| 🟠 High | [#53142](https://github.com/vllm-project/vllm/issues/53142) — Hybrid mamba align precopy illegal memory access on prefix-cache resume when `--block-size` is explicit. | Open |
| 🟠 High | [#54906](https://github.com/vllm-project/vllm/issues/54906) — `thinking_token_budget` silently ignored by MRV2 with Qwen3.8 NVFP4 + MTP. | Open |
| 🟠 High | [#51782](https://github.com/vllm-project/vllm/issues/51782) — `persistent_topk` silently drops top-k candidates when many values share a coarse histogram bin (B300, CUDA 13). | Open |
| 🟡 Medium | [#48494](https://github.com/vllm-project/vllm/issues/48494) — `num_speculative_tokens_per_batch_size` + MTP speculator fails full CUDA graph decode capture. | Open |
| 🟡 Medium | [#48966](https://github.com/vllm-project/vllm/issues/48966) — Unexpected `EngineCore` death exits serving process with status 0, defeating `Restart=on-failure`. | Open |
| 🟡 Medium | [#50269](https://github.com/vllm-project/vllm/issues/50269) — Host memory not released after model load on Intel XPU. | Open |
| 🟡 Medium | [#56007](https://github.com/vllm-project/vllm/issues/56007) — GLM5.3-Flash v0.29.0 checkpoint loading fails on TP×EP worker spawn. | **Closed** (fix in) |
| 🟢 Low | [#56146](https://github.com/vllm-project/vllm/pull/56146) — Cohere priority overflows MessagePack instead of raising a client error. | **Closed/merged** |
| 🟢 Low | [#56164](https://github.com/vllm-project/vllm/pull/56164) — `triton_attn` head_size=256 int8 KV packs to 260B, breaking 128B alignment. | Open (fix PR) |
| 🟢 Low | [#56165](https://github.com/vllm-project/vllm/pull/56165) — Clustered BF16 router GEMM `LLBf16SplitK` sync/output-store ownership bugs. | Open (fix PR) |
| 🟢 Low | [#56166](https://github.com/vllm-project/vllm/pull/56166) — Mooncake P2P pull failures only logged; requests stuck in `WAITING_FOR_REMOTE_KVS` until client timeout. | Open (fix PR, fixes #55870) |

Also worth flagging: the **KV-cache key partitioning conformance suite** RFC ([

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-10

## 1. Today's Highlights

- The **Fast Engine Recovery (Weight Cache Daemon)** roadmap continues to bear fruit — Phase 1 already drops weight-load time from ~306–327s to **<1s** on Qwen3-235B FP8 via per-rank CUDA-IPC, and the issue remains one of the most-discussed in the repo ([#33522](https://github.com/sgl-project/sglang/issues/33522)).
- A meaningful production regression surfaced today: PR #34693 (the `tiny_gemm` unification replacing `dsv3_router_gemm`) costs **~4% DeepSeek-R1 NVFP4 decode on Blackwell** even though the standalone kernel is faster — a textbook example of why "kernel wins in microbench" ≠ "wins in serving path" ([#38628](https://github.com/sgl-project/sglang/issues/38628)).
- Frontier-model serving is hitting new pain points: **DeepSeek-V4 dsv4+DSPARK TP=8 hangs at ~245K context** on H20 and **Kimi-K3** is accumulating tool-call / PD-disaggregation / DCP defects, pointing to real limits in current speculative + disaggregated stacks at long context.

## 2. Releases & Breaking Changes

No new tagged releases in the last 24h. The CI tracker ([#17050](https://github.com/sgl-project/sglang/issues/17050)) auto-reports **1 broken, 6 flaky, 986 recently fixed** scheduled runs as of 2026-09-09 23:02 UTC — CI is healthy.

Notable config/API surface changes in flight:

- **Default flip**: GLM-5.3 Flash (`Glm5NextForConditionalGeneration`) will turn on **breakable prefill CUDA graphs by default** (Triton KDA + TRTLLM DSA + FP8 E4M3 KV) ([PR #38522](https://github.com/sgl-project/sglang/pull/38522)).
- **New HTTP header honored on `/v1/responses` and `/generate`**: `X-Data-Parallel-Rank` for prefix-pinning on `--enable-dp-attention` deployments behind a gateway ([PR #38729](https://github.com/sgl-project/sglang/pull/38729)).
- **Router h2c**: Router will both serve and forward cleartext HTTP/2 when engines report `--enable-http2` ([PR #38743](https://github.com/sgl-project/sglang/pull/38743)).
- **Per-request opt-out** for prefix-cache insertion (`skip_cache_insert`) proposed ([#38069](https://github.com/sgl-project/sglang/issues/38069)).
- **Anthropic `/v1/responses` `output_config.effort`**: `xhigh` is unreachable and unvalidated values return 500 — clients should avoid sending the field until [#36741](https://github.com/sgl-project/sglang/issues/36741) is fixed.

## 3. New Model & Hardware Support

- **GLM-5.3 Flash** (`Glm5NextForConditionalGeneration`) — breakable prefill CUDA graphs enabled by default ([PR #38522](https://github.com/sgl-project/sglang/pull/38522)).
- **GLM-5.2 on ROCm/gfx950** — four-kernel fused DSA indexer decode path, dropping the indexer kernel chain from 12→4 per Indexer (78 layers + MTP draft) ([PR #38583](https://github.com/sgl-project/sglang/pull/38583)).
- **DeepSeek-V4 (`dsv4` backend + DSPARK)** — multi-node TP8/H20 has a long-context decode hang open ([#33549](https://github.com/sgl-project/sglang/issues/33549)); treat as supported-with-caveat.
- **Kimi-K3** — multiple active issues around strict tool-call grammar, `tool_choice=required` PD/DCP hangs, and DCP planner crashes (see Stability section).
- **Qwen3.5 MTP draft experts (AMD)** — online bf16 → MXFP4 quantization for the EAGLE/MTP stack on `amd/Qwen3.5-397B-A17B-MXFP4` ([PR #38748](https://github.com/sgl-project/sglang/pull/38748)).
- **Ling-3.0-flash-VL cookbook** — INT4 and FP4 lanes added; FP8 lane refreshed on official checkpoints ([PR #38527](https://github.com/sgl-project/sglang/pull/38527)).
- **Diffusion**: support tracking issue refreshed ([#27214](https://github.com/sgl-project/sglang/issues/27214)) — Ideogram-4 NF4 and JoyEcho offline marked done; NVIDIA omni-dreams still open. Native-fallback path drops CPU-offload decisions → fatal OOM on 8GB GPUs ([#34772](https://github.com/sgl-project/sglang/issues/34772)).
- **SenseNova-U1 / U1.5** tracking opened, anchoring on upstream [OpenSenseNova/SenseNova-U1](https://github.com/OpenSenseNova/SenseNova-U1) ([#37742](https://github.com/sgl-project/sglang/issues/37742)).

## 4. Performance & Optimization

- **Weight Cache Daemon (Phase 1)**: Qwen3-235B FP8 weight load **306–327s → <1s** via per-rank post-quantization cache + CUDA IPC. Phase 2 plans in [#33522](https://github.com/sgl-project/sglang/issues/33522).
- **Tail-Optimized LRU (T-LRU, NeurIPS'25)** for the unified radix cache — keeps only as much of a conversation cached as the next prefill needs under a TTFT SLO; frees the tail before recency-order fallback. Good fit for agent workloads ([PR #34012](https://github.com/sgl-project/sglang/pull/34012)).
- **Agent-session attribution** added to `BlockStored` KV events so external KV routers can associate stored lines with sessions ([PR #37482](https://github.com/sgl-project/sglang/pull/37482)).
- **Decode-side HiCache** now works with `--enable-hierarchical-cache` on hybrid SWA and on Mamba/SSM models via the unified radix tree + 3 L3 decode-restore fixes ([PR #38634](https://github.com/sgl-project/sglang/pull/38634)).
- **MoE LoRA in prefill CUDA graphs** (full + breakable) — separate prefill MoE scratch, oversized dense LoRA launch grids shrunk ([PR #38578](https://github.com/sgl-project/sglang/pull/38578)).
- **Rust TreeCore + external cache linker** ([PR #37306](https://github.com/sgl-project/sglang/pull/37306)) — opaque `NodeId` handles, eliminating Python proxy traversal in the hot path.
- **AMD Qwen3.5 MTP**: online bf16 → MXFP4 quantization of the 1547-entry MTP `exclude` list (incl. 512 routed experts), enabling EAGLE/MTP decode on MXFP4 checkpoints ([PR #38748](https://github.com/sgl-project/sglang/pull/38748)).
- **Inkling MTP** — staging draft metadata before verify so the target metadata-completion event can release the scheduler ([PR #38169](https://github.com/sgl-project/sglang/pull/38169)).
- **FlashInfer full-prefill SWA graph buffer lifetime** fix — prefill capture no longer writes through a decode-only allocation ([PR #38747](https://github.com/sgl-project/sglang/pull/38747)).
- **MoE router GEMM unification** refactor proposed with a single gate layer so precision-critical router math stops drifting between backends ([#38695](https://github.com/sgl-project/sglang/issues/38695)).
- **Regression (open)**: `tiny_gemm` unification causes **~4% DeepSeek-R1 NVFP4 decode regression on Blackwell** — must be fixed without reverting #34693 ([#38628](https://github.com/sgl-project/sglang/issues/38628)).
- **Regression (closed, was active)**: Qwen3.5 MTP accept rate **0.19 at 32K+** on GPQA — now fixed/closed ([#30763](https://github.com/sgl-project/sglang/issues/30763)).

## 5. Stability & Regressions

Ranked by severity for production deployments:

1. **DeepSeek-V4 (dsv4 + DSPARK) TP=8, 8×H20, decode hang at ~245K context** — all GPUs spin at 100%/low power until watchdog kills the server. No fix PR yet ([#33549](https://github.com/sgl-project/sglang/issues/33549)). **Severity: high.**
2. **Kimi-K3 multi-node MegaMoE sparse-DP prefill CUDA graph deadlock** after PR #33871 — closed (fixed) but worth noting if you're on a pinned 0.5.x line ([#37561](https://github.com/sgl-project/sglang/issues/37561)).
3. **Kimi-K3 strict tool-call grammar** — `additionalProperties` dilutes a named property's type constraint under xgrammar ([#38587](https://github.com/sgl-project/sglang/issues/38587)). **Severity: high for tool-using agents.**
4. **Kimi-K3 `tool_choice=required` requests hang until ReadTimeout in 2P2D TP8/DCP8** — exact build not captured ([#37430](https://github.com/sgl-project/sglang/issues/37430)).
5. **Kimi-K3 decode crash with DSPARK + DCP** — `cumsum(extend_prefix_lens=None)` in `layers/dcp/planner.py` ([#34920](https://github.com/sgl-project/sglang/issues/34920)).
6. **GLM-5.2 (NVFP4, B200/B300) + EAGLE** — illegal memory access in FlashInfer TRTLLM bf16 batched-GEMM (nextn draft MoE); Triton nextn is HIP-gated after #30137 ([#30209](https://github.com/sgl-project/sglang/issues/30209)).
7. **DeepSeek-R1 NVFP4 decode ~4% regression on Blackwell** from PR #34693 — open, not yet reverted ([#38628](https://github.com/sgl-project/sglang/issues/38628)).
8. **Prefill breakable CUDA graph** — weak-ref'd break inputs across buckets → wrong greedy output / IMA; e2e validation of #37448 ([#37606](https://github.com/sgl-project/sglang/issues/37606)). **Correctness, severe if hit.**
9. **Attention metadata consistency after post-plan padding** — `ForwardBatch` mutates metadata in ways that can violate invariant; enforcement feature filed ([#38580](https://github.com/sgl-project/sglang/issues/38580)).
10. **Diffusion native-fallback drops CPU-offload** → fatal OOM on 8GB GPUs ([#34772](https://github.com/sgl-project/sglang/issues/34772)).
11. **Anthropic `/v1/responses` `output_config.effort`** unvalidated → 500; `xhigh` unreachable ([#36741](https://github.com/sgl-project/sglang/issues/36741)).
12. **PD prefill→decode failure notification** — NIXL has no notification at all (waits the full 300s `SGLANG_DISAGGREGATION_WAITING_TIMEOUT`); Mooncake/Mori each have their own wire format. Shared cross-backend notification in flight ([PR #36612](https://github.com/sgl-project/sglang/pull/36612)).
13. **ROCm EAGLE spec-decode verify silently sampling greedy** — `argmax` regardless of `temperature`/`top_p`, degenerating into repetition loops at `temp > 0` ([PR #37134](https://github.com/sgl-project/sglang/pull/37134)).
14. **Router SIGTERM** — `/readyz` keeps returning 200 until the listener closes, so k8s may route to a draining pod. Drain fix in flight ([PR #38744](https://github.com/sgl-project/sglang/pull/38744)).

CI housekeeping: closed issues covering BF16 RL weight-update shape mismatch with `flashinfer_trtllm` ([#27787](https://github.com/sgl-project/sglang/issues/27787)), Qwen3.5-9B runtime LoRA tool-call swallowing ([#30744](https://github.com/sgl-project/sglang/issues/30744)), empty-content SSE chunks breaking AI SDK providers ([#29441](https://github.com/sgl-project/sglang/issues/29441)), and `one_batch.py` regression ([#30773](https://github.com/sgl-project/sglang/issues/30773)).

## 6. What This Means for Application Developers

- **Restarts are getting free**. If you've been paying the 5+ minute cold-start tax for big MoE models, the Weight Cache Daemon alone cuts that to sub-second — evaluate it for any deployment where model swap / autoscaling is on the critical path ([#33522](https://github.com/sgl-project/sglang/issues/33522)).
- **Prefix-cache is getting smarter for agents**. T-LRU

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-10

## Today's Highlights
The 24-hour cycle was dominated by **Vulkan backend maturation** (spec-constant matrix multiplication, 2D workgroup distribution for FILL, dedicated iq4_xs shader) alongside **CUDA MMQ tiling improvements** for routed MoE on RDNA3. Major model support landed with **GLM-5-Next (GLM-5.3-Flash)** — a 321B hybrid linear/sparse-attention MoE with vision, plus GigaChat 3.5 432B-A28B — while an ARM I8MM q4_K optimization yielded a +34.3% GFLOPS uplift.

## Releases & Breaking Changes
Eleven builds shipped (b10871 → b10883). Notable items:
- **b10875** — Officially deprecates `--mmap`, `--mlock`, and `--dio` CLI flags ([#28334](https://github.com/ggml-org/llama.cpp/pull/28334)). Migrate any automation that uses these.
- **b10878** — `llama_sampler_chain_n` return type changed to `int32_t` ([#28631](https://github.com/ggml-org/llama.cpp/pull/28631), [#4574](https://github.com/ggml-org/llama.cpp/issues/4574)).
- **b10883** — Vulkan spec-constant mul-mat type selection ([#25773](https://github.com/ggml-org/llama.cpp/pull/25773)).
- **b10881** — Vulkan FILL kernel split into 2D workgroups to dodge `maxComputeWorkGroupCount` on Intel GPUs ([#28592](https://github.com/ggml-org/llama.cpp/pull/28592)).
- **b10877** — CUDA MMQ N-tile sized from typical expert width on RDNA3 ([#28552](https://github.com/ggml-org/llama.cpp/pull/28552)).
- **b10876** — Replaces `GGML_FA_ALL_QUANTS` with finer-grained `GGML_FA_QUANTS` controls ([#28079](https://github.com/ggml-org/llama.cpp/pull/28079)); runtime fallback warns on uncompiled combinations.

## New Model & Hardware Support
- **GLM-5-Next / GLM-5.3-Flash** — 321B hybrid (34 KDA linear + 11 DSA + mHC + DeepSeek-MoE) with vision tower ([#27754](https://github.com/ggml-org/llama.cpp/pull/27754), [#27773](https://github.com/ggml-org/llama.cpp/pull/27773)). Currently requires `NVIDIA_TF32_OVERRIDE=0`. Linked enhancement request: [#27922](https://github.com/ggml-org/llama.cpp/issues/27922).
- **GigaChat 3.5 432B-A28B** — DeepSeek-V3-style MLA + MoE, hybrid attention ([#25342](https://github.com/ggml-org/llama.cpp/pull/25342)).
- **b10874** — Fixes Granite3 MoE unknown parameter count ([#28632](https://github.com/ggml-org/llama.cpp/pull/28632)).
- **PR #25940** — RDNA4 MUL_MAT optimizations (Q6_K, Q2_K, MMQ conditions), validated against ROCm 7.15 / TheRock 20260717.
- **PR #26103** — `GGML_CPU_ALL_VARIANTS` gracefully skips ARM ISA variants rejected by the compiler (e.g., GCC < 14 + `+sme`).

## Performance & Optimization
- **ARM I8MM q4_K vec_dot** — +34.3% GFLOPS at batch=1 by specializing `nrc == 2` loop for `by == 0` ([#28673](https://github.com/ggml-org/llama.cpp/pull/28673)).
- **Vulkan iq4_xs mat-vec** — Dedicated shader yields **+6–17% token generation on RDNA4** depending on model ([#28426](https://github.com/ggml-org/llama.cpp/pull/28426)).
- **Vulkan stream-k MUL_MAT** — 256-K element chunks split across SMs with resolve shader, scalar+cm1+cm2 implemented, cm2 enabled by default ([#28528](https://github.com/ggml-org/llama.cpp/pull/28528)).
- **CUDA CUB TOP_K fallback** — Switches to radix-select for wide rows (Qwen3.8 QSA indexer: 4 rows × n_kv columns) on pre-CCCL-3.2 toolchains ([#28671](https://github.com/ggml-org/llama.cpp/pull/28671)).
- **SYCL TOP_K** — Radix-select RFC for K=2048 (qwen3.8-flash-next) instead of CPU offload ([#28670](https://github.com/ggml-org/llama.cpp/pull/28670)).
- **CUDA FA tuning on gfx1201 (R9700 PRO)** — Pre-fill tuning for Qwen3.8 27B at long contexts; also fixes a `HS=256` bug ([#28102](https://github.com/ggml-org/llama.cpp/pull/28102)).
- **HIP CLIP flash-attention** — Disabled for D=72 to avoid `HSA_STATUS_ERROR_MEMORY_APERTURE_VIOLATION` on 2× RX 7900 XTX / ROCm 7.14.1 ([#28664](https://github.com/ggml-org/llama.cpp/pull/28664)).
- **MTP KV-cache allocation** — Fixed over-allocation on DeepSeek2, GLM4 MoE, Cohere2 MoE ([#28630](https://github.com/ggml-org/llama.cpp/pull/28630), fixes [#28626](https://github.com/ggml-org/llama.cpp/issues/28626)).

## Stability & Regressions
**Severity-ranked, today:**

1. **VRAM leak — DeepSeek V4 Flash + DSpark** — Draft KV cache grows ~10 MB per PP+TG cycle until OOM ([#27155](https://github.com/ggml-org/llama.cpp/issues/27155)). *Open, no fix PR yet.*
2. **CUDA "invalid configuration argument" in `ggml_cuda_op_rms_norm_fused`** — Concurrent batching on `qwen4_exp` / Qwen3.8-Flash-Next, sm_70 ([#27911](https://github.com/ggml-org/llama.cpp/issues/27911)). *Open.*
3. **CUDA graphs hang RTX 5090 Laptop (sm_120)** — RC watchdog + Xid 8; `GGML_CUDA_DISABLE_GRAPHS=1` workaround ([#27330](https://github.com/ggml-org/llama.cpp/issues/27330)).
4. **CUDA concurrent-connection crashes** — `llama-server` on RTX PRO 6000 Blackwell ([#27835](https://github.com/ggml-org/llama.cpp/issues/27835)).
5. **Vulkan SPIR-V divergence on Adreno 830** — `vkCreateComputePipelines` fails on `mul_mat_vec_q4_k_f32_f32` ([#28635](https://github.com/ggml-org/llama.cpp/issues/28635)).
6. **Vulkan `maxComputeWorkGroupCount` on Intel Arc A770** — Closed by b10881 ([#28247](https://github.com/ggml-org/llama.cpp/issues/28247)).
7. **SYCL garbage output on second prompt** — Intel Arc Pro B60 ([#26845](https://github.com/ggml-org/llama.cpp/issues/26845)).
8. **Qwen tool_calls mangled/hung** — Parallel calls across multiple Qwen models, ~48 optional params ([#28522](https://github.com/ggml-org/llama.cpp/issues/28522)).
9. **Metal `--embeddings` builds the LM head** — Multi-GiB discarded tensor, all-NaN embeddings on long inputs ([#27784](https://github.com/ggml-org/llama.cpp/issues/27784)).
10. **DSpark + LFM2.5-8B-A1B (MoE) crashes at `graph_reserve`** — Dense LFM2.5 unaffected ([#28614](https://github.com/ggml-org/llama.cpp/issues/28614)).
11. **Qwen2.5-Omni audio corruption on Metal under load (b10809)** ([#28441](https://github.com/ggml-org/llama.cpp/issues/28441)).
12. **IQ3_S garbage on RTX 5060 Ti 16GB (Blackwell)** ([#28581](https://github.com/ggml-org/llama.cpp/issues/28581)).
13. **OpenCL backend aborts on Adreno** — Multiple shader/query fixes in flight ([#27630](https://github.com/ggml-org/llama.cpp/pull/27630)).
14. **Jinja `null in <map>`** — Treated as plain lookup now ([b10872](https://github.com/ggml-org/llama.cpp/pull/28620)).
15. **Q8_0 numpy 1.x corruption** — Closed ([#28438](https://github.com/ggml-org/llama.cpp/issues/28438)).
16. **mmap + `-ot "...=CUDA_Host"` rejected** — Closed ([#28223](https://github.com/ggml-org/llama.cpp/pull/28223)).

CI/packaging: **Vulkan CI to NVIDIA r615** in progress to clear intermittent coopmat1 failures ([#28659](https://github.com/ggml-org/llama.cpp/issues/28659)).

## What This Means for Application Developers
- **Pin to b10878 or later** if you depend on `libllama` ABI — the `int32_t` sampler return change will break out-of-tree integrations built against the previous signature.
- **Replace `--mlock/--mmap/--dio`** in deploy scripts with the new equivalents before they are removed; treat these as a deprecation warning, not yet a hard error.
- **If you ship Vulkan on Intel Arc**, b10881 must be deployed before Qwen 3.8 flash-next workloads — otherwise expect `GGML_ASSERT` aborts on FILL.
- **For Qwen3.8 / GLM-5.3-Flash serving**, keep an eye on the DSpark + MoE VRAM leak ([#27155](https://github.com/ggml-org/llama.cpp/issues/27155)) and the `cuda_rms_norm_fused` concurrent-batch crash ([#27911](https://github.com/ggml-org/llama.cpp/issues/27911)) — consider `GGML_CUDA_DISABLE_GRAPHS=1` on sm_120 as a temporary mitigation.
- **For ARM inference on Apple/edge**, the I8MM q4_K path is now a hot lane — rebuild GGUF quantize + backend with `-march=armv8.2-a+i8mm` for an immediate >30% throughput win at low batch.
- **GLM-5.3-Flash and GigaChat 3.5** are merge-track; expect general-availability within 1–2 release cycles. Validate tooling/grammar paths (XML tool args now enforce enums via [#28668](https://github.com/ggml-org/llama.cpp/pull/28668)) before pointing production traffic.
- **Metal embedding servers** running pooled models should audit memory consumption — [#27784](https://github.com/ggml-org/llama.cpp/issues/27784) indicates LM head materialization that's silently discarded but not freed.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-10

## Today's Highlights
The most consequential items today are infrastructure-level: a new native Intel SYCL (oneAPI) backend PR that adds first-class support for Intel Arc discrete GPUs, plus a cluster of correctness and stability bugs affecting the OpenAI/Anthropic compatibility layer (file-descriptor leak, silent all-zero embeddings, multi-GPU VRAM mis-accounting). Two of those regressions already have matching fixes merged or in flight.

## Releases & Breaking Changes
No new releases in the last 24 hours.

## New Model & Hardware Support
- **Intel SYCL / oneAPI backend** for Linux, opt-in, targeting Intel Arc discrete GPUs such as the Arc B70 32GB, including a C++ engine in llama.cpp plus integrated hardware discovery/refinement. PR [#18333](https://github.com/ollama/ollama/pull/18333).
- **MLX runner hygiene on non-Apple-Silicon / non-CUDA hosts**: MLX dynamic loader now reports missing symbols lazily instead of printing `CHECK failed: mlx_compile_cache_new_` to stderr on every `ollama` command. PR [#18335](https://github.com/ollama/ollama/pull/18335) (closes [#18283](https://github.com/ollama/ollama/issues/18283)).
- **Cloud model catalog request** for late-2026 frontier open models (Ornith, Longcat 2.0, Mimo v2.5/pro, Olmo 3.1, Laguna xs 2.1, Hunyuan Hy3, Jamba, Step 3.7). Issue [#17100](https://github.com/ollama/ollama/issues/17100).

## Performance & Optimization
- **Per-request log volume**: `llama-server` is currently spawned with `--log-verbosity 4`, dumping ~20 lines of slot bookkeeping per request into Ollama's stderr. A PR proposes suppressing that unless debug logging is enabled, fixing the journald noise reported in [#16897](https://github.com/ollama/ollama/issues/16897). PR [#17913](https://github.com/ollama/ollama/pull/17913).
- **Qwen3 tool-call parser** now preserves literal `</tool_call>` text that appears inside JSON argument values (e.g., file contents), avoiding false splits and "unexpected end of JSON" errors. PR [#18340](https://github.com/ollama/ollama/pull/18340).
- **Large numeric tool arguments**: `int64` cast without range check was silently turning values like `1e20` into `-9223372036854775808`; values outside int64 range are now kept as floats, with boundary tests for Qwen/GLM/Glimmer. PR [#18341](https://github.com/ollama/ollama/pull/18341).
- **MLX runner lifecycle**: scheduler no longer starts the next model load while a killed MLX runner is still exiting, preventing memory from the previous model bleeding into the next load. PR [#18345](https://github.com/ollama/ollama/pull/18345).

## Stability & Regressions
Ranked roughly by severity.

1. **File-descriptor leak in `/api/generate`** — `ollama serve` retains one FD per *successfully served* generate request for the lifetime of the process; FDs accumulate until a restart is required. New, no fix yet. Issue [#18344](https://github.com/ollama/ollama/issues/18344).
2. **Silent all-zero embedding vectors under sustained load** — `/v1/embeddings` and `/api/embed` return HTTP 200 with correct dimensionality (4096) and plausible `usage.prompt_tokens`, but vectors are all zeros; nothing in logs distinguishes success from failure. Dangerous for retrieval pipelines. Issue [#17878](https://github.com/ollama/ollama/issues/17878).
3. **Multi-GPU VRAM accounting uses wrong device names** — scheduler's `vramByDevice` / `systemFreeAtLoad` maps are keyed by `llama-server`'s log device names, but three lookup sites read `DeviceInfo.Name` from discovery. A `visible_devices` filter renumbers the child and the two diverge. Fix in flight. Issue [#18349](https://github.com/ollama/ollama/issues/18349) / PR [#18350](https://github.com/ollama/ollama/pull/18350).
4. **Vulkan regression on AMD iGPUs (Radeon 780M and 66 GB models)** — `radv/amdgpu: Not enough memory for command submission` / `vk::Queue::submit: ErrorDeviceLost` since v0.32.10/v0.32.12. Issue [#18272](https://github.com/ollama/ollama/issues/18272) was closed today without a confirmed fix; [#17748](https://github.com/ollama/ollama/issues/17748) remains open for the 780M.
5. **Anthropic `/v1/messages` complex tool schemas** — Claude Code pointed at Ollama as `ANTHROPIC_BASE_URL` falls back to emitting the tool call as literal text instead of a structured `tool_use` block when the schema is non-trivial. Issue [#18346](https://github.com/ollama/ollama/issues/18346).
6. **Gemma4:e2b startup crash** — `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS) failed` in WSL2. Long-standing, 8 👍, 22 comments. Issue [#16506](https://github.com/ollama/ollama/issues/16506).
7. **`qwen2.5-coder:3b-instruct` q2_K/q3_K* quantizations functionally broken** — fluent-looking but 0/15 on a 15-task functional suite; sibling quants unaffected. Issue [#18252](https://github.com/ollama/ollama/issues/18252).
8. **`ollama launch codex-app` breaks Codex's built-in browser** — native pipe trust fails (`privileged native pipe bridge is not available`). Issue [#16177](https://github.com/ollama/ollama/issues/16177). Namespace-tool variant [#17618](https://github.com/ollama/ollama/issues/17618) was closed today.
9. **Ollama Apps "Restart Claude Desktop" toggle silently reverts** on macOS 0.33.2 and writes no gateway config. Issue [#18188](https://github.com/ollama/ollama/issues/18188).
10. **Context-window slider hard-capped at 256K** even though several library models advertise 1M context. Issue [#18352](https://github.com/ollama/ollama/issues/18352).

**Closed today (fixes landed or previously shipped):**
- `/v1/responses` rejecting `agent_message` items — fixed by [#18298](https://github.com/ollama/ollama/pull/18298) (closes [#18286](https://github.com/ollama/ollama/issues/18286)).
- `tool_choice` silently ignored on OpenAI + Anthropic compat layers — fixed by [#17935](https://github.com/ollama/ollama/pull/17935).
- Codex `function_call_output` items without `call_id` rejected during compaction — fixed by [#18348](https://github.com/ollama/ollama/pull/18348).
- Full-Access mode escalation for namespaced `exec_command` — normalized by [#18331](https://github.com/ollama/ollama/pull/18331).
- ChatGPT model selector chip spacing — fixed by [#18347](https://github.com/ollama/ollama/pull/18347).
- `agent` skill-not-found error message — fixed by [#18020](https://github.com/ollama/ollama/pull/18020).
- Linux uninstall docs (`tr 'bin' 'lib'`) character-translation bug — fixed by [#18339](https://github.com/ollama/ollama/pull/18339).
- Xcode guide trailing whitespace — [#18338](https://github.com/ollama/ollama/pull/18338).
- Long-standing request to delete partially-downloaded models — [#1599](https://github.com/ollama/ollama/issues/1599) closed (likely via existing `ollama rm` behavior or docs clarification).
- Cloud proxy swallowing upstream stream failures — PR [#18351](https://github.com/ollama/ollama/pull/18351) propagates non-client stream-copy failures via `http.ErrAbortHandler` (open; fixes [#18193](https://github.com/ollama/ollama/issues/18193)).

## What This Means for Application Developers
- **Treat embedding health checks as mandatory.** With [#17878](https://github.com/ollama/ollama/issues/17878), a production retrieval pipeline can silently degrade to zero vectors while still receiving HTTP 200 and a plausible token count. Add a probe that asserts vector norm or a sentinel similarity against a known pair, and alert on the *absence* of errors, not just their presence.
- **Expect FD exhaustion under sustained `/api/generate` traffic.** [#18344](https://github.com/ollama/ollama/issues/18344) means long-lived `ollama serve` instances will leak FDs even on successful requests. Plan for periodic restart or run behind a supervisor that recycles on FD count until a fix ships.
- **Multi-GPU users on 0.32.10+ should pin to a known-good build or constrain `CUDA_VISIBLE_DEVICES` to start at device 0** until [#18350](https://github.com/ollama/ollama/pull/18350) lands, because scheduler VRAM accounting currently diverges from reality whenever devices are filtered.
- **AMD Radeon iGPU / Vulkan users should hold off on 0.32.10+ for large models** ([#18272](https://github.com/ollama/ollama/issues/18272), [#17748](https://github.com/ollama/ollama/issues/17748)); v0.32.9 is the last known-working version.
- **Tool-calling clients should pin `tool_choice`** ([#17935](https://github.com/ollama/ollama/pull/17935) now respects it on both OpenAI and Anthropic layers) — pre-fix builds silently ignored it, returning text when a tool was forced.
- **Codex-on-Ollama users get a usable `/v1/responses` and namespace tooling now** ([#18298](https://github.com/ollama/ollama/pull/18298), [#18331](https://github.com/ollama/ollama/pull/18331), [#18348](https://github.com/ollama/ollama/pull/18348)); the remaining gap is the Codex built-in browser native pipe ([#16177](https://github.com/ollama/ollama/issues/16177)) and complex-tool-schemas via Anthropic compat ([#18346](https://github.com/ollama/ollama/issues/18346)).
- **Intel Arc B70 / discrete Intel GPU** deployments get a real path forward with [#18333](https://github.com/ollama/ollama/pull/18333) — opt-in SYCL build instead of CPU fallback or unsupported Vulkan.
- **Long-context workloads are limited by UI**, not model capability ([#18352](https://github.com/ollama/ollama/issues/18352)); pass the context window via Modelfile / API rather than the slider for now.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-10

## Today's Highlights
- **v1.102.0-dev.1 development preview** ships, with documentation now codifying cosign-based signature verification for all LiteLLM Docker images ([PR #39062](https://github.com/BerriAI/litellm) release notes).
- A **major Bedrock performance regression** — request signing running on the event loop — is being fixed ([PR #40270](https://github.com/BerriAI/litellm/pull/40270)); one Bedrock call could freeze every other request on the worker.
- A **critical correctness bug** in the v3 rate limiter ([Issue #34140](https://github.com/BerriAI/litellm/issues/34140)) surfaces: per-team per-model `model_rpm_limit`/`model_tpm_limit` are enforced at half the configured value, and per-customer RPM limits stop applying once the virtual key is cached ([Issue #39713](https://github.com/BerriAI/litellm/issues/39713)).

## Releases & Breaking Changes
- **[v1.102.0-dev.1](https://github.com/BerriAI/litellm)** — first dev cut toward the next minor. No formal changelog yet. Notable: all images are now signed with a stable key ([commit `0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)); verify with `cosign verify`.
- No deprecations or wire-format breaks announced in this dev cut.

## New Model & Hardware Support
Rolling registry update ([PR #31884](https://github.com/BerriAI/litellm/pull/31884)) and adjacent providers:
- **OpenAI**: `gpt-6-astra`, `gpt-image-2.5`, ChatGPT `gpt-5.5`/`gpt-5.6`, `openai.web_search` fee.
- **xAI**: `grok-imagine-video`, `grok-imagine-video-1.5`.
- **Google**: `lyria-3.5` (audio), Vertex `grok-4.3`/`4.6`/`4.20`.
- **Cohere**: rerank 4 on Bedrock.
- **Voyage**: `voyage-multilingual-2`.
- **Bedrock**: Mantle family, updated Scaleway date pricing.
- **Vertex**: native OCR support (Rust core) added in [PR #40466](https://github.com/BerriAI/litellm/pull/40466) with ADC + service-account auth.

## Performance & Optimization
- **[PR #40270](https://github.com/BerriAI/litellm/pull/40270)** — Bedrock request signing moved off the event loop across `/v1/messages`, Converse, count tokens, and pass-through. `botocore` credential refresh (a blocking HTTP call) no longer pins a worker; this is the most impactful stability/perf change in the drop.
- **[PR #40486](https://github.com/BerriAI/litellm/pull/40486)** — Auto-routers now fall back to a healthy default tier when the selected singleton tier is unhealthy, instead of erroring.
- **[PR #40483](https://github.com/BerriAI/litellm/pull/40483)** — Rerank path drops request-context document payloads from serialized provider params; large rerank requests no longer OOM the proxy.
- **[PR #40482](https://github.com/BerriAI/litellm/pull/40482)** — New e2e gate simulates Redis command timeouts under retry pressure; targets the v1.100.0 OOM breadcrumb (LIT-6780) that 12 days of pre-release soak missed.
- **[PR #40465](https://github.com/BerriAI/litellm/pull/40465)** — E2E coverage ensures every spend-log write path joins to the virtual key, preventing the v1.99.0 incident (#39568, #39572) where unjoined rows surfaced to customers as `key-hash-*`.

## Stability & Regressions
Ranked by user-visible severity:

1. **Critical — v3 rate limiter under-enforces team/model limits** ([#34140](https://github.com/BerriAI/litellm/issues/34140)). `model_rpm_limit` per team returns 429 at ~N/2 instead of N. No fix PR yet — operators should over-provision limits until resolved.
2. **Critical — Per-customer RPM stops applying once cached** ([#39713](https://github.com/BerriAI/litellm/issues/39713)). `litellm_settings.max_end_user_budget_id` and direct customer budgets lose effect after virtual-key cache warmup. No fix PR yet.
3. **High — Bedrock async signing on event loop** ([#13245](https://github.com/BerriAI/litellm/issues/13245) + [PR #40270](https://github.com/BerriAI/litellm/pull/40270)). One expiring-credential refresh froze the worker and broke concurrent spend tracking on client disconnect. **Fix in flight**.
4. **High — `/metrics` empty after upgrade to 1.88.0** ([#30079](https://github.com/BerriAI/litellm/issues/30079)). Prometheus scrape hits a 307 redirect and gets no data. Long-standing.
5. **High — Streaming tool-call continuation broken since v1.87.0** ([#30053](https://github.com/BerriAI/litellm/issues/30053)). `fast_path` in `async_streaming_data_generator` returns XML instead of text on Bedrock-Claude follow-ups. No fix PR yet.
6. **Medium — Redis CROSSSLOT on non-OSS-Cluster** ([#30065](https://github.com/BerriAI/litellm/issues/30065)). `_group_keys_by_hash_tag()` skips grouping on Azure Redis Enterprise and Managed Redis.
7. **Medium — OTEL callback crashes pods** ([#30061](https://github.com/BerriAI/litellm/issues/30061)). NoneType trace crash loop with otel enabled.
8. **Medium — `least-busy` routing starves deployments** ([#39322](https://github.com/BerriAI/litellm/issues/39322)). Response-cache hits drift the counter negative; counter isn't shared across workers; ties always pick the first deployment.
9. **Medium — Internal-user `max_budget` blocks zero-cost models** ([#29912](https://github.com/BerriAI/litellm/issues/29912)). `_PROXY_MaxBudgetLimiter` ignores `skip_budget_checks` for free models.
10. **Medium — Tests fail inside `litellm-database` image** ([#40357](https://github.com/BerriAI/litellm/issues/40357)). Nine AWS cases fail under ambient `SSL_CERT_FILE`; CI never catches this.

**Recently closed (good news)**:
- [#40237](https://github.com/BerriAI/litellm/issues/40237) Complexity auto-router no longer moves `reasoning.encrypted_content` across groups — addressed via [PR #40451](https://github.com/BerriAI/litellm/pull/40451) which byte-stably replays OpenAI encrypted reasoning through the `/v1/messages` bridge.
- [#40279](https://github.com/BerriAI/litellm/issues/40279) `gpt-6-astra` model detection (`is_model_gpt_5_model` etc.) patched.
- [#39145](https://github.com/BerriAI/litellm/issues/39145) `prompt_cache_key` derived from `user_id` now changes per user.
- [#25550](https://github.com/BerriAI/litellm/issues/25550) Model access groups no longer leak into `/v1/models`.
- [#21090](https://github.com/BerriAI/litellm/issues/21090) Responses API streaming no longer silently drops function_call events on custom models.
- [#29588](https://github.com/BerriAI/litellm/issues/29588) MCP OAuth no longer 500s on `invalid_grant` upstream.

## What This Means for Application Developers
- **Bedrock in production**: the upcoming v1.102.0 release should materially improve tail latency and concurrency on `/v1/messages` paths; consider pinning Bedrock-heavy workloads to it once it ships.
- **Don't trust v3 rate limits yet**: if you depend on `model_rpm_limit`/`model_tpm_limit` per team, double the configured ceiling until #34140 is fixed. Audit virtual-key caching for end-user budget limits (#39713) — protection may silently disappear.
- **Claude Code on LiteLLM**: better bridging now — encrypted reasoning replays byte-stable, tool `pattern` fields with `\p{..}` no longer break OpenAI-backed models ([PR #40485](https://github.com/BerriAI/litellm/pull/40485)), and `lite configure claude` ([PR #40319](https://github.com/BerriAI/litellm/pull/40319)) handles Claude Code's own sub-agent model ids cleanly. `lite claude` ([PR #40489](https://github.com/BerriAI/litellm/pull/40489)) stops the `ANTHROPIC_AUTH_TOKEN` + `apiKeyHelper` warning.
- **MCP debugging**: resolved upstream auth is now reported in debug headers ([PR #40454](https://github.com/BerriAI/litellm/pull/40454)) and gateway-owned endpoints surface a proper OAuth challenge + protected-resource metadata ([PR #40453](https://github.com/BerriAI/litellm/pull/40453)). Pin MCP failures faster.
- **Auto-router reliability**: unhealthy tiers now fall back ([PR #40486](https://github.com/BerriAI/litellm/pull/40486)); team members can manage team-scoped auto-routers without blanket model-write permissions ([PR #40340](https://github.com/BerriAI/litellm/pull/40340)).
- **Tooling permission fix**: internal users (non-admins) can finally run "Test Connection" on models they're allowed to call ([PR #40392](https://github.com/BerriAI/litellm/pull/40392)) — useful for self-service onboarding flows.
- **Watchlist**: the `least-busy` strategy (#39322) and the `fast_path` streaming regression (#30053) are still open and affect any deployment relying on multi-replica routing or Bedrock-Claude tool flows respectively.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-10

## Today's Highlights

Unsloth shipped **v0.1.808-beta**, a substantial performance and reliability release that delivers 1.2–1.7x faster diffusion training, a 20% AMD ROCm uplift via Vulkan, and 2x faster `studio update` cycles. Studio work continues at full pace: today's PR wave is dominated by dependency-pass optimization (manifest-based skipping, PyPI offline resilience, sidecar rebuild minimization) and KV-cache correctness fixes for multi-chat scenarios on a single llama-server.

## Releases & Breaking Changes

**v0.1.808-beta — Large Performance Gains + Fixes** ([release](https://github.com/unslothai/unsloth))
- Headline wins: 1.2–1.7x faster diffusion; AMD ROCm +20% via Vulkan path
- 2x faster updates; SAC + AV false positives removed on Windows
- Blender MCP integration added; Hermes-style responses now auto-detected
- AMD gibberish output bug fixed (reported upstream to AMD)

Notable from this batch: a long-standing **Apple Silicon support** request ([#4](https://github.com/unslothai/unsloth/issues/4), 644 👍, open since 2023) was closed in this update cycle, indicating MLX/Metal is now landing or is on an imminent path.

## New Model & Hardware Support

- **AMD ROCm / Vulkan** kernel path now active with measurable gains (per release notes).
- **AMD Strix Halo APU (gfx1151, unified memory)** — Issue [#6834](https://github.com/unslothai/unsloth/issues/6834) addresses the case where Studio refused to load a 21.3 GB GGUF into 110 GB of available unified memory.
- **Intel Arc B580** import failure resolved ([#3533](https://github.com/unslothai/unsloth/issues/3533)) — `torch.xpu.memory.mem_get_info()` no longer assumed.
- **Gemma 4** image-input bug surfaced in Studio/llama-server ([#10559](https://github.com/unslothai/unsloth/issues/10559), OPEN) — default `ubatch` too small; needs upstream llama.cpp bump.
- **Qwen3-Coder-Next-Base** OOM on 2×A100 80GB QLoRA documented and triaged ([#4040](https://github.com/unslothai/unsloth/issues/4040)).

## Performance & Optimization

| Area | Change | Source |
|---|---|---|
| Diffusion training | 1.2–1.7x faster | v0.1.808-beta |
| AMD ROCm inference/training | +20% via Vulkan | v0.1.808-beta |
| `studio update` cold path | 2x faster (16-step dep pass) | v0.1.808-beta |
| transformers sidecar rebuilds | Only rebuild the sidecar whose on-disk evidence is stale (was 60–90s on Windows) | PR [#10650](https://github.com/unslothai/unsloth/pull/10650) |
| Dep-pass skip logic | Skip a step only when manifest evidence + disk state + version all match | PR [#10649](https://github.com/unslothai/unsloth/pull/10649) |
| llama.cpp/whisper.cpp/Node install validation | Reads version markers instead of re-downloading (13–63s saved on macOS) | PR [#10648](https://github.com/unslothai/unsloth/pull/10648) |
| KV-cache utilization | Parallel chats share one `--kv-unified` pool instead of killing each other | PR [#10301](https://github.com/unslothai/unsloth/pull/10301) |
| KV reservation enforcement | Move from ledger-only to wire-level enforcement so 4× parallel GGUF chats don't all fail | PR [#10120](https://github.com/unslothai/unsloth/pull/10120) |

An opt-in **E2E test** that asserts a second `studio update` is a true no-op (network-byte attribution via CONNECT proxy) is landing ([#10652](https://github.com/unslothai/unsloth/pull/10652)) — this signals the team is treating update idempotency as a first-class SLA.

## Stability & Regressions

**Closed this cycle (high impact):**
- [#3450](https://github.com/unslothai/unsloth/issues/3450) — `NameError: slice_indices` on Qwen2 Kaggle (fixed, pending confirmation).
- [#3650](https://github.com/unslothai/unsloth/issues/3650) — Gemma 3n max recursion depth.
- [#3086](https://github.com/unslothai/unsloth/issues/3086) — `fetch_video` not defined in vision training.
- [#3399](https://github.com/unslothai/unsloth/issues/3399) — Prompt-completion dataset support parity with TRL.
- [#1869](https://github.com/unslothai/unsloth/issues/1869) — CPT padding error for long contexts (12k avg tokens).
- [#2364](https://github.com/unslothai/unsloth/issues/2364) — `ZeroDivisionError` from `-100`-only labels on Phi-3.5/4-mini.
- [#868](https://github.com/unslothai/unsloth/issues/868) — `KeyError: EOS_TOKEN` in GGUF export.
- [#2497](https://github.com/unslothai/unsloth/issues/2497) — `_fast_inner_training_loop` division by zero on unusual `name_or_path`.

**Still OPEN (severity-ordered):**

- **[#10545](https://github.com/unslothai/unsloth/issues/10545) — Security audit `hf-stack` lane red on `main`.** 164 findings (60 CRITICAL, 33 HIGH) suppressed by a stale baseline after an `unsloth-zoo` bump. Needs re-baseline and dependency review before any tagged release.
- **[#10559](https://github.com/unslothai/unsloth/issues/10559) — `llama-server` GGML_ASSERT on Gemma 4 image input.** Default `ubatch` too small; blocks vision inference path for that family.
- **[#10573](https://github.com/unslothai/unsloth/issues/10573) — Unsloth Desktop 0.1.807-beta (Windows) rejects `min_p` + `logit_bias` when connected to vLLM.** Surfaces a vLLM OpenAI-server capability gap that Studio users will hit immediately.
- **[#9033](https://github.com/unslothai/unsloth/issues/9033) — "Don't reserve System RAM" not working in Unsloth Desktop on Windows.** With `-ngl -1`, system memory stays occupied even when the model and KV cache live entirely in VRAM. Mitigated by PR [#10618](https://github.com/unslothai/unsloth/pull/10618) which avoids resident GGUF mappings on Windows no-reserve loads (Windows `unmap_fragment` is a no-op upstream).
- **[#10004](https://github.com/unslothai/unsloth/issues/10004) — Studio multi-turn determinism smoke intermittent on merge base.** Affects CI trust for Studio inference regression detection.
- **[#8473](https://github.com/unslothai/unsloth/issues/8473) — AMD host: installer reports ROCm while backend runs CPU-only, no reconciliation.** Closed, but the bug class (GPU detection ↔ backend mismatch) is one to watch on heterogeneous fleets.

Several correctness fixes are landing in PR but unmerged: literal `<think>` text stripping ([#10662](https://github.com/unslothai/unsloth/pull/10662)), false-positive envelope stripping on `__IMAGES__`/`__RAG_SOURCES__` mentions in tool output ([#10668](https://github.com/unslothai/unsloth/pull/10668)), timed-out tool output preservation ([#10664](https://github.com/unslothai/unsloth/pull/10664)), and Unicode filename mangling on upload ([#10667](https://github.com/unslothai/unsloth/pull/10667)).

## What This Means for Application Developers

1. **Studio is becoming idempotent and observable.** With the dep-pass skip + E2E no-op harness landing, expect `studio update` to feel deterministic rather than best-effort. Useful for fleet automation and CI runners that previously had to retry or pin versions.
2. **KV-cache work changes parallel-chat economics.** PRs [#10301](https://github.com/unslothai/unsloth/pull/10301) + [#10120](https://github.com/unslothai/unsloth/pull/10120) mean one model can now serve N concurrent chats from a unified pool without OOM-killing peers. If you're sizing a single-GPU inference box for an agent workload, revisit `--parallel` and `-c` math — the prior formula (`-c ≥ sum_of_contexts`) no longer holds and can be relaxed.
3. **AMD is a first-class path now, not a footnote.** Vulkan +20% and the Strix Halo unified-memory fixes put ROCm APUs in the same conversation as CUDA for Studio workloads. Worth re-benchmarking your AMD fleet before next planning.
4. **Watch the vLLM gap.** Desktop 0.1.807 rejects `min_p` and `logit_bias` against vLLM — if you depend on either, pin to a llama.cpp backend or wait for parity; otherwise your sampling params silently no-op.
5. **Security lane is red.** Until [#10545](https://github.com/unslothai/unsloth/issues/10545) is resolved, treat `hf-stack` baseline as untrusted — if you mirror these wheels into a private index, run your own `pip-audit` rather than trusting the public scan output.
6. **Apple Silicon closure of #4** is the single biggest ecosystem signal today. If it represents real MLX support (not just "won't fix" close), every existing Unsloth notebook will become runnable on M-series without a separate recipe. Confirm before updating marketing/infra copy.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — Daily Digest
**Date:** 2026-09-10
**Repository:** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
**Activity window:** last 24h (no new releases)

---

## 1. Today's Highlights

The CCR community is converging on **provider compatibility gaps**, not core router performance. Three fresh issues (#1781, #1780, #1779) all report upstream-side 4xx rejections that CCR did not anticipate: a Meta Responses schema mismatch on tool calls, a new mandatory header on opencode-go, and an OIDC federation activation regression. On the positive side, three long-standing PRs (#865, #1224, #1225) closed today, landing cleaner subagent routing, custom OpenRouter header forwarding, and a safer "missing API key" warning.

---

## 2. Releases & Breaking Changes

*No new releases in the last 24h.* The current published version referenced by user reports is **CCR 3.0.22**.

---

## 3. New Model & Hardware Support

No new model, backend (CUDA/ROCm/Metal/CPU), or quantization-format additions reported in this window.

---

## 4. Performance & Optimization

No throughput/latency/memory work in this window. The closest item, [PR #1773](https://github.com/musistudio/claude-code-router/pull/1773), targets **observability**, not performance: it surfaces per-attempt `stage`/`status`/`message` details inside the aggregate `"All target providers failed"` error so operators can pinpoint which provider and HTTP status caused a cascade failure.

---

## 5. Stability & Regressions

Three user-reported bugs filed today; all are **compatibility / contract mismatches** rather than crashes or memory issues. None has a fix PR linked yet.

| Sev | Issue | Summary | Fix PR |
|---|---|---|---|
| **High** | [#1781](https://github.com/musistudio/claude-code-router/issues/1781) | When routing `anthropic_messages` → OpenRouter → `meta/muse-spark-1.3-contributor`, tool_use/tool_result blocks are converted to Meta's Responses `input[]` shape but the required `call_id` is dropped, and `max_tokens` is not floored to Meta's minimum. Result: `400` from OpenRouter. | None |
| **High** | [#1780](https://github.com/musistudio/claude-code-router/issues/1780) | As of 2026-09-05, `opencode.ai/zen/go/v1` (opencode-go) requires the `x-opencode-session` header. CCR's provider requests are forwarded verbatim and all return `400 MissingSessionID`. Affects any provider whose `api_base_url` points at this endpoint. | None |
| **High** | [#1779](https://github.com/musistudio/claude-code-router/issues/1779) | On CCR 3.0.22 + Claude Code 2.1.23, the Claude Code profile fails with `Not logged in` despite CCR exporting the `oidc_federation` env vars — the OIDC mode is never actually activated. Blocks free `:free` OpenRouter models behind the OAuth profile. | None |

**Closed today (no longer open regressions):**
- [PR #1225](https://github.com/musistudio/claude-code-router/pull/1225) — subagent `<CCR-SUBAGENT-MODEL>` override now reliably detected (previously only inspected `system[1].text`).
- [PR #1224](https://github.com/musistudio/claude-code-router/pull/1224) — custom `providerConfig.headers` are now merged into the upstream `fetch` call (OpenRouter app attribution headers, etc.).
- [PR #865](https://github.com/musistudio/claude-code-router/pull/865) — removed forced `HOST=127.0.0.1` overwrite when API key is absent; logs a warning instead, restoring flexible deployment.

---

## 6. What This Means for Application Developers

- **Tool-use with non-Anthropic providers is fragile today.** If you route Anthropic-format tool calls through Meta-backed models on OpenRouter, expect `400` until [#1781](https://github.com/musistudio/claude-code-router/issues/1781) is patched. Workaround: route Meta models through a pure OpenAI-compatible path or disable tool_use for those routes.
- **opencode-go endpoints are effectively down via CCR** as of 2026-09-05 ([#1780](https://github.com/musistudio/claude-code-router/issues/1780)). Until header injection lands, do not point `api_base_url` at `https://opencode.ai/zen/go/v1`.
- **OIDC/federated profiles against Claude Code 2.1.23 are broken on CCR 3.0.22** ([#1779](https://github.com/musistudio/claude-code-router/issues/1779)). Pin Claude Code to an earlier build or use API-key auth until this is resolved.
- **Better debugging is incoming.** [PR #1773](https://github.com/musistudio/claude-code-router/pull/1773) will make multi-provider fallbacks far easier to triage — watch for it on the next release.
- **Recent quality-of-life wins already in tree:** custom upstream headers ([#1224](https://github.com/musistudio/claude-code-router/pull/1224)) and reliable subagent model overrides ([#1225](https://github.com/musistudio/claude-code-router/pull/1225)) are now available if you build from `main`. The HOST-override removal ([#865](https://github.com/musistudio/claude-code-router/pull/865)) means containerized deployments no longer get silently rebound to loopback when an API key is missing — verify your proxy/ingress still binds the public interface.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-10

## 1. Today's Highlights

CC Switch's proxy layer got meaningful hardening today: PR [#7259](https://github.com/farion1231/cc-switch/pull/7259) fixes a URL-forwarding bug where "full URL" mode that ends at `/v1` silently dropped the wire-API path, and PR [#7207](https://github.com/farion1231/cc-switch/pull/7207) patches a P0 circuit-breaker bug where `max_half_open_requests=1` was effectively no-op because the permit guard was dropped before the forwarder finished. On the provider side, the official MiniMax presets now default to **MiniMax-M3** (PR [#7255](https://github.com/farion1231/cc-switch/pull/7255)) and Codex gains first-class **GitHub Copilot** routing (PR [#7157](https://github.com/farion1231/cc-switch/pull/7157)). Claude Code compatibility is under pressure — issue [#7236](https://github.com/farion1231/cc-switch/issues/7236) (DeepSeek/ZAI broken on CLI 2.1.265) is the most acute user-visible regression in the last 24h.

## 2. Releases & Breaking Changes

_No new releases in the last 24h._

## 3. New Model & Hardware Support

- **MiniMax-M3** becomes the default for new MiniMax presets across all 7 supported families; expired MiniMax Coding Plan promotions removed ([#7255](https://github.com/farion1231/cc-switch/pull/7255)).
- **Laonong API** (`laonongapi`) added as a built-in provider preset — OpenAI-SDK-compatible gateway aggregating 40+ models including GPT-4o, Claude 3.5 Sonnet, DeepSeek, Gemini ([#7245](https://github.com/farion1231/cc-switch/pull/7245)).
- **GitHub Copilot** as a managed Codex provider — proxy now picks Responses vs Chat Completions upstream based on the model's `supported_endpoints` ([#7157](https://github.com/farion1231/cc-switch/pull/7157)).
- **OpenCode Go** session affinity — proxy now stamps a stable `x-opencode-session` header per conversation (required by upstream since 2026-09-06) ([#7246](https://github.com/farion1231/cc-switch/pull/7246)).
- **Grok Build** Responses payload normalization — handles upstream `output_text` parts that omit `annotations`, covering SSE and JSON paths ([#6820](https://github.com/farion1231/cc-switch/pull/6820)).
- Localized: **Portuguese-BR** translation set and README added ([#7046](https://github.com/farion1231/cc-switch/pull/7046)).

## 4. Performance & Optimization

- **TTFT accuracy on Responses streaming** — first-byte timing is now recorded on the first valid response event instead of being deferred until usage accounting completes; previously TTFT could equal total duration ([#7233](https://github.com/farion1231/cc-switch/pull/7233)).
- **Circuit-breaker correctness** — RAII guard reworked in `forwarder.rs` so the half-open permit is actually held for the lifetime of the in-flight probe; `HalfOpenPermitGuard::disarm()` now also releases the permit on drop, fixing a count leak ([#7207](https://github.com/farion1231/cc-switch/pull/7207)).
- **Cache-hit preservation for Claude Code steer messages** — opt-in conversion of `system` (steer / todo / background) to `user` keeps cache keys stable across mid-conversation user nudges on a Chat Completions gateway ([#7253](https://github.com/farion1231/cc-switch/pull/7253)).
- **Responses reasoning summaries preserved** — Anthropic thinking blocks now replay properly instead of leaking `redacted_thinking` when reasoning summaries are visible ([#6814](https://github.com/farion1231/cc-switch/pull/6814)).
- **Lightweight mode auto-enter** — new setting (0–1440 min, default 5 min) to drop into tray automatically after the main window is hidden ([#7114](https://github.com/farion1231/cc-switch/pull/7114)).

## 5. Stability & Regressions

**P0 (production-impacting):**
- **Circuit-breaker HalfOpen permit leak / limit ignored** — `max_half_open_requests=1` was bypassed because the permit guard was destructured before the forwarder completed. Fix in PR [#7207](https://github.com/farion1231/cc-switch/pull/7207).
- **Local route bypass on Codex 26.905 / codex v0.153.x** — requests skip the 15721 proxy and hit `api.openai.com` directly; third-party relays also can't connect because responses API is forced. Open: [#7217](https://github.com/farion1231/cc-switch/issues/7217).

**P1 (user-visible breakage):**
- **Claude Code 2.1.265 breaks DeepSeek / ZAI** — closed in [#7236](https://github.com/farion1231/cc-switch/issues/7236) (resolution details inside); also see cache token reporting dropping to zero on DeepSeek at CLI 2.1.235 [#6626](https://github.com/farion1231/cc-switch/issues/6626).
- **`/responses` → `/chat/completions` translation 400 on truncated function args** — bad `function_call.arguments` JSON in history kills translation. Open: [#5197](https://github.com/farion1231/cc-switch/issues/5197).
- **Codex old-session 401 after provider switch** — continued sessions on the prior official-auth account still hit `api.openai.com`. Open: [#5672](https://github.com/farion1231/cc-switch/issues/5672) (👍 3).
- **Codex `image_gen.imagegen` conflicts with hosted tool in same request** — open/stale [#5171](https://github.com/farion1231/cc-switch/issues/5171).
- **OpenCode Go + Anthropic Messages → 401 "Missing API key"** — auth header is being dropped at the proxy boundary. Open: [#6258](https://github.com/farion1231/cc-switch/issues/6258) (👍 2); addressed in part by [#7246](https://github.com/farion1231/cc-switch/pull/7246).
- **Local proxy 502 in full-URL mode** — closed [#3585](https://github.com/farion1231/cc-switch/issues/3585); the underlying class of bug is fixed in [#7259](https://github.com/farion1231/cc-switch/pull/7259).
- **WSL2 OpenCode config / session / token visibility** — open [#5061](https://github.com/farion1231/cc-switch/issues/5061).

**P2 / hygiene:**
- Volcengine quota query broken (closed [#6070](https://github.com/farion1231/cc-switch/issues/6070)); structural fix for dual Coding/Agent Plan routing in PR [#7096](https://github.com/farion1231/cc-switch/pull/7096).
- Codex provider switch overwrites `config.toml` + `auth.json` with no physical backup of externally-added entries — open [#6875](https://github.com/farion1231/cc-switch/issues/6875).
- Config-file edits replace symlink targets instead of writing through — open [#5129](https://github.com/farion1231/cc-switch/issues/5129).
- Codex local env-monitor not picking up latest codex version, blocking manual update — open [#7080](https://github.com/farion1231/cc-switch/issues/7080).
- macOS 13: provider check + in-app update unavailable, codex API calls fail — open [#6936](https://github.com/farion1231/cc-switch/issues/6936).
- Codex Mac editor freezes after editing the active provider — open [#5193](https://github.com/farion1231/cc-switch/issues/5193).
- Background process with no window on Windows (no WebView2 cache / handle) — open [#5185](https://github.com/farion1231/cc-switch/issues/5185); adjacent fix PR [#7240](https://github.com/farion1231/cc-switch/pull/7240) addresses the Windows WebView2 blank-screen startup variant.
- Codex `/images/edits` not proxied; full-endpoint base_url without "full URL" toggle; streaming image usage — addressed in [#7177](https://github.com/farion1231/cc-switch/pull/7177).
- "Preserve official auth on non-takeover switch" hides GPT-6 reasoning-strength control — open [#7258](https://github.com/farion1231/cc-switch/issues/7258).
- ChatGPT 26.707 enabling `image_generation` causes CC Switch `/responses` text-only requests to 403 — open [#5190](https://github.com/farion1231/cc-switch/issues/5190).
- Claude Code cache misses from system-message steer/reminders (open [#7252](https://github.com/farion1231/cc-switch/issues/7252)); mitigation PR [#7253](https://github.com/farion1231/cc-switch/pull/7253).

## 6. What This Means for Application Developers

- **If you sit behind a Chat-Completions gateway serving Claude Code**, enable the new "Response system conversion" group in [#7253](https://github.com/farion1231/cc-switch/pull/7253) — steer/todo/background messages currently blow your cache, and this is the mitigation until upstream changes land.
- **If you run Codex v0.153.x**, do not rely on local-route proxying yet ([#7217](https://github.com/farion1231/cc-switch/issues/7217)); expect direct `api.openai.com` egress and 401s on third-party providers until that PR lands. Pin to an earlier codex or turn off local routing.
- **Building against OpenCode Go?** You must send `x-opencode-session` per conversation as of 2026-09-06 ([#7246](https://github.com/farion1231/cc-switch/pull/7246)) — clients that don't (most do not) need a proxy shim.
- **Treat "full URL" provider entries carefully** — they were forwarded verbatim and could drop the wire-API path when configured at `/v1` ([#7259](https://github.com/farion1231/cc-switch/pull/7259)); until the fix ships, prefer base-URL + endpoint form for OpenAI/Anthropic compatibility.
- **For multi-tenant / multi-team setups**, the new "copy provider across apps" flow ([#7225](https://github.com/farion1231/cc-switch/pull/7225)) plus the Cursor integration ([#6124](https://github.com/farion1231/cc-switch/pull/6124), 9th managed app) are worth evaluating; Cursor uses a cloudflared Quick Tunnel to expose the local proxy as a public HTTPS BYOK endpoint.
- **Monitoring:** TTFT dashboards that read from CC Switch's usage stream will look far healthier once [#7233](https://github.com/farion1231/cc-switch/pull/7233) ships — today the metric is unreliable on Responses-streaming routes.
- **Volcengine (火山方舟) users** with both Agent Plan and Coding Plan need to wait for [#7096](https://github.com/farion1231/cc-switch/pull/7096) before they can see distinct quotas per plan; today both entries report the Agent Plan number.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-10

**Project:** [QuantumNous/new-api](https://github.com/QuantumNous/new-api) (LLM gateway / relay platform)
**Tracking window:** last 24h
**Tracked version:** v1.0.0-rc.36 (no new release in window)

---

## 1. Today's Highlights

The last 24 hours were dominated by **AI‑assisted bug‑fix throughput**: at least four money/correctness‑critical defects (cache‑token accounting, realtime WebSocket double‑charge, multi‑key polling lost‑update, Gemini `countTokens` mis‑routing) were paired with reproducing issues and merged‑or‑pending PRs, the majority authored via Claude Code / Codex. On the feature side, **Google Veo 3.1 relay support with resolution‑ and duration‑aware dynamic billing** ([PR #7280](https://github.com/QuantumNous/new-api/pull/7280)) and **MiniMax H3 V2 video generation** ([PR #6591](https://github.com/QuantumNous/new-api/pull/6591)) landed in review.

## 2. Releases & Breaking Changes

- **No new release tags in the last 24h.** Tree continues at `v1.0.0-rc.36`.
- [Issue #7279](https://github.com/QuantumNous/new-api/issues/7279) requests a written **GA criteria** for the v1.0.0 line while rc.36 is already shipping — no maintainer response yet.
- No deprecations or migration notes flagged.

## 3. New Model & Hardware Support

- **Google Veo 3.1 (Vertex AI channel `41` and Gemini channel)** — full relay with dynamic billing driven by resolution × duration; RAI‑filter failures now correctly marked FAILURE upstream of billing. ([PR #7280](https://github.com/QuantumNous/new-api/pull/7280), follow‑up to [PR #6858](https://github.com/QuantumNous/new-api/pull/6858))
- **MiniMax Video Generation V2 (`MiniMax-H3`)** — `/v1/videos` submit, multimodal content validation, V2 task status polling, OpenAI Video response translation; same upstream channel auto‑selects V1 vs V2 based on the mapped model. ([PR #6591](https://github.com/QuantumNous/new-api/pull/6591))
- No new hardware backend or quantization work in window.

## 4. Performance & Optimization

- **Frontend `/api/status` request deduplication** → ~**25% faster homepage**, materially lower backend hit‑rate under concurrent users. ([PR #7189](https://github.com/QuantumNous/new-api/pull/7189) closes [#7157](https://github.com/QuantumNous/new-api/issues/7157))
- No GPU/inference‑kernel work — this project is a gateway, not an engine, so perf surface area is dominated by routing, caching and billing loops.

## 5. Stability & Regressions

Ranked by severity. **(fix PR linked)** indicates a fix is merged or in review.

| Sev | Item | Note |
|---|---|---|
| 🔴 Critical | Realtime WebSocket double‑charge (~2× billing) — ([Issue #7273](https://github.com/QuantumNous/new-api/issues/7273) / [PR #7274](https://github.com/QuantumNous/new-api/pull/7274) ✅ merged) | Per‑segment deduction and session settlement both billed; settlement now only covers uncharged delta. |
| 🔴 Critical | Multi‑key polling lost update — auto‑disabled keys silently revived via stale snapshot ([Issue #7275](https://github.com/QuantumNous/new-api/issues/7275) / [PR #7276](https://github.com/QuantumNous/new-api/pull/7276) ✅ merged) | Save path no longer overwrites concurrent per‑key state. |
| 🔴 Critical | Anthropic / DeepSeek cache tokens missing from consume log + TPM stats ([Issue #7290](https://github.com/QuantumNous/new-api/issues/7290) / [PR #7271](https://github.com/QuantumNous/new-api/pull/7271) ✅ merged, follow‑up [PR #7291](https://github.com/QuantumNous/new-api/pull/7291) in review) | Underreports cache inputs, skewing cache‑hit accounting and downstream cost analytics. |
| 🟠 High | Gemini `:countTokens` routed to `generateContent` — **24–44 s latency**, charged at generation rates, no `totalTokens` returned ([Issue #7283](https://github.com/QuantumNous/new-api/issues/7283) / [PR #7285](https://github.com/QuantumNous/new-api/pull/7285) in review) | Affects Gemini CLI sessions; dedicated handler in PR. |
| 🟠 High | VolcEngine (channel `45`) model‑list fetch 404 — wrong `/v1/models` URL ([PR #7203](https://github.com/QuantumNous/new-api/pull/7203) ✅ merged) | Operators cannot enumerate models on existing channels. |
| 🟡 Medium | **Users table quota display regressed** after commit `ea7cb0ba4` ([Issue #7267](https://github.com/QuantumNous/new-api/issues/7267)) | No fix PR yet. |
| 🟡 Medium | Time‑based billing tiers display incorrectly on pricing page ([Issue #7268](https://github.com/QuantumNous/new-api/issues/7268) / [PR #7269](https://github.com/QuantumNous/new-api/pull/7269) in review) | |
| 🟡 Medium | Model Plaza 24 h success‑rate bar spacing uneven ([Issue #7282](https://github.com/QuantumNous/new-api/issues/7282) / [PR #7284](https://github.com/QuantumNous/new-api/pull/7284) in review) | |
| 🟢 Low | "Add split" button missing in advanced custom routes ([Issue #7286](https://github.com/QuantumPlusieurs/new-api/issues/7286) / [PR #7289](https://github.com/QuantumNous/new-api/pull/7289) ✅ merged) | UI regression, self‑built main only. |
| ⚪ Invalid / duplicate | [#7278](https://github.com/QuantumNous/new-api/issues/7278), [#7281](https://github.com/QuantumNous/new-api/issues/7281), [#7288](https://github.com/QuantumNous/new-api/pull/7288), [#6858 follow‑up](https://github.com/QuantumNous/new-api/pull/6858) | Closed as invalid or superseded. |

> **Pattern worth flagging:** three of the four critical bugs were filed and patched on the same day by external contributors using Claude Code (`glm-5.3-flash`, `claude-opus-5[1m]`) against standing "find high‑star domestic projects to PR to" directives. The fixes themselves look reasonable, but **reviewers should treat rapid AI‑authored billing patches with extra scrutiny** — these touch revenue.

## 6. What This Means for Application Developers

- **Recompute analytics on Anthropic / DeepSeek usage after upgrade.** If you consume `prompt_tokens` or TPM metrics from new‑api logs, your cache reads were systematically undercounted; expect a step‑change once [#7291](https://github.com/QuantumNous/new-api/pull/7291) ships.
- **Reconcile realtime (WebSocket) billing for sessions started before [#7274](https://github.com/QuantumNous/new-api/pull/7274) merged** — they were charged ~2× and need a manual adjustment per the issue thread.
- **Multi‑key / polling channels may have hidden resurrected keys** in channel_info; audit auto‑disabled state after picking up [#7276](https://github.com/QuantumNous/new-api/pull/7276).
- **Gemini CLI users will see large latency drops** (~24–44 s → ms) once [#7285](https://github.com/QuantumNous/new-api/pull/7285) lands, and `countTokens` will no longer be billed as generation.
- **New capability surface**: Veo 3.1 ([PR #7280](https://github.com/QuantumNous/new-api/pull/7280)) and MiniMax H3 video ([PR #6591](https://github.com/QuantumNous/new-api/pull/6591)) are now addressable through a unified `/v1/videos`‑style relay — good time to prototype multimodal pipelines.
- **Reliability caveat for self‑hosters**: the v1.0.0‑rc cycle is still pre‑GA with no published GA criteria ([#7279](https://github.com/QuantumNous/new-api/issues/7279)). If you run production on `rc.x`, pin a tested commit and follow the migration notes in release notes before jumping.
- **Operational follow‑ups still open** worth tracking: Redis‑backed verification codes ([PR #5475](https://github.com/QuantumNous/new-api/pull/5475), important for multi‑instance deployments), channel endpoint‑type restriction ([#7292](https://github.com/QuantumNous/new-api/issues/7292)), global model redirect decoupled from channels ([#5270](https://github.com/QuantumNous/new-api/issues/5270)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*