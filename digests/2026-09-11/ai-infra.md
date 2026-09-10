# AI 基础设施日报 2026-09-11

> 生成时间: 2026-09-10 23:30 UTC | 覆盖项目: 9 个

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

## 1. 生态总览

当前活动由全行业向**混合注意力架构**（线性/GDN + 稀疏索引器层）的迁移所主导：GLM-5.3-Flash、Qwen3.8-Flash-Next 以及即将发布的 DeepSeek V4.1 正在迫使堆栈的每一层——KV 池、radix 缓存、PD 分离、推测解码——都被重新设计。**DeepSeek V4.1 是近期最受期待的发布**，SGLang 正在开展协同的 day-0 准备，Ollama 和 LiteLLM 则在消费端各自布局。同时，整个生态系统最危险的失效模式已从崩溃转向**静默正确性损失**：随机 token、检查点权重丢失、KV 单元过期、计费漂移。llama.cpp 仍是迭代节奏最快的项目（24 小时内 10 个 tagged 构建），而网关层项目（LiteLLM、CC Switch、New API）正在积累协议适配层复杂度和运维债务。

## 2. 活跃度对比

| 项目 | Issues（摘要范围）* | PRs（摘要范围）* | 发布状态（24h） |
|---|---|---|---|
| **vLLM** | 28 | 14 | 无 |
| **SGLang** | 21 | 20 | 无（弃用 RFC 推进中） |
| **llama.cpp** | 19 | 22 | **10 个构建**（b10889–b10901） |
| **Ollama** | 16 | 16 | 无 tagged；llama.cpp b10864 + MLX bumps 已合并 |
| **LiteLLM** | 20 | 11 | **v1.100.1**（stable）+ **v1.101.0-rc.2** |
| **Unsloth** | 15 | 17 | 无 |
| **Claude Code Router** | 4 | 6 | **v3.1.0** |
| **CC Switch** | 37 | 32 | 无（在 `main` 上排队） |
| **New API** | 17 | 8 | 无 |

\* 每个项目摘要中涉及的独立 issue/PR 数；仅 CC Switch 公布了精确的范围计数（37/32）。CC Switch 和 llama.cpp 的 issue 覆盖面最广；vLLM 和 SGLang 的单项复杂度最高（多 GPU、多厂商复现矩阵）。

## 3. 模型支持竞赛

| 模型 | vLLM | SGLang | llama.cpp | Ollama | 网关 |
|---|---|---|---|---|---|
| **GLM-5.3-Flash**（320B 混合） | 紧急修复：CUDA IMA 崩溃，MXFP4 ROCm 修复进行中（#56176） | SM120 适配待定（#37813）；**检查点权重静默丢失 bug**（#38618） | **首个架构 PR** 已开启（#27773），文本+视觉 | 云端流式修复已发布（#18351） | — |
| **DeepSeek V4 / V4.1** | V4-Flash SM8x 请求 = 互动量最高的 open issue（#50576） | **Day-0 V4.1 准备**：6 个协同 PR（KV 池、HiCache、PD、Blackwell prefill） | — | V4.1-Flash 云端请求（#18360，27👍） | LiteLLM：Vertex DeepSeek OCR 适配器；定价过期（#37255）；CC Switch 目录修复 |
| **Qwen3.8-Flash-Next**（qwen4exp） | 推测解码 + 工具调用 bug 集群 | 循环状态的 PD 状态传递（#36651） | 增量 QSA 索引器缓存 PR（#28699） | qwen3-coder 解析器修复；H20 发布阻塞（#38793） | CC Switch 刷新 Qwen 3.8 预设 |
| 其他 | OmniLingual ASR 请求 | LLaDA-Image（扩散 T2I）、SenseNova-U1、MiniMax-H3、Kimi-K3 | Hexagon NPU、RDNA3.5、WinARM64 | DeepSeek/Gemma4 工具链 | Laonong API 预设（CC Switch）；Mistral Files/Batches（LiteLLM） |

**结论：** **llama.cpp 在架构首落地上领先**（GLM-5.3-Flash 和 qwen4exp 支持率先入树，并叠加最广泛的硬件后端工作）。**SGLang 在面向未来的数据中心服务上领先**——它是唯一开展 DeepSeek V4.1 预发布赋能的项目。vLLM 通常是节奏引领者，目前处于 GLM-5.3-Flash 的稳定化阶段，而非向外扩展前沿。

## 4. 性能前沿

- **KV 缓存与内存架构（SGLang 的强项）：** Full/SWA 池统一的共享字节预算、`kv-shard` 逻辑页系列、HiCache 物理包络修复；vLLM 以文件系统 KV 卸载和 KV 键分区一致性 RFC 反击；llama.cpp 消除了索引器 V-cache 分配（b10889）。
- **冷启动作为一等 SLO：** SGLang 的 Weight Cache Daemon 通过 CUDA-IPC 守护进程将 Qwen3-235B FP8 加载从 **306–327s 降至 <1s**——今日最大的数字。Ollama 正在调查自 0.23.4 以来的加载时间回退。
- **厂商特定内核：** vLLM — CUTLASS Lamport 融合 GEMM+AllReduce 提案（面向 SM100）、通过 gfx11 行步长填充实现 **+13% TTFT**；llama.cpp — **3–7× CPU k-quant mul_mat**、Vulkan `topk_moe` prefill 融合；Unsloth — **1.28× B200 LoRA step**（实验性）。
- **推测解码正确性：** vLLM 恢复了 MTP 下的 hybrid-GDN prefix-cache 命中率（挽回 30–40% 吞吐损失），并新增按 draft 长度划分的接受率直方图；llama.cpp 和 SGLang 仍有 MTP/DFlash 分歧相关的 open bug。
- **网关热路径：** LiteLLM 将支出跟踪卸载到 sidecar（曾是请求路径上的最大 CPU 开销）——说明路由层正在优化自身的 p99。

## 5. 层级定位

| 层级 | 项目 | 当日核心关注点 |
|---|---|---|
| **数据中心服务引擎** | vLLM、SGLang | 多 GPU/多厂商正确性、PD 分离、推测解码、量化内核（MXFP4/FP8/NVFP4） |
| **本地/边缘运行时** | llama.cpp（内核层）、Ollama（打包/GUI/云）、Unsloth Studio（本地 UX） | 硬件广度（Vulkan/PowerVR/Hexagon/MLX）、内存生命周期、消费级工具调用可靠性 |
| **网关 / 代理 / 路由** | LiteLLM（企业：认证、支出、路由、护栏）、New API（多供应商计费/渠道）、CC Switch 与 Claude Code Router（桌面协议适配层） | 协议转换保真度（Anthropic↔OpenAI↔Responses）、计费正确性、会话/配置持久化 |
| **训练 / 微调** | Unsloth | 单 GPU Blackwell LoRA 吞吐、MLX MoE 融合、离线/隔离网络工作流 |

一个值得注意的模糊地带：Ollama 现在桥接了本地与云（Cloud 流修复、DeepSeek-V4.1-Flash 请求）；Unsloth 通过其 API 暴露 Ollama 模型；CC Switch 的本地代理在上游 CLI 不处理的协议适配层做着实质工作。

## 6. 趋势信号

1. **混合注意力成为新的基线拓扑——并且它打破了缓存假设。** Radix-cache 语义、KV 池布局、draft-model 状态传递都在被重新设计（SGLang `kv-shard`、vLLM #52244、llama.cpp #28699）。预计将有 1–2 个季度的正确性尾段。
2. **静默损坏是全生态的最高严重性模式：** vLLM GlmMoeDsa 随机 token（#54300）、SGLang GLM-5.3 权重丢失（#38618）、Ollama 损坏的 q2_K 量化（#18252）、llama.cpp Vulkan KV 过期（#26744）、LiteLLM $0 支出行（#35691）。审计输出，而不仅是可用性。
3. **DeepSeek V4.1 将重置长上下文经济性。** SGLang 的 32 GiB prefill-workspace 边界加上 <1s 重载，落地时预示着成本/延迟的阶跃式变化。关注 vLLM 的回应。
4. **Ampere 舰队拒绝退场：** vLLM 上针对 DeepSeek-V4-Flash 的 SM8x 支持是互动量最高的 issue；Turing 相关问题仍在提交。厂商路线图与部署现实脱节。
5. **工具调用是跨层级战场：** Ollama 解析器修复、SGLang Kimi-K3 文法稀释、New API `input_json_delta` 截断、llama.cpp 500-on-malformed-JSON。防御性校验（解包 `"arguments"`/`"input"`、检查空 `tool_calls` + `done`）仍是必需。
6. **网关层债务正在演变为风险：** Ollama 积压 4 个月的 CVE（36 个漏洞）、Ollama FD 泄漏需定期重启、LiteLLM 跨三个独立 bug 的计费漂移、CC Switch 22 GB 数据库膨胀。请将网关视为具有真实 SLO 的生产基础设施。

**即时关注清单：** 固定 GLM-5.3-Flash 部署（vLLM 0.27.x 最安全）；在 H20 舰队上将 Qwen3.8-Flash-Next-FP8 暂缓；LiteLLM 升级后验证 Prometheus 抓取；不要将携带 `thinking` 历史的会话路由到 Responses-API 上游（CCR #1783）；预计未来数日内 SGLang 和 llama.cpp 将发布与 DeepSeek V4.1 相关的版本。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 项目摘要 — 2026-09-11

## 今日要点

重型工程活动继续围绕 **GLM-5.3-Flash** 集成展开（多项崩溃回归、新增 `Glm5NextTextLinearAttention` 路径以及 ROCm Quark MXFP4 加载修复），同时在 **混合注意力模型的投机解码** 方面取得重要进展——MTP 下 hybrid-GDN prefix-cache 命中修复已在 PR #52244 中落地，每个 draft 长度接受度的新指标目前正在评审中。对于 **DeepSeek-V4-Flash 在 Ampere (SM8x) 上的支持** 这一长期诉求仍是互动量最高的开放 issue，反映出 A100/A800 部署在生产环境中的广泛存在。

## 发布与破坏性变更

过去 24 小时内未发布新版本。

## 新模型与硬件支持

- **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731 在 SM8x（ Ampere A100/A800、RTX 30xx）上** — 跟踪新 `DeepseekV4ForCausalLM` 架构的 SM8x 支持开放功能请求 ([#50576](https://github.com/vllm-project/vllm/issues/50576))。
- **ROCm 上的 GLM-5.3-Flash Quark MXFP4** — `amd/GLM-5.3-Flash-Quark-MXFP4` checkpoint 的 ROCm 加载与推理正在修复中 ([#56176](https://github.com/vllm-project/vllm/pull/56176))；涵盖两项权重加载缺陷。
- **MoonEP 均衡专家并行后端（BF16, eager）** — MoonEP all2all 集成路线图的首个项目 ([#52101](https://github.com/vllm-project/vllm/pull/52101))，通过 `--all2all-backend moonep` 启用。
- **Aiter MLA decode — 非因果 DFlash draft block** — 将原始 PR rebase 到当前 `main`，修复扁平的非因果 draft query 路径 ([#55966](https://github.com/vllm-project/vllm/pull/55966))。
- **OmniLingual ASR（1600+ 语言）** — 利用 vLLM 服务栈承载 Meta 最近发布的多语种 ASR 的开放新模型请求 ([#28509](https://github.com/vllm-project/vllm/issues/28509))。
- **DSA nvfp4_ds_mla 来自融合 norm+rope kernel** — rebase 跟进，使融合 kernel 在 fp8 之外也能写入 NVFP4 MLA 布局 ([#55538](https://github.com/vllm-project/vllm/pull/55538))。
- **RFC:文件系统 KV offload 层的数据完整性 & I/O 活性** ([#54363](https://github.com/vllm-project/vllm/issues/54363)) 与 **RFC:KV-cache key partitioning 一致性测试套件** ([#53194](https://github.com/vllm-project/vllm/issues/53194)) — 两者都在朝着更强的 KV-cache 正确性契约推进。

## 性能与优化

- **CUTLASS Lamport 融合 GEMM + AllReduce on SM100（Blackwell）** 提议集成到 vLLM ([#55261](https://github.com/vllm-project/vllm/issues/55261))。
- **gfx11 (RDNA3/3.5) 上针对 L2 cache 的 GEMM 权重行步长填充** — 实测 **TTFT 最高 +13%，TPOT 最高 +3%** ([#55090](https://github.com/vllm-project/vllm/pull/55090))。
- **ROCm 上通过 `is_cuda_alike()` 启用共享专家多流重叠** ([#51117](https://github.com/vllm-project/vllm/pull/51117))。
- **恢复 MTP 投机解码下的 hybrid-GDN prefix-cache 命中** — 在 Qwen3.5-122B-A10B 上修复每次命中约 1,648 token 的重算（~30–40% 吞吐损失）([#52244](https://github.com/vllm-project/vllm/pull/52244))；与 ([#53670](https://github.com/vllm-project/vllm/issues/53670)) 中的底层性能诉求一致。
- **按 draft 长度接受度直方图** 已加入 spec-decode opt-in 响应，使 `(1,1),(3,2)` 与 `(2,1),(2,2)` 不再被合并 ([#56278](https://github.com/vllm-project/vllm/pull/56278))。
- **Zero-JIT warmup 后续** — 采用情况与每模型去 JIT 化跟踪器 ([#49349](https://github.com/vllm-project/vllm/issues/49349))，共享基础设施来自 #47456。
- **批量不变推理跟踪** 持续收集设计提案 ([#27433](https://github.com/vllm-project/vllm/issues/27433))。
- **CustomOp 清理**（长期持续的 `CompilationConfig` 默认值讨论）仍在进行 ([#19817](https://github.com/vllm-project/vllm/issues/19817))。

## 稳定性与回归

按用户影响严重程度排序：

1. **GLM-5.3-Flash 在 4×B200 上跨三个不相关 kernel（KDA linear-attention、MHC TileLang、TRT-LLM 融合 MoE）反复出现 CUDA 非法内存访问** — 高严重度，暂未关联修复 PR ([#54317](https://github.com/vllm-project/vllm/issues/54317))。
2. **GLM-5.3-Flash checkpoint 在 v0.29.0 + TP2×EP2 下加载崩溃** — 已关闭但未公开确认修复；Quark MXFP4 路径的加载修复正在进行 ([#56007](https://github.com/vllm-project/vllm/issues/56007)，修复见 [#56176](https://github.com/vllm-project/vllm/pull/56176))。
3. **`GlmMoeDsa` 0.27→0.28+ 在 decode-context-parallel 下回归** — 0.28.0 上崩溃，**0.29.0 上在 AMD/ROCm 静默返回随机 token** — 静默损坏变体最为危险 ([#54300](https://github.com/vllm-project/vllm/issues/54300))。
4. **Qwen3.8-Flash-Next 在 sm121/GB10 上 prompt 长度接近 `indexer_budget` 时贪心解码非确定性**，由 `persistent_topk` 引起 ([#54521](https://github.com/vllm-project/vllm/issues/54521))，同 kernel 中还存在相关的静默 top-k 丢弃 ([#51782](https://github.com/vllm-project/vllm/issues/51782))。
5. **Marlin W4A8-FP8 在 GB10/sm_121a 上配合 WNA16 INT4 MoE 静默损坏输出** — 在 temp 0 下循环输出 ``；**~2.5% 提速** 是其表征 ([#49546](https://github.com/vllm-project/vllm/issues/49546))。
6. **`PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True` 下 custom_all_reduce IPC 句柄失败**，需同时满足 DP>1 与 TP>1 ([#42609](https://github.com/vllm-project/vllm/issues/42609))。
7. **DGX Spark (sm_121) 上 Triton kernel 缓存陈旧导致输出乱码** — 清理 `~/.triton/cache` 是临时方案 ([#41871](https://github.com/vllm-project/vllm/issues/41871)，已关闭)。
8. **Mooncake 中 prefill 与 decode PP size 不同时出现异构 PP 传输完成问题** — 修复见 ([#56033](https://github.com/vllm-project/vllm/pull/56033))。
9. **ROCm + mori-io 上 multi-decode P/D disagg 误路由竞态** — 修复见 ([#51681](https://github.com/vllm-project/vllm/pull/51681))。
10. **Logprobs Triton kernel 在请求中途首次遇到新的 `num_logprobs` 时 JIT 编译** — 修复见 ([#55918](https://github.com/vllm-project/vllm/pull/55918))。
11. **Mamba1 `mamba_ssm_cache_dtype` 不透明崩溃**，触发条件为 SSM state dtype ≠ float32 且 ≠ activation dtype — 修复见 ([#54123](https://github.com/vllm-project/vllm/pull/54123))。
12. **FP8 Triton MoE 在 SM89 以下不透明编译崩溃** — 早期校验修复见 ([#54287](https://github.com/vllm-project/vllm/pull/54287))。
13. **Qwen3.8-Flash-Next 工具调用缺陷**（tool_choice="required" + 关闭 thinking；开启 thinking + MTP 时 xgrammar FSM 失败）— 已关闭 ([#55552](https://github.com/vllm-project/vllm/issues/55552))。
14. **Mistral3 多模态在纯文本 `LLM()` 初始化时 profiling 失败** — 已关闭 ([#50706](https://github.com/vllm-project/vllm/issues/50706))。
15. **Tesla T4（Turing）当前 attention kernel 中共享内存耗尽** ([#36802](https://github.com/vllm-project/vllm/issues/36802)) — 以及另一项 Turing 上 Gemma4 共享内存相关发现 ([#38918](https://github.com/vllm-project/vllm/issues/38918))。
16. **`chunk_gated_delta_rule` Triton 在 MI210/gfx90a 上 `num_stages=4` 时编译失败** ([#44973](https://github.com/vllm-project/vllm/issues/44973))。
17. **DeepSeek-V4-Pro 在 8×H20-3e 上 `mlir_global_dtors()` 错误** ([#44949](https://github.com/vllm-project/vllm/issues/44949)) 与 **v0.22.0 对 Qwen3.5-9B 的离线 `LLM` 模式失败** ([#44985](https://github.com/vllm-project/vllm/issues/44985)) — 两者均已陈旧，无近期活动。
18. **aarch64（DGX Spark / Acer GN100）上缺少 sm_121 支持** — GB10 Grace Blackwell Superchip on ARM 上 kernel 构建缺失 ([#36821](https://github.com/vllm-project/vllm/issues/36821))。
19. **TP-MoE 集合通信冗余** — 通过 `torch.compile` pass 外科手术式移除 sequence-parallelism 仍开放 ([#29139](https://github.com/vllm-project/vllm/issues/29139))。
20. **MTP 下未强制执行 thinking-budget** — 已关闭但无公开修复 ([#39573](https://github.com/vllm-project/vllm/issues/39573))。

同样值得关注但严重度较低：**Hybrid GDN（Qwen3.5/Qwen3.8 27B 级）+ MTP 在 batch ≥ 4 时调度器仅运行约 3 个并发序列** ([#55533](https://github.com/vllm-project/vllm/issues/55533))，以及 **DFlash 在 ROCm 上对 GLM-5.3-Flash 不可用**，原因是模型缺少 `SupportsEagle3` 且 AITER MLA sparse 没有非因果路径 ([#54451](https://github.com/vllm-project/vllm/issues/54451))。

## 对应用开发者的意义

- **部署 GLM-5.3-Flash 时请谨慎锁定 vLLM 版本。** 0.28→0.29 过渡在 AMD 上引入了静默 token 损坏回归（`GlmMoeDsa` + decode-context-parallel），并在 NVIDIA 上出现持续的 CUDA IL memaccess。要么停留在 0.27.x，要么关注开放 PR ([#56176](https://github.com/vllm-project/vllm/pull/56176)) 以及 GLM-5.3 issue 集群 ([#54062](https://github.com/vllm-project/vllm/issues/54062), [#54317](https://github.com/vllm-project/vllm/issues/54317), [#54300](https://github.com/vllm-project/vllm/issues/54300))。
- **混合注意力模型（Qwen3.5/Qwen3.

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 简报 — 2026-09-11

## 今日要点

DeepSeek V4.1 的准备工作已成为 `main` 分支上的主要工作流：一组协同的 PR（#38954、#38957、#38956、#36730、#36729、#36731）正在重塑 KV 池、HiCache、PD 解耦以及 Blackwell prefill 路径，以适配 V4.1 的压缩索引器拓扑。与此同时，**Weight Cache Daemon** 路线图（#33522）报告了第一阶段成果——Qwen3-235B FP8 权重加载从 306–327 秒降至 1 秒以内，通过每 rank 的 CUDA-IPC 守护进程实现——`kv-shard` 系列（PR #38356）开始将 tree-cache 的放置从 `RadixCache` 迁移至新的 `UnifiedRadixCache` 核心。

## 版本发布与破坏性变更

过去 24 小时内无新版本发布。本周两项弃用 RFC 取得进展，值得在升级规划时关注：

- [PR #32112](https://github.com/sgl-project/sglang/pull/32112) — 弃用非 Marlin GPTQ 内核与 Dual Chunk Flash Attention 后端（已关闭）。
- [PR #32111](https://github.com/sgl-project/sglang/pull/32111) — 弃用 `--attention-backend cutlass_mla`（在 SM 10.0/B200 上已禁用；已关闭）。
- [Issue #35765](https://github.com/sgl-project/sglang/issues/35765) — 现在支持不带有限 top-k 的采样掩码；影响此前依赖有限 top-k 作为重建边界的 OpenAI chat 扩展客户端（已关闭）。
- [PR #38769](https://github.com/sgl-project/sglang/pull/38769) — 内置的 NVSHMEM 固定在 3.4.5，缺少 `NVSHMEM_IB_GID_INDEX`；部分 IB/RoCE 架构现在要求升级至 3.7.2。

## 新增模型与硬件支持

- **LLaDA-Image / LLaDA-Image-Turbo**（diffusion）：PR [#37907](https://github.com/sgl-project/sglang/pull/37907) 新增 T2I、图像编辑、序列并行与 FP8 推理。
- **SenseNova-U1 / U1.5** 跟踪：Issue [#37742](https://github.com/sgl-project/sglang/issues/37742) 已开启，用于端到端支持。
- **GLM-5.3-Flash on SM120**（2× 96 GB RTX PRO 6000 Blackwell）：Issue [#37813](https://github.com/sgl-project/sglang/issues/37813) 跟踪 TP2/W4A16 routed experts/FP8 KV/vision/MTP 的资质验证。
- **DeepSeek V4.1** 进行中：PR [#38954](https://github.com/sgl-project/sglang/pull/38954)（压缩池泛化）、[#38957](https://github.com/sgl-project/sglang/pull/38957)（encoder SWA replay）、[#38956](https://github.com/sgl-project/sglang/pull/38956)（Blackwell prefill workspace 边界控制），依赖上游 [#38798](https://github.com/sgl-project/sglang/pull/38798)。
- **DeepSeek V4 + DSV4 DeepGEMM MegaMoE** 稀疏专家融合：Issue [#38700](https://github.com/sgl-project/sglang/issues/38700)。
- **Qwen3.8-Flash-Next** PD 状态传输：PR [#36651](https://github.com/sgl-project/sglang/pull/36651) 将非 KV 的 recurrent/sparse-attention 状态在 prefill/decode 之间迁移。
- **Rust 前端** 回退：PR [#38939](https://github.com/sgl-project/sglang/pull/38939) 在缺失 HF `chat_template`（例如 DeepSeek V4）时使用 Dynamo 原生渲染器。
- **ROCm MoE**：PR [#38328](https://github.com/sgl-project/sglang/pull/38328) 在 ROCm 上接纳统一 Triton router，包括单组路由。
- **NPU**：Issue [#34861](https://github.com/sgl-project/sglang/issues/34861) 跟踪 router-GEMM 输出 dtype（应始终为 fp32）。

## 性能与优化

- **Weight Cache Daemon（第一阶段）** — Issue [#33522](https://github.com/sgl-project/sglang/issues/33522)：Qwen3-235B FP8 权重加载时间 **306–327 秒 → <1 秒**，通过每 rank 守护进程 + CUDA IPC 实现。第二阶段进行中。
- **`kv-shard` 1/4 — 逻辑页放置** — PR [#38356](https://github.com/sgl-project/sglang/pull/38356)：将 tree-cache 一半从 `RadixCache` 迁移至 `UnifiedRadixCache` / `UnifiedTreeCore`（即 `registry.default_radix_cache_factory` 实际返回的内容）。
- **Unified memory 共享字节预算** — PR [#36729](https://github.com/sgl-project/sglang/pull/36729)：全注意力池与 sliding-window 池现共用一个动态字节分配区，不再使用静态的每池限额。
- **Unified memory PD 页面包络传输** — PR [#36730](https://github.com/sgl-project/sglang/pull/36730) 与 [#36731](https://github.com/sgl-project/sglang/pull/36731)：显式的逻辑到物理地址转换与共享字节预算应用于 PD decode host pool。
- **DSV4.1 Blackwell prefill workspace** — PR [#38956](https://github.com/sgl-project/sglang/pull/38956)：将稠密的 `[query_rows=8192, context_length=1,048,576]` FP32 indexer 分数张量（32 GiB）做边界控制；切换到候选打分紧凑索引。
- **GB300 QSA paged sparse-decode gather** — PR [#38851](https://github.com/sgl-project/sglang/pull/38851)：内存安全的重写（零填充 scratch、int64 偏移、gather 上 FP8 dequant），用于 GB300 SM103 上 `--kv-cache-dtype fp8_e4m3` 的 MTP/NEXTN 校验。
- **HiCache 物理传输修复** — PR [#37496](https://github.com/sgl-project/sglang/pull/37496)：unified-memory 的 H2D/D2H 现在寻址当前的物理包络，而非稳定的逻辑 ID。
- **NCCL 2.30 集成路线图** — Issue [#32774](https://github.com/sgl-project/sglang/issues/32774)：NCCL EP、M-to-N reshard、zero-SM one-sided、runtime RAS、通信器 checkpoint、弹性通信器。
- **评测统一** — PR [#38953](https://github.com/sgl-project/sglang/pull/38953)：GSM8K 与 MMLU 合并至 `sgl-eval`，避免 chat-template 与原始 completion 的混淆。

## 稳定性与回归

按严重程度排序：

1. **[Bug, DCP/PD Disagg] Decode retraction CUDA assert** — Issue [#38645](https://github.com/sgl-project/sglang/issues/38645)：当 DCP > 1 时，`retract_decode` 在 `get_cpu_copy` 内崩溃；CPU 备份/恢复中存在索引空间不匹配。尚无修复 PR。**高严重度** — 影响 PD-disagg decode 的可靠性。
2. **[Bug] DFlash2 输出不一致** — Issue [#38009](https://github.com/sgl-project/sglang/issues/38009)：启用 thinking 时，greedy 输出与仅 target 的 Qwen3.8-27B 不一致。尚无修复 PR。
3. **[Bug] DeepSeek-V4-Flash-0731 渐进式输出损坏** — Issue [#33397](https://github.com/sgl-project/sglang/issues/33397)：2× H200 + DP attention 在并发下出现损坏。尚无修复 PR。
4. **[Bug] GLM-5.3 checkpoint 权重丢失** — Issue [#38618](https://github.com/sgl-project/sglang/issues/38618)：由 transformers 写入的 checkpoint 在加载时静默丢弃 MoE/mHC/KDA 权重。**高严重度** — 静默的正确性损失。
5. **[Bug] H20 8 卡无法启动 Qwen3.8-Flash-Next-FP8** — Issue [#38793](https://github.com/sgl-project/sglang/issues/38793)：模型在 H20 上启动失败。**高严重度** — 阻塞 H20 集群上的部署。
6. **[Bug] MiniMax-H3 GGUF patch-embedding 加载失败** — Issue [#38904](https://github.com/sgl-project/sglang/issues/38904)：折叠的 Conv3D patch embedding 无法通过 GGUF text-encoder 路径加载。
7. **[Bug] MiniMax-H3 FL2VA 分层卸载时视频损坏** — Issue [#38605](https://github.com/sgl-project/sglang/issues/38605)（已关闭，可能有后续）。
8. **[Bug] Kimi-K3 严格 tool-call 语法稀释** — Issue [#38587](https://github.com/sgl-project/sglang/issues/38587)：xgrammar 约束允许 `additionalProperties` 满足命名属性。
9. **[Bug] DeepSeek V4/V3.2 DSML tool-call 解析器多余 key** — Issue [#38924](https://github.com/sgl-project/sglang/issues/38924)：偶尔将参数包装在 `"arguments"`/`"input"` 之下。
10. **[Bug] Mamba radix cache split 后 0 命中** — Issue [#22935](https://github.com/sgl-project/sglang/issues/22935)：在 `MambaRadixCache` 上 split 后，新的 prefill 匹配坍塌为 0 命中。尚无修复 PR。
11. **[Bug] Scripted-runtime rid 复用竞争 → 60s recv timeout** — Issue [#38788](https://github.com/sgl-project/sglang/issues/38788)：三个 `test/manual/chunked_prefill` 测试为红。
12. **[HiCache] HiRadixCache TP-deadlock** — Issue [#28429](https://github.com/sgl-project/sglang/issues/28429)（已关闭）：`write_backup`/`load_back` 入队决策分歧。PR 可能已合并。
13. **[Bug] DeepSeek V4 Pro TP24 在 Hopper 上 vocab-padding 失败** — PR [#31801](https://github.com/sgl-project/sglang/pull/31801)（开放中，修复在路上）。
14. **[DeepSeek V4] attention TP > 1 的非 EP TBO** — PR [#33250](https://github.com/sgl-project/sglang/pull/33250)（开放中，依赖 #31700）。
15. **[HiCache] HybridLinear/Mamba PP 正确性** — Issue [#38866](https://github.com/sgl-project/sglang/issues/38866)：在非首个 PP 阶段（Nemotron-H 系列）上，缓存传输完成与消费者使用不同的层索引。已关联修复 PR。
16. **[Fork-sync 前置条件]** — Issue [#38818](https://github.com/sgl-project/sglang/issues/38818)：82 个冲突阻塞 DeepSeek-V4.1 同步（试用后关闭）。
17. **CI 信号** — Issue [#17050](https://github.com/sgl-project/sglang/issues/17050)：截至 2026-09-10 23:18 UTC，1 个失败、8 个不稳定、986 个近期修复。

## 对应用开发者的影响

- **长上下文的 DeepSeek 工作负载在 V4.1 落地后将明显更便宜**：Weight Cache Daemon（Qwen3-235B FP8 上 <1 秒重载）与 DSV4.1 prefill workspace 边界控制（32 GiB → 小得多）的组合，实质上降低了冷启动成本与每请求的 GPU 显存压力。在此之前，请将 DeepSeek V4 固定到已知良好配置，并避免在 DP attention TP > 1 时混用 `moe_a2a_backend=none`（[#33250](https://github.com/sgl-project/sglang/pull/33250)）。
- **PD 解耦正在为 unified memory 重新布线**。`kv-shard` 系列（[#38356](https://github.com/sgl-project/sglang/pull/38356)、[#36730](https://github.com/sgl-project/sglang/pull/36730)、[#36731](https://github.com/sgl-project/sglang/pull/36731)）意味着客户端不应假设物理页 ID 在请求之间甚至单个请求生命周期内保持稳定——但下游这将使混合 Full/SWA 模型实现更高的有效 KV-cache 利用率。
- **Tool-calling 客户端应针对上游怪癖进行校验**：Kimi-K3 严格语法可能将 `additionalProperties` 传递到命名属性（[#38587](https://github.com/sgl-project/sglang/issues/38587)），而 DeepSeek V4/V3.2 DSML 解析可能将参数包装在 `"arguments"`/`"input"` 之下（[#38924](https://github.com/sgl-project/sglang/issues/38924)）。若在服务端严格校验 tool call，请在校验前防御性地解开这些 key。
- **受限架构上的 InfiniBand/RoCE 部署** 需要 NVSHMEM 3.7.2 升级（[#38769](https://github.com/sgl-project/sglang/pull/38769)）以设置 `NVSHMEM_IB_GID_INDEX`。在显式 pin GID 的 IDC 架构上横向扩展前，请确认容器镜像。
- **Blackwell PRO 6000 上的 GLM-5.3-Flash 仍处于资质验证前阶段**（[#37813](https://github.com/sgl-project/sglang/issues/37813)）——而 transformers 导出的 GLM-5.3 checkpoint 在加载时会静默丢失权重（[#38618](https://github.com/sgl-project/sglang/issues/38618)）。在该问题关闭之前，请优先使用原生格式 checkpoint。
- **H20 集群**：Qwen3.8-Flash-Next-FP8 当前无法在 8× H20 上启动（[#38793](https://github.com/sgl-project/sglang/issues/38793)）。请暂停推广或暂时固定到 Qwen3.8-Flash-Next base（[#37500](https://github.com/sgl-project/sglang/pull/37500)）。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-11

## 1. 今日要点

本周期内 Vulkan 后端获得了最集中的关注：一连串发布（b10891 → b10901）带来了 topk_moe 预填充融合、针对 Qwen 的小 M 矩阵优化、PowerVR 兼容性回退，以及异步拷贝的空闲上下文 CPU 写入。模型侧，**GLM-5.3-Flash (GLM5-Next)**（一个 320B 混合架构模型，含 34 层 KDA + 11 层 DSA，配备 mHC 与视觉能力）开启了支持 PR；此外，一个重量级的 **qwen4exp** 性能 PR（#28699）引入了 QSA 索引器的增量池化键缓存 —— 这是当前深度解码阶段最主要的剩余开销。

## 2. 发布与破坏性变更

| Build | 变更 | PR |
|------|--------|-----|
| **b10901** | vulkan：在上下文空闲时于 `ggml_backend_vk_cpy_tensor_async` 中使用 CPU 写入 | [#28618](https://github.com/ggml-org/llama.cpp/pull/28618) |
| **b10900** | vulkan：通过 `add_alloc_dep` 为预填充启用 `topk_moe` 融合 | [#28422](https://github.com/ggml-org/llama.cpp/pull/28422) |
| **b10899** | vulkan：针对 Qwen 的小 M `mul_mat` 优化（A/B 交换、split_k、按 M 的分片选择） | [#28457](https://github.com/ggml-org/llama.cpp/pull/28457) |
| **b10897** | ci：将 WoA CUDA 构建从 13.4 dev preview 切换到 13.4.1 GA redistributables | [#28687](https://github.com/ggml-org/llama.cpp/pull/28687) |
| **b10896** | spec：修复 DFlash mtmd 分块解码失败（视觉草稿模型） | [#28587](https://github.com/ggml-org/llama.cpp/pull/28587) |
| **b10894** | models：清理旧 `llama_model_` case 中的废弃 switch 分支 | [#28669](https://github.com/ggml-org/llama.cpp/pull/28669) |
| **b10893** | tests：放宽 Add 融合测试的容差 | [#28691](https://github.com/ggml-org/llama.cpp/pull/28691) |
| **b10892** | tests：移除 `test-backend-ops.cpp` 中的 SYCL 特判 | [#28688](https://github.com/ggml-org/llama.cpp/pull/28688) |
| **b10891** | vulkan：PowerVR dmmv 回退到共享内存归约（仅子组路径在 Imagination 编译器上失败） | [#28341](https://github.com/ggml-org/llama.cpp/pull/28341) |
| **b10889** | memory：停止为索引器分配 V 缓存（未使用）—— 在 DSA / Lightning Indexer 上节省显存 | [#28330](https://github.com/ggml-org/llama.cpp/pull/28330) |

无 ABI 或 CLI flag 层面的破坏性变更。

## 3. 新增模型与硬件支持

- **GLM-5.3-Flash (GLM5-Next)** — 320B 混合架构（34 层 KDA + 11 层 DSA，mHC，DeepSeek 风格注意力），通过 mtmd 支持文本 + 视觉。已开启架构、转换与测试相关 PR。[#27773](https://github.com/ggml-org/llama.cpp/pull/27773)
- **qwen4exp (Qwen3.8-Flash-Next)** 架构改进：QSA 索引器的增量池化键缓存，避免每步重新池化整个 KV 缓存。[#28699](https://github.com/ggml-org/llama.cpp/pull/28699)
- **GDN 归一化修复** 已合入（已关闭的 PR）：`max` → `rsqrt` 形式，以对齐 QwenLM/FlashQLA 与 FLA 后端。[#28068](https://github.com/ggml-org/llama.cpp/pull/28068)
- **Hexagon 后端** 重构：多 NPU 设备支持（IQ9、IQ10），全面异步的图计算 / 事件 / 张量拷贝 / 跨设备围栏。[#26501](https://github.com/ggml-org/llama.cpp/pull/26501)
- **ROCm RDNA3.5**：批处理 WMMA `mmq` 内核。[#28714](https://github.com/ggml-org/llama.cpp/pull/28714)
- **Windows ARM64 + MSVC `cl.exe`** 构建路径（此前必须使用 clang）。[#28362](https://github.com/ggml-org/llama.cpp/pull/28362)
- **通过 DP2A 模拟 CUDA DP4A** 的请求，针对较老或不支持 DP4A 的 NVIDIA 硬件。[#24616](https://github.com/ggml-org/llama.cpp/issues/24616)

## 4. 性能与优化

- **k-quants 的 CPU mul_mat（分块、VNNI）**：宣称 `ggml-cpu` `mul_mat` 获得 3–7× 加速，用 256×256 int8 窗口替代 vec_dot 中重复的 unpack 工作。[#27851](https://github.com/ggml-org/llama.cpp/pull/27851)
- **qwen4exp QSA 索引器**：以增量方式缓存块摘要键，避免每 token 从完整缓存重新汇总 —— 直接应对 [#28012](https://github.com/ggml-org/llama.cpp/issues/28012) 中提到的“解码开销随上下文线性增长”问题。[#28699](https://github.com/ggml-org/llama.cpp/pull/28699)
- **Vulkan 预填充**：通过 `add_alloc_dep` 启用 `topk_moe` 融合（b10900）；针对 Qwen 的小 M `mul_mat` 交换 + split_k + 更优的分片选择（b10899）；异步拷贝的空闲上下文 CPU 写入（b10901）；argsort 数据竞争与越界修复（[#28705](https://github.com/ggml-org/llama.cpp/pull/28705)）。
- **显存**：避免为索引器层（DSA / Lightning Indexer）分配 V 缓存，在 Qwen4Exp 类模型上降低 VRAM 占用（b10889，[#28330](https://github.com/ggml-org/llama.cpp/pull/28330)）。

## 5. 稳定性与回归

**严重（崩溃 / 非确定性 / 数据损坏）：**

- **Qwen3.6-35B-A3B 上的 MTP 投机解码** 在请求间保留状态 → 输出非确定性并出现模型退化。[#26425](https://github.com/ggml-org/llama.cpp/issues/26425)
- **Qwen3.8-27B 在 `--split-mode tensor` 下 MTP 触发可复现的 CUDA 死锁**。[#27122](https://github.com/ggml-org/llama.cpp/issues/27122)
- **flash-attn 路径下的 CUDA 非法内存访问**（`cudaStreamSynchronize`），出现在 Qwen3.6-35B MoE 部分专家卸载场景；跨构建可复现，加 `-fa off` 后消失。[#26609](https://github.com/ggml-org/llama.cpp/issues/26609)
- **qwen4exp 在 SM121（DGX Spark）上持续负载下触发 `ggml_abort`**。[#27780](https://github.com/ggml-org/llama.cpp/issues/27780)
- **Tesla P100（sm_60）Docker 中的 MTP/DFlash 草稿失败**。[#27212](https://github.com/ggml-org/llama.cpp/issues/27212)
- **qwen4exp 多序列分割回放损坏循环状态**，当 `rs` 回滚被强制启用时。[#28019](https://github.com/ggml-org/llama.cpp/issues/28019)
- **Intel Arc Pro B70 上的 SYCL 崩溃**，发生在 `ggml_sycl_pool_vmm::free` —— oneDNN 暂存区破坏了 LIFO 池顺序。[#28660](https://github.com/ggml-org/llama.cpp/issues/28660)

**中等（正确性 / 输出错误）：**

- **量化目标上的投机解码（MTP / dspark）与原版发散**（贪心采样下）—— bf16 目标一致。[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)
- **Vulkan（gpt-oss-20b）上 llama-spec 在 16k 上下文边界失败** —— KV 缓存位置追踪不连续。[#26478](https://github.com/ggml-org/llama.cpp/issues/26478)
- **Vulkan flash attention 让已释放单元中的过期 K/V 影响输出**（RADV、Strix Halo）。[#26744](https://github.com/ggml-org/llama.cpp/issues/26744)
- **Intel Arc 140V 上的 Vulkan 输出乱码**（GPU 常驻层，依赖批次）。[#28648](https://github.com/ggml-org/llama.cpp/issues/28648)
- **DSA / Lightning Indexer V 缓存浪费** 已确认，b10889 部分处理。[#28296](https://github.com/ggml-org/llama.cpp/issues/28296)（已关闭）
- **`` 标签检测** 匹配的是字符串 `""` 而非特殊 token。[#28679](https://github.com/ggml-org/llama.cpp/issues/28679)
- **服务端跨请求 KV 缓存复用使用不同 LoRA 适配器** 时静默污染输出。[#26207](https://github.com/ggml-org/llama.cpp/issues/26207) — PR [#28707](https://github.com/ggml-org/llama.cpp/pull/28707) 涉及相关 `--lora-init-without-apply` 语义。
- **图像后投机解码损坏草稿模型位置**。已由 [#28715](https://github.com/ggml-org/llama.cpp/pull/28715) 修复。

**轻微：**

- **Windows 上 SYCL sysman 空闲内存查询不可用**。[#28239](https://github.com/ggml-org/llama.cpp/issues/28239)
- **`GGML_CUDA_FA_ALL_QUANTS=ON` 并非默认开启** → q4_0/q4_1 KV 缓存静默回退到 CPU，预填充降速约 30×。[#28633](https://github.com/ggml-org/llama.cpp/issues/28633)
- **格式错误的 tool-call JSON 返回 HTTP 500** 而非 4xx。[#25510](https://github.com/ggml-org/llama.cpp/issues/25510)
- **Ling 3.0 chat parser** 将 tool call 误分类为 reasoning。已由 [#28682](https://github.com/ggml-org/llama.cpp/pull/28682) 修复。
- **生成文本中的无效 UTF-8** 导致服务端解析器崩溃

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 日报 — 2026-09-11

## 1. 今日要点

一批工具调用解析器修复相继落地，覆盖 `gemma4`、`qwen3-coder` 和 `gemma3n`（PR #18299、#18366、#18351），解决了此前有效调用被静默返回为空 `content`、或以纯文本形式泄漏到输出中的问题。UI 侧开放 1M 上下文窗口的工作（#18364、#18365），加上 ChatGPT Desktop / TealKit / Atomic Agent 集成，表明项目仍在持续推进 agent/IDE 工作流方向。目前最值得运维警惕的开放问题是 **`/api/generate` 的文件描述符泄漏**（#18344），该泄漏会在服务器整个生命周期内持续累积。

## 2. 版本发布与破坏性变更

过去 24 小时没有新打 tag 的版本发布。已合入工作树的值得关注的上游版本升级：
- **llama.cpp b10864** — [PR #18317](https://github.com/ollama/ollama/pull/18317)
- **MLX** — [PR #18235](https://github.com/ollama/ollama/pull/18235)

## 3. 新模型与硬件支持

- 有用户请求在 Ollama Cloud 上提供 **DeepSeek-V4.1-Flash**（[#18360](https://github.com/ollama/ollama/issues/18360)，27 👍；重复议题 #18178 已关闭）。请关注其后续上云进展。
- **Gemma3n projector（投影层）** 已改走非 CPU 路径，以避免 CPU 后端上图像嵌入被静默损坏（[#18376](https://github.com/ollama/ollama/pull/18376)）。此后纯 CPU 的 Gemma3n 推理会直接报错，而不是返回错误的图像描述。
- **服务端 MLX 导入**持续推进，目标是让 `ollama create` 摆脱 GGUF 转换（[#14969](https://github.com/ollama/ollama/pull/14969)）。

## 4. 性能与优化

- **MLX 内存生命周期重写** — 数组生命周期改为按作用域管理，取代原先“先固定再清扫”的机制，修复了长期存在的内存滞留缺陷：非固定调用方的内存分配会持续累积直至 OOM（[#18327](https://github.com/ollama/ollama/pull/18327)）。
- **MLX runner 内存感知加载** — 在加载下一个 MLX 模型前检查宿主机空闲内存，并等待被逐出的 runner 退出（[#18345](https://github.com/ollama/ollama/pull/18345)，已关闭/合并）。
- **MLX 前缀缓存快照逐出** — 当缓存超出预算时，现在也可以逐出活跃会话的快照（[#18353](https://github.com/ollama/ollama/pull/18353)）。
- **GGUF 元数据统一缓存** — 用单一提取的 `metadata/sha256-<hex>.json` 取代原先两套不一致的缓存，并统一能力上报（[#17858](https://github.com/ollama/ollama/pull/17858)）。
- **模型加载性能回归报告** — 据反馈，GPT-OSS:120b 等模型自 0.23.4 起加载变慢（[#18373](https://github.com/ollama/ollama/issues/18373)）；正在调查中。

## 5. 稳定性与回归

按严重程度排序（严重 → 轻微）：

| 严重程度 | 问题 | 状态 / 修复 |
|---|---|---|
| 🔴 严重 | **`/api/generate` 文件描述符（FD）泄漏** — 每个成功请求都会保留一个描述符且永不释放（[#18344](https://github.com/ollama/ollama/issues/18344)） | 未解决，暂无修复 |
| 🔴 严重 | AMD Strix Halo UMA APU 上 **Vulkan ggml runner 卡死**（0.24.0）；单线程占满 100% CPU，生成永远无法完成（[#18370](https://github.com/ollama/ollama/issues/18370)） | 未解决 |
| 🔴 严重 | M4 Pro、128k 上下文下 **macOS GUI 静默失败**，约 6k token 处中断（[#18368](https://github.com/ollama/ollama/issues/18368)） | 未解决 |
| 🟠 高 | **CVE 积压** — `ollama` Go 二进制中存在 36 个漏洞（1 个 CRITICAL、11 个 HIGH），2026-05-07 报告，至今未解决（[#16033](https://github.com/ollama/ollama/issues/16033)） | 未解决，暂无修复 |
| 🟠 高 | **`qwen2.5-coder:3b-instruct` 的 q2_K/q3_K_* 产物功能损坏** — 冒烟测试 0/15，而同系列其他量化的得分为 87–100%（[#18252](https://github.com/ollama/ollama/issues/18252)） | 未解决 |
| 🟠 高 | **云端流式输出静默失败** — `glm-5.3:cloud` 陷入无休止的思考并在流中途中止（[#18193](https://github.com/ollama/ollama/issues/18193)） | 已由 [#18351](https://github.com/ollama/ollama/pull/18351) 修复 |
| 🟡 中 | **gemma4 字符串占位符冲突**静默丢弃有效工具调用（[#18354](https://github.com/ollama/ollama/issues/18354)） | 已由 [#18366](https://github.com/ollama/ollama/pull/18366) 修复 |
| 🟡 中 | 模型省略起始 `<tool_call>` 标签时 **qwen3-coder 解析器丢弃工具调用**（[#16686](https://github.com/ollama/ollama/issues/16686)） | 未解决 |
| 🟡 中 | **Anthropic `/v1/messages` 复杂 schema** → 工具调用被当作字面文本输出（[#18346](https://github.com/ollama/ollama/issues/18346)） | 未解决 |
| 🟡 中 | **gemma4 原生 `/api/chat`** 输出 31 个重复的 `<unused50>` 后直接 EOF，且不带 `done`（[#18359](https://github.com/ollama/ollama/issues/18359)） | 未解决 |
| 🟡 中 | **gemma3n 工具模型**虽具备 `tools` 能力，但经 `/v1` 返回空的 `tool_calls`（[#18357](https://github.com/ollama/ollama/issues/18357)） | 未解决 |
| 🟡 中 | **qwen2.5vl:3b 的 JPEG 特有语法栈崩溃**，仅在 GPU 上出现（[#18369](https://github.com/ollama/ollama/issues/18369)） | 未解决 |
| 🟢 轻微 | 尽管模型已支持 1M 上下文，**上下文滑块仍被限制在 256K**（[#18352](https://github.com/ollama/ollama/issues/18352)） | 已由 [#18364](https://github.com/ollama/ollama/pull/18364) 处理 |
| 🟢 轻微 | **安装路径不匹配** — Fedora Silverblue 上 `install.sh` 创建的用户的 home 目录为 `/usr/share/ollama`（[#18361](https://github.com/ollama/ollama/issues/18361)） | 未解决 |

## 6. 对应用开发者意味着什么

- 在长期运行的部署上**定期重启 `ollama serve`**，直至 [#18344](https://github.com/ollama/ollama/issues/18344) 修复 — 每个请求造成的 FD 增长没有上限。
- **工具调用可靠性正在改善，但仍不均衡。** 在 [#18366](https://github.com/ollama/ollama/pull/18366) 大范围发布之前，校验逻辑仍应对 gemma4 路径上的“content 为空 + tool_calls 为空 + `done_reason: stop`”模式做健全性检查。
- **Claude Code + Anthropic 代理用户**应固定使用已合入 [#18351](https://github.com/ollama/ollama/pull/18351) 的构建版本，以获得正确的错误传递，而不是残缺的云端响应。
- 借助 [#18364](https://github.com/ollama/ollama/pull/18364)，**1M 上下文模型在 macOS GUI 中成为一等公民**；CLI 用户本来就可以任意设置上下文。
- **0.24.0 上的 AMD Strix Halo / Vulkan 用户**应避免依赖自动重启逻辑 — runner 卡死需要手动重启（[#18370](https://github.com/ollama/ollama/issues/18370)）。
- **新的 agent 集成**（ChatGPT Desktop [#18377](https://github.com/ollama/ollama/pull/18377)、TealKit [#18371](https://github.com/ollama/ollama/pull/18371)、Atomic Agent [#17992](https://github.com/ollama/ollama/pull/17992)）进一步扩大了 Ollama 作为本地优先（local-first）agent 框架后端的版图。
- **安全：**CVE 议题 [#16033](https://github.com/ollama/ollama/issues/16033) 已经开放了 4 个月 — 生产部署应跟进带补丁版本的发布情况，并在问题修复前考虑补偿性控制措施（网络策略、容器隔离）。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-11

## 今日要点

v1.101 发布周期已进入 `rc.2`,同时发布补丁级版本 `v1.100.1`,团队落地了多项针对代理热路径的可靠性修复 —— 最值得注意的是将开销追踪卸载到一个 sidecar 采集器 ([#40545](https://github.com/BerriAI/litellm/pull/40545)),以及将开放 Redis 熔断器事件从每次请求的 traceback 风暴转换为单条 DEBUG 日志 ([#40624](https://github.com/BerriAI/litellm/pull/40624), [#40620](https://github.com/BerriAI/litellm/pull/40620))。功能方面,供应商覆盖范围扩展,新增 Mistral Files/Batches 以及按页计费的 OCR 批处理定价 ([#40484](https://github.com/BerriAI/litellm/pull/40484))、新的 Vertex DeepSeek OCR 适配器 ([#40509](https://github.com/BerriAI/litellm/pull/40509))、Vertex AI Search 向量存储的 HTTP/2 支持 ([#40631](https://github.com/BerriAI/litellm/pull/40631)),以及 ConductGuard 防护栏集成 ([#38143](https://github.com/BerriAI/litellm/pull/38143))。

## 发布与破坏性变更

- **[v1.100.1](https://github.com/BerriAI/litellm/releases/tag/v1.100.1)** —— v1.100.0 重试路径浸泡事件之后的补丁版本(详见下方回归说明)。Docker 镜像继续通过 cosign 签名。
- **[v1.101.0-rc.2](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.2)** —— 发布候选版,包含上述 Redis 熔断器、sidecar 开销、Mistral 批处理、Vertex DeepSeek OCR 以及 HTTP/2 变更。尚无正式的迁移说明;升级预期为可直接替换。
- 行为说明:`internal_user` 角色不再从 `/spend/logs/ui` 接收提示词正文 ([#34099](https://github.com/BerriAI/litellm/issues/34099),已关闭) —— 管理员仍可获取。如果你的应用依赖内部用户读取其原始提示词,升级后请进行验证。
- 仓库管理:现已禁用空白 GitHub issue ([#40629](https://github.com/BerriAI/litellm/pull/40629)) —— bug 和功能模板为强制要求。

## 新模型与硬件支持

- **Vertex DeepSeek OCR 适配器** ([#40509](https://github.com/BerriAI/litellm/pull/40509)) —— 在 Vertex provider 消费端旁新增可部署的 OCR 编解码器,并拒绝那些会泄漏宿主机凭证的请求级 Vertex 端点。
- **Mistral Files / Batches** ([#40484](https://github.com/BerriAI/litellm/pull/40484)) —— Mistral 现可用作 Files 或 Batches 提供商;`/v1/ocr` 可作为批处理端点接入,采用**按页 OCR 批处理成本追踪**,而非基于 token 的计费。
- **Vertex AI Search 向量存储的 HTTP/2 传输** ([#40631](https://github.com/BerriAI/litellm/pull/40631)) —— `AsyncHTTPHandler`/`HTTPHandler` 现支持 `http2=True`,允许 Vertex AI Search 向量存储调用对跨多个 datastore 的并发请求进行多路复用,而不是在每个请求的 HTTP/1.1 建立上排队。
- **ConductGuard 防护栏** ([#38143](https://github.com/BerriAI/litellm/pull/38143)) —— 面向所有经由代理路由的提供商的一等调用前策略执行机制。
- **Envoy external-processor gRPC → HTTP 代理** ([#40607](https://github.com/BerriAI/litellm/pull/40607)) —— 继 #40281 之后的后续工作,用于支持 Google Agent Gateway 集成。

## 性能与优化

- **开销追踪卸载到 Pod 本地采集器 sidecar** ([#40545](https://github.com/BerriAI/litellm/pull/40545)) —— 通过配置选择启用。将 `_PROXY_track_cost_callback` 和 `DBSpendUpdateWriter` 从请求热循环中移出,因此慢速的 DB/Redis 不再会抬高推理的尾延迟;py-spy 已确认这两者是 CPU 占用的最大来源。
- **开放 Redis 熔断器降级为单条 DEBUG 日志** ([#40624](https://github.com/BerriAI/litellm/pull/40624), [#40620](https://github.com/BerriAI/litellm/pull/40620)) —— 此前,一次 Redis 抖动就会打开熔断器,然后每次请求的 ERROR traceback 格式化会让每个副本的一个 CPU 核心被钉死约 60 秒。现在:输出一行日志,然后静默缓存未命中直到恢复。同步超时现在也会被最闲路由计入超时计数。
- **缓存的实时音频 token 按音频缓存读取费率计费** ([#40627](https://github.com/BerriAI/litellm/pull/40627)) —— 修复了 OpenAI Realtime 请求在使用缓存音频时约 2 倍的过度计费;在端到端流程中保留了 `cached_tokens_details` 的文本/音频区分。
- **从不健康的 auto-router 层进行路由器回退** ([#40486](https://github.com/BerriAI/litellm/pull/40486)) —— 无法服务的单例 auto-router 层现在会下穿至健康的默认层,而不是返回错误;回归测试覆盖了 chat、Responses 和 assistants 路径上的真实 Router 缓存。

## 稳定性与回归

**高严重度 —— 待解决**

- **#34281 — 上游离线时健康检查硬失败** ([#34281](https://github.com/BerriAI/litellm/issues/34281),12 条评论)。临时家庭实验室主机应当被优雅地容忍;当前行为为硬失败。*尚未关联修复 PR。*
- **#27955 — `max_parallel_requests` 在 Anthropic 适配器上不可靠** ([#27955](https://github.com/BerriAI/litellm/issues/27955),5 条评论)。当客户端在流式 `/v1/messages` 进行中取消时,Redis 计数器**单调递增**;最终每个请求都会超过限制。这是并发计数方面的正确性缺陷,而非调优问题。
- **#29764 — Anthropic `/v1/messages/count_tokens` 忽略配置的 `api_base`** ([#29764](https://github.com/BerriAI/litellm/issues/29764))。即使在针对自托管 vLLM Anthropic 兼容后端设置了 `custom_llm_provider: anthropic` 的情况下,仍硬编码为 `api.anthropic.com`,因此 token 计数会路由到上游而非本地。
- **#30079 — 升级到 1.88.0 后 `/metrics` 端点返回空数据** ([#30079](https://github.com/BerriAI/litellm/issues/30079))。指标抓取路径上的 307 重定向悄然破坏了 Prometheus 采集;升级时请验证你的仪表盘。
- **#40020 — `litellm_settings.max_budget` 启动了一个永不重置的进程本地上限** ([#40020](https://github.com/BerriAI/litellm/issues/40020))。区别于尾部 30 天全局预算追踪器(#31292);如果你依赖 `max_budget` 进行按进程强制执行,请谨慎。

**中严重度 —— 待解决**

- **#35691 — 自定义模型未在内置成本映射中时,开销日志记录 $0** ([#35691](https://github.com/BerriAI/litellm/issues/35691))。即使 `response.usage.estimated_cost` 是正确的,`cost_breakdown.total_cost` 仍为零;与提供商账单的核对将出现漂移。
- **#30135 — 分层定价字段(`*_above_200k_tokens`)被静默忽略** ([#30135](https://github.com/BerriAI/litellm/issues/30135))。自定义 `model_info` 定价对所有 token 一律应用基础费率;若你使用长上下文模型,请将任何成本报告与提供商发票进行核对。
- **#37255 — DeepSeek V4 Pro/Flash 价格过期** ([#37255](https://github.com/BerriAI/litellm/issues/37255))。全时段的按时定价都不再匹配提供商的公开费率。
- **#37039 — `chatgpt/*` 非流式聊天补全失败** ([#37039](https://github.com/BerriAI/litellm/issues/37039),3 👍)。`Unknown items in responses API response: []` 在 1.88.1 之后出现回归;流式仍正常。仅影响基于 ChatGPT OAuth 的路由。
- **#24771 — MCP OAuth2 回调重定向到不存在的 `/ui/mcp/oauth/callback`** ([#24771](https://github.com/BerriAI/litellm/issues/24771))。基于 GitHub App 的 MCP 设置会将用户带到 404 页面。
- **#35563 — 重用的 `x-litellm-call-id` 静默丢弃开销日志行** ([#35563](https://github.com/BerriAI/litellm/issues/35563))。重用该头的客户端会在主键上发生冲突;代理接受冲突并丢弃该行。
- **#32142 — 原生 MCP `/mcp` 端点将 `SERVER_ROOT_PATH` 误解为服务器名称** ([#32142](https://github.com/BerriAI/litellm/issues/32142))。通过 Helm chart 进行的路径前缀部署会返回 0 个工具。
- **#25427 — Claude Code 的身份验证失败** ([#25427](https://github.com/BerriAI/litellm/issues/25427))。影响文档化的 `claude_non_anthropic_models` 设置路径;如果你将 Claude Code 代理到非 Anthropic 上游,值得验证。

**今日已关闭(回归/治理改进)**

- **#16582** —— `spend_log_cleanup.py` 保留任务在高可用 Kubernetes 中静默报错 ([#16582](https://github.com/BerriAI/litellm/issues/16582))。
- **#37611** —— `SharedHealthCheckManager` 每次周期都会重新加载整个无界的 `LiteLLM_HealthCheckTable`,在多 worker 场景下产生 DB 风暴并接近 OOM ([#37611](https://github.com/BerriAI/litellm/issues/37611))。
- **#34099** —— `internal_user` 角色从 `/spend/logs/ui` 读取了不应读取的提示词正文 ([#34099](https://github.com/BerriAI/litellm/issues/34099))。隐私修复;此行为变更值得在你的访问控制审查中留意。
- **#33702** —— 管理 UI 无法删除被 `LiteLLM_JWTKeyMapping` 引用的虚拟密钥 ([#33702](https://github.com/BerriAI/litellm/issues/33702))。
- **#29491** —— 通过自定义 OpenAI 兼容提供商,Anthropic 流式格式丢弃了 `tool_use` 的 `input_json_delta` ([#29491](https://github.com/BerriAI/litellm/issues/29491))。
- **#23559** —— 日志页标签筛选器已交付 ([#23559](https://github.com/BerriAI/litellm/issues/23559))。
- **#34069** —— 用于 Bedrock 角色承担的 `aws_session_tags`(CUR 2.0 成本归因)已交付 ([#34069](https://github.com/BerriAI/litellm/issues/34069))。

## 对应用开发者的影响

- **升级前审计你的开销追踪计算。** 三个成本问题目前同时存在:分层定价字段被忽略(#30135)、自定义模型成本映射写入 $0 行(#35691),以及 DeepSeek V4 固定费率过期(#37255)。如果你向客户开票或与提供商发票核对,请在受影响期间根据原始 usage token 重新生成报告 —— 在这些情况下,`response.usage.estimated_cost` 比开销日志行更可信。
- **在 #27955 修复之前,将 `max_parallel_requests` 在 Anthropic 适配器上视为参考性的。** 如果你运行流式 Claude Code 工作负载并在流中途取消,你会在 Redis 中累积幻影用量。不要假设该计数器反映真实的并发请求数来规划容量。
- **升级后验证 Prometheus 抓取。** `/metrics` 307 回归(#30079)会悄然清空仪表盘。在向前滚动之前,请在 `up == 0` 或合成抓取检查上添加告警。
- **测试新的 internal-user 权限边界。** #34099 的修复是一项安全改进,但同时也是行为变更:内部用户不再在其自己的开销日志中看到原始的提示/响应正文。如果你的 UI 假设相反,请加设门控。
- **在依赖 Redis 的部署上采用 sidecar 开销采集器。** PR #40545 为选择启用;对于历史上出现过与 DB 或 Redis 压力相关的尾延迟峰值的任何集群,这是本摘要中单一最具杠杆效应的性能收益。
- **版本锁定策略。** 本周 `v1.100.1` 是保守目标;`v1.101.0-rc.2` 对于非生产环境是合理的,前提是你特别需要 sidecar 开销、HTTP/2 vertex search 或 ConductGuard 功能,并且能够进行浸泡测试。在 #27955 修复之前,任何 Anthropic 适配器构建上都避免流中途取消的工作负载。
- **使用 `chatgpt/*` 的 ChatGPT OAuth 用户:** 锁定到 1.88.1 之前的版本,或在 #37039 解决之前仅使用流式。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-11

## 1. 今日要点

团队集中发布了一波 Studio 可靠性相关的 PR —— `@danielhanchen` 的三个叠加变更让 `unsloth studio update` 在证据完备时跳过工作、只重建过期的 transformers sidecar,并在设置了 `UV_OFFLINE` 时容忍 PyPI 不可达 ([#10649](https://github.com/unslothai/unsloth/pull/10649)、[#10650](https://github.com/unslothai/unsloth/pull/10650)、[#10651](https://github.com/unslothai/unsloth/pull/10651))。训练方面,一项实验性 PR 报告在单卡 B200 上通过对 `unsloth-cli.py` 的 8 处针对性改动,实现了 **Qwen3.5-9B LoRA 步骤 1.28× 提速** ([#10744](https://github.com/unslothai/unsloth/pull/10744))。Bug 分类已关闭两个值得关注的 Studio 回归:在非 NVLink GPU 上由 `GGML_CUDA_P2P=1` 引发的静默输出损坏,以及 DGX Spark "更新后无 GPU" 的报告 ([#10613](https://github.com/unslothai/unsloth/issues/10613)、[#10691](https://github.com/unslothai/unsloth/issues/10691))。

## 2. 发布与破坏性变更

过去 24 小时内未发布新版本。已合并 PR 中未声明破坏性变更。

## 3. 新增模型与硬件支持

- **AMD RDNA 2 刷新版 GPU 现已识别** —— `RX 6950 XT`(Navi 21)、`RX 6850M XT`(Navi 22)和 `RX 6550M`(Navi 24)此前在仅有营销名称作为架构来源的情况下(例如 Windows 上没有 `rocminfo`)会回退到 CPU torch。PR [#10746](https://github.com/unslothai/unsloth/pull/10746) 扩展了 AMD 名称 → gfx 映射表。
- **Blackwell 上的 Qwen3.5-9B LoRA** —— 性能表征与加速工作见 [PR #10744](https://github.com/unslothai/unsloth/pull/10744)。
- **Apple Silicon 上的 MLX MoE** —— 可选的 gate/up 融合与循环解码融合已集成到 Studio,采用按适配器作用域的融合策略,在生成结束后恢复基模型 ([PR #10733](https://github.com/unslothai/unsloth/pull/10733))。
- **通过 Studio API 暴露 Ollama 管理的模型** —— 此前已安装但未列出的模型现可通过名称寻址 ([PR #10763](https://github.com/unslothai/unsloth/pull/10763))。

## 4. 性能与优化

- **单卡 B200 上 Qwen3.5-9B LoRA SFT:步骤提速 1.28×**,源自对 `unsloth-cli.py` 内核调度、打包与调度顺序的 8 处改动。标记为实验性,欢迎讨论 ([PR #10744](https://github.com/unslothai/unsloth/pull/10744))。
- **bitsandbytes 的实时 PyTorch 流** —— 用当前加速器流替换缓存的流指针,用于 bnb 直接反量化与 GEMV/GEMM 调用,解决 [#10563](https://github.com/unslothai/unsloth/issues/10563) 中的缓存流不一致问题 ([PR #10745](https://github.com/unslothai/unsloth/pull/10745))。
- **Studio 中的 MLX MoE gate/up 融合 + 循环解码融合**,基模型打包从加载到卸载全程保持,不再按请求重新打包 ([PR #10733](https://github.com/unslothai/unsloth/pull/10733))。
- **长链推理的推理窗口分页** —— 为长推理提供有界分页,无需更广泛的流式渲染重写 ([PR #10717](https://github.com/unslothai/unsloth/pull/10717),是对 #9477 已验证方向的跟进)。
- **Agent 启动不再阻塞目录扫描** —— 新的常驻模型端点避免了本地/媒体发现缓慢时的 30 秒 HTTP 超时 ([PR #10728](https://github.com/unslothai/unsloth/pull/10728))。
- **Studio 更新依赖传递变为增量式** —— 每一步的证据都被记录,未变化的步骤将被跳过;该过程不再强制完整重建 sidecar ([PR #10649](https://github.com/unslothai/unsloth/pull/10649)、[#10650](https://github.com/unslothai/unsloth/pull/10650))。

## 5. 稳定性与回归

按影响排序;关闭项已在本窗口期内解决。

- **🔴 高 — 每次工具调用后上下文重新处理缓慢**(未关闭)。当上下文超过约 30k token 后,用户在每次工具调用后会遇到多分钟的等待;怀疑是最近的 Studio 更新引入的回归。*尚无修复 PR。* [#10698](https://github.com/unslothai/unsloth/issues/10698)
- **🔴 高 — 长 Qwen3.8 GGUF 对话在重载后完整预填充耗时约 11 分钟**(未关闭)。可复用的提示状态似乎被丢弃;在 Studio 桌面端可复现。[#9037](https://github.com/unslothai/unsloth/issues/9037)
- **🟠 中 — `--tensor-split` 被静默忽略**(未关闭)。用户报告调试耗时数小时;合法的 split 未被应用。[#10355](https://github.com/unslothai/unsloth/issues/10355)
- **🟠 中 — Studio 在离线更新时强制完整重建依赖**(未关闭 → 已修复)。由 [#10651](https://github.com/unslothai/unsloth/pull/10651) 修复:当设置 `UV_OFFLINE` 且 PyPI 不可达时,已验证的安装会被保留。
- **🟠 中 — 扩散模型:每次生成后模型被卸载;不支持 LoRA**(未关闭)。对 HDD 用户影响显著;用户经 Reddit 转发上报。[#10716](https://github.com/unslothai/unsloth/issues/10716)
- **🟠 中 — Windows 上 Studio CLI `unsloth start codex` 因 `stdout is not a terminal` 失败**(未关闭)。即使在真正的交互式终端中,Agent TUI 也无法启动。[#10699](https://github.com/unslothai/unsloth/issues/10699)
- **🟠 中 — Data Recipe "所有列被丢弃" 误报**(未关闭)。Bug 模板提交;在合法配方上报告了错误的丢弃警告。[#10738](https://github.com/unslothai/unsloth/issues/10738)
- **🟡 低 — Windows/PowerShell 安装器在含空格的路径上失败**(未关闭)。[#10722](https://github.com/unslothai/unsloth/issues/10722)
- **🟡 低 — CLI 每次 Studio 运行都会重新生成新的 API 密钥**(已关闭,修复见 [#10595](https://github.com/unslothai/unsloth/issues/10595))。
- **🟢 已解决 — 非 NVLink GPU 上的 `GGML_CUDA_P2P=1` 损坏**(RTX 6000 Ada、RTX PRO 6000、L40/L40S、L4)。已关闭;白名单修正已发布。[#10613](https://github.com/unslothai/unsloth/issues/10613)
- **🟢 已解决 — DGX Spark 更新后无 GPU**。已关闭。[#10691](https://github.com/unslothai/unsloth/issues/10691)
- **🟢 已解决 — DGX Spark 图像生成 OOM(flux.2-klein)**。已关闭。[#9919](https://github.com/unslothai/unsloth/issues/9919)
- **🟢 已解决 — AMD 6950 XT 未被检测**。由 [#10746](https://github.com/unslothai/unsloth/pull/10746) 处理。[#10468](https://github.com/unslothai/unsloth/issues/10468)
- **🟢 已解决 — PDF 摄取丢弃纯图片页面 / 拒绝扫描件**。已关闭。[#10619](https://github.com/unslothai/unsloth/issues/10619)

## 6. 对应用开发者的意义

- **离线/气隙环境下的 Studio 更新现已可行。** [#10649](https://github.com/unslothai/unsloth/pull/10649) / [#10650](https://github.com/unslothai/unsloth/pull/10650) / [#10651](https://github.com/unslothai/unsloth/pull/10651) 这组变更意味着 `unsloth studio update` 会跳过已验证的步骤、不再每次都重建三个 transformers sidecar(在 Windows 上节省约 60–90 秒),并在设置了 `UV_OFFLINE` 时容忍 PyPI 不可达 —— 适用于托管或受限网络环境。
- **使用工具的 Agent 获得更持久的体验。** Agentic 轮次在关闭标签页后仍能通过持久流式传输存活,并附带明确的 `interrupted` 标签 ([PR #10365](https://github.com/unslothai/unsloth/pull/10365));聊天历史引用现已恢复,后续提问不会丢失上下文 ([PR #10761](https://github.com/unslothai/unsloth/pull/10761));工具返回的图像不再在送达模型前被丢弃 ([PR #10762](https://github.com/unslothai/unsloth/pull/10762));失败时会保留部分研究报告 ([PR #10759](https://github.com/unslothai/unsloth/pull/10759));Anthropic 搜索错误会被显式抛出,而不是显示 `(search complete)` ([PR #10757](https://github.com/unslothai/unsloth/pull/10757))。
- **Hugging Face 鉴权终于在 Studio 的受限下载中得到尊重** ([PR #10758](https://github.com/unslothai/unsloth/pull/10758)),合并模型上传会按照选定的分支/PR 进行原子化文件投递 ([PR #10760](https://github.com/unslothai/unsloth/pull/10760))。
- **Apple Silicon 与 Blackwell 训练获得实质性关注。** MLX MoE 融合([#10733](https://github.com/unslothai/unsloth/pull/10733))与 B200 端 LoRA 性能提升([#10744](https://github.com/unslothai/unsloth/pull/10744))预示着本地 MLX 栈与单卡 Blackwell 训练任务将迎来近期提速。
- **生产用户的注意事项。** 两个未关闭的 Studio 回归对长上下文工具调用应用有实质影响([#10698](https://github.com/unslothai/unsloth/issues/10698)、[#9037](https://github.com/unslothai/unsloth/issues/9037));若你依赖长上下文或重复工具调用,请锁定到已知可用的构建,或在修复发布前自托管于 Studio 之外。`GGML_CUDA_P2P=1` 的修复对使用 L40S / RTX 6000 Ada / RTX PRO 6000 / L4 的多 GPU 机器的用户意义重大 —— 请确认你运行的是包含白名单修正的版本。
- **值得关注的待开发能力。** 滚动上下文窗口 / 压缩功能([#7472](https://github.com/unslothai/unsloth/issues/7472),7 👍)以及聊天 UI 中的原生 RTL/BiDi 渲染([#8912](https://github.com/unslothai/unsloth/issues/8912))仍是社区的开放诉求,完成后将解锁长会话和非拉丁语工作流。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 简报 — 2026-09-11

## 今日要点

今天的动态以 **v3.1.0** 发布为主——带来感知 profile 的配置同步与模型发现缓存失效修复——同期 Claude App 网关栈中三个运行态 bug 也已完成分诊与修复。最值得关注的是仍处开放状态的 **#1783**：Codex API（`openai_responses`）上游返回 HTTP 400，因为转换后的 Anthropic `thinking` 块落到 Responses 历史时携带了非空的 `content` 数组——目前已有两个 PR（#1692、#1784）正在处理该问题。

## 发布与破坏性变更

- **v3.1.0** 已发布——未标记破坏性变更。
  - feat: 同步 Claude App 配置时尊重 profile 的 Entry 模式 — [#1720](https://github.com/musistudio/claude-code-router/pull/1720)
  - fix: 当 profile 白名单变更时，使 Claude 网关的模型发现缓存失效 — [部分发布说明](https://github.com/musistudio/claude-code-router)
  - **迁移提示：** 无需迁移操作。维护自定义 Entry 模式 profile 的用户，升级后请确认 Claude App 配置按预期同步。

## 新模型与硬件支持

本窗口期内未引入新的模型架构、后端或量化格式。

## 性能与优化

未发布新的吞吐/延迟数据。最为关键的落地是 **v3.1.0 中的模型发现缓存失效修复**：当 profile 白名单变更时，网关现在能正确丢弃其缓存的模型列表，而不再返回过期条目。这首先是一项正确性修复，但也免去了每次编辑白名单后重启守护进程的临时方案。

## 稳定性与回归

按用户影响排序：

1. **[HIGH — OPEN] `#1783` — `openai_responses` 上游对推理项返回 400**
   将任何包含 Anthropic `thinking` 块的会话路由到 `openai_responses` 提供方（Codex API）时，会以 `All target providers failed` 失败。Responses API 要求 `reasoning` 项的 `content` 数组必须为空，但网关目前仍把带有非空 content 的转换后 thinking 块转发出去。两个修复正在推进：[#1692](https://github.com/musistudio/claude-code-router/pull/1692)（丢弃不可回放项）与 [#1784](https://github.com/musistudio/claude-code-router/pull/1784)（就地剥离 content）。在任一合入前，含有推理历史的长会话将持续硬失败。

2. **[HIGH — 已通过 #1769 关闭] `#1768` — CCR 重启会清空 Claude App 网关设置**
   退出时的 `restoreClaudeAppGatewayConfig` 路径会在每次重启时删除当前 `configLibrary/*.json` 条目并回滚根配置，导致用户设置的 `chatTabEnabled`、`modelPrefer1mContextWindow` 等标志位丢失。该问题由 [#1769](https://github.com/musistudio/claude-code-router/pull/1769) 修复——将恢复动作改为精细化（只撤销接管流程写入的键）。

3. **[MEDIUM — 已通过 #1767 关闭] `#1766` — Fusion 的 `web_search` 无法识别 Claude Cowork**
   Claude Desktop 的 Cowork 标签页将其搜索能力声明为名为 `WebSearch` 的函数工具（驼峰式、无分隔符）。匹配器的 `toLowerCase().replace(/[-.]/g, "_")` 归一化会将其折叠为 `websearch`，导致三项子串检查全部失败。该问题由 [#1767](https://github.com/musistudio/claude-code-router/pull/1767) 修复，加入了驼峰感知的匹配方式。

4. **[LOW — OPEN] `#1782` — `ccr start --daemon` 被拒绝为未知选项**
   文档化的 CLI 标志 `ccr start --daemon` / `ccr serve --daemon` 报 `Unknown web option: --daemon`。修复位于 [#1782](https://github.com/musistudio/claude-code-router/pull/1782)，将该标志加入了解析器（顺带关闭长期未解决的 #1246）。仅影响参照旧版 CLI 文档的用户。

5. **[LOW — 已关闭] `#1734` — 总览统计数据无法重置**——纯体验缺口；尚无实现，作为功能请求关闭。

## 对应用开发者的影响

- **若依赖来自 profile 的 Claude App 配置同步，或在运行时修改白名单，请升级至 v3.1.0**——否则缓存失效缺陷会返回过期的模型列表。Claude App 网关恢复回归（#1768）已在该发布线中得到修复，请确保部署版本包含 #1769。
- **目前请避免将长推理会话路由至 `openai_responses` 上游。** 在 #1692 或 #1784 合入前，任何已产生 `thinking` 块的 Anthropic 侧会话在面对 Codex 风格提供方时都会返回 400。若必须立即支持此路径，请在客户端对 `thinking` 历史做清洗，或将这些会话限定在 Anthropic 兼容的提供方中。
- **Claude Cowork 用户通过 #1767 恢复网页搜索**——无需客户端改动，只需升级到合并该修复之后的版本即可。
- **守护进程标志**——`#1782` 恢复了 `ccr start --daemon`；若你的编排脚本或 systemd 单元依赖该标志，请关注合并进展。
- **运维提示：** #1768 的根本原因是网关把用户编辑过的配置当作接管产物来处理。若你脚本化 CCR 重启，请在每次循环后重新校验当前 `configLibrary` 条目，直到所用构建包含 #1769 为止。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 技术摘要 — 2026-09-11

## 1. 今日要点

Codex 集成仍是引发变动的主要来源：一组开放缺陷（#5974、#6340、#6596、#6679、#7217、#6529、#7278、#7283）涉及会话历史统一、WSL/UNC 文件系统怪癖、macOS 上新增的 `responses_http` 传输层，以及 DeepSeek 目录漂移。代理侧的两个精准修复（#7287、#7282）分别处理 Responses 路径上低于下限的 `max_tokens` 拒绝问题，以及在 Claude → Chat 转换过程中上游内联的 `<mm:think>` 块泄露问题。过去 24 小时内未发布新版本，所有更改均排队在 `main` 分支上。

## 2. 版本发布与破坏性变更

- **过去 24 小时内无新版本发布。**
- **Provider 预设重命名（通过 #7183 合并）：** 国内 DashScope/百炼 预设更名为 **千问AI平台**，Qwen 全系模型在全部七款支持应用（Claude Code、Claude Desktop、Codex、Hermes、OpenClaw、OpenCode、Pi）中统一升级到 **3.8 代**。现有用户配置的 provider 不受影响，但选择器中的预设名称将会变更。
- **Laonong API 预设（#7245，开放中）：** 新增一个统一的 OpenAI-SDK 兼容网关，覆盖 40+ 模型。

## 3. 新模型与硬件支持

- **DeepSeek 视觉能力启用（#7286，开放中）：** 镜像官方目录，将 `deepseek-flash` 注册为支持视觉的模型，并解除对遗留别名 `deepseek-v4-flash` 的屏蔽（DeepSeek 刷新脚本正在移除该别名）。与 #7283（图像被替换为 `[Unsupported Image]`）形成闭环。
- **DeepSeek 更名跟进（#7278，开放中）：** 指出上游 `deepseek-flash` 现已原生支持多模态，旧别名应在预设中退役。
- **Qwen 3.8 全线更新（#7183，已合并）：** 覆盖所有目标应用的国内 provider 预设刷新。
- **新增预设：Laonong API（#7245，开放中）** — OpenAI-SDK 网关聚合器。

## 4. 性能与优化

- **数据库增长上限（#6873，开放中）：** 解决 #6706 中 DB 目录膨胀至约 22 GB（≈2.4 GB 实际数据库 × 10 份完整镜像备份 + 孤立的 `.db-journal`）的问题。对过大的错误响应体、去重账本进行限制，并应用备份清理策略。
- **会话用量同步器修复（#7281，开放中）：** Codex 与 Claude 同步器此前都将未变化的 `mtime` 视为"无变更"而跳过解析，导致累积用量在日志持续增长的同时丢失。修复后无论 mtime 如何，只要内容长度发生变化就重新解析。
- **依赖刷新（#7285、#6435，均开放中）：** 通过 Dependabot 更新 53 个 Rust crate 和 56 个前端依赖；#7195（同范围）已关闭/合并。

## 5. 稳定性与回归问题

按用户影响和时效性排序。

| 严重程度 | 项目 | 状态 | 备注 |
|---|---|---|---|
| **高** | Claude Code **2.1.265** 回归破坏 Deepseek / ZAI 路由（#7236） | 已关闭 | 11 条评论；上游 Claude Code 近期变更与 CC Switch 路由交互所致。 |
| **高** | 启用本地代理 + 故障转移时应用崩溃；使用过程中也会崩溃（#936） | 已关闭 | 15 条评论，持续时间最长的讨论；修复已合并。 |
| **高** | Desktop 26.905 / CLI 0.153.x 上 Codex 本地路由被绕过：请求跳过 `127.0.0.1:15721` 直接命中 `api.openai.com`；因 Codex 强制 `responses` 传输层，第三方中继被阻断（#7217） | 开放中 | 与 #6256（macOS 专属变体，现已关闭）配套 — Windows 用户也因新版 Codex 默认传输层受影响。 |
| **高** | WSL 上的 Codex 路由：`hard_link` 返回 `os error 50`，因为 Codex 鉴权路径 `\\wsl.localhost\Debian\root\.codex\auth.json` 不支持安全恢复（#6596、#6679） | 开放中 | 重复报告；影响所有将鉴权数据存放在 WSL UNC 下的用户。 |
| **中** | **OpenAI Official** 下 `unifyCodexSessionHistory` 静默失败，因为本地路由路径硬编码了 `cc-switch-official` 桶（#5974）；配套的纯路由报告 #6340 显示显式 `model_provider` 块被注入且迁移闸门从未触发 | 开放中 | 两份互补的根因报告。 |
| **中** | 3.20.x 版本内存使用异常（#7224） | 开放中 | issue 正文中无具体数据。 |
| **中** | Claude Code 3.20.2 在指向 qwen3.8 27B 时仅暴露 `haiku`；其他模型报错（#7221） | 开放中 | 疑似模型列表过滤或上游兼容性问题。 |
| **中** | Codex Responses → Chat 转换器在某个回合包含评论后接 `function_call` 时，会发出两条连续的 assistant 消息（#6529） | 开放中 | 已在 #7280 中提出修复方案 — 将相邻评论与待处理工具调用合并。 |
| **中** | 多 ChatGPT 套餐绑定：配额浮窗不显示当前套餐用量（#7267） | 开放中 | UI/仪表板问题。 |
| **低** | Codex 会话删除后在 `~/.codex/session_index.jsonl` 中残留幽灵条目，导致下次启动时侧边栏解析失败（#7272，PR 开放中） | 开放中 | 修复位于 PR #7272。 |
| **低** | 代理接管期间 Codex Desktop Voice 在 `/v1/live` 返回 404（#6959） | 开放中 | 新 Codex 接口尚未被本地代理路由。 |
| **低** | 通过 CC Switch 使用 `glm-5.2` 时 Responses 输出中存在持续存在的换行符伪影（#6439） | 开放中 | 历史遗留问题。 |
| **低** | 重启时 Codex 故障转移设置被 Claude 设置覆盖（#7204） | 已关闭 | 修复通过 #7210 落地（`stop_with_restore_keep_state` 不再从 Claude 行重写所有应用配置）。 |
| **低** | 通用 provider 同步覆盖子元数据（#7212，已合并） | 已关闭 | Claude/Codex/Gemini 子项的 `meta`、`created_at`、`sort_index` 现已保留。 |
| **低** | 代理环境切换路由失败（#7270） | 已关闭 | |
| **低** | Linux/WSL 上 HiDPI / UI 缩放（#4622） | 开放中，陈旧 | 等待维护者关注。 |

正在落地或提议中的代理/引擎侧修复，针对上述问题：

- **#7287** 在发送至严格的 Responses 上游前，将 1–15 范围的 `max_output_tokens` 上调至 16；Claude Desktop 的 `max_tokens=1` 可用性探测曾导致已映射 provider 在本地路由下显示为不可用。
- **#7282** 在 Claude → Chat 路径上，将上游内联的 `<mm:think>` 推理块（例如 MiniMax M3、OpenCode Go）从纯文本中拆分出来，避免可见回复与隐藏推理块被串接。
- **#7177（已关闭/合并）** 新增 `/images/edits` 代理以及 Images API 后续工作（base_url 处理、图像生成的流式用量）。
- **#7280** 将评论 + function_call 项合并到单个 assistant 回合（#6529）。
- **#6915** 允许统一 MCP 表单接受 OpenCode 原生数组形式的 `command`（使用 `environment` 而非 `env`），不再静默拒绝。

## 6. 对应用开发者的影响

- **Windows / WSL 上的 Codex 仍不完善。** 两个相互独立的缺陷（UNC 路径上的 `hard_link`、会话历史桶硬编码）意味着：若依赖 CC Switch 的故障转移恢复功能，请勿将 Codex 鉴权数据存放在 `\\wsl.localhost\...` 下；在 #5974 / #6340 落地前，也不要期望 `unifyCodexSessionHistory` 能合并 OpenAI-Official 会话。会话管理方面可关注 PR #7286、#7272、#7274。
- **本地代理正在演变为真正的协议适配层，而不仅仅是重写器。** 下限以下 `max_tokens` 钳制（#7287）、Anthropic → Responses 翻译边界情况、Responses → Chat 回合合并（#7280）、`responses_http` 传输层强制（#7217、#6256）都表明，代理正在承担上游 CLI 未能统一处理的兼容性工作。若您依赖严格的透传语义（例如用于上游侧的 token 计量），请针对目标模型验证代理行为。
- **数据库增长是真实的运维风险。** #6706 显示因错误响应体保留加上备份轮转，本地目录膨胀至 22 GB。#6873 是恰当的缓解方案；在此之前，若您会产生大量上游错误，请定期清理 `~/.cc-switch/db_backup_*.db`。
- **预设目录的漂移速度快于应用本身。** DeepSeek 更名（#7283、#7278、#7286）以及 Qwen 3.8 / DashScope → 千问AI平台 品牌重塑（#7183）都表明 provider 元数据需要主动维护。对于自托管部署，建议固定到已知良好的版本，而非追新 `main` 分支。
- **MCP 与 Grok Build 接口仍在成熟中。** #6915（OpenCode 数组形式 `command`）和 #6510（Grok Build 在 `responses` / `chat_completions` / `messages` 间的 `api_backend` 持久化）均处于开放中，若您通过脚本编排多协议 provider，值得关注。

---
*摘要基于 2026-09-10 UTC 更新的 issue/PR 生成。范围内共 37 个 issue 和 32 个 PR；按评论数与时效性排序。*

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-11

*Source: github.com/QuantumNous/new-api*

---

## 1. 今日要点

过去 24 小时内没有新的发布,但 Issue 和 PR 队列显示围绕**多提供商协议标准化**的大量活动——尤其是 Gemini(`countTokens` 路由、工具参数的 JSON-Schema 联合类型)以及 Vertex AI(API-Key 模式下的 404,加上即将到来的 OpenAI 兼容嵌入支持)。一批计费/重试逻辑的修复以及若干由 AI 代理撰写的 PR(Claude Code、Codex、Grok、Cursor)表明当前处于一个聚焦跨厂商兼容性而非功能扩展的维护周期。

---

## 2. 发布与破坏性变更

*过去 24 小时无新发布——按格式指南省略本节。*

---

## 3. 新模型与硬件支持

- **Vertex AI — OpenAI 兼容嵌入(评审中)。** PR #6776 为 Vertex 渠道添加 `/v1/embeddings` 支持,将请求转换为 Vertex `:predict` `instances` 格式,并返回 OpenAI 形态的 `data[]` 及提示词 token 使用量。[PR #6776](https://github.com/QuantumNous/new-api/pull/6776)
- **Gemini `:countTokens`(评审中)。** PR #7285 实现了专用的 `countTokens` 路径,使其不再被路由到 `generateContent`——对使用 Gemini CLI 或 token 计数预检的部署尤为相关。[PR #7285](https://github.com/QuantumNous/new-api/pull/7285)
- **Vertex AI API-Key 模式(已损坏)。** Issue #6250 报告 API-Key 认证模式在构建请求 URL 时缺少 `project_id`,在官方 Vertex 端点上返回 404。**尚未关联修复 PR。**[Issue #6250](https://github.com/QuantumNous/new-api/issues/6250)

---

## 4. 性能与优化

- **重试逻辑重构(开放讨论)。** Issue #4236 —— "optimize retry request logic"——在近期活动后被重新开启;讨论可能涉及回退时机、熔断与退避策略。[Issue #4236](https://github.com/QuantumNous/new-api/issues/4236)
- **自动禁用后的渠道重试优先级(评审中)。** PR #7294 在渠道于故障转移过程中被自动禁用时保留排序顺序,解决了分布式渠道池中长期存在的一个痛点。[PR #7294](https://github.com/QuantumNous/new-api/pull/7294)
- **计费汇总误报(开放 Bug)。** Issue #7296 —— 分层计费模型即使计费金额正确,也会在请求日志中产生"动态计费 · 无匹配结果"警告;纯属日志/UX 层面的问题,不影响计费正确性。[Issue #7296](https://github.com/QuantumNous/new-api/issues/7296)

今天没有发布具体的吞吐量 / 延迟 / 内存数据。

---

## 5. 稳定性与回归

按严重程度排序(高 → 低):

1. **高 —— Claude→OpenAI 协议转换破坏严格的上游。** Issue #7307(以"缺少复现步骤"关闭)报告在 Anthropic→OpenAI 转换过程中,会话中间的 `system` 消息发生泄漏

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*