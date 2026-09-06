# AI 基础设施日报 2026-09-06

> 生成时间: 2026-09-06 13:00 UTC | 覆盖项目: 9 个

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

## 横向对比

# 跨项目 AI 基础设施报告 — 2026-09-06

*覆盖范围:vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth、Claude Code Router (CCR)、CC Switch、New API*

---

## 1. 生态系统概览

今天的活动集中在两个方向：一是服务引擎层面对**新一代混合注意力模型**(GLM-5.3-Flash、DeepSeek-V4、Qwen3.5/3.8-Flash-Next、Kimi-K3)的**正确性稳定化**，二是网关层面的**协议/计费正确性**，其中 GPT-6 Astra 适配与 Responses↔Chat 转换占据主导。值得注意的是，引擎和网关中最严重的缺陷都是**静默**的——输出损坏、虚假的预算耗尽、丢失工具调用——而非崩溃，这是一个技术栈扩张速度快于测试覆盖的典型标志。硬件多样化持续推进(Ascend A5、T-Head PPU、DGX Spark/GB10、Strix Halo、Blackwell NVFP4),而 llama.cpp 依然是将全新架构端到端交付速度最快的项目。Agent 工作负载如今已成为隐性的基准客户：失控的工具调用循环、泄漏的 `</think>` token,以及 `tool_call_id` 转换失败，在九个项目中的四个里都有出现。

---

## 2. 活跃度对比

*计数 = 今日摘要中引用的去重 issue/PR 数量(是关注度的代理指标，并非仓库总活动量)。*

| 项目 | 引用的 Issue | 引用的 PR | 发布状态 | 主题焦点 |
|---|---|---|---|---|
| **llama.cpp** | ~10 | ~20 | ✅ **3 次发布** (b10821–23) | 投机解码正确性、CPU 性能、FP8 |
| **vLLM** | ~13 | ~18 | ❌ 无(MRV2 默认化待定) | 混合 GDN/Mamba 损坏问题群 |
| **SGLang** | ~16 | ~16 | ❌ 无(CP v1 弃用进度 3/5) | GLM-5.3-Flash 缺陷、KV 分片、NPU |
| **CC Switch** | ~15 | ~17 | ❌ 无(v3.20.1 回归未关闭) | Codex/Copilot 路由、tool_call_id |
| **Unsloth** | ~2 个新增(100+ 陈旧) | ~18(20+ 活跃) | ❌ 无 | Studio 加固、AMD iGPU |
| **LiteLLM** | ~16 | ~11 | ✅ **2 次发布** (v1.100.0 + rc) | 预算缺陷、成本/prompt 缓存修复 |
| **Ollama** | ~15 | ~8 | ✅ **1 个 rc** (v0.34.0-rc1) | 上下文核算、ChatGPT Desktop |
| **New API** | ~10 | ~8 | ❌ 无(rc.33 已上线) | GPT-6 Astra 中继、Responses 重放 |
| **CCR** | 2 | 2 | ❌ 无 | 网关生命周期、SSE 回退 |

**要点：** llama.cpp 和 LiteLLM 是仅有的两个保持稳定发布节奏的项目；两大重型引擎(vLLM、SGLang)正处于高强度的修复稳定化冲刺中，没有发布版本——这表明当前一代模型正在让引擎内部机制承压。

---

## 3. 模型支持竞赛

| 模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | 网关 |
|---|---|---|---|---|---|
| **GLM-5.3-Flash**(稀疏 MLA) | SM90/SM120/GB10 修复进行中 | 缺陷追踪器含 9 个未关闭子 issue;HiCache 损坏 | — | `glm-5.3:cloud` 问题 | — |
| **DeepSeek-V4 系列** | MXFP4×FP8 融合 MoE(SM90);Ampere SM8x 仍被阻塞(#50576,105 条评论) | DSA top-k 崩溃(长上下文)、FP8→FP4 OOM | — | `:cloud` `</think>` 泄漏 | — |
| **Qwen3.5/3.8 混合架构** | 损坏 + 贪心采样非确定性问题 | NVFP4 已验证配方(DGX Spark) | ~130k 上下文处静默 EOS | MLX 中 YaRN 静态上下文 | — |
| **Kimi-K3**(循环架构) | — | Draft KV 池预算缺陷 | ✅ 状态回滚 → 投机解码已启用 | `:cloud` 延迟/错误 | — |
| **Spark2.5** | — | — | ✅ **完整端到端支持**(已具备合并条件) | ❌ 需求 issue 仍开放(#18195) | — |
| **GPT-6 Astra** | — | — | — | — | ✅ CC Switch OAuth 修复;New API 能力中继 |
| **MiniMax-M3** | — | ❌ W4A16 = 全 NUL 输出 | — | `:cloud` JSON 拆分 | — |

**结论：** **llama.cpp 在广度和速度上领先**(Spark2.5、Kimi-K3 投机解码、原生 FP8——从官宣到可合并仅数天)。**vLLM 和 SGLang 在前沿模型服务深度上并列领先**，但对 GLM-5.3-Flash/DeepSeek-V4 处于*稳定化*模式而非首发模式——并且 vLLM 在 NVIDIA 量化 MoE 上保持领先(FlashInfer MXFP4×FP8)。**SGLang 在非 NVIDIA 芯片上领先**(Ascend A5 已落地；T-Head PPU 路线图已公布)。网关层的“模型支持竞赛”则纯粹是针对新旗舰语义(GPT-6 Astra)的协议适配。

---

## 4. 性能前沿

**KV 缓存与内存层级(最繁忙的战线)：**
- SGLang 开启了其 4 个 PR 的 **KV 缓存分片**系列(逻辑页放置已落地)，并通过迭代式前缀哈希削减了基数树开销。
- vLLM 推进了 **KV 卸载正确性**(细粒度混合前缀命中、DCP 分片几何结构)，并发布了 **MoE 专家卸载** RFC(CPU 锁页权重 + LFRU GPU 缓存)。
- llama.cpp 正在实现**从 SSD 流式加载 MoE 专家**，配合设备侧槽位缓存——支持超出内存容量的 MoE。
- Ollama/Unsloth 修复了本地层缓存顽疾：一项隐蔽的**每 runner 8 GiB** prompt 缓存内存开销(Ollama #18265),以及一次禁用 prompt 缓存导致某位 Strix Halo 用户**48.8 小时中约 44 小时**付诸东流的问题(Unsloth #10382)。

**内核：** llama.cpp 宣称通过面向 k-quants 的分块 VNNI 实现 **3–7× CPU matmul** 提升(#27851),外加 Metal FA-vec 的 M2 Max 调优；vLLM 落地了 FlashInfer 的 **MXFP4×FP8 "humming" MoE 内核**(SM90),以及用于可复现 rollout 的批次不变 FP32 matmul;SGLang 融合了 Nemotron 的潜空间 MoE 投影与共享专家加法。

**量化：** 前沿阵地已明确转向 **4-bit 浮点**——NVFP4(SGLang Blackwell 的 TRTLLM/CuTe DSL 后端，已验证配方)、MXFP4×FP8(vLLM)、原生 FP8(llama.cpp)、自动逐张量混配量化以达到目标 bpw(llama.cpp #15550 进行中)。正确性缺口依然存在(MiniMax 全 NUL 输出、NVFP4 NaN 防护)。

**分布式服务：** SGLang 的 **PP16 准入停顿(~7.8s)**和 vLLM 的 **NIXL 解码 pod 在 prefill 重启时的段错误**表明，P/D 分离正从功能特性演变为生产高可用问题。vLLM 的 MRV2 默认化切换与 elastic-EP 清理是当前进行中的大型调度重构。

**网关开销：** New API 改为批量复制 `RawMessage`,以削减 Responses 路径上的深拷贝；LiteLLM 修复了静默失效的 prompt 缓存(缓存 token 数为零)，并恢复了结构化的流式工具分块——这提醒我们，网关的“性能”缺陷通常是静默的成本/延迟回退。

---

## 5. 层级定位

| 层级 | 项目 | 今日核心关注点 |
|---|---|---|
| **数据中心服务引擎** | vLLM、SGLang | 混合/稀疏注意力 + 投机解码在大规模下的数值正确性；分离式 P/D 高可用；多厂商加速器 |
| **本地/边缘运行时** | llama.cpp(内核基础)、Ollama(分发/用户体验)、Unsloth Studio(本地服务外壳) | 内存层级管理(RAM/SSD/统一内存)、客户端互操作、单机多租户(Ollama 指标、Unsloth 按账户隔离) |
| **网关/计费** | LiteLLM(企业代理)、New API(中继+计费) | 成本核算正确性、Responses-API 转换保真度、供应链签名(cosign) |
| **客户端 Agent 路由器** | CC Switch、Claude Code Router | Claude Code/Codex 客户端与异构上游间的协议转换；会话状态污染；流内错误回退 |
| **微调** | Unsloth(核心) | 平静的一天——所有活动都在 Studio 的*服务*层，印证了 Unsloth 也在向本地推理产品漂移 |

各层级正从两个方向相互靠拢：引擎在加入 OpenAI-API 严格性和网关功能(vLLM 的一致性修复)，而网关在积累面向特定模型的能力逻辑(New API 的逐模型 GPT-6 描述符)——边界正在变得模糊。

---

## 6. 趋势信号

1. **静默损坏是头号严重性问题类别，且无处不在。** vLLM 的 hybrid+MTP+prefix-cache 损坏(#53912)、SGLang HiCache 损坏(#38031)、MiniMax 全 NUL 输出、llama.cpp 在 130k 处的瞬时 EOS。共同点：**混合/循环注意力 + 缓存 + 投机解码**。关注：在生产环境信任这些模型之前，先盯住 vLLM #52244 和 SGLang #38217 的合并进展。
2. **投机解码正在接受全生态审计**——正确性(llama.cpp #25618 现已配备专门的回归测试套件)、状态累积(SGLang MTP 接受率随运行时间衰减至 ~0),以及 rollout 确定性(vLLM 批次不变 matmul)。请把投机解码当作*每个版本都需重新验证的特性*，而非一劳永逸的加速手段。
3. **4-bit 浮点量化(NVFP4/MXFP4)是 2026 年的主战场**，以 Blackwell 为前提——但今天的缺陷报告(全 NUL 输出、转换期间 OOM、NaN 缩放反转)表明，在已验证配方之外，它尚不具备部署安全性。
4. **内存层级正在被重新架构**：KV 分片(SGLang)、专家卸载(vLLM RFC、llama.cpp SSD 流式加载)、GB10 上的统一内存驻留规划(SGLang 的 diffusion 栈)。RAM/SSD 正在成为一等公民级的服务层。
5. **Agent 工作负载是新的基准客户**——而代价最高的故障模式也正出自它们：Ollama 泄漏的 `</think>` **一次循环就烧掉 ~31M token**;CC Switch 的 `tool_call_id` 回归会破坏*每一次*工具调用轮次。构建 Agent 循环时，应针对反复出现的 400 错误实现新会话恢复，并对推理模型输出做防御性解析。
6. **计费/成本遥测不可盲目信任**:LiteLLM 虚假预算耗尽(今日新增，尚无修复)、缓存读取双重计费、未知模型按 $0 成本计费。请在本周对照供应商账单审计支出日志。
7. **互操作优先于竞争**:ChatGPT Desktop 中的 Ollama 模型、Unsloth 将专有 SSE 帧移至 opt-in 请求头之后、Copilot 作为 Codex 提供方(CC Switch)。严格遵守 OpenAI 线格式正成为基本门槛——受优先适配的正是那些严格的 SDK 客户端。

**接下来关注：** vLLM 的 MRV2 默认化发布(破坏性变更窗口)、SGLang CP v1 移除的第 4–5 步、llama.cpp VNNI matmul + FP8 合并，以及 GLM-5.3-Flash 追踪器(#37524,9 个子 issue)能否收尾——这是混合稀疏模型能否在本季度达到生产级的风向标。

---

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-06

## 1. Today's Highlights

No releases shipped in the last 24h, but activity is dominated by a correctness cluster around **hybrid GDN/Mamba models + MTP speculative decoding + prefix caching** — including a confirmed silent output corruption bug ([#53912](https://github.com/vllm-project/vllm/issues/53912)) with fix PR [#52244](https://github.com/vllm-project/vllm/pull/52244) still in review. On the performance front, NVIDIA landed an opt-in **FlashInfer MXFP4×FP8 fused MoE backend for SM90** ([#54032](https://github.com/vllm-project/vllm/pull/54032)), and a burst of fixes targets **GLM-5.3-Flash sparse MLA** on SM90/SM120 and **GB10/DGX Spark** integrated GPUs. Tool-calling parsers (Gemma4, Qwen2.5) and OpenAI-API conformance also saw significant patch traffic.

## 2. Releases & Breaking Changes

None in the last 24 hours. Note for planning: [#53934](https://github.com/vllm-project/vllm/pull/53934) references [#53183](https://github.com/vllm-project/vllm/pull/53183) making **Model Runner V2 the default**, which is driving a wave of MRV2-gap fixes (e.g., CUDA graph metrics [#52750](https://github.com/vllm-project/vllm/pull/52750)).

## 3. New Model & Hardware Support

- **FlashInfer SM90 MXFP4×FP8 fused MoE backend** — new `--moe-backend flashinfer_cutlass_humming` routes DeepSeek-V4-family MXFP4 expert weights through FlashInfer's CUTLASS "humming" kernel with kernel-internal FP8 activation quantization; strictly opt-in. ([#54032](https://github.com/vllm-project/vllm/pull/54032))
- **GLM-5.3-Flash fixes**: fp8 KV-cache dtype now starts on SM90 sparse MLA, plus right-sized indexer prefill workspace ([#55222](https://github.com/vllm-project/vllm/pull/55222)); stock `index_topk=2048/kpool=4` config now serves on SM120 without the `index_topk=2044` hand-edit previously required by DGX Spark recipes ([#55563](https://github.com/vllm-project/vllm/pull/55563)).
- **GB10/DGX Spark (integrated GPUs)**: lower default sparse-MLA indexer logits budget to prevent prefill OOM killing the engine ([#55572](https://github.com/vllm-project/vllm/pull/55572)). Relatedly, FlashInfer+MTP crashes on SM121 with GQA=16 models remain open ([#37754](https://github.com/vllm-project/vllm/issues/37754)).
- **Ampere SM8x for DeepSeek-V4-Flash** remains unsupported; the tracking issue is the most active thread in the repo (105 comments, 14 👍) ([#50576](https://github.com/vllm-project/vllm/issues/50576)).
- **AMD MXFP8 GEMM/grouped-GEMM kernels** still an open feature request, no PR yet ([#34012](https://github.com/vllm-project/vllm/issues/34012)).

## 4. Performance & Optimization

- **MiMo ViT perf**: replace `torch.argsort` with direct inverse-permutation construction (`inverse[perm] = arange(n)`) for window index inversion — no API/layout change ([#55566](https://github.com/vllm-project/vllm/pull/55566)).
- **Elastic EP on MRV2**: removes the unsupported-feature entry so `--enable-elastic-ep` no longer silently falls back to Model Runner V1 ahead of the MRV2 default switch ([#53934](https://github.com/vllm-project/vllm/pull/53934)).
- **MoE expert offloading RFC** (CPU-pinned weights + LFRU GPU expert cache + async pipeline) continues development; PR 1 of the series is open ([#38256](https://github.com/vllm-project/vllm/issues/38256)).
- **KV offload correctness-as-perf**: SimpleCPU connector learns to load fine-grained hybrid prefix hits ([#54736](https://github.com/vllm-project/vllm/pull/54736)) and fixes block-size geometry for DCP sharding — only full-attention specs are sharded, Mamba/sliding-window stay at `dcp_world_size=1` ([#54735](https://github.com/vllm-project/vllm/pull/54735)); merged fix stops offloading the final sampled token's (nonexistent) KV slot ([#54288](https://github.com/vllm-project/vllm/pull/54288), CLOSED).
- **Batch-invariant matmul**: kernels now honor the explicitly requested IEEE FP32 instead of Triton's TF32 default — matters for reproducible serving/RL rollouts ([#55466](https://github.com/vllm-project/vllm/pull/55466)).
- **NVFP4 NaN guard**: clamps near-zero/denormal activation scales from dead MoE experts before inversion to `Inf` ([#42601](https://github.com/vllm-project/vllm/pull/42601)).

## 5. Stability & Regressions (ranked by severity)

1. **Silent output corruption — hybrid GDN/Mamba + prefix caching + MTP** on v0.28.0; prior fix (#43559) closed but unfixed. Reproducible on Qwen3.5-122B-A10B where prompts aligned to the hash-unit boundary get zero cache hits. **Fix PR open**: [#52244](https://github.com/vllm-project/vllm/pull/52244). ([#53912](https://github.com/vllm-project/vllm/issues/53912))
2. **Silent GDN state loss** — a prefill misclassified as uniform-decode dispatches into the spec-decode FULL cudagraph, producing garbage output on hybrid/Qwen3-Next models ([#53051](https://github.com/vllm-project/vllm/issues/53051)).
3. **Greedy non-determinism on Qwen3.8-Flash-Next-FP8**: byte-identical `temperature=0` requests diverge once context exceeds `indexer_budget` (dense→sparse attention handoff in `persistent_topk`); undermines eval/replay assumptions ([#54521](https://github.com/vllm-project/vllm/issues/54521), 32 comments).
4. **Illegal memory access on hybrid Mamba align precopy** when prefix-cache resume is combined with explicit `--block-size` (state column seeded with wrong block size) ([#53142](https://github.com/vllm-project/vllm/issues/53142)).
5. **Decode-pod segfault on NIXL `loadRemoteMD`** after prefill pod restart in P/D disaggregation — HA-relevant for production disagg clusters ([#49238](https://github.com/vllm-project/vllm/issues/49238)).
6. **`strict` flag leakage**: OpenAI `tools[].function.strict` is rendered into the model-visible chat template, changing tool-call behavior ([#52741](https://github.com/vllm-project/vllm/issues/52741)).
7. **Tool-parser failures**: Qwen2.5 parser + OpenAI content format fails chat requests outright ([#54491](https://github.com/vllm-project/vllm/issues/54491)); Gemma4 parser silently drops bare `<|tool_call>:name{...}` openers on both streaming and non-streaming — **fix PR open** [#54257](https://github.com/vllm-project/vllm/pull/54257) ([#53431](https://github.com/vllm-project/vllm/issues/53431)).
8. **Startup hard-fail** when Mamba cache blocks < `max_num_seqs` on hybrid models + LoRA; auto-clamp requested ([#49064](https://github.com/vllm-project/vllm/issues/49064)); T4/SM7.5 indefinite hangs on Qwen3.5-27B persist ([#36589](https://github.com/vllm-project/vllm/issues/36589)).
9. Hygiene: assert-as-control-flow in KV-cache/entrypoints converted to real raises — asserts vanish under `python -O`, previously causing silently wrong results ([#55187](https://github.com/vllm-project/vllm/pull/55187)).

## 6. What This Means for Application Developers

- **If you serve hybrid-attention models (Qwen3.5/3.6/3.8, Qwen3-Next) with MTP + prefix caching, treat outputs as untrusted** until [#52244](https://github.com/vllm-project/vllm/pull/52244) merges — errors are silent, not crashes. Practical mitigation: disable prefix caching or spec decoding for these models in the interim.
- **Don't rely on greedy determinism for sparse-attention models** at long context ([#54521](https://github.com/vllm-project/vllm/issues/54521)) — pin versions and keep golden-output tests context-length-aware when the prompt nears the indexer budget.
- **Tool-calling users on Gemma4**: upgrade when [#54257](https://github.com/vllm-project/vllm/pull/54257) lands; meanwhile missing tool calls with empty content are a parser artifact, not model refusal. Qwen2.5 + OpenAI content-format users should check [#54491](https://github.com/vllm-project/vllm/issues/54491) before upgrading.
- **Reasoning models + agents**: mid-reasoning `<|im_end|>` currently yields HTTP 200 with empty `content` and orphaned `reasoning_content`; the new `reasoning_eos_policy` option ([#55562](https://github.com/vllm-project/vllm/pull/55562)) will let you close think blocks cleanly — relevant for any agent loop that assumes non-empty completions on `finish_reason: "stop"`.
- **OpenAI-API compatibility is tightening**: null fields are being dropped from streaming tool-call deltas ([#55298](https://github.com/vllm-project/vllm/pull/55298)) and forced `--chat-template-content-format openai` will fall back gracefully instead of crashing every request ([#55567](https://github.com/vllm-project/vllm/pull/55567)) — good news for strict client SDKs and gateways.
- **Disaggregated (P/D) operators**: prefill-pod restarts can segfault decode pods via NIXL ([#49238](https://github.com/vllm-project/vllm/issues/49238)) — factor into orchestration/restart policies.
- **DGX Spark / GB10 adopters**: three separate fixes in flight this week ([#55572](https://github.com/vllm-project/vllm/pull/55572), [#55563](https://github.com/vllm-project/vllm/pull/55563), [#55222](https://github.com/vllm-project/vllm/pull/55222)) — pin to whichever release bundles them before deploying GLM-5.3-Flash or long-context sparse-MLA workloads on integrated GPUs.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-06

## 1. Today's Highlights

No releases shipped today; activity centers on three fronts: the KV-cache sharding project opened its first of four PRs ([#37614](https://github.com/sgl-project/sglang/pull/37614)), NVFP4 MoE dispatch was extended to the standard FlashInfer TRTLLM and CuTe DSL backends for Blackwell ([#38216](https://github.com/sgl-project/sglang/pull/38216)), and the GLM-5.3-Flash integration remains the dominant source of open correctness bugs — including a silent generation-corruption issue in the HiCache host tier ([#38031](https://github.com/sgl-project/sglang/issues/38031)) with a candidate fix opened the same day ([#38217](https://github.com/sgl-project/sglang/pull/38217)). A four-PR stack reworking diffusion-model weight residency on DGX Spark unified memory also advanced.

## 2. Releases & Breaking Changes

No releases in the last 24h.

- **In-flight deprecation:** [CP V1 Deprecation 3/5 — remove generic prefill CP v1 runtime](https://github.com/sgl-project/sglang/pull/36228) deletes the generic prefill CP v1 branches and the DSA v1 in-seq-split indexer/backend path. If you rely on CP v1 flags or the single-request scheduling behavior, migration planning should start now — this is step 3 of 5 in an ongoing removal series.

## 3. New Model & Hardware Support

- **Ascend NPU:** [Atlas A5 support + DeepSeek-V4 processing enhancements](https://github.com/sgl-project/sglang/pull/37373) — spans quant, HiCache, JIT kernels, and memory-pool changes; the largest open hardware PR this week. Related NPU CI repair work in [#38112](https://github.com/sgl-project/sglang/pull/38112).
- **T-Head PPU:** [roadmap for first-class ZW810/ZW810E/ZW-M890P support](https://github.com/sgl-project/sglang/issues/37519) published and under discussion.
- **Blackwell quantization:** [NVFP4 dispatch with standard FlashInfer TRTLLM and CuTe DSL backends](https://github.com/sgl-project/sglang/pull/38216), plus [explicit validation of the online NVFP4 W4A16 CuTe DSL configuration](https://github.com/sgl-project/sglang/pull/38215) (`--quantization nvfp4_online --moe-runner-backend flashinfer_cutedsl`).
- **Apple Silicon:** the [MLX serving redesign RFC](https://github.com/sgl-project/sglang/issues/32321) (Torch-owned SRT path with an exported whole-model MLX region) continues iterating; implementation PR is #36164. Original roadmap thread: [#19137](https://github.com/sgl-project/sglang/issues/19137).
- **Verified recipes:** [NVFP4 cookbook recipes for Qwen3.8-Flash-Next on 1x/2x DGX Spark and RTX PRO 6000](https://github.com/sgl-project/sglang/pull/37995), hardware-verified from the Deploy panel command.

## 4. Performance & Optimization

- **KV-cache sharding begins:** [kv-shard 1/4 — logical-page placement](https://github.com/sgl-project/sglang/pull/37614) lands the index space and allocator only; no runtime flag selects it yet, so zero user-facing risk in this slice.
- **Radix cache:** [iterative prefix hash collection](https://github.com/sgl-project/sglang/pull/38204) replaces recursive parent-walk list appends across unified, legacy, and mamba radix nodes — removes per-node overhead on long shared prefixes.
- **Nemotron:** [fuse latent MoE projection + shared-expert add](https://github.com/sgl-project/sglang/pull/30430) eliminates a separate BF16 add per latent MoE layer (2048→8192 width projection).
- **GPT-OSS:** [fix for duplicate MoE reduction under DP attention](https://github.com/sgl-project/sglang/pull/37199) — wasteful redundant all-reduce work.
- **Diffusion on unified memory (GB10):** a four-PR stack — [one-pool residency planner](https://github.com/sgl-project/sglang/pull/37811), [file-backed fused weight copies](https://github.com/sgl-project/sglang/pull/37819), [read-only checkpoint mappings](https://github.com/sgl-project/sglang/pull/37822), and [O_DIRECT streaming with populator](https://github.com/sgl-project/sglang/pull/37680) — targets keeping the DiT resident while streaming text encoder/VAE from page cache on the 121.7 GiB shared LPDDR5X pool.
- **Reported (not yet fixed):** [~7.8s bootstrap admission stalls under PP16 concurrent prefill](https://github.com/sgl-project/sglang/issues/38206) in disaggregated-PD deployments — admission consensus is coupled to the PP scheduler loop.

## 5. Stability & Regressions

Ranked by severity (silent corruption > crashes > degradation):

1. **Silent corruption — GLM-5.3-Flash HiCache:** [host-tier load-back corrupts generation](https://github.com/sgl-project/sglang/issues/38031) even without speculative decoding — dropped tool calls, degenerate repetition loops on 8×H100/TP8. Candidate fix: [#38217 (wait for HiCache load-back before hybrid MLA KV reads)](https://github.com/sgl-project/sglang/pull/38217).
2. **Silent corruption — MiniMax-M3 W4A16:** [every token is id 0 (all-NUL output)](https://github.com/sgl-project/sglang/issues/38143) on 2x DGX Spark (sm_121, TP=2) via the Triton MiniMaxSparse path; same weights produce correct output on vLLM. No fix yet.
3. **Crash — DeepSeek-V4 long-context:** [illegal memory access in the DSA indexer top-k kernel (`topk_v1.cuh:348`)](https://github.com/sgl-project/sglang/issues/37892); the paged prefill path can never reach the v2 kernel. No fix yet.
4. **Crash — DeepSeek-V4-Flash-Vision-Exp:** [scheduler OOM-killed during FP8→FP4 MoE conversion](https://github.com/sgl-project/sglang/issues/37931) on 2x DGX Spark (5/5 launches).
5. **Degradation — MTP draft acceptance decays to ~0](https://github.com/sgl-project/sglang/issues/37326) over server uptime on Qwen3.8-Flash-Next; fully restored by restart. Points to state accumulation in the draft path.
6. **OOM — DFLASH/DSPARK draft KV pool budget uses `tp_size` instead of `attn_tp_size`](https://github.com/sgl-project/sglang/issues/38202) under DP attention (Kimi-K3). New today; looks like a small targeted fix.
7. **GLM-5.3-Flash cluster:** [PP startup crash (`KeyError: 'residual'`)](https://github.com/sgl-project/sglang/issues/36906), [DPC crashes](https://github.com/sgl-project/sglang/issues/38207) (new, thin report), and [SM120 DSA backend blockers](https://github.com/sgl-project/sglang/issues/37105). Aggregate tracker: [#37524](https://github.com/sgl-project/sglang/issues/37524) — 9 sub-issues still open.
8. **Observability:** [OTel tracing drops prefill/decode spans](https://github.com/sgl-project/sglang/issues/38210) when `--tokenizer-worker-num`/`--detokenizer-worker-num` are set.
9. **CI health:** [tracking issue](https://github.com/sgl-project/sglang/issues/17050) reports 5 broken / 13 flaky tests on `main` as of 12:39 UTC.

Note: the wave of closed "[inactive]" issues today is automated staleness housekeeping, not fixes.

## 6. What This Means for Application Developers

- **Treat GLM-5.3-Flash as not yet production-grade.** The open bug list includes silent output corruption, not just crashes. If you're serving it, add golden-output validation (especially tool-call responses) and subscribe to the [bug tracker](https://github.com/sgl-project/sglang/issues/37524). Consider disabling the HiCache host tier until [#38217](https://github.com/sgl-project/sglang/pull/38217) merges.
- **Quantized MiniMax-M3 on DGX Spark is currently unusable** — output is all NUL tokens with no error, which is the worst failure mode for agents. Cross-validate against vLLM or another backend before trusting any W4A16/sparse-attention deployment on sm_121.
- **Monitor MTP/NEXTN acceptance rate as an uptime metric.** [#37326](https://github.com/sgl-project/sglang/issues/37326) shows it can silently decay to ~0, tanking throughput while the server stays "healthy." Scheduled restarts are the current workaround.
- **DeepSeek-V4 long-context workloads should cap or avoid the affected prefill path** until the top-k kernel fix lands; large-context jobs will hard-crash, not degrade.
- **Tracing users:** avoid `--tokenizer-worker-num`/`--detokenizer-worker-num` if your SLOs depend on OTel prefill/decode spans.
- **No release cadence change:** everything above is main-branch only. Pin your version, and if you depend on CP v1 prefill paths, watch the [deprecation series](https://github.com/sgl-project/sglang/pull/36228) closely.

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-06

## 1. Today's Highlights

Three releases shipped today (b10821–b10823), headlined by structured JSONL logging, a simplified fully-embedded WebUI build, and Metal FlashAttention vector tunings for M2 Max. The dominant engineering thread is **speculative-decoding correctness on quantized targets** (#25618): a Vulkan numerical-consistency fix (#28489) and a dedicated regression test suite (#28488) both landed today. On the performance front, a tiled CPU matmul PR claims **3–7x speedups for k-quant inference** via VNNI (#27851), and native FP8 support with CPU conversions is in review (#28485).

## 2. Releases & Breaking Changes

- **b10823** — `common: add --log-jsonl` ([#28437](https://github.com/ggml-org/llama.cpp/pull/28437)): new `--log-jsonl` flag for machine-parseable logs. Note the rename of log level `unknown` → `none` — **update any log-parsing pipelines** accordingly. ([release](https://github.com/ggml-org/llama.cpp/releases/tag/b10823))
- **b10822** — `ui: embed assets directly with CMake` ([#28445](https://github.com/ggml-org/llama.cpp/pull/28445)): removes the build-time C++ helper and external gzip dependency, simplifying cross-compilation. Build/packaging configs referencing the old codegen step may need updates.
- **b10821** — `metal: add remaining fa-vec tunings for M2 Max` ([#28458](https://github.com/ggml-org/llama.cpp/pull/28458)): Metal kernel tuning only; no interface changes.

## 3. New Model & Hardware Support

- **Spark2_5ForCausalLM** — full end-to-end support (GGUF conversion, architecture registration, tokenizer, inference graph), tagged merge-ready ([#27868](https://github.com/ggml-org/llama.cpp/pull/27868)).
- **FP8 types in ggml** — adds FP8 weight loading with CPU-side conversion to FP16/BF16/FP32; enables direct loading of FP8-native checkpoints and native FP8 compute on supporting hardware ([#28485](https://github.com/ggml-org/llama.cpp/pull/28485)).
- **INT8 ConvRot** — native CPU execution of tensorwise INT8 ConvRot layers without weight conversion, targeting ComfyUI `int8_tensorwise` checkpoints ([#28480](https://github.com/ggml-org/llama.cpp/pull/28480)); Vulkan follow-up already open ([#28482](https://github.com/ggml-org/llama.cpp/pull/28482)).
- **IQ2_NL / IQ3_NL quantization** — new non-256-multiple block types eliminating forced fallback quantization for odd row lengths; staged across CPU → Metal → CUDA → Vulkan ([#27322](https://github.com/ggml-org/llama.cpp/pull/27322), [#27983](https://github.com/ggml-org/llama.cpp/pull/27983)).
- **Kimi-K3 recurrent-state rollback** — enables bounded state rollback so Kimi-K3 works with speculative decoding ([#28466](https://github.com/ggml-org/llama.cpp/pull/28466)).

## 4. Performance & Optimization

- **CPU matmul: 3–7x claimed speedup** — tiled 256×256 VNNI matmul for k-quants avoids redundant dequantization; "minimal complexity" per author, still in review ([#27851](https://github.com/ggml-org/llama.cpp/pull/27851)).
- **Metal: M2 Max FA-vec tunings** landed in b10821 ([#28458](https://github.com/ggml-org/llama.cpp/pull/28458)).
- **MoE expert streaming from disk** — optional SSD streaming of routed experts with device-side slot cache, enabling larger-than-RAM MoE models ([#25294](https://github.com/ggml-org/llama.cpp/pull/25294)).
- **Spec-decode VRAM fix** — single-device drafters with `-sm tensor` no longer allocate a wasted Meta backend context ([#28390](https://github.com/ggml-org/llama.cpp/pull/28390)).
- **RDNA4 FA regression closed** — the up-to-2x prompt-processing regression after rocWMMA removal (#26220) is now resolved ([#26220](https://github.com/ggml-org/llama.cpp/issues/26220)).
- **Kronecker-product FWHT** restored for SYCL after CI breakage ([#28254](https://github.com/ggml-org/llama.cpp/pull/28254)), with a CPU implementation for non-power-of-two dims following ([#28490](https://github.com/ggml-org/llama.cpp/pull/28490)).
- In progress: automatic per-tensor quant mix to hit a target file size / bpw at lowest error ([#15550](https://github.com/ggml-org/llama.cpp/pull/15550)).

## 5. Stability & Regressions (ranked by severity)

1. **Blackwell SOFT_MAX crash** — GGML-CUDA SOFT_MAX crash on RTX 5090 (SM 12.0) with large models; open, no merged fix ([#25060](https://github.com/ggml-org/llama.cpp/issues/25060)).
2. **CUDA graphs GPU hang (Xid 8)** on RTX 5090 Laptop / sm_120; `GGML_CUDA_DISABLE_GRAPHS=1` is a complete workaround, root cause still open ([#27330](https://github.com/ggml-org/llama.cpp/issues/27330)).
3. **Spec-decoding greedy divergence on quantized targets** (#25618, 21 comments) — draft-model speculation flips outputs at near-ties vs. vanilla decode. Two fix vectors today: uniform F32 DMMV in Vulkan ([#28489](https://github.com/ggml-org/llama.cpp/pull/28489)) and a reproduction test suite for 8 sub-issues ([#28488](https://github.com/ggml-org/llama.cpp/pull/28488)).
4. **Tool-call grammar breakage** — `json-schema-to-grammar` emits invalid GBNF for empty-object schemas and large `maxLength`, rejecting otherwise-valid requests ([#25923](https://github.com/ggml-org/llama.cpp/issues/25923)); related PEG rule-name collisions now fail loudly instead of silently corrupting grammars ([#28483](https://github.com/ggml-org/llama.cpp/pull/28483), fixes #28429).
5. **Silent instant-EOS at ~130k context** on Qwen3.5-hybrid / Qwen3.8-27B across CUDA and CPU, suspected DeltaNet recurrent-state depth degradation ([#27756](https://github.com/ggml-org/llama.cpp/issues/27756)).
6. **`common_peg_until_parser` semantics bug** — missing delimiter returns SUCCESS instead of FAIL on non-lenient parses ([#27772](https://github.com/ggml-org/llama.cpp/issues/27772)).
7. **SYCL multi-GPU P2P crash** on Intel Arc — `dev2dev_memcpy` fails with unimplemented experimental P2P on OpenCL adapter ([#27168](https://github.com/ggml-org/llama.cpp/issues/27168)).
8. **MSVC misses AVX-VNNI detection**, leaving CPU perf on the table on Windows builds ([#28295](https://github.com/ggml-org/llama.cpp/issues/28295)).
9. Fixed today: CUDA race conditions in `mmid`/`mmf` kernels surfaced by `racecheck` ([#28475](https://github.com/ggml-org/llama.cpp/pull/28475), closed/merged).

## 6. What This Means for Application Developers

- **Don't trust speculative decoding for exact-match output on quantized targets** (#25618). If your app does deterministic evaluation, constrained generation, or diff-based caching, pin vanilla decode (or bf16 targets) until the fix series lands; Vulkan users get relief first via #28489.
- **Adopt `--log-jsonl`** for observability pipelines (b10823), but audit for the `unknown`→`none` rename before upgrading log ingest.
- **Harden your tool schemas**: avoid empty-object schemas and `maxLength ≥ 2000` in tool definitions until #25923 is fixed, and pre-validate that parameters don't collide after sanitization (#28483). These failures reject the whole request, not just one tool.
- **Blackwell (RTX 50xx) production deployments remain risky** — a hard crash (#25060) and a GPU-hang regression (#27330) are both open; keep `GGML_CUDA_DISABLE_GRAPHS=1` in your deployment config as insurance.
- **CPU-bound and memory-bound serving has meaningful headroom coming**: the VNNI tiled matmul (#27851), FP8 loading (#28485), and MoE disk-streaming (#25294) collectively point toward cheaper edge/on-prem inference — worth benchmarking against your current pin once merged.

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-06

## 1. Today's Highlights

Ollama shipped **v0.34.0-rc1**, headlined by the ability to run local Ollama models directly inside ChatGPT Desktop on macOS, alongside structured-output performance improvements on Apple Silicon. The day's activity is dominated by a coherent "context accounting" workstream on the MLX runner and `ollama launch`, with paired issues and PRs fixing context-length enforcement, Qwen YaRN extension, and context advertisement to coding CLIs (Codex, Qwen Code). A second cluster of reports targets Ollama Cloud reliability with reasoning models — leaked `</think>` tokens causing runaway agent loops and split JSON output.

## 2. Releases & Breaking Changes

- **v0.34.0-rc1** ([release](https://github.com/ollama/ollama/releases/tag/v0.34.0-rc1))
  - Ollama models can now be used directly in **ChatGPT Desktop** (setup via the Ollama app on macOS) — a notable strategic shift toward interop with OpenAI's client rather than competing UX.
  - Improves **structured output performance on Apple Silicon**.
  - No breaking API changes indicated; RC status — hold off on production rollout until stable.

## 3. New Model & Hardware Support

- **`spark2_5` architecture request** ([#18195](https://github.com/ollama/ollama/issues/18195)) — Spark-X2.5-4B/1.7B GGUFs download but fail to start inference; no runtime support yet.
- **glm-ocr EOT fix in progress** ([PR #17195](https://github.com/ollama/ollama/pull/17195)) — registers `<|user|>` as an end-of-generation token for legacy `glmocr` GGUFs, which currently produce runaway repeated output under llama-server.
- **Qwen static YaRN contexts in MLX** ([PR #18263](https://github.com/ollama/ollama/pull/18263)) — parses YaRN metadata for Qwen3.5/3.8, applies frequency/scaling to text RoPE and M-RoPE, enabling contexts up to `factor × original_max_position_embeddings` on Apple Silicon.
- **Vulkan/AMD regression reported** ([#18272](https://github.com/ollama/ollama/issues/18272)) — see Stability section; a reminder that AMD iGPU support remains fragile.

## 4. Performance & Optimization

- **Structured output on Apple Silicon** — faster JSON-schema-constrained generation ships in v0.34.0-rc1 (no benchmarks published yet).
- **Prompt cache bounding** ([PR #18265](https://github.com/ollama/ollama/pull/18265), fixes [#18264](https://github.com/ollama/ollama/issues/18264)) — llama-server's prompt cache defaults to **8 GiB of host RAM per runner**, invisible to Ollama's memory accounting. The PR adds `OLLAMA_CACHE_RAM` to bound it. Important for capacity planning on multi-tenant hosts.
- **MLX prefix-cache restore truncation** ([#18267](https://github.com/ollama/ollama/issues/18267)) — cache restore always lands on a multiple of 8192 tokens, forcing re-prefill of up to 8191 tokens: a **fixed 17–27s tax per cold turn** on agent workloads (Claude Code against local models).
- **User-turn checkpoints for llama-server** ([PR #18271](https://github.com/ollama/ollama/pull/18271)) — passes `message_delimiters` to llama-server's `/completion` endpoint so checkpoints land at user-turn boundaries, improving prefix-cache hit rates for rendered prompts.
- **`/metrics` endpoint PR** ([PR #16998](https://github.com/ollama/ollama/pull/16998), addresses long-running [#3144](https://github.com/ollama/ollama/issues/3144), 115 👍) — opt-in Prometheus-compatible metrics via `OLLAMA_METRICS=1`: queue gauges, request counters, per-model token metrics.

## 5. Stability & Regressions

Ranked by severity:

1. **Vulkan backend regression since v0.32.12** ([#18272](https://github.com/ollama/ollama/issues/18272)) — "Not enough memory for command submission" loading a 66 GB model on AMD iGPU; works on v0.32.9. No fix PR yet — **pin to ≤ v0.32.9 on AMD iGPU** if affected.
2. **MLX `num_ctx` not enforced → Metal watchdog panic** ([#18125](https://github.com/ollama/ollama/issues/18125)) — Modelfile context limits ignored, long prefill can crash the Metal stack. **Fix merged** via [PR #18261](https://github.com/ollama/ollama/pull/18261) (enforces scheduler-selected context, reports effective context to `/api/ps`).
3. **`deepseek-v4-flash:cloud` leaks literal `</think>` into history → self-sustaining tool-call loop** ([#17617](https://github.com/ollama/ollama/issues/17617)) — 193 identical calls, ~31M tokens burned through the Anthropic-compat endpoint. **Fix in progress**: [PR #18260](https://github.com/ollama/ollama/pull/18260) stops the `deepseek3` renderer from truncating assistant history at the first `</think>`.
4. **Cloud reasoning models producing invalid structured output** — `minimax-m3:cloud` intermittently splits JSON between `message.reasoning` and `message.content` ([#17987](https://github.com/ollama/ollama/issues/17987)); `glm-5.3:cloud` enters endless reasoning in OpenCode/ZCode while direct Z.AI API works ([#18193](https://github.com/ollama/ollama/issues/18193)); `kimi-k2.6:cloud` shows 10+ min latency and stream `INTERNAL_ERROR` ([#16845](https://github.com/ollama/ollama/issues/16845)).
5. **Structured output truncation on gemma3:12b** ([#18094](https://github.com/ollama/ollama/issues/18094)) — `format` responses terminate early (`done_reason: "stop"`) when input contains double-quoted terms.
6. **MLX runner stuck in "Stopping..."** ([#18269](https://github.com/ollama/ollama/issues/18269)) — `muse-glimmer:30b-mlx` on M4/32GB; persists across `OLLAMA_KEEP_ALIVE` settings; one occurrence coincided with a full macOS restart.
7. **Long-tail items**: legacy `digest mismatch` on pull still open after ~3 years ([#941](https://github.com/ollama/ollama/issues/941), 162 comments); MIT license notice distribution gap remains unaddressed ([#3185](https://github.com/ollama/ollama/issues/3185), 272 👍) — relevant for enterprise redistribution compliance.

## 6. What This Means for Application Developers

- **Don't trust client-side context windows with `ollama launch`.** Codex CLI falls back to 128K and Qwen Code assumes 1M tokens regardless of what Ollama actually loaded ([#18257](https://github.com/ollama/ollama/issues/18257), [#18256](https://github.com/ollama/ollama/issues/18256)); alignment fix is in [PR #18259](https://github.com/ollama/ollama/pull/18259). Until merged, explicitly set context in the client config to match your runner, or you'll get silent truncation or overflow behavior.
- **Add defensive parsing for cloud reasoning models.** If you're routing agents through `:cloud` tags with JSON mode, validate that `message.content` is complete JSON and sanitize literal `</think>` leakage before replaying history ([#17987](https://github.com/ollama/ollama/issues/17987), [#17617](https://github.com/ollama/ollama/issues/17617)) — a single leaked token can create a costly tool-call loop.
- **Budget ~8 GiB extra host RAM per runner** for llama-server's prompt cache until [PR #18265](https://github.com/ollama/ollama/pull/18265) lands; then set `OLLAMA_CACHE_RAM` explicitly in containerized deployments.
- **Upgrade path**: v0.33.x users on Apple Silicon doing structured output should test the rc; AMD iGPU users should stay on ≤ v0.32.9 pending [#18272](https://github.com/ollama/ollama/issues/18272).
- **Observability is coming** — the `OLLAMA_METRICS=1` Prometheus endpoint ([PR #16998](https://github.com/ollama/ollama/pull/16998)) will finally enable proper queue/throughput monitoring for multi-user serving; worth tracking for SRE tooling.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-06

## 1. Today's Highlights

LiteLLM shipped **v1.100.0 (stable)** and cut **v1.101.0-rc.1** within the last 24 hours, both cosign-signed. Activity is dominated by proxy operational fixes: a community PR finally adds the missing `POST /config/reload` endpoint ([#40035](https://github.com/BerriAI/litellm/pull/40035)), and BerriAI landed a cluster of fixes around null-semantics in model/MCP management, Responses API prompt caching, and failure-log observability. Two fresh budget-accounting bugs were filed today that operators should watch.

## 2. Releases & Breaking Changes

- **v1.100.0 (stable)** and **v1.101.0-rc.1** released; release notes cover only cosign image-signing verification (key introduced in commit `0112e53`). No migration notes published — treat the rc as soak material. ([v1.100.0](https://github.com/BerriAI/litellm/releases), [v1.101.0-rc.1](https://github.com/BerriAI/litellm/releases))
- **MCP OAuth2 regression (1.96+) closed**: [#39665](https://github.com/BerriAI/litellm/issues/39665) — managed MCP OAuth2 redirecting to the LiteLLM UI instead of the vendor authorization page — was closed today. If you pinned to 1.95.1 over this, retest on v1.100.0.
- Supply-chain follow-up: request to sign the remote model cost map ([#40051](https://github.com/BerriAI/litellm/issues/40051)) was closed same-day; images are signed, the cost map is not.

## 3. New Model & Hardware Support

- **FLUX.2 Flex** image generation on Azure AI, with Flex-specific controls, reference-image mapping, and per-pixel pricing ([#39424](https://github.com/BerriAI/litellm/pull/39424)).
- **Mistral TTS** (Voxtral) on `/v1/audio/speech` — previously 500'd with a provider-mapping error ([#38755](https://github.com/BerriAI/litellm/pull/38755)).
- **Milvus gRPC vector search**, unlocking gRPC-only Milvus deployments for the vector-store API ([#39039](https://github.com/BerriAI/litellm/pull/39039)).
- Three new OpenAI-compatible gateways: **API Route** ([#40024](https://github.com/BerriAI/litellm/pull/40024)), **Mizumi** ([#40048](https://github.com/BerriAI/litellm/pull/40048)), **CLF AI Gateway** ([#39324](https://github.com/BerriAI/litellm/pull/39324)).
- **Anthropic workload identity federation** with pluggable identity sources ([#39935](https://github.com/BerriAI/litellm/pull/39935)); Claude Gateway support still an open request ([#34924](https://github.com/BerriAI/litellm/issues/34924)).

## 4. Performance & Optimization

- **Prompt caching over the Responses API was silently broken**: marking a message for caching switched implicit caching off entirely, yielding **zero cached tokens**. [#40032](https://github.com/BerriAI/litellm/pull/40032) preserves cache breakpoints end-to-end — direct latency/cost win once merged.
- **Streaming hooks flattened tool-call chunks into empty strings**, letting fragmented arguments bypass per-chunk guardrails; [#39888](https://github.com/BerriAI/litellm/pull/39888) preserves structured chunks and reassembles arguments by choice/tool index.
- **Wasted upstream compute**: non-streaming requests never cancel provider work on client disconnect ([#37140](https://github.com/BerriAI/litellm/issues/37140), open) — abandoned requests keep billing. No fix PR yet.
- **OTEL v2 trace fan-out**: a key's or team's full trace can now be routed to its own destination instead of one detached span ([#39654](https://github.com/BerriAI/litellm/pull/39654)).

## 5. Stability & Regressions

Ranked by severity:

1. **False budget exhaustion (new today, no fix visible)**: a key with `max_budget=100` hard-fails at "Current cost: 111.29" with 429s despite lower recorded spend ([#40050](https://github.com/BerriAI/litellm/issues/40050)); relatedly, `max_budget` arms a process-local `_current_cost` cap that never resets ([#40020](https://github.com/BerriAI/litellm/issues/40020)). Treat budget alerts with suspicion and check spend logs.
2. **Authorization gap**: model access checks ignore `access_group_ids` set directly on a virtual key — open since May ([#28464](https://github.com/BerriAI/litellm/issues/28464)).
3. **Terraform breakage**: `/user/update` 400s on the documented `blocked` param (`LiteLLM_UserTable` has no such column) ([#39564](https://github.com/BerriAI/litellm/issues/39564)).
4. **`POST /config/reload` 404** on `main-stable` — fix PR posted today ([#30772](https://github.com/BerriAI/litellm/issues/30772) / [#40035](https://github.com/BerriAI/litellm/pull/40035)).
5. **Billing correctness**: `custom_cost_per_token` double-bills Anthropic cache-read tokens ([#40006](https://github.com/BerriAI/litellm/issues/40006)); Vercel AI Gateway streaming drops `prompt_tokens_details`, so cached tokens bill at full input rate ([#39088](https://github.com/BerriAI/litellm/issues/39088)).
6. **Bedrock files can't be deleted** — `DELETE /v1/files/{id}` always 500s ([#39715](https://github.com/BerriAI/litellm/issues/39715)).
7. **Split-topology drift**: in the ECS gateway/backend split, models added via `/model/new` never reach the gateway process ([#39547](https://github.com/BerriAI/litellm/issues/39547)).
8. **UI**: Request Logs date-range picker treats local times as UTC ([#39979](https://github.com/BerriAI/litellm/issues/39979)); Codex CLI still can't connect ([#29818](https://github.com/BerriAI/litellm/issues/29818)).

**Resolved today**: the adaptive-router `gammavariate: alpha and beta must be > 0.0` family that could permanently 500 a model group ([#29397](https://github.com/BerriAI/litellm/issues/29397), [#35590](https://github.com/BerriAI/litellm/issues/35590), [#31481](https://github.com/BerriAI/litellm/issues/31481)) and Anthropic pass-through dropping Responses refusal blocks ([#39721](https://github.com/BerriAI/litellm/issues/39721)) are all closed.

## 6. What This Means for Application Developers

- **Agent builders**: [#39888](https://github.com/BerriAI/litellm/pull/39888) matters if you run guardrails on streaming tool calls — fragmented arguments were slipping through. Track it before trusting per-chunk content filters.
- **Cost-sensitive apps**: audit spend logs this week. Between double-billed cache reads ([#40006](https://github.com/BerriAI/litellm/issues/40006)), full-price cached tokens on Vercel streaming ([#39088](https://github.com/BerriAI/litellm/issues/39088)), and $0 logged costs for models outside the built-in cost map ([#35691](https://github.com/BerriAI/litellm/issues/35691)), reported spend may diverge from reality in both directions.
- **Claude Code / Codex CLI users**: don't rely on `max_budget` as a hard safety rail right now ([#40050](https://github.com/BerriAI/litellm/issues/40050), [#40020](https://github.com/BerriAI/litellm/issues/40020)); Codex CLI connectivity remains broken ([#29818](https://github.com/BerriAI/litellm/issues/29818)).
- **Terraform-managed deployments**: pin around the `litellm_user` resource until [#39564](https://github.com/BerriAI/litellm/issues/39564) lands.
- **Upgrade posture**: v1.100.0 is the sensible target; if you're on 1.96–1.99 for MCP OAuth2 reasons, verify the fix before pinning back. Verify image signatures with the published cosign key.

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-06

## 1. Today's Highlights

No releases shipped in the last 24h, but it was an unusually dense PR day — 20+ active PRs, roughly half opened today — almost all concentrated on **Unsloth Studio** (the local llama.cpp-based serving layer) rather than the fine-tuning core. The dominant themes are: replacing the seeded admin bootstrap password with one-time setup tokens ([#10387](https://github.com/unslothai/unsloth/pull/10387), [#7140](https://github.com/unslothai/unsloth/pull/7140), [#10151](https://github.com/unslothai/unsloth/pull/10151)), tightening OpenAI/Anthropic API compatibility ([#10362](https://github.com/unslothai/unsloth/pull/10362), [#10314](https://github.com/unslothai/unsloth/pull/10314), [#10315](https://github.com/unslothai/unsloth/pull/10315)), and a cluster of AMD integrated-GPU fixes derived from Strix Halo telemetry ([#10381](https://github.com/unslothai/unsloth/pull/10381), [#10382](https://github.com/unslothai/unsloth/pull/10382), [#10383](https://github.com/unslothai/unsloth/pull/10383), [#10384](https://github.com/unslothai/unsloth/pull/10384)). Issue traffic is almost entirely stale closed issues receiving batch updates; fresh signal lives in the PR queue.

## 2. Releases & Breaking Changes

- **No releases in the last 24h.**
- **Pending behavioral change to watch:** [#10362](https://github.com/unslothai/unsloth/pull/10362) proposes gating Unsloth's proprietary SSE control frames (`tool_start`, `tool_end`, `reasoning_summary`, `diffusion_frame`, etc.) behind an `X-Unsloth-Events` opt-in header. Today these frames ride the `/v1/chat/completions` stream unannounced and carry no `choices` field, so **strict OpenAI SDK clients fail schema validation**. If merged, clients that *want* the rich events must send the header — a de-facto breaking change for anyone parsing those frames today.

## 3. New Model & Hardware Support

- **AMD iGPU → Vulkan backend routing** ([#10381](https://github.com/unslothai/unsloth/pull/10381)): On gfx1150/gfx1151 (e.g., Strix Halo's Radeon 8060S), hardware detection now installs the Vulkan llama.cpp prebuilt instead of ROCm, with an auto-migration offer for existing ROCm installs. Measured on a Strix Halo CI runner, Vulkan is the better backend on these parts.
- **Broader installer hardware coverage** ([#8412](https://github.com/unslothai/unsloth/pull/8412)): torch 2.11 on Linux CPU-only, Vulkan llama.cpp for AMD cards without ROCm support, a gfx1033 gate, and three additional install fixes — originally discovered running Studio on a Steam Deck.
- **torch 2.11 / torchcodec compatibility** ([#7474](https://github.com/unslothai/unsloth/pull/7474)): Extends the compatibility guard to torch 2.11 and pins torchcodec per torch minor; fresh NVIDIA installs on `main` currently resolve a mismatched torchcodec silently.
- **Embeddings serving** ([#10315](https://github.com/unslothai/unsloth/pull/10315)): `/v1/embeddings` will be served from Studio's configured embedding model when the loaded chat GGUF can't produce embeddings (previously 503/501).

## 4. Performance & Optimization

- **Prompt cache on shared-memory GPUs** ([#10382](https://github.com/unslothai/unsloth/pull/10382)): The Windows full-offload tuning that disables llama-server's prompt cache is a pure loss on integrated GPUs — one Strix Halo user lost **~44 hours** across a 48.8-hour session to cache misses. The fix scopes cache-disable to discrete cards only.
- **Honest throughput reporting** ([#10384](https://github.com/unslothai/unsloth/pull/10384)): Analysis of **48,216 `engine_stats` records** from a Strix Halo log bundle showed the health line reporting **0 tok/s for nearly the entire generation window**, and twice reporting rates the hardware cannot physically produce. Fix corrects the metric math against llama-server `/metrics`.
- **GGUF export to Hub: no more double conversion** ([#10317](https://github.com/unslothai/unsloth/pull/10317)): Hub-destination exports currently run the full merge → convert → quantize sequence **twice** (second pass into the system temp folder inside `push_to_hub_gguf`). Fix reuses the first pass's artifacts.
- **CI efficiency** ([#10183](https://github.com/unslothai/unsloth/pull/10183)): Kaggle GPU jobs will dispatch kernels and collect results later instead of holding a runner in a poll loop — a measured `T4 smoke` job held a runner **41.5 min for ~4 min of useful work**.

## 5. Stability & Regressions

Ranked by severity; note all fixes below are **open PRs, not yet merged**:

1. **`push_to_ollama` is broken outright** — `TypeError: create_ollama_modelfile() got an unexpected keyword argument 'gguf_location'` after a signature change; the function is called with an argument it no longer accepts and without two it now requires. Fix: [#10304](https://github.com/unslothai/unsloth/pull/10304).
2. **Silent torchcodec/torch mismatch on fresh NVIDIA installs** — the guard built to catch it stays quiet because `cu128` index tops out at torch 2.11 while the constraint allows `<2.12.0`. Fix: [#7474](https://github.com/unslothai/unsloth/pull/7474).
3. **Strict OpenAI clients fail on Unsloth's SSE stream** — non-standard control frames without `choices` break schema validation ([#10362](https://github.com/unslothai/unsloth/pull/10362), fix in flight).
4. **Tools silently dropped on `/v1/messages`** — pointing Claude Code / Anthropic SDK at a GGUF without tool support in its chat template yields plausible text replies with no error, making agents look broken. Fix returns an explicit error: [#10314](https://github.com/unslothai/unsloth/pull/10314).
5. **Security: seeded admin password embedded in served page** — the "is this a local browser" gate is unenforceable (a default nginx `proxy_pass` forwards `Host: 127.0.0.1`). Fixes: [#7140](https://github.com/unslothai/unsloth/pull/7140), [#10387](https://github.com/unslothai/unsloth/pull/10387), plus auto-generated admin passwords for headless public launches in [#10151](https://github.com/unslothai/unsloth/pull/10151) (a restore-and-revert of #7392).
6. **iGPU load failures and misleading error messages** — [#9482](https://github.com/unslothai/unsloth/pull/9482) (closed) reported models refusing to load on 16GB-RAM iGPUs without `UNSLOTH_ALLOW_HOST_OFFLOAD=1`; today's [#10381](https://github.com/unslothai/unsloth/pull/10381)/[#10382](https://github.com/unslothai/unsloth/pull/10382)/[#10383](https://github.com/unslothai/unsloth/pull/10383) continue this hardening, including correcting four load/update messages that blamed the model when the build or config was at fault. Related closed: [#9986](https://github.com/unslothai/unsloth/issues/9986) (Studio Ollama inventory schema crash).
7. **UI freeze on menu open** ([#10262](https://github.com/unslothai/unsloth/pull/10262)) — sidebar/chat/project menus lock the page, block scroll, and hide content from screen readers; cost grows with conversation length.

The remaining 100+ issue updates today are old, already-closed items (some dating to 2024) receiving batch comment/tag updates — no new defect trends there.

## 6. What This Means for Application Developers

- **Don't parse Unsloth's extra SSE frames without checking for `X-Unsloth-Events`** once [#10362](https://github.com/unslothai/unsloth/pull/10362) lands — the plain OpenAI stream becomes strictly conformant, and the rich tool/reasoning events become opt-in. Good news for LangChain/Vercel-AI-SDK-style clients with strict validators.
- **Handle explicit tool errors.** With [#10314](https://github.com/unslothai/unsloth/pull/10314), requests with tools against a non-tool GGUF will fail loudly instead of returning confident garbage — build retry/fallback paths around that error if you hot-swap models behind Claude Code or the Anthropic SDK.
- **You can build RAG directly against Studio.** Once [#10315](https://github.com/unslothai/unsloth/pull/10315) merges, `/v1/embeddings` is servable from the configured embedding model even with only a chat GGUF loaded — no separate embedding server needed. Relatedly, [#10320](https://github.com/unslothai/unsloth/pull/10320) fixes OpenClaw memory search silently calling **OpenAI** embeddings on otherwise fully-local setups.
- **Multi-user local serving is coming.** [#10375](https://github.com/unslothai/unsloth/pull/10375) adds per-account isolation (per-account logins, data, settings) for shared machines/GPU boxes — relevant if you're running Studio as a team inference endpoint.
- **AMD iGPU (Strix Halo, Steam Deck-class) is now a first-class target** with the Vulkan prebuilt routing and prompt-cache retention — if you're deploying on Radeon 8060S-class hardware, wait for these PRs to merge before benchmarking, as current `main` both picks the wrong backend and disables the prompt cache there.
- **Migrate off any workflow that shells out to `push_to_ollama`** — it's currently broken (#10304); saving GGUF locally and importing via a Modelfile is the workaround until the fix merges.

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-06

## Today's Highlights
No releases shipped today. Activity centers on two open reliability reports — a gateway startup failure on loaded hosts (#1761) and a 502 on the `/v1/responses` endpoint (#1762) — plus two open PRs: a new Kunavo provider preset (#1760) and a gateway fix enabling fallback when providers return errors inside `200` SSE streams (#1759). The two issues together suggest pain around gateway lifecycle and upstream error propagation.

## Releases & Breaking Changes
None in the last 24h.

## New Model & Hardware Support
- **Kunavo provider preset** ([PR #1760](https://github.com/musistudio/claude-code-router/pull/1760)) — Adds a preset for [Kunavo](https://kunavo.com), an OpenAI-compatible gateway serving Claude, Gemini, and GPT models behind a single API key with pay-as-you-go per-token pricing. The PR documents why one endpoint entry covers all three protocols CCR routes to. Note this is remote-provider routing support, not local model/hardware/quantization work.

## Performance & Optimization
No throughput, latency, or memory work landed in this window. The closest adjacent topic is #1761 (below), which concerns startup reliability under load rather than steady-state performance.

## Stability & Regressions
Ranked by severity:

1. **High — Gateway fails to start on loaded hosts** ([Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761))
   The managed core gateway (port 3456) fails on every restart/boot on moderately loaded hosts, while the web/management server (3458) starts fine: `Failed to start gateway during web startup: Core gateway did not accept runtime config within 5000ms.` Root-cause analysis in the report argues the hardcoded 5s config-acceptance timeout measures parent event-loop congestion rather than child readiness — i.e., the health signal is structurally unreliable under load. No fix PR yet; this is a availability-blocking issue for self-hosted deployments on shared/busy machines.
2. **Medium — 502 Bad Gateway on `/v1/responses`** ([Issue #1762](https://github.com/musistudio/claude-code-router/issues/1762))
   `codex: unexpected status 502 Bad Gateway: Unknown error, url: http://127.0.0.1:3456/v1/responses`. Zero comments and no diagnostics yet — likely needs a repro/config details before triage. Possibly upstream-provider related rather than a CCR regression, but unconfirmed.
3. **Latent (fix in progress) — Fallback not triggered on errors inside `200` SSE streams** ([PR #1759](https://github.com/musistudio/claude-code-router/pull/1759))
   OpenRouter and Anthropic commit `200 text/event-stream` headers before knowing whether the upstream will accept the request; failures then appear only as the first SSE frame in the body. The gateway currently decides fallback purely from the status line, so these in-stream errors surface to clients instead of triggering fallback. Fix PR exists, open as of yesterday.

## What This Means for Application Developers
- **Deployment planning on busy hosts:** If you run CCR on shared CI runners or loaded servers, expect gateway startup failures from the hardcoded 5s timeout (#1761). Schedule restarts during low-load windows and watch the issue for a fix; there is no workaround PR merged yet.
- **Don't rely on fallback for OpenRouter/Anthropic errors:** Until #1759 merges, requests that fail mid-stream (error in the first SSE frame of an otherwise `200` response) will be surfaced to your agent as errors rather than retried on a fallback provider. Handle these errors client-side in the interim.
- **Multi-model routing simplification:** If #1760 lands, routing to Claude, Gemini, and GPT through a single Kunavo key becomes a one-preset config — useful for teams wanting consolidated billing and provider diversity without per-model endpoint setup.
- **The `/v1/responses` 502 (#1762) has no traction yet** — if you hit the same codex-path error, adding your config and logs to the issue would help triage.

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-06

## 1. Today's Highlights

No releases shipped in the last 24h, but it was a heavy contributor day on the proxy and provider layer: a new GitHub Copilot hosted-account provider for Codex with capability-driven Responses/Chat routing ([PR #7157](https://github.com/farion1231/cc-switch/pull/7157)) and native "oh-my-pi" (OMP) support ([PR #7152](https://github.com/farion1231/cc-switch/pull/7152)) both landed today. The GPT-6 Astra OAuth client-identity fix ([PR #7132](https://github.com/farion1231/cc-switch/pull/7132)) was closed alongside the "can't use GPT-6" issues it resolves, while a fresh v3.20.1 regression — `tool_call_id` rejections breaking all Codex sub-agent tool calls against DeepSeek-compatible upstreams — was reported this morning ([#7156](https://github.com/farion1231/cc-switch/issues/7156)).

## 2. Releases & Breaking Changes

No new release in the last 24h. Two pending config-schema changes are in open PRs worth tracking for migration:

- `proxy_restore_on_startup` (default **off**) — auto-resume of routing takeover on app launch, Clash-style ([PR #7120](https://github.com/farion1231/cc-switch/pull/7120))
- `lightweight_mode` persisted in `AppSettings` — tray lightweight mode now survives restarts and auto-enters on startup ([PR #7158](https://github.com/farion1231/cc-switch/pull/7158))

## 3. New Model & Hardware Support

- **GitHub Copilot as a Codex provider** ([PR #7157](https://github.com/farion1231/cc-switch/pull/7157)): Copilot hosted accounts route through the local Responses endpoint; the proxy selects Responses vs. Chat Completions forwarding per-model based on `supported_endpoints`, with auth and response adaptation handled transparently.
- **GPT-6 Astra via OAuth fixed** ([PR #7132](https://github.com/farion1231/cc-switch/pull/7132)): the Claude→Codex OAuth route advertised Codex `0.144.1`, below the model's `0.153.0` minimum; bumped to `0.153.4`. Resolves [#7129](https://github.com/farion1231/cc-switch/issues/7129) and [#7133](https://github.com/farion1231/cc-switch/issues/7133).
- **GPT-5.6 pricing added** (Sol/Terra/Luna tiers, incl. cached-input at 10% of input price) — usage records no longer fall back to zero cost ([PR #5172](https://github.com/farion1231/cc-switch/pull/5172), closed today).
- **Grok account profiles** — per-account credential retention, request-mode/reasoning-effort tracking, refreshed model prices ([PR #6792](https://github.com/farion1231/cc-switch/pull/6792)).
- **OMP (oh-my-pi)** as a first-class app: provider management, session browsing, usage tracking, config sync ([PR #7152](https://github.com/farion1231/cc-switch/pull/7152)).
- **OpenCode image input**: model-level `modalities` now editable and preserved on sync to `opencode.json` ([PR #7141](https://github.com/farion1231/cc-switch/pull/7141)).

## 4. Performance & Optimization

No throughput/latency kernel work (not applicable to this layer); reliability-adjacent items:

- **429 retry storms remain open** ([#4752](https://github.com/farion1231/cc-switch/issues/4752), 10 comments): frequent `exceeded retry limit, last status: 429` when routing Codex through the local proxy — no fix PR yet.
- **Windows system-proxy change detection** via registry snapshot, refreshing the cached HTTP client on effective proxy changes — improves long-running session resilience ([PR #7101](https://github.com/farion1231/cc-switch/pull/7101)).
- **Self-healing npm installs**: npm 12's blocked postinstall scripts can silently leave broken `claude` entry points; per-package `npm_config_allow_scripts` injection plus a bounded uninstall/reinstall repair path ([PR #7099](https://github.com/farion1231/cc-switch/pull/7099)).
- **Evidence-based provider verifier** sends a minimal real request and diffs configured vs. reported model identity, catching misconfigured gateways before runtime ([PR #7147](https://github.com/farion1231/cc-switch/pull/7147)).

## 5. Stability & Regressions (ranked)

1. **[P1, new today] v3.20.1: `tool_call_id` length rejection on DeepSeek upstreams** — any Codex sub-agent/agent turn (i.e., any tool call) returns HTTP 400 after Responses→Chat translation; plain chat unaffected. No fix PR identified yet ([#7156](https://github.com/farion1231/cc-switch/issues/7156)).
2. **[P1] Session poisoning via persisted "empty thinking"** — the proxy writes empty thinking blocks from streams into Codex history; the next request is rejected with 400 "thinking length insufficient" ([#6260](https://github.com/farion1231/cc-switch/issues/6260)).
3. **[P1] Orphan `tool_calls` → permanent 400** — image-only tool outputs silently dropped on non-vision upstreams, leaving unrecoverable sessions ([#6697](https://github.com/farion1231/cc-switch/issues/6697)).
4. **[P2] Wayland startup crash** (`EGL_BAD_PARAMETER`), 12 comments, still open ([#5609](https://github.com/farion1231/cc-switch/issues/5609)).
5. **[P2] Known regression cluster on `tool_call_id`/protocol translation**: v3.16.5 SenseNova `deepseek-v4-flash` 400s ([#4973](https://github.com/farion1231/cc-switch/issues/4973)); Responses→Chat splitting commentary + tool calls into consecutive assistant messages ([#6529](https://github.com/farion1231/cc-switch/issues/6529)); optional tool-argument semantics lost in the Anthropic→Codex bridge ([#6473](https://github.com/farion1231/cc-switch/issues/6473)).
6. **[P3] Auth/costing**: `chat/completions` auth written as `ANTHROPIC_API_KEY` → 401 on OpenCode/glm-5.2 ([#4925](https://github.com/farion1231/cc-switch/issues/4925)); usage dashboard can't cost GPT-6-Astra, displays as SOL ([#7137](https://github.com/farion1231/cc-switch/issues/7137)).

**Fixes in flight / resolved:** Gemini Native part-level `thoughtSignature` + Codex `thought_signature` backfill — supersedes #5298, fixes multi-turn function-calling breakage over Gemini ([PR #7143](https://github.com/farion1231/cc-switch/pull/7143)); stop deleting unmanaged `[model_providers.*]` on Codex live write, fixes #6860 ([PR #6887](https://github.com/farion1231/cc-switch/pull/6887)); unified history honored during official Codex takeover ([PR #7154](https://github.com/farion1231/cc-switch/pull/7154)); Hermes endpoint-field sync on switch ([PR #7144](https://github.com/farion1231/cc-switch/pull/7144)) and default `api_mode` ([PR #7139](https://github.com/farion1231/cc-switch/pull/7139)); provider form now gated on live config to prevent DB-snapshot overwrites ([PR #6965](https://github.com/farion1231/cc-switch/pull/6965)). Notably, the long-running `~/.claude/settings.json` clobbering issue ([#1198](https://github.com/farion1231/cc-switch/issues/1198), 16 comments, 9 👍) was closed today — verify on next release.

## 6. What This Means for Application Developers

- **Avoid routing Codex agents/sub-agents to DeepSeek-compatible Chat upstreams on v3.20.1** until #7156 is fixed — every tool-calling turn fails. Pin to a known-good version or use a provider that accepts short `tool_call_id`s.
- **Session state can be permanently poisoned by translation artifacts** (empty thinking blocks, dropped image tool outputs, orphan tool_calls). Build agent loops that can start a fresh session/conversation ID on repeated 400s rather than retrying in-place.
- **GPT-6 Astra should now work via OAuth** — but your Codex client must be ≥ 0.153.0; older clients will keep hitting the 400 upgrade error.
- **Back up `~/.codex/config.toml` and `~/.claude/settings.json` before upgrades.** Config-overwrite behaviors are being fixed (#1198 closed, PR #6887 pending), but the "overwrite-style" Codex rewrite remains a design concern — track the official-profile-based refactor proposal ([#4371](https://github.com/farion1231/cc-switch/issues/4371), 6 👍).
- **New routing surface coming**: Copilot-backed Codex accounts (#7157) and OMP (#7152) expand provider options; the auto-resume takeover toggle (#7120) changes restart semantics for long-running agent hosts — default stays off, so no action needed unless you opt in.

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API Digest — 2026-09-06

**Project:** [QuantumNous/new-api](https://github.com/QuantumNous/new-api) — LLM gateway / relay & billing platform

---

## 1. Today's Highlights

No release shipped in the past 24h; activity was dominated by relay-correctness fixes and one performance patch. The most consequential landings: model-specific OpenAI chat capability handling for GPT-6 Astra ([PR #7211](https://github.com/QuantumNous/new-api/pull/7211)), restoration of client-visible model names under `model_mapping` ([PR #6975](https://github.com/QuantumNous/new-api/pull/6975)), and a batch-copy optimization for request deep-cloning in the Responses path ([PR #7221](https://github.com/QuantumNous/new-api/pull/7221)). A fresh PR opened today preserves multimodal tool outputs during Responses→Chat conversion ([PR #7227](https://github.com/QuantumNous/new-api/pull/7227)). Notably, most inbound PRs are disclosed AI-agent authored (Codex/ZCode), continuing the repo's agent-contribution pattern.

## 2. Releases & Breaking Changes

- **None in the last 24h.** Context only: current builds referenced by issues are v1.0.0-rc.32/rc.33; one rc.33 regression surfaced and was closed as a duplicate of a known issue (see §5).

## 3. New Model & Hardware Support

- **GPT-6 Astra support in relay** — [PR #7211](https://github.com/QuantumNous/new-api/pull/7211) (closed): GPT-6 Astra previously missed the GPT-5-prefix capability checks, leaving `max_tokens`, sampling params, and system-role handling unadapted. relaykit now carries explicit per-model capability descriptors (token fields, developer role, sampling) applied based on the mapped upstream model and final reasoning effort; supports GPT-6 Astra and date snapshots; clears `temperature` for GPT-6 Astra; deliberately does **not** extrapolate rules to unknown future GPT majors.
- No new hardware backends or quantization formats (N/A for a gateway).

## 4. Performance & Optimization

- **RawMessage batch copy** — [PR #7221](https://github.com/QuantumNous/new-api/pull/7221) (closed): batch-copies `RawMessage` instead of per-element copying to reduce cost of request deep-copies in the Responses path; continuation of commit `3f4cca3`, scope confirmed with repo owner. No benchmark numbers published.
- **Active channel probing** — [PR #7161](https://github.com/QuantumNous/new-api/pull/7161) (open): adds a runtime switch for active channel probing with refined thresholds — ops-facing reliability work, no latency figures provided.

## 5. Stability & Regressions

Ranked by severity:

1. **rc.33 regression: Gemini 3.8 Flash variant rewritten mid-relay** — [Issue #7220](https://github.com/QuantumNous/new-api/issues/7220), closed as **duplicate** → known tracked regression affecting rc.31→rc.33 upgraders (official image `calciumion/new-api:v1.0.0-rc.33`). No dedicated fix PR visible in today's window; track the original issue.
2. **Responses session replay corruption** — [Issue #7094](https://github.com/QuantumNous/new-api/issues/7094), open: conversion writes empty `function_call.name` into history, breaking replay. Fix exists: [PR #7219](https://github.com/QuantumNous/new-api/pull/7219) (open) omits unnamed function calls from Responses output.
3. **Pricing card-view pagination bug** — [Issue #7222](https://github.com/QuantumNous/new-api/issues/7222), open on rc.33: switching group jumps pagination to the last page and disables the prev button. Fix: [PR #7223](https://github.com/QuantumNous/new-api/pull/7223) (open) resets the grid page when filtered models change.
4. **Anthropic→OpenAI `reasoning_effort` mapping** — [Issue #7215](https://github.com/QuantumNous/new-api/issues/7215), closed within ~24h (rc.30): thinking-level parameter was not mapped to the OpenAI upstream; resolved.
5. **Rejected as invalid:** [Issue #7225](https://github.com/QuantumNous/new-api/issues/7225) (`settleTestQuota` allegedly missing group ratio) and [Issue #7224](https://github.com/QuantumNous/new-api/issues/7224) (`ParseContent()` allegedly dropping `cache_control`) — both closed invalid.
6. **Long-tail stale items touched but not progressed:** negative input-token billing from cache reads ([#3110](https://github.com/QuantumNous/new-api/issues/3110)), vendor misidentification in the model square ([#3173](https://github.com/QuantumNous/new-api/issues/3173)), OpenRouter multimodal params ([#3076](https://github.com/QuantumNous/new-api/issues/3076)), cache-price-ratio sync ([#2679](https://github.com/QuantumNous/new-api/issues/2679)).

## 6. What This Means for Application Developers

- **Model-field routing/stats:** the `model` field in responses now reflects the client-requested (mapped) name rather than leaking the upstream name after `model_mapping` ([#6975](https://github.com/QuantumNous/new-api/pull/6975)) — clients asserting or routing on this field will see consistent values with logs.
- **Agents on the Responses API:** tool-call sessions can produce corrupted history (empty `function_call.name`, [#7094](https://github.com/QuantumNous/new-api/issues/7094)) until [#7219](https://github.com/QuantumNous/new-api/pull/7219) merges; pin your version or validate replayed histories if this affects you. A related gap — multimodal tool outputs dropped in Responses→Chat conversion — has a fix pending in [#7227](https://github.com/QuantumNous/new-api/pull/7227).
- **GPT-6 Astra via OpenAI channels:** `max_tokens`, sampling, and developer-role handling are now correct post-[#7211](https://github.com/QuantumNous/new-api/pull/7211); expect `temperature` to be stripped for this model family.
- **Anthropic-format clients** setting thinking budgets against OpenAI upstreams: the mapping defect ([#7215](https://github.com/QuantumNous/new-api/issues/7215)) is resolved — upgrade instead of working around it.
- **rc.31→rc.33 upgraders** routing Gemini 3.8 Flash variants: verify model names aren't rewritten mid-relay before committing to rc.33 ([#7220](https://github.com/QuantumNous/new-api/issues/7220)).
- **Channel operators:** channel selection is now consistent between the in-memory cache and DB paths when per-group model abilities are toggled ([#6997](https://github.com/QuantumNous/new-api/pull/6997)); auto-ban/auto-recovery testing remains an open feature request ([#3047](https://github.com/QuantumNous/new-api/issues/3047)).

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*