# AI 基础设施日报 2026-09-15

> 生成时间: 2026-09-14 17:02 UTC | 覆盖项目: 9 个

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

# 跨项目 AI 基础设施报告 — 2026-09-15

## 1. 生态概览

当前 AI 基础设施栈呈现出明显的分层格局：数据中心推理引擎（vLLM、SGLang）正埋头夯实 DeepSeek-V4.1 支持以及分布式/Agentic 推理路径，而边缘运行时（llama.cpp、Ollama、Unsloth Studio）则竞相覆盖异常广泛的硬件矩阵中的新架构。网关层（LiteLLM、New API、CC Switch、Claude Code Router）正在啃协议转换的正确性问题——尤其是 OpenAI Responses ↔ Chat 桥接以及 Anthropic 兼容性——再加上计费/限流的完整性。整个生态本周期仅有一个项目发版（llama.cpp 0.4.1），表明当前处于稳定期而非功能发布期。反复出现的横切性故障类别包括：工具调用保真度、推理内容传输以及 Agentic 多轮流量下的前缀缓存行为。

## 2. 活动度对比

*数量为今日摘要中引用的独立 Issue/PR 数——是分诊相关活动的代理指标，并非原始 GitHub 体量。*

| 项目 | 引用 Issue | 引用 PR | 发版状态 |
|---|---|---|---|
| **vLLM** | ~22 | ~17 | 无发版；v0.29.0 已在生产 |
| **SGLang** | ~18 | ~19 | 无发版；Rust 前端持续演进 |
| **llama.cpp** | ~16 | ~25 | **✅ v0.4.1（b10964）已发布**——堆破坏修复、BF16 回退、SYCL TOP_K |
| **Ollama** | ~14 | ~5 | 无发版（0.33.x 时代）；Bug 主导的一天 |
| **LiteLLM** | ~30 | ~20 | 无发版；摘要集中 Issue 体量最高 |
| **Unsloth** | ~20 | ~18 | 无发版；Studio 加固 + NPU 基础工作 |
| **Claude Code Router** | ~3 | ~4 | 无发版；议题面窄且聚焦 |
| **CC Switch** | ~21 | ~19 | 无发版；v3.20.3 被标记存在回归（#7401） |
| **New API** | ~17 | ~12 | 无发版；**rc.37 被标记不可用于生产**（#7361） |

**值得注意：** SGLang 报告了最健康的 CI 态势（`1 broken / 14 flaky / 999 recently fixed`），而有两个项目携带明确的"暂勿升级/请固定版本"告警（CC Switch v3.20.3、New API rc.37）。

## 3. 模型支持竞赛

| 模型 / 架构 | vLLM | SGLang | llama.cpp | Ollama | 网关/其他 |
|---|---|---|---|---|---|
| **DeepSeek V4 / V4.1-Flash** | ✅ SWA 有界重放、H20、MI355X、DCP+DFlash 修复 | ✅ Perf board、TBO、R3 MXFP4、AMD DSA | — | — | CC Switch `tool_call_id` Bug（#7156）；New API 推理回显（#6939） |
| **GLM-5.2 / 5.3-Flash** | ⚠️ NVFP4 autotune 修复；"word salad" Bug 待处理 | ✅ gfx942/gfx950 AMD 路径；disagg 崩溃待处理 | — | — | GLM Codex 错误信封透出（CC Switch #6912） |
| **Qwen3.8-Flash-Next / Qwen4Exp** | — | ✅ NPU QSA + graph 模式 + MTP | ✅ hyperconnection 算子（`hc_pre`/`hc_comb`）；⚠️ Metal 长上下文 EOS Bug | — | — |
| **Qwen3.5 系列** | ⚠️ 混合 GDN 回归 | ✅ mamba radix-cache 修复 | ✅ embedding GGUF 转换 | ✅ coder cache 修复（#18433） | — |
| **Gemma 4** | — | ⚠️ 非 RGB 图像下 vision tower 崩溃 | ⚠️ Vulkan 崩溃、thinking 输出乱码 | ⚠️ 工具调用 key Bug（#18390） | Unsloth vision 修复（#6028） |
| **MiniMax（H3 / Code）** | — | ⚠️ NPU 精度 | — | — | CC Switch：新增 MiniMax Code harness + `

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM 速递 — 2026-09-15

## 今日要闻

DeepSeek-V4.1 serving 栈在 main 分支继续趋于稳健：编码端 SWA bounded replay 在 [#56227](https://github.com/vllm-project/vllm/pull/56227) 落地，其对应的解码端修改叠加于其上，提交于 [#56752](https://github.com/vllm-project/vllm/pull/56752)；DFlash + DCP graph capture 的并行启动阻塞问题在 [#56869](https://github.com/vllm-project/vllm/pull/56869) 中修复。可观测性方面的空缺也在补齐 —— KV offload 容量/配置指标分别在 [#56867](https://github.com/vllm-project/vllm/pull/56867) 与 [#53902](https://github.com/vllm-project/vllm/pull/53902) 中新增；同时 [#56696](https://github.com/vllm-project/vllm/issues/56696) 文档化了一个问题：`--otlp-traces-endpoint` 虽然会初始化 tracer，但实际上从不上报任何 span。

## 发布与破坏性变更

过去 24 小时内无新标签发布。野外（in the wild）最常见的近期版本仍是 `vllm/vllm-openai:latest`，对应 v0.29.0（例如 [#56696](https://github.com/vllm-project/vllm/issues/56696)）。

近期合并工作中需要关注的破坏性变更：
- **Scale-out endpoint 标志重命名** —— `VLLM_ENABLE_SCALE_OUT_ENDPOINTS=1` 已移除；改用 `vllm serve --enable-scale-out`。EC E2E launcher 已在 [#56819](https://github.com/vllm-project/vllm/pull/56819) 中更新。
- **Triton 3.8 mxfp4 MoE API 重排** —— `matmul_ogs` → `matmul`，`RoutingData` → `RaggedTensorMetadata`，`weight_scale` → `b_mx_scale`，内核内 scatter+topk-reduce 已移除。适配层按版本门控单独立项落地：[#55934](https://github.com/vllm-project/vllm/pull/55934)。

## 新增模型与硬件支持

- **DeepSeek-V4.1-Flash — SWA bounded replay**（编码端 #56227，解码端 #56752）：每层 128 token 的滑动窗口 KV cache 选择不进入 prefix-cacheable 存储，也不经 KV-connector 传输，显著降低 KV 传输开销。
- **GLM-5.3-Flash** —— 报告在多轮 agentic 场景下出现 "word salad" 式退化，见 [#56605](https://github.com/vllm-project/vllm/issues/56605)。PR [#55879](https://github.com/vllm-project/vllm/pull/55879) 为 GLM TP2/PCP2 NVFP4 eval 预留了 autotuning headroom，避免 main 构建 87636 上的 PCP autotune OOM。
- **DeepSeek-V4.1-Flash on ROCm / MI355X** —— 首批性能数据分享于 [#56506](https://github.com/vllm-project/vllm/issues/56506)：8×MI355X，TP4，MXFP4 MoE + DSpark MTP，并发度 1 下约 8.97 out-tok/s/GPU —— RFC 明确指出设备上仍有相当大的优化空间。
- **RDNA3 fused MoE** —— 已提 bug：硬编码的 2× gated-activation 因子在非 gated（relu2）模型上会出问题，例如 gfx1100 上的 Nemotron-3：[#56790](https://github.com/vllm-project/vllm/issues/56790)。
- **H20 (SM90) DeepSeek-V4.1-Flash** —— `dsv4_topk` Triton MoE 路由内核在高并发且 `max_num_seqs > 256` 时触发 CUDA illegal-memory access；当前以封顶 256 作为缓解措施：[#56389](https://github.com/vllm-project/vllm/issues/56389)。
- **Transformers v5 升级** —— 进行中跟踪帖：[#38379](https://github.com/vllm-project/vllm/issues/38379)。
- **UNO spec decoding** —— 提出 RFC，希望在 vLLM 中原生支持 diffusion-augmented LLM serving：[#55267](https://github.com/vllm-project/vllm/issues/55267)。
- **DDTree 投机解码** —— 长期 feature request，仍处于 open 状态：[#40809](https://github.com/vllm-project/vllm/issues/40809)。
- **Watermarking** —— 实现 PR #54053 在跟踪 issue [#56105](https://github.com/vllm-project/vllm/issues/56105) 中引用；兼容性/质量测试正在规划中。

## 性能与优化

- **DeepSeek-V4.1-Flash on 8×MI355X, TP4, MXFP4 MoE + DSpark MTP**（[#56506](https://github.com/vllm-project/vllm/issues/56506)）：
  - 并发度 1：总计 35.89 out-tok/s，单卡 8.97 out-tok/s/GPU，TTFT p50 0.898s。
  - RFC 备注"设备上仍有较大空间未利用"，正在征集优化提案。
- **FlashInfer NVLink one-sided all2all** —— 在 [#54268](https://github.com/vllm-project/vllm/pull/54268) 中提议作为 CUDA 默认：在 Qwen3.5 397B NVFP4 上，disagg serving 的 allgather_reducescatter 比当前默认快 8%。
- **PCP autotuning OOM 缓解**（[#55879](https://github.com/vllm-project/vllm/pull/55879)）—— 未经验证；针对 TP2/PCP2/EP GLM-5.2 NVFP4 上观察到的 autotune 失败。
- **Prefill-context-parallel decode-only FULL CUDA graphs** —— [#53867](https://github.com/vllm-project/vllm/pull/53867) 为 PCP 启用 `FULL_DECODE_ONLY` 与 `FULL_AND_PIECEWISE`，并使用 rank-local 的持久输入 buffer。
- **DFlash long-context regression** —— 混合 GDN 模型（Qwen3.5 系列）在 DT=4 / 185k context 下由 ~71 tok/s 跌至 ~16 tok/s，而短上下文 DT=8 仍能赢到 ~218 tok/s（[#54691](https://github.com/vllm-project/vllm/issues/54691)）；社区请求提供按序列长度的禁用开关。
- **MoE MBU 统计** —— [#54228](https://github.com/vllm-project/vllm/pull/54228) 用"distinct-activated-experts" 估计替换了原来"perfect load balancing"上界，置于 `--enable-mfu-metrics` 之后。
- **HiSparse P/D 直接 GPU 落地**（[#55398](https://github.com/vllm-project/vllm/pull/55398)）—— 在 decoder 有容量时，prefill 导入数据可直接进入最终 GPU 页；否则回退到 host 落地。
- **ROCm tuned-GEMM 重构**（[#55001](https://github.com/vllm-project/vllm/pull/55001)）—— 删除 `vllm/_aiter_ops.py` 中手工维护的硬编码 shape 与 pandas 抓取脚本，直接调用 aiter 的 `get_gemm_config`。

## 稳定性与回归

大致按影响范围排序：

1. **引擎启动在 `--help` 类早期失败路径上挂起** —— [#17676](https://github.com/vllm-project/vllm/issues/17676)（43 条评论，👍10，自 2025-05 起 open）。暂无修复 PR。对在新部署且配置有问题的场景严重度高。
2. **OTLP traces 静默不上报** —— [#56696](https://github.com/vllm-project/vllm/issues/56696)。`--otlp-traces-endpoint` 会初始化 tracer，但从未调用 `instrument_otel`/`manual_instrument_otel`。已在 `vllm-openai:latest` 0.29.0 及 dev 上复现。严重度高 —— 可观测性静默失效。
3. **序列并行 / 异步 TP 下 batch invariance 失效** —— [#56370](https://github.com/vllm-project/vllm/issues/56370)。`VLLM_BATCH_INVARIANT=1` 与 `pass_config.enable_sp` 同时启用时，跨多次运行的输出非确定。对任何依赖可复现性的工作负载严重度高。
4. **混合 mamba prefix-cache 恢复崩溃（W4A16，自定义 `--block-size`）** —— [#53142](https://github.com/vllm-project/vllm/issues/53142)。`MambaHybridModelState.add_request` 中出现 illegal memory access；状态列以错误的 block size 播种。严重度高。
5. **Mamba-Attention 混合（Qwen3.5）上增量多模态请求的 prefix caching 失败** —— [#43587](https://github.com/vllm-project/vllm/issues/43587)。对混合模型多轮 agent 严重度为中-高。
6. **SM120 多小时负载下出现 Xid 13 芯片级 warp error** —— [#52225](https://github.com/vllm-project/vllm/issues/52225)。表现为 misaligned address / illegal instruction / out-of-range register；运行于 Nemotron-3.5-Lightning-30B-A3B-NVFP4 with marlin MoE hybrid Mamba。对长时间生产负载严重度高。
7. **DeepSeek-V4.1-Flash DCP + DFlash 启动阻塞** —— 由 [#56869](https://github.com/vllm-project/vllm/pull/56869) 修复（DFlash speculator rank 必须在 graph capture 前对齐）。PR 已 open。
8. **FlashInfer `flashinfer_b12x` MoE 将 W4A16 NVFP4 当作 W4A4 执行** —— [#56535](https://github.com/vllm-project/vllm/pull/56535)。在 Qwen3.6-35B-A3B-NVFP4 上激活被静默反量化两次。PR 已 open。
9. **DFlash2 + YaRN 相同 1.04M prompt 的 prefix-cache 复用为零** —— [#54094](https://github.com/vllm-project/vllm/issues/54094)。Target-only 复用约 1.039M token。严重度为中。
10. **GLM-5.3-Flash 在多轮 agent 中退化为重复 token 的 "word salad"** —— [#56605](https://github.com/vllm-project/vllm/issues/56605)。严重度为中。
11. **Whisper 段时间戳每段约 0.5s 漂移，超过 30s 后累积明显** —— [#32588](https://github.com/vllm-project/vllm/issues/32588)。长音频 ASR 质量问题。
12. **DeepSeek-V4 在 8×RTX PRO 6000（Blackwell）上加载失败** —— [#40821](https://github.com/vllm-project/vllm/issues/40821)，仍 open，👍6。疑似与定制 Blackwell 镜像下的模型加载器兼容性有关。
13. **T4（Turing）在 triton 内核上出现 `out of resource: shared memory`** —— [#36802](https://github.com/vllm-project/vllm/issues/36802)。`Required 81920, HW limit 65536`。
14. **Qwen3-ASR 编码器预分配缓存大小受限** —— [#39408](https://github.com/vllm-project/vllm/issues/39408)。
15. **CudaGraph 单元测试启动失败** —— [#56808](https://github.com/vllm-project/vllm/pull/56808) 修复了一个通过 `__new__` 构造 `CudaGraphManager` 的测试，该测试遗漏了 PR #51700 新增的 `ubatch_runner`。
16. **Kimi K2.5 视觉模块的 eager `torch.compile`** —— [#53011](https://github.com/vllm-project/vllm/pull/53011) 修复了 `get_rope_shape` 中 eager `torch.compile` 可能在 vLLM 缓存目录初始化前就初始化 Triton 的问题。
17. **MultiConnector 无法组合来自两个 connector 的 piecewise prefix** —— 由 [#54240](https://github.com/vllm-project/vllm/pull/54240) 处理（open）。

另有两个相邻的可观测性空缺值得标记：
- **Blackwell unified-memory paging 遥测缺失** —— 参考映射已存在于 `dgx-spark-monitoring`，但 vLLM 中尚未提供：[#54200](https://github.com/vllm-project/vllm/issues/54200)。
- **KV offload 文件系统层级缺乏完整性校验，且单次 I/O 操作延迟无上限** —— RFC [#54363](https://github.com/vllm-project/vllm/issues/54363)。

## 对应用开发者意味着什么

- **若依赖可复现的输出**：在 [#56370](https://github.com/vllm-project/vllm/issues/56370) 修复前，请勿同时启用 `pass_config.enable_sp` 与 `VLLM_BATCH_INVARIANT=1` —— 多次运行的输出会发散。请二选一并固定。
- **若依赖分布式追踪**：`vllm-openai:0.29.0` 上的 `--otlp-traces-endpoint` 当前不会上报任何内容。不要依赖它做 SLO 告警；待修复版本发布后请重新验证。
- **投机解码在混合 GDN 模型上并非免费**：DFlash 在短上下文能带来 ~3× 收益，但超过约 185k token 后会出现 ~4× 损失（[#54691](https://github.com/vllm-project/vllm/issues/54691)）。请规划按上下文长度开关或长上下文禁用。
- **在 H20 上部署 DeepSeek-V4.1 生产环境**：在 [#56389](https://github.com/vllm-project/vllm/issues/56389) 修复前，请将 `max_num_seqs ≤ 256`；在 Blackwell RTX PRO 6000 上，请将加载路径视为 WIP（[#40821](https://github.com/vllm-project/vllm/issues/40821)）。
- **ROCm / MI355

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang Digest — 2026-09-15

## 1. 今日要点

- **安全披露暴露出真实的生产风险**：SGLang 的 bootstrap HTTP 服务暴露了一个未经身份验证的 `PUT /route` 端点，可被用于路由投毒与元数据重定向（#39400）——凡是暴露了 bootstrap 端口的运维方都应将其视为需要立刻处置的事项。
- **面向 Agentic 负载的分布式 KVCache 正式进入路线图**（#21846，30 👍）：现有的 PD-disaggregation + HiCache 栈被官方认定为 Agentic 流量的瓶颈，并已立项追踪改造计划。
- **DeepSeek V4 的稳定性修复在持续推进**：HiSparse token 计量膨胀（#30909）、DeepGEMM MegaMoE buffer 尺寸（#39223）、非 EP TBO 在 attention-TP>1 时的正确性（#33250），以及 R3 MXFP4 在线更新（#39392）均在 NVIDIA 路径上收敛；与此同时，AMD 侧的工作（#39253、#39340）解决了 GSM8k 精度差距与 GLM-5.3-Flash DSA 支持。

## 2. 发布与破坏性变更

过去 24 小时内无新发布。Rust 前端持续在底层演进（见下方 #39412），下一次发布预计会合并 HiCache 文件后端混合池修复与 bootstrap 加固。

## 3. 新模型与硬件支持

| 项目 | 范围 | 引用 |
|---|---|---|
| SenseNova-U1 / U1.5 | 已开启追踪 issue；参考实现见 OpenSenseNova/SenseNova-U1 | [#37742](https://github.com/sgl-project/sglang/issues/37742) |
| DeepSeek V4（NVIDIA SM90/SM10X） | 性能追踪看板；FlashInfer MNNVL 已合并，TRT-LSM attention 集成进行中 | [#33636](https://github.com/sgl-project/sglang/issues/33636) |
| Qwen3.8-Flash-Next on NPU | QSA + graph mode + NEXTN/MTP 投机解码，NPU 草案 | [#37570](https://github.com/sgl-project/sglang/pull/37570) |
| GLM-5.2 / GLM-5.3-Flash（AMD） | gfx942 shared-expert fusion opt-in（#39247）、gfx950 PTPC FP8 KDA（#38764）、支持非 2048 top-k 宽度的 DSA 页表变换（#39340） | [#39247](https://github.com/sgl-project/sglang/pull/39247)、[#38764](https://github.com/sgl-project/sglang/pull/38764)、[#39340](https://github.com/sgl-project/sglang/pull/39340) |
| Intel XPU | PD-disaggregation staging-buffer KV 传输已脱离 `torch.cuda`；每周模型启用整合 | [#26501](https://github.com/sgl-project/sglang/pull/26501)、[#39439](https://github.com/sgl-project/sglang/pull/39439) |
| NPU diffusion（Wan2.2、FLUX） | Modelslim W4A4F8 / W8A8F8 量化路径 | [#39438](https://github.com/sgl-project/sglang/pull/39438) |
| XGrammar 0.2.6 | 通过既有 API 暴露 Lark 文法编译 | [#39380](https://github.com/sgl-project/sglang/pull/39380) |
| DFlash 投机解码 | 针对逐位置 vs 联合分布不一致问题，提出 LiLiCorr 候选格 reranker | [#37462](https://github.com/sgl-project/sglang/pull/37462) |
| CPU 后端 | 新增 `fp8_per_tensor_scaled_mm_cpu` 内核 | [#32618](https://github.com/sgl-project/sglang/pull/32618) |

## 4. 性能与优化

- **HiSparse DeepSeek V4 token 计量**——由于 20:1 的逻辑/压缩比被错误解读，空 KV 缓存会报告出偏高的 `full token usage`；PR 修复了启动期上报的准确性（#30909）。
- **MegaMoE buffer 尺寸**——DeepGEMM 根据运行时 SM 数量推导 buffer，而 SGLang 此前基于 SM 预算的逻辑会浪费 buffer slot。重设后 buffer 分配与有效 SM 预算对齐（#39223）。
- **EP+MoE-TP all-reduce 合并**——在 `--tp-size 4 --ep-size 2` 下，experts 之后的两组正交 all-reduce 现在被融合为一次 `_TP` 归约。若不修复，因 `_MOE_EP` 归约被跳过，GSM8k 精度可跌至 0.012（#32963）。
- **SWA page-lookup 融合**——peer-page 查找与 FULL-to-SWA 映射清理被合并到单个 Triton 内核中，降低每次 free 的调度分派开销（#38948）。
- **MXFP8 KV cache padding-slot 写入跳过**——对保留的 CUDA-graph padding sink 的写入被跳过，消除了一类在 padded lane 上的浪费存储流量（#35351）。
- **DeepSeek-V4 TBO（非 EP，attn-TP>1）**——全 TP 变长 collective 此前把 replica tensor 当作独立张量处理，修复已落地（#33250）。
- **DSV4 R3 capture + MXFP4 在线更新**——替换了一个被自动关闭、其 `sglang-miles` 分支已删除的 PR；该修复以单提交 head 重新提交（#39392）。
- **FP4 MXBlock16 KV cache 量化/存储融合**——提议将四个索引写入与独立的 K/V 量化融合为单次 pass（#39429）。
- **AMD EAGLE verify**——verify 步骤中的温度采样，弥合了 DeepSeek-V4 benchmark 上 GSM8k 一类的精度差距（#39253）。

## 5. 稳定性与回归

按严重程度排序：

| 级别 | 问题 | 状态 / 修复 | 引用 |
|---|---|---|---|
| 🔴 安全 | **Bootstrap HTTP 上的未经身份验证 `PUT /route` 允许路由投毒与元数据重定向** | 未修复——运维方应立即限制 bootstrap 端口 | [#39400](https://github.com/sgl-project/sglang/issues/39400) |
| 🔴 崩溃 | `ep_scatter_from_psum` 缺失 `expert_start/num_experts` 参数 → deepep_v2 prefill 时 `TypeError` | 未修复 | [#39402](https://github.com/sgl-project/sglang/issues/39402) |
| 🔴 崩溃 | 在 disagg decode + dp-attention + spec decode 下 GLM-5.3 崩溃 | 未修复 | [#39072](https://github.com/sgl-project/sglang/issues/39072) |
| 🔴 崩溃 | `--enable-mixed-chunk` 在 hybrid GDN 模型上损坏 mamba radix cache checkpoint（混合 batch 跳过 `extra_buffer` 写入） | 未修复，设计讨论见 [#39430](https://github.com/sgl-project/sglang/pull/39430)（为非 mamba 架构新增 fail-fast 守卫） | [#39342](https://github.com/sgl-project/sglang/issues/39342) |
| 🔴 崩溃 | B300 上 MXFP8FP4 / W4A8 MegaMoE 出现 CUDA_ERROR_ILLEGAL_ADDRESS（sgl-deep-gemm 0.1.7） | 未修复 | [#37559](https://github.com/sgl-project/sglang/issues/37559) |
| 🔴 崩溃 | 8 并发请求下 QSA extend forward 出现 CUDA 非法内存访问（Qwen3.8-Flash-Next-FP8，H20 TP8）；可通过 `CUDA_LAUNCH_BLOCKING=1` 与 `--disable-overlap-schedule` 抑制 | 未修复 | [#37633](https://github.com/sgl-project/sglang/issues/37633) |
| 🟠 正确性 | HiCacheFile 将不可恢复前缀报告为命中（混合缓存池 `batch_exists_v2` 取最小启发式） | 未修复 | [#39147](https://github.com/sgl-project/sglang/issues/39147) |
| 🟠 正确性 | SM120 分组 FP8 DeepGEMM 权重准备跳过 UE8M0 requantization | 未修复 | [#39063](https://github.com/sgl-project/sglang/issues/39063) |
| 🟠 正确性 | DeepSeek V4 / V3.2 DSML tool-call parser 偶发将参数包裹在虚假的 `"arguments"` / `"input"` 键中 | 未修复 | [#38924](https://github.com/sgl-project/sglang/issues/38924) |
| 🟠 正确性 | NPU Ascend A3 推理 MiniMax H3 出现精度问题 | 已关闭（疑似陈旧 / 新信息下无法复现） | [#39386](https://github.com/sgl-project/sglang/issues/39386) |
| 🟠 正确性 | Gemma-4 mm：非 RGB 图像通过通道守卫后导致 vision tower 崩溃，连带 scheduler 下线（mat1 256 vs 768） | 未修复 | [#26751](https://github.com/sgl-project/sglang/issues/26751) |
| 🟡 功能 | Rust 前端 OpenAI 端点上 PD bootstrap 参数（`bootstrap_host/port/room`）被静默丢弃 | 未修复——根因为 `dynamo-protocols` 请求类型在下沉到 `GenerateRequest` 时未携带这些字段 | [#39412](https://github.com/sgl-project/sglang/issues/39412) |
| 🟡 测试基础设施 | `test_expert_pack_mxfp4.py` 在 H200 上加载 JIT 扩展时偶发挂起 | 已关闭 | [#38408](https://github.com/sgl-project/sglang/issues/38408) |
| 🟡 文档 | SGLang Docs 与 SGLang Cookbook 之间内容重复——长期存在的清理任务 | 未修复 | [#18427](https://github.com/sgl-project/sglang/issues/18427) |

CI：中央追踪 issue（#17050）截至 2026-09-14 16:34 UTC 报告 `1 broken / 14 flaky / 999 recently fixed`——整体健康状况良好，仅有 1 个已知 broken 测试需要跟进。

## 6. 对应用开发者的影响

- **今天就锁住你的 bootstrap 端口。** 在 #39400 修复之前，切勿将 SGLang 的 bootstrap HTTP 服务暴露给不可信网络。可在其前置一个仅监听本地的 listener，或部署一个负责对上游做身份验证的 sidecar。
- **DeepSeek V4 on NVIDIA 正在收敛，但还谈不上"无聊"。** 若你依赖 M>1 的 `--tp-size N --ep-size M`，请关注 all-reduce 合并 PR（#32963）与非 EP TBO 修复（#33250），留意在 GSM8k/MMLU/IFBench 流水线中可能出现的精度回归。在替换到生产前，务必对候选 build 用一组已知良好的 eval 集做回归验证。
- **HiSparse + DeepSeek V4 内存计费在 #30909 落地前不可靠。** 若你基于 `full token usage` 做自动扩缩容，启动期会触发过激的扩容；请设置一段 warm-up 窗口，或在 SGLang 侧覆盖该指标。
- **Agentic 负载需要为 KVCache 分片做规划。** #21846 中的路线图承认 HiCache + PD-disaggregation 不足以应对长上下文、多轮 Agentic 流量。若你运行的 Agent 拥有持续性的 KV 占用，请跟进该 issue 了解最终的分布式 KVCache 设计，并据此做容量预算。
- **NPU + Qwen3.8-Flash-Next 仍处草案阶段。** 生产用户应暂留在通用主线路径上；NPU 上的 graph mode + MTP 仍在积极开发中（#37570）。
- **Rust 前端 PD bootstrap 存在静默断裂**（#39412）。若你在 PD-disagg 中使用 dynamo/rust 前端并依赖 bootstrap room 路由，请预期字段会被丢弃——在修复落地前请回退到 python 前端，或自行加一层 openai-compat 垫片。
- **DeepSeek V4/V3.2 的 tool-call parser 并非 100% 可靠**（#38924）。若你在下游没有 parser 的情况下直接消费 `tool_calls`，请在客户端侧加一道 JSON 形态校验。
- **DFlash 草案上的投机解码可能产生联合不一致的 block**；#37462（LiLiCorr）是一项候选 reranker 提案，对于任何由 DFlash 服务、对延迟敏感的路径都值得评估。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 摘要 — 2026-09-15

## 今日要点

版本 **0.4.1** 已发布（[#28900](https://github.com/ggml-org/llama.cpp/pull/28900)），包含一系列虽小但影响显著的修复——最值得注意的是 `ggml-cpu` 预编译头（PCH）回归问题，该问题此前在 macOS arm64 上静默地破坏了堆（[#28882](https://github.com/ggml-org/llama.cpp/pull/28882) / [issue #28858](https://github.com/ggml-org/llama.cpp/issues/28858)）。同一 24 小时内还发布了一条 BF16→F32 的 CUDA 降级路径，用于前 Ampere 架构的 NVIDIA / 前 RDNA3 的 AMD 芯片，以及对 SYCL `TOP_K` 的重写，使大 k 值采样保留在设备端执行，不再回落到 CPU。后端覆盖范围持续扩展：OpenCL 正在获得通用的 `ssm_scan` 和 MoE 矩阵乘的 batch-size 选择，Metal 补齐了 MiniCPM3 长期缺失的 (96, 64) flash-attention 算子分块，Hexagon 恢复了连续拷贝快速路径，Vulkan 则新增了稀疏 Flash Attention。

## 发布与破坏性变更

- **[b10964 — 0.4.1](https://github.com/ggml-org/llama.cpp/releases/tag/b10964)**（[#28900](https://github.com/ggml-org/llama.cpp/pull/28900)）：正式版本号升级。附带 macOS/Apple Silicon、Linux、Windows 的制品；已发布 SLSA 证明。
- **合并入 0.4.1 的行为变更**（需提醒下游打包者注意）：
  - [b10955](https://github.com/ggml-org/llama.cpp/pull/28882) — 禁用 `ggml-cpu` 预编译头，并消除了 `CACHE_LINE_SIZE` 的歧义。解决了使用 AppleClang 时 macOS arm64 上出现的堆损坏问题；`std::hardware_destructive_interference_size` 分支已移除，因此任何依赖该分支的树外构建必须相应适配。
  - [b10950](https://github.com/ggml-org/llama.cpp/pull/28846) — `ggml-cuda` 现在会在不支持硬件 BF16 的设备（前 Ampere NVIDIA、前 RDNA3 / 前 CDNA AMD）上将 BF16 运算透明地降级为 F32。较老的显卡上将出现数值漂移。
  - [b10956](https://github.com/ggml-org/llama.cpp/pull/28670) — SYCL `TOP_K` 升级为常驻 GPU 的基数选择（radix-select）实现，移除了原本 `k > 32` 回退到 CPU 的人工边界。
  - [b10952](https://github.com/ggml-org/llama.cpp/pull/28704) — SYCL oneDNN 暂存区不再打乱 VMM 池的 LIFO 释放顺序（参见 [#28660](https://github.com/ggml-org/llama.cpp/issues/28660)）。
  - [b10951](https://github.com/ggml-org/llama.cpp/pull/28749) — `llama_n_rs_seq()` 重排序：超出范围的 sequence-id 计数现在会在 `llama_decode` 之前短路，改变了依赖原 `goto`/res 路径的调用方可见行为。
  - [b10947](https://github.com/ggml-org/llama.cpp/pull/28779) — `nemotron-h` NextN/MTP 专家 FFN 维度推导对 `n_expert_used == 0` 进行了保护。
  - [b10946](https://github.com/ggml-org/llama.cpp/pull/28775) — `ggml-cpu` s390x VXE-only repack 辅助函数增加了保护，非 VXE 构建也能编译通过。
  - [b10948](https://github.com/ggml-org/llama.cpp/pull/28855) — WebGPU 测试架构矩阵不再包含 HY_V4。

## 新增模型与硬件支持

- **Qwen3.5 embedding 模型** 已加入 `convert_hf_to_gguf.py`（[#27920](https://github.com/ggml-org/llama.cpp/pull/27920)）——解锁 `Qwen3_5TextModel` 检查点的 GGUF 转换（例如 `Rebine/Qwen3.5-Embedding-0.8B`）。
- **Qwen4Exp（Qwen3.8-Flash-Next）超连接算子** —— `hc_pre`（逐元素门控）和 `hc_comb`（NULL 组合）已在图层面加入（[#28901](https://github.com/ggml-org/llama.cpp/pull/28901)）；使该新架构在 Metal/CUDA/SYCL/Vulkan 后端上推理正确。
- **MiniCPM3 on Metal** —— 新增 flash-attention 算子分块对 `(HSK=96, HSV=64)`（[#28599](https://github.com/ggml-org/llama.cpp/pull/28599)），修复了该模型 `-fa auto` 时的崩溃。
- **OpenCL 后端扩展** —— 通用 `ssm_scan` 移除了 subgroup-size==64 / `d_state ∈ {128,256}` 的约束（[#28881](https://github.com/ggml-org/llama.cpp/pull/28881)）；MoE 专家矩阵乘的选择基于运行时 batch size 而非单纯的可用性，这对投机解码 / MTP 小 batch 解码尤为重要（[#27637](https://github.com/ggml-org/llama.cpp/pull/27637)）。
- **Hexagon（Qualcomm）后端** —— 为 `hex-cpy` 的连续 src/dst 增加了 DMA 快速路径（[#28906](https://github.com/ggml-org/llama.cpp/pull/28906)）；[#28589](https://github.com/ggml-org/llama.cpp/pull/28589) 回归后丢失的连续拷贝及 `hvx_copy_uu` 单次运行路径已恢复（[#28886](https://github.com/ggml-org/llama.cpp/pull/28886)）。
- **CUDA 构建 CI** —— Ubuntu CUDA 二进制将加入 release.yml（[#28186](https://github.com/ggml-org/llama.cpp/pull/28186)）。
- **ROCm 构建矩阵** —— `gfx1103`（Radeon 780M / iGPU）恢复纳入 Linux 发布构建（[#28423](https://github.com/ggml-org/llama.cpp/pull/28423)）。
- **STQ1_0（稀疏三值量化）** —— 新的 1.25-bit 三值 kernel，配套 ARM NEON `vec_dot`，正在评审中（[#22836](https://github.com/ggml-org/llama.cpp/pull/22836)）。
- **WebGPU** 测试架构覆盖范围调整（[#28848](https://github.com/ggml-org/llama.cpp/pull/28855)）。

## 性能与优化

- **Qwen4Exp PP 提升约 +3%**，得益于启用了 `rms_norm + mul` 图融合（[#28896](https://github.com/ggml-org/llama.cpp/pull/28896)）。
- **SYCL `TOP_K`** —— 大 k 值采样不再每次调用都付出一次后端往返开销；常驻 GPU 的基数选择在设备上并行化（[#28670](https://github.com/ggml-org/llama.cpp/pull/28670)）。
- **ggml-cpu** —— 当图中只包含 view/NOP 时跳过线程池 worker 的生成 / 唤醒（全 GPU 卸载场景下很常见）；调用线程的优先级 / 亲和性与活跃线程池保持同步（[#28785](https://github.com/ggml-org/llama.cpp/pull/28785)）。
- **Hexagon** —— Qwen3.5-4B/IQ-9075 上可观测的 PP/TG 回归被追溯到缺失的连续快速路径；恢复 PR 已合入（[#28886](https://github.com/ggml-org/llama.cpp/pull/28886)）。DMA `cpy` 为 Qwen3.x 这类大 reshape 模型新增了另一条路径（[#28906](https://github.com/ggml-org/llama.cpp/pull/28906)）。
- **OpenCL** —— MoE 专家矩阵乘现具备 batch-size 感知能力，预计能提升小 batch 投机解码 / MTP 解码（[#27637](https://github.com/ggml-org/llama.cpp/pull/27637)）。
- **gguf 索引缓存（提议中）** —— 一个可选的索引，用于加速 `llama-model` 信息加载（[#28903](https://github.com/ggml-org/llama.cpp/pull/28903)；未合并即关闭，但值得持续关注）。
- **投机 Prefill（开放 PR）** —— ICML 2025 "Speculative Prefill" 的移植版本，旨在改善 TTFT（[#27692](https://github.com/ggml-org/llama.cpp/pull/27692)）。
- **Vulkan 稀疏 Flash Attention** 进行中（[#28105](https://github.com/ggml-org/llama.cpp/pull/28105)）—— 跟踪上游稀疏 FA 工作（[#27970](https://github.com/ggml-org/llama.cpp/pull/27970)）。

## 稳定性与回归

按潜在影响半径排序。"已提供修复"在对应位置标出。

1. **macOS arm64 上 `ggml-cpu` PCH 引发的堆损坏** —— 静默发生，可能影响任何使用 AppleClang 构建的 Metal/CPU 工作负载。**已在 0.4.1 通过** [b10955](https://github.com/ggml-org/llama.cpp/pull/28882) **修复**。跟踪： [#28858](https://github.com/ggml-org/llama.cpp/issues/28858)。
2. **RDNA3 上自 b10780 以来的 Vulkan PP O(N²) 回归** —— Ling-3.0-tiny-Q8_0 + Arc B580 回退到 SCALAR Flash Attention，导致 prompt-processing 性能退化严重到使设备掉线（[#27638](https://github.com/ggml-org/llama.cpp/issues/27638)、[#28752](https://github.com/ggml-org/llama.cpp/issues/28752)、[#24066](https://github.com/ggml-org/llama.cpp/issues/24066)）。长期存在问题；**本次发布无修复**。
3. **sm_50 + CCCL 2.x 上的 CUDA `argsort` 损坏** —— CUB radix-sort 以原地方式调用（`d_keys_in == d_keys_out`），会在 pass 中途覆写自身输入。修复 PR 开放中： [#28389](https://github.com/ggml-org/llama.cpp/pull/28389)。
4. **RTX 5090 Laptop（sm_120）`op_sigmoid` 中的 CUDA 地址未对齐**，长 prompt 触发；回归位于 `d3146f2b5` 至 `ad6c66839` 之间（[#28877](https://github.com/ggml-org/llama.cpp/issues/28877)）。
5. **SYCL 多 GPU / oneDNN 池损坏** —— 当暂存区分配扰动 LIFO 顺序时触发驱动 TDR 或池崩溃。多份报告：双 Arc Pro B70（[#28778](https://github.com/ggml-org/llama.cpp/issues/28778)）、Arc Pro B50 + A770（[#27888](https://github.com/ggml-org/llama.cpp/issues/27888)）、池释放顺序根因（[#28660](https://github.com/ggml-org/llama.cpp/issues/28660)）。**0.4.1 通过** [b10952](https://github.com/ggml-org/llama.cpp/pull/28704) **提供部分修复**；剩余报告显示潜在触发原因不止一个。
6. **SYCL 在 `--lookup-ngram-min` 下暂存区膨胀** —— SYCL 上启用 ngram-mod 会请求 2 GB+ 暂存区（[#28860](https://github.com/ggml-org/llama.cpp/issues/28860)）。尚无修复。
7. **Qwen3.6 35B A3B 上 SYCL 输出错误**（[#28728](https://github.com/ggml-org/llama.cpp/issues/28728)）—— 正确性 bug，暂无修复 PR。
8. **Qwen4Exp（Qwen3.8-Flash-Next）on Metal：长上下文下"生成 1 个 token 后即 EOS"**（[#28805](https://github.com/ggml-org/llama.cpp/issues/28805)）—— 随机阈值依赖于量化 / KV 量化 / `n_ctx`。模型侧支持刚刚通过 [#28901](https://github.com/ggml-org/llama.cpp/pull/28901) 合入；长上下文下的行为仍待解决。
9. **`ggml_backend_sched_alloc_splits` 图意外重分配** 导致崩溃（[#28753](https://github.com/ggml-org/llama.cpp/issues/28753)）—— 可能与 [#28905](https://github.com/ggml-org/llama.cpp/pull/28905) 中跟踪的分配器重构有关。
10. **`gemma4` 思维链输出越来越长的尾部乱码**（[#28827](https://github.com/ggml-org/llama.cpp/issues/28827)）。
11. **Qwen2.5-Omni 在 Metal 高负载下间歇性静默音频损坏**（[#28441](https://github.com/ggml-org/llama.cpp/issues/28441)）。
12. **`qwen35` 在 RTX 5090 sm_120 上带宽利用率仅约 28%；Windows 比 Linux 慢 1.5–1.6 倍**（[#28196](https://github.com/ggml-org/llama.cpp/issues/28196)）。
13. **RX 7900 XTX 上 Gemma4 / Muse Glimmer 的 Vulkan 加载崩溃**

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 摘要 — 2026-09-15

## 1. 今日要点

今日的活动主要围绕多个模型集成中 **prompt 缓存与工具调用正确性 bug** 展开，其中两个已有明确的修复 PR 合入。Anthropic 兼容端点、qwen3-coder 和 Gemma 4 都暴露了一些微妙的问题，这些问题会在悄无声息中拖垮 agent 工作流——要么完全丢弃工具调用，要么在相同请求下让前缀缓存失效。

## 2. 版本发布与破坏性变更

过去 24 小时内没有新版本发布。

值得关注的已合并 PR（已关闭，尚未打 tag）：
- **#18235** — MLX 版本升级（[链接](https://github.com/ollama/ollama/pull/18235)）
- **#18372** — Apps 布局刷新及复制到剪贴板反馈（[链接](https://github.com/ollama/ollama/pull/18372)）

## 3. 新模型与硬件支持

- **模型请求**（等待维护者审核）：SARVAM-30b / 105b（[#14319](https://github.com/ollama/ollama/issues/14319)）、Gnani Evon-v3.3-30B-A3B（[#18427](https://github.com/ollama/ollama/issues/18427)）
- **硬件后端**：功能请求——在 Windows 上为 AMD Ryzen AI Max 395 支持 ROCm 10（[#18435](https://github.com/ollama/ollama/issues/18435)）

## 4. 性能与优化

- GPT-OSS:120b 在 0.23.4 与 0.30.x 之间出现 **模型加载回归**——调查仍在进行（[#18373](https://github.com/ollama/ollama/issues/18373)）
- RTX 3090 在 0.32.13 与 0.33.2 之间出现 **CUDA ~5× token 生成降速**——已关闭，等待更多反馈（[#18225](https://github.com/ollama/ollama/issues/18225)）
- **JPEG EXIF 朝向归一化** PR 解决了一个长期存在多媒体输入正确性问题，应能减少多模态流水线中重复的重新编码（[#18432](https://github.com/ollama/ollama/pull/18432)）
- **Prompt 缓存命中率优化**：[#18433](https://github.com/ollama/ollama/pull/18433) 稳定了工具额外 schema 键的渲染，确保 qwen3-coder 在相同请求下生成相同的 prompt——直接修复了 [#18430](https://github.com/ollama/ollama/issues/18430)

## 5. 稳定性与回归问题

按对生产 agent 的影响排序：

| 严重程度 | Issue | 摘要 | 修复 PR |
|---|---|---|---|
| **高** | [#17274](https://github.com/ollama/ollama/issues/17274) | 解析失败时工具调用输出被静默丢弃——`content` 为空、无 `tool_calls`，但仍计费约 40 个 completion token | — |
| **高** | [#18390](https://github.com/ollama/ollama/issues/18390) | Gemma 4 工具调用对象键含空格时，解析器会丢弃整个调用；仅服务端 trace 中可见 | — |
| **高** | [#18431](https://github.com/ollama/ollama/issues/18431) | Anthropic 兼容端点将 `role: "system"` 消息从 `messages` 中提升至顶层 system 块，破坏 Claude Code 的前缀缓存 | — |
| **中** | [#18396](https://github.com/ollama/ollama/issue/18396) | Jetson Orin Nano 8GB：Gemma 4 E4B 多模态投影器触发宿主机 OOM，尽管 CPU 投影器配置成功 | — |
| **中** | [#18373](https://github.com/ollama/ollama/issues/18373) | 0.23.4 之后所有模型族均出现显著的模型加载回归 | — |
| **中** | [#18430](https://github.com/ollama/ollama/issues/18430) | qwen3-coder：额外工具 schema 键以 Go map 随机顺序渲染，导致 prompt 缓存碎片化 | [#18433](https://github.com/ollama/ollama/pull/18433) ✅ |
| **中** | [#18419](https://github.com/ollama/ollama/issues/18419) | `/api/codex/v1/responses` 在 `previous_response_id` 工具续接时返回空 completion | [#18434](https://github.com/ollama/ollama/pull/18434) ✅ |
| **低** | [#18208](https://github.com/ollama/ollama/issues/18208) | 使用 `keep_alive -1` 的长生命周期 runner 在加载第二个模型后输出损坏的 `<unused49>` token | — |
| **低** | [#3185](https://github.com/ollama/ollama/issues/3185) | 发布产物中静态链接的 MIT 许可依赖缺失声明文件（275 👍，自 2024 年起开放） | — |
| **低** | [#18225](https://github.com/ollama/ollama/issues/18225), [#18185](https://github.com/ollama/ollama/issues/18185) | 已关闭/需更多信息（CUDA 回归、自定义 GPU/CPU 分配） | — |

## 6. 对应用开发者的意义

- **大规模部署前，请审计 qwen3-coder 的工具 schema。** Go map 迭代 bug 意味着在相当一部分发送请求中，相同请求可能会 miss 提示缓存。一旦 [#18433](https://github.com/ollama/ollama/pull/18433) 合入，请将版本固定到包含该修复的版本。
- **在 [#18390](https://github.com/ollama/ollama/issues/18390) 修复之前，请将 Gemma 4 工具调用视为尽力而为。** 避免在工具参数名中使用含空格的对象键，并在客户端添加校验，确保预期有工具调用时 `tool_calls` 非空。
- **如果你正通过 `ollama.com/v1/messages` 路由 Claude Code，** [#18431](https://github.com/ollama/ollama/issues/18431) 中的 system role 提升问题将推高 token 消耗并使缓存失效。修复即将上线，但在此期间请关注成本变化。
- **OpenAI Responses API 用户（`/api/codex/v1/responses`）** 通过 [#18434](https://github.com/ollama/ollama/pull/18434) 可获得 `previous_response_id` 续接能力——这在本地解锁了 Codex 风格的多轮工具循环。
- **多模态流水线**：[#18432](https://github.com/ollama/ollama/pull/18432) 中的 EXIF 归一化对未旋转图像是字节稳定的，因此可以放心采用而无需重新上传现有数据集。
- **性能回归观察**：如果你曾将版本固定在 ≤0.23.4 以保证可预测的加载时间，升级前值得跟踪 [#18373](https://github.com/ollama/ollama/issues/18373)。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM 摘要 — 2026-09-15

## 1. 今日要点

过去 24 小时的主题是**代理记账与转换层的正确性**，而非新特性。三个问题集群占据主导：(a) Responses→Chat 桥接层存在多个 bug，会在流式传输中丢失或破坏推理内容与缓存写入 token（#40887、#40654、#40736、#29913）；(b) v3 速率限制器已确认存在回归，`model_rpm_limit`/`model_tpm_limit` 每个团队的限制值实际按**配置值的一半**执行（#34140）；(c) 多个预算/任务类 bug，在 `budget_duration = null` 的行上，`BudgetExceededError` 基于过期支出抛出，或重置预算循环悄无声息地将支出永久归零（#27735、#39370、#19105）。积极的一面是，真实基础设施的 CircleCI 覆盖正在协调推进（#41066、#41070、#41073、#41075、#41078），认证路径也有小幅延迟优化（#41087）。

## 2. 版本与破坏性变更

过去 24 小时内未发布新版本。今天没有出现弃用项或配置格式破坏性变更。

## 3. 新模型与硬件支持

过去 24 小时内没有新增的提供商集成或硬件后端落地。今天涉及模型层面的 issue 多为转换/价格映射缺陷：

- **阿里云 DeepSeek V4.1 Flash** — 代理上流式 chat-completions 响应中缺少 `reasoning_content`。今日报告，尚无修复 PR。[#41049](https://github.com/BerriAI/litellm/issues/41049)
- **Vertex AI Claude（带版本号的 id + `claude-haiku-4-5*`）** — 静默的 4096 token 输出上限，`vertex_ai/claude-haiku-4-5*` 映射条目将输出限制为 8192 而非模型的 64000。尚无 PR。[#40363](https://github.com/BerriAI/litellm/issues/40363)
- **ChatGPT 订阅（`chatgpt/`）提供商** — `gpt-5.6-sol` 在 `response.completed` 中返回空的 `output[]`，尽管流式内容存在，并抛出 `Unknown items in responses API response: []`。Issue 已关闭但根因不明。[#41017](https://github.com/BerriAI/litellm/issues/41017)
- **SambaNova 价格映射** — 17 个条目中有 12 个指向已下线模型，且多个价格/上下文信息有误。已作为过期 issue 关闭。[#29011](https://github.com/BerriAI/litellm/issues/29011)

## 4. 性能与优化

- **认证路径延迟。** PR [#41087](https://github.com/BerriAI/litellm/pull/41087) 每个请求仅加载一次团队成员关系，并在 L1 缓存命中时完全跳过 Prisma 调用。报告指出，小型 chat completions 在 token 开始生成前存在数秒额外耗时，在突发流量下被支付两次，且存在一个缓慢的 Redis 写入阻塞响应。PR 描述中未提供具体数字，但该变更针对的是主要的热路径开销。尚未合并。
- **路由在 `/embeddings` 上的调用前检查。** PR [#35661](https://github.com/BerriAI/litellm/pull/35661) 将 embedding 输入计为文本，并修复了之前的 `AttributeError: 'str' object has no attribute 'get'`，该错误曾导致每个 list-string 输入跳过上下文窗口过滤。未附基准数据。
- **Websearch 目标与多查询。** PR [#40399](https://github.com/BerriAI/litellm/pull/40399) 让被拦截的 web-search 工具可以发出一个目标加多个查询，而非单一 `query` 字符串 — 与 Parallel AI 的搜索 API 相关。无性能数据。
- **FOCUS 导出目标。** PR [#39795](https://github.com/BerriAI/litellm/pull/39795) 将 Ternary 提升为一级 FOCUS 接收方（`callbacks: ["ternary"]`）。运维/性能影响：去除了单独的导出任务。
- **Uvicorn 访问日志噪音。** PR [#41096](https://github.com/BerriAI/litellm/pull/41096) 终于开始遵循（已文档化的）`LITELLM_DISABLE_ACCESS_LOG_PATHS` 环境变量，为健康检查/指标探针向 `uvicorn.access` 挂载一个 `AccessLogPathFilter`。影响日志量而非请求延迟。
- **集成测试基础。** PR [#41066](https://github.com/BerriAI/litellm/pull/41066)、[#41070](https://github.com/BerriAI/litellm/pull/41070)、[#41073](https://github.com/BerriAI/litellm/pull/41073)、[#41075](https://github.com/BerriAI/litellm/pull/41075)、[#41078](https://github.com/BerriAI/litellm/pull/41078) 新增了真实的 PostgreSQL/Redis/HTTP/TCP 对等合约，覆盖密钥再生成、分区 DDL、bearer/STS 解析、Anthropic 缓存 token 记账、MCP/OAuth 发现以及防护栏关联。这是吞吐/正确性的脚手架，并非用户可见的加速。

## 5. 稳定性与回归

按对生产运维的严重性排序。

### 高严重性

- **V3 速率限制器对每个团队每个模型的限制双重计算** — `#34140`。通过 `POST /team/update` 在团队上设置的 `model_rpm_limit`/`model_tpm_limit` 实际按其值的一半执行；限制为 N 时，约在 N/2 后开始返回 429。提供复现可复现。**尚无修复 PR。** [Issue #34140](https://github.com/BerriAI/litellm/issues/34140)
- **`BudgetExceededError` 基于过期支出抛出** — `#27735`。团队范围的虚拟密钥被拒绝，尽管 `/key/info` 报告的支出低于 `max_budget`。阻断生产。**尚无修复 PR。** [Issue #27735](https://github.com/BerriAI/litellm/issues/27735)
- **重置预算任务悄无声息地将支出永久归零** — `#39370`。具有 `budget_duration = null` 且 `budget_reset_at` 为过期过去时间的行，会在每个周期被重置循环选中，因此支出无界地归零。**尚无修复 PR。** [Issue #39370](https://github.com/BerriAI/litellm/issues/39370)
- **流式 `/v1/responses` 请求永远不会被支出记录** — `#29913`（已关闭）。对 Responses 接口的流式请求在成功日志记录中因 `'dict' object has no attribute 'usage'` 失败，因此不会写入 `LiteLLM_SpendLogs` 行，请求未被计费。**已关闭但底层代码路径仍未解决。** [Issue #29913](https://github.com/BerriAI/litellm/issues/29913)

### 中等严重性

- **Responses→Chat 流式传输丢失推理进度与缓存的推理** — `#40887`。桥接层处理 tool-call/message 输出项，但从不映射增量推理项。影响在 chat 接口上依赖流式 `reasoning_content` 的智能体类客户端。**尚无修复 PR。** [Issue #40887](https://github.com/BerriAI/litellm/issues/40887)
- **Responses→Chat 桥接在流式和非流式下均丢失原始 `reasoning_text`** — `#40654`。当配置为 `openai/responses/<model>` 并通过 `/v1/chat/completions` 调用时，提供商的明文推理内容会丢失。**尚无修复 PR。** [Issue #40654](https://github.com/BerriAI/litellm/issues/40654)
- **流式 usage 合并器在显式零值更新后仍保留过期的缓存写入 token** — `#40736`。与 Bedrock Invoke 丢失（#34497）以及更早的负缓存提示成本（#15263）相关。**尚无修复 PR。** [Issue #40736](https://github.com/BerriAI/litellm/issues/40736)
- **管理 UI 模型编辑持久化派生价格 → 价格映射重载后 Azure 支出记为 $0** — `#40649`。自定义部署价格被覆盖，随后价格映射重载将 Azure 成本清零。与 #30081 合并出现。**尚无修复 PR。** [Issue #40649](https://github.com/BerriAI/litellm/issues/40649)
- **自托管安装在 `prisma generate` 上失败** — `#26097`。权限问题阻塞安装脚本。👍 4，尚无修复 PR。[Issue #26097](https://github.com/BerriAI/litellm/issues/26097)
- **主机离线时健康检查硬失败** — `#34281`。对临时/家庭实验室部署缺少优雅处理。**尚无修复 PR。** [Issue #34281](https://github.com/BerriAI/litellm/issues/34281)
- **入站请求的 `INFO` 日志无法关闭** — `#10788`。`LITELLM_LOG=ERROR` 不能抑制每个请求的访问行。长期未解决，尚无修复 PR。[Issue #10788](https://github.com/BerriAI/litellm/issues/10788)

### 低严重性 / 今日已解决

- **实时 `response.create` 重复且缺少转写防护栏** — 修复 PR [#31822](https://github.com/BerriAI/litellm/pull/31822) 在未激活 `realtime_input_transcription` 防护栏时，停止在转写完成时自动注入 `response.create`。已开放。
- **Anthropic 透传：拒绝内容块全部无法识别的请求** — 针对 [#41091](https://github.com/BerriAI/litellm/issues/41091) 的修复 PR [#41095](https://github.com/BerriAI/litellm/pull/41095)。空的 `messages[]` 不再被向上游派发。
- **`litellm_session_id` 在支出日志的 `session_id` 中被遵守** — 针对 [#40851](https://github.com/BerriAI/litellm/issues/40851) 的修复 PR [#41004](https://github.com/BerriAI/litellm/pull/41004)。每次调用的 trace id 不再覆盖调用方提供的 session id。
- **Anthropic Messages：在 thinking 缺失/禁用时抑制 `reasoning_content`→thinking** — 修复 PR [#32337](https://github.com/BerriAI/litellm/pull/32337)。
- **组织管理员重新获得对其他组织中自己团队的可视性** — 修复 PR [#41086](https://github.com/BerriAI/litellm/pull/41086)。
- **模型 `info` 即便使用受限的 UI 密钥也会为代理管理员返回完整组列表** — 修复 PR [#41094](https://github.com/BerriAI/litellm/pull/41094)。
- **可配置的 DB/凭证重载间隔** — 今日关闭（[#40972](https://github.com/BerriAI/litellm/issues/40972)），未见明显合并。
- **模型访问检查忽略虚拟密钥上的 `access_group_ids`** — 已关闭（[#28464](https://github.com/BerriAI/litellm/issues/28464)）。
- **冷却 TTL 不区分 429 速率限制与 429 配额耗尽** — 作为问题关闭（[#27470](https://github.com/BerriAI/litellm/issues/27470)）；在 [#33371](https://github.com/BerriAI/litellm/issues/33371) 中开放了一个暴露结构化路由健康状态的 RFC。
- **`cache_control_injection_points` 失效 + `/v1/responses` 上的 Claude 工具调用循环** — 已关闭（[#29810](https://github.com/BerriAI/litellm/issues/29810)），无明确修复。
- **WebSocket `/v1/responses` 需要 `?model=` 查询参数，破坏 OpenAI 规范** — 已关闭（[#25532](https://github.com/BerriAI/litellm/issues/25532)，👍 9），无明确修复；SDK 用户仍应在 body 中发送 `model` 而非依赖 `?model=`。
- **管理 UI 在每次导航时执行完整重载 + 404 预取风暴** — 今日关闭（[#41029](https://github.com/BerriAI/litellm/issues/41029)），未见明显合并。
- **每团队响应缓存作用域** — 已关闭（[#29955](https://github.com/BerriAI/litellm/issues/29955)），无修复；跨租户缓存复用仍然可能。
- **v1.87.1 中自定义脱敏标签损坏** — [#30008](https://github.com/BerriAI/litellm/issues/30008)，尚无修复。

### 其他值得关注的 PR

- **项目密钥必须属于团队自己的项目** — 修复 PR [#41092](https://github.com/BerriAI/litellm/pull/41092) 关闭了跨团队密钥挂载的漏洞。
- **从回退泛化规则中选择性启用 `fill_missing_fields`** — PR [#41093](https://github.com/BerriAI/litellm/pull/41093) 使得缺少 `supports_reasoning` 等字段的映射条目可以在不破坏 wandb/Claude 数值猜测的情况下被填充。
- **Airia 防护栏作为内置提供商** — PR [#40784](https://github.com/BerriAI/litellm/pull/40784)。
- **通过仪表板为团队/密钥提供商的流量分流** — PR [#41072](https://github.com/BerriAI/litellm/pull/41072)。

## 6. 对应用开发者的意义

- **暂勿将 v3 每个团队每个模型的 RPM/TPM 限制部署到生产。** [#34140](https://github.com/BerriAI/litellm/issues/34140) 使得配置值成为*对双倍计数的上限*，因此欠限流而非超限流成为失败模式 — 在此修复前，请使用全局速率限制或 sidecar 进行保护。
- **将代理上的预算执行视为参考性。** 三个独立未解决的 bug（[#27735](https://github.com/BerriAI/litellm/issues/27735)、[#39370](https://github.com/BerriAI/litellm/issues/39370)、[#19105](https://github.com/BerriAI/litellm/issues/19105)）意味着误报拒绝*以及*静默的支出清零。如果你要向团队计费回溯，请对照自己的使用存储进行对账，而非信任代理的 `/key/info`。
- **Responses→Chat 桥接对流式推理不安全。** 如果你的智能体在一侧使用 OpenAI Responses API 而在另一侧使用 chat 接口，你将丢失推理内容（[#40887](https://github.com/BerriAI/litellm/issues/40887)、[#40654](https://github.com/BerriAI/litellm/issues/40654)）。在整个技术栈中将 API 接口固定为单一类型。
- **流式中的缓存 token 记账很脆弱。** Bedrock、Anthropic 和 openai/responses 各自都有边界情况（[#40736](https://github.com/BerriAI/litellm/issues/40736)、[#22984](https://github.com/BerriAI/litellm/issues/22984)、[#29913](https://github.com/BerriAI/litellm/issues/29913)）。在对客户计费时不要直接使用代理的 `cached_tokens`，先进行对账；考虑向他们展示原始的 usage 对象。
- **`openai/responses/<model>` 的价格从管理 UI 覆盖是不安全的。** [#40649](https://github.com/BerriAI/litellm/issues/40649) 显示自定义部署价格会被静默覆盖，且 Azure 支出记为 $0。请直接编辑 `model_prices_and_context_window.json`（或你的配置），而非通过 UI。
- **日志量。** 如果你在跟踪代理日志，请预期会有噪音：

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-15

## 今日要点
过去 24 小时内没有带标签的发布，但合并队列由 **Unsloth Studio** 后端加固工作主导（OpenAI/Codex 兼容性、tool-call 忠实度、MCP 管道），以及一个看似低调但重要的 **非 NVIDIA 加速器** 进展：Ascend NPU 设备检测正在合入，Windows AMD 主机的推理路径被改走 Vulkan 而非 CPU 包。Studio 前端也在 UX 方向上有所转向，几处 "Run settings" 冲突和少量内存泄漏报告已关闭。

## 发布与破坏性变更
*过去 24 小时内没有新的带标签发布。*

值得关注的已合并但尚未发布的行为变更：
- **PR #4989**（自四月以来一直开放，现已活跃）：Studio 后端/前端支持 `HF_ENDPOINT` 环境变量——如果你在区域内部镜像 HF 则相关。（[PR #4989](https://github.com/unslothai/unsloth/pull/4989)）
- **PR #10686** + **PR #10684**：从 `get_device_type()` 和 `StoppingCriteriaSub` 中移除 CUDA 硬编码的设备——这些变更会改变非 CUDA 加速器上的行为，并且是 NPU/XPU 路径的前置条件。

## 新模型与硬件支持
- **Ascend NPU** — `get_device_type()` 现在能识别 `"npu"`，而不是在导入时抛出 `NotImplementedError`。停止条件不再硬编码 CUDA。（[PR #10686](https://github.com/unslothai/unsloth/pull/10686)，[PR #10684](https://github.com/unslothai/unsloth/pull/10684)）
- **AMD Windows GPU → Vulkan** — Studio 的解析器现在在无可用 ROCm 的 Windows AMD 主机上选择 Vulkan llama.cpp 包，与 Linux 行为一致。已引用 Strix Halo 自托管验证。（[PR #10908](https://github.com/unslothai/unsloth/pull/10908)）
- **Windows CPU → GPU 保留** — 应用内更新此前会在静默中将推理降级到 CPU；通过 #10906 落地了与 flavor 无关的修复。（[PR #10906](https://github.com/unslothai/unsloth/pull/10906)）
- **图像模型的量化默认值** — 官方 BF16 图像选择现在默认使用托管的 INT8/FP8 checkpoint，与 MiniMax H3 图像栈的约定一致。（[PR #10883](https://github.com/unslothai/unsloth/pull/10883)）
- **MTP / 投机解码的 VRAM 预留** — Studio 现在从 drafter GGUF 元数据中读取 `<arch>.nextn_shared_target_tensors`，并将 draft 权重/KV 估算加入共享 MTP drafter 的 `--fit-target`。自包含和 CPU 卸载的 drafter 按设计保持不变。目标为 QwQ 类架构。（[PR #10149](https://github.com/unslothai/unsloth/pull/10149)）
- **AMD Docker 支持** 已关闭（#6230）— ROCm 容器镜像与 Blackwell/CUDA 镜像一致。
- **Gemma 4 视觉** — `FastVisionModel` 与普通 transformers 之间的空间定位差异已在 #6028 修复。
- **仍开放的特性请求**：Krea2 LoRA 训练（#10881），Windows 上 Intel ARC 140T 安装（#8632）。

## 性能与优化
- **媒体族覆盖项结构性重构** — 长期运行的重构（#10150），取代 #8622；旨在消除一类"选错媒体族"的回归。
- **MTP VRAM 预算**（见上）— 提升 GPU 驻留的共享 MTP drafter 真正能够装下的概率，避免静默回退到 CPU。
- **Whisper 转写回归测试**（#10077）— 锁定纯文本回合应明确返回 400，而不是静默错路由；防止未来回归。
- **MLX 流去重**（#10905）— 修复 Gemma-4 在 MLX 路径上原生控制 token 流式输出重复的问题（该问题会膨胀表观 token 数）。
- **开放中的内存/性能问题**：
  - [#10921](https://github.com/unslothai/unsloth/issues/10921) 自上次 llama.cpp 更新以来内存使用持续增长——Web UI。
  - [#10912](https://github.com/unslothai/unsloth/issues/10912) `unsloth start pi` 在慢速 CPU 主机上频繁出现 `Error: terminated`；引用 PR #10911 作为修复。

## 稳定性与回归
按对生产用户的潜在影响范围排序：

1. **MCP tool call 被静默截断**（[#10839](https://github.com/unslothai/unsloth/issues/10839)）— MCP payload 系统性截断，疑似去重所致。**仍开放**，尚无修复 PR。对任何使用 MCP 的 agent 影响严重。
2. **安全检查被构造的命令绕过**（[#10835](https://github.com/unslothai/unsloth/issues/10835)）— 尽管有防护，`reboot` 和 `rm`（以及 `$(ls …)` 注入模式）仍被执行。**已关闭**；在依赖该安全检查前，请确认你的安装版本包含此修复。
3. **因 Run settings 参数冲突导致云模型连接失败**（[#10917](https://github.com/unslothai/unsloth/issues/10917)）— 今日在 Studio Web UI 新提交的 bug。
4. **从本地缓存加载已撤销 HF 模型时的误导性错误**（[#10929](https://github.com/unslothai/unsloth/issues/10929)）— 日志噪音；HF 模型访问已被撤销，但 Studio 仍以令人困惑的诊断持续重试。
5. **嵌套 tool-call 字段重排序**（[#10935](https://github.com/unslothai/unsloth/pull/10935)）— llama.cpp 的语法要求嵌套对象字段按 schema 顺序排列；Qwen vs Notion 的顺序差异导致静默光标丢失以及错误的"同一调用"去重。修复 PR 已开放。
6. **超长对话上的 Codex 死循环**（[#10938](https://github.com/unslothai/unsloth/pull/10938)）— 当上下文溢出时，Studio 原样返回 `400` 作为数字，导致 Codex 重试 5 次后才放弃。修复 PR 已开放。
7. **Windows ARM64 桌面安装器在 `pyarrow` 上失败**（[#10875](https://github.com/unslothai/unsloth/issues/10875)）— CLI 安装可用，桌面包不可用。开放中。
8. **Run-settings 侧栏与下拉草稿不一致**（[#10817](https://github.com/unslothai/unsloth/issues/10817)）— 两个 UI 面板编辑同一份 per-model 配置时静默不一致。已关闭；请在你的 Studio 构建中验证。
9. **重放的 tool call 对参数键重新排序**（[#10791](https://github.com/unslothai/unsloth/issues/10791)）— 导致 llama.cpp 重新处理每个多参数调用。已关闭。
10. **重复 tool-call 防护阻断了合法的重跑**（[#10792](https://github.com/unslothai/unsloth/issues/10792)）— 已关闭。
11. **`--tensor-split` 被忽略**（[#10355](https://github.com/unslothai/unsloth/issues/10355)）— 已关闭。
12. **`min_p` 和 `logit_bias` 在 Studio → vLLM 路径上不支持**（[#10573](https://github.com/unslothai/unsloth/issues/10573)）— 已关闭。
13. **Studio GGUF：完整 VRAM 卸载后系统内存未释放**（[#9033](https://github.com/unslothai/unsloth/issues/9033)）— 已关闭。
14. **DGX Spark 上下文限制**（[#9889](https://github.com/unslothai/unsloth/issues/9889)）— 已关闭。
15. **Windows 工具栏 tooltip 遮挡控件**（[#10226](https://github.com/unslothai/unsloth/issues/10226)）— 已关闭。

## 对应用开发者的意义
- **不要盲目锁定某个 Studio 版本。** 几个"已关闭"的 bug 涉及 UI 配置一致性、MCP 安全性和 tool-call 忠实度——都直接影响 agent 行为。如果你在 Unsloth Studio 之上交付 agent，请在发布前验证你部署的版本包含 #10835（安全）、#10791/#10792（tool-call 去重）以及 #10906（CPU 回退保留）。
- **OpenAI/Codex SDK 兼容性正在快速改善。** PR #10937（接受消息 `name` 字段）、#10939（强制 tool-use 遵循）、#10933（per-model 推理强度与图像能力查询）以及 #10938（优雅的上下文溢出信号）共同解除了 LangChain/LangGraph/AutoGen/Codex 集成的阻塞。如果你此前必须 fork Studio 的请求 schema，请在 `main` 上重新测试。
- **如果你身处 GFW 之后或 HF 被限速**，PR #4989 终于在 Studio 中带来了 `HF_ENDPOINT`——但它仍处于开放状态，你需要从该分支构建。
- **在 MTP 增强 checkpoint 上训练**（QwQ 风格）— #10149 中新增的 `--fit-target` 核算让你在使用共享 drafter 时能更准确地规划 VRAM 预算。如果你此前在规避静默 CPU 回退，请在最新 PR 上重测。
- **正在规划 AMD 或 Ascend 部署？** NPU 导入崩溃即将消失（#10686），AMD Windows → Vulkan 路径已合入（#10908），AMD ROCm Docker 路线已关闭（#6230）。请将其视为"NPU 为 alpha，AMD-Vulkan 为 beta，AMD-Docker 为 beta"，而非生产就绪。
- **MCP 生态仍然粗糙。** 截断问题（#10839）以及缺乏 hub/安装器（#10822）是两个最大的痛点。在这些落地之前，请沙箱化你的 MCP server 并端到端校验 payload。
- **关于数据流水线**：如果你此前在导出对话用于 SFT/DPO，请注意 PR #10941——ShareGPT 导出现在会丢弃重新生成的回复和编辑过的 prompt，与 Training JSONL 的行为一致。可停止手动的导出预过滤处理。

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router 摘要 — 2026-09-15

## 1. 今日要点

过去 24 小时的活动主要围绕 **Codex 桌面应用集成** 和 **Anthropic ↔ OpenAI 协议转换** 的正确性修复。推动此次活跃度的两个开放 issue 是 Codex 配置启动失败（#1795）和 OpenAI Responses 上游拒绝转换后的 reasoning 项（#1784）；两者均有对应的 PR 在进行中（分别为 #1796 和 #1784）。无新版本发布。

## 2. 版本发布与破坏性变更

*过去 24 小时内无新版本发布。*

## 3. 新模型与硬件支持

*无新模型、后端或量化支持的公告。*

## 4. 性能与优化

直接的吞吐量/延迟工作暂无，但有两项变更提升了运行可靠性：

- **[PR #1794](https://github.com/musistudio/claude-code-router/pull/1794)** — 提高并将网关的 `gateway:config-accepted` 超时设为可配置。当前硬编码的 5 秒预算同时涵盖子进程拉起 **和** 入口点的完整 `require()`，在 CI/Windows 等慢路径下显得脆弱。变更后，运维人员可按自身环境调整该超时值，而非偶发性触发它。

## 5. 稳定性与回退

按对运行中部署的影响排序：

| 严重程度 | 项目 | 状态 | 备注 |
|---|---|---|---|
| 🔴 高 | [#1795](https://github.com/musistudio/claude-code-router/issues/1795) Codex 配置（桌面 ChatGPT 应用）启动失败：*"This app server did not provide application network requirements"* | OPEN | 影响 macOS 上使用 `default-codex` 的 Codex 用户。直接修复见 PR #1796。 |
| 🔴 高 | [#1784](https://github.com/musistudio/claude-code-router/pull/1784) OpenAI Responses 上游拒绝带有非空 `content` 数组的 `reasoning` 项（HTTP 400 `array_above_max_length`） | OPEN (PR) | 在将先前 Claude 的 `thinking` 块转换进 Responses 历史时触发。 |
| 🟡 中 | [#1794](https://github.com/musistudio/claude-code-router/pull/1794) Config-acceptance 超时过紧且不可配置 | OPEN (PR) | 参见 §4。 |
| 🟢 已关闭 | [#1615](https://github.com/musistudio/claude-code-router/issues/1615) 跨协议回退跳过请求体重转译 → HTTP 400 | CLOSED | 已修复；429/5xx 触发的重试现在会在异构链路（例如 `anthropic_messages` → `openai_responses`）上重新执行协议转换。 |
| 🟢 已关闭 | [#1683](https://github.com/musistudio/claude-code-router/issues/1683) Codex 应用对自定义提供商隐藏速度控制 | CLOSED | 根本原因在 Codex 应用自身的目录加载器，而非 CCR 数据端。CCR 侧无需变更。 |
| 🟢 已关闭 | [#1702](https://github.com/musistudio/claude-code-router/pull/1702) 为 OpenAI 上游剥离 Anthropic 的 `thinking` / `redacted_thinking` 块 | CLOSED (merged) | 取代了 `stripUnsupportedOpenAiRequestParameters` 中原先仅剥离顶层块的做法。与 #1784 配合可实现对 Responses 的完整覆盖。 |

模式：本次活跃度是一根连贯的主线 — **CCR ↔ OpenAI Responses 协议保真度**，尤其围绕 reasoning/thinking 内容以及 Codex app-server 握手。Codex 桌面配置路径看起来仍是尚存粗糙之处的集成点。

## 6. 对应用开发者的影响

- **若你通过 CCR 路由 Codex 桌面流量**（macOS ChatGPT 应用，经 `codex` 配置）：在 [#1796](https://github.com/musistudio/claude-code-router/pull/1796) 合入前，当前 `main` 会出现启动失败。请回退到受影响 codex-config 路径之前的提交，或关注该 PR。
- **若你使用混合 `anthropic_messages` 与 `openai_responses` / `openai_chat` 的多模型回退链**：[#1615](https://github.com/musistudio/claude-code-router/issues/1615) 的修复意味着 429/5xx 重试现在能正确地对请求体进行重新转译。此前因第一跳总是成功而看似"正常"的长链路，现在可能会首次走到重转译路径 — 请重新核验日志。
- **若你曾将 Anthropic 的 `thinking` 历史喂给 OpenAI Responses/Chat 上游**：请确保你的构建已包含 [#1702](https://github.com/musistudio/claude-code-router/pull/1702)（已合并）**并** 尽可能包含 [#1784](https://github.com/musistudio/claude-code-router/pull/1784)（待合并）。合并的修复会剥离 thinking 块；待合并的修复则会进一步清理在转换过程中 `content` 数组被填充的 `reasoning` 项。在两者均合入前，首次助手轮次之后，来自 Codex API 形态上游的 HTTP 400 会出现间歇性报错。
- **运维提示**：升级时请留意网关启动时间。[#1794](https://github.com/musistudio/claude-code-router/pull/1794) 将 `gateway:config-accepted` 预算变为可调，正是冷启动较重环境（大型插件树、慢速文件系统、Windows）的合适调节旋钮。
- **路线图信号**：Codex 应用 + Responses 协议修复的集中出现，表明 CCR 正在强化其作为多协议、多端面（CLI *与* 桌面应用）网关的角色。在设计路由链时，请将 OpenAI Responses 视为一等上游目标，而非 `openai_chat` 的即插即用替代。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 简报 — 2026-09-15

## 今日要点
过去 24 小时的工作主要集中在两件事：一是 **Anthropic ↔ OpenAI Responses ↔ Chat Completions 协议转换层的代理/转换正确性修复**（流式 `message-start` 负载、`tool_call_id` 长度、reasoning-effort 保留、内联 `<think>` 剥离），二是 **Codex 侧的提供商切换可靠性工作**（陈旧的账号绑定、缺失的 `content` 字段导致严格的 Anthropic SDK 报错、提供商切换时的会话历史失效）。功能方面，新增了两个一等公民 Harness —— **MiniMax Code**（#7383）和 **DeepSeek Harness**（#7356），同时上线了期待已久的 **Google Antigravity** 集成，用以取代已被弃用的 Gemini CLI 路径（#7402）。

## 发布与破坏性变更
过去 24 小时内没有新增 tag 发布。已提交问题中引用的最新发布版本仍为 **v3.20.2 / v3.20.3**。有两个潜在回归需要运维人员升级前留意：
- **#7401** —— commit `5c053626` 导致编辑"默认兜底模型"（`ANTHROPIC_MODEL`）并点击"一键设置"时静默失败，并*回写覆盖*原值。影响 v3.20.3 / macOS / Claude Code。
- **#7230** —— v3.20.2：Codex `send_message_to_thread` 在跨任务消息上返回 HTTP 400（缺失 `call_id`/`name`）。

## 新增模型与硬件支持
- **MiniMax Code harness** 作为一等公民应用加入：提供商/模型管理、MCP、Skills、全局指令、本地会话历史、使用情况面板（[PR #7383](https://github.com/farion1231/cc-switch/pull/7383)）。
- **DeepSeek Harness (DSH)** 提升为一等公民，自带原生 YAML/凭据写入器和 Codex 风格的提供商表单，取代 #6526（[PR #7356](https://github.com/farion1231/cc-switch/pull/7356)）。
- **Google Antigravity (`agy`)** 集成取代已弃用的 Gemini CLI 路径。新增对 `~/.gemini/{antigravity,antigravity-cli,antigravity-ide}/brain/*/transcript.jsonl` 的会话扫描、来自 `conversations/*.db` 的 protobuf 用量统计，以及 WAL 感知的增量同步。向后兼容现有 Gemini 配置（[PR #7402](https://github.com/farion1231/cc-switch/pull/7402)、[Issue #7345](https://github.com/farion1231/cc-switch/issues/7345)，[PR #5230](https://github.com/farion1231/cc-switch/pull/5230) 已关闭）。
- **Grok Official** 提供商现在为账号凭据单独保存；用量统计处理 Windows 文件 mtime 的怪异行为（[PR #6792](https://github.com/farion1231/cc-switch/pull/6792)）。
- **Hermes Agent** 累计 `session_model_usage` 接入用量面板作为独立数据源，首次运行建立基线（不做历史回填）（[PR #6120](https://github.com/farion1231/cc-switch/pull/6120)）。
- **Linux 上的 Claude Desktop 第三方配置文件** —— `XDG_CONFIG_HOME` 解析，带 `~/.config` 兜底，感知 Flatpak 的路径处理（[PR #7389](https://github.com/farion1231/cc-switch/pull/7389) 已关闭，[PR #7331](https://github.com/farion1231/cc-switch/pull/7331) 已关闭，[Issue #4855](https://github.com/farion1231/cc-switch/issues/4855) 已关闭）。
- **Gemini JSONL 会话支持** —— 后端解析器现在同时接受 `.json` 和 `.jsonl`，并支持对追加事件的增量摄取（[PR #2771](https://github.com/farion1231/cc-switch/pull/2771)、[PR #7385](https://github.com/farion1231/cc-switch/pull/7385)）。

## 性能与优化
本周期没有基准数据落地。与性能间接相关的工作包括：
- **模型列表拉取**（[PR #6912](https://github.com/farion1231/cc-switch/pull/6912)）现在改为透出提供商的错误信封，而不是在鉴权失败时静默返回空列表（例如 GLM Codex 端点返回 HTTP 200 + `{"code":1001,...}`），应能减少排查"模型为何缺失"的耗时。
- **Windows Terminal 处理**（[PR #7208](https://github.com/farion1231/cc-switch/pull/7208)、[PR #7381](https://github.com/farion1231/cc-switch/pull/7381)）停止让 CC Switch 强制执行 `wt cmd /K ...`，此前该行为会覆盖用户的 `defaultProfile`。
- **出站脱敏**（[PR #7306](https://github.com/farion1231/cc-switch/pull/7306)）用**可类型化的可逆占位符**（如 `{{PHONE:1}}`）取代不可逆的 `*` 遮罩，使模型仍能保留实体类型，并在响应端做反向替换还原 —— 提升下游工具调用的准确率。

## 稳定性与回归
按对生产用户的影响半径排序：

| 严重度 | 项目 | 状态 |
|---|---|---|
| **高** | [#7396](https://github.com/farion1231/cc-switch/pull/7396) —— OpenAI→Anthropic 流式输出在 `message_start.message` 中省略必需的 `content` 数组；严格的 Anthropic SDK 客户端会将该快照视为终态，并在首个内容块上报错。 | **修复 PR 已开** |
| **高** | [#7386](https://github.com/farion1231/cc-switch/pull/7386) —— Codex 切换提供商时静默破坏旧会话（config.toml `Model provider 'custom' not found`）；统一会话入口对 `model_provider = "openai"` 永远不会打开。 | **修复 PR 已开** |
| **高** | [#7362](https://github.com/farion1231/cc-switch/issues/7362) —— 在 CC Switch 中切换提供商会将新的 `model_provider` 写入 Codex 的 `state_5.sqlite` → `threads.model_provider`，导致先前的对话成为孤儿。 | Issue 已开，PR 待补 |
| **高** | [#7377](https://github.com/farion1231/cc-switch/issues/7377) —— 在 CCS 内部官方 Codex 登录过期后，切换提供商失败。 | Issue 已开 |
| **高** | [#7401](https://github.com/farion1231/cc-switch/issues/7401) —— `5c053626` 导致 v3.20.3 中"默认兜底模型"保存被破坏（回归，覆盖而非保存）。 | Issue 已开 |
| **高** | [#7230](https://github.com/farion1231/cc-switch/issues/7230) —— v3.20.2 中 Codex 跨任务 `send_message_to_thread` → HTTP 400。 | Issue 已开 |
| **中** | [#7398](https://github.com/farion1231/cc-switch/pull/7398) / [#7397](https://github.com/farion1231/cc-switch/issues/7397) —— `muse-spark-*` 模型未出现在 `supports_reasoning_effort()` 中；`output_config.effort` 在 Anthropic→Responses 中被静默丢弃。相关 Bug 类型之前已针对 Grok 修复（#7314/#7318）。 | **修复 PR 已开** |
| **中** | [#7156](https://github.com/farion1231/cc-switch/issues/7156) —— DeepSeek Chat 上游以"过短"为由拒绝 CCS 生成的 `tool_call_id`（HTTP 400），子代理工具调用 100% 可复现。 | Issue 已开 |
| **中** | [#7271](https://github.com/farion1231/cc-switch/issues/7271) —— Claude 路径会把来自 OpenAI Chat 上游的内联 `<think>` 块泄漏到最终助手轮次（如 MiniMax M3 / OpenCode Go）。 | Issue 已开 |
| **中** | [#5860](https://github.com/farion1231/cc-switch/issues/5860) —— Responses→Chat 转换将单条助手轮次拆分成两条相邻消息，并重复 `reasoning_content` → DeepSeek V4 出现无限重复（12–14 万字）。 | **已关闭**（调查完成） |
| **中** | [#7211](https://github.com/farion1231/cc-switch/issues/7211) —— CCS 强制重写 Codex CLI `config.toml` 中的 `requires_openai_auth`，破坏非 CCS 管理的 Codex 流程。 | Issue 已开 |
| **中** | [#5367](https://github.com/farion1231/cc-switch/issues/5367) —— GPT-5.6 显式 `max` effort 在 Claude→Responses 中被静默降级为 `xhigh`。 | Issue（陈旧，重新浮现） |
| **中** | [#5368](https://github.com/farion1231/cc-switch/issues/5368) —— Claude→Responses 语义流预热可能无限挂起。 | Issue（陈旧） |
| **低** | [#7265](https://github.com/farion1231/cc-switch/issues/7265) / [#7032](https://github.com/farion1231/cc-switch/issues/7032) —— 切换提供商时出现解析错误 / "账号不存在"。 | Issue 已开 |
| **低** | [#7125](https://github.com/farion1231/cc-switch/issues/7125) —— DNS 缓存覆盖在 CCS 启用时把 `api.deepseek.com` 解析为 `127.0.0.1`。 | **已关闭** |
| **低** | [#5352](https://github.com/farion1231/cc-switch/issues/5352) —— 已删除的 Skills 仍显示在 UI 中。 | Issue（陈旧） |
| **低** | [#3938](https://github.com/farion1231/cc-switch/issues/3938) —— 未导入 Gemini CLI 0.45.2 `session-*.jsonl`。 | 已被 #7402 Antigravity 路径取代 |

## 对应用开发者的影响
- **不要升级到 v3.20.3 之上**，前提是你的业务依赖以下任意一项：提供商切换后的 Codex 会话连续性、到 DeepSeek V4 的 `tool_call_id` 往返、严格校验 `message_start.message.content` 的 Anthropic SDK。请固定在一个已知良好的构建上，直到 [#7396](https://github.com/farion1231/cc-switch/pull/7396)、[#7386](https://github.com/farion1231/cc-switch/pull/7386) 和 [#7156](https://github.com/farion1231/cc-switch/issues/7156) 合入。
- **Anthropic↔OpenAI 转换是最危险的面。** 今日开放的 Bug 中大约一半集中在代理的协议转换层。如果你的代理会发出自定义工具 schema 或进行长推理流式输出，请在每次发布前对 CCS 代理跑一次冒烟测试 —— 并且如果你依赖 Grok / Muse-Spark 的推理控制，请预留自行消费 `output_config.effort` 的工作量。
- **为 Antigravity 规划，而非 Gemini CLI。** Google 已实质弃用独立的 `gemini` 二进制；新版 CC Switch 将写入 `~/.gemini/antigravity*` 路径。硬编码 `~/.gemini/tmp/*/chats/` 用于用量抓取的代理需要准备兜底路径。
- **模型发现现在更可靠了。** 借助 [#6912](https://github.com/farion1231/cc-switch/pull/6912)，返回 HTTP-200 错误信封的提供商（GLM 等）会向用户暴露错误，而不是静默显示无模型 —— 对脚本化接入提供商很有帮助。
- **脱敏不再是单向的。** 可逆占位符方案（[#7306](https://github.com/farion1231/cc-switch/pull/7306)）意味着下游那些对遮罩 PII 做模式匹配的代码（例如 `****-****-****-1234`）将不再可用；请迁移到识别占位符的匹配方式。
- **无头/CLI 模式是最被呼吁的缺失功能**（[#3986](https://github.com/farion1231/cc-switch/issues/3986)，5 👍）。如果你的 CI/CD 会执行提供商切换，请计划继续使用当前 GUI 或自行包装 CCS；服务端版本（#5374）也在被请求中。
- **安全审计已在路线图上。** [#7357](https://github.com/farion1231/cc-switch/issues/7357) 提议扫描上游响应中的提示注入 / 凭据外泄模式 —— 如果你的流量经过中转站 / 共享网关，相关性较高。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-15

## 今日要点

new-api 项目继续其高速的 v1.0.0 发布候选周期（当前已到 rc.37），围绕流式可靠性、渠道扩展与计费准确性方面出现了显著活动。最值得关注的条目是两项未解决的 **Ollama 流式输出缺陷** ——tool_calls 在最后一帧被静默丢弃（#7252，关联 #6807），已在 #7376 和 #7380 中修复；以及一起被报告的 **rc.37 内存回退问题**（小实例上常驻内存从约 75MB 涨到约 1.8GB），可能导致低内存部署 OOM（#7361）。功能方面，新增了 **vLLM 与 SGLang 中继渠道**（#7332），并且一个华为 MaaS 渠道正在评审中（#7239）。

## 发布与破坏性变更

- **过去 24 小时内没有新的标签版本发布。** 通过 issue/PR 追踪到的最新版本：**v1.0.0-rc.37**（issue #7375），rc.36 仍被广泛部署。
- **行为变更风险（rc.37）：** 有用户报告小实例上常驻内存从约 75MB（rc.36）跳升至约 1.8GB（rc.37），正在调查中 ——[#7361](https://github.com/QuantumNous/new-api/issues/7361)。在内存受限主机上分诊完成前，请勿将 rc.37 视作生产可用版本。
- **路由变更：** 新增全局 `NEW_API_ROUTE_PREFIX` 环境变量 / 路由辅助函数，已合并，将原先硬编码的 `/v1`、`/api`、`/pg`、`/mj`、`/oauth` 路径检查替换为感知前缀的辅助函数 ——[#7350](https://github.com/QuantumNous/new-api/pull/7350)。在反向代理后的运维人员在升级后应重新核对挂载点。
- **发布流程诉求：** 社区正在请求明确 v1.0.0 的 GA 标准（当前在 rc.36/rc.37，尚未公布截止条件）——[#7279](https://github.com/QuantumNous/new-api/issues/7279)（👍 8）。

## 新模型与硬件支持

- **vLLM 与 SGLang 自托管渠道**（PR [#7332](https://github.com/QuantumNous/new-api/pull/7332)，作者 `seefs001`）——将中继覆盖扩展到两款最常见的开源推理后端。在过去 24 小时内已关闭/合并。
- **华为 MaaS 渠道**（PR [#7239](https://github.com/QuantumNous/new-api/pull/7239)，开放中）——为一等支持增加华为云 MaaS 端点。
- **Ollama OpenAI 兼容聊天开关**（PR [#7382](https://github.com/QuantumNous/new-api/pull/7382)，开放中）——按渠道切换开关，将 Ollama 以 OpenAI 的聊天 schema 暴露。
- **Vertex AI / GCS 代理**（issue [#7121](https://github.com/QuantumNous/new-api/issues/7121)）——提议为 Vertex 渠道提供受控的 Google Cloud Storage 代理。
- **阿里云百炼任务插件 — HappyHorse 模型** 请求被判定为无效并关闭（[#7375](https://github.com/QuantumNous/new-api/issues/7375)）；HappyHorse 不在该插件的支持范围内。

## 性能与优化

- **内存限流器重写** —— 将原先固定分配的 `make([]int64, 0, maxRequestNum)` 替换为链表 + LRU，以降低基线内存并及时释放槽位。PR [#6807](https://github.com/QuantumNous/new-api/pull/6807) 开放中；对高并发租户有帮助。
- **可能存在的 rc.37 内存回退** —— [#7361](https://github.com/QuantumNous/new-api/issues/7361) 报告约 24 倍的 RSS 增长（75MB → ~1.8GB）。尚无根因 PR；建议在生产中固定到 rc.36 直至解决。
- **OpenAI 流式排空回归修复** —— PR [#7379](https://github.com/QuantumNous/new-api/pull/7379) 恢复了在 rc.31 合并中丢失的 `TextStreamScanner` 生命周期接线，在五个流处理器上重新获得了对客户端断开的优雅处理。
- **自用 token 日志过滤器** —— PR [#7381](https://github.com/QuantumNous/new-api/pull/7381) 将大小写不敏感的 `model_name` 子串过滤提前到计数/分页之前，降低使用历史端点的查询负载。

## 稳定性与回归

**高危**

- **Ollama 流式输出在最后一帧丢弃 tool_calls** —— 当使用 `stream: true` 与 `tools` 时，部分模型（例如 `qwen3-coder`）仅在 `done: true` 帧中发出 tool_calls，而之前的 `ollamaStreamHandler` 忽略了这些帧，导致客户端看到一个空的 `content` 增量以及 `finish_reason: "stop"` 但没有 tool calls。修复已在 [#7376](https://github.com/QuantumNous/new-api/pull/7376)（已关闭）与 [#7380](https://github.com/QuantumNous/new-api/pull/7380)（已关闭）中合入。在 [#7252](https://github.com/QuantumNous/new-api/issues/7252) 跟踪。建议在你的部署 RC 中 cherry-pick / 确认修复已合入。
- **rc.37 内存回退** —— [#7361](https://github.com/QuantumNous/new-api/issues/7361)，原因未确认，小机器上出现 OOM。修复前固定到 rc.36。
- **客户端取消被计为模型失败** —— 对下游 Chat Completions（已转换为 Responses SSE）的断开被无条件记为失败，污染了成功率指标。[#7134](https://github.com/QuantumNous/new-api/issues/7134)。尚无修复 PR。

**中危**

- **DeepSeek reasoning_content 未被回传** —— `deepseek-v4-flash` 在 thinking 模式下报 `400 "reasoning_content" in the thinking mode must be passed back`。[#6939](https://github.com/QuantumNous/new-api/issues/6939)（已关闭，标记需复现）。
- **/v1/responses 流式快照中 `created_at` 是浮点数** —— 三个快照事件被丢弃，`usage` 丢失，计费回退到估算。[#6822](https://github.com/QuantumNous/new-api/issues/6822)（已关闭，含隐含的修复）。
- **分层定价模型日志报告 "dynamic pricing · no match"**，即使计费正确。[#7296](https://github.com/QuantumNous/new-api/issues/7296)（已关闭）。
- **高级自定义路由 + 模型映射同时配置时误路由**。[#6639](https://github.com/QuantumNous/new-api/issues/6639)（开放中）。
- **渠道重试按 ID 顺序而非优先级挑选**。[#7007](https://github.com/QuantumNous/new-api/issues/7007)（已关闭，标记需复现）。
- **DeepSeek CNY/USD 余额同步** —— 当配置 CNY 定价时，余额仍以 USD 计算。[#5063](https://github.com/QuantumNous/new-api/issues/5063) 已关闭；修复在 [#6814](https://github.com/QuantumNous/new-api/pull/6814)。
- **Creem 支付 webhook 尽管配置正确仍返回 403**。[#2650](https://github.com/QuantumNous/new-api/issues/2650)（开放中，陈旧）。

**低危 / UX**

- 表达式模式定价缺少 `weekday()` —— 阻塞了按工作日峰谷定价。[#7011](https://github.com/QuantumNous/new-api/issues/7011)（已关闭）。
- Model Square 24h 成功率条形间距不均。[#7282](https://github.com/QuantumNous/new-api/issues/7282) —— 已在 [#7284](https://github.com/QuantumNous/new-api/pull/7284) 修复。
- 测试渠道对话框：端点类型下拉框自动展开。[#7360](https://github.com/QuantumNous/new-api/issues/7360)（已关闭）。
- 顶部导航在排序菜单打开时水平位移。[#7144](https://github.com/QuantumNous/new-api/issues/7144) —— 已在 [#7145](https://github.com/QuantumNous/new-api/pull/7145) 修复。

## 对应用开发者意味着什么

- **今天就检查你的 Ollama 集成。** 如果你在启用 `tools` 的情况下进行流式输出，并依赖 `tool_calls`（函数调用智能体、代码执行工具），#7252 中的缺陷可能在受影响的模型上悄无声息地破坏你的流程。在将通过 Ollama 的工具调用流程上线前，请确认 #7376/#7380 已合入你部署的镜像。
- **在内存紧张的部署中暂时避开 rc.37。** 在 [#7361](https://github.com/QuantumNous/new-api/issues/7361) 找到根因之前，rc.36 是更安全的目标。
- **支持取消的指标即将到来，但尚未到位。** 如果你对每个渠道的成功率配置告警，请预期来自用户主动断开的误报（[#7134](https://github.com/QuantumNous/new-api/issues/7134)）。在此期间建议按 HTTP 完成状态而非原始成功率进行过滤。
- **新增自托管选项。** vLLM/SGLang 渠道（[#7332](https://github.com/QuantumNous/new-api/pull/7332)）以及 Ollama OpenAI 兼容开关（[#7382](https://github.com/QuantumNous/new-api/pull/7382)）让你可以在一个网关之后统一接入多后端集群，免去每个后端的适配器。
- **华为云用户** 可以评审 [#7239](https://github.com/QuantumNous/new-api/pull/7239) 并提供测试反馈 —— 仍开放中。
- **反向代理运维人员** 应在升级后审计挂载路径 —— [#7350](https://github.com/QuantumNous/new-api/pull/7350) 中的前缀重构改变了基于 `/v1`、`/api`、`/pg`、`/mj`、`/oauth` 路由的既有假设。
- **Responses API 使用者：** 关注 [#6822](https://github.com/QuantumNous/new-api/issues/6822) —— 上游快照中 `created_at` 为浮点数导致 usage 丢失；如果你的计费依赖于 token 数核对，请在目标 RC 上做端到端验证。
- **流程信号：** 对 v1.0.0 GA 标准的请求（[#7279](https://github.com/QuantumNous/new-api/issues/7279)，👍 8）值得点赞支持 —— 如果你依赖该 fork 提供稳定的承诺。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*