# AI 基础设施日报 2026-09-11

> 生成时间: 2026-09-11 11:30 UTC | 覆盖项目: 9 个

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

# 跨项目 AI 基础设施报告 — 2026-09-11

**范围：** vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth、Claude Code Router (CCR)、CC Switch、New API

---

## 1. 生态总览

整个生态正处于密集的模型引入阶段：DeepSeek-V4.x/DSpark、GLM-5.3-Flash 以及 Qwen3.5/3.8/Next 家族在每一层都占据主要活动——从 vLLM 的 `dsv41-feat` 分支合并，到网关目录更新。两条系统性主线贯穿各项目：**推测解码 / MTP 正确性**（vLLM、SGLang、llama.cpp、Unsloth 中的缺陷或修复）以及 **Blackwell 变体启用的坎坷之路**（SM120/SM121/GB10 上的量化损坏与崩溃聚集）。网关层的工作以计费完整性与 Anthropic↔OpenAI↔Responses 协议转换为主，而 Unsloth 释放出一个从微调工具向智能体平台战略性转向的信号。llama.cpp 是当天唯一保持高频发布的项目（6 个标签版本），其他所有项目仅向 `main` 推送了修复。

---

## 2. 活动对比

*计数为今日摘要中提及的事项数（开启 + 已关闭），并非仓库总流量。*

| 项目 | 层级 | Issue（提及） | PR（提及） | 发布状态 |
|---|---|---|---|---|
| **vLLM** | 推理引擎 | ~20 | ~20 | 无；`dsv41-feat` 已合并至 `main`（#56214） |
| **SGLang** | 推理引擎 | ~25（含 8 个已关闭） | ~17 | 无 |
| **llama.cpp** | 本地运行时 | ~13 | ~22 | **6 个版本发布**（b10902–b10907；24 小时内 12 个构建） |
| **Ollama** | 本地运行时 + 云端 | ~16 | ~10 | 无；关键修复已合并但未发布（#18382） |
| **LiteLLM** | 网关 | ~20（含 7 个已关闭） | ~13 | **2 个版本发布**（v1.100.1、v1.102.0-dev.2） |
| **Unsloth** | 微调 / Studio | ~14 | ~16 | 无标签版本；破坏性 Docker `2026.9.4` |
| **Claude Code Router** | 客户端路由器 | ~5 | ~4 | 无（v3.0.22） |
| **CC Switch** | 客户端路由器 | ~26（含 ~10 个已关闭） | ~15 | 无（v3.20.2 存在回归） |
| **New API** | 网关 / 中继 | ~16 | ~12 | 无（`v1.0.0-rc.36`） |

**解读：** llama.cpp 与 CC Switch 修复吞吐量最高；vLLM 与 SGLang 每个 PR 的工程深度最深（内核级、多 GPU 拓扑）；CC Switch 与 New API 相对于自身规模积压了最多的开放待办。

---

## 3. 模型支持竞赛

| 模型家族 | 今日落地情况 | 成熟度信号 |
|---|---|---|
| **DeepSeek-V4/V4.1（DSpark/DFlash）** | vLLM：最深入——纯 KV 上下文插入（#55654、#56441）、PP prefill 目标（#53577）、JIT 预热（#56323）。SGLang：HiSparse、DeepGEMM MegaMoE（#38700）、DeepEP-V2 dispatch。Ollama：仅云端（#18360）。CC Switch：支持视觉的 `deepseek-flash` 目录（#7286） | **vLLM 领先**；但 H20 上的 `dsv4_topk` 崩溃将 `max_num_seqs ≤ 256` 设为上限（#56389） |
| **GLM-5.3-Flash** | vLLM：TP 分片索引器 prefill（#54951）与 3 个开放崩溃缺陷（#54317、#54300、#55434）。SGLang：chat-template/工具调用修复（#38297）、SM120 追踪项（#37813）。llama.cpp：**仅为功能请求**（#27922，15👍）。Ollama：云端推理循环缺陷（#18193） | 今日生态中**需求最高、稳定性最差**的模型 |
| **Qwen3.5/3.8/Next** | vLLM：MTP 位置修复（#55390、#56447）。SGLang：NVFP4 ModelOpt loader（#38569）。llama.cpp：NextN/MTP 重构（#28192）。Ollama/Unsloth/CC Switch：流式、prefill 与路由回归 | 覆盖 **9 个项目中的 6 个**——事实上的兼容性测试套件 |
| **量化格式** | vLLM：FP8-K/NVFP4-V 混合 KV 缓存（#53770）。SGLang：NVFP4 + FP8 PLE/MTP 混合精度 | NVFP4 正逐步确立为 Blackwell 检查点标准 |
| **长尾模型** | llama.cpp：Maple 20B 三值 MoE（#27000）、Ling 3.0 解析器。SGLang：SenseNova-U1 NPU 批处理。vLLM：TeleChat3-YaRN。Unsloth：Ascend NPU RFC（#10772） | llama.cpp 独力吸纳小众 / 中国市场架构 |

**结论：** vLLM 与 SGLang 在前沿模型服务深度上领先；llama.cpp 在硬件 / 架构广度上领先；Ollama 在分发触达（云端 + 消费级）上领先；网关在设计上滞后，仅通过目录与协议转换修复吸纳模型。

---

## 4. 性能前沿

- **KV 缓存压缩** 是最热的内核阵地：vLLM 的 12.5-bit/token FP8-K + NVFP4-V 混合 dtype（#53770），SGLang 的 NVFP4 KV 路线图（#29913），以及 HiCache L2/L3 主机层卸载事件（#38486）。反向信号：llama.cpp 的 4-bit KV 在默认构建下**静默回退至 CPU（约 30 倍降速）**（#28633）。
- **解耦的 P/D 服务**：vLLM 新增 PP prefill 目标与 EPLB 迁移批处理，但 NIXL 在 GB200 上撞上描述符扩展墙（每次传输 91k–120k 个描述符，#55434）——属于控制面瓶颈，而非带宽瓶颈。SGLang 主攻 bootstrap 延迟（#38959）与 DeepEP-V2 prefill dispatch。
- **内核融合**：集中在 AMD——vLLM 的 AITER QuickReduce+RMSNorm 与 DSA 索引器序章（4 个内核 → 1 个）；SGLang 协调推出的 3-PR AMD DSA prefill 系列。llama.cpp 则在 CUDA（Q4_K Gate/Up+SwiGLU）、Vulkan（topk_moe、小 batch matmul）和 HIP（RDNA4 FA）上同时做融合。
- **主机侧 / 调度器**：vLLM 将 causal-conv1d 元数据向量化并对 DeepSeek-V4 去 JIT；SGLang 按 `attn_tp_size` 预算推测解码 KV 池（#38203）；llama.cpp 上线 GDN 分块 prefill（#26001）。
- **显著拖累**：相当比例的"性能"工作实际上是在 Blackwell 变体上做正确性修复（GB10 上 Marlin W4A8-FP8 静默损坏、SM120 上 UE8M0 requant 跳过），吞噬了本可用于吞吐量的精力。

---

## 5. 层级定位

- **推理引擎（vLLM、SGLang）：** 横向扩展的推理——TP/PP/EP 拓扑、解耦、MoE 与稀疏注意力内核。vLLM 面向广度与集群特性做优化（Prometheus NIXL 兼容性仪表盘，#52999）；SGLang 差异化定位在智能体 / 长上下文栈（HiCache、会话感知路由器 #25760）以及非文本模态（diffusion）。
- **本地运行时（llama.cpp、Ollama）：** llama.cpp 是跨厂商的内核基石（CUDA/HIP/Vulkan/SYCL/Metal/OpenCL/CPU-SIMD），其修复会向下游传播；Ollama 在其之上封装（外加现已一等公民的 MLX）面向消费级 UX，并叠加托管云端层——今日关键的云端代理修复（#18382）凸显该层的运维重量。
- **网关（LiteLLM、New API）：** LiteLLM 是企业控制平面（安全、成本归因、护栏——包括一个已关闭的权限提升 #31580 与静默少计费修复 #30383）；New API 是多厂商中继 / 配额平面，仍处 GA 之前（`rc.36`），仍在消化协议转换与 panic 类缺陷。
- **客户端路由器（CCR、CC Switch）：** 编码智能体专属工具，其全部缺陷面都集中在协议转换（Anthropic thinking 块 vs. Responses API reasoning 条目；分割的 assistant 轮次 vs. Chat Completions）——同一类故障在两个项目中独立复现。
- **微调（Unsloth）：** 效率工具（Triton 内核、NVML 探测）加上一个清晰可见的产品转向：Skills、Memory、Agent Builder 与多智能体编排请求，定义了超越 LoRA 训练的平台雄心。

---

## 6. 趋势信号

1. **MTP / 推测解码是生态的头号正确性风险。** vLLM（#55533 并发崩溃）、SGLang（#39072 解耦+推测崩溃）、llama.cpp（请求间污染 #26425；量化目标发散 #25618）、Unsloth 的 GGUF 重载状态丢失（#9037）中均出现独立缺陷。若需要可复现或确定性输出，应将推测解码视为可选而非默认——llama.cpp 在 Q4_K_M 目标上的发散尚未解决。
2. **"静默失败"是各层级的主导缺陷类型**：静默 token 损坏（vLLM Marlin）、静默少计费（LiteLLM #30383）、静默 `tool_calls` 丢弃（Ollama #18357、LiteLLM #40582）、静默 CPU 回退（llama.cpp #28633）、静默丢弃的消费记录。在自研栈中需为显式告警 / 可观测性预留预算。
3. **Blackwell 消费级 / 边缘（SM120/SM121/GB10）是新的不稳定前沿**——其上的量化内核带着正确性缺陷发布，而非仅性能差距。需按 GSKU 逐一验证，而非按架构笼统评估。
4. **智能体负载正在重塑基础设施路线图**：SGLang 的会话感知路由器与分布式 KV 缓存、vLLM 的 prefix-cache 与工具模板修复、Unsloth 的平台转向，以及网关转换器的工具调用合并规则（CC Switch #7280 是参考实现）。
5. **非 CUDA 投入正在加速**，部分由中国市场驱动：ROCm/AITER 融合系列、SenseNova NPU 与 Ascend RFC、TeleChat3，外加 llama.cpp 的 Vulkan/SYCL/OpenCL 广度。
6. **AI 智能体作者提交的贡献正在产生实质性分诊噪声**（New API 明确指出机器人关闭了无效 issue）——预计生态内仓库的信噪比将持续下降。

**运维即时行动：** 在 #18382 发布前将 Ollama 锁至 ≤0.33.1；将 Unsloth Docker 锁在 `2026.9.4` 之前（`max_seq_length` 破坏性变更）；在 H20 上为 DeepSeek-V4.1-Flash 设 `max_num_seqs=256` 上限；避免在 SGLang 上同时启用 GLM-5.3-Flash 的解耦 + DP-attention + 推测；为 vLLM 多节点锁 `ray==2.48.0`；在补丁发布前将 CCR 与 LiteLLM 的成本仪表盘（`max_budget` #40020 仍开放）视为仅供参考。

---

Rules:
- Output ONLY the translation. No preamble, no explanation, no markdown fences around the whole output.
- Preserve the Markdown structure exactly: headings, tables (including column alignment rows), lists, blockquotes, bold/italic, horizontal rules, emoji.
- Keep URLs, link targets, code spans, code blocks, numbers and dates verbatim.
- Keep project names, repository slugs, usernames, version tags, file paths and API/config identifiers in their original form — do not translate them.
- Issue/PR references like #12345 and their link text stay as-is.
- Use natural technical Chinese, the register of a Chinese developer newsletter — not a literal word-for-word rendering.

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-11

## 1. 今日焦点

过去 24 小时主要由 **DeepSeek-V4 / DSpark** 与 **GLM-5.3-Flash** 的性能工作主导,在 `dsv41-feat` 合并后,一批 TP 分片预填充、仅 KV 上下文插入与 PP 目标的 PR 落地或 rebase 至 `main`。稳定性方面,围绕 **DGX Spark (GB10/sm_121) 量化正确性**、**GLM-5.3-Flash 在 4×B200 上的 CUDA 非法内存访问** 与 **DeepSeek-V4.1-Flash 在 H20 上的 dsv4_topk 崩溃** 出现了多个高影响 Bug —— 全部给出了具体的配置级绕过方案。另有一个新的 **SageAttention (SAGE_ATTN) 注意力后端** PR 提交,用于显式的 `--attention-backend` 路由。

## 2. 发布与破坏性变更

过去 24 小时无新发布。值得注意的、影响基线的上游合并:
- `dsv41-feat` 分支已于 2026-09-11 通过 #56214 合并入 `main` —— 为 DSpark/DSv4.1 工作(例如 #56441)打通重提链路。`main` 上的运维人员应当预期 DeepSeek-V4.1-Flash 路径陆续可用。

## 3. 新模型与硬件支持

- **SageAttention 后端 (NVIDIA)** —— PR [#55732](https://github.com/vllm-project/vllm/pull/55732) 将 [SageAttention PR #402](https://github.com/thu-ml/SageAttention/pull/402)(seqlens + paged KV decode)集成为显式的 `--attention-backend SAGE_ATTN` 路径。作者已在栈上验证;需要 rebase。
- **FP8-K / NVFP4-V KV 缓存** —— PR [#53770](https://github.com/vllm-project/vllm/pull/53770) 通过 FlashInfer TRTLLM-Gen 新增紧凑的 `--kv-cache-dtype fp8_k_nvfp4_v`(12.5 bits/token)。全新量化格式,支持零拷贝 K/V 视图。
- **GLM-5.3-Flash 长上下文索引器预填充按 TP 分片** —— PR [#54951](https://github.com/vllm-project/vllm/pull/54951):将稀疏索引器查询行按成本均衡切片划分,并通过 `all_gatherv` 重组。
- **DSpark 在分离式推理中 PP 预填充** —— PR [#53577](https://github.com/vllm-project/vllm/pull/53577) 支持流水线并行的预填充目标(并提供 padded graph batch 安全保障)。
- **TeleChat3-YaRN 合并回标准 YaRN** —— PR [#56446](https://github.com/vllm-project/vllm/pull/56446) 将厂商 rope_type 副本合并回 Transformers 的标准 YaRN 路径,从而复用现有 YaRN 守护逻辑。
- **ROCm/AITER QuickReduce + RMSNorm 融合** —— PR [#48249](https://github.com/vllm-project/vllm/pull/48249) 将融合后的预填充调用走 AITER 的 QR+RMSNorm 融合内核(AITER #4104)。
- **AITER DSA 索引器 prologue 融合** —— PR [#51315](https://github.com/vllm-project/vllm/pull/51315) 用一个融合内核取代原本独立的 4 个索引器内核(K-norm、Q/K RoPE、FP8 量化、K-cache 写入)。

## 4. 性能与优化

- **DSpark 仅 KV 上下文插入 + fused kv_norm** —— PR [#55654](https://github.com/vllm-project/vllm/pull/55654):DSpark 上下文 KV 写入变为 1× KV-only GEMM + 3× 融合的 `kv_norm`+RoPE+quant+insert(此前为 3× Q+KV GEMM + 3× 独立 `kv_norm` + dummy-Q 插入)。
- **DSpark 仅 KV 上下文插入覆盖 V4.1 各缓存格式** —— PR [#56441](https://github.com/vllm-project/vllm/pull/56441)(鉴于 `dsv41-feat` 已合入 `main`,对 #56320 进行重提)。
- **向量化 causal-conv1d metadata 偏移** —— PR [#55469](https://github.com/vllm-project/vllm/pull/55469) 消除 `compute_causal_conv1d_metadata` 中逐序列的 Python `extend(range(...))` 循环;host 侧成本随预填充批量大小下降。
- **ROCm:跳过稀疏预填充 MQA logits 清理** —— PR [#51314](https://github.com/vllm-project/vllm/pull/51314) 向 AITER 传入 `clean_logits=False`,去除每步 FP32 `-inf` 填充。
- **EPLB 拥塞感知的专家迁移批处理** —— PR [#52641](https://github.com/vllm-project/vllm/pull/52641) 按有向 rank pair(对端上限 = 1)合并专家迁移,以限制异步推理期间的并发 NIC 流量。部分缓解 #31671。
- **DSpark JIT 预热迁移(采样 + DFlash)** —— PR [#56323](https://github.com/vllm-project/vllm/pull/56323) 延续 DeepSeek-V4 的去 JIT 化轨道(#49349)。
- **Batch Invariant 性能追踪** —— issue [#27433](https://github.com/vllm-project/vllm/issues/27433)(107 个点赞区活跃度)持续收集按 Thinking Machines 博客思路推进的批次不变性推理后续工作。
- **MLARoPE KV cache cat 融合手动移植** —— issue [#43504](https://github.com/vllm-project/vllm/issues/43504):将 `MLARoPEKVCacheCatFusionPass` 移植为手动融合。
- **TP MoE torch.compile 集合通信优化** —— issue [#29139](https://github.com/vllm-project/vllm/issues/29139) 仍开放:torch.compile 下 MoE 中的序列并行集合通信。
- **CustomOp 清理** —— issue [#19817](https://github.com/vllm-project/vllm/issues/19817),针对 Blackwell/AMD 的 CompilationConfig 默认值。

## 5. 稳定性与回归

**高严重程度(运营影响):**
- **[GLM-5.3-Flash] 4×B200 上 CUDA 非法内存访问** —— issue [#54317](https://github.com/vllm-project/vllm/issues/54317):在 `vllm-openai:glm53-flash-x86_64-cu130`(0.1.dev20051+g487ecf187)上三个互不相关的内核(KDA linear-attention、MHC TileLang、TRT-LLM fused MoE)反复出现。尚无修复 PR。
- **[DeepSeek-V4.1-Flash] 8×H20 高并发下 Triton `dsv4_topk` 非法内存访问** —— issue [#56389](https://github.com/vllm-project/vllm/issues/56389):**设置 `max_num_seqs=256` 可缓解**。今日新发。
- **[GLM-5.3 / GlmMoeDsa] 0.27→0.28+ 在 decode-context-parallel 下回归** —— issue [#54300](https://github.com/vllm-project/vllm/issues/54300):0.28.0 崩溃,0.29.0 在 AMD ROCm 上静默返回随机 token。
- **[Qwen3.8-Flash-Next] 在 2 节点 DGX Spark TP2 上长预填充任务使活跃 decode 饥饿 3–7 分钟** —— issue [#54919](https://github.com/vllm-project/vllm/issues/54919)。
- **[Hybrid GDN + MTP] 调度器在 batch ≥ 4 时仅运行约 3 条并发序列** —— issue [#55533](https://github.com/vllm-project/vllm/issues/55533):Qwen3.5/Qwen3.8 27B 级模型的接收率/吞吐崩溃。
- **0.28.0/0.29.0 启动时主机内存 OOM** —— issue [#54237](https://github.com/vllm-project/vllm/issues/54237):在 Ubuntu 26.04.1 上冻结;0.27.1 正常。
- **[GLM-5.3 P/D on GB200] NIXL 每次 rank 传输提交 91k–120k 个 KV 描述符** —— issue [#55434](https://github.com/vllm-project/vllm/issues/55434):在此负载下 MNNVL/cuda_ipc 反而比 RDMA 更慢(描述符受限,而非带宽受限)。

**中严重程度(正确性):**
- **DGX Spark / sm_121:Marlin W4A8-FP8 静默损坏** —— issue [#49546](https://github.com/vllm-project/vllm/issues/49546):`VLLM_MARLIN_INPUT_DTYPE=fp8` 内核比基线快约 2.5%,却在 temp 0 下输出重复的 `` 循环 —— 强烈的内核级 bug 信号。**在修复前避免在 GB10 上使用 Marlin W4A8-FP8。**
- **DGX Spark / sm_121:Triton 内核缓存过期产生乱码输出** —— issue [#41871](https://github.com/vllm-project/vllm/issues/41871)(已关闭):删除 `~/.triton/cache` 即可恢复。对运维有价值的缓解记录。
- **DGX Spark / sm_121:FP8 MoE 在 Triton `fused_moe` 中崩溃(SM120/RTX PRO 6000 Blackwell)** —— issue [#45101](https://github.com/vllm-project/vllm/issues/45101):`VLLM_MOE_FORCE_MARLIN=1` 未被尊重;出现 "Unsupported lhs dtype fp8e4nv" 断言。
- **DFlash2 + YaRN:相同 1.04M prompt 下前缀缓存零复用** —— issue [#54094](https://github.com/vllm-project/vllm/issues/54094):target-only 复用约 1.039M token;合并路径复用 0。
- **Sleep 模式在 `--mm-encoder-tp-mode data` 下泄漏 HBM** —— issue [#47654](https://github.com/vllm-project/vllm/issues/47654)(已关闭):阻塞多容器 sleep-swap。
- **`VLLM_MEMORY_PROFILER_ESTIMATE_CUDAGRAPHS` 估算内存偏高(挤压 KV 缓存空间)** —— issue [#45178](https://github.com/vllm-project/vllm/issues/45178)(已关闭)。
- **MTP 推测解码破坏思考 token 预算** —— issue [#39573](https://github.com/vllm-project/vllm/issues/39573)(已关闭):关闭 MTP 后行为正常。
- **Mistral3 (HF 格式) 多模态 profiling 失败** —— issue [#50706](https://github.com/vllm-project/vllm/issues/50706)(已关闭)。
- **Ray 执行器在 ray 2.55.1 上失败** —— issue [#45318](https://github.com/vllm-project/vllm/issues/45318):变通方案为固定到 `ray==2.48.0`(与 vLLM 的 CI lockfile 一致)。

**今日落地的修复 PR:**
- PR [#56447](https://github.com/vllm-project/vllm/pull/56447) —— GLM-OCR 在 CUDA graph capture 期间的 MTP 位置掩码。
- PR [#55390](https://github.com/vllm-project/vllm/pull/55390) —— 在 hybrid grouping 路径上按位置标注 MTP draft KV cache 组(Qwen3.5、Qwen3-Next)。
- PR [#56446](https://github.com/vllm-project/vllm/pull/56446) —— TeleChat3-YaRN 合并。
- PR [#56372](https://github.com/vllm-project/vllm/pull/56372) —— Qwen3-VL 按模态作用域化的 `mm_processor_kwargs`(images_kwargs/videos_kwargs)。
- PR [#56017](https://github.com/vllm-project/vllm/pull/56017) —— 在服务未带 chat template 的原始 Qwen3 reranker 时发出警告。
- PR [#55326](https://github.com/vllm-project/vllm/pull/55326) —— 多模态解析器现将一组解码后的 NumPy/PyTorch 帧正确视作单个视频。

## 6. 对应用开发者的意义

- **DGX Spark / GB10 (sm_121) 运维人员:**目前在该硬件上将所有量化路径视为存疑。具体而言:完全避免 `VLLM_MARLIN_INPUT_DTYPE=fp8`(W4A8-FP8);多节点部署固定 `ray==2.48.0`;若重启后看到乱码 token,执行 `rm -rf ~/.triton/cache`。SM120(RTX PRO 6000 Blackwell)上 Triton `fused_moe` 的 FP8 断言仍未关闭。
- **DeepSeek-V4.1-Flash on H20:**在 issue [#56389](https://github.com/vllm-project/vllm/issues/56389) 的 `dsv4_topk` 非法内存访问解决之前,保持 `max_num_seqs ≤ 256`。这是今日 issues 中最具操作性的单一配置开关。
- **GLM-5.3-Flash on B200 / GB200:**存在多个开放的稳定性问题(非法内存访问、P/D 上 NIXL 描述符爆炸)。若你在 GB200 上运行 EPD 分离式推理,在描述符开销被处理前(issue [#55434](https://github.com/vllm-project/vllm/issues/55434)),NIXL/MNNVL 的表现将不及 RDMA。
- **感知滚动升级的路由器:**PR [#52999](https://github.com/vllm-project/vllm/pull/52999) 暴露了一个携带 NIXL 兼容性哈希的 `vllm:nixl_config_info` Prometheus gauge。建议立即接入调度器/路由器,以保证 P/D pod 配对在混合版本部署下仍能正常工作。
- **Qwen3.5/Qwen3.8 hybrid-GDN 上的推测解码:**已知调度器 bug 将 MTP 下的有效并发限制在约 3 条序列(issue [#55533](https://github.com/vllm-project/vllm/issues/55533))。要么关闭 MTP,要么暂缓 hybrid-GDN 部署直至修复落地。
- **值得关注的性能空间:**DSpark 仅 KV 上下文插入(PR [#55654](https://github.com/vllm-project/vllm/pull/55654))与 GLM-5.3 TP 分片索引器预填充(PR [#54951](https://github.com/vllm-project/vllm/pull/54951))均已就绪待合并,直接瞄准长上下文预填充成本 —— 若你服务上述任一模型族,计划在它们合入 `main` 后重新跑一次基准。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 日报 — 2026-09-11

## 今日要点

今天的主线是**面向智能体（agentic）与大上下文工作负载的服务栈扩展**：分布式 KVCache 系统路线图（[#21846](https://github.com/sgl-project/sglang/issues/21846)）仍是点赞数最高的跟踪 issue，而新亮相的轻量级 SessionAware Router（[#25760](https://github.com/sgl-project/sglang/issues/25760)）则推进了 PD 分离（PD-disaggregation）路线图。硬件方面，AMD DSA/AITER prefill 合入了一组三个协同 PR，修复 FP8 KV cache 与元数据复用问题（[#39083](https://github.com/sgl-project/sglang/pull/39083)、[#39085](https://github.com/sgl-project/sglang/pull/39085)、[#39084](https://github.com/sgl-project/sglang/pull/39084)），同时面向 SenseNova-U1 批处理的全新 NPU 跟踪 issue 已开启（[#39076](https://github.com/sgl-project/sglang/pull/39076)）。

## 版本发布与破坏性变更

过去 24 小时没有新版本发布。以下值得关注的行为收紧已合入或正在进行中：

- [#38338](https://github.com/sgl-project/sglang/pull/38338) —— `--default-chat-template-kwargs` 不再优先于按请求传入的 `reasoning_effort`（修复生产环境上报的回归）。
- [#38936](https://github.com/sgl-project/sglang/pull/38936) —— 禁用 TP LM-head all-to-all 的 NCCL graph 缓冲区注册，解决请求突发下纯 DP 解码挂起的问题。
- [#38297](https://github.com/sgl-project/sglang/pull/38297) —— 自动将 GLM-5.3 聊天模板检测为 `glm45/glm47`；此前会被解析成 `deepseek-r1` 并导致工具调用失效（回放中 0/200 成功）。

## 新模型与硬件支持

- **SenseNova-U1/U1.5** —— 已开启功能/性能跟踪 issue（[#37742](https://github.com/sgl-project/sglang/issues/37742)），并伴随 NPU 请求批处理 + 融合去噪（[#39076](https://github.com/sgl-project/sglang/pull/39076)）。
- **SM120 上的 GLM-5.3-Flash**（2× RTX PRO 6000 Blackwell，TP2，W4A16 路由专家，FP8 KV，MTP）—— 集成跟踪 issue [#37813](https://github.com/sgl-project/sglang/issues/37813)。
- **Qwen3.8-Flash-Next-NVFP4** —— 新增 ModelOpt `MIXED_PRECISION`（NVFP4 路由专家 + FP8 PLE n-gram + FP8_BLOCK_SCALES MTP）加载器（[#38569](https://github.com/sgl-project/sglang/pull/38569)）；H20 8 卡上的 FP8 启动 bug 已关闭（[#38793](https://github.com/sgl-project/sglang/issues/38793)）。
- **Qwen4 GB10 / DGX Spark** —— 基于文件的 PLE 卸载，并修复 TP 预取（[#38570](https://github.com/sgl-project/sglang/pull/38570)）。
- **DeepEP-V2 expanded dispatch** —— 更快的 prefill 路径（[#37261](https://github.com/sgl-project/sglang/pull/37261)）。
- **NVSHMEM → 3.7.2** —— 在受限 IB 网络上使用 `NVSHMEM_IB_GID_INDEX` 所必需（[#38769](https://github.com/sgl-project/sglang/issues/38769)）。
- **NVFP4 KV cache** —— 路线图跟踪 issue 有所推进（[#29913](https://github.com/sgl-project/sglang/issues/29913)）。
- Score API 中的 **Setwise 打分** —— 为 SequenceClassification 提供由调用方指定的抽取 token（[#38965](https://github.com/sgl-project/sglang/pull/38965)）。
- 面向 diffusion 的**按角色覆盖注意力后端**（[#35310](https://github.com/sgl-project/sglang/pull/35310)）。
- **FLUX.2** —— 自 #22423 起 `sage_attn` 后端出现回归（白名单排除）；今日上报（[#39070](https://github.com/sgl-project/sglang/issues/39070)）。

## 性能与优化

- **AMD DSA prefill** —— 三个协同 PR 削减内存与 CPU 开销：避免分块 DSA prefill 中页表的大范围扩张（[#39084](https://github.com/sgl-project/sglang/pull/39084)）、修复 AITER 与 FP8 KV 的集成（[#39083](https://github.com/sgl-project/sglang/pull/39083)）、跨层复用 AITER 元数据（[#39085](https://github.com/sgl-project/sglang/pull/39085)）。
- **HiCache UnifiedRadixCache** —— 在 L2/L3 存储预取回填时发布 host-store 事件（[#38486](https://github.com/sgl-project/sglang/pull/38486)）；在 hicache/unified-radix 测试中全面启用 `@rank_consensus`（[#37425](https://github.com/sgl-project/sglang/pull/37425)）。
- **投机解码（Spec decoding）** —— DFLASH/DSPARK draft KV 池现在按 `attn_tp_size` 进行预算分配，修复 DP attention 下 Kimi-K3 的 OOM（[#38203](https://github.com/sgl-project/sglang/pull/38203)）。
- **HiSparse（DeepSeek V4）** —— 修正启动时 full-token 用量虚高的问题（[#30909](https://github.com/sgl-project/sglang/pull/30909)）。
- **DeepGEMM MegaMoE（DSV4）** —— 融合 shared → sparse 专家的功能需求（[#38700](https://github.com/sgl-project/sglang/issues/38700)）。
- **PD 分离 bootstrap** —— 降低共识延迟的 WIP（[#38959](https://github.com/sgl-project/sglang/pull/38959)）。
- **Diffusion** —— 当主机无法缓存已映射层时改用直接 O_DIRECT 读取（[#39022](https://github.com/sgl-project/sglang/pull/39022)）。
- **Triton / radix router** —— 在加载 router bias 之前先等待 PDL 依赖（[#38568](https://github.com/sgl-project/sglang/pull/38568)）。
- **TP 下的约束解码** —— 旨在降低开销的开放功能需求（[#13809](https://github.com/sgl-project/sglang/issues/13809)）。
- **sgl_kernel flash_attn** —— `is_fa3_supported()` 接受 sm_89 但并未附带 sm_89 cubin；`ver` 参数被忽略（Ada 架构存在回归风险，如 RTX 4080 SUPER）（[#38980](https://github.com/sgl-project/sglang/issues/38980)）。

## 稳定性与回归

CI 健康状况（见 [#17050](https://github.com/sgl-project/sglang/issues/17050)，自动更新于 2026-09-11 11:15 UTC）：**2 个损坏、8 个 flaky、989 个近期已修复** —— 总体稳定，但仍有一小部分持续出现的 flaky 用例。CUDA coredump 跟踪 issue（[#26340](https://github.com/sgl-project/sglang/issues/26340)）仍是收集产物最多的跟踪器。

今日新报告的 bug（按可能的波及面排序）：

1. **[Bug, GLM-5.3] disagg decode + dp-attention + spec decode 下崩溃** —— [#39072](https://github.com/sgl-project/sglang/issues/39072)。严重度高：阻塞一套旗舰级服务拓扑；尚无修复 PR。
2. **[Bug, SM120 grouped FP8 DeepGEMM] 权重准备跳过 UE8M0 重量化** —— [#39063](https://github.com/sgl-project/sglang/issues/39063)。在 Blackwell GeForce 上存在正确性风险。
3. **[Bug, 自 #36228 起的回归] `is_musa()` 导致 TorchDynamo 图中断（gb0069）**，使 `tc_piecewise` prefill 的 CUDA graph 捕获失效 —— [#39054](https://github.com/sgl-project/sglang/issues/39054)。由 CP v1 弃用系列改动重新引入。
4. **[Bug, FLUX.2 + sage_attn] 自 #22423 起回归** —— 模型白名单排除了 `SAGE_ATTN` —— [#39070](https://github.com/sgl-project/sglang/issues/39070)。
5. **[Bug, encoder-decoder KV cache] `page_size > 1` 时共享边界页被双重释放** —— [#38840](https://github.com/sgl-project/sglang/issues/38840)。内存安全 bug，亟需紧急排查定级。
6. **[Bug, 多模态处理器] 致命查找错误未包含处理器导入失败信息**，掩盖了根因 —— [#39073](https://github.com/sgl-project/sglang/issues/39073)。
7. **[Bug] 当某前缀在主机层逐出后仅以备份桩（backuped stubs）形式存留时，`UnifiedRadixCache` 从不查询 L3** —— [#38452](https://github.com/sgl-project/sglang/issues/38452)。HiCache 预取路径的功能性回归。

自昨日以来已关闭（不活跃）—— 这些要么已被自动轮换，要么很快得到解决：
- Stop 正则尾部缓冲区边界对单字符否定字符类处理不当（[#30932](https://github.com/sgl-project/sglang/issues/30932)）
- `minilb` 缺少 `abort_request` 代理（[#30955](https://github.com/sgl-project/sglang/issues/30955)）
- PD 分离的 reasoning 用量统计缺少交接 token（[#32897](https://github.com/sgl-project/sglang/issues/32897)）
- 大写 `--log-level`（如 `WARN`）导致 HTTP 服务器挂起（[#30353](https://github.com/sgl-project/sglang/issues/32897)）
- top-k 非有限值时的采样掩码（[#35765](https://github.com/sgl-project/sglang/issues/35765)）
- Step3-VL / DeepSeek-OCR2 配合 GPU tensor 解码的 JPEG 路径（[#24699](https://github.com/sgl-project/sglang/issues/24699)）
- 传入 token id 时 `TokenizerManager` 上报已删除状态（[#15486](https://github.com/sgl-project/sglang/issues/15486)）
- 无 CUDA 构建请求（[#30931](https://github.com/sgl-project/sglang/issues/30931)）

CI/基础设施方面的跟踪 issue 亦有更新：AMD PR 测试失败跟踪器（[#37451](https://github.com/sgl-project/sglang/issues/37451)）。

## 对应用开发者意味着什么

- **生产稳定性是今天的头号风险。** 如果你以 PD 分离 + DP-attention + 投机解码方式部署 GLM-5.3，在 [#39072](https://github.com/sgl-project/sglang/issues/39072) 修复之前**请勿升级**；在 Blackwell GeForce / SM120 grouped-FP8 路径上，请在 [#39063](https://github.com/sgl-project/sglang/issues/39063) 解决之前锁定（pin）一个构建版本。
- **CUDA graph 捕获可能静默失效。** `is_musa()` 引发的 TorchDynamo 图中断（[#39054](https://github.com/sgl-project/sglang/issues/39054)）意味着 `tc_piecewise` prefill 捕获在当前 `main` 上已不可用 —— 如果你依赖图捕获来压低 prefill 延迟，请停留在 `b6c31b155c` 之前的提交上，或自行 vendor 修复补丁。
- **得益于 [#38297](https://github.com/sgl-project/sglang/pull/38297)，GLM-5.3 的工具调用现在已可靠** —— 自动检测现在会选择正确的 `glm45/glm47` 解析器，升级后那种静默的 0/N 工具调用失败应当消失。
- **智能体 / 长上下文部署**应关注分布式 KVCache 系统路线图（[#21846](https://github.com/sgl-project/sglang/issues/21846)）和 HiCache 的 L2/L3 事件通道（[#38486](https://github.com/sgl-project/sglang/pull/38486)）—— 它们将定义前缀密集型 agent 轨迹的下一层缓存卸载与可观测能力。
- **NVFP4 + ModelOpt MIXED_PRECISION** 现已通过 [#38569](https://github.com/sgl-project/sglang/pull/38569) 成为一等公民；预计 Qwen3.8-Flash-Next-NVFP4 将成为 Blackwell 级硬件上的推荐 checkpoint。
- **InfiniBand 运维人员**：请在 [#38769](https://github.com/sgl-project/sglang/issues/38769) 落地后计划捆绑 NVSHMEM 3.7.2 —— 许多受限 IB 网络都要求固定 GID index。
- **Score API** 新增 setwise 抽取（[#38965](https://github.com/sgl-project/sglang/pull/38965)）—— 对于希望在每个分隔符 token 处读取 head 输出、而非仅在最后位置读取的 rerank 流水线非常有用。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-11

## 今日要点

今天是关于推测解码（speculative decoding）与 MTP（多 Token 预测，Multi-Token Prediction）修复的密集工作日。团队发布了六个版本（b10902–b10907），修复了 DeepSeek2/GLM4MoE/Cohere2MoE MTP 层的分配问题，修复了图像输入后服务端推测位置追踪的问题，并完成了一波针对 RDNA4（gfx1201）的 AMD HIP Flash Attention 调优。Vulkan 与 SYCL 的稳定性工作在并行推进，包括新的 SYCL graph record/replay 移植以及 Vulkan topk_moe prefill fusion。

## 版本发布与破坏性变更

过去 24 小时内共发布了十二个构建。用户可见的版本如下：

- **[b10907](https://github.com/ggml-org/llama.cpp/releases/tag/b10907)** — `model`：修复 DeepSeek2、GLM4MoE、Cohere2MoE 的 MTP context KV cache 分配（#28626/#28630）。增加反向架构门控（inverse-architecture gating）并为 MTP 层过滤器补充了完整的架构测试。**实际影响：**在多请求工作负载中为这些 MoE MTP 模型提供服务时，状态隔离将更加干净。
- **[b10906](https://github.com/ggml-org/llama.cpp/releases/tag/b10906)** — `server`：修复图像后的推测问题（#28715）。在图像 token 之后将真实位置（而非 token 计数）传递给 drafter；将草稿中的 `n_past` 重命名为 `pos0`。修复了针对 DFlash 报告的视觉模型吞吐回归，预计会影响所有推测 drafter。
- **[b10905](https://github.com/ggml-org/llama.cpp/releases/tag/b10905)** — gfx1201 (RDNA4) 的 HIP Flash Attention 调优（#28102）：为 head size 256 启用 MMA FA，在 AMD WMMA 上优先选择 whole-tile FA 网格而非 stream-k，并修订了 stream-k 逻辑。
- **[b10903](https://github.com/ggml-org/llama.cpp/releases/tag/b10903)** — Vulkan：修复 `argsort(large)` 中的数据竞争与越界访问（#28705）；由 VVL 暴露。
- **[b10902](https://github.com/ggml-org/llama.cpp/releases/tag/b10902)** — OpenCL：新增 A8 Q4_0 mm 二进制 kernel（#28268）。
- **[b10900](https://github.com/ggml-org/llama.cpp/releases/tag/b10900)** — Vulkan：启用 `add_alloc_dep` 以在 prefill 阶段解锁 topk_moe fusion（#28422）。
- **[b10899](https://github.com/ggml-org/llama.cpp/releases/tag/b10899)** — Vulkan：面向 Qwen 的小 M 矩阵乘法优化（#28457）；coopmat2 的小/中 tile 选择现在取决于 M，而不仅仅是 N。
- **[b10897](https://github.com/ggml-org/llama.cpp/releases/tag/b10897)** — CI：Windows-on-ARM CUDA 构建从 13.4 dev preview 切换至 13.4.1 GA redistributable（#28687）。

未引入任何弃用项或 CLI 破坏性变更。

## 新增模型与硬件支持

- **Maple 20B-A1B (DeepGrove ternary MoE)** — 初始 CPU 架构 PR 已开放：[#27000](https://github.com/ggml-org/llama.cpp/pull/27000)。24 层、256 专家 / 8 激活、采用 SWA-512 3:1 交错与全局注意力、通过 TQ1_0/TQ2_0 实现的三元权重。
- **Ling 3.0 (Bailing V3)** — 专用的 chat parser PR [#28682](https://github.com/ggml-org/llama.cpp/pull/28682)，用于处理预先打开的 ``。
- **GLM5.3 (flash)** — 功能请求 [#27922](https://github.com/ggml-org/llama.cpp/issues/27922)（15 👍，趋势上升中）。
- **Qwen NextN/MTP 重构** — [#28192](https://github.com/ggml-org/llama.cpp/pull/28192) 将 `LLM_KV_NEXTN_PREDICT_LAYERS` 的加载从通用 `llama_model_base::load_hparams` 路径移至 Qwen3.5、Qwen3.5 MoE 和 Qwen3-Next 架构处理器。
- **Metal/MoE** — PR [#28301](https://github.com/ggml-org/llama.cpp/pull/28301) 让 `kernel_mul_mm_id` 跳过 token tile 的空白一半，并以 `uint32` 形式加载 iq2/iq3 codebook。
- **CPU/SIMD** — s390x Q4_0 repack（[#28667](https://github.com/ggml-org/llama.cpp/pull/28667)）合入：相较于普通点积，prompt 处理约 1.60×、token 生成约 1.10×。面向 Bonsai LLM 的 ARM Q1_0 4×4 与 4×8 NEON/DP/I8MM repack kernel（[#23492](https://github.com/ggml-org/llama.cpp/pull/23492)）。
- **SYCL graph record/replay** — CUDA graphs 的移植版（[#28725](https://github.com/ggml-org/llama.cpp/pull/28725)）。

## 性能与优化

- **CUDA GDN chunked prefill** — [#26001](https://github.com/ggml-org/llama.cpp/pull/26001) 为 Gated Delta Net 算子新增 chunked 模式；在 ≥128 token 时相比逐 token 循环 kernel 带来显著的 prefill 加速。
- **CUDA Q4_K 融合 Gate/Up + SwiGLU prefill** — [#28702](https://github.com/ggml-org/llama.cpp/pull/28702)：一次 Q8_1 量化扫描、单融合 kernel 处理两个投影，SwiGLU 在完整 K 规约之后执行。消除了重复的激活量化与 FP32 来回转换。
- **HIP Flash Attention (RDNA4 / gfx1201)** — [#28102](https://github.com/ggml-org/llama.cpp/pull/28102)：为 head size 256 启用 MMA FA，在 AMD WMMA 上优先选择 whole-tile 网格而非 stream-k，并修订了 stream-k 逻辑。由 AI 辅助完成（Claude + Codex）。
- **Vulkan topk_moe prefill fusion** — `add_alloc_dep` 衔接工作（[#28422](https://github.com/ggml-org/llama.cpp/pull/28422)）打通 Vulkan 上 MoE prefill fusion 路径。
- **Vulkan 小 M 矩阵乘法** — [#28457](https://github.com/ggml-org/llama.cpp/pull/28457)：`m=1` mul_mat 切换、小 M 允许 split_k、coopmat2 引入 M 感知的 tile 选择。面向 Qwen 的 prefill/decode 路径。
- **Vulkan 异步 tensor 复制的 CPU 写操作** — [#28618](https://github.com/ggml-org/llama.cpp/pull/28618)：在 Vulkan 上下文空闲时使用 CPU 写，减少 GPU 同步开销。
- **Vulkan 稀疏 Flash Attention** — [#28105](https://github.com/ggml-org/llama.cpp/pull/28105)（与 ggml PR #27970 配套）。
- **CPU Kronecker 积** — [#28490](https://github.com/ggml-org/llama.cpp/pull/28490)：支持非 2 的幂次维度；清理 SYCL 测试的特殊处理。

## 稳定性与回归

按严重程度排序。★ 表示已有修复 PR。

- ★ **Qwen3.6-35B-A3B-MTP 上的 MTP 跨请求状态污染** — [#26425](https://github.com/ggml-org/llama.cpp/issues/26425)。先前请求残留于 MTP 缓冲中的状态会导致非确定性输出与质量退化。相关的 KV-cache 分配修复已合入 b10907。
- ★ **`--split-mode tensor` 下 MTP CUDA 卡死** — [#27122](https://github.com/ggml-org/llama.cpp/issues/27122)（RTX 5070TI + RTX 3060TI，Qwen3.8-27B）。可复现；[#28192](https://github.com/ggml-org/llama.cpp/pull/28192) 触及了同一 Qwen NextN/MTP 家族。
- ★ **量化目标上的推测解码发散** — [#25618](https://github.com/ggml-org/llama.cpp/issues/25618)（23 条评论）。Q4_K_M 目标上的 greedy sampling + draft-mtp / draft-dspark 会产生与非推测运行不同的文本；bf16 结果一致。同目标的 ngram 推测不受影响。**对于任何需要可复现输出的应用都属于高严重性问题。**
- ★ **图像输入后服务端推测位置 bug** — [#28715](https://github.com/ggml-org/llama.cpp/pull/28715) 修复了视觉输入吞吐回归（已合入 b10906）。
- **Intel B70 上 Vulkan 在 MoE (Qwen3.6-35B-A3B-MTP) 时崩溃** — [#23769](https://github.com/ggml-org/llama.cpp/issues/23769)（已停滞，11 条评论）。
- **Intel Arc 140V (Windows) 上 Vulkan 输出乱码** — [#28648](https://github.com/ggml-org/llama.cpp/issues/28648)，与 batch 设置相关；在 b10831–b10865 区间内可复现。
- **Intel B70 Linux 上 Vulkan 验证错误 VUID-10167** — [#28590](https://github.com/ggml-org/llama.cpp/issues/28590)；cooperative-matrix flexible-dimensions 违规。
- **gfx1151 (Strix Halo, HIP, Windows) 上 Gemma4 无限生成** — [#26239](https://github.com/ggml-org/llama.cpp/issues/26239)；`<unused49>` token 在长 prompt 下导致输出失控。
- **DGX Spark (SM121) 上 qwen4exp graph-builder 中止** — [#27780](https://github.com/ggml-org/llama.cpp/issues/27780)；持续负载下触发 `ggml_abort`。
- ★ **SYCL oneDNN scratchpad 池顺序崩溃** — [#28660](https://github.com/ggml-org/llama.cpp/issues/28660)，出现在 Intel Arc Pro B70；修复 PR [#28704](https://github.com/ggml-org/llama.cpp/pull/28704) 在每次 `gemm` 调用时重新分配 scratchpad。
- **OpenVINO NPU 完全不可用** — [#28726](https://github.com/ggml-org/llama.cpp/issues/28726)（Core Ultra 7 265K，Windows 11 25H2）；GPU/CPU 路径同样失败。属于新回归，值得标记。
- **CUDA + Volta (sm_70) Qwen3-Embedding-8B NaN 卡死** — [#26044](https://github.com/ggml-org/llama.cpp/issues/26044)；某些输入返回全 NaN embedding 并永久卡死服务；CPU 路径结果正确。非近期回归——若仍服务于 Volta 请标记。
- **CUDA 对 4-bit KV cache 的静默 CPU 回退** — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633)。使用默认 flag 时，q4_0/q4_1 KV 会静默地将 prefill 退回 CPU（约 30× 减速）且无任何警告；提议将 `GGML_CUDA_FA_ALL_QUANTS=ON` 改为默认开启。
- **`` 探测器匹配字面字符串而非特殊 token；若将推理与内容分离，请对下游做校验。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-11

## 今日要点

最值得关注的故事是 **0.34.0 上严重的云端稳定性回退**：`*:cloud` 模型在持续流量下运行约 45 分钟后会卡死，返回 502 且没有上游错误（[#18381](https://github.com/ollama/ollama/issues/18381)）。修复已合并（[#18382](https://github.com/ollama/ollama/pull/18382)），为云代理的连接/TTFB 超时设定了上限 —— 运维人员应留意下一个补丁版本。平台方面，长期推进的 **MLX 作为一等后端** 工作正在整合：服务端 MLX 导入并附带 GGUF 转换的功能被移除（[#14969](https://github.com/ollama/ollama/pull/14969)），MLX 版本升级（[#18235](https://github.com/ollama/ollama/pull/18235)），以及三项内存/正确性修复落地（[#18327](https://github.com/ollama/ollama/pull/18327)、[#18345](https://github.com/ollama/ollama/pull/18345)、[#18353](https://github.com/ollama/ollama/pull/18353)）。

## 发布与重大变更

*过去 24 小时无新标签发布。* main 分支上合并的几项行为级变更值得在升级规划时留意：

- **云代理现使用有界的连接 + TTFB 超时**（[#18382](https://github.com/ollama/ollama/pull/18382)）——长时间挂起的云请求现在会返回错误，而不再卡住 runner。
- **云流式失败会传递给客户端**（[#18351](https://github.com/ollama/ollama/pull/18351)）——部分上游失败不再以正常的 `done:true` 结束形式出现（修复 [#18193](https://github.com/ollama/ollama/issues/18193)）。
- **原生 `/api/generate` 现正确分离推理内容与可见文本**，适用于没有 Go 分隔符的具备思考能力的 Jinja 模板（[#18300](https://github.com/ollama/ollama/pull/18300)）。
- **MLX 数组生命周期重构**（[#18327](https://github.com/ollama/ollama/pull/18327)）：前缀缓存淘汰路径现在会释放此前一直泄漏到 OOM 的快照。
- **重复 token 截断阈值提升至 100**；超出范围现返回错误而非截断输出（[#18374](https://github.com/ollama/ollama/pull/18374)）。

## 新增模型与硬件支持

- **DeepSeek-V4.1-Flash cloud** 请求被快速合并/关闭（[#18360](https://github.com/ollama/ollama/issues/18360)），社区呼声很高（27 👍）；可下载版本仍在等待中（[#18379](https://github.com/ollama/ollama/issues/18379)）。
- **`glm-5.3:cloud`** 在 bug 追踪器中出现，存在无限推理循环回退问题，而在上游 Z.AI API 上未出现该问题（[#18193](https://github.com/ollama/ollama/issues/18193)）。
- **`qwen3.8` 系列** 在长工具调用循环下存在聊天流式回退问题（[#17778](https://github.com/ollama/ollama/issues/17778)，25 👍，26 条评论 —— 信号很强）。
- **Vulkan ggml 后端** 在 AMD Strix Halo UMA APU 上的问题开始被报告（[#18370](https://github.com/ollama/ollama/issues/18370)）—— 对无 ROCm 的 AMD 用户值得关注。
- **GGUF 元数据统一为单一磁盘缓存**（[#17858](https://github.com/ollama/ollama/pull/17858)）—— `/api/show` 与 `/api/tags` 能力不一致的问题（例如 [#16969](https://github.com/ollama/ollama/issues/16969)）应已解决。

## 性能与优化

- **云代理**：通过 `http.Client` 对连接和 TTFB 超时设定显式上限（[#18382](https://github.com/ollama/ollama/pull/18382)）—— 消除了无限挂起，但尚未公布延迟数据。
- **MLX 内存路径** 通过三个合并的 PR 得到实质性改善：
  - [#18345](https://github.com/ollama/ollama/pull/18345) —— 预加载时的空闲内存检查会等待被淘汰的 runner，避免 Metal OOM 级联。
  - [#18353](https://github.com/ollama/ollama/pull/18353) —— 前缀缓存现主动从当前会话中淘汰，而非固定保留。
  - [#18327](https://github.com/ollama/ollama/pull/18327) —— 限定作用域的数组生命周期取代基于扫描的 GC；前缀缓存长路径淘汰不再泄漏。
- **GGUF 元数据缓存**（[#17858](https://github.com/ollama/ollama/pull/17858)）消除了冗余的元数据提取 —— 对加载大量 GGUF blob 的模型有意义。
- **报告的回退**：GPT-OSS:120b 模型加载在 0.23.4 到 0.30.0 之间出现显著回退（[#18373](https://github.com/ollama/ollama/issues/18373)）；尚未公布具体倍数。

## 稳定性与回退（按严重程度排序）

| 严重程度 | 条目 | 状态 |
|---|---|---|
| **严重** | [Issue #18381](https://github.com/ollama/ollama/issues/18381) —— 0.34.0 上 `*:cloud` 在约 45 分钟后卡死，502 无错误；0.33.1 不受影响。 | **修复已合并**（[#18382](https://github.com/ollama/ollama/pull/18382)） |
| **高** | [Issue #18370](https://github.com/ollama/ollama/issues/18370) —— Vulkan ggml 后端上 runner 无限卡死（AMD Strix Halo UMA），单线程 100% CPU，GPU 空闲。 | 开放，暂无修复 |
| **高** | [Issue #18369](https://github.com/ollama/ollama/issues/18369) —— `qwen2.5vl:3b` 在特定 640×360 JPEG 上确定性失败，报 `Unexpected empty grammar stack`，仅 GPU 触发。 | 开放 |
| **高** | [Issue #18252](https://github.com/ollama/ollama/issues/18252) —— 官方 `qwen2.5-coder:3b-instruct` 资源在 q2_K/q3_K_S/q3_K_M/q3_K_L 量化下功能任务得分 0/15；同系列其他量化正常。 | 开放 —— 请将这些量化视为已损坏 |
| **中** | [Issue #17778](https://github.com/ollama/ollama/issues/17778) —— `qwen 3.8` 在 205k 上下文的长工具调用循环中，聊天流式返回 500 "no user query found in messages"。 | 开放，社区关注度高 |
| **中** | [Issue #18373](https://github.com/ollama/ollama/issues/18373) —— 0.23.4 到 0.30.0 之间显著的模型加载回退。 | 开放 |
| **中** | [Issue #18368](https://github.com/ollama/ollama/issues/18368) —— macOS GUI 在约 6k token 后静默失败且无提示（M4 Pro，0.34.0，128k 上下文）。 | 开放 |
| **中** | [Issue #18359](https://github.com/ollama/ollama/issues/18359) —— 原生 `/api/chat` 在 `gemma4:12b` 上发出重复的 `<unused50>` 帧，并以 HTTP 200 EOF 结束但无 `done:true`。 | 开放 |
| **低** | [Issue #18346](https://github.com/ollama/ollama/issues/18346) —— Anthropic `/v1/messages` 代理将复杂工具 schema 作为字面文本发出，而非 `tool_use` 块。 | 开放 |
| **低** | [Issue #18357](https://github.com/ollama/ollama/issues/18357) —— `gemma3n` 变体原生发出 `<tool_call>`，但 OpenAI 兼容代理同时丢弃 `tool_calls` 和内容。 | 开放 |
| **低** | [Issue #18375](https://github.com/ollama/ollama/issues/18375) —— `/api/codex/v1/responses` 返回 502（ChatGPT 应用侧问题）。 | 开放 |
| **低（已撤回）** | [Issue #18344](https://github.com/ollama/ollama/issues/18344) —— 最初报告每个 `/api/generate` 存在 FD 泄漏；报告者在修正方法论后撤回该说法。 | 已关闭（撤回） |

## 对应用开发者的影响

- **如果你在服务长生命周期的云流量**，请固定在 **0.33.1**，直到发布包含 [#18382](https://github.com/ollama/ollama/pull/18382) 的版本；否则请求将在约 45 分钟后静默卡死。
- **避免使用官方 `qwen2.5-coder:3b-instruct` 的 q2_K、q3_K_S、q3_K_M、q3_K_L 量化**（[#18252](https://github.com/ollama/ollama/issues/18252)）—— 它们会输出流畅但无法运行的代码。请使用更高比特位的版本，或在部署前运行冒烟测试套件。
- **针对 Anthropic 兼容代理的工具 schema 必须保持简单/扁平**（[#18346](https://github.com/ollama/ollama/issues/18346)）；嵌套 `$defs`/递归很可能会回退为字面文本输出，导致 Claude Code 等客户端不可用。
- **Gemma3n 和 Gemma4 的工具调用客户端** 暂不应依赖 OpenAI 兼容代理 —— 解析后的 `tool_calls` 可能会被静默丢弃（[#18357](https://github.com/ollama/ollama/issues/18357)），且原生端点可能在流中途 EOF（[#18359](https://github.com/ollama/ollama/issues/18359)）。
- **Apple Silicon 上的 MLX** 现在运行起来明显更安全：三个合并的 PR（[#18327](https://github.com/ollama/ollama/pull/18327)、[#18345](https://github.com/ollama/ollama/pull/18345)、[#18353](https://github.com/ollama/ollama/pull/18353)）关闭了长期存在的 OOM/泄漏路径，服务端 safetensors 导入也正在落地（[#14969](https://github.com/ollama/ollama/pull/14969)）—— 新模型创建时，GGUF 包装正在被有意降低优先级。
- **得益于统一的元数据缓存**（[#17858](https://github.com/ollama/ollama/pull/17858)），`/api/show` 的能力上报现在应在各端点间保持一致；基于能力标志条件启用工具/思考功能的工具链应重新验证。
- **云端 SDK 错误现在可见**：[#18351](https://github.com/ollama/ollama/pull/18351) 意味着上游停滞会产生真实的客户端错误，而不是提前的 `done:true` —— 请相应更新重试/超时逻辑。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-11

## 今日要点

今天是 LiteLLM 的"安全与计费"主题日：`team.model_aliases` 中的团队级权限提升问题已关闭 (#31580)，仪表盘注册的部署带来的、难以察觉的静默少计费 bug 已修复 (#30383)，大型 PostgreSQL 部署上"永远卡死"的终端用户预算重置问题已解决 (#40639 → #40564)。功能方面，ChatGPT OAuth 增加了 Codex 图像编辑 + 结构化审查 + 实时 (#40366)，Model Armor 新增了 `logging_only` 模式，消除了流式扫描的缓冲延迟 (#40702)。

## 版本发布与破坏性变更

- **v1.102.0-dev.2** 已发布 ([release](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.2)) — 所有镜像均经 cosign 签名。
- **v1.100.1** 已发布 ([release](https://github.com/BerriAI/litellm/releases/tag/v1.100.1)) — 经 cosign 签名。
- **破坏性变更（下一版本生效）：** `/v1/messages` 现在返回 Anthropic 格式的错误信封，以便在 Anthropic SDK 客户端中切换 `error.error.type` — PR [#30385](https://github.com/BerriAI/litellm/pull/30385)。
- 与 Trivy 相关的 PyPI 供应链事件（v1.82.7 + v1.82.8）仍处于**已控制**状态；受影响版本已下架。参见 [#24518](https://github.com/BerriAI/litellm/issues/24518) 及 [Security Townhall](https://docs.litellm.ai/blog/security-townhall-updates)。

## 新模型与硬件支持

- **ChatGPT / Codex OAuth**：图像编辑、结构化审查 JSON Schema 强制执行、语音实时（sideband + multipart）— PR [#40366](https://github.com/BerriAI/litellm/pull/40366)。
- **Ollama**：流式工具调用修复 — 工具 JSON 不再泄漏到 `delta.content`；`delta.tool_calls` 与 `finish_reason="tool_calls"` 现可正确生成 ([#36341](https://github.com/BerriAI/litellm/pull/36341))。
- **Vertex AI Gemini**：`generate_content` 路径现在记录 `vertex_location`，以便在成本计算器中应用区域价格上浮 — PR [#40712](https://github.com/BerriAI/litellm/pull/40712)，修复 [#40692](https://github.com/BerriAI/litellm/issues/40692)。
- **Guardrails**：新增一站式 **Spanda** 纯 CPU 不确定性量化与模式坍缩护栏（无需外部 judge/embedding 调用；目标低于 50 ms）— PR [#40384](https://github.com/BerriAI/litellm/pull/40384)。
- **NVIDIA NeMo Guardrails** 集成仍以功能请求形式开放 ([#25255](https://github.com/BerriAI/litellm/issues/25255))。

## 性能与优化

- **延迟加载的 provider 直通路由** — `/bedrock/*`、`/mistral/*` 等不再在启动时注册，当这些路径未被使用时，消除了每个请求上的顺序路由表匹配开销 — PR [#40691](https://github.com/BerriAI/litellm/pull/40691)。
- **为用户 key 设立独立的内存缓存分区** — key 不再与团队/终端用户/标签/成员关系共用 200 容量的 `UserApiKeyCache`，因此这些对象的变更不会再驱逐热 key 而强制查库 — PR [#40713](https://github.com/BerriAI/litellm/pull/40713)。
- **测试套件可靠性** — 五个不稳定的测试已固定为确定性 fixture（Redis `sys.modules` 泄漏、LangSmith init loop 补丁、wall-clock 间隔断言、fake-prisma 僵尸孙进程检查、pgbouncer 就绪预算）— PR [#39895](https://github.com/BerriAI/litellm/pull/39895)。
- **后台健康检查 OOM 风暴** — `SharedHealthCheckManager` 不再在每一轮向所有 worker 推送无界的 `LiteLLM_HealthCheckTable` 全量内容；DB 持久化现改为 leader 门控 ([#37611](https://github.com/BerriAI/litellm/issues/37611)，已关闭）。

## 稳定性与回归

| 严重程度 | 问题 | 状态 |
|---|---|---|
|  高 — **安全** | `team.model_aliases` 绕过 `key.models` 白名单 ([#31580](https://github.com/BerriAI/litellm/pull/31580)) | 已修复并合并 |
| 🟠 高 — **静默少计费** | 仪表盘注册的部署缺少 cost 字段；缓存密集流量被少计 ([#30383](https://github.com/BerriAI/litellm/pull/30383)) | 已修复并合并 |
|  高 — **静默成本错计** | `litellm_settings.max_budget` 触发一个永不重置的进程级 `_current_cost` 上限 ([#40020](https://github.com/BerriAI/litellm/issues/40020)) | 未解决 |
| 🟠 高 — **预算重置死锁** | `_reset_expired_budget_cascade` 超出 PostgreSQL 的 32 767 绑定变量上限；客户被永久阻塞 ([#40564](https://github.com/BerriAI/litellm/issues/40564)) | 已通过 [#40639](https://github.com/BerriAI/litellm/pull/40639) 修复（按预算链接而非用户 id 重置） |
|  中 — **工具调用丢弃** | `parse_tool_call_arguments` 静默丢弃拼接 JSON 的 MCP 工具调用；辅助函数 `split_concatenated_json_objects` 已存在但未被调用 ([#40582](https://github.com/BerriAI/litellm/issues/40582)) | 未解决（1.101.0） |
| 🟡 中 — **花费日志丢失** | 复用的 `x-litellm-call-id` 静默丢弃 spend-log 行 ([#35563](https://github.com/BerriAI/litellm/issues/35563)) | 未解决 |
|  中 — **流式 TTFT** | 直通流式将 `completionStartTime` 折叠到 `endTime`，影响 SpendLogs ([#30384](https://github.com/BerriAI/litellm/pull/30384)) | 已修复并合并 |
|  中 — **网关 bug** | 原生 MCP `/mcp` 将 `SERVER_ROOT_PATH` 前缀误判为作用域服务器名称，返回 0 个工具 ([#32142](https://github.com/BerriAI/litellm/issues/32142)) | 未解决 |
| 🟡 中 — **认证/可观测性** | `/cursor/chat/completions` 返回 200 且向 provider 计费，但未创建 SpendLog 条目（1.88.1）([#30126](https://github.com/BerriAI/litellm/issues/30126)) | 未解决 |
|  低 — **可观测性** | 升级到 1.88.0 后 `/metrics` 因 307 重定向而返回空 ([#30079](https://github.com/BerriAI/litellm/issues/30079)) | 未解决 |
|  低 — **成本计算** | VLLM `cached_tokens` 在 token 成本计算器中未被处理 ([#22984](https://github.com/BerriAI/litellm/issues/22984)) | 未解决 |
|  低 — **router** | 提示缓存亲和性 TTL 硬编码为 5 分钟 — 破坏 1 小时临时缓存路由 ([#28427](https://github.com/BerriAI/litellm/issues/28427)) | 未解决 |

一并关闭的还有：MCP OAuth `authorization_url`/`token_url` 传递 ([#20495](https://github.com/BerriAI/litellm/issues/20495))、通过 openai-agents SDK 的 GPT-5.4 工具调用 + `reasoning_effort` ([#23156](https://github.com/BerriAI/litellm/issues/23156))、音频转录的说话人 diarize 坍缩 ([#29766](https://github.com/BerriAI/litellm/issues/29766))、OTel part-key 归一化 ([#29756](https://github.com/BerriAI/litellm/issues/29756))、日志格式化器中的硬编码 ANSI 转义码 ([#29799](https://github.com/BerriAI/litellm/issues/29799))、仪表盘日志标签过滤 ([#23559](https://github.com/BerriAI/litellm/issues/23559))、CUR 2.0 的 Bedrock 会话标签 ([#34069](https://github.com/BerriAI/litellm/issues/34069))。

## 对应用开发者的意义

- **锁定版本并校验。** 如果你正在使用 v1.82.7 或 v1.82.8，请立即升级并通过 `cosign verify` 校验镜像。确认你没有拉取到被篡改的包。
- **审视你的白名单逻辑。** 如果你使用 `team.model_aliases` 暴露精选模型名称，请升级到包含 #31580 的构建 — 否则 key 可能会触达其自身白名单之外的模型。
- **核对缓存密集型支出。** 如果你通过 `/model/new` 仪表盘表单（或 DB 加载）注册部署，请检查你的成本数据是否与上游账单一致 — 它们此前可能被少计。#30383 回填了规范条目。
- **为 Anthropic 错误信封变更 (#30385) 做好准备。** 如果你的代码检查 `/v1/messages` 返回的 `error.type`，其形状现在将与 Anthropic 规范完全一致 — 这通常是件好事，但若你曾做过转接层，则属于破坏性变更。
- **Model Armor 用户：** 新增的 `mode: logging_only` 允许你在保持内容流向客户端的同时仍捕获扫描结果用于审计 — 如果你的延迟预算无法承受整流扫描等待，这一点很重要。
- **Ollama + 工具 + 流式** 现已端到端可用 (#36341) — 请重新测试任何此前在 `delta.content` 中悄悄收到 JSON 的 agent 流程。
- **关注未解决的预算上限 bug (#40020)：** `litellm_settings.max_budget` 目前会安装一个永不重置的进程级成本上限；在修复之前，请勿将其作为硬性上限依赖。
- **运维断点得到尊重 (#40686)：** 显式的 `cache_control` 注入点不再被自动标记擦除 — 如果你此前依赖旧的覆盖行为，请重新测试你的提示缓存命中率。
- **成本归属：** `vertex_location` 现在在 Gemini `generate_content` 路径上保持一致传递 (#40712)，因此 Gemini 区域定价将真实反映你所部署的区域。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-11

## 今日要点

Studio 产品线正大力向 **agentic 平台** 方向转型：一波集中的功能请求（Skills、persistent Memory、Agent Builder、Multi-agent orchestration、Model routing）勾勒出了一个清晰的下代架构。稳定性方面，则冒出了若干高影响的回归问题——最突出的是最新 Docker 镜像带来的破坏性变更 `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`，以及每次工具调用后都会重新处理完整上下文——这两个问题都在通过 codex-converged 的 PR 积极修复中。

## 发布与破坏性变更

过去 24 小时内没有新的 tag 发布。今日发布的 Docker 镜像（包版本 `2026.9.4`）为微调用户引入了一处破坏性变更：

- **`SFTConfig` 不再接受 `max_seq_length`**——已重命名为 `max_length`。训练直接启动失败。（[#10785](https://github.com/unslothai/unsloth/issues/10785)）
- API 对齐回归：Studio 仍传入 `max_tokens`，而上游期望的是 `max_completion_tokens`。（[#10787](https://github.com/unslothai/unsloth/issues/10787)）
- PR #10615 中的 `tool_execution_mode` 将可接受的值限定为 `auto` 与一个沙箱必需的变体——对任何自定义工具集成而言都是 **破坏性变更**。（[#10615](https://github.com/unslothai/unsloth/pull/10615)）

## 新增模型与硬件支持

- **Ascend NPU（华为昇腾）后端**——已开 RFC，目标是提供一等公民支持，从而打入中国数据中心市场。（[#10772](https://github.com/unslothai/unsloth/issues/10772)）
- **AMD 6950XT**——被报告为不支持；在向消费级部署推荐前需进一步排查。（[#10468](https://github.com/unslothai/unsloth/issues/10468)）
- **MLX VLM**——prompt-cache prefill grid 修复今日合入（此前强制 256-token 分块，破坏了冷路径等价性）。（[#10778](https://github.com/unslothai/unsloth/pull/10778)）
- **GGUF / Qwen3.8**——长对话回归问题定位到模型重载后的状态丢失（prefill 耗时 11 分钟）。（[#9037](https://github.com/unslothai/unsloth/issues/9037)）
- **Diffusion 模型**（Z-Image-Turbo 及其家族）：LoRA 导出路径与加载取消竞态已修复；tooltip 现已模型中立。（[#10716](https://github.com/unslothai/unsloth/issues/10716)、[#10780](https://github.com/unslothai/unsloth/pull/10780)、[#10782](https://github.com/unslothai/unsloth/pull/10782)）
- **图像模型**：text-encoder 精度现已暴露（Default / FP8 storage / FP8 compute / INT8 / NVFP4）。（[#10788](https://github.com/unslothai/unsloth/pull/10788)）
- **ONNX 误拒**：`sentence-transformers/all-MiniLM-L6-v2` 被错误拒绝——已在 PR 中修复。（[#10784](https://github.com/unslothai/unsloth/pull/10784)）

## 性能与优化

- **NVLink 检测**用直接的 NVML 读取替换了 1.2s 的 `nvidia-smi topo -m` shell 调用。在 8× B200 上，每次加载的探测耗时降至可忽略不计。（[#10720](https://github.com/unslothai/unsloth/pull/10720)）
- **`Fast_Layernorm` Triton 内核**现在物化（materialize）strided 的输入/梯度——修复了潜在的正确性静默 bug 与转置前导维上的 `view` 失败。（[#10675](https://github.com/unslothai/unsloth/pull/10675)）
- **Transformers sidecar**（`.venv_t5_530` / `_550` / `_510`）现在仅在磁盘证据失效时才重建，把 Windows 上的 `studio update` 从 60–90s 缩减到大致一次 sidecar 刷新的耗时。（[#10650](https://github.com/unslothai/unsloth/pull/10650)）
- **离线 `studio update`** 现在在 PyPI 不可达且设置了 `UV_OFFLINE` 时，会保留已验证的安装而非中途失败。（[#10651](https://github.com/unslothai/unsloth/pull/10651)）
- **Reasoning-window 分页**沿用自 #9477——长 CoT 链路保持响应式，无需重写流式渲染逻辑。（[#10717](https://github.com/unslothai/unsloth/pull/10717)）
- **Agentic tab-close 持久化**——服务端 tool loop 现在以持久化方式流式输出并在等待审批时挂起；回放与受监控的运行完全一致。（[#10365](https://github.com/unslothai/unsloth/pull/10365)）

## 稳定性与回归（按严重程度排序）

| 严重程度 | 问题 | 状态 |
|---|---|---|
| **Critical** | `2026.9.4` Docker 更新后 `SFTConfig` 拒绝 `max_seq_length`——训练无法启动。[#10785](https://github.com/unslothai/unsloth/issues/10785) | Open，暂无修复 PR |
| **High** | 每次工具调用后都重新处理完整上下文（升级后的回归）。[#10698](https://github.com/unslothai/unsloth/issues/10698) | Open |
| **High** | Qwen3.8 GGUF：模型重载后 prefill 耗时约 11 分钟。[#9037](https://github.com/unslothai/unsloth/issues/9037) | Open |
| **High** | `--tensor-split` 被静默忽略，让用户白白耗费数小时。[#10355](https://github.com/unslothai/unsloth/issues/10355) | Open |
| **High** | 等待工具审批的长 GGUF 对话占用其 slot，即使监控显示 4 个空闲 slot，仍会阻塞其他排队的对话。[#10671](https://github.com/unslothai/unsloth/issues/10671) | Open |
| **Medium** | Unsloth 的 "layer mode" 与 "tensor mode" 实际相同；所谓 BF16 mode 的说法具有误导性。[#10549](https://github.com/unslothai/unsloth/issues/10549) | Open |
| **Medium** | 多卡场景下 FLUX.2 Klein VAE 解码时出现 `CUBLAS_STATUS_NOT_INITIALIZED`。[#10768](https://github.com/unslothai/unsloth/issues/10768) | Open |
| **Medium** | Studio 丢弃了 Anthropic web-search 的错误详情——失败仅显示为 `(search complete)`。PR #10757 将其暴露出来。 | 修复位于 [#10757](https://github.com/unslothai/unsloth/pull/10757) |
| **Medium** | 对话历史恢复——模型可能在没有先前轮次的情况下回答后续问题。已在 [#10761](https://github.com/unslothai/unsloth/pull/10761) 中修复 | 修复已合入 |
| **Medium** | Claude Code 返回的图片在发送给模型前被丢弃。已在 [#10762](https://github.com/unslothai/unsloth/pull/10762) 中修复 | 修复已合入 |
| **Medium** | 合并模型的上传忽略了指定的 branch/PR。已在 [#10760](https://github.com/unslothai/unsloth/pull/10760) 中修复 | 修复已合入 |
| **Low** | Web UI 在 `127.0.0.1`/`localhost` 回环上返回 404，在 LAN IP 上正常。[#10786](https://github.com/unslothai/unsloth/issues/10786) | Open |
| **Low** | Desktop UI 在大代码块下出现卡顿（RTX 4090，Win 11 25H2）。[#10769](https://github.com/unslothai/unsloth/issues/10769) | Open |
| **Low** | Android 浏览器在后台运行时断连并中止生成。[#10739](https://github.com/unslothai/unsloth/issues/10739) | Open |

## 对应用开发者的意义

1. **若依赖 `max_seq_length`，请固定 Docker 镜像版本**——重命名为 `max_length` 没有任何预告，开箱即破坏训练。在拉取 `2026.9.4` 之前，请先审查训练脚本。
2. **工具调用 Agent 正在走向成熟**——围绕 tab-close 持久化（#10365）、工具返回的图片处理（#10762）、对话历史恢复（#10761）以及工具审批 slot 统计（#10671）的一批 PR，共同意味着 Studio 正从单纯的聊天工具，演变为承载长时、工具密集型会话的可行平台。在生产环境押注之前，请持续关注这些改动合入。
3. **在 B200/H100 实例上的多机服务将明显更便宜**——通过 NVML 实现的 NVLink 检测以及 sidecar 重建的瘦身，会直接转化为更快的冷启动与更短的更新窗口，惠及机队化运维。
4. **提前规划 Agent 平台的 API 形态**——新一波功能请求（Skills、Memory、Agent Builder、Model Router、Supervisor/Subagents）暗示着一个多层抽象（Skill Packs → Agent Profiles → Supervisor 路由）。即便尚未发布，下游集成在架构上也应按这一层级来设计。
5. **纯本地栈仍有不少毛刺**——ONNX 误拒、RTL 渲染、移动端断网处理以及 diffusion LoRA 导出的缺口都还活着。如果你面向非 NVIDIA 桌面或 RTL 市场出货，请用上述问题作为上线门槛。
6. **Studio 上的 Diffusion 正在快速稳定**——加载取消竞态与 tooltip 准确性刚刚落地，可以认真开始原型化图像生成工作流了。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — 每日摘要
**日期：** 2026-09-11
**仓库：** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. 今日要点

最主要的主题是 **OpenAI Responses / Codex API 兼容性**：两个并行的 PR（#1692、#1784）都指向同一个根因——翻译后的 Claude thinking 块在 `reasoning` 输入项上产生了非空的 `content` 数组，而 Responses 上游会以 HTTP 400 拒绝此类请求。此外，一个 **OpenCode Go provider** 的导入路径正通过 PR #1786 落地，同时一个新的 issue（#1787）显示，通过规则别名的模型会以别名进行记录，导致费用统计出错。

---

## 2. 发布与破坏性变更

过去 24 小时内无新发布。最新稳定版仍为 **v3.0.22**（在 [#1787](https://github.com/musistudio/claude-code-router/issues/1787) 中引用）。

无破坏性变更报告。

---

## 3. 新模型与硬件支持

**OpenCode Go provider** —— 新增对 `https://opencode.ai/zen/go/v1` 的一级支持，使其作为独立于 OpenCode Zen 的 provider 存在。

- [#1786 feat(opencode): add first-class OpenCode Go local import](https://github.com/musistudio/claude-code-router/pull/1786) — OPEN。在现有的 `opencode`（Zen）导入器基础上新增 `opencode-go`；通过独立的凭证记录和目录条目来处理重叠的模型 ID。
- [#1785 feat(opencode): add first-class OpenCode Go support](https://github.com/musistudio/claude-code-router/pull/1785) — CLOSED（已被 #1786 取代）。值得注意的是，该 PR 还补上了缺失的 `x-opencode-session` 头，修复了 [#1754](https://github.com/musistudio/claude-code-router/issues/1754) 和 [#1780](https://github.com/musistudio/claude-code-router/issues/1780)。

无新增的模型架构、量化格式或算力后端。

---

## 4. 性能与优化

今日无吞吐量、延迟或内核层面的性能改动落地。在飞的 PR 主要面向正确性 / 功能对齐，而非性能。

---

## 5. 稳定性与回归

按严重程度从高到低排序：

1. **[HIGH] `openai_responses` 在带有非空 content 的 reasoning 项上返回 400** —— 影响 Claude Code → Codex API 的路由。在 v3.0.22 和 `master` 上均可复现。
   - Issue： [#1783](https://github.com/musistudio/claude-code-router/issues/1783)（OPEN）
   - 修复 PR 在飞（相互重叠）：
     - [#1692 Drop non-replayable reasoning items from openai_responses input](https://github.com/musistudio/claude-code-router/pull/1692)（OPEN，今日更新）—— 在 Anthropic → Responses 翻译过程中由网关层丢弃 thinking 块。
     - [#1784 fix(openai): strip non-empty content from Responses reasoning input items](https://github.com/musistudio/claude-code-router/pull/1784)（OPEN）—— 范围更小的修复，在保留 reasoning 项的同时剥离非空的 `content`。
   - **建议动作：** 关注这两个 PR；维护者很可能会二选一。在合并之前，将 Codex API 作为多轮对话路由目标的用户会遇到 `All target providers failed`，并且会从所请求的模型上静默回退。

2. **[MEDIUM] 通过规则别名的模型预估费用卡在 $0** —— 用量记录的是 *规则别名* 而非解析后的上游模型，导致费用查找失败。
   - Issue： [#1787](https://github.com/musistudio/claude-code-router/issues/1787)（OPEN，今日新增，影响 v3.0.22 + master）
   - **修复 PR：** 暂无。
   - **建议动作：** 若使用规则引擎为模型设置别名，请将费用视为不可信；请与上游 provider 的控制台进行交叉核对。

3. **[LOW] 总览统计数据无法重置** —— 这是一项功能缺失，而非回归。
   - Issue： [#1734](https://github.com/musistudio/claude-code-router/issues/1734)（作为 question 关闭；功能请求实质上仍处于开放状态）。
   - **修复 PR：** 暂无。

---

## 6. 对应用开发者的影响

- **若你将 Claude Code 会话路由到 OpenAI Codex（`openai_responses`）**，在 #1692 或 #1784 合并之前，多轮对话中会遇到 400。临时规避方式：在相关路由的会话状态中避免使用 Anthropic thinking 块，或临时禁用受影响的 provider。
- **若你依赖内置的费用面板**，请不要信任通过路由规则别名访问的任何模型的金额数据。请与上游 provider 的账单导出进行交叉核对。持续关注 [#1787](https://github.com/musistudio/claude-code-router/issues/1787)。
- **若你使用 OpenCode 作为后端**，即将到来的 [#1786](https://github.com/musistudio/claude-code-router/pull/1786) 将允许你独立导入 Zen 和 Go 两套凭证——如果你在不同层级分别使用账号，这会很有用。
- **运维提示：** 今日无发布；请明确将部署固定在 v3.0.22 或 `main`。两个 reasoning 修复 PR 是互斥方案——在合并到生产分支之前请等待维护者的明确信号。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 每日摘要 — 2026-09-11

## 今日要点

今天最重要的事件是一项针对 `Codex Responses → Chat Completions` 转换缺陷的协同修复。多个不同的故障模式（DeepSeek 因助手回合拆分导致的无限循环、推理模型上碎片化的 `content_block_start` 事件、负值 `max_tokens`）在过去 24 小时内全部关闭或取得进展，其中 [#7280](https://github.com/farion1231/cc-switch/pull/7280) 将带待处理工具调用的注释内容合并，[#7286](https://github.com/farion1231/cc-switch/pull/7286) 同步了 DeepSeek 更新后的支持视觉的模型目录。

第二组改动针对代理配置卫生：三个未合并的 PR（[#7292](https://github.com/farion1231/cc-switch/pull/7292)、[#7293](https://github.com/farion1231/cc-switch/pull/7293)、[#1264](https://github.com/farion1231/cc-switch/issues/1264)）都瞄准同一个根因——CC Switch 静默继承了陈旧或系统级的代理设置，导致回环地址提供商、内网端点以及重启后的连接出现故障。

## 发布与破坏性变更

过去 24 小时内无新发布。版本 3.20.2 似乎引入了一个针对非 Haiku 的 Claude Code 模型在配合 Qwen 3.8 27B 时的回归，详见 [#7221](https://github.com/farion1231/cc-switch/issues/7221)。

## 新模型与硬件支持

- **DeepSeek 目录刷新** — [#7286](https://github.com/farion1231/cc-switch/pull/7286) 同步了 `deepseek-flash`（支持视觉）并解封了遗留的 `deepseek-v4-flash` 别名，使图片块可以正常透传，而不再被剥离成 `[Unsupported...]`。相关跟踪：[#7278](https://github.com/farion1231/cc-switch/issues/7278) 申请针对 V4.1 Flash 重命名的预设更新。
- **Token Market 预设** — [#7184](https://github.com/farion1231/cc-switch/pull/7184) 增加了跨 Claude Code、Codex、OpenCode、OpenClaw、Hermes 的统一中继（分别对应 Anthropic、OpenAI Responses 以及兼容 Chat 的端点）。
- **Laonong API 预设** — [#7296](https://github.com/farion1231/cc-switch/pull/7296) 集成了一个跨相同多应用层面的通用中继/网关提供商。
- **Claude Science 启动器** — [#5440](https://github.com/farion1231/cc-switch/pull/5440) 通过 CC Switch 的本地代理接入新的 Claude Science Beta，将状态隔离在 `~/.cc-switch/claude-science-proxy` 下，保证默认配置文件和真实 Claude 凭据不受影响。
- **供应商级代理覆盖** — [#7290](https://github.com/farion1231/cc-switch/pull/7290) 允许单个提供商指定外部代理 API，并显示该提供商的模型 ID。
- **Mimo 代码适配器** — 仍以增强请求的形式开放中：[#4073](https://github.com/farion1231/cc-switch/issues/4073)。

## 性能与优化

- [#7307](https://github.com/farion1231/cc-switch/pull/7307) 为 `fetch_npm_dist_tags` 添加了探测超时，使"关于 → 环境检查"卡片不再因 npm registry 响应缓慢而卡住。本地的 `zsh -lic "{tool} --version"` 探测已确认很快（约 0.6 秒）；回归完全发生在远程 latest-version 路径上。
- [#7297](https://github.com/farion1231/cc-switch/pull/7297) 稳定了 Codex 会话导入：在完整时间线扫描前后校验已打开的父文件时间戳，仅缓存稳定的快照，避免父文件空闲间隔后产生不必要的后延 fork。
- [#6852](https://github.com/farion1231/cc-switch/pull/6852) 将上游的 `"Model is unavailable"` 400 错误重新归类为可重试，使其计入熔断器并触发故障转移，而不是钉死在已下线的模型上。

## 稳定性与回归

**高危（仍未关闭，仍有活跃流量）：**

- [#4341](https://github.com/farion1231/cc-switch/issues/4341) — 49 条评论。使用第三方模型的 Codex 会话在对话中途自动断开；根因尚未公开。
- [#7217](https://github.com/farion1231/cc-switch/issues/7217) — Codex v0.153.x 绕过本地 15721 路由，直接访问 OpenAI 官方；CC Switch 的本地路由对第三方中继实际上已失效。
- [#7221](https://github.com/farion1231/cc-switch/issues/7221) — v3.20.2 回归：Claude Code 在指向 Qwen 3.8 27B 时，除 Haiku 之外的所有模型均报错。
- [#7224](https://github.com/farion1231/cc-switch/issues/7224) — 2026-09-08 报告的内存使用异常。
- [#6605](https://github.com/farion1231/cc-switch/issues/6605) — Claude Desktop 通过 Anthropic 协议时持续报错。

**中危：**

- [#4741](https://github.com/farion1231/cc-switch/issues/4741) — 在 DeepSeek / `gpt-5.5` 上，没有前置 `tool_calls` 消息的 tool-role 消息被上游拒绝（HTTP 400）。
- [#4679](https://github.com/farion1231/cc-switch/issues/4679) — 缓存的系统代理状态在用户关闭代理后引发 502。修复将通过 [#7292](https://github.com/farion1231/cc-switch/pull/7292) 进入。
- [#4642](https://github.com/farion1231/cc-switch/issues/4642) — macOS 上的同类缺陷：代理设置变更后未重新读取。
- [#7029](https://github.com/farion1231/cc-switch/issues/7029) — macOS：杀死/切换代理工具（Clash、v2rayN 等）会导致所有用量查询和连接性检查失败，直至 CC Switch 重启。
- [#6596](https://github.com/farion1231/cc-switch/issues/6596) — WSL 文件系统（`\\wsl.localhost\Debian\...`）在 auth.json 原子替换时报告 `os error 50`，阻塞 Codex 路由切换。
- [#5974](https://github.com/farion1231/cc-switch/issues/5974) — Codex 本地路由 + `unifyCodexSessionHistory` 下，OpenAI 官方路径硬编码 `cc-switch-official` 桶，并分离官方与第三方会话历史。
- [#7264](https://github.com/farion1231/cc-switch/issues/7264) — Codex 用量同步在更新时未变更 mtime 的活动日志会被遗漏（Windows 灰度场景）。
- [#6936](https://github.com/farion1231/cc-switch/issues/6936) — macOS 13：提供商检查、应用内更新、Codex API 请求全部失败。
- [#5028](https://github.com/farion1231/cc-switch/issues/5028) — GLM 5.2 流式输出 → Anthropic 转换会生成空的思考块和损坏的文本。**已关闭**但在下一次 GLM 升级时值得留意。
- [#2569](https://github.com/farion1231/cc-switch/issues/2569) — WebDAV 云同步不可用。
- [#1149](https://github.com/farion1231/cc-switch/issues/1149) — 出站 PII 脱敏功能仍作为增强请求开放中；[#7306](https://github.com/farion1231/cc-switch/pull/7306) 推进了该功能，引入可逆的类型化占位符（如 `{{PHONE_1}}`）替代仅按长度遮蔽的方式，使模型保留类型信息并支持往返还原。

**近期已关闭（好消息）：**

- [#7236](https://github.com/farion1231/cc-switch/issues/7236) — Claude Code 2.1.265 破坏了 DeepSeek/ZAI；**已关闭**。
- [#5860](https://github.com/farion1231/cc-switch/issues/5860) — DeepSeek 因助手回合拆分导致的无限回复循环；通过 [#7280](https://github.com/farion1231/cc-switch/pull/7280) **已关闭**。
- [#6529](https://github.com/farion1231/cc-switch/issues/6529) — 与 #5860 同根因（注释 + function_call 拆分）；通过 #7280 **已关闭**。
- [#7088](https://github.com/farion1231/cc-switch/issues/7088) — OpenCodeGo 请求缺少 `x-opencode-session` 头；**已关闭**。
- [#4404](https://github.com/farion1231/cc-switch/issues/4404) — 推理模型上碎片化的 `content_block_start` 事件；**已关闭**。
- [#4714](https://github.com/farion1231/cc-switch/issues/4714) — `/responses` 上的负值 `max_tokens`；**已关闭**。
- [#6060](https://github.com/farion1231/cc-switch/issues/6060) — Windows Codex 用量 mtime 跳过；**已关闭**（仍开放的 [#7264](https://github.com/farion1231/cc-switch/issues/7264) 的同类问题）。
- [#782](https://github.com/farion1231/cc-switch/issues/782) — `everything-claude-code` 插件配置在 CC Switch 重启后被清空；**已关闭**。
- [#1634](https://github.com/farion1231/cc-switch/issues/1634) — Windows 上添加提供商面板的标签页可见性；**已关闭**。

**进行中的平台特定修复：**

- [#7302](https://github.com/farion1231/cc-switch/pull/7302) — 通过新增 WebKit 沙盒权限项（`entitlements.plist` 中为 WKWebView WebContent 进程加入 executable-memory 和 library-validation 条目），修复 macOS 26 Tahoe 上的窗口空白/不可见问题。
- [#6714](https://github.com/farion1231/cc-switch/pull/6714) — 改用 XDG Desktop Portal 修复 Linux/KDE/GNOME 上的"System"主题模式问题，使主题切换可实时生效，无需重启。
- [#6572](https://github.com/farion1231/cc-switch/pull/6572) — 识别 Homebrew Caskroom 安装，使 Codex 升级走 `brew upgrade --cask` 而非 `npm i -g`。

## 对应用开发者的意义

1. **将 Codex Responses 视为脆弱面。** 如果你通过中继路由 Codex，且上游是 Chat-Completions 形态的，那么 `assistant` 回合的形态很关键：任何与 `function_call` 项相邻的注释项必须合并到同一个助手消息中，否则 Chat 目标要么忽略工具调用，要么以循环回显注释内容。[#7280](https://github.com/farion1231/cc-switch/pull/7280) 是权威参考；如果你在自研类似的转换器，请照搬其合并规则。

2. **不要信任系统代理。** 三个相互独立的缺陷（[#4679](https://github.com/farion1231/cc-switch/issues/4679)、[#4642](https://github.com/farion1231/cc-switch/issues/4642)、[#7029](https://github.com/farion1231/cc-switch/issues/7029)）都源于 reqwest 或 HTTP 客户端继承了用户已不再需要的 `HTTP_PROXY`/`HTTPS_PROXY`/`ALL_PROXY`。如果你在 CC Switch 中构建提供商，请假定：(a) 检测回环地址上游并绕过任何继承的代理，(b) 在每次请求时重新读取代理状态，而非仅在启动时读取。[#7293](https://github.com/farion1231/cc-switch/pull/7293) 和 [#7292](https://github.com/farion1231/cc-switch/pull/7292) 是值得参照的实现。

3. **DeepSeek 现已具备视觉能力。** 随着 [#7286](https://github.com/farion1231/cc-switch/pull/7286) 合入，图片输入通过 `deepseek-flash` 和遗留的 `deepseek-v4-flash` 别名均可正常工作。如果你之前靠剥离图片块作为变通，可以移除该代码路径。

4. **macOS Tahoe 是新的最低目标。** [#7302](https://github.com/farion1231/cc-switch/pull/7302) 引入了新的沙盒权限项；如果你也发布 Tauri/WebKit 应用，预计会遇到同样的要求。反过来，macOS 13 已显老态（[#6936](https://github.com/farion1231/cc-switch/issues/6936)）——请规划系统最低版本的升级。

5. **WSL auth.json 原子性是已知限制。** 如果你的用户在 WSL 内运行 Codex，`\\wsl.localhost\...` 上的 `auth.json` 替换路径将以 `os error 50` 失败。该问题暂无在途修复；请明确告知用户该限制，而非默默绕过。

6. **如果你是 Claude Code 用户，请针对 Qwen 系模型固定在 3.20.2 附近。** [#7221](https://github.com/farion1231/cc-switch/issues/7221) 显示该组合存在特定回归；请降级或等待补丁。

7. **新预设具有实际价值。** Token Market（[#7184](https://github.com/farion1231/cc-switch/pull/7184)）和 Laonong（[#7296](https://github.com/farion1231/cc-switch/pull/7296)）为你再提供两个中立中继选项，在需要避开任何单一主流提供商的 API 网关做预算故障转移时尤为有用。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-11

## 今日要点

过去 24 小时内 New API 没有发布带标签的版本，但一波由 AI 编程代理（Claude Code、Codex、Grok Build、Hermes Agent）提交的 issue 和 PR 主导了今天的队列——其中许多因无效或重复而被关闭，可合并的改动则集中在可靠性上（`InitChannelCache` 的 nil map panic、宿主机 CPU 造成的熔断误判、音频扩展名大小写问题、Veo 字段缺陷），另有一条分量不小的新功能线：周期性配额重置、厂商管理对话框、可选的 Langfuse 遥测，以及 Vertex 兼容的 embeddings。

## 版本发布与破坏性变更

过去 24 小时没有新版本发布。代码库仍停留在 `v1.0.0-rc.36` 这条线上；Issue [#7279](https://github.com/QuantumNous/new-api/issues/7279) 要求维护者在锁定 `v1.0.0` 之前公布明确的 GA 标准。

## 新模型与硬件支持

- **Vertex AI — OpenAI 兼容 embeddings**（开放中）。PR [#6776](https://github.com/QuantumNous/new-api/pull/6776) 为 Vertex `:predict` 增加了 `/v1embeddings` 转换，返回 OpenAI 形状的 `data[]` 并附带 prompt token 用量。
- **Google Veo（Gemini 视频）插件修复**（开放中）。PR [#7311](https://github.com/QuantumNous/new-api/pull/7311)（去掉不受支持的 `numberOfVideos`，改发 `sampleCount`）与 [#7314](https://github.com/QuantumNous/new-api/pull/7314)（从 `generatedSamples` 读取视频 URI，而非错误的 `generatedVideos[].video.uri`）。
- **Anthropic 缓存 token 计量**（开放中）。PR [#7305](https://github.com/QuantumNous/new-api/pull/7305) 确保缓存读/写 token 计入消费日志的输入总量（关闭 [#7290](https://github.com/QuantumNous/new-api/issues/7290)）。
- 今日没有新增硬件/后端支持（CUDA/ROCm/Metal/CPU），也没有新的量化路径。

## 性能与优化

- **分级计费的账单日志更清晰**（已合并）。PR [#7324](https://github.com/QuantumNous/new-api/pull/7324) 正确渲染复杂的时间规则倍率，替换了此前具有误导性的 "dynamic pricing · no match" 字符串（关闭 [#7296](https://github.com/QuantumNous/new-api/issues/7296)）。
- **Sentinel CPU 采样限定到容器范围**（开放中）。PR [#7317](https://github.com/QuantumNous/new-api/pull/7317) 将覆盖宿主机的 `system_cpu_overloaded` 探针替换为容器级探针，并附加连续性/新鲜度检查，消除 pod 内部的误熔断（关闭 [#7316](https://github.com/QuantumNous/new-api/issues/7316)）。
- **性能指标访问控制**（已合并）。PR [#7326](https://github.com/QuantumNous/new-api/pull/7326) 在模型广场性能页隐藏查看者无权访问的分组，消除了一条信息泄露途径（关闭 [#7309](https://github.com/QuantumNous/new-api/issues/7309)；重复项 [#7310](https://github.com/QuantumNous/new-api/issues/7310)）。
- **自动禁用后保留重试优先级**（开放中）。PR [#7294](https://github.com/QuantumNous/new-api/pull/7294) 在渠道于故障转移过程中自动禁用时保留原有的重试顺序，避免第二/第三次尝试被打乱。
- **重试逻辑清理**（开放中，已停滞）。Issue [#4236](https://github.com/QuantumNous/new-api/issues/4236) 仍在呼吁更清晰的重试/重试策略设计——今日尚无实质性进展落地。

## 稳定性与回归

按影响程度排序。严重程度图例：🔴 严重 · 🟠 高 · 🟡 中。

- 🟠 **InitChannelCache 在 group map 为 nil 时 panic——反复崩溃。** Issue [#7322](https://github.com/QuantumNous/new-api/issues/7322) 报告：当已启用渠道的 group 缺少 abilities 行时，每个同步周期都会触发 `assignment to entry in nil map` panic，生产环境已有一个容器因此重启。修复 PR [#7323](https://github.com/QuantumNous/new-api/pull/7323)（开放中）加入了 nil map 防护；注意，同一 panic 位置上更早的 PR [#6687](https://github.com/QuantumNous/new-api/pull/6687) 已被标记为 DIRTY 且作者失联——无论如何都建议将该防护回移（backport）。
- 🟠 **Vertex AI API Key 模式在官方端点上返回 404。** Issue [#6250](https://github.com/QuantumNous/new-api/issues/6250)——API-Key 路径构建 URL 时未带 `project_id`，导致发往 Vertex 第一方端点的请求缺失 project 段。URL 构建器目前尚无修复 PR（只有 embeddings 的 PR [#6776](https://github.com/QuantumNous/new-api/pull/6776) 算是相邻改动）。
- 🟡 **大写扩展名导致音频时长解析失败。** Issue [#7319](https://github.com/QuantumNous/new-api/issues/7319)——`GetAudioDuration` 对文件扩展名大小写敏感。修复 PR [#7321](https://github.com/QuantumNous/new-api/pull/7321)（开放中）将其改为大小写不敏感。
- 🟡 **BatchUpdater 停机时丢弃累积增量。** Issue [#7325](https://github.com/QuantumNous/new-api/issues/7325)（已关闭，判定无效）——当 `BATCH_UPDATE_ENABLED=true` 时，内存中的增量仅在定时器触发时刷写；优雅停机时没有任何刷写动作，因此最后一个不足一个 tick 窗口内的配额/用量变更会被静默丢失。尽管机器人已将其关闭，这一问题仍值得重新审视。
- 🟡 **性能页泄露隐藏分组。** Issue [#7309](https://github.com/QuantumNous/new-api/issues/7309)——模型广场性能页存在可见性绕过；已由 PR [#7326](https://github.com/QuantumNous/new-api/pull/7326) 修复。
- 🟡 **Claude→OpenAI 转换会向严格上游泄露对话中途的 system 消息。** Issue [#7307](https://github.com/QuantumNous/new-api/issues/7307)（已关闭）——已关闭但未合并，底层行为仍未修复；在修复落地之前，多轮 Claude 流量走严格的 OpenAI 兼容上游应视为有风险。
- 🟡 **Veo（Gemini 视频）的两个缺陷**——视频 URI 字段取错（[#7314](https://github.com/QuantumNous/new-api/pull/7314)），以及发送了不受支持的 `numberOfVideos`（[#7311](https://github.com/QuantumNous/new-api/pull/7311)）。两者均已有开放中的 PR。
- 🟢 **分级模型计费日志误报 "dynamic pricing · no match"**——[#7296](https://github.com/QuantumNous/new-api/issues/7296)，仅影响显示，已由 [#7324](https://github.com/QuantumNous/new-api/pull/7324) 修复。

## 对应用开发者意味着什么

- **遥测功能变为可选，且更贴合标准。** PR [#7313](https://github.com/QuantumNous/new-api/pull/7313)（开放中）新增了可开关的 Langfuse 上报器，以异步批量方式上报请求结果和重试元数据——主请求路径保持不变。如果你已经在为 Langfuse 付费，这是阻力最小的接入方式。
- **配额现在可以按计划重置。** PR [#7320](https://github.com/QuantumNous/new-api/pull/7320)（开放中）实现了周期性钱包重置，提供全局默认值并支持按用户覆盖（关闭了存在已久的 [#3165](https://github.com/QuantumNous/new-api/issues/3165)）。依赖它之前值得仔细审查：目前支持按用户退出（opt-out）和管理员触发的立即执行，但还没有 dry-run 标志。
- **Vertex 用户应暂缓升级。** [#6250](https://github.com/QuantumNous/new-api/issues/6250) 中 API Key 模式的 404 问题在 URL 构建器上仍未修复；如果你的上游是官方 Vertex 端点，请在修复落地前停留在引入缺陷之前的提交上，或提供完整的自定义 URL。
- **值得纳入路线图跟踪的新能力钩子：**
  - 厂商管理对话框（PR [#7029](https://github.com/QuantumNous/new-api/pull/7029)，已关闭并合并）。
  - 渠道端点类型白名单（[#7292](https://github.com/QuantumNous/new-api/issues/7292)）——如果你区分内部/外部渠道，这会很有用。
  - 通过一次性授权码中转桌面客户端登录（[#7308](https://github.com/QuantumNous/new-api/issues/7308)）——与 CLI/Electron 集成相关。
  - 带共享配额与角色的组织/团队抽象（[#7312](https://github.com/QuantumNous/new-api/issues/7312)）——仍开放，处于设计阶段。
  - 批量删除用户（[#7318](https://github.com/QuantumNous/new-api/issues/7318)）——仍开放。
- **运维提示：**今天的流量中，被 issue 机器人关闭（模板不符、重复、无效）的 AI 编程代理提交占比异常高。预计下一个 RC 周期内队列噪声会更高——生产环境请固定使用已知良好的标签（`v1.0.0-rc.36`），并在升级到下一个版本之前关注 GA 标准讨论帖 [#7279](https://github.com/QuantumNous/new-api/issues/7279)。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*