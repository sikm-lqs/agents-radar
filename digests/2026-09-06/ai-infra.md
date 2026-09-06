# AI 基础设施日报 2026-09-06

> 生成时间: 2026-09-06 15:33 UTC | 覆盖项目: 9 个

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

# 跨项目基础设施报告 — 2026-09-06

**范围：** vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth、Claude Code Router (CCR)、CC Switch、New API

---

## 1. 生态概览

技术栈正在承受一波密集的新模型发布潮——DeepSeek-V4-Flash、GLM-5.3-Flash（321B 混合架构）、Qwen3.8-Flash-Next、GPT-6 Astra——压力分布并不均匀：llama.cpp 已交付 GLM-5-Next 推理能力，而 SGLang 仍背负着 GLM-5.3-Flash 的六联单缺陷簇。当下主流的工程主题是 **GPU HBM 之下的内存层级**（vLLM HiSparse 系列中的 host-resident KV、SGLang 的 KV-shard 拆分、llama.cpp 的惰性 Q8_0 KV 量化与 MoE expert-cache 提案），其驱动力来自 300B+ 稀疏/混合 MoE 模型的算力经济学。硬件多元化正在加速——DGX Spark/SM121、Strix Halo、ROCm 与 Apple Silicon 今天都获得了头等舱投入，但常常跑在稳定性前面。与此同时，网关层正在围绕 **安全与计费正确性**走向成熟（New API 的 TOTP/Passkey 里程碑、LiteLLM 的成本核算缺陷清理），Rust 也在向每一层渗透（vLLM 渲染器、SGLang TreeCore、LiteLLM 执行框架）。

---

## 2. 活跃度对比

*计数 = 各项目 2026-09-06 摘要中浮现的 issue/PR 数，并非仓库全部活动。*

| Project | Layer | Issues | PRs | Release status | Dominant theme today |
|---|---|---|---|---|---|
| **vLLM** | Serving engine | ~20（最热 issue：105 条评论） | ~18 | 无（0.24.0/0.27.1 在用） | HiSparse 7-PR 系列；混合模型缺陷簇 |
| **SGLang** | Serving engine | ~22 | ~18 | 无 | GLM-5.3-Flash 缺陷簇；Apple Silicon RFC |
| **llama.cpp** | Local runtime/kernel | ~20 | ~20 | **4 个发布**（b10821–b10825） | Spec-decode 正确性；AMD kernel 胜利 |
| **Ollama** | Local runtime/UX | ~14 | ~8 | **1 个 RC**（v0.34.0-rc1） | MLX 成熟化；8 GiB 缓存泄漏修复 |
| **LiteLLM** | Gateway | ~29 | ~17 | **2 个**（v1.100.0 stable、v1.101.0-rc.1） | Rust 执行层；计费正确性 |
| **Unsloth** | Fine-tuning/serving | **~30 已关闭** | ~19 | 无 | Studio：DGX Spark 双节点、语音、Strix Halo |
| **CCR** | Client-side router | 2 | 1 | 无 | Gateway 启动可靠性 |
| **CC Switch** | Client-side router | ~16 | ~16 | 无（v3.20.1） | Codex Responses↔Chat 翻译缺陷 |
| **New API** | Gateway/relay | 6 | 7 | **1 个**（v1.0.0-rc.34） | 账户安全重构；GPT-6 Astra 中继 |

**要点：** llama.cpp、LiteLLM、Ollama、New API 在持续发布；vLLM 与 SGLang 处于深度开发周期中（大量 PR 堆积、无 tag）；Unsloth 今日主要在做卫生清理（30+ 关闭）外加 Studio 功能。

---

## 3. 模型支持竞赛

| Model family | vLLM | SGLang | llama.cpp | Ollama | Gateways |
|---|---|---|---|---|---|
| **DeepSeek-V4-Flash** | ✅ 领先：C4 sparse-MLA（#53592），MXFP4×FP8 融合 MoE（#54032）；⚠️ SM8x/Ampere 屏蔽（#50576，105 条评论） | ⚠️ V4-Flash-Vision FP4 OOM（#37931），DSA top-k 崩溃（#37892）——未修复 | — | — | CC Switch 目录修复（#6750） |
| **GLM-5.3-Flash / GLM-5-Next（321B 混合架构）** | 修复：SM90 fp8 KV 启动（#55222） | 🔴 阻塞：六联单缺陷簇（HiCache 损坏 #38031、PP KeyError #36906、SM120 #37105） | ✅ **端到端交付**（#27754） | ⚠️ `:cloud` 无限推理循环（#18193） | 计费条目落地（CC Switch #7163） |
| **Qwen3.8-Flash-Next（hybrid）** | ✅ PLE-Offload 可服务，TP4+MTP（#53899） | ⚠️ MTP 接受率衰减至 ~0（#37326） | ⚠️ 混合架构在 130k 后静默 EOS（#27756） | ✅ MLX YaRN 长上下文（#18263） | — |
| **GPT-6 Astra**（闭源） | — | — | — | — | ✅ New API 中继支持（#7211）；CC Switch 计费（#7162） |
| **Spark2_5** | — | — | ✅ 已交付（#27868） | ❌ 下载后无法推理（#18195） | — |

**判定：** **vLLM 在数据中心开放模型启用上领先**（DeepSeek-V4 sparse-MLA + Qwen3.8 FP8）；**llama.cpp 在边缘覆盖上领先，并率先跑通 GLM-5.3-Flash**；SGLang 雄心不小，但在最新混合架构上稳定性滞后；**GPT-6 Astra 的差距只在网关层**，由 New API 领跑。硬件方面：SGLang 独自支持 T-Head PPU；Unsloth 与 llama.cpp 占据 Strix Halo/gfx1201；Apple Silicon 在 SGLang（RFC #32321）、Ollama（MLX 胜利）与 llama.cpp（M2 Max FA 调优）之间混战。

---

## 4. 性能前沿

1. **KV/expert 内存分层（最热方向）。** vLLM 的 HiSparse 系列（7 个 PR：hot-buffering、NIXL per-region 几何、Prometheus hit/miss 指标）让 sparse-MLA page 尽量驻留在设备上，待强制 host-spill 才下放；其 MoE-offload RFC（#38256）引入 pinned expert weights + LFRU GPU 缓存。SGLang 落地 KV-shard split 1/4（#37614），修复 HiCache Mooncake，并在 B300 上弥合 unified-vs-static DCP decode 差距（#37926）。llama.cpp 交付惰性 Q8_0 KV 量化（#28267），并设计了两层 MoE expert cache（#20757）。Ollama 在 8 GiB 未跟踪的泄漏之后，给 llama-server prompt-cache RAM 加了上限（`OLLAMA_CACHE_RAM`，#18265）。
2. **解耦 P/D 进入主流。** vLLM：DBO 全 CUDA-graph capture（#51700）、P/D 直降 GPU（#55398）。SGLang：PP16 prefill 实测约 7.8 s 准入下限（#38206）。甚至 llama.cpp 也发布了官方解耦 prefill/decode 路线图（#21266）。
3. **量化 kernel。** llama.cpp：HIP Q2_0 在 gfx1201 上 token 生成 **+33–35%**，bit-exact（#26753）；Vulkan MMVQ 路径修复（#28489）兼具性能与正确性。vLLM：FlashInfer SM90 MXFP4×FP8 融合 MoE（#54032）。SGLang：W4A8 CUTLASS 针对 H200 上的 GLM-5.2 重新调优（#38220），通过 TRTLLM/CuTe DSL 的 NVFP4（#38216）。
4. **原生层重写（管道阶段，尚无公开收益数据）。** LiteLLM 9-PR 的 Rust harness 整合，目标统一为 `LITELLM_RUST` 开关；vLLM 的独立 Rust 渲染器镜像（#51503）；SGLang 的 Rust TreeCore SWA 移植（#37584）。
5. **网关层优化。** LiteLLM 按序列长度分桶的延迟指标（#40059）；New API Responses 上的批量深拷贝（#7221）+ 通道探测节流（#7161）；CC Switch 的旗舰规划器/廉价子代理路由提案（#7165）把优化目标推向 **成本**而非延迟。

---

## 5. 层级定位

- **数据中心推理引擎（vLLM、SGLang）：** 在内存层级和解耦方向上正面竞争。vLLM 走广度+生态路线（NIXL、FlashInfer、8+ 模型族）；SGLang 走性能优先与激进实验路线（DCP、DPC、diffusion residency planner），但在 GLM-5.3-Flash 上交了稳定性税。
- **本地运行时（llama.cpp、Ollama）：** llama.cpp 是 kernel/底层基座——其 GGUF 与后端同时支撑 Ollama 和 Unsloth Studio。Ollama 是分发与体验层（v0.34.0-rc1 中的 ChatGPT Desktop 集成、MLX runner、cloud tags），位于硬件之上的一层。
- **网关（LiteLLM、New API）：** 服务端、多租户、企业面。今天的工作重点是安全与钱：New API 交付 TOTP/Passkey + 审计日志；LiteLLM 修复 AdaptiveRouter 和 OAuth2 崩溃，同时与计费准确性缺陷斗争。
- **客户端路由器（CCR、CC Switch）：** 面向编程 agent 的桌面代理；其硬骨头是 **协议翻译**（Responses ↔ Chat ↔ Anthropic），证据是 CC Switch 6+ 开放中的翻译缺陷与 CCR 不透明的 502。
- **微调（Unsloth）：** 起家于训练，但今日活动（DGX Spark 双节点 serving 编排器 #10323、SSE 控制帧、`/v1/embeddings`）显示其正向 **下层**延伸到 serving。**层级边界正在肉眼可见地模糊**——引擎在补可观测性（vLLM、Ollama `/metrics`），运行时在加 server 能力，训练器在加 serving，网关在加执行。

---

## 6. 趋势信号

1. **混合/稀疏架构是当前的正确性前沿。** 三条 vLLM 高危混合缺陷、SGLang 的 GLM 簇、llama.cpp 130k 静默 EOS、temp=0 非确定性（#54521）都在同一天冒头。这些架构发布时，其状态管理语义还没打磨扎实。
2. **HBM 之下的内存分层是 2026 年的经济学故事**——今天每个运行时项目都在 host-tier KV、expert offload 或统一内存方向上有所动作。这直接决定了谁能在 A100/H100 级机队上服务 300B+ MoE。
3. **Ampere 焦虑是真实的：** vLLM #50576（105 条评论）显示 A100/RTX-30xx 用户在新模型启用上感到被抛弃。
4. **工具调用/协议保真度是面向 agent 的头号风险**，贯穿 **每一层**：vLLM 解析器缺陷（Qwen2.5、Gemma4、`strict` 泄漏）、llama.cpp GBNF schema 缺陷、CC Switch 翻译缺陷、New API `reasoning_effort` 映射、Ollama cloud JSON 拆分。**Agent 开发者应当钉住工具调用回归套件，并把解析器行为当作跨小版本不稳定项对待。**
5. **边缘 AI 集群（DGX Spark、Strix Halo、SM120）正在获得头等舱待遇**，尽管 SM121 在 vLLM、SGLang、llama.cpp 上的边缘仍有崩溃级毛刺。
6. **网关层正在走向专业化**（安全 MFA、签名镜像、审计日志），但计费正确性仍然滞后——LiteLLM 自定义模型 $0 计费（#35691）、缓存读取重复计费（#40006）、Vercel cache token 多计费（#39088）都是线上生产风险。

**未来 1–2 周关注清单：** SGLang GLM-5.3-Flash 跟踪（#37524、#37813）；vLLM #50576（Ampere 解锁）；llama.cpp #28489（spec-decode 修复——现在就去审计量化目标的输出）；LiteLLM 计费修复完成前不要轻信花销日志；Ollama v0.34.0 stable（17–27 s MLX re-prefill 修复，#18267）；New API 的 Telegram OAuth 迁移是 rc.34 切换时的 **硬破坏性变更**。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-06

## 1. 今日要点

过去 24 小时的活动主要由两条线索主导。DeepSeek-V4-Flash SM8x（Ampere A100/A800、RTX 30xx）启用请求已累计 105 条评论，成为仓库中讨论度最高的 issue（[#50576](https://github.com/vllm-project/vllm/issues/50576)）。PR 方面，面向 host-resident sparse-MLA decode 的 HiSparse 系列仍在以堆叠形式陆续合入——包括 hot-buffering（[#53781](https://github.com/vllm-project/vllm/pull/53781)）、按 region 的 NIXL 传输几何（[#53780](https://github.com/vllm-project/vllm/pull/53780)），以及 DeepSeek V4 C4 支持（[#53592](https://github.com/vllm-project/vllm/pull/53592)）。

## 2. 版本与破坏性变更

过去 24 小时内无新发布的 tag。

值得标记的行为变更：
- **OpenAI `strict` 标志泄漏到 chat template** —— vLLM 0.24.0 会将 `tools[].function.strict` 渲染进模型可见的 chat template，改变了 Qwen3.6-27B-FP8 上的 tool-call 行为（[#52741](https://github.com/vllm-project/vllm/issues/52741)）。在依赖 `strict=true` 语义之前，请用 flag 隔离或修复该问题。
- **固定的 `--block-size` 在 prefix-cache resume 时破坏 mamba 混合状态** —— 影响 vLLM 0.27.1、V2 GPU runner、RTX 3090 上的 Qwen3.8-27B（[#53142](https://github.com/vllm-project/vllm/issues/53142)）。在该修复落地前，请避免在混合 GDN/mamba 模型上覆盖 `--block-size`。

## 3. 新模型与硬件支持

- **DeepSeek-V4-Flash / DeepSeek-V4-Flash-0731** —— SM8x 启用是当前的 gate issue；最新 checkpoint 发布于 2026-07-31（[#50576](https://github.com/vllm-project/vllm/issues/50576)）。
- **Qwen3.8-Flash-Next (FP8)** —— PLE-Offload 支持 PR 已就绪，配合 MTP 投机解码 + prefix caching，可在 `-tp 4` 下对外服务（[#53899](https://github.com/vllm-project/vllm/pull/53899)）。
- **DeepSeek V4 C4 sparse MLA** —— HiSparse resident + host-backed cache 通路，包括压缩后的 slot/block 几何与拆分 FP8 value/scale 的 page 布局（[#53592](https://github.com/vllm-project/vllm/pull/53592)）。
- **GLM-5.3-Flash** —— 修复 SM90 sparse MLA 上 `--kv-cache-dtype fp8` 启动失败以及 indexer prefill workspace 过大的问题（[#55222](https://github.com/vllm-project/vllm/pull/55222)）。
- **ROCm gfx942 / gfx950** —— HY V4 graph-mode 服务路径已优化，集成 AITER fused biased-sigmoid top-k 与额外的 graph 调优（[#54594](https://github.com/vllm-project/vllm/pull/54594)）。
- **FlashInfer SM90 MXFP4 × FP8 fused MoE backend** —— 为 DeepSeek-V4 系列 MXFP4 专家权重提供可选的 `--moe-backend flashinfer_cutlass_humming`（[#54032](https://github.com/vllm-project/vllm/pull/54032)）。
- **InternVL2 搭配 Transformers v5** —— meta-device init 路径单独跟踪（[#38425](https://github.com/vllm-project/vllm/issues/38425)）。
- **独立 Rust renderer Docker 镜像** —— 无引擎的 `vllm-rs` 二进制，`docker buildx bake rust-renderer`（[#51503](https://github.com/vllm-project/vllm/pull/51503)）。

## 4. 性能与优化

- **HiSparse（活跃 7 个 PR）** —— GPU KV cache 之下的 host-resident 层，用于 sparse-MLA decode；页面保持在 device 上，直到容量耗尽才下放到 host（[#53781](https://github.com/vllm-project/vllm/pull/53781)）。当 decoder 有余量时，P/D 可直接落到 GPU（[#55398](https://github.com/vllm-project/vllm/pull/55398)）。Shared/private host pool 模式在 planner 中解析，对不支持的 Indexer 布局回退到 private（[#52760](https://github.com/vllm-project/vllm/pull/52760)）。Prometheus 指标涵盖 hot-buffer 命中/未命中与 host↔device 字节数，每 2000 个 worker step 采样一次以避免每步同步（[#53782](https://github.com/vllm-project/vllm/pull/53782)）。
- **NIXL KV Connector** —— 按 region 的 stride/capacity/size 元数据贯穿 descriptor 构造；支持 packed cache storage 与纯 MLA peer（[#53780](https://github.com/vllm-project/vllm/pull/53780)）。同节点读通过已注册的 device buffer 进行两段式完成门控（[#53263](https://github.com/vllm-project/vllm/pull/53263)）。
- **MRV2 上的 DBO（Disaggregated Batch Optimization）** —— 微批步骤的完整 CUDA-graph capture 作为 RFC 栈的后半段合入（[#51700](https://github.com/vllm-project/vllm/pull/51700)）。
- **多模态 cache 快路径** —— 可选的 `VLLM_EARLY_UUID_LOOKUPS` 在 UUID 命中时完全跳过 video/image 解码（[#55583](https://github.com/vllm-project/vllm/pull/55583)）。
- **GLM video backends** —— 替换 `GLM46VVideoBackend` 与 `GLMGAVideoBackend` 中 O(source_frames) 的时间戳扫描（[#55582](https://github.com/vllm-project/vllm/pull/55582)）。
- **MOE offloading RFC** —— pinned-memory 专家权重 + LFRU GPU cache + 跨层预测，以在更小的硬件上运行超大 MoE；第一个 PR 已开（[#38256](https://github.com/vllm-project/vllm/issues/38256)）。

## 5. 稳定性与回归

**高危（崩溃 / 静默损坏）：**
- **FlashInfer + MTP 投机解码在 SM121（GB10 / DGX Spark）上对 GQA=16 模型（Nemotron-3-Super-120B-A12B-NVFP4）发生非法内存访问。** Triton backend 不受影响。暂无修复 PR。（[#37754](https://github.com/vllm-project/vllm/issues/37754)）
- **Spec-decode FULL cudagraph 在 `prompt_tokens == uniform_decode_query_len * num_reqs` 时错误路由 prefill** —— 混合 Qwen3-Next 上出现静默的 GDN 状态丢失与乱码输出。暂无修复 PR。（[#53051](https://github.com/vllm-project/vllm/issues/53051)）
- **Hybrid mamba align precopy 在 prefix-cache resume 并显式指定 `--block-size` 时，用错误的块大小填充 state 列** —— 非法内存访问。暂无修复 PR。（[#53142](https://github.com/vllm-project/vllm/issues/53142)）

**中危（正确性）：**
- **Qwen3.8-Flash-Next 在 temperature=0 下跨越 `indexer_budget` 时出现非确定性**（QSA 在 dense → top-k 间切换）。sm121/GB10 上五个字节级相同的请求产生了五种不同的补全。（[#54521](https://github.com/vllm-project/vllm/issues/54521)）
- **DBO microbatch survivor deref**：当某个 microbatch 在 peer 完成前退出其 `UBatchContext` 时触发，出现在 V2 runner 上。已有修复 PR。（[#55586](https://github.com/vllm-project/vllm/pull/55586)）
- **OffloadingConnector 在 MTP/EAGLE 下将 offload 命中清零** —— KV 存储在 CPU 层，但可复用 token 数返回为 0。已有修复 PR。（[#52771](https://github.com/vllm-project/vllm/pull/52771)）
- **GLM-5.3-Flash 在 SM90 sparse MLA 上 fp8 plan dtype 不匹配** —— `uint8` 存储与 `float8_e4m3fn` 视图不一致，导致 `plan()` 失败。已有修复 PR。（[#55222](https://github.com/vllm-project/vllm/pull/55222)）
- **`assert` 被当作运行时控制流** —— 出现在 KV-cache / entrypoints / mamba utilities 中，在 `python -O` 下行为静默错误（例如对多元素集合调用 `set.pop()` 会返回任意值）。已有修复 PR。（[#55187](https://github.com/vllm-project/vllm/pull/55187)）
- **T4（SM 7.5）上 Qwen3.5-27B 出现极端缓慢 / 无限挂起**，即便应用了 #36357 中的 SM<8.0 TORCH_SDPA 回退（[#36589](https://github.com/vllm-project/vllm/issues/36589)）。

**Tool-calling 表面（低–中危）：**
- **Qwen2.5 tool parser + OpenAI content format** 导致 chat 请求失败（[#54491](https://github.com/vllm-project/vllm/issues/54491)）。
- **Gemma4 tool parser** 丢弃裸 `<|tool_call>:name{...}` 起首符 —— 无论流式还是非流式，都既无 tool call 也无 content（[#53431](https://github.com/vllm-project/vllm/issues/53431)）。
- **OpenAI `strict` 标志泄漏到 chat template** —— 见 §2（[#52741](https://github.com/vllm-project/vllm/issues/52741)）。

**已关闭（进展）：** RFC #8913 quantized-linear decouple（[#33314](https://github.com/vllm-project/vllm/issues/33314)）、fp4 scaled-mm kernel abstraction（[#31823](https://github.com/vllm-project/vllm/issues/31823)）、Qwen3-Next automatic prefix caching（[#25874](https://github.com/vllm-project/vllm/issues/25874)）、PluggableLayer / vLLM-IR CustomOp replacement tracker（[#32676](https://github.com/vllm-project/vllm/issues/32676)）、sleep-mode `torch.cuda` 计数器（[#33625](https://github.com/vllm-project/vllm/issues/33625)）。

## 6. 对应用开发者的影响

- **在 Ampere 上请勿仓促锁定 DeepSeek-V4-Flash。** 如果你的机型是 A100/A800 或 RTX 30xx，#50576 是当前的 unblocker；在承诺生产前请持续跟踪。
- **HiSparse 成为 sparse-MLA 服务的新默认。** 如果你跑 P/D disaggregation，新增的按 region NIXL 元数据与 host-staged reads 消除了一类 pinned-memory 的摩擦。系列合并前计划用 NIXL peer 重新验证。
- **混合 GDN/mamba 模型仍是风险最高的表面。** 仅过去 24 小时内就有三个独立的崩溃/正确性 bug（mamba block-size 状态、spec-decode prefill 误路由、FlashInfer SM121）。如果你的服务对象是 Qwen3-Next / Qwen3.8 混合模型，请保留一套已知良好的 torch.compile 配置，并暂时避免覆盖 `--block-size`。
- **Tool-calling 在各 parser 间很脆弱。** Qwen2.5、Gemma4、OpenAI `strict` 标志各自都有未解决的缺陷。请在 CI 中固定 tool-call 行为测试，不要依赖次版本之间的 parser 兼容性。
- **值得重新评估的新（重新）开启特性：** DRY sampler（[#8581](https://github.com/vllm-project/vllm/issues/8581)）、attention-score output（[#3192](https://github.com/vllm-project/vllm/issues/3192)）、classification 场景的多 LoRA（[#19623](https://github.com/vllm-project/vllm/issues/19623)、[#12829](https://github.com/vllm-project/vllm/issues/12829)），以及 max waiting-queue length 旋钮（[#18826](https://github.com/vllm-project/vllm/issues/18826)）—— 均处于活跃状态，可能很快合入。
- **多模态延迟优化可以落地。** `VLLM_EARLY_UUID_LOOKUPS`（[#55583](https://github.com/vllm-project/vllm/pull/55583)）与 GLM video-frame scan 修复（[#55582](https://github.com/vllm-project/vllm/pull/55582)）合并后风险都很低；如果你会预处理重复的多媒体，UUID 短路基本是零成本收益。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-06

## 今日要点
- **GLM-5.3-Flash 在 bug 追踪中"独占鳌头"。**一组未关闭的 issue（#36906、#37105、#37524、#37813、#38031、#38207）报告了在 SM120、流水线并行与 DPC 配置下出现的崩溃、KV-cache 损坏以及 HiCache host-tier load-back 损坏 —— GLM-5.3-Flash 的 bug tracker（#37524）以及 SM120 的 fix tracker（#37813）都尚未完全关闭。
- **Apple Silicon 推理路径正在重构。**[#32321](https://github.com/sgl-project/sglang/issues/32321) 是一份正在推进的 RFC，提出基于 Torch 自有 SRT 路径并导出一个整模型 MLX 区域，建在前序 [#32984](https://github.com/sgl-project/sglang/issues/32984) 的 Torch/MLX 互操作工作之上。
- **compressed-tensors 量化 embedding 静默输出全 NUL。**[#38143](https://github.com/sgl-project/sglang/issues/38143) 报告 MiniMax-M3 W4A16 在 2× DGX Spark 上服务正常，但每一步都生成 token id 0；同日合并的 PR [#38224](https://github.com/sgl-project/sglang/pull/38224) 让 `CompressedTensorsConfig` 直接拒绝量化 embedding，而不是静默产出垃圾输出。

## 发布与破坏性变更
过去 24 小时内无新发布。

## 新模型与新硬件支持
- **T-Head PPU**（ZW810 / ZW810E / ZW-M890P）上游路线图 — [#37519](https://github.com/sgl-project/sglang/issues/37519)。
- **Mamba 1/2 推理支持**（进行中） — [#34556](https://github.com/sgl-project/sglang/pull/34556)。
- **Nemotron latent-MoE 融合投影 + shared-expert add** — [#30430](https://github.com/sgl-project/sglang/pull/30430)。
- **AMD 面向 Quark MXFP4 checkpoint 的 dense-FP8 路径**（融合 silu/mul/activation 量化） — [#28932](https://github.com/sgl-project/sglang/pull/28932)。
- **通过标准 FlashInfer TRTLLM 与 CuTe DSL 后端的 NVFP4 dispatch** — [#38216](https://github.com/sgl-project/sglang/pull/38216)。
- **Apple Silicon 路线图续推**（[#19137](https://github.com/sgl-project/sglang/issues/19137)）+ 重构 RFC（[#32321](https://github.com/sgl-project/sglang/issues/32321)）。

## 性能与优化
- **Blackwell 上 unified-memory DCP decode 出现回退** — [#37926](https://github.com/sgl-project/sglang/pull/37926) 修复了在 B300 / Kimi-Linear / TP2 DCP2 + `cutedsl_mla` 上测得的 1.96% 回归；之前 Hopper 上的修复未能直接迁移过来。
- **GLM-5.2 在 H200 上的 W4A8 MoE 调优** — [#38220](https://github.com/sgl-project/sglang/pull/38220) 替换了原本面向 DeepSeek 配置调优的 (n,k)-keyed CUTLASS dispatcher。
- **Unified Radix Cache：SWA 分支点缓存移植到 Rust TreeCore** — [#37584](https://github.com/sgl-project/sglang/pull/37584)；Rust core 是并行实现而非绑定，因此并未继承 #34565。
- **KV-shard split, 1/4：逻辑页布局** — [#37614](https://github.com/sgl-project/sglang/pull/37614) 仅落地索引空间，未挂任何运行时 flag。
- **Diffusion residency planner 系列**：可逆 residency 预热（[#36703](https://github.com/sgl-project/sglang/pull/36703)）、尊重 pipeline 步数下限的单次探针校准（[#37809](https://github.com/sgl-project/sglang/pull/37809)）、只读 safetensors 映射（[#37822](https://github.com/sgl-project/sglang/pull/37822)）、安静的内部 warmup frame 搜索（[#38226](https://github.com/sgl-project/sglang/pull/38226)）、H3 参考音频稳定化（[#38225](https://github.com/sgl-project/sglang/pull/38225)）。
- **HiCache Mooncake linker 加载在 abort 后保持排队** — [#38195](https://github.com/sgl-project/sglang/pull/38195) 恢复了 UMBP 风格的行为。

## 稳定性与回退
按影响半径排序。

- **GLM-5.3-Flash HiCache host-tier 损坏**（8×H100 TP8，无投机解码） — [#38031](https://github.com/sgl-project/sglang/issues/38031)。出现工具调用被丢弃与退化的复读循环；尚无修复 PR。
- **DeepSeek-V4-Flash-Vision FP4 权重加载在 2× DGX Spark 上 OOM** — [#37931](https://github.com/sgl-project/sglang/issues/37931)。FP8→FP4 MoE 转换过程中 Scheduler 被 OOM-killed，5/5 复现。仍未修复。
- **DeepSeek-V4 长上下文 prefill 非法内存访问**，出现在 DSA indexer top-k 内核（`topk_v1.cuh:348`）；paged prefill 路径无法触达 v2 内核 — [#37892](https://github.com/sgl-project/sglang/issues/37892)。仍未修复。
- **DFLASH/DSPARK draft KV pool 使用了 `tp_size` 而非 `attn_tp_size`** → 在 Kimi-K3 的 DP attention 下 OOM — [#38202](https://github.com/sgl-project/sglang/issues/38202)。仍未修复。
- **PP16 disaggregated prefill：在并发长输入下出现约 7.8 s 的 bootstrap admission 等待** — [#38206](https://github.com/sgl-project/sglang/issues/38206)。仍未修复。
- **GLM-5.3-Flash 启动期 `KeyError: 'residual'`，发生在 PP 下** — [#36906](https://github.com/sgl-project/sglang/issues/36906)。仍未修复。
- **GLM-5.3-Flash 在 RTX PRO 6000（sm_120）上**：在 `deep_gemm` NameError 之后出现两个 DSA 后端阻塞 — [#37105](https://github.com/sgl-project/sglang/issues/37105)。在 [#37813](https://github.com/sgl-project/sglang/issues/37813) 下追踪。
- **MiniMax-M3 W4A16 在 2× DGX Spark 上全 NUL 输出** — [#38143](https://github.com/sgl-project/sglang/issues/38143)。**修复：** [#38224](https://github.com/sgl-project/sglang/pull/38224)（compressed-tensors 现在直接拒绝量化 embedding，而不再静默丢弃其量化方法）。
- **NEXTN/MTP draft 接受率在 qwen4_exp（Qwen3.8-Flash-Next）服务运行期间衰减至约 0**；重启后恢复 — [#37326](https://github.com/sgl-project/sglang/issues/37326)。仍未修复。
- **OpenAI Responses API：`POST /v1/responses/{id}/cancel` 对前台响应也返回 200** — [#38087](https://github.com/sgl-project/sglang/pull/38087) 将 cancel 限制为仅作用于 `background=true` 的响应。
- **OTel tracing 在 `--tokenizer-worker-num>1` 时丢失 Scheduler span** — [#38210](https://github.com/sgl-project/sglang/issues/38210)。**修复：** [#38211](https://github.com/sgl-project/sglang/pull/38211)（多 tokenizer/detokenizer 的 router 现在会调用 `process_tracing_init`）。
- **GLM-5.3 DPC 崩溃** — [#38207](https://github.com/sgl-project/sglang/issues/38207)。新开 issue。
- **Step-3.5-Flash 多层 EAGLE KV-cache batch-size 不匹配（期望 4，得到 7）**，发生在 eager 模式 — [#30354](https://github.com/sgl-project/sglang/issues/30354)。以 inactive 关闭。
- **ROCm 多模态 CUDA-IPC 回退路径在 `MmItemMemoryPool` 溢出时崩溃** — [#29687](https://github.com/sgl-project/sglang/issues/29687)。以 inactive 关闭；按既定 workaround 处理。
- **sgl_kernel SM121 aarch64 wheel 在 DGX Spark 上缺失** — [#29317](https://github.com/sgl-project/sglang/issues/29317)。以 inactive 关闭。
- **CUDA coredump 自动收集器追踪帖** — [#26340](https://github.com/sgl-project/sglang/issues/26340)（CI 基础设施，293 条评论）。
- **CI 测试失败与修复追踪帖** — [#17050](https://github.com/sgl-project/sglang/issues/17050)：5 个 broken，13 个 flaky，944 个近期已修复（自动更新于 2026-09-06 14:59 UTC）。

## 对应用开发者的影响
- **暂勿将 GLM-5.3-Flash 推到生产。** 活跃 bug 覆盖 HiCache 损坏、流水线并行启动以及消费级 Blackwell GPU。部署前请关注 [#37524](https://github.com/sgl-project/sglang/issues/37524) 与 [#37813](https://github.com/sgl-project/sglang/issues/37813)。
- **DGX Spark（GB10 / SM121）是已知的"边缘地形"。** DeepSeek-V4-Flash-Vision（#37931）、MiniMax-M3 W4A16（#38143 — 今日合并修复）以及 SM121 aarch64 wheel 缺口（#29317）都在此汇聚。请固定到最近的镜像版本，并在扩量前验证业务负载。
- **compressed-tensors 服务今天更安全了。** PR [#38224](https://github.com/sgl-project/sglang/pull/38224) 把一个静默的正确性失败改成了硬性拒绝，部署不会再从量化 embedding 表中吐出"看上去是坏的"的 token 流。
- **分片 tokenization 下的 OTel tracing 恢复正常。** 若你以 `--tokenizer-worker-num>1` 运行并依赖 Scheduler span，[#38211](https://github.com/sgl-project/sglang/pull/38211) 已将其恢复。
- **PP/PD disagg prefill 在 PP16 上存在 7.8 s 的 admission 下限。** 若你的 SLO 对延迟敏感且面临并发长输入，请在 [#38206](https://github.com/sgl-project/sglang/issues/38206) 修复前避免使用 PP16 prefill。
- **Responses API `/cancel` 语义现已与 OpenAI 对齐。** 对前台响应的 cancel 现在返回 400（[#38087](https://github.com/sgl-project/sglang/pull/38087)）；请相应更新客户端的错误处理逻辑。
- **Blackwell decode 上的 unified-memory 不再有回退。** #37926 落地了 unified 与 static 之间 decode 差距的收口；在 B300 上，unified memory 对 DCP decode 负载重新可用。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-06

## 1. 今日要点

过去 24 小时发布了四个小版本（b10821–b10825），带来 Metal M2 Max FlashAttention 调优、`--log-jsonl` 参数、简化的 CMake UI 资源内嵌，以及语法最大重复次数阈值修复。当前活跃的 issue 和 PR 队列主要集中在**量化目标上的投机解码正确性**、**工具调用语法 / JSON Schema bug**以及**后端性能优化**（HIP Q2_0 +33–35%、gfx1201 FlashAttention、Vulkan MMVQ 路径修复）。多项长期搁置的问题也在趋向收敛——尤其是分离式 prefill/decode 路线图和 KV-cache 延迟量化。

## 2. 版本发布与破坏性变更

| Build | 要点 | PR |
|---|---|---|
| **b10825** | `grammar`：修复最大重复次数阈值 | [#28469](https://github.com/ggml-org/llama.cpp/pull/28469) |
| **b10823** | `common`：新增 `--log-jsonl`（将 `unknown` 重命名为 `none`） | [#28437](https://github.com/ggml-org/llama.cpp/pull/28437) |
| **b10822** | `ui`：通过 CMake 直接内嵌资源——移除外部 gzip 依赖与交叉编译辅助脚本 | [#28445](https://github.com/ggml-org/llama.cpp/pull/28445) |
| **b10821** | `metal`：补齐 **M2 Max** 的 fa-vec 调优 | [#28458](https://github.com/ggml-org/llama.cpp/pull/28458) |

**迁移提示：**
- `--log-jsonl` 引入了新的结构化日志接收端；之前靠正则解析 stderr 的流水线应改为使用该参数，而非继续抓取标准输出。
- 语法最大重复次数变更（#28469）可能影响带约束的输出工作流——所有曾命中旧阈值的测试用例需重新验证。
- UI 资源内嵌（#28445）简化了打包流程：`gzip` 不再是 `llama-server` WebUI 的构建依赖。

## 3. 新增模型与硬件支持

- **Spark2_5ForCausalLM** — GGUF 转换、张量映射、tokenizer pre-tokenizer、端到端推理（[#27868](https://github.com/ggml-org/llama.cpp/pull/27868)）
- **HrmTextForCausalLM / DFM Mimir 1B** — 双栈 HRM-Text transformer，融合 gqkv 投影（[#27625](https://github.com/ggml-org/llama.cpp/pull/27625)）
- **GLM-5-Next (GLM-5.3-Flash)** — 321.3B 混合线性 / 稀疏注意力 MoE，附带视觉塔；需设置 `NVIDIA_TF32_OVERRIDE=0`（[#27754](https://github.com/ggml-org/llama.cpp/pull/27754)）
- **OpenCL** — 修复平台上报 3.0 但驱动仅支持 1.2 时的编译器版本检测问题（[#28499](https://github.com/ggml-org/llama.cpp/pull/28499)）
- **CPU 量化** — 新增 IQ2_NL / IQ3_NL 类型，使 256-block super-block K/I-quants 可用于行长度**非** 256 倍数的张量（[#27322](https://github.com/ggml-org/llama.cpp/pull/27322)）
- **CPU 算子** — 为 `GET_ROWS_BACK` 增加 BF16 支持（此前仅支持 FP32/FP16）（[#28493](https://github.com/ggml-org/llama.cpp/pull/28493)）
- **RPC / RDMA** — 为 **iWARP** 增加 `rdma_cm` 回退路径（无 IP 映射的 GID；RoCE 当前探测静默失败）（[#28494](https://github.com/ggml-org/llama.cpp/pull/28494)）
- **AMD GCN** — 按架构分发的 MMQ 配置，避免 wave64 / 512-thread 配置回退到 RDNA2 路径（[#27841](https://github.com/ggml-org/llama.cpp/pull/27841)）

## 4. 性能与优化

- **HIP Q2_0 (gfx1201)** — 使用原生 AMD 置换指令替代通用 HIP 字节置换：token 生成速度**约提升 33–35%**，全部 65,536 个打包 Q2 值位级一致（[#26753](https://github.com/ggml-org/llama.cpp/pull/26753)）
- **CUDA/HIP FlashAttention (gfx1201 / R9700 PRO)** — 通用 FA 路径中 head-size-256 的 bug 已修复；32 GB R9700 PRO 上的长上下文 prefill 不再"惨不忍睹"（[#28102](https://github.com/ggml-org/llama.cpp/pull/28102)）
- **Vulkan MMVQ 路径** — 此前对 `N=1` decode 强制使用 F32 DMMV，而 `N>1` 投机验证则使用 Q8_1 + 整型点积 MMVQ；精度不一致导致近似平局时 greedy 选择翻转（#25618 的根因）。现在路径选择与 batch 大小解耦（[#28489](https://github.com/ggml-org/llama.cpp/pull/28489)）
- **Metal M2 Max** — 剩余的 fa-vec FlashAttention 调优随 b10821 合入（[#28458](https://github.com/ggml-org/llama.cpp/pull/28458)）
- **KV-cache 延迟 Q8_0 量化** — 通过开关按需降阶量化缓存，仅在 FP16 缓存耗尽时执行；该工作是严格的 KV 轮转元数据保存 / 恢复功能的上游依赖（[#28267](https://github.com/ggml-org/llama.cpp/pull/28267)、[#28498](https://github.com/ggml-org/llama.cpp/pull/28498)）
- **`llama-bench --bandwidth`** — 新增可选列，估算 token 生成阶段的 `model_size × t/s` GB/s（[#28459](https://github.com/ggml-org/llama.cpp/pull/28459)）
- **ROCm AllReduce** — 在 HIP 上重新启用（此前因缺少 host API 而关闭）（[#27825](https://github.com/ggml-org/llama.cpp/pull/27825)）
- **MoE expert 缓存** — 可插拔的两级 GPU+RAM 缓存，用于 expert offload（封闭提案，设计讨论进行中）（[#20757](https://github.com/ggml-org/llama.cpp/issues/20757)）
- **CPU MoE FFN 簇选择** — `--n-cpu-mode` 与 `--n-cpu-ffn` 配合，可将 FFN 分片绑定到指定核心（[#27987](https://github.com/ggml-org/llama.cpp/pull/27987)）

## 5. 稳定性与回归

| 严重度 | Issue | 状态 |
|---|---|---|
| 🔴 高 | **投机解码（draft-mtp / draft-dspark）在 Q4_K_M 目标上的 greedy 发散**——与 bf16 一致但与量化不一致；ngram spec 正常。Vulkan 根因已定位为 F32 DMMV 与 Q8_1 MMVQ 的精度翻转（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)） | **修复 PR** [#28489](https://github.com/ggml-org/llama.cpp/pull/28489) |
| 🔴 高 | **CUDA graphs 在 RTX 5090 Laptop / sm_120 上挂起 GPU channel（RC watchdog + Xid 8）**（[#27330](https://github.com/ggml-org/llama.cpp/issues/27330)） | 临时方案：`GGML_CUDA_DISABLE_GRAPHS=1` |
| 🔴 高 | **Blackwell GGML-CUDA SOFT_MAX 崩溃**，发生于 RTX 5090（SM 12.0、CUDA 13.3、驱动 580.17）加载 35B+ 模型时（[#25060](https://github.com/ggml-org/llama.cpp/issues/25060)） | 用户已提交修复补丁，待评审 |
| 🟠 中 | **Qwen3.6-35B-A3B 在约 80K+ 上下文、单卡 CUDA 上出现 NaN logits**（[#23606](https://github.com/ggml-org/llama.cpp/issues/23606)） | 已停滞 |
| 🟠 中 | **Qwen3.5-hybrid 64 层（DeltaNet）在 >130k 上下文时静默立刻 EOS**——CUDA 和 CPU 均复现；与递归态深度 × 层数退化一致（[#27756](https://github.com/ggml-org/llama.cpp/issues/27756)） | Open |
| 🟠 中 | **Qwen3.6-27B-MTP + `--fit on` + `--sleep-idle-seconds`** 在已设置 `tensor_buft_overrides` 时失败（[#24684](https://github.com/ggml-org/llama.cpp/issues/24684)） | 已有修复 |
| 🟠 中 | **SYCL/OpenCL P2P 在多卡 Arc 上经 `dev2dev_memcpy` / `ext_oneapi_can_access_peer` 崩溃**（[#27168](https://github.com/ggml-org/llama.cpp/issues/27168)） | Open |
| 🟠 中 | **SYCL 多卡主机端 GTT mirror 在 VmRSS / free 中不可见**（[#22116](https://github.com/ggml-org/llama.cpp/issues/22116)） | 已停滞 |
| 🟡 低 | **JSON-schema → GBNF**：嵌套 `string.maxLength ≥ 2000` 生成不可解析的 GBNF（[#25746](https://github.com/ggml-org/llama.cpp/issues/25746)）；空对象 schema 以及过大的 maxLength 也会拒绝本应合法的工具调用请求（[#25923](https://github.com/ggml-org/llama.cpp/issues/25923)） | Open |
| 🟡 低 | **`peg-native` 工具调用语法生成器输出的 GBNF 无法通过自身解析器**（Kimi K2.7-Code，22-tool fan-out）（[#24658](https://github.com/ggml-org/llama.cpp/issues/24658)） | 已停滞 |
| 🟡 低 | **OpenAI 兼容的工具调用对简单 object schema 输出畸形 / 不完整的 JSON**（[#22072](https://github.com/ggml-org/llama.cpp/issues/22072)） | 已停滞 |
| 🟡 低 | **`common_peg_until_parser` 在非宽松解析且分隔符缺失时仍返回 SUCCESS**（[#27772](https://github.com/ggml-org/llama.cpp/issues/27772)） | Open |
| 🟡 低 | **`llama-ui`：桌面端推理级别选择菜单无法打开**（[#27981](https://github.com/ggml-org/llama.cpp/issues/27981)） | Open |
| 🟡 低 | **MSVC 无法检测 AVX-VNNI** → 受支持 CPU 上未启用 VNNI（[#28295](https://github.com/ggml-org/llama.cpp/issues/28295)） | Open |
| 🟡 低 | **ggml_metal_synchronize / `kIOGPUCommandBufferCallbackErrorInnocentVictim` 在 Mac M4 Pro Tahoe 26.3 上崩溃**（[#20141](https://github.com/ggml-org/llama.cpp/issues/20141)） | 已停滞 |
| 🟡 低 | **ggml-backend-meta split-axis 断言** 触发于 MiniMax M2.7 / UD-Q2_K_XL，4×3090（[#24015](https://github.com/ggml-org/llama.cpp/issues/24015)） | 已停滞 |
| 🟢 提示 | **路线图：`llama-server` 的分离式 prefill/decode**（[#21266](https://github.com/ggml-org/llama.cpp/issues/21266)）— 34 条评论，15 👍 | Open |
| 🟢 提示 | **路线图：`llama-server` REST API 变更日志**（[#9291](https://github.com/ggml-org/llama.cpp/issues/9291)）— 20 条评论，20 👍 | Open |
| 🟢 提示 | **路线图：`libllama` API 变更日志**（[#9289](https://github.com/ggml-org/llama.cpp/issues/9289)）— 13 条评论 | Open |

## 6. 对应用开发者的影响

- **如果你在量化目标上使用投机解码**，请将输出与原生 greedy 对照审核——F32 与 Q8_1 MMVQ 的不一致（PR [#28489](https://github.com/ggml-org/llama.cpp/pull/28489)）可能在静默地翻转 token。请固定到最新构建，或在修复合入前禁用 spec decoding。
- **工具调用 / 函数调用可靠性**：JSON-schema → GBNF 生成器在嵌套 `maxLength`、空对象 schema 以及大扇出工具调用场景下存在多个未修复 bug。若你对外提供复杂 OpenAI 风格工具定义，预计会偶发 `failed to parse grammar` 错误——请保持 schema payload 精简，并避免 `maxLength ≥ 2000`。
- **`llama-server` WebUI 现已自包含**（不再依赖外部 gzip）——Docker 镜像与离线构建可减少一个依赖。
- **新部署形态正在快速落地**：iWARP/RDMA RPC 传输、MoE expert-cache 淘汰策略、`--n-cpu-mode` FFN 绑定、延迟 Q8_0 KV 量化都在推进中——如果你的业务涉及多主机、MoE 或长上下文推理，值得持续跟踪。
- **路线图信号**：分离式 prefill/decode 已被正式提上议程（[#21266](https://github.com/ggml-org/llama.cpp/issues/21266)）——如果你正在基于 `llama-server` 架构多租户 LLM 网关，可用于容量规划参考。
- **运维习惯**：`--log-jsonl`（[#28437](https://github.com/ggml-org/llama.cpp/pull/28437)）是将结构化日志接入 Loki / Splunk 等系统的正确方式——建议开始从 `stderr` 正则抓取迁移过来。
- **ROCm/AMD 用户迎来实质收益**：gfx1201 Q2_0 上 token 生成约提升 33–35%（[#26753](https://github.com/ggml-org/llama.cpp/pull/26753)），R9700 PRO 的 FlashAttention 也得到调优（[#28102](https://github.com/ggml-org/llama.cpp/pull/28102)）。可重新运行 `llama-bench --bandwidth` 捕获升级前后的差异。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 简报 — 2026-09-06

## 今日要点

v0.34.0 发布候选版已上线,重磅内容包括:在 ChatGPT Desktop 中原生集成 Ollama 模型,以及提升 Apple Silicon 上的结构化输出性能([v0.34.0-rc1](https://github.com/ollama/ollama/releases/tag/v0.34.0))。平台侧,一个严重的 llama-server 提示缓存内存泄漏问题(每个 runner 最高可达 8 GiB,且未被追踪)已被报告并在同一窗口内修复([#18264](https://github.com/ollama/ollama/issues/18264)、[#18265](https://github.com/ollama/ollama/pull/18265))。Apple Silicon 上的 MLX runner 也正在进行协同清理——上下文长度强制、Qwen YaRN 支持、前缀缓存截断修复均已合入或将于今日合入。

## 发布与破坏性变更

- **v0.34.0-rc1**([release](https://github.com/ollama/ollama/releases/tag/v0.34.0))— Ollama 模型现在可以直接在 ChatGPT Desktop 中使用(MacOS 端通过 Ollama 应用配置)。Apple Silicon 上的结构化输出性能有所提升。发布说明在源中已截断;预计 `/metrics` 选用支持(见下方 PR #16998)以及更严格的 MLX 上下文处理将成为稳定版前的候选内容。
- **隐含的 API 变更:** 启动子系统现在需要在外部 CLI 工具的上下文窗口默认值与 Ollama 已加载的 runner 之间进行协调(见 #18256、#18257、#18259)。尚无明确的破坏性变更,但运维人员应在 0.34.0-rc1 上重新测试 `ollama launch` 与 Claude Code、Codex CLI、Qwen Code 的工作流。

## 新模型与硬件支持

- **新架构请求:** `spark2_5`(Spark-X2.5-4B / 1.7B,来自 SparkLLM)— 目前可以下载但无法启动推理([#18195](https://github.com/ollama/ollama/issues/18195))。
- **MLX runner 扩展:** Qwen3.5/3.8 静态 YaRN 元数据现已解析并应用到文本 RoPE 与多模态 M-RoPE,允许上下文长度达到 `factor * original_max_position_embeddings`([#18263](https://github.com/ollama/ollama/pull/18263))。
- **Bug 修复覆盖:** `glm-ocr` 旧版 GGUF 现在将 `<|user|>` 注册为 EOT,以防止 llama-server 下出现无限生成([#17195](https://github.com/ollama/ollama/pull/17195))。
- **Vulkan / AMD iGPU:** 自 v0.32.12 起,66 GB 模型加载出现回归——报"Not enough memory for command submission"([#18272](https://github.com/ollama/ollama/issues/18272))。上一个正常版本:v0.32.9。
- **Apple Silicon(MLX):** Modelfile 中的 `num_ctx` 现在被强制生效;调度器将该值传入子进程,runner 将实际生效的上下文回传给 `/api/ps`([#18261](https://github.com/ollama/ollama/pull/18261),解决 [#18125](https://github.com/ollama/ollama/issues/18225))。

## 性能与优化

- **前缀缓存,MLX:** Restore 此前被截断为 8192 token 的倍数,导致 Claude Code 类工作负载中每次冷预填充后的下一轮都要付出固定的 **17–27 秒**重新预填充。修复正在进行中([#18267](https://github.com/ollama/ollama/issues/18267))。
- **提示缓存核算:** llama-server 的 `--cache-ram` 默认值 **8192 MiB** 现在受新的 `OLLAMA_CACHE_RAM` 环境变量约束,并暴露在 Ollama 的内存核算中([#18265](https://github.com/ollama/ollama/pull/18265),关闭 [#18264](https://github.com/ollama/ollama/issues/18264))。
- **LLM 渲染器 ↔ llama-server:** 当 Ollama 使用 Go 渲染器并命中 llama-server 的原始 `/completion` 时,现在会发送 `message_delimiters`,以便 llama-server 能在用户轮次边界处设置上下文检查点([#18271](https://github.com/ollama/ollama/pull/18271))。
- **可观测性:** 一个由 `OLLAMA_METRICS=1` 控制的 Prometheus 兼容 `GET /metrics` 端点正在排期中——将暴露 `ollama_requests_queued`、`ollama_queue_capacity`、`ollama_models_loaded`、`http_requests_total`,以及按模型/token 划分的指标([#16998](https://github.com/ollama/ollama/pull/16998)、[#3144](https://github.com/ollama/ollama/issues/3144))。

## 稳定性与回归

按严重程度 / 影响范围大致排序。

1. **Vulkan + AMD iGPU 回归** — 自 v0.32.12 起,66 GB 模型加载失败,提示 `Not enough memory for command submission`([#18272](https://github.com/ollama/ollama/issues/18272))。暂无 PR。**临时方案:** 固定到 v0.32.9。
2. **`kimi-k2.6:cloud` 云端延迟 / 流式错误** — 单个请求耗时 **10 分钟以上**,流式 `/api/chat` 间歇性报 `INTERNAL_ERROR`,已持续多日([#16845](https://github.com/ollama/ollama/issues/16845))。暂无修复 PR。
3. **`:cloud` 模型上云端推理 JSON 拆分**(例如 `minimax-m3:cloud`)— JSON 输出被拆分到 OpenAI 兼容端点的 `message.reasoning` 与 `message.content` 中;单独取 `content` 无法构成合法 JSON,会破坏结构化消费方([#17987](https://github.com/ollama/ollama/issues/17987))。暂无修复 PR。
4. **`glm-5.3:cloud` 无限推理** — OpenCode 与 ZCode 都可能陷入无尽的推理循环,直到任务中止;官方 Z.AI API 不受影响([#18193](https://github.com/ollama/ollama/issues/18193))。
5. **MLX runner 卡在 "Stopping…"** — `muse-glimmer:30b-mlx` 反复在 `ollama ps` 的 "Stopping…" 状态挂起,即便设置了 `OLLAMA_KEEP_ALIVE=30`;一次出现与完整的 macOS 重启同时发生([#18269](https://github.com/ollama/ollama/issues/18269))。
6. **长期问题: `ollama pull` 的摘要校验失败**([#941](https://github.com/ollama/ollama/issues/941))与**下载进度回退**([#8484](https://github.com/ollama/ollama/issues/8484))仍在持续迭代,均未关闭。
7. **许可证声明分发** — Ollama 仍未在发布产物中为静态链接的 llama.cpp 提供 MIT 版权声明;社区信号强烈(👍272),但无进展([#3185](https://github.com/ollama/ollama/issues/3185))。
8. **`ollama launch` 上下文不匹配 Bug** — Qwen Code 静默使用 1,000,000 token 的默认值([#18256](https://github.com/ollama/ollama/issues/18256));Codex CLI 回退到 128K([#18257](https://github.com/ollama/ollama/issues/18257));Claude Code 在 `kimi-k2.7-code:cloud` 下进入保守的 200K 自动压缩([#17717](https://github.com/ollama/ollama/issues/17717))。PR #18259 今日合入 Codex 修复。

## 对应用开发者的影响

- **在 0.33.x → 0.34.0-rc1 之间谨慎固定版本。** Apple Silicon 结构化输出的改进是真实的,但 MLX runner 正在重构中(上下文强制、YaRN、前缀缓存 Restore)。如果运行 Qwen3.5/3.8 MLX,请在升级 RC 之前验证冷提示延迟。
- **Vulkan / AMD iGPU 用户应停留在 v0.32.9**,直到 #18272 解决为止——否则大模型加载会失败。
- **`:cloud` 标签的可靠性参差不齐。** 将 `:cloud` 推理模型视为生产 Agent 循环中的尽力而为选项:JSON 模式客户端应防御性地拼接 `content` + `reasoning`;在 `kimi-k2.6:cloud` / `glm-5.3:cloud` 上的长时间运行 Agent 工作负载应设置超时并准备备用模型。若这些模型用于付费业务,请记录工单并跟踪 [#16845](https://github.com/ollama/ollama/issues/16845)、[#17987](https://github.com/ollama/ollama/issues/17987)、[#18193](https://github.com/ollama/ollama/issues/18193)。
- **内存核算正在变得真实可用。** 有了 `OLLAMA_CACHE_RAM` 与即将推出的 `/metrics` 端点,你终于可以限制并观察提示缓存 KV 带来的宿主机内存增长——在长生命周期 runner 上遇到 8 GiB 惊喜之前,请显式设置该值(#18265)。
- **启动集成需要一次健全性检查。** 如果你将 `ollama launch` 嵌入到 Claude Code / Codex / Qwen Code 中,请勿轻信 CLI 宣称的上下文窗口——以 `/api/ps` 为准,并关注 PR #18259 在 0.34.x 中的落地。
- **Apple Silicon 上的结构化输出是 v0.34.0 的卖点** — 如果你面向 Mac 客户端(尤其是工具调用 / JSON 模式的 Agent),这个版本值得试点。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-06

## 今日要点

LiteLLM 发布了 **v1.100.0 (stable)** 和 **v1.101.0-rc.1**,同时持续推进 **原生 Rust 执行层** —— 一系列重构 PR 将 provider 调度、OCR、回调、鉴权以及桥接执行统一收拢到同一套 Rust 框架下。运维层面的热修复覆盖了 Bedrock(采样参数、Voxtral 转录、文件删除)、Vercel AI Gateway 定价以及 MCP 工具集更新路径。多个长期存在的正确性 Bug —— 其中最值得关注的是 **AdaptiveRouter 在持久化的 alpha/beta=0 时触发 `gammavariate` 崩溃**,以及 **1.96 引入的 MCP OAuth2 managed-flow 回退** —— 已在今日关闭。

## 发布与破坏性变更

- **v1.101.0-rc.1** (release candidate) — https://github.com/BerriAI/litellm/releases/tag/v1.101.0-rc.1
- **v1.100.0** (stable) — https://github.com/BerriAI/litellm/releases/tag/v1.100.0
- 所有 Docker 镜像均使用 cosign 签名(密钥来自 commit `0112e53`)。
- **升级时需要留意的行为回退:**
  - **MCP managed OAuth2** 从 1.95.1 升级到 1.99.0 后打开的是 LiteLLM UI 而非供应商授权页面 —— 已在 #39665 中修复。[#39665](https://github.com/BerriAI/litellm/issues/39665)
  - 在 v1.85.0 中,以 `Reasoning(...)` 字典传入的 Anthropic `reasoning_effort` 被静默丢弃 —— 已关闭。[#28196](https://github.com/BerriAI/litellm/issues/28196)
  - Responses→Chat 路径在 Vertex / Bedrock 的 `function_call_output` 中丢失了 `input_file` —— 已关闭。[#28232](https://github.com/BerriAI/litellm/issues/28232)

## 新增模型与硬件支持

- **新 provider:The Grid** —— 以 JSON 配置的 OpenAI 兼容 provider 形式加入,取代了已停滞 5,408 次提交的 #35085。[#39907](https://github

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-06

## 今日要点

Studio 是今天的重点：双节点 DGX Spark 服务的编排器与异步副本路由已落地（PR #10323），长期搁置的语音模式（#6527）中对话部分已由 @donaldfilimon 在当前 `main` 上重建（PR #10373、#10374），AMD Vulkan 后端现已针对 Strix Halo（gfx1150/gfx1151）进行路由，优先级高于 ROCm（PR #10381）。稳定性方面，过去 24 小时内关闭了超过 30 个长期未决的问题，包括 Docker 卷文档（#4396）、Qwen3-235B 加载时的 Triton 指针错误（#4137）、Qwen3.5 的 packing/NaN 梯度（#4160）以及 Gemma-3 的 `ConstantVariable` 错误（#3996）。

## 发布与破坏性变更

过去 24 小时内未发布新版本。以下几项已合并/即将合并的改动会带来行为变化，需要注意：

- **PR #10362** — `/v1/chat/completions` 的 SSE 将通过 `X-Unsloth-Events` 显式启用 Unsloth 自有的 UI 控制帧（`tool_start`、`tool_end`、`tool_output`、`tool_args`、`tool_status`、`reasoning_summary`、`diffusion_frame`）。严格遵循 OpenAI 规范的客户端当前会在没有 `choices` 的帧上失败 schema 校验。
- **PR #10387 / #7140** — Studio 将停止在服务页面中返回种子化的管理员密码，改为一次性设置令牌（setup token）。首次登录界面不变，但依赖该引导字符串的下游代理或反向代理部署需要更新。
- **PR #10304** — `push_to_ollama` 当前因 `create_ollama_modelfile()` 的签名变更（不再接受 `gguf_location`）而损坏。该 PR 转发新的必填参数。

## 新模型与硬件支持

- **AMD Strix Halo（gfx1150 / gfx1151）** — Vulkan llama.cpp 预编译版本现已优先于 ROCm 被选用；现有 ROCm 安装可通过更新横幅获得切换提示（[PR #10381](https://github.com/unslothai/unsloth/pull/10381)）。
- **DGX Spark 双节点服务** — 叠加在 DGX Spark 分支上，新增拓扑感知的编排器（`spark_cluster.recommend_topology`）和异步副本路由，使两台 Spark 在工作负载允许时都能参与工作（[PR #10323](https://github.com/unslothai/unsloth/pull/10323)）。
- **torch 2.11 兼容性** — `install.sh` CUDA 分支的 `TORCH_CONSTRAINT` 正在上调以允许 torch 2.11，并对每个小版本锁定 torchcodec（[PR #7474](https://github.com/unslothai/unsloth/pull/7474)，验证器重写拆分为 [PR #10376](https://github.com/unslothai/unsloth/pull/10376)）。
- **Steam Deck / Linux CPU torch 2.11 + gfx1033 门控 + AMD Vulkan** — 从 #8343 拆分出的六个安装器 bug（[PR #8412](https://github.com/unslothai/unsloth/pull/8412)）。
- **aarch64 容器镜像请求** — 社区请求；issue 已关闭，未提供镜像（[Issue #4198](https://github.com/unslothai/unsloth/issues/4198)）。

## 性能与优化

- **Kaggle CI runner 耗时** — 采用分派-收集模式，不再为内核轮询占用 runner。在已确认的双账号路径上测得：T4 smoke runner 占用 **41.5 分钟**，其中仅约 **4 分钟** 是有效的构建/推送时间（[PR #10183](https://github.com/unslothai/unsloth/pull/10183)）。
- **GGUF → Hub 导出** — 不再运行两遍 merge → convert → quantize 流程。首次运行不再先写入 save 目录再在 `push_to_hub_gguf` 内转换为系统临时目录中的文件（[PR #10317](https://github.com/unslothai/unsloth/pull/10317)）。
- **Studio UI 响应性** — 侧边栏、聊天行与项目菜单原先会锁定整个页面；现已修复为打开时不再冻结页面，同时保持滚动与屏幕阅读器行为不变（[PR #10262](https://github.com/unslothai/unsloth/pull/10262)）。
- **推理响应掉失** — 已被取消且 mailbox 已不存在的生成，其延迟响应不再泄漏到后续请求（[PR #10388](https://github.com/unslothai/unsloth/pull/10388)）。

## 稳定性与回归

下表所列 issue 均在过去 24 小时内更新并已**关闭**；严重等级反映的是面向运维的影响，而非 issue 的 triage 标签。

| 严重等级 | Issue | 标题 | 备注 |
|---|---|---|---|
| 高 | [#4137](https://github.com/unslothai/unsloth/issues/4137) | 使用 `device_map="balanced"` 训练 Qwen3-235B-A22B 时报 `Pointer argument (at 4) cannot be accessed from Triton (cpu tensor?)` | 已关闭；需要复盘此次修复是否改变了 `device_map` 与 4-bit 加载之间的交互。 |
| 高 | [#3996](https://github.com/unslothai/unsloth/issues/3996) | Gemma3 微调：`ConstantVariable(str: 'Missing required positional argument: x')` | 已关闭。 |
| 高 | [#3553](https://github.com/unslothai/unsloth/issues/3553) | 按照 DGX Spark 手册操作时 `No GPU detected` | 已关闭；与今天的 DGX Spark 服务工作相关。 |
| 高 | [#4160](https://github.com/unslothai/unsloth/issues/4160) | Qwen3.5 packing → 第 1 步 NaN grad norm | 已关闭；据报告人，instruct 与非 base 变体未受影响。 |
| 高 | [#3729](https://github.com/unslothai/unsloth/issues/3729) | `GptOssTopKRouter` 没有 `weight` 属性 | 已关闭；问题在 unsloth Docker 镜像中复现。 |
| 中 | [#6022](https://github.com/unslothai/unsloth/issues/6022) | `gemma-4-12b-it-GGUF UD-Q4_K_XL` 在 RTX 5070 Ti 16 GB 上加载失败（`llama-server failed to start`） | 已关闭。 |
| 中 | [#3124](https://github.com/unslothai/unsloth/issues/3124) | `gpt-oss-20b` GGUF 失败：各种量化下均报 `invalid tensor type` | 已关闭。 |
| 中 | [#3670](https://github.com/unslothai/unsloth/issues/3670) | 无法通过 `FastVisionModel` 加载本地 DeepSeek-OCR | 已关闭。 |
| 中 | [#2230](https://github.com/unslothai/unsloth/issues/2230) | VLM 训练 notebook 上 `BackendCompilerFailed: backend='inductor'`（`PY_SSIZE_T_CLEAN` 宏） | 已关闭；影响 Py 3.10–3.12 + CUDA 12.6 / Ubuntu 24.04。 |
| 中 | [#5008](https://github.com/unslothai/unsloth/issues/5008) | Windows 安装器（`install.ps1` → `unsloth studio setup`）在仅 CPU 的机器上失败，无论是否加 `--no-torch` | 已关闭；Windows CPU 上的 chat-only/GGUF 模式此前无法工作。 |
| 中 | [#9482](https://github.com/unslothai/unsloth/issues/9482) | 在未设置 `UNSLOTH_ALLOW_HOST_OFFLOAD=1` 的 16 GB 集成 GPU 上，最新更新无法加载模型 | 已关闭。 |
| 中 | [#9986](https://github.com/unslothai/unsloth/issues/9986) | Studio Ollama 集成：`source` 错误、schema 崩溃、模型未进入清单 | 已关闭。 |
| 中 | [#3854](https://github.com/unslothai/unsloth/issues/3854) | Nemotron 3 Nano LoRA merge 失败 | 已关闭。 |
| 低 | [#4396](https://github.com/unslothai/unsloth/issues/4396) | Docker 安装文档中的卷标志错误 | 仅文档；已关闭。 |
| 低 | [#3762](https://github.com/unslothai/unsloth/issues/3762) | "Does unsloth have llama-cpp-python support?" | 已关闭。 |
| 低 | [#1616](https://github.com/unslothai/unsloth/issues/1616) | `ModuleNotFoundError: No module named 'torch'`，但 torch 已安装 | 已关闭。 |
| 低 | [#2503](https://github.com/unslothai/unsloth/issues/2503) | `2024.09.post2` 不支持 Llama-3.1-8B，无法升级 | 已关闭。 |
| 低 | [#2124](https://github.com/unslothai/unsloth/issues/2124) | 如何从同一模型生成不同输出（temperature/top_k 不影响输出） | 已关闭。 |
| 低 | [#1578](https://github.com/unslothai/unsloth/issues/1578) | 持续预训练：在小型（1–2B）PEFT 模型上出现意外的可训练参数 | 已关闭。 |
| 低 | [#2261](https://github.com/unslothai/unsloth/issues/2261) | 使用 Mistral Small 3.1 进行推理 | 已关闭。 |
| 低 | [#1941](https://github.com/unslothai/unsloth/issues/1941) | 尝试在 Unsloth 上运行 GKD | 已关闭。 |
| 低 | [#1210](https://github.com/unslothai/unsloth/issues/1210) | 使用 `unsloth/Llama-3.2-1B-bnb-4bit` 时持续预训练 notebook 损坏 | 已关闭。 |
| 低 | [#2707](https://github.com/unslothai/unsloth/issues/2707) | 扩散模型微调功能请求（HF diffusers） | 已关闭，未实现。 |
| 低 | [#2395](https://github.com/unslothai/unsloth/issues/2395) | Windows 10 / WSL 安装 3 天未解决的反馈 | 标记为不活跃；已关闭。 |
| 低 | [#725](https://github.com/unslothai/unsloth/issues/725) | Unsloth 是否支持 TRL 中的 `rloo_trainer`？ | 已关闭。 |
| 低 | [#7472](https://github.com/unslothai/unsloth/issues/7472) | 压缩 / 滚动上下文窗口功能请求 | 已关闭，未实现。 |
| 低 | [#876](https://github.com/unslothai/unsloth/issues/876) | Flux（扩散 Transformer）功能请求 | 已关闭。 |
| 低 | [#4963](https://github.com/unslothai/unsloth/issues/4963) | Unsloth Studio 原生版（基于 Electron/Tauri 的 llama.cpp 封装） | 已关闭，未实现。 |
| 低 | [#3771](https://github.com/unslothai/unsloth/issues/3771) | GRPO VRAM：RTX 4090 上 Qwen3-4B-Instruct-2507 的 FP8 vs 4-bit | 已关闭；仅作为指引性讨论。 |

相关方向上仍在跟进中的未决事项：

- **PR #10315** — `/v1/embeddings` 将从 Studio 中配置的 embedding 模型提供响应，而非当前会返回 503 / 501 的 chat 槽位。
- **PR #10314** — 当 tools 被发送给一个 chat template 不支持 tools 的 GGUF 时，`/v1/messages` 将返回明确的错误，而不是静默丢弃 tools（面向 Claude Code / Anthropic SDK）。
- **PR #10383** — 修正了四条误导用户的加载/更新提示（例如将问题归咎于模型，而实际是构建问题），并附带日志证据。
- **PR #10375** — 共享 Studio 安装（同一台机器或同一 GPU 主机上的多用户）的按账户隔离，使用一次性设置码。

## 对应用开发者的影响

- **DGX Spark 用户：** 双节点编排器（[PR #10323](https://github.com/unslothai/unsloth/pull/10323)）加上 #3553 的关闭，意味着 Studio 现在应该能够稳定地检测到两块 GPU 并将 GGUF 服务路由到两者之上。在编排器仍在评审期间，预计需要启用一个小的实验性开关。
- **AMD / Strix Halo：** 如果你使用 gfx1150/1151，请在下次更新时切换到 Vulkan 预编译版本（[PR #10381](https://github.com/unslothai/unsloth/pull/10381)）。其他芯片上的 ROCm 用户不受影响；现有 ROCm 安装会在应用内收到切换提示。
- **与 Studio 集成的 OpenAI 兼容客户端：** 请做好准备，`/v1/chat/completions` 将仅在发送 `X-Unsloth-Events` 时才多路复用 Unsloth UI 控制帧（[PR #10362](https://github.com/unslothai/unsloth/pull/10362)）。如果你使用 Claude Code 或 Anthropic SDK 对接 Studio，当加载的模型不支持 tools 时，你将很快收到明确的错误，而不是被静默丢弃的 `tools` 数组（[PR #10314](https://github.com/unslothai/unsloth/pull/10314)）。
- **Embedding 工作负载：** 一旦 #10315 合入，请将 `/v1/embeddings` 指向 Settings 中配置的 embedding 模型，而不是 chat 模型；目前大多数 GGUF 在 chat 槽位会返回 501/503。
- **Ollama 导出流水线：** 如果你在当前 `main` 上调用 `push_to_ollama`，在 [#10304](https://github.com/unslothai/unsloth/pull/10304) 合入之前，会抛出 `TypeError: create_ollama_modelfile() got an unexpected keyword argument 'gguf_location'`。
- **Studio 安全姿态：** 不再依赖嵌入在服务页面中的种子化管理员密码。在 #10387 / #7140 合入后，会改为一次性设置令牌。
- **语音：** 已重建的 #6527 对话循环部分（[PR #10373](https://github.com/unslothai/unsloth/pull/10373)）以及其延迟基准配套 PR（[PR #10374](https://github.com/unslothai/unsloth/pull/10374)）表明语音模式正在走向可合并状态；在此之前请勿基于它发布。
- **长尾稳定性

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — 每日摘要
**日期：** 2026-09-06
**仓库：** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. 今日要点

今日的活动以可靠性问题为主，而非功能开发。一个新的 issue 记录了**硬编码的 5 秒配置接受超时**，导致托管的核心网关（端口 3456）在中等主机负载下启动失败；而另一份报告则暴露了 codex `/v1/responses` 路由返回 **502 Bad Gateway** 的问题。在功能方面，有人提议新增 **Kunavo** 的 provider 预设，将 CCR 的多协议路由覆盖范围扩展到一个同时服务 Claude、Gemini 和 GPT 的单端点网关。

---

## 2. 发布与破坏性变更

*过去 24 小时内无新发布。*

---

## 3. 新模型与硬件支持

今日没有新的模型架构、后端或量化格式被合并或提议。

唯一的 provider 端新增是 [**PR #1760**](https://github.com/musistudio/claude-code-router/pull/1760) —— *"feat(providers): add Kunavo provider preset"*，它将 **Kunavo** 注册为一个 OpenAI 兼容的上游服务，通过单个 API 密钥以按量付费方式提供 Claude、Gemini 和 GPT 系列模型。一旦合并，CCR 将在无需为各协议单独配置的情况下，获得一个统一的多厂商端点。

---

## 4. 性能与优化

今日没有合并或提议的性能变更。然而，issue [#1761](https://github.com/musistudio/claude-code-router/issues/1761) 隐式涉及性能：当前的 5 秒超时将*事件循环响应性*与*网关就绪状态*混为一谈，意味着该配置预算对环境负载敏感，而非反映真实的启动成本。任何修复方案都可能需要一个可量化的就绪信号（端口探测、IPC 握手、健康端点），以将感知延迟与真实就绪状态解耦。

---

## 5. 稳定性与回归

按严重程度排序：

1. **[HIGH — 启动/可用性]** — [Issue #1761](https://github.com/musistudio/claude-code-router/issues/1761): *"Gateway fails to start under load: 5s hardcoded config-acceptance timeout measures parent event-loop congestion, not child readiness"*
   Web/管理服务器（3458）能够启动，但托管的核心网关（3456）在中等负载的主机上每次重启/启动时都必定无法上线，日志显示：`Failed to start gateway during web startup: Core gateway did not accept runtime config within 5000ms.`。对于任何在共享/云主机上的生产部署来说，这是一个强回归风险点。**目前尚未开放修复 PR** —— 该问题适合作为快速通道补丁的候选。

2. **[MEDIUM — 路由失败，未确认重试语义]** — [Issue #1762](https://github.com/musistudio/claude-code-router/issues/1762): *"codex: unexpected status 502 Bad Gateway: Unknown error, url: http://127.0.0.1:3456/v1/responses"*
   Codex CLI 调用本地的 `/v1/responses` 端点时返回 502 以及通用的 `Unknown error` 响应体，导致从客户端难以进行根因分诊。该错误源自 CCR（127.0.0.1:3456），提示可能是到 codex 兼容 provider 的上游连接问题，或一个未被透出的 CCR 内部错误。**目前尚未开放修复 PR。**

---

## 6. 对应用开发者的影响

- **不要假定托管网关（端口 3456）在繁忙主机上首次尝试时就能成功启动。** 如果你将 CCR 脚本化集成到 devcontainer、systemd 单元或启动流程中，请添加针对 `/v1/models` 或你配置的健康路由的外部就绪探测，而不是依赖内嵌的 5 秒等待。如果你依赖自动启动功能，建议跟踪 issue [#1761](https://github.com/musistudio/claude-code-router/issues/1761) 并据此固定版本。
- **目前请将 `/v1/responses` 的 502 视为不透明错误。** Issue [#1762](https://github.com/musistudio/claude-code-router/issues/1762) 显示，CCR 当前以无法操作的 `Unknown error` 透出上游失败。在 CCR 改进错误透传之前，请在调用端自行添加上游健康检查和请求日志。
- **Kunavo 支持即将到来。** 如果你希望通过单个付费密钥整合多厂商 LLM 接入，请关注 [PR #1760](https://github.com/musistudio/claude-code-router/pull/1760) —— 它将让你通过一个 OpenAI 兼容的预设路由 Claude/Gemini/GPT 流量，而无需为每个 provider 配置独立的配置块。
- **CCR 部署的生产加固建议：** 在预留 CPU 的主机上运行托管网关，或迁移到一个独立于父进程事件循环 tick 频率、可独立重试子进程就绪状态的进程监管器。

---

*本摘要基于 GitHub 公开活动生成。代码或配置建议不构成承诺；在应用变更前，请根据上游仓库进行验证。*

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 每日摘要 — 2026-09-06

## 1. 今日要点

CC Switch 今天活动频繁，主要围绕 **Codex 代理转译正确性** 与 **跨 Provider 路由**：一条评论量较高的帖子（#1198，关于启动时 `settings.json` 被覆盖的问题）已关闭，同时出现多个围绕 Codex Responses↔Chat Completions 桥接的新 Bug（tool_call_id 长度、空 `thinking` 块、assistant 消息被拆分）。功能方面，GitHub Copilot 对 Codex 的支持已在 #7157 落地，"接管模式下的跨 Provider 子代理路由" 在 #7165 中被提出，可实现旗舰模型做规划、廉价模型跑子代理。

## 2. 发布与破坏性变更

- **过去 24 小时内无新版本发布。** 当前 Bug / PR 引用的最新发布版本仍为 **v3.20.1**。
- **PR #6887**（开放中）：修改 Codex 实时写入语义 —— `~/.codex/config.toml` 中未托管的 `[model_providers.*]` 段将被保留而非剔除。合并后，使用过深度定制 Codex 配置的用户需自行校验。
  https://github.com/farion1231/cc-switch/pull/6887
- **PR #7153**（已关闭/已合并）：托盘左键行为变更 —— 普通模式下，左键将直接恢复/聚焦主窗口；轻量模式行为不变。
  https://github.com/farion1231/cc-switch/pull/7153
- **PR #5882**（已关闭）：接管模式现对外暴露 `claude-opus-5`，不再使用已退役的 `claude-opus-4-8` 别名。
  https://github.com/farion1231/cc-switch/pull/5882
- **PR #7120**（开放中）：新增 `proxy_restore_on_startup` 设置（默认关闭）—— 可选的 Clash 风格自动恢复行为。
  https://github.com/farion1231/cc-switch/pull/7120

## 3. 新模型与硬件支持

- **Codex：GitHub Copilot** —— 新增一等 Provider，基于能力驱动进行 Responses/Chat 路由（#7157）。Codex 客户端始终命中本地 Responses 入口；CC Switch 根据 `supported_endpoints` 选取上游格式。
  https://github.com/farion1231/cc-switch/pull/7157
- **原生 OMP（"oh-my-pi"）支持** —— 全功能一等支持：Provider 管理、会话浏览、用量统计、配置同步（#7152）。
  https://github.com/farion1231/cc-switch/pull/7152
- **Grok 账号档案** —— 支持凭证保留与更完善的用量统计（#6792）。
  https://github.com/farion1231/cc-switch/pull/6792
- **腾讯 Pi 预设** —— 新增 8 条预设，覆盖 TokenHub 按量付费与 Token Plan 订阅线路（#7159）。
  https://github.com/farion1231/cc-switch/pull/7159
- **`seed_model_pricing` 新增内置价格行**：
  - GPT-6 Astra — 输入 $10/M，输出 $50/M，缓存读取 $1/M，缓存写入 $12.5/M（#7162）
  - Gemini 3.8 Flash — 输入 $0.75/M，输出 $3.75/M，缓存读取 $0.075/M（#7164）
  - GLM-5.3 Flash — 输入 $0.15/M，输出 $0.50/M，缓存读取 $0.03/M（#7163）
- **厂商目录修复**：未收录在 DeepSeek 官方目录中的视觉模型（如 `deepseek-v4-flash-vision-exp`）现在能正确解析 `input_modalities`，不再回退到纯文本默认（#6750）。
  https://github.com/farion1231/cc-switch/pull/6750

## 4. 性能与优化

- **接管模式下的跨 Provider 子代理路由**（#7165）—— 面向成本优化设计：主会话保持在旗舰 Provider A，同时把 Task/子代理工作委派给廉价 Provider B。当前的代理接管仅路由顶层会话，本次扩展到了子代理调用。
  https://github.com/farion1231/cc-switch/pull/7165
- **Gemini Native 代理修复**（#7143）—— 修复了三类长期存在的多轮/工具调用 Bug，影响通过 Claude Code/Desktop 与 Codex 桥接的 Gemini 2.5/3.x：Claude 侧的 Part 级 `thoughtSignature` 处理、Codex 侧的 `thought_signature` 回填、Provider 表单解锁。取代 #5298。
  https://github.com/farion1231/cc-switch/pull/7143
- **Claude Code 引导消息整流器**（#7167）—— 可选（默认关闭）的转译器，在 Chat Completions 路由上将匹配的引导消息从 `system` 转为 `user` 角色，保留内容与位置。
  https://github.com/farion1231/cc-switch/pull/7167
- **轻量模式启动优化**（#7158）—— `lightweight_mode` 偏好现在持久化保存，并在启动/关闭时自动进入轻量模式，避免希望仅以托盘形式运行时重建完整窗口。
  https://github.com/farion1231/cc-switch/pull/7158

## 5. 稳定性与回归

**高危（配置丢失 / 数据完整性）：**

- **#1198 [已关闭]** —— 在 macOS 上，CC Switch v3.10.x 启动时会立即覆盖 `~/.claude/settings.json`，丢弃用户的 `hooks`、`permissions`、`contextFiles` 等内容，并替换为 "takeover/proxy" 占位。16 条评论，9 👍。*今日已关闭，但值得审计一下：到底是有修复落地，还是仅仅记录了 workaround。*
  https://github.com/farion1231/cc-switch/issues/1198
- **#6887（PR，开放中）** 修复了同类问题在 Codex 侧的表现（#6860）：实时写入时会剔除 `config.toml` 中未托管的 `[model_providers.*]` 段。
  https://github.com/farion1231/cc-switch/pull/6887

**高危（Codex Responses↔Chat 转译）：**

- **#7156** —— v3.20.1：在 DeepSeek Chat 上游，当子代理触发工具调用时 `tool_call_id` 长度不足（HTTP 400）。单轮正常；重试无效。
  https://github.com/farion1231/cc-switch/issues/7156
- **#6260** —— 本地代理将流式产生的 "空 thinking" 块写入 Codex 会话历史；下一轮请求因上游 400 "thinking 长度不足" 而失败。
  https://github.com/farion1231/cc-switch/issues/6260
- **#6697** —— Codex 仅图片的工具输出在无视觉能力的上游被静默丢弃 → 产生孤立的 `tool_calls` → 持续返回 400。
  https://github.com/farion1231/cc-switch/issues/6697
- **#6529** —— Codex Responses→Chat 转译器将 commentary 与 tool calls 拆分为连续的 `assistant` 消息，破坏下游 Chat 模型的语义。
  https://github.com/farion1231/cc-switch/issues/6529
- **#6473** —— Anthropic→Codex Responses 桥接未保留可选的工具参数语义（与 #6394、#5774 相关）。
  https://github.com/farion1231/cc-switch/issues/6473
- **#4973** —— v3.16.5 回归：在 `deepseek-v4-flash` 上将 Codex 路由到 SenseNova 时出现 `invalid tool_call_id`（HTTP 400）；v3.16.4 正常。
  https://github.com/farion1231/cc-switch/issues/4973
- **#5001** —— Codex `/responses` 工具调用参数的客户端解析错误未在 CC Switch 错误上报中暴露真实根因。
  https://github.com/farion1231/cc-switch/issues/5001
- **#5087** —— SenseNova `reasoning_content` 流式响应返回空的 `finish_reason`，导致 Claude Desktop 中 assistant 消息消失。
  https://github.com/farion1231/cc-switch/issues/5087

**高危（崩溃 / 平台）：**

- **#5609** —— Linux Wayland：启动时应用崩溃，报 `EGL_BAD_PARAMETER`（12 条评论）。暂未见修复 PR。
  https://github.com/farion1231/cc-switch/issues/5609

**中危（用量 / 监控）：**

- **#7084** —— Codex 用量同步：分页父 rollout 与派生子代理被永久卡在 "parent rollout not yet written to child fork time" 状态 → 在 v3.20.1/macOS 下 GPT-5.6-Sol 用量完全丢失。
  https://github.com/farion1231/cc-switch/issues/7084
- **#7137** —— 用量看板无法记录 GPT-5-Astra 的用量；行被错误标记为 "SOL"（#7133 是已关闭的英文版 GPT-6 Astra 费用计算问题）。
  https://github.com/farion1231/cc-switch/issues/7137
- **#4752** —— Codex → 上游频繁抛出 `429 Too Many Requests`（"exceeded retry limit"）。Provider 侧限流处理需要重新审视。
  https://github.com/farion1231/cc-switch/issues/4752

**认证 / 配置：**

- **#4925** —— OpenCode Go `glm-5.2` 经 Claude Desktop 调用返回 401 "Missing API key"；`chat/completions` 的鉴权字段被写入为 `ANTHROPIC_API_KEY` 而非 Provider 自身的 key。
  https://github.com/farion1231/cc-switch/issues/4925

## 6. 对应用开发者的启示

- **把代理视为一个持续变动的目标。** Codex Responses↔Chat Completions 桥接处至少有六个开放 Bug，涉及 tool_call ID 形态、空 thinking 块、图片工具输出被丢弃以及 assistant 轮次被拆分。如果你在 CC Switch 上跑子代理或工具密集型流程，请固定一个已知良好的版本（例如要避开 #4973 就用 v3.16.4），并对上游 4xx 错误做埋点 —— 许多错误目前掩盖了真实根因。
- **配置保留是头号风险。** 两份独立报告（Claude 侧的 #1198 与 Codex 侧的 #6860/#6887）都描述了 CC Switch 在每次写入时破坏用户管理的客户端配置段。如果你依赖自定义 hooks、permissions 或额外的 `[model_providers]`，请关注 #6887 的合并，并在任何 v3.20.x → v3.21+ 升级后校验你的 `config.toml` / `settings.json`。
- **新 Provider 的覆盖面正在快速扩张。** GitHub Copilot（#7157）、OMP/oh-my-pi（#7152）、带账号档案的 Grok（#6792）以及腾讯 Pi 预设（#7159）均已成为一等支持。如果你基于其中任意一个，并通过 CC Switch 的本地代理进行对接，请预期将采用能力驱动的路由（`supported_endpoints`），而非固定的协议映射 —— 客户端在设计时应显式声明命中的是 Responses 还是 Chat 入口。
- **面向成本优化的 Agent 架构正在兴起。** #7165 明确支持 "旗舰规划 + 廉价子代理" 模式。如果你交付 Agent 类应用，这是一个强烈信号：混合模型委派将成为 CC Switch 的标准工作流 —— 请据此规划 Provider 抽象层。
- **价格数据正变得权威化。** GPT-6 Astra、Gemini 3.8 Flash 与 GLM-5.3 Flash 的新行直接随 `seed_model_pricing` 一起发布，并附带回归测试。之前的 GLM-5.3 行（#6591）由同一作者关闭后，第二天又写出了 Flash 版本 —— 这份目录预计将高频刷新；不要在客户端硬编码价格表。
- **Linux Wayland 用户仍处于阻塞状态。** #5609 暂时无解 —— 若你面向 Linux 桌面，目前建议使用 X11 或远程桌面工作流。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# 新版 API 速览 — 2026-09-06

## 今日要点
- **v1.0.0-rc.34 发布**，带来一次重大的账户安全改版：统一登录与敏感操作校验、TOTP + Passkey 作为互为备份的二次因子、系统访问令牌支持查看/轮换/吊销及审计日志，并将 Telegram 登录迁移至 OAuth。
- **GPT-6 Astra 中继支持落地**，通过基于能力感知的模型专属聊天参数处理实现（[#7211](https://github.com/QuantumNous/new-api/pull/7211)），同时修复了当渠道 `model_mapping` 生效时响应中模型名称回退为原始请求模型名的问题（[#6975](https://github.com/QuantumNous/new-api/pull/6975)）。
- **路由/缓存正确性工作持续推进**：渠道缓存现与能力状态语义对齐（[#6997](https://github.com/QuantumNous/new-api/pull/6997)），Responses 到 Chat 中继的修复保留多模态工具输出（[#7227](https://github.com/QuantumNous/new-api/pull/7227)）。

## 发布与破坏性变更
- **[v1.0.0-rc.34](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.34)** — 账户安全里程碑：
  - 登录与敏感操作采用统一校验流程；TOTP 与 Passkey 互为备份因子。
  - 系统访问令牌：列表、轮换、吊销及访问日志。
  - 独立的审计日志入口。
  - 以下操作需一次性范围化凭证：账户注销、绑定、修改密码、Passkey/2FA 启用、查看渠道密钥 —— 与发起会话绑定。
  - **迁移提示（Telegram 登录）**：Telegram 认证已迁移至统一 OAuth。管理员需在 BotFather 的 Login Widget 中注册 `/oauth/telegram`，并填写 `Client ID` / `Client Secret`。现有仅 Telegram 的登录流程在重新配置前将无法使用。

## 新模型与硬件支持
- **GPT-6 Astra** — 在 relaykit 中新增显式支持，针对 `max_tokens`（`max_completion_tokens`）、`developer` 角色及采样参数提供专属能力描述符（[#7211](https://github.com/QuantumNous/new-api/pull/7211)）。该 PR 明确列出 GPT-6 Astra 及其带日期的快照，而非通过 GPT-5 前缀匹配进行过度泛化。
- 本窗口内未报告新的硬件后端或量化格式。

## 性能与优化
- **[#7221](https://github.com/QuantumNous/new-api/pull/7221)** — `perf(common): 批量 RawMessage 拷贝`，优化 Responses 请求中的深拷贝操作（commit `3f4cca31` 的后续；最终落地于 `2f3c5e0a`）。
- **[#7161](https://github.com/QuantumNous/new-api/pull/7161)** — 新增主动渠道探测开关，并优化限流行为，以降低大规模渠道集群上的健康检查开销（评审中）。

## 稳定性与回归
按影响排序；已附带修复 PR 的予以标注。

1. **[#7215](https://github.com/QuantumNous/new-api/issues/7215) — `reasoning_effort` 未从 Anthropic → OpenAI 上游映射（已关闭）。** 影响 rc.30 版本中以 Anthropic 格式请求但应中继至 OpenAI 兼容上游的调用方。快照中未关联修复 PR —— 在依赖该映射前请先验证 rc.34 的行为。
2. **[#7220](https://github.com/QuantumNous/new-api/issues/7220) — Gemini 3.8 Flash 模型变体在 rc.31 → rc.33 中继过程中发生变更（已关闭，重复）。** 升级路径回归；若你锁定了 Gemini 3.8 Flash，建议做一次冒烟测试。
3. **[#7222](https://github.com/QuantumNous/new-api/issues/7222) — 模型方阵卡片视图：切换分组时跳到最后一页且“上一页”失效（待处理）。** 修复提案见 [#7223](https://github.com/QuantumNous/new-api/pull/7223) — `fix(pricing): 筛选模型变更时重置卡片分页`。仅 UI 问题，严重程度较低。
4. **[#7225](https://github.com/QuantumNous/new-api/issues/7225) — `settleTestQuota` 缺少分组倍率（已关闭，无效）。** 无需处理；针对 rc32 报告。
5. **[#7224](https://github.com/QuantumNous/new-api/issues/7224) — `ParseContent()` 丢弃 `cache_control`（已关闭，无效）。** 无需处理；若依赖 prompt-cache 提示传递，请在 rc.34 上验证。
6. **[#7217](https://github.com/QuantumNous/new-api/new-api/issues/7217) — 增强：`thinking_model_blacklist` UI 开关或按渠道剥离 effort 后缀（已关闭）。** 无代码变更；用于跟踪运维方对更细粒度 thinking-effort 控制的需求。

## 对应用开发者的意义
- **规划 rc.34 切换窗口。** 安全相关改动是叠加式的，但 Telegram 登录属于硬性破坏性变更 —— 在切流量之前请先重新配置 BotFather Login Widget 及凭据，否则会锁定 Telegram 认证用户。
- **重新校验跨格式中继。** 若你的调用栈通过 OpenAI 兼容上游的渠道发送 Anthropic 格式请求，请在 rc.34 上重新测试 `reasoning_effort` 传递 —— issue #7215 在 rc.30 上是真实存在的缺陷，且本快照中未看到修复路径。
- **重新放心地使用 `model_mapping`。** PR #6975 关闭了一个长期存在的可观测性缺口 —— 在渠道映射后，响应中的 `model` 字段会偏离原始请求模型名 —— 依赖 `response.model` 做路由/计费的客户端现在将看到最初请求的模型名。建议复核任何基于旧行为构建的去重或成本归因逻辑。
- **GPT-6 Astra 客户端应锁定 rc.34+**，以获取正确的 `max_completion_tokens`、`developer` 角色及采样默认值，避免回退到 GPT-5 时代的启发式逻辑。
- **Prompt 缓存提示**（`cache_control`）在 Anthropic 格式流量中的行为值得在 rc.34 上做一次快速验证，鉴于 issue #7224 已被提交；尽管最终以无效关闭，在测试中显式断言仍是一项低成本的保险措施。
- **运维体验：** 模型方阵分页修复（#7223）尚处于待处理状态 —— 若你的控制台用户每日都遇到该问题，可考虑固定到包含此修复的构建版本，或在合入前暂缓部署。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*