# AI 基础设施日报 2026-09-13

> 生成时间: 2026-09-12 23:30 UTC | 覆盖项目: 9 个

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

# 跨项目 AI 基础设施报告 — 2026-09-13

**范围：** vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth、Claude Code Router (CCR)、CC Switch、New API

---

## 1. 生态概览

当前生态的重心是 **DeepSeek-V4 / V4.1-Flash 的部署**，它同时在驱动最快的功能迭代速度（vLLM、SGLang）和最集中的正确性债务 —— 尤其集中在消费级 Blackwell（SM120/SM121：GB10、DGX Spark、RTX 6000D）以及多机部署场景。一个在 vLLM、SGLang *和* 商业服务提供商之间都能复现的检索正确性 bug（#55927）表明，内核/注意力层存在共享风险依赖，而非孤立的缺陷。在引擎层之下，**llama.cpp 继续保持工业化发布节奏（每天 10 个构建）**，而网关层（LiteLLM、New API、CC Switch、CCR）则围绕计费正确性、协议转换和编码 Agent 路由展开竞争，而非追求原始吞吐量。Unsloth 本周期专注于稳定性工作（主分支恢复、Docker 修复）以及 AMD ROCm 扩展。总体态势：**高速度、低信任 —— 今日摘要中"静默错误输出"的 bug 多于显式崩溃。**

---

## 2. 活动对比

*计数 = 今日摘要中出现的独立 issue/PR（已开启、更新或关闭）；不代表仓库总流量。*

| 项目 | 层级 | Issue（涉及） | PR（涉及） | 发布状态（24h） | 主导主题 |
|---|---|---|---|---|---|
| **vLLM** | 推理引擎 | ~23（6 个陈旧关闭） | ~23 | 无 | DS-V4.1 ROCm 内核推进；DSpark 分离式推理；DS-V4.x bug 集群 |
| **SGLang** | 推理引擎 | ~22（6 个关闭） | ~17 | 无 | Blackwell SM120/121 正确性集群；MLA/TRTLLM 融合 |
| **llama.cpp** | 本地运行时 | ~25（9 个关闭/修复） | ~22 | **10 个构建**（b10921–b10932） | 后端广度（HIP、OpenCL、WebGPU、Vulkan）；IQ 量化安全性 |
| **Ollama** | 本地运行时 | ~13 | ~9 | 无 | 修复性维护；工具调用解析器修复 |
| **LiteLLM** | 网关 | ~24（8 个修复/关闭） | ~14 | 无 | 成本/计费正确性扫荡；Responses↔Chat 桥接 |
| **Unsloth** | 微调 | ~12 | ~15 | 无 | 主分支恢复；ROCm Docker；Studio 安全报告 |
| **Claude Code Router** | 编码 Agent 路由器 | ~6 | ~3 | 无 | 成本归属修复；非流式推理内容损坏 |
| **CC Switch** | 桌面切换器/代理 | ~22（11 个陈旧/关闭） | ~19 | 无 | Codex/DeepSeek `/responses` 修复；`model_mapper`→`model_router` 重命名 |
| **New API** | 自托管网关 | ~10 | ~15 | 无（v1.0.0-rc.37 系列） | 安全加固（SSRF）；vLLM 通道；计费准确性 |

**解读：** 引擎类项目相对于修复吞吐量背负着最重的未关闭 issue 负载（vLLM 列出约 11 个未修复 bug，且 *无对应修复 PR*，其中数个影响旗舰模型）。llama.cpp 是今日唯一发布版本的项目，与其"小面积、高频次"的发布模式一致。四个网关/路由项目合计约 64 个 issue / 51 个 PR —— 对于一个"只做代理"的层级而言，活动占比相当高。

---

## 3. 模型支持竞速

| 模型族 | vLLM | SGLang | llama.cpp | Ollama | 网关（LiteLLM / New API / CCR / CC Switch） |
|---|---|---|---|---|---|
| **DeepSeek-V4 / V4.1-Flash** | 注册已合并（#56214）；DSpark MTP in PP 分离式推理（#53577）；sparse-MLA PCP+DCP（#56157）。**故障**：H20（#56389）、GB10（#56461）、Ampere 阻塞 | MXFP4 MI355X 配方（#39230）、统一双池 KV（#37413）、FP4-KV RFC（#38902）。**故障**：SM121 上静默 25% GEMM 错误（#39193） | — | — | LiteLLM：Prism 原生提供方（#40914）。CC Switch：视觉能力缺失（#7308）、子 Agent 失败（#6178）。Unsloth：GGUF 请求未响应（#10838） |
| **GLM-5.2 / 5.3-Flash** | GLM-5.3-Flash 退化 bug（#56605） | GLM-5.2 MXFP4 配方已发布（#39230） | GLM-5.2 dense-MLA 损坏，未关闭（#26027） | — | CCR：非流式内容损坏（#1793）；GLM-5.3 token 规划 RFC（#1747） |
| **Gemma 4** | GemmaRMSNorm Triton 路径（#56308） | 工具调用解析器修复（#39240） | OpenVINO 加载失败（#24415） | 最深提交：视觉检测（#16879）、2 个解析器 PR（#18400、#18398）、Jetson OOM（#18396） | — |
| **Qwen 3.5/3.8/4** | Qwen4Exp QSA OOM（#56457）；混合 GDN 前缀缓存修复（#52244） | MLX Qwen3.5 崩溃与质量修复（#39238、#39242） | Qwen4 稀疏 FA（#28770）；Qwen3-Coder 解析（#28742） | qwen3.8 流式 500（#17778，修复待定） | — |
| **长尾** | Kimi K3 性能跟踪（#50587） | Kimi K3 分离式推理 TTFT（#34815）；MiniMax H3 GGUF（#38904） | ELMOD 2.7b（#28818）；Ling 3.0/Bailing V3 解析器（#28682） | Hy4 拒绝（#18287） | Meta Muse Voice（LiteLLM #39395）；Gemini 3.x 后缀 + Agentic Video（New API #7339、#7337）；Databricks Gemini 2.5（LiteLLM #40909） |

**结论：** **vLLM 和 SGLang 在前沿 MoE 支持上领先**，但都是"预稳定"状态下交付 —— DS-V4.1-Flash 在两大 GPU 等级上同时处于"已支持"又不安全的状态。**llama.cpp 在架构广度上领先**（小众模型、7+ 后端）。**网关在路由时效上领先**（模型发布后数天内即具备元数据）。量化/本地生态（Unsloth GGUF、Ollama）明显 **落后前沿数周**，而这恰恰是消费需求排队的方向（#10838、#18287）。

---

## 4. 性能前沿

优化工作集中在五个方向：

- **内核 —— AMD MI355X/gfx950 的推进是最大的单一投入。** vLLM 一天内合并了四个 DS-V4.1 ROCm PR（修复 TileLang 64-wide wavefront 问题，避免 91.1%→23.7% 的 GSM8K 回归；MXFP8 反量化回退；融合 `combine_topk_swa_indices`；融合 SwiGLU clamp）；SGLang 新增 TRTLLM MLA 融合 FP8 KV/Q 准备（#39232）和 VibeCUDA MSA 路由（#39233）。已知上限：8× MI355X 上并发度 1 时 35.89 tok/s（vLLM #56506）—— 显然还有提升空间。
- **KV 缓存与量化：** SGLang 的 FP4-KV RFC（#38902）和双池统一 KV（#37413）；DeepEP v2 BF16 批不变模式（#38160）；llama.cpp 的 IQ 量化→cuBLAS 回退用于 Blackwell（#28823）—— 以正确性换速度的让步。Unsloth 在训练侧推进 NVFP4/EXL3。
- **投机解码已全面部署，同时也全面脆弱：** vLLM 的 DFlash 在 `xgrammar` 下出现 FSM 失败（#53777），185k 上下文下净 *损失* 4–13×（#54691），Mamba 零复用（#54381）；SGLang 的量化 DFlash2 draft 静默接受约 0%（#39087）；llama.cpp 的 MTP prefill 在 MSVC 上慢 57×（#28790）。
- **分布式/分离式推理：** vLLM 的 DSpark PP targets in disagg（#53577）、MRV2 下的 Elastic EP（#53934）、NIXL 拓扑（#56645）；SGLang 在 PP8 Kimi-K3 上的 30s TTFT 下限（#34815）。
- **调度与主机侧开销：** SGLang 采样中移除 GPU 同步（#39234）以及拥塞感知 EPLB 批处理 RFC（#39192）；vLLM 的 MoE expert-offloading RFC（#38256）；Ollama 的 keep-alive 修复（释放 embedding 吞吐，#18392）；llama.cpp dist-tags 探测（CC Switch #7346，MB 级带宽节省）。

**值得关注的差距：** 边缘/本地性能相对数据中心出现倒退 —— qwen35 在 RTX 4090 上达到内存带宽 roofline 的 86%，但在 RTX 5090/Windows 上仅约 28%（#28196），sm_120 上 CUDA-graph 挂起问题持续存在（#27330、#28404）。

---

## 5. 层级定位

| 层级 | 项目 | 价值主张 | 今日证据 |
|---|---|---|---|
| **数据中心推理引擎** | vLLM、SGLang | 内核级吞吐量、TP/EP、分离式推理、投机解码 | 两个项目合计 40 个性能/内核 PR；相互竞争的 DS-V4.1 配方 |
| **本地运行时** | llama.cpp、Ollama | 后端广度（CUDA/HIP/Vulkan/OpenCL/SYCL/WebGPU/Metal）与打包/易用性 | llama.cpp：10 个发布，涉及 6 个后端家族。Ollama：稳定性打磨，继承 llama.cpp 的缺陷（如 keep-alive） |
| **网关与路由器** | LiteLLM、New API、CC Switch、CCR | 多提供方路由、计费、协议转换、编码 Agent 体验 | 计费正确性扫荡（LiteLLM ×4 修复；New API Anthropic 缓存 token #7305；CCR #1790）；各处 Responses↔ChatMessages 转换修复 |
| **微调** | Unsloth | 显存高效训练、量化、Studio 工具链 | TRL-0.20 兼容、ROCm Docker、EXL3；主分支恢复 |

**关键结构性观察：** 层级之间正在融合。New API 新增了 *原生 vLLM 通道*（#7332）；LiteLLM 正在将 *memory tools 吸收进网关*（#40918）；CC Switch/CCR 正演变为面向 Claude Code/Codex 的小型网关；Ollama 的 bug 越来越像是 llama.cpp bug 的浮现。引擎  网关边界正是活跃的接口。

---

## 6. 趋势信号

1. **DeepSeek-V4.x 是整个生态的压力测试。** 它出现在 9 个项目中的 6 个里 —— 作为特性、配方、计费元数据或 bug 来源。支持面扩张速度超过稳定性；应将"已支持"理解为"在特定 GPU 等级上已支持"（H200/MI355X ≠ H20 ≠ SM120/121 ≠ Ampere）。
2. **消费级 Blackwell（SM120/121）是最不可信的等级。** 静默 25% GEMM 错误（SGLang #39193）、capture 阶段崩溃（#39226、#39173）、CUDA-graph 挂起（llama.cpp #27330）、Marlin 损坏（vLLM #49546）。值得注意的是，多个故障是 *静默* 的 —— 没有报错、没有警告。
3. **静默正确性失败是压倒性的风险类别**，超过崩溃：请求间 KV 状态串扰（Ollama #17847）、幽灵工具调用（vLLM #56642）、0% 接受的投机解码（SGLang #39087）、top-k 候选被丢弃（vLLM #51782）、跨引擎检索错误（vLLM #55927）。跨引擎可复现这一点暗示共享的内核血缘 —— 多样化后端未必能多样化风险。
4. **投机解码已从差异化能力转变为负债管理。** 今天每个引擎都产出了投机解码的正确性/性能 bug。在出现"按上下文长度自动禁用"之前，投机解码的收益必须按工作负载重新基准测试。
5. **AMD 已成为跨层级协调的一类目标：** vLLM ROCm CI 改造 + 4 个内核 PR、SGLang MI355X 配方、llama.cpp 按架构 GCN 表、Unsloth ROCm Docker。MI355X 与 H100/B200 的对决是本季度的性能主线。
6. **网关层的差异化在于金钱和协议，而非路由本身。** 9 个项目中有 5 个发布了计费/归属修复（LiteLLM 缓存音频 2× 多计费、Gemini Live 双重计费、Azure $0 退化；New API 缓存 token 度量；CCR $0 别名）。任何使用网关支出数据进行成本分摊的人，应冻结仪表盘并在这些修复合并后进行对账。
7. **编码 Agent 是增长最快的路由面。** CC Switch 的 Codex/DeepSeek `/responses` 集群、CCR 子 Agent 路由修复、LiteLLM Codex 怪癖、Ollama/llama.cpp 工具解析器 PR —— 还有卫生问题（客户端指纹 header 在转换过程中泄漏，CC Switch #7305）。
8. **Responses API 是协议断层线。** 推理内容丢失（LiteLLM #40654/#40887）、非流式块损坏（CCR #1793）、推理回放清洗（CC Switch #7342）、`include_reasoning` 被忽略（SGLang #39103）。转换层始终落后协议一个版本。
9. **安全债务正在各层级同时浮现：** LiteLLM Helm 默认以 root 运行（#40822）、Unsloth Studio 沙箱绕过（#10835）、New API SSRF 修复、LMCache 缓存键冲突（vLLM #56643）。这些都接近供应链层面、可修复、且无一可省略。

**面向 Agent/应用开发者 —— 来自今日数据的行动项：** 锁定引擎镜像版本，避免在 SM120/121 和 H20 上使用 DS-V4.1（将 `max_num_seqs ≤ 256`）；对长上下文或结构化输出场景禁用 DFlash；在计费修复合并之前将网关成本仪表盘视为暂定值；端到端验证非流式推理路径；实现客户端韧性 —— 目前一次 TCP 重置就能让 SGLang 引擎挂掉（#39216）。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-13

## 今日要点

DeepSeek-V4 / V4.1-Flash 的支持面在持续扩大,其边界场景的失败也在增多:H20 上 Triton `dsv4_topk` 出现非法内存访问,GB10/SM120-SM121 上存在服务兼容性问题,以及一个深度上下文检索正确性 bug 在 vLLM 与 SGLang 上均可复现。性能侧,一批 ROCm DeepSeek-V4.1 内核 PR 陆续合入(64-wide wavefront 上的 TileLang mHC pre、MXFP8 dequant 路径、融合的 `combine_topk_swa_indices`、融合 SwiGLU clamp),AMD MI355X 的调优推进仍在进行。DFlash 推测解码相关的 bug 报告也在累积——`xgrammar`/`json_object` 下 FSM 失败、混合 GDN 在 185k 上下文下出现净减速、Mamba 风格 draft 的零复用 WIP 修复。

## 发布与破坏性变更

过去 24 小时内无新发布,无标记为破坏性的变更。

## 新增模型与硬件支持

- **DeepSeek-V4.1-Flash** 模型注册已合入([#56214](https://github.com/vllm-project/vllm/pull/56214),通过 [#56461](https://github.com/vllm-project/vllm/issues/56461) 关联引用)——但部分部署平台(H20 SM90、GB10 SM120/SM121)仍处于故障状态(详见稳定性一节)。
- 用户提出 **DeepSeek-V4-Flash-0731** checkpoint 需要 **SM8x(Ampere A100/A800、RTX 30xx)支持**——仍被 issue [#40851](https://github.com/vllm-project/vllm/issues/50576) 阻塞。
- **DSpark(DeepSeek 多 token 预测)** 现已支持**分离式服务中的流水线并行目标**,并具备 padded-graph-batch 安全机制 — [#53577](https://github.com/vllm-project/vllm/pull/53577)。
- **PCP + DCP** 已在 **sparse-MLA 模型** 上启用(通过 [#56157](https://github.com/vllm-project/vllm/pull/56157) 合入);NIXL transfer-rank 拓扑跟进见 [#56645](https://github.com/vllm-project/vllm/pull/56645)。
- **Elastic Expert Parallel** 现已在 **Model Runner V2** 下支持 — [#53934](https://github.com/vllm-project/vllm/pull/53934)。
- **ROCm CI**:Stage G 门禁新增 15 个 AMD 镜像节点([#50922](https://github.com/vllm-project/vllm/pull/50922));全部 37 个 MI250 group 的 DinD 已弃用([#56162](https://github.com/vllm-project/vllm/pull/56162))。
- **ROCm** 融合 `clamp+SwiGLU` 激活现已接入 `SiluAndMulWithClamp` 算子 — [#54074](https://github.com/vllm-project/vllm/pull/54074)。
- **CUDA** 为 `GemmaRMSNorm` 新增 Triton 路径,采用 FP32 normalize + 融合 residual — [#56308](https://github.com/vllm-project/vllm/pull/56308)。

## 性能与优化

- **DeepSeek-V4.1,ROCm**([#56342](https://github.com/vllm-project/vllm/pull/56342)):修复 64-wide wavefront 上的 TileLang mHC-pre 内核;未修复时 AMD 路径在 GSM8K 上从 **91.1% 退化至 23.7%**。两个 commit 一起合入。
- **DeepSeek-V4.1,ROCm**([#56560](https://github.com/vllm-project/vllm/pull/56560)):当 `K % 128 ≠ 0` 时,将 MXFP8 权重预反量化至 BF16,从而不再硬性要求 `tl.dot_scaled`。
- **DeepSeek-V4.1,ROCm**([#56638](https://github.com/vllm-project/vllm/pull/56638)):在 gfx950 上重新启用融合的 `combine_topk_swa_indices` Triton 内核。
- **DeepSeek-V4.1,通用**([#56633](https://github.com/vllm-project/vllm/pull/56633)):将 mHC post block 折叠到下一子层的 delayed pre 投影中,以消除那个会重新读取 residual 的 split-k 投影。
- **DeepSeek-V4.1-Flash on MI355X** 仍有吞吐空间未释放 — [#56506](https://github.com/vllm-project/vllm/issues/56506) RFC 跟踪其性能规划。报告数据:TP4、MXFP4 MoE + DSpark MTP、8× MI355X:并发 1 时输出 35.89 tok/s(8.97/GPU),TTFT p50 0.898s。
- **Incremental MoE Expert Offloading(RFC)** — [#38256](https://github.com/vllm-project/vllm/issues/38256);首个 PR [#37190](https://github.com/vllm-project/vllm/pull/37190) 已开放。CPU 钉扎的 expert 池 + LFRU GPU 缓存 + 跨层预取;面向超出显存容量的 MoE 模型。
- **Batch Invariant** 特性仍在硬化中 — [#27433](https://github.com/vllm-project/vllm/issues/27433) 跟踪 issue;本周发现一处正确性 gap([#56370](https://github.com/vllm-project/vllm/issues/56370),见稳定性)。
- **Kimi K3 性能** checklist — [#50587](https://github.com/vllm-project/vllm/issues/50587);来自 [#47456](https://github.com/vllm-project/vllm/pull/47456) 的共享 JIT warmup 持续落地模型级去 JIT 化([#49349](https://github.com/vllm-project/vllm/issues/49349))。

## 稳定性与回归

大致按潜在用户影响排序:

1. **[Bug,DeepSeek-V4.1-Flash,H20]** 高并发下 `dsv4_topk` Triton 内核触发 CUDA 非法内存访问;通过 `max_num_seqs=256` 可缓解。[#56389](https://github.com/vllm-project/vllm/issues/56389) — **尚无修复 PR**。
2. **[Bug,DeepSeek-V4.1-Flash,GB10/SM120-SM121]** 在 Blackwell 消费级硬件上无法服务——SWA block 32 与 SM120 decode page 64 不匹配,ratio-1 indexer block_kv=128 与 DeepGEMM sm120(仅支持 64)不匹配。[#56461](https://github.com/vllm-project/vllm/issues/56461) — **尚无修复 PR**。
3. **[Bug,DeepSeek-V4-Flash-0731,多机]** 在特定 mod-4 对齐的 prompt 长度下做深度上下文精确检索时,确定性产出错误 token(`PROVOCATIVE-8417` → `PROVOCATIVE-8411`,T=0)。可在 vLLM 0.28.0 + SGLang 上复现,DeepInfra 与百度上亦可复现;OpenInference 正常。[#55927](https://github.com/vllm-project/vllm/issues/55927) — **尚无修复 PR**;对 agentic 工作负载影响面大。
4. **[Bug,Qwen4Exp QSA indexer,GB10 SM121,统一内存]** per-chunk logits buffer 随 `max_seq_len` 增长;缓存分配器会保留每个尺寸 → 长 prefill 时出现 OOM/挂起。[#56457](https://github.com/vllm-project/vllm/issues/56457) — **尚无修复 PR**。
5. **[Bug,GLM-5.3-Flash]** 在多轮 agentic 使用中退化为重复 token 的"乱码文字"。[#56605](https://github.com/vllm-project/vllm/issues/56605) — **新 issue,尚无修复 PR**。
6. **[Bug,DFlash + xgrammar `json_object`]** 确定性的 `Failed to advance FSM`;总是落到同一个 draft token。[#53777](https://github.com/vllm-project/vllm/issues/53777) — **尚无修复 PR**。
7. **[Bug,DFlash 在混合 GDN 上 ~185k 上下文]** 净损失:DT=4 下约 71 → 约 16 tok/s(短上下文 DT=8 下约 218 tok/s);没有 per-sequence-length 禁用钩子。[#54691](https://github.com/vllm-project/vllm/issues/54691) — **尚无修复 PR**。
8. **[Bug,Batch Invariance + Sequence Parallelism]** 在 4× RTX PRO 6000 Blackwell 上,`VLLM_BATCH_INVARIANT=1` 与 `pass_config.enable_sp` 同时启用会破坏 batch invariance。[#56370](https://github.com/vllm-project/vllm/issues/56370) — **尚无修复 PR**。
9. **[Bug,ROCm DS V4 MRV2 + `FULL_DECODE_ONLY` 图]** MI350/MI355 上精度下降。[#52644](https://github.com/vllm-project/vllm/issues/52644) — **尚无修复 PR**。
10. **[Bug,GB10/sm_121a 上的 Marlin W4A8-FP8]** 静默输出损坏(WNA16 INT4 MoE 在 temp 0 下吐出重复 `` 循环;内核运行快约 2.5%)。[#49546](https://github.com/vllm-project/vllm/issues/49546) — **尚无修复 PR**。
11. **[Bug,`persistent_topk` 直方图分桶]** 当多个值落入同一个粗粒度直方图桶时,会静默丢弃 top-k 候选(Blackwell B300,SM103)。[#51782](https://github.com/vllm-project/vllm/issues/51782) — **尚无修复 PR**。
12. **[Security,LMCache connector]** 外部缓存键从 media ID 16 位截断后的 token id 派生,未混入 `cache_salt` 或 LoRA 标识。修复 PR:[#56643](https://github.com/vllm-project/vllm/pull/56643) — **修复正在评审**。
13. **[Bug,DSML 工具调用恢复]** 截断的 `<｜DSML｜invoke name="` 会提交一个参数为空的幽灵调用。修复 PR:[#56642](https://github.com/vllm-project/vllm/pull/56642) — **修复正在评审**。
14. **[Bug,ROCm Elastic EP 扩缩容死锁]** 出现在扩缩容过程中。修复 PR 已合入 [#56610](https://github.com/vllm-project/vllm/pull/56610) — **已修复**。
15. **[Bug,无 UVA 主机上的 MRV2 初始化]** V2 runner 设为默认时,`UvaBuffer` 抛出裸的 `RuntimeError: UVA is not available`。修复 PR:[#54655](https://github.com/vllm-project/vllm/pull/54655) — **修复正在评审**。
16. **[Bug,encoder-only + `--enable-prompt-embeds`]** warmup 阶段抛出晦涩的 `torch._dynamo.exc.Unsupported`。修复 PR:[#55233](https://github.com/vllm-project/vllm/pull/55233) — **修复正在评审**。
17. **[Bug,MTP spec decode 下的 Hybrid GDN 前缀缓存]** 在 Qwen3.5-122B-A10B 上,哈希单元的整数倍长度命中为零。修复 PR:[#52244](https://github.com/vllm-project/vllm/pull/52244) — **修复正在评审**。
18. **[Bug,DFlash + Mamba 零复用]** WIP 修复位于 [#54381](https://github.com/vllm-project/vllm/pull/54381)。
19. **[ROCm CI/build]** Qwen3.8 B200 AIME25 lane 失败 25/30(0.8333),低于 0.85 阈值;随机性阈值正在 [#56644](https://github.com/vllm-project/vllm/pull/56644) 中调整。
20. 陈旧 bug 清理:[#42024](https://github.com/vllm-project/vllm/issues/42024)(NIXL connector 静默禁用 HMA)、[#42381](https://github.com/vllm-project/vllm/issues/42381)、[#42385](https://github.com/vllm-project/vllm/issues/42385)、[#42525](https://github.com/vllm-project/vllm/issues/42525)、[#42489](https://github.com/vllm-project/vllm/issues/42489)、[#42125](https://github.com/vllm-project/vllm/issues/42125) 均以陈旧关闭。

## 对应用开发者的影响

- **消费级/边缘 Blackwell 上的 DeepSeek-V4.1-Flash 尚不满足生产可用性。** 若目标平台为 GB10/SM120/SM121(DGX Spark、RTX PRO 6000),请将版本钉在引入 SWA block size / DeepGEMM-64 回归**之前**的 commit,并关注 [#56461](https://github.com/vllm-project/vllm/issues/56461)。在 H20 SM90 上,在 [#56389](https://github.com/vllm-project/vllm/issues/56389) 修复前请将 `max_num_seqs ≤ 256` 作为上限。
- **多机 DeepSeek-V4-Flash-0731 服务在特定 mod-4 对齐的 prompt 长度下做 needle-in-haystack 时,会确定性地产出错误 token**,与推理模式无关,且跨服务商可复现。请将任何 temperature-0 的深度检索工作流视为可疑,使用第二个后端交叉验证。
- **DFlash 推测解码并非免费提速。** 对于上下文超过约 64k token 的混合 GDN 工作负载,请将其关闭(`--speculative-method dflash` 关闭,或使用 [#54691](https://github.com/vllm-project/vllm/issues/54691) 中提议的 per-sequence 钩子);并在 [#53777](https://github.com/vllm-project/vllm/issues/53777) 修复前,避免将其与 `xgrammar` 的 `json_object` 输出组合使用。
- **LMCache 部署应重新评估缓存键隔离性。** [#56643](https://github.com/vllm-project/vllm/pull/56643) 中的 PR 尚未合入——若当前正在服务多模态或 per-tenant LoRA 流量,请确保 connector 层今日不存在冲突风险。
- **分离式服务

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 简报 — 2026-09-13

## 今日要点

Blackwell(SM120/121)上的 DeepSeek-V4/V4.1 技术栈集中爆出一批 bug 报告，涉及**静默数值错误**、**CUDA graph 捕获失败**以及 **MoE 后端接受校验缺口**——在 4× DGX Spark 和 RTX 6000D 上部署的运维人员应固定使用已知可用的镜像，并联动关注 #39226/#39193/#39173/#39235。性能方面，**TRTLLM MLA target-verify 路径**(#39232,关闭 [#39107](https://github.com/sgl-project/sglang/issues/39107))现在复用了融合的 FP8 KV/Q 准备 kernel,SGLang 还在准备更严格的 diffusion CI 门禁，将性能回退变为终止性失败([#39206](https://github.com/sgl-project/sglang/pull/39206))。MLX/Apple Silicon 方面，今天有三个协同 PR 的清理落地。

---

## 发布与破坏性变更

过去 24 小时内没有新版本发布。请注意以下正在推进中的行为变更：

- **[#39122](https://github.com/sgl-project/sglang/pull/39122)** — `/v1/responses` 的持久化将由 `--enable-response-store` 开关控制(默认**关闭**)。两个无上限的内存字典(`response_store`、`msg_store`)默认将不再泄漏；prefill 节点的簿记行为会有变化。
- **[#39239](https://github.com/sgl-project/sglang/pull/39239)** — `local/sglang-metal` 的 M1 Max MLX 工作树快照已 rebase 到 `main`(已关闭)。协同的 MLX 变更将继续通过 [#39238](https://github.com/sgl-project/sglang/pull/39238) 和 [#39242](https://github.com/sgl-project/sglang/pull/39242) 推进。
- **[#30145](https://github.com/sgl-project/sglang/issues/30145)** — RFC "Unified Radix Cache Split: TreeCore" 已关闭(不活跃)。

---

## 新模型与硬件支持

- **Hopper 上的 DSV4.1 FP4 KV** — [#38902](https://github.com/sgl-project/sglang/issues/38902) 提议将 C1/C2 主 KV cache 以 FP4 打包；基线见 #38798。
- **AMD MI355X GLM-5.2 MXFP4** — [#39230](https://github.com/sgl-project/sglang/pull/39230) 给出了 `Low-Latency`(TP8/EP1)与 `High-Throughput`(TP4/EP4)两套配方，采用 MTP 5-1-6、FP8 KV、Triton DSA;MXFP4 镜像固定为已验证的 v0.5.19。
- **AMD gfx950 DSV4 FP8 双池统一 KV** — [#37413](https://github.com/sgl-project/sglang/pull/37413) 为 DSV4 FP8 启用了跨两个池的统一 KV。
- **Blackwell VibeCUDA MSA** — [#39233](https://github.com/sgl-project/sglang/pull/39233) 增加了通往 FlashInfer `backend="vibecuda"` 的显式路由，并采用 fail-closed 的 provider 选择与 CUDA-Graph 安全的元数据。
- **DeepEP v2 BF16 + batch 不变推理** — [#38160](https://github.com/sgl-project/sglang/pull/38160) 在 `--moe-a2a-backend deepep_v2` 下启用了 BF16 expert checkpoint 与 batch-invariant 模式；同时修复了 FP8 prefill 参数 bug。
- **MLX/Apple Silicon** — VL 系列 wrapper 的 headless trunk 解析([#39242](https://github.com/sgl-project/sglang/pull/39242)),`MlxAuxiliaryStateComponent` 的 mamba grid 属性([#39238](https://github.com/sgl-project/sglang/pull/39238));两者修复的都是 Qwen3.5 系列 checkpoint 上曾阻塞使用的崩溃。
- **Gemma 4 工具调用解析** — [#39240](https://github.com/sgl-project/sglang/pull/39240) 现可容忍 `gemma-4-26B-A4B-it` 输出的缺失起始 `<|"|>` 定界符。

---

## 性能与优化

- **TRTLLM MLA target-verify 融合 FP8 预处理** — [#39232](https://github.com/sgl-project/sglang/pull/39232)。`forward_extend` 此前每次 launch 都冗余地执行 bf16→fp8 量化 + KV scatter + `[q_nope | q_rope]` 拼接；现在复用了 `forward_decode` 已在使用的融合 kernel `set_mla_kv_concat_q_fp8`。关闭 [#39107](https://github.com/sgl-project/sglang/issues/39107)。
- **GLM-5.3-Flash KPool 元数据融合恢复** — [#38852](https://github.com/sgl-project/sglang/pull/38852)、[#38858](https://github.com/sgl-project/sglang/pull/38858)(依赖 [#38845](https://github.com/sgl-project/sglang/pull/38845))。重新启用了被 #38071 移除的 `SGLANG_EXPERIMENTAL_DSA_INGRAPH_VERIFY_METADATA*` 标志；恢复了融合的 decode/verify/draft-extend 构造。
- **采样路径移除 GPU 同步** — [#39234](https://github.com/sgl-project/sglang/pull/39234)。复用 CPU 侧已知的请求行，避免自定义 logit processor 中的 `nonzero()`、标量 GPU 读取与布尔索引同步；保留旧有回退路径。
- **DeepGEMM CI 门禁收紧** — [#39241](https://github.com/sgl-project/sglang/pull/39241) 对发布验证加以约束；此前仅 Blackwell attention 一项就需运行 106–195 分钟，而且 H200 会超时。
- **回退报告** — [#36131](https://github.com/sgl-project/sglang/issues/36131)(已关闭)：统一缓存的默认值翻转导致 `ebc144ce`(#34653)之后 Spark/Thor 上的长前缀 decode 吞吐回退。请关注修复在下一版本中的落地。
- **未解性能问题** — [#34815](https://github.com/sgl-project/sglang/issues/34815) PP8 disagg-prefill 在 Kimi-K3 上表现出与负载无关的约 30 s TTFT 下限(👍2);[#30815](https://github.com/sgl-project/sglang/issues/30815) FP8 KV-cache decode 受未融合的 K/V 量化 + 逐层 Q 转换拖累。
- **Diffusion CI 加固** — [#39206](https://github.com/sgl-project/sglang/pull/39206) 将缺失/非有限/非正数的 E2E 延迟记录设为终止性失败，即使对 `run_perf_check=False` 的用例也不例外。

---

## 稳定性与回退

按可能的影响面排序：

1. **[#39216](https://github.com/sgl-project/sglang/issues/39216)** — **严重**：活动请求期间客户端断开连接会导致整个引擎崩溃。`asyncio.CancelledError` 会穿透请求循环中的 `except Exception` 防护继续传播。影响在 `lmsysorg/sglang:dev-dsv41` 上服务 DeepSeek-V4.1 的 4× RTX 6000D(SM120)。**尚无修复 PR。**
2. **[#39193](https://github.com/sgl-project/sglang/issues/39193)** — 当 `DEEPGEMM_SCALE_UE8M0=False` 时，DeepSeek-V4.1 fp8 `wo_a` absorb GEMM 在 SM121(GB10)上会静默返回约 25% 的错误结果；非 2 的幂的逐 token 激活 scale 被传入了 `deep_gemm.fp8_einsum`。**正确性 bug;无报错、无警告。**
3. **[#39226](https://github.com/sgl-project/sglang/issues/39226)** — DSV4.1 MXFP4 experts 接受 `--moe-runner-backend deep_gemm`,加载 75 GB 权重后，在 CUDA graph 捕获时因 `layout.hpp:108` 断言而崩溃(sm_121,TP4/EP2)。参数校验时机过早。
4. **[#39235](https://github.com/sgl-project/sglang/issues/39235)** — DeepSeek-V4 SM120 decode 为满足 SM90 约束将 `q` 填充至 64 个头；去掉填充在 TP4 下解码步提升 +0.50%,但尽管 kernel 逐位一致，贪心输出仍会改变。作者希望在提 PR 前先听取第二意见。
5. **[#39173](https://github.com/sgl-project/sglang/issues/39173)** — DSV4.1-Flash + Engram "compact ragged verify" SPS 表在 CUDA graph 捕获时崩溃：*"engram target-verify expects one equal block per request"*。
6. **[#39087](https://github.com/sgl-project/sglang/issues/39087)** — 量化版 DFlash2 draft checkpoint 静默产生约 0% 的接受率(无报错、无警告)；未量化版工作正常。是 #36599 的静默对应问题。
7. **[#39147](https://github.com/sgl-project/sglang/issues/39147)** — `HiCacheFile.batch_exists_v2()` 在所需的辅助池无法恢复混合前缀时仍报告命中；仅在连续 `ALL_PAGES` 模式下才正确。
8. **[#39103](https://github.com/sgl-project/sglang/issues/39103)** — `include_reasoning: false` 在 `/v1/responses`、`/v1/chat/completions` 和 `/v1/completions` 中均被忽略。
9. **[#38980](https://github.com/sgl-project/sglang/issues/38980)** — `flash_attn_with_kvcache` 宣称支持 sm_89,实际并未附带 sm_89 cubin,且 `ver` 参数被忽略；结果是抛出原始 CUDA 错误而非干净的拒绝(RTX 4080 SUPER,Ada)。
10. **[#38904](https://github.com/sgl-project/sglang/issues/38904)** — MiniMax H3 GGUF 文本编码器加载折叠式 Conv3D patch embedding 失败。
11. **[#38815](https://github.com/sgl-project/sglang/issues/38815)**(已关闭)— SWA 分支将较晚的 Mamba checkpoint 附加到了较早的前缀上；已修复。
12. **[#37817](https://github.com/sgl-project/sglang/issues/37817)**(已关闭)— DFlash 在 tracking 边界处漏掉了 Mamba checkpoint;已修复。
13. **[#31053](https://github.com/sgl-project/sglang/issues/31053)**(已关闭，不活跃)— 流式 ASR 滑动窗口 / 服务端 VAD;已归档。
14. **[#37134](https://github.com/sgl-project/sglang/pull/37134)** — ROCm EAGLE spec-decode verify 此前无论 `temperature`/`top_p` 取值如何都提交 `argmax`,导致 `temp>0` 时出现复读循环。修复引入了正确的采样分支。
15. **CI 跟踪器** — [#17050](https://github.com/sgl-project/sglang/issues/17050):最近一次自动更新报告 `main` 上有 4 个损坏 / 10 个不稳定 / 994 个近期已修复。

---

## 对应用开发者意味着什么

- **在 Blackwell 消费级卡/Spark 上务必谨慎固定镜像。** 多个正确性问题和捕获期崩溃集中在 DeepSeek-V4.x 的 SM120/SM121 上；#39226、#39193、#39235 与 #39173 同属一族。如果你在用 `dev-dsv41`,在 #39226 修复之前，请把它当作预发布版本对待生产流量，并避免在 MXFP4 DSV4.1 上使用 `--moe-runner-backend deep_gemm`。
- **增加客户端韧性。** [#39216](https://github.com/sgl-project/sglang/issues/39216) 意味着单个客户端 TCP 重置就可能拖垮你的整个引擎。请把网关视为权威的熔断器，并对客户端 SDK 中 `CancelledError` 的传播做插桩监控。
- **使用流式 reasoning 的客户端可能很快会看到行为变化。** [#39122](https://github.com/sgl-project/sglang/pull/39122) 将 `/v1/responses` 持久化默认关闭；如果你的应用依赖服务端重放过去的 Responses ID,就需要打开 `--enable-response-store`,或者由自己保存 ID。
- **Apple Silicon / MLX 上的 Qwen3.5 正在变得可用。** 今天的两个 MLX PR 修复了一个硬崩溃(`mamba_checkpoint_grid`)和一个静默质量问题(缺少 headless trunk → 在非最终 chunked-prefill 分块上输出 full-vocab logits)。现在是重新在 M 系列上测试混合模型的好时机。
- **AMD MI355X GLM-5.2 MXFP4 已有文档化配方**([#39230](https://github.com/sgl-project/sglang/pull/39230));请匹配 v0.5.19 镜像与 TP/EP 布局，否则就得做好重新调优的准备。
- **在 Ada(sm_89)上走 FA3 风格 attention 路径的推理很脆弱** —— #38980 表明 kernel 的宣称支持范围大于实际。采用前请先用你所需的显式 `ver` 做探测。
- **Diffusion 流水线将变得更加严格。** [#39206](https://github.com/sgl-project/sglang/pull/39206) 意味着抖动的 E2E 延迟现在会阻塞 CI;如果你通过 SGLang 交付 diffusion 模型，可以预期 CI 会比以前更早发现性能漂移。
- **值得关注的 RFC:** [#39192](https://github.com/sgl-project/sglang/issues/39192) "Contention-aware batching for dynamic EPLB" 与 [#21052](https://github.com/sgl-project/sglang/issues/21052) "Further Ngram Speculative Decoding" 均处于开放状态，欢迎社区参与讨论。

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-13

## 1. 今日要点

过去 24 小时发布了 10 个新构建（b10921–b10932），主要亮点包括 **ggml-cuda 的 AMD GCN 专用 HIP 配置表**（[#27841](https://github.com/ggml-org/llama.cpp/pull/27841)，b10929）、**OpenCL 后端稳定性修复**（[#27630](https://github.com/ggml-org/llama.cpp/pull/27630)，b10923），以及针对块量化视图的 **WebGPU 张量绑定对齐修复**（[#28382](https://github.com/ggml-org/llama.cpp/pull/28382)，b10921）。在正确性方面，**Blackwell IQ-quant 回退到 cuBLAS**（[#28823](https://github.com/ggml-org/llama.cpp/pull/28823)）解决了长期存在的 Unsloth Dynamic 量化损坏问题，CI 现在将 `test-backend-ops` 作为独立的多后端测试运行（[#28740](https://github.com/ggml-org/llama.cpp/pull/28740)）。若干未解决的回归问题仍未修复——Windows MSVC 上 MTP prefill 慢 57 倍（[#28790](https://github.com/ggml-org/llama.cpp/issues/28790)）、RTX 5090 笔记本上 CUDA 图挂起（[#27330](https://github.com/ggml-org/llama.cpp/issues/27330)），以及 b10780 之后 Vulkan/RDNA3 prompt 处理性能崩溃（[#28752](https://github.com/ggml-org/llama.cpp/issues/28752)）。

## 2. 发布与破坏性变更

过去 24 小时共发布 10 个版本，未观察到 API 破坏。

| 构建 | 重要变更 | PR |
|---|---|---|
| b10932 | cmake: 为 clang 移除 PCH 时间戳（ccache 可移植性修复） | [#28816](https://github.com/ggml-org/llama.cpp/pull/28816) |
| b10931 | ui: 增加客户端缓存 | [#28802](https://github.com/ggml-org/llama.cpp/pull/28802) |
| b10930 | server: 在模型上限边界处允许模型下载（修复 #26809） | [#28530](https://github.com/ggml-org/llama.cpp/pull/28530) |
| b10929 | ggml-cuda/HIP: AMD GCN 每架构配置表 | [#27841](https://github.com/ggml-org/llama.cpp/pull/27841) |
| b10927 | vendor: cpp-httplib → 0.56.0 | [#28787](https://github.com/ggml-org/llama.cpp/pull/28787) |
| b10926 | syscl: 在不支持的 `tq1_0` 量化上优雅失败 | [#28681](https://github.com/ggml-org/llama.cpp/pull/28681) |
| b10924 | server: 帧路由子状态命令单独成行 | [#28747](https://github.com/ggml-org/llama.cpp/pull/28747) |
| b10923 | opencl: 若干后端中止修复 | [#27630](https://github.com/ggml-org/llama.cpp/pull/27630) |
| b10922 | opencl: A8 Q4_K 非 MoE 二进制内核 | [#28677](https://github.com/ggml-org/llama.cpp/pull/28677) |
| b10921 | webgpu: 将张量绑定对齐到类型块大小 | [#28382](https://github.com/ggml-org/llama.cpp/pull/28382) |

## 3. 新模型与硬件支持

- **新架构**：ELMOD 2.7b（德国研究型 GPTNeoX，带自定义分词器） — [#28818](https://github.com/ggml-org/llama.cpp/pull/28818)
- **AMD GCN 调优**：ggml-cuda/HIP 中的每架构配置表有望提升老款 AMD 显卡性能 — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841)
- **OpenCL 扩展**：新增 `gemm_noshuffle_q4_k_f32` 二进制内核（高通贡献） — [#28677](https://github.com/ggml-org/llama.cpp/pull/28677)
- **Vulkan/Intel A770**：IQ3_S MMQ 矩阵乘法内核路径 — [#28822](https://github.com/ggml-org/llama.cpp/pull/28822)
- **稀疏 FlashAttention**：在 Qwen4 架构上启用 — [#28770](https://github.com/ggml-org/llama.cpp/pull/28770)
- **ANE 后端**（Apple Neural Engine）仍是开放路线图项 — [#10453](https://github.com/ggml-org/llama.cpp/issues/10453)（44 👍，无进展报告）
- **路线图信号**：Web UI 与 llama-server 核心解耦 — [#22531](https://github.com/ggml-org/llama.cpp/issues/22531)

## 4. 性能与优化

- **Qwen4 的稀疏 FA** 避免每步对整个 KV 缓存重新打分 — [#28770](https://github.com/ggml-org/llama.cpp/pull/28770)
- **OpenCL Q4_K A8 非 MoE 二进制内核**（高通）降低着色器调度开销 — [#28677](https://github.com/ggml-org/llama.cpp/pull/28677)
- **WebGPU** 块量化视图现在使用有效的元素偏移（正确性 + 可能的性能提升） — [#28382](https://github.com/ggml-org/llama.cpp/pull/28382)
- **切换 `causal_attn` 时跳过调度器预留** — [#28751](https://github.com/ggml-org/llama.cpp/pull/28751)
- **AMD GCN 专用 HIP 配置** — [#27841](https://github.com/ggml-org/llama.cpp/pull/27841)
- **CI 现在并行运行所有后端的 `test-backend-ops`** — [#28740](https://github.com/ggml-org/llama.cpp/pull/28740)
- **用户报告基线**：qwen35 在 RTX 4090（Linux）上达到 **约 86% 内存带宽上限**；同一模型在 RTX 5090（Windows）上仅 **约 28%**，draft-MTP 再慢 1.5–1.6 倍 — [#28196](https://github.com/ggml-org/llama.cpp/issues/28196)
- **提议的默认值**：`GGML_CUDA_FA_ALL_QUANTS=ON`，使 4-bit KV 静默回退到 GPU 而非 CPU（避免约 30 倍减速） — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633)

## 5. 稳定性与回归

**关键（开放）：**

- [#28790](https://github.com/ggml-org/llama.cpp/issues/28790) — **MTP prefill 慢约 57 倍**，发生在 Windows MSVC + CUDA 12.8（32.7 vs 1867 tok/s）。官方 Clang/CUDA 13.3 构建不受影响。尚无修复 PR。
- [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) — **严重的 Vulkan/RDNA3 prompt 处理回归**，自 b10780 引入。
- [#28813](https://github.com/ggml-org/llama.cpp/issues/28813) — **持续 OOM 崩溃**，使用 `-np 3` 自 b10930 起在 1×4090 + 3×3090 配置（192 GB RAM）上出现。
- [#27330](https://github.com/ggml-org/llama.cpp/issues/27330) — **CUDA 图挂起 GPU 通道**，出现在 RTX 5090 Laptop（`sm_120`）上；`GGML_CUDA_DISABLE_GRAPHS=1` 可临时绕过。
- [#28404](https://github.com/ggml-org/llama.cpp/issues/28404) — **第二个 `llama-server` 副本确定性地在 `ggml-cuda.cu:107` 死亡**，发生于 2× RTX 5060 Ti（Windows，sm_120）上的 CUDA 图复用后。未确认修复即关闭。
- [#26027](https://github.com/ggml-org/llama.cpp/issues/26027) — **GLM-5.2（glm_moe_dsa）dense-MLA CUDA 路径产生损坏输出**，只要有任何真实 transformer 层被卸载到 GPU。
- [#28196](https://github.com/ggml-org/llama.cpp/issues/28196) — **qwen35 在 RTX 5090 上达到 76% roofline**（4090 上为 86%）；Windows/Ollama 路径在每个 draft 深度再额外慢 1.5–1.6 倍。

**高优先级（开放）：**

- [#25913](https://github.com/ggml-org/llama.cpp/issues/25913) — `/slots` 保存/恢复在混合/循环模型上静默丢失所有 prompt 复用。
- [#24415](https://github.com/ggml-org/llama.cpp/issues/24415) — 无法在 OpenVINO（CPU/GPU/NPU）上加载 gemma-4-12B。
- [#25807](https://github.com/ggml-org/llama.cpp/issues/25807) — ROCm 7.14 构建运行时缺少 `libhipblas.so.3` 导致失败。
- [#24946](https://github.com/ggml-org/llama.cpp/issues/24946) — `-cb` 将 Intel Arc Pro B70 钉在 `gt-c0`/boost，从不降频。
- [#22360](https://github.com/ggml-org/llama.cpp/issues/22360) — Vulkan/7900XTX 上服务端吞吐量随时间显著下降。

**今日关闭/缓解：**

- [#26220](https://github.com/ggml-org/llama.cpp/issues/26220) — 移除 rocWMMA 导致 RDNA4 FA 2 倍回归（已关闭）。
- [#24177](https://github.com/ggml-org/llama.cpp/issues/24177) — RPC `top_k` argsort 共享内存断言（已关闭）。
- [#25808](https://github.com/ggml-org/llama.cpp/issues/25808) — `GGML_SYCL_DEVICE_ARCH=xe2` 段错误（已关闭）。
- [#20260](https://github.com/ggml-org/llama.cpp/issues/20260) — `peg-native` 解析器边缘情况（已关闭）。
- [#28590](https://github.com/ggml-org/llama.cpp/issues/28590) — Intel B70 上的 Vulkan 验证 VUID（已关闭）。
- [#28491](https://github.com/ggml-org/llama.cpp/issues/28491) — `BUILD_SHARED_LIBS=OFF` Mac Metal 链接错误（已关闭）。

**已合并的先前报告问题修复：**

- Blackwell IQ-quant 损坏（#21371）→ [#28823](https://github.com/ggml-org/llama.cpp/pull/28823)（在 sm_120+ 上对 IQ1/IQ2/IQ3/IQ4 强制使用 cuBLAS）。
- Jinja 点属性整数字面量（#28786）→ [#28817](https://github.com/ggml-org/llama.cpp/pull/28817)。
- MSVC PCH 中断 → [#28763](https://github.com/ggml-org/llama.cpp/pull/28763)。
- iWARP RPC 静默回退到 TCP → [#28494](https://github.com/ggml-org/llama.cpp/pull/28494)。

## 6. 对应用开发者的意义

- **固定构建版本或在 bug 报告中注明版本**：Vulkan/RDNA3 prompt 回归（[#28752](https://github.com/ggml-org/llama.cpp/issues/28752)）出现在 b10780，b10930 出现多副本 OOM（[#28813](https://github.com/ggml-org/llama.cpp/issues/28813)）。在某些配置上滚动升级尚不安全——对 `sm_120` 部署，保留 `GGML_CUDA_DISABLE_GRAPHS=1` 作为已知可行的临时方案。
- **Windows 上的 MTP 投机解码**：在 MSVC + CUDA 12.8 自编译构建上不要启用 `--spec-type draft-mtp`——预计会有约 57 倍的 prefill 惩罚（[#28790](https://github.com/ggml-org/llama.cpp/issues/28790)）。官方 Clang/CUDA 13.3 构建不受影响。
- **更小量化格式现在更安全**：Blackwell IQ-quants（Unsloth Dynamic、IQ2/IQ3/IQ4）通过 [#28823](https://github.com/ggml-org/llama.cpp/pull/28823) 获得 cuBLAS 回退；上游不再静默产生错误输出。
- **混合/循环状态**：不要指望 `/slots` 保存/恢复能在 Qwen3.5/DeltaNet 风格模型上保留 prompt 缓存（[#25913](https://github.com/ggml-org/llama.cpp/issues/25913)）——请在应用侧实现恢复机制。
- **OpenAI 兼容客户端**：`video_url` 和 `data:` 视频 URI 仍被 `llama-server` 拒绝（[#27921](https://github.com/ggml-org/llama.cpp/pull/27921) — 开放中）。多模态智能体栈应规划自定义传输或继续等待。
- **新增聊天解析器覆盖**：Ling 3.0 / Bailing V3（[#28682](https://github.com/ggml-org/llama.cpp/pull/28682)）以及改进的 Qwen3-Coder 复杂参数解析（[#28742](https://github.com/ggml-org/llama.cpp/pull/28742)）——跨厂商的工具调用可靠性正在提升。
- **分布式推理**：iWARP RPC 路径现在可通过 rdma_cm 回退到达（[#28494](https://github.com/ggml-org/llama.cpp/pull/28494)），解锁了此前会静默降级到 TCP 的集群部署。
- **CI/后端信心**：`test-backend-ops` 现在在 CI 中跨所有后端运行（[#28740](https://github.com/ggml-org/llama.cpp/pull/28740)），因此像最近的 Vulkan prompt 处理崩溃这类回归，今后应能更早被捕获。
- **路线图关注**：ANE 后端（#10453）、缓存模型管理 CLI（#16393）以及 Web-UI 解耦（#

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-13

## 今日要点
今天是纠错性维护日，而非功能发布日。最重要的两项进展是针对 [#17778](https://github.com/ollama/ollama/issues/17778) 的截断修复落地——这是多步工具循环中长期存在的"在消息中未找到用户查询"500 错误，以及 [#18393](https://github.com/ollama/ollama/pull/18393) 中内置 CLI 代理的即时回滚。此外，几个高严重性的正确性缺陷（ROCm Strix Halo 上的 KV 缓存泄漏、混合 GPU 的 SIGABRT、Windows 嵌入端口耗尽）也已更新，但仍然处于未关闭状态。

## 发布与重大变更
过去 24 小时内无新发布。请注意已关闭的 PR [#18393](https://github.com/ollama/ollama/pull/18393)（"cmd: remove built-in agent"）表明一项进行中的 CLI 行为变更，会回滚到旧的聊天界面；依赖代理模式的下游 shell 脚本应核实其锁定的构建版本。

## 新模型与硬件支持
- **Gemma 4 视觉**：长期未关闭的 PR [#16879](https://github.com/ollama/ollama/pull/16879)（dhiltgen）重构了 `/api/tags` 和单 GGUF Gemma 4 mmproj 路径下的统一视觉能力检测——仍未关闭但在积极维护中。
- **Jetson Orin Nano 8GB 上的 Gemma 4 E4B**：正在实际场景中测试（[#18396](https://github.com/ollama/ollama/issues/18396)），但目前加载失败，因为多模态投影器对显存的需求超出了设备的余量，即使在仅 CPU 投影的配置下也是如此。
- **qwen3.8:27b 版本耦合**：[#18414](https://github.com/ollama/ollama/issues/18414) 指出某些模型存在未文档化的最低 Ollama 版本要求；这对任何锁定旧版本运行时的用户都很重要。
- **Hy4（腾讯）请求**：[#18287](https://github.com/ollama/ollama/issues/18287) 未采取任何行动即关闭——尚未出现 GGUF 资源。

## 性能与优化
- **Windows 上的嵌入吞吐量**：[#18392](https://github.com/ollama/ollama/issues/18392) 报告 bge-m3:567m-fp16 批量嵌入流水线达到约 55 docs/s 后遇到回环端口耗尽。根本原因是 `llama-server` 内部 HTTP 客户端禁用了 keep-alive——一旦修复，这将带来免费的吞吐量提升。
- **上下文移位安全开关**：[#18399](https://github.com/ollama/ollama/pull/18399) 提议新增 `OLLAMA_CONTEXT_SHIFT` 环境变量，使服务器在面对超长提示时*拒绝*服务，而非静默截断到约半个窗口——对任何不能接受静默提示丢失的部署都很重要。
- **思考预算**：[#17566](https://github.com/ollama/ollama/pull/17566)（针对 `think` 的每请求/每模型 token 预算）仍未关闭；与烧光整个上下文的 Gemma 4 循环相关。

## 稳定性与回归问题
按严重性排序：

1. **[#17847](https://github.com/ollama/ollama/issues/17847) — ROCm Strix Halo KV 状态泄漏。** 在 `gfx1151`（Radeon 8060S iGPU）上，交替发送短/长提示时会返回上一次请求的内容。尚无修复 PR；在 AMD APU 上的共享/顺序工作负载属于高严重性问题。
2. **[#18412](https://github.com/ollama/ollama/issues/18412) — Linux 混合显卡（Intel iGPU + RTX 4080）SIGABRT。** `llama-server` 在后端/设备加载过程中中止——是 Windows 上 [#16667](https://github.com/ollama/ollama/issues/16667) 在 Linux 端的镜像问题。尚无修复 PR。
3. **[#18392](https://github.com/ollama/ollama/issues/18392) — Windows 上 `/api/embed` 端口耗尽。** 由 llama-server 回环 HTTP 客户端未启用 keep-alive 导致；在负载下间歇性出现 400 错误。
4. **[#18411](https://github.com/ollama/ollama/issues/18411) — Responses 中 `web_search` 排序缺陷。** `function_call` 在推理完成之前就被发出；破坏了 Codex 工具重放。同日已开修复 PR [#18413](https://github.com/ollama/ollama/pull/18413)。
5. **[#17778](https://github.com/ollama/ollama/issues/17778) — qwen3.8 聊天流式响应 500 错误（"no user query found"）。** 修复 PR [#17894](https://github.com/ollama/ollama/pull/17894)（截断时保留最近的用户消息）已开。
6. **[#18094](https://github.com/ollama/ollama/issues/18094) — gemma3:12b 在双引号输入上的结构化输出截断。** 尚无修复 PR。
7. **[#16599](https://github.com/ollama/ollama/issues/16599) — 多 GPU 模型拆分**，即使单卡有足够显存也会发生拆分。长期未解决。
8. **[#17562](https://github.com/ollama/ollama/issues/17562) — Gemma 4 / Qwen 三个工具调用缺陷**（重复防护、调用截断、缺失大括号时丢弃调用）。相关的 Gemma 4 工具解析器 PR [#18400](https://github.com/ollama/ollama/pull/18400) 和 [#18398](https://github.com/ollama/ollama/pull/18398) 解决了缺失大括号变体和带空格的裸键问题。
9. **[#18396](https://github.com/ollama/ollama/issues/18396) — Gemma 4 E4B 多模态投影器导致 Jetson Orin Nano 内存溢出（OOM）。** 尚无修复 PR。
10. **[#14259](https://github.com/ollama/ollama/issues/14259) — 静默聊天历史截断**；由 [#17894](https://github.com/ollama/ollama/pull/17894) 部分解决。
11. **嵌入/导入加固已落地**：[#18406](https://github.com/ollama/ollama/pull/18406) 拒绝来自 runner 的全零向量，返回 500 而非 200；[#18407](https://github.com/ollama/ollama/pull/18407) 在量化过程中保留已上传的 GGUF blob（无重复写入/摘要漂移）。

## 对应用开发者的影响
- **如果你在 qwen3.8 或任何基于渲染器的模型上运行多步工具循环**，请关注 [#17894](https://github.com/ollama/ollama/pull/17894)——在合并之前，当对话超出上下文时仍可能遇到硬性 500 错误。请设置保守的 `num_ctx` 或预先截断历史。
- **在 Gemma 4 上运行的工具调用流水线**应预期至少两个解析器修复（[#18400](https://github.com/ollama/ollama/pull/18400)、[#18398](https://github.com/ollama/ollama/pull/18398)），用于处理带空格的键和裸键解析。底层行为的重复防御修复仍未关闭。
- **在 Windows 上大规模使用 `/api/embed`** 仅一步之遥就会陷入 HTTP 400 风暴；在扩展规模前请考虑客户端连接复用或限速。
- **使用 `web_search` 的 OpenAI Responses 消费者**：如果你依赖确定性的条目排序用于重放（例如 Codex 风格的客户端），请锁定到 0.34.0 之前的 Responses 行为，或等待 [#18413](https://github.com/ollama/ollama/pull/18413) 合并。
- **多 GPU 主机**：[#16599](https://github.com/ollama/ollama/issues/16599) 仍未解决——在此之前，当 VRAM 在不同大小显卡间碎片化时，请使用 `OLLAMA_GPU_LAYERS` 或单 GPU 环境变量显式约束。
- **版本锁定卫生**：[#18414](https://github.com/ollama/ollama/issues/18414) 提醒我们 Ollama 库卡片并不总是声明最低运行时要求。请在你的模型烘焙流水线中跟踪这一点。
- **即将推出的可选项**：如果静默提示截断是合规性/可观测性的关注点，请为 [#18399](https://github.com/ollama/ollama/pull/18399) 投票——这是实现"失败即响"模式的最清晰路径。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-13

## 今日要点

- **成本/计费正确性排查是当前最核心的主题**：多个 PR 已合并（或排队中），分别修复了缓存实时音频 token 重复计费（约 2 倍）([#40627](https://github.com/BerriAI/litellm/pull/40627))、OCR 部署自定义定价被静默丢弃 ([#40767](https://github.com/BerriAI/litellm/pull/40767)，取代 [#36609](https://github.com/BerriAI/litellm/issues/36608))，以及 Gemini Live 端到端计费 ([#40915](https://github.com/BerriAI/litellm/pull/40915)，含 grounded search 重复计费修复)。运维侧的支出仪表盘应重新校验。
- **Responses↔Chat 桥接正在活跃修复**：针对流式和非流式转换中 `reasoning_text`/`reasoning_content` 丢失的问题，多个 PR 协同推进 ([#40654](https://github.com/BerriAI/litellm/issues/40654)、[#40887](https://github.com/BerriAI/litellm/issues/40887)、[#40918](https://github.com/BerriAI/litellm/pull/40918))，并对 `gpt-5.x/o-series/codex` 的 reasoning 回退逻辑做了通用化处理 ([#40902](https://github.com/BerriAI/litellm/pull/40902))。任何将 `openai/responses/*` 路由到 `/v1/chat/completions` 的场景，都应锁定版本并进行测试。
- **Helm 出现安全相关回退**：`helm/litellm-helm/values.yaml` 中 `podSecurityContext`/`securityContext` 为空，因此部署默认以 root 运行 ([#40822](https://github.com/BerriAI/litellm/issues/40822)) —— 暂未合并修复 PR。

## 发布与破坏性变更

过去 24 小时内无新版本发布。

## 新增模型与硬件支持

- **Prism 注册为原生 provider**，支持 Chat Completions、Responses 和 Messages 路由，并附带 DeepSeek V4 与 V4.1 Flash 的元数据 ([#40914](https://github.com/BerriAI/litellm/pull/40914)；[#40782](https://github.com/BerriAI/litellm/pull/40782) 已作为重复 issue 关闭)。
- **Meta Muse Voice 实时转写** —— `meta/muse-voice-transcribe-1.0`，二进制 PCM 流映射到 OpenAI transcription 事件 ([#39395](https://github.com/BerriAI/litellm/pull/39395))。
- **OpenAI reasoning 系列回退通用化** —— 未显式映射的 `gpt-5.x`/`gpt-6`/`o-series`/`codex`/`deep-research`/`chat-latest` 标识符现在能正确解析 `supports_reasoning`，避免 Responses API 静默丢弃 `reasoning` 参数 ([#40902](https://github.com/BerriAI/litellm/pull/40902))。
- **Databricks 托管的 Gemini 2.5** —— `reasoning_effort` 现在会被翻译为 `thinking`，不再触发 400 ([#40909](https://github.com/BerriAI/litellm/pull/40909))。
- 仍未解决：对上游的 HTTP/2 出站连接 ([#30362](https://github.com/BerriAI/litellm/issues/30362))，以及 GPT-Live (`gpt-live-1`) 的 OpenAI 兼容支持 ([#40888](https://github.com/BerriAI/litellm/issues/40888))。

## 性能与优化

- **支出日志扇出收敛** —— `LiteLLM_SpendLogToolIndex` / `LiteLLM_SpendLogGuardrailIndex` 的 `create_many` 现在与源事务共享同一条语句预算上限，避免单请求扇出风暴 ([#40561](https://github.com/BerriAI/litellm/pull/40561))。
- **原子计数器 TTL** —— `RedisCache.async_increment` 在请求于 INCRBYFLOAT/EXPIRE 中途被取消时，不再遗留无 TTL 的孤儿计数器 ([#40715](https://github.com/BerriAI/litellm/pull/40715))。
- **日志洪水防护** —— 当一批 `LoggingWorker` 回调同时超时，现在会输出一条有界的汇总日志，而不是 N 条完整 traceback ([#40912](https://github.com/BerriAI/litellm/pull/40912))。
- **TLS 终止安全的 Admin UI** —— `/ui` 重定向改为路径相对形式，修复了反向代理后 https→http 降级的问题 ([#40916](https://github.com/BerriAI/litellm/pull/40916))。
- **缓存分析归因** —— 被网关拦截的请求（非法/被封禁 key、超出预算、403）以及 info 路由的失败，现在会被归入对应端点，而不是全部塌缩到 "Unknown" ([#40824](https://github.com/BerriAI/litellm/pull/40824))。

## 稳定性与回归

**高严重度**

- **Helm chart 默认以 root 运行** —— `values.yaml` 中 `podSecurityContext`/`securityContext` 为空；`runAsNonRoot`/`runAsUser`/`allowPrivilegeEscalation`/`capabilities.drop` 仅以注释示例形式存在。暂无修复 PR。([#40822](https://github.com/BerriAI/litellm/issues/40822))
- **OTEL 回调导致容器持续重启** —— 启用 OpenTelemetry collector 回调时出现 `NoneType` 崩溃。自六月起一直处于 open 状态。([#30061](https://github.com/BerriAI/litellm/issues/30061))
- **Azure 支出被记为 $0** —— Admin UI 模型编辑会持久化派生定价；价格映射重载后 Azure 支出会静默归零（合并自 [#30081](https://github.com/BerriAI/litellm/issues/30081) 及后续 issue）。仍 open。([#40649](https://github.com/BerriAI/litellm/issues/40649))

**中等严重度**

- **`/v1/messages` 透传丢失 `adaptive_thinking` 与 effort** —— 自托管的 OpenAI 兼容服务器上的原生透传会丢失这些参数。([#40890](https://github.com/BerriAI/litellm/issues/40890))
- **Responses 转 Chat 桥接丢失 `reasoning_text`** —— 原始的 `response.reasoning_text.delta` 事件未被映射到 Chat 的 `reasoning_content`。下游明文丢失在 fork 中已确认。修复 PR 已开启：[#40918](https://github.com/BerriAI/litellm/pull/40918)。([#40654](https://github.com/BerriAI/litellm/issues/40654)、[#40887](https://github.com/BerriAI/litellm/issues/40887))
- **`enable_anthropic_prompt_caching` 会饿死向量存储 pre-call 钩子** —— 与 `vector_store_ids` prompt-caching 路径存在冲突。([#40908](https://github.com/BerriAI/litellm/issues/40908))
- **`LiteLLM_SpendLogs.session_id` 与 `litellm_session_id` 不一致** —— 被每次调用的关联 ID 静默覆盖，导致会话分组在分析时失效。([#40851](https://github.com/BerriAI/litellm/issues/40851))
- **`Router._embedding` 同步路径绕过 team/access-group 作用域** —— `request_kwargs` 未被转发，同步调用方可能落到本不应可见的部署上。([#31260](https://github.com/BerriAI/litellm/issues/31260))
- **流式 usage 合并器在显式零值更新后仍保留过期的 cache-write token** —— 显式置零时 `cached_tokens_details` 的写入计数未被清除。([#40736](https://github.com/BerriAI/litellm/issues/40736))
- **Bedrock 流式在 usage 处理前丢失 cache 计数** —— `cached_tokens_details` 在 Invoke 流式到计费层之间丢失（与 [#15263](https://github.com/BerriAI/litellm/issues/15263) 相关）。([#40736](https://github.com/BerriAI/litellm/issues/40736))
- **`/v1/messages`（Claude Code）出现误判 "Budget exceeded"** —— 强制计算出的成本约为 100，而实际 `max_budget=100`，导致 429 远早于真实花费触发。已关闭。([#40050](https://github.com/BerriAI/litellm/issues/40050))
- **Key 限额可被静默接受为高于所属 team 的限额** —— `rpm_limit` 大于 team 限额时被存储但不生效，也无任何告警。([#40866](https://github.com/BerriAI/litellm/issues/40866))

**较低严重度 / 已关闭**

- 自 v1.84.0 起 Vertex AI 模型被误报为 "Unhealthy" —— 已修复。([#28206](https://github.com/BerriAI/litellm/issues/28206))
- `ResetBudgetJob` 在 `budget_limits` 列表序列化时全局崩溃 —— 已修复。([#27171](https://github.com/BerriAI/litellm/issues/27171))
- 月度重置后 `max_budget` 被忽略 —— 已修复。([#27300](https://github.com/BerriAI/litellm/issues/27300))
- Cursor 触发 Bedrock 11 字段校验错误 —— 已修复。([#19384](https://github.com/BerriAI/litellm/issues/19384))
- Bedrock embeddings 缺少 AWS External ID —— 已修复。([#27835](https://github.com/BerriAI/litellm/issues/27835))
- `/v1/responses` 中 Anthropic 在 Vertex 上的原生 web_search `server_tool_use` 被当成通用 `function_call` —— 已修复。([#33546](https://github.com/BerriAI/litellm/issues/33546))
- `openai/` 前缀的自托管模型将 `/v1/messages` 路由到 Responses，悄悄丢失多模态 —— 仍 open。([#40780](https://github.com/BerriAI/litellm/issues/40780))
- `lite codex` 在 Codex 子命令后传入 `-c` 时会静默绕过代理 —— 仍 open。([#40651](https://github.com/BerriAI/litellm/issues/40651))
- OpenAI 图像生成将 `extra_headers` 写入 JSON body（破坏 Cloudflare AI Gateway） —— 仍 open。([#40628](https://github.com/BerriAI/litellm/issues/40628))

## 对应用开发者的影响

- **立刻对账你的支出表**。这批成本/计费修复（缓存音频、OCR 自定义定价、Gemini Live grounded search 重复计费、Admin UI Azure $0 回退）意味着最近几周的历史支出可能被低估甚至为零。在重新跑成本报表前，请先锁定一个已知可用的版本。
- **自托管 Helm 用户：请加固或覆盖默认配置**。在 [#40822](https://github.com/BerriAI/litellm/issues/40822) 修复之前，请在 values 覆盖中显式设置 `runAsNonRoot: true`、`runAsUser`、`allowPrivilegeEscalation: false`，并 drop capabilities —— 默认值并不安全。
- **使用 Responses↔Chat 桥接的 reasoning/流式用户**：如果你以 `openai/responses/<model>` 形式调用 `/v1/chat/completions`，在 [#40918](https://github.com/BerriAI/litellm/pull/40918) 合并前，预计会出现 `reasoning_content` 缺失。对于那些在前置文本之后依赖 `tool_calls` 进行分支的 agent 框架，请避免使用该桥接 —— 当前 gpt-5.x+ 配 tools 时会输出两个 choice。
- **新的 provider 接入面**：Prism（DeepSeek V4 / V4.1 Flash）已原生接入 ([#40914](https://github.com/BerriAI/litellm/pull/40914))；Meta Muse Voice 转写可通过 realtime 端点访问 ([#39395](https://github.com/BerriAI/litellm/pull/39395))。未显式映射的 OpenAI reasoning id 现在也能通过注册表回退正确解析 ([#40902](https://github.com/BerriAI/litellm/pull/40902))。
- **可靠性改进进入热路径**：支出日志索引行的有界 `create_many` ([#40561](https://github.com/BerriAI/litellm/pull/40561)) 与 Redis 计数器的原子 TTL ([#40715](https://github.com/BerriAI/litellm/pull/40715))，能降低突发流量下数据库与 Redis 的压力 —— 对高 RPM 的多工具工作负载是可观收益。
- **Memory 工具正在进入网关层** ([#40894](https://github.com/BerriAI/litellm/pull/40918)) —— 如果你当前在客户端编排持久化 memory，值得持续关注；网关侧路径能在 Chat Completions / Responses / Messages 之间保留原生客户端工具。
- **OpenAI 图像生成 + Cloudflare AI Gateway**：在 [#40628](https://github.com/BerriAI/litellm/issues/40628) 解决前仍处于异常状态；可通过设置

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-13

## 1. 今日要点

一个聚焦于**稳定 main 分支**和**扩展部署覆盖面**的 24 小时冲刺：danielhanchen 的 [PR #10832](https://github.com/unslothai/unsloth/pull/10832) 把 `main` 从红色恢复为绿色（自 2026-09-11 的提交 `22bbff627` 起一直处于失败状态，导致约 25 个开放 PR 和所有 `Backend CI` 运行被破坏），oobabooga 的 [PR #10825](https://github.com/unslothai/unsloth/pull/10825) 修复了 Docker Studio 的一个回归 —— `ENV UNSLOTH_ALLOW_CPU=1` 在 GPU 主机上悄悄禁用了 Unsloth 的 TRL 补丁，进而破坏了所有训练路径（Train 页面、notebooks、`unsloth train`、GRPO）。平台侧，[PR #10820](https://github.com/unslothai/unsloth/pull/10820) 带来了期盼已久的 **AMD ROCm Docker 镜像**，覆盖 RDNA2 → RDNA4 以及 CDNA。

## 2. 发布与破坏性变更

过去 24 小时内没有正式发布，但以下与迁移相关的变更已合并或在讨论中：

- **[PR #10816](https://github.com/unslothai/unsloth/pull/10816) — `upload_to_huggingface` 模型卡 `method` 参数**：一个必需的位置参数 `method` 在生成的模型卡中被悄悄丢弃。修复保持向后兼容（未更改签名），但此修复之前推送的模型卡中 `method = ""`。
- **[PR #10740](https://github.com/unslothai/unsloth/pull/10740) — TRL 0.20 兼容性**：Studio 的 text/CPT 分支传递了在 `trl >= 0.20` 中已被移除的 `max_seq_length` 和 `tokenizer` kwargs，导致 `TypeError: SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`。任何固定 `trl 0.20+` 的用户都需要消费此修复。
- **[PR #10837](https://github.com/unslothai/unsloth/pull/10837) — `max_tokens` → `max_completion_tokens`**：当 Studio 代理到自定义 OpenAI 兼容端点（如企业版 Azure GPT-5 网关）时，它发送的是已弃用的 `max_tokens`，而较新的模型会拒绝接收。Studio 用户自动迁移；自定义网关运营方应自行更新。

## 3. 新增模型与硬件支持

- **[PR #10820](https://github.com/unslothai/unsloth/pull/10820) — AMD ROCm Docker 镜像**：在 #5748 的 CUDA 镜像基础上增加了 ROCm 同源镜像，覆盖 RDNA2 → RDNA4 消费级以及 CDNA 数据中心部件。保持相同的 `docker/` 目录结构和 `build.sh` / `run.sh` 入口。
- **[PR #7115](https://github.com/unslothai/unsloth/pull/7115) — EXL3（ExLlamaV3）量化后端** *（仍未合并）*：增加 2/3/4/6/8 比特及分数比特率，以及 bitsandbytes 在 transformers 5 下无法做到的 MoE 量化。属于增量变更，不改变现有用户的行为。
- **[PR #10819](https://github.com/unslothai/unsloth/pull/10819) — Windows ROCm 下 `accelerate` 版本锁定**：在 Windows 上将 `accelerate` 限制为 `< 1.15`，因为 1.15.0 无条件导入 `torch._C._distributed_c10d`，而 AMD 的 Windows ROCm wheels 并不提供该符号，导致每次训练都在 `Accelerator.prepare_model` 处失败。
- **[PR #10788](https://github.com/unslothai/unsloth/pull/10788) — 图像文本编码器精度控制**：在 Images 页面 UI 中暴露 `Default / FP8 storage / FP8 compute / INT8 / NVFP4` 选项；此前精度仅显示但不可选择。
- **[Issue #10838](https://github.com/unslothai/unsloth/issues/10838) — Deepseek v4.1 Flash GGUF**：用户功能请求，希望在 Unsloth Studio 中支持 GGUF 量化和 `llama.cpp`。尚无维护者回复。

## 4. 性能与优化

- **[PR #10834](https://github.com/unslothai/unsloth/pull/10834) — API 监控中的实时推理阶段**：GGUF 请求现在在 llama.cpp prompt eval 期间显示 `Prompt processing · N%`，在解码开始后显示 `Token generation`。便于诊断 TTFT 与 TPS 瓶颈，无需借助 strace。
- **[PR #10088](https://github.com/unslothai/unsloth/pull/10088) — MCP 图像返回对模型可见**：此前返回图像的 MCP 工具虽然在工具卡片中显示，但只向模型发送了一段文本占位符（"an image was attached"），迫使模型产生幻觉。现在图像会作为正式的消息部分进行转发，修复了 #10057。
- **[PR #10830](https://github.com/unslothai/unsloth/pull/10830) — `trust_remote_code` 解析移出事件循环**：`GET /api/inference/status` 此前在 `async def` 中内联执行 `hf_hub_download`，在缓存未命中时可能导致 Studio 事件循环停滞。

## 5. 稳定性与回归

**按严重程度排序（最高优先）：**

1. **Docker Studio 在 GPU 主机上不可用** — [PR #10825](https://github.com/unslothai/unsloth/pull/10825)。训练路径完全中断（trainer 构建时抛出 `TypeError`）。**修复已合并（CLOSED）。**
2. **`main` 红色约 24 小时** — [PR #10832](https://github.com/unslothai/unsloth/pull/10832)。约 25 个 PR 受 `Repo tests (CPU)` 失败继承影响。**修复已合并（CLOSED）。**
3. **`accelerate 1.15.0` 导致 Windows 上所有 ROCm 训练失败** — [Issue implicit / PR #10819](https://github.com/unslothai/unsloth/pull/10819)。**修复 PR 开放中。**
4. **通过工具权限设置绕过 Studio 安全机制** — [Issue #10835](https://github.com/unslothai/unsloth/issues/10835)。据报告，将工具权限设为 "Run automatically" 或 "Full access" 后，`reboot`/`rm` 之类命令可在无确认的情况下执行，从而绕过沙箱。**尚无修复 —— 涉及安全，预计会发布 hotfix。**
5. **手动 GPU-memory `--fit` 判定日志记录错误** — [PR #10831](https://github.com/unslothai/unsloth/pull/10831)。日志行在 Manual 分支将其关闭之前就已经插值了 `use_fit`；紧接其后六行的启动命令实际携带的是 `--fit: off`。对用户而言仅为外观问题，但对诊断具有误导性。
6. **Studio IPv6 绑定黑洞** — [PR #10803](https://github.com/unslothai/unsloth/pull/10803)。后端绑定了 `127.0.0.1:8888` 后陷入静默；HF token 检查挂起约 80 秒，桌面应用报出 `unresponsive_health_check`。**修复 PR 开放中。**
7. **配方导出中误报 `ALL_COLUMNS_DROPPED`** — [Issue #10738](https://github.com/unslothai/unsloth/issues/10738) / [PR #10836](https://github.com/unslothai/unsloth/pull/10836)。即使保留了种子列，Recipe Studio 的 "Check recipe" 仍会失败。**修复 PR 开放中。**
8. **AppImage 缺失 `hf_xet`** — [Issue #10840](https://github.com/unslothai/unsloth/issues/10840)。大型 GGUF 下载（例如 Qwen 3.8 Flash Next Q5_K_XL）失败，提示 `ValueError: The file is too large to be downloaded using the regular download method`。**尚无修复。**
9. **MCP 调用被系统性地截断** — [Issue #10839](https://github.com/unslothai/unsloth/issues/10839)。可能与 [Issue #10379](https://github.com/unslothai/unsloth/issues/10379) 中讨论的工具调用去重行为相关。
10. **Studio New-chat 崩溃** — [Issue #10288](https://github.com/unslothai/unsloth/issues/10288)。`tapClientLookup: Index 1 out of bounds (length: 0)` 以及 `MessagePartText can only be used inside text or reasoning message parts`。
11. **Run-settings 侧栏 / 下拉框状态分歧** — [Issue #10817](https://github.com/unslothai/unsloth/issues/10817)。两个面板编辑同一组 per-model 设置，但各自维护的草稿会静默地不一致。
12. **内联图表 / Python 可视化在聊天中不渲染** — [Issue #10539](https://github.com/unslothai/unsloth/issues/10539) **[CLOSED]**。
13. **局域网下语音输入不可用** — [Issue #10824](https://github.com/unslothai/unsloth/issues/10824)。

## 6. 对应用开发者的影响

- **如果你通过官方 Docker 镜像在 GPU 上运行 Unsloth Studio**，[PR #10825](https://github.com/unslothai/unsloth/pull/10825) 恢复了训练功能。在任何 GRPO / Train / notebook 运行之前请先拉取重建后的镜像。
- **如果你将 Studio 代理到企业版 Azure OpenAI / 自定义 OpenAI 兼容网关**，[PR #10837](https://github.com/unslothai/unsloth/pull/10837) 通过切换到 `max_completion_tokens` 修复了较新模型上的 400 拒绝问题。发布期间请确认你的网关同时接受两种参数。
- **如果你的目标是 AMD GPU**，[PR #10820](https://github.com/unslothai/unsloth/pull/10820) 在 RDNA2+ 和 CDNA 上打通了 ROCm Docker 路径，但 Windows ROCm 用户在 #10819 合并之前必须继续停留在 `accelerate < 1.15`（[PR #10819](https://github.com/unslothai/unsloth/pull/10819)）。
- **如果你在 Studio 上构建 agent / MCP 工作流**，请关注 [Issue #10379](https://github.com/unslothai/unsloth/issues/10379)（工具调用去重开关）、[Issue #10822](https://github.com/unslothai/unsloth/issues/10822)（一键 MCP 安装）以及 [PR #10088](https://github.com/unslothai/unsloth/pull/10088)（MCP 图像往返）。当前的去重行为正在导致合法的重复工具调用被悄悄丢弃 —— 对任何会重新调用同一工具的 agent 循环都有影响。
- **如果你在具有 IPv6 怪癖的网络环境中自托管**，[PR #10803](https://github.com/unslothai/unsloth/pull/10803) 解决了 `127.0.0.1:8888` 上后端静默挂起的问题。即便不运行 Studio 也值得回移。
- **Studio 桌面端运营者安全提示**：[Issue #10835](https://github.com/unslothai/unsloth/issues/10835) 报告 "Run automatically" / "Full access" 工具权限会绕过沙箱。在修复落地之前，建议优先使用 "Ask every time"，或者严格收紧工具白名单。
- **TRL >= 0.20 用户** 必须消费 [PR #10740](https://github.com/unslothai/unsloth/pull/10740)，Studio 才能成功构造 trainer。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 摘要 — 2026-09-13

## 今日要点

路由器的网关/可观测性层在夜间出现了集中变更：三个独立报告的缺陷产生了修正后的成本追踪路径（[#1790](https://github.com/musistudio/claude-code-router/pull/1790) 修复 [#1787](https://github.com/musistudio/claude-code-router/issues/1787)），以及子代理路由插桩修复（[#1788](https://github.com/musistudio/claude-code-router/pull/1788)）。针对 OpenCode Go 零缓存症状提出的归因头缓解方案（[#1791](https://github.com/musistudio/claude-code-router/issues/1791)）在验证未能复现假设后被撤回，该问题仍未解决。同时提交了一个新的正确性缺陷：通过 `openai_chat_completions` 向具备推理能力的模型（例如通过 OpenRouter 路由的 `z-ai/glm-5.3`）发起的非流式补全请求，会产生碎片化或损坏的内容块（[#1793](https://github.com/musistudio/claude-code-router/issues/1793)）。过去 24 小时内未发布新版本。

---

## 发布与破坏性变更

*过去 24 小时内无新发布。* 构建活动仅限于针对 `master` 分支进行中的 PR。

---

## 新模型与硬件支持

- **推理模型覆盖缺口浮现** — 通过 OpenRouter 路由的 `z-ai/glm-5.3` 在 `openai_chat_completions` provider capability 下的非流式模式暴露出内容块损坏缺陷（[#1793](https://github.com/musistudio/claude-code-router/issues/1793)）。尚无修复合并。
- **GLM-5.3 "Token Plan" 提案** — 维护者开启了功能/调研 issue（[#1747](https://github.com/musistudio/claude-code-router/issues/1747)），探讨为 Claude Code 和 Codex 场景下的 GLM-5.3 专门优化的付费 token 套餐。
- **功能请求：Qoder CN 企业子账户** — [#1789](https://github.com/musistudio/claude-code-router/issues/1789) 请求原生支持分布式 Qoder CN 子账户路由，这是中国大陆常见的分发模式。

本周期内未涉及新的硬件后端、量化格式或架构。

---

## 性能与优化

- **子代理路由插桩加固** — [#1788](https://github.com/musistudio/claude-code-router/pull/1788) 修复了网关/可观测性路径中的三个独立缺陷：此前一个被引号包裹的路由元素（`CCR-SUBAGENT-MODEL`）可能会对正在审查它的请求本身重新路由；未捕获的上游 HTTP 状态码现已记录；子代理路由元素的范围被正确限定为真正的子代理启动，而非父级请求。
- **归因头实验撤回** — [#1792](https://github.com/musistudio/claude-code-router/pull/1792)（已关闭，未合并）曾提议在 CCR 管理的配置中将 `CLAUDE_CODE_ATTRIBUTION_HEADER=0` 设为默认值，以减少系统提示前缀的变化。作者此后撤回了根本原因假设；[#1791](https://github.com/musistudio/claude-code-router/issues/1791) 中的缓存命中行为仍未修复。
- **成本追踪正确性** — [#1790](https://github.com/musistudio/claude-code-router/pull/1790) 修复了通过 Router 别名路由请求时的计费方式：成本现在以解析后的上游模型 ID（即 `modelMetadata` 查找目标）为键，而不是回显给客户端的别名，请求日志也统一对齐到同一上游标识。尚未提供吞吐量数据。

---

## 稳定性与回归

按严重程度排序：

1. **[高] 推理模型的损坏内容块（非流式）** — [#1793](https://github.com/musistudio/claude-code-router/issues/1793)。通过 `openai_chat_completions` 经 OpenRouter 路由 `z-ai/glm-5.3` 时复现。根本原因尚未定位。**目前没有修复 PR。** 影响所有针对具备推理能力的模型发起非流式补全请求的 Claude Code / Anthropic 协议客户端。
2. **[高] 所有目标 provider 失败（400）** — [#1658](https://github.com/musistudio/claude-code-router/issues/1658)。自 2026-08-12 起开放。同一目标（`nvidia/nemotron-3-ultra-550b-a55b`）在 `cc-switch` 和直接使用 Claude Code 时可用，但通过 CCR 路由时报 `"All target providers failed"`。**目前没有修复 PR。**
3. **[中] 规则别名模型的预估成本为 `$0`** — [#1787](https://github.com/musistudio/claude-code-router/issues/1787)。自 v3.0.22 起在 `master` 上持续存在。使用记录的是别名而非解析后的上游模型 ID，导致 `modelMetadata` 查找未命中，计费出错。**修复进行中：[#1790](https://github.com/musistudio/claude-code-router/pull/1790)。**
4. **[中] 通过 OpenCode Go 的缓存使用为零** — [#1791](https://github.com/musistudio/claude-code-router/issues/1791)。归因头缓解方案已撤回，症状仍未定性。
5. **[中] 子代理路由 / 上游状态可观测性缺口** — 由 [#1788](https://github.com/musistudio/claude-code-router/pull/1788) 覆盖三个缺陷；其中自指重路由的情形影响最大，值得优先审查。

---

## 对应用开发者的意义

- **将当前 `master` 上的非流式推理模型补全视为已损坏。** 在 [#1793](https://github.com/musistudio/claude-code-router/issues/1793) 解决之前，建议优先使用流式，或将推理模型（如 `z-ai/glm-5.3` 等）路由到经过端到端验证的 provider capability。消费响应前务必校验解析后的 Anthropic Messages 响应。
- **在使用别名密集型配置时不要信任成本仪表板。** 在 [#1790](https://github.com/musistudio/claude-code-router/pull/1790) 合并之前，任何规则别名模型在用量存储中的成本都会低估（或随机报告）。如果你依赖路由器的用量数据进行计费或预算，暂且钉住解析后的上游模型 ID。
- **如果你将 OpenCode Go 与 Claude Code 配合使用，请关注 [#1791](https://github.com/musistudio/claude-code-router/issues/1791)。** 该组合下缓存命中率据报告为零；目前不推荐任何缓解措施，先前提出的请求头变通方案已被撤回。
- **子代理启动器在依赖 [#1788](https://github.com/musistudio/claude-code-router/pull/1788) 中的公开修复之前，应当验证路由断言** —— 尤其是审查者请求体中的 `CCR-SUBAGENT-MODEL` 元素自身可能被匹配并重新路由的情形。
- **围绕即将到来的 GLM-5.3 与 Qoder CN 集成做好规划。** 维护者正在征集关于 GLM-5.3 "Token Plan" 的反馈（[#1747](https://github.com/musistudio/claude-code-router/issues/1747)），针对 Qoder CN 子账户的功能请求（[#1789](https://github.com/musistudio/claude-code-router/issues/1789)）也仍开放。如果这两项在你的 2026 路线图上，值得跟踪。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 简报 — 2026-09-13

## 今日要点

过去 24 小时，CC Switch 的动向集中在代理/路由上：**`model_mapper` → `model_router` 的破坏性重命名**已通过 [PR #7317](https://github.com/farion1231/cc-switch/pull/7317) 落地(供应商高级选项现在按规则路由而非映射)，[PR #7290](https://github.com/farion1231/cc-switch/pull/7290) 提出了**按供应商划分的外部 API 代理**功能，而 [PR #5617](https://github.com/farion1231/cc-switch/pull/5617) 中长期推进的**通用路由代理**仍在持续迭代。缺陷方面，多起 **Codex + DeepSeek 工具调用/JSON 反序列化回归**都集中在 `/responses` 端点附近，其中一项相关修复已经关闭([#3575](https://github.com/farion1231/cc-switch/issues/3575)),另有数项仍待解决。

## 版本发布与破坏性变更

- **过去 24 小时没有新版本发布。**
- **破坏性配置字段重命名(评审中):** [PR #7317](https://github.com/farion1231/cc-switch/pull/7317) 将 `model_mapper` 重命名为 `model_router`。脚本、MCP 服务器或第三方工具中任何读取旧字段的地方都需要迁移。作者指出，现有的“模型映射”高级选项正被重新定位为一个支持多种匹配策略的路由概念。
- **Codex `model_catalog_json` 存储修复(后端语义变更):** [PR #7349](https://github.com/farion1231/cc-switch/pull/7349) 提议重新写入绝对路径，因为较新的 Codex 版本会在解析权限配置期间重新读取 `config.toml`,并将该字段按绝对路径反序列化。而自 #3614 起，存储的只有裸文件名。

## 新模型与硬件支持

CC Switch 是一个基于 Tauri 的供应商切换器/本地代理，并非训练/推理栈，因此后端(CUDA/ROCm/Metal)和量化方面的条目并不适用。取而代之的新增功能面包括：

- **新增供应商预设:** [PR #7313](https://github.com/farion1231/cc-switch/pull/7313) 为 Claude Code(原生 Anthropic 兼容)和 Codex(经本地路由走 Chat Completions)都加入了 `cocodot` 预设;[issue #5258](https://github.com/farion1231/cc-switch/issues/5258) 提出了 `DaoXE` 通用预设。
- **智谱 OpenAI Responses 模型列表兼容:** [PR #7330](https://github.com/farion1231/cc-switch/pull/7330) 接通了智谱的三个模型列表端点(每种 API 风格各一个)，让列表查询能真正返回可用的 ID。
- **请求支持的新 CLI 工具目标：**
  - **Antigravity CLI**,作为(现已停更的)Gemini CLI 的替代——影响入口配置和用量统计([issue #7198](https://github.com/farion1231/cc-switch/issues/7198))。
  - **Pi (pi-coding-agent)** 作为 MCP 同步目标([issue #7220](https://github.com/farion1231/cc-switch/issues/7220);当前同步目标为 Claude Code、Codex、Gemini、OpenCode、GrokBuild、Hermes)。
  - **DeepSeek Harness** 兼容性([issue #6430](https://github.com/farion1231/cc-switch/issues/6430),13 👍)。
  - [CLI Tool Support Tracker #1855](https://github.com/farion1231/cc-switch/issues/1855)(201 条评论)仍是权威的待办清单。
- **Linux 桌面功能对齐:** [PR #7331](https://github.com/farion1231/cc-switch/pull/7331) 在 Linux 上支持 Claude Desktop 第三方(3P)配置(可感知 Flatpak,并回退到 `$XDG_CONFIG_HOME`),替代已关闭的 [PR #6408](https://github.com/farion1231/cc-switch/pull/6408)。

## 性能与优化

- **工具版本探测的带宽开销：** [PR #7346](https://github.com/farion1231/cc-switch/pull/7346) 用专用的 `dist-tags` 端点取代抓取完整 packument(`https://registry.npmjs.org/{package}`)的做法，并沿用现有的探测超时。此前每次请求动辄数十 MB,导致 Codex/OpenCode/OpenClaw 的版本卡片长期滞后。
- **WSL 版本探测准确性：** [PR #7348](https://github.com/farion1231/cc-switch/pull/7348) 过滤 shell 启动横幅，使 WSL 路径返回真实的工具版本，而非发行版版本号字符串(`24.04.4` 一度冒充 Claude Code 2.1.270)。
- **Codex macOS 用量统计：** [PR #7341](https://github.com/farion1231/cc-switch/pull/7341)(Draft)读取 `~/Library/Logs/com.openai.codex/YYYY/MM/DD/*.log`,把从不生成可导入会话 JSONL 的后台生成任务(`thread_title`、`ambient_suggestions`、`ambient_suggestion_safety`)纳入呈现。
- **会话虚拟化：** [PR #7327](https://github.com/farion1231/cc-switch/pull/7327) 让选中的 DOM 节点保持挂载，使跨消息的文本选区在滚动后仍得以保留。
- **提示词时效性：** [PR #7194](https://github.com/farion1231/cc-switch/pull/7194) 将 `CLAUDE.md` / `AGENTS.md` 重新加载到当前提示词中，并在窗口获得焦点时刷新，外部编辑的内容随即生效。

## 稳定性与回归

按严重程度排序(由高到低)。最近 24 小时的动态以粗体标出。

- **[HIGH] Codex + DeepSeek 在插入图片后工具调用返回 400(v3.20.1)。** [Issue #7190](https://github.com/farion1231/cc-switch/issues/7190) 报告在 `image_resize_notice` 交错插入后，`/responses` 上间歇性出现 `HTTP 400: No tool output found for tool call`;一个相关的**清理修复**落在 [PR #7342](https://github.com/farion1231/cc-switch/pull/7342)(在第三方 ↔ 官方 Responses 供应商之间穿越时剥离不兼容的 reasoning 重放)。
- **[HIGH] Windows 上切换供应商时 Codex `config.toml` 被覆盖。** [Issue #7235](https://github.com/farion1231/cc-switch/issues/7235)——插件和外观设置丢失。相关的 [PR #7332](https://github.com/farion1231/cc-switch/pull/7332) 会记录接管生成的 Codex 路由的归属，使清理时能恢复内置供应商，而不会删除用户自建的表。
- **[HIGH] Codex + DeepSeek JSON 反序列化失败**——今日经由 [issue #3575](https://github.com/farion1231/cc-switch/issues/3575) 关闭("local proxy failed while handling Codex endpoint. failed to deserialize the JSON body into the target")。
- **[MED] macOS:代理工具退出/切换后请求彻底失败。** [Issue #7029](https://github.com/farion1231/cc-switch/issues/7029)——用量查询和连通性检查全部返回 `error sending request`,只有重启应用才能恢复。[PR #7292](https://github.com/farion1231/cc-switch/pull/7292) 提议增加一个 UI 开关来**禁用“跟随系统代理”**，并显示当前实际生效的出站代理。
- **[MED] 切换供应商时 Codex UI 设置被回滚。** [Issue #6600](https://github.com/farion1231/cc-switch/issues/6600)——字体/主题从过期快照中恢复；引用了修复 #3697。
- **[MED] Codex 子代理在 DeepSeek v4-flash 上失败。** [Issue #6178](https://github.com/farion1231/cc-switch/issues/6178);根本原因尚不清楚是 cc-switch 还是模型的问题。
- **[MED] DeepSeek v4.1-flash 搭配 Codex 时报 "model does not support images"。** [Issue #7308](https://github.com/farion1231/cc-switch/issues/7308)——尽管是多模态模型，视觉能力并未通过 Codex 适配器暴露出来。
- **[MED] URL 自动追加 `chat/completion` 后缀出现回归。** [Issue #6261](https://github.com/farion1231/cc-switch/issues/6261)(已关闭)——每次重新编辑供应商都会回退为自动追加后缀，导致需要显式完整路径 URL 的模型不可用。
- **[MED] Claude Code 的 `input_image.detail = "original"` 被上游拒绝。** [PR #7104](https://github.com/farion1231/cc-switch/pull/7104)(已关闭)在 `responses_to_chat_completions` 中将 `"original"` 归一化为 `"high"`,因为该 Responses 专有值在 Chat Completions 一侧不被接受。
- **[MED] 格式转换路径上泄漏可指纹识别的客户端请求头。** [PR #7305](https://github.com/farion1231/cc-switch/pull/7305) 在转换为 OpenAI Chat、OpenAI Responses 或 Gemini 时剥离 Claude Code / Stainless SDK 的请求头——此前即使完成格式转换，上游网关仍能指纹识别出原始客户端。
- **[LOW] Windows 上 SQLite 数据库崩溃，临时文件持续增长，重装无效。** [Issue #5279](https://github.com/farion1231/cc-switch/issues/5279)(长期无进展)。
- **[LOW] SiliconFlow 余额查询返回负数人民币，而官网显示 ¥0。** [Issue #5272](https://github.com/farion1231/cc-switch/issues/5272)(长期无进展)。
- **[LOW] 技能重新导入后 `model_name` 映射被静默丢弃 → 上游返回 400。** [Issue #5312](https://github.com/farion1231/cc-switch/issues/5312)(长期无进展)。
- **[LOW] Windows 上 Codex 应用可连通，但自检报告无连接。** [Issue #5278](https://github.com/farion1231/cc-switch/issues/5278)(长期无进展)。
- **[LOW] KDE 上 Tauri 覆盖式标题栏异常。** 按钮无法点击，且每次还原窗口都会变大——已由 [PR #4298](https://github.com/farion1231/cc-switch/pull/4298) 修复：在 Linux 上强制使用 `titleBarStyle: "Visible"`。
- **[LOW] Claude Code v3.16.5 追加空 thinking 块 → TUI 渲染故障。** [Issue #5257](https://github.com/farion1231/cc-switch/issues/5257)(长期无进展)。
- **[LOW] 通过 `ccswitch://` 深度链接导入后托盘菜单未刷新。** [Issue #5255](https://github.com/farion1231/cc-switch/issues/5255)(长期无进展)。
- **[LOW] 环境变量提示的关闭按钮点击后失灵。** [Issue #5294](https://github.com/farion1231/cc-switch/issues/5294)(长期无进展)。
- **[LOW] `openai_responses` 供应商的 `base_url` 会被剥去 `/v1` → 破坏 Bailian 原生 Responses。** [Issue #5276](https://github.com/farion1231/cc-switch/issues/5276)(长期无进展)。
- **[LOW] Codex "enhanced mode keeps official login"(增强模式保留官方登录)分组：GPT-5.4/5.5 被报告为不存在。** [Issue #5286](https://github.com/farion1231/cc-switch/issues/5286)(长期无进展)。

## 对应用开发者意味着什么

- **使用视觉工具调用的 v3.20.1 Codex+DeepSeek 用户应锁定版本或回滚。** [#7190](https://github.com/farion1231/cc-switch/issues/7190) 会间歇性搞垮整个会话;[PR #7342](https://github.com/farion1231/cc-switch/pull/7342) 的针对性修复只覆盖 reasoning 重放的清理，并未解决图片交错插入这一根因。请留意下一个版本的发布说明，等待完整修复。
- **持续关注 `model_mapper` → `model_router` 重命名。** [PR #7317](https://github.com/farion1231/cc-switch/pull/7317) 是配置层面的破坏性变更。如果你的脚本依赖 `model_mapper`,或在应用之外持久化供应商 JSON,请在并入工作流前先做审计。
- **为更丰富的路由做规划。** 随着通用路由代理([#5617](https://github.com/farion1231/cc-switch/pull/5617))、按供应商划分的外部代理([#7290](https://github.com/farion1231/cc-switch/pull/7290))以及基于规则的路由陆续到来，多供应商配置将能按上游渠道和模型名称分流，而不必进行硬切换。
- **多租户/共享机器：** [PR #7292](https://github.com/farion1231/cc-switch/pull/7292) 新增的“不跟随系统代理”开关，直接解决了宿主机代理环境变量失效时悄然出现的 `error sending request` 失败——如果你在 CI 或共享开发虚拟机上运行 CC Switch,这一点尤其相关。
- **Linux 上的 Codex Desktop 终于要落地了。** [PR #7331](https://github.com/farion1231/cc-switch/pull/7331) 正确处理了 Flatpak 与原生安装的 `$XDG_CONFIG_HOME` 差异，Linux 用户无需手动复制配置，即可让 Claude Desktop 的流量经由 cc-switch 路由。
- **请求头卫生正在收紧。** [PR #7305](https://github.com/farion1231/cc-switch/pull/7305) 意味着转换后的请求不会再向上游暴露 Claude Code / Stainless 标识——如果你经由按客户端实施策略的网关路由，这一点很有用。
- **MCP 用户:Pi 代理是下一个同步缺口。** 如果你在 Claude/Codex/Gemini 之外还使用 `pi-coding-agent`,在 [issue #7220](https://github.com/farion1231/cc-switch/issues/7220) 落地之前，MCP 配置仍需手动维护多份。
- **供应商遥测的小坑：** [PR #7341](https://github.com/farion1231/cc-switch/pull/7341) 暴露了此前完全脱离统计的 Codex Desktop 后台 token 消耗(标题生成、ambient 建议)——那些假设“会话 JSONL = 总开销”的预算代码需要重新审视。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 速览 — 2026-09-13

[QuantumNous/new-api](https://github.com/QuantumNous/new-api) 每日动态快照，该项目是统一的 LLM 网关/路由器（One-API 的继任者）。今天的周期以安全加固和 bug 修复跟进为主，并带来一项值得注意的新后端集成。

---

## 1. 今日要点

- **`mc-yzy15` 的安全扫描**：两个 PR 在比例同步路径中落地 SSRF 安全的 URL 校验（[#7344](https://github.com/QuantumNous/new-api/pull/7344)），并对用户设置的 webhook/Bark URL 加强校验（[#7343](https://github.com/QuantumNous/new-api/pull/7343)）——这点尤为重要，因为 new-api 允许非特权用户注册通知端点。
- **容器感知的内存监控终于修复**：PR [#7335](https://github.com/QuantumNous/new-api/pull/7335) 关闭了长期未解决的 [#6744](https://github.com/QuantumNous/new-api/issues/6744)，将 `system_monitor` 从宿主机 `/proc/meminfo` 切换到 cgroup 统计，使 `monitor_memory_threshold` 在 Docker/K8s 内真正生效。
- **新后端与协议面**：原生的 **vLLM 渠道**（[#7332](https://github.com/QuantumNous/new-api/pull/7332)）和 **Gemini Agentic Video Understanding**（[#7337](https://github.com/QuantumNous/new-api/pull/7337) 关闭 [#7336](https://github.com/QuantumNous/new-api/issues/7336)）在同一天落地，进一步扩展了网关在自托管和多模态流量上的覆盖。

---

## 2. 版本发布与破坏性变更

过去 24 小时内未发布新版本标签。当前的预发布分支为 **v1.0.0-rc.37**。

- **[#7279](https://github.com/QuantumNous/new-api/issues/7279)** —— 由于 v1.0.0 已达到 rc.36，该开放增强请求要求给出明确的 GA 标准。维护者尚未承诺时间表；在 rc.x 上运行的下游运维方应继续关注渠道说明以了解破坏性变更。
- **已合并的 PR [#6948](https://github.com/QuantumNous/new-api/pull/6948) 中存在不向后兼容的行为变更**：`/api/channel` 的 GET/POST 强制使用尾斜杠——会剥离尾斜杠的反向代理需要配置路径重写规则。

---

## 3. 新增模型与硬件支持

| 项目 | 类型 | 链接 |
|---|---|---|
| **vLLM 渠道**（`feat: vllm channel`） | 新后端适配器——面向由 vLLM 服务的、兼容 OpenAI 协议的自托管端点，可能包含 vLLM 特有的元数据字段 | [#7332](https://github.com/QuantumNous/new-api/pull/7332) |
| **Gemini Agentic Video Understanding** | 新增原生 Gemini API + Vertex AI 中继对视频/媒体 + 工具追踪字段的支持，将 Vertex 原生 agentic 请求路由到正确路径 | [#7337](https://github.com/QuantumNous/new-api/pull/7337) |
| **Responses WebSocket 中继**（仍开放，今日有更新） | 新增 `/v1/responses` WS 路由以处理 `response.create` 事件，包含渠道选择、上游 WS 转发、用量计量和失败退款 | [#5062](https://github.com/QuantumNous/new-api/pull/5062) |
| **Gemini 3.x 计算层级后缀保留** | 修复 `gemini-3.8-flash` → `gemini-3.8-flash-high` 映射在 `ApplyReasoningModelSuffix` 之后丢失的问题 | [#7339](https://github.com/QuantumNous/new-api/pull/7339) |
| **多 Key 渠道"测试全部 Key"**（已关闭） | 多 Key 渠道的并发 Key 测试 + 自动禁用规则；移动端 UI 待跟进 | [#7112](https://github.com/QuantumNous/new-api/pull/7112) |
| **活跃渠道探测开关**（开放） | 按渠道开关活跃探测，并优化节流 | [#7161](https://github.com/QuantumNous/new-api/pull/7161) |
| **内部 API key**（开放） | 新鉴权路径；评审待跟进 | [#7342](https://github.com/QuantumNous/new-api/pull/7342) |

今天的 diff 中未明确涉及新的量化格式、CUDA/ROCm/Metal 变体或硬件目标。

---

## 4. 性能与优化

- **容器内存计量**（[#7335](https://github.com/QuantumNous/new-api/pull/7335)）：将以 `/proc/meminfo` 为基础的计量替换为 cgroup v1/v2 读取。效果：`monitor_memory_threshold` 在容器化部署中变为可操作；此前要么永不触发，要么基于宿主机压力触发，取决于是否设置了 `memory.limit_in_bytes`/`memory.max`。目前未公布具体数据。
- **计费准确性 —— Anthropic 缓存 token**（[#7305](https://github.com/QuantumNous/new-api/pull/7305)，关闭 [#7290](https://github.com/QuantumNous/new-api/issues/7290)）：prompt cache 读/写 token 现在计入 `consume_log` 的输入总量。运维方应基于上一个报表周期的上游账单重新校验比例计算。
- **活跃探测节流**（[#7161](https://github.com/QuantumNous/new-api/pull/7161)）：引入开关并优化节流，以减少冷启动和部署期间的探测风暴。

---

## 5. 稳定性与回归问题

按严重程度排序。若今日已有修复或更新，将特别标注。

| 严重程度 | 问题 | 状态 / 修复 |
|---|---|---|
| 🔴 严重 | **[#7331](https://github.com/QuantumNous/new-api/issues/7331)** —— `InitChannelCache` 发生 panic：`assignment to entry in nil map`，当已启用渠道的分组缺少 abilities 行时触发。在 `main`（`bdef11750`）和 rc.30 fork 上可复现；已报告生产事故。 | **开放**，尚无修复 PR。缓解措施：确保每个被已启用渠道引用的分组至少包含一行 `abilities`。 |
| 🔴 高 | **[#6972](https://github.com/QuantumNous/new-api/issues/6972)** —— 正常使用中出现"Active login session count limit reached"提示；应用内"退出其他会话"功能无法清除。 | **开放**，9 条评论，无修复 PR。可能是会话表与活跃会话计数器之间的状态不同步 bug。 |
| 🟠 高 | **[#6744](https://github.com/QuantumNous/new-api/issues/6744)** —— 容器内 `monitor_memory_threshold` 永不触发（读取的是宿主机内存）。 | **修复见 [#7335](https://github.com/QuantumNous/new-api/pull/7335)**（开放，等待评审）。 |
| 🟠 高 | **[#7338](https://github.com/QuantumNous/new-api/issues/7338)** —— 当 IdP 返回 `Cross-Origin-Opener-Policy` 时，OAuth 敏感操作验证失败，阻塞高权限流程。 | **开放**，无修复 PR。 |
| 🟡 中 | **[#6503](https://github.com/QuantumNous/new-api/issues/6503)** —— 自动禁用分组中最后一个渠道时，会在重试期间向客户端抛出"database consistency broken"。 | 修复 **[#6504](https://github.com/QuantumNous/new-api/pull/6504)** 今日已落地（已关闭）。 |
| 🟡 中 | **[#7340](https://github.com/QuantumNous/new-api/issues/7340)** —— `/v1/images/generations` 中继静默丢弃 `aspect_ratio` / `resolution`，原因是 `relaykit/dto.ImageRequest.MarshalJSON` 刻意不重新输出 `Extra`。 | 修复 **[#7341](https://github.com/QuantumNous/new-api/pull/7341)** 今日已开（开放）。 |
| 🟡 中 | **[#6708](https://github.com/QuantumNous/new-api/issues/6708)** —— `/v1/responses` 非透传模式下丢失 MiMo 的模型映射。 | 今日作为 `invalid` 关闭；报告可能误判了路由。 |
| 🟢 低 | **[#1069](https://github.com/QuantumNous/new-api/issues/1069)** —— 请求新增"忽略自签名 HTTPS 证书"开关以用于上游调用。 | 已关闭，无后续动作。 |
| ⚪ 无效 | **[#7334](https://github.com/QuantumNous/new-api/pull/7334)** 合并 PR | 已关闭，机器人维护。 |
| ⚪ 无效 | **[#7013](https://github.com/QuantumNous/new-api/pull/7013)** fix(ali): route Responses to compatible-mode endpoint | 已关闭。Direct-MaaS 用户应在合并后确认端点路由。 |

---

## 6. 对应用开发者的意义

- **自托管后端现已成为一等公民。** 随着 [#7332](https://github.com/QuantumNous/new-api/pull/7332) 新增 vLLM 渠道，运行内部推理集群的团队可以将客户端流量通过 new-api 路由，且不会丢失 vLLM 特有信号（前提是适配器已暴露——在生产中依赖之前，请对照合并后的 schema 验证）。
- **Gemini 上的多模态 agent 覆盖更广了。** [#7337](https://github.com/QuantumNous/new-api/pull/7337) 端到端打通 Gemini 的 Agentic Video Understanding，包括工具追踪和媒体字段。如果当前你在其他中继上构建视频理解 agent，这是一个可行的迁移目标——但请等待 PR 合并，并验证 Vertex 上的速率限制处理。
- **账单对账即将出现偏差——或自行修正。** [#7305](https://github.com/QuantumNous/new-api/pull/7305) 改变了 Anthropic 缓存 token 的计数方式。如果你的用量看板源自 new-api 的 `consume_log`，重新部署后 `input_tokens` 预计会出现一次性的向上修正。在下一个结算周期前更新财务/可观测性相关配置。
- **容器化部署应重新调优 `monitor_memory_threshold`。** [#7335](https://github.com/QuantumNous/new-api/pull/7335) 将统计基准从宿主机切换到 cgroup。如果你之前基于宿主机 RAM 百分比设置阈值，实际触发点将明显偏移——请基于 cgroup 上限重新推导。
- **三个开放 bug 需要立即采取绕过措施。** `InitChannelCache` panic（[#7331](https://github.com/QuantumNous/new-api/issues/7331)）优先级最高——在下一次部署前审计 `group → abilities` 的完整性，或通过配置校验启动检查来守护渠道。OAuth-COP 失败（[#7338](https://github.com/QuantumNous/new-api/issues/7338)）会破坏任何发出 `COOP: same-origin` 的 IdP；在修复前，请优先使用不带 COOP 的 IdP，或降级敏感操作校验。
- **WebSocket Responses 仍未完成。** [#5062](https://github.com/QuantumNous/new-api/pull/5062) 自 5 月起一直处于开放状态；如果你的 agent 技术栈依赖流式 Responses，请跟踪此 PR，而不是围绕其构建。

---

*来源：[QuantumNous/new-api issues](https://github.com/QuantumNous/new-api/issues) 与 [pull requests](https://github.com/QuantumNous/new-api/pulls)，更新区间 2026-09-12 → 2026-09-13。*

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*