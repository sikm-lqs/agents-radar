# AI 基础设施日报 2026-09-07

> 生成时间: 2026-09-07 01:51 UTC | 覆盖项目: 9 个

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

# 跨项目 AI 基础设施报告 — 2026-09-07

## 1. 生态总览

当前技术栈在高速发布的同时也在偿还正确性方面的技术债。推理引擎（vLLM、SGLang）今天整天都在忙于排查三股力量的碰撞——Blackwell 芯片（sm120/sm121）、低精度格式（FP8/NVFP4/W4A16）以及混合线性注意力架构——这些碰撞产生了非确定性、静默输出劣化以及前缀缓存未命中等问题，而非简单的崩溃。llama.cpp 在 24 小时内发布了 **十个版本**，依然是生态中发布节奏最高的；与此同时，两大 API 网关（LiteLLM、New API）都在与计费正确性 bug 搏斗——这是网关层已成为收入关键基础设施的有力信号。最后，Agent 工作负载（工具调用、长多轮会话、前缀复用）如今已成为*每个*层级的主导塑造力：从 llama.cpp 中的 KV 缓存碎片化修复，到 CC Switch 中的工具调用转换 bug，再到 Claude Code Router 的启动脆弱性。

## 2. 活跃度对比

| 项目 | 层级 | 跟踪的 Issue | 跟踪的 PR | 发布状态（24h） |
|---|---|---|---|---|
| **vLLM** | 推理引擎 | ~29 | ~18 | 无（zstd 容器特性被拒） |
| **SGLang** | 推理引擎 | 39 已更新 | 295 已更新 | 无；CI：1 个失败，9 个不稳定，957 个近期已修 |
| **llama.cpp** | 本地运行时 | ~20 | ~15 | **10 个版本**（b10821–b10830） |
| **Ollama** | 本地运行时 | 3 | 2 | 无（metrics PR 已合入） |
| **LiteLLM** | 网关 / 代理 | ~14 | ~8 | **v1.100.0 stable + v1.101.0-rc.1**（cosign 签名） |
| **Unsloth** | 微调 / 本地推理 | ~18 | ~20 | 无 |
| **Claude Code Router** | Agent 路由器 | 2 | 1 | 无 |
| **CC Switch** | Agent 路由器 / 切换器 | ~20 | ~15 | 无 |
| **New API** | 网关 / 中转 | ~8 | ~10 | **v1.0.0-rc.34**（安全里程碑） |

*方法论：计数反映每个项目摘要中引用的条目，而非仓库总活动量；SGLang 的计数在其摘要页脚明确声明。今天只有 llama.cpp 和两个网关发布了版本；引擎及微调层的工作全部在 `main` 分支进行。*

## 3. 模型支持竞赛

**今日已发布（已上线）——llama.cpp 领先。** 它是唯一真正*发布*了新架构支持的项目：端到端 **Spark2_5ForCausalLM**（b10828）、影响所有 Gated Delta Net 模型的 GDN 归一化正确性修复（b10829），以及 `--fuse-qkv` GGUF 转换（b10830）。**HrmText/DFM Mimir 1B** 和 **Kimi-K3** 推测解码状态回滚作为开放 PR 进行中。

**在途前沿深度——vLLM。** **Qwen3.8-Flash-Next**（QSA 稀疏注意力，#55272）和 **DeepSeek-V4** on sm12x（DeepGEMM pin #53680、TileLang fallback #53055）的支持工作主导了 PR 流，但头条新闻是这些最新路径携带着最严重的开放 bug（非确定性 #54521、#53257）。

**硬件广度——SGLang。** 覆盖面最广：T-Head PPU（ZW810）、带 DSV4 的 Ascend Atlas A5 NPU、ROCm gfx950 汇编注意力（MI355X）、Apple Silicon MLX RFC（#32321）以及下一代 Xeon CBB 拓扑检测。其模型工作（GLM-5.3-Flash、DeepSeek-V4）目前受*稳定性*制约，而非能力制约——五个独立的 GLM-5.3-Flash bug 集群仍处于开放状态。

**仅 API 旗舰——网关，瞬间完成。** GPT-6 Astra、Gemini 3.8 Flash 和 GLM-5.3 Flash 当天即通过定价种子（CC Switch #7162–7164）和能力表（New API #7211）成为"已支持"。在此层级，模型支持属于路由/计费元数据，而非内核——但发布以小时计，而非以周计。

**滞后——Ollama。** 它的 `spark2_5` 请求（#18195）在推理阶段失败，被上游 llama.cpp 支持的下传所阻塞——这是其在 llama.cpp 上一层位置的结构性后果。

## 4. 性能前沿

**KV 缓存和前缀复用是单一最大的投入集中点**——今日出现在 9 个项目中的 7 个里：

- *SGLang*：四部分 KV 缓存分片重构（#37614 为 1/4）、HiCache swap-in 规划器修复、统一 KV 的 SWA 记账。
- *vLLM*：混合 Mamba 前缀缓存未命中（#53504、#43587、#54094）、CPU 卸载内存记账（#54014）、连接器序列化在共享 10k 前缀时造成 **TTFT 膨胀 12 倍**（#44294）。
- *llama.cpp*：Agent 非连续 KV 恢复（#27991）——但也是今日最严重的新性能回归：**`-np 2 --kv-unified` 下 prefill 吞吐下降 42–54%**（#28495）。
- *Ollama*：MLX 前缀恢复取整在 Agent 工作负载上每轮浪费 **17–27 秒**（#18267）。
- *Unsloth*：并行聊天的 KV 抢占（#10301、#10358）；一位用户因禁用的 prompt 缓存损失了 **48.8 小时运行中的 44 小时**（#10382）。

**内核**：vLLM 的 ROCm MLA decode 融合（RoPE + Q/KV 拼接 + FP8 KV 写入）以及 sm12x 的 DeepGEMM pinning；SGLang 用于 EAGLE 验证路径的 gfx950 汇编注意力；llama.cpp 的无分支 Q4_K/Q5_K mmvq scale 解包以及 RDNA4/Metal M2 Max 调优。

**推测解码/MTP 正在成熟——但在量化目标与混合注意力的交叉点上尤其*不安全***：llama.cpp #25618（量化目标上的 draft 发散，bf16 上正常）、vLLM #53180（静默劣化：turboquant KV + MTP + 混合 GDN）、SGLang #37326（MTP 接受率随运行时间衰减至约 0）。Kimi-K3 的有界循环状态回滚（#28466）是线性注意力 spec decode 的架构性答案。

**量化**：Blackwell FP8/NVFP4 确定性集群（vLLM #54521/#53257/#55571）以及 compressed-tensors W4A16 全 NUL 输出（SGLang #38143）表明量化路径已成为正确性 bug 的集中地。

**网关层级的"性能"是韧性，而非吞吐**：New API 的按通道 **TTFB 超时与自动回退**（#7228）是今日运营层面最重要的延迟修复。

## 5. 层级定位

- **推理引擎（vLLM、SGLang）**——承载正确性的内核层。其路线图正趋向于同一问题集（确定性、混合注意力、spec decode、解耦）；差异化正在收窄到焦点：vLLM 专注于 NVIDIA/ROCm 内核深度与可观测性（MFU 指标 #55624），SGLang 专注于硬件广度与 KV 分配器架构。
- **llama.cpp 是基座，而不仅仅是运行时。** Ollama 和 Unsloth 都直接构建在 `llama-server` 之上（Ollama 的 `spark2_5` 缺口；Unsloth 的 `--parallel N --kv-unified` 拓扑与 `--preempt-ram` 集成）。一个 C++ 代码库如今支撑三个产品层级——这也意味着上游回归（如 #28495）会向外传播到两者。
- **Ollama**——打包/UX 层，终于在添加生产可观测性（Prometheus `/metrics`，PR #16998，比两年前的请求 #3144 晚了不少）。
- **Unsloth**——名义上是微调层，但今日活动几乎完全是*推理编排*：安装器、Strix Halo Vulkan 路由、DGX Spark 拓扑选择、缓存管理。它正战略性地从"训练框架"漂移向"本地 AI 桌面"——本摘要中最值得注意的层级模糊。
- **网关（LiteLLM、New API）**——收入关键的代理层。LiteLLM = 企业支出管理代理（其 bug 是*钱*的 bug）；New API = 带配额/计费的多 provider 中转，外加一个重量级安全里程碑（TOTP/Passkey、scope 绑定证明、rc.34 中的审计日志）。
- **Agent 路由器（Claude Code Router、CC Switch）**——单用户、客户端侧；其失败模式是转换保真度（Responses↔Chat、`tool_call_id` 语义）和破坏性配置文件写入，而非规模。

## 6. 趋势信号

1. **Blackwell 量化正确性技术债是普遍的，而非项目特定的。** FP8/NVFP4 非确定性（vLLM）、SM120/121 崩溃与全 NUL 量化输出（SGLang、Ollama）。*规则：在实际目标芯片上验证量化检查点；H100 通过的工件不可迁移。*
2. **混合线性注意力是新前沿——也是新 bug 农场。** 最难的开放 bug 存在于 **混合注意力 × 前缀缓存 × 推测解码** 的三向交叉点（vLLM #53180/#53504；SGLang #29857；llama.cpp #25618，#27756 中 130k 后的静默 EOS）。预计此处还将有 1–2 个季度的不稳定期。
3. **`/v1/responses` 是网关层最欠加固的 API 表面。** LiteLLM 流式传输它时未记录消费日志（#29913）并可能将 Agent 困在工具调用循环中（#29810）；CCR 在该路径上返回 502（#1762）；CC Switch 的 Responses↔Chat 转换是其最大的 bug 集群。迁移到 Responses API 的 Agent 应预期会遇到粗糙边缘并自带重试。
4. **计费正确性是网关层的成熟度危机。** LiteLLM：未计费的流式流量、缓存读取重复计费、误报的预算耗尽 429。New API：缓存图像重复计费、断连后计费。24 小时内两者同发——立即审计消费日志。
5. **前缀缓存命中率现在是一项财务指标。** 今日的回归代价为 17–27 秒/轮（Ollama）、44 GPU 小时（Unsloth）、12 倍 TTFT（vLLM）以及 42–54% 吞吐（llama.cpp）。将缓存复用视为一等 SLO。
7. **可观测性/安全加固浪潮**：Ollama 指标、llama.cpp `--log-jsonl`、LiteLLM cosign 签名、New API TOTP/审计日志——生态正在同步生产化。
7. **硬件长尾持续加长**（T-Head PPU、Ascend、Strix Halo、Hexagon、RDNA4、MLX）——多供应商部署需要按后端的冒烟门禁。

**给 Agent/应用开发者的关注清单**：固定 SHA，并为每次 chat-template 升级设置工具调用冒烟测试；在正确性关键的 spec decode 路径上使用 bf16 目标（或禁用推测）；在操作 CC Switch 之前备份 `~/.claude/settings.json` 和 `~/.codex/config.toml`（破坏性写入，#1198/#3631 未解决）；从外部监督 Claude Code Router 启动（5 秒硬编码截止在高负载下失败，#1761）；若运行多 slot 统一 KV 拓扑，在发布前针对 llama.cpp #28495 进行显式测试。

---

# Cross-Project AI Infrastructure Report — 2026-09-07

## 1. Ecosystem Overview

The stack is simultaneously shipping fast and paying down correctness debt. Serving engines (vLLM, SGLang) spent the day triaging the collision of three waves — Blackwell silicon (sm120/sm121), low-precision formats (FP8/NVFP4/W4A16), and hybrid linear-attention architectures — which is producing non-determinism, silent output degeneration, and prefix-cache misses rather than simple crashes. llama.cpp shipped **ten point releases in 24 hours**, remaining the highest-cadence project in the ecosystem, while both API gateways (LiteLLM, New API) are fighting billing-correctness bugs — a strong signal that the gateway layer has become revenue-critical infrastructure. Finally, agent workloads (tool calls, long multi-turn sessions, prefix reuse) are now the dominant shaping force at *every* layer: from KV-cache fragmentation fixes in llama.cpp to tool-call translation bugs in CC Switch and startup fragility in Claude Code Router.

## 2. Activity Comparison

| Project | Layer | Issues tracked | PRs tracked | Release status (24h) |
|---|---|---|---|---|
| **vLLM** | Serving engine | ~29 | ~18 | None (zstd container feature declined) |
| **SGLang** | Serving engine | 39 updated | 295 updated | None; CI: 1 broken, 9 flaky, 957 recently fixed |
| **llama.cpp** | Local runtime | ~20 | ~15 | **10 releases** (b10821–b10830) |
| **Ollama** | Local runtime | 3 | 2 | None (metrics PR landed) |
| **LiteLLM** | Gateway / proxy | ~14 | ~8 | **v1.100.0 stable + v1.101.0-rc.1** (cosign-signed) |
| **Unsloth** | Fine-tuning / local serving | ~18 | ~20 | None |
| **Claude Code Router** | Agent router | 2 | 1 | None |
| **CC Switch** | Agent router / switcher | ~20 | ~15 | None |
| **New API** | Gateway / relay | ~8 | ~10 | **v1.0.0-rc.34** (security milestone) |

*Methodology: counts reflect items referenced in each project's digest, not total repo activity; SGLang's counts are explicitly stated in its digest footer. llama.cpp and the two gateways were the only projects to cut releases; engines and fine-tuning layers worked exclusively on `main`.*

## 3. Model Support Race

**Shipped (released) today — llama.cpp leads.** It is the only project that actually *shipped* new architecture support: end-to-end **Spark2_5ForCausalLM** (b10828), a GDN normalization correctness fix affecting all Gated Delta Net models (b10829), and `--fuse-qkv` GGUF conversion (b10830). **HrmText/DFM Mimir 1B** and **Kimi-K3** speculative-decoding state rollback are in flight as open PRs.

**Frontier depth in-flight — vLLM.** Support work for **Qwen3.8-Flash-Next** (QSA sparse attention, #55272) and **DeepSeek-V4** on sm12x (DeepGEMM pin #53680, TileLang fallback #53055) dominates its PR flow, but the headline news is that these newest paths carry the worst open bugs (non-determinism #54521, #53257).

**Hardware breadth — SGLang.** Widest surface area by far: T-Head PPU (ZW810), Ascend Atlas A5 NPU with DSV4, ROCm gfx950 assembly attention (MI355X), Apple Silicon MLX RFC (#32321), and next-gen Xeon CBB topology detection. Its model work (GLM-5.3-Flash, DeepSeek-V4) is currently *stability-bounded*, not capability-bounded — five separate GLM-5.3-Flash bug clusters are open.

**API-only flagships — gateways, instantly.** GPT-6 Astra, Gemini 3.8 Flash, and GLM-5.3 Flash became "supported" the same day via pricing seeds (CC Switch #7162–7164) and capability tables (New API #7211). At this layer, model support is routing/billing metadata, not kernels — but it ships in hours, not weeks.

**Trailing — Ollama.** Its `spark2_5` request (#18195) fails at inference and is blocked on upstream llama.cpp support trickling down — a structural consequence of its position one layer above llama.cpp.

## 4. Performance Frontier

**KV cache and prefix reuse is the single largest concentration of effort** — present in 7 of 9 projects today:

- *SGLang*: four-part KV-cache sharding refactor (#37614 is 1/4), HiCache swap-in planner fix, unified-KV SWA accounting.
- *vLLM*: hybrid-Mamba prefix-cache misses (#53504, #43587, #54094), CPU-offload memory accounting (#54014), connector serialization causing **12× TTFT inflation** on shared 10k prefixes (#44294).
- *llama.cpp*: agentic non-contiguous KV restore (#27991) — but also the day's worst new perf regression: **−42–54% prefill throughput** under `-np 2 --kv-unified` (#28495).
- *Ollama*: MLX prefix-restore rounding wastes **17–27 s per turn** on agent workloads (#18267).
- *Unsloth*: KV preemption for parallel chats (#10301, #10358); one user lost **44 hours of a 48.8 h run** to a disabled prompt cache (#10382).

**Kernels**: vLLM's ROCm MLA decode fusion (RoPE + Q/KV concat + FP8 KV write) and DeepGEMM pinning for sm12x; SGLang's gfx950 assembly attention for EAGLE verify paths; llama.cpp's branchless Q4_K/Q5_K mmvq scale unpack plus RDNA4/Metal M2

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-07

## 1. 今日要点

过去 24 小时没有新版本发布，议题列表主要被 **Blackwell 架构 GPU（sm120/sm121、GB10、B300）上 FP8/NVFP4 Qwen3.x 与 DeepSeek-V4-Flash 模型的非确定性与前缀缓存回归**（#54521、#53257、#55571）占据，同时还有一类 **混合 Mamba/Attention + MTP/DFlash 配置下的前缀缓存未命中问题**（#54094、#53504、#43587）。建设性进展方面，ROCm MLA 算子融合持续推进（#47757、#55230），一批长期挂起的 bug 和重构也终于合并或关闭。

## 2. 版本发布与破坏性变更

*过去 24 小时内没有新版本发布。*

备注：`#28656`「Zstd Docker 镜像」功能请求已被 **关闭**（未实现），目前容器压缩仍默认使用 gzip。

## 3. 新增模型与硬件支持

- **Qwen3.8-Flash-Next（QSA / 稀疏注意力）** — 持续的支持工作。[#55272](https://github.com/vllm-project/vllm/pull/55272) 在 NVIDIA 实现中移除 `torch.compile`，改用 eager 断点以修复 [#54688](https://github.com/vllm-project/vllm/issues/54688)。伴随的 issue [#54521](https://github.com/vllm-project/vllm/issues/54521) 暴露了 prompt 超过 `indexer_budget` 后 `persistent_topk` 的非确定性。
- **DeepSeek-V4 / DSv4** — 多项定向修复落地在 `nv_dev` 分支：[#53680](https://github.com/vllm-project/vllm/pull/53680) 将 DeepGEMM 固定到 `a6b593d`，直至 sm12x 上纯 FP8 1d1d 恢复；[#53522](https://github.com/vllm-project/vllm/pull/53522) 根据实际 DeepGEMM 支持情况对 indexer paged-MQA 元数据进行门控；[#53055](https://github.com/vllm-project/vllm/pull/53055) 为 `mhc_pre_broadcast` 增加 TileLang 回退；[#43146](https://github.com/vllm-project/vllm/pull/43146) 加固 `cutedsl` 探测逻辑。
- **GPT-OSS-120b** — v0.26.0 上 `gpt-oss-120b` 工具调用偶发的 `openai_harmony.HarmonyError`，在 [#51977](https://github.com/vllm-project/vllm/issues/51977) 中跟踪。
- **Transformers v5 / InternVL2** — meta-device 迁移子任务 [#38425](https://github.com/vllm-project/vllm/issues/38425) 仍开放，招募贡献者（help wanted，good first issue）。
- **DFlash2 / DFlash draft heads** — 在 RTX PRO 6000 Blackwell Max-Q [#54094](https://github.com/vllm-project/vllm/issues/54094) 与 H200 [#44889](https://github.com/vllm-project/vllm/issues/44889) 上出现不兼容。
- **LoRA 高秩 MoE** — [#55161](https://github.com/vllm-project/vllm/pull/55161) 在 `max_lora_rank > 128` 时增加优雅回退，修复 [#55158](https://github.com/vllm-project/vllm/issues/55158)。

## 4. 性能与优化

- **MFU/MBU 分析** — [#55624](https://github.com/vllm-project/vllm/pull/55624) 扩展了 `--enable-mfu-metrics` 估算器（关闭 [#38170](https://github.com/vllm-project/vllm/issues/38170)），使滑动窗口注意力与混合 Mamba 层不再被静默地错误建模。
- **ROCm MLA decode 融合** — [#47757](https://github.com/vllm-project/vllm/pull/47757) 与 [`#55230`](https://github.com/vllm-project/vllm/pull/55230) 在 AITER 路径上将 `RoPE + Q/KV concat + FP8 KV-cache write` 合并用于稀疏 MLA；二者共同针对 DeepSeek-R1 每层 decode 准备的热点路径。
- **ROCm Sparse-MLA + MTP** — [#54369](https://github.com/vllm-project/vllm/issues/54369) 指出融合多步 draft decode 不被 `DEEPSEEK_V32_INDEXER`、`KPOOL_TAIL`、`ROCM_AITER_MLA_SPARSE` 支持，将 GLM-5.3-Flash 上可用的 MTP 深度限制在 `k=4`。
- **RDNA 混合 Mamba decode** — [#50264](https://github.com/vllm-project/vllm/issues/50264) 由上游 [#45916](https://github.com/vllm-project/vllm/issues/45916) 的 split-KV decode kernel 现在支持 gfx11 而解锁；其他情况下长上下文从混合注意力回退到 Triton paged attention。
- **AWQ 算子剖析** — [#55462](https://github.com/vllm-project/vllm/issues/55462) 剖析 `gemm_forward_4bit_cuda_m16nXk32`（RTX 3070 Ti）显示严重受 L1/内存带宽瓶颈；等待优化提案。
- **KV 卸载内存核算** — [#54014](https://github.com/vllm-project/vllm/pull/54014) 在 SHM-backed CPU KV 卸载路径上加入 cgroup 内存余量检查（与 `/dev/shm` 并列），防止晚期 OOM kill。
- **DP 协调器存活检测** — [#43611](https://github.com/vllm-project/vllm/pull/43611) 将 DP ZMQ 30 秒超时改为可配置（原先在 [#37452](https://github.com/vllm-project/vllm/pull/37452) 中硬编码）。

## 5. 稳定性与回归

按生产部署潜在影响范围排序。

**高危（正确性 / 确定性）**
- [#54521](https://github.com/vllm-project/vllm/issues/54521) — `Qwen3.8-Flash-Next-FP8`（sm121 / GB10）上 prompt 超过 `indexer_budget` 后贪心解码出现非确定性（33 条评论）。根因：Qwen Sparse Attention prefill 中的 `persistent_topk`。尚无修复 PR。
- [#53257](https://github.com/vllm-project/vllm/issues/53257) — DeepSeek-V4-Flash NVFP4 在 B300 SXM6 上 `temperature=0` 时返回不同输出，差异随并发度上升而放大。
- [#53180](https://github.com/vllm-project/vllm/issues/53180) — `--kv-cache-dtype turboquant_k8v4` 与 MTP 投机解码组合时在混合 GDN 模型上产生*静默*退化文本（v0.27.1）。尚无修复 PR。

**高危（崩溃 / OOM）**
- [#55571](https://github.com/vllm-project/vllm/issues/55571) — RTX PRO 5000（SM120）持续 FP8 负载下出现 Xid 13「Out Of Range Address」/ CUDA 非法内存访问。临时绕过方式为 `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` 或 `--enforce-eager`。
- [#52907](https://github.com/vllm-project/vllm/issues/52907) — **已关闭**，但无明显合并提交 — 使用 Ray executor 时 `in_the_same_node_as()` gloo 屏障出现多节点启动死锁（0.26.1rc1.dev78 → .148 回归）。建议在生产多节点 Ray 部署上重新验证。
- [#44889](https://github.com/vllm-project/vllm/issues/44889) — H200（KServe，v0.22.0）上 Gemma-4-31B-it + DFlash 推测解码器出现 CUDA 非法内存访问。

**中危（正确性 / API）**
- [#54094](https://github.com/vllm-project/vllm/issues/54094) — DFlash2 + YaRN 1.04M prompt：前缀缓存零命中；target-only 复用约 1.039M tokens。RTX PRO 6000 Blackwell Max-Q。
- [#53504](https://github.com/vllm-project/vllm/issues/53504) — 混合 Mamba/GDN 上 MTP 首次重复请求未命中前缀缓存；仅从第二次相同 prompt 开始复用。
- [#43587](https://github.com/vllm-project/vllm/issues/43587) — Qwen3.5 混合模型（V1 engine）上增量多模态请求前缀缓存失败。
- [#39056](https://github.com/vllm-project/vllm/issues/39056) — vLLM 0.19 在 Qwen3.5-35B-A3B-FP8 上，当 XML 工具标记在 `<think>` 内部发出时丢失工具调用（非流式，`qwen3` 推理解析器 + `qwen3_coder` 工具解析器）。
- [#51977](https://github.com/vllm-project/vllm/issues/51977) — `gpt-oss-120b` 工具调用出现 `HarmonyError: unexpected tokens remaining in message header`（v0.26.0，H100）。上游已固定版本；等待 `openai_harmony` 补丁。
- [#44249](https://github.com/vllm-project/vllm/issues/44249) — `lmcache_connector.start_load_kv` 在 LMCache 降级时抛出断言而非回退到重算。
- [#44294](https://github.com/vllm-project/vllm/issues/44294) — `OffloadingConnector._blocks_being_loaded` 将并发请求串行化为单次加载 → 10k token 共享前缀下 TTFT 膨胀 12×。

**中危（有修复但尚未合并）**
- [#42359](https://github.com/vllm-project/vllm/pull/42359) — `FullAttentionManager.cache_blocks()` 中「幽灵块竞争」：在 GPU 前向写出 KV 值*之前*就把前缀块哈希提交到 `BlockPool`。同步骤的 `get_computed_blocks()` 可能误命中。需要 rebase。
- [#47505](https://github.com/vllm-project/vllm/pull/47505) — 在 `num_external_tokens` 上对 `lmcache_mp_connector` 状态转换加守卫，使其在作为 MultiConnector 中未被选中的子连接器时不再劫持加载决策。
- [#42961](https://github.com/vllm-project/vllm/pull/42961) — 对非对象的 JSON 请求体（如 `[]`、`null`、`123`）返回 HTTP 400，而非在管线深处因 `AttributeError` 崩溃。

**已关闭（已验证，不再为待办）**
- [#41865](https://github.com/vllm-project/vllm/issues/41865) — FlashInfer GDN JIT 多 worker 死锁（已关闭）。
- [#41860](https://github.com/vllm-project/vllm/issues/41860) — NIXL Disagg 缺少 GDN 支持（已关闭）。
- [#41864](https://github.com/vllm-project/vllm/issues/41864) — 多节点 PP 在 V1 engine 上被阻塞（已关闭）。
- [#41906](https://github.com/vllm-project/vllm/issues/41906) — `collect_env.py` 在 macOS/Windows 上崩溃；在 [#41998](https://github.com/vllm-project/vllm/pull/41998) 中修复（assert → 提前 `return None`）。
- [#41843](https://github.com/vllm-project/vllm/issues/41843) — DeepStream 视频加载后端 RFC（已关闭）。
- [#41768](https://github.com/vllm-project/vllm/pull/41768) — 在拒绝采样目标 logits 之前的 spec-decode 思考状态再同步（关闭 [#41758](https://github.com/vllm-project/vllm/issues/41758) 中关于贪心/ngram 发散的问题）。
- [#41936](https://github.com/vllm-project/vllm/pull/41936) — 移除了 `Qwen3ASRDummyInputsBuilder` 中 30 秒音频上限，原本低估了 encoder-cache 剖析预算。

## 6. 对应用开发者的意义

- **在 Blackwell 上谨慎固定版本。** 如果你使用的是 RTX PRO 5000/6000（SM

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-07

## 今日要点

今天的动态主要集中在 **GLM-5.3-Flash 在多个后端（DSA on H100、SM120 Blackwell、PPC 以及 HiCache）上的稳定性工作**，以及 **Apple Silicon 上的持续进展** —— 既有长期路线图（#19137），也有新的 Torch 主导 SRT 路径及其导出的 MLX region（#32321），两者均有更新。在 kernel/运行时方面，一个大型测试清理 PR 净减 **11.4K 行**（#37436）合入，而四部分 KV-cache 分片系列的第一部分交付了逻辑页索引空间（#37614）。

## 发布与破坏性变更

过去 24 小时内无新发布。来自追踪 issue #17050 的 CI 快照（2026-09-07 01:35 UTC 自动更新）：**1 broken, 9 flaky, 957 recently fixed**。

一个文档 PR（#38242）指出 `--cuda-graph-max-bs` 和 `--cuda-graph-bs` 是 `DeprecatedAliasStoreAction` 别名，并将文档更新为优先使用 `--cuda-graph-*-decode`。建议审查启动脚本。

## 新增模型与硬件支持

- **T-Head PPU**（ZW810 / ZW810E / ZW-M890P）—— 新开放的上游化路线图（#37519）。
- **NPU Atlas A5** —— 通过 #37373 推进在 DeepSeek-V4 路径上的一等支持及增强的 DSV4 处理。
- **LongCat 2.0（1.6T INT8）** 在 Ascend NPU 上使用 4 节点 Atlas 800I A3 集群 —— issue #30224 因不活跃而关闭（部署说明已合入代码树）。
- **MLX / Apple Silicon** —— 带导出整模型 MLX region 的 torch 主导 SRT 路径 RFC（#32321）已更新；实现在 #36164 中跟踪。
- **Intel XPU 2026Q2** 路线图（#24922）在季度结束后因不活跃而关闭。
- ROCm **gfx950 汇编 attention** 用于 EAGLE verify/draft-extend/decode（MI355X），见 #37465 —— 目标为 head dim 256 的 Qwen3.5-397B FP8 KV。
- ROCm/AMD **可中断 CUDA graph prefill** 用于 DeepSeek-V4 HIP radix 后端（#37810）。
- CPU **Compute Building Block（CBB）** 核心拓扑检测，面向下一代 Xeon，见 #36850。

## 性能与优化

- **Sliding window + per-head sinks** 在 Triton varlen prefill attention 中 —— #38142 落地 `window_size=(left, right)` 距离掩码，并在两端收紧 KV-block 循环。
- **HiSparse swap-in 规划器在 `swap_in_block_size 512` 以下的修复** —— #38243 修正 `load_cache_to_device_buffer_kernel` 中的前缀扫描损坏（warp-0 chunk counter 不一致）。
- **Unified-KV SWA per-request ring** 运行时记账用于 AMD DSV4 —— #31040（已关闭）在 #30315（pool 容量）和 #29168（HiSparse 设备池）之后完成运行时侧工作。
- **HiCache 针对 PP 的 all-reduce 削减** —— #37562 将 #30511 的优化适配到流水线并行部署。
- **KV-cache 分片系列（1/4）** —— #37614 将逻辑页放置引入为纯算术 + 分配器，不挂任何服务端 flag，因此在剩余三个 PR 合入前运行时不可见。
- **HiCache `@rank_consensus` 推广** —— #37425 为 HiCache 函数添加校验器，并在 `test/registered/hicache` 和 `test/registered/radix_cache/unified_radix_tree` 中启用检查器。
- **Diffusion LongLive2 warmup 噪声** —— #38226 抑制每个候选的 Wan/causal-frame 警告刷屏。
- **Diffusion 2-GPU CI 重新平衡** —— #38239 通过重新分片将 `multimodal-gen-test-2-gpu` 的超时从 4h 缩短到 45min（观察到 32/17/21min 的分布）。
- **测试整合** —— #37436 将 #37428/#37429/#37433 合并为一个 diff：**201 文件，−12,636 / +1,186 = 净 −11,450 行**。

## 稳定性与回归

按潜在影响半径排列：

1. **GLM-5.3-Flash（DSA）HiCache host-tier load-back 损坏**（#38031）—— 在 8×H100 TP8 上丢工具调用并出现退化的重复循环，无需 speculative decoding 即可复现。多个相关 bug 在 #37524 中跟踪。
2. **GLM-5.3-Flash 在 PP 下启动崩溃**（#36906）—— 流水线并行初始化期间出现 `KeyError: 'residual'`。
3. **GLM-5.3-Flash on RTX PRO 6000（SM120）**（#37105）—— 早期 `deep_gemm` NameError 之后遗留的两个 DSA 后端阻塞；追踪 issue #37813。
4. **GLM-5.3-Flash DPC 崩溃**（#38207）—— 今天新开。
5. **DeepSeek-V4 长上下文 prefill OOB**（#37892）—— DSA indexer `topk_v1.cuh:348` 中的非法内存访问；paged prefill 路径无法路由到 v2 kernel。**尚未关联修复 PR。**
6. **DeepSeek-V4-Flash-0731 `reasoning_effort` 映射**（#33185）—— `high` 是 no-op，vendor 的 `max` 在 v0.5.16 和当前 `main` 上不可达。
7. **Qwen3.8-Flash-Next NEXTN/MTP 接受率衰减**（#37326）—— 在 `qwen4_exp` 上随服务端运行时间 draft 接受率衰减至约 0；仅重启可完全恢复。
8. **MiniMax-M3 W4A16（compressed-tensors）在 SM121 sparse 路径上全 NUL 输出**（#38143）—— 服务正常但每个 token 都是 id 0，在 2× DGX Spark TP=2 上；同一权重在 vLLM 上行为正常。尚未在 v0.5.19 上重新验证。
9. **v0.5.14 EAGLE/MTP + hybrid GDN（Qwen3.6-27B NVFP4）KV pool 配置不足**（#29857）—— 约 50 GB VRAM 闲置，容量受限。
11. **MLX `SchedulerProfilerManager._start_profile` 在 mock 的 Metal capture 下返回 `success=False`**（#30550）—— 可能仅限 CI。
12. **v0.5.13 Mamba `set_mamba_track_indices_from_reqs` 在 Spec v2 + EAGLE 下出现 NoneType 崩溃**（#28484）—— 已关闭（不活跃）。
13. **H3 参考音频在重复请求上的不稳定性**（#38225）—— profiling 变更后 `snake` 激活图切换影响输出确定性。已关闭。

## 对应用开发者意味着什么

- **如果你在服务 GLM-5.3-Flash，暂缓升级路径。** Bug 横跨 DSA prefill、PP 启动、SM120、HiCache host-tier 和 DPC。以追踪 issue #37524 作为把关门控。#38031 尤为关键 —— 即使禁用 EAGLE 也会损坏生成，因此单靠禁用 EAGLE 并不足以规避。
- **DeepSeek-V4 长上下文用户应在推送最新 `main` 前针对 #37892 显式测试** —— 目前尚无修复 PR，paged prefill 路径也无法绕开该坏 kernel。
- **如果你依赖 `--speculative-adaptive` 或 sglang-dspark 分支**，请停留在最后一个已知-good版本上。#30549（共享 logits 缓冲区）和 #30555（draft-worker OOB KV）虽已关闭但已修复，值得确认它们在你锁定的版本中。
- **如果你在下一代 Xeon 上以 CPU 模式使用 SGLang**，#36850 中的 CBB 自动检测会改变核心划分方式 —— 若你绑定 NUMA 布局，请重新基准测试。
- **KV cache 分片正处于一个四 PR 重构的中段**（#37614 为 1/4）。在 `main` 上暂不会有行为变化，但接下来三个 PR 将改变分配器语义；若你的运行接近内存池上限，请锁定 SHA。
- **#38242 中的纯文档弃用**目前可以安全忽略，但会有一版带警告噪声的发布 —— 方便时清理你的启动脚本。
- **MLX / Apple Silicon 在实际意义上仍是预发布状态。** 2026 Q2 路线图（#19137）和新 RFC（#32321）都围绕如何获得真正的服务路径展开；若你依赖 Apple 硬件，目前请按研究模式体验来规划。
- **量化边缘情况在 SM120/SM121 上落地较重** —— W4A16 和 NVFP4 路径均有未解决的 bug。请在实际目标硅片上验证你的 compressed-tensors 和 FP4 checkpoint，而不仅仅在 H100 上。

---

*基于 `sgl-project/sglang` 在 2026-09-06/07 更新的 39 个 issue 和 295 个 PR 生成。按评论数排名的前 30 个 issue 和前 20 个 PR 已审阅。*

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 每日速览 — 2026-09-07

## 今日要点

过去 24 小时内集中发布了十个补丁版本（b10821–b10830），其中最受关注的是 **Spark2_5 模型支持**（#27868）、**Gated Delta Net（GDN）归一化的正确性修复**（将 `max` 切换为 `rsqrt`，#28068），以及 **`mmid`/`mmf` 中的 CUDA 竞态修复**（#28475）。在路线图方面，ggerganov 关于预填充/解码分离服务器的 issue（#21266）以及新的 Kimi-K3 循环状态回滚 PR（#28466），都表明面向线性-attention 架构的投机解码支持正在趋于成熟。

## 发布与破坏性变更

过去 24 小时内发布了十个二进制版本；看似没有引入破坏性的 C/C++ API 变更，但有几项对用户可见：

- **b10830** — `convert`：新增 `--fuse-qkv` 标志，在 HF→GGUF 转换过程中融合 Q/K/V 投影层（#22780）。
- **b10829** — `models`：按照 flash-linear-attention 定义，将 q/k 归一化从 `max` 更正为 `rsqrt`（#28068）。建议针对 Gated Delta Net 模型对照早期版本校验量化输出。
- **b10828** — 新增架构：**Spark2_5ForCausalLM** 端到端支持（#27868）。涵盖转换、张量映射、分词器预分词以及推理图。
- **b10827** — `opencl`：修正 `q4_K`/`q5_K` `mul_mat` 的权重打包选择（#28402）。
- **b10826** — `cuda`：修复 `mmid` 和 `mmf` 中的竞态条件（#28475）。
- **b10825** — `grammar`：修复最大重复阈值（#28469）。在高重复场景下可能改变约束输出解码的行为。
- **b10823** — `common`：新增 `--log-jsonl` 标志，用于结构化日志（#28437）。对运维/SRE 流水线很有用。
- **b10822** — UI 资源现在通过 CMake 直接嵌入，移除了外部 gzip 辅助工具（#28445）。简化了交叉编译流程。
- **b10821** — `metal`：完成 **M2 Max** 其余 `fa-vec` flash-attention 调优（#28458）。

## 新增模型与硬件支持

- **Spark2_5ForCausalLM** — 在 b10828 中新增完整 GGUF/推理流水线（#27868）。
- **HrmTextForCausalLM（DFM Mimir 1B）** — 高低 Transformer 层交替循环，融合 `gqkv` 映射（#27625）。PR 仍开放。
- **Kimi-K3** — 围绕投机解码的有界循环状态回滚工作持续推进（#28466）。
- **RDNA 4 / gfx1200 / gfx1201** — 多 PR 调优组合：
  - 通过 HIP 修复 Q6_K / Q2_K 的 mmq 问题并更新条件（#25940）。
  - 针对 RDNA 4 上 K 量化的 MMVQ warp 调优（#24386）。
  - 在 gfx1201（R9700 PRO）上做 flash-attention 调优，并修复了通用 CUDA FA 中 HS=256 的 bug（#28102）。
- **Hexagon（HTP）** — 批处理缓冲区边界断言前移至 `n_bufs++` 之前；修正跨步拷贝快速路径（#28516）。
- **WebUI/PWA** — Service Worker 缓存不再固定活性（liveness）端点（#28508）。

## 性能与优化

- **CUDA Q4_K/Q5_K mmvq**（#26705）— 无分支的 scale 解包消除了 batch size > 1 时每列 scale 重新解包的开销；Spark 路径加入了预取。吞吐量具体数字待 PR 中基准发布。
- **KV 缓存非连续单元恢复**（#27991，已合并）— 面向代理类负载的优化，针对工具返回结果碎片化 KV 缓存的场景；动机来自 qwen3.5-Claude-Code 用例。
- **RDNA 4 MMVQ**（#24386）— 在 gfx1200 上对 Q4_K_M GGUF 模型测得单 token 解码吞吐量提升；其他量化类型未变化。
- **R9700 PRO flash-attention**（#28102）— 用户反馈的瓶颈在长上下文预填充；本次新调优针对该场景，并修复了 HS=256 内核 bug。
- **Metal M2 Max fa-vec**（#28458 → b10821）— 完成 M2 Max 的调优矩阵。
- **MLSys/mtmd**（#28517）— 分片 `mmproj` GGUF 加载现在支持 `clip_model_loader`，使得通过 `llama-gguf-split` 拆分的多模态模型投影器成为可能。
- **WebUI** — Service Worker 缓存排除活性端点，避免 UI 在服务器已死的情况下仍显示为已连接（#28508）。

## 稳定性与回归

按用户影响/评论量大致排序：

- **#28495（新开放）** — `llama-server -np 2 --kv-unified`：在单 GPU、无 spill、无投机解码的情况下，**从第二个长请求开始** prompt 处理吞吐量下降 **42–54%**。报告者将原因定位为 CUDA/HIP flash-attention 内核对 unified-KV 的限制——只屏蔽尾部 cells，而非内部的全 `-INF` 块。对并发请求负载：**高**严重度。
- **#20837（开放，60 条评论）** — 在 thinking 模式启用时，Qwen3.5 9B 将工具调用输出在 `<think>` 块内并停止生成；输出 XML 包裹而非原生工具调用 token。社区长期痛点。
- **#23577（开放，32 条评论）** — Qwen3.6 27B 的多 token 预测（MTP）在长会话后会产生重复的 `////`。
- **#27756（开放）** — Qwen3.5-hybrid 64 层 DeltaNet 模型（如 Qwen3.8-27B）在 CUDA 与 CPU 上约 130k 上下文之后出现静默瞬时 EOS；与循环状态深度 × 层数的劣化相关。
- **#26845（开放，11 条评论）** — SYCL 后端在 Intel Arc Pro B60 上处理第二个 prompt 时输出乱码。
- **#26382（开放，10 条评论）** — 使用 `-ctk q5_1` 但不指定 `-ctv` 加载 GLM-5.2 时，会强制对没有 V 缓存的模型使用同一类型作为 V 缓存。
- **#25618（开放，21 条评论）** — 投机解码（draft-MTP / draft-DSpark）在**量化目标**上与 vanilla 在贪心采样下发生分歧；bf16 下表现一致。N-gram 投机不受影响。
- **#27217（开放）** — `tool_choice: "required"` 在带有 `supports_preserve_reasoning: true` 的模板上被接受但未强制执行。对 OpenAI 兼容的代理栈有影响。
- **#27981（开放，8 条评论）** — `llama-ui` 桌面端：推理等级选择菜单无法打开。
- **#28336（开放）** — 浏览器 UI 的 SVG 输出在屏幕上渲染缺失部分，但字节内容正确（仅显示问题）。
- **#20141（已关闭）** — M4 Pro / Tahoe 26.3 上 `ggml_metal_synchronize` "无辜受害者"崩溃（误关）。
- **#24684（已关闭）** — `--fit on` + `--sleep-idle-seconds` 在已设置 `tensor_buft_overrides` 时中止；修复 PR 此前已合并。
- **#25746（已关闭）** — json-schema-to-grammar 嵌套 `maxLength ≥ 2000` 在工具调用中生成无法解析的 GBNF（b10034）。
- **#25808（已关闭）** — `GGML_SYCL_DEVICE_ARCH=xe2` 启动时段错误。

**今日合入了两项重要的正确性修复**：GDN `max→rsqrt`（b10829）以及 CUDA `mmid`/`mmf` 竞态（b10826）。运行 Gated Delta Net 模型的用户应重新对照参考结果验证输出。PR **#28523** 还修复了 NumPy 1.x 宽张量符号位丢失的回归问题，影响 Q8_0/TQ1_0/TQ2_0 量化（解决 #28438）。

## 对应用开发者的意义

- **代理/工具调用可靠性仍然不太平**。Issue #20837（Qwen3.5 工具调用出现在 thinking 块内）、#27217（`tool_choice: required` 在 `supports_preserve_reasoning` 下未强制执行），加上 b10825 的 grammar 修复，都表明跨模板的工具调用链依然脆弱。如果你正在发布代理产品，请固定到具体 commit，在自有工具调用规范化层后面再加一层，并对每次 chat 模板升级做端到端测试。
- **量化目标 + 投机解码对部分 draft 模型并不安全**（#25618）。使用 draft-MTP/draft-DSpark 时，优先选择 bf16 目标，或在生产正确性路径中禁用投机解码。
- **`--log-jsonl`**（b10823）现已成为一等公民——若此前曾抓取 stdout 来获取结构化事件，请接入到日志聚合管线中。
- **`--fuse-qkv`**（b10830）可减小 checkpoint 体积并加速那些在 HF checkpoint 中将 Q/K/V 拆分的预填充流程；重新导出 GGUF 即可受益。
- **WebUI PWA 注意事项** — 在用户清除旧 service worker 之前，UI 可能会在服务器已死时仍显示为已连接（#28508）。请在发布 Runbook 中加入手动缓存清理步骤。
- **线性 attention 长上下文是当前主战场** — Qwen3.5-hybrid / Kimi-K3 / Spark2_5 相关 PR 都在同一时间窗口内合并或推进。可以预期这里会有快速迭代；同时也会先出现一些不稳定现象（静默 EOS、MTP 分歧、工具调用解析等）。
- **GPU 后端多样性正在显现价值** — RDNA 4 / Hexagon / Metal M2 Max 今天都有改进，且每个后端仍存在开放的正确性问题（RDNA 4 Vulkan 拆分 #25884；Hexagon buffer/dispatch 修复 #28516；SYCL 多 GPU OpenCL 崩溃 #27168）。对于多供应商部署，请按后端冒烟测试作为发布门禁。

---

*来源：[ggml-org/llama.cpp](https://github.com/ggml-org/llama.cpp) 发布、issue 与 PR，更新于 2026-09-07。*

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-07

## 今日要点
- 期待已久的 **Prometheus `/metrics` 端点**随 [PR #16998](https://github.com/ollama/ollama/pull/16998) 落地，终于响应了 [#3144](https://github.com/ollama/ollama/issues/3144) 中长达 2 年的请求——通过 `OLLAMA_METRICS=1` 启用。
- 一个 **MLX runner 回归问题**导致每次冷启动 prompt 时浪费 17–27 秒的重新预填充（re-prefill），因为前缀缓存恢复点被向下取整到 8192 的倍数（[#18267](https://github.com/ollama/ollama/issues/18267)）——对本地 agent 工作负载而言是显著的逐轮延迟开销。
- 过去 24 小时内，针对 **Blackwell (sm_120)** 和 **AMD Vulkan** 后端的稳定性报告集中出现，包括 flash-attention warmup 崩溃以及大模型上的 command-buffer OOM。

## 发布与重大变更
_过去 24 小时内无新发布。_

## 新模型与硬件支持
- **新架构请求 — `spark2_5`**（[#18195](https://github.com/ollama/ollama/issues/18195)）：原生支持 SparkLLM/Spark-X2.5 系列（4B 和 1.7B）。下载成功但推理失败，因为运行时尚未识别该架构。👍4。
- **Blackwell (sm_120) 适配仍在排查中**：在 RTX 5070 Ti Laptop 上，`qwen3-coder:30b` 自动启用 flash-attention 后在 warmup 阶段崩溃，导致 `llama-server` 挂掉，尽管显存足以容纳模型（[#18276](https://github.com/ollama/ollama/issues/18276)）。看起来是 sm_120 特有的 FA-2 初始化 bug，并非真正的 OOM。
- **AMD iGPU / Vulkan 路径**：从 v0.32.12 开始，AMD iGPU 上 66 GB 的模型出现 "Not enough memory for command submission" 错误（最后正常工作的版本：v0.32.9）（[#18272](https://github.com/ollama/ollama/issues/18272)）。可能与最近的 Vulkan 缓冲区统计变更有关。

## 性能与优化
- **PR #16998 — `/metrics` 端点**（[#16998](https://github.com/ollama/ollama/pull/16998)）：可选启用的 Prometheus 兼容指标，包括 `ollama_requests_queued`、`ollama_queue_capacity`、`ollama_models_loaded`、`http_requests_total`，以及按模型/token 的计数器。是生产可观测性的基石。
- **PR #18271 — renderer 消息分隔符**（[#18271](https://github.com/ollama/ollama/pull/18271)）：将 `message_delimiters` 从 Go renderer 转发至 `llama-server` 的 `/completion`，以便在用户轮次边界处设置上下文检查点，从而在长 agent 会话中启用增量解码。
- **MLX 前缀缓存回归**（[#18267](https://github.com/ollama/ollama/issues/18267)）：恢复点被向下取整到 8192 的倍数，导致任何冷启动预填充之后的下一轮最多需重新预填充 8191 个 token——在针对本地模型的 Claude-Code 风格 agent 负载下，每轮固定造成 **17–27 秒**的延迟惩罚。暂无修复 PR。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-07

## 1. 今日要点

LiteLLM 发布了 **v1.100.0（稳定版）** 并发布了 **v1.101.0-rc.1**（均经过 cosign 签名）。今天的主题是**计费正确性**：有四个活跃 issue 报告流量未计费或计费错误 —— 流式 `/v1/responses` 请求完全跳过消费日志、自定义定价模型计费为 $0、Anthropic 缓存读取被重复计费、以及虚假的"预算已超限"循环阻塞 Claude Code 客户端。针对 DeepSeek CCR 流转换（#40075）和 Azure MAI 图像生成参数校验（#40074）的新修复 PR 已合并。

## 2. 版本发布与破坏性变更

- **v1.101.0-rc.1**

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 日报 — 2026-09-07

## 今日要点

今天的更新以面向消费级和边缘硬件的 **Studio 加固工作**为主：AMD Strix Halo (gfx1150/gfx1151) 核显现在会自动路由到 Vulkan 版 llama.cpp 预编译包而非 ROCm；搭载 NVIDIA GB10/N1X 的 ARM 版 Windows 笔记本获得了原生 ARM64 CUDA 安装路径；此外，新增的 KV 抢占层让并行的 Studio 会话共享单个 llama-server 缓存，而不再互相驱逐。幕后方面，团队还合入了 `engine_stats` 吞吐量上报的准确性修复，以及一个用于探测 Smart App Control 代码完整性拦截的 Windows 探针——这两个问题此前都在悄悄地误导用户。

## 版本发布与破坏性变更

过去 24 小时没有新版本发布。

## 新模型与硬件支持

- **AMD Strix Halo (gfx1150/gfx1151) → Vulkan llama.cpp 后端**：Studio 现在会在 Radeon 核显上安装 Vulkan 预编译版本，因为 Vulkan 在该平台上实测性能明显优于 ROCm。已有的 ROCm 安装会收到应用内升级横幅提示。[PR #10381](https://github.com/unslothai/unsloth/pull/10381)
- **Windows on ARM + NVIDIA (GB10 / N1X / RTX Spark)**：`install.ps1` 之前把所有 ARM64 Windows 主机一律当作纯 CPU 设备处理。此变更在 NVIDIA 主机上加入原生 ARM64 CUDA 栈，且不改变其他架构的行为。[PR #10282](https://github.com/unslothai/unsloth/pull/10282)
- **全新 macOS 安装上的 MLX 栈**：`SKIP_STUDIO_BASE=1` 标志此前会无意间跳过 MLX 依赖安装环节，导致 Apple Silicon 安装停留在仅聊天模式。现在全新训练安装会正常执行 MLX 步骤。[PR #10403](https://github.com/unslothai/unsloth/pull/10403)
- **DGX Spark 双机配对服务拓扑**：在配对的 DGX Spark 上加载 GGUF 时，Studio/Desktop 现在会从 `spark_cluster.recommend_topology` 提供的三种服务拓扑中择一，并配合异步副本路由器，只要工作负载允许，两个节点便可同时工作。[PR #10323](https://github.com/unslothai/unsloth/pull/10323)
- **Docker aarch64 镜像**（功能请求已关闭；本批次未说明镜像的合并状态）。[Issue #4198](https://github.com/unslothai/unsloth/issues/4198)

## 性能与优化

- **并行 Studio 会话的 KV 抢占**：现在以 `--parallel N --kv-unified -c N` 启动单个 llama-server，让 N 个槽位共享同一份 KV 缓存，各自单独放得下的会话不再互相驱逐。当前的守卫条件 `prompt_tokens < slot.n_ctx` 正被真正的容量检查所取代。[PR #10301](https://github.com/unslothai/unsloth/pull/10301)
- **llama-server 原生槽位驻留（slot parking）**：当服务端支持 `--preempt-ram`（配合 unslothai/llama.cpp#184/#190）时，Studio 会舍弃自有的抢占层，让每个会话都能使用完整的上下文窗口——对高并发聊天而言，这是实打实的吞吐与尾延迟收益。[PR #10358](https://github.com/unslothai/unsloth/pull/10358)
- **核显上的提示词缓存保留**：Windows 完全卸载（full-offload）调优路径此前会全局禁用 llama-server 的提示词缓存，导致一位 Strix Halo 用户在单次 48.8 小时的运行中损失了 44 小时。现在共享内存 GPU 上的缓存会得到保留。[PR #10382](https://github.com/unslothai/unsloth/pull/10382)
- **Kaggle CI 调度修复**：此前采用轮询循环的 runner 曾在一次 4 分钟的构建/推送期间把 Kaggle 节点占用了 **41.5 分钟**，现正被替换为“入队 + 稍后收取”的流程。[PR #10183](https://github.com/unslothai/unsloth/pull/10183)
- **uv 缓存对齐**：`install.sh`、`install.ps1` 和 `storage_roots._setup_cache_env` 之前各自独立选取 `UV_CACHE_DIR`；`unsloth studio update` 现在会读取后端实际使用的缓存，避免不必要的重复下载。[PR #10386](https://github.com/unslothai/unsloth/pull/10386)，[PR #10410](https://github.com/unslothai/unsloth/pull/10410)
- **打开 UI 菜单不再冻结页面**：侧边栏、会话行和项目菜单此前在展开时会锁定布局；现已重构为非阻塞方式。[PR #10262](https://github.com/unslothai/unsloth/pull/10262)

## 稳定性与回归

**未关闭 / 未解决：**
- **Qwen3.5-9B 始终无法进行到第一步；Gemma-4-26B-A4B 在 96 GB 显存下 QLoRA bs=1 依然 OOM**（[Issue #7203](https://github.com/unslothai/unsloth/issues/7203)）——这是在当前代 RTX Pro 6000 上出现的两个值得关注的训练路径失败。它也是按活跃度排名前 30 的 issue 中唯一一个仍处于 OPEN 状态的，对新上手用户而言最有必要跟进。

**近期已关闭、值得向团队通报的 bug：**
- **Qwen3.5 packing 场景下第 1 步即出现 NaN 梯度范数**——仅在 packing 时出现；instruct 与 base 变体不受影响。[Issue #4160](https://github.com/unslothai/unsloth/issues/4160)
- **通过 FastLanguageModel 加载 gpt-oss 时 `GptOssTopKRouter` 缺少 `weight`**。[Issue #3729](https://github.com/unslothai/unsloth/issues/3729)
- **Qwen3-235B 上的 Triton CPU 张量指针错误**，出现在 `device_map="balanced"` 且 4-bit 加载时。[Issue #4137](https://github.com/unslothai/unsloth/issues/4137)
- **Gemma-4-12B GGUF UD-Q4_K_XL 在 llama-server 中加载失败**（16 GB 显存不足）。[Issue #6022](https://github.com/unslothai/unsloth/issues/6022)
- **Gemma3 微调**在 A100 对话式 notebook 上出现 ConstantVariable 错误。[Issue #3996](https://github.com/unslothai/unsloth/issues/3996)
- **DeepSeek-OCR** 无法通过 `FastVisionModel` 加载。[Issue #3670](https://github.com/unslothai/unsloth/issues/3670)
- **Nemotron-3 Nano** 在 H200 上 merge-to-LoRA 失败。[Issue #3854](https://github.com/unslothai/unsloth/issues/3854)
- **PyTorch Inductor `PY_SSIZE_T_CLEAN` 宏错误**，发生在 CUDA 12.6 / Python 3.10–3.12 环境下的 VLM 训练中。[Issue #2230](https://github.com/unslothai/unsloth/issues/2230)
- **Windows 安装器在纯 CPU 机器上失败**（默认路径和 `--no-torch` 路径均如此）。[Issue #5008](https://github.com/unslothai/unsloth/issues/5008)

**新近上报 / 已修复的基础设施正确性问题：**
- **`engine_stats` 在 Strix Halo 上几乎一直上报 0 tok/s，且两次上报了超出硬件能力的速率**——Studio 的吞吐量指标实际上是在说谎。[PR #10384](https://github.com/unslothai/unsloth/pull/10384)
- **四条具有误导性的加载/更新错误消息**把失败归因到了错误的层面（模型 vs. 构建 vs. 内存 vs. 架构）。每一条都附有具体的日志证据说明。[PR #10383](https://github.com/unslothai/unsloth/pull/10383)
- **Smart App Control 拦截 `llama-server.exe`**，在 `llama-common` 上报 “Bad Image” 状态。正在加入 Windows 探针和 CI 签名审计。[PR #10408](https://github.com/unslothai/unsloth/pull/10408)
- **全新 NVIDIA 安装上 `torchcodec` ↔ `torch` 版本不匹配**：兼容性守卫放行了 `torch-2.11.0+cu128`，却没有给出任何提示；现在改为按 torch 次版本号（minor）进行固定。[PR #7474](https://github.com/unslothai/unsloth/pull/7474)
- **`push_to_ollama` 调用 `create_ollama_modelfile` 时传入了一个已被移除的关键字参数**（`gguf_location`）——在 API 边界处就已经坏了。[PR #10304](https://github.com/unslothai/unsloth/pull/10304)
- **MLX 自愈机制会改写 `--no-torch` 安装**——Apple Silicon 纯 CPU 安装在首次启动时被静默升级为具备训练能力的栈；现在会尊重 `--no-torch` 的选择。[PR #10409](https://github.com/unslothai/unsloth/pull/10409)
- **Composer 发送/停止图标在非 Retina 缩放级别下错位**——已修复并通过 Playwright 验证。[PR #10405](https://github.com/unslothai/unsloth/pull/10405)，[PR #10407](https://github.com/unslothai/unsloth/pull/10407)
- **Docker 卷（volume）使用说明**已在文档中更正。[Issue #4396](https://github.com/unslothai/unsloth/issues/4396)
- **DGX Spark 报 “no GPU detected”** 的手动路径已修复。[Issue #3553](https://github.com/unslothai/unsloth/issues/3553)
- **智能体/工具对话轮次现在可以在浏览器关闭后保留**；重新打开时工具卡片和偏移量会精确重放，中途离开的会话会被标记为 `interrupted`。[PR #10365](https://github.com/unslothai/unsloth/pull/10365)
- **Studio 中的 Ollama 模型清单（inventory）**此前会赋错 `source`、导致 schema 崩溃并丢失模型——现已修复。[Issue #9986](https://github.com/unslothai/unsloth/issues/9986)

## 这对应用开发者意味着什么

- **边缘 / 消费级硬件部署获得更一等公民的支持**：Strix Halo 和 ARM 版 Windows 的 NVIDIA 笔记本现在是真正受支持的安装目标，而不再是“尽力而为”的路径。如果你在交付本地优先的智能体，请在推荐该配置前先针对 Vulkan + 核显提示词缓存这条路径做验证。
- **多会话 Studio 部署将迎来实打实的尾延迟收益**：KV 抢占（[#10301](https://github.com/unslothai/unsloth/pull/10301)、[#10358](https://github.com/unslothai/unsloth/pull/10358)）意味着并行用户不再互相驱逐；这些改动落地后，共享 Studio 实例上每美元的有效吞吐量有望显著提升。
- **不要相信旧版 Studio 构建的 `engine_stats` 数值**：吞吐遥测既存在低报也存在高报。如果你曾将其用于 SLO/成本看板，请把历史数据视为不可靠，并在 [#10384](https://github.com/unslothai/unsloth/pull/10384) 合入你安装的版本后重新建立基线。
- **发布前需核查的两个已知训练隐患**：Qwen3.5 + packing 出现 NaN（[#4160](https://github.com/unslothai/unsloth/issues/4160)）以及 Qwen3.5-9B 无法完成第 1 步（[#7203](https://github.com/unslothai/unsloth/issues/7203)）。如果你的流水线同时涉及这两者，请加一个冒烟测试步骤。
- **`push_to_ollama` 曾在 create-modelfile 边界处静默失效**（[#10304](https://github.com/unslothai/unsloth/pull/10304)）——如果你的工具链依赖这条路径，请固定到包含修复的构建版本，并对 Ollama 导出做端到端重新验证。
- **Windows 上的 Smart App Control** 即使在安装成功后也可能静默拦截 `llama-server.exe`；请据此提醒 Windows 用户，并持续关注 [#10408](https://github.com/unslothai/unsloth/pull/10408) 以获取正式修复。
- **智能体 UI**：工具循环流现在可以在标签页关闭后持久保留，并以正确的偏移量重放（[#10365](https://github.com/unslothai/unsloth/pull/10365)）。如果你基于 Studio 的聊天界面进行构建，不再需要为中途离开的场景自行设计恢复重放协议。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — 每日摘要
**日期：** 2026-09-07
**仓库：** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. 今日要点

今日活动较为平缓，但聚焦于运维相关问题：有一个开放 PR（#1763）修复了一个 UX 缺陷，即编辑已有 Claude Code 提供商时模型列表返回为空；同时有两个新提交的 issue（#1761、#1762）反映了托管核心网关在 3456 端口上的启动超时和上游 502 故障。对运维人员而言，净影响是：本地代理提供商的现有编辑功能不可用，且网关在中等主机负载下表现脆弱。

---

## 2. 发布与重大变更

*过去 24 小时内无新发布。* 无版本标签、配置格式变更或迁移说明需要通报。

---

## 3. 新增模型与硬件支持

*无新增模型、后端（CUDA/ROCm/Metal/CPU）或量化格式的相关报告。*

---

## 4. 性能与优化

头条事项是 [Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761) 中提出的网关启动超时问题。当前实现对子网关接受其运行时配置使用 **5 秒硬编码超时**，这将父事件循环的拥塞与子进程的就绪状态混为一谈。在中等负载的主机上，该超时经常被触发，导致每次重启/启动都会失败，即便管理平面（端口 3458）状态正常。合理的修复方案可能包括将超时设为可配置项，以及/或者将就绪信号与父事件循环的延迟解耦 —— 目前尚未关联 PR，因此这仍属于开放的设计工作，而非已落地的性能改进。

---

## 5. 稳定性与回归问题

按可能的运维影响排序：

1. **[高] 主机负载下网关启动失败** — [Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761)
   - 现象：每次重启都出现 `Core gateway did not accept runtime config within 5000ms`。
   - 根因：硬编码的 5 秒超时是相对于父事件循环计时的，而父事件循环自身可能正处拥塞状态；这并非子进程真实就绪的有效信号。
   - 缓解措施：仓库内暂无方案；在繁忙主机上运行的运维人员将反复遇到启动失败。
   - 修复 PR：**暂无开放 PR**。

2. **[中] `/v1/responses`（codex 路径）返回 502 Bad Gateway** — [Issue #1762](https://github.com/musistudio/claude-code-router/issues/1762)
   - 现象：`unexpected status 502 Bad Gateway: Unknown error, url: http://127.0.0.1:3456/v1/responses`。
   - 可能与上述启动就绪窗口问题相关：`/v1/responses` 端点返回 502 表明核心网关可能已崩溃、初始化未完成，或其上游不可达。
   - 修复 PR：**暂无开放 PR**。

3. **[低 — UX] 编辑 Claude Code 提供商时模型列表为空** — [PR #1763](https://github.com/musistudio/claude-code-router/pull/1763)
   - 现象：编辑时模型目录返回为空，但首次创建时可正常加载。
   - 状态：**已提出修复**（PR 开放中，等待审核）。请关注其合并进展。

---

## 6. 对应用开发者的影响

- **在启动超时问题修复落地之前，预计 `/v1/responses` 路由将出现间歇性 502 错误；** 对于命中本地网关的 codex 风格请求流，请在客户端加入带退避策略的重试逻辑。
- **不要将 5 秒启动窗口视为 SLA** —— 如果你在较繁忙的主机上以子进程方式编排该路由器，请将启动视为尽力而为，并通过外部手段监督重启（如 systemd `Restart=on-failure`、容器重启策略等）。
- **在 [PR #1763](https://github.com/musistudio/claude-code-router/pull/1763) 合入之前，请避免以编程方式重新编辑** 已有 Claude Code 提供商，或者在你的管理界面中显式提示用户模型选择将显示为空。
- **密切跟踪 issue 列表 24–48 小时：** 尤其是 #1761，这属于维护者通常会邀请提交小型定向 PR 的问题类型 —— 早期贡献者有机会快速拿下该超时修复的合并。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 简报 — 2026-09-07

## 1. 今日要点

过去 24 小时内 CC Switch 没有发布新版本，但活跃开发集中在两个方向：一是强化 **Codex Responses↔Chat Completions 转换层**（并行工具调用、`tool_call_id` 语义、空 thinking 块、子代理路由），二是通过 `CLAUDE_CONFIG_DIR` 实现 **Claude 侧的供应商隔离**。一个长期存在的用户痛点仍持续占据 issue 跟踪区：CC Switch 会以破坏性方式覆写 `~/.claude/settings.json` 和 `~/.codex/config.toml`，剥离用户自有字段（`enabledPlugins`、`statusLine`、hooks、permissions），至少有两个高评论量的 issue（#1198、#3631）已被关闭，但尚无明确的修复。

---

## 2. 发布与破坏性变更

过去 24 小时没有新版本发布。以下进行中的工作可能以破坏性行为落地：

- **PR #7094** — *“隔离的供应商会话与模型路由网关”*：用持久化的按供应商目录取代临时的 `claude --settings` 覆盖方案，并在设置/MCP/插件/会话/启动器方面遵循 `CLAUDE_CONFIG_DIR`。这是一次架构层面的转变，告别了旧有的共享 `settings.json` 模型——如今的覆写 bug 正源于该模型。[farion1231/cc-switch#7094](https://github.com/farion1231/cc-switch/pull/7094)
- **PR #7094 / #7165** 二者共同表明：项目正在向以 *takeover mode*（接管模式）作为规范路由路径过渡，旧式切换机制未来将被弃用。[#7094](https://github.com/farion1231/cc-switch/pull/7094), [#7165](https://github.com/farion1231/cc-switch/pull/7165)

---

## 3. 新模型与硬件支持

- 已为三款旗舰模型添加**定价种子数据**：
  - **GLM-5.3 Flash** — 输入 $0.15/M，输出 $0.50/M，缓存读取 $0.03/M。[PR #7163](https://github.com/farion1231/cc-switch/pull/7163)
  - **GPT-6 Astra** — 输入 $10/M，输出 $50/M，缓存读取 $1/M，缓存写入 $12.50/M。[PR #7162](https://github.com/farion1231/cc-switch/pull/7162)
  - **Gemini 3.8 Flash** — 输入 $0.75/M，输出 $3.75/M，缓存读取 $0.075/M。[PR #7164](https://github.com/farion1231/cc-switch/pull/7164)
- **Codex GitHub Copilot** — 新增托管账户型供应商，通过能力驱动的 Responses/Chat 选择进行路由。[PR #7157](https://github.com/farion1231/cc-switch/pull/7157)
- **Grok 官方** — 现在保留独立的账户凭证；用量导入器对 Windows 的 mtime 怪癖容忍度更高。[PR #6792](https://github.com/farion1231/cc-switch/pull/6792)
- **Claude Opus 5** 别名现已在接管模式中暴露（取代已退役的 `claude-opus-4-8`）。[PR #5882](https://github.com/farion1231/cc-switch/pull/5882)
- 恢复 **Gemini 原生 Part 级 `thoughtSignature`** 处理 + Codex `thought_signature` 回填 + 供应商表单解锁。[PR #7143](https://github.com/farion1231/cc-switch/pull/7143)
- **供应商目录修复** — DeepSeek 目录中的未知视觉模型（如 `deepseek-v4-flash-vision-exp`）不再从旗舰条目继承 `input_modalities: ["text"]`。[PR #6750](https://github.com/farion1231/cc-switch/pull/6750)
- **技能分组** — 持久化、带命名与颜色标记的分组，并支持按应用设置可见性。[PR #7008](https://github.com/farion1231/cc-switch/pull/7008)
- **i18n** — 新增葡萄牙语（巴西）翻译及 README。[PR #7046](https://github.com/farion1231/cc-switch/pull/7046)

---

## 4. 性能与优化

- **Codex OAuth 的并行工具调用** — 修复了 `parallel_tool_calls: false` 默认值导致 Anthropic→Responses 路由上工具调用被强制串行的问题。减少了多步骤任务的往返次数与上下文重复发送。[PR #5722](https://github.com/farion1231/cc-switch/pull/5722), [PR #7024](https://github.com/farion1231/cc-switch/pull/7024)
- **轻量 npm 版本探测** — “关于”页面的版本检查现在改用 `/-/package/{pkg}/dist-tags`，不再拉取完整 packument；**6 个包共 ~55 MB → ~3.3 KB**，并消除了每次请求中数 MB 的 JSON 解析。[PR #6191](https://github.com/farion1231/cc-switch/pull/6191)
- **托盘左键** — 现在单击即恢复/聚焦主窗口，而非打开上下文菜单。[PR #7153](https://github.com/farion1231/cc-switch/pull/7153)
- **接管模式下的跨供应商子代理路由** — Task/子代理流量可以发送到与主对话不同的（通常更便宜的）供应商，实现旗舰+低价档的成本拆分。[PR #7165](https://github.com/farion1231/cc-switch/pull/7165)

---

## 5. 稳定性与回归问题

**严重 — 破坏性配置覆写（尚无明确修复）**

- #1198 — 在 macOS 上启动 CC Switch 会重写 `~/.claude/settings.json`，丢失 hooks/permissions/contextFiles。16 条评论，👍9。[Issue #1198](https://github.com/farion1231/cc-switch/issues/1198)
- #3631 — 每次切换供应商都会完全重写 `~/.claude/settings.json`；`enabledPlugins` 被清空为 `{}`，`statusLine.command` 被重置。12 条评论，👍7。[Issue #3631](https://github.com/farion1231/cc-switch/issues/3631)

**高 — Codex Responses↔Chat 转换层回归**

- #7156 — v3.20.1：DeepSeek 上游在 Chat 路由上以 `tool_call_id` 过短为由拒绝请求；子代理工具调用始终失败。[Issue #7156](https://github.com/farion1231/cc-switch/issues/7156)
- #6260 — 流式“空 thinking”被写入 Codex 历史 → 下一个请求被 400 “thinking 长度不足” 拒绝。[Issue #6260](https://github.com/farion1231/cc-switch/issues/6260)
- #6697 — 纯图像工具输出在不支持视觉的上游被丢弃 → 产生孤儿 `tool_calls` → 永久 400。[Issue #6697](https://github.com/farion1231/cc-switch/issues/6697)
- #6529 — 文本评论与工具调用被拆成两条连续的 assistant 消息发出，破坏下游 Chat 模型。[Issue #6529](https://github.com/farion1231/cc-switch/issues/6529)
- #6473 — Anthropic→Codex Responses 桥接丢失了可选工具参数语义。[Issue #6473](https://github.com/farion1231/cc-switch/issues/6473)
- #5116 — Responses→Chat 在大型/复杂 `tool_call arguments` 时生成非法上游负载 → 400 InvalidParameter。[Issue #5116](https://github.com/farion1231/cc-switch/issues/5116)
- #4973 — v3.16.5 回归：在 `deepseek-v4-flash` 上经 Codex→SenseNova 路由出现 `invalid tool_call_id`（400）。[Issue #4973](https://github.com/farion1231/cc-switch/issues/4973)

**高 — Codex 路由/用量**

- #7084 — 分页式父级 rollout → 分叉出的子代理被永久错误归属；**GPT-5.6-Sol 用量完全丢失**（v3.20.1，macOS）。[Issue #7084](https://github.com/farion1231/cc-switch/issues/7084)
- #7056 — Codex 配额耗尽后，切换中转 API 供应商无法更换模型。[Issue #7056](https://github.com/farion1231/cc-switch/issues/7056)
- #4752 — 经 Codex 路由时持续出现 429 “exceeded retry limit”。[Issue #4752](https://github.com/farion1231/cc-switch/issues/4752)
- 候选修复：**#7161** 在网关回显空 `model` 字段时，从会话日志行中恢复模型名称。[PR #7161](https://github.com/farion1231/cc-switch/pull/7161)

**中 — 环境、网络、平台**

- #5609 — Linux Wayland 启动崩溃，`EGL_BAD_PARAMETER`。[Issue #5609](https://github.com/farion1231/cc-switch/issues/5609)
- #5096 — Claude Desktop + Bailian 代理在 IPv6 失效时挂起约 150 秒（无 Happy-Eyeballs 回退）。[Issue #5096](https://github.com/farion1231/cc-switch/issues/5096)
- #5042 — 使用自签名 HTTPS 证书的自定义供应商 → 502。[Issue #5042](https://github.com/farion1231/cc-switch/issues/5042)
- #5099 — 编辑 Codex `base_url` 后 `provider_endpoints.url` 保持旧值；模型列表/测试仍请求旧地址。[Issue #5099](https://github.com/farion1231/cc-switch/issues/5099)
- #7140 — WSL：已安装 `pi` 且路径正确，但应用报告 “no model”。[Issue #7140](https://github.com/farion1231/cc-switch/issues/7140)
- #5001 — Codex `/responses` 工具参数解析失败时呈现的根因具有误导性。[Issue #5001](https://github.com/farion1231/cc-switch/issues/5001)
- 候选修复：**#7170** — 保留 Unix 环境源路径中的冒号，避免清理/删除时发生截断。[PR #7170](https://github.com/farion1231/cc-switch/pull/7170)

**已关闭，无高影响**

- #4605、#5530、#6570、#5876、#7129、#7140 — 已按已完成/已处理关闭。[Issue #4605](https://github.com/farion1231/cc-switch/issues/4605)，[Issue #5530](https://github.com/farion1231/cc-switch/issues/5530)，[Issue #6570](https://github.com/farion1231/cc-switch/issues/6570)，[Issue #5876](https://github.com/farion1231/cc-switch/issues/5876)，[Issue #7129](https://github.com/farion1231/cc-switch/issues/7129)

横切性的增强请求 **#4371** — 用 Codex 官方的增量 profile 机制取代对 `config.toml` 的覆写式写入 — 目前仍处于开放状态，它将从结构上解决上述多个回归模式。[Issue #4371](https://github.com/farion1231/cc-switch/issues/4371)

---

## 6. 对应用开发者意味着什么

- **每次更新 CC Switch 前务必备份 `~/.claude/settings.json` 和 `~/.codex/config.toml`。** 在 #1198/#3631 得到结构性修复、PR #7094 的按供应商隔离落地之前，任何不属于 CC Switch 的字段在每次启动和切换供应商时都可能面临风险。
- **把 Codex 代理当作一个有真实暴露面的适配层来对待。** 工具调用 ID、thinking 块、纯图像工具输出以及多 `function_call` 回合目前都是 400 错误的来源；避免只基于上游行为做假设，并始终在客户端侧呈现清晰的错误信息（参见 #5001 对错误报告不佳的抱怨）。
- **对于追求成本优化的 Agent 技术栈**，进行中的*接管模式子代理路由*（PR #7165）和*隔离供应商会话*（PR #7094）值得关注——它们支持以旗舰模型充当规划器、把子代理扇出交给更便宜的中转，同时保持状态按供应商完全隔离。
- **定价现在是一张显式、受版本控制的表。** 三个新的旗舰种子（GLM-5.3 Flash、GPT-6 Astra、Gemini 3.8 Flash）随回归测试一起发布；如果你在做成本基准测试，请固定种子数据所在的 commit，并核实四字段定价（`input/output/cache_read/cache_write`）以 USD/M 计。
- **对于自建中转**，如果你将 CC Switch 部署到仅 IPv6 的端点（#5096），请启用 Happy-Eyeballs 式的 IPv4 回退，并计划为自签名 TLS 证书提供 CA 或签名信任（#5042）——目前该代理无法完成相应协商。
- **按用户的可审计性**正在改善：用量导入现在会记录请求模式和 reasoning effort，并能容忍 Windows mtime 异常（PR #6792）；将其与 PR #7161 的空模型恢复配合，可在网关行为异常时更干净地重建会话日志。
- **i18n 与 UX**：pt-BR 正在交付（PR #7046）；技能分组正在成为一等公民式的组织单元（PR #7008）。如果你维护市场内容或精选技能包，请围绕“分组/未分组”模型提前规划。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# 新版 API 摘要 — 2026-09-07

## 1. 今日要点

rc.34 版本落地了一整套账号安全改造（TOTP/Passkey、与会话绑定的 scope 证明、系统访问令牌轮换、审计日志），并把 Telegram 登录统一到标准 OAuth 流程。中继侧的重点是**计费正确性与流式稳定性**：缓存图像 token 的双重计费问题（#7229，修复 PR #7230）以及非流式下"客户端断开后仍扣费"的问题（#7231）被列为优先；而 #7228 带来了久违的**按渠道首字（TTFB）超时与自动回退**机制，用于处理流式上游卡住的情况。

## 2. 版本发布与破坏性变更

- **[v1.0.0-rc.34](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.34)** — 账号安全里程碑：
  - 登录与敏感操作共用同一套校验流程；TOTP 与 Passkey 互为回退因子。
  - 系统访问令牌支持查看、轮换、吊销与审计；引入独立的审计日志。
  - 账号注销、绑定、密码重置、Passkey/2FA 启用以及渠道密钥查看等操作，均需一次性 scope 证明，且必须与发起会话绑定。
  - **Telegram 登录迁移至统一 OAuth**：管理员需在 BotFather Login Widget 注册 `/oauth/telegram`，并配置 Client ID 与 Client Secret。
  - 任何在 rc.34 之前使用 Telegram 登录的部署，**必须完成迁移操作**。

- 本周期内值得关注的已合并 PR（行为将在后续 RC 中落地）：
  - [#7211](https://github.com/QuantumNous/new-api/pull/7211) — 为模型定制 OpenAI Chat 能力表；GPT-6 Astra 拥有独立规则，不再沿用 GPT-5 启发式，并能正确清理 `temperature`。
  - [#6975](https://github.com/QuantumNous/new-api/pull/6975) — 当 `model_mapping` 将上游改写为其他模型名时，在响应中**还原为客户端请求的原始模型名**；上游模型名仍写入 `other.upstream_model_name`。
  - [#6997](https://github.com/QuantumNous/new-api/pull/6997) — 让内存中的渠道缓存与 `Ability.enabled` 选路路径对齐，避免按分组禁用后渠道路由出现分歧。
  - [#7221](https://github.com/QuantumNous/new-api/pull/7221) — 批量复制 `RawMessage`，降低 Responses 中继中的深拷贝开销。
  - [#7213](https://github.com/QuantumNous/new-api/pull/7213) — 多域名支持。

## 3. 新模型与硬件支持

本周期内没有新增模型家族、架构或后端（CUDA/ROCm/Metal/CPU）。路由与能力相关的工作围绕现有提供商展开：
- 修复了 Rerank 分类错误（[#7181](https://github.com/QuantumNous/new-api/pull/7181)，关闭 [#7177](https://github.com/QuantumNous/new-api/issues/7177)）。
- GPT-6 Astra 与 OpenAI Chat 的 token/采样规则获得独立处理（[#7211](https://github.com/QuantumNous/new-api/pull/7211)）。
- 留意 rc.33 下 Gemini 3.8 Flash 变体名被改写的回归问题（[#7220](https://github.com/QuantumNous/new-api/issues/7220)，已关闭；固定到 rc.33 前请先验证）。

## 4. 性能与优化

- [#7221](https://github.com/QuantumNous/new-api/pull/7221) — 中继中批量复制 `RawMessage`，降低请求侧的深拷贝成本（未公布基准数据，预计在长上下文 Responses 流量下可观测）。
- [#7228](https://github.com/QuantumNous/new-api/pull/7228) — **流式下按渠道首字（TTFB）超时与自动回退**。已收到响应头但迟迟拿不到首字节的卡顿，不再需要等到完整流式超时；网关会自动切换到下一渠道。这是本周期在延迟韧性上最大的一项改进。
- [#7161](https://github.com/QuantumNous/new-api/pull/7161) — 活跃渠道探测开关（开启），用于基于存活状态的路由决策。

## 5. 稳定性与回归

按严重程度排序（最高在前）。严重度反映用户可见影响与爆炸半径。

| 严重度 | 项目 | 状态 | 修复 |
|---|---|---|---|
| 高 | [#7229](https://github.com/QuantumNous/new-api/issues/7229) — 图像缓存命中时**重复扣费** token（图像配额路径对缓存图像 token 重复计数）。rc.30 起报告。 | OPEN | [#7230](https://github.com/QuantumNous/new-api/pull/7230) — 在 `service/text_quota.go::calculateTextQuotaSummary` 中修复：`imageTokensNotCached = max(0, imageTokens - cacheTokens)`。Open。 |
| 高 | [#7231](https://github.com/QuantumNous/new-api/issues/7231) — 非流式客户端：客户端超时后上游请求仍执行，客户端断开后配额仍被扣减。rc.25 起报告。 | OPEN | 暂无关联修复。需排查非流式中继中上下文取消的传播。 |
| 中 | [#7215](https://github.com/QuantumNous/new-api/issues/7215) — Anthropic 的 `thinking` 等级未映射到 OpenAI 上游的 `reasoning_effort`（rc.30）。 | CLOSED | 修复已合入。 |
| 中 | [#2542](https://github.com/QuantumNous/new-api/issues/2542) — 在 `openai/gpt-5.2` 上强制将 `role:system` 改写为 `role:developer`，导致上游调用失败。 | CLOSED | 修复已合入。 |
| 中 | [#7220](https://github.com/QuantumNous/new-api/issues/7220) — rc.33 回归：Gemini 3.8 Flash 变体名在中继过程中被修改。 | CLOSED | 报告被认定为与已处理路径重复。 |
| 低 | [#7217](https://github.com/QuantumNous/new-api/issues/7217) — `thinking_model_blacklist` 缺少 UI 开关 / 没有按渠道切换以保留 effort 后缀。 | CLOSED | 等待实现决策。 |
| 低 | [#7232](https://github.com/QuantumNous/new-api/issues/7232) — 改写上游媒体 URL 主机名以隐藏提供商域名（被判定为 invalid）。 | CLOSED | 作为新特性在 [#7233](https://github.com/QuantumNous/new-api/pull/7233) 中重新开启（OPEN）。 |
| 无效 | [#7225](https://github.com/QuantumNous/new-api/issues/7225)、[#7224](https://github.com/QuantumNous/new-api/issues/7224) — `settleTestQuota` 分组倍率及 `cache_control` 丢失相关报告（rc.32）。 | CLOSED (invalid） | 复现被驳回；在 rc.34 上验证后再行反馈。 |

注：本周期合并的 PR 中，有相当比例由 AI 辅助完成（Codex Desktop / DeepSeek Harness / Trae）。评审时应按常规重点核查模型路由与计费相关路径。

## 6. 对应用开发者的影响

- **如果你通过 Telegram 登录，升级前请先规划好向 rc.34 的配置迁移** —— 必须在 BotFather Login Widget 注册 `/oauth/telegram`，并配置新的 Client ID/Secret，否则 Telegram 登录会失效。
- **审计你在 rc.30 部署上的计费**：缓存图像重复扣费（#7229）以及客户端断开后非流式仍扣费（#7231）都可能在生产流量中放大用量。如果你在较大规模上运行，请在升级超过 rc.30 之前暂停，并在修复 PR #7230 合入后重新核对对账结果。
- **流式可靠性即将迎来实质性提升**：#7228（按渠道 TTFB + 自动回退）解决了一类长期存在的"已收到响应头、正文卡住"的挂起问题。预计该能力上线后，卡住的流式客户端超时将明显减少 —— 但请把这次新的回退视为路由行为变更，并在流中途发生渠道切换时，确认你的重试/幂等逻辑仍然成立。
- **模型名往返现在保持一致**（#6975）：当 `model_mapping` 将 `a` 改写为 `b` 时，客户端在响应中收到的 `model` 字段仍为 `"a"`，上游模型名 `"b"` 写入 `other.upstream_model_name`。如果你的代码基于 `response.model` 做遥测、缓存或断言，将不再出现"你没请求过的模型名"。
- **按渠道的可调项越来越丰富**：TTFB 超时（#7228）、创建后切换密钥存储模式（#7196）、活跃渠道探测（#7161）正在汇合。如果你运营多租户或多提供商的场景，预计未来 1–2 个版本周期内需要完成按渠道的配置迁移。
- **Rerank 端点不再被错误路由**（#7181）：选择 rerank 模型的客户端不会再误落到 embedding 测试路径 —— 如果你对外暴露 rerank，升级后请重新做端到端验证。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*