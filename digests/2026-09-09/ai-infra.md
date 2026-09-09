# AI 基础设施日报 2026-09-09

> 生成时间: 2026-09-09 11:30 UTC | 覆盖项目: 9 个

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

# 跨项目对比报告 — 2026-09-09

**范围：** vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth、Claude Code Router (CCR)、CC Switch、New API

---

## 1. 生态概览

当前的推理生态已清晰地分层为四层 —— 数据中心服务引擎（vLLM、SGLang）、本地运行时（llama.cpp、Ollama）、网关/路由层（LiteLLM、New API、CCR、CC Switch），以及微调/工作站工具（Unsloth）—— 今天各层的动态显示它们正以不同方式吸收同一波行业变革。主导的技术主题是 **混合/线性注意力架构（Mamba、GDN、DSA 稀疏注意力）加上投机解码（MTP/EAGLE）** 与智能体工作负载所依赖的前缀缓存契约之间的冲突，vLLM 出现了 30–40% 的吞吐量下降，SGLang 正在进行积极的缓解工作。第二个贯穿各层的主题是 **消费级 Blackwell（sm_120/121）不稳定**，分别影响 vLLM、llama.cpp 和 Ollama 的用户。在上层栈中，网关类项目正在围绕 **计费正确性与 Claude Code/Codex CLI 集成** 形成差异化，而供应链安全（cosign 签名、模型签名、RCE 修复）正从事后补丁升级为路线图项目。

---

## 2. 活跃度对比

*计数 = 各项目摘要中引用的独立 issue/PR（约 24 小时窗口），并非完整仓库查询。*

| 项目 | 引用 issue | 引用 PR | 发布状态 |
|---|---|---|---|
| **llama.cpp** | ~22 | ~27 | **9 个 tag**（b10865–b10875）；`--mmap`/`--mlock`/`--direct-io` 在 b10875 中移除 |
| **SGLang** | ~21 | ~19 | 无发布；AMD/NPU/CPU/diffusion 合并活跃 |
| **vLLM** | ~17 | ~14 | **v0.29.0** —— 594 次提交，277 位贡献者（91 位新加入）；MRV2 现为默认 |
| **CC Switch** | ~18 | ~14 | 无发布；Cursor（+4,123 LOC）和 DSH 支持落地 |
| **New API** | ~15 | ~14 | **v1.0.0-rc.36** —— 任务插件与市场 |
| **Unsloth** | ~15 | ~12 | **v0.1.807-beta** —— AMD Vulkan 默认，RCE 修复 |
| **Ollama** | ~15 | ~10 | 无发布；修复已暂存至下个次版本 |
| **LiteLLM** | ~7 | ~13 | **v1.102.0-dev.1**（cosign 签名）+ stable/1.87.x 回移植 |
| **Claude Code Router** | 7 | 2 | 无发布（v3.0.22）；issue 多、PR 少 |

**要点：** llama.cpp、SGLang 和 vLLM 合并工作的原始吞吐量最高；CCR 是异常值，issue:PR 比为 7:2，且其头部问题没有任何修复落地。

---

## 3. 模型支持竞速

| 项目 | 本窗口新增模型/架构 |
|---|---|
| **SGLang** | DeepSeek-V4（CPU kernel、Mooncake/UMBP linker）、Kimi-K3（NPU CI）、GLM-5.2（NPU FP8-KV + MLAProlog）、**VDN-H3 扩散混合**（`vdn-minimax-h3`，8-NFE DMD2）、SenseNova-U1 跟踪 |
| **vLLM** | Gemma4 QKV-Fuser、BailingMoeV2 RoPE 修复、Qwen3-VL PP 修复、Mistral/Magistral 推理解析器（Rust）、XPU 上的 NVFP4 仿真；DeepSeek-V4-Flash Ampere 支持仍未合并（#50576） |
| **llama.cpp** | GLM-5.3-Flash MTP（进行中，15👍）、HRM-Text/DFM Mimir 1B、Granite 3 MoE 修复、Blackwell 上强制启用 NVFP4 W4A8、MoE 的 IQ 量化 |
| **Ollama** | 无新增本地模型；云目录请求（Longcat 2.0、Jamba、Hunyuan Hy3…） |
| **New API** | Veo 3.1（Vertex）、MiniMax H3 视频 V2，含预扣/退款语义 |
| **CC Switch / CCR / LiteLLM** | 提供商/平台集成而非模型（Copilot-hosted Codex、Laonong 预设、Vertex Claude 版本化 ID） |

**领先者：** **SGLang** 的前沿架构覆盖最广 —— 它是唯一同时支持 DeepSeek-V4、Kimi-K3、GLM-5.2 以及扩散混合模型、并跨四个硬件栈（CUDA、ROCm、NPU、CPU）发布的项目。**vLLM** 以广度换取 Transformers 后端深度与 Blackwell 启用；**llama.cpp** 在量化格式（IQ、NVFP4、TQ）和异构目标（RISC-V、s390x、OpenVINO NPU）上胜出。网关层仅通过定价/配置项跟踪模型更新速度 —— 注意 LiteLLM 中 Azure DeepSeek-V4 定价仍未更新（#30129）。

---

## 4. 性能前沿

优化工作集中在六个方向：

1. **KV 缓存与前缀缓存（重心所在）。** vLLM：用于 KV 自动伸缩的 CUDA-graph 内存分析、分层观测指标、上下文感知保留 RFC（#37003），以及关键的混合 GDN 前缀缓存修复（#52244）。SGLang：HiCache 扩展至混合 SWA/Mamba 模型（#38634）、Mooncake 端到端追踪、512K token DSA 集群路径重构。Unsloth：KV 抢占使 N 个并行聊天共享一个缓存（`--parallel N --kv-unified`）。Ollama：消除了冷启动智能体轮次上 17–27 秒的 MLX 重新预填充。
2. **投机解码的正确性。** MTP/EAGLE 已是标配，但也是大多数严重未解 bug 的直接原因：vLLM 在混合 GDN 上 30–40% 的吞吐量下降、llama.cpp 的跨请求 MTP 状态泄漏、SGLang 的 DFlash/DSpark TP 死锁（已通过确定性 top-p/top-k kernel 修复，#38565）。
3. **冷启动与权重加载 —— 新近显性化的优化轴。** SGLang 的权重缓存守护进程：Qwen3-235B FP8 加载从约 306–327 秒降至 **<1 秒**。Ollama 的统一 GGUF 元数据缓存消除了重复抽取。
4. **Kernel。** 为 vLLM ROCm 自定义算子提出的 Helion（H100 上 1.382–1.785× 几何平均）；AITER 融合 DSA 索引器前导；llama.cpp Vulkan iq4_xs（RDNA4 上 +6–17%）、CPU VNNI 平铺 mul_mat（3–7×）、Metal FA 瓦片加宽（+6.8%）。
5. **量化。** NVFP4 现已成为 vLLM、SGLang 和 llama.cpp 的关键格式 —— 但也有成熟度成本（SGLang 的 `tiny_gemm` 约 4% 退化、vLLM sm_120 在 NVFP4 + FP8-KV 下崩溃）。
6. **网关开销。** 唯一的网关层性能工作：CCR 的随提供商数量线性增长的延迟 bug（#1775/#1777）和 New API 通过 `/api/status` 去重实现的首页约 25% 改善。

---

## 5. 层级定位

- **数据中心服务引擎 —— vLLM、SGLang。** 围绕多 GPU 并行（TP/PP/DP）、投机解码、解聚和调度器成熟度展开竞争。其风险特征是架构层面的频繁变更：vLLM 在 v0.29.0 中将 MRV2 设为默认会中途改变采样器/logprobs 语义；SGLang 承载着深度按平台分叉（AITER、CANN、CPU），使其测试面成倍增加。
- **本地运行时核心 —— llama.cpp。** 底层基座：量化格式、GGUF，以及最广泛的硬件矩阵（包括 OpenVINO NPU、Adreno、s390x）。其下游所有项目（Ollama、Unsloth serving）都构建于其之上 —— llama.cpp 的 `--preempt-ram` 直接启用了 Unsloth 的 KV 抢占功能。
- **本地分发与体验 —— Ollama。** 增加打包、模型注册中心、MLX 运行器以及云端层。它的问题是集成层面的（Vulkan 退化、云端与供应商版本差异，如 `glm-5.3:cloud`）而非 kernel 层面。
- **网关 —— LiteLLM（企业级：鉴权、预算、花费、签名镜像）、New API（多租户转售：计费、配额、市场）。** 它们的故障模式关乎金钱而非 token：仅今天 New API 就修复了一个实时重复扣费和一个将 `:countTokens` 按生成计费的 bug，而 LiteLLM 回移植了 Anthropic 流式成本回收。**CCR 和 CC Switch** 占据一个较新的细分领域 —— 专门面向智能体编码 CLI（Claude Code、Codex、OpenCode，现已涵盖 Cursor 和 DSH）的客户端路由 —— 其成败完全取决于上游协议变更。
- **微调/工作站 —— Unsloth。** QLoRA 性能加上有主张的本地 serving 栈（Studio、Spark 编排）。值得注意的是它横向扩展到 serving（双 Spark 编排器、KV 抢占）而非纵向扩展到分布式训练。

---

## 6. 趋势信号

1. **混合注意力打破前缀缓存契约 —— 智能体基础设施的头号风险。** 每个引擎都有相关未解 bug（vLLM #53670/#53142、SGLang 混合 HiCache 工作、llama.cpp `gated_delta_net` 融合）。由于智能体经济依赖于前缀缓存命中率，应将混合模型 + 投机解码栈视为不稳定，直到 vLLM #52244 类修复落地并在你的工作负载上验证通过。
2. **消费级 Blackwell（sm_120/121/RTX 5090/GB10）是可靠性未知数。** 三个独立项目在同一硅片世代上报崩溃/挂起。务实做法：workaround 存在（`GGML_CUDA_DISABLE_GRAPHS=1`、`TRITON_ATTN`），固定版本，且暂不要将 Blackwell 工作站部署视为生产就绪。
3. **计费正确性是网关层的系统性弱点。** 缓存 token 漏计（New API #7290、CC Switch #6626）、重复扣费、中断流的成本丢失（LiteLLM）—— 这些都正在涌现，*原因正是* 智能体缓存使 token 核算变得不再简单。预期提示缓存计费准确度将成为采购清单上的勾选项。
4. **智能体 CLI 生态现已成为一等集成目标。** CCR 和 CC Switch 完全为 Claude Code/Codex 路由而存在；一次上游 header 变更（`x-opencode-session`，于 2026-09-05/06 强制启用）就击垮了一个路由器，而另一个在数天内就做了预防性修复。留意配置覆盖隐患（CC Switch #6875 会破坏 `~/.codex/` 状态）。
5. **安全向上层推进。** Unsloth 为无标记工具调用发布了 prompt-injection-to-RCE 修复；LiteLLM 对镜像进行 cosign 签名；Ollama 正在暂存模型签名。具备 shell/工具访问能力的本地智能体是真实的攻击面 —— 立即补丁 Studio 安装。
6. **非 NVIDIA 动能持续叠加。** Vulkan 成为默认后端（Unsloth，+20%）、ROCm 10 CI 整合（SGLang）、aiter DCP、CANN 9.1 NPU 套件、CPU 上的 DeepSeek-V4。多供应商正从对标项目转向已交付能力。
7. **AI 生成的贡献正在规模化。** New API 的维护者对一批质量尚可、由智能体编写的 PR 进行了协调性分类 —— 审查负担，尤其是在计费路径上，是新的运营成本。

**开发者关注清单：** vLLM PR #52244（混合前缀缓存）和 MRV2 logprobs RFC #42259；SGLang #33549 的长上下文 DeepSeek-V4 验证；Ollama v0.32.9 作为最后一个可用的 AMD iGPU 固定版本；Unsloth PR #10507（RCE）；New API rc.30–35 计费对账；CCR #1780/#1781（如果你路由到 opencode-go 或 Meta Responses 工具流）。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 简报 — 2026-09-09

## 今日要点

**v0.29.0 已发布**，包含 594 个 commit，来自 277 位贡献者（其中 91 位新贡献者），将 **Model Runner V2 升级为所有模型的默认 Runner**——这是一项重大架构里程碑，同时引入了用于 KV cache 自动调整的 CUDA graph 显存剖析功能。社区正在密集提交一批严重的 **混合 Mamba/GDN 模型在推测解码（MTP/EAGLE）下的 prefix-cache 回归问题**，报告在重放 prompt 时吞吐量下降 30–40%，以及多起与 FlashInfer attention 和 Qwen3.8-Flash-Next 数值问题相关的 **Blackwell（sm_120）和 GB10（sm_121）崩溃**。

---

## 发布与破坏性变更

- **v0.29.0 已发布** — [release notes](https://github.com/vllm-project/vllm/releases/tag/v0.29.0)
  - *Model Runner V2（MRV2）现已成为所有模型的默认 Runner*（PR [#53183](https://github.com/vllm-project/vllm/pull/53183)）。此前仅 pooling 模型默认使用 MRV2。
  - MRV2 新增用于 KV cache 自动调整的 CUDA graph 显存剖析功能。
  - **迁移提示：** 应重新验证现有 V1 特定的日志/logprobs 假设——参见新增的 [MRV2 logprobs/logits 语义 RFC #42259](https://github.com/vllm-project/vllm/issues/42259)。

---

## 新增模型与硬件支持

- **Gemma4 QKV-Fuser** 在 Transformers 后端启用——将 `q/k/v` 投影融合为单个 `QKVParallelLinear` GEMM（[PR #55690](https://github.com/vllm-project/vllm/pull/55690)）。
- **BailingMoeV2 RoPE 修复** 以兼容 Transformers v5——将顶层 `rope_theta` 合并到 `rope_parameters` 中（[PR #56066](https://github.com/vllm-project/vllm/pull/56066)）。
- **Qwen3-VL(-MoE) 流水线并行** bug 修复——使用 `--pipeline-parallel-size > 1` 时引擎初始化现可成功（[PR #43272](https://github.com/vllm-project/vllm/pull/43272)，修复 [#43271](https://github.com/vllm-project/vllm/issues/43271)）。
- **Mistral/Magistral 推理解析器** 已添加到 Rust 前端（[PR #48013](https://github.com/vllm-project/vllm/pull/48013)，属于 Rust 功能对齐工作 [#44280](https://github.com/vllm-project/vllm/issues/44280) 的一部分）。
- **XPU NVFP4 量化**——`EmulationNvFp4LinearKernel` 现已注册，因此 NVFP4 checkpoint 可在 Intel GPU 上加载（[PR #56060](https://github.com/vllm-project/vllm/pull/56060)）。
- **DeepSeek-V4-Flash / -Flash-0731 SM8x（Ampere）支持**——仍处于 **OPEN** 状态，暂无修复（[#50576](https://github.com/vllm-project/vllm/issues/50576)，14 👍，106 条评论）。

---

## 性能与优化

- **MTP/EAGLE 在 Qwen3.8 GDN 上 prefix-cache 命中失效**——首次重放 prompt 时未命中 cache，需完全重新 prefill；在复用 prefix 的工作负载上批量吞吐量损失约 30–40%（[#53670](https://github.com/vllm-project/vllm/issues/53670)）。修复候选：[PR #52244](https://github.com/vllm-project/vllm/pull/52244) 在 MTP 推测解码下恢复混合 GDN prefix-cache 命中。
- **ROCm 稀疏 prefill MQA logits 填充被跳过**——向 AITER 传入 `clean_logits=False`，每步移除一次 FP32 `-inf` 填充（[PR #51314](https://github.com/vllm-project/vllm/pull/51314)）。
- **ROCm DSA 索引器 prologue 与 AITER 融合**——将 K-norm / RoPE / FP8 量化 / K-cache 写入合并为一个 kernel（[PR #51315](https://github.com/vllm-project/vllm/pull/51315)）。
- **XPU W8A8 block-FP8 GEMM 针对 Arc Pro B70 调优**——附带针对 `block_shape=[128,128]` 的 Triton 调优配置（[PR #56063](https://github.com/vllm-project/vllm/pull/56063)）。
- **CUTLASS Lamport GEMM + AllReduce 集成方案**针对 SM100/Blackwell 提出——将替换现有的 GEMM-Reduction split-kernel 路径（[#55261](https://github.com/vllm-project/vllm/issues/55261)）。
- **Helion 用于选定的 vLLM CustomOps（ROCm RFC）**——三个经过基准测试的 Helion kernel 在 H100 上相比现有 CUDA 实现获得 **1.382–1.785× 几何平均加速**（[#53788](https://github.com/vllm-project/vllm/issues/53788)）。
- **KV offload 分层可观测性**——新增 `vllm:kv_offload_tiering_promotion_latency_seconds` 直方图，按 tier 标记，bucket 从 100µs 到 10s（[PR #53910](https://github.com/vllm-project/vllm/pull/53910)）。
- **KV offload `block`→`chunk` 重命名**——消除 GPU 分配器单元与 offload 传输单元之间的歧义（[PR #52615](https://github.com/vllm-project/vllm/pull/52615)）。
- **前端：延迟 reasoning 使用量重计**——避免在非连续聊天流的每个 delta 上重新解码整个历史（[PR #56067](https://github.com/vllm-project/vllm/pull/56067)）。

---

## 稳定性与回归问题

🔴 **高严重性**
- **FlashInfer attention：在 sm_120 上使用 NVFP4 + fp8 KV cache 时出现 CUDA 非法内存访问**——在 16 token 的请求上崩溃；`TRITON_ATTN` 不受影响。影响 RTX PRO 6000 Blackwell Max-Q 在 vLLM 0.27.1 上的运行（[#54225](https://github.com/vllm-project/vllm/issues/54225)）。
- **Qwen3.8-Flash-Next：在 GB10（sm_121）上启用 prefix cache 时 GDN 路径出现 CUBLAS_STATUS_INTERNAL_ERROR / 非法内存访问**；`--no-async-scheduling` 无效（[#54173](https://github.com/vllm-project/vllm/issues/54173)）。
- **混合 mamba 对齐预拷贝：使用显式 `--block-size` 时 prefix-cache 恢复时出现非法内存访问**——Mamba state 列以错误的 block size 进行 seed（[#53142](https://github.com/vllm-project/vllm/issues/53142)）。*未关联修复 PR。*
- **Qwen3.8-Flash-Next：在 sm_121/GB10 上当 prompt 长度接近 `indexer_budget`（Qwen Sparse Attention dense→top-k 切换）时，`persistent_topk` 在 prefill 中产生非确定性贪心解码**——五个相同请求，五种不同输出（[#54521](https://github.com/vllm-project/vllm/issues/54521)）。
- **SM120 上持续多小时运行下反复出现 Xid 13 全芯片 warp 错误**，负载为 Nemotron-3.5-Lightning-30B-A3B-NVFP4 + marlin MoE + 混合 Mamba（[#52225](https://github.com/vllm-project/vllm/issues/52225)）。
- **`persistent_topk` 在多个值共享同一粗直方图 bin 时静默丢弃 top-k 候选项**——在 B300（sm_103）上观察到（[#51782](https://github.com/vllm-project/vllm/issues/51782)）。

🟠 **中等**
- **Model Runner V2 中 `thinking_token_budget` 被忽略（Qwen3.8 NVFP4 + MTP）**——tool-calling 预算计数错误（[#54906](https://github.com/vllm-project/vllm/issues/54906)）。
- **在 Intel XPU 上加载模型后主机内存未释放**（[#50269](https://github.com/vllm-project/vllm/issues/50269)）。
- **结构化输出（-1 填充的 spec-decoding token）在进入 grammar 时可能使引擎崩溃**——无效的 `token_id` 会导致引擎停止（[#51450](https://github.com/vllm-project/vllm/pull/51450) 提出修复）。

⚪ **已关闭 / 信息性**
- Intel Arc B50（Battlemage）TP=2 `zeMemOpenIpcHandle` 崩溃——**已关闭**（[#48953](https://github.com/vllm-project/vllm/issues/48953)）。
- Rust 前端功能对齐追踪——作为路线图 issue **已关闭**（[#44280](https://github.com/vllm-project/vllm/issues/44280)）；工作通过子 issue 持续推进。
- 混合模型部分 cache 命中 RFC——**已关闭**（[#45702](https://github.com/vllm-project/vllm/issues/45702)）。

---

## 对应用开发者的意义

1. **升级到 v0.29.0 前请固定版本并验证。** MRV2 成为默认意味着采样器语义、logprobs 排序和 `thinking_token_budget` 行为可能发生变化；请关注开放的 [logprobs/logits 确定性 RFC #42259](https://github.com/vllm-project/vllm/issues/42259)，并在新的 runner 上复现所有 RL/eval 流水线。
2. **在 [PR #52244](https://github.com/vllm-project/vllm/pull/52244) 合并之前，请勿在混合 Qwen3.8 GDN/Mamba 工作负载上启用推测解码**——首 prompt 的 prefix-cache 未命中可能耗尽整个 prefill 开销；对生产环境的 agent 而言，这是一个严重的尾延迟问题。
3. **Blackwell sm_120 + GB10 sm_121 用户：不要在 0.27.1 上将 FlashInfer attention 与 NVFP4 + fp8 KV cache 配合使用。** 请使用 `TRITON_ATTN` 或等待 0.29.x 中的修复。`persistent_topk` 和 prefix-cache 预拷贝崩溃可能导致挂起或错误输出，且无明显错误信息。
4. **在 Qwen3.8 推理模型上使用 NVFP4+MTP 进行 tool-calling：** 请验证 `thinking_token_budget` 是否生效——在 MRV2 下其会被静默丢弃（[#54906](https://github.com/vllm-project/vllm/issues/54906)）。
5. **对于 ROCm 部署**，基于 AITER 的稀疏 prefill 和融合 DSA 索引器路径（[PR #51314](https://github.com/vllm-project/vllm/pull/51314)、[#51315](https://github.com/vllm-project/vllm-project/vllm/pull/51315)）值得通过自定义构建进行 backport；如果你的目标是 H100，Helion 提案（[#53788](https://github.com/vllm-project/vllm/issues/53788)）值得关注。
6. **面向 agent 工作负载的上下文感知 KV-cache 保留（优先级驱逐）** 正在活跃的 RFC 中（[#37003](https://github.com/vllm-project/vllm/issues/37003)）——如果你服务的是使用工具的 agent，这是需要关注其可能改变 prefix-cache 行为的 API。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-09

## 今日要点

- **Weight Cache Daemon 进展明显** — 第一阶段（per-rank CUDA-IPC 守护进程，Qwen3-235B FP8 权重加载 <1s）已发布，路线图讨论帖（#33522，23 条评论）正在积极规划后续的恢复优化。 [#33522](https://github.com/sgl-project/sglang/issues/33522)
- **两个阻塞生产的正确性缺陷浮出水面** — DeepSeek-V4 TP8 在约 245K context 时挂起，所有 GPU 占用率 100%（#33549）；DeepSeek-R1 NVFP4 上约 4% 的 decode 回归已被定位到 #34693 中的统一 `tiny_gemm` 替换（#38628）。PR #38565 合入了一个确定性的 top-p/top-k 修复，这也是 DFlash/DSpark TP>1 死锁的根因。
- **AMD、NPU、CPU 平台整合** — AMD CI 正在向 ROCm 10 收敛（#38632），NPU CI 新增 CANN 9.1.0 覆盖（#38332），aiter 新增 DCP 支持（#34432），与此同时 CPU 与 NPU 路径持续获得一等支持的 DSv4/GLM-5.2/Kimi-K3 特性。

## 发布与破坏性变更

过去 24 小时内无新发布。无破坏性 API/配置变更公告。

## 新增模型与硬件支持

- **Diffusion / VDN-H3** — 通过新增的 `hybrid_window_attn_h3` 后端，支持 OpenVDN `vdn-minimax-h3`（MiniMax-H3 混合窗口 softmax + Video Delta 线性注意力，8-NFE DMD2 蒸馏）。 [#37903](https://github.com/sgl-project/sglang/pull/37903)
- **CPU sgl-kernel for DeepSeek-V4** — 第一部分：带 KV cache 的 flash-MLA 注意力（FP8 KV，稀疏）、FusedMoE 以及 group-GEMM。 [#32222](https://github.com/sgl-project/sglang/pull/32222)
- **Diffusion AMX CPU 优化** — 重新合入 #28527，并修复了重复的 `process_weight_after_loading` 问题。 [#30719](https://github.com/sgl-project/sglang/pull/30719)
- **AMD/ROCm** — Aiter 后端新增 Decode Context Parallelism（DCP）（第 1/N 部分）[#34432](https://github.com/sgl-project/sglang/pull/34432)；aiter asm paged-varlen FP8 page-64 prefill for gfx950 [#36505](https://github.com/sgl-project/sglang/pull/36505)；DeepSeek-V4 在 UMBP/Mooncake 直接外部链接器中的统一 KV [#38269](https://github.com/sgl-project/sglang/pull/38269)。
- **NPU** — 950PR/DT 上的 GLM-5.2 推理，支持 FP8 KV + MLAProlog，并缩减 indexer cache 占用 [#38250](https://github.com/sgl-project/sglang/pull/38250

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-09

## 今日要点
最关键的变化是 **正式移除遗留的 `--mmap` / `--mlock` / `--direct-io` 命令行标志**，见 [b10875 / #28334](https://github.com/ggml-org/llama.cpp/pull/28334)，完成了向统一 `--load-mode` 标志的迁移。性能方面，Vulkan 在 AMD 上持续成熟：新增的 iq4_xs mat-vec 着色器（[#28426](https://github.com/ggml-org/llama.cpp/pull/28426)）在 RDNA4 上带来约 6–17% 的 tok/s 提升，而 int8 coopmat1 矩阵乘（[#27952](https://github.com/ggml-org/llama.cpp/pull/27952)）覆盖了 RDNA3/4 上的 q4/q5/q8/q3_k/q4_k/q5_k/q6_k/mxfp4/nvfp4/iq4_nl。围绕 **CUDA 在 RTX 5090 / sm_120 上的稳定性问题** 正在增多，多个开放 issue 涉及 GPU 卡死、全芯片重置以及 mmq 构建异常。

## 发布与破坏性变更
- **[b10875](https://github.com/ggml-org/llama.cpp/releases/tag/b10875)** — 正式弃用 `--mmap`/`--mlock`/`--direct-io`（[#28334](https://github.com/ggml-org/llama.cpp/pull/28334)）。用户必须迁移至 `--load-mode`。已合并。
- **[b10867](https://github.com/ggml-org/llama.cpp/releases/tag/b10867)** — 在 iGPU 上默认禁用延迟张量加载（[#28326](https://github.com/ggml-org/llama.cpp/pull/28326)）。修复了先前在 [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) 中指出的 iGPU 回退（qwen4exp 在 AMD iGPU / Vulkan 上 pp512 减半）。
- **[b10865](https://github.com/ggml-org/llama.cpp/releases/tag/b10865)** — 回滚 HIP `prop.integrated` 恢复（[#28604](https://github.com/ggml-org/llama.cpp/pull/28604)）。
- **[b10874](https://github.com/ggml-org/llama.cpp/releases/tag/b10874)** — Granite 3 MoE 参数数量修复（[#28632](https://github.com/ggml-org/llama.cpp/pull/28632)）；后续 [#28643](https://github.com/ggml-org/llama.cpp/pull/28643) 将该修复扩展到整个 Granite 系列。
- **[b10872](https://github.com/ggml-org/llama.cpp/releases/tag/b10872)** — Jinja：`null in <map>` 现在返回 `false` 而非报错（[#28620](https://github.com/ggml-org/llama.cpp/pull/28620)）。影响将可选值默认为 `none` 的模板。
- **[b10873](https://github.com/ggml-org/llama.cpp/releases/tag/b10873)** — mtmd：将视频 ID 传递到位图（[#28601](https://github.com/ggml-org/llama.cpp/pull/28601)）。

## 新模型与硬件支持
- **GLM-5.3-Flash MTP** 推测解码支持进行中（[#27917](https://github.com/ggml-org/llama.cpp/pull/27917)），相关讨论 [#27922](https://github.com/ggml-org/llama.cpp/issues/27922)（15 👍）。
- **HRM-Text / DFM Mimir 1B**（`HrmTextForCausalLM`）转换与推理 — 开放 PR [#27625](https://github.com/ggml-org/llama.cpp/pull/27625)。
- **Blackwell 上 NVFP4 W4A8 强制路径**，适用于 NVFP4_W4A16 层（[#24364](https://github.com/ggml-org/llama.cpp/pull/24364)）。
- **IQ 类型对 MoE 的处理** 已合入 [b10868](https://github.com/ggml-org/llama.cpp/releases/tag/b10868) / [#28476](https://github.com/ggml-org/llama.cpp/pull/28476)。
- **量化正确性**：gguf-py 修复宽张量 Q8_0/TQ1_0/TQ2_0 的符号位丢失问题（NumPy ≥2 临时消除的回归） — [#28523](https://github.com/ggml-org/llama.cpp/pull/28523)。
- **CPU 后端**：RISC-V Q4_0 8×8 gemv/gemm（针对 `vlenb=16`）（[#28642](https://github.com/ggml-org/llama.cpp/pull/28642)）；s390x Q1_0 矢量 intrinsics（[#28606](https://github.com/ggml-org/llama.cpp/pull/28606)）；ARM Q1_0 4×4/4×8 NEON repack（[#23492](https://github.com/ggml-org/llama.cpp/pull/23492)）；Apple Metal — FA 中宽 query tile（[#28439](https://github.com/ggml-org/llama.cpp/pull/28439)）。
- **OpenVINO**：NPU 上的无缓存编码器模型、GPU MoE 专家融合 + 分组 8-bit 重量化、权重溢出 — [#28638](https://github.com/ggml-org/llama.cpp/pull/28638)。
- **Intel Mac 上的 Metal 多 GPU**（eGPU + dGPU）需求 — [#28565](https://github.com/ggml-org/llama.cpp/issues/28565)。
- **XDNA 后端** 需求仍开放 — [#21725](https://github.com/ggml-org/llama.cpp/issues/21725)（32 👍）。
- **RDMA over RPC 后端** 仍开放 — [#9493](https://github.com/ggml-org/llama.cpp/issues/9493)。

## 性能与优化
- **Vulkan / AMD RDNA4**：专用 iq4_xs mat-vec 着色器 → **+6–17% token 生成速度**（[b10871](https://github.com/ggml-org/llama.cpp/releases/tag/b10871) / [#28426](https://github.com/ggml-org/llama.cpp/pull/28426)）。
- **Vulkan / AMD RDNA3 与 RDNA4**：int8 coopmat1 矩阵乘（[#27952](https://github.com/ggml-org/llama.cpp/pull/27952)），据称可改善 Strix Halo 的 prompt 处理。
- **Vulkan / Intel coopmat1**：f16 B-type 矩阵乘流水线 + warp-tile 调优（[b10870](https://github.com/ggml-org/llama.cpp/releases/tag/b10870) / [#27471](https://github.com/ggml-org/llama.cpp/pull/27471)）。
- **Vulkan / Strix Halo**：批处理推理的 mat-vec 行调优（[#27909](https://github.com/ggml-org/llama.cpp/pull/27909)）。
- **CUDA RDNA3 / MoE MMQ N-tile 尺寸调整**（[#28552](https://github.com/ggml-org/llama.cpp/pull/28552)）— 路由专家 tile 选择的改进。
- **CUDA Flash Attention 构建控制**：`GGML_FA_ALL_QUANTS` → `GGML_FA_QUANTS` 以缩减编译矩阵（[#28079](https://github.com/ggml-org/llama.cpp/pull/28079)）。
- **Metal FA**：query tile 从 8 行扩展到 16 行（针对 `ne01 ≥ 64`）；在 M5 上 32 行时 **+6.8%**（[#28439](https://github.com/ggml-org/llama.cpp/pull/28439)）。
- **Metal 融合重写**：单一来源 `ggml_metal_fuse` 表 + `gated_delta_net` 缓存融合（[#28164](https://github.com/ggml-org/llama.cpp/pull/28164)）。
- **CPU VNNI 平铺 mul_mat（k-quants）**：据称带来 **3–7× CPU mul_mat 加速**（[#27851](https://github.com/ggml-org/llama.cpp/pull/27851)）。
- **s390x Q1_0 intrinsics**：**+139.53% PP，+131.59% TG**（[#28606](https://github.com/ggml-org/llama.cpp/pull/28606)）。
- **OpenVINO 有状态解码 + GPU MoE**：改进的 KV-cache 处理（滑动窗口、每层 head）、压缩专家融合（[#28638](https://github.com/ggml-org/llama.cpp/pull/28638)）。
- **测试初始化成本**：数据初始化线程数现在随元素数量伸缩（[#28325](https://github.com/ggml-org/llama.cpp/pull/28325)）。

## 稳定性与回归
按影响可能性排序：

1. **[#27330](https://github.com/ggml-org/llama.cpp/issues/27330) — 开放，严重** — CUDA graphs 在 **RTX 5090 Laptop (sm_120)** 上挂起 GPU 通道，触发 RC watchdog + Xid 8；`GGML_CUDA_DISABLE_GRAPHS=1` 是完整的临时绕过方案。
2. **[#27910](https://github.com/ggml-org/llama.cpp/issues/27910) — 开放** — 在 Linux 下运行 Qwen3.8-27B Q6_K 时，**RTX 5090** 出现显示黑屏 + NVIDIA GSP / 全芯片重置（通过 Codex/DeepSeek Harness 可复现）。
3. **[#18363](https://github.com/ggml-org/llama.cpp/issues/18363) — 已关闭** — 计算能力 120（sm_120）的 CUDA mmq 构建已修复，代码已合入。
4. **[#26845](https://github.com/ggml-org/llama.cpp/issues/26845) — 已关闭** — 在 Intel Arc Pro B60、KAT-Coder-V2.5 上，**SYCL** 在第二条 prompt 时输出乱码。
5. **[#28211](https://github.com/ggml-org/llama.cpp/issues/28211) — 开放，正确性问题** — **gfx1151 / Strix Halo APU** 上的 HIP/ROCm 在 prompt 长度 > `n_ubatch` 时产生 **错误的 logits**（非崩溃）。
6. **[#26425](https://github.com/ggml-org/llama.cpp/issues/26425) — 开放** — MTP 保留了请求间状态，导致 **输出非确定性以及模型退化**（Qwen3.6-35B-A3B-MTP）。
7. **[#27296](https://github.com/ggml-org/llama.cpp/issues/27296) — 开放** — MTP 破坏长/短推理一致性。
8. **[#23268](https://github.com/ggml-org/llama.cpp/issues/23268) — 已关闭** — Vulkan 上的推测解码出现间歇性超时（AMD 395，Qwen3.6-35B-A3B-UD-Q8_K_XL）。
9. **[#28581](https://github.com/ggml-org/llama.cpp/issues/28581) — 开放** — **IQ3_S** 在 RTX 5060 Ti 16GB（Blackwell）上输出乱码。
10. **[#26285](https://github.com/ggml-org/llama.cpp/issues/26285) — 已关闭** — 由于共享内存阈值，MMQ 在 **RTX 3090** 上被错误地禁用；prefill 回退到慢速路径。
11. **[#28522](https://github.com/ggml-org/llama.cpp/issues/28522) — 已关闭** — 在约 48 个可选参数的 Qwen 模型上，并行 `tool_calls` 出现乱序或挂起。
12. **[#28580](https://github.com/ggml-org/llama.cpp/issues/28580) — 已关闭** — 服务器 `input_video` 缓存污染：因视频位图缺少 sha256 id（而图像有），帧在不同请求间被复用。影响所有提供 OpenAI 兼容视频 prompt 的 agent 服务。
13. **[#28160](https://github.com/ggml-org/llama.cpp/issues/28160) — 已关闭** — Vulkan（AMD iGPU）在默认 `--lazy-mode auto` 下出现 pp512 回退；已通过 [b10867](https://github.com/ggml-org/llama.cpp/releases/tag/b10867) 缓解。
14. **[#28635](https://github.com/ggml-org/llama.cpp/issues/28635) — 开放** — Adreno 830 Vulkan：`vkCreateComputePipelines VK_ERROR_UNKNOWN`（针对 `mul_mat_vec_q4_k`），根源是 shaderc/NDK 产生非确定性的 SPIR-V。
15. **[#28234](https://github.com/ggml-org/llama.cpp/issues/28234) — 开放** — Termux 上 Vulkan 着色器优化器失败。
16. **[#27849](https://github.com/ggml-org/llama.cpp/issues/27849) — 已关闭** — Vulkan 在 prompt 读取时崩溃（Intel Meteor Lake iGPU）。
17. **[#27835](https://github.com/ggml-org/llama.cpp/issues/27835) — 开放** — `llama-server` 在并发 CUDA 连接下崩溃（RTX PRO 6000 Blackwell）。
18. **[#27953](https://github.com/ggml-org/llama.cpp/issues/27953) — 开放** — 在混合 GPU 配置（≥3 GPU）下，Qwen Next Flash Attention 过度分配 compute buffer。
19. **[#28640](https://github.com/ggml-org/llama.cpp/pull/28640) — 已合并** — 修复 SM70（V100 Volta）FA 在非标准 head dim（例如 Mistral-4）下的崩溃。

## 对应用开发者的意义
- **迁移事项**：检查你的启动脚本和工具封装中是否使用了 `--mm

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-09

## 1. 今日要点

过去 24 小时的主题是 **AMD/Vulkan 路径上的硬件回归** 以及（推测）为近期发布做准备的 **MLX runner 稳定化**。在 AMD Radeon iGPU（780M、9060 XT）以及 Vulkan 大模型（66 GB）命令提交上，已更新或新建多个已确认的回归问题；同时维护者已落地 MLX prefix-cache 重新预填充开销（17–27 秒）以及 Windows 上 MLX compile-cache 日志刷屏的修复。在新硬件启用方面，面向 Linux 下 Arc 独显的 Intel Level Zero 优化（PR [#18333](https://github.com/ollama/ollama/pull/18333)）以及统一的 GGUF 元数据缓存（PR [#17858](https://github.com/ollama/ollama/pull/17858)）均取得推进。

## 2. 发布与破坏性变更

过去 24 小时无新发布。多个已合并但被关闭的 PR（#18329、#18328、#18309、#18332、#18330、#18179）已被合入其他在飞分支而非独立发布——不暗示任何公开版本号变更。

## 3. 新模型与硬件支持

- **Linux 下通过 Vulkan + Level Zero 支持 Intel Arc 独显**（[PR #18333](https://github.com/ollama/ollama/pull/18333)）——非侵入式的优化层，使用 `libze.so.1` / `libze_intel_gpu.so.1` 在 Vulkan 路径上检测 Intel Arc B70 32 GB 及类似型号。值得在基于 Intel GPU 的 Ollama 部署中持续关注。
- **模型签名计划**（[PR #11573](https://github.com/ollama/ollama/pull/11573)）仍在推进中，子 PR [#11526](https://github.com/ollama/ollama/pull/11526) 已合并用于签名原语；模型加载前的完整性校验正在分阶段落地。
- **云端模型目录请求**（[Issue #17100](https://github.com/ollama/ollama/issues/17100)）——社区请求在 Ollama Cloud 上架 Ornith、Longcat 2.0、Mimo v2.5/pro、Olmo 3.1、Laguna xs 2.1、Hunyuan Hy3、Jamba、Step 3.7。
- **`Qwen3.8-27B-GSQ-RCO-GGUF` 的 IQ3_S**（[Issue #18297](https://github.com/ollama/ollama/issues/18297)）——用户反馈出现 `done_reason: stop` 但 **`content` 为空**；在此量化下基本不可用。

## 4. 性能与优化

- **GGUF 元数据提取与能力统一**（[PR #17858](https://github.com/ollama/ollama/pull/17858)）——元数据现在每个 blob 仅提取一次，并缓存至 `<OLLAMA_MODELS>/metadata/sha256-<hex>.json`，取代此前两份相互背离、且在不同模型间产生不一致能力结果的缓存。对启动、`ollama show`、API 握手有实质性提升；能力去重也修正了部分模型的正确性问题。
- **MLX prefix-cache 恢复，已修复**（[Issue #18267](https://github.com/ollama/ollama/issues/18267)，已关闭）——此前恢复总是落在匹配前缀下方 8192 token 的整数倍处，导致每次智能体工作负载（Claude Code 对接本地模型）的冷启动回合都会固定产生 17–27 秒的重新预填充。修复已合入。
- **MLX 数组生命周期作用域化**（[PR #18327](https://github.com/ollama/ollama/pull/18327)）——以作用域化的生命周期取代全局“pin + sweep”；消除了 prefix-cache 淘汰时所撞上的长期内存累积路径。对长时间运行的 MLX serve 会话尤为重要。
- **非 MLX 的 Windows 上 MLX compile-cache 日志刷屏**（[PR #18335](https://github.com/ollama/ollama/pull/18335)，关闭 [#18283](https://github.com/ollama/ollama/issues/18283)）——改为惰性符号解析，避免每次调用 `ollama` 时向 stderr 打印 `CHECK failed: mlx_compile_cache_new_`。
- **macOS 应用生命周期**（[PR #17558](https://github.com/ollama/ollama/pull/17558)）——关闭窗口现在改为隐藏应用，而不是让它继续停留在 Dock 中。这是 UX 而非性能层面的改动，但对无头环境（菜单栏图标一直残留的场景）值得留意。

## 5. 稳定性与回归

大致按影响范围排序：

- **🔴 AMD iGPU 上的 Vulkan 回归——"Not enough memory for command submission"**（[Issue #18272](https://github.com/ollama/ollama/issues/18272)）。**v0.32.9** 上可用，**v0.32.12+** 上加载 66 GB 模型即失败。**尚无修复 PR。** 若你将环境锁定在 Linux/Win11 的 AMD iGPU，请保持在 v0.32.9，直至该问题解决。
- **🔴 AMD Radeon 780M Vulkan 回归 ≥ v0.32.10**（[Issue #17748](https://github.com/ollama/ollama/issues/17748)，👍 3）。同样的 `radv/amdgpu: Not enough memory for command submission` / `vk::Queue::submit: ErrorDeviceLost` 失败模式。尚无修复 PR。
- **🔴 ROCm `TensileLibrary_lazy_gfx1200.dat` 在 rx 9060 XT 16 GB 上加载失败**（[Issue #17782](https://github.com/ollama/ollama/issues/17782)）。运行 `qwen3.8:27b` 一段时间后出现；看起来更像是会话中段的 ROCm/库卸载问题，而非启动失败。尚无修复 PR。
- ** `qwen2.5-coder:3b-instruct` 低比特量化损坏**（[Issue #18252](https://github.com/ollama/ollama/issues/18252)）。`q2_K`、`q3_K_S`、`q3_K_M`、`q3_K_L` 均返回流畅但功能上无用的输出（在 HumanEval+ 冒烟测试集上 0/15）；同系列更高比特量化不受影响。疑似模型端或注册表制品问题；在 CI 中推荐这些 tag 之前请持续跟踪。
- ** `gemma3:12b` 结构化输出在含双引号输入时被截断**（[Issue #18094](https://github.com/ollama/ollama/issues/18094)）。当 JSON schema 的 `format` 在源文本中遇到 `"` 时，会过早产生 `done_reason: stop` 且 `eval_count` 偏低。影响该模型上的所有抽取型 agent。
- ** `glm-5.3:cloud` 进入无限推理并中止**（[Issue #18193](https://github.com/ollama/ollama/issues/18193)）。通过 OpenCode 与 ZCode 接入 Ollama Cloud 端点可复现；Z.AI 官方 API 未受影响。尚无修复 PR。
- ** Codex/Claude Desktop 集成回归**——[#16177](https://github.com/ollama/ollama/issues/16177)（`ollama launch codex-app` 破坏了 Codex 原生命名管道的可信状态）、[#18188](https://github.com/ollama/ollama/issues/18188)（"Restart Claude Desktop" 开关静默回滚，未写入网关配置）。多个相关 proxy PR（[#18331](https://github.com/ollama/ollama/pull/18331)、[#18332](https://github.com/ollama/ollama/pull/18332)）在一天内被反复迭代并关闭，提示这些修复已被合入更大分支。
- ** `Qwen3.8-27B-GSQ-RCO-GGUF` 的 `IQ3_S` 返回空内容**（[Issue #18297](https://github.com/ollama/ollama/issues/18297)）。看起来像是量化加载路径上的回归；在确认前请将本 tag 视为不可用。
- ** 已关闭但仍需关注**：[#1599](https://github.com/ollama/ollama/issues/1599)（部分下载模型清理）、[#16821](https://github.com/ollama/ollama/issues/16821)（OpenWebUI 下 Gemma/Qwen 原生函数调用）、[#16773](https://github.com/ollama/ollama/issues/16773)（cloud 403 透出）、[#18267](https://github.com/ollama/ollama/issues/18267)（MLX prefill）、[#18283](https://github.com/ollama/ollama/issues/18283)（MLX 日志刷屏）——均已关闭且修复已落地。

## 6. 对应用开发者的意义

- **AMD iGPU / Vulkan 用户：在 [#18272](https://github.com/ollama/ollama/issues/18272) 与 [#17748](https://github.com/ollama/ollama/issues/17748) 解决之前，不要升级到 v0.32.9 以上。** 在拉取下一个 minor 版本前，在你的部署流水线中加入回归检查。
- **在 MLX（Apple Silicon）runner 上，下一版本预计会有显著的冷启动回合加速**：智能体工作负载上将消除 17–27 秒的重新预填充（[#18267](https://github.com/ollama/ollama/issues/18267)），长时间会话的内存累积问题也将被修复（[#18327](https://github.com/ollama/ollama/pull/18327)）。升级后值得重新评估你的 agent 延迟预算。
- **`gemma3:12b` + `format`（结构化输出）对可能遇到 `"` 的抽取任务是不安全的**（[#18094](https://github.com/ollama/ollama/issues/18094)）。要么对输入进行预先清洗，要么切换到 `llama3.x`，要么在截断问题修复前固定使用非 format 的生成模式。
- **避免使用 `qwen2.5-coder:3b-instruct` 的低比特量化**（`q2_K`、`q3_K_S/K_M/K_L`）——在标准 HumanEval+ 子集上当前功能正确率为 0%（[#18252](https://github.com/ollama/ollama/issues/18252)）。请固定使用 `q4_K_M` 及以上。
- **Codex/Claude Desktop 启动器尚不稳定**：[#18188](https://github.com/ollama/ollama/issues/18188) 与 [#16177](https://github.com/ollama/ollama/issues/16177) 展示了两种不同的损坏模式（网关配置未写入；原生命名管道可信状态丢失）。多个 proxy PR 在同一天被反复迭代——预计很快会有合并修复，但请今天就在你的 CI 中验证启动器。
- **Cloud 端点与厂商 API 并非 1:1 对等**：`glm-5.3:cloud` 与 Z.AI 的行为存在差异（[#18193](https://github.com/ollama/ollama/issues/18193)）。若你是集成方，请将 cloud tag 视为一个独立的推理目标，配套独立的回归测试套件，而不是上游提供方的即插即用替代品。
- **OpenAI 兼容的工具 schema 现在接受嵌套的 `required: object|null`**（[PR #18140](https://github.com/ollama/ollama/pull/18140)）——应可减少经由 Ollama `/v1` 入口的合法第三方工具 schema 被拒绝的情况。
- **硬件路线图信号**：Linux 上的 Intel Arc 独显正通过 Level Zero + Vulkan 成为一等目标（[#18333](https://github.com/ollama/ollama/pull/18333)）；模型签名（[#11573](https://github.com/ollama/ollama/pull/11573)）也在切实走向落地，若你的威胁模型涵盖模型供应链完整性，这将很有意义。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-09

## 今日要闻
`v1.102.0-dev.1` 开发版本附带 cosign 签名的 Docker 镜像，建立了运维可在准入时强制执行的固定密钥溯源链。安全与身份验证卫生是今日主线：未脱敏的 `print_verbose` stdout 泄露（[#34705](https://github.com/BerriAI/litellm/issues/34705)），一套协调的身份验证加固方案（泄露密码检测 [#39321](https://github.com/BerriAI/litellm/pull/39321)、强制重置 [#40107](https://github.com/BerriAI/litellm/pull/40107)、自助密码修改 [#39562](https://github.com/BerriAI/litellm/pull/39562)），以及面向内部用户预算强制执行的 Webhook 告警（[#40396](https://github.com/BerriAI/litellm/pull/40396)）。在协议层面，`/v1/messages` → Responses API 网桥的加密推理亲和性正在进行端到端修复（[#39339](https://github.com/BerriAI/litellm/issues/39339) / [#40237](https://github.com/BerriAI/litellm/issues/40237) / [#40377](https://github.com/BerriAI/litellm/pull/40377)）。

## 发布与破坏性变更
- **[`v1.102.0-dev.1`](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.1)** — 无记录的破坏性变更。所有 Docker 镜像均使用固定到提交 `0112e53` 的密钥进行 cosign 签名；可通过 `cosign verify` 针对已发布标签进行验证。
- **`stable/1.87.x` 回移植包** — [PR #31177](https://github.com/BerriAI/litellm/pull/31177) 交付五项已合并的修复，聚焦于 Anthropic 流式成本回收（中断流和智能体流此前被丢弃或低估）。无版本号变更。

## 新模型与硬件支持
- **面向 OAuth/代理部署的 ChatGPT Codex** — 图像编辑、结构化审查（严格 JSON schema）、实时语音信令，以及 ChatGPT 图像适配器（含 JSON 参考图）。[PR #40366](https://github.com/BerriAI/litellm/pull/40366)。
- **Vertex AI 版本化 Claude ID** — [PR #40376](https://github.com/BerriAI/litellm/pull/40376) 修正了类似 `claude-haiku-4-5@20251001` 这类 ID 的默认 `max_tokens` 解析器；姊妹 [PR #40374](https://github.com/BerriAI/litellm/pull/40374) 将成本映射填充更新为 64000。未显式指定 `max_tokens` 的请求不再限制为 4096。
- **Azure GPT-5.6 Luna** 定价修正（输入/输出/缓存），并附带回归覆盖。[PR #36279](https://github.com/BerriAI/litellm/pull/36279)。
- **Azure AI DeepSeek v4 Flash / Pro** 的定价条目在 `model_prices_and_context_window.json`（及备份）中待添加。[Issue #30129](https://github.com/BerriAI/litellm/issues/30129)。
- **火山方舟 `doubao-embedding-vision-251215`** 集成已关闭。[Issue #29570](https://github.com/BerriAI/litellm/issues/29570)。

## 性能与优化
- **速率限制强制执行精度** — [PR #37789](https://github.com/BerriAI/litellm/pull/37789) 修复了 v3 速率限制器对相同 `(key, value)` 描述符重复扣减的问题，导致团队每模型有效 RPM/TPM 减半（[issue #34140](https://github.com/BerriAI/litellm/issues/34140)）。去重操作在描述符组装时一次性完成，所有计数器消费者均透明受益。
- **代理预算隔离** — [PR #40037](https://github.com/BerriAI/litellm/pull/40037)（修复 [#40020](https://github.com/BerriAI/litellm/issues/40020)）将 `config.yaml` 中的 `litellm_settings.max_budget` 与进程级 SDK `_current_cost` 跟踪器解耦，恢复通过 `_global_proxy_budget_check` 强制执行的预期全局支出限额语义。
- **Anthropic 流式成本回收** — [PR #31177](https://github.com/BerriAI/litellm/pull/31177) 将中断流和智能体流的计费重新引入 `stable/1.87.x` 分支。
- **加密推理亲和性** — [PR #40377](https://github.com/BerriAI/litellm/pull/40377) 在聊天元数据中保留编码标志，使首轮请求在桥接的聊天路径下正确启用响应标记编码。
- **Terraform 提供商元数据漂移** — [PR #40395](https://github.com/BerriAI/litellm/pull/40395) 剥离代理

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-09

## 今日要点

v0.1.807-beta 版本带来了可观的性能与稳定性提升：AMD Vulkan 已成为默认后端（相较 ROCM 预填充/解码速度提升约 20%），Windows 下的 `llama-server.exe` 已进行代码签名（可缓解杀毒软件误报问题），AMD Strix/iGPU 输出乱码的问题也已在上游解决。与此同时，团队正在落地多项重要架构改造——一处安全关键补丁可阻断 Studio 中无标记的 tool-call 远程代码执行（RCE）；KV 抢占机制让并行对话可共享同一份缓存而不再相互驱逐；以及面向 DGX 集群的双 Spark 服务编排器。

## 版本发布与破坏性变更

- **[v0.1.807-beta](https://github.com/unslothai/unsloth/releases)** —— "性能大幅提升与问题修复"。AMD Vulkan 成为默认；Windows 二进制已签名；修复 AMD Strix/iGPU 正确性问题。兼容现有 Studio/Desktop 安装，但 AMD 用户将看到后端切换。
- **[PR #10604](https://github.com/unslothai/unsloth/pull/10604)** —— 移除 805 中引入的分阶段后台桌面更新，恢复经典的 `studio update` 原地升级流程。来自 #9890 的四项 Windows 侧修复予以保留。
- **[PR #10587（已关闭）](https://github.com/unslothai/unsloth/pull/10587)** —— 将 NPP 运行时依赖由 `nvidia-npp-cu13`（已弃用的占位包）切换为普通 `nvidia-npp`，适用于 CUDA 13 安装。

## 新增模型与硬件支持

- **[Issue #10562（已关闭）](https://github.com/unslothai/unsloth/issues/10562)** —— IFM K2 模型支持请求已解决。
- **[PR #10282](https://github.com/unslothai/unsloth/pull/10282)** —— 为 Windows-on-ARM NVIDIA 主机（GB10 / N1X、RTX Spark 部件）提供原生 ARM64 CUDA 栈安装。当前的 `install.ps1` 将 ARM64 Windows 视为"无 GPU"，该 PR 修复了此问题，且不影响其他主机的行为。
- **[Issue #9932](https://github.com/unslothai/unsloth/issues/9932)** —— 关于 ROCm 10 支持及多版本选择器（ROCm 7.14 等）的开放功能请求。AMD 已发布 ROCm 10 / TheRock-10.0；目前尚无对应 PR。
- **[PR #10323](https://github.com/unslothai/unsloth/pull/10323)** —— 双 Spark 服务编排器，带异步副本路由器，用于配对 DGX Spark 主机；通过 `spark_cluster.recommend_topology` 选择拓扑，在负载允许时保持两个节点均处于繁忙状态。

## 性能与优化

- **AMD Vulkan 成为默认**（[v0.1.807-beta](https://github.com/unslothai/unsloth/releases)）—— 吞吐量相较 ROCm 路径提升约 20%。
- **[PR #10301](https://github.com/unslothai/unsloth/pull/10301) + [#10358](https://github.com/unslothai/unsloth/pull/10358)** —— KV 抢占机制重构：启动一个 `llama-server`，使用 `--parallel N --kv-unified -c N`，使 N 个槽位共享 N 个 cell，而非每个对话独占上下文。与 llama.cpp 的 `--preempt-ram` 配合使用，可让服务器将槽位停放至宿主机内存。最终效果：并行对话不再互相挤掉对方的缓存。
- **[PR #9872](https://github.com/unslothai/unsloth/pull/9872)** —— 卸载规划器现在会在 spill 与 llama.cpp 自带的 fitter 之间权衡。加入了成本闸门、子 FFN spill 阶梯、上下文感知的设备保留额度以及加载顺序。所有行为由 `UNSLOTH_SMART_OFFLOAD` 控制开关。
- **[PR #8323](https://github.com/unslothai/unsloth/pull/8323)** —— 启动时启用 PyTorch 的 AOTriton ROCm 快速注意力内核。在部分 AMD 显卡上，慢速回退路径的 O(n²) 内存占用曾导致一个 3.4k token 的请求申请 66 GiB 内存；翻转该环境变量即可修复。修复了 [#8225](https://github.com/unslothai/unsloth/issues/8225)。

## 稳定性与回归

**安全（高危）**
- **[PR #10507](https://github.com/unslothai/unsloth/pull/10507)** —— Studio 中发现两处 prompt-injection-to-RCE 问题。无标记的 tool-call 解析器会将助手文本中任意位置的裸 `call:NAME{...}`、`NAME[ARGS]{json}` 或 `{"name":...}` 提升为真实的 tool call，而唯一的判断条件只是 `NAME` 是否启用。该 PR 阻断了该提升路径。强烈建议立即锁定版本。

**崩溃 / 正确性**
- **[Issue #10559](https://github.com/unslothai/unsloth/issues/10559)** —— Gemma 4 处理图像输入时，`llama-server` 因 `GGML_ASSERT` 崩溃，原因为默认 `ubatch` 过小。未关闭。
- **[Issue #10549](https://github.com/unslothai/unsloth/issues/10549)** —— Unsloth 的 layer/tensor 模式表现完全一致；"fake BF16 mode" 报告为已启用，但实际并未改变张量存储。未关闭。
- **[PR #10526](https://github.com/unslothai/unsloth/pull/10526)** —— 为 Studio 的 Python 与 Terminal 工具提供最小化操作系统沙箱（Linux 端使用 bubblewrap，macOS 端使用 Seatbelt），替代纯软件层面的安全防护。尚未合入。
- **[PR #10540](https://github.com/unslothai/unsloth/pull/10540)** —— Windows 安装器将原生路径辅助工具生成为预编译文本文件，而非在安装阶段调用 `csc.exe`——后者曾被 Bitdefender 标记为 `Gen:Variant.MSILHeracles`。
- **[Issue #10579](https://github.com/unslothai/unsloth/issues/10579)** —— 桌面端每次更新都会从头重新安装全部依赖；用户反馈更新耗时数小时，有时还会失败。PR #10604 部分缓解了该问题。
- **[Issue #10598](https://github.com/unslothai/unsloth/issues/10598)** —— `install.sh` 将 torch 下限定为 2.4，而 torchcodec 表将下限定为 2.5；由于未记录该差异，torch 2.4 安装时会静默跳过 torchcodec。
- **[Issue #10563](https://github.com/unslothai/unsloth/issues/10563)** —— `fast_dequantize` 缓存的是导入时刻的流，而非使用实时 PyTorch 流；当当前 GPU 流发生变化时存在风险（表现为 QLoRA 期间 RX 7900 XTX / gfx1100 上反复出现 GPU 重置）。
- **[Issue #10599](https://github.com/unslothai/unsloth/issues/10599)** —— 在新版 mmproj 或 MTP head 发布前下载的模型永远无法获取到这些新组件；必须完整删除后重新下载。
- **[Issue #10428](https://github.com/unslothai/unsloth/issues/10428)** —— 每次停止或重新加载模型时，提示词队列都会被清空。
- **[Issue #10516](https://github.com/unslothai/unsloth/issues/10516)** —— 八处 `_PYTORCH_WHL_BASE` URL 站点将加速器分支名错误地拼接到 `UNSLOTH_PYTORCH_MIRROR` 查询参数中，而非追加到路径。
- **[Issue #9337（已关闭）](https://github.com/unslothai/unsloth/issues/9337)**、**[#9218（已关闭）](https://github.com/unslothai/unsloth/issues/9218)**、**[#6528（已关闭）](https://github.com/unslothai/unsloth/issues/6528)** —— 已解决：统计信息刷新、自签名证书信任、diffusiongemma 生成错误。

## 对应用开发者的意义

- **AMD 用户应立即升级到 807-beta**——Vulkan 默认带来约 20% 的吞吐量提升，且 Strix/iGPU 乱码修复关乎正确性。日志中将出现后端切换记录。
- **尽快为 Studio 安装打上 tool-call RCE 补丁**——PR #10507 阻断了一条路径，使不受信任的助手输出可在缺少正确标记的情况下调用已启用工具。如果你将 Studio 暴露给不受信任的提示词（Web UI、多租户场景），则必须合并该修复。
- **规划好 KV 抢占机制的变更**——一旦 #10301/#10358 落地，单实例 `llama-server` 的并行对话吞吐将提升，但槽位会计与每请求的 `n_ctx` 语义会发生变化。任何依赖 `llama-server` 响应推断 KV 压力的逻辑都需要重新测试。
- **Spark 运维者**：双 Spark 编排器（#10323）以及与 llama.cpp 的 `--preempt-ram` 配对，意味着你可以在配对 DGX Spark 上服务更大模型而无需手动编排——但前提是你必须将 `unsloth` 与捆绑的 `llama.cpp` 同时升级到匹配版本。
- **Windows-on-ARM NVIDIA 用户**（RTX Spark、GB10 笔记本）：#10282 解锁了一级安装支持；预期 `install.ps1` 行为将与 x64 不同。
- **Studio CLI 注意事项**（[Issue #10595](https://github.com/unslothai/unsloth/issues/10595)，由 [PR #10608](https://github.com/unslothai/unsloth/pull/10608) 修复）——每次执行 `unsloth studio run` 都会在 Settings 中生成一个新的 `cli` API key。10608 落地后将复用已有 key；清理前 Settings 中会多出一条残留的 `cli` 条目。
- **Open WebUI 互操作尚在变动中**（[Issue #10610](https://github.com/unslothai/unsloth/issues/10610)）——模型驻留展示以及显式的 load/unload 端点在 `llama.cpp` provider 和 Unsloth 实际服务之间存在差异。若你在 Studio 前面接了 Open WebUI，预期在问题协调解决前会出现一些毛刺。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router Digest — 2026-09-09

## 今日要点

过去 24 小时的窗口由网关中的**性能集群**主导：三个相关 issue（#1775、#1776、#1777）报告称，每个请求的开销随配置的 provider 数量呈线性增长 —— 一个未缓存的元数据查找在每次请求时都会重新计算，`findProvider()` 在 46 个 provider 的情况下每次请求会重建 80 万+ 次 identity Set，而 `getAppInfo` RPC 稳定耗时约 7.2 秒。兼容性方面出现了三个上游特有的失败（#1780 opencode-go 的 `x-opencode-session` 请求头、#1781 带 `call_id`/`max_tokens` 的 Meta Responses 格式、#1779 OIDC 联合认证未激活），以及两个未合并的 PR（#1773、#1774）分别针对聚合错误展示和按模型的使用归因。

## 发布与破坏性变更

过去 24 小时内没有新发布。用户报告中引用的最新已发布版本是 **CCR v3.0.22**（参见 [#1779](https://github.com/musistudio/claude-code-router/issues/1779)）。

## 新模型与硬件支持

本窗口内未公布新的模型、后端或量化支持。

## 性能与优化

由 `Osamious` 提交的三个相关 issue 描述了网关热路径中未缓存的每请求开销：

- **#1775** — 由于每次请求都重新计算未缓存的 provider 显示元数据查找，每个请求的延迟随配置的 provider 数量呈**线性**增长。（[链接](https://github.com/musistudio/claude-code-router/issues/1775)）
- **#1777** — `Cy.prototype.findProvider(t)` 线性扫描 `Providers`，并在每次调用时为每个 provider 重新推导一个 identity `Set`，在 46 个 provider 的情况下观察到每次请求约 **80 万+ 次** Set 构造。（[链接](https://github.com/musistudio/claude-code-router/issues/1777)）
- **#1776** — `getAppInfo` RPC 反复测量稳定在 **~7.2 秒**，而同一网关下 `getConfig` 响应仅需约 6 毫秒 —— 表明存在一条与 provider 数量无关的独立慢路径。（[链接](https://github.com/musistudio/claude-code-router/issues/1776)）

综合来看，这些 issue 表明一组低风险的 memoization 修复（缓存 provider 元数据 + selector 标识映射）就能在高 provider 数量下显著降低延迟。该集群目前尚未有任何 PR 落地。

## 稳定性与回归

大致按用户影响排序：

1. **[#1780](https://github.com/musistudio/claude-code-router/issues/1780)** — **严重 / 影响广泛。** 自 2026-09-05 起，`opencode.ai/zen/go/v1` 强制要求 `x-opencode-session` 请求头；CCR 未发送此请求头，因此每次 POST 都收到 `400 MissingSessionID`。任何 `api_base_url` 指向 opencode-go 端点的 CCR provider 都已完全不可用。*尚无修复 PR。*
2. **[#1781](https://github.com/musistudio/claude-code-router/issues/1781)** — **严重 / 影响范围有限。** `anthropic_messages` → OpenRouter → `meta/muse

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 简报 — 2026-09-09

## 1. 今日要点

CC Switch 仓库本日在提供商/代理底层管道与平台扩展两条线上活动密集：长期在榜的 **CLI 工具支持追踪帖（CLI Tool Support Tracker）**（#1855，200 条评论）持续驱动着路线图，同时两个分量十足的新应用 PR 相继落地 —— **Cursor 支持**（#6124，+4123 行代码）与 **将 DeepSeek Harness (DSH) 提升为一等 AppType**（#7244）。代理方面，团队交付了针对熔断器 HalfOpen 许可泄漏（#7207）、macOS 系统代理刷新（#7030）以及 Windows 上 Codex rollout 同步（#7219）的修复，并新增了自动附加现已强制要求的 `x-opencode-session` 请求头的特性（#7246）。

## 2. 版本发布与破坏性变更

- **过去 24 小时内没有新版本发布。**
- ⚠️ **即将弃用提示（issue #7198）：** Gemini CLI 已正式停止维护；用户请求迁移至 **Antigravity CLI**，以承接入口配置与使用统计。预计未来版本中 `gemini-cli` 提供商的配置键将有所变动。
- **提供商 API 格式变动（issue #6258）：** OpenCode Go 的 Anthropic 兼容端点所要求的认证头格式与 Claude Desktop 的不同。CC Switch 的提供商卡片目前无法选择认证字段，导致出现 `401 Missing API key` 错误。

## 3. 新模型与硬件支持

- **新提供商预设：** Laonong API (`laonongapi`) —— OpenAI 兼容网关，提供 GPT-4o、Claude 3.5 Sonnet、DeepSeek、Gemini。[PR #7245](https://github.com/farion1231/cc-switch/pull/7245)
- **面向 Codex 的 GitHub Copilot 托管账户路由**（Responses + Chat Completions，按 `supported_endpoints` 自动选择认证/档案）。[PR #7157](https://github.com/farion1231/cc-switch/pull/7157)
- **DeepSeek Harness (DSH)** 作为托管应用加入，与 Claude/Codex/Gemini 并列；读取 `~/.dsh/settings.yaml`，支持 `apiKeyEnv` 密钥引用。[PR #7244](https://github.com/farion1231/cc-switch/pull/7244)
- **Cursor（BYOK）** 成为第 9 个托管应用 —— 借助 cloudflared Quick Tunnel 将本地代理以 HTTPS 形式对外暴露，配置位于 `cursor_config.rs`，并附带 v17/v18 数据库迁移。[PR #6124](https://github.com/farion1231/cc-switch/pull/6124)
- **面向 Pi 的 LongCat 推理格式** —— 切换为 Pi 的二进制 thinking 传输格式，并显式设置 `thinking.type` 值。[PR #7201](https://github.com/farion1231/cc-switch/pull/7201)

## 4. 性能与优化

- **熔断器正确性/性能（#7207）：** RAII `HalfOpenPermitGuard` 现在在解除时不再泄漏许可，并消除了会破坏 `max_half_open_requests=1` 限流的“先解构后释放”模式，从而在部分故障下恢复了正确的舱壁隔离行为。
- **火山引擎（Volcengine）用量路由（#7096）：** 将 Agent Plan 与 Coding Plan 的检测逻辑分离，让同时订阅两种套餐的用户能看到各套餐对应的正确配额，而不是一张卡片把两者混在一起显示。
- **Codex rollout 增量同步（#7219）：** 以持久化的**字节游标 + 大小**校验取代仅依赖 mtime 的检测，修复了 Windows 上 rollout 文件在持续写入、体积增长期间 mtime 保持不变的场景。
- **Codex `/images/edits` 代理覆盖（#7177）：** 填补了携带 `referenced_image_paths` 的 `imagegen` 工具调用失败的 P2 缺口；同时处理了流式图像生成的用量计量。

## 5. 稳定性与回归

按预估影响范围排序：

| 严重程度 | Issue | 描述 | 修复 PR |
|----------|-------|-------------|--------|
| **P0** | [#7236](https://github.com/farion1231/cc-switch/issues/7236) | Claude Code 2.1.265 之后，Deepseek 与 ZAI 提供商经 CC Switch 返回错误 | — |
| **P0** | [#6875](https://github.com/farion1231/cc-switch/issues/6875) | 切换/启用 Codex 提供商会**完全覆写** `config.toml` 和 `auth.json`；外部配置与令牌丢失，且没有文件备份 | — |
| **P1** | [#7084](https://github.com/farion1231/cc-switch/issues/7084) | Codex 用量同步：分页的父级 rollout 导致分叉出的子会话被永久打上“父会话尚未到达分叉点”的标签 → GPT-5.6-Sol 用量统计下降 | [#7219](https://github.com/farion1231/cc-switch/pull/7219) 部分修复 |
| **P1** | [#7088](https://github.com/farion1231/cc-switch/issues/7088) | 缺少 `x-opencode-session` 的 OpenCode Go 请求可能自 2026-09-06 起开始报错 | [#7246](https://github.com/farion1231/cc-switch/pull/7246) ✅ |
| **P1** | [#7252](https://github.com/farion1231/cc-switch/issues/7252) | Claude Code 引导消息/令牌提醒经 Chat-Completions 网关路由时导致缓存未命中 | [#7253](https://github.com/farion1231/cc-switch/pull/7253) ✅（opt-in 修复） |
| **P1** | [#4679](https://github.com/farion1231/cc-switch/issues/4679) | CC Switch 3.16.3 缓存系统代理状态；禁用代理后，请求仍尝试经由其发送 → 502 | [#7030](https://github.com/farion1231/cc-switch/pull/7030) ✅（仅 macOS） |
| **P2** | [#7080](https://github.com/farion1231/cc-switch/issues/7080) | 本地环境监控无法检测最新 Codex 版本 → 手动更新被阻断 | — |
| **P2** | [#7211](https://github.com/farion1231/cc-switch/issues/7211) | CC Switch 强制覆写 Codex CLI `config.toml` 的 `requires_openai_auth` 值 | — |
| **P2** | [#6258](https://github.com/farion1231/cc-switch/issues/6258) | Claude Desktop 提供商 UI 缺少认证字段选择器 → Anthropic 兼容上游返回 401 | — |
| **P2** | [#6626](https://github.com/farion1231/cc-switch/issues/6626) | Claude Code 2.1.235 对 DeepSeek 报告的缓存令牌数为零（相关：#3908、#4247） | — |
| **P3** | [#7240](https://github.com/farion1231/cc-switch/pull/7240) | 部分主机上 Windows WebView2 启动时出现空白/白屏 | ✅ 修复见 PR #7240 |
| **P3** | [#7208](https://github.com/farion1231/cc-switch/pull/7208) | Windows Terminal 无视 `defaultProfile` 一律启动 `cmd.exe`（#5322、#2830） | ✅ 修复见 PR #7208 |
| **陈旧** | [#5171](https://github.com/farion1231/cc-switch/issues/5171)、[#5342](https://github.com/farion1231/cc-switch/issues/5342)、[#5197](https://github.com/farion1231/cc-switch/issues/5197)、[#5185](https://github.com/farion1231/cc-switch/issues/5185) | image_gen 工具冲突、Codex+ChatGPT 字段不匹配、`/responses` 转换 400、WebView2 无窗口 | — |

## 6. 对应用开发者意味着什么

- **如果你通过 CC Switch 将 Claude Code 路由到非 Anthropic 的 Chat-Completions 网关：** 请启用新的“会话 system 转换”开关（#7253）。不启用的话，引导消息和 todo/后台提醒将不会从 `system` 降级为 `user`，长程智能体会话的 prompt cache 命中会被彻底破坏。
- **如果你使用 Codex：** 请将 CC Switch 固定在包含 PR #7219 的版本上，否则在 Windows 上当 rollout 正被写入时会出现用量同步缺口。`config.toml`/`auth.json` 覆写风险（#6875）意味着，在修复落地之前，**切换提供商前请务必备份 `~/.codex/`**。
- **如果你运营 OpenCode Go 上游：** 本地代理现在会自动附加 `x-opencode-session`（#7246）—— 客户端无需任何改动，但请核实你自己的网关没有重复附加该请求头。
- **如果你在 macOS 上维护 CI：** 代理刷新修复（#7030）意味着当 SCDynamicStore 变更传播时，reqwest 客户端现在会被重建；切换系统代理工具后不再需要重启。
- **如果你基于 Cursor 开发：** #6124 中的 BYOK 隧道模式（cloudflared Quick Tunnel → localhost 代理 → HTTPS）对于将仅监听本地的代理交付给非回环客户端使用是一个很有用的参考。
- **路线图信号（#1855）：** 将 Cline、Aider、Roo Code、Continue 和 Windsurf 纳入托管应用的请求仍是该追踪帖中参与度最高的事项 —— 预计后续会有更多提供商/CLI 抽象层落地。

---

*来源：[farion1231/cc-switch Issues](https://github.com/farion1231/cc-switch/issues) 与 [Pull Requests](https://github.com/farion1231/cc-switch/pulls)，活动窗口 2026-09-08 → 2026-09-09。*

---

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# API 日报 — 2026-09-09

## 1. 今日要点

v1.0.0-rc.36 版本带来了 **任务插件与市场（Task Plugins & Marketplace）** 大改造（插件图标、元数据、能力标签、可切换币种的定价），同时附带配额/日志改进。今日 issue 与 PR 中的主导主题是**计费正确性**：围绕双重扣费、缓存 token 缺失、以及 Gemini 的 `:countTokens` 端点被错误路由为 `generateContent`（本应免费的计数调用却按生成内容计费）存在多个高严重性 bug。一个值得注意的元模式：今日合并的 PR 中，很大一部分是由 AI 编程代理（Claude Code、Codex CLI）在一个协调的"PR 贡献"活动中产出的。

## 2. 版本发布与破坏性变更

- **[v1.0.0-rc.36 — 任务插件、定价配置与配额](https://github.com/QuantumNous/new-api/releases)**（[仓库中的发布说明](https://github.com/QuantumNous/new-api)）
  - 任务插件与市场：展示插件图标、网站 URL、元数据与能力描述符；新建渠道时现在会自动填充匹配的插件。
  - 模型管理、模型目录、市场展示与定价配置经过重构。
  - API 密钥 / 用户配额 / 用量日志 / 兑换码流程得到改进。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*