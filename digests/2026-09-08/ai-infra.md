# AI 基础设施日报 2026-09-08

> 生成时间: 2026-09-07 16:38 UTC | 覆盖项目: 9 个

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

# 跨项目 AI 基础设施报告 — 2026-09-08

## 1. 生态概览

推理栈正在分化为四个明显层级 —— 数据中心服务引擎、本地运行时、网关/路由器、微调工具链 —— 而今天的动态显示各层级都在竞相吸收同一组冲击：Blackwell 级硬件（SM120/121、B200/B300）其内核尚不具备确定性保证、混合线性注意力架构（GDN/DSA 系列：DeepSeek-V4、GLM-5.x、Kimi-K3、Qwen3.8），以及 OpenAI Responses API 成为新的互操作战场。llama.cpp 保持着惊人的发版节奏（24 小时内 13 个标签版本），而今天两个正式发版都来自网关层（CC Switch v3.20.2、New API v1.0.0-rc.35），印证了价值捕获目前正集中在路由/计费环节而非原始推理服务。最具影响力的跨领域信号：**贪心解码在最新一代硅片上尚不可信** —— 四个项目在同一硬件代次上独立报告了非确定性或崩溃。

## 2. 活跃度对比

*数字为今日摘要中引用的 issue/PR 数，并非仓库完整统计。*

| 项目 | 引用 issue | 引用 PR | 发版状态 | 严重程度特征 |
|---|---|---|---|---|
| **vLLM** | ~31 | 16 | 无 | 6 个开放的严重崩溃类 bug（SM120/121、MTP、GDN） |
| **SGLang** | ~19 | ~16 | 无 | 4 个高严重度（FP4+EAGLE IMA、HiCache 损坏、DP-attention OOM、B300 卡死） |
| **llama.cpp** | ~16 | ~20 | **13 个构建（b10828–b10840）** | 3 个严重开放回归（−42–54% pp、gfx1151 错误 logits、QSA 非确定性） |
| **Ollama** | ~20 | 11 | 无 | 消费级硬件回归集群（AMD Vulkan、sm_120、MLX Windows） |
| **LiteLLM** | ~15 | 11 | 无 | 计费/路由正确性导向；4 个高严重 bug |
| **Unsloth** | ~21 | 12 | 无 | Studio 加固；安装矩阵正确性；Intel Arc B580 仍未修复 |
| **Claude Code Router** | 2 | 1 | 无 | 平静的一天；2 个真实集成中断 |
| **CC Switch** | ~19 | ~15 | **v3.20.2** | Codex/Responses 互操作震荡已基本解决 |
| **New API** | ~21 | 15 | **v1.0.0-rc.35** | 24 小时内出现 3 个计费正确性 bug |

## 3. 模型支持竞赛

- **llama.cpp 在架构支持速度上领先。** Spark2_5ForCausalLM 当日发布（b10828），加上 Vulkan 上的 TQ1_0 以及 `--fuse-qkv` 转换。Ollama 数日内跟进（通过其 llama.cpp 升级 #18279，b10760→b10829）—— 一条紧凑且运转良好的依赖链。
- **vLLM/SGLang 在前沿硬件 × 前沿模型矩阵上领先。** vLLM：单卡 RTX 5090 上 245K 上下文的 NVFP4 KV cache 原型、DeepSeek-V4 CuTeDSL 内核、SM100 上的 FP8 KV。SGLang：Ascend NPU 上的 LongCat 2.0 INT8、Intel XPU 分块 prefill 覆盖、GLM-5.3 推理强度映射。两边都在吸收 Kimi-K3、GLM-5.x、DeepSeek-V4-Flash 和 Qwen3.8 —— bug 组合也几乎镜像对称（Kimi-K3 损坏/OOM 在两边追踪系统中均出现，Qwen3.8-Flash-Next-FP8 SM80 不兼容同样如此）。
- **网关在 provider/API 接入面上领先。** New API 上线 Wan 3.0 视频 + 华为 MaaS 已在路上；CC Switch 加入了通过 xAI-Responses 的 Grok、作为 Codex provider 的 GitHub Copilot 以及多 key 故障转移；LiteLLM 新增 Hubris 并修复了 Gemini 3+/4 版本检测。
- **结论：** 没有单一赢家 —— llama.cpp 胜在广度/速度，vLLM/SGLang 胜在前沿推理，网关层胜在上游覆盖。今日所有引擎明显缺席的一项：GLM-5.3-Flash 线性注意力在 vLLM nightly 中仍不受支持。

## 4. 性能前沿

| 领域 | 当前投入方向 |
|---|---|
| **KV cache** | 最大单点投入。vLLM：NVFP4/FP8 KV 数据类型、Mooncake 生命周期修复、面向 agentic >90% 前缀复用的 Context-Aware Retention RFC。SGLang：UnifiedRadixCache/KV 分片重构、HiCache L3 统一布局（~1.4TB/2100 万 key 规模）。Ollama：MLX 前缀缓存对齐（修复 17–27s 的重新 prefill 损耗）。llama.cpp：正在对抗 −42–54% 的统一 KV 回归。 |
| **内核/量化** | llama.cpp 的 tiled VNNI k-quant matmul（**CPU 3–7 倍**提升）是当日最大单项胜利；Vulkan RMS_NORM 融合（+~4%）；CUDA 无分支 Q4_K/Q5_K 解包。vLLM：批不变 persistent matmul 配置、PDL。SGLang：将静态 FP8 激活量化融合进 producer 内核的提案。 |
| **投机解码** | 普遍采用但需要付出代价：vLLM 量化出 EAGLE/MTP 前缀缓存末块重算导致的 30–40% 批量吞吐损失；DFlash2+YaRN 在 1.04M token prompt 上零复用。SGLang 推进 n-gram draft tree；llama.cpp 加入 MTP 图复用与无模型后缀解码；Unsloth 至今才提出接受率可观测性的诉求。 |
| **批处理/调度/路由** | vLLM：长度感知批次组合 RFC，CPU offload worker 中二次轮询修复。SGLang：运行时 P↔D 角色切换。网关侧对应：New API 的每通道 TTFB 超时与自动回退（#7228）—— 当前最具运营意义的网关性能特性。 |

## 5. 层级定位

| 层级 | 项目 | 今日态势 |
|---|---|---|
| **数据中心推理引擎** | vLLM、SGLang | 在 Blackwell 确定性、PD 分离、投机解码上正面对决；正确性债务累积速度快于修复速度（vLLM：6 个严重问题，1 个修复进行中） |
| **本地/边缘运行时** | llama.cpp → Ollama → Unsloth Studio | llama.cpp 是内核基座（每日 13 个构建）；Ollama 将其打包给消费者；Unsloth Studio 在其上叠加 GUI/模型准备 —— 一条运转良好的纵向链，今日 Spark X2.5 正经由该链路流转 |
| **网关/路由器** | LiteLLM、New API、CC Switch、Claude Code Router | 今日均有正式发版；焦点已从协议转换转向**计费正确性、故障转移与 Responses API 兼容性** |
| **微调** | Unsloth（独立） | Studio 加固占主导；核心包工作集中在安装矩阵与硬件差距清理（Wan2.2 缺失 ROCm fused-attention，Arc B580 仍未修复） |

各层级在今日 bug 中也明显耦合：LiteLLM #40132 修复的是 *针对 vLLM/Kimi 的* tool-id 篡改问题；New API #7252 是 *针对 Ollama 的* 工具调用 bug；vLLM 的 NVFP4 KV 等待 *FlashInfer*。

## 6. 趋势信号

1. **确定性是新的正确性前沿。** Top-k/indexer 选择的非确定性在 vLLM（`persistent_topk`，#54521）和 llama.cpp（QSA 中的 CUB `DeviceTopK`，#28497）中独立出现；Ollama 和 SGLang 报告了 Blackwell 崩溃。批不变性工作（vLLM PR #55676）正成为一等特性，而非锦上添花。
2. **投机解码 + 前缀缓存是尚未解决的冲突点。** 每个引擎层今日都在该接缝处报告了 bug 或实测代价。请将投机解码视作可 A/B 测试的选项，而非默认配置。
3. **Responses API 是互操作战场。** LiteLLM（prompt-cache 损失、未记录的流式开销）、New API（`incomplete` 状态计费为零）、Ollama（拒绝 `agent_message`）、SGLang（`created_at` 类型漂移）、CC Switch（400 类 provider 错配）—— 全部集中在一天。Codex/Claude Code 客户端正在推动此趋势；预计还将再持续一个季度的震荡。
4. **工具调用仍是头号应用层故障面** —— 跨六个项目出现 7+ 个不同 bug（静默丢弃、并行调用错乱、解析器循环、id 规范化）。客户端校验是必须的。
5. **硬件碎片化正以快于验证的速度扩大。** Ascend、XPU、ROCm、MLX 以及消费级 Blackwell（SM120/121 —— bug 最多的层级）全部活跃，全部存在未修复缺陷；vLLM 临时禁用了 Ascend CI。
6. **边缘/CPU 推理在悄然取胜**（matmul 3–7 倍、MTP 图缓存、WebGPU 反向内核），而数据中心引擎则在四处救火。

**面向 agent 开发者的关注清单：** 将引擎钉到已知可用镜像（尤其是 SGLang v0.5.18-cu130/B300）；对 `temperature=0` 的输出进行快照与断言；将网关计费与上游账单对账（LiteLLM #29913、New API #7241）；在客户端归一化 `reasoning_effort`（SGLang #33185、#38104）；并跟踪 PR #55122（vLLM）与 HiCache/L3 集群（SGLang）作为当前正确性债务何时被偿还的领先指标。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 日报 — 2026-09-08

## 1. 今日要点

过去 24 小时最突出的主题是 **Blackwell 级硬件(SM120/SM121)上的推理确定性与内核正确性**。多个高评论量的讨论聚焦于批次不变(batch-invariant)matmul 调优([#27433](https://github.com/vllm-project/vllm/issues/27433)、[PR #55676](https://github.com/vllm-project/vllm/pull/55676))、Qwen3.8-Flash-Next 预填充中非确定性的 `persistent_topk`([#54521](https://github.com/vllm-project/vllm/issues/54521)、[PR #55122](https://github.com/vllm-project/vllm/pull/55122)),以及随并发度上升而加剧的 DeepSeek-V4-Flash 非确定性问题([#53257](https://github.com/vllm-project/vllm/issues/53257))。基础设施方面，SM120 的 NVFP4 KV cache 接入([#49011](https://github.com/vllm-project/vllm/issues/49011))与一项重要的 `SimpleCPUOffloadWorker` 二次复杂度轮询修复([PR #55756](https://github.com/vllm-project/vllm/pull/55756))正在落地。

## 2. 版本发布与破坏性变更

过去 24 小时没有新版本发布。以下进行中的行为变更可能影响升级路径：

- **[PR #54835](https://github.com/vllm-project/vllm/pull/54835)** — 无 GPU 渲染服务器(`vllm launch render`)将开始遵循模型默认的推理解析器；目前会破坏 gpt-oss(Harmony)的 derender 流程。迁移建议：依赖空 `reasoning_parser` 的客户端应显式设置该参数。
- **[PR #55489](https://github.com/vllm-project/vllm/pull/55489)** — 新增 `X-KV-Cache-Report-Mode` 请求头(`incremental` | `full`);请求体字段仍为权威来源。不算破坏性变更，但会剥除请求头的代理需要相应更新。
- **[PR #55710](https://github.com/vllm-project/vllm/pull/55710)** — `--quick` 与 `--max-tokens 0` 将作为显式值生效而不再被忽略；依赖默认行为的运维者可能会看到新的生成结果。
- **[PR #48240](https://github.com/vllm-project/vllm/pull/48240)***(已关闭)* — Rust 前端生命周期端点 `POST /init_weight_transfer_engine`、`/start_weight_update`、`/update_weight`(开发模式)正在为 RL 权重传输持续迭代。

## 3. 新模型与硬件支持

- **SM100 上的 Inkling FP8 e4m3 KV cache** — [PR #54705](https://github.com/vllm-project/vllm/pull/54705)(RFC [#54704](https://github.com/vllm-project/vllm/issues/54704))新增可选的 `--kv-cache-dtype fp8`(支持逐张量缩放)；依赖上游 tml-fa4 的 `rescale_threshold` 修复。
- **SM120(RTX 5090 / RTX PRO 5000)上的 NVFP4 KV cache** — [#49011](https://github.com/vllm-project/vllm/issues/49011) 报告了在单张 5090 上以 `unsloth/Qwen3.6-27B-NVFP4` 运行 245K 上下文的可用原型；正等待 vLLM 完成 FlashInfer 内核接入。
- **DeepSeek-V4 NVIDIA CuTeDSL 注意力内核** — [PR #53566](https://github.com/vllm-project/vllm/pull/53566)(由 [#49349](https://github.com/vllm-project/vllm/issues/49349) 跟踪的预热/去 JIT 系列中的第 5/N 部分)。
- **GLM-5.3-Flash 的 `Glm5NextTextLinearAttention`** — [#54062](https://github.com/vllm-project/vllm/issues/54062) 报告该架构尚未在 vLLM nightly 中获得支持。
- **Transformers v5 InternVL2 迁移** — [#38425](https://github.com/vllm-project/vllm/issues/38425)(good first issue,欢迎认领)。
- **昇腾 NPU CI 暂时禁用** — [PR #55379](https://github.com/vllm-project/vllm/pull/55379);相关步骤以注释形式保留，便于快速重新启用。
- **XPU AWQ 门控修复** — [PR #54391](https://github.com/vllm-project/vllm/pull/54391) 使 `MoeWNA16Config` 能在 `device_capability` 被有意设为 `None` 的 XPU 上正常工作。

## 4. 性能与优化

- **Ada 上的 Granite 批次不变 matmul** — [PR #55676](https://github.com/vllm-project/vllm/pull/55676) 新增四个调优过的 BF16 persistent-matmul 配置(`BLOCK_M=BLOCK_N=BLOCK_K=64`、4 warps、4 stages),覆盖 Granite-4.0-H-350M 的线性层形状；具体形状已在 PR 中列出。
- **避免 `SimpleCPUOffloadWorker` 中的事件轮询呈二次复杂度** — [PR #55756](https://github.com/vllm-project/vllm/pull/55756) 用基于 `OrderedDict` 的结构替换了由 `list.pop(0)` 驱动的排空操作以及每步对待处理事件的全量扫描；此前，积压事件的批量完成开销与积压量呈二次关系，无进展时的轮询开销与待处理数量呈线性关系。
- **增量式 MoE 专家卸载** — [#38256](https://github.com/vllm-project/vllm/issues/38256) 跟踪 PR [#37190](https://github.com/vllm-project/vllm/pull/37190):将专家权重锁定(pinned)在 CPU 内存、使用固定大小的 GPU 缓存，配合 LFRU 与跨层预测；目标是让超出显存容量的模型能在更小的硬件上运行。
- **EAGLE/MTP 前缀缓存丢弃最后一个块** — [#53670](https://github.com/vllm-project/vllm/issues/53670) 量化了混合 Qwen3.8 GDN 布局下每次命中约 1,648 个 token 的重算量，导致使用前缀复用的投机解码工作负载损失 30–40% 的批处理吞吐。
- **长度感知的批组成策略(RFC)** — [#55265](https://github.com/vllm-project/vllm/issues/55265) 提出最大/最小交错的准入策略，并附实验证据与失败案例。
- **基准 sweep 边界修复** — [PR #55740](https://github.com/vllm-project/vllm/pull/55740) 为 `vllm bench sweep serve_workload` 的初始边界改用有效的 prompt 数量(重复选项取最后一个、处理带连字符的 JSON 键)。
- **为 `fusedQKNormRopeKernel` 启用 PDL** — [PR #55755](https://github.com/vllm-project/vllm/pull/55755)(轻量级内核流水线改进)。
- **上下文感知的 KV 缓存保留 API(RFC)** — [#37003](https://github.com/vllm-project/vllm/issues/37003) 针对并发负载下超过 90% token 为前缀复用的智能体工作负载，提出按优先级逐出的方案。

## 5. 稳定性与回归

按评论数量与严重程度排序(崩溃/正确性问题优先)：

| 严重程度 | Issue | 概述 | 修复进展 |
|---|---|---|---|
| **严重(崩溃)** | [#54521](https://github.com/vllm-project/vllm/issues/54521) | `Qwen3.8-Flash-Next-FP8` 在 SM121/GB10 上，一旦 prompt 超过 `indexer_budget`,贪心解码即出现非确定性；根因是 `persistent_topk`(5 个字节级完全相同的请求 → 5 个不同结果) | [PR #55122](https://github.com/vllm-project/vllm/pull/55122) 使 `persistent_topk` 具备确定性 |
| **严重(崩溃)** | [#37431](https://github.com/vllm-project/vllm/issues/37431) | 异步调度下 Mamba-2 Triton 内核在 SM121(DGX Spark)上触发 `cudaErrorIllegalInstruction` | 过去 24 小时暂无 |
| **严重(崩溃)** | [#37754](https://github.com/vllm-project/vllm/issues/37754) | SM121 上 GQA=16 时 FlashInfer + MTP 投机解码出现非法内存访问(Nemotron-3-Super-120B-A12B-NVFP4);Triton 后端正常 | 暂无 |
| **严重(崩溃)** | [#53726](https://github.com/vllm-project/vllm/issues/53726) | RTX 3090 上混合 GDN + MTP k=3 + 异步调度场景下出现静默 CUDA 非法内存访问(退出码 0);历经此前多轮修复仍未消除 | 暂无 |
| **严重(崩溃)** | [#55571](https://github.com/vllm-project/vllm/issues/55571) | RTX PRO 5000(SM120)在持续 FP8 负载下出现 Xid 13 / CUDA 非法内存访问；设置 `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` 或 `--enforce-eager` 可规避 | 暂无 |
| **严重(崩溃)** | [#49896](https://github.com/vllm-project/vllm/issues/49896) | SM12x 上的 DeepSeek-V4:MQA logits 出现 NaN → `top_k_per_row_prefill` 将未初始化的共享内存当作索引输出 → 非法内存访问 | 暂无 |
| **高(正确性)** | [#46710](https://github.com/vllm-project/vllm/issues/46710) | PR #46025 之后，当内联系统消息为 `preserved in-place` 时，`DeepSeekV4-Flash` 输出错误结果 | 暂无 |
| **高(正确性)** | [#54318](https://github.com/vllm-project/vllm/issues/54318) | `Qwen3.8-Flash-Next-FP8` 在 4× A100 上无法启动，因为 SM80 不支持 `fp8e4nv` | 暂无(预期中的硬件差距) |
| **高(挂起)** | [#52907](https://github.com/vllm-project/vllm/issues/52907)*(已关闭)* | 使用 Ray executor 时，2 节点 × TP-16 配置在 `in_the_same_node_as()` 的 gloo barrier 处发生多节点启动死锁(0.26.1rc1.dev78 与 .dev148 之间的回归)；30 分钟超时 | 已关闭 — 修复已落地 |
| **高(静默损坏)** | [#52627](https://github.com/vllm-project/vllm/issues/52627) | Kimi-K3 在 1P1D NIXL Direct-PD、经 MultiConnector 组合 MooncakeStoreConnector + NixlConnector 时出现间歇性静默输出损坏；仅用 NIXL 的 PD 正常 | 暂无 |
| **高(正确性)** | [#53488](https://github.com/vllm-project/vllm/issues/53488) | MTP 投机解码下部分请求的 `prompt_logprobs` 被静默损坏(Qwen3.5 系列，分块预填充) | 暂无 |
| **高(正确性)** | [#53257](https://github.com/vllm-project/vllm/issues/53257) | DeepSeek-V4-Flash 在 temperature=0 下输出非确定；发生比例随并发度上升 | [PR #55122](https://github.com/vllm-project/vllm/pull/55122) 部分相关 |
| **高(正确性)** | [#54094](https://github.com/vllm-project/vllm/issues/54094) | DFlash2 + YaRN 处理 1.04M 相同 prompt:前缀缓存零复用；仅 target 复用约 1.039M token | 暂无 |
| **高(性能回归)** | [#53670](https://github.com/vllm-project/vllm/issues/53670) | EAGLE/MTP 前缀缓存丢弃最后一个块 — 前缀复用工作负载损失 30–40% 吞吐 | 暂无 |
| **中(活锁)** | [#49210](https://github.com/vllm-project/vllm/issues/49210) | MTP + xgrammar 下引擎核心活锁(CPU 占用 100%,但不崩溃)；自 v0.24.0 起的回归 | 暂无 |
| **中(正确性)** | [#39056](https://github.com/vllm-project/vllm/issues/39056) | 在 `--reasoning-parser qwen3 --tool-call-parser qwen3_coder` 下，当 XML tool_call 出现在 `<think>` 内部时，vLLM 0.19 可能丢失 `Qwen3.5-35B-A3B-FP8` 的工具调用 | 暂无 |
| **中(加载失败)** | [#52735](https://github.com/vllm-project/vllm/issues/52735)*(已关闭)* | 混合 GDN 模型(XPU)启用 MTP/EAGLE 时，`OffloadingConnector` 只存储 KV 却从不取用 | 已关闭 — 修复已落地；相关 **[PR #50984](https://github.com/vllm-project/vllm/pull/50984)** 将 Mooncake 远程 KV 加载失败上报给调度器，而非让请求滞留 |
| **中(正确性)** | [#55250](https://github.com/vllm-project/vllm/issues/55250) | XPU 上 `--dtype float16` 时 DFlash2 草稿接受率为 0%(bf16 正常)；Qwen3.8-27B + incoai/Qwen3.8-27B-DFlash2 | 暂无 |
| **中(功能缺陷)** | [#54906](https://github.com/vllm-project/vllm/issues/54906) | Model Runner V2 在 Qwen3.8 NVFP4 + MTP 下忽略 `thinking_token_budget` | 暂无 |
| **中(用户体验)** | [#36456](https://github.com/vllm-project/vllm/issues/36456) | 即使提供了 `--hf-config-path`,本地 GGUF 路径仍报错 "architecture qwen35 is not supported yet" | 暂无 |
| **低(日志)** | [#48745](https://github.com/vllm-project/vllm/issues/48745) | 优雅关闭期间出现误报的 `EngineDeadError` 堆栈 | 暂无 |

今日落地两个重要的**引擎生命周期缺陷修复**：
- **[PR #50984](https://github.com/vllm-project/vllm/pull/50984)** — Mooncake:将失败的远程 KV 加载上报给调度器，让请求得以离开 `WAITING_FOR_REMOTE_KVS` 状态，而不是在流量压力下滞留并拖垮 D 节点。修复 [#50719](https://github.com/vllm-project/vllm/issues/50719)。
- **[PR #55290](https://github.com/vllm-project/vllm/pull/55290)** — EC CPU connector:当远程编码无法送达时，让单个请求失败而非整个引擎挂掉。此前在 `ECCPUConnector` 持续多模态负载下，解码实例会在约 40 秒内丢失其 EngineCore。

## 6. 对应用开发者意味着什么

- **在 Blackwell 级或混合 GDN 模型上，暂时不要相信 `temperature=0`。** 多份独立报告 — SM121 上的 Qwen3.8-Flash-Next-FP8([#54521](https://github.com/vllm-project/vllm/issues/54521))、B300 上的 DeepSeek-V4-Flash([#53257](https://github.com/vllm-project/vllm/issues/53257))以及 SM12x 上因 NaN logits 引发的 DeepSeek-V4([#49896](https://github.com/vllm-project/vllm/issues/49896))— 均描述了随并发加剧而恶化的输出分歧。如需可复现的智能体循环，可先对输出做快照并断言，或临时改用 Triton/eager 后端。[PR #55122](https://github.com/vllm-project/vllm/pull/55122) 是上游修复路径。
- **投机解码 + 前缀缓存有实打实的吞吐代价。** [#53670](https://github.com/vllm-project/vllm/issues/53670) 报告，启用 EAGLE/MTP 后，前缀复用工作负载因最后一个块的重算损失 30–40% 的批处理吞吐。如果你的智能体负载会在请求间复用系统提示词或工具 schema,请先关闭投机解码做 A/B 测试，别想当然地认为是稳赚不赔。
- **DFlash2 + YaRN 目前对相同的 1.04M prompt 实现零前缀缓存复用**([#54094](https://github.com/vllm-project/vllm/issues/54094))。长上下文投机草稿尚不友好于缓存；请为冗余预填充预留预算。
- **KV 缓存连接器的可靠性对 PD 部署至关重要。** Mooncake 修复([PR #50984](https://github.com/vllm-project/vllm/pull/50984))改变了请求生命周期行为 — 请求现在会快速失败而不是无限挂起。如果你配置了“请求被遗弃”类告警，升级后预计会出现短暂的尖峰。另需注意 Kimi-K3 在 MultiConnector 下的静默损坏([#52627](https://github.com/vllm-project/vllm/issues/52627))— 修复前请优先使用纯 NIXL 的 PD 方案。
- **Qwen3.x 上的推理/工具调用解析存在不少坑。** `<think>` 块内生成的 XML 工具调用可能被静默丢弃([#390

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-08

## 今日要点

- **HiCache 与 UnifiedRadixCache 加固是当前的主导主题。** 今日合并了一组修复 PR，涉及 side-pool 分配器路由（[#38350](https://github.com/sgl-project/sglang/pull/38350)）、SWA-only 失败模式（[#38348](https://github.com/sgl-project/sglang/pull/38348)、[#38349](https://github.com/sgl-project/sglang/pull/38349)）、external-linker 崩溃恢复（[#38352](https://github.com/sgl-project/sglang/pull/38352)），以及 Mooncake direct-linker partial-batch 处理（[#38347](https://github.com/sgl-project/sglang/pull/38347)）——反映出在 DeepSeek-V4-Flash、GLM-5.x 等大规模分层部署中真实的生产痛点。
- **DSA 系列模型 + 投机解码仍是首要 Bug 来源。** 新增报告包括 DP attention 下 DFLASH/DSPARK draft KV 的 OOM（[#38202](https://github.com/sgl-project/sglang/issues/38202)）、B200/B300 上 FP4 + EAGLE 的非法内存访问（[#30209](https://github.com/sgl-project/sglang/issues/30209)），以及 GLM-5.3-Flash 上的 HiCache host-tier 数据损坏（[#38031](https://github.com/sgl-project/sglang/issues/38031)）。作为基础修复路径的 KV-shard-with-sequence-split 重构（[#30501](https://github.com/sgl-project/sglang/pull/30501)、[#38356](https://github.com/sgl-project/sglang/pull/38356)）正在推进。
- **影响生产用户的潜在回归。** 近期发布中的若干未解决 Bug——`/v1/responses` 中 `created_at` int/float 类型不一致（[#34716](https://github.com/sgl-project/sglang/issues/34716)）、DeepSeek-V4-Flash 上 reasoning-effort 映射偏移一级（[#33185](https://github.com/sgl-project/sglang/issues/33185)），以及流式客户端断连导致的僵尸请求洪泛（[#36333](https://github.com/sgl-project/sglang/issues/36333)）——仍未得到处理。

## 版本发布与破坏性变更

_过去 24 小时内无版本发布。_

## 新增模型与硬件支持

- **LongCat 2.0 INT8 on Ascend NPU**（4 节点 Atlas 800I A3）——跟踪 issue [#30224](https://github.com/sgl-project/sglang/issues/30224) 已关闭/不活跃。
- **Intel XPU 2026Q2 路线图**——跟踪 issue [#24922](https://github.com/sgl-project/sglang/issues/24922) 已关闭；chunked-prefill 场景覆盖与单元测试在 [#33804](https://github.com/sgl-project/sglang/pull/33804) 中持续推进。
- **Ray 指标后端** 用于 `ServerArgs.stat_loggers`（Ray Serve LLM 下的 Grafana 仪表盘）——PR [#31415](https://github.com/sgl-project/sglang/pull/31415)。
- **多模态：在 `sglang-server` 中移除不透明类型**，与 Python 多路复用器清理保持一致——PR [#38095](https://github.com/sgl-project/sglang/pull/38095)。
- **将 OpenAI/Anthropic `reasoning_effort` 名称映射到模板声明的级别**（例如 GLM-5.3 白名单 `low|high|max`）——PR [#37977](https://github.com/sgl-project/sglang/pull/37977)。

## 性能与优化

- **KV Cache Shard with Sequence Split**——面向 Blackwell 的重构持续推进；PR [#30501](https://github.com/sgl-project/sglang/pull/30501) 打下了基础接口，[#38356](https://github.com/sgl-project/sglang/pull/38356)（1/4）将 logical-page 放置迁移至 `UnifiedRadixCache`。
- **L3 中的统一完整 KV Cache 布局**——PR [#33651](https://github.com/sgl-project/sglang/pull/33651) 围绕统一布局重构 HiCache L3 命名。
- **MTP / EAGLE / DSpark draft KV caches in the external linker**——PR [#37914](https://github.com/sgl-project/sglang/pull/37914)（Unified Cache 第 7/N 部分）。
- **将静态 FP8 激活量化融合到生产者内核中**（norm / activation / allreduce epilogue）——提案 [#31504](https://github.com/sgl-project/sglang/issues/31504)；其动机来自 `modelopt_fp8` / `modelopt_mixed` 检查点（Nemotron、Llama、Qwen），在 Qwen3.5-397B-A17B-NVFP4-V2 上每次 FP8 GEMM 前都会启动独立的 `_static_quant_fp8`。
- **Hopper：TRTLLM allreduce 融合 fp32 累加** 与 MNNVL 后端对齐——issue [#34603](https://github.com/sgl-project/sglang/issues/34603)。
- **N-gram 投机解码路线图**——[#21052](https://github.com/sgl-project/sglang/issues/21052) 规划了采用 BFS-trie 草案 token 树，并结合 recency / 优先队列排序。
- **Prefill↔Decode 运行时角色切换（mori 后端）**——PR [#28403](https://github.com/sgl-project/sglang/pull/28403) 实现在不重启服务的前提下重新平衡 P:D 比例。
- **Rust TreeCore 加固与 CI 对齐**——PR [#37303](https://github.com/sgl-project/sglang/pull/37303) 修复了正确性缺口（陈旧节点 panic 中毒、SWA 预取窗口规则）。

## 稳定性与回归

按生产环境潜在影响半径排序：

| 严重级别 | Issue | 摘要 | 修复 PR |
|---|---|---|---|
| **High** | [#30209](https://github.com/sgl-project/sglang/issues/30209) | `nvidia/GLM-5.2-NVFP4` + EAGLE 在 B200/B300 上的 FlashInfer TRTLLM bf16 batched-GEMM（`nextn` draft MoE）中触发 `CUDA error: illegal memory access`。#30137 之后，Triton nextn 路径受 HIP 网关控制。 | 未关联 |
| **High** | [#38031](https://github.com/sgl-project/sglang/issues/38031) | GLM-5.3-Flash（DSA）HiCache host-tier load-back 在无投机解码时导致生成损坏：工具调用丢失、出现退化性重复循环（8×H100, TP8）。 | 未关联 |
| **High** | [#38202](https://github.com/sgl-project/sglang/issues/38202) | DFLASH/DSPARK draft KV pool 预算使用 `tp_size` 而非 `attn_tp_size` → Kimi-K3 在 DP attention 下 OOM。 | 未关联 |
| **High** | [#38300](https://github.com/sgl-project/sglang/issues/38300) | B300 上 TP2 卡死，组合 HiCache + 可中断 prefill CUDA graphs + FlashInfer MNNVL（`v0.5.18-cu130`, FlashInfer 0.6.17）。 | 未关联 |
| **Medium** | [#29857](https://github.com/sgl-project/sglang/issues/29857) | v0.5.14：混合 GDN（Qwen3.6-27B NVFP4）上的 EAGLE/MTP 闲置约 50 GB VRAM，KV-pool token 容量受限。 | 未关联 |
| **Medium** | [#36333](https://github.com/sgl-project/sglang/issues/36333) | 流式客户端断连后留下僵尸请求，持续解码至 `max_tokens` 并在 `state was deleted in TokenizerManager` 处刷屏（#34160 回退后的回归）。 | 未关联 |
| **Medium** | [#34974](https://github.com/sgl-project/sglang/issues/34974) | `--enable-eplb` + DSPARK 在 draft CUDA graph capture 期间崩溃：`on_select_experts scatter_add_` 维度不匹配（`layer_idx=None`）。 | 未关联 |
| **Medium** | [#33185](https://github.com/sgl-project/sglang/issues/33185) | DeepSeek-V4-Flash-0731：`reasoning_effort` 映射偏移一级——`high` 无效，厂商 `max` 不可达（在 v0.5.16 + main 中仍存在）。 | [#37977](https://github.com/sgl-project/sglang/pull/37977) 进行中 |
| **Medium** | [#38291](https://github.com/sgl-project/sglang/issues/38291) | 服务 Qwen3.8-Flash-Next-FP8 时，A100（SM80）不支持 `fp8e4nv`。 | 未关联 |
| **Low** | [#38183](https://github.com/sgl-project/sglang/issues/38183) | `transformers` 固定版本 5.12.1 与 main 不兼容——版本线两侧的 `import sglang` 均失败。 | 未关联 |
| **Low** | [#38104](https://github.com/sgl-project/sglang/issues/38104) | `--default-chat-template-kwargs` 中的 `reasoning_effort` 会静默覆盖每请求的值。 | 未关联 |
| **Low** | [#34716](https://github.com/sgl-project/sglang/issues/34716) | `/v1/responses` 的 `created_at` 在流式事件中为 float，在非流式响应中为 int。 | 未关联 |
| **Low** | [#33385](https://github.com/sgl-project/sglang/issues/33385) | `DeepSeekV4TokenToKVPool`（SWA/HiSparse）缺少 `get_cpu_copy()` → 解码模式 retract 时触发 `NotImplementedError`（offload 为无条件执行，而非由 `--disaggregation-decode-enable-offload-kvcache` 控制）。 | 未关联 |
| **Low** | [#34572](https://github.com/sgl-project/sglang/issues/34572) | PP disaggregated prefill 卡死：在 abort 风暴下，各阶段的 bootstrap 队列历史出现分歧。 | 未关联 |
| **Low** | [#35252](https://github.com/sgl-project/sglang/issues/35252) | MoE tuner 写入 `int4_w4a16` 配置文件，但运行时从未读取。 | 未关联 |

CI 跟踪器（[#17050](https://github.com/sgl-project/sglang/issues/17050)）显示 2 个 broken、13 个 flaky、958 个近期已修复——状态足够健康可发布，但在固定到当前 `main` 之前，应关注这两项持续存在的损坏。

## 对应用开发者的意义

- **若您使用 DSA 系列模型（DeepSeek-V4-Flash、GLM-5.2/5.3、Kimi-K3）并启用投机解码**，请固定到已知良好的镜像版本而非 `main`。EAGLE/MTP + HiCache + DP attention 的组合会触发最严重的 Bug 类（OOM、数据损坏、非法内存访问）。请特别关注 v0.5.18-cu130——[#38300](https://github.com/sgl-project/sglang/issues/38300) 是 B300 上当前的镜像级回归。
- **需在客户端处理 reasoning-effort API 的怪异行为。** DeepSeek-V4-Flash 上的级别映射 Bug（[#33185](https://github.com/sgl-project/sglang/issues/33185)）与 `--default-chat-template-kwargs` 的静默覆盖（[#38104](https://github.com/sgl-project/sglang/issues/38104)）意味着：若您在厂商特有与 OpenAI 风格的 effort 级别之间路由，网关应当进行规范化并显式校验每请求的值。PR [#37977](https://github.com/sgl-project/sglang/pull/37977) 合并后将有助于解决此问题。
- **`/v1/responses` 客户端必须同时接受 `int` 与 `float` 类型的 `created_at`**（流式与非流式模式下类型不同）——[#34716](https://github.com/sgl-project/sglang/issues/34716)。
- **流式断连处理在服务端目前存在 Bug。** 断连的客户端可能留下持续解码至 `max_tokens` 并刷错误日志的请求（[#36333](https://github.com/sgl-project/sglang/issues/36333)）。在服务端修复落地之前，建议使用较短的 `max_tokens` 上限与激进的客户端超时作为缓解措施。
- **HiCache L3 正趋于生产可用。** 随着 external-linker 崩溃处理（[#38352](https://github.com/sgl-project/sglang/pull/38352)）、Mooncake direct-linker partial-load 恢复（[#38347](https://github.com/sgl-project/sglang/pull/38347)）以及 namespace-scoped L3 keys（[#37058](https://github.com/sgl-project/sglang/pull/37058)）同期落地，~1.4TB / 2100 万 key 规模的多层 prefix-cache 部署正迈向 safe-by-default 运行状态。若尚未规划，建议在网关侧设计 key 命名空间（`cache_salt` / `extra_key`）。
- **Intel XPU 与 Ray Serve LLM 路径日趋成熟。** 若您在评估非 NVIDIA 硬件或基于 Ray 的编排，下一季度可考虑对 chunked-prefill XPU 覆盖（[#33804](https://github.com/sgl-project/sglang/pull/33804)）与 Ray 指标后端（[#31415](https://github.com/sgl-project/sglang/pull/31415)）进行试点。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-08

## 今日要点
今日更新重点在**后端广度**：通过分块 VNNI k-quants 实现了 3–7× CPU `mul_mat` 加速（#27851），Vulkan 路径获得 RMS_NORM 融合（gemma4 上 +~4%）、TQ1_0 支持和对齐的 `GET_ROWS`，CUDA 方面则在 DGX Spark 上引入无分支 Q4_K/Q5_K 解包并配备 L2 预取，同时修复了 f16 flash attention 中发散屏障问题。模型侧，**Spark2_5** 因果语言模型支持落地（#27868），一个长期存在的 GDN 归一化 bug（`max` → `rsqrt`）已修复（#28068）。正确性问题仍在流血：统一 KV 提示处理回归（长请求第 2 个下降 42–54%，#28495）、131k 上下文下 Vulkan 子分配断崖（#27734），以及 Ryzen AI Max `gfx1151` 输出 logits 错误 bug（#28211），均处于开放状态并影响生产环境。

## 发布与重大变更
过去 24 小时内 **b10828–b10840** 区间集中涌入一批提交。值得注意的版本化变更：

- **b10840**（[#26705](https://github.com/ggml-org/llama.cpp/pull/26705)） — CUDA 在 `mmvq` 中实现 Q4_K/Q5_K 无分支解包 + DGX Spark 上的 L2 预取；批量化吞吐预计提升。
- **b10839**（[#28253](https://github.com/ggml-org/llama.cpp/pull/28253)） — Vulkan：`GET_ROWS` 现已类型对齐；当偏移违反 `minStorageBufferOffsetAlignment` 时回退至 CPU。对未对齐偏移张量的行为发生变化（此前是断言）。
- **b10837**（[#28511](https://github.com/ggml-org/llama.cpp/pull/28511)） — 当模板检查字符串时，能力检查器重新评估类型化内容。
- **b10835**（[#27870](https://github.com/ggml-org/llama.cpp/pull/27870)） — CUDA flash attention：修复发散屏障问题并移除重复的元数据设置。
- **b10834**（[#28387](https://github.com/ggml-org/llama.cpp/pull/28387)） — 后端输入现可选择不创建另一个 split。
- **b10833**（[#28024](https://github.com/ggml-org/llama.cpp/pull/28024)） — Vulkan RMS_NORM 融合：`RMS_NORM(+MUL+ADD(+MUL))` 与 `RMS_NORM+VIEW+SET_ROWS`；`ROPE+VIEW+SET_ROWS` 扩展以支持 IMROPE。
- **b10831**（[#27765](https://github.com/ggml-org/llama.cpp/pull/27765)） — Vulkan TQ1_0 量化支持。
- **b10830**（[#22780](https://github.com/ggml-org/llama.cpp/pull/22780)） — 新增 HF→GGUF 转换标志 `--fuse-qkv`，用于融合 Q/K/V 投影。
- **b10829**（[#28068](https://github.com/ggml-org/llama.cpp/pull/28068)） — **正确性修复**：GDN q/k 归一化从 `max` 切换为 `rsqrt(x*x + eps)`（flash-linear-attention 规范）。评估 gated-delta-net 模型的用户应重新运行质量测试；之前缓存的权重未失效，但评估结果可能发生变化。
- **b10828**（[#27868](https://github.com/ggml-org/llama.cpp/pull/27868)） — 新增 Spark2_5 因果语言模型架构。

## 新增模型与硬件支持
- **新架构**：Spark2_5ForCausalLM（[#27868](https://github.com/ggml-org/llama.cpp/pull/27868)）。
- **新量化格式**：TQ1_0 在 Vulkan 上完全支持（[#27765](https://github.com/ggml-org/llama.cpp/pull/27765)）— mm、mat-vec、mat-vec-id、dequant、get_rows；常量打包为 32 位。
- **转换工具**：HuggingFace→GGUF 的 `--fuse-qkv`（[#22780](https://github.com/ggml-org/llama.cpp/pull/22780)）— 适用于内存映射的 Q/K/V 复用，并略微减小文件体积。
- **WebGPU**：新增反向 kernel（[#28269](https://github.com/ggml-org/llama.cpp/pull/28269)）— 迈向仅浏览器微调的第一步。
- **Metal**：多 GPU 选择修复 — 每个物理 GPU 一个后端设备，并配备 Intel Mac + eGPU 配置的跨设备拷贝保护（[#28568](https://github.com/ggml-org/llama.cpp/pull/28568)）。
- **CPU**：通过 VNNI 实现 k-quants 的分块 `mul_mat`（[#27851](https://github.com/ggml-org/llama.cpp/pull/27851)）— **CPU 矩阵乘法提速 3–7×**，使用 256×256 int8 窗口；CPU 侧的重大胜利。
- **DGX Spark / DGX 级 GPU**：CUDA L2 预取调优（#26705）。

## 性能与优化
- **CPU `mul_mat`（k-quants）**：通过分块 VNNI 实现获得 3–7× 加速（[#27851](https://github.com/ggml-org/llama.cpp/pull/27851)）。
- **CUDA `mmvq`（Q4_K/Q5_K）**：无分支解包停止按列重复执行 scale 解码；收益随 batch size > 1 增长（[#26705](https://github.com/ggml-org/llama.cpp/pull/26705)）。
- **CUDA flash attention**：发散屏障修复移除了 f16 路径上潜在的性能/正确性隐患（[#27870](https://github.com/ggml-org/llama.cpp/pull/27870)）。
- **Vulkan RMS_NORM 融合**：gemma4 上端到端约 +4%（[#28024](https://github.com/ggml-org/llama.cpp/pull/28024)）。
- **MTP 投机解码（CUDA）**：通过 cache key 分离在交替形状间复用单个 graph — 消除重复的 graph capture（[#28549](https://github.com/ggml-org/llama.cpp/pull/28549)）。
- **qwen4exp QSA 解码**：基于 gather 的稀疏注意力 — top-2048 indexer 选出的 cell 现在真正跳过而非仅做掩码（[#28213](https://github.com/ggml-org/llama.cpp/pull/28213)）。
- **CUDA MoE MMQ**：N-tile 尺寸针对 RDNA3 上的典型专家宽度做了适配（[#28552](https://github.com/ggml-org/llama.cpp/pull/28552)）。
- **mtmd（多模态）编码器**：CLIP context 现在通过 `CPU_REPACK` 额外 buffer 快速路径路由（[#28563](https://github.com/ggml-org/llama.cpp/pull/28563)）。
- **后缀解码**：初始的 model-free 投机解码实现（[#26283](https://github.com/ggml-org/llama.cpp/pull/26283)）— 根据匹配后缀在线构建树；收益随匹配长度增长。
- **Krea Vulkan / Flash Attention**：优化系列（[#27494](https://github.com/ggml-org/llama.cpp/pull/27494)）持续落地。

## 稳定性与回归
按潜在生产影响排序：

1. **统一 KV 提示处理崩塌（-42 至 -54%）**（[#28495](https://github.com/ggml-org/llama.cpp/issues/28495)）— CUDA/HIP 上 `--np 2 --kv-unified` 处理长顺序请求。根因已定位：flash-attention kernel 仅跳过 KQ 掩码的尾部（`KV_max`），未处理内部全 `-INF` 块。**尚无修复 PR。**
2. **131k 上下文下 Vulkan 子分配断崖（解码损失 ~78%）**（[#27734](https://github.com/ggml-org/llama.cpp/issues/27734)）— 通过设置 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` 解决；默认 1 GiB 在 RDNA3 上产生碎片。
3. **`gfx1151`（Strix Halo）上 HIP/ROCm 在 prompt > n_ubatch 时输出错误 logits**（[#28211](https://github.com/ggml-org/llama.cpp/issues/28211)）— 不崩溃；静默数据损坏。**尚无修复。**
4. **qwen4exp 在 HIP/gfx1151 上超过 ~1k 上下文后严重解码减速**（[#27856](https://github.com/ggml-org/llama.cpp/issues/27856)）— **已关闭**（可能已在近期 Vulkan/HIP 变更中修复）。
5. **qwen4exp QSA indexer 非确定性（CUDA）**（[#28497](https://github.com/ggml-org/llama.cpp/issues/28497)）— CUB `DeviceTopK` 在存在并列块分数时每次运行选取不同 cell。**尚无修复。**
6. **Intel iGPU/i915 上 Vulkan：kernel watchdog 静默取消提交**（[#27634](https://github.com/ggml-org/llama.cpp/issues/27634)）— embedding 塌缩且无错误信息。
7. **Vulkan 在 RX 9070 XT（gfx1201）上 hidden_size ≥ 4096 时比 HIP 慢 5–7×**（[#26663](https://github.com/ggml-org/llama.cpp/issues/26663)）— 约 100 GB/s 有效带宽。
8. **`--lazy-mode auto` 在 Vulkan（AMD iGPU）上将 qwen4exp 的 `pp512` 砍半**（[#28160](https://github.com/ggml-org/llama.cpp/issues/28160)）— #27837 后的回归。**尚无修复。**
9. **长上下文 MoE 上 `--tensor-split` 间歇性输出退化**（[#28185](https://github.com/ggml-org/llama.cpp/issues/28185)）— 通过原始 API 调用可复现，与客户端无关。
10. **MTP Qwen3.6 27B 重复 `////`**（[#23577](https://github.com/ggml-org/llama.cpp/issues/23577)）— 长会话后评估损坏。
11. **Gemma 4 31B + MTP 崩溃（`fattn.cu:579`）**：使用 `-sm tensor` 编辑系统消息时触发（[#24440](https://github.com/ggml-org/llama.cpp/issues/24440)）。
12. **Blackwell GGML-CUDA SOFT_MAX 崩溃（RTX 5090）**（[#25060](https://github.com/ggml-org/llama.cpp/issues/25060)）— 非维护者提交了补丁。
13. **GLM-5.2 在无 V cache 的情况下仍强制同 KV 类型**（[#26382](https://github.com/ggml-org/llama.cpp/issues/26382)）— `-ctk q5_1` 错误传播。
14. **Anthropic `/v1/messages` 丢失 `id_slot` 槽位钉扎**（[#28554](https://github.com/ggml-org/llama.cpp/pull/28554) — 修复 PR 已开）。
15. **服务器：`tool_choice: "required"` 在 `supports_preserve_reasoning=true` 模板上被接受但未强制执行**（[#27217](https://github.com/ggml-org/llama.cpp/issues/27217)）。
16. **Qwen 上约 48 个可选参数时并行 `tool_calls` 错乱/挂起**（[#28522](https://github.com/ggml-org/llama.cpp/issues/28522)）。
17. **Qwen3.5 9B 在 `<thinking>` 块内输出 XML tool call**（[#20837](https://github.com/ggml-org/llama.cpp/issues/20837)）— 评论数高，聊天模板边界情况。

今日已处理：**GDN 归一化 bug**（[#28068](https://github.com/ggml-org/llama.cpp/pull/28068)）以及 **`fattn.cu:579` flash-attention 发散屏障**（[#27870](https://github.com/ggml-org/llama.cpp/pull/27870)）。

## 对应用开发者的意义
- **升级到 b10829+ 后重新运行 GDN 模型评估。** `max` → `rsqrt` 的修复将影响任何 gated-delta-net 架构的质量评分；请缓存基于旧版本生成的"基线真值"。
- **若您在多槽位 CUDA 上使用 `--kv-unified` 提供服务，请在 #28495 解决前固定工作负载** — 第二个并发长上下文请求正在静默承受 40–50% 的 pp 延迟。
- **Windows 上 RDNA3 的长上下文 Vulkan：设置 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`** 用于 ≥ 128k 上下文；否则在 131k 边界处预期约 78% 的解码损失。
- **纯 CPU 部署从 #27851 获得重大收益** — 带 VNNI 的分块 k-quant `mul_mat` 为任何量化工作负载免费带来 3–7× 加速；无需迁移，只需重新编译。
- **CUDA 上的 MTP 投机解码现已 graph 缓存**（[#28549](https://github.com/ggml-org/llama.cpp/pull/28549)）— 预期首 token 方差更低、Qwen3.6 MTP 及类似模型的稳态吞吐更好。
- **若您基于 Qwen 构建工具调用 agent，请关注 #27217（Anthropic API 路径槽位钉扎丢失）和 #28522（并行 `tool_calls` 错乱）；对 `/v1/messages` 槽位处理应用修复 PR #28554。**
- **Spark2_5 现可通过 `llama-server` 提供服务**；若您正在评估阿里 Spark 模型，可将其接入现有流水线。
- **WebGPU 微调**（[#28269](https://github.com/ggml-org/llama.cpp/pull/28269)）仍属实验性，但预示着仅浏览器个性化将成为可能 — 对隐私敏感的 agentic 应用很有用。
- **HF→GGUF 转换**：新的 `--fuse-qkv` 标志（[#22780](https://github.com/ggml-org/llama.cpp/pull/22780)）为具有独立 Q/K/V 投影的模型产出更紧致的打包权重文件 — 烘焙进您的模型导入流水线。

---
*来源：github.com/ggml-org/llama.cpp — 发布版本 b10828–b10840，截至 2026-09-08 的 24 小时窗口内 30 条评论最多 issue、20 条评论最多 PR。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 日报 — 2026-09-08

## 今日要点

Ollama 仓库的活跃度集中在三条战线上：落地 **MLX runner 上下文管理修复**（围绕 `num_ctx`、静态 YaRN 与前缀缓存对齐的一批 PR）、通过升级 llama.cpp 新增对 **Spark X2.5 架构**的支持，以及一波**硬件回归**——尤其是 Vulkan/AMD、Blackwell sm_120 的 flash-attention，以及 Windows 上 MLX 编译缓存刷日志的问题。过去 24 小时未发布新的带 tag 版本。

## 版本发布与破坏性变更

过去 24 小时没有新版本发布。

## 新模型与硬件支持

- **Spark X2.5 架构（SparkLLM/Spark-X2.5-4B / -1.7B，1M 上下文）**——`spark2_5` 已有需求提出，正在路上。Issue [#18195](https://github.com/ollama/ollama/issues/18195)（👍 6）跟踪原生支持进展，[#18290](https://github.com/ollama/ollama/issues/18290)（库标签请求）已作为重复项关闭。PR [#18279](https://github.com/ollama/ollama/pull/18279) 将 vendored llama.cpp 升级（`b10760 → b10829`），以获取上游的架构支持。
- **Tencent Hy4 预览版**——已在 [#18287](https://github.com/ollama/ollama/issues/18287) 中提出需求；尚未附上 GGUF 产物。
- **AMD ROCm gfx1200 (RX 9060 XT)**——该硬件首次现身：issue [#17782](https://github.com/ollama/ollama/issues/17782) 报告运行 `qwen3.8:27b` 几分钟后出现 `Could not load "TensileLibrary_lazy_gfx1200.dat"`。这是一个有用信号，表明 Ollama 正在触达更广泛的消费级 AMD 芯片。
- **NVIDIA Blackwell sm_120 (RTX 5070 Ti Laptop)**——通过 `qwen3-coder:30b` 首次得到实际使用；回归问题见下方 [#18276](https://github.com/ollama/ollama/issues/18276)。

## 性能与优化

- **MLX 前缀缓存截断，每次冷提示重新预填充耗时 17–27 秒**（[#18267](https://github.com/ollama/ollama/issues/18267)）。在 MLX runner 上，恢复的前缀缓存会落在匹配前缀下方 8192 token 的整数倍处，最多浪费 8191 个 token（对 Claude-Code 式 agent 流量 ≈17–27 秒）。目前尚未关联修复 PR——影响很大。
- **MLX runner：Qwen 静态 YaRN 上下文**（[#18263](https://github.com/ollama/ollama/pull/18263)）——解析 Qwen3.5/3.8 的静态 YaRN 元数据，将 YaRN 频率应用于文本 RoPE + 多模态 M-RoPE，并让 runner 遵循 `factor * original_max_position_embeddings`。相邻 PR [#18285](https://github.com/ollama/ollama/pull/18285) 改进了 `num_ctx` 的传递，而 [#18261](https://github.com/ollama/ollama/pull/18261)（现已关闭）此前已端到端强制执行上下文长度。
- **MLX runner：Qwen Code 启动对齐**（[#18258](https://github.com/ollama/ollama/pull/18258)）——通过 `ollama ps` 获取本地实际生效的上下文，并将其写入 Qwen Code 的 `generationConfig.contextWindow`。
- **GGUF 解析器整数溢出**（[#18291](https://github.com/ollama/ollama/pull/18291)）——`TensorInfo.NumValues()`/`NumBytes()` 此前执行未经检查的 `int64` 运算，外加一次 `float64` 往返转换；内部辅助函数中已有正确的防护，本 PR 使导出 API 与之对齐。
- **传输续传：收尾已等同于完整 blob 的 `.tmp` 文件**（[#18280](https://github.com/ollama/ollama/pull/18280)）——通过处理 tmp 文件实际已完整的情形，关闭了存在已久的 [#15320](https://github.com/ollama/ollama/issues/15320)。
- **服务端：当两个标签共享同一 blob 但需要不同 llama-server 标志时重载 runner**（[#18289](https://github.com/ollama/ollama/pull/18289)）——`schedulerModelKey()` 目前以 `ModelPath` 为键，因此由 Modelfile 派生的标签会继承本不该继承的标志。

## 稳定性与回归

按对生产用户的影响面排序。

1. **调度器在无法满足的上下文配置下陷入逐出循环**（[#18282](https://github.com/ollama/ollama/issues/18282)，**已关闭**）。带 `num_ctx 262144` 的 manifest 会让调度器循环逐出/重载 runner，而不是快速失败。已由 Kickflip73 关闭，并一并给出修复。
2. **`num_ctx` 在 OpenAI 兼容端点上被静默忽略**（[#16814](https://github.com/ollama/ollama/issues/16814)，**已关闭**）。`/v1/chat/completions` 和 `/v1/completions` 不转发 `num_ctx`；此前只有 `OLLAMA_CONTEXT_LENGTH` 生效。Vitaliy-Pikalo 的 PR [#16825](https://github.com/ollama/ollama/pull/16825) 修复了该问题。
3. **自 v0.32.9 以来的 Vulkan + AMD iGPU 回归**（[#18272](https://github.com/ollama/ollama/issues/18272)，👍 1）。AMD iGPU 上运行 66 GB 模型自 v0.32.12 起报 `Not enough memory for command submission` 失败；v0.32.9 仍正常。尚无修复 PR——临时对策是锁定旧版本。
4. **qwen3moe + Blackwell sm_120：预热阶段 flash-attention 崩溃**（[#18276](https://github.com/ollama/ollama/issues/18276)）。`qwen3-coder:30b` 在 RTX 5070 Ti Laptop 上于模型成功装入显存*之后*以 `0xc0000409` 退出（`CUDA error: shared object initialization failed`）；疑似与自动启用的 FA 有关。尚无修复 PR。
5. **Windows 上 MLX 编译缓存 `CHECK failed` 刷屏所有 ollama 命令**（[#18283](https://github.com/ollama/ollama/issues/18283)）。即使没有 MLX 硬件，`ollama list`、`ollama serve`、`ollama run` 也都会输出 `CHECK failed: mlx_compile_cache_new_`。尚无修复 PR。
6. **qwen2.5-coder:3b-instruct 的 q2_K / q3_K_S / q3_K_M / q3_K_L 模型库产物在 HumanEval+ 上得分 0/15**（[#18252](https://github.com/ollama/ollama/issues/18252)）。输出流畅但不可用；相邻量化档位不受影响。尚无修复 PR。
7. **gemma4:12b 工具调用解析器无法解析 `BEGIN_ARG`/`END_ARG`**（[#18275](https://github.com/ollama/ollama/issues/18275)）。陷入退化的 `<|channel|>thought` 循环，返回 HTTP 200 但没有任何可用内容。尚无修复 PR——PR [#18288](https://github.com/ollama/ollama/pull/18288) 处理的是 `Gemma4CollectingContent` 中相邻的闭合标签泄漏问题。
8. **`PARAMETER temperature 0` 在 `/api/chat` 上生效，但在 `/v1/chat/completions` 上仍会被采样**（[#17744](https://github.com/ollama/ollama/issues/17744)）。当请求省略 `temperature` 时，OpenAI 兼容端点会用服务器默认值覆盖 Modelfile 中的值。尚无修复 PR。
9. **`/v1/responses` 拒绝 `agent_message` 输入项**（[#18286](https://github.com/ollama/ollama/issues/18286)）。与 [#18284](https://github.com/ollama/ollama/issues/18284)（现已关闭）互为关联，后者还指出了工具调用的命名空间折叠问题——据反馈，Codex CLI 的多 agent 用法目前无法正常对接 Ollama。
10. **Ollama Cloud 忽略 JSON schema**（[#12362](https://github.com/ollama/ollama/issues/12362)）。`qwen3-coder:480b-cloud` 返回的 JSON 不遵循回复 schema，而本地 `qwen3-coder:30b` 则遵循。尚无修复 PR。
11. **会话中途频繁报 "model unavailable" 错误**（[#18293](https://github.com/ollama/ollama/issues/18293)）。间歇性出现；切换模型可暂时缓解。尚无修复 PR。
12. **`muse-glimmer:30b-mlx` NVFP4 卡在 "Stopping…" 并触发 watchdog**（[#18269](https://github.com/ollama/ollama/issues/18269)）。在 32 GB M4 Air 上持续存在；`ollama ps` 显示卡住状态。尚无修复 PR。
13. **`qwen2.5-coder`（v0.11.7/0.11.8）缺少 `tool_calls`**（[#12174](https://github.com/ollama/ollama/issues/12174)，👍 2）。长期存在的问题；尚无修复 PR。
14. **AMD gfx1200 运行中 `TensileLibrary_lazy_gfx1200.dat` 加载失败**（[#17782](https://github.com/ollama/ollama/issues/17782)）。能撑几分钟然后失败；尚无修复 PR。
15. **下载进度回退的老帖**（[#8484](https://github.com/ollama/ollama/issues/8484)，👍 30）在 20 个月后终于**关闭**。
16. **模型名称校验上限为 80 字符**（[#18274](https://github.com/ollama/ollama/issues/18274)）——修复 PR [#18278](https://github.com/ollama/ollama/pull/18278) 将上限提高到 96，与 HuggingFace 的 `repo_name` 限制对齐。

## 对应用开发者意味着什么

- **如果你依赖 OpenAI 兼容端点，请在 [#16825](https://github.com/ollama/ollama/pull/16825) 发布后锁定包含该修复的构建**：`num_ctx` 此前在 `/v1/chat/completions` 和 `/v1/completions` 上被静默丢弃，其外在表现可能是上下文被悄然截断。同一修复也意味着，Modelfile 中的 `temperature` 通过 `OLLAMA_*` 环境变量设置要比通过 `/v1` 端点设置更可靠。
- **调用 `/v1/responses` 的 Codex CLI / agent 类客户端**应预期 `agent_message` 项和带命名空间的工具调用会出现故障（[#18286](https://github.com/ollama/ollama/issues/18286)、[#18284](https://github.com/ollama/ollama/issues/18284)）。在 responses 端点成熟之前，agent 循环请优先使用 `/api/chat`。
- **Apple Silicon 上基于 MLX 的本地 agent**将在 [#18263](https://github.com/ollama/ollama/pull/18263) 落地后获得实质性更快的冷提示处理——它为 Qwen3.5/3.8 解锁静态 YaRN 扩展，并让 runner 遵循通过 `num_ctx` 请求的长上下文。现有的按 8192 对齐的前缀缓存重预填充（[#18267](https://github.com/ollama/ollama/issues/18267)）是当前 agent 工作负载上最大的单项延迟负担。
- **使用消费级 iGPU/APU 的 AMD Vulkan 用户**应锁定 **v0.32.9** 直至 [#18272](https://github.com/ollama/ollama/issues/18272) 修复；**运行 MoE 模型的 RTX 5070 Ti Laptop / Blackwell sm_120 用户**应在 [#18276](https://github.com/ollama/ollama/issues/18276) 得到处理前禁用 flash attention。**Windows + 非 Apple/CUDA 机器**将继续看到 MLX `CHECK failed` 日志刷屏（[#18283](https://github.com/ollama/ollama/issues/18283)）——不影响功能，但噪音不小。
- **拉取名称较长的 HuggingFace 仓库**将在 [#18278](https://github.com/ollama/ollama/pull/18278) 发布后恢复正常（80 → 96 字符）。如果你在用脚本对 HF 执行 `ollama pull`，当前的 80 字符限制可能已经在拒绝合法的仓库名。
- **Gemma 4 工具调用**（[#18275](https://github.com/ollama/ollama/issues/18275)）在较难的提示词下不可靠——请把 Gemma 4 的工具调用当作尽力而为，并在客户端校验 JSON 结构。
- **Spark X2.5（1M 上下文）登上 Ollama**只差几天：[#18279](https://github.com/ollama/ollama/pull/18279) 通过升级 llama.cpp 将其引入。请据此规划量化方案和磁盘预算——这些是 1M 上下文、~4 B 参数级别的检查点。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-08

## 今日要点

过去 24 小时的工作主要集中在**路由器正确性修复和 Anthropic 格式的边界情况**，这些会阻塞生产流量。尤其值得关注的是，PR #40132 针对 vLLM/Kimi K2.7 的 v1.91.0 `sanitize_tool_use_ids` 回归发布了一个定向修复（issue #32214），PR #40009 通过共享在途计数器解决了跨代理副本长期存在的最闲负载均衡漂移问题。在提供商方面，Hubris 作为新的 JSON 配置的 OpenAI 兼容提供商落地（#39897），而 Bedrock passthrough 和 Converse 翻译持续暴露出静默失败或格式错误的请求体（#34105、#30371、#40131）。

## 发布与破坏性变更

过去 24 小时内没有新版本发布。可能在下个版本中浮现的进行中变更：

- **Anthropic 工具 ID 处理重写**（#40132）— vLLM/Kimi passthrough 将不再破坏 `tool_use_id`。仍然会对 `azure_ai`、`github_copilot`、`bedrock`、`vertex_ai` 进行重写。Claude Code + vLLM 用户如果固定在 v1.91.0，应该在此变更落地后重新测试。
- **模型管理 `PATCH /model/{id}/update`**（#40047）— 显式的 `null` 现在将*清除* `max_input_tokens`、`mode` 和价格字段，而不是被静默丢弃。依赖 `null = no-op` 语义的运维人员应进行复核。
- **Langfuse 会话追踪**（#40134）— 多轮 Claude Code 会话将改为每轮发出一个 trace，而不是为每个会话头 upsert 单个 trace。

## 新模型与硬件支持

- **新提供商**：Hubris 作为 JSON 配置的 OpenAI 兼容提供商新增（[#39897](https://github.com/BerriAI/litellm/pull/39897)），通过 `litellm/llms/openai_like/providers.json` 注册，无需 Python 改动。
- **模型注册表更新**：
  - EmpirioLabs 价格/上下文已刷新（[#37972](https://github.com/BerriAI/litellm/pull/37972)）
  - `openrouter/openai/gpt-5.6-sol` 在 `model_prices_and_context_window.json` 中缺失（[#40102](https://github.com/BerriAI/litellm/issues/40102)）— 开放中
- **Gemini 检测**：PR #37145 将 Gemini 3+ 检测从 `gemini-3` 子串匹配切换为主版本号检查。这将解锁 `gemini-flash-latest`（解析为 Gemini 3.x），并预先支持当前因 `400 missing a thought_signature` 在工具调用重放时失败的 `gemini-4-*` 别名。

## 性能与优化

- **最闲路由器**（[#40009](https://github.com/BerriAI/litellm/pull/40009)）— 用按部署键控的单一计数器替换每个进程的在途计数器，在 worker/副本间共享。消除了支持流式的部署因 worker 写入陈旧计数而被饿死的失败模式。
- **路由器重试逻辑**（[#40014](https://github.com/BerriAI/litellm/pull/40014)，已关闭）— `BadRequestErrorRetries` 和 `ContentPolicyViolationErrorRetries` 不再重新选择刚刚拒绝请求的部署，因为 400 永远不会让部署下线。
- **流式响应头**（[#40091](https://github.com/BerriAI/litellm/pull/40091

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 日报 — 2026-09-08

## 1. 今日要点

当日的 PR 动态主要围绕 **Unsloth Studio 加固**：OpenAI 流式 API 一致性(将 UI 帧置于 `X-Unsloth-Events` 门控之后)、MCP 工具图像透传、MLX 内存规划、一个会将内存溢出与 llama.cpp 自身适配逻辑进行权衡的卸载规划器，以及若干已随修复落地的崩溃/清理/UX 回归问题。**核心包**方面的关注点则集中在 torch/torchcodec 安装正确性(CUDA 12.8、XPU、MLX 自愈)，以及一个长期存在的 **Intel Arc B580 导入失败**问题——尽管近期重新有了讨论，该问题仍未解决。过去 24 小时内没有发布任何新版本。

## 2. 发布与破坏性变更

过去 24 小时内无发布。

有一项 API 行为变更已在 PR 中就绪，值得向下游用户提示：
- **OpenAI 流控制帧门控**([PR #10362](https://github.com/unslothai/unsloth/pull/10362))—— `/v1/chat/completions` 只会在通过 `X-Unsloth-Events: 1` 显式开启时，才复用 Unsloth 的 `tool_*` / `reasoning_summary` / `diffusion_frame` 帧。目前严格的 OpenAI 客户端会因这些帧不含 `choices` 而无法通过 schema 校验。

## 3. 新模型与硬件支持

- **Gemma 4 base(非 instruct)推理** —— 已为 E2B/E4B/31B/26B-A4B 系列及 `-unsloth-bnb-4bit` 变体发布 `add_bos_token` 修复([PR #10312](https://github.com/unslothai/unsloth/pull/10312),关闭 [#7903](https://github.com/unslothai/unsloth/issues/7903))。缺少此修复时，base 模型推理会退化为重复输出文本。
- **Studio 中 MLX(Apple Silicon)的内存估算** —— 新增非 GGUF 的规划器路径，使 MLX 加载在内存面板中显示真实数值，并让未固定的上下文长度适配可用内存([PR #10287](https://github.com/unslothai/unsloth/pull/10287))。
- **Intel XPU 训练** —— 在路由级 VRAM 协调之前，`adamw_torch` 现已被规范化为 XPU 上唯一的 bnb 8-bit 路径([PR #10213](https://github.com/unslothai/unsloth/pull/10213))。
- **AMD ROCm 上 Wan2.2 TI2V 缺少融合注意力** —— `RX 9060 XT` 回退到 SDPA math 并发生 OOM;没有可用的融合内核([#10415](https://github.com/unslothai/unsloth/issues/10415))。暂无修复 PR。
- **Intel Arc B580** —— 仍在 `unsloth_zoo/temporary_patches/gpt_oss.py:540` 处因 `torch.xpu.memory.mem_get_info()` 导入失败([#3533](https://github.com/unslothai/unsloth/issues/3533))。已有 15 条评论，尚无解决方案。

## 4. 性能与优化

- **智能卸载规划器(UNSLOTH_SMART_OFFLOAD)** —— 成本门控、子 FFN 溢出阶梯、上下文感知的设备预留、针对 `llama-server` 调优的启动顺序([PR #9872](https://github.com/unslothai/unsloth/pull/9872),相关工作线跟踪于 [#9861](https://github.com/unslothai/unsloth/issues/9861))。
- **投机解码可观测性** —— 功能请求：暴露来自 llama.cpp `--model-draft` 与 Studio MTP drafter sidecar 的 draft/target 接受率([#10401](https://github.com/unslothai/unsloth/issues/10401))。目前尚无具体数字；当前的决策指标是靠肉眼观察 tokens/sec。
- **Apple Silicon MLX 安装路径** —— `--no-torch` 不再在首次启动时静默自愈为 MLX 安装([PR #10409](https://github.com/unslothai/unsloth/pull/10409))。
- **NVIDIA X11 上 Linux AppImage 的 WebKit 性能** —— 修复 `sync_file` 描述符泄漏，恢复了 WebKit 加速合成([PR #10214](https://github.com/unslothai/unsloth/pull/10214))。
- 已有报告称 **Studio 持续占用 CPU**([#10390](https://github.com/unslothai/unsloth/issues/10390))—— 尚无修复。

## 5. 稳定性与回归

大致按对基础设施的影响程度排序：

- **Studio 在信号退出时的清理崩溃** —— [#10369](https://github.com/unslothai/unsloth/pull/10369) 的后续；又暴露出第二个 P2。修复已在 [PR #10430](https://github.com/unslothai/unsloth/pull/10430) 中就绪。
- **torchcodec 安装矩阵错误**
  - cu128 没有可用的 `torchcodec>=0.12`,但 ABI 稳定豁免被静默视为已满足([#10434](https://github.com/unslothai/unsloth/issues/10434))。
  - Studio 安装器把 `torch 2.3`/`2.4` 映射到 `torch 2.10` 对应的 torchcodec 版本线(`torchcodec>=0.10,<0.11`)([#10433](https://github.com/unslothai/unsloth/issues/10433))。
  - 修复候选:[PR #10414](https://github.com/unslothai/unsloth/pull/10414)(从 #7474 拆分)在 notebook 校验器中重申 torch/torchcodec 契约。
- **AMD ROCm:勾选 "No Ram Offload" 后模型仍驻留 RAM**([#10341](https://github.com/unslothai/unsloth/issues/10341),W7900/W7500)。
- **AMD ROCm:Wan2.2 TI2V OOM**,原因是 RX 9060 XT 缺少融合注意力 / SDPA math 回退([#10415](https://github.com/unslothai/unsloth/issues/10415))。
- **Qwen3.5 9B 始终到不了第一步 + Gemma 4 26B-A4B QLoRA 在 96 GB 上 batch 1 即 OOM**([#7203](https://github.com/unslothai/unsloth/issues/7203))。
- **Qwen3.6 35B-A3B 通过 MLX API 调用失败**，base64 和 URL 图像输入均不行([#10389](https://github.com/unslothai/unsloth/issues/10389))。
- **`--tensor-split` 被忽略** —— 让报告者损失了数小时；尚无修复([#10355](https://github.com/unslothai/unsloth/issues/10355))。
- **切换下载文件夹后 GGUF 量化文件消失**([#10437](https://github.com/unslothai/unsloth/issues/10437))—— 修复见 [PR #10438](https://github.com/unslothai/unsloth/pull/10438)(原因是仓库级去重隐藏了第二份副本)。
- **点击 Stop / 更改设置时提示词队列被清空**([#10428](https://github.com/unslothai/unsloth/issues/10428))—— 修复见 [PR #10445](https://github.com/unslothai/unsloth/pull/10445)(Composer 的 Stop 现在改为暂停而非删除运行)。
- **API 认证**
  - 238 字符 API key 上出现 `RSAES-OAEP: input message length is too long`([#10411](https://github.com/unslothai/unsloth/issues/10411))。
  - harness 发送空的 `Authorization: Bearer` 时，无密钥认证被拒绝([#10400](https://github.com/unslothai/unsloth/issues/10400))。
- **Studio UX / API 正确性**
  - "Tell the model today's date" 会覆盖 Ollama Modelfile 的 SYSTEM 提示词([#10436](https://github.com/unslothai/unsloth/issues/10436))。
  - 设置页与 API 面板中 Remote/LAN 访问条目重复([#9519](https://github.com/unslothai/unsloth/issues/9519))。
  - 工作区中带 `.cs/.php/.js/…` 扩展名的文件仍无法读取/写入/索引([#10300](https://github.com/unslothai/unsloth/issues/10300))。
  - 卸载后仍残留磁盘空间；用户必须手动运行 `uv cache clean`([#9651](https://github.com/unslothai/unsloth/issues/9651))。
  - 可通过 Paramiko 绕过 SSH 黑名单([#10397](https://github.com/unslothai/unsloth/issues/10397))。
  - 工作区 Code 工具输出被隐藏，没有 `.html` 预览([#10425](https://github.com/unslothai/unsloth/issues/10425))。

## 6. 对应用开发者意味着什么

- **在 CUDA 12.8 主机上固定你的 torch/torchcodec 配对。** 目前无论 `>=0.12` ABI 稳定线还是旧的按 minor 版本映射，安装路径都不可靠。在 [PR #10414](https://github.com/unslothai/unsloth/pull/10414) 落地之前，部署前请手动校验。
- **如果你用严格的 OpenAI 客户端调用 `/v1/chat/completions`**,请预期 [PR #10362](https://github.com/unslothai/unsloth/pull/10362) 合并后的行为变更：tool/reasoning/diffusion 帧将默认关闭；发送 `X-Unsloth-Events: 1` 可保留它们。
- **MCP 工具图像现在能送达模型了。** 此前，MCP 返回的图像只在 UI 中展示，从不发送给模型([PR #10088](https://github.com/unslothai/unsloth/pull/10088),修复 [#10057](https://github.com/unslothai/unsloth/issues/10057))。一旦该修复发布，读取 MCP 图像内容的构建应开始正常工作。
- **Apple Silicon 上的 Studio 部署**将获得真实的 MLX 内存估算([PR #10287](https://github.com/unslothai/unsloth/pull/10287))和不再泄漏的 `--no-torch` 安装([PR #10409](https://github.com/unslothai/unsloth/pull/10409))—— 如果你发布仅含 GGUF 的 Mac 构建，这会很有用。
- **投机解码的 ROI** 终将变得可度量([#10401](https://github.com/unslothai/unsloth/issues/10401))。如果你计划进行 draft 模型搭配，值得持续关注。
- **AMD ROCm 用户应默认新视频模型(Wan2.2 TI2V)没有融合注意力**，并为 SDPA math 回退的内存占用做好预算。
- **XPU 长尾问题依旧存在** —— Intel Arc B580 导入仍未修复([#3533](https://github.com/unslothai/unsloth/issues/3533));不要宣传 Unsloth 对该 GPU 的支持。

---

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — 每日摘要
**日期：** 2026-09-08
**仓库：** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. 今日要点

过去 24 小时内没有新版本发布，因此今天的关注点集中在社区报告的集成缺陷上：企业自建的 OpenAI 兼容接口无法被识别为支持的协议；Claude Cowork 的 `WebSearch` 工具与 CCR 在 Fusion 流水线中的归一化逻辑发生冲突，导致该客户端的网络搜索功能不可用。此外，一个小型的构建配置 PR（#1764）通过移除已弃用的 `baseUrl` tsconfig 选项，为代码库适配 TypeScript 7 做了准备。

---

## 2. 版本发布与破坏性变更

*过去 24 小时内没有新版本发布。无需迁移。*

---

## 3. 新模型与硬件支持

*今日无新增模型、架构、后端或量化支持相关报告。*

---

## 4. 性能与优化

*今日无性能、吞吐量、延迟、内存或内核相关的工作落地或讨论。*

---

## 5. 稳定性与回归问题

以下为过去 24 小时内报告的问题，按可能严重程度排序：

- **[高] 工具名归一化导致 Claude Cowork 的网络搜索失效** — [#1766](https://github.com/musistudio/claude-code-router/issues/1766)（未关闭）
  Cowork 将其网络搜索能力注册为名为 `WebSearch` 的函数工具（camelCase 命名，无分隔符）。CCR 在 Fusion 中的三处匹配检查（`=== "web_search"`、`endsWith("_web_search")`、`includes("search_web")`）都在一次 `toLowerCase().replace(/[-.]/g, "_")` 归一化之后才执行，因此 `WebSearch` 会被折叠为 `websearch`，无法命中任何一种模式。结果是：任何使用 Cowork 的 Claude 变体的 `web_search` 调用都会被静默地不触发。一条能拆分 camelCase 的归一化规则（或直接匹配原始 token）可以修复此问题。**目前尚无修复 PR。**

- **[中] 自建的企业 OpenAI 兼容接口未被识别为受支持** — [#1765](https://github.com/musistudio/claude-code-router/issues/1765)（未关闭）
  用户内部托管本地模型（Deepseek、Gemma）的 OpenAI 兼容 API 在 CCR 的协议检测路径中被拒收，而 Open WebUI 和直接的 `curl` 请求则工作正常。CCR 在 DeepInfra 上表现正确，说明此回归问题特定于非厂商、非公网的 OpenAI 兼容主机——可能涉及严格的路径、请求头或模型列表探测。**目前尚无修复 PR；帖子中附有 curl 复现请求细节。**

- **[低] TypeScript 7 向前兼容的构建警告** — [#1764](https://github.com/musistudio/claude-code-router/pull/1764)（未关闭）
  `tsconfig.base.json` 仍在使用 `baseUrl`，该选项在 TypeScript 6 中已弃用，并将在 TypeScript 7 中被拒绝。仓库当前固定使用 `tsc@5.9.3`，所以 CI 暂时安静，但任何使用较新编辑器的开发者已经能看到该警告。该 PR 移除了 `baseUrl`，并将引用方迁移到相对路径。纯属代码整洁性工作，对运行时无影响。

---

## 6. 对应用开发者的意义

- **Cowork 用户：网络搜索将被静默禁用。** 如果你将 Cowork 流量通过 CCR 进行路由并启用了 Fusion，`WebSearch` 工具调用今日会无响应。临时方案：在 Cowork 会话中禁用 Fusion 的网络搜索工具，或在 [#1766](https://github.com/musistudio/claude-code-router/issues/1766) 解决之前改用非 Fusion 的 transformer。在生产环境的 Cowork 流程中依赖检索功能前，请先跟踪该 issue。
- **自托管的 OpenAI 兼容栈：部署前请先验证。** 如果你在企业防火墙之后通过 OpenAI 形态的 `/v1` 端点代理本地模型（Deepseek、Gemma、Qwen 等），请在正式采用前先用 CCR 对该路径进行冒烟测试。当前的检测逻辑似乎更偏向知名公网主机（[#1765](https://github.com/musistudio/claude-code-router/issues/1765)）。建议固定到一个已知可用的版本，并在提交报告时附上协议检测阶段的日志。
- **插件/Transformer 作者：请注意 camelCase 命名的工具名。** 如果你编写自定义 transformer，不要假设传入的工具名已经是 snake_case。CCR 的内部归一化只会剥离 `-` 和 `.`，对 camelCase 不做处理——这意味着任何使用 `XxxYyy` 命名的上游工具都可能被字符串匹配器遗漏。
- **使用较新 TypeScript 的贡献者：** `tsconfig` 的清理工作（[#1764](https://github.com/musistudio/claude-code-router/pull/1764)）改动小且审查/合入风险低，预计会作为日常维护很快落地。
- **总体态势：** 版本发布方面是平静的一天，但 24 小时内浮出了两处切实的集成尖刺——且都面向用户可见（搜索失效、端点检测失效）。如果你依赖 CCR 进行生产环境的路由，请固定你的版本并订阅这两个 issue。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 简报 — 2026-09-08

## 今日要点

v3.20.2 以兼容性修复补丁的形式发布，核心目标是让 **Grok 通过 xAI 原生 Responses API 经 Codex 路由实现端到端可用**，一次性解决了四个相互纠缠的 schema/鉴权不匹配问题（xAI 的工具 schema 拒绝、Codex 的 int/float 强制转换、多智能体邮箱注入，以及 Codex 的 role model 字符串）。“以 Codex 为路由”的版图持续扩张，迎来了新的供应商集成（GitHub Copilot、Token Market、QianwenAI/QwenCloud）；与此同时，一个存在已久的回归问题——Claude Code `settings.json` 在每次切换供应商时被整体重写——终于关闭。

---

## 版本发布与破坏性变更

- **[v3.20.2](https://github.com/farion1231/cc-switch)** —— 聚焦 Codex 的兼容性版本：
  - Grok 现可通过 xAI 原生 Responses API 经 Codex 路由；修复了工具 schema 拒绝、int/float 强制转换、role-model 不匹配以及多智能体邮箱注入等问题
  - Grok OAuth 卡片不再被 v3.20.1 的切换门控拦截
  - 接管 Codex 后不再使 Codex 卡在登录界面
  - GPT-6 通过 Codex OAuth 使用时不再报 “Codex update required”
  - 给 v3.20.1 用户的提示：建议升级；其中 OAuth 切换门控的修复尤其重要，它消除了上一个次版本引入的非预期阻断

---

## 新模型与硬件支持

- **通过 xAI 原生 Responses API 接入 Grok**（v3.20.2）——一等公民级支持：Grok 经 Codex 的 `/responses` 端点路由，而非回退到 Chat Completions。
- **GitHub Copilot 作为托管的 Codex 供应商** —— [PR #7157](https://github.com/farion1231/cc-switch/pull/7157) 引入能力驱动的路由：本地 Responses 代理依据每个模型的 `supported_endpoints` 在 Responses 与 Chat Completions 之间进行选择，并处理鉴权与响应适配。默认模型已预先配置。
- **DeepSeek Harness（DSH）应用支持** —— [PR #6526](https://github.com/farion1231/cc-switch/pull/6526) 新增 DSH 应用类型与供应商写入器，与官方 Harness / DSH Desktop 的配置布局保持一致（`~/.dsh/settings.yaml`、`DSH_HOME` 覆盖、`baseURL` 字段）。配套的用量导入器见 [PR #6724](https://github.com/farion1231/cc-switch/pull/6724)，可读取 zstd 压缩的 JSONL 会话账本。
- **QianwenAI / QwenCloud 预设** —— [PR #7183](https://github.com/farion1231/cc-switch/pull/7183) 将国内 DashScope（百炼）预设更名为 **千问AI平台**，并在全部七个受支持应用（Claude Code、Claude Desktop、Codex、Hermes、OpenClaw、OpenCode、Pi）中刷新整个 Qwen 3.8 系列。关闭了 [#6214](https://github.com/farion1231/cc-switch/issues/6214) 中此前提出的 `Bailian → QwenCloud` 请求。
- **Token Market 预设** —— [PR #7184](https://github.com/farion1231/cc-switch/pull/7184) 为 Claude Code/Desktop（Anthropic Messages）、Codex（Responses）以及 OpenCode/OpenClaw/Hermes（Chat Completions）新增 Token Market。
- **Codex 中的 DeepSeek 视觉能力** —— 修复了经 Codex 路由的 DeepSeek 模型的图片上传管线；参见 [Issue #6998](https://github.com/farion1231/cc-switch/issues/6998)。
- **通过 Codex OAuth 使用 GPT-6** —— “needs Codex update” 错误已在 v3.20.2 中解决；GPT-6-ASTRA 对 Claude Code 报 400 的问题已通过 [PR #7131](https://github.com/farion1231/cc-switch/issues/7131) 处理。

---

## 性能与优化

- **Claude Code Auto Mode 的分类器队列** —— [PR #6602](https://github.com/farion1231/cc-switch/pull/6602) 将 Auto Mode 在执行 Bash 之前发出的安全分类器请求，路由到一条与对话路径*完全独立*的供应商链（不同的 `base_url` + 凭据）。它覆盖了跨供应商扇出与供应商故障转移两种场景，是对 #4987/#6113 中供应商内缓存复用工作的补充。分类请求采用三种相互独立的请求签名，以规避 Claude 侧基于指纹的识别。
- **每供应商多 API Key** —— [PR #7188](https://github.com/farion1231/cc-switch/pull/7188)（及已关闭的对应提案 [#7186](https://github.com/farion1231/cc-switch/pull/7186)）让每个供应商可配置多个 API Key，支持备注与单选激活，覆盖 Claude/Codex/Gemini/OpenCode/OpenClaw/Hermes 各表单。对旧式单字符串存储向后兼容。这是迄今发布的最为务实的本地故障转移原语；关闭了 [#7185](https://github.com/farion1231/cc-switch/issues/7185)。
- **Prompts 列表刷新** —— [PR #7194](https://github.com/farion1231/cc-switch/pull/7194) 在加载 Prompts 列表及面板重新获得焦点时，从磁盘重新读取 `CLAUDE.md` / `AGENTS.md`，消除外部编辑后残留的过期条目。
- **TypeScript 7 就绪** —— [PR #7193](https://github.com/farion1231/cc-switch/pull/7193) 移除了已弃用的 `baseUrl` tsconfig 选项，使项目在 TS 7.0 下无需 `ignoreDeprecations` 垫片即可干净构建。
- **依赖项变动** —— [PR #7195](https://github.com/farion1231/cc-switch/pull/7195)（52 项 cargo 更新）与 [#7100](https://github.com/farion1231/cc-switch/pull/7100)（51 项更新，已关闭）升级了 `serde_json`、`serde`、`log` 以及更广的 Tauri 侧 crate 集合。属例行更新，但若你维护 vendored fork 则值得留意。

---

## 稳定性与回归

按用户影响程度及在开放/已关闭 issue 中的复现情况排序：

| 严重程度 | 问题 | 状态 | 备注 |
|---|---|---|---|
| **高** | [Codex 心跳注入缺少 `call_id` 的 `function_call_output` → DeepSeek `/responses` 400 → 会话永久卡死](https://github.com/farion1231/cc-switch/issues/6995) | 开放 | 无法自愈；必须新建会话线程。仅在 CC Switch 经 Responses 代理到 DeepSeek 时复现。 |
| **高** | [本地代理处理 Codex `/responses` 失败 → Kimi For Coding 400](https://github.com/farion1231/cc-switch/issues/6861)、[→ Zhipu GLM 400](https://github.com/farion1231/cc-switch/issues/7142)、[→ Kimi 400](https://github.com/farion1231/cc-switch/issues/6968)、[→ 经 Kimi 路由到 Codex 桌面端 400](https://github.com/farion1231/cc-switch/issues/6942) | 均已在 v3.20.2 前后关闭 | 一类反复出现的问题：Codex 对 Responses 线上格式（wire format）的预期与第三方供应商的校验不匹配。接入新供应商时值得持续关注。 |
| **高** | [路由模式强制 `requires_openai_auth = true`，导致 Codex 绕过代理直连 OpenAI 鉴权](https://github.com/farion1231/cc-switch/issues/4393) | 已关闭 | 受影响会话的路由被静默绕过；与 [#5672](https://github.com/farion1231/cc-switch/issues/5672) 根因相同（旧的账号绑定会话仍在请求 `api.openai.com`）。 |
| **高** | [`/v1/images/generations` 未被代理 → 404](https://github.com/farion1231/cc-switch/issues/5429) | 已关闭 | 最初仅代理了 `/v1/chat/completions` 和 `/v1/responses`。 |
| **中** | [Claude Code `settings.json` 每次切换时被整体重写 → `enabledPlugins`、`statusLine` 被清空](https://github.com/farion1231/cc-switch/issues/3631) | 已关闭 | 社区长期痛点（12 条评论、7 个 👍）。`claude-hud` 等插件和自定义状态栏在每次切换时都会被静默重置。 |
| **中** | [切换到第三方后，Codex Desktop 旧会话仍持续请求 `api.openai.com` → 401](https://github.com/farion1231/cc-switch/issues/5672) | 开放 | 即使设置 `preserveCodexOfficialAuthOnSwitch = true`，账号绑定会话仍会绕过代理。新会话工作正常。 |
| **中** | [配额耗尽 → 切换供应商无法更换模型](https://github.com/farion1231/cc-switch/issues/7056) | 开放 | 出现在 2026.9.2 之后的 Codex 更新；上游 429 之后，模型更换路径似乎被卡死。 |
| **中** | [Codex `/responses` 工具调用 `arguments` 解析失败时只报笼统错误而非根因](https://github.com/farion1231/cc-switch/issues/5001) | 开放 | 影响运维排查；掩盖了上游拒绝的真实原因。 |
| **中** | [Claude Desktop + 阿里云百炼代理在 IPv6 NLB 失效时挂起约 150 秒（无 happy-eyeballs）](https://github.com/farion1231/cc-switch/issues/5096) | 开放（停滞） | 影响对 `token-plan.cn-beijing.maas.aliyuncs.com` 使用 Anthropic-Messages 协议；纯 IPv6 或 v6 异常的双栈用户会遇到 150 秒的停滞。 |
| **中** | [Codex 供应商的 `base_url` 编辑未同步到 `provider_endpoints.url`](https://github.com/farion1231/cc-switch/issues/5099) | 开放（停滞） | 模型列表和测试调用仍请求旧 URL。 |
| **低** | [自定义供应商的自签名 HTTPS 证书 → 代理 502](https://github.com/farion1231/cc-switch/issues/5042) | 开放（停滞） | |
| **低** | [OpenCode 缺少 `x-opencode-session` 请求头 — 上游自 09/06 起开始拒绝](https://github.com/farion1231/cc-switch/issues/7088) | 开放 | 大概率只需一行修复；跟进的是上游 OpenCode 的收紧策略。 |
| **低** | [更新检查失败时，更新器吞掉命令错误详情](https://github.com/farion1231/cc-switch/pull/6482) | PR 已关闭 | 修复已合入仓库。 |
| **低** | [Codex 托管账户的悬空绑定阻碍重新绑定/切换离开](https://github.com/farion1231/cc-switch/pull/7060) | PR 已关闭 | [PR #7060](https://github.com/farion1231/cc-switch/pull/7060) 现在会在持久化存储与内存不同步时自动恢复，同时保留 Codex 原生凭据。 |

---

## 对应用开发者意味着什么

- **多供应商故障转移如今已是一等能力。** 将**每供应商多 API Key**（[#7188](https://github.com/farion1231/cc-switch/pull/7188)）与**分类器队列**（[#6602](https://github.com/farion1231/cc-switch/pull/6602)）结合，你可以构建：(a) 同一供应商内按请求粒度的模型故障转移；(b) 分类器流量走与对话流量完全分离的供应商链。凭这些就足以构建一个在供应商故障时能自愈的智能体运行时，无需应用层重试逻辑。
- **Codex 正在成为真正的 Responses API 网关。** [PR #7157](https://github.com/farion1231/cc-switch/pull/7157) 的能力驱动路由意味着单个 Codex 客户端可根据每个模型声明的端点，透明地扇出到 Responses 或 Chat Completions 供应商。如果你要构建一个面对异构上游 API 也能“开箱即用”的智能体，那么 Codex 供应商表单如今是最务实的切入点。
- **Claude Code `settings.json` 的语义对集成方很重要。** 已关闭的 [#3631](https://github.com/farion1231/cc-switch/issues/3631) 确认了项目现在会在切换供应商时保留 `enabledPlugins`、`statusLine` 等用户自管的键——插件和状态栏脚本不会再无声消失。如果你发布 Claude Code 插件或状态 HUD，你的安装状态现在在切换模型时保持稳定。
- **持续关注 Codex Responses 与第三方供应商的互操作矩阵。** v3.20.2 的大部分改动（Kimi、Zhipu GLM、GPT-6、Grok、DeepSeek）都集中在这条接缝上。如果你通过 Codex 代理新的供应商，请重点测试：心跳自动化、工具调用 `arguments` 解析路径、图片生成，以及 OAuth 绑定的旧会话——这些是历史上的故障高发面。
- **运维可观测性缺口犹存。** [Issue #5001](https://github.com/farion1231/cc-switch/issues/5001)（Codex `/responses` 上笼统错误掩盖真实上游原因）仍处于开放状态。在修复落地之前，在生产环境排查 400 错误时，请做好在上游侧开启详细日志的准备。
- **网络卫生。** 如果你对接的是阿里云百炼或任何双栈上游，[#5096](https://github.com/farion1231/cc-switch/issues/5096) 表明代理层并未启用 happy-eyeballs——在上游解决此问题之前，请在操作系统层面禁用 IPv6，或在路由策略中固定使用 IPv4。

---

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 简报 — 2026-09-08

## 1. 今日要闻

**v1.0.0-rc.35 发布**，带来了重新设计的两层任务插件控制系统，并新增对阿里巴巴 **Wan 3.0** 视频模型的支持，是本周期对用户配置影响最大的变更([发布](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.35),[PR #7240](https://github.com/QuantumNous/new-api/pull/7240))。可靠性方面，24 小时内共有三个不同的**计费正确性 bug** 被提出或修复 —— Responses 流式响应在 `incomplete` 时的 usage 处理、缓存命中时图像 token 重复计费，以及非流式请求断连后继续扣费 —— 且各自都有配套 PR。全新的**按渠道 TTFB 流式超时与自动回退**机制([PR #7228](https://github.com/QuantumNous/new-api/pull/7228))是当前进行中影响最大的可靠性特性。

---

## 2. 版本发布与破坏性变更

### v1.0.0-rc.35 — “Wan 3.0 视频、插件路由”

**任务插件控制简化为两层**(总开关 + 按插件开关)。这是一项值得向运维人员明确提示的行为变更：

- **禁用插件后不再回退到同名内置插件**，同名模型也不会继续由内置插件处理。此前的隐式回退行为现在改为了显式禁用。
- **内置插件现在会回显请求中的模型名**(遵循模型重定向)，而不是上游真实的模型 ID。这影响的是仪表盘/日志展示的内容，不影响上游实际收到的请求。
- 插件路由策略已重新梳理 —— 请检查所有依赖旧回退语义的自动化流程。

### Schema / 迁移说明

- [#7234](https://github.com/QuantumNous/new-api/issues/7234)(已关闭)请求提供逐版本的 SQL 升级脚本；问题尚未解决。
- 除上述插件开关变更外，rc.35 公告中没有包含其他明确的迁移说明。

---

## 3. 新模型与硬件支持

| 条目 | 状态 | 参考 |
|------|--------|-----------|
| **阿里巴巴 Wan 3.0 一体化视频**(T2V / I2V / R2V / Edit) | 已合并(rc.35) | [PR #7240](https://github.com/QuantumNous/new-api/pull/7240), [PR #7244](https://github.com/QuantumNous/new-api/pull/7244)(评审) |
| **阿里巴巴 Wan 2.7 视频**系列 | 已合并 | [PR #4078](https://github.com/QuantumNous/new-api/pull/4078) |
| **华为 MaaS 渠道类型** | PR 待合并 | [PR #7239](https://github.com/QuantumNous/new-api/pull/7239), [Issue #7236](https://github.com/QuantumNous/new-api/issues/7236) |
| **xAI Grok Imagine Video** 异步任务路由 | Issue 待处理 | [Issue #7251](https://github.com/QuantumNous/new-api/issues/7251)(相关未修复 bug [#6358](https://github.com/QuantumNous/new-api/issues/6358)) |
| **OCR 模型**(PaddleOCR、DeepSeek OCR) | 停滞中的功能增强请求 | [Issue #2597](https://github.com/QuantumNous/new-api/issues/2597) |
| **Rerank 模型在渠道测试中被误判为 embedding** | 修复 PR 待合并 | [PR #7181](https://github.com/QuantumNous/new-api/pull/7181) |
| **Gemini 归一化思考等级**(relaykit 已接受) | 修复 PR 待合并 | [PR #7245](https://github.com/QuantumNous/new-api/pull/7245) |

过去 24 小时内没有出现新的硬件后端(CUDA / ROCm / Metal / NPU)或量化格式方面的工作 —— new-api 在传输层是供应商无关的，其方向是持续扩展上游覆盖，而非本地推理。

---

## 4. 性能与优化

- **按渠道 TTFB(首 token)超时与自动回退** —— [PR #7228](https://github.com/QuantumNous/new-api/pull/7228)。当上游返回响应头之后、首个数据块之前发生停滞时，此前请求只能等待完整的流式超时。新特性会在 TTFB 边界快速失败，并通过现有的回退逻辑重新路由。具体数值取决于运维配置的值；该 PR 新增了按渠道配置项并集成了回退逻辑。
- **透传模式现在会应用渠道的 `model_mapping`** —— [PR #7249](https://github.com/QuantumNous/new-api/pull/7249)。关闭了 [#6002](https://github.com/QuantumNous/new-api/issues/6002) 和 [#6639](https://github.com/QuantumNous/new-api/issues/6639)。此前透传会原样转发客户端的公开模型名，导致上游返回 404;现在 `ModelMappedHelper` 会重写用于下游的请求体副本。从运维角度看这是一个正确性修复，同时也避免了模型误路由时被强制回退重试。
- **Chat → Responses 转换发出正确的推理事件名** —— [PR #7114](https://github.com/QuantumNous/new-api/pull/7114)。流式 `reasoning_content` 现在发出 `response.reasoning_text.delta` 而非 `response.reasoning_summary_text.delta`,修复了因字段错误而崩溃的消费端解析器。

---

## 5. 稳定性与回归

按对运维和计费完整性的影响程度排序。

### 🔴 高 —— 计费 / 收入正确性

| Issue | 描述 | 状态 |
|-------|-------------|--------|
| [#7241](https://github.com/QuantumNous/new-api/issues/7241) | `/v1/responses` 流式响应在 `response.incomplete` 时**丢弃 usage**，该请求被计费为零。影响 rc.30。 | **修复 PR 待合并**:[#7242](https://github.com/QuantumNous/new-api/pull/7242) |
| [#7231](https://github.com/QuantumNous/new-api/issues/7231) | 非流式请求客户端超时后，上游请求仍在运行；rc.25 上用户会**在断连后被扣费**。 | 已关闭(仅提供复现步骤 —— 后续进展请查看发布说明) |
| [#7230](https://github.com/QuantumNous/new-api/pull/7230) | 缓存命中包含图像时，**图像 token 被重复计费**。 | **修复 PR 待合并** —— 对应 #7229 |
| [#7209](https://github.com/QuantumNous/new-api/issues/7209) | 计费插件化提案。 | 已关闭(追踪用) |

### 🟠 中 —— 正确性 / 功能

| Issue | 描述 | 状态 |
|-------|-------------|--------|
| [#7252](https://github.com/QuantumNous/new-api/issues/7252) | Ollama 流式响应中，当 `tool_calls` 出现在最后的 `done:true` 帧时会被**丢弃**(如 `qwen3-coder`)。在 rc.35 上报告。 | 待处理 |
| [#7194](https://github.com/QuantumNous/new-api/issues/7194) | 视频生成完成但产物预览失败；任务状态 404。影响 rc.30。 | 待处理 |
| [#6358](https://github.com/QuantumNous/new-api/issues/6358) | `xAI grok-imagine-video` 已在模型列表中公布，但路由返回 `invalid_api_platform: 48`。 | 待处理 |
| [#7235](https://github.com/QuantumNous/new-api/issues/7235) | `kimi-k3` 在 rc.34 上的动态工具调用异常。 | 已关闭 |
| [#2542](https://github.com/QuantumNous/new-api/issues/2542) | `gpt-5.2` 请求中的 `role:system` 被强制改写为 `role:developer`,导致上游拒绝。 | 已关闭 |
| [#7247](https://github.com/QuantumNous/new-api/issues/7247) | **Higress AI 网关**发送的 `Transfer-Encoding: chunked` 请求体无法被 new-api 解析(400 invalid JSON)。因未确认复现路径而关闭 —— 使用上游 mesh 网关的用户请留意。 | 已关闭(缺少复现) |

### 🟡 低 —— 流程 / 开发体验

- [#7234](https://github.com/QuantumNous/new-api/issues/7234) 逐版本 SQL 升级脚本工作流。
- [#7210](https://github.com/QuantumNous/new-api/issues/7210) 费率设置 UX 反馈。
- [#6679](https://github.com/QuantumNous/new-api/issues/6679) 渠道上的按 key 并发限制。
- [#7250](https://github.com/QuantumNous/new-api/pull/7250) Playground 中模型组名称被截断；悬停显示完整名称的修复待合并。
- [#7246](https://github.com/QuantumNous/new-api/pull/7246) image-edit API 的 multipart 文件名转义。
- [#6514](https://github.com/QuantumNous/new-api/pull/6514) 管理员向选定用户群发邮件。
- [#6408](https://github.com/QuantumNous/new-api/pull/6408) 新增邀请返利开关；为 Claude Code 桌面端新增 `claude-` 路由前缀。已合并。
- [#7233](https://github.com/QuantumNous/new-api/pull/7233) 可配置的上游媒体 URL 主机重写(隐私相关)。

> **噪音提示：**若干 issue([#7237](https://github.com/QuantumNous/new-api/issues/7237)、[#7238](https://github.com/QuantumNous/new-api/issues/7238)、[#7243](https://github.com/QuantumNous/new-api/issues/7243)、[#7232](https://github.com/QuantumNous/new-api/issues/7232))属于 agent/权限探测，或被提交到了错误的仓库，已被标记为 `invalid` 关闭。任何 issue 正文若带有 "Agent / Tool / Model (full id)" 区块，在验证之前请一律视为机器生成。

---

## 6. 对应用开发者意味着什么

- **如果你在生产环境运行 rc.35,请立即审查任务插件开关。**禁用插件后，同名模型不再路由到对应的内置插件 —— 必须显式重新启用内置插件，否则将遇到 404。另外，日志/UI 中的模型名将反映*客户端*模型(已应用重定向)，而非上游 ID —— 这简化了排障，但可能让现有仪表盘出现意料之外的变化。
- **在 [#7242](https://github.com/QuantumNous/new-api/pull/7242) 合并之前，请将 `/v1/responses` 流式计费视为已知风险。**目前不完整或被取消的响应计费为 0。如果你的终端用户计费基于 new-api 记录，请在下一个发布周期内与上游账单交叉核对。
- **关注图像缓存计费修复**([#7230](https://github.com/QuantumNous/new-api/pull/7230)) —— 如果你的工作负载会缓存含大量图像的提示词，近期账单可能虚高，合并后有必要做一次对账。
- **流式 + Ollama + 工具调用(`qwen3-coder` 及类似模型)目前在最后一个数据块上存在问题**([#7252](https://github.com/QuantumNous/new-api/issues/7252))。在 rc.35 上，请避免依赖来自 Ollama 后端的流式 tool_calls。
- **透传模式现在用起来更安全了**，因为渠道 `model_mapping` 已被正确应用([#7249](https://github.com/QuantumNous/new-api/pull/7249))。如果你之前为绕开 404 而禁用了透传，现在可以重新评估。
- **阿里巴巴 Wan 3.0 视频模型已可用**([#7240](https://github.com/QuantumNous/new-api/pull/7240)) —— 对已经通过 new-api 路由的视频生成管线很有用；随着上游异步任务语义逐步稳定，预计会有一个短暂的集成磨合期。
- **华为 MaaS**([#7239](https://github.com/QuantumNous/new-api/pull/7239))和**按渠道 TTFB 回退**([#7228](https://github.com/QuantumNous/new-api/pull/7228))是多供应商渠道运营场景下最值得跟踪的两个特性 —— 尤其是按渠道 TTFB 回退，它解决了一个常见痛点：单个慢渠道拖住整条回退链。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*