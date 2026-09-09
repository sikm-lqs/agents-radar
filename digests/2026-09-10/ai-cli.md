# AI CLI 工具社区动态日报 2026-09-10

> 生成时间: 2026-09-09 23:30 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比报告 — 2026-09-10

*覆盖范围：Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、OpenCode、Pi、Qwen Code*

---

## 1. 生态概览

AI CLI 领域已从单轮编码助手完全进化为多入口的智能体平台——所有主流工具现在同时覆盖 CLI、桌面应用以及守护进程/无头执行模式，子智能体、技能/插件、跨会话状态等已成为标准基础设施。竞争焦点已从"用哪个模型"转向平台层面的能力：沙箱严格度、扩展性钩子、会话持久性以及 Windows 支持。本轮周期中有两类结构性问题最为突出：**规模化病**（GB 级别的会话存储、后端路由故障、回归集群）以及**治理缺口**（计划模式逃逸、提示注入、权限范围失控）。值得注意的是，各工具之间正出现互操作与相互对标——Qwen 通过 ACP 将子智能体回合委派给 Claude Code，Copilot 模仿 Claude Code 的插件依赖解析模型，Codex 用户则将 OpenCode/Claude Code 的回滚能力视为对标基准。

---

## 2. 活跃度对比

*计数反映 24 小时摘要窗口内浮现的条目；"N/A"表示信息流中无数据，并非仓库停滞。*

| 工具 | Issues（24h） | PRs（24h） | Discussions | 发布状态 |
|---|---|---|---|---|
| **Claude Code** | 10 条热门追踪（最高：154 条评论） | 1 条（已关闭）——异常低；Function Hooks 发布前的功能冻结期 | N/A（不在信息流中） | **2 个稳定版本**（v2.1.267、v2.1.266） |
| **OpenAI Codex** | 10 条热门追踪（最高：**1,123 条评论**） | 10 条（已关闭/已合并） | 约 10 条活跃（最热想法：190 👍） | v0.154.0 稳定版 + 3 个 alpha |
| **Gemini CLI** | 10 条热门追踪 | 10 条（3 条已关闭） | N/A（不在信息流中） | 仅每夜构建（v0.61.0） |
| **GitHub Copilot CLI** | **47 条更新** / 10 条热门 | 1 条（开放中） | N/A（不在信息流中） | v1.0.84-3 预发布版 |
| **OpenCode** | 10 条热门追踪（最高诉求：96 👍） | 10 条（5 开放 / 5 关闭） | N/A（不在信息流中） | v1.18.30 稳定版 |
| **Pi** | 10 条追踪（5 开放 / 5 关闭） | 6 条（5 条已合并） | 2 条（展示交流） | 无 |
| **Qwen Code** | 10 条追踪（**6 个 P1**） | 10 条 | N/A（不在信息流中） | **4 次发布**（v0.23.2 + 每夜版 + TS SDK + cua-driver-rs） |

**解读：** Codex 拥有最大的原始互动量；Copilot 的 issue 流转最高但几乎看不到可见的 PR 流转（开发在 GitHub 闭环流程内进行）；Qwen 与 OpenCode 在工程产出/社区规模比上居首；Pi 体量小但信号密度高。

---

## 3. 共同演进方向

| 方向 | 工具与证据 |
|---|---|
| **Windows 是最弱平台——毫无例外** | 全部 7 款工具均报告了 Windows 专属的 P1/P2 问题：Claude Code（Plan9/沙箱挂载失败 #92984、#92977），Codex（应用冻结 #20214 87👍；Store 更新导致无头启动失败 #41539），Copilot（强制会话归档 #4756 19👍；沙箱 git 错误 #4788），Qwen（ConPTY `conhost.exe` 泄漏——347 个进程/2.8 GB，#11303/#11352），Gemini（NTFS 8.3 命名冲突 #29116），OpenCode（终端面板冻结、MSI 打包问题） |
| **沙箱加固与提示注入防御** | Gemini（构建文件注入 PR #29250，沙箱隔离 #29214），Codex（WSL 互通逃逸拦截 #44286，root 读取校验 #44327），OpenCode（计划模式 bash heredoc 绕过 #39491），Copilot（默认失败关闭的 `--yolo` 策略），Qwen（守护进程守卫误报 #11503），Pi（社区权限门 `pi-verdict`） |
| **自主/目标模式 + 守护化远程运行** | Codex（目标阻塞状态 #44320，守护线程恢复 #44314，远程控制想法 190👍 #9200），OpenCode（事件溯源的目标模式 #48239/#48240），Qwen（目标运行时检查点重试 #11365，`qwen serve` 定时任务），Claude Code（Function Hooks #91870，空闲通道唤醒智能体 #44380），Gemini（子智能体可靠性专题） |
| **规模化场景下的会话存储治理** | Codex（数十至数百 GiB 的 rollout 数据 #34337/#42648），OpenCode（5.8 GB `message.updated` 膨胀；裁剪 PR #48245），Qwen（内嵌 SQLite 索引 #11433/#11493），Copilot（不透明的会话生命周期 #4756/#1467） |
| **多提供方可移植性 / 自带网关** | Claude Code（Bedrock/Vertex/Foundry 的 effort 上限；网关热修复 v2.1.266），OpenCode（Bedrock DeepSeek ARN、Azure、GPT-6 Astra prompt），Codex（Bedrock 上的 GPT-6-Astra），Pi（OpenRouter/Mistral 托管的 GLM 目录修复），Gemini（路由不得覆盖显式模型选择，PR #29266），Qwen（提供方配置的推理控制 #11328） |
| **子智能体编排与并行执行** | Qwen（通过 ACP 向外部智能体（含 Claude Code）委派 #11003），Pi（并行多模型智能体视图），OpenCode（子智能体权限范围 #41730），Gemini（挂起/假成功上报 #21409/#22323），Codex（恢复时的进程树泄漏 #37453） |
| **Token/上下文经济学** | Codex（轮询重发全量历史 #13733；60 秒阻塞上限 #31935；压缩抹除历史 #36642），Gemini（AST 感知读取，"得体抽取"），Claude Code（effort 上限，200K-vs-1M 误报），OpenCode（摘要差异上限） |

---

## 4. 差异化分析

- **Claude Code** —— *企业平台战略。* 最快热修复节奏（回归在一个版本内修复）、提供方联邦设置（Bedrock/Vertex/Foundry 上的 `maxEffortLevel`），以及将 **Function Hooks** 作为扩展性护城河的战略押注（已以源码插件形式发布，PR #93215）。痛点集中在 Cowork/Windows 沙箱管道以及认证状态失步。
- **OpenAI Codex** —— *最大覆盖面、最大安装基数。* 与 ChatGPT 订阅打通、alpha 驱动的发布列车、goals/daemon 架构、语音实验。该群体中后端可靠性信号最弱（1,123 条评论的 404 故障）以及沉重的 Windows 应用债；app server 中仍固化着 Unix-only 的生命周期假设。
- **Gemini CLI** —— *安全优先的开源工具。* 是唯一一款加固工作（注入、沙箱隔离、抽取前脱敏）在合并 PR 流中占主导地位的工具；显著投入模型智能类特性（复杂度路由、AST 感知工具调用、技能调用）。
- **Copilot CLI** —— *GitHub 原生、感知企业策略。* 面向企业的 MCP/OAuth 姿态稳健，但 tracker 实际充当反馈渠道（仅 1 个可见 PR）；长期的可达性债务（浅色主题 #135/#3773 开放约 1 年）反映出对小毛病的响应较慢。
- **OpenCode** —— *社区驱动、提供方无关、重写进行中。* v2 应用（侧边栏、mission control）加上激进的性能工作（会话加载、事件裁剪）；社区最高诉求是配置**热重载**（96👍）——已是其他工具具备的 DX 预期。
- **Pi** —— *极简、扩展优先的内核。* 差异化在于提供方目录治理、SDK 纯粹性，以及如今的**供应链治理**（包报告流程标记 `pi-safe-compact`）。社区最小，专家密度最高。
- **Qwen Code** —— *最具雄心的基础设施布局：* 守护进程（`qwen serve`）、带预览与定时任务的 Web shell、Playwright Browser SDK、计算机使用驱动二进制、ACP 互操作、ECS 集群管理。工程产出超过社区互动；Windows ConPTY 泄漏是核心风险点。

---

## 5. 社区动量与成熟度

- **最高互动量：** **Codex**（遥遥领先——1,123 条评论的故障、190 👍 的功能想法）以及 **Claude Code**（154 条评论的 hooks 讨论帖，厂商响应积极且对路线图可见影响）。
- **最快迭代：** **Qwen Code**（每日 4 次发布，包含 SDK 与原生驱动产物）以及 **Claude Code**（同日 2 次发布；重大功能前的有意冻结）。
- **速度与体量比最强：** **OpenCode**（10 条 PR，维护者主导的架构设计）以及 **Gemini CLI**（10 条 PR，社区合并稳定，以安全为导向）。
- **反馈环滞后：** **Copilot CLI** 处理 issue（每日 47 条）但发版可见 PR 极少；长期的样式问题侵蚀信任。
- **成熟度分层：** Claude Code 与 Codex 已在大规模下成熟——同时也开始显现规模化病（存储膨胀、后端故障、回归集群）。OpenCode 与 Qwen 是快速成长期的构建者；Gemini 处于加固整合期；Copilot 企业打磨到位但社区响应迟缓；Pi 是高信号利基玩家。

---

## 6. 趋势信号

1. **智能体正演变为服务而非 REPL。** 来自移动端的远程控制（Codex #9200）、守护进程会话注册中心（Qwen #11488）、空闲唤醒通道（Claude #44380）、无头 CI 可观测性（`agent-watch`）。→ *从第一天起就为守护化、长时程执行与可恢复性而设计。*
2. **Windows 是决定性的可靠性战场。** ConPTY 泄漏、Store 更新破坏、junction/symlink 容器化误报影响所有工具。→ *Windows 优先的 QA 是竞争护城河；当前领先者在此处恰好最弱。*
3. **治理与沙箱是企业差异化点。** 防注入的文件操作、默认失败关闭、计划模式强制、权限范围控制主导着 Gemini、Codex、OpenCode 与 Copilot 的 PR 流。
4. **Token 经济学已成产品特性。** effort 上限、AST 范围读取、服务端轮询、压缩正确性修复表明成本控制正在塑造架构，而不仅是 UX。
5. **互操作时代：ACP + MCP 作为连接组织。** Qwen 通过 ACP 驱动 Claude Code 子智能体；Copilot 复制 Claude Code 的插件模型；opencode.ai 头部强制在 Pi 扩展中扩散。→ *基于开放协议构建；专有扩展格式是负债。*
6. **状态持久性是新的隐性成本。** GB 级会话日志（Codex、OpenCode）正推动行业向事件裁剪与 SQLite 索引演进——将会话存储视为一等工程问题。
7. **模型可移植性已成标配。** 跨托管模型（Bedrock 上的 GPT-6-Astra、Mistral 上的 GLM）意味着目录治理与提供方无关路由决定高级用户的采用——这正是 OpenCode 与 Pi 定位的核心。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告

*数据快照：2026-09-10 — anthropics/skills 官方仓库*

---

## 1. 热门 Skills 排行

以下 PR 代表了当前正在仓库中推进的影响力最大的 Skill 工作，按各自对生态系统的战略相关性排序（关键基础设施修复、适用面广的通用工具，以及架构级原语）。

### 1. skill-creator 可靠性全面改造 — [PR #1298](https://github.com/anthropics/skills/pull/1298) — OPEN
**作者：** MartinCajiao
**功能：** 修复 `run_eval.py`，让技能描述基于真实的召回信号而非噪声进行评估。同时修复 Windows 下的管道/流读取、触发检测和并行 worker 行为，使优化循环真正可用。
**为何重要：** 这是*为所有其他 Skill 的描述调优提供支撑的元技能*。多个 PR（如 #1099、#1050、#1390）以及排名靠前的 Issue #556 都指向同一个 0% 召回率缺陷——落地 #1298 将解锁整个评估基础设施。

### 2. document-typography — [PR #514](https://github.com/anthropics/skills/pull/514) — OPEN
**作者：** PGTBoos
**功能：** 检测并修正 AI 生成文档中的排版缺陷——孤字换行、孤行段落以及编号错位。
**讨论亮点：** 将问题定位为普遍性问题（“影响 Claude 生成的每一份文档”）。在重度依赖排版的工作流中，这种广泛且反复出现的用户痛点有充分证据支撑。

### 3. ODT Skill — [PR #486](https://github.com/anthropics/skills/pull/486) — OPEN
**作者：** GitHubNewbie0
**功能：** 创建、填充、读取和转换 OpenDocument 文件（`.odt`、`.ods`），并将 ODT 解析为 HTML。
**为何重要：** 填补了一项长期空白——Anthropic 的 doc-skills 合集历来缺少对 ISO 标准 OpenDocument 的一流支持，LibreOffice/ODF 用户的需求长期未被充分满足。

### 4. Hivemind 多 Agent 编排 — [PR #1628](https://github.com/anthropics/skills/pull/1628) — OPEN
**作者：** Hanishchow
**功能：** 将机械性工作委托给运行免费模型的无头 opencode worker，Claude Code 则保留规划者/审查者/合并者的角色——一种“零成本”委托原语。
**讨论亮点：** 其前提（“昂贵模型的上下文才是稀缺资源，而非其智能”）与其他多项提案共同指向的成本路由方向形成共鸣（参见 Issues #228、#16）。

### 5. self-audit 质量门禁 — [PR #1367](https://github.com/anthropics/skills/pull/1367) — OPEN
**作者：** YuhaoLin2005
**功能：** 交付前审计，将机械式文件校验与四维推理质量检查（按严重程度排序）相结合。通用性强——适用于任何技术栈、任何模型。
**为何重要：** 是 Issue #1385（作者更宏观的“Reasoning Quality Gate Pipeline”提案）的配套实现。它将 Skills 定位为*交付时*验证（而非生成时提示）的天然载体。

### 6. skill-quality-analyzer + skill-security-analyzer — [PR #83](https://github.com/anthropics/skills/pull/83) — OPEN
**作者：** eovidiu
**功能：** 两个元技能：一个从五个质量维度为 Skills 打分，另一个揭示安全弱点。
**讨论亮点：** 直接回应了评论量居首的 Issue #492（43 条评论）中的信任边界关切。落地后，维护者将获得在审查环节对社区 Skills 进行自动化把关的手段。

### 7. testing-patterns — [PR #723](https://github.com/anthropics/skills/pull/723) — OPEN
**作者：** 4444J99
**功能：** 端到端测试指南——测试奖杯模型、AAA 模式、使用 Testing Library 进行 React 组件测试，以及*不该测试什么*。
**为何重要：** 填补了明显的开发者体验空白；在 Skills 之外的 Claude Code 使用场景中，测试工作流是呼声最高的模式之一。

### 8. scnet-hpc — [PR #1615](https://github.com/anthropics/skills/pull/1615) — OPEN
**作者：** lql341
**功能：** 通过基于 profile 的 SSH + Slurm 工作流操作 SCNet HPC 集群，并提供集群发现与计算节点指引。
**讨论亮点：** 展示了 Skills 正从通用工具演进为*垂直领域*、具备基础设施感知能力的能力体——这很可能是 2026 年生态系统的方向之一。

---

## 2. 社区需求趋势

提炼自评论量排名前 15 的社区 Issues：

| 需求方向 | 锚定 Issue | 评论量 |
|---|---|---|
| **社区 Skills 的信任与安全边界** | [#492](https://github.com/anthropics/skills/issues/492) — Skills 在 `anthropic/` 命名空间下冒充 Anthropic | 43 |
| **组织级技能分发** | [#228](https://github.com/anthropics/skills/issues/228) — 跨团队共享 Skills，无需手动传递 `.skill` 文件 | 16 |
| **可靠的 Skill 触发/召回** | [#556](https://github.com/anthropics/skills/issues/556) — `run_eval.py` 在所有查询中记录到 0% 召回率 | 12 |
| **紧凑记法的持久化 Agent 记忆** | [#1329](https://github.com/anthropics/skills/issues/1329) — 用 `compact-memory` 符号记法表示 agent 状态 | 9 |
| **Skill-creator 最佳实践重写** | [#202](https://github.com/anthropics/skills/issues/202) — token 开销大，向人类解释而非向模型下指令 | 8 |
| **Agent 治理与安全模式** | [#412](https://github.com/anthropics/skills/issues/412) — 策略执行、威胁检测、审计日志 | 6 |
| **插件去重** | [#189](https://github.com/anthropics/skills/issues/189) — `document-skills` 与 `example-skills` 安装了完全相同的内容 | 6 |
| **Skills ↔ MCP 协议对齐** | [#16](https://github.com/anthropics/skills/issues/16) — 将 Skills 暴露为 MCP，实现跨 Agent 可移植性 | 4 |
| **上下文窗口/token 纪律** | [#1487](https://github.com/anthropics/skills/issues/1487) — `claude-api` 会预先注入 ~156k tokens | 4 |
| **平台覆盖** | [#29](https://github.com/anthropics/skills/issues/29) Bedrock，[#1175](https://github.com/anthropics/skills/issues/1175) SharePoint | 各 4 |

**呈现的趋势：**

- **质量基础设施主导需求。** 排名前五的 Issues 中有三个（#556、#492、#189）关注的是*Skills 如何被评估、信任和去重*——而不是存在哪些 Skills。
- **分发 > 创作。** Issue #228 的 16 条评论表明，社区近期最大的摩擦在于*共享* Skills，而非*创建* Skills。
- **成本感知的多 Agent 委托**是正在上升的需求方向，已在 #16（Skills-as-MCPs）、#1329（compact-memory）和 #1628（Hivemind）中显现。

---

## 3. 高潜力待落地 Skills

以下 PR 体量可观、讨论活跃且仍为 OPEN 状态——是近期落地的有力候选：

| Skill | PR | 重点 | 备注 |
|---|---|---|---|
| skill-creator 评估可靠性 | [#1298](https://github.com/anthropics/skills/pull/1298) | 核心基础设施修复 | 解锁 3+ 个依赖 bug |
| document-typography | [#514](https://github.com/anthropics/skills/pull/514) | 文档质量保障 | 适用面广 |
| ODT | [#486](https://github.com/anthropics/skills/pull/486) | 开放格式支持 | 填补生态空白 |
| Hivemind | [#1628](https://github.com/anthropics/skills/pull/1628) | 多 Agent 编排 | 全新架构原语 |
| self-audit | [#1367](https://github.com/anthropics/skills/pull/1367) | 输出验证 | 关联 Issue #1385 提案 |
| skill-quality-analyzer + skill-security-analyzer | [#83](https://github.com/anthropics/skills/pull/83) | 元工具 | 直接回应 #492 |
| testing-patterns | [#723](https://github.com/anthropics/skills/pull/723) | 开发者生产力 | 复用潜力高 |
| scnet-hpc | [#1615](https://github.com/anthropics/skills/pull/1615) | 垂直领域 HPC 运维 | 展现领域深度 |

另有两个相邻的*缺陷修复* PR 值得关注：[#539](https://github.com/anthropics/skills/pull/539)（`skill-creator` 中的 YAML 引号校验）和 [#538](https://github.com/anthropics/skills/pull/538)（pdf SKILL.md 中的大小写敏感问题）——改动小、风险低，且能明确解锁受影响的工作流。

---

## 4. Skills 生态洞察

**社区最集中的需求，是用于治理其他 Skills 的 Skills——评估、安全、去重与组织级分发——而非新的领域专属能力。** Issue #492 以 43 条评论独占鳌头，叠加 `skill-quality-analyzer`（#83）、`skill-creator` 可靠性（#1298）与跨 Agent 的 Skills-as-MCPs（#16）同步推进，表明生态系统正走向成熟：下一个瓶颈在于*信任与运维规范*，而非内容覆盖。

---

---

# Claude Code 社区摘要 — 2026-09-10

## 今日要点
24 小时内连续发布两个版本——**v2.1.267** 引入了 `maxEffortLevel`（在 Bedrock/Vertex/Foundry 上限制 effort 级别）和 `--system-prompt-snapshot off`，而 **v2.1.266** 修复了一个破坏 LLM 网关/代理用户的回归问题。社区还收到了本周期最受讨论议题的重大更新：**Function Hooks (#91870)** 已确认将在"以周为单位的时间尺度"内发布，证明社区驱动的设计反馈已实质性地塑造了路线图。

---

## 版本发布

- **v2.1.267** — 新增 `maxEffortLevel` 设置（顶层或 `modelSettings` 下按模型配置），可在所有提供商（Bedrock、Vertex、Foundry）上限制 effort 级别；用户仍可选择更低的级别。同时新增 `--system-prompt-snapshot off`，使每次请求都重新渲染系统提示。
- **v2.1.266** — 热修复：修复 2.1.265 中未记录的 `CLAUDE_CODE_USE_GATEWAY` 环境变量开始单独强制 Cloud 网关登录（此前需要同时设置 `ANTHROPIC_BASE_URL` 和 `ANTHROPIC_AUTH_TOKEN`）的回归问题。此修复为 LLM 网关和代理用户解锁。

---

## 热门议题

1. **[#91870 — Function Hooks：让插件强大 10 倍](https://github.com/anthropics/claude-code/issues/91870)**（154 条评论，90 👍）
   仓库中讨论最多的帖子。Anthropic 发布社区更新（9 月 9 日），确认 function hooks 将在"数周内"发布，致谢高质量反馈对设计的塑造。重要性：function hooks 将插件提升为一等自动化原语——对于任何基于 Claude Code 插件构建的团队而言，这是 10 倍的能力跃升。

2. **[#92984 — Cowork (Windows)：KB5124008 之后 Plan9 共享失败](https://github.com/anthropics/claude-code/issues/92984)**（27 条评论，12 👍）
   Windows 更新 KB5124008 (26200.9445) 之后，Cowork 中所有 Plan9 挂载均失败，提示"Plan9 mount failed: invalid argument"。卸载该 KB 即可修复。对 Windows Cowork 用户影响很大——指向沙箱基础设施与操作系统更新的交互问题。

3. **[#64568 — Esc 拒绝工具使用提示而非退出 /btw 模式](https://github.com/anthropics/claude-code/issues/64568)**（13 条评论，9 👍）
   自六月开放至今，按 Esc 退出 `/btw` 模式时也会拒绝挂起的工具使用提示。在 macOS 上可复现。这是一个典型的"模态退出路由"问题，损害用户肌肉记忆。

4. **[#44380 — 频道消息无法唤醒空闲会话（--channels 插件）](https://github.com/anthropics/claude-code/issues/44380)**（12 条评论，6 👍）
   Telegram 消息在终端显示但空闲时从不触发 Claude 处理——REPL 改为等待键盘输入而无法中断。长期存在的插件 bug，阻碍真正的"待命代理"工作流。

5. **[#76577 — 在会话间持久化 Transcript 视图模式（Desktop）](https://github.com/anthropics/claude-code/issues/76577)**（10 条评论，6 👍）
   简单但大幅提升生活质量：Desktop 每次会话都会忘记 transcript 视图模式。重度用户的持续诉求。

6. **[#92977 — Cowork 本地沙箱无法挂载（Windows Desktop 1.49585.0.0）](https://github.com/anthropics/claude-code/issues/92977)**（7 条评论，1 👍）
   最新 Desktop 版本的回归——Windows 上本地沙箱无法挂载。属于本周出现的 Cowork/沙箱回归集群的一部分。

7. **[#90117 — 首次听写后 macOS 桌面端麦克风按钮消失](https://github.com/anthropics/claude-code/issues/90117)**（6 条评论，3 👍）
   语音输入无法使用，直到用户手动清空输入框。被标记为无效，但用户体验瑕疵确实存在。

8. **[#79810 — 切换账户后自定义侧边栏分组消失](https://github.com/anthropics/claude-code/issues/79810)**（5 条评论，4 👍）
   Desktop 应用在切换账户时丢失侧边栏组织——一个侵蚀用户信任的持久化/状态管理 bug。

9. **[#93219 — macOS 桌面端 Effort 滑块无响应（所有模型卡在 Max）](https://github.com/anthropics/claude-code/issues/93219)**（2 条评论，0 👍）
   恰逢 v2.1.267 引入 `maxEffortLevel` 时出现的新 bug——用户无法再通过 UI 调低 effort。值得关注新设置是否会引发回归。

10. **[#92893 — 注入的 commit/PR 归属覆盖 CLAUDE.md trailer 规则](https://github.com/anthropics/claude-code/issues/92893)**（1 条评论，0 👍）
    会话开头的 system-reminder 覆盖了项目级 CLAUDE.md 对 git commit trailers 的指导。哲学层面的担忧：CLI 不应规定项目级归属策略。

---

## 关键 PR 进展

最近活动窗口内仅有 **1 个 PR**；该 PR 已关闭：

- **[#93215 — Add mods: sec-default, diff and telemetry（已关闭）](https://github.com/anthropics/claude-code/pull/93215)** 作者 poteat
  将三个 hooks 模块插件以源码形式发布：`sec-default`（组织级最外层插件）、`diff`（`/diff`）、`telemetry`（`$.telemetry`）。仅在启用 function hooks 时加载——这是新 hooks 系统下插件样貌的真实预览，而新系统正是 #91870 中所宣布的。

> *注：PR 数量异常偏低（24 小时内仅 1 个）。仓库似乎处于功能冻结/稳定期，等待 Function Hooks 工作定稿。*

---

## 功能请求趋势

从议题列表中提炼：

- **Function hooks / 插件可扩展性**（#91870）——迄今呼声最高的功能请求，现已正式纳入路线图。
- **跨会话与跨设备连续性**（#85150 已关闭、#44380）——持久化会话、跨会话的代理消息传递、移动端交接。
- **Desktop UX 持久化**——transcript 视图模式（#76577）、侧边栏分组（#79810）、effort 滑块（#93219）。
- **Windows 上 Cowork/沙箱可靠性**——多份报告（#92984、#92977、#93071）均在 24 小时内出现，暗示存在单一根因的故障潮。
- **1M 上下文窗口报告**——反复要求修复 Opus 5（#81693）和 Sonnet 5（#84310）的 200K 与 1M 窗口不匹配问题。
- **账户/鉴权韧性**——网关回归（#92984 区域）、OAuth 重定向不匹配（#88877）、订阅状态失同步（#83639）。
- **归属 / 项目策略覆盖**（#92893）——让项目 `CLAUDE.md` 优先于 CLI 默认值。

---

## 开发者痛点

议题跟踪器中反复出现的困扰：

1. **回归集中在 Cowork/Windows 沙箱**——一天内出现三起独立的 Plan9/沙箱挂载 bug，表明与 Windows 生态系统的交互十分脆弱（KB 更新、Desktop 构建版 1.49585.0.0）。**建议：** Windows 用户应固定使用已知可用的版本，或卸载最近的 Windows KB 作为变通办法。
2. **模态/键盘路由边界场景**——`/btw` 模式（#64568）、全屏粘性提示栏（#91024）、Esc 处理。TUI 已足够复杂，输入路由需要专门的 QA。
3. **订阅与鉴权状态失同步**——多份"会话中途未登录"的报告（#83639）、重新登录后丢失 Fable 5（#76237）、OAuth 重定向路径不匹配（#88877）。鉴权层需要加固。
4. **上下文窗口错误报告**——Claude Code 对 1M 上下文模型报告 200K，破坏状态栏计量并使 `/compact` 行为混乱。同时影响 Opus 5 与 Sonnet 5。
5. **长期未解决的议题被忽视**——#64568（六月）、#44380（四月）、#85167（Opus

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-10

## 1. 今日要点

- **Codex CLI 0.154.0 已发布**：GPT-6-Astra 现已加入模型选择器和 Amazon Bedrock 模型目录，同时实验性 worktree 支持（`--worktree` / `/worktree`）也已上线，用户可为新建或 fork 的会话创建隔离的 checkout。([release](https://github.com/openai/codex/releases/tag/rust-v0.154.0))
- **一个大规模连接性 bug 报告正在霸占工单队列**：Issue [#28756](https://github.com/openai/codex/issues/28756) —— 在 GPT-5.4 xhigh 会话中请求 `chatgpt.com/backend-api/codex/responses` 时出现 `404 Not Found` —— 目前已有 1,123 条评论和 83 个 👍，表明这是一次范围广且持续存在的故障，尚未解决。
- **存储膨胀与 Windows 稳定性仍是主要痛点**：新的跟踪 issue [#42648](https://github.com/openai/codex/issues/42648) 指出 Codex 本地会话存储在多个相互作用机制下出现无界增长，与现有的 [#34337](https://github.com/openai/codex/issues/34337) 以及一波 Windows 专属 App bug 形成呼应。

## 2. 发布

**`rust-v0.154.0`** ([release notes](https://github.com/openai/codex/releases/tag/rust-v0.154.0))
- **GPT-6-Astra** 现已在模型选择器与 Amazon Bedrock 模型目录中可选。 [#42879](https://github.com/openai/codex/pull/42879), [#42619](https://github.com/openai/codex/pull/42619)
- **实验性 worktree 支持**：使用 `--worktree`（CLI）或 `/worktree`（TUI）为新建或 fork 的会话创建隔离的 checkout，并可浏览和恢复它们。 [#42652](https://github.com/openai/codex/pull/42652), [#43069](https://github.com/openai/codex/pull/43069), [#43120](https://github.com/openai/codex/pull/43120), [#43…

预发布版本 **`0.154.0-alpha.6.1`**、**`0.154.0-alpha.10.2`** 与 **`0.154.0-alpha.11`** 已在稳定版发布前释出。 ([alpha.6.1](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6.1), [alpha.10.2](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.10.2), [alpha.11](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.11))

## 3. 热门 Issue

1. **[#28756 — 在 `chatgpt.com/backend-api/codex/responses` 上出现 `unexpected status 404 Not Found`](https://github.com/openai/codex/issues/28756)** —— 1,123 条评论。在 macOS arm64（Pro x20）上跑 GPT-5.4 xhigh 会话时，后端持续返回 404。评论量与 `cf-ray` Cloudflare 响应头都指向服务端路由故障，而非客户端配置错误。
2. **[#20214 — Codex App 在 Windows 11 Pro 上冻结/卡顿](https://github.com/openai/codex/issues/20214)** —— 111 条评论，87 👍。Windows 性能类投诉中获赞最多的一个，出现于 Ryzen 5 / 32 GB 机器上 —— 症状更像渲染循环或 IPC 问题，而非资源耗尽。
3. **[#25178 — Windows Computer Use 截图在 Windows 10 22H2 上失败](https://github.com/openai/codex/issues/25178)** —— 53 条评论。`SetIsBorderRequired failed: 不支持此接口 (0x80004002)` 阻塞了 `get_window_state`。同一错误在新版本中再次出现（见 #43259）。
4. **[#13733 — 后台进程轮询浪费 token](https://github.com/openai/codex/issues/13733)** —— 40 条评论，40 👍。每一次 `write_stdin` 轮询都会把完整对话历史重新发往 API，开销随历史 × 轮询次数线性放大。一个长期诉求是改用服务端状态轮询。
5. **[#34337 — Codex CLI/Desktop 会话可静默膨胀到数十到数百 GiB](https://github.com/openai/codex/issues/34337)** —— 11 条评论。CLI 与 Desktop 的 rollout 共置存储，既无实际上限也无轮转机制。现已与跟踪 issue #42648 配套出现。
6. **[#41539 — Windows 应用在 Store 自动更新后约 12 分钟才以无窗口模式启动](https://github.com/openai/codex/issues/41539)** —— 8 条评论。更新策略门控加上同步的 `cua_node` 运行时重解压阻塞了窗口创建，冻结了主进程事件循环。
7. **[#42669 — Windows Codex desktop：进程启动但窗口未出现](https://github.com/openai/codex/issues/42669)** —— 8 条评论。`Artifact Session host Unix-socket transport is not available on Windows` 表明 Windows app-server 仍内嵌着 Unix-only 的生命周期假设。
8. **[#37453 —

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-10

## 今日要点

Gemini CLI 以

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要
**日期：** 2026-09-10

---

## 1. 今日要点

CLI 发布了 **v1.0.84-3**，带来两项修复，分别解决了 `/copy` 任务完成捕获问题以及会话启动时 OAuth MCP 服务器连接的可靠性问题。社区关注点主要集中在长期未解决的 **浅色主题渲染 Bug**（#135、#3773）——这些问题横跨多个版本依然存在；同时，过去 72 小时内新提交了一批 Windows 专属和 MCP 认证相关的回归问题。部分企业/策略边界场景（#4757、#4793）已关闭，表明维护者正在积极清理积压的待处理问题。

---

## 2. 版本发布

**[v1.0.84-3](https://github.com/github/copilot-cli/releases/tag/v1.0.84-3)** — 预发布
- **`/copy` 在可用时包含任务完成消息** —— 确保复制的会话输出能够捕获最终的助手回复，而不是在最后一个用户可见块处截断。
- **经过 OAuth 认证的 MCP 服务器在会话启动时可可靠连接** —— 修复了一个竞态条件：受 OAuth 保护的 MCP 服务器可能在代理开始首次工具发现调用之前未能完成绑定。

---

## 3. 热门 Issue

| # | Issue | 为什么重要 |
|---|---|---|
| [#135](https://github.com/github/copilot-cli/issues/135) — *浅色主题无法使用*（12 👍） | 自 2025-09 开启；12 条评论反映出用户对浅色终端渲染长期的不满。与下方 #3773 互相关联。 |
| [#4535](https://github.com/github/copilot-cli/issues/4535) — `store_memory` 在 v1.0.81 预发布版本中失败 | 影响实验性内存工具链 —— `Instance id is required` 错误会阻断任何依赖持久化内存的代理。 |
| [#4756](https://github.com/github/copilot-cli/issues/4756) — Windows 应用在每次空闲项目会话前都需要归档（19 👍） | 社区信号强烈；Windows 用户在每次新建本地会话前都必须手动归档。 |
| [#3773](https://github.com/github/copilot-cli/issues/3773) — 浅色主题损坏 | 影响无障碍体验 —— 低对比度的提示符和选中高亮几乎无法辨认。 |
| [#3700](https://github.com/github/copilot-cli/issues/3700) — WSL2 回归：CPU 占用 215% 且 TUI 卡死 | 严重程度高；被标记为 #2208 的回归，在每次干净重启后均可复现。 |
| [#3976](https://github.com/github/copilot-cli/issues/3976) — 原生 `tgrep` 索引器 OOM 杀进程 | 实验性的 `copilot_cli_tgrep` 守护进程没有内存上限；在 monorepo 环境下非常危险。 |
| [#4775](https://github.com/github/copilot-cli/issues/4775) — Mission Control 仪表盘 404 | 生产环境仪表盘链接指向 `/copilot/tasks/<uuid>`，但实际会话位于 `/agents/tasks/<uuid>`。 |
| [#2199](https://github.com/github/copilot-cli/issues/2199) — 增加 Ctrl+Backspace 删除整词功能（7 👍） | 体验优化请求，符合 Unix/Windows 编辑器长期以来的惯例。 |
| [#3858](https://github.com/github/copilot-cli/issues/3858) — Windows 上 Ctrl+Backspace 失效（6 👍） | 跨平台行为不一致；目前只能使用 Alt+Backspace 作为临时方案。 |
| [#4769](https://github.com/github/copilot-cli/issues/4769) — 元数据 URL 被重定向时 MCP OAuth 失败 | 影响任何通过 HTTP 重定向提供 `.well-known/openid-configuration` 的 MCP 服务器 —— 在企业部署中很常见。 |

*本周期已关闭：* [#2147](https://github.com/github/copilot-cli/issues/2147)（CAIP 400 输入项错误）、[#367](https://github.com/github/copilot-cli/issues/367)（多账户切换 —— 以 `more-info-needed` 关闭）、[#4757](https://github.com/github/copilot-cli/issues/4757)（`--yolo`/`--allow-all` 因 fail-closed 策略被阻断）。

---

## 4. 关键 PR 进展

24 小时窗口内仅有 **一个 PR** 处于活跃状态：

- **[#4786 — 修订关于第三方服务的通知](https://github.com/github/copilot-cli/pull/4786)** *（开启）* —— 更新第三方服务披露内容，明确访问要求和条款。范围较小，但对合规审查有意义。

---

## 5. 热门讨论

*源信息流中未提供讨论数据 —— 本节略过。*

---

## 6. 功能请求趋势

在所有开启的 Issue 中，若干请求主题正在收敛：

1. **主题控制** —— #4620（锁定浅色/深色）、#135/#3773（修复浅色主题）。用户希望 GitHub 配色与操作系统/终端外观解耦。
2. **多账户工作流** —— #367（账户切换）、#4791（切换时产生不可恢复的 400 错误）。
3. **输入体验对等** —— #2199 + #3858（Ctrl+Backspace）、#4794（演示场景下可见的命令历史）。
4. **插件生态成熟度** —— #4487（跨/内市场插件依赖解析，参考 Claude Code 模式）。
5. **企业级 MCP 集成** —— #3772（已认证的注册表读取）、#4769 / #4793 / #4795（OAuth 流程健壮性、回调端口一致性）。
6. **会话生命周期打磨** —— #1467（自动恢复上次会话）、#4756（Windows 无需手动归档）、#4764（辅助权限模式约 1 小时后过期）。
7. **CLI 演示/用户体验** —— #4794（输入框上方显示命令以方便现场观众观看）、#4789（Ctrl+C 应复制选中文本，而不是取消确认）。

---

## 7. 开发者痛点

- **浅色主题基本无法使用** —— #135 和 #3773 中的反复报告表明，尽管 👍 数较高，该问题仍未得到优先级处理；同样的截图模式在多个版本中反复出现。
- **Windows 始终是最薄弱的支持平台** —— 会话创建（#4756）、任务栏图标卡在 `taskState 0`（#4771）、Windows 沙箱 `git status` 权限错误（#4788）以及 Ctrl+Backspace（#3858）共同构成了 Windows 专属回归的模式。
- **MCP 认证十分脆弱** —— 48 小时内新增三起 OAuth 失败（#4769、#4793、#4795），分别涉及元数据 URL 重定向、回调端口漂移以及提供方回调不匹配。v1.0.84-3 对 MCP OAuth 启动可靠性的修复是一个积极信号，但这些相邻流程仍未关闭。
- **会话管理不够透明** —— 用户无法按时间顺序区分最近的会话（#1467），`assisted` 权限会静默过期（#4764），Mission Control 链接指向失效路径（#4775）。
- **实验性工具的资源耗尽风险** —— `tgrep`（#3976）和未发布的自动驾驶任务栏卡片（#4771）都暴露了缺乏用户可见防护的终止/卡死状态 Bug。
- **演示与无障碍体验存在摩擦** —— 输入命令消失（#4794）、浅色模式下对比度不可读（#3773）以及在确认弹窗中 Ctrl+C 复制行为（#4789），都在不同程度上劣化了"看着同事使用"的体验。

---

*本摘要基于 GitHub 数据，针对 `github/copilot-cli` 在 2026-09-10 结束的 24 小时窗口生成。共更新 47 个 Issue、1 个 PR，发布 1 个预发布版本。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区简报 — 2026-09-10

## 今日要点
OpenCode 发布了 **v1.18.30**，落地了对 GPT-6 的 Astra 系统提示词（system prompt）支持，并针对 Bedrock（DeepSeek ARN ID）、Azure 和 OpenAI SDK 带来了定向的 provider 修复。社区关注点已大幅转向 **v2 的体验优化工作**：TUI 文件/@提及索引、会话加载性能，以及激进削减会话事件膨胀（单个长会话目前已能产生约 5.8 GB 的 `message.updated` 事件）。贯穿各 issue 和 PR 的一个反复出现的主题是“goal/plan 模式逃逸通道”——AI 屡屡通过 bash 或子 agent 绕过 plan 模式，由此催生了多项治理提案。

## 版本发布
### v1.18.30
- **核心**：为 GPT-6 系列模型新增 Astra 系统提示词。
- **Bug 修复**：
  - Bedrock DeepSeek 模型 ID（包括基于 ARN 的 ID）现已能正确解析。(@YeEmrick)
  - Azure provider SDK 已更新，纳入兼容性修复。
  - OpenAI provider SDK 已更新，纳入最新变更。

## 热门 Issue

1. **[#8751](https://github.com/anomalyco/opencode/issues/8751) — 热重载 agents、skills 与 commands**（23 条评论，👍 96）
   目前获赞最高的开放功能请求。用户希望 OpenCode 运行时能对配置做失效/重载，从而无需重启即可迭代 agents、skills 和 commands。社区反响压倒性积极，表明热重载已被视为开发者体验（DX）的基本预期。

2. **[#32747](https://github.com/anomalyco/opencode/issues/32747) — `@` 文件提及不包含启动后创建的文件**（16 条评论，👍 14）
   一个存在已久的 TUI bug：`@` 选择器在重启前一直使用陈旧的搜索索引。大量评论正说明它干扰日常工作流之频繁，报告者已定位到可能的代码路径。

3. **[#18654](https://github.com/anomalyco/opencode/issues/18654) — 无法在 OpenCode Zen 中更改或移除邮箱**（7 条评论，👍 16）
   GitHub 邮箱变更时的账户管理摩擦会造成重复身份。暴露了 Zen 自助资料管理流程的缺口。

4. **[#34040](https://github.com/anomalyco/opencode/issues/34040) — TUI 自动补全在引用别名处止步**（6 条评论，👍 2）
   当配置的 `@home` 别名指向外部目录时，自动补全不会递归进入该目录。这对 monorepo 和多机器环境十分重要。

5. **[#42739](https://github.com/anomalyco/opencode/issues/42739) — 配置了 Cloudflare 环境变量但缺少 `CLOUDFLARE_API_TOKEN` 时 `Provider.list` 出现未处理崩溃**（5 条评论）
   Provider 初始化在启动时即导致 TUI 崩溃。说明需要优雅的校验机制，而不是对已配置 provider 做隐式假设。

6. **[#39491](https://github.com/anomalyco/opencode/issues/39491) — plan 模式可通过 bash 写入和编辑文件**（5 条评论）
   一个真实的安全缺口：模型会“忘记”自己处于 plan 模式，并使用 `cat > file << EOF` 绕过写入限制。鉴于 plan 模式是用户依赖的信任边界，该问题严重性较高。

7. **[#47034](https://github.com/anomalyco/opencode/issues/47034) — Gemini 3.8 Flash 在模型回合后返回 400**（5 条评论）
   `Requests ending with a model turn are not supported` 阻断了这款热门模型的流式输出。错误分类器需要新增 `isRetryable` 映射。

8. **[#47013](https://github.com/anomalyco/opencode/issues/47013) — 网络不佳时 OpenCode 无法启动**（已关闭，5 条评论）
   桌面版在版本检查阶段挂起。反映出用户对离线优先/更具韧性的更新路径的普遍需求。

9. **[#48237](https://github.com/anomalyco/opencode/issues/48237) — 未打开会话时自动接受开关被置灰**（4 条评论）
   `createPermissionScopeController` 只从会话 lineage 解析目录，导致主页/草稿界面上的设置无法使用。修复方案的 PR（#48244）已经开放。

10. **[#48239](https://github.com/anomalyco/opencode/issues/48239) — goal 模式的 round driver 在出错/取消后盲目重新认领**（3 条评论）
    `SessionPrompt.loop` 误用正常的 `ensureRunning` 返回值来决定是否重新认领，导致退出/取消时产生孤儿 round。这是维护者正积极设计的自主“goal 模式”这一更大推进方向的一部分。

## 重点 PR 进展

1. **[#48223](https://github.com/anomalyco/opencode/pull/48223) — `fix(app): reduce cold and warm session load work`**（已关闭）
   每个工作区最多复用 16 条已渲染的时间线，并配合非活动视图守卫与滚动位置恢复；同时推迟协作方动画。针对的是“进入大会话缓慢”这一抱怨。

2. **[#48245](https://github.com/anomalyco/opencode/pull/48245) — `fix(session): cap summary diffs; prune superseded message.updated events`**（开放中）
   为 `SessionSummary.summarize` 的 diff 设定上限，并清理已被取代的事件。直接回应 #42748 / #48241 中 5.8 GB / 1063 条事件的膨胀 bug。对长会话而言是一项高杠杆修复。

3. **[#48244](https://github.com/anomalyco/opencode/pull/48244) — `fix(app): auto-accept toggle fallback directory when no session`**（开放中）
   新增 `fallbackDirectory`（会话 lineage → 路由目录），并从 `DialogRoute` 将 `directory()` 一路传递下去。修复 #48237。

4. **[#48243](https://github.com/anomalyco/opencode/pull/48243) — `fix(app): hide outgoing browser when switching sessions`**（已关闭）
   在 cleanup effect 中捕获浏览器注册，使原生视图不会在切换会话时相互串扰，同时保持标签页存活以便恢复。

5. **[#46670](https://github.com/anomalyco/opencode/pull/46670) — `feat(app): add session history sidebar`**（开放中）
   用常驻的“项目 + 会话”侧边栏取代 v2 布局中的浮动会话标签页——回应了较新构建中侧边栏缺失（#48206）的抱怨。

6. **[#48236](https://github.com/anomalyco/opencode/pull/48236) — `feat(app): add mission control`**（已关闭）
   为 v2 新增的应用级界面。摘要中未包含状态细节，但这是应用层面的结构性新增。

7. **[#48235](https://github.com/anomalyco/opencode/pull/48235) — `fix(tui): guard location refresh against startup race`**（开放中）
   TUI 的 Data provider 在启动时会并发发起 8 次位置刷新；该 PR 将其串行化。关闭 #40002。

8. **[#48225](https://github.com/anomalyco/opencode/pull/48225) — `fix(acp): restore session options and reasoning boundaries`**（开放中）
   恢复 ACP 的 reasoning-budget 语义，并在协议层保留会话选项。修复 #31961 背后的回归问题。

9. **[#41449](https://github.com/anomalyco/opencode/pull/41449) — `feat(tool): add interactive terminal tool with vscode auto-attach`**（已关闭）
   新增 `terminal` 工具，可驱动真实 PTY 并自动将会话附加到 VS Code。显著扩展了 agent 的工具能力面。

10. **[#41431](https://github.com/anomalyco/opencode/pull/41431) — `fix(desktop): bundle CLI in release apps`**（已关闭）
    将内嵌的 V2 CLI 打包为外部可执行文件，覆盖 dev、beta 与 production 版本。解决了因缺少随附 CLI 导致的桌面版启动失败。

## 功能请求趋势

各 issue 和 PR 中正在浮现出几个反复出现的方向：

- **配置、agents、skills 与 commands 的热重载**（#8751）——呼声最高的单项能力，已被视为 DX 基线。
- **Goal / 自主长程模式**（#48240、#48239）——相关提案包括基于事件溯源的单目标领域模型、CAS 修订机制、面向模型的 goal 工具，以及同会话 round driver。plan 模式可被 bash 绕过（#39491）的现状，进一步加速了更严格治理的推进。
- **会话存储与事件治理**（#48245、#48241、#42748）——社区正大力推动对 diff/事件增长设限，杜绝 GB 级会话日志的产生。
- **桌面版分发打磨**（#48099 MSI 安装器；#48202 终端面板冻结；#47013 离线启动失败；#25701 PWA 主题化）——打包、更新韧性以及 Mac/Windows 专项修复主导着桌面版反馈。
- **索引器 / 自动补全正确性**（#32747、#34040）——TUI 的 `@` 选择器必须反映运行时文件系统状态，包括外部引用目录。
- **通知体验**（#35282 完成时响铃）——多位用户希望任务完成时有可听见的提示信号，类似 Grok Build 的做法。
- **子 agent 权限作用域**（#41730）——自动批准标志不会级联到子 agent，破坏了常见的自动化模式。

## 开发者痛点

- **长会话膨胀**：单次运行产生 GB 级的 `message.updated` 事件，会拖垮存储和下游 JSONL 消费方（#42238、#48241）。
- **Provider 脆弱性**：环境配置不完整导致崩溃循环（#42739）、Gemini 上不可恢复的 400 错误（#47034），以及 Azure 图片数量上限未被路由到媒体剥离压缩路径（#39677）。
- **TUI 状态过期**：`@` 提及与引用别名无法跟踪启动后的文件变更（#32747、#34040）。
- **Plan 模式信任边界**：模型可轻易通过 bash heredoc 逃出 plan 模式（#39491）。
- **桌面版可靠性**：终端面板冻结（#48202）、离线启动失败（#47013）以及侧边栏缺失/不完整（#48206）引发大量用户不满反馈。
- **自动批准权限体验**：无活动会话时开关置灰（#48237），且 `opencode run --auto` 不会传播到子 agent（#41730）。
- **会话体验**：Mac 桌面版会打断正在运行的回合，而不是将后续输入排队（#48203）；TUI 在启动时重复并发触发位置刷新（#48235）。

---

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区简报 — 2026-09-10

## 今日要点

社区的关注点仍集中在提供商兼容性的边缘场景和多进程可靠性上，讨论热度最高的话题包括：Anthropic 会话挂起、OpenRouter `:free` 模型返回 400,以及 OAuth 凭证过期导致 48 秒启动延迟。文档与工具方面，已合并的 PR 集中在体验打磨(光标定位、导航校验)，而针对 `pi-safe-compact` 的一次值得关注的供应链风险标记，则凸显了新的包举报(package-report)流程的价值。

## 版本发布

过去 24 小时内没有新版本发布。

## 热门 Issue

1. **#5291 — 使用 Anthropic 订阅时，会话卡在 "Working..." 上** (已关闭，10 条评论，👍 3)
   在 Anthropic Enterprise 下，会话会间歇性地在某轮对话进行到一半时卡住；执行 resume 也只能部分恢复。这是影响一个高用量提供商的核心可靠性问题。[链接](https://github.com/earendil-works/pi/issues/5291)

2. **#8928 — 并行启动 pi 时因 OAuth 凭证过期，约 48 秒内持续报 "No API key found"** (开放中，6 条评论)
   提供了可稳定复现的用例和计时数据，表明多进程环境会放大一个已知的认证查找问题(#1871、#4919、#6880)。该错误被错误地归因到当前活跃的提供商头上，妨碍排查。[链接](https://github.com/earendil-works/pi/issues/8928)

3. **#5105 — 压缩摘要化时忽略已配置的 transport** (已关闭，6 条评论)
   压缩(compaction)重建 stream options 时丢掉了 `sessionId`/`transport`,让所有配置的 transport 与 `auto` 不一致的 `openai-codex-responses` 用户中招。对重度用户而言，这是一个隐蔽但影响巨大的回归。[链接](https://github.com/earendil-works/pi/issues/5105)

4. **#8760 — OpenRouter `:free` 模型以 400 失败(max_tokens 超出提供商限制)** (开放中，5 条评论)
   Pi 会把目录中的 `maxOutputTokens` 原样发出去，该值超出了上游提供商对多个 `:free` 模型设定的硬性上限。任何以交互方式选用这些模型的用户都会中招。[链接](https://github.com/earendil-works/pi/issues/8760)

5. **#9381 — 包举报:pi-safe-compact 因恶意/不安全行为被标记** (已关闭，5 条评论)
   针对 `pi-safe-compact@0.6.3` 的举报，理由是维护者(`primp9053`)已联系不上——这是新的包举报流程面临的一次真实考验。作为供应链分诊的先例，值得关注。[链接](https://github.com/earendil-works/pi/issues/9381)

6. **#9290 — Extension API 的 `modelRegistry.complete()` 缺少 `x-opencode-session` 请求头** (已关闭，5 条评论)
   opencode.ai 自 2026-09-06 起开始强制要求该请求头；在 Pi 实现转发之前，所有由扩展发起的请求都会失败。对使用 opencode-go 模型的扩展作者尤为重要。[链接](https://github.com/earendil-works/pi/issues/9290)

7. **#9294 — `claude-fable-5` 的 allowedFallbackModels 中列有已被拒绝的模型** (开放中，4 条评论)
   内置回退列表仍引用 `claude-opus-4-8`,而该 API 现在会以 400 拒绝它。所有带 `--model claude-fable-5` 的请求都会立即失败——这是一个内置目录 bug。[链接](https://github.com/earendil-works/pi/issues/9294)

8. **#8810 — 扩展注册的提供商：新建会话忽略 defaultProvider/defaultModel** (开放中，4 条评论，👍 1)
   当配置的默认项是通过 `pi.registerProvider` 注册时，Pi 会静默回退到另一个提供商的默认值。问题间歇出现、难以复现——对基于扩展的工作流而言是个信任问题。[链接](https://github.com/earendil-works/pi/issues/8810)

9. **#9311 — 全屏鼠标选区在会话切换后仍然残留** (开放中，4 条评论)
   切换后，TUI 的选区状态会泄漏到新会话里，造成误覆盖。修复很简单(切换时清除选区)，但日常使用中确实烦人。[链接](https://github.com/earendil-works/pi/issues/9311)

10. **#9394 — 从 openai-codex 目录中移除 `gpt-5.4`** (已关闭，3 条评论)
    `gpt-5.4` 和 `gpt-5.4-mini` 在 Codex(ChatGPT)账户上均已不可用。目录漂移需要清理。[链接](https://github.com/earendil-works/pi/issues/9394)

## 重点 PR 进展

1. **#9380 — docs: 校验文档导航与可达性** (已合并)
   将 `packages/coding-agent/docs/docs.json` 确立为权威导航清单，在测试套件中校验结构、slug、本地链接与可达性——还能顺带发现文档评测用例。[链接](https://github.com/earendil-works/pi/pull/9380)

2. **#9382 — 浏览历史时光标始终置于末尾** (已合并)
   将历史导航行为与 bash 对齐：按上方向键召回时光标停留在末尾。移除了 Pi 原本不一致的逻辑。[链接](https://github.com/earendil-works/pi/pull/9382)

3. **#9376 — fix(ai): 对 Mistral 托管的 GLM(zai-glm-5-2)使用 `reasoning_effort`** (已合并)
   Mistral 宣告支持 `reasoning: true`,但对 GLM-5.2 实际只认 `reasoning_effort`。通过 `prompt_mode: "reasoning"` 修复了 Mistral 托管 GLM 的推理功能。[链接](https://github.com/earendil-works/pi/pull/9376)

4. **#9374 — fix(coding-agent): 会话操作进行期间拒绝重载** (已合并)
   在重载路径中加入 `isStreaming`/`isCompacting` 守卫，防止 RPC 扩展在工具调用中途使 runner 失效——堵上了一个状态损坏漏洞。[链接](https://github.com/earendil-works/pi/pull/9374)

5. **#9370 — docs: 将交互式测试与发布指南抽取为 skills** (已合并)
   把交互式测试和发布工作流从长篇文档抽取为可复用的 skills,降低了贡献者的上手门槛。[链接](https://github.com/earendil-works/pi/pull/9370)

6. **#9368 —(误提交的 PR)** (已关闭)
   已由作者关闭；没有任何改动。值得一提，提醒大家启用分支保护/默认创建草稿 PR。[链接](https://github.com/earendil-works/pi/pull/9368)

## 热门讨论

**成果展示**
- **#8803 — pi-verdict:一个为 pi 打造的极简权限门控**，作者 jesset
  单文件、零依赖的 "allow / ask / deny" 钩子，拦截每一次工具调用——明确把自己定位为 README 里说“你必须自己动手搭建”的那套确认流程。[链接](https://github.com/earendil-works/pi/discussions/8803)
- **#9373 — pi-agent-views:并发子代理，由 pi 渲染**，作者 AllanZyne
  并行运行多个 agent(各自使用独立的模型)，并在它们之间切换而不丢失上下文，对标 Claude Code 的 agent 视图。[链接](https://github.com/earendil-works/pi/discussions/9373)

## 功能请求趋势

- **提供商/模型目录治理**：持续不断的主旋律——移除 `gpt-5.4`(#9394)、清理 Claude 回退列表(#9294)、OpenRouter `:free` token 上限(#8760)、Mistral 推理格式(#9376)。对自动化目录校验的诉求已不言自明。
- **TUI/UX 打磨**：历史记录中的光标定位(#9382)、全屏选区残留(#9311)、可配置滚动速度(#9315)、可折叠代码块(#9397)、扩展小部件排序(#9401)——都是渐进式的小改进，但方向始终一致。
- **Extension API 走向成熟**：社区持续呼吁稳定的 `registerProvider` 语义(#8810)、`modelRegistry.complete()` 的请求头转发(#9290)、RPC 模型/thinking 命令上的显式 `persist` 标志(#9393),以及不带 CLI 副作用的纯 SDK 导出(#9286)。
- **文档即代码**:PR #9380 和 #9370 展现出从散文式文档转向可校验文档、基于 skill 的工作流的明确趋势。

## 开发者痛点

- **跨提供商可靠性噪音**：会话挂起、归因错误的认证报错和目录漂移，迫使用户把时间花在调试 Pi 而不是自己的正事上(#5291、#8928、#8760、#9294)。
- **多进程/启动竞态**:OAuth 凭证过期触发的慢路径是一个反复出现的已知问题，并伴有多份重叠的重复 Issue(#1871、#4919、#6880 → #8928)。
- **扩展与核心之间的契约缺口**：新要求(opencode 会话头、默认提供商解析、SDK 导入形态)总在发布之后才让扩展作者措手不及(#9290、#8810、#9286)。
- **上下文/状态损坏**：流式输出期间的重载(#9374)以及被中止的工具调用留下的未配对 `toolCall` 块(#9306),都会造成隐蔽且难以恢复的会话损坏。
- **Node.js 版本敏感性**:`node:fs` 具名导入在 Node 20 上的破坏会直接表现为 CLI 硬失败(#9400、#9402)——现代 Node ESM 导入方面的回归依旧是个摩擦点。

---

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-10

## 今日要点

今天发布了 **v0.23.2**，带来了 web-shell 分屏导航改进以及一个 checkpoint 重试修复（避免 claim-budget 卡死），同时发布了 SDK TypeScript v0.1.11 包和 cua-driver-rs v0.20.5 的预编译二进制。一组 **P1 级 Windows/ConPTY 进程泄漏问题**（#11303、#11352）正在主导工单队列，此外一个新出现的 **P1 级回归**引起关注：VS Code Companion 扩展从 v0.21.x 升级到 v0.23.x 时会丢失全部对话历史（#11489）。TUI 还在多个后台子智能体接连完成时暴露出一个 **未被捕获的 React #185 崩溃**（#11500）。

## 发布

- **v0.23.2** — web-shell 分屏会话导航改进（#11250），以及一个 goal-runtime 修复：对超出 claim budget 的 checkpoint 进行重试而不是消耗一次卡顿（#11365）。[Release notes](https://github.com/QwenLM/qwen-code/pull/11250)
- **v0.23.2-nightly.20260909.2e212144d3** — 跟踪上述版本的滚动 nightly 构建。
- **sdk-typescript-v0.1.11** — 捆绑 CLI 0.23.2（与 SDK 基于同一 ref 构建）。
- **cua-driver-rs-v0.20.5** — 已签名/已公证的 macOS 通用二进制 + `QwenCuaDriver.app`，Linux glibc 2.31+ 未签名版本（x86_64/arm64），Windows UIAccess worker + 原生 SDK payload。

## 热门 Issue

1. **[P1] #11303** — Windows 下 `qwen-cli`（VS Code Companion）泄漏无头 `conhost.exe` ConPTY 进程：运行约 12 小时后出现 347 个子进程 / 约 2.8 GB 占用。已完成分诊，根因拆分为 node-pty 侧的子问题（#11352）。（12 条评论）[链接](https://github.com/QwenLM/qwen-code/issues/11303)
2. **[P1] #11119** — `qwen serve`：当会话运行时回收时，后台 shell 输出和唤醒通知被静默丢弃，导致 web-shell 会话陷入僵死。（10 条评论）[链接](https://github.com/QwenLM/qwen-code/issues/11119)
3. **[P1] #11489** — VS Code Companion 扩展从 v0.21.x 更新到 v0.23.x 后，侧边栏中所有已记录的对话历史消失；记录仍存在于 `state.vscdb` 中，但新版客户端无法读取。（4 条评论）[链接](https://github.com/QwenLM/qwen-code/issues/11489)
4. **[P1] #11500** — 多个后台子智能体接连完成时，交互式 TUI 静默退出（未捕获的压缩后 React 错误 #185，"Maximum update depth exceeded"）；恢复后的 CLI 报告 "Previous session appears corrupted"。（3 条评论）[链接](https://github.com/QwenLM/qwen-code/issues/11500)
5. **[P1] #11352** — `@lydell/node-pty` 1.2.0-beta.10 在 shell 自然退出时泄漏 ConPTY 宿主进程（`conhost.exe`），因为 baton 在 `onExit` 之前被清除，导致 JS 端无法到达 `ClosePseudoConsole`。（4 条评论）[链接](https://github.com/QwenLM/qwen-code/issues/11352)
6. **[P1] #11403** — ECS runner 集群更新到 0.23.1 失败；`ecs-update-hk-2`、`ecs-update-...` 等池仍被锁定在比本次发布要求更旧的 CLI 版本上。（4 条评论）[链接](https://github.com/QwenLM/qwen-code/issues/11403)
7. **[P2] #11186** — `serve`：通道所有权模型未覆盖绑定到主目录的工作区读取用户作用域设置的情形；设置加载器将共享的设置文件归到用户作用域，而实际上应该由守护进程进行中介。（4 条评论）[链接](https://github.com/QwenLM/qwen-code/issues/11186)
8. **[P2] #11503** — 当 `.git` 是指向另一卷的 NTFS junction/symlink 时，守护进程守卫会拒绝对会话自身工作区的只读 `git status`/`log`/`diff` —— 这是仅限 Windows 的容器化误报。（3 条评论）[链接](https://github.com/QwenLM/qwen-code/issues/11503)
9. **[P2] #11328** — provider-configured reasoning 的跟进：PR #10999 有意限制了影响面；剩余的边界情况需要为 deepseek-v4-pro 及后续版本进行跟踪。（4 条评论）[链接](https://github.com/QwenLM/qwen-code/issues/11328)
10. **[P3] #11475** — 功能请求：为 `qwen serve` 提供支持的远程文件夹工作流 —— 本地交互式客户端、远程守护进程/工作区/智能体。（3 条评论）[链接](https://github.com/QwenLM/qwen-code/issues/11475)

## 关键 PR 进展

1. **#11488** `feat(acp): register daemon-managed sessions in the session registry and let them send peer messages` — 由 `qwen serve` 驱动的会话现在会出现在 `qwen sessions ps` 和其他会话的 `list_agents` 中，可以通过名称寻址，并通过 `send_message` 接入终端。[PR](https://github.com/QwenLM/qwen-code/pull/11488)
2. **#11241** `feat(browser-use): add Playwright-based Browser SDK` — 在常驻 Node REPL 中运行的、面向模型、带类型的 Browser SDK；融合了 Codex 风格的语义化 Playwright locator、DOM 快照引用和视觉坐标这三种识别方式。[PR](https://github.com/QwenLM/qwen-code/pull/11241)
3. **#11003** `feat: delegate a subagent turn to an external agent over ACP (Claude Code first)` — 子智能体定义可以声明一个 `executor` 块；该 turn 通过 ACP 在外部进程中驱动，并作为子智能体的流重新发布。[PR](https://github.com/QwenLM/qwen-code/pull/11003)
4. **#11276** `feat(web-shell): add web previews with saved delivery history` — Web 预览面板，支持桌面/移动宽度、刷新以及外部打开；独立 Web Shell 默认会为工作区会话启用此功能。[PR](https://github.com/QwenLM/qwen-code/pull/11276)
5. **#11490** `refactor(core): split the web_search DashScope client into a backend and surface page titles` — 搜索结果附带页面标题，DashScope 客户端置于 backend 接口之后，使搜索侧的模型可以以 `Sources:` 块开篇。[PR](https://github.com/QwenLM/qwen-code/pull/11490)
6. **#11396** `feat(web-shell): route scheduled runs by model and group` — 在选择 "New session each run" 时，Web Shell 的定时任务现在可以指定已配置的模型以及已有/新建的会话组；路由会随持久化任务一起保存。[PR](https://github.com/QwenLM/qwen-code/pull/11396)
7. **#11455** `fix(acp): Preserve submitted prompt provenance for auto recall` — 将原始非空的提交文本传递给新的 ACP 用户 turn 的 `UserPromptSubmit` 钩子，从而在守护进程会话中启用 Mem0 Auto Recall 钩子。[PR](https://github.com/QwenLM/qwen-code/pull/11455)
8. **#9466** `refactor: anchor rewind mapping to stable prompt identity` — rewind 现在通过持久化的 prompt identity 而非按位置的 turn 顺序来解析目标 prompt，可在会重排/重编号的界面（resume、无头 `-p --resume` 等）中存活。[PR](https://github.com/QwenLM/qwen-code/pull/9466)
9. **#10906** `feat(web-shell): show shell and monitor task output` — 捕获的 Shell/Monitor 输出现在被持久化，并通过一个限定活动会话所有者的端点暴露，返回经过清洗的尾部内容。[PR](https://github.com/QwenLM/qwen-code/pull/10906)
10. **#10347** `feat(core): auto-retry transient network errors (EOF) where Ctrl+Y is unavailable` — 将围绕底层网络失败（如 `400 network error ... EOF`）的 4xx 包装识别为可重试的传输错误，使有界自动重试在无头运行中也能生效。[PR](https://github.com/QwenLM/qwen-code/pull/10347)

## 功能请求趋势

- **`qwen serve` 的远程开发模式**（#11475）—— 本地交互式客户端、远程守护进程/工作区，建立在已有的远程 web-shell 和多工作区 API 之上。
- **面向规模化会话/提示词索引的内嵌 SQLite**（#11433、#11493）—— 长对话、多会话、精确提示词查询、记录回放、重连/附着；索引缓存的准入悬崖（64 MiB 硬上限、无 LRU 淘汰）是当前最关键的痛点。
- **Browser-use SDK**（#11241 — 已合入）—— 在常驻 Node REPL 中向模型暴露的、基于 Playwright 的带类型 Browser SDK。
- **在 VS Code Companion 中复用 WebShell 记录 UI**（#9187）—— 在保留 ACP 传输和 VS Code 特定能力的同时，共享 web-shell 的会话流。
- **跨会话持久化记忆**（#11502）—— 第三方记忆层提案，用于跨会话和模型升级保留仓库约定、偏好与决策。
- **会话工作流 DAG 导航 + 检视器界面精简**（#10938）—— 让依赖边可导航，并减少检视器的界面噪音。
- **带保存投递历史的 Web 预览**（#11276 — 已合入）—— 浏览器可达的 URL 可在 web shell 中查看。

## 开发者痛点

- **Windows ConPTY / `conhost.exe` 进程泄漏** —— 今日被引用最多的 P1 集群（#11303、#11352）；根因部分超出在固定 `@lydell/node-pty` 版本下 JS 端的能力范围，仅剩下容器化修复这一条路径。
- **扩展升级导致对话历史丢失**（#11489）—— `state.vscdb` 中仍存有数据，但 v0.23.x 无法读取；典型数据迁移回归。
- **后台智能体并发完成时 TUI 崩溃**（#11500）—— Ink `useBoxMetrics` 监听器的 `setState` 循环触发 React #185，且未暴露错误。
- **守护进程通道所有权模型未覆盖工作区/用户设置的交互**（#11186）—— 当 `qwen serve` 绑定到 `$HOME` 且工作区作用域被禁用时尤为突出。
- **守护进程守卫对 junction/symlink 的 `.git` 元数据产生误报**（#11503）—— 仅限 Windows 的容器化缺陷，会阻断会话自身的只读 git 操作。
- **provider-configured reasoning 边界情况**（#11328）

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*