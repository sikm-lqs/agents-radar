# AI CLI 工具社区动态日报 2026-09-06

> 生成时间: 2026-09-06 15:33 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# AI CLI 工具跨工具对比报告 — 2026-09-06

## 1. 生态概览

AI CLI 品类已整合为生产基础设施板块：子代理、skills/插件以及 MCP 支持已成为全部七个追踪工具的标配基线，而非差异化点。当下的活动主线已不再是新增能力，而是**运营硬化** —— 多代理可靠性、权限/沙箱完整性、成本可预测性，是每个仓库中出现频率最高的三大主题。分化沿两条轴线加剧：**厂商开放度**（单一厂商的 Claude Code、Codex、Copilot CLI 对比多厂商的 OpenCode 与 Pi）以及**客户端融合**（终端向桌面应用、Web shell、IDE 伴随程序以及语音运行时扩展）。互操作协议正成为生态的连接组织 —— MCP 用于工具集成，ACP 用于代理客户端，Qwen Code 已开始通过 ACP 将子代理回合委派给 Claude Code。

## 2. 活跃度对比

| 工具 | Issues（24h） | PRs（24h） | Discussions（24h） | 发布状态 |
|---|---|---|---|---|
| **OpenAI Codex** | 50 updated（10 hot listed） | 27（10 highlighted） | 8（5 Ideas，1 Q&A，2 Show & Tell） | 窗口内无 |
| **Claude Code** | ~14 tracked（10 hot + 4 notable） | ~18（10 detailed + 8 merged） | N/A —— 本窗口无数据 | v2.1.263 已发布（低调的可靠性补丁） |
| **Gemini CLI** | ~10 highlighted | 10 | N/A —— 未报告 | v0.60.0 nightly（常规） |
| **Copilot CLI** | 15 updated | 0 | N/A —— 本窗口无数据 | 无；1.0.81–1.0.82 故障正在分诊 |
| **OpenCode** | ~10 highlighted | 10 | N/A —— 未报告 | 无 |
| **Pi** | ~10 highlighted | 10 | 2 | 无；0.85.1 打包回归未解决（#9226） |
| **Qwen Code** | ~10 highlighted | 10 | N/A —— 未报告 | v0.23.1-preview.1 已发布；**CI 失败 4 次** |

*带 "~" 的计数反映摘要高亮条目，并非仓库的完整总数。N/A 表示该渠道数据在本窗口内不可用/未报告，并非确认无活动。Copilot CLI 的零 PR 反映了其封闭式贡献模型 —— 动量体现在 issue 量上，而非代码评审。*

## 3. 共性功能方向

- **子代理/多代理可靠性与可观测性（全部 7 个工具）。** 最强的跨工具信号。Claude Code：重复 worker 扇出（#55586）、消耗 token 的 ack 循环（#47930）、共享草稿板（#87243）。Gemini CLI：`MAX_TURNS` 后误报 `GOAL` 成功（#22323）、无限挂起（#21409）。Codex：丢失子代理模型/强度可见性（#32283）。Copilot CLI：`agentStop` 在子代理回合误触发（#3894）。OpenCode：子会话事件被误路由到父会话（#46685）。共同诉求：确定性扇出、按代理状态隔离、准确的终止上报、按运行成本归属。
- **沙箱与权限完整性（7 个中 6 个）。** Gemini CLI：零依赖 OS 沙箱方案（#19873）、Windows git 参数校验（#29184）。Claude Code：符号链接逃逸与 shell 注入修复（#68689、#68786）。Qwen Code：`PreToolUse` hooks 在 `--continue` 后静默失效（#11180）。Copilot CLI：ACP 自动批准回归（#4537）。模式：权限模型必须能在 resume/continue/reload 路径下存活。
- **提示缓存经济性与成本透明度（7 个中 5 个）。** Claude Code：33 token 差异使 5.3k 缓存 token 失效（#82739）。Copilot CLI：BYOK 静默禁用缓存，成本约 5 倍（#4720）。Pi：显式采用系统消息 *delta delivery* 以保留缓存（#9117），外加网关计费异常。OpenCode：配额计量数学错误（#47547）。成本可观测性现已成为独立的功能请求类别。
- **MCP 生命周期可靠性（7 个中 4 个）。** OAuth token 复用失败（Copilot #4695）、重认证循环（OpenCode #47636）、RFC 9207 强制实施（Gemini #29117）。MCP 已无处不在；其认证/状态处理尚未变得"无聊"。
- **会话持久性与历史卫生（全部 7 个）。** Codex 跨设备同步（61 👍，讨论区榜首）与历史删除（#20476）；按提示回退（Claude #43755、Qwen #9911）；resume/reload 守护（Gemini #29195、Pi #9222、OpenCode #47629）。
- **语音输入（2 个工具，但有资源投入）。** Codex 正在构建完整的 WebRTC/Opus/Bazel 语音运行时（约 10 个 PR）；OpenCode 有活跃的 voice-MCP 请求（#41413）。下一输入模态的早期信号。

## 4. 差异化分析

| 工具 | 重心 | 目标用户 | 差异化路径 |
|---|---|---|---|
| Claude Code | 代理协作 + 插件平台 | 团队/企业高级用户 | Function Hooks 中间件 RFC（#91870，事实上的 plugin v2）；Agent Teams 编排；每日低调发布 |
| Codex | 多客户端平台（TUI + Desktop + IDE + Web + voice） | ChatChat 订阅用户 | 语音运行时投入、Guardian 安全层、跨设备同步愿景；押注 Windows —— 也承受 Windows 之痛 |
| Gemini CLI | 安全与 token 效率 | 开源、安全意识强的开发者 | 拥抱 bash 亲和性的 OS 原生沙箱；AST 感知工具（#22745）；纪律化的 P1–P3 分诊 |
| Copilot CLI | GitHub/企业原生 | GHEC、组织管理、BYOK 用户 | 数据驻留、组织模型策略对齐、ACP 集成；封闭式开发 |
| OpenCode | 厂商中立 + 托管 Go 套餐 | 多厂商与本地模型用户 | 广泛的厂商注册表（NVIDIA NIM、llmman、Ollama）；计费/计量是当前战场 |
| Pi | 可扩展代理框架 | 扩展作者、路由器高级用户 | 众多厂商适配器（Meta Muse OAuth、LLM Gateway）；基于 delta 的提示投递；基于 Proxy 的 UI 包装 |
| Qwen Code | Web shell 融合与互操作 | 偏好 GUI、多工具用户 | Web Shell 导出、通过 ACP 向外部代理委派（首选 Claude Code）、动态工作流 |

战略上：单一厂商工具在编排广度与客户端覆盖面上竞争；开放/多厂商工具在中立性、本地运行时与协议互操作上竞争。Qwen Code 通过 ACP 向 Claude Code 委派以及 Pi 的多厂商适配器，表明生态正朝向**可组合的代理栈**发展，而非赢家通吃。

## 5. 社区动量与成熟度

- **原始量最高：Codex**（50 issues / 27 PRs / 8 discussions）—— 工程覆盖面最广，但 Windows 积压（WSL 项目创建、DWM 损坏、沙箱 git 失败）是显著拖累。
- **参与密度最高：Claude Code** —— Function Hooks 讨论（118 条评论）与 Team 档位定价 issue（131 👍）显示社区在实质上共同设计路线图；Agent Teams 的缺陷是其信誉风险。
- **最快的纪律化开源迭代：Gemini CLI** —— 每晚节奏、当日合并的安全修复、按优先级标签的分诊。流程成熟度超过其功能成熟度。
- **快速但不稳定：Qwen Code** —— 窗口内三次发布尝试，CI 四次失败；通过发布工程 PR（#10898、#11165）加以弥补。
- **信任承压：OpenCode** —— 工程产出健康（10 PRs），但付费用户报告锁定级的 429、配额计算错误、续订被拒；若不解决将面临流失风险。
- **信号密集但体量小：Pi** —— 量低但架构信号密度高（缓存 delta、扩展 API）；对折腾者有吸引力，尚未主流化。
- **动量存在但透明度不足：Copilot CLI** —— 活跃的 issue 追踪器，零 PR 可见性；1.0.81–1.0.82 回归簇提示发布速度/QA 之间的张力，且缺乏外部评审的减压阀。

## 6. 趋势信号

1. **多代理已进入生产，失败成本是核心故事。** 一例 443,914 token 烧光且零工具调用（Claude #87293）以及 7 小时内 5,400 次无效工具调用（#91242），都是直接的经济损失。在采用编排功能之前，务必要求按运行的 token/成本核算。
2. **提示缓存经济性已是架构层面的事，而非优化点。** 缓存失效缺陷（Claude #82739）、BYOK 缓存静默关闭（Copilot #4720）以及 Pi 的 delta 投递重构，都指向同一方向：缓存稳定的提示设计将区分昂贵代理与廉价代理。BYOK 用户应显式验证 `cached_tokens` 行为。
3. **代理脚手架即攻击面。** resume 时的权限绕过、遥测泄露 shell 命令行（Qwen #11198）、符号链接逃逸、hook RCE —— 应以审视 CI 凭据同等的严格度对待 CLI 代理配置（`.claude/`、skills、hooks）。
4. **协议互操作正在降低锁定。** MCP 的无处不在加上基于 ACP 的跨厂商委派（Qwen → Claude Code），意味着协议原生工具保留选择权；单一栈押注的风险比一个季度前更高。
5. **"CLI" 正成为多面客户端的一面。** 语音运行时（Codex）、桌面应用、Web shell（Qwen）以及遍布各处的 IDE 伴随程序 —— 应将工具视为平台而非终端来评估。
6. **Windows 仍是二等平台**，涉及 Codex、Claude Code 与 OpenCode（WSL 路径缺陷、DWM 损坏、沙箱空白）。Windows 优先的组织应预留平台相邻不稳定性的预算。
7. **计费不透明正在成为流失驱动因素** —— 计量缺陷、套餐不一致、配额黑箱出现在 7 个追踪器中的 4 个（OpenCode、Copilot、Claude、Codex）。用量透明度正成为采购标准，而非锦上添花。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告
**数据截至：** 2026-09-06 | **仓库：** [anthropics/skills](https://github.com/anthropics/skills)

> *注：源数据集中不包含 PR 的评论数，因此 PR 排名基于近期活跃度、影响范围和生态重要性，并与反映社区痛点的 Issues 进行交叉验证。*

---

## 1. 热门 Skills 排名

### 1. [#1298](https://github.com/anthropics/skills/pull/1298) — 修复 `skill-creator`：`run_eval.py` 0% 召回率（Windows + 信号）
**状态：** OPEN | 更新于 2026-06-23
当前队列中杠杆效应最高的 PR。`run_eval.py`（以及消费其输出的描述优化循环）一直报告 `recall=0%`，与 skill 内容无关——参见 [Issue #556](https://github.com/anthropics/skills/issues/556)（12 条评论，7 👍）。该修复涉及评估产物安装、Windows 流读取、触发检测以及并行 worker。在它落地之前，每一次 skill 编写迭代都相当于在噪声上训练。

### 2. [#1628](https://github.com/anthropics/skills/pull/1628) — Hivemind：零成本多智能体编排
**状态：** OPEN | 更新于 2026-08-24
让 Claude Code 将机械性工作委派给运行在免费模型上的无头 [opencode](https://opencode.ai) worker，而 Claude 仍然担任规划者、审核者和合并者。与社区对多智能体模式和 token 经济性日益增长的兴趣高度契合——"昂贵模型的稀缺资源是上下文，而非其智能。"

### 3. [#1367](https://github.com/anthropics/skills/pull/1367) — Self-Audit（v1.3.0）：机械验证 + 四维推理质量门控
**状态：** OPEN | 更新于 2026-07-02
一种通用交付前审计机制，先机械验证每一个声称的输出文件，再按损伤严重度优先级顺序运行推理质量审计。直接呼应了 [Issue #1385](https://github.com/anthropics/skills/issues/1385) 中的提案。跨任何技术栈都有很高的适用性。

### 4. [#83](https://github.com/anthropics/skills/pull/83) — `skill-quality-analyzer` + `skill-security-analyzer`（marketplace 元技能）
**状态：** OPEN | 更新于 2026-01-07
两个用于从结构/文档和安全两个维度评估其他 Skills 的元技能。是对 [Issue #492](https://github.com/anthropics/skills/issues/492)（43 条评论——社区讨论最多的话题）最直接的回应，该 issue 重点指出了通过 `anthropic/` 命名空间滥用信任边界的问题。

### 5. [#1627](https://github.com/anthropics/skills/pull/1627) — Buffer API Agent Skill（通过 GraphQL 进行社交媒体排期）
**状态：** OPEN | 更新于 2026-09-05
基于 Buffer GraphQL API 构建的可移植社交媒体排期/分析技能。设计为可跨多种智能体框架（Claude、Cursor、Codex、n8n 等）使用。工作流价值高，职责边界清晰。

### 6. [#514](https://github.com/anthropics/skills/pull/514) — 文档排版技能
**状态：** OPEN | 更新于 2026-03-13
针对 AI 生成文档的排版质量控制（孤行换行、寡妇段落、编号错位）。影响 Claude 产出的每一份文档。

### 7. [#486](https://github.com/anthropics/skills/pull/486) — ODT（OpenDocument Text）技能
**状态：** OPEN | 更新于 2026-04-14
填补了官方 skills 集合中 ODF/LibreOffice 的空白。涵盖创建、模板填充以及 ODT↔HTML 解析。

### 8. [#723](https://github.com/anthropics/skills/pull/723) — 测试模式技能
**状态：** OPEN | 更新于 2026-04-21
全面的测试栈：Testing Trophy、单元测试、React 组件测试等。面向开发者的技能，框架适用性广泛。

---

## 2. 社区需求趋势

**A. Skill 基础设施 / 元层（最强信号）。** [#492](https://github.com/anthropics/skills/issues/492)（43 条评论）推动了社区 skill 之上安全/质量门控的需求；[#83](https://github.com/anthropics/skills/pull/83)、[#1367](https://github.com/anthropics/skills/pull/1367) 和 [#1385](https://github.com/anthropics/skills/issues/1385) 都致力于构建"审计 skill 的 skill"。

**B. 多智能体编排与记忆压缩。** [#1628](https://github.com/anthropics/skills/pull/1628)（Hivemind）和 [#1329](https://github.com/anthropics/skills/issues/1329)（压缩记忆）反映出社区正转向通过 skill 降低 token 开销并协调子智能体。

**C. 分发与生命周期管理。** [#228](https://github.com/anthropics/skills/issues/228)（16 条评论，8 👍——点赞比最高）要求在 Claude.ai 中实现组织级 skill 共享；[#62](https://github.com/anthropics/skills/issues/62)（10

---



</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-06

## 今日要点

过去 24 小时内没有新版本发布，但仓库活动非常活跃，有 **27 个 PR 和 50 个更新的 issue**，主要集中在 Windows 平台 bug，以及在 Windows、macOS 和 Linux 上基于 Bazel 交付**原生语音运行时/SDK 基础设施**的协同推进。长期存在的社区痛点——多仓库工作区（32 👍）、Windows WSL 沙箱化以及缺失的子代理遥测——持续获得最高互动量。

---

## 发布

*过去 24 小时内无新版本发布。*

---

## 热门 Issue

1. **[#26338](https://github.com/openai/codex/issues/26338) — 支持包含多个 Git 仓库的父工作区**（12 条评论，**32 👍**）
   一个长期存在、高赞数的增强请求：Codex App 当前强制一个工作区对应一个 Git 仓库，阻碍了 monorepo 相关的使用流程。与 #14218 和 #15168 一起被反复提出。

2. **[#41463](https://github.com/openai/codex/issues/41463) — Windows + WSL：无法创建项目（AbsolutePathBuf 在反序列化时缺少基础路径）**（31 条评论，**20 👍**）
   在 Codex Desktop `26.825.4187.0` 上对 Windows/WSL2 用户是硬性阻塞——由于 app-server 桥接层中的路径处理 bug，项目无法初始化。

3. **[#34227](https://github.com/openai/codex/issues/34227) — Windows 宠物挂件点击区域错位**（28 条评论）
   外观/UX bug：桌面动画吉祥物的可点击热区会随时间逐渐偏离可见图像——削弱了用户对挂件交互的信任。

4. **[#31073](https://github.com/openai/codex/issues/31073) — Windows 原生沙箱：Git HTTPS 远程操作失败**（20 条评论）
   本地 git 在 Codex 内可用，但任何通过 HTTPS 的 `git fetch/push/clone` 都会让沙箱崩溃——是 Windows 原生开发者的关键能力缺口。

5. **[#39280](https://github.com/openai/codex/issues/39280) — macOS Chrome 浏览器使用：策略校验拦截实际页面操作**（18 条评论，5 👍）
   内置 Chrome 扩展可以列出并认领标签页，但每个实际页面交互在到达 Chrome 之前就被拒绝——实质上禁用了 macOS 上的浏览器使用功能。

6. **[#42215](https://github.com/openai/codex/issues/42215) — Windows ChatGPT Work：项目上下文在文件系统阶段同步失败**（15 条评论）
   已有的 ChatGPT Projects（23 个文件）无法再启动本地 Work 聊天——是 Windows MSIX 版本 `26.825.6671.0` 上重度用户的回退问题。

7. **[#20476](https://github.com/openai/codex/issues/20476) — 能够删除/清空 Codex Web 对话历史**（7 条评论，**15 👍**）
   涉及隐私的功能请求：Web 对话持久存在并同步到 Codex App，但没有可以清除它们的 UI。

8. **[#32283](https://github.com/openai/codex/issues/32283) — 子代理面板不再显示模型或推理力度**（5 条评论，**15 👍**）
   Codex Desktop `26.707.3748.0` 的回退问题；用户无法看到每个子代理正在运行的模型。#32125 和 #35027 也反映了同样问题。

9. **[#39933](https://github.com/openai/codex/issues/39933) — Windows IDE 扩展：`helper_unknown_error: setup refresh had errors`**（12 条评论）
   Windows 上的 VS Code 扩展 `26.818.31338` 无法执行任何命令，阻塞了所有 IDE 嵌入式工作流。

10. **[#40531](https://github.com/openai/codex/issues/40531) — 桌面应用在 Windows 11 上破坏 DWM 合成器状态**（11 条评论）
    运行 1–3 小时后，Codex 桌面应用会触发系统级的鼠标/窗口卡顿，**关闭应用后仍然存在**——是严重的系统稳定性问题。

---

## 关键 PR 进展

1. **[#43120](https://github.com/openai/codex/pull/43120) — 为 TUI 会话命令添加托管 worktree 创建**
   引入 `/worktree`，并让 `/new` 和 `/fork` 提供当前 checkout 与新 worktree 的选项，可附带会话名称——TUI 体验的一次重大升级。

2. **[#43113](https://github.com/openai/codex/pull/43113) — 通过 app server 持久化子代理与内存的开启选择**
   将子代理/内存提示通过服务器配置写入路由，使得选项在新会话之间被正确保留；针对子代理面板的反馈作出响应。

3. **[#43178](https://github.com/openai/codex/pull/43178) — 在后台迁移启用期间允许受保护的旧版 resume**
   在后台滚动迁移期间重新启用 TUI 的旧版缓存 resume 快捷方式，修复工作流中断。

4. **[#43177](https://github.com/openai/codex/pull/43177) — 新启动的 TUI 使用服务器模型默认设置**
   在全新启动时复用服务器生效的模型/推理设置，而不是过时的启动缓存；消除配置分歧窗口。

5. **[#43147](https://github.com/openai/codex/pull/43147) — 在会话启动时按模型能力对实验性上下文进行门控**
   在启用实验性上下文前添加模型能力检查；防止子会话继承父会话的 token 预算激活。

6. **[#43110](https://github.com/openai/codex/pull/43110) — 在对话历史中记录推理力度变更（位于特性开关后）**
   为 `use_responses_lite` 增加 `reasoning_effort_override` 特性，并附加一个受信任的 `configuration_update` 事件——提升滚动发布的可审计性。

7. **[#43104](https://github.com/openai/codex/pull/43104) — 将 Guardian 线程上下文移入 `guardianv2` 配置**
   将 `features.guardian_thread_context` 重命名为 `features.guardianv2.thread_context`；默认关闭，控制用于同步/异步 Guardian 的线程自有上下文。

8. **[#43097](https://github.com/openai/codex/pull/43097) — 添加由辅助函数支持的可实时使用的 WebRTC 会话 API**
   引入 `RealtimeWebrtcSession`，提供可克隆的句柄用于启动、SDP 协商、音频控制、电平表与错误上报——为语音会话奠定基础。

9. **[#43100](https://github.com/openai/codex/pull/43100) — 为语音主机添加有界的入站 Opus RTP 处理**
   将未处理媒体上限设为 64 个包/2 MiB，每包 64 KiB；在不使队列内存翻倍的前提下保留到达时间戳——对语音稳定性至关重要。

10. **[#43144](https://github.com/openai/codex/pull/43144) — 为原生语音库添加 Windows MSVC Bazel 构建目标**
    与 #43126、#43125、#43121、#43117、#43114、#43111、#43109、#43102、#43099 一起，是一项协同工作，旨在通过 Bazel 工具链让 Windows MSVC、macOS 以及 Linux GNU 2.28 上的原生语音构建具备可复现性。

---

## 热门讨论

### Ideas

- **[#14067](https://github.com/openai/codex/discussions/14067) — Codex 线程与会话上下文跨设备同步**（10 条评论，**61 👍**）
   近期窗口内获赞最多的讨论。用户希望自己的 Codex 线程与会话上下文能跨机器跟随——目前被锁定在本地环境中。

- **[#37693](https://github.com/openai/codex/discussions/37693) — 在用户消息之间跳转的键盘快捷键**（1 条评论，3 👍）
   #28073 的配套讨论——提出"跳转到上一条/下一条用户消息"的锚点，用于在长对话中导航。

- **[#28073](https://github.com/openai/codex/discussions/28073) — 可点击的用户提示导航器**（1 条评论，3 👍）
   在单个对话内提供用户提示的可视化索引/侧边栏。

- **[#42703](https://github.com/openai/codex/discussions/42703) — 长程上下文：历史检索是否可能变得自指？**（1 条评论，1 👍）
   对新 `history` / `notes` / `new_context` 流程可能在新上下文窗口之间产生递归陈旧性的深思。

- **[#42992](https://github.com/openai/codex/discussions/42992) — OpenClaw 子代理会话显示为顶层侧边栏聊天**（1 条评论，1 👍）
   在 macOS Codex Desktop 上，内部的 OpenClaw 子会话污染了项目侧边栏，且部分会话无法归档。

### Q&A

- **[#40740](https://github.com/openai/codex/discussions/40740) — 滚动发布追踪是否会捕获产生 Declined 执行状态的路径？**（2 条评论，1 👍）
   调查为何 `ExecApprovalRequest` / `ApplyPatchApprovalRequest` / `GuardianAssessment` 被排除在滚动发布持久化之外——是一个小众但重要的可追溯性问题。

### Show and tell

- **[#41157](https://github.com/openai/codex/discussions/41157) — CodexFuse 1.2.0 — Codex 速率限制的本地 Windows 仪表板**（1 条评论，1 👍）
   一款非官方的免安装 Win32 仪表板（PT/EN），可视化展示已用/可用配额、下次重置时间与小时用量——直接回应速率限制可见性的痛点。

- **[#43224](https://github.com/openai/codex/discussions/43224) — NULLYARD — 附带静态设置指南的公共 MCP 公告板**（0 条评论，1 👍）
   由运营者创建的公共纯文本 MCP 公告板，提供免登录的技能与集成指南。

---

## 功能请求趋势

- **多仓库 / monorepo 工作区**——本周期获赞最多的增强请求（#26338，32 👍），相关请求还包括 #14218 和 #15168。
- **跨设备会话同步**——#14067 获得 **61 👍**，是本窗口内获赞最多的讨论。
- **子代理可观测性**——多个 issue（#32283、#32125、#35027、#43113 PR）一致要求按子代理展示模型与推理力度。
- **对话整理**——具备删除、归档与导航长对话历史的能力（#20476、#37693、#28073）。
- **配额透明度与优雅停机**——#24927（intelliJ）和 #43222（quota

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-06

## Today's Highlights

The ecosystem is heavily focused on **subagent reliability and sandboxing**: multiple P1 bugs (#22323, #21409, #21983) expose incorrect termination reporting, indefinite hangs, and platform-specific failures (Wayland), while a major enhancement proposal (#19873) introduces zero-dependency OS sandboxing to leverage Gemini 3's native bash affinity. Security hardening continues to dominate merged work, including Windows sandbox validation, MCP OAuth RFC 9207 enforcement, and several docs/symlink discovery fixes.

---

## Releases

**v0.60.0-nightly.20260906.g85aca163f** — Routine nightly build. View the full diff against [v0.60.0-nightly.20260905](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260905.g85aca163f...v0.60.0-nightly.20260906.g85aca163f). No major changelog notes published.

---

## Hot Issues

1. **#22323 — Subagent recovery after MAX_TURNS is reported as GOAL success** (p1, 13 comments)
   The `codebase_investigator` subagent reports `status: "success"` and `Termination Reason: "GOAL"` even after hitting the maximum turn limit before any analysis. This silently hides interruptions and misleads downstream orchestration. — [Link](https://github.com/google-gemini/gemini-cli/issues/22323)

2. **#19873 — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing** (p2, 9 comments)
   Large effort to embrace Gemini 3's native bash training by chaining POSIX utilities (`grep`, `sed`, `awk`) inside sandboxed execution with intent-aware routing. Significant architectural implications for security/UX. — [Link](https://github.com/google-gemini/gemini-cli/issues/19873)

3. **#21409 — Generalist agent hangs indefinitely** (p1, 8 comments, 8 👍)
   Whenever the CLI defers to the generalist subagent on simple tasks (e.g., folder creation), it hangs forever — users report waiting an hour. Explicit "no subagents" instructions resolve it, pointing to a delegation/routing bug. — [Link](https://github.com/google-gemini/gemini-cli/issues/21409)

4. **#22745 — EPIC: Assess AST-aware file reads, search, and mapping** (p2, 7 comments)
   Tracks investigations into AST-aware tooling to precisely bound method reads, navigate codebases more efficiently, and reduce token noise. Likely precursor to `codebase_investigator` upgrades. — [Link](https://github.com/google-gemini/gemini-cli/issues/22745)

5. **#21968 — Gemini does not use skills and sub-agents enough** (p2, 6 comments)
   Users observe that even with explicit `gradle`/`git` skill descriptions, the model rarely invokes custom skills or subagents without direct prompting — surfacing a skill-discovery/prompting gap. — [Link](https://github.com/google-gemini/gemini-cli/issues/21968)

6. **#26525 — Auto Memory deterministic redaction and reduced logging** (p2, 5 comments)
   Auto Memory currently relies on the extractor model to redact secrets after content is already in context. Proposal adds deterministic redaction and tightens logging to prevent sensitive data exposure. — [Link](https://github.com/google-gemini/gemini-cli/issues/26525)

7. **#25166 — Shell command stuck on "Waiting input" after completion** (p1, 4 comments, 3 👍)
   Common, easy-to-reproduce hang: simple shell commands finish but the CLI keeps the prompt in "Awaiting user input" state. High user-frequency P1. — [Link](https://github.com/google-gemini/gemini-cli/issues/25166)

8. **#21983 — Browser subagent fails on Wayland** (p1, 4 comments)
   `browser_agent` exits with `Termination Reason: GOAL` on Wayland despite failure. Platform-specific display-server bug affecting Linux desktop users. — [Link](https://github.com/google-gemini/gemini-cli/issues/21983)

9. **#22232 — Browser agent resilience: session takeover and lock recovery** (p3, 4 comments)
   `BrowserManager` currently fail-fasts on locked persistent profiles. Proposal adds automatic session takeover to recover from orphaned/locked Chromium processes. — [Link](https://github.com/google-gemini/gemini-cli/issues/22232)

10. **#20079 — Symlinked `~/.gemini/agents/*.md` not recognized** (p2, 4 comments)
    Dotfile-managed users symlinking agent definitions are silently ignored. Simple file-discovery fix with broad impact for power users. — [Link](https://github.com/google-gemini/gemini-cli/issues/20079)

---

## Key PR Progress

1. **#29184 — Validate git args in Windows sandbox** (open, p1, security)
   Closes a silent-confirmation bypass: `git diff --output=<path>` ran without prompts in default mode on Windows because the family was treated as read-only. Arg-level validation now blocks destructive flags. — [Link](https://github.com/google-gemini/gemini-cli/pull/29184)

2. **#29106 — Flush final SSE event on EOF without trailing blank line** (closed)
   Fixes silent loss of `finishReason`/usage metadata when streams truncate or pass through non-conformant proxies. — [Link](https://github.com/google-gemini/gemini-cli/pull/29106)

3. **#29117 — Enforce RFC 9207 issuer identification in MCP OAuth** (closed)
   Adds `iss` parameter validation in OAuth flow to prevent unintended token routing and ensure response-origin consistency. — [Link](https://github.com/google-gemini/gemini-cli/pull/29117)

4. **#29195 — Degrade non-array history instead of crashing `/resume`** (open, p2)
   `loadCheckpoint` now gracefully handles valid JSON with a non-array `history` instead of throwing a raw `TypeError` on resume. — [Link](https://github.com/google-gemini/gemini-cli/pull/29195)

5. **#29098 — Keep `useInputHistoryStore` state updaters pure** (open, p1)
   Moves `setPastSessionMessages()` and `recalculateHistory()` out of the `setCurrentSessionMessages()` updater — React StrictMode was double-invoking impure updaters. — [Link](https://github.com/google-gemini/gemini-cli/pull/29098)

6. **#29205 — Submit MCP prompt text without JSON encoding** (open, p2)
   `McpPromptLoader` no longer wraps prompt response text in JSON, preserving embedded quotes/newlines verbatim. Adds regression test. — [Link](https://github.com/google-gemini/gemini-cli/pull/29205)

7. **#29125 — Convert hook timeout from seconds to milliseconds** (open, p2)
   Fixes a units mismatch in the Claude Code → Gemini CLI hooks migration (default 60s was being read as 60ms). — [Link](https://github.com/google-gemini/gemini-cli/pull/29125)

8. **#29163 — Prevent crash during auth inside Git repositories** (open, p1, security)
   `useGitBranchName` was crashing in macOS Seatbelt/restricted-permission environments where `.git` is unreadable. Now gracefully handles the failure. — [Link](https://github.com/google-gemini/gemini-cli/pull/29163)

9. **#28967 — Prevent clearing terminal scrollback on static refresh** (closed)
   `refreshStatic()` previously emitted `clearTerminal` on Linux terminals, wiping user scrollback. Restricts clearing to alternate-buffer mode only. — [Link](https://github.com/google-gemini/gemini-cli/pull/28967)

10. **#29126 — Mount `express.json()` before A2A SDK routes** (open)
    Fixes `req.body` being undefined on A2A `POST /` JSON-RPC parsing by reordering middleware in `packages/a2a-server/src/http/app.ts`. — [Link](https://github.com/google-gemini/gemini-cli/pull/29126)

---

## Feature Request Trends

- **AST-aware codebase tools** (#22745, #22746) — Multiple issues coalesce around replacing firehose file reads with surgical, AST-aware navigation. Signals appetite for tools like `tilth` or `glyph` integration.
- **Better subagent utilization** (#21968, #22598, #22323, #21763) — The community wants Gemini to invoke skills/subagents more aggressively, with visible trajectories (`/chat share`) and richer bug-report context.
- **Auto Memory hardening** (#26525, #26523, #26522, #26516) — A four-issue cluster indicates Auto Memory is a priority area, with focus on deterministic redaction, inbox validation, and avoiding infinite low-signal retries.
- **Sandboxing without dependencies** (#19873) — Replacing heavyweight sandbox infrastructure with OS-native primitives to embrace the model's bash affinity.
- **Persistent file-based task tracking** (#18836, #21000) — Continued push to retire in-context `WriteToDo` in favor of native CRUD file tools to fight context rot.
- **Agent self-awareness** (#21432) — The model should accurately surface its own CLI flags, hotkeys, and execution patterns to users.

---

## Developer Pain Points

- **Subagent hangs and silent failures** — Multiple P1s (#21409, #22323, #21983) show subagents either hanging indefinitely or reporting `GOAL` success after `MAX_TURNS`, undermining trust in delegation.
- **Shell command lifecycle bugs** — #25166's stuck "Awaiting user input" is a high-frequency frustration with simple shell invocations.
- **Tool count ceiling** — #24246: >400 tools yields a 400 error; users want smarter in-scope tool limiting.
- **Workspace pollution** — #23571: When shell execution is restricted, the model scatters tmp scripts across directories, complicating cleanup for clean commits.
- **Skills/subagent discovery gaps** — #21968, #20079 (symlinks ignored), #21983: Users repeatedly find that custom skills, symlinked agents, or browser subagents aren't being recognized or invoked.
- **Interactive prompt deadlocks** — #22465: Agents get stuck on interactive scaffolding prompts like `npm create vite`; users want behavioral-eval-driven prompt hardening.
- **Auto Memory secret-handling** — #26525/#26522: Content reaches model context before redaction, and low-signal sessions retry forever, both raising security and reliability concerns.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI — 社区摘要
**日期：** 2026-09-06

---

## 1. 今日要点

过去 24 小时内没有新版本发布，但 issue 跟踪器活动频繁 —— 共更新了 15 个 issue，其中包括几起与 **1.0.81–1.0.82** 版本线相关的严重回归（ACP 权限流程、GHEC 数据驻留认证、WSL2 内存）。两个此前已关闭的关于企业模型可用性和 GHEC 认证的报告表明团队正在积极梳理 1.0.82 的连锁问题，而一批新出现的 UX/IO 类 bug（#4735、#4738、#4706）则暴露出提示渲染和工具调用健壮性方面的短板。

---

## 2. 版本发布

*过去 24 小时内无新版本发布。*

---

## 3. 热门 Issue

1. **[#4695 — HTTP 服务器的 MCP OAuth 令牌无法跨会话可靠复用](https://github.com/github/copilot-cli/issues/4695)** *(open, 5 条评论)*
对于使用 OAuth PKCE（`clientSecret: null`）的 HTTP 类型 MCP 服务器，Copilot CLI 会重复生成缓存键条目，而不是复用仍有效的令牌，迫使用户反复重新走认证流程。对那些将远程 MCP 服务器串联进日常工作流的人高度相关。

2. **[#4692 — CLI 不遵循企业默认模型](https://github.com/github/copilot-cli/issues/4692)** *(open, 4 条评论)*
`MAI-Code-1.1-Flash`（推测其他租户默认模型也一样）在 VS Code 和 GitHub Desktop 中可用，但 CLI 会提示 "not available for this account; using the default model instead"。相比 GUI 客户端，这是一次明确的企业就绪度回归。

3. **[#4527 — 自 1.0.81-1 起 `copilot -p` 在 GHEC 数据驻留场景返回 401](https://github.com/github/copilot-cli/issues/4527)** *(closed, 4 👍)*
非交互模式命中 `api.githubcopilot.com` 而非 `<tenant>.ghe.com` 的租户端点，交互模式则正常。本周期已关闭 —— 对 EU/GHEC 数据驻留客户来说可能是一次重要修复；值得在下一份更新日志中确认。

4. **[#4537 — ACP 模式下工具调用再次自动通过（#845 的回归）](https://github.com/github/copilot-cli/issues/4537)** *(open, 2 👍)*
自 1.0.81-1 起 `session/request_permission` 不再被发送，导致 shell/文件编辑操作在无人值守下直接执行。对使用 `--acp` 对接自定义前端的用户而言，这是一次安全相关的关键回归。

5. **[#4272 — 新模型灰显且无法选择](https://github.com/github/copilot-cli/issues/4272)** *(closed, 3 👍)*
模型被组织策略锁定，UI 上没有任何启用入口。本周期关闭；又一处 1.0.82 时期的企业相关修复。

6. **[#3894 — `agentStop` 在子代理轮次触发导致 `/review` 失效](https://github.com/github/copilot-cli/issues/3894)** *(open, 1 👍)*
自定义 `agentStop` hook（例如 digivolution 插件）也会在子代理轮次触发，导致 `/review` 等命令无法正常返回。对基于代理生命周期构建的插件作者而言十分重要。

7. **[#4738 — `ask_user` 表单在提前按 Enter 时丢弃已输入内容](https://github.com/github/copilot-cli/issues/4738)** *(open)*
高严重性的 UX 数据丢失问题：在征询表单中过早按下 Enter 会静默清空正在输入的内容。报告者列举了自动保存/恢复以及"Enter 插入换行"作为可能的修复方向。

8. **[#4706 — 工具/函数调用间歇性输出格式错误的调用标记](https://github.com/github/copilot-cli/issues/4706)** *(open)*
由 Copilot CLI 代理自身自报（Windows/PowerShell 上的 Claude Opus 4.8，1.0.82）：偶发的 `court` / `<invoke>` 片段会导致调用静默 no-op。提醒我们模型发出的工具调用在实际使用中仍然很脆弱。

9. **[#4735 — 工具调用前的助手正文被折叠进 "Thought for Ns"](https://github.com/github/copilot-cli/issues/4735)** *(open)*
本应显示在工具调用前的实质性正文，被压缩进折叠的推理区域，导致用户看不到输出。对依赖可见解释的用户影响显著。

10. **[#4720 — 1.0.82 中 BYOK 静默关闭提示缓存（约 5 倍成本）](https://github.com/github/copilot-cli/issues/4720)** *(open)*
1.0.82 的 BYOK 请求遗漏了提示缓存声明，导致提供方每轮都报告 `cached_tokens=0`。本批次中影响最大的单一 issue —— 对 BYOK 用户直接产生成本放大效应。

**值得一提的次热门：** [#4694 WSL2 在 Opus 5 高强度下 RSS 约 31 GB / CPU 约 57%](https://github.com/github/copilot-cli/issues/4694)、[#4733 触发 `max_output_tokens` 时事件丢失（BYOK）](https://github.com/github/copilot-cli/issues/4733)、[#4734 desktop 2.98.0 / runtime 1.1.15 之后所有会话出现 "Worktree missing"](https://github.com/github/copilot-cli/issues/4734)、[#4736 Ctrl+E 应接受内联自动补全](https://github.com/github/copilot-cli/issues/4736)、[#4737 "thx copilot"](https://github.com/github/copilot-cli/issues/4737)。

---

## 4. 关键 PR 进展

*过去 24 小时内无 PR 更新。*

---

## 5. 热门讨论

*本次摘要未提供讨论数据。*

---

## 6. 功能请求趋势

综合今天更新的 issue，最强烈的功能方向如下：

- **Emacs/终端风格键绑定对齐** —— Ctrl+E 接受内联建议（#4736）反映出在提示 UI 中对熟悉的 readline 风格快捷键的更广泛期待。
- **更安全的征询/IO 流程** —— 为 `ask_user` 表单加入草稿、自动保存以及明确的"插入换行"语义（#4738）；在工具调用附近更清晰地分隔推理区域与面向用户的正文（#4735）。
- **更可靠的 BYOK 经济性** —— 显式的提示缓存声明（#4720）以及一致的 `max_output_tokens` 截断/事件发射（#4733）是 BYOK 用户呼声最高的两个诉求。
- **插件/代理生命周期清晰化** —— 区分父代理与子代理的 stop（#3894），以便自定义 hook 选择性订阅正确的作用域。
- **更深的平台一致性** —— 在企业托管默认值（#4692）以及稳定的 MCP OAuth 会话复用（#4695）方面，与 VS Code / Desktop 进一步对齐。

---

## 7. 开发者痛点

- **1.0.82 回归扎堆：** ACP 自动通过（#4537）、GHEC 数据驻留 401（#4527）、企业模型灰显（#4272）、工具调用标记格式错误（#4706）、WSL2 内存暴涨（#4694）—— 1.0.82 版本线明显处于社区密切关注之下。
- **BYOK 的成本与可预期性：** #4720 和 #4733 叠加意味着 BYOK 用户既要每轮多付 5 倍成本，又可能在截断时丢失中间事件，使得该模式在长会话中更难被信任。
- **UX 数据丢失与信任危机：** `ask_user` 提前按 Enter 的 bug（#4738）以及助手正文被隐藏（#4735）正在侵蚀用户对提示 UI 的信心。
- **跨客户端不一致：** 企业默认模型不匹配（#4692）反复出现 —— 在组织托管策略层面，CLI 仍被视为 VS Code/Desktop 的二等公民。
- **非理想路径下的可靠性：** OAuth 重复认证抖动（#4695）、desktop 升级后 Worktree 缺失（#4734）以及子代理 hook 误触发（#3894），都说明会话生命周期处理仍有明显短板。

---

*基于 `github.com/github/copilot-cli` 在 2026-09-06 的活动生成。24 小时窗口内无版本发布或 PR 活动；本摘要聚焦于与 1.0.81–1.0.82 版本线相关的 issue 趋势与回归。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区动态 — 2026-09-06

## 今日要点
OpenCode Go 订阅相关的问题在 issue 跟踪器中集中爆发，多位付费用户反馈持续遭遇 HTTP 429 速率限制、月度用量统计错误（按百分比累加而非按美元限额计算）以及续费后周配额未刷新导致服务中断。工程方面，团队正在推出一批稳定性修复——MCP OAuth 生命周期日志、markdown agent 提示词解析、会话期间的位置保留以及 provider 繁忙重试处理——表明当前重点在强化会话生命周期与 provider 可靠性。

## 版本发布
过去 24 小时内无新版本发布。

## 热门 Issue

1. **[#45278](https://github.com/anomalyco/opencode/issues/45278) — 连续 3 个月后付款被拒（10 条评论，👍2）**
   一位付费用户反馈已连续成功扣款 3 个月后突然出现信用卡拒付。该 issue 信号价值高，直接影响续费与留存，用户侧并未更改银行卡或银行账户。

2. **[#10504](https://github.com/anomalyco/opencode/issues/10504) — Termux/Android aarch64 二进制运行失败（10 条评论，👍7）**
   由于解释器错误以及可执行文件未启用 PIE，Termux 原生运行失败。本榜单中 👍 与评论比最高，对移动端/Linux-on-mobile 开发者影响显著。

3. **[#47613](https://github.com/anomalyco/opencode/issues/47613) — Go 订阅：持续 HTTP 429（5 条评论）**
   付费 Go 用户被锁定约 3 天，每次请求均返回 429，且约 12 小时的 retry-after 不断重置。疑似后端限流或配额统计存在 bug。

4. **[#41413](https://github.com/anomalyco/opencode/issues/41413) — 功能请求：语音输入 MCP 服务器（5 条评论）**
   请求一个面向终端的语音输入层，因为 TUI 工具缺少可点击的麦克风入口。目标是与 GUI 助手以及无障碍体验对齐。

5. **[#39570](https://github.com/anomalyco/opencode/issues/39570) — TUI 在多次 MCP 操作中崩溃（5 条评论）**
   在 Windows git-bash 上的 v1.18.9 中，连续调用 `gitlab_list_merge_requests` 会导致 TUI 退化。指向 MCP 批处理中的并发/渲染路径问题。

6. **[#30310](https://github.com/anomalyco/opencode/issues/30310) — opencode-go qwen3.7-max 间歇性 500（4 条评论）**
   热门模型出现 provider 端不稳定，连简单的纯文本请求也会中断。多次反馈表明上游可能存在未被标记的回归。

7. **[#47547](https://github.com/anomalyco/opencode/issues/47547) — Go 因按模型百分比累加而卡在 100% 用量（4 条评论，👍1）**
   配额显示将各模型百分比相加，而非按金额与 60 美元上限比较，导致用户被误封。属于纯粹的计费统计 bug。

8. **[#35112](https://github.com/anomalyco/opencode/issues/35112) — 6MB 请求体积拦截图像输入（4 条评论，👍1）**
   Qwen3.7Plus 上硬编码的请求体积上限拒绝了合法的多模态使用，限制了 Go 档位的关键宣传能力。

9. **[#46685](https://github.com/anomalyco/opencode/issues/46685) — 子代理事件在父会话上报有误（3 条评论）**
   当子会话发出 `permission.asked`/`question.asked`/`session.error` 时，外部集成丢失对根会话进度的可见性，影响 SDK 与自动化可靠性。

10. **[#44799](https://github.com/anomalyco/opencode/issues/44799) — 含 `/` 的模型 ID 无法解析（NVIDIA NIM）（3 条评论）**
    含厂商前缀斜杠的注册表键（例如 `nvidia/nemotron-3-ultra-550b-a55b`）即便解析器提示也无法引用，导致所有 NVIDIA NIM 模型均不可用。

## 重点 PR 进展

1. **[#47630](https://github.com/anomalyco/opencode/pull/47630) — refactor(core): 统一文件系统访问策略**
   将文件系统工具中重复的路径/外部目录权限模板集中化，并重构 `LocationMutation`，使解析与权限资源在读取、搜索和变更场景下行为一致。

2. **[#47636](https://github.com/anomalyco/opencode/pull/47636) — fix(core): 记录 MCP OAuth 与凭据生命周期**
   新增 MCP OAuth 拒绝与凭据持久化相关日志，解决此前反复出现却无诊断信息的 `needs_auth` 重新授权循环。

3. **[#47595](https://github.com/anomalyco/opencode/pull/47595) — feat: 启用/禁用 skills 与偏好 API**
   新增持久化、服务端范围的 skill 启用/禁用偏好，并提供 TUI 控件。延续 #43536 中先前的 capability-preference 工作。

4. **[#47635](https://github.com/anomalyco/opencode/pull/47635) — fix(opencode): 解析 markdown agent 提示词**
   修复 frontmatter 中 `prompt:` 键被静默丢弃以及 `{file:...}`/`{env:...}` 占位符未替换的问题。关闭 [#47616](https://github.com/anomalyco/opencode/issues/47616)。

5. **[#47629](https://github.com/anomalyco/opencode/pull/47629) — fix(core): 在闲置驱逐前中断会话** *(已关闭)*
   防止 60 分钟闲置期限在会话仍在等待问题/权限回复时驱逐某个位置的服务图。

6. **[#47628](https://github.com/anomalyco/opencode/pull/47628) — docs: 新增 llmman provider 配置**
   将 `llmman`（以 OCI 分发的本地模型运行时）加入 providers.mdx，与 llama.cpp、LM Studio、Ollama 并列。

7. **[#47626](https://github.com/anomalyco/opencode/pull/47626) — fix(core): 会话执行中保留位置** *(已关闭)*
   与 #47629 配套修复，防止空闲清理与仍在使用旧表单服务的运行中工具发生竞争时表单服务被卸载。

8. **[#47611](https://github.com/anomalyco/opencode/pull/47611) — 重试 provider-busy 消息** *(已关闭/合并方向)*
   将纯文本的 provider-busy 错误（"no eligible device"、"no available device"）通过 `SessionRetry` 视为可重试，使用现有退避策略并尊重 `Retry-After`，以避免 headless 会话陷入死锁。

9. **[#47554](https://github.com/anomalyco/opencode/pull/47554) — fix(core): 允许读取已注册 skill 资源**
   允许从已安装的 skill 目录（包括软链的 `~/.opencode/skill`）读取附属文件，不再触发无关的外部目录授权提示。

10. **[#47621](https://github.com/anomalyco/opencode/pull/47621) — fix(provider): 不论内容类型均强制块超时**
   移除共享 provider SDK 响应体看门狗上的 `Content-Type` 判定，并将 `wrapSSE` 重命名为 `wrapStream`。修复 [#47605](https://github.com/anomalyco/opencode/issues/47605)。

## 功能请求趋势

- **运行时权限/审批切换。** [#41909](https://github.com/anomalyco/opencode/issues/41909)（`/approve on|off`）与 [#47579](https://github.com/anomalyco/opencode/issues/47579)（`/auto` 斜杠命令）都推动实现 Claude Code 风格的免重启实时权限切换。
- **面向终端工作流的语音输入。** [#41413](https://github.com/anomalyco/opencode/issues/41413) 与生态 PR [#47625](https://github.com/anomalyco/opencode/pull/47625)（`voice-mcp`）表明社区对手势操作与无障碍输入的需求持续存在。
- **TUI 中的文本摘要可展开。** [#47633](https://github.com/anomalyco/opencode/issues/47633) 请求支持可折叠/可展开的摘要，以应对长输出。
- **Skill 与 agent 编写体验。** [#47595](https://github.com/anomalyco/opencode/pull/47595)（skill 启用/禁用）和 [#47635](https://github.com/anomalyco/opencode/pull/47635)（frontmatter `prompt:` 解析）反映出社区正在编写更复杂的 agent 流水线，并希望拥有一流的控制面。
- **本地/自托管 provider 接入。** `llmman` 文档（#47628）以及持续出现的生态条目（如 #47594 中的 `opencode-memory-pro`）显示对可插拔本地运行时与记忆层有强烈兴趣。

## 开发者痛点

- **OpenCode Go 可靠性与用量计量。** 最大的单一投诉集群：持续 429（[#47613](https://github.com/anomalyco/opencode/issues/47613)、[#47598](https://github.com/anomalyco/opencode/issues/47598)、[#47634](https://github.com/anomalyco/opencode/issues/47634)）、配额显示计算错误（[#47547](https://github.com/anomalyco/opencode/issues/47547)、[#47614](https://github.com/anomalyco/opencode/issues/47614)）、请求体积限制（[#35112](https://github.com/anomalyco/opencode/issues/35112)）、Qwen 模型 500 错误（[#30310](https://github.com/anomalyco/opencode/issues/30310)、[#47620](https://github.com/anomalyco/opencode/issues/47620)）。付费用户无法可靠使用其订阅。
- **Provider 集成脆弱。** 上游校验不匹配（[#47619](https://github.com/anomalyco/opencode/issues/47619) 中的 `name` 字段长度）以及块超时处理缺口（[#47621](https://github.com/anomalyco/opencode/pull/47621)）导致多供应商环境不稳定。
- **MCP 可靠性。** OAuth 重新授权循环（[#47636](https://github.com/anomalyco/opencode/pull/47636)）以及 MCP 批处理下 TUI 退化（[#39570](https://github.com/anomalyco/opencode/issues/39570)）让 MCP 集成在生产流水线中难以放心使用。
- **TUI 会话/生命周期 bug。** v2 中 Esc 中断失效（[#42960](https://github.com/anomalyco/opencode/issues/42960)）、输入时模型选择器卡住会话（[#47615](https://github.com/anomalyco/opencode/issues/47615)）、翻页时清除选中（[#47632](https://github.com/anomalyco/opencode/issues/47632)）、Mac M5 启动缓慢（[#46976](https://github.com/anomalyco/opencode/issues/46976)）、Linux/Bun standalone v1.18.25 上 SIGILL（[#47037](https://github.com/anomalyco/opencode/issues/47037)）以及会话中途静默挂起（[#47587](https://github.com/anomalyco/opencode/issues/47587)、[#47606](https://github.com/anomalyco/opencode/issues/47606)）。
- **平台覆盖缺口。** Termux/Android aarch64 仍无法原生运行（[#10504](https://github.com/anomalyco/opencode/issues/10504)）。
- **Agent 编写中的意外行为。** frontmatter 被静默忽略（[#47616](https://github.com/anomalyco/opencode/issues/47616)），以及默认从系统提示搜索触发的工具调用风暴浪费 token（[#47627](https://github.com/anomalyco/opencode/issues/47627)）。
- **账单/续费摩擦。** 订阅自动续费被拒，但银行侧无对应原因（[#45278](https://github.com/anomalyco/opencode/issues/45278)）。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区速递 — 2026-09-06

## 今日要闻

社区当前聚焦于 OpenAI Codex、通过 Vercel AI Gateway 接入的 Anthropic 以及 OpenCode Go 的**传输层可靠性与提供商差异**，多个模型认证解析与网关成本/计费核算的修复正在进行中。**架构层面**，围绕栈式 `system-role` / `system message deltas` 工作（mitsuhiko）以及一个带 Muse 订阅 OAuth 的新 Meta 提供商持续推进。一个长期未决的 `openai-codex` TUI 挂起问题（#4945）仍是仓库中讨论最多的话题。

## 版本发布

过去 24 小时内无新版本发布。

## 热门议题

1. **[#4945](https://github.com/earendil-works/pi/issues/4945)** — `openai-codex` / `gpt-5.5` TUI 一直停留在 `Working...`，无任何输出与报错，仅可通过 Escape 恢复。**76 条评论，32 👍，进行中** — 迄今为止流量最高的议题，暗示存在深层的流式状态 Bug。
2. **[#8834](https://github.com/earendil-works/pi/issues/8834)** — 引入可选的 `pi.namespace`，以 `<namespace>:<name>` 的形式统一解析 skills 与 prompt-template。已关闭/无动作，但反映出对包作用域资源命名的强烈需求。
3. **[#9165](https://github.com/earendil-works/pi/issues/9165)** — 通过 OpenRouter 接入的 Claude Opus 5 拒绝接收按消息粒度的 `output_config`。相比 Anthropic 直连提供商是一次回归，影响最常用的模型路由之一。
4. **[#8826](https://github.com/earendil-works/pi/issues/8826)** — 在长时间上游故障（如 `503 Too many open files`）期间，限制 agent 重试退避。一个面向长时运行会话的实用体验改进。
5. **[#8827](https://github.com/earendil-works/pi/issues/8827)** — TUI 中 LaTeX 遗留字体切换（`\rm`、`\bf`、`\it`）会触发整块 raw 回退渲染，阻碍含较多数学内容的 Markdown 正常显示。
6. **[#8617](https://github.com/earendil-works/pi/issues/8617)** — Codex：将图片字节本地存储，改以 ChatGPT 的 `file_id` 引用替代 base64 上传。作者已有可用原型。
7. **[#9212](https://github.com/earendil-works/pi/issues/9212)** — 通过 `vercel-ai-gateway` 接入的 `sonnet-5` 有 13% 的 `edit` 工具调用被截断为 `edits:[{}]`；fable 为 0%。涉及可靠性与成本追踪。
8. **[#9209](https://github.com/earendil-works/pi/issues/9209)** — `github-copilot/gpt-6-astra` 被错误路由到 `/chat/completions` 后被拒。一个具体的提供商目录映射 Bug。
9. **[#8791](https://github.com/earendil-works/pi/issues/8791)** — 在 `ExtensionContext` 上暴露 `ModelRuntime`，用于进程内隔离会话。**4 👍**，已关闭/无动作 — 但需求清晰（扩展构建嵌套 agent）。
10. **[#9226](https://github.com/earendil-works/pi/issues/9226)** — 0.85.1 中 `./client` 与 `./experimental/plugin` 的导出指向尚未发布的 `src/*.ts` 路径，导致消费者出现 `ERR_PACKAGE_PATH_NOT_EXPORTED`。一个阻塞性的打包回归。

## 关键 PR 进展

1. **[#9116](https://github.com/earendil-works/pi/pull/9116)** — `feat(ai): add mid-conversation system messages`。#8998 拆分的第一层；为扩展在运行中注入提示奠定基础，避免重写顶层 prompt。
2. **[#9117](https://github.com/earendil-works/pi/pull/9117)** — `feat(coding-agent): deliver prompt and tool changes as system message deltas`。叠加于 `system-role` 之上；以增量 delta 传递替代完整 prompt 重写（更好的 prompt 缓存）。
3. **[#9233](https://github.com/earendil-works/pi/pull/9233)** — `fix(coding-agent): resolve model auth live instead of from startup snapshot`。修复 `hasConfiguredAuth()` 读取未稳定可用性快照的竞态。
4. **[#9096](https://github.com/earendil-works/pi/pull/9096)** — `feat(ai,coding-agent): add Meta provider with Muse subscription OAuth`。关闭 #7543；包含每日重新签发的 identity token 与「伪」流式（一次性全量输出）等特殊处理。
5. **[#7610](https://github.com/earendil-works/pi/pull/7610)** — `feat(ai): add LLM Gateway and LLM Gateway DevPass providers`。类 OpenRouter 的路由器，作为内置 `openai-completions` 提供商。
6. **[#9137](https://github.com/earendil-works/pi/pull/9137)** — `feat(coding-agent): add Nix flake`。WIP 中，但预示着更广泛的打包支持（NixOS 友好的构建）。
7. **[#9222](https://github.com/earendil-works/pi/pull/9222)** — `fix(coding-agent): reject reload during active session operations`。防止 RPC 模式下「工具执行成功但包装层读取到已失效的 runner」一类错误。
8. **[#9224](https://github.com/earendil-works/pi/pull/9224)** — `fix(ai): clamp OpenRouter :free maxTokens to base model`。修复 `minimax/minimax-m3:free` 因目录虚标上下文窗口而产生的 400 错误。
9. **[#9214](https://github.com/earendil-works/pi/pull/9214)** — `Invoke skills and prompt templates mid-sentence`。关闭 #8457；让 `/skill:name` 与 `/template` 可以在输入任意位置展开，而不仅限于开头。
10. **[#9219](https://github.com/earendil-works/pi/pull/9219)** — `fix(coding-agent): preserve host UI prototype methods and Proxy traps in wrapUIPromptContext`。用基于 Proxy 的包装器取代对象展开（后者会丢失原型方法）。

## 热门讨论

**Ideas**
- **[#9207](https://github.com/earendil-works/pi/discussions/9207)** — *建议：从系统消息中移除「Available tools」段落。* 提议去掉 system prompt 中静态的工具列表，因为工具 schema 已另行传入。**2 👍** — 与正在进行、涉及 prompt 组合的 #9116/#9117 delta-delivery 工作相关。
- **[#9213](https://github.com/earendil-works/pi/discussions/9213)** — *在 README 中嵌入 Agent-Friendly Score 徽章。* Pi 在 agent 友好度评分器上得到 86.2/100；作者提供一个 README 徽章。**1 👍。**

## 功能请求趋势

- **提供商/路由器扩展。** 对更多提供商和路由层有强烈需求：LLM Gateway（#7610）、Meta + Muse OAuth（#9096）、OpenCode Go（#9230/#9237，附带 `x-opencode-session` 头）、Copilot 模型目录修复（#9209）。
- **扩展 API 表面的扩张。** 一组明确的需求希望扩展能力更强：取消已排队的后续消息（#9234）、幂等的用户轮次确认传递（#9236）、切换 TUI 模式为全屏（#9238）、访问 `ModelRuntime`（#8791）、自定义工具的确认流程（#9228）。
- **包作用域资源命名。** 可选的 skills/templates `pi.namespace`（#8834）加上句中 `/skill` 与 `/template` 展开（#9214），共同指向更可组合的包生态。
- **网关可靠性与计费正确性。** 反复出现的主题：`vercel-ai-gateway` 异常 — `vercelGatewayRouting` 失效（#9211）、1 小时缓存写入按 5 分钟费率计费（#9210）、`edit` 工具调用被截断（#9212）。整体表明需要一次针对网关正确性的集中攻坚。
- **打包卫生。** 0.85.1 中损坏的子路径导出（#9226）、`bun run eval` 递归调用（#9223）、通过 `@earendil-works/chord` 引入的 esbuild（#9225） — 社区正在暴露真实影响消费者的回归。

## 开发者痛点

- **TUI 流式状态脆弱性。** `openai-codex` 的长时流式会话可能静默挂起（#4945）；流式过程中切换视口会触发破坏性的 `ESC[3J` 全量重绘并丢失滚动位置（#9240）；WezTerm 中输入法候选词卡在右边缘（#5200）；PageUp 直接跳到顶部而非按页翻动（#5786）。
- **提供商规范漂移。** 模型和网关的变更速度超过 Pi 适配器的跟进 — Claude Opus 5 `output_config` 拒绝（#9165）、GPT-6 Astra 错误的端点（#9209）、OpenCode Go 现在要求特定请求头（#9230/#9237）、Ollama `qwen3.8:27b` 从 0.84.x 到 0.85.x 的 `terminated` 流式回归（#9216）。
- **启动期认证/竞态条件。** `hasConfiguredAuth()` 读取未稳定的快照（#9233）以及 `refreshOnCreate: false` 留下空快照（#9239），使冷启动行为变得不确定。
- **体验不一致或缺乏文档。** `/` 与 `@` 菜单的 TUI 快捷键不一致（#9199）；Windows 下 `shell_path` 被忽略（#9229）；扩展加载时遇到 EDQUOT 出现晦涩的 `Unknown system error -122`（#9235）；`bun run eval` 无限递归（#9223）。
- **Prompt 缓存与扩展注入的张力。** 扩展通过 `before_agent_start` 注入的 system prompt 内容，在 `sendCustomMessage(triggerTurn:true)` 跳过该钩子时会出现不一致的 prompt（#8712） — 直接推动了 #9116/#9117 delta-delivery 重构。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区速览 — 2026-09-06

## 今日要点
发布流水线压力陡增：**v0.23.1-preview.1** 已发布(随后在 `integration_docker` 和 `quality` 中连续失败四次),而 **#11109** 指出 `release.yml` 重复执行了自身前序运行已经完成的工作,其中某一步耗时 20 分钟却未校验任何内容。与此同时,安全方面的状况也在持续收紧——**#11198** 揭示默认开启的 RUM 遥测会上传未经脱敏处理的原始工具报错(含 shell 命令行内容),而 **#11180** 则显示某个技能的 `PreToolUse` 钩子在 `--continue` 之后会静默停止强制执行,但该技能的指令仍保留在上下文中。

## 版本发布
- **v0.23.1-preview.1** — `feat(web-shell): visualize and manage dynamic workflow runs`([#10594](https://github.com/QwenLM/qwen-code/pull/10594));`perf(web-shell): derive the session workflow project`。*该版本在 CI 中连续失败 4 次(参见 issue #11166、#11170、#11173、#11179、#11185)。*
- **v0.23.0-nightly.20260905.0c945a6136** — 同样的 web-shell 工作流可视化变更。
- **v0.23.1-preview.0** — 同样的 web-shell 工作流可视化变更。

## 热门 Issue
1. **#11091** *(CLOSED, 7💬)* — Mermaid(约 6 MB)在导出的会话记录渲染器中仍被展平处理。是 #9812/#11038 的后续工作,目标是缩减 HTML 导出体积。[链接](https://github.com/QwenLM/qwen-code/issues/11091)
2. **#11031** *(CLOSED, 6💬, P1)* — `/export html` 会把完整的 Web Shell + React 运行时(约 19.5 MB)嵌入到每个导出文件中,即使是空会话也不例外。[链接](https://github.com/QwenLM/qwen-code/issues/11031)
3. **#11109** *(OPEN, 4💬, P2)* — `release.yml` 重复执行了此前运行已验证通过的工作;今日已有两次发布运行超时。[链接](https://github.com/QwenLM/qwen-code/issues/11109)
4. **#9911** *(OPEN, 4💬)* — 在 WebShell 切换后恢复 VS Code 中按消息粒度的编辑/回退功能(在 #9811 中被主动移除)。[链接](https://github.com/QwenLM/qwen-code/issues/9911)
5. **#11180** *(OPEN, 3💬, P1/security)* — 技能 `PreToolUse` 钩子在 `--continue` 之后停止强制执行,但该技能的指令仍保留在上下文中。[链接](https://github.com/QwenLM/qwen-code/issues/11180)
6. **#11198** *(OPEN, 2💬, P1/security)* — 用量统计 RUM 通道会原样上传工具报错文本(含 shell 命令行),且未做任何脱敏处理;该问题在 `main` 上早已存在。[链接](https://github.com/QwenLM/qwen-code/issues/11198)
7. **#10989** *(CLOSED, 3💬)* — #9487 中针对守护进程的 prompt-authority 修复在 VS Code 配套扩展中未生效,因为 `hasActivePrompt` 仅在侧边栏挂载处被轮询。[链接](https://github.com/QwenLM/qwen-code/issues/10989)
8. **#8542** *(OPEN, 3💬)* — ACP 功能请求:在一次轮次仍处于运行中时排队后续消息,与 CLI 体验保持一致。[链接](https://github.com/QwenLM/qwen-code/issues/8542)
9. **#11096** *(OPEN, 3💬)* — 基于 `main` 构建的导出指向一个会返回 404 的 unpkg URL,因为 `@qwen-code/qwen-code@0.23.0` 在 #9812 之前就已发布。[链接](https://github.com/QwenLM/qwen-code/issues/11096)
10. **#10378** *(CLOSED, 3💬)* — 已被取代的守护进程子进程仍会触发 `onExit`,导致误显示 "Qwen Code stopped unexpectedly" 提示横幅。[链接](https://github.com/QwenLM/qwen-code/issues/10378)

## 关键 PR 进展
1. **#10999** — 通过模型注册表、ACP、会话恢复、工作区预览、TUI effort 控制以及 OpenAI 兼容请求,打通声明式推理能力(`reasoning`)的接入路径;为 `deepseek-v4-pro` 新增原生入口。[链接](https://github.com/QwenLM/qwen-code/pull/10999)
2. **#11003** — 子代理定义现在可以声明 `executor` 块,通过 ACP 将一轮对话委派给外部编码代理(首选 Claude Code),并以子代理自身事件的形式重新发布。[链接](https://github.com/QwenLM/qwen-code/pull/11003)
3. **#10898** — 在发布工作流中新增手动的 `promote_nightly` 模式:复用已通过校验的 nightly 成功检查,并基于同一份不可变的源修订版本进行发布(失败即中止)。[链接](https://github.com/QwenLM/qwen-code/pull/10898)
4. **#11165** — 将发布准备/校验/打包/发布/失败通知抽离为可执行的仓库脚本,同时保持原有的 jobs、权限、条件、诊断与退出语义。[链接](https://github.com/QwenLM/qwen-code/pull/11165)
5. **#11117** — 将 Prettier 检查升级为真正的 CI 关卡,并对之前一直被静默改写而未格式化的积压代码一并格式化。[链接](https://github.com/QwenLM/qwen-code/pull/11117)
6. **#11068** — 技能 `SKILL.md` frontmatter 中的钩子现在会在 `/<skill-name>` 调用路径上注册,而不仅在模型调用该技能时生效。[链接](https://github.com/QwenLM/qwen-code/pull/11068)
7. **#11204** — 用类型化的结果(`continued`、`cold-fallback`、`capacity-wait`、`wrong-state`)取代常驻代理原先的续接布尔标志;两个运行时现在都会在变更前上报容量。[链接](https://github.com/QwenLM/qwen-code/pull/11204)
8. **#8927** — 为每个通道(channel)新增 `sessionRotation` 配置(`maxTurns` / `maxAge`),从而限制被复用会话的生命周期。[链接](https://github.com/QwenLM/qwen-code/pull/8927)
9. **#10347** — 在无法使用 Ctrl+Y 的场景下,对 4xx 网络 EOF 错误进行自动重试(将有限次数的自动重试扩展到包装型传输失败)。[链接](https://github.com/QwenLM/qwen-code/pull/10347)
10. **#10941** *(CLOSED)* — 将 Web Shell 对话区的加载指示器从 3 秒静默启发式改为基于守护进程实时 `hasActivePrompt` 的判断。[链接](https://github.com/QwenLM/qwen-code/pull/10941)

## 功能请求趋势
- **ACP 与终端 CLI 持平**:在活跃轮次中排队消息(#8542);在会话记录归一化过程中保留 `resource_link` 附件(#11178)。
- **子代理/代理委派**:通过 ACP 将子代理轮次委派给外部编码代理,首选 Claude Code(#11003),并为关联追踪新增外部输入投递身份(#11202)。
- **推理 effort 控制**:声明式推理能力经由模型注册表接入 ACP、会话恢复、工作区预览、TUI effort 控件以及线协议请求(#10999)。
- **通道/会话生命周期**:每个通道(channel)的 `sessionRotation` 上限(#8927);面向 cron/goal/monitor 感知会话的回收语义(#11118)。
- **Dynamic Workflows 与 Claude Code 2.1.260 持平**:契约、入口/预算、韧性以及分发层面的差距(#11013)。
- **VS Code 配套扩展持平**:在 WebShell 切换后恢复按消息粒度的编辑/回退(#9911)。

## 开发者痛点
- **发布流水线脆弱**:v0.23.1-preview.1 连续失败四次(#11166/#11170/#11173/#11179/#11185),且 `release.yml` 通过重做自身先前的工作浪费了大量时钟时间(#11109)。
- **导出产物体积臃肿**:HTML 会话记录会把完整的 React + Web Shell 运行时打进每个文件(空会话约 19.5 MB)(#11031);此外因 npm tag 早于解包修复,还会出现次生的 404 问题(#11096)。
- **钩子/技能强制执行的缺口**:技能上的 `PreToolUse` 钩子在 `--continue` 之后静默失效(#11180);frontmatter 钩子在 #11068 之前未覆盖 `/<skill-name>` 路径。
- **遥测泄漏敏感上下文**:默认开启的 RUM 会上传未脱敏的原始工具报错文本(含 shell 命令行)(#11198)。
- **CI 测试不稳定**:针对 macOS E2E 分片(#11134)、`/compress` 事件预算时序(#11094)以及 PTY 会话清理(#11001)的持续去抖工作。
- **机器人维护的散乱**:Fleet Shepherd 仪表板(#7167)以及积压的延后评审债务 issue(#9524、#10046、#10974、#11008)持续累积;一次值得关注的清理在单个 tree 中关闭了两个 `react-markdown` 的主要缺陷(#11092)。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*