# AI 基础设施日报 2026-09-13

> 生成时间: 2026-09-13 11:31 UTC | 覆盖项目: 9 个

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

# 跨项目 AI 基础设施报告 — 2026-09-13

## 1. 生态系统概览

今日活动的绝对主线，是全行业争相将 **DeepSeek-V4.1(-Flash)** 推向生产的竞赛 —— vLLM 提交了一组共 7 个 PR 的集群，覆盖 SP/PP 通信、Engram overlap 与 microbatching；SGLang 正在落地由 Mooncake 支撑的 Engram host backend；llama.cpp 的 GGUF 转换也在推进中 —— 但没有哪个项目能把它做干净：两大引擎的技术栈上都挂着 sev-1/sev-2 级缺陷。第二条战线是**替代芯片**：vLLM 一边扩充 ROCm CI（新增约 45 个 job），一边发布 MI355X 性能 RFC；SGLang 则在 AMD gfx950 上以 FP8/MXFP4 交付 GLM-5.3-Flash。再往上层看，**OpenAI Responses/Codex 接口已成为事实上的契约**，在 Ollama、LiteLLM、CC Switch 和 New API 之间拖出一长串 bug 尾巴。最刺眼的横切信号是**静默失败**：返回 HTTP 200 却输出损坏或为空（vLLM/Intel Arc、Ollama IQ3_S）、无任何告警的约 0% 投机接受率（SGLang）、以及 $0 成本遥测（Claude Code Router、LiteLLM budgets）。发布纪律则天差地别 —— llama.cpp 在 24 小时内连发 10 个 tagged build，其余项目要么零发布、要么在 RC 之间打转。

## 2. 活动量对比

*计数 = 各项目 digest 中引用的 issue/PR 数量（活跃度代理指标，并非 GitHub 官方统计）。*

| 项目 | 层级 | Issues | PRs | 发布状态 |
|---|---|---|---|---|
| **vLLM** | 推理服务引擎 | ~22（18 个未关闭、4 个已关闭） | ~14 | 窗口期内无发布 |
| **SGLang** | 推理服务引擎 | ~18（其中 9 个为新增高严重级） | ~14 | 无；最新 tag 为 v0.5.15 |
| **llama.cpp** | 本地运行时 / 内核 | ~24（24 小时内关闭 8 个） | ~22 | **10 个 build**（b10930–b10941） |
| **Ollama** | 本地运行时 / 分发 | 17 | 11 | 无；当前为 0.34.0 |
| **LiteLLM** | LLM 网关 | ~27 | ~20 | **v1.102.0-rc.1**（镜像带 cosign 签名） |
| **Unsloth** | 微调 | ~9 | ~16 | 无；docker 2026.9.4 |
| **Claude Code Router** | Agent 路由 | 3 | 1（已撤回） | 无；3.0.22 |
| **CC Switch** | Agent 路由 / 切换器 | ~15 | ~16 | 无 |
| **New API** | 网关 / 中继 | ~10 | ~17 | 无；内部版本 v1.0.0-rc.37 |

**要点：** llama.cpp 在数量与节奏上领跑；LiteLLM 是最活跃的网关；vLLM/SGLang 在单一模型家族上投入了深度工程但尚未发布；agent 路由层（CCR、CC Switch）体量虽小，修的却是对所有 agent 开发者都至关重要的契约级 bug。

## 3. 模型支持竞赛

| 模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | Unsloth |
|---|---|---|---|---|---|
| **DeepSeek-V4.1 / V4.1-Flash** | 最深入：SP/PP/Engram/mHC/microbatch PR 集群；**但** H20 CUDA 崩溃（#56389）、GB10 受阻（#56461） | Engram + Mooncake host backend（#39205）；CUDA-graph capture 失败（#39173）、tokenizer 400（#39274） | 转换进行中（#28696） | — | 已有人请求 GGUF，维护者尚无回应（#10838） |
| **GLM-5.3-Flash** | 退化 bug 未关闭（#56605） | **赢家**：AMD gfx950 FP8+MXFP4、graph 模式 EAGLE（#39273） | — | — | — |
| **Qwen3.5/3.6/3.8/Coder** | 性能相关上下文（hybrid GDN + DFlash） | AMD 上的 GLM-5.2 NextN FP8（#39155） | qwen3-coder 的 JSON-schema 修复 | tool-parser bug 簇；2 个当日修复 PR | 在 B200 上训练 Qwen3.5-9B（性能参考） |
| **Gemma4** | B200/B300 上的 CUDA-graph 确定性 bug（#55238） | — | SWA/assistant-init bug | Vision 统一仍未关闭（#16879）；Jetson OOM | — |
| **小众模型** | Humming 量化 SM120/121 | SenseNova-U1 跟进中 | ELMOD 2.7b、DFM Mimir 1B、RPC-over-iWARP | GSQ-RCO 量化缺口（#18297） | MiniCPM5 被 allowlist 缺口卡住（#10853） |

**结论：** vLLM 在 **DSV4.1 集成深度**上领先，SGLang 在 **AMD + GLM 生成与量化广度**上领先，llama.cpp 在**格式/后端覆盖**上领先。目前没有人能把 DSV4.1 干干净净地送上生产 —— 现在还是圈地阶段：最快拿出正确实现的玩家，将赢下这波部署浪潮。

## 4. 性能前沿

- **KV 缓存 / 内存层级**（SGLang 的重心所在）：统一内存容量核算（#39294）、HiCache→TensorCast 后端（#27265）、用于虚拟/物理索引转换的 page-envelope PD 传输（#36730）；vLLM 则以 MoE expert offloading 应对（CPU-pinned + LFRU + 跨层预测，#38256）。
- **批处理 / overlap**（vLLM 的重心所在）：按负载门控的 Engram lookup overlap（#56436）、mHC 统计 overlap（#56611）、microbatch 位置正确性（#56440）；SGLang 修复了非流式 TTFT batching（#39270），并将 SWA page-lookup 算子融合进 Triton（#38948）。
- **量化**：MI355X 上的 MXFP4（vLLM RFC #56506；SGLang GLM serving），以及 **NVFP4 在 Unsloth 中升级为一等公民**（#10730/#10731）—— 在 Blackwell/MI355X 上，FP4 已经成为“部署默认格式”讨论的主角。
- **分布式服务**：vLLM 的 SP all-to-all embedding 重分布（#56435）、Gloo/NCCL 混合的 PP cache relay（#56439）、batch invariance 工作（#27433）；llama.cpp 新增 RDMA/iWARP RPC 能力。
- **内核**：llama.cpp 的分块 VNNI `mul_mat`（**CPU 提速 3–7×**，#27851）与融合 Q4_K Gate/Up+SwiGLU prefill（#28702）；vLLM 的 MI355X RFC 做了逐 kernel 的差距分析（MoE routing、indexer、SWA attention）。
- **主机侧开销 —— 新瓶颈**：Unsloth 在 B200 上 0.85→0.66 s/step（**约 22%**）的提升大部分来自 *CPU 侧*（fla autotune 的 key 反复重建）；LiteLLM 正在用 **Rust 重写网关，目标开销低于 1ms**（#31263）。GPU 内核吃满之后，尾延迟就转移到主机和代理层了。

## 5. 各层定位

- **分布式推理引擎 —— vLLM、SGLang**：多 GPU TP/PP/EP/SP、PD 分离、投机解码运行时。二者分别押注 DSV4.1 执行效率与内存层级的精细度。
- **本地运行时 —— llama.cpp（内核/GGUF）、Ollama（分发/UX）**：llama.cpp 是底座 —— Ollama 打包它、Unsloth 发布它的产物 —— 因此它的内核红利与性能回退（MTP prefill 慢 57×，#28790）都会自动传导到下游。
- **网关 —— LiteLLM（企业级）、New API（中继/计费）**：协议转换、支出管控、路由。两者都深陷 RC 循环，正确性债务集中在 Responses↔Chat 转换与计费准确性上。
- **Agent 路由 —— Claude Code Router、CC Switch**：层薄却契约攸关；今天的工作全部围绕 Codex `state_5.sqlite` 会话固定、SSE 清洗，以及 provider 预设扩展（DSH、Command Code、Zhipu）。
- **微调 —— Unsloth**：消费整个生态（将 vLLM 锁定在 0.29，#10858），补齐 NVFP4 从训练到 serving 的路径，并且是独家专注单 GPU/B200 效率的玩家。

bug 沿着这层技术栈**向上**流动：llama.cpp 的回退会在 Ollama 里冒头；vLLM 的 pin 变动会打断 Unsloth 的 CI；网关的翻译 bug 则坑害其上的每一个 agent。

## 6. 趋势信号

1. **投机解码已成主流，但很脆弱。** 接受率断崖随处可见：量化后的 DFlash2 draft 静默跌至约 0% 接受率（SGLang #39087）；在 hybrid GDN 上超过约 185k 上下文后 DFlash 反而是净*负收益*（71→16 tok/s，vLLM #54691）；MSVC+CUDA 12.8 下 MTP prefill 慢 57×（llama.cpp #28790）。**关注：** 按长度门控、感知量化的自适应投机解码 —— 切勿无条件开启。
2. **混合/循环状态正在打破 KV 缓存假设。** Mamba/SWA/Engram 状态与为纯注意力设计的 save/restore、前缀缓存和 PD 传输语义不兼容（三个运行时都有未关闭的 bug）。**关注：** 状态感知的缓存接口将成为差异化竞争力。
3. **静默失败是头号生产风险。** HTTP 200 却输出损坏（vLLM #53480）、`done_reason: stop` 但 `content` 为空（Ollama #18297）、别名下计费 $0（CCR #1787）、预算不生效（LiteLLM #35524）。**关注：** 输出健全性检查与成本对账将默认迁移到客户端执行。
4. **Responses/Codex API 是新的兼容性战场。** 九个项目中有四个今天都在处理它（`previous_response_id` 重放、reasoning-item 排序、tool_choice 映射）。**关注：** agent 开发者应把无状态的 Chat Completions 视为安全路径，并对网关版本进行激进锁定。
5. **AMD 这次是真的来了。** vLLM 的 CI 扩张 + MI355X RFC（并发 1 下 8.97 tok/s/GPU，kernel 差距已定位），加上 SGLang 的 gfx950 GLM serving，让 ROCm 成为可信的第二供应源。**关注：** 未来几个周期内 vLLM 的 MI355X kernel 缺口会陆续收口。
6. **FP4（MXFP4/NVFP4）正在成为规范**，从 serving（MI355X、gfx950）一路延伸到微调管线。请在 2026 年的容量规划中为 FP4 预留预算。
7. **供应链与发布纪律正在分化。** LiteLLM 的 cosign 签名开了行业先河；llama.cpp 一天 10 个 build 的节奏，反衬出其他项目 GA 门槛的模糊（New API #7279、Ollama “接近稳定” 的 0.34.0）。**关注：** 签名镜像与明确的 GA 标准将成为企业采纳的标配。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-13

## 今日要点

DeepSeek-V4.1 技术栈是今日焦点：六个相关 PR（#56435–#56440、#56611）推进了 SP/PP 通信、Engram 查找重叠与微批处理，并搭配一份在 ROCm MI355X 上展现显著优化空间的性能 RFC（[#56506](https://github.com/vllm-project/vllm/issues/56506)）。一批推测解码（DFlash）回归问题波及长上下文混合 GDN 模型与结构化输出文法（[#54691](https://github.com/vllm-project/vllm/issues/54691)、[#53777](https://github.com/vllm-project/vllm/issues/53777)、[#54094](https://github.com/vllm-project/vllm/issues/54094)）。跨领域工作持续推进批量不变性、零 JIT 预热，以及一项长期诉求——为 DeepSeek-V4-Flash 提供 SM8x/Ampere 覆盖（[#50576](https://github.com/vllm-project/vllm/issues/50576)）。

## 发布与破坏性变更

过去 24 小时内无新发布。未移除任何 API 或配置标志。

## 新增模型与硬件支持

- **Humming 量化 SM120/SM121 支持** — 通过 `VLLM_HUMMING_ONLINE_QUANT_CONFIG` 新增 GPU 目标，可选 Hadamard 变换（[#56685](https://github.com/vllm-project/vllm/pull/56685)）。
- **FlashInfer 多模态前缀注意力** — `supports_mm_prefix()` 现探测合并后的 FlashInfer `variant_owns_mask` 标志，避免 PrefixLM/mm-prefix 批次的后端切换（[#46558](https://github.com/vllm-project/vllm/pull/46558)）。
- **DeepSeek-V4-Flash-Vision-Exp 的 LoRA 支持**（[#55897](https://github.com/vllm-project/vllm/pull/55897)，修复 [#55683](https://github.com/vllm-project/vllm/issues/55683)）。
- **Speculators DFlash 注意力因果性保留** — 加载 Speculators 格式的 DFlash checkpoint 时，全注意力层不再被切换为因果注意力（[#56692](https://github.com/vllm-project/vllm/pull/56692)）。
- **ROCm CI 覆盖范围扩大** — Stage H 新增约 30 个 AMD 镜像与 15 个独立任务，覆盖 `mi250_1`、`mi300x`、`mi355x` 目标（[#56679](https://github.com/vllm-project/vllm/pull/56679)）。

## 性能与优化

**DeepSeek-V4.1 系列（来自 `0z5a` / `gcanlin` 的 PR 集群）：**
- **通过 all-to-all 进行 SP embedding 重分发** — Engram head 分片直接暂存到 SP 通信缓冲区，避免额外的尾行传递（[#56435](https://github.com/vllm-project/vllm/pull/56435)）。
- **PP 阶段 cache/index 中继** — 调度器 CPU block 表传入注意力元数据；cache ID 在 CPU 端校验；Gloo/NCCP 混合传输；CPU 发送缓冲区保留至完成（[#56439](https://github.com/vllm-project/vllm/pull/56439)）。
- **层构建前的依赖校验** — 无效的 PP 切分会被拒绝并附带源/消费者详情；投影 cache 组仅在本地层分配（[#56437](https://github.com/vllm-project/vllm/pull/56437)）。
- **Engram 查找重叠按 workload 门控** — 默认**关闭**，仅在显式 workload 限制内可启用；对不符合条件的批次保持正确性（[#56436](https://github.com/vllm-project/vllm/pull/56436)）。
- **mHC 统计与 attention/FFN 重叠** — 通过 `VLLM_DSV41_MHC_OVERLAP=1` 启用（SM100、TP8/EP/SP、≤256 tokens；不支持 DBO/speculation/LoRA）（[#56611](https://github.com/vllm-project/vllm/pull/56611)）。
- **微批位置 / Engram 历史正确性** — 修复跨微批边界时请求的 position（[#56440](https://github.com/vllm-project/vllm/pull/56440)）。

**RFC / 进行中的工作：**
- **DeepSeek-V4.1-Flash on AMD MI355X（8x，TP4，MXFP4 + DSpark MTP）** — 在并发度 1 下测得 35.89 out tok/s（每 GPU 8.97），TTFT p50 为 0.898 s；定位到 MoE 路由、indexer 和 SWA 注意力各 kernel 的差距（[#56506](https://github.com/vllm-project/vllm/issues/56506)）。
- **增量式 MoE 专家卸载** — 专家权重驻留于 CPU pinned memory，搭配固定 GPU cache + LFRU + 跨层预测（PR 1 见 [#37190](https://github.com/vllm-project/vllm/pull/37190)）（[#38256](https://github.com/vllm-project/vllm/issues/38256)）。
- **批量不变性（Batch Invariant）** — 跟踪 Thinking Machines 风格确定性工作的 issue；93 条评论，仍未关闭（[#27433](https://github.com/vllm-project/vllm/issues/27433)）。
- **零 JIT 运行时编译** — DeepSeek V4 去 JIT 化进行中；在共享预热基础设施下追踪（[#49349](https://github.com/vllm-project/vllm/issues/49349)、[#50587](https://github.com/vllm-project/vllm/issues/50587)）。

## 稳定性与回归

**严重 / sev-1：**
- **DeepSeek-V4.1-Flash 在 H20 上发生 CUDA 非法内存访问** — `dsv4_topk` Triton MoE 路由 kernel 在高并发下崩溃；**通过 `max_num_seqs=256` 缓解**（[#56389](https://github.com/vllm-project/vllm/issues/56389)）。暂无修复 PR。
- **Intel Arc Pro B70（W4A16 27B）上静默且持续的输出损坏** — 持续并发解码退化为无尽的 `!`/token 0；HTTP 200，`finish_reason: "stop"` — 调用方无法察觉（[#53480](https://github.com/vllm-project/vllm/issues/53480)）。暂无修复 PR。

**高 / sev-2：**
- **DeepSeek-V4.1-Flash 无法在 SM120/SM121（GB10）上提供服务** — SWA cache block size 为 32 而 SM120 解码页为 64；indexer `block_kv=128` 而 DeepGEMM sm120 仅支持 64（[#56461](https://github.com/vllm-project/vllm/issues/56461)）。
- **DFlash2 + YaRN：1.04M 提示词的零前缀缓存复用** — 仅 target 侧复用约 1.039M tokens（[#54094](https://github.com/vllm-project/vllm/issues/54094)）。
- **DFlash2 + xgrammar `json_object` FSM 卡在同一个 draft token** — 确定性的 "Failed to advance FSM"（[#53777](https://github.com/vllm-project/vllm/issues/53777)）。
- **DFlash 在混合 GDN 模型约 185k 上下文处净亏损** — 单流解码从约 71 tok/s（speculation OFF）降至约 16 tok/s（DT=4）；短上下文仍有收益（DT=8 时 218 tok/s）。尚无按序列长度禁用的钩子（[#54691](https://github.com/vllm-project/vllm/issues/54691)）。
- **`VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp` 时批量不变性被破坏** — 序列并行 / 异步 TP 路径不再逐 bit 相同（[#56370](https://github.com/vllm-project/vllm/issues/56370)）。已在 Blackwell sm_120 上复现。
- **CUDA-graph 回放仅在 B200/B300 上改变 gemma-4-26B-A4B-it 的贪心输出** — 在 H200、RTX PRO 6000、A100 上表现正常（[#55238](https://github.com/vllm-project/vllm/issues/55238)）。

**中等 / sev-3：**
- **GLM-5.3-Flash 在多轮 agentic 使用中退化为重复 token 的"杂拌词"**（[#56605](https://github.com/vllm-project/vllm/issues/56605)）。
- **六项 vLLM 并发缺陷** — 已与最新 `main`（`b28c3e15`，2026-09-10）交叉核对；`multiproc_executor.py`/`shm_broadcast.py`/`kv_events.py` 中六个同步缺口仍然存在（[#56251](https://github.com/vllm-project/vllm/issues/56251)）。
- **CUTLASS 3.x `scaled_mm` 在 H800 上忽略切片张量的前导步长**（[#55534](https://github.com/vllm-project/vllm/issues/55534)）。
- **GatedDeltaNet 元数据构建器将无状态首块误判为 decode** — 重分配时读取未初始化的 mamba state page（[#51562](https://github.com/vllm-project/vllm/issues/51562)）。
- **原生权重传输可能让绑定的 `lm_head` 保留旧权重** — TP2/PP2 + 绑定 HF Qwen3-0.6B 的 trainer 可复现（[#56689](https://github.com/vllm-project/vllm/pull/56689)）。已有修复 PR。
- **LoRA 卸载仅更新前端注册表** — engine 仍保留 worker 端 slot 与 CPU cache 条目（[#54939](https://github.com/vllm-project/vllm/pull/54939)）。已有修复 PR。

**近期已关闭（不再是 action item）：**
- 2 节点 TP Mamba 在混合 GDN 模型上配合 `--enable-prefix-caching` 时的跨 worker KV-spec 断言（`mamba_cache_mode`）（[#56646](https://github.com/vllm-project/vllm/issues/56646)）。
- ROCm DSV4-Flash 的 `rocm_dequantize_blocked_k_cache` 会物化整个 KV cache 池（OOM）（[#41962](https://github.com/vllm-project/vllm/issues/41962)）。
- 在 MI350/MI355 上使用 `FULL_DECODE_ONLY` graph 时 DSV4 MRV2 精度下降（[#52644](https://github.com/vllm-project/vllm/issues/52644)）。
- 在 Qwen3-0.6B/A100 上 ngram 推测解码破坏贪心解码（[#41758](https://github.com/vllm-project/vllm/issues/41758)）。

## 对应用开发者的意义

- **DeepSeek-V4.1 on H20 / H100**：在 [#56389](https://github.com/vllm-project/vllm/issues/56389) 解决前，设置为 `max_num_seqs > 256` 的生产部署应固定 `max_num_seqs=256`。GB10 / SM120 当前不可作为可行目标（[#56461](https://github.com/vllm-project/vllm/issues/56461)）。
- **DeepSeek-V4.1 on AMD MI355X**：可用但存在可度量的优化空间；若已锁定 ROCm，请关注 RFC（[#56506](https://github.com/vllm-project/vllm/issues/56506)）以获取调参与后续 kernel 工作进展。
- **DFlash 推测解码**不应在长上下文混合 GDN workload（Qwen3.5 系列）上无脑启用——在约 185k tokens 以上为**净亏损**（[#54691](https://github.com/vllm-project/vllm/issues/54691)）。对于 YaRN 扩展的上下文，前缀缓存复用

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-13

## 今日要点

SGLang 仓库在过去 24 小时内没有新发布版本，但开发势头在三个方向上依然强劲：**DeepSeek-V4.1 集成**（[#39205](https://github.com/sgl-project/sglang/pull/39205) 中为 DSV4.1-Flash 引入的全新 Mooncake Engram 宿主后端，外加 [#39274](https://github.com/sgl-project/sglang/issues/39274) 中图像占位符分词器的新 bug）、**AMD/GLM 适配**（[#39273](https://github.com/sgl-project/sglang/pull/39273) 在 gfx950 上为 GLM-5.3-Flash 提供 FP8 + MXFP4 服务，以及 [#39155](https://github.com/sgl-project/sglang/pull/39155) 在 AMD 上为 GLM-5.2 NextN 草稿提供逐通道 FP8），以及**统一内存 / HiCache 栈的稳定性加固**（[#39294](https://github.com/sgl-project/sglang/pull/39294)、[#38836](https://github.com/sgl-project/sglang/pull/38836)、[#38483](https://github.com/sgl-project/sglang/pull/38483)、[#36730](https://github.com/sgl-project/sglang/pull/36730)）。

## 发布与破坏性变更

过去 24 小时内没有新版本发布。数据中引用的最新版本是 `v0.5.15`（在 GLM-5.2 + EAGLE CUDA-graph-capture 问题 [#31093](https://github.com/sgl-project/sglang/issues/31093) 中提及）；`sgl-deep-gemm 0.2.0rc0` 的版本号升级作为非合并测试 PR 已暂存于 [#39275](https://github.com/sgl-project/sglang/pull/39275)。

## 新模型与硬件支持

- **DeepSeek-V4.1-Flash + Engram（Mooncake 宿主后端，CUDA Graphs）** — [#39205](https://github.com/sgl-project/sglang/pull/39205) 为 `dsv4.1` 分支添加了本地/RDMA 的 Mooncake 后端 Engram 表。
- **GLM-5.3-Flash 在 AMD gfx950（FP8 + MXFP4）上** — [#39273](https://github.com/sgl-project/sglang/pull/39273) 启用了原生零 RoPE 稀疏注意力、FP8 KV 缓存以及图模式 EAGLE 5/1/6。
- **GLM-5.2 NextN on AMD** — [#39155](https://github.com/sgl-project/sglang/pull/39155) 将 MTP 草稿（第 78 层）的融合 MoE 转换为逐通道 FP8。
- **Diffusion SP gather 正确性** — [#39291](https://github.com/sgl-project/sglang/pull/39291) 让 `USPAttention._gather_sharded_sequence` 产出连续的分片（当前依赖 PyTorch 忽略 size-1 维度的步长）。
- **HiSparse 代码归属整理** — [#38682](https://github.com/sgl-project/sglang/pull/38682)（已关闭）接好了 `hisparse_coordinator.py` 与分配器目录的负责人。
- **TensorCast 作为 HiCache 后端** — 长期推进的 [#27265](https://github.com/sgl-project/sglang/pull/27265) 持续合入；模块位于 `python/sglang/srt/mem_cache/storage/tensorcast_store`。
- **仍处打开状态的跟踪 issue**：[SenseNova-U1 / U1.5 功能与性能跟踪 #37742](https://github.com/sgl-project/sglang/issues/37742)、[Intel CPU Roadmap 2026Q2 #24921](https://github.com/sgl-project/sglang/issues/24921)（已关闭/不活跃）、[Ngram speculative decoding roadmap #21052](https://github.com/sgl-project/sglang/issues/21052)。

## 性能与优化

- **TTFT / 投机输出批处理** — [#39270](https://github.com/sgl-project/sglang/pull/39270) 修复了非流式 TTFT 被延迟到 force-stream 间隔（默认 50 个 token）才生效的问题。现在 `TokenizerManager` 中的 `first_token_time` 记录的是真实的第一个输出批次。
- **SWA 页查找 + 映射清理融合** — [#38948](https://github.com/sgl-project/sglang/pull/38948) 将两个独立的 Torch 操作融合为单个 Triton 内核，在保留页面所有权与延迟释放的同时，降低每次 free 的调度器派发开销。
- **统一内存容量核算** — [#39294](https://github.com/sgl-project/sglang/pull/39294) 防止了 `--enable-unified-memory` 下 FULL+SWA 共享字节时出现的误驱逐，并附带使用真实共享池的回归测试。
- **Diffusion CI E2E 指标改为强制项** — [#39206](https://github.com/sgl-project/sglang/pull/39206) 拒绝缺失/无效的 E2E 时长与缺失的性能日志，使 diffusion 性能回归被 CI 阻塞。
- **统一内存 page-envelope PD 传输** — [#36730](https://github.com/sgl-project/sglang/pull/36730) 添加了物理索引翻译契约，因为统一池对外暴露虚拟 token ID，而传输后端看到的是物理缓冲区。

## 稳定性与回归

**高严重度（最新报告，尚未合并修复）：**

- **[Bug] 活跃请求期间的客户端断连会导致整个引擎崩溃** — [#39216](https://github.com/sgl-project/sglang/issues/39216)。未捕获的 `asyncio.CancelledError` 绕过 `except Exception`，复现于运行 `dev-dsv41` + DeepSeek-V4.1 的 4×RTX 6000D（Blackwell，仅 PCIe）。尚无修复 PR。
- **[Bug] DeepSeek-V4.1 图像占位符 token 被以 400 拒绝** — [#39274](https://github.com/sgl-project/sglang/issues/39274)。`encoding_dsv41.py` 对用户文本中字面出现的 `<｜deepseek_image｜>` 直接抛出硬错误。
- **[Bug] DeepSeek-V4.1-Flash + Engram SPS 表在 CUDA-graph capture 中崩溃** — [#39173](https://github.com/sgl-project/sglang/issues/39173)。在紧凑 ragged-verify capture 期间报 "engram target-verify expects one equal block per request"。
- **[Bug] 量化版 DFlash2 草稿静默退化为 ~0% 接受率** — [#39087](https://github.com/sgl-project/sglang/issues/39087)。同一检查点未量化时接受率 ~3.7，量化后骤降至 ~1.0 且无任何错误/警告。被标记为 #36599 的"静默对照版本"。
- **[Bug] HiCacheFile 对混合缓存池报告不可恢复前缀** — [#39147](https://github.com/sgl-project/sglang/issues/39147)。即使辅助池无法恢复该前缀，`batch_exists_v2()` 仍报告命中。
- **[Bug] `/health` 处理器超时将孤立的健康检查请求泄漏到分页 prefill 批处理中** — [#35884](https://github.com/sgl-project/sglang/issues/35884)。调度器侧请求未被取消，最终导致 prefill 崩溃。
- **[Bug] Grammar token 同步在 DP attention 下创建单例 NCCL 组** — [#35826](https://github.com/sgl-project/sglang/issues/35826)。#8400 的后续问题。
- **[Bug] SWA 分支将后到的 Mamba 检查点挂到更早的前缀上** — [#38815](https://github.com/sgl-project/sglang/issues/38815)。被标记为高优先级；影响带 Inkling MAMBA 组件的 Full/SWA/Mamba 联合缓存。
- **[Bug] `include_reasoning=false` 仍会产出 reasoning token** — [#39103](https://github.com/sgl-project/sglang/issues/39103)。影响 `/v1/chat/completions`、`/v1/completions` 和 `/responses`。

**中等严重度（相关修复进行中）：**

- **统一内存 Mamba 延迟缓冲区 & PD 容量备忘失效** — [#38836](https://github.com/sgl-project/sglang/pull/38836) 针对统一 Mamba + Mamba-pool 配置漂移的 PR 侧修复；跟踪如 [#38815](https://github.com/sgl-project/sglang/issues/38815) 等问题。
- **HiCacheFile 平铺目录在规模化时 ENOSPC** — [#28653](https://github.com/sgl-project/sglang/issues/28653)（已关闭/不活跃）报告单目录下数百万个 `.bin` 文件；互补 PR [#38483](https://github.com/sgl-project/sglang/pull/38483) 是用于解决相关拆解泄漏的存储清理锚锁版本。
- **Custom all-reduce V2 在双流下的 one-shot push 死锁** — [#31117](https://github.com/sgl-project/sglang/issues/31117)（已关闭/不活跃）。死锁复现器在同一通信器上使用拆分 SM120 green contexts。
- **统一缓存在 Spark/Thor 长前缀解码上的默认翻转回归** — [#36131](https://github.com/sgl-project/sglang/issues/36131)（已关闭）；由 PR #34653 / 合并 `ebc144ce3f7dfca68d5e705c05051ab8f93ec158` 引入。已解决。

**较低严重度（已关闭/不活跃但近期更新）：**

- Prometheus `avg_request_queue_latency` 未被采集 — [#6357](https://github.com/sgl-project/sglang/issues/6357)（good-first-issue，自 2025-05-16 仍未关闭，仅 1 👍）。
- GLM-5.2 nightly 图像上的 PD `KVTransferError` — [#30609](https://github.com/sgl-project/sglang/issues/30609)。
- `--mm-process-config` 设置 fps 时 Qwen3-VL 视频帧被双重采样 — [#31200](https://github.com/sgl-project/sglang/issues/31200)。

## 对应用开发者的意义

- **非流式调用的 TTFT 即将改善。** 如果你一直在 `sglang:time_to_first_token_s` 上看到非流式请求（尤其是经 SPEC_V2 走 EAGLE/NextN 草稿器）的 50 token "首批次"延迟，[#39270](https://github.com/sgl-project/sglang/pull/39270) 应很快合入——合入后请重新跑基准测试。
- **AMD MI355X 级（gfx950）上的 GLM-5.3-Flash 用户终于有了真正的路径。** [#39273](https://github.com/sgl-project/sglang/pull/39273) 提供 FP8 权重 + MXFP4 量化版本 + 图模式 EAGLE，意味着你不再需要 Nvidia 机器即可在生产延迟下服务 GLM-5.3 这一代模型。
- **DeepSeek-V4.1-Flash + Engram 服务正趋于稳固。** 如果你正在 `dsv4.1` 上试点 Engram（带状态的循环草稿），请关注 [#39205](https://github.com/sgl-project/sglang/pull/39205) 的 Mooncake 宿主后端；在此之前请留意 [#39173](https://github.com/sgl-project/sglang/issues/39173) 的 CUDA-graph capture 失败和 [#39274](https://github.com/sgl-project/sglang/issues/39274) 的分词器 bug。在 `dsv4.1` 分支上，避免在用户文本中嵌入 `<｜deepseek_image｜>` 占位符。
- **当前 main 分支上 `dev-dsv41` 中，客户端断连 = 整引擎崩溃。** [#39216](https://github.com/sgl-project/sglang/issues/39216) 意味着如果你的网关激进地超时连接（移动客户端、代理空闲超时、WebSocket 生命周期），整个 decode Pod 都可能被拖垮。除添加客户端重试外，也请用你自己的超时包裹请求，而不是依赖 socket 关闭。
- **推理抑制功能已损坏。** 设置 `include_reasoning=false` 仍会按 [#39103](https://github.com/sgl-project/sglang/issues/39103) 泄漏 reasoning token 到响应中——在做成本控制时不要依赖它；在修复发布前请在客户端做过滤。
- **规模化场景下的 HiCache 部署。** 有两个相关问题对生产很重要：[#28653](https://github.com/sgl-project/sglang/issues/28653) 中的平铺目录 ENOSPC（对 `SGLANG_HICACHE_FILE_BACKEND_STORAGE_DIR` 做分片，或迁移到 [#27265](https://github.com/sgl-project/sglang/pull/27265) 中那样的分层后端如 TensorCast），以及 [#39147](https://github.com/sgl-project/sglang/issues/39147) 中的不可恢复前缀报告——在使用混合池时可能导致静默低命中。
- **Diffusion 栈 CI 正在收紧。** [#39206](https://github.com/sgl-project/sglang/pull/39206) 合入后，diffusion 性能回归将阻塞 CI——如果你正在使用 SGLang 的 diffusion 服务路径，这是个有用的信号。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-13

## 今日要点

llama.cpp 在过去 24 小时内发布了 10 个构建版本（b10930–b10941），主要变化集中在 **工具链/CI 修复**（FA 测试规模缩减、Vulkan queue-submit 临时方案、clang PCH 时间戳、qwen3-coder 的 JSON schema 重构）以及 **基础设施工作**（Vulkan/WebGPU 自托管 CI、`test-backend-ops` 任务上限、每线程 CUDA memset）。性能方面，两个值得关注的 CPU/CUDA 内核重写正在合入 —— 一个面向 k-quants 的分块 `mul_mat`，通过 VNNI 声称实现 **3–7 倍加速**；另一个是融合的 Q4_K Gate/Up + SwiGLU prefill 内核。多个 server/API 小问题（视觉模型的 KV-cache 保存、slot-state 恢复、MCP stdio 死锁、MTP prefill 回退）仍然活跃。

## 发布与重大变更

| 构建 | 标题 | 备注 |
|---|---|---|
| [b10941](https://github.com/ggml-org/llama.cpp/releases/tag/b10941) | tests: reduce FA test sizes ([#28842](https://github.com/ggml-org/llama.cpp/pull/28842)) | CI 稳定性修复 |
| [b10938](https://github.com/ggml-org/llama.cpp/releases/tag/b10938) | vulkan: workaround NV queuesubmit driver bug ([#28830](https://github.com/ggml-org/llama.cpp/pull/28830)) | 在 `vkQueueSubmit` 周围加互斥锁，直至 NVIDIA 修复内部同步问题 |
| [b10937](https://github.com/ggml-org/llama.cpp/releases/tag/b10937) | opencl: apply noshuffle row-alignment to q4_K/q5_K/q8_0 ([#28575](https://github.com/ggml-org/llama.cpp/pull/28575)) | 与 q6_K 的正确性对齐 |
| [b10936](https://github.com/ggml-org/llama.cpp/releases/tag/b10936) | chat: improve complex-type parsing for qwen3-coder ([#28742](https://github.com/ggml-org/llama.cpp/pull/28742)) | 工具调用 schema 保真度提升 |
| [b10935](https://github.com/ggml-org/llama.cpp/releases/tag/b10935) | common: add `LOG_JSON` macro ([#28586](https://github.com/ggml-org/llama.cpp/pull/28586)) | 用于 ops/遥测的结构化日志 |
| [b10934](https://github.com/ggml-org/llama.cpp/releases/tag/b10934) | common: refactor `common_schema` + JSON-schema-to-grammar ([#28736](https://github.com/ggml-org/llama.cpp/pull/28736)) | 内部清理，无公开 API 破坏 |
| [b10933](https://github.com/ggml-org/llama.cpp/releases/tag/b10933) | jinja: dot-property integer literals ([#28817](https://github.com/ggml-org/llama.cpp/pull/28817)) | 修复 [#28786](https://github.com/ggml-org/llama.cpp/issues/28786) |
| [b10932](https://github.com/ggml-org/llama.cpp/releases/tag/b10932) | cmake: drop timestamp from clang precompiled headers ([#28816](https://github.com/ggml-org/llama.cpp/pull/28816)) | 修复跨 checkout 的缓存 PCH 复用 |
| [b10931](https://github.com/ggml-org/llama.cpp/releases/tag/b10931) | ui: add cache ([#28802](https://github.com/ggml-org/llama.cpp/pull/28802)) | llama-ui 响应性优化 |
| [b10930](https://github.com/ggml-org/llama.cpp/releases/tag/b10930) | server: allow model downloads at model limit ([#28530](https://github.com/ggml-org/llama.cpp/pull/28530)) | 修复 [#26809](https://github.com/ggml-org/llama.cpp/issues/26809) |

无破坏性的 API/CLI 变更；所有更新均为叠加式修复与重构。

## 新模型与硬件支持

- **DeepSeek-V4.1-Flash**（`DeepseekV41ForCausalLM`）—— 转换进行中 ([#28696](https://github.com/ggml-org/llama.cpp/pull/28696))。继承 V4 路径，隔离 `text_config` 嵌套。
- **ELMOD 2.7b**（Fraunhofer IIS，基于 GPTNeoX，自定义分词器）—— 转换 + 新增 Metaspace 风格预分词器标志（`escape_after_split`）([#28818](https://github.com/ggml-org/llama.cpp/pull/28818), [#28845](https://github.com/ggml-org/llama.cpp/pull/28845))。今日关闭未合入。
- **HrmTextForCausalLM**（DFM Mimir 1B）—— 双栈交替 transformer ([#27625](https://github.com/ggml-org/llama.cpp/pull/27625))。
- **ggml::RPC over iWARP** —— GID 探测失败时的 RDMA CM 回退 ([#28494](https://github.com/ggml-org/llama.cpp/pull/28494))。解锁不声明 IP-mapped GID 的 RoCE 风格传输。
- **ANE backend** —— 仍在路线图追踪 ([#10453](https://github.com/ggml-org/llama.cpp/issues/10453))，44 👍。
- **HF Jobs CI 中的自托管 Vulkan + WebGPU** ([#28712](https://github.com/ggml-org/llama.cpp/pull/28712)) —— 在 nightly 测试中扩大后端覆盖。

## 性能与优化

- **面向 k-quants 的 CPU `mul_mat`（分块，VNNI）** —— [PR #27851](https://github.com/ggml-org/llama.cpp/pull/27851) 声称通过滑动 256×256 int8 窗口而非反复解包量化值，实现 **3–7 倍加速**。对纯 CPU 和混合 CPU 卸载部署意义重大。
- **CUDA：融合的 Q4_K Gate/Up + SwiGLU prefill** —— [PR #28702](https://github.com/ggml-org/llama.cpp/pull/28702) 仅量化一次共享输入，消除重复的激活量化与 FP32 来回转换。在稠密非 MoE 模型上应能明显缩短 prefill 时间。
- **ggml-cuda：buffer-init `memset` 的每线程 stream** —— [PR #28782](https://github.com/ggml-org/llama.cpp/pull/28782) 防止与并行 HIP graph 捕获冲突。
- **`ggml` 跨后端：使用 `-1` 跳过计算的 `MUL_MAT_ID`** —— [PR #26631](https://github.com/ggml-org/llama.cpp/pull/26631) 涉及每个后端（Vulkan/SYCL/Metal/CUDA/Ascend/OpenCL/Hexagon/WebGPU/zDNN/ZenDNN）。按作者说明为 100% AI 生成 —— 合入前值得仔细评审。
- **OpenCL 量化行对齐修复** 适用于 q4_K/q5_K/q8_0 ([#28575](https://github.com/ggml-org/llama.cpp/pull/28575)) —— 修正 OpenCL 设备上未对齐的输出。

## 稳定性与回退

**高严重度（活跃）：**

- **[#28790](https://github.com/ggml-org/llama.cpp/issues/28790) — MTP（`--spec-type draft-mtp`）→ 在 Windows MSVC + CUDA 12.8 下 prefill 减慢约 57 倍**（32.7 tok/s 对比 1867 tok/s）。官方预编译版本（Clang + CUDA 13.3）不受影响。可能是值得固定的编译器/运行时版本不匹配。
- **[#28752](https://github.com/ggml-org/llama.cpp/issues/28752) — RDNA3 在 b10780 之后的 Vulkan prompt-processing 回退**（[PR lander](https://github.com/ggml-org/llama.cpp/pull/28752)）。二分定位到 b10780。
- **[#27330](https://github.com/ggml-org/llama.cpp/issues/27330) — CUDA graphs 在 RTX 5090 Laptop / sm_120 上挂起 GPU 通道（RC watchdog + Xid 8）**；临时方案为 `GGML_CUDA_DISABLE_GRAPHS=1`。
- **[#28778](https://github.com/ggml-org/llama.cpp/issues/28778) — SYCL：DFlash2 draft 模型在双 Arc Pro B70 上触发 Windows GPU TDR。**
- **[#28753](https://github.com/ggml-org/llama.cpp/issues/28753) — `ggml_backend_sched_alloc_splits: unexpected graph reallocation` 崩溃**，发生在 Intel Arc（oneAPI/IntelLLVM 2026.1.1）上。
- **[#28723](https://github.com/ggml-org/llama.cpp/issues/28723) — stdio MCP server 在约 1–5 KB 以上的工具调用时永久死锁**（Windows，b10900）。

**中等严重度：**

- **[#19466](https://github.com/ggml-org/llama.cpp/issues/19466) — `/slots/3?action=save` 在视觉模型下失效**（KV cache 恢复）。
- **[#25913](https://github.com/ggml-org/llama.cpp/issues/25913) — `/slots` save/restore 在混合/循环模型上静默丢弃 prompt 复用**（检查点从未持久化）。
- **[#27309](https://github.com/ggml-org/llama.cpp/issues/27309) — Server 在致命 Metal OOM 后仍报 "model loaded" 并绑定端口；所有请求返回 500。**
- **[#25751](https://github.com/ggml-org/llama.cpp/issues/25751) — Gemma 4 上的 SWA 遗忘关键细节**（eval bug）。
- **[#24343](https://github.com/ggml-org/llama.cpp/issues/24343) — Gemma 4 assistant 初始化失败**（`E llama_init_from_model: failed to initialize the context: Gemma4Assistant`）。
- **[#24840](https://github.com/ggml-org/llama.cpp/issues/24840) — `update_slots()` 中 `batch_view` 偏移未传递到 `ctx_dft`**（微妙的 server bug）。
- **[#27097](https://github.com/ggml-org/llama.cpp/issues/27097) — AMD dGPU 在 Resizable BAR 禁用时 Vulkan 慢速 token 生成。**
- **[#27110](https://github.com/ggml-org/llama.cpp/issues/27110) — 多 GPU 上同时使用内部 AllReduce 和 NCCL 时 eval bug 可复现。**

**过去 24 小时内已关闭/解决：**

- [#25808](https://github.com/ggml-org/llama.cpp/issues/25808) SYCL `xe2` 段错误，[#25876](https://github.com/ggml-org/llama.cpp/issues/25876) ggml-hexagon HMX 输出乱码，[#25890](https://github.com/ggml-org/llama.cpp/issues/25890) RPC 串行化加载，[#26282](https://github.com/ggml-org/llama.cpp/issues/26282) embedding 损坏，[#28404](https://github.com/ggml-org/llama.cpp/issues/28404) 同驻副本 CUDA-graph 崩溃，[#28813](https://github.com/ggml-org/llama.cpp/issues/28813) `-np 3` OOM，[#23422](https://github.com/ggml-org/llama.cpp/issues/23422) CLIP 预热 SIGSEGV，[#12917](https://github.com/ggml-org/llama.cpp/issues/12917) `llama-bench --tensor-split`。

**进行中的相关修复 PR：**

- [PR #27530](https://github.com/ggml-org/llama.cpp/pull/27530) —— 恢复失败后的 K/V 与循环状态清理（针对 [#25913](https://github.com/ggml-org/llama.cpp/issues/25913)）。
- [PR #28837](https://github.com/ggml-org/llama.cpp/pull/28837) —— Server：将 `--api-key`/`--api-key-file` 转发到 router 派生的子进程。

## 对应用开发者的影响

- **若依赖 Windows + MSVC + CUDA 12.8 配合推测解码，请谨慎固定构建版本。** 在该组合下 MTP prefill 减慢约 57 倍 ([#28790](https://github.com/ggml-org/llama.cpp/issues/28790))。要么升级到 CUDA 13.3 / Clang 构建的预编译版本，要么在回退定位前禁用 `--spec-type draft-mtp`。
- **CUDA graphs 在 sm_120（RTX 5090 Laptop）和多 GPU Windows 副本上仍然有风险。** 在 [#27330](https://github.com/ggml-org/llama.cpp/issues/27330) / [#28404](https://github.com/ggml-org/llama.cpp/issues/28404) 类问题稳定之前，在生产默认值中保持 `GGML_CUDA_DISABLE_GRAPHS=1`。
- **Slot-state 语义对混合/循环模型并不安全。** 若跨重启持久化 `/slots`（例如长时间运行的 agent 工作流），请关注 [#25913](https://github.com/ggml-org/llama.cpp/issues/25913) 与 PR [#27530](https://github.com/ggml-org/llama.cpp/pull/27530)。对视觉模型而言，`/slots/3?action=save` 仍处于失效状态 ([#19466](https://github.com/ggml-org/llama.cpp/issues/19466))。
- **Vulkan on RDNA3 prompt processing

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-13

## 今日要点

`ollama/ollama` 仓库（0.34.0 时代）今天是一个重度分诊日，**有 17 个更新的 issue 和 11 个 PR，但无新增标记版本**。主导主题是：(1) Qwen3 系列（3.5、3.6、3.8、Coder）中一批**工具解析器正确性缺陷**——其中两个已有可合并的修复（[PR #18422](https://github.com/ollama/ollama/pull/18422)、[PR #17894](https://github.com/ollama/ollama/pull/17894)），以及 (2) 一波围绕推理排序与 `previous_response_id` 重放的 **Codex 兼容 `/api/responses` 缺陷**。仍在开放中的 [PR #16879](https://github.com/ollama/ollama/pull/16879)（统一 Gemma4 视觉支持）是当前主要的架构性变更。

## 版本发布与破坏性变更

过去 24 小时内无新标记版本。代码库仍处于 **0.34.0**。

值得注意的已关闭但未合并的变更：

- [PR #18393](https://github.com/ollama/ollama/pull/18393)（已关闭）：回滚 `ollama` CLI 中内置的 agent，恢复传统的 chat 界面。在有标记版本确认方向之前，视为 UX 回滚。
- [PR #18386](https://github.com/ollama/ollama/pull/18386)（已关闭）→ 由 [PR #18409](https://github.com/ollama/ollama/pull/18409) 取代：Windows 安装包在卸载时将 Ollama 安装路径从用户 `PATH` 中移除。

## 新模型与硬件支持

- [Issue #18287](https://github.com/ollama/ollama/issues/18287)（已关闭）：请求提供 Tencent `Hy4-preview` 的 Ollama 格式 GGUF 资源。
- [Issue #18297](https://github.com/ollama/ollama/issues/18297)：`Qwen3.8-27B-GSQ-RCO-GGUF` 的 `IQ3_S` 量化产出空 `content`，尽管 `done_reason: stop`。**并非模型缺失问题，但在用户接入 GSQ-RCO 衍生模型前值得提示的兼容性缺口。**
- [PR #16879](https://github.com/ollama/ollama/pull/16879)：将 GGUF 元数据扫描移入 `fs/gguf`，允许单 GGUF 的 Gemma4 模型通过 `/api/tags` 自报视觉/音频能力，并允许 Ollama 格式的 Gemma4 GGUF 充当其自身的 `mmproj`。仍处于开放状态；这是跨后端统一 Gemma4 视觉所需的工作。
- [Issue #18396](https://github.com/ollama/ollama/issues/18396)：在 **Jetson Orin Nano 8GB（统一 CPU/GPU 内存）**上，Gemma4 E4B 多模态模型即使在 Ollama 0.34.0 上成功应用 CPU 投影器后仍会 OOM 宿主机——与边缘/ARM64 部署相关。

## 性能与优化

本窗口期内无新落地的性能工作。间接的性能/资源占用问题被提出：

- [Issue #18416](https://github.com/ollama/ollama/issues/18416)：从 safetensors 目录执行 `ollama create --quantize q4_K_M` 时，每次导入会泄漏约 50 GB **未被引用的 F16 blob**（12 × 26B 导入 → 600 GB 不可回收）。`ollama rm` 不会删除它，因为它不在清单中。这实质上是一个磁盘放大回归，建议在 CI/导入流水线中进行度量。
- [Issue #18396](https://github.com/ollama/ollama/issues/18396)：在 Jetson Orin Nano 8GB 上，Gemma4 E4B 多模态投影器选择了在统一内存中放不下的 GPU 层；即便强制使用 CPU 投影器仍会 OOM，表明层划分启发式并未考虑投影器权重开销。

## 稳定性与回归

按可能影响用户的程度排序。**粗体 = 已存在开放的修复 PR。**

**高严重性**

- [Issue #18412](https://github.com/ollama/ollama/issues/18412)：在 Linux 混合显卡笔记本上（Intel Raptor Lake-S iGPU + RTX 4080 Laptop，compute 8.9），`llama-server`（随 `ollama serve` 捆绑）**在后端/设备加载期间 SIGABRT**。与早期的 Windows 报告 #16667 同一族问题，现已在 Linux 复现。**尚无修复 PR。**
- [Issue #18421](https://github.com/ollama/ollama/issues/18421) → **[PR #18422](https://github.com/ollama/ollama/pull/18422)**：Qwen3-Coder 工具解析器将任何整数值浮点数强制转换为 `int64`；`x=1e20` 被静默改写为 `9223372036854775807`，范围外的负值同样被损坏。可即刻修复；两个 issue/PR 今日同日提出。
- [Issue #17778](https://github.com/ollama/ollama/issues/17778) → **[PR #17894](https://github.com/ollama/ollama/pull/17894)**：当多步工具循环将历史推过 `num_ctx` 且渲染器在截断过程中丢弃了最新的用户回合时，`qwen3.8` 返回 `500: no user query found in messages`。修复保留最近的用户消息。30 条评论，25 👍——这是本窗口期内互动量最高的 issue。

**中等严重性**

- [Issue #18411](https://github.com/ollama/ollama/issues/18411) → **[PR #18413](https://github.com/ollama/ollama/pull/18413)**：在 Responses 的 `web_search` 路径上，Ollama 在开放的 `reasoning` 条目完成之前就发出了客户端 `function_call`；条目还共享一个 `output_index` 却在不同索引处结束，破坏了 Codex 工具重放。
- [Issue #18419](https://github.com/ollama/ollama/issues/18419)：使用 `previous_response_id` 的 `POST /api/codex/v1/responses` 返回 HTTP 200，但在后续的 `function_call_output` 中返回空的助手 `output_text` 和零 token 计数。**尚无修复 PR。**
- [Issue #16383](https://github.com/ollama/ollama/issues/16383)：`qwen3.6`/`qwen3.5` 解析器/渲染器不匹配——qwen3.5 解析器间歇性地无法反序列化 qwen3.6 的工具调用，并返回 500 而非容忍漂移。长期存在；无关联 PR。
- [Issue #18094](https://github.com/ollama/ollama/issues/18094)：`gemma3:12b` 的 `/api/generate` 在 `format`（JSON schema）下，对包含双引号术语的输入会过早截断——由 schema 驱动的解码器在流式过程中丢弃/转义 token。
- [Issue #17562](https://github.com/ollama/ollama/issues/17562)：通过 Cline 在 Gemma4 / Qwen 衍生模型上出现三个独立的 agent 循环缺陷——重复防护误触发、JSON 中途工具调用被截断、以及缺失一个花括号导致整条工具调用被丢弃。报告者提供了补丁分支。
- [Issue #18297](https://github.com/ollama/ollama/issues/18297)：Qwen3.8-27B GSQ-RCO 的 `IQ3_S` 量化返回 `done_reason: stop` 且 `content` 为空。看起来更像是反量化/输出张量缺陷，而非缺失模型的问题。
- [Issue #18416](https://github.com/ollama/ollama/issues/18416)：量化导入泄漏 F16 源 blob（如上所述）。这属于存储正确性问题，而不仅是性能问题。

**较低严重性**

- [Issue #18387](https://github.com/ollama/ollama/issues/18387)：在 Windows 上，TOC 条目之间包含超过十个省略号的聊天消息会触发 `servers.log` 中的 `stop: cancel task`。可能是分词器/采样器的触发线。
- [Issue #18418](https://github.com/ollama/ollama/issues/18418)：基于 Gemma4 的多模态会看到旋转后的图像——EXIF 方向标签（例如 tag=3 → 180°）被查看器遵循，但送入模型的图像导入流水线未遵循。
- [Issue #18415](https://github.com/ollama/ollama/issues/18415)：在 Windows 10 上，从开始菜单启动 0.34.0 版的 Ollama 桌面端会短暂闪现 PowerShell 窗口。外观问题。
- [Issue #18414](https://github.com/ollama/ollama/issues/18414)：诸如 `qwen3.8:27b` 之类的模型带有未文档化的最低 Ollama 版本要求——应在模型库页面中显式标注。
- [Issue #2894](https://github.com/ollama/ollama/issues/2894)（已关闭）：长期的"Ollama 在 Windows 11 上不使用我的 RTX 4090"——以用户侧配置问题关闭。

## 对应用开发者的意义

- **请打版本并在下一次标签版本发布时重新测试。** 工具解析器这一批问题推进很快：两个同日提交的修复 PR（[#18422](https://github.com/ollama/ollama/pull/18422)、[#17894](https://github.com/ollama/ollama/pull/17894)），加上针对 Responses API 的 [#18413](https://github.com/ollama/ollama/pull/18413)。如果你的 agent 跑在 `qwen3-coder`、`qwen3.6` 或 `qwen3.8` 上，请将 0.34.0 视为"接近稳定但尚未稳定"，并为补丁版本预留计划。
- **对有状态流程请避免使用 `/api/codex/v1/responses` 接口。** 在 [#18411](https://github.com/ollama/ollama/issues/18411) 与 [#18419](https://github.com/ollama/ollama/issues/18419) 解决之前，`previous_response_id` 续接与同一响应内的 `web_search` 不可依赖——它们可能静默返回空补全，或发出顺序错乱的工具调用。生产环境请坚持使用无状态的 Chat Completions。
- **若你在 0.34.0 上从 safetensors 跑过 `ollama create --quantize`，请手动清理 `~/.ollama/models/blobs`**；`ollama rm` 不会回收残留的 F16（[#18416](https://github.com/ollama/ollama/issues/18416)）。在规模扩大之前，预计会有一次具备清单感知能力的 GC 来妥善处理此问题。
- **将 Gemma4 视作仍在变动中。** 统一视觉（[#16879](https://github.com/ollama/ollama/pull/16879)）仍开放，Jetson 多模态路径 OOM（[#18396](https://github.com/ollama/ollama/issues/18396)），且 Gemma4 衍生模型上的工具调用解析器至少有三种已报告的失败模式（[#17562](https://github.com/ollama/ollama/issues/17562)）。如果你在生产环境中依赖 Gemma4 视觉，请以包含 #16879 的标记版本作为放行门禁。
- **预计将有一次 CLI UX 回滚。** [#18393](https://github.com/ollama/ollama/pull/18393)（已关闭但未打标签）表明 `ollama` 内置 agent 正在被回滚。请勿围绕当前 CLI agent 编写自动化。
- **EXIF 旋转后的图像会误导多模态模型**（[#18418](https://github.com/ollama/ollama/issues/18418)）。在发送给 Ollama 之前，请预处理上传内容，去除/应用 EXIF 方向。
- **在 Intel iGPU + 独立 NVIDIA 组合的 Linux 混合 GPU 用户请暂缓**在生产环境使用 0.34.0，直至 [#18412](https://github.com/ollama/ollama/issues/18412) 得到解决；该服务器目前在启动时崩溃。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-13

## 今日要点

LiteLLM 发布了 **v1.102.0-rc.1**,采用 cosign 签名的 Docker 镜像,**Rust 迁移追踪单(#31263)** 仍是战略重心——目标是将网关开销压至 1ms 以下,且已是仓库中讨论最多的问题。过去 24 小时还浮现出一组 **Responses 转 Chat 的流式缺陷**(推理增量丢失、原始推理文本丢失、推理状态过期),综合来看,Responses↔Chat 桥接层是当前正确性工作的热点。

## 版本发布与破坏性变更

- **v1.102.0-rc.1**([发布说明](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-rc.1))——所有 LiteLLM Docker 镜像现均使用 [cosign](https://docs.sigstore.dev/cosign/overview/) 签名,签名密钥由提交 `0112e53` 引入。运维人员可直接从发布流水线中验证镜像真实性。

## 新增模型与硬件支持

- **OpenCode Go 提供商**——在 [#31568](https://github.com/BerriAI/litellm/issues/31568) 中提出,客户端从上游目录加载费用信息。
- **Azure 上的 Cohere Command A+**——追踪 [#32628](https://github.com/BerriAI/litellm/issues/32628)(开放中)。
- **Azure 上的 Kimi K2.7-Code**——通过 [#32613](https://github.com/BerriAI/litellm/issues/32613) 关闭。
- **Gondola 作为 OpenAI 兼容提供商**——PR [#34484](https://github.com/BerriAI/litellm/pull/34484),在 `providers.json` 中以 JSON 形式配置,与 nano-gpt/chutes 并列。
- **Scaleway 仪表盘 Logo**——PR [#35094](https://github.com/BerriAI/litellm/pull/35094) 将该提供商品牌带入管理界面。
- **MiniMax M2.7 的推理回退**——PR [#38212](https://github.com/BerriAI/litellm/pull/38212),修复 `reasoning_split` 未设置时 `<think>...` 包裹问题。
- **OpenRouter 视频生成**——在 [#27724](https://github.com/BerriAI/litellm/issues/27724) 中已关闭并标记完成。

## 性能与优化

- **Rust 迁移(亚 1ms 开销目标)**——[#31263](https://github.com/BerriAI/litellm/issues/31263) 是父工单,正在招募 Beta 测试用户。这是当前进行中的最大性能计划。
- **HTTP 服务器的 MCP `list_tools` 缓存**——[#23544](https://github.com/BerriAI/litellm/issues/23544) 报告每次 `tools/call` 多出一轮往返;缓存上游工具列表可大致将 HTTP 后端 MCP 调用的延迟减半。
- **`RedisCache.async_increment` 中的原子计数器 TTL**——PR [#40956](https://github.com/BerriAI/litellm/pull/40956) 用单次 pipeline 替代 INCRBYFLOAT/EXPIRE 两步操作,从而避免被取消的请求导致永久 TTL 计数器泄漏。
- **Token 计数器测试套件**——PR [#40999](https://github.com/BerriAI/litellm/pull/40999) 锁定空字符串、空白字符与模型名称归一化不变量。
- **批处理提交的 `tpd_limit`(每日 token)**——PR [#40997](https://github.com/BerriAI/litellm/pull/40997) 引入面向批处理的速率限制维度,以在内部团队间分配每日供应商容量。
- **全部署冷却中时的 Router 429 命名**——PR [#40995](https://github.com/BerriAI/litellm/pull/40995) 使"全部冷却中"区别于通用路由失败,这正是调用方驱动重试真正需要的状态。

## 稳定性与回归

**高严重度**

- **SDK 翻译中 Anthropic `vector_store_ids` 触发 400**——[#23741](https://github.com/BerriAI/litellm/issues/23741)(14 条评论,👍13)。转发携带 `vector_store_ids` / `vector_store_files` 字段的 Anthropic 风格请求体会导致 400。暂无关联修复 PR。
- **自托管安装失败(`prisma generate`)**——[#26097](https://github.com/BerriAI/litellm/issues/26097),在特定环境下会阻塞默认安装。
- **成本不可估计时预算预留被静默跳过**——[#35524](https://github.com/BerriAI/litellm/issues/35524)。对那些请求前无法估算成本的路由,所配置的预算可能被超额使用;属于安全/财务级别关切。

**中严重度**

- **Responses 转 Chat 流式传输丢失推理增量及缓存状态**——[#40887](https://github.com/BerriAI/litellm/issues/40887)。桥接层仅在终止事件上附加 `reasoning_items`。
- **Responses 转 Chat 丢失原始 `reasoning_text`**——[#40654](https://github.com/BerriAI/litellm/issues/40654)。`/v1/chat/completions` 上丢失明文推理内容。
- **`codex` 在 `-c` 跟随子命令时静默绕过代理**——[#40651](https://github.com/BerriAI/litellm/issues/40651)。`lite codex exec/resume/review` 完全跳过代理。
- **`custom_code` / `tool_permission` 护栏在 `/v1/messages` 上看不到 MCP 工具**——[#40583](https://github.com/BerriAI/litellm/issues/40583)。当客户端使用 Anthropic 兼容端点时,调用前运行的护栏对 MCP 工具不可见。
- **Valkey 语义缓存转发 `**kwargs` 而非 `metadata`**——[#32324](https://github.com/BerriAI/litellm/issues/32324)。涉及两处 `_get_async_embedding()` 调用点。

**低严重度但值得关注**

- **Ollama 提供商在极简自定义提示模板上出现 `KeyError`**——[#39759](https://github.com/BerriAI/litellm/issues/39759)。
- **流式用量合并器在显式置零更新后仍保留陈旧的缓存写入 token**——[#40736](https://github.com/BerriAI/litellm/issues/40736)。相关:#34497、#15263。
- **`langfuse_otel` 永远不会为 `/v1/rerank` 设置观测输出**——[#36537](https://github.com/BerriAI/litellm/issues/36537)。
- **`reasoning_effort=xhigh` 被静默降级而非拒绝**——[#40471](https://github.com/BerriAI/litellm/issues/40471)。
- **超过团队上限的密钥上限被静默接受**——[#40866](https://github.com/BerriAI/litellm/issues/40866)。修复见 PR [#40998](https://github.com/BerriAI/litellm/pull/40998)(生成/更新时发出警告)。
- **管理界面模型编辑持久化派生定价 → Azure 花费记为 $0**——[#40649](https://github.com/BerriAI/litellm/issues/40649)。与 #30081 相关。
- **`LiteLLM_SpendLogs.session_id` 未反映 `litellm_session_id`**——[#40851](https://github.com/BerriAI/litellm/issues/40851),会导致按会话分组的分析结果失真。
- **`_get_user_agent_tags` 中 User-Agent 表头查找不区分大小写**——[#40979](https://github.com/BerriAI/litellm/issues/40979)。
- **`spend-log` 批次在非传输层数据库写入失败时被丢弃**——[#33873](https://github.com/BerriAI/litellm/issues/33873)(已关闭;部分修复已落地,传输失败路径已修复)。
- **`simple-shuffle` 在首个健康部署无权重时忽略权重**——[#33329](https://github.com/BerriAI/litellm/issues/33329)(已关闭)。
- **`model_max_budget` 跨模型/持续时长共享同一预算窗口起点**——[#33326](https://github.com/BerriAI/litellm/issues/33326)(已关闭)。
- **Friendli 已弃用的 `meta-llama-3.1-70b/8b-instruct` 条目仍残留在价格表中**——PR [#41000](https://github.com/BerriAI/litellm/pull/41000) 移除了对已不存在上游仍计费的过期目录条目。

**过去 24h 内为旧问题落地的修复 PR**

- PR [#40998](https://github.com/BerriAI/litellm/pull/40998)——当密钥上限超出团队上限时发出警告(修复 #40866)。
- PR [#40589](https://github.com/BerriAI/litellm/pull/40589)——在修复后拆分拼接的工具调用 JSON。
- PR [#40603](https://github.com/BerriAI/litellm/pull/40603)——恢复工具调用参数中拼接的 JSON(修复 #40582;已关闭)。
- PR [#38209](https://github.com/BerriAI/litellm/pull/38209)——在部分设置更新时保留 SSO 客户端密钥。
- PR [#32136](https://github.com/BerriAI/litellm/pull/32136)——在鉴权路径上强制执行客户 `model_max_budget`。
- PR [#34900](https://github.com/BerriAI/litellm/pull/34900)——归一化 SAP 流式分块;提供更清晰的空部署错误。
- PR [#40988](https://github.com/BerriAI/litellm/pull/40988)——将流中 Responses 错误路由经 `exception_type`,使 `content_policy_fallbacks` 触发。
- PR [#40957](https://github.com/BerriAI/litellm/pull/40957)——在团队别名目标上检查密钥白名单。
- PR [#40199](https://github.com/BerriAI/litellm/pull/40199)——DashScope rerank 现已遵守 `instruction`(`→` `instruct`)。
- PR [#37719](https://github.com/BerriAI/litellm/pull/37719)——Openlayer 作为原生 OTEL 日志回调。
- PR [#37165](https://github.com/BerriAI/litellm/pull/37165)——NeuralTrust TrustGuard 作为原生护栏。
- PR [#35606](https://github.com/BerriAI/litellm/pull/35606)——将 Usage "Ask AI" 路由经 Router,从而解析代理别名。

## 对应用开发者的影响

- **Responses↔Chat 桥接是当前风险最高的路径。**如果你是 SDK 用户,通过 `/v1/chat/completions` 驱动 `openai/responses/<model>` 部署,请预期推理内容不完整或丢失。若产品依赖流式推理,请继续使用原生 `/v1/responses`,或等待桥接层稳定;追踪 [#40887](https://github.com/BerriAI/litellm/issues/40887)、[#40654](https://github.com/BerriAI/litellm/issues/40654)、[#39354](https://github.com/BerriAI/litellm/issues/39354)。
- **Anthropic 风格客户端必须在调用代理前清理 `vector_store_ids` / `vector_store_files`**,否则会收到 400。参见 [#23741](https://github.com/BerriAI/litellm/issues/23741)。
- **通过 `lite codex` 调用 Codex CLI 在非交互式子命令下不可靠**:`-c` 覆盖可能静默丢失,从而绕过代理。参见 [#40651](https://github.com/BerriAI/litellm/issues/40651)。
- **护栏在 `/v1/messages` 上对 MCP 工具不可见。**若你正使用 `custom_code` 或 `tool_permission` 守门工具调用,在 Anthropic 兼容路径上将看不到 MCP 工具。参见 [#40583](https://github.com/BerriAI/litellm/issues/40583)。
- **成本无法估算时不会强制执行预算。**在映射缺失的提供商路由上,请勿假设支出上限会兜底——请预先检查成本映射(#35524)。
- **基于 `session_id` 的分析目前在花费日志中已失效**:该字段正被每次调用的关联 ID 覆盖。在 #40851 落地前,请将按会话汇总视为不可靠。
- **对于高流量部署**,一旦 #40956 发布,首选 `RedisCache` 速率限制——该修复可防止累积取消造成的 TTL 计数器泄漏。
- **校验你的 Docker 镜像**:从 v1.102.0-rc.1 起,每个 LiteLLM 镜像均经过 cosign 签名;若供应链完整性至关重要,请将其接入你的准入控制器。
- **长期视角**:Rust 网关计划(#31263)是当前最具决定性的方向——正在规划 2026 容量规划的运维人员应关注 Beta 准入机会。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-13

## 今日要点

- **TRL 0.20 兼容性修复**：Studio 的 SFT text/CPT 分支此前在传递已移除的关键字参数（`max_seq_length`、`tokenizer`），导致 `trl>=0.20` 上的所有文本训练无法运行。修复已合入 [#10740](https://github.com/unslothai/unsloth/pull/10740)；使用 docker 镜像 `2026.9.4` 的用户根据 [#10785](https://github.com/unslothai/unsloth/issues/10785) 直接踩到此问题。
- **B200 实际性能提升**：[#10744](https://github.com/unslothai/unsloth/pull/10744) 将单卡 B200 上的 Qwen3.5-9B LoRA SFT 单步耗时从 **0.85 s → 0.66 s**，主要通过消除与 `fla` autotune key 重建相关的 CPU 端每步开销（[#10806](https://github.com/unslothai/unsloth/issues/10806) 中用户报告的症状）。
- **NVFP4 量化在 Studio 中成为一等公民**：分层 NVFP4 image 策略、flashinfer `mm_fp4` linear 后端、带预烘焙 activation scale 的 GPTQ builder，以及带门控的 `auto` 阶梯，统一合入 [#10730](https://github.com/unslothai/unsloth/pull/10730)，内核侧跟进在 [#10731](https://github.com/unslothai/unsloth/pull/10731)。

## 发布与破坏性变更

- **过去 24 小时内无 tagged release。** issue 中讨论的构建产物引用 docker 镜像 `2026.9.4`（9 月 4 日的包）。
- **TRL 0.20 迁移（对 Studio 用户为破坏性变更）**：`SFTConfig` 不再接受 `max_seq_length`（已重命名为 `max_length`），`SFTTrainer` 不再接受 `tokenizer`。[#10785](https://github.com/unslothai/unsloth/issues/10785) 已通过 [#10740](https://github.com/unslothai/unsloth/pull/10740) 关闭。任何针对 `trl>=0.20` 运行 Studio text/CPT recipe 的用户都需要该 PR 或降级版本。
- **vLLM tag 覆盖断层**：upstream-pinning 测试停在 `v0.20.1`，而 vLLM 已是 `0.29.0`。[#10858](https://github.com/unslothai/unsloth/pull/10858) 将追踪扩展至 0.29，并在 vLLM 0.28 把 bnb 迁到 `vllm-bnb-plugin` 之后锁定了 `bitsandbytes` 符号（之前这会导致 `import unsloth_zoo.vllm_utils` 在模块作用域内抛出 `ModuleNotFoundError`）。

## 新模型与硬件支持

- **NVFP4 支持 image DiTs**，配备 flashinfer `mm_fp4` linear 后端，以及带预烘焙 activation scale 的 GPTQ builder。`auto` 阶梯仅在审核通过的 gate record 允许时才会提升到 `nvfp4` —— [#10730](https://github.com/unslothai/unsloth/pull/10730)、[#10731](https://github.com/unslothai/unsloth/pull/10731)。
- **Image text-encoder 精度控制** 加入 Studio Images 页面（Default / FP8 storage / FP8 compute / INT8 / NVFP4）；选项会传递到下载规划，并在加载期间保持锁定 —— [#10788](https://github.com/unslothai/unsloth/pull/10788)。
- **B200 (sm_100) 适配**：NVLink 检测从 `nvidia-smi topo -m` 迁移到 NVML，在 8×B200 主机上将 gate 从约 1.2 s 降到几十毫秒 —— [#10720](https://github.com/unslothai/unsloth/pull/10720)。B200 LoRA 性能优化 —— [#10744](https://github.com/unslothai/unsloth/pull/10744)。
- **本地 HF 缓存模型白名单缺口**：Studio 的"选择本地模型"漏掉了 `model-00000-of-00001.safetensors`，因此像 `openbmb/MiniCPM5-2B` 这类单 shard 模型被报告为无可训练权重 —— [#10853](https://github.com/unslothai/unsloth/issues/10853)。暂无修复 PR。
- **DeepSeek V4.1 Flash GGUF 进入 llama.cpp**：用户请求，暂无维护者响应 —— [#10838](https://github.com/unslothai/unsloth/issues/10838)。
- **JSON / Markdown 校验块** 加入 Recipe Studio（针对生成字段、formula、sampler；注册 `unsloth_json_validator` / `unsloth_markdown_validator`） —— [#10710](https://github.com/unslothai/unsloth/pull/10710)。

## 性能与优化

- **Qwen3.5-9B LoRA SFT on B200**：batch 1 下每步 **0.85 s → 0.66 s**（约快 22%）；提升主要来自消除 CPU 端每步工作而非 GPU kernel —— [#10744](https://github.com/unslothai/unsloth/pull/10744)。根因分析与 [#10806](https://github.com/unslothai/unsloth/issues/10806) 关联。
- **NVLink 检测**：用 NVML 替换 `nvidia-smi topo -m`，消除了每次 Studio 启动中约 1.2 s 的 shell 调用（用于 `GGML_CUDA_P2P` gate） —— [#10720](https://github.com/unslothai/unsloth/pull/10720)。
- **`fla` autotune-key 重建**：被定位为 B200 上步骤间 GPU 空转的来源；[#10744](https://github.com/unslothai/unsloth/pull/10744) 中讨论了实验性缓解，跟踪 issue [#10806](https://github.com/unslothai/unsloth/issues/10806)。
- **`fast_cross_entropy_loss`**：之前在 `.view()` 处拒绝 stride/transpose 的 batch，并在 Triton kernel 内读取非 unit-stride 维度，导致 loss/gradient 静默错误。通过使用 `reshape` 并物化 stride 的 label/vocab 切片修复 —— [#10713](https://github.com/unslothai/unsloth/pull/10713)。**这是正确性问题，不只是性能问题。**
- **bitsandbytes native 调用**：使用 PyTorch 当前活跃的 accelerator stream 替代模块初始化时缓存的 stream 指针，修复 [#10563](https://github.com/unslothai/unsloth/issues/10563) 中的缓存 stream 不一致问题 —— [#10745](https://github.com/unslothai/unsloth/pull/10745)。
- **`studio update` 校验**：当已安装的 release 已匹配时，跳过对预编译 llama.cpp（macOS 上节省 13–63 s，Windows 上约 5 s）、whisper.cpp release 拉取以及 `node -v`/`npm --version` 调用的重新校验 —— [#10648](https://github.com/unslothai/unsloth/pull/10648)。
- **POSIX 上的 uv 缓存共享**：`install.sh` 不再覆盖缓存选择器，因此暖好的共享缓存能真正被看到，`setup.sh` 也会尊重所记录的选择 —— [#10647](https://github.com/unslothai/unsloth/pull/10647)。
- **后端启动**：如果 `127.0.0.1` 不可达（纯 IPv6 环境），后端现在会回退而非在 80 s 后因健康检查失败而退出 —— [#10803](https://github.com/unslothai/unsloth/pull/10803)。

## 稳定性与回归

按严重程度排序。状态：**修复 PR 已开** / **暂无修复**。

**高 —— 训练中断**

- **TRL 0.20 + Studio 文本训练** —— `SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`。影响 `trl>=0.20` 上所有 Studio 文本运行，包括 docker 镜像 `2026.9.4`。**修复：[#10740](https://github.com/unslothai/unsloth/pull/10740)**。跟踪：[#10785](https://github.com/unslothai/unsloth/issues/10785)。
- **本地 HF 缓存模型被拒** —— Studio 的权重文件白名单漏掉了 `model-00000-of-00001.safetensors`，因此单 shard HF 缓存模型（如 `MiniCPM5-1B/2B`）在 8 GB RTX 4060 上报告"无可训练权重"。**暂无修复。** —— [#10853](https://github.com/unslothai/unsloth/issues/10853)。
- **`fla` autotune-key 在 B200 上每次启动都重建** —— 通过 `unsloth-cli.py` 训练 Qwen3.5-9B LoRA 时，每步大部分时间 GPU 处于空转。[#10744](https://github.com/unslothai/unsloth/pull/10744) 中有实验性缓解。**上游暂无修复。** —— [#10806](https://github.com/unslothai/unsloth/issues/10806)。

**高 —— 静默的正确性问题**

- **`fast_cross_entropy_loss` 处理 stride 输入** —— 之前在不抛错的情况下输出错误的 loss/gradient。**修复：[#10713](https://github.com/unslothai/unsloth/pull/10713)**。
- **`TextPreprocessor.clean_text` 删除所有非 ASCII 字符** —— 在整个训练语料上静默剥离口音/变音符（`"Le café était très bon." → "Le caf tait trs bon."`）。**修复：[#10741](https://github.com/unslothai/unsloth/pull/10741)**。
- **`Phi3.5` 二分类 loss 坍缩为 0** —— 长期存在，仍未锁定复现路径。 —— [#946](https://github.com/unslothai/unsloth/issues/946)。

**中 —— Studio 启动 / 安装**

- **纯 IPv6 主机** —— 后端绑定 `127.0.0.1`，挂起约 80 s 后以 `unresponsive_health_check` 退出。**修复：[#10803](https://github.com/unslothai/unsloth/pull/10803)**。
- **Intel XPU 安装器冲突** —— 第一个补丁（PR #10073）未能完全阻止 `triton-windows` 覆盖 torch 的 XPU Triton。**后续 issue：[#10844](https://github.com/unslothai/unsloth/issues/10844)**（引用 #10018 已关闭）。
- **Windows 安装器忽略所选目录** —— 总是把依赖装到 `~/.unsloth`。**暂无修复。** —— [#10859](https://github.com/unslothai/unsloth/issues/10859)。
- **Desktop AppImage 无法下载大模型** —— 缺少 `hf_xet`；像 Qwen 3.8 Flash Next Q5_K_XL 这类文件的下载会抛出 `ValueError: The file is too large to be downloaded using the regular download method.`。**暂无修复**；用户需要 `pip install hf_xet`。 —— [#10840](https://github.com/unslothai/unsloth/issues/10840)。
- **Studio 无法下载 gated HF 模型** —— 下载路径校验了用户提供的 token，但漏掉了已保存的 `huggingface-cli login`。**修复：[#10758](https://github.com/unslothai/unsloth/pull/10758)**。
- **Diffusers pipeline 构建无法取消** —— Eject 与 loader 都需要同一把锁；构建过程中无法检查取消，导致一次已取消的加载仍可能进入"ready"状态。**修复：[#10780](https://github.com/unslothai/unsloth/pull/10780)**。

**中 —— agent / 工具行为**

-

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 摘要 — 2026-09-13

## 1. 今日要点

过去 24 小时内没有发布新版本，但有三个活跃 issue 暴露出值得关注的运维问题：v3.0.22 中的一个**计费/成本追踪缺陷**——规则别名模型的估算成本始终为 `$0`,原因是用量记录持久化的是请求别名而非解析出的上游模型([#1787](https://github.com/musistudio/claude-code-router/issues/1787));一个**非流式响应损坏** bug——当具备推理能力的模型(例如 `z-ai/glm-5.3`)通过 `openai_chat_completions` provider 能力路由时会出现([#1793](https://github.com/musistudio/claude-code-router/issues/1793));以及围绕 OpenCode Go 客户端持续报告的零缓存命中问题、一个已被撤回的归因头假说([#1791](https://github.com/musistudio/claude-code-router/issues/1791))。

## 2. 版本发布与破坏性变更

*过去 24 小时内没有新版本发布。最新发布的版本仍为 **3.0.22**。*

## 3. 新模型与硬件支持

*今日未宣布新的模型、后端或量化支持。*

## 4. 性能与优化

*过去 24 小时内没有已落地或处于提议阶段的性能/优化工作。*

## 5. 稳定性与回归

按严重程度排序：

1. **[高 — 计费正确性] [#1787](https://github.com/musistudio/claude-code-router/issues/1787)** — 规则别名模型的估算成本一直显示为 `$0`。该问题在 **v3.0.22** 上被报告，并确认在当前 `master` 上仍然存在；相关代码路径自 v3.0.22 以来没有变化。持久化层记录的是用户提供的请求名称(别名)，而非解析出的上游模型，导致成本计算解析不到对应的条目。**影响：**对于任何依赖 CCR 规则/别名的部署，成本看板和预算管控都会静默失效。**尚无修复 PR。**

2. **[高 — 响应正确性] [#1793](https://github.com/musistudio/claude-code-router/issues/1793)** — 通过 `openai_chat_completions` 路由具备推理能力的模型时(已通过 OpenRouter 以 `z-ai/glm-5.3` 测试)，非流式请求在 Anthropic Messages 响应中产生碎片化或损坏的内容块。流式路径似乎不受影响。**影响：**在该 provider 能力上对推理模型使用 `non_stream=True` 的调用方会得到不可用的输出。**尚无修复 PR;根因尚未定位。**

3. **[中 — 缓存有效性，调查中] [#1791](https://github.com/musistudio/claude-code-router/issues/1791)** — 当 Claude Code 由 OpenCode Go 前置并指向自定义 base URL 时，观察到缓存用量为零。此前提议的 `CLAUDE_CODE_ATTRIBUTION_HEADER=0` 修复方案([PR #1792](https://github.com/musistudio/claude-code-router/pull/1792))在验证结果不支持归因头归因假说后已被**关闭/撤回**。底层的缓存症状仍未解决。

## 6. 对应用开发者的启示

- 如果你运行的是 CCR ≥ 3.0.22 并依赖规则别名，请**立即审计你的成本遥测数据**——别名流量几乎肯定正按 `$0` 计费。在 [#1787](https://github.com/musistudio/claude-code-router/issues/1787) 修复之前，请从上游 provider 的用量记录推算支出，而不是依赖 CCR 的 `usage.json`。
- 在 `openai_chat_completions` provider 能力上，**避免对具备推理能力的模型使用非流式模式**(例如 `z-ai/glm-5.3`)。要么在客户端配置中强制 `stream=true`,要么将推理模型路由到非流式路径已被验证可靠的 provider 能力(例如 Anthropic 原生)。参见 [#1793](https://github.com/musistudio/claude-code-router/issues/1793)。
- **前缀缓存调试仍未结案。**最近的假说(归因头)未能成立([#1791](https://github.com/musistudio/claude-code-router/issues/1791)、[#1792](https://github.com/musistudio/claude-code-router/pull/1792))。如果你在 OpenCode Go 指向自定义 base URL 时遇到零缓存命中，请预期调查仍将继续，暂不要上线临时规避方案。
- 在 [#1787](https://github.com/musistudio/claude-code-router/issues/1787) 解决之前，请**继续固定在最后一个已知可用的构建版本**；目前没有已修复的发布版本，请在此期间做好在上游 provider 侧对账成本的准备。

---

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 每日摘要 — 2026-09-13

## 今日要点

最具影响力的话题集中在 **Codex 在切换 Provider 时的会话连续性问题**：至少有四个并行 Issue（#6658、#7310、#7362、#7257）以及一个专门的修复 PR（#7342），共同处理一个反复出现的故障 —— 在「官方 OpenAI 与第三方中转」之间切换后，旧会话无法继续使用。根因是 Codex 在 `state_5.sqlite` 中固定了 `model_provider`。另，**DeepSeek Harness（DSH）** 在 [#7356](https://github.com/farion1231/cc-switch/pull/7356) 中被提升为一等应用类型（取代了 #6526），为第二款主流国产编程 Agent 带来了原生的 YAML/凭据写入器、源感知的 Provider 生命周期，以及 Codex 风格的 Provider 表单。

## 发布与破坏性变更

过去 24 小时无新发布。以下是值得下游用户关注的、在途关键变更：

- **DeepSeek Harness 升级为一等应用**（[#7356](https://github.com/farion1231/cc-switch/pull/7356)）—— 为 DSH 引入 `app_type`，并在 `DSH_HOME`（默认 `~/.dsh`）下提供 `settings.yaml` 的原生写入器。这将扩大安装覆盖范围，并可能影响已经安装 DSH 的用户的检测逻辑。
- **WSL 下 OMO 配置检测**（[#7363](https://github.com/farion1231/cc-switch/issues/7363)）—— 当前使用 Windows 主目录探测 OMO 的 `~/.omo/omo.jsonc`，而非 WSL 主目录；使用 Windows+WSL2 的用户可能静默漏掉 OMO Provider。修复 PR 尚未提交。
- **Antigravity CLI 迁移**（[#7198](https://github.com/farion1231/cc-switch/issues/7198)）—— 据报告 Gemini CLI 已不再维护；入口点和用量统计需要迁移到 Antigravity CLI。

## 新增模型与硬件支持

- **Command Code Provider 预设 + 配额**（[#7358](https://github.com/farion1231/cc-switch/pull/7358)）—— 为 Claude Code 和 Codex 添加预设、端点/模型配置，以及编程套餐用量查询（5 小时、周度、月度）。
- **DeepSeek Harness（DSH）全面支持**（[#7356](https://github.com/farion1231/cc-switch/pull/7356)）—— 应用类型、原生 YAML/凭据写入器、源感知的 Provider 生命周期。
- **智谱 OpenAI Responses 模型列表兼容性**（[#7330](https://github.com/farion1231/cc-switch/pull/7330)）—— 修复智谱三种 API 风格（Anthropic 兼容、OpenAI Chat、OpenAI Responses）下模型列表响应的解析问题。
- **TokenRouter 预设请求**（[#5319](https://github.com/farion1231/cc-switch/issues/5319)）—— 社区请求将 `https://api.tokenrouter.com`（Anthropic + OpenAI 兼容接口）添加为预设。尚无 PR。
- **Codex 账号粒度配额激活**（[#7351](https://github.com/farion1231/cc-switch/pull/7351)）—— 托管 Codex OAuth 账号的可选流程，通过 SQLite 账本强制每个（账号、配额桶、重置周期）仅激活一次。

## 性能与优化

- **RequestLogTable 中的输出 TPS**（[#3369](https://github.com/farion1231/cc-switch/pull/3369)，已关闭）—— 在延迟与 Token 数有效时，在输出 Token 单元格中显示 tokens/sec。关闭了长期悬而未决的 [#5936](https://github.com/farion1231/cc-switch/issues/5936)。
- **Anthropic SSE 中末尾推理增量抑制**（[#6911](https://github.com/farion1231/cc-switch/pull/6911)）—— 修复 chat-completions → Anthropic SSE 转换器在 Kimi 等上游在文本之后追加尾部 `reasoning_content` 时，发出的重复空思考块。关闭 #6903。虽无吞吐量数字，但减少了浪费的内容块，并避免客户端解析器混乱。
- **多模态 `function_call_output` 处理**（[#4724](https://github.com/farion1231/cc-switch/pull/4724)）—— Responses → ChatCompletions 转换器现在将图像数组转换为正确的 `image_url` 部分，而不是将整个规范化 JSON 整体 base64 化，从而消除了 Codex `view_image` 调用上一次昂贵的往返。

## 稳定性与回归

按严重程度与用户影响排序：

1. **严重 — 切换 Provider 后 Codex 会话回放失败**（[#7362](https://github.com/farion1231/cc-switch/issues/7362)、[#7310](https://github.com/farion1231/cc-switch/issues/7310)、[#6658](https://github.com/farion1231/cc-switch/issues/6658)、[#7257](https://github.com/farion1231/cc-switch/issues/7257)）。根因：Codex 在 `state_5.sqlite` 的 `threads` 行中固定了 `model_provider`；切换 Provider 会留下孤立引用。**修复 PR：** [#7342](https://github.com/farion1231/cc-switch/pull/7342) —— 为官方 Responses 清理不兼容的推理回放。多名用户受影响；#7257 中提出了社区级 workaround。
2. **高 — Codex 自动化孤立 `function_call_output` → DeepSeek 400**（[#7074](https://github.com/farion1231/cc-switch/issues/7074)）。**修复 PR：** [#7124](https://github.com/farion1231/cc-switch/pull/7124) 恢复了上游最初被丢弃的清洗逻辑。
3. **高 — Claude Code WebSearch 在 Grok/xAI Responses 上 422**（[#7365](https://github.com/farion1231/cc-switch/issues/7365)、[#7241](https://github.com/farion1231/cc-switch/issues/7241)）。`tool_choice: {type:"web_search"}` 被 xAI New-API 网关拒绝。**修复 PR：** [#7366](https://github.com/farion1231/cc-switch/pull/7366) 将强制的托管 WebSearch 映射为 Responses 的 `tool_choice: "required"`。
4. **高 — WSL 下 OMO 配置被静默忽略**（[#7363](https://github.com/farion1231/cc-switch/issues/7363)）。Windows+WSL2 用户无法通过 CC Switch 管理 OMO Provider。暂无修复 PR。
5. **中 — GPT 登录失效阻塞 Provider 切换**（[#7361](https://github.com/farion1231/cc-switch/issues/7361)）。当 GPT/Codex OAuth 会话过期时，切换器拒绝切换到其他 Provider。暂无修复 PR。
6. **中 — Codex 本地代理忽略 `wire_api=chat`**（[#7360](https://github.com/farion1231/cc-switch/issues/7360)）。始终写入 Responses；导致 xAI Grok OAuth → `/v1/responses` 上 502。与 #7241 相关。
7. **中 — WSL 工具版本探测显示发行版版本号**（[#7348](https://github.com/farion1231/cc-switch/pull/7348) 为修复 PR）—— `try_get_version_wsl` 读取的是 shell 启动输出。PR 对其进行了过滤。
8. **中 — Codex `model_catalog_json` 被写成裸文件名**（[#7349](https://github.com/farion1231/cc-switch/pull/7349)）—— 较新的 Codex 构建在权限配置校验期间重新读取 `config.toml`，并将该字段反序列化为绝对路径；修复在原生配置目录下写入绝对路径指针。
9. **中 — `deepMerge` 在 common-config 数组并集上覆盖 Provider 条目**（[#6144](https://github.com/farion1231/cc-switch/pull/6144)）—— 修复在审中；以去重并集合并，并将 common-config 数组视为子集。
10. **中 — Codex 导入时 MCP 仅 URL 的 server 被损坏**（[#6755](https://github.com/farion1231/cc-switch/pull/6755)）—— 默认按 `stdio` 处理；修复在仅设置 `url` 时推断为 `http`。关闭 #6719。
11. **中 — 火山引擎配额始终读取 Agent Plan**（[#6518](https://github.com/farion1231/cc-switch/pull/6518)）—— 修复按 Provider `base_url` 在 `GetCodingPlanUsage` 与 `GetAFPUsage` 之间路由。
12. **低 — Claude Desktop Linux 配置检测**（[#7331](https://github.com/farion1231/cc-switch/pull/7331)）—— 新增 3P 支持，遵循 `$XDG_CONFIG_HOME`，并将 Flatpak 解包到宿主机 `~/.config`。

## 对应用开发者的启示

- **为基于 Codex 的 Agent 规划 Provider 切换的副作用。** 如果你的 Agent 持久化 Codex 会话状态（threads、SQLite），并允许用户更改上游 Provider，就会撞上 `model_provider` 不匹配这一类 Bug。[#7342](https://github.com/farion1231/cc-switch/pull/7342) 是公认的 workaround；建议在自己的回放路径里复刻其清洗逻辑，而不是依赖上游 Codex CLI 自愈。
- **将 SSE/回放边界视为契约。** 本周的多项修复（[#6911](https://github.com/farion1231/cc-switch/pull/6911)、[#7366](https://github.com/farion1231/cc-switch/pull/7366)、[#7124](https://github.com/farion1231/cc-switch/pull/7124)、[#4724](https://github.com/farion1231/cc-switch/pull/4724)）都聚焦于网关侧的怪癖（尾部推理块、托管工具的 `tool_choice` 映射、孤立工具输出、多模态工具输出）。如果你位于多厂商中转之后，请构建防御性清洗器 —— 不要信任上游的工具调用顺序。
- **跨平台路径解析仍是热点。** [#7363](https://github.com/farion1231/cc-switch/issues/7363) 与 [#7348](https://github.com/farion1231/cc-switch/pull/7348) 中的 WSL 检测 Bug 很好地提醒我们：始终探测 Windows 与 POSIX 两端主目录，并在版本探测前剥离 shell 启动横幅输出。
- **下一版本预计将带来更丰富的 Provider 生态。** DSH、Command Code、智谱 Responses 都在同一窗口内落地。如果你的目标客户是国产编程工具，请同时针对 Anthropic 兼容与 OpenAI Responses 两种接口形态进行验证；[#7330](https://github.com/farion1231/cc-switch/pull/7330) 是关于线协议差异的一份有用参考。
- **配额窗口正变得更结构化。** [#7351](https://github.com/farion1231/cc-switch/pull/7351) 中引入的账号粒度配额窗口激活（优先 5 小时，次回退到周度）是简洁的模式 —— 如果你自己的 Agent 也需要协调多桶的用量刷新、避免重复激活竞争，可参考该模式。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-13

## 今日要点
项目仍在 v1.0.0 候选发布线（即 rc.*）上快速迭代（自托管构建当前为 rc.37，讨论中引用的是 rc.36），社区正积极呼吁正式确定 GA 标准（#7279）。今日流量主要由**针对中继正确性与 SSRF 加固的缺陷修复 PR** 主导，同时也有若干值得关注的新功能：使用日志的 CSV 导出（#7356）、全局 URL 前缀路由（#7350），以及 Gemini Agentic 视频理解（#7337）。

## 发布与破坏性变更
*过去 24 小时内无新版本发布。* 社区正在呼吁明确 v1.0.0 的 GA 准入门槛（[#7279](https://github.com/QuantumNous/new-api/issues/7279)）；项目仍处于 `v1.0.0-rc.*` 系列。

## 新模型与硬件支持
- **Gemini Agentic 视频理解** — 新的中继功能（[PR #7337](https://github.com/QuantumNous/new-api/pull/7337)，关闭 [#7336](https://github.com/QuantumNous/new-api/issues/7336)），支持 Google/Gemini API 的视频理解流程。
- **Gemini 3.x 分层模型命名** — 在模型映射后保留 `-high`/`-low` 风格的算力层级后缀（[PR #7339](https://github.com/QuantumNous/new-api/pull/7339)，已合并/关闭）。
- **通过 OAI 兼容上游实现 Claude 流式响应** — 当上游未发出 usage chunk 时强制补齐完成事件（[PR #7351](https://github.com/QuantumNous/new-api/pull/7351)）。

## 性能与优化
- **按供应商成本进行视频请求路由**（[PR #7353](https://github.com/QuantumNous/new-api/pull/7353)，已关闭/未合并）— 提议的视频生成供应商成本感知调度器。
- **主动通道探测** 配合精细化限流（[PR #7161](https://github.com/QuantumNous/new-api/pull/7161)）— 长期运行中的健康检查功能开发。
- **代码简化**，用标准库内建函数替换自定义的 min/max（[PR #7102](https://github.com/QuantumNous/new-api/pull/7102)，已合并）。

## 稳定性与回归

| 严重级别 | 问题 | 状态 | 修复/链接 |
|---|---|---|---|
| **高** | `FetchUpstreamRatios` 存在 SSRF 漏洞 — 比例同步中的任意上游 URL 未经过 SSRF 策略校验 | 待处理 | [PR #7344](https://github.com/QuantumNous/new-api/pull/7344) |
| **高** | 用户设置中的 Webhook/Bark URL 未经过 SSRF 策略校验 | 待处理 | [PR #7343](https://github.com/QuantumNous/new-api/pull/7343) |
| **高** | 当 `pass_through_body_enabled` 开启时，通道 `param_override` 被静默忽略（互斥行为，未文档化） | 已关闭（确认缺陷） | [Issue #7348](https://github.com/QuantumNous/new-api/issues/7348) · 修复 [PR #7346](https://github.com/QuantumNous/new-api/pull/7346) |
| **高** | 当 IdP 返回 `Cross-Origin-Opener-Policy` 时，OAuth 敏感操作验证始终失败 | 待处理 | [Issue #7338](https://github.com/QuantumNous/new-api/issues/7338) |
| **中** | 图像生成：`aspect_ratio`/`resolution` 在中继时被静默丢弃（DTO `MarshalJSON` 丢弃了 `Extra`） | 已关闭（确认缺陷） | [Issue #7340](https://github.com/QuantumNous/new-api/issues/7340) · 修复 [PR #7341](https://github.com/QuantumNous/new-api/pull/7341) |
| **中** | 自动禁用导致组内最后一个通道为空后重试时出现"Database consistency broken"错误 | 已关闭 | [Issue #6503](https://github.com/QuantumNous/new-api/issues/6503) · 修复 [PR #6504](https://github.com/QuantumNous/new-api/pull/6504) |
| **中** | 仪表盘周粒度默认时间范围未预选 | 待处理 | [Issue #7354](https://github.com/QuantumNous/new-api/issues/7354) · 修复 [PR #7355](https://github.com/QuantumNous/new-api/pull/7355) |
| **中** | Anthropic 缓存 token 未计入消费日志的输入总量（计费） | 待处理 | [PR #7305](https://github.com/QuantumNous/new-api/pull/7305)（关闭 [#7290](https://github.com/QuantumNous/new-api/issues/7290)） |
| **中** | 当上游省略 `usage` chunk 时，OAI→Claude 流缺少终止事件 | 待处理 | [PR #7351](https://github.com/QuantumNous/new-api/pull/7351) |
| **低** | `xAI grok-imagine-video` 已列入目录但失败，报错 `invalid_api_platform: 48` | 已关闭（重复） | [Issue #7352](https://github.com/QuantumNous/new-api/issues/7352) |
| **低** | 内部模型端点的自签名 HTTPS 证书处理 | 已关闭（陈旧） | [Issue #1069](https://github.com/QuantumNous/new-api/issues/1069) |
| **信息** | "Internal API key" 功能 PR 已关闭 | 已关闭 | [PR #7342](https://github.com/QuantumNous/new-api/pull/7342) |
| **可疑** | 新贡献者 `premshharmaa` 的 "Initial commit" PR（#7349）— 在进行任何交互前请仔细审查 | 待处理 | [PR #7349](https://github.com/QuantumNous/new-api/pull/7349) |

## 对应用开发者的意义
- **在 PR #7346 进入你的构建之前**，不要在同一通道上同时启用 `pass_through_body_enabled` 和 `param_override`；`param_override` 将被静默丢弃，下游的 prompt/temperature 覆盖也不会生效。
- **为 v1.0.0 GA 时间表做好准备**：项目已发布 rc.36/rc.37，但尚未公布 GA 标准（[#7279](https://github.com/QuantumNous/new-api/issues/7279)）。请固定到已知的 rc 标签，并预留 GA 正式发布后重新固定的预算。
- **SSRF 策略正在收紧**，涉及比例同步与用户 Webhook URL（[#7343](https://github.com/QuantumNous/new-api/pull/7343)、[#7344](https://github.com/QuantumNous/new-api/pull/7344)）；若你从私有/内部控制器同步比例，或将 webhook/Bark 通知发往内部主机，升级前请先确认连通性。
- **发往 xAI/Grok 或任何使用 `aspect_ratio`/`resolution` 的提供方的图像生成请求**，目前在转发时会丢失这些字段（[#7340](https://github.com/QuantumNous/new-api/issues/7340)）。若你依赖几何参数，请等待 [#7341](https://github.com/QuantumNous/new-api/pull/7341)。
- **计费准确性**：若你按输入 token 对 Anthropic 流量计费，请注意缓存 token 目前未计入（[#7305](https://github.com/QuantumNous/new-api/pull/7305)）— 请与上游账单进行对账核对。
- **新运维工具**：即将到来的 CSV 导出（[#7356](https://github.com/QuantumNous/new-api/pull/7356)）— 管理员范围的 `ExportAllLogs` 与用户范围的 `ExportUserLogs`，最多 1 万行，过滤能力与现有功能一致 — 将使运维团队可以使用规范化导出取代临时性的数据库转储，以满足用量分析需求。
- **子路径部署**：PR [#7350](https://github.com/QuantumNous/new-api/pull/7350) 引入了 `NEW_API_ROUTE_PREFIX`，可将整个服务（api/relay/dashboard/task/video/plugin）挂载在自定义前缀下 — 对反向代理与 ingress 布局很有用。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*