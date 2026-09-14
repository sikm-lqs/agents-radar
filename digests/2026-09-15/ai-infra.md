# AI 基础设施日报 2026-09-15

> 生成时间: 2026-09-14 23:30 UTC | 覆盖项目: 9 个

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

# AI 基础设施跨项目报告 — 2026-09-15

**范围：** vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth、Claude Code Router (CCR)、CC Switch、New API
*方法说明：各计数为 24 小时窗口内摘要所呈现的条目数，并非仓库总量；只有 New API 公布了明确计数（41 issues / 31 PRs）。*

---

## 1. 生态概览

当前生态的重心是 **DeepSeek-V4/V4.1**：它在 vLLM 和 SGLang 两端都主导着内核层的工作——同时也产出了最恶劣的生产稳定性 bug（TP worker 挂起、非法内存访问、HBM 耗尽）。**AMD gfx950/MI350X 实际上已跻身一等公民**，两个引擎在同一 24 小时窗口内为该平台合入了 FP8/FP4 MoE 路径。另一条较为安静的主线是**混合线性注意力模型的正确性债务**（Qwen3.5/GDN、mamba 混合、Nemotron-3）：前缀缓存（prefix-cache）与投机解码的 bug 如今已横跨每一层服务。引擎层之上，**agent 工具层**（网关、路由器、协议转换器）成熟得快但仍脆弱，reasoning 块翻译与工具调用保真度是反复出现的故障点。发布纪律则参差不齐：只有 llama.cpp（v0.4.1）和 Ollama（v0.34.1-rc1）真正发了版，而 New API 停在 RC.37，还带着一个未修复的约 24× 内存回退。

---

## 2. 活跃度对比

| 项目 | 层级 | Issues（24h） | PRs（24h） | 发布状态 | 主导主题 |
|---|---|---|---|---|---|
| **vLLM** | 推理服务引擎 | ~20 | ~15 | 无（v0.29.0） | DSV4.1 ROCm 性能（RFC #56506）、MRV2 整合、12 项稳定性积压 |
| **SGLang** | 推理服务引擎 | ~16 | ~14 | 无 | DSV4.1 内核统一（#39370）、AMD 适配、HiCache 正确性 bug |
| **llama.cpp** | 本地推理核心 | ~10 | ~14 | **v0.4.1**（ggml v0.24.0，破坏性 API 变更） | 后端健壮性；SYCL 图重放；RPC 多客户端 |
| **Ollama** | 本地运行时 | ~17 | ~8 | **v0.34.1-rc1** | MLX 加固；0.30 以来的回退潮（CUDA 5×、加载变慢） |
| **LiteLLM** | LLM 网关 | ~19 | ~15 | 无 | Responses 桥接 reasoning 丢失；开销/预算正确性；控制面 OOM 修复 |
| **Unsloth** | 微调 → agent 运行时 | ~17 | ~11 | 无（0.1.808-beta） | Studio 加固；沙箱逃逸修复（#10907）；训练栈沉寂 |
| **CCR** | Agent 代理/路由器 | ~5 | ~4 | 无 | Codex 桌面端启动修复（#1796）；协议转换清理 |
| **CC Switch** | 供应商切换器/代理 | ~20 | ~17 | 无（v3.20.3） | Codex 会话持久化；Antigravity 迁移 |
| **New API** | 自托管网关 | **41** | **31** | 无（v1.0.0-rc.37） | RC.37 内存回退（#7361）；用户要求 GA 准出标准（#7279） |

**要点：** 各项目修复速度都很高，但只有 llama.cpp 把它转化成了一次干净的 tag 发布。New API 原始量最高，发布姿态却最弱（已 37 个 RC，还在增加）。

---

## 3. 模型支持竞赛

| 模型 / 架构 | vLLM | SGLang | llama.cpp / Ollama | 其他 |
|---|---|---|---|---|
| **DeepSeek-V4/V4.1** | 性能 RFC + gfx950 内核（#56743、#56560）；TP 挂起 #41530、H20 崩溃 #56389 | DSpark 统一 #39370；**MI350X 上可用的 DSV4.1-Flash** #39186 | — | LiteLLM：DSML tool-parser 加固（#38924 上游） |
| **混合 GDN / mamba（Qwen3.5、Nemotron-3）** | 已支持；prefix-cache + MTP bug（#53142、#43587、#54691、#56790） | 已支持；checkpoint 损坏 #39342、MAMBA 剪枝 #33713 | Qwen3.5 MTP 在 sm_120 上调优不足（#28196：roofline 76%） | Ollama：特定模型 EOS 丢失（#18442） |
| **本周期新架构** | — | — | **Maple 20B-A1B、Tencent Hy 4、Spark2.5 已交付**；GigaChat-3.5-432B 进行中（#25342） | — |
| **GLM-5.3-Flash** | 质量 bug：重复 token 坍缩（#56605） | 崩溃 #39072；AMD FP8 KDA #38764 | — | Ollama：工具调用脆弱（#18390） |
| **Diffusion / 图像生成** | — | **LLaDA-Image 原生 diffusion 服务 #37907** + SenseNova U1.5 #38593（独有） | — | Unsloth：Gemma 4 图像输入已修复（#10559） |
| **投机解码** | Kimi K2.6 EAGLE3-MLA 验证栈已关闭（#40608）；DDTree/UNO 提案 | DSpark MTP 已集成 | 已有 MTP/DFlash2，存在性能 + TDR 问题 | — |

**结论：** llama.cpp 在**广度**上领先（3 个新架构 + 1 个进行中，无可争议）。vLLM/SGLang 在 DSV4.1 的**前沿深度**上领先——SGLang 率先交付*可用的* AMD 路径，vLLM 则在系统性优化（RFC 驱动）与经过验证的投机解码栈上占优。SGLang 独一家把版图从 LLM 服务扩展到了 diffusion。

---

## 4. 性能前沿

投入集中在六个集群：

1. **前沿 MoE 内核（DSV4.1）**——decode top-k（gfx950 K=512 #56743）、MXFP8 一次性反量化（dequant-once，#56560）、DSpark decode+prefill 统一（#39370）、CUTLASS 4.6 动态 epilogue 融合已立项跟踪（#30809）。vLLM 的 RFC 明确承认“设备还有大量算力没吃满”（基线：8.97 out-tok/s/GPU，TP4，8×MI355X）。
2. **KV cache——正确性先于速度**——vLLM extensible-KV 产品化（#56492）、FS 层卸载 RFC（#54363、#51240）、Mooncake 异构 TP（#54307）；SGLang Intel-XPU HiCache（#39447），但有**三个仍未关闭的 HiCache 正确性 bug**（#39444、#39147、#33713）；Ollama 实验性 prefill 持久化（#17953）vs. 硬性 8 GiB 上限（#18131）。面向 agent 的分布式 KV 是路线图上的高票条目（SGLang #21846，30 👍）。
3. **启动开销消除**——llama.cpp SYCL 图录制/重放（#28725）、GPU 常驻 TOP_K（#28670）；SGLang 将 JIT 构建挪出热路径（#37525）；vLLM CUDA graph 跳过 padding 槽位写入（#35351 上游模式）。
4. **调度/批处理**——vLLM 成本感知的抢占受害者选择（#56897）与原生前向 pass 指标（#52061）；llama.cpp reranker 批次拆分（#28876）。
5. **投机解码的成长阵痛**——vLLM DFlash 在混合 GDN 上**于 185k 上下文净损失 4.4×**（#54691），且没有按长度禁用的钩子；投机 prefill 已被放弃（#39060）；sm_120 MTP 调优不足（#28196）。MTP + 长上下文 + 混合注意力，是尚未解开的三角难题。
6. **网关数据面**——LiteLLM 用量聚合 OOM 修复（top-100-key 上限，#41143）与健康检查写放大（#41145）；New API LRU 限流器重写（#6807）。这些是控制面内存问题，不是推理性能。

---

## 5. 分层定位

- **推理服务引擎（vLLM、SGLang）**——当下工作负载重心几乎一致。vLLM：更广的硬件矩阵 + 架构整合（MRV2 → 默认）。SGLang：更快的前沿模型落地（AMD 路径率先合入，diffusion 也在路上）与 disagg/PD 深度——但 Rust 前端丢弃 PD bootstrap 字段（#39412），构成 disagg 流量的阻塞项。
- **本地推理核心**——主打可移植性/广度。多厂商后端加固（SYCL/HIP/CUDA/Vulkan）加上 RPC 多客户端（#28916），悄然把它定位为路由模式多模型部署的*服务基座*——即为其上层各层准备的基础设施。
- **本地运行时**——叠在 llama.cpp + MLX 之上的产品层，目前正处于回退低谷（CUDA 约 5× #18225、加载变慢 #18373、MLX 长上下文 OOM #18231）。MLX 既是它的差异化卖点，也是它的主要 bug 来源。
- **网关（LiteLLM、New API）**——LiteLLM 是多供应商企业网关（开销、预算、护栏）——但计费正确性 bug（#27735、#39370、#22984）在侵蚀其核心价值主张。New API 走自托管中继/计费路线，如今正把 **vLLM 和 SGLang 升格为一等渠道**（#7332）——两者正从相反方向走向汇合。
- **Agent 路由（CCR、CC Switch）**——单用户/桌面级协议垫片，全部工作面就是 Anthropic↔OpenAI↔Responses 转换与供应商身份管理。它们在桌面规模上撞上了 LiteLLM 在租户规模上遇到的同款脆弱性。
- **微调**——名义上的训练层，但今天几乎所有活动都是 agent 运行时加固（沙箱逃逸 #10907、工具调用重复执行 #10791）。**层级模糊化：** Unsloth 正向本地 agent 运行时漂移；训练栈则一片沉寂。

---

## 6. 趋势信号

1. **DeepSeek-V4.1 既是当下公认的工作负载基准，也是头号崩溃源。** 测试别只停在 happy path：并发 >256（vLLM #56389）与长上下文 HBM 压力（SGLang #39441）。
2. **AMD 在 FP8/FP8 MoE 服务上已达平价**——两个引擎同日合入内核。反向信号：llama.cpp #28211（gfx1151/Strix Halo 上静默输出*错误 logits*）表明消费级 AMD 的正确性仍落后于数据中心级 AMD。
3. **前缀/KV-cache 正确性如今是一项成本科目。** 静默缓存未命中（Ollama #18431 经 Anthropic 兼容层的逐轮失效、SGLang #39444/#39147、vLLM #43587）直接推高开销，并击穿 agent 延迟预算。
4. **跨协议桥的 reasoning 块保真度是头号集成脆弱点**——LiteLLM 丢弃 `reasoning_text`（#40654、#40887），CCR 为在上游 400 错误下存活而将其剥除（#1784、#1702），CC Switch 曾把它复制成 120k-token 的循环（#5860，已修复）。凡是经过桥接层，都要对 reasoning 做端到端验证。
5. **工具调用是每一层最弱的原语**（Ollama 静默丢弃 #17274；Unsloth 嵌套字段丢失 + 双重执行 #10935/#10791；New API 的 Ollama 流式修复 #7376）。把 `tool_calls: []` 当作可疑信号；应用层重试与审计日志依然必需。
6. **发布纪律正在分化**——llama.cpp 干净发版并附破坏性变更迁移说明；New API 停在 RC.37，带着 75 MB → 1.8 GB 的内存回退，用户已在正式要求 GA 准出标准（#7279）。当前版本锁定建议：New API 用 **rc.36**；Ollama CUDA 路径用 **0.32.13** / MLX 用 **v0.34.1-rc1**；H20 上的 vLLM DSV4.1 用 `max_num_seqs=256` 缓解。
7. **投机解码在营销话术里默认开启，在长尾场景净收益为负**——在混合模型的长上下文上启用 MTP/DFlash 之前，先要求提供按上下文长度禁用的钩子（vLLM #54691）。
8. **安全议题正抵达本地 agent 层**——Unsloth 的沙箱逃逸修复（#10907）与 CC Switch 转向可逆的类型化脱敏（#7306），预示着对拥有文件系统/工具访问权的运行时将迎来更严审视。

**下周期观察清单：** SGLang 的 HiCache 修复集群（解锁基于 Mooncake 的 agent 部署）；LiteLLM #41144 类桥接修复；vLLM RFC #56506 的后续内核（AMD 余量）；llama.cpp #28211 HIP 正确性修复；New API RC.38 内存修复；Ollama CUDA 回退的解决。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 速览 — 2026-09-15

## 1. 今日要点

- **DeepSeek-V4.1 是今日的核心负载关注点**：一份新的性能 RFC（[#56506](https://github.com/vllm-project/vllm/issues/56506)）给出了 MI355X/gfx950 的性能余量及具体吞吐数字，并伴随两个已合入的 ROCm kernel——gfx950 的 K=512 decode top-k 路径（[PR #56743](https://github.com/vllm-project/vllm/pull/56743)）以及当 `tl.dot_scaled` 无法使用时的 MXFP8 单次反量化回退（[PR #56560](https://github.com/vllm-project/vllm/pull/56560)）。
- **Model Runner V2（MRV2）正在向默认路径收敛**：缓冲区简化（[PR #56888](https://github.com/vllm-project/vllm/pull/56888)）、TPU 清理（[PR #56898](https://github.com/vllm-project/vllm/pull/56898)）、WSL pinned-memory 容错（[PR #56908](https://github.com/vllm-project/vllm/pull/56908)），以及合入的针对非末尾 PP rank 的 pooling 修复（[PR #56666](https://github.com/vllm-project/vllm/pull/56666)），一次性收尾了多个长期遗留的痛点。
- **两个可靠性缺陷需要立即关注**：OTLP traces 端点静默丢弃 span（[Issue #56696](https://github.com/vllm-project/vllm/issues/56696)，已关闭），以及 8×H20 上高并发时 `dsv4_topk` 出现 Triton illegal-memory-access（[Issue #56389](https://github.com/vllm-project/vllm/issues/56389)）——两者均影响 `v0.29.0` 版本的服务部署。

## 2. 版本发布与破坏性变更

过去 24 小时无新版本发布。注意当前发布版本为 `v0.29.0`，并受下文罗列的若干问题影响（#56696、#56605、#53142、#41530、#56370）。今日未引入任何 API/配置层面的破坏性变更。

## 3. 新模型与硬件支持

- **ROCm/MI355X（gfx950）** — 在 [PR #56743](https://github.com/vllm-project/vllm/pull/56743) 中为 DSV4.1 decode 增加了显式的 K=512 top-k 路径；在 [PR #56560](https://github.com/vllm-project/vllm/pull/56560) 中增加了 MXFP8 权重反量化路径。
- **RDNA3（gfx1100）** — 浮现的 bug 显示融合 MoE 路径硬编码 2× gated 激活因子，导致 Nemotron-3 等非 gated（relu2）模型失效（[Issue #56790](https://github.com/vllm-project/vllm/issues/56790)）。修复将在后续 PR 中给出。
- **NVIDIA RTX PRO 6000（Blackwell，sm_120）** — DeepSeek-V4 在此 SKU 上加载失败（[Issue #40821](https://github.com/vllm-project/vllm/issues/40821)）；在持续 Nemotron-3.5-NVFP4 / hybrid Mamba 负载下，SM120 反复出现 Xid 13 warp 错误（[Issue #52225](https://github.com/vllm-project/vllm/issues/52225)）。
- **H20（SM90）** — 在 DeepSeek-V4.1-Flash 的 `max_num_seqs > 256` 时，MoE routing kernel `dsv4_topk` 出现 illegal memory access（[Issue #56389](https://github.com/vllm-project/vllm/issues/56389)）。
- **Kimi K2.6 / EAGLE3-MLA MTP** — 已关闭的跟踪 issue，记录了已验证的 Blackwell 服务栈以及从上游复现该栈的 PR 链路（[Issue #40608](https://github.com/vllm-project/vllm/issues/40608)）。
- **WSL** — MRV2 现通过 UVA 回退机制容忍缺失的 pinned memory（[PR #56908](https://github.com/vllm-project/vllm/pull/56908)）。
- **新的推测解码提案**：DDTree（[Issue #40809](https://github.com/vllm-project/vllm/issues/40809)）与 UNO 扩散增强 LLM（[Issue #55267](https://github.com/vllm-project/vllm/issues/55267)）。
- **推测解码特性 speculative prefill（draft 辅助稀疏 prefill）** 因当前形式不予推进而关闭（[Issue #39060](https://github.com/vllm-project/vllm/issues/39060)）。

## 4. 性能与优化

- **DSV4.1-Flash on 8× MI355X, TP4, MXFP4 MoE + DSpark MTP** — 基线（RFC [#56506](https://github.com/vllm-project/vllm/issues/56506)）：并发度 1 时每节点 35.89 out-tok/s（单 GPU 8.97）；RFC 明确指出 gfx950 上"还有大量设备算力未被挖掘"，并以此为动机促成上述两个 PR。
- **DFlash on Qwen3.5 hybrid GDN 模型** — 单流 decode 在约 185k 上下文下从 ~71 tok/s（关闭 spec）降至 ~16 tok/s（DT=4）；短上下文下同一配置在 DT=8 时可达 218 tok/s。Drafter 每周期都会重扫累积的 KV，且缺少按序列长度禁用的钩子。跟踪于 [Issue #54691](https://github.com/vllm-project/vllm/issues/54691)。
- **Hybrid GDN prefix-cache + MTP spec decoding** — 修复 PR 恢复了对此前因长度恰好为哈希单元倍数而命中为零的 prompt 的命中（[PR #52244](https://github.com/vllm-project/vllm/pull/52244)，已在 Qwen3.5-122B-A10B 上以 1072-token GDN page 实测验证）。
- **Hybrid mamba prefix-cache resume** — 当显式传入 `--block-size` 使 state column 以错误的 block size 播种时，`MambaHybridModelState.add_request` 出现 illegal memory access（[Issue #53142](https://github.com/vllm-project/vllm/issues/53142)，v0.27.1 / V2 runner）。
- **V1 scheduler preemption** — 基于成本的 victim 选择机制已在 [PR #56897](https://github.com/vllm-project/vllm/pull/56897) 落地；当前行为仍按迭代顺序选取，未考虑 KV 占用。
- **原生 forward-pass 指标** — 可选的异步发射，也覆盖推测解码路径，且无需引入 Dynamo 的 `InstrumentedScheduler`（[PR #52061](https://github.com/vllm-project/vllm/pull/52061)）。
- **KV offload 分层** — 针对 FS 层的数据完整性 / I/O 存活性 RFC（[#54363](https://github.com/vllm-project/vllm/issues/54363)），以及用于阻断 cascade/promotion 累积的准入策略 RFC（[#51240](https://github.com/vllm-project/vllm/issues/51240)）。Mooncake Store 在 hybrid KV cache 上的异构 TP 共享在 [PR #54307](https://github.com/vllm-project/vllm/pull/54307) 中扩展。
- **可扩展 KV cache** — 演示性 PR 的产品化（[#56492](https://github.com/vllm-project/vllm/pull/56492)）；是可插拔 KV 策略的基础。
- **通过 Rust 前端的 MoE routed-expert 负载** — 终端帧的辅助序列化，且不破坏 Rust schema（[PR #56778](https://github.com/vllm-project/vllm/pull/56778)）。
- **CI / 运行时** — `pytorch-fullgraph-test` 切片由 1 拆 4（[PR #56877](https://github.com/vllm-project/vllm/pull/56877)）；V1 KV Connectors 切片由 1 拆 4，p90 由 ~44.2 min 压至 20 min 预算内（[PR #56324](https://github.com/vllm-project/vllm/pull/56324)）；MI250 DinD 弃用（[PR #56162](https://github.com/vllm-project/vllm/pull/56162)）。

## 5. 稳定性与回归

按部署影响排序：

1. **[Issue #56389](https://github.com/vllm-project/vllm/issues/56389) — 8×H20 上 DSV4.1-Flash 高并发时 `dsv4_topk` 出现 Triton illegal memory access。** 通过设置 `max_num_seqs=256` 缓解。尚无修复 PR。
2. **[Issue #41530](https://github.com/vllm-project/vllm/issues/41530) — DeepSeek-V4-Pro TP=8 + MTP 下 TP worker 卡死，进而触发 `EngineDeadError`。** `sample_tokens` RPC 超时；影响生产服务栈。
3. **[Issue #56696](https://github.com/vllm-project/vllm/issues/56696) — `--otlp-traces-endpoint` 初始化了 tracer 但从未发送 span**（`instrument_otel` / `manual_instrument_otel` 从未被调用）。已关闭；在 `vllm/vllm-openai:latest` 与 dev fork 上均可复现。若依赖 OTLP trace 导出做 SLO / 成本归因，请将当前 0.29.0 视为不导出。
4. **[Issue #56370](https://github.com/vllm-project/vllm/issues/56370) — `VLLM_BATCH_INVARIANT=1` 与 `pass_config.enable_sp` 同时启用时批量不变性被破坏。** 在 4× RTX PRO 6000 PCIe 上复现，main @ 7470082f5 / precompiled 0.29.0。
5. **[Issue #54691](https://github.com/vllm-project/vllm/issues/54691) — DFlash 在 hybrid GDN 模型长上下文下净亏损**，185k 时约 4.4× 减速。缺少按序列长度禁用的钩子。
6. **[Issue #52225](https://github.com/vllm-project/vllm/issues/52225) — 在持续 Nemotron-3.5-NVFP4 / hybrid Mamba 负载下，SM120 反复出现整卡范围的 Xid 13 warp 错误。** Xid 13 暗示 GPU reset 风险。
7. **[Issue #53142](https://github.com/vllm-project/vllm/issues/53142) — 显式传入 `--block-size` 时，Hybrid mamba 在 prefix-cache resume 处出现 illegal memory access。**
8. **[Issue #56605](https://github.com/vllm-project/vllm/issues/56605) — GLM-5.3-Flash 在多轮 agentic 场景下出现"词串混乱"（重复 token 坍塌）。** 不是崩溃而是质量问题，但用户感知影响大。
9. **[Issue #43587](https://github.com/vllm-project/vllm/issues/43587) — Qwen3.5（Mamba-Attention hybrid）上增量多模态请求的 prefix caching 失败。**
10. **[Issue #32588](https://github.com/vllm-project/vllm/issues/32588) — 当音频 > 30 s 时，Whisper 段落时间戳逐步偏移（~0.5 s/段）。** 长音频转写时间戳不可靠。
11. **[Issue #36802](https://github.com/vllm-project/vllm/issues/36802) — Tesla T4 上 Triton OOR shared memory**（需 81920，硬件上限 65536）。
12. **[Issue #394

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 简报 — 2026-09-15

## 今日要点

SGLang 团队今天的精力主要集中在 DeepSeek-V4/V4.1 性能工作和一波 KV cache 正确性 bug 上。要点：PR [#39370](https://github.com/sgl-project/sglang/pull/39370) 将面向 DSV4.1 的 DSpark decode+prefill 内核优化整合到一起；PR [#39186](https://github.com/sgl-project/sglang/pull/39186) 让 DeepSeek-V4.1-Flash 落地 AMD MI350X（gfx950）。稳定性方面，过去 24 小时内新暴露三个 bug——Rust 前端静默丢弃 PD bootstrap 字段（[#39412](https://github.com/sgl-project/sglang/issues/39412)）、`HiCache write_through` 在前缀被逐出前未能完整持久化首次出现的前缀（[#39444](https://github.com/sgl-project/sglang/issues/39444)）、`--enable-mixed-chunk` 损坏 mamba radix cache 检查点（[#39342](https://github.com/sgl-project/sglang/issues/39342)）。过去 24 小时内没有发布新版本。

---

## 版本发布与破坏性变更

过去 24 小时内 SGLang 没有发布新版本。需要注意的是，PR [#39012](https://github.com/sgl-project/sglang/pull/39012) 将 `transformers` 从 5.12.1 升级到 5.17.0（`tokenizers` 从 0.22.2 升级到 0.23.2），移除了存在已久的 `tokenizers<0.23` 兼容性约束，并引入了上游的 vision rotary 重构——合并后，下游用户无需再固定使用旧版 tokenizers。

---

## 新模型与硬件支持

- **AMD MI350X (gfx950) — DeepSeek-V4.1-Flash**（[#39186](https://github.com/sgl-project/sglang/pull/39186)）：以 TP4+EP4 提供 DeepSeek V4 JIT 内核的 HIP 对应实现、AOT top-k transformer 中的 sorted epilogue，以及跨平台 dispatch 钩子。堆叠在 `dsv4.1` 分支之上。
- **AMD Qwen3-Next 落地 gfx950**（[#39140](https://github.com/sgl-project/sglang/pull/39140)）：融合 TP4 all-reduce + Gemma RMSNorm + per-group FP8 量化。这两层实现均可独立使用、各有价值。
- **AMD GLM5 PTPC FP8 KDA projections**（[#38764](https://github.com/sgl-project/sglang/pull/38764)）：可选地将部分 GLM-5.3-Flash KDA projections 重打包为 per-channel FP8，包括经融合 gated RMSNorm 处理的 `o_proj`。
- **LLaDA-Image 扩散模型服务**（[#37907](https://github.com/sgl-project/sglang/pull/37907)）：为 `InclusionAI/LLaDA-Image`（及 -Turbo、FP8 变体）提供原生 Diffusion 路径，覆盖 T2I、图像编辑与序列并行。
- **SenseNova-U1.5 prompt 增强**（[#38593](https://github.com/sgl-project/sglang/pull/38593)）：在基础文生图支持之上为 T2I 提供 prompt 增强，由 [#37742](https://github.com/sgl-project/sglang/issues/37742) 跟踪。
- **Intel XPU HiCache L1/L2 传输后端**（[#39447](https://github.com/sgl-project/sglang/pull/39447))：在 XPU 上实现 HiCache 主机/设备间传输的初始版本。
- NVIDIA 上的 **DeepSeek-V4.1 性能跟踪**（[#33636](https://github.com/sgl-project/sglang/issues/33636)）以及 **DeepSeek-V4 / V3.2 DSML 工具调用解析器**的加固工作（issue [#38924](https://github.com/sgl-project/sglang/issues/38924)）仍在继续。

---

## 性能与优化

- **DSV4.1 DSpark 内核统一**（[#39370](https://github.com/sgl-project/sglang/pull/39370)）：将 PR #39301 / #39336 与既有的 `dsv4.1` 优化合并，并自动选择受支持的小批量路径。目标是消除小内核启动和填充 attention head 带来的解码时间损耗。
- **DSV4 BCG Indexer 内存占用优化**（[#36534](https://github.com/sgl-project/sglang/pull/36534)）：优化启用 BCG（block-sparse compressed generation?）时 C4 Indexer 的高内存占用。
- **MXFP8-KV padding slot 跳过**（[#35351](https://github.com/sgl-project/sglang/pull/35351)）：跳过对 KV 池中预留的 CUDA-graph padding slot 的写入——被填充的 lane 不再执行占位性的 K/V 写入。
- **引擎响应等待重构**（[#39486](https://github.com/sgl-project/sglang/pull/39486)）：在不涉及 HTTP 请求对象时避免 `asyncio.wait_for` 超时；直接等待 `state.event.wait()`。HTTP 调用方仍保留带超时的等待与断连检查。
- **TRTLLM-MLA `fixup_zero_kv` 预构建**（[#37525](https://github.com/sgl-project/sglang/pull/37525)）：在 Blackwell 上将 nvcc JIT 构建移出请求热路径。
- **CUTLASS 4.6 dynamic Epilogue Fusions / IKET profiling** 调研（[#30809](https://github.com/sgl-project/sglang/issues/30809)）：下一波 GEMM 优化的跟踪条目。

---

## 稳定性与回归

**新开（过去 24 小时）：**

- **[Bug, 高价值] Rust 前端丢弃 PD bootstrap 字段**（[#39412](https://github.com/sgl-project/sglang/issues/39412)）：在 `/v1/chat/completions` 和 `/v1/completions` 上，`bootstrap_host` / `bootstrap_port` / `bootstrap_room` 在 lowering 为 `GenerateRequest` 时被静默丢弃，原因是 `dynamo-protocols` 的请求结构体不携带这些字段。相关修复 PR [#38939](https://github.com/sgl-project/sglang/pull/38939) 处理的是缺失 chat-template 回退的问题，但 bootstrap 字段本身仍需要单独的补丁。
- **[Bug] `--enable-mixed-chunk` 损坏 mamba radix cache 检查点**（[#39342](https://github.com/sgl-project/sglang/issues/39342)）：混合 GDN 模型的检查点会损坏，原因是混合批次跳过了 `extra_buffer` 写入，但仍捐出了该槽位。
- **[Bug] HiCache `write_through` 在逐出前未能完整持久化首次出现的前缀**（[#39444](https://github.com/sgl-project/sglang/issues/39444)）：使用 Mooncake Store 时，首次出现的前缀可能在全部 KV 完成备份之前就被从 L1/L2 逐出；重放会未命中。
- **[Bug, ROCm] DeepSeek-V4.1 FP4 indexer 在长上下文 AgentX 下耗尽 HBM**（[#39441](https://github.com/sgl-project/sglang/issues/39441)）：#37660 之后引入的回归，出现在 SGLang cookbook 的 AMD preview 镜像上。

**既有且仍然活跃：**

- **[严重程度：高] HiCacheFile 对混合缓存池报告无法恢复的前缀**（[#39147](https://github.com/sgl-project/sglang/issues/39147)）：即使辅助池无法恢复前缀，`HiCacheFile.batch_exists_v2()` 仍会返回命中。
- **[严重程度：高] GLM-5.3 在 disagg decode + dp-attention + spec decode 下崩溃**（[#39072](https://github.com/sgl-project/sglang/issues/39072)）。候选修复：PR [#39487](https://github.com/sgl-project/sglang/pull/39487) 在 MLA retraction 的 CPU 备份/恢复中将 widened KV id 本地化（DCP，修复 #38645）。
- **[严重程度：高] B300 上 MXFP8FP4/W4A8 MegaMoE 出现 CUDA_ERROR_ILLEGAL_ADDRESS**（[#37559](https://github.com/sgl-project/sglang/issues/37559)）。
- **[严重程度：中] QSA extend 前向出现 CUDA 非法内存访问**（[#37633](https://github.com/sgl-project/sglang/issues/37633)）：在 Qwen3.8-Flash-Next-FP8 / H20 TP8 上约 22 个并发请求时触发；可通过 `CUDA_LAUNCH_BLOCKING=1` 和 `--disable-overlap-schedule` 抑制。
- **[严重程度：中] Gemma-4 mm scheduler 因非 RGB 图像崩溃**（[#26751](https://github.com/sgl-project/sglang/issues/26751)）：单张灰度或 RGBA JPEG 就会杀死 scheduler，并丢弃所有无关的在途请求。
- **[严重程度：中] 统一 radix cache 在设备逐出时直接剪枝 MAMBA 节点而非降级**（[#33713](https://github.com/sgl-project/sglang/issues/33713)）：从未尝试从 host 层回载。
- **[严重程度：中] DeepSeek V4/V3.2 DSML 工具调用解析器将参数包进多余的 "arguments"/"input"**（[#38924](https://github.com/sgl-project/sglang/issues/38924)）。
- **[严重程度：低] NPU router GEMM 返回 bf16 而非 fp32**（[#34861](https://github.com/sgl-project/sglang/issues/34861)）。

推动下一波开发的跟踪/路线图 issue：面向 agentic 负载的分布式 KV cache（[#21846](https://github.com/sgl-project/sglang/issues/21846)，高优先级，30 👍）、DCP/Helix 并行（[#29736](https://github.com/sgl-project/sglang/issues/29736)），以及 DeepSeek V4 性能跟踪（[#33636](https://github.com/sgl-project/sglang/issues/33636)）。

---

## 对应用开发者意味着什么

- **Agent 负载，请当心 HiCache。**同一子系统内出现两个新的正确性 bug（#39444 `write_through` 未持久化、#39147 混合池误报命中），加上长期存在的 MAMBA 剪枝问题（#33713），对任何依赖跨请求前缀缓存的 agent 部署都是实实在在的风险。在这两个 bug 修复之前，请将当前 `main` 视为不适合承载基于 Mooncake 的 HiCache 生产 agent 流量，并固定到一个已知良好的版本。
- **现在在 AMD 上，DeepSeek-V4.1 是阻力最小的选择。**随着 [#39186](https://github.com/sgl-project/sglang/pull/39186) 将 V4.1-Flash 带到 MI350X、[#39140](https://github.com/sgl-project/sglang/pull/39140) / [#38764](https://github.com/sgl-project/sglang/pull/38764) 为 gfx950 上的 Qwen3-Next 和 GLM5 落地 FP8 路径，AMD 部署在 FP8 上不再是二等公民——但请留意 [#39441](https://github.com/sgl-project/sglang/issues/39441) 的长上下文 HBM 耗尽问题。
- **Rust 前端仍在演进，暂时不要依赖经 OpenAI 兼容端点进行 PD bootstrap。**Issue [#39412](https://github.com/sgl-project/sglang/issues/39412) 表明 PD bootstrap 字段目前会被静默丢弃；如果你正通过 Rust 服务器的 `/v1/chat/completions` 路由 PD 分离流量，请在依赖它之前先做端到端验证。PR #38939 至少正在为无模板模型恢复 chat-template 回退。
- **Diffusion 与图像生成正在获得一等支持。**LLaDA-Image（[#37907](https://github.com/sgl-project/sglang/pull/37907)）和 SenseNova-U1.5 prompt 增强（[#38593](https://github.com/sgl-project/sglang/pull/38593)）表明 SGLang 正在为多模态生成负载布局，而不只是 LLM 服务。
- **`transformers` 5.17.0 即将到来。**当 [#39012](https://github.com/sgl-project/sglang/pull/39012) 落地后，那些假定 `tokenizers<0.23` 或手写了 vision rotary 兼容垫片的下游代码应去掉这些逻辑。CLIPTokenizer 的 slow/fast 往返行为现已完全一致，这让测试夹具更简单。

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-15

## 1. 今日要点

**v0.4.1 版本**今日落地，搭载 ggml v0.24.0，将模型支持范围扩展至 **Maple 20B-A1B、Tencent Hy 4 和 Spark2.5**，同时引入了一处小但具有破坏性的 API 变更（`llama_sampler_chain_n()` 现在返回 `int32_t`）。后端健壮性是本轮已合并提交与开放 PR 的主旋律——HIP/CUDA BF16 回退、SYCL oneDNN scratchpad 池化、ggml-cpu PCH 堆损坏修复，以及一个存在已久的 SYCL TOP_K GPU 卸载回归问题均已完成修复。影响最为深远的平台级条目，一是将 **CUDA 图记录/重放移植至 SYCL**（[#28725](https://github.com/ggml-org/llama.cpp/pull/28725)），二是让 **ggml-rpc 每线程服务多个客户端**的修复（[#28916](https://github.com/ggml-org/llama.cpp/pull/28916)），为路由器模式的多模型部署扫清了障碍。

## 2. 发布与破坏性变更

- **[v0.4.1](https://github.com/ggml-org/llama.cpp/releases/tag/b10964)** 今日发布（构建 b10950 → b10970），ggml 升级至 **v0.24.0**。
  - **API 变更（对下游绑定构成破坏）：** `llama_sampler_chain_n()` 返回类型由 `int` 改为 `int32_t`（[#28900](https://github.com/ggml-org/llama.cpp/pull/28900)）。
  - **CI/发布：** Ubuntu-CUDA 构建（12.8 / 13.3，x64 + arm64）纳入发布流水线（[#28186](https://github.com/ggml-org/llama.cpp/pull/28186) → b10969）；CUDA arm64 改用 GCC 14。
  - **服务器：** 子进程管理与日志机制全面翻新；JSON schema 与聊天模板解析收紧。
  - **迁移提示：** 凡嵌入 C API 的项目，须更新采样器头文件的用法并重新编译下游原生绑定（Python `llama-cpp-python`、Rust `llama-cpp-rs`、Go 等）。

## 3. 新模型与硬件支持

- **v0.4.1 新增模型架构：** Maple 20B-A1B、Tencent Hy 4（HY_v4）、Spark2.5。
- **进行中的模型 PR：**
  - [PR #25342](https://github.com/ggml-org/llama.cpp/pull/25342) —— **GigaChat-3.5-432B-A28B**（DeepSeek-V3 风格的 MLA + MoE，混合注意力）。
  - [PR #28845](https://github.com/ggml-org/llama.cpp/pull/28845) —— 为 **fraunhofer-iis/elmod-2.7b-it** 新增 `escape_after_split` 词表标志。
- **后端/硬件：**
  - **HIP/CDNA**：fattn-mma 改用 fp32 累加器（[#28576](https://github.com/ggml-org/llama.cpp/pull/28576)，b10970）—— 在 AMD CDNA 上带来正确性与性能改进。
  - **CUDA**：在不具备硬件 BF16 的设备上自动回退至 F32（Ampere/RDNA3/CDNA 为下限）（[#28846](https://github.com/ggml-org/llama.cpp/pull/28846)，b10950）。
  - **SYCL**：radix-select 常驻 GPU 的 `TOP_K` 现可在设备端处理 `k > 32`，无需再往返 CPU（[#28670](https://github.com/ggml-org/llama.cpp/pull/28670)，b10956）。
  - **ggml-rpc**：新增按客户端线程化（[#28916](https://github.com/ggml-org/llama.cpp/pull/28916)）—— 修复多模型路由器挂起问题。
- **量化/文件格式：** 本周期无新增量化类型。

## 4. 性能与优化

- **[PR #28918](https://github.com/ggml-org/llama.cpp/pull/28918)** —— SYCL MKL flash-attention online-softmax 重写：以合并访存的分块加载取代每行一个 work-item 的模式；预计可降低 Intel Arc / Data Center GPU Max 上的内核延迟。
- **[PR #28536](https://github.com/ggml-org/llama.cpp/pull/28536)** —— CUDA FA 共享内存 swizzle 重构（WIP）；硬件隔离调优仍在继续期间，MHA 的 swizzle 暂时禁用。
- **[PR #28725](https://github.com/ggml-org/llama.cpp/pull/28725)** —— 将 CUDA graphs 移植为 **SYCL 图记录/重放**；使用 SYCL 异步内存扩展。为 Intel 独立 GPU 消除逐 token 启动开销。
- **[#28670 / b10956](https://github.com/ggml-org/llama.cpp/pull/28670)** —— TOP_K 常驻 GPU 路径；消除 CPU 往返以及 `k = 32` 以上时每次调用的后端 fence。
- **[#28821](https://github.com/ggml-org/llama.cpp/pull/28821)** —— CUDA 一元内核现可接受 contiguous_rows，使此前被迫先做拷贝的算子得以融合。
- **[#28876](https://github.com/ggml-org/llama.cpp/pull/28876)** —— 面向因果 LLM 重排序器（Qwen3、Qwen3-VL-Rerank）的 `RANK` 池化批次拆分；移除此前沿袭自 BERT 式交叉编码器的一次性整批处理限制，从而支持大得多的重排序批次。

## 5. 稳定性与回归

大致按对用户的影响程度排序：

| 严重程度 | 问题 | 状态 | 备注 |
|---|---|---|---|
| **高** | [#24066](https://github.com/ggml-org/llama.cpp/issues/24066) —— RX 6600 / Qwen3.5-9B-MTP 上 Vulkan 性能下降 | 开放中，44 条评论 | 存续已久；上游尚无 PR。 |
| **高** | [#27888](https://github.com/ggml-org/llama.cpp/issues/27888) —— SYCL 多 GPU 崩溃，Arc Pro B50 + A770 | 开放中，12 条评论 | Intel 混合 GPU 拓扑仍不稳定。 |
| **高** | [#28196](https://github.com/ggml-org/llama.cpp/issues/28196) —— Qwen3.5 MTP 在 RTX 5090 上原生 Linux 达到 roofline 的 76 %；Windows/Ollama 路径慢约 1.5–1.6× | 开放中，11 条评论 | 线性注意力 delta-net 层在 sm_120 上调优不足。 |
| **高** | [#28778](https://github.com/ggml-org/llama.cpp/issues/28778) —— 双 Arc Pro B70 上 SYCL + DFlash2 草稿模型触发 GPU TDR 重置 | 开放中，6 条评论 | 硬性驱动崩溃；需要 SYCL graph + scratchpad 方面的工作。 |
| **高** | [#28211](https://github.com/ggml-org/llama.cpp/issues/28211) —— gfx1151（RDNA 3.5 Strix Halo）上当 prompt 超过 `n_ubatch` 时 HIP/ROCm **logits 错误** | 开放中，7 条评论 | 静默正确性 bug —— 亟需优先合入。 |
| **高** | [#28860](https://github.com/ggml-org/llama.cpp/issues/28860) —— 开启 `--ngram-mod` 时 SYCL 需要 2 GB 以上 scratchpad | 开放中，6 条评论 | 分配回归；[#28905](https://github.com/ggml-org/llama.cpp/pull/28905) 的分配器重构可解决此类 bug（已关闭的 WIP）。 |
| **中** | [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) —— RDNA3 上 b10780 之后 Vulkan PP 回归 | 开放中，7 条评论 | 提示词处理变慢，并非数据损坏。 |
| **中** | [#27638](https://github.com/ggml-org/llama.cpp/issues/27638) —— Vulkan/ANV FA 回退至 SCALAR → Arc B580 上 O(N²) PP + 设备丢失 | 开放中，7 条评论 | 特定 Vulkan 驱动下 flash-attention 路径回退为标量实现。 |
| **中** | [#28753](https://github.com/ggml-org/llama.cpp/issues/28753) —— Arc Pro B50 上 `ggml_backend_sched_alloc_splits: unexpected graph reallocation` 崩溃 | 开放中，7 条评论 | 调度器重入 bug。 |
| **中** | [#28827](https://github.com/ggml-org/llama.cpp/issues/28827) —— Gemma4 在 ` 中输出越来越长的尾部乱码

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 日报 — 2026-09-15

## 今日要点
- **v0.34.1-rc1** 发布，带来 MLX runner 加固（前缀缓存快照驱逐、加载前的空闲内存门控）、LLM 侧将 token 重复上限提升至 100，以及 ChatGPT 模型选择器间距的 UX 修复——这是一次小版本发布，旨在 GA 之前稳定 0.34 版本线。
- MLX 后端仍是 bug 重灾区：长上下文 OOM、runner 卡在 "Stopping…"、硬编码的 8 GiB 前缀缓存预算、结构化输出 JSON 损坏等问题均处于 open 状态或刚刚被报告；与此同时，针对间歇性 `model not found` 错误的社区修复已进入 review。
- Gemma 4 的工具调用可靠性与 OpenAI Responses 兼容层（通过 `previous_response_id` 实现 Codex/Claude Code 工作流）均出现明显回退，引来多份报告；针对后者的修复 PR 已经在队列中。

## 版本发布与破坏性变更
- **v0.34.1-rc1**（[release](https://github.com/ollama/ollama/releases/tag/v0.34.1)）
  - `app: fix ChatGPT model selector spacing`
  - `mlxrunner: Evict prefix cache snapshots from the active conversation`
  - `mlxrunner: check system free memory and wait for evicted runners before loading the next MLX model`
  - `llm: raise token repeat limit to 100 and return error instead`
- **PR #18448 — API：弃用 `typical_p`**（[link](https://github.com/ollama/ollama/pull/18448)）：新建的 Modelfile 将无法再设置 `typical_p`；已携带该参数的现有 GGUF 模型仍会照常生效。迁移提示：请从任何程序化生成 Modelfile 的逻辑中移除 `typical_p`。

## 新模型与硬件支持
- **Q2_0 GGUF 张量** — PR #18443（[link](https://github.com/ollama/ollama/pull/18443)）为 GGML type 42 / file type 41 新增读取器定义，修复了此前因张量大小溢出而导入元数据失败的 Q2_0 GGUF。
- **llama.cpp 升级至 b10969** — PR #18446（[link](https://github.com/ollama/ollama/pull/18446)）修复了上游构建变更在 `libllama` 与 `libmtmd` 之间引入的重复符号问题。
- **Qualcomm IQ-9075（Dragonwing IQ9）** — Issue #18445（[link](https://github.com/ollama/ollama/issues/18445)）请求为双 Hexagon HTP + Adreno 663 SoC（Raxda Fogwise Airbox 一类设备）提供 NPU/GPU 支持。
- **Windows 版 ROCm 10** — Issue #18435（[link](https://github.com/ollama/ollama/issues/18435)）依据 AMD 的支持矩阵，请求在 Windows 上支持 Strix Halo（Ryzen AI Max 395，gfx1151）。
- **Rockchip NPU** — Issue #9268（[link](https://github.com/ollama/ollama/issues/9268)）仍处于 open 状态，且过去 24 小时内因 RK3588/RK3576 再次受到关注。

## 性能与优化
- **MLX 加载停滞检测** — PR #17834（[link](https://github.com/ollama/ollama/pull/17834)）实现了基于进度的停滞检测，使超过默认超时的 MLX 加载不再被提前取消；其中还包含惰性权重加载与监听器绑定方面的改动。
- **跨 runner 重载的实验性 prefill/KV 缓存持久化** — PR #17953（[link](https://github.com/ollama/ollama/pull/17953)）新增 `OLLAMA_PREFILL_CACHE=1`，保存已处理的 prompt 状态，使重载时无需从头重新 prefill。
- **Hugging Face 直连 URL 解析限时** — PR #18437（[link](https://github.com/ollama/ollama/pull/18437)）将每次解析尝试的上限设为 10 秒，防止一次卡住的查询耗尽 Ollama 整整 30 秒的重试窗口。
- **MLX 前缀缓存硬性 8 GiB 上限** — Issue #18131（[link](https://github.com/ollama/ollama/issues/18131)）记录了 32 GB Apple Silicon 在 agent 工作负载下发生重度 swap 的现象；属预期行为而非泄漏，但这项预算需要可配置。
- **MLX 长上下文 OOM** — Issue #18231（[link](https://github.com/ollama/ollama/issues/18231)）报告在 64 GB Apple Silicon 上，当前缀缓存持有已被换出的快照时，请求中途出现 HTTP 500——驱逐本身能成功，但分配失败后没有任何重试机制。
- **0.30.0 以来的模型加载回退** — Issue #18373（[link](https://github.com/ollama/ollama/issues/18373)）报告 GPT-OSS-120B 及其他模型相比 0.23.4 显著变慢；尚无修复 PR。
- **CUDA 约 5 倍性能回退（0.33.x 对比 0.32.13）** — Issue #18225（[link](https://github.com/ollama/ollama/issues/18225)）已按 `needs more info` 关闭；在 RTX 3090 / CUDA 13.2 / 驱动 595.84 上仍未修复。

## 稳定性与回退问题
| 严重度 | Issue | 状态 | 备注 |
|---|---|---|---|
| 高 | #17274 解析失败时工具调用输出被静默丢弃（[link](https://github.com/ollama/ollama/issues/17274)） | Open，21 条评论 | 内容为空、无 tool_calls、token 仍被计数；长期未决的讨论帖。 |
| 高 | #18419 `/api/codex/v1/responses` 在携带 `previous_response_id` 的后续请求中返回空补全（[link](https://github.com/ollama/ollama/issues/18419)） | Open | PR #18439（[link](https://github.com/ollama/ollama/pull/18439)）提议直接拒绝该字段，而不是静默返回空回答。 |
| 高 | #18447 间歇性 `model "xxx" not found`（[link](https://github.com/ollama/ollama/issues/18447)） | Open | 根源是 `getExistingName` 中不区分大小写的名称规范化；PR #18438（[link](https://github.com/ollama/ollama/pull/18438)）改为以原子方式匹配完整名称。 |
| 高 | #18431 Anthropic 兼容层 `/v1/messages` 将 `system` 消息从 `messages` 数组中抽离，破坏了 Claude Code 的前缀缓存（[link](https://github.com/ollama/ollama/issues/18431)） | Open | 每轮对话都会导致 token 缓存失效；尚无修复。 |
| 中 | #18390 gemma4 工具调用中含空格的对象键被丢弃、返回空响应（[link](https://github.com/ollama/ollama/issues/18390)） | Open | 影响 `/api/chat` 与 `/v1/chat/completions`；唯一线索是服务端日志。 |
| 中 | #18442 `gemma4:26b` 并发解码丢失 EOS（`finish_reason: length`）（[link](https://github.com/ollama/ollama/issues/18442)） | Open | 相同测试环境下 `qwen3.8:27b` 3/3 全部正常——属模型特定问题。 |
| 中 | #18441 MLX 结构化输出在启用 thinking 时会在 JSON 前附加多余的 `.`（[link](https://github.com/ollama/ollama/issues/18441)） | Open | 关闭 thinking 后即消失。 |
| 中 | #18269 `muse-glimmer:30b-mlx`（NVFP4）在 32 GB M4 Air 上卡在 "Stopping…"（[link](https://github.com/ollama/ollama/issues/18269)） | Open | `ollama ps` 显示为卡住状态；watchdog 被触发。 |
| 中 | #18396 Jetson Orin Nano 8GB 加载 Gemma 4 E4B 多模态模型时 OOM（[link](https://github.com/ollama/ollama/issues/18396)） | Open | 将投影器放到 CPU 的配置可正常运行；默认配置会使主机 OOM。 |
| 低 | #18208 长驻 runner（`keep_alive -1`）在与第二个模型共存后输出 `<unused49>` 占位符（[link](https://github.com/ollama/ollama/issues/18208)） | 已关闭（`needs more info`） | 出现在 AMD Ryzen AI Max+ 迷你主机上。 |
| 低 | #18225 RTX 3090 上 CUDA token 生成慢约 5 倍（[link](https://github.com/ollama/ollama/issues/18225)） | 已关闭（`needs more info`） | |

## 对应用开发者意味着什么
- **谨慎锁定 v0.34.x。** 如果你在 Apple Silicon 上运行 MLX 后端工作流，v0.34.1-rc1 的驱逐与空闲内存门控是最稳妥的目标版本；若不需要这些改进，请停留在 0.32.13，以避开 0.33.x 的 CUDA 吞吐回退，以及自 0.30.0 起报告且尚未解决的模型加载变慢问题。
- **Gemma 4 的工具调用在 0.34.x 中很脆弱。** 避免使用含空格的对象键；在你的应用侧将被丢弃的工具调用视为解析失败并提示重试，而不是信任 `tool_calls: []`。
- **Anthropic 兼容接口配合 Claude Code 会削弱前缀缓存。** 如果你让 Claude Code 走 `/v1/messages`，在 #18431 修复之前请预期每轮都会缓存未命中——请据此核算 token 用量。
- **OpenAI Responses（`/v1/responses`、`/api/codex/v1/responses`）尚不能可靠支持 `previous_response_id` 续接。** 预期会收到 HTTP 200 但输出为空；短期可考虑重发完整对话历史作为变通，或在 PR #18439 / #18434 就绪后应用它们。
- **MLX 结构化输出需要 `thinking: false`**（或对输出做清洗），直到 #18441 落地——那个多余的 `.` 前缀会破坏下游的 JSON 解析器。
- **对于长上下文 MLX 会话**，请监控常驻内存相对 8 GiB 硬上限的增长，并合理规划请求规模，以免触发 #18231 中描述的换出快照 OOM 路径。
- **多模型 agent** 在切换模型时不应依赖 `keep_alive: -1` 的 runner——issue #18208 的输出损坏在完全重启前无法恢复。
- **持有 Strix Halo、Dragonwing IQ9 或 Rockchip 硬件的用户**可关注 #18435 / #18445 / #9268；目前均未落地，但都在过去 24 小时内重新活跃。

---

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-15

## 1. 今日要点

围绕 **OpenAI Responses → Chat 桥接** 的代理/SDK 接口正显露出明显的脆弱性：过去 24 小时内多份报告显示 `reasoning_text` 被丢弃、流式传输中的增量推理进度丢失、缓存写入的 token 计数残留陈旧值、以及 `usage` 字段缺失导致花费行无法写入。对于通过 LiteLLM 代理 OpenAI Agents SDK / Responses 流量的用户而言，这些都是关键的正确性问题。在运维方面，维护者合并/落地了多项高杠杆的修复——在 Global Usage 查询中将每个 key 的聚合上限设为 100 以避免 OOM 终止、跳过冗余的健康检查数据库写入、以及在 DB 入队前对预算预留进行协调——同时新增了一对一等公民的 `opencode_zen` / `opencode_go` 提供商。

## 2. 发布与破坏性变更

过去 24 小时内无新标签发布。

## 3. 新模型与硬件支持

- **OpenCode Zen 与 OpenCode Go** — 新增一等公民提供商，支持在 chat/messages/responses 端点间进行路由感知的分发；OpenCode Go 现在要求 session id，相关 PR 已处理。([PR #40964](https://github.com/BerriAI/litellm/pull/40964))
- **TinyFish Agent API 直通** — `/tinyfish/*` 路由至 `agent.tinyfish.ai`，按步骤计费（`num_of_steps × $0.016`），关联到调用虚拟 key 以实现费用归属。([PR #41099](https://github.com/BerriAI/litellm/pull/41099))
- **Vertex AI 成本映射同步** — 14 个模型根据提供商发布的定价更新（已关闭）。([PR #40955](https://github.com/BerriAI/litellm/pull/40955))
- **Mantle 端点的 Gemma 4** — 现在 Gemma 在 Bedrock 上已不可用，请愿通过 mantle 端点重新启用 Gemma 路由。([Issue #30657](https://github.com/BerriAI/litellm/issues/30657))
- **FOCUS 导出 → Ternary** — 将 Ternary 作为一个纯汇聚端的 FOCUS 目标（无独立导出作业，回调式）。([PR #39795](https://github.com/BerriAI/litellm/pull/39795))
- **Microsoft Agent 365 MCP 守卫** — 工具调用执行前的预评估，配合 Entra On-Behalf-Of 交换。([PR #38241](https://github.com/BerriAI/litellm/pull/38241))

## 4. 性能与优化

- **Global Usage 聚合 OOM** — 在聚合使用查询中，将每个 `api_key` 的聚合按花费排名前 100 进行截断。六个按 key 分组的子句让 Prisma 结果集膨胀，在大型部署上 45–59 秒时被 OOM 杀死。([PR #41143](https://github.com/BerriAI/litellm/pull/41143))
- **健康检查表写入放大** — 当"每个模型的最新行"读取失败时，原先的判断将其视为"无行"，每个周期每个 Pod 都会为每个模型写入一行。现已在读取失败时跳过。([PR #41145](https://github.com/BerriAI/litellm/pull/41145))
- **预算预留重复计数** — 在将花费行入队 DB 之前对 reseed 与已结算成本进行协调，以避免周期性的 flush 在计数器更新与 DB 下限之间发生交错。([PR #40310](https://github.com/BerriAI/litellm/pull/40310))
- **Prompt 缓存成本预测** — 已关闭的 PR，比较观察到的 warm/partial/stale/unknown 缓存状态，并对两个部署按 cache-aware 费率计价，防止更便宜的模型去重建昂贵的缓存。([PR #40877](https://github.com/BerriAI/litellm/pull/40877))
- **CodeQL 噪音削减** — 四个经过审计的 Python 质量查询类别从 PR 反馈中排除，同时保留日志注入及其他安全查询。([PR #41142](https://github.com/BerriAI/litellm/pull/41142))

## 5. 稳定性与回归

按用户可见影响排序。

**高危 — 推理 / Responses 桥接**
- Responses 转 Chat 流式传输丢失增量推理项与缓存的推理状态；桥接仅在终末事件上附加 `reasoning_items`，而非在 delta 上附加。([Issue #40887](https://github.com/BerriAI/litellm/issues/40887))
- 通过 `openai/responses/<model>` → `/v1/chat/completions` 路由时，Responses 转 Chat 在流式与非流式响应中均丢弃原始 `reasoning_text`。([Issue #40654](https://github.com/BerriAI/litellm/issues/40654))
- 流式 usage 合并器在显式零更新后仍保留陈旧的缓存写入 token — 破坏缓存成本核算。([Issue #40736](https://github.com/BerriAI/litellm/issues/40736))
- **修复进行中**：现在桥接到 chat 的 Responses kwargs 会被过滤以匹配原生 Responses 路径，因此部署侧的 `chat_template_kwargs` 不再泄漏并触发 400。([PR #41144](https://github.com/BerriAI/litellm/pull/41144))

**高危 — 花费 / 计费正确性**
- 虚拟 key 的 `BudgetExceededError` 在 `/key/info` 仍报告花费低于 `max_budget` 时触发 — 与 #27639 引用的团队 key 报告属同一类陈旧计数器缺陷。([Issue #27735](https://github.com/BerriAI/litellm/issues/27735))
- 重置预算任务对 `budget_duration=null` 但 `budget_reset_at` 非空且已过去的行，每周期静默将花费清零；无法自愈。([Issue #39370](https://github.com/BerriAI/litellm/issues/39370))
- 管理 UI 模型编辑持久化派生定价；价格映射重新加载后将 Azure 花费记录为 $0 — 与 #30081 相关。([Issue #40649](https://github.com/BerriAI/litellm/issues/40649))
- VLLM `cached_tokens` 未被 token 成本计算器处理；缓存提示成本静默缺失。([Issue #22984](https://github.com/BerriAI/litellm/issues/22984))
- 流式 `/v1/responses` 成功日志记录器因 `'dict' object has no attribute 'usage'` 崩溃 → 无花费日志写入，请求未计费（已关闭）。([Issue #29913](https://github.com/BerriAI/litellm/issues/29913))

**中等 — 限流 / 路由**
- v3 速率限制器对 `model_per_team` 重复计数 → 实际 RPM/TPM 为配置值的一半。([Issue #34140](https://github.com/BerriAI/litellm/issues/34140))
- 保存的团队/密钥提供商权重无法控制流量；全局权重始终胜出。修复已落地：部署权重经校验后按请求生效，支持在同一个公共模型组内进行 80/20 拆分。([PR #41072](https://github.com/BerriAI/litellm/pull/41072))
- 冷却 TTL 将 429 速率限制

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-15

## 1. 今日要点

过去 24 小时内**无新版本发布**，但 Studio/Desktop 维护活动频繁，主要集中在 **llama-server / llama.cpp 工具调用正确性修复**（嵌套字段排序、参数键排序导致重处理、Gemma 4 图像输入的 GGML_ASSERT）、一项针对聊天工具在会话目录外读写文件的**沙箱逃逸安全修复**，以及**更广泛的硬件覆盖**——AMD ROCm Docker 镜像已关闭，ARM64 DGX Spark 也有相关报告。团队当前的重心显然是强化 Studio 作为生产级 Agent 运行时，而非训练栈层面的改动。

## 2. 版本发布与破坏性变更

- 过去 24 小时内**无新版本发布**。
- 未检测到版本号变更、弃用项或 API/配置层面的破坏性变更。Desktop Beta 用户仍停留在多个 issue 中引用的 `0.1.808-beta` / `2026.9.x` 版本线。

## 3. 新增模型与硬件支持

- **AMD ROCm Docker 镜像** — Issue [#6230](https://github.com/unslothai/unsloth/issues/6230)（已关闭）落地了一个 ROCm 版本的容器，结构与 CUDA/Blackwell 镜像保持一致；目标平台为 RDNA2/3/4 以及 CDNA/Instinct。
- **ARM64 DGX Spark（GB10 / sm_121a）** — 仅报告型 PR [#10491](https://github.com/unslothai/unsloth/pull/10491) 记录了已发布的 `unsloth/unsloth` ARM64 镜像目前以 CPU 模式运行 llama.cpp；尚无代码改动。
- **Docker 中的本地模型发现** — PR [#10936](https://github.com/unslothai/unsloth/pull/10936) 让 `docker/run.sh` 以只读方式挂载 LM Studio、Ollama 和 Hermes 的模型目录，使 Studio 能够列出这些模型。
- **Gemma 4 图像输入路径** — Issue [#10559](https://github.com/unslothai/unsloth/issues/10559)（已关闭）原本是 `llama-server` 在默认 ubatch 大小下的 GGML_ASSERT；该路径现已支持通过 llama.cpp 进行 Gemma 4 多模态推理。
- **Apple MLX 自动切换** — Issue [#10951](https://github.com/unslothai/unsloth/issues/10951) 指出在 macOS 26.6.2 上已安装的 MLX 模型除非预加载，否则会返回 404。
- **Intel Arc 140T 笔记本** — Issue [#8632](https://github.com/unslothai/unsloth/issues/8632)（仍为 Open）报告了在 Windows + Intel Arc 140T 上的安装失败；目前尚未支持。

## 4. 性能与优化

- **`auto` 变压器精度在各档位上统一优先走 int8** — PR [#10888](https://github.com/unslothai/unsloth/pull/10888) 移除了原先的 `_prefer_consumer_scheme` 拆分策略（数据中心 Ada/Hopper/Blackwell 上 fp8 优先，消费级/工作站上 int8 优先）；现在 int8 在所有平台上都在 fp8 之前尝试，这可能会牺牲一部分显存余量，换取在混合硬件集群上更少的精度不匹配错误。
- **屏蔽命令正则仅编译一次** — PR [#10927](https://github.com/unslothai/unsloth/pull/10927)（已关闭）将屏蔽词的交替匹配从每次命令评估中提取出来，消除了每次沙箱调用中按名称调用 `re.escape` 的开销。
- **llama.cpp 更新后的内存增长** — Issue [#10921](https://github.com/unslothai/unsloth/issues/10921) 报告自上次 llama.cpp 升级以来 Web UI 稳态内存出现回归；目前还没有具体数据，仅在跟踪中。
- **DGX Spark 上下文长度回归** — Issue [#9889](https://github.com/unslothai/unsloth/issues/9889)（已关闭）在该讨论串中未公开基准数据便关闭了。

## 5. 稳定性与回归问题

按对推理/Agent 工作负载的影响严重程度排序：

| 严重程度 | 项目 | 状态 | 修复 |
|---|---|---|---|
| **高** | **通过聊天工具实现沙箱逃逸** — 本地模型在不同分区上对沙箱外的文件进行读写；`os.remove()` 未被屏蔽，尽管 shell `rm` 已被屏蔽（[#10929 报告, #10907 修复 PR](https://github.com/unslothai/unsloth/pull/10907)） | Open | ✅ [#10907](https://github.com/unslothai/unsloth/pull/10907) — 沙箱外 I/O 操作前进行提示确认 |
| **高** | **工具调用参数排序导致重处理** — 重放的 `edit_file` 调用的键被排序，llama.cpp 重新执行该调用（[#10791](https://github.com/unslothai/unsloth/issues/10791)） | Closed | 需要 PR |
| **高** | **嵌套工具调用字段被丢弃** —— 当 schema 顺序与写入顺序不一致时；例如 Notion 的 `start_cursor` 被静默丢失，调用与前一次进行去重（[#10935](https://github.com/unslothai/unsloth/pull/10935)） | Open PR | ✅ [#10935](https://github.com/unslothai/unsloth/pull/10935) |
| **高** | **`llama-server` 在 Gemma 4 图像输入上触发 GGML_ASSERT**（默认 ubatch 太小）（[#10559](https://github.com/unslothai/unsloth/issues/10559)） | Closed | 修复已隐式落地 |
| **高** | **安全检查可被绕过** —— 通过精心构造的命令（子 shell `$(...)` 中的 `reboot`、`rm`）（[#10835](https://github.com/unslothai/unsloth/issues/10835)） | Closed | 修复已隐式落地 |
| **中** | **MCP 响应被截断**且无法绕过 —— 怀疑是去重逻辑导致（[#10839](https://github.com/unslothai/unsloth/issues/10839)） | Open | — |
| **中** | **在低空闲内存的慢速 CPU 主机上 `unsloth start pi` 报 "Error: terminated"**（[#10912](https://github.com/unslothai/unsloth/issues/10912)） | Open | 修复引用自 [#10911](https://github.com/unslothai/unsloth/pull/10911) |
| **中** | **MLX 模型自动切换返回 404**，除非预加载（[#10951](https://github.com/unslothai/unsloth/issues/10951)） | Open | — |
| **中** | **已撤销的 HF 模型仍可在本地加载**，并给出误导性错误（[#10929](https://github.com/unslothai/unsloth/issues/10929)） | Open | — |
| **中** | **流式输出的 MLX gemma-4** 出现裸 `<|channel>` 拼接到推理内容中的问题（[#10905 修复 PR](https://github.com/unslothai/unsloth/pull/10905)） | Open→closed | ✅ [#10905](https://github.com/unslothai/unsloth/pull/10905) 已关闭 |
| **低** | **运行设置侧边栏与模型下拉框** 各自维护独立的草稿，存在静默不一致（[#10817](https://github.com/unslothai/unsloth/issues/10817)） | Closed | — |
| **低** | Desktop 连接 vLLM 时**不支持 `min_p` 和 `logit_bias`**（[#10573](https://github.com/unslothai/unsloth/issues/10573)） | Closed | — |
| **低** | Desktop **忽略 `--tensor-split`**（[#10355](https://github.com/unslothai/unsloth/issues/10355)） | Closed | — |
| **低** | **内联 Python 图表**（`![Plot](line_plot.png)`）在最终答案中渲染为 `[Image blocked: Plot]`（[#10954 修复 PR](https://github.com/unslothai/unsloth/pull/10954)） | Open | ✅ [#10954](https://github.com/unslothai/unsloth/pull/10954) |
| **低** | **Studio 更新不会重装缺失的 PyTorch**，导致安装处于仅聊天模式（[#10956 修复 PR](https://github.com/unslothai/unsloth/pull/10956)） | Open | ✅ [#10956](https://github.com/unslothai/unsloth/pull/10956) |
| **低** | **测试用 fixture 会从 Studio venv 中卸载 torch**（[#10955 修复 PR](https://github.com/unslothai/unsloth/pull/10955)） | Open | ✅ [#10955](https://github.com/unslothai/unsloth/pull/10955) |
| **低** | **Docker `run.sh` 的说明文档** 未告知用户需要挂载模型目录（[#10923](https://github.com/unslothai/unsloth/issues/10923)） | Open | — |
| **低** | **工具提示遮挡 Windows 控件**（图像/视频生成界面）（[#10226](https://github.com/unslothai/unsloth/issues/10226)） | Closed | — |
| **低** | **FastVisionModel** 破坏 Gemma 4 `gemma4_unified` 的空间定位（[#6028](https://github.com/unslothai/unsloth/issues/6028)） | Closed | — |

## 6. 对应用开发者的影响

- **如果你通过 Unsloth Studio/Desktop 部署 Agent**，[#10907](https://github.com/unslothai/unsloth/pull/10907) 中已合并/即将合并的安全修复会改变运行时行为 —— 任何合法访问沙箱外文件的模型现在都会触发确认提示。在下一个 Desktop Beta 之前，请针对新的审批门控测试你的提示词。
- **在第三方 API（Notion、Qwen 风格输出等）上的工具调用一直在静默丢弃嵌套的可选字段**，原因是当参数键的到达顺序与 schema 顺序不一致时。如果你观察到"看起来重复"的工具调用或缺失的 cursor 参数，[#10935](https://github.com/unslothai/unsloth/pull/10935) 是需要跟踪的相关修复。
- **Edit-file / 多参数工具调用正在被静默重执行**，原因是重放时键被重新排序（[#10791](https://github.com/unslothai/unsloth/issues/10791)）。在修复发布之前，请将当前 Beta 上通过 Studio 执行的任何破坏性工具调用视为可能被重复发出；建议引入审计日志。
- **通过 `llama-server` 的 Gemma 4 多模态** 现在可用于图像输入（ubatch 上的 GGML_ASSERT 已解决）。如果此前因为这个问题搁置了 Gemma 4 图像工作负载，现在可以解除阻塞。
- **AMD ROCm Docker 镜像现已实装**（[#6230](https://github.com/unslothai/unsloth/issues/6230) 已关闭）—— 如果你之前受限于仅支持 NVIDIA 的容器，可以在 Instinct 和 RDNA 节点上对其进行评估。
- **Apple MLX 路径仍然不够完善**：自动切换 404、流式 gemma-4 控制 token 拼接问题（[#10951](https://github.com/unslothai/unsloth/issues/10951)、[#10905](https://github.com/unslothai/unsloth/pull/10905)）。请固定使用预加载的模型，并对 MLX 流式输出进行端到端验证。
- **精度默认值变更**（[#10888](https://github.com/unslothai/unsloth/pull/10888)）：int8 优先现在也适用于数据中心级 GPU。如果你的工作负载对质量敏感，请对照原先的 fp8 优先行为校验输出；在充分评估回归之前，建议显式固定为 `bf16`。
- **今日无新版本发布** —— 生产环境部署应继续停留在当前的 `2026.9.x` / `0.1.808-beta` 版本线，直到下一个带标签的版本发布；已合并但未发布的修复队列相当庞大。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — 每日速览

**日期：** 2026-09-15
**项目：** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
**时间窗口：** 最近 24 小时

---

## 1. 今日要点

社区的关注点已明确转向 **Codex 桌面应用集成** 与 **跨协议转换的正确性**。围绕 Codex 配置文件的一组相关 Bug（app-server 握手、`fast_mode` 注入、Speed-control 目录解析）正在汇聚成一组协调修复，而有两个 PR 通过剥离会触发上游 `HTTP 400 array_above_max_length` 的 thinking/reasoning 块，强化了 Anthropic 与 OpenAI Responses 之间的兼容性。同时，包装 cmd 在 Windows 上的环境变量转义回归也被曝出。

## 2. 发布与破坏性变更

*最近 24 小时内无新发布。* 没有可报告的版本标签或迁移说明。

## 3. 新模型与硬件支持

本窗口内无新模型、后端或量化支持落地。

## 4. 性能与优化

- **配置接受超时上调并改为可配置** — [#1794](https://github.com/musistudio/claude-code-router/pull/1794) 将硬编码的 5000 ms 子进程启动预算替换为可配置旋钮。原值度量的是真实网关入口的子进程 *spawn + require()*，通常过于紧张；上调该预算可在无需为其他人改代码的前提下，消除冷启动机器上偶发的启动失败。

## 5. 稳定性与回归

按严重程度排序（最严重优先）。

1. **[HIGH] Codex 桌面配置文件无法通过 CCR 启动** — [#1795](https://github.com/musistudio/claude-code-router/issues/1795) *(OPEN)*。App-server 握手中止，报错 `This app server did not provide application network requirements`。与之配套的在途修复 [#1796](https://github.com/musistudio/claude-code-router/pull/1796) 阻止了 CCR 向 `null` 配置需求对象注入 `fast_mode` —— 这正是握手失败的近因。关注该 PR 以便近期合并。
2. **[HIGH] 跨协议回退在重试时返回 HTTP 400** — [#1615](https://github.com/musistudio/claude-code-router/issues/1615) *(CLOSED)*。当回退链混合多种协议（如 `anthropic_messages` → `openai_responses`）时，重试路径跳过了请求体的重新翻译。在上游行为被澄清后关闭；该类翻译问题现已通过 [#1702](https://github.com/musistudio/claude-code-router/pull/1702) 和 [#1784](https://github.com/musistudio/claude-code-router/pull/1784) 得到解决。
3. **[HIGH] OpenAI Responses 上游拒绝转换后的 reasoning 项** — [#1784](https://github.com/musistudio/claude-code-router/pull/1784) *(OPEN)*。Codex 风格的上游会拒绝 `content` 数组非空的 `reasoning` 输入项（`array_above_max_length`）。任何被翻译的 Claude thinking 块都会产生这样的项。修复方案是剥离 reasoning 项中非空的 `content`。应与其姊妹修复一并落地。
4. **[MEDIUM] Anthropic thinking 块泄漏到 OpenAI 上游** — [#1702](https://github.com/musistudio/claude-code-router/pull/1702) *(CLOSED/MERGED)*。`stripUnsupportedOpenAiRequestParameters` 现在还会剥离消息历史中 `type: "thinking"` / `type: "redacted_thinking"` 的内容块。消除了一类在 chat/responses 上游上出现的 `HTTP 400` 故障。
5. **[MEDIUM] Windows 包装 cmd 对环境变量值双重转义** — [#1797](https://github.com/musistudio/claude-code-router/issues/1797) *(OPEN)*。`Ec()` 针对无引号的 `set` 进行转义，但 `ce()` 会用引号包裹，因此脱字符 / 百分号的转义会传到子进程中。症状：包含括号的模型名到达子进程时变为 `^(self hosted^)`。仅影响 Windows；影响 Desktop **v3.1.0**。
6. **[MEDIUM] Claude Code 在 CCR 同步后丢失 apiKeyHelper** — [#1798](https://github.com/musistudio/claude-code-router/issues/1798) *(OPEN)*。CCR 将 `autoMode: true` 从会话同步到配置存储，并在每次启动时重写 `settings.json`，导致 Claude Code 忽略 `apiKeyHelper` 并报 "Not logged in"。影响 Windows / Desktop **v3.1.0**。
7. **[LOW] Codex 应用对自定义提供商隐藏 Speed 控制** — [#1683](https://github.com/musistudio/claude-code-router/issues/1683) *(CLOSED)*。确认为 Codex 应用的客户端显示怪癖 —— CCR 的目录数据完整；无需修改 CCR。

## 6. 对应用开发者的意义

- **如果你通过 CCR 代理 Codex（桌面应用或 CLI）：** 请密切跟进升级进度 — [#1796](https://github.com/musistudio/claude-code-router/pull/1796) 针对启动时注入 `fast_mode` 的 Bug，该 Bug 目前正在破坏 Codex 桌面端启动。在合并之前，预期会出现 `This app server did not provide application network requirements` 的 app-server 握手失败。
- **如果你的回退链混合了 Anthropic 与 OpenAI Responses 后端：** 这一类跨协议翻译 Bug 将于本周内清零。[#1702](https://github.com/musistudio/claude-code-router/pull/1702) 剥离发往 OpenAI 上游的消息历史中的 `thinking` 块；[#1784](https://github.com/musistudio/claude-code-router/pull/1784) 完成对携带非空内容的 `reasoning` 项的处理。在两个修复都进入你的构建之前，你可能会在重传已翻译历史的重试中，间歇性地遇到 `HTTP 400 array_above_max_length`。
- **如果你在 Windows 上运行 CCR Desktop：** 请将 **v3.1.0** 视为存在两个已知回归 —— 通过包装 cmd 导致的模型名括号化问题 (#1797)，以及被会话驱动的配置重写覆盖的 `apiKeyHelper` (#1798)。在修复发布前，避免在模型显示名中使用括号，也避免依赖 `apiKeyHelper` 同步。
- **正在启动冷启动 CCR 实例的运维人员：** [#1794](https://github.com/musistudio/claude-code-router/pull/1794) 暴露了原先硬编码的 5000 ms 网关启动超时。如果你在慢盘或高负载主机上观察到启动期 `gateway:config-accepted` 失败，请将该值调高。
- **目录 / UI：** Codex Speed-control 显示问题 (#1683) 无需任何操作 —— 上游 Codex 应用会针对非 OpenAI 提供商刻意隐藏该控件。

---
*来源：[musistudio/claude-code-router](https://github.com/musistudio/claude-code-router) Issues 与 Pull Requests，最近 24 小时。*

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 简报 — 2026-09-15

## 今日要点

过去 24 小时 CC Switch 没有发布任何新版本，但代码库在 Codex 供应商切换、Google Antigravity 迁移以及跨协议代理路径等多个方向上吸收了大量维护性改动。分量最重的一波落地改动是修复“切换供应商后 Codex 会话持久化”问题(旧线程仍固定 `model_provider = "custom"`,请求 `api.openai.com` 时报 401),这既有多份回归报告佐证，也有对应的 PR 支撑([#5672](https://github.com/farion1231/cc-switch/issues/5672)、[#7377](https://github.com/farion1231/cc-switch/issues/7377)、[#7362](https://github.com/farion1231/cc-switch/issues/7362);PR 侧见 [#7386](https://github.com/farion1231/cc-switch/pull/7386)、[#7395](https://github.com/farion1231/cc-switch/pull/7395))。与此同时，Google Antigravity 适配器正带着向后兼容性收尾([#7402](https://github.com/farion1231/cc-switch/pull/7402)),Linux 上的 Claude Desktop 3P 配置支持也已完结([#7331](https://github.com/farion1231/cc-switch/pull/7331)、[#7389](https://github.com/farion1231/cc-switch/pull/7389))。

## 版本发布与破坏性变更

过去 24 小时没有新版本发布。根据 [#7401](https://github.com/farion1231/cc-switch/issues/7401),当前版本线稳定在 **v3.20.3**。

- **需关注的回归(尚未随版本发布)：** commit `5c053626` 引入了一键“快速设置”的 bug:用户设置的默认回退模型(`ANTHROPIC_MODEL`)被面板自上而下的查找所遮蔽，并被静默改回之前的预设值([#7401](https://github.com/farion1231/cc-switch/issues/7401))。修复已就绪于 [PR #7407](https://github.com/farion1231/cc-switch/pull/7407)(将回退值恢复为第一优先级，仅在未设置时才回退到自上而下查找)。
- **Codex 配置文件约定即将变更：** [PR #7386](https://github.com/farion1231/cc-switch/pull/7386) 在统一会话桶注入中显式允许 `model_provider = "openai"`,官方 Codex 供应商模板不再被提前拒绝。升级后 Codex 的 `config.toml` 预计会出现少量 diff。

## 新模型与硬件支持

- **Google Antigravity CLI(`agy`)——一等公民：** 会话/用量/技能同步逻辑被重写，改为扫描 `~/.gemini/antigravity{, -cli, -ide}/...`,同时保留旧版 `~/.gemini/tmp/*/chats/` 路径以向后兼容([#7402](https://github.com/farion1231/cc-switch/pull/7402))。这关掉了长期存在的“Gemini CLI 会话未导入”一类问题([#3938](https://github.com/farion1231/cc-switch/issues/3938)、[#7385](https://github.com/farion1231/cc-switch/pull/7385))。旧的 `gemini-cli` 二进制检测现在已是死路径——已在 [#7345](https://github.com/farion1231/cc-switch/issues/7345) 中标记待移除。
- **MiniMax Code(CLI 工具链)：** 沿用 Pi/OpenCode 的模式，新增为一等应用，包含完整的供应商/模型管理、MCP、Skills、全局指令、本地会话历史与用量([#7383](https://github.com/farion1231/cc-switch/pull/7383))。
- **VS Code Copilot BYOK + GitHub Copilot CLI:** 新的一等应用，拥有各自的目录/状态/资源/会话/用量视图；Custom Endpoint BYOK 供应商被建模为共享的端点/密钥/协议分组([#6286](https://github.com/farion1231/cc-switch/pull/6286))。响应了此前"Cline + Copilot 管理"的功能诉求([#3338](https://github.com/farion1231/cc-switch/issues/3338))。
- **Grok:** 每个供应商独立的账号凭据；请求模式与 reasoning-effort 现已记入用量日志；内置模型价格已刷新([#6792](https://github.com/farion1231/cc-switch/pull/6792))。
- **muse-spark 模型：** 已加入 `supports_reasoning_effort()`,因此 Anthropic→Responses 转换不再静默丢弃 `output_config.effort`([#7398](https://github.com/farion1231/cc-switch/pull/7398),跟踪 [#7397](https://github.com/farion1231/cc-switch/issues/7397) 及同类问题 [#7314](https://github.com/farion1231/cc-switch/issues/7314) / [#7318](https://github.com/farion1231/cc-switch/issues/7318))。
- **oh-my-pi(社区)适配器：** 已提交增强请求([#6422](https://github.com/farion1231/cc-switch/issues/6422),9 👍),尚无实现。
- **Hermes Agent 用量导入：** 从 `session_model_usage` 到 Usage Dashboard 的只读聚合同步，作为独立数据源处理(不转换为 `proxy_request_logs`,不做逐请求推断)([#6120](https://github.com/farion1231/cc-switch/pull/6120))。

## 性能与优化

- **SOCKS5 与 HTTP CONNECT 行为对齐：** reqwest 的 `socks5://` 之前会在本地解析目标(把 IP 字面量直接发给代理，破坏 Clash/mihomo 的 GeoIP 规则，并导致 WebDAV 同步超时)。现已切换为远端解析语义，使 `socks5://` 与 `http(s)://` 在混合监听器下行为一致([#7406](https://github.com/farion1231/cc-switch/pull/7406),跟踪 [#7393](https://github.com/farion1231/cc-switch/issues/7393))。
- **DeepSeek 死循环修复(已关闭)：** Responses→Chat 转换器此前会把一个 assistant 回合拆成两条相邻消息并复制 `reasoning_content`,造成 12–14 万 token 的循环。已合并([#5860](https://github.com/farion1231/cc-switch/issues/5860),已关闭)。
- **流式 message_start 正确性：** OpenAI→Anthropic 转换器此前发出的 `message_start.message` 缺少必需的 `content: []`,导致严格的 Anthropic SDK 客户端以快照不匹配为由拒绝第一个内容块([#7396](https://github.com/farion1231/cc-switch/pull/7396))。
- **为兼容 Chat-Completions 的上游(MiniMax M3、OpenCode Go 路由)在转发前注入内联 ``,使推理与回答不再以单一纯文本块送达([#7408](https://github.com/farion1231/cc-switch/pull/7408),跟踪 [#7271](https://github.com/farion1231/cc-switch/issues/7271))。
- **出站脱敏升级(进行中)：** 将不透明的 `***` 遮蔽替换为可逆的类型化占位符(`{{PHONE_1}}` 等)，使模型仍能对实体进行推理，且多个值之间不会相互冲突([#7306](https://github.com/farion1231/cc-switch/pull/7306))。

## 稳定性与回归

大致按用户影响范围排序：

1. **Codex 会话/供应商不同步(高)：** 切换供应商后继续旧的官方 Login 会话，仍会路由到 `api.openai.com` → 401([#5672](https://github.com/farion1231/cc-switch/issues/5672)、[#7377](https://github.com/farion1231/cc-switch/issues/7377))。根因:`state_5.sqlite → threads.model_provider` 被固定为 `custom`。修复进行中:[PR #7386](https://github.com/farion1231/cc-switch/pull/7386)(允许 openai 路由)、[PR #7395](https://github.com/farion1231/cc-switch/pull/7395)(接管时重新绑定陈旧账号)。相关讨论见 [#7362](https://github.com/farion1231/cc-switch/issues/7362)。
2. **快速设置回退模型回归(中)：** commit `5c053626` 使“默认回退模型”失效并覆盖用户输入([#7401](https://github.com/farion1231/cc-switch/issues/7401))。修复已就绪:[#7407](https://github.com/farion1231/cc-switch/pull/7407)。
3. **Codex 400 缺失 `call_id`/`name`(中)：** v3.20.2 中跨任务的 `send_message_to_thread` 在多工具流程下触发 HTTP 400([#7230](https://github.com/farion1231/cc-switch/issues/7230))。尚无 PR。
4. **Codex 切换解析错误 / "account does not exist"(中)：** v3.20.x 上报告了一般性的切换失败([#7265](https://github.com/farion1231/cc-switch/issues/7265)、[#7032](https://github.com/farion1231/cc-switch/issues/7032))。
5. **GPT-5.6 reasoning-effort 降级(中，陈旧)：** Claude→Responses 中显式指定的 `max` effort 被静默映射为 `xhigh`([#5367](https://github.com/farion1231/cc-switch/issues/5367))。Muse-spark 的同类问题刚修复([#7398](https://github.com/farion1231/cc-switch/pull/7398))——同一代码路径很可能覆盖 GPT-5.6。
6. **DeepSeek 官方 Responses API 404(中，陈旧)：** Codex 走 DeepSeek 官方([#5408](https://github.com/farion1231/cc-switch/issues/5408))。
7. **Claude→Responses 流式无限挂起(中，陈旧)：** 特定条件下无任何可见输出([#5368](https://github.com/farion1231/cc-switch/issues/5368))。
8. **Skills 幽灵条目(低，陈旧)：** 已删除的技能仍会出现在 UI 中([#5352](https://github.com/farion1231/cc-switch/issues/5352))。
9. **DNS 劫持回归(低，已关闭)：** 代理模式下 cc-switch 曾把 `api.deepseek.com` 解析到 `127.0.0.1`——已关闭([#7125](https://github.com/farion1231/cc-switch/issues/7125))。
10. **ARM64 Kylin V10 GLIBC 不匹配(低，已关闭)：** GLIBC 2.31 构建请求已关闭且未交付——如有需要请另行跟进([#1120](https://github.com/farion1231/cc-switch/issues/1120))。

## 对应用开发者意味着什么

- **如果你在跨供应商切换时脚本化操作 Codex 会话：** 要么固定在 v3.20.3、等 [PR #7386](https://github.com/farion1231/cc-switch/pull/7386) 与 [#7395](https://github.com/farion1231/cc-switch/pull/7395) 合并，要么着手规划迁移：每个既有的 Codex 线程都会把供应商记录在 SQLite 中，因此你的工具要么在接管时重新绑定，要么接受切换前的对话将无法打开的现实。在依赖很长的 Codex 历史之前，请先测试连续性。
- **路由/多厂商组合：** 组合路由这一长期诉求([#3703](https://github.com/farion1231/cc-switch/issues/3703),17 条评论，6 👍)仍处于开放状态，而唯一进入过的"router" PR 也以未合并为由被关闭([#7387](https://github.com/farion1231/cc-switch/pull/7387))。不要指望 CC Switch 在这个版本里能在多个供应商之间做扇出/故障转移——请自带网关。
- **如果你面向 Google Gemini 工作流：** 上游的 Gemini CLI 独立版实际上已 EOL;待 [#7402](https://github.com/farion1231/cc-switch/pull/7402) 发布后，尽快将集成假设切换到 Google Antigravity(`agy`,`~/.gemini/antigravity*/brain/...`),并且不要在本发布周期之后继续依赖 `~/.gemini/tmp/*/chats/` 路径。
- **Reasoning-effort 路由：** 你的网关接入的任何自定义模型都必须列入 `supports_reasoning_effort()`(或等价的注册表)，否则 effort 参数会在 Anthropic→Responses 转换中被静默空转。对外宣称 reasoning 分级行为之前，先用探针验证。
- **脱敏机制在变：** 如果你在解析代理的请求/响应日志，出站报文中不透明的 `*` 遮蔽正被可逆的类型化占位符替代([#7306](https://github.com/farion1231/cc-switch/pull/7306))。升级前请更新你的日志分析器。
- **SOCKS5 出站代理：** 对依赖远端 DNS 解析 / GeoIP 规则的上游代理，请优先使用 `socks5h://`(或在混合监听器下用 `http(s)://`)。CC Switch 的纯 `socks5://` 路径现在会本地解析，可能破坏 mihomo/Clash 的路由。
- **可对接的新供应商目标：** VS Code Copilot BYOK([#6286](https://github.com/farion1231/cc-switch/pull/6286))、Grok 账号配置([#6792](https://github.com/farion1231/cc-switch/pull/6792))、MiniMax Code CLI([#7383](https://github.com/farion1231/cc-switch/pull/7383))以及 Hermes 聚合用量([#6120](https://github.com/farion1231/cc-switch/pull/6120))——尽管尚未随任何版本发布，但都已可接受终端用户测试。
- **安全态势：** 针对上游中继站“中转站”的拟议安全审计(prompt-injection

---

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 日报 — 2026-09-15

[QuantumNous/new-api](https://github.com/QuantumNous/new-api) 每日动态速览 —— 该项目是统一的 LLM 网关 / 推理编排系统。本文聚焦：稳定性、回退问题，以及与基础设施相关的变更。

---

## 1. 今日要点

项目仍处于 **v1.0.0-rc.** 系列（当前为 RC.37），今日流量主要被一个 **RC.37 中的关键内存回退** 所占据（常驻内存从 ~75 MB 飙升到 ~1.8 GB，导致小规格实例 OOM，[#7361](https://github.com/QuantumNous/new-api/issues/7361)），同时还有一个此前已合并的 **基于 LRU 链表的内存限流器重构**，显著降低了内存中限流器的占用（[#6807](https://github.com/QuantumNous/new-api/pull/6807)）。渠道后端方面，新增了 **vLLM 与 SGLang 渠道集成**（[#7332](https://github.com/QuantumNous/new-api/pull/7332)），Ollama 流式 `tool_calls` 丢失的 bug —— 在 qwen3-coder 上尤为明显 —— 已通过两个近乎同时提交的补丁修复（[#7376](https://github.com/QuantumNous/new-api/pull/7376)、[#7380](https://github.com/QuantumNous/new-api/pull/7380)）。

---

## 2. 发布与破坏性变更

- **过去 24 小时内无新的正式标签发布。**
- 项目目前位于 **v1.0.0-rc.37**（见 [#7279](https://github.com/QuantumNous/new-api/issues/7279)，该 issue 要求在 RC 编号已达 37 的当下，给出一份书面的 **GA 退出标准** —— 👍 8，是今日互动量最高的事项）。当前窗口内维护者尚未回复。
- **今日合并/关闭的、与部署相关的变更：**
  - **透传中继不再静默丢弃渠道 `param_override`**（[#7346](https://github.com/QuantumNous/new-api/pull/7346)）。此前，当某个渠道设置了 `pass_through_body_enabled` 时，网关会逐字回放原始请求体，并跳过 `ApplyParamOverrideWithRelayInfo`；这两项功能实际上互斥。此次修复新增了 `buildPassthroughRequestBody`，使得即便在透传模式下也能应用渠道覆盖。原先依赖透传来绕过网关重写的运维人员，**应重新测试覆盖配置** —— 透传渠道上的行为已发生变化。
  - **全局 URL 前缀支持**（[#7350](https://github.com/QuantumNous/new-api/pull/7350)）。新增 `NEW_API_ROUTE_PREFIX` 环境变量；`/v1`、`/api`、`/pg`、`/mj`、`/oauth` 现均挂载在该前缀之下，路由辅助函数也具备了前缀感知能力。这是一项 **会影响挂载路径的变更** —— 任何对这些路径进行硬编码的反向代理配置，在升级前都应重新审视。
  - **CNY 计价下 DeepSeek 余额修复**（[#6814](https://github.com/QuantumNous/new-api/pull/6814)）。区分 CNY 与 USD 的返回结果，数据库中 `Balance` 默认采用 USD，仅在返回 CNY 时进行换算。关闭 [#5063](https://github.com/QuantumNous/new-api/issues/5063)。

---

## 3. 新增模型与硬件支持

- **vLLM 与 SGLang 渠道**（[#7332](https://github.com/QuantumNous/new-api/pull/7332)，已关闭）。网关现可将自托管的 vLLM 与 SGLang 部署作为一等渠道接入 —— 对此前只能以通用 OpenAI 兼容渠道方式访问的自托管推理后端而言，具有实际意义。
- **Ollama 渠道级 OpenAI 兼容开关**（[#7382](https://github.com/QuantumNous/new-api/pull/7382)，已关闭）。新增渠道级开关，可在 Ollama 之上使用 OpenAI 兼容的请求封装，便于 Ollama 前置 OpenAI 适配层的场景。
- **华为 MaaS 渠道**（[#7239](https://github.com/QuantumNous/new-api/pull/7239)，**仍 OPEN**，等待维护者反馈）。若合并将支持直接路由至华为 MaaS 服务。
- **阿里云百炼 "HappyHorse" 模型**（[#7375](https://github.com/QuantumNous/new-api/issues/7375)）—— 作为无效内容关闭 / 并非真实模型，可忽略。
- **Vertex AI → 受控 GCS 代理**增强请求（[#7121](https://github.com/QuantumNous/new-api/issues/7121)）仍处 open 状态；与需要受控出口的文件生成流水线的运维场景相关。
- 今日无新增 GPU / 量化格式支持落地（无 CUDA / ROCm / Metal / INT4 / AWQ / GPTQ 相关变更）。

---

## 4. 性能与优化

- **内存限流器重构 —— LRU + 链表**（[#6807](https://github.com/QuantumNous/new-api/pull/6807)，已关闭）。旧实现为每个限流器实例预分配 `make([]int64, 0, maxRequestNum)`，在 `GLOBAL_API_RATE_LIMIT` 设置得过高时会导致 OOM（见 [#6732](https://github.com/QuantumNous/new-api/issues/6732)、[#6159](https://github.com/QuantumNous/new-api/issues/6159)）。新实现按需分配并主动淘汰。这是对长期存在的高限流值 OOM 问题的根本修复，并且 **替代了（或并行于）RC.37 中那项已被反馈为内存回退的改动**。运维人员应确认实际部署的版本。
- **OpenAI 中继 —— 恢复客户端断开时的排空逻辑**（[#7379](https://github.com/QuantumNous/new-api/pull/7379)，已关闭）。合并 RC.31 时引入的一项回退，将 5 个 OpenAI 流处理器回退到了裸露的 `NewStreamScanner`，丢弃了项目中用于在客户端取消时排空上游的 `TextStream…` 生命周期管理。恢复该逻辑可避免客户端取消的请求继续消耗上游算力。（关联 [#7134](https://github.com/QuantumNous/new-api/issues/7134)，该 issue 抱怨客户端取消的流被 **计入失败** 影响性能成功率指标 —— 该统计错误仍处 open 状态。）
- **定价页排序菜单横向抖动修复**（[#7145](https://github.com/QuantumNous/new-api/pull/7145)）以及 **模型广场 24 小时成功率条形间距**（[#7284](https://github.com/QuantumNous/new-api/pull/7284)）—— 仅 UI 层面。
- **自助使用记录 API** 现已支持对 `model_name` 的大小写不敏感子串过滤（[#7381](https://github.com/QuantumNous/new-api/pull/7381)）。

今日未发布具体的吞吐量 / tokens-per-second / 延迟数据。

---

## 5. 稳定性与回退

**关键**

- **RC.37 内存回退：常驻 ~75 MB → ~1.8 GB，小规格 VM 上 OOM**（[#7361](https://github.com/QuantumNous/new-api/issues/7361)，在数据窗口内被关闭但未修复）。基于官方 Docker 镜像、自托管环境复现。**当前窗口内无相关 PR 关联。** **建议：在生产环境停留在 RC.36，直至带修复的版本被标签发布。**

**高**

- **`GLOBAL_API_RATE_LIMIT` OOM**（[#6732](https://github.com/QuantumNous/new-api/issues/6732)，已关闭）。根因为预分配的限流器切片；[#6807](https://github.com/QuantumNous/new-api/pull/6807) 已修复 —— 但停留在 RC.37 的运维人员应确认其构建中是否包含该 PR。
- **透传中继静默忽略渠道 `param_override`**（[#7346](https://github.com/QuantumNous/new-api/pull/7346)，已关闭）。属于正确性 bug —— 设置被吞掉而非仅是低效。修复已合并。
- **Ollama 流式 `tool_calls` 在最终的 `done:true` 帧被丢弃**（[#7252](https://github.com/QuantumNous/new-api/issues/7252)，已关闭）。在 qwen3-coder 上复现；[#7376](https://github.com/QuantumNous/new-api/pull/7376) 与 [#7380](https://github.com/QuantumNous/new-api/pull/7380)（CLOSED）均对其进行了修复。同一天出现多次修复尝试，提示存在短暂的竞态 —— 留意下一个 RC 究竟采用了哪一份。
- **Creem 支付 Webhook 返回 403**（[#2650](https://github.com/QuantumNous/new-api/issues/2650)，open / 停滞，8 条评论）。属于文档/配置层面缺失，并非代码崩溃。

**中等**

- **`/v1/responses` SSE：浮点型 `created_at` 导致 3 条快照事件被丢弃、usage 丢失、计费回退到估算**（[#6822](https://github.com/QuantumNous/new-api/issues/6822)，已关闭）。对任何在 Responses 流式路径上使用非整数时间戳的场景具有实质性影响。
- **CNY 计价下 DeepSeek 渠道余额返回币种错误**（[#5063](https://github.com/QuantumNous/new-api/issues/5063) → [#6814](https://github.com/QuantumNous/new-api/pull/6814)）。已修复。
- **高级自定义路由与模型映射冲突**（[#6639](https://github.com/QuantumNous/new-api/issues/6639)，open）。两者同时配置时请求未被正确转发。
- **`/v1/responses` 系统提示在非 Codex 渠道上未被注入**（[#6879](https://github.com/QuantumNous/new-api/pull/6879)，仍 open）。建议重构至 `ResponsesHelper` 以集中注入逻辑。
- **渠道重试按渠道 ID 顺序而非优先级选择**（[#7007](https://github.com/QuantumNous/new-api/issues/7007)，已关闭）。
- **定价表达式语言缺少 `weekday()` —— 无法表达周一至五的峰值定价**（[#7011](https://github.com/QuantumNous/new-api/issues/7011)，已关闭）。
- **分层计费模型误打 "dynamic pricing · no match" 日志**（[#7296](https://github.com/QuantumNous/new-api/issues/7296)，已关闭）。
- **性能成功率指标被客户端取消的流污染**（[#7134](https://github.com/QuantumNous/new-api/issues/7134)，open）。独立于 #7379 的排空修复 —— 统计侧仍需处理。
- **仍处 open 的停滞 issue**（近期活跃度低，但值得留意）：停滞 bug [#2650](https://github.com/QuantumNous/new-api/issues/2650)、停滞 [#3240](https://github.com/QuantumNous/new-api/issues/3240)（LiteLLM 风格 `encrypted_content_affinity`）、停滞 [#3260](https://github.com/QuantumNous/new-api/issues/3260)（自 0.11.4 起视频预览失效）。

---

## 6. 对应用开发者的意义

- **生产环境停留在 v1.0.0-rc.36**，直至 RC.37 的内存回退问题有带修复的标签发布。RC.37 带来了一些值得拥有的功能工作（例如透传 param override、全局 URL 前缀、Ollama tool_calls 修复），但在 <2 GB 容器上常驻内存暴涨是阻断性问题。
- **重新测试透传渠道。** 若此前依赖 `param_override` 在透传模式下为空操作（部分团队借此"锁定"某些渠道），行为已发生变化 —— 覆盖配置现在会真正生效。请验证下游契约。
- **反向代理 / 路径路由**：`NEW_API_ROUTE_PREFIX` 环境变量会改变挂载路径。若在 nginx / Caddy / Traefik 中硬编码了 `/v1`、`/api`、`/pg`、`/mj`、`/oauth`，请在下一次升级前规划配置更新。
- **自托管用户新增的后端选项：** vLLM 与 SGLang 现已成为一等渠道，可将部分流量路由至运行这两种引擎的 GPU 池，而无需再将它们伪装成通用 OpenAI 端点。对异构硬件下的容量规划很有帮助。
- **Ollama + 流式工具调用** 已修复 —— 若此前为流式请求对接 Ollama（qwen3-coder 及类似模型）时禁用了工具调用，可在包含 [#7376](https://github.com/QuantumNous/new-api/pull/7376) 或 [#7380](https://github.com/QuantumNous/new-api/pull/7380) 的下一个 RC 之后重新启用。
- **WebSocket Responses 中继**（[#5062](https://github.com/QuantumNous/new-api/pull/5062)，已关闭）是一项值得关注的能力，适用于基于 WS 的 Codex 风格会话 —— 对实时 Agent 循环场景值得一看。
- **设置合理的速率限制。** 在确认 [#6807](https://github.com/QuantumNous/new-api/pull/6807) 中的 LRU 限流器已进入你的构建之前，避免设置过高的 `GLOBAL_API_RATE_LIMIT` 值 —— 旧版预分配切片正是 OOM 的来源。
- **定价 / 计费正确性** 正受到积极关注：CNY / USD 核算（DeepSeek）、分层计费摘要、重试优先级、以及 `weekday()` 峰值定价都在陆续落地。若运维方面存在多区域或峰谷定价需求，请关注下一个 RC 中的相关变更。

*整理自过去 24 小时内 QuantumNous/new-api 仓库更新的 41 个 issue 与 31 个 PR。该窗口内无任何标签发布。*

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*