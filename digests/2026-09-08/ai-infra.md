# AI 基础设施日报 2026-09-08

> 生成时间: 2026-09-08 11:30 UTC | 覆盖项目: 9 个

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

# 跨项目 AI 基础设施报告 — 2026-09-08

*范围：vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth、Claude Code Router、CC Switch、New API。以下数量为今日摘要中浮出的条目，并非仓库的全量统计。*

---

## 1. 生态概览

整个生态正围绕三个压力点收敛：**混合注意力前沿模型**（Qwen3.8-Flash-Next、GLM-5.x、DeepSeek-V4），其线性注意力/DSA 组件正在打破为稠密 Transformer 构建的 KV 缓存与投机解码假设；以及 **OpenAI Responses API** 正迅速成为智能体客户端的通用语（Ollama 对齐、New API WebSocket 传输、CC Switch Codex 路由、LiteLLM 流式修复）。与此同时，**安全加固浪潮**正冲击网关与工具层（LiteLLM 未鉴权 key-hash 泄露、Unsloth Studio 提示词注入至 RCE、Ollama 调试日志保留）。跨各层的核心工程风险已从崩溃转向**静默正确性故障**——非确定性贪心解码、工具调用丢失、量化路径上的错误 logits——这些在生产中更难被发现。

---

## 2. 活跃度对比

| 项目 | 浮出 Issue | 浮出 PR | 发布状态 |
|---|---|---|---|
| **vLLM** | ~21 open（+7 closed） | ~17 | 无发布；`main` 滚动更新 |
| **SGLang** | ~23 | ~16 | 无发布；v0.5.18-cu130 参照 |
| **llama.cpp** | ~18 | ~20 | **24h 内 8 次发布**（b10840–b10856） |
| **Ollama** | ~18 | ~10 | 无发布；0.33.x 趋于稳定 |
| **LiteLLM** | ~19 | ~15 | 无发布 |
| **Unsloth** | ~16 | ~17 | 无发布；2026-02 基线 tag |
| **Claude Code Router** | 4 | 6 | 无发布 |
| **CC Switch** | ~19 | ~20 | **v3.20.2** 已发 |
| **New API** | ~10 | ~8 | **v1.0.0-rc.35** 已发 |

**解读：** 两款数据中心引擎（vLLM、SGLang）承载最深的 issue 积压，且被最新的模型族主导。llama.cpp 仍是发布节奏最快者。桌面/网关层（CC Switch、New API）持续发版，而 Ollama 与 Unsloth 处于防御性加固阶段，而非功能开发阶段。

---

## 3. 模型支持竞赛

| 模型族 | vLLM | SGLang | llama.cpp | Ollama | 网关 |
|---|---|---|---|---|---|
| **Qwen3.8-Flash-Next** | B200 性能配置 (#55890)；**A100 启动崩溃** (#54318)，**贪心解码非确定性** (#54521) | QSA 非法内存访问 (#37633)，工具解析器死循环 (#36537) | RDNA4 FA 调优进行中 (#28102) | 流式 500 (#17778，25 条评论) | 预设刷新（CC Switch #7183） |
| **GLM-5.x** | AMD CI 中的 GLM-5.2-FP8 (#53885)；**5.3-Flash 在 B200 不支持** (#54062) | NPU 支持 (#38250)；**关键 HiCache 损坏** (#38031)，H20 上 FP8-KV 损坏 (#36830) | 需求贴开放 (#27922) | — | — |
| **DeepSeek-V4** | 内联 system-message 输出错误 (#46710) | NPU 性能套件；**~245K ctx 下解码挂起** (#33549) | **Vulkan 融合超连接已发布** (b10844) | — | — |
| **Kimi-K3** | — | DP 下 KV-pool 预算 OOM (#38202) | 循环状态回滚已发布 (b10853) | — | — |
| **Nemotron / MiniMax-H3** | MTP lm-head 量化 (#54574) | VDN-H3 混合后端 (#37903) | — | — | — |
| **Diffusion / video** | — | Diffusion 组件卸载 (#36727) | **LTX-2.3 GGUF RFC** (#28541) | — | Wan 3.0（New API rc.35），Grok Imagine（LiteLLM #40238） |

**结论：** vLLM 与 SGLang 在前沿 MoE/混合支持的**广度**上领先，但伴随着未关闭的关键 bug——两者均无法宣告 GLM-5.3-Flash 或 DeepSeek-V4 长上下文 GA。llama.cpp 在**后端覆盖与场景拓展**上领先（Vulkan 现已在 DSV4 融合算子上追平 CUDA/Metal；首次进军 diffusion 推理）。网关层仅在多模态**厂商**集成上领先，这本就是它们所在层的职责。

---

## 4. 性能前沿

优化工作集中在五条战线：

1. **KV 缓存正确性与生命周期（vLLM 主导）。** 划分一致性套件（#53194 / PR #55886）、Mooncake 共享 KV 连接器 RFC（#38474）、上下文感知保留 API（#37003），以及 EAGLE/MTP 前缀缓存重算修复（#53670：~1,648 token 重算，30–40% 批吞吐损失）。SGLang 对应推出 gfx950 上的 host-tier HiCache FP8；Unsloth 正在将统一 KV 池推入 `llama-server`（#10301/#10358）。
2. **量化内核。** vLLM：借助调优过的 Triton MoE 在 B200 上 Qwen3.8-Flash-Next-FP8 TP4 +5.9–23.4%（#55890）、AITER 共享缓存注意力、A100 的 Marlin FP8 回退。llama.cpp：通过 VNNI 拼块提出 CPU k-quant matmul 3–7× 提升（#27851）、RDNA3/4 上 Vulkan int8 coopmat1（#27952）、Blackwell 上 NVFP4 W4A8（#24364）。
3. **权重/服务生命周期。** SGLang 的 Weight Cache Daemon Phase 1 是今日单点最大的运维数字：Qwen3-235B FP8 加载 **306–327s → <1s**，通过 CUDA IPC 实现（#33522）。直接攻击的是恢复时间，而非吞吐。
4. **调度与准入控制。** vLLM 长度感知批组成（#55265）；llama.cpp 会话优先级调度以削减 KV 换出抖动（#28532）；SGLang FDFO 反队头阻塞（返工待续）。
5. **分布式/拓扑。** SGLang 超越 prefill 的 Context Parallelism 路线图（#21788，16 👍）以及 DWDP 专家迁移 MoE 设计（#22084）；vLLM 在 AMD 上扩展 disaggregated（1P1D）CI。

**信号：** 前沿已从裸内核迁移到**缓存语义、恢复与调度**——一旦规模化批推理成为标配，这些才是真正起作用的杠杆。

---

## 5. 层级定位

| 层级 | 项目 | 当下特征 |
|---|---|---|
| **数据中心推理引擎** | vLLM、SGLang | 吸收架构冲击（混合注意力、MTP、FP8/FP4）；issue 体量反映了前沿模型风险。在性能调优 + disaggregated/EP 拓扑上竞争。 |
| **本地运行时** | llama.cpp（引擎）、Ollama（平台） | llama.cpp 是底层基座，在后端广度（Vulkan、Hexagon、gfx90c）以及现在的 diffusion 上创新。Ollama 增加产品表层（Responses API、解析器）并消费上游——目前正承担集成税（5× CUDA 回归 #18225、MTP 卸载 #18186）。 |
| **网关/代理** | LiteLLM（云优先）、New API（多租户/计费）、CC Switch & CCR（桌面 Agent 路由） | 各有定位：LiteLLM 在厂商广度 + 预算/路由语义；New API 在计费、插件、WebSocket Responses；CC Switch/CCR 在多 App Agent 编排（Codex/Claude 接管、分类器队列路由 #6602）。所有都在向 SSE/流式与工具调用保真度收敛，这正是难题所在。 |
| **微调** | Unsloth | 独特地横跨多层：训练侧（MLX 上的 DoRA、内置 GDN 内核）加上经由 llama.cpp 的本地推理。当下的工作更多是运维加固（安装器、ROCm 检测、Studio 安全），而非训练吞吐。 |

值得注意：各层正在**融合**——Unsloth 发版推理、llama.cpp 发布 server + 调度器、网关承担了过去属于引擎领域的协议转换（CC Switch #6814 的 thinking-block 合成）。

---

## 6. 趋势信号

**面向行业：**

- **混合注意力是新的正确性前沿。** GDN/DSA/线性注意力模型出现在 9 份摘要中的 6 份，且总是伴随 KV 缓存或状态回滚 bug（vLLM #53194 跟踪单、SGLang #37524 汇总单、Unsloth 的回滚 CI）。预期将有一个季度的一致性套件建设，才能让这些模型走向平淡无奇。
- **投机解码 × 量化 = 静默漂移。** llama.cpp #25618（Q4_K_M 目标上的贪心发散）、vLLM #54521（temperature-0 非确定性）、Ollama #18302（tensor split 下 MTP 损坏）。MTP/EAGLE 是生产默认的延迟技术，但在非平凡配置上仍通不过黄金输出测试。
- **Responses API 是智能体契约。** 四个项目今日对它进行了加固（Ollama、New API WS 传输 #6914、LiteLLM 流式修复 #40232、CC Switch 经 Responses 走 Grok）。押注它不被采纳已经站不住脚。
- **安全债正在路由层被偿还。** LiteLLM 未鉴权 401/403 泄露（#40217/#39757）、Unsloth 无标记的工具调用 RCE（#6967）、Ollama 调试日志保留（#18210）。任何把这些暴露给不可信输入的人，都应把本周视为补丁周。
- **供应商多元化是真实的。** Ascend NPU（SGLang）、ROCm/gfx90c/RDNA4（llama.cpp、vLLM、Unsloth）、Intel XPU（SGLang、vLLM）、Hexagon。在任何层级上"NVIDIA 优先"都不再是安全的工程假设。

**智能体/应用开发者应关注：**

1. **将静默失败视为默认失败模式。** 在精确的 model+quant+spec-config 组合上跑黄金输出冒烟测试（Ollama 在低比特量化下 HumanEval+ 0/15，#18252；llama.cpp gfx1151 错误 logits #28211）。
2. **固定版本，而非浮动。** 今天就有具体的有害窗口：Ollama 0.32.11–0.32.15 与 0.33.x CUDA；New API rc.35 走 Ollama 通道的工具调用（#7252）；SGLang 处理 DSV4 >200K 上下文（#33549）以及 GLM-5.3-Flash HiCache（#38031）；vLLM A100 上的 Qwen3.8-Flash-Next（#54318）。
3. **客户端取消是必需的**，用于长上下文流式（SGLang 僵尸请求回归 #36333；New API 将取消计入失败 #7134——你的可靠性看板可能在说谎）。
4. **长生命周期的智能体会话正在重塑调度器**（llama.cpp #28532 会话优先级、Unsloth 统一 KV、vLLM 保留 API）。这些落地后重新评估并发假设。
5. **关注 LiteLLM #40231（key-hash 泄露修复）与 Unsloth #6967（RCE 修复）的合入**，并轮换在此期间已暴露的凭证。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-08

## 今日要点

今天的流量主要被推测解码 + 混合架构（Qwen3.8-Flash-Next、GLM-5.x、Nemotron）以及一组正在被形式化为一致性测试套件的 KV-cache 分区 bug 主导（[#53194](https://github.com/vllm-project/vllm/issues/53194)、[PR #55886](https://github.com/vllm-project/vllm/pull/55886)）。一项重要的性能合入来自 [PR #55890](https://github.com/vllm-project/vllm/pull/55890) —— 通过调优的 Triton MoE，在 B200 上为 Qwen3.8-Flash-Next-FP8 TP4 带来 **5.9–23.4% 的吞吐提升**。过去 24 小时内未发布新版本。

## 版本与破坏性变更

*过去 24 小时内未发布新版本。* 已合并的 PR 流中没有迹象表明即将发布破坏性版本；滚动 `main` 持续添加新的量化路径（A100 上的 Cutlass FP8、独立的 MTP lm head），但对现有 API 没有造成 churn。

## 新增模型与硬件支持

- **[PR #55890](https://github.com/vllm-project/vllm/pull/55890)** — Qwen3.8-Flash-Next-FP8 TP4 Triton MoE 配置，面向 B200（E=512，top-k=10，32×32 FP8 block）。
- **[PR #53885](https://github.com/vllm-project/vllm/pull/53885)** — `GLM-5.2-FP8` 加入 AMD MoRIIO 分离式 CI 目录（1P1D TP8 和 Wide-EP DP8），使用 AITER 内核实现 MLA/MoE/RMSNorm/fusion。
- **[PR #54574](https://github.com/vllm-project/vllm/pull/54574)** — 启用 `nemotron_h_mtp` 为 MTP 推测解码使用独立的（可选量化的）lm head。
- **[PR #55817](https://github.com/vllm-project/vllm/pull/55817)** — `torch.compile` 为 `SarvamMLAModel` 启用，并对 `input_ids`、`positions`、`intermediate_tensors`、`inputs_embeds` 显式声明动态维度。
- **[Issue #54062](https://github.com/vllm-project/vllm/issues/54062)** — GLM-5.3-Flash 的 `Glm5NextTextLinearAttention` **尚不支持**；在 B200 上报告。
- **[Issue #38425](https://github.com/vllm-project/vllm/issues/38425)** — Transformers v5 meta-device 加载路径仍处于验证阶段（针对 InternVL2）。
- **[PR #55889](https://github.com/vllm-project/vllm/pull/55889)** — ColQwen3 模型现在在六个池化测试中按模块仅加载一次（18 次加载 → 3 次），无 API 变更。

## 性能与优化

- **[PR #55890](https://github.com/vllm-project/vllm/pull/55890)** — Qwen3.8-Flash-Next-FP8 TP4 在 B200 上：在 14 个 token 数（1–8192）范围内，模型吞吐 **+5.9% 到 +23.4%**，相对于先前的 Triton 配置测得。
- **[PR #55154](https://github.com/vllm-project/vllm/pull/55154)** — 新增 HY V4 iHC head 算子、自定义算子注册，以及面向大 batch 的 tensor-core 路径（延续 #55059）。
- **[PR #55888](https://github.com/vllm-project/vllm/pull/55888)** — FlexAttention 在请求数变化时不再重新编译；持久的 Q-offset / seq-len buffer 在单请求 batch 下保持 CUDA-graph capture。
- **[PR #55864](https://github.com/vllm-project/vllm/pull/55864)** — 对 FlashInfer 省略 K/V 时 KV 共享的窄域修复（解决 #55789 回归，保留 #54917）。
- **[PR #55887](https://github.com/vllm-project/vllm/pull/55887)** — AITER attention 现在在（分块）prefill 期间从共享 cache 读取 K/V；gather workspace 按 group 作用域限定。覆盖 NHD/SHUFFLE、FP8 cache、sliding window。
- **[Issue #41784](https://github.com/vllm-project/vllm/issues/41784)** — 与 LMCache 一起的 KV prefetch 可能启动过晚并造成 GPU 闲置；附有 RFC 风格的分析。
- **[Issue #53670](https://github.com/vllm-project/vllm/issues/53670)** — EAGLE/MTP prefix-cache last-block drop 在混合 Qwen3.8 GDN 布局上每次命中强制 **1,648 token 的重算**，在 prefix 复用工作负载上测得 **约 30–40% 的 batch 吞吐损失**。
- **[PR #55170](https://github.com/vllm-project/vllm/pull/55170)** *（已关闭）* — 在 SM120/121 上优先 W4A4 NVFP4 而非 W4A16；作为 W4A4 NVFP4 kernel 路径落地于 Blackwell Max-Q。

## 稳定性与回归

大致按严重程度/影响范围排序。

1. **[Issue #54521](https://github.com/vllm-project/vllm/issues/54521)** — `Qwen3.8-Flash-Next-FP8` 的贪心解码在 prompt 长度接近 `indexer_budget` 时于 SM121/GB10 上**非确定性**：在 `temperature=0` 下五个字节级相同的请求返回五个不同的补全。与 Qwen Sparse Attention 从 dense 切换到 top-k 选择后 prefill 中的 `persistent_topk` 有关。**尚无修复 PR。**
2. **[Issue #54318](https://github.com/vllm-project/vllm/issues/54318)** — Qwen3.8-Flash-Next-FP8 **在 4× A100（`SM 8.0`）上无法启动**，因为 SM80 不支持 `fp8e4nv`。**已有修复：** [PR #55884](https://github.com/vllm-project/vllm/pull/55884) 通过 `cutlass_fp8_supported` 将 A100 FP8 linear 路由到 Marlin。
3. **[Issue #54062](https://github.com/vllm-project/vllm/issues/54062)** — GLM-5.3-Flash 在 B200（CUDA 13，驱动 580）上无法启动；不支持 `Glm5NextTextLinearAttention`。
4. **[Issue #53726](https://github.com/vllm-project/vllm/issues/53726)** — 在 RTX 3090 上使用混合 GDN + MTP k=3 + 异步调度时出现静默 CUDA illegal-memory access（exit 0）；**在 #50021/#45100/#53613 类的硬化修复之后仍存在**。无修复 PR。
5. **[Issue #37754](https://github.com/vllm-project/vllm/issues/37754)** — 在 SM121/DGX Spark 上为 Nemotron-3-Super-120B-A12B-NVFP4（GQA=16）服务时，FlashInfer + MTP 推测解码 **illegal memory access**。Triton 后端可用。
6. **[Issue #46710](https://github.com/vllm-project/vllm/issues/46710)** — DeepSeekV4-Flash 在 PR #46025 的 `preserved in-place` 路径之后，**对内联系统消息生成不正确的输出**；行为因模板是抛出、剥离还是保留而出现分歧。无修复 PR。
7. **[Issue #49210](https://github.com/vllm-project/vllm/issues/49210)** — 在 Qwen3.6-27B-NVFP4 上使用 MTP + xgrammar 时出现 Engine-core livelock（CPU 100%，无崩溃），**v0.24.0 的回归**（在 0.25.1 上复现）。
8. **[Issue #41515](https://github.com/vllm-project/vllm/issues/41515)** — `kv_offload + HMA` 在第二个 chat 请求时失败。
9. **[Issue #54094](https://github.com/vllm-project/vllm/issues/54094)** — DFlash2 + YaRN：相同的 1.04M prompt **零 prefix-cache 复用**，而 target-only 复用约 1.039M token（Blackwell Max-Q，RTX PRO 6000）。
10. **[Issue #31624](https://github.com/vllm-project/vllm/issues/31624)** — ModelOpt Llama-4（Scout-17B-16E-Instruct-FP8）即使从 CPU page cache 加载权重也需要 **5 分钟以上**，原因是遗留的 MoE state-dict reshape 路径。
11. **[Issue #50269](https://github.com/vllm-project/vllm/issues/50269)** — 在 Intel XPU 上，模型加载后主机内存不下降。
12. **已关闭但值得注意：**
    - [Issue #52735](https://github.com/vllm-project/vllm/issues/52735) — `OffloadingConnector` 在 XPU 上的 MTP/EAGLE + 混合 GDN 下被存储但从未被服务。
    - [Issue #41622](https://github.com/vllm-project/vllm/issues/41622) — 在 ROCm 上使用 LoRA 时 CUDA-graph capture `hipErrorCapturedEvent` 崩溃。
    - [Issue #41494](https://github.com/vllm-project/vllm/issues/41494) — `Qwen3ForEmbedding` 回归。
    - [Issue #37847](https://github.com/vllm-project/vllm/issues/37847) — v0.18.0 cu128 发布 wheel URL 在文档中 404。
- **KV-cache 分区 bug（活跃追踪）：** [Issue #53194](https://github.com/vllm-project/vllm/issues/53194) 汇总了约 10 个独立缺陷，这些缺陷中某个维度在某些层级或路径下未能对 KV-cache keyspace 进行分区；[PR #55886](https://github.com/vllm-project/vllm/pull/55886) 启动了针对跨 OpenAI 入口点 `cache_salt` 存活性的 conformance suite。
- **Prefix-cache 正确性修复落地：**
  - [PR #52244](https://github.com/vllm-project/vllm/pull/52244) — 在 MTP 推测解码下恢复混合 GDN prefix-cache 命中（需要 rebase）。
  - [PR #54998](https://github.com/vllm-project/vllm/pull/54998) — `SimpleCPUOffload` 针对 prompt-logprob 请求遵守 `skip_reading_prefix_cache`。
  - [PR #55674](https://github.com/vllm-project/vllm/pull/55674) — 修复 Triton/ROCm cascade-attention meta builder 中的 `UnboundLocalError`。
  - [PR #55869](https://github.com/vllm-project/vllm/pull/55869) — 修复 `lru_cache` 中 `HashableDict`/`HashableList` 嵌套值导致的崩溃。

## 进行中的 RFC 与设计

- **[Issue #38474](https://github.com/vllm-project/vllm/issues/38474)** — 用于跨实例共享 KV cache 复用的 Mooncake Store Connector（RFC）。
- **[Issue #37003](https://github.com/vllm-project/vllm/issues/37003)** — 上下文感知的 KV-Cache 保留 API（针对 agentic 工作负载的优先级驱逐；llm-d 追踪文档）。
- **[Issue #42259](https://github.com/vllm-project/vllm/issues/42259)** — Model Runner V2 下 Logprobs/Logits 语义与确定性。
- **[Issue #55265](https://github.com/vllm-project/vllm/issues/55265)** — 用于入队调度的长度感知 batch 组成（V1）；包含公平性修复提案。
- **[Issue #54864](https://github.com/vllm-project/vllm/issues/54864)** — `thinking_token_budget` 的截断模式（比当前的 `reasoning_end_str` 强制方式更适合 RL rollout）。
- **[Issue #49569](https://github.com/vllm-project/vllm/issues/49569) / [PR #55485](https://github.com/vllm-project/vllm/pull/55485)** — `tests/` 中的增量 MyPy 推广（4/N：中等难度目录）。

## 对应用开发者的意义

- **Qwen3.8-Flash-Next-FP8 在 A100 上目前已坏**，启动即失败。如果你被锁定在 A100，要么等待 [#55884](https://github.com/vllm-project/v

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-08

## 1. 今日要点

过去 24 小时内没有新发布,活动主要集中在**最新模型类的稳定性工作**(DeepSeek-V4、GLM-5.3-Flash、Qwen3.8-Flash-Next)以及**面向 NPU/AMD/Intel XPU 的硬件适配 PR**。最具影响力的工程信号是 **Weight Cache Daemon 第一阶段**落地(Qwen3-235B FP8 加载 306–327s → <1s),加上一个严重的 **DeepSeek-V4 在 8×H20 上约 245K 上下文处 decode 卡死**问题,看门狗会杀掉服务进程。预计本周会有更多针对 DSA 类模型以及 Blackwell/NPU 矩阵覆盖的工作。

## 2. 发布与破坏性变更

*过去 24 小时内没有新发布。*

- **v0.5.18-cu130** 仍是用户 bug 报告中参照的镜像(例如 [#38300](https://github.com/sgl-project/sglang/issues/38300))。
- 文档清理:[#38497](https://github.com/sgl-project/sglang/pull/38497) 从 Ascend `support_features.mdx` 中移除了一个幽灵 CLI flag(`--custom-sigquit-handler`,这是仅 Python 引擎字段)。

## 3. 新模型与硬件支持

- **GLM-5.2 on Ascend 950PR/DT NPU** 配 FP8 KV cache 与 MLAProlog — [#38250](https://github.com/sgl-project/sglang/pull/38250)。
- **DeepSeek-V4 on NPU**:主机内存缓存管理 ([#37382](https://github.com/sgl-project/sglang/pull/37382))、原生 MRoPE ([#36959](https://github.com/sgl-project/sglang/pull/36959))、以及 CP allgather/bmm overlap ([#38299](https://github.com/sgl-project/sglang/pull/38299))。
- **AMD DSV4 (gfx950)**:FP8 unified attention 上的 HiCache ([#37778](https://github.com/sgl-project/sglang/pull/37778))、FP8 双池统一 KV ([#37413](https://github.com/sgl-project/sglang/pull/37413))。
- **Intel XPU**:使用 `intel_xpu` attention backend 的 speculative decoding(仅 topk=1)— [#30548](https://github.com/sgl-project/sglang/pull/30548);XPU 上的 DFLASH speculative decoding — [#32798](https://github.com/sgl-project/sglang/pull/32798)。
- **VDN-H3 (MiniMax-H3 混合窗口 softmax + Video Delta 线性注意力,8-NFE DMD2 蒸馏)** — 新增 `hybrid_window_attn_h3` backend — [#37903](https://github.com/sgl-project/sglang/pull/37903)。
- **GLM-5.3-Flash SM120 资格追踪** — [#37813](https://github.com/sgl-project/sglang/issues/37813);bug umbrella — [#37524](https://github.com/sgl-project/sglang/issues/37524)。
- **ROCm 消费级 GPU 支持** issue 被标记为 inactive — RDNA3 (`gfx1100`) fused-MoE 因上游 Triton AMD bug 被阻塞,见 [#30245](https://github.com/sgl-project/sglang/issues/30245)。

## 4. 性能与优化

- **快速引擎恢复:Weight Cache Daemon — 第一阶段已发布** ([#33522](https://github.com/sgl-project/sglang/issues/33522))。每 rank 的守护进程持有量化后权重,并通过 CUDA IPC 提供,**将 Qwen3-235B FP8 权重加载从 306–327s 缩短到 <1s**。关联 LMSYS 博客:2026-08-21。
- **dLLM FDFO 调度器**,用于消除 `LowConfidence` 风格批处理中的队头阻塞 — [#25280](https://github.com/sgl-project/sglang/pull/25280)(已关闭,可能会重做)。
- **Mamba prefix-cache SSM checkpoint 使用正确 dtype** — [#34820](https://github.com/sgl-project/sglang/pull/34820)(高优先级):此前不论配置的 SSM dtype 如何,都被固定为 bf16。
- **Diffusion:通过分层式主机存储实现免 D2H 组件卸载** ([#36727](https://github.com/sgl-project/sglang/pull/36727))以及**共享 CPU/GPU 池上的文件后备融合权重拷贝** ([#37819](https://github.com/sgl-project/sglang/pull/37819) → [#37822](https://github.com/sgl-project/sglang/pull/37822))。面向共享内存/GB10 级设备。
- **DiT RoPE 统一** 置于 `CustomOp` 之后(NPU/diffusion)— [#33555](https://github.com/sgl-project/sglang/pull/33555)。
- **路线图:Context Parallelism (2026 Q3)** — [#21788](https://github.com/sgl-project/sglang/issues/21788) 追踪将 CP 从 prefill 扩展到 decode + 异构 attention;高优先级,16 👍。
- **DWDP (Distributed Weight Data Parallelism) 用于 Sparse MoE** — [#22084](https://github.com/sgl-project/sglang/issues/22084):MoE 路径上的异步点对点专家权重传输,不使用 AllReduce/AllGather。
- **AITER 升级就绪度追踪** — [#21302](https://github.com/sgl-project/sglang/issues/21302)。
- **NVFP4 / trtllm MHA** for Gemma4 — [#26596](https://github.com/sgl-project/sglang/issues/26596) 已关闭/不活跃;多数条目仍未关闭。

## 5. 稳定性与回归

按严重程度 / 生产影响范围排序。

1. **[严重] DeepSeek-V4 (`dsv4` + DSPARK) TP=8 on 8×H20 — 在约 245K 上下文处 decode forward 卡死** ([#33549](https://github.com/sgl-project/sglang/issues/33549),8 条评论)。所有 GPU 都满转 100% util / 低功耗;看门狗杀掉服务进程。目前尚无修复 PR。
2. **[严重] GLM-5.3-Flash + HiCache — host 层 load-back 损坏生成结果** ([#38031](https://github.com/sgl-project/sglang/issues/38031),4 👍):在不使用 speculative decoding 的 8×H100 TP8 上,出现工具调用被丢弃、退化的复读循环。在 [#37524](https://github.com/sgl-project/sglang/issues/37524) 下追踪。
3. **[高] GLM-5.3-Flash 无法在 SM90 (8×H20) 上使用 FP8 KV cache** ([#36830](https://github.com/sgl-project/sglang/issues/36830))。`index_kpool: 4` 排除了 `flashmla_kv`;没有 CUDA DSA backend 支持 bf16-query × fp8-KV。相同硬件/镜像下 GLM-5.2 可正常工作。
4. **[高] Qwen3.8-Flash-Next + `qwen3_coder` 工具解析器在 token ID 0 上循环** ([#36537](https://github.com/sgl-project/sglang/issues/36537),15 条评论,高优先级)。Day-0 官方镜像。
5. **[高] B300 上 TP2 hang with HiCache + breakable prefill CUDA graphs + FlashInfer MNNVL** ([#38300](https://github.com/sgl-project/sglang/issues/38300),3 条评论)。在 `sglang:v0.5.18-cu130` / FlashInfer 0.6.17 上复现。
6. **[高] QSA extend forward CUDA 非法内存访问,8 个并发请求** on Qwen3.8-Flash-Next-FP8 / H20 TP8 ([#37633](https://github.com/sgl-project/sglang/issues/37633));在 `CUDA_LAUNCH_BLOCKING=1` 与 `--disable-overlap-schedule` 下被抑制。
7. **[高] GLM-5.2 FP4 + EAGLE 非法内存访问** 出现于 `flashinfer_trtllm` bf16 batched-GEMM(nextn draft MoE);triton nextn 路径在 #30137 之后被 HIP 门控 ([#30209](https://github.com/sgl-project/sglang/issues/30209))。
8. **[中] SM10x 门控内核在 B300 (sm_103) 上失效** — `cutedsl` TGV BF16 GEMM Xid 13 CGA "CTA Not Present" 以及 `trtllm-gen` MoE finalize hang ([#34340](https://github.com/sgl-project/sglang/issues/34340))。根因:`is_sm100_supported()` 是家族性检查(`major == 10`)。
9. **[中] FlashInfer backend 在 Blackwell GPU 上不受支持** — [#35080](https://github.com/sgl-project/sglang/issues/35080)。
10. **[中] 流式客户端断开 → 僵尸请求 decode 到 `max_tokens`** 并刷出 "state was deleted in TokenizerManager";**#34160 revert 引起的回归** — [#36333](https://github.com/sgl-project/sglang/issues/36333)。
11. **[中] DFLASH/DSPARK draft KV 池预算使用 `tp_size` 而非 `attn_tp_size`** → 在 Kimi-K3 上 DP attention 下 OOM — [#38202](https://github.com/sgl-project/sglang/issues/38202)。
12. **[低] DFlash 在追踪边界处漏掉 Mamba checkpoints** — [#37817](https://github.com/sgl-project/sglang/issues/37817)。
13. **[低] DeepSeek-V4-Flash-Vision 多轮工具调用被包裹在 `{"arguments": {...}}`** 中 — [#38450](https://github.com/sgl-project/sglang/issues/38450)。

需关注的已关闭/不活跃条目(无在修修复):
- ROCm RDNA3 fused-MoE 被阻塞 ([#30245](https://github.com/sgl-project/sglang/issues/30245))。
- FP8 在线量化错误地量化了 GDN gate projections ([#30598](https://github.com/sgl-project/sglang/issues/30598))。
- 来自 `transformers` 5.8 → 5.12.1 的精度回归 ([#30632](https://github.com/sgl-project/sglang/issues/30632))。
- Detokenizer worker 负载不均 ([#29366](https://github.com/sgl-project/sglang/issues/29366))。
- 用于 `cache_salt` / 多模态 ID 的 KV-events `extra_keys` ([#27682](https://github.com/sgl-project/sglang/issues/27682))。

## 6. 对应用开发者的影响

- **谨慎锁定最新的 DSA 模型。** DeepSeek-V4(dsv4 backend)与 GLM-5.3-Flash 在具有生产意义的上下文长度(DSV4 ≥245K、GLM-5.3 中段上下文)上都存在开放的高严重性 bug。在 #33549 / #37524 关闭前,请将其视为**长上下文工作负载未 GA**。
- **长上下文流式需要显式的客户端取消。** 与 #34160 相关的僵尸 bug 意味着半关闭的 SSE/stream 请求仍会消耗 GPU 并产生 `max_tokens` 长度的错误级联。请始终从客户端取消并加上上游超时。
- **GLM-5.3-Flash on H20:暂勿启用 FP8 KV cache** ([#36830](https://github.com/sgl-project/sglang/issues/36830))。在 H100 上,该模型也应避免使用 HiCache,直到 #38031 解决。
- **在 B200/B300 上对 GLM-5.2 使用 EAGLE 时,优先选择 `modelopt_fp4` + 非 FlashInfer 路径**,直到 #30209 中的 `flashinfer_trtllm` nextn-MoE 路径修复。Triton nextn 路径被 HIP 门控。
- **FP8/MoE 部署的权重加载时间即将大幅下降**,通过 Weight Cache Daemon ([#33522](https://github.com/s

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp Digest — 2026-09-08

## 今日要点

今日 Vulkan 与后端对齐是重头戏：Vulkan 终于落地了 DeepSeek-V4 超连接（hyper-connection）的融合算子（[b10844](https://github.com/ggml-org/llama.cpp/releases/tag/b10844)），并新增了面向 AMD RDNA3/4 的 int8 coopmat1 矩阵乘法（[#27952](https://github.com/ggml-org/llama.cpp/pull/27952)），至此与 CUDA 和 Metal 全面对齐。与此同时，量化目标下的投机解码仍持续暴露出正确性偏移问题（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)）；而 LTX-2 扩散模型 GGUF 生成的新 RFC（[#28541](https://github.com/ggml-org/llama.cpp/issues/28541)、[#28540](https://github.com/ggml-org/llama.cpp/pull/28540)）则标志着 llama.cpp 正在向 LLM 之外的领域扩张。

---

## 发布与破坏性变更

24 小时内发布了 8 个 b 编号版本，除 chat 重构外均属后端内部变更：

- **b10856** — `chat.cpp` 模板解析器拆分到 `common/parsers/*`（每个模板一个文件），与 `src/models` 的布局保持一致。无行为变更，更便于新增聊天模板。（[PR #27764](https://github.com/ggml-org/llama.cpp/pull/27764)）
- **b10855** — OpenCL 后端：正确处理 `conv2d` 的非连续输入。（[PR #28503](https://github.com/ggml-org/llama.cpp/pull/28503)）
- **b10853** — Model：Kimi-K3 循环状态（recurrent-state）回滚支持。（[PR #28466](https://github.com/ggml-org/llama.cpp/pull/28466)）
- **b10852** — Hexagon 后端：新增 `RELU` 与 `LEAKY_RELU` 算子。（[PR #28585](https://github.com/ggml-org/llama.cpp/pull/28585)）
- **b10850** — Tests：将 `L2_NORM` 的 batch count 绑定到局部变量，以消除 GCC maybe-uninit 告警。
- **b10844** — Vulkan：新增 `DSV4_HC_COMB/PRE/POST` 融合算子（补齐与 CUDA/Metal 的功能对齐）。（[PR #26578](https://github.com/ggml-org/llama.cpp/pull/26578)）
- **b10842** — ggml：HIP 新增对 gfx90c（Radeon APU）的支持。（[PR #26454](https://github.com/ggml-org/llama.cpp/pull/26454)）
- **b10840** — CUDA：mmvq 中 Q4_K/Q5_K 无分支解包 + DGX Spark 上的 L2 预取；在 batch > 1 时获得性能提升，目前在 DGX Spark 上暂未启用。（[PR #26705](https://github.com/ggml-org/llama.cpp/pull/26705)）

无 API/配置层面的破坏性变更。macOS arm64 与官网产物（`llama.app`）随每次构建持续发布。

---

## 新增模型与硬件支持

- **DeepSeek-V4 超连接（hyper-connection）** — 已在 CUDA、Metal，以及新近加入的 Vulkan 上完全融合（[b10844](https://github.com/ggml-org/llama.cpp/releases/tag/b10844)）。
- **Kimi-K3** — 新增循环状态回滚支持（[b10853](https://github.com/ggml-org/llama.cpp/releases/tag/b10853)）。
- **AMD gfx90c** — HIP 后端新增支持（[b10842](https://github.com/ggml-org/llama.cpp/releases/tag/b10842)）。
- **AMD gfx1201（RDNA4、R9700）** — Flash Attention 调优进行中（[#28102](https://github.com/ggml-org/llama.cpp/pull/28102)），目标是为 Qwen3.8 27B 提升 prefill 性能。
- **NVFP4 W4A8 on Blackwell** — PR [#24364](https://github.com/ggml-org/llama.cpp/pull/24364) 强制 NVFP4_W4A16 层使用 W4A8；为输出权重新增 GGUF 元数据。
- **GLM5.3（flash）** — 公开功能请求（[#27922](https://github.com/ggml-org/llama.cpp/issues/27922)，👍 13）。
- **LTX-2.3 diffusion GGUF** — RFC 与面向图像/视频/音频生成的服务器草案（[#28541](https://github.com/ggml-org/llama.cpp/issues/28541)、[#28540](https://github.com/ggml-org/llama.cpp/pull/28540)）。将提供 OpenAI 兼容的 `/v1/images/generations` 接口。
- **自适应 MTP draft 深度** — 新增 `--spec-type draft-mtp-adaptive`（[#27210](https://github.com/ggml-org/llama.cpp/pull/27210)，建议搭配 `--spec-draft-n-max 12` 使用）。
- **Metal MiniCPM3** — 自动 flash-attention 选择在 `(dk, dv)=(96, 64)` 时崩溃；修复见 [#28599](https://github.com/ggml-org/llama.cpp/pull/28599)。
- **qwen4exp `-sm tensor`** — 在 Meta device 上出现调度器放置中止后已重新启用（[#28569](https://github.com/ggml-org/llama.cpp/pull/28569)）。

---

## 性能与优化

- **CPU mul_mat for k-quants（提议中）**：[#27851](https://github.com/ggml-org/llama.cpp/pull/27851) — 基于 256×256 int8 窗口、使用 VNNI 的通用 tiled mul_mat，声称 **CPU k-quant 矩阵乘法快 3–7 倍**。
- **Vulkan int8 coopmat1（提议中）**：[#27952](https://github.com/ggml-org/llama.cpp/pull/27952) — 新增面向 RDNA3/4 的 MMQ cm1 shader，覆盖 q4_0/q4_1/q5_0/q5_1/q8_0/q3_k/q4_k/q5_k/q6_k/mxfp4/nvfp4/iq4_nl；Strix Halo 上 prefill 大幅提升。
- **CUDA Q4_K/Q5_K mmvq**：无分支解包避免了按列重复执行 scale，在 batch > 1 时更快（[b10840](https://github.com/ggml-org/llama.cpp/releases/tag/b10840)）。
- **Vulkan Intel coopmat1**：Xe1-ARL_H 的 f16 B-type 流水线 + warp-tile 调优（[#27471](https://github.com/ggml-org/llama.cpp/pull/27471)）。
- **Metal fa-vec 调优已落地**：
  - M3 Max、M5、M5 Pro 的调优行已合入（[#27863](https://github.com/ggml-org/llama.cpp/pull/27863)）。
  - M5 Max F16 D=512 decode 调优 `{1,4}→{1,2}`（NE2 胜出，约 269.5 对 314/315）（[#28534](https://github.com/ggml-org/llama.cpp/pull/28534)）。
- **Vulkan 子分配（suballocation）**：通过 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB` 修复 **131k 上下文下约 78% 的 decode 悬崖（[#27734](https://github.com/ggml-org/llama.cpp/issues/27734)）**。
- **服务器调度**：[#28532](https://github.com/ggml-org/llama.cpp/pull/28532) 优先服务已有会话而非排队中的会话，以减少 KV-swap 抖动。
- **Vulkan lazy-mode 回归**：`qwen4exp` 在 AMD iGPU 上的 pp512 因 lazy-mode 改动减半；重构 PR [#28326](https://github.com/ggml-org/llama.cpp/pull/28326) 将 `auto` 含义改为「挑选一个合适的模式」，并将旧 `auto` 迁移到 `large`。

---

## 稳定性与回归

按严重程度/影响范围排序：

1. **量化目标下投机解码发散**（[#25618](https://github.com/ggml-org/llama.cpp/issues/25618)，22 条评论）— 当 **target 为 Q4_K_M** 时，greedy `temperature=0` 输出与 vanilla 不一致；ngram spec 与 bf16 target 均正常。疑似 target 量化处理中 draft-mtp/draft-dspark 不匹配。**开放，无修复 PR。**

2. **RTX 5090 显示器丢失 / GSP 重置**（[#27910](https://github.com/ggml-org/llama.cpp/issues/27910)）— 在 RTX 5090/Linux 上运行 Qwen3.8-27B Q6_K 可导致整屏黑屏；只能重启恢复。**开放，无修复 PR。**

3. **flash-attn 路径上的 CUDA 非法内存访问**（[#26609](https://github.com/ggml-org/llama.cpp/issues/26609)）— Qwen3.6-35B MoE + 部分专家卸载时，在 `cudaStreamSynchronize` 处确定性崩溃；b10107/b10243 均可复现；关闭 `-fa` 后消失。**开放，无修复 PR。**

4. **Vulkan 在 Vega 8 iGPU 上约 50K 上下文出现 DeviceLost**（[#26447](https://github.com/ggml-org/llama.cpp/issues/26447)，12 条评论）— `vk::Queue::submit: ErrorDeviceLost`，更小的模型能撑得更久。**开放。**

5. **Blackwell GGML-CUDA SOFT_MAX 崩溃**（[#25060](https://github.com/ggml-org/llama.cpp/issues/25060)）— RTX 5090 / CUDA 13.3 / Driver 580.17 上的 35B 模型。**开放，无修复 PR。**

6. **draft-mtp 在 AMD RADV gfx1151 上提示词中途 DeviceLost**（[#27306](https://github.com/ggml-org/llama.cpp/issues/27306)）— `common_speculative_process` 在每次 prefill ubatch 后调用 `llama_decode(ctx_dft)`；在数万 token 之后出现。**开放。**

7. **Intel Arc A770 上 Vulkan GGML_ASSERT**（[#28247](https://github.com/ggml-org/llama.cpp/issues/28247)）— 运行 Qwen 3.8 flash next 时 `wg0 > ctx->device->properties.limits.maxComputeWorkGroupCount`。**开放。**

8. **多卡 Arc 上的 SYCL/OpenCL P2P**（[#27168](https://github.com/ggml-org/llama.cpp/issues/27168)）— dev2dev memcpy 上出现 `ur_die 'Experimental P2P feature is not implemented for OpenCL adapter'`。**开放。**

9. **HIP/ROCm gfx1151 输出错误 logits（静默）**（[#28211](https://github.com/ggml-org/llama.cpp/issues/28211)）— **不会崩溃**，仅在 Strix Halo 上 prompt > n_ubatch 时输出错误结果。尤其危险——属于纯正确性 bug。

10. **`ggml_gallocr` 静默复用陈旧 plan**（[#28448](https://github.com/ggml-org/llama.cpp/issues/28448)）— 当同一图位置的节点身份发生变化时，`needs_realloc()` 返回 false；会破坏稀疏 MoE 输出。**开放，无修复 PR。**

11. **致命初始化 OOM 之前服务器即上报 "model loaded"**（[#27309](https://github.com/ggml-org/llama.cpp/issues/27309)）— Metal 初始化期间 OOM 仍会绑定端口；每个请求都返回 500。**开放。**

12. **RTX 5060 Ti 16GB 上 IQ3_S 输出乱码**（[#28581](https://github.com/ggml-org/llama.cpp/issues/28581)）— Blackwell 专属的量化正确性回归。**开放。**

13. **Qwen + 约 48 字段工具下并行 tool_calls 被破坏/挂起**（[#28522](https://github.com/ggml-org/llama.cpp/issues/28522)）— 影响使用 OpenAI 兼容工具调用的智能体工作负载。

14. **已关闭（陈旧）**：SYCL 在第二个提示词上输出乱码（[#26845](https://github.com/ggml-org/llama.cpp/issues/26845)）、b9660→b9672 之间的 Vulkan Strix Halo 回归（[#24734](https://github.com/ggml-org/llama.cpp/issues/24734)）、cublasSgemm_v2 大上下文错误（[#25061](https://github.com/ggml-org/llama.cpp/issues/25061)）、陈旧的 `tools/ui/dist` 阻塞 headless 构建（[#25443](https://github.com/ggml-org/llama.cpp/issues/25443)）、多 batch decode 性能（[#25804](https://github.com/ggml-org/llama.cpp/issues/25804)）。

---

## 对应用开发者的启示

- **在 #25618 解决之前，请将量化目标上的投机解码视为不安全。**若你的智能体流水线依赖 `draft-mtp` 或 `draft-dspark` 来降低延迟，请针对具体的量化目标，与非投机基线做一次 golden-output 冒烟测试。ngram spec 暂时是更稳妥的回退方案。
- **iGPU/Vulkan 上的长上下文（>50K）尚未足够稳健。**两份相互独立的 `ErrorDeviceLost` 报告（Vega 8 iGPU、RADV gfx1151）以及 RDNA3 上 131k 上下文的悬崖（[#27734](https://github.com/ggml-org/llama.cpp/issues/27734)）表明：面向生产的长上下文服务器应在 RDNA3 上固定 `GGML_VK_SUBALLOCATION_BLOCK_SIZE=4 GiB`，并在 iGPU 上对极长上下文避免使用 Vulkan，直至修复落地。CUDA Blackwell 长上下文也有自身的不稳定问题（[#27910](https://github.com/ggml-org/llama.cpp/issues/27910)）——请固定到已知良好的构建，或关闭 `-fa`。
- **请仔细跟踪你的构建版本号。**24 小时内 8 个 b 编号意味着产物可以滚动发布，但目标一直在变；回归 PR（lazy-mode iGPU [#28326](https://github.com/ggml-org/llama.cpp/pull/28326)、MiniCPM3 FA [#28599](https://github.com/ggml-org/llama.cpp/pull/28599)）各自只修复特定模型/架构——按模型维护 CI 矩阵正变得越来越必要。
- **Vulkan 正在成为 AMD 的一类后端。**RDNA3/4 int8 coopmat1（[#27952](https://github.com/ggml-org/llama.cpp/pull/27952)）加上 DeepSeek-V4 融合算子（[b10844](https://github.com/ggml-org/llama.cpp/releases/tag/b10844)）缩小了与 CUDA/Metal 的差距。若你在 Strix Halo 或 RDNA3 dGPU 上交付，请重新基准测试——但也要留意 ANV 上开放的 flash-attn 回退回归（[#27638](https://github.com/ggml-org/llama.cpp/issues/27638)）以及 Arc 上的 `maxComputeWorkGroupCount` 断言（[#28247](https://github.com/ggml-org/llama.cpp/issues/28247)）。
- **服务器调度正在向吞吐倾斜而非延迟**（[#28532](https://github.com/ggml-org/llama.cpp/pull/28532)）。若你有严格的每请求 SLO，请在部署前结合自身的并发模式对这一新行为进行验证。
- **LTX-2 图像/视频/音频扩散 GGUF 服务正在原型化**（[#28540](https://github.com/ggml-org/llama.cpp/pull/28540)）。单个二进制、提供 OpenAI 兼容的 `/v1/images/generations`——若你正在整合推理基础设施，这一点值得注意。
- **Intel Mac 上的 Metal 多卡**仍是一个开放的功能请求（[#28565](https://github.com/ggml-org/llama.cpp/issues/28565)）——若你的目标平台是 eGPU + dGPU 的 Apple 配置，请关注该帖。
- **工具调用可靠性**——Qwen 上带大量可选参数的并行 tool_calls 已损坏（[#28522](

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-08

## 今日要点
Ollama 发布日比较平静，但开发周期非常活跃，重点关注与 OpenAI 的 **Responses API 对齐** 以及 **Gemma 4 解析器加固**。问题 #17778、#18186、#18252 和 #18297 的聚集，加上 #18225 中的回归（0.33.x 在 CUDA 上比 0.32.13 慢约 5 倍），表明 0.33.x 版本线仍围绕 `qwen3.8` 和多模态/量化工作流进行稳定化。已有多个针对 OpenAI 兼容接口的 bug 修复 PR（#18298、#18296、#18315、#18309），使用 `/v1/responses` 的应用开发者应当关注这些。

## 发布与破坏性变更
过去 24 小时内无新发布。

## 新模型与硬件支持
- **Gemma 4 解析器工作** — 来自 `mann1x` 和 `lorenzozanee` 的三个开放 PR 修复了解析器缺陷：
  - [#18299](https://github.com/ollama/ollama/pull/18299) 解析 `call:<name>:` + `BEGIN_ARG`/`END_ARG` 工具调用（格式错误的通道标记现在会以解析器错误形式暴露）。
  - [#18307](https://github.com/ollama/ollama/pull/18307) 修复了工具调用可以在思考通道关闭之前打开的不对称问题。
  - [#17626](https://github.com/ollama/ollama/pull/17626) 阻止采样器回显解析器已经剥离的 `thought\n` 头部。
- **原生 generate 思考** — [#18300](https://github.com/ollama/ollama/pull/18300) 在 Jinja 模板缺少 Go 模板分隔符时为原生 `/api/generate` 初始化思考解析器（修复 [#18221](https://github.com/ollama/ollama/issues/18221)）。
- **长 HF 仓库名 / GGUF 文件名** — [#18301](https://github.com/ollama/ollama/pull/18301) 将最大分段长度从 80 字符提升到 255 字符（修复 [#18274](https://github.com/ollama/ollama/issues/18274)）。
- **模型请求**（社区请求，尚未合并）：
  - [#18287](https://github.com/ollama/ollama/issues/18287) Hy4 预览版（Tencent）。
  - [#18290](https://github.com/ollama/ollama/issues/18290) Spark-X2.5 4B/1.7B（科大讯飞）。
- **量化缺口** — [#18297](https://github.com/ollama/ollama/issues/18297) 报告 `Qwen3.8-27B-GSQ-RCO-GGUF` 上的 `IQ3_S` 以 `done_reason: "stop"` 结束但输出空内容；尚无修复 PR。
- **硬件分配功能请求** — [#18185](https://github.com/ollama/ollama/issues/18185) 请求在 VRAM 部分被占用时为每个模型显式指定 GPU/CPU 层固定。

## 性能与优化
- **MTP + tensor split 修复** — [#18302](https://github.com/ollama/ollama/pull/18302) 在设置 `SPLIT_MODE_TENSOR` 时跳过 `--spec-draft-backend-sampling`；llama.cpp 在张量分片下拒绝后端采样，因此当前行为会在多 GPU 设置上静默破坏推测解码。
- **0.33.x 中的 CUDA 回归** — [#18225](https://github.com/ollama/ollama/issues/18225)：RTX 3090 / GA102，`qwen3:8b` 在 0.33.2 上比 0.32.13 慢约 5 倍，使用相同的模型文件。尚未提交 bisect 或临时方案；在该问题关闭之前，生产 CUDA 工作负载建议固定到 0.32.x。
- **调度器抖动** — [#18129](https://github.com/ollama/ollama/issues/18129)：在 Windows 11 / RX 9070 XT 上，调度器在成功加载模型后会立即以默认 4096 上下文重启 `llama-server`，导致下一次请求时进行冗余重载。
- **MTP 引起的 CPU 卸载** — [#18186](https://github.com/ollama/ollama/issues/18186)：在 32 GB RTX 5090 上为 `qwen3.8:27b` 启用 MTP 会将层推送到 CPU 并大幅降低吞吐量。
- **sm_86 GPU 上的 CPU 回退** — [#17841](https://github.com/ollama/ollama/issues/17841)：0.32.14 在 Windows / RTX A6000 / 驱动 R576 上静默将推理路由到 CPU（约 7 tok/s）；已通过修复关闭。

## 稳定性与回归
按影响生产用户的可能性排序。

1. **[#17778](https://github.com/ollama/ollama/issues/17778) — `qwen3.8` 聊天流式输出 500** *(开放，25 条评论，23 👍)*
   模型处于工具调用循环中途时出现 `Error: ResponseError during chat streaming: no user query found in messages`。尚无修复 PR。
2. **[#18252](https://github.com/ollama/ollama/issues/18252) — `qwen2.5-coder:3b-instruct` 低比特量化损坏**
   `q2_K`、`q3_K_S`、`q3_K_M`、`q3_K_L` 产生流畅但无功能的输出（在基础 HumanEval+ 烟雾测试中 0/15；同系列量化得分为 87–100%）。库制品问题，尚无修复。
3. **[#17910](https://github.com/ollama/ollama/issues/17910) — 0.32.11–0.32.15 中的长输出回归**
   生成会越过所有自然停止点直到被终止；0.32.9 不受影响。Mac Studio M1 Max / Tahoe。确认如果你在 0.32.11+ 但 0.33 之前，存在一个已知的坏窗口。
4. **[#18208](https://github.com/ollama/ollama/issue/18208) — 长生命周期运行器发出 `<unused49>` token**
   使用 `keep_alive -1` 时，在加载第二个模型再切回第一个模型后，输出会被占位符 token 污染，直到运行器完全停止并重新加载。GMKtec EVO-X2 / Ryzen AI Max+ 395。
5. **[#18210](https://github.com/ollama/ollama/issues/18210) — 安全：`OLLAMA_DEBUG_LOG_REQUESTS` 保留完整提示**
   将完整请求体（系统提示、工具定义、RAG 片段）持久化到临时目录，没有保留/轮换/脱敏机制。已被当作安全工单处理并关闭；如果你为调试启用过该选项，请立即清理 `/tmp` 并进行轮换。
6. **[#18305](https://github.com/ollama/ollama/issues/18305) — `/v1/responses` 静默丢弃 `developer` 条目**
   返回 `200` / `"status: completed"` 但无错误；内容永远无法到达模型。上游通过 [#18315](https://github.com/ollama/ollama/pull/18315)（在 Go 模板中将 developer 规范化为 system）部分处理，但 `/v1/responses` 路径仍在修补中。
7. **[#18286](https://github.com/ollama/ollama/issues/18286) — `/v1/responses` 拒绝 `agent_message` 条目**
   Codex 风格的生成代理任务收到 `400 invalid_request_error: unknown input item type`。由 [#18298](https://github.com/ollama/ollama/pull/18298) 飞行中修复。
8. **[#17782](https://github.com/ollama/ollama/issues/17782) — ROCm：`qwen3.8:27b` 失败并提示 `TensileLibrary_lazy_gfx1200.dat`**（RX 9060 XT 16 GB）。开放，0 👍。
9. **值得关注的已关闭回归：**
   - [#16547](https://github.com/ollama/ollama/issues/16547) Llama3.2-Vision 报 `unknown model architecture: 'mllama'`。
   - [#17841](https://github.com/ollama/ollama/issues/17841) sm_86 GPU 上的 CPU 回退。
   - [#17870](https://github.com/ollama/ollama/issues/17870) gfx1151（Strix Halo）上长预填充时 Vulkan `ErrorDeviceLost`。
   - [#17832](https://github.com/ollama/ollama/issues/17832) 3×H200 / 0.32.14 上 `CUDA_VISIBLE_DEVICES` 被忽略。
   - [#17860](https://github.com/ollama/ollama/issues/17860) 全新 Ubuntu 26.04 上没有 `zstd` 时 `install.sh` 静默失败。

## 对应用开发者的影响
- **如果你依赖 RTX 30/40 系列上的 CUDA 吞吐量，请固定 0.32.13（或等待 0.33.3+）。** [#18225](https://github.com/ollama/ollama/issues/18225) 中的 5 倍回归和 0.32.11–0.32.15 中的停止 token 回归 [#17910](https://github.com/ollama/ollama/issues/17910) 将 0.32.x 框在一个坏窗口内。长输出或大型 CUDA 集群请避免 0.32.11–0.32.15。
- **避免使用 `qwen2.5-coder:3b-instruct` 的低比特量化**（`q2_K`、`q3_K_S/M/L`）— [#18252](https://github.com/ollama/ollama/issues/18252) 显示存在静默的全功能性失败。在库制品重新发布之前，请停留在 `q4_K_M` 或更高。
- **在任何涉及用户提示的环境中不要启用 `OLLAMA_DEBUG_LOG_REQUESTS`。** [#18210](https://github.com/ollama/ollama/issues/18210) 确认完整请求体被写入并持久化；生产环境中绝不应启用该选项。
- **如果你基于 OpenAI Responses API 构建**，请预期即将落地的三项行为变更：developer 角色条目将被合并到 system（[#18315](https://github.com/ollama/ollama/pull/18315)）、`agent_message` 将被接受（[#18298](https://github.com/ollama/ollama/pull/18298)）、tool-search 调用 ID 将切换到 `tsc_` 前缀（[#18296](https://github.com/ollama/ollama/pull/18296)）。如果你在同一个 Codex 会话中在 Ollama 和 OpenAI 之间切换模型，`ts_` → `tsc_` 的变更今天就会产生影响。
- **MTP / 推测解码**在整个技术栈中都存在粗糙的边缘：单卡 5090 上的 CPU 卸载（[#18186](https://github.com/ollama/ollama/issues/18186)）和张量分片不兼容（[#18302](https://github.com/ollama/ollama/pull/18302)）。在多 GPU 和受限 VRAM 的设置中，请将 MTP 视为实验性功能。
- **AMD APU 上的长生命周期运行器**在加载第二个模型后可能损坏输出 — [#18208](https://github.com/ollama/ollama/issues/18208)。如果你在 Strix Halo / Ryzen AI Max 上扇出到多个模型，请在模型之间重启运行器或使用较短的 `keep_alive` 窗口。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-08

## 1. 今日要闻

安全披露占据本期新闻焦点：两个 issue(#40217、#39757)详细说明了 LiteLLM 的 401/403 响应如何向未认证调用方泄露密钥哈希、SHA-256 指纹、后端身份及数据库表名 —— 修复 PR #40231 已经开放。功能方面,Anthropic 相关能力进一步深化:`context-1m` beta 头自动注入与 reasoning-effort 转换(#40239、#40240、#40241);xAI/Grok 则新增多账号 OAuth 故障切换以及 Imagine 图像/视频支持(#40238、#40242)。

## 2. 发布与破坏性变更

过去 24 小时内没有新版本发布。以下开放中的工作值得关注：

- **#40240 —— 基于 `model_info` 的 `thinking` / `reasoning_effort` 转换**：对于此前需要手动映射各供应商专有格式的 SDK 用户，这是一次行为变更。升级前请计划审查 `config.yaml` 中的 `model_info` 配置块。
- **#40028 —— 不再在上游请求中宣告支持 `zstd`**:代理客户端将不再向供应商请求 zstd 压缩。处于 OCI 或重度流式环境中的用户应重新测试。
- **#31611(已关闭)**已被 #40239(context-1m beta 头)取代；新分支才是正式实现。

## 3. 新模型与硬件支持

- **#37134 —— Xinference 重排序(rerank)支持**(同步 + 异步)：填补了自托管重排序器长期存在的空缺。[PR #37134](https://github.com/BerriAI/litellm/pull/37134)
- **#40238 —— xAI Grok Imagine 图像生成/编辑与视频任务**，另支持图像编辑接受 data-URI。[PR #40238](https://github.com/BerriAI/litellm/pull/40238)
- **#40242 —— xAI 多账号 SuperGrok OAuth 及自动故障切换**(消费上限触发 403 → `RateLimitError`)。[PR #40242](https://github.com/BerriAI/litellm/pull/40242)
- **#40239 —— Anthropic `[1m]` 模型后缀自动注入 `context-1m` beta 头**。[PR #40239](https://github.com/BerriAI/litellm/pull/40239)
- **#36150 —— DashScope 供应商的 QwenCloud 迁移路径**(来自 QianWen AI 的开放功能请求)。[Issue #36150](https://github.com/BerriAI/litellm/issues/36150)
- **#40243 —— Responses 流式的类型化 `response.failed` 事件**(无损错误上报)。[PR #40243](https://github.com/BerriAI/litellm/pull/40243)

## 4. 性能与优化

- **#40236 —— 构建缓存键前对 kwargs 排序**(修复 #40128):此前，参数顺序不同的相同请求会产生不同的缓存哈希，永远无法命中缓存。对于跨调用改变字典顺序的客户端，净效果是缓存命中率的显著提升。[PR #40236](https://github.com/BerriAI/litellm/pull/40236)
- **#40233 —— 消费计数器缓存容量提升至 10,000 条**(原默认 200 条)。此前缓存在 TTL 到期前就驱逐条目，会静默丢弃仍处于活跃状态的预算计数器；回归测试覆盖了 300 个并发预算作用域。[PR #40233](https://github.com/BerriAI/litellm/pull/40233)
- **#40229 —— 按请求覆盖的 `routing_strategy` 选择器不再泄漏到 `litellm.callbacks`**。在 `usage-based-routing-v2` 下，该问题曾导致无关请求出现虚假的 rpm-429。[PR #40229](https://github.com/BerriAI/litellm/pull/40229)
- **#40028 —— 出站请求禁用 zstd**,以保留逐事件 SSE 分帧(避免在 OCI 及任何逐帧 zstd 供应商处出现 `cannot use a decompressobj multiple times` 500 错误)。[PR #40028](https://github.com/BerriAI/litellm/pull/40028)
- **#40209 —— 自动路由后将 `max_tokens` 解析为所选层级模型的上限**：避免预算不足(在 Sonnet thinking 上只给了 Haiku 量级的预算)，以及 Haiku 被拒进而触发不必要的 Sonnet 回退。[PR #40209](https://github.com/BerriAI/litellm/pull/40209)

## 5. 稳定性与回归

按严重程度与影响面排序：

- **高危 · 安全：401/403 信息泄露** —— #40217 报告 401 响应会回显存储的密钥哈希，403 响应会暴露完整模型允许列表。#39757 报告密钥错误时的 401 还会泄露后端身份、数据库表名以及所提交密钥的 SHA-256。**修复已开放：#40231**(在 `user_api_key_auth.py` 中省略哈希，在 `auth_checks.py` 中省略 `models=`)。[Issue #40217](https://github.com/BerriAI/litellm/issues/40217) · [Issue #39757](https://github.com/BerriAI/litellm/issues/39757) · [PR #40231](https://github.com/BerriAI/litellm/pull/40231)
- **高危 · 流式工具调用数据丢失(OpenAI Responses / Codex)** —— #39796:当上游在一个 delta 中发送完整工具调用时，流式重分块器会丢弃 `tool_calls[].id` 和 `function.name`。#27144:Codex Responses 流式在通过 `response.function_call_arguments.done` 发出时会丢弃函数调用参数。**修复已开放：#40232**(针对 Codex 的一行 `has_tool_calls` 修复)。[Issue #39796](https://github.com/BerriAI/litellm/issues/39796) · [Issue #27144](https://github.com/BerriAI/litellm/issues/27144) · [PR #40232](https://github.com/BerriAI/litellm/pull/40232)
- **高危 · v1.91.0 多轮工具使用回归(vLLM/Kimi K2.7)** —— #32214:`sanitize_tool_use_ids_in_anthropic_messages` 破坏了 Anthropic 格式向 vLLM Kimi K2.7 的透传。尚未附上修复。[Issue #32214](https://github.com/BerriAI/litellm/issues/32214)
- **高危 · OpenAI 推理模型提示词缓存桥接失效** —— #39339:提示词缓存无法通过 `/v1/messages` → Responses API 桥接延续；即使经过 #37953,`encrypted_content` 仍被丢弃。尚无修复。[Issue #39339](https://github.com/BerriAI/litellm/issues/39339)
- **高危 · 限流器对团队级单模型限额重复计数** —— #34140:团队级 `model_rpm_limit` 实际按配置值的一半生效(v3 限流器)。尚无修复。[Issue #34140](https://github.com/BerriAI/litellm/issues/34140)
- **中危 · Bedrock `/v1/files` 清理功能损坏** —— #39715:`DELETE /v1/files/{file_id}` 返回 500 "BedrockFilesConfig does not support file deletion"。**修复已开放：#40235**,针对底层的 `getattr(e, "type", "None")` 模式；Bedrock 特有的缺口仍然存在。[Issue #39715](https://github.com/BerriAI/litellm/issues/39715) · [PR #40235](https://github.com/BerriAI/litellm/pull/40235)
- **中危 · Bedrock 对 Qwen3 静默丢弃 reasoning_effort** —— #34105:仅 Anthropic、Nova 2 和 gpt-oss 模型会传递 `reasoning_effort`。尚无修复。[Issue #34105](https://github.com/BerriAI/litellm/issues/34105)
- **中危 · `token_counter` 在 `input_audio` 上返回 500** —— #38459:`/utils/token_counter` 未处理 OpenAI 多模态音频块，导致调用前的上下文窗口与缓存检查被静默跳过。尚无修复。[Issue #38459](https://github.com/BerriAI/litellm/issues/38459)
- **中危 · Azure Entra Redis 认证阻塞集群模式启动** —— #37726:`init_redis_cluster` 缺少凭证提供器路径。尚无修复。[Issue #37726](https://github.com/BerriAI/litellm/issues/37726)
- **中危 · 并发的未知终端用户请求绕过默认预算** —— #40095:自定义认证下 `max_end_user_budget_id` 存在竞态条件。尚无修复。[Issue #40095](https://github.com/BerriAI/litellm/issues/40095)
- **中危 · Anthropic `/v1/messages` 静默丢弃 `messages[]` 内的 `role:"system"`** —— #36917。尚无修复。[Issue #36917](https://github.com/BerriAI/litellm/issues/36917)
- **中危 · 复杂度自动路由器携带加密内容跨模型组** —— #40237(今日新增):`/v1/responses` 的后续请求会拿到来自另一层级模型的 `reasoning.encrypted_content`。尚无修复。[Issue #40237](https://github.com/BerriAI/litellm/issues/40237)
- **低危 · Bedrock/Vertex AI S3 日志文件名不符合 URI 安全要求** —— #40234(今日新增)：云存储 URI 文件 ID 未对日志文件路径做净化处理。尚无修复。[Issue #40234](https://github.com/BerriAI/litellm/issues/40234)
- **低危 · 自定义脱敏标签自 v1.87.1 起被忽略** —— #30008:`keyword_redaction_tag`/`pattern_redaction_format` 不再生效。[Issue #30008](https://github.com/BerriAI/litellm/issues/30008)
- **仍开放且影响面广 · OpenCode Go `x-opencode-session` 头** —— #39503:自 09/05 起，OpenCode Go(635 个使用 LiteLLM 的组织)要求携带该头才能路由；而 LiteLLM 并未发送。42 👍。影响 `litellm/1.98.0` 用户。[Issue #39503](https://github.com/BerriAI/litellm/issues/39503)

## 6. 对应用开发者意味着什么

- **如果你运营面向公网的 LiteLLM 代理，请在 #40231 合并落地后优先升级。**在此之前，未认证探测即可提取存储的密钥哈希和你的完整模型允许列表 —— 请将该代理视作正在向公网泄露路由清单来对待。
- **Anthropic `[1m]` 后缀用户**可通过 #40239 开箱即用地获得原生 1M 上下文 beta 头支持；客户端无需进行任何请求头配置。
- **自动路由器(复杂度)用户**：下次升级前请查阅 #40209 和 #40237。`max_tokens` 将在路由后重新解析为该层级模型的上限，且跨层级加密内容不匹配的情况可能会有所减少。
- **对缓存命中敏感的工作负载**应能明显受益于 #40236 —— 只要你的客户端存在 kwarg 顺序变化(几乎必然如此)。
- **基于 Responses / Codex 的流式 Agent**:在上线工具调用 Agent 之前，请确认你锁定的版本中是否包含 #40232 —— 工具调用在流中途无声消失是调试噩梦。
- **OpenCode Go 客户**必须持续关注 #39503 —— 09/05 之后，缺少会话头的请求会在供应商侧报错。在 LiteLLM 发送该头之前，需要临时规避方案。
- **xAI / Grok 重度用户**现在可以通过多账号 OAuth 获得自动故障切换(#40242),且 Grok Imagine 图像/视频可通过 SDK 访问(#40238)—— 对媒体生成类 Agent 很有用。
- **消费计数器 / 预算可观测性**随 #40233(1 万条缓存条目)获得更大余量，减少繁忙代理上因缓存驱逐导致的预算漂移。
- **在 Xinference 上自托管重排序**的用户终于通过 #37134 获得了一等公民式的支持路径。

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth 摘要 — 2026-09-08

## 1. 今日要点

过去 24 小时无新版本发布；工作集中在 Studio 安全加固与硬件栈稳定性上。头条内容是修复了 Studio 工具调用解析中的两条高危（HIGH）严重等级「提示注入至 RCE」路径（[#6967](https://github.com/unslothai/unsloth/pull/6967)）、从种子化管理员密码改为一次性设置令牌（[#10387](https://github.com/unslothai/unsloth/pull/10387)），以及为共享 Studio/桌面安装引入按账户的多用户隔离（[#10375](https://github.com/unslothai/unsloth/pull/10375)）。此外还有一大批 AMD/ROCm 检测与安装器相关工作进入评审阶段（[#10473](https://github.com/unslothai/unsloth/pull/10473)、[#10474](https://github.com/unslothai/unsloth/pull/10474)、[#10490](https://github.com/unslothai/unsloth/pull/10490)）。

## 2. 版本发布与破坏性变更

过去 24 小时无新版本。基线仍是 2026 年 2 月的标签（trl 0.27.1，transformers 5.1.0）；TRL 版本号升级的吐槽帖 [#4190](https://github.com/unslothai/unsloth/issues/4190) 今日被关闭，说明版本固定（pin）覆盖已经跟上。

## 3. 新增模型与硬件支持

- **Apple Silicon 上的 DoRA** — 今日关闭。MLX 后端现已构建 DoRA 包装层（通过 unsloth-zoo#954），Studio 中针对 `use_dora` 的兜底 `NotImplementedError` 也已移除。[#7508](https://github.com/unslothai/unsloth/pull/7508)
- **Windows on ARM / NVIDIA GB10 与 N1X** — 安装原生 ARM64 CUDA 栈，不再将 ARM64 主机视为无 GPU 环境；解锁 RTX Spark 级笔记本。[#10282](https://github.com/unslothai/unsloth/pull/10282)
- **NVIDIA + AMD 混合主机** — 当前安装器在 `nvidia-smi` 成功时即提前返回；本次新增对双供应商机器上 ROCm torch 栈的显式 opt-in。[#10474](https://github.com/unslothai/unsloth/pull/10474)
- **GDN 内核内嵌（vendored）** — Studio 不再为 Qwen3.5/Qwen3.6/Qwen3-Next 训练安装 `flash-linear-attention`、`fla-core`、`tilelang` 与 `apache-tvm-ffi`；unsloth_zoo 现直接内置 gated-delta-net 内核。[#10487](https://github.com/unslothai/unsloth/pull/10487)
- **Docker 文档勘误** — arm64 镜像不携带 xformers（没有 cu128 aarch64 wheel）；GB10 通过 PTX 运行。[#10492](https://github.com/unslothai/unsloth/pull/10492)
- Qwen3-omni TTS 语音克隆请求 [#3636](https://github.com/unslothai/unsloth/issues/3636) 已关闭；今日数据中未见任何已合并的支持。

## 4. 性能与优化

- **KV 抢占重构**（评审中，已堆叠 PR）：单个 `llama-server` 配合 `--parallel N --kv-unified` 可让 N 个 slot 共享一份 KV 池；搭配 llama.cpp 的相关工作（`--preempt-ram`，unslothai/llama.cpp#184/#190）将 slot 停放（parking）移至服务器自身，Studio 因此下线自有的抢占逻辑，每个聊天都能使用完整上下文窗口，而不再互相驱逐。[#10301](https://github.com/unslothai/unsloth/pull/10301)、[#10358](https://github.com/unslothai/unsloth/pull/10358)
- **安装/启动瘦身** — 移除 FLA/tilelang/tvm-ffi 的安装步骤（见 #10487），缩短 Qwen3-Next 系列任务的训练 worker 启动时间并缩减依赖面。
- **导入时间回归已确认关闭** — 60 秒 vs 5 秒入口点导入回归（根因在 `PatchFastRL`）已解决。[#1859](https://github.com/unslothai/unsloth/issues/1859)
- **反例（仍开放）**：在 ROCm 上，即便勾选了「No RAM offload」，模型据报告仍会驻留在系统内存中 [#10341](https://github.com/unslothai/unsloth/issues/10341)；RX 9060 XT 上 Wan2.2 TI2V 因 SDPA math 回退导致的 OOM 已关闭 [#10415](https://github.com/unslothai/unsloth/issues/10415)。

## 5. 稳定性与回归

1. **HIGH — 提示注入 → RCE（修复在评审中）：** 无标记的工具调用解析器会将助手文本中任意位置的 `call:NAME{...}` / `NAME[ARGS]{json}` / `{"name":...}` 提升为真实工具调用；#6967 拦截了无标记的执行类提升。在合并前请视为未修补。[#6967](https://github.com/unslothai/unsloth/pull/6967)
2. **Windows CI 红：** `test_a_non_ascii_marker_survives_the_rollback` 在 `parity (windows-latest)` 的两种 shell 上均失败（2 失败 / 670 通过 / 9 跳过）；自 #10386 起就已存在，现已建单追踪。[#10460](https://github.com/unslothai/unsloth/issues/10460)
3. **最新 llama.cpp 构建导致 AMD GPU 检测失效**（gfx1201，2×ROCm）— 仍开放。[#7485](https://github.com/unslothai/unsloth/issues/7485)
4. **ROCm Studio 集群（v0.1.806-beta，llama.cpp b10798，W7900/W7500）：** 模型卸载错误 [#10339](https://github.com/unslothai/unsloth/issues/10339)、非预期的 RAM 驻留 [#10341](https://github.com/unslothai/unsloth/issues/10341)、token 计数异常 [#10337](https://github.com/unslothai/unsloth/issues/10337)，以及 Switch Back 在 4096 上下文下重新加载 [#10338](https://github.com/unslothai/unsloth/issues/10338) — 最后一个已有修复 PR：[#10447](https://github.com/unslothai/unsloth/pull/10447)。
5. **停止时提示队列被清空** — 修复在评审中：Stop 现在是暂停而非删除已排队运行。[#10428](https://github.com/unslothai/unsloth/issues/10428) → [#10445](https://github.com/unslothai/unsloth/pull/10445)
6. **Windows 代码完整性拦截：** Smart App Control 将 `llama-server.exe` 标记为「Bad Image」；相关 PR 新增探测器及 CI 包签名审计。[#10408](https://github.com/unslothai/unsloth/pull/10408)。相关管理员安装时的 ACL bug 已关闭：[#4846](https://github.com/unslothai/unsloth/issues/4846)
7. **工具链固定（pinning）隐患（已建单）：** Linux 上的「final torch repair」可能在不重新固定 torchao 的情况下更换加速器家族；#10490 通过 starvation 兜底机制固定加速器索引。[#10493](https://github.com/unslothai/unsloth/issues/10493) → [#10490](https://github.com/unslothai/unsloth/pull/10490)

## 6. 对应用开发者意味着什么

- **在 #6967 与 #10387 合入前，请将 Studio 视为未加固。** 不要将不可信的网页/文档内容送入启用了工具调用的聊天会话，也不要在没有隧道的情况下直接 `unsloth studio -H 0.0.0.0` 暴露服务 — #10485 已将密码门槛扩展至裸绑定，但在此之前该路径不受保护。一次性令牌流程上线后，请规划轮换种子化的管理员密码。
- **`/v1/responses` 上的附件可能静默丢失**（文件/图片被丢弃但仍返回成功响应）；#10261 将上报错误，但在此之前请在客户端校验附件。[#10261](https://github.com/unslothai/unsloth/pull/10261)
- **并发语义正在变化：** #10301/#10358 落地后，并行聊天将共享一份统一的 KV 缓存，并在服务端进行 slot 停放 — 单 GPU 的多会话吞吐更佳，但负载下的内存画像会改变，请重新基准测试。
- **Agent 行为怪癖：** 部分模型（例如 Qwen 3.8 Flash Next）在约 20 次调用后可能自我限制工具调用，即使已关闭上限 [#10479](https://github.com/unslothai/unsloth/issues/10479) — 注意系统默认中提示注入式的「budget」框架。
- **AMD 用户提示：** 在提交「找不到 GPU」的 bug 之前，请先检查 `/dev/kfd` 与 `renderD*` 设备节点的组权限 — #10473 将报告无法打开的设备节点而非误报；双供应商主机可通过 #10474 显式 opt-in ROCm。
- **运维备注：** 测试 harness 中空 bearer 的无密钥鉴权失败已修复（[#10400](https://github.com/unslothai/unsloth/issues/10400)）；离线/气隙环境下的 Desktop 安装指引已提供（[#10356](https://github.com/unslothai/unsloth/issues/10356)）；在 arm64 Docker 镜像上，请勿假设 xformers 已存在。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — 每日摘要
**日期：** 2026-09-08
**仓库：** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. 今日要点

过去 24 小时内未发布新版本。活动集中在 **Claude Desktop 集成的稳定性修复**：PR #1769 和 #1767 直接解决了用户报告的 CCR 重启时数据丢失问题（[#1768](https://github.com/musistudio/claude-code-router/issues/1768)）以及 Cowork 客户端中 `web_search` 融合检测失效问题（[#1766](https://github.com/musistudio/claude-code-router/issues/1766)）。此外还有一个独立的构建/可观测性缺陷 —— Docker 镜像中缺少 Web Worker（[#1770](https://github.com/musistudio/claude-code-router/pull/1770)）—— 以及更丰富的聚合错误报告（[#1773](https://github.com/musistudio/claude-code-router/pull/1773)），共同构成了今天的全部变更。

---

## 2. 发布版本与破坏性变更

*过去 24 小时内无新版本发布。*

待发布的兼容性说明（尚未发布）：
- **TypeScript 7 适配：** [#1764](https://github.com/musistudio/claude-code-router/pull/1764) 移除了已弃用的 `baseUrl` 选项，以避免在 TypeScript 7 下构建失败。当前仓库固定 `typescript@5.9.3`，因此这仅是前向兼容。
- **Claude Desktop 配置架构：** [#1772](https://github.com/musistudio/claude-code-router/issues/1772) 指出，较新的 Claude Desktop 版本会对 CCR 写入 `configLibrary/*.json` 的 4 个键（`authentication` 及其他三个）发出警告。尚无修复 PR —— 用户每次启动都会看到警告。

---

## 3. 新模型与硬件支持

今日未公布新的模型、架构、后端或量化支持。

值得关注的兼容性问题：[#1765](https://github.com/musistudio/claude-code-router/issues/1765) 报告 CCR 无法与 **企业内部 OpenAI 兼容端点**（托管 Deepseek/Gemma）配合工作，而 Deepinfra 等公有端点运行正常。这更像是协议检测的缺失，而非真正的模型支持问题 —— 尚未提交 PR。

---

## 4. 性能与优化

今日未涉及吞吐量、延迟或内核层面的工作。

进行中的间接性能/可观测性改进：
- **更完善的失败诊断：** [#1773](https://github.com/musistudio/claude-code-router/pull/1773) 在网关的聚合响应 "All target providers failed." 中暴露每次尝试的上游错误（状态、阶段、消息），使重试/故障转移路径不再只是一个不透明字符串，而是可调试的。
- **UI 构建完整性：** [#1770](https://github.com/musistudio/claude-code-router/pull/1770) 修复了 Docker 镜像缺少 `assets/log-body.worker.js` 的问题，恢复了请求日志查看器（之前因 worker chunk 静默 404 而失效）。

---

## 5. 稳定性与回归

按用户影响排序：

1. **[高 — 数据丢失] [Issue #1768](https://github.com/musistudio/claude-code-router/issues/1768)** — 每次 CCR 重启时，Claude App 接管路径都会 **删除** 活动的 `configLibrary/<id>.json` 条目，随后应用步骤重新创建一个仅有 12 个字段的空白存根，丢弃用户设置（`chatTabEnabled`、`modelPrefer1mContextWindow` 等）。据报告这是 #1736 的部分回归。**修复进行中：** [PR #1769](https://github.com/musistudio/claude-code-router/pull/1769) 将 `restoreClaudeAppGatewayConfig` 的作用域限定为仅撤销 CCR 写入的键，保留条目文件和根配置不变。

2. **[中 — 功能失效] [Issue #1766](https://github.com/musistudio/claude-code-router/issues/1766)** — 对于 Claude Cowork，Fusion 的 `web_search` 检测失败，因为 Cowork 将该工具声明为驼峰式 `WebSearch`（无分隔符）。匹配器通过 `toLowerCase().replace(/[-.]/g, "_")` 归一化后变为 `websearch`，无法命中三种模式（`=== "web_search"`、`endsWith("_web_search")`、`includes("search_web")`）。**修复进行中：** [PR #1767](https://github.com/musistudio/claude-code-router/pull/1767)。

3. **[中 — 配置兼容性] [Issue #1772](https://github.com/musistudio/claude-code-router/issues/1772)** — 较新版本的 Claude Desktop 按架构校验 `configLibrary`；CCR 写入的 4 个键（其中包括 `authentication`）会在每次启动时触发 "not a recognized configuration key" 警告。尚无修复 PR。

4. **[中 — 部署缺陷] [PR #1770](https://github.com/musistudio/claude-code-router/pull/1770)** — Docker 镜像缺少 `assets/log-body.worker.js`，原因是 Docker 构建过程中未调用 `buildRequestLogBodyWorker()`，而 UI bundle 引用了该文件。容器部署中的请求日志查看器已静默失效。

5. **[低 — 构建/CI] [PR #1771](https://github.com/musistudio/claude-code-router/pull/1771)** — `tsc -b` 因 TS18003（"No inputs were found in config file 'tsconfig.node.json'"）失败，原因是 `include` 指向构建前不存在的 `build/**/*.mjs`。同样的错误也会在 IDE 中出现。

6. **[低 — 互操作性] [Issue #1765](https://github.com/musistudio/claude-code-router/issues/1765)** — 企业的 OpenAI 兼容端点（本地运行 Deepseek/Gemma）无法被 CCR 检测/服务，而 Deepinfra 可正常工作。尚无修复 PR。

---

## 6. 对应用开发者的意义

- **未来几天请谨慎固定 Docker 镜像标签。** 当前已发布的镜像会静默破坏请求日志查看器（[#1770](https://github.com/musistudio/claude-code-router/pull/1770)）；在生产容器中依赖 log-body 功能前，请等待合并修复或从源码构建。
- **如果您依赖接管模式下的设置持久化**，请将当前的 `main` 视为有损 —— 每次重启都会清空活动 configLibrary 条目中非网关字段。请跟踪 [#1769](https://github.com/musistudio/claude-code-router/pull/1769) 的合并状态；在此之前，请在每次 CCR 重启前备份 `~/.claude/configLibrary/*.json`。
- **Cowork 用户** 在 [#1767](https://github.com/musistudio/claude-code-router/pull/1767) 合入前会看到 `web_search` 路由静默失败。如果您的代理依赖 Cowork 的内置搜索，请配置一个非融合的提供方作为回退。
- **为 Claude Desktop 更严格的配置架构做准备。** 即使 #1768/#1769 合入后，[#1772](https://github.com/musistudio/claude-code-router/issues/1772) 仍会在启动时持续产生警告 —— 在升级 Desktop 前，请确认下游工具是否会将这些警告解析为错误。
- **#1773 提升了可诊断性。** 合入后，网关的 5xx 响应体将包含结构化的 `attempts[]` 数组，其中包含每个上游的状态/阶段/消息 —— 这对于在 CCR 之上构建重试策略和 SLO 仪表盘非常有用。
- **内部/私有 OpenAI 兼容网关** 目前存在软性不兼容（[#1765](https://github.com/musistudio/claude-code-router/issues/1765)）。如果您正通过此类端点路由企业流量，请在该路径上对 CCR 进行端到端验证后再依赖。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 日报 — 2026-09-08

## 1. 今日要闻

CC Switch **v3.20.2** 作为一轮围绕 Codex 路由层的兼容性修复发布，头条是 Grok 现在可以在 Codex 路由下通过 xAI 原生 Responses API 端到端正常工作——解决了此前拦路的一连串 schema、角色名与 OAuth 侧摩擦。过去 24 小时的 PR 流(约 20 个)以**代理/SSE 流式传输正确性修复**(thinking 块抖动、交错推理、HalfOpen 许可泄漏)和**跨应用供应商复制**基础设施为主，表明该项目正在同时加固本地 LLM 网关和多应用供应商模型，而不是新增供应商。

## 2. 版本发布与破坏性变更

- **v3.20.2**([发布说明](https://github.com/farion1231/cc-switch/releases/tag/v3.20.2)):Codex 系兼容性发布版本。重要修复：
  - Grok 在 Codex 路由下通过 xAI 原生 Responses API 实现端到端可用(xAI 拒收的 tool schema、Codex 拒收的整型浮点数、multi-agent 邮箱注入、未识别的角色名均已解决)。
  - Grok OAuth 不再被 v3.20.1 的开关门控拦截；接管不再让 Codex 卡死在登录环节；通过 Codex OAuth 使用 GPT-6 不再提示 "needs Codex update"。
  - Claude Code 路径同样收获了稳定性修复(摘要中发布说明被截断)。
- 未点名任何 API/配置层面的破坏性变更，但维护者应关注 **v3.20.0 → v3.20.1 迁移**:[#6969](https://github.com/farion1231/cc-switch/issues/6969) 记录了 `authBinding.accountId` 未随新的 workspace 主键一并迁移，导致 Codex OAuth 卡片死锁在 "账号不存在” 状态。

## 3. 新模型与硬件支持

- 通过 [PR #7183](https://github.com/farion1231/cc-switch/pull/7183),在全部七款受支持应用(Claude Code、Claude Desktop、Codex、Hermes、OpenClaw、OpenCode、Pi)中完成 **Qwen 3.8 代际刷新**。预设中 DashScope 品牌更名：**百炼 → 千问AI平台**。
- 本周期内没有新的硬件后端(CUDA/ROCm/Metal/CPU)或量化格式变更。

## 4. 性能与优化

- **限流器修复** [PR #7207](https://github.com/farion1231/cc-switch/pull/7207):`forwarder.rs` 中的 P0 bug——`AllowRequestResult` 被立即解构，导致 `HalfOpenPermitGuard` 提前释放，实际上令 `max_half_open_requests=1` 形同虚设。改用 RAII 守卫后，熔断器限流恢复正常；次要的 `disarm()` 许可泄漏修复也已落地。
- **Windows 上的 Codex 用量导入** [PR #7219](https://github.com/farion1231/cc-switch/pull/7219):sticky-rollout 检测现在会将持久化的字节游标与文件大小进行比对(而不再只看 mtime),避免当 Windows 保持活动 rollout 的 mtime 不变、内容却持续增长时，用量导入陷入停滞。
- **流式块抖动** [PR #7227](https://github.com/farion1231/cc-switch/pull/7227) / [#7214 (closed dup)](https://github.com/farion1231/cc-switch/pull/7214):当上游发送空的 `reasoning_content` 占位符时，OpenAI→Anthropic 转换器此前会在每个 chunk 上反复开/关 thinking 块；现已跳过。
- **交错 thinking 块** [PR #5706](https://github.com/farion1231/cc-switch/pull/5706):可见文本开始后，后续的 `reasoning_content` 增量将被忽略，以避免 thinking↔text 块反复切换；已添加回归测试。
- **Anthropic SSE 字节对齐/状态保留** [PR #6814](https://github.com/farion1231/cc-switch/pull/6814):Responses 的推理摘要会被转换为可重放的 Anthropic thinking 块供 Claude Code 使用，而不是泄漏 `redacted_thinking`。

## 5. 稳定性与回归

按用户影响面与活跃度排序：

| 严重程度 | 问题 | 状态 | 备注 |
|----------|-------|--------|-------|
| **高** | [#6969](https://github.com/farion1231/cc-switch/issues/6969) v3.20.1 之后 Codex OAuth 的 `authBinding.accountId` 未迁移，"账号不存在” 死锁，无法切换供应商 | 未解决 | 影响 Windows 上所有已升级用户；可能与 #7211 和 #4393 属同一根因 |
| **高** | [#4741](https://github.com/farion1231/cc-switch/issues/4741) 本地代理 `/responses` 处理 DeepSeek 带 `tool` 角色消息时失败(HTTP 400) | 未解决 | 根因：缺少前置 `tool_calls`;代理规范化缺口 |
| **高** | [#4752](https://github.com/farion1231/cc-switch/issues/4752) Codex 经 CC Switch 路由时频繁出现 `exceeded retry limit, last status: 429 Too Many Requests` | 未解决 | 很可能与上文 PR #7207 的 HalfOpen 许可泄漏修复相关 |
| **高** | [#3449](https://github.com/farion1231/cc-switch/issues/3449) Codex CLI 无法识别 CC Switch 写出的 `config.toml`,自定义路由始终不生效 | 未解决 | 格式兼容问题；尚无修复 PR |
| **中** | [#5129](https://github.com/farion1231/cc-switch/issues/5129) 编辑配置文件时以整文件替换的方式破坏既有符号链接 | 未解决(久未活动) | “编辑后失效”类问题，影响以符号链接管理配置的用户 |
| **中** | [#4946](https://github.com/farion1231/cc-switch/issues/4946) 本地路由启动后，模型请求失败 | 未解决 | |
| **中** | [#6605](https://github.com/farion1231/cc-switch/issues/6605) Claude Desktop Anthropic 协议报错 | 未解决 | |
| **中** | [#4341](https://github.com/farion1231/cc-switch/issues/4341) Codex ↔ 第三方模型对话中途自动断连 | 未解决(48 条评论) | 长期存在的抱怨；尚无修复 PR |
| **中** | [#6967 (closed)](https://github.com/farion1231/cc-switch/issues/6967)、[#7211 (closed)](https://github.com/farion1231/cc-switch/issues/7211)、[#4393 (closed)](https://github.com/farion1231/cc-switch/issues/4393) 强制写入 `requires_openai_auth = true` 破坏 Codex 路由 | 已关闭 | 一系列相关报告；似乎正在积极修复中 |
| **低** | [#6935](https://github.com/farion1231/cc-switch/issues/6935) CC Switch 重新启动时总是打开第一优先级应用，而非最后聚焦的应用(Win11) | 未解决 | |
| **低** | [#7088](https://github.com/farion1231/cc-switch/issues/7088) OpenCodeGo 自 09/06 起缺失 `x-opencode-session` 请求头 | 未解决 | 上游行为变更；CC Switch 可能需要自行注入 |

近期关闭、值得留意的回归:[#2750](https://github.com/farion1231/cc-switch/issues/2750)(Codex 在 `response.completed` 之前显示 `Reconnecting…`)、[#3848](https://github.com/farion1231/cc-switch/issues/3848)(model-catalog schema 与 Codex 的兼容问题)、[#6998](https://github.com/farion1231/cc-switch/issues/6998)(通过 Codex 上传 DeepSeek vision 图片)——均在过去 24 小时内关闭，很可能与 v3.20.2 有关。

## 6. 对应用开发者意味着什么

- **如果你通过 CC Switch 代理 Codex**,目前 v3.20.2 这条线是更稳妥的轨道；但 **#6969 表明 v3.20.0 → v3.20.1 仍存在账号绑定迁移 bug**,因此在升级补丁版本前，请在非主力 profile 上先行测试，或先备份 `authBinding` 状态。
- **本地代理是值得盯紧的正确抽象层**：今天的 PR 中有三分之一是 SSE/reasoning 块正确性修复。如果你编写的上游会发送 `reasoning_content: ""` 占位符，你的流现在可以穿过转换器而不再产生虚假的 thinking 块抖动——但请预期 Anthropic 侧的严格校验(文本开始后不允许交错推理，见 [#5706](https://github.com/farion1231/cc-switch/pull/5706))。
- **跨应用供应商可移植性即将到来**:[PR #7225](https://github.com/farion1231/cc-switch/pull/7225) 引入了带协议跟随语义的 "copy to other apps"(meta 中携带 `apiFormat`,Anthropic 原生应用原样复制，Codex/Gemini 则转码)。合并后，你只需编写一次供应商配置，即可分发到所有受支持的应用，不再出现各应用 YAML 各自漂移的问题。
- **Auto Mode 流量整形正在产品化**:[PR #6602](https://github.com/farion1231/cc-switch/pull/6602) 新增了**分类器队列**，将 Claude Code Auto Mode 在执行 Bash 前发出的安全分类器请求路由到与主对话*相互独立*的供应商链。如果你想让分类跑在更便宜/更快的模型上、同时让主线程保留高端推理，这会很有用。
- **macOS 局域网端点**需要 `NSLocalNetworkUsageDescription`(见 [PR #7213](https://github.com/farion1231/cc-switch/pull/7213))——如果你面向通过局域网解析的供应商(例如本地 Ollama/llama.cpp 机器)，请预期应用会弹出本地网络权限请求。
- **实时配置隔离正在收紧**:[PR #7210](https://github.com/farion1231/cc-switch/pull/7210) 阻止了关闭时 Codex 的重试/超时字段被 Claude 的对应行覆盖;[PR #7212](https://github.com/farion1231/cc-switch/pull/7212) 则在全局同步时保留子供应商的 `meta`(用量脚本、按应用开关)。如果你构建了读取供应商 meta 的用量采集脚本，现在它们应该能在供应商被编辑后继续存活。
- **遗留集成缺口**，在敲定技术栈之前值得跟踪：ZCode([#4205](https://github.com/farion1231/cc-switch/issues/4205)、[#4744 closed](https://github.com/farion1231/cc-switch/issues/4744))、mimo code([#4073](https://github.com/farion1231/cc-switch/issues/4073))、Cursor([#2242](https://github.com/farion1231/cc-switch/issues/2242))、qoder([#5112](https://github.com/farion1231/cc-switch/issues/5112))——ZCode 看起来会最先落地。
- **WSL + 原生 Windows 双配置**:[#4043](https://github.com/farion1231/cc-switch/issues/4043)(32 条评论，7 👍)是本周期内点赞数最高的增强请求——如果你的开发工作流横跨 WSL 与原生 Windows,请前去发声支持；这显然是一项高需求的易用性改进。

---

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-08

## 今日要点

`v1.0.0-rc.35` 版本带来了 **Wan 3.0 Video** 支持,并简化了 **任务插件控制** 模型(主开关 + 各插件单独开关),内置插件现在回显的是请求中的模型名称,而不是上游的真实 ID。在传输协议层面,持续已久的 **基于 WebSocket 的 Responses API** 工作正在收尾:PR [#6914](https://github.com/QuantumNous/new-api/pull/6914) 已合并,并在 v2 协议下硬化了 [#5062](https://github.com/QuantumNous/new-api/pull/5062) 的 v1 实现。与此同时,一个活跃的 bug([#7134](https://github.com/QuantumNous/new-api/issues/7134))正在影响各渠道的可靠性指标——它将客户端主动取消的流错误地计入上游故障。

## 版本与破坏性变更

- **[v1.0.0-rc.35](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.35)** — *Wan 3.0 Video, 插件路由*
  - **任务插件控制简化为两层**:主开关 + 各插件单独开关。关闭某个插件后,不再静默回退到同名的内置插件;同名模型也不再被内置插件静默接管。
  - **模型回显行为变更**:内置插件现在反映请求中的模型名称(尊重模型重定向),而非上游真实 ID。任何在插件层依赖上游 ID 的工具或审计逻辑都需要重新验证。
  - 新增 Wan 3.0 视频模型支持以及插件路由能力。
  - **迁移提示**:依赖禁用插件回退行为的运维人员,在升级前应审计其渠道→插件映射。

## 新模型与硬件支持

- **新视频模型**:**Wan 3.0**(`Wan 3.0 Video`)通过插件系统路由——通过新的两层控制中的插件启用项来开放。
- **Provider/边缘网关接入讨论**:[#7251](https://github.com/QuantumNous/new-api/issues/7251) — 围绕为 **xAI Grok Imagine Video** 增加一等异步支持的讨论线程。请注意 [#6358](https://github.com/QuantumNous/new-api/issues/6358) 中相关的故障状态报告(视频路由返回 `invalid_api_platform: 48`)——目前尚未开启修复 PR。
- **AWS 凭证链**(提议):[#7258](https://github.com/QuantumNous/new-api/pull/7258) 在 AWS 渠道上引入对 AWS 默认凭证链(实例角色 / IRSA / IAM Roles Anywhere)的支持,扩展了零密钥部署选项。
- **DaoXE 多模型网关**([#7264](https://github.com/QuantumNous/new-api/issues/7264))已被关闭,理由为无效;集成方继续使用通用的 OpenAI 兼容 + 自定义 base-URL 路径。对于国内/边缘市场的运维人员值得注意的是:上游同时暴露了原生的 Anthropic Messages 接口,而当前渠道类型并未原生对接。
- 本周期内没有新的量化格式、CUDA/ROCm/Metal 或本地后端变更。

## 性能与优化

- **流式可靠性指标** — [#7134](https://github.com/QuantumNous/new-api/issues/7134) 报告下游取消的 SSE 流被无条件记录为模型故障,持续压低各渠道的成功率 KPI。报告者定位到该分类逻辑位于 new-api 自身的遥测路径中(非透传或 Coding Plan 路径)。目前尚无修复 PR;这实质上是一次指标准确性回归。
- **SSE 链路硬化** — PR [#7259](https://github.com/QuantumNous/new-api/pull/7259) 消除了 `common/custom-event.go::writeData` 中的一个潜在 panic:将未经守卫的 `data.(string)` 断言替换为 `fmt.Sprint(data)` + 前缀检查,并添加了回归测试。触发频率较低,但一旦触发即硬崩溃。
- **Coze 流式响应体泄漏** — 同样在 [#7259](https://github.com/QuantumNous/new-api/pull/7259):修复了一个在负载下泄漏上游连接的、未关闭的 Coze 流式响应体。
- **透传模型映射** — PR [#7249](https://github.com/QuantumNous/new-api/pull/7249)(已关闭/已合并)使 `model_mapping` 在透传模式下应用于实际请求体。修复前,上游收到的是面向客户端的模型名,因此返回 404,把误配置隐藏在晦涩的错误之后(#6002, #6639)。
- **Claude 非流缓冲** — PR [#6292](https://github.com/QuantumNous/new-api/pull/6292)(已关闭)为上游在 `stream: false` 时仍返回 `text/event-stream` 的 Claude 请求增加 SSE 缓冲,防止在行为不端的兼容上游上出现响应体被截断的问题。
- 本周期内未发布基准数据(tokens/s、p50/p99 延迟、RSS)。

## 稳定性与回归

按可能的运维影响排序:

1. **[HIGH] 客户端取消的流被计入模型故障** — [#7134](https://github.com/QuantumNous/new-api/issues/7134)。污染渠道成功率 KPI,可能导致自动禁用规则误触发,并误导容量规划信号。尚无修复 PR。
2. **[HIGH] Ollama 流式在 `done:true` 帧上丢弃 `tool_calls`** — [#7252](https://github.com/QuantumNous/new-api/issues/7252)。影响在 `stream: true` + `tools` 组合下使用 `qwen3-coder` 等模型的 Ollama 渠道:客户端收到空的 `content` 增量以及 `finish_reason: "stop"`,没有 `tool_calls`。已在 `v1.0.0-rc.35` 上复现。尚无修复 PR —— **刚发布的版本引入的回归**。
3. **[MED] xAI Grok Imagine Video 路由返回 `invalid_api_platform: 48`** — [#6358](https://github.com/QuantumNous/new-api/issues/6358)。该模型已在 UI 中展示,但视频路径未正确接通。仍开放,尚无修复 PR。
4. **[MED] SSE 编码 panic** — [#7259](https://github.com/QuantumNous/new-api/pull/7259) 提供了修复;等待合并。任何非字符串 payload 到达 `writeData` 时即硬崩溃。
5. **[LOW] Coze 上游连接泄漏** — 同 PR [#7259](https://github.com/QuantumNous/new-api/pull/7259)。属于缓慢的资源耗尽,而非立即性宕机。
6. **[LOW] 透传忽略 `model_mapping`** — [#7249](https://github.com/QuantumNous/new-api/pull/7249) 已修复并合并。表现是来自上游的不明 404。
7. **已关闭/已撤回**:[#7243](https://github.com/QuantumNous/new-api/issues/7243)、[#7253](https://github.com/QuantumNous/new-api/issues/7253)(均标注 撤回作废)、[#7264](https://github.com/QuantumNous/new-api/issues/7264)、[#7257](https://github.com/QuantumNous/new-api/issues/7257)、[#7256](https://github.com/QuantumNous/new-api/issues/7256)、[#7255](https://github.com/QuantumNous/new-api/pull/7255)。

## 对应用开发者的影响

- **在 rc.35 上重新验证 Ollama 的智能体工具调用** — 如果你的智能体栈通过 Ollama 渠道运行 `qwen3-coder`(或类似模型),在 [#7252](https://github.com/QuantumNous/new-api/issues/7252) 解决之前,请固定到 **rc.34**。工具调用会静默消失,这比硬错误更糟糕。
- **在 [#7134](https://github.com/QuantumNous/new-api/issues/7134) 修复之前不要信任成功率仪表盘** — 基于各渠道成功率的自动禁用阈值及任何 SLO 都是不可靠的输入。如果你将告警或容量决策挂接在这些指标上,请将其标记为降级,并以请求完成计数作为门控依据。
- **为插件控制语义变更做好准备** — 新的两层模型更严格:禁用的插件就是真正禁用,没有静默回退。在推广 rc.35 之前,请检查 `relay/` 中的插件映射以及任何用于切换插件的 IaC,特别是 Wan 3.0 和其他视频插件相关部分。
- **透传 + `model_mapping` 现已可用** — [#7249](https://github.com/QuantumNous/new-api/pull/7249) 合入后,你可以安全地在请求体透传模式下使用渠道级 `model_mapping`,将面向客户端的名称别名到上游 ID,不再出现 404。
- **基于 WebSocket 的 Responses 接近可用** — 如果你有长时间运行的智能体循环,会从双向 Responses(`response.create` 事件流)中受益,请关注 [#6914](https://github.com/QuantumNous/new-api/pull/6914) 合入 `main` 的进展。这将解锁通过网关使用原生 Codex/OpenAI Responses 会话并实现用量计费。
- **多密钥渠道体验正在改善** — PR [#7112](https://github.com/QuantumNous/new-api/pull/7112) 增加了并发的"测试所有 Key"、自动禁用规则以及移动端 UI 修复。一旦合并,将显著降低高 QPS 智能体运营密钥池的成本。
- **管理/安全方面的体验改进在路上** — 来自同一作者的三项增强([#7261](https://github.com/QuantumNous/new-api/issues/7261)、[#7262](https://github.com/QuantumNous/new-api/issues/7262)、[#7263](https://github.com/QuantumNous/new-api/issues/7263))正在推动组织级策略执行(API key 过期上限、强制 2FA、跨用户 Key 可见性)。如果你在团队中以多租户方式运行 new-api,这些功能落地后将减少定制化的管理工具。
- **面向运维的邮件工具** — PR [#6514](https://github.com/QuantumNous/new-api/pull/6514)(自 7 月底开放)增加了带审计、限流的批量邮件功能,可面向指定用户发送。可用于事件沟通、套餐变更和弃用通知。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*