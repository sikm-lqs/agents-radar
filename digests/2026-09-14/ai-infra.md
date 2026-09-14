# AI 基础设施日报 2026-09-14

> 生成时间: 2026-09-14 11:30 UTC | 覆盖项目: 9 个

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

# 跨项目 AI 基础设施报告 — 2026-09-14

## 1. 生态概览

今天的活动沿技术栈清晰分层：推理引擎（vLLM、SGLang）正在承担最新模型架构的正确性成本——混合 Mamba/attention、带稀疏索引器的 MoE，以及投机解码——而硬件覆盖范围持续扩展（Ascend NPU、ROCm、SM120/SM100、B300、GB200）。本地/运行时层（llama.cpp、Ollama）处于纯粹的稳定模式，针对回归快速发布构建版本，而非新增能力。网关层（LiteLLM、New API、Claude Code Router、CC Switch）正在收敛于两个共同问题：对 OpenAI Responses 协议的忠实翻译（尤其是推理内容和工具调用），以及可信的成本/缓存核算。微调（Unsloth）在扩散模型的 FP4 系列量化方面一马当先，并悄然扩展到推理和智能体工具领域。

## 2. 活动对比

计数基于各摘要中引用的条目（非全仓库统计），SGLang 例外，其摘要自报汇总数据。

| 项目 | 层级 | 引用的 Issue | 引用的 PR | 发布状态（24h） |
|---|---|---|---|---|
| **vLLM** | 推理引擎 | 21 | 15 | 无；隐式破坏性变更：`VLLM_ENABLE_SCALE_OUT_ENDPOINTS` 环境变量 → `--enable-scale-out` 标志（#55176/#56819） |
| **SGLang** | 推理引擎 | ~16（摘要显示 48 个活跃） | ~20（摘要显示 ~500 个更新） | 无 |
| **llama.cpp** | 本地运行时/内核 | 3 | 26 | **8 个构建**（b10944–b10955），含关键 macOS arm64 堆损坏修复 |
| **Ollama** | 本地平台 | 16 | 10 | 无 |
| **LiteLLM** | 网关 | 24 | 13 | 无 |
| **Unsloth** | 微调 | 23 | 20 | 无 |
| **Claude Code Router** | 智能体路由 | 3 | 4 | 无 |
| **CC Switch** | 智能体配置/代理 | ~20 | ~14 | 无 |
| **New API** | 网关 | ~22 | 18 | 无；停滞在 v1.0.0-rc.37 |

**要点：** llama.cpp 是今天唯一发布的项目（8 个构建——其 PCH 回归后的快速修复姿态）。按自报数据，SGLang 显示出最高的聚合迭代速度；vLLM 和 LiteLLM 显示出相对摘要规模最深的 issue 积压，集中在正确性而非功能。

## 3. 模型支持竞赛

| 领域 | 今日领跑者 | 证据 |
|---|---|---|
| 前沿模型适配 | **vLLM 与 SGLang 并列** | 双方在 DeepSeek-V4.x/DSpark、GLM-5.x、Qwen3.x 混合架构、Kimi K3 上展开竞速。vLLM：Kimi K3 TP8/PP2/EP8（#54347）、GLM-5.3-Flash TP 分片索引器（#54951）、Nanbeige 4.2、Ling-3.0-flash-VL CUDA graphs。SGLang：MiniMax-M3 稀疏 prefill（#39345）、LLaDA2.2 扩散 MoE（#31768）、Step3p7 多模态、SenseNova 跟踪。 |
| 硬件广度 | **SGLang** | Ascend NPU 今日成为一等目标：HiCache L3、NCCL 权重加载器、上下文并行、MXFP4 W4A4 MoE，外加 AMD MegaMoEv2 和 Intel CPU。vLLM 以 ROCm W4A16/CSA/DSA 工作应对。 |
| 异域量化格式 | **llama.cpp** | Maple 20B-A1B 三值 MoE（TQ1_0/TQ2_0）已合并；GigaChat-3.5-432B 转换中。 |
| 量化检查点 | **Unsloth** | Wan2.2 和 HunyuanVideo-1.5 DiT 的整模型 NVFP4；图像 DiT 的逐层 FP4 + flashinfer 后端。 |
| 服务商覆盖 | **LiteLLM / New API** | Opper 提供商、ChatGPT OAuth 设备流（LiteLLM）；vLLM/SGLang 中继通道 + 华为 MaaS（New API #7332/#7239）。 |

值得注意的负面结果：GLM-5.x NoPE MLA 在 SM120 上**不可用**（SGLang #39302），DSv4 在 vLLM 中无法加载到 RTX PRO 6000（#40821）——消费级 Blackwell 在前沿架构上显著落后于数据中心级 Blackwell。

## 4. 性能前沿

优化工作集中在五个领域：

- **KV/前缀缓存的正确性与层次结构。** 今天约一半的高严重性 bug 与缓存相关：Qwen3.5 多轮多模态前缀未命中（vLLM #56818）、DFlash+YaRN 在 1M 上下文下零缓存复用（#54094）、混合 Mamba 恢复损坏（#53142）、混合分块下的 Mamba radix 缓存损坏（SGLang #39342）、混合池上的 HiCache 误命中（#39147）。构建侧：vLLM 支持 RDMA 的 NIXL OBJ 卸载层（#56192）以及 SGLang 的 NPU HiCache L3（#36188）。缓存**确定性**如今与缓存**速度**同等重要。
- **大规模投机解码。** vLLM 落地了 DSpark 草稿映射修复（#55133、#56448），但混合 GDN 上的 DFlash 在 185k 上下文时出现 4×**减速**（#54691）且无按序列禁用开关；DDTree 和 UNO RFC 标志着下一代方案。SGLang 在 CUDA Triton 上解锁了 split-KV EAGLE 验证（#39316），并通过 NVLink 集合通信削减了 DSpark 草稿头约 75 µs/验证周期的 NCCL all-gather 开销（#39414）。
- **FP4 系列量化无处不在。** NVFP4/MXFP4 工作覆盖各层：vLLM（H200 上的 Marlin MXFP4）、SGLang（B300 上的 W4A8/MXFP8FP4，含一个非法地址 bug #37559）、llama.cpp（Blackwell 上 NVFP4 层的强制 W4A8）、Unsloth（NVFP4 DiT + int8 优先的精度阶梯）。
- **解耦 P/D 推理。** vLLM 识别出描述符提交（而非互联带宽）是 GLM-5.3 在 GB200 上的瓶颈（91k–120k 描述符/TP-rank；RDMA 优于 MNNVL，#55434）。SGLang 的 Rust 前端静默丢弃 PD bootstrap 参数（#39412）——提醒人们最新的前端往往最少硬化。
- **内核级融合。** AITER 融合的 DSA 索引器 prologue 替换了 4 个内核（vLLM #51315）、ROCm W4A16 tile 重新调优（gfx1151）、SYCL top_k radix select（消除了 K=2048 的卸载）、Vulkan IQ3_S MMQ 用于 Intel Arc。

## 5. 层级定位

- **推理引擎（vLLM、SGLang）：** 掌控吞吐、调度和模型适配。差异化正在变薄——两者追逐相同的模型和硬件；SGLang 偏向异构硅与路由集成解耦，vLLM 偏向投机解码广度与基于 NIXL 的内存分层。
- **本地运行时（llama.cpp）vs. 平台（Ollama）：** llama.cpp 是可移植性底座（SYCL、Vulkan、s390x、RPC、三值量化）；Ollama 增加产品层——协议兼容性（Anthropic `/v1/messages`、Codex `/responses`）、工具调用渲染、存储卫生。Ollama 今天的 bug 都是产品 bug（schema 顺序、EXIF、blob 孤儿），而非内核 bug。
- **网关（LiteLLM、New API）：** LiteLLM 是企业控制平面（预算、花费日志、冷却期、缓存隔离），代价是核算正确性债务（#39370 静默花费清零、#22984 vLLM 未缓存 token 定价）。New API 是转售商/统一网关的玩法，如今通过原生 vLLM/SGLang 通道**向下**延伸至技术栈——网关/引擎融合的早期证据。
- **客户端路由器（CCR、CC Switch）：** 用于 Claude Code / Codex 桌面生态系统的轻量协议转换器。其全部风险面是跨协议泄漏：思考块导致 400（CCR #1784）、DeepSeek Responses→Chat 循环消耗 120k+ token（CC Switch #5860）、`call_id` 拒绝。CC Switch 最受期待的功能——多提供商路由（#3703）——仍未实现。
- **微调（Unsloth）：** 从 LoRA 训练库转向端到端工作室（托管量化检查点、带并发控制的 API 推理、MCP 工具、智能体 UX）。它如今与 Ollama 的领域重叠多过 vLLM。

## 6. 趋势信号

1. **混合线性注意力模型成为新的正确性税。** Qwen3.5/K3/GDN/KDA 的 bug 出现在触及序列的每一层——前缀缓存、radix 缓存、投机解码、KV 卸载。任何部署这些架构的人都应预留验证周期，而非仅仅基准测试。
2. **Responses 协议正在撕裂网关层。** 今天每个以翻译为核心的项目都有一个 Responses↔Chat bug：LiteLLM 丢弃推理增量（#40887/#40654）、CCR 将思考块泄漏为 400、CC Switch 在 DeepSeek 上循环。具备持久历史的多轮智能体是震中。
3. **缓存确定性如今是成本条目。** Ollama 的工具 schema 顺序修复（#18433）、Claude Code 系统消息提升 bug（#18431）、LiteLLM 的缓存 token 核算缺口（#22984）都在静默推高花费。前缀缓存行为值得像延迟一样纳入 CI 监控。
4. **投机解码存在长上下文悬崖。** vLLM 在 185k 上下文的 4× 减速（#54691）和 SGLang 的解耦+投机崩溃（#39072）表明，投机解码的默认设置应被视为短/中上下文特性，直至另行证明。
5. **硬件多元化正在不均衡加速。** Ascend NPU 投入（来自 SGLang）是实质且真实的；消费/工作站级 Blackwell（SM120）是被忽视的层级——GLM-5.x NoPE MLA 今天根本跑不起来。
6. **FP4 正从实验走向默认。** NVFP4 出现在引擎、运行时和训练侧检查点中；Unsloth 的 int8 优先阶梯变更意味着"auto"精度在升级时会静默变化——请显式锁定。

**智能体开发者需关注：** vLLM #56370（序列并行下批量不变性破坏——影响 RL/评估可复现性）、Ollama #18431（Claude Code 成本回归）、New API #7361（rc.37 上 24× 内存膨胀——小虚机上固定到 rc.36）、CCR #1796（Codex 桌面端启动阻塞）、CC Switch #6995/#7156（DeepSeek 上的子智能体+心跳流是当前的失败点）。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 每日摘要 — 2026-09-14

## 1. 今日要点

过去 24 小时内没有新的发布标签,项目进展集中在 **混合(Mamba/Attention)KV 缓存正确性**、**长上下文混合模型的投机解码**,以及 **GLM-5.3 / DeepSeek-V4 系列在 Blackwell 与 ROCm 上的适配**。最具影响力的两项是:一个 P1 级正确性缺陷,在启用序列并行时 `VLLM_BATCH_INVARIANT=1` 会被破坏([#56370](https://github.com/vllm-project/vllm/issues/56370));以及针对 Qwen3.5 多轮前缀缓存未命中的具体修复落地([#56818](https://github.com/vllm-project/vllm/pull/56818),关联 [#43587](https://github.com/vllm-project/vllm/issues/43587))。

## 2. 发布与破坏性变更

*过去 24 小时内无新发布。*

值得标记的隐性破坏性变更:横向扩展端点的开关 `VLLM_ENABLE_SCALE_OUT_ENDPOINTS=1` 在 [#55176](https://github.com/vllm-project/vllm/pull/55176) 中被 CLI 参数 `--enable-scale-out` 取代。EC E2E 启动器正在 [#56819](https://github.com/vllm-project/vllm/pull/56819) 中相应更新。升级 CI 任务的运维人员应将环境变量替换为该参数。

## 3. 新模型与硬件支持

- **Nanbeige 4.2 (NanbeigeForCausalLM)** 通过 transformers 后端 — [PR #56071](https://github.com/vllm-project/vllm/pull/56071)
- **Ling-3.0-flash-VL 视觉编码器 CUDA graph 捕获**(`BailingMoeV3VLForConditionalGeneration` 上的 `SupportsEncoderCudaGraph`)— [PR #56820](https://github.com/vllm-project/vllm/pull/56820)(属于 ViT 全量 CUDA graph 跟踪项 [#38175](https://github.com/vllm-project/vllm/issues/38175))
- **Nemotron VL — 仅对语言模型应用 LoRA** — [PR #56231](https://github.com/vllm-project/vllm/pull/56231)
- **Kimi K3 序列并行结合流水线并行**(TP8/PP2/EP8 拓扑,DeepGEMM MegaMoE 路径)— [PR #54347](https://github.com/vllm-project/vllm/pull/54347)
- **GLM-5.3-Flash 索引器 prefill 在 TP 上分片** — [PR #54951](https://github.com/vllm-project/vllm/pull/54951)

## 4. 性能与优化

- **GLM-5.3-Flash 索引器 prefill**:将独立的查询行划分为开销均衡的连续切片,各 TP rank 针对完整 K 历史打分,通过 `all_gatherv` 重组 —— 减少了稀疏索引器 MQA 打分/top-k 的重复计算。[PR #54951](https://github.com/vllm-project/vllm/pull/54951)
- **ROCm W4A16 prefill 反量化(RDNA3)**:Triton 融合反量化 GEMM 受 VALU 指令吞吐限制,在 gfx1151 上重新设计了分片选择。[PR #55711](https://github.com/vllm-project/vllm/pull/55711)
- **ROCm CSA 多流并行(用于 DeepSeek-V4)**(compress_ratio=4):派生三条 HIP 流以重叠 wqa+wkv GEMM、RMSNorm、wq_b 路径。(已关闭的 PR,作为背景信息保留。)[PR #51794](https://github.com/vllm-project/vllm/pull/51794)
- **支持 RDMA 的 NIXL OBJ 层用于 KV 卸载**:在不改变 JSON schema 的前提下,为现有 OBJ 层加入加速对象存储配置。[PR #56192](https://github.com/vllm-project/vllm/pull/56192)
- **ROCm DSA 索引器 prologue 通过 AITER 融合**(`indexer_qk_rope_quant_and_cache` 替代了四个核函数:K-norm、Q/K RoPE、FP8 量化、K-cache 写入)。[PR #51315](https://github.com/vllm-project/vllm/pull/51315)
- **GLM-5.3 P/D 在 GB200 上 —— KV-connector 描述符瓶颈**:每个 TP rank 91k–120k 个描述符的传输使 MNNVL/cuda_ipc 慢于 RDMA;跟踪项。[#55434](https://github.com/vllm-project/vllm/issues/55434)
- **长上下文混合 GDN 上的 DFlash**:相同设置在短上下文 DT=8 下约 218 tok/s,而在 185k 上下文 DT=4 下约 16 tok/s(对比关闭投机约 71 tok/s);目前没有按序列长度禁用的钩子。[#54691](https://github.com/vllm-project/vllm/issues/54691)

## 5. 稳定性与回归

大致按严重性/影响范围排序。

1. **`VLLM_BATCH_INVARIANT=1` 在 `pass_config.enable_sp` 开启时被违反。** 在混合配置(4× RTX PRO 6000,PCIe)上 batch-invariance 被静默破坏。两条执行路径出现分歧。尚无修复 PR。— [#56370](https://github.com/vllm-project/vllm/issues/56370)
2. **RDNA3 融合 MoE 硬编码了 2× 门控激活因子**,在 gfx1100 上破坏非门控(relu2)模型如 Nemotron-3。今日新开,已有 5 条评论。— [#56790](https://github.com/vllm-project/vllm/issues/56790)
3. **OTLP traces 端点初始化了 tracer 但从未发送 span**(`instrument_otel/manual_instrument_otel` 从未被调用)—— 在 `vllm-openai:0.29.0` 与开发版本上可观测性被静默丢失。— [#56696](https://github.com/vllm-project/vllm/issues/56696)
4. **DeepSeek-V4.1-Flash + DSpark 在 H200(SM90)上 Marlin MXFP4 MoE 的 draft warmup 阶段,在 `map_draft_to_target` 中触发 CUDA 设备端断言。** 修复 PR:[#56448](https://github.com/vllm-project/vllm/pull/56448) —— 限制 DFlash/DSpark 的 profiling dummy-run 查询批大小,修复 [#56443](https://github.com/vllm-project/vllm/issues/56443)。
5. **仅 sm100(B200/B300):CUDA graph 回放在两臂 torch.compile 关闭时改变了 gemma-4-26B-A4B-it 的 greedy 输出。** 在 H200 / RTX PRO 6000 / A100 上位级一致 —— 因此这是一个真实的仅 sm_100 的可复现性 bug。— [#55238](https://github.com/vllm-project/vllm/issues/55238)
6. **DFlash + YaRN:相同的 1.04M prompt 完全没有前缀缓存复用**,而仅 target 路径可复用约 1.039M token。— [#54094](https://github.com/vllm-project/vllm/issues/54094)
7. **混合 mamba:在显式指定 `--block-size` 时,前缀缓存恢复出现非法内存访问**(state 列被错误的 block size 初始化)—— 影响 Qwen3.8-27B W4A16。— [#53142](https://github.com/vllm-project/vllm/issues/53142)
8. **Qwen3.5 增量多模态请求上的多轮前缀缓存未命中** —— 首个 sibling 仍未命中的问题超出了最初报告的 4→5 图像场景。修复部分落地于 [#56818](https://github.com/vllm-project/vllm/pull/56818)(关联 [#43587](https://github.com/vllm-project/vllm/issues/43587))。
9. **Whisper 段级时间戳在音频 > 30s 时每段漂移约 0.5s**(1s 低能量窗口切片)。— [#32588](https://github.com/vllm-project/vllm/issues/32588)
10. **在 SM120(ROCm 路径)上使用 Nemotron-3.5-Lightning-30B-A3B-NVFP4、marlin MoE、混合 Mamba 持续多小时负载时,反复出现全芯片 Xid 13 warp 错误。** — [#52225](https://github.com/vllm-project/vllm/issues/52225)
11. **KDA / 门控 delta rule 的分块扫描缓冲区未被纳入内存剖析** —— 在大 `--max-num-batched-tokens` 下运行时 OOM。— [#54775](https://github.com/vllm-project/vllm/issues/54775)
12. **文件系统 KV 卸载层没有完整性校验也没有 I/O 活性边界。** 提议数据完整性 + 活性工作的 RFC。— [#54363](https://github.com/vllm-project/vllm/issues/54363)(RFC)
13. **vLLM 引擎进程启动时长期存在的 hang 问题**(16 个月后仍在收到更新)。— [#17676](https://github.com/vllm-project/vllm/issues/17676)
14. **DSv4 在 RTX PRO 6000(8× Blackwell)上加载失败** —— Blackwell 模型加载跟踪项。— [#40821](https://github.com/vllm-project/vllm/issues/40821)
15. **GLM-5.3-Flash 在多轮 agent 场景下退化为重复 token 的"乱码"。** — [#56605](https://github.com/vllm-project/vllm/issues/56605)
16. **T4 上 Triton OOM**(共享内存需求 80k vs 硬件上限 65k)。— [#36802](https://github.com/vllm-project/vllm/issues/36802)

值得关注的投机解码生态更新:**DSpark draft-to-target `lm_head` 映射修复**(针对填充词表的 draft)见 [PR #55133](https://github.com/vllm-project/vllm/pull/55133);**DDTree** 投机解码作为 DFlash 继任者在 [#40809](https://github.com/vllm-project/vllm/issues/40809) 中提出;**UNO**(扩散增强 LLM)RFC 在 [#55267](https://github.com/vllm-project/vllm/issues/55267);**MoRI-IO 针对 MTP 的 KV block-offset 修复** 见 [PR #55053](https://github.com/vllm-project/vllm/pull/55053)。

## 6. 对应用开发者的意义

- **若依赖确定性解码**(可复现评测、RL rollout、测试钉版),在 [#56370](https://github.com/vllm-project/vllm/issues/56370) 解决前不要开启 `pass_config.enable_sp`。在 SP 介入时,`VLLM_BATCH_INVARIANT=1` 并不构成保证。
- **若在多轮 agent 循环中使用 Qwen3.5(或任何 Mamba/Attention 混合模型)并涉及多模态输入**,增量轮次会出现前缀缓存未命中。[PR #56818](https://github.com/vllm-project/vllm/pull/56818) 在 0.29.0 上收窄了原始复现范围,但尚未覆盖"producer 越过最终多模态特征继续执行"的路径。请钉到已知状态并重新验证。
- **若在长上下文混合 GDN 模型上使用 DFlash/DSpark**,请禁用。在 Qwen3.5 的约 185k 上下文下,投机路径造成 4× 减速;目前尚无按序列长度禁用的钩子。跟踪 [#54691](https://github.com/vllm-project/vllm/issues/54691)。
- **若依赖 OTLP 进行 trace 导出**,在 0.29.0 上使用 `--otlp-traces-endpoint` 时,你的 span 很可能没有被导出。请在 collector 端验证并跟进 [#56696](https://github.com/vllm-project/vllm/issues/56696)。
- **若在 RDNA3(gfx1100/1151)上运行非门控 MoE 模型(如 Nemotron-3)**,融合 MoE 路径会执行错误。在 [#56790](https://github.com/vllm-project/vllm/issues/56790) 解决前,请将 RDNA3 MoE 视为仅支持门控。
- **若在 GB200 上为 GLM-5.3 运行 P/D 解耦**,优先选择 RDMA 传输而非 MNNVL/cuda_ipc;瓶颈在于描述符提交路径,而非网络带宽([#55434](https://github.com/vllm-project/vllm/issues/55434))。
- **若在大 `--max-num-batched-tokens` 下提供 KDA 服务**,预期会出现 OOM —— 分块扫描缓冲区未被纳入启动期内存剖析。在 [#54775](https://github.com/vllm-project/vllm/issues/54775) 落地前,请预留余量或调低 `max-num-batched-tokens`。
- **CI 运维人员**:将 `VLLM_ENABLE_SCALE_OUT_ENDPOINTS=1` 替换为 `vllm serve --enable-scale-out`(依据 [#56819](https://github.com/vllm-project/vllm/pull/56819))。
- **新解锁的能力**:Nanbeige 4.2 通过 transformers 后端、Ling-3.0-flash-VL 拥有完整视觉编码器 CUDA graph、Nemotron VL 语言模型 LoRA,以及 Kimi K3 SP+PP —— 在 main 分支的 vLLM OpenAI server 上均可直接使用。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 每日速递 — 2026-09-14

## 今日要点

- 过去 24 小时内**没有发布新版本**，但项目仍处于高强度开发中，约 500 个 PR 有更新、48 个 issue 处于活跃状态。今日的主线话题是 **Ascend NPU 的逐步成熟**（HiCache L3、NCCL 权重加载器、上下文并行、MXFP4 MoE 量化），以及 **DeepSeek V4/DSpark 的性能加固**（AMD 上的 MegaMoEv2、NVLink 集合通信、B300 MegaMoE buffer 修复）。
- 一批**高严重度稳定性 bug** 有更新或新提交：Qwen3.8-Flash-Next-FP8 在 22 个并发请求时出现 QSA 非法内存访问崩溃（#37633）、B300 上 MXFP8FP4/W4A8 MegaMoE 路径出现 `CUDA_ERROR_ILLEGAL_ADDRESS`（#37559）、GLM-5.3 在 disagg + dp-attention + spec decode 组合下崩溃（#39072），以及 GLM-5.x NoPE MLA 在 SM120 上完全无法运行（#39302）。今日新开的两个 bug（#39412 Rust 前端丢弃 PD bootstrap 参数、#39342 mixed-chunk 破坏 mamba radix cache）需要尽快处理。
- 在**投机解码与 HiCache** 方面：split-KV EAGLE verify 正在 CUDA Triton 上启用（#39316）、HiCacheFile 的混合池前缀查找正在修复（#39147）、HiCache + write-back 场景下可用总 token 数已有一项改进合入（#38681，已关闭）。

## 发布与破坏性变更

_过去 24 小时内未发布任何版本。_

## 新模型与硬件支持

- **DeepSeek V4.1 / DSpark** — NVLink 集合通信与 DSpark draft head 在 NCCL ring 上的词表 gather（[#39414](https://github.com/sgl-project/sglang/pull/39414)）。按有效 SM 预算修复 MegaMoE buffer 的分配/缓存（[#39223](https://github.com/sgl-project/sglang/pull/39223)）。在 AMD 上通过 Aiter/FlyDSL 集成 MegaMoEv2（[#35619](https://github.com/sgl-project/sglang/pull/35619)）。修复 NPU 上 DSpark verify 时 SWA mask 的设备不匹配问题（[#39353](https://github.com/sgl-project/sglang/pull/39353)）。
- **GLM-5.x 系列** — bug 排查仍在进行；性能/功能跟踪持续推进（[#33636](https://github.com/sgl-project/sglang/issues/33636)，相关 bug #39072、#39302、#29162）。
- **Qwen3.8-Next-Flash / -Flash-Next-FP8** — 新增 prefill 上下文并行（[#39062](https://github.com/sgl-project/sglang/pull/39062)）；在 8×H20 上以 TP8 运行时观察到 CUDA 非法内存访问 bug（[#37633](https://github.com/sgl-project/sglang/issues/37633)）。
- **Ascend NPU 上的 Qwen3.5 MoE** — 面向 fused experts 的在线 + 离线 W4A4 MXFP4 量化（[#32602](https://github.com/sgl-project/sglang/pull/32602)）。
- **MiniMax-M3（又名 MiniMax-M3）稀疏 prefill** — 原生 SM90 FP8 QK block-score kernel 作为第 1 步落地，第 2 步的 Triton 实现保持不变（[#39345](https://github.com/sgl-project/sglang/pull/39345)）。
- **Ascend A3 上的 MiniMax H3** — 推理已可运行，但收到精度问题反馈（[#39386](https://github.com/sgl-project/sglang/issues/39386)）。
- **Intel CPU 上的 MiniMax-M2.7** — 剩余优化 TODO 的跟踪（[#26439](https://github.com/sgl-project/sglang/issues/26439)）。
- **LLaDA2.2** — Block-routing MoE 服务端支持（[#31768](https://github.com/sgl-project/sglang/pull/31768)）。
- **Step3p7** — 批量多模态图像特征（multi-item 视觉编码）（[#38874](https://github.com/sgl-project/sglang/pull/38874)）。
- **Ascend NPU 上的 Jet-Nemotron-2B** — 初步的 NPU dispatch 路径，使 warmup 不再触达 CUDA 的 recurrent gated-delta-rule kernel（[#32805](https://github.com/sgl-project/sglang/pull/32805)）。
- **SenseNova-U1/U1.5** — 已开立功能与性能跟踪，以上游 OpenSenseNova 参考实现为锚点（[#37742](https://github.com/sgl-project/sglang/issues/37742)）。
- **Nemotron-3-Ultra-550B-A55B** — SM100 性能跟踪仍在继续（[#27286](https://github.com/sgl-project/sglang/issues/27286)）。
- **Ascend NPU 基础设施** — 基于 MemCache 存储后端的 HiCache L3（[#36188](https://github.com/sgl-project/sglang/pull/36188)，已关闭）；HiCache 适配 K3 混合（MLA + KDA/mamba）模型（[#39415](https://github.com/sgl-project/sglang/pull/39415)）；`--remote-instance-weight-loader` 的 NCCL 后端（[#39413](https://github.com/sgl-project/sglang/pull/39413)）；NPU 上的 DeepSeek-V4 prefill 上下文并行（带 layersplit 的 interleave/zigzag）（[#38251](https://github.com/sgl-project/sglang/pull/38251)）；面向 NPU 的 CUDA graph 序列化文档（[#39091](https://github.com/sgl-project/sglang/pull/39091)）；PR 测试代码覆盖率收集（[#38339](https://github.com/sgl-project/sglang/pull/38339)）；CI `multimodal_gen` 过滤器修复 + 每日定时运行（[#39411](https://github.com/sgl-project/sglang/pull/39411)）。

## 性能与优化

- **NVLink 上的 DSV4.1 draft head** — DSpark 的 `markov_w2` 在 TP 间分片，在 bs=1 时每个 verify 周期会产生约 75 µs 的 all-gather 开销（5 次 13–18 µs 的 NCCL ring 跳数 + 一次 5 µs 的 fp32 reduce）。新 PR #39414 通过 NVLink 集合通信和即时词表 gather 来解决这一问题。
- **异构 SM 预算下的 MegaMoE buffer 尺寸** — DeepGEMM 根据运行时 SM 数量推导 buffer 布局；此前 SGLang 的 SM 预算过滤会导致 buffer 偏大。[#39223](https://github.com/sgl-project/sglang/pull/39223) 将分配重新对齐到有效 SM 预算，并对空闲 DP rank 做了 graph-safe 处理。
- **CUDA 上的 Split-KV EAGLE verify（Triton 后端）** — 目前通过 `is_gfx95_supported()` 仅对 AMD MI35x 开启；在 CUDA 上会回退到 `extend_attention_fwd`。[#39316](https://github.com/sgl-project/sglang/pull/39316) 移除了该门控，在 Triton CUDA 上解锁了 flash-decode 风格的 target-verify grid。
- **HiCache + write-back** — HiCache 与 write-back 组合时可用的前缀缓存总 token 数得到改进（[#38681](https://github.com/sgl-project/sglang/pull/38681)，已关闭）。
- **EAGLE QSA indexer 导入** — 此前即使在非 Qwen-sparse 模型上也会强制导入 Tilelang，导致部分镜像上投机解码不可用。[#39082](https://github.com/sgl-project/sglang/pull/39082) 将该导入推迟到 early return 之后。

## 稳定性与回归

按可能的生产影响程度排序。若已有开启/已落地的修复 PR，将予以注明。

| 严重度 | Issue | 概要 | 修复状态 |
|---|---|---|---|
| 🔴 高 | [#37633](https://github.com/sgl-project/sglang/issues/37633) | Qwen3.8-Flash-Next-FP8（TP8、8×H20、BF16 KV）在约 22 个并发请求时，QSA extend forward 出现 CUDA 非法内存访问。设置 `CUDA_LAUNCH_BLOCKING=1` / `--disable-overlap-schedule` 可抑制该问题。 | 未修复 |
| 🔴 高 | [#37559](https://github.com/sgl-project/sglang/issues/37559) | B300 上搭配 `sgl-deep-gemm` 0.1.7 时，MXFP8FP4/W4A8 MegaMoE 路径出现 `CUDA_ERROR_ILLEGAL_ADDRESS`。 | 未修复 |
| 🔴 高 | [#39072](https://github.com/sgl-project/sglang/issues/39072) | GLM-5.3 在 disagg decode + dp-attention + spec decode 组合下崩溃。 | 未修复 |
| 🔴 高 | [#39302](https://github.com/sgl-project/sglang/issues/39302) | GLM-5.x NoPE MLA（`qk_rope_head_dim=0`，absorbed head dim = `kv_lora_rank` 512）无法在 SM120（RTX PRO 6000 Blackwell）上运行——所有 DSA prefill/decode sparse-MLA 后端均不可用。 | 未修复 |
| 🔴 高 | [#39412](https://github.com/sgl-project/sglang/issues/39412) | **今日新开。** Rust 前端的 OpenAI 端点在通过 `dynamo-protocols` lower 到 `GenerateRequest` 的过程中，静默丢弃 PD bootstrap 参数（`bootstrap_host/port/room`）。 | 未修复 |
| 🔴 高 | [#39342](https://github.com/sgl-project/sglang/issues/39342) | **今日新开。** 在混合 GDN 模型上，`--enable-mixed-chunk` 会损坏 mamba radix cache 检查点（混合批次跳过了 extra_buffer 写入，但 slot 仍被捐出）。 | 未修复 |
| 🟠 中 | [#39147](https://github.com/sgl-project/sglang/issues/39147) | 当所需的辅助池无法满足前缀时，`HiCacheFile.batch_exists_v2()` 会将无法恢复的混合前缀报告为命中。 | 未修复 |
| 🟠 中 | [#39063](https://github.com/sgl-project/sglang/issues/39063) | SM120 grouped FP8 DeepGEMM 权重准备跳过了 UE8M0 重量化保护。 | 未修复 |
| 🟠 中 | [#31206](https://github.com/sgl-project/sglang/issues/31206) | `sgl-router` PD：断路器已打开却仍向 decode 派发请求，导致 prefill 永久“假死”。 | 未修复 |
| 🟠 中 | [#34861](https://github.com/sgl-project/sglang/issues/34861) | NPU：Router GEMM

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-14

## 今日要点

今天连续发布了一批以稳定性为主的构建版本（b10944 → b10955），其中最值得关注的是解决了由 **ggml-cpu 预编译头**引发的 **macOS arm64 堆内存损坏**问题（[b10955 / PR #28882](https://github.com/ggml-org/llama.cpp/pull/28882)），以及一个 **SYCL oneDNN scratchpad 池释放顺序违规**问题（[b10952 / PR #28704](https://github.com/ggml-org/llama.cpp/pull/28704)）。Vulkan 仍然是回归问题的高发地带，目前有三个未解决的高严重度 Issue，涵盖 RDNA3 prompt-processing 性能下降和 Flash-Attention 的 SCALAR 回退。模型方面，**Maple 20B-A1B 三值 MoE** 架构已完成合并（[PR #27000](https://github.com/ggml-org/llama.cpp/pull/27000)），GigaChat 3.5 432B-A28B 的相关工作仍在进行中。

## 发布与破坏性变更

过去 24 小时内发布了八个构建版本，请将此视为一个"向前推进"的窗口期：

| 构建版本 | 变更 | PR / Issue |
|---|---|---|
| **b10955** | ggml-cpu：禁用 PCH + 修复 `CACHE_LINE_SIZE` 歧义（macOS arm64 上的堆内存损坏） | [#28882](https://github.com/ggml-org/llama.cpp/pull/28882)，修复 [#28858](https://github.com/ggml-org/llama.cpp/issues/28858) |
| **b10952** | SYCL：修复 oneDNN scratchpad 破坏池释放顺序的问题 | [#28704](https://github.com/ggml-org/llama.cpp/pull/28704)，修复 [#28660](https://github.com/ggml-org/llama.cpp/issues/28660) |
| **b10951** | common：将 `llama_n_rs_seq` 移到 `llama_decode` 之前；移除 `goto` | [#28749](https://github.com/ggml-org/llama.cpp/pull/28749) |
| **b10950** | ggml-cuda：在不支持硬件 BF16 的设备上回退至 F32（NVIDIA pre-AMPERE、AMD pre-RDNA3 / pre-CDNA） | [#28846](https://github.com/ggml-org/llama.cpp/pull/28846) |
| **b10948** | tests：将 `HY_V4` 从 WebGPU `test-llama-archs` 中排除 | [#28855](https://github.com/ggml-org/llama.cpp/pull/28855) |
| **b10947** | models：在 nemotron-h NextN/MTP 循环中，对专家 FFN 尺寸回退做除零防护 | [#28779](https://github.com/ggml-org/llama.cpp/pull/28779) |
| **b10946** | ggml-cpu(s390x)：对仅 VXE 的 repack 辅助函数加防护 | [#28775](https://github.com/ggml-org/llama.cpp/pull/28775) |
| **b10944** | SYCL：修复 `get mem error`（不支持的 zes API）+ Level Zero SDK 检测 | [#28227](https://github.com/ggml-org/llama.cpp/pull/28227) |

**迁移提示：** PCH 移除（[#28091](https://github.com/ggml-org/llama.cpp/pull/28091)）正根据 [PR #28892](https://github.com/ggml-org/llama.cpp/pull/28892) 进行回滚——依赖 `UNITY_BUILD` / PCH 加速的下游构建配置，在修正后的 PCH 方案落地之前，增量构建速度会变慢。

## 新增模型与硬件支持

- **Maple 20B-A1B**（DeepGrove）— 三值 MoE，24 层，256 专家（激活 8 个），SWA-512 + 全局注意力比例为 3:1，**TQ1_0 / TQ2_0** 三值量化 — **已合并**（[PR #27000](https://github.com/ggml-org/llama.cpp/pull/27000)）。
- **GigaChat-3.5-432B-A28B** — 类 DeepSeek-V3 的 MLA + MoE 混合注意力架构，仍处于转换阶段（[PR #25342](https://github.com/ggml-org/llama.cpp/pull/25342)）。
- **ROCm Linux 构建矩阵** 现已加入 `gfx1103`（Radeon 780M iGPU）（[PR #28423](https://github.com/ggml-org/llama.cpp/pull/28423)）。
- **MiMo V2** SWA 模式加载修复（[PR #28865](https://github.com/ggml-org/llama.cpp/pull/28865)，修复 [#28831](https://github.com/ggml-org/llama.cpp/issues/28831)）。
- 模型加载正确性梳理：在多个架构中修正 `get_key_or_arr` 的误用（[PR #28868](https://github.com/ggml-org/llama.cpp/pull/28868)）。

## 性能与优化

- **Vulkan / Intel Arc A770** — 新增 IQ3_S MMQ 矩阵乘内核（绕过在 Intel 上未启用 `VK_KHR_cooperative_matrix` 的问题），[PR #28822](https://github.com/ggml-org/llama.cpp/pull/28822)。
- **SYCL top_k** — 采用 radix select 消除 K=2048（qwen3.8-flash-next）时的 CPU offload；**已合并**（[PR #28670](https://github.com/ggml-org/llama.cpp/pull/28670)）。
- **CUDA Flash Attention** — 在 Blackwell 上重构共享内存 swizzle；MHA swizzle 默认禁用，待按架构调优（[PR #28536](https://github.com/ggml-org/llama.cpp/pull/28536)）。
- **NVFP4 W4A8 路径** — 在 Blackwell 上对 NVFP4_W4A16 层强制使用 W4A8（默认 W4A4 路径不适用场景）（[PR #24364](https://github.com/ggml-org/llama.cpp/pull/24364)）。
- **RPC** — 哈希缓存限制仅用于权重传输（避免对激活值做哈希），[PR #28789](https://github.com/ggml-org/llama.cpp/pull/28789)。更大的 RPC 工作（`-sm tensor`、异步图计算、自定义 all_reduce）见 [PR #26610](https://github.com/ggml-org/llama.cpp/pull/26610)。
- **q8_0 量化** — 使用完整的 −128..127 范围（之前为 −127..127），与 q5_0/q6_0 对齐（[PR #25493](https://github.com/ggml-org/llama.cpp/pull/25493)）。
- **Server rerankers** — RANK 池化批处理拆分扩展至因果 LLM 重排序器（Qwen3、Qwen3-VL）（[PR #28876](https://github.com/ggml-org/llama.cpp/pull/28876)）。
- **CI / 测试基础设施** — fusion 基准增加 README 并扩大触发范围（[PR #28893](https://github.com/ggml-org/llama.cpp/pull/28893)）；KleidiAI 运行器从 22.04 升级到 24.04（[PR #28885](https://github.com/ggml-org/llama.cpp/pull/28885)）；新增 ARM `nrc=2` 测试（[PR #28850](https://github.com/ggml-org/llama.cpp/pull/28850)）；新增 s390x 非 VXE 构建覆盖（[PR #28776](https://github.com/ggml-org/llama.cpp/pull/28776)）。

## 稳定性与回归

按严重度从高到低排序。已修复项会明确标注。

| 严重度 | 领域 | Issue | 状态 |
|---|---|---|---|
|  Critical | ggml-cpu / macOS arm64 | PCH 导致的堆内存损坏（[#28858](https://github.com/ggml-org/llama.cpp/issues/28858)） | **已在 b10955 修复** |
|  Critical

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-14

## 1. 今日要点

过去 24 小时内没有新版本发布，但待处理队列中以 **prompt 缓存和工具调用正确性相关的 bug** 为主，直接影响 Claude Code、qwen3-coder 以及 Codex 兼容端点。好消息是，两项针对性修复已在进行中：**稳定的工具 schema 键排序**（[PR #18433](https://github.com/ollama/ollama/pull/18433)）以及 **JPEG EXIF 朝向归一化**（[PR #18432](https://github.com/ollama/ollama/pull/18432)）。存储清理和集成方面也有了进展，包括一项 blob 清理修复以及新增的 `ollama launch` / 可观测性工具条目。

## 2. 发布与破坏性变更

过去 24 小时内无新增打标签的发布版本。没有合并任何破坏 API 或配置的更改。

## 3. 新模型与硬件支持

- **ROCm 10 on Windows** — 已开启功能请求（[#18435](https://github.com/ollama/ollama/issues/18435)），引用了 AMD 针对 Ryzen AI Max 395 的官方 AI 生态兼容性矩阵。尚无代码改动。
- **新模型请求：** [Gnani Evon-v3.3 30B-A3B](https://github.com/ollama/ollama/issues/18427)、[SARVAM-30b/105b](https://github.com/ollama/ollama/issues/14319)。
- **Vulkan 集成 GPU** — 针对 Virtio-GPU/Venus 及其他集成 Vulkan 适配器的回归修复（模型加载超时）已落地并关闭：[PR #18124](https://github.com/ollama/ollama/pull/18124)（`llama-server` 直接 I/O，与 CUDA/ROCm 对齐）。
- **Windows 图像生成** — [PR #13806](https://github.com/ollama/ollama/pull/13806) 已关闭（包含等待上游合并的 MLX/MLX-C 补丁）。
- **集成 / 启动目标：** [Atomic Agent](https://github.com/ollama/ollama/pull/17992) 已添加到 `ollama launch`；[Genie](https://github.com/ollama/ollama/pull/18428) 已添加到桌面集成；[ollama-top](https://github.com/ollama/ollama/pull/18436) 已添加到可观测性工具；[n8n + ComfyUI 示例](https://github.com/ollama/ollama/pull/18316) 已更新。

## 4. 性能与优化

- **qwen3-coder 的 prompt 缓存命中率已恢复：**[PR #18433](https://github.com/ollama/ollama/pull/18433) 修复了 [#18430](https://github.com/ollama/ollama/issues/18430)，通过以确定性顺序渲染工具的额外 schema 键，而非依赖 Go 的随机 map 迭代。相同的 `/api/chat` 和 `/v1/chat/completions` 请求现在将生成相同的 prompt。
- **Responses-API 续传支持：**[PR #18434](https://github.com/ollama/ollama/pull/18434) 在 OpenAI 兼容路径中新增 `previous_response_id` 续传支持。更大的命名空间

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-14

## 1. 今日要点

当前活动主要由**会计与遥测正确性**工作主导：两个未解决的 bug 报告 Responses↔Chat 桥接会丢失增量推理 delta 和明文推理文本（#40887、#40654），`/model/info` 列表端点正在用 `orjson` 重写，因为一个 973 行的响应被测得耗时约 440 ms（#41061）。稳定性方向上，一个严重的预算重置边界 case 被提交（#39370）——`budget_duration=null` 且 `budget_reset_at` 过期的行会导致每次重置 tick 都把花费静默清零，相关修复 PR #40940 处理了同一类问题的缓存失效侧。

## 2. 发布与破坏性变更

过去 24 小时没有发布任何版本。从现有数据中也看不到 API 或配置层面的破坏性变更。

## 3. 新模型与硬件支持

- **Opper provider** —— PR #36075 新增了一个仿照 OpenRouter 建模的 `opper/` provider，带有 600+ 模型网关目录的价格映射条目和 `usage.cost` 转发。
- **Bourse provider（提议中）** —— Issue #41042 请求新增 Bourse，一个 OpenAI 兼容的转售商；目前它作为通用 `openai/` 端点工作，但缺少一等路由支持。
- **Ollama 的 Rust 管线对齐** —— PR #40326 将 `ollama_chat` 路由到 Rust 核心，并保留 Python fallback，同时增加了 provider 对齐的 e2e 测试。
- **Vertex AI Claude 版本化 ID** —— Issue #40363 报告 `vertex_ai/claude-haiku-4-5*` 条目的输出 token 上限被卡在 8192 而非 64000，并且版本化 ID 会得到一个静默的 4096 `max_tokens` 默认值。
- **ChatGPT OAuth device-flow provider** —— Issue #41017（已关闭）端到端验证了 `chatgpt/` provider，针对 `chatgpt.com/backend-api/codex/responses` 使用 `gpt-5.6-sol`，暴露出响应解析的空白。

## 4. 性能与优化

- **代理 `/model/info` 序列化** —— PR #41061 用 `orjson` 一次性序列化约 6 MB、973 行的列表并返回预构建的 `Response`，消除了 FastAPI 每次请求的 `jsonable_encoder` 遍历。基线约 440 ms。
- **异步成功处理器去重** —— PR #41058 阻止 `wrapper_async` 重新提交同步成功流水线，后者导致每次调用运行两次日志回调并在日志对象上产生竞态。
- **类型安全重构** —— PR #40251 在 114 个后端文件中移除了 715 个 `Any` 错误（属于跨 1160 个文件、10720 个错误的整体清理的一部分），让未类型化 payload 在 review 中可见。
- **终端用户预算重置批处理** —— PR #40587（已关闭）将终端用户 ID 过滤分块为 30000-ID 一批，以保持在 PostgreSQL 的 bind-variable 限制内。

## 5. 稳定性与回归

按严重性排序；未解决项在有候选修复时一并标注。

**高严重性 —— 会计与花费正确性**

- **#39370** —— `budget_duration=null` 且 `budget_reset_at` 过期的行每次 tick 都会被重置任务拾取，并永久静默清零花费。尚无修复 PR。
- **#29913**（已关闭）—— 流式 `/v1/responses` 永远不写 `LiteLLM_SpendLogs` 行，导致请求未被计费。
- **#40736** —— 流式 usage 合并器在显式零值更新后保留过期的 cache-write tokens；与 #34497（Bedrock Invoke 丢失 cache 计数）和 #15263（更早的负数 cached-prompt-cost）相关。
- **#22984** —— VLLM `cached_tokens` 没有进入成本计算器，因此 VLLM 后端的部署忽略了 cached-token 定价。
- **#40649** —— Admin UI 模型编辑会持久化派生定价；价格映射重新加载后 Azure 花费记录为 $0（与 #30081 相关）。
- **#29955**（已关闭）—— 响应缓存 key 仅从请求参数派生，因此多团队代理上可能跨租户复用缓存。
- **#40940**（修复 PR，未合并）—— 在预算重置时使过期的 key/user/team 缓存失效并重试 Redis spend-counter 重置；与 #40587 互补。

**高严重性 —— 协议与 provider 转换**

- **#40887** —— Responses-to-Chat 流式桥接从不映射增量 `delta.reasoning_item`，仅在终态事件上附加 `reasoning_items`，丢失推理进度和缓存的推理状态。
- **#40654** —— 同一个 Responses-to-Chat 桥接在流式和非流式结果中都会丢弃 provider 的明文 `reasoning_text`。
- **#30301** —— LiteLLM 内部的 `optional_params` 泄漏进请求体，并被严格的 provider 拒绝；同一类失败在多个 issue 中重复出现。
- **#40583** —— `custom_code` 和 `tool_permission` 预调用 guardrail 无法看到或阻止通过 Anthropic `/v1/messages` 投递的 MCP 工具。
- **#40860**（修复 PR，未合并）—— 将 Anthropic `content_filter` 翻译为 `refusal`，使被过滤的响应不再与成功响应不可区分。
- **#40853**（修复 PR，未合并）—— Responses WebSocket 在上游握手前丢弃了显式的部署 API key。
- **#41064**（修复 PR，未合并）—— Bedrock Nova Sonic 在 WebSocket 握手之后的失败被吞掉，导致路由器从不计入失败、从不进入冷却、并过早 ack `session.updated`。
- **#25532**（已关闭）—— WebSocket `/v1/responses` 要求 `model` 作为 query 参数而非放在 `response.create` payload 内，破坏了 OpenAI 规范。
- **#29810**（已关闭）—— `/v1/responses` 上的 `cache_control_injection_points` 是静默 no-op，并触发确定性的 Claude 工具调用循环直至 MaxTurns。
- **#27470**（已关闭）—— 路由器冷却 TTL 把 429 限流和 429 配额耗尽混为一谈，二者的重试语义差异很大。
- **#40363** —— Vertex AI Claude 版本化 ID 和 `vertex_ai/claude-haiku-4-5*` 映射条目的 `max_tokens` 默认值/上限有误。

**中等严重性 —— 可运维性与 UX**

- **#10788** —— `LITELLM_LOG=ERROR` 无法在代理上静默每次请求的 `INFO` 行；长期未解决，无修复。
- **#26097** —— 自托管安装失败，因为安装脚本中不允许 `prisma generate`。
- **#41029**（已关闭）—— Admin UI 侧边栏导航触发整页重载加上每次路由的 404 预取风暴，来自 Next 的 link prefetcher。
- **#40553**（已关闭）—— `/v1/models` 中列出的公共团队别名在 `GET /v1/models/{id}` 上丢失模型元数据。
- **#19105** —— 关于 team 与 team-member 预算限制配置的混淆；最初是一个讨论帖。
- **#39057** —— 设计问题：在缓存命中时，`spend=0` 但 `tokens` 重放原始 usage —— 下游报告应该按哪一列聚合？
- **#33371** —— RFC：来自 provider 的、来自路由器的机器可读 provider-error / 路由健康契约（仿照 OpenRouter 的 `openrouter_metadata`）。

**中等严重性 —— 由测试捕获的内部回归**

- **#31427** —— 当同一值出现在两个并列（非嵌套）位置时，`safe_dumps` 出现误报循环引用。
- **#41058**（未合并 PR）—— 异步成功流水线每次调用运行两次。
- **#31822**（未合并 PR）—— Realtime 在转写完成时自动注入 `response.create`，即使没有活跃的 `realtime_input_transcription` guardrail。
- **#31204**（未合并 PR）—— Anthropic `count_tokens` 丢弃自定义的 `api_base`/`ANTHROPIC_API_BASE`。
- **#41056**（未合并 PR）—— `/v1/moderations`、Assistants、threads 和 batches 响应从不携带 `x-litellm-call-id`；header 构建器现在会回退到响应元数据中的 call-id。
- **#35150**（未合并 PR）—— spend-adjustment 注册表中的活跃锁驱逐可能丢失并发扣费和退款。
- **#41029**（已关闭）—— Admin UI 整页重载 + 404 预取风暴。

## 6. 对应用开发者的意义

- **经过代理的推理流目前是有损的。** 如果你通过 `/v1/chat/completions` 路由 `responses` 风格的模型，预期会丢失增量推理 delta（#40887）和被丢弃的 `reasoning_text`（#40654）。在这些问题修复前，对推理关键流程更倾向于直接命中原生 `/v1/responses` 端点或上游 provider。
- **多租户部署应重新验证缓存隔离。** 跨租户响应缓存泄漏（#29955）已关闭，但运行旧版本的部署应审计其缓存 key 是否真正包含 team/virtual-key，而不仅仅是 model + prompt。
- **当前版本中边界行的预算重置行为是不安全的。** `budget_duration=null` 加上过期 `budget_reset_at` 的 team/key 每次 tick 都会被静默清零（#39370）；在上游修复落地前，应将这些配置视为有风险。一旦 #40940 合并，也应一起应用以获得缓存失效修复。
- **cached token 的成本核算是不一致的。** VLLM 部署完全忽略 cached-token 定价（#22984），且流式 usage 可能携带过期的 cache-write tokens（#40736）。在这些问题修复前，依赖 cached-token 计算的仪表盘应与 provider 原始 usage 交叉核对。
- **`/model/info` 即将显著变快。** 973 行列表通过 `orjson` 短路从约 440 ms 下降（#41061）将影响针对该端点的所有控制面轮询 —— 包括 UI 列表和外部库存同步任务。
- **Anthropic content-filter 响应现已可区分。** PR #40860 将 `content_filter` 映射为 `refusal`，因此你下游的 refusal 处理路径将在原本被遗漏的地方触发。如果有逻辑依赖旧行为，请在升级前复查。
- **Bedrock Nova Sonic 上的实时健壮性正在收紧。** PR #41064 确保延迟的握手失败能到达路由器，因此失败现在会正确触发冷却/回退，而不是静默消耗会话。
- **新的构建目标即将到来。** Ollama 正在迁移到 Rust 核心（#40326）并附带对齐测试；一旦该路径成为默认，Ollama 路由上的代理启动和每次请求开销预计会发生变化。
- **仍然存在的运维摩擦。** 你仍然无法通过 `LITELLM_LOG` 静默请求级 `INFO` 日志（#10788），自托管安装可能因 `prisma generate` 权限失败（#26097），旧版本上 Admin UI 在每次侧边栏点击时都会整页重载（#41029，已关闭 —— 请确认你运行在修复版本上）。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-14

## 今日要点

重点关注 Studio 视频/图像扩散栈中的 NVFP4 量化 —— 三个协调推进的 PR（#10883、#10729、#10730）引入了基于 flashinfer 后端的逐层和整模型 FP4，以及托管的预量化检查点；与此同时，默认精度阶梯调整（#10888）使所有 GPU 档位优先选用 int8。平台广度也有所扩展：首个官方 AMD ROCm Docker 镜像（#10820）发布，工具与 MCP 基础设施新增了 Parallel Search MCP 提供方（#10286）以及 MCP 工具的逐服务器图像附件（#10871）。

## 版本发布与破坏性变更

过去 24 小时内无新版本发布。若干已合并/已关闭的 PR 隐含了面向现有部署的行为变更，请仔细审阅：

- **#9222（已合并）** — Linux 上的 Unsloth Studio Desktop 现在默认使用原生 OS 信任库的 TLS；AppImage/.deb 启动器不读取 shell profile，因此不再需要设置 `UNSLOTH_STUDIO_NATIVE_TLS=1`。([PR #9222](https://github.com/unslothai/unsloth/pull/9222))
- **#10888（开放中）** — 数据中心级 Ada/Hopper/Blackwell 显卡上的 `auto` transformer 精度现在优先选择 int8 而非 fp8（此前仅消费级显卡如此）。对处于 auto 模式的用户属于行为变更。([PR #10888](https://github.com/unslothai/unsloth/pull/10888))
- **#10687（已关闭/已替代）** — DGX Spark（GB10）集成 GPU 的显存容量现在采用统一系统池（与 MPS 一致），因此 flux.2-klein 量级的负载不会再因误报 OOM 而被拒绝。([PR #10687](https://github.com/unslothai/unsloth/pull/10687))

## 新增模型与硬件支持

- **视频 DiT 的 NVFP4 整模型量化** — Wan2.2-TI2V-5B、Wan2.2-T2V-A14B（两个专家均支持）、HunyuanVideo-1.5（480p/720p）；采用 torchao 后端并提供托管预量化去噪器。([PR #10729](https://github.com/unslothai/unsloth/pull/10729))
- **图像 DiT 的 NVFP4 逐层量化 + flashinfer FP4 后端** — GPTQ 构建器、烘焙的激活缩放因子、受门控的自动阶梯入口。([PR #10730](https://github.com/unslothai/unsloth/pull/10730))
- **Flashinfer NVFP4 内核项** — 设备守卫、持久化屏障、bias 路径、缓存分派。([PR #10731](https://github.com/unslothai/unsloth/pull/10731))
- **官方图像默认使用托管的 INT8/FP8 检查点**（如可用）— 类似于 MiniMax H3 托管去噪器模式。([PR #10883](https://github.com/unslothai/unsloth/pull/10883))
- **AMD ROCm Docker 镜像** — 支持 RDNA2/3/4 与 CDNA，镜像现有 CUDA 镜像的 `docker/` 目录结构与 `build.sh`/`run.sh` 入口脚本。([PR #10820](https://github.com/unslothai/unsloth/pull/10820))
- **Krea2 LoRA 训练** 由用户提出请求（[Issue #10881](https://github.com/unslothai/unsloth/issues/10881)）；尚未实现。

## 性能与优化

- **NVFP4 GPU 时间预算 + DiT VAE 解码编译**（[PR #10889](https://github.com/unslothai/unsloth/pull/10889)）— 度量阶段识别出去噪器 GEMM 与 VAE 解码为最高开销项；新增每次渲染预算，并已将 VAE 解码纳入编译路径。
- **自动精度阶梯优先尝试 int8**（[PR #10888](https://github.com/unslothai/unsloth/pull/10888)）— 消除了此前在 Ada/Hopper/Blackwell 上消费级/数据中心级分裂、将 fp8 排在前列的逻辑。
- **API 推理并发闸门**（[PR #5482](https://github.com/unslothai/unsloth/pull/5482)）— 新增 `UNSLOTH_API_MAX_CONCURRENCY` / `--api-max-concurrency` 以及 `wait`/`reject` 队列策略（`UNSLOTH_API_QUEUE_POLICY`），默认仍为单并发请求。
- **DGX Spark 统一显存预算**（[PR #10687](https://github.com/unslothai/unsloth/pull/10687)）— 修正集成 CUDA 上 24 GB / 0 GB 可用显存的误分类。
- **工具审批期间释放 GGUF 上下文**（[PR #10673](https://github.com/unslothai/unsloth/pull/10673)）— 已暂存的会话现在会释放上下文预留，使排队中的会话可以使用所报告的空闲槽位。
- **Studio Markdown 渲染范围修复**（[PR #10924](https://github.com/unslothai/unsloth/pull/10924)，叠加于 #10688）— 消除了由错误的链接定义探测触发的整文档重渲染。

## 稳定性与回归问题

**新增报告（开放中）**
- **高优先级：在慢速 CPU、低内存主机上执行 `unsloth start pi` 时出现 `Error: terminated` 与重试耗尽**；修复位于 #10911。([Issue #10912](https://github.com/unslothai/unsloth/issues/10912))
- **高优先级：`--tensor-split` 被静默忽略** — 报告者称耗费数小时；暂无修复 PR 关联。([Issue #10355](https://github.com/unslothai/unsloth/issues/10355))
- **中优先级：Nemotron 注意力处理自至少 2026-07 起异常**；1 个 👍、6 条评论，仍未关闭。([Issue #7527](https://github.com/unslothai/unsloth/issues/7527))
- **中优先级：自上次 llama.cpp 更新以来，Studio Web UI 内存占用持续增长**；最新报告。([Issue #10921](https://github.com/unslothai/unsloth/issues/10921))
- **中优先级：由于冲突的 Run 设置，云端模型连接失败** — 已保存运行的参数与特定提供方的默认值发生冲突。([Issue #10917](https://github.com/unslothai/unsloth/issues/10917))
- **中优先级：Windows ARM64 桌面安装程序在 `pyarrow` 处失败**；CLI 安装可成功。([Issue #10875](https://github.com/unslothai/unsloth/issues/10875))
- **中优先级：`install.ps1` 被 Windows 杀毒软件标记**，阻断 PowerShell 更新路径。([Issue #10805](https://github.com/unslothai/unsloth/issues/10805))
- **低优先级：Docker 模式下不会持久化已下载的模型** — 文档需补充挂载卷说明。([Issue #10923](https://github.com/unslothai/unsloth/issues/10923))
- **低优先级：Intel ARC 140T 笔记本 GPU 在 Windows 上安装失败** — 自 2026-08-13 起仍处于开放状态。([Issue #8632](https://github.com/unslothai/unsloth/issues/8632))

**今日已关闭**
- 桌面版 GGUF `-ngl -1` 在模型迁移到 VRAM 后未释放系统内存。([Issue #9033](https://github.com/unslothai/unsloth/issues/9033))
- vLLM 连接拒绝 `min_p` / `logit_bias`。([Issue #10573](https://github.com/unslothai/unsloth/issues/10573))
- 重放的工具调用会对参数键进行排序，迫使 llama-server 重新处理多参数调用。([Issue #10791](https://github.com/unslothai/unsloth/issues/10791))
- 重复工具调用防护在文件变更后阻止重跑命令（例如重跑测试）。([Issue #10792](https://github.com/unslothai/unsloth/issues/10792))
- Studio 无法训练本地 HF 缓存中的模型 — 白名单缺失 `model-00000-of-00001.safetensors`。([Issue #10853](https://github.com/unslothai/unsloth/issues/10853))
- 在图像/视频工作区中，Tooltip 遮挡 Windows 窗口控件。([Issue #10226](https://github.com/unslothai/unsloth/issues/10226))

**针对开放问题的修复 PR**
- 项目重建时的 RAG 墓碑化：[#10583](https://github.com/unslothai/unsloth/pull/10583) 修复 [#10567](https://github.com/unslothai/unsloth/issues/10567)。
- torchcodec 0.12 ABI 豁免忽略 cu128 wheel 索引：[#10582](https://github.com/unslothai/unsloth/pull/10582) 修复 [#10434](https://github.com/unslothai/unsloth/issues/10434)。
- Docker Studio `unsloth-studio-update --ref` 终止容器内 Studio：[#10826](https://github.com/unslothai/unsloth/pull/10826)。

## 对应用开发者的影响

- **Studio 推理吞吐形态正在发生改变。** int8 优先的自动阶梯以及 NVFP4 图像/视频路径意味着，仅靠升级就可能改变模型所选用的量化精度。如果依赖确定性，请显式锁定精度；或在升级后审阅渲染基准。
- **MCP 工具正成为一等公民。** Parallel Search MCP（[PR #10286](https://github.com/unslothai/unsloth/pull/10286)）是一个无需鉴权、可免费使用的网络搜索提供方，无需 API 密钥即可启用；逐服务器 MCP 图像附件（[PR #10871](https://github.com/unslothai/unsloth/pull/10871)）为你提供默认关闭、向工具调用输入视觉信息的途径。已有用户请求"一键 MCP Hub"（[Issue #10822](https://github.com/unslothai/unsloth/issues/10822)）。
- **Agent 安全与 UX 原语正在落地。** 手动 `rm` 审批（[Issue #9972](https://github.com/unslothai/unsloth/issues/9972)）、可配置的工具响应截断（[Issue #10135](https://github.com/unslothai/unsloth/issues/10135)）、压缩前的自我备忘（[Issue #10904](https://github.com/unslothai/unsloth/issues/10904)），以及支持可复用 profile 的原生 Agent Builder（[Issue #10773](https://github.com/unslothai/unsloth/issues/10773)）—— 这些正是用户所期望的 Agent UX 形态。
- **数据准备获得一项正确性原语。** `audit_supervision`（[PR #10852](https://github.com/unslothai/unsloth/pull/10852)）是一份关于 SFT 数据集实际监督内容的预检报告 —— 在 Phi-3/4、Mistral `[INST]`、Qwen3，或使用 Llama-3 chat template 的非 Llama 模板上启用 `train_on_responses_only` 屏蔽指令 token 时尤为有价值。
- **数据集下载现在支持无需 HF 发布的导出方式**，通过 `GET /api/data-recipe/jobs/{job_id}/download`（[PR #10708](https://github.com/unslothai/unsloth/pull/10708)）— 默认 JSONL，可选 parquet zip。便于在 CI 流水线中消费 Data Recipes 而无需绕行 HF。
- **Linux 服务端的 Studio 用户将随 #9222 看到 TLS 处理方式的变更**；请确认企业 CA 证书仍可工作，因为证书校验现在由 OS 信任库驱动。
- **AMD 现已成为部署目标**，可通过 ROCm Docker 镜像使用。如果你此前因 AMD 硬件（RDNA2/3/4、CDNA）而对 Unsloth 工作负载持观望态度，这是首个端到端镜像。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 摘要 — 2026-09-14

## 今日要点
活动仍然集中在 **Codex 集成** 与 **跨协议翻译正确性** 上。新开启的 Issue（#1795）和对应的 PR（#1796）针对的是 Codex 桌面应用启动失败问题，该问题与 `fast_mode` 注入有关；PR #1784 则针对 OpenAI Responses 上游在翻译后的 Claude thinking 块泄漏到 `reasoning` 输入项时返回的 400 类错误。另一项 PR #1794 提高了网关的 config-acceptance 超时阈值，这是冷启动场景下长期存在的抖动来源。

## 发布与破坏性变更
*过去 24 小时无新发布。今日未公布任何公开 API 或配置格式变更。*

## 新模型与硬件支持
*当前数据集内未报告相关信息。*

## 性能与优化
- **PR #1794 [OPEN]** — *fix(gateway): 提高核心 config-acceptance 超时并使其可配置*。`spawnGatewayProcess` 中硬编码的 5 秒预算同时覆盖子进程启动 **以及** 真实网关入口的 `require()`，在较慢的机器上会引发误判失败。本次变更将该预算改为可配置项。（[PR #1794](https://github.com/musistudio/claude-code-router/pull/1794)）

## 稳定性与回归
按对用户的影响排序：

1. **[HIGH] Codex 桌面应用启动失败（Issue #1795 [OPEN]）。** 通过 CCR 启动 Codex profile 时，在 app-server 初始化握手之后立即失败，提示 *"This app server did not provide application network requirements."*。复现环境为 macOS 26.7.0 / ChatGPT desktop 26.908 / `codex-cli` 0.154.0-alpha.6.2。**修复：** [PR #1796](https://github.com/musistudio/claude-code-router/pull/1796) 阻止向 `null` 配置需求负载注入 `fast_mode`。（[Issue #1795](https://github.com/musistudio/claude-code-router/issues/1795)）
2. **[MEDIUM] 跨协议回退时出现 HTTP 400（Issue #1615 [CLOSED]）。** 当回退链中混合了 `anthropic_messages` 与 `openai_responses` 时，第一跳上的可重试失败会在第二跳上返回 400，因为执行器没有重新运行协议翻译。该 Issue 于今日关闭，处理方式在 Issue 讨论中引用。（[Issue #1615](https://github.com/musistudio/claude-code-router/issues/1615)）
3. **[MEDIUM] OpenAI Responses 拒绝翻译后的 thinking 块（PR #1784 [OPEN]）。** Codex API 对带有非空 `content` 数组的 `reasoning` 输入项返回 HTTP 400 `array_above_max_length`，每当历史中包含翻译后的 Claude `thinking` 块时就会触发。相关前置工作已在 [PR #1702](https://github.com/musistudio/claude-code-router/pull/1702)（现已关闭）中落地，该 PR 为 OpenAI 上游剥离了顶层 `thinking`/`reasoning_split` 以及 `type: "thinking"`/`"redacted_thinking"` 内容块。（[PR #1784](https://github.com/musistudio/claude-code-router/pull/1784)）
4. **[LOW] Codex 应用对自定义 provider 隐藏 Speed 控件（Issue #1683 [CLOSED]）。** 根本原因在于 Codex 应用的 catalog reader，而非 CCR 中间件；CCR 侧的数据经验证是完整的。作为上游侧问题关闭。（[Issue #1683](https://github.com/musistudio/claude-code-router/issues/1683)）

## 对应用开发者的影响
- **在 #1615 得到充分验证之前，避免在回退链中混用协议。** 如果你通过 `openai_responses` 路由 Codex 流量，并以 `anthropic_messages` 作为回退（反之亦然），请在依赖自动重试之前先确认你所固定的构建版本中包含该修复——否则一次可重试错误可能演变为硬性 400。
- **在 CCR 上使用 Codex 桌面的用户应关注 PR #1796。** 在近期的 ChatGPT desktop 版本中，`fast_mode` 注入缺陷会导致 Codex profile 完全无法启动；该修复正在今日评审中。
- **在多轮 Codex 会话中谨慎处理 reasoning/thinking 内容。** 即便 #1784/#1702 落地后，任何在持久化历史中保留 Claude 风格 thinking 块、随后又在 OpenAI Responses 上游回放的操作，都存在 400 风险。如果你存储或回放会话历史，请自行剥离 `thinking`/`redacted_thinking` 块，或者继续使用单一协议的上游。
- **在冷启动/慢速宿主机上运行的运维人员应关注 PR #1794。** 5 秒的 config-acceptance 预算一直是父进程监管中的隐藏 SPOF；将其改为可配置可消除在大镜像或受限 CI runner 上的一类启动抖动事件。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 简报 — 2026-09-14

## 1. 今日要点

过去 24 小时无新版本发布；动态主要集中在 **Codex 侧代理正确性修复**（DeepSeek 响应↔对话转换、推理力度透传、流式预热）以及**生态扩展**，DeepSeek Harness 与 MiniMax Code 的官方级应用集成以开放 PR 形式落地。一项长期位列榜首的功能请求 —— **多 Provider 路由**（#3703，17 条评论，6 👍）—— 仍未被处理，仍是社区关注度最高的议题。

## 2. 发布与破坏性变更

过去 24 小时无新标记版本。今天 PR 中可见的待合并行为变更值得关注：

- **CLI/Codex 会话统一网关**（#7386）—— 显式 `model_provider = "openai"` 现在将通过 `inject_codex_unified_session_bucket`，在统一会话路径中启用官方 OpenAI 路由。影响在第三方中转与官方 Codex 之间迁移的用户。
- **Linux 上的 Claude Desktop 3P 配置** —— #7331（已关闭）与 #7389（已关闭，取代前者）增加了 `XDG_CONFIG_HOME` 解析，并支持 Flatpak 回退到宿主机 `~/.config`。已在 #4855 中发布。
- **DNS 解析行为变更**（#7125，已关闭）—— 修复了本地代理将 `api.deepseek.com` 劫持到 `127.0.0.1` 的 bug。已应用补丁构建的用户应重新测试直连 DeepSeek 路由。

## 3. 新模型与硬件支持

- **DeepSeek Harness (DSH)** 作为官方级应用 —— [#7356](https://github.com/farion1231/cc-switch/pull/7356)。应用类型、原生 YAML/凭据写入器、Codex 风格 Provider 表单、实时状态命令。取代 #6526。
- **MiniMax Code harness** 支持 —— [#7383](https://github.com/farion1231/cc-switch/pull/7383)。Provider/模型管理、MCP、Skills、全局指令、本地会话历史与用量追踪，全部使用与 TUI/桌面端共享的原生配置文件。
- **腾讯 CodeBuddy / WorkBuddy** 集成 —— [#7176](https://github.com/farion1231/cc-switch/pull/7176)。用量统计、会话导入、受管 API 切换。
- **Gemini CLI JSONL 会话导入** —— [#2771](https://github.com/farion1231/cc-switch/pull/2771) 与 [#7385](https://github.com/farion1231/cc-switch/pull/7385) 恢复了 `session-*.jsonl` 的 token 用量同步功能，该功能自 Gemini CLI 0.45.2 格式变更后失效。此长期缺口也在 [#3938](https://github.com/farion1231/cc-switch/issues/3938) 中跟踪。
- **Muse Spark 推理力度透传** —— [#7397](https://github.com/farion1231/cc-switch/issues/7397) / [#7398](https://github.com/farion1231/cc-switch/pull/7398)。将 `muse-spark-*` 加入 `supports_reasoning_effort()`，使 Anthropic→Responses 中 `/effort` 不再被静默丢弃。
- **Laonong API** 多应用预设 —— [#7296](https://github.com/farion1231/cc-switch/pull/7296)。

## 4. 性能与优化

- **出站脱敏采用可逆占位符** —— [#7306](https://github.com/farion1231/cc-switch/pull/7306)。使用 `{{PHONE:...}}` 之类类型化 token 取代固定 `*` 掩码，将实体身份保留给模型，降低跨实体碰撞概率。在不改变对中转暴露的脱敏面的前提下，提升下游 agent 推理质量。
- **Hermes 用量聚合** —— [#6120](https://github.com/farion1231/cc-switch/pull/6120)。将 `session_model_usage` 以只读方式导入用量面板，作为独立数据源并采用基于增量的趋势窗口计算。值得注意的，它**不需要**流量经过本地代理。
- **Provider 错误信封暴露** —— [#6912](https://github.com/farion1231/cc-switch/pull/6912)。部分中转（如 GLM 的原生 Codex 端点）会以 `200` 返回错误信封；此前模型拉取会静默得到空列表。配置错误现在可见，而非表现为"未找到模型"。

## 5. 稳定性与回归

按严重性与可复现性排序。

 **高**
- **DeepSeek 在 Responses→Chat 时死循环** —— [#5860](https://github.com/farion1231/cc-switch/issues/5860)（已关闭）。转换过程中复制了助手轮次并拷贝了 `reasoning_content`，导致 Codex+DeepSeek 每轮循环最高 12 万–14 万 token。已标记关闭，但下游 DeepSeek 路径仍不稳定。
- **Codex 心跳请求破坏 DeepSeek 会话** —— [#6995](https://github.com/farion1231/cc-switch/issues/6995)。心跳自动注入 `function_call_output` 但缺少 `call_id`；`/v1/responses` 返回 400，线程永久卡死，需创建新线程。
- **DeepSeek Chat 上游拒绝短 `tool_call_id`** —— [#7156](https://github.com/farion1231/cc-switch/issues/7156)。Codex `26.901.x` 子 agent 工具调用经 tokenrhythm 中转时确定性地返回 400。已在 [#7378](https://github.com/farion1231/cc-switch/pull/7378) 中给出补偿修复（省略 null `description`）；`tool_call_id` 长度问题仍未解决。
- **`api.deepseek.com` DNS 劫持至 `127.0.0.1`** —— [#7125](https://github.com/farion1231/cc-switch/issues/7125)（已关闭）。本地代理将上游域名解析到回环地址。已解决。

🟡 **中**
- **OAuth 接管后残留过期账号绑定** —— [#7377](https://github.com/farion1231/cc-switch/issues/7377)、[#7395](https://github.com/farion1231/cc-switch/pull/7395)。删除受管 ChatGPT 账号后重新登录，切换 Provider 会失败直至手动重新绑定。修复 PR 已开启。
- **CC Switch 在 Codex `config.toml` 中强制 `requires_openai_auth`** —— [#7211](https://github.com/farion1231/cc-switch/issues/7211)。
- **切换 Provider 破坏 Codex 历史记录（`model_provider` 不匹配）** —— [#7362](https://github.com/farion1231/cc-switch/issues/7362)、[#7257](https://github.com/farion1231/cc-switch/issues/7257)、[#7310](https://github.com/farion1231/cc-switch/issues/7310)（已关闭）。`state_5.sqlite` 按线程存储 `model_provider`；在第三方与官方之间切换会造成会话孤立。#7386 提供部分缓解。
- **OpenCode 配置位于 WSL 时，OMO ≥ 4.19.3 静默回退** —— [#7367](https://github.com/farion1231/cc-switch/pull/7367) 修复了检测逻辑；未应用时，写入会落到 OMO 不再读取的旧文件 —— 看似成功但实际无效。
- **Claude→Responses 流式预热可能挂起** —— [#5368](https://github.com/farion1231/cc-switch/issues/5368)（陈旧）。
- **GPT-5.x `explicit max effort` 被降级为 `xhigh`** —— [#5367](https://github.com/farion1231/cc-switch/issues/5367)（陈旧）。
- **DeepSeek Responses 在 Codex 3.17.0 上返回 404** —— [#5408](https://github.com/farion1231/cc-switch/issues/5408)（陈旧）。

🟢 **低 / 外观**
- Codex 在附加图像输入时拒绝 DeepSeek 多模态 flash 模型 —— [#7308](https://github.com/farion1231/cc-switch/issues/7308)。
- 已删除的 Skills 仍在界面中列出 —— [#5352](https://github.com/farion1231/cc-switch/issues/5352)。
- Windows 上 Claude / Codex / Gemini / OpenCode 的本地检测错误 —— [#2824](https://github.com/farion1231/cc-switch/issues/2824)。

## 6. 对应用开发者的意义

- **在 #6995 与 #7156 完全解决之前，不要在 Codex + DeepSeek 上交付多 Provider 演示** —— 子 agent 流程以及任何心跳/重试自动化是故障高发点，而非单轮对话。
- **在部署脚本中固定 Codex 的 `model_provider`**。当前切换 Provider 对本地会话历史是破坏性的；在 #7362 关闭前，应将 `~/.codex/state_5.sqlite` 迁移纳入发布流程。
- **如果通过中转进行代理，请在 Responses↔Chat 边界埋点。** 今天两个最严重的回归（DeepSeek 死循环、工具调用 `call_id` 被拒）都源自此处；在 CC Switch 前部署捕获代理（正如 #5860 报告者所做）是定位根因的最快路径。
- **推理力度透传是不断变化的目标。** #7398 中针对 `muse-spark-*` 的修复，与此前针对 Grok（#7314/#7318）的修复一致。新增模型族时，请显式审计 `supports_reasoning_effort()` —— 静默降级是默认行为。
- **中转用户的安全姿态现已成为社区明确诉求**（[#7357](https://github.com/farion1231/cc-switch/issues/7357)）。在 LLM/KW 上游审计落地前，请将来自中转的凭证类提示注入外泄视为在范围内的威胁，避免将密钥写入 `config.toml`。
- **"路由器 / 多 Provider 扇出"功能**（[#3703](https://github.com/farion1231/cc-switch/issues/3703)，CLI/无头场景的 [#3986](https://github.com/farion1231/cc-switch/issues/3986)）仍是最受期待的能力，**今天没有任何开放 PR**。请规划回退方案，不要指望其短期内落地。
- **尽早评估新的官方级应用集成**（DeepSeek Harness [#7356](https://github.com/farion1231/cc-switch/pull/7356)、MiniMax Code [#7383](https://github.com/farion1231/cc-switch/pull/7383)、CodeBuddy [#7176](https://github.com/farion1231/cc-switch/pull/7176)）—— 它们共享 provider/Skill/MCP 基础设施，可减少按 agent 编写胶水代码的工作量。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-14

项目：[QuantumNous/new-api](https://github.com/QuantumNous/new-api)（LLM 网关 / 统一模型服务代理）

## 1. 今日要点

- **过去 24 小时内无新版本发布**；当前版本停留在 **v1.0.0-rc.37**，有一个开放的增强请求，希望维护者发布 v1.0.0 的明确 GA 标准（[#7279](https://github.com/QuantumNous/new-api/issues/7279)）。
- **rc.37 报告内存回归**：常驻内存从约 75 MB（rc.36）跃升至约 1.8 GB，在小型实例上触发 OOM（[#7361](https://github.com/QuantumNous/new-api/issues/7361)）。在根因定位之前，对受限部署来说严重程度较高。
- **推理后端集成扩展**：新 PR 新增一级 **vLLM** 与 **SGLang** 中继通道（[#7332](https://github.com/QuantumNous/new-api/pull/7332)），**华为 MaaS** 支持正在评审中（[#7239](https://github.com/QuantumNous/new-api/pull/7239)）。

## 2. 版本发布与破坏性变更

- 过去 24 小时内无发布的版本。
- 值得关注的行为变更（已合入 rc.37 谱系的已关闭 PR）：
  - 在 `/v1`、`/api`、`/pg`、`/mj`、`/oauth` 之上引入全局 `NEW_API_ROUTE_PREFIX` 挂载层（[#7350](https://github.com/QuantumNous/new-api/pull/7350)）—— 基于路径的反向代理后的运维方应重新校验其路由。
  - 部署脚本可执行位修复（[#7306](https://github.com/QuantumNous/new-api/pull/7306)）—— 重新拉取安装产物。
  - `GetAudioDuration` 中的音频扩展名大小写不敏感处理（[#7321](https://github.com/QuantumNous/new-api/pull/7321)，关闭 [#7319](https://github.com/QuantumNous/new-api/issues/7319)）。

## 3. 新模型与硬件支持

- **vLLM 通道** —— vLLM 服务模型的直连中继适配器（[#7332](https://github.com/QuantumNous/new-api/pull/7332)）。
- **SGLang 通道** —— SGLang 服务模型的配套适配器（[#7332](https://github.com/QuantumNous/new-api/pull/7332)）。
- **华为 MaaS 通道** —— 新增华为云 ModelArts MaaS 作为提供商（[#7239](https://github.com/QuantumNous/new-api/pull/7239)）。
- **Wan 提供商图标** 统一模型提供商检测，新增 Wan（阿里）图标（[#7373](https://github.com/QuantumNous/new-api/pull/7373)）。
- **Vertex AI 存储代理** —— 通过按桶白名单（`storage:gs:<bucket>`）控制 Vertex AI 通道对 GCS 的访问（[#7121](https://github.com/QuantumNous/new-api/issues/7121)，实现 PR [#6779](https://github.com/QuantumNous/new-api/pull/6779)）。
- **Langfuse 可观测性** —— 提议作为可选的网关追踪导出（[#7371](https://github.com/QuantumNous/new-api/issues/7371)、[#7370](https://github.com/QuantumNous/new-api/issues/7370)；PR [#7313](https://github.com/QuantumNous/new-api/pull/7313)）。
- **Gemini 归一化思考等级** 已被 `relaykit` 接受（[#7245](https://github.com/QuantumNous/new-api/pull/7245)）。
- **编程套餐定价** 仍作为增强请求，等待上游报价处理（[#4341](https://github.com/QuantumNous/new-api/issues/4341)）—— 尚未发布。

## 4. 性能与优化

- **rc.37 中的常驻内存回归**（[#7361](https://github.com/QuantumNous/new-api/issues/7361)）：
  - rc.36 → 稳态约 75 MB
  - rc.37 → 稳态约 1.8 GB（约 24 倍）
  - 运维侧影响：≤2 GB 实例被 OOM 杀死；云虚拟机成本上升。
  - 当前以 `needs reproduction / insufficient info` 关闭 —— 修复前需要堆 profile。
- **`tiered_expr` 请求体物化问题**（[#7378](https://github.com/QuantumNous/new-api/issues/7378)）—— 被判定无效关闭，但它体现了对中继路径中请求体生命周期与 GC 压力的持续关注。
- **使用 `ensure_ascii=True` 时 `EstimateToken` 5 倍高估**（[#7368](https://github.com/QuantumNous/new-api/issues/7368)）—— 被判定无效关闭，但若通过 Python 客户端发送非 ASCII 负载，仍值得重新衡量令牌计数。
- **OpenAI 流排出回归已修复** —— 在 rc.31 一次错误合并之后，将 5 个 OpenAI 流处理器重新接入项目的排出生命周期（[#7379](https://github.com/QuantumNous/new-api/pull/7379)）。
- **长期存在的重试逻辑重构仍未关闭**（[#4236](https://github.com/QuantumNous/new-api/issues/4236)）—— 尚未落地具体数据。

## 5. 稳定性与回归

按严重程度排序，附带相关修复链接。

| 严重程度 | 项目 | 状态 | 修复 |
|---|---|---|---|
| 高 | **rc.37 内存膨胀 / 小实例 OOM**（[#7361](https://github.com/QuantumNous/new-api/issues/7361)） | 已关闭（需复现） | — 待定 |
| 高 | **`InitChannelCache` 恐慌**，当通道的 `group` 没有 abilities 行时 —— `assignment to entry in nil map`（[#7331](https://github.com/QuantumNous/new-api/issues/7331)） | 已关闭 | [#7323](https://github.com/QuantumNous/new-api/pull/7323)（已合并） |
| 中 | **被取消的客户端流被计入模型失败**，扭曲成功率指标（[#7134](https://github.com/QuantumNous/new-api/issues/7134)） | 开放 | — |
| 中 | **rc.31 合并引入的 OpenAI 流排出回归**（[#7379](https://github.com/QuantumUsers/new-api/pull/7379)） | 已关闭（修复已合并） | [#7379](https://github.com/QuantumNous/new-api/pull/7379) |
| 中 | **Ollama 流式丢失 `tool_calls`**，当 `done:true` 帧携带它们时；客户端看到空的 `content` + `finish_reason:"stop"`（PR [#7380](https://github.com/QuantumNous/new-api/pull/7380)、[#7376](https://github.com/QuantumNous/new-api/pull/7376)） | 开放 | 评审中 |
| 低 | 分级计费日志误报 "dynamic billing · no match"（[#7296](https://github.com/QuantumNous/new-api/issues/7296)） | 已关闭 | — |
| 低 | 定价页上基于时间的计费分级显示（[#7268](https://github.com/QuantumNous/new-api/issues/7268)） | 已关闭 | — |
| 低 | 使用日志中 `codex-*` 模型缺失 OpenAI 图标（[#7363](https://github.com/QuantumNous/new-api/issues/7363)） | 已关闭 | [#7364](https://github.com/QuantumNous/new-api/pull/7364) |
| 低 | 仪表板周粒度默认时间范围（[#7354](https://github.com/QuantumNous/new-api/issues/7354)） | 已关闭 | [#7355](https://github.com/QuantumNous/new-api/pull/7355) |
| 低 | 模型广场 24h 成功率条形间距（[#7282](https://github.com/QuantumNous/new-api/issues/7282)） | 已关闭 | [#7284](https://github.com/QuantumNous/new-api/pull/7284) |
| 低 | Endpoint-Type 组合框在对话框自动聚焦时自动展开（[#7358](https://github.com/QuantumNous/new-api/issues/7358)、[#7359](https://github.com/QuantumNous/new-api/issues/7359)、[#7360](https://github.com/QuantumNous/new-api/issues/7360)） | 已关闭 | [#7365](https://github.com/QuantumNous/new-api/pull/7365) |
| 低 | 前端测试套件不稳定（动效/动画时序竞态）（[#7367](https://github.com/QuantumNous/new-api/pull/7367)） | 已关闭（修复已合并） | [#7367](https://github.com/QuantumNous/new-api/pull/7367) |

另被记录但**无效 / 已关闭**：阿里云百炼插件的 HappyHorse 模型请求（[#7375](https://github.com/QuantumNous/new-api/issues/7375)）；Langfuse 可观测性重复（[#7370](https://github.com/QuantumNous/new-api/issues/7370)）。

## 6. 对应用开发者的意义

- **若你在小规格 VM 上运行，生产环境请锁版本到 rc.36。** rc.37 的 RSS 跃升尚未经验证但已被报告，可能使 ≤2 GB 容器 OOM；升级前等待修复或采集堆 profile。
- **自托管 vLLM / SGLang 用户将很快获得原生路径。** [#7332](https://github.com/QuantumNous/new-api/pull/7332) 落地后，你可以将本地推理后端注册为一级通道，而不再通过 OpenAI 兼容中继打补丁 —— 对成本控制与本地部署的智能体很有用。
- **Ollama 上的工具调用可靠性将得到改善。** 两项开放的 Ollama 流修复（[#7380](https://github.com/QuantumNous/new-api/pull/7380)、[#7376](https://github.com/QuantumNous/new-api/pull/7376)）专门用于恢复终止 SSE 帧中传递的 `tool_calls`。依赖工具调用的智能体框架应在合并后重新测试。
- **流式端点的指标保真度正在加固。** 根据 [#7134](https://github.com/QuantumNous/new-api/issues/7134)，被取消的流将不再污染按模型维度的成功率仪表板；在该变更落地前，请将长时运行流式端点上的成功率 KPI 视为实际失败数的上界。
- **定价灵活性仍待定。** 编程套餐风格的上游报价处理（[#4341](https://github.com/QuantumNous/new-api/issues/4341)）与独立的上游成本配置模块（[#7377](https://github.com/QuantumNous/new-api/issues/7377)）仍开放 —— 若你转售或透传 AI 订阅套餐，请在这些讨论中发声。
- **升级后需校验的路由变更。** `NEW_API_ROUTE_PREFIX` 重构（[#7350](https://github.com/QuantumNous/new-api/pull/7350)）重接了 `/v1`、`/api`、`/pg`、`/mj`、`/oauth`。如果你在 new-api 之前部署了会剥离路径或基于路径做限速的反向代理，拉取后请重新验证路由。
- **可观测性选项正在扩展。** Langfuse 导出（[#7313](https://github.com/QuantumNous/new-api/pull/7313)）与受控的 Vertex AI GCS 代理（[#6779](https://github.com/QuantumNous/new-api/pull/6779)）目前均可评审；若你需要在网关层做按请求追踪或托管资产处理，请关注。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*