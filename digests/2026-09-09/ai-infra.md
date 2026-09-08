# AI 基础设施日报 2026-09-09

> 生成时间: 2026-09-08 23:30 UTC | 覆盖项目: 9 个

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

# 跨项目基础设施报告 — 2026-09-09

**范围：** vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth、Claude Code Router、CC Switch、New API

---

## 1. 生态概览

栈正在明显分化为四层 —— 前沿服务引擎（vLLM、SGLang）、本地运行时（llama.cpp、Ollama、Unsloth）、网关/路由层（LiteLLM、New API、Claude Code Router、CC Switch）—— 而今天的活动显示各层以各自特有的方式出现问题：引擎层在 **混合线性注意力架构与 Blackwell GPU 上的投机解码正确性**，本地运行时在 **后端稳定性（Vulkan/AMD、Windows）**，网关在 **计费、配额执行与工具调用保真度**。两个模型家族 —— Qwen3.8 与 GLM-5.x —— 主导着各层的集成工作，而 DeepSeek-V4 支持正固守 Hopper/Blackwell 并事实上放弃 Ampere。智能体负载（Claude Code、Codex、MCP 工具循环）已成为塑造优化优先级的主要负载模型：前缀缓存复用、流式工具调用保真度以及 TTFT 准确性。

---

## 2. 活动对比

*计数 = 今日摘要中明确引用的条目（活动量的代理，而非完整仓库吞吐）。*

| 项目 | 层级 | 引用的 Issue | 引用的 PR | 发布状态 | 主导主题 |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~20 | ~13 | No release; v0.27.x mainline | Ampere support gap; spec-decode correctness |
| **SGLang** | Serving engine | ~19 | ~18 | No release; v0.5.18 prod / v0.5.19 dev | DFlash deadlock fix; weight-cache daemon |
| **llama.cpp** | Local runtime | ~22 | ~23 | **10 tagged builds** (b10853–b10867) | Vulkan/AMD stability; MoE offload |
| **Ollama** | Local runtime | ~9 | ~11 | No release; engine bumps queued | MLX hardening; API compatibility |
| **LiteLLM** | Gateway | ~24 (highest) | ~12 | No release; rc/1.101.0 branch | Rate-limit + security correctness |
| **

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-09

## 今日要点
社区正围绕一个重要能力缺口形成共识：**DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731 无法在 SM8x（Ampere A100/A800、RTX 30 系列）上运行**，相关 issue #50576 已累积 106 条评论，成为仅支持 Hopper/Blackwell 模型覆盖的事实追踪帖。平行推进的工作还包括**推理 kernel 的 batch 不变性**（#27433、#46639），以及 Qwen3.8 系列模型上混合 GDN/Mamba + MTP/EAGLE 投机解码中聚集出现的一批正确性回归。

## 发布与重大变更
*过去 24 小时内无新版本发布。* 根据 issue 引用判断（如 #53726 锁定 v0.27.1，#54225 引用 v0.27.1 镜像），主线当前似乎处于 **v0.27.x** 区间。今日无公开 API 或配置项废弃公告。

## 新增模型与硬件支持
| 项目 | 状态 | 链接 |
|---|---|---|
| DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731 SM8x（Ampere） | 已请求；阻塞追踪 #40851 | [#50576](https://github.com/vllm-project/vllm/issues/50576) |
| GLM-5.2-MXFP4 在 ROCm（gfx942/gfx950）通过 `deepseek_v32` 路径 | PR 已开启，可选路由 | [#51915](https://github.com/vllm-project/vllm/pull/51915) |
| MiniMax-M3 稀疏注意力配合 ROCm AITER indexer/top-k kernel | PR 已开启，依赖 #52849 | [#52664](https://github.com/vllm-project/vllm/pull/52664) |
| MiniMax-M3 CUTLASS MSA decode（小批量 step <16） | PR 已开启；修复静默回退到 Triton 的回归 | [#55838](https://github.com/vllm-project/vllm/pull/55838) |
| GLM DCP indexer 交错保护已移除（NIXL interleave=64 启用） | PR 已开启，草稿 | [#55802](https://github.com/vllm-project/vllm/pull/55802) |
| GLM-5.3-Flash `Glm5NextTextLinearAttention` | **尚不支持** | [#54062](https://github.com/vllm-project/vllm/issues/54062) |
| Transformers 后端：通用 `MergedColumnParallelFuser` | PR 已开启 | [#55301](https://github.com/vllm-project/vllm/pull/55301) |
| MM tensor IPC 的分页共享内存存储（`--mm-processor-cache-type paged_shm`） | PR 已开启，多模态 | [#51349](https://github.com/vllm-project/vllm/pull/51349) |
| InternVL2 在 Transformers v5（meta-device 初始化） | 追踪 issue | [#38425](https://github.com/vllm-project/vllm/issues/38425) |

## 性能与优化
- **Batch 不变性**已在 `VLLM_BATCH_INVARIANT=1` 下为 `moe_wna16_marlin_gemm` 落地，覆盖 AWQ-INT4、GPTQ-INT4/INT8、MXFP4 方案（[#46639](https://github.com/vllm-project/vllm/pull/46639)）。项目追踪：#27433。
- **CustomOps 使用 Helion**（RFC，[#53788](https://github.com/vllm-project/vllm/issues/53788)）报告在 H100 上三个 benchmark kernel 取得 **1.382–1.785× 几何平均加速比**，对比当前 CUDA —— 为 kernel 重写路径提供了有力支撑。
- **MiniMax-M3 小批量 decode**（[#55838](https://github.com/vllm-project/vllm/pull/55838)）：打通 dispatch 闸门，使 `<16` 的批量不再静默回退到 Triton split-K，弥合了一个延迟断崖。
- **KV cache 碎片化**（[#55841](https://github.com/vllm-project/vllm/pull/55841)）：在 V1 释放队列中优先选择连续 block run，以降低分离式传输的碎片化。
- **KV 预取时序**（[#41784](https://github.com/vllm-project/vllm/issues/41784)）：定位到 LMCache 集成中预取在 `num_computed_tokens == 0` 之后触发时出现的 GPU 空闲窗口。
- **混合模型部分缓存命中** RFC（[#45702](https://github.com/vllm-project/vllm/issues/45702)）**已关闭** —— 确定了混合 Mamba 栈中全注意力 block size 的落地方向。

## 稳定性与回归
| 严重度 | Issue | 备注 |
|---|---|---|
| 🔴 高 | **Qwen3.8-Flash-Next 贪心解码非确定性**：当 prompt 跨越 `indexer_budget`（persistent_topk 切换点）时，在 sm121/GB10 上出现（[#54521](https://github.com/vllm-project/vllm/issues/54521)） | 五次相同的 `temperature=0` 请求产生五种不同结果；尚无修复 PR。 |
| 🔴 高 | **FlashInfer CUDA 非法内存访问**：在 sm_120（RTX PRO 6000 Blackwell Max-Q）上，NVFP4 + fp8 KV cache 配置下触发；`TRITON_ATTN` 不受影响（[#54225](https://github.com/vllm-project/vllm/issues/54225)） | 临时方案：将 attention 后端切换为 Triton。 |
| 🔴 高 | **静默 CUDA IMA（exit 0）**：在 RTX 3090 上，混合 GDN + MTP k=3 + 异步调度场景下出现（[#53726](https://github.com/vllm-project/vllm/issues/53726)） | 经 #50021/#45100/#53613 类修复后仍存在。 |
|  高 | **AMD ROCm Xid 13 warp 错误**：在 SM120 上持续负载运行 Nemotron-3.5-Lightning-30B-A3B-NVFP4 + Marlin MoE + 混合 Mamba 时触发（[#52225](https://github.com/vllm-project/vllm/issues/52225)） | 表现为地址未对齐 / 非法指令 / 寄存器越界。 |
| 🟠 中 | **EAGLE/MTP 前缀缓存最后一块丢失**：在 Qwen3.8 GDN 布局下，每次命中强制重新计算约 1,648 个 token，导致前缀复用工作负载吞吐下降 **30–40%**（[#53670](https://github.com/vllm-project/vllm/issues/53670)） | 相关修复尝试：[#52244](https://github.com/vllm-project/vllm/pull/52244)。 |
| 🟠 中 | **MTP 首次重复未命中前缀缓存**：在混合 Mamba/GDN（`mamba_cache_mode="align"`）上，重新执行完整 prefill；仅从第 2 次重复开始复用（[#53504](https://github.com/vllm-project/vllm/issues/53504)） | 同类 GDN/MTP 缓存缺陷。 |
|  中 | **Intel Arc B50（Battlemage）TP=2** 在 worker 初始化时崩溃，报 `zeMemOpenIpcHandle INVALID_ARGUMENT`（[#48953](https://github.com/vllm-project/vllm/issues/48953)） | **已关闭** —— 由 #41663 替代。 |
|  中 | **模型加载后主机内存未释放**：在 Intel XPU 上出现（[#50269](https://github.com/vllm-project/vllm/issues/50269)） | |
| 🟠 中 | **ModelOpt Llama-4（Scout 17B-16E-Instruct-FP8）** 即使从 CPU page cache 加载也需 5 分钟以上（[#31624](https://github.com/vllm-project/vllm/issues/31624)） | 长期存在。 |
|  低 | **ROCm cuda-graph 捕获与 LoRA 一起崩溃**（[#41622](https://github.com/vllm-project/vllm/issues/41622)） | **已关闭。** |
|  低 | **GPU CC 通过 pinned-memory 误分类导致的静默输入损坏 / 远程 DoS**（[#50671](https://github.com/vllm-project/vllm/pull/50671)） | 安全类 PR 已开启 —— 建议追踪。 |
|  低 | **v0.18.0 cu128 wheel URL 返回 404**（[#37847](https://github.com/vllm-project/vllm/issues/37847)） | **已关闭。** |

## 对应用开发者的影响
- **硬件规划**：如果你运行 **Ampere（A100/A800、RTX 30 系列）**，请将 DeepSeek-V4-Flash 视作**当前不受支持**。建议将部署安排在 Hopper 或 Blackwell 上。提交前请持续关注 [#50576](https://github.com/vllm-project/vllm/issues/50576)。
- **混合架构上的投机解码很脆弱**：多个开放 bug 显示 EAGLE/MTP 在 Qwen3.8 GDN 布局上会丢失前缀缓存命中，带来 **30–40% 的吞吐下降**（[#53670](https://github.com/vllm-project/vllm/issues/53670)、[#53504](https://github.com/vllm-project/vllm/issues/53504)、[#53726](https://github.com/vllm-project/vllm/issues/53726)）。在 [#52244](https://github.com/vllm-project/vllm/pull/52244) 及相关修复落地前，生产环境请固定走非投机路径。
- **Blackwell 上的 attention 后端选择很关键**：FlashInfer + NVFP4 + fp8 KV 在 sm_120 上会崩溃（[#54225](https://github.com/vllm-project/vllm/issues/54225)）；目前 `TRITON_ATTN` 是安全的回退选项。
- **确定性保证**：Batch 不变性现已基本覆盖 Marlin MoE（[#46639](https://github.com/vllm-project/vllm/pull/46639)）—— 对 RL rollout 和可复现评测尤为相关。请设置 `VLLM_BATCH_INVARIANT=1`。
- **KV cache offload + HMA 组合在后续聊天请求中仍会出错**（[#41515](https://github.com/vllm-project/vllm/issues/41515)）；在多轮服务场景下修复前请避免混用。
- **ROCm gfx942/gfx950** 正在获得对 GLM-5.2 的一类支持（[#51915](https://github.com/vllm-project/vllm/pull/51915)）—— 值得重新评估 AMD 在 GLM 类工作负载上的承载能力。
- **分离式推理（NIXL）**：一项正确性修复已落地，可防止引擎在读过程中被驱逐（[#54689](https://github.com/vllm-project/vllm/pull/54689)）；attention-HMA 布局新增 PP prefill push 支持（[#50494](https://github.com/vllm-project/vllm/pull/50494)）。分离式栈在下次发布前应拉取这两项变更。
- **Rust 前端** 正在追平功能：现已实现 `--enable-force-include-usage`（[#55971](https://github.com/vllm-project/vllm/pull/55971)）—— 若需要在每个流式事件中携带 usage chunk 用于计费/遥测，这将非常有用。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-09

## 1. 今日要点

最重要的更新围绕 **DeepSeek-V4 / DFlash 稳定性与采样正确性修复**。PR [#38565](https://github.com/sgl-project/sglang/pull/38565) 在 `sgl_kernel` 中默认引入确定性 top-p / top-k renorm，定位并修复了 [#33549](https://github.com/sgl-project/sglang/issues/33549) 与 [#33289](https://github.com/sgl-project/sglang/issues/33289) 背后 DFlash/DSpark TP>1 死锁的**根本原因**。**Weight Cache Daemon** 路线图（[#33522](https://github.com/sgl-project/sglang/issues/33522)）确认第一阶段已上线：Qwen3-235B FP8 权重加载由约 306–327 s 降至 <1 s。多份**生产级风险报告**在 Blackwell + HiCache 场景下仍未关闭，最值得注意的是 [#38300](https://github.com/sgl-project/sglang/issues/38300)（在 B300 上使用 FlashInfer MNNVL 时 TP2 卡死）。

## 2. 发布与破坏性变更

- **过去 24 小时内无新发布版本。** 用户报告中引用的公开 Docker 镜像仍为 `lmsysorg/sglang:v0.5.18-cu130`（v0.5.18，FlashInfer 0.6.17）。v0.5.19 在主线工作中被引用（Rust TreeCore 试用）。
- **CUDA 13.4 容器合并草案：** [#38576](https://github.com/sgl-project/sglang/pull/38576) — 新增 CUDA 13.4 构建路径；影响使用旧工具链的用户。
- **CP V1 弃用 5/5（文档）：** [#36230](https://github.com/sgl-project/sglang/pull/36230) — 通过 cookbook/CLI 引导用户迁离 v1 prefill-CP 别名。迁移方法：使用 `--enable-prefill-cp --cp-strategy {zigzag,interleave}`。
- **LoRA + HiCache 页面隔离：** [#38577](https://github.com/sgl-project/sglang/pull/38577) — 语义变更：L3 存储哈希现在以 `extra_key` 为种子，因此跨适配器的相同提示将不再冲突。
- **Rust server DP-attention 端口修复：** [#34430](https://github.com/sgl-project/sglang/pull/34430) — 端口分配现由调度器布局推导（不再出现跨节点的偏移冲突）。

## 3. 新模型与硬件支持

- **Qwen3.8-Flash-Next-NVFP4（ModelOpt MIXED_PRECISION）：** [#38569](https://github.com/sgl-project/sglang/pull/38569) — NVFP4 路由专家 + FP8 PLE n-gram 表 + FP8_BLOCK_SCALES MTP。沿用 #37500 引入的通用混合精度基础设施。
- **DeepSeek-V4 TRT-LLM Attention（SM100/103）：** [#30805](https://github.com/sgl-project/sglang/pull/30805) — 面向 Blackwell 的 DSv4 一等 attention 路径。
- **FlashInfer Mega MoE：** [#31470](https://github.com/sgl-project/sglang/pull/31470) — 已 fork 至主线。
- **Mamba 1/2 推理：** [#34556](https://github.com/sgl-project/sglang/pull/34556) — SSM / 混合架构支持。
- **GLM-5.3-Flash on SM120（RTX PRO 6000, TP2, W4A16）：** 追踪 [#37813](https://github.com/sgl-project/sglang/issues/37813)；尚未完成验证。
- **DiT INT8 量化（ConvRot，在线 W8A8）：** [#38040](https://github.com/sgl-project/sglang/pull/38040) — `sgl-kernel` + `convrot_int8_customkernel`；面向 Qwen-Image（38 GiB BF16 DiT）。
- **Aaronson-Gumbel 文本水印（可选）：** [#37577](https://github.com/sgl-project/sglang/pull/37577) — 用于欧盟 AI 法案第 50 条的溯源流程。

## 4. 性能与优化

- **Weight Cache Daemon 第一阶段（已发布）：** 各 rank 的守护进程持有量化后的权重，并通过 CUDA IPC 提供服务。Qwen3-235B FP8 权重加载：**约 306–327 s → <1 s**（[#33522](https://github.com/sgl-project/sglang/issues/33522)、[#27139](https://github.com/sgl-project/sglang/pull/27139)）。
- **TRTLLM ragged prefill host-sync 移除：** [#38502](https://github.com/sgl-project/sglang/pull/38502) — FlashInfer 0.6.18 新增的空行扫描会将 `indptr` 回读到 host；此修复避免了每层、每次 prefill 的 host 阻塞。
- **Qwen3-VL 在 H100 上的单图服务：** [#36411](https://github.com/sgl-project/sglang/pull/36411) — 去掉常驻的 24 GiB 预处理预留；单轮流式传输不再为 cache-hot 开销买单。
- **Inkling MTP draft 元数据预置：** [#38169](https://github.com/sgl-project/sglang/pull/38169) — 将共享请求/KV 读操作前移至 verify 之前，使调度器可立即推进。
- **KV 缓存可观测性：** [#38559](https://github.com/sgl-project/sglang/pull/38559) — 为 RadixCache 和 HiRadixCache 增加 KV 在命中/淘汰时的年龄、生命周期与复用次数指标。
- **Rust TreeCore（试用，v0.5.19）：** [#38536](https://github.com/sgl-project/sglang/issues/38536) — 在小稠密模型、短共享前缀的高并发场景下，相较 Python TreeCore 测得端到端回退。**暂勿在生产环境启用。**
- **AMD/AITER verify 运行时尺寸恢复：** [#38575](https://github.com/sgl-project/sglang/pull/38575) — 修复 #34647 在 verify 路径上的回退。

## 5. 稳定性与回归

**关键 / 影响生产**

- **[#33549](https://github.com/sgl-project/sglang/issues/33549)** DeepSeek-V4（dsv4 + DSPARK），TP=8 on 8×H20：在约 245K 上下文处 decode forward 无限挂起，所有 GPU 利用率 100% / 功耗偏低，看门狗杀死服务。**[#38565](https://github.com/sgl-project/sglang/pull/38565)（确定性 renorm）已定位根本原因。** [#33614](https://github.com/sgl-project/sglang/pull/33614) 中提供了临时方案（broadcast rank 0）。
- **[#30209](https://github.com/sgl-project/sglang/issues/30209)** GLM-5.2 NVFP4 + EAGLE on B200/B300：`flashinfer_trtllm` 在 nextn-draft MoE 路径上发生 bf16 batched-GEMM IMA。尚无修复。
- **[#37633](https://github.com/sgl-project/sglang/issues/37633)** Qwen3.8-Flash-Next-FP8，H20 TP8：在约 22 路并发请求时 QSA extend prefill 路径出现 CUDA IMA；可通过 `CUDA_LAUNCH_BLOCKING=1` 或 `--disable-overlap-schedule` 抑制。
- **[#38300](https://github.com/sgl-project/sglang/issues/38300)** 2×B300（FlashInfer MNNVL）上 TP2 卡死，伴随 HiCache + 可中断 prefill CUDA graphs。开放中，无修复。
- **[#38031](https://github.com/sgl-project/sglang/issues/38031)** GLM-5.3-Flash（DSA），8×H100 TP8：HiCache host-tier 回传数据破坏生成结果，**即使不使用**推测解码也会出现（工具调用丢失、退化性复读）。开放中。
- **[#36830](https://github.com/sgl-project/sglang/issues/36830)** GLM-5.3-Flash：`--kv-cache-dtype fp8_e4m3` 在 8×H20 上不可用。`index_kpool=4` 排除了 `flashmla_kv`，且无 CUDA DSA 后端支持 bf16-query × fp8-KV。

**高优先级**

- **[#38202](https://github.com/sgl-project/sglang/issues/38202)** DFLASH/DSPARK draft KV pool 预算使用 `tp_size` 而非 `attn_tp_size` → 在 Kimi-K3 的 DP attention 下出现 OOM。
- **[#33483](https://github.com/sgl-project/sglang/issues/33483)** `max_running_requests=4096` 与 `cuda_graph_max_bs=32` 的默认值各自独立推导；越过 graph 上限后进入吸收态。
- **[#36537](https://github.com/sgl-project/sglang/issues/36537)** Qwen3.8-Flash-Next 思维链 + `qwen3_coder` 工具解析器在 token ID 0 上陷入循环。
- **[#36333](https://github.com/sgl-project/sglang/issues/36333)** 已断开的流式客户端留下僵尸请求，会持续 decode 到 `max_tokens` 并刷出 `"state was deleted in TokenizerManager"` — #34160 回退带来的回归。
- **[#35080](https://github.com/sgl-project/sglang/issues/35080)** FlashInfer 后端被报告为"not supported on Blackwell GPUs" — 在 Blackwell 部署发布前需澄清。

**中低优先级**

- **[#30245](https://github.com/sgl-project/sglang/issues/30245)**（已关闭，非活跃）ROCm RDNA3（gfx1100）：fused-MoE 被上游 Triton AMD 后端阻塞。
- **[#30632](https://github.com/sgl-project/sglang/issues/30632)**（已关闭，非活跃）与 `transformers` 5.8 → 5.12.1 相关的精度回归。
- **[#30598](https://github.com/sgl-project/sglang/issues/30598)**（已关闭，非活跃）运行时 `--quantization fp8` 对 GDN `in_proj_qkvz/in_proj_ba` 进行量化，而官方静态 FP8 checkpoint 已排除这些层。
- **[#38019](https://github.com/sgl-project/sglang/issues/38019)**（已关闭）统一 radix cache + HiCache + CP=2 在 KV pool 满回收时发生活锁。

**CI 状态（[#17050](https://github.com/sgl

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-09

## 今日要点

在 **b10853–b10867** 版本中集中发布了一批后端稳定性修复，其中 **b10867** 尤为关键：在发现 `--lazy-mode auto` 会导致 AMD iGPU 的 prompt 处理吞吐量减半 (#28326) 后，该版本改变了 iGPU 上惰性张量加载的默认行为。Vulkan 仍然是回归报告的重灾区 —— 尤其是在 AMD RDNA3 (RADV/Vega 8/Strix Halo) 和 Intel Arc 上，出现了多起 DeviceLost 崩溃、workgroup-count 断言错误，以及在 131k 上下文时高达 78% 的解码吞吐量悬崖问题（已通过子分配块大小旋钮缓解）。功能方面，两个 MoE 优化 PR（host-resident expert LRU 缓存和 lookahead H2D 预取）目前正在活跃评审中，标志着 offloaded-expert 性能正成为稀疏模型的首要关注点。

## 发布与破坏性变更

- **b10867** — [`llama: disable lazy tensor loading by default on iGPUs`](https://github.com/ggml-org/llama.cpp/pull/28326). `--lazy-mode auto` 现在会根据系统选择合理的默认值；旧的 auto 行为（>4 GiB 惰性加载）现在改名为 `large`，而"全部惰性加载"为 `all`。对依赖旧 auto 语义的 AMD/Intel iGPU 用户来说，这是一个行为变更。([release](https://github.com/ggml-org/llama.cpp/releases))
- **b10865** — [Revert `restore prop.integrated on HIP builds` (#24233)](https://github.com/ggml-org/llama.cpp/pull/28604). 恢复先前的 HIP 集成 GPU 检测；Strix Halo / Phoenix 用户可能需要重新验证其 `LLAMA_HIP_UMA` / `-ot` 策略。
- **b10864** — [Server checkpoint min-step eviction fix](https://github.com/ggml-org/llama.cpp/pull/28302). `create_checkpoint()` 现在仅在检查点列表真正已满时才应用最小步长间隔，修复了 SWA/recurrent 模型在短上下文下的 prompt 驱逐问题。
- **b10863** — Metal `mul_mv_iq3_xxs` 在 `ne00 < 1024` 时的半空闲 simdgroup 修复；改用单独的 8 行 split kernel 分发，而非依赖 4 行路径。([#28086](https://github.com/ggml-org/llama.cpp/pull/28086))
- **b10859** — Header-include 修复经由 PR #28566 落地（解决 #28557, #28559 编译错误）。
- **b10858** — [Vulkan UNARY(GELU|SIGMOID|SILU|SOFTPLUS)+MUL fusion](https://github.com/ggml-org/llama.cpp/pull/27220)，置于 `UNARY_MUL_FUSION` 开关之下，并为每个 op 提供专用 pipeline；预期在 transformer FFN 路径上带来一定的解码加速。
- **b10857** — Vulkan-Hpp 在 32 位目标上的 non-dispatchable handle 修复。([#22892](https://github.com/ggml-org/llama.cpp/pull/22892))
- **b10856** — [Chat: split specialized parsers into `common/parsers`](https://github.com/ggml-org/llama.cpp/pull/27764). 14 个模板解析器从 `chat.cpp` 中移出；无行为变更，但请留意下游在该目录中 glob 源码的构建系统。
- **b10855** — [OpenCL conv2d non-contiguous stride fix](https://github.com/ggml-org/llama.cpp/pull/28503).
- **b10853** — [Model: Kimi-K3 recurrent-state rollback support](https://github.com/ggml-org/llama.cpp/pull/28466). 为 Kimi-K3 推理实现正确的长上下文处理所必需。

## 新增模型与硬件支持

- **Kimi-K3** — recurrent-state rollback (#28466).
- **HrmTextForCausalLM (DFM Mimir 1B)** — 融合 `gqkv` projection 的转换 writer 及新架构支持提案中 ([#27625](https://github.com/ggml-org/llama.cpp/pull/27625)).
- **Nemotron 3 Super MTPv2** — draft-head 加载 bug 已修复；此前仅创建了 21 个 tensor 中的 19 个 ([#28617](https://github.com/ggml-org/llama.cpp/pull/28617)).
- **Windows ARM64 + MSVC `cl.exe`** — 新构建路径提案中 ([#28362](https://github.com/ggml-org/llama.cpp/pull/28362))，为 WoA 开发者去除对 clang 的依赖。
- **Intel Mac 上的 Metal 多 GPU (eGPU + dGPU)** — 功能请求已开启 ([#28565](https://github.com/ggml-org/llama.cpp/issues/28565)).
- **XDNA (AMD Ryzen AI NPU) backend** — 长期悬而未决的功能请求持续获得反响 ([#21725](https://github.com/ggml-org/llama.cpp/issues/21725)).
- **GLM 5.3 (flash)** — 支持请求中 ([#27922](https://github.com/ggml-org/llama.cpp/issues/27922)).
- **LTX-2 diffusion GGUFs** — 面向图像/视频/音频生成流水线的 RFC ([#28541](https://github.com/ggml-org/llama.cpp/issues/28541)).

## 性能与优化

- **Vulkan 子分配碎片悬崖** — 在 RX 7900 XTX 上 131 072 上下文时约 78% 的解码吞吐量下降，追溯到默认约 1 GiB 的子分配块；通过 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` 缓解 ([#27734](https://github.com/ggml-org/llama.cpp/issues/27734))。代码层面的修复尚未落地。
- **Vulkan 在 context 空闲时的 CPU 端写入** — 为 `ggml_backend_vk_cpy_tensor_async` 提出的快速路径，针对 split-model 传输中约 50 µs 的 fence-wait 开销 ([#28618](https://github.com/ggml-org/llama.cpp/pull/28618)).
- **Vulkan UNARY+MUL fusion** — 已在 b10858 中落地；为每个 op 提供专用 pipeline，而非运行时分支 ([#27220](https://github.com/ggml-org/llama.cpp/pull/27220)).
- **Metal `mul_mv_iq3_xxs` 半空闲 simdgroup** — 通过为 `ne00/32 < 32` 派发 split kernel 修复（b10863, [#28086](https://github.com/ggml-org/llama.cpp/pull/28086)).
- **HIP branch-free SWAR** — 替换掉循环模拟的 `__vsub4`/`__vcmpne4`/`__vcmpeq4`；同时修正了 `__vsub4` 中 saturate-vs-wrap 的一个 bug ([#28616](https://github.com/ggml-org/llama.cpp/pull/28616)).
- **MoE host-resident expert prefetch (lookahead H2D)** — 提案 `--prefetch-experts-slots N` 标志，代码量 327 行 ([#28414](https://github.com/ggml-org/llama.cpp/pull/28414)).
- **MoE GPU-resident LRU cache for offloaded experts** — 缓存 `-ot ...exps=CPU` 路径上最近使用过的 expert，避免每个 token 从系统内存流式读取 ([#27861](https://github.com/ggml-org/llama.cpp/pull/27861)).
- **`qwen4exp` `-sm tensor` re-enable** — 调度器放置中止（而非 QSA）问题已修复；测试 fixture 已更新 ([#28569](https://github.com/ggml-org/llama.cpp/pull/28569)).
- **NVFP4 quantization scale tensors** — `llama-quantize NVFP4` 不再 UB；现在会按张量输出 `.scale` / `.input_scale`（F32 标量）([#22897](https://github.com/ggml-org/llama.cpp/pull/22897)).

## 稳定性与回归

按生产服务的影响严重程度排序：

1. **[严重] Vulkan `vk::Queue::submit: ErrorDeviceLost` on RADV (gfx1151) with `--spec-type draft-mtp`** — 在数万 token 时死于 prompt 中段；同一 argv 关闭 MTP 后可撑过 125k+。已定位到一行诊断代码 ([#27306](https://github.com/ggml-org/llama.cpp/issues/27306))。尚未有 PR 落地。
2. **[严重] RTX 5090 显示器失联 / NVIDIA GSP 全芯片重置 on Qwen3.8-27B Q6_K** — 几次推理请求后黑屏，需重启 ([#27910](https://github.com/ggml-org/llama.cpp/issues/27910)).
3. **[高] CUDA illegal memory access in `cudaStreamSynchronize` (flash-attn path) with Qwen3.6-35B MoE + partial expert offload** — 可复现，跨多个 build（b10107, b10243），关闭 `-fa off` 后消失 ([#26609](https://github.com/ggml-org/llama.cpp/issues/26609)).
4. **[高] Vulkan on Intel Arc A770 hits `GGML_ASSERT(wg0 <= ctx->device->properties.limits.maxComputeWorkGroupCount...)` running Qwen 3.8 flash next** ([#28247](https://github.com/ggml-org/llama.cpp/issues/28247)).
5. **[高] Vulkan `ErrorDeviceLost` on Vega 8 iGPU after ~50K context** ([#26447](https://github.com/ggml-org/llama.cpp/issues/26447)).
6. **[高] SYCL/OpenCL `Experimental P2P feature is not implemented` on multi-GPU Arc** — `dev2dev_memcpy` crash ([#27168](https://github.com/ggml-org/llama.cpp/issues/27168)).
7. **[中] MTP retains inter-request state — non-deterministic output / model degradation** on Qwen3.6-35B-A3B-MTP ([#26425](https://github.com/ggml-org/llama.cpp/issues/26425)).
8. **[中] HIP/ROCm on gfx1151 produces wrong logits (not a crash) for prompts longer than `n_ubatch`** ([#28211](https://github.com/ggml-org/llama.cpp/issues/28211)).
9. **[中] Vulkan/ANV flash-attention fallback to SCALAR path → O(N²) PP degradation + device loss on Arc B580** ([#27638](https://github.com/ggml-org/llama.cpp/issues/27638)).
10. **[中] Parallel `tool_calls` mangled or hung across Qwen models on a tool with ~48 optional params** — 影响 agent/工具框架 ([#28522](https://github.com/ggml-org/llama.cpp/issues/28522)).
11. **[中] Qwen2.5-Omni intermittent silent audio corruption on Metal under system load** ([#28441](https://github.com/ggml-org/llama.cpp/issues/28441)).
12. **[低] `tools/ui/dist` stale assets break headless `llama-server` builds even with `LLAMA_BUILD_UI=OFF`** — 已关闭/陈旧 ([#25443](https://github.com/ggml-org/llama.cpp/issues/25443))。在较新 build 中已缓解。
13. **[低] `--lazy-mode auto` halves pp512 for qwen4exp on Vulkan (AMD iGPU)** — 由 **b10867 / #28326** 直接处理。

已发布或提案中的 Build/infra 修复：**cmake `build-info.cmake` no longer picks up a parent git repo** ([#28462](https://github.com/ggml-org/llama.cpp/pull/28462), 修复 #28397)；**CI sanitizer tests** ([#28583](https://github.com/ggml-org/llama.cpp/pull/28583))；**API/ABI compatibility checker script** ([#28579](https://github.com/ggml-org/llama.cpp/pull/28579))。

## 对应用开发者的意义

- **针对 b10867+ 重新基准测试你的 iGPU 和 Vulkan-AMD 流水线。** `--lazy-mode auto` 不再在 iGPU 上惰性加载；如果你之前依赖旧的 auto 语义来节省内存，请显式设置 `--lazy-mode large` 或 `--lazy-mode all`。
- **AMD 上的 Vulkan 仍然是当下风险最高的生产路径。** 如果你的目标平台是 RDNA3 (RADV) 且使用 MTP-draft 或任何会推动到 ~50k 上下文以上的模型，请固定到稳定 build，使用经过验证的 model+driver 矩阵进行测试，并为 DeviceLost 做好准备。在 #27306 / #26609 / #26447 的修复落地之前，请将这些配置上的 Vulkan 视为尽力而为。
- **遭遇 131k 解码悬崖？** 目前先设置 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`（已在 RX 7900 XTX 上验证）。关注上游默认值变更。
- **Qwen 上的工具/agent 框架：** 如果你使用具有宽参数 schema 的并行函数调用，请在 Qwen 类模型上验证输出 —— 存在一个关于调用错乱/挂起的未关闭 bug (#28522)。同时关注 DeepSeek V3.2 的 DSML 处理 (#28612) 以及 #28620 中修复的 Jinja null-in-map 边界情况。
- **MoE 模型服务：** 两项即将推出的优化（LRU cache #27861、lookahead prefetch #28414）瞄准了 host-offloaded expert 的瓶颈。如果你的服务栈使用 `-ot ...exps=CPU` 或 `-ncmoe`，建议基于这些 PR 做原型 —— 它们应能显著提升 Qwen3 类 MoE 的解码吞吐量。
- **长上下文 SWA/hybrid slot restore：** b10864 修复了 SWA 和 recurrent 模型上 `slot save/restore` 的检查点驱逐问题（#26004 仍在推进更广泛的 context-checkpoint 保留）。如果你的应用跨 slot 回收持久化会话，请重新测试。
- **NVFP4 quantization is now actually usable** — 如果你之前因 UB 或缺失的 scale tensor 而受阻，#22897 中合并的修复为 NVFP4 权重打通了 CUDA MMA 反量化路径。
- **针对 headless/嵌入式部署的构建加固：** cmake `build-info.cmake` 修复 (#28462) 关闭了一个隐患 —— release tarball 会从父目录继承错误的 git SHA —— 请重新运行你的 release 构建。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-09

## 今日要点

合并队列由 **MLX runner 强化** 和 **OpenAI/Anthropic API 兼容性修复** 主导。两个显著的 MLX 痛点已关闭 —— 由前缀缓存未对齐到 8192 token 边界导致的 17–27 秒重新预填充（[#18267](https://github.com/ollama/ollama/issues/18267)），以及一项用作用域生命周期替代全量清扫的 MLX 数组生命周期重构（[#18327](https://github.com/ollama/ollama/pull/18327)）。在 API 侧，`/v1/messages` 和 `/v1/chat/completions` 上针对纯工具轮次的 `500 "no user query found in messages"` 错误已修复（[#18303](https://github.com/ollama/ollama/issues/18303)），但 `/v1/responses` 上出现了一类新的静默失败 bug（`developer` 角色项被丢弃、`tool_search` 结果从未暴露给模型）。

## 发布与破坏性变更

过去 24 小时无发布。底层引擎版本升级已在队列中：
- [llama.cpp b10864](https://github.com/ollama/ollama/pull/18317)（PR 已开启，来自 b10760）
- [MLX 版本升级](https://github.com/ollama/ollama/pull/18235)（PR 已开启）

## 新模型与硬件支持

- **MLX：Qwen3.5/3.8 静态 YaRN** —— 从当前 RoPE 配置中解析 YaRN 元数据，并支持最大 `factor × original_max_position_embeddings` 的上下文，包括多模态 M-RoPE。（[#18263](https://github.com/ollama/ollama/pull/18263)，已关闭）
- **MLX：safetensors 导入路径** —— 新增服务端 MLX 导入；GGUF 创建功能被限制为将已有 GGUF 输入包装为 Ollama manifest。（[#14969](https://github.com/ollama/ollama/pull/14969)，进行中）
- **FunctionGemma 多行工具参数** —— 解析器修复，使 `write_file` 类调用中字符串参数包含换行符时不再被丢弃。（[#18322](https://github.com/ollama/ollama/pull/18322)，进行中）
- **Qwen3.8-27B-GSQ-RCO-GGUF 上的 IQ3_S** —— 用户反馈 `content` 为空且 `done_reason: "stop"`；Ollama 上游对该量化的支持尚待确认。（[#18297](https://github.com/ollama/ollama/issues/18297)，进行中）
- **AMD ROCm（RDNA4 / gfx1200）** —— `qwen3.8:27b` 间歇性无法加载 `TensileLibrary_lazy_gfx1200.dat`；RX 9060 XT 16 GB 用户受影响。（[#17782](https://github.com/ollama/ollama/issues/17782)，进行中）
- **模型签名（Sigstore 风格）** —— 长期运行的 PR #11573 持续在为模型加载前添加签名 + 完整性验证。

## 性能与优化

- **MLX 前缀缓存对齐修复** —— 恢复时精确落在匹配前缀上，而非向下取整到 8192 的倍数，消除了在 Claude Code 风格 agent 工作负载上观察到的固定 17–27 秒冷提示词重新预填充。（[#18267](https://github.com/ollama/ollama/issues/18267)，已关闭）
- **MLX 数组生命周期重构** —— 绑定现在采用作用域生命周期而非基于清扫的释放；触发点是前缀缓存淘汰路径（此前每次合并都会累积持有的数组）。（[#18327](https://github.com/ollama/ollama/pull/18327)，进行中）
- **MLX 上下文生效** —— 区分显式硬性 `num_ctx` 与自动软性尺寸；仅当用户或模型实际请求时才将 `--ctx-size` 传递给 MLX 子进程。（[#18285](https://github.com/ollama/ollama/pull/18285)，已关闭）
- **服务端：GGUF 元数据提取** —— 每个 blob 的元数据仅提取一次，存入 `<OLLAMA_MODELS>/metadata/sha256-<hex>.json`，消除了重复缓存及能力实现间的不一致。（[#17858](https://github.com/ollama/ollama/pull/17858)，进行中）
- **服务端：上下文溢出时的压缩重试** —— 在溢出后丢弃约 20% 最旧的可移除对话记录后自动重试压缩，同时保留 user/assistant 边界。（[#18324](https://github.com/ollama/ollama/pull/18324)，已关闭）

## 稳定性与回归

按用户影响排序：

1. **高 —— 纯工具轮次导致 `/v1/messages` 与 `/v1/chat/completions` 返回 HTTP 500** —— 已在 [PR #18303](https://github.com/ollama/ollama/issues/18303) 修复（已关闭）。与 `qwen3.8` 在 205k 上下文下的 [#17778](https://github.com/ollama/ollama/issues/17778) 同根因 —— 该问题仍开放，等待回移植验证。
2. **高 —— `/v1/responses` 静默丢弃 `developer` 角色项** —— 返回 200 OK 与 `status: "completed"`，无报错，但内容从未到达模型。system/user 等价路径正常。（[#18305](https://github.com/ollama/ollama/issues/18305)，进行中）
3. **高 —— Responses API 的 `tool_search` 结果从未作为可调用工具提供** —— Codex CLI / MCP 客户端受影响；工具在搜索结果内可见，但不在模型的工具列表中。（[#18306](https://github.com/ollama/ollama/issues/18306)，进行中）
4. **中 —— RDNA4 上 ROCm `TensileLibrary_lazy_gfx1200.dat` 失败** —— RX 9060 XT 16 GB 上运行一段时间后硬崩溃。（[#17782](https://github.com/ollama/ollama/issues/17782)，进行中）
5. **中 —— `gemma3:12b` 结构化输出（`format`）在含引号输入时截断** —— 当源包含转义双引号时，`done_reason: "stop"` 但 `eval_count` 极低。（[#18094](https://github.com/ollama/ollama/issues/18094)，进行中）
6. **中 —— `glm-5.3:cloud` 进入无限推理并中止** —— 仅在 Ollama Cloud 上出现；上游 Z.AI API 不受影响。（[#18193](https://github.com/ollama/ollama/issues/18193)，进行中）
7. **低 —— IQ3_S Qwen3.8 GSQ-RCO GGUF 输出空内容** —— 疑似量化格式支持缺口。（[#18297](https://github.com/ollama/ollama/issues/18297)，进行中）
8. **低 —— `progress` 渲染循环与 `sched` LogValue 中的数据竞争** —— 共享 `bufio.Writer` 上 `Stop`/`StopAndClear` 与进行中渲染之间的竞争；`runnerRef.LogValue` 中的字段在读取时未加 `refMu`。已在 [PR #18319](https://github.com/ollama/ollama/pull/18319) 修复（已关闭）。

## 对应用开发者的意义

- **纯工具轮次的 agent 循环在 `/v1/chat/completions` 与 `/v1/messages` 上现已安全**（这是典型的 Claude Code / OpenAI Codex 往返模式）。如果你使用 Ollama 0.30.x 分支，请针对下一版本进行验证；该 500 错误可恢复，但会破坏对话中段的状态。
- **`/v1/responses` 尚未达到生产级别。** 今天新增了两条静默失败路径（`developer` 角色项被丢弃、`tool_search` 结果未暴露）。在两者均发布修复之前，针对 Codex-CLI 风格的 MCP 工作负载请优先使用 `/v1/chat/completions`，并确认你发送的任何 `developer` 角色指令确实到达了模型。
- **Apple Silicon 上的 MLX 在 agent 工作负载下显著提速** —— 每个冷对话开始时的 17–27 秒开销已消失，Qwen3.5/3.8 通过 runner 实现端到端的 YaRN 上下文扩展（与长上下文代码 agent 相关）。请关注进行中的 [#18327](https://github.com/ollama/ollama/pull/18327) 重构，以获取进一步的内存稳定性收益。
- **冷启动延迟将在 GGUF 元数据提取 PR 合入后进一步改善** —— 当前服务端命中两个并行缓存，能力结果不一致，这在生产网关中容易表现为难以察觉的逐模型行为漂移。
- **模型溯源已在路线图上**：PR #11573 正在为加载流程引入 Sigstore 风格的签名 + 验证。如果你在 Ollama 前方运行内部注册表或代理，现在就可以开始考虑 pinning/verification 策略，以便在功能发布时即可启用。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 简报 — 2026-09-09

## 今日要点

当前的活动主要聚焦于**限流与安全正确性问题**，而非新功能。两个相关报告显示，按团队/模型配额（`#34140`）和虚拟密钥 TPM 限制（`#24677`）实际生效值约为配置值的一半；另外两份报告（`#40217`、`#39757`）显示，认证失败时会把密钥哈希和后端身份泄露给未认证调用方。正面来看，一项关键的 Bedrock 异步签名修复（`#40270`）已落地，将 SigV4 从事件循环中移出；此外新增了一个位于 `SIMPLE` 之下的可选 `NON_REASONING` 路由层级（`#40273`），用于只需中继工具输出的智能体工作负载。

## 发布与破坏性变更

过去 24 小时无新版本发布。最近已完成的工作（已合并 PR）包括：内部预发环境晋级（`#40307`）、仪表盘依赖升级到 Next.js 16.3.3 / Vitest 4.1.11（`#40312`），以及 MLflow 流式内存泄漏修复（`#39049`）。

## 新模型与硬件支持

- **gpt-6-astra（OpenAI）** — 在 `/v1/chat/completions` 上无法使用；该模型族尚未被 `is_model_gpt_5_model` / `is_model_gpt_5_4_plus_model` 识别，导致 `max_tokens` 被拒绝。跟踪于 [#40279](https://github.com/BerriAI/litellm/issues/40279)。
- **QwenCloud provider 迁移路径** — 请求为国际版 Qwen/Wan/CosyVoice 平台提供官方 provider，兼容 OpenAI 与 Anthropic 接口。跟踪于 [#36150](https://github.com/BerriAI/litellm/issues/36150)。
- **vLLM `/v1/realtime` 端点** — 仍处于开放状态，请求原生 provider 支持。跟踪于 [#23102](https://github.com/BerriAI/litellm/issues/23102)。
- **模型组合（"group of groups"）** — 功能请求被重新开启/讨论。[#28125](https://github.com/BerriAI/litellm/issues/28125)。

无新的硬件后端或量化格式被涉及。

## 性能与优化

- **Bedrock 签名移出事件循环** — `/v1/messages`、Converse、count tokens 与 pass-through 现在以异步方式签名请求；此前一次 botocore 凭证刷新可能阻塞整个工作进程。[PR #40270](https://github.com/BerriAI/litellm/pull/40270)。
- **MLflow 流式泄漏已修复** — `_stream_id_to_span` 现已在 `finally` 块中被弹出，并以位置参数方式调用 mlflow 2.x 的 `end_trace`。[PR #39049](https://github.com/BerriAI/litellm/pull/39049)。
- **MCP 架构发现代理模式** — 大型目录不再被急切地加载到每个客户端会话中；新增 `/mcp/proxy` 暴露 `search_tools`、`get_tool_schema`、`call_tool`。[PR #40298](https://github.com/BerriAI/litellm/pull/40298)。
- **`NON_REASONING` 自动路由层级** — 在 `SIMPLE` 之下新增第五个内置层级，使工具输出中继回合无需支付 SIMPLE 价格，同时仍继承自适应升级机制。[PR #40273](https://github.com/BerriAI/litellm/pull/40273)。
- **Guardrail 工具调用改写接入流式响应** — 流式工具调用被改写后，调用后 guardrail 的结果现在能够真正进入 chat、Responses 与 Messages 流，而不是被丢弃。[PR #40271](https://github.com/BerriAI/litellm/pull/40271)。
- **OTel v2 每租户 trace 目标回移植** — 来自 [#39654](https://github.com/BerriAI/litellm/pull/39654) 的按密钥/团队路由 trace 能力正在被 cherry-pick 到 `rc/1.101.0`。[PR #40321](https://github.com/BerriAI/litellm/pull/40321)。
- **Rust SDK 回调调用重构** — 为后续将路由执行迁移到 Rust，提前支持保留引用的回调调用方式。[PR #40070](https://github.com/BerriAI/litellm/pull/40070)。

## 稳定性与回归

**严重性：关键**
- Bedrock 请求因凭证刷新阻塞事件循环 — 已在 [PR #40270](https://github.com/BerriAI/litellm/pull/40270) **修复**。报告：[#40270](https://github.com/BerriAI/litellm/pull/40270)。

**严重性：高（已确认，暂无修复）**
- v3 限流器对 `model_per_team` 限制双重计数，实际 RPM/TPM 约为配置值的一半。[#34140](https://github.com/BerriAI/litellm/issues/34140)。
- 虚拟密钥 TPM 限制在 v1.82.3 中仍以错误数值生效，尽管 #18953 已被标记为已修复。[#24677](https://github.com/BerriAI/litellm/issues/24677)。
- 对未知终端用户的并发首次请求会绕过配置的默认预算。[#40095](https://github.com/BerriAI/litellm/issues/40095)。
- Azure Entra Redis 认证（`azure_redis_ad_token`）无法在集群模式下启动 proxy — `init_redis_cluster` 没有凭证提供器路径。[#37726](https://github.com/BerriAI/litellm/issues/37726)。

**严重性：高（翻译/正确性）**
- 推理模型的提示缓存（`encrypted_content`）在 `/v1/messages` → Responses API 桥接中始终无法向下游传递，即便在 #37953 之后依旧如此。[#39339](https://github.com/BerriAI/litellm/issues/39339)。
- 流式重分块器在上游一次性发送完整 tool_call 时会丢失 `tool_calls[].id` 和 `function.name`。[#39796](https://github.com/BerriAI/litellm/issues/39796)。
- 复杂度自动路由器会把 `reasoning.encrypted_content` 的后续请求跨模型组移动。[#40237](https://github.com/BerriAI/litellm/issues/40237)。

**严重性：中**
- ChatGPT/Codex Responses 流式在上游未发增量直接发出 `response.function_call_arguments.done` 时，会丢失函数调用参数。[#27144](https://github.com/BerriAI/litellm/issues/27144)。
- v1.95.0 上 Anthropic 流式 `tool_use` 在内部 tool-call 分块之前丢失。[#36262](https://github.com/BerriAI/litellm/issues/36262)。
- Anthropic `/v1/messages` 会静默丢弃 `messages[]` 中的 `role:"system"` 条目。[#36917](https://github.com/BerriAI/litellm/issues/36917)。
- `token_counter` 在 OpenAI `input_audio` 块上抛错；调用前的上下文窗口与提示缓存检查会被静默跳过。[#38459](https://github.com/BerriAI/litellm/issues/38459)。
- 自定义脱敏标签（`keyword_redaction_tag`、`pattern_redaction_format`）在 v1.87.1 中未生效。[#30008](https://github.com/BerriAI/litellm/issues/30008)。
- `DELETE /v1/files/{file_id}` 对 Bedrock 托管文件返回 500，无法执行清理。[#39715](https://github.com/BerriAI/litellm/issues/39715)。
- SearXNG 搜索适配器会把上游的 429/503 转成成功的空结果。[#38628](https://github.com/BerriAI/litellm/issues/38628)。
- 模型在 proxy API 上同时按名称与 provider 类型出现。[#14257](https://github.com/BerriAI/litellm/issues/14257)。
- SSO：payload 中包含多个 `app_roles` 时，只有第一个被采纳。[#33434](https://github.com/BerriAI/litellm/issues/33434)。

**严重性：中（安全/信息泄露）**
- 错误密钥触发 401 时回显存储的密钥哈希以及该密钥的完整模型允许列表。[#40217](https://github.com/BerriAI/litellm/issues/40217)。
- 错误密钥 401 还会泄露后端软件名称、数据库表名以及提交密钥的 SHA-256。[#39757](https://github.com/BerriAI/litellm/issues/39757)。

**较低严重性/已关闭**
- `/v1/files`、rerank、images、realtime、anthropic、pass-through 路由的错误响应中 `type` 和 `param` 出现字面量 `"None"` — 已在 [PR #39536](https://github.com/BerriAI/litellm/pull/39536) **修复**。
- `lite login` 会话令牌在登录时冻结团队模型 — 已在 [PR #40318](https://github.com/BerriAI/litellm/pull/40318) **修复**。
- 消费跟踪为 CLI 会话令牌生成 `key-hash-...` 行 — 已在 [PR #40275](https://github.com/BerriAI/litellm/pull/40275) **修复**。
- Tool Permission Guardrail 在 WARNING 级别过度日志 — 已通过 [#32778](https://github.com/BerriAI/litellm/issues/32778) **关闭**。
- MCP `/health` 透传 — 已通过 [#24450](https://github.com/BerriAI/litellm/issues/24450) **关闭**。

## 对应用开发者的影响

- **重新校验你的限流配置。** 如果你通过 `metadata.model_rpm_limit` 配置了按团队按模型的 RPM/TMP，请预期客户端大约在配置值一半的位置就会遇到 429，直至 [#34140](https://github.com/BerriAI/litellm/issues/34140) 合入。在此之前，建议将配置上限翻倍，或基于实际观察到的流量做预算。
- **在桥接 Anthropic → OpenAI 推理模型时，不要依赖提示缓存的连续性。** `encrypted_content` 在上游看到之前就被丢弃（[#39339](https://github.com/BerriAI/litellm/issues/39339)），并且自动路由器还可能把后续请求路由到不同的模型组，从而导致缓存失效（[#40237](https://github.com/BerriAI/litellm/issues/40237)）。对于成本敏感的推理流水线，请显式锁定上游模型。
- **Bedrock 部署在 [#40270](https://github.com/BerriAI/litellm/pull/40270) 进入发布分支后将获得明显的延迟尾部收益；** 此前单次凭证刷新就会让工作进程上的其他所有请求陷入队头阻塞，值得为此升级。
- **智能体成本优化** 随着新增的 `NON_REASONING` 层级（[#40273](https://github.com/BerriAI/litellm/pull/40273)）变得更容易。如果你的智能体存在大量仅中继工具输出回模型的回合，请把这些回合路由到新层级，而不是支付 SIMPLE 档位的价格。
- **`/v1/messages` 上的工具调用流式仍然不稳定。** v1.95.0 上的两个丢失案例（[#36262](https://github.com/BerriAI/litellm/issues/36262)、[#39796](https://github.com/BerriAI/litellm/issues/39796)）都影响 Anthropic 形态的流式响应；如果你的客户端依赖流式工具调用，请在发布前针对你所使用的 LiteLLM 版本进行验证。
- **请将 LiteLLM

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-09

## 今日亮点
Unsloth 发布了 **v0.1.807-beta**,这是近期最大的一次性能更新,主打两项改动:AMD GPU 默认切换到 **Vulkan**,相较 ROCm 在 prefill/decoding 上获得约 20% 的提升;Windows 端的 `llama-server.exe` 已完成签名,以减少杀毒软件误报。今天的另一重点是 **KV-cache 抢占**机制的深度改造,使 Studio 中的并行对话可以共享同一个统一缓存,互不淘汰([PR #10301](https://github.com/unslothai/unsloth/pull/10301)、[PR #10358](https://github.com/unslothai/unsloth/pull/10358)),此外还有一波 Windows 安装包加固工作,用于抑制 Defender / Bitdefender 的告警。

## 发布与重大变更
- **[v0.1.807-beta — 大幅性能改进与修复](https://github.com/unslothai/unsloth/releases)** — 头条改动:AMD 现在默认使用 Vulkan(相较 ROCm 在 prefill/decoding 上提升约 20%)。Windows 上的 `llama-server.exe` 现在已签名,以减少 SAC / Defender 误报。修复了 Strix 和 iGPU 上的 AMD 输出乱码(上游)。迁移:无需任何操作,但 AMD 用户应重新测试此前依赖 ROCm 的工作负载,因为 Vulkan 已成为新的默认路径。

## 新增模型与硬件支持
- **AMD Vulkan 作为默认后端** — 在 v0.1.807-beta 中取代 ROCm 成为 AMD 的默认路径([release notes](https://github.com/unslothai/unsloth/releases))。
- **AMD 设备节点权限处理** — [PR #10473](https://github.com/unslothai/unsloth/pull/10473) 会探测 `/dev/kfd` 与 `/dev/dri/renderD*` 的**可打开性**,而非仅检查其是否存在,因此不在 `render` 组中的账号现在会得到明确的报错,而不是静默地看到零个 HIP 设备(关闭 [#10466](https://github.com/unslothai/unsloth/issues/10466))。
- **GGUF 多构建产物处理** — [PR #10556](https://github.com/unslothai/unsloth/pull/10556) 将仓库在同一量化下发布的每个 GGUF 构建产物都展示出来(例如 `AngelSlim/Hy3-GGUF` 上的普通版与 `-mtp` 版),而不是将它们合并成一行。
- **Wan2.2 TI2V on AMD ROCm** — 在没有融合 kernel 时,attention 现在能干净地回退;RX 9060 XT 的 OOM 问题正在跟进([#10415](https://github.com/unslothai/unsloth/issues/10415))。
- **MiCA (Minor Component Adaptation)** — 开放功能请求:在 `FastLanguageModel.get_peft_model()` 中将 MiCA 添加为 LoRA 兼容的初始化方式([#6730](https://github.com/unslothai/unsloth/issues/6730),+4 👍)。
- **Qwen3-omni TTS 语音克隆** — 请求将现有的 Qwen2.5-omni 支持扩展到 Qwen3-omni([#3636](https://github.com/unslothai/unsloth/issues/3636))。

## 性能与优化
- **+20% AMD prefill & decoding** —— 默认从 ROCm 切换到 Vulkan 带来([v0.1.807-beta](https://github.com/unslothai/unsloth/releases))。
- **并行对话的 KV-cache 抢占** — [PR #10301](https://github.com/unslothai/unsloth/pull/10301) 以 `--parallel N --kv-unified -c N` 启动 llama-server,为 N 个 slot 提供一个共享的 N 单元池。配合 unslothai/llama.cpp#184/#190,使服务器能够自行把 slot 暂存到主机内存([PR #10358](https://github.com/unslothai/unsloth/pull/10358)),让 Studio 可以下线其自有的抢占层。
- **文档上传移出事件循环** — [PR #10552](https://github.com/unslothai/unsloth/pull/10552) 让三条上传路由以流式写入磁盘,并在 worker 中探测 embedder,大 PDF 不再卡住流式回复。
- **本地模型显存估算精度** — [PR #10558](https://github.com/unslothai/unsloth/pull/10558) 按权重的一份副本来衡量本地模型体积(不再重复计入 `original/` 与 `optimizer.pt`),数据会喂给全量微调的显存估算。
- **15 分钟启动上限,版本更智能** — [PR #10551](https://github.com/unslothai/unsloth/pull/10551) 让 `unsloth start` 即使服务端子进程还没输出早期 API key 行也能持续轮询;[PR #10550](https://github.com/unslothai/unsloth/pull/10550) 把同一上限扩展到 LoRA 适配器的基础模型下载。

## 稳定性与回归
按影响与讨论量排序。

- **[OPEN] 最新 llama.cpp 构建破坏 AMD GPU 检测** — 多个用户在 gfx1201 上全新安装后看到零个 AMD 设备([#7485](https://github.com/unslothai/unsloth/issues/7485),5 条评论)。尚无修复 PR。
- **[OPEN] `main` 上 `hf-stack` 安全审计通道为红** — `unsloth-zoo` 升级后 `scan_packages` 基线需要重新审核;标记出 60 CRITICAL / 33 HIGH 发现项([#10545](https://github.com/unslothai/unsloth/issues/10545))。
- **[OPEN] Windows:同一 tick 内两次发言时对话回溯顺序不稳定** — Windows 通道上 `test_conversation_archive.py` 的顺序断言失败([#10544](https://github.com/unslothai/unsloth/issues/10544))。
- **[OPEN] `parity (windows-latest)` 红** — PowerShell 与 pwsh 上 `test_a_non_ascii_marker_survives_the_rollback` 均失败([#10460](https://github.com/unslothai/unsloth/issues/10460))。
- **[OPEN] AMD/ROCm Wan2.2 TI2V OOM** — RX 9060 XT 上缺少融合 attention kernel,SDPA math 回退耗尽显存([#10415](https://github.com/unslothai/unsloth/issues/10415))。
- **[OPEN] 不在 `render` 组的账号上报零 AMD GPU** ([#10466](https://github.com/unslothai/unsloth/issues/10466)) — 由 [PR #10473](https://github.com/unslothai/unsloth/pull/10473) 修复。
- **[OPEN] KV 准入:携带工具的请求绕过了无上限 cap 的重试** — 豁免范围大于当初引入重试时的初衷([#10176](https://github.com/unslothai/unsloth/issues/10176))。
- **[OPEN] `hasGlobalLinkReference` markdown 探针把普通回复误路由到全文档渲染** ([#10529](https://github.com/unslothai/unsloth/issues/10529))。
- **[OPEN] layer-mode / tensor-mode 被报告为相同,x3 3090 上出现“假 BF16 mode”** ([#10549](https://github.com/unslothai/unsloth/issues/10549))。
- **[CLOSED] Bitdefender 拦截首次运行的 Windows 安装** — `powershell.exe → csc.exe → %TEMP%\*.dll` 链路被标记为 `Gen:Variant.MSILHeracles`;通过 [PR #10540](https://github.com/unslothai/unsloth/pull/10540)(输出预编译的原生路径辅助工具)与 [PR #10560](https://github.com/unslothai/unsloth/pull/10560)(CLI 不再同时使用 `Hidden` + `Bypass`)缓解。
- **[CLOSED] 提升权限安装后,非提升权限运行 Studio 时 Windows 上 `llama-server.exe` “拒绝访问”** ([#4846](https://github.com/unslothai/unsloth/issues/4846),15 条评论) — 通过 v0.1.807-beta 中的签名以及 [PR #10471](https://github.com/unslothai/unsloth/pull/10471) 中的卸载器归属修复解决。
- **[CLOSED] 日 / 月切换时统计面板未刷新摘要** ([#9337](https://github.com/unslothai/unsloth/issues/9337))。
- **[CLOSED] 发送空 bearer 的 harness 无密钥认证失败** ([#10400](https://github.com/unslothai/unsloth/issues/10400))。
- **[CLOSED] `unsloth studio update` 频繁命中 GitHub API** ([#10449](https://github.com/unslothai/unsloth/issues/10449))。
- **[CLOSED] Studio 的 “告诉模型今天的日期” 覆盖了 Ollama Modelfile 的 SYSTEM** ([#10436](https://github.com/unslothai/unsloth/issues/10436))。

## 对应用开发者的影响
- **AMD 用户升级到 v0.1.807-beta 并接受 Vulkan 为默认后端,即可免费获得约 20% 的吞吐提升** — 但任何此前依赖 ROCm 特定数值或内存布局的工作负载,请重新测试。
- **Studio 上的多租户 / 共享对话负载即将获得更好的伸缩性**:KV 抢占的重构让 N 路并发对话共享同一个缓存,互不淘汰;LoRA 基础模型下载修复([PR #10550](https://github.com/unslothai/unsloth/pull/10550))意味着长时间运行的适配器加载不再触发启动看门狗。
- **Windows 部署在实质上更安全**:已签名的 `llama-server.exe` 加上一系列 AV 形态守卫改动([PR #10540](https://github.com/unslothai/unsloth/pull/10540)、[PR #10560](https://github.com/unslothai/unsloth/pull/10560))应当能消除一直阻碍首次安装的 Bitdefender / Defender 拦截。
- **Studio 中的 Python / Terminal 工具在 Linux (bubblewrap) 与 macOS (Seatbelt) 上获得了真正的 OS 沙箱** ([PR #10526](https://github.com/unslothai/unsloth/pull/10526)) — 如果你嵌入了 Studio 的工具层,请审计任何假设主机文件系统 / 网络访问的代码路径。
- **多用户安装带来按账号隔离** ([PR #10375](https://github.com/unslothai/unsloth/pull/10375):Settings → Accounts、一次性设置码、隔离缓存) — 适用于共享 GPU 主机与 kiosk 场景。
- **注意事项**:`main` 当前在 `Security audit / hf-stack` 与 `parity (windows-latest)` 上为红;在 [#10545](https://github.com/unslothai/unsloth/issues/10545) 与 [#10460](https://github.com/unslothai/unsloth/issues/10460) 关闭前,请固定到已标记的发布版本而非跟踪 head。最新版上游 llama.cpp 上 AMD GPU 检测仍然损坏,等待 [#7485](https://github.com/unslothai/unsloth/issues/7485)。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — 每日简报
**日期：** 2026-09-09
**仓库：** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. 今日要点

今天社区的关注焦点完全集中在**大规模场景下的网关性能**上：三个相关 issue（#1775、#1776、#1777）详细记录了一个由 provider 数量驱动的延迟回归问题，实测开销为“在 46 个 provider 下每请求约 800k+ 次冗余的 Set 构造”，且 `getAppInfo` RPC 实测耗时约 7.2s。修复方面，两个 PR（#1773、#1774）分别强化了失败回退与按模型用量归因的可观测性，而 #1772 则暴露了一个与新版 Claude Desktop 配置 schema 校验相关的前向兼容性破坏。

## 2. 版本发布与破坏性变更

*过去 24 小时内无新版本发布。*

值得关注的**兼容性变更**：
- [#1772](https://github.com/musistudio/claude-code-router/issues/1772) —— 较新版本的 Claude Desktop 构建会依据 schema 校验 `configLibrary`，并针对 CCR 写入的 4 个键（`authentication` 等）发出 `Ignoring local configuration value … not a recognized configuration key` 警告。缓解方案尚待落实；看到日志噪音的运维人员应持续关注该 issue。

## 3. 新模型与硬件支持

*今日未报告新增模型、后端或量化方案。*

## 4. 性能与优化

这三项内容均来自用户 `@Osamious` 的一次性能排查，共同勾勒出一幅完整图景：未缓存的每请求工作量会随 `Providers.length` 增长。

- **[#1775 — Linear latency vs. provider count](https://github.com/musistudio/claude-code-router/issues/1775)：** 由于内部一项 provider 展示元数据查询在每次请求时都会被重新计算，经网关的请求延迟随已配置 provider 数量**线性**增长。在一个上游耗时接近为零的隔离沙箱中实测，每新增一个 provider 都会带来大致恒定的额外开销——具体数字见 issue 正文。
- **[#1777 — `findProvider()` re-derives identity Sets per call](https://github.com/musistudio/claude-code-router/issues/1777)：** `Cy.prototype.findProvider(t)` 在每次调用时都会重建每个 provider 的身份 `Set`，而不是将选择器一次性归一化。在配置了 46 个 provider 的情况下，这相当于**每请求约 800k+ 次冗余操作**。属于典型的低成本修复点（预计算 / 记忆化）。
- **[#1776 — `getAppInfo` RPC ≈ 7.2s](https://github.com/musistudio/claude-code-router/issues/1776)：** 一条与 provider 数量没有明显缩放关系的独立代码路径反复以约 7.2s 的耗时返回，而同一网关上 `getConfig` 仅需约 6ms 即可响应。因根因尚未与 #1775 建立关联，故单独提交。

今日暂无已合并的性能修复，但这三个 issue 合在一起，为维护者提供了一份清晰且可度量的待办清单。

## 5. 稳定性与回归

按可能的用户影响程度排序：

1. **[HIGH] #1778 — Wrong protocol used when unchecked](https://github.com/musistudio/claude-code-router/issues/1778)** —— 即使该协议复选框未勾选、UI 已将其标记为 *Unavailable*（不可用），路由器仍会调用 `gemini_generate_content`。受影响的是那些期望“provider 禁用状态能真正禁用路由”的用户。*暂无修复 PR。*
2. **[MEDIUM] #1772 — Schema warnings on Claude Desktop](https://github.com/musistudio/claude-code-router/issues/1772)** —— 属表面问题但持续存在：每次启动 Claude Desktop 都会输出 4 条 "not a recognized configuration key" 警告。*暂无修复 PR。*
3. **[MEDIUM] #1775/#1776/#1777 — Latency regressions](https://github.com/musistudio/claude-code-router/issues/1775)** —— 详见“性能与优化”一节。功能本身正确，但会实质性拖累拥有大量 provider 的用户的吞吐。
4. **[LOW] #1771 — `tsc -b` fails: TS18003 in `tsconfig.node.json`](https://github.com/musistudio/claude-code-router/pull/1771)** —— 仅影响构建阶段；已有 PR 修复 `build/**/*.mjs` 的 `include` 通配符。
5. **[LOW] #1770 — Docker image missing `log-body.worker.js`](https://github.com/musistudio/claude-code-router/pull/1770)** —— Docker 构建会跳过 `buildRequestLogBodyWorker()`，导致镜像中缺少 UI bundle 引用的 worker 文件，浏览器内的日志正文渲染因此失效。

已提交的修复 PR（开放中，等待合并）：
- **[#1773 — Per-attempt failure details in aggregate errors](https://github.com/musistudio/claude-code-router/pull/1773)** —— 当所有目标均失败时，网关此后会展示每次尝试的 `stage`/`status`/`message`，而不再只返回 `"All target providers failed."`。对线上故障排查是一次直接的易用性提升。
- **[#1774 — Usage stats attribution for `provider/model` selectors](https://github.com/musistudio/claude-code-router/pull/1774)** —— 目前按模型的用量计数器会忽略通过显式 `provider/model` 路由的请求（例如环境变量配置的默认值），导致未过滤口径的总量虚高。该修复会将其归因到纯模型名。

## 6. 对应用开发者意味着什么

- **拥有大型 provider 池（数十个 provider）的运维者，今天应预期到可观的每请求额外开销。** 如果遇到无法解释的网关延迟，请检查所配置的 `Providers` 数量，并订阅 [#1775](https://github.com/musistudio/claude-code-router/issues/1775) / [#1777](https://github.com/musistudio/claude-code-router/issues/1777)——这类修复预计改动很小（记忆化），但收效显著。
- **请将 "Unavailable" 复选框视为提示性而非强制性的**，直至 [#1778](https://github.com/musistudio/claude-code-router/issues/1778) 修复。如果你已特意禁用 `gemini_generate_content` 却仍看到 Gemini 流量，请审查路由配置。
- **#1774 合并后，用量看板的数据会更真实。** 如果你依赖 CCR 的按模型统计来预测成本或分配预算，请注意：任何经由显式 `provider/model` 默认值路由的流量在历史数据中都存在少计。
- **#1773 一旦合并，回退调试将轻松许多** —— 每次尝试的 HTTP 状态码和错误信息都会出现在聚合错误负载中，这对客户端的重试 / 熔断逻辑是一项有意义的改进。
- **使用 Docker 自托管的用户应拉取包含 [#1770](https://github.com/musistudio/claude-code-router/pull/1770) 的构建版本** —— 否则 UI 的请求日志详情视图将无法正常使用。
- **在 [#1772](https://github.com/musistudio/claude-code-router/issues/1772) 解决之前，请预期（并忽略）Claude Desktop 上的 `not a recognized configuration key` 警告**；这些警告并不影响功能。

---

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 简报 — 2026-09-09

## 今日要点

一批协同推进的 **Responses API 代理加固**改动昨夜集中落地,解决了流截断、推理摘要保真、空 `reasoning_content` 块抖动,以及流式 Responses 的 TTFT 准确性问题。Codex 集成仍是 bug 报告的头号来源——热度前 15 的 issue 中有 6 个与 Codex 相关,从 v3.20.1 的认证绑定迁移死锁,到 Windows 上的用量同步游标失效,再到 macOS 直连绕过问题。与此同时，Qwen 预设目录已更名为 **千问AI平台**，并在全部七个受支持应用中完成了 3.8 世代的全量更新。

## 版本发布与破坏性变更

过去 24 小时无新版本发布。依据 issue 追踪,当前版本为 **v3.20.1**,存在已知回归(见“稳定性”部分)。

## 新模型与硬件支持

- **Qwen 3.8 世代全量更新**——国内 DashScope 预设更名为 **千问AI平台**，模型目录在 Claude Code、Claude Desktop、Codex、Hermes、OpenClaw、OpenCode 和 Pi 中全面更新([PR #7183](https://github.com/farion1231/cc-switch/pull/7183))。
- **Auto Mode 分类器路由**——为 Claude Code Auto Mode 的 pre-Bash 安全分类器请求新增专用 provider 链，实现会话流量与分类器流量的跨 provider 分流([PR #6602](https://github.com/farion1231/cc-switch/pull/6602))。
- **可配置的 Codex Provider ID**——官方统一历史与接管的 Provider ID 现已支持设备级配置(默认值为 `custom` / `cc-switch-official`)([PR #7073](https://github.com/farion1231/cc-switch/pull/7073))。
- **跨应用复制 provider**——可在应用之间复制 provider 卡片，按目标逐一报告成功/跳过/失败，并保留符合目标协议的元数据([PR #7225](https://github.com/farion1231/cc-switch/pull/7225))。

无新的硬件后端(CUDA/ROCm/Metal/CPU)或量化格式变更——CC Switch 是配置路由层，而非计算运行时。

## 性能与优化

- **Responses 流式的 TTFT 准确性**——首字节计时不再等待流末尾的 `usage`;已解耦为在首个有效事件时触发。修复了 TTFT ≈ 总延迟的症状([PR #7233](https://github.com/farion1231/cc-switch/pull/7233),相关 [#6637](https://github.com/farion1231/cc-switch/issues/6637))。
- **消除流式块抖动**——当上游发出空字符串 `reasoning_content` 占位符时,OpenAI Chat → Anthropic SSE 转换器不再在每个 chunk 上关闭/重开空的 `thinking` 块([PR #7227](https://github.com/farion1231/cc-switch/pull/7227))。
- **Responses 截断处理**——在因 web-search-limit 截断时，于 `stream_truncated` 之前合成干净的 `content_block` 关闭;对不完整终止则关闭悬空块([PR #7044](https://github.com/farion1231/cc-switch/pull/7044))。
- **修复 Codex 用量同步中 rollout 卡住的问题**——通过持久化的字节游标加文件大小比对,可检测 Windows 上 mtime 未变但文件内容仍在增长的情况([PR #7219](https://github.com/farion1231/cc-switch/pull/7219))。
- **Codex Responses Lite 工具保留**——直接携带 `input[].type = "additional_tools"` 的负载在 Chat 转换中现会被保留，不再被当作噪声丢弃([PR #6159](https://github.com/farion1231/cc-switch/pull/6159))。
- **面向 Claude Code 的 Responses 推理摘要**——开启 Claude thinking 时会请求可见摘要，并被转换为可回放的 Anthropic `thinking` 块，而非 `redacted_thinking`([PR #6814](https://github.com/farion1231/cc-switch/pull/6814))。

## 稳定性与回归

**高严重度(功能性死锁/数据丢失)：**

- **v3.20.1 上的 Codex 认证绑定迁移死锁**——工作区主键变更时 `authBinding.accountId` 未被迁移；用户被锁在所有 provider 之外，报“账号不存在”。已在 Windows 11 上确认([Issue #6969](https://github.com/farion1231/cc-switch/issues/6969))。*未找到修复 PR。*
- **Codex fork 用量丢失(GPT-5.6-Sol)**——从分页 rollout fork 出的子代理被永久标记为“父 rollout 尚未写到 child fork 时刻”;macOS v3.20.1 上所有 fork 用量均被丢弃([Issue #7084](https://github.com/farion1231/cc-switch/issues/7084))。*未找到修复 PR。*
- **Codex config.toml 的 `requires_openai_auth` 被覆盖**——CCS 强制覆盖用户设定的值，破坏自定义路由([Issue #7211](https://github.com/farion1231/cc-switch/issues/7211))。
- **Codex `/responses` 经代理返回 400**——未前置 `tool_calls` 的 `tool` 角色消息被拒绝;DeepSeek + `gpt-5.5` 组合调用失败([Issue #4741](https://github.com/farion1231/cc-switch/issues/4741))。
- **macOS 上 Codex 绕过本地代理**——Codex CLI(v0.147.0)直接访问 `wss://api.openai.com`,无视 `127.0.0.1:15722`;需要显式设置 `transport_kind = responses_http`。Windows 不受影响([Issue #6256](https://github.com/farion1231/cc-switch/issues/6256))。*部分缓解:[PR #7213](https://github.com/farion1231/cc-switch/pull/7213) 增加了 `NSLocalNetworkUsageDescription`。*

**中等严重度：**

- **Codex 429 限流风暴**——正常 Codex 调用期间出现 `exceeded retry limit, last status: 429`([Issue #4752](https://github.com/farion1231/cc-switch/issues/4752))。
- **Codex 仪表盘“真实消耗 Tokens”数据陈旧**——增量同步有写入，但摘要卡片只在手动重建后才刷新([Issue #7135](https://github.com/farion1231/cc-switch/issues/7135))。
- **公共配置数组替换导致 provider 丢失**——`deepMerge` 会粗暴覆盖 provider 条目；该 PR 将公共配置数组视为子集，执行去重并集合并([Issue/PR #6144](https://github.com/farion1231/cc-switch/pull/6144))。
- **OpenCodeGo 缺失 `x-opencode-session`**——自 09/06 起,provider 会拒绝不带该 header 的请求([Issue #7088](https://github.com/farion1231/cc-switch/issues/7088))。
- **编辑配置时符号链接被替换**——编辑配置文件会破坏已有的符号链接([Issue #5129](https://github.com/farion1231/cc-switch/issues/5129))。
- **v3.16.3 缓存代理状态 → 502**——关闭开关后代理标志仍为 true([Issue #4679](https://github.com/farion1231/cc-switch/issues/4679))。

**较低严重度/配置类：**

Claude Desktop Anthropic 协议错误([Issue #6605](https://github.com/farion1231/cc-switch/issues/6605));Codex + ChatGPT 合并后 Code 字段不匹配([Issue #5342](https://github.com/farion1231/cc-switch/issues/5342));`X-OpenAI-Internal-Codex-Responses-Lite` 模型不支持([Issue #4862](https://github.com/farion1231/cc-switch/issues/4862));局域网 API 无法访问([Issue #7109](https://github.com/farion1231/cc-switch/issues/7109));启动时默认应用抢占焦点([Issue #6935](https://github.com/farion1231/cc-switch/issues/6935));OpenCodeGo 通过 CLI 处理图像([Issue #5141](https://github.com/farion1231/cc-switch/issues/5141))。

**近期已关闭：** ZCode 支持请求([Issue #4744](https://github.com/farion1231/cc-switch/issues/4744));OpenAI Codex v0.150.1 `unknown variant 'custom'`([Issue #6944](https://github.com/farion1231/cc-switch/issues/6944));Windows 找不到 `claude`([Issue #1438](https://github.com/farion1231/cc-switch/issues/1438));settings.json 登录问题([Issue #404](https://github.com/farion1231/cc-switch/issues/404))。

## 对应用开发者意味着什么

1. **重度依赖 Codex 的工作流请避开 v3.20.1**——两个尚未修复的死锁(认证迁移、fork 用量追踪)加上 macOS 直连绕过，可能悄然破坏路由并丢失用量记录。如果你依赖 Codex,请锁定 v3.20.0 或等待下一个补丁版本。
2. **为 Qwen 3.8 迁移做好规划**——所有 Qwen 预设现均为 3.8 世代；在拉取预设更新之前，请检查固定脚本、CI 矩阵或成本看板中的模型名称。
3. **流式遥测终于可信了**——Responses 流上的 TTFT 不再被钉死在总延迟上。如果你通过仪表盘观测 CC Switch,下个版本的指标将反映真实的首 token 行为。
4. **跨 provider 的 Auto Mode 路由现已可行**——分类器队列允许你把安全分类器流量固定到一个便宜/快速的模型上，同时为会话保留更强的模型。适合用于 Claude Code Auto Mode 的成本控制。
5. **macOS 用户需授予本地网络权限**——升级后会出现一次性授权提示；否则局域网 API 会静默失败([PR #7213](https://github.com/farion1231/cc-switch/pull/7213))。
6. **Provider 管理更完善了**——跨应用复制([PR #7225](https://github.com/farion1231/cc-switch/pull/7225))与保留元数据的通用同步([PR #7212](https://github.com/farion1231/cc-switch/pull/7212))降低了在添加统一 provider 上游时丢失各应用专属用量脚本的风险。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# 新 API 速览 — 2026-09-09

## 今日要点

团队发布了 **v1.0.0-rc.36**，重点围绕任务插件、插件市场以及定价/配额配置，并新增了一项值得注意的能力：可以以站点本地货币显示价格，但仍然以美元扣除配额。在维护方面，暴露了两项计费/指标正确性问题（#7229 图片缓存重复计费、#7134 已取消的流被计入失败），运维人员应持续跟踪；AWS 默认凭证链提案（#7257）虽然被关闭并判定为无效，但随后又以实现 PR（#7258）的形式重新出现，仍处于开放状态。

## 版本发布与破坏性变更

- **v1.0.0-rc.36 — 任务插件、定价配置与配额**（[release](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.36)）
  - 新增插件图标、网站、元数据与能力字段；新增渠道流程可自动填充匹配的插件信息。
  - 定价配置现可按站点显示货币录入/查看价格，**但配额仍以美元扣除** —— 运维人员应审查面向用户的定价页面，确认双币种的交互体验保持一致。
  - 模型管理、目录/广场展示、API Key 与用户配额处理、使用日志以及兑换码均有改进。

## 新模型与硬件支持

- **xAI Grok Imagine Video 异步任务**提案（[#7251](https://github.com/QuantumNous/new-api/issues/7251)）—— 将为 Grok 的视频生成异步任务模型增加专用路径，与现有视频渠道并存。
- **AWS Bedrock 默认凭证链**（[#7258](https://github.com/QuantumNous/new-api/pull/7258)，关闭 [#7257](https://github.com/QuantumNous/new-api/issues/7257)）—— 支持 AWS 渠道的实例角色 / IRSA / IAM Roles Anywhere，无需再将静态密钥硬编码到部署中。
- **DaoXE 渠道类型**请求（[#7264](https://github.com/QuantumNous/new-api/issues/7264)）—— 关闭并判定为无效；用户已可通过通用 OpenAI 兼容的自定义渠道配合 base URL 完成接入。

## 性能与优化

- **多 Key 渠道「测试所有 Key」**（[#7112](https://github.com/QuantumNous/new-api/pull/7112)，开放）—— 并发测试多 Key 渠道中的所有 Key，并附带自动禁用规则；为管理大规模渠道池的运维人员带来显著提速。
- **活跃渠道主动探测开关**（[#7161](https://github.com/QuantumNous/new-api/pull/7161)，开放）—— 优化了节流策略，并提供可选的探测开关，减少冷启动渠道上的无效上游调用。
- **已取消流指标污染修复路径**（[#7134](https://github.com/QuantumNous/new-api/issues/7134)）—— 当下游客户端中途断开流式连接时，当前请求会被计入失败率的分母；该问题一旦修复，仪表盘上的渠道可靠性表现将得到实质性改善。
- **本期窗口内关闭的探索性 PR**：Responses WebSocket v2 整合（[#6914](https://github.com/QuantumNous/new-api/pull/6914)）、非流式 Claude 调用方的 SSE 缓冲（[#6292](https://github.com/QuantumNous/new-api/pull/6292)）、使用日志实时刷新（[#6291](https://github.com/QuantumNous/new-api/pull/6291)）、渠道测试的 Responses 兼容策略（[#6290](https://github.com/QuantumNous/new-api/pull/6290)）、按小时更新的美元汇率源（[#7265](https://github.com/QuantumNous/new-api/pull/7265)）。

## 稳定性与回归

按严重程度排序，面向自托管用户：

1. **[BUG，严重] 图片缓存命中触发重复计费** —— [#7229](https://github.com/QuantumNous/new-api/issues/7229)（开放，v1.0.0-rc.30）。缓存的图片响应似乎被计费两次。**应对措施：** 审计图片生成使用日志中的重复配额记录；在修复前考虑设置每日图片配额上限。
2. **[BUG] 客户端取消的流被计入失败** —— [#7134](https://github.com/QuantumNous/new-api/issues/7134)（开放）。会抬高渠道失败率；该 issue 中包含完整的根因分析。
3. **[BUG] Qwen3 `enable_thinking` 未透传至阿里云** —— [#1013](https://github.com/QuantumNous/new-api/issues/1013)（开放，长期未更新，6 条评论）。非流式 Qwen3 调用会静默继承默认的「开启思考」行为，而阿里云在非流式响应中禁止该行为。
4. **[BUG] 注册时未发送 SMTP 验证码** —— [#3126](https://github.com/QuantumNous/new-api/issues/3126)（开放，长期未更新）。SMTP 测试发送正常，仅注册流程未能触发。
5. **[BUG] 充值金额小数位显示异常** —— [#3177](https://github.com/QuantumNous/new-api/issues/3177)（开放，长期未更新）。
6. **[BUG] 音频处理器缺少参数覆盖** —— [#3191](https://github.com/QuantumNous/new-api/issues/3191)（开放，长期未更新）。
7. **[BUG] CNY 显示对订阅价格重复除以汇率** —— [#3206](https://github.com/QuantumNous/new-api/issues/3206)（开放，长期未更新）—— 涉及资金正确性，升级后值得复核。

**本期窗口已落地的修复 PR：**

- **SSE 编码加固**（[#7259](https://github.com/QuantumNous/new-api/pull/7259)，开放）—— 修复了 `common/custom-event.go` 中一个潜在的 `data.(string)` panic，适用于未来任何发出非字符串 SSE 负载的渠道；同时修复了 Coze 流式响应中的 body 泄露，并移除了默认密码的死代码。强烈建议尽快合入，这是一项边缘输入下的 panic 风险。

## 对应用开发者的影响

- **建议升级到 v1.0.0-rc.36 以获得市场/插件相关的改进**，但需审视双币种定价展示（本地币种用于显示，美元用于扣费）的对外沟通方式 —— 在本代码库中，意外少收费用类 bug（参见 #3206）是一类反复出现的问题。
- **如果你使用 AWS Bedrock 自托管**，请关注 PR [#7258](https://github.com/QuantumNous/new-api/pull/7258) —— 合入后将无需再向中转 Pod 分发长期有效的 AWS 密钥。
- **如果你将 Grok Image 路由至 Grok Imagine Video**，可通过 [#7251](https://github.com/QuantumNous/new-api/issues/7251) 申请访问；异步任务模型将需要新的客户端集成方式（轮询或 Webhook）。
- **当前运营仪表盘上的失败率可能被高估**，原因正是 [#7134](https://github.com/QuantumNous/new-api/issues/7134)；在修复之前，针对渠道 SLO 告警前应先过滤掉已取消的流式样本。
- **对于图片类工作负载，建议在应用层设置配额上限**，作为对 [#7229](https://github.com/QuantumNous/new-api/issues/7229) 重复计费问题的短期防御手段，直至修复落地。
- **管理/安全姿态加固**即将到来，相关 issue 包括 [#7262](https://github.com/QuantumNous/new-api/issues/7262)（API Key 最大有效期强制执行）、[#7263](https://github.com/QuantumNous/new-api/issues/7263)（组织级 2FA）以及 [#7261](https://github.com/QuantumNous/new-api/issues/7261)（管理员查看/管理用户 API Key）—— 这些功能上线后请规划好面向租户的公告沟通。
- **#7256（桌面端登录中转）被关闭并判定为无效**，说明维护者并不打算在网关层实现浏览器到桌面端的鉴权交接；LoongPort 等桌面端工具作者需要继续在客户端侧实现该流程。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*