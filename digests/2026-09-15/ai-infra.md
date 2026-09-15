# AI 基础设施日报 2026-09-15

> 生成时间: 2026-09-15 11:30 UTC | 覆盖项目: 9 个

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

# 跨项目 AI 基础设施报告 — 2026-09-15

## 1. 生态概览

整个生态正围绕两类工作负载收敛：**DeepSeek-V4/V4.1 级前沿模型服务** 与 **Agent 驱动的长上下文推理**——两者都在压垮同一批子系统（KV 缓存层级、投机解码、工具调用解析）。引擎层（vLLM、SGLang）的活动以 SM100/DeepSeek 性能优化与混合 SSM-Attention（GDN/Mamba/SWA）正确性修复为主，而本地运行时层（llama.cpp v0.4.1、Ollama v0.34.1-rc2）今天发布了仅有的实质性版本。网关类项目（LiteLLM、New API）处于密集的可靠性/计费迭代中，Agent 协议（Responses API、tool calling、Codex 风格循环）贡献了大多数缺陷。投机解码（MTP、DFlash、EAGLE）同时是最大的吞吐杠杆，也是每个引擎上未解决回归问题的最大单一来源。

## 2. 活跃度对比

| 项目 | Issues* | PRs* | 24h 发版状态 |
|---|---|---|---|
| vLLM | ~25 | ~16 | 无；Transformers v5.17.0 升级进行中（#56108） |
| SGLang | ~25 | ~19 | 无 |
| llama.cpp | ~24 | ~21 | **v0.4.1** + 5 个 b-tag；ABI 破坏（sampler `int→int32_t`） |
| Ollama | ~18 | ~11 | v0.34.1-rc2（预发布） |
| LiteLLM | ~30 | ~8 | **v1.101.0**（cosign 签名镜像） |
| Unsloth | ~40 | ~16 | 无（约 10 个 PR 来自同一维护者） |
| Claude Code Router | 5 | 0 | 无；v3.1.0 回归聚集，窗口内零修复落地 |
| CC Switch | n/a | n/a | 无（摘要截断——数据不可用） |
| New API | 41† | 21† | 无；v1.0.0-rc.37，GA 标准未定义（#7279） |

\* 每份 24h 摘要中引用的条目数——作为分诊/讨论量的代理指标，非精确的最新总数。† 摘要页脚自报数据。

**结论：** llama.cpp 与 SGLang 合并 PR 吞吐量最高；Unsloth 与 LiteLLM 呈现 issue 密集特征（分别为安装器/杀软痛点与治理缺陷）；CCR 是异常值——有报告但窗口内无任何工程响应。

## 3. 模型支持竞速

| 模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | LiteLLM |
|---|---|---|---|---|---|
| DeepSeek-V4/V4.1 | ✅ 深度性能优化（mHC overlap、Mega-mHC、DSpark PP） | ✅ FlexKV 混合池、NPU context parallel、MI 定向优化 | ⚠️ DSV4-Flash SWA KV 耗尽（#25452） | — | — |
| GLM-5.x | ✅ Tool-call 恢复（#47190）、PCP eval 修复 | 🔴 5.3-Flash 加载崩溃阻断服务（#36711） | — | ⚠️ glm-5.3-flash 可用；kimi-k3 崩溃（#18426） | — |
| Qwen3.5/3.6/3.8 | ⚠️ 混合 prefix-cache bug（#43587） | ⚠️ FP8 KV cache 错误（#37379）；NPU decode 优化 | ⚠️ qwen4_exp RSS 增长（#28933）、linear decode 减速（#28734） | ⚠️ qwen3.8-27b 在 GB10 上运行干净 | — |
| Gemma 4 | ⚠️ Tool parser 丢弃裸调用（#53431） | 🔴 视觉塔崩溃杀死调度器（#26751） | ⚠️ 尾部垃圾 + Vulkan 损坏（#28827、#27007） | ⚠️ Jetson OOM（#18396）；nvfp4 视觉修复落地中 | 🔴 Bedrock 路径失效，Mantle 路由未实现（#30657） |
| Nemotron-3 | ⚠️ SM121 投机解码崩溃（#37754） | — | — | — | — |
| 新架构 | — | — | ✅ **Maple 20B-A1B、Tencent Hy 4、Spark2.5、MiniCPM3 FA** | 通过 b10969 升级带入 | — |

**领先者：** llama.cpp 在 **首发支持速度** 上领先（单版本内交付 3 个新架构，当日同步至 Ollama）。vLLM 在 NVIDIA SM100 上对 DeepSeek-V4.1 的 **支持深度** 上领先。SGLang 在 **硬件广度** 上领先（ROCm HiCache、Ascend NPU、SM100 NVFP4 KV）。网关层设计上即为跟随者——LiteLLM 当前存在两个模型覆盖缺口。

## 4. 性能前沿

- **KV 缓存层级是结构性主战场。** vLLM：offload 遥测（#56867）、准入策略与磁盘层 RFC（#51240、#54363）。SGLang：FlexKV 多组池、ROCm/XPU HiCache、Mooncake 追踪（#37976）。Ollama：实验性 prefill/KV 持久化（`OLLAMA_PREFILL_CACHE=1`，#17953）。llama.cpp 的 #21831（SWA/recurrent 全量重处理）展示了这条路走错的代价。
- **DeepSeek-V4.1 执行：** vLLM 的 mHC overlap + Mega-mHC + DSpark 流水线并行集群，对阵 SGLang 的单批次 NVLink PD（#38984）与 NPU prefill context parallelism（#39427）。两者均面向 SM100 上的 TP8/EP/SP。
- **量化从权重向 KV 迁移：** SM100 上的 NVFP4 KV（SGLang #36340）、Hopper 上的 packed FP4 KV（#38902）、Q8KV8 稀疏 prefill（#37236）、MXFP4+Humming（vLLM）、边缘侧的 Q1_0 ARM 与 GGUF Q2_0。
- **Kernel fusion：** vLLM（InternVL pixel-shuffle fusion、MRoPE fusion）、llama.cpp（Vulkan int8 coopmat MMQ 覆盖 13 种格式、sparse FA、SYCL GPU 常驻 TOP_K、HIP fp32 accumulation）、SGLang（AITER FP4 GEMM、CUTLASS 4.6 epilogue）。
- **投机解码：最高活跃度，最高脆弱度。** vLLM：SM121 崩溃、4× 长上下文 DFlash 减速、MTP 挂起。llama.cpp：双 Arc 上的 Windows TDR。SGLang：EAGLE TP 死锁（已关闭/不活跃）。
- **网关层延迟：** New API 的 SSE 单帧延迟移除（#7033）与 LiteLLM 通过 Redis read-replica 实现的跨区域限流（#41221）——在路由层带来显著的 p50 收益。

## 5. 层级定位

- **数据中心服务引擎——vLLM、SGLang：** 近乎功能对等的对手；vLLM 以 NVIDIA 优先、聚焦生产加固，SGLang 则以 DeepSeek 专项优化与异构硅（AMD、Ascend NPU、XPU）作为差异化点。
- **本地运行时——llama.cpp、Ollama：** llama.cpp 是 kernel/量化可移植性层；Ollama 是其上的产品层（今日引入 llama.cpp b10969 + MLX 升级），在 Apple Silicon 内存管理与 Agent 循环体验上竞争，而非原始吞吐。
- **网关——LiteLLM、New API、CCR、CC Switch：** LiteLLM 正向企业级迈进（cosign 签名、预算治理、多区域）；New API 是自托管的计费/中继专家，现已集成 vLLM/SGLang 作为原生 channel（#7332）；CCR 与 CC Switch 是面向 Claude Code/Codex 的轻量客户端侧路由器——今日唯一零合并工程活动的层级。
- **微调——Unsloth：** 正从 notebook 演化为 Studio 桌面产品（本地服务、图像生成、MCP），今日工作几乎全部集中在运营加固（GPU 检测、杀软误报）而非训练 kernel。

**值得注意：** 栈正在纵向整合——New API↔vLLM/SGLang channel、Ollama↔llama.cpp/MLX、Unsloth↔per-model llama.cpp INI（#10783）、网关层向 Anthropic/OpenAI 兼容面收敛以服务 agent 客户端。

## 6. 趋势信号

1. **混合 SSM-Attention 模型正在各处打破缓存假设**（vLLM #43587、SGLang #39342/#39147、llama.cpp #21831）。预计 radix-cache 重新设计将主导下一季度。
2. **Agent 工具调用是顶层跨层级缺陷类别**——从 token parser（vLLM、llama.cpp）到空完成 agent 循环（Ollama #18419）再到网关 MCP 语义重写。端到端 tool-call 校验已成必备。
3. **KV offload/tiering 正成为一等公民基础设施**，而非小修小补——磁盘层、Mooncake、FlexKV、prefill 持久化在一天内均有推进。
4. **网关层的错误语义保真度至关重要：** CCR 屏蔽 `context_length_exceeded`（#1799）导致 Claude Code 的自动压缩失效——仅保证 happy-path 兼容性已不够。
5. **异构硬件（XPU、NPU、RDNA、边缘 NPU）正在接近但尚未达到对等**——每条非 NVIDIA 路径今天都背负至少一个未解决的正确性问题。
6. **供应链与治理成熟度率先在网关层落地**（cosign、预算、限流），而引擎层仍在用正确性换取性能。

**Watchlist：** vLLM Transformers v5 升级（#38379——生态级依赖事件）；SGLang GLM-5.3-Flash 加载崩溃（#36711）；llama.cpp #21831 与 #25452（SWA 长上下文）；LiteLLM 高负载下流式回归（#41187）；Ollama 0.34.x 稳定版 + prefill cache GA；New API v1.0.0 GA checklist（#7279）。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 简报 — 2026-09-15

## 今日要点

过去 24 小时内无新版本发布。开发重心仍聚焦于 DeepSeek-V4.1 性能优化（DSpark 流水线并行目标、偏移 mHC 重叠、Mega-mHC 内核集成）、Intel XPU 兼容性工作（权重缓存、投机解码缺陷），以及针对 FlashInfer 在 SM90/SM120 和 RDNA3/ROCm 后端的一波稳定性修复。一份值得关注的回归报告指出，DFlash 投机解码在约 185k 上下文、混合 GDN 模型上性能从约 71 tok/s 骤降至约 16 tok/s，凸显了一个缺失的按序列长度禁用钩子。

## 版本与破坏性变更

过去 24 小时内无版本发布。

值得关注的前沿构建更新：
- [#56108](https://github.com/vllm-project/vllm/pull/56108) — 将 Transformers 升级到 **v5.17.0**（CPU/Mistral CI 更新，修复 Poolside 的 Laguna 配置中 `rope_parameters` 冲突）。
- [#38379](https://github.com/vllm-project/vllm/issues/38379) — Transformers v5 升级的长期跟踪问题；仍存在若干阻塞项。

## 新增模型与硬件支持

- **LongCat-Flash-Lite / Engram embedding** — 美团 token 嵌入卸载模式的特性请求 [#33528](https://github.com/vllm-project/vllm/issues/33528)。
- **Intel XPU 权重缓存** — [#56999](https://github.com/vllm-project/vllm/pull/56999) 在 IPC 句柄不可用的 XPU（当前 XPU）上增加守护进程侧的 pinned-host 权重缓存。
- **GLM-4.7 / GLM-5.x 工具调用恢复** — [#47190](https://github.com/vllm-project/vllm/pull/47190) 在流式输出前恢复格式错误的 `tool_namearg<arg_key>...` 开头的工具调用。
- **GLM PCP 评估稳定性** — [#55879](https://github.com/vllm-project/vllm/pull/55879) 修复 B200 GLM-5.2 在 TP/PCP/DCP 网格下的 FlashInfer DCP 预热问题。
- **与硬件无关的模型定义**（RFC） — [#44219](https://github.com/vllm-project/vllm/issues/44219) 是 [#42770](https://github.com/vllm-project/vllm/issues/42770) 的后续提案，建议按硬件类型分离模型定义。

## 性能与优化

- **InternVL pixel shuffle + LayerNorm 融合** — [#56965](https://github.com/vllm-project/vllm/pull/56965) 将 v2 下采样路径（`view → permute → contiguous → view → permute → contiguous → LayerNorm`）合并为单个支持跨步访问的 Triton 内核。
- **ROCm MRoPE 融合** — [#50212](https://github.com/vllm-project/vllm/pull/50212) 将 `QkNormRopeKvCacheFusionPass` 扩展至 Qwen3-VL 3D MRoPE，在 AITER 上每层减少三次 GPU 启动。
- **ROCm 共享专家门控分发器** — [#54185](https://github.com/vllm-project/vllm/pull/54185) 在 `VLLM_ROCM_USE_AITER_FUSION_SHARED_EXPERTS=1` 时，将融合的共享专家门控路由到平台分发器。
- **DeepSeek-V4.1 mHC 重叠** — [#56611](https://github.com/vllm-project/vllm/pull/56611) 在 `VLLM_DSV41_MHC_OVERLAP=1`（SM100，TP8/EP/SP，≤256 tokens）下将偏移 mHC 系数生成与 attention/FFN 重叠执行。
- **Mega-mHC 内核集成** — [#56962](https://github.com/vllm-project/vllm/pull/56962) 重新打开 #56255，目标分支改为 `deepseek_v41`。
- **DSpark 流水线并行目标** — [#56956](https://github.com/vllm-project/vllm/pull/56956) 在聚合（非 PD）服务中支持 DSpark 在 PP 目标上运行，并在各阶段之间广播 draft。
- **在 Marlin 后端之前的 Humming** — [#56997](https://github.com/vllm-project/vllm/pull/56997) 在适用场景下优先选用 Humming（叠加于 #56685 之上）。
- **MI355X 上的 DeepSeek-V4.1-Flash**（RFC） — [#56506](https://github.com/vllm-project/vllm/issues/56506) 报告在 8× MI355X 上 c=1、TP4 时输出速度为 35.89 tok/s；gfx950 上仍有显著优化空间。
- **通过 torch.compile 实现 TP MoE 集合通信** — [#29139](https://github.com/vllm-project/vllm/issues/29139) 提议添加自定义 pass 以避免冗余集合通信；DeepSeek 中自 #24134/#24982 起已存在序列并行，但仍需与 compile pass 集成。
- #56506 中的 DSv4.1-Flash + MXFP4 + DSpark MTP 数据还指出了 DSpark 在更高并发下的扩展性。

## 稳定性与回归

**高严重度（崩溃 / 静默损坏）**
- **FlashInfer + MTP 投机解码在 SM121 (DGX Spark) 上崩溃**，模型为 Nemotron-3-Super-120B-A12B-NVFP4（GQA=16）。Triton 后端可正常工作。 [#37754](https://github.com/vllm-project/vllm/issues/37754)
- **DeepSeek-V4.1-Flash `dsv4_topk` Triton 在 H20 上发生非法内存访问**，高并发场景下出现；可通过 `max_num_seqs=256` 缓解。 [#56389](https://github.com/vllm-project/vllm/issues/56389)
- **Arc Pro B70 (XPU) 上出现静默持续性输出损坏**：27B W4A16 在持续并发解码下不断输出 "!" / token 0；HTTP 返回 200，无错误。 [#53480](https://github.com/vllm-project/vllm/issues/53480)
- **DFlash 融合 KV 投影在切片后的 `qkv_proj` 权重上调用 `F.linear`** —— 静默损坏权重量化的 drafters。 [#51581](https://github.com/vllm-project/vllm/issues/51581)
- **Batch invariance 在 4× RTX PRO 6000 Blackwell 上被破坏**，当使用 `VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp` 时。 [#56370](https://github.com/vllm-project/vllm/issues/56370) —— 影响可复现性与测试。
- **FlashInfer SM90 sparse MLA 混合批次越界** —— 修复 PR [#56969](https://github.com/vllm-project/vllm/pull/56969)。

**高严重度（生产路径正确性）**
- **GLM-5.3-Flash 在多轮 agent 场景下退化为重复 token 的"词组乱码"**。 [#56605](https://github.com/vllm-project/vllm/issues/56605)
- **DFlash2 在 token 30 处改变 Qwen3.8 的贪心 thinking 输出**（启用 `--enforce-eager`，K=1）。 [#54928](https://github.com/vllm-project/vllm/issues/54928)
- **DeepSeek-V4-Pro TP=8 worker hang → EngineDeadError**，MTP 投机解码期间。 [#41530](https://github.com/vllm-project/vllm/issues/41530)
- **Mamba-attention 混合模型（Qwen3.5）的增量多模态请求前缀缓存失败**。 [#43587](https://github.com/vllm-project/vllm/issues/43587)
- **P/D disaggregation 中带容错的 KV block 泄漏** —— 修复 PR [#56430](https://github.com/vllm-project/vllm/pull/56430)。
- **DSpark 未初始化的 EPLB 状态**，当 target 使用与 drafter 不同的专家拓扑时 —— 修复 PR [#56387](https://github.com/vllm-project/vllm/pull/56387)。
- **SM100 `fp8_ds_mla` cache scale 不匹配**（writer vs reader） —— 修复 PR [#49435](https://github.com/vllm-project/vllm/pull/49435)。

**中等严重度 / 已关闭**
- **OTLP tracer 初始化后从不发送 span**（--otlp-traces-endpoint、instrument_otel/manual_instrument_otel 从未被调用）。 [#56696](https://github.com/vllm-project/vllm/issues/56696) —— 已关闭。
- **RDNA3 fused MoE 硬编码 2× 门控激活因子**，对非门控（relu2）Nemotron-3 造成破坏。 [#56790](https://github.com/vllm-project/vllm/issues/56790) —— 已关闭。
- **Gemma4 工具解析器静默丢弃裸 `<|tool_call>:name{...}`**。 [#53431](https://github.com/vllm-project/vllm/issues/53431) —— 已关闭。
- **Qwen3.6-35B-A3B 上的 XPU 投机解码错误**。 [#52262](https://github.com/vllm-project/vllm/issues/52262)
- **vLLM 缺少 Blackwell 统一内存分页遥测** —— 引用 DGX Spark 监控；尚无修复 PR。 [#54200](https://github.com/vllm-project/vllm/issues/54200)

## 对应用开发者的意义

- **混合 GDN 模型（Qwen3.5/3.6/3.8）上的长上下文 DFlash 是一个陷阱**：在 [#54691](https://github.com/vllm-project/vllm/issues/54691) 中报告约 185k 上下文下出现约 4× 减速。若你在长上下文场景下服务这些模型，请将 DFlash 视为仅短上下文受益的特性，并在启用前进行基准测试。
- **Blackwell / SM120 / DGX Spark 上的投机解码仍然脆弱**。若在这些硬件上部署 Nemotron-3-Super 或 DeepSeek-V4.1-Flash，请将 Nemotron 固定使用 Triton attention 后端，并在 H20 上将 `max_num_seqs` 上限设为 256，直到上游修复发布。
- **Sequence parallelism + `VLLM_BATCH_INVARIANT=1` 目前互不兼容**（[#56370](https://github.com/vllm-project/vllm/issues/56370)）。若你依赖评估的确定性输出，在修复发布前不要启用 SP。
- **带容错的 P/D disaggregation 在 worker 故障时会泄漏 KV block** —— 已在 [#56430](https://github.com/vllm-project/vllm/pull/56430) 中修复；若你在生产中运行 PD-FT，请固定此 PR。
- **工具调用解析器仍存在边界场景泄漏**（Gemma4 [#53431](https://github.com/vllm-project/vllm/issues/53431)，[#47190](https://github.com/vllm-project/vllm/pull/47190) 中的 GLM-4.7 恢复）。请对流式工具调用响应进行端到端验证，而非仅在标准 prompt 上测试。
- **KV offload 正在成为一等公民**：[#56867](https://github.com/vllm-project/vllm/pull/56867) 中新增了通用信息指标 `vllm:kv_offload_config_info`，接纳策略 RFC [#51240](https://github.com/vllm-project/vllm/issues/51240) 和 FS 层完整性 RFC [#54363](https://github.com/vllm-project/vllm/issues/54363) 正在向生产级磁盘层行为收敛。
- **Intel XPU 接近但尚未达到完全兼容**：今日已合入权重缓存 [#56999](https://github.com/vllm-project/vllm/pull/56999)，但投机解码 (#52262) 和静默输出损坏 (#53480) 仍未解决 —— 请将 XPU 部署保持保守的并发上限。
- **DeepSeek-V4.1 是当前性能优化焦点**。DSpark PP、mHC 重叠和 Mega-mHC 集成今日均已合入/重开；预计下一版本中 SM100 上 DSv4.1 吞吐量将出现可观测的提升。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 简报 — 2026-09-15

## 1. 今日亮点

- **DeepSeek V4 生态强化**是今日的主要动态：FlexKV 多组布局([#31781](https://github.com/sgl-project/sglang/pull/31781))、AMD FP8 统一注意力 HiCache([#37778](https://github.com/sgl-project/sglang/pull/37778))、面向 DSV4 的节点内 NVLink 层批处理([#38984](https://github.com/sgl-project/sglang/pull/38984))、NPU prefill 上下文并行([#39427](https://github.com/sgl-project/sglang/pull/39427))以及 NPU 索引器 top-k 结果([#39060](https://github.com/sgl-project/sglang/pull/39060))均取得进展。
- 新开了 **dLLM(块扩散)服务路线图**([#39499](https://github.com/sgl-project/sglang/issues/39499)),延续此前的 RFC 讨论串，规划了全序列模型支持以及未来的采样/调度器工作。
- **Mamba/统一 radix-cache 正确性修复**已合入并发布——较短插入键上的检查点标记 bug 已修复([#39209](https://github.com/sgl-project/sglang/pull/39209)),且 MHA prefill 图现在会正确遵循已确认的缓存前缀([#38716](https://github.com/sgl-project/sglang/pull/38716))。

## 2. 版本发布与破坏性变更

过去 24 小时内没有新的标签版本发布。以下为陆续合入 `main` 的重要 API/接口层变更：

- **平台抽象收尾：**[#33718](https://github.com/sgl-project/sglang/pull/33718)(已关闭)完成了 `empty_cache()`/`synchronize()` 经由 `current_platform` 的路由；后续 PR [#34544](https://github.com/sgl-project/sglang/pull/34544)(已关闭)将 122 个文件中的 398 处测试调用点一并迁移。OOT 平台插件(XPU、CPU)及 TSMC 风格加速器不再因硬编码的 `torch.cuda.*` 调用而崩溃。
- **CI 维护模式策略**([#21065](https://github.com/sgl-project/sglang/issues/21065))在 24 小时内被重新激活又再次关闭——普通 CI 与维护 CI 之间的自动轮换仍是现行运维模式。
- `disable_piecewise_cuda_graph` 这一 `ServerArgs` kwarg 的移除工作仍在推进：[#37032](https://github.com/sgl-project/sglang/pull/37032)(已关闭)更新了 5 个引用该已移除参数的脚本化 chunked-prefill 测试类。

## 3. 新模型与硬件支持

- **Apple Silicon(MPS)**——macOS 上支持标准 Torch 运行器，不再仅限 MLX([#36780](https://github.com/sgl-project/sglang/pull/36780),跟踪 [#32321](https://github.com/sgl-project/sglang/issues/32321))。
- **DeepSeek V4(C4A / C128A,SWA + C4A 索引器/状态)**——FlexKV 多组内存池与 UnifiedRadixCache 组合，用于混合 SWA 记账([#31781](https://github.com/sgl-project/sglang/pull/31781));面向 DSV4 FP8 统一注意力的 ROCm HiCache([#37778](https://github.com/sgl-project/sglang/pull/37778));采用 interleave + zigzag 的 NPU DSV4 prefill 上下文并行([#39427](https://github.com/sgl-project/sglang/pull/39427))。
- **DeepSeek-V4.1——Hopper 上打包 FP4 主 KV**已提出提案([#38902](https://github.com/sgl-project/sglang/issues/38902),基线为 [#38798](https://github.com/sgl-project/sglang/issues/38798))。
- **SM100 NVFP4 KV 缓存**，经 TRT-LLM GenMHA 实现，附带可选的 FlashInfer FP8 反量化 prefill 路径，并支持 CUDA Graph 捕获([#36340](https://github.com/sgl-project/sglang/pull/36340))。
- **AMD AITER ASM FP4 GEMM**,面向 Quark W4A4 dense-linear,通过共享的 `a4w4_blockscale_tuned_gemm.csv` 模型表选择性启用([#39598](https://github.com/sgl-project/sglang/pull/39598))。
- **Intel XPU HiCache** 已接通，并修复了异步写入/加载流中的一处 use-after-free([#32503](https://github.com/sgl-project/sglang/pull/32503))。
- **NPU qwen3.5 / qwen3.6 解码**优化(双缓冲 pinned memory、融合 sigmoid)([#35958](https://github.com/sgl-project/sglang/pull/35958));Qwen3.5-122B-A10B FP8 KV 缓存路径同样在推进范围内([#37379](https://github.com/sgl-project/sglang/issues/37379))。
- **AITER 升级就绪度跟踪 issue**已更新([#21302](https://github.com/sgl-project/sglang/issues/21302),AITER scout [#26890](https://github.com/sgl-project/sglang/issues/26890))。

## 4. 性能与优化

- **昇腾/NPU 采样**：移除了 `npu_top_k_top_p` 之前 `torch.all((top_ks<=1024)&(top_ks>=1))` 门控中的一次设备同步([#39404](https://github.com/sgl-project/sglang/pull/39404))。
- **DeepSeek V4 INTRA_NODE_NVLINK PD**:将所有层打包进单个批次，取代逐层 microbatch([#38984](https://github.com/sgl-project/sglang/pull/38984))。
- **原生 SM90 Q8KV8 稀疏 prefill 第 3 步**：将主注意力的 q/k/v 量化为 FP8 E4M3,并在 Hopper 上为 FP8 KV 缓存负载提供可选路径([#37236](https://github.com/sgl-project/sglang/pull/37236))。
- **MHA prefill CUDA 图**：由 `chunked_prefill_size // 512` 推导的默认请求数此前会错误地排除本符合条件的 MHA 批次；现已扩大图覆盖并统一了带缓存前缀的变体([#38716](https://github.com/sgl-project/sglang/pull/38716))。
- **Mooncake 逐请求上下文传播**：贯穿 HiCache 读路径，实现端到端请求追踪([#37976](https://github.com/sgl-project/sglang/pull/37976))。
- **Diffusion CLI**:当 `--model-type` 未设置时，后端自动检测不再提前导入 diffusion 运行时([#39407](https://github.com/sgl-project/sglang/pull/39407))。
- **CUTLASS 4.6 动态 epilogue 融合** + IKET 剖析正在调研中([#30809](https://github.com/sgl-project/sglang/issues/30809))。
- 来自昇腾 NPU 贡献者的 **KVTC KV 缓存压缩** RFC([#30419](https://github.com/sgl-project/sglang/issues/30419))。

## 5. 稳定性与回归

按对用户的潜在影响程度排序:

| 严重度 | 问题 | 状态 | 备注 |
|-----|-------|--------|-------|
| 高 | [GLM-5.3-Flash(`glm5_next`,288 个路由专家 + 1 个共享专家,FP8)在加载权重时崩溃](https://github.com/sgl-project/sglang/issues/36711),触发条件为 MoE 运行器强制 `disable_shared_experts_fusion`(如 `flashinfer_trtllm`/`flashinfer_cutedsl`/`flashinfer_trtllm_routed`);报错 `IndexError: index 288 out of bounds in logical_to_all_physical` | 未修复 | 彻底阻断 MoE 路由版 GLM-5.3-Flash 的服务 |
| 高 | [ROCm 上 DeepSeek-V4.1 FP4 索引器在 #37660 之后，长上下文 AgentX 场景下仍会耗尽 HBM](https://github.com/sgl-project/sglang/issues/39441) | 未修复 | AMD 预览镜像上的内存回归 |
| 高 | [`--enable-mixed-chunk` 在混合 GDN 上损坏 mamba radix-cache 检查点](https://github.com/sgl-project/sglang/issues/39342);混合批次路径跳过 `extra_buffer` 写入，但仍交出该槽位 | 未修复 | 修复 PR [#39209](https://github.com/sgl-project/sglang/pull/39209) 已处理一个相关的检查点标记 bug;本问题仍待提 PR |
| 高 | [HiCacheFile `batch_exists_v2` 在辅助池无法恢复时对混合前缀产生误命中](https://github.com/sgl-project/sglang/issues/39147) | 未修复 | `ALL_PAGES` 混合内存池查找中的静默正确性 bug |
| 高 | [HiCache `write_through` 可能在新出现前缀的全部 KV 备份至 Mooncake 之前就将其淘汰](https://github.com/sgl-project/sglang/issues/39444) | 未修复 | 淘汰后重放会产生错误状态 |
| 高 | [Gemma-4 多模态：单张非 RGB 图像使视觉塔崩溃并杀死调度器](https://github.com/sgl-project/sglang/issues/26751)(`mat1 256 vs 768`),导致在途请求被丢弃 | 未修复 | 由通道校验 + 共享 tokenization 两层 bug 叠加放大 |
| 中 | [EAGLE 贪心验证缺少 TP 广播 → `tp>1` 时出现 rank 分歧死锁](https://github.com/sgl-project/sglang/issues/31071) | 已关闭，不活跃 | 建议对照你的 EAGLE 配置核查一下 |
| 中 | [EAGLE + DP attention + PD 分离在 `index_share_for_mtp_iteration` 上死锁(GLM-5.2)](https://github.com/sgl-project/sglang/issues/32527) | 已关闭，不活跃 | |
| 中 | [DCP > 1 时解码回退在 `get_cpu_copy` 中崩溃(PD 分离)](https://github.com/sgl-project/sglang/issues/38645) | 已关闭 | |
| 中 | [Qwen3.5-122B-A10B 在 `--kv-cache-dtype fp8_e4m3` + `--quantization-param-path` 下触发 RuntimeError](https://github.com/sgl-project/sglang/issues/37379) | 未修复 | 在 `main` 与 v0.5.16 上均可复现，L20×8 / TP=8 |
| 中 | [对自带路由的模型，MoE 延迟 finalize 不可达(`FLASHINFER_TRTLLM_ROUTED` 除外)](https://github.com/sgl-project/sglang/issues/39299) | 未修复 | |
| 中 | [统一 radix cache 在淘汰时直接修剪 MAMBA 组件节点而非降级](https://github.com/sgl-project/sglang/issues/33713) | 未修复 | 破坏 hybrid-KDA 前缀的 H→D 回载 |
| 低 | [OpenAI 兼容 HTTP 服务器未按规范校验 `model` 字段](https://github.com/sgl-project/sglang/issues/31404) | 已关闭，不活跃 | |
| 低 | [Model Gateway 静默将 MCP `tool_choice="required"` 改写为 `"auto"`](https://github.com/sgl-project/sglang/issues/31459) | 已关闭，不活跃 | 对 `/v1/responses` 的 MCP 用户构成语义回归 |
| 低 | [`SGLANG_SHARED_EXPERT_TP1=1` 在跳过 experts 后的 all-reduce 时损坏输出](https://github.com/sgl-project/sglang/issues/31475) | 已关闭，不活跃 | |
| 低 | [v0.5.12 在 B300(sm_103)上的 DeepGemm 回归](https://github.com/sgl-project/sglang/issues/255

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-15

## 今日要点

**v0.4.1 版本**正式发布，带来了三种新架构（Maple 20B-A1B、Tencent Hy 4、Spark2.5）、ggml v0.24.0，以及改进的 JSON schema 和聊天解析功能；同时 `b10978` 修复了一个真实的 Metal 回归问题——由于缺少 `(HSK=96, HSV=64)` 的 flash-attention 实例化，该问题曾导致 MiniCPM3 失效。后端方面，**HIP flash-attention 获得重要修复**（通过 b10970 在 CDNA 上实现 fp32 累积，通过 #28943 在 WMMA 中实现完全掩码 KV-tile 跳过），解决了自六月以来一直悬而未决的 gfx1151/Strix Halo 回归问题。

## 发布版本与破坏性变更

- **[v0.4.1](https://github.com/ggml-org/llama.cpp/releases/tag/v0.4.1)** — 新增 Maple 20B-A1B、Tencent Hy 4 和 Spark2.5 架构；改进了 JSON schema 处理、聊天解析、日志记录以及服务器子进程管理；将 ggml 升级至 **v0.24.0**。API 变更：`llama_sampler_chain_n()` 的返回值类型由 `int` 变更为 `int32_t`，下游绑定需要重新编译。
- **[b10964](https://github.com/ggml-org/llama.cpp/releases/tag/b10964)** — 0.4.1 的版本号提交。
- **[b10977](https://github.com/ggml-org/llama.cpp/releases/tag/b10977)** — CUDA Windows x64 工具链升级至 13.4.1（#28930）。
- **[b10969](https://github.com/ggml-org/llama.cpp/releases/tag/b10969)** — Ubuntu CUDA 构建（12.8/13.3，x64 + arm64）现在纳入发布产物集合（#28186）；为 arm64 新增 GCC 14。
- **[b10976](https://github.com/ggml-org/llama.cpp/releases/tag/b10976)** — 修复 Android 发布流水线（#28936）。

迁移提示：所有链接 `libllama` 的 C/C++ 消费者都会遇到采样器 API 中 `int` → `int32_t` 的 ABI 不兼容变更。

## 新增模型与硬件支持

- **MiniCPM3** — 为 `(HSK=96, HSV=64)` 新增 Metal flash-attention 内核（[b10978 / #28599](https://github.com/ggml-org/llama.cpp/pull/28599)）；此前 `-fa` 对该模型会以静默方式失败。
- **Maple 20B-A1B、Tencent Hy 4、Spark2.5** — v0.4.1 中的新架构。
- **fraunhofer-iis/elmod-2.7b-it** — 新增 `escape_after_split` 预分词器（[#28845](https://github.com/ggml-org/llama.cpp/pull/28845)），修复 #28804。
- **ARM 上的 Q1_0 量化** — Repack 内核（4x4 NEON+DP，4x8 NEON+DP+I8MM）已就绪待合并（[#23492](https://github.com/ggml-org/llama.cpp/pull/23492)），适用于 Bonsai 类 LLM。
- **HIP/ROCm AllReduce** — HIP 上启用实现，因为底层 CUDA 等效原语现已存在（[#27825](https://github.com/ggml-org/llama.cpp/pull/27825)），解除了多 GPU ROCm 的限制。
- **HIP MoE RDNA 3.5** — 扩展了 `ncols_opt` 瓦片启发式策略（[#28935](https://github.com/ggml-org/llama.cpp/pull/28935)）。
- **OpenCL 通用 `ssm_scan`** — 移除了 subgroup-size=64 和 `d_state∈{128,256}` 的限制（[#28881](https://github.com/ggml-org/llama.cpp/pull/28881)）。
- **OpenVINO** — 大幅改进有状态解码、GPU MoE 推理（融合压缩专家 + 分组 8-bit 重新量化）、NPU 无缓存编码器模型、权重溢出（[#28638](https://github.com/ggml-org/llama.cpp/pull/28638)）。

## 性能与优化

- **HIP/AMD CDNA fattn-mma** — 切换至 fp32 累加器（[b10970 / #28576](https://github.com/ggml-org/llama.cpp/pull/28576)）；解决了降精度 MFMA 路径下的精度问题。
- **HIP WMMA FA** — 为共享缓存预填充跳过完全掩码的 KV 瓦片（[#28943](https://github.com/ggml-org/llama.cpp/pull/28943)），引用 #28495。
- **Vulkan on Strix Halo** — `SHMEM_STRIDE_PAD` 由 4 调整为 6（[#28941](https://github.com/ggml-org/llama.cpp/pull/28941)）；PR 指出 128 tokens 时约 85–90% 的 GPU 时间用于 `MUL_MAT`，因此这在 gfx1151 上是显著的 PP 提升。
- **Vulkan int8 coopmat1 矩阵乘（RDNA3/RDNA4）** — 新的 cm1 着色器覆盖 q4_0、q4_1、q5_0、q5_1、q8_0、q3_k/q4_k/q5_k/q6_k、mxfp4、nvfp4、iq4_nl（[#27952](https://github.com/ggml-org/llama.cpp/pull/27952)）。
- **SYCL TOP_K** — 为 `k > 32` 实现 GPU 驻留的基数选择算法（[b10956 / #28670](https://github.com/ggml-org/llama.cpp/pull/28670)）；此前每次调用都会回退到 CPU 后端的往返。
- **Vulkan 稀疏 Flash Attention** — 后端支持已落地（[#28105](https://github.com/ggml-org/llama.cpp/pull/28105)，合并就绪）。
- **CUDA `GGML_OP_SUM_ROWS`** — 现通过 stride-aware 内核支持 F32 行连续张量（[#26308](https://github.com/ggml-org/llama.cpp/pull/26308)，已合并）。
- **RPC 哈希缓存** — `ggml_backend_rpc_buffer_set_tensor` 仅对权重传输进行哈希，不对激活值哈希（[#28789](https://github.com/ggml-org/llama.cpp/pull/28789)）。
- **CI 服务器覆盖率** — 一小部分 CUDA pytest 子集现已在 PR 合并前运行（[#28746](https://github.com/ggml-org/llama.cpp/pull/28746)）。
- **HuggingFace Jobs CI 中的自托管 Vulkan + WebGPU**（[#28712](https://github.com/ggml-org/llama.cpp/pull/28712)）。

## 稳定性与回归问题

**高严重性（仍开放，影响范围广）：**

- **#21831 — 服务器在 SWA/循环记忆模型上强制完全重处理提示**（[链接](https://github.com/ggml-org/llama.cpp/issues/21831)，52 条评论，👍30）。影响 Windows 上的 CUDA，影响所有 SWA 和循环模型（DSV4-Flash、Mamba/SSM 系列）。暂无关联的修复 PR。
- **#24066 — Vulkan 在近期构建中的性能下降**（[链接](https://github.com/ggml-org/llama.cpp/issues/24066)，45 条评论）。RX 6600 + Qwen3.5-9B Q5_K_M。RDNA2 上的 Vulkan 用户升级前应进行测试。
- **#28753 — `ggml_backend_sched_alloc_splits: unexpected graph reallocation` 崩溃**（[链接](https://github.com/ggml-org/llama.cpp/issues/28753)，8 条评论）。Intel Arc Pro B50 + A770 上的 SYCL。
- **#27888 — SYCL 多 GPU 崩溃（Intel Arc Pro B50 + Arc A770）**（[链接](https://github.com/ggml-org/llama.cpp/issues/27888)，12 条评论）。
- **#28778 — SYCL DFlash2 草稿模型在双 Arc Pro B70 上触发 Windows TDR**（[链接](https://github.com/ggml-org/llama.cpp/issues/28778)，6 条评论）。触发条件为推测式解码。
- **#27638 — Vulkan/ANV FA 回退至 SCALAR 路径**（[链接](https://github.com/ggml-org/llama.cpp/issues/27638)）。Intel Arc B580 上出现 O(N²) PP 及设备丢失。

**正确性问题（高影响）：**

- **#28827 — Gemma4 在"思考"过程中逐步输出越来越长的尾部乱码**（[链接](https://github.com/ggml-org/llama.cpp/issues/28827)）。Vulkan 混合 GPU 配置。
- **#28211 — gfx1151（Strix Halo）上 HIP/ROCm 在 prompt > n_ubatch 时输出错误的 logits**（[链接](https://github.com/ggml-org/llama.cpp/issues/28211)）。静默损坏，非崩溃。
- **#28768 — gfx1201（R9700）上 HIP：批处理目标评分会改变 logits/top-1**（[链接](https://github.com/ggml-org/llama.cpp/issues/28768)）。
- **#27007 — Vulkan（Radeon 890M gfx1150）上 Gemma 4 26B A4B QAT 输出损坏**（[链接](https://github.com/ggml-org/llama.cpp/issues/27007)）。问题定位于融合 MMVQ 内核。
- **#25452 — DSV4-Flash SWA KV 缓存耗尽（崩溃 + 卡顿）**（[链接](https://github.com/ggml-org/llama.cpp/issues/25452)）。
- **#28726 — OpenVINO 后端在 AVX-512（Core Ultra 7 265K）上出现 STATUS_ILLEGAL_INSTRUCTION**（[链接](https://github.com/ggml-org/llama.cpp/issues/28726)）。
- **#28933 — qwen4_exp（Qwen3.8-Flash-Next）：在 128 GB 统一内存（DGX Spark）上正常聊天时 RSS+swap 持续增长**（[链接](https://github.com/ggml-org/llama.cpp/issues/28933)）。
- **#28734 — qwen4_exp CUDA：解码速度随上下文线性下降**（[链接](https://github.com/ggml-org/llama.cpp/issues/28734)）。
- **#28902 — M-RoPE 嵌入批处理越界读取 `batch.pos`，超过文档化的 `n_tokens` 数组末尾**（[链接](https://github.com/ggml-org/llama.cpp/issues/28902)）。潜在内存安全问题。
- **#28752 — b10780 之后 Vulkan RDNA3 提示处理回归**（[链接](https://github.com/ggml-org/llama.cpp/issues/28752)）。
- **#24437 — HIP `GGML_HIP_ROCWMMA_FATTN=ON` 在 gfx1151（Strix Halo）上 −41% 预填充回归**（[链接](https://github.com/ggml-org/llama.cpp/issues/24437)）。
- **#28814 — LLVM 23 + HIP 下 `bin/ggml-rpc-server` 链接错误**（[链接](https://github.com/ggml-org/llama.cpp/issues/28814)）。

**已修复 / 已关闭：**

- **#28275** — Docker 缺少 SemVer 标签 / 发布构建（已关闭；SemVer 标记已上线）。
- **#28441** — Qwen2.5-Omni 在系统负载下 Metal 音频损坏（已在 b10978 区域关闭）。
- **#28722** — macOS 上 WebGPU hy_v4 崩溃（已关闭）。
- **#27025** — Muse Glimmer 工具调用格式不匹配（已关闭）。
- **#28938**（[PR](https://github.com/ggml-org/llama.cpp/pull/28938)）— 服务器不再将 `--api-key-file` 转发至路由器派生的子进程；修复了路由器模式下 `--api-key` 客户端遇到 401 的问题。

## 对应用开发者的意义

- **若你在 Apple Silicon 上部署 MiniCPM3，请将构建固定到 v0.4.1** — 早期的 Metal 构建会拒绝 `-fa`。b10978 之前的构建会回退到非 FA 路径处理此模型。
- **若你绑定 `llama.h`，请计划重新编译**：采样器 `int → int32_t` 的变更是 ABI 不兼容的。Python `llama-cpp-python` wheel 应当很快会刷新，但升级前请检查 changelog。
- **SYCL / Intel Arc 用户**：今天的 HIP/Metal 修复对你无帮助。Issue #28753、#27888、#28778 和 #28728 表明多 GPU Arc 和大模型 SYCL 路径仍然不成熟 — 在 #28778 解决之前，请保持较低的 `-ngl`，并在 Windows Arc 上避免使用推测式解码（DFlash2）。
- **RDNA2/3 上的 Vulkan 用户应在升级前验证** — #24066 和 #28752 表明近期构建存在性能回归。若你的目标是消费级 AMD GPU，请固定到已知良好的 b-number 并进行基准测试。
- **Strix Halo / gfx1151（Ryzen AI MAX）用户是今天的大赢家**：b10970 的 fp32 累加 fattn-mma、#28943 的掩码瓦片跳过以及 #28941 的 `SHMEM_STRIDE_PAD` 调整都是针对你的硬件。但 #28211（静默错误的 logits）和 #24437（启用 WMMA FA 时 −41% 预填充）意味着**在这些内核上开启推理工作负载之前，必须进行正确性验证**。
- **Core Ultra 上的 OpenVINO 用户**应禁用 AVX-512 或回滚版本，直至 #28726 修复。
- **路由器模式下的服务器运维人员**应拉取包含 #28938 的下一个构建 — 这是一个真实的认证回归，`--api-key` 客户端会被路由器子进程返回 401。
- **CI/CD**：新的自托管 Vulkan/WebGPU runner（#28712）和合并前的 CUDA 服务器测试（#28746）应当会在未来几周内降低这些后端回归落地的频率。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-15

## 1. 今日要点

Ollama 发布了 **v0.34.1-rc2**，包含 MLX 内存管理修复（空闲内存门控、前缀缓存逐出）并提高了 token 重复限制。一批协调一致的 MLX 正确性修复与 MLX 和 llama.cpp 上游版本升级一同落地——解决了 nvfp4 多模态损坏、``后的结构化输出泄漏，以及工具调用解析回归（这些问题导致用户报告出现空补全）。

## 2. 发布与破坏性变更

- **v0.34.1-rc2**（[release](https://github.com/ollama/ollama/releases/tag/v0.34.1)）
  - `app`：修复 ChatGPT 模型选择器间距。
  - `mlxrunner`：在销毁前从当前对话中逐出前缀缓存快照。
  - `mlxrunner`：检查主机空闲内存，并在加载下一个 MLX 模型前等待已逐出的 runner 释放。
  - `llm`：token 重复限制从较低默认值提升至 **100**，且重复超限条件现在会返回显式错误而非静默截断。

- **API 弃用**：`typical_p` 将在新模型创建中移除；现有包含该设置的 GGUF manifest 仍可读取（[PR #18448](https://github.com/ollama/ollama/pull/18448)）。

## 3. 新模型与硬件支持

- **GGUF Q2_0 张量**已添加到 fs/ggml 读取器和导入路径（[PR #18443](https://github.com/ollama/ollama/pull/18443)）。此前，任何包含 Q2_0 张量的 GGUF 都会因张量大小溢出而失败。
- **llama.cpp 升级至 b10969**（[PR #18446](https://github.com/ollama/ollama/pull/18446)），解决了上游构建变更引入的 `libllama` 与 `libmtmd` 之间的符号重复冲突。
- **MLX / MLX-C 上游升级**（[PR #18449](https://github.com/ollama/ollama/pull/18449)），包含针对 **影响 nvfp4 多模态模型的量化矩阵乘法损坏**的修复（尤其是 Gemma 4 视觉塔）。线程局部 stream/sync API 暂缓合并。
- **仍开放的硬件请求**：
  - 高通 Dragonwing IQ-9075（HTP NPU + Adreno 663）——用于 Raxda Fogwise Airbox（[#18445](https://github.com/ollama/ollama/issues/18445)）。
  - 瑞芯微 NPU（RK3588 / RK3576）——长期未解决的请求（[#9268](https://github.com/ollama/ollama/issues/9268)）。

## 4. 性能与优化

- **MLX 前缀缓存逐出**（[#18461](https://github.com/ollama/ollama/pull/18461) 已发布区域）与空闲内存门控降低了并发 agent 工作负载下发生交换的可能性——具体预算仍为硬编码的 **8 GiB**，现在被标记为调优关注点而非内存泄漏（[#18131](https://github.com/ollama/ollama/issues/18131)）。
- **跨 runner 重载的实验性 prefill/KV 缓存持久化**，通过 `OLLAMA_PREFILL_CACHE=1` 启用（[PR #17953](https://github.com/ollama/ollama/pull/17953)）。当 runner 卸载时，已处理的 prompt 状态会被保留，使下一个请求跳过完整 prefill——对长上下文 / agentic 循环很有价值。
- **MLX 加载进度上报与卡顿检测**（[PR #17834](https://github.com/ollama/ollama/pull/17834)）在加载前绑定监听器，并使用延迟加载的权重以避免大型模型出现误取消。
- **Manifest 列表存储**为同一标签下的 runner 专属 manifest 打下基础（[PR #16590](https://github.com/ollama/ollama/pull/16590)）——预计在多个 runner（例如 CUDA + MLX）服务于同一逻辑模型时提升存储效率。

## 5. 稳定性与回归

**高严重度**
- **kimi-k3:cloud 在 tool-role 消息中包含图像内容时崩溃（HTTP 500）**——相较于 kimi-k2.6 / glm-5.3-flash 的回归，后两者工作正常（[#18426](https://github.com/ollama/ollama/issues/18426)）。尚无修复 PR。
- **Gemma 4 E4B 多模态在 Jetson Orin Nano 8GB 上 OOM**，尽管 CPU 投影器配置可成功加载（[#18396](https://github.com/ollama/ollama/issues/18396)）。影响一类流行的边缘设备。
- **MLX runner 在长上下文中请求中途发生致命 OOM**，当前缀缓存持有已换出的快照时；逐出机制有效但缺少分配失败重试（[#18231](https://github.com/ollama/ollama/issues/18231)）。
- **工具调用输出在解析失败时被静默丢弃**——内容为空，无 `tool_calls`，但仍报告补全 token（[#17274](https://github.com/ollama/ollama/issues/17274)）。**修复：** [PR #18461](https://github.com/ollama/ollama/pull/18461) 在未解析到工具调用时将缓冲输出作为 `content` 返回。

**中严重度**
- **Anthropic 兼容：system-role 消息被提升至 system 块**（[#18431](https://github.com/ollama/ollama/issues/18431)），破坏了 Claude Code 工作流（其在每次工具结果后注入 system 消息）的前缀缓存。尚无修复 PR。
- **gemma4:26b 在并发解码时丢失 EOS**，达到 `num_predict`，而同一 GB10 测试环境下 `qwen3.8-27b` 运行正常（[#18442](https://github.com/ollama/ollama/issues/18442)）。提示这是并发条件下的模型特定解码正确性缺陷。
- **启用思维链时 MLX 结构化输出在 JSON 前多出杂散 `.`**（[#18441](https://github.com/ollama/ollama/issues/18441)）。**修复：** [PR #18459](https://github.com/ollama/ollama/pull/18459) 新增 MLX 专用的结构化标签文法，避免 off-by-one 的 token 泄漏。
- **muse-glimmer:30b-mlx（NVFP4）在 M4 Air 32GB 上反复卡在"Stopping…"**（[#18269](https://github.com/ollama/ollama/issues/18269)）。一旦传播到位，[PR #18449](https://github.com/ollama/ollama/pull/18449) 中的 MLX nvfp4 损坏修复很可能是缓解手段。
- **`/api/codex/v1/responses` 在 `previous_response_id` 工具后续调用时返回空补全**（[#18419](https://github.com/ollama/ollama/issues/18419)），破坏 Codex 风格的 agent 循环。

**低严重度**
- **`ollama launch claude` 宣称 1M 上下文但实际以 200K 窗口运行**；262K 的模型被标记为 1M（[#18463](https://github.com/ollama/ollama/issues/18463)）。
- **大量 manifest 存在时出现间歇性 `model not found` 错误**（[#18447](https://github.com/ollama/ollama/issues/18447)）。**修复：** [PR #18438](https://github.com/ollama/ollama/pull/18438) 修复了跨复合模型名称的大小写不敏感规范化问题。
- **`/api/codex/v1/responses` 在 `previous_response_id` 上返回空补全**（[#18419](https://github.com/ollama/ollama/issues/18419)）——后续渲染输入/输出 token 均为零。
- **库页面上未记录的每模型 Ollama 版本要求**（[#18414](https://github.com/ollama/ollama/issues/18414)）。
- **Qwen3.8-27B-GSQ-RCO-GGUF 的 IQ3_S 量化返回空内容**（[#18297](https://github.com/ollama/ollama/issues/18297)，已关闭）——原为解析器问题，现已修复。
- **分词器：WordPiece 将 Unicode 标点丢弃至 unknown token**（[PR #18462](https://github.com/ollama/ollama/pull/18462)，开放中）——对多语言输入的正确性影响。
- **GGUF 延迟读取器与 `/api/create` 转换器中的两处后台 goroutine 泄漏 bug 已关闭**（[#17180](https://github.com/ollama/ollama/issues/17180)、[#17179](https://github.com/ollama/ollama/issues/17179)）——稳定性加固已落地。

## 6. 对应用开发者的意义

- **工具调用消费者现在可以优雅地恢复。** 随着 [PR #18461](https://github.com/ollama/ollama/pull/18461) 发布，对格式错误的工具调用解析失败时，解析器会将缓冲的文本作为 `content` 输出，而非返回空响应。应用端的"模型是否真的调用了工具？"检查恢复可靠。
- **Apple Silicon 上的长上下文 agent 工作负载仍然紧张。** 8 GiB MLX 前缀缓存预算为硬编码，现已确认为已知调优旋钮而非内存泄漏（[#18131](https://github.com/ollama/ollama/issues/18131)）。在 32GB Mac 上为 `qwen3.8:27b-mlx` 类 agent 预留余量，并关注分配失败重试（[#18231](https://github.com/ollama/ollama/issues/18231)）。
- **MLX nvfp4 多模态模型（含 Gemma 4 视觉塔）在 [MLX-C 升级](https://github.com/ollama/ollama/pull/18449) 进入发布版本后应重新拉取**——损坏是已知上游问题。
- **与 Claude Code 的 Anthropic 兼容集成目前对缓存不友好。** 如果你的 agent 流水线在工具结果后注入 `role: "system"`，Ollama 的 `/v1/messages` 端点会将其合并到顶部 system 块中，使前缀缓存失效。在 [#18431](https://github.com/ollama/ollama/issues/18431) 修复前，请重构消息或固定使用 `/v1/chat/completions` 端点。
- **为 `typical_p` 移除做准备**（[PR #18448](https://github.com/ollama/ollama/pull/18448)），将在下一 minor 版本生效。现有 Modelfile 仍可使用，但新模型创建将不再接受该参数。
- **Prefill 缓存持久化**（[PR #17953](https://github.com/ollama/ollama/pull/17953)）是当前最具影响力的 agent 吞吐改进——在 0.34.x 发布后通过 `OLLAMA_PREFILL_CACHE=1` 启用，并与当前的冷启动 prefill 成本进行基准对比。
- **版本固定现在更加重要。** 随着未记录的每模型 Ollama 版本要求出现（[#18414](https://github.com/ollama/ollama/issues/18414)），生产部署应跟踪 `ollama show <model>` 输出并固定到最低兼容的服务器版本，而非假设库页面元数据完整。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-15

## 今日要点

v1.101.0 版本随附 cosign 签名的 Docker 镜像（锚定到提交 `0112e5304`），为运维人员提供稳定的供应链验证信任根。在此背后，项目正并行整合三条主线：治理正确性（按团队限流 #34140、过期的消费预算错误 #27735、跨前置钩子的标签预算 #41218）、SAP/Bedrock/Anthropic/Responses-API 的供应商管道，以及一项多区域架构迁移（#41221），后者通过 Redis 只读副本实现跨区域限流强制执行，从而无需在每次请求中支付全局 Redis 跳转的代价。

## 版本发布与破坏性变更

- **v1.101.0** — 发布说明 (https://github.com/BerriAI/litellm/releases/tag/v1.101.0)。头条变更：每个 LiteLLM Docker 镜像现均使用提交 [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中引入的密钥通过 [cosign](https://docs.sigstore.dev/cosign/overview/) 签名。运维人员应在拉取镜像时验证其来源。

## 新模型与硬件支持

- **通过 Mantle 端点的 Gemma 4** — 请求 #30657 (https://github.com/BerriAI/litellm/issues/30657)。之前的 Bedrock 路径 (#30264) 已无法解析；需要接入 Mantle 路由。仍处于开放状态，评论较少，2 👍。
- **Gemini（Vertex AI / Google AI Studio）的 OpenAI 兼容 `video_url` 内容** — 请求 #30501 (https://github.com/BerriAI/litellm/issues/30501)。仍开放，尚未实现。
- **Bedrock 运行时的 OpenAI 模型原生 Responses API** — PR #38489 (https://github.com/BerriAI/litellm/pull/38489)。作者明确标注 **对 #38388 存在合并顺序依赖**：先合入会在新路由上留下授权漏洞。尚未合并。

## 性能与优化

- **通过 Redis 只读副本实现跨区域限流** — PR #41221 (https://github.com/BerriAI/litellm/pull/41221)。当前每个区域都基于自身 Redis 强制执行限流，因此一个密钥在两个区域活跃时实际可获得约 2 倍配额；唯一的替代方案是使用单一全局 Redis，每次请求都增加一次跨区域跳转。该 PR 引入了可选的副本列表，使区域能够在本地读取兄弟区域的计数器，而写入仍保持在本地。对主动-主动的多区域部署而言，可带来显著的延迟改善。

## 稳定性与回归问题

### 高影响的开放问题

- **#34281 — 离线主机上健康检查严重崩溃** (https://github.com/BerriAI/litellm/issues/34281)。临时 HomeLab 主机会引发硬性失败，而非优雅降级。13 条评论，尚无修复 PR。
- **#27735 — 虚拟密钥的 `BudgetExceededError` 使用了过期的消费数据** (https://github.com/BerriAI/litellm/issues/27735)。代理在团队作用域的虚拟密钥上拒绝请求，但 `/key/info` 显示的消费仍低于上限。是 #27639 的后续问题。尚无修复 PR。
- **#34140 — v3 限流器对 `model_per_team` 限制双重计数** (https://github.com/BerriAI/litellm/issues/34140)。配置的 RPM/TPM 仅以预期值的一半被强制执行。7 条评论，尚无修复 PR。
- **#20962 — 非管理员用户无法创建 API 密钥** (https://github.com/BerriAI/litellm/issues/20962)。界面强制选择团队；API 阻止非管理员设置 `team_id`。对 `internal_user` 角色而言是死锁。5 条评论，6 👍，尚无修复 PR。
- **#41187 — v1.94.0 中 `streaming_handler` 回归** (https://github.com/BerriAI/litellm/issues/41187)。OpenAI 兼容流可能以 `'MockValSer' object cannot be converted to 'SchemaSerializer'` 失败，表现为 500。在高负载下影响自托管的 `hosted_vllm`。摘要撰写时修复 PR 尚未开启。
- **#41159 — 省略 `input` 时 `POST /v1/responses` 报 500 并附带原始 Python `TypeError`** (https://github.com/BerriAI/litellm/issues/41159)。修复：PR #41184 (https://github.com/BerriAI/litellm/pull/41184) 返回 400 并指出 `input`。
- **#39431 — `/v1/messages` 流式响应延迟 `message_start` 直到思考结束** (https://github.com/BerriAI/litellm/issues/39431)。即使未配置回退，也会影响支持自适应思考的 Bedrock 模型（如 Claude Sonnet 5）。修复 PR 尚未开启。
- **#28216 — `Router.aresponses(stream=True)` 绕过流中回退** (https://github.com/BerriAI/litellm/issues/28216)。`MidStreamFallbackError` 未被处理；配置的跨供应商回退在主流中途中断时从不触发。修复 PR 尚未开启。
- **#40404 — 上游流异常结束时，路由/代理从不尝试回退** (https://github.com/BerriAI/litellm/issues/40404)。请求被切断、停滞或畸形块尾部卡住，而非故障转移。修复 PR 尚未开启。
- **#40388 — SAP AI Core 流式响应因 Pydantic 校验提前终止** (https://github.com/BerriAI/litellm/issues/40388)。同一类 `MockValSer` 失败。有两个进行中的 PR：#41222（同步 OpenAI 参数）和 #34900（规范化 SAP 流块并提供更清晰的缺失部署错误）。
- **#29268 — Docker 镜像仍打包 `ddtrace` 2.19.0** (https://github.com/BerriAI/litellm/issues/29268)。在启用 APM 追踪时，会破坏 Python 3.13 上的 `/embeddings`。长期存在的问题（最初是 #8744，因无活动被自动关闭）。修复 PR 尚未开启。
- **#30539 — Responses → Chat 桥转发 `tools: []`，vLLM 报 422** (https://github.com/BerriAI/litellm/issues/30539)。无工具的请求向严格的 OpenAI 兼容上游发送空 tools 数组。修复 PR 尚未开启。
- **#30008 — 自 v1.87.1 起自定义脱敏标签（`keyword_redaction_tag`、`pattern_redaction_format`）被破坏** (https://github.com/BerriAI/litellm/issues/30008)。修复 PR 尚未开启。
- **#27849 — 批量邀请用户获得的令牌缺少 `sk-` 前缀** (https://github.com/BerriAI/litellm/issues/27849)。令牌每次调用都被拒绝。修复 PR 尚未开启。
- **#35599 — `/v1/rag/query` 绕过 `vector_store_registry` 凭据解析** (https://github.com/BerriAI/litellm/issues/35599)。直接调用 `litellm.vector_stores.asearch()`，跳过了独立端点 `/v1/vector_stores/{id}/search` 所使用的凭据解析器。修复 PR 尚未开启。
- **#41176 — 仅 API 全新部署时 `/invitation/new` 报 400 并显示误导性的 "User id does not exist"** (https://github.com/BerriAI/litellm/issues/41176)。此前无 UI 登录。修复 PR 尚未开启。
- **#17993 — `get_next_standardized_reset_time` 中的跨日滚动缺陷** (https://github.com/BerriAI/litellm/issues/17993)。大持续时间值会生成错误的预算重置时间。已停滞，尚无修复 PR。
- **#30301 — 供应商变换将 LiteLLM 内部的 `optional_params` 泄漏到请求体中** (https://github.com/BerriAI/litellm/issues/30301)。严格的供应商会拒绝这些被转发的字段。尚无修复 PR。

### 近期已关闭（已修复或以其他方式处理）

- **#36566 — 日志和 Guardrails Monitor 中缺失 `litellm_content_filter` 评估** — 已关闭 (https://github.com/BerriAI/litellm/issues/36566)。
- **#26552 — 带蒙版的 `/v1/images/edits`** — 已关闭 (https://github.com/BerriAI/litellm/issues/26552)。
- **#40548 — `Created By`/`Updated At` 列显示 `Unknown`** — 已关闭 (https://github.com/BerriAI/litellm/issues/40548)。
- **#28444 — 透传端点未启用 Post-API 钩子** — 已关闭 (https://github.com/BerriAI/litellm/issues/28444)。
- **#38401 — Bedrock Realtime 会话在供应商就绪前即确认** — 已关闭 (https://github.com/BerriAI/litellm/issues/38401)。
- **#25940 — Langfuse 遥测在 v1.83 中以 `AttributeError` 失败** — 已关闭 (https://github.com/BerriAI/litellm/issues/25940)；由 SDK-v4 迁移 PR #36741 (https://github.com/BerriAI/litellm/pull/36741) 跟踪。
- **#41029 — 管理界面全页重载及导航时的 404 预取风暴** — 已关闭 (https://github.com/BerriAI/litellm/issues/41029)。
- **#30035 — 输出超出大小限制（Python 3.13 traceback）** — 已关闭 (https://github.com/BerriAI/litellm/issues/30035)。

### 值得关注的进行中修复 PR（尚未合并）

- **#41218 — 对前置钩子添加的标签强制执行标签预算** (https://github.com/BerriAI/litellm/pull/41218)。填补了护栏设置的标签被计费却永不会被阻止的漏洞。
- **#41092 — 项目只能挂载到自身团队的密钥** (https://github.com/BerriAI/litellm/pull/41092)。修复 #41089；此前 `_check_project_key_limits` 从未验证项目所有权。
-

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-15

## 今日要点

今天是 Unsloth Studio 的重度维护日：danielhanchen 提交或新开了约 10 个 PR，目标是解决 **GPU 降级回归**（当 nvidia-smi 缺失或信息过期时，CUDA llama-server 会静默回退到 CPU）以及对 `install.ps1`/`install.sh` 的**杀毒软件误报加固**，并且一套新的度量框架终于能够证明这些改动确实见效。在用户可见层面，Studio 修复或新报告了若干 UX bug，涉及 MCP 工具加载、Ollama 模型自动切换、AMD/ROCm 图像生成，以及一个反复出现、导致 Z-Image GGUF 在 Windows 上无法运行的 `torch._dynamo` 循环导入问题。

## 版本发布与破坏性变更

*过去 24 小时没有新的打标签发布。*

已合并或暂存于 PR 中的显著行为变更：
- **PR #11009** — 编译缓存包的写入已从图像生成请求路径移至后台 worker；"100%" 处卡住的 37 秒同步写入已成为历史。
- **PR #10989** — `diffusers` 及相关库在预热完成后的 worker 中预导入。
- **PR #10981** — 关闭 diffusion 加载路径上 `torch._dynamo` 的部分初始化窗口。
- **PR #10783** — 新增按模型自定义 llama.cpp INI 模式；显式**接管** llama.cpp 调优，并绕过 Studio 的优化器/启动回退重写。

## 新模型与硬件支持

- **AMD ROCm Docker 镜像**（Issue #6230，已关闭）— 新增与 Blackwell 镜像对应的 ROCm 容器变体；面向 RDNA2/3/4 和 CDNA/Instinct。
- **Apple Silicon 上的 MLX 自动切换**（Issue #10951，开放中）— 已安装的 MLX 模型在自动切换时仍返回 404，除非预先加载。
- **通过 llama-server 输入 Gemma 4 图像**（Issue #10559，已关闭）— 修复 diffusion 类图像输入的 GGUF ubatch-size 问题。
- **Z-Image GGUF**（Issues #10350、#10963，开放中）— Windows 上的 `torch._dynamo` 循环导入导致桌面端支持损坏；修复见 PR #10981。
- **通过 Studio API 暴露 Ollama 已安装模型**（PR #10763，开放中）— 重构了 `_best_model_for_provider` 和 `_resolve_local_filename`。
- **按模型的 llama.cpp INI**（PR #10783，开放中）— 细粒度、由用户掌控的后端调优。
- **OpenAI `video_url` 内容分块**（PR #10439，开放中）— Studio 的 `/v1/chat/completions` 将接受目前被解析为 `UnknownContentPart` 的视频分块。

## 性能与优化

- **首次 diffusion 加载耗时**（PR #10989）— 实测的导入开销被移入预热完成后的 worker：
  | 导入项 | 耗时 | RSS |
  |---|---|---|
  | `diffusers` | 1.63 s | 169.8 MB |
  | `diffusers.hooks` | 2.38 s | 104.5 MB |
  | pipeline 类 | （已测量，见 PR 内表格） | — |

  净效果：首次图像加载不再需要在面向用户的请求路径上承担这部分开销。

- **图像生成延迟**（PR #11009）— 编译缓存包改用 `save_async`；此前的内联写入会让 "100%" 卡住约 37 秒。
- **NVIDIA 驱动库探测**（PR #11007、#11008）— 当 `nvidia-smi` 缺失、信息过期或挂起时，`install_llama_prebuilt.py` / `setup.sh` 现在会直接读取驱动库；修复了 GPU 降级相关报告（#10985、#5941 系列）。
- **Windows CUDA 预编译版本选择**（PR #11006）— 改为按检测到的 DLL 重排序而非据此做排除过滤；现在会尝试 portable 回退方案；对 `keep paths` 应用了 SM 覆盖率门槛。
- **带量化测量的杀毒误报加固**（PR #10992、#10996）— 首个量化基线：`install.ps1` @ `1ad44677d` 的哈希为 `ec29980b…`，与 VirusTotal 的判定一致。这使此前六轮加固（#7822、#8586、#6326、#10540、#10560、#10504）终于可以做到前后对比。

## 稳定性与回归

按影响范围排序：

1. **CUDA 主机上 GPU → CPU 静默降级**（Issue #9255，已关闭；PR #10994，PRs #11005/11006/11007/11008，开放中）
   - `install_llama_prebuilt.py` 会回退到源码构建，在没有 `nvcc` 的情况下编译，生成仅支持 CPU 的 llama.cpp 却报告成功。Embeddings 和生成在毫无提示的情况下失去 GPU。自 #10985 起的这波 PR 恢复了 GPU 优先级、驱动库探测以及 `setup.ps1` 对 GPU 预编译版本的保留。

2. **Z-Image GGUF 上的 `torch._dynamo` 部分初始化崩溃（Windows 桌面端）**（Issues #10350、#10963；PR #10981）
   - 堆栈一致：`partially initialized module 'torch._dynamo' has no attribute 'utils'`。修复方案关闭了 diffusion 加载路径上惰性子模块的窗口期。

3. **会丢失已下载模型的 Docker 挂载**（Issue #10923，开放中，7 条评论）
   - 文档说挂载 `/workspace/work`，但模型下载实际落在别处；用户在容器重启后丢失状态。这是文档修复，不是代码修复。

4. **`--tensor-split` 被忽略**（Issue #10355，已关闭）— 多 GPU 张量并行参数被静默丢弃；有用户为此耗费了“数小时”排查。

5. **Windows ROCm / Flux 导入失败**（Issue #8406，开放中）— 文本 GGUF 被送进了 diffusion 图像加载器，以及在 Radeon PRO W7900/W7500 + ROCm 7.13.99004 上 Flux 的 `torch.distributed.Work` 导入失败。

6. **MLX 模型除非预加载否则 404**（Issue #10951，开放中）— 自动切换解析器对已安装的 MLX 模型返回 404；PR #10763 的解析器改动涉及同一代码路径。

7. **MCP 上下文膨胀 / 截断**（Issues #10822、#10839、#10997，开放中）— Notion MCP 吞掉了一个 24 GB 显存模型约 61K tokens 的上下文；另有关于 MCP 调用被系统性截断的单独报告（疑似与去重逻辑有关）。

8. **Studio UX / 状态不一致**（Issues #10817 已关闭、#10904 开放中、#10917 开放中、#10929 开放中、#10995 开放中、#11002 开放中）— 运行设置侧边栏与模型下拉框的草稿会静默不一致；HF 权限已撤销但本地有缓存时报误导性错误；`studio/backend/tests/` 的 `loggers` 桩导致测试收集失败；Data Recipe worker 非确定性地收到 SIGTERM。

9. **杀毒误报阻止安装程序**（Issue 系列 #8523、#6326、#6588、#6648、#10540、#10805；PRs #10979、#10986、#10990、#10992、#10994、#10996）— 从未收集过产品/检测名/AMSI 提供方信息；厂商解除误报需要哈希值 + 检测名。新的遥测 PR 同时捕获这两者，删除了被厂商标记的两个 fixture 归档文件，并停止在安装程序中输出可被分类器读懂的涉及杀毒软件的文字说明。

10. **较低严重度** — `#10637` 数据集下载按钮（已关闭）、`#10425` Code 工具文件预览（已关闭）、`#9649` Ollama Thinking 控制（已关闭）、`#10894` 音频/图像 UX（开放中）、`#10983` 持久化聊天运行泄漏媒体 URI（开放中）、`#10699` Codex TUI 在 Windows 上报 `stdout is not a terminal`（开放中）、`#10795` X11 WebKit DMA-BUF fd 泄漏（已关闭）、`#10945-#10947` 低质量/垃圾报告（已关闭）。

## 对应用开发者意味着什么

- **显式锁定你的 Unsloth Studio 版本**（如果你依赖多 GPU 或任何 `--tensor-split` 语义）；#10355 的回归和 #9255/#10985 的 GPU 降级系列意味着，在下一批补丁落地之前，静默的性能断崖是真实存在的。请持续关注 PRs #11005–#11008。
- **在 Windows + AMD 或 + Z-Image GGUF 环境下**，在 #10981 落地之前先别用 `Unsloth Desktop` 做 diffusion 加载 — `torch._dynamo` 部分初始化的堆栈是确定可复现的。
- **MCP 集成方**：上下文膨胀是头号被报告的痛点（#10839、#10997）。惰性工具加载和精选版 MCP hub 都在推进中（#10822、#10997）— 设计提示词时请假定工具 schema 是*可选启用*（opt-in）而非默认加载。
- **Ollama + Studio 用户**：模型自动切换和 Thinking/推理控制存在已知缺口（#10951、#9649、#10763）。如果你通过 Ollama 路由推理型工作负载，请核实 `reasoning_effort` 是否真的传到了上游代理。
- **图像生成延迟预算**：同步的编译缓存包写入（约 37 秒）正在 #11009 中被移出请求路径；如果你在应用中对用户可见的“生成完成”事件计时，请预期该 PR 上线后会出现阶跃式变化。
- **对杀毒软件敏感的部署**：如果你的企业杀毒软件隔离了 `install.ps1`，请在加白之前先记录**检测名 + AMSI 提供方**；PR #10986 终于在安装程序中加入了相应埋点。目前这方面完全没有可靠信号。
- **长上下文聊天应用**：“模型在 compaction 前给自己留一条备忘”的想法（#10904）正在开放征集 👍 — 如果你在 Unsloth Studio 之上维护 agent 记忆层，值得去表态。

---

*数据窗口：截至 2026-09-15 的 24 小时内更新的 GitHub issues/PRs。仓库：[unslothai/unsloth](https://github.com/unslothai/unsloth)。*

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 摘要 — 2026-09-15

## 今日要点

过去 24 小时无新发布或拉取请求，但 **Issue 活动集中在 v3.1.0 引入（或暴露）的稳定性回归** —— 最突出的是一个仅限 Windows 的认证循环问题和一个包装器启动器中的 Windows 环境变量转义 Bug，以及一个网关级别的错误屏蔽问题（会抑制上游 `context_length_exceeded` 信号并破坏 Claude Code 的自动重试 / 自动压缩行为）。仪表盘热力图组件还存在一个 UI 裁剪 Bug。另有一个讨论帖在探讨为 GLM-5.3 提供付费"Token 套餐"层级的可能性。

## 发布与重大变更

*过去 24 小时无新发布。* 在所有开放 Issue 中被引用的最新标记版本为 **v3.1.0**（Desktop、Windows），今日有三个 Issue 针对该版本提交。

## 新增模型与硬件支持

- **#1747** — *仅讨论，未涉及代码变更*：musistudio 正在调研社区对面向 **GLM-5.3** 的 token 套餐层级的兴趣，并表示计划"针对 Claude Code 与 Codex 做特定优化"。该帖不涉及后端、量化或运行时（CUDA / ROCm / Metal / CPU）相关影响。([#1747](https://github.com/musistudio/claude-code-router/issues/1747))

## 性能与优化

*过去 24 小时无性能相关的 PR 或 Issue。*

## 稳定性与回归

按用户可感知的严重程度排序：

1. **[严重] 网关屏蔽上游上下文长度错误 → "All target providers failed"** ([#1799](https://github.com/musistudio/claude-code-router/issues/1799))
   CCR 的回退聚合器会把来自 vLLM / OpenAI 兼容端点的上游 400 错误（尤其是 `context_length_exceeded`）折叠成一条通用的 `"All target providers failed."` 消息。因此 Claude Code CLI **不会**自动降低 `max_tokens`，也 **不会**触发自动压缩 —— 而这一行为在对接原生 Anthropic 错误格式时是正常工作的。暂未关联修复 PR。

2. **[高] 来自 Claude 会话的 `autoMode:true` 会破坏 Windows v3.1.0 上的 `apiKeyHelper`** ([#1798](https://github.com/musistudio/claude-code-router/issues/1798))
   会话在 profile 设置中写入 `autoMode: true`，会导致 CCR Desktop 将该标志同步到配置存储，并在每次启动时重写 `settings.json`。最终状态：Claude Code 提示 **"Not logged in"** 并忽略 `apiKeyHelper`。暂未关联修复 PR。针对 **Desktop v3.1.0 on Windows，端口 3456** 提交。

3. **[中] Windows 包装器命令对环境变量进行了双重转义** ([#1797](https://github.com/musistudio/claude-code-router/issues/1797))
   `Ec()`（输出未加引号的 `set KEY=value`）与 `ce()`（输出加引号的 `set "KEY=value"`）之间的不一致，导致脱字符与 `%%` 会泄漏到子进程环境中。具体表现：包含 `()` 的模型名到达子进程时变为 `^(self hosted^)`。影响 **Desktop v3.1.0 on Windows**。暂未关联修复 PR。

4. **[低] 仪表盘活动（Token 热力图）宽组件尺寸下底部行被裁剪** ([#1800](https://github.com/musistudio/claude-code-router/issues/1800))
   `packages/ui/src/pages/home/components/dashboard.tsx` 中 `OverviewActivityGrid` 的外观性 UI 回归。可在 `main` 分支与 Electron 应用中复现。暂未关联修复 PR。

> 规律提示：#1797、#1798 与 #1799 三个 Issue 报告的都是 **v3.1.0** Desktop / Windows 路径下的行为缺陷，但在过去 24 小时窗口内尚无 PR 或提交落地。在进一步推进发布前，对这一批问题进行工程评审是必要的。

## 对应用开发者的影响

- **在当前流量经过 CCR 时，不要依赖 Claude Code 原生的上下文溢出恢复机制。** 在 #1799 修复前，应自行实现 `max_tokens` 的回退逻辑，或将原始上游错误暴露给智能体循环；否则长上下文会话会撞上笼统的 `"All target providers failed."` 并陷入停滞。([#1799](https://github.com/musistudio/claude-code-router/issues/1799))
- **如果你正在使用 Windows Desktop v3.1.0，发布前请先固定版本或降级。** `autoMode` 与 `apiKeyHelper` 的交互问题（#1798）会在每次重启时静默破坏登录流程；#1797 会破坏包含括号的模型名 —— 在两者修复之前，请避免选用形如 `my-org/llama-3.1-8b (q4)` 这类自托管模型标识符。([#1798](https://github.com/musistudio/claude-code-router/issues/1798)，[#1797](https://github.com/musistudio/claude-code-router/issues/1797))
- **仪表盘组件：在 #1800 的裁剪修复落地前避免使用宽布局**，特别是当你在嵌入 CCR 的 `OverviewActivityGrid` 时。([#1800](https://github.com/musistudio/claude-code-router/issues/1800))
- **关注 #1747**，如果你正在为 GLM 后端做成本建模 —— 这是一个定价 / 套餐信号而非兼容性信号，但其中提到的针对 Claude Code / Codex 的特定优化是上游 Provider 路由方向的一个前瞻性指标。([#1747](https://github.com/musistudio/claude-code-router/issues/1747))

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch Digest — 2026-09-15

## 1. 今日要点

过去 24 小时内 CC Switch 没有新版本发布，但代码库主要被 **Codex 集成回归问题**（v3.20.0 → v3.20.3）所主导，同时在协同推进将 **Google Antigravity** 作为 Gemini 的官方继任者。最具影响力的合入 PR 聚焦于代理正确性（inline `

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# 新 API 摘要 — 2026-09-15

*项目：[QuantumNous/new-api](https://github.com/QuantumNous/new-api) — LLM 网关 / 统一模型服务代理*

---

## 1. 今日要点

项目正处于 **v1.0.0 发布候选阶段（当前 `rc.37`）**，围绕流式/计费中继路径进行了大量稳定性修复。今日最值得关注的合并：PR [#7395](https://github.com/QuantumNous/new-api/pull/7395)、[#7388](https://github.com/QuantumNous/new-api/pull/7388)、[#7387](https://github.com/QuantumNous/new-api/pull/7387)、[#7389](https://github.com/QuantumNous/new-api/pull/7389)、[#7386](https://github.com/QuantumNous/new-api/pull/7386) 均修复了上周报告的跨协议转换、Gemini 路由以及阶梯计费内存回归问题。**过去 24 小时没有新的标签版本。**

---

## 2. 发布与破坏性变更

- **过去 24 小时无新发布。** 当前最新引用构建为 `v1.0.0-rc.37`（参见 [#7385](https://github.com/QuantumNous/new-api/issues/7385)、[#7392](https://github.com/QuantumNous/new-api/issues/7392)）。
- **GA 标准仍未明确。** [#7279](https://github.com/QuantumNous/new-api/issues/7279)（👍8，9 条评论）请求维护者发布 v1.0.0 的具体 GA 清单 —— 触发因素是 `rc.36`。运维人员在 GA 之前应将当前的 RC 标签视为非生产版本。
- **V1 前端反馈汇总** [#4687](https://github.com/QuantumNous/new-api/issues/4687)（44 条评论，已关闭）是提交 V1-UI 问题的标准入口，现已关闭以便重新汇总。[#7145](https://github.com/QuantumNous/new-api/pull/7145) 修复了价格排序菜单上的导航栏偏移问题。

---

## 3. 新模型与硬件支持

- **vLLM 与 SGLang 渠道** — [#7332](https://github.com/QuantumNous/new-api/pull/7332) 新增对 vLLM 和 SGLang 后端的一级渠道适配器，可将自托管推理作为 New-API 的上游接入。
- **阿里云百炼 TTS** — [#6811](https://github.com/QuantumNous/new-api/pull/6811) 实现了 `/v1/audio/speech` 到阿里云百炼的协议翻译，包括音色映射、语速转换以及按字符计费。
- **Ollama OpenAI 兼容聊天开关** — [#7382](https://github.com/QuantumNous/new-api/pull/7382) 支持在每个渠道粒度上以 OpenAI chat-completions 语义访问 Ollama 渠道。
- **DeepSeek 人民币 → 美元余额归一化** — [#6814](https://github.com/QuantumNous/new-api/pull/6814) 关闭了 [#5063](https://github.com/QuantumNous/new-api/issues/5063)：渠道余额拉取现在默认正确存储为美元。

今日未报告新的硬件后端（CUDA/ROCm/Metal/CPU）或量化格式。

---

## 4. 性能与优化

- **阶梯计费 body 读取跳过** — [#7395](https://github.com/QuantumNous/new-api/pull/7395) 在阶梯表达式不包含 `param()` 调用时，跳过将整个请求体读入内存，关闭了 OOM 级问题 [#7394](https://github.com/QuantumNous/new-api/issues/7394) 并恢复了磁盘缓存的有效性。同类修复可参见此前的中继路径 OOM [#6949](https://github.com/QuantumNous/new-api/issues/6949)。
- **内存版速率限制器重写** — [#6807](https://github.com/QuantumNous/new-api/pull/6807) 用 LRU 链表替换了预先分配的切片；这是 `GLOBAL_API_RATE_LIMIT` OOM [#6732](https://github.com/QuantumNous/new-api/issues/6732) 的结构性修复（此前较高的 `maxRequestNum` 即使在空闲时也会固定占用大块缓冲区）。
- **SSE 转发延迟** — [#7033](https://github.com/QuantumNous/new-api/pull/7033) 去除了 `OaiStreamHandler` 中的一帧滞后（该实现持有 `lastStreamData`，直到下一 tick 才发出上一帧）。每个 OpenAI 兼容流的首 token 延迟现在应缩短一个上游帧；记录的 `FirstResponseTime` 指标也会相应变化。
- **跨协议流 usage** — [#7389](https://github.com/QuantumNous/new-api/pull/7389) 现在在每次跨协议转换时都请求 `stream_options.include_usage`，修复了上游仅发送末尾 usage chunk 时的计费漂移。
- **透传路径上的参数覆盖** — [#7346](https://github.com/QuantumNous/new-api/pull/7346) 重新引入透传中继分支上的渠道级参数覆盖（此前在 `pass_through_body_enabled` 时会被静默丢弃）。

---

## 5. 稳定性与回归

按严重程度/影响排序。✅ = 存在或已合并修复 PR。

| 严重程度 | Issue | 描述 | 修复 |
|---|---|---|---|
| 🔴 高 | [#6732](https://github.com/QuantumNous/new-api/issues/6732) | 设置 `GLOBAL_API_RATE_LIMIT=1000000` → 由于预分配限制器切片导致 memcg OOM | ✅ [#6807](https://github.com/QuantumNous/new-api/pull/6807) |
| 🔴 高 | [#7394](https://github.com/QuantumNous/new-api/new-api/issues/7394) | `tiered_expr` 即使表达式从不调用 `param()`，也会预先将整个请求体加载到内存中，使磁盘缓存失效，并保留至结算完成 | ✅ [#7395](https://github.com/QuantumNous/new-api/pull/7395) |
| 🔴 高 | [#7283](https://github.com/QuantumNous/new-api/issues/7283) | Gemini `:countTokens` 路径被匹配为 `generateContent` —— 无 totalTokens，延迟 24–44s，按生成内容计费 | ✅ [#7388](https://github.com/QuantumNous/new-api/pull/7388) 拒绝未知路由 |
| 🟠 中 | [#6822](https://github.com/QuantumNous/new-api/issues/6822) | `/v1/responses` 流式：上游 `created_at` 为浮点数时，三个快照事件被丢弃，usage 丢失，计费回退为估算 | 已关闭；[#7389](https://github.com/QuantumNous/new-api/pull/7389) 强化了相关路径 |
| 🟠 中 | [#6939](https://github.com/QuantumNous/new-api/issues/6939) | `deepseek-v4-flash` 思维链模式：未回传推理上下文时出现 `400 reasoning_content must be passed back` | 已关闭（已记录临时方案） |
| 🟠 中 | [#6639](https://github.com/QuantumNous/new-api/issues/6639) | 同时配置高级自定义路由与模型映射时无法正确转发 | OPEN |
| 🟠 中 | [#3448](https://github.com/QuantumNous/new-api/issues/3448) | 空闲 20–30 分钟 → 渠道测试挂起，外部 curl 返回 500；执行一次 curl 后恢复 | 已关闭（可能是连接池重连） |
| 🟠 中 | [#5233](https://github.com/QuantumNous/new-api/issues/5233) | 通过 OpenRouter 调用 Anthropic 持续返回地区性 403；重启后恢复 | 已关闭 |
| 🟡 低 | [#7385](https://github.com/QuantumNous/new-api/issues/7385) | `/v1/audio/speech` `stream_format=audio` 实时流式透传未实现 | OPEN |
| 🟡 低 | [#7393](https://github.com/QuantumNous/new-api/issues/7393) | 仪表盘图表在返回的实时桶不足 7 个时丢弃真实桶并合成 7 个假桶 | OPEN |
| 🟡 低 | [#7392](https://github.com/QuantumNous/new-api/issues/7392) | 将模型从按 token 计费切换为按表达式计费后，模型广场将所有价格渲染为 "dynamic" | OPEN |
| 🟡 低 | [#3255](https://github.com/QuantumNous/new-api/issues/3255) | Claude Code 在 `v0.11.4-alpha.2` 上图片上传报错 | 已关闭（过时的 alpha 版本） |
| 🟡 低 | [#7087](https://github.com/QuantumNous/new-api/issues/7087) | Responses SSE：缺失空的 `item` 数组导致丢失 Codex 活动项 | 已关闭 |
| 🟢 信息 | [#7146](https://github.com/QuantumNous/new-api/issues/7146) | 在渠道列表中添加厂商官网跳转按钮 | 已关闭（增强） |
| 🟢 信息 | [#7010](https://github.com/QuantumNous/new-api/issues/7010) / [#7011](https://github.com/QuantumNous/new-api/issues/7011) | 峰谷电价及 `weekday()` 表达式支持 | 已关闭（跟踪至计费引擎扩展） |

---

## 6. 对应用开发者的影响

- **仅在特性开关后使用 `rc.37+`。** v1.0.0 尚未 GA（[#7279](https://github.com/QuantumNous/new-api/issues/7279)）。如果您依赖 `/v1/responses`、codex 或 Gemini 路径的精确流式计费，请固定到包含 [#7242](https://github.com/QuantumNous/new-api/pull/7242)、[#7388](https://github.com/QuantumNous/new-api/pull/7388)、[#7389](https://github.com/QuantumNous/new-api/pull/7389) 和 [#7387](https://github.com/QuantumNous/new-api/pull/7387) 的版本 —— 末尾事件计费漂移是造成实际收入损失的源头。
- **新增自托管后端。** 您现在可以将 vLLM 和 SGLang（[#7332](https://github.com/QuantumNous/new-api/pull/7332)）接入为渠道；这是通过单个 OpenAI 兼容端点运行开源权重推理最直接的路径。
- **TTS 接口持续扩展。** 阿里云百炼 TTS（[#6811](https://github.com/QuantumNous/new-api/pull/6811)）加入现有音频渠道；仍然没有实时音频流中继（[#7385](https://github.com/QuantumNous/new-api/issues/7385) OPEN）。
- **Ollama 可靠性。** 流式下工具调用丢失问题（[#7376](https://github.com/QuantumNous/new-api/pull/7376)、[#7380](https://github.com/QuantumNous/new-api/pull/7380)）现已修复 —— 依赖 Ollama 渠道进行函数调用的智能体应升级。
- **未来 24–48 小时运维关注列表：** [#6639](https://github.com/QuantumNous/new-api/issues/6639)（路由与映射的交互）、[#7392](https://github.com/QuantumNous/new-api/issues/7392)（计费模式切换后模型广场 UI 渲染错误）。如果您将管理后台暴露给客户，请在影响用户前进行排查。
- **内存调优。** 如果您此前为缓解 429 而调高了 `GLOBAL_API_RATE_LIMIT`，在继续调高之前请确认已应用 [#6807](https://github.com/QuantumNous/new-api/pull/6807) —— 之前的实现正是 OOM 的源头。

---

*摘要基于 2026-09-15 更新的 41 个 issue 与 21 个 PR 生成。来源：[issues](https://github.com/QuantumNous/new-api/issues)、[pulls](https://github.com/QuantumNous/new-api/pulls)。*

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*