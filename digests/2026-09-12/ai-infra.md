# AI 基础设施日报 2026-09-12

> 生成时间: 2026-09-12 11:30 UTC | 覆盖项目: 9 个

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

# 跨项目对比报告 — 2026-09-12

## 1. 生态总览

当下生态的重心毫无悬念地落在 **DeepSeek-V4.1/V4.1-Flash 的成熟化** 上：在 vLLM、SGLang 与 CC Switch 之间,这个模型主导了内核工作（MegaMoE 融合、FP4 KV、NVFP4 GEMM）、缺陷队列,甚至网关能力开关。第二个结构性变化是**混合线性注意力架构**(GLM-5.3 的 KDA+DSA 层、Qwen3.5/4-Next 的 Gated DeltaNet)从异类走向主流负载——llama.cpp 在数据中心引擎完成稳定化之前就先交付了 320B 量级的混合支持。与此同时,**网关层正在快速专业化**(计费表达式、鉴权路径优化、Responses API 收敛),而今日跨各层最具运维危险性的发现都呈现出同一个特征:**静默失败**——数值错误、零接受率的 draft、跨请求 KV 污染,以及从不抛错的 30 倍降速。

## 2. 活跃度对比

| 项目 | 层级 | 浮出 issue 数* | 浮出 PR 数* | 发布状态 |
|---|---|---|---|---|
| **vLLM** | 推理引擎 | ~17 | ~13 | 无发布;合并候选流转密集 |
| **SGLang** | 推理引擎 | ~18 | ~20 | 无发布;CI 跟踪:2 个失败 / 14 个 flaky |
| **llama.cpp** | 本地运行时 / 内核 | ~14 | ~23 | **24 小时内 10 个构建**(b10909→b10927) |
| **Ollama** | 本地运行时 / 分发 | ~14 | ~15 | 无发布;~12 个 PR 在途 |
| **LiteLLM** | 企业网关 | ~30 (21 个 open) | ~11 | 无发布;强烈建议 ≥1.84.0(1.83.x 含 CVE) |
| **Unsloth** | 微调 | ~14 | ~16 | 无发布;**主干 CI 持续 ~24h 红**,~25 个 PR 被阻塞 |
| **Claude Code Router** | 开发工具路由 | 3 | 4 | 无发布;低体量、聚焦修复的一天 |
| **CC Switch** | 桌面端 Provider 切换器 | ~17 | ~13 | **v3.20.3 已发布**(Kimi → 原生 Responses) |
| **New API** | 网关 / 计费平台 | ~10 | ~9 | **v1.0.0-rc.37 已发布**(定价重构) |

*数量为今日摘要中浮出的条目,非仓库总活跃度。llama.cpp 仍是发布节奏的离群点(滚动构建);SGLang 与 vLLM 背负着与新硬件、新模型绑定的最深 issue 队列;LiteLLM 的 open 负载偏向生产/企业级故障模式,而非模型支持。

## 3. 模型支持竞赛

| 模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | 网关 |
|---|---|---|---|---|---|
| **DeepSeek-V4.1(-Flash)** | 成熟中:H20 崩溃修复 (#56598)、SM120 几何 (#56509)、MegaMoE 融合 (#56568) | 成熟中:NVFP4 W4A16 opt-in (#39210)、FP4-KV 提案 (#38902);2 个新 bug (#39193, #39173) | — | — | CC Switch:多模态开关 bug (#7308) |
| **GLM-5.3(-Flash),320B 混合 KDA+DSA** | MI350 精度崩溃 (#54924) | disagg+dp-attn+spec 下崩溃 (#39072) | **已交付** —— PR #27773,文本+视觉 | 云端推理循环 (#18193) | CCR token 计划轮询 (#1747);CC Switch 智谱预设 |
| **Qwen3.5 / 3.8 / 4-Next** | PLE n-gram + PP (#56444)、prefix-cache 修复 (#52244) | PP encoder 修复 (#37204) | Qwen4-Next 多 GPU PR (#28623);RTX 5090 性能差距 (#28196) | numParallel>1 解锁 (#17144);2 个解析器 bug | LiteLLM Ollama 工具结果 bug (#40575);New API `-max` 名称截断 (#7201) |
| **Kimi-K3** | — | 多模态 Responses encoder (#35487);PP8 TTFT 下限 (#34815) | — | — | CC Switch:**原生 Responses** 已纳入 v3.20.3 |
| **LLaDA-Image(扩散模型)** | — | **已交付** —— 原生 Diffusion serving 含 FP8 (#37907) | — | — | — |
| **GPT-5.6-sol / image-2.x** | — | — | — | — | LiteLLM Bedrock Mantle (#40849);New API 计费默认值 |

**结论:** vLLM 与 SGLang 在 DeepSeek-V4.1 和 Kimi-K3 上领跑数据中心模型节奏,代价是正确性债。**llama.cpp 在架构广度上领先** —— 首家交付 320B 混合(GLM-5.3-Flash),加上新量化类型(IQ2/IQ3_NL)与边缘后端。Qwen 的跨层覆盖最广,但多半以回归源的形式出现。SGLang 在 diffusion serving 上位置独特。网关层比拼的是 provider 预设与协议转换,而非架构本身。

## 4. 性能前沿

- **MoE 内核是热点,且呈趋同演化。** vLLM (#56568,为 MegaMoE 将共享 expert zero-pad 到 2560) 与 SGLang (#38700,DeepGEMM MegaMoE 内 shared-to-sparse 融合) 本周各自独立落地了 DSV4 的共享 expert 融合。vLLM 还在剥离运行时内核特化以消除首次请求重编译 (#56580),并对预热做"去 JIT 化" (#56323)。
- **KV cache 进入 FP4 时代。** SGLang 提案 Hopper 上的 packed FP4 KV (#38902) 并交付 opt-in NVFP4 W4A16 (#39210);反面的声音是未融合的 FP8-KV decode 惩罚 (#30815) 与 llama.cpp 对 4-bit KV 的静默 CPU 回退(约 30 倍 prefill 降速,#28633)。
- **投机解码已成默认,且是 bug 最多的性能特性。** vLLM 中 DFlash2 长上下文回归(71→16 tok/s,#54691),SGLang 中 ~0% 静默 draft 接受率 (#39087),llama.cpp 中 ngram-cache 状态污染(86%→11%,#27852)。性能收益确实存在(vLLM MTP prefix-cache 恢复 #52244),但正确性已落后。
- **分布式 serving:** SGLang 的 EPLB 感知竞争批处理 RFC (#39192) 与 PP8 disagg 约 30s 的 TTFT 下限 (#34815);llama.cpp 新增 Hexagon 多设备 row-split(b10920),但撞上同驻 CUDA-graph 崩溃 (#28404)。
- **网关层性能在于往返,而非 FLOPS:** LiteLLM 将鉴权从约 43 次 Redis 调用折叠为 1 次 MGET (#40834/#40841),是今日整条栈上可测得的最大延迟收益;New API 对每个 (channel, model) 去重健康探活 (#7328)。
- **硬件差距跟踪:** 8× MI355X 上的 DSV4.1-Flash 在并发 1 时仅 8.97 tok/s/GPU(vLLM #56506)——尽管 ROCm 在各项目中都有势头,AMD 的软件差距仍属结构性。

## 5. 层级定位

- **推理引擎(vLLM、SGLang):** 在面向前沿开源模型的 kernel 级 MoE / 投机解码成熟度上竞争。今天两者都背负着新硬件上的高危*静默数值* bug(vLLM GB10 上 Marlin W4A8-FP8 循环 #49546;SGLang SM121 上 FP8 GEMM 偏差 25% #39193)——差异化已经落在可靠性上,不只是吞吐。
- **本地运行时(llama.cpp → Ollama):** llama.cpp 是基座——Ollama 的 `numParallel` 解锁 (#17144) 明确依赖上游 llama.cpp 的修复,它的 GGUF 流水线跑在 `llama-server` 之上。Ollama 在运维护栏(全零 embedding 检测 #18406、可选截断拒绝 #18399)与模型打包上差异化。llama.cpp 在后端广度(Hexagon、WebGPU/WASI、OpenCL/Adreno、Metal 融合重写)上差异化。
- **网关——三个截然不同的层次:** LiteLLM = 企业级代理(鉴权、预算、支出、OTEL);New API = 多租户计费平台(定价表达式、channel 路由,如今已是**一等公民的 vLLM channel 类型** #7332——网关正在把引擎吸收为后端);CCR 与 CC Switch = Claude Code/Codex 的开发桌面端路由,战场在于**Responses API 转换**(CC Switch v3.20.3 为所有主流国内 provider 退役了本地格式转换)。
- **微调(Unsloth):** 向下沉到量化(EXL3 #7115,支持 MoE,填补 bitsandbytes/transformers-5 的空白),向上长出桌面 App(Studio),同时仍受制于上游 churn(SFTConfig `max_seq_length`→`max_length` 破坏 #10785、`accelerate<1.15` 锁定 #10819)。

## 6. 趋势信号

1. **DeepSeek-V4.1 是新的参考负载** —— DSA 稀疏注意力 + MoE + MTP 已成为衡量每个引擎的基准,与 2025 年的 V3/R1 如出一辙。
2. **Responses API 正在成为通用协议。** CC Switch 为国内 provider 完成原生 Responses 迁移;New API 在加 WebSocket 中继 (#5062);SGLang 交付 Kimi-K3 Responses encoder;LiteLLM 最严重的 open bug (#40846, #40736) 都在 Responses 路径。现在就为 `/v1/responses` 语义做准备。
3. **FP4 正在覆盖权重*和* KV cache**,但新硬件上的 FP8 数值是雷区——在 SM121/GB10 与 MI350 上,把量化输出当作未经 BF16 校验之前都视为不可信。
4. **静默失败是九大项目共同的 #1 运维风险类**(错误 GEMM、0% spec 接受率、KV 跨请求污染、静默截断、失效的内存告警)。给不可信的环节加埋点:spec-decoding 接受率、output-schema 校验、embedding 健康度、数值抽检。
5. **工具调用在每一层都仍然脆弱**(Ollama Gemma 4 解析器、SGLang DSML 参数包装、vLLM `tool_choice` 被忽略、LiteLLM Bedrock 工具重声明、CC Switch DeepSeek 图像工具 400)。自动执行的 agent 不管后端如何都需要一遍 schema 校验。
6. **AMD 无处不在,但还远未达到生产可用:** Strix Halo KV 污染(Ollama #17847)、GLM-5.3 在 MI350 上精度崩溃(vLLM #54924)、MI355X 性能断崖。推迟硬件承诺;vLLM #56506 与 SGLang #30599 是跟踪信号。
7. **未来 30 天观察项:** vLLM batch-invariance RFC #27433(为评测/蒸馏提供可复现性)、Transformers v5 迁移 churn、Unsloth EXL3 落地(MoE 微调解锁)、New API 老定价切换,以及 LiteLLM 的 ReDoS / root-container 加固(#32353, #40821/22)(若你自托管该网关)。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 项目简报 — 2026-09-12

## 1. 今日要点

社区正在全力推进 **DeepSeek-V4.1-Flash** 的正确性修复以及 **DSv4 “去 JIT 化”(de-JITification)**:PR #56598 修复了 H20 上 `dsv4_topk` 的非法内存访问，PR #56509 修补了 SM120/GB10 的几何配置，PR #56568 通过对共享专家做零填充，在全部 40 层上启用了原生 MegaMoE 融合。今日热度最高的问题仍然是**批不变性(Batch-Invariant)特性 RFC**([#27433](https://github.com/vllm-project/vllm/issues/27433),92 条评论)；与此同时，围绕 xgrammar/结构化输出、MoE offloading 以及 Transformers v5 升级的稳定性护栏工作也在积极推进。

## 2. 版本发布与破坏性变更

*过去 24 小时内没有新版本发布。*

以下值得关注的行为变更类 PR 正以合并候选的形式推进(目前仍为 open 状态)：

- [#56509](https://github.com/vllm-project/vllm/pull/56509) — DSv4.1-Flash 现在在 SM120/SM121 上将 SWA 设为 `block_size=64`(其他平台此前为 32)。
- [#56568](https://github.com/vllm-project/vllm/pull/56568) — DSV4.1-Flash 共享专家被填充至 2560 以实现 MegaMoE 融合(保留与 checkpoint 同形状的权重)。
- [#56580](https://github.com/vllm-project/vllm/pull/56580) — Triton MoE kernel 去掉了运行时针对 `EM` / `num_valid_tokens` 对齐的特化，以避免首个请求触发 kernel 重编译。

## 3. 新模型与硬件支持

- **DeepSeek-V4.1-Flash**:SM120/GB10 几何配置修复([#56509](https://github.com/vllm-project/vllm/pull/56509))、H20 SM90 上 `dsv4_topk` GPU 崩溃([#56598](https://github.com/vllm-project/vllm/pull/56598))、覆盖全部 40 层的 MegaMoE 共享专家融合([#56568](https://github.com/vllm-project/vllm/pull/56568))。
- **Qwen4Exp**:N-gram Prompt Lookup Encoding 现已支持在 NVIDIA + AMD 后端上与流水线并行配合使用([#56444](https://github.com/vllm-project/vllm/pull/56444))。
- **DeepSeek Sparse Attention (DSA)**:通过 CMake FetchContent 集成 DeepSelect TopK,使每种 decode top-k 实现均可显式选择([#56464](https://github.com/vllm-project/vllm/pull/56464))。
- **ROCm MI355X / gfx950**:需关注 DSv4.1-Flash 性能 RFC([#56506](https://github.com/vllm-project/vllm/issues/56506))与 GLM-5.3 精度问题([#54924](https://github.com/vllm-project/vllm/issues/54924))。
- **Arm CPU CI**:shard 超时时间延长，以容纳 kernel 测试([#56601](https://github.com/vllm-project/vllm/pull/56601))。
- **DSv4 warmup 覆盖**:`[6/N]` PR 将采样与 DFlash JIT kernel 迁入 warmup 契约([#56323](https://github.com/vllm-project/vllm/pull/56323));集成参考为 #49627([#49627](https://github.com/vllm-project/vllm/pull/49627))。

## 4. 性能与优化

- **DSv4.1-Flash 在 8× MI355X 上**(TP4,MXFP4 MoE + DSpark MTP):并发为 1 时仅有 **8.97 out-tok/s/GPU** 和 **0.898 s TTFT p50**——与 H100 级硬件相比差距悬殊；完整 RFC 见 [#56506](https://github.com/vllm-project/vllm/issues/56506)。
- **DFlash 投机解码性能退化**：在混合 GDN 模型上，185k 上下文时从约 71 tok/s 跌至约 16 tok/s(DT=4);短上下文场景下 DT=8 时可达 218 tok/s([#54691](https://github.com/vllm-project/vllm/issues/54691))。
- **Persistent top-k(MoE 路由)**：在 B300/SM103 上，当大量数值落入同一个粗粒度直方图 bin 时，`persistent_topk` 会静默丢弃候选——这对 FP8/量化 MoE 服务场景尤为重要([#51782](https://github.com/vllm-project/vllm/issues/51782))。
- **AWQ CUDA GEMM**:在 RTX 3070 Ti 上的 profiling 显示其受 L1/内存限制；优化提案见 [#55462](https://github.com/vllm-project/vllm/issues/55462)。
- **SiLU 块量化**：可移植的 warp-shuffle 实现已恢复(revert 的 revert),现在对 ROCm wave64 安全([#56586](https://github.com/vllm-project/vllm/pull/56586))。
- **MTP 前缀缓存恢复(V1)**:混合 GDN 模型在 MTP 投机解码下重新获得前缀缓存命中——修复了 Qwen3.5-122B-A10B 上“首次重复未命中缓存”的症状([#52244](https://github.com/vllm-project/vllm/pull/52244),关闭 [#53504](https://github.com/vllm-project/vllm/issues/53504))。

## 5. 稳定性与回归问题

大致按影响程度排序：

| 严重度 | 问题 | 说明 |
|---|---|---|
| **高 — 静默数据损坏** | [#49546](https://github.com/vllm-project/vllm/issues/49546) | `VLLM_MARLIN_INPUT_DTYPE=fp8`(Marlin W4A8-FP8)在 GB10/sm_121a 上、temp 0 时会产生重复的 `</think>` 循环；kernel 反而快了约 2.5%,掩盖了该 bug。暂无修复 PR。 |
| **高 — GPU 崩溃** | [#56389](https://github.com/vllm-project/vllm/issues/56389) | DSv4.1-Flash `dsv4_topk` 在 H20/SM90 上超过 `max_num_seqs=256` 时发生 CUDA 非法内存访问。**修复 PR** [#56598](https://github.com/vllm-project/vllm/pull/56598)。 |
| **高 — 精度崩塌** | [#54924](https://github.com/vllm-project/vllm/issues/54924) | #53155 强制使用 MRV1 后，GLM-5.3 在 MI350/MI355 上的 GSM8K 从 91.6% 跌至 14.9%。尚无修复 PR。 |
| **高 — 精度** | [#52644](https://github.com/vllm-project/vllm/issues/52644) | DeepSeek V4 在 MI350/MI355 上配合 MRV2 并使用 `FULL_DECODE_ONLY` graph 时精度下降。尚无修复 PR。 |
| **中 — 静默输出漂移** | [#54928](https://github.com/vllm-project/vllm/issues/54928) | DFlash2 会在第 30 个 token 处改变 Qwen3.8 贪心解码的 thinking 输出，即使加上 `--enforce-eager` 也一样。 |
| **中 — 投机解码正确性** | [#53777](https://github.com/vllm-project/vllm/issues/53777) | DFlash2 + xgrammar `json_object` 会确定性地触发 "Failed to advance FSM"。 |
| **中 — 工具调用** | [#54808](https://github.com/vllm-project/vllm/issues/54808) | 0.28.0 上，`qwen3_coder` / `qwen3_xml` 解析器会静默忽略 `tool_choice: "required"` 及对具名函数的指定。 |
| **中 — 调度器** | [#42381](https://github.com/vllm-project/vllm/issues/42381) | 当 prompt 比 `max_model_len` 多出 1 个 token 时，调度器在 `VLLMValidationError` 之后死锁。**已关闭**(修复已合入)。 |
| **中 — HMA** | [#42024](https://github.com/vllm-project/vllm/issues/42024) | NIXL connector 静默禁用 HMA,导致 KV-cache 容量减半。**已关闭**——诉求是将默认值改为 HMA=on。 |
| **低 — 配置** | [#48426](https://github.com/vllm-project/vllm/pull/48426) | `SamplingParams._verify_args` 在 `top_k` 为非数值时抛出裸的 `TypeError`;一行即可修复。 |
| **低 — 采样** | [#36802](https://github.com/vllm-project/vllm/issues/36802) | Tesla T4 共享内存耗尽(81920 > 65536)。规避方法：减小 block 尺寸 / `num_stages`。 |
| **低 — CI 偶发失败** | [#56602](https://github.com/vllm-project/vllm/pull/56602) | GSM8K 数据集出现 503 偶发失败；重试辅助 PR。 |

## 6. 对应用开发者意味着什么

- **DSv4.1-Flash 目前仍有不少粗糙之处。** 在 [#56598](https://github.com/vllm-project/vllm/pull/56598) 落地之前，H20 部署应视作需要 `max_num_seqs ≤ 256`,并且完全避免在 GB10/sm_121a 上使用 Marlin W4A8-FP8——输出可能静默陷入循环。请锁定已知正常的构建版本，并添加能捕获 `</think>` 重复的冒烟测试。
- **混合 GDN / Mamba + MTP 服务已基本恢复。** 如果你升级后遇到首次重复时前缀缓存未命中的情况，应跟进的修复是 [#52244](https://github.com/vllm-project/vllm/pull/52244)(将关闭 [#53504](https://github.com/vllm-project/vllm/issues/53504))。
- **结构化输出 + 投机解码(DFlash2)存在多个尚未关闭的正确性 bug。** 如果你用 DFlash2 drafter 提供 JSON 语法服务，请为这些路由禁用投机解码，或在 [#54928](https://github.com/vllm-project/vllm/issues/54928) 与 [#53777](https://github.com/vllm-project/vllm/issues/53777) 解决之前先留在 `ngram`/`medusa` 上——该 bug 是确定性的、可复现的。
- **Qwen3 解析器出现工具调用回归。** 在 0.28.0 上依赖 `tool_choice: "required"` 或具名函数强制、并使用 `qwen3_coder` / `qwen3_xml` 的应用，应在 [#54808](https://github.com/vllm-project/vllm/issues/54808) 修复前升级版本或回退到其他解析器。
- **Transformers v5 升级正在进行中**([#38379](https://github.com/vllm-project/vllm/issues/38379))——预计子 issue 会持续变动，后续大概率还有版本门槛的提升；使用 `transformers` ≥ 5 的下游用户现在就应着手安排兼容性测试。
- **DSV4 在 ROCm 上正逐步拉齐差距，但 GLM-5.3 还没有**——如果你正在评估 AMD MI355X,请在最终敲定硬件之前同时关注 [#56506](https://github.com/vllm-project/vllm/issues/56506) 与 [#54924](https://github.com/vllm-project/vllm/issues/54924)。
- **批不变性仍是一个动态目标。** 如果你依赖可复现的 logprobs(评测、A/B 测试、蒸馏)，在假设“相同输入现在会跨 batch 形状产出相同输出”之前，请先跟进 [#27433](https://github.com/vllm-project/vllm/issues/27433)。

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 简报 — 2026-09-12

## 今日要点

今日动态以 DeepSeek-V4.1 的打磨成熟工作为主：一个在 Hopper 上以 packed FP4 存储 C1/C2 主 KV 的功能请求([#38902](https://github.com/sgl-project/sglang/issues/38902))、一个为 DSV4 DeepGEMM MegaMoE 融合 shared-to-sparse 专家的性能目标提案([#38700](https://github.com/sgl-project/sglang/issues/38700))、一条面向 FlashInfer MegaMoE 的可选启用(opt-in)NVFP4 W4A16 路径([#39210](https://github.com/sgl-project/sglang/pull/39210)),外加两个新的正确性 bug —— SM121 上 FP8 `wo_a` absorb GEMM 静默偏差约 25%([#39193](https://github.com/sgl-project/sglang/issues/39193)),以及 DSV4.1-Flash 的 Engram 验证路径在 CUDA-graph capture 时崩溃([#39173](https://github.com/sgl-project/sglang/issues/39173))。在投机解码方面，量化版 DFlash2 的 draft 在无任何报错的情况下接受率悄然掉到约 0%([#39087](https://github.com/sgl-project/sglang/issues/39087));此外还开放了一个关于动态 EPLB 专家迁移下争用感知批处理的 RFC([#39192](https://github.com/sgl-project/sglang/issues/39192))。

## 发布与破坏性变更

过去 24 小时内没有新版本发布。

## 新模型与硬件支持

- **LLaDA-Image / LLaDA-Image-Turbo (Diffusion)** — 原生 SGLang Diffusion 服务，涵盖 FP8 变体、文生图、图像编辑与序列并行([PR #37907](https://github.com/sgl-project/sglang/pull/37907))。
- **FlashInfer MegaMoE — NVFP4 W4A16** — 通过 `SGLANG_FLASHINFER_CUTEDSL_NVFP4_W4A16=1` 与 `--quantization nvfp4_online` 可选启用，专家激活与 EP 传输仍保持 BF16([PR #39210](https://github.com/sgl-project/sglang/pull/39210))。依赖 FlashInfer #5019。
- **AMD 消费级 Radeon (RDNA3/RDNA4)** — 针对 `gfx1100/1101/1200/1201` 的官方支持跟踪伞形议题；目前 ROCm 路径仅支持 `gfx942/950`([#30599](https://github.com/sgl-project/sglang/issues/30599))。
- **NPU CANN 9.1.0** — 新增与 DeepSeek-V4-Flash、GLM-5.2、Kimi-K3 测试对齐的 nightly 测试套件；PR 测试套件新增代码覆盖率收集([PR #38332](https://github.com/sgl-project/sglang/pull/38332)、[PR #38339](https://github.com/sgl-project/sglang/pull/38339))。
- **DeepSeek-V4.1 packed FP4 KV** — 提议在 Hopper 上用于 C1/C2 主 KV([#38902](https://github.com/sgl-project/sglang/issues/38902))。

## 性能与优化

- **权重缓存守护进程多租户** — 守护进程路径现以配置摘要(config digest)为键，单张 GPU 可为不同模型配置承载多个缓存，解锁并行工作流([PR #37459](https://github.com/sgl-project/sglang/pull/37459))。
- **Diffusion CI 单次尝试诊断** — 将每次 pytest 调用/重试保留在各自独立的 artifact 目录中，并在校验前刷新指标([PR #39206](https://github.com/sgl-project/sglang/pull/39206))。
- **DSV4 DeepGEMM MegaMoE** — 融合 shared-to-sparse 专家以提升 MoE 吞吐([#38700](https://github.com/sgl-project/sglang/issues/38700))。
- **AMD Triton 内核启动器修复** — 显式向 fused MoE gate 启动传入 `USE_PDL`,避免 ROCm 上 `torch.compile`/Triton 3.7 的签名不匹配([PR #35685](https://github.com/sgl-project/sglang/pull/35685))。
- **已知回归 / 性能上限**：
  - **Kimi-K3 PP8 分离式 prefill** 存在与负载无关的 ~30 s TTFT 下限([#34815](https://github.com/sgl-project/sglang/issues/34815))。
  - **FP8 KV-cache decode** 因 K/V 量化未融合加上逐层 Q 转换开销而变慢([#30815](https://github.com/sgl-project/sglang/issues/30815))。
  - **生成健康检查**可能扰动 DP 用户路由状态，并使长 prefill 吞吐骤降([#35241](https://github.com/sgl-project/sglang/issues/35241))。

## 稳定性与回归

按可能的运维影响排序。

| 严重程度 | 问题 | 概要 | 修复 PR |
|---|---|---|---|
| 高 | [#39193](https://github.com/sgl-project/sglang/issues/39193) | 当 `DEEPGEMM_SCALE_UE8M0=false` 时，SM121 上 DSV4.1 FP8 `wo_a` absorb GEMM 静默偏差约 25% | 暂无 |
| 高 | [#39087](https://github.com/sgl-project/sglang/issues/39087) | 量化版 DFlash2 draft 静默产生约 0% 的接受率 —— 无报错，decode 甚至比不用 drafter 更慢 | 暂无 |
| 高 | [#39072](https://github.com/sgl-project/sglang/issues/39072) | GLM-5.3 在 disagg decode + dp-attention + spec decode 组合下崩溃 | 暂无 |
| 中 | [#39173](https://github.com/sgl-project/sglang/issues/39173) | DSV4.1-Flash + Engram 的 profiled SPS 表在 CUDA-graph capture 时挂掉 | 暂无 |
| 中 | [#39147](https://github.com/sgl-project/sglang/issues/39147) | `HiCacheFile.batch_exists_v2()` 将无法恢复的混合前缀报告为命中 | 暂无 |
| 中 | [#38980](https://github.com/sgl-project/sglang/issues/38980) | `flash_attn` 的 `is_fa3_supported()` 声称支持 sm_89 但并未附带 sm_89 cubin;`ver` 参数被忽略 | 暂无 |
| 中 | [#38924](https://github.com/sgl-project/sglang/issues/38924) | DSV4/V3.2 的 DSML 工具调用解析器把参数包进多余的 `"arguments"`/`"input"` 键 | 暂无 |
| 中 | [#39125](https://github.com/sgl-project/sglang/issues/39125) | JSON-Schema 语法编译器在深层嵌套/循环 schema 下可能出现 DFA 状态爆炸与 CPU 挂起(安全相关) | 暂无 |
| 低 | [#39103](https://github.com/sgl-project/sglang/issues/39103) | `include_reasoning=false` 时 chat/completions/responses 仍会输出推理内容 | 暂无 |
| 低(已关闭) | [#38815](https://github.com/sgl-project/sglang/issues/38815) | SWA 分支将较晚的 Mamba checkpoint 挂到较早的前缀上 | [#39209](https://github.com/sgl-project/sglang/pull/39209) |

今日落地的其他修复 PR(建议在你的 CI 中跟进)：FP8 DSA MHA 的 Hybrid backend 解包([#38508](https://github.com/sgl-project/sglang/pull/38508))、HarmonyParser 流末尾 flush([#37722](https://github.com/sgl-project/sglang/pull/37722))、Mamba prefix-cache 容量告警([#37594](https://github.com/sgl-project/sglang/pull/37594))、Ollama `/api/chat` 输入与上下文处理([#37730](https://github.com/sgl-project/sglang/pull/37730))、Spark2.5 注意力门激活模式([#37727](https://github.com/sgl-project/sglang/pull/37727))、xgrammar `pattern`+`minLength` 拒绝([#37726](https://github.com/sgl-project/sglang/pull/37726))、纯空白推理内容回退([#37719](https://github.com/sgl-project/sglang/pull/37719))、GLM-4V mRoPE mask 对齐([#37599](https://github.com/sgl-project/sglang/pull/37599))、Qwen3.5 PP 编码器权重保留([#37204](https://github.com/sgl-project/sglang/pull/37204))、投机采样器拒绝零概率 CDF 边界 token([#35788](https://github.com/sgl-project/sglang/pull/35788))、多模态 Kimi-K3 Responses 编码器([#35487](https://github.com/sgl-project/sglang/pull/35487))、`sgl-model-gateway` 的 Qwen3 推理预填充解析([#35249](https://github.com/sgl-project/sglang/pull/35249))。

截至 11:23 UTC,CI 失败跟踪器([#17050](https://github.com/sgl-project/sglang/issues/17050))报告 2 个损坏、14 个不稳定(flaky)、989 个近期已修复的测试。

## 对应用开发者意味着什么

- **暂时不要在 SM121(GB10)上锁定使用 DSV4.1 fp8。**当 `DEPGEMM_SCALE_UE8M0` 为 false 时，`wo_a` absorb GEMM 可能静默偏差约 25%([#39193](https://github.com/sgl-project/sglang/issues/39193))。如果你在 Blackwell 消费级芯片上运行 DeepSeek-V4.1,请先对照 BF16 参考实现校验数值，再对外提供服务。
- **将量化的 draft checkpoint 视为不可信。**量化版 DFlash2 能加载、能服务，但产出的 draft 接受率约 0%,且没有任何告警([#39087](https://github.com/sgl-project/sglang/issues/39087))。请务必通过指标监控投机解码的接受率，而不只是吞吐。
- **不可信的 JSON Schema 是一种 DoS 攻击向量。**深层嵌套或循环的 schema 可能让结构化解码编译器在 CPU 上状态爆炸并挂起请求([#39125](https://github.com/sgl-project/sqlang/issues/39125) — 见[正确链接](https://github.com/sgl-project/sglang/issues/39125))。凡是你要转发给 SGLang 的用户提供的 JSON Schema,都请在入口处加上深度/大小上限。
- **`include_reasoning=false` 目前会泄漏。**当模型输出推理文本时，chat/completion/responses 中依然会出现([#39103](https://github.com/sgl-project/sglang/issues/39103))。修复前请勿依赖该开关实现隐去推理的体验，先做输出后过滤。
- **DeepSeek-V4/V3.2 的工具调用可能格式有误。**DSML 解析器偶尔会把参数包在 `"arguments"` 或 `"input"` 下，而不是真实的参数名([#38924](https://github.com/sgl-project/sglang/issues/38924))。如果你会自动执行工具调用，请加一道 schema 校验。
- **GLM-5.3 + disagg + dp-attention + spec-decode 组合目前不稳定**([#39072](https://github.com/sgl-project/sglang/issues/39072));在修复落地前，生产环境请至少关掉其中一个开关再运行。
- **`HiCacheFile` 的混合缓存前缀命中可能是误报** —— 当辅助池无法恢复该前缀时([#39147](https://github.com/sgl-project/sglang/issues/39147))。如果正确性依赖缓存命中(如去重、计费)，请在认定前缀来自磁盘服务之前，用 `batch_exists` 探测加以验证。
- **本批结构化解码修复对用户可见**：xgrammar 现在会拒绝 `pattern` + `minLength` 组合 —— 此前这类组合会被静默编译并丢掉长度约束([#37726](https://github.com/sgl-project/sglang/pull/37726))。若有客户端依赖过去的宽松行为，可能会遇到新的拒绝。
- **对于 `/v1/responses` 上的多模态 Kimi-K3**,请确保客户端序列化使用 `processed_messages` 而非解码后的 prompt —— 此前多模态请求会返回 HTTP 400([#35487](https://github.com/sgl-project/sglang/pull/35487))。
- **AMD RDNA3/RDNA4 尚未获得官方支持**；若你面向消费级 Radeon,在 [#30599](https://github.com/sgl-project/sglang/issues/30599) 落地之前请做好自力更生的准备。

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 日报 — 2026-09-12

## 今日亮点

后端覆盖面持续扩大：今天发布了 OpenCL 缺陷修复和新的二进制 Q4_K GEMM 内核，同时还有 **Hexagon(高通)多设备行切分支持** 以及 **WebGPU 的 Dawn 更新**。服务端正确性也得到关注，修复了工具选择路由、下载竞态条件和 SYCL oneDNN 暂存内存崩溃等问题；与此同时，**Metal 融合表重构**(b10909)将所有可融合模式整合为图优化器唯一的权威数据源。

## 发布与破坏性变更

过去 24 小时内推送了十个新构建(`b10909` → `b10927`):

- **b10927** — vendor: cpp-httplib → 0.56.0([#28787](https://github.com/ggml-org/llama.cpp/pull/28787))
- **b10926** — syscl: 优雅处理不受支持的 `tq1_0` 量化类型([#28681](https://github.com/ggml-org/llama.cpp/pull/28681))
- **b10924** — server: 将路由器子进程状态命令按整行成帧，修复 stdout/stderr 管道内容交错问题([#28747](https://github.com/ggml-org/llama.cpp/pull/28747))
- **b10923** — opencl: 修复若干导致后端中止的缺陷([#27630](https://github.com/ggml-org/llama.cpp/pull/27630))
- **b10922** — opencl: 为 A8 Q4_K 添加 `kernel_gemm_noshuffle_q4_k_f32_32b_trans_ila_a8_bin` 二进制内核([#28677](https://github.com/ggml-org/llama.cpp/pull/28677))
- **b10921** — webgpu: 针对块量化视图，将张量绑定对齐到类型块大小([#28382](https://github.com/ggml-org/llama.cpp/pull/28382))
- **b10920** — hexagon: 多设备模型切分(行切分)，融合内核中引入任务切分([#28589](https://github.com/ggml-org/llama.cpp/pull/28589))
- **b10919** — ggml-webgpu: 升级至较新版 Dawn,禁用模块扫描([#28683](https://github.com/ggml-org/llama.cpp/pull/28683))
- **b10917** — cmake: 以 MSVC 为目标时跳过 `llama-server` 的 PCH([#28763](https://github.com/ggml-org/llama.cpp/pull/28763))
- **b10909** — metal: 单一来源融合表 + 调试重构([#28164](https://github.com/ggml-org/llama.cpp/pull/28164))

本窗口期内没有正式的 API 或版本号提升公告。

## 新模型与硬件支持

- **GLM-5.3-Flash(GLM5-Next)** — PR [#27773](https://github.com/ggml-org/llama.cpp/pull/27773) 增加了对这个 320B 混合模型的支持(34 个 KDA 线性层 + 11 个 DSA 层，mHC + De…),文本与视觉(mtmd)均已覆盖。
- **Qwen4-Next-Flash 多 GPU** — PR [#28623](https://github.com/ggml-org/llama.cpp/pull/28623) 解决了多 GPU 与缓冲区大小问题；需开启 `LLAMA_PLE_RESIDENT=1` 并禁用 NUMA 负载均衡后方可正常工作。
- **Hexagon 多设备(行切分)** — 随 b10920 落地，可将模型切分到多个高通 Hexagon 设备上，并通过融合内核协同分配任务。
- **WASI 上的 WebGPU** — PR [#27069](https://github.com/ggml-org/llama.cpp/pull/27069) 在 WASI 上禁用了 Dawn 原生特性，使该后端如今能够干净地针对 `wasi:webgpu` 编译。
- **IQ2_NL / IQ3_NL 量化** — 在 CPU、Metal、CUDA 和 Vulkan 上分阶段推出:[#27322](https://github.com/ggml-org/llama.cpp/pull/27322)(CPU)、[#27324](https://github.com/ggml-org/llama.cpp/pull/27324)(+ Metal)、[#27325](https://github.com/ggml-org/llama.cpp/pull/27325)(+ CUDA)、[#27983](https://github.com/ggml-org/llama.cpp/pull/27983)(+ Vulkan)。这些块大小为 32 的新类型，使得行长度不是 256 整数倍的张量也能获得最优量化——目前 K/I 量化在这类张量上会出现退化。

## 性能与优化

- **Metal 融合机制大改(b10909,[#28164](https://github.com/ggml-org/llama.cpp/pull/28164))** — 所有 Metal 可融合模式现在统一在 `ggml-metal-fuse.cpp` 中声明一次，由图优化器和内核发射器共用。这简化了融合 pass,也为更清晰的调试埋点创造了条件；具体吞吐量变化仍有待测试报告。
- **OpenCL Q4_K 二进制内核(b10922,[#28677](https://github.com/ggml-org/llama.cpp/pull/28677))** — 新的 A8(Adreno 8)非 MoE GEMM 内核避免了此前会退回标量路径的布局转换。
- **ggml-cpu: 对仅含 NOP 的图跳过线程池([#28785](https://github.com/ggml-org/llama.cpp/pull/28785))** — 当计算图只包含视图或空操作时(全量 GPU 卸载下的典型情形)，不再创建或唤醒工作线程池。PR 中附有 CPU 基准测试表格；对真正会用到 CPU 的图，未提及任何性能回退。
- **WebGPU 张量对齐(b10921,[#28382](https://github.com/ggml-org/llama.cpp/pull/28382))** — 绑定偏移会回退到整数块边界，使块量化视图在 shader 中获得有效的元素偏移。这应能消除块量化 WebGPU 路径中一类崩溃/卡死问题。
- **Hexagon 融合内核任务切分(b10920)** — 多设备融合内核现在除了行切分式的按层划分外，还会在设备之间切分工作。
- **此前开放的回退现已关闭** — 移除 rocWMMA 后出现的 RDNA4 原生 MMA FlashAttention 预填充回退(深层场景下最高**慢 2 倍**，[#26220](https://github.com/ggml-org/llama.cpp/issues/26220))现已关闭；预计会有后续修复提交跟进。

## 稳定性与回归问题

**当前开放(活跃)的缺陷，按严重程度排序：**

1. **RDNA3 上 b10780 之后的 Vulkan 提示词处理回退** — [#28752](https://github.com/ggml-org/llama.cpp/issues/28752)。预填充吞吐量严重下降。目前尚无关联的修复 PR。
2. **Windows 上 CUDA 共驻 `llama-server` 崩溃** — [#28404](https://github.com/ggml-org/llama.cpp/issues/28404)。两个 GPU 绑定实例(如 2× RTX 5060 Ti,sm_120)在 CUDA 图复用时必然在 `ggml-cuda.cu` 中崩溃。临时规避方案:`GGML_CUDA_DISABLE_GRAPHS=1`。
3. **CUDA 上 4 位 KV 缓存静默回退 CPU** — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633)。`ggml_cuda_fattn_kv_type_supported` 拒绝 `q4_0`/`q4_1` 且不给出任何诊断信息，导致预填充降至 CPU 速度(约慢 30 倍)。已有修复 PR 提议将 `GGML_CUDA_FA_ALL_QUANTS=ON` 设为默认。
4. **GLM-5.2 dense-MLA CUDA 正确性问题** — [#26027](https://github.com/ggml-org/llama.cpp/issues/26027)。真实 transformer 层卸载到 GPU 后，在 2× RTX PRO 6000 Blackwell 上只能生成部分连贯的文本。暂无修复 PR。
5. **OpenVINO AVX-512 崩溃** — [#28726](https://github.com/ggml-org/llama.cpp/issues/28726)。在 Core Ultra 7 265K 上使用默认构建标志即触发 `STATUS_ILLEGAL_INSTRUCTION`;多个模型均可复现。
6. **qwen35 在 RTX 5090(sm_120)上解码性能不佳** — [#28196](https://github.com/ggml-org/llama.cpp/issues/28196)。混合 Gated DeltaNet + 全注意力架构在 Windows 上仅跑到带宽上限的约 28%,而在 RTX 4090/Linux 上约为 86%;MTP 草稿性能同样有所退化。暂无修复 PR。
7. **MTP 破坏 StepFun Step-3.7-Flash 的多模态功能** — [#25129](https://github.com/ggml-org/llama.cpp/issues/25129)。在视觉输入上，投机解码会产生 "inconsistent sequence positions"(序列位置不一致)/ "failed to process speculative batch"(无法处理投机批次)错误。
8. **ngram-cache 投机解码状态污染** — [#27852](https://github.com/ggml-org/llama.cpp/issues/27852)。`begin()` 是空操作，导致每个槽位的 ngram 缓存跨请求存留；接受率从 86% → 11% 暴跌。

**近期已关闭(修复已随日常提交落地)：**

- [#26220](https://github.com/ggml-org/llama.cpp/issues/26220) RDNA4 FA 回退 — 已关闭。
- [#20260](https://github.com/ggml-org/llama.cpp/issues/20260) Qwen3.5 `peg-native` 聊天格式解析器崩溃 — 已关闭。
- [#25808](https://github.com/ggml-org/llama.cpp/issues/25808) SYCL `xe2` 段错误 — 已关闭。
- [#26208](https://github.com/ggml-org/llama.cpp/issues/26208) ROCm 7.14 在 gfx1201 上的显存分配问题 — 已关闭。
- [#25807](https://github.com/ggml-org/llama.cpp/issues/25807) ROCm 7.14 缺少 `libhipblas.so.3` — 已关闭。
- [#24177](https://github.com/ggml-org/llama.cpp/issues/24177) AMD 上 RPC top-k argsort 崩溃 — 已关闭。

## 这对应用开发者意味着什么

- **工具路由的正确性正在收紧。** PR [#28806](https://github.com/ggml-org/llama.cpp/pull/28806) 让 `llama-server` 拒绝无效的具名 `tool_choice`,而不是静默降级为 `auto` —— 此前在 `/v1/chat/completions` 上传错工具名也能蒙混过关的 agent,现在会收到明确报错，应在上游增加校验。
- **单机多进程部署需谨慎。** 共驻服务器上的 CUDA 图崩溃([#28404](https://github.com/ggml-org/llama.cpp/issues/28404))对分片模型服务而言是生产环境隐患；如果在同一台机器上运行多于一个 GPU 绑定的 `llama-server`,目前请固定设置 `GGML_CUDA_DISABLE_GRAPHS=1`。
- **4 位 KV 缓存在 CUDA 上会静默变慢。** 如果预填充吞吐量无缘无故下降约 30 倍，请检查 KV 缓存量化类型，确认没有发生静默回退([#28633](https://github.com/ggml-org/llama.cpp/issues/28633))。
- **混合架构的模型版图正在扩大。** GLM-5.3-Flash([#27773](https://github.com/ggml-org/llama.cpp/pull/27773))和 Qwen4-Next 多 GPU 路径([#28623](https://github.com/ggml-org/llama.cpp/pull/28623))正在落地 —— 如果你的部署目标包含中国模型，建议着手规划 320B 级混合(KDA + DSA)工作负载的测试。
- **可观测性在改善。** `LOG_JSON` 宏([#28586](https://github.com/ggml-org/llama.cpp/pull/28586))在现有 `LOG_*` 宏之外新增了可叠加的结构化日志 —— 便于直接摄入 Loki/Elastic,无需再写日志解析正则。
- **ABI 安全网即将到来。** [#28579](https://github.com/ggml-org/llama.cpp/pull/28579) 中的兼容性检查脚本可让下游打包者在必须提升 SOVER 时及时察觉 —— 对将 libllama 嵌入长生命周期二进制的用户来说是个好消息。
- **Web UI 新增聊天输出的文件下载功能([#26928](https://github.com/ggml-org/llama.cpp/pull/26928))** —— 对那些将生成的代码/脚本直接展示在对话中(而非通过工具调用)的 agent UI 非常实用。
- **并发下载现在是安全的。** [#28803](https://github.com/ggml-org/llama.cpp/pull/28803) 增加了锁文件协议，两个 `llama-server` 实例下载同一个 GGUF 时不会再破坏彼此的进度文件。
- **Edge / WASM 路线正在推进。** WebGPU WASI 构建现在无需 Dawn 原生特性即可干净编译([#27069](https://github.com/ggml-org/llama.cpp/pull/27069)) —— 如果你早前已放弃浏览器端推理，现在值得重新评估。

---

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-12

## 今日要点

今天合并了一批正确性与可靠性修复的 PR：Windows 上 `/api/embed` 回环端口耗尽的问题（Issue [#18392](https://github.com/ollama/ollama/issues/18392)）由 PR [#18397](https://github.com/ollama/ollama/pull/18397) 解决，该 PR 为 llama-server 客户端恢复了 HTTP keep-alive；Gemma 4 工具调用解析器在遇到键名含空格的 object key 时丢弃调用的问题（Issue [#18390](https://github.com/ollama/ollama/issues/18390)）通过两个收敛的修复（[#18398](https://github.com/ollama/ollama/pull/18398)、[#18400](https://github.com/ollama/ollama/pull/18400)）得到处理。多项新增的服务端守卫（PR [#18406](https://github.com/ollama/ollama/pull/18406)、[#18407](https://github.com/ollama/ollama/pull/18407)、[#18408](https://github.com/ollama/ollama/pull/18408)）为此前静默失败的失败模式（全零 embeddings、GGUF 导入漂移、被吞掉的 chat-stream 错误）补充了显式的错误处理。

## 发布与破坏性变更

过去 24 小时内未发布新版本。

正在进行中、会在拉取下一个构建前影响行为的改动，供运维人员审阅：

- **PR [#18399](https://github.com/ollama/ollama/pull/18399)** — 引入 `OLLAMA_CONTEXT_SHIFT`，一个 opt-in 开关，使服务器在遇到超长 prompt 时**拒绝**请求并返回 HTTP 400，而非静默截断（当前默认仍是截断并返回 HTTP 200）。
- **PR [#17566](https://github.com/ollama/ollama/pull/17566)** — 提出按请求或按模型的 thinking token 预算（`think` 不再是二元开关），避免推理模型陷入循环而耗尽上下文窗口。
- **PR [#17144](https://github.com/ollama/ollama/pull/17144)** — 移除针对 `qwen35` / `qwen35moe` 硬编码的 `numParallel = 1` 黑名单，上游 llama.cpp 崩溃已于 2026-03-08 修复；这些架构的吞吐量将得到提升。

## 新模型与硬件支持

- **MLX backend bump** — PR [#18235](https://github.com/ollama/ollama/pull/18235) 跟踪了一次 MLX 升级（`b6368984…ec5f6ff7`）。
- **ROCm / Strix Halo (gfx1151)** — Issue [#17847](https://github.com/ollama/ollama/issues/17847) 记录了 Strix Halo iGPU 版本 `0.32.14-rocm` 在同一 socket 上的顺序请求之间**会出现 KV 状态泄漏**；针对 prompt B 的响应会复述 prompt A 的内容。目前尚无修复 PR — 视为已知损坏状态。
- **AMD gfx1200 (RDNA4, RX 9060 XT)** — Issue [#17782](https://github.com/ollama/ollama/issues/17782) 报告运行 `qwen3.8:27b` 时中途出现 `Could not load "TensileLibrary_lazy_gfx1200.dat"` 崩溃。
- **NVIDIA Jetson Orin Nano 8GB** — Issue [#18396](https://github.com/ollama/ollama/issues/18396)：在 `0.34.0` 上无法加载 Gemma 4 E4B 多模态模型，因为 projector 按 GPU 配置被暂存，但实际是 CPU projector，导致主机 OOM。
- **Qwen3.8-27B-GSQ-RCO-GGUF `IQ3_S`** — Issue [#18297](https://github.com/ollama/ollama/issues/18297) 报告运行以 `done_reason: "stop"` 结束，但返回的 `content` 为空；尚不确定是量化还是解析问题。
- **Model request** — Issue [#18287](https://github.com/ollama/ollama/issues/18287) 请求提供 Tencent Hy4-preview 的 Ollama 格式文件。
- **Manifest-list 支持** — PR [#16590](https://github.com/ollama/ollama/pull/16590) 准备在单一 tag 下为各 runner 分别准备 manifest（v1 保留为降级锚点）。将影响 show/list/copy/remove/pull/push 语义。
- **长期未决** — `ppc64le` 请求（[#796](https://github.com/ollama/ollama/issues/796)，自 2023 年开放）仍未得到处理。

## 性能与优化

- **Windows 上的 Embed 吞吐量** — PR [#18397](https://github.com/ollama/ollama/pull/18397) 为 embed 路径重新启用了到 `llama-server` 的 HTTP keep-alive，消除了在 `bge-m3:567m-fp16`、约 55 docs/s 时出现的 "Only one usage of each socket address" 端口耗尽失败（Issue [#18392](https://github.com/ollama/ollama/issues/18392)）。
- **Qwen3.5 / Qwen3.5-MoE 并行度** — PR [#17144](https://github.com/ollama/ollama/pull/17144) 在上游 llama.cpp 崩溃于 2026-03-08 修复后恢复了 `numParallel > 1`；这些混合架构预计将获得显著的吞吐提升。
- **模型加载时间回归** — Issue [#16501](https://github.com/ollama/ollama/issues/16501)：Qwen3.5 122B 在 Strix Halo 上，`0.30.4` 加载耗时 116s，而 `0.24` 仅需 61s；PP 也变慢约 40%。目前尚无修复。
- **GGUF 导入** — PR [#18407](https://github.com/ollama/ollama/pull/18407) 通过对 `/dev/null` 的 COPY 输出进行校验并复用原始 blob，使 `llama-quantize` 不再重写上传的 blob（避免 digest 变更与磁盘写入翻倍）。
- **日志噪声** — PR [#16941](https://github.com/ollama/ollama/pull/16941)（已关闭/合并）为调度器核算保留 `--log-verbosity 4`，同时过滤每请求的 `slot`/`srv`/采样器噪声。
- **GPU 调度** — Issue [#16599](https://github.com/ollama/ollama/issues/16599)：在 `0.30.6` 上，Gemma 4 31B 会被同时分片到 3090 + 4060，尽管 3090 单独就具备所需的 30GB（约 30 tok/s 单卡）。`OLLAMA_*_VRAM` 环境变量无法覆盖。

## 稳定性与回归

按对生产用户的影响严重程度排序：

1. **[严重 — 正确性] Strix Halo KV 跨请求污染** — Issue [#17847](https://github.com/ollama/ollama/issues/17847)。请求 B 的响应会描述请求 A 的内容。影响 `ollama/ollama:0.32.14-rocm`（gfx1151）。**尚无修复 PR。** 临时方案：每请求一个进程，或每个会话使用不同模型。
2. **[高] Gemma 4 在键含空格时丢弃工具调用** — Issue [#18390](https://github.com/ollama/ollama/issues/18390)。返回空 `content`，`finish_reason: "stop"`。修复进行中：PR [#18398](https://github.com/ollama/ollama/pull/18398) 与 [#18400](https://github.com/ollama/ollama/pull/18400)。
3. **[高] `qwen 3.8` chat 流式返回 500 "no user query found in messages"** — Issue [#17778](https://github.com/ollama/ollama/issues/17778)，28 条评论 / 👍25。在长上下文（~205k）工具调用循环中触发。**尚无修复 PR。**
4. **[高] `glm-5.3:cloud` 无限推理** — Issue [#18193](https://github.com/ollama/ollama/issues/18193)，通过 Ollama Cloud 复现；上游 Z.AI 未受影响。属于上游提供方问题，但值得跟踪。
5. **[高] 静默的聊天历史截断** — Issue [#14259](https://github.com/ollama/ollama/issues/14259)：仅 `slog.Debug` 级别消息，位于 `server/prompt.go:73`。与 PR [#18399](https://github.com/ollama/ollama/pull/18399) 关联，该 PR 新增了 opt-in 的硬失败模式。
6. **[中] `IQ3_S` Qwen3.8-GSQ-RCO 返回空内容** — Issue [#18297](https://github.com/ollama/ollama/issues/18297)。
7. **[中] ROCm gfx1200 TensileLibrary 会话中途崩溃** — Issue [#17782](https://github.com/ollama/ollama/issues/17782)。
8. **[中] Jetson Orin Nano 8GB 加载 Gemma 4 E4B 多模态时 OOM** — Issue [#18396](https://github.com/ollama/ollama/issues/18396)。
9. **[中] Windows `/api/embed` 回环端口耗尽** — Issue [#18392](https://github.com/ollama/ollama/issues/18392)；**修复 PR #18397**。
10. **[低] Qwen3 通过 `/api/chat` `tools` 参数的工具调用** — Issue [#14601](https://github.com/ollama/ollama/issues/14601)，prompt 构建缺陷；当工具内联到系统提示中时工作正常。
11. **[低] Gemma 4 / Qwen 在长输入下的 "cancel task"** — Issue [#18387](https://github.com/ollama/ollama/issues/18387)（TOC 中超过 10 个省略号会触发取消）。
12. **[低] 安装/卸载卫生** — PR [#18386](https://github.com/ollama/ollama/pull/18386) 修复了 Windows 卸载器遗留 Ollama PATH 条目的问题。
13. **[INFO] 已关闭：`mistral3` 默认使用 Ministral 解析器** — PR [#16934](https://github.com/ollama/ollama/pull/16934) 已合并；`mistral3` GGUF 的工具调用现在开箱即用即可正确解析。

**新增的防御性护栏：**

- PR [#18406](https://github.com/ollama/ollama/pull/18406) — 检测来自 runner 的全零 embedding，并返回 HTTP 500，而非静默返回 200。
- PR [#18408](https://github.com/ollama/ollama/pull/18408) — 在内联 chat 错误 UI 中暴露 HTTP 错误、读取失败、格式错误的 JSONL 与过早的 EOF；缺失的终止事件不再被视为成功。
- PR [#18394](https://github.com/ollama/ollama/issue/18394)（提案）— 在本地 `/api/chat` 响应中加入已服务的 manifest digest，以便评估流程将分数绑定到具体 artifact（tag 可能在请求中途从 A 翻转到 B 再回到 A）。

## 对应用开发者的意义

- **Windows 上的 Embed 服务**应关注 PR [#18397](https://github.com/ollama/ollama/pull/18397)，并验证其是否进入下一个发布版本 —— 在持续负载下，大批量 embed 工作负载此前一直在悄悄失败。在此之前，请将批大小限制在 32 以下，或实现带抖动退避的客户端重试。
- **Gemma 4 工具集成**应避免使用含空格的人类可读 object key（例如 `"Basic LLM Chain": …`），直到 PR [#18398](https://github.com/ollama/ollama/pull/18398) / [#18400](https://github.com/ollama/ollama/pull/18400) 合入。升级后，请针对两种 schema 对下游消费者进行验证。
- 基于 **`glm-5.3:cloud` 构建的推理 agent** 应在服务端或客户端强制一个 step/token 上限；Ollama 当前允许无界的内部推理循环。若 PR [#17566](https://github.com/ollama/ollama/pull/17566)（按请求 thinking 预算）被接受，应优先采用该机制，而非应用层的临时方案。
- **长上下文 Qwen3.8** 用户应关注 Issue [#17778](https://github.com/ollama/ollama/issues/17778)；在该问题修复前，针对 205k 上下文的 agent 循环存在中途丢失用户消息并返回 500 的风险。
- 拥有 **混合 VRAM（3090 + 4060）的多 GPU 主机** 应通过环境变量显式固定模型；Issue [#16599](https://github.com/ollama/ollama/issues/16599) 确认 `0.30.6` 的自动分片忽略了大卡的可用显存余量。
- **ROCm / Strix Halo** 依据 Issue [#17847](https://github.com/ollama/ollama/issues/17847) 对任何多租户或交替 prompt 的工作负载均不安全。在修复发布前请勿部署；仅可用于单请求、确定性的工作负载。
- **来源 / 评估卫生** — PR [#18394](https://github.com/ollama/ollama/pull/18394) 提议暴露已服务 manifest digest；如果你运行本地评估，请在该 PR 上 +1 并对齐你的评测框架以在合入后消费该字段。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-12

## 1. 今日要点

今天的重头戏是一连串针对鉴权链路（auth path）的性能优化工作：将冷键（cold key）查询从 43 次 Redis 往返压缩为一次 `MGET` 加一次 Postgres 查询加一次 pipeline（#40834、#40841），并有一个后续改动，**提前释放** `max_parallel_requests` 配额槽位，使已完成的请求不再触发误报 429（#40843、#40846）。同一时间段内，部署层面落地了两个安全相关问题——官方运行时镜像与 Helm chart 默认都以 root 身份运行（#40821、#40822）。此外，cookbook 的版本固定升级 PR（#40574）虽然不起眼但很重要，因为 1.83.14 存在已公开的身份验证绕过（auth-bypass）类 CVE。

## 2. 发布与破坏性变更

过去 24 小时内未发布新版本，未合并任何 API 或配置层面的破坏性变更。提示：cookbook 示例已更新，将版本固定到 `litellm==1.84.0`，原因是 1.83.14 存在已知的身份验证绕过 CVE——[#40574](https://github.com/BerriAI/litellm/pull/40574)。

## 3. 新模型与硬件支持

- **Bedrock Mantle**——新增 `bedrock_mantle/us-gov-west-1/openai.gpt-5.6-sol`，补齐了 [#40102](https://github.com/BerriAI/litellm/issues/40102) 的最后一块拼图，并与 OpenRouter 的同名条目保持一致。[#40849](https://github.com/BerriAI/litellm/pull/40849)
- **Gemini 目录同步**——根据 Google 公布的价格表重新定价 33 个 Gemini 模型，另有 2 个因信息不完整暂挂。[#40832](https://github.com/BerriAI/litellm/pull/40832)
- **新提供商：Requesty**——接入 OpenAI 兼容的 LLM 网关，采用标准的 `provider/model` 命名规范（与 OpenRouter 同形）。[#32893](https://github.com/BerriAI/litellm/pull/32893)
- **护栏（Guardrail）更新：Singulr**——载荷已按当前 Singulr 契约重塑，新增仅日志模式与 MCP 前后钩子。[#37464](https://github.com/BerriAI/litellm/pull/37464)

## 4. 性能与优化

- **鉴权查询折叠**——对于冷键，鉴权现在只对 {user, team, membership, org, project, budget} 执行一次 Redis `MGET`，而非逐对象 GET，外加一次 Postgres 查询与一次 pipeline 来处理消费计数器。官方收益：冷键路径从约 43 次 Redis 往返降到 1 次。[#40834](https://github.com/BerriAI/litellm/pull/40834)
- **调用后消费计数器**——单次 `MGET` + pipeline，响应路径不再二次拉取 team/user/org；叠加于 #40834 之上。[#40841](https://github.com/BerriAI/litellm/pull/40841)
- **并发槽位释放**——已完成的 `/v1/responses` 请求现在会在 `await` 的调用后路径立即释放 `max_parallel_requests` 槽位，而非一直占用到异步成功日志写入完成；按请求串行化以避免竞态。[#40843](https://github.com/BerriAI/litellm/pull/40843)
- **流式 usage 合并器**——显式传入的 `0` 值的 cache_creation/cache_read 现在会覆盖（replace）而非合并（merge）原有计数，从而消除「缓存写入重复计费」与「未缓存输入为负」的 bug。[#40845](https://github.com/BerriAI/litellm/pull/40845)

## 5. 稳定性与回归问题

按对生产环境的影响排序。

| 严重程度 | 问题 | 状态 | 备注 |
|---|---|---|---|
| **Critical** | [#32353](https://github.com/BerriAI/litellm/issues/32353) `secret_redaction.redact_string()` 中的 ReDoS——对长异常字符串发生灾难性正则回溯，导致事件循环阻塞数分钟，杀死存活探针，所有副本陷入 crash-loop | Open | 尚无修复 PR；建议热修补改写脱敏正则，或对长字符串提前短路 |
| **Critical（安全）** | [#40821](https://github.com/BerriAI/litellm/issues/40821) 官方运行时镜像以 `USER root` 结尾；proxy、entrypoint 与 Prisma 迁移均以 UID 0 运行 | Open | 仓库内的其他镜像已主动降权 |
| **Critical（安全）** | [#40822](https://github.com/BerriAI/litellm/issues/40822) Helm chart 提供的 `podSecurityContext`/`securityContext` 为空；Pod 默认以 root 运行 | Open | 加固配置仅以注释示例形式存在 |
| **High** | [#30061](https://github.com/BerriAI/litellm/issues/30061) OTEL `NoneType` 崩溃——启用 OTEL collector 回调会导致容器 crash-loop | Open | |
| **High** | [#40846](https://github.com/BerriAI/litellm/issues/40846) 已完成的 `/v1/responses` 请求会一直占用 `max_parallel_requests` 槽位，直到延迟日志完成 → 引发误报 429 | Open | 修复 PR #40843 |
| **High** | [#40735](https://github.com/BerriAI/litellm/issues/40735) `bedrock_converse` 拒绝携带工具调用历史但未重新声明 `tools=` 的 agent 后续轮次 | Open | 表现为请求尚未离开 proxy 就抛 `litellm.UnsupportedParamsError` |
| **High** | [#40736](https://github.com/BerriAI/litellm/issues/40736) 流式 usage 合并器在显式更新为 0 后仍保留陈旧的缓存写入 token，导致未缓存输入变负、缓存写入重复计费 | Open | 修复 PR #40845 |
| **High** | [#40398](https://github.com/BerriAI/litellm/issues/40398) JWT 鉴权在每次令牌刷新时都会生成新的「virtual key」→ Usage 仪表盘被 `hashed-jwt-…` 行填满 | Open | |
| **Medium** | [#40780](https://github.com/BerriAI/litellm/issues/40780) 任何以 `openai/` 前缀声明的模型，都会将 `/v1/messages` 路由到 Responses API，从而静默丢弃多模态内容 | Open | 影响 vLLM、llama.cpp、SGLang、TGI、LM Studio |
| **Medium** | [#40080](https://github.com/BerriAI/litellm/issues/40080) Bedrock 上的 GPT-5.6 跨区推理配置在传入图片输入时失败（被路由到 Converse 而非 OpenAI 端点） | Open | |
| **Medium** | [#40563](https://github.com/BerriAI/litellm/issues/40563) Vertex AI Realtime（`gemini-3.5-transcribe-live-preview`）将 `pcm16` 硬编码为 24000 Hz → 转写结果损坏 | Open | |
| **Medium** | [#40728](https://github.com/BerriAI/litellm/issues/40728) Azure AI model router 没有成本（cost）追踪 | Open | |
| **Medium** | [#40761](https://github.com/BerriAI/litellm/issues/40761) 当 `store_model_in_db: true` 时，编辑配置文件模型（config-file model）的任意 `litellm_params` 会把对应 deployment 从运行中的 Pod 上驱逐，且直到重启前都不会恢复 | Open | |
| **Medium** | [#40783](https://github.com/BerriAI/litellm/issues/40783) `POST /team/update` 在传入新的 `team_member_budget` 时返回 200，但不会生效到现有成员 | Open | |
| **Medium** | [#40628](https://github.com/BerriAI/litellm/issues/40628) OpenAI 图像生成把 `extra_headers` 放在了 JSON body 中（破坏了 Cloudflare AI Gateway 的 `cf-aig-authorization`） | Open | |
| **Medium** | [#40575](https://github.com/BerriAI/litellm/issues/40575) 原生 Ollama provider 无法消费 Qwen3.8 的工具结果（OpenAI 兼容模式的 Ollama 正常） | Open | 与更早的 #26094 / PR #26122 相关 |
| **Medium** | [#36426](https://github.com/BerriAI/litellm/issues/36426) Responses-API 桥接层会丢弃非流式 `/v1/chat/completions` 的 `SpendLogs` 行 | Open | 与 vLLM passthrough #33210 是同类失败模式 |
| **Medium** | [#22984](https://github.com/BerriAI/litellm/issues/22984) VLLM `cached_tokens` 在成本计算器中未生效 | Open | |
| **Low** | [#30355](https://github.com/BerriAI/litellm/issues/30355) Gemini `part.thought` 元数据在图像响应中未保留 | Open | |
| **Low** | [#30362](https://github.com/BerriAI/litellm/issues/30362) 到上游 provider 的出站请求未启用 HTTP/2 | Open | |
| **Low** | [#30208](https://github.com/BerriAI/litellm/issues/30208) 特性请求：全局启用 fake-streaming（而非仅按路由开启） | Open | |

**过去 24 小时已关闭/解决：** 自 v1.84.0 起 Vertex AI 仪表盘持续显示「Unhealthy」[#28206](https://github.com/BerriAI/litellm/issues/28206)；Bedrock 工具校验错误 [#19384](https://github.com/BerriAI/litellm/issues/19384)；重置后 `max_budget` 被忽略 [#27300](https://github.com/BerriAI/litellm/issues/27300)；`ResetBudgetJob` JSON 崩溃 [#27171](https://github.com/BerriAI/litellm/issues/27171)；`/v1/messages`（Claude Code）上误报「Budget has been exceeded」[#40050](https://github.com/BerriAI/litellm/issues/40050)；Bedrock embeddings 缺失 AWS external ID [#27835](https://github.com/BerriAI/litellm/issues/27835)；Gemini/Vertex 上无效 `reasoning_effort` 抛裸 `ValueError` → HTTP 500 [#40474](https://github.com/BerriAI/litellm/issues/40474)；Datadog 工具调用可观测性跟进 [#40580](https://github.com/BerriAI/litellm/issues/40580)；无关的 notebook OOM [#29831](https://github.com/BerriAI/litellm/issues/29831)。

## 6. 对应用开发者的影响

- **如果你仍在 1.83.x，请升级到 ≥1.84.0**——cookbook 的版本固定升级 PR（[#40574](https://github.com/BerriAI/litellm/pull/40574)）是个有用的提醒：旧分支携带已公开的身份验证绕过 CVE。
- **围绕鉴权路径的性能 PR 制定计划**（[#40834](https://github.com/BerriAI/litellm/pull/40834)、[#40841](https://github.com/BerriAI/litellm/pull/40841)），如果你自托管且鉴权后端为 Redis——合入后冷键 p50/p99 应有显著下降。
- **关注 #40843**（[PR](https://github.com/BerriAI/litellm/pull/40843)）——如果你的 `/v1/responses` 在设置了 `max_parallel_requests` 的情况下一直被偶发 429 困扰，这次的槽位释放修复改动很小且精准。
- **对于以 `openai/<model>` 形式声明的自托管 OpenAI 兼容服务端（vLLM、SGLang、llama.cpp、TGI、LM Studio）**，[#40780](https://github.com/BerriAI/litellm/issues/40780) 意味着 `/v1/messages` 的多模态流量会被静默路由错误——在该问题修复前，建议为这些后端使用非 `openai/` 前缀。
- **携带工具历史的 Bedrock agent 循环**应在每一轮重新声明 `tools=`，直到 [#40735](https://github.com/BerriAI/litellm/issues/40735) 修复合入，否则你会在请求离开 proxy 前就看到 `litellm.UnsupportedParamsError`。
- **部署安全卫生：** 如果你直接使用发布的 Docker 镜像或 Helm chart，请在 Pod 级别显式设置 `runAsNonRoot` / `runAsUser` / `allowPrivilegeEscalation: false` / `capabilities.drop: [ALL]`——上游默认值是空的（[#40821](https://github.com/BerriAI/litellm/issues/40821)、[#40822](https://github.com/BerriAI/litellm/issues/40822)）。
- **留意 proxy 上 ReDoS 形态的症状**——[#32353](https://github.com/BerriAI/litellm/issues/32353) 会把一段长异常字符串变成数分钟的事件循环阻塞与 crash-loop；建议临时在 sidecar 上对请求错误体长度做硬上限。
- **上游新增能力：** 正在引入由网关自动托管、附带管理员策略的 memory（[#40844](https://github.com/BerriAI/litellm/pull/40844)），将 memory 编排从应用层抽出——如果此前你一直在为每个 agent 单独拼装 memory，这一条与你直接相关。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-12

## 今日要点

`main` 分支自提交 `22bbff627`（合并于 2026-09-11）起已变红约 24 小时，每一次 Backend CI 运行全部失败，约 25 个 PR 因一条陈旧的断言而被连带波及。由 danielhanchen 提交的 [#10832](https://github.com/unslothai/unsloth/pull/10832) 定位了五个根因，应作为优先解阻塞项合并。与此同时，AMD ROCm 持续有重要进展：[#10820](https://github.com/unslothai/unsloth/pull/10820) 新增 AMD ROCm Docker 镜像（RDNA2/3/4 + CDNA），与 Blackwell CUDA 配置保持一致；[#10819](https://github.com/unslothai/unsloth/pull/10819) 在 Windows 上将 `accelerate` 上限限制在 1.15 以下，因为 1.15 会无条件导入 `torch.distributed.tensor`，而 AMD 的 ROCm wheels 并不附带该模块。备受期待的 [#7115](https://github.com/unslothai/unsloth/pull/7115) EXL3（ExLlamaV3）量化后端——支持 2/3/4/6/8 位及分数位宽，并具备 MoE 能力——仍在推进中。

## 发布与破坏性变更

过去 24 小时内无新发布。

**进行中的破坏性配置变更：** `SFTConfig` 在 2026.9.4 Docker 镜像中将 `max_seq_length` 重命名为 `max_length`。传递 `max_seq_length=` 的训练脚本现在会报错：`unexpected keyword argument 'max_seq_length'`。参见 [#10785](https://github.com/unslothai/unsloth/issues/10785)。在训练器路径修复前，请固定到旧镜像或更新关键字参数。

## 新模型与硬件支持

- **AMD ROCm Docker 镜像**（[#10820](https://github.com/unslothai/unsloth/pull/10820)，跟踪 [#6230](https://github.com/unslothai/unsloth/issues/6230)）：与 Blackwell 镜像并行的 `docker/` 布局，目标平台为 RDNA2/3/4 与 CDNA/Instinct。同步恢复了已自动关闭的 #6231。
- **EXL3 / ExLlamaV3 量化后端**（[#7115](https://github.com/unslothai/unsloth/pull/7115)，`>3000` 行，在 bitsandbytes 之上叠加）：2/3/4/6/8 位 + 分数位宽，支持 MoE（在 transformers 5 下 bitsandbytes 无法做到）。
- **ARM64 仅 CPU Docker 构建**（[#10766](https://github.com/unslothai/unsloth/pull/10766)）：面向无 GPU ARM 主机的轻量级 CUDA-free 镜像。
- **图像模型文本编码器精度控制**（[#10788](https://github.com/unslothai/unsloth/pull/10788)）：Studio 增加 Default / FP8 存储 / FP8 计算 / INT8 / NVFP4 选项，并同时作用于下载规划与加载阶段。
- **图像模型仅下载不加载**（[#10789](https://github.com/unslothai/unsloth/pull/10789)）：在默认的 `Download and load` 之外新增 `Download only` 模式，方便离线预置资产。
- **macOS Homebrew 安装文档化**（[#9834](https://github.com/unslothai/unsloth/pull/9834)）：`brew install --cask unsloth` 现已写入 README（cask PR #282132）。
- **B200 上的 Qwen3.5-9B LoRA** 正通过 CLI 进行验证（[#10806](https://github.com/unslothai/unsloth/issues/10806)）——这是一个有价值的信号，表明 Blackwell + Qwen3.5 LoRA 现已成为可基准测试的受支持组合。

## 性能与优化

- **B200 上的 GPU 空闲（Qwen3.5-9B LoRA，unsloth-cli）**：`fla` 在每次启动时都会重建其自动调优键，导致每一步中 GPU 大部分时间处于空闲状态。复现见 [#10806](https://github.com/unslothai/unsloth/issues/10806)——环境：1× B200 sm_100，CUDA 12.8，驱动 580.126.20，torch 2.11.0，unsloth `main`@`89976f1c2`，unsloth_zoo 2026.9.2。值得修复缓存键。
- **Studio 安装复用已缓存的 `uv`**（[#10659](https://github.com/unslothai/unsloth/pull/10659)）：当安装器的 PATH 中没有先前安装的 `uv` 时，不再重复下载固定版本的归档。
- **Blackwell 上托管 llama.cpp 源码构建刷新**（[#9963](https://github.com/unslothai/unsloth/pull/9963)）：在没有匹配预编译版本时，所使用的源码树此前会变陈旧，“Update llama.cpp”按钮也会消失。现在管理器会主动刷新源码树，确保新的 GGUF 架构始终可安装。
- **Studio MLX VLM 预填充修复**（[#10778](https://github.com/unslothai/unsloth/pull/10778)）：取消对 mlx-vlm 提示的强制 256 token 网格；缓存与冷启动的结果现已按位一致，且冷启动答案与上游 mlx-vlm 输出相等。
- **Studio 大代码块聊天流式延迟**（[#10779](https://github.com/unslothai/unsloth/pull/10779)）：此前 Streamdown 在未闭合代码块内对每一帧都运行 Shiki；渲染器现在会延迟到代码块闭合后再做高亮。
- **Diffusion 加载取消**（[#10780](https://github.com/unslothai/unsloth/pull/10780)）：拆分构建锁，使 Eject 可以在流水线中途取消；已取消的加载不再能转入 ready 状态。

## 稳定性与回归问题

**关键 / CI 阻塞**
- **`main` 自 2026-09-11 11:18Z 起变红**（[#10832](https://github.com/unslothai/unsloth/pull/10832)——维护者提交的修复 PR）。此后每一次 Backend CI 运行均失败；约 25 个开放 PR 因 `Repo tests (CPU)` 的传递而变红。修复针对五个根因。**在合并其他任何内容之前，请先合并该 PR。**

**高优先级**
- **X11 + NVIDIA：WebKitWebProcess 泄漏 DMA-BUF `sync_file` 文件描述符**，直至达到 EMFILE，导致 Studio 窗口空白/冻结，看似卡死（[#10795](https://github.com/unslothai/unsloth/issues/10795)）。环境为 Linux Mint 21.3，内核 6.8。尚无修复 PR。
- **Studio IPv6 黑洞**（[#10803](https://github.com/unslothai/unsloth/pull/10803)——Lwrless 提交的修复 PR）：后端绑定 `127.0.0.1:8888`，在 HF token 检查处挂起约 80 秒，随后出现 `terminal_reason=unresponsive_health_check`。配套 PR [#10830](https://github.com/unslothai/unsloth/pull/10830) 将 `/api/inference/status` 中的一次 `hf_hub_download` 调用移出事件循环。

**中优先级**
- **手动 GPU 模式记录错误的 `--fit` 判定结果**（[#10821](https://github.com/unslothai/unsloth/issues/10821)，修复 [#10831](https://github.com/unslothai/unsloth/pull/10831)）：日志行在 Manual 分支将其关闭前就读取了 `use_fit`，因此日志记录的与实际运行的相反。
- **`SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`**（[#10785](https://github.com/unslothai/unsloth/issues/10785)），出现于 Docker 镜像 `2026.9.4`。参见上文破坏性变更说明。
- **重复工具调用防护误拦截合法重跑**（[#10792](https://github.com/unslothai/unsloth/issues/10792)），以及**重放的工具调用对参数键进行排序**，导致 llama-server 对多参数调用重复处理（[#10791](https://github.com/unslothai/unsloth/issues/10791)）。两者均影响 Windows 11 Pro / 26200 上的 Studio agent 工作流。
- **手动多 GPU 分层缺失 `--split-mode layer`**（[#10770](https://github.com/unslothai/unsloth/pull/10770)，修复 #10549）：后端依赖 llama.cpp 的默认值，使意图不明且存在回退到 tensor 模式的风险。
- **install.ps1 被杀毒软件标记**（[#10805](https://github.com/unslothai/unsloth/issues/10805)）：在杀毒策略严格的主机上阻止通过 PowerShell 进行更新。
- **用户名含空格时 Windows 安装失败**（[#10722](https://github.com/unslothai/unsloth/issues/10722)，已关闭）：PowerShell 路径引号修复已合并。

**低优先级 / Studio UX**
- **运行设置面板重复**（[#10817](https://github.com/unslothai/unsloth/issues/10817)）：侧边栏与模型下拉中的 Run Settings 各自维护草稿，悄无声息地不一致。
- **“New chat”时出现 `tapClientLookup: Index 1 out of bounds`**（[#10288](https://github.com/unslothai/unsloth/issues/10288)）以及 `MessagePartText` 误用。偶发崩溃。
- **内联图表 / Python 可视化在 Studio 中无法渲染**（[#10539](https://github.com/unslothai/unsloth/issues/10539)，已关闭）。
- **局域网语音输入**（[#10824](https://github.com/unslothai/unsloth/issues/10824)）以及 **PocketPal 通过 API 自动加载**（[#10306](https://github.com/unslothai/unsloth/issues/10306)）：局域网模式的功能缺口。
- **评估损失变为常数**（[#1067](https://github.com/unslothai/unsloth/issues/1067)，标记 `currently fixing`、`good first issue`）——长期存在的 Llama 3.1 8B Instruct 问题，自 2024 年至今仍未关闭。

## 对应用开发者的影响

- **暂停向基于 `main` 的分支合并**，直到 [#10832](https://github.com/unslothai/unsloth/pull/10832) 合入；在此期间，涉及 `Repo tests (CPU)` 的 PR 预计会显示 CI 红色。
- **更新训练器配置**：如果你使用的是 Docker 镜像 `2026.9.4`，请将 `max_seq_length=` 替换为 `max_length=`，或在 SFTConfig 路径修复前固定旧镜像（[#10785](https://github.com/unslothai/unsloth/issues/10785)）。
- **AMD 正成为一等目标。** 若你部署于 RDNA/Instinct，新的 Docker 镜像（[#10820](https://github.com/unslothai/unsloth/pull/10820)）以及 Windows 上的 `accelerate<1.15` 上限（[#10819](https://github.com/unslothai/unsloth/pull/10819)）使 ROCm 成为现实可行的选择；在 Linux+X11 上需留意 WebKit 文件描述符泄漏问题（[#10795](https://github.com/unslothai/unsloth/issues/10795)）。
- **EXL3 即将到来**（[#7115](https://github.com/unslothai/unsloth/pull/7115)）。如果你此前因 bitsandbytes 无法量化 MoE 模型而在 transformers 5 下无法微调它们，请规划在该 PR 合入后重新测试。
- **Blackwell 及类 Blackwell 主机**现在拥有了真正的升级路径：托管 llama.cpp 源码刷新（[#9963](https://github.com/unslothai/unsloth/pull/9963)）加上图像精度控制（[#10788](https://github.com/unslothai/unsloth/pull/10788)），使 Studio 在 RTX 50 系列 / B200 上开箱即用，无需手动重建。
- **Studio agent 工作流**获得了多项值得引入的体验改进：IPv6 启动修复（[#10803](https://github.com/unslothai/unsloth/pull/10803)）、MLX VLM 预填充正确性（[#10778](https://github.com/unslothai/unsloth/pull/10778)）、大代码块的流式延迟修复（[#10779](https://github.com/unslothai/unsloth/pull/10779)），以及面向多 GPU 手动放置的 `--split-mode layer` 修复（[#10770](https://github.com/unslothai/unsloth/pull/10770)）。
- **Windows Studio 上的工具调用可靠性**仍需关注（[#10791](https://github.com/unslothai/unsloth/issues/10791)、[#10792](https://github.com/unslothai/unsloth/issues/10792)）。如果你交付经 Studio 中介的 agent 用以编辑文件并重跑命令，请关注这些问题——它们目前会导致重复处理或误拦截合法重跑。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 摘要 — 2026-09-12

## 1. 今日要点

今天的活动聚焦于**可观测性与路由正确性修复**，而非新功能。最具影响力的变更是 PR #1790，它修正了网关在客户端侧模型名称为路由别名时的用量计费方式 —— 在修复之前，成本会被报告为 `$0`，或错误地以别名而非上游模型进行 `models.dev` 查询。PR #1788 修复了一个细微的子代理调度缺陷：当 `CCR-SUBAGENT-MODEL` 元素被引号包裹时，可能会将正在审查该请求本身的请求再次重路由，同时一并解决了两个相关的可观测性盲点。

## 2. 发布与破坏性变更

过去 24 小时内未发布任何版本。今日未发布任何 API 或配置层面的破坏性变更。

## 3. 新增模型与硬件支持

- **PR #1786 — OpenCode Go（`opencode-go`）提供商导入。** 为 OpenCode 的 Go 提供商新增一等本地导入支持，与 Zen（`opencode`）区分开。Go 使用独立的凭据，且模型 ID 可能与 Zen 重叠；此前的导入器无法干净地处理这种情况。([#1786](https://github.com/musistudio/claude-code-router/pull/1786))
- **PR #1451 — Requesty 提供商预设。** 在提供商预设列表中新增 `requesty.ai`（兼容 OpenAI 的多提供商路由器），与 OpenRouter、NVIDIA 等并列，并通过 `ccr://provider` 深链导入进行暴露。([#1451](https://github.com/musistudio/claude-code-router/pull/1451))
- **Issue #1747 — Token Plan / GLM-5.3。** 维护者针对面向 Claude Code 与 Codex 的付费 Token Plan 套餐（围绕即将发布的 GLM-5.3）发起意见征集。([#1747](https://github.com/musistudio/claude-code-router/issues/1747))
- **Issue #1789 — Qoder Cn 企业子账户支持。** 关于识别 Qoder Cn（中国企业渠道分发）子账户的功能请求。([#1789](https://github.com/musistudio/claude-code-router/issues/1789))

今日未新增任何硬件后端或量化格式。

## 4. 性能与优化

今日没有吞吐量、延迟、内存或内核层面的性能改动落地。本期摘要中的两项路由/用量修复属于*正确性*修复（避免错误的 $0 计费或错误模型的成本报告），而非性能改进。

## 5. 稳定性与回归

按严重程度排序：

1. **[高] 子代理路由在引号场景下可能自重路由 — PR #1788 ([#1788](https://github.com/musistudio/claude-code-router/pull/1788))。** 嵌入在请求首轮字段中的 `CCR-SUBAGENT-MODEL` 值，可能触发审查请求自身的再次重路由。这是网关路径上的逻辑/正确性缺陷；修复 PR 已开启。同一个 PR 还一并处理了两处额外缺陷：子代理路由元素未正确限定在真正的子代理启动范围内；未捕获的上游 HTTP 状态码未被记录。

2. **[中] 用量计费错误地以路由别名为键 — PR #1790 ([#1790](https://github.com/musistudio/claude-code-router/pull/1790))。** `modelMetadata` 以真实的上游模型 ID 为索引，但用量/成本报告读取的却是响应中回显的别名。结果就是：成本被报告为 `$0`，或随机匹配到一个 `models.dev` 查询结果。修复 PR 已开启。同一个 PR 中还描述了请求日志中一处并行的索引缺失问题。

3. **[中] NVIDIA Nemotron Ultra 出现 "All target providers failed" — Issue #1658 ([#1658](https://github.com/musistudio/claude-code-router/issues/1658))。** 报告称 `nvidia/nemotron-3-ultra-550b-a55b` 通过 cc-switch 和手动配置可正常工作，但经由 CCR 时返回 `400 All target providers failed`。尚未关联修复 PR；值得关注是否为提供商配置或 transformer 不兼容所致。

## 6. 对应用开发者的影响

- **针对 #1790 修复核对成本看板。** 如果你正通过 CCR 计量 Claude Code 流量并按模型汇总支出，那么近期任何带别名模型的用量记录都可能出现 `$0` 或错误模型的定价。#1790 合入后，你很可能需要为受影响的客户端回填或重新定价历史用量。
- **审计 #1788 下的子代理调度行为。** 如果你使用 `CCR-SUBAGENT-MODEL` 请求头或路由规则，请尽快部署修复 —— 没有该修复时，审阅风格提示中被引号包裹的路由指令可能导致意料之外的重路由。该修复位于网关侧，无需配置变更。
- **OpenCode Go 用户获得对等体验。** 通过 #1786，你可以使用已有的 Zen `ccr` 导入流程来导入 Go 凭据及 Go 模型目录，无需为 Go 提供商手动搭建配置。
- **新增路由选项：Requesty。** 如果你运营多提供商集群，希望在 OpenAI / Anthropic / Google 之前架设一个统一的 OpenAI 兼容入口，#1451 合入后你将通过标准预设流程接入 Requesty。
- **关注 GLM-5.3 / Token Plan 讨论（#1747）。** 如果你正为通过 CCR 使用 Claude Code 或 Codex 做预算规划，维护者的 Token Plan 提案可能改变 GLM-5.3 容量的分配与计费方式 —— 建议在 issue 中发表意见。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 摘要 — 2026-09-12

## 1. 今日要点

CC Switch **v3.20.3** 整合了长达数月的迁移工作：Kimi 的 Codex 预设现在直接对接厂商原生的 OpenAI Responses 端点，与 DeepSeek、智谱 GLM、Qwen、MiniMax、小米 MiMo、LongCat、字节豆包/火山、腾讯混元并列。Codex 中所有主流中国开源模型已不再需要本地格式转换路由。在工程层面，代理层正在接收本周期最大批量的变更 —— 厂商级出站代理、可逆的 PII 脱敏、可配置的模型路由，以及 Anthropic → Responses / Grok 推理强度保真度。

## 2. 发布与破坏性变更

- **[v3.20.3](https://github.com/farion1231/cc-switch/releases/tag/v3.20.3)** —— Kimi 的 Codex 预设从 Chat Completions 转换为**原生 Responses** 直连厂商。使用旧版 Kimi Codex 卡片的用户需要重新添加预设，或在编辑器中将「上游格式」切换为 `Responses`。
- **[PR #7317 — feat(proxy): configurable model routing](https://github.com/farion1231/cc-switch/pull/7317)** —— ⚠️ **破坏性重命名**：`model_mapper` 替换为 `model_router`。任何引用旧模块/字段的下游工具、脚本或数据库查询都必须更新。新增对 Claude / Codex / Gemini 的客户端请求模型名到上游模型 ID 的规则化映射。
- **[PR #7290 — 厂商级外部 API 代理](https://github.com/farion1231/cc-switch/pull/7290)** —— 每个提供商现在都可以配置独立的出站代理，外部模型 ID 也会显示在提供商列表中。
- **[PR #7292 — 全局出站代理控制](https://github.com/farion1231/cc-switch/pull/7292)** —— 新增开关用于**停止继承系统代理**，并在设置中显示当前生效的代理（针对 Clash / v2rayN 残留 `HTTP_PROXY` 这一类 Bug）。
- **[PR #7306 — 可逆 PII 脱敏](https://github.com/farion1231/cc-switch/pull/7306)** —— 用类型化占位符（`{{PHONE}}` 等）替换不可逆的 `*` 脱敏，并在响应侧还原。

## 3. 新增模型与硬件支持

- **[PR #7313 — cocodot 提供商（Claude Code + Codex）](https://github.com/farion1231/cc-switch/pull/7313)** —— 新增厂商预设（Claude Code 使用原生 Anthropic 端点；Codex 通过本地路由走 Chat Completions）；已上架 5 个模型 ID。
- **[PR #7296 — Laonong API 多应用预设](https://github.com/farion1231/cc-switch/pull/7296)** —— 通用中转/网关预设加入目录。
- **[PR #7330 — 智谱 OpenAI Responses 模型列表兼容](https://github.com/farion1231/cc-switch/pull/7330)** —— 为三种智谱 API 形态补齐模型列表端点，使 Responses 模式的提供商能够使用 `/v1/models`。
- **[Issue #5258 — DaoXE 通用预设请求](https://github.com/farion1231/cc-switch/issues/5258)** —— Anthropic Messages 兼容提供商仍在排期。
- 本窗口内无新增硬件后端（CUDA / ROCm / Metal / CPU）或量化格式。

## 4. 性能与优化

- **[PR #7104 — 规范化 `image_url.detail` 为 original→high](https://github.com/farion1231/cc-switch/pull/7104)** —— 避免严格上游在 Codex Responses 发送 Responses 专用值 `detail:"original"` 时返回 400；吞吐量无明显损耗，但消除了一整类图片相关请求的失败。
- **[PR #7307 — npm dist-tag 探测超时](https://github.com/farion1231/cc-switch/pull/7307)** —— 为版本检查请求设置上限，此前在 *About → Local Environment Check* 中约 7 张工具卡片里有 6 张会卡住。本地探测（约 0.6s）正常，远程那一段则没有超时。
- **[PR #7327 — 滚动时保留文本选中](https://github.com/farion1231/cc-switch/pull/7327)** —— 虚拟化会话列表不再卸载渲染范围之外的选中 DOM 节点；修复长会话下「选中区域莫名缩小」的体验回退。

## 5. 稳定性与回归问题

**高危**
- **[Issue #7190 — DeepSeek 400 "No tool output found for tool call"](https://github.com/farion1231/cc-switch/issues/7190)** —— Codex 图片工具调用（`view_image`）触发上游 HTTP 400；怀疑是 `image_resize_notice` 的工具调用顺序问题。影响 v3.20.1+，尚未合并修复 PR。
- **[Issue #7308 — DeepSeek-V4.1-flash 被标记为非多模态](https://github.com/farion1231/cc-switch/issues/7308)** —— Codex 在具备视觉能力的模型上拒绝图像；疑似预设中的能力标志位不匹配。
- **[Issue #5687 — 3.18.0 Codex 同步在 post-idle fork 后永久延迟已完成的父任务](https://github.com/farion1231/cc-switch/issues/5687)** —— 会话导入可能无限挂起。**[PR #7297](https://github.com/farion1231/cc-switch/pull/7297)** 解决了该问题（父文件时间戳校验 + 回归测试）。
- **[Issue #7029 — macOS 代理工具退出后所有 usage / 连通性检查失败，直至应用重启](https://github.com/farion1231/cc-switch/issues/7029)** —— Clash / v2rayN 退出后 `error sending request` 在 reqwest 连接间持续出现。可能与 PR #7292 的系统代理断开控制相关。

**中危**
- **[Issue #3575（已关闭）— Codex + DeepSeek "local proxy failed … failed to deserialize"](https://github.com/farion1231/cc-switch/issues/3575)** —— 已关闭；根因为 v3.20.3 完成的 Chat → Responses 迁移。
- **[Issue #6261（已关闭）— 每次编辑提供商后 `/v1` 被重复追加](https://github.com/farion1231/cc-switch/issues/6261)** —— 保存逻辑会剥离用户写的 `/v1` 并重新前缀 `chat/completion`；已在 **[PR #5276 血脉](https://github.com/farion1231/cc-switch/issues/5276)** 中针对百炼 Responses 修复。
- **[Issue #7235 — Windows 下 `config.toml` 被 CC Switch 覆盖](https://github.com/farion1231/cc-switch/issues/7235)** —— CC Switch 重新同步 Codex 时，插件/UI 设置丢失；**[Issue #6600](https://github.com/farion1231/cc-switch/issues/6600)** 记录了主题/字体保留的同类问题。
- **[Issue #2898（已关闭）— `openai_chat` 自动模式分类器耗尽 `max_tokens`](https://github.com/farion1231/cc-switch/issues/2898)** —— 已关闭；thinking 块转换路径已修正。
- **[Issue #5312 — skill 重新导入后模型名映射被静默丢弃 → 400](https://github.com/farion1231/cc-switch/issues/5312)** —— 重新导入流程会覆盖映射表；OpenCode 上游在重启前会返回 400。
- **[Issue #7029](#)** 与 **[Issue #5278 — Codex Windows 自检假阴性](https://github.com/farion1231/cc-switch/issues/5278)** —— 连通性探测假阴性，应用本身却能正常工作。
- **[PR #7302 — macOS Tahoe 空白窗口修复](https://github.com/farion1231/cc-switch/pull/7302)** —— 为 macOS 26 增加 WKWebView 沙盒权限（CVE 级收紧）。

**低危 / UX**
- **[PR #4298 — KDE 托盘还原：按钮无法点击 + 窗口每次打开都变大](https://github.com/farion1231/cc-switch/pull/4298)** —— `titleBarStyle: Overlay` 在 Linux/KDE 的 GTK CSD 下行为异常。
- **[Issue #4457 — Gemini 函数调用错误](https://github.com/farion1231/cc-switch/issues/4457)**、**[Issue #5257 — 空 thinking 块破坏 Claude Code TUI](https://github.com/farion1231/cc-switch/issues/5257)**、**[Issue #5279 — Windows 上 DB 崩溃循环](https://github.com/farion1231/cc-switch/issues/5279)**。

## 6. 对应用开发者的意义

- **现在就完成 Codex 预设的迁移。** 此前通过 Chat Completions 接入 Codex 的任何中国开源提供商，都应重新添加或切换到 `Responses`，以免再为本地格式转换付出代价（顺便获得 v3.20.x 关于 `/v1` 剥离和 JSON 反序列化的正确性修复）。
- **规划 `model_mapper` → `model_router` 的重命名**，如果你有脚本读写 CC Switch 的数据库，或基于其代理构建。新的路由器对每个客户端（Claude / Codex / Gemini）采用规则化映射，比旧的按提供商映射更加深入。
- **不必再和系统代理斗智斗勇了。** v3.20.x 让每个提供商都能绑定独立的出站代理，全局开关（PR #7292）则可避免 CC Switch 在 VPN / 客户端退出后继承残留的 `HTTP_PROXY`。如果你之前遇到过间歇性的 `error sending request` 报错，这正是针对性修复。
- **PII 处理将可来回还原。** 可逆占位符流水线（PR #7306）意味着模型现在看到的是类型化占位符而非 `*`，对那些因会破坏推理质量而回避该特性的场景尤其有用。
- **MCP 同步正在扩展。** **[Issue #7220](https://github.com/farion1231/cc-switch/issues/7220)** 请求将 Pi（`pi-coding-agent`）作为新的 MCP 同步目标；现有目标包括 Claude Code / Codex / Gemini / OpenCode / GrokBuild / Hermes。
- **关注 DeepSeek / Codex 图片回归（#7190）**，不要在 v3.20.1–v3.20.3 上承载图片密集的工作流；鉴于该讨论活跃，预计很快会发版修复。
- **Linux KDE 用户** 待 PR #4298 合并后即可拉取；macOS 26 Tahoe 用户应拉取 PR #7302 修复空白窗口类崩溃。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 每日摘要 — 2026-09-12

[`QuantumNous/new-api`](https://github.com/QuantumNous/new-api) 的每日快照,统一的 LLM 网关与计费平台。

---

## 1. 今日要点

头条是 **v1.0.0-rc.37**,带来一次重大的**计费配置重构** —— 新的计费表达式编辑器取代了旧的定价模型(后者已标记为弃用),支持条件定价、按调用计费、基于时间的条件,以及图像用量和图像缓存计量。同日,两个值得关注的能力 PR 落地:**Gemini / Vertex AI 智能体视频理解** ([#7337](https://github.com/QuantumNous/new-api/pull/7337)) 以及 **vLLM 作为一等公民渠道类型** ([#7332](https://github.com/QuantumNous/new-api/pull/7332))。两个与生产相关的稳定性修复也已合并或就绪:**cgroup 感知的容器内存监控** ([#7335](https://github.com/QuantumNous/new-api/pull/7335)) 以及 **`InitChannelCache` 中的 nil-map panic 防护** ([#7323](https://github.com/QuantumNous/new-api/pull/7323))。

---

## 2. 发布与破坏性变更

- **[v1.0.0-rc.37](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.37)** — *计费配置、任务插件与 Passkey*
  - **旧计费模式已弃用。** 单向迁移工具会将当前价格转换为计费表达式*草稿*;管理员可在保存前预览实际生效价格。
  - 新表达式编辑器支持**条件定价、按调用计费、基于时间的条件、图像用量与图像缓存计量**。
  - 为 **`gpt-image-2`**、**`gpt-image-2.5-sunburst`**、**`gpt-image-2.5-flare`** 提供内置默认计费表达式 —— 管理员已存在的覆盖项仍然优先生效。
  - **任务插件**:支持流式输出;定价配置可为每个插件挂载用量价格与计费表达式;插件详情页新增变更日志,并附英文回退。
  - 正式上线 **Passkey** 身份认证。
  - *迁移提醒:* 运维人员应在切换到新模式前,用线上流量对计费表达式进行验证;旧模式在 rc.37 中仍可用,但将在后续版本中移除。

- **随 rc.37 同期合并的修复:**
  - [PR #7013](https://github.com/QuantumNous/new-api/pull/7013) — Aliyun 适配器现在将 `/v1responses` 路由到正确的兼容模式端点(此前直连 MaaS 主机时返回 `InternalError: No gRPC response received`)。
  - [PR #6948](https://github.com/QuantumNous/new-api/pull/6948) — 修复 `/api/channel` GET/POST 的尾斜杠问题(此前管理员渠道列表/创建接口 404)。

---

## 3. 新模型与硬件支持

- **Gemini API + Vertex AI 智能体视频理解** — [PR #7337](https://github.com/QuantumNous/new-api/pull/7337)(关闭 [#7336](https://github.com/QuantumNous/new-api/issues/7336))。端到端传递媒体与工具调用追踪字段,并对 Vertex 原生智能体请求进行正确路由。对齐 Google 的[视频理解文档](https://ai.google.dev/gemini-api/docs/video-understanding)与 [Vertex AI 文档](https://docs.cloud.google.com/vertex-ai/generative-ai/docs/video-understanding)。
- **vLLM 渠道类型** — [PR #7332](https://github.com/QuantumNous/new-api/pull/7332)。为 vLLM 服务的模型提供新的渠道适配器,使自托管推理引擎可复用与托管提供商相同的网关、计费与路由栈。
- **内置计费默认值的图像模型覆盖** — `gpt-image-2`、`gpt-image-2.5-sunburst`、`gpt-image-2.5-flare` 在 rc.37 中携带默认计费表达式发布。

---

## 4. 性能与优化

- **容器内存监控的正确性** — [PR #7335](https://github.com/QuantumNous/new-api/pull/7335)(关闭 [#6744](https://github.com/QuantumNous/new-api/issues/6744))。`system_monitor` 现在从 **cgroup 限额**而非宿主机 `/proc/meminfo` 读取内存,使 `monitor_memory_threshold` 在 Docker/Kubernetes 中真正生效。具体效果:与内存压力相关的告警将能够在容器内触发;此前该阈值几乎永远无法达到。
- **渠道健康探测 —— 按 `(channel, model)` 去重** — [PR #7328](https://github.com/QuantumNous/new-api/pull/7328)。新增 `/status` 与 `/api/status-check`;探测按每个 `(channel, model)` 对执行一次,结果广播给所有引用该对的分组。对于存在大量重叠 group→model 映射的网关,可成倍降低探测流量。
- **`/v1/responses` 的 WebSocket 中继** — [PR #5062](https://github.com/QuantumNous/new-api/pull/5062)(仍开放,长期进行中)。新增 WS `response.create` 事件处理,包含网关侧的模型校验、渠道选择、上游 WS 转发、用量计量以及失败退款。相比 HTTP 轮询,将显著降低长生命周期 Responses 流的尾部延迟。
- **依赖治理** — [PR #7327](https://github.com/QuantumNous/new-api/pull/7327) 将 `/electron` 中的 `js-yaml` 从 4.3.1 升级到 4.3.2。

---

## 5. 稳定性与回归

按严重程度排序(从高到低):

| 严重程度 | Issue | 摘要 | 是否修复 |
|---|---|---|---|
| 🔴 高 | [#7331](https://github.com/QuantumNous/new-api/issues/7331) | 当已启用渠道的分组缺少 `abilities` 行时,`InitChannelCache` 因 `assignment to entry in nil map` 发生 panic。在 `main` 与 rc.30 上可复现。 | ✅ [#7323](https://github.com/QuantumNous/new-api/pull/7323) open |
| 🔴 高 | [#6744](https://github.com/QuantumNous/new-api/issues/6744) | `monitor_memory_threshold` 在容器中永远不会触发 —— `system_monitor` 读取的是宿主机 `/proc/meminfo`,而非 cgroup。 | ✅ [#7335](https://github.com/QuantumNous/new-api/pull/7335) open |
| 🟠 中 | [#7201](https://github.com/QuantumNous/new-api/issues/7201) — **closed** | 自 v1.0.0-rc.31 起,`qwen3.7-max` / `qwen3.8-max` 被截断为 `qwen3.7` / `qwen3.8`,导致较新的 Qwen 模型名路由失效。 | 已关闭(今日动态中未关联 PR) |
| 🟠 中 | [#7319](https://github.com/QuantumNous/new-api/issues/7319) | `audio` 模态未做大小写不敏感匹配 —— 大写形式在 rc.26 上静默绕过能力检查。 | 今日无修复 PR |
| 🟡 低 | [#7309](https://github.com/QuantumNous/new-api/issues/7309) | “模型广场 → 性能”页面泄漏查看者不应看到的分组。属于信息泄露类 Bug。 | 今日无修复 PR |
| 🟡 低 | [#6972](https://github.com/QuantumNous/new-api/issues/6972) | 部分部署中,活跃会话达到上限后没有自我撤销的出口,带来 UX/支持层面的摩擦。 | 今日无修复 PR |
| ⚪ 无效 | [#6708](https://github.com/QuantumNous/new-api/issues/6708) — closed | `/v1/responses` 非透传模式下的 `model_mapping` —— 已关闭,标记为无效。 | n/a |
| ⚪ 无效 | [#7329](https://github.com/QuantumNous/new-api/issues/7329) — closed | 申请官方支持 OpenCode Zen 提供商的功能请求。 | 已关闭(无进行中的 PR) |
| ⚪ 无效 | [#7330](https://github.com/QuantumNous/new-api/issues/7330) — closed | 离题的厂商商务合作咨询。 | 已关闭 |

**已落地的稳定性修复**(今日合并):[#7013](https://github.com/QuantumNous/new-api/pull/7013)(Aliyun Responses 路由)与 [#6948](https://github.com/QuantumNous/new-api/pull/6948)(渠道列表 API 尾斜杠)。[#7328](https://github.com/QuantumNous/new-api/pull/7328) 的落地页、渠道健康检查与网关加固也已关闭。

---

## 6. 对应用开发者的意义

- **规划计费模型迁移窗口。** 如果你仍在 rc.25 或更早版本上运行 New API,rc.37 引入了并行的计费表达式系统,但旧模式已标记为移除。请使用产品内的“转换为草稿”路径,对照当前账单对预览结果进行核对后再保存 —— 不要等到旧路径被切断。
- **自托管推理变得更加容易。** 新的 **vLLM 渠道**([#7332](https://github.com/QuantumNous/new-api/pull/7332))让你的自建 vLLM 部署可以复用 New API 的路由、重试与计量能力 —— 适合在统一计费面之下混合商用提供商与本地模型的混合架构。
- **Gemini/Vertex 上的视频理解智能体已解锁。** [PR #7337](https://github.com/QuantumNous/new-api/pull/7337) 提供了智能体视频理解的请求/响应管道,包含工具调用追踪。后续可将其接入需要帧级推理的智能体循环。
- **容器部署:内存告警开始真正触发了。** [#7335](https://github.com/QuantumNous/new-api/pull/7335) 合入后,任何依赖 `monitor_memory_threshold` 的运维人员都应重新调整阈值 —— 此前的数值实际上是失效的,因为监控读取的是宿主机内存,而宿主机内存几乎总是大于 cgroup 限制。
- **警惕 Qwen 模型名回归。** [#7201](https://github.com/QuantumNous/new-api/issues/7201) 显示 `qwen3.7-max`/`qwen3.8-max` 在 rc.31+ 上会被截断为 `qwen3.7`/`qwen3.8`。如果你的代码锁定了这些模型 ID,升级后请对路由进行端到端验证。
- **依赖 Aliyun 的 `/v1/responses` 时请固定到 rc.37+。** 兼容模式路由 Bug([#7013](https://github.com/QuantumNous/new-api/pull/7013))会导致静默的 `InternalError` 失败 —— 请升级到包含此修复的版本。
- **长生命周期流式接口正在到来。** PR [#5062](https://github.com/QuantumNous/new-api/pull/5062) 为 Responses API 引入 WebSocket 中继;如果你正在构建长生命周期的智能体会话,未来可以借此替代 HTTP 轮询的临时方案 —— 建议持续跟踪该 PR 的合入动态。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*