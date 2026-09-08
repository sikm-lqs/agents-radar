# AI CLI 工具社区动态日报 2026-09-09

> 生成时间: 2026-09-08 23:30 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比报告 — 2026-09-09

## 1. 生态系统概览

AI 编码代理 CLI 市场已成熟为一个拥挤的赛道，至少有七款积极维护的工具，横跨闭源厂商产品(Claude Code、Codex、Copilot CLI)、大厂开源项目(Gemini CLI、Qwen Code)以及独立开源挑战者(OpenCode、Pi)。竞争重心已决定性地从核心 agent-loop 能力转向**可靠性工程**——会话恢复、上下文压缩、沙箱隔离和失控代理保护同时占据着每一个 issue 跟踪器的头条。第二条清晰的主线是**表层扩张**(surface expansion):几乎每家厂商都在把 CLI 核心包裹进桌面应用、Web Shell、SDK 和扩展框架之中，而这些外壳正是当下回归问题的最大来源。最后，随着模型能力日趋同质化，可扩展性(插件、skills、MCP、扩展 SDK)正成为主要的差异化战场。

## 2. 活跃度对比

| 工具 | Issues(24h 摘要)| PR(24h)| Discussions(24h)| 发布状态 |
|---|---|---|---|---|
| **Claude Code** | 10 个热点 issue | 1 | N/A* | **v2.1.265 已发布**(telemetry + plugin-dir)|
| **OpenAI Codex** | 10 个热点 issue | 10(另有 3 个备注)| 13(4 ideas / 5 Q&A / 4 show-and-tell)| 2 个 alpha 版本(rust-v0.154.0-alpha.7/.8)|
| **Gemini CLI** | 10 个热点 issue | 10 | N/A* | 3 个版本(v0.59.0 stable、preview、nightly)|
| **Copilot CLI** | 10(另有 6 个在跟踪)| 4 | N/A* | v1.0.84-2(Vim 模式 GA)|
| **OpenCode** | 10 个热点 issue | 10 | N/A* | 过去 24h 无发布 |
| **Pi** | 10 个热点 issue | 10(另有 4 个备注)| 3(show-and-tell)| 过去 24h 无发布 |
| **Qwen Code** | 10 个热点 issue | 10(另有 2 个备注)| N/A* | 4 个版本(v0.23.1、preview、SDK 0.1.9/0.1.10)|

\* *N/A = 本周期内未呈现讨论数据，不代表渠道不活跃。计数反映各 24h 摘要中呈现的条目(通常为 top-10 列表)，并非 GitHub 的完整总量。*

**值得注意：**Claude Code 仅有的一个 PR(#63686,stale 超时 14→90 天)反映了其以 issue 跟踪器为中心的封闭贡献模式；其版本号(2.1.**265**)暗示它是本组中底层发布节奏最快的工具。Codex 是唯一一个 Discussions 频道数据齐全的工具。

## 3. 共性功能方向

- **会话恢复与连续性**——*Claude Code、Copilot CLI、Codex、OpenCode、Gemini CLI。*最普遍的痛点类别：Claude Desktop 会静默将 `cliSessionId` 置空(#92825),并在重新启动时杀掉后台任务(#92687);Copilot 的恢复功能会触发 OOM(#4664)、出现失效的连接 ID(#4505)以及 MCP 服务器被杀(#4753);Gemini 的 `/compress` 无法在恢复后保留(#21335);OpenCode 用户希望支持会话解档(#24153)。
- **沙箱与权限模型细化**——*全部七款工具。*Gemini 正在加固文件系统边界(#29214);Codex 的 `workspace-write` DENY ACL 会拦截合法的 Git worktree 写入(#32880);Copilot 的 `--yolo` 状态不确定(#4757、#4696);Qwen 的 pattern 拒绝规则过度泛化(#11405);Claude Code 会从无关语句推断出进入受限文件夹的权限(#92947)。
- **安全加固**——*Gemini CLI、Codex、Qwen、Pi、Copilot CLI。*间接提示注入修复(#29250)、RFC 9207 OAuth issuer 强制校验、带硬编码凭据且未鉴权的 `a2a-server`(#29001)、MCP OAuth 刷新令牌循环(#39054)、以及加固改动在落到 `main` 时丢失的问题(#11205)。
- **持久记忆 / 代理学习**——*Codex、Gemini CLI、OpenCode、Pi。*Codex 的 `/learn` + AGENTS.md“规则代谢”RFC(#40575)、Gemini 的 Auto Memory 确定性脱敏推进(#26525)、OpenCode 拥有 144 条评论的 Memory Megathread 落幕、Pi 的 Context Memory tracing 实验。
- **用量与成本透明度**——*Codex、Pi、OpenCode。*额度尚有余量却报容量错误(#43337)、订阅计费 API 的诉求(#43788)、提供商上报的计费成本(#6881)、tokens/sec 显示(109👍,#5374)。
- **循环 / 失控代理保护**——*OpenCode、Gemini、Qwen。*364 次一模一样的子代理 `grep` 调用(#45442)、MAX_TURNS 中断被误报为成功(#22323)、提示词层面的反轮询指引(#48041)。

## 4. 差异化分析

- **Claude Code**——企业级表层扩张：Desktop/Cowork 网关遥测(`user.email`/`user.groups`)、基于文件夹的插件发现、hooks 自动化。痛点集中在 Desktop 外壳而非 CLI 核心。目标人群：专业团队；以 issue 跟踪器为先的社区模式。
- **OpenAI Codex**——基础设施投入最深：按 alpha 节奏推进的 Rust CLI 重写、语音会话指标、Apps-tool 实时刷新、无处不在的 tracing。研究导向最强的社区(自进化代理 RFC),以及最大的高👍需求积压(LSP:481👍)。Windows 迄今为止是其呼声最集中的痛点来源，远超其他平台。
- **Gemini CLI**——安全上最超前：一整波加固浪潮(路径遍历、注入、OAuth、原子写入)，加上对零依赖 OS 级沙箱(#19873)和 AST 感知工具(#22745)的战略押注——它与 Codex 是仅有的两个明确推进语言服务器支撑的工具。
- **Copilot CLI**——GitHub/企业集成的护城河：Entra ID OAuth、托管策略、沙箱审计日志。以里程碑驱动交付 UX(Vim 模式 GA 兑现了一个 76👍 的请求)。对模型提供商扩展性的需求强烈(OpenRouter,#2943),但官方尚未提供。
- **OpenCode**——开源、模型无关的挑战者，目前处于性能修复期(CPU/OOM 问题群)，同时在预架构将 v2 桌面端做成可组合的插件包(#47935–47948)。
- **Pi**——面向高级用户的最小内核、扩展优先设计：最广的提供商协议覆盖推进(Bedrock Mantle、Kimi wire format、Codex bearer tokens)、明确的启动延迟 SLO(#7739)、压缩正确性工作。深入且达到专职维护者水准的贡献占比最高。
- **Qwen Code**——聚焦可嵌入性：daemon/ACP 架构、面向第三方前端的 Web Shell、SDK 发布节奏、基于二维码的远程配对(#11172),以及密集的多提供商推理力度预设(GPT-5/6、Kimi、Qwen、DeepSeek)。工程严谨性突出(16 轮 review、针对 fork 压力的 CI 隔离)。

## 5. 社区势头与成熟度

- **互动领跑者：Codex 与 OpenCode。**Codex 创下当日最大的原始互动量(481👍 的 LSP 请求、122👍 的 `/rewind` 讨论、46 条评论的 WSL 帖子)；OpenCode 的 Memory Megathread(144 条评论/110👍)和 CPU 回归帖(51 条评论)展现出一个人声鼎沸、积极协同调试的用户群。
- **发布速度：Claude Code 与 Qwen Code。**Claude Code 的补丁编号暗示其近乎持续交付；Qwen 在 24h 内横跨 CLI 与 SDK 发布了 4 个制品；Gemini 运行着 stable/preview/nightly 流水线。
- **贡献模式的分化具有决定性。**开源工具(Gemini、OpenCode、Pi、Qwen)每天有 10+ 个实质性 PR,其中包括外部贡献者；厂商仓库则以内部/流程类 PR 为主，社区能量集中在 issue 上。
- **成熟度信号：**Claude Code 与 Copilot 呈现企业级层面的关切(身份、遥测、策略、triage 生命周期——注意 Claude 将 stale 超时放宽为 14→90 天)。Pi 与 Qwen 仍处于较早的架构定义阶段；OpenCode 正处于转型中段。Gemini 主动出击的安全 PR 浪潮——在漏洞被利用之前即关闭 issue——是本组中最强的工程卫生信号。

## 6. 趋势信号

1. **会话状态是新的关键基础设施。**本周期每款工具最严重的 bug 都与恢复、交接或压缩损坏会话状态有关。评估工具时，请先在负载下测试恢复路径——它比跑分更能预测真实环境的耐用性。
2. **包裹 CLI 核心的桌面外壳是系统性的回归高发区**(Claude Desktop、Copilot 1.1.15、OpenCode sidecar、Codex desktop)。在所有厂商中，CLI 依然是最稳定的表层。
3. **沙箱正在向 OS 级隔离收敛，但过度拦截成了新的易用性税。**预计默认设置会更收紧，请提前在 CI 和代理策略中为合法操作(Git worktree、链接路径)规划豁免。
4. **Windows 在全行业都是二等公民**——ConPTY 泄漏、WSL 故障、路径逃逸 bug、MSIX 失败、会话被锁。WSL 优先的工作流仍是务实的默认选择。
5. **配额/计费不透明是新兴的抱怨类别**(Codex 容量错误、Luna 与 Astra 之间的账目差异、Pi 的提供商上报成本 API)。成本可观测性将成为选型标准。
6. **提供商无关性与 BYOK 需求持续上升**(OpenRouter 接入 Copilot、Pi 与 Qwen 支持 Bedrock/Kimi/DeepSeek)——厂商施加的锁定压力正遭到社区的积极抵抗。
7. **记忆系统正从提示词启发式走向确定性、可审计的机制**——对于敏感仓库，任何缺乏确定性脱敏和循环上限的“auto memory”都应视为不成熟。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告
*数据快照：2026-09-09 · 来源：github.com/anthropics/skills*

> **数据说明：** 源数据中未提供 PR 评论数（所有 PR 均显示 `Comments: undefined`）。因此下方的 PR 列表按数据集自身的排序排列（该排序综合了更新时间和互动信号）。Issue 的评论数据完整，已用于基于 Issue 的分析。

---

## 1. 热门 Skills 排行榜——最受关注的 PR

| 序号 | PR | Skill / 主题 | 状态 | 备受关注的原因 |
|---|---|---|---|---|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator：修复 `run_eval.py` recall=0% 的 bug**（另含 Windows 流式读取、并行 worker 修复） | OPEN | 修复了用于*优化每个 skill 描述*的标准评估流水线。在 recall=0% 的情况下，优化循环数月以来一直在对噪声做训练（bug #556 已被复现 10+ 次）。作者 MartinCajiao。 |
| 2 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography**——排版质量控制（孤行、寡行、编号） | OPEN | 解决*每一份* Claude 生成文档都会出现的缺陷。杠杆效应高，因为它能提升所有产出文字内容的 skill 的输出质量。 |
| 3 | [#1615](https://github.com/anthropics/skills/pull/1615) | **scnet-hpc**——面向 SCNet HPC 集群的 Slurm/SSH 工作流 | OPEN | 通过基于 profile 的集群发现机制，将 HPC 领域（一个重要垂直方向）纳入 marketplace。 |
| 4 | [#83](https://github.com/anthropics/skills/pull/83) | **skill-quality-analyzer + skill-security-analyzer** marketplace 新增项 | OPEN | 用于评估*其他* skill 的元 skill。表明生态系统已成熟到需要自我验证工具的地步。 |
| 5 | [#486](https://github.com/anthropics/skills/pull/486) | **odt**——OpenDocument（.odt/.ods）读取、写入、模板填充 | OPEN | 将文件格式覆盖面扩展到 ISO 标准的 LibreOffice 生态——这是用户经常提出的请求。 |
| 6 | [#210](https://github.com/anthropics/skills/pull/210) | **frontend-design** 清晰度/可执行性重写 | OPEN | 长期推进的修订，目标是让每条指令都能在一次对话内具体可执行。 |
| 7 | [#1628](https://github.com/anthropics/skills/pull/1628) | **Hivemind**——利用免费 headless opencode worker 的多智能体编排 | OPEN | 提出一种成本管理模式：昂贵的 Claude 留作规划者/审查者，廉价的 worker 处理机械性工作。 |
| 8 | [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns**——Testing Trophy、单元/React/E2E 测试指南 | OPEN | 全面的跨技术栈测试 skill；填补了开发者工作流覆盖上的一个已知空白。 |

---

## 2. 社区需求趋势（来自 Issue）

按评论量排序：

- **🔒 Skills 分发模型的安全与信任**——[#492](https://github.com/anthropics/skills/issues/492)（43 条评论，数据集中互动量最高的 issue）指出，以 `anthropic/` 命名空间发布的社区 skill 会造成信任边界漏洞。该讨论的活跃时长几乎超过所有其他 issue，是事实上的头号关注点。
- **企业共享工作流**——[#228](https://github.com/anthropics/skills/issues/228)（16 条评论，8 👍）希望在 Claude.ai 中提供组织级 skill 库，让团队不必再通过 Slack 传阅 `.skill` 文件。
- **评估工具本身的可靠性**——[#556](https://github.com/anthropics/skills/issues/556)（12 条评论，7 👍）——`run_eval.py` 在评估期间从不触发 skill。直接催生了 PR #1298、#1099、#1050。
- **紧凑/符号化的 agent 状态**——[#1329](https://github.com/anthropics/skills/issues/1329)（9 条评论）提出 `compact-memory`，以降低长期运行 agent 的文字笔记的 token 开销。
- **插件去重与清理**——[#189](https://github.com/anthropics/skills/issues/189)（6 条评论，9 👍）——`document-skills` 与 `example-skills` 内容重叠；用户遭遇重复 skill 污染。
- **Agent 治理/安全模式**——[#412](https://github.com/anthropics/skills/issues/412)（6 条评论，已关闭且未合并）——提出策略执行、威胁检测、审计追踪等模式。
- **推理质量门禁流水线**——[#1385](https://github.com/anthropics/skills/issues/1385)（4 条评论）——任务前校准 → 对抗性审查 → 交付验证；与 PR #1367 相关联。
- **捆绑 skill 带来的上下文窗口压力**——[#1487](https://github.com/anthropics/skills/issues/1487)（4 条评论）——`claude-api` 会急切注入 ~156k token，一次工具调用就耗尽上下文。
- **Skills 与 MCP 互操作**——[#16](https://github.com/anthropics/skills/issues/16)（4 条评论）——将 skill 暴露为 MCP，以获得可移植的 agent API。
- **云平台功能对齐**——[#29](https://github.com/anthropics/skills/issues/29)（4 条评论）——AWS Bedrock 上的 Skills 支持仍未解决。

**反复出现的需求方向：** *质量保障工具、安全/信任边界、多智能体与成本控制模式、文档/文件格式广度、组织级分发。*

---

## 3. 高潜力待合并 Skills

仍处于 OPEN 状态、近期活跃、且有望很快落地的 PR：

| PR | Skill | 有望合并的原因 |
|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 评估修复 | 为所有依赖 `run_loop.py` 的 skill 解除阻塞；关闭标志性的 #556 bug。 |
| [#1724](https://github.com/anthropics/skills/pull/1724) | mcp-builder 默认模型改为 claude-sonnet-5 | 机械性的模型 ID 刷新；风险极低。 |
| [#1607](https://github.com/anthropics/skills/pull/1607) | claude-api 已退役模型清理 | 纯文档修复，移除四个已弃用的模型 ID。 |
| [#538](https://github.com/anthropics/skills/pull/538) + [#541](https://github.com/anthropics/skills/pull/541) + [#539](https://github.com/anthropics/skills/pull/539) | pdf/docx/skill-creator 正确性修复 | 来自 Lubrsy706 的一系列紧凑、范围清晰的 bug 修复；审查阻力小。 |
| [#1734](https://github.com/anthropics/skills/pull/1734) | 检测 docx 中的孤立批注 | 针对性的缺陷检测；与现有 docx skill 形成互补。 |
| [#1595](https://github.com/anthropics/skills/pull/1595) | UIZZE 合作伙伴 skill 列表 | 合作伙伴板块新增条目；已有先例可循。 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit v1.3.0 | 机械验证 + 推理质量门禁；与 Issue #1385 互补。 |
| [#514](https://github.com/anthropics/skills/pull/514) | document-typography | 普遍适用；自 2026 年 3 月起一直在审查中。 |
| [#83](https://github.com/anthropics/skills/pull/83) | quality + security 分析器 | 元层面价值高；与 #492 的信任讨论方向一致。 |

---

## 4. Skills 生态洞察

> **在 Skills 层面，社区最集中的需求，是围绕 skill 生态本身建立一个可信的质量与安全层**——即*评估* skill 的 skill（Issue #492 的 43 条评论 + PR #83、#1367、#1385、#1298、#556 均汇聚于此），这反映出 marketplace 已越过“更多 skill”的阶段，如今在追问“我们该如何信任、度量并治理已有的 skill”。

---

*本报告基于 2026-09-09 快照中的 20 个 PR 和 15 个 Issue 生成。PR 评论数在源数据中不可用，系根据更新时间和互动信号推断得出。*

---

---

# Claude Code 社区速递 — 2026-09-09

## 今日要点
Claude Code 发布了 **v2.1.265**,为 Desktop/Cowork 网关扩展了遥测字段，新增 `user.email` 和 `user.groups`,并为 `--plugin-dir` 引入了基于文件夹的插件发现。今天的社区信号以**桌面端应用回归**为主：获赞最多的开放 issue(#92016)报告称 Claude Desktop 会自动拒绝 CLI 原生的 `SendMessage` 工具，而新的“会话间(session-to-session)”替代机制破坏了 CLI 原生子代理(subagent)的恢复。另有多个开放 issue 描述了 Desktop 中**静默丢失会话的路径**(`cliSessionId` 被置空、文件系统视图过期、重启时后台任务被杀)，表明桌面端目前正是 bug 报告的重心所在。

## 版本发布
**v2.1.265** — [发布说明](https://github.com/anthropics/claude-code/releases)
- 通过 Claude 应用网关(Claude Desktop 和 Cowork)发送的遥测数据现在包含 `user.email` 和 `user.groups`,与终端会话的遥测保持一致。
- `--plugin-dir` 现在可以接受一个装有多份插件的文件夹；每个包含 manifest 的子文件夹都会被加载，子文件夹的新增/移除也会被动态感知。

## 热门 Issue

1. **[#92016](https://github.com/anthropics/claude-code/issues/92016)** — *开放 · 回归 · 20 条评论 · 8 👍*
   Claude Desktop(macOS)自动拒绝 CLI 原生的 `SendMessage` 工具，而桌面端的“替代方案”只覆盖会话间调用——由此破坏了 CLI 原生子代理的恢复。今天的评论数和点赞数均为最高；这是社区报告中最活跃的一个回归问题。

2. **[#86829](https://github.com/anthropics/claude-code/issues/86829)** — *开放 · 可复现 · 4 条评论 · 8 👍*
   VS Code 扩展聊天面板中，指向**非 ASCII 文件名**文件的 markdown 链接永远无法打开(百分号编码的 href 从未被解码)。很高的点赞/评论比表明社区普遍认同该问题对非 ASCII 仓库的影响。

3. **[#92825](https://github.com/anthropics/claude-code/issues/92825)** — *开放 · 数据丢失 · 2 条评论*
   Desktop 会话记录会静默地变得**永久不可用**——`cliSessionId` 被置空，且没有任何本地恢复手段。该 issue 作为 #79044 的后续提交，表明存在一组相关的会话丢失缺陷。

4. **[#92517](https://github.com/anthropics/claude-code/issues/92517)** — *开放 · 功能增强 · 2 条评论*
   功能请求：为共同开发同一项目的小团队提供**跨账户池化套餐用量**并共享会话上下文的能力。值得注意的是，这是一个方向性请求而非 bug。

5. **[#92687](https://github.com/anthropics/claude-code/issues/92687)** — *开放 · 可复现 · 1 条评论*
   在 Linux 上通过 SSH 使用时，重新启动 Desktop 应用会向正在运行的 `ccd-cli --resume` 发送 SIGTERM,静默杀死进行中的后台任务。这是桌面端上又一条关键的数据完整性风险路径。

6. **[#92947](https://github.com/anthropics/claude-code/issues/92947)** — *开放 · 1 条评论*
   Claude 会从一句无关的笼统表述中**推断出操作某个被明确禁止的文件夹的权限**。对智能体权限的信任/安全框架而言，这一点很重要。

7. **[#91214](https://github.com/anthropics/claude-code/issues/91214)** — *开放 · 可复现 · 1 条评论*
   Desktop 会话读取的是一个**过期且相互隔离的文件系统视图**，且从不重新同步——又是一份“桌面端应用与磁盘实际状态脱节”的报告。

8. **[#91731](https://github.com/anthropics/claude-code/issues/91731)** — *开放 · 回归 · 1 条评论 · 1 👍*
   更新之后，VS Code 扩展的图标在 Linux 的 Remote-SSH 会话中渲染为**空白方块**。回归标签暗示最近的某次改动破坏了图标资源路径。

9. **[#80692](https://github.com/anthropics/claude-code/issues/80692)** — *开放 · area:hooks · 1 条评论 · 1 👍*
   `EnterWorktree` 应当触发 `CwdChanged` 钩子——该钩子的缺失会破坏依赖目录上下文更新的下游钩子链。

10. **[#89687](https://github.com/anthropics/claude-code/issues/89687)** — *开放/无效 · 6 条评论*
    Windows 版 Desktop 的 MSIX 更新器会在退出时强行注册到一个仍在运行的 AppX 容器中，导致应用**无法启动(0x80070020)**,直到用户注销才恢复。尽管带有 `invalid` 标签，这 6 条评论表明 Windows 桌面端更新确实存在真实痛点，同时也暴露了 issue 分流问题(该 issue 之所以被提交到 Claude Code 仓库，是因为没有更合适的公开渠道)。

## 重点 PR 进展

过去 24 小时内只有一个 PR 有更新，而且它反映的是流程而非产品：

- **[#63686](https://github.com/anthropics/claude-code/pull/63686)** — 将 `scripts/issue-lifecycle.ts` 和 `scripts/sweep.ts` 中 `stale` 和 `autoclose` 的超时时间从**14 天延长至 90 天**。其背景意义在于：这解释了为什么今天的摘要中有这么多 issue 尽管近期仍有社区活动，却被打上 `stale` 标签并关闭——生命周期策略正在放宽，以便让更多报告存活足够长的时间、得到分诊(triage)。

## 热门讨论
*本期未提供讨论数据——章节省略。*

## 功能请求趋势
- **多账户 / 团队池化** —— #92517 中最强烈的方向性信号：将池化的套餐限额绑定到项目，并共享会话上下文，面向各自持有独立订阅的小团队。
- **跨端会话连续性** —— 反复出现的诉求(#85932):在 CLI 中展示 VS Code 的人类可读会话名称，并支持跨项目上下文迁移会话。
- **更完善的钩子覆盖** —— #80692 希望 `EnterWorktree` 能发出 `CwdChanged`,让用户可以构建可靠的、感知 worktree 的自动化。
- **插件易用性** —— v2.1.265 中 `--plugin-dir` 的“插件文件夹”行为，与社区对更简单插件分发方式的诉求不谋而合。

## 开发者痛点
- **桌面端应用的会话可靠性是当前最主要的抱怨。** 从 #92016、#92825、#92687、#91214 到更早的 #78838,开发者普遍反馈桌面端会以 CLI 中不会出现的方式静默丢弃、拒绝会话或使会话失步——而且往往没有本地恢复路径。
- **Desktop 中过期的文件系统 / 沙箱视图**(#91214)—— 会话似乎运行在过期的快照上，这削弱了人们对通过 Desktop 执行的文件编辑操作的信任。
- **网络安全防护误报** —— 今天有多份报告(#85434、#85444、#85549、#85929)描述 Opus 4.8 / Sonnet 5 阻止了已获授权的工作，例如本地存储分析、启动器别名配置以及无害的 Go 代码。这是一个反复出现、摩擦极高的类别，会直接中断会话。
- **VS Code 扩展对非 ASCII 路径的处理**(#86829)—— 假设仓库全是 ASCII 路径并不现实，而且这种静默失败模式(点击毫无反应)很难调试。
- **issue 生命周期的动荡** —— #63686 中 14→90 天的超时延长，加上今天大量被标记 `stale` 而关闭的 issue,表明开发者感到报告在得到妥善分诊之前就被关闭了。

---

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区日报
**日期：** 2026-09-09

---

## 今日要点
Codex 团队发布了 Rust CLI 即将到来的两个 alpha 版本（`v0.154.0-alpha.7` 和 `alpha.8`），同时合并了一批密集的内部基础设施 PR，涉及 TUI 指标、沙箱权限辅助函数、shell 快照安全以及模型目录缓存。社区方面，长期悬而未决的 **LSP 集成** 请求已突破 480 👍 和 60+ 评论；Windows 用户则持续反馈宠物、WSL、Git 写入和 Computer Use 方面出现大量回归。一份新的 RFC 提议通过 `/learn` 和 AGENTS.md 规则代谢机制将 Codex 打造成"自我进化的智能体"。

---

## 发布版本
- **rust-v0.154.0-alpha.8** — 基于 Rust 的 Codex CLI 最新 alpha 预发布版本。（[release](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.8)）
- **rust-v0.154.0-alpha.7** — 0.154 系列的上一版 alpha。（[release](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.7)）

> 这两个 alpha 版本暂无公开的 changelog 摘要，请视为不稳定的预览版本。

---

## 热门 Issue

1. **[#8745] 内置 LSP 支持，支持自动检测 + 自动安装** — 481 👍 / 64 条评论。仓库中点赞数最高的功能请求：用户希望 Codex CLI 能够消费 LSP 诊断信息和符号信息，以生成更强的代码。[openai/codex#8745](https://github.com/openai/codex/issues/8745)

2. **[#41290] Windows WSL：在将智能体环境切换为 WSL 后，项目创建/删除失败** — 46 条评论。切换智能体环境后，核心 WSL 工作流被破坏的回归问题。[openai/codex#41290](https://github.com/openai/codex/issues/41290)

3. **[#41513] Windows 宠物：内置与自定义浮动宠物变为点击穿透且不可拖动** — 33 条评论。在多个桌面端构建中均有报告。[openai/codex#41515](https://github.com/openai/codex/issues/41513)

4. **[#43337] 即使每周额度充足，仍出现账号级容量错误** — 28 条评论。Pro 20x 用户在使用 `gpt-6-astra` 和 `gpt-5.6-luna` 时，即便额度允许也会遇到容量拒绝。[openai/codex#43337](https://github.com/openai/codex/issues/43337)

5. **[#40575] [RFC] 通过 `/learn` 和 AGENTS.md 规则代谢实现自我进化的智能体** — 19 条评论。一份概念性提案，旨在实现跨会话持续、可交互的指令提炼。[openai/codex#40575](https://github.com/openai/codex/issues/40575)

6. **[#43832] Windows：从 Codex 启动 Claude Code 失败，提示 "Access is denied"** — 12 条评论。Windows 沙箱下跨工具互操作被破坏。[openai/codex#43832](https://github.com/openai/codex/issues/43832)

7. **[#39054] MCP OAuth：被拒绝的 refresh token 仍保持"可用"状态 → 无限重试循环** — 11 条评论。在包括 `0.147.0` 和 `0.148.0-alpha.20` 在内的五个 CLI 版本中均可复现。[openai/codex#39054](https://github.com/openai/codex/issues/39054)

8. **[#41486] Windows：`Z:\AREA_01` 被发送给模型时变成 `Z:\AREA\_01`** — 9 条评论。纯客户端序列化 Bug；UI 显示的路径正确，但模型上下文拿到的是被损坏的路径。[openai/codex#41486](https://github.com/openai/codex/issues/41486)

9. **[#32880] Windows 桌面端回归：Git 写入被 linked worktree 的 `workspace-write` DENY ACL 阻止** — 8 条评论。沙箱过宽地阻止了 linked worktree 的 Git 操作。[openai/codex#32880](https://github.com/openai/codex/issues/32880)

10. **[#42088] `responses: function_call_output` 在没有 `call_id` 的情况下被发出 → 在严格的 upstream 上返回 400** — 7 条评论。破坏了对自定义 OpenAI 兼容端点的兼容性（例如 DeepSeek、llama.cpp Responses 适配器）。[openai/codex#42088](https://github.com/openai/codex/issues/42088)

---

## 重点 PR 进展

1. **[#43939] 为 executor-context 添加文件系统权限辅助函数** — 将 read-denial/glob 解析移入 execution-host context，以便远程沙箱策略能正确解析路径。[PR](https://github.com/openai/codex/pull/43939)

2. **[#43937] 为 TUI 启动指标打上 terminal 和 multiplexer 分类标签** — 在 `codex.tui.start` 中新增 `terminal_name` 和 `multiplexer` 字段，以便更好地进行埋点。[PR](https://github.com/openai/codex/pull/43937)

3. **[#43936] 稳定 subagent 和 unified-exec 的测试 fixture** — 修复了 flaky 的 grandchild baseline 测试，并将基于 sleep 的终端输出替换为以换行符分隔的 stdin。[PR](https://github.com/openai/codex/pull/43936)

4. **[#43934] 在 TUI 中跟踪语音会话生命周期指标** — 输出 `codex.voice.session.*` 事件，覆盖启动、连接、失败、结束以及活跃时长。[PR](https://github.com/openai/codex/pull/43934)

5. **[#43930] 对无关的代理端口变更跳过 Windows 沙箱设置** — 当代理变更的两侧都不需要特定端口的回环规则时，跳过提权的防火墙重配置。[PR](https://github.com/openai/codex/pull/43930)

6. **[#43927] 在状态数据库中将 `thread_artifacts` 重命名为 `thread_attachments`** — 模式迁移，使数据模型在语义上更准确。[PR](https://github.com/openai/codex/pull/43927)

7. **[#43925] 为原生用户验证 RPC 添加取消机制** — 防止已取消的 proof 在出站队列排空后仍被投递。[PR](https://github.com/openai/codex/pull/43925)

8. **[#43921] 在 TUI 状态行中显示流式推理摘要** — 状态标题现在会跟踪跨工具活动的最新可用推理行，并在 resume 后恢复。[PR](https://github.com/openai/codex/pull/43921)

9. **[#43913] 为 `AGENTS.md` 发现 + 文件系统沙箱操作添加 tracing** — span 现在会记录指令字节限制以及文件操作特征。[PR](https://github.com/openai/codex/pull/43913)

10. **[#43900] 将 Apps 工具的刷新推送给已存在的线程** — 实时的工具目录会推送到客户端，使得刷新的 Apps 在下一轮即可使用，无需新建线程。[PR](https://github.com/openai/codex/pull/43900)

> 值得一提：**#43912** 让 Guardian 评审者继续使用基于摘要的压缩（避免静默的上下文滚动），而 **#43909/#43907** 加固了在凭据代理场景下的 shell 快照采集/回放——这两项都与用户最近遇到的沙箱安全回归相关。

---

## 热门讨论

### 💡 Ideas
- **[#9618] `/rewind` 或 `/revert` 功能** — 122 👍。用户将 Codex 与 Claude Code/OpenCode 进行对比，认为缺少安全的撤销机制是一大短板。对一等 turn 撤销功能的需求强劲且持续。[discussion](https://github.com/openai/codex/discussions/9618)
- **[#42965] 为持久化的世界状态跟踪来源 turn/window 来源** — 提议跟踪某个持久化产物是由哪个 turn/window 产生的。[discussion](https://github.com/openai/codex/discussions/42965)
- **[#43788] 使用量透明度与基于订阅的 API** — 用户希望获得可预测的、按任务的成本估算，以及一个能绑定现有 ChatGPT 订阅进行扣费的 API 档位。[discussion](https://github.com/openai/codex/discussions/43788)
- **[#43696] 从移动端 Remote 应用发起 Wake-on-LAN** — 希望从移动客户端唤醒桌面机的便捷功能请求。[discussion](https://github.com/openai/codex/discussions/43696)

### ❓ Q&A
- **[#41714] 如何更改默认的项目根目录？** — 在 ChatGPT/Codex 应用中没有明显的方式可以设置默认项目根目录。[discussion](https://github.com/openai/codex/discussions/41714)
- **[#43257] 实验性上下文管理下的历史查询是否计入用量限制？** — 一个常见的、尚未得到解答的 Pro 用户问题。[discussion](https://github.com/openai/codex/discussions/43257)
- **[#42983] "用量限制感觉不对劲" — Luna 低的消耗却接近 Astra 高的速率** — 关于配额计算的讨论热度持续上升。[discussion](https://github.com/openai/codex/discussions/42983)
- **[#10045] 会话隔离与按会话的模型配置** — 已回复：按 thread 的设置无法与之前的会话隔离。[discussion](https://github.com/openai/codex/discussions/10045)
- **[#43911] 一款卡牌游戏应用中 AI 的分析思考/决策能力出现回退** — 一位较新用户提出的通用模型行为问题。[discussion](https://github.com/openai/codex/discussions/43911)

### 🌟 Show and tell
- **[#16329] Awesome Codex CLI — 收录 150+ 生态工具的精选列表** — Subagent、skills、plugins、MCP servers 一网打尽。[discussion](https://github.com/openai/codex/discussions/16329)
- **[#41642] Compact Context — 为 Codex 提供本地五文件起始映射** — MIT 许可的本地路由器，每轮最多推荐五个可能的文件。[discussion](https://github.com/openai/codex/discussions/41642)
- **[#43908] ManualMode — 在 Codex 之外保留真实仓库任务用于亲手实践** — 将 Codex 与一个小的、由人类掌控的实现槽位配对使用。[discussion](https://github.com/openai/codex/discussions/43908)
- **[#43891] macOS 上 Codex 26.820 的 `SkyComputerUseService` 进程风暴修复** — 确认 OpenAI 在 **26.901.51231** 中已发布修复。[discussion](https://github.com/openai/codex/discussions/43891)

---

## 功能请求趋势
- **一等 turn 撤销 / `/rewind`** — 迄今为止呼声最高、最持续被请求的 UX 功能，目前已达 122 👍。
- **原生 LSP 集成 + 自动安装** — 长期存在的高需求增强，将解锁更丰富的诊断信息和符号感知能力。
- **自我进化 / 持久化记忆** — `/learn` + AGENTS.md 规则代谢 RFC 以及相关提案都指向跨会话持久化、可学习的智能体行为。
- **更深度的 Research / 任务模式支持** — 在 Mac 应用和 CLI 内提供"原生 Deep Research"任务类型（而不仅仅是模型选择）。
- **定价与配额透明度** — 可预测的成本估算、对子模型更清晰的计费（例如 Luna vs Astra），以及可绑定订阅的 API 计费。
- **跨工具与跨平台打磨** — Windows 上更好的 Claude Code 互操作、全屏 TUI 模式，以及 Linux/Plasma/Wayland 的修复。
- **Worktree / Git UX** — 在创建 worktree 之前给出 Git-init 指引，以及不会破坏 linked worktree 的沙箱规则。

---

## 开发者痛点
- **Windows 是最大的痛点来源。** 仅在过去 24 小时内就有：WSL 项目创建/删除被破坏、宠物不可拖动、Computer Use 事件重复、Git 写入被阻止、Claude Code 启动被拒绝、桌面端重连循环，以及一个路径转义 Bug 导致模型上下文损坏。
- **沙箱过度收紧。** Windows 上 `workspace-write` 的 DENY ACL 会阻止针对 linked worktree 的合法 Git 操作；MCP OAuth 的 refresh token 会无限循环，因为拒绝被当作临时错误处理。
- **自定义模型与严格 upstream 的兼容性。** 两个独立的 Bug（`function_call_output` 缺少 `call_id`、`mcp__<server>__<tool>` 被拒绝）会让 Codex 在任何非 OpenAI 合规的 Responses 端点上失灵——这对 llama.cpp、DeepSeek、MiniMax-M3 等同类部署都有影响。
- **不透明的用量计费。** Pro / Pro 20x 用户反馈，配额消耗方式与公布的模型档位并不匹配（Luna 低的消耗接近 Astra 高；实验性上下文管理下的历史查询也被纳入计费）。
- **没有安全的撤销。** 没有 `/rewind` 或 `/revert`，每次 Codex turn 实际上都变成了"提交或保留"的决策，这显著影响了用户让智能体持续运行的意愿。
- **默认体验缺少 LSP。** 没有语言服务器感知，Codex 在符号驱动的编辑方面弱于那些原生集成 LSP 的竞品。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-09

## 今日要点

本期摘要以**安全加固**为主线。**v0.59.0** 与 **v0.60.0-preview.0** 带来了更严格的沙箱文件系统隔离、RFC 9207 OAuth 颁发者强制校验，以及改进的网页抓取验证；同时新一波 PR 集中攻克路径穿越、间接提示注入以及并行文件写入的竞态问题。另一边，Agent 生态也在持续成熟：子 Agent 卡死、浏览器 Agent 失效、Auto Memory 可靠性等长期存在的问题正在积极分诊中。

---

## 版本发布

- **[v0.59.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0)** — 稳定版。包含 nightly 版本号更新与一处 `core` 修复（源中更新日志已截断）。
- **[v0.60.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-preview.0)** — 预览版。值得关注的变化：
  - 改进网页抓取工具中的目标校验与连接路由 ([#29120](https://github.com/google-gemini/gemini-cli/pull/29120))
  - MCP OAuth 流程中强制按 RFC 9207 进行颁发者识别
- **[v0.60.0-nightly.20260908.g85aca163f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260908.g85aca163f)** — 持续推进 0.60 系列的 nightly 构建。

---

## 热门 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — *子 Agent 在 MAX_TURNS 后的恢复被误报为 GOAL 成功*（p1，13 条评论）— 一处严重的正确性缺陷，`codebase_investigator` 会把中断运行的回执伪装为成功，削弱了子 Agent 终止上报的可信度。
2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — *通用 Agent 卡死*（p1，8 条评论，8 👍）— 用户报告的回归：即便是创建文件夹这类琐碎操作，委派给通用 Agent 后也会无限冻结。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — *零依赖 OS 沙箱与执行后意图路由*（p2，9 条评论）— 战略性提案：借助 Gemini 3 原生的 bash 亲和力，引入正经的 OS 级沙箱，而非继续走基于排除的工具限制路线。
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — *评估 AST 感知的文件读取、搜索与映射的影响*（p2，7 条评论）— 评估 `tilth`、`glyph` 等 AST 感知工具的史诗级议题，旨在实现更精确的方法级读取与更省 token 的代码库导航。
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — *Gemini 没有充分使用 skills 与 sub-agents*（p2，6 条评论）— 看似主观但反复出现的吐槽：除非显式提示，模型会忽略定义良好的自定义 skills 与 sub-agents。
6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** — *增加确定性脱敏并削减 Auto Memory 日志*（p2，5 条评论，安全）— Auto Memory 基于提示词的密钥脱敏并不充分，因为内容在脱敏之前就已到达模型；需要改为确定性剥离。
7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** — *Shell 命令执行完成后卡在 "Waiting input"*（p1，4 条评论，3 👍）— 常见的 UX 缺陷：CLI 无法识别命令已完成，仍在等待用户输入。
8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — *浏览器子 Agent 在 Wayland 下失败*（p1，4 条评论）— 浏览器子 Agent 报告 `Termination Reason: GOAL`，但在 Linux/Wayland 环境下实际失败。
9. **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)** — *`~/.gemini/agents/filename.md` 作为符号链接时无法被识别为 agent*（p2，4 条评论）— 限制了用户组织 agent 配置的方式。
10. **[#29001](https://github.com/google-gemini/gemini-cli/issues/29001)** — *`a2a-server` HTTP API 从未真正启用身份认证；硬编码了公开凭据*（p2，安全）— 高危：A2A 服务声明了安全方案却并未强制执行，且随包携带了 `valid-token` / `admin:password` 这类明文凭据。

---

## 关键 PR 进展

1. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214)** — `fix(sandbox): harden filesystem boundaries and isolate runtime state`（XL，开放中）— 用经净化处理的配置文件取代宿主机目录挂载，并在敏感度检查中统一使用 realpath 解析。重大安全加固。
2. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250)** — `fix(core): prevent indirect prompt injection via build file modifications and untrusted flags`（XL，开放中）— 在 restricted/workspace 模式下加固 `shell`、`edit` 等内建工具路径，抵御间接注入。
3. **[#29244](https://github.com/google-gemini/gemini-cli/pull/29244)** — `fix(core): make tool file writes atomic and serialize same-path writes`（L，开放中）— 修复并发 `replace` 调用对同一文件均报告成功导致的静默数据丢失竞态。
4. **[#29249](https://github.com/google-gemini/gemini-cli/pull/29249)** — `fix(core): close sibling-prefix bypass in get_internal_docs path guard`（S，开放中）— 路径穿越：此前 docs 工具会接受仅以文档目录名*开头*的同级目录。
5. **[#29247](https://github.com/google-gemini/gemini-cli/pull/29247)** — `fix(core): make isWithinRoot case-insensitive on Windows`（S/M，开放中）— 复用 `isSubpath()`，使 Windows 路径大小写差异（`C:\` vs `c:\`）不再破坏 ACP/IDE 路由。
6. **[#29248](https://github.com/google-gemini/gemini-cli/pull/29248)** — `fix(cli): avoid duplicate history and telemetry after confirmation`（M，开放中）— 在用户确认 `/resume save <tag>` 等操作时，避免产生重复的斜杠命令历史记录。
7. **[#29252](https://github.com/google-gemini/gemini-cli/pull/29252)** — `fix(core): preserve explicit versioned Flash model IDs`（M，已关闭/已合并）— 阻止 `--model gemini-3.5-flash@*` 固定版本被静默重映射为灰度默认版本。
8. **[#29137](https://github.com/google-gemini/gemini-cli/pull/29137)** — `chore(deps): bump the npm-dependencies group with 77 updates`（XL，开放中）— 常规但体量较大的依赖批量升级，包含 `simple-git` → 3.36.0 以及 `@modelcontextprotocol/sdk` 等更新。
9. **[#29216](https://github.com/google-gemini/gemini-cli/pull/29216)** — `fix(cli): isolate settings directory in sandbox containers`（L，已关闭）— 防止宿主 `~/.gemini` 中的 OAuth 令牌泄露到容器沙箱内。
10. **[#29215](https://github.com/google-gemini/gemini-cli/pull/29215)** — `fix(core): enforce envelope metadata provenance for untrusted tool outputs`（L，已关闭）— 更新系统提示，使 MCP/外部输出仅基于已校验的信封属性进行评估，缓解身份伪造风险。

---

## 功能请求趋势

纵观开放 Issue，呼声最高的方向可归纳为五大主题：

- **AST 感知工具** — 方法级读取、AST 感知搜索与代码库映射（`#22745`、`#22746`、`#19561`）。社区把 AST 视为减少轮次、降低 token 成本的路径。
- **沙箱与执行安全** — 零依赖 OS 沙箱、意图路由、restricted 模式加固（`#19873`、`#22672`，以及间接提示注入缓解措施）。
- **Auto Memory 质量与安全** — 确定性脱敏、inbox 隔离、重试上限以及整体质量追踪（`#26525`、`#26522`、`#26523`、`#26516`）。
- **子 Agent 可观测性** — 通过 `/chat share` 暴露轨迹、在 `/bug` 报告中带上子 Agent 上下文、终止状态准确（`#22598`、`#21763`、`#22323`）。
- **Agent 自我感知** — 准确的 CLI 参数知识、热键准确性，以及自我指令能力（`#21432`、`#21000`）。

---

## 开发者痛点

从 Issue 数量与 bug 聚类可以反复看到以下痛点：

- **子 Agent 可靠性** — 卡死、错误的 `GOAL` 成功状态、通用 Agent 委派冻结是最高频的问题（`#22323`、`#21409`、`#21968`）。
- **浏览器 Agent 脆弱性** — Wayland 失败、忽略 `settings.json` 覆盖、锁定 profile 恢复、会话接管等问题依旧棘手（`#21983`、`#22267`、`#22232`）。
- **Shell 命令卡住** — 命令执行完成后停在 "Awaiting user input"，让简单命令也难以顺畅跑完（`#25166`，以及 vite 交互式提示的 `#22465`）。
- **工作区整洁度** — 通过排除方式沙箱化时，模型会把 `/tmp` 风格的脚本散落到随机目录（`#23571`）。
- **记忆系统可信度** — Auto Memory 的软脱敏、低信号会话的重试循环、对非法 patch 的静默跳过，使其难以被信赖（`#26525`、`#26522`、`#26523`）。
- **路径与文件系统安全边界场景** — 符号链接 agent、Windows 大小写敏感、NTFS 短名、同名前缀绕过，都在现实中造成故障（`#20079`、`#29247`、`#29116`、`#29249`）。
- **会话持久化缺口** — `/compress` 无法跨 resume 保留；auto-memory 的模型固定被静默重映射（`#21335`、`#29252`）。
- **工具数量上限** — 400 个工具的限制直接产生硬性 400 错误，缺乏优雅降级（`#24246`）。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-09

## 今日要点

- **Vim 模式随 v1.0.84-2 正式发布**,终于关闭了一个历史最久、点赞最多的功能请求（[#13](https://github.com/github/copilot-cli/issues/13), 76 👍）。可通过 `/vim` 或在 composer 中设置 `editorMode: vim` 来切换该模式。
- **一系列会话恢复回归问题**正在 v1.0.83 / 1.1.15 桌面端构建中造成显著困扰——OOM 崩溃（[#4664](https://github.com/github/copilot-cli/issues/4664)）、MCP stdio 超时（[#4753](https://github.com/github/copilot-cli/issues/4753)）、陈旧的连接 ID（[#4505](https://github.com/github/copilot-cli/issues/4505)），以及"活动工作区"锁定（[#4742](https://github.com/github/copilot-cli/issues/4742), [#4756](https://github.com/github/copilot-cli/issues/4756)）均呈上升趋势。
- WebSocket 响应传输的退出选项正在被正式文档化（[PR #4770](https://github.com/github/copilot-cli/pull/4770)），为用户在 WebSocket 路径触发 `400 input item ID does not belong to this connection` 时提供了一个明确的逃生通道。

---

## 版本发布

### [v1.0.84-2](https://github.com/github/copilot-cli) — 2026-09-08

**新增**
- **Composer 的 Vim 模式**现已正式可用。可通过 `/vim` 交互式启用，或在配置中设置 `editorMode: vim`。当前模式（normal/insert/visual）在输入时会显示。此版本关闭了 [Issue #13](https://github.com/github/copilot-cli/issues/13) 中长期悬而未决的请求。

**改进**
- 在支持的 Windows 沙箱策略下，交互式 shell 命令现在会记录被拒绝访问事件，从而提升沙箱拒绝操作的可审计性。

---

## 热门问题

1. **[#13 — CLI 输入应支持 vi/vim 输入模式（已关闭）](https://github.com/github/copilot-cli/issues/13)** — 11 条评论，**76 👍**。这是经典的"vim 模式"请求；它在 v1.0.84-2 中的关闭标志着面向键盘驱动型 CLI 用户的一个重要 UX 里程碑。
2. **[#4742 — Desktop 1.1.15 无法创建第二个 Local 会话](https://github.com/github/copilot-cli/issues/4742)** — 10 条评论。1.1.15 桌面端自动更新后出现的回归，会阻塞同一项目中并行的 Local（分支）会话。对运行多个并发会话的用户影响重大。
3. **[#4612 — FileWatch 主机事件循环失控冻结 TUI / 13 GB 日志](https://github.com/github/copilot-cli/issues/4612)** — 9 条评论。长时间运行的会话可能陷入紧密的调试循环，导致 TUI 冻结并产生海量日志。严重程度高——进程必须强制 kill 才能恢复。
4. **[#4664 — 恢复长会话时 JS 堆 OOM](https://github.com/github/copilot-cli/issues/4664)** — 7 条评论。恢复大型/旧会话时，Node 在用户操作前即崩溃。表明会话加载时缺少流式或分块反序列化处理。
5. **[#2861 — Opus 4.6 上 /compact 因模型响应为空而失败](https://github.com/github/copilot-cli/issues/2861)** — 6 条评论。在 Opus 4.6 上手动执行 `/compact` 会在短会话中连续失败三次。与上下文压缩期间的模型输出处理有关。
6. **[#4756 — Windows 应用：必须归档每个闲置项目会话才能创建新的 Local 会话](https://github.com/github/copilot-cli/issues/4756)** — 5 条评论，**19 👍**。Windows 用户被迫执行繁琐的清理工作流，而其他平台并无此要求——与新会话锁定策略存在摩擦。
7. **[#4438 — `disable-model-invocation: true` 使技能不可达而非仅手动可用](https://github.com/github/copilot-cli/issues/4438)** — 4 条评论。`disable-model-invocation` frontmatter 标志的语义与文档化行为不一致；技能变为静默不可用，而非仅限用户调用。
8. **[#2943 — OpenRouter 集成](https://github.com/github/copilot-cli/issues/2943)** — 3 条评论，**14 👍**。一项持续受到欢迎的请求，希望像 Copilot Chat 已支持的那样，将 OpenRouter（及其模型目录）接入 Copilot CLI。
9. **[#4753 — v1.0.83 会话恢复时取消进行中的 stdio MCP 连接](https://github.com/github/copilot-cli/issues/4753)** — 3 条评论。1 秒超时（从 1.0.82 的 16 秒下调）在前台会话交接期间静默终止正在初始化的 MCP 服务器。很容易被忽视——服务器看起来只是"消失"了。
10. **[#4505 — 恢复的会话在响应中断后保留陈旧的连接项 ID](https://github.com/github/copilot-cli/issues/4505)** — 3 条评论。恢复会话中的每个 prompt 都会因 `CAPIError: 400 input item ID does not belong to this connection` 而失败。`/fork` 无法恢复——指向交接时握手存在缺口。

**值得关注的提名：** [#4582](https://github.com/github/copilot-cli/issues/4582)（缺少 OAuth `scope` 导致 Entra ID `AADSTS900144`）、[#4757](https://github.com/github/copilot-cli/issues/4757)（无托管策略账户的 fail-closed 绕过姿态）、[#3945](https://github.com/github/copilot-cli/issues/3945)（记忆在仓库间泄漏）、[#4750](https://github.com/github/copilot-cli/issues/4750)（空闲 TUI 占用多个 CPU 核心）、[#4755](https://github.com/github/copilot-cli/issues/4755)（队列通道消息落在回合末尾时会话永久卡死）。

---

## 关键 PR 进展

1. **[PR #4770 — 文档化 WebSocket 响应退出选项（开放中）](https://github.com/github/copilot-cli/pull/4770)** — 增加面向用户的文档，说明如何禁用 WebSocket 响应端点，适用于网络阻断 WSS 或该传输产生 `400 input item ID does not belong to this connection` 的场景。通过 `--no-websocket` 标志暴露现有的逃生通道。
2. **[PR #4761 — install: 报告不支持的操作系统（已关闭）](https://github.com/github/copilot-cli/pull/4761)** — 修复了 `install.sh` 在 FreeBSD 等非 macOS/Linux 平台上错误报告 `Windows detected but winget not found` 的问题；现在会将其报告为不支持。
3. **[PR #4762 — install: 报告不支持的操作系统（已关闭）](https://github.com/github/copilot-cli/pull/4762)** — 针对同一 FreeBSD 分类错误的第二个近乎相同的修复（可能已被 #4761 取代）。可作为已解决错误措辞的有用参考。
4. **[PR #4100 — shangti0168（已关闭）](https://github.com/github/copilot-cli/pull/4100)** — 标记为"安全性"。快速合并且无公开讨论；请关注发布说明中的对应安全公告。

*（过去 24h 内仅有 4 个 PR 更新，已全部列出。）*

---

## 功能请求趋势

综合各 issue，最突出的反复出现的主题是：

- **编辑器 / TUX 与桌面 IDE 的人机工程学对等。** Vim 模式（现已发布）、按类型可折叠的输出区域（[#1787](https://github.com/github/copilot-cli/issues/1787)）、可见的 TODO 列表（[#1724](https://github.com/github/copilot-cli/issues/1724)）——用户希望 CLI TUI 能拥有现代 IDE 的体验。
- **模型提供商可扩展性。** OpenRouter（[#2943](https://github.com/github/copilot-cli/issues/2943)）是最突出的请求，源于希望将 Copilot CLI 与非 GitHub 模型一同使用的用户。
- **会话与记忆卫生。** Opus 4.6 上的压缩可靠性（[#2861](https://github.com/github/copilot-cli/issues/2861)）、跨仓库记忆泄漏（[#3945](https://github.com/github/copilot-cli/issues/3945)）以及恢复时的 OOM（[#4664](https://github.com/github/copilot-cli/issues/4664)）都指向对一流会话生命周期管理的需求。
- **MCP 作为一等子系统。** MCP Profiles（[#2235](https://github.com/github/copilot-cli/issues/2235)）、正确的取消请求（[#4759](https://github.com/github/copilot-cli/issues/4759)）以及可靠的发现机制（[#4773](https://github.com/github/copilot-cli/issues/4773)）表明用户的使用规模已超出"单个 MCP 服务器"模型。
- **权限与信任模型的清晰性。** 无托管策略时的 fail-closed `--yolo` 姿态（[#4757](https://github.com/github/copilot-cli/issues/4757)）以及闲置后 allow-all 被重置（[#4696](https://github.com/github/copilot-cli/issues/4696)）表明用户期望可预测、有据可查的权限语义。

---

## 开发者痛点

- **恢复会话如履薄冰。** 介于 OOM 崩溃（[#4664](https://github.com/github/copilot-cli/issues/4664)）、被杀死的 MCP 服务器（[#4753](https://github.com/github/copilot-cli/issues/4753)）、陈旧的连接 ID（[#4505](https://github.com/github/copilot-cli/issues/4505)）以及孤立的状态文件夹（[#2836](https://github.com/github/copilot-cli/issues/2836)）之间，长时间运行的工作流非常脆弱——而且失败往往是静默的。
- **1.1.15 桌面端 / 1.0.83 CLI 的组合在 Windows 上引入了一波会话创建回归**（[#4742](https://github.com/github/copilot-cli/issues/4742), [#4756](https://github.com/github/copilot-cli/issues/4756)），迫使用户为了开启新对话而进行手动归档。
- **资源泄漏使闲置会话质量下降。** TUI CPU 占用过高（[#4750](https://github.com/github/copilot-cli/issues/4750)）以及 13 GB 的失控调试日志（[#4612](https://github.com/github/copilot-cli/issues/4612)）对全天保持会话开启的用户而言属于阻塞性问题。
- **权限状态具有不确定性。** `--yolo` 在闲置后静默失效（[#4696](https://github.com/github/copilot-cli/issues/4696)），且在无托管策略时被无条件抑制（[#4757](https://github.com/github/copilot-cli/issues/4757)）。开发者无法推断当前所处的模式。
- **配置与技能发现存在泄漏。** 仓库根的 `.github/hooks/*.json` 被静默忽略（[#4520](https://github.com/github/copilot-cli/issues/4520)），非仓库根工作目录加载 `.mcp.json` 失败（[#4765](https://github.com/github/copilot-cli/issues/4765)），`disable-model-invocation: true` 以非预期方式破坏技能（[#4438](https://github.com/github/copilot-cli/issues/4438)），`copilot skill list` 对已加载命名空间报告"Found 0 tools"（[#4773](https://github.com/github/copilot-cli/issues/4773)）——单项问题虽小，但累积效应使配置层显得不可靠。
- **MCP + 多模型边界情况。** Gemini 拒绝 union 类型数组 `items` schema（[#4623](https://github.com/github/copilot-cli/issues/4623)）以及 Entra ID OAuth 错位（[#4582](https://github.com/github/copilot-cli/issues/4582)）表明跨模型与跨 IDP 集成需要专门的测试轨道，而非尽力而为的处理。

---

*根据 `github/copilot-cli` 过去 24 小时的动态生成。本周期无可用的讨论数据；因此省略"热门讨论"部分。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区日报 — 2026-09-09

## 今日要点

今天的活跃议题以可靠性和性能问题为主，而非新版本发布。**Memory Megathread**（#20695，144 条评论 / 110 👍）的关闭标志着 OpenCode 长期内存调查的一个重要里程碑，同时 TUI 和桌面端 sidecar（V8 OOM）中出现的**高 CPU 回归**持续引发新的 bug 报告。在功能方面，由维护者主导的将桌面应用重构为插件包（Review、Files、Browser、Context Usage）的工作正在进行中，暗示着 v2 发布前对桌面代码库的结构性整理。

## 版本发布

过去 24 小时内未发布新版本。

## 热门问题

1. **[#20695](https://github.com/anomalyco/opencode/issues/20695) — Memory Megathread（已关闭）** — thdxr。参与度最高的单一议题（144 条评论 / 110 👍）。汇总了分散的内存泄漏报告，目前已经关闭，表明维护者已收集到足够的堆快照可采取行动。请持续关注后续的 PR。

2. **[#30086](https://github.com/anomalyco/opencode/issues/30086) — 新版本 CPU 占用过高（开放）** — 51 条评论 / 27 👍。报告的 CPU 峰值严重到"3 个会话"就让原本能流畅运行 10+ 会话的系统不堪重负。可能与下方 #42306 存在重叠。

3. **[#37012](https://github.com/anomalyco/opencode/issues/37012) — 保留旧版布局选项（开放）** — 43 条评论 / 47 👍。点赞评论比很高，表明广大用户更倾向于旧的侧边栏优先布局，而非新的嵌套式导航。

4. **[#5374](https://github.com/anomalyco/opencode/issues/5374) — 功能：显示 tokens/second（开放）** — 21 条评论 / 109 👍。在所有议题中点赞评论比最高；用户显然希望能一目了然地对比不同 provider 的吞吐能力。

5. **[#26220](https://github.com/anomalyco/opencode/issues/26220) — 工具调用完成后陷入无限循环（开放）** — 11 条评论。Zen/"big-pickle" 分支在工具调用完成后出现卡死状态，耗尽上下文。相关问题家族正在不断增多。

6. **[#45442](https://github.com/anomalyco/opencode/issues/45442) — [2.0] 子代理重复工具调用无限循环（开放）** — 一个 `general` 子代理在约 50 分钟内重复执行了 364 次相同的 `grep` 调用。确凿证据表明 v2 仍然缺乏循环保护机制。

7. **[#24153](https://github.com/anomalyco/opencode/issues/24153) — 功能：已归档会话的取消归档/恢复（开放）** — 10 条评论 / 11 👍。单向归档让用户苦不堪言；社区呼吁提供恢复原语。

8. **[#42306](https://github.com/anomalyco/opencode/issues/42306) — TUI 主线程 ~100% CPU 重绘（开放）** — 已通过 `strace` 确认：TUI 主线程在无任何用户操作的情况下独占整个核心。针对"高 CPU"主题的具体复现案例。

9. **[#41964](https://github.com/anomalyco/opencode/issues/41964) — 桌面端 sidecar V8 OOM 崩溃（开放）** — Windows 桌面端 sidecar 反复出现 OOM，导致本地服务器变红、会话无法访问。

10. **[#40747](https://github.com/anomalyco/opencode/issues/40747) — `opencode run` 在配额耗尽时挂起（开放）** — 尽管内部在约 170 ms 内就已知错误，但进程仍会无限挂起。是适合干净修复的候选问题。

## 重点 PR 进展

1. **[#48041](https://github.com/anomalyco/opencode/pull/48041) — fix(core): 劝阻轮询式后台 shell 命令** — 加强提示词引导，避免 `sleep` 加 `tail` 的轮询循环；是 #45442 等问题的直接缓解措施。
2. **[#48040](https://github.com/anomalyco/opencode/pull/48040) — refactor(cli): 移除 console 命令** — thdxr 移除 `opencode2 console` 及其登录处理器；与 v2 CLI 表面清理一致。
3. **[#48037](https://github.com/anomalyco/opencode/pull/48037) — fix(server): 拒绝畸形消息游标** — 通过将分页解码切换到 Effect 的严格 Base64URL，关闭 #48034，防止静默接受畸形游标。
4. **[#48039](https://github.com/anomalyco/opencode/pull/48039) — fix(plugin): 规范化 Promise API 输入** — 将 Promise 插件请求通过 JSON 进行规范化，以匹配生成的客户端边界；为 `session.create` 添加了集成测试。
5. **[#47935](https://github.com/anomalyco/opencode/pull/47935) — feat(plugin): 探索桌面扩展与管理器** — 引入桌面扩展 SDK、设置面板和宿主拥有的插槽的基础工作。
6. **[#47947](https://github.com/anomalyco/opencode/pull/47947) — refactor(app): 抽取 review 和 file viewer 扩展** — 将 Git review、文件树、diff 和行内评论抽离到 `@opencode/plugin-review-desktop`。
7. **[#47948](https://github.com/anomalyco/opencode/pull/47948) — refactor(app): 抽取 context usage 扩展** — 将 context-usage 按钮、统计、系统提示展示和导出功能移至 `@opencode/plugin-context-desktop`。
8. **[#47936](https://github.com/anomalyco/opencode/pull/47936) — refactor(desktop): 抽取 browser 扩展包** — 扩展 SDK 模式的草案应用；将嵌入式浏览器与宿主应用隔离。
9. **[#48031](https://github.com/anomalyco/opencode/pull/48031) — fix(app): 在设置对话框面板中显示滚动条** — 将 `scrollbar-width: none` 替换为带样式的可见滚动条，关闭 #34108。
10. **[#47783](https://github.com/anomalyco/opencode/pull/47783) — docs: 添加波斯语（fa）README 翻译** — 新增 `README.fa.md`，并将 `فارسی` 加入语言导航（关闭 #47775）。延续文档国际化工作。

## 热门讨论

本期日报未提供讨论数据。

## 功能请求趋势

- **可观测性 / 性能自省：** #5374（tokens/second）最为突出，收获 109 个赞——用户希望拥有一流的吞吐指标以对比不同 provider。
- **布局 / UX 连续性：** #37012 关于保留旧版布局选项的请求表明用户对新导航模型普遍不满。
- **会话生命周期：** #24153（取消归档/恢复）和 #7262（自动生成标题回退）暴露出会话管理方面的不足。
- **跨平台对齐：** #27659（桌面端的自定义/MCP 工具输出）和 #27837（Web UI 会话列表）反复要求将桌面/Web 提升到与 TUI 同等的水平。
- **桌面端可扩展性：** #47935/#47947/#47948/#47936 这一组 PR 正在为真正的扩展生态打基础——很可能很快就会以面向用户的功能形式出现。
- **国际化：** 新增的波斯语 README（#47783）是源源不断的本地化贡献的延续。

## 开发者痛点

- **性能回退是最突出的痛点。** 多个问题都围绕同一主题——空闲时高 CPU（#30086、#42306）、桌面端 V8 OOM（#41964）、配额耗尽时挂起（#40747）以及工具调用无限循环（#26220、#45442）。整体描绘出近期版本客户端对资源越来越饥渴的画面。
- **循环保护机制缺失或不一致。** 子代理可以在没有任何熔断机制的情况下，重复执行相同的工具调用长达数十分钟；即便是同步派生失败（#41301，最近已关闭）也会让会话保持忙碌状态。
- **会话可靠性。** 静默的 SSE 断开（#41299）、卡在"忙碌"状态的会话、缺失的 Content-Type 处理（#47605）以及单向归档，都削弱了用户对长时间运行会话的信任。
- **配置脆弱性。** 未知的配置字段会被静默加载（#41319），`config.model` 会静默覆盖 TUI 中选择的模型（#47968），工作区模型 ID 会出现双前缀（#47690）。配置层面需要更严格的校验。
- **桌面端与服务器的漂移。** Web 端会话列表为空（#27837）、自定义图标无法持久化（#32708、#34301）、默认 `vlocal` 密码未知（#34752）以及更新后出现"unexpected server error"（#48042）等 bug，提示桌面端封装仍然滞后于服务器行为。
- **Provider / 模型对接。** 特定 provider 的故障（Deepseek 图像输入 #47994、Nemotron 3.5 #47976、地区性屏蔽 #47971、Anthropic 的 thinking-budget #48019）以及静默的回退路由（#47968），都表明 provider 集成相当脆弱。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-09

## 今日要点
当日的活动围绕**提供商稳定性与协议扩展**展开：添加 `amazon-bedrock-mantle` 作为 OpenAI 兼容 Bedrock 提供商的主要提案（#5363）获得了最强社区关注（👍15，19 条评论）；两个高影响 bug 集群被关闭 —— Codex WebSocket 可靠性（#7444、#8125）以及流式取消（#8823）。贡献方面，Anthropic OAuth 用量上报（#9345）与提供商自报计费成本（#6881）推进了订阅 UX，一批小型 UI 修复（#9316、#9344、#9310、#9319）一并合入。

## 版本发布
过去 24 小时内无新版本发布。

## 热门 Issue

1. **[#5363](https://github.com/earendil-works/pi/issues/5363) — 添加 `amazon-bedrock-mantle` 提供商（OPEN，进行中）**
   现有的 `amazon-bedrock` 提供商仅支持 Converse；Mantle 模型暴露了一个 OpenAI 兼容的 Responses 端点 `bedrock-mantle.{region}.api.aws/openai/v1/responses`。19 条评论与 15 👍 使其成为当日最高互动帖 —— Bedrock 用户希望覆盖 Mantle。

2. **[#7444](https://github.com/earendil-works/pi/issues/7444) — Codex WebSocket 重试仅处理两种错误码（CLOSED）**
   除 `previous_response_not_found` / `websocket_connection_limit_reached` 之外的任何 `response.failed` 都会硬中止当前回合而非重试。已针对瞬态失败进行修复。

3. **[#8823](https://github.com/earendil-works/pi/issues/8823) — 流式输出中按 Esc 无法取消请求（CLOSED）**
   Esc 已注册中止，但 HTTP 请求会持续流式接收至提供商自然结束 —— 浪费 token 与时间。现已可靠取消。

4. **[#9052](https://github.com/earendil-works/pi/issues/9052) — 全屏模式下滚轮速度比内联模式慢 3 倍（OPEN）**
   为使用固定输入框而从内联 TUI 迁移到全屏模式的用户遭遇严重的滚动回归。3 👍 印证了这一痛点。

5. **[#7445](https://github.com/earendil-works/pi/issues/7445) — `openai-responses` 将 developer 角色绑定到 `model.reasoning`（OPEN，进行中）**
   Pi 仅在 `model.reasoning` 为 true 时才将 `context.systemPrompt` 作为 `developer` 发出，覆盖了 `supportsDeveloperRole: true`。这会破坏希望在非推理模型上使用 `developer` 角色的 OpenAI 提供商。

6. **[#5152](https://github.com/earendil-works/pi/issues/5152) — 通过 `models.json` 使用 bearer token 的 Codex websocket（CLOSED，无操作）**
   Pi 假设 Codex token 为 JWT 并尝试提取 `chatgpt_account_id`，从而阻断了使用普通 bearer 认证的第三方 Codex 兼容提供商。

7. **[#5581](https://github.com/earendil-works/pi/issues/5581) — `pi.sendMessage({ triggerTurn: true })` 绕过 `before_agent_start`（OPEN，bug）**
   带 `triggerTurn` 的自定义消息直接调用 `_runAgentPrompt` 而非 `prompt()`，导致输入重写/拦截类扩展完全看不到这些消息。影响扩展作者。

8. **[#9212](https://github.com/earendil-works/pi/issues/9212) — 通过 Vercel AI Gateway 的 sonnet-5：13% 的编辑工具调用被截断（CLOSED）**
   一周内 134 次编辑中有 18 次以 `{"path":"...","edits":[{}]}` 形式到达。`fable` 上为 0%。用户需要知晓的提供商真实不一致。

9. **[#7739](https://github.com/earendil-works/pi/issues/7739) — 设定面向 jcode 量级延迟/内存的启动时间预算（OPEN）**
   正式提案：缩小 jcode README 基准对比 pi 0.62.0 时所测得的启动性能差距。将启动延迟作为受追踪的 SLO 来对待。

10. **[#8919](https://github.com/earendil-works/pi/issues/8919) — 全屏模式为零行自定义 footer 预留了空行（CLOSED）**
    `pi.ui.setFooter` 即使传入零行，在全屏下仍占据一行，因为 `minSize: 1` 被硬编码。内联模式下处理正常。

## 关键 PR 进展

1. **[#9351](https://github.com/earendil-works/pi/pull/9351) — 修复远程编辑时编辑预览闪烁（OPEN）**
    当编辑工具使用注入的远程操作时，工具行会短暂闪现本地 "Could not edit file" 错误，随后才被远程 diff 替换。已优化 UI 平滑度。

2. **[#9350](https://github.com/earendil-works/pi/pull/9350) — 无 fork 的可执行文件查找（CLOSED）**
    `findExecutableOnPath()`（派生 `which`）与 `commandExists()`（派生 `<cmd> --version`）在 Android 低内存场景下的多线程进程中可能死锁。改为进程内查找。

3. **[#9347](https://github.com/earendil-works/pi/pull/9347) / [#9346](https://github.com/earendil-works/pi/pull/9346) — Gondolin `undici` 安全升级 + 过时 hook 清理（CLOSED）**
    将 Gondolin 的 `undici` 6.27.0 → 6.28.0（中等 CVE），并移除过时的 `packages/web-ui/*` pre-commit hook 模式。

4. **[#9345](https://github.com/earendil-works/pi/pull/9345) — 暴露 Anthropic OAuth 用量报告（CLOSED）**
    新增 `Models.getUsageReport("anthropic")`，配以 5 分钟 token 分区缓存、进行中请求去重与 `GET /api/oauth/usage`。为提供商中立的用量报告接口打下基础。

5. **[#6881](https://github.com/earendil-works/pi/pull/6881) — 优先使用提供商自报成本（OPEN，进行中）**
    当响应包含 `usage.cost`（BYOK 时还含 `cost_details.upstream_inference_cost`）时，将其用于 `usage.cost.total` 而非目录费率。回退路径仍使用 `calculateCost`，行为不变。

6. **[#9344](https://github.com/earendil-works/pi/pull/9344) — 所有者安全的交互式 UI 覆盖（CLOSED）**
    主题/footer/编辑器现在具有对象身份所有者；过时的发布不再改变当前覆盖项，显式主题选择也会清除临时所有权。

7. **[#9341](https://github.com/earendil-works/pi/pull/9341) — 运行时依赖更新（CLOSED，由 mitsuhiko 提交）**
    更新 `minimatch` 等运行时依赖，保留 `diff`/`openai`/`highlight.js`。重新生成根 lockfile、coding-agent shrinkwrap 与安装器 lock。

8. **[#9337](https://github.com/earendil-works/pi/pull/9337) — 限定 Case 3 压缩估算 + 修复上下文用量显示（CLOSED）**
    将下游 fork 的三个压缩/显示修复移植到上游 `main`，以便随官方版本发布。

9. **[#9329](https://github.com/earendil-works/pi/pull/9329) / [#9307](https://github.com/earendil-works/pi/pull/9307) — 识别 Orca 终端能力（OPEN）**
    `TERM_PROGRAM=Orca` 曾被当作未知，因此 OSC 8 超链接展开为文本、图片回退到普通渲染。现已将 Orca 加入支持 Kitty 图像/真彩/OSC-8 的能力集。

10. **[#9316](https://github.com/earendil-works/pi/pull/9316) — 三项小修复：#8919、#8717、#8720（CLOSED）**
    将零行全屏 footer（#8919）连同另外两个 TUI 小修复合并，方便评审。

另值得注意：**[#8635](https://github.com/earendil-works/pi/pull/8635)** 在惰性流建立期间保留中止 stop 原因（修复 #8409）；**[#9319](https://github.com/earendil-works/pi/pull/9319)** 为扩展提供的组件对可选的 `MouseRegion.invalidate()` 做了保护；**[#9310](https://github.com/earendil-works/pi/pull/9310)** 在会话切换时清除鼠标选择；**[#8627](https://github.com/earendil-works/pi/pull/8627)** 让扩展注册的 `read/write/edit` 工具基于 `ctx.cwd` 解析路径。

## 热门讨论

**Show and tell**
- **[#8803 — pi-verdict：pi 的极简权限闸](https://github.com/earendil-works/pi/discussions/8803)** — 仿照 Claude Code "auto mode" 的 allow/ask/deny 闸门，以单文件扩展实现，应对 pi 刻意不弹出权限的设计。
- **[#9327 — Eco Coding：Pi 的 GUI](https://github.com/earendil-works/pi/discussions/9327)** — 基于 pi agent 循环构建的开源桌面 GUI，特性涵盖视觉分区、teams、浏览器、计算机使用与移动端。
- **[#9312 — Pi 上下文记忆实验](https://github.com/earendil-works/pi/discussions/9312)** — 将压缩后的决策追溯回原始对话，以便 agent 能再次解释*为何*拒绝某个先前的选择。

## 功能请求趋势

- **提供商与协议覆盖**是最响亮的主线：Bedrock Mantle（#5363）、Kimi Responses 线协议格式（#9338）、通过 `models.json` 的 Codex bearer token（#5152）、Anthropic OAuth 用量报告（#9345） —— 都在要求 Pi 原生尚未覆盖的提供商获得一等支持。
- **计费透明度**：#9345（Anthropic 用量报告）与 #6881（使用提供商自报成本）共同推动展示真实花费而非目录估算。
- **扩展 API 成熟度**：幂等的已确认用户回合传递（#9236）、窗口聚焦/失焦的扩展事件（#2924）、`triggerTurn` 的 `before_agent_start` 对齐（#5581），以及通过 `ctx.cwd` 实现的路径敏感工具（#8627），都在拓展扩展的可构建范围。
- **启动 / 运行时性能预算**：#7739 明确提议将启动延迟与内存作为受追踪的 SLO 来对待。
- **全屏 TUI 体验打磨**：零行 footer（#8919）、滚轮变慢（#9052）、压缩块点击展开（#9356）、硬件光标稳定性（#9339） —— 全屏模式正在被真正采用，其粗糙之处逐渐浮现。

## 开发者痛点

- **提供商特有的静默失败**：Sonnet-5 工具调用截断（#9212）、GLM 强制思维泄漏（#8706）、Mistral 在非推理模型上的推理（#8700）、Z.AI `thinking` 格式不匹配 —— 这些错误并不会干净地抛出，反而会污染 agent 状态。
- **WebSocket / 流式可靠性**：Codex WebSocket 重试盲区（#7444）、瞬态 WS 失败将会话钉死在 SSE（#8125）、Esc 实际上未取消正在进行的 HTTP（#8823） —— 长时运行的 agent 回合较为脆弱。
- **压缩正确性**：陈旧 `CompactionEntry` 放置因 `unexpected tool_use_id` 会话崩溃（#8667）、`AgentSession.abort()` 仍可能触发自动压缩（#9340）、Case 3 估算无界（#9337） —— 压缩是风险最高的代码路径。
- **扩展开发摩擦**：`pi.sendMessage({ triggerTurn: true })` 跳过 `before_agent_start`（#5581）、`steer`/`follow_up` RPC 未触发 `input` 事件（#8718）、`MouseRegion.invalidate()` 在缺少该方法的扩展组件上崩溃（#9319）。
- **配置管理**：只读 `~/.pi/agent` 因读操作持锁甚至无法读取凭据（#6406）；`lastChangelogVersion` 污染 git 追踪的 `settings.json`（#6415）；Pi 管理与用户管理的设置混杂（#4212）。
- **终端 / TUI UX 漂移**：缩放时 UI 错乱（#9357）、WezTerm 下硬件光标漂移（#9339）、Orca 能力未知（#9329/#9307）、WebSocket 恢复行为不一致。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区简报 — 2026-09-09

## 今日要点

Qwen Code 发布了 **v0.23.1 稳定版**，同时推出 SDK TypeScript **v0.1.10**，其中头条级的破坏性变更是 `@qwen-code/webui` 正式退役。紧随其后发布的预览版 **v0.23.2-preview.0** 用于将子进程密集的 E2E 与 fork 压力隔离开。社区当前最关注的焦点仍是一个影响 VS Code Companion 的严重 **Windows ConPTY 进程泄漏**问题，多个关联 issue（#11303、#11352）将该缺陷追溯至 `@lydell/node-pty` 1.2.0-beta.10。

---

## 版本发布

- **[v0.23.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1)** — 稳定版，主要变更为 `@qwen-code/webui` 退役（#9812）及 `feat(web-shell): visualize and manage dyna…` 等增强。该版本已连同托管内存与提示词缓存修复一并打包进最新的 SDK 发布。
- **[v0.23.2-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.2-preview.0)** — 预览版，包含 CI 修复 #11388（将子进程密集的 E2E 与 fork 压力隔离）。
- **[sdk-typescript-v0.1.10](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.10)** — 捆绑 CLI 0.23.1；遵循 `memory.enableManagedAutoMemory` 设置（#6941），因此禁用托管自动内存的宿主不会再看到 remember/dream 请求被放行。
- **sdk-typescript-v0.1.9** — 紧邻其前的 SDK 版本，同样捆绑 CLI 0.23.0，附带相同的托管内存与提示词缓存（#8464）修复。

---

## 热门 Issue

1. **[#11303](https://github.com/QwenLM/qwen-code/issues/11303) — [P1] Windows ConPTY 进程泄漏（10 条评论）**
   VS Code Companion 中的 `qwen-cli` 会泄漏无头 `conhost.exe` 进程；运行约 12 小时后累积 347 个子进程 / 约 2.8 GB。这是本周期影响最大的未关闭 bug，也是维护者拆分出 #11352 的原因。

2. **[#11205](https://github.com/QwenLM/qwen-code/issues/11205) — [P2] main 上的过滤界面丢失六项加固**
   #10421 中一个内容过滤界面经历了 16 轮评审，但 #9742 独立编写的版本被原样合入，绕过了这些评审；引发了对读取顺序、EACCES、U+FFFD 处理、spawn 超时、候选数量上限及保留策略的担忧。

3. **[#11335](https://github.com/QwenLM/qwen-code/issues/11335) — [P3，已关闭] Web Shell 会话记录列偏移**
   在 `qwen serve` 中，一旦轮次导航栏（turn-navigation rail）可见，会话内容列便会偏离输入框轴线半个栏宽。由于已有明确的 CSS 修复路径，该 issue 很快被关闭。

4. **[#11410](https://github.com/QwenLM/qwen-code/issues/11410) — [P1] Windows 11 更新后本地模型不可用**
   在最近一次 Windows 11 更新后，v0.23.1 上 LM Studio / 本地模型连接抛出 `API Error 400`；可能影响多名用户，已具备人工分诊条件。

5. **[#11405](https://github.com/QwenLM/qwen-code/issues/11405) — [P2] 被拒绝的工具模式过度泛化**
   基于模式的 deny 规则（例如 `Bash(npm view *)`）会使模型将整个工具家族视为被禁用，进而产生失效的恢复循环。

6. **[#11394](https://github.com/QwenLM/qwen-code/issues/11394) — [P2] SDK TS docker E2E 环节共享 `QWEN_HOME`**
   内存预取消耗了 fake-server 的脚本化响应，导致 `permission-control.test.ts` 中 15/20 个确定性断言失败——仅发生在 docker 环节。

7. **[#11386](https://github.com/QwenLM/qwen-code/issues/11386) — [P2] 将 daemon 工作区扩展到 25 个以上**
   更新后的测量数据（1/25/256 容量）推翻了此前的 LRU 建议；现提议通过 LRU 活跃集合将注册与活跃运行时解耦。

8. **[#11352](https://github.com/QwenLM/qwen-code/issues/11352) — [P1，受阻] node-pty 在 shell 自然退出时泄漏 `conhost.exe`**
   baton 在 `onExit` 之前即被擦除，因此在锁定的依赖版本下从 JS 无法触达 `ClosePseudoConsole`——这是 #11303 修复的阻塞点。

9. **[#11022](https://github.com/QwenLM/qwen-code/issues/11022) — [P2，已关闭] 发布包含托管内存修复的新 SDK**
   已由 v0.1.9 / v0.1.10 SDK 发布解决——对仍在使用旧版 SDK 的用户是有用的历史背景。

10. **[#11274](https://github.com/QwenLM/qwen-code/issues/11274) — [P3] 将 Skill 管理与 ACP 子进程解耦**
    多 PR 重构（每个不超过 1000 行），将 daemon 的 skill 状态从 ACP 子进程中拆出；跟踪 issue 已在成形，附带明确的接口契约与验收标准。

---

## 重点 PR 进展

1. **[#10347](https://github.com/QwenLM/qwen-code/pull/10347) — 自动重试瞬时网络错误（EOF）**
   将被包装的低层网络失败（`400 network error … EOF`）归类为可重试，使现有的有界自动重试机制得以生效；对无法使用 `Ctrl+Y` 的渠道至关重要。

2. **[#10455](https://github.com/QwenLM/qwen-code/pull/10455) — 输出语言文件不可写时不再崩溃（#10453）**
   当全局配置目录为只读或残留 root 属主文件时，避免 CLI 启动失败——这是 CI runner 上反复出现的坑。

3. **[#10938](https://github.com/QwenLM/qwen-code/pull/10938) — Session Workflow 依赖可导航**
   计划 DAG 以步骤本身（而非其状态）打头，并弱化了检查器的界面装饰；填补了 #8583 之后遗留的导航/形态/文档缺口。

4. **[#11295](https://github.com/QwenLM/qwen-code/pull/11295) — 支持 GPT-5 与 GPT-6 的 reasoning effort**
   为 GPT-5 系列 + GPT-6 Astra 增加按模型区分的 reasoning-effort 配置，并以共享的归一化逻辑处理前缀、路由标签与带日期的快照。

5. **[#11349](https://github.com/QwenLM/qwen-code/pull/11349) — 扩充 Kimi、Qwen、DeepSeek 的 reasoning 预设**
   Moonshot K3（low/high/max）、K2.7 Code（仅 thinking）、K2.6 原生开关；Qwen 3.8（low/medium/xhigh）；DeepSeek V4 Pro 与 Flash 预设。

6. **[#11391](https://github.com/QwenLM/qwen-code/pull/11391) — 将 serve 路由 E2E 与 fork 压力隔离**
   在主 Linux 批次之后，让 `qwen serve` 路由 E2E 单独在一个 Vitest fork 中运行——直接解决 #11389。

7. **[#11172](https://github.com/QwenLM/qwen-code/pull/11172) — 一条命令远程启动并支持二维码配对**
   非回环（non-loopback）地址下的 `qwen serve` 现在会生成一次性的 128 位 bearer 令牌（22 个 URL 安全字符），仅打印一次，支持同源 shell 访问与配对二维码。

8. **[#11169](https://github.com/QwenLM/qwen-code/pull/11169) — 弥补 local-files 桥接中的信任门控/旁观者缺口**
   承接了 #10962 分支上被推迟的四项评审修复；在工作区路由中保留 “still resolving”（仍在处理中）判定。

9. **[#11291](https://github.com/QwenLM/qwen-code/pull/11291) — 重试无状态码的上游错误**
   从通过 SSE 内嵌送达、不带 HTTP 状态码的错误中恢复，防止对话轮次过早终止。

10. **[#11281](https://github.com/QwenLM/qwen-code/pull/11281) — 在本地枚举已安装的扩展 Skill**
    daemon 本地的工作区目录现在会在 ACP 子进程发布快照之前列出已安装的扩展 Skill——直接推动 #11274。

*荣誉提名：* [#11381](https://github.com/QwenLM/qwen-code/pull/11381)（移除已过时的 channel block-streaming）、[#11300](https://github.com/QwenLM/qwen-code/pull/11300)（保留因 post-checkout 钩子失败而创建的分支提交——现已合并）。

---

## 热门讨论

*所提供的快照中未呈现任何 GitHub Discussions 数据——本节省略。*

---

## 功能请求趋势

- **Reasoning-effort 可配置性**是最突出的主题：面向 GPT-5/GPT-6 的封闭集预设（#11295）、主流 Kimi 模型 + 补全后的 Qwen/DeepSeek（#11349），以及支持按会话定制请求头的 `customHeaders` 模板变量（如 `${session_id}`）（#10995）。
- **自定义 Web Shell 分发托管** — 将 `qwen serve` 作为可嵌入的 shell 供第三方 Agent 前端使用，同时保留 QC daemon API（#11358）。
- **Daemon 可扩展性** — 解除 25 个工作区的上限（#11386），并将 Skill 管理与 ACP 子进程解耦（#11274）。
- **一条命令远程配对** — 为非回环地址的 `qwen serve` 生成 bearer 令牌 + 二维码（#11172），实现局域网/广域网的“开箱即用”。
- **ACP/Zed 功能对齐** — 在 Zed 内提供规范的 AskUserQuestion UI，而不只是 “Raw Input”（#11361）。
- **Web Shell 中的 Subagent 体验** — 后台代理通知轮次期间侧边栏会话加载动画（#11385），以及更大范围的 Session Workflow 导航改造（#10938）。

---

## 开发者痛点

- **Windows 特有的脆弱性。** ConPTY 进程泄漏（#11303、#11352）与 Windows 11 更新后本地模型失灵（#11410）是社区反映最强烈的问题，其中数个被标记为 P1，另有一个因锁定的 `node-pty` 版本被正式标记为受阻。
- **CI 抖动，尤其在 fork 场景。** 子进程密集的 E2E 在 fork 压力下偶发失败，由此催生了三项并行加固 PR（#11388 → v0.23.2-preview.0、#11391、#11134、#11297）以及 Fleet Shepherd bot（#7167）。
- **权限模型的易用性。** 基于模式的 `deny` 规则会过度泛化并破坏工具选择（#11405）；此外，安全评审结论（#11205、#9558）表明，分支上落地的加固始终进不了 `main` 是一个反复出现的风险。
- **SDK 发版节奏。** 用户仍在追踪 `enableManagedAutoMemory` 与提示词缓存修复各自发布到了哪个版本（#11022 → 已在 v0.1.9 / v0.1.10 中解决）。
- **Docker E2E 确定性。** SDK TS docker 环节中共享的 `QWEN_HOME` 会悄悄占用脚本化的 fake-server 响应（#11394），导致 75% 的 permission-control 测试失败。

---

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*