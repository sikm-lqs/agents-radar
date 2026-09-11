# AI 基础设施日报 2026-09-12

> 生成时间: 2026-09-11 23:30 UTC | 覆盖项目: 9 个

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

# 跨项目基础设施报告 — 2026-09-12

**范围：** vLLM、SGLang、llama.cpp、Ollama、LiteLLM、Unsloth、Claude Code Router (CCR)、CC Switch、New API

---

## 1. 生态系统概览

整个技术栈正围绕 **DeepSeek-V4.1-Flash** 收敛，把它当作当下的集成目标——它出现在九份摘要中的六份里——但同时也是引擎不稳定的主要来源（vLLM 的 H20/H200 崩溃集群、SGLang 的 FP4-KV 与 MegaMoE 基础工作）。**投机解码已同时成为最主要的性能杠杆和最大的正确性风险**，DFlash2/DSpark/n-gram 相关 bug 横跨 vLLM、SGLang 和 llama.cpp。网关层正在快速专业化（LiteLLM 的 cosign 签名镜像、New API 的计费表达式、CC Switch 的原生 Responses-API 路由），而各服务引擎则暂停发版以消化正确性债务——llama.cpp 是例外，**24 小时内发布了 8 个小版本**。AMD ROCm 适配如今已是跨层协同的工作（RDNA3/4、MI350X/MI355X、gfx950），而 Blackwell SM120 在每一层仍然是正确性雷区。

---

## 2. 活跃度对比

| 项目 | 层级 | Issue（被引用）* | PR（被引用）* | 发布（24h） | 头条信号 |
|---|---|---|---|---|---|
| **vLLM** | 服务引擎 | ~21 | ~12 | ❌ 无 | 批不变性讨论帖 #27433（90+ 条评论）；0.28/0.29 宿主机内存回归 #54237 |
| **SGLang** | 服务引擎 | ~19 | ~18 | ❌ 无 | 统一内存/PD 分离栈（#37506/37418/37507）评审中 |
| **llama.cpp** | 本地运行时/内核 | ~13 | ~15 | ✅ **8**（b10902→b10917） | Blackwell sm_120 IQ 量化误编译 #28784 |
| **Ollama** | 本地分发 | ~22 | ~12 | ❌ 无 | 0.34.0 云端卡死 #18381；工具调用 bug 集群（5 个未解决） |
| **LiteLLM** | LLM 网关 | ~23 | ~15 | ✅ v1.102.0-dev.2 | Cosign 签名；ReDoS #32353 仍开放 |
| **Unsloth** | 微调 | **38（自报）** | **95（自报）** | ❌ 无 | 安全：HF-token 回退 #10809；ROCm Docker #10820 |
| **Claude Code Router** | Agent 侧路由器 | ~1 | ~3 | ❌ 无（v3.0.22） | 别名模型成本 = $0 #1787 |
| **CC Switch** | Agent 侧切换器 | ~17 | ~13 | ✅ v3.20.3 | Kimi → 原生 Responses；`model_mapper`→`model_router` 重命名 #7317 |
| **New API** | 网关/计费 | ~12 | ~12 | ✅ v1.0.0-rc.37 | 新计费表达式系统；nil-map panic 修复 #7323 待合并 |

\* 今日摘要中引用的去重条目——衡量关注度，而非仓库总吞吐。Unsloth 的数字来自其摘要头部的自我报告（38 个 issue / 95 个 PR 更新）。

**解读：** 引擎类项目 issue 密集（正确性债务），llama.cpp 发版最快，网关和本地运行时节奏居中。Unsloth 的 PR 体量是当日单项目之最。

---

## 3. 模型支持竞赛

| 模型 | vLLM | SGLang | llama.cpp | Ollama | 网关/路由器 |
|---|---|---|---|---|---|
| **DeepSeek-V4.1(-Flash)** | Engram DP 分片 #56512、DSpark PP 预填充 #53577、ROCm RFC #56506；崩溃 #56389/#56443 | Hopper FP4 KV #38902、MegaMoE #38700、FP4 索引器 #39046 | deepseek2 MTP KV 修复 | 云端支持 #18360（27👍） | CC Switch 视觉修复 #7286 |
| **GLM-5.3(-Flash)** | ROCm 精度回归 #54924 | **领先：**SM120 验证 #37813 + 3 个修复 PR | 开放的支持请求 #27922 | `glm-5.3:cloud` reasoning 循环 #18193 | CC Switch GLM 5.2 修复（已解决） |
| **Qwen3.5/3.8 系列** | GDN 内核性能提升 #56529/#56534 | gfx950 融合 TP4 #39140 | 工具参数解析 #28742 | 量化 + 工具调用 bug #18297/#17778 | CC Switch 回归 #7221；New API 名称修剪修复 #7201 |
| **其他** | — | VDN-H3 与 LLaDA-Image 扩散 #37903/#37907；SenseNova-U1 #37742 | **Maple 20B-A1B** 三值 MoE #27000 | Gemma-4 / GPT-OSS 加载 | Grok 4.6 适配 #7318；GPT-5.6 Bedrock #40080；gpt-image-2.x 定价 |

**结论：** **vLLM 和 SGLang 领跑前沿模型服务**，平分王座——vLLM 在 DeepSeek-V4.1 多节点横向扩展上投入最深（已合并/rebase 的工作），SGLang 则展现出最广的架构覆盖面（唯一落地扩散后端的项目，外加混合 Mamba/GDN）。llama.cpp 在端侧与罕见量化格式上领先（三值 TQ1_0/TQ2_0）。网关层的“支持”如今大多是预设/定价层面的管道工程，比引擎侧适配晚上几天。

---

## 4. 性能前沿

- **KV-cache 与内存可迁移性（最热领域）：** SGLang 的统一内存池栈把 PD 分离、HiCache 与 CUDA graph 捕获归拢到同一套机制下（#37506/#37418/#37507）；Hopper packed-FP4 KV（#38902）。llama.cpp 的 `--cache-disk`（#20697，👍48，open enhancement 榜首）证实这一需求已延伸到端侧。反向信号：vLLM 的 #54237 宿主机内存耗尽回归表明，内存管理正是发版最容易出问题的地方。
- **投机解码：** 全引擎推进——vLLM 的 DSpark/DFlash2 性能工作被一组正确性问题蒙上阴影（#54928、#53777、#54094）；SGLang 的 DFlash TP>1 带确定性平局裁决（#37069）；llama.cpp 提议全面翻修，采用概率化草稿模型 + 拒绝采样（#27694），但其 n-gram 缓存会污染 slot（#27852，接受率 86%→11%）。
- **量化（FP4 家族）：** NVFP4/MXFP4 遍地开花，但陷阱不少：vLLM 的 `flashinfer_b12x` 会把 W4A16 静默地按 W4A4 运行（#56535，Marlin = 安全路径）；llama.cpp sm_120 nvcc 误编译导致 IQ1/IQ2/IQ3 输出全为乱码（#28784）；SGLang NVFP4 blockscale 热重载（#39141）。
- **分布式服务：** PD 分离与解码上下文并行（SGLang）、面向投机解码的流水线并行预填充（vLLM #53577），以及——尤其值得注意——**规模化下的确定性**（vLLM SP 下的批不变性 #56370；persistent TopK #55122）。
- **内核：** SGLang 恢复的 Mamba2 SSD 自动调优是当日实测最大单项收益（**>10× 预填充**，#39130）；vLLM 的 AWQ GEMM 性能分析与 Qwen3 GDN 融合；llama.cpp 的 Metal 融合表整合、RDNA4 WMMA FA、GCN MMQ 调优。

---

## 5. 层级定位

- **数据中心服务引擎——vLLM、SGLang：** 在 DeepSeek-V4.1、分离部署与投机解码上正面竞争。今天两家都冻结发版、消化正确性债务；差异化在于 vLLM 聚焦横向扩展/可复现性，SGLang 聚焦内存池统一与模型广度。
- **本地运行时——llama.cpp：** 内核/量化的基座。**Ollama 叠在其上**，而且这种依赖清晰可见：Ollama 的 `/api/embed` 端口耗尽（#18392）与 projector OOM（#18396）其实是底层 llama-server 的问题；它的 MLX 流水线 PR（#14969）开始在 Apple silicon 上把它从 GGUF 解耦出来。
- **网关——LiteLLM vs. New API：** LiteLLM = 企业级 LLM 网关（供应链安全、OTel、成本治理）；New API = 以计费/配额为中心的网关（计费表达式、渠道健康度、组织原语 #7312）。CCR 和 CC Switch 是面向 Claude Code/Codex 工作流的轻量 Agent 侧路由——接触面小，但同样在搭 Responses-API 迁移这班车。
- **微调——Unsloth：** 训练层，但越来越多地交付自带运行时（Studio/llama-server 打包），其最严重的 bug（slot 饥饿 #10671、工具调用护栏）如今就出在这里。

---

## 6. 趋势信号

1. **投机解码既是头号加速手段，也是头号静默损坏风险。** 今天有三个项目报告了投机解码输出变化/崩溃。Agent 开发者注意：结构化输出场景请禁用投机解码（vLLM #53777 会破坏 `json_object` + xgrammar），并在启用前后 diff 一下输出。
2. **工具调用是整个生态最薄弱的接缝——每一层都逃不掉。** Ollama 五个未解决 issue、vLLM 静默丢弃 `tool_choice:"required"`（#54808）、LiteLLM 丢弃拼接的工具参数（#40582）、CC Switch 的工具消息顺序问题（#4741）、Unsloth 的审批 slot 饥饿（#10671）。请把工具调用当作不可信输入对待；在应用层校验名称/参数。
3. **Responses-API 迁移浪潮已经开始。** CC Switch v3.20.3 已把所有主要中国厂商迁到原生 Responses；LiteLLM 正在为它对 reasoning 参数做门控。如果你维护 Anthropic↔OpenAI 转换逻辑，现在就该为迁移预留工作量（`model_mapper`→`model_router` 重命名 #7317 就是范本）。
4. **网关安全正在压力下走向成熟。** Cosign 校验、已关闭的 Trivy PyPI 入侵事件、仍开放的 ReDoS 崩溃循环（#32353）、Unsloth 的 HF-token 权限泄露（#10809）。请校验镜像签名；审计网关密钥。
5. **确定性正在成为一等公民需求**——vLLM 那条 90+ 条评论的批不变性讨论帖，以及 Intel XPU 上的 `VLLM_BATCH_INVARIANT` 对齐工作（#55881）表明，可复现推理正从小众需求转变为默认预期。
6. **版本锁定是当下最有效的防御：** vLLM ≤0.27.1（宿主机内存回归）、Ollama 0.33.1（云端卡死）、Windows 上 llama.cpp ≥b10917 / 多模态 ≥b10906、New API 待 PR #7323 的 panic 修复。
7. **成本可观测性在网关层仍未解决**——LiteLLM 未统计 `cached_tokens`（#22984）与 Azure 路由器支出（#40728）、CCR 别名模型计费 $0（#1787）、New API 阶梯计费不一致（#7296）。请与上游账单核对；目前先别相信内部支出看板。
8. **KV-cache 可迁移性正是专为 Agent 而构建**——会话感知路由（#25760）、缓存事件中的 `session_id`（#37482）、HiCache、磁盘 offload。这是 2026 下半年长上下文 Agent 经济账方面最值得跟踪的能力。

---

---

## 各项目详细报告

<details>
<summary><strong>vLLM</strong> — <a href="https://github.com/vllm-project/vllm">vllm-project/vllm</a></summary>

# vLLM Digest — 2026-09-12

## 今日要点

社区继续在**批次不变性 (batch invariance)** 上推进（Issue #27433 的讨论串已超过 90 条评论，成为当日最活跃的追踪帖），同时一条新的 bug 报告 #56370 显示 `VLLM_BATCH_INVARIANT=1` 标志在序列并行 / 异步 TP 下静默失效——这是一项对可复现推理有实质影响 的正确性回归。与此同时，**DeepSeek-V4.1-Flash** 生态正在趋于稳定：两起新的 SM90/H200/H20 崩溃报告（#56389、#56443）在数小时内接连出现；Engram 异步预取 + DP 分片工作（#56512）以及 DSpark 流水线并行 prefill 路径（#53577）正在向合并推进。

## 发布与破坏性变更

*过去 24 小时内无新发布。* 今日无 API 或配置破坏性变更报告。

## 新增模型与硬件支持

- **Intel XPU / MoE + 批次不变性：** #55881 为 XPU 上的 MoE 模型增加了 `VLLM_BATCH_INVARIANT=1` 支持，自动选择 Triton MoE 后端，并切换到确定性的固定秩顺序归约，替代 XCCL all-reduce。对在 Intel GPU 上运行可复现推理的用户而言是一项重要的对等性工作。
- **DeepSeek-V4.1 Engram DP 分片：** #56512（#56357 的重新开启，已 rebase 到 main）引入了对卸载 Engram 查找的异步预取以及对 Engram 嵌入的 DP 分片。这是将 DS-V4.1-Flash 扩展到多节点所必需的。
- **DSpark 流水线并行 prefill：** #53577 将 DSpark 投机解码扩展到在分离式服务中支持 PP 目标，并附带一个对不安全填充图批次 (padded graph batches) 的独立修复。
- **FlashInfer b12x MoE 后端注意事项：** #56535 记录了一个 bug，即 `flashinfer_b12x` 在 `Qwen3.6-35B-A3B-NVFP4` 上静默地将 W4A16 checkpoint 当作 W4A4 运行——在 Blackwell SM12x 上对此类纯权重量化模型启用该后端前需要注意的正确性问题。

## 性能与优化

- **Qwen3.x GDN decode：约 1% 端到端加速**，通过在 MTP decode 期间内联零填充 kernel 实现 (#56529)。为进一步的融合工作打下基础。
- **Qwen3 GDN QKVZ + BA 投影重叠** (#56534，WIP，叠在 #56530 之上)——GDN decode 层中输入投影之间的重叠工作。
- **ROCm DeepSeek-V4.1-Flash 调优 RFC** (#56506) 报告了在 8×MI355X TP4 MXFP4+DSpark MTP 下测得 35.89 out tok/s（concurrent=1），并指出 gfx950 上仍有可观优化空间。
- **AWQ CUDA GEMM 分析** (#55462) 表明该 kernel 在 RTX 3070 Ti 上严重受 L1/内存带宽限制；已发布分析数据以推动后续优化。
- **MRV2 Proton CUDA-graph attribution** (#51084)——新增重放 attribution，使 profiler 能够将重放 kernel 关联回其 capture context，是 MRV2 性能工作中一项有用的基础设施改进。
- **MTP 下的混合 GDN prefix-cache 恢复** (#52244)——修复了一项回归：在 Qwen3.5-122B-A10B 上使用 MTP 投机解码的重放 prompt 始终达不到 prefix cache 能提供的深度（在哈希单元倍数上命中率为零）。文中给出了实测数据。
- **持久化 TopK 确定性** (#55122)——`csrc/libtorch_stable/persistent_topk.cuh`（QSA / 稀疏 indexer 块选择）存在 order-nondeterminism 与缓冲区溢出隐患；此 PR 令其确定性化。

## 稳定性与回归

**高严重度（崩溃 / OOM / 静默正确性问题）：**

- **#54237 — 在 v0.28.0 与 v0.29.0 启动时主机内存耗尽。** 相对 v0.27.1 出现的回归。引擎冻结并消耗全部主机内存。*本批次内尚无修复 PR。* 影响：所有已升级到 0.28.0/0.29.0 的生产部署。建议回退至 0.27.1，或在下次发布前进行分诊。
- **#56389 — `dsv4_topk` Triton 在 8×H20 (SM90) 高并发下触发非法内存访问。** 可通过 `max_num_seqs=256` 缓解。影响 DeepSeek-V4.1-Flash。
- **#56443 — 在 H200 (SM90) 上使用 Marlin MXFP4 MoE 进行 DSpark draft warmup 时，`map_draft_to_target` 触发 CUDA device-side assert。** DeepSeek-V4.1-Flash + DSpark 投机解码。
- **#54928 — DFlash2 在 token 30 处改变 Qwen3.8 的 greedy thinking 输出**，包括 K=1 与 `--enforce-eager`。投机解码正确性 bug。
- **#53777 — DFlash2 + xgrammar 在 `json_object` 文法上确定性地出现 "Failed to advance FSM"**（每次都选到同一个 draft token）。在与新 DFlash2 drafter 配合时会破坏结构化输出（通过 #52816 合入）。
- **#54094 — DFlash2 + YaRN 在相同的 1.04M token prompt 上 prefix-cache 复用率为零**（目标侧可复用约 1.039M token）。
- **#54924 — GLM-5.3 在 ROCm 上精度崩溃（GSM8K 91.6% → 14.9%）**，由 #53155 强制 MRV1 后引起。gfx950 上的量化/正确性回归。
- **#56370 — 序列并行 / 异步 TP 下批次不变性被破坏**（`VLLM_BATCH_INVARIANT=1` + `pass_config.enable_sp`）。在启用 SP 的情况下，该标志的比特级可复现性承诺不再成立。可在 4×RTX PRO 6000 Blackwell PCIe 上复现。

**中严重度：**

- **#45101 — SM120 (RTX PRO 6000 Blackwell) 上的 FP8 MoE 在 Triton `fused_moe` 中崩溃：** `AssertionError: Unsupported lhs dtype fp8e4nv`。`VLLM_MOE_FORCE_MARLIN=1` 未被尊重。
- **#54808 — `qwen3_coder` / `qwen3_xml` parser 在 `/v1/chat/completions` 上静默忽略 `tool_choice: "required"` 以及命名函数式 `tool_choice`**（v0.28.0）。模型表现得就像 `tool_choice="auto"`。
- **#36802 — Tesla T4 上 Triton kernel 触发共享内存 OOM**（需求 81920，硬件上限 65536）。需要对老旧 T4 进行 Triton block-size 调优。
- **#54919 — Qwen3.8-Flash-Next 的长 prefill 工作负载在 2 节点 DGX Spark TP2 上使活跃 decode 饿死 3–7 分钟**。

**已关闭/已解决（仅作信息参考）：**

- **#53504 — 混合 Mamba/GDN 上 MTP 首次重放未命中 prefix cache**——已关闭（很可能由 #52244 修复）。
- **#47654 — `--enable-sleep-mode` 在 `--mm-encoder-tp-mode data` 下泄漏 HBM**——已关闭。
- **#49013 — 自 #45424 以来结构化输出 decode 出现约 2x 回归**——已关闭。
- **#45178 — `VLLM_MEMORY_PROFILER_ESTIMATE_CUDAGRAPHS` 高估内存并降低 KV-cache 空间**——已关闭。
- **#36954 — 使用 MTP + Qwen3.5-122B-GPTQ-Int4 (moe_wna16) 时出现 `KeyError 'layers.0.mlp.experts.w2_weight'`**——已关闭。
- **#42303 — `prompt_token_ids` 在 `EmbedsInput` 流水线中被丢弃**——已关闭。

## 对应用开发者意味着什么

- **升级到 0.28.0 / 0.29.0 前请 pin 或先做测试。** Issue #54237 报告了一项主机内存回归，会在启动时冻结引擎。如果你已经使用了较新版本，请在最大模型上验证启动流程后再上线，或先停留在 0.27.1。
- **在 H20/H200 上的 DeepSeek-V4.1-Flash 部署需要保守的 `max_num_seqs`**（≤256），直到 #56389 与 #56443 解决。在 Blackwell SM12x 上，FlashInfer `b12x` MoE 后端 (#56535) 对 W4A16 checkpoint 不安全——请继续使用 Marlin。
- **v0.28.0 上 Qwen3 的 tool calling 会静默丢弃 `tool_choice: "required"`。** 如果你依赖强制 tool 调用以保证 agent 可靠性，请勿在 0.28.0 中依赖 `qwen3_coder` / `qwen3_xml` parser——在 prompt 中强制约束，或等待修复。
- **批次不变性尚未统一。** 需要可复现推理的用户在 #56370 修复前 *不应* 启用 `pass_config.enable_sp`。在 Intel XPU 上，#55881 带来了对等性，但其底层原语（Triton MoE + 固定秩归约）较 CUDA 路径更新——需留意细微漂移。
- **DFlash2 投机解码与结构化输出在 `json_object` 文法下已损坏** (#53777)。如果你在最近合入的 DFlash2 drafter 基础上使用 xgrammar，请关闭投机解码或切换到 `json_schema` 模式。
- **MTP 下的混合 Mamba/GDN prefix-cache 恢复** (#52244) 是对 Qwen3.5-122B-A10B 重放场景中正确性与性能的一项实质性修复；长上下文 agent 可期待合入 main 后的改进。
- **安全/运维提示：** #56537 为 OpenAI 入口新增了一个 opt-in 的 `X-Trust` HMAC 中间件，用于标注（而非拦截）人/机流量——多租户网关值得评估。

---

*来源：[vllm-project/vllm issues](https://github.com/vllm-project/vllm/issues) 与 [pull requests](https://github.com/vllm-project/vllm/pulls)，更新于 2026-09-11 → 2026-09-12.*

</details>

<details>
<summary><strong>SGLang</strong> — <a href="https://github.com/sgl-project/sglang">sgl-project/sglang</a></summary>

# SGLang 摘要 — 2026-09-12

## 今日要点

今日的 PR 活动围绕三条主线展开：GLM-5.3-Flash 集成加固（解码上下文并行恢复、HiCache DSA 索引保留、Mamba checkpoint 跟踪，对应 #39117/#38212/#37818），一组堆叠式变更在 `--enable-unified-memory` 路径下统一 PD 分离、HiCache 与 CUDA Graph 捕获（#37506/#37418/#37507），以及围绕 DeepSeek-V4.1 的持续准备，包括 Hopper FP4 KV 存储（#38902）与 MegaMoE 共享→稀疏专家融合（#38700）。AMD ROCm 在消费级（RDNA3/RDNA4 跟踪）与数据中心（MI350X/MI355X cookbook 修复）两条线路上均持续推进。

## 发布与破坏性变更

过去 24 小时内无新发布。

## 新增模型与硬件支持

- **GLM-5.3-Flash on SM120（RTX PRO 6000 Blackwell）** — 适配跟踪 [#37813](https://github.com/sgl-project/sglang/issues/37813) 与恢复解码 CP 的实时修复 PR [#39117](https://github.com/sgl-project/sglang/pull/39117)；HiCache 正确性工作 [#38212](https://github.com/sgl-project/sglang/pull/38212)。
- **GLM-5.3（完整版）** — 在 disagg 解码 + DP-attention + 投机解码下崩溃，已报告 [#39072](https://github.com/sgl-project/sglang/issues/39072)。
- **SenseNova-U1 / U1.5** — 已开启功能与性能跟踪 issue [#37742](https://github.com/sgl-project/sglang/issues/37742)。
- **DeepSeek-V4 / V3.2 DSML 工具调用解析器** — 出现多余的 `arguments`/`input` 包装 bug [#38924](https://github.com/sgl-project/sglang/issues/38924)。
- **DeepSeek-V4.1（C1/C2）** — Hopper packed-FP4 主 KV 缓存提案 [#38902](https://github.com/sgl-project/sglang/issues/38902)，与 FP4 KV 路线图 [#29913](https://github.com/sgl-project/sglang/issues/29913) 互补。
- **DFlash V2** — TP>1 Domino 推出，配套 CUDA Graph + eager 回退 [#37069](https://github.com/sgl-project/sglang/pull/37069)；Mamba-state checkpoint 跟踪 [#37818](https://github.com/sgl-project/sglang/pull/37818)。
- **Diffusion：VDN-H3** — 混合窗口-softmax + Video Delta 线性注意力 MiniMax-H3，8-NFE DMD2 蒸馏，`hybrid_window_attn_h3` 后端 [#37903](https://github.com/sgl-project/sglang/pull/37903)；目标平台为 8x B200。
- **Diffusion：LLaDA-Image / LLaDA-Image-Turbo（含 FP8）** — T2I + 图像编辑 + 序列并行 [#37907](https://github.com/sgl-project/sglang/pull/37907)。
- **AMD 消费级 Radeon RDNA3/RDNA4**（`gfx1100/1101/1200/1201`）— 官方支持跟踪与启用计划 [#30599](https://github.com/sgl-project/sglang/issues/30599)。
- **AMD Qwen3-Next on gfx950** — 融合 TP4 all-reduce + Gemma RMSNorm + per-group FP8 量化 [#39140](https://github.com/sgl-project/sglang/pull/39140)。

## 性能与优化

- **Mamba2 SSD Triton kernels** — 在被静默限制为 `BLOCK_SIZE_*=16` 后恢复了 autotune；作者报告未恢复时 **prefill 损失超过 10×** [#39130](https://github.com/sgl-project/sglang/pull/39130)。合并后将带来高影响力收益。
- **Hopper FP4 indexer** — 跳过对不可见 tile 的 FP4 解码与查询加载及两次点积 [#39046](https://github.com/sgl-project/sglang/pull/39046)；面向来自 #38798 的 DS-V4.1 indexer。
- **DSV4 DeepGEMM MegaMoE** — 融合共享 → 稀疏专家路径 [#38700](https://github.com/sgl-project/sglang/issues/38700)。
- **统一内存池栈**（自底向上评审：#37507 → #37418 → #37506）— 跨所有池形态的 PD 分离、prefill CUDA Graph 捕获，以及带 SWA 行绑定 + Mamba 槽位转换的 HiCache load-back [#37506](https://github.com/sgl-project/sglang/pull/37506)、[#37418](https://github.com/sgl-project/sglang/pull/37418)、[#37507](https://github.com/sgl-project/sglang/pull/37507)、[#38521](https://github.com/sgl-project/sglang/pull/38521)。
- **DFlash TP>1 推出** — 小 logits 全词表 TP gather，确定性全局并列打破 [#37069](https://github.com/sgl-project/sglang/pull/37069)。
- **sglang-miles NVFP4 blockscale** — 在线权重重载时保持输入设备上的 padding，避免 GPU→CPU→GPU 来回传输 [#39141](https://github.com/sgl-project/sglang/pull/39141)、[#39142](https://github.com/sgl-project/sglang/pull/39142)。

## 稳定性与回归

- **严重 — GLM-5.3 disagg 解码崩溃**，复现路径为 DP-attention + spec decode [#39072](https://github.com/sgl-project/sglang/issues/39072)。尚无修复 PR；可能与正在进行的解码 CP 恢复 [#39117](https://github.com/sgl-project/sglang/pull/39117) 有关。
- **严重 — HiCache 在恢复场景下出现损坏**：DSA 索引 buffer 被省略；不同后缀可能共享压缩索引行；循环状态保存范围超出所属前缀 [#38212](https://github.com/sgl-project/sglang/pull/38212) 针对该问题；跟踪 [#37813](https://github.com/sgl-project/sglang/issues/37813)。
- **严重 — DFlash Mamba-state checkpoint 漏存**，发生条件为接受的 verify token 跨越跟踪边界 [#37817](https://github.com/sgl-project/sglang/issues/37817) → 修复 [#37818](https://github.com/sgl-project/sglang/pull/37818)。
- **严重 — 三池 HiCache load-back 在 Inkling 上失效**：SWA 行未绑定，Mamba 槽位未转换 [#38521](https://github.com/sgl-project/sglang/pull/38521) 修复。
- **严重 — Encoder-decoder KV 缓存双重释放**，当 `page_size > 1` 时共享边界页被重复释放 [#38840](https://github.com/sgl-project/sglang/issues/38840)。
- **中等 — LoRA 流式 upsert 在刷新完成前发布**：原因是 `non_blocking=True` 拷贝未同步即返回；修复见 [#39143](https://github.com/sgl-project/sglang/pull/39143)。
- **中等 — 生成健康检查扰动 DP 路由状态**，并压垮长 prefill 吞吐 [#35241](https://github.com/sgl-project/sglang/issues/35241)。
- **中等 — `flash_attn_with_kvcache` 在 sm_89 上声明但无 sm_89 cubin 出包**；`ver` 参数被忽略 [#38980](https://github.com/sgl-project/sglang/issues/38980)。
- **中等 — OpenAI `include_reasoning=false` 在 `/v1/responses`、`/v1/chat/completions`、`/v1/completions` 仍会输出 reasoning** [#39103](https://github.com/sgl-project/sglang/issues/39103)。
- **中等 — JSON-Schema DFA 状态爆炸 / CPU 卡死**，出现在深度嵌套或递归的不可信 schema 上 [#39125](https://github.com/sgl-project/sglang/issues/39125)。
- **中等 — TRTLLM MLA 目标校验缺失**，未覆盖 `forward_extend` 中的融合 FP8 KV/Q 准备 [#39107](https://github.com/sgl-project/sglang/issues/39107)。
- **中等 — DeepSeek V4/V3.2 DSML 解析器**将参数包裹在多余顶层 key 中 [#38924](https://github.com/sgl-project/sglang/issues/38924)。
- **中等 — H20 8 卡无法启动 Qwen3.8-Flash-Next-FP8** [#38793](https://github.com/sgl-project/sglang/issues/38793)（已关闭；需在重新构建后验证）。
- **轻微 — Kimi-K3 MI350X/MI355X cookbook** 在 DSPARK HIP graph capture 阶段中止；cookbook 镜像已在 [#39029](https://github.com/sgl-project/sglang/pull/39029) 以实测单元数重新固定。
- **CI 跟踪** [#17050](https://github.com/sgl-project/sglang/issues/17050) — 截至 2026-09-11 22:34 UTC，1 个失败、6 个 flaky、995 个近期修复。

## 对应用开发者的意义

- **如果你在跑 agent 类负载**，应跟踪当前在做的 PD 分离 + HiCache + 统一内存栈 [#37506](https://github.com/sgl-project/sglang/pull/37506)——一旦落地，长上下文 agent 循环有望减少跨 rank KV 来回，并获得更清晰的 host-pool 语义。session-aware 路由器工作 [#25760](https://github.com/sgl-project/sglang/issues/25760) 与 `BlockStored` 事件中的 `session_id` 元数据 [#37482](https://github.com/sgl-project/sglang/pull/37482) 是外部 KV 路由的前置条件。
- **如果你在用 GLM-5.3-Flash**，在 SM120 上预计会有不稳定落地——建议固定到同时包含 DFlash Mamba 修复 [#37818](https://github.com/sgl-project/sglang/pull/37818) 与 DSA-index HiCache 修复 [#38212](https://github.com/sgl-project/sglang/pull/38212) 的 commit；解码 CP 恢复 [#39117](https://github.com/sgl-project/sglang/pull/39117) 还在路上。
- **如果你在使用 LoRA 热加载**，请等待 [#39143](https://github.com/sgl-project/sglang/pull/39143) 合入——否则流式 upsert 之后的采样 token 可能仍使用旧权重。
- **如果你在接入 DeepSeek V4 / V3.2 的工具调用**，请校验解析器输出；已报告多余的顶层 `arguments` 包装 [#38924](https://github.com/sgl-project/sglang/issues/38924)。
- **如果你在做 constrained decoding**，请加固你的 schema 校验器——当前深度嵌套的 JSON Schema 可使编译器 DoS [#39125](https://github.com/sgl-project/sglang/issues/39125)。建议在网关侧设置深度上限。
- **如果你在使用 RDNA3/RDNA4 消费级 Radeon 或 MI350X/MI355X**，预计很快将迎来正式支持；请跟踪 [#30599](https://github.com/sgl-project/sglang/issues/30599) 与 [#39029](https://github.com/sgl-project/sglang/pull/39029)。
- **如果你在跑 diffusion 负载**，VDN-H3 与 LLaDA-Image（含 FP8）正以原生后端形式落地 [#37903](https://github.com/sgl-project/sglang/pull/37903)、[#37907](https://github.com/sgl-project/sglang/pull/37907)。

</details>

<details>
<summary><strong>llama.cpp</strong> — <a href="https://github.com/ggml-org/llama.cpp">ggml-org/llama.cpp</a></summary>

# llama.cpp 简报 — 2026-09-12

## 今日要点
今天是一个覆盖面广、低摩擦的维护日：共发布了八个点版本，涉及 MSVC 构建卫生、图像 token 之后的投机解码、Metal/Vulkan 内核修复，以及 RDNA4（gfx1201）上的 HIP/ROCm Flash Attention 调优。应用层面，投机解码的保真度工作仍在继续（#27694、server 子进程重构 #28555），同时还有 SYCL graph capture（#28725）和 JSON schema 工具（#28736）。

## 发布与破坏性变更
过去 24 小时内落地了八个构建（b10902 → b10917）。未报告 ABI/API 破坏；值得注意的行为变更如下：
- [b10906](https://github.com/ggml-org/llama.cpp/releases) — `llama-server` 现在在图像之后向 drafter 传入实际位置（而非 token 数量），修复了多模态之后的投机行为。影响所有 drafter，不只是 DFlash。
- [b10917](https://github.com/ggml-org/llama.cpp/releases) — 在 MSVC 下为 `llama-server` 跳过 PCH。直接解决 [#28758](https://github.com/ggml-org/llama.cpp/issues/28758) 中报告的 LNK2001 链接失败（当日已关闭）。
- [b10905](https://github.com/ggml-org/llama.cpp/releases) — HIP：在 RDNA4 上为 head size 256 启用 WMMA Flash Attention，并重新调优 stream-K 与整 tile 网格之间的取舍。
- [b10902](https://github.com/ggml-org/llama.cpp/releases) — OpenCL：新增 A8 Q4_0 矩阵乘二进制内核支持。

## 新模型与硬件支持
- [PR #27000](https://github.com/ggml-org/llama.cpp/pull/27000) — **Maple 20B-A1B**（DeepGrove 三元 MoE：24 层、256 专家/激活 8、SWA-512 + global 3:1）通过 TQ1_0/TQ2_0 加入。合并阻塞点似乎在于缺少 TQ1_0/TQ2_0 的 ARM i8mm 路径，相关追踪见 [#27276](https://github.com/ggml-org/llama.cpp/issues/27276)。
- [PR #27841](https://github.com/ggml-org/llama.cpp/pull/27841) — 为 AMD GCN（wave64，nthreads 512）添加按架构的 MMQ 配置，使 AMD GCN 不再回退到 RDNA2。
- [PR #28784](https://github.com/ggml-org/llama.cpp/pull/28784) — **Blackwell（sm_120）**正确性修复：IQ1_S / IQ2_S / IQ3_S 因 nvcc 13.2 字节提取错误编译而产生乱码。若你在 RTX 50 系列上发布仅量化 gguf，这一点至关重要。
- [PR #28779](https://github.com/ggml-org/llama.cpp/pull/28779) — `nemotron-h` MTP 层 SIGFPE 保护（`n_ff_exp` 回退路径上的零除数）。
- [b10907](https://github.com/ggml-org/llama.cpp/releases) — 为 `deepseek2`、`glm4moe`、`cohere2moe` 中的 MTP 修正 KV-cache 分配（#28630）。

## 性能与优化
- [b10909](https://github.com/ggml-org/llama.cpp/releases) — Metal 融合模式被统一到 `ggml-metal-fuse.cpp` 中的单一表格（#28164）。图优化器代码路径更整洁；预计启动延迟会有小幅下降。
- [b10908](https://github.com/ggml-org/llama.cpp/releases) — Metal `iq1_s/iq1_m/iq*` 的 `mul_mv` 内核在 `ne00 < 1024` 时不再留有空闲线程（#28692）。
- [b10903](https://github.com/ggml-org/llama.cpp/releases) — Vulkan `argsort` 数据竞争与越界修复（#28705）。CI 此前会偶发在此处翻车。
- [PR #28785](https://github.com/ggml-org/llama.cpp/pull/28785) — 当图为纯 view（full-GPU offload 的常见情况）时跳过 `ggml-cpu` 线程池。PR 报告称解码延迟有明显下降。
- [PR #28782](https://github.com/ggml-org/llama.cpp/pull/28782) — 为 buffer-init 的 `cudaMemset` 引入按线程 stream，以避免与并行的 HIP/CUDA graph capture 冲突。
- [PR #27986](https://github.com/ggml-org/llama.cpp/pull/27986) — **镜像 NUMA 策略**（在每个节点上复制权重）；声称解码吞吐可与 first-touch `--numa distribute` 持平，但没有收敛延迟。
- [PR #27841](https://github.com/ggml-org/llama.cpp/pull/27841) — 上述 AMD GCN MMQ 配置有望在较老的 Instinct 卡上带来吞吐提升。

## 稳定性与回归
今日或昨日报告，按严重程度排序：
1. **严重** — [#28758](https://github.com/ggml-org/llama.cpp/issues/28758) Windows/MSVC 下 PCH 变更后 `llama-server` 链接失败（LNK2001）— **已在 b10917 修复**。
2. **高** — [#28784](https://github.com/ggml-org/llama.cpp/pull/28784) Blackwell sm_120 上 IQ1_S/IQ2_S/IQ3_S 输出乱码 — PR 已开，尚未合入发布。
3. **高** — [#28752](https://github.com/ggml-org/llama.cpp/issues/28752) b10780 之后 Vulkan/RDNA3 出现严重的 prompt-processing 回归 — **尚无修复**。
4. **高** — [#28726](https://github.com/ggml-org/llama.cpp/issues/28726) Core Ultra 7 265K（AVX-512 路径）上 OpenVINO 后端 SIGILL — 尚无修复。
5. **中** — [#28742](https://github.com/ggml-org/llama.cpp/pull/28742) Qwen3-Coder 复杂参数解析改进（关联 #26833）。
6. **中** — [#28660](https://github.com/ggml-org/llama.cpp/issues/28660) SYCL oneDNN scratchpad 在 Intel Arc Pro B70 上破坏 LIFO 池 — 修复待发。
7. **中** — [#28648](https://github.com/ggml-org/llama.cpp/issues/28648) Windows 上 Intel Arc 140V 的 Vulkan 输出乱码，与 batch 设置相关。
8. **中** — [#28633](https://github.com/ggml-org/llama.cpp/issues/28633) CUDA 在 4-bit KV cache（`q4_0/q4_1`）下静默回退到 CPU，且无日志 — 约 30 倍 prefill 减速，极难诊断。
9. **中** — [#28630 / b10907](https://github.com/ggml-org/llama.cpp/issues/28626) MoE 架构下 MTP context 的 KV-cache 误分配 — **已在 b10907 修复**。
10. **低-中** — [#27852](https://github.com/ggml-org/llama.cpp/issues/27852) n-gram 投机解码会保留陈旧的 slot 上下文（接受率 86% → 11%）。

长期未结、今日有更新的：[#16393](https://github.com/ggml-org/llama.cpp/issues/16393) 缓存模型管理（👍21）、[#20697](https://github.com/ggml-org/llama.cpp/issues/20697) `--cache-disk` context 卸载（👍48，得票最高的开放增强）、[#23704](https://github.com/ggml-org/llama.cpp/issues/23704) router-mode 多 preset per model、[#27922](https://github.com/ggml-org/llama.cpp/issues/27922) GLM5.3（flash）支持。

## 对应用开发者的意义
- **如果你发布 Windows 构建，请 rebase 到 b10917** — 来自 #28091 的 MSVC 链接失败在此版本已解决。任何更早版本在 MSVC 下都无法链接 `llama-server`。
- **多模态流水线应固定 ≥ b10906** — 投机解码在图像 token 之后现已正确。若你使用 DFlash 或任何自定义 drafter 并喂入图像，旧构建会静默破坏位置。
- **Blackwell（RTX 50 系列）上的 IQ1/IQ2/IQ3 用户** 必须在 #28784 合入后拉取 — 当前 `master` 对这些量化会产生错误输出。
- **投机解码即将大改。** [#27694](https://github.com/ggml-org/llama.cpp/pull/27694) 提出概率性 drafter + 拒绝采样（不再"draft 采样 → 丢弃 → 取 top-k"）；[#27852](https://github.com/ggml-org/llama.cpp/issues/27852) 显示 n-gram 缓存当前会污染跨请求的 slot 上下文。若你依赖投机来优化 TTFT，值得持续关注。
- **服务端表面积持续加固。** [#28736](https://github.com/ggml-org/llama.cpp/pull/28736) 通过引入正式的内部 `common_schema` 表示来清理 JSON-schema → grammar；[#28053](https://github.com/ggml-org/llama.cpp/pull/28053) 为 `llama-server` 添加 `-sysf`；[#28787](https://github.com/ggml-org/llama.cpp/pull/28787) 将 cpp-httplib 升级到 0.56.0。
- **AMD 路径正受到认真关注。** RDNA4 FA 调优（b10905）、GCN MMQ 配置（#27841）、按线程的 HIP memset（#28782）。若你在 AMD Instinct 或 RDNA 上部署，未来几周预计会有持续的吞吐提升。
- **关注呼声最高的开放特性。** `--cache-disk`（#20697）与 router-mode 多 preset（#23704）是最受期待的开放增强 — 二者都能直接解锁更大上下文的 agent 部署与多租户服务。

</details>

<details>
<summary><strong>Ollama</strong> — <a href="https://github.com/ollama/ollama">ollama/ollama</a></summary>

# Ollama 日报 — 2026-09-12

## 今日要点
过去 24 小时没有发布新版本，但一个值得关注的回归问题群正在浮现：多名用户报告 **0.34.0 上云端模型不稳定**(请求在约 45 分钟后卡死)以及**各版本普遍出现模型加载变慢**，同时，一个重要新 bug 浮出水面:`/api/embed` 在 Windows 上耗尽回环端口。积极的一面是，若干工具调用与投影器卸载相关的修复(gemma3n CPU 防护、ROCm APU 投影器、工具 `args` 解析器)已合并或已排队，而一个大型架构 PR(`#16590`,manifest 列表存储)正在推进。

## 发布与破坏性变更
- 过去 24 小时内没有新版本发布。
- 开放中的 PR [`#18393`](https://github.com/ollama/ollama/pull/18393) 将 Ollama CLI 的内置 agent 回退到旧版聊天界面——若合并，将是一次值得注意的 UX 变更。
- 开放中的 PR [`#18383`](https://github.com/ollama/ollama/pull/18383) 将 Codex Settings 推荐限定为仅在集成使用时展示，与 Claude 现有的资格检查保持一致。

## 新模型与硬件支持
- **云端/模型请求：**DeepSeek-V4.1-Flash 云端支持(已关闭,[`#18360`](https://github.com/ollama/ollama/issues/18360) — 27 👍),以及要求提供可下载文件的后续请求([`#18379`](https://github.com/ollama/ollama/issues/18379))。腾讯 Hy4 Preview 模型请求([`#18287`](https://github.com/ollama/ollama/issues/18287))。
- **量化：**新 bug 报告：Qwen3.8-27B-GSQ-RCO-GGUF 的 `IQ3_S` 量化版本返回空内容([`#18297`](https://github.com/ollama/ollama/issues/18297))。功能冒烟测试套件显示 `qwen2.5-coder:3b-instruct` 在 q2_K/q3_K_S/q3_K_M/q3_K_L 下不可用，而同系列其他量化版本均通过([`#18252`](https://github.com/ollama/ollama/issues/18252))。
- **AMD ROCm:**RX 9060 XT(gfx1200)报 `Could not load "TensileLibrary_lazy_gfx1200.dat"` 错误([`#17782`](https://github.com/ollama/ollama/issues/17782))。针对性 PR [`#16767`](https://github.com/ollama/ollama/pull/16767) 重新启用 ROCm APU 的多模态投影器卸载(共享内存启发式判断出现误报)。
- **ARM/ppc64le:**长期悬而未决的 [`#796`](https://github.com/ollama/ollama/issues/796) 被顶起；维护者未作出承诺。
- **Jetson:**Gemma 4 E4B 的多模态投影器在 Jetson Orin Nano 8GB 上导致宿主机 OOM([`#18396`](https://github.com/ollama/ollama/issues/18396))。
- **后端：**[`#14969`](https://github.com/ollama/ollama/pull/14969) 新增服务端 MLX 创建流水线(safetensors 导入)，副作用是移除了 GGUF 转换——对 Apple 芯片工作流而言是实质性变更。

## 性能与优化
- **云端卡死修复(进行中)：**[`#18382`](https://github.com/ollama/ollama/pull/18382) 为云端代理加入有界的 connect + TTFB 超时，解决 [`#18381`](https://github.com/ollama/ollama/issues/18381) 中 0.34.0 上请求无限挂起的问题。
- **gemma3n 投影器防护(意图已合并)：**[`#18376`](https://github.com/ollama/ollama/pull/18376)(已关闭)——Gemma3n 的 MobileNetV5 投影器在 CPU 上会静默损坏图像嵌入；该修复让它避开 CPU。也与 [`#18396`](https://github.com/ollama/ollama/issues/18396) 中的 Jetson OOM 相关。
- **模型加载回归：**[`#18373`](https://github.com/ollama/ollama/issues/18373) 报告 GPT-OSS:120b 在 0.30+ 上的加载明显慢于 0.23.4。相关:[`#16501`](https://github.com/ollama/ollama/issues/16501)——Strix Halo 上的 Qwen3.5 122B 从 61s(0.24)→ 116s(0.30.4),PP 提速 40%。
- **Manifest 列表：**[`#16590`](https://github.com/ollama/ollama/pull/16590) 为同一 tag 下按 runner 区分的 manifest 打下基础，并通过惰性本地兼容补丁保留 v1 锚点。这是为未来异构后端铺设的底层管线。
- **/api/embed 吞吐：**[`#18392`](https://github.com/ollama/ollama/issues/18392)——在 Windows 上使用 bge-m3:567m-fp16 达到约 55 docs/s 时，llama-server 的 HTTP 客户端(keep-alive 被禁用)耗尽临时回环端口(HTTP 400,`Only one usage of each socket address`)。

## 稳定性与回归(按严重程度排序)

| 严重程度 | 问题 | 备注 |
|---|---|---|
| 🔴 高 | [`#18381`](https://github.com/ollama/ollama/issues/18381) — 云端模型在 0.34.0 上约 45 分钟后卡死；0.33.1 正常 | 修复 PR [`#18382`](https://github.com/ollama/ollama/pull/18382) 开放中 |
| 🔴 高 | [`#17778`](https://github.com/ollama/ollama/issues/17778) — qwen3.8 工具调用循环中出现 `ResponseError: no user query found in messages (500)` | 28 条评论，25 👍;尚无修复 |
| 🔴 高 | [`#18392`](https://github.com/ollama/ollama/issues/18392) — `/api/embed` 在 Windows 上耗尽回环端口(keep-alive 被禁用) | 尚无修复；影响批量嵌入工作负载 |
| 🟠 中 | [`#18373`](https://github.com/ollama/ollama/issues/18373) — 0.30+ 上的模型加载回归 | 尚无修复 |
| 🟠 中 | [`#18346`](https://github.com/ollama/ollama/issues/18346) — Anthropic `/v1/messages` 在复杂 schema 下将工具调用退化为字面文本 | 尚无修复 |
| 🟠 中 | [`#17274`](https://github.com/ollama/ollama/issues/17274) — 解析失败时工具调用输出被静默丢弃 | 尚无修复 |
| 🟠 中 | [`#18193`](https://github.com/ollama/ollama/issues/18193) — `glm-5.3:cloud` 无休止推理导致任务中止 | 尚无修复 |
| 🟡 低 | [`#18390`](https://github.com/ollama/ollama/issues/18390) — gemma4 工具调用键名含空格时被丢弃为空 | 修复 PR [`#18388`](https://github.com/ollama/ollama/pull/18388) 开放中(解析 `args` 字段) |
| 🟡 低 | [`#18357`](https://github.com/ollama/ollama/issues/18357) — Gemma3n 工具模型通过 `/v1` 返回空 `tool_calls` | 与已合并 PR `#18376` 相关 |
| 🟡 低 | [`#18387`](https://github.com/ollama/ollama/issues/18387) — TOC 输入中 `>10` 个省略号导致 `cancel task` | 尚无修复 |
| 🟢 已关闭 | [`#18344`](https://github.com/ollama/ollama/issues/18344) — `ollama serve` 中的 FD 泄漏 | **由报告者撤回**(lsof 查看范围导致的误报) |
| 🟢 已关闭 | [`#17087`](https://github.com/ollama/ollama/pull/17087) — 无效布尔环境变量被错误地默认为 `true` | **已修复** |
| 🟢 已关闭 | [`#17528`](https://github.com/ollama/ollama/pull/17528) — 加载时的侧边栏展开动画 | **已修复** |

此外:`install.sh` 正在加固([`#12478`](https://github.com/ollama/ollama/issues/12478) — `curl --retry` 提案)，Windows 卸载程序现在会移除用户 PATH 条目([`#18386`](https://github.com/ollama/ollama/pull/18386))。

## 这对应用开发者意味着什么

- **如果你依赖云端路由，请锁定 0.33.1。**0.34.0 的云端代理卡死问题在约 45 分钟的会话后出现且无法恢复；如果你通过 Ollama 作为网关承载 `*:cloud` 流量，请暂缓升级或密切关注 [`#18382`](https://github.com/ollama/ollama/pull/18382)。
- **工具调用在各模型间都很脆弱。**五个不同的开放 issue(`#17274`、`#14601`、`#18346`、`#18390`、`#18357`)描述了不同的失败模式——静默丢弃、schema 畸变、解析器失败、Anthropic 兼容层破坏。请将工具调用结果视为不可信；执行前先校验工具名称/参数。进行中的 PR [`#18388`](https://github.com/ollama/ollama/pull/18388)(解析器)和 [`#18391`](https://github.com/ollama/ollama/pull/18391)(模板 JSON 渲染)是最具体的近期修复。
- **在 Windows 上做批量嵌入有风险。**在 [`#18392`](https://github.com/ollama/ollama/issues/18392) 得到解决之前，请在 HTTP 客户端禁用 keep-alive,或改在 Linux/macOS 上运行；底层修复大概率应落在 llama-server 的 HTTP 客户端内部。
- **AMD 用户：升级前请先确认 gfx1200 支持**——RX 9060 XT 16GB 会在运行中途遭遇 `TensileLibrary_lazy_gfx1200.dat` 加载失败([`#17782`](https://github.com/ollama/ollama/issues/17782))。
- **MLX 路线正在转变。**如果你为 Apple 芯片构建 Modelfile,[`#14969`](https://github.com/ollama/ollama/pull/14969) 将使你从 GGUF 转换转向通过服务端 MLX 直接使用 safetensors——现在就开始针对该分支测试导入。
- **响应中的 manifest 摘要。**如果你按模型名称缓存评估结果，[`#18394`](https://github.com/ollama/ollama/issues/18394) 提议将实际服务的 manifest 摘要加入 `/api/chat`——如果你观察到请求之间 tag 出现摇摆，这一点很重要。
- **CLI UX 变更即将到来。**[`#18393`](https://github.com/ollama/ollama/pull/18393) 将回退内置 CLI agent;如果你的脚本依赖 `ollama` 交互模式，请审查你的预期。

</details>

<details>
<summary><strong>LiteLLM</strong> — <a href="https://github.com/BerriAI/litellm">BerriAI/litellm</a></summary>

# LiteLLM Digest — 2026-09-12

## 今日要点

开发节奏向 **v1.102.0-dev.2** 推进，cosign 签名的 Docker 镜像成为新的分发规范；同时长期悬而未决的 **Trivy 供应链入侵事件**（#24518）已正式收尾——受影响的 PyPI 包（v1.82.7/v1.82.8）已被移除并替换。更迫切的运维信号是 **`secret_redaction` 中的 ReDoS 漏洞**（#32353），它会导致代理进入崩溃循环，以及**预算重置中的 PostgreSQL 绑定变量溢出**（#40564），目前已发布修复。

## 版本发布与破坏性变更

- **v1.102.0-dev.2** — 开发分支版本，通过 [cosign](https://docs.sigstore.dev/cosign/overview/) 实现正式的 Docker 镜像签名验证。所有镜像均使用提交 [`0112e53`](https://github.com/BerriAI/litellm/commit/0112e53046018d726492c814b3644b7d376029d0) 中引入的密钥进行签名。运维人员应刷新镜像拉取策略以强制执行签名校验。（[发布说明](https://github.com/BerriAI/litellm/releases/tag/v1.102.0-dev.2)）
- **Trivy 供应链事件已结案**（#24518）：PyPI 上的 v1.82.7 与 v1.82.8 曾被植入恶意代码；所有受影响产物均已删除，当前发布版本已清理干净。完整时间线参见 [Security Townhall 公告](https://docs.litellm.ai/blog/security-townhall-updates)。（136 👍，119 条评论）

## 新增模型与硬件支持

- **OpenAI 价格同步——83 个模型，新增 2 个**（[#40797](https://github.com/BerriAI/litellm/pull/40797)）。刷新 `model_prices_and_context_window.json` 及备份文件，涵盖 `babbage-002` 批处理定价与修正后的数据来源。
- **TinyFish Agent 提供商**作为 A2A 完成桥接被加入，支持按步骤消费追踪（[#40796](https://github.com/BerriAI/litellm/pull/40796)）——为目标驱动的 Web 自动化 Agent 调用提供一等计费支持。
- **OCR 提供商扩展（Rust 原生门面）**：Azure Document Intelligence（[#40534](https://github.com/BerriAI/litellm/pull/40534)）、Azure Mistral 原生鉴权（[#40502](https://github.com/BerriAI/litellm/pull/40502)）、Reducto legacy + v3（[#40535](https://github.com/BerriAI/litellm/pull/40535)）、Vertex Mistral（[#40507](https://github.com/BerriAI/litellm/pull/40507)）、Vertex DeepSeek（[#40509](https://github.com/BerriAI/litellm/pull/40509)）。所有改动合并进 `litellm_internal_staging` 上的 7-PR 栈 @ `8a4fae0e17`。
- **Bedrock Mantle / OpenAI Responses 路径**现在正确将 gpt-5.x 上的 Codex CLI 的 `reasoning.summary` 约束为 `auto`（[#40798](https://github.com/BerriAI/litellm/pull/40798)）。
- 待办的开放提供商请求：**Kimi-K2.6 on Together AI** 仍待加入 `model_prices_and_context_window*.json`（[#27450](https://github.com/BerriAI/litellm/issues/27450)）。

## 性能与优化

- **OTel v2：span 属性上限**（[#40562](https://github.com/BerriAI/litellm/pull/40562)）——此前 OpenInference 消息属性无界，60 轮对话就可能将一个 span 推到 128 属性上限之外，进而将 `model`、`tokens`、`cost`、`finish_reason` 等驱逐。现在按 span 全局强制设置上限。
- **OTel v2：Langfuse trace 命名恢复**（[#40793](https://github.com/BerriAI/litellm/pull/40793)）——优先读取 `langfuse_trace_name` 请求头，再回退到 `metadata.trace_name`。修复了 v1→v2 升级后所有 trace 都被命名为 `POST /v1/chat/completions` 的回归问题。
- **提示缓存亲和性 TTL 对齐**（[#40776](https://github.com/BerriAI/litellm/pull/40776)）——检测消息/工具/系统块上的 `cache_control.ttl`，并在完整 TTL 期间绑定路由亲和性，而不是硬编码的 5 分钟，从而避免 1 小时的 Anthropic 缓存被中途驱逐。
- **OCR 原生生命周期调度**（[#40676](https://github.com/BerriAI/litellm/pull/40676)，[#40734](https://github.com/BerriAI/litellm/pull/40734)）——Rust 端选择 pre/post/terminal 完成点；Python 端保留回调迭代。消除了重复调度，并暴露此前被静默吞掉的提供商错误。

## 稳定性与回归

**按严重性排序，已知修复 PR 的会注明：**

1. **[严重] `secret_redaction.redact_string()` 中的 ReDoS**（[#32353](https://github.com/BerriAI/litellm/issues/32353)，👍 2）。在长异常字符串上发生灾难性正则回溯，阻塞事件循环长达数分钟，杀死存活探针，并使每个副本陷入崩溃循环。**暂无修复 PR 关联**——上游错误频发的运维环境应关注 `task: non-zero exit` 事件，并考虑固定到已对该正则做过审计的构建版本。
2. **[高危] 密钥脱敏的熵值覆盖缺口**（[#40190](https://github.com/BerriAI/litellm/pull/40190)）。4.5-bit Shannon 熵上限无法标记长度约 23 字符以下的凭据，导致 `REDIS_PASSWORD=aB3dE6gH9jK2mN5p` 被原样泄露。该 PR 提议在去除下限的同时恢复覆盖度。
3. **[高危] 终端用户预算重置时的 PostgreSQL 绑定变量溢出**（[#40564](https://github.com/BerriAI/litellm/issues/40564)，已关闭）。`_reset_expired_budget_cascade` 发出单个 `update_many({"user_id": {"in": [...]}})`，参数超过 PG 的 32,767 上限后请求永远不会完成。已关闭——修复已发布。
4. **[高危] `bedrock_converse` 在缺少 `tools=` 数组时拒绝 Agent 后续请求**（[#40735](https://github.com/BerriAI/litellm/issues/40735)）。当一轮请求带有工具调用记录但未重新声明 `tools` 时，请求离开代理前即抛出 `UnsupportedParamsError`。未关闭。
5. **[高危] 配置文件模型在 `litellm_params` 编辑后被驱逐且永不恢复**（[#40761](https://github.com/BerriAI/litellm/issues/40761)）。在 `store_model_in_db: true` 下，编辑任意 params 字段会从所有运行中的 Pod 移除该部署，且无任何机制重新添加，直到重启。未关闭。
6. **[高危] 1.88.0 之后 `/metrics` 返回为空**（[#30079](https://github.com/BerriAI/litellm/issues/30079)）。Prometheus 抓取看到的是 307 重定向到的目标路径，而该路径不输出任何内容。未关闭——影响所有固定在 1.88.x 的可观测性栈。
7. **[中等] VLLM `cached_tokens` 未纳入成本追踪**（[#22984](https://github.com/BerriAI/litellm/issues/22984)）。Token 成本计算器忽略缓存输入部分，导致开销被高估。未关闭，陈旧。
8. **[中等] 键级路由设置下流式回退与非流式行为不一致**（[#25843](https://github.com/BerriAI/litellm/issues/25843)）。同一配置下：流式忽略回退映射，非流式则遵守。未关闭。
9. **[中等] Responses-API 桥接在非流式 `/v1/chat/completions` 上丢失 SpendLogs 记录**（[#36426](https://github.com/BerriAI/litellm/issues/36426)）。`StandardLoggingPayload` 从未生成 → SpendLogs 写入被中止 → 计费数据静默丢失。未关闭。
10. **[中等] OpenAI 兼容流式静默丢弃带内 `{"error": ...}` 事件**（[#40578](https://github.com/BerriAI/litellm/issues/40578)，已关闭）。`chunk_parser` 返回空成功结果而不是抛出异常。已关闭。
11. **[中等] `parse_tool_call_arguments` 丢弃带有拼接 JSON 参数的工具调用**（[#40582](https://github.com/BerriAI/litellm/issues/40582)）。`split_concatenated_json_objects` 已存在但未被该路径调用。未关闭。
12. **[中等] JWT 鉴权为每个 token 签发全新的"虚拟密钥"**（[#40398](https://github.com/BerriAI/litellm/issues/40398)）。每次刷新都会向 Top Virtual Keys 中新增一行 `hashed-jwt-…`。未关闭。
13. **[中等] Azure AI 模型路由器没有成本追踪**（[#40728](https://github.com/BerriAI/litellm/issues/40728)）。任何经由 Azure AI 路由器路由的部署，其消费 UI 都保持为空。未关闭。
14. **[中等] Bedrock 上的 GPT-5.6 跨区域推理配置文件拒绝图像输入**（[#40080](https://github.com/BerriAI/litellm/issues/40080)）。该路径走 Converse 而非 OpenAI 端点，而 Converse 不接受 `image` 字段。未关闭。
15. **[中等] Vertex AI Realtime 将 `pcm16` 硬编码为 24 kHz**（[#40563](https://github.com/BerriAI/litellm/issues/40563)）。在其他采样率下会损坏 `gemini-3.5-transcribe-live-preview` 的音质。未关闭。
16. **[中等] Qwen3.8 工具结果在原生 Ollama 提供商路径下未被消费**（[#40575](https://github.com/BerriAI/litellm/issues/40575)）。OpenAI 兼容的 Ollama 路径正常工作；原生路径不正常。未关闭。
17. **[低危] MCP OAuth 临时服务器未继承 OAuth URL**（[#20495](https://github.com/BerriAI/litellm/issues/20495)，已关闭）。已关闭。
18. **[低危] 格式化器中存在硬编码 ANSI 转义码**（[#29799](https://github.com/BerriAI/litellm/issues/29799)，已关闭）。已关闭。

**已解决（重要项）：** MCP OAuth URL 继承（#20495）、预算重置数据库溢出（#40564）、带内流式错误吞掉（#40578）、OpenAPI MCP 内联 schema 剥离（#29715）、OTel `gen_ai.input.messages` key 归一化（#29756）、`/v1/audio/transcriptions` 说话人参考塌缩（#29766）、UI 请求日志页跳转（#40661）。

## 对应用开发者的影响

- **按摘要固定镜像并校验 cosign 签名。** 在 v1.102.0-dev.2 中，签名验证是受支持的路径；运维人员应配置准入策略（Kyverno、Connaisseur 或 CI 中的 `cosign verify`），拒绝未签名的镜像。
- **审计你的 `master_key`。** 新合并的告警（[#40758](https://github.com/BerriAI/litellm/pull/40758)）会标记示例 `sk-1234` 或缺失密钥的情况——据观察，约每 10 个暴露的网关中就有 1 个仍在接受该默认值。在该告警在未来版本中升级为错误之前完成密钥轮换。
- **成本看板可能低估消费。** Azure AI Router 部署（#40728）、原生 Ollama Qwen 工具调用（#40575），以及非流式完成的 Responses-API 桥接（#36426）在当下都会泄漏计费事件。在修复落地前，请与上游提供商的账单进行对账。
- **避开 `1.88.x` 的 Prometheus 陷阱**（[#30079](https://github.com/BerriAI/litellm/issues/30079)）。要么停留在 1.87.x，要么升级到包含该重定向修复的构建，要么固定你的抓取

</details>

<details>
<summary><strong>Unsloth</strong> — <a href="https://github.com/unslothai/unsloth">unslothai/unsloth</a></summary>

# Unsloth Digest — 2026-09-12

## 1. 今日要点

Studio/Desktop 集中迎来一波 Bug 修复（来自 @NilayYadav 等贡献者的 10+ 个 PR），涵盖 CSV 训练、API Key 泄露、transformers 模型停止文本失效、Anthropic 流式中段错误处理，以及一个安全问题：无 Hugging Face Token 的 API Key 可借助服务端用户的 HF 登录进行训练。并行推进的工作还落地了呼声已久的 **AMD ROCm Docker 镜像**（PR #10820），与 CUDA/Blackwell 镜像保持一致，另外新增一个 ARM64 仅 CPU 构建目标（PR #10766）。在底层，多个工具调用 / llama-server 正确性 Bug 浮现——其中最突出的是一个队列阻塞问题：某个等待工具审批的对话会占住一个槽位，让所有排队的对话都得不到服务（#10671）。

## 2. 版本发布与破坏性变更

过去 24 小时无打标签的发布。

**需要提醒集成方注意的未公告破坏性变更：**
- [#10785](https://github.com/unslothai/unsloth/issues/10785) —— 在 2026-09-11 的 Docker 镜像（包版本 `2026.9.4`）中，`SFTConfig.__init__() got an unexpected keyword argument 'max_seq_length'`。`max_seq_length` 已更名为 `max_length`。pip 安装用户不受影响；Docker 用户需要更新训练脚本，或固定到旧版本标签。

## 3. 新增模型与硬件支持

- **AMD ROCm Docker 镜像（RDNA2/3/4 + CDNA/Instinct）** —— PR [#10820](https://github.com/unslothai/unsloth/pull/10820)（对 #6231 的重新同步）让 ROCm 镜像与来自 #5748 的 CUDA/Blackwell 布局保持一致。关联 issue [#6230](https://github.com/unslothai/unsloth/issues/6230) 和 [#9581](https://github.com/unslothai/unsloth/issues/9581)。
- **ARM64 仅 CPU 的 Docker 构建目标** —— PR [#10766](https://github.com/unslothai/unsloth/pull/10766) 新增面向无 GPU ARM64 主机的 CUDA-free 构建。
- **DGX Spark（GB10 / sm_121a / aarch64）使用报告** —— PR [#10491](https://github.com/unslothai/unsloth/pull/10491)（无差异）：当前 `unsloth/unsloth` arm64 镜像在 CPU 上跑 llama.cpp；该平台上的 GPU 加速尚未生效。
- **Windows ROCm 上 accelerate 的版本上限** —— PR [#10819](https://github.com/unslothai/unsloth/pull/10819) 在 Windows 上固定 `accelerate<1.15`，原因是 1.15.0 无条件导入 `torch._distributed_c10d`，而 AMD 的 Windows ROCm wheel 未提供该模块。任何在 Windows 上跑 ROCm 训练的人都需留意。
- **FLUX.2 Klein** 图像流水线 —— [#10768](https://github.com/unslothai/unsloth/issues/10768) 报告在多 GPU 环境下 VAE 解码阶段出现 `CUBLAS_STATUS_NOT_INITIALIZED`。

## 4. 性能与优化

- **B200 + Qwen3.5-9B LoRA：每个 step GPU 几乎闲置** —— [#10806](https://github.com/unslothai/unsloth/issues/10806)。根因：`fla` 每次启动 `unsloth-cli.py` 都重建 autotune key，没有缓存。单步耗时主要被 autotune 主导，而非 GEMM。尚未给出具体数字，issue 很新。
- **Gemma-4-12B QAT GGUF 图像使 llama-server 崩溃** —— PR [#10683](https://github.com/unslothai/unsloth/pull/10683) 提高了 projector 的 micro-batch；一张 1400×1400 图像（862 个 prompt token）在 RTX 6000 Ada、构建版本 10840 上触发 `GGML_ASSERT((cparams.causal_attn || cparams.n_ubatch >= n_tokens_a…))`。修复 #10559。
- **ARM64 llama.cpp CPU 回退** 在 GH200 / DGX Spark 上加入 GPU 支持前，会给推理延迟带来回归风险（#10491）。

## 5. 稳定性与回归（按严重程度排序）

| 严重程度 | 条目 | 备注 |
|---|---|---|
| 🔴 高 | [#10809](https://github.com/unslothai/unsloth/pull/10809) —— 没有 HF Token 的 API Key 会回退到 **服务端用户的 HF 登录**，可用于私有模型训练 | **修复 PR 已开。** 安全边界被破坏；在合并前，可视为 Studio 拥有服务端用户完整的 HF 权限。 |
| 🔴 高 | [#10785](https://github.com/unslothai/unsloth/issues/10785) —— 当前 Docker 镜像中 `SFTConfig(... max_seq_length=...)` 抛错 | 更名为 `max_length`。仅影响 Docker 用户。 |
| 🟠 中 | [#10671](https://github.com/unslothai/unsloth/issues/10671) —— 某个对话等待工具审批时，队列中其他对话被阻塞；被占槽位仍持有上下文预算 | 未解决，无修复 PR。影响多租户服务。 |
|  中  | [#10768](https://github.com/unslothai/unsloth/issues/10768) —— FLUX.2 Klein VAE 解码在多 GPU 下失败，报 `CUBLAS_STATUS_NOT_INITIALIZED` | 未解决。阻断 diffusion 工作流。 |
|  中  | [#10806](https://github.com/unslothai/unsloth/issues/10806) —— B200 上 `fla` 的 autotune 每次启动都重建 | 未解决。CLI 训练下有效吞吐几乎坍塌。 |
|  中  | [#10355](https://github.com/unslothai/unsloth/issues/10355) —— `--tensor-split` 被静默忽略 | 自 09-05 起未解决，多名用户反馈。 |
| 🟡 低 | [#10813](https://github.com/unslothai/unsloth/pull/10813) —— 空白 CSV 单元格被当作字面量 `None` 训练 | **修复 PR 已开。** |
| 🟡 低 | [#10812](https://github.com/unslothai/unsloth/pull/10812) —— transformers（NVIDIA）后端上停止文本被忽略 | **修复 PR 已开。** |
| 🟡 低 | [#10821](https://github.com/unslothai/unsloth/issues/10821) ——（手动 GPU 模式）实际启动的是 `--fit off`，日志却写 `--fit on` | 仅日志层面，无实际影响。 |
|  低  | [#10769](https://github.com/unslothai/unsloth/issues/10769) —— Desktop 中大代码块导致 UI 卡顿 | 未解决。 |
| 🟡 低 | [#10786](https://github.com/unslothai/unsloth/issues/10786) —— Web UI 在 `127.0.0.1`/`localhost` 返回 404，实际服务在局域网 IP | 未解决。 |
| 🟡 低 | [#10795](https://github.com/unslothai/unsloth/issues/10795) —— X11 + NVIDIA：WebKit 泄漏 DMA-BUF fd → EMFILE → 窗口空白 | 未解决。 |
| 🟡 低 | [#10793](https://github.com/unslothai/unsloth/issues/10793) —— 默认 Studio/llama-server 日志缺乏排障上下文 | 功能请求。 |

**昨日以来已关闭：** #10208（audio-cpp / 音乐生成——已驳回）、#10479（工具调用预算幻觉）、#10756（4-bit / 16-bit 加载器冲突）、#10722（用户名含空格的 Windows 安装器）、#10155（达到 token 上限历史后再附加图片）。

## 6. 对应用开发者的意义

- 在 #10809 合并前，**应将 Studio 视为拥有服务端用户的 Hugging Face 权限范围**。若你把 Studio / API Key 暴露给不可信用户，请为每个 Key 设置显式的 HF Token，或将服务端用户做沙箱隔离。
- 若训练脚本使用了 `max_seq_length`，请**固定你的 Docker 镜像版本**——2026-09-11 的镜像已经将字段更名为 `max_length`。
- **面向 Agent 开发者的工具调用可靠性注意事项：**
  - 重复调用防护过于激进——编辑文件后重新运行命令会被跳过（#10792，修复 PR #10810）。
  - 重放的工具调用参数键会被排序，导致 llama-server 重新处理多参数调用（#10791）。
  - 某个等待工具审批的对话会一直占用槽位，即便有空余容量也会阻塞队列中的其他对话（#10671）。
- 当前 **transformers（NVIDIA）后端上的 stop 序列不生效**；PR #10812 修复了这个问题。在此之前，不要在该路径上依赖 `stop` 字符串来控制成本。
- **AMD GPU 路径正在收敛** —— ROCm Docker 已到位（#10820）；若你在考虑 Instinct / MI 构建，可以预期还会有些毛刺，但整体布局已与 CUDA 对齐。
- **DGX Spark / GH200** 目前推理跑在 CPU 上。延迟敏感型负载不要部署在这两个平台上。
- **Deep Research 链接改写**（#10814 修复）会把代码块内的网址一并剥掉——Agent 生成的包含 URL 的代码，可能需要在修复进入镜像后重新核对。

*基于过去 24 小时 `unslothai/unsloth` 上 38 个更新的 issue 与 95 个更新的 PR 自动生成。*

</details>

<details>
<summary><strong>Claude Code Router</strong> — <a href="https://github.com/musistudio/claude-code-router">musistudio/claude-code-router</a></summary>

# Claude Code Router — 每日摘要
**日期：** 2026-09-12
**仓库：** [musistudio/claude-code-router](https://github.com/musistudio/claude-code-router)

---

## 1. 今日要闻

OpenCode 提供商覆盖范围正在扩展，新增对 Go 的一级支持（[PR #1786](https://github.com/musistudio/claude-code-router/pull/1786)）；同时一个新的成本跟踪缺陷浮出水面：对于规则别名的模型，使用日志记录的是别名而非解析后的实际模型（[Issue #1787](https://github.com/musistudio/claude-code-router/issues/1787)）。此外，一个长期搁置的 Requesty 提供商预设 PR 获得了更新（[PR #1451](https://github.com/musistudio/claude-code-router/pull/1451)），标志着多提供商路由工作重新活跃。过去 24 小时内未发布任何新版本。

---

## 2. 发布与破坏性变更

过去 24 小时内无新发布。最新已发布版本仍为 **v3.0.22**，这也是当前未解决缺陷报告中所引用的版本。

---

## 3. 新模型与硬件支持

未引入新的模型架构、量化格式或硬件后端（CUDA / ROCm / Metal / CPU）。值得关注的提供商侧新增内容：

- **OpenCode Go（`opencode-go`）** — 与现有 OpenCode Zen（`opencode`）区分开的独立提供商记录，凭证独立，模型 ID 可能存在重叠。本地导入器正在更新，以确保同时可靠地处理两者（[PR #1786](https://github.com/musistudio/claude-code-router/pull/1786)）。
- **Requesty** — 位于 OpenAI、Anthropic、Google 等模型前的 OpenAI 兼容路由聚合器，正作为一级预设与 OpenRouter 和 NVIDIA 一同被加入（[PR #1451](https://github.com/musistudio/claude-code-router/pull/1451)）。

---

## 4. 性能与优化

过去 24 小时内没有吞吐量、延迟、内存或内核层面的性能工作落地或被提出。

---

## 5. 稳定性与回归

**[#1787 — 规则别名模型的预估成本始终为 $0](https://github.com/musistudio/claude-code-router/issues/1787)**（OPEN，🟡 中等）
- **严重程度：** 中等 — 影响账单/用量可见性，但不会中断请求流程。
- **症状：** 当请求通过将一个模型别名指向另一个模型的路由规则分发时（例如 `default` → `provider/model-x`），用量记录存储的是 *别名* 字符串，而非解析后的下游模型。由于别名不在定价目录中，成本估算因此计算为 `$0`。
- **报告版本：** CCR v3.0.22，并已确认在当前 `master` 分支上仍存在；相关代码路径自 v3.0.22 起未发生变更。
- **环境：** 通过官方 Dockerfile 构建的容器，Claude Code CLI 客户端走 Anthropic `/v1/messages` 协议，默认 `usage` 存储后端。
- **修复 PR：** 暂无。

另需标记为近期关闭的相关上下文：[#1785](https://github.com/musistudio/claude-code-router/pull/1785) — 先前一个 OpenCode Go PR 已被关闭（很可能被 [#1786](https://github.com/musistudio/claude-code-router/pull/1786) 取代）；其中涉及的 `x-opencode-session` 请求头修复曾引用 issues #1754 和 #1780。

---

## 6. 对应用开发者的意义

- **在 [#1787](https://github.com/musistudio/claude-code-router/issues/1787) 解决之前，请勿信任 CCR 对规则别名模型的成本报告。** 如果你的路由配置将 `default` 或 `fast` 等别名映射到底层模型，用量仪表板将默默地少报支出。缓解方法：直接通过 CCR 日志查询解析后的模型，而非依赖存储的 `model` 字段；或者在成本敏感的路由场景中避免使用别名。
- **OpenCode 用户将获得 Zen 与 Go 提供商之间更清晰的区分**，待 [#1786](https://github.com/musistudio/claude-code-router/pull/1786) 合并后生效。预计将出现两个独立的提供商条目、不重叠的导入记录，以及正确的 `x-opencode-session` 请求头处理 — 而这正是近期关闭的 [#1785](https://github.com/musistudio/claude-code-router/pull/1785) 的根本原因。
- **多提供商路由正变得更加即插即用。** Requesty 预设（[#1451](https://github.com/musistudio/claude-code-router/pull/1451)）将允许团队通过单一 OpenAI 兼容端点在 OpenAI / Anthropic / Google 之间分发请求，并支持 `ccr://provider` 深链接导入，从而在新增提供商时减少手工 JSON 配置的负担。

</details>

<details>
<summary><strong>CC Switch</strong> — <a href="https://github.com/farion1231/cc-switch">farion1231/cc-switch</a></summary>

# CC Switch 简报 — 2026-09-12

## 1. 今日要点

CC Switch **v3.20.3** 随 Kimi Codex 预设迁移至原生 OpenAI Responses API 发布,完成了一轮全面切换,目前 DeepSeek、智谱 GLM、Qwen、MiMo、LongCat、Kimi、火山引擎豆包、腾讯混元均已对接厂商直连端点(不再走本地格式转换路由)。代理侧积压的任务集中在 **Responses API 的边界场景**:极小的 `max_tokens`、图片上的 `detail: "original"`、托管工具上的 `description: null` 本周都在加固;同时 **PR #7317** 的一次破坏性重构将 `model_mapper` 重命名为 `model_router`。

## 2. 发布与破坏性变更

- **v3.20.3** 已发布([发布说明](https://github.com/farion1231/cc-switch/releases/tag/v3.20.3))——Kimi Codex 预设从 Chat Completions 转换切换到原生 Responses。使用旧版 Chat 格式 Kimi 卡片的现有用户需重新添加预设,或在编辑页面将"上游格式"切换为 **Resp**。
- **即将到来的破坏性变更 — PR #7317**([#7317](https://github.com/farion1231/cc-switch/pull/7317)):`model_mapper` 被 `model_router` 取代。任何依赖旧键名的下游消费方、插件或分支都需要迁移。新特性:跨 Claude/Codex/Gemini 的基于规则的模型路由。
- **PR #6792**([#6792](https://github.com/farion1231/cc-switch/pull/6792)):Grok 提供商现独立保存账户凭证;Codex 用量导入针对 Windows mtime 跳过写入的场景做了加固。
- **Dependabot 批量更新**([#7285](https://github.com/farion1231/cc-switch/pull/7285)):`src-tauri` 中 53 个 Rust 依赖更新。

## 3. 新增模型与硬件支持

- **Kimi Codex 预设**现采用原生 Responses([v3.20.3](https://github.com/farion1231/cc-switch/releases/tag/v3.20.3))。
- **DeepSeek V4.1 Flash**——`deepseek-flash` 携带 `input_modalities: ["text","image"]`;旧别名 `deepseek-v4-flash` 仍作为有效的视觉别名保留。CC Switch 内置目录已在 **PR #7286**([#7286](https://github.com/farion1231/cc-switch/pull/7286))中修补,图像块不再被替换为 `[Unsupported image...]`。
- **Grok 4.6** 推理强度通过 **PR #7318**([#7318](https://github.com/farion1231/cc-switch/pull/7318))正确传递——`grok-4.6` 与 `grok-4.6-build` 此前缺失于 `supports_reasoning_effort` 白名单中,导致 `/effort xhigh` 被静默丢弃。
- **cocodot** 作为新的 Claude Code + Codex 提供商([#7313](https://github.com/farion1231/cc-switch/pull/7313))——Claude 走 Anthropic 原生,Codex 通过本地路由走 Chat Completions。
- **MiMo 适配**请求在 v3.20.3 中关闭([#4073](https://github.com/farion1231/cc-switch/issues/4073))。

## 4. 性能与优化

- **PR #7307**([#7307](https://github.com/farion1231/cc-switch/pull/7307)):为 `fetch_npm_dist_tags` 增加 **探测超时**,消除了本地环境面板中"checking version"转圈卡死的问题。根因:本地 `zsh -lic "{tool} --version"` 约 0.6 秒返回;真正无限挂起的是远端 npm 调用。
- **PR #7287**([#7287](https://github.com/farion1231/cc-switch/pull/7287)):将低于下限的 `max_tokens`(1–15)夹紧到 Responses API 最小值 16。Claude Desktop 以 `max_tokens=1` 探测,导致严格的上游提供商(OpenCode Zen Go)返回 400 并将模型标记为"不可用"。
- **PR #7293**([#7293](https://github.com/farion1231/cc-switch/pull/7293)):为 **回环上游目标**(`127.0.0.1`)绕过继承的系统代理。此前全局启用 ClashX/Verge/v2rayN 时,本地 OpenAI 兼容服务器无法连通。
- **PR #7094**([#7094](https://github.com/farion1231/cc-switch/pull/7094)):每个提供商的 Claude Code 会话持久化(取代临时的 `--settings` 覆盖层),改善 MCP/插件隔离与切换开销。
- **PR #6636**([#6636](https://github.com/farion1231/cc-switch/pull/6636)):会话搜索现索引完整对话而非仅元数据——恢复了文档所述的"按内容搜索"行为。

## 5. 稳定性与回归

按影响排序。**加粗**条目表示截至今日仍未合并修复 PR 的开放问题。

- **[HIGH, OPEN]** **[#4341](https://github.com/farion1231/cc-switch/issues/4341)**——与第三方提供商的 Codex 对话在线程中间自动断开(49 条评论,尚无修复)。
- **[HIGH, OPEN]** **[#7224](https://github.com/farion1231/cc-switch/issues/7224)**——3.20.x 内存占用异常(5 条评论)。
- **[HIGH, OPEN]** **[#4741](https://github.com/farion1231/cc-switch/issues/4741)**——`/responses` 代理在缺少前置 `tool_calls` 的工具消息上失败(DeepSeek 返回 HTTP 400)。**PR #7319** 在思路上有所缓解,但工具消息排序的具体 bug 仍开放。
- **[HIGH, OPEN]** **[#7221](https://github.com/farion1231/cc-switch/issues/7221)**——3.20.2 将 Claude Code 在 `qwen3.8 27B` 上回退到仅 `haiku`;其他模型选择报错。
- **[MEDIUM, OPEN]** **[#4679](https://github.com/farion1231/cc-switch/issues/4679)** / **[#4642](https://github.com/farion1231/cc-switch/issues/4642)**——本地代理缓存 macOS 系统代理状态,在代理切换时不刷新 → 502;**PR #7293** 提供部分修复。
- **[MEDIUM, OPEN]** **[#5687](https://github.com/farion1231/cc-switch/issues/5687)**——Codex 3.18.0 同步在空闲后发生 fork 时永久推迟父任务;相关修复在 **PR #7093**(分批合并)。
- **[MEDIUM, OPEN]** **[#7264](https://github.com/farion1231/cc-switch/issues/7264)**——Codex 用量计数偏少;活动日志在 mtime 未变的情况下被跳过。
- **[MEDIUM, OPEN]** **[#7029](https://github.com/farion1231/cc-switch/issues/7029)**——系统代理工具重启后,所有用量查询与连通性检查失败,直到重启 CC Switch。
- **[MEDIUM, OPEN]** **[#6936](https://github.com/farion1231/cc-switch/issues/6936)**——macOS 13:所有提供商检查与应用内更新失效;Codex API 也失败。
- **[RESOLVED]** [#7236](https://github.com/farion1231/cc-switch/issues/7236)(Claude Code 2.1.265 → Deepseek/ZAI)、[#5028](https://github.com/farion1231/cc-switch/issues/5028)(GLM 5.2 流式 → 空 `thinking` 块)、[#5860](https://github.com/farion1231/cc-switch/issues/5860)(Responses→Chat 在 DeepSeek 上无限推理循环)、[#7088](https://github.com/farion1231/cc-switch/issues/7088)(OpenCodeGo `x-opencode-session` 头)、[#6529](https://github.com/farion1231/cc-switch/issues/6529)(Codex Responses→Chat 注释分裂)、[#4404](https://github.com/farion1231/cc-switch/issues/4404)(推理模型上 `content_block_start` 碎片化)。

## 6. 对应用开发者的意义

- **立即迁移 Codex 预设。** v3.20.3 之后,Chat Completions 路径已属遗留选项;所有主流国产开源提供商均直连 Responses 端点。延迟更低、流式边界场景 bug 更少,但请将任何自定义的 Anthropic→OpenAI 转换逻辑对照新路径验证。
- **在 PR #7317 合入前规划 `model_mapper` → `model_router` 重命名。** 如果你 fork 了 CC Switch 或编写了内省路由配置的插件扩展,请现在就在外层抽象一层 shim。
- **在 Grok 4.6 上使用完整推理强度。** 在 **PR #7318** 之前,`/effort xhigh` 会静默降级为默认值;如果你发布的 agent 依赖 Grok 上的最大深度推理,请确保用户已更新。
- **回环提供商现在是一等公民。** 自托管的 OpenAI 兼容服务器(`127.0.0.1:port`)在启用代理的主机上经 **PR #7293** 后能真正收到流量——对本地栈调试与 CI 很有用。
- **工具定义的卫生很重要。** 根据 **PR #7319**,任何严格校验 `tools.N.function.description` 的上游,在通过旧版本代理时会拒绝 Anthropic 托管工具(web_search、web_fetch、text_editor)。如果你维护 MCP 服务器,请确保 `description` 是非 null 字符串或直接省略,绝不能为 `null`。
- **关于 `[Unsupported image...]` 回归的提醒**:如果你之前向 `deepseek-v4-flash` 发送图像内容,旧版本会静默丢弃;**PR #7286** 恢复了视觉能力。请在宣布任何 DeepSeek 视觉 agent 终止支持前完成更新。
- **macOS 上系统代理生命周期仍不顺畅**([#4642](https://github.com/farion1231/cc-switch/issues/4642)、[#7029](https://github.com/farion1231/cc-switch/issues/7029))。对于运行时切换 VPN/代理的 agent,建议用户重启 CC Switch,或将提供商固定为直连模式,直至缓存 bug 完全解决。

</details>

<details>
<summary><strong>New API</strong> — <a href="https://github.com/QuantumNous/new-api">QuantumNous/new-api</a></summary>

# New API 摘要 — 2026-09-12

## 1. 今日要点

**v1.0.0-rc.37** 版本随新的 **Pricing Configuration（定价配置）** 系统（旧定价模型已弃用）一同发布，同时增强了支持流式输出与按插件计费表达式的 **Task Plugins（任务插件）**。一个导致生产环境容器重启的高危 **`InitChannelCache` nil-map panic** 已通过 [#7323](https://github.com/QuantumNous/new-api/pull/7323) 修复，网关还新增了可选的 **Langfuse 可观测性**支持（[#7313](https://github.com/QuantumNous/new-api/pull/7313)）。

## 2. 版本发布与破坏性变更

- **[v1.0.0-rc.37](https://github.com/QuantumNous/new-api/releases/tag/v1.0.0-rc.37)** — Pricing Configuration、Task Plugins、Passkey
  - **弃用说明**：旧的定价模型将被移除；管理员可将当前价格转换为计费表达式草稿，并在保存前预览实际生效的价格。
  - **新版定价编辑器**：条件定价、单次调用费用、基于时间的规则、图像用量与图像缓存计量。
  - **内置计费表达式**覆盖 `gpt-image-2`、`gpt-image-2.5-sunburst`、`gpt-image-2.5-flare`；现有的管理员覆盖规则仍然优先。
  - **Task Plugins**：流式输出、按插件的用量定价与计费表达式、插件详情变更日志视图，以及英文回退。
- **GA 标准征集** — [#7279](https://github.com/QuantumNous/new-api/issues/7279)（👍 5）：维护者在 rc.36/rc.37 期间请求明确 v1.0.0 GA 的发布标准。
- **OpenCode Zen Provider** 官方渠道支持已合并 — [#7329](https://github.com/QuantumNous/new-api/issues/7329)。

## 3. 新增模型与硬件支持

- **新增上游 Provider**：官方 **OpenCode Zen** 渠道适配器已通过 [#7329](https://github.com/QuantumNous/new-api/issues/7329) 添加。
- **新增内置定价**：`gpt-image-2`、`gpt-image-2.5-sunburst`、`gpt-image-2.5-flare` 在 rc.37 中自带默认计费表达式。
- **Qwen3 系列回归修复**：`qwen3.7-max` / `qwen3.8-max` 自 rc.31 起被截断为 `qwen3.7` / `qwen3.8` — [#7201](https://github.com/QuantumNous/new-api/issues/7201) 已关闭。
- **Veo / Gemini 视频插件修复**（[#7311](https://github.com/QuantumNous/new-api/pull/7311)、[#7314](https://github.com/QuantumNous/new-api/pull/7314)）：将请求负载从不支持的 `parameters.numberOfVideos` 切换为 `sampleCount`，并从 `generatedSamples` 中读取正确的 URI，而非沿用 Python SDK 形态的路径。

## 4. 性能与优化

- **渠道健康探测去重** — [#7328](https://github.com/QuantumNous/new-api/pull/7328)（已关闭/已合并）：新增 `/status` 和 `/api/status-check`；探测按每个 `(channel, model)` 仅发起一次并扇出到所属分组，消除冗余的上游检查。
- **多 Key 渠道「测试全部 Key」** — [#7112](https://github.com/QuantumNous/new-api/pull/7112)：并发 Key 校验、自动禁用规则、移动端 UI 修复。
- **自动禁用后保留重试优先级** — [#7294](https://github.com/QuantumNous/new-api/pull/7294)：确保移除被禁用渠道时不会打乱剩余渠道的顺序。
- **过载哨兵现在读取容器指标** — [#7317](https://github.com/QuantumNous/new-api/pull/7317)：在容器化部署下，`system_cpu_overloaded` 不再因宿主机 CPU 而误触发；新增了连续性与新鲜度校验。
- **重试逻辑重构提案** — [#4236](https://github.com/QuantumNous/new-api/issues/4236)：开放性设计讨论，主题是更智能的重试决策。

## 5. 稳定性与回归

按严重程度排序，今天最值得关注的问题如下：

| 严重程度 | 问题 | 状态 | 修复 |
|---|---|---|---|
| 🔴 严重（生产崩溃） | [`InitChannelCache` nil-map panic](https://github.com/QuantumNous/new-api/issues/7331)：当已启用渠道所在的分组没有 abilities 行时触发，每个同步周期都会重启容器 | OPEN | [PR #7323](https://github.com/QuantumNous/new-api/pull/7323) 待合并 |
| 🟠 高（数据丢失） | [BatchUpdater 在关闭时丢弃累积的增量](https://github.com/QuantumNous/new-api/issues/7325)：当 `BATCH_UPDATE_ENABLED=true` 时 | CLOSED（维护者判定为无效） | 暂无 |
| 🟠 高（过载误判） | [`system_cpu_overloaded` 使用了宿主机 CPU](https://github.com/QuantumNous/new-api/issues/7316) → 容器内流量被误触发阻断 | CLOSED（维护者判定为无效） | [PR #7317](https://github.com/QuantumNous/new-api/pull/7317) |
| 🟡 中（正确性） | [阶梯计费日志误报「dynamic billing · no match result」](https://github.com/QuantumNous/new-api/issues/7296) | OPEN | [PR #7324](https://github.com/QuantumNous/new-api/pull/7324) |
| 🟡 中（正确性） | [`qwen3.7-max` / `qwen3.8-max` 被截断为基础名称](https://github.com/QuantumNous/new-api/issues/7201) | CLOSED | 已合并 |
| 🟡 中（正确性） | [Veo 视频 URI 读取了错误的 JSON 路径](https://github.com/QuantumNous/new-api/pull/7314) | OPEN | [PR #7314](https://github.com/QuantumNous/new-api/pull/7314) |
| 🟡 中（正确性） | [Veo 发送了不支持的 `numberOfVideos`](https://github.com/QuantumNous/new-api/pull/7311) | OPEN | [PR #7311](https://github.com/QuantumNous/new-api/pull/7311) |
| 🟢 低 | [音频扩展名区分大小写](https://github.com/QuantumNous/new-api/issues/7319) | OPEN | [PR #7321](https://github.com/QuantumNous/new-api/pull/7321) |
| 🟢 低（信息泄露） | [Model-square 性能页泄露隐藏分组](https://github.com/QuantumNous/new-api/issues/7309) | OPEN | [PR #7326](https://github.com/QuantumNous/new-api/pull/7326) |

> 注：[#7322](https://github.com/QuantumNous/new-api/issues/7322) 与 #7331 是同一个 panic 问题，但因缺少 bug 报告模板被审查机器人自动关闭；#7331 按正确格式重新提交，[PR #7323](https://github.com/QuantumNous/new-api/pull/7323) 取代了原方案。

## 6. 对应用开发者的影响

- **立即将定价从旧模型迁移过来**：rc.37 提供一键转换 + 预览流程；尽早锁定可避免旧 schema 被移除时出现意外。
- **生产环境固定到某个稳定 RC**：rc.37 的 `InitChannelCache` panic 和 Veo 参数 Bug 都尚未合并修复 — 在扩容前先部署 [PR #7323](https://github.com/QuantumNous/new-api/pull/7323)（或在下一个 rc 发布后固定到该版本）。
- **使用新的 Langfuse 集成**（[#7313](https://github.com/QuantumNous/new-api/pull/7313)）获取每次请求的链路追踪与重试元数据 — 它是异步批量上报的，不会卡在热路径上。
- **围绕额度自动化做规划**：[#7320](https://github.com/QuantumNous/new-api/pull/7320) 新增全局 + 按用户的周期性额度重置，适用于积分池或席位制计费模型。
- **组织/团队原语即将到来**：[#7312](https://github.com/QuantumNous/new-api/issues/7312)（共享额度、成员角色、资源隔离）正在推进，未来你不再需要在 user 表上自己拼接多租户逻辑。
- **批量操作 UX 正在补齐**：[#7318](https://github.com/QuantumNous/new-api/issues/7318)（批量删除用户）已进入增强队列 — 如果你管理着大规模终端用户群，这与你相关。
- **Provider 覆盖进一步扩展**：官方 OpenCode Zen 渠道（[#7329](https://github.com/QuantumNous/new-api/issues/7329)）为你提供了又一个免适配器的官方上游。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*