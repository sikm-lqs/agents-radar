# AI 基础设施日报 2026-09-07

> 生成时间: 2026-09-07 01:16 UTC | 覆盖项目: 9 个

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

# AI 基础设施跨项目报告 — 2026-09-07

## 1. 生态总览

整个生态正在同步吸收新一代前沿模型（GLM-5.3-Flash、DeepSeek-V4、Qwen3.8-Flash-Next、Kimi K3、MiniMax-M3），覆盖每一层——推理引擎、本地运行时、网关层——混合线性注意力架构（GDN/DeltaNet、DSA/MLA 稀疏索引器）以及投机解码（MTP、EAGLE-3、DFlash）既是主导的赋能目标，也是**静默正确性失败**的主要来源。硬件覆盖面正在快速扩大：Blackwell 边缘型号（SM120/SM121、GB10、DGX Spark）、AMD RDNA3/4 与 MI325X/MI355X，以及 NPU（昇腾 Atlas A5、T-Head PPU）今天都有实质进展。与此同时，网关层（LiteLLM、New API、CC Switch）正向安全、计费精度和跨厂商成本路由方向成熟——计费数学正逐渐成为一类独立的生产风险。值得注意的是，今天没有推理引擎发布，而网关层发布了两版（LiteLLM v1.100.0、New API rc.34），llama.cpp 则发布了九个构建——这种速度差本身就是信号。

## 2. 活动对比

| 项目 | 24h PR（浮出水面） | 24h Issue（浮出水面） | 发布状态 | 高严重度未决项 |
|---|---|---|---|---|
| **vLLM** | ~17 | ~11 | 无；DeepGEMM 内置 pin 已回滚（#53680） | 4（含 2 个静默错误输出 bug） |
| **SGLang** | **292**（上报） | **38**（上报） | 无；CI：1 失败 / 12 抖动 / 953 最近修复 | ~7 个正确性阻塞项（含全零输出 #38143） |
| **llama.cpp** | ~12 | ~9 | **9 个构建**（b10821–b10830） | 5（含 130k ctx 静默瞬时 EOS） |
| **Ollama** | 4 个修复 PR | ~8 | 无 | 3（Vulkan AMD、Blackwell FA 崩溃、云延迟） |
| **LiteLLM** | ~6 | ~12 | **v1.100.0 + v1.101.0-rc.1** | 3（2 个计费、1 个 Bedrock 文件删除） |
| **Unsloth** | ~15 | ~5 开放 / ~14 关闭 | 无 | 3（bs=1 下 96GB OOM、Ollama 集成、Smart App Control） |
| **Claude Code Router** | 1 | 3 | 无 | 1（高负载下网关启动） |
| **CC Switch** | ~12 开放 / 4 合并 | ~10 开放 / 8 关闭 | 无（v3.20.1 分支存在回归） | 5（tool_call_id 重写 #7156 居首） |
| **New API** | ~5（3 合并） | ~8 | **v1.0.0-rc.34** | 1 个关键计费（修复 PR 已就绪） |

*注：仅 SGLang 上报原始计数；其他数字为各摘要中浮出水面的条目，是下限而非总数。*

## 3. 模型支持竞赛

| 模型 | llama.cpp | vLLM | SGLang | 网关（LiteLLM / New API / CC Switch） |
|---|---|---|---|---|
| **GLM-5.3-Flash** | 稀疏 FA 提示（#27970） | ✅ 完整 spec-decode 接线（EAGLE-3/DFlash，3 PR） | ⚠️ SM120 资格验证进行中，11 项缺陷跟踪 | CC Switch 定价；New API 推理映射 |
| **DeepSeek-V4** | 稀疏 FA | ✅ MXFP4×FP8 MoE 后端（SM90） | ⚠️ NPU/AMD 推进 + DSA 索引器开放 IMA bug | 视觉变体目录修复（CC Switch） |
| **Qwen3.8-Flash-Next** | ✅ qwen4exp 在 GB10 上 2× 预填充 | ✅ QSA 上 FP8 主 KV + PLE CPU 卸载 | ✅ 新模型引入（#36497） | ⚠️ LiteLLM 仍无法配置 `reasoning_effort` |
| **Kimi K3** | — | ✅ MI325X 上 AITER MXFP4 MoE | ✅ AMD ROCm gluon 路径 | — |
| **Spark2_5** | ✅ 首日全流程 | — | — | ❌ Ollama 可下载但无法运行（#18195） |
| **MiniMax-M3** | — | — | ❌ sm_121 上全零 token（#38143） | ❌ Ollama cloud JSON 拆分 |
| **GPT-6 Astra / Gemini 3.8 Flash** | — | — | — | ✅ CC Switch + New API（能力处理、定价） |

**领跑者：** llama.cpp 在*新架构*上仍是最快（Spark2_5 一个构建即端到端）。vLLM 与 SGLang 在*前沿规模*使能上实际持平，但风险画像不同——vLLM 的 GLM-5.3-Flash spec-decoding 是协调合并落地，而 SGLang 的正处在资格验证中并公开缺陷跟踪（可以说更透明）。网关层在引擎不服务的*API 表面*模型（GPT-6、Gemini）上领先。值得注意的不对称：MiniMax-M3 W4A16 在 vLLM 上输出正确，但在 SGLang 上输出全零（#38143）——相同权重，引擎成熟度分化。

## 4. 性能前沿

- **KV 缓存是今日首要战场**，横跨每一层：vLLM 在稀疏注意力路径上的 FP8 主 KV；SGLang 的统一 KV 池容量修复与 host 层 HiCache（附带回载损坏 bug）；llama.cpp 的非连续 cell 恢复用于 agentic 会话；Unsloth 的 KV 抢占 + `--preempt-ram` host 停放；Ollama 的 MLX 前缀缓存税（**每轮 17–27s 重预填充**）。前缀缓存*复用*失败（vLLM #54094/#53504、llama.cpp #28495 的 42–54% 吞吐下降）展示了出错时的代价。
- **投机解码**如今已成标配——也是头号正确性风险：vLLM 的 TurboQuant+MTP 静默退化、SGLang 的接受率随运行时间衰减至零（#37326）、llama.cpp 在量化目标上的贪心分歧（#25618）。性能收益是真实的（SGLang DSA top-k v2：ISL 70k 下 **吞吐 +4.9%，TPOT −3.5%**），但正确性滞后。
- **量化**：MXFP4 正在成为跨厂商统一格式——vLLM 已有*三套* MXFP4 MoE 后端，外加原生 HIP 与 AITER 路径。FP8 在 Blackwell 边缘（SM120 高负载下 Xid 13）仍不稳定。
- **内核与硬件调优**：DeepGEMM pin 回滚（vLLM）、CUDA 竞态修复（llama.cpp b10826）、OpenCL/Metal/RDNA4 逐内核调优、ROCm 融合 DSA 元数据。
- **冷启动/尾延迟**：vLLM 约 100s 的 Dynamo 子图修复与采样器预热；New API 的每通道 TTFB 超时与自动回退——网关层开始优化引擎暴露的环节。

## 5. 层级定位

- **服务引擎（vLLM、SGLang）**：前沿使能、投机解码、内核级优化、分布式拓扑（TP/PP）。速度最高，正确性风险也最高。两者今天实质上都是模型厂商协同工程平台（GLM、DeepSeek、Qwen 的支持以厂商协同 PR 集形式落地）。
- **本地运行时（llama.cpp、Ollama）**：llama.cpp 是*底座*——Ollama 和 Unsloth 都构建于其上，其 9 构建节奏向下游传导。Ollama 在打包、云标签（如今已成负债）以及——终于——可观测性（Prometheus 端点）上做出差异化。llama.cpp 的硬件覆盖（RDNA4、Hexagon、GB10、M2 Max）无可匹敌。
- **网关/路由（LiteLLM、New API、CC Switch、Claude Code Router）**：翻译正确性、鉴权/安全（New API rc.34 的 TOTP/Passkey 翻新）、计费、回退。今日的风险画像是*花费算术*（LiteLLM 的 2× 缓存读双计费、New API 的图像双收费）以及*工具调用协议翻译*（CC Switch 的 tool_call_id 重写）。值得注意的是，LiteLLM 的 Foundry Local provider 与 Ollama 的 `:cloud` 标签正从两侧模糊本地/托管边界。
- **微调/本地平台（Unsloth）**：编排与硬件打包而非内核——KV 抢占 UX、DGX Spark 双节点路由、ARM64 CUDA、Strix Halo 后端选型（Vulkan > ROCm，难得的实测结论）。

## 6. 趋势信号

1. **静默错误输出是真正该害怕的失败模式。** 健康服务下的 MiniMax-M3 全零 token、TurboQuant+MTP 退化、130k 上下文后的瞬时 EOS、DSV4/Qwen3.8 上量化目标的贪心非确定性。如果你在生产环境跑前沿混合模型，输出级 eval（而不只是存活探针）现在已是必需。关注：SGLang #38143、vLLM #53180/#53257、llama.cpp #27756。
2. **混合线性注意力是新基线——但还不成熟。** GDN/DeltaNet/DSA 支持正向各层铺开，但反复出现的 bug（循环状态随深度/层退化、索引器内核故障、非确定性随并发放大）表明整个生态比其验证工具领先了一代模型。
3. **Blackwell 边缘（SM120/121、GB10、DGX Spark）在各处都处于资格验证中。** FP8 不稳定（vLLM Xid 13）、Flash-Attention 崩溃（Ollama #18276）、引擎特定阻塞（SGLang #37105）。预计本周会有补丁发布潮；在 vLLM #55571 与 SGLang #37813 跟踪项关闭前，不要把生产压到 SM120 上。
4. **计费正确性成为网关层新战场。** 同一天出现两个独立的双计费 bug（LiteLLM #40006、New API #7229）。如果你的成本回扣基于网关花费日志，本周请与厂商账单对账。
5. **Agentic 工作负载正在重塑引擎内部。** 长会话的 KV 缓存恢复、前缀复用修复、工具调用解析器鲁棒性（Ollama 中 gemma4 不可解析）、推理参数串接（`thinking` vs `enable_thinking` vs `reasoning_effort`）在各层仍不一致——需按模型做端到端验证。
6. **AMD 与 NPU 正在以不对称方式缩小差距。** AMD 今天获得了 MXFP4 + Kimi K3 + DSV4 容量修复；NPU 工作（昇腾、T-Head）几乎完全集中在 SGLang——如果国产加速器支持对你重要，SGLang 目前是唯一可信的引擎路线。
7. **成本路由正在成为一等公民特性。** CC Switch 的跨厂商子代理路由（#7165——主线程旗舰模型、子代理闪速模型）预示了所有路由器的方向；New API 的 TTFB 感知回退（#7228）在弹性方面同理。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-07

## 今日要点

GLM-5.3-Flash 的推测解码支持以一组三个 PR（#55622、#55620、#55621）协同合入，将 EAGLE-3/DFlash 起草器接入该模型专属的 KV 分组与 MLA 感知 dtype 选择。与此同时，两个高危正确性 Bug 在生产环境中浮出水面：RTX PRO 5000（SM120）在 FP8 高负载下出现 Xid 13 / CUDA 非法内存访问（#55571），以及 TurboQuant k8v4 在与 MTP 推测解码组合使用时于混合 GDN 模型上静默产生退化 token（#53180）。

## 发布与破坏性变更

过去 24 小时内无新发布。需要运维关注的行为变更：

- **DeepGEMM 在 `nv_dev` 上的版本回退**（[PR #53680](https://github.com/vllm-project/vllm/pull/53680)）：在 [deepseek-ai/DeepGEMM#419](https://github.com/deepseek-ai/DeepGEMM/pull/419) 恢复 SM12x 纯 FP8 1d1d 内核之前，vendored 的 DeepGEMM 已被回退锁定至 `a6b593d`。在上述上游合入之前，Blackwell SM120/SM121 工作负载上的 GEMM 性能会存在差异。
- **LoRA 校验收紧**（[PR #55310](https://github.com/vllm-project/vllm/pull/55310)）：没有匹配 `target_modules` 的适配器现在会在加载阶段被拒绝，而非在请求阶段。修复 [#55193](https://github.com/vllm-project/vllm/issues/55193)。
- **`resolve_enable_thinking()` 辅助函数**（[PR #53389](https://github.com/vllm-project/vllm/pull/53389)）：在推理解析器中，客户端/模板传入的 `thinking` 现在会被视作 `enable_thinking` 的别名。修复 #43728。理论上向后兼容，但建议对 Qwen/Kimi 工具调用路径进行一次冒烟测试。
- **EAGLE-3 + 流水线并行** 现已正式支持，且 [Known Feature Incompatibility 注释](https://github.com/vllm-project/vllm/pull/55623) 已被更正（[PR #55623](https://github.com/vllm-project/vllm/pull/55623)）。

## 新模型与硬件支持

- **GLM-5.3-Flash + EAGLE-3 / DFlash 起草器**（[PR #55620](https://github.com/vllm-project/vllm/pull/55620)、[PR #55622](https://github.com/vllm-project/vllm/pull/55622)、[PR #55621](https://github.com/vllm-project/vllm/pull/55621)）：暴露 DFlash2 所需的辅助隐藏状态，并正确地将起草器的 GQA 注意力层通过 GLM-5.3 的 KV 布局进行路由——这是 `incoai/GLM-5.3-Flash-DFlash2` 能够实际加载的前提。
- **Qwen3.8-Flash-Next 在 QSA 路径上的 FP8 主 KV 缓存**（[PR #55557](https://github.com/vllm-project/vllm/pull/55557)）：稀疏注意力层的主 K/V 现在允许使用 `fp8_e4m3`；旁路缓存（raw-key ring、压缩键、GDN 状态）仍保持 bf16。
- **FlashInfer MXFP4 × FP8 融合 MoE（SM90）**（[PR #54032](https://github.com/vllm-project/vllm/pull/54032)）：面向 DeepSeek-V4 系列权重的第三个 MXFP4 MoE 后端，通过 `--moe-backend flashinfer_cutlass_humming` 显式启用。FP8 激活量化在内核内部完成，无需模型侧改动。
- **RDNA3 上的原生 HIP MXFP4（稠密 + MoE）**（[PR #46676](https://github.com/vllm-project/vllm/pull/46676)）：填补了 compressed-tensors MXFP4 检查点在 RX 7900 XTX 上无法加载的空白。
- **gfx942（MI325X）上 Kimi K3 的 AITER MXFP4 MoE**（[PR #50817](https://github.com/vllm-project/vllm/pull/50817)）：同时修复了 MLA decode 中止与 CDNA4 尺寸的 tile 形状泄漏到 CDNA3 的问题。
- **Qwen3.8-Flash-Next 基于 UVA 的 PLE 卸载 + N-gram 并行**（[PR #54371](https://github.com/vllm-project/vllm/pull/54371)）：通过 UVA 进行 pinned-CPU 嵌入查找，由 `VLLM_PLE_CPU_OFFLOAD=1` 开关控制。
- **XPU 批处理 LoRA**（[PR #51613](https://github.com/vllm-project/vllm/pull/51613)）：将按切片的 LoRA 启动折叠为单次内核调用，与 Triton 的多切片语义保持一致。
- **MRv2 多配置采样器预热**（[PR #54630](https://github.com/vllm-project/vllm/pull/54630)）：预热 seeded 与 greedy 分发路径，首请求延迟不再因 FlashInfer 编译而付出代价，修复 #54425 与 #54455。

## 性能与优化

- **冷启动时间减少约 100s**，通过从 `unified_kv_cache_update` 中移除 `layer_name`（[PR #50973](https://github.com/vllm-project/vllm/pull/50973)，已关闭）：Dynamo 会为每一层生成常量 guard，从而产出 65 个独立的已编译子模块。值得注意的是该变更当天被 revert-closed——很可能是 rebase 冲突；该优化本身是合理的，值得重新合入。
- **ROCm split-KV decode 内核现已支持 gfx11**（[Issue #50264](https://github.com/vllm-project/vllm/issues/50264) 2026-08-28 更新）：混合 Mamba 长上下文 decode 不再在 RDNA 上崩溃，上游通过 [#45916](https://github.com/vllm-project/vllm/pull/45916) 修复，且 `on_gfx12x()` 门控已放宽。
- **XPU LoRA 启动延迟**：将逐切片的 `bgmv_shrink/expand` 替换为批处理的 `lora_shrink/expand`，消除 Python 开销（[PR #51613](https://github.com/vllm-project/vllm/pull/51613)）。
- **DeepGEMM 1d1d 版本锁定**（[PR #53680](https://github.com/vllm-project/vllm/pull/53680)）在 SM12x 纯 FP8 性能上回退至上一个已知良好版本 `a6b593d`，直至上游修复合入。

## 稳定性与回归

按潜在的生产影响排序：

| 严重度 | Issue | 故障表现 | 是否已修复 |
|---|---|---|---|
| 🔴 高 | [#55571](https://github.com/vllm-project/vllm/issues/55571) — RTX PRO 5000（SM120）FP8 持续负载下出现 Xid 13 / CUDA 非法内存访问 | 请求中途 GPU fault；通过 `VLLM_DISABLED_KERNELS=FlashInferFP8ScaledMMLinearKernel` 或 `--enforce-eager` 消失，指向 FlashInfer FP8 scaled-mm | Open |
| 🔴 高 | [#53180](https://github.com/vllm-project/vllm/issues/53180) — TurboQuant k8v4 + MTP 在混合 GDN 上静默产生退化 token | 静默，无异常；输出错误 | Open |
| 🔴 高 | [#53257](https://github.com/vllm-project/vllm/issues/53257) — DeepSeek-V4-Flash 在 `temperature=0` 时非确定性，且随并发度放大 | 破坏任何 DSV4 生产工作负载的可复现性 | Open |
| 🔴 高 | [#54521](https://github.com/vllm-project/vllm/issues/54521) — Qwen3.8-Flash-Next 在 `indexer_budget` 附近 greedy 非确定性 | 相同字节级请求 → 在 SM121/GB10 上产出 5 种不同结果 | Open |
| 🟠 中 | [#54094](https://github.com/vllm-project/vllm/issues/54094) — DFlash2 + YaRN：相同的 1.04M prompt 零前缀缓存复用 | 长上下文回放需支付完整 prefill 代价 | Open |
| 🟠 中 | [#53504](https://github.com/vllm-project/vllm/issues/53504) — 混合 Mamba/GDN 上 MTP 首次重放未命中前缀缓存 | 首次回放完整 re-prefill；第二次起开始复用 | 部分修复 — [PR #52244](https://github.com/vllm-project/vllm/pull/52244) 进行中 |
| 🟠 中 | [#54369](https://github.com/vllm-project/vllm/issues/54369) — ROCm Sparse-MLA/kpool 每个 draft 步重建 attention metadata | 将 GLM-5.3-Flash ROCm 上有效的 MTP 深度限制为 k=4 | Open |
| 🟠 中 | [#51977](https://github.com/vllm-project/vllm/issues/51977) — gpt-oss-120b 工具调用中的 `openai_harmony.HarmonyError`（v0.26.0） | 工具调用间歇性 500 | Open |
| 🟡 低 | [#52907](https://github.com/vllm-project/vllm/issues/52907)（已关闭）— 多节点 Ray/TP-16 gloo 屏障死锁 0.26.1rc1.dev78→dev148 | 30 分钟空闲后 OOM；DeepSeek-R1 FP8 | Closed — 已合入 RC |
| 🟡 低 | [#50264](https://github.com/vllm-project/vllm/issues/50264) — RDNA 混合 Mamba decode 崩溃 | 由 [#45916](https://github.com/vllm-project/vllm/pull/45916) 放宽 gfx 门控解决 | 上游已解决 |
| 🟡 低 | [#28172](https://github.com/vllm-project/vllm/issues/28172) — `max_tokens` 差一错误 | 陈旧但仍开放 | Open |

## 对应用开发者的意义

- **如果你在大规模部署 DeepSeek-V4-Flash、GLM-5.3-Flash 或 Qwen3.8-Flash-Next：** 锁定一个已知良好的 vLLM 构建版本，在 [#53180](https://github.com/vllm-project/vllm/issues/53180)、[#53257](https://github.com/vllm-project/vllm/issues/53257) 和 [#54521](https://github.com/vllm-project/vllm/issues/54521) 关闭之前，避免将推测解码（MTP/EAGLE-3）与实验性 KV 缓存格式混合使用。作为针对 SM120 Xid 13 的短期缓解措施，可使用 `--enforce-eager` 或禁用 FlashInfer FP8 scaled-mm。
- **Qwen3.8-Flash-Next 或混合 Mamba/GDN 上的长上下文工作负载：** 首次重放时前缀缓存复用被破坏（[#54094](https://github.com/vllm-project/vllm/issues/54094)、[#53504](https://github.com/vllm-project/vllm/issues/53504)）。可以用两次相同请求进行预热，或在 [PR #52244](https://github.com/vllm-project/vllm/pull/52244) 合入之前暂不使用这些代码路径。
- **分类头上的多 LoRA：** 仍然没有原生支持——三个开放 issue（[#19623](https://github.com/vllm-project/vllm/issues/19623)、[#12829](https://github.com/vllm-project/vllm/issues/12829)、[#23719](https://github.com/vllm-project/vllm/issues/23719)）。建议维护自定义模型子类，或为每个任务运行多个 vLLM 实例。
- **AMD 用户：** RDNA3 终于获得原生 MXFP4（[PR #46676](https://github.com/vllm-project/vllm/pull/46676)），MI325X 获得可用的 Kimi-K3 推理（[PR #50817](https://github.com/vllm-project/vllm/pull/50817)）。如果出于成本考虑此前一直观望 AMD，差距正在缩小。
- **对冷启动敏感的部署：** ~100s Dynamo 子图修复（[PR #50973](https://github.com/vllm-project/vllm/pull/50973)）在重新合入后应能显著降低 MRv2 首 token 延迟——值得在自动扩缩容密集的场景中持续跟踪。
- **推理 / 工具调用客户端：** 审计所有传入 `thinking` 而非 `enable_thinking` 的客户端——[PR #53389](https://github.com/vllm-project/vllm/pull/53389) 中的新别名意味着 Qwen/Kimi 模板将开始遵循该字段；请验证其行为是否符合预期。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-07

## 1. 今日要点

过去 24 小时，仓库有 292 个 PR 和 38 个 issue 发生变动，三个讨论串主导了流量：**GLM-5.3-Flash** 继续推进其滚动的 SM120/RTX PRO 6000 集成（跟踪 issue [#37524](https://github.com/sgl-project/sglang/issues/37524) 汇总了 11 个未解决的缺陷，其中 [#38031](https://github.com/sgl-project/sglang/issues/38031) HiCache 损坏与 [#36906](https://github.com/sgl-project/sglang/issues/36906) 管道并行下 `KeyError: 'residual'` 是影响最大的未修复 bug）；**DeepSeek-V4** 在 NPU 和 AMD 两侧同步推进（[#37373](https://github.com/sgl-project/sglang/pull/37373) 新增 Atlas A5 支持，[#38192](https://github.com/sgl-project/sglang/pull/38192) 修复 unified-KV 容量计算），同时 DSA indexer 中出现一起严重的长上下文非法内存访问问题（[#37892](https://github.com/sgl-project/sglang/issues/37892)）；**Apple Silicon** 方向则更新了一份 RFC，提议由 Torch 拥有 SRT 路径、并将整个模型导出到 MLX region（[#32321](https://github.com/sgl-project/sglang/issues/32321)

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 每日速览 — 2026-09-07

## 1. 今日要点

当日的工作以**模型与性能优化**为主线：b10828 完成了端到端 **Spark2_5** 支持，**qwen4exp 预填充**在 GB10 上凭借 PLE 表直读实现了超过**两倍**提速（#28136），一个长期存在的 **GDN 归一化正确性 bug**（`max` → `rsqrt`）在 b10829 中修复。同期内还落地了多项 **CUDA 竞态条件修复**（b10826）、OpenCL/Metal 内核调优，以及 qwen4exp 在 Vulkan 上 `--lazy-mode auto` 的回归问题。

## 2. 发布版本与破坏性变更

24 小时内共 9 次构建版本更新（b10821–b10830）。主要变更：

- **b10830** — 新增 `--fuse-qkv` 标志，用于 HF→GGUF 转换，在转换时合并 Q/K/V 投影。（[#22780](https://github.com/ggml-org/llama.cpp/pull/22780)）
- **b10829** — **正确性修复**：门控 Delta Net (GDN) 的 q/k 归一化从 `max` 改为 `rsqrt`，以对齐 `flash-linear-attention` 的 `l2norm(x) = x * rsqrt(sum(x*x) + eps)`。（[#28068](https://github.com/ggml-org/llama.cpp/pull/28068)）
- **b10828** — Spark2_5 模型支持（[#27868](https://github.com/ggml-org/llama.cpp/pull/27868)）。
- **b10827** — OpenCL：修正 q4_K / q5_K `mul_mat` 的权重打包。（[#28402](https://github.com/ggml-org/llama.cpp/pull/28402)）
- **b10826** — **`mmid` 与 `mmf` 的 CUDA 竞态修复**（[#28475](https://github.com/ggml-org/llama.cpp/pull/28475)）。
- **b10825** — 文法：修复最大重复阈值。（[#28469](https://github.com/ggml-org/llama.cpp/pull/28469)）
- **b10823** — 新增 `--log-jsonl` 标志，支持结构化 JSONL 日志。（[#28437](https://github.com/ggml-org/llama.cpp/pull/28437)）
- **b10822** — UI 资源现通过 CMake 直接内嵌（移除外部 gzip 依赖，简化交叉编译）。（[#28445](https://github.com/ggml-org/llama.cpp/pull/28445)）
- **b10821** — Metal：完成 M2 Max 的剩余 fa-vec 调优。（[#28458](https://github.com/ggml-org/llama.cpp/pull/28458)）

无 API 不兼容变更；仅为新增标志与各内核的正确性/性能修复。

## 3. 新模型与硬件支持

- **Spark2_5ForCausalLM** — 完整流水线：GGUF 转换、架构注册、张量映射、分词器预分词、推理图（[#27868](https://github.com/ggml-org/llama.cpp/pull/27868)）。
- **HrmTextForCausalLM (DFM Mimir 1B)** — 以 (gate,q,k,v) 顺序的融合 gqkv 投影，低/高周期交替（[#27625](https://github.com/ggml-org/llama.cpp/pull/27625)）。
- **AMD RDNA4（gfx1200 / gfx1201）** — Q6_K / Q2_K mul_mat 修复及 MMVQ warp 调优（[#25940](https://github.com/ggml-org/llama.cpp/pull/25940)、[#24386](https://github.com/ggml-org/llama.cpp/pull/24386)）；R9700 PRO 的 Flash Attention 调优（[#28102](https://github.com/ggml-org/llama.cpp/pull/28102)）。
- **Qualcomm Hexagon** — 批处理缓冲区边界与跨步拷贝派发修正（[#28516](https://github.com/ggml-org/llama.cpp/pull/28516)）。
- **Apple Silicon M2 Max** — 最终 fa-vec 调优（[#28458](https://github.com/ggml-org/llama.cpp/pull/28458)）。
- **mtmd 分片 mmproj GGUF** — 加载器现可正确处理拆分的 mmproj 文件（[#28517](https://github.com/ggml-org/llama.cpp/pull/28517)）。

## 4. 性能与优化

- **qwen4exp 在 GB10 上预填充提速 >2×** — 对惰性 PLE 表的直读消除了一个主要热点；"700+ tok/s 基准"与"300 tok/s 真实任务"之间的差距被抹平（[#28136](https://github.com/ggml-org/llama.cpp/pull/28136)）。
- **修复 qwen4exp 在 Vulkan（AMD iGPU）上的回归** — `--lazy-mode auto` 自 #27837 起将 pp512 减半；PR #28326 重新定义 `auto` 为"为系统选择一个合适的模式"，原行为迁移至 `large`，并新增 `all`。（[#28326](https://github.com/ggml-org/llama.cpp/pull/28326)，跟踪 [#28160](https://github.com/ggml-org/llama.cpp/issues/28160)）
- **DSV4 / GLM 的稀疏 flash-attention** — 基于 API hint 的稀疏 FA 已落地（[#27970](https://github.com/ggml-org/llama.cpp/pull/27970)）。
- **KV 缓存非连续 cell 恢复** — 智能体工作负载（长会话下的 Qwen3.5+）得到优化（[#27991](https://github.com/ggml-org/llama.cpp/pull/27991)）。
- **R9700 PRO Flash Attention** — 完成 Qwen3.8 27B 长上下文预填充调优；并修复通用 CUDA FA 路径下 head-size 256 的 bug（[#28102](https://github.com/ggml-org/llama.cpp/pull/28102)）。
- **RDNA4 MMVQ** — 针对 gfx1200 上 Q4_K / Q6_K 的 `ncols_dst==1` warp 数调优（[#24386](https://github.com/ggml-org/llama.cpp/pull/24386)）。
- **RDNA4 mul_mat** — Q6_K、Q2_K 修复及 MMQ 条件更新（[#25940](https://github.com/ggml-org/llama.cpp/pull/25940)）。
- **OpenCL q4_K/q5_K** — 为 `mul_mat` 选择正确的权重打包方式（[#28402](https://github.com/ggml-org/llama.cpp/pull/28402)）。
- **Metal M2 Max** — 新增 fa-vec 调优条目（[#28458](https://github.com/ggml-org/llama.cpp/pull/28458)）。
- **HF→GGUF 转换** — `--fuse-qkv` 支持在转换时融合 Q/K/V，简化下游推理并略微降低元数据开销（[#22780](https://github.com/ggml-org/llama.cpp/pull/22780)）。

## 5. 稳定性与回归

大致按用户影响排序：

| 严重程度 | Issue | 摘要 | 状态 |
|---|---|---|---|
| High | [#20837](https://github.com/ggml-org/llama.cpp/issues/20837) | Qwen3.5 9B 在启用思考模式时输出 XML 工具调用并中途停止（60 条评论）。 | Open |
| High | [#28495](https://github.com/ggml-org/llama.cpp/issues/28495) | 在单卡 CUDA/HIP 上使用 `-np 2` + `--kv-unified` 时，从第二个长请求起提示处理速度下降 **42–54%**。根因：unified-KV FA 内核仅跳过 KQ-mask 末尾，未跳过内部的全部 `-INF` 块。 | Open |
| High | [#27756](https://github.com/ggml-org/llama.cpp/issues/27756) | Qwen3.5-hybrid 64 层（Qwen3.8-27B）：在 CUDA 与 CPU 上约 130k 上下文后出现**静默即时 EOS**，与 DeltaNet 循环状态深度 × 层数带来的退化一致。 | Open |
| High | [#23577](https://github.com/ggml-org/llama.cpp/issues/23577) | MTP 与 Qwen3.6 27B 在长会话（CUDA）后输出重复的 `////`。 | Open |
| High | [#25618](https://github.com/ggml-org/llama.cpp/issues/25618) | 在量化目标上，贪心投机解码（draft-mtp / draft-dspark）与原版结果**发散**（bf16 一致）。Ngram 投机解码一致。 | Open |
| Med | [#26845](https://github.com/ggml-org/llama.cpp/issues/26845) | SYCL：在第二个提示上产生乱码输出（Arc Pro B60）。 | Open |
| Med | [#26382](https://github.com/ggml-org/llama.cpp/issues/26382) | `-ctk q5_1` 不带 `-ctv` 时，在无 V 缓存的模型（如 GLM-5.2）上报错。 | Open |
| Med | [#27981](https://github.com/ggml-org/llama.cpp/issues/27981) | llama-ui：在桌面上无法打开推理等级选择菜单（b10687）。 | Open |
| Med | [#28160](https://github.com/ggml-org/llama.cpp/issues/28160) | Vulkan 回归：`--lazy-mode auto` 使 q

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-07

## 今日要点
最值得关注的是 **PR #16998**，它终于落地了一个可选择性启用的 Prometheus 兼容 `/metrics` 端点 —— 回应了一个长期悬而未决的社区请求 ([#3144](https://github.com/ollama/ollama/issues/3144))，该请求在两年多时间里累计获得了 116 个 👍。稳定性方面，自 v0.32.12 起，**AMD iGPU 上的 Vulkan 后端出现了一个回归**，影响 66 GB 模型的加载 ([#18272](https://github.com/ollama/ollama/issues/18272))；此外，多个**云端服务模型**（kimi-k2.6、glm-5.3、MiniMax-M3）正表现出延迟、循环以及 JSON 拆分等故障，已影响到生产环境中的智能体。

## 发布与破坏性变更
过去 24 小时内没有新版本发布。考虑到回归报告的数量（Vulkan AMD iGPU、Blackwell flash attention、MLX stop state、gemma4 tool parser），这一缺席值得关注 —— 在受影响硬件/模型上运行的运维人员应锁定到各自最后已知可用的版本。

## 新模型与硬件支持
- **新架构请求：** `spark2_5`（Spark-X2.5 家族，4B / 1.7B）—— 当前能下载但无法启动推理 ([#18195](https://github.com/ollama/ollama/issues/18195))。
- **工具调用解析器缺口：** `gemma4:12b` 的 `BEGIN_ARG`/`END_ARG` 语法无法被解析，导致出现退化的 `<|channel>thought` 循环，HTTP 返回 200 但无可用内容 ([#18275](https://github.com/ollama/ollama/issues/18275))。
- **GLM-OCR 修复进行中** —— PR [#17195](https://github.com/ollama/ollama/pull/17195) 为旧版 `glmocr` GGUF 注册了 `<|user|>` 作为 EOT token，以防止生成失控。
- **硬件覆盖说明：** 针对 Vulkan/AMD iGPU、MLX/Apple Silicon 以及 Blackwell sm_120 的 issue 表明各主要后端都在被积极测试，但回归问题仍然存在。

## 性能与优化
- **MLX runner 前缀缓存开销：** 缓存恢复对齐到 8192 token 的整数倍，导致每次冷启动提示词之后每个回合都要付出固定的 **17–27 秒 re-prefill**。在 Claude Code 级别的智能体工作负载上跑本地模型时，这是一个逐回合的开销 ([#18267](https://github.com/ollama/ollama/issues/18267))。
- **上下文检查点保真度：** PR [#18271](https://github.com/ollama/ollama/pull/18271) 将 Go 端渲染器的消息分隔符接入 llama-server 的 `/completion`，使用户回合检查点得以正确放置，从而实现更准确的前缀缓存复用。
- **可观测性：** PR [#16998](https://github.com/ollama/ollama/pull/16998) 新增了通过 `OLLAMA_METRICS=1` 启用的可选用端点，输出 `ollama_requests_queued`、`ollama_queue_capacity`、`ollama_models_loaded`、`http_requests_total` 以及每个模型的 token 指标 —— 兼容 Prometheus。
- **许可证合规缺口：** Issue [#3185](https://github.com/ollama/ollama/issues/3185)（272 👍）仍处于开放状态 —— 静态链接的 llama.cpp 依赖项未在发布制品中随附所需的 MIT 版权声明。

## 稳定性与回归
按对生产运维的影响严重程度排序：

1. **[高] 自 v0.32.12 起的 Vulkan/AMD iGPU 回归** —— 66 GB 模型上出现 `"Not enough memory for command submission"`。v0.32.9 正常；v0.32.12+ 失败。([#18272](https://github.com/ollama/ollama/issues/18272))
2. **[高] Blackwell sm_120 + qwen3moe flash attention 崩溃** —— `ollama run qwen3-coder:30b` 在成功完成内存适配后退出码为 `0xc0000409`（"shared object initialization failed"）；自动启用的 FA 是触发条件。([#18276](https://github.com/ollama/ollama/issues/18276))
3. **[高] 云端延迟 —— kimi-k2.6:cloud** —— 单次 `/api/chat` 请求挂起超过 10 分钟；流的 `INTERNAL_ERROR` 已反复出现多日。([#16845](https://github.com/ollama/ollama/issues/16845))
4. **[中] 云端推理拆分 —— MiniMax-M3:cloud** —— JSON 输出间歇性地被拆分到 `message.reasoning` 和 `message.content`；单独的 `content` 永远不是合法 JSON，在 OpenAI 兼容端点上会破坏结构化输出管线。([#17987](https://github.com/ollama/ollama/issues/17987))
5. **[中] 云端推理循环 —— glm-5.3:cloud** —— 模型进入无止境的推理，在 OpenCode/ZCode 中中止，而官方的 Z.AI API 工作正常。([#18193](https://github.com/ollama/ollama/issues/18193))
6. **[中] MLX 模型卡在 "Stopping..."** —— M4 MacBook Air 上的 `muse-glimmer:30b-mlx` 进入无法自行解除的 Stopping 状态，即便设置了 `OLLAMA_KEEP_ALIVE=30` 也无效；其中一次出现恰好伴随一次完整的 macOS 重启。([#18269](https://github.com/ollama/ollama/issues/18269))
7. **[低] 模型名称长度上限（80 字符）** —— 阻止较长的 HuggingFace 标识符被拉取。([#18274](https://github.com/ollama/ollama/issues/18274))
8. **[低] 下载进度回退** —— 一个长期存在但已关闭的报告 [#8484](https://github.com/ollama/ollama/issues/8484)；值得一提，因为用户在不稳定网络下仍会偶尔遇到。

已存在的修复 PR：可观测性指标（PR [#16998](https://github.com/ollama/ollama/pull/16998)）、检查点放置（PR [#18271](https://github.com/ollama/ollama/pull/18271)）、glm-ocr EOT（PR [#17195](https://github.com/ollama/ollama/pull/17195)）以及 Windows 托盘 UX（PR [#18273](https://github.com/ollama/ollama/pull/18273)）。目前还没有针对 Vulkan AMD 回归、Blackwell FA 崩溃以及云端模型故障的可见修复 PR。

## 对应用开发者意味着什么
- **暂时不要在智能体的 JSON 契约上追 `:cloud` 标签。** MiniMax-M3:cloud 正将结构化输出拆分到 reasoning/content 字段，而 glm-5.3:cloud 会一直循环到中止。如果你依赖确定性的工具调用，请优先选择本地部署或回退到厂商 API，直到这些问题稳定下来。
- **谨慎锁定 Ollama 版本。** 如果你通过 **Vulkan 在 AMD iGPU** 上运行大模型，请停留在 **v0.32.9**。如果你在 **Blackwell 笔记本上跑 qwen3-coder:30b**，预热阶段预计会发生 flash-attention 崩溃 —— 在 [#18276](https://github.com/ollama/ollama/issues/18276) 解决之前，请禁用 FA 或改用其他 tag。
- **MLX 上的智能体循环在每次冷启动提示词后每回合都要付出 17–27 秒的代价** ([#18267](https://github.com/ollama/ollama/issues/18267))。如果你在 Apple Silicon 上构建本地智能体，请围绕暖缓存连续性做设计，或对回合进行激进批处理。
- **可观测性即将到来。** PR [#16998](https://github.com/ollama/ollama/pull/16998) 合入后，可通过 `OLLAMA_METRICS=1` 启用，届时你就可以把 `ollama_requests_queued`、`http_requests_total` 以及每个模型的 token 计数器接入 Prometheus —— 请围绕请求队列深度规划你的 SLO 仪表化，它是云端性能下降最强的先行指标。
- **工具调用兼容性参差不齐。** gemma4 的原生工具格式目前还无法被解析；在上线依赖工具调用解析的智能体集成之前，请确认你选定的模型 tag 拥有可用的解析器。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-07

## 1. 今日要点

LiteLLM 发布了 **v1.100.0**（稳定版）以及首个 **v1.101.0-rc.1** 候选版本，重点聚焦于 LLM 翻译的正确性修复（包括 Anthropic 拒绝块、Bedrock 文件删除、cache-control 注入，以及 `custom_cost_per_token` 双重计费问题）。平台方面，新增了 **Foundry Local** 提供方，**Bedrock Mantle Responses** 接入了 SigV4/IAM 认证，多个长期存在的代理陈旧问题也被轮替下线——但新一轮的成本追踪与预算执行 bug（#40006、#40050、#39979）表明，支出/计费链路仍是生产租户风险最高的层级。

## 2. 版本发布与破坏性变更

- **[v1.100.0](https://github.com/BerriAI/litellm/releases/tag/v1.100.0)** — 最新稳定版。Docker 镜像使用 cosign 签名（密钥来自提交 `0112e53`）。
- **[v1.101.0-rc.1](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.1)** — 1.101 线的首个候选版本。如果你固定使用候选版以提前观察翻译修复，可以关注这条线。

发布说明中没有显式的破坏性变更提示，但缓存成本双重计费的修复（#40006 区域）以及 `main-stable` 上 `/config/reload` 的 404 错误（#30772）表明，基于数据库的部署在升级后应校验支出计算的准确性。

## 3. 新增模型与硬件支持

- **Foundry Local 提供方** — PR [#29449](https://github.com/BerriAI/litellm/pull/29449) 将 `foundry_local/` 作为一等 OpenAI 兼容提供方引入，包含控制台元数据、文档和官方 Logo。适用于 Windows/边缘端的本地优先推理。
- **OpenRouter Qwen + cache_control** — PR [#29335](https://github.com/BerriAI/litellm/pull/29335) 恢复了在 OpenRouter Qwen 负载中被剥离的 `cache_control` / `cache_control_injection_points` 参数（关闭 #29322）。
- **DashScope Qwen 3.6/3.7 定价缺失** — Issue [#29922](https://github.com/BerriAI/litellm/issues/29922)（👍 2）指出 `model_prices_and_context_window.json` 中缺少定价数据，导致部分 Qwen 模型产生 `$0` 成本条目。任何使用 `dashscope/*` 通配符的团队都会受影响。
- **Qwen3.8-27B-FP8 reasoning_effort** — Issue [#37359](https://github.com/BerriAI/litellm/issues/37359)（👍 7，社区信号最高）反馈称，虽然该模型原生支持 `reasoning_effort`，但无法通过 LiteLLM 进行配置。如果你使用此 SKU，建议点赞/关注。
- **Azure AI MAI 图像生成** — PR [#40074](https://github.com/BerriAI/litellm/pull/40074) 加固了 MAI 图像请求：拒绝 `n>1`（提供方会静默返回 1 张图），并提前剔除不支持的 `size` 值，避免它们以隐式的 400 错误形式浮上来。

## 4. 性能与优化

- **Rust CI 抖动修复** — PR [#40073](https://github.com/BerriAI/litellm/pull/40073) 将 retained-callback 测试串行化，消除了 `LiteLLM Rust > release wheel` 任务上约 20% 的抖动（与 `gc.collect` 的竞态）。无面向用户的性能变化，但解除了 Rust 发布产物的流水线阻塞。
- **Router 回退正确性** — PR [#27462](https://github.com/BerriAI/litellm/pull/27462) 对每次回退尝试深拷贝 `kwargs`（修复 #24764），避免回退跳点之间的状态污染导致重试错误或模型选择卡死。
- **自适应 Router 状态重载** — PR [#29398](https://github.com/BerriAI/litellm/pull/29398) 在重载时将持久化的 delta 合并到冷启动的 Beta 先验上，而非覆盖它，从而修复代理重启后出现的 `gammavariate: alpha and beta must be > 0.0` 500 错误（#29397）。

## 5. 稳定性与回归

按用户可见影响排序。如有开放/已合并的修复 PR，会一并标注。

| 严重度 | 条目 | 状态 | 修复 |
|---|---|---|---|
| 🔴 高 | [#40050](https://github.com/BerriAI/litellm/issues/40050) `/v1/messages`（Claude Code）误报 "Budget has been exceeded" — 强制成本远高于实际支出，将 key 以 429 锁定 | OPEN | 暂无 |
| 🔴 高 | [#40006](https://github.com/BerriAI/litellm/issues/40006) `custom_cost_per_token` 与 `cache_read_input_token_cost` 一起使用，会对 Anthropic 缓存读取 token **重复计费** | OPEN | 暂无 |
| 🔴 高 | [#39715](https://github.com/BerriAI/litellm/issues/39715) Bedrock 上 `DELETE /v1/files/{file_id}` 返回 500 — 托管文件无法删除 | OPEN | 暂无 |
| 🟠 中 | [#39979](https://github.com/BerriAI/litellm/issues/39979) 请求日志的日期范围选择器将本地时间当作 UTC，对非 UTC 运维人员会静默偏移窗口 | OPEN | 暂无 |
|  中 | [#30772](https://github.com/BerriAI/litellm/issues/30772) `litellm-database:main-stable`（2026 年 6 月镜像）上 `POST /config/reload` 返回 **404** | OPEN | 暂无 |
|  中 | [#39721](https://github.com/BerriAI/litellm/issues/39721) Anthropic `/v1/messages` 透传时，会将 OpenAI Responses 的 `refusal` 内容块静默丢弃为空数组 | CLOSED（陈旧） | 处理中 |
|  中 | [#26552](https://github.com/BerriAI/litellm/issues/26552) 代理后走 OpenAI 的 `POST /v1/images/edits` 带 `mask` 时报错 "Attempted to access streaming request content, without having called read()" | OPEN（陈旧，本列表中存续最久的未关闭 issue） | 暂无 |
|  低 | [#29912](https://github.com/BerriAI/litellm/issues/29912) 内部用户的 `max_budget` 会拦截零成本模型 — `_PROXY_MaxBudgetLimiter` 忽略 `skip_budget_checks` | OPEN | PR [#29918](https://github.com/BerriAI/litellm/pull/29918) 开放中 |
| 🟡 低 | [#29261](https://github.com/BerriAI/litellm/issues/29261) 仅传入 `x-litellm-api-key` 时，交互式 OAuth2 MCP 服务器返回 500 而不是 401+`WWW-Authenticate` | CLOSED（陈旧） | — |
|  低 | [#29911](https://github.com/BerriAI/litellm/issues/29911) 信息泄露 — `/model/info` 向未认证访问者返回完整模型配置（安全问题） | OPEN | 暂无 |
|  低 | [#29810](https://github.com/BerriAI/litellm/issues/29810) `/v1/responses` 上的 `cache_control_injection_points` 不生效，并会触发 Claude 工具调用循环直到 `MaxTurns` | OPEN | 暂无 |

## 6. 对应用开发者的意义

- **审计你在 Anthropic + 缓存 token 上的支出计算。** [#40006](https://github.com/BerriAI/litellm/issues/40006) 意味着，只要你设置了 `custom_cost_per_token.cache_read_input_token_cost`，缓存命中响应上报的成本大约是真实成本的 2 倍。如果你基于 LiteLLM 的 `spend` 日志向最终用户计费，这是一个客户信任问题——而非财务四舍五入误差。
- **不要把 `max_budget` 强制执行视为 Claude Code key 的绝对上限。** [#40050](https://github.com/BerriAI/litellm/issues/40050) 显示，key 可能在远未接近真实预算上限时就被锁定。修复前，请在客户端构建重试/退避逻辑，检测到 429 + "Budget" 时触发人工核对，而非将其视为硬性策略。
- **Bedrock 托管文件工作流存在存储泄漏。** [#39715](https://github.com/BerriAI/litellm/issues/39715) 意味着你 S3 后端的 Bedrock 文件无法通过 OpenAI 兼容的 `DELETE /v1/files/{id}` 清理。若依赖文件生命周期，请直接对接 Bedrock 控制面进行清理。
- **在 `litellm-database:main-stable` 上跳过 `/config/reload`。** 在 [#30772](https://github.com/BerriAI/litellm/issues/30772) 解决之前，请对数据库构建采用滚动重启方式应用配置变更，而非依赖 reload 端点。
- **管理界面在 `/model/info` 上存在低危未授权信息泄露**（[#29911](https://github.com/BerriAI/litellm/issues/29911)）。如果你的代理暴露在受信边界之外，请在前置加入阻断该路径的认证层，或在入口处进行限制。
- **`/v1/responses` 的 cache-control 路径在 Claude 后端下已损坏**（[#29810](https://github.com/BerriAI/litellm/issues/29810)）。如果你在 Claude 上配合 OpenAI Agents SDK 使用 `cache_control_injection_points`，请禁用注入点，否则会面临 `MaxTurns` 失控循环与零缓存复用的风险。
- **除非你确实需要 1.101-rc 专属修复，否则固定到 `v1.100.0` 而非 RC**；1.100 线经过了 1.99.x 发布过程中最多的实战检验。
- **关注 #40050 / #40006** 进入 1.101.x 的修复——两者影响足够大，维护者很可能在合并修复后立即发布补丁版本。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 简报 — 2026-09-07

## 1. 今日要点

主导议题是面向捆绑 llama-server 的 **KV 缓存抢占（KV-cache preemption）**：一对叠加的 PR（[#10301](https://github.com/unslothai/unsloth/pull/10301)、[#10358](https://github.com/unslothai/unsloth/pull/10358)）改写了并行 Studio 聊天共享单一服务器的方式，配合上游 `unslothai/llama.cpp#184`/`#190`，让服务器能够将槽位（slot）暂存到主机内存。平台侧方面，**DGX Spark** 推出双节点服务编排器并配备异步副本路由器（[#10323](https://github.com/unslothai/unsloth/pull/10323)），**Windows on ARM NVIDIA 主机**（GB10 / N1X）终于获得了原生 ARM64 CUDA 工具链（[#10282](https://github.com/unslothai/unsloth/pull/10282)）。AMD Strix Halo（gfx1150/1151）在经过实测对比后，被路由至 Vulkan 版的 llama.cpp 预编译包，而非 ROCm（[#10381](https://github.com/unslothai/unsloth/pull/10381)）。

## 2. 发布与破坏性变更

过去 24 小时内无新发布。无可上报的版本标签化 API 或配置变更。

## 3. 新增模型与硬件支持

- **DGX Spark 双节点配对拓扑** — Studio/Desktop 现在从 `spark_cluster.recommend_topology` 中选择三种拓扑之一，并跨两个 Spark 节点进行异步路由。叠加在 `feature/dgx-spark-two-node` 之上。 [#10323](https://github.com/unslothai/unsloth/pull/10323)
- **搭载 NVIDIA GPU 的 Windows on ARM** — 在 GB10 / N1X 主机上安装原生 ARM64 CUDA 工具链；非 NVIDIA 或非 ARM 路径不受影响。 [#10282](https://github.com/unslothai/unsloth/pull/10282)
- **AMD Strix Halo（gfx1150/gfx1151）→ Vulkan 预编译包** — 检测流程现在为这些部件安装 Vulkan 版 llama.cpp 而非 ROCm；已存在的 ROCm 安装可通过更新横幅获得切换选项。 [#10381](https://github.com/unslothai/unsloth/pull/10381)
- **全新安装中的 Apple Silicon MLX** — 当未使用 `SKIP_STUDIO_BASE=1` 时，恢复 MLX 依赖步骤，因此 Train/Export 不再处于禁用状态。 [#10403](https://github.com/unslothai/unsloth/pull/10403)
- **aarch64 容器镜像** — 关于官方 ARM64 容器镜像的开放功能请求；在 aarch64 集群上，xformers-from-source 是一个已知痛点。 [#4198](https://github.com/unslothai/unsloth/issues/4198)
- **历史模型支持工单**（已关闭，无新代码）— `gpt-oss-20b` GGUF tensor-type 失败 [#3124](https://github.com/unslothai/unsloth/issues/3124)、`gemma-4-12b-it` UD-Q4_K_XL on 16 GB [#6022](https://github.com/unslothai/unsloth/issues/6022)、Gemma3 微调 `Missing required positional argument` [#3996](https://github.com/unslothai/unsloth/issues/3996)、`GptOssTopKRouter` 缺失 `weight` 属性 [#3729](https://github.com/unslothai/unsloth/issues/3729)。

## 4. 性能与优化

- **KV 抢占（并行聊天）** — 一个 llama-server 以 `--parallel N --kv-unified -c N` 启动，可为 N 个槽位提供共享的 N 单元池，但目前仅校验 `prompt_tokens < slot.n_ctx`。PR #10301 在 Studio 侧引入抢占机制，使独立聊天互不干扰。 [#10301](https://github.com/unslothai/unsloth/pull/10301)
- **通过 `--preempt-ram` 在服务器侧暂存** — 与 `unslothai/llama.cpp#184`/`#190` 配套。当服务器自身可将槽位暂存到主机内存时，Studio 关闭其内置抢占逻辑，让每个聊天都能使用完整上下文。 [#10358](https://github.com/unslothai/unsloth/pull/10358)
- **Strix Halo Vulkan > ROCm** — 在 Radeon 8060S CI runner 上实测；数值汇总于 #10381，但按工作负载拆分的明细请查看 PR 正文。 [#10381](https://github.com/unslothai/unsloth/pull/10381)
- **集成显卡提示词缓存** — 在一份 Strix Halo 日志包中，关闭 llama-server 提示词缓存导致用户在一个 48.8 小时的会话中损失了 **44 小时**。#10382 在集成显卡全卸载场景下保持其开启（来自 #5692 的独立显卡取舍策略保留）。 [#10382](https://github.com/unslothai/unsloth/pull/10382)
- **Kaggle CI runner 耗时** — 在双账号路径上实测：T4 smoke 占用 runner **41.5 分钟**，其中有效工作约 4 分钟。新 PR 改为派发内核后再延迟收集。 [#10183](https://github.com/unslothai/unsloth/pull/10183)
- **安装与后端共用单一 uv 缓存** — 三处选择 uv 缓存的位置，目前只有两处保持一致。`unsloth studio update` 路径已对齐。 [#10386](https://github.com/unslothai/unsloth/pull/10386)、[#10410](https://github.com/unslothai/unsloth/pull/10410)

## 5. 稳定性与回归

**未解决（尚待修复）**

- **Qwen3.5 9B 无法进入第一步；Gemma 4 26B-A4B 在 96 GB 上 batch size 为 1 时 OOM** — Cloud 环境，RTX Pro 6000。**高严重度**，因为 96 GB 机器无法运行 batch=1 的 QLoRA。 [#7203](https://github.com/unslothai/unsloth/issues/7203)
- **Studio 中的 Ollama 集成** — `source` 字段错误、模式（schema）崩溃、模型在正常 `~/.ollama` 目录下几乎总是无法出现在模型清单中。对桌面端用户而言属于**高严重度**。 [#9986](https://github.com/unslothai/unsloth/issues/9986)
- **代码完整性 / Smart App Control** — Studio 安装并启动后，`llama-server.exe` 被标记为"Bad Image"而遭拦截，直至关闭 Smart App Control 后恢复；重启后会再次出现。新增 PR 增加 Windows 探针与 CI 包签名审计。 [#10408](https://github.com/unslothai/unsloth/pull/10408)
- **torchcodec vs torch 2.11** — 在 `main` 上的全新 NVIDIA 安装会以与 torch 不匹配的 torchcodec 结束；现有兼容性防护保持静默。PR 覆盖 torch 2.11 并按 torch minor 版本进行固定。 [#7474](https://github.com/unslothai/unsloth/pull/7474)

**已关闭（修复已落地或暂存）**

- **push_to_ollama TypeError** — 以已移除的 `gguf_location` 关键字参数及缺失的必需参数调用了 `create_ollama_modelfile()`。PR #10304 对齐了签名。 [#10304](https://github.com/unslothai/unsloth/pull/10304)
- **Apple Silicon MLX 自愈进入 `--no-torch`** — 运行时会在 `--no-torch`（仅 GGUF）安装上重新安装 MLX。PR #10409 使 `--no-torch` 真正实现 torch-free。 [#10409](https://github.com/unslothai/unsloth/pull/10409)
- **DGX Spark "No GPU detected"** — 已关闭。 [#3553](https://github.com/unslothai/unsloth/issues/3553)
- **Qwen3-235B 训练 — Triton CPU-tensor 错误** — 已关闭。 [#4137](https://github.com/unslothai/unsloth/issues/4137)
- **Qwen3.5 packing → 梯度不稳定（第一步出现 NaN）** — 已关闭。 [#4160](https://github.com/unslothai/unsloth/issues/4160)
- **llama-cpp-python / Ollama 本地保存支持** — 已关闭。 [#3762](https://github.com/unslothai/unsloth/issues/3762)
- **打开菜单时 Studio UI 冻结** — 侧边栏、聊天行和项目菜单锁定了页面（滚动条跳跃，屏幕阅读器告知其余应用处于隐藏状态）。PR #10262 已修复。 [#10262](https://github.com/unslothai/unsloth/pull/10262)
- **Composer 发送/停止图标在非 Retina 屏幕上错位** — 已修复；移除偏移量，保留 flex 居中。 [#10407](https://github.com/unslothai/unsloth/pull/10407)（以及更早的变体 [#10405](https://github.com/unslothai/unsloth/pull/10405)）
- **Windows 安装器在纯 CPU 场景下失败** — 默认路径和 `--no-torch` 路径均在 `unsloth studio setup` 时崩溃。已关闭。 [#5008](https://github.com/unslothai/unsloth/issues/5008)
- **Docker 卷文档** — 已修正。 [#4396](https://github.com/unslothai/unsloth/issues/4396)
- **VLM 训练 `PY_SSIZE_T_CLEAN` inductor 错误** — 已关闭。 [#2230](https://github.com/unslothai/unsloth/issues/2230)
- **DeepSeek-OCR 本地加载失败** — 已关闭。 [#3670](https://github.com/unslothai/unsloth/issues/3670)
- **Nemotron 3 Nano LoRA 合并失败** — 已关闭。 [#3854](https://github.com/unslothai/unsloth/issues/3854)

## 6. 对应用开发者的意义

- **Studio 中的并发聊天体验即将改变。** 随着 KV 抢占的铺开，并行聊天将竞争同一个共享 KV 池，而非各自独占 `n_ctx`。请在你的 agent 中规划基于槽位的准入控制以及可见的抢占事件；如果你是基于 Studio 二次开发，可以预期 `--preempt-ram` 将在具备能力的 llama-server 构建上成为默认。
- **目标硬件正显著扩展。** 搭载 NVIDIA GPU 的 Windows on ARM 笔记本（GB10/N1X）和 DGX Spark 配对现已晋升为一等目标。如果你在边缘 ARM 上交付微调或本地推理产品，aarch64 容器讨论帖（[#4198](https://github.com/unslothai/unsloth/issues/4198)）值得持续关注。在 Strix Halo 上，优先选用 Vulkan 版 llama.cpp 构建。
- **Apple Silicon 用户：不要将 `--no-torch` 与 MLX 运行时自愈混用。** #10409 中的修复使安装能干净地遵守"仅 GGUF"承诺——若你此前曾遇到 MLX 莫名出现，请重新执行一次干净安装。
- **若干长期存在的训练 bug（Qwen3.5 packing、GptOssTopKRouter、Gemma3、Qwen3-235B）现已关闭。** 在假设你的临时方案仍属必要之前，请先在最新的 `unsloth` + `unsloth_zoo` 上重新测试；尤其是 Qwen3.5 packing 与 Qwen3-235B。
- **Ollama + Studio 路径仍不稳定**（[#9986](https://github.com/unslothai/unsloth/issues/9986)）。在 #10304 落地以及 schema/清单问题解决之前，请将本地 Ollama 模型清单视为尽力而为。
- **Windows + Smart App Control 是 `llama-server.exe` 的已知失败模式。** 在全新 Windows 安装上，你需要么关闭 Smart App Control，要么等待 #10408 中签名修复包的发布。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 摘要 — 2026-09-07

## 今日要点
项目今日动态集中：有一个未合并的 PR 修复一处 UX 缺陷——编辑既有 Claude Code 提供方时模型列表无法填充；另有两条新报告的问题暴露出可靠性方面的担忧——本地 `/v1/responses` 端点返回 502 Bad Gateway，以及因硬编码 5 秒配置接受超时导致的启动失败（该超时将父事件循环拥塞与子进程就绪状态混为一谈）。过去 24 小时内无新版本发布。

## 版本发布与破坏性变更
过去 24 小时内无新版本发布。

## 新增模型与硬件支持
本时间窗口内未宣布新的模型、架构或后端支持。

## 性能与优化
过去 24 小时内无性能或优化工作落地。然而 [#1761](https://github.com/musistudio/claude-code-router/issues/1761) 隐含地指出了一个延迟/响应性方面的问题：硬编码等待子网关接受运行时配置的 5000ms 本身就是一个与性能相关的代码坏味道（在异步启动路径上使用同步风格的超时，且无抖动/重试/退避机制）。

## 稳定性与回归
按可能的影响排序：

1. **[高] [#1761 — 高负载下网关启动失败](https://github.com/musistudio/claude-code-router/issues/1761)** — 在中等负载的主机上，3456 端口上的托管核心网关每次重启/启动都失败，而 3458 端口上的 Web/管理服务器则正常启动。根本原因是硬编码的 5 秒 `Core gateway did not accept runtime config within 5000ms` 检查——它在父事件循环拥塞时触发，而非在子进程真正不健康时触发。目前尚无修复 PR。对于在繁忙主机上运行托管网关的用户而言，这是一个系统性的可靠性问题。

2. **[中] [#1762 — `/v1/responses` 返回 502 Bad Gateway](https://github.com/musistudio/claude-code-router/issues/1762)** — `codex: unexpected status 502 Bad Gateway: Unknown error, url: http://127.0.0.1:3456/v1/responses`。很可能与 #1761 相关（上游网关不健康），但作为独立症状被报告。值得跟踪观察，看它是否会随网关启动问题一并解决，还是存在独立的路由/上游处理缺陷。目前尚无修复 PR。

3. **[低] [#1763 — 编辑提供方时模型列表为空](https://github.com/musistudio/claude-code-router/issues/1763)** *（修复进行中）* — 编辑既有 Claude Code（本地代理）提供方时，模型下拉框返回为空，尽管初次创建时填充正常。`diogomcd` 提交的修复 PR [#1763](https://github.com/musistudio/claude-code-router/pull/1763) 已开放，处理了编辑流程中两个合并在一起的缺陷。

## 对应用开发者的意义

- **不要依赖托管网关的 5 秒就绪窗口。** 如果你在负载较高的机器（CI runner、共享虚拟机、内存压力下的主机）上运行该路由器，预计会出现间歇性启动失败。在 [#1761](https://github.com/musistudio/claude-code-router/issues/1761) 解决之前，建议在自有监督进程（systemd/pm2）下将核心网关作为独立进程启动，而非依赖内嵌启动路径。
- **将 `/v1/responses` 的 502 视为网关健康信号。** 在调试下游 codex/提供方配置之前，请先确认 3456 端口上的核心网关确实在线且能接受配置——[#1762](https://github.com/musistudio/claude-code-router/issues/1762) 可能是 [#1761](https://github.com/musistudio/claude-code-router/issues/1761) 的症状，而非上游路由问题。
- **关注 PR [#1763](https://github.com/musistudio/claude-code-router/pull/1763) 合并后提供方编辑体验的改善。** 如果你目前因模型不重新加载而回避"编辑既有提供方"路径，该修复将消除这一变通做法。该问题由两个缺陷合并导致，因此评审者应确认两个问题都已处理后再采用。
- **今日无可升级版本** —— 暂时固定现有版本，待 #1761/#1762 解决后留意补丁版本发布，因为它们会影响核心启动可靠性。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>



</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-07

## 1. 今日要点

rc.34 版本带来一次全面的**账号安全重构**：统一登录与敏感操作校验流程、TOTP 与 Passkey 互为备份因子、完整的系统令牌生命周期（查看/轮换/撤销/审计），以及 Telegram 登录迁移至统一 OAuth 流程（需要在 BotFather 中由管理员重新配置）。此外，一个**严重的计费 Bug（#7229）**——图片令牌在缓存命中时被重复计费——已被上报，修复 PR（#7230）已准备就绪；针对长时间停滞的流式失败问题，按通道的 **TTFB 超时与自动回退机制（#7228）** 正在评审中。

## 2. 版本发布与破坏性变更

- **[v1.0.0-rc.34](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.34)** — 账号安全里程碑。
  - 统一登录与敏感操作校验流程。
  - TOTP 与 Passkey 互为备份因子。
  - 系统访问令牌支持查看/轮换/撤销与访问日志；引入独立的审计日志。
  - **破坏性变更**：Telegram 登录迁移至统一 OAuth。管理员必须在 BotFather 的 Login Widget 中注册 `/oauth/telegram`，并提供 Client ID/Secret。
  - 账号注销、绑定、修改密码、Passkey/2FA 启用、渠道密钥查看等操作，需要一次性、范围绑定的会话升级凭证，并与发起会话绑定。

## 3. 新增模型与硬件支持

- **GPT-6 Astra** — 按模型能力处理（PR [#7211](https://github.com/QuantumNous/new-api/pull/7211)，已合并）：显式 token 字段、`developer` 角色与采样规则；为 Astra 清除 `temperature`。后续 GPT 主要版本不再从 GPT-5 前缀推断。
- **Gemini 3.8 Flash** — rc.33 上的变体回归问题已关闭（[#7220](https://github.com/QuantumNous/new-api/issues/7220)）。
- **GPT-5.2 / `openai/gpt-5.2`** — 中转 Bug（`role:system` 被强制改写为 `role:developer`，导致上游报错）在 [#2542](https://github.com/QuantumNous/new-api/issues/2542) 中上报，现已关闭。

本周期内无新增硬件后端（CUDA/ROCm/Metal/CPU）或量化格式。

## 4. 性能与优化

- **`RawMessage` 深拷贝批处理**（PR [#7221](https://github.com/QuantumNous/new-api/pull/7221)，已合并）：降低 Responses 路径上的单请求分配成本；落地由仓库所有者拆分为后续 commit。
- **按通道 TTFB 超时 + 自动回退**（PR [#7228](https://github.com/QuantumNous/new-api/pull/7228)，未合并）：当上游已发送响应头但首字节前停滞时，请求将故障转移而非等待更长的整体流式超时——针对尾延迟隐患而非原始吞吐。
- **渠道缓存 / 能力对齐**（PR [#6997](https://github.com/QuantumNous/new-api/pull/6997)，已合并）：将内存中的渠道索引与 `Ability.enabled` 语义统一；当单个分组/模型能力被禁用时，消除分歧的渠道选择路径。
- **活跃渠道探测开关 + 限流优化**（PR [#7161](https://github.com/QuantumNous/new-api/pull/7161)，未合并）：允许运维关闭后台探测并调节探测流量。

## 5. 稳定性与回归

按严重性排序：

| 严重性 | Issue | 状态 | 说明 |
|---|---|---|---|
| 🔴 严重 | [#7229](https://github.com/QuantumNous/new-api/issues/7229) — rc.30 上图片缓存命中**重复计费**图片令牌 | OPEN | PR [#7230](https://github.com/QuantumNous/new-api/pull/7230) 已提供修复（`calculateTextQuotaSummary` 在应用图片档位费率前先扣除已缓存的图片令牌）。建议在合并前暂缓对账。 |
| 🟠 高 | [#7231](https://github.com/QuantumNous/new-api/issues/7231) — 非流式请求：客户端超时**不会中止上游**，且断连后配额仍被扣除（rc.25） | OPEN | 尚无修复 PR。属于复合失败场景，在补丁发布前，瞬时客户端断连可视为预期损耗。 |
| 🟡 中 | [#2542](https://github.com/QuantumTous/new-api/issues/2542) — GPT-5.2 请求：`role:system` 被强制改写为 `role:developer`，上游返回 4xx | CLOSED | 上游已修复；rc.34 血统。 |
| 🟡 中 | [#7215](https://github.com/QuantumNous/new-api/issues/7215) — Anthropic 格式的 `thinking` 等级未映射到上游 `reasoning_effort` | CLOSED | 已解决。 |
| 🟢 低 | [#7220](https://github.com/QuantumNous/new-api/issues/7220) — Gemini 3.8 Flash 变体在 rc.33 回归（作为早期报告的重复项关闭） | CLOSED | |
| 🟢 低 | [#7225](https://github.com/QuantumNous/new-api/issues/7225)、[#7224](https://github.com/QuantumNous/new-api/issues/7224) — `settleTestQuota` 分组倍率 / `ParseContent()` 丢失 `cache_control` | CLOSED（无效） | 报告者使用 rc.32；在受支持版本上无法复现。 |
| ⚪ 无效 | [#7232](https://github.com/QuantumNous/new-api/issues/7232) — 上游媒体 URL 改写功能请求 | CLOSED | 由 AI 编程 Agent 在未经事先同意的情况下提交；已转为 PR [#7233](https://github.com/QuantumNous/new-api/pull/7233) 待评审。 |

两个 PR 在实质上关闭了今日上报的回归：针对计费 Bug 的 [#7230](https://github.com/QuantumNous/new-api/pull/7230)，以及针对 GPT-5.2/GPT-6 Astra 能力映射的 [#7211](https://github.com/QuantumNous/new-api/pull/7211)。

## 6. 对应用开发者的影响

- **如果你使用 Telegram 登录**，请安排维护窗口：管理员必须创建一个 Telegram Login Widget（`/setdomain`/Login Widget），将其配置为 `/oauth/telegram`，并将得到的 Client ID/Secret 填入 New API 管理后台，否则 rc.34+ 上 Telegram 登录将失效。
- **如果你仍在 rc.30 或更早版本并处理图片工作负载**，请审计计费日志中缓存命中的图片请求——#7229 会对这些请求超额计费。PR #7230 是定向修复；若无法立即升级，可 cherry-pick，但需预期后续的配额修正。
- **如果你构建在 OpenAI 上游上推理的 Anthropic 格式 Agent**，`thinking` 预算等级现已可靠地翻译为 `reasoning_effort`——可以去掉客户端的 effort 重映射逻辑。
- **如果你依赖稳定的流式延迟**，#7228（合并后）允许你按通道调优 TTFB，而不再依赖全局流式超时；对救援/回退架构尤为有用。
- **运维 UI**：PR [#5396](https://github.com/QuantumNous/new-api/pull/5396) 将聊天导出与 CC Switch 提升为一级行内按钮——客户端接入更便捷，客服负载更低。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*