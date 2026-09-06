# AI 基础设施日报 2026-09-06

> 生成时间: 2026-09-06 15:00 UTC | 覆盖项目: 9 个

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

<think>The user wants me to translate the English technical report into Simplified Chinese. Let me carefully translate this while preserving all the markdown structure, URLs, code references, numbers, project names, etc.

Key things to preserve:
- All URLs and links
- PR/issue numbers like #55575, #37892, etc.
- Version tags like b10821, v0.34.0-rc1, etc.
- Project names: vLLM, SGLang, llama.cpp, Ollama, LiteLLM, Unsloth, Claude Code Router, CC Switch, New API
- Repository slugs and usernames
- Technical terms that should stay in English (KV cache, prefix cache, etc.) or have natural Chinese equivalents
- Numbers, dates, percentages

I need to use natural technical Chinese register, like a Chinese developer newsletter. Some technical terms are commonly kept in English in Chinese tech writing (KV cache, MoE, etc.), while others have standard Chinese translations.

Let me translate this carefully:

Section 1 - Ecosystem Overview:
- "hybrid-attention / speculative-decoding transition" - 混合注意力/投机解码转型
- "hybrid SSM/linear-attention models" - 混合 SSM/线性注意力模型
- "correctness surface area" - 正确性暴露面
- "Blackwell-class hardware" - Blackwell 架构硬件
- "draft speculation" - 投机解码
- "HiCache" - keep as is
- "Cost-of-billing correctness" - 计费正确性
- "Apple Silicon / MLX / Vulkan" - keep as is
- "integrated GPUs" - 集成显卡/iGPU
- "serving engines" - 推理引擎/服务引擎
- "local runtimes" - 本地运行时
- "gateway/proxy layer" - 网关/代理层
- "Rust bridges" - Rust 桥接
- "P/D disaggregation" - Prefill/Decode 分离

Section 2 - Activity Comparison:
- Keep all the table content
- Translate descriptions naturally

Section 3 - Model Support Race:
- Model names like GLM-5-Next, DeepSeek-V4 stay in English
- Translate descriptions
- PR/issue references stay as-is

Section 4 - Performance Frontier:
- Keep technical terms
- Translate descriptions
- Numbers stay as-is

Let me write this out now.</think>

# AI 基础设施生态报告 — 2026-09-06

## 1. 生态概览

今日在九个跟踪项目上的活跃度,反映出整个行业正处于 **混合注意力 / 投机解码** 的转型期,其中混合 SSM/线性注意力模型(Qwen3-Next、Qwen3.8-Flash-Next、GLM-5.3-Flash、DeepSeek-V4)在各个引擎上产生了最大的正确性暴露面。Blackwell 架构硬件(SM100/SM120/SM121)已经普遍落地支持,但仍在积累特定模型下的 bug,尤其是在 draft 投机解码与 HiCache 场景下。计费正确性已在网关层上升为一类核心关注点,而 Apple Silicon / MLX / Vulkan 在集成显卡上的工作正在获得真正的工程投入,不再只是附带性适配。按层级来看,**服务引擎** 正在推进 KV 缓存拓扑与 P/D 分离,**本地运行时** 正在整合打包/安全与 Apple Silicon 数值计算,**网关/代理层** 正在整合 Rust 桥接、预算强制执行与跨供应商路由。

## 2. 活跃度对比

| 项目 | 层级 | 版本发布(24h) | Issues(样本量) | PRs(样本量) | 活跃度信号 |
|---|---|---|---|---|---|
| **vLLM** | 推理引擎 | 0 | ~12 个重点 | ~15 个重点 | 高 — 混合 GDN + 投机解码 bug 高峰 |
| **SGLang** | 推理引擎 | 0 | ~10 个重点,今日新增 4 | ~12 个重点 | 高 — diffusion 驻留规划系列、DSA bugs |
| **llama.cpp** | 本地运行时 | **4**(b10821–b10825) | ~10 个重点 | ~12 个重点 | 非常高 — 模型 + 内核 + 发布节奏 |
| **Ollama** | 本地运行时 | **1**(v0.34.0-rc1) | ~12 个重点 | ~10 个重点 | 高 — MLX 正确性 + 云端回归 |
| **LiteLLM** | 网关 | **2**(v1.100.0、v1.101.0-rc.1) | ~15 个重点 | ~10 个重点 | 非常高 — Rust 重构 + 预算 bug |
| **Unsloth** | 微调 + Studio | 0 | ~30 个已关闭 | ~17 个待处理 | 重在分流 — Studio 硬化日 |
| **Claude Code Router** | 网关 | 0 | 新增 2 | 1 | 低量 — 早期阶段 |
| **CC Switch** | 网关 | 0 | ~16 个重点 | ~10 个重点 | 中等 — Codex 代理 bug 高峰 |
| **New API** | 网关 / 中继 | **1**(v1.0.0-rc.34) | 6 个重点 | 5 个重点 | 中等 — 安全 + 中继正确性 |

**解读:** llama.cpp 与 LiteLLM 是今日唯二发布 tag 版本的项目;Ollama 发布了 RC。下方大量的活跃度都集中在 bug 修复与重构上,而非新功能。上面 issue/PR 的样本数反映的是每个 digest 整理出的列表,而非 GitHub 原始总数。

## 3. 模型支持竞速

| 模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | Unsloth | LiteLLM | New API | CC Switch |
|---|---|---|---|---|---|---|---|---|
| **GLM-5-Next / GLM-5.3-Flash**(混合 MoE,321.3B) | 待修复 bug(DSA、SM120/100/103) | 待修复 bug(DSA、SM120/100/103) | **已添加**([#27754](https://github.com/ggml-org/llama.cpp/pull/27754)) | `glm-5.3:cloud` 回归 | — | Bedrock Voxtral PR | — | **定价条目**([#7163](https://github.com/farion1231/cc-switch/pull/7163)) |
| **DeepSeek-V4 / V4-Flash** | **fused post-residual** 性能优化([#55575](https://github.com/vllm-project/vllm/pull/55575));DSpark PP([#53577](https://github.com/vllm-project/vllm/pull/53577));Ampere 仍未关闭 | 长上下文 DSA 索引器崩溃([#37892](https://github.com/sgl-project/sglang/issues/37892));Vision-Exp 在 DGX Spark 上 OOM | — | — | — | — | — | 厂商目录 fallback 修复([#6750](https://github.com/farion1231/cc-switch/pull/6750)) |
| **Qwen3.5 / Qwen3.8 hybrid** | 混合 mamba + GDN bug、非确定性([#54521](https://github.com/vllm-project/vllm/issues/54521)、[#53142](https://github.com/vllm-project/vllm/issues/53142)) | — | **静默 EOS > ~130k ctx**([#27756](https://github.com/ggml-org/llama.cpp/issues/27756)) | MLX Qwen YaRN 最高 262K([#18263](https://github.com/ollama/ollama/pull/18263)) | Qwen3.5 打包 NaN(已关闭 #4160) | — | — | — |
| **GPT-6 Astra** | — | — | — | — | — | — | **显式能力映射**([#7211](https://github.com/QuantumNous/new-api/pull/7211)) | **定价条目**([#7162](https://github.com/farion1231/cc-switch/pull/7162));用量跟踪 bug 已关闭 |
| **Gemini 3.8 Flash** | — | — | — | — | — | — | rc.33 中的变体回归(#7220) | **定价条目**([#7164](https://github.com/farion1231/cc-switch/pull/7164)) |
| **Nemotron-H(Super/Ultra)** | **MTP + 量化 lm head**([#54574](https://github.com/vllm-project/vllm/pull/54574)) | **latent MoE 融合**([#30430](https://github.com/sgl-project/sglang/pull/30430)) | — | — | — | — | — | — |
| **Gemma 4 / Gemma 3n** | **KV 共享层修复**([#54917](https://github.com/vllm-project/vllm/pull/54917));Gemma4 解析器 bug([#53431](https://github.com/vllm-project/vllm/issues/53431)) | — | — | Gemma4-12b GGUF 加载(已关闭 #6022) | — | — | — |
| **Mamba 1 / 2** | — | **推理支持 PR**([#34556](https://github.com/sgl-project/sglang/pull/34556)) | — | — | — | — | — | — |
| **Spark2.5 / SparkLLM** | — | — | **端到端**([#27868](https://github.com/ggml-org/llama.cpp/pull/27868)) | **架构请求**([#18195](https://github.com/ollama/ollama/issues/18195)) | — | — | — | — |
| **Tencent Hy4** | — | — | **预览合并**(已关闭 #28127) | — | — | — | — | — |
| **HrmText / DFM Mimir 1B** | — | — | **已添加**([#27625](https://github.com/ggml-org/llama.cpp/pull/27625)) | — | — | — | — | — |
| **LLM-jp-4** | — | **Harmony 解析器**([#38222](https://github.com/sgl-project/sglang/pull/38222)) | — | — | — | — | — | — |
| **Kimi-K3** | — | **NVFP4 + FlashInfer TRTLLM/CuTe DSL**([#38216](https://github.com/sgl-project/sglang/pull/38216));Aiter FA ROCm([#37691](https://github.com/sgl-project/sglang/pull/37691));KV 池 OOM(#38202) | — | — | — | — | — | — |
| **minimax-m3 / MiniMax-H3** | — | **diffusion 驻留规划器系列**(7 PR);Ref2VA([#35839](https://github.com/sgl-project/sglang/pull/35839)) | — | `minimax-m3:cloud` 推理 JSON 分隔 | — | — | — | — |

**今日新架构支持领跑者:** **llama.cpp** 在原始架构覆盖上领先(Spark2.5、Hy4、Mimir、GLM-5-Next)。**vLLM** 与 **SGLang** 在混合注意力 / DSA 系列上并驾齐驱,但 bug 增速超过特性增速。**Unsloth** 在原始模型覆盖上刻意保持落后——它在投入 Studio 硬化而非 LoRA 目标广度。网关层项目(**New API**、**CC Switch**)正在新前沿模型名称(Astra、3.8 Flash、GLM-5.3)的价表覆盖上展开竞速。

## 4. 性能前沿

| 优化方向 | 今日动态 | 关键数据 |
|---|---|---|
| **KV 缓存 / prefix cache** | vLLM PLE n-gram 磁盘卸载、混合 GDN prefix-cache MTP 修复、BlockStored 类型化 `extra_keys`;SGLang unified radix cache 迭代前缀哈希 + split 场景下的 SWA host-lock;Ollama MLX prefix-cache restore 8192 边界 bug;New API 与 Ability 状态的缓存对齐 | SGLang PR [#38204](https://github.com/sgl-project/sglang/pull/38204) 在深度 radix 遍历中避免 list-concat |
| **投机解码 / MTP / EAGLE / DFLASH / DSPARK** | vLLM 重度投入(PR #52244、#55575,issues #53051、#37754、#54521)以及 SGLang(issue #38202 KV 池大小,#37326 接受率衰减)。llama.cpp draft-mtp/dspark 在量化目标上的差异([#25618](https://github.com/ggml-org/llama.cpp/issues/25618)) | vLLM PR [#55575](https://github.com/vllm-project/vllm/pull/55575) 在 4×H20 上对 DeepSeek-V4 测出了 decode 与系统吞吐的提升 |
| **MoE / expert parallelism** | vLLM EPLB 感知竞争的迁移批处理([#52641](https://github.com/vllm-project/vllm/pull/52641))、批量 CUTLASS workspace 去重分配([#55579](https://github.com/vllm-project/vllm/pull/55579));SGLang GPT-OSS MoE 去重归约修复([#37199](https://github.com/sgl-project/sglang/pull/37199))与 Nemotron latent MoE 融合([#30430](https://github.com/sgl-project/sglang/pull/30430));llama.cpp IQ2_NL / IQ3_NL([#27322](https://github.com/ggml-org/llama.cpp/pull/27322)) | llama.cpp CPU tiled VNNI mul_mat:k-quants 上 **3–7×** 提速;HIP gfx1201 Q2_0:**+33–35%** token 生成 |
| **Prefill/Decode 分离 / P-D** | vLLM DSpark pipeline-parallel 目标([#53577](https://github.com/vllm-project/vllm/pull/53577));llama.cpp 分离式 P/D 仍是讨论最多的 open issue([#21266](https://github.com/ggml-org/llama.cpp/issues/21266),34 条评论);SGLang PP16 prefill 在竞争下 admission 7.8s([#38206](https://github.com/sgl-project/sglang/issues/38206)) | SGLang PP16 今日测出可观的 admission 延迟 |
| **统一内存 / 集成显卡** | SGLang GB10 上 diffusion 驻留规划器栈(7 PR);Unsloth AMD Strix Halo → Vulkan llama.cpp([#10381](https://github.com/unslothai/unsloth/pull/10381))+ 44h prompt-cache 恢复([#10382](https://github.com/unslothai/unsloth/pull/10382)) | Unsloth:在 Strix Halo 上对一个 48.8h 的会话启用 prompt cache 后节省 44h |
| **内核(CPU/GPU/Metal/Vulkan)** | llama.cpp 主导 — tiled

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

<think>The user wants me to translate the English technical report about vLLM digest into Simplified Chinese. Let me carefully translate it while:

1. Preserving Markdown structure
2. Keeping URLs, link targets, code spans, code blocks, numbers, dates verbatim
3. Keeping project names, repository slugs, usernames, version tags, file paths, API/config identifiers in original form
4. Using natural technical Chinese, register of Chinese developer newsletter

Let me translate this carefully.

Key items to keep verbatim:
- vLLM, DeepSeek-V4-Flash, Qwen3-Next, Qwen3.8-Flash-Next, Qwen3.5-122B-A10B, Nemotron-3-Super-120B-A12B-NVFP4, Gemma4, Gemma 4 E2B/E4B, Gemma 3n, AtomGit, HuggingFace, ModelScope, FlashInfer, TileLang, DeepGEMM, Triton, NIXL, Prometheus, CUTLASS, EPLB, PLE, GDN, Mamba, LoRA, NVFP4, FP8, W4A16, TP, EP, PP, DSpark, sm_90, sm_121, SM8x, SM 7.5, Blackwell, Ampere, RTX 3090, RTX 30xx, A100, A800, T4, GB10, DGX Spark, H20, etc.
- API endpoints like /v1/responses/render, /v1/chat/completions, /generate, /metrics
- Config like VLLM_USE_ATOMGIT, VLLM_PLE_DISK_OFFLOAD_DIR, NIXL_TELEMETRY_ENABLE
- Code elements like temperature=0, GQA=16, max_num_seqs, --block-size, k_proj, v_proj, k_norm, MultiModalKwargsItem, features.kwargs_data, pixel_values, BlockStored, extra_keys, tuple[Any], AsyncModelRunnerOutput, MultiprocExecutor, MambaHybridModelState, request_memory(), uniform_decode_query_len
- Issue/PR references like #50576, etc.
- File/version references like vLLM 0.27.1, Transformers v5

Let me write the translation now.</think>

# vLLM 摘要 — 2026-09-06

## 今日要点
- 围绕混合注意力/SSM 模型（Qwen3-Next、Qwen3.8-Flash-Next、DeepSeek-V4）的高强度开发 —— 大量投机解码、前缀缓存和 cudagraph 调度的 bug 被暴露或修复。
- 前端工作持续推进无 GPU 的规模化渲染：[PR #50195](https://github.com/vllm-project/vllm/pull/50195) 新增无状态的 `POST /v1/responses/render` 端点，复用 `/v1/responses` 的 prompt 渲染流程。
- 本周期集中爆发一批工具调用正确性 bug（Gemma4 解析器、Qwen2.5 解析器、OpenAI `strict` 标志透传），任何生产环境的 Agent 栈都值得排查。

## 发布与破坏性变更
- 过去 24 小时内无新版本发布。

## 新模型与硬件支持
- **[DeepSeek-V4-Flash DSpark：P/D 拆分服务中的 PP prefill]** — [PR #53577](https://github.com/vllm-project/vllm/pull/53577) 将 DSpark 扩展到流水并行目标（拆分和聚合两种模式），并增强了 padded graph batch 的安全性。
- **[Nemotron-H MTP：使用独立（可能量化）的 lm head]** — [PR #54574](https://github.com/vllm-project/vllm/pull/54574) 让 Nemotron-H MTP 可以在基础模型之上消费由 checkpoint 提供的、已量化的 lm head。
- **[Gemma 4 E2B/E4B + Gemma 3n：条件化的 KV 投影/归一化]** — [PR #54917](https://github.com/vllm-project/vllm/pull/54917) 修复了 Transformers v5 在 KV 共享层下的兼容性 —— 这些层会有意省略 `k_proj`/`v_proj`/`k_norm`。
- **[AtomGit 模型源]** — [PR #54384](https://github.com/vllm-project/vllm/pull/54384) 通过 `VLLM_USE_ATOMGIT` 将 AtomGit 作为继 HuggingFace 和 ModelScope 之后的第三个模型下载源。
- **[仍未解决：DeepSeek-V4-Flash 的 SM8x Ampere 支持]** — [Issue #50576](https://github.com/vllm-project/vllm/issues/50576)（105 条评论，👍14）—— 在 A100/A800/RTX 30xx 上都无法运行任何 DeepSeek-V4-Flash checkpoint；跟踪 #40851。

## 性能与优化
- **[DeepSeek-V4 融合 post-residual 复用：aux hidden states]** — [PR #55575](https://github.com/vllm-project/vllm/pull/55575)。在 4×H20（sm_90）、TP4+EP、DSpark K=7 概率式 + 自适应验证、KV fp8、think=off、T=0 配置下测量 —— 针对 C4（4 并发、8 请求）场景发布了前/后对照表，给出 decode tok/s 和 system tok/s 的中位数。源数据中具体数值有部分被截断，但该场景下报告了可观的 decode 和系统吞吐提升。
- **[EPLB 感知冲突的专家迁移批处理]** — [PR #52641](https://github.com/vllm-project/vllm/pull/52641)（[Issue #31671](https://github.com/vllm-project/vllm/issues/31671) 的部分修复）按有向 rank 对合并迁移，peer 上限 = 1，在异步推理继续进行的同时降低 NIC 冲突。
- **[PLE n-gram 表的磁盘卸载]** — [PR #54070](https://github.com/vllm-project/vllm/pull/54070) 引入 `VLLM_PLE_DISK_OFFLOAD_DIR`，将 PLE 投机解码流水线（源于 [PR #53899](https://github.com/vllm-project/vllm/pull/53899)）扩展到 n-gram 表，覆盖 Qwen3.8-Flash-Next 类工作负载。
- **[恢复混合 GDN 在 MTP 投机解码下的前缀缓存命中]** — [PR #52244](https://github.com/vllm-project/vllm/pull/52244)。在 Qwen3.5-122B-A10B 上，使用 1072 token 的 GDN page 时，重放的缓存 prompt 未能达到前缀缓存应有的深度，且 prompt 长度为 hash unit 倍数时命中为零；该 PR 恢复了预期的命中深度。
- **[Stat logger 插件的外部 metrics provider]** — [PR #50878](https://github.com/vllm-project/vllm/pull/50878)（Rust scheduler）新增通用的进程内 metrics provider API；外部 stat-logger 插件可定义 Prometheus 指标并通过 vLLM 现有的 `/metrics` 上报。
- **[共享 GPU 的内存预算截断]** — [PR #54932](https://github.com/vllm-project/vllm/pull/54932) 在 GPU 被另一进程（例如每卡部署两个 vLLM server）共享时，将 `request_memory()` 截断到实际可用内存。

## 稳定性与回归
按严重程度排序。在已有修复尝试处给出 PR 链接。

### 高
- **[Qwen3.8-Flash-Next：在 indexer_budget 边界处贪心解码非确定]** — [Issue #54521](https://github.com/vllm-project/vllm/issues/54521)。在 `Qwen/Qwen3.8-Flash-Next-FP8` 上，一旦 prompt 长度越过 Qwen Sparse Attention (QSA) 的 top-k 边界，五条字节完全相同的 `temperature=0` 请求会返回五种不同的补全结果。对 RL 和评测流水线的正确性/可复现性是直接打击。尚无修复 PR。
- **[FlashInfer + MTP 投机解码在 SM121（GB10 / DGX Spark）上 GQA=16 时崩溃]** — [Issue #37754](https://github.com/vllm-project/vllm/issues/37754)。服务 Nemotron-3-Super-120B-A12B-NVFP4 时报"illegal memory access"；Triton attention backend 不受影响。相关修复：[PR #53055](https://github.com/vllm-project/vllm/pull/53055) 在 DeepGEMM 不受支持时将 `mhc_pre_broadcast` 回退到 TileLang（修复 #52732，sm_121/Blackwell）。
- **[混合 mamba 在使用显式 `--block-size` 时，前缀缓存恢复出现 illegal memory access]** — [Issue #53142](https://github.com/vllm-project/vllm/issues/53142)。在 RTX 3090 上用 Qwen3.8-27B 混合 GDN/mamba、W4A16 跑 vLLM 0.27.1 —— `MambaHybridModelState.add_request` 用错误的 block size 为状态列做种子。
- **[Prefill 误派发到 spec-decode FULL cudagraph → GDN 静默丢状态，输出乱码]** — [Issue #53051](https://github.com/vllm-project/vllm/issues/53051)（混合/Qwen3-Next）。当调度 token 数等于 `uniform_decode_query_len * num_reqs` 时，一次 prefill 被当作 uniform decode 处理并进入 FULL spec-decode cudagraph，从而破坏 GDN/linear-attention 状态。

### 中
- **[OpenAI `strict` 标志在 tools 上泄露到模型可见的 chat template]** — [Issue #52741](https://github.com/vllm-project/vllm/issues/52741)。在 RTX 3090、TP=2 上通过 `/v1/chat/completions` 服务 Qwen3.6-27B-FP8 时，`tools[].function.strict` 被渲染进 prompt 并改变 tool-call 行为。影响工具调用对 OpenAI 规范的兼容性。
- **[Gemma4 工具解析器静默丢弃 `<|tool_call>:name{...}` 起始标签]** — [Issue #53431](https://github.com/vllm-project/vllm/issues/53431)。流式和非流式都既不产生 tool call 也不产生 content。
- **[Qwen2.5 工具解析器 + OpenAI content 格式导致 chat 请求失败]** — [Issue #54491](https://github.com/vllm-project/vllm/issues/54491)。
- **[当 `available Mamba cache blocks < max_num_seqs` 时引擎启动失败（混合 + LoRA）]** — [Issue #49064](https://github.com/vllm-project/vllm/issues/49064)。在带 GDN 层的 Qwen3.5/3.6 上硬性失败；建议改为自动截断并告警，而非直接终止。

### 低
- **[SM 7.5（T4）在 Qwen3.5-27B 上极慢 / 长时间挂起]** — [Issue #36589](https://github.com/vllm-project/vllm/issues/36589)（继 [Issue #36357](https://github.com/vllm-project/vllm/issues/36357) 的 SDPA 回退修复之后）。shm_broadcast 超时。
- **[采样 `max_tokens` 返回结果少 1 个 token]** — [Issue #28172](https://github.com/vllm-project/vllm/issues/28172)。

### 已关闭 / 其他
- **[已关闭] 在下次出队前释放异步 worker 的输出]** — [PR #54422](https://github.com/vllm-project/vllm/pull/54422) 已关闭。在 V1 异步调度 + 本地 `MultiprocExecutor` 下，每个 worker 会持续持有最近一次的 `AsyncModelRunnerOutput`。
- **[Offloader：prefetch static-buffer 槽位损坏]** — [PR #54975](https://github.com/vllm-project/vllm/pull/54975) 修复了当被卸载的模块数不能整除 `prefetch_step` 时的槽位归属错误。
- **[NIXL telemetry for OBJ KV 卸载层]** — [PR #55576](https://github.com/vllm-project/vllm/pull/55576)（pending）。未启用 `NIXL_TELEMETRY_ENABLE` 时，已完成的传输会在释放句柄/上报 job state 之前抛 `nixlNoTelemetryError`。
- **[批处理 CUTLASS workspace 过度分配（MoE）]** — [PR #55579](https://github.com/vllm-project/vllm/pull/55579)。当前 workspace 大小将 `M = max_tokens_per_rank * num_dispatchers` 又乘了一次 `num_dispatchers`；该 PR 去掉了重复的系数。

### 值得跟踪的开放 RFC
- **[Logprobs/Logits 在整个 vLLM 中的语义与确定性]** — [Issue #42259](https://github.com/vllm-project/vllm/issues/42259) 跟踪 Model Runner V2 跨共享采样器、前端、模型和分布式路径的正确性/确定性/API 问题。
- **[通过将 `pixel_values` 延后到 `/generate`/`/v1/responses/render` 来缩减多模态 payload]** — [Issue #46722](https://github.com/vllm-project/vllm/issues/46722) 加已关闭的实现 [PR #54659](https://github.com/vllm-project/vllm/pull/54659)。当前渲染流程会把完整的 `MultiModalKwargsItem` 序列化进 `features.kwargs_data`；该 PR 把 `pixel_values` 从该 blob 中移除。
- **[为 `BlockStored` KV 事件发布强类型的 `extra_keys`]** — [PR #55488](https://github.com/vllm-project/vllm/pull/55488) 关闭了 [Issue #55487](https://github.com/vllm-project/vllm/issues/55487) —— 当前以原始的 `tuple[Any]` 形式发布且无版本号，导致下游集群路由器无法可靠解析。

## 对应用开发者的影响
- **Qwen3.8-Flash-Next 上的采样一致性与 RL 可复现性面临风险**，特别是当 prompt 越过 QSA `indexer_budget` 边界时（[#545

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

<think>The user wants me to translate a technical report from English to Simplified Chinese. I need to:
1. Preserve Markdown structure exactly
2. Keep URLs, code spans, version tags, file paths, API/config identifiers in original form
3. Keep issue/PR references as-is
4. Use natural technical Chinese appropriate for a developer newsletter
5. Output ONLY the translation, no preamble or explanation

Let me carefully translate the content while preserving all technical terms, URLs, version numbers, and proper nouns.</think>

# SGLang 每日速览 — 2026-09-06

## 今日要点

仓库活跃度主要集中在两条主线：一是 **GLM-5.3-Flash / DSA** 在 Blackwell 架构硬件（SM120 RTX PRO 6000、SM100/B300、SM103）上的持续稳定性工作；二是面向统一内存设备（DGX Spark / GB10）的大型 **diffusion 驻留规划器（residency planner）系列**，目标是 MiniMax-H3。今日新落地三个 bug（#38202、#38206、#38210），分别涉及 DP-Attention 的 KV 预算、PP16 分离式 prefill 准入以及 OpenTelemetry tracing，生产环境部署都值得重点关注。

## 发布与不兼容变更

过去 24 小时无新发布。Issue 流中引用的近期已标记版本：v0.5.11、v0.5.12-cu130、v0.5.14、v0.5.18、v0.5.19。

## 新模型与硬件支持

- **Mamba 1 / Mamba 2 推理** — Intel 提交的 support PR（[#34556](https://github.com/sgl-project/sglang/pull/34556)）。
- **T-Head PPU**（ZW810 / ZW810E / ZW-M890P）— 一类上游 roadmap 已提出（[#37519](https://github.com/sgl-project/sglang/issues/37519)）。
- **NVFP4 MoE dispatch** — 支持标准 FlashInfer TRTLLM 与 CuTe DSL 后端（[#38216](https://github.com/sgl-project/sglang/pull/38216)）。
- **LLM-jp-4** — Harmony 兼容的 reasoning + 工具调用 parser（[#38222](https://github.com/sgl-project/sglang/pull/38222)）。
- **Apple Silicon (MLX)** — RFC 提议采用 Torch 主控的 SRT 路径，并导出整模型 MLX 区域（[#32321](https://github.com/sgl-project/sglang/issues/32321)）；MLX scheduler profiler 在 mock 的 Metal capture 下修复中（[#30550](https://github.com/sgl-project/sglang/issues/30550)）；`test_batched_decode_matches_solo` 被标记为对 batch shape 多变的后端过于严格（[#32441](https://github.com/sgl-project/sglang/issues/32441)）。
- **MUSA / Moore Threads** — 安装指南与 Dockerfile（[#36709](https://github.com/sgl-project/sglang/pull/36709)）。
- **AMD ROCm** — Aiter FA 分块 KV 路径支持 Kimi-K3（[#37691](https://github.com/sgl-project/sglang/pull/37691)）。

## 性能与优化

- **Diffusion 驻留规划器**（MiniMax-H3, GB10）：由 `mickqian` 主导的堆叠系列 —— 基础规划器（[#36703](https://github.com/sgl-project/sglang/pull/36703)）、单次迭代探针校准并遵循 pipeline-step 最小值（[#37809](https://github.com/sgl-project/sglang/pull/37809)）、统一内存下的单池规划器模型（[#37811](https://github.com/sgl-project/sglang/pull/37811)）、文件支撑的融合权重 home（[#37819](https://github.com/sgl-project/sglang/pull/37819)）、只读 checkpoint 映射（[#37822](https://github.com/sgl-project/sglang/pull/37822)）、共享池 O_DIRECT 流式读取（[#37680](https://github.com/sgl-project/sglang/pull/37680)）、以及无 D2H 组件卸载（[#36727](https://github.com/sgl-project/sglang/pull/36727)）。
- **MiniMax-H3 Ref2VA** — 可配置参考图像尺寸调整（[#35839](https://github.com/sgl-project/sglang/pull/35839)）；通过融合的 `TensorExprGroup` 修复首请求与后续请求音频确定性差异（[#38225](https://github.com/sgl-project/sglang/pull/38225)）。
- **Unified radix cache** — 迭代式前缀哈希收集（在深路径遍历时避免 list-concat），覆盖 unified、legacy 以及 Mamba radix 节点（[#38204](https://github.com/sgl-project/sglang/pull/38204)）；节点分裂时保留 SWA host-lock（[#38138](https://github.com/sgl-project/sglang/pull/38138)）。
- **GPT-OSS MoE** — 修复 DP attention 下 MoE 归约重复的 bug（[#37199](https://github.com/sgl-project/sglang/pull/37199)，标记 `high priority`）。
- **Nemotron Ultra latent MoE** — 路由 MoE 投影与共享专家 add 融合（[#30430](https://github.com/sgl-project/sglang/pull/30430)）。
- **Config 系列 Round 6** — 仅供评审的合并 5-PR diff（[#38114](https://github.com/sgl-project/sglang/pull/38114)）。

## 稳定性与回归问题

**关键 / 今日新增：**
- **DFLASH / DSPARK draft KV 池** 在 DP attention 下使用 `tp_size` 而非 `attn_tp_size`，导致 Kimi-K3 上 OOM（[#38202](https://github.com/sgl-project/sglang/issues/38202)）。暂无修复 PR。
- **PP16 分离式 prefill** — 高并发 prefill 下，bootstrap 准入需等待约 7.8s 才达成共识（[#38206](https://github.com/sgl-project/sglang/issues/38206)）。暂无修复 PR。
- **OpenTelemetry tracing** 在 `--tokenizer-worker-num > 1` 时丢失 Scheduler spans（[#38210](https://github.com/sgl-project/sglang/issues/38210)）。暂无修复 PR。
- **GLM-5.3 DPC** 崩溃（[#38207](https://github.com/sgl-project/sglang/issues/38207)）。暂无修复 PR。

**高影响未修复 bug：**
- **GLM-5.3-Flash / DSA 在 RTX PRO 6000 (SM120) 上** — 在一次 `deep_gemm` NameError 之后又出现两个后端阻塞（[#37105](https://github.com/sgl-project/sglang/issues/37105)）；HiCache host 层 load-back 会损坏生成结果（工具调用丢失、生成循环），即便未启用 speculative decoding 也会出现（[#38031](https://github.com/sgl-project/sglang/issues/38031)）；在 pipeline parallelism 下启动时崩溃，报 `KeyError: 'residual'`（[#36906](https://github.com/sgl-project/sglang/issues/36906)）。追踪 umbrella： [#37524](https://github.com/sgl-project/sglang/issues/37524)、[#37813](https://github.com/sgl-project/sglang/issues/37813)。
- **MiniMax-M3 W4A16 在 2× DGX Spark（SM121, TP=2）上** — Triton MiniMaxSparse 路径下每个 token 都为 id 0；相同权重在 vLLM 上结果正确（[#38143](https://github.com/sgl-project/sglang/issues/38143)）。
- **DeepSeek-V4-Flash-Vision-Exp 在 2× DGX Spark 上** — 权重加载阶段进行 FP8→FP4 MoE 转换时，scheduler 被 OOM-killed（5/5 次复现，cookbook cell `dgx-spark|flash-vision|fp4`）（[#37931](https://github.com/sgl-project/sglang/issues/37931)）。
- **DeepSeek-V4 长上下文 prefill** — DSA indexer top-k kernel 出现非法内存访问（`topk_v1.cuh:348`）；paged prefill 无法命中 v2 kernel（[#37892](https://github.com/sgl-project/sglang/issues/37892)）。
- **qwen4_exp NEXTN/MTP draft** — 接受率随服务运行时长衰减到 ~0，重启后完全恢复（[#37326](https://github.com/sgl-project/sglang/issues/37326)）。

**CI / 基础设施：**
- 截至 2026-09-06 14:59 UTC，追踪 issue 显示 5 个失败 / 13 个 flaky / 944 个近期已修复（[#17050](https://github.com/sgl-project/sglang/issues/17050)）。

**近期转入不活跃（已关闭）：** GLM-5-NVFP4 + EAGLE 在 B300 sm_103 上 dispatch 崩溃（[#25563](https://github.com/sgl-project/sglang/issues/25563)）；Qwen3.6/GDN LoRA 启动崩溃（[#30168](https://github.com/sgl-project/sglang/issues/30168)）；Qwen3-VL 图像描述不匹配（[#24029](https://github.com/sgl-project/sglang/issues/24029)）；Step-3.5-Flash EAGLE eager KV batch size 不匹配（[#30354](https://github.com/sgl-project/sglang/issues/30354)）；ROCm 多模态 CUDA-IPC 溢出跟进（[#29687](https://github.com/sgl-project/sglang/issues/29687)）；DGX Spark SM121 aarch64 wheel 缺失（[#29317](https://github.com/sgl-project/sglang/issues/29317)）；NPU MoE Q2 roadmap（[#22521](https://github.com/sgl-project/sglang/issues/22521)）；`glm-5.2-w4afp8` 分块 prefill/GEMM warmup（[#29358](https://github.com/sgl-project/sglang/issues/29358)）；`HostSharedMemoryManager` 资源泄漏（[#30428](https://github.com/sgl-project/sglang/issues/30428)）；KVTC 压缩 RFC（[#30419](https://github.com/sgl-project/sglang/issues/30419)）。

## 对应用开发者的影响

- **Blackwell 生产风险：** GLM-5.3-Flash / DSA 在 SM120、SM100 与 SM103 上仍存在开放的正确性 bug —— 包括静默损坏（HiCache load-back 导致工具调用丢失与生成循环）。如果你的 agent 流量走的是 speculative decoding + HiCache 路径，上线前务必对该模型族的输出做审计。
- **DGX Spark / GB10 仍不成熟：** MiniMax-M3 W4A16 在 Triton sparse 路径下输出全 NUL token；DeepSeek-V4-Flash-Vision-Exp 在官方 cookbook cell 的权重加载阶段 OOM。对于统一内存部署，优先选择已有 SM121 验证的模型，或将 vLLM 作为回退方案。
- **DP attention KV 预算：** draft KV 池中 `tp_size` 与 `attn_tp_size` 取值错误，会在 DP-attention 集群上静默触发 OOM —— 任何 Kimi-K3 / DFLASH / DSPARK 的 speculative-decoding 灰度都需关注。
- **PP 分离式 prefill：** 当前高并发下 PP16 的准入延迟最高可达约 7.8s；在做 prefill worker 容量规划前，请持续跟踪 [#38206](https://github.com/sgl-project/sglang/issues/38206)。
- **可观测性缺口：** `--tokenizer-worker-num > 1` 时 OTel tracing 会丢失 Scheduler spans；若依赖 OTel 做延迟归因，在 [#38210](https://github.com/sgl-project/sglang/issues/38210) 修复前请固定 `tokenizer-worker-num=1`。
- **Apple Silicon 仍处于 roadmap 阶段**，并非已支持的生产路径 —— 目前尚无合并的端到端 serving 路径。新 RFC（[#32321](https://github.com/sgl-project/sglang/issues/32321)）预示了一次围绕 Torch 主控 SRT 核心并导出 MLX region 的重新设计，未来落地后将对 Mac/Apple-Silicon 推理目标产生实质意义。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

<think>The user wants me to translate the English technical report into Simplified Chinese. I need to:
1. Output ONLY the translation, no preamble or explanation
2. Preserve Markdown structure exactly
3. Keep URLs, link targets, code spans, code blocks, numbers and dates verbatim
4. Keep project names, repository slugs, usernames, version tags, file paths and API/config identifiers in original form
5. Use natural technical Chinese, register of a Chinese developer newsletter

Let me translate carefully, preserving all technical terms, URLs, code blocks, etc.</think>

# llama.cpp 摘要 — 2026-09-06

## 今日要点

过去 24 小时发布了四个 b 编号构建（b10821–b10825），节奏密集；其中重点包括针对 M2 Max 的 Metal flash-attention 向量化调优，以及一次彻底移除 C++ gzip 辅助工具的 UI 构建系统重构。模型层面，**GLM-5-Next (GLM-5.3-Flash)**、**Spark2.5**、**HrmText (DFM Mimir 1B)** 以及 **Tencent Hy4** 都推进了转换/加载流程。工程上最重要的信号是一条基于 VNNI 的全新分块 CPU `mul_mat` 路径，针对 k-quants 报告 **3–7 倍** CPU matmul 加速，外加针对 gfx1201 (RDNA4) 的 HIP Q2_0 微优化，带来 **约 33–35% 的 token 生成提速**。

## 发布与破坏性变更

过去 24 小时落地了四个构建：

- **b10825** — `grammar`：修复最大重复阈值（[#28469](https://github.com/ggml-org/llama.cpp/pull/28469)）。可能修正了一个边界问题：当 `maxRepetition` 设置过高时，重复惩罚实际上被完全禁用。
- **b10823** — `common`：新增 `--log-jsonl` 标志（[#28437](https://github.com/ggml-org/llama.cpp/pull/28437)）。输出结构化 JSONL 日志；该补丁同时将日志 schema 中的 `unknown` 重命名为 `none`。任何在解析日志的下游消费者都需要相应更新。
- **b10822** — `ui`：使用 CMake 直接嵌入资源（[#28445](https://github.com/ggml-org/llama.cpp/pull/28445)）。移除了构建期的 C++ 辅助工具以及外部 `gzip` 依赖，简化了交叉编译（尤其是 Android/iOS）。运行时无变化。
- **b10821** — `metal`：补齐 M2 Max 的 fa-vec 调优（[#28458](https://github.com/ggml-org/llama.cpp/pull/28458)）。仅性能改动。

## 新模型与新硬件支持

- **GLM-5-Next / GLM-5.3-Flash** — 321.3B 混合线性/稀疏注意力 MoE + 视觉塔（[#27754](https://github.com/ggml-org/llama.cpp/pull/27754)）。注意在 [#28251-相关] 的 cublas TF32 处理在 `ggml-cuda/common.cuh` 中修复前，需要设置 `NVIDIA_TF32_OVERRIDE=0` 环境变量。
- **Spark2.5ForCausalLM** — 端到端转换 + 张量映射 + 分词器（[#27868](https://github.com/ggml-org/llama.cpp/pull/27868)）。
- **Tencent Hy4（`hy_v4`）** — 预览架构支持已合并关闭（[#28127](https://github.com/ggml-org/llama.cpp/pull/28127)）。
- **HrmText（DFM Mimir 1B）** — 在共享 token 流上交替进行低/高周期，并采用融合的 `gqkv` 投影（[#27625](https://github.com/ggml-org/llama.cpp/pull/27625)）。
- **量化类型** — `IQ2_NL` 与 `IQ3_NL`（256 元素超块）在 [#27322](https://github.com/ggml-org/llama.cpp/pull/27322) 中开放，允许 `ncols % 256 == 0` 的张量使用主流 I-quant 而非回退到 32 块类型。
- **ROCm/HIP** — HIP AllReduce 重新启用，因为上游现已具备 host-pinned 内存 API（[#27825](https://github.com/ggml-org/llama.cpp/pull/27825)）。
- **RPC / RDMA** — 为不发布 IP 映射 GID 的 iWARP fabric 新增 `rdma_cm` 回退路径（[#28494](https://github.com/ggml-org/llama.cpp/pull/28494)）。
- **CPU 后端** — `GET_ROWS_BACK` 新增 BF16 支持（[#28493](https://github.com/ggml-org/llama.cpp/pull/28493)）；Kronecker 积已实现以支持非 2 的幂次维度（[#28490](https://github.com/ggml-org/llama.cpp/pull/28490)）。

## 性能与优化

- **CPU `mul_mat`（k-quants），分块 VNNI** — 通用 256×256 int8 分块路径取代了逐量化类型的 unpack 循环（[#27851](https://github.com/ggml-org/llama.cpp/pull/27851)）。作者报告在 k-quants 上 CPU matmul **加速 3–7 倍**。对于跑 CPU 或 CPU+GPU 混合服务器的用户来说，这是今日最具影响力的性能 PR。
- **HIP gfx1201（RDNA4）** — 用原生字节置换指令替代 HIP 的通用 Q2_0 permute（[#26753](https://github.com/ggml-org/llama.cpp/pull/26753)）。Q2_0 下 **token 生成速度提升约 33–35%**；已对全部 65,536 个打包 Q2 值进行校验。
- **gfx1201 上的 Flash Attention** — 为新 R9700 PRO 提供按架构的 FA 调优，并修复了 head-size 256 的 bug（[#28102](https://github.com/ggml-org/llama.cpp/pull/28102)）。作者提到此前"在较长上下文上的 prefill 性能惨不忍睹"。
- **Metal M2 Max fa-vec** — b10821 发布剩余调优（[#28458](https://github.com/ggml-org/llama.cpp/pull/28458)）。
- **Vulkan** — UNARY(GELU|SIGMOID|SILU|SOFTPLUS) + MUL 融合对齐 CUDA 的 `unary_mul`（[#27220](https://github.com/ggml-org/llama.cpp/pull/27220)）；MMVQ 路径选择与 batch size 解耦（[#28489](https://github.com/ggml-org/llama.cpp/pull/28489)）。
- **AMD GCN MMQ 配置** — 按架构配置，避免 GCN 回退到 RDNA2 wave32 路径（[#27841](https://github.com/ggml-org/llama.cpp/pull/27841)）。
- **`llama-bench --bandwidth`** — 新增可选列，输出估算的模型权重 GB/s（[#28459](https://github.com/ggml-org/llama.cpp/pull/28459)）。

## 稳定性与回归

按严重程度（运维影响）排序：

1. **Qwen3.5-hybrid（Qwen3.8-27B）在 ~130k 上下文之后静默立即 EOS**，CUDA 与 CPU 均出现（[#27756](https://github.com/ggml-org/llama.cpp/issues/27756)）。复现条件：64 层 DeltaNet 类模型，与 recurrent state 深度 × 层数退化一致。暂无关联修复 PR。**建议**：限制上下文长度或拆分模型。
2. **Blackwell GGML-CUDA SOFT_MAX 崩溃**，出现在 RTX 5090 / CUDA 13.3（[#25060](https://github.com/ggml-org/llama.cpp/issues/25060)）。补丁已提交但尚未合并。
3. **CUDA graphs 在 RTX 5090 Laptop（sm_120）上挂起 GPU**，伴随 Xid 8 / RC watchdog（[#27330](https://github.com/ggml-org/llama.cpp/issues/27330)）。**临时方案**：`GGML_CUDA_DISABLE_GRAPHS=1`。
4. **SYCL/OpenCL 多 GPU Arc 上的 P2P 崩溃** — `dev2dev_memcpy` 触发 `Experimental P2P feature is not implemented for OpenCL adapter`（[#27168](https://github.com/ggml-org/llama.cpp/issues/27168)）。
5. **投机解码（draft-mtp / draft-dspark）在量化目标上的 greedy 发散** — draft 运行在 temperature 0 时与 vanilla 结果不一致（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)）。Vulkan MMVQ PR [#28489](https://github.com/ggml-org/llama.cpp/pull/28489) 覆盖了部分场景；更广泛的修复仍在进行中。
6. **MSVC 在支持的 CPU 上未自动检测 AVX-VNNI**（[#28295](https://github.com/ggml-org/llama.cpp/issues/28295)）— Windows 构建上存在静默的性能损失。
7. **json-schema-to-grammar：嵌套 `maxLength >= 2000` 输出无法解析的 GBNF**（[#25746](https://github.com/ggml-org/llama.cpp/issues/25746)，已关闭）以及相关的 **空对象 + 大 maxLength** 一类问题（[#25923](https://github.com/ggml-org/llama.cpp/issues/25923)）— 都会破坏服务端的工具调用 grammar 生成。
8. **SYCL 多 GPU 主机侧 GTT mirror 在 `free`/`VmRSS` 中不可见**（[#22116](https://github.com/ggml-org/llama.cpp/issues/22116)，已关闭）— 属于运维记账问题，不会崩溃。
9. **`llama-ui` 的 reasoning 级别菜单在桌面端无法打开**（[#27981](https://github.com/ggml-org/llama.cpp/issues/27981)）。
10. **`common_peg_until_parser` 在最后一次（非宽松）解析中，当分隔符缺失时返回 SUCCESS**（[#27772](https://github.com/ggml-org/llama.cpp/issues/27772)）— PEG 解析器在工具模板中的正确性 bug。

长期路线图项目也有进展：**`llama-server` 的解耦 prefill/decode**（[#21266](https://github.com/ggml-org/llama.cpp/issues/21266)，34 条评论，👍15）仍是讨论最多的开放 issue；**REST API changelog**（[#9291](https://github.com/ggml-org/llama.cpp/issues/9291)）以及 **libllama API changelog**（[#9289](https://github.com/ggml-org/llama.cpp/issues/9289)）仍是追踪破坏性变更的权威入口。

## 对应用开发者的影响

- **服务端运维**：若你将日志接入任何结构化系统，请切换到 `--log-jsonl`（b10823）；任何消费 `unknown` 字段的下游请改为 `none`。升级到 b10825 以获取 grammar 重复阈值修复。
- **工具调用**：若你使用 OpenAI 兼容端点服务较复杂的 JSON Schema（`maxLength`、嵌套对象、大型工具列表），将暴露在 [#25746](https://github.com/ggml-org/llama.cpp/issues/25746) 与 [#25923](https://github.com/ggml-org/llama.cpp/issues/25923) 的 GBNF 生成 bug 下。部署新构建前，请用最恶劣的 schema 进行测试。
- **Qwen3.5-hybrid 长上下文工作负载**：在 [#27756](https://github.com/ggml-org/llama.cpp/issues/27756) 定位完成前，避免将其推到 ~130k tokens 之后 — 输出可能静默进入 EOS。
- **量化目标上的投机解码**：即使在 greedy/top_k=1 下，也请把 draft 输出视为非 bit-exact（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)）；不要将其用于确定性测试。
- **Apple Silicon**：b10821 完成了 M2 Max fa-vec 覆盖 — 值得在 M2 Max 硬件上重新跑一遍基准。
- **交叉编译 / CI**：新的 CMake UI 资源嵌入（[#28445](https://github.com/ggml-org/llama.cpp/pull/28445)）移除了 CI 镜像上的 `gzip` 构建前置依赖，并简化了 Android/iOS 工具链。
- **路线图信号**：解耦 prefill/decode（[#21266](https://github.com/ggml-org/llama.cpp/issues/21266)）是 `llama-server` 的下一个重大架构演进。任何在为高并发推理规划容量的人都应关注这条主线。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

<think>The user wants me to translate the English technical report into Simplified Chinese. I need to:
1. Preserve Markdown structure exactly
2. Keep URLs, link targets, code spans, code blocks, numbers and dates verbatim
3. Keep project names, repository slugs, usernames, version tags, file paths and API/config identifiers in their original form
4. Use natural technical Chinese register of a Chinese developer newsletter
5. Output ONLY the translation, no preamble or explanation
6. No markdown fences around the whole output

Let me carefully translate this technical content maintaining the structure and the English identifiers as specified.</think>

# Ollama 日报 — 2026-09-06

## 今日要点
v0.34.0-rc1 在 MacOS 上的 ChatGPT Desktop 中原生支持 Ollama 模型,并改善了 Apple Silicon 上的结构化输出性能。在此次发布的背后,MLX runner 的正确性修复占据了今日主线:`num_ctx` 强制执行、Qwen YaRN 上下文扩展至 262K 以上,以及若干 MLX 模型长期卡在 "Stopping..." 状态的紧急修复均已落地或取得进展。llama-server 侧的内存治理也有进展,新增 `OLLAMA_CACHE_RAM` 配置项以约束 8 GiB prompt cache 占用,长期呼声最高的 Prometheus `/metrics` 端点也已出现可运行 PR。

## 发布与破坏性变更
- **v0.34.0-rc1** — [Ollama 模型现可在 MacOS 的 ChatGPT Desktop 中运行](https://github.com/ollama/ollama)(发布说明已截断)。据报告 Apple Silicon 上的结构化输出性能有所提升;在从 0.33.x 升级之前,建议 macOS 用户端到端验证 JSON/函数调用工作流。
- 未标注 CLI/REST 弃用项;launch 包装器(`ollama launch codex`、`ollama launch qwen`、`ollama launch claude`)正在接收上下文对齐修复(见下方 PR),这些改动可能会影响对外声明的上下文窗口。

## 新增模型与硬件支持
- **新架构请求**:[`spark2_5`](https://github.com/ollama/ollama/issues/18195)(SparkLLM/Spark-X2.5-4B/-1.7B)——`ollama run` 可下载权重,但推理失败,因为运行时尚不识别该架构。
- **GLM-OCR 修复进行中**:[PR #17195](https://github.com/ollama/ollama/pull/17195) 将 `<|user|>` 注册为旧版 `glmocr` GGUFs 的 EOT,此前会出现输出失控。
- **MLX runner — Qwen YaRN**:[PR #18263](https://github.com/ollama/ollama/pull/18263) 解析 Qwen3.5/3.8 的静态 YaRN 元数据,并支持最大至 `factor * original_max_position_embeddings` 的上下文;参见下方的回归说明。
- **Vulkan/AMD iGPU**:[Issue #18272](https://github.com/ollama/ollama/issues/18272) 报告自 v0.32.12 起加载 66 GB 模型出现回归(报告"Not enough memory for command submission");暂无修复 PR。

## 性能与优化
- **MLX runner — 强制上下文长度**:[PR #18261](https://github.com/ollama/ollama/pull/18261)(今日已关闭)将调度器选择的 `num_ctx` 传递给 MLX 子进程,并将有效限制回填到 `/api/ps`,消除了超出架构上限的过度分配。
- **MLX prefix-cache 恢复修复**:[Issue #18267](https://github.com/ollama/ollama/issues/18267) 记录了每次冷启动回合固定 17–27 秒的 re-prefill 开销,因为缓存恢复总是落在 8192 token 边界(最多丢失 8191 token)。暂无 PR——若你在本地模型上跑 agent 循环(如 Claude Code),建议持续关注。
- **Codex CLI / Qwen Code 上下文对齐**:[PR #18259](https://github.com/ollama/ollama/pull/18259) 使已验证的本地 runner 上下文优先级高于 Codex 的 128K fallback;[Issue #18256](https://github.com/ollama/ollama/issues/18256) 报告 `ollama launch qwen` 存在相同缺陷(Qwen Code 使用了它的 1M token 默认值)。
- **Renderer → llama-server 检查点分隔符**:[PR #18271](https://github.com/ollama/ollama/pull/18271) 将 `message_delimiters` 转发给 llama-server,以便在 Go 端渲染 prompt 时真正能够创建用户回合检查点。
- **search 命令**:[PR #10046](https://github.com/ollama/ollama/pull/10046)——新增 CLI search,可在不拉取 tag 的情况下查找/列出模型。
- **指标端点**:[PR #16998](https://github.com/ollama/ollama/pull/16998)——通过 `OLLAMA_METRICS=1` 启用的 `GET /metrics`,暴露 `ollama_requests_queued`、`ollama_queue_capacity`、`ollama_models_loaded`、`http_requests_total` 以及按模型/token 的指标(对应长期悬而未决的 [Issue #3144](https://github.com/ollama/ollama/issues/3144))。

## 稳定性与回归
按今日用户影响排序:

1. **[回归] Vulkan 后端在 AMD iGPU 上加载大模型失败** —— [Issue #18272](https://github.com/ollama/ollama/issues/18272)。在 v0.32.9 中可用,从 v0.32.12 起加载 66 GB 模型失败,报"Not enough memory for command submission"。**暂无修复 PR。** 临时方案:AMD iGPU + ≥66 GB 工作负载请停留在 v0.32.9。
2. **[云端] `kimi-k2.6:cloud` 延迟 / `INTERNAL_ERROR`** —— [Issue #16845](https://github.com/ollama/ollama/issues/16845)。单次请求超过 10 分钟,流式 `INTERNAL_ERROR` 在多天内反复出现。暂无修复 PR。
3. **[云端] `glm-5.3:cloud` 陷入无止境推理 / 任务中止** —— [Issue #18193](https://github.com/ollama/ollama/issues/18193)。在 OpenCode 和 ZCode 中均可复现;上游 Z.AI 未受影响。暂无修复 PR。
4. **[云端] 推理 JSON 在 `reasoning` 与 `content` 之间被拆分** —— [Issue #17987](https://github.com/ollama/ollama/issues/17987)。自约 2026-08-22 起,`minimax-m3:cloud` 在 `/v1/chat/completions` 中间歇性地将 JSON 拆分到这两个字段;仅 `content` 不是合法 JSON。暂无修复 PR——**应用代码必须在解析前拼接两者**。
5. **[MLX] `muse-glimmer:30b-mlx` 卡在 "Stopping..."** —— [Issue #18269](https://github.com/ollama/ollama/issues/18269)。在各种 `OLLAMA_KEEP_ALIVE` 值下均存在;曾出现需要完整重启 macOS 的情况。暂无修复 PR。
6. **[llama-server] 无上限的 prompt cache(8 GiB 主机内存)** —— [Issue #18264](https://github.com/ollama/ollama/issues/18264)(已关闭)。根因:llama.cpp 默认 `--cache-ram=8192 MiB` 处于 Ollama 内存核算之外。**修复 PR #18265** 引入 `OLLAMA_CACHE_RAM` 进行约束。
7. **[MLX] `num_ctx` 未强制执行 → Metal watchdog 崩溃** —— [Issue #18125](https://github.com/ollama/ollama/issues/18125)。**修复 PR #18261** 已落地(今日关闭)。
8. **[MLX] Qwen YaRN 在 262K 以上被忽略** —— [Issue #18262](https://github.com/ollama/ollama/issues/18262)。**修复 PR #18263** 审核中。
9. **[下载] 进度回退** —— [Issue #8484](https://github.com/ollama/ollama/issues/8484) 今日关闭。历史悠久但讨论量高。
10. **[长期悬而未决] 下载时 `digest mismatch`** —— [Issue #941](https://github.com/ollama/ollama/issues/941)。在 162 条评论之后仍未关闭;罕见但持续存在。
11. **[许可] 静态链接 llama.cpp 缺少 MIT 声明** —— [Issue #3185](https://github.com/ollama/ollama/issues/3185)(272 👍)。暂无修复 PR;与再分发场景相关。

## 对应用开发者的含义
- **ChatGPT Desktop 集成(0.34.0)** 开放了一个第三方客户端接入面;若你面向 MacOS 知识工作者,用户大概率会询问如何将开放模型接入他们现有的 ChatGPT 工作流——提前规划 MacOS 限制。
- **云端推理模型已不适合直接解析。** `minimax-m3:cloud`、`glm-5.3:cloud` 与 `kimi-k2.6:cloud` 在今日均出现了新故障模式:JSON 字段被拆分、无止境推理循环、10 分钟以上延迟。请务必(a) 在 JSON 解析前合并 `message.reasoning` 与 `message.content`,(b) 将请求超时设得足够激进,(c) 将云端 `:cloud` 模型视为尽力而为。
- **MLX/Apple Silicon 仍处于快速迭代期。** 三个并行的 issue(#18125、#18262、#18267、#18269) 提示在 Mac 上升级到 0.34.0-rc1 是值得的,但在发布前请验证长上下文的 Qwen 任务以及任何 agent 循环型负载——#18267 带来的固定 17–27 秒 re-prefill 尚未修复。
- **完全 GPU offload 模型的内存核算终于可被管理。** PR #18265 的 `OLLAMA_CACHE_RAM` 配置项允许你约束 llama-server prompt cache 在主机内存上产生的 8 GiB 影子占用——请在生产的 systemd unit 中显式设置。
- **可观测性更进一步。** PR #16998 的 `OLLAMA_METRICS=1` Prometheus 端点是自 2024 年 #3144 提出以来团队一直期待的能力。即使尚未合并,也建议先 review,以便合入当日即可接入 dashboard。
- **Launch 包装器正在被改造为尊重真实本地上下文。** 一旦 #18259(Codex)及 Qwen Code 的对应修复落地,下游 agent 将不再悄悄假设 128K / 1M 窗口并因此降级其压缩策略——但今天仍应在 launch 配置中显式设置 `model_context_window`,以避免意外。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

<think>The user wants me to translate an English technical report (LiteLLM digest) into Simplified Chinese. Let me carefully translate while preserving the Markdown structure, URLs, code, version numbers, and technical identifiers exactly as they appear.

I need to:
1. Translate the prose into natural technical Chinese
2. Keep all Markdown formatting intact (headings, lists, bold, etc.)
3. Preserve URLs, code spans, version numbers, issue/PR numbers verbatim
4. Keep project names, usernames, API endpoints in original form
5. Use natural Chinese technical newsletter register

Let me work through each section carefully.</think>

# LiteLLM 每日摘要 — 2026-09-06

## 1. 今日要点

LiteLLM 在过去 24 小时内发布了 **v1.100.0 稳定版** 与 **v1.101.0-rc.1**，并伴随着一波大规模的 **Rust/原生桥接重构**（来自 `yujonglee-berri` 的 10+ 个开放 PR），将提供商选择、OCR、回调、鉴权与 WebSocket 生命周期统一整合进 Rust 核心，同时收窄 Python 的暴露面。Bug 方面关注重点集中在 **预算强制执行正确性**（`/v1/messages` 上的误报 `Budget exceeded`、通过 `custom_cost_per_token` 对 Anthropic 缓存读取 token 的重复计费、以及一个不会重置的进程级成本上限）、**Bedrock 清理问题**（不支持文件删除）以及 `/v1/responses` 上长期存在的 **WebSocket 规范不兼容**。

## 2. 版本发布与破坏性变更

- **v1.100.0（稳定版）** —— [Release](https://github.com/BerriAI/litellm/releases/tag/v1.100.0)。Docker 镜像使用 cosign 签名（密钥来自提交 `0112e53`），可通过 [sigstore 文档](https://docs.sigstore.dev/cosign/overview/) 进行校验。
- **v1.101.0-rc.1（候选发布版）** —— [Release](https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.1)。采用相同的 cosign 签名策略。在 GA 之前，请将 RC 视为未达到生产就绪状态。

**需要关注的隐式破坏性变更（针对 v1.100 校验）：**
- 从基础镜像 1.95.1 升级到 1.99.0 时，MCP 托管 OAuth2 流程打开的是 LiteLLM UI 而非供应商认证页面（[#39665](https://github.com/BerriAI/litellm/issues/39665)，现已 CLOSED）。
- 正在合并的 `refactor(rust)` PR（例如 [#39928](https://github.com/BerriAI/litellm/pull/39928)）将逐路由的 `Rust` 启用参数收敛为单一的全局开关 `litellm.rust(bool)` / `LITELLM_RUST`。原先按请求传入 Rust 开关的代码将被静默忽略。

## 3. 新增模型与硬件支持

- **Cloudflare Workers AI rerank**，通过 `/ai/run` 接入 —— 新增 Cloudflare 提供商目标，弥补了 `openai/` 风格 rerank 适配层不适用的空白（[#40053](https://github.com/BerriAI/litellm/pull/40053)，feat）。
- **Bedrock Voxtral 音频转录** —— 修复移除了导致请求体返回 400 的 system 消息（[#39806](https://github.com/BerriAI/litellm/pull/39806)）。
- **Azure Document Intelligence** 原生 OCR 输出现在走的是一条支持提供商识别的准入路径（[#39939](https://github.com/BerriAI/litellm/pull/39939)）。
- 本时间窗口内没有新的 CPU/CUDA/ROCm/Metal/量化相关工作合入。

## 4. 性能与优化

- **Prometheus：按输入序列长度分桶的延迟指标**（[#40059](https://github.com/BerriAI/litellm/pull/40059)）。可选的标签会暴露 prompt 大小桶，从而让 TTFT 对比不再混淆短 prompt 与长 prompt；默认情况下既有的指标标签保持不变。
- **原生执行边界收紧** —— Python 现在 **仅** 在 `RustBridgeDeclined` 时回退，避免对原生失败进行隐式的 Python 重放（[#39923](https://github.com/BerriAI/litellm/pull/39923)）。
- **以类型化执行降级取代预检 API**（[#39986](https://github.com/BerriAI/litellm/pull/39986)），以及 **request/context 类型化分离**（[#39941](https://github.com/BerriAI/litellm/pull/39941)）—— 减少 Rust 桥接中重复的准入检查。
- **从 `python-bridge` 中移除 `ai-gateway` 依赖**（[#40054](https://github.com/BerriAI/litellm/pull/40054)）—— 在核心中统一 OCR 与 WebSocket 生命周期归属，减少跨进程协调开销。
- **原生提供商请求的一次性鉴权**（[#40055](https://github.com/BerriAI/litellm/pull/40055)）—— 只编码一次，对精确字节进行鉴权，消除「编码后再重试」带来的开销。

## 5. 稳定性与回归问题

**高严重度（成本/计费正确性）：**
- `custom_cost_per_token` 与 `cache_read_input_token_cost` 同时使用时会 **重复计费** Anthropic 缓存读取 token —— [#40006](https://github.com/BerriAI/litellm/issues/40006)。目前尚无修复 PR。
- `/v1/messages`（Claude Code）上出现误报 "Budget has been exceeded" —— 在 `max_budget=100` 的设置下，强制计费为 111.29，而实际支出远低于该值 —— [#40050](https://github.com/BerriAI/litellm/issues/40050)。目前尚无修复 PR。
- `litellm_settings.max_budget` 触发了一个永远不会重置的进程级 `_current_cost` 上限 —— [#40020](https://github.com/BerriAI/litellm/issues/40020)。目前尚无修复 PR。
- 自定义模型若未收录在成本映射中，花费日志中记录为 `$0`（`cost_breakdown.total_cost = 0`），尽管 `response.usage.estimated_cost` 是正确的 —— [#35691](https://github.com/BerriAI/litellm/issues/35691)。

**高严重度（功能性故障）：**
- WebSocket `/v1/responses` 要求传入 `?model=` 查询参数，**违反了 OpenAI 规范**（按规范 model 应放在 `response.create` 负载内）。这是一个长期存在的问题，已有 9 个 👍，阻碍了 Codex-CLI 风格的客户端 —— [#25532](https://github.com/BerriAI/litellm/issues/25532)。
- `adaptive_router` 从 `litellm_params.input_cost_per_token` 读取成本，而非 `model_info`，导致按成本加权路由被静默归零 —— [#31481](https://github.com/BerriAI/litellm/issues/31481)（已 CLOSED，修复已合入）。
- OpenAI Codex CLI 无法通过 LiteLLM 建立连接（出现 stream-disconnected 错误）—— [#29818](https://github.com/BerriAI/litellm/issues/29818)。目前尚无修复 PR。
- `POST /config/reload` 在 `litellm-database:main-stable` 上返回 404 —— [#30772](https://github.com/BerriAI/litellm/issues/30772)。
- Bedrock `DELETE /v1/files/{file_id}` 返回 500 `"BedrockFilesConfig does not support file deletion"`，上传的文件无法清理 —— [#39715](https://github.com/BerriAI/litellm/issues/39715)。
- 客户端断开时，非流式请求不会取消上游工作（与先前的流式修复相对应）—— [#37140](https://github.com/BerriAI/litellm/issues/37140)。

**中等严重度：**
- `/user/update` 在文档化的 `blocked` 参数上一律返回 400（`LiteLLM_UserTable` 中缺失对应列），导致 Terraform provider 的 `litellm_user` 不可用 —— [#39564](https://github.com/BerriAI/litellm/issues/39564)。
- `/model/new` 添加的模型永远不会进入仅 `gateway` 进程；报错中引用的日志行从未真正输出 —— [#39547](https://github.com/BerriAI/litellm/issues/39547)。
- Vercel AI Gateway 流式响应丢弃了 `usage.prompt_tokens_details`，导致缓存 token 按完整输入价计费 —— [#39088](https://github.com/BerriAI/litellm/issues/39088)。
- 自适应路由中 `gammavariate: alpha and beta must be > 0.0` 会永久性地摧毁一个模型组 —— [#29397](https://github.com/BerriAI/litellm/issues/29397) 与 [#35590](https://github.com/BerriAI/litellm/issues/35590)（已 CLOSED，修复已发布）。
- 模型访问检查忽略了直接设置在虚拟密钥上的 `access_group_ids` —— [#28464](https://github.com/BerriAI/litellm/issues/28464)。
- Anthropic `/v1/messages` 会将 OpenAI Responses 的拒绝块擦除为空内容数组 —— [#39721](https://github.com/BerriAI/litellm/issues/39721)（已 CLOSED）。
- SambaNova 成本映射过期（包含已弃用模型，价格/上下文有误）—— [#29011](https://github.com/BerriAI/litellm/issues/29011)。

**低严重度 / UI：**
- `/ui/login` 返回 404（与 nginx special-rules 的交互问题）—— [#29340](https://github.com/BerriAI/litellm/issues/29340)（已 CLOSED）。
- 请求日志的日期范围筛选器将本地时间视作 UTC，非 UTC 用户的时间窗口会被静默偏移 —— [#39979](https://github.com/BerriAI/litellm/issues/39979)。
- 以 `Reasoning(effort, summary)` 字典形式传入的 Anthropic `reasoning_effort` 被静默丢弃（v1.85.0 引入的回归）—— [#28196](https://github.com/BerriAI/litellm/issues/28196)（已 CLOSED）。
- v1.83.14-stable 的 `linux/arm64` 镜像在 arm64 manifest 下打包了 amd64 二进制 —— [#29382](https://github.com/BerriAI/litellm/issues/29382)（已 CLOSED）。

**窗口期内合入的修复 PR：**
- [#39923](https://github.com/BerriAI/litellm/pull/39923) —— 将回退限制为仅 `RustBridgeDeclined`。
- [#39806](https://github.com/BerriAI/litellm/pull/39806) —— 修复 Bedrock Voxtral 请求体。
- [#40022](https://github.com/BerriAI/litellm/pull/40022) —— MCP 工具集更新支持 `null`，并补充 MCP 生命周期端到端测试。
- [#40057](https://github.com/BerriAI/litellm/pull/40057) —— 在 GitHub Actions 中处理缺失的 gateway 定价字段。
- [#40041](https://github.com/BerriAI/litellm/pull/40041) —— 在 RC checklist 中自动化 Presidio 防护栏的端到端校验。

## 6. 对应用开发者的影响

- **生产环境目前请固定在 v1.100.0**；可在预发环境验证 v1.101.0-rc.1，但在成本/预算相关修复合入之前不要上线。仍有多个成本正确性 bug 未修复，影响每一次对 `/v1/messages`（Anthropic）的请求、对带预算虚拟密钥的请求，以及使用 `custom_cost_per_token` 的所有部署。
- **不要信任未收录在成本映射中的自定义模型的成本日志** —— `total_cost` 会是 0，即便响应中返回的 `estimated_cost` 是正确的。若按记录花费进行计费，请与上游对账。
- **WebSocket 客户端仍需向 `/v1/responses` 传入 `?model=`**。严格遵循 OpenAI WebSocket 规范的工具（Codex CLI 等）将会失败 —— 请在你的网关配置中做适配，或关注 [#25532](https://github.com/BerriAI/litellm/issues/25532)。
- **通过 LiteLLM 操作 Bedrock 文件目前是「只写」的** —— 在 [#39715](https://github.com/BerriAI/litellm/issues/39715) 修复前，请规划独立的清理路径（S3 生命周期策略或带外删除）。
- **MCP 工具集更新：** 显式传入 `null` 现在会清空字段 —— 依赖「字段缺失=保留」语义的客户端，需要在 v1.101.x 上确认 SDK 行为（[#40022](https://github.com/BerriAI/litellm/pull/40022)）。
- **Rust/原生加速正在统一为一个全局开关**。如果你目前按路由设置了 Rust 开关，请审阅你的配置；在后续版本中，按请求参数将被移除。
- **新增的可观测性抓手：** 若你运行 Prometheus，可在 PR [#40059](https://github.com/BerriAI/litellm/pull/40059) 上线后启用「按输入长度分桶的延迟」指标 —— 它能在不破坏既有仪表盘的前提下，显著提升 TTFT/SLO 分析质量。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

<think>The user wants me to translate a technical GitHub digest report from English to Simplified Chinese. I need to:

1. Preserve all Markdown structure exactly
2. Keep URLs, link targets, code spans, numbers, dates verbatim
3. Keep project names, repo slugs, usernames, version tags, file paths, API/config identifiers in original form
4. Keep issue/PR references like #12345 as-is
5. Use natural technical Chinese, register of a Chinese developer newsletter

Let me carefully translate this while preserving all the technical terms and formatting.</think>

# Unsloth 日报 — 2026-09-06

## 今日要点

Unsloth 维护者今天完成了一轮密集的清理与变基（rebase）：关闭了 30 个长期挂起的 issue，合并队列基本被 **Studio** 的硬化工作占据，而非核心训练 kernel。两条最值得关注的新动向 —— 新增 **双 DGX Spark 服务编排器**，附带异步副本路由器（[PR #10323](https://github.com/unslothai/unsloth/pull/10323)）；以及一轮 **安全加固**，用一次性设置令牌替换 Studio 内嵌的管理员引导密码，并加入按账户隔离（[PR #10387](https://github.com/unslothai/unsloth/pull/10387)、[PR #10375](https://github.com/unslothai/unsloth/pull/10375)、[PR #7140](https://github.com/unslothai/unsloth/pull/7140)）。

## 发布与破坏性变更

过去 24 小时内无新包发布。官方也未宣布弃用项，但有三个正在评审的 PR 涉及对外可观测的 API 行为变更：

- `/v1/chat/completions` 将把 **Unsloth UI 控制帧**（`tool_start`、`tool_end`、`reasoning_summary`、`diffusion_frame`）置于 `X-Unsloth-Events` 显式启用头之后才会下发。严格的 OpenAI 客户端目前会在这些帧上做 schema 校验失败；变更后默认静默不再下发（[PR #10362](https://github.com/unslothai/unsloth/pull/10362)）。
- `/v1/messages`（兼容 Anthropic）在收到 `tools=[…]` 请求、但加载的 GGUF 不支持工具调用时，将 **显式返回错误**，而不是静默丢掉 tools 字段（[PR #10314](https://github.com/unslothai/unsloth/pull/10314)）。
- `/v1/embeddings` 在当前加载的对话 GGUF 无法提供 embedding 时，将回退到 **已配置的 embedding 模型**（此前返回 501/503）（[PR #10315](https://github.com/unslothai/unsloth/pull/10315)）。

## 新增模型与硬件支持

- **AMD Strix Halo（gfx1150/gfx1151）核显**：检测逻辑现在会在这些 GPU 上安装 **Vulkan** 版 llama.cpp 预编译包，而非 ROCm。在 Radeon 8060S CI runner 上测得更快（[PR #10381](https://github.com/unslothai/unsloth/pull/10381)）。
- **Linux CPU / AMD Vulkan（无需 ROCm）/ gfx1033 门控 / torch 2.11**：打包进由 Steam Deck 触发的安装器重构中（[PR #8412](https://github.com/unslothai/unsloth/pull/8412)）。
- **torchcodec 与 torch 2.11**：此前在 `main` 上执行全新 `pip install` 会静默装上一个与 torch 不匹配的 torchcodec。兼容守卫现已覆盖 `torch 2.11`，并按 torch minor 版本钉死（[PR #7474](https://github.com/unslothai/unsloth/pull/7474)）。
- **已关闭 bug**（今日关闭，数据中未关联修复 PR）：`gpt-oss` MoE router 属性（[#3729](https://github.com/unslothai/unsloth/issues/3729)）、RTX 5070 Ti 16 GB 上 `gemma-4-12b-it` GGUF 加载失败（[#6022](https://github.com/unslothai/unsloth/issues/6022)）、`DeepSeek-OCR` `FastVisionModel` 加载失败（[#3670](https://github.com/unslothai/unsloth/issues/3670)）。

## 性能与优化

- **DGX Spark 双节点推理服务**：`spark_cluster.recommend_topology` 现在从三种拓扑中挑选一种，并基于配对的 Spark 跑 **异步副本路由器**，使事件循环不再阻塞（[PR #10323](https://github.com/unslothai/unsloth/pull/10323)，叠加在 [PR #10280](https://github.com/unslothai/unsloth/pull/10280) 之上）。
- **核显上的 prompt cache**：在共享内存 GPU 上保留 llama-server prompt cache 后，一次 48.8 小时的 Strix Halo 会话恢复 **44 小时**。罪魁是 Windows 全量卸载调优中关闭了 cache（[PR #10382](https://github.com/unslothai/unsloth/pull/10382)）。
- **丢弃迟到的推理响应**：`_direct_reader` 之前会把响应转发到一个生成已取消的请求，导致跨请求的 mailbox 状态泄漏。取消的响应现在在边界处被丢弃（[PR #10388](https://github.com/unslothai/unsloth/pull/10388)）。
- **Kaggle CI runner 利用率**：此前任务占用 runner 共 **41.5 分钟**，有效时间仅约 4 分钟。现在改为异步派发 kernel 之后再收集结果（[PR #10183](https://github.com/unslothai/unsloth/pull/10183)）。
- **GGUF 直接导出到 Hub**：把 GGUF 直推 Hub 时不再重复跑 merge → convert → quantize。原先第一次写入保存目录，第二次又在 `push_to_hub_gguf` 里整体重跑一遍（[PR #10317](https://github.com/unslothai/unsloth/pull/10317)）。

## 稳定性与回归

今日窗口内的 issue 全部标记为 **CLOSED**，说明维护者在积极清理陈旧报告。按影响面排序的代表性条目：

| 严重度 | 条目 | 备注 |
|---|---|---|
| 高 | [Qwen3-235B 训练 → `ValueError: Pointer argument (at 4) cannot be accessed from Triton (cpu tensor?)`](https://github.com/unslothai/unsloth/issues/4137) | 大 MoE 上的 Triton/xformers ABI 不匹配。已关闭，未关联修复 PR。 |
| 高 | [Qwen3.5 packing → 第 1 步 grad norm 为 NaN](https://github.com/unslothai/unsloth/issues/4160) | 只影响 Qwen3.5 的 packing 路径；Qwen3-14B-Base 与 Qwen3-30B-A3B-VL 微调正常。已关闭，未关联修复 PR。 |
| 高 | [Studio Ollama 集成：`source` 错误、schema 崩溃、模型不进清单](https://github.com/unslothai/unsloth/issues/9986) | 三个 bug 叠在一起。已关闭，未关联修复 PR。 |
| 高 | [最新更新在 16 GB 核显上无法加载模型](https://github.com/unslothai/unsloth/issues/9482) | 提到 `UNSLOTH_ALLOW_HOST_OFFLOAD=1` 作为临时绕过。已关闭，未关联修复 PR。 |
| 中 | [DGX Spark 手册：检测不到 GPU](https://github.com/unslothai/unsloth/issues/3553) | 已关闭。 |
| 中 | [Gemma3 微调 `ConstantVariable` 报错 `Missing required positional argument: x`](https://github.com/unslothai/unsloth/issues/3996) | 已关闭。 |
| 中 | [Windows PowerShell 安装器在纯 CPU 机器上即便带 `--no-torch` 也失败](https://github.com/unslothai/unsloth/issues/5008) | 已关闭；Linux CPU 路径修复在 [PR #8412](https://github.com/unslothai/unsloth/pull/8412)。 |
| 中 | [明明已安装却报 `torch` 模块找不到](https://github.com/unslothai/unsloth/issues/1616) | 长期挂起，已关闭。 |
| 低 | [Nemotron 3 Nano LoRA merge 失败](https://github.com/unslothai/unsloth/issues/3854) | 已关闭。 |
| 低 | [rloo_trainer 支持](https://github.com/unslothai/unsloth/issues/725) / [用 Unsloth 跑 GKD](https://github.com/unslothai/unsloth/issues/1941) | 长期挂起的 TRL trainer 互操作需求。 |

如果你在当前构建上撞到以上问题，issue 虽标 CLOSED，但同一时间窗内没看到对应的修复 PR —— 在再次提交前值得先在 `main` 上复测。

## 对应用开发者的影响

- **严格的 OpenAI 客户端**：若确实需要 Studio 的 UI 帧（`tool_start`、`tool_end`、`reasoning_summary`、`diffusion_frame`），在请求里加 `X-Unsloth-Events: 1`。不加则这些帧不再下发 —— 你的 OpenAI/Anthropic SDK 不再触发 schema 校验（[PR #10362](https://github.com/unslothai/unsloth/pull/10362)）。
- **对非工具 GGUF 发工具调用**：Claude Code / Anthropic SDK 这类客户端打到 Studio 时，加载的模型若不支持工具，会得到显式错误，而不是一段看似“智能体坏了”的静默文本回复（[PR #10314](https://github.com/unslothai/unsloth/pull/10314)）。
- **Embeddings 端点**：即便只加载了对话模型，`/v1/embeddings` 现在也能用了 —— 由 Studio 配置的 embedding 模型来服务该请求（[PR #10315](https://github.com/unslothai/unsloth/pull/10315)）。
- **Ollama 导出**：`push_to_ollama` 正在修复，会把 `create_ollama_modelfile` 所需的 kwargs 透传过去；若你之前导出失败、报错 `unexpected keyword argument 'gguf_location'`，本次修复覆盖该问题（[PR #10304](https://github.com/unslothai/unsloth/pull/10304)）。
- **共享安装**：Studio 与 Desktop 正在引入 **按账户隔离** —— 多人可共用同一套安装，各自登录。首屏仍会询问种子管理员密码，但种子密码已在运行时替换为一次性设置令牌（[PR #10375](https://github.com/unslothai/unsloth/pull/10375)、[PR #10387](https://github.com/unslothai/unsloth/pull/10387)、[PR #7140](https://github.com/unslothai/unsloth/pull/7140)）。
- **核显推理**：若你跑在 Strix Halo 或其他 AMD iGPU 上，预计 Vulkan llama.cpp 成为默认后端、llama-server prompt cache 默认开启 —— 长上下文场景应有明显提速（[PR #10381](https://github.com/unslothai/unsloth/pull/10381)、[PR #10382](https://github.com/unslothai/unsloth/pull/10382)）。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

<think>The user wants me to translate an English technical report (a GitHub digest for Claude Code Router) into Simplified Chinese. The instructions are very clear:

1. Output ONLY the translation - no preamble, no explanation, no markdown fences
2. Preserve Markdown structure exactly
3. Keep URLs, link targets, code spans, code blocks, numbers and dates verbatim
4. Keep project names, repository slugs, usernames, version tags, file paths and API/config identifiers in original form
5. Issue/PR references like #12345 stay as-is
6. Use natural technical Chinese register

Let me carefully translate this technical report into Simplified Chinese while maintaining all the technical terminology and structure.

Key terms to keep in original form:
- Claude Code Router (CCR)
- Issue numbers (#1761, #1762)
- PR numbers (#1760)
- URLs
- Code identifiers (port numbers, endpoints)
- "Kunavo" (brand name)
- "codex" (provider name)
- "OPEN" (PR status)
- "HIGH", "MEDIUM" (severity tags)

Let me work through the translation:

# Claude Code Router Digest — 2026-09-06
→ # Claude Code Router 每日动态 — 2026-09-06

## Today's Highlights
→ ## 今日要点

Two user-reported issues opened today and one provider-preset PR landed. The most consequential is **#1761**: the managed core gateway fails to start under moderate host load because a hardcoded 5s "config-acceptance" timeout conflates parent event-loop congestion with child process readiness, producing a false-negative boot failure on an otherwise healthy gateway. Alongside it, **#1762** surfaces a 502 Bad Gateway on the `codex` provider path, and **#1760** adds a Kunavo provider preset that consolidates Claude, Gemini, and GPT access behind a single OpenAI-compatible endpoint.

→ 今日新增两个用户反馈的 Issue 与一条提供商预设 PR。其中影响最大的是 **#1761**：受管核心网关在主机中等负载下无法启动，因为硬编码的 5 秒"配置接收"超时将父进程事件循环拥塞与子进程就绪状态混为一谈，导致一个本身健康的网关被误判为启动失败。与此同时，**#1762** 暴露了 `codex` 提供商路径上的 502 Bad Gateway，**#1760** 则新增了 Kunavo 提供商预设，通过一个 OpenAI 兼容端点统一封装 Claude、Gemini 和 GPT 的访问。

## Releases & Breaking Changes
→ ## 版本发布与破坏性变更

No releases in the last 24h. No version bumps or migration notes to report.

→ 过去 24 小时内无版本发布，无版本号变更或迁移说明需通报。

## New Model & Hardware Support
→ ## 新模型与硬件支持

- **#1760 — Kunavo provider preset (OPEN):** Introduces a new provider preset for [Kunavo](https://kunavo.com), an OpenAI-compatible gateway that exposes Claude, Gemini, and GPT models through a single endpoint with pay-as-you-go per-token pricing. The PR claims a single endpoint entry covers all three protocols. This is a configuration-level addition (provider preset), not a new backend or runtime. No new hardware backends, quantization formats, or architectures are introduced. → [PR #1760](https://github.com/musistudio/claude-code-router/pull/1760)

→ - **#1760 — Kunavo provider preset (OPEN)：** 为 [Kunavo](https://kunavo.com) 引入新的提供商预设。Kunavo 是一个 OpenAI 兼容网关，通过单一端点按 token 付费方式提供 Claude、Gemini 和 GPT 模型。该 PR 声称单一端点条目即可覆盖全部三种协议。此为配置层面的新增项（提供商预设），并非新的后端或运行时。并未引入新的硬件后端、量化格式或架构。→ [PR #1760](https://github.com/musistudio/claude-code-router/pull/1760)

## Performance & Optimization
→ ## 性能与优化

- **#1761 (cross-listed under Stability):** The 5s hardcoded boot window in the web startup path is the implicit performance contract for "gateway ready." On a moderately loaded host the parent Node event loop cannot drain the IPC handshake fast enough, so the child gateway — which itself is fine — is killed off. There is no concrete throughput/latency number in the report, but the failure mode points at event-loop scheduling under contention rather than raw gateway throughput. → [Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761)
- No kernel, batching, or token-throughput work landed in this window.

→ - **#1761（同时归类于稳定性）：** Web 启动路径中 5 秒的硬编码启动窗口构成了"网关就绪"的隐式性能契约。在中等负载的主机上，父进程 Node 事件循环无法及时排空 IPC 握手，因此子网关（其本身运行正常）被杀掉。报告中没有具体的吞吐量/延迟数据，但故障模式指向高争用下事件循环的调度问题，而非网关本身的吞吐量瓶颈。→ [Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761)
- 本窗口内未涉及内核、批处理或 token 吞吐量的相关工作。

## Stability & Regressions
→ ## 稳定性与回归

Ranked by likely blast radius:
→ 按潜在影响范围排序：

1. **[HIGH] #1761 — Gateway fails to start under load (false-negative readiness timeout).** Symptom: on boot/restart the managed gateway on port 3456 never comes up; the web/management server on 3458 starts fine. Root cause is structural: the readiness probe uses a fixed 5000ms deadline that measures parent-side scheduling latency, not child readiness. Every moderately loaded host reproduces it on every restart, which effectively bricks the local Claude Code Router setup until the host is quiet. **No fix PR exists yet.** → [Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761)

→ 1. **[HIGH] #1761 — 网关在负载下无法启动（误判就绪超时）。** 现象：在启动/重启时，3456 端口上的受管网关始终无法上线；而 3458 端口上的 Web/管理服务启动正常。根因为结构性问题：就绪探针使用固定的 5000ms 截止时间，衡量的是父进程端调度延迟，而非子进程就绪状态。任何中等负载的主机在每次重启时均可复现，事实上在主机负载降低前本地 Claude Code Router 设置等同于不可用。**目前尚无修复 PR。** → [Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761)

2. **[MEDIUM] #1762 — `codex` provider returns 502 Bad Gateway.** Single user report, zero comments. Endpoint `http://127.0.0.1:3456/v1/responses` rejects with `unexpected status 502 Bad Gateway: Unknown error`. Stack trace indicates the error originates inside CCR's provider-adapter layer rather than upstream. **No fix PR exists yet** and the report is too thin to attribute (upstream outage vs. adapter mis-handling vs. malformed request). → [Issue #1762](https://github.com/musistudio/claude-code-router/issues/1762)

→ 2. **[MEDIUM] #1762 — `codex` 提供商返回 502 Bad Gateway。** 仅一份用户报告，零评论。端点 `http://127.0.0.1:3456/v1/responses` 拒绝并返回 `unexpected status 502 Bad Gateway: Unknown error`。堆栈跟踪显示错误源自 CCR 的 provider-adapter 层而非上游。**目前尚无修复 PR**，且报告内容过少，无法定位根因（上游故障、适配器处理错误，还是请求格式异常）。→ [Issue #1762](https://github.com/musistudio/claude-code-router/issues/1762)

No crashes, memory leaks, or correctness regressions in the broader issue stream were filed today.
→ 今日更广泛的 issue 流中未提交崩溃、内存泄漏或正确性回归类问题。

## What This Means for Application Developers
→ ## 对应用开发者的意义

- **Don't trust the managed gateway on a busy host.** If you run CCR alongside other workloads (dev servers, build daemons, IDEs), the 5s startup window in #1761 will intermittently fail your gateway on boot. Workaround for now: bring up the core gateway manually (`ccr start` outside the web startup path) or pre-quiesce the host. Track the issue if you want the timeout to become adaptive or health-based.
- **Plan around a single-endpoint multi-model provider.** Once **#1760** merges, Kunavo gives you Claude + Gemini + GPT behind one API key and one base URL. Useful if you want to A/B route across vendors without juggling three provider entries; less useful if you need per-vendor cost/usage telemetry at the CCR layer, since the upstream collapses them.
- **`codex` route is currently unreliable in the field.** If you have a fallback or retry strategy in your agent stack for the `/v1/responses` path, keep it on until #1762 is diagnosed.
- **No version movement today.** Pinning, lockfiles, and CI matrices are unaffected — no urgent upgrade or downgrade required.

→ - **在繁忙主机上不要依赖受管网关。** 若你与其他工作负载（开发服务器、构建守护进程、IDE 等）共用一台主机运行 CCR，#1761 中的 5 秒启动窗口会导致网关在启动时偶发性失败。目前的临时方案：手动启动核心网关（在 Web 启动路径外执行 `ccr start`），或在启动前先让主机负载降下来。若希望该超时变为自适应或基于健康状态的检测，可关注该 Issue。
- **围绕单端点多模型提供商做规划。** 一旦 **#1760** 合入，Kunavo 将允许你通过一个 API Key 和一个 base URL 访问 Claude + Gemini + GPT。如果你希望跨厂商做 A/B 路由、又不想同时维护三份提供商配置，这会很方便；但若你需要在 CCR 层获取每个厂商的成本/用量遥测，由于上游已将这些数据合并，Kunavo 的价值会打折扣。
- **`codex` 路由当前在生产环境中不稳定。** 若你的 Agent 栈对 `/v1/responses` 路径已有降级或重试策略，请在 #1762 定位完成前保持启用。
- **今日无版本变更。** 版本锁定、lockfile 与 CI 矩阵均不受影响——无需紧急升级或降级。

Let me review my translation once more for naturalness and accuracy:

1. "Today's Highlights" - 今日要点 - good
2. "Releases & Breaking Changes" - 版本发布与破坏性变更 - good
3. "New Model & Hardware Support" - 新模型与硬件支持 - good
4. "Performance & Optimization" - 性能与优化 - good
5. "Stability & Regressions" - 稳定性与回归 - good
6. "What This Means for Application Developers" - 对应用开发者的意义 - good

Technical terms I'm keeping in English:
- Issue, PR numbers (#1761, #1762, #1760)
- URLs
- Code/identifiers (Kunavo, codex, OPEN, HIGH, MEDIUM, 502 Bad Gateway, port numbers, endpoints)
- File path-style references
- "Provider preset" - 厂商预设 (or keep as provider preset? Let me think... "提供商预设" works)
- "blast radius" - 影响范围 - good
- "A/B route" - A/B 路由 - this is a technical term, keep partially in English

Let me also make sure the formatting is preserved:
- Headings (##, ###) - keep as is
- Bold (**text**) - keep as is
- Lists - keep as is
- Links - keep URLs in original form
- Code spans (`code`) - keep as is
- Em-dashes — keep as is
- Horizontal rules - none in this doc

Looking at the original, there's no horizontal rule but there are sections separated by headings.

I think my translation is good. Let me finalize it.

One more check - the phrase "managed core gateway" - 受管核心网关 - this is a technical term referring to the gateway that's managed by CCR. "受管" is standard Chinese for "managed". Good.

"hardcoded 5s 'config-acceptance' timeout" - 硬编码的 5 秒"配置接收"超时 - "配置接收" sounds like a literal translation. Let me reconsider. In the context, this seems to be a specific named timeout. "config-acceptance" might be referring to a config being accepted by the gateway. Let me try "配置接受" or "配置接纳". Actually, "config-acceptance" might be a specific technical term from the codebase, so I might want to keep it closer to original. I'll use "配置接受" as it's more natural.

"conflates" - 混为一谈/混淆 - this is good

"false-negative boot failure" - 误判启动失败/启动失败的假阴性 - I'll use "误判为启动失败" to make it more natural Chinese

"cross-listed under Stability" - 同时归类于稳定性 - good

"event-loop scheduling under contention" - 高争用下事件循环的调度 - "争用" is the right term for contention. Good.

"raw gateway throughput" - 网关本身的吞吐量 - good

"effectively bricks the local Claude Code Router setup" - 等同于不可用 - good, natural Chinese

"single user report, zero comments" - 仅一份用户报告，零评论 - good

"too thin to attribute" - 报告内容过少，无法定位根因 - good

"provider-adapter layer" - provider-adapter 层 - this is a technical layer name, I'll keep "provider-adapter" as is or translate to "提供商适配层". Actually since "provider-adapter" is a code identifier (like a class/module name), I should keep it in original form. Let me use "provider-adapter 层".

"upstream outage vs. adapter mis-handling vs. malformed request" - 上游故障、适配器处理错误，还是请求格式异常 - good

"workaround" - 临时方案/绕过方案 - I'll use "临时方案"

"pre-quiesce the host" - 在启动前先让主机负载降下来 - "quiesce" is a tech term meaning to quiet/make still. My translation captures the meaning.

"per-vendor cost/usage telemetry" - 每个厂商的成本/用量遥测 - good

"upstream collapses them" - 上游已将这些数据合并 - good

"fallback or retry strategy" - 降级或重试策略 - good

"Pinning, lockfiles, and CI matrices" - 版本锁定、lockfile 与 CI 矩阵 - "Pinning" should be translated, "lockfiles" could be either. I'll use "版本锁定、lockfile 与 CI 矩阵".

Let me finalize the translation.

Actually wait, let me re-read this sentence: "Symptom: on boot/restart the managed gateway on port 3456 never comes up; the web/management server on 3458 starts fine."

I translated as: "现象：在启动/重启时，3456 端口上的受管网关始终无法上线；而 3458 端口上的 Web/管理服务启动正常。"

This looks good. Let me check once more.

Actually, looking at "web startup path" - this might be more specific. The web/management server has its own startup path. Let me keep "Web 启动路径" or "Web/管理服务启动路径". I'll go with "Web 启动路径外" which is what I have.

Also "managed gateway" - I'll make this consistent throughout: 受管网关

For the last bullet point:
"A/B route across vendors without juggling three provider entries" - "跨厂商做 A/B 路由、又不想同时维护三份提供商配置" - good

OK, I think my translation is solid. Let me write out the final version.

Wait, I need to double-check one thing. The original says "OPEN" in parentheses for PR #1760. This is the PR status (Open). I should keep this as "OPEN" since it's a status label that the user would see on GitHub. Actually, in Chinese we usually say "开启" or "打开中" but "OPEN" is the GitHub-specific label. I'll keep "OPEN" as is since it's the actual UI label.

Similarly "HIGH" and "MEDIUM" are severity tags - these are commonly kept in English in Chinese tech contexts. I'll keep them as is.

OK final translation coming up.

Let me also verify: the original has `→` arrows before links - these should be preserved as-is.

And there's a horizontal rule implied by `---` at the end? Actually no, the original doesn't have a horizontal rule. Let me check... Yes, no `---` in the source.

Let me also think about the section "What This Means for Application Developers" - my translation "对应用开发者的意义" is good and natural.

One more consideration: in Chinese tech writing, sometimes we use more terse language. Let me make sure my translation is appropriately concise.

"过去 24 小时内无版本发布，无版本号变更或迁移说明需通报。" - This is good.

OK, let me write the final version.</think>

# Claude Code Router 每日动态 — 2026-09-06

## 今日要点

今日新增两个用户反馈的 Issue 与一条提供商预设 PR。其中影响最大的是 **#1761**：受管核心网关在主机中等负载下无法启动，因为硬编码的 5 秒"配置接受"超时将父进程事件循环拥塞与子进程就绪状态混为一谈，导致一个本身健康的网关被误判为启动失败。与此同时，**#1762** 暴露了 `codex` 提供商路径上的 502 Bad Gateway，**#1760** 则新增了 Kunavo provider preset，通过一个 OpenAI 兼容端点统一封装 Claude、Gemini 与 GPT 的访问。

## 版本发布与破坏性变更

过去 24 小时内无版本发布，无版本号变更或迁移说明需通报。

## 新模型与硬件支持

- **#1760 — Kunavo provider preset (OPEN)：** 为 [Kunavo](https://kunavo.com) 引入新的 provider preset。Kunavo 是一个 OpenAI 兼容网关，通过单一端点以按 token 付费方式提供 Claude、Gemini 与 GPT 模型。该 PR 声称单一端点条目即可覆盖全部三种协议。此为配置层面的新增项（provider preset），并非新的后端或运行时。并未引入新的硬件后端、量化格式或架构。→ [PR #1760](https://github.com/musistudio/claude-code-router/pull/1760)

## 性能与优化

- **#1761（同时归类于稳定性）：** Web 启动路径中 5 秒的硬编码启动窗口构成了"网关就绪"的隐式性能契约。在中等负载的主机上，父进程 Node 事件循环无法及时排空 IPC 握手，导致子网关（

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

<think>
We need translate exact markdown. Need output only translation. Need preserve URLs link targets and perhaps link text can translated, but issue refs stay. User says keep URLs, link targets, code spans, code blocks, numbers/dates verbatim. Link text generally translate? "Issue/PR references like #12345 and their link text stay as-is." Ambiguous: link text perhaps full displayed translated headings should translate, while targets and # refs unchanged. They say issue/PR references like #12345 and their link text stay as-is, likely don't alter # numbers; "their link text" means displayed text like CC Switch Digest? Need interpret. Output full lengthy article Chinese, preserve Markdown exactly. We need translate all prose, retain identifiers, links, code. Need no preamble.

We should be careful with every term natural Chinese. Header "CC Switch 简报". Date numbers verbatim. No releases... v3.20.1.

"hardware support" no hardware, 新模型与供应商支持 maybe heading must preserve structure but content translate. "New Model & Hardware Support" perhaps 新模型与硬件支持, even no hardware specifics. User asks translate report, likely exact heading structure but translated text. Use “新模型与硬件支持”.

"Today's Highlights" etc.

Let's formulate.

Title "# CC Switch 简报 — 2026-09-06" date exact.

Section 1:
CC Switch development focus... **Codex Responses ↔ Chat Completions 转换层**, subagent/tool-call handling, fork-based usage attribution, streaming `reasoning_content`. "several high-priority bug fixes and architectural improvements landing" 落地. "single push" 本轮更新. no release.

Section 2:
No new releases last 24. Current shipping version referenced across issues. links translate display:
Note: Issue #... documents...
macOS. "user hooks/permissions/contextFiles" code? contextFiles should be code due identifier, but user said identifiers original. Original user prose contextFiles not code perhaps preserve plain? It was in inline `code`? Original: "replacing user hooks/permissions/contextFiles with a proxy-style config". We should use `contextFiles` to clarify and preserve. "按设计/已知限制".

Section 3:
new built-in model pricing entries.
"cache read/write". $/M maybe "每百万 token" perhaps natural. But preserve numbers and dollar. Original says "$10/M input" etc. Translate labels. Could state 输入 $10/M. This keeps number and symbols. Link PR.

GLM 0.15, 0.50, 0.03.
Gemini .75 etc.

New providers:
GitHub Copilot hosted account as Codex provider — Codex always enters via local Responses; CC Switch picks based on supported_endpoints. "始终通过本地 Responses 接入" perhaps Codex always enters via local Responses.
"provider mgmt" 管理.
"usage tracking" 用量跟踪.
"config sync" 配置同步.

Catalog vendor fixes:
DeepSeek vendor catalog fallback no longer marks unknown vision models ... as text-only.
Codex live-write preserves unmanaged sections. `[model_providers.*]`.

Section 4:
Cross-provider subagent routing takeover. route flagship provider while delegating Task/subagent to cheap. Proxy previously only allowed a single upstream per takeover. Translate Task as `Task` maybe Task is config UI concept. "主会话". cheaper "GLM flash-tier". Keep GLM.
Lightweight mode preference persistence and auto-entry on startup/close. backend-owned in AppSettings removes rebuild window.
Auto-resume routing on close — toggle Settings > Local Routing default off modeled on Clash autostart. Maybe "代理启动时自动恢复路由". Keep names.
Tray left-click opens main window. UX latency normal mode; lightweight unchanged.
Gemini thoughtSignature / Codex thought_signature backfill. These identifiers? "thoughtSignature" wasn't code-formatted in original plain? In heading bullet bold, original says Gemini thoughtSignature / Codex thought_signature. We should preserve as backticks? Rule identifiers original, not necessarily formatting. Keep literal case. "回填" replaces #5298 fixes Part-level `thoughtSignature` handling... Perhaps `Part` not code in original plain. use backticks around exact identifiers only if existing code spans? To preserve formatting "exactly" means don't add code markup? They require structure, bold/italics etc. Adding backticks perhaps changes Markdown structure, should avoid. We can preserve plain text names. But API identifiers should original. Use `lightweight_mode`, AppSettings, Settings > Local Routing, `proxy_restore_on_startup`, `thoughtSignature`, `thought_signature` because those were in backticks where applicable. Original `thought_signature` within bold, not code. We could not add backticks. "Part-level" not code.

Section 5 table. Need translate severity values? Emoji stay, perhaps "🔴 高", "🟠 中", "🟡 低". Table alignment exact row. Preserve issue numbers/links. "CLOSED" translate "已关闭". Is display link text issue? Issue stays maybe link text "#7156". They say "Issue/PR references like #12345 and their link text stay as-is." Wait this may mean if link text is issue number, don't alter. We'll leave all # refs. In rows first cell links. Closed in English can translate? If “(#1198) (CLOSED)” within same cell not a separate link. Translate 已关闭.

Rows:
v3.20.1 DeepSeek `tool_call_id` length insufficient. tokenrhythm.studio maybe provider hostname should perhaps `tokenrhythm.studio` as code but original wasn't code? It is plain. preserve.
Codex usage sync drops GPT-5.6-Sol for paginated parent rollouts. forked sub-agents on paginated parents permanently judged "before fork timestamp" all usage lost. macOS v3.20.1.
Settings overwrite.
Wayland startup crash EGL_BAD_PARAMETER.
v3.16.5 regression: invalid `tool_call_id` (HTTP 400) routing Codex → SenseNova on `deepseek-v4-flash`. 3.16.4 works.
Codex retry limit 429.
Empty thinking blocks persisted into Codex session JSONL next 400 "thinking length insufficient".
Image-only tool output dropped on vision-less upstream -> orphaned tool_calls -> session 400.
Responses → Chat splits commentary + function_call into two consecutive assistant messages.
Anthropic → Codex Responses bridge loses optional tool-argument semantics.
GPT-5-Astra usage not recorded / costs not computed — closed today (pricing row now added PR #). GPT naming says GPT-5 while earlier GPT-6. preserve.
Various closed items — provider form UX, multi-account support, model availability, TRACE logging toggle, environment checks.
"No linked fix PRs..." as of today.

Section 6:
Plan for two-tier routing. PR... one local proxy. agent frameworks on Codex, design tool-call loops robust. budget.
Tool-call edge cases dominant. Four bugs all stem... perhaps line says four of open high severity, but table has high red 4? 7156, 7084, 1198, 5609 not all tool call. They call 4 of open high-severity maybe "四个突出问题" and those IDs. Translate source. tool-result image handling.
Treat file as ephemeral. Issue confirms proxy overwrites user's settings on launch. Hooks permissions contextFiles directly lost; store via own provider config not manual.
Pricing additions actionable immediately. Once PRs land in a release, dashboards recognize strings. "out of box". telemetry.
Lightweight auto resume. Scripts CI, new flag let opt in/out route survives restart.
GitHub Copilot. "first capability-driven routing path"; same endpoint picks. Expect proxy... clients tolerate both.

Need be exact links:
[GPT-6 Astra](https://...)
No issue.

Potential issue of Simplified Chinese. Use terms:
- "代理接管模式" for takeover mode
- "上游"
- "子代理"
- "分叉"
- "本地路由"
- "托盘左键单击"
- "用量归因" maybe.

Need output only translation no preamble. Let's draft with same markdown.

Should title "CC Switch 动态" or "简报". Natural developer newsletter maybe "CC Switch 每日简报". Original CC Switch Digest. Use "CC Switch 简报". Fine.

"Current shipping version referenced across issues" -> “各 issue 提及的当前发布版本为”. User says newsletter Chinese.

"New Model & Hardware Support" 3. New model and provider support—not hardware. Could "新模型与硬件支持". No need invent hardware. Maybe this is category. Keep section count.

"with no release in the last 24h." 过去 24 小时内没有新版本发布.

Dates exact.

"MCP sharing issue" in initial hidden think, but not final report. no need.

Link labels: e.g. [#7156](...) exactly #7156. For PR #. Good.

Code:
`~` path preserved.
`single upstream` translated.
"Settings > Local Routing" exact UI names. Use “设置 > 本地路由” would translate Local Routing but rule says maybe UI path identifiers original? Only "API/config identifiers", not UI labels. They say project names repository slugs usernames version tags file paths API/config identifiers original. Local Routing is UI label, can translate. But title "Settings" maybe keep. “设置 > Local Routing” perhaps avoid translating? Original has Settings > Local Routing, UI label should perhaps translate. In Chinese newsletter: “设置 > 本地路由”. But preserve exact UI maybe. Rule says preserve names only specified. No demand all UI. Translate.

"Clash autostart" Clash is project name unchanged; autostart translated. "参考 Clash 的开机自启机制".

"three new provider integrations" Actually GitHub, OMP, Tencent. Fine.

"provider mgmt" don't leave English. Translate.

"Model availability" etc.

"TRACE logging toggle" TRACE identifier preserve.

"environment checks" 环境检查.

"current version recognized by dashboards model strings" "模型字符串".

"main conversation to flagship provider" 主会话到旗舰 provider, delegate Task/subagent to cheap. Use "旗舰供应商".

"Task/subagent work" `Task` / subagent. Keep Task maybe as UI command.
"premium provider" 高端供应商.
"budget accordingly" 相应规划预算.

"through one local proxy": through one local proxy. Good.

"pin to a single provider" 固定单一供应商
"gate on known-good model versions" 设置为仅在已知正常模型版本上启用? "or gate on known-good..." Translate.

"downstream tooling" downstream 工具.

"CC Switch still rewrites file on launch, replacing ... with proxy-style config on macOS." "仍会在 macOS 启动时改写...，用代理式配置替换用户的 hooks/permissions/contextFiles。" Keep keys original. Should code-format as identifiers maybe source only contextFiles, not hooks. In source: "user hooks/permissions/contextFiles" no code. Preserve literal. Fine.

"closed today" 今天关闭. "users should expect this is by-design / known limitation." "应将该行为视为设计如此/已知限制". Great.

No changes URLs.

We need ensure markdown separators and table alignment exactly. Translation of table values and heading. Keep horizontal rules: source none. Emojis exact. They explicitly mention horizontal rules though absent. Bold lines preserved.

Let's consider whether translating Markdown title "Today's Highlights" etc while preserving structure means section heading markers same, not wording. yes.

Let's produce full.

Check all original paragraphs included, no omissions.

Section 1 exact:
"multiple high-priority bug fixes and architectural improvements landing around subagent/tool-call handling, fork-based usage attribution, and streaming `reasoning_content`." We'll say "并有多个..." maybe subject: focus ... "多个高优先级修复和架构改进相继落地，重点涉及子代理与工具调用处理、基于 fork 的用量归因，以及流式 `reasoning_content`。" Good.
"Concurrently, three... and three ... expand routing surface area in a single push." "同时，本轮新增..." "routing surface area" 路由覆盖面.
"project remains on v3.20.1..." good.

Section 2:
"Current shipping version referenced across issues" We include links exact.
"mentioned in [#7156], [#7084], [#7137]" yes.
No period issue.
Note issue closed today documents etc.

Section 3:
GLM cache write none.
"including provider mgmt, session browsing, usage tracking, config sync" exact.
Tencent + Token Plan 8 presets. "Pi 目录对齐" perhaps Pi catalog alignment.
Catalog fallback no longer marks unknown vision models... text-only.
"live-write" “实时写入” now.
unmanaged config.

Section 4:
- PR headline.
- Lightweight mode preference persistence + auto-entry on startup/close: "轻量模式偏好持久化，并在启动/关闭时自动进入" Wait "auto-entry on startup/close" could mean entering/exiting lightweight mode on startup/close? Original likely adds preference and auto enter/exit? They say removes rebuild window when entering/exiting. We can translate literal: “轻量模式偏好持久化 + 启动/关闭时自动进入” awkward. Source: "backend-owned lightweight_mode in AppSettings, removes a rebuild window when entering/exiting." Maybe "并会在启动/关闭时自动进入/退出" would be natural but add pairing. The source says auto-entry on startup/close perhaps likely auto entering lightweight mode? "auto-entry on startup/close" could mean "auto entry/exit". Translate: "轻量模式偏好持久化，并在启动/关闭时自动切换" perhaps clean.
- Auto-resume routing on close — "close" app close. "关闭时自动恢复路由" seems wrong, original auto-resume routing on close likely restores on app close. "关闭时启用下次启动自动恢复路由" perhaps. `proxy_restore_on_startup`.
- "new toggle default off" preserve.
- "Tray left-click..." user latency.
- thought signature.

Section 5:
"Ranked by impact / comment volume" 按影响/评论数.
High issue #4973 med because v3.16.5. Fine.
"every subagent/tool call through tokenrhythm.studio fails; plain chat works." 
"permanently judged "before..."" quotation.
"macOS v3.20.1" add “环境：macOS v3.20.1”.
#1198 known.
#5609 open since July, no fix.
"calling models" 调用模型时.
"on vision-less upstream" 不支持视觉的上游
"orphaned tool_calls". Use `tool_calls`? Original plain. Preserve. 
"Responses → Chat splits commentary + function_call into two consecutive assistant messages" use `commentary`? Identifier original maybe plain. "commentary + function_call". Keep English as terms, but translate 周围: "拆成两条连续的 assistant 消息". Is assistant code? Original plain. Could say "助手消息". To maintain exact API terms, use “commentary + function_call 被拆分为两条连续的 assistant 消息” natural enough.
"optional tool-argument semantics" 可选工具参数语义.
"pricing row now added" model pricing row.
"Various closed items — provider form UX, multi-account support, model availability, TRACE logging toggle, environment checks." Great.
"No linked fix PRs for open high severity above as of today." open high severity includes no PR. Fine.

Section 6:
First PR "makes practical to run planning/review..." "两极化路由"
"If building agent frameworks on Codex, design tool-call loops robust against subagent routing — and budget accordingly." 
Second: “工具调用边界情况是主要故障模式。” Then source says "Four of the open high-severity bugs" but list four IDs. Translate “四个突出的未解决 bug” avoids conflict.
All stem from tool_call_id length, tool-result image handling, thinking block persistence during translation. "thinking-block persistence" 保存.
"If proxy Codex/Claude..." "通过 CC Switch 代理 Codex/Claude 时，暂勿..." Good.
"pin to a single provider or gate on known-good model versions." 
Settings:
"ephemeral" 易失.
"store them via CC Switch's own provider config" maybe source says downstream tooling should assume, but provider config.
Pricing:
"Once PRs land in release, usage cost dashboards will recognize model strings out of box" "开箱识别"
Lightweight:
"arriving." 
"startup auto-routing" startup auto-resume routing.
"new flag will let you opt in/out of 'routing survives a restart' cleanly." explicit.
GitHub:
"first capability-driven routing path" "首批按能力驱动路由路径" maybe.
"Expect proxy more willing to negotiate per-model endpoint shapes going forward" negotiate = switch/adjust. “有望更积极地适配”
"write clients tolerate both."

Need maybe translate "$1/M cache write" to cache 写入. Good.

One concern: Rule “Keep project names, repository slugs, usernames, version tags, file paths and API/config identifiers in their original form — do not translate them.” We should keep `supported_endpoints`, `model_providers.*`, `lightweight_mode`, AppSettings? AppSettings is code identifier and should original. Already. `thoughtSignature` is camel case identifier original. `thought_signature` original. `contextFiles` original. `model_providers.*` code. `tokenrhythm.studio` original. "session JSONL" not code. `reasoning_content`. `tool_call_id`. `function_call` maybe identifier. `tool-argument` isn't. "TRACE". "Pi" project. "Token Plan" maybe product name. "Codex" product. "Claude Code". "Gemini 2.5/3.x". "Part-level". Good.
"Responses", "Chat Completions", API names original.
"Codex → SenseNova" arrows.
"EGL_BAD_PARAMETER".
"v..." tags.

"GPT-6 Astra" names.
"GLM flash-tier": We may say “GLM Flash 档”. But "flash-tier" is general tier not product. Fine.
"live-write" perhaps not identifier.
"Settings > Local Routing" in source plain; translation to "设置 > 本地路由" doesn't violate API/config? It's UI, not config. However, to be safest, preserve label original: "位于 Settings > Local Routing 下的新开关". But Chinese natural. Yet "Settings > Local Routing" might be exact menu path and path should remain. Use “位于 Settings > Local Routing 下”. Good.
“Settings > Local Routing” maybe config path identifier. Keep.
"AppSettings" unchanged.

"macOS" unchanged.
"Linux", "Wayland".

Use Chinese punctuation but numbers dates exact.

Let's construct final full. Need not mention original report date perhaps. Ensure "2026-09-06" exact.

Let's write carefully.
</think>
# CC Switch 简报 — 2026-09-06

## 1. 今日要点

CC Switch 的开发重点仍是 **Codex Responses ↔ Chat Completions 转换层**，多个高优先级修复与架构改进已相继落地，重点涵盖子代理和工具调用处理、基于 fork 的用量归因，以及流式 `reasoning_content`。同时，本轮新增了 **三款内置模型价格配置**（GPT-6 Astra、GLM-5.3 Flash、Gemini 3.8 Flash）和 **三类提供商集成**（GitHub Copilot for Codex、原生 OMP/oh-my

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

<think>The user wants me to translate an English technical report/digest into Simplified Chinese. Let me carefully translate this while preserving all Markdown structure, URLs, code spans, version tags, issue/PR references, and technical identifiers exactly as they are.

Let me go through section by section:

1. Title: New API Digest — 2026-09-06 → New API 摘要 — 2026-09-06
2. Today's Highlights → 今日要点
3. The headline is v1.0.0-rc.34... → 需要详细翻译

I need to keep:
- All version tags (v1.0.0-rc.34)
- All URLs
- All issue/PR references (#7211, etc.)
- All code identifiers (reasoning_effort, model_mapping, etc.)
- All technical terms like TOTP, Passkey, OAuth, etc.

Let me be careful with the translation to make it natural Chinese technical writing.</think>

# New API 摘要 — 2026-09-06

## 今日要点

重头戏是 **v1.0.0-rc.34**,这是一个聚焦安全的发布版本,将各类鉴权统一到单一校验流程中,新增 TOTP + Passkey 作为备用因子,开放系统访问令牌的完整 CRUD(并附带审计日志),并将 Telegram 登录迁移到统一的 OAuth 组件。在中继侧,团队落地了多个正确性修复,涵盖 GPT-6 Astra 能力映射、Responses 转 Chat 时多模态工具输出的保留,以及响应负载中 `model_mapping` 的双向处理 —— 这意味着客户端不会再看到自己从未请求过的上游模型名称。

## 发布与破坏性变更

- **v1.0.0-rc.34** — 账户安全全面重构。敏感操作(登出、绑定、修改密码、2FA/Passkey 录入、渠道 Key 展示)现在需要一次性、绑定作用域、关联源会话的凭证。Telegram 登录改为 OAuth;管理员必须在 BotFather Login Widget 中注册 `/oauth/telegram` 并配置 Client ID/Secret。([release notes](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.34))

## 新增模型与硬件支持

- **GPT-6 Astra 显式能力处理** — PR #7211 将能力规则从通用的 "GPT-5" 分桶中解耦,使 Astra 拥有独立的 `temperature`/`max_tokens`/开发者角色策略,不再被基于前缀的检查遗漏。后续 GPT 主版本不会被自动推断,从而避免策略漂移。([#7211](https://github.com/QuantumNous/new-api/pull/7211))
- **rc.33 中观察到 Gemini 3.8 Flash 变体回归** — 在 #7220 中报告;中继过程会变更模型变体。([#7220](https://github.com/QuantumNous/new-api/issues/7220))

## 性能与优化

- **Responses RawMessage 批量拷贝** — PR #7221 优化了 Responses API 请求结构的深拷贝,降低每次请求的分配开销。PR 描述中未提供明确的延迟/吞吐数据,基准测试效果有待确认。([#7221](https://github.com/QuantumNous/new-api/pull/7221))
- **活跃渠道探活开关** — PR #7161 为实时渠道探活增加了开关并细化限流,旨在减少大规模渠道集群中的探活风暴。([#7161](https://github.com/QuantumNous/new-api/pull/7161))
- **与 Ability 状态一致的缓存** — PR #6997 将内存中的渠道缓存改为基于启用的 `Ability` 行(而非 `Channel.Group/Models`)进行键控,消除了缓存路径与数据库路径之间的选择分歧,并补充了禁用/重新启用流转的回归覆盖。([#6997](https://github.com/QuantumNous/new-api/pull/6997))

## 稳定性与回归

按影响排序:

1. **Anthropic → OpenAI `reasoning_effort` 未映射**(Issue #7215,已关闭) — `thinking` 等级未翻译为 OpenAI 上游的 reasoning 字段。修复已发布;依赖 Anthropic 格式客户端调用 OpenAI 推理模型的运维方应在 rc.34 上验证行为。([#7215](https://github.com/QuantumNous/new-api/issues/7215))
2. **中继中 Gemini 3.8 Flash 变体被替换**(Issue #7220,已关闭/重复) — rc.33 在中继过程中静默地更换了模型变体。确认为重复;如受影响,请确认升级到 rc.34。([#7220](https://github.com/QuantumNous/new-api/issues/7220))
3. **`model_mapping` 仅重写请求而不重写响应**(PR #6975,已关闭) — 客户端请求模型 `a` 映射到 `b`,但响应体中收到的是 `b`,破坏了客户端侧基于 `model` 字段的路由与断言。现已修复:上游名称在重写时被捕获,并在响应阶段还原。([#6975](https://github.com/QuantumNous/new-api/pull/6975))
4. **Responses → Chat 转换中多模态工具输出丢失**(PR #7227,开放中) — 目前仅保留文本;该 PR 修复了图像/文件输出。影响使用 OpenAI Responses 客户端调用 Anthropic 风格或 Chat-Completions 后端的场景。([#7227](https://github.com/QuantumNous/new-api/pull/7227))
5. **`settleTestQuota` 缺少分组倍率**(Issue #7225,已关闭/无效) — 渠道自检额度计算遗漏了分组费率倍率;在受支持的版本上报告为无效。若你以脚本方式运行测试额度流程,值得重新校验计费数据。([#7225](https://github.com/QuantumNous/new-api/issues/7225))
6. **`ParseContent()` 丢失 `cache_control`**(Issue #7224,已关闭/无效) — 内容解析过程中提示缓存标记丢失。在受支持版本上被判定为无效,但若依赖 Anthropic 提示缓存,仍值得做一轮回归冒烟测试。([#7224](https://github.com/QuantumNous/new-api/issues/7224))
7. **切换分组后 Model Plaza 卡片视图分页卡在最后一页**(Issue #7222 / PR #7223,开放中) — "上一页"按钮无响应;#7223 提出的修复在筛选条件变化时重置网格页码。([#7222](https://github.com/QuantumNous/new-api/issues/7222),[#7223](https://github.com/QuantumNous/new-api/pull/7223))
8. **`thinking_model_blacklist` / effort 后缀剥离缺少配置开关**(Issue #7217,已关闭/增强) — 当前没有 UI 可以全局抑制 effort 后缀剥离;运维方必须打补丁。值得跟踪后续 PR。([#7217](https://github.com/QuantumNous/new-api/issues/7217))

## 对应用开发者的影响

- **计划升级到 rc.34**:若你自托管且依赖 Telegram 认证、系统访问令牌或管理侧审计 —— 会话绑定的作用域凭证将改变你调用敏感管理 API 的方式,以及配置 Telegram 登录的方式。
- **审查所有基于响应 `model` 字段进行分支的客户端代码**:若你依赖 `model_mapping` 来别名化请求,rc.34 现在会在响应中还原*原始*请求的名称,这是更安全的默认行为,但可能改变你观察到的值。
- **使用 OpenAI 推理模型的 Anthropic 格式调用方**应在 rc.34 上重新验证 thinking/reasoning 等级;#7215 中的映射修复弥合了一个静默的正确性缺口。
- **面向 Chat-Completions 或 Anthropic 后端的多模态 Responses 工作负载**:跟踪 #7227 —— 在合并之前,图像/文件工具输出可能在转换过程中丢失。
- **Model Plaza UI 缺陷**(#7222)属于界面层面但会干扰模型浏览;关联的 PR #7223 即将合并,如有必要可手动回移植。
- **运维方面**:仅在配置好限流后再启用活跃渠道探活开关(#7161);默认行为变更在大渠道数量场景下可能产生不良交互。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*