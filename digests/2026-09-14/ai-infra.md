# AI 基础设施日报 2026-09-14

> 生成时间: 2026-09-13 23:30 UTC | 覆盖项目: 9 个

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

# 跨项目基础设施报告 — 2026-09-14

## 1. 生态系统概览

今日动态被单一驱动因素主导：**DeepSeek-V4.1 适配落地**。其混合注意力（MLA + Mamba/GDN）、稀疏 MoE 与 MTP 投机解码正在迫使各家推理引擎重做 KV-cache 与投机解码的内部实现——vLLM 合并了 SWA 有界重放与 PCP+DCP 管线，SGLang 则落地了一个由 6 个 PR 组成的统一内存池重构。本地运行时层发版节奏最快（llama.cpp 发布了 9 个点版本），而网关层（LiteLLM、New API、CC Switch）的精力正日益被 **Agent 协议正确性**问题占据——Responses-API 桥接、MCP 工具处理、工具调用 schema 保真——而非原始吞吐量。硬件多样化仍在不均衡推进：Blackwell sm100、Intel Arc、ROCm MI355X/RDNA4 以及 NPU 均有动作，但若干平台仍存在未修复的正确性缺陷。供应链加固（cosign 签名镜像、SSRF 修复）标志着生态正转向生产级运维姿态。

## 2. 活跃度对比

| 项目 | 层级 | Issue（引用） | PR（引用） | 发版状态 |
|---|---|---|---|---|
| **vLLM** | 推理引擎 | ~15 | ~12 | 24 小时内无发版（当前为 0.29.0） |
| **SGLang** | 推理引擎 | ~17 | ~19 | 无；DeepSeek V4.1 在分支上 |
| **llama.cpp** | 本地运行时核心 | ~12 | ~24 | **9 个发版**（b10934–b10948） |
| **Ollama** | 本地运行时 / 云服务 | ~14 | ~4 | 无 |
| **LiteLLM** | 网关/代理 | ~20 | ~13 | **v1.102.0-rc.1**（cosign 签名） |
| **Unsloth** | 微调 | 21（官方声明） | 170+ 进行中（~15 被引） | 无；已记录破坏性 kwarg 变更 |
| **Claude Code Router** | 客户端路由 | 0 | 1 | 无 |
| **CC Switch** | 客户端路由 | ~18 | ~19 | 无；跟进 v3.20.x |
| **New API** | 网关/中转 | ~10 | ~12 | 无；rc.37 回归未决 |

*以上计数仅反映今日摘要中被提及的条目，并非仓库总量。只有 llama.cpp 和 LiteLLM 发布了新版本；Unsloth 的在途 PR 积压最多。*

## 3. 模型支持竞赛

| 模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek V4.1 / Flash** | 支持最深：SWA 有界重放（#56227）、稀疏索引器、PCP+DCP 之下的 MTP | 原生注册 PR #38798（预发布，2 个未决 bug） | 转换 PR #28696 | — | — |
| **Kimi-K3** | — | — | 转换（#26185，KDA+MLA 混合） | 云端（HTTP 500 bug #18426） | — |
| **GLM-5.3-Flash** | 正在调试退化问题（#56605） | **AMD Day-0** gfx950/AITER 路线 | — | 云端可用 | — |
| **Qwen3.5（混合 GDN）** | 长上下文性能 bug（#54691） | 此前 issue 已关闭 | — | — | B200 上的 LoRA 训练 |
| **Qwen3-Coder** | — | — | schema 解析 + 缓存修复 | 云端 schema bug + 本地 int64 修复 | — |
| **Gemma-4** | MTP + 工具解析器修复 | — | SWA/思考模式 bug | E4B 多模态 OOM | — |

**结论：** vLLM 在数据中心前沿模型的适配上领先（唯一将 DeepSeek V4.1 与分离式部署 + MTP 相结合的引擎）；llama.cpp 在覆盖广度与本地落地速度上领先（Kimi-K3、elmod-2.7b、MiMo V2、nemotron-h）；SGLang 则凭借 **AMD day-0** 和非 OpenAI 生态模型（SenseNova、OLMo3）形成差异化。值得注意的是，尚无任何引擎将 DeepSeek V4.1 做到完全生产就绪——每一层都存在针对它的未决 bug。

## 4. 性能前沿

- **KV 缓存与内存池**（火力最集中处）：SGLang 的页信封（page-envelope）栈（#38592→#36729）统一了 H2D/D2H、PD 传输、投机解码与混合 SWA；vLLM 的 SWA 有界重放与文件系统卸载完整性 RFC（#54363）；llama.cpp 的 HiCache 规模修复。驱动因素：混合注意力模型打破了页级 KV 的既有假设。
- **投机解码成为标配**：vLLM 持久化 top-k + TP 感知 ngram；llama.cpp 的 draft-cap 安全（#26575）；SGLang 投机解码内存转换。当前的开放前沿是投机解码 × 前缀缓存的交互（vLLM #47930 接受率崩塌、#54691 草稿模型 KV 重扫描）。
- **MoE 与内存分层**：llama.cpp 的 SSD 专家流式加载（#25294）——让 100B+ MoE 突破内存容量运行——是当日影响最大的基础设施变更；另有 vLLM 的稀疏索引器缓冲区调参与 UMMA M-tile 路由。
- **内核与图捕获**：SYCL CUDA-graph 对齐（#28725）、语法引擎 1.2–1.3×（#26885）、MMVQ nwarps 恢复、ROCm gather-grid 修复。
- **网关开销**：LiteLLM 的 Rust 迁移（目标 sub-1ms）、CC Switch 的 npm dist-tags 探测（每请求节省数十 MB）、New API 的内存分配削减、SGLang router 负载均衡（与 vLLM 指标对齐）。

## 5. 各层定位

- **数据中心引擎（vLLM vs SGLang）**：正面的功能对齐竞赛——PD 分离、DP attention、投机解码、DeepSeek 支持。vLLM 以分布式广度取胜（PCP+DCP、2 节点 TP）；SGLang 则胜在 router 成熟度与统一内存架构。
- **本地运行时**：llama.cpp 是底层基座——Ollama 与 Unsloth 的 GGUF 路径都构建于其上（Ollama 仍未解决 MIT 声明问题，#3185）。Ollama 的 bug 画像如今集中在协议/schema 层（云端路由、Anthropic 兼容缓存），而非内核——它的表现更像一个发行版 + 云端中介。
- **网关**：LiteLLM = 企业级代理（预算、护栏、OTel、Rust 重写）；New API = 多供应商中转/计费，如今正通过原生 vLLM 通道（#7332）*向下*延伸技术栈；CC Switch 和 Claude Code Router = 客户端编码 Agent 路由器，其难点在于 Codex/Claude 的会话格式兼容性，而非延迟。
- **训练**：目前只有 Unsloth 一家，但边界正在模糊——Studio 的多 GGUF 驻留与 OpenAI 兼容服务使其成为一个迷你推理栈。各层正在双向垂直融合。

## 6. 趋势信号

1. **混合注意力已成新常态**——MLA+Mamba/KDA 模型正在迫使各方重写 KV 缓存子系统。请留意 SWA/Mamba 分支下的前缀缓存正确性（SGLang #38815、vLLM #54094）。
2. **投机解码 × 前缀缓存是当前第一位的未决正确性/性能前沿**——接受率崩塌与 KV 重扫描 bug 横跨 vLLM 与 llama.cpp。
3. **Agent 协议如今带来的网关缺陷已多于吞吐量相关工作**——Responses↔Chat↔Anthropic 桥接（call_id 污染、reasoning 块被拒）在 LiteLLM、CC Switch 和 New API 上都很脆弱；MCP 载荷处理在每一层都有 bug（llama.cpp 在 >1–5 KB 时死锁、Unsloth 截断、LiteLLM 护栏绕过）。请在客户端限制工具参数大小。
4. **缓存经济学是无声的成本漏洞**——Ollama 破坏缓存的消息上提（#18431）与乱序 schema 重渲染（#18430），再加上 LiteLLM 陈旧的缓存写入 token 计量（#40736），都会直接推高账单。
5. **硬件长尾成熟度参差不齐**——Blackwell sm100 CUDA-graph 正确性、Intel Arc 静默数据损坏、RDNA4 量化 KV 回归。异构集群需要按平台的等价性测试，而不只是基准测试。
6. **今日版本固定建议**：需要 OTel 追踪请用 vLLM 0.28.x；避免 sgl-router v0.2.4 的 PD 模式；New API 用 rc.36（rc.37 有 75 MB→1.8 GB 的内存回归）；schema 驱动的工具链请用 llama.cpp ≥ b10934；结构化输出场景暂缓使用 Ollama Cloud。
7. **下一步**：数周内 DeepSeek V4.1 将在各引擎全面 GA；LiteLLM 的 Rust 网关 beta；MoE SSD 流式加载将成为内存层级向 GPU/主机 RAM 之外扩展的范本。

---

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 摘要 — 2026-09-14

## 1. 今日要点

今日流量主要由 **DeepSeek-V4 / V4.1-Flash 的投机解码底层管线** 主导：一批新 PR 扩展了 PCP+DCP+Mamba/MLA 支持，修复了混合 GDN 模型上的 KV-cache 回放 bug，并收紧了 ROCm 上 indexer/prefill kernel。同时，Blackwell sm100 和 Intel Arc Pro B70 上暴露出若干正确性 bug，在升级生产栈之前需要重点关注；另有一份新 RFC 阐述了文件系统 KV-offload 层的完整性保证。

## 2. 发布与破坏性变更

过去 24 小时内无新发布。当前活跃的 issue/PR 集合中无公开的 API 或配置项弃用通告。

## 3. 新模型与硬件支持

- **DeepSeek-V4.1-Flash，SWA 有界回放** — [#56227](https://github.com/vllm-project/vllm/pull/56227) 在编码端实现了 "SWA bounded replay"，使得每层 128 token 的滑动窗口 KV cache 退出前缀缓存和 KV connector 路径。这是 V4.1 高效长上下文服务的前置条件。
- **FlashMLASparse + MTP 在 PCP/DCP > 1 下** — [#56722](https://github.com/vllm-project/vllm/pull/56722) 在 `decode_context_parallel_size > 1` 的 NIXL prefill/decode 分离部署中声明了对 `FlashMLASparse` MTP 的支持；[#56723](https://github.com/vllm-project/vllm/pull/56723) 修复了 PCP+DCP 同时启用时 `tp_size=1 must be divisible by dcp_size=8` 的配置校验问题。
- **DeepSeek-V4 稀疏 indexer prefill 缓冲区尺寸** — [#51252](https://github.com/vllm-project/vllm/pull/51252) 将 K-gather workspace 修正为 `max_prefill_buffer_size // compress_ratio` 行。
- **ROCm 上 DeepSeek-V4.1-Flash 性能** — [#56720](https://github.com/vllm-project/vllm/pull/56720) 按 gather 长度而非固定 `(num_reqs, 128)` 的 launch 重新调整了 K-cache gather grid，消除了 per-token 的依赖加载。

## 4. 性能与优化

- **持久 top-k 与采样过滤** — [#56346](https://github.com/vllm-project/vllm/pull/56346) 落地了类 DeepSelect 的合并采样，用于长 FP32 稀疏 indexer decode top-k（目标：DeepSeek-V4 系列）。
- **TP 感知的 Ngram-CPU spec decode** — [#56732](https://github.com/vllm-project/vllm/pull/56732) 复用了 TP-aware 的 ngram-CPU 路径，从而消除跨 rank 的重复查找（取代 #26056）。
- **Humming 索引 MoE 路由** — [#56731](https://github.com/vllm-project/vllm/pull/56731) 在 SM100 上保持 gate/up 与 down projection 的 M-tile 元数据相互独立（UMMA M=128 对比 M=64/96）。
- **DFlash 长上下文开销** — Issue [#54691](https://github.com/vllm-project/vllm/issues/54691) 报告 DFlash 在 Qwen3.5 混合 GDN 上 185k 上下文时从 71 → 16 tok/s；drafter 每个周期都会重新扫描全部累积的 KV。目前尚无按序列长度禁用的公开钩子。
- **DFlash2 + YaRN 零前缀缓存复用** — Issue [#54094](https://github.com/vllm-project/vllm/issues/54094) 表明 target-only 路径复用了约 1.039M token，但 DFlash2 + YaRN 中相同的 prompt 复用为 0。受影响硬件：Blackwell RTX PRO 6000。
- **ROCm 上 DeepSeek-V4.1-Flash 的性能余量** — Issue [#56506](https://github.com/vllm-project/vllm/issues/56506) 报告在 8× MI355X 上每请求仅输出 35.89 tok/s（TP4，MXFP4 + DSpark MTP）；已公布 TTFT/ITL/E2EL p50 的具体数值。
- **Logprobs kernel 中途 JIT** — [#55918](https://github.com/vllm-project/vllm/pull/55918) 修复了 `_topk_log_softmax_kernel` 在请求中途首次遇到新 `num_logprobs` 时的重复编译问题。
- **OpenAI LM-eval 服务器启动预算** — [#56725](https://github.com/vllm-project/vllm/pull/56725) 将 NVIDIA 的兜底超时由 480 s 提升至 600 s；旧限制下 H200 正确性任务在一天内连续失败两次。

## 5. 稳定性与回退

**高严重度 — 可能阻塞上线**

- **OTLP traces endpoint 静默失败** — [#56696](https://github.com/vllm-project/vllm/issues/56696)：`--otlp-traces-endpoint` 初始化了 tracer 但从未调用 `instrument_otel/manual_instrument_otel`，因此没有任何 span 被导出。受影响版本：0.29.0 官方镜像。新出现，暂无修复。
- **sm100（B200/B300）CUDA-graph 回放破坏 greedy 输出** — [#55238](https://github.com/vllm-project/vllm/issues/55238)：在 compute capability 10.x、Gemma-4-26B-A4B-it 两个分支均关闭 `torch.compile` 时可复现。在 H200/A100/RTX PRO 6000 上比特一致。本周已修正影响范围，暂无修复 PR。
- **Intel Arc Pro B70 静默输出损坏** — [#53480](https://github.com/vllm-project/vllm/issues/53480)：在持续并发 decode 下，W4A16 27B Qwen 系列模型间歇性仅输出 "!"（token 0）。HTTP 200，未上报任何错误。受影响：XPU/Battlemage。暂无修复。
- **混合 GDN/Mamba 两节点 TP 前缀缓存崩溃** — [#56646](https://github.com/vllm-project/vllm/issues/56646)：`MambaModelConfig.derived mamba_cache_mode` 不会传播到远端 rank；在带 `--enable-prefix-caching` 的引擎初始化时触发断言。已关闭（可能在主干中修复，pin 版本前请验证）。
- **DFlash + 自动前缀缓存下接受率坍塌** — [#47930](https://github.com/vllm-project/vllm/issues/47930)：启用前缀缓存后，DFlash/DSpark draft 的接受率下降。

**中严重度**

- **SP + 异步 TP 下 batch invariance 被破坏** — [#56370](https://github.com/vllm-project/vllm/issues/56370)：在 4× RTX PRO 6000 上，`VLLM_BATCH_INVARIANT=1` 与 `pass_config.enable_sp` 同时启用时，不同运行产出不同结果。新出现。
- **GLM-5.3-Flash 在多轮 agentic 使用中出现重复 token 退化** — [#56605](https://github.com/vllm-project/vllm/issues/56605)：在工具调用循环中模型坍塌成重复 token 的 "乱码"。新出现。
- **Gemma-4 MTP 引擎初始化崩溃** — 当 target 为 quantized/calibrated-KV 而 drafter 为 BF16 时，[#56539](https://github.com/vllm-project/vllm/pull/56539)（修复）补齐了缺失的 KV-scale 参数校验。
- **CUTLASS 3.x `scaled_mm` 忽略切片 tensor 的前置 stride** — [#55534](https://github.com/vllm-project/vllm/issues/55534)：影响 vLLM 0.28.0 wheel 上的 H800/PCIe。暂无修复。
- **NVFP4 MoE 静默零初始化 → gscale 变 inf → NaN** — [#45212](https://github.com/vllm-project/vllm/issues/45212)：对缺失的 `input_scale` 键缺少零初始化校验。
- **并发缺陷清扫（中文）** — [#56251](https://github.com/vllm-project/vllm/issues/56251)：六项并发缺陷在最新 `main` 上仍为 open，涉及 `multiproc_executor.py`、`shm_broadcast.py`、`kv_events.py` 等路径。建议过一遍。

**长期遗留**

- **引擎启动挂起** — [#17676](https://github.com/vllm-project/vllm/issues/17676)（自 2025-05 起，10 👍）：`waiting engine process to start` 永不返回。暂无修复。
- **Gemma-4 工具调用 parser 漏掉裸 `call:` 转换** — [#54257](https://github.com/vllm-project/vllm/pull/54257) 修复了 reasoning 模式下 Gemma-4 的这一问题。

## 6. 对应用开发者的影响

- **生产可观测性建议暂缓升级到 `0.29.0`**：`--otlp-traces-endpoint` 标志在 [#56696](https://github.com/vllm-project/vllm/issues/56696) 修复前形同虚设；若依赖分布式 tracing 支撑 SLO 看板，请 pin 到 `0.28.x` 或自行打补丁。
- **Blackwell 上的 DeepSeek-V4 / V4.1 部署需要仔细评估**：sm100 的 CUDA-graph 回退问题以及 DFlash 与前缀缓存的交互均仍未关闭。向前推进前请运行 vLLM 的 greedy-output 等价性测试。
- **混合 GDN 模型（Qwen3.5 系列）上的长上下文 agentic 工作负载**：在 [#54691](https://github.com/vllm-project/vllm/issues/54691) 提供按序列长度的禁用钩子之前，应在约 100k token 之后显式禁用 DFlash；从默认 185k 处的 71 → 16 tok/s 几近于拒绝服务。
- **Intel Arc Pro B70 部署**应增加 token 分布活性探针（例如熵坍塌检测）——[#53480](https://github.com/vllm-project/vllm/issues/53480) 中的静默损坏会返回 HTTP 200。
- **DeepSeek-V4 上的 prefill/decode 分离部署**现已可以安全地将 PCP+DCP 与 FlashMLASparse MTP 及 DSpark draft 组合使用；仍走旧 NIXL 路径的用户应合并 [#56722](https://github.com/vllm-project/vllm/pull/56722) 与 [#56723](https://github.com/vllm-project/vllm/pull/56723) 以避免配置校验崩溃。
- **KV-cache 文件系统 offload 用户**应审阅新 RFC [#54363](https://github.com/vllm-project/vllm/issues/54363)——目前既无完整性检查，也无 I/O 延迟上限；若依赖二级层做容灾，需要权衡。
- **Gemma-4 工具调用**用户，若在 NVFP4 target 前使用 BF16 drafter，必须合入 [#56539](https://github.com/vllm-project/vllm/pull/56539) 以避免引擎初始化崩溃。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 简报 — 2026-09-14

## 1. 今日要点

过去 24 小时内没有新发布，但项目在三个方向上集中发力：(1) **DeepSeek V4.1 原生支持** 通过 [#38798](https://github.com/sgl-project/sglang/pull/38798) 落地，(2) 跨 H2D/D2H、PD 传输、推测解码和 SWA 混合的 **统一内存池** 重构（PR [#38592](https://github.com/sgl-project/sglang/pull/38592)、[#37627](https://github.com/sgl-project/sglang/pull/37627)、[#37496](https://github.com/sgl-project/sglang/pull/37496)、[#36730](https://github.com/sgl-project/sglang/pull/36730)、[#36731](https://github.com/sgl-project/sglang/pull/36731)、[#36729](https://github.com/sgl-project/sglang/pull/36729)），以及 (3) **sgl-router 趋于成熟** —— 既新增了队列/饱和度负载均衡特性，也存在 PD 模式下未解决的严重熔断器 Bug。

## 2. 发布与破坏性变更

*过去 24 小时内没有新的标签版本发布。*

## 3. 新模型与硬件支持

- **DeepSeek V4.1（dsv4.1 分支）** —— 原生模型注册 PR [#38798](https://github.com/sgl-project/sglang/pull/38798)（开放中，等待 `run-ci` 标签）。针对该分支已提交 Bug：图像占位符拒绝 [#39274](https://github.com/sgl-project/sglang/issues/39274) 以及 DeepSeek-V4.1-Flash + Engram CUDA-graph 捕获失败 [#39173](https://github.com/sgl-project/sglang/issues/39173)。
- **AMD GLM-5.3-Flash Day 0** —— gfx950/ROCm AITER 支持轨道在先前支持分支合并后正在重新应用：FP8 + Quark MXFP4 MoE（[#38546](https://github.com/sgl-project/sglang/pull/38546)），DSA top-k/preshuffle/HIP 融合 JIT（[#38542](https://github.com/sgl-project/sglang/pull/38542)、[#38543](https://github.com/sgl-project/sglang/pull/38543)、[#38544](https://github.com/sgl-project/sglang/pull/38544)），以及零宽度 RoPE 尾部处理（[#38541](https://github.com/sgl-project/sglang/pull/38541)）。目前这四项均以 closed-as-replacement 状态关闭，需要在当前 main 上重新开启。
- **SenseNova-U1 / U1.5** —— 在 OpenSenseNova 参考仓库下提交了特性与性能追踪 [#37742](https://github.com/sgl-project/sglang/issues/37742)。
- **OLMo3（Olmo3ForCausalLM）** —— 特性请求 [#31175](https://github.com/sgl-project/sglang/issues/31175)，希望复用现有 Olmo2 实现；目前回退到 Transformers 后端。
- **LoRA + DP Attention** —— 后端级支持 PR [#36389](https://github.com/sgl-project/sglang/pull/36389)。
- **NPU decode 上下文并行（DSA 模型）** —— PR [#37787](https://github.com/sgl-project/sglang/pull/37787)。
- **量化** —— 在 [#31235](https://github.com/sgl-project/sglang/issues/31235) 中请求将 FlashInfer MXFP4 路由 MoE 扩展到 SM120/SM121 上的序列化 static-FP8 MXFP4 检查点。

## 4. 性能与优化

- **语义级 KV cache 复用（opt-in）** —— 在 [#31057](https://github.com/sgl-project/sglang/pull/31057) 中通过可插拔接口实现模糊匹配的 radix 后端；旨在跨改写后的/RAG 提示词复用 KV，支持上下文重排。尚未公布加速数据。
- **统一内存池 page-envelope 工作** —— 一个协同工作的栈，将每条设备读/写路径转换为物理 envelope：
  - 页内 **token-major dense 视图** [#38592](https://github.com/sgl-project/sglang/pull/38592)
  - **推测解码** 读/写转换 [#37627](https://github.com/sgl-project/sglang/pull/37627)（在 #38592 基础上 +1021/−166）
  - **H2D/D2H** 传输必须寻址当前物理 envelope [#37496](https://github.com/sgl-project/sglang/pull/37496)
  - **PD 分离** page-envelope 契约，带独立的 target/draft 索引向量 [#36730](https://github.com/sgl-project/sglang/pull/36730)
  - **Decode 主机池** 在动态 Full/SWA 字节共享下保留统一 envelope [#36731](https://github.com/sgl-project/sglang/pull/36731)
  - **统一混合 SWA 的共享字节预算** [#36729](https://github.com/sgl-project/sglang/pull/36729)
- **SGLang ↔ vLLM Prometheus 兼容** —— 新增 `vllm:gpu_cache_usage_perc` 作为 `kv_cache_usage_perc` 指标（[#34714](https://github.com/sgl-project/sglang/pull/34714)，对应 #5979），以简化监控迁移。
- **GLM-4.7 EBNF 约束解码** 用于非严格工具调用 [#38890](https://github.com/sgl-project/sglang/pull/38890)（reasoning + text + XML 工具结构）。
- **HiCacheFile**：扩展性修复（扁平目录下 ENOSPC，[#28653](https://github.com/sgl-project/sglang/issues/28653)）以及混合池前缀恢复正确性修复（[#39147](https://github.com/sgl-project/sglang/issues/39147)）。

## 5. 稳定性与回归问题

按潜在生产影响排序：

1. **[HIGH] sgl-router PD 熔断器将请求分派到已死的 decode** —— [#31206](https://github.com/sgl-project/sglang/issues/31206)（sgl-router v0.2.4，`sgl_model_gateway`，PD 模式，nightly `b94ac87e`）。客户端超时突发后熔断器打开，但 prefill 仍路由到一个永久性假死的 decode。暂未关联修复 PR。
2. **[HIGH] `/health` 超时泄漏调度器端请求** —— [#35884](https://github.com/sgl-project/sglang/issues/35884)。孤立的健康检查条目累积并导致 paged-prefill 批量调度崩溃。暂未关联修复 PR。
3. **[HIGH] 客户端断连导致整个引擎崩溃** —— [#39216](https://github.com/sgl-project/sglang/issues/39216)（RTX 6000D，DeepSeek-V4.1 开发镜像）。未捕获的 `asyncio.CancelledError` 绕过了 `except Exception`。暂未关联修复 PR。
4. **[MED] 自定义路由模型的 MoE 延迟 finalize 无法触达** —— [#39299](https://github.com/sgl-project/sglang/issues/39299)。必须使用 `trtllm_fp4_block_scale_routed_moe` 的模型被永久排除在延迟 finalize 之外。
5. **[MED] DeepSeek-V4.1 图像占位符 token 被 400 拒绝** —— [#39274](https://github.com/sgl-project/sglang/issues/39274)，位于 `encoding_dsv41.py`。影响任何包含字面占位符的用户文本。
6. **[MED] DP attention 下语法 token 同步创建单例 NCCL 组** —— [#35826](https://github.com/sgl-project/sglang/issues/35826)；针对 #8400 的跟进。
7. **[MED] SWA 分支将后续 Mamba checkpoint 挂到先前的 prefix** —— [#38815](https://github.com/sgl-project/sglang/issues/38815)，涉及联合 Full/SWA/Mamba 缓存。暂未关联修复 PR。
8. **[LOW/CLOSED，仅作追踪]** Qwen3.5-4B 在 RTX 5090 上的长时性能回归（[#31120](https://github.com/sgl-project/sglang/issues/31120)）以及 GLM-5.2 NVFP4 + EAGLE CUDA 非法内存访问（[#31093](https://github.com/sgl-project/sglang/issues/31093)）—— 两者目前均已关闭/不活跃，但反映了 decode-CUDA-graph 回归问题的覆盖面之广。
9. **CI 基础设施** —— [#17050](https://github.com/sgl-project/sglang/issues/17050) 自动更新：定时 `main` CI 上 6 个失败、11 个 flaky、990 个近期已修复。[#26340](https://github.com/sgl-project/sglang/issues/26340) 持续从 `pr-test.yml` 自动收集 CUDA core dump（已有 299 条评论）。

## 6. 对应用开发者的意义

- **在 [#31206](https://github.com/sgl-project/sglang/issues/31206) 修复前，避免在生产环境使用 sgl-router v0.2.4 PD 模式** —— 一波客户端超时可能使 prefill 端卡在假死的 decode 上，且无法自动恢复。
- **不要假定 `/health` 是自清理的**，尤其是你以高频率抓取它时（[#35884](https://github.com/sgl-project/sglang/issues/35884)）；建议上游修复或对健康探测施加外部超时。
- **DeepSeek V4.1 仍处于预发布阶段** —— 如果你在 `dsv4.1` 分支上，需预期图像占位符编码问题（[#39274](https://github.com/sgl-project/sglang/issues/39274)），并避免 Engram + 推测解码的组合（[#39173](https://github.com/sgl-project/sglang/issues/39173)）。
- **监控迁移即将变得更轻松**：新增的 `kv_cache_usage_perc` 指标（[#34714](https://github.com/sgl-project/sglang/pull/34714)）提供了 vLLM 兼容的 KV 利用率指标 —— 若你的仪表盘同时覆盖两套引擎，这会很有用。
- **LoRA 工作负载可以规划 DP Attention 了** —— [#36389](https://github.com/sgl-project/sglang/pull/36389) 正在推进，将消除多副本 LoRA 服务当前的阻塞点。
- **统一内存池改动仍在落地中** —— 如果你锁定 nightly 构建并遇到 H2D/D2H、推测解码或 SWA/Mamba 分配 Bug，在二分定位无关的内存回归前，请先排查 page-envelope 转换栈（#38592 → #37627 → #37496 → #36730 → #36731 → #36729）。
- **路由改进值得高规模 PD 部署关注**：`k`-random 最小负载回退（`--min-load-choices`，[#39170](https://github.com/sgl-project/sglang/pull/39170)）以及队列洪泛时固定到 owner（`--saturation-queue-floor`，[#39169](https://github.com/sgl-project/sglang/pull/39169)）。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 简报 — 2026-09-14

## 1. 今日要点

发布节奏持续推进，本周共推出 **九个小版本(b10934–b10948)**,重点集中在后端加固与 JSON-schema 工具链。最值得关注的是 **MoE 磁盘流式加载 PR #25294**(通过将专家权重卸载到 SSD,使超出内存容量的模型也能运行)、**#28725 中的 SYCL 图 record/replay 移植**(与 CUDA graph 路径相对应)，以及一项 **Vulkan NV 驱动 queuesubmit 规避方案**([b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938)),在上游驱动 bug 修复之前，该方案通过互斥锁串行化提交操作。此外，全新的 **`common_schema` JSON-schema 内部表示**已在 [b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) 落地，统一了 `qwen3-coder` 及其他工具调用/结构化输出模型解析复杂 schema 的方式。

## 2. 版本发布与破坏性变更

| 标签 | 摘要 | PR |
|---|---|---|
| [b10948](https://github.com/ggml-org/llama.cpp/releases/tag/b10948) | 将 HY_V4 从 WebGPU test-llama-archs 中排除 | [#28855](https://github.com/ggml-org/llama.cpp/pull/28855) |
| [b10947](https://github.com/ggml-org/llama.cpp/releases/tag/b10947) | nemotron-h: 在 NextN/MTP 尾循环中为专家 FFN 尺寸回退添加除零保护 | [#28779](https://github.com/ggml-org/llama.cpp/pull/28779) |
| [b10946](https://github.com/ggml-org/llama.cpp/releases/tag/b10946) | ggml-cpu(s390x): 对 VXE 专属 repack 辅助函数增加保护 | [#28775](https://github.com/ggml-org/llama.cpp/pull/28775) |
| [b10944](https://github.com/ggml-org/llama.cpp/releases/tag/b10944) | SYCL: 修复 `get mem` 错误，优化代码，检测 level-zero SDK/dev 软件包 | [#28227](https://github.com/ggml-org/llama.cpp/pull/28227) |
| [b10941](https://github.com/ggml-org/llama.cpp/releases/tag/b10941) | tests: 缩小 FA 测试规模 | [#28842](https://github.com/ggml-org/llama.cpp/pull/28842) |
| [b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938) | vulkan: 为 `vkQueueSubmit` 加互斥锁以规避 NV 驱动同步 bug | [#28830](https://github.com/ggml-org/llama.cpp/pull/28830) |
| [b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937) | opencl: 将 noshuffle 行对齐规则扩展至 q4_K/q5_K/q8_0(此前仅限 q6_K) | [#28575](https://github.com/ggml-org/llama.cpp/pull/28575) |
| [b10936](https://github.com/ggml-org/llama.cpp/releases/tag/b10936) | chat: 改进 qwen3-coder 的复杂类型解析 | [#28742](https://github.com/ggml-org/llama.cpp/pull/28742) |
| [b10935](https://github.com/ggml-org/llama.cpp/releases/tag/b10935) | common: 用于结构化日志的 `LOG_JSON` 宏 | [#28586](https://github.com/ggml-org/llama.cpp/pull/28586) |
| [b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) | common: 引入 `common_schema` IR + JSON-schema 优化器，重构语法管线 | [#28736](https://github.com/ggml-org/llama.cpp/pull/28736) |

**迁移说明：** [b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) 中的 `common_schema` 重构调整了 json-schema-to-grammar 的内部实现；链接 `common` 的下游使用者需要重新编译。未标记任何公共 API 移除。

## 3. 新模型与硬件支持

- 新增 **DeepSeek-V4.1(DeepseekV41ForCausalLM)**转换支持 — 它是 V4 路径的子类，文本参数嵌套于 `text_config` 之下。PR [#28696](https://github.com/ggml-org/llama.cpp/pull/28696)。
- **Kimi-K3** 文本模型转换([#26185](https://github.com/ggml-org/llama.cpp/pull/26185))— KDA(线性)+ MLA(完整)混合注意力，具备跨层残差注意力、latent MoE(路由专家数由 `n_expert_latent` 指定)以及 situ 激活。
- **elmod-2.7b-it**(fraunhofer-iis)预分词器支持 — 在 `llama-vocab` 中引入 `escape_after_split` 标志。PR [#28845](https://github.com/ggml-org/llama.cpp/pull/28845)。
- `function_call_output` 中新增对 **Responses API `input_image` 内容**的支持，用于 Codex `view_image` 的往返传递。PR [#28847](https://github.com/ggml-org/llama.cpp/pull/28847)。
- **OpenCL 行对齐**在 [b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937) 中扩展至 q4_K/q5_K/q8_0。
- **CUDA:BF16→F32 回退**，面向缺少原生 BF16 矩阵加速的设备(pre-CDNA / pre-RDNA3 的 AMD,rocBLAS 在此类硬件上会选择 64×32×8 的占位 tile)。PR [#28846](https://github.com/ggml-org/llama.cpp/pull/28846)。
- 修复 **MiMo V2 SWA 模式加载**([#28865](https://github.com/ggml-org/llama.cpp/pull/28865)),并对各模型加载器全面排查 `get_key_or_arr` 正确性([#28868](https://github.com/ggml-org/llama.cpp/pull/28868))。

## 4. 性能与优化

- **MoE 磁盘流式加载(PR #25294)**— 可选地将路由专家权重卸载至 SSD,使模型体积超过主机内存也能运行；每层在设备侧保留一个小型缓存(容纳 `n_slots` 个专家 slab),之后由一个 CPU 端 id 重映射自定义算子处理。对在普通商用机器上部署 100B+ MoE 意义重大。[link](https://github.com/ggml-org/llama.cpp/pull/25294)
- **SYCL 图 record/replay(#28725)**— 将 CUDA 图捕获路径移植到 SYCL,并针对异步分配扩展加入了 SYCL 特定的重排序规避方案；为 Intel Arc GPU 解锁了此前仅在 CUDA 上可用的图优化。[link](https://github.com/ggml-org/llama.cpp/pull/28725)
- **CUDA 动态 MMVQ `nwarps`(#20831)**— 修复 #19478 引入的 MoE 解码回归;`nwarps=8` 对宽解码权重是正确设置，但会导致窄专家 FFN(512–2048 列)并行饥饿。恢复了 RDNA3/RDNA4 级 MoE 上 bs=1 的 TG 吞吐。[link](https://github.com/ggml-org/llama.cpp/pull/20831)
- **语法引擎：提速 1.2–1.3×**,通过单次查找优化并去除多余拷贝(PR [#26885](https://github.com/ggml-org/llama.cpp/pull/26885))— 对使用自研语法后端(而非 llguidance)、工具调用密集的负载尤有价值。
- **Draft 上限保护(#26575)**— `draft-dflash`/`draft-dspark` 在构造 block decode 之前现在会遵守 `min(params.n_max, dp.n_max…)` 上限，避免长上下文场景下浪费投机 token。
- **Prompt-cache 复用修复(#28869)**— 当推理预算被强制指定时，`qwen3-coder` chat 现在会输出 `\n`(与模板一致)，恢复了多轮 agent 流量的 prompt-cache 命中率。

## 5. 稳定性与回归问题

**严重(数据损坏 / 崩溃):**

1. **[#28753](https://github.com/ggml-org/llama.cpp/issues/28753)** — 在 Intel Arc(Linux x86_64)上出现 `ggml_backend_sched_alloc_splits: unexpected graph reallocation` SIGSEGV。尚无修复 PR。
2. **[#28827](https://github.com/ggml-org/llama.cpp/issues/28827)** — `gemma4` "thinking" 模式在 Vulkan 上(RX 9070 XT + Tesla P40 混合配置)会输出越来越长的尾部乱码 token。
3. **[#28805](https://github.com/ggml-org/llama.cpp/issues/28805)** — `qwen4exp` 在 Metal 上长上下文时输出 1 个 token 后即 EOS;阈值随量化类型、KV 量化与 `n_ctx` 而异。表现为静默空输出，在阈值处呈随机性。
4. **[#28778](https://github.com/ggml-org/llama.cpp/issues/28778)** — SYCL + DFlash2 draft 模型在双 Arc Pro B70 上触发 Windows GPU TDR(`VIDEO_TDR_TIMEOUT_DETECTED`)。
5. **[#28723](https://github.com/ggml-org/llama.cpp/issues/28723)** — 由配置启动的 stdio MCP 服务器在工具调用负载 >1–5 KB 时会永久死锁。
6. **[#27309](https://github.com/ggml-org/llama.cpp/issues/27309)** — 初始化期间发生致命 Metal OOM 后，`llama-server` 仍报告 "model loaded" 并绑定端口；后续每个请求都返回 500。初始化失败时应当释放套接字。
7. **[#25751](https://github.com/ggml-org/llama.cpp/issues/25751)** — Gemma 4 上的 SWA 在 CUDA(4×3090)上会遗忘关键细节。属于评测质量回归。
8. **[#28728](https://github.com/ggml-org/llama.cpp/issues/28728)** — SYCL 在 B580 上运行 Qwen3.6 35B A3B 时产生错误输出。

**性能回归：**

9. **[#28752](https://github.com/ggml-org/llama.cpp/issues/28752)** — RDNA3 上 Vulkan 提示词处理(PP)速度在 b10780 之后严重下滑。
10. **[#27638](https://github.com/ggml-org/llama.cpp/issues/27638)** — Vulkan/ANV 的 Flash-Attention 回退到 SCALAR 路径，在 Intel Arc B580(Mesa 26.1.2)上造成 O(N²) 的 PP 性能退化并导致设备丢失。
11. **[#27796](https://github.com/ggml-org/llama.cpp/issues/27796)** — RDNA4(gfx1201,R9700)上 HIP 的量化 KV cache 反而比 f16 *更慢*；差距随类型解包成本增加而扩大。
12. **[#28768](https://github.com/ggml-org/llama.cpp/issues/28768)** — Windows 上 gfx1201(R9700)的 HIP/ROCm:批量目标评分(batched target scoring)会改变 logits / top-1;Vulkan 对照组表现稳定。属于正确性隐患。

**仍在讨论中的较早或已关闭条目：** #25808(SYCL xe2 段错误，已关闭)、#20934(ROCm 与 Vulkan,RX 7900 XTX,已关闭)、#26282(embedding 质量回归，已关闭)、#20141(Metal M4 Pro Tahoe 崩溃，已关闭)。b10944 中最新的 SYCL 修复与 #25808 相关。

**针对今日问题已合入或已达可合并状态的修复 PR:**
- Vulkan RDNA3 PP 回归(#28752)— 暂无修复 PR。
- MMVQ MoE TG(#20831、[#19478](https://github.com/ggml-org/llama.cpp/pull/19478))— 解决了多个 issue 中共同提及的 MoE 解码变慢问题的一个成因。

## 6. 对应用开发者意味着什么

- 如果你使用 `qwen3-coder` 或其他语法驱动模型做 JSON-schema/结构化输出，**请将构建版本固定在 b10934 及以后**;`common_schema` 重构实质性地提升了复杂类型的解析保真度。
- **对于 Metal 上 MoE 模型的长上下文 agent 流量，在阈值问题查明根因之前，请将 #28805 视为已知不安全区间**。上线前请先在你的目标 `n_ctx` 与量化组合上测试。
- **stdio MCP 服务器**：目前超过约 1–5 KB 的负载会导致服务器死锁(#28723)。要么给工具参数设大小上限，要么在该问题修复前切换到 HTTP/SSE MCP 传输。
- **SYCL/Intel Arc**:#28725 的图 record/replay 移植意义重大 — 若你在 B580/B70 上部署，请留意该 PR 合入后图相关的吞吐提升；如果使用 draft 模型投机解码，请对照 #28728/#28778 加以验证。
- **内存受限主机上的 MoE**:PR #25294 是本周期最具影响的基础设施变更。如果你此前无法在 64–128 GB 的机器上运行 70B+ MoE,这就是值得跟进的设计；预计将以显式开启(opt-in)的开关形式提供，而非默认行为。
- **Vulkan NVIDIA 用户**:[b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938) 为 `vkQueueSubmit` 加了互斥锁以规避 NV 驱动 bug。多流负载的吞吐可能略有下降；换来的是正确性。
- **HIP/ROCm RDNA4**:在 [#27796](https://github.com/ggml-org/llama.cpp/issues/27796) 解决之前请避免使用量化 KV cache — 目前在 gfx1201 上 f16 既是最快、*也是*最安全的选择。
- **CUDA BF16 回退**:[#28846](https://github.com/ggml-org/llama.cpp/pull/28846) 会在 pre-CDNA/pre-RDNA3 GPU 上静默地将 BF16 路由为 F32;如果你的硬件混合部署，在依赖跨节点逐字节一致的输出之前，请先审查数值行为。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 简报 — 2026-09-14

## 今日要点

过去 24 小时的主要问题是 **云端后端回归与提示缓存效率低下**，而非新版本发布。`qwen3-coder:480b-cloud` 与 `kimi-k3:cloud` 上的两个社区报告 Bug 在本地模型能正常处理的输入上返回 HTTP 500；同时两个 Anthropic 兼容层 / 工具模式相关问题（#18430、#18431）会导致相同的聊天请求无法命中提示缓存，悄悄消耗大量 token。好消息是，**今天已有两个 Bug 具备可合并的修复**：PR #18424 清理了 `ollama create --quantize` 遗留的约 50 GB F16 blob，PR #18422 修复了 Qwen3-Coder 对大型工具参数的 int64 截断问题。

## 版本发布与破坏性变更

过去 24 小时无新版本发布。未宣布任何破坏性 API 变更。

## 新增模型与硬件支持

- **模型请求**（尚未合并）：[SARVAM-30b / 105b (#14319)](https://github.com/ollama/ollama/issues/14319)、[Gnani Evon-v3.3-30B-A3B (#18427)](https://github.com/ollama/ollama/issues/18427)。
- **Vulkan 后端修复已发布**：PR [#18124](https://github.com/ollama/ollama/pull/18124)（现已关闭/合并）恢复了对集成 Vulkan GPU（虚拟机中的 Virtio-GPU/Venus、集显）的直接 I/O，与 CUDA/ROCm 路径保持一致。修复了 0.32.9 至 0.32.10 之间引入的回归问题——该问题导致出现 `timed out waiting for llama-server to start`，尽管服务进程实际存活且仍在加载权重。
- **Windows 镜像生成支持**：PR [#13806](https://github.com/ollama/ollama/pull/13806) 已关闭/合并 —— 图像生成功能现已纳入 Windows 构建（在上游 mlx / mlx-c 补丁合并之前先行携带）。

## 性能与优化

- **量化磁盘占用修复**（[PR #18424](https://github.com/ollama/ollama/pull/18424)，开放中）：从 safetensors 目录执行 `ollama create --quantize` 不再遗留中间 F16 blob。#18416 的报告者在系统中累计了 **69 个未被引用的 blob，总计 830 GB**，而 `ollama list` 仅显示 188 GB。对批量导入 20B+ MoE 模型的用户影响显著。
- **工具解析器正确性**（[PR #18422](https://github.com/ollama/ollama/pull/18422)，开放中）：停止将超出 int64 范围的整型值强制转换为 `9223372036854775807`。对任何传入科学计数法数值（例如 `x=1e20`）的工具调用均相关。
- **Vulkan 集成 GPU 加载路径**（[#18124](https://github.com/ollama/ollama/pull/18124)）：减少基于 VM 与仅 iGPU 的 Vulkan 环境下的首 token 时延回归。

## 稳定性与回归

按潜在影响范围排序，而非按点赞数。

| 严重程度 | 问题 | 状态 | 修复 |
|---|---|---|---|
| 🔴 高 | [#18426](https://github.com/ollama/ollama/issues/18426) `kimi-k3:cloud` 在工具角色消息内含图像内容时返回 HTTP 500；`kimi-k2.6` 与 `glm-5.3-flash` 正常。 | 开放 | 无 |
| 🔴 高 | [#12362](https://github.com/ollama/ollama/issues/12362) `qwen3-coder:480b-cloud` 忽略 JSON 回复模式 —— 返回无法通过下游校验的自由格式 JSON。本地 `qwen3-coder:30b` 正常。 | 开放 | 无 |
| 🟠 中 | [#18416](https://github.com/ollama/ollama/issues/18416) 每次量化遗留约 50 GB 未被引用的 F16 blob；`ollama rm` 无法回收。 | 开放 | [#18424](https://github.com/ollama/ollama/pull/18424) 已就绪 |
| 🟠 中 | [#18431](https://github.com/ollama/ollama/issues/18431) Anthropic 兼容层 `/v1/messages` 将内联的 `role:system` 消息提升至 system 块，导致每次工具结果后 Claude Code 的前缀缓存失效。 | 开放 | 无 |
| 🟠 中 | [#18430](https://github.com/ollama/ollama/issues/18430) `qwen3-coder:30b` 以随机键顺序重新渲染相同的工具模式，导致相同请求仅部分命中提示缓存。 | 开放 | 无 |
| 🟡 低 | [#18421](https://github.com/ollama/ollama/issues/18421) Qwen3-Coder 工具解析器将 `number` 参数强制限制为 int64。 | 开放 | [#18422](https://github.com/ollama/ollama/pull/18422) 已就绪 |
| 🟡 低 | [#18419](https://github.com/ollama/ollama/issues/18419) `/api/codex/v1/responses` 在 `previous_response_id` 后续调用时静默返回空 `output_text`；token 计数报告为零。 | 开放 | 无 |
| 🟡 低 | [#18396](https://github.com/ollama/ollama/issues/18396) Gemma 4 E4B 多模态在 Jetson Orin Nano 8GB 上尽管 CPU-projector 初始化成功仍触发宿主 OOM。 | 开放 | 无 |
| 🟡 低 | [#18418](https://github.com/ollama/ollama/issues/18418) 视觉模型接收图像前未应用 EXIF 朝向标签。 | 开放 | 无 |
| 🟡 低 | [#18297](https://github.com/ollama/ollama/issues/18297) Qwen3.8-27B-GSQ-RCO-GGUF 的 `IQ3_S` 量化返回空内容并附带 `done_reason: stop`。 | 开放 | 无 |
| 🟡 低 | [#18387](https://github.com/ollama/ollama/issues/18387) 聊天输入中出现连续 10 个以上省略号时会触发流式中途的 `cancel task`。 | 开放 | 无 |
| 🟠 长期 | [#3185](https://github.com/ollama/ollama/issues/3185) Ollama 未随静态链接的 `llama.cpp` 一并分发 MIT 声明（275 👍，58 条评论，自 2024 年起开放）。 | 开放 | 无 |

## 对应用开发者的影响

- **若路由至 Ollama Cloud**：固定到具体模型并配置回退。当前 `kimi-k3:cloud` 与 `qwen3-coder:480b-cloud` 在本地权重可正常处理的输入上均出现异常 —— JSON 模式强制与工具角色中的图像处理尚不可作为依赖。
- **若通过 `/v1/messages` 使用 Claude Code 或 Anthropic SDK**：`messages[]` 内部的系统消息（Claude Code 在工具结果之后注入）会被提升至 system 块，导致每轮前缀缓存均失效。在 #18431 合并之前，请将云端 Anthropic 兼容层视为缓存不友好。
- **若向 `qwen3-coder` 传入含大数值范围的工具参数**：如 `1e20` 这类数字会被静默截断为 `int64.max`。PR #18422 修复此问题；合并之前，请在客户端预先校验范围，或将其作为字符串传递。
- **若从 safetensors 执行 `ollama create --quantize`**：你正在泄漏完整的 F16 权重集合。检查 `~/.ollama/models/blobs` —— `ollama rm` 不会回收这些空间。PR #18424 是修复方案；合并之前，请在每次导入后手动删除未被引用的 blob。
- **若在 VM 中或通过 Vulkan 使用 iGPU**：升级以获取 #18124 —— 集成 Vulkan GPU 上的模型加载不再挂起。
- **磁盘维护提示**：即便 #18424 合并之后，`ollama rm` 仍不会 GC 清单未引用的 blob；若频繁执行 `--quantize`，请编写脚本定期清理 `blobs/` 目录。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-14

## 今日要点

社区继续聚焦 LiteLLM 的 **Rust 迁移**，作为重头基础设施项目（#31263，26 条评论，20 👍），父级跟踪议题正在收集来自潜在 Beta 测试者的活跃提问。在稳定性方面，今日的 issue 与 PR 流量主要由 **流式/Responses 桥接的正确性 Bug**（如 #40887、#41017、#31332、#41014）以及 **模型成本/Token 默认值配置错误**（#40363、#40471、#41016）主导，同时 v1.102.0-rc.1 落地，附带 cosign 签名的 Docker 镜像。

## 发布与破坏性变更

- **v1.102.0-rc.1**（[release](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1)）—— 新发布候选版本。值得注意的是：所有 Docker 镜像现已使用 commit `0112e53` 中引入的密钥进行 **cosign 签名**。运维方应更新其镜像验证流水线；该分支不再以未签名镜像为准。
- 本窗口期内未出现公开的弃用说明，但预发分支 `litellm_oss_staging_230626` 已丢失若干已合并但未发布的回调（见 #38383），若你按分支固定版本，需关注。

## 新增模型与硬件支持

- **NVIDIA Riva ASR —— 离线模式**（[PR #41021](https://github.com/BerriAI/litellm/pull/41021)）：新增 `riva_offline: true`，用于处理以 `INVALID_ARGUMENT` 拒绝流式请求的 Parakeet TDT 与 Whisper 部署。
- **Inception `mercury-2.5` 成本映射补全**（[PR #41016](https://github.com/BerriAI/litellm/pull/41016)，[#40746](https://github.com/BerriAI/litellm/issues/40746)）：新增 `cache_read_input_token_cost` 与 `supports_prompt_caching`，使 Mercury 2.5 缓存 Token 不再按 $0 计费。
- **Bedrock 原生透传**（[PR #40938](https://github.com/BerriAI/litellm/pull/40938)）：将声明的 Bedrock / Bedrock Mantle 端点（chat completions、Responses、messages）**不经翻译**直接转发，消除 Invoke/Converse/Responses 桥接的形变问题。
- **Vertex AI Claude 版本化 ID**（[PR #40376](https://github.com/BerriAI/litellm/pull/40376)，[#40363](https://github.com/BerriAI/litellm/issues/40363)）：修正默认 `max_tokens` 解析以及 `claude-haiku-4-5*` 映射表项（8192 → 64000）。
- **OpenRouter 视频生成**（[#27724](https://github.com/BerriAI/litellm/issues/27724)）—— 请求被关闭且未实现；运维方暂不应预期视频生成路由可用。

## 性能与优化

- **Rust 网关** —— 以低于 1ms 的开销为头条目标（[#31263](https://github.com/BerriAI/litellm/issues/31263)）；父级跟踪议题仍是协调 Beta 测试的合适入口。
- **OTel 指标导出**（[PR #41022](https://github.com/BerriAI/litellm/pull/41022)）：v2 指标读取器现在遵循 `OTEL_METRIC_EXPORT_INTERVAL`（此前硬编码为 5s，并以约每分钟 12 次的频率重复发送累计直方图）。按数据点计费的后端终于可以节流导出。
- **MCP 工具列表缓存**（[#23544](https://github.com/BerriAI/litellm/issues/23544)）：HTTP MCP 服务器在每次 `tools/call` 时仍会重复调用 `list_tools`，使延迟翻倍 —— 修复正在进行中，尚未合并。
- **x-litellm-tags 扩展至 MCP**（[PR #35777](https://github.com/BerriAI/litellm/pull/35777)）：基于标签的使用归因终于覆盖 MCP 路由。

## 稳定性与回归问题

按用户影响排序，附带相关修复链接：

1. **自托管安装在 `prisma generate` 阶段失败**（[#26097](https://github.com/BerriAI/litellm/issues/26097)，7 条评论） —— 影响当前 schema 下的所有 Docker/生产安装。暂无关联修复 PR。
2. **Guardrails 无法在 Anthropic `/v1/messages` 上查看/拦截 MCP 工具**（[#40583](https://github.com/BerriAI/litellm/issues/40583)） —— 与安全相关。**修复：[PR #41011](https://github.com/BerriAI/litellm/pull/41011)**（pre_call 读取 Anthropic 格式的工具名称）。
3. **`reasoning_effort=xhigh` 被静默降级而非拒绝**（[#40471](https://github.com/BerriAI/litellm/issues/40471)） —— 正确性/安全问题。Responses 侧的强制执行相关：[PR #38897](https://github.com/BerriAI/litellm/pull/38897)。
4. **Responses→Chat 流式丢失推理进度**（[#40887](https://github.com/BerriAI/litellm/issues/40887)） —— 桥接无法映射增量推理项；仅在终止事件上附加。
5. **`chatgpt/` provider 对 `gpt-5.6-sol` 返回空的 `output[]`**（[#41017](https://github.com/BerriAI/litellm/issues/41017)） —— **修复：[PR #31332](https://github.com/BerriAI/litellm/pull/31332)**（从 `output_item.done` 回填）以及 [PR #41014](https://github.com/BerriAI/litellm/pull/41014)（桥接重构）。
6. **`/v1/embeddings` 在混合缓存/未缓存批次中返回重复的 `index` 值**（[#41002](https://github.com/BerriAI/litellm/issues/41002)）。**修复：[PR #41020](https://github.com/BerriAI/litellm/pull/41020)**。
7. **流式用量合并器保留陈旧的缓存写入 Token**（[#40736](https://github.com/BerriAI/litellm/issues/40736)） —— 成本跟踪可靠性问题。
8. **Valkey 语义缓存因错误 kwargs 而失败**（[#32324](https://github.com/BerriAI/litellm/issues/32324)） —— 生产环境缓存被静默破坏。
9. **Vertex AI Claude 版本化 ID 默认 `max_tokens` 为 4096**（[#40363](https://github.com/BerriAI/litellm/issues/40363)）。**修复：[PR #40376](https://github.com/BerriAI/litellm/pull/40376)**。
10. **内部 litellm 参数泄漏到 provider JSON 中**（[PR #41018](https://github.com/BerriAI/litellm/pull/41018)） —— GPT-5.4 + tools 因 `model_alias_map` 返回 400。**正在向 stable 分支回移植。**
11. **“Test Connection” 将自定义定价字段误读为凭据**（[PR #41024](https://github.com/BerriAI/litellm/pull/41024)） —— UI/管理摩擦。
12. **当成本无法估算时预算预留被跳过**（[#35524](https://github.com/BerriAI/litellm/issues/35524)） —— 未定价路由上的并发绕过风险。
13. **组件化网关/后端忽略 DB 连接池限制 + IAM 刷新会丢弃 URL 参数**（[#33021](https://github.com/BerriAI/litellm/issues/33021)）。
14. **大小写不敏感的 User-Agent 表头查找 Bug**（[#40979](https://github.com/BerriAI/litellm/issues/40979)） —— 可观测性打标问题。
15. **`langfuse_otel` 未为 `/v1/rerank` 设置 observation output**（[#36537](https://github.com/BerriAI/litellm/issues/36537)） —— 链路追踪缺口。
16. **Ollama provider 在省略 `initial/final_prompt_value` 的自定义 prompt 模板上出现 `KeyError`**（[#39759](https://github.com/BerriAI/litellm/issues/39759)）。

## 对应用开发者的影响

- **验证你的镜像。** v1.102.0-rc.1 现已将 cosign 签名 Docker 镜像作为标准，在将 RC 提升至生产前，将你的供应链工具锁定至已发布的签名。
- **针对 1.102.0-rc.1 重新验证流式/Agent 流程。** Responses↔Chat 桥接、MCP 工具调用以及 Responses WebSocket 在同一 24 小时窗口内均已排队了正确性修复（#31332、#41011、#41014、#40591）。
- **定价回归真实存在且悄无声息。** 如果你的路由涉及 Vertex Claude 版本化 ID、自定义定价的 OCR 或 Inception Mercury，请审计你的账单 —— 已发布的多项成本映射修复改变了未缓存与缓存 Token 的计费方式。
- **Anthropic `/v1/messages` 上的 Guardrail 姿态。** 在你合入 PR #41011 之前，MCP 工具在该端点上实际上是未被治理的。通过 `/v1/messages` 调用时，将任何工具允许/拒绝列表视为建议而非强制。
- **为 Rust 网关做准备。** 如果你在优化代理的尾延迟，可通过 [#31263](https://github.com/BerriAI/litellm/issues/31263) 链接报名 Beta 计划；低于 1ms 的开销是面向生产 Agent 的目标。
- **OWASP ASI06 就绪度。** 面向 Agent 部署的内存投毒防御仍为开放的功能请求（#27949）；如果通过 LiteLLM 跨会话持久化 Agent 内存，预期需自行添加审计层。
- **Embedding 批次消费者。** 如果你通过 `/v1/embeddings` 批量处理缓存与未缓存输入，请固定到包含 PR #41020 的构建，或在下游校验 `data[i].index` 映射 —— 否则向量可能被静默重排序。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 简报 — 2026-09-14

## 今日要点

Unsloth 仓库过去 24 小时没有新发布，但活动密集：21 个 issue 被触及，170+ 个 PR 在飞。主要主题是 **Studio agent/UI 正确性修复**（Anthropic 流式错误、HF 缓存权重白名单、重复工具调用防护、MCP 图像附件、多驻留 GGUF）、**Q-GaLore 优化器在 bitsandbytes 0.50.2 下的正确性**，以及 **B200 性能回归**——`fla` 在每次启动时重建其 autotune 缓存，导致每个 step 大部分时间 GPU 处于空闲。

## 发布与破坏性变更

过去 24 小时没有新的标记发布。

一个潜在的破坏性变更在 [#10785](https://github.com/unslothai/unsloth/issues/10785) 中**已关闭/已回复**：`SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`。在最新 Docker 镜像（`2026.9.4`）中，`max_seq_length` 已被重命名为 `max_length`。使用 `transformers` 风格 `SFTConfig` 的用户需要迁移此关键字参数。

## 新模型与硬件支持

- **PR [#10766](https://github.com/unslothai/unsloth/pull/10766)** — 提议提供官方 **ARM64 CPU-only Docker** 镜像（无 CUDA），作为现有面向 GH200/DGX Spark 的 `linux/arm64` GPU 镜像的补充。
- **PR [#10480](https://github.com/unslothai/unsloth/pull/10480)** — Studio：通过 `mlx-vlm` 在 MLX 聊天模型上启用**视频片段输入**。此前只有 GGUF/`llama.cpp`（`input_video`）能接收视频，MLX 视觉后端在被请求前就被拒之门外。
- **PR [#10439](https://github.com/unslothai/unsloth/pull/10439)** — Studio：在 `/v1/chat/completions` 上接受 OpenAI 风格的 `video_url` 内容片段，供能解码的后端使用。
- **PR [#10876](https://github.com/unslothai/unsloth/pull/10876)** — Studio：同时支持**多个驻留的 GGUF 模型**，每个运行在各自的 `LlamaCppBackend`/`llama-server` 进程中，请求中支持显式的模型路由。
- **PR [#10865](https://github.com/unslothai/unsloth/pull/10865)** — 在 Studio 的听写和朗读语言选项中加入 **希腊语（`el-GR`）**（Whisper 已支持该语言）。

## 性能与优化

- **[#10806](https://github.com/unslothai/unsloth/issues/10806) — B200 回归：每个 step 大部分时间 GPU 空闲。** 通过 `unsloth-cli.py` 在 1× NVIDIA B200（sm_100，CUDA 12.8）上训练 Qwen3.5-9B LoRA。`fla` 库在每次启动时重建其 autotune key，因此内核回退到非融合路径。Unsloth 侧的变通方案已确认（构建一次 key 后复用）；等待上游风格的修复。
- **PR [#10879](https://github.com/unslothai/unsloth/pull/10879)** — *正确性/性能*：当长度变化时使 packed-attention 缓存失效。三个缓存仅比较张量身份而未检查变更，因此 `sequence_length` 变更会导致边界陈旧以及跨错误样本的注意力——悄无声息地既昂贵又不正确。
- **PR [#10649](https://github.com/unslothai/unsloth/pull/10649)** — `unsloth studio update` 每次更新都重跑完整的 16 步 Python 依赖检查。新的清单记录每步消耗的内容，仅当三个不变量同时成立时才跳过某步。在必须保留证据的 Windows 上显著缩短更新时间。
- **PR [#10874](https://github.com/unslothai/unsloth/pull/10874)** — Q-GaLore 现在**按名称**将优化器选项传递给 bitsandbytes。在 bitsandbytes 0.50.2 中，已移除的位置参数将 `percentile_clipping=100` 绑定到 `max_unorm`，将 `block_wise=True` 绑定到 `skip_zeros`，因此范数裁剪在零填充缓冲区上擦除了投影参数的更新。

## 稳定性与回归

按影响范围排序：

1. **[#10806](https://github.com/unslothai/unsloth/issues/10806) — B200 GPU 空闲（开放）。** 对使用 Qwen3.5-9B LoRA 训练的 B200 用户影响很大；上游 `fla` 尚未合并修复。
2. **[#10355](https://github.com/unslothai/unsloth/issues/10355) — `--tensor-split` 被忽略（开放）。** 多 GPU 服务配置被静默丢弃；用户花了数小时才发现。
3. **[#10839](https://github.com/unslothai/unsloth/issues/10839) — MCP 调用被系统性截断（开放）。** 输出去重似乎会裁剪响应；旁路未暴露。
4. **[#10875](https://github.com/unslothai/unsloth/issues/10875) — Windows ARM64 桌面安装器在 `pyarrow` 上失败（开放）。** CLI 路径正常；桌面路径异常。
5. **[#10859](https://github.com/unslothai/unsloth/issues/10859) — 安装器忽略所选文件夹（开放）。** 依赖项无论如何仍落在 `~/.unsloth`。
6. **[#10018](https://github.com/unslothai/unsloth/issues/10018) / [#10844](https://github.com/unslothai/unsloth/issues/10844) — Intel XPU Triton 替换（开放）。** 初始补丁已落地；第二轮修复进行中。
7. **[#10805](https://github.com/unslothai/unsloth/issues/10805) — `install.ps1` 被杀毒软件标记（开放）。** 阻塞基于 PowerShell 的更新流程。
8. **[#10835](https://github.com/unslothai/unsloth/issues/10835) — 安全检查被绕过（开放）。** `reboot`、`rm` 和命令替换（`$(ls /usr/bi…)`）能够到达执行环节，因为安全正则遗漏了"刻意构造"的命令形式。
9. **[#10792](https://github.com/unslothai/unsloth/issues/10792) — 重复工具调用防护（由 [#10810](https://github.com/unslothai/unsloth/pull/10810) 关闭）。** 由于每个成功的调用都会在整段回复中被记住，Agent 在编辑文件后无法重新运行命令。
10. **[#10785](https://github.com/unslothai/unsloth/issues/10785) — `SFTConfig.max_seq_length`（已关闭）。** 在 `2026.9.4` 镜像中重命名为 `max_length`。
11. **[#10853](https://github.com/unslothai/unsloth/issues/10853) — HF 缓存模型白名单遗漏 `model-00000-of-00001.safetensors`（已关闭）。** 在白名单放宽前，MiniCPM5-1B/2B 在 Studio 训练时因"无可训练权重"而失败。
12. **[#8854](https://github.com/unslothai/unsloth/issues/8854) — RAG 工具无法列出项目文件（开放）。** 在 SQLite <3.41 上 vec0 KNN 查询需要显式 LIMIT；修复已在 PR [#10861](https://github.com/unslothai/unsloth/pull/10861) 中落地。
13. **[#7527](https://github.com/unslothai/unsloth/issues/7527) — Nemotron 注意力处理（开放）。** 已跟踪 6 条评论后仍未解决；未关联修复 PR。
14. **[#946](https://github.com/unslothai/unsloth/issues/946) — Phi3.5 单 token/二元损失 → 0（开放，低优先级）。** 历史悠久，15 条评论，无近期活动。

值得注意的其他已关闭 Studio 修复：
- [#10811](https://github.com/unslothai/unsloth/pull/10811) — Anthropic 中途回复失败现在以错误形式呈现，而非静默保存部分答案。
- [#10808](https://github.com/unslothai/unsloth/pull/10808) — 全量微调导出现在产出真正的 16 位模型（之前会静默保存加载的 4 位权重）。
- [#10809](https://github.com/unslothai/unsloth/pull/10809) — 没有 HF token 的 API key 不再能借助**服务器**的 HF 登录进行训练；堵住了一条跨租户数据暴露路径。
- [#10797](https://github.com/unslothai/unsloth/pull/10797) — 在扫描已安装记录前清除 `importlib.metadata` 目录缓存（否则扫描之后写入的清单会保持不可见）。

## 对应用开发者的意义

- **锁定 Q-GaLore + bitsandbytes 组合。** PR [#10874](https://github.com/unslothai/unsloth/pull/10874) 和 [#10878](https://github.com/unslothai/unsloth/pull/10878) 修复了 Q-GaLore 在 bitsandbytes 0.50.2 下的两个静默正确性 bug（零填充的更新缓冲区擦除更新；低秩梯度泄漏到下一次反向）。在重跑之前"看起来正常"的 Q-GaLore 作业前，请拉取最新的 `main`。
- **B200 用户：验证训练利用率。** Issue [#10806](https://github.com/unslothai/unsloth/issues/10806) 意味着在 B200 上运行 Qwen3.5-9B LoRA 可能是 CPU/启动受限，而非 GPU 受限。在假设 SM_100 性能之前，请对比 step 耗时与 `nvidia-smi` 利用率。
- **多 GPU 服务：暂不要信任 `--tensor-split`（[#10355](https://github.com/unslothai/unsloth/issues/10355)）。** 启动后用 `nvidia-smi` 逐卡验证内存。
- **HF token 卫生。** 如果你通过 API key 暴露 Studio，请升级：没有自己 HF token 的 API key 不再能蹭用服务器的登录（[#10809](https://github.com/unslothai/unsloth/pull/10809)）。
- **MCP / 工具调用流水线。** 几个开放 bug 影响 agent 可靠性：MCP 输出被截断（[#10839](https://github.com/unslothai/unsloth/issues/10839)）、安全检查可被命令替换绕过（[#10835](https://github.com/unslothai/unsloth/issues/10835)）、以及仍未解决的"nudging"复访（[#9686](https://github.com/unslothai/unsloth/issues/9686)）。对于生产 agent，请在 Studio 的安全检查和截断策略之上叠加自己的白名单，直至这些问题落地。
- **Studio 中的视频。** 兼容 OpenAI 的 `video_url` 内容片段现在可被能解码的后端接收（[#10439](https://github.com/unslothai/unsloth/pull/10439)），MLX 视觉模型也终于能接收视频片段（[#10480](https://github.com/unslothai/unsloth/pull/10480)）。对在 OpenAI chat schema 上标准化的多模态应用开发者很有用。
- **Windows / ARM64 / Intel XPU。** 桌面安装器仍是最坎坷的路径：Windows ARM64 上的 `pyarrow` 失败（[#10875](https://github.com/unslothai/unsloth/issues/10875)）、`install.ps1` 被杀毒拦截（[#10805](https://github.com/unslothai/unsloth/issues/10805)）、XPU Triton 仍不稳定（[#10844](https://github.com/unslothai/unsloth/issues/10844)）。Linux 上的 CLI 目前是最可靠的安装路径。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 摘要 — 2026-09-14

## 1. 今日要点

过去 24 小时活动较少，没有新版本发布，也没有新报告的问题。唯一值得关注的信号是 PR #1794，它解决了 `spawnGatewayProcess` 中一个长期存在的潜在稳定性 Bug：父进程中硬编码的 5 秒配置接收定时器可能与较慢的子进程启动路径产生竞争，导致冷启动时出现误报的网关启动失败。

## 2. 版本与破坏性变更

*过去 24 小时内无新版本发布。没有版本号更新、标签声明或破坏性变更说明需要报告。*

## 3. 新增模型与硬件支持

*在此时间窗口内没有新模型、后端（CUDA/ROCm/Metal/CPU）或量化格式的变更落地或提案。*

## 4. 性能与优化

本窗口内没有直接针对吞吐、延迟、内存或内核的工作内容。PR #1794 属于配置层面的调整，而非性能层面的优化；不过一旦合并，它将允许运维人员调优启动握手预算，而不再受限于当前 5000 毫秒的上限。

## 5. 稳定性与回归

**严重程度：中 — 潜在的启动竞态条件，已有修复 PR 待合并。**

- **PR #1794 — `fix(gateway): 提升并开放核心配置接收超时**（[链接](https://github.com/musistudio/claude-code-router/pull/1794)）
  - **症状：** 父进程触发 `gateway:start` 后，启动一个硬编码的 5000 毫秒定时器。子进程只有在进程启动*并* `require()` 完真正的网关入口之后才会发送 `gateway:config-accepted` —— 因此在冷启动场景下（大型配置树、磁盘较慢，或带有额外 require 工作的调试构建），回复可能在定时器到期前到达不了，从而表现为网关启动失败，尽管子进程实际上是健康的。
  - **修复方案：** 提高默认预算并将其暴露为可配置参数，让运维团队可以根据自身环境进行调优，而不再继承一个脆弱的常量。
  - **状态：** 截至 2026-09-13 仍处于 Open 状态，尚无评审评论。PR 正文中未关联相关 issue，因此本次摘要窗口内看不到根因历史记录。

过去 24 小时内没有其他崩溃、正确性 Bug 或回归问题被提交。

## 6. 对应用开发者的影响

- **短期来看：** 如果你曾在冷部署之后遇到偶发的 `gateway:start` 失败 —— 尤其是涉及较大的 `config.json`、插件，或运行在较慢的文件系统上 —— 那很可能就是这个竞态导致的。PR #1794 将使其可调；在它合并之前无需采取任何措施，但需要意识到这个窗口确实存在。
- **合并后：** 预计会新增一个用于配置接收超时的配置项（PR 描述中尚未确定名称）。将 Claude Code Router 作为托管服务运行的运维人员应重新审视其启动 SLO 和就绪探针；此次变更实质上是将一个不可预测的二值失败转化为一个可配置、可观测的参数。
- **运维规范：** 即使修复已合并，也请将健康检查的宽限期设置为高于配置的超时值并留出充足的余量，否则编排器（systemd、k8s、PM2）可能在进程来得及宣告就绪之前就将其终止。
- **今天没有版本驱动的升级需求：** 没有需要处理的版本固定相关事项；如果你希望提前跟进此修复，请继续跟踪 `main` 分支。

---
*来源：[musistudio/claude-code-router PR #1794](https://github.com/musistudio/claude-code-router/pull/1794)。时间窗口：2026-09-13 → 2026-09-14。*

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 每日摘要 — 2026-09-14

## 1. 今日要点

今日主旋律是一组 **Codex 跨提供方会话回放失败** 问题：当用户在第三方端点（DeepSeek、Grok、自建中转）与 OpenAI 官方之间切换时，`function_call_output` 项缺失 `call_id`、混入外部的 `reasoning` 块，以及 `state_5.sqlite` 中的 `model_provider` 钉死，三者叠加会永久性破坏旧会话。SailingLoong 当天提交了两个代理层修复（[#7374](https://github.com/farion1231/cc-switch/pull/7374)、[#7373](https://github.com/farion1231/cc-switch/pull/7373)）针对空 ID 类 bug；[#7362](https://github.com/farion1231/cc-switch/issues/7362) 与 [#7257](https://github.com/farion1231/cc-switch/issues/7257) 则把提供方钉死问题升级为功能请求。Codex 用量同步的重构持续见效 — 今天又关闭了三个游标相关 bug（[#6027](https://github.com/farion1231/cc-switch/pull/6027)、[#6080](https://github.com/farion1231/cc-switch/pull/6080)、[#6246](https://github.com/farion1231/cc-switch/pull/6246)）。

## 2. 版本发布与破坏性变更

过去 24 小时内没有新 tag。当前活跃开发分支仍向 v3.20.x 推进（issue 列表中已出现 v3.20.1、v3.20.2、v3.20.3 引用）。今日无弃用或配置格式层面的破坏性变更。

## 3. 新模型与硬件支持

- **Grok 4.x 推理白名单** — [#7369](https://github.com/farion1231/cc-switch/pull/7369) 将原来的 `grok-4.5/4.6` 字面量匹配泛化为 `grok-4.x (x>=5)`，未来 Grok 发版不再需要改代码即可保持 `reasoning.effort` 正常透传。
- **o 系列推理等级夹紧** — [#7370](https://github.com/farion1231/cc-switch/pull/7370) 把 Claude Code 的 `xhigh`（以及原本就有的 `max` / `thinking: adaptive`）向下夹紧为 `high`，因为 o1/o3/o4-mini 只接受 low/medium/high。
- **智谱 OpenAI Responses 模型列表** — [#7330](https://github.com/farion1231/cc-switch/pull/7330) 为智谱的 `/models` 端点补齐 schema 兼容，覆盖 chat/responses/embedding 三类 API 风格。
- **火山引擎套餐路由** — [#6518](https://github.com/farion1231/cc-switch/pull/6518) 根据提供方的 `base_url`，把用量探测分别路由到 `GetCodingPlanUsage` 或 `GetAFPUsage`，让双订阅账号在每张卡片上显示正确的额度。

## 4. 性能与优化

- **npm 版本探测重写** — [#7346](https://github.com/farion1231/cc-switch/pull/7346) 与 [#7307](https://github.com/farion1231/cc-switch/pull/7307) 用 `registry.npmjs.org/-/package/<name>/dist-tags` 取代整包 packument 拉取，并加上显式超时。作者报告在 `codex`/`opencode`/`openclaw` 等包上每次请求节省数十 MB，并消除了「正在检查版本」卡片长时间转圈的问题。
- **RequestLogTable 中的 TPS** — [#3369](https://github.com/farion1231/cc-switch/pull/3369) 在请求日志中显示 `output_tokens / latency`，前提是两个值都有效，为运维提供直接的吞吐诊断。
- **备份保留 bug** — [#7320](https://github.com/farion1231/cc-switch/issues/7320) 指出 `cleanup_old_backups` 只清理 `.json` 快照；某安装中 SQLite `.db` 备份在 11 天内膨胀到 **530 MB**（已分诊关闭）。

## 5. 稳定性与回归

**高危（开放中，反复出现）：**

- **工具输出缺少 `call_id` → DeepSeek 400 / 会话死锁** — [#6995](https://github.com/farion1231/cc-switch/issues/6995) 与 [#7074](https://github.com/farion1231/cc-switch/issues/7074) 报告 Codex Desktop 的心跳自动化与 `send_message_to_thread` 会注入没有 `call_id` 的 `function_call_output` 项。线程一旦被污染，后续每个请求都会 400，且会话无法自愈；只能开新线程。**已发布修复：** [#7374](https://github.com/farion1231/cc-switch/pull/7374) 在 Responses→Chat 与 Responses→Anthropic 两条路径上都把它们改写为用户消息。
- **子代理产生的 `tool_call_id` 长度 / `tool_use_id=""`** — [#7156](https://github.com/farion1231/cc-switch/issues/7156) 与 [#7230](https://github.com/farion1231/cc-switch/issues/7230)（Codex 子代理，8/8 任务失败）。与上条同根因，已包含在 [#7374](https://github.com/farion1231/cc-switch/pull/7374) 中。
- **Anthropic 透传时的空文本块** — [#7373](https://github.com/farion1231/cc-switch/pull/7373)（开放中）针对 [#7243](https://github.com/farion1231/cc-switch/issues/7243)：陈旧的 Claude Code jsonl 中带空 assistant 文本块，导致每次回放都在 `messages: text content blocks must be non-empty` 处 400。
- **跨提供方回放携带外部 `reasoning` 字段** — [#7333](https://github.com/farion1231/cc-switch/issues/7333)（已关闭）出现 Codex 在第三方路由上的会话回放了官方 Responses 端点会拒绝的 `reasoning` payload。
- **Codex 切换提供方破坏旧线程** — [#6658](https://github.com/farion1231/cc-switch/issues/6658)、[#7211](https://github.com/farion1231/cc-switch/issues/7211)、[#7310](https://github.com/farion1231/cc-switch/issues/7310)、[#7362](https://github.com/farion1231/cc-switch/issues/7362)、[#7257](https://github.com/farion1231/cc-switch/issues/7257)、[#7353](https://github.com/farion1231/cc-switch/issues/7353)。Codex 在 `~/.codex/state_5.sqlite` 中按线程存储 `model_provider`；切换提供方后，原先引用旧提供方的线程 Codex 会拒绝加载。当前活跃的功能讨论在 [#7362](https://github.com/farion1231/cc-switch/issues/7362)；[#7311](https://github.com/farion1231/cc-switch/pull/7311) 覆盖相关的 managed OAuth 切换残留场景。
- **WSL 原子写入失败** — [#6596](https://github.com/farion1231/cc-switch/issues/6596) 报告 `os error 50`（`\\wsl.localhost\Debian\...` 不支持用于安全凭据恢复的重命名式原子写入）。暂无修复。

**中危：**

- **Grok 4.6 上 `reasoning.effort` 被静默丢弃** — 通过 [#7318](https://github.com/farion1231/cc-switch/pull/7318) 关闭；后续跟进见 [#7369](https://github.com/farion1231/cc-switch/pull/7369) 与 [#7370](https://github.com/farion1231/cc-switch/pull/7370)。
- **工具 `description: null` 在严格 OpenAI 网关上序列化失败** — 通过 [#7319](https://github.com/farion1231/cc-switch/pull/7319) 关闭。
- **文本后残留的 `reasoning_content` 在 Anthropic SSE 上打开一个幻影 thinking 块** — [#6911](https://github.com/farion1231/cc-switch/pull/6911)（关闭 [#6903](https://github.com/farion1231/cc-switch/issues/6903)）。
- **托管 web_search 工具选择不匹配** — [#7366](https://github.com/farion1231/cc-switch/pull/7366)（开放中）把 Anthropic 的 `tool_choice: {type:"tool", name:"web_search"}` 映射为 Responses 的 `tool_choice: "required"`，原因是 Grok/xAI New-API 网关无法识别 OpenAI 的托管选择器。
- **Codex 导入时仅含 URL 的 MCP 服务器被损坏** — [#6755](https://github.com/farion1231/cc-switch/pull/6755)（开放中）在仅设置 `url=` 时将其推断为 `type=http` 而非 `stdio`。

**平台 / 打包：**

- **Linux AppImage 在 Wayland 上窗口空白** — [#7335](https://github.com/farion1231/cc-switch/issues/7335)（已关闭）追溯到自带的 `libwayland-client` 触发 `EGL_BAD_PARAMETER`；已发布的 appimage 需要移除或更新自带库。
- **deb/rpm 应用内更新失败 `os error 13`** — [#7336](https://github.com/farion1231/cc-switch/issues/7336)（已关闭）— 二进制未携带 `tauri-plugin-updater` 2.10.0 期望的 bundle 类型标记。
- **WSL 工具版本显示 Ubuntu MOTD** — [#7347](https://github.com/farion1231/cc-switch/issues/7347)（已关闭）— 版本探测从 `MOTD` 输出中错误地解析出发行版版本号。
- **OpenCode 目录位于 WSL 内部时 OMO 配置未被识别** — [#7367](https://github.com/farion1231/cc-switch/pull/7367)（开放中）新增 `derive_wsl_home_dir`，以便在 WSL 侧定位 OMO ≥ 4.19.3 的统一配置。
- **Windows Terminal 默认配置文件被忽略** — [#5322](https://github.com/farion1231/cc-switch/issues/5322) 在 v3.17.0 仍然存在；两处硬编码的 `wt cmd /K` 启动路径绕过了用户的默认配置。

**用量同步回归（已关闭）：**

- Windows 在追加 JSONL 时不更新 `mtime` → 自 2026-08-01 起用量缺失。从三层修复（[#6027](https://github.com/farion1231/cc-switch/pull/6027)、[#6080](https://github.com/farion1231/cc-switch/pull/6080)、[#6246](https://github.com/farion1231/cc-switch/pull/6246)）：在 `mtime` 之外持久化一个 `last_size` 游标，任一变化即视为已更新。

## 6. 对应用开发者的意义

- **如果你把 Codex Desktop 流量代理到 DeepSeek（或任何要求非空 `call_id`/`tool_use_id` 的网关）：** 请升级到包含 [#7374](https://github.com/farion1231/cc-switch/pull/7374) 的版本。否则一次心跳或子代理派发就可能永久污染一个线程 — 应用内无法恢复。
- **请把 Codex 线程视为与提供方绑定的。** 通过 CC Switch 切换提供方不会重写 `state_5.sqlite`，因此任何引用旧 `model_provider` 的线程都会加载失败。在 [#7362](https://github.com/farion1231/cc-switch/issues/7362) 合入之前，建议用户在切换提供方后开新线程，或自行备份并手工编辑 `model_provider`。
- **推理等级值不再适合原样透传。** o 系列只接受 low/medium/high（[#7370](https://github.com/farion1231/cc-switch/pull/7370)），Grok ≥ 4.5 需要显式白名单覆盖（[#7369](https://github.com/farion1231/cc-switch/pull/7369)）。如果配置自定义提供方，请在客户端钉死 `reasoning.effort`，不要依赖透传。
- **Linux 发行版用户：** 优先选择自带较新 `libwayland-client` 的 AppImage，或在 XWayland 下运行；当前的 v3.20.3 AppImage 在 GNOME Wayland 上会白屏，直到 [#7335](https://github.com/farion1231/cc-switch/issues/7335) 的修复重新打包。`dpkg`/`rpm` 用户应通过包管理器更新，而非应用内更新。
- **请求日志运维现可在 [#3369](https://github.com/farion1231/cc-switch/pull/3369) 中看到 TPS**，便于在用户感知到延迟之前先发现提供方侧的速率下滑。
- **火山引擎双套餐账号**（[#6518](https://github.com/farion1231/cc-switch/pull/6518)）— 请确保每个提供方的 `base_url` 能正确标识套餐（`/api/coding` 与 `/api/plan`）；否则即使路由正常，额度数字也会错。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-14

## 今日要点

最值得关注的条目是 [Issue #7361](https://github.com/QuantumNous/new-api/issues/7361) 中标记的一处**严重内存回退**：据报告 `v1.0.0-rc.37` 的常驻内存约为 1.8 GB，而 `rc.36` 仅为约 75 MB，这会在小内存主机上触发 OOM。安全方面，[PR #7344](https://github.com/QuantumNous/new-api/pull/7344) 强化了 ratio-sync 路径中的上游 URL 校验以防御 SSRF；`param_override` 与 `pass_through_body_enabled` 之间长期存在的静默交互问题已在 [PR #7346](https://github.com/QuantumNous/new-api/pull/7346) 中修复。除此之外，队列主要由前端打磨和少量 relay-stream 边界情况组成。

---

## 发布与破坏性变更

过去 24 小时内没有新的 tag 发布。在 `rc.37` 上的运维人员应在推广前权衡该内存回退报告（#7361），尤其是在 ≤1 GB 的主机上。迁移说明预计将在 #7361 完成分流后随下一次发布一同提供。

---

## 新模型与硬件支持

- **vLLM 渠道后端** — [PR #7332](https://github.com/QuantumNous/new-api/pull/7332)（`feat: vllm channel`）引入了一类一等公民的 vLLM 渠道类型，扩展了 new-api 在 OpenAI / Anthropic / Gemini 适配器之外可原生中继的推理引擎集合。
- **Gemini 3.x 计算档位后缀保留** — [PR #7339](https://github.com/QuantumNous/new-api/pull/7339)（现已 close/merge）防止 `ApplyReasoningModelSuffix` 在模型映射后剥离 `-high` / `-low` 这类后缀，从而让 `gemini-3.8-flash → gemini-3.8-flash-high` 之类的请求能够完整通过中继流水线。（相关 [Issue](https://github.com/QuantumNous/new-api/issues) 上下文见 PR 内。）
- **Codex 模型识别** — [PR #7364](https://github.com/QuantumNous/new-api/pull/7364) 确保 `codex-*` 模型名称在使用日志中以 OpenAI 图标渲染，修复了 [#7363](https://github.com/QuantumNous/new-api/issues/7363) 中的外观 bug。

今日未涉及新的量化格式或硬件后端（CUDA/ROCm/Metal/CPU）变更。

---

## 性能与优化

- **chat responses fallback 上的分配削减** — [PR #5577](https://github.com/QuantumNous/new-api/pull/5577)（`perf: reduce chat responses fallback usage allocation`）针对 `relaykit/relayconvert` 的 Responses 流 fallback 路径。该分支上每个请求分配的降低，会直接转化为高 QPS 中继（偶尔回环到 Responses API 的场景）上更小的 GC 压力。
- **OAI→Claude 转换上的流终结处理** — [PR #7351](https://github.com/QuantumNous/new-api/pull/7351) 在上游 OpenAI 兼容网关省略 usage chunk 时强制终结流，防止客户端挂起或 token 统计错误。该修复降低了非标准合规网关背后 Claude 格式调用的尾延迟方差。
- **前端测试稳定性** — [PR #7367](https://github.com/QuantumNous/new-api/pull/7367) 解决了 Web 测试套件中动画/可见性的竞态抖动问题，缩短了 CI 反馈周期而非面向用户的性能。

这些 PR 并未给出具体的吞吐数字；预计只有在 `main` 上跑过基准后才会给出。

---

## 稳定性与回归

按严重程度排序：

1. **[HIGH] `rc.37` 上的常驻内存回退** — [Issue #7361](https://github.com/QuantumNous/new-api/issues/7361)。据报告内存从约 75 MB 跃升至约 1.8 GB；在小型 VPS 实例上出现 OOM。暂无修复 PR —— **使用 `rc.37` 的运维人员应保持或锁定到 `rc.36`**，直到问题分流完成。
2. **[MEDIUM] `param_override` 在 passthrough 渠道上被静默丢弃** — [Issue #7348](https://github.com/QuantumNous/new-api/issues/7348)（重复 #7345、#7347 已关闭，标记为 invalid）。由 [PR #7346](https://github.com/QuantumNous/new-api/pull/7346) 修复：新增的 `buildPassthroughRequestBody` 辅助函数在 passthrough 路径上应用 `param_override`。严重程度评为 Medium 是因为现已确认这两个标志互斥，行为与文档一致。
3. **[MEDIUM] `FetchUpstreamRatios` 中的 SSRF 风险面** — [PR #7344](https://github.com/QuantumNous/new-api/pull/7344) 为修复方案；此处列出仅用于提醒未打补丁实例背后的潜在风险。
4. **[LOW] 对话框聚焦时 `Endpoint Type` 下拉框自动展开** — [Issue #7360](https://github.com/QuantumNous/new-api/issues/7360)（重复 #7358、#7359 已关闭，标记为 invalid）。由 [PR #7365](https://github.com/QuantumNous/new-api/pull/7365) 修复。
5. **[LOW] 仪表板每周默认范围未选中** — [Issue #7354](https://github.com/QuantumNous/new-api/issues/7354)；由 [PR #7355](https://github.com/QuantumNous/new-api/pull/7355) 修复。
6. **[LOW] `xAI grok-imagine-video` 列出但调用失败** — [Issue #7352](https://github.com/QuantumNous/new-api/issues/7352) 作为先前报告的重复被关闭；今日未发布新修复。
7. **[LOW] `codex-*` 模型图标** — [#7363](https://github.com/QuantumNous/new-api/issues/7363)，由 [#7364](https://github.com/QuantumNous/new-api/pull/7364) 修复。

今日未合并即关闭的 PR：[#7102](https://github.com/QuantumNous/new-api/pull/7102)（重构，Go `max`/`min`）、[#7342](https://github.com/QuantumNous/new-api/pull/7342)（内部 API key）、[#7349](https://github.com/QuantumNous/new-api/pull/7349)（initial commit）、[#7353](https://github.com/QuantumNous/new-api/pull/7353)（按供应商成本进行视频路由）、[#7362](https://github.com/QuantumNous/new-api/pull/7362)（Claude 归档）。这些均不构成 `main` 上的回归。

---

## 对应用开发者的影响

- **谨慎锁定构建版本。** 如果你在 ≤1 GB 的 VM 上自托管，请**不要**升级到 `rc.37`，直到 #7361 解决为止；保持在 `rc.36` 或你部署已基线测试过的 tag。
- **Passthrough + param_override 的行为现与文档一致。** 如果你此前因为规避而在 passthrough 渠道上避免使用 `param_override`，[PR #7346](https://github.com/QuantumNous/new-api/pull/7346) 将在下一次发布中重新启用该功能 —— 请审查你的 override payload 中应当保持用户可控的字段。
- **vLLM 渠道即将到来。** [PR #7332](https://github.com/QuantumNous/new-api/pull/7332) 意味着你可以把流量直接路由到自托管的 vLLM 端点，作为 OpenAI/Anthropic 渠道的对等节点，从而简化 SaaS + 自托管混合拓扑。
- **长流 Claude 调用更安全。** [PR #7351](https://github.com/QuantumNous/new-api/pull/7351) 消除了这样一种边界情况：未遵守 `stream_options.include_usage` 的 OpenAI 兼容上游，会让 Claude 格式客户端缺失最终的 usage/timing 事件。
- **可观测性升级。** [PR #7356](https://github.com/QuantumNous/new-api/pull/7356) 为使用日志新增了 CSV 导出功能（管理员：全部行；用户：仅自身，最多 1 万行），便于线下成本核对，无需再从 UI 抓取。
- **子路径部署更轻松。** [PR #7350](https://github.com/QuantumNous/new-api/pull/7350) 引入了全局的 `NEW_API_ROUTE_PREFIX`，用于 `/v1`、`/api`、`/pg`、`/mj`、`/oauth` 等路径 —— 如果你把 new-api 放在非根挂载点的反向代理之后，这一点很相关。
- **安全态势改善。** [PR #7344](https://github.com/QuantumNous/new-api/pull/7344) 修复了 ratio-sync 的 SSRF 缺口；如果你把 admin API 暴露在公共入口上，请优先更新。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*