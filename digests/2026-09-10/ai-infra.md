# AI 基础设施日报 2026-09-10

> 生成时间: 2026-09-10 11:30 UTC | 覆盖项目: 9 个

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

# 跨项目基础设施报告 — 2026-09-10

## 1. 生态概览

推理引擎双寡头（vLLM、SGLang）围绕三个相同的战场展开正面交锋——Blackwell 原生算子、基于 IPC 的权重缓存、PD 解耦/多 rank 服务——且在同一个 24 小时窗口内双双交付了几乎一致的冷启动守护进程。llama.cpp 延续其"芯片广度"策略（Hexagon、MetaX、s390x、Vulkan-on-PowerVR），而非数据中心深度；Ollama 在其上叠加 UX 与 API 兼容语义，并承接上游解析器的回归问题。网关/控制面层级（LiteLLM、New API、CC Switch、Claude Code Router）的主要矛盾集中在计费完整性与工具调用协议 bug 上，而非性能优化。跨所有层级，主要风险类别已从崩溃转向**静默正确性失败**——随机 token、零向量 embedding、非确定性贪心解码、被截断的工具调用 JSON。

## 2. 活跃度对比

| Project | Issues (referenced)* | PRs (referenced)* | Release status | Dominant theme |
|---|---|---|---|---|
| **vLLM** | ~26 | ~20 | 无版本发布（0.29.x 系列） | Blackwell 算子；GLM-5.3/Qwen3.8-Flash-Next 正确性告警 |
| **SGLang** | ~22 | ~13 | 无版本发布 | Weight Cache Daemon；统一缓存；NVFP4 回归 |
| **llama.cpp** | ~15 | ~22（已合入 11 commit） | 滚动发布（b10878–b10891） | Vulkan 强化；持久化磁盘缓存；新后端 |
| **Ollama** | ~16 | ~17 | 无版本发布（PR 排队等下一个 tag） | Gemma4 解析器 bug；CVE 积压 |
| **LiteLLM** | ~17 | ~13 | **v1.101.0-rc.2**（cosign 签名） | 消费追踪正确性；Claude Code 路径 |
| **Unsloth** | ~18 | ~13 | **v0.1.808-beta** | Studio 基础设施；diffusion/ROCm 性能 |
| **Claude Code Router** | 3 | 7 | **v3.1.0** | 配置恢复与工具匹配修复 |
| **CC Switch** | ~20 | ~17 | 无版本发布（3.20.x） | Codex/macOS 路由；会话管理 |
| **New API** | 新增 17（8 条已关闭为无效） | ~6 | 无版本发布（rc.36） | 计费/日志正确性；工具调用流式 |

\* 计数为各 24 小时摘要中出现的独立 issue/PR 数量，非 GitHub 查询结果。显著的量信号：vLLM 的批不变线程（#27433）收获 90 条评论；SGLang 的 CUDA coredump 跟踪帖（#26340）**24 小时内累计 296 条评论**；New API 的无效 issue 比率（约 47%）表明存在 AI 智能体生成的刷报告行为。

## 3. 模型支持竞速

| 模型家族 | vLLM | SGLang | llama.cpp | Ollama | 网关 |
|---|---|---|---|---|---|
| **DeepSeek V4 / V4.1 (+Flash)** | ✅ Mega-mHC DeepGEMM，mHC warmup | ✅ AMD 上统一 KV，FP4 Mooncake linker | ✅ V4.1 转换 PR（#28696） | ❌ 云端请求开放中（#18178） | ⚠️ LiteLLM 定价陈旧（#37255）；CC Switch 新增 DeepSeek Harness |
| **Qwen3.8-Flash-Next** | ⚠️ FP8 KV RFC（KV 池约 2×）；贪心非确定性未关闭 | ⚠️ H20×8 启动失败 | ✅ SYCL top_k k=2048，Arc FILL 修复 | — | CC Switch 发布 DashScope 预设 |
| **GLM-5.3 / 5.2** | ⚠️ 多个严重 bug；去 JIT 化进行中 | ⚠️ NVFP4+EAGLE 崩溃 |

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-10

## 1. 今日要点

主干在新一代模型家族上依旧活跃：GLM-5.3 Flash 持续暴露加载、注意力架构以及 ROCm 稀疏方面的 bug([#56007](https://github.com/vllm-project/vllm/issues/56007)、[#54062](https://github.com/vllm-project/vllm/issues/54062)、[#54300](https://github.com/vllm-project/vllm/issues/54300)、[#54451](https://github.com/vllm-project/vllm/issues/54451)),而 Qwen3.8-Flash-Next 则暴露出贪心解码中 `persistent_topk` 的非确定性问题，以及 `tool_choice="required"` 上的结构化输出回归([#54521](https://github.com/vllm-project/vllm/issues/54521)、[#55552](https://github.com/vllm-project/vllm/issues/55552))。在 kernel 方面，项目正在推进 Blackwell 原生优化：来自 DeepGEMM 的 Mega-mHC 正在为 DSv4.1 集成([#56255](https://github.com/vllm-project/vllm/pull/56255)),有人提议引入 CUTLASS Lamport GEMM+AllReduce([#55261](https://github.com/vllm-project/vllm/issues/55261)),Fast-Start 守护进程间权重缓存也已落地([#56047](https://github.com/vllm-project/vllm/pull/56047))。批不变(batch-invariant)模式持续加固，Mamba2 也加入了 prefill/decode 一致性行列([#55627](https://github.com/vllm-project/vllm/pull/55627))。

## 2. 版本发布与破坏性变更

过去 24 小时内没有发布新版本。继水印 RFC([#53916](https://github.com/vllm-project/vllm/issues/53916))与实现 PR([#54053](https://github.com/vllm-project/vllm/pull/54053))之后，新开了一个水印加固(兼容性 + 质量/性能回归监控)的跟踪 issue——参见 [#56105](https://github.com/vllm-project/vllm/issues/56105)。

## 3. 新模型与硬件支持

- **DeepSeek V4 / DSv4.1**:已集成来自 DeepGEMM 的 Mega-mHC;Dockerfile 中新增 ELF 工具([#56255](https://github.com/vllm-project/vllm/pull/56255))。注意：在 `nv_dev` rebase 到 main 之前，暂时取消 sm_120 支持。
- **DeepSeek V4 NVIDIA 路径**：修复 `DeepseekV4DecoderLayer` 的 mHC 预热(识别 NVIDIA 路径，使用真实的 attention 与 FFN norm 参数预热 TileLang pre/fused-post/pre/post)([#51802](https://github.com/vllm-project/vllm/pull/51802))。
- **Nemotron VL**:仅语言模型组件支持 LoRA —— 此前会抛出 `ValueError: NemotronH_Nano_VL_V2 does not support LoRA yet`([#56231](https://github.com/vllm-project/vllm/pull/56231))。
- **Qwen3.8-Flash-Next(FP8)在 QSA 路径上的 KV cache**:附带可用补丁的 RFC,提议通过 Triton 读取侧接线实现 fp8_e4m3 KV cache;报告称单张 GB10 上 KV 池约扩大至 2 倍([#54426](https://github.com/vllm-project/vllm/issues/54426))。
- **Cohere ASR**:通过 `torch.baddbmm` 实现融合的相对注意力 content-score 累加([#55190](https://github.com/vllm-project/vllm/pull/55190))。
- **Mamba2**:在 `VLLM_BATCH_INVARIANT=1` 下 prefill/chunked-prefill/decode 逐位一致([#55627](https://github.com/vllm-project/vllm/pull/55627))。
- **GLM-5.3 / GLM5.2 / GLM5Next**:MRV2 上的去 JIT 化持续推进([#55348](https://github.com/vllm-project/vllm/pull/55348))。
- **ROCm 上的 Kimi-K3**:集成 AITER KDA prefill(BF16 融合 QKV Conv1D + FlashKDA,保留 Triton 回退路径)([#56036](https://github.com/vllm-project/vllm/pull/56036))。
- **ROCm 上的 GLM-5.3-Flash / DeepSeek V4**:由 `VLLM_ROCM_DSV4_CSA_MULTI_STREAM` 门控的 CSA 多流重叠(默认关闭)([#51794](https://github.com/vllm-project/vllm/pull/51794))。
- **FlashInfer SM120 稀疏 MLA**:现在会显式拒绝 NoPE head size(如 GLM-5.3-Flash 的 `qk_rope_head_dim=0`),将 head size 限制为 576([#55778](https://github.com/vllm-project/vllm/pull/55778))。
- **Ling3 解析器**：非流式模式下，闭合的 reasoning 块现在以 `reasoning` 返回，与流式及 `glm47` 的行为保持一致([#55972](https://github.com/vllm-project/vllm/pull/55972))。

## 4. 性能与优化

- **批不变模式** —— 今日评论量最高的功能跟踪 issue(90 条评论)，目标是按照 Thinking Machines 的方案实现确定性推理([#27433](https://github.com/vllm-project/vllm/issues/27433))。Mamba2 层是最新落地 prefill/decode 逐位一致的成果([#55627](https://github.com/vllm-project/vllm/pull/55627))。
- **CUTLASS Lamport 融合 GEMM + AllReduce(SM100/Blackwell)** —— 提议对新的 CUTLASS kernel 进行基准测试并集成进 vLLM 现有的 GEMM-Reduction 路径([#55261](https://github.com/vllm-project/vllm/issues/55261))。
- **EAGLE/MTP 前缀缓存丢弃最后一个 block** —— 实测**在 Qwen3.8 混合 GDN 布局上每次命中需重算 1,648 个 token**,在启用投机解码且复用前缀的负载上**损失约 30–40% 的 batch 吞吐**([#53670](https://github.com/vllm-project/vllm/issues/53670))。
- **RTX PRO 6000 Blackwell 上的 Qwen3.6-35B-A3B-FP8** —— 解码吞吐远低于预期；缺少 E=256,N=256 的 FP8 MoE 配置([#44688](https://github.com/vllm-project/vllm/issues/44688))。
- **SM90 blockwise FP8 CUTLASS** —— bug 修复：当 `cutlass_scaled_mm` 接收到对齐/填充过的 tensor 视图时，调用方现在会遵循 leading strides,避免读错行/填充写入([#56248](https://github.com/vllm-project/vllm/pull/56248))。
- **ROCm 稀疏 prefill MQA logits** —— 通过向 AITER 传入 `clean_logits=False` 移除冗余的 `-inf` 填充；每个 logits kernel 节省一次 FP32 填充([#51314](https://github.com/vllm-project/vllm/pull/51314))。
- **ROCm indexer fp8 cache dtype** —— 改为在 import 时解析一次，而非每层每次前向调用都解析([#53792](https://github.com/vllm-project/vllm/pull/53792))。
- **Fast-Start 守护进程间** —— 将已加载/已量化/已按 TP 切分的权重保留在 GPU 显存中，使后续的 vLLM 引擎可通过 CUDA IPC 启动，无需重新读取 checkpoint([#56047](https://github.com/vllm-project/vllm/pull/56047))。
- **torch.compile 去函数化** —— 在替换 `auto_functionalized` 节点时保留 `control_deps` 的顺序边，打通 FX 编译路径([#56213](https://github.com/vllm-project/vllm/pull/56213))。

## 5. 稳定性与回归

**严重程度：严重(正确性)**
- **GLM-5.3(GlmMoeDsa)+ decode-context-parallel** —— 在 0.28.0 上崩溃，在 0.29.0 上静默返回随机 token(相对 0.27 的回归)([#54300](https://github.com/vllm-project/vllm/issues/54300))。尚无修复 PR。
- **Qwen3.8-Flash-Next FP8 贪心解码非确定性** —— 当上下文超出 `indexer_budget`(QSA 从 dense 切换为 top-k)时，`temperature=0` 下五个字节级相同的请求返回五个不同的补全结果([#54521](https://github.com/vllm-project/vllm/issues/54521))。根因定位到 prefill 中的 `persistent_topk`。尚无修复 PR。
- 在 B300/SM103 上，当大量值落在同一个粗粒度直方图桶中时，**`persistent_topk` 会静默丢弃 top-k 候选**([#51782](https://github.com/vllm-project/vllm/issues/51782))。尚无修复 PR。

**严重程度：高(崩溃/启动)**
- **GLM-5.3-Flash 加载 checkpoint** —— v0.29.0 上使用 TP2/EP2 时，`multiproc_executor.py` 报 `WorkerProc failed to start`([#56007](https://github.com/vllm-project/vllm/issues/56007),已关闭)。信息流中未见关联的修复 PR。
- **0.28.0 / 0.29.0 宿主内存爆涨** —— 启动时耗尽全部宿主内存并卡死；0.27.1 上正常([#54237](https://github.com/vllm-project/vllm/issues/54237))。尚无修复 PR。
- **GLM5Next 不支持 `Glm5NextTextLinearAttention`** —— nightly 安装版启动时报错([#54062](https://github.com/vllm-project/vllm/issues/54062))。尚无修复 PR。
- 在 4×H200 上，当 `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True` 且 DP>1 且 TP>1 时，**`custom_all_reduce` IPC 句柄失败**(`cudaIpcGetMemHandle: invalid argument`)([#42609](https://github.com/vllm-project/vllm/issues/42609))。尚无修复 PR。
- **MTP 投机 + 完整 CUDA graph 捕获** —— 将 `num_speculative_tokens_per_batch_size` 与 MTP drafter、FP8 KV cache 组合使用时，在 `InputBatch.make_dummy` 断言处失败([#48494](https://github.com/vllm-project/vllm/issues/48494))。尚无修复 PR。
- **`expandable_segments` + LM-head LoRA + batch 分片采样** —— 对带 `compute_logits_local` 的模型(llama、qwen3_5、deepseek_v4-nvidia)启动即崩溃。修复见 [#56074](https://github.com/vllm-project/vllm/pull/56074)(启动时拒绝该组合)。

**严重程度：高(正确性/功能)**
- **MTP 投机解码下 thinking-token 预算未被强制执行** —— 该功能于 #20859 引入，在 Qwen3.5-35B-A3B-FP8 + B300 上开启 MTP 时失效(不开 MTP 则正常)([#39573](https://github.com/vllm-project/vllm/issues/39573),已关闭)。未关联修复 PR。
- 当 `enable_thinking=false` 时，**Qwen3.8-Flash-Next 未强制执行 `tool_choice="required"`**;开启 thinking + MTP 时出现 xgrammar "Failed to advance FSM"([#55552](https://github.com/vllm-project/vllm/issues/55552),已关闭)。未关联修复 PR。
- **PP>1 + 异步调度 + 结构化输出**返回 HTTP 500 / "Failed to advance FSM"([#56250](https://github.com/vllm-project/vllm/pull/56250) 修复了 MRV1;MRV2 路径可能需要后续跟进)。
- **`response_format` + `tool_choice=auto`** —— 修复方式是丢弃 `response_format` 约束以优先满足工具调用([#56086](https://github.com/vllm-project/vllm/pull/56086))。

**严重程度：中(硬件/平台)**
- **aarch64 / DGX Spark 上的 sm_121(Blackwell)** —— 不支持([#36821](https://github.com/vllm-project/vllm/issues/36821))。尚无修复 PR。
- **Turing(SM 7.5)上的 Gemma4** —— 所有 attention 后端都超出共享内存限制([#38918](https://github.com/vllm-project/vllm/issues/38918))。尚无修复 PR。
- Triton 中 **Tesla T4 共享内存溢出**(81920 > 65536)([#36802](https://github.com/vllm-project/vllm/issues/36802))。尚无修复 PR。
- **ROCm 安装在 Python < 3.12 时静默回退到 CUDA abi3 wheel** —— 缺少 ROCm abi3 / cp311 / cp313 wheel([#44660](https://github.com/vllm-project/vllm/issues/44660))。尚无修复 PR。
- **`chunk_gated_delta_rule` 的 Triton 编译在 MI210/gfx90a 上失败**(使用 `num_stages=4` 时)([#44973](https://github.com/vllm-project/vllm/issues/44973))。尚无修复 PR。
- **GLM-5.3-Flash / ROCm 上的 DFlash** —— 目标模型缺少 `SupportsEagle3`,且 `ROCM_AITER_MLA_SPARSE` 没有非因果路径([#54451](https://github.com/vllm-project/vllm/issues/54451))。尚无修复 PR。

**已关闭但仍持续关注**：AMD Q3 2026 开发路线图([#44091](https://github.com/vllm-project/vllm/issues/44091))、AMD 测试问题([#44092](https://github.com/vllm-project/vllm/issues/44092))、`cp38-abi3` wheel 附带 `cp312` 绑定([#41487](https://github.com/vllm-project/vllm/issues/41487))、多模态帧列表解析器误分类([#55326](https://github.com/vllm-project/vllm/pull/55326))。

## 6. 对应用开发者意味着什么

- **将 GLM-5.3 Flash 固定在 0.27.x,或谨慎停留在 nightly。**`GlmMoeDsa` 在 0.28 → 0.29 之间的回归窗口非常严重——静默输出随机 token 比崩溃更糟。上线任何 0.28+/0.29+ 部署之前，请先在已知负载上用确定性采样进行验证。
- **长上下文下不要信任 Qwen3.8-Flash-Next 的贪心解码。**如果你依赖 temperature=0 的可复现性(缓存、评测、重放)，在 #54521 / #51782 的修复落地之前，需要对 `persistent_topk` 路径采取缓解措施。
- **避开致命组合:`expandable_segments=True` + DP>1 + TP>1。**Worker 会因 `cudaIpcGetMemHandle` 而初始化失败。要么去掉该分配器标志，要么改跑纯 TP 或纯 DP。
- **MTP 投机解码目前很脆弱。**今天就有三个独立问题——thinking 预算的强制执行、`num_speculative_tokens_per_batch_size` 相关的 CUDA-graph 捕获，以及 1,648 token 的前缀缓存重算——分别影响不同的技术栈。如果你在 Qwen3.5/Qwen3.8 混合 GDN 上依赖 MTP,请仔细做基准测试，并考虑对正确性敏感的流量关闭 MTP。
- **结构化输出 + 工具调用的约束槽位是"单租户"的。**新行为(`#56086`)会让 `tool_choice` 优先于 `response_format`。如果你的客户端两者都发，请为约束被丢弃做好预案。
- **PP>1 + 异步调度 + 结构化输出目前在 MRV1 上是坏的**，但已在 #56250 修复；如果你在 MRV2 上，请关注后续动态。遇到 HTTP 500 / "Failed to advance FSM" 的现有调用方，可以先迁离 MRV1 作为临时解决办法。
- **LoRA + batch 分片采样现在会在启动时被拒绝**(而不是在采样中途崩溃)——请调整启动器，不要对 `llama`、`qwen3_5`、`deepseek_v4-nvidia` 或 `minimax_m3-nvidia` 同时启用两者。
- **Waterm

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-10

## 今日要点
- **快速引擎恢复落地第一阶段。** 新增的 per-rank 权重缓存守护进程（Weight Cache Daemon）通过 CUDA IPC 提供后量化权重，将 Qwen3-235B FP8 的权重加载时间从 306–327s 缩短至 1s 以内（[#33522](https://github.com/sgl-project/sglang/issues/33522)）。这是大型模型冷启动方面最重要的运营改进。
- **统一缓存（Unified Cache）系列持续交付。** 第二波 PR 将统一 radix 缓存扩展至 AMD、推测解码（MTP/EAGLE/DSpark）KV 缓存、NPU mRoPE 以及 Rust TreeCore 外部链接器（[#38269](https://github.com/sgl-project/sglang/pull/38269)、[#37914](https://github.com/sgl-project/sglang/pull/37914)、[#36959](https://github.com/sgl-project/sglang/pull/36959)、[#38862](https://github.com/sgl-project/sglang/pull/38862)）。
- **多起 Blackwell/NVFP4 回归浮出水面。** 一项 `tiny_gemm` 替换使 DeepSeek-R1 在 B200/B300 上的 NVFP4 decode 性能下降约 4%，一个 CUDA coredump 跟踪 issue 在 24 小时内积累了 296 条 CI 信号评论（[#38628](https://github.com/sgl-project/sglang/issues/38628)、[#26340](https://github.com/sgl-project/sglang/issues/26340)）。

## 发布与破坏性变更
过去 24 小时内无新发布。需注意期内关闭了两项弃用 RFC —— 非 Marlin 的 GPTQ 内核 + Dual Chunk FA 后端（[#32112](https://github.com/sgl-project/sglang/issues/32112)）以及 CUTLASS MLA attention（[#32111](https://github.com/sgl-project/sglang/issues/32111)）—— 两项均意在简化量化/attention 后端的接口面。

## 新增模型与硬件支持
- **SenseNova-U1 / U1.5** —— 针对 OpenSenseNova 参考仓库开启专属跟踪 issue（[#37742](https://github.com/sgl-project/sglang/issues/37742)）。
- **Qwen3.5 MTP 部分 MXFP4** —— 混合 MTP-expert 精度的 Quark checkpoint 现可正常加载（[#38870](https://github.com/sgl-project/sglang/pull/38870)）。
- **DeepSeek-V4 AMD 上的统一 KV** —— UMBP 与 Mooncake 直连外部链接器扩展以适配 DS-V4 的 FP4 payload/scale 布局（[#38269](https://github.com/sgl-project/sglang/pull/38269)）。
- **MiMo-V2.5-Pro（mxfp4）在 Ascend NPU 上** —— 完整 DFlash 推测解码链路：mxfp4 专家权重加载、NPU graph replay、DP attention、PD disaggregation（[#37565](https://github.com/sgl-project/sglang/pull/37565)）。
- **NPU HiCache L2 + L3** —— L2 路径使用 Memfabric `acc_offload`（[#38826](https://github.com/sgl-project/sglang/pull/38826)），并新增 Ascend Memcache L3 后端（[#38827](https://github.com/sgl-project/sglang/pull/38827)）。
- **NPU mRoPE** —— `npu_mrope` 复用统一 radix 缓存，取代 CPU fallback（[#36959](https://github.com/sgl-project/sglang/pull/36959)）。
- **NCCL 2.30 路线图** —— 明确计划引入 NCCL EP、跨组 M-to-N 传输、zero-SM 单边操作、RAS 监控以及通信器 checkpoint（[#32774](https://github.com/sgl-project/sglang/issues/32774)）。

## 性能与优化
- **Weight Cache Daemon（第一阶段，已合并）** —— 通过 per-rank IPC 提供后量化缓存，Qwen3-235B FP8 权重重载从约 5 分钟降至 1s 以内（[#33522](https://github.com/sgl-project/sglang/issues/33522)）。这是数据集中最大的单次冷启动改进。
- **MiniMax-M3 decode 路径优化** —— 通过分页 128-token tile 实现稀疏 decode K/V 加载，并加入一个小型 GEMM 用于 router projection，均在 GB300 sm_103 / TP4 NVFP4 上验证（[#38841](https://github.com/sgl-project/sglang/pull/38841)）。完整 kernel 数值待 CI，但独立 kernel 数据显示 GEMM 单独跑更快。
- **DSA fused top-k 修复** —— 修复 overflow bin 边界情形，确保在阈值 bin 超过 tie-count 上限时 fused top-k 仍保持精确（[#37941](https://github.com/sgl-project/sglang/pull/37941)）。
- **Router GEMM 统一 RFC** —— 提议将 `dsv3_router_gemm` 等算子折叠到一个具备确定性精度的 gate 层之后（[#38695](https://github.com/sgl-project/sglang/issues/38695)）。
- **Host duplicate reclaim 一致性** —— Rust TreeCore 现已遵循 `SGLANG_HICACHE_SKIP_HOST_DUPLICATE_RECLAIM`，使 host-DRAM 淘汰行为与 Python TreeCore 保持一致（[#38862](https://github.com/sgl-project/sglang/pull/38862)）。
- **AMD CI 整合** —— 停用 ROCm 7.0 workflow，所有支持的 ROCm 版本统一走单一 PR/Nightly 流水线（[#38632](https://github.com/sgl-project/sglang/pull/38632)）。

## 稳定性与回归
按可能的爆炸半径排序；最新且未修复的居前。

1. **`tiny_gemm` 替换使 DeepSeek-R1 NVFP4 decode 在 Blackwell 上回归约 4%** —— PR #34693 的统一 GEMM 路径尽管独立 kernel 更快，却拖累了 decode 吞吐（[#38628](https://github.com/sgl-project/sglang/issues/38628)）。尚未关联修复 PR。
2. **DCP + PD-disagg decode 收缩（retraction）触发 CUDA device-side assert** —— DCP>1 的 decode 服务器上 `retract_decode` → `get_cpu_copy` 索引不匹配（[#38645](https://github.com/sgl-project/sglang/issues/38645)）。Open，暂无修复 PR。
3. **Kimi-K3 严格工具调用语法** —— `additionalProperties` schema 在 xgrammar 下稀释具名属性的类型约束，允许畸形参数通过（[#38587](https://github.com/sgl-project/sglang/issues/38587)）。Open，暂无修复 PR。
4. **H20 ×8 无法启动 Qwen3.8-Flash-Next-FP8** —— 当日新报的启动失败（[#38793](https://github.com/sgl-project/sglang/issues/38793)）。
5. **GLM-5.2 NVFP4 + EAGLE 非法内存访问** —— `flashinfer_trtllm` bf16 batched-GEMM 作用于 nextn draft MoE；自 #30137 起 Triton nextn 被 HIP gating，规避空间收窄（[#30209](https://github.com/sgl-project/sglang/issues/30209)）。Open。
6. **DeepSeek-V4-Flash 并发下渐进式输出损坏** —— 2×H200 配合 DP attention 出现确定性偏移（[#33397](https://github.com/sgl-project/sglang/issues/33397)）。
7. **Kimi K3 decode 崩溃：DSPARK + DCP** —— `dcp/planner.py` 中 `cumsum(extend_prefix_lens=None)` 触发 `TypeError`（[#34920](https://github.com/sgl-project/sglang/issues/34920)）。
8. **Mamba radix cache 将新 prefill 命中降为 0 命中** —— `MambaRadixCache` 中 split-eviction 与 lookup-intent 不一致（[#22935](https://github.com/sgl-project/sglang/issues/22935)）。
9. **post-plan padding 后 attention metadata 不一致** —— 新开的正确性问题（[#38580](https://github.com/sgl-project/sglang/issues/38580)）。
10. **期内关闭（值得注意）：** HiRadixCache `writing_check` TP 死锁（[#28429](https://github.com/sgl-project/sglang/issues/28429)）、#33871 后 Kimi-K3 多节点 MegaMoE CUDA-graph 死锁（[#37561](https://github.com/sgl-project/sglang/issues/37561)）、BF16 RL `update_weights_from_tensor` shape 不匹配（[#27787](https://github.com/sgl-project/sglang/issues/27787)）、空 SSE chunk 击穿 AI SDK provider（[#29441](https://github.com/sgl-project/sglang/issues/29441)）、Qwen3.5-9B 运行时 LoRA 工具调用被吞（[#30744](https://github.com/sgl-project/sglang/issues/30744)）。

CUDA coredump 跟踪 issue（[#26340](https://github.com/sgl-project/sglang/issues/26340)）是当日最大的基础设施信号 —— 296 条自动收集的评论，提示 Blackwell 上近期 PR 整体存在广泛不稳定性。

## 对应用开发者意味着什么
- **大型 MoE 的冷启动成本大幅下降。** 如果你重启引擎、重载量化权重或做自动扩缩，Weight Cache Daemon 可让约 5 分钟的重载消失。请围绕 per-rank IPC 而非文件系统权重重载做规划。
- **Kimi-K3 严格模式下工具调用语法仍有隐患。** 在 #38587 修复之前，请将 Kimi-K3 上的严格工具 schema 视为尽力而为；可考虑放宽 `additionalProperties` 或在 agent 层降级为非严格解析。
- **PD-disaggregation + DCP > 1 存在已知崩溃路径** —— 收缩（#38645）和 DSPARK verify（#34920）均会失败。如果你运营 DCP 的 decoder，请固定为单 rank 或停留在上一条 SGLang 线上，直至两者关闭。
- **Blackwell 上 DeepSeek-R1 NVFP4 decode 当前比上一版 kernel 慢约 4%。** 如果你今天在做基准测试，请锁定早于 PR #34693 的版本，或准备好在非回退修复落地时回滚。
- **统一缓存正在弥合 AMD、NPU 与 CUDA 之间的差距。** 如果你当前按后端分片缓存逻辑，预计很快会出现单一外部链接器 API —— 在锁定后端专属胶水代码之前值得跟踪[统一缓存系列](https://github.com/sgl-project/sglang/pull/37914)。
- **NPU 正成为一等公民目标。** Memfabric 加持的 L2、Ascend Memcache L3、原生 mRoPE，以及 MiMo 上的 DFlash 意味着 Ascend 部署不再是“先发 CUDA、事后移植”的故事 —— 但相比 CUDA 路径仍会更粗糙。
- **CI 当前处于噪声期**（参考 #17050：7 个 broken、20 个 flaky、964 个最近 fixed）。请将前沿 `main` 视为移动靶点；生产环境固定到近期打了 tag 的发布版。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 简报 — 2026-09-10

## 1. 今日要点

过去 24 小时的发布节奏以 **Vulkan 加固** 为主（b10878–b10891 之间合入 10+ PR），包括 PowerVR 编译器变通方案、Intel Arc A770 FILL 调度修复、用于性能分析器的 command-buffer 调试标签，以及基于 spec-constant 的 mul_mm。**服务端** 方面，一个长期悬而未决的持久化 prompt 缓存增强请求（`--cache-disk`，#20697）终于迎来了可用的 PR（#28092）。此外，两项 **正确性/安全性** 服务端 Bug 也引发关注：跨请求 LoRA 污染的 KV 缓存（#26207）以及格式错误的工具调用 JSON 返回 HTTP 500 而非 4xx（#25510）。

## 2. 发布与破坏性变更

今日向 `master` 推送了 11 个 commit，其中最值得关注的已交付修复如下：

- **b10891** — [vulkan: fall back to shared-memory reduction for dmmv on PowerVR](https://github.com/ggml-org/llama.cpp/commit/b10891)（[#28341](https://github.com/ggml-org/llama.cpp/pull/28341)）。解决了 Imagination 自有编译器上的 `vkCreateComputePipelines` 失败问题。
- **b10889** — [memory: avoid allocating V cache for indexer (it's not used)](https://github.com/ggml-org/llama.cpp/commit/b10889)（[#28330](https://github.com/ggml-org/llama.cpp/pull/28330)）。关闭 [#28296](https://github.com/ggml-org/llama.cpp/issues/28296)。为 DSA/Lightning-Indexer 层释放多余的 V-cache 切片。
- **b10888** — [vulkan: command-buffer debug labels for GPU profilers](https://github.com/ggml-org/llama.cpp/commit/b10888)（[#28101](https://github.com/ggml-org/llama.cpp/pull/28101)）。
- **b10887 / b10886** — s390x CPU 后端：Q4_0 repack 与 Q1_0 向量 intrinsic 支持（[#28667](https://github.com/ggml-org/llama.cpp/pull/28667)，[#28606](https://github.com/ggml-org/llama.cpp/pull/28606)）。
- **b10885** — [model: fix all granite family parameter counts](https://github.com/ggml-org/llama.cpp/commit/b10885)（[#28643](https://github.com/ggml-org/llama.cpp/pull/28643)）。修复 Granite 系列转换的正确性。
- **b10883** — [vulkan: spec constant for mul_mm A-type](https://github.com/ggml-org/llama.cpp/commit/b10883)（[#25773](https://github.com/ggml-org/llama.cpp/pull/25773)）。
- **b10881** — [vulkan: 2D workgroup distribution for FILL](https://github.com/ggml-org/llama.cpp/commit/b10881)（[#28592](https://github.com/ggml-org/llama.cpp/pull/28592)）。关闭了 [#28247](https://github.com/ggml-org/llama.cpp/issues/28247) 中 Intel Arc A770 上的 `maxComputeWorkGroupCount` 断言，该问题影响了 Qwen 3.8 Flash Next。
- **b10878** — [llama: `int32_t` return type for `llama_sampler_chain_n`](https://github.com/ggml-org/llama.cpp/commit/b10878)（[#28631](https://github.com/ggml-org/llama.cpp/pull/28631)）。用于嵌入 sampler API 的用户的类型收敛修复。
- **b10877** — [CUDA: size routed MoE MMQ N-tiles from typical expert width on RDNA3](https://github.com/ggml-org/llama.cpp/commit/b10877)（[#28552](https://github.com/ggml-org/llama.cpp/pull/28552)）。

未标记破坏性变更；所有提交均为新增或修复。

## 3. 新增模型与硬件支持

- **DeepSeek-V4.1-Flash 转换** — [PR #28696](https://github.com/ggml-org/llama.cpp/pull/28696) 新增 `DeepseekV41ForCausalLM` 支持（继承现有 V4 路径；处理嵌套的 `text_config`）。
- **MetaX MACA 后端（基础版）** — [PR #28694](https://github.com/ggml-org/llama.cpp/pull/28694) 为 MetaX GPU 新增可运行的推理支持；性能优化工作放在独立分支。
- **Hexagon（Qualcomm NPU）多设备 + 异步后端** — [PR #26501](https://github.com/ggml-org/llama.cpp/pull/26501) 已合入，支持 IQ9/IQ10 多 NPU 配置，提供异步图计算、事件与 tensor 拷贝。
- **Windows on ARM 上的 CUDA 构建** — [PR #28362](https://github.com/ggml-org/llama.cpp/pull/28362) 在 WoA 上启用 MSVC `cl.exe` 构建；[PR #28687](https://github.com/ggml-org/llama.cpp/pull/28687) 将 WoA 的 CUDA 13.4 从 Preview 提升为 13.4.1 GA。
- **s390x CPU** — Q4_0 repack 与 Q1_0 intrinsic 现已跻身一等公民（见上文）。
- **OpenVINO 请求** — [#28567](https://github.com/ggml-org/llama.cpp/issues/28567) 询问 Qwen3.5 何时能在 Intel NPU 上完成验证（暂无 ETA）。

## 4. 性能与优化

- **持久化 prompt 缓存（`--cache-disk`）** — [PR #28092](https://github.com/ggml-org/llama.cpp/pull/28092) 回应 [#20697](https://github.com/ggml-org/llama.cpp/issues/20697)（48 👍、19 条评论的长期请求）。支持 hybrid/SWA checkpoint、LRU 淘汰与损坏条目清理。这是面向长上下文服务最具看点的内存/性能特性。
- **主机卸载 MoE 专家的 GPU 常驻 LRU 缓存** — [PR #27861](https://github.com/ggml-org/llama.cpp/pull/27861) 在使用 `-ot ...exps=CPU` / `-ncmoe` 时，将最近使用的专家缓存在设备端，消除 host-RAM 带宽成为 MoE decode 瓶颈的问题。
- **Metal：单源融合表 + gated_delta_net 缓存融合** — [PR #28164](https://github.com/ggml-org/llama.cpp/pull/28164)（作者 @ggerganov）统一了打包/计算融合，使优化器与编码器不再可能彼此不一致；并新增 GDN 层的 Metal 缓存融合。
- **Metal：修复 iq mul_mv kernel 中的空闲线程** — [PR #28692](https://github.com/ggml-org/llama.cpp/pull/28692) 将 #28086 的行切分扩展至 `ne00 < 1024` 时的 `iq1_s/m`、`iq2_xxs/xs/s`、`iq3_s`。
- **SYCL 基数选择 top_k** — [PR #28670](https://github.com/ggml-org/llama.cpp/pull/28670) 取消了 `k<=32` 的限制，使 Qwen3.8-Flash-Next 的 `k=2048` TOP_K 保持在设备端执行，而不再回退到 CPU。
- **Blackwell 上的 NVFP4 W4A8 强制路径** — [PR #24364](https://github.com/ggml-org/llama.cpp/pull/24364) 为 W4A16_NVFP4 层打通强制走 W4A8 的路径（仍在推进中）。
- **RISC-V VLEN=16 Q4_0 的 8x8 gemv/gemm** — [PR #28642](https://github.com/ggml-org/llama.cpp/pull/28642)。
- **Vulkan mul_mm spec constant + FILL 2D 分布**（已交付，见上文） — 在 Intel Arc 与 Imagination PowerVR 上为 Qwen 3.8 Flash Next 带来具体收益。
- **CI runner 升级** — [PR #28659](https://github.com/ggml-org/llama.cpp/issues/28659) 计划将 Linux Vulkan CI 升级到 NVIDIA r615，以修复间歇性的 coopmat1 失败。

## 5. 稳定性与回归

*按严重程度排序。已关闭项表示修复已进入 `master` 或某个构建。*

### 高 — 开放

- **[#26207](https://github.com/ggml-org/llama.cpp/issues/26207) Server：跨请求使用不同 per-request `lora` 时复用 prompt cache** — 在适配器 A 下计算的 KV 被静默复用于选用适配器 B 的请求。污染输出，应视为正确性/安全性问题。暂未见修复 PR。
- **[#26609](https://github.com/ggml-org/llama.cpp/issues/26609) Qwen3.6-35B MoE + 部分专家卸载时，`cudaStreamSynchronize`（flash-attn 路径）中出现 CUDA 非法内存访问** — 在 b10107/b10243 上均可稳定复现，使用 `-fa off` 后消失。长期存在的 flash-attn 路径 Bug。
- **[#27155](https://github.com/ggml-org/llama.cpp/issues/27155) DeepSeek V4 Flash + DSpark 的 VRAM 泄漏** — 草稿 KV 缓存每个 PP+TG 周期增长约 10 MB，直至 OOM。
- **[#28648](https://github.com/ggml-org/llama.cpp/issues/28648) Intel Arc 140V（Windows）上的 Vulkan 在层放在 GPU 上时输出乱码** — 与 batch 设置相关；在 b10831、b10850、b10865、b10872 上均可复现。
- **[#28660](https://github.com/ggml-org/llama.cpp/issues/28660) `ggml_sycl_pool_vmm::free` 中的 SYCL 崩溃** — oneDNN scratchpad 在 Intel Arc Pro B70（b10879）上打乱了 LIFO 池顺序。
- **[#28441](https://github.com/ggml-org/llama.cpp/issues/28441) Apple M5 Max 上系统负载较高时，Metal 路径下 Qwen2.5-Omni 音频偶发静默损坏** — b10809。
- **[#28239](https://github.com/ggml-org/llama.cpp/issues/28239) [SYCL] Sysman 空闲内存查询可能不可用** — 影响 `llama-server` 资源上报。
- **[#27911](https://github.com/ggml-org/llama.cpp/issues/27911) `ggml_cuda_op_rms_norm_fused` 中 CUDA "invalid configuration argument"** — 发生在 sm_70（Tesla V100 年代）并发批处理场景下，涉及 qwen4_exp / Qwen3.8-Flash-Next。
- **[#25510](https://github.com/ggml-org/llama.cpp/issues/25510) 格式错误的工具调用参数返回 HTTP 500 而非 4xx** — 服务端契约问题；本应作为客户端错误处理。

### 中 — 开放

- **[#26478](https://github.com/ggml-org/llama

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-10

## 今日要点

今日的活动主要围绕 **Gemma 系列解析器 Bug 以及并行的安全加固工作**。多个针对 Gemma3n/Gemma4 工具调用解析的缺陷被提交，其中至少有两个已与已合并风格的 PR 配对（[#18355](https://github.com/ollama/ollama/pull/18355)、[#18363](https://github.com/ollama/ollama/pull/18363)）。安全方面，针对捆绑 Go 二进制的长期 CVE 待办列表（[#16033](https://github.com/ollama/ollama/issues/16033)）正通过依赖升级逐步清空（[#17095](https://github.com/ollama/ollama/pull/17095)、[#18356](https://github.com/ollama/ollama/pull/18356)）。

## 发布与破坏性变更

过去 24 小时内无新版本发布。昨天关闭的几个 PR（[#17935](https://github.com/ollama/ollama/pull/17935)、[#18298](https://github.com/ollama/ollama/pull/18298)、[#18348](https://github.com/ollama/ollama/pull/18348)、[#18347](https://github.com/ollama/ollama/pull/18347)）正在合入 `main`，并会影响下一个 tag —— 行为变更请参见「稳定性」一节。

## 新模型与硬件支持

- **Granite 4.1（MLX）** — 通过 mlx_lm 转换在实验性 MLX 后端中添加 `GraniteForCausalLM`（[#17972](https://github.com/ollama/ollama/pull/17972)）。
- **qwen3.5 / qwen3.5moe 并行度恢复** — 上游 llama.cpp 崩溃已修复，硬编码的 `numParallel = 1` 黑名单被移除，混合架构的吞吐不再受阻（[#17144](https://github.com/ollama/ollama/pull/17144)）。
- **DeepSeek-V4.1-Flash** — 关于 Ollama Cloud 上 Flash 变体的两个公开请求（[#18178](https://github.com/ollama/ollama/issues/18178)、[#18360](https://github.com/ollama/ollama/issues/18360)）。上游尚无动作。
- **MLX safetensors 导入** — 服务端 MLX 导入流水线，GGUF 创建收窄为仅封装（[#14969](https://github.com/ollama/ollama/pull/14969)）。MLX 前缀缓存的淘汰策略也在同步修复（[#18353](https://github.com/ollama/ollama/pull/18353)）。

## 性能与优化

- **qwen3.5 多轮重新渲染修复** — 渲染器现在在历史回放时始终输出 assistant think 块，避免 `qwen3.5` 完整 prompt 重复处理（[#18358](https://github.com/ollama/ollama/pull/18358)）。
- **MLX 前缀缓存淘汰** — 活跃会话的快照在超出预算时可以被释放，对 MoE / KV 缓存模型尤为关键（[#18353](https://github.com/ollama/ollama/pull/18353)）。
- **1M 上下文 UI** — 在设置滑块中新增 512k / 1M 选项，以便用户能够真正选择 GLM-5.3 Flash 等模型已声明的上下文长度（[#18364](https://github.com/ollama/ollama/pull/18364)，响应 [#18352](https://github.com/ollama/ollama/issues/18352)）。
- **MLX 启动噪声** — 在非 CUDA / 非 Apple 的 Windows 机器上，缺失符号错误不再打印到 stderr（[#18335](https://github.com/ollama/ollama/pull/18335)）。

## 稳定性与回归

**严重 / 高优先级**
- **高负载下嵌入向量静默为零** — `/v1/embeddings` 与 `/api/embed` 在持续负载下返回 HTTP 200 与正确的维度，但向量全为零；日志无法区分成功与失败（[#17878](https://github.com/ollama/ollama/issues/17878)）。**尚无修复 PR。** 最高运营风险：客户端无法察觉该故障。
- **Go 二进制 CVE 待办** — 针对 `/usr/local/bin/ollama` 报告了 1 个 CRITICAL + 11 个 HIGH CVE（[#16033](https://github.com/ollama/ollama/issues/16033)）。正在通过 [#17095](https://github.com/ollama/ollama/pull/17095) 与 [#18356](https://github.com/ollama/ollama/pull/18356) 推进修复（WebP 解码器 DoS 公告 GO-2026-5061 / GO-2026-6222）。建议尽快发布重新构建的二进制。
- **`ollama serve` 文件描述符泄漏** — 每一次成功的 `/api/generate` 请求都会泄漏一个 FD，无上限，需要重启才能释放（[#18344](https://github.com/ollama/ollama/issues/18344)）。尚无修复 PR。
- **Gemma4:e2b 启动崩溃** — 在 WSL2 中执行 `ollama run gemma4:e2b` 时触发 `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS)`（[#16506](https://github.com/ollama/ollama/issues/16506)）。22 条评论，8 👍。尚无修复 PR。

**中等优先级**
- **qwen3-coder 工具调用解析器** — 当开头的 `<tool_call>` 标签被省略时，会丢失工具调用，整个调用会作为文本泄漏到 `content` 中（[#16686](https://github.com/ollama/ollama/issues/16686)）。**修复 PR 已开启：** [#16693](https://github.com/ollama/ollama/pull/16693)。
- **Gemma4 字符串占位符冲突** — 当 45 个标量字符串后跟一个 2 字符串数组时，合法的工具调用会静默产出空的 `tool_calls`（[#18354](https://github.com/ollama/ollama/issues/18354)）。**修复 PR 已开启：** [#18355](https://github.com/ollama/ollama/pull/18355)。
- **FunctionGemma 空数组序列化为 null** — `items: []` 在 API 输出中变成 `{"items": null}`（[#18363](https://github.com/ollama/ollama/pull/18363) 修复 PR 已开启）。
- **Gemma3n `/v1` 空 tool_calls** — 原生的 `<tool_call>` 发射未被转换为 OpenAI 兼容输出（[#18357](https://github.com/ollama/ollama/issues/18357)）。
- **原生 Gemma4 流式不同步** — `/api/chat` 发出 31 个重复的 `<unused50>` 内容帧后 EOF，且不附带 `done:true`（[#18359](https://github.com/ollama/ollama/issues/18359)）。
- **Anthropic `/v1/messages` 复杂工具 schema** — 当 schema 较为复杂时，模型将工具调用以字面文本形式输出，而非 `tool_use` 块（[#18346](https://github.com/ollama/ollama/issues/18346)）。
- **多 GPU VRAM 核算** — 调度器按发现名（`CUDA1`）查找设备，但映射表以子 llama-server 日志名（`CUDA0`）为键，导致偏差（[#18349](https://github.com/ollama/ollama/issues/18349)）。
- **qwen2.5-coder:3b 损坏的库产物** — q2_K / q3_K_S/M/L 产出不可用输出（冒烟测试 0/15），同级其他量化不受影响（[#18252](https://github.com/ollama/ollama/issues/18252)）。

**低优先级 / 已处理**
- 自 v0.32.12 以来的 AMD Vulkan 回归（[#18272](https://github.com/ollama/ollama/issues/18272)）以及更广泛的 AMD 780M Vulkan 回归（[#17748](https://github.com/ollama/ollama/issues/17748)）—— 两者仍 OPEN，尽管 `radv/amdgpu: Not enough memory for command submission` 是硬性阻塞，尚无修复 PR。
- `/v1/responses` 拒绝 `agent_message` —— **已修复**（[#18298](https://github.com/ollama/ollama/pull/18298) 已关闭）。
- `codex-app` 命名空间工具失败 —— 通过在 llama-server 之前过滤命名空间工具**已修复**（[#17630](https://github.com/ollama/ollama/pull/17630) 已关闭）。
- 在 OpenAI / Anthropic 兼容层静默忽略 `tool_choice` —— **已修复**（[#17935](https://github.com/ollama/ollama/pull/17935) 已关闭）。
- 跨压缩的独立具名函数输出 —— **已修复**（[#18348](https://github.com/ollama/ollama/pull/18348) 已关闭）。

## 对应用开发者的意义

- **不要盲目信任 `/v1/embeddings` 的 200 OK。** 在 [#17878](https://github.com/ollama/ollama/issues/17878) 修复之前，向量范数校验（例如当 L2 范数 < ε 时拒绝）是 RAG 与检索流水线中必要的防御层。
- **Codex / 智能体集成变得更安全了。** `agent_message` 项现在可以通过 `/v1/responses`（[#18298](https://github.com/ollama/ollama/pull/18298)），独立的 `function_call_output` 项在压缩后也能保留（[#18348](https://github.com/ollama/ollama/pull/18348)）。若你针对 Ollama Cloud 运行 Codex，GLM 会话压缩不再返回 400。
- **`tool_choice` 现已在两个兼容层上被遵守。** 依赖 `tool_choice: "none"` 抑制调用或 `required` 强制调用的应用，在 [#17935](https://github.com/ollama/ollama/pull/17935) 合入后将看到正确行为。
- **Gemma4 工具调用在生产环境仍不稳定。** 今天浮出多个解析器回归（[#18354](https://github.com/ollama/ollama/issues/18354)、[#18359](https://github.com/ollama/ollama/issues/18359)）。若部署 Gemma4 工具调用，请在向用户开放前固定一个已知良好的构建，或应用待合并的解析器 PR。
- **关注长时运行 `ollama serve` 的 FD 计数。** 问题 [#18344](https://github.com/ollama/ollama/issues/18344) 意味着 `/api/generate` 流量会随着时间耗尽 ulimit —— 在修复前，请安排定期重启或在服务端前置一个连接池代理。
- **1M 上下文模型现可在 UI 中选择**（[#18364](https://github.com/ollama/ollama/pull/18364)）；当模型声明更大的窗口时，该设置不再静默截断。
- **安全态势：** 若你在容器或设备镜像中分发 Ollama 二进制，请在下次发布前合入 [#17095](https://github.com/ollama/ollama/pull/17095) 与 [#18356](https://github.com/ollama/ollama/pull/18356)；所列的 WebP 与加密 CVE 可通过默认的图像输入路径触发。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-10

## 今日要点
- **v1.101.0-rc.2 发布**,附带新的供应链加固说明:每个 LiteLLM Docker 镜像现在都使用锚定到 commit `0112e53` 的密钥通过 [cosign](https://docs.sigstore.dev/cosign/overview/) 进行签名([#unreleased](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.2))。运维人员应在升级 RC 版本之前,将 cosign 验证接入其准入策略。
- **计费完整性是核心主题**:一类新的支出跟踪缺陷浮出水面(Bedrock 客户端断连、RPM 限制在首次 key 缓存命中后冻结、自定义模型成本映射缺失、内存重置双计)——今天有多个 PR 落地处理这些问题。
- **Anthropic/Claude Code 路径加固持续推进**:`prompt_cache_key` 派生错误、`/v1/messages/count_tokens` 硬编码 `api.anthropic.com`、以及 Responses 桥接上吞掉 `response.failed` 的问题,均在积极修复中。

---

## 发布版本与破坏性变更
- **v1.101.0-rc.2**([release notes](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.2)) — Docker 镜像现在通过钉到 commit `0112e53` 的密钥进行 cosign 签名。使用 `cosign verify --key <pubkey> ghcr.io/berriai/litellm:v1.101.0-rc.2` 进行验证。在截止数据中除签名说明外未包含公开变更日志;视为 RC 处理,升级前请钉到特定 digest。

## 新模型与硬件支持
- **fal.ai(新提供者请求)** — Sora 2、Veo 3.1 和其他视频/图像模型被请求支持([#16073](https://github.com/BerriAI/litellm/issues/16073))。
- **DeepSeek V4 Pro / Flash** — 定价相对于提供方新的时段费率被报告为过时([#37255](https://github.com/BerriAI/litellm/issues/37255));PR #40569 同时交付了一个更新的 Jina reranker 费率。
- **gpt-6-astra** — 以 `mode: "chat"` 注册,导致针对 OpenAI 的 `/v1/chat/completions` 工具调用出现破坏性变更;Responses 桥接无法启用([#40123](https://github.com/BerriAI/litellm/issues/40123))。
- **A2A agents** — 前缀路由修复,即使存在通配符模型组,`a2a/<agent>` 也能通过 `/chat/completions` 访问([#39513](https://github.com/BerriAI/litellm/pull/39513))。
- **ChatGPT / Codex** — 图片编辑、结构化评审 JSON schema 和实时语音信令被添加到 ChatGPT OAuth 部署路径([#40366](https://github.com/BerriAI/litellm/pull/40366))。

## 性能与优化
- **流式 usage 正确性** — `_usage_chunk_calculation_helper` 在 LiteLLM 代理链式调用场景下会损坏推理模型的 `prompt_tokens`/`completion_tokens`,因为 `"prompt_tokens" in usage_chunk` 在 Pydantic `CompletionUsage` 上失败。在 [#40282](https://github.com/BerriAI/litellm/pull/40282) 中修复(推理 token + usage 现已端到端保留)。
- **缓存大小强制回归** — `InMemoryCache.check_value_size()` 对容器使用 `__sizeof__()`,该方法只测量浅层头部,因此多 MB 的载荷能通过 1 KB 限制。现在已正确处理容器大小([#40254](https://github.com/BerriAI/litellm/pull/40254))。
- **感知别名的 `/v1/models`** — 现在从底层部署而非公开别名解析限制;此前一个 1M 上下文的部署会显示为 200k([#39296](https://github.com/BerriAI/litellm/pull/39296))。
- **least-busy 路由饿死问题** — 根本原因分析现已公开:响应缓存命中会使计数器负向漂移,并列时总是选择第一个部署,且计数器不在 worker 间共享([#39322](https://github.com/BerriAI/litellm/issues/39322))。尚无修复 PR。
- **Responses 桥接上推理 + 内容保留** — 合并块不再丢弃增量可见文本;推理 delta 现在可以在其 summary 部分打开之前到达([#36329](https://github.com/BerriAI/litellm/pull/36329))。

## 稳定性与回归
按今日用户影响排序:

1. **未知自定义模型的支出日志为 $0**([#35691](https://github.com/BerriAI/litellm/issues/35691),Open) — 支出日志中 `cost_breakdown.total_cost = 0`,尽管 `response.usage.estimated_cost` 是正确的。影响任何不在内置成本映射中的自定义模型(例如 `deepinfra/deepseek-ai/DeepSeek-V4-Flash-0731`)。*尚无修复 PR。*
2. **虚拟 key 缓存后,每客户 RPM 限制停止生效**([#39713](https://github.com/BerriAI/litellm/issues/39713),Open,新增) — `max_end_user_budget_id` 强制在首次缓存命中后失效。*尚无修复 PR。*
3. **`max_parallel_requests` 计数器在 Anthropic 适配器上单调递增**([#27955](https://github.com/BerriAI/litellm/issues/27955),Open) — Redis 计数器在客户端流取消时永不递减;最终所有请求都会被拒绝。*尚无修复 PR。*
4. **客户端断连时 Bedrock 非流式支出跟踪**([#13245](https://github.com/BerriAI/litellm/issues/13245),Open) — LiteLLM 记录部分成本,而 AWS 按完整完成的请求收费。
5. **内存支出计数器双计**([#40572](https://github.com/BerriAI/litellm/pull/40572),Open PR) — 在没有 Redis 的情况下,重置时会把数据库余额加到一个已有值的计数器上,从而虚增支出。修复在 PR 中。
6. **从 `user_id` 派生的 `prompt_cache_key` 永不变化**([#39145](https://github.com/BerriAI/litellm/issues/39145),今日已关闭) — v1.99.0 的修复破坏了 Claude Code 缓存;已回退。
7. **MCP OAuth2 回调 404**([#24771](https://github.com/BerriAI/litellm/issues/24771),Open) — GitHub App MCP OAuth 流程重定向到 `/ui/mcp/oauth/callback`,该路径不存在。
8. **`/v1/messages/count_tokens` 硬编码 `api.anthropic.com`**([#29764](https://github.com/BerriAI/litellm/issues/29764),Open) — 破坏 vLLM Anthropic 兼容后端。
9. **复杂度自动路由跨模型组泄漏 `reasoning.encrypted_content`**([#40237](https://github.com/BerriAI/litellm/issues/40237),今日已关闭) — `/v1/responses` 的后续请求在对话中途切换了模型组。
10. **主机离线时健康检查硬失败**([#34281](https://github.com/BerriAI/litellm/issues/34281),Open) — 临时家庭实验室主机触发代理故障;应改为失败开放或降级。
11. **Cursor MCP `cursor://` 回调方案被拒绝**([#23339](https://github.com/BerriAI/litellm/issues/23339),Open)。
12. **分层定价字段(`*_above_200k_tokens`)被静默忽略**([#30135](https://github.com/BerriAI/litellm/issues/30135),Open) — 基础费率被平铺应用;根据方向不同可能多计或少计费用。
13. **带 `background:true` + `polling_via_cache` 的 `/v1/responses` 返回空输出**([#36275](https://github.com/BerriAI/litellm/issues/36275),今日已关闭) — v1.91.0 引入的回归;v1.83.7 已确认可用。
14. **Anthropic 流式传输通过自定义 OpenAI 兼容提供者时丢弃 `tool_use` 的 `input_json_delta`**([#29491](https://github.com/BerriAI/litellm/issues/29491),今日已关闭)。
15. **容器内缺少 `curl`** — Coolify 类平台上的健康检查被破坏;`curl` 已添加到 Dockerfile 运行阶段([#36367](https://github.com/BerriAI/litellm/pull/36367))。

## 对应用开发者的意义
- **钉版本前验证 RC**。`v1.101.0-rc.2` 引入了 cosign 签名 — 现在就在你的 CI/准入控制器中设置 `cosign verify`,以便生产发布可以信任该 digest。
- **如果你代理 Bedrock 或依赖每客户速率限制,请保持在稳定线**(≤ v1.99.0 以确保 `prompt_cache_key` 正确性;端到端验证 Bedrock 非流式核算)。多个计费路径缺陷处于开放状态且无修复 PR;请预期账本上会出现意外。
- **自托管 vLLM 使用 Anthropic 适配器**:`count_tokens` 仍硬编码 `api.anthropic.com`([#29764](https://github.com/BerriAI/litellm/issues/29764)) — 在客户端中钉入临时方案或暂缓升级。
- **Claude Code 用户**:v1.99.0 的 `prompt_cache_key` 更改破坏了缓存。该 bug 今日已关闭([#39145](https://github.com/BerriAI/litellm/issues/39145)),但修复方式是回退 — 在宣布胜利之前,请确认你的缓存命中率已恢复到基线。
- **推理模型流式链**:PR [#40282](https://github.com/BerriAI/litellm/pull/40282) 在你链式使用 LiteLLM 代理(例如边缘 → 中央)时恢复了 usage 核算。如果你今天看到的 token 核算有误,这就是原因。
- **成本控制**:每客户预算现在支持共享后备池(PR [#40573](https://github.com/BerriAI/litellm/pull/40573))并发出 webhook 告警(PR [#40396](https://github.com/BerriAI/litellm/pull/40396)) — 两者对多租户 SaaS 发布都很有用。
- **Agent 365 上的代理身份**:Microsoft 365 防护栏的新 `auth_mode: agent_identity`([#40568](https://github.com/BerriAI/litellm/pull/40568))允许无头代理无需最终用户 Entra 令牌即可进行身份验证。
- **可观测性**:新的 PointFive 日志回调([#38509](https://github.com/BerriAI/litellm/pull/38509))在 Langfuse/Spend Logs 之外增添了另一个成本分析导出选项。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-10

## 1. 今日要点

v0.1.808-beta 版本带来了 **1.2–1.7 倍的扩散推理加速，以及通过 Vulkan 为 AMD ROCm 提升 20% 性能**，同时 `studio update` 流水线提速 2 倍，并修复了 Windows 上的稳定性问题（移除了 SAC/AV 误报）。PR 流水线主要由 Studio 基础设施工作主导——清理了 23,636 行注释、后台预取更新、按账户隔离，以及 KV 抢占机制（允许多个并行对话共享同一缓存而互不干扰）。DGX Spark 上的两处明显回归（上下文长度被截断、扩散加载失败）均已修复并合并。

## 2. 版本发布与破坏性变更

- **[v0.1.808-beta](https://github.com/unslothai/unsloth/releases/tag/v0.1.808-beta)** — "Large Performance Gains + Fixes"
  - 扩散推理速度提升 1.2–1.7 倍
  - 通过 Vulkan 为 AMD ROCm 带来 20% 性能提升
  - `studio update` 提速 2 倍（基于证据的跳过逻辑）
  - 移除了 Windows 上的 SAC + AV 误报
  - 集成 Blender MCP，新增 Hermes 检测
  - 已向上游 AMD 报告的 AMD 乱码 Bug（已在本次版本中修复）

## 3. 新增模型与硬件支持

- **AMD Vulkan 后端**：通过 Vulkan 路径为 ROCm 带来 20% 性能提升
- **DGX Spark 修复** ([PR #10704](https://github.com/unslothai/unsloth/pull/10704)、[PR #10705](https://github.com/unslothai/unsloth/pull/10705))：解决了上下文被限制在 8192 而非 262144 的问题，以及统一内存 APU 上扩散加载失败的问题
- **NVLink 检测** ([PR #10720](https://github.com/unslothai/unsloth/pull/10720))：现通过 NVML 读取 NVLink 拓扑，不再通过 `nvidia-smi topo -m` shell 调用——在 8x B200 主机上从约 1.2 秒降至几十毫秒
- **Agent Skills** ([PR #10247](https://github.com/unslothai/unsloth/pull/10247))：从 `~/.agents/skills` 和 `~/.claude/skills` 发现/校验技能，并在 Studio 推理路径中暴露分页式 `read_skill` 工具
- **Apple Silicon 支持** ([Issue #4](https://github.com/unslothai/unsloth/issues/4))：仍在路线图上；644 👍，标记为 help wanted——尚无 PR 合并

## 4. 性能与优化

- **扩散推理**：v0.1.808-beta 中提升 1.2–1.7 倍
- **AMD ROCm + Vulkan**：+20% 性能
- **`studio update` 提速 2 倍**，通过基于证据的跳过逻辑实现（[PR #10649](https://github.com/unslothai/unsloth/pull/10649)）——依赖检查现在会在安装清单中记录其消费的内容，并在先前证据有效时跳过相应步骤
- **Transformers sidecar 重建**：仅重建过时的 sidecar（[PR #10650](https://github.com/unslothai/unsloth/pull/10650)）——此前在 Windows 上每次更新需要 60–90 秒
- **uv 复用** ([PR #10659](https://github.com/unslothai/unsloth/pull/10659))：当先前运行已安装时，避免重复下载固定的 uv 归档
- **后台预取更新** ([PR #10653](https://github.com/unslothai/unsloth/pull/10653))：`unsloth studio prefetch-update` 以隐藏方式运行，在提供 UI 更新之前对当前 venv 进行核心步骤的 dry-run
- **Offload 规划器** ([PR #9872](https://github.com/unslothai/unsloth/pull/9872))：权衡 spill 成本与 llama.cpp 自带 fitter，包含成本门控、子 FFN spill 阶梯、上下文感知的设备预留，以及启动排序——全部位于 `UNSLOTH_SMART_OFFLOAD` 开关之后
- **KV 抢占** ([PR #10301](https://github.com/unslothai/unsloth/pull/10301)、[PR #10358](https://github.com/unslothai/unsloth/pull/10358))：并行对话现在共享同一 KV 缓存（`--parallel N --kv-unified -c N`），不再发生 slot 抢占；与 `unslothai/llama.cpp#184`/`#190` 配套使用
- **注释清理** ([PR #10504](https://github.com/unslothai/unsloth/pull/10504))：在安装器、CLI、package 和后端工具中移除了 23,636 行注释
- **日志脱敏修复** ([PR #10721](https://github.com/unslothai/unsloth/pull/10721))：停止在截断 ANSI 转义序列上的二次回溯

## 5. 稳定性与回归

### 近期关闭的 Bug（修复已发布）
- **Unsloth Desktop / Studio**：
  - `-ngl -1` GGUF 加载时 RAM 未释放（[Issue #9033](https://github.com/unslothai/unsloth/issues/9033)，OPEN——未显示修复 PR）
  - 多轮确定性冒烟测试偶发 flake（[Issue #10004](https://github.com/unslothai/unsloth/issues/10004)）—— CLOSED
  - 安装器报告 AMD GPU 但后端仅以 CPU 运行（[Issue #8473](https://github.com/unslothai/unsloth/issues/8473)）—— CLOSED
  - AMD Strix Halo APU 被限制为 22 GB 系统内存而非 110 GB GPU 内存（[Issue #6834](https://github.com/unslothai/unsloth/issues/6834)）—— CLOSED，5 👍
  - 重启后一直自动选择 CPU（[Issue #5807](https://github.com/unslothai/unsloth/issues/5807)）—— CLOSED
  - RTX 5080 + WSL 上 GGUF 导出失败（[Issue #4845](https://github.com/unslothai/unsloth/issues/4845)）—— CLOSED
- **vLLM 集成**：v0.1.807-beta 上的 `min_p and logit_bias not supported` 错误（[Issue #10573](https://github.com/unslothai/unsloth/issues/10573)）—— OPEN
- **Qwen3-Coder-Next-Base 在 2xA100 QLoRA 上 OOM**（[Issue #4040](https://github.com/unslothai/unsloth/issues/4040)）—— CLOSED，正在修复中
- **Qwen 2 Kaggle `NameError: slice_indices`**（[Issue #3450](https://github.com/unslothai/unsloth/issues/3450)）—— CLOSED，已修复
- **Gemma 3n 最大递归深度**（[Issue #3650](https://github.com/unslothai/unsloth/issues/3650)）—— CLOSED
- **Prompt-completion 数据集支持**（[Issue #3399](https://github.com/unslothai/unsloth/issues/3399)）—— CLOSED
- **Intel Arc B580 导入失败**（[Issue #3533](https://github.com/unslothai/unsloth/issues/3533)）—— `torch.xpu.memory.mem_get_info()` 不受支持，CLOSED
- **多 GPU 微调**（[Issue #1707](https://github.com/unslothai/unsloth/issues/1707)）—— CLOSED
- **Vision `NameError: fetch_video`**（[Issue #3086](https://github.com/unslothai/unsloth/issues/3086)）—— CLOSED

### 未解决的安全回归
- **[Issue #10545](https://github.com/unslothai/unsloth/issues/10545)** —— unsloth-zoo 升级后 `pip scan-packages` 基线需要重新复核；164 项发现，93 项已抑制（60 项 CRITICAL，33 项 HIGH）。**严重性：HIGH** —— `main` 分支上的安全审计通道为红色。

### 热门功能请求
- **[Issue #10637](https://github.com/unslothai/unsloth/issues/10637)**：Data Recipes 中的 "Download Dataset" 按钮—— OPEN
- **[Issue #5141](https://github.com/unslothai/unsloth/issues/5141)**：Codex + llama.cpp 关于 Responses API 的文档已过时—— CLOSED

## 6. 对应用开发者的意义

- **Studio 更新开销大致减半**——如果你之前因为 Windows 上 60–90 秒的重建或重复的 uv 下载而避免频繁更新，v0.1.808-beta 加上 PR 栈使更新路径具备证据感知能力。值得重新运行一次 `studio update` 以获取这些收益。
- **并行对话吞吐**——新的 `--parallel N --kv-unified` 模式意味着多个并发对话不再争夺 KV 缓存 slot。如果你正在运行的 agent 针对单一模型发起并行推理流，这将是一次有意义的容量解锁。
- **DGX Spark 用户**：现在更新即可恢复原生上下文长度（262k），并在统一内存上解锁扩散加载。
- **AMD ROCm 用户**：新版本通过 Vulkan 路径免费获得 +20% 性能；此前报告的 AMD 乱码问题已解决。
- **Apple Silicon**：仍无 PR，但 Issue #4 仍是仓库中点赞最多的功能请求（644 👍）——任何具备 Metal 专业能力并贡献上游 kernel 的开发者都将获得高影响力工作。
- **Studio 安全基线**：如果你在由 `pip-audit` 守门的 CI/CD 流水线中依赖 `unsloth-zoo`，请关注 Issue #10545——hf-stack 通道在升级后处于失败状态，在合并之前可能需要更新基线或固定依赖版本。
- **针对 Studio Desktop 0.1.807-beta 上的 vLLM 集成应用**：在 #10573 解决之前，避免传递 `min_p` 或 `logit_bias`；如果这些采样参数出现在你的生产路径中，可考虑回退到 v0.1.806。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 摘要 — 2026-09-10

## 今日要点

今日活动以 **v3.1.0 中落地的稳定性修复** 为主，解决了两个阻塞生产环境的回归问题：(1) Claude App 网关恢复操作静默删除活动配置项，并在每次 CCR 重启时回滚根配置 (#1768 → [#1769](https://github.com/musistudio/claude-code-router/pull/1769))；(2) `fusion` Web 搜索检测在 Claude Cowork 客户端上失败，因为工具名称归一化器将 `WebSearch` 折叠为 `websearch`，导致所有匹配模式都失效 ([#1766](https://github.com/musistudio/claude-code-router/issues/1766) → [#1767](https://github.com/musistudio/claude-code-router/pull/1767))。该版本还通过遵循 profile Entry 模式，并在 profile 白名单变更时使网关模型发现缓存失效，进一步收紧了配置同步语义。

## 版本发布与破坏性变更

- **[v3.1.0](https://github.com/musistudio/claude-code-router/releases/tag/v3.1.0)** — 由社区贡献者 @diogomcd 提供
  - `feat`：`claudeAppConfigSync` 现在遵循 profile 的 **Entry mode**，而非无条件地写入活动 profile ([#1720](https://github.com/musistudio/claude-code-router/pull/1720))。此前依赖 Claude Desktop entry 自动提升活动 profile 的运维人员可能会看到不同的行为；升级后请验证 profile 的 `entry` 设置。
  - `fix`：当 profile 白名单发生变化时，网关模型发现缓存现在会被正确失效，避免在编辑 `config.json` 后出现过时的模型列表 ([#1720](https://github.com/musistudio/claude-code-router/pull/1720))。无需手动操作，但白名单编辑后的 `/v1/models` 响应会刷新。

本版本无 CLI 参数或 schema 破坏性变更。

## 新模型与硬件支持

_本摘要周期内无新增模型、架构、后端或量化支持。_

## 性能与优化

- **网关缓存失效正确性** ([#1720](https://github.com/musistudio/claude-code-router/pull/1720)) — 此前，修改 profile 白名单可能让客户端继续读取已不再反映上游可用性的缓存模型列表。该修复确保缓存 TTL 受白名单身份约束；虽未提供量化指标，但消除了一类"幽灵模型" 404 错误。
- 今日无吞吐量、延迟或内存相关的优化落地。

## 稳定性与回归

按用户感知严重度排序。三个最严重的项目目前均已有修复（两个已合并，一个待合并）。

| 严重度 | 问题 | 状态 | 修复 |
|---|---|---|---|
| 🔴 高 | [#1768](https://github.com/musistudio/claude-code-router/issues/1768) — `restoreClaudeAppGatewayConfig` 在 CCR 退出时删除 `configLibrary/*.json`，且 `apply` 在下次启动时重建一个 12 字段的"裸"条目，导致 Claude 写入的设置（如 `chatTabEnabled`、`modelPrefer1mContext` 等）丢失。 | **已关闭** | [#1769](https://github.com/musistudio/claude-code-router/pull/1769) 已合并 — 恢复操作改为精准操作（仅移除接管注入的键），而非文件级回滚。 |
| 🔴 高 | [#1766](https://github.com/musistudio/claude-code-router/issues/1766) — `coreGatewayWebSearchToolNameMatches()` 将 `WebSearch` 归一化为 `websearch`（无分隔符），导致 `=== "web_search"`、`endsWith("_web_search")`、`includes("search_web")` 全部失效；Cowork 的 Web 工具被静默降级。 | **已关闭** | [#1767](https://github.com/musistudio/claude-code-router/pull/1767) 已合并 — 新增正则/不区分大小写的匹配逻辑，支持驼峰式工具声明。 |
| 🟡 中 | [#1246](https://github.com/musistudio/claude-code-router/issues/1246)（引用）— `ccr start --daemon` 被 `Unknown web option: --daemon` 拒绝，破坏了文档化的使用方式。 | **待处理** | [#1782](https://github.com/musistudio/claude-code-router/pull/1782) 由 @syf1f2211 提交 — 为 `start` 和 `serve` 添加 `--daemon` 解析。等待审核中。 |
| 🟢 低 | [#1225](https://github.com/musistudio/claude-code-router/pull/1225) — `<CCR-SUBAGENT-MODEL>` 覆盖在标签位于 `system[1].text` 或 `req.body.model` 提前返回时不可靠。 | **已关闭** | 已合并 — 标签检测范围扩大。 |
| 🟢 低 | [#1224](https://github.com/musistudio/claude-code-router/pull/1224) — `config.json` 中的 OpenRouter provider `headers` 未被转发到上游请求。 | **已关闭** | 已合并 — 自定义请求头在 `fetch` 之前合并。 |
| 🟢 低 | [#865](https://github.com/musistudio/claude-code-router/pull/865) — 缺少 API key 时静默将 `HOST` 覆盖为 `127.0.0.1`，破坏了容器化部署。 | **已关闭** | 已合并 — 改为发出警告。 |

## 对应用开发者的意义

- **若你使用 Claude Desktop / Cowork 网关，请立即升级到 v3.1.0。** 两项高严重度修复 (#1769, #1767) 对以下用户是必需的：(a) 通过 Claude Desktop UI 编辑设置并期望其在 CCR 重启后保留的用户；(b) 通过 `fusion` 路由 Cowork 流量并依赖其 Web 搜索工具的用户。若不应用这些修复，你将在不知不觉中丢失配置和 Web 检索能力。
- **Profile Entry 模式现已成为权威设置。** 如果你此前假定 Claude App entry 会自动跟随活动 profile，请审查 `config.json` 中 profile 的 `entry` 字段。原本应被提升的过期 profile 现在需要显式的 `entry` 值。
- **`ccr start --daemon` 将在下一版本生效** ([#1782](https://github.com/musistudio/claude-code-router/pull/1782))。在合并之前，建议改用 PID 文件方式或在你选择的 init 系统下运行 —— 暂不要在脚本中依赖该参数。
- **OpenRouter 自定义请求头现已端到端可用。** 如果你使用 OpenRouter 应用归属、排序或反滥用请求头，可以在 `config.json` 的 `providers[].headers` 中声明，它们将被转发到上游 —— 适用于多租户网关中的成本归属和按应用速率限制隔离。
- **子代理模型覆盖（`<CCR-SUBAGENT-MODEL>`）恢复可靠。** 如果你之前看到父模型间歇性地处理子代理轮次，请在 HEAD 上重新测试；扩展后的标签检测 ([#1225](https://github.com/musistudio/claude-code-router/pull/1225)) 应该能解决该问题。
- **运维提示：** `HOST` 不再在缺少 API key 时被覆盖的变更 ([#865](https://github.com/musistudio/claude-code-router/pull/865)) 意味着无认证部署现在会绑定到你配置的网络接口上 —— 若你在不使用 API key 的情况下部署并依赖原先隐式的回环行为，请确保做好防火墙配置。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 每日摘要 — 2026-09-10

> 跟踪 [farion1231/cc-switch](https://github.com/farion1231/cc-switch) — 一个面向 Claude Code、Codex 及其他 AI 编码应用的多提供商切换/路由工具。

## 今日要点

CC Switch 今天在 Codex 相关的问题上活动密集，多个长期悬而未决的问题终于排上了修复 PR，包括 macOS 本地路由（#3585、#6256、#7217）和会话管理（#7273、#7274、#7272）。Claude Code `2.1.265` 更新导致 DeepSeek 和 ZAI 提供商失效（#7236，11 条评论），与此同时 DeepSeek Harness（#6526、#7244）的相关工作以及一个 `system → user` 提示转换代理模式（#7253）的出现，显示出该项目正向 Claude/Codex 双寡头之外的领域扩张。

## 发布与破坏性变更

过去 24 小时内没有新发布。当前开发仍在 3.20.x 主线上推进——请注意以下已发布版本中可能影响 3.20.2 用户的回归问题：

- **Claude Code `2.1.265` 兼容性** — DeepSeek 和 ZAI 提供商失效（[#7236](https://github.com/farion1231/cc-switch/issues/7236)）
- **v3.20.2 回归** — `qwen3.8 27B` 仅在使用 `haiku` 时可用，其他 Claude Code 模型报错（[#7221](https://github.com/farion1231/cc-switch/issues/7221)）
- **通用同步会清空子项元数据** — 用量查询和特定应用开关丢失（[#7134](https://github.com/farion1231/cc-switch/issues/7134)，修复见 [#7212](https://github.com/farion1231/cc-switch/pull/7212)）
- **重启时 Codex 故障转移配置被 Claude 配置覆盖**（[#7204](https://github.com/farion1231/cc-switch/issues/7204)，修复见 [#7210](https://github.com/farion1231/cc-switch/pull/7210)）

## 新增模型与硬件支持

- **DeepSeek Harness (DSH)** — 一等 `AppType` 目标，提供 `~/.dsh/settings.yaml` 的 provider 写入器（[#7244](https://github.com/farion1231/cc-switch/pull/7244)、[#6526](https://github.com/farion1231/cc-switch/pull/6526)）。这是超出 Claude/Codex/Gemini 的重要新增支持面。
- **Grok Build** — 独立于 Codex 的解耦路由路径（[#5364](https://github.com/farion1231/cc-switch/pull/5364)）
- **Laonong API 预设** — 兼容 OpenAI SDK 的网关，支持 40+ 模型（[#7245](https://github.com/farion1231/cc-switch/pull/7245)）
- **Qwen 3.8 系列** — DashScope 预设更名为"千问AI平台"，并在全部七个受支持的应用中完成刷新（[#7183](https://github.com/farion1231/cc-switch/pull/7183)）

## 性能与优化

今天没有新的基准数据落地，但多项代理路径优化已排入队列：

- **Claude Code 的 steer/reminder 消息执行 system → user 转换**（[#7253](https://github.com/farion1231/cc-switch/pull/7253)）——针对 Chat Completions 网关场景下的缓存未命中复现问题。
- **图片编辑 + Images API 代理跟进工作**（[#7177](https://github.com/farion1231/cc-switch/pull/7177)）——涵盖 `/images/edits` 覆盖、`base_url` 全 URL 处理以及流式图片生成的用量统计。
- **全 URL 代理回退**（[#7259](https://github.com/farion1231/cc-switch/pull/7259)）——当配置的 URL 停在 `/v1` 时进行路径拼接。
- **`x-opencode-session` 请求头注入**，用于 OpenCode Go 上游亲和性与缓存（[#7246](https://github.com/farion1231/cc-switch/pull/7246)）。

## 稳定性与回归

按用户可感知的严重程度从高到低排列：

| 严重程度 | 问题 | 状态 |
|---|---|---|
| **严重** | Claude Code `2.1.265` 导致 DeepSeek/ZAI 失效 — ([#7236](https://github.com/farion1231/cc-switch/issues/7236)) | 已关闭（11 条评论） |
| **高** | 本地路由在 `127.0.0.1:15721/v1/responses` 返回 `502 Bad Gateway` — ([#3585](https://github.com/farion1231/cc-switch/issues/3585)) | 已关闭（18 条评论） |
| **高** | 启用本地代理 + 故障转移时打开 CLI 工具崩溃 — ([#936](https://github.com/farion1231/cc-switch/issues/936)) | 已关闭（15 条评论） |
| **高** | Codex 路由绕过本地代理（`:15721`/`:15722`），在 macOS 上直连 `api.openai.com` — ([#7217](https://github.com/farion1231/cc-switch/issues/7217)、[#6256](https://github.com/farion1231/cc-switch/issues/6256)) | 待处理；PR [#7263](https://github.com/farion1231/cc-switch/pull/7263) 已排队 |
| **高** | `preserve_codex_official_auth_on_switch=true` 导致恢复的账号期 Codex 会话出现 401 — ([#5672](https://github.com/farion1231/cc-switch/issues/5672)) | 待处理；PR [#7262](https://github.com/farion1231/cc-switch/pull/7262) 已排队 |
| **中** | 内存占用异常 — ([#7224](https://github.com/farion1231/cc-switch/issues/7224)) | 待处理 |
| **中** | Codex 会话管理器在 `local_thread_catalog` 中留下无法删除的幽灵任务 — ([#6784](https://github.com/farion1231/cc-switch/issues/6784)) | 待处理；PR [#7272](https://github.com/farion1231/cc-switch/pull/7272) 清理 `session_index.jsonl` 残留 |
| **中** | Codex 恢复/回滚片段被列为重复的不完整会话 — ([#7273](https://github.com/farion1231/cc-switch/issues/7273)) | 待处理；PR [#7274](https://github.com/farion1231/cc-switch/pull/7274) 按线程分组 |
| **中** | macOS 13 — 提供商检查、应用内更新以及 Codex API 调用全部失败 — ([#6936](https://github.com/farion1231/cc-switch/issues/6936)) | 待处理 |
| **中** | Codex Desktop 语音在代理接管期间访问 `/v1/live` 返回 404 — ([#6959](https://github.com/farion1231/cc-switch/issues/6959)) | 待处理 |
| **中** | WSL UNC 路径：Codex 路由失败（`hard_link` `os error 50`）— ([#6679](https://github.com/farion1231/cc-switch/issues/6679)) | 待处理 |
| **低** | `<think>` 块经 OpenAI Chat 上游泄露到 Claude 响应中 — ([#7271](https://github.com/farion1231/cc-switch/issues/7271)) | 待处理 |
| **低** | 代理环境切换路由失败 — ([#7270](https://github.com/farion1231/cc-switch/issues/7270)) | 待处理 |
| **低** | DeepSeek API 通过 Mac 上的 VSCode Claude Code 插件调用失败 — ([#7277](https://github.com/farion1231/cc-switch/issues/7277)) | 待处理 |

## 对应用开发者的影响

- **如果你的下游客户端基于 CC Switch 的本地代理来使用 Codex CLI/Desktop，请在上线前在 macOS 上验证。** 目前至少有三个待处理问题（#7217、#6256、#6936）描述了请求绕过 `127.0.0.1:15721`/`15722` 直接访问 `api.openai.com` 的情况。PR [#7263](https://github.com/farion1231/cc-switch/pull/7263) 即将合入——请固定你的版本或关注发布说明。
- **跨应用配置隔离尚未完全严密。** [#7204](https://github.com/farion1231/cc-switch/issues/7204) 和 [#7210](https://github.com/farion1231/cc-switch/pull/7210) 表明 Codex 的重试/超时字段会在重启时被 Claude 的配置覆盖。如果你用脚本管理多应用配置，请在前后分别导出以便检测漂移。
- **代理正在演化为更丰富的转换层，而不仅仅是请求转发器。** system 消息转换（[#7253](https://github.com/farion1231/cc-switch/pull/7253)）、`x-opencode-session` 注入（[#7246](https://github.com/farion1231/cc-switch/pull/7246)）以及图片编辑代理（[#7177](https://github.com/farion1231/cc-switch/pull/7177)）意味着 CC Switch 现在能够以语义修复而非单纯的网络重写在不兼容的 SDK 与稳定的第三方网关之间架起桥梁。
- **DeepSeek Harness (DSH) 正成为受支持的目标。** 如果你正在基于 DSH 构建，`~/.dsh/settings.yaml` 写入器（[#7244](https://github.com/farion1231/cc-switch/pull/7244) 和 [#6526](https://github.com/farion1231/cc-switch/pull/6526)）是需要关注的集成入口。
- **平台注意事项：** Windows WebView2 启动白屏修复已排入队列（[#7240](https://github.com/farion1231/cc-switch/pull/7240)）；Linux HiDPI/UI 缩放（[#4622](https://github.com/farion1231/cc-switch/issues/4622)）以及 KDE/GNOME 上的动态主题同步（[#6714](https://github.com/farion1231/cc-switch/pull/6714)）仍待处理。如果你的团队环境异构，请为 Linux/WSL 的边缘场景做好准备。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-10

## 1. 今日要点

`QuantumNous/new-api` 仓库今日的活动以 **计费/日志正确性修复** 为主，同时存在一个影响 Claude 工具调用 JSON 的 **真实流式 bug**（出现在 `/v1/messages` 路径）。值得注意的是，新打开的 issue 中有相当比例（17 个中的 8 个）被标记为无效关闭 —— 既有未按 bug 报告模板提交的 AI 编程代理提交，也有之前的重复 issue —— 因此实际变更面比 issue 数量显示的更小。两个值得关注的 PR 分别针对 Gemini 路由（`countTokens`）和自动禁用后的渠道重试优先级，都切实回应了生产中的痛点。

## 2. 版本发布与破坏性变更

*过去 24 小时内无新版本发布。* 项目仍处于 `v1.0.0-rc.36` 阶段（关于 GA 标准的持续讨论见 [#7279](https://github.com/QuantumNous/new-api/issues/7279)）。

## 3. 新模型与硬件支持

本时间窗口内无新模型或后端接入。当下的工作集中在对 **已支持的 Anthropic 与 Gemini 路径** 进行协议/计费正确性修复，而非扩展提供商覆盖范围。

## 4. 性能与优化

- **重试逻辑重构 —— 进行中。** [#4236](https://github.com/QuantumNous/new-api/issues/4236) 请求优化上游重试行为。目前尚无具体数据；仍处于方案设计阶段。
- **`/api/status` 请求去重 —— 实质合入，但 PR 已关闭。** [#7189](https://github.com/QuantumNous/new-api/pull/7189) 对 `/api/status` 轮询进行了去重（与 [#7157](https://github.com/QuantumNous/new-api/pull/7157) 相关）；PR 因模板原因被关闭为无效，但底层优化已落地。
- **渠道密钥存储模式切换 —— 进行中。** [#7196](https://github.com/QuantumNous/new-api/pull/7196)（关闭 [#7115](https://github.com/QuantumNous/new-api/issues/7115)）支持在创建后切换密钥存储模式，减少运维负担。

## 5. 稳定性与回归

按严重程度排序：

| 严重程度 | Issue / PR | 状态 | 备注 |
|---|---|---|---|
| **高** | [#7302](https://github.com/QuantumNous/new-api/issues/7302) — `/v1/messages` 流式 `tool_use.input_json_delta` 截断，导致客户端收到无效 JSON（Claude / Anthropic Messages API 路径） | 开放，尚无修复 PR | 重新提交 [#7301](https://github.com/QuantumNous/new-api/issues/7301) 并附带完整复现步骤；记录前请对比上游与网关行为 |
| **中** | [#7291](https://github.com/QuantumNous/new-api/pull/7291) — Anthropic 消费日志缺少缓存输入 token，低报 TPM 与总输入量 | 开放 PR，解决 [#7290](https://github.com/QuantumNous/new-api/issues/7290) | 计费统计存在缺口；定价计算本身正确，仅日志汇总缺少缓存 token |
| **中** | [#7296](https://github.com/QuantumNous/new-api/issues/7296) — 阶梯定价日志汇总错误地显示「动态计费 · 无匹配结果」 | 开放，尚无修复 PR | 实际扣费金额正确，仅人类可读的日志行有误。与已关闭的 [#7295](https://github.com/QuantumNous/new-api/issues/7295)（表达式定价变体）相关 |
| **中** | [#6017](https://github.com/QuantumNous/new-api/issues/6017) — 关联大量分组的渠道在 SQL

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*