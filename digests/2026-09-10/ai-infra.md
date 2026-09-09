# AI 基础设施日报 2026-09-10

> 生成时间: 2026-09-09 23:30 UTC | 覆盖项目: 9 个

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

## 1. 生态系统概览

服务引擎层正围绕新一轮混合稀疏/线性注意力前沿模型（Qwen3.8-Flash-Next、GLM-5.3-Flash、DeepSeek-V4、Kimi-K3）进入抢地盘阶段,且模式高度一致:支持快速落地,正确性债紧随其后(非确定性解码、前缀缓存越界访问、245K 上下文挂死)。本地运行时(llama.cpp、Ollama、Unsloth)则在拓宽硬件覆盖面 —— Vulkan、SYCL/Intel Arc、ARM I8MM、AMD Strix Halo —— 而非追逐裸数据中心吞吐。网关与路由层(LiteLLM、New API、CCR、CC Switch)在打另一场仗:计费路径正确性(重复计费、限速执行不完整),以及由 AI 编程代理客户端驱动的上游契约快速变更。值得注意的:AI 辅助撰写的补丁如今已直接出现在贡献流中(New API 同日发布的关键计费修复),这引发了评审完整性的疑问。九个项目整体态势是生产化与加固,而非全新功能的竞速。

## 2. 活跃度对比

*计数为 24 小时摘要窗口内被检索到的条目(新提交、关闭或被活跃引用) —— 是迭代量的近似,而非仓库的总活动量。*

| 项目 | 引用 Issue | 引用 PR | 发布状态 |
|---|---|---|---|
| **vLLM** | ~16(13 open / 3 closed) | 19 | ✅ **v0.29.0** 已发布(MRV2 默认) |
| **SGLang** | ~22(含 5 closed) | 16 | 无;CI:1 broken / 6 flaky |
| **llama.cpp** | ~15 | ~22 | ✅ **11 次构建**(b10871→b10883) |
| **Ollama** | ~17 | 16 | 无 |
| **LiteLLM** | ~17(10 open / 7 closed) | 16 | ✅ v1.102.0-dev.1(cosign 签名) |
| **Unsloth** | ~18(10 open / 8 closed) | 11 | ✅ v0.1.808-beta |
| **Claude Code Router** | 3 | 4 | 无(当前 3.0.22) |
| **CC Switch** | ~19 | 17 | 无 |
| **New API** | ~10 | 12 | 无(v1.0.0-rc.36) |

九个项目中,六个在窗口期内完成或切出发布;llama.cpp 的 11 次构建节奏仍是生态中最快的集成循环。vLLM 与 SGLang 背负最重的开放 issue 负载,且集中在新模型家族上。

## 3. 模型支持竞赛

| 模型 / 架构 | vLLM | SGLang | llama.cpp | 其他 |
|---|---|---|---|---|
| **Qwen3.8-Flash-Next (QSA)** | 深度工作中(fp8 KV patch, #54426),但有 3 个开放正确性 bug | — | TOP_K radix-select + FA 调优(#28670, #28102) | — |
| **GLM-5.3-Flash / GLM-5-Next** | 0.29.0 上加载被破坏,已修复(#56007) | 可中断的 prefill CUDA graphs **默认开启**(#38522) | ✅ **已合并** —— 321B hybrid + vision (#27754) | CC Switch presets;New API AI-patch 作者使用过 |
| **DeepSeek-V4** | —(R1 系 sparse-MLA:PCP+DCP, #56157) | dsv4+DSPARK backend;**245K 上下文挂死**(#33549) | 支持;DSpark VRAM 泄漏(#27155) | — |
| **Kimi-K3** | ROCm TP>1 修复(#56167, #56098) | 多个 tool-call/PD/DCP 缺陷 open | — | — |
| **MiniMax-M3** | ROCm AITER fusion (#54535) | — | — | CC Switch 默认 preset;New API H3 V2 video |
| **GigaChat 3.5 432B** | — | — | ✅ 已合并(#25342) | — |
| **Nemotron-3.5 / SeedOSS / Ling-3.0 / SenseNova-U1** | ✅ / ✅ / — / — | — / — / ✅ / 跟踪中 | — / — / — / — | — |
| **托管前沿(gpt-6-astra, grok-4.x, Veo 3.1)** | — | — | — | LiteLLM registry;New API relay + dynamic billing |

**结论:****llama.cpp 在异构混合架构上最先合并**(GLM-5-Next、GigaChat 3.5),除一处 TF32 覆盖外几乎没有附加说明。**vLLM 引擎覆盖最广**,但在 Qwen3.8 路径上发布的新模型支持带着明显的正确性债。**SGLang 在集成特性上最深**(agent caching、disagg),但其前沿模型属"带保留意见支持"。硬件长尾领导地位竞争激烈:vLLM 拿下 GB10/sm_121,SGLang 拿下 gfx950,llama.cpp 拿下 RDNA4/Adreno/Intel Arc,Ollama 新增 Intel SYCL。

## 4. 性能前沿

优化工作集中在六个方向:

- **KV 缓存与前缀管理(最热方向):** vLLM fp8 KV-cache 在 GB10 上约**2× 池化**(#54426),以及 HiSparse 宿主常驻 sparse-MLA 设计(#56109);SGLang 的 T-LRU 用于 TTFT-SLO agent 工作负载(#34012),以及混合/Mamba 上的 decode 侧 HiCache (#38634);llama.cpp MTP 过量分配修复(#28630);Unsloth 统一 KV 池用于并行聊天(#10301/#10120)。
- **冷启动 / 重启经济性:** SGLang 的 Weight Cache Daemon 是当天的亮点数字 —— Qwen3-235B FP8 权重加载 **306–327s → <1s**(#33522)。直接打击自动扩缩容关键路径。
- **推测解码(标配,但仍脆弱):** vLLM **+9% decode / −58% 缓存命中 TTFT** BS=1 (#54485);SGLang Inkling MTP staging 与已关闭的 32K 上下文 accept-rate 修复;llama.cpp DSpark/MoE 崩溃修复。反面教训:SGLang 的 `tiny_gemm` 回退(**−4% Blackwell decode**, #38628)证明 kernel 微基准的胜利 ≠ 服务端的胜利。
- **量化:** 跨引擎的 NVFP4/MXFP4/FP8(SGLang 在线 bf16→MXFP4 用于 MTP draft #38748);消费级硬件上的 GGUF kernel 工作(ARM I8MM q4_K **+34.3%**,Vulkan iq4_xs **+6–17% TG**)。
- **CUDA graph 覆盖:** vLLM MRV2 graph 内存剖析;SGLang 可中断 prefill graphs 走向默认 —— 但伴随一个严重的弱引用正确性 bug (#37606),llama.cpp sm_120 挂死则展示了风险面。
- **主机/运行时效率(非 GPU):** LiteLLM 将 Bedrock 签名移出事件循环(#40270) —— 一次阻塞调用冻住了整个 worker;Ollama 的 FD 泄漏(#18344)是一项与性能相邻的可靠性边界。

## 5. 层级定位

- **数据中心服务引擎 —— vLLM、SGLang:** 在前沿 MoE/混合注意力、spec decode、PD 分离上竞争。当下的差异点:vLLM 的硬件广度 vs. SGLang 的运维特性(weight cache、agent-aware caching、router HTTP/2、graceful drain)。
- **本地运行时 —— llama.cpp(kernel 基底)、Ollama(分发 + 兼容 API):** Ollama 构建在 llama.cpp 之上(SYCL 后端就是 llama.cpp 的引擎 PR);其自身附加值在于兼容面(OpenAI/Anthropic/Codex)与集群 UX —— 这也是其 bug 集中的位置(FD 泄漏、零向量嵌入、VRAM 核算)。
- **网关/代理 —— LiteLLM(企业级:限速、花费、OTEL)、New API(计费 relay):** 即"计费层"。当下缺陷几乎全是计费/核算正确性,而非延迟。
- **客户端路由 —— CCR、CC Switch:** 为 Claude Code/Codex 量身定制的薄代理。其路线图由上游客户端漂移决定(例如 `x-opencode-session` 在 2026-09-05/06 变为强制项,数日内即让双方中招)。
- **微调 —— Unsloth:** 唯一同时触及训练(1.2–1.7× diffusion)*与*推理交付(Studio on llama-server)的项目;其开放 bug 揭示了跨层耦合 —— #10573 实际上是一个 vLLM 能力缺口(`min_p`+`logit_bias`)。

## 6. 趋势信号

1. **混合稀疏注意力是 bug 集中地。** Indexer/top-k/前缀缓存的交互作用在三个独立代码库中分别产生了非确定性(vLLM #54521)、GB10 越界访问(#54173)、长上下文挂死(SGLang #33549)。将这些架构视为快速演进、尚未"变无聊"的状态。
2. **Agent 工作负载正在重塑缓存设计** —— KV 事件上的会话归属、T-LRU、前缀钉住头(`X-Data-Parallel-Rank`)、按请求的缓存退出。若你跑 agent,引擎选择在缓存策略上已有后果。
3. **客户端契约变更对代理层是一道税。** Claude Code 与 Codex 的小幅发布本月多次打断 CCR/CC Switch 路由。请为吸收上游漂移留出预算。
4. **计费路径完整性是网关故事的主线:** LiteLLM 限速执行力度不到一半(#34140),且缓存预热后限额会静默消失(#39713);New API 同日的重复计费修复。**运维建议:超额配置限额,并在升级后重算缓存 token 分析。**
5. **供应链保证正在成为发布门槛:** LiteLLM 对镜像进行 cosign 签名;Unsloth 的红色安全通道(#10545)拦截一次干净发布;New API 对 AI 撰写的计费补丁标记额外审查。
6. **静默失败模式最令人担忧:** Ollama 的 HTTP-200 全零嵌入(#17878)与 SGLang 的 ROCm EAGLE 贪心退化 —— 两者都返回看起来合理的成功。请为*错误的缺席*而不仅是错误本身加装探针。

**近期关注清单:** vLLM 0.27.1 pin 指南(宿主机内存回退)、SGLang GLM-5.3 默认 graph 翻转(#38522)、llama.cpp b10878 对树外集成的 ABI 破坏、LiteLLM v1.102.0 GA(Bedrock 签名修复),以及 Unsloth Apple Silicon #4 闭环 —— 若以真正的 MLX 支持落地,这将是当日最大生态信号项。

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-10

## 今日要点

- **v0.29.0 正式发布**，Model Runner V2 现已成为*所有*模型的默认选项(594 次提交，277 位贡献者)，但这一轮推送在 0.28 → 0.29 版本线上暴露出至少一个严重回归：多种配置下启动时主机内存耗尽。
- **Qwen3.8-Flash-Next** 相关路径是本周期最主要的主线:`persistent_topk` prefill 的一个高热度非确定性 bug(#54521)、GDN + 前缀缓存路径在 GB10 上的非法内存访问(#54173)、MRV2 的 `thinking_token_budget` 回归(#54906),以及一个让单块 GB10 上 KV 池近乎翻倍的 fp8 KV-cache 补丁(#54426)。
- 投机解码与 MoE 集合通信效率持续产出实打实的收益:BS=1 DFlash/DSpark 场景下 **decode +9% / 缓存命中 TTFT −58%**(#54485);Mooncake P2P 失败现在会上报回调度器(#56166);MRV2 快速 prefill 通道也在推进中(#56145)。

---

## 版本发布与破坏性变更

**v0.29.0**([发布](https://github.com/vllm-project/vllm/releases/tag/v0.29.0))

- **Model Runner V2 现已成为所有模型的默认选项**([#53183](https://github.com/vllm-project/vllm/issues/53183))。池化模型已在 0.27.x 完成切换；至此迁移全面收官。既有的 `VLLM_USE_V2` 显式开启将变为无效操作；请确认你的配置仍能正常加载。
- MRV2 新增了面向 KV cache 自动定容的 **CUDA graph 显存分析**(本摘要有截断——完整亮点列表请见 release 正文)。
- 迁移注意事项(今日社区动态)：
  - 从 **0.27.1 升级到 0.28/0.29** 的用户报告启动时主机内存耗尽([#54237](https://github.com/vllm-project/vllm/issues/54237))。若无法容忍该回归，请固定使用 0.27.1;根因疑似与 MRV2 相关。
  - **GLM5.3-Flash** 在 0.29.0 上以 TP×EP 派生 worker 时 checkpoint 加载损坏([#56007](https://github.com/vllm-project/vllm/issues/56007),已关闭——修复路径看似已解决)。
  - 在 **Model Runner V2** 上，**Qwen3.8 NVFP4 + MTP** 的 `thinking_token_budget` 会被忽略([#54906](https://github.com/vllm-project/vllm/issues/54906))。
  - **Cohere Chat/Embed 与 Generative Scoring** 此前会接受任意大的 `priority` 整数，导致 MessagePack 溢出，而不是返回客户端错误([#56146](https://github.com/vllm-project/vllm/pull/56146),已关闭/已合并)。

---

## 新模型与硬件支持

- **Qwen3.8-Flash-Next(QSA)**:prefill/decode 全线都有大刀阔斧的改动落地；QSA 路径上的 fp8 KV-cache 现已在 GB10 上成为可用补丁([#54426](https://github.com/vllm-project/vllm/issues/54426))。GDN 路径开启前缀缓存后在 sm_121 上仍会出现 OOM/非法内存访问([#54173](https://github.com/vllm-project/vllm/issues/54173))。
- **Sparse-MLA 模型(DeepSeek 系列)**：已支持 **PCP + DCP** 同时启用，使 KV cache 分片与 prefill query 切分得以共存([#56157](https://github.com/vllm-project/vllm/pull/56157))。
- **Kimi-K3 on ROCm(TP>1)**:shared-expert 多流重叠现已正确门控([#56167](https://github.com/vllm-project/vllm/pull/56167)),wvSplitKrc 回归已修复([#56098](https://github.com/vllm-project/vllm/pull/56098))。
- **MiniMax-M3 on ROCm**:packed LBHNC AITER QK-norm 融合已 rebase 到当前 main([#54535](https://github.com/vllm-project/vllm/pull/54535));稀疏 GQA prefill attention 已优化([#52963](https://github.com/vllm-project/vllm/pull/52963))。
- **GLM5.3-Flash**(回归问题见上文，修复进行中)。
- **gpt-oss on ROCm**:TRITON_ATTN + 投机解码会静默无输出(该 issue 已关闭,[#32434](https://github.com/vllm-project/vllm/issues/32434))。
- **SeedOSS** 的轮次边界 token 已接入 `SeedOssParser`([#54264](https://github.com/vllm-project/vllm/pull/54264),已关闭)。
- **量化格式**：面向 DeepSeek-R1 线性层的 AITER **b-preshuffle blockscale GEMM**([#55253](https://github.com/vllm-project/vllm/pull/55253));RDNA3 上 **W4A16 GPTQ split-K** 的精度/确定性问题已修复([#54706](https://github.com/vllm-project/vllm/pull/54706));Triton-attn int8 KV 的 **128B 对齐** scale 缓存([#56164](https://github.com/vllm-project/vllm/pull/56164))。
- **后端**：ROCm(`gfx950`、`gfx11`/RDNA3)与 **sm_121 / GB10(DGX Spark)** 均获得了一等公民级别的重视；**Intel XPU** 仍有未解决的主机内存回收 bug([#50269](https://github.com/vllm-project/vllm/issues/50269))。

---

## 性能与优化

- **投机解码，BS=1(Nemotron-3.5-Lightning-NVFP4 + DSpark)**:在 32K 已缓存 / 2K 输入 / 256 输出下，**decode +9%,缓存命中 TTFT −58%**([#54485](https://github.com/vllm-project/vllm/pull/54485))。
- **稀疏 GQA prefill(gfx950)**:kernel 受限于带宽——一个完全去掉计算的版本耗时仍达到完整 kernel 的 103%;相邻 query 在 4 个 token 上共享约 256 个 block 中的约 22 个，为 block 复用优化留出了明确的提升空间([#52963](https://github.com/vllm-project/vllm/pull/52963))。
- **FlexAttention block-mask 显存**已与 KV cache 大小解耦——修复了 H100 上以默认 `gpu_memory_utilization` 运行 `google/gemma-3-1b-it` 时的 8.45 GiB OOM([#55977](https://github.com/vllm-project/vllm/pull/55977))。
- **自定义 all-reduce 缓冲区**现在在初始化阶段即完成定容，使 batch-invariant 模式能够一致地使用它们([#50505](https://github.com/vllm-project/vllm/pull/50505))。
- **Qwen3.8-Flash-Next 在 QSA 上的 fp8 KV-cache**:相比 bf16,单块 GB10 上 KV 池约 2 倍([#54426](https://github.com/vllm-project/vllm/issues/54426))。
- **HiSparse(驻留主机的 sparse-MLA decode)**:设计已作为 draft 落在 WIP 分支之上([#56109](https://github.com/vllm-project/vllm/pull/56109))——主机侧池将成为一个带可驱逐常驻页的普通 block 池。
- **ROCm AITER** 的 GEMM-config 管道代码已重构为直接调用 `get_gemm_config`,移除了手工维护的 shape 表([#55001](https://github.com/vllm-project/vllm/pull/55001))。
- 为 33 个已迁移的 sampling/spec-decode/DFlash/MTP/WNA16 kernel 推导出 **Triton compile keys**,移除了 rejection-sampler 的哑执行预热([#56154](https://github.com/vllm-project/vllm/pull/56154))。
- 值得跟踪的 RFC:**CUTLASS SM100 Lamport 融合式 GEMM+AllReduce**([#55261](https://github.com/vllm-project/vllm/issues/55261));**Triton `tl.make_tensor_descriptor` 的采用**([#42545](https://github.com/vllm-project/vllm/issues/42545));**通过 torch.compile pass 优化 TP-MoE 集合通信**([#29139](https://github.com/vllm-project/vllm/issues/29139))。

---

## 稳定性与回归

| 严重程度 | 问题 | 状态 |
|---|---|---|
| 🔴 致命正确性问题 | [#54521](https://github.com/vllm-project/vllm/issues/54521) —— 当 prompt 超出 `indexer_budget` 时，Qwen3.8-Flash-Next 贪心解码结果非确定;`persistent_topk` prefill 是疑点。 | 未解决 |
| 🔴 重大回归 | [#54237](https://github.com/vllm-project/vllm/issues/54237) —— 0.28.0 / 0.29.0 启动时耗尽全部主机内存并卡死；0.27.1 正常。 | 未解决 |
| 🔴 重大正确性问题 | [#54173](https://github.com/vllm-project/vllm/issues/54173) —— GB10(sm_121)上带前缀缓存的 GDN 路径出现 `CUBLAS_STATUS_INTERNAL_ERROR` / 非法内存访问;`--no-async-scheduling` 无济于事。 | 未解决 |
| 🟠 高 | [#53142](https://github.com/vllm-project/vllm/issues/53142) —— 显式指定 `--block-size` 时，hybrid mamba 在 prefix-cache 恢复阶段的 align precopy 出现非法内存访问。 | 未解决 |
| 🟠 高 | [#54906](https://github.com/vllm-project/vllm/issues/54906) —— MRV2 在 Qwen3.8 NVFP4 + MTP 下静默忽略 `thinking_token_budget`。 | 未解决 |
| 🟠 高 | [#51782](https://github.com/vllm-project/vllm/issues/51782) —— 大量数值落入同一粗粒度直方图桶时，`persistent_topk` 会静默丢弃 top-k 候选(B300,CUDA 13)。 | 未解决 |
| 🟡 中 | [#48494](https://github.com/vllm-project/vllm/issues/48494) —— `num_speculative_tokens_per_batch_size` + MTP speculator 无法完成完整 CUDA graph decode 捕获。 | 未解决 |
| 🟡 中 | [#48966](https://github.com/vllm-project/vllm/issues/48966) —— `EngineCore` 意外死亡时服务进程以状态码 0 退出，使 `Restart=on-failure` 失效。 | 未解决 |
| 🟡 中 | [#50269](https://github.com/vllm-project/vllm/issues/50269) —— Intel XPU 上模型加载完成后主机内存未释放。 | 未解决 |
| 🟡 中 | [#56007](https://github.com/vllm-project/vllm/issues/56007) —— GLM5.3-Flash v0.29.0 在 TP×EP worker 派生时 checkpoint 加载失败。 | **已关闭**(修复已合入) |
| 🟢 低 | [#56146](https://github.com/vllm-project/vllm/pull/56146) —— Cohere priority 溢出 MessagePack,而非抛出客户端错误。 | **已关闭/已合并** |
| 🟢 低 | [#56164](https://github.com/vllm-project/vllm/pull/56164) —— `triton_attn` head_size=256 的 int8 KV 打包到 260B,破坏了 128B 对齐。 | 未解决(已有修复 PR) |
| 🟢 低 | [#56165](https://github.com/vllm-project/vllm/pull/56165) —— 聚簇 BF16 router GEMM `LLBf16SplitK` 的同步/输出存储所有权 bug。 | 未解决(已有修复 PR) |
| 🟢 低 | [#56166](https://github.com/vllm-project/vllm/pull/56166) —— Mooncake P2P 拉取失败仅记录日志；请求会卡在 `WAITING_FOR_REMOTE_KVS` 直至客户端超时。 | 未解决(已有修复 PR,修复 #55870) |

另外值得关注的还有：**KV-cache key 分区一致性测试套件** RFC ([

---

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 简报 — 2026-09-10

## 1. 今日要点

- **快速引擎恢复（Weight Cache Daemon，权重缓存守护进程）** 路线图持续见效 —— 第一阶段已通过 per-rank CUDA-IPC 将 Qwen3-235B FP8 的权重加载时间从 ~306–327s 降至 **<1s**，该 issue 依然是仓库中讨论度最高的话题之一（[#33522](https://github.com/sgl-project/sglang/issues/33522)）。
- 今天出现了一个值得重视的生产回归：PR #34693（用 `tiny_gemm` 统一替换 `dsv3_router_gemm`）导致 **Blackwell 上 DeepSeek-R1 NVFP4 解码性能下降 ~4%**，尽管独立内核本身更快 —— 这是“微基准获胜 ≠ 服务链路获胜”的教科书式案例（[#38628](https://github.com/sgl-project/sglang/issues/38628)）。
- 前沿模型的推理服务正遇到新的痛点：**DeepSeek-V4（dsv4+DSPARK，TP=8）在 H20 上于 ~245K 上下文处挂起**，而 **Kimi-K3** 正不断累积 tool-call / PD 分离 / DCP 方面的缺陷，这表明当前的投机解码 + 分离式部署栈在长上下文下确实存在瓶颈。

## 2. 版本发布与破坏性变更

过去 24 小时没有新的正式版本发布。截至 2026-09-09 23:02 UTC，CI 追踪器（[#17050](https://github.com/sgl-project/sglang/issues/17050)）自动报告的定时任务状态为 **1 个失败、6 个不稳定、986 个近期已修复** —— CI 整体健康。

正在推进中的重要配置 / API 层面变更：

- **默认值切换**：GLM-5.3 Flash（`Glm5NextForConditionalGeneration`）将默认开启 **breakable prefill CUDA graphs**（Triton KDA + TRTLLM DSA + FP8 E4M3 KV）（[PR #38522](https://github.com/sgl-project/sglang/pull/38522)）。
- **`/v1/responses` 与 `/generate` 新增支持的 HTTP 头**：`X-Data-Parallel-Rank`，用于网关后方 `--enable-dp-attention` 部署中的前缀绑定（prefix-pinning）（[PR #38729](https://github.com/sgl-project/sglang/pull/38729)）。
- **Router h2c**：当引擎上报 `--enable-http2` 时，Router 将既能直接提供也能转发明文 HTTP/2（[PR #38743](https://github.com/sgl-project/sglang/pull/38743)）。
- 提出了按请求粒度退出前缀缓存插入的选项（`skip_cache_insert`）（[#38069](https://github.com/sgl-project/sglang/issues/38069)）。
- **Anthropic `/v1/responses` 的 `output_config.effort`**：`xhigh` 无法触达，未校验的取值会返回 500 —— 在 [#36741](https://github.com/sgl-project/sglang/issues/36741) 修复之前，客户端应避免发送该字段。

## 3. 新模型与硬件支持

- **GLM-5.3 Flash**（`Glm5NextForConditionalGeneration`）—— 默认启用 breakable prefill CUDA graphs（[PR #38522](https://github.com/sgl-project/sglang/pull/38522)）。
- **GLM-5.2 在 ROCm/gfx950 上** —— 四内核融合的 DSA indexer 解码路径，将每个 Indexer 的内核链从 12 个降至 4 个（78 层 + MTP draft）（[PR #38583](https://github.com/sgl-project/sglang/pull/38583)）。
- **DeepSeek-V4（`dsv4` 后端 + DSPARK）** —— 多节点 TP8/H20 存在一个未解决的长上下文解码挂起问题（[#33549](https://github.com/sgl-project/sglang/issues/33549)）；可视为“支持但有附加条件”。
- **Kimi-K3** —— 围绕严格 tool-call 语法、`tool_choice=required` 的 PD/DCP 挂起以及 DCP planner 崩溃存在多个活跃 issue（详见“稳定性与回归”一节）。
- **Qwen3.5 MTP draft experts（AMD）** —— 在 `amd/Qwen3.5-397B-A17B-MXFP4` 上为 EAGLE/MTP 栈提供在线 bf16 → MXFP4 量化（[PR #38748](https://github.com/sgl-project/sglang/pull/38748)）。
- **Ling-3.0-flash-VL cookbook** —— 新增 INT4 与 FP4 通道；FP8 通道基于官方 checkpoint 刷新（[PR #38527](https://github.com/sgl-project/sglang/pull/38527)）。
- **Diffusion**：支持追踪 issue 已刷新（[#27214](https://github.com/sgl-project/sglang/issues/27214)）—— Ideogram-4 NF4 与 JoyEcho 离线支持已标记完成；NVIDIA omni-dreams 仍未解决。原生回退路径会丢弃 CPU-offload 决策 → 在 8GB GPU 上导致致命 OOM（[#34772](https://github.com/sgl-project/sglang/issues/34772)）。
- 开启 **SenseNova-U1 / U1.5** 支持追踪，锚定上游 [OpenSenseNova/SenseNova-U1](https://github.com/OpenSenseNova/SenseNova-U1)（[#37742](https://github.com/sgl-project/sglang/issues/37742)）。

## 4. 性能与优化

- **Weight Cache Daemon（第一阶段）**：通过 per-rank 量化后缓存 + CUDA IPC，Qwen3-235B FP8 权重加载 **306–327s → <1s**。第二阶段计划见 [#33522](https://github.com/sgl-project/sglang/issues/33522)。
- 面向统一 radix cache 的**尾部优化 LRU（T-LRU，NeurIPS'25）** —— 在满足 TTFT SLO 的前提下，仅缓存对话中下一次 prefill 所需的部分；在按最近使用顺序回退之前先释放尾部。非常适合 agent 类负载（[PR #34012](https://github.com/sgl-project/sglang/pull/34012)）。
- 为 `BlockStored` KV 事件增加了 **agent 会话归因**，使外部 KV router 能将已存储的条目与会话关联起来（[PR #37482](https://github.com/sgl-project/sglang/pull/37482)）。
- **解码侧 HiCache** 现可在 `--enable-hierarchical-cache` 下用于混合 SWA 以及 Mamba/SSM 模型，依托统一 radix tree 并修复了 3 个 L3 解码恢复问题（[PR #38634](https://github.com/sgl-project/sglang/pull/38634)）。
- **prefill CUDA graphs 中的 MoE LoRA**（full + breakable）—— 为 prefill MoE 使用独立 scratch，缩小了过大的 dense LoRA 启动网格（[PR #38578](https://github.com/sgl-project/sglang/pull/38578)）。
- **Rust TreeCore + 外部缓存链接器**（[PR #37306](https://github.com/sgl-project/sglang/pull/37306)）—— 不透明的 `NodeId` 句柄，消除热路径上的 Python 代理遍历。
- **AMD Qwen3.5 MTP**：对包含 1547 个条目的 MTP `exclude` 列表（含 512 个路由专家）进行在线 bf16 → MXFP4 量化，使 MXFP4 checkpoint 上可以运行 EAGLE/MTP 解码（[PR #38748](https://github.com/sgl-project/sglang/pull/38748)）。
- **Inkling MTP** —— 在 verify 之前预先暂存 draft 元数据，使目标模型的元数据完成事件能够提前释放调度器（[PR #38169](https://github.com/sgl-project/sglang/pull/38169)）。
- 修复 **FlashInfer full-prefill SWA graph 缓冲区生命周期** —— prefill capture 不再经由仅限解码用途的分配进行写入（[PR #38747](https://github.com/sgl-project/sglang/pull/38747)）。
- 提出 **MoE router GEMM 统一化**重构，引入单一 gate 层，使精度敏感的 router 计算不再在各后端之间漂移（[#38695](https://github.com/sgl-project/sglang/issues/38695)）。
- **回归（未解决）**：`tiny_gemm` 统一化导致 **Blackwell 上 DeepSeek-R1 NVFP4 解码回归 ~4%** —— 必须在不回滚 #34693 的前提下修复（[#38628](https://github.com/sgl-project/sglang/issues/38628)）。
- **回归（已关闭，曾为活跃问题）**：Qwen3.5 MTP 在 GPQA 上 **32K+ 上下文时接受率仅 0.19** —— 现已修复并关闭（[#30763](https://github.com/sgl-project/sglang/issues/30763)）。

## 5. 稳定性与回归

按生产部署的严重程度排序：

1. **DeepSeek-V4（dsv4 + DSPARK）TP=8，8×H20，~245K 上下文处解码挂起** —— 所有 GPU 利用率 100%、低功耗空转，直到 watchdog 强杀服务端。目前尚无修复 PR（[#33549](https://github.com/sgl-project/sglang/issues/33549)）。**严重程度：高。**
2. **Kimi-K3 多节点 MegaMoE sparse-DP prefill CUDA graph 死锁**，出现于 PR #33871 之后 —— 已关闭（已修复），但如果你锁定（pin）在 0.5.x 版本线上，仍值得关注（[#37561](https://github.com/sgl-project/sglang/issues/37561)）。
3. **Kimi-K3 严格 tool-call 语法** —— 在 xgrammar 下，`additionalProperties` 会削弱具名属性的类型约束（[#38587](https://github.com/sgl-project/sglang/issues/38587)）。**严重程度：对使用工具的 agent 而言为高。**
4. **Kimi-K3 `tool_choice=required` 请求在 2P2D TP8/DCP8 下一直挂起直至 ReadTimeout** —— 未记录确切构建版本（[#37430](https://github.com/sgl-project/sglang/issues/37430)）。
5. **Kimi-K3 在 DSPARK + DCP 下解码崩溃** —— `layers/dcp/planner.py` 中的 `cumsum(extend_prefix_lens=None)`（[#34920](https://github.com/sgl-project/sglang/issues/34920)）。
6. **GLM-5.2（NVFP4，B200/B300）+ EAGLE** —— FlashInfer TRTLLM bf16 batched-GEMM 中出现非法内存访问（nextn draft MoE）；#30137 之后 Triton nextn 被 HIP 门控（[#30209](https://github.com/sgl-project/sglang/issues/30209)）。
7. **PR #34693 引起 DeepSeek-R1 NVFP4 解码在 Blackwell 上回归 ~4%** —— 未解决，尚未回滚（[#38628](https://github.com/sgl-project/sglang/issues/38628)）。
8. **Prefill breakable CUDA graph** —— 跨 bucket 的 break 输入被弱引用 → 贪心解码输出错误 / IMA；系对 #37448 的端到端验证（[#37606](https://github.com/sgl-project/sglang/issues/37606)）。**正确性问题，一旦命中后果严重。**
9. **post-plan padding 之后的 attention 元数据一致性** —— `ForwardBatch` 以可能破坏不变式的方式修改元数据；已提交强制保障功能的 issue（[#38580](https://github.com/sgl-project/sglang/issues/38580)）。
10. **Diffusion 原生回退丢弃 CPU-offload** → 在 8GB GPU 上致命 OOM（[#34772](https://github.com/sgl-project/sglang/issues/34772)）。
11. **Anthropic `/v1/responses` 的 `output_config.effort`** 未校验 → 返回 500；`xhigh` 无法触达（[#36741](https://github.com/sgl-project/sglang/issues/36741)）。
12. **PD prefill→decode 失败通知** —— NIXL 完全没有通知机制（需等满 300s 的 `SGLANG_DISAGGREGATION_WAITING_TIMEOUT`）；Mooncake/Mori 各有自己的传输格式。统一的跨后端通知机制正在推进中（[PR #36612](https://github.com/sgl-project/sglang/pull/36612)）。
13. **ROCm 上 EAGLE 投机解码 verify 静默退化为贪心采样** —— 无论 `temperature`/`top_p` 如何设置都执行 `argmax`，在 `temp > 0` 时退化为重复循环（[PR #37134](https://github.com/sgl-project/sglang/pull/37134)）。
14. **Router SIGTERM** —— 在监听器关闭前 `/readyz` 一直返回 200，因此 k8s 可能仍会将流量路由到正在排空的 pod。排空修复正在进行中（[PR #38744](https://github.com/sgl-project/sglang/pull/38744)）。

CI 收尾事项：已关闭的 issue 包括 BF16 RL 权重更新与 `flashinfer_trtllm` 的形状不匹配（[#27787](https://github.com/sgl-project/sglang/issues/27787)）、Qwen3.5-9B 运行时 LoRA 吞掉 tool-call（[#30744](https://github.com/sgl-project/sglang/issues/30744)）、空内容 SSE 分块导致 AI SDK provider 出错（[#29441](https://github.com/sgl-project/sglang/issues/29441)），以及 `one_batch.py` 回归（[#30773](https://github.com/sgl-project/sglang/issues/30773)）。

## 6. 对应用开发者意味着什么

- **重启正在变得近乎零成本**。如果你一直在为大 MoE 模型支付 5 分钟以上的冷启动代价，仅 Weight Cache Daemon 一项就能将其压缩到亚秒级 —— 凡是模型切换 / 自动伸缩位于关键路径上的部署，都值得评估（[#33522](https://github.com/sgl-project/sglang/issues/33522)）。
- **前缀缓存对 agent 越来越智能**。T-LRU

---

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 日报 — 2026-09-10

## 今日要点
过去 24 小时的主线是 **Vulkan 后端的成熟**(spec-constant 矩阵乘法、FILL 的 2D 工作组分发、专用 iq4_xs shader),同时还有面向 RDNA3 上路由式 MoE 的 **CUDA MMQ 分块改进**。重大模型支持也已落地：**GLM-5-Next(GLM-5.3-Flash)** —— 一个 321B 的线性/稀疏注意力混合 MoE,带视觉能力 —— 以及 GigaChat 3.5 432B-A28B;与此同时，一项 ARM I8MM q4_K 优化带来了 +34.3% 的 GFLOPS 提升。

## 发布与破坏性变更
本周期共发布 11 个构建(b10871 → b10883)。值得关注的条目：
- **b10875** — 正式弃用 `--mmap`、`--mlock` 和 `--dio` CLI 标志([#28334](https://github.com/ggml-org/llama.cpp/pull/28334))。如有使用这些标志的自动化流程，请尽快迁移。
- **b10878** — `llama_sampler_chain_n` 返回类型改为 `int32_t`([#28631](https://github.com/ggml-org/llama.cpp/pull/28631),[#4574](https://github.com/ggml-org/llama.cpp/issues/4574))。
- **b10883** — Vulkan spec-constant mul-mat 类型选择([#25773](https://github.com/ggml-org/llama.cpp/pull/25773))。
- **b10881** — Vulkan FILL kernel 拆分为 2D 工作组，以规避 Intel GPU 上的 `maxComputeWorkGroupCount` 限制([#28592](https://github.com/ggml-org/llama.cpp/pull/28592))。
- **b10877** — RDNA3 上 CUDA MMQ 的 N-tile 尺寸按典型专家宽度设定([#28552](https://github.com/ggml-org/llama.cpp/pull/28552))。
- **b10876** — 以更细粒度的 `GGML_FA_QUANTS` 控制项取代 `GGML_FA_ALL_QUANTS`([#28079](https://github.com/ggml-org/llama.cpp/pull/28079));运行时回退会对未编译的组合发出警告。

## 新模型与硬件支持
- **GLM-5-Next / GLM-5.3-Flash** — 321B 混合架构(34 KDA 线性 + 11 DSA + mHC + DeepSeek-MoE),带视觉塔([#27754](https://github.com/ggml-org/llama.cpp/pull/27754),[#27773](https://github.com/ggml-org/llama.cpp/pull/27773))。目前要求 `NVIDIA_TF32_OVERRIDE=0`。关联的增强请求:[#27922](https://github.com/ggml-org/llama.cpp/issues/27922)。
- **GigaChat 3.5 432B-A28B** — DeepSeek-V3 风格的 MLA + MoE,混合注意力([#25342](https://github.com/ggml-org/llama.cpp/pull/25342))。
- **b10874** — 修复 Granite3 MoE 参数量未知的问题([#28632](https://github.com/ggml-org/llama.cpp/pull/28632))。
- **PR #25940** — RDNA4 MUL_MAT 优化(Q6_K、Q2_K、MMQ 条件)，已对照 ROCm 7.15 / TheRock 20260717 验证。
- **PR #26103** — `GGML_CPU_ALL_VARIANTS` 现在会优雅跳过被编译器拒绝的 ARM ISA 变体(例如 GCC < 14 + `+sme`)。

## 性能与优化
- **ARM I8MM q4_K vec_dot** — 通过针对 `by == 0` 特化 `nrc == 2` 循环，在 batch=1 下 GFLOPS 提升 +34.3%([#28673](https://github.com/ggml-org/llama.cpp/pull/28673))。
- **Vulkan iq4_xs mat-vec** — 专用 shader 在 RDNA4 上带来 **+6–17% 的 token 生成提速**，幅度取决于模型([#28426](https://github.com/ggml-org/llama.cpp/pull/28426))。
- **Vulkan stream-k MUL_MAT** — 以 256-K 元素为块拆分到各 SM,并用 resolve shader 汇总；scalar+cm1+cm2 均已实现，cm2 默认启用([#28528](https://github.com/ggml-org/llama.cpp/pull/28528))。
- **CUDA CUB TOP_K 回退** — 在早于 CCCL-3.2 的工具链上，对宽行(Qwen3.8 QSA 索引器：4 行 × n_kv 列)改用 radix-select([#28671](https://github.com/ggml-org/llama.cpp/pull/28671))。
- **SYCL TOP_K** — 面向 K=2048(qwen3.8-flash-next)的 radix-select RFC,以取代 CPU offload([#28670](https://github.com/ggml-org/llama.cpp/pull/28670))。
- **gfx1201(R9700 PRO)上的 CUDA FA 调优** — 针对 Qwen3.8 27B 长上下文的 pre-fill 调优；同时修复一个 `HS=256` 的 bug([#28102](https://github.com/ggml-org/llama.cpp/pull/28102))。
- **HIP CLIP flash-attention** — 在 D=72 时禁用，以避免在 2× RX 7900 XTX / ROCm 7.14.1 上出现 `HSA_STATUS_ERROR_MEMORY_APERTURE_VIOLATION`([#28664](https://github.com/ggml-org/llama.cpp/pull/28664))。
- **MTP KV 缓存分配** — 修复 DeepSeek2、GLM4 MoE、Cohere2 MoE 上的过度分配问题([#28630](https://github.com/ggml-org/llama.cpp/pull/28630),修复 [#28626](https://github.com/ggml-org/llama.cpp/issues/28626))。

## 稳定性与回归
**今日按严重程度排序：**

1. **显存泄漏 — DeepSeek V4 Flash + DSpark** — Draft KV 缓存每个 PP+TG 周期增长约 10 MB,直至 OOM([#27155](https://github.com/ggml-org/llama.cpp/issues/27155))。*仍开放，尚无修复 PR。*
2. **`ggml_cuda_op_rms_norm_fused` 中的 CUDA "invalid configuration argument"** — 在 `qwen4_exp` / Qwen3.8-Flash-Next 上并发批处理时触发，sm_70([#27911](https://github.com/ggml-org/llama.cpp/issues/27911))。*仍开放。*
3. **CUDA graphs 导致 RTX 5090 Laptop(sm_120)挂起** — RC 看门狗 + Xid 8;可使用 `GGML_CUDA_DISABLE_GRAPHS=1` 规避([#27330](https://github.com/ggml-org/llama.cpp/issues/27330))。
4. **CUDA 并发连接崩溃** — RTX PRO 6000 Blackwell 上的 `llama-server`([#27835](https://github.com/ggml-org/llama.cpp/issues/27835))。
5. **Adreno 830 上的 Vulkan SPIR-V 差异** — `vkCreateComputePipelines` 在 `mul_mat_vec_q4_k_f32_f32` 上失败([#28635](https://github.com/ggml-org/llama.cpp/issues/28635))。
6. **Intel Arc A770 上的 Vulkan `maxComputeWorkGroupCount` 问题** — 已由 b10881 关闭([#28247](https://github.com/ggml-org/llama.cpp/issues/28247))。
7. **SYCL 第二次 prompt 输出乱码** — Intel Arc Pro B60([#26845](https://github.com/ggml-org/llama.cpp/issues/26845))。
8. **Qwen tool_calls 损坏/挂起** — 跨多个 Qwen 模型的并行调用，约 48 个可选参数([#28522](https://github.com/ggml-org/llama.cpp/issues/28522))。
9. **Metal `--embeddings` 会构建 LM head** — 产生数 GiB 被丢弃的张量，长输入时 embedding 全为 NaN([#27784](https://github.com/ggml-org/llama.cpp/issues/27784))。
10. **DSpark + LFM2.5-8B-A1B(MoE)在 `graph_reserve` 处崩溃** — 稠密版 LFM2.5 不受影响([#28614](https://github.com/ggml-org/llama.cpp/issues/28614))。
11. **Qwen2.5-Omni 在 Metal 高负载下音频损坏(b10809)**([#28441](https://github.com/ggml-org/llama.cpp/issues/28441))。
12. **RTX 5060 Ti 16GB(Blackwell)上 IQ3_S 输出乱码**([#28581](https://github.com/ggml-org/llama.cpp/issues/28581))。
13. **OpenCL 后端在 Adreno 上中止退出** — 多项 shader/查询修复正在进行中([#27630](https://github.com/ggml-org/llama.cpp/pull/27630))。
14. **Jinja `null in <map>`** — 现按普通查找处理([b10872](https://github.com/ggml-org/llama.cpp/pull/28620))。
15. **Q8_0 在 numpy 1.x 下数据损坏** — 已关闭([#28438](https://github.com/ggml-org/llama.cpp/issues/28438))。
16. **mmap + `-ot "...=CUDA_Host"` 被拒绝** — 已关闭([#28223](https://github.com/ggml-org/llama.cpp/pull/28223))。

CI/打包：**Vulkan CI 切换到 NVIDIA r615** 的工作正在进行中，以消除间歇性的 coopmat1 失败([#28659](https://github.com/ggml-org/llama.cpp/issues/28659))。

## 对应用开发者意味着什么
- 若依赖 `libllama` ABI,**请固定到 b10878 或更高版本** —— `int32_t` 采样器返回类型变更会破坏基于旧签名构建的 out-of-tree 集成。
- 在部署脚本中**将 `--mlock/--mmap/--dio` 替换为新的等价选项**，赶在它们被移除之前；目前这些还只是弃用警告，尚不是硬性错误。
- **如果你在 Intel Arc 上交付 Vulkan**,必须先部署 b10881 再承载 Qwen 3.8 flash-next 工作负载 —— 否则 FILL 上会出现 `GGML_ASSERT` 中止。
- **在提供 Qwen3.8 / GLM-5.3-Flash 服务时**，请密切关注 DSpark + MoE 显存泄漏([#27155](https://github.com/ggml-org/llama.cpp/issues/27155))以及 `cuda_rms_norm_fused` 并发批处理崩溃([#27911](https://github.com/ggml-org/llama.cpp/issues/27911))—— 可考虑在 sm_120 上用 `GGML_CUDA_DISABLE_GRAPHS=1` 作为临时缓解措施。
- **对于 Apple/边缘设备上的 ARM 推理**，I8MM q4_K 路径如今已是一条快车道 —— 用 `-march=armv8.2-a+i8mm` 重新构建 GGUF 量化 + 后端，即可在低 batch 下立即获得 >30% 的吞吐收益。
- **GLM-5.3-Flash 与 GigaChat 3.5** 已进入合并轨道；预计 1–2 个发布周期内正式可用。在切入生产流量之前，请先验证工具调用/语法路径(借助 [#28668](https://github.com/ggml-org/llama.cpp/pull/28668),XML 工具参数现已强制校验枚举值)。
- **运行 pooled 模型的 Metal embedding 服务器**应审计内存消耗 —— [#27784](https://github.com/ggml-org/llama.cpp/issues/27784) 表明 LM head 会被物化，随后被静默丢弃但并未释放。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama Digest — 2026-09-10

## Today's Highlights
The most consequential items today are infrastructure-level: a new native Intel SYCL (oneAPI) backend PR that adds first-class support for Intel Arc discrete GPUs, plus a cluster of correctness and stability bugs affecting the OpenAI/Anthropic compatibility layer (file-descriptor leak, silent all-zero embeddings, multi-GPU VRAM mis-accounting). Two of those regressions already have matching fixes merged or in flight.

## Releases & Breaking Changes
No new releases in the last 24 hours.

## New Model & Hardware Support
- **Intel SYCL / oneAPI backend** for Linux, opt-in, targeting Intel Arc discrete GPUs such as the Arc B70 32GB, including a C++ engine in llama.cpp plus integrated hardware discovery/refinement. PR [#18333](https://github.com/ollama/ollama/pull/18333).
- **MLX runner hygiene on non-Apple-Silicon / non-CUDA hosts**: MLX dynamic loader now reports missing symbols lazily instead of printing `CHECK failed: mlx_compile_cache_new_` to stderr on every `ollama` command. PR [#18335](https://github.com/ollama/ollama/pull/18335) (closes [#18283](https://github.com/ollama/ollama/issues/18283)).
- **Cloud model catalog request** for late-2026 frontier open models (Ornith, Longcat 2.0, Mimo v2.5/pro, Olmo 3.1, Laguna xs 2.1, Hunyuan Hy3, Jamba, Step 3.7). Issue [#17100](https://github.com/ollama/ollama/issues/17100).

## Performance & Optimization
- **Per-request log volume**: `llama-server` is currently spawned with `--log-verbosity 4`, dumping ~20 lines of slot bookkeeping per request into Ollama's stderr. A PR proposes suppressing that unless debug logging is enabled, fixing the journald noise reported in [#16897](https://github.com/ollama/ollama/issues/16897). PR [#17913](https://github.com/ollama/ollama/pull/17913).
- **Qwen3 tool-call parser** now preserves literal `</tool_call>` text that appears inside JSON argument values (e.g., file contents), avoiding false splits and "unexpected end of JSON" errors. PR [#18340](https://github.com/ollama/ollama/pull/18340).
- **Large numeric tool arguments**: `int64` cast without range check was silently turning values like `1e20` into `-9223372036854775808`; values outside int64 range are now kept as floats, with boundary tests for Qwen/GLM/Glimmer. PR [#18341](https://github.com/ollama/ollama/pull/18341).
- **MLX runner lifecycle**: scheduler no longer starts the next model load while a killed MLX runner is still exiting, preventing memory from the previous model bleeding into the next load. PR [#18345](https://github.com/ollama/ollama/pull/18345).

## Stability & Regressions
Ranked roughly by severity.

1. **File-descriptor leak in `/api/generate`** — `ollama serve` retains one FD per *successfully served* generate request for the lifetime of the process; FDs accumulate until a restart is required. New, no fix yet. Issue [#18344](https://github.com/ollama/ollama/issues/18344).
2. **Silent all-zero embedding vectors under sustained load** — `/v1/embeddings` and `/api/embed` return HTTP 200 with correct dimensionality (4096) and plausible `usage.prompt_tokens`, but vectors are all zeros; nothing in logs distinguishes success from failure. Dangerous for retrieval pipelines. Issue [#17878](https://github.com/ollama/ollama/issues/17878).
3. **Multi-GPU VRAM accounting uses wrong device names** — scheduler's `vramByDevice` / `systemFreeAtLoad` maps are keyed by `llama-server`'s log device names, but three lookup sites read `DeviceInfo.Name` from discovery. A `visible_devices` filter renumbers the child and the two diverge. Fix in flight. Issue [#18349](https://github.com/ollama/ollama/issues/18349) / PR [#18350](https://github.com/ollama/ollama/pull/18350).
4. **Vulkan regression on AMD iGPUs (Radeon 780M and 66 GB models)** — `radv/amdgpu: Not enough memory for command submission` / `vk::Queue::submit: ErrorDeviceLost` since v0.32.10/v0.32.12. Issue [#18272](https://github.com/ollama/ollama/issues/18272) was closed today without a confirmed fix; [#17748](https://github.com/ollama/ollama/issues/17748) remains open for the 780M.
5. **Anthropic `/v1/messages` complex tool schemas** — Claude Code pointed at Ollama as `ANTHROPIC_BASE_URL` falls back to emitting the tool call as literal text instead of a structured `tool_use` block when the schema is non-trivial. Issue [#18346](https://github.com/ollama/ollama/issues/18346).
6. **Gemma4:e2b startup crash** — `GGML_ASSERT(n_inputs < GGML_SCHED_MAX_SPLIT_INPUTS) failed` in WSL2. Long-standing, 8 👍, 22 comments. Issue [#16506](https://github.com/ollama/ollama/issues/16506).
7. **`qwen2.5-coder:3b-instruct` q2_K/q3_K* quantizations functionally broken** — fluent-looking but 0/15 on a 15-task functional suite; sibling quants unaffected. Issue [#18252](https://github.com/ollama/ollama/issues/18252).
8. **`ollama launch codex-app` breaks Codex's built-in browser** — native pipe trust fails (`privileged native pipe bridge is not available`). Issue [#16177](https://github.com/ollama/ollama/issues/16177). Namespace-tool variant [#17618](https://github.com/ollama/ollama/issues/17618) was closed today.
9. **Ollama Apps "Restart Claude Desktop" toggle silently reverts** on macOS 0.33.2 and writes no gateway config. Issue [#18188](https://github.com/ollama/ollama/issues/18188).
10. **Context-window slider hard-capped at 256K** even though several library models advertise 1M context. Issue [#18352](https://github.com/ollama/ollama/issues/18352).

**Closed today (fixes landed or previously shipped):**
- `/v1/responses` rejecting `agent_message` items — fixed by [#18298](https://github.com/ollama/ollama/pull/18298) (closes [#18286](https://github.com/ollama/ollama/issues/18286)).
- `tool_choice` silently ignored on OpenAI + Anthropic compat layers — fixed by [#17935](https://github.com/ollama/ollama/pull/17935).
- Codex `function_call_output` items without `call_id` rejected during compaction — fixed by [#18348](https://github.com/ollama/ollama/pull/18348).
- Full-Access mode escalation for namespaced `exec_command` — normalized by [#18331](https://github.com/ollama/ollama/pull/18331).
- ChatGPT model selector chip spacing — fixed by [#18347](https://github.com/ollama/ollama/pull/18347).
- `agent` skill-not-found error message — fixed by [#18020](https://github.com/ollama/ollama/pull/18020).
- Linux uninstall docs (`tr 'bin' 'lib'`) character-translation bug — fixed by [#18339](https://github.com/ollama/ollama/pull/18339).
- Xcode guide trailing whitespace — [#18338](https://github.com/ollama/ollama/pull/18338).
- Long-standing request to delete partially-downloaded models — [#1599](https://github.com/ollama/ollama/issues/1599) closed (likely via existing `ollama rm` behavior or docs clarification).
- Cloud proxy swallowing upstream stream failures — PR [#18351](https://github.com/ollama/ollama/pull/18351) propagates non-client stream-copy failures via `http.ErrAbortHandler` (open; fixes [#18193](https://github.com/ollama/ollama/issues/18193)).

## What This Means for Application Developers
- **Treat embedding health checks as mandatory.** With [#17878](https://github.com/ollama/ollama/issues/17878), a production retrieval pipeline can silently degrade to zero vectors while still receiving HTTP 200 and a plausible token count. Add a probe that asserts vector norm or a sentinel similarity against a known pair, and alert on the *absence* of errors, not just their presence.
- **Expect FD exhaustion under sustained `/api/generate` traffic.** [#18344](https://github.com/ollama/ollama/issues/18344) means long-lived `ollama serve` instances will leak FDs even on successful requests. Plan for periodic restart or run behind a supervisor that recycles on FD count until a fix ships.
- **Multi-GPU users on 0.32.10+ should pin to a known-good build or constrain `CUDA_VISIBLE_DEVICES` to start at device 0** until [#18350](https://github.com/ollama/ollama/pull/18350) lands, because scheduler VRAM accounting currently diverges from reality whenever devices are filtered.
- **AMD Radeon iGPU / Vulkan users should hold off on 0.32.10+ for large models** ([#18272](https://github.com/ollama/ollama/issues/18272), [#17748](https://github.com/ollama/ollama/issues/17748)); v0.32.9 is the last known-working version.
- **Tool-calling clients should pin `tool_choice`** ([#17935](https://github.com/ollama/ollama/pull/17935) now respects it on both OpenAI and Anthropic layers) — pre-fix builds silently ignored it, returning text when a tool was forced.
- **Codex-on-Ollama users get a usable `/v1/responses` and namespace tooling now** ([#18298](https://github.com/ollama/ollama/pull/18298), [#18331](https://github.com/ollama/ollama/pull/18331), [#18348](https://github.com/ollama/ollama/pull/18348)); the remaining gap is the Codex built-in browser native pipe ([#16177](https://github.com/ollama/ollama/issues/16177)) and complex-tool-schemas via Anthropic compat ([#18346](https://github.com/ollama/ollama/issues/18346)).
- **Intel Arc B70 / discrete Intel GPU** deployments get a real path forward with [#18333](https://github.com/ollama/ollama/pull/18333) — opt-in SYCL build instead of CPU fallback or unsupported Vulkan.
- **Long-context workloads are limited by UI**, not model capability ([#18352](https://github.com/ollama/ollama/issues/18352)); pass the context window via Modelfile / API rather than the slider for now.

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-10

## 今日要点
- **v1.102.0-dev.1 开发预览版**发布，文档现已明确记录使用 cosign 对所有 LiteLLM Docker 镜像进行签名验证（[PR #39062](https://github.com/BerriAI/litellm) 发布说明）。
- **Bedrock 出现重大性能回退**——请求签名此前运行在事件循环中，目前正在修复（[PR #40270](https://github.com/BerriAI/litellm/pull/40270)）；一次 Bedrock 调用就可能让工作进程上的所有其他请求冻结。
- **v3 限流器存在一个严重的正确性缺陷**（[Issue #34140](https://github.com/BerriAI/litellm/issues/34140)）：按团队、模型设置的 `model_rpm_limit`/`model_tpm_limit` 实际按配置值的一半执行；而在虚拟密钥被缓存后，按客户设置的 RPM 限制会停止生效（[Issue #39713](https://github.com/BerriAI/litellm/issues/39713)）。

## 版本发布与破坏性变更
- **[v1.102.0-dev.1](https://github.com/BerriAI/litellm)**——面向下一 minor 版本的首个开发版本。目前尚无正式更新日志。值得注意：所有镜像现均使用稳定密钥签名（commit [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0)）；可使用 `cosign verify` 验证。
- 此开发版本尚未宣布任何弃用项或线上格式破坏。

## 新模型与硬件支持
持续更新模型注册表（[PR #31884](https://github.com/BerriAI/litellm/pull/31884)）及相关提供商：
- **OpenAI**：`gpt-6-astra`、`gpt-image-2.5`，ChatGPT `gpt-5.5`/`gpt-5.6`，以及 `openai.web_search` 费用。
- **xAI**：`grok-imagine-video`、`grok-imagine-video-1.5`。
- **Google**：`lyria-3.5`（音频），Vertex `grok-4.3`/`4.6`/`4.20`。
- **Cohere**：Bedrock 上的 rerank 4。
- **Voyage**：`voyage-multilingual-2`。
- **Bedrock**：Mantle 系列；更新了 Scaleway 的按日期计费。
- **Vertex**：新增原生 OCR 支持（Rust 核心），支持 ADC 和 service-account 认证（[PR #40466](https://github.com/BerriAI/litellm/pull/40466)）。

## 性能与优化
- **[PR #40270](https://github.com/BerriAI/litellm/pull/40270)**——Bedrock 请求签名现已从 `/v1/messages`、Converse、count tokens 和透传路径的事件循环中移出。`botocore` 凭据刷新（一次阻塞式 HTTP 调用）不再阻塞工作进程；这是本次发布中影响最大的稳定性/性能改进。
- **[PR #40486](https://github.com/BerriAI/litellm/pull/40486)**——当所选单实例层不健康时，自动路由器现在会回退到健康的默认层，而不是直接报错。
- **[PR #40483](https://github.com/BerriAI/litellm/pull/40483)**——重排路径会从序列化后的提供商参数中移除请求上下文中的文档载荷；大型重排请求不再会因内存不足而终止代理服务。
- **[PR #40482](https://github.com/BerriAI/litellm/pull/40482)**——新增 e2e 门禁，用于模拟重试压力下的 Redis 命令超时；专门针对 v1.100.0 OOM 线索（LIT-6780）进行测试，而此前 12 天的发布前持续稳定性测试未能发现该问题。
- **[PR #40465](https://github.com/BerriAI/litellm/pull/40465)**——E2E 覆盖现可确保每条 spend-log 写入路径都与虚拟密钥关联，防止重演 v1.99.0 事故（#39568、#39572）：未关联的行曾以 `key-hash-*` 的形式展示给客户。

## 稳定性与回归问题
以下按用户可见影响的严重程度排序：

1. **严重——v3 限流器对团队/模型限制的执行力度不足**（[#34140](https://github.com/BerriAI/litellm/issues/34140)）。按团队设置的 `model_rpm_limit` 会在约 N/2 时返回 429，而不是 N。尚无修复 PR；在问题解决前，运维人员应暂时提高限制配置。
2. **严重——按客户设置的 RPM 限制在缓存后停止生效**（[#39713](https://github.com/BerriAI/litellm/issues/39713)）。虚拟密钥缓存预热后，`litellm_settings.max_end_user_budget_id` 和直接设置的用户预算会失效。尚无修复 PR。
3. **高——Bedrock 异步签名占用事件循环**（[#13245](https://github.com/BerriAI/litellm/issues/13245) + [PR #40270](https://github.com/BerriAI/litellm/pull/40270)）。一次凭据过期刷新会冻结工作进程，并在客户端断开时破坏并发 spend tracking。**修复中**。
4. **高——升级至 1.88.0 后 `/metrics` 为空**（[#30079](https://github.com/BerriAI/litellm/issues/30079)）。Prometheus 抓取会遇到 307 重定向，因而获取不到数据。该问题已长期存在。
5. **高——自 v1.87.0 起流式工具调用续接功能失效**（[#30053](https://github.com/BerriAI/litellm/issues/30053)）。Bedrock-Claude 后续请求中，`async_streaming_data_generator` 内的 `fast_path` 会返回 XML，而不是文本。尚无修复 PR。
6. **中——非 OSS Cluster 上出现 Redis CROSSSLOT**（[#30065](https://github.com/BerriAI/litellm/issues/30065)）。在 Azure Redis Enterprise 和 Managed Redis 上，`_group_keys_by_hash_tag()` 会跳过分组。
7. **中——OTEL 回调导致 Pod 崩溃**（[#30061](https://github.com/BerriAI/litellm/issues/30061)）。启用 otel 后，`NoneType` trace 会引发崩溃循环。
8. **中——`least-busy` 路由导致部署资源饥饿**（[#39322](https://github.com/BerriAI/litellm/issues/39322)）。response-cache 命中会使计数漂移为负数；该计数不会在多个工作进程间共享；出现并列时总会选择第一个部署。
9. **中——内部用户的 `max_budget` 会阻止零成本模型**（[#29912](https://github.com/BerriAI/litellm/issues/29912)）。对于免费模型，`_PROXY_MaxBudgetLimiter` 会忽略 `skip_budget_checks`。
10. **中——测试在 `litellm-database` 镜像内失败**（[#40357](https://github.com/BerriAI/litellm/issues/40357)）。在设置了环境级 `SSL_CERT_FILE` 后，9 个 AWS 用例会失败；CI 一直未能捕获此问题。

**近期已关闭（好消息）**：
- [#40237](https://github.com/BerriAI/litellm/issues/40237) Complexity 自动路由器不再跨组移动 `reasoning.encrypted_content`；[PR #40451](https://github.com/BerriAI/litellm/pull/40451) 现在可通过 `/v1/messages` 桥接，以字节稳定的方式重放 OpenAI 加密推理。
- [#40279](https://github.com/BerriAI/litellm/issues/40279) 已修复 `gpt-6-astra` 模型检测（包括 `is_model_gpt_5_model` 等）。
- [#39145](https://github.com/BerriAI/litellm

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-10

## 今日要闻

Unsloth 发布了 **v0.1.808-beta**,这是一次重大的性能与可靠性更新,带来了 1.2–1.7 倍的扩散训练加速、通过 Vulkan 为 AMD ROCm 提升 20%,以及 2 倍的 `studio update` 速度。Studio 工作全速推进:今天的 PR 浪潮以依赖项传递优化(基于清单的跳过、PyPI 离线韧性、sidecar 重建最小化)以及单 llama-server 多对话场景下的 KV-cache 正确性修复为主。

## 版本发布与破坏性变更

**v0.1.808-beta — 大幅性能提升 + 修复** ([release](https://github.com/unslothai/unsloth))
- 亮点:扩散训练快 1.2–1.7 倍;AMD ROCm 通过 Vulkan 路径提升 20%
- 更新速度提升 2 倍;Windows 下 SAC + AV 误报移除
- 新增 Blender MCP 集成;Hermes 风格响应现已自动检测
- AMD 乱码输出 bug 已修复(已上报 AMD 上游)

本批值得注意:一个长期存在的 **Apple Silicon 支持** 请求([#4](https://github.com/unslothai/unsloth/issues/4),644 👍,自 2023 年起开放)在本更新周期被关闭,表明 MLX/Metal 即将或正在落地。

## 新增模型与硬件支持

- **AMD ROCm / Vulkan** 内核路径现已激活,并带来可衡量的性能提升(见发布说明)。
- **AMD Strix Halo APU(gfx1151,统一内存)** — Issue [#6834](https://github.com/unslothai/unsloth/issues/6834) 解决了 Studio 拒绝将 21.3 GB GGUF 加载到 110 GB 可用统一内存的情况。
- **Intel Arc B580** 导入失败已解决([#3533](https://github.com/unslothai/unsloth/issues/3533)) — 不再假设 `torch.xpu.memory.mem_get_info()` 存在。
- **Gemma 4** 图像输入 bug 在 Studio/llama-server 中暴露([#10559](https://github.com/unslothai/unsloth/issues/10559),OPEN) — 默认 `ubatch` 过小;需要上游 llama.cpp 升级。
- **Qwen3-Coder-Next-Base** 在 2×A100 80GB QLoRA 上 OOM 已记录并分诊([#4040](https://github.com/unslothai/unsloth/issues/4040))。

## 性能与优化

| 领域 | 变更 | 来源 |
|---|---|---|
| 扩散训练 | 快 1.2–1.7 倍 | v0.1.808-beta |
| AMD ROCm 推理/训练 | 通过 Vulkan 提升 20% | v0.1.808-beta |
| `studio update` 冷启动路径 | 快 2 倍(16 步依赖项传递) | v0.1.808-beta |
| transformers sidecar 重建 | 仅重建磁盘证据过期的 sidecar(此前在 Windows 上耗时 60–90s) | PR [#10650](https://github.com/unslothai/unsloth/pull/10650) |
| 依赖项传递跳过逻辑 | 仅在清单证据 + 磁盘状态 + 版本三者全部匹配时跳过步骤 | PR [#10649](https://github.com/unslothai/unsloth/pull/10649) |
| llama.cpp/whisper.cpp/Node 安装校验 | 读取版本标记而非重新下载(macOS 上节省 13–63s) | PR [#10648](https://github.com/unslothai/unsloth/pull/10648) |
| KV-cache 利用率 | 并行对话共享一个 `--kv-unified` 池,不再相互挤占 | PR [#10301](https://github.com/unslothai/unsloth/pull/10301) |
| KV 预留强制执行 | 从仅账本记录升级到协议层强制执行,4 路并行 GGUF 对话不再全部失败 | PR [#10120](https://github.com/unslothai/unsloth/pull/10120) |

一个可选的 **E2E 测试** 正在落地([#10652](https://github.com/unslothai/unsloth/pull/10652)),用于断言第二次 `studio update` 是真正的空操作(通过 CONNECT 代理进行网络字节归因) — 这表明团队正在将更新幂等性视为一等 SLA。

## 稳定性与回归

**本周期关闭(高影响):**
- [#3450](https://github.com/unslothai/unsloth/issues/3450) — Qwen2 Kaggle 上的 `NameError: slice_indices`(已修复,等待确认)。
- [#3650](https://github.com/unslothai/unsloth/issues/3650) — Gemma 3n 最大递归深度。
- [#3086](https://github.com/unslothai/unsloth/issues/3086) — 视觉训练中 `fetch_video` 未定义。
- [#3399](https://github.com/unslothai/unsloth/issues/3399) — 与 TRL 的 prompt-completion 数据集支持对齐。
- [#1869](https://github.com/unslothai/unsloth/issues/1869) — 长上下文(平均 12k token)CPT padding 错误。
- [#2364](https://github.com/unslothai/unsloth/issues/2364) — Phi-3.5/4-mini 上仅含 `-100` 标签引发的 `ZeroDivisionError`。
- [#868](https://github.com/unslothai/unsloth/issues/868) — GGUF 导出中的 `KeyError: EOS_TOKEN`。
- [#2497](https://github.com/unslothai/unsloth/issues/2497) — 异常 `name_or_path` 导致的 `_fast_inner_training_loop` 除零错误。

**仍然 OPEN(按严重程度排序):**

- **[#10545](https://github.com/unslothai/unsloth/issues/10545) — `hf-stack` 安全审计通道在 `main` 上为红色。** `unsloth-zoo` 升级后,164 个发现(60 CRITICAL、33 HIGH)被陈旧基线抑制。在任何带标签的发布前需要重新建立基线并进行依赖项审查。
- **[#10559](https://github.com/unslothai/unsloth/issues/10559) — `llama-server` 在 Gemma 4 图像输入上 GGML_ASSERT。** 默认 `ubatch` 过小;阻塞该系列的视觉推理路径。
- **[#10573](https://github.com/unslothai/unsloth/issues/10573) — Unsloth Desktop 0.1.807-beta(Windows)在连接 vLLM 时拒绝 `min_p` + `logit_bias`。** 暴露出 vLLM OpenAI 服务器的能力缺口,Studio 用户会立即遇到。
- **[#9033](https://github.com/unslothai/unsloth/issues/9033) — Unsloth Desktop 在 Windows 上"不预留系统 RAM"无效。** 即便使用 `-ngl -1`,当模型和 KV cache 完全驻留 VRAM 时,系统内存仍被占用。通过 PR [#10618](https://github.com/unslothai/unsloth/pull/10618) 缓解,该 PR 在 Windows 无预留加载时避免驻留 GGUF 映射(Windows 上游 `unmap_fragment` 是空操作)。
- **[#10004](https://github.com/unslothai/unsloth/issues/10004) — Studio 多轮确定性冒烟测试在 merge base 上间歇性失败。** 影响 Studio 推理回归检测的 CI 信任。
- **[#8473](https://github.com/unslothai/unsloth/issues/8473) — AMD 主机:安装器报告 ROCm,而后端仅运行 CPU,无调和机制。** 已关闭,但该 bug 类(GPU 检测 ↔ 后端不匹配)在异构集群上值得持续关注。

多项正确性修复正在 PR 中但尚未合并:字面量 `<think>` 文本剥离([#10662](https://github.com/unslothai/unsloth/pull/10662))、工具输出中 `__IMAGES__`/`__RAG_SOURCES__` 提及的误报信封剥离([#10668](https://github.com/unslothai/unsloth/pull/10668))、超时工具输出保留([#10664](https://github.com/unslothai/unsloth/pull/10664)),以及上传时的 Unicode 文件名损坏([#10667](https://github.com/unslothai/unsloth/pull/10667))。

## 对应用开发者的意义

1. **Studio 正在变得幂等且可观测。** 随着依赖项传递跳过 + E2E 空操作测试框架的落地,`studio update` 将不再是尽力而为,而是确定性的。对之前不得不重试或锁定版本的车队自动化和 CI runner 来说非常有用。
2. **KV-cache 工作改变了并行对话的经济性。** PR [#10301](https://github.com/unslothai/unsloth/pull/10301) + [#10120](https://github.com/unslothai/unsloth/pull/10120) 意味着单个模型现在可以从统一池为 N 个并发对话提供服务,不会因 OOM 杀死对端。如果你正为 agent 工作负载规划单 GPU 推理盒,请重新审视 `--parallel` 和 `-c` 的算式 — 旧公式(`-c ≥ sum_of_contexts`)不再成立,可以放宽。
3. **AMD 现在是一等公民,而非脚注。** Vulkan +20% 以及 Strix Halo 统一内存修复,使 ROCm APU 在 Studio 工作负载中与 CUDA 平起平坐。值得在下次规划前重新基准测试你的 AMD 集群。
4. **关注 vLLM 缺口。** Desktop 0.1.807 在 vLLM 上拒绝 `min_p` 和 `logit_bias` — 如果你依赖其中任一参数,请锁定 llama.cpp 后端或等待对齐;否则你的采样参数将静默失效。
5. **安全通道为红色。** 在 [#10545](https://github.com/unslothai/unsloth/issues/10545) 解决前,请将 `hf-stack` 基线视为不可信 — 如果你将这些 wheel 镜像到私有索引,请运行自己的 `pip-audit`,而非信任公共扫描输出。
6. **#4 的 Apple Silicon 关闭** 是今天最大的生态信号。如果这代表真正的 MLX 支持(而非仅仅是"不予修复"式关闭),每个现有的 Unsloth notebook 都将在 M 系列上无需额外配方即可运行。在更新营销/基础设施文案前请先确认。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — 每日摘要
**日期：** 2026-09-10
**仓库：** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)
**活动时间窗口：** 最近 24 小时（无新发布）

---

## 1. 今日要点

CCR 社区的关注点正在聚焦于**提供商兼容性差距**，而非核心路由性能本身。今天新增的三个 issue（#1781、#1780、#1779）都报告了上游侧的 4xx 拒绝错误，而这些错误 CCR 并未提前预判：Meta Responses schema 在工具调用上的不匹配、opencode-go 新增的强制请求头，以及 OIDC 联盟激活的回退问题。好的一面是，三个长期搁置的 PR（#865、#1224、#1225）于今日合并，分别带来了更干净的子代理路由、自定义 OpenRouter 请求头转发，以及更安全的"缺失 API 密钥"警告。

---

## 2. 发布与破坏性变更

*最近 24 小时内无新发布。* 用户报告中引用的当前已发布版本为 **CCR 3.0.22**。

---

## 3. 新模型与硬件支持

本窗口内无新模型、后端（CUDA/ROCm/Metal/CPU）或量化格式的添加。

---

## 4. 性能与优化

本窗口内无吞吐量/延迟/内存相关的工作。最接近的一项，[PR #1773](https://github.com/musistudio/claude-code-router/pull/1773)，其目标在于**可观测性**而非性能：它在聚合的 `"All target providers failed"` 错误中暴露每次尝试的 `stage`/`status`/`message` 详情，以便运维人员精确定位是哪个提供商及对应 HTTP 状态码引发了级联失败。

---

## 5. 稳定性与回归

今天报告的三个用户提交的 bug；均为**兼容性/契约不匹配**，而非崩溃或内存问题。目前均尚未关联修复 PR。

| 严重度 | Issue | 摘要 | 修复 PR |
|---|---|---|---|
| **高** | [#1781](https://github.com/musistudio/claude-code-router/issues/1781) | 当通过 `anthropic_messages` → OpenRouter → `meta/muse-spark-1.3-contributor` 路由时，tool_use/tool_result 块被转换为 Meta Responses 的 `input[]` 格式，但所需的 `call_id` 被丢弃，且 `max_tokens` 未被向下取整到 Meta 的最小值。结果：OpenRouter 返回 `400`。 | 无 |
| **高** | [#1780](https://github.com/musistudio/claude-code-router/issues/1780) | 自 2026-09-05 起，`opencode.ai/zen/go/v1`（opencode-go）要求携带 `x-opencode-session` 请求头。CCR 的提供商请求被原样转发，因此全部返回 `400 MissingSessionID`。影响任何 `api_base_url` 指向该端点的提供商。 | 无 |
| **高** | [#1779](https://github.com/musistudio/claude-code-router/issues/1779) | 在 CCR 3.0.22 + Claude Code 2.1.23 下，Claude Code 配置文件失败并提示 `Not logged in`，尽管 CCR 已导出 `oidc_federation` 环境变量 — OIDC 模式实际上从未被激活。这阻塞了 OAuth 配置文件背后免费的 `:free` OpenRouter 模型。 | 无 |

**今日关闭（不再处于开放的回归状态）：**
- [PR #1225](https://github.com/musistudio/claude-code-router/pull/1225) — 子代理 `<CCR-SUBAGENT-MODEL>` 覆盖现在可被可靠地检测到（此前仅检查 `system[1].text`）。
- [PR #1224](https://github.com/musistudio/claude-code-router/pull/1224) — 自定义 `providerConfig.headers` 现在被合并进上游 `fetch` 调用（例如 OpenRouter 应用归属头等）。
- [PR #865](https://github.com/musistudio/claude-code-router/pull/865) — 移除了 API 密钥缺失时强制覆盖 `HOST=127.0.0.1` 的行为；改为输出警告，从而恢复了部署的灵活性。

---

## 6. 对应用开发者的影响

- **与非 Anthropic 提供商配合时，工具调用目前相当脆弱。** 若你通过 OpenRouter 上的 Meta 后端模型路由 Anthropic 格式的工具调用，在 [#1781](https://github.com/musistudio/claude-code-router/issues/1781) 修复前预计会收到 `400`。临时方案：通过纯 OpenAI 兼容路径路由 Meta 模型，或对这些路由禁用 tool_use。
- **opencode-go 端点自 2026-09-05 起经由 CCR 实际上处于不可用状态**（[#1780](https://github.com/musistudio/claude-code-router/issues/1780)）。在请求头注入实现之前，请勿将 `api_base_url` 指向 `https://opencode.ai/zen/go/v1`。
- **针对 Claude Code 2.1.23 的 OIDC/联邦化配置文件在 CCR 3.0.22 上已损坏**（[#1779](https://github.com/musistudio/claude-code-router/issues/1779)）。在问题解决前，请将 Claude Code 锁定到更早的构建版本，或改用 API 密钥认证。
- **更好的调试能力即将到来。** [PR #1773](https://github.com/musistudio/claude-code-router/pull/1773) 将使多提供商回退的故障排查变得容易得多 — 留意下一个版本。
- **近期已合入主干的体验改进：** 自定义上游请求头（[#1224](https://github.com/musistudio/claude-code-router/pull/1224)）与可靠的子代理模型覆盖（[#1225](https://github.com/musistudio/claude-code-router/pull/1225)）现已在从 `main` 构建时可用。HOST 覆盖移除（[#865](https://github.com/musistudio/claude-code-router/pull/865)）意味着在 API 密钥缺失时，容器化部署不再被静默重绑到 loopback — 请确认你的反向代理/入口仍绑定到对外网卡。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 摘要 — 2026-09-10

## 1. 今日要点

CC Switch 的代理层今天得到了有意义的加固：PR [#7259](https://github.com/farion1231/cc-switch/pull/7259) 修复了一个 URL 转发的 Bug——"完整 URL"模式若配置到 `/v1`，会静默丢弃 wire-API 路径；PR [#7207](https://github.com/farion1231/cc-switch/pull/7207) 修补了一个 P0 熔断器 Bug——当 `max_half_open_requests=1` 时实际等同于未设置，因为 permit 守卫在 forwarder 完成前就被丢弃。供应商方面，官方 MiniMax 预设现已默认使用 **MiniMax-M3**（PR [#7255](https://github.com/farion1231/cc-switch/pull/7255)），Codex 也新增了对 **GitHub Copilot** 的一级路由（PR [#7157](https://github.com/farion1231/cc-switch/pull/7157)）。Claude Code 兼容性方面承压——issue [#7236](https://github.com/farion1231/cc-switch/issues/7236)（CLI 2.1.265 上 DeepSeek/ZAI 失效）是过去 24 小时内最尖锐的用户可见回退。

## 2. 发布与破坏性变更

_过去 24 小时内无新发布。_

## 3. 新增模型与硬件支持

- **MiniMax-M3** 成为全部 7 个受支持系列的新 MiniMax 预设默认值；已移除过期的 MiniMax Coding Plan 促销（[#7255](https://github.com/farion1231/cc-switch/pull/7255)）。
- 新增 **Laonong API**（`laonongapi`）作为内置供应商预设——兼容 OpenAI-SDK 的网关，聚合 40+ 模型，包括 GPT-4o、Claude 3.5 Sonnet、DeepSeek、Gemini（[#7245](https://github.com/farion1231/cc-switch/pull/7245)）。
- **GitHub Copilot** 作为托管 Codex 供应商——代理现在根据模型的 `supported_endpoints` 选择 Responses 或 Chat Completions 上游（[#7157](https://github.com/farion1231/cc-switch/pull/7157)）。
- **OpenCode Go** 会话亲和性——代理现在为每次会话稳定地写入 `x-opencode-session` 头（自 2026-09-06 起上游要求）（[#7246](https://github.com/farion1231/cc-switch/pull/7246)）。
- **Grok Build** Responses 负载规范化——处理上游省略 `annotations` 的 `output_text` parts，覆盖 SSE 与 JSON 路径（[#6820](https://github.com/farion1231/cc-switch/pull/6820)）。
- 本地化：新增 **Portuguese-BR** 翻译集与 README（[#7046](https://github.com/farion1231/cc-switch/pull/7046)）。

## 4. 性能与优化

- **Responses 流式 TTFT 准确性**——首字节计时现在在首个有效响应事件上记录，而非延迟到用量统计完成；之前 TTFT 可能等于总时长（[#7233](https://github.com/farion1231/cc-switch/pull/7233)）。
- **熔断器正确性**——`forwarder.rs` 中重构了 RAII 守卫，确保 half-open permit 在 in-flight 探测整个生命周期内被实际持有；`HalfOpenPermitGuard::disarm()` 现在在 drop 时也会释放 permit，修复了计数泄漏（[#7207](https://github.com/farion1231/cc-switch/pull/7207)）。
- **Claude Code steer 消息的缓存命中保留**——可选地将 `system`（steer / todo / background）转换为 `user`，使 Chat Completions 网关在会话中途用户提示下保持缓存 key 稳定（[#7253](https://github.com/farion1231/cc-switch/pull/7253)）。
- **Responses 推理摘要保留**——Anthropic thinking blocks 现在能正确重放，不再在推理摘要可见时泄漏 `redacted_thinking`（[#6814](https://github.com/farion1231/cc-switch/pull/6814)）。
- **轻量模式自动进入**——新增设置（0–1440 分钟，默认 5 分钟），主窗口隐藏后自动收起至托盘（[#7114](https://github.com/farion1231/cc-switch/pull/7114)）。

## 5. 稳定性与回退

**P0（影响生产）：**
- **熔断器 HalfOpen permit 泄漏 / 限制被忽略**——由于 permit 守卫在 forwarder 完成前就被解构，`max_half_open_requests=1` 被绕过。修复见 PR [#7207](https://github.com/farion1231/cc-switch/pull/7207)。
- **Codex 26.905 / codex v0.153.x 本地路由被绕过**——请求跳过 15721 代理直接命中 `api.openai.com`；第三方中继也无法连接，因为 responses API 被强制使用。Open: [#7217](https://github.com/farion1231/cc-switch/issues/7217)。

**P1（用户可见的损坏）：**
- **Claude Code 2.1.265 破坏 DeepSeek / ZAI**——关闭于 [#7236](https://github.com/farion1231/cc-switch/issues/7236)（内有解决方案细节）；另见 CLI 2.1.235 上 DeepSeek 缓存 token 报告归零 [#6626](https://github.com/farion1231/cc-switch/issues/6626)。
- **`/responses` → `/chat/completions` 在截断的函数参数上翻译 400**——历史记录中错误的 `function_call.arguments` JSON 会终止翻译。Open: [#5197](https://github.com/farion1231/cc-switch/issues/5197)。
- **Codex 切换供应商后旧会话 401**——在先前官方认证账户上继续的会话仍命中 `api.openai.com`。Open: [#5672](https://github.com/farion1231/cc-switch/issues/5672)（👍 3）。
- **Codex `image_gen.imagegen` 与同一请求中的托管工具冲突**——open/stale [#5171](https://github.com/farion1231/cc-switch/issues/5171)。
- **OpenCode Go + Anthropic Messages → 401 "Missing API key"**——认证头在代理边界被丢弃。Open: [#6258](https://github.com/farion1231/cc-switch/issues/6258)（👍 2）；在 [#7246](https://github.com/farion1231/cc-switch/pull/7246) 中部分解决。
- **完整 URL 模式下本地代理 502**——关闭 [#3585](https://github.com/farion1231/cc-switch/issues/3585)；该类 Bug 在 [#7259](https://github.com/farion1231/cc-switch/pull/7259) 中得到修复。
- **WSL2 OpenCode 配置 / 会话 / token 可见性**——open [#5061](https://github.com/farion1231/cc-switch/issues/5061)。

**P2 / 卫生：**
- Volcengine 配额查询失效（关闭 [#6070](https://github.com/farion1231/cc-switch/issues/6070)）；Coding/Agent Plan 双路结构化路由修复见 PR [#7096](https://github.com/farion1231/cc-switch/pull/7096)。
- Codex 供应商切换会覆盖 `config.toml` + `auth.json`，且未对外部添加项做物理备份——open [#6875](https://github.com/farion1231/cc-switch/issues/6875)。
- 配置文件编辑替换符号链接目标而非写入目标——open [#5129](https://github.com/farion1231/cc-switch/issues/5129)。
- Codex 本地环境监控未识别最新 codex 版本，阻碍手动更新——open [#7080](https://github.com/farion1231/cc-switch/issues/7080)。
- macOS 13：供应商检查与应用内更新不可用，codex API 调用失败——open [#6936](https://github.com/farion1231/cc-switch/issues/6936)。
- 编辑当前供应商后 Codex Mac 编辑器冻结——open [#5193](https://github.com/farion1231/cc-switch/issues/5193)。
- Windows 上无窗口的后台进程（无 WebView2 缓存 / 句柄）——open [#5185](https://github.com/farion1231/cc-switch/issues/5185)；相关修复 PR [#7240](https://github.com/farion1231/cc-switch/pull/7240) 解决了 Windows WebView2 启动白屏变种。
- Codex `/images/edits` 未走代理；不带 "完整 URL" 开关的全端点 base_url；图像流式用量——在 [#7177](https://github.com/farion1231/cc-switch/pull/7177) 中处理。
- "在非接管式切换中保留官方认证"隐藏了 GPT-6 推理强度控件——open [#7258](https://github.com/farion1231/cc-switch/issues/7258)。
- ChatGPT 26.707 启用 `image_generation` 导致 CC Switch `/responses` 纯文本请求 403——open [#5190](https://github.com/farion1231/cc-switch/issues/5190)。
- Claude Code 因 system-message steer/reminders 缓存未命中（open [#7252](https://github.com/farion1231/cc-switch/issues/7252)）；缓解 PR [#7253](https://github.com/farion1231/cc-switch/pull/7253)。

## 6. 对应用开发者的意义

- **如果你身后是为 Claude Code 提供服务的 Chat-Completions 网关**，请在 [#7253](https://github.com/farion1231/cc-switch/pull/7253) 中启用新的"响应系统转换"分组——steer/todo/background 消息目前会击穿你的缓存，这是上游变更落地前的缓解方案。
- **如果你运行 Codex v0.153.x**，请勿依赖本地路由代理（[#7217](https://github.com/farion1231/cc-switch/issues/7217)）；在该 PR 合并前，预计会有直接的 `api.openai.com` 出站以及第三方供应商的 401。请回退到更早的 codex 版本或关闭本地路由。
- **在 OpenCode Go 之上构建？** 自 2026-09-06 起你必须为每次会话发送 `x-opencode-session`（[#7246](https://github.com/farion1231/cc-switch/pull/7246)）——未发送的客户端（大多数都没有）需要代理垫片。
- **谨慎对待"完整 URL"供应商条目**——它们此前会被逐字转发，在 `/v1` 配置时可能丢弃 wire-API 路径（[#7259](https://github.com/farion1231/cc-switch/pull/7259)）；在该修复发布前，为了 OpenAI/Anthropic 兼容性，优先使用 base-URL + endpoint 形式。
- **对于多租户 / 多团队部署**，新的"跨应用复制供应商"流程（[#7225](https://github.com/farion1231/cc-switch/pull/7225)）加上 Cursor 集成（[#6124](https://github.com/farion1231/cc-switch/pull/6124)，第 9 个托管应用）值得评估；Cursor 使用 cloudflared Quick Tunnel 将本地代理暴露为公开 HTTPS BYOK 端点。
- **监控：** 一旦 [#7233](https://github.com/farion1231/cc-switch/pull/7233) 合入，从 CC Switch 用量流读取的 TTFT 仪表板会显著健康——目前该指标在 Responses 流式路由上不可靠。
- 同时拥有 Agent Plan 与 Coding Plan 的 **Volcengine（火山方舟）用户** 需要等待 [#7096](https://github.com/farion1231/cc-switch/pull/7096) 才能看到每个 plan 的独立配额；目前两条记录都报告 Agent Plan 数值。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 简报 — 2026-09-10

**项目：**[QuantumNous/new-api](https://github.com/QuantumNous/new-api)（LLM 网关 / 中继平台）
**跟踪窗口：**过去 24 小时
**跟踪版本：**v1.0.0-rc.36（窗口期内无新版本发布）

---

## 1. 今日要点

过去 24 小时的主旋律是 **AI 辅助的 bug 修复产出**：至少四个涉及资金/正确性的关键缺陷（缓存 token 计量、realtime WebSocket 双重计费、多密钥轮询丢失更新、Gemini `countTokens` 路由错误）均配有可复现的 issue 以及已合并或待处理的 PR，其中大部分由 Claude Code / Codex 编写。功能方面，**支持按分辨率和时长动态计费的 Google Veo 3.1 中继**（[PR #7280](https://github.com/QuantumNous/new-api/pull/7280)）与 **MiniMax H3 V2 视频生成**（[PR #6591](https://github.com/QuantumNous/new-api/pull/6591)）已进入评审阶段。

## 2. 版本发布与破坏性变更

- **过去 24 小时没有新的发布标签。** 代码树仍停留在 `v1.0.0-rc.36`。
- [Issue #7279](https://github.com/QuantumNous/new-api/issues/7279) 要求为 v1.0.0 系列给出成文的 **GA 标准**，而 rc.36 已在对外发布——目前尚无维护者回应。
- 未标记任何弃用或迁移说明。

## 3. 新模型与硬件支持

- **Google Veo 3.1（Vertex AI 渠道 `41` 及 Gemini 渠道）**——完整中继支持，动态计费由分辨率 × 时长驱动；RAI 过滤失败现在会在计费之前被正确标记为 FAILURE。（[PR #7280](https://github.com/QuantumNous/new-api/pull/7280)，[PR #6858](https://github.com/QuantumNous/new-api/pull/6858) 的后续）
- **MiniMax Video Generation V2（`MiniMax-H3`）**——`/v1/videos` 提交、多模态内容校验、V2 任务状态轮询、OpenAI Video 响应转换；同一上游渠道会根据映射的模型自动选择 V1 或 V2。（[PR #6591](https://github.com/QuantumNous/new-api/pull/6591)）
- 窗口期内没有新的硬件后端或量化相关工作。

## 4. 性能与优化

- **前端 `/api/status` 请求去重** → 首页提速约 **25%**，并发用户场景下后端命中率显著下降。（[PR #7189](https://github.com/QuantumNous/new-api/pull/7189) 关闭 [#7157](https://github.com/QuantumNous/new-api/issues/7157)）
- 无 GPU/推理内核相关工作——本项目是网关而非引擎，性能面主要集中在路由、缓存和计费链路上。

## 5. 稳定性与回归

按严重程度排序。**（附修复 PR）** 表示修复已合并或正在评审中。

| 严重度 | 条目 | 说明 |
|---|---|---|
| 🔴 严重 | Realtime WebSocket 双重计费（约 2 倍计费）——（[Issue #7273](https://github.com/QuantumNous/new-api/issues/7273) / [PR #7274](https://github.com/QuantumNous/new-api/pull/7274) ✅ 已合并） | 分段扣费与会话结算都在计费；现在结算只覆盖未计费的差额。 |
| 🔴 严重 | 多密钥轮询丢失更新——自动禁用的密钥通过陈旧快照被静默复活（[Issue #7275](https://github.com/QuantumNous/new-api/issues/7275) / [PR #7276](https://github.com/QuantumNous/new-api/pull/7276) ✅ 已合并） | 保存路径不再覆盖并发的各密钥状态。 |
| 🔴 严重 | Anthropic / DeepSeek 缓存 token 未计入消费日志与 TPM 统计（[Issue #7290](https://github.com/QuantumNous/new-api/issues/7290) / [PR #7271](https://github.com/QuantumNous/new-api/pull/7271) ✅ 已合并，后续 [PR #7291](https://github.com/QuantumNous/new-api/pull/7291) 评审中） | 低估缓存输入量，导致缓存命中核算与下游成本分析失真。 |
| 🟠 高 | Gemini `:countTokens` 被路由到 `generateContent`——**延迟 24–44 秒**、按生成费率计费、不返回 `totalTokens`（[Issue #7283](https://github.com/QuantumNous/new-api/issues/7283) / [PR #7285](https://github.com/QuantumNous/new-api/pull/7285) 评审中） | 影响 Gemini CLI 会话；PR 中加入了专用处理器。 |
| 🟠 高 | VolcEngine（渠道 `45`）获取模型列表 404——`/v1/models` URL 错误（[PR #7203](https://github.com/QuantumNous/new-api/pull/7203) ✅ 已合并） | 运维人员无法在既有渠道上枚举模型。 |
| 🟡 中 | 提交 `ea7cb0ba4` 之后**用户表配额显示回归**（[Issue #7267](https://github.com/QuantumNous/new-api/issues/7267)） | 暂无修复 PR。 |
| 🟡 中 | 定价页上按时长计费的档位显示错误（[Issue #7268](https://github.com/QuantumNous/new-api/issues/7268) / [PR #7269](https://github.com/QuantumNous/new-api/pull/7269) 评审中） | |
| 🟡 中 | 模型广场 24 小时成功率条形间距不均（[Issue #7282](https://github.com/QuantumNous/new-api/issues/7282) / [PR #7284](https://github.com/QuantumNous/new-api/pull/7284) 评审中） | |
| 🟢 低 | 高级自定义路由中“添加分流”按钮缺失（[Issue #7286](https://github.com/QuantumPlusieurs/new-api/issues/7286) / [PR #7289](https://github.com/QuantumNous/new-api/pull/7289) ✅ 已合并） | UI 回归，仅影响自建 main 分支的部署。 |
| ⚪ 无效/重复 | [#7278](https://github.com/QuantumNous/new-api/issues/7278)、[#7281](https://github.com/QuantumNous/new-api/issues/7281)、[#7288](https://github.com/QuantumNous/new-api/pull/7288)、[#6858 follow‑up](https://github.com/QuantumNous/new-api/pull/6858) | 已按无效或被取代关闭。 |

> **值得警惕的模式：** 四个严重 bug 中有三个是外部贡献者使用 Claude Code（`glm-5.3-flash`、`claude-opus-5[1m]`）在同一天内提报并修复的，其背后是“找高星国内项目投 PR”之类的常设指令。修复本身看起来合理，但**评审者应对快速产出的 AI 编写计费补丁格外审慎**——这些改动直接触及营收。

## 6. 对应用开发者意味着什么

- **升级后请重新计算基于 Anthropic / DeepSeek 用量的分析数据。** 如果你在使用 new‑api 日志中的 `prompt_tokens` 或 TPM 指标，你的缓存读取量一直被系统性低估；[#7291](https://github.com/QuantumNous/new-api/pull/7291) 发布后预计会出现台阶式跳变。
- **请核对 [#7274](https://github.com/QuantumNous/new-api/pull/7274) 合并前启动的 realtime（WebSocket）会话计费**——这些会话被按约 2 倍计费，需按 issue 讨论串手动调整。
- **多密钥/轮询渠道的 channel_info 中可能潜藏被“复活”的密钥**；合入 [#7276](https://github.com/QuantumNous/new-api/pull/7276) 后请审计自动禁用状态。
- **Gemini CLI 用户将迎来延迟大幅下降**（约 24–44 秒 → 毫秒级），[#7285](https://github.com/QuantumNous/new-api/pull/7285) 落地后，`countTokens` 将不再按生成计费。
- **新的能力面**：Veo 3.1（[PR #7280](https://github.com/QuantumNous/new-api/pull/7280)）与 MiniMax H3 视频（[PR #6591](https://github.com/QuantumNous/new-api/pull/6591)）现在可通过统一的 `/v1/videos` 式中继调用——正是原型化多模态流水线的好时机。
- **自托管用户的可靠性提醒**：v1.0.0‑rc 周期仍处于 GA 之前，且未公布 GA 标准（[#7279](https://github.com/QuantumNous/new-api/issues/7279)）。如果你在生产环境运行 `rc.x`，请固定到经过测试的 commit，并在升级前遵循 release notes 中的迁移说明。
- **仍开放的运维跟进项**，值得关注：基于 Redis 的验证码（[PR #5475](https://github.com/QuantumNous/new-api/pull/5475)，对多实例部署很重要）、渠道端点类型限制（[#7292](https://github.com/QuantumNous/new-api/issues/7292)）、与渠道解耦的全局模型重定向（[#5270](https://github.com/QuantumNous/new-api/issues/5270)）。

---

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*