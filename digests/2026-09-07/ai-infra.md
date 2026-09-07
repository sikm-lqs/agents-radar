# AI 基础设施日报 2026-09-07

> 生成时间: 2026-09-07 13:28 UTC | 覆盖项目: 9 个

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

# 跨项目基础设施报告 — 2026-09-07

## 1. 生态概览

今日活动沿基础设施层级清晰分裂：推理引擎（vLLM、SGLang）正竞相启用并优化新一轮混合/线性注意力模型（GLM-5.3-Flash、Kimi-K3、Qwen3.8-Flash-Next、DeepSeek-V4），同时重构 KV 缓存管理；本地运行时（llama.cpp、Ollama）继续以高节奏推进消费级硬件支持（Vulkan、SYCL、Metal、SM120）。在它们之上，网关（LiteLLM、New API）正在围绕 `/v1/responses` 兼容性与计费正确性收敛，New API 发布了今日唯一的正式版本（v1.0.0-rc.34，聚焦安全）。两大横切痛点主宰各处 bug 队列：**投机解码交互问题**（前缀缓存丢失、KV 池容量、非确定性）以及**消费级 Blackwell（SM120）不稳定**。与此同时，微调工具（Unsloth）正在通过将服务能力（llama-server 支持的 KV 抢占）直接构建进 Studio 来模糊层级边界。

## 2. 活动对比

| 项目 | 层级 | Issue（开放/已关闭）* | PR（浮现）* | 24h 发布 |
|---|---|---|---|---|
| **vLLM** | 推理引擎 | 18 / 2（+2 追踪项） | 17 | 无（待默认值切换 #54268） |
| **SGLang** | 推理引擎 | 13 / 2 | ~19 | 无 |
| **llama.cpp** | 本地运行时 | 16 / 9（自动陈旧） | 25 | **10 个构建（b10827–b10839）** |
| **Ollama** | 本地运行时/分发 | 12 / 3 | 8 | 无 |
| **LiteLLM** | 网关 | 16 / 3 | 13 | 无（v1.99.1 为最新） |
| **Unsloth** | 微调 | 20 / 2 | 13 | 无 |
| **Claude Code Router** | Agent CLI 路由 | 1 / 0 | 2 | 无 |
| **CC Switch** | Agent CLI 代理 | 9 / 6 | ~15（全仓：48 issue，56 PR 活跃） | 无 |
| **New API** | 网关/计费 | 6 / 8 | 10 | **v1.0.0-rc.34** |

\* 计数为各摘要中浮现的条目，并非仓库全量总数。llama.cpp 是发布节奏的离群点（每日 10 个二进制 vs 引擎为 0）；New API 显示出最高的 issue 关闭比，反映出围绕 rc.34 安全版本的批量分诊。

## 3. 模型支持竞速

| 模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | 网关/其他 |
|---|---|---|---|---|---|
| **GLM-5.3-Flash** | 性能套件落地（FlashKDA 1.7–3.8×），架构追踪 #54062 仍开放 | SM120 追踪中（#37813） | HC 张量映射共享以供未来 HC 模型使用（#28451） | — | — |
| **Kimi-K3** | FlashInfer KDA 内核 + ROCm 重新落地；1P1D disagg 损坏开放（#52627） | DSPARK draft-pool OOM 开放（#38202） | — | — | New API：kimi-k3 动态工具已修复（rc.34） |
| **Qwen3.8-Flash-Next** | QSA 路径上的 fp8 KV；A100 FP8 启动失败（#54318） | NVFP4 GenMHA KV **已通过 spec-decoding 验证**（#36340） | — | — | CC Switch：Qwen 3.8 预设刷新 + QwenCloud 更名 |
| **DFlash2/DFLASH 草稿** | K=0 跳过修复；XPU 0% 接受率 + YaRN 前缀缓存 bug | **Beam-tree 草稿已落地**（#36196） | — | — | — |
| **DeepSeek-V4** | SM12x NaN/IMA bug 开放 | Ascend CANN 9.1 CI 套件 | Vulkan hyper-connection 融合算子（最后一个后端空缺已闭合） | — | CC Switch：DSH 一等应用类型 |
| **Spark X2.5** | — | — | **b10828，先行者** | 通过 llama.cpp bump b10829（#18279） | — |
| **Gemma 4** | — | — | Vulkan 性能（~4%） | — | Unsloth：基模型 BOS 分词器修复（#10312） |
| **Wan video** | — | VAE + diffusion 性能 CI 基线 | — | — | New API：Wan3 通道；Unsloth：ROCm TI2V OOM 开放 |
| **Cohere Compass、SarvamMLA、SAGE_ATTN、TQ1_0** | ✓（3 项独家新增） | — | TQ1_0（Vulkan） | — | — |

**结论：** vLLM 在数据中心级新增广度上领先（今日三项独家模型/后端条目）；llama.cpp 在本地化时间上领先（Spark X2.5 一天内端到端发布，Ollama 在 9 个构建内继承）；SGLang 在硅基前沿上领先（Ascend/NPU、SM100/SM103 NVFP4）。值得注意的模式：引擎正在基础架构支持完全闭环之前就为 GLM-5.3-Flash 落地*性能* PR —— 启用与优化现已重叠。

## 4. 性能前沿

优化投入大致按以下五个方向集中：

1. **KV 缓存架构（投入最重）。** SGLang 开出一个 4 篇逻辑分片系列（#37614，1/4 已落地）加上一份通过设备内存 IPC 的进程外 HiCache RFC（#37372），并修复了分块预填充主机备份（#36647）。vLLM 在 QSA 上落地了 fp8 主 KV（#55557）并修复了 SM90 sparse MLA 上的 fp8 启动问题。bug 端与投入相呼应：Ollama MLX 仅按 8192 token 倍数恢复前缀（**17–27s 重新预填充税**），llama.cpp `--kv-unified` 使 pp 下降 42–54%（#28495），vLLM EAGLE 前缀丢失导致**30–40% 批吞吐损失**（#53670）。
2. **混合/线性注意力内核。** vLLM 的 FlashKDA 分块预填充（1.7–3.8×）、sparse-MLA 预填充与解码热路径清理；ROCm L2/MALL 哈希碰撞填充（**最高 13% TTFT**）；llama.cpp Vulkan RMS_NORM 融合（Gemma 4 ~4%）与 SYCL L2_NORM 批处理（12,480→6,240 dispatches）。
3. **量化。** NVFP4 现已在 Blackwell 上成为一等公民（SGLang GenMHA 配合 spec-decode；vLLM 8% E2E disagg 收益），vLLM 将统一在线 MXFP4 量化收敛到同一 API，llama.cpp 端到端新增 TQ1_0 并开辟了一条码本量化研究方向。
4. **投机解码。** SGLang 的 DFLASH2 beam-tree 草稿；llama.cpp 的概率草稿器 + 拒绝采样验证器与一个确定性草稿插件 SDK。这同时是所有三个运行时上最高的性能杠杆与最高的 bug 来源。
5. **分布式/分离式服务。** vLLM 多节点死锁已闭环，MoE disagg all2all 默认切换待定（+8%）；SGLang 正在与 PP-disagg abort-storm 死锁（#34572）及 B300 MNNVL+HiCache 卡死（#38300）搏斗。

## 5. 层级定位

- **推理引擎（vLLM、SGLang）：** 掌控数据中心数据平面 —— 分布式推理、预填充/解码分离、spec-decode 与新硅基启用。差异化正在收窄；今日两者都投入于相同的模型（GLM-5.3-Flash、Kimi-K3）与相同的原语（NVFP4 KV、DFLASH 类草稿）。
- **本地运行时（llama.cpp、Ollama）：** llama.cpp 是发布节奏极快的上游内核/量化底座；Ollama 是分发与 UX 层（调度器、MLX runner、OpenAI 兼容表面），通过 bump 继承模型支持 —— 今日的 Spark X2.5 完全源自上游。它们的前沿是硬件广度（Vulkan iGPU、SYCL Arc、gfx APU），而非吞吐。
- **网关（LiteLLM、New API）：** 掌控协议转换、多提供者路由、租户与资金流。今日的工作是 `/v1/responses` 生命周期正确性（LiteLLM MCP 流式、后台轮询）以及计费/安全（New API rc.34 范围化证明、TOTP/Passkey、审计日志；两个计费 bug 修复待发布）。
- **微调（Unsloth）：** 训练加上日益真实的服务层 —— Studio 现已将 KV 抢占委托给打过补丁的 `llama-server`（#10358）并控制流框架（#10362）。层级边界正被刻意消解。
- **Agent-CLI 控制平面（CCR、CC Switch）：** 一个处理提供者切换、会话绑定认证与能力协商的全新微层，面向编码 agent（CC Switch 的 `supported_endpoints` 路由、分类器流量切分）。它们的破坏性事件源自*上游客户端更新*（Codex 2026.9.2），而非内核。

值得记住的依赖链：网关坐落于引擎之上（LiteLLM 的 `stream_options` 泄漏导致 vLLM 400 错误，#29431）；Ollama 与 Unsloth Studio 坐落于 llama.cpp 分支之上。

## 6. 趋势信号

1. **`/v1/responses` 是互操作战场 —— 且各处均处于预稳定状态。** LiteLLM（MCP 流式 `AssertionError`，流未计费）、New API（`response.incomplete` 零计费）、Ollama（`agent_message` 被拒）、Unsloth（专有帧现已 opt-in）。Agent 开发者应将 Responses 表面行为视为未发布候选版本级别，并锁定版本。
2. **投机解码是栈中最高方差特性。** 今日每个运行时都出现 spec-decode 正确性 bug（vLLM prompt_logprobs 损坏；SGLang DP attention 下 draft-pool OOM；llama.cpp 重复 token 退化；Ollama MTP warmup 时 Blackwell 崩溃）。在启用前请基于你的工作负载重新基准接受率；Unsloth 对接受率指标的诉求（#10401）反映了真实的运维需求。
3. **KV 缓存正在被重新架构，而非仅调优。** 进程外 HiCache、逻辑分片、服务端抢占、fp8/NVFP4 KV —— 预计前缀缓存语义（及其 bug）将在未来一个季度持续波动。
4. **消费级 Blackwell（SM120）是最不可信的部署目标。** vLLM 持续 FP8 下出现 Xid 13，Ollama flash-attention warmup 崩溃，SGLang SM120 追踪仍开放。请按精确 SKU 验证；虽然存在变通方案（`--enforce-eager`、内核禁用列表），但要付出真实性能代价。
5. **网关资金处理需要对账。** New API 的双重计费/零计费组合与 LiteLLM 缺失的 SpendLog 行意味着代理层的基于用量的计费今日是有损的 —— 请与提供者侧日志对账。
6. **确定性正成为一等需求。** vLLM 的批不变性追踪（88 条评论，opt-out 推行）、llama.cpp top-k 平局打破非确定性以及 temperature-0 差异问题，都指向评估/agent 流水线中对可复现推理日益增长的需求。
7. **应用开发者关注清单：** vLLM 中的 `flashinfer_nvlink_one_sided` 默认切换（拉取 nightly 前请重新基准）、SGLang 的 CP V1 弃用波（HIP/NPU/MUSA 推行）、llama.cpp 的 GDN 归一化修复（b10829 改变输出 —— 请重算缓存引用），以及 Codex 类客户端更新作为路由工具的破坏性事件。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-07

## 今日要点

今天提交与分类处理密集，GLM-5.3-Flash 性能相关 PR 占据队列主导（同一作者连续提交三个独立 PR，分别落地 FlashKDA prefill、稀疏 MLA prefill，以及 decode 热路径清理）。 Kimi-K3 的 ROCm 工作恢复推进，针对 gfx950 重新合入了 KDA fusion；同时长期跟踪的批处理确定性议题（[#27433](https://github.com/vllm-project/vllm/issues/27433)）评论数突破 88 条，项目正向 opt-out 灰度推进。 已关闭两起值得关注的回归（多节点 Ray 死锁、混合 GDN 上 OffloadingConnector 与 MTP/EAGLE 共存问题），但仍有多个 Blackwell/Ada 确定性及 CUDA-IMA 缺陷处于未关闭状态。

## 发布与破坏性变更

- **过去 24 小时内无新版本发布。**
- 待默认开启的变更：[#54268](https://github.com/vllm-project/vllm/pull/54268) 提议将 `flashinfer_nvlink_one_sided` 设为 `all2all` 后端默认值，**仅限 CUDA**（在 Qwen3.5 397B NVFP4 分离部署下 E2E 收益约 8%）。 ROCm/XPU 维持现有默认值，线上应用部署前应重新跑基准。
- [#51800](https://github.com/vllm-project/vllm/pull/51800) 移除了 Quark 特有的静默在线 MXFP4 量化，统一使用 vLLM 在线量化 API。 自定义 Quark 流水线请迁移至 [`features/quantization/online`](https://docs.vllm.ai/en/stable/features/quantization/online/)。

## 新增模型与硬件支持

- **[#54774](https://github.com/vllm-project/vllm/pull/54774) — Cohere Compass（`North-Micro-Vision-Instruct`）** 通过 Transformers v5 路径接入。
- **[#55732](https://github.com/vllm-project/vllm/pull/55732) — `SAGE_ATTN` 注意力后端**，基于 SageAttention PR #402（seqlens + 分页 KV decode）。
- **[#55364](https://github.com/vllm-project/vllm/pull/55364) — FlashInfer KDA 内核**集成至 Kimi K3（bf16 cache state，prefill + decode）。 默认后端不变。
- **[#55557](https://github.com/vllm-project/vllm/pull/55557) — Qwen3.8-Flash-Next：在 QSA 路径上主 KV cache 使用 `fp8_e4m3`**（副 cache 与 GDN state 仍为 bf16）。 仅在 `--kv-cache-dtype fp8` 时生效。
- **[#54062](https://github.com/vllm-project/vllm/issues/54062)** GLM-5.3-Flash 的 `Glm5NextTextLinearAttention` 架构在 nightly 上仍未支持，处于接入阶段。
- **[#38425](https://github.com/vllm-project/vllm/issues/38425)** InternVL2 关于 Transformers v5 meta-device 加载的子议题（属于跟踪议题 [#38379](https://github.com/vllm-project/vllm/issues/38379)）— 欢迎贡献。
- **[#55728](https://github.com/vllm-project/vllm/pull/55728)** SarvamMLA 在 Transformers v5 gating 下被提升为 `hf` reason。

## 性能与优化

- **GLM-5.3-Flash 性能套件**（4× GB300，FP8，`flashINFER_MLA_SPARSE`）：
  - **[#55737](https://github.com/vllm-project/vllm/pull/55737) — FlashKDA 分块 prefill**：相对约 15 个 kernel 的 Triton `chunk_kda_with_fused_gate` 路径提速 **1.7–3.8×**。
  - **[#55738](https://github.com/vllm-project/vllm/pull/55738) — (256, 0, 256) NoPE MLA 布局下的稠密/带掩码 MHA 稀疏 prefill**，跳过 NoPE K 拼接。
  - **[#55736](https://github.com/vllm-project/vllm/pull/55736) — Decode 热路径清理**：KDA 循环读采用跨步访存、NoPE MQA query 不再拼接，并移除重复的 router GEMM。
  - **[#55222](https://github.com/vllm-project/vllm/pull/55222)** 修复了 SM90 稀疏 MLA 下 `--kv-cache-dtype fp8` 启动问题，并合理调整了 indexer prefill workspace 大小。
- **ROCm gfx11/3.5（[#55090](https://github.com/vllm-project/vllm/pull/55090)）**：权重行 stride 按一个 cache line（128B）补齐，避免 L2/MALL 哈希冲突 → **TTFT 最高 13%、TPOT 最高 3%**。
- **ROCm Kimi-K3（[#54038](https://github.com/vllm-project/vllm/pull/54038)）**：针对 gfx950 重新合入融合的 KDA prefill 内核，**吞吐提升约 5%**。
- **MoE 分离部署（[#54268](https://github.com/vllm-project/vllm/pull/54268)）**：CUDA 默认 `flashinfer_nvlink_one_sided` → Qwen3.5 397B NVFP4 上 8% 收益。
- **ROCm MLA（[#55741](https://github.com/vllm-project/vllm/pull/55741)）**：MQA decode 的 BMM 抽象 + 标准化的在线 `kv_b_proj` 量化（MXFP4/FP8 路径）。
- **[#53426](https://github.com/vllm-project/vllm/pull/53426)** 可选启用跳过 K=0 的 draft 同步前向（MTP + DFlash），用于缓解 [#53670](https://github.com/vllm-project/vllm/issues/53670) 报告的 prefix cache 复用下吞吐回归。

## 稳定性与回归

**高危（正确性 / 阻塞生产）：**

- **[#55571](https://github.com/vllm-project/vllm/issues/55571)** — RTX PRO 5000（SM120）在持续 FP8 负载下出现 Xid 13 / CUDA 非法内存访问。 **临时绕过方案**：`VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` 或 `--enforce-eager`。 尚无修复 PR。
- **[#54521](https://github.com/vllm-project/vllm/issues/54521)** — `Qwen3.8-Flash-Next-FP8` 在 prompt 长度跨越 `indexer_budget` 时贪心解码出现非确定性（prefill 中使用 persistent_topk，SM121/GB10）。 五个相同请求给出五个不同输出。
- **[#53726](https://github.com/vllm-project/vllm/issues/53726)** — RTX 3090 上 混合 GDN + MTP k=3 + 异步调度下出现静默 CUDA IMA（exit 0）；经过 #50021 / #45100 / #53613 一类硬化后问题依旧。
- **[#49896](https://github.com/vllm-project/vllm/issues/49896)** — SM12x 上的 DeepSeek-V4：`top_k_per_row_prefill` 中 MQA logits 出现 NaN，进而导致 smem 未初始化，最终触发非法内存访问。
- **[#46710](https://github.com/vllm-project/vllm/issues/46710)** — PR #46025 后，DeepSeekV4-Flash 在包含内联系统消息时输出错误（模板在 raise 与 in-place 保留路径之间分叉）。

**中危（性能 / 功能性）：**

- **[#53670](https://github.com/vllm-project/vllm/issues/53670)** — EAGLE/MTP 下 prefix cache 丢弃最后一个 block → 每次命中额外重算 1,648 token → **批处理吞吐下降 30–40%**（混合 Qwen3.8 GDN 的复用型请求）。 缓解 PR：[#53426](https://github.com/vllm-project/vllm/pull/53426)。
- **[#49210](https://github.com/vllm-project/vllm/issues/49210)** — MTP + xgrammar 结构化输出下引擎核心活锁（CPU 100%，无崩溃）—— v0.24.0 起引入的回归。
- **[#53488](https://github.com/vllm-project/vllm/issues/53488)** — 启用 MTP 推测解码时，部分请求的 `prompt_logprobs` 静默损坏（Qwen3.5 系列、分块 prefill；两个构建版本、两个 checkpoint 均复现）。
- **[#53257](https://github.com/vllm-project/vllm/issues/53257)** — DeepSeek-V4-Flash 在 temperature=0 时非确定性，错误率随并发度上升（NVFP4 + DSpark draft head，B300）。
- **[#54906](https://github.com/vllm-project/vllm/issues/54906)** — Model Runner V2 下 `thinking_token_budget` 被忽略（Qwen3.8 NVFP4 + MTP）。
- **[#55250](https://github.com/vllm-project/vllm/issues/55250)** — XPU 上 DFlash2 draft 接受率为 0%（`--dtype float16`，bf16 正常）—— Qwen3.8-27B + incoai/Qwen3.8-27B-DFlash2。
- **[#54318](https://github.com/vllm-project/vllm/issues/54318)** — `Qwen3.8-Flash-Next-FP8` 在 4× A100 上无法启动（SM80 不支持 `fp8e4nv`）。 FP8 部署请使用 SM90+。
- **[#52627](https://github.com/vllm-project/vllm/issues/52627)** — Kimi-K3 在 1P1D NIXL Direct-PD 分离部署中出现静默输出损坏（MooncakeStoreConnector + NixlConnector 通过 MultiConnector 组合）；纯 NIXL PD 配置则无此问题。
- **[#54094](https://github.com/vllm-project/vllm/issues/54094)** — 相同 1.04M prompt 下 DFlash2 + YaRN 的 prefix cache 复用为 0，而仅 target 模型可复用约 1.039M token。

**已关闭（回归已解决）：**

- **[#52735](https://github.com/vllm-project/vllm/issues/52735)**（已关闭）—— OffloadingConnector 存储了 CPU KV 但在启用 MTP/EAGLE 推测解码时命中为 0（混合 GDN，XPU）。 修复见 [#55118](https://github.com/vllm-project/vllm/pull/55118)（不要弹出已校验的全 attn eagle 前缀块）。
- **[#52907](https://github.com/vllm-project/vllm/issues/52907)**（已关闭）—— Ray 执行器下，2 节点 × TP-16 时 `in_the_same_node_as()` 的 gloo 屏障处出现多节点启动死锁（`0.26.1rc1.dev78` 到 `0.26.1rc1.dev148` 之间引入的回归）。
- **[#55369](https://github.com/vllm-project/vllm/pull/55369)**（已关闭）—— Qwen3.5 多模态 MTP 的 `n_predict` 从 `text_config` 解析。

**长期跟踪议题：**

- **[#27433](https://github.com/vllm-project/vllm/issues/27433)** —— 批处理不变性（Batch Invariant）特性/性能优化跟踪（88 条评论；vLLM 项目看板 #29）。 进行中。
- **[#38256](https://github.com/vllm-project/vllm/issues/38256)** —— RFC：增量

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 简报 — 2026-09-07

## 今日重点

今天最重要的工作围绕 **KV 缓存架构**展开。一个 RFC 已开启，旨在通过设备内存 IPC 将 HiCache 的数据面移出进程外 (#37372)；一个四部分组成的逻辑页 KV 缓存分片系列中的第一部分已合并 (#37614)。在模型服务侧，SM100/SM103 原生 NVFP4 KV 缓存通过 TRT-LLM GenMHA 现在可以与推测解码一起使用 (#36340)，DFLASH2 引入了基于选择器的 beam-tree 草拟 (#36196)。

## 发布版本与破坏性变更

*过去 24 小时内没有新版本发布。*

不过，多个 PR 预示着即将到来的 API/行为变更：

- **CP V1 弃用（3.5/5）** — #38293 弃用了传统的 HIP/NPU/MUSA prefill 上下文并行实现，为 CP 重构做准备。CUDA 基于策略的 prefill CP、DCP 以及普通非 CP 推理不受影响。
- **TRT-LLM allreduce 融合累加** — #34603（已关闭）讨论了 trtllm allreduce 融合是否应像 mnnvl 后端一样在 fp32 中累加。
- **GlmMoeDsa / GLM-5.2 NVFP4 + EAGLE** — flashinfer_trtllm bf16 批量 GEMM 中的非法内存访问在 #30209 中跟踪；#30137 之后 triton `nextn` 默认仅对 HIP 启用。

## 新模型与硬件支持

- **NPU 上的 GLM-5.2** — #38250 在 950PR/DT NPU 上添加了 GLM-5.2 推理支持，带 FP8 KV 缓存和 MLAProlog，以及通过现有量化稀疏注意力实现的打包 FP8 KV。#37373（已关闭）添加了 NPU arch35 支持并增强了 DSV4 处理。
- **SM120 上的 GLM-5.3-Flash** — 跟踪 issue #37813 涵盖在 2× 96 GB RTX PRO 6000 Blackwell GPU（TP2、W4A16 routed 专家、FP8 KV、视觉、原生 MTP）上的服务。
- **Ascend 上的 DeepSeek-V4-Flash** — CI 工作 #37386（plog 持久化 + 仅调试的夜间性能）和 #38332（CANN 9.1.0 夜间套件）推进了 Ascend 覆盖。
- **Ascend NPU 上的 LongCat 2.0** — #30224（已关闭/不活跃）记录了在四节点 Atlas 800I A3 集群上部署 INT8 LongCat 2.0。
- **Diffusion / Wan 2.1 VAE** — #38182 保持 Wan VAE 解码器为 `channels_last`，并添加了 Triton NHWC 最近邻上采样（#38020 的后续）。
- **Transformers loader 兼容性** — #38336 添加了离线 Transformers loader 兼容性检查。

## 性能与优化

- **DFLASH2 树形草拟** (#36196) — 将 DFLASH 从单路径草拟扩展到基于选择器的 beam-tree 草拟；选择器已生成 top-K 候选和转移分数，这些分数现在被保留而不再被压缩。
- **SM100 NVFP4 GenMHA KV 缓存** (#36340) — 打包的 NVFP4 K/V 推测解码路径已验证；是更广泛的 NVFP4 工作（#29913 中跟踪）的一部分。
- **KV 缓存分片（1/4）：逻辑页放置** (#37614) — 纯算术索引空间 + 新分配器；运行时尚不可达，但为系列中后续三个 PR 奠定了基础。
- **HiCache 写穿式主机备份用于分块 prefill** (#36647，修复 #33714) — 修复了一个回归：长度超过 `chunked_prefill_size` 的提示从未被备份到主机，导致驱逐时完全重算。
- **裁剪混合目标验证中的 MLP-sync 填充** (#37587) — 修复了在 TP8 上 38 个请求 × 6 个草拟 token 产生 232 个物理行而非 228 行的问题，该问题破坏了混合循环注意力的 reshape。
- **融合静态 FP8 激活量化** (#31504，提案) — 针对 `modelopt_fp8`/`modelopt_mixed` 检查点（Nemotron、Llama、Qwen FP8、Qwen3.5-V2），目标是每个 FP8 GEMM 之前的独立 `_static_quant_fp8` 内核；在 Qwen3.5-397B-A17B-NVFP4-V2 上开销显著。
- **Diffusion 性能 CI 基线** (#38335) — `PerformanceValidator` 之前未检查十个 diffusion 性能用例（`expected_e2e_ms: 0.0`）；与 residency-planner 栈 (#37918) 对比显示 `hunyuanvideo_modelopt_fp8_t2v` 从 2.6 s 回退到 6.9–10.1 s，`lingbot_video_moe_t2v` 6.6 s+ —— 基线现已锁定。
- **CPU 融合 scale-shift / norm 内核用于 diffusion** (#33452) — 为 CPU diffusion 添加了三个新的 sgl-kernel 算子。

## 稳定性与回归

按严重程度排序：

1. **B300 上 HiCache + FlashInfer MNNVL 的 TP2 挂起** (#38300，今日新增，v0.5.18，FlashInfer 0.6.17) — 可中断 prefill CUDA 图与 HiCache 和 FlashInfer MNNVL 结合，在单个 NVLink 域内的 2× B300 上导致挂起。*尚无修复 PR。*
2. **DP 注意力下 DFLASH/DSPARK 草拟 KV 池 OOM（Kimi-K3）** (#38202，今日新增) — 草拟 KV 预算使用 `tp_size` 而非 `attn_tp_size`。*尚无修复 PR。*
3. **断开的流式客户端 → 僵尸请求** (#36333) — 来自 #34160 revert 的回归；请求运行到 `max_tokens` 并用「state was deleted」错误淹没 `TokenizerManager`。*尚无修复 PR。*
4. **中止风暴下 PP 解耦 prefill 挂起** (#34572) — bootstrap 队列历史在 PP 阶段间发散，导致 microbatch 选择不匹配和 P2P 死锁。作者提供了 RCA + 修复系列。*修复进行中。*
5. **GLM-5.2 FP4 + EAGLE：flashinfer_trtllm bf16 批量 GEMM 中的非法内存访问** (#30209) — B200 和 B300 上的 TP4/TP8，使用 `nextn` 草拟 MoE。Triton 路径仅对 HIP 启用。*变通方案：切换草拟后端。*
6. **混合 GDN 模型（Qwen3.6-27B NVFP4）使用 EAGLE/MTP 丢失约 50 GB VRAM** (#29857，v0.5.14) — KV 池 token 容量上限远低于可用 VRAM；禁用推测解码恢复正常行为。*尚无修复 PR。*
7. **DeepSeekV4TokenToKVPool（SWA/HiSparse）在 decode 回退时崩溃** (#33385) — `get_cpu_copy()` 返回 `NotImplementedError`；offload 是无条件的，并非以 `--disaggregation-decode-enable-offload-kvcache` 为门控。*尚无修复 PR。*
8. **`--enable-eplb + --speculative-algorithm DSPARK` 在草拟 CUDA 图捕获期间崩溃** (#34974) — `scatter_add_` 因 `layer_idx=None` 出现维度不匹配。*尚无修复 PR。*
9. **DeepSeek-V4-Flash-0731 `reasoning_effort` 差一错误** (#33185) — `high` 是空操作，供应商的 `max` 无法访问；在 v0.5.16 和当前 `main` 中持续存在。*尚无修复 PR。*
10. **MoE 调优器写入运行时从未读取的配置（int4_w4a16）** (#35252)。*尚无修复 PR。*
11. **DSPARK：草拟 worker 将 `speculative_num_draft_tokens (gamma+1)` 继承到其注意力后端** (#30555，已关闭/不活跃) — proposer 发出 `gamma` 行 → 在 triton 草拟后端下产生 OOB KV 读取。*之前不活跃；重新启用 `sglang-dspark` 分支前重新审视。*
12. **`/v1/responses` `created_at` 类型不匹配** (#34716) — 流式事件中为 float，非流式响应中为 int。*尚无修复 PR。*

CI 跟踪 issue #17050 继续监控不稳定/失败的测试（截至 12:25 UTC，3 个失败，16 个不稳定，953 个最近已修复）。

## 对应用开发者的意义

- **将 B300 + HiCache + FlashInfer MNNVL 组合视为可疑。** 如果您在 B300 上依赖解耦 prefill，请将 FlashInfer 固定在 <0.6.17 或在 #38300 解决前禁用 MNNVL，并显式使用可中断 prefill CUDA 图进行验证。
- **Blackwell 上的 NVFP4 KV 缓存现已成为一等公民。** 如果您使用 NVFP4 检查点服务 SM100/SM103 并需要推测解码，#36340 落地了已验证路径；您不再需要为 GLM 类 NVFP4 工作负载定制注意力后端。
- **DFLASH2 树形草拟是新的默认期望。** Beam-tree 草拟接受度将提升长上下文工作负载的吞吐量 (#36196) —— 重新基准测试您的 DSPARK/EAGLE 流水线以捕获新选择器带来的收益。
- **HiCache + 分块 prefill 现在是正确的。** 长度超过 `chunked_prefill_size` 的提示现在实际备份到主机 L3 (#36647)；如果您之前通过调整分块 prefill 来绕过无主机备份问题，请重新审视您的设置。
- **关注 CP V1 弃用浪潮。** #38293 是移除 HIP/NPU/MUSA 上传统 prefill 上下文并行的步骤 3.5/5；多平台部署应测试基于策略的 prefill CP 路径。
- **DeepSeek-V4-Flash 上的推理力度控制当前已损坏。** 在 #33185 修复之前，请勿依赖 `reasoning_effort: high` 或 `max`；仅将 `medium`/`low` 视为可操作。
- **Diffusion 延迟回归现在由 CI 捕获。** #38335 为十个 diffusion 性能用例设定了基线，因此未来类似 residency-planner 的回归将导致 CI 失败而非悄悄落地。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-07

## 1. 今日要点

Vulkan 性能优化主导今日内容：**RMS_NORM 融合** 落地,Gemma 4 上获得约 4% 提升;**TQ1_0 量化支持** 实现端到端打通;**DeepSeek-V4 超连接融合算子** 补齐了相对 CUDA/Metal 的后端差距。CUDA 方面,fp16 flash attention 中一个分歧屏障的修复与一个长期存在的 **GDN 归一化 bug(`max` → `rsqrt`)** 同期发布;同时新增的 `--fuse-qkv` 标志与 **Spark2_5ForCausalLM** 模型支持进一步扩展了转换/运行时能力。

## 2. 发布与破坏性变更

24 小时内发布 10 个二进制版本(b10827 → b10839)。未移除任何 API/CLI 标志,但以下几点值得注意:

- **b10830** 引入 `convert --fuse-qkv`,一个在 HF→GGUF 转换期间融合 Q/K/V 投影的新标志。可选使用,但启用后会改变 GGUF 张量布局([#22780](https://github.com/ggml-org/llama.cpp/pull/22780))。
- **b10829** 修正 **GDN q/k 归一化** 公式(`max` → `rsqrt`)。使用 Gated Delta Net 的模型相对于之前构建版本将产生不同(正确)的输出;应视为行为修复而非回归([#28068](https://github.com/ggml-org/llama.cpp/pull/28068))。
- **b10835** 修复 CUDA f16 flash attention 中的分歧屏障([#27870](https://github.com/ggml-org/llama.cpp/pull/27870))。
- **b10834** 让后端输入避免创建额外的图分割([#28387](https://github.com/ggml-org/llama.cpp/pull/28387))。
- **b10839** 为 Vulkan `GET_ROWS` 添加类型对齐支持,并对未对齐偏移提供 CPU 回退([#28253](https://github.com/ggml-org/llama.cpp/pull/28253))。

## 3. 新模型与硬件支持

- **b10828** 新增 **Spark2_5ForCausalLM**([#27868](https://github.com/ggml-org/llama.cpp/pull/27868))。
- **Vulkan: TQ1_0** 支持(mm、mat-vec、mat-vec-id、dequant、get_rows)于 **b10831**([#27765](https://github.com/ggml-org/llama.cpp/pull/27765))。
- **Vulkan: DeepSeek-V4 超连接融合算子**(`DSV4_HC_COMB/PRE/POST`)——最后一个缺少这些算子的主要后端——PR [#26578](https://github.com/ggml-org/llama.cpp/pull/26578)。
- **HIP: gfx90c / gfx909** 被重新归类为 Vega(GCN)而非 CDNA,修复了这些 APU 上的重复 token 输出([#26454](https://github.com/ggml-org/llama.cpp/pull/26454))。
- **OpenCL**:为 `q4_K`/`q5_K` 的 `mul_mat` 选择权重打包方式([#28402](https://github.com/ggml-org/llama.cpp/pull/28402))。
- **Hy4-preview** 转换重构——HC 张量映射移至全局映射,使 GLM-5.3-Flash 及未来 HC 模型共享同一映射([#28451](https://github.com/ggml-org/llama.cpp/pull/28451))。
- **MoE 诊断工具**:新增 `examples/moe-trace`,记录每个 token 的路由专家选择([#28544](https://github.com/ggml-org/llama.cpp/pull/28544))。
- **Metal**:在 M5 Max 上将 D512 解码调优至 NE2([#28534](https://github.com/ggml-org/llama.cpp/pull/28534))。

## 4. 性能与优化

| 领域 | 变更 | 影响 |
|---|---|---|
| Vulkan RMS_NORM 融合 | RMS_NORM + MUL + ADD(+ MUL)、RMS_NORM + VIEW + SET_ROWS、ROPE+VIEW+SET_ROWS w/ IMROPE([#28024](https://github.com/ggml-org/llama.cpp/pull/28024)) | **Gemma 4 上约 4%** |
| Vulkan MoE coopmat1 | 当专家行数 < tile 时跳过 `MUL_MAT_ID` 中的不必要工作([#25483](https://github.com/ggml-org/llama.cpp/pull/25483)) | 待落地 |
| Vulkan 一元运算融合 | UNARY(GELU/SIGMOID/SILU/SOFTPLUS)+MUL,与 CUDA 对齐([#27220](https://github.com/ggml-org/llama.cpp/pull/27220)) | 待落地 |
| CUDA RDNA3 MoE MMQ | 根据典型专家宽度调整 N-tile 尺寸([#24546](https://github.com/ggml-org/llama.cpp/pull/24546)) | RDNA3 上的路由 MoE 预填充 |
| SYCL L2_NORM 批处理 | 合并连续的 F32 L2_NORM 兄弟节点([#28222](https://github.com/ggml-org/llama.cpp/pull/28222)) | Arc B70 上 L2_NORM 派发从 12480 → 6240 |
| qwen4exp QSA 解码 | 基于 gather 的稀疏注意力——仅在索引器选中的单元上运行([#28213](https://github.com/ggml-org/llama.cpp/pull/28213)) | 稀疏注意力预筛选修复 |
| Scheduler UMA | 输入张量环形缓冲区 + sanitizer 加固([#27311](https://github.com/ggml-org/llama.cpp/pull/27311)) | 稳定性,非性能 |
| **投机解码** | MTP / 简单草案的概率性草稿器 + 拒绝采样验证器([#27694](https://github.com/ggml-org/llama.cpp/pull/27694)) | 使用草稿器的分布而非 top-1 |
| **确定性草案插件 SDK**([#26551](https://github.com/ggml-org/llama.cpp/pull/26551)) | 可插拔 SPI,用于校验 |
| **RFC: MoE mlock 热专家固定**([#28545](https://github.com/ggml-org/llama.cpp/pull/28545)) | 将最热的专家切片固定在 mmap 中,避免小内存机器上的页缓存抖动 |
| **量化实验室**——新增逐张量码本量化 + 配方生成器([#19941](https://github.com/ggml-org/llama.cpp/pull/19941)) | 研究方向 |
| **CUDA FA 量化控制**:用 `GGML_FA_QUANTS` 替换 `GGML_FA_ALL_QUANTS`([#28079](https://github.com/ggml-org/llama.cpp/pull/28079)) | 更小的二进制,仅编译可行的 KQ 组合 |

## 5. 稳定性与回归

**未关闭——影响较大**

- **[#20837](https://github.com/ggml-org/llama.cpp/issues/20837)** *(60 条评论)* — Qwen3.5 9B 在启用 thinking 时输出 XML 工具调用并停止。**Chat 解析器 bug**,非模型 bug。
- **[#23577](https://github.com/ggml-org/llama.cpp/issues/23577)** *(32 条评论)* — Qwen3.6 27B + MTP 在长会话后输出重复 `////`(CUDA)。
- **[#26845](https://github.com/ggml-org/llama.cpp/issues/26845)** *(11)* — SYCL 在第二个提示上出现乱码(Arc Pro B60)。
- **[#24324](https://github.com/ggml-org/llama.cpp/issues/24324)** *(10)* — CUDA 上出现 `fattn.cu:579: fatal error`。相关:[#24440](https://github.com/ggml-org/llama.cpp/issues/24440) — 在 Gemma 4 31B + MTP + `-sm tensor` 上编辑系统消息后出现相同致命错误。
- **[#26382](https://github.com/ggml-org/llama.cpp/issues/26382)** *(10)* — 无 V 模型(GLM-5.2)上,`-ctk q5_1` 不带 `-ctv` 被拒绝。
- **[#27756](https://github.com/ggml-org/llama.cpp/issues/27756)** *(6)* — Qwen3.5-hybrid 64 层在 130k 以上上下文静默即时 EOS(CUDA + CPU)。
- **[#28495](https://github.com/ggml-org/llama.cpp/issues/28495)** *(6)* — `--kv-unified` + `-np 2` 从第二个长请求开始使提示处理下降 42–54%。原因已定位:CUDA/HIP FA 掩码仅跳过 `KV_max` 尾部,而非内部全 `-INF` 块。
- **[#28497](https://github.com/ggml-org/llama.cpp/issues/28497)** *(3)* — qwen4exp QSA 索引器 top-k 在 CUDA 上非确定性(CUB `DeviceTopK` 处理平局分数)。
- **[#27634](https://github.com/ggml-org/llama.cpp/issues/27634)** *(5)* — Intel iGPU/i915 上的 Vulkan:内核看门狗静默取消已排队的提交;embeddings 折叠而无错误。
- **[#28160](https://github.com/ggml-org/llama.cpp/issues/28160)** *(4)* — 提交 `257813839` 之后,`--lazy-mode auto` 使 qwen4exp 在 Vulkan/AMD iGPU 上的 pp512 减半。
- **[#27734](https://github.com/ggml-org/llama.cpp/issues/27734)** *(3)* — Vulkan/RDNA3 上 131072 上下文处出现约 78% 解码吞吐悬崖;临时方案 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`。
- **[#26663](https://github.com/ggml-org/llama.cpp/issues/26663)** *(3)* — RX 9070 XT(gfx1201),hidden_size ≥ 4096:Vulkan 比 HIP 慢 5–7 倍,有效带宽约 100 GB/s。
- **[#27217](https://github.com/ggml-org/llama.cpp/issues/27217)** *(4)* — `tool_choice:"required"` 被接受但在 `supports_preserve_reasoning:true` 的模板上未强制执行。
- **[#28336](https://github.com/ggml-org/llama.cpp/issues/28336)** *(6)* — llama-server 浏览器 UI:SVG 图像似乎缺失部分内容(仅显示问题——复制/下载正常)。
- **[#27981](https://github.com/ggml-org/llama.cpp/issues/27981)** *(8)* — llama-ui 推理级别选择菜单在桌面上无法打开。

**已关闭(自动 stale)**

- **b8143 Vulkan/Mac x86 AMD 乱码** — [#20029](https://github.com/ggml-org/llama.cpp/issues/20029) — `b8142` 已知正常。
- **SYCL xe2 段错误** — [#25808](https://github.com/ggml-org/llama.cpp/issues/25808)。
- **Vulkan 分裂模式自 `74976e1` 起在混合 AMD/Intel 上的行回归** — [#25884](https://github.com/ggml-org/llama.cpp/issues/25884)。
- **Vulkan CoopMat2 SPIR-V cap 5432 构建失败** — [#25985](https://github.com/ggml-org/llama.cpp/issues/25985)。
- **Intel Battlemage Linux 上 Vulkan 单元测试不稳定** — [#25767](https://github.com/ggml-org/llama.cpp/issues/25767)。
- **SYCL 多 GPU GTT mirror 未计入 `VmRSS`** — [#22116](https://github.com/ggml-org/llama.cpp/issues/22116)。
- **Qwen3.6-35B-A3B 在约 80K 上下文出现 NaN logits** — [#23606](https://github.com/ggml-org/llama.cpp/issues/23606)。
- **qwen4exp 在 HIP/Strix Halo 上 1K+ 减速** — [#27856](https://github.com/ggml-org/llama.cpp/issues/27856)。
- **Windows OpenVINO 看不到 GPU** — [#26393](https://github.com/ggml-org/llama.cpp/issues/26393)。

## 6. 对应用开发者的意义

- **GDN 输出已变更(b10829)。** 若您为 Gated Delta Net 模型(例如 Qwen 风格的 hybrid)固定了 llama.cpp 版本,请重新计算所有缓存的参考输出;根号内的 "rsqrt(x²+ε)" 才是修正后的正确形式。
- **Qwen3.5/3.6 + MTP 仍不稳定。** 重复 token([#23577](https://github.com/ggml-org/llama.cpp/issues/23577))、130k+ 处的即时 EOS([#27756](https://github.com/ggml-org/llama.cpp/issues/27756)),以及系统提示编辑后的 `fattn.cu:579` 崩溃([#24440](https://github.com/ggml-org/llama.cpp/issues/

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

Ollama 摘要 — 2026-09-07

## 今日要点

今天的活动集中在 **MLX 运行器上下文处理** 与 **OpenAI 兼容性对齐** 上。一系列相关 PR（#18261、#18263、#18285、#18258）细化了 `num_ctx` 如何从调度器流入 MLX 子进程，而 OpenAI 兼容端点则被发现存在静默丢弃 `num_ctx`（#16825）以及 Modelfile 中定义的 `temperature`（#17744）的问题。上游方面，llama.cpp 已升级至 b10829，主要为了落地 **Spark X2.5 架构支持**（#18279）。

## 发布与破坏性变更

过去 24 小时内无新发布。

## 新模型与硬件支持

- **Spark X2.5 架构（SparkLLM/Spark-X2.5-4B / -1.7B）** —— 通过 llama.cpp 升级 b10760 → b10829 引入 `spark2_5`（[PR #18279](https://github.com/ollama/ollama/pull/18279)，跟踪 [Issue #18195](https://github.com/ollama/ollama/issues/18195)）。合并后，`ollama run SparkLLM/Spark-X2.5-4B` 应从"能下载但无法启动推理"变为真正可对外服务。
- **Hy4（Tencent 预览）** —— 社区请求原生 Ollama 支持（[Issue #18287](https://github.com/ollama/ollama/issues/18287)）；等待维护者跟进。
- **AMD iGPU 上的 Vulkan 后端** —— [Issue #18272](https://github.com/ollama/ollama/issues/18272) 报告了一个回归：在 v0.32.9 上能正常加载的模型，在 v0.32.12 及更高版本上使用 Vulkan 跑 AMD iGPU（66 GB 模型 + Winux 11.26.03.1）时失败，提示 `Not enough memory for command submission`。CUDA 路径不受影响。

## 性能与优化

- **MLX 前缀缓存恢复的截断** —— [Issue #18267](https://github.com/ollama/ollama/issues/18267) 给出一个固定的损耗量化：MLX 运行器总是把前缀恢复对齐到匹配前缀下方 8192 的整数倍，导致 agent 工作负载（Claude Code 对接本地模型）中**每次冷提示都要付出 17–27 秒的 re-prefill 代价**。尚无修复 PR；今日的 MLX PR 仅处理上下文大小，未涉及缓存对齐。
- **MLX 运行器：强制请求的上下文长度** —— [PR #18261](https://github.com/ollama/ollama/pull/18261)（现已关闭、被取代）将调度器的 `num_ctx` 接入 MLX 子进程，并把生效后的上限回报给 `/api/ps`。
- **MLX 运行器：显式 vs. 软上下文** —— [PR #18285](https://github.com/ollama/ollama/pull/18285) 保留现有的自动 `softContextLength`（用于 VRAM 估算），仅将显式 `num_ctx` 作为通过 `--ctx-size` 传入的硬上限。
- **MLX 运行器：Qwen 静态 YaRN 上下文** —— [PR #18263](https://github.com/ollama/ollama/pull/18263) 从当前 RoPE 配置解析 YaRN 元数据，并将频率/缩放应用到文本 RoPE 和多模态 M-RoPE，从而支持最高 `factor * original_max_position_embeddings` 的上下文。
- **Qwen Code 上下文对齐** —— [PR #18258](https://github.com/ollama/ollama/pull/18258) 让 Qwen Code CLI 的 `generationConfig.contextWindow` 跟踪 Ollama 的本地生效上下文（通过仅加载模型 + `/api/ps` 解析得到），不再靠猜测。
- **传输路径：完成已经是完整 blob 的 `.tmp`** —— [PR #18280](https://github.com/ollama/ollama/pull/18280) 收尾了 [Issue #15320](https://github.com/ollama/ollama/issues/15320) 的剩余边界情况：当 `.tmp` 大小已经等于期望大小时，直接提升为最终 blob 路径，而不是重新请求。

## 稳定性与回归

**高严重度（崩溃 / 数据面故障）**

- **Blackwell sm_120 flash-attention 崩溃** —— [Issue #18276](https://github.com/ollama/ollama/issues/18276)：在 RTX 5070 Ti Laptop 上，`ollama run qwen3-coder:30b` 在自动启用的 flash-attention 预热之后退出，错误码为 `0xc0000409`（`CUDA error: shared object initialization failed`）。显存适配成功，49 层全部加载——失败发生在内核初始化阶段。尚无修复 PR。
- **Vulkan AMD iGPU 回归（自 v0.32.12 起）** —— [Issue #18272](https://github.com/ollama/ollama/issues/18272)。变通做法：在受影响的系统上锁定 v0.32.9。
- **MLX NVFP4 "Stopping…" 死锁** —— [Issue #18269](https://github.com/ollama/ollama/issues/18269)：在 M4 Air 32 GB 上，`muse-glimmer:30b-mlx`（NVFP4，摘要 `015fa21845be`）反复进入持续的 `Stopping…` 状态，并触发 watchdog 重启。

**中严重度（正确性 / 算力浪费）**

- **gemma4 工具调用解析器无法解析 + 退化循环** —— [Issue #18275](https://github.com/ollama/ollama/issues/18275)：`gemma4:12b` 的 `BEGIN_ARG`/`END_ARG` 语法无法被修复为 JSON；修复失败后，模型持续吐出格式异常的 `<|channel>thought` 块直到 token 上限，并返回 HTTP 200 但无任何可用内容。影响 agent 模式用例（Continue.dev）。
- **OpenAI 兼容 `/v1/responses` 拒绝 `agent_message`** —— [Issue #18286](https://github.com/ollama/ollama/issues/18286)：`"type": "agent_message"` 的输入项返回 `400 invalid_request_error: unknown input item type`。导致 Codex CLI 多 agent 流程中断。
- **OpenAI 兼容 `/v1/responses` 丢失工具 `namespace`** —— [Issue #18284](https://github.com/ollama/ollama/issues/18284)（现已关闭，issue 一侧未合并）—— 返回的 `function_call` 项中，namespace 被合并进 `name`。

**低严重度（UX / 可观测性）**

- **MLX 编译缓存 CHECK 刷屏（非 MLX 硬件）** —— [Issue #18283](https://github.com/ollama/ollama/issues/18283)：在没有 CUDA / Apple Silicon 的 Windows 上，每次执行 `ollama` 在任何输出之前都会打印 `ERROR ... CHECK failed: mlx_compile_cache_new_`。
- **80 字符的模型名限制对长 HF 仓库名过短** —— [Issue #18274](https://github.com/ollama/ollama/issues/18274)；[PR #18278](https://github.com/ollama/ollama/pull/18278) 将模型分段上限提升至 96，对齐 HuggingFace 的 `repo_name` 规范。
- **Modelfile `PARAMETER temperature 0` 在 `/v1/chat/completions` 上被忽略** —— [Issue #17744](https://github.com/ollama/ollama/issues/17744)：当请求省略 `temperature` 时，manifest 值被服务端默认值覆盖；`/api/chat` 是正常生效的。
- **OpenAI 兼容请求忽略 `num_ctx`** —— [Issue #16814](https://github.com/ollama/ollama/issues/16814)（已关闭）—— [PR #16825](https://github.com/ollama/ollama/pull/16825) 通过把 `num_ctx` 转发到 `options` 修复此问题。
- **不可能的上下文触发的调度器淘汰循环** —— [Issue #18282](https://github.com/ollama/ollama/issues/18282)（已关闭）—— 例如 manifest 请求 `num_ctx 262144` 时，调度器会反复淘汰、重新加载、再淘汰，而不是快速报错。

## 对应用开发者意味着什么

- **OpenAI 兼容性正在被积极推进，但仍存在若干缺口。** 目前应把 `/v1/chat/completions` 与 `/v1/responses` 视作 OpenAI 接口的*部分*实现：`num_ctx` 被静默忽略（[#16825](https://github.com/ollama/ollama/pull/16825) 正在修复中），请求省略 `temperature` 时 Modelfile 中的 `temperature` 被忽略，`agent_message` 输入项被拒绝，带 namespace 的工具在返回时丢失 `namespace`。若要确定性行为，优先使用原生 `/api/chat`，或在请求中显式设置相关参数。
- **MLX 上的 agent 工作负载每次冷提示都要付出固定 ~17–27 秒代价**，原因是前缀缓存会按 8192 的整数倍截断。如果你正在 agent 循环（Claude Code、Continue.dev 等）中调用 MLX，请为此预留时间预算或预先预热。
- **Blackwell 笔记本（sm_120）上 Qwen3-coder 同级模型目前在 flash attention 自动启用时的预热阶段崩溃。** 如果你的目标平台是 RTX 50 系列移动版，请先在你的目标模型上跑通验证再发布。
- **AMD iGPU 的 Vulkan 用户应将 Ollama 锁定在 ≤ v0.32.9**，直至 [#18272](https://github.com/ollama/ollama/issues/18272) 解决；CUDA 路径不受影响。
- **名字很长的 HuggingFace 模型在 [#18278](https://github.com/ollama/ollama/pull/18278) 合入后将能顺利拉取。** 如果你整理的模型带较长仓库名（例如 `hf.co/DavidAU/...`），这会很有用。
- **Ollama Cloud 的 prompt-cache 支持**（[Issue #16714](https://github.com/ollama/ollama/issues/16714)）仍是付费用户视角下获得票数最多的功能请求；如果在评估 Ollama Cloud 用于 agent 类负载，值得持续跟踪。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-07

## 今日要点
活动主要集中在 `/v1/responses` 生命周期修复（MCP 自动执行流式传输、客户端断开后的后台轮询、流式响应上的容器所有权）以及 Bedrock/Anthropic 桥接回归，这些回归会剥离或泄露特定于提供商的参数。一个持续存在的内存泄漏报告（#38193）仍未关闭，几个新提供商（OpenCode Zen/Go、API Route、Z.AI 原生透传、Jalapeno）通过轻量级 PR 落地。

## 发布与破坏性变更
过去 24 小时内无新发布。v1.99.0（在 #39145 中引用，用于 `prompt_cache_key` 修复）和 v1.99.1（在 #39310 中引用，用于 Z.AI UI 渲染）是最近的标签版本。

## 新模型与硬件支持
- **OpenCode Zen 与 Go 提供商**，需要 `x-opencode-session` 请求头（[#39549](https://github.com/BerriAI/litellm/pull/39549)）
- **API Route** 作为 OpenAI 兼容提供商添加（[#40024](https://github.com/BerriAI/litellm/pull/40024)）
- **Z.AI（智谱）原生 Anthropic Messages + OpenAI Responses 透传**，保留 thinking 签名和原生 Responses 协议语义（[#40106](https://github.com/BerriAI/litellm/pull/40106)）
- **Jalapeno Cloud** 提供商，支持 chat/completions、Responses 和 Messages（[#40101](https://github.com/BerriAI/litellm/pull/40101)）
- **模型注册表刷新**：xAI Imagine 视频、Gemini Live 2.5 卡片、lyria-3.5、Voyage、ChatGPT GPT-5.5/5.6、Vertex Haiku 4.5、Bedrock Mantle、Scaleway 日期、`computer-use-preview` 弃用（[#31884](https://github.com/BerriAI/litellm/pull/31884)）
- **DashScope/Qwen**：区分显式与隐式缓存计费模式（[#40111](https://github.com/BerriAI/litellm/pull/40111)）

## 性能与优化
- **滚动模型定价修正**，使成本/适配器读取与提供商文档对齐（xAI、Gemini Live、Voyage、Vertex Haiku 4.5、Bedrock Mantle）（[#31884](https://github.com/BerriAI/litellm/pull/31884)）
- **后台轮询在客户端断开后仍可存活** for `/v1/responses`（`background: true` + `polling_via_cache`）— 修复静默空输出补全（[#40114](https://github.com/BerriAI/litellm/pull/40114)）
- **跨 MCP 自动执行轮次的单一生命周期** — 折叠两流发出，修复了在 `responses.stream()` 中出现 `AssertionError` 的 OpenAI SDK（[#40121](https://github.com/BerriAI/litellm/pull/40121)）
- **按请求的 `SERVER_ROOT_PATHS`** 替换单一标量 `SERVER_ROOT_PATH`，使一个部署能够为多个客户端可见的 URL 前缀提供服务而不会出现 404（[#35935](https://github.com/BerriAI/litellm/pull/35935)）
- **操作系统 CA 存储 + `SSL_CERT_DIR` 信任** 补充 certifi — 修复通过 `update-ca-certificates` 安装的企业 CA 的 TLS（[#40113](https://github.com/BerriAI/litellm/pull/40113)）

## 稳定性与回归

**高严重性**
- **无界内存增长，OOM 重启后无回收**（[#38193](https://github.com/BerriAI/litellm/issues/38193)）— WSS 从约 23 GiB 攀升到 OOM，重启时下降，然后再次攀升。未关联修复 PR。在解决之前，生产部署应监控 RSS 并主动重启。
- **未知终端用户的并发首请求绕过 `max_end_user_budget_id`**（[#40095](https://github.com/BerriAI/litellm/issues/40095)）— `custom_auth_run_common_checks` 路径中存在竞态；预算强制执行被静默跳过。
- **流式 `/v1/responses` SpendLog 崩溃** — `'dict' object has no attribute 'usage'` → 未写入 `LiteLLM_SpendLogs` 行，请求未计费（[#29913](https://github.com/BerriAI/litellm/issues/29913)）。长期存在的 bug；未关联 PR。

**中严重性**
- **`HiddenParamsAsyncIteratorWrapper` 回归** — `completed_response` 未传播，流式 Responses 上跳过容器所有权记录（[#40120](https://github.com/BerriAI/litellm/issues/40120)）。与 #30210/#30213 同类回归。
- **Bedrock `invoke` 转换将 LiteLLM 内部 `optional_params`** 泄露到上游请求体 — Converse 已过滤它们（[#30371](https://github.com/BerriAI/litellm/issues/30371)）。
- **Bedrock Converse 对 Qwen3（即任何非 Anthropic / 非 Nova2 / 非 gpt-oss 系列）静默丢弃 `reasoning_effort`**（[#34105](https://github.com/BerriAI/litellm/issues/34105)）。
- **Anthropic `/v1/messages` → Responses 桥接丢弃 OpenAI 推理模型提示缓存**（`encrypted_content` 未传递，即使在 #37953 之后）（[#39339](https://github.com/BerriAI/litellm/issues/39339)）。
- **`cache_control_injection_points` 是无操作**，并在服务 `/v1/responses` 时触发确定性的 Claude 工具调用循环（[#29810](https://github.com/BerriAI/litellm/issues/29810)）。
- **Anthropic → chat/completions 桥接在重新合并路径上保留诊断信息**；修复 PR #40110 已开启。
- **Bedrock 自适应思考能力查找对不透明模型 ID 失败** — 必须通过 `base_model` 解析；修复 PR #40109 已开启。
- **`stream_options` 泄露到非流式请求 → 来自 vLLM 的 400**（[#29431](https://github.com/BerriAI/litellm/issues/29431)）。
- **Headroom CCR 流式转换在 `stream=false` 后保留 `stream_options`** → DeepSeek 400（[#40068](https://github.com/BerriAI/litellm/issues/40068)）。
- **`/v1/images/edits` 带蒙版时抛出流式读取错误**（[#26552](https://github.com/BerriAI/litellm/issues/26552)）。
- **MCP 服务器（openapi 规范）健康检查报告"不健康"**（[#40079](https://github.com/BerriAI/litellm/issues/40079)）。

**低严重性 / 已关闭**
- MCP OAuth2 返回 500 而不是 401+WWW-Authenticate（[#29261](https://github.com/BerriAI/litellm/issues/29261)）— 已关闭。
- 防护栏策略未从配置持久化（[#29416](https://github.com/BerriAI/litellm/issues/29416)）— 已关闭。
- MCP 服务器 `credentials.auth_value` 未在 POST 时持久化（[#29408](https://github.com/BerriAI/litellm/issues/29408)）— 已关闭。
- `openrouter/openai/gpt-5.6-sol` 在定价 JSON 中缺失（[#40102](https://github.com/BerriAI/litellm/issues/40102)）— 开启中，单行注册表修复。
- 内部用户 `max_budget` 阻止零成本模型（忽略 `skip_budget_checks`）（[#29912](https://github.com/BerriAI/litellm/issues/29912)）— 开启中。
- 请求日志日期范围筛选器将选择器本地时间解释为 UTC（[#39979](https://github.com/BerriAI/litellm/issues/39979)）— 开启中。
- 虚拟密钥模型别名创建后无法编辑（[#28164](https://github.com/BerriAI/litellm/issues/28164)）— 开启中。

## 对应用程序开发者的意义
- **将 `/v1/responses` + MCP 视为预稳定。** 如果你通过 Responses 界面自动执行 MCP 工具，请暂停升级或固定到某个提交，直到 #40121 和 `HiddenParamsAsyncIteratorWrapper` 回归（#40120）进入发布版本 — 否则你可能会面临 OpenAI SDK 的 `AssertionError`、损坏的提示缓存传递（#39339）或未计费的流式请求（#29913）。
- **多租户代理上的预算控制存在竞态。** 来自新终端用户的并发首请求可能绕过 `max_end_user_budget_id`（#40095），且流式 Responses 可能永远不会写入 `LiteLLM_SpendLogs`（#29913）。如果你按 token 数计费，请将支出与提供商使用日志进行对账。
- **监控代理 RSS。** #38193 泄漏尚无修复 — 配置外部重启和告警，特别是在长期运行的部署上。
- **Bedrock 路由不均匀。** 如果你混合使用 Qwen3、Mantle 或其他非 Anthropic Bedrock 模型，预计 `reasoning_effort` 会被静默丢弃（#34105），并且内部 `optional_params` 可能泄露到线协议请求体中（#30371）。请通过提供商端请求日志进行验证，而不仅仅是 LiteLLM 日志。
- **新提供商已就位：** OpenCode（Zen/Go）、API Route、Jalapeno 和原生 Z.AI 透传今天都已接入。如果你维护多提供商网关，这是在下一个标签版本发布前测试路由和成本跟踪的良好窗口。
- **安全加固即将落地。** `disable_env_credential_login` 设置（#40116）以及更广泛的从 master-key-as-UI-password 模式的迁移（#29435）值得在 SSO/Entra 推出时关注。
- **Request Logs UI 中的时区 bug**（#39979）会在你不在 UTC 时静默移动你的审计窗口 — 在修复发布前，任何基于日志的告警都需要考虑这一点。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-07

## 1. 今日要点

今日的头条工作集中在 Unsloth Studio 的运行时与服务层：KV 缓存抢占被下放给具备槽位驻留（slot-parking）能力的 `llama-server`（[PR #10358](https://github.com/unslothai/unsloth/pull/10358)），而 OpenAI 兼容的流式接口现在通过可选的 `X-Unsloth-Events` 请求头来开关 Studio 自有的 UI 控制帧（[PR #10362](https://github.com/unslothai/unsloth/pull/10362)）——这两项都会影响客户端兼容性。平台侧方面，Apple Silicon 获得了一组连贯的修复（tokenizers 版本钉住、MLX 内存估算、`--no-torch` 自愈），同时 Studio 也为共享安装引入了按账号隔离（[PR #10375](https://github.com/unslothai/unsloth/pull/10375)）。

## 2. 发布与破坏性变更

过去 24 小时内无新版本发布。请下游 OpenAI 客户端留意以下**正在生效的行为变更**：

- **OpenAI 流式控制帧改为可选开启**（[PR #10362](https://github.com/unslothai/unsloth/pull/10362)）：`/v1/chat/completions` SSE 上的 `tool_start`、`tool_end`、`tool_output`、`tool_args`、`tool_status`、`reasoning_summary` 和 `diffusion_frame` 帧将不再对客户端可见，除非客户端主动发送 `X-Unsloth-Events: 1`。此前因这些帧而中断的严格 schema 校验器将开始通过；依赖解析这些帧的客户端必须显式开启。

## 3. 新模型与硬件支持

- **Gemma 4 基础模型分词器修复**（[PR #10312](https://github.com/unslothai/unsloth/pull/10312)）：在加载时强制为 E2B、E4B、31B 和 26B-A4B Gemma 4 基础模型系列（包括 `-unsloth-bnb-4bit` 变体）设置 `add_bos_token=True`。没有 BOS token，模型会退化为重复文本——这是基础模型可用推理的必需条件。关闭 [#7903](https://github.com/unslothai/unsloth/issues/7903)。
- **Apple Silicon / MLX 覆盖范围扩大**（[PR #10287](https://github.com/unslothai/unsloth/pull/10287)）：加载模型（Load Model）内存面板现在通过专用的内存规划器为 MLX 加载定价，并将其路由到 Apple Silicon 主机；GGUF 仍使用现有规划器。此前非 GGUF 主机只会返回 `not_gguf` 而没有任何数值。
- **AMD/ROCm 融合注意力缺口暴露**（[Issue #10415](https://github.com/unslothai/unsloth/issues/10415)）：RX 9060 XT 上的 Wan2.2 TI2V 回退到 SDPA 数学实现，在一类没有可用融合 kernel 的视频工作负载上发生 OOM。尚无修复 PR——任何 AMD 视频管线工作都值得关注。
- **Intel Arc 在导入时仍然报错**（[Issue #3533](https://github.com/unslothai/unsloth/issues/3533)）：`unsloth_zoo/temporary_patches/gpt_oss.py:540` 中调用 `torch.xpu.memory.mem_get_info()`，而 Intel Arc 并未暴露该接口，属于长期遗留缺陷。尚无 PR。

## 4. 性能与优化

- **KV 抢占迁移到服务端**（[PR #10358](https://github.com/unslothai/unsloth/pull/10358)，叠加于 [#10301](https://github.com/unslothai/unsloth/pull/10301) 之上，配合 `unslothai/llama.cpp#184` 与 `#190`）：当启动的 `llama-server` 支持 `--preempt-ram` 时，Studio 让出自己的抢占逻辑，使每次对话都能使用完整上下文，而不再受 Studio 中途驱逐策略影响。本质上是用一个常驻服务端的每槽位驻留原语，替代了原先固定在 Studio 侧的抢占步骤。
- **MLX 内存估算**（[PR #10287](https://github.com/unslothai/unsloth/pull/10287)）：在 Apple Silicon 上以真实的服务端规划器取代前端的启发式判定；现在上下文会按可用内存来适配，而不是靠猜。
- **请求投机解码接受率指标**（[Issue #10401](https://github.com/unslothai/unsloth/issues/10401)）：目前无法在部署前衡量草稿模型是否值得上线；唯一的信号是部署后的 tokens/sec。提议以草稿模型相对于目标模型的接受率作为决策指标。
- **取消场景下的迟响应丢弃**（[PR #10388](https://github.com/unslothai/unsloth/pull/10388)）：修复了 `_direct_reader` 中的邮箱竞态——已释放请求的响应在取消后仍可能被转发到当前请求中。

## 5. 稳定性与回归

按可能的影响半径排序：

| 严重程度 | Issue | 状态 |
|----------|-------|------|
| High | [#10415](https://github.com/unslothai/unsloth/issues/10415) AMD ROCm Wan2.2 TI2V OOM，RX 9060 XT 无可用融合注意力 kernel | 无修复 PR |
| High | [#10389](https://github.com/unslothai/unsloth/issues/10389) qwen3.6 35B A3B MLX API 请求在 base64 和 URL 输入下均失败 | 无修复 PR |
| High | [#10341](https://github.com/unslothai/unsloth/issues/10341) ROCm/AMD 上未勾选 "No RAM Offload" 仍会将模型卸载到 RAM | 无修复 PR |
| High | [#7203](https://github.com/unslothai/unsloth/issues/7203) qwen3.5 9b 始终无法完成第一步；Gemma 4 26B A4B 在 96 GB 上 QLoRA batch=1 即 OOM | 无修复 PR |
| High | [#3533](https://github.com/unslothai/unsloth/issues/3533) Unsloth 在 Intel Arc B580 上导入失败（torch.xpu API 缺失） | 无修复 PR |
| Medium | [#10355](https://github.com/unslothai/unsloth/issues/10355) 加载器忽略 `--tensor-split` | 无修复 PR |
| Medium | [#10385](https://github.com/unslothai/unsloth/issues/10385) `orcarouter/Qwen3.8-27B-Uncensored-MLX` 在 macOS 27 上分词器崩溃 | 无修复 PR |
| Medium | [#10390](https://github.com/unslothai/unsloth/issues/10390) Studio 空闲时持续占用 CPU | 无修复 PR |
| Medium | [#10400](https://github.com/unslothai/unsloth/issues/10400) 工具链发送空 bearer 时免密钥认证失败 | 无修复 PR |
| Medium | [#10411](https://github.com/unslothai/unsloth/issues/10411) 238 字符 API key 触发 `RSAES-OAEP: input message length is too long` | 无修复 PR |
| Medium | [#10436](https://github.com/unslothai/unsloth/issues/10436) "Tell the model today's date" 覆盖 Ollama Modelfile 中的 `SYSTEM` 提示词 | 无修复 PR |
| Medium | [#10397](https://github.com/unslothai/unsloth/issues/10397) 命令级别 SSH 被阻止，但通过 Paramiko / Python 库仍可访问 | 无修复 PR |
| Medium | [#10300](https://github.com/unslothai/unsloth/issues/10300) 工作区源文件（.cs/.php/.js）经 [#8843](https://github.com/unslothai/unsloth/issues/8843) 修复后仍不可读/写/索引 | 无修复 PR |
| Low | [#10227](https://github.com/unslothai/unsloth/issues/10227) 通过 API 自动加载时，自定义模型设置（上下文长度、KV cache 量化）被忽略 | **已关闭**（未关联 PR） |
| Low | [#10428](https://github.com/unslothai/unsloth/issues/10428) 停止 / 重载模型时提示词队列被清空 | 无修复 PR |
| Low | [#10425](https://github.com/unslothai/unsloth/issues/10425) 代码工具输出文件被折叠在工具卡内不可见 | 无修复 PR |
| Low | [#10109](https://github.com/unslothai/unsloth/issues/10109) Deep Research 硬编码为 `127.0.0.1` | 无修复 PR |
| Low | [#10299](https://github.com/unslothai/unsloth/issues/10299) 图像菜单仅显示 Create，即便在支持 ImageToImage 的模型上也如此 | **已关闭** |
| Low | [#9519](https://github.com/unslothai/unsloth/issues/9519) API 与设置中出现重复的远程 / 局域网访问入口 | 无修复 PR |

值得关注的**已落地修复**可缓解现有问题：

- [#10431](https://github.com/unslothai/unsloth/pull/10431) 在 macOS arm64 上将 `tokenizers` 钉在与 `transformers` 兼容的版本范围内，以保证 Train/Export 可导入。
- [#10409](https://github.com/unslothai/unsloth/pull/10409) 阻止运行时在 `--no-torch` 的 Apple Silicon 安装中重装 MLX。
- [#10433](https://github.com/unslothai/unsloth/issues/10433) / [#10434](https://github.com/unslothai/unsloth/issues/10434) 暴露了 Studio 安装器 `_select_torchcodec_spec` 的真实缺陷（torch 2.3/2.4 拿到了 torch-2.10 的 torchcodec 配置；cu128 虽 ABI 豁免却没有 0.12+ 版本）。预计将有后续 PR。
- [#10414](https://github.com/unslothai/unsloth/pull/10414) 将 notebook 校验器中 shell 读取逻辑从过大的 [#7474](https://github.com/unslothai/unsloth/pull/7474) 中拆出，并明确阐述 torch↔torchcodec 之间的契约。
- [#10370](https://github.com/unslothai/unsloth/pull/10370) 在安装日志中标注 llama.cpp 后端，并停止将 Windows ROCm torch 标记为 CPU——对调试 Strix Halo / Vulkan 发行包非常重要。

## 6. 对应用开发者的影响

- **为 OpenAI 流式变更做好准备。** 严格的 OpenAI 客户端（任何对 SSE payload 做 schema 校验的实现）在 [#10362](https://github.com/unslothai/unsloth/pull/10362) 合入后将恢复正常。此前在解析 Studio 的 `tool_*` 与 `reasoning_summary` 帧的客户端必须发送 `X-Unsloth-Events: 1` 才能继续看到这些帧。这对第三方工具链而言是一次静悄悄的兼容性胜利。
- **Gemma 4 基础推理需要即将到来的分词器修复。** 任何上线非 instruct 版 Gemma 4（E2B/E4B/31B/26B-A4B）的人都应锁定包含 [#10312](https://github.com/unslothai/unsloth/pull/10312) 的构建，否则将得到重复输出。
- **AMD ROCm 视频 / Intel Arc / 共享主机上的 Studio 用户面对的都是尚未修复的真实开放缺陷**——[#10415](https://github.com/unslothai/unsloth/issues/10415)、[#10341](https://github.com/unslothai/unsloth/issues/10341)、[#3533](https://github.com/unslothai/unsloth/issues/3533)、[#10397](https://github.com/unslothai/unsloth/issues/10397)。若在生产环境针对这些平台，建议跟踪 issue 并在修复落地前避免升级。
- **远程连接上的 Deep Research 硬上限为 16 384 tokens。** [#10254](https://github.com/unslothai/unsloth/pull/10254) 允许用户在已保存的连接上调高该上限，但尚非每模型字段——若应用串联 Deep Research 需特别留意。
- **Studio 共享安装获得按账号隔离**（[#10375](https://github.com/unslothai/unsloth/pull/10375)），同时**智能体轮次在关闭标签页后仍然持久化**（[#10365](https://github.com/unslothai/unsloth/pull/10365) + [#10406](https://github.com/unslothai/unsloth/pull/10406)）。这两项分别改变了多用户 Studio 主机的部署与 UX 故事，以及长时运行的工具循环——若有任何依赖当前共享状态模型的自定义工具，请审慎评估。
- **MLX 内存估算现在是真实计算，不再是猜测**（[#10287](https://github.com/unslothai/unsloth/pull/10287)）。PR 合入后，Apple Silicon 部署应重新核对加载时的内存预算。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-07

## 今日要点

针对本地 OpenAI 兼容端点新增的一条 Bug 报告（#1765）暴露出与企业/自托管推理服务器之间存在的真实互操作性缺口，而两个开放中的 PR 分别修复了编辑器侧的缺陷以及与 TypeScript 7 的前向兼容。过去 24 小时内无新版本发布，因此项目今天处于维护模式而非功能开发模式。

## 版本与破坏性变更

*过去 24 小时内无新版本发布。*

## 新模型与硬件支持

*今日无新增模型、后端（CUDA/ROCm/Metal/CPU）或量化格式支持。*

## 性能与优化

*今日无性能或内核相关改动落地。*

## 稳定性与回归

- **[Issue #1765](https://github.com/musistudio/claude-code-router/issues/1765) — [OPEN] Problem with openai API endpoint**
  报告者（`purum-pum-pum`）描述称，CCR 在对接承载本地模型（Deepseek、Gemma）的企业级 OpenAI 兼容端点时失败，但 Open WebUI 和裸 `curl` 调用却能正常工作。CCR 已在 DeepInfra 上验证可用，由此将问题隔离到该企业内部端点。**严重程度：中-高** — 这会影响到通过私有 LLM 网关路由 Claude Code 的企业用户，而这正是 CCR 的核心使用场景。尚未关联修复 PR。

- **[PR #1763](https://github.com/musistudio/claude-code-router/pull/1763) — [OPEN] fix: provider model list not loading when editing a Claude Code provider**
  作者 `diogomcd` 修复了一个 UX 正确性 Bug：在*创建* Claude Code 本地代理 provider 时模型列表可以正常加载，但*编辑*该 provider 时却返回空值。其根因被描述为两个缺陷叠加。**严重程度：中**（面向操作人员，不会损坏数据）。修复正在评审中，尚未合并。

- **[PR #1764](https://github.com/musistudio/claude-code-router/pull/1764) — [OPEN] chore(tsconfig): drop baseUrl so the configs survive TypeScript 7**
  作者 `ntdatt812` 指出 `baseUrl` 在 TS 6 中已弃用，并将在 TS 7 中停止生效。仓库当前将 `typescript@5.9.3` 钉死，因此 CI 表现正常，但使用较新 TS 工具链的编辑器会抛出错误。**严重程度：低** — 仅影响开发工具链，无运行时影响。该 PR 同时补充了 `ignoreDeprecations: "6.0"` 的相关指引。

## 对应用开发者的意义

- **在生产环境中依赖 CCR 之前，请先验证你的上游端点。** 如果你正通过自托管的 OpenAI 兼容 API（vLLM、LiteLLM、TGI，或承载 Deepseek/Gemma 的内部网关）进行代理，请立即通过 CCR 走通完整的请求链路。Issue [#1765](https://github.com/musistudio/claude-code-router/issues/1765) 表明 CCR 在某些方面比规范更严格或存在偏离，导致即便 `curl` 成功的情况下，仍至少在一个企业端点上会失败 — 请订阅该 Issue，或以 [DeepInfra](https://deepinfra.com) 作为已知可用的参照端点进行测试。
- **在 PR #1763 合并之前，请避免编辑已存在的 Claude Code provider。** 若你需要修改本地代理 provider 上的模型选择，当前重新创建比直接编辑更稳妥。
- **若你计划 fork 或扩展 CCR，请关注 TypeScript 7 的兼容性。** PR [#1764](https://github.com/musistudio/claude-code-router/pull/1764) 是一项低风险但具有前瞻性的清理工作；尽早合并它将为后续运行现代 TS 工具链的用户避免一次嘈杂的升级。
- **运行时行为无需任何处理** — 今日无破坏性变更或性能波动。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 日报 — 2026-09-07

**仓库：**[farion1231/cc-switch](https://github.com/farion1231/cc-switch) · 过去 24 小时内有 48 个 issue 和 56 个 PR 处于活跃状态

---

## 1. 今日亮点

过去 24 小时内没有新版本发布，今天的活动全部集中在 PR 与 issue 的分类处理上。正在进行的重头工作包括：针对单个提供商的**多 API key 支持**（[#7188](https://github.com/farion1231/cc-switch/pull/7188)，取代已关闭的 [#7186](https://github.com/farion1231/cc-switch/pull/7186)）、**面向 Codex 的 GitHub Copilot 托管账户**及基于能力的 Responses/Chat 路由（[#7157](https://github.com/farion1231/cc-switch/pull/7157)），以及覆盖全部七个受支持应用的 **Qwen 3.8 模型更新与 DashScope→QianwenAI/QwenCloud 品牌重塑**（[#7183](https://github.com/farion1231/cc-switch/pull/7183)）。长期跟进的“新 CLI 工具”跟踪帖（[#1855](https://github.com/farion1231/cc-switch/issues/1855)，199 条评论）仍是项目里最热闹的话题，而波及面很广的 `settings.json` 全量重写 bug（[#3631](https://github.com/farion1231/cc-switch/issues/3631)，7 👍）已被关闭。

## 2. 版本发布与破坏性变更

过去 24 小时内没有任何发布。面向未来的兼容性提示：仓库锁定了 `typescript@5.9.2`，而 [#7193](https://github.com/farion1231/cc-switch/pull/7193) 移除了已弃用的 tsconfig 选项 `baseUrl`，抢在 TypeScript 7 让运行新版编译器的编辑器直接构建失败之前处理掉。

## 3. 新模型与硬件支持

- **Qwen 3.8 一代**已并入 Claude Code、Claude Desktop、Codex、Hermes、OpenClaw、OpenCode 和 Pi 的预设；国内 DashScope（百炼）预设更名为 **QianwenAI**，并新增 QwenCloud 预设（[#7183](https://github.com/farion1231/cc-switch/pull/7183)）。
- **GitHub Copilot 作为 Codex 的托管账户提供商**：Codex 客户端始终访问本地 Responses 入口；代理依据模型的 `supported_endpoints` 和上游格式选择以 Responses 还是 Chat Completions 方式转发，并处理认证与响应适配（[#7157](https://github.com/farion1231/cc-switch/pull/7157)）。
- 面向六款应用的 **Token Market 内置预设** —— Claude 系应用使用 Anthropic Messages，Codex 使用原生 OpenAI Responses，OpenCode/OpenClaw/Hermes 使用 OpenAI 兼容 chat 接口（[#7184](https://github.com/farion1231/cc-switch/pull/7184)）。
- **DeepSeek Harness (DSH)** 新增为一等应用类型：`DSH_HOME`/`~/.dsh` 路径解析、`settings.yaml` 提供商写入器（[#6526](https://github.com/farion1231/cc-switch/pull/6526)），以及针对其 zstd 压缩 JSONL 会话用量台账的导入器（[#6724](https://github.com/farion1231/cc-switch/pull/6724)）。
- GPT-6 使用问题已解决/关闭（[#7129](https://github.com/farion1231/cc-switch/issues/7129)）。仍处于开放状态的需求：Antigravity（[#7171](https://github.com/farion1231/cc-switch/issues/7171)）、Cursor（[#2242](https://github.com/farion1231/cc-switch/issues/2242)）、统一路由代理（[#7146](https://github.com/farion1231/cc-switch/issues/7146)）。

## 4. 性能与优化

- 没有吞吐/延迟/内核层面的工作落地。值得关注的路由优化项是**分类器队列**（[#6602](https://github.com/farion1231/cc-switch/pull/6602)）：它将 Claude Code Auto Mode 在执行 Bash 前发起的安全分类器请求路由到一条专用提供商链，实现跨提供商的流量拆分（会话走提供商 A，分类器走提供商 B）——与同一提供商下的 `model` 字段覆盖（#4987/#6113）互为补充。
- 已知的延迟雷区（陈旧且未解决）：Claude Desktop → 阿里云百炼会在一个失效的 IPv6 NLB 地址上挂起 **~150s**，原因是代理缺少 happy-eyeballs 回退机制（[#5096](https://github.com/farion1231/cc-switch/issues/5096)）。

## 5. 稳定性与回归

按严重程度排序：

1. **DeepSeek 上的会话变砖** —— Codex 心跳自动化注入的 `function_call_output` 缺少 `call_id`；该线程上的每一个后续请求都会从 `api.deepseek.com/v1/responses` 收到 HTTP 400，且无法自愈。已在 v3.20.1 上复现。目前尚无修复 PR（[#6995](https://github.com/farion1231/cc-switch/issues/6995)，开放中）。
2. **Codex 2026.9.2 回归** —— 上游更新之后，一旦配额耗尽并切换到中转 API，模型选择便失效（[#7056](https://github.com/farion1231/cc-switch/issues/7056)，开放中）。
3. **Codex 会话中的陈旧认证绑定** —— 切换到第三方提供商后，旧账号时代的会话仍会持续调用 `api.openai.com` → 401，即便设置了 `preserveCodexOfficialAuthOnSwitch = true` 也无济于事（[#5672](https://github.com/farion1231/cc-switch/issues/5672)，开放中；与 [#6966](https://github.com/farion1231/cc-switch/issues/6966) 属同类问题）。一项针对悬空托管账户绑定的相关恢复修复已合并（[#7060](https://github.com/farion1231/cc-switch/pull/7060)）。
4. **DNS 覆盖副作用** —— 启用本地代理后，`api.deepseek.com` 会通过 DNS 缓存覆盖在系统范围内解析到 `127.0.0.1`；用户将其反馈为意外的劫持行为（[#7125](https://github.com/farion1231/cc-switch/issues/7125)，开放中）。
5. **OpenCodeGo 自 09/06 起的请求头回归** —— 部分缺少 `x-opencode-session` 的请求现在可能在上游失败（[#7088](https://github.com/farion1231/cc-switch/issues/7088)，开放中）。
6. **今日已关闭/已解决**：`settings.json` 全量重写抹掉 `enabledPlugins`/`statusLine`（[#3631](https://github.com/farion1231/cc-switch/issues/3631)）；WSL Pi “无模型”（[#7140](https://github.com/farion1231/cc-switch/issues/7140)）；经本地路由的图像生成 404（[#5429](https://github.com/farion1231/cc-switch/issues/5429)、[#6745](https://github.com/farion1231/cc-switch/issues/6745)）；Kimi `/responses` 400（[#6861](https://github.com/farion1231/cc-switch/issues/6861)）。
7. **已合并的修复**：`mask_url` 在截断边界遇到多字节 UTF-8 引发的 panic（[#6908](https://github.com/farion1231/cc-switch/pull/6908)）；workflow 的 `journal.jsonl` 污染 Claude 会话列表（[#6043](https://github.com/farion1231/cc-switch/pull/6043)）；更新器吞掉错误详情（[#6482](https://github.com/farion1231/cc-switch/pull/6482)）；测试在 Windows 上写入真实的 Claude Desktop 配置（[#6078](https://github.com/farion1231/cc-switch/pull/6078)）。待合并：可选启用的 Claude Code steer 校正器，在 Chat Completions 路由上将 `system` 转换为 `user`（[#7167](https://github.com/farion1231/cc-switch/pull/7167)，引用 #7166）。

## 6. 对应用开发者意味着什么

- **模型提供商配置正在从字符串变为 key 数组。**多 API key 支持（[#7188](https://github.com/farion1231/cc-switch/pull/7188)）新增了按 key 备注与单选激活，并兼容旧版字符串格式 —— 如果你的脚本依赖 CC Switch 的提供商配置，请规划好无需编辑配置即可完成的 key 轮换。
- **认证信息存在于会话中，而不只是配置里。**切换 Codex 提供商后请开启新会话；#7060 为悬空绑定加入了恢复机制，但切换前的线程仍可能 401（#5672、#6966）。
- **把上游 CLI 更新当作破坏性事件对待。**Codex 2026.9.2 弄坏了中转场景下的模型切换（#7056）；在 CI 中锁定版本，并在每次客户端更新后重新测试提供商切换。
- **在 #6995 修复之前，避免在 DeepSeek `/responses` 上使用心跳自动化** —— 单次心跳触发就会让线程永久变砖。
- **代理正在从端点映射演进为能力协商**（#7157 的 `supported_endpoints` 路由、#6602 的分类器队列）。不要假设是裸透传；请按提供商、按流量类别（会话 vs. 工具调用 vs. 安全分类器）校验 Responses 与 Chat 的语义差异。
- 在共享机器上**审计本地代理的波及范围**：系统级 DNS 覆盖（#7125）、双栈上游缺少 happy-eyeballs（#5096，~150s 挂起）、自签名 HTTPS 证书引发 502（#5042），这些都可能拖垮无关的工具。

---

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-07

## 今日要点

团队发布了 **v1.0.0-rc.34**，带来一次重要的安全升级：统一 OAuth（Telegram 已迁移）、TOTP/Passkey 互为备份因子、面向敏感操作（账户注销、密码修改、2FA 启用、渠道密钥查看）的限定范围一次性凭证，以及独立的审计日志。中继侧方面，两个计费正确性缺陷已具备待合并的 PR——`response.incomplete` 在 `/v1/responses` 流式接口上的零计费问题（#7241/#7242）以及图像缓存重复计费问题（#7229/#7230），同时还包含透传请求的渠道映射修复（#7249）与 Gemini 思考层级归一化（#7245）。

---

## 发布与破坏性变更

- **v1.0.0-rc.34** — 账户安全大扫除。要点如下：
  - 登录与敏感操作共用统一的验证流程。
  - 已注册的 TOTP 与 Passkey 互为备份因子。
  - 系统访问令牌新增查看/轮换/吊销能力以及访问历史记录。
  - 引入独立的审计日志。
  - 账户注销、绑定变更、密码修改、Passkey/2FA 启用、渠道密钥查看等操作，现均要求提供**与发起会话绑定的、限定范围的一次性凭证**。
  - **Telegram 登录已迁移至统一 OAuth**——管理员需在 BotFather Login Widget 中注册 `/oauth/telegram`，并配置 Client ID / Client Secret。现有 Telegram Login Widget 配置需要迁移。
- OpenAI/Anthropic/Gemini 中继路径未宣布协议层面的破坏性变更，但使用 Telegram 认证的部署在升级前应查阅 OAuth 迁移步骤。

---

## 新模型与硬件支持

- **阿里 Wan 3.0 一体化视频模型** — [#7240](https://github.com/QuantumNous/new-api/pull/7240)（经审核在 [#7244](https://github.com/QuantumNous/new-api/pull/7244) 中合并）新增了 Wan3 支持；[#7238](https://github.com/QuantumNous/new-api/issues/7238) 已提交但被标记为无效。#4078 此前已加入 Wan2.7 系列。
- **华为 MaaS 渠道** — [#7239](https://github.com/QuantumNous/new-api/pull/7239) 进行中（将关闭 [#7236](https://github.com/QuantumNous/new-api/issues/7236) 中的需求）。
- **Rerank 模型分类修复** — [#7181](https://github.com/QuantumNous/new-api/pull/7181) 在渠道测试时不再将 rerank 模型错误地归类为 embedding（关闭 [#7177](https://github.com/QuantumNous/new-api/issues/7177)；相关 [#5958](https://github.com/QuantumNous/new-api/issues/5958)）。

---

## 性能与优化

- **按渠道配置 TTFB 超时与自动回退** — [#7228](https://github.com/QuantumNous/new-api/pull/7228)。当上游已发送响应头但迟迟未输出首个数据分片时，请求不再等待完整的流式超时，而是在 TTFB 边界自动回退到其他渠道。具体阈值可在每个渠道上独立配置。
- **渠道 `model_mapping` 现已作用于透传请求体** —

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*