# AI 基础设施日报 2026-09-08

> 生成时间: 2026-09-07 23:30 UTC | 覆盖项目: 9 个

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

推理引擎层(vLLM、SGLang)正在吸纳最新的前沿架构——DeepSeek-V4、GLM-5.x、Kimi-K3、Qwen3.8 hybrid-GDN——并为此付出正确性债务的代价：投机解码与前缀缓存的交互如今已成为静默损坏类 bug 的最大单一来源(vLLM #53670 中 30–40% 的吞吐损失，llama.cpp #25618 中的贪心输出发散)。优化重心已从裸内核转向内存分层与生命周期管理：SGLang 的 Weight Cache Daemon 将 235B FP8 的加载时间从约 5 分钟压缩到 1 秒以内，而 Rust 内核与冷启动消除则表明，自动扩缩容的经济账如今已与稳态吞吐同等重要。网关层正收敛到 OpenAI Responses API 这一新的集成边界上，计费/消费计量的正确性则浮现为其最薄弱环节。消费级 Blackwell 芯片(SM120/121、B300 sm_103)在所有引擎中仍是长期存在的支持缺口。今天是个平静的发布日——9 个项目仅有 2 个带标签的发布——但合并活动依旧繁忙。

## 2. 活跃度对比

*计数为今日摘要中出现的独立 issue/PR 数量，并非仓库全量统计。*

| 项目 | 层级 | Issues | PRs | 发布状态 |
|---|---|---|---|---|
| vLLM | 推理引擎 | 23 | 17 | 无(仅 nightly 构建)|
| SGLang | 推理引擎 | 21 | 20 | 无;main 分支带有失效的 `transformers` 版本锁定(#38183)|
| llama.cpp | 本地运行时底座 | 20 | ~26 | **10 次构建版本推进**(b10831–b10850)|
| Ollama | 本地运行时/UX | 15 | 14 | 无;0.33.x 存在约 5 倍的 CUDA 性能回退(#18225)|
| LiteLLM | 企业级网关 | 22 | 14 | 无版本发布;v1.100.1 筹备中(#40176)|
| Unsloth | 微调工具 | 16 | 9 | 无 |
| Claude Code Router | 客户端侧 agent 路由器 | 3 | 3 | 无 |
| CC Switch | 客户端侧 agent 路由器 | 15 | 14 | **v3.20.2**(Codex/Grok 兼容)|
| New API | 多提供商中继 | 15 | 10 | **v1.0.0-rc.35**(Wan 3.0、插件路由)|

## 3. 模型支持竞赛

**领先者：vLLM 与 SGLang**,两者均已为 2026 年 Q4 前沿模型世代提供一流支持——但支持 ≠ 稳定：

- **Qwen3.8 / hybrid-GDN 系列** — vLLM(EAGLE/MTP 修复、NVFP4+MTP 路径)和 SGLang(Qwen3-Next rebase)走在前面；llama.cpp 与 Ollama 仍在同一批架构上与加载和解析器 bug 缠斗。
- **DeepSeek-V4** — vLLM(预热迁移进行中)、SGLang(AMD KV 布局标志)、llama.cpp(Vulkan 融合超连接算子)。三家引擎均已入局；vLLM 仍带有未解决的非确定性 bug(#53257)。
- **GLM-5.x / Kimi-K3** — 集中于 vLLM + SGLang,SGLang 侧有三个未解决的 GLM 正确性 bug,vLLM 侧存在 Kimi-K3 PD 分离部署(PD-disagg)损坏(#52627)。
- **量化广度** — llama.cpp 领先(Vulkan 上的 TQ1_0);SGLang 新增 NVFP4 MoE 分发。
- **API 级模型** — 三家网关在另一条赛道上各自竞速：New API 已上线 Wan 3.0 视频，Huawei MaaS 支持正在评审中；CC Switch 通过原生 Responses API 加入 Grok,并将 Copilot 接入为提供商；LiteLLM 落后，`gpt-6-astra` 和 `gpt-5.6-sol` 的**注册表条目损坏**(#40123、#40102)。

**本地梯队的落后是设计使然**:Ollama 的 Spark X2.5 支持被一次 llama.cpp 版本更新(b10829)所阻塞，而 Unsloth 的 Qwen 3 AVL 支持仍停留在请求阶段(#10459)。

## 4. 性能前沿

优化工作集中在五个方向：

1. **投机解码** — 最大的杠杆，也是最大的风险。vLLM 正在修复 EAGLE/MTP 前缀缓存末块丢弃导致的 30–40% 批量吞吐损失(#52244);llama.cpp 在量化模型上存在贪心输出发散(#25618);Unsloth 发布了接受率测量工具(`unsloth/spec_decoding`)——这表明生态希望投机解码的启用以实测数据为门槛，而非凭感觉。
2. **内存/KV 管理** — SGLang 的 Rust 基数树内核(SWA 分支缓存、Mamba/Full-KV arena 逐出、混合页释放)是投入最深的方向；vLLM 的工作则以修复为主(前缀缓存/MTP 交互、YaRN 复用 #54094)。
3. **MoE 内核与量化** — vLLM 的 H20 block-FP8 重调优(+21%,#54668)、SGLang 的 FP8 epilogue 融合提案、GLM-5.2 fp32 路由偏置修复；llama.cpp 推进无分支解包 + 专家权重 H2D 预取。
4. **冷启动/生命周期** — SGLang 的 Weight Cache Daemon(235B FP8 从 306–327s → <1s)和 vLLM 的构建期字节码预编译(消除 8,706 个 `.pyc`)直接改变自动扩缩容与金丝雀发布的成本结构。
5. **分布式服务** — SGLang 的上下文并行(Context-Parallelism)Q3 路线图与 TBO 元数据修复，对垒 vLLM 在 Model Runner V2 上的 Elastic EP;llama.cpp 的 RDMA RPC 已关闭、等待重做。

## 5. 层级定位

- **数据中心推理引擎(vLLM、SGLang):** 在前沿模型跟进速度、PD 分离、EP/CP 扩展、投机解码上展开竞争。爆炸半径最大——它们的 bug 是静默输出损坏，而不是 500 错误。
- **本地运行时栈(llama.cpp → Ollama):** llama.cpp 是量化/内核底座;Ollama 是带有硬性版本依赖的 UX 层(其 Spark X2.5 与 MLX YaRN 工作都建立在上游一次版本更新之上)。两者如今都在追逐 agent 负载特性(工具解析器、HF Discover、指标)。
- **网关(LiteLLM、New API):** LiteLLM 在认证/加密方面达到企业级水准(MCP 密钥加密、RBAC 今日落地)，但在消费计量正确性上偏弱(流式请求未计费 #29913、速率限制减半 #34140)。New API 在中继机制上更强(TTFB 故障转移、透传模型映射)，在 API 覆盖面上更弱。
- **客户端侧 agent 路由器(CCR、CC Switch):** 是叠加在 Claude Code/Codex CLI 行为之上的薄层；其风险画像在于上游漂移(Codex 心跳破坏会话 #6995、Cowork 工具名归一化 #1766),而非服务容量。CC Switch 的分类器队列路由(#6602)是这一层中最具架构新意的一项。
- **微调:** 通过 llama.cpp 集成与投机解码测量打通训练与推理——是唯一一个工作单元是*模型产物*而非请求的项目。

## 6. 趋势信号

1. **投机解码正从优化利器演变为负债。** 五个项目中有三个存在未解决的投机解码正确性 bug。关注点：将 MTP/EAGLE 视为需通过评测门槛才启用的选项；Unsloth 的接受率工具是范本。
2. **混合/线性注意力模型正在各处击穿缓存层** — 前缀缓存未命中(vLLM)、HiCache 恢复损坏(SGLang #38031)、循环结构回滚崩溃(llama.cpp #28425)。如果你在服务 GDN/DSA/Mamba 混合模型，缓存命中率看板如今是一份正确性监控，而不只是成本监控。
3. **Responses API 是新的战场** — Ollama 接受 `agent_message`,New API 修复 `reasoning_text.delta`,CC Switch 代理 Codex `/responses`,LiteLLM 的桥接层丢弃 `encrypted_content`。请为桥接一致性测试预留预算。
4. **计费正确性是网关的盲区** — New API 将不完整响应按 0 计费(#7241),并在断连后仍继续计费(#7231);LiteLLM 在流式失败时不写入消费记录(#29913)。请执行独立的用量对账；不要把网关消费日志当作事实基准。
5. **冷启动的坍缩正在改变机群经济性** — 亚秒级的 235B 加载(SGLang)让临时性/自动扩缩的 GPU 机群变得可行；预计 vLLM 将跟进。
6. **Blackwell 消费级芯片是支持前沿** — Xid 13 崩溃(vLLM #55571、SGLang #34340)、sm_103 架构族检查 bug、DGX Spark 内核门控。与此同时，A100/SM80 的 FP8 路径正在三个项目中持续回退。请锁定针对特定硬件的 nightly 版本，并在机群铺开前完成验证。
7. **工具调用解析仍是 agent 层的头号脆弱点** — Qwen 在 `<think>` 中夹带 XML(vLLM #39056)、Gemma 4 参数格式错误、并行调用被打乱(llama.cpp #28522)、Ollama 流式 tool_calls 被丢弃(New API #7252)。面向 agent 流量，内容感知的解析器测试应纳入每一次发布门禁。

**一句话总结：** 引擎正在赢得吞吐之战，却恰好在 agent 最敏感的环节(确定性、工具调用、缓存复用)累积静默损坏债务；网关在集成广度上取胜，却在计费接缝处漏钱。那些为正确性埋点(接受率、缓存命中率遥测、用量对账)的项目，将定义下一个季度的默认标准。

---

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 简报 — 2026-09-08

## 今日要点

DSv4 预热(warmup)迁移继续在队列中推进(#50176、#50178、#53567),与此同时 Kimi-K3 的稳定性攻坚也在密集进行(#55774、#55747),而一条长期发酵的批次不变性(batch-invariant)推理议题评论数已突破 89 条(#27433)。对生产环境用户而言，今天最重要的信号是一连串 EAGLE/MTP 与前缀缓存交互引发的问题(#53670、#52244、#54094)——它们在混合 GDN 架构上合计造成 30–40% 的吞吐损失，修复已在推进中。

## 版本发布与破坏性变更

*过去 24 小时没有新版本发布。* 各议题讨论中引用的当前 `vllm/vllm-openai` nightly 标签包括 `vllm/vllm-openai-xpu nightly 2026-09-02`(vLLM 0.28.1rc1)和 `vllm/vllm-openai:nightly-aarch64`(vLLM 0.26.1rc1.dev1102)。

## 新模型与硬件支持

- **Sarvam MLA 的 EAGLE3 支持** — `SarvamMLAModel` 现在使用 `EagleModelMixin` 暴露辅助隐藏状态，在单一流水线阶段即可支持 EAGLE3 兼容的草稿模型([#53052](https://github.com/vllm-project/vllm/pull/53052))。
- **Granite 工具解析器迁移至流式 Parser Engine** — 随引擎迁移顺带修复了周围文本包裹相关的 bug([#49648](https://github.com/vllm-project/vllm/pull/49648))。
- **Transformers 后端的 attention sink 支持** — 将 `GraniteSWA`/`GraniteMoeSWA` 的正确性修复向后移植到 Transformers 建模路径，该路径此前会静默丢弃 sink token([#52156](https://github.com/vllm-project/vllm/pull/52156))。
- **XPU int8 量化测试覆盖** — `test_per_token_group_quant_int8` 不再以 `torch.cuda.is_available()` 作为门控条件([#55681](https://github.com/vllm-project/vllm/pull/55681))。
- **`glm_moe_dsa` 的 ROCm fp32 路由器** — 修复 GLM-5.3 所声明的 `moe_router_dtype` 策略([#55378](https://github.com/vllm-project/vllm/pull/55378))。
- **Model Runner V2 上的弹性 EP** — 待 MRV2 成为默认后即移除 V1 回退路径([#53934](https://github.com/vllm-project/vllm/pull/53934))。

## 性能与优化

- **H20 上 block-FP8 融合 MoE 低批次重调优(+21%)** — `BLOCK_SIZE_N=128` → 针对 `E=256, N=256` 采用更宽的 N 分块；与 GLM-5.3 TP=8 及 DeepSeek 系列 K=7168 场景相关([#54668](https://github.com/vllm-project/vllm/pull/54668))。
- **MTP 下恢复混合 GDN 的前缀缓存命中** — 目前 `Qwen3.5-122B-A10B` 回放始终达不到完整深度，且当 prompt 长度与哈希单元对齐时会完全丢失命中；该 PR 将其恢复到预期的复用水平([#52244](https://github.com/vllm-project/vllm/pull/52244))。
- **镜像构建期编译 Python 字节码** — 消除每个容器各自生成 `.pyc` 的开销；实测 vLLM 0.28.0 首次启动会新增 8,706 个 `.pyc` 文件([#55422](https://github.com/vllm-project/vllm/pull/55422))。
- **可选启用的 `v<release>-x86_64-zstd` 镜像标签** — 解决 #28656 中跟踪的镜像体积方面的反馈([#55608](https://github.com/vllm-project/vllm/pull/55608))。
- **长度感知的批次组成 RFC** — 在同一调度步内将最大/最小的 prompt 交错编排；楼主给出了实测证据与公平性分析，并明确指出了该启发式在何处失效([#55265](https://github.com/vllm-project/vllm/issues/55265))。

## 稳定性与回退问题

**严重(崩溃 / 数据损坏)**
- **RTX PRO 5000(SM120)上 FP8 持续负载触发 Xid 13 / 非法内存访问** — 可稳定复现；设置 `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` 或 `--enforce-eager` 后问题完全消失([#55571](https://github.com/vllm-project/vllm/issues/55571))。
- **CUDA 静默非法内存访问(退出码 0),混合 GDN + MTP k=3,RTX 3090** — 在 #50021/#45100/#53613 这一类修复之后依然存在([#53726](https://github.com/vllm-project/vllm/issues/53726))。
- **Kimi-K3 在 1P1D NIXL Direct-PD 下静默输出损坏** — 纯 NIXL 路径正常；只有通过 MultiConnector 组合 MooncakeStore + NixlConnector 时才出现损坏([#52627](https://github.com/vllm-project/vllm/issues/52627))。修复进行中:[#55774](https://github.com/vllm-project/vllm/pull/55774)、[#55747](https://github.com/vllm-project/vllm/pull/55747)。
- **DeepSeek-V4-Flash 在内联系统消息下输出错误** — 由 PR #46025 对 `chat_template` 的三路行为拆分(raises/loose/in-place)引入的回退([#46710](https://github.com/vllm-project/vllm/issues/46710))。
- **DeepSeek-V4 出现 NaN 的 MQA logits → 未初始化的共享内存(smem)被用作索引**，在 SM12x 上触发 — 仅 prefill 阶段的崩溃路径([#49896](https://github.com/vllm-project/vllm/issues/49896))。
- **引擎核心活锁(CPU 占用 100%,不崩溃)** — MTP 投机解码 + xgrammar 结构化输出，自 v0.24.0 起出现回退([#49210](https://github.com/vllm-project/vllm/issues/49210))。

**高(正确性 / 确定性)**
- **Qwen3.8-Flash-Next 贪心解码结果不确定** — 当 prompt 长度越过 `indexer_budget` 时出现；在 GB10 上五个完全相同的请求得到五个不同的补全结果([#54521](https://github.com/vllm-project/vllm/issues/54521))。
- **DeepSeek-V4-Flash 在 temperature=0 下不确定**，在 B300 SXM6 上发生率随并发度升高([#53257](https://github.com/vllm-project/vllm/issues/53257))。
- **vLLM 0.19 丢失工具调用** — 当 `Qwen/Qwen3.5-35B-A3B-FP8` 在 `<think>` 内输出 XML `<tool_call>` 标记，且使用 `--reasoning-parser qwen3 --tool-call-parser qwen3_coder` 时出现([#39056](https://github.com/vllm-project/vllm/issues/39056))。
- **EAGLE/MTP 前缀缓存最后一个 block 被丢弃** — 在一种混合 Qwen3.8 GDN 架构上每次命中需重算 1,648 个 token,批次吞吐损失 30–40%([#53670](https://github.com/vllm-project/vllm/issues/53670))。修复 PR:[#52244](https://github.com/vllm-project/vllm/pull/52244)。
- **`prompt_logprobs` 被静默破坏** — Qwen3.5 系列在分块 prefill 下使用 MTP 投机解码时出现；已在两套相互独立的构建与 checkpoint 上观察到([#53488](https://github.com/vllm-project/vllm/issues/53488))。
- **FlashInfer + MTP 在 SM121(DGX Spark)上崩溃**,条件为 GQA=16;Triton 路径正常([#37754](https://github.com/vllm-project/vllm/issues/37754))。
- **Mamba-2 Triton 内核报 `cudaErrorIllegalInstruction`** — 在 SM121(DGX Spark)上以异步模式运行时出现;`CUDA_LAUNCH_BLOCKING=1` 可掩盖该问题([#37431](https://github.com/vllm-project/vllm/issues/37431))。

**中(已有规避方案或影响范围有限)**
- **Qwen3.8-Flash-Next-FP8 无法在 A100(SM80)上启动** — Triton 的 `fp8e4nv` 在低于 SM89 的架构上不受支持。修复 PR:[#54287](https://github.com/vllm-project/vllm/pull/54287)。
- **Mamba 的 `mamba_ssm_cache_dtype` 导致 EngineCore 崩溃** — 当其既非 float32、也不等于激活 dtype 时触发。修复 PR:[#54123](https://github.com/vllm-project/vllm/pull/54123)。
- **DFlash2 + YaRN 前缀缓存零复用** — 完全相同的 1.04M prompt 得不到任何复用，而仅运行 target 模型时可复用约 1.039M([#54094](https://github.com/vllm-project/vllm/issues/54094))。
- **DFlash2 草稿模型接受率为 0%** — 在 XPU 上对 Qwen3.8-27B 使用 `--dtype float16` 时出现；bf16 正常([#55250](https://github.com/vllm-project/vllm/issues/55250))。
- **GLM-5.3-Flash 的 `Glm5NextTextLinearAttention` 不受支持** — 在 vLLM nightly 上无法使用([#54062](https://github.com/vllm-project/vllm/issues/54062))。
- **Model Runner V2 忽略 `thinking_token_budget`** — 出现在 Qwen3.8 NVFP4 + MTP 组合下([#54906](https://github.com/vllm-project/vllm/issues/54906))。
- **GLM-5.3 NVFP4 KV 缓存在 SM120 上未接入** — FlashInfer 已提供相关内核，但 vLLM 尚未使用；楼主已有一个可用原型，在 5090 上跑到了 245K 上下文([#49011](https://github.com/vllm-project/vllm/issues/49011))。

**低**
- **优雅关闭时打印出虚假的 `EngineDeadError` 堆栈**([#48745](https://github.com/vllm-project/vllm/issues/48745))。
- **本地 GGUF 路径加载失败** — `qwen35` 即使指定 `--hf-config-path` 也无法工作([#36456](https://github.com/vllm-project/vllm/issues/36456))。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-08

## 今日要点

过去 24 小时内，**GLM-5.x 系列**持续加固（FP4/EAGLE 在 flashinfer-trtllm 批量 GEMM 中的非法内存访问、HiCache 主机层回载破坏 GLM-5.3-Flash 生成、B300 sm_103 支持缺口），同时在**统一内存管理**方向有重要基础设施工作（Rust TreeCore SWA 分支点缓存、Mamba/Full KV 驱逐、AMD 上的 HiCache 主机指针别名修复）。一项长期的 **2026 Q3 上下文并行（Context Parallelism）路线图**也出现新进展。

## 发布与破坏性变更

*过去 24 小时内无新发布。*

两项准破坏性变更即将合入 `main`：

- **AMD DSV4 KV 布局标志重命名**（[#38373](https://github.com/sgl-project/sglang/pull/38373)）—— 环境变量 `SGLANG_HACK_FLASHMLA_BACKEND=unified_kv_triton` 将被替换为 `--dsv4-kv-layout {paged,ring}`。旧环境变量现在会在启动时失败并提示迁移信息；默认 `paged` 行为不变。
- **`main` 上 Transformers 固定版本破坏**（[#38183](https://github.com/sgl-project/sglang/issues/38183)）—— 当前固定 `transformers==5.12.1` 时，无论升版还是降版，`import sglang` 都会失败；版本提升待定。

## 新增模型与硬件支持

- **Intel XPU** 在一个 PR 中新增支持六个模型（[#35304](https://github.com/sgl-project/sglang/pull/35304)）：`bge-base-en-v1.5`、`nomic-embed-text-v1.5`、`granite-embedding-english-r2`、`InternVL3_5-30B-A3B`、`Hunyuan-A13B-Instruct`、`step3`。
- 通过标准 FlashInfer TRTLLM 与 CuTe DSL 后端为 MoE 提供 **NVFP4 分发**（[#38216](https://github.com/sgl-project/sglang/pull/38216)）。
- **GigaChat-3.5-432B-A28B** 支持（[#29189](https://github.com/sgl-project/sglang/pull/29189)）。
- **Kimi-K3 embedding-cache 租约**在最终 DP 路由上预先获取，以避免冗余的 VLM 预处理（[#34411](https://github.com/sgl-project/sglang/pull/34411)）。
- 为 `infllm_ops` 添加 **AArch64 + CUDA 13 gencodes** `sm_110a` / `sm_121a`（[#37641](https://github.com/sgl-project/sglang/pull/37641)）—— 弥补 Grace-Hopper/Grace-Blackwell wheels 上长期存在的缺口。
- **AMD gfx950 汇编注意力**，用于 MI355X 上的 EAGLE 验证 / draft extend / decode（[#37465](https://github.com/sgl-project/sglang/pull/37465)）。
- **GLM-5.2 MoE bias 保留为 fp32**，以保持 top-8 专家分辨能力（[#37133](https://github.com/sgl-project/sglang/pull/37133)）—— 数值位于 [6.817, 7.063] 的 bias 在 bf16 下损失约 8 级区分度。
- **Qwen3-Next rebase**（[#37500](https://github.com/sgl-project/sglang/pull/37500)）—— 原 PR #36497 重新推送。

## 性能与优化

- **权重缓存守护进程（Weight Cache Daemon）** 路线图（[#33522](https://github.com/sgl-project/sglang/issues/33522)）—— 阶段 1（[#27139](https://github.com/sgl-project/sglang/pull/27139)）将后量化权重存放在 per-rank 守护进程中，通过 CUDA IPC 提供服务。报告的 **Qwen3-235B FP8 权重加载：306–327s → <1s**。阶段 2（进程外 HiCache IPC）现已进入 RFC 阶段（[#37372](https://github.com/sgl-project/sglang/issues/37372)）。
- **统一 Radix Tree → Rust 核心**：从 Python 移植 SWA 分支点缓存（[#37584](https://github.com/sgl-project/sglang/pull/37584)）与迭代式 DFS 权重排序（[#38313](https://github.com/sgl-project/sglang/pull/38313)）。
- **混合 SWA 页释放**（[#38159](https://github.com/sgl-project/sglang/pull/38159)）—— `free_swa_segment(idx, *, start_pos)` 在 `page_size > 1` 时为每个页释放一个代表项，降低 SWA 侧的碎片化成本。
- **Mamba/Full KV 区域驱逐**（[#36713](https://github.com/sgl-project/sglang/pull/36713)）—— Mamba 分配现在同时受可用虚拟 ID *与* 后备字节数约束，并在某一方不足时跨池驱逐。
- **AMD HiCache 主机指针别名修复**（[#35233](https://github.com/sgl-project/sglang/pull/35233)）—— MI355X 上 `hipDeviceAttributeCanUseHostPointerForRegisteredMem=false` 不再导致自定义核 GPU 错误。
- 将**静态 FP8 量化**融合进 norm/activation/allreduce epilogue（[#31504](https://github.com/sgl-project/sglang/issues/31504)）—— 提案针对每次 FP8 GEMM 之前的独立 `_static_quant_fp8` 启动；具体加速数据尚未发布。
- **上下文并行（Context Parallelism）2026 Q3 路线图**（[#21788](https://github.com/sgl-project/sglang/issues/21788)，高优先级，👍 16）—— 既有 CP 工作覆盖 DSA（DeepSeek v32/GLM-5）以及 Qwen3-MoE + FA3 上的 MHA/GQA prefill CP；decode CP 与统一 TP+CP 仍待开展。
- **AMD TBO 动态前向元数据**（[#37598](https://github.com/sgl-project/sglang/pull/37598)）—— 通过 two-batch-overlap 后端代理，以修复 ROCm 7.2.0/7.2.4/10 上 DSV4-Pro prefill CP 的连续失败。

## 稳定性与回归

*按严重程度排序。均为新增/近期活跃项。*

1. **GLM-5.3-Flash HiCache 回载破坏生成**（[#38031](https://github.com/sgl-project/sglang/issues/38031)）—— 即使没有投机解码，主机层恢复也会丢失 DSA 索引缓冲，产生工具调用丢失与退化性重复。**修复 PR #38212**（[链接](https://github.com/sgl-project/sglang/pull/38212)）—— 同作者。
2. **B300 上 TP2 挂起**，伴随 HiCache + 可中断 prefill CUDA graph + FlashInfer MNNVL（[#38300](https://github.com/sgl-project/sglang/issues/38300)）—— `v0.5.18-cu130` 上的最新复现。
3. **GLM-5.2 FP4 + EAGLE 非法内存访问**，出现在 `flashinfer_trtllm` 的 `nextn` draft MoE bf16 批量 GEMM 中（[#30209](https://github.com/sgl-project/sglang/issues/30209)）；triton `nextn` 在 #30137 之后已对 HIP 关闭，因此 NV 路径是唯一变通。
4. **B300 sm_103 上 SM10x 受限核被破坏**（[#34340](https://github.com/sgl-project/sglang/issues/34340)）—— `is_sm100_supported()` 是族级检查；cutedsl TGV BF16 GEMM 命中 Xid 13 CGA "CTA Not Present"；trtllm-gen MoE finalize 静默挂起。CUDA coredump 已同时暴露两者。
5. **Kimi-K3 上 DP attention 下 DSPARK OOM**（[#38202](https://github.com/sgl-project/sglang/issues/38202)）—— draft KV 池预算使用了 `tp_size` 而非 `attn_tp_size`。
6. **PP 解耦 prefill 在 abort 风暴下挂起**（[#34572](https://github.com/sgl-project/sglang/issues/34572)）—— 各阶段 bootstrap 队列历史发生分歧；RCA 与修复系列正在进行中。
8. **断开的流式客户端 → 僵尸请求**洪水般刷出 `state was deleted in TokenizerManager`（[#36333](https://github.com/sgl-project/sglang/issues/36333)）—— 来自 #34160 的 revert 回归。
9. **A100（SM80）不支持 `fp8e4nv`**，在服务 Qwen3.8-Flash-Next-FP8 时出现（[#38291](https://github.com/sgl-project/sglang/issues/38291)）。
10. **FlashInfer 后端在 Blackwell 上不支持**（[#35080](https://github.com/sgl-project/sglang/issues/35080)）。
11. **DeepSeekV4TokenToKVPool（SWA/HiSparse）缺少 `get_cpu_copy()`** → decode 模式下 retract 因 `NotImplementedError` 崩溃；offload 是无条件的，未受 `--disaggregation-decode-enable-offload-kvcache` 控制（[#33385](https://github.com/sgl-project/sglang/issues/33385)）。
12. **`/v1/responses` `created_at` 类型不匹配**：streaming 为 float，non-streaming 为 int（[#34716](https://github.com/sgl-project/sglang/issues/34716)，👍 1）。
13. **`--default-chat-template-kwargs reasoning_effort`** 静默覆盖每个请求的取值（[#38104](https://github.com/sgl-project/sglang/issues/38104)）。
14. **MoE tuner 写入 int4_w4a16 配置但运行时从不读取**（[#35252](https://github.com/sgl-project/sglang/issues/35252)）。
15. **`attn_tp>1` 且 `attn_cp>1` 时 DP-attention `recv_requests()` 启动崩溃**—— `TypeError: object of type 'NoneType' has no len()`；**修复 PR #37643**（[链接](https://github.com/sgl-project/sglang/pull/37643)）。
16. **CUDA Coredump 跟踪器**（[#26340](https://github.com/sgl-project/sglang/issues/26340)）—— 由 `pr-test.yml` 自动收集 coredump；评论量（294）属运营噪音，非用户行为。

CI 状态（[#17050](https://github.com/sgl-project/sglang/issues/17050)，2026-09-07 23:01 UTC 自动更新）：**1 个 broken，9 个 flaky，962 个近期已修复**。

## 对应用开发者意味着什么

- **在 `main` 上谨慎固定版本。** `transformers==5.12.1` 的固定无论升版还是降版都会被破坏；预计很快会有一次版本提升。生产部署应在下一个发布前继续使用带标签的 `v0.5.18` 镜像。
- **GLM-5.x 推广需要重点关注。** 三个未解决的正确性/可用性 bug（EAGLE on FP4、HiCache 主机层、B300 sm_103 族级检查）均影响 GLM-5.2/5.3-Flash；#38212 是本窗口内唯一已合入修复 PR 的项。若您在 B300 上部署或依赖 HiCache，请先用工具调用回归套件验证后再推进。
- **冷启动时间即将大幅缩短。** Weight Cache Daemon（[#27139](https://github.com/sgl-project/sglang/pull/27139)/[#33522](https://github.com/sgl-project/sglang/issues/33522)）将 FP8 235B 级别的加载从约 5 分钟降至 1 秒以内——对自动扩缩容、金丝雀发布与 CI 临时集群均有意义。
- **AMD 路径正趋向对等。** gfx950 上的 EAGLE 注意力、HiCache 主机指针修复与统一 KV 驱逐同期落地；MI355X 正成为 DSV4-Pro nightly 的一类目标。
- **Intel XPU** 现已覆盖两类模型：embedding 模型（bge/nomic/granite）与 chat VLM（InternVL3_5、Hunyuan-A13B、Step3-VL）——若您瞄准异构集群非常有用。
- **需关注的 API 漂移。** `/v1/responses` 的 `created_at` int 与 float 不匹配会静默破坏对该字段做强类型约束的下游解析器；请在客户端代码中固定为单一模式。
- **工具调用语法缺口：** Spark-X2.5 解析器当前回退到 `glm45`（[#37642](https://github.com/sgl-project/sglang/pull/37642)）—— 若您当前在服务 Spark-X2.5，请验证工具调用抽取；修复正在路上。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-08

## 1. 今日要点

master 分支推送了 10 个构建版本（b10831–b10850），聚焦于 Vulkan 算子成熟化：TQ1_0 支持、RMS_NORM 融合（gemma4 上约 4% 提升）、DSV4 超连接融合算子、GET_ROWS 对齐修复，以及 CUDA 侧的无分支 Q4_K/Q5_K 解包和 DGX Spark 的 L2 预取，外加 HIP gfx90c 支持。在稳定性方面，出现两个严重回归——Vulkan 在 131k 上下文下出现 78% 的解码吞吐悬崖，以及带专家卸载时静默的 CUDA MoE / fattn 崩溃——此外还有一个新的推测解码 bug 显示出在量化目标上贪心输出发生偏离。服务器/UI 方面也有显著进展，Hugging Face Discover 对话框和端到端模型下载管线在约 10 个 PR 中落地。

## 2. 发布与破坏性变更

过去 24 小时发布了 10 个构建版本。未声明明确的版本 API 破坏，但有一些行为注记：

- **b10850** — tests: 修复 L2_NORM 批初始化（编译器未初始化警告，无运行时影响）。[#28553](https://github.com/ggml-org/llama.cpp/pull/28553)
- **b10844** — vulkan: 新增 DSV4_HC_COMB/PRE/POST 融合算子（与 CUDA/Metal 在 DeepSeek-V4 上对齐）。[#26578](https://github.com/ggml-org/llama.cpp/pull/26578)
- **b10842** — ggml: 新增 gfx90c HIP 支持。[#26454](https://github.com/ggml-org/llama.cpp/pull/26454)
- **b10840** — CUDA: 无分支 Q4_K/Q5_K mmvq scale 解包；DGX Spark 上启用 L2 预取（需 gating）。[#26705](https://github.com/ggml-org/llama.cpp/pull/26705)
- **b10839** — vulkan: 类型对齐的 GET_ROWS，对未对齐偏移提供 CPU 回退。[#28253](https://github.com/ggml-org/llama.cpp/pull/28253)
- **b10837** — caps: 当模板需要 string 类型时重新检查类型化内容。[#28511](https://github.com/ggml-org/llama.cpp/pull/28511)
- **b10835** — ggml-cuda: 修复 f16 flash attention 中的分歧 barrier。[#27870](https://github.com/ggml-org/llama.cpp/pull/27870)
- **b10834** — ggml: 后端输入不再强制额外切分。[#28387](https://github.com/ggml-org/llama.cpp/pull/28387)
- **b10833** — vulkan: RMS_NORM 融合（RMS+VIEW+SET_ROWS, +MUL+ADD）。[#28024](https://github.com/ggml-org/llama.cpp/pull/28024)
- **b10831** — vulkan: TQ1_0（mm、mat-vec、dequant、get_rows）。[#27765](https://github.com/ggml-org/llama.cpp/pull/27765)

## 3. 新增模型与硬件支持

- **DeepSeek-V4 超连接融合算子**在 Vulkan 上落地（DSV4_HC_COMB/PRE/POST）——弥合了与 CUDA/Metal 的后端对齐差距。[#26578](https://github.com/ggml-org/llama.cpp/pull/26578)
- **TQ1_0 量化**加入 Vulkan（mm、mat-vec、mat-vec-id、dequant、get_rows）——terse-3-base 现已完全 GPU 加速。[#27765](https://github.com/ggml-org/llama.cpp/pull/27765)
- **gfx90c（AMD ROCm）** HIP 后端支持加入 ggml。[#26454](https://github.com/ggml-org/llama.cpp/pull/26454)
- **Hexagon（Qualcomm）**后端新增 f32 RELU 和 LEAKY_RELU 算子。[#28585](https://github.com/ggml-org/llama.cpp/pull/28585)
- **RFC**: 用于图像/视频/音频生成的扩散模型 GGUF 摄取（LTX-2）。[#28541](https://github.com/ggml-org/llama.cpp/issues/28541)

## 4. 性能与优化

- **Vulkan RMS_NORM 融合**（RMS + MUL + ADD + MUL，RMS + VIEW + SET_ROWS，带 IMROPE 的 ROPE + VIEW + SET_ROWS）→ gemma4 上约 **4% 提升**。[#28024](https://github.com/ggml-org/llama.cpp/pull/28024)
- **CUDA Q4_K/Q5_K 无分支解包**→ 消除 mmvq 中按列重新执行 scale；在 batch > 1 时效果显著。[#26705](https://github.com/ggml-org/llama.cpp/pull/26705)
- **CUDA L2 预取**在 DGX Spark 上启用（需 gating）。[#26705](https://github.com/ggml-org/llama.cpp/pull/26705)
- **ggml: 后端输入避免切分**——当张量仅被一个后端消费时，减少图切分。[#28387](https://github.com/ggml-org/llama.cpp/pull/28387)
- **进行中**: `--prefetch-experts-slots N`，用于主机驻留 MoE 专家的前瞻式 H2D 预取（重卸载场景）。[#28414](https://github.com/ggml-org/llama.cpp/pull/28414)
- **进行中**: ggml-rpc RDMA（RoCEv2）传输——据称双节点 iGPU 集群切分有显著收益；PR 今日关闭（可能需要返工）。[#20590](https://github.com/ggml-org/llama.cpp/pull/20590)
- **进行中**: 结构化 `LOG_JSON` 宏，用于机器可读的服务器日志，取代 --list-devices-format json 工作。[#28586](https://github.com/ggml-org/llama.cpp/pull/28586)

## 5. 稳定性与回归

按严重程度排序，标注修复状态。

**高**
- [#28448](https://github.com/ggml-org/llama.cpp/issues/28448) — `ggml_gallocr` 在同一图位置节点身份变化时静默复用旧的分配计划 → **稀疏 MoE** 路由上的静默内存损坏。**尚无修复合并。**
- [#27734](https://github.com/ggml-org/llama.cpp/issues/27734) — Vulkan（AMD RX 7900 XTX，Windows）上 **131072 上下文出现约 78% 的解码吞吐悬崖**。根因：默认约 1 GiB 的子分配块在 128k 处碎片化；临时方案 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`。**尚无修复合并。**
- [#28425](https://github.com/ggml-org/llama.cpp/issues/28425) — 循环/混合架构（`qwen4exp`）的回滚（`n_rs_seq`）仅在推测解码内可达 → 非推测路径下崩溃或无界内存增长。**尚无修复合并。**
- [#26609](https://github.com/ggml-org/llama.cpp/issues/26609) — 在带 **Qwen3.6-35B MoE + 部分专家卸载**的 flash-attn 路径上，`cudaStreamSynchronize` 中出现 CUDA 非法内存访问；在 b10107/b10243 上可复现；`-fa off` 可绕过。**尚无修复合并。**
- [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) — 贪心采样下，**量化目标**（Q4_K_M）上推测解码（draft-mtp/draft-dspark）发生偏离，bf16 上正常；ngram 推测无此问题。**尚无修复合并。**

**中**
- [#24324](https://github.com/ggml-org/llama.cpp/issues/24324) — 启用 `GGML_CUDA_FA_ALL_QUANTS=ON` 的 CUDA 构建上 `fattn.cu:579 fatal error`。**尚无修复合并。**
- [#25060](https://github.com/ggml-org/llama.cpp/issues/25060) — Blackwell GGML-CUDA SOFT_MAX 在大型 35B+ 模型上崩溃；社区补丁已提出，未合并。**尚无修复合并。**
- [#28211](https://github.com/ggml-org/llama.cpp/issues/28211) — gfx1151（Strix Halo）上的 HIP/ROCm 对超过 `n_ubatch` 长度的 prompt 产生**错误 logits**（非崩溃）。**尚无修复合并。**
- [#28361](https://github.com/ggml-org/llama.cpp/issues/28361) — K2-Horizon GGUF 模型加载失败。**尚无修复合并。**
- [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) — 自 commit 257813839 起，`--lazy-mode auto` 将 Vulkan AMD iGPU 上 qwen4exp 的 pp512 减半。相对 PR #27837 的回归；**尚无修复合并。**
- [#28441](https://github.com/ggml-org/llama.cpp/issues/28441) — b10809 上，Metal 在系统负载下偶发的 Qwen2.5-Omni **音频损坏**。**尚无修复合并。**

**低 / 今日已解决**
- [#28518](https://github.com/ggml-org/llama.cpp/pull/28518) — `GET /v1/models` 将枚举整数当作布尔值发出（b10585 引入的回归）→ 修复 PR 已开。
- [#28406](https://github.com/ggml-org/llama.cpp/pull/28406) — 移除已完成下载时服务器死锁 → 修复 PR 已开。
- [#20029](https://github.com/ggml-org/llama.cpp/issues/20029) — Mac x86 Vulkan AMD GPU 输出乱码（自 b8143 起）→ **关闭**，原因 stale。
- [#25884](https://github.com/ggml-org/llama.cpp/issues/25884) — Windows/Vulkan 在混合 AMD/Intel 上的 split-mode 损坏（自 74976e1 起）→ **关闭**，原因 stale。
- [#27856](https://github.com/ggml-org/llama.cpp/issues/27856) — HIP gfx1151 上 qwen4exp 在 1k 之后的解码减速 → **关闭**。
- [#25985](https://github.com/ggml-org/llama.cpp/issues/25985) — Polaris RX 580 上 glslc -O 下 CoopMat2 shader 失败 → **关闭**，原因 stale。
- [#25767](https://github.com/ggml-org/llama.cpp/issues/25767) — Intel Battlemage Linux 上 Vulkan 单元测试不稳定 → **关闭**，原因 stale。

## 6. 对应用开发者的意义

- **避免在 AMD iGPU Vulkan 上使用 `--lazy-mode auto` 的 qwen4exp（`Qwen3.8-Flash-Next`/`qwen4exp` 架构）**——自 257813839 起预填充减半；请固定该 commit 之前的构建版本或在上线前测试。[#28160](https://github.com/ggml-org/llama.cpp/issues/28160)
- **Vulkan + 128k+ 上下文需要子分配临时方案**：将 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` 设置上，直至该悬崖被修复——否则会损失约 78% 的解码吞吐。[#27734](https://github.com/ggml-org/llama.cpp/issues/27734)
- **CUDA 上的 MoE + 部分专家卸载目前不安全**：Qwen3.6-35B（及其同类）在带专家卸载的 flash-attn 中必然崩溃；在 [#26609](https://github.com/ggml-org/llama.cpp/issues/26609) 解决之前，请完全卸载或保持在 bf16。
- **不要在量化目标上依赖推测解码**：Q4_K_M 上贪心输出与基线发生偏离；若需要确定性输出，请保持在 bf16 或使用 ngram 推测。[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)
- **长上下文混合模型（Qwen3.5-hybrid，约 130k+）在 CUDA 和 CPU 上会静默输出 instant-EOS**——在代理服务中不要在没有校验内容长度的情况下信任 `finish_reason` 启发式逻辑。[#27756](https://github.com/ggml-org/llama.cpp/issues/27756)
- **服务器 UI 升级**：新的 Hugging Face Discover 对话框和下载管线（PRs #27947、#27959、#28418、#28419、#28405）以及内存适配估算（#27957）让终端用户无需离开 `llama-server` 即可浏览并拉取 GGUF 及附件（mmproj、imatrix、mtp/dflash/dspark/eagle3 draft）。预计缓存条目将以 `<quant>-<sidecar>` 形式拆分。
- **Qwen 上的工具调用解析器仍然脆弱**：#20837（thinking 块中的 XML，60 条评论）和 #28522（约 48 个可选参数下并行 tool_calls 被破坏）仍处于开放状态。为了工具调用的可靠性，请基于内容感知的解析器做 gating，不要在不同的 prompt 模板中假定 XML 或 JSON。
- **服务器子进程管理正在现代化**，趋向单线程异步模型（PRs #28539、#28555）——若你运维多模型路由器，这点值得关注；`--models-memory-margin`（#21231）是需要关注的动态卸载开关。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 简报 — 2026-09-08

## 1. 今日要点

2026-09-08 的动态主要围绕 **OpenAI 兼容性加固与 Gemma 4 解析**展开：PR #18299 新增 Gemma 4 `BEGIN_ARG` 工具调用解析，PR #18298 让 `/v1/responses` 接受 Codex 风格的 `agent_message` 项，PR #18296 修复 `tsc_` 工具搜索 ID 前缀，PR #16825 终于将 `num_ctx` 通过 `/v1/chat/completions` 透传出去。与此同时，llama.cpp 升级到 **b10829**（PR #18279），以解锁 Spark X2.5 支持；另有两条新报告指出 **0.33.x 相对 0.32.13 在 CUDA 上存在约 5 倍回退**，每个基础设施团队都应关注。

## 2. 发布与破坏性变更

过去 24 小时内没有新的标签版本发布。

不过，当前的活跃 issue 流记录了升级到 **0.33.x** 时值得注意的行为差异：
- [#18225](https://github.com/ollama/ollama/issues/18225) — 在相同模型/GPU 条件下，`0.33.2` 在 CUDA（RTX 3090，GA102）上比 `0.32.13` 慢约 5 倍。
- [#18129](https://github.com/ollama/ollama/issues/18129) — 调度器在成功加载后立即使用默认 4096 上下文重启 `llama-server`。
- [#18210](https://github.com/ollama/ollama/issues/18210)（已关闭）— `OLLAMA_DEBUG_LOG_REQUESTS` 会在不做脱敏的情况下持久化完整请求体；若在生产环境中启用，请视为凭据/PII 泄露风险。

## 3. 新增模型与硬件支持

- **[PR #18279](https://github.com/ollama/ollama/pull/18279)** — llama.cpp 从 `b10760` 升级到 `b10829`，是 Spark X2.5 系列（SparkLLM/Spark-X2.5-4B、-1.7B）的前置依赖；解除了 [#18195](https://github.com/ollama/ollama/issues/18195) 和 [#18290](https://github.com/ollama/ollama/issues/18290) 的阻塞。
- **[PR #18299](https://github.com/ollama/ollama/pull/18299)** — `model/parsers`：Gemma 4 `BEGIN_ARG`/`END_ARG` 工具调用解析器，并对畸形通道错误进行暴露。
- **[PR #18263](https://github.com/ollama/ollama/pull/18263)** — MLX runner：Qwen3.5/3.8 **静态 YaRN** 解析、M-RoPE 缩放，上下文可达 `factor * original_max_position_embeddings`。
- **[PR #18285](https://github.com/ollama/ollama/pull/18285)** — MLX runner：区分显式与自动 `num_ctx`，在调用方未指定值时保留柔性 VRAM 大小。
- **[PR #18258](https://github.com/ollama/ollama/pull/18258)** — `launch`：将 Qwen Code 的 `generationConfig.contextWindow` 与运行中的 Ollama 模型对齐。
- **[#18287](https://github.com/ollama/ollama/issues/18287)** — 请求：支持腾讯 **Hy4-preview** 模型（等待 GGUF 产物）。

## 4. 性能与优化

- **[PR #16998](https://github.com/ollama/ollama/pull/16998)** — 可选的 Prometheus `GET /metrics`（`OLLAMA_METRICS=1`），暴露 `ollama_requests_queued`、`ollama_queue_capacity`、`ollama_models_loaded`、`http_requests_total`，以及每模型 token 指标。对 SRE/自动扩缩容场景是重大改进。
- **[PR #18282](https://github.com/ollama/ollama/pull/18282)（已关闭）— 当模型永远无法装入时（例如在小型 VRAM 上设置 `num_ctx 262144`），调度器改为快速失败而非循环驱逐。
- **[PR #18289](https://github.com/ollama/ollama/pull/18289)** — 调度器重载路径，处理两个标签共享同一 blob 但需要不同 runner 标志的情况（例如多个 Modelfile 基于同一基础构建但 MTP 开关不同）。
- **[PR #18280](https://github.com/ollama/ollama/pull/18280)** — `x/transfer`：对已经等于完整 blob 的 `.tmp` 进行收尾处理；闭环了 [#15320](https://github.com/ollama/ollama/issues/15320) 关于可恢复下载的最后一段边角情况。
- **[PR #18291](https://github.com/ollama/ollama/pull/18291)** — `fs/gguf`：修复 `TensorInfo.NumValues()`/`NumBytes()` 中的 `int64` 溢出与 `float64` 往返问题；针对超大张量的正确性修复。

## 5. 稳定性与回退

按对基础设施的潜在影响排序：

| 严重程度 | Issue | 摘要 | 是否已修复 |
|---|---|---|---|
| **高** | [#18225](https://github.com/ollama/ollama/issues/18225) | 0.33.2 在 CUDA（RTX 3090）上比 0.32.13 慢约 5 倍 | 尚未修复 |
| **高** | [#18208](https://github.com/ollama/ollama/issues/18208) | 长生命周期的 `keep_alive -1` runner 在加载第二个模型后输出 `<unused49>` 乱码；只能通过完全重启解决 | 尚未修复 |
| **高** | [#17841](https://github.com/ollama/ollama/issues/17841)（已关闭）| 0.32.14 在 sm_86（RTX 30/A40/A6000）上静默回退到 CPU — CUDA 13 移除了 8.6，CUDA 12 回退路径失效 | 仅作为跟踪项 |
| **高** | [#17870](https://github.com/ollama/ollama/issues/17870)（已关闭）| gfx1151（Strix Halo）上 Vulkan 在长 prompt prefill 时出现 `ErrorDeviceLost`；可临时设置 `num_batch=128` 绕过 | 已关闭并附说明 |
| **中** | [#18129](https://github.com/ollama/ollama/issues/18129) | 调度器在加载后立即使用默认 ctx 重启 `llama-server` | 尚未修复 |
| **中** | [#17910](https://github.com/ollama/ollama/issues/17910)（已关闭）| 0.32.11→0.32.15 回退：长 completion 永不停止（M1 Max / macOS）| 已关闭并附说明 |
| **中** | [#17782](https://github.com/ollama/ollama/issues/17782) | `qwen3.8:27b` 在加载 `TensileLibrary_lazy_gfx1200.dat` 时 ROCm 崩溃（RX 9060 XT）| 尚未修复 |
| **低** | [#18286](https://github.com/ollama/ollama/issues/18286) | `/v1/responses` 拒绝 `agent_message` | 由 [#18298](https://github.com/ollama/ollama/pull/18298) 修复 |
| **低** | [#16814](https://github.com/ollama/ollama/issues/16814)（已关闭）| `/v1/chat/completions` 忽略 `num_ctx` | 由 [#16825](https://github.com/ollama/ollama/pull/16825) 修复 |
| **低** | [#18274](https://github.com/ollama/ollama/issues/18274) | 80 字符的模型名校验会拒绝较长的 HF 名称 | 尚未修复 |

## 6. 对应用开发者的意义

- **若通过 `/v1/chat/completions` 发布服务**，你终于可以信赖请求级别的 `num_ctx`（[#16825](https://github.com/ollama/ollama/pull/16825)）— 不再需要"设置 `OLLAMA_CONTEXT_LENGTH` 环境变量或回退到 `/api/chat`"这种变通方案。
- **基于 Codex 的智能体**将子任务以 `agent_message` 项形式委派时，现在可以通过 Ollama Cloud 干净地往返（[#18298](https://github.com/ollama/ollama/pull/18298)、[#18296](https://github.com/ollama/ollama/pull/18296)）。
- **Gemma 4 工具调用智能体**获得了真正的解析器（[#18299](https://github.com/ollama/ollama/pull/18299)）；请注意，畸形的 `BEGIN_ARG` 块会以解析器错误的形式暴露，而不是静默损坏。
- **使用 Qwen3.5/3.8 的本地 Apple Silicon（MLX）用户**现在无需手工调优即可触及长上下文 YaRN 窗口（`PR #18263`、`#18285`）。
- **在 CUDA 上请谨慎钉住版本**：在至少一个 RTX 3090 工作负载上，0.32.13 目前优于 0.33.x（[#18225](https://github.com/ollama/ollama/issues/18225)）；升级前请充分测试。
- **与 OpenRouter/Zen 的 prompt-cache 对齐**是 Ollama Cloud 订阅用户呼声最高的开放特性请求（[#16714](https://github.com/ollama/ollama/issues/16714)，37 条评论，4 👍）— 若你正在为智能体工作负载挑选聚合服务，这一点很关键。
- **安全**：在隔离调试之外请关闭 `OLLAMA_DEBUG_LOG_REQUESTS`（[#18210](https://github.com/ollama/ollama/issues/18210)）— 请求体（系统提示、工具定义、RAG 上下文）会被原样写入。
- **关注即将到来的** [#17566](https://github.com/ollama/ollama/pull/17566)（带 token 预算的 `think` 块）— 直接针对当前会耗尽整个上下文窗口的 Gemma 4 推理循环问题。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-08

## 1. 今日要点

过去 24 小时内未发布新版本，但维护者打开了 [PR #40176](https://github.com/BerriAI/litellm/pull/40176)，将消费行身份修复回移植并从 `stable/1.100.x` 拉出 **v1.100.1**。安全态势通过两个已关闭的 PR 得到了改善：`GET /customer/info` 上的代理管理员 RBAC（[#39524](https://github.com/BerriAI/litellm/pull/39524)）以及对 MCP 静态 headers/stdio 环境密钥的静态加密（[#40164](https://github.com/BerriAI/litellm/pull/40164)）。最迫切的运营事项仍然是外部的：OpenCode Go 的托管推理 API 自 09/05 起开始拒绝没有 `x-opencode-session` 头的请求，影响约 635 个 LiteLLM 客户组织（[Issue #39503](https://github.com/BerriAI/litellm/issues/39503)，41 👍）。

## 2. 发布与破坏性变更

- **窗口内无新发布。** **v1.100.1 正在准备中**，通过 [PR #40176](https://github.com/BerriAI/litellm/pull/40176)：修复了双重哈希的消费行在 Usage/BI 仪表板中显示为 `key-hash-...` 且没有别名/邮箱的问题，以及健康检查消费行渲染为原始 sha256 的问题。运行 1.100.0 的运维人员应计划此补丁升级。
- **外部破坏性变更：** 自 09/05 起，OpenCode Go 拒绝缺少 `x-opencode-session`（按会话路由 ID）的请求；LiteLLM 目前没有注入按会话头的机制（[Issue #39503](https://github.com/BerriAI/litellm/issues/39503)）。暂无记录的解决方案。
- **即将到来的贡献者工作流变更：** [PR #40172](https://github.com/BerriAI/litellm/pull/40172) 删除了主分支源码保护，预示着即将切换默认分支。

## 3. 新模型与硬件支持

- **Gandr TTS 提供商**在 [PR #36624](https://github.com/BerriAI/litellm/pull/36624) 中提出 — 镜像了 ElevenLabs 适配器的形态；默认 wav（也支持 pcm），速度限制在 0.6–1.5。
- **Fireworks AI 原生 Responses API** 配置在 [PR #39826](https://github.com/BerriAI/litellm/pull/39826) 中关闭/合并 — 启用了服务端 MCP 工具（`type: "mcp"`），而 chat-completions 桥接直接拒绝了这些工具，同时支持 `previous_response_id`。
- **新模型注册表存在缺口：** `openrouter/openai/gpt-5.6-sol` 在 `model_prices_and_context_window.json` 中缺失（[Issue #40102](https://github.com/BerriAI/litellm/issues/40102)）；`gpt-6-astra` 注册为 `mode: "chat"`，因此通过 `/v1/chat/completions` 的工具调用被拒绝，且 Responses 桥接从未启动（[Issue #40123](https://github.com/BerriAI/litellm/issues/40123)）。

## 4. 性能与优化

- **Rust/Python 边界性能门控：** [PR #40008](https://github.com/BerriAI/litellm/pull/40008) 通过生产路径增加了 45 个 release-wheel 基准测试 — 表明 Rust 核心重写正在被未来纳入性能门控。
- **自动路由器成本控制：** 新的 "Shunt" 切换限制了大型文件读取并将样板代码生成委托给更便宜的模型（[PR #40158](https://github.com/BerriAI/litellm/pull/40158)）；启发式复杂度评分器的声明式自定义维度（[PR #40156](https://github.com/BerriAI/litellm/pull/40156)）；分类消费现在在 UI 中与 LLM 消费分项列出（[PR #40168](https://github.com/BerriAI/litellm/pull/40168)）。
- **成本核算：** `/cost/estimate` 新增缓存和推理 token 输入（[PR #40174](https://github.com/BerriAI/litellm/pull/40174)）；一次性 Claude Code 子代理将跳过无用的缓存写入注入（[PR #40175](https://github.com/BerriAI/litellm/pull/40175)）。
- **数据库韧性：** 默认 `max_idle_connection_lifetime=60` 已合并（[PR #38600](https://github.com/BerriAI/litellm/pull/38600)）— 消除了 RDS/Cloud SQL/Azure 上因静默丢弃空闲连接导致的 `Error { kind: Closed }`。
- **负面信号：** v3 速率限制器对 `model_per_team` 限制双重计数，使有效 RPM/TPM 减半（[Issue #34140](https://github.com/BerriAI/litellm/issues/34140)）。

## 5. 稳定性与回归

按严重程度排序；除非注明，否则均为开放状态。

1. **预算执行竞争** — 来自未知终端用户的并发首次请求绕过默认预算（`max_end_user_budget_id` 路径）（[Issue #40095](https://github.com/BerriAI/litellm/issues/40095)，提交于 09/07）。暂无修复 PR。
2. **流式流量未计费** — 流式 `/v1/responses` 成功记录器在 `'dict' object has no attribute 'usage'` 上崩溃；未写入消费行，请求无法计费（[Issue #29913](https://github.com/BerriAI/litellm/issues/29913)）。
3. **v1.91.0 回归，Claude Code 工具使用** — `sanitize_tool_use_ids_in_anthropic_messages` 在 vLLM/Kimi K2.7 透传上破坏多轮工具调用；自 7 月初开放（[Issue #32214](https://github.com/BerriAI/litellm/issues/32214)）。
4. **速率限制减半** — 每团队每模型限制以约 N/2 执行（[Issue #34140](https://github.com/BerriAI/litellm/issues/34140)）。
5. **#30210 类回归** — `HiddenParamsAsyncIteratorWrapper` 隐藏了 `completed_response`，在流式 `/v1/responses` 上跳过容器所有权（[Issue #40120](https://github.com/BerriAI/litellm/issues/40120)）。
6. **Bedrock 透传** 在非流式 `/converse` 上返回 HTTP 200 和空响应体（[Issue #40131](https://github.com/BerriAI/litellm/issues/40131)）；另外，invoke 路径将内部 `optional_params` 泄漏到请求体中（[Issue #30371](https://github.com/BerriAI/litellm/issues/30371)）。
7. **静默参数丢弃** — `reasoning_effort` 在非 Anthropic/Nova2/GPT-OSS Bedrock 模型（如 Qwen3）上被丢弃（[Issue #34105](https://github.com/BerriAI/litellm/issues/34105)）。
8. **`drop_params` 错误** — 每模型 `drop_params` 作为多部分字段泄漏到 `/v1/images/edits`（[Issue #40153](https://github.com/BerriAI/litellm/issues/40153)）；字符串值 `"true"` 在所有提供商中被读取为关闭 — 修复 PR 自 7 月起开放（[PR #33738](https://github.com/BerriAI/litellm/pull/33738)）。
9. **缓存正确性** — v1.99.0 的 `prompt_cache_key` 修复将键固定到 `user_id`，因此它永远不会改变（[Issue #39145](https://github.com/BerriAI/litellm/issues/39145)）；Anthropic→OpenAI Responses 桥接丢弃了 `encrypted_content`，因此推理模型的提示缓存永远不会传递（[Issue #39339](https://github.com/BerriAI/litellm/issues/39339)）。
10. **杂项：** Headroom CCR 在强制 `stream=false` 后留下 `stream_options` → DeepSeek 400（[Issue #40068](https://github.com/BerriAI/litellm/issues/40068)）；所有五个 `/v1/files` 路由为错误 `type`/`param` 输出字面量 `"None"`（[Issue #40135](https://github.com/BerriAI/litellm/issues/40135)）；非标准主机的透传分块解析失败（[Issue #40117](https://github.com/BerriAI/litellm/issues/40117)）。

**已关闭/已解决：** OOM 后内存增长（[#38193](https://github.com/BerriAI/litellm/issues/38193)）、OAuth2 MCP 返回 500 而非 401+WWW-Authenticate（[#29261](https://github.com/BerriAI/litellm/issues/29261)）、claude-agent-sdk 裸字段 schema 导致 Gemini 工具参数幻觉（[#28515](https://github.com/BerriAI/litellm/issues/28515)）、guardrail 策略持久化（[#29416](https://github.com/BerriAI/litellm/issues/29416)）、MCP 模板 guardrail 创建（[#30953](https://github.com/BerriAI/litellm/issues/30953)）。

## 6. 对应用开发者的意义

- **OpenCode Go 用户目前很可能已中断。** 如果你通过 LiteLLM 路由到它，自 09/05 起请求一直在报错，因为缺少 `x-opencode-session`；目前还没有原生的按会话头注入 — 关注 [#39503](https://github.com/BerriAI/litellm/issues/39503) 并考虑在网关前放置一个注入头的 shim。
- **vLLM/Kimi K2.7 上的 Claude Code：** ≥v1.91.0 透传上的多轮工具工作流已中断（[#32214](https://github.com/BerriAI/litellm/issues/32214)）— 固定到旧版本或使用非透传路由。
- **审查你的缓存命中率。** 如果你将 Anthropic 格式客户端桥接到 OpenAI 推理模型，或升级到了 v1.99.0+，提示缓存很可能没有按预期工作（[#39145](https://github.com/BerriAI/litellm/issues/39145)、[#39339](https://github.com/BerriAI/litellm/issues/39339)）— 你可能正在为重复上下文支付全价。
- **网关运维人员：** 验证消费日志是否捕获了流式 `/v1/responses` 流量（[#29913](https://github.com/BerriAI/litellm/issues/29913)）并健全性检查团队每模型限制是否以配置值的一半进行节流（[#34140](https://github.com/BerriAI/litellm/issues/34140)）。计划 v1.100.1 升级以恢复可读的消费身份。
- **暂不要通过 LiteLLM 采用 `gpt-6-astra` 或 `gpt-5.6-sol`** — 注册表模式/价格条目已损坏（[#40123](https://github.com/BerriAI/litellm/issues/40123)、[#40102](https://github.com/BerriAI/litellm/issues/40102)）。
- **严格的预算执行存在竞争：** 来自新终端用户的并发首次请求可能超过默认预算（[#40095](https://github.com/BerriAI/litellm/issues/40095)）— 在需要硬上限的地方预配置终端用户预算。
- **安全卫生：** 及时升级以获取加密的 MCP 密钥和 customer-info RBAC；如果你的数据库曾暴露过，请轮换 MCP 静态 headers 和 stdio 环境凭证（[PR #40164](https://github.com/BerriAI/litellm/pull/40164)、[PR #39524](https://github.com/BerriAI/litellm/pull/39524)）。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-08

## 今日要点

今天的活动主要由 **Studio 的体验性修复** 主导（来自 Studio 团队的多份小范围 PR，涵盖 MCP 图片透传、工具调用持久化、卸载行为以及 GitHub API 限流规避），同时还有 **两件值得跟踪的基础设施进展**：`unsloth/spec_decoding` 模块落地用于测量草稿模型接受率（[#10416](https://github.com/unslothai/unsloth/pull/10416)），以及对 Windows-on-ARM 和 AMD ROCm 安装路径的持续加固。过去 24 小时内无任何软件包发布。

## 发布与重大变更

过去 24 小时内无新版本发布。

## 新模型与硬件支持

- **Qwen 3 AVL 2B / 0.6B** 已提出支持请求（[Issue #10459](https://github.com/unslothai/unsloth/issues/10459)）—— 融合 LM + ViT + ASR 的架构；社区请求获得 Unsloth 的一等支持。
- **Windows on ARM + NVIDIA** —— PR [#10282](https://github.com/unslothai/unsloth/pull/10282) 为 GB10 / N1X / RTX Spark 主机启用了原生 ARM64 CUDA 栈；此前所有 ARM64 Windows 机器都被视为"无 GPU"。
- **NVIDIA + AMD 混合主机上的 AMD** —— [Issue #10450](https://github.com/unslothai/unsloth/issues/10450) 报告安装器选择了 CUDA 版 PyTorch，从未探测 AMD 显卡；训练侧没有按 GPU 选择的机制（聊天侧已有 Vulkan 临时方案）。
- **qwen3.6 35B A3B 经 MLX API** —— [Issue #10389](https://github.com/unslothai/unsloth/issues/10389) 报告在 MLX API 路径下，视觉输入（base64 和 URL）静默地未能抵达模型。

## 性能与优化

- **推测解码接受率测量** —— 新模块 `unsloth/spec_decoding`（[PR #10416](https://github.com/unslothai/unsloth/pull/10416)，关闭 [#10401](https://github.com/unslothai/unsloth/issues/10401)）。为 `llama.cpp --model-draft` 与 MTP drafter sidecar 提供草稿/目标接受率指标，使用户可在部署前判断某个草稿模型是否值得上线。
- **卸载规划器 vs llama.cpp 自带的 fitter**（[PR #9872](https://github.com/unslothai/unsloth/pull/9872)）—— 为 `llama-server` 加载增加了成本门控、子 FFN 溢出阶梯、上下文感知的设备保留，以及启动排序。所有变更均由 `UNSLOTH_SMART_OFFLOAD` 控制开关保护。
- **更新期间降低 GitHub API 压力**（[PR #10461](https://github.com/unslothai/unsloth/pull/10461)）—— 安装器此前在一次请求已拿到完整负载的情况下，仍对每个 llama.cpp 版本的发布文件列表单独重新拉取；现在改为使用缓存的列表。关闭 [#10449](https://github.com/unslothai/unsloth/issues/10449)。

## 稳定性与回归

按严重程度排序。如有修复 PR 会一并注明。

**高**
- **[#3533](https://github.com/unslothai/unsloth/issues/3533) —— Unsloth 在 Intel Arc B580 上无法导入。** `unsloth_zoo/temporary_patches/gpt_oss.py:540` 调用了 `torch.xpu.memory.mem_get_info()`，该接口在 Intel Arc 上不支持。自 2025-10-30 起开放；尚无修复 PR。任何试图加载 GPT-OSS 系列模型的 XPU 用户都会被阻断。
- **[#10415](https://github.com/unslothai/unsloth/issues/10415) —— Wan2.2 TI2V 在 AMD RX 9060 XT 上 OOM**，原因是缺少可用的融合注意力内核；回退到 SDPA math 使内存超出预算。尚无修复 PR。
- **[#10389](https://github.com/unslothai/unsloth/issues/10389) —— qwen3.6 35B A3B MLX API 丢失图像。** base64 与 URL 输入均被忽略；模型在未见附带图像的情况下作答。尚无修复 PR。

**中**
- **[#10433](https://github.com/unslothai/unsloth/issues/10433) / [#10434](https://github.com/unslothai/unsloth/issues/10434) —— 安装器中 torchcodec 版本解析缺陷。** Torch 2.3 / 2.4 会一路落到 torch-2.10 对应的 torchcodec 线路；针对 `torchcodec>=0.12` 的 ABI 稳定豁免甚至在 cu128 下不存在 0.12+ 的 wheel 时仍被应用。影响多个 CUDA 12.8 安装。
- **[#10341](https://github.com/unslothai/unsloth/issues/10341) —— AMD ROCm 上"No Ram Offload"复选框被忽略。** 即便勾选，模型仍卸载到 RAM（Studio v0.1.806-beta，llama.cpp b10798-mix-659e406，W7900+W7500）。
- **[#10437](https://github.com/unslothai/unsloth/issues/10437) —— 切换模型下载目录后 GGUF 量化消失。** [PR #10438](https://github.com/unslothai/unsloth/pull/10438) 的修复保留单一仓库记录，并跨缓存目录发现变体。
- **[#10460](https://github.com/unslothai/unsloth/issues/10460) —— Windows venv 加固测试在两种 PowerShell 下均失败**（自 #10386 起 CI 红）。[PR #10462](https://github.com/unslothai/unsloth/pull/10462) 将管道以 UTF-8 解码以修复。

**低**
- **[#10436](https://github.com/unslothai/unsloth/issues/10436) —— Studio 的"告诉模型今天的日期"覆盖 Ollama Modelfile 的 SYSTEM 提示。** [PR #10463](https://github.com/unslothai/unsloth/pull/10463) 的修复已就位。
- **[#10400](https://github.com/unslothai/unsloth/issues/10400) —— 部分 harness 的空 bearer token 被免密认证拒绝**（已关闭）。
- **[#10411](https://github.com/unslothai/unsloth/issues/10411) —— 长 API key（238 字符）下出现 `RSAES-OAEP: input message length is too long`**（已关闭）。

## 对应用开发者的意义

- **若你使用 torch 2.3 / 2.4，请勿将 torchcodec 锁到与 torch 2.10 绑定的版本** —— Studio 安装器目前正错误地映射该规格。请等待 [#10433](https://github.com/unslothai/unsloth/issues/10433) 合入，或显式覆写该行。
- **AMD ROCm 上的混合工作负载用户**应暂时避开"No Ram Offload"开关（[#10341](https://github.com/unslothai/unsloth/issues/10441)）以及 Wan2.2 TI2V 推理（[#10415](https://github.com/unslothai/unsloth/issues/10415)），直至缺失的注意力内核落地。
- **如果你正部署草稿模型推测解码**，新的 `unsloth/spec_decoding` 工具（[PR #10416](https://github.com/unslothai/unsloth/pull/10416)）可为每对草稿/目标提供确定的接受率读数 —— 比凭肉眼估算 tokens/sec 可靠得多。
- **Studio 上的 Ollama Modelfile 用户**：SYSTEM 提示此前会被日期注入覆盖；[PR #10463](https://github.com/unslothai/unsloth/pull/10463) 已修复。
- **MCP 工具链**：[PR #10088](https://github.com/unslothai/unsloth/pull/10088) 终于将 MCP 返回的图片作为独立消息部分转发给模型，避免模型凭空臆测图片内容。
- **Studio `unsloth start`**（[PR #10453](https://github.com/unslothai/unsloth/pull/10453)）现在不再打断正在进行的模型下载；可以预期大模型/慢链路下的首次启动时间会合理地变长，而不是以误导性的"未就绪"信息报错。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 摘要 — 2026-09-08

## 今日要点
CCR 这一天发布上比较安静,但 triage 日非常忙碌:社区已经为全部三个新 issue 匹配了对应的 PR,分别涉及一个导致 Claude Cowork 网页搜索失效的工具名归一化 bug、CCR 重启后持久化设置丢失,以及 CCR 无法识别的一个企业级 OpenAI 兼容端点。TypeScript 7 前向兼容的工作也通过一次小幅 `tsconfig` 清理落地了。过去 24 小时内没有新版本发布。

## 版本发布与破坏性变更
过去 24 小时内没有版本发布。三个待合并的 PR（#1769、[#1767](https://github.com/musistudio/claude-code-router/pull/1767)、[#1764](https://github.com/musistudio/claude-code-router/pull/1764)）目前都尚未合并,因此没有迁移说明需要关注。

## 新模型与硬件支持
今日活动中无相关报告。

## 性能与优化
今日的 diff 中没有吞吐量/延迟/内存相关的工作。

## 稳定性与回归

1. **高 — Fusion `web_search` 在 Claude Cowork 上静默失效**（[#1766](https://github.com/musistudio/claude-code-router/issues/1766)）
   网关的工具名匹配函数（`coreGatewayWebSearchToolNameMatches()`）使用 `toLowerCase().replace(/[-.]/g, "_")` 对客户端工具名做归一化处理。Claude Cowork 将其搜索能力实现为一个名为 `WebSearch` 的普通函数工具（camelCase,没有 `type` 字段）,归一化后变成 `"websearch"`,从而错过了全部三项现有检查（`=== "web_search"`、`endsWith("_web_search")`、`includes("search_web")`）。最终效果是:Cowork 的网页搜索请求会被 CCR 的 fusion 层静默丢弃。
   **修复 PR:** [#1767](https://github.com/musistudio/claude-code-router/pull/1767) — 在匹配函数中显式增加 CamelCase 处理逻辑。

2. **高 — #1736 之后,每次 CCR 重启仍会清空用户设置**（[#1768](https://github.com/musistudio/claude-code-router/issues/1768)）
   #1736 修复了 takeover-apply 路径以保留未知字段,但*退出时*的 restore（`restoreClaudeAppGatewayConfig`）仍然用一个仅含 12 个字段的裸 stub 覆盖当前 configLibrary 条目,并重写根 config。形如 `/configLibrary/8f69f2f1….json` 的文件在关闭时消失,重启后以精简条目的形式重新出现。Claude 写入当前条目的任何设置（`chatTabEnabled`、`modelPrefer1mContext` 等）都会丢失。
   **修复 PR:** [#1769](https://github.com/musistudio/claude-code-router/pull/1769) — 让退出时的 restore 改为外科手术式操作,仅撤销 takeover 实际写入的键。

3. **中 — 自定义/企业级 OpenAI 兼容端点无法被自动识别**（[#1765](https://github.com/musistudio/claude-code-router/issues/1765)）
   CCR 可以正常对接公共 provider（例如 DeepInfra）,但无法识别一家公司内部用于服务本地模型（Deepseek、Gemma）的 OpenAI 格式端点。`curl` 与 Open WebUI 对同一端点工作正常,因此这看起来更像是探测/协议识别层面的缺口,而非线协议格式问题。
   **修复 PR:** 暂无。建议关注维护者对所支持端点形态的回应。

4. **低 — TS 6+ 下 `tsconfig` `baseUrl` 的弃用提示噪音**（[#1764](https://github.com/musistudio/claude-code-router/pull/1764)）
   TypeScript 6 会输出 `"baseUrl" is deprecated… will stop functioning in TypeScript 7.0` 的提示。仓库当前固定在 `typescript@5.9.3`,因此 CI 保持绿灯,但使用更新版本 TS 的编辑器会暴露该警告。该 PR 直接移除 `baseUrl`,以使配置与 TS 7 兼容。

## 对应用开发者的影响
- **Cowork 用户需要等待 #1767 合入之后,才能依赖 CCR fusion 层的网页搜索** —— 当前是静默 no-op。如果你依赖 Cowork 的搜索功能,请回退到回归前的版本,或者暂时禁用 fusion 的 `web_search` 规则作为变通。
- **重启时的设置丢失（#1768）对任何在运行时修改 config 的部署来说都是真实的可靠性风险。** 在 #1769 合入之前,请将每一次 CCR 重启视为一次破坏性操作:在重启进程前对 `/configLibrary/*.json` 与根 config 进行快照。合入后,需要验证 `chatTabEnabled`、`modelPrefer1mContext` 等运行时开关能够经受住一次 stop/start 周期。
- **如果你正将 CCR 对接一个内部 OpenAI 兼容网关（#1765）,** 当前必须绕过 CCR 的自动识别 —— 直接在 provider 条目中显式填写 base URL 与协议提示。该处一个干净的修复将显著扩展 CCR 在企业内网环境中的可用性。
- **上游 TypeScript 工具链的漂移虽小但真实存在。** 如果你的编辑器今天已经在用 TS 6,那么预计会在该代码库上看到 `baseUrl` 相关警告；[#1764](https://github.com/musistudio/claude-code-router/pull/1764) 在不带语义变更的前提下解决了这一问题。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 简报 — 2026-09-08

## 今日要点

CC Switch v3.20.2 作为面向 Codex 的兼容性补丁发布，终于让 **xAI Grok** 通过原生 Responses API 与 Codex 一起路由，同时修复了四个上游特有的边缘情况（工具 schema、整数/浮点强制转换、多 agent 邮件注入、未知的 Codex role ID）。今天的 PR 流水线主要由网关/路由器扩展主导：**GitHub Copilot 面向 Codex 的 provider**（具备能力驱动的 Responses/Chat 路由）、用于将 Auto Mode 安全分类流量拆分到独立 provider 链的全新 **classifier queue**，以及在所有主流 CLI 上落地的**单 provider 多 API key** 支持。

## 版本发布与破坏性变更

- **[v3.20.2](https://github.com/farion1231/cc-switch/releases/tag/v3.20.2)** — Codex 侧兼容性版本。暂无破坏性配置变更记录；使用 v3.20.1 并通过 OAuth 路由 Grok 的用户应升级（v3.20.1 的切换开关错误地阻止了 Grok OAuth）。随附的其他修复：Codex 在接管后不再卡在登录界面；通过 Codex OAuth 接入的 GPT-6 不再报"needs Codex update"；Claude Code 路径也做了调整。

## 新模型与硬件支持

- **GitHub Copilot 托管账户接入 Codex**（[PR #7157](https://github.com/farion1231/cc-switch/pull/7157)）— Codex 始终通过本地 Responses 端点接入；代理会检查 `supported_endpoints` 与上游格式以选择 Responses 或 Chat Completions、处理鉴权并适配响应。实际效果是把 Copilot 变成了 CC Switch 内部的一个托管 provider。
- **Qwen 3.8 系列在全部 7 款应用中刷新**（[PR #7183](https://github.com/farion1231/cc-switch/pull/7183)）— 国内"Bailian"预设更名为 **千问AI平台 (QwenAI Platform)**；Qwen 模型在 Claude Code、Claude Desktop、Codex、Hermes、OpenClaw、OpenCode、Pi 中全部升级到 3.8 代。
- **Token Market provider 预设**（[PR #7184](https://github.com/farion1231/cc-switch/pull/7184)）— 为 6 款应用提供内置预设：Claude 使用 Anthropic Messages，Codex 使用 OpenAI Responses，OpenCode/OpenClaw/Hermes 使用 Chat Completions。
- **DeepSeek Harness (DSH) 应用类型**（[PR #6526](https://github.com/farion1231/cc-switch/pull/6526)）— 新应用类型，使用官方 `baseURL` 写入 `settings.yaml`；优先解析 `DSH_HOME`，回退到 `~/.dsh`。

## 性能与优化

- **Claude Code Auto Mode 的分类器队列**（[PR #6602](https://github.com/farion1231/cc-switch/pull/6602)）— 将安全分类请求（Bash 执行前发出）路由到独立的 provider 链，拥有自己的 `base_url` 与凭据，作为 #4987 中 provider 内模型切换的补充。可实现跨 provider 扇出：主对话跑在 provider A 上，分类器跑在 provider B 上。暂无量化数据 — 已识别三种独立请求签名用于匹配。
- **CLI 提示缓存命中潜力**（[Issue #3990](https://github.com/farion1231/cc-switch/issues/3990)，已关闭）— 因陈旧而关闭；讨论内容是拦截 Claude Code 在系统提示中自动注入的任务提醒，以提高重路由时的缓存复用。
- **Dependabot：cargo-deps 组批量升级**（[PR #7195](https://github.com/farion1231/cc-switch/pull/7195)）— `src-tauri` 中 52 项 Rust 依赖更新（serde、serde_json、log 等）。无性能声明；常规维护。

## 稳定性与回归

**高严重性：**
- **Codex + DeepSeek 心跳注入永久损坏会话**（[Issue #6995](https://github.com/farion1231/cc-switch/issues/6995)）— 心跳自动化向 `/v1/responses` 注入了一条缺少 `call_id` 的 `function_call_output`，此后上游对每个后续请求返回 400，该线程无法恢复（新建线程正常）。尚未有修复 PR。
- **Provider 切换后旧 Codex 会话泄漏到 api.openai.com**（[Issue #5672](https://github.com/farion1231/cc-switch/issues/5672)）— 在 `preserveCodexOfficialAuthOnSwitch = true` 下，只有**旧**账户时期的会话会打到 `api.openai.com` 并返回 401；新会话正常工作。未关闭。
- **配额耗尽 + 中转切换后 Codex 模型卡死**（[Issue #7056](https://github.com/farion1231/cc-switch/issues/7056)）— Codex 2026.9.2 升级后达到配额上限，切换中转 API 时已无法再更换模型。未关闭。

**中严重性：**
- **Claude Code `settings.json` 覆盖 `enabledPlugins` / `statusLine`**（[Issue #3631](https://github.com/farion1231/cc-switch/issues/3631)）— 每次 provider 切换都做完整重写，清空插件状态并重置 `statusLine.command`。已关闭（很可能已在近期版本中修复）。
- **Codex `/responses` 流式响应在 `response.completed` 前断开**（[Issue #2750](https://github.com/farion1231/cc-switch/issues/2750)）— Windows + Codex desktop 通过本地代理接入 OpenAI 兼容中转；直连正常。已关闭。
- **`requires_openai_auth = true` 绕过 CC Switch 路由**（[Issue #4393](https://github.com/farion1231/cc-switch/issues/4393)）— routing-mode 写入强制 Codex 绕过代理直连 OpenAI 鉴权。已关闭。
- **Codex 本地代理缺少 `/v1/images/generations` → 404**（[Issue #5429](https://github.com/farion1231/cc-switch/issues/5429)）— 已关闭。
- **自定义 provider 自签 HTTPS 触发代理 502**（[Issue #5042](https://github.com/farion1231/cc-switch/issues/5042)）— 未关闭，陈旧。
- **阿里云 Bailian 死 IPv6 上代理挂死约 150s（无 happy-eyeballs）**（[Issue #5096](https://github.com/farion1231/cc-switch/issues/5096)）— 未关闭，陈旧。

**低严重性 / 已关闭：**
- Claude Code 上 GPT-6-ASTRA 400（[#7131](https://github.com/farion1231/cc-switch/issues/7131)）、Kimi 400（[#6968](https://github.com/farion1231/cc-switch/issues/6968)）、Kimi-for-coding `/responses` 400（[#6861](https://github.com/farion1231/cc-switch/issues/6861)）、Codex 上 DeepSeek v4-vision 上传失败（[#6998](https://github.com/farion1231/cc-switch/issues/6998)）。

**今日已合入的修复 PR：**
- Codex 托管账户悬挂恢复（[PR #7060](https://github.com/farion1231/cc-switch/pull/7060)）
- 技能安装器兼容 `skillId` 与目录名不一致的情况（[PR #6381](https://github.com/farion1231/cc-switch/pull/6381)）
- 对 `CLAUDE.md` / `AGENTS.md` 的外部编辑现在会刷新 Prompts 面板（[PR #7194](https://github.com/farion1231/cc-switch/pull/7194)）
- tsconfig 在 TypeScript 7 之前移除 `baseUrl`（[PR #7193](https://github.com/farion1231/cc-switch/pull/7193)）
- 修复 EN/JA 下成本计价下拉框宽度（[PR #6980](https://github.com/farion1231/cc-switch/pull/6980)）
- Pi 表单的 i18n key 补全（[PR #6768](https://github.com/farion1231/cc-switch/pull/6768)，后续 [#7187](https://github.com/farion1231/cc-switch/pull/7187)）

## 对应用开发者的意义

- **混合厂商路由正在成为一等公民。** Classifier queue PR（#6602）是对 agent 开发者而言最具架构意义的变更：你现在可以把 Auto Mode 的安全分类器路由到与主对话不同的 provider（和凭据）上。如果你正在 Claude Code 上构建 agent，并希望用一个便宜/快速的本地或其他模型做分类，这就是那个开关 — 但它默认是关闭的，需要主动启用。
- **单 provider 多 API key 正在落地**（[PR #7188](https://github.com/farion1231/cc-switch/pull/7188)，关闭 [#7185](https://github.com/farion1231/cc-switch/issues/7185)）— 向后兼容旧的单字符串存储。覆盖 Claude、Codex、Gemini、OpenCode、OpenClaw、Hermes。能在同一个 provider 定义内实现故障转移与轮换；对需要在多个账单账户间管理容量的团队非常有用。
- **Codex Responses API 代理是事实上的集成边界。** 三个值得关注的点：(1) 像 DeepSeek 这样会自行注入心跳/自动化的 provider，在发布前需要校验其 `call_id` 处理 — 见 [#6995](https://github.com/farion1231/cc-switch/issues/6995)；(2) `preserveCodexOfficialAuthOnSwitch = true` **不会**回溯重定向已打开的 Codex 会话（[#5672](https://github.com/farion1231/cc-switch/issues/5672)）— 应提示用户在切换后开启新会话；(3) Codex 配额耗尽 + 中转故障转移目前是坏的（[#7056](https://github.com/farion1231/cc-switch/issues/7056)）。
- **Copilot 用户终于获得托管账户路径**，经由 Codex 接入（[PR #7157](https://github.com/farion1231/cc-switch/pull/7157)）— 能力驱动的端点选择意味着，只要新 Copilot 模型暴露 `supported_endpoints`，就不必再为它们单独更新 CC Switch。
- **运维提示：** 如果你把 CC Switch 部署在阿里云 NLB 端点后并启用了 IPv6，目前缺乏 happy-eyeballs，会出现约 150s 的尾部延迟（[#5096](https://github.com/farion1231/cc-switch/issues/5096)）— 在该问题修复前，请固定到 IPv4 或在代理前置一层网关。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-08

## 1. 今日要点

v1.0.0-rc.35 版本带来 **Wan 3.0 视频模型支持**，以及对**任务插件路由**的重大重构 —— 关闭插件不再静默回退到同名内置插件；内置插件现在回显请求中的模型名称（遵循模型重定向规则），而不是上游真实 ID。这是一项行为变更，任何运行自定义任务管线的用户都必须审查。稳定性方面，今天暴露出两个计费正确性缺陷（#7241、#7231），异常终止的流式请求要么不计费，要么在客户端断开后仍然继续扣费。

## 2. 版本发布与破坏性变更

**v1.0.0-rc.35** ([release notes](#))：Wan 3.0 视频模型、插件路由重构。

- **任务插件控制简化为两层：** 总开关 + 各插件独立开关。关闭某个命名插件不再将该模型路由到同名内置插件。
- **模型回显语义变更：** 内置插件现在返回请求中的模型名称（经模型重定向后），而非上游真实模型 ID。日志、计费展示以及任何依赖上游 ID 的下游指纹识别逻辑都需要重新验证。
- **迁移指引：** 此前依赖自动回退到内置插件的运维人员，升级前应显式启用相应的内置插件，或通过模型重定向映射固定模型。

## 3. 新模型与硬件支持

- **阿里 Wan 3.0 全能视频模型** —— 通过 [#7240](https://github.com/QuantumNous/new-api/pull/7240) 合并（复审 PR [#7244](https://github.com/QuantumNous/new-api/pull/7244)，由 Calcium-Ion 提交）。基于此前的 wan2.7 系列 ([#4078](https://github.com/QuantumNous/new-api/pull/4078)) 构建。
- **华为 MaaS 渠道** —— 复审中 ([#7239](https://github.com/QuantumNous/new-api/pull/7239)，讨论 [#7236](https://github.com/QuantumNous/new-api/issues/7236))。将作为一等公民上游类型加入，区别于现有的渠道提供者。
- **Gemini 思考层级规范化** —— [#7245](https://github.com/QuantumNous/new-api/pull/7245) 使中继接受规范化后的思考层级字符串，关闭 [#7205](https://github.com/QuantumNous/new-api/issues/7205)。
- **xAI Grok Imagine Video（异步）** —— [#7251](https://github.com/QuantumNous/new-api/issues/7251) 中讨论进行中；现有的“声明但失败”路径由 [#6358](https://github.com/QuantumNous/new-api/issues/6358) 覆盖。
- **Rerank 误分类修复** —— [#7181](https://github.com/QuantumNous/new-api/pull/7181) 确保 rerank 模型在渠道测试中不再被识别为 embedding（关闭 [#7177](https://github.com/QuantumNous/new-api/issues/7177)）。

## 4. 性能与优化

- **按渠道设置首字节超时并自动回退** —— [#7228](https://github.com/QuantumNous/new-api/pull/7228) 引入了独立于整体流式超时的首 token 超时。当上游已发送响应头但首个数据块前停滞时，中继现在会切换到下一渠道，而不是等待整个流超时结束。具体数值：按渠道可调；预计可显著降低不稳定提供商的尾部延迟。
- **透传模式下强制执行 `model_mapping`** —— [#7249](https://github.com/QuantumNous/new-api/pull/7249) 确保即便在透传模式下，渠道级模型映射也会作用于请求体，避免对上游不认识的模型名返回 404（关闭长期存在的 #6002 / #6639 类问题）。
- **OpenAI 图像编辑 multipart 文件名转义加固** —— [#7246](https://github.com/QuantumNous/new-api/pull/7246) 增强中继对包含特殊字符文件名的解析兼容性，避免 multipart 解析失败。
- **Responses 流式推理事件修复** —— [#7114](https://github.com/QuantumNous/new-api/pull/7114) 修正 `chat→responses` 转换，应发送 `response.reasoning_text.delta` 而非 `response.reasoning_summary_text.delta`，为下游消费者去除一类冗余事件。

## 5. 稳定性与回归问题

按严重程度大致排序（计费 > 静默数据丢失 > 功能性故障）：

| 严重度 | 编号 | 标题 | 状态 | 修复 |
|---|---|---|---|---|
| 🔴 高 | [#7241](https://github.com/QuantumNous/new-api/issues/7241) | 流式 `/v1/responses` 在 `response.incomplete` 时丢弃 usage，按 0 计费 | OPEN | [#7242](https://github.com/QuantumNous/new-api/pull/7242) 待合并 |
| 🔴 高 | [#7231](https://github.com/QuantumNous/new-api/issues/7231) | 非流式请求在客户端超时后仍继续上游调用，断开后仍计费 | CLOSED | 已合入 rc.35 |
| 🟠 中 | [#7194](https://github.com/QuantumNous/new-api/issues/7194) | 视频任务成功但 `/v1/videos/<id>` 获取产物返回 404 | OPEN | 暂无 PR |
|  中 | [#7252](https://github.com/QuantumNous/new-api/issues/7252) | Ollama 流式在最终 `done:true` 帧中输出 `tool_calls` 时被丢弃（如 qwen3-coder） | OPEN | 暂无 PR |
|  中 | [#7243](https://github.com/QuantumNous/new-api/issues/7243) / [#7253](https://github.com/QuantumNous/new-api/issues/7253) | Claude Messages → Gemini 3.8 Flash 返回 HTTP 200 但响应体不可用（rc.31–rc.34） | CLOSED | 重复，待真实修复 |
|  低 | [#7247](https://github.com/QuantumNous/new-api/issues/7247) | Higress 网关分块请求体导致 400 invalid JSON | CLOSED | 维护者要求补充复现 |
|  低 | [#7235](https://github.com/QuantumNous/new-api/issues/7235) | Kimi-K3 动态工具调用解析 | CLOSED | 已合入 |
| 🟡 低 | [#6358](https://github.com/QuantumNous/new-api/issues/6358) | xAI `grok-imagine-video` 已声明但路由失败（`invalid_api_platform: 48`） | OPEN | 暂无 PR |

**使用 rc.30–rc.34 的运维人员**应在 [#7242](https://github.com/QuantumNous/new-api/pull/7242) 合并前仔细审查响应流计费日志；少扣的费用不会自动补偿。

## 6. 对应用开发者的影响

- **升级到 rc.35 不是即插即用的**，前提是你依赖任务插件的回退机制。请审查 `task` 插件列表 —— 此前通过名称冲突隐式启用的插件现在必须显式开启。对视频生成流程进行端到端重新测试；模型名称回显的变更可能破坏下游日志解析或按模型归类的成本看板。
- **rc.30–rc.34 上 `/v1/responses` 的流式计费不可信。** 如果你在生产环境运行计费网关，要么固定到一个已知干净的 rc 版本，要么在 [#7242](https://github.com/QuantumNous/new-api/pull/7242) 合入前自行基于上游 token 做用量对账。
- **新的超时开关（一旦 [#7228](https://github.com/QuantumNous/new-api/pull/7228) 合入）按渠道生效且仅限流式。** 对多提供商场景特别有用：此前某一家“慢响应头”行为会被长时间流超时掩盖，从而隐藏其真实故障。
- **Ollama + qwen3-coder 的工具调用目前对 `stream:true` 已损坏** ([#7252](https://github.com/QuantumNous/new-api/issues/7252))。临时方案：使用 `stream:false`，或将 Ollama 工具调用负载走非流式代码路径，直至修复。
- **透传 + model_mapping 现在协同生效** ([#7249](https://github.com/QuantumNous/new-api/pull/7249))。如果你此前因为 404 无法在透传渠道上使用模型别名，这就是你等待的变更。
- **华为 MaaS 与异步 Grok 视频都在推进中。** 如果其中任一项在你的路线图上，请关注 [#7239](https://github.com/QuantumNous/new-api/pull/7239) 与 [#7251](https://github.com/QuantumNous/new-api/issues/7251) 以参与评审与设计反馈。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*