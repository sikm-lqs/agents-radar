# OpenClaw 生态日报 2026-09-15

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-14 17:02 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目简报 — 2026-09-15

## 1. 今日概览

OpenClaw 在过去 24 小时窗口内呈现出**极高的分诊流转量、零版本发布**的态势：500 个 issue 有更新（305 个仍开启、195 个已关闭），500 个 PR 有更新（341 个仍开启、159 个已合并/关闭），且没有任何新打的标签版本。今日活动以 **2026.9.3 / 2026.9.4 发布之后的热修复工作**为主——新近开启的跟踪 issue [openclaw/openclaw#145252](https://github.com/openclaw/openclaw/issues/145252) 正在统筹围绕这些版本的更新、升级、Doctor、迁移、回滚与重启可靠性，这表明项目正处于**问题小版本发布后的稳定化阶段**。今日头部条目中反复出现的主题包括 Gateway 事件循环停滞、子进程泄漏、Codex-app-server 回归、Windows 特有的更新/交接缺陷，以及 Windows 上的 SQLite WAL 膨胀——它们共同指向**尚未被完全遏制的真实场景可靠性回归**。

## 2. 版本发布

**过去 24 小时内没有新版本发布。**最近的发布活动集中在 **2026.9.2 / 2026.9.3 / 2026.9.4** 版本线上，多个仍处开启状态的 issue 将其认定为回归来源（[#145252](https://github.com/openclaw/openclaw/issues/145252)、[#145510](https://github.com/openclaw/openclaw/issues/145510)、[#146860](https://github.com/openclaw/openclaw/issues/146860)、[#143524](https://github.com/openclaw/openclaw/issues/143524)）。当前运行这些构建的运维人员，应在再次执行 `openclaw update` 之前持续关注该跟踪 issue。

## 3. 项目进展

维护者 `steipete` 与贡献者 `RomneyDa` 今日落地了一大批**已合并/关闭的 PR**，聚焦于热修复、测试矩阵精简，以及不改变用户可见行为的重构：

- [#148126](https://github.com/openclaw/openclaw/pull/148126) —— `fix: Doctor maintenance closes unrelated database clients`（XL，标注为 *proof: sufficient*）。
- [#148289](https://github.com/openclaw/openclaw/pull/148289) —— `fix: retry ambiguous Gemini current-quota 429s`。
- [#147978](https://github.com/openclaw/openclaw/pull/147978)、[#147979](https://github.com/openclaw/openclaw/pull/147979)、[#147980](https://github.com/openclaw/openclaw/pull/147980)、[#147981](https://github.com/openclaw/openclaw/pull/147981) —— `refactor: compact runtime test matrices` 系列（reply、OpenAI transport、update lifecycle、runtime environment）。净效果：移除约 267 行测试脚手架，无契约变更。
- [#148118](https://github.com/openclaw/openclaw/pull/148118) —— `fix(plugins): preserve live ClawHub package metadata`（修复 Docker fixture 隔离验证通道中的缺陷）。
- [#147457](https://github.com/openclaw/openclaw/pull/147457) —— `fix(matrix): persist private crypto state before key uploads`（关闭 [#147450](https://github.com/openclaw/openclaw/issues/147450)）。

若干**已关闭的 issue** 也印证了针对此前阻塞性缺陷的进展：Codex app-server 轮次完成停滞回归 [#88312](https://github.com/openclaw/openclaw/issues/88312)、2026.7.1 网关启动失败 [#108435](https://github.com/openclaw/openclaw/issues/108435)、2026.9.2 reply authority 回归 [#141252](https://github.com/openclaw/openclaw/issues/141252)，以及 macOS npm `global install swap` 回滚失败 [#145072](https://github.com/openclaw/openclaw/issues/145072)。

## 4. 社区热点

吸引社区最多关注的这些 issue 全都暴露了**真实负载下的运行时完整性问题**：

- **[#25592 — "Text between tool calls leaks to messaging channels"](https://github.com/openclaw/openclaw/issues/25592)**（40 条评论，🦞）。获 Diamonds 评级，原因是内部 agent 的叙述/错误文本被当作用户可见输出路由到了 Slack/iMessage。底层诉求：在*模型可见的叙述*与*可投递至渠道的内容*之间实现干净分离；可能需要重构路由策略。
- **[#97616 — "OpenClaw leaks unreaped hook/tool child processes"](https://github.com/openclaw/openclaw/issues/97616)**（30 条评论，🦪）。僵尸进程累积（`openclaw-hooks`、`bash`、`codex`）与长时间运行的网关会话相关。底层诉求：对派生子进程实施确定性的生命周期/清理管理。
- **[#91009 — Codex `PreToolUse` 原生 hook 中继派生 CPU 密集型 `openclaw-hooks` 并卡住 Gateway RPC](https://github.com/openclaw/openclaw/issues/91009)**（23 条评论，P0）。直接加重 [#97616](https://github.com/openclaw/openclaw/issues/97616) 的问题；表明 Codex 中继路径需要进程池化或同步的进程内处理。
- **[#88312 — Codex 在 2026.5.27 上的轮次完成回归](https://github.com/openclaw/openclaw/issues/88312)**（22 条评论，已关闭；#84076 → #85107 的后续）。社区信号强烈，因为它经二分定位指向单一小版本。
- **[#119720 — "Synchronous agent persistence and transcript maintenance block the Gateway event loop at scale"](https://github.com/openclaw/openclaw/issues/119720)**（20 条评论，🦞）。呼吁将持久化与压缩操作移出请求路径。
- **[#102175 — 嵌入式 prompt cache 跨 room/policy/Responses 边界失效](https://github.com/openclaw/openclaw/issues/102175)**（19 条评论，P2）。长时间运行的嵌入式会话丧失 provider 缓存复用，推高成本与延迟。
- **[#144911 — MCP 服务器初始化超时导致 Gateway 崩溃](https://github.com/openclaw/openclaw/issues/144911)**（15 条评论，）。子进程清理中出现未处理 rejection；单个行为异常的 MCP 服务器即可触发稳定性断崖。

## 5. 缺陷与稳定性

**P0（发布阻塞级）：**

| Issue | 标题 | 状态 | 修复 PR？ |
|---|---|---|---|
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex `PreToolUse` 中继卡住 Gateway RPC | 未关闭 | 无关联 PR |
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | Windows：InteractiveToken 任务下托管更新交接停滞 | 未关闭 | 无关联 PR |
| [#145510](https://github.com/openclaw/openclaw/issues/145510) | 更新失败：`runtime-verification-failed`（2026.9.3） | 未关闭 | 无关联 PR |
| [#123326](https://github.com/openclaw/openclaw/issues/123326) | 显式多 agent Codex 迁移使 Gateway 陷入崩溃循环 | 未关闭 | 无关联 PR |
| [#125333](https://github.com/openclaw/openclaw/issues/125333) | 2026.8.1-beta.2 上 `totalTokens` 虚高（仅修复了 `cli` 路径） | 未关闭 | 部分修复 — [#123065](https://github.com/openclaw/openclaw/issues/123065) 仅覆盖一条 API 路径 |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | SQLite WAL 增长至 1.4–2.8 GB；在 Windows 上阻塞 Gateway 启动 | 未关闭 | 无关联 PR |

**P1（高严重度）：**

| Issue | 标题 | 状态 | 修复 PR？ |
|---|---|---|---|
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP 初始化超时导致 Gateway 崩溃（未处理 rejection） | 未关闭 | 无关联 PR |
| [#125570](https://github.com/openclaw/openclaw/issues/125570) | Skill Workshop `update` 静默覆盖线上 skill 的 `description` | 未关闭 | 无关联 PR |
| [#125764](https://github.com/openclaw/openclaw/issues/125764) | Telegram：瞬时发送失败一次尝试后即转入死信 | 未关闭 | 无关联 PR |
| [#134993](https://github.com/openclaw/openclaw/issues/134993) | 大规模 fleet 下 Gateway 在文件系统发现中忙循环 | 未关闭 | 无关联 PR |
| [#145152](https://github.com/openclaw/openclaw/openclaw/issues/145152) | 卡死会话恢复未标明任何 run/owner 身份 | 未关闭 | 无关联 PR |
| [#144876](https://github.com/openclaw/openclaw/issues/144876) | 工具支撑的仪表盘会话在长度 finalize 失败后静默结束 | 未关闭 | 无关联 PR |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | 嵌入式 prompt cache 跨边界失效 | 未关闭 | 无关联 PR |
| [#104719](https://github.com/openclaw/openclaw/issues/104719) | `memory-wiki` 穷举式回退无视工具截止时间 | 未关闭 | 无关联 PR |

**今日已关闭（回归已解决）：**[#108435](https://github.com/openclaw/openclaw/issues/108435)（2026.7.1 网关启动失败）、[#141252](https://github.com/openclaw/openclaw/issues/141252)（2026.9.2 reply authority）、[#145072](https://github.com/openclaw/openclaw/issues/145072)（macOS npm `global install swap`）、[#135776](https://github.com/openclaw/openclaw/issues/135776)（`openclaw update` 上的 core/plugin 版本偏斜）。

**稳定性判读：**当前缺陷负载主要集中于**进程/资源生命周期**（僵尸进程、忙循环、WAL 膨胀、子进程清理崩溃）、**更新/升级机制**（interactive-token 任务、runtime-verification、plugin/core 版本偏斜）以及 **Codex-app-server 回归**。进程生命周期类问题（#97616、#91009 及 #97616 系）似乎共享同一个架构层面的根因，目前尚无单一修复 PR 加以解决。

## 6. 功能请求与路线图信号

最活跃的功能请求：

- **[#52640 — 面向长时间运行渠道轮次的持久化任务状态界面](https://github.com/openclaw/openclaw/issues/52640)**（8 个 👍）：先做 Discord 优先的抽象，再推广为通用方案。鉴于用户对输入状态指示器和心跳刷屏的反复抱怨，该功能极有可能进入近期版本。
- **[#48788 — 面向多编码 Content-Disposition 的集中式文件名编码工具](https://github.com/openclaw/openclaw/issues/48788)**（20 条评论）：已合并 PR #48578 的后续工作；这项架构清理很可能与 Feishu/LINE/JP-KR 本地化工作一同发布。
- **[#27445 — 用于子 agent 完成路由的 `announceTarget` 选项](https://github.com/openclaw/openclaw/issues/27445)**（5 个 👍）：可通过 `sessions_spawn` 实现父级编排的工作流。PR 已开启；实现难度可控。
- **[#51028 — 会话面板：按最近有效活动排序](https://github.com/openclaw/openclaw/issues/51028)**：Web UI 易用性改进；交付成本低。
- **[#74077 — 切换预览流式输出的斜杠命令](https://github.com/openclaw/openclaw/issues/74077)**（已关闭）：已通过关联 PR 发布。
- **[#74100 — Skill Graph 按需依赖加载](https://github.com/openclaw/openclaw/issues/74100)**：token 效率方向的推进；改动较大，短期内不会落地。
- **[#27445 — `announceTarget`](https://github.com/openclaw/openclaw/issues/27445)**：配套 PR 已经开启。

**最有可能随下一个小版本发布：**`announceTarget`（[#27445](https://github.com/openclaw/openclaw/issues/27445)）与持久化任务状态界面（[#52640](https://github.com/openclaw/openclaw/issues/52640)）——两者都已有联动的实现工作，且 👍 比例很高。

## 7. 用户反馈摘要

- **痛点：agent 叙述内容泄漏到私信。**[#25592](https://github.com/openclaw/openclaw/issues/25592) —— 在 Slack/iMessage 上运行的运维人员发现内部 `error handling` 文本直接暴露给最终用户；对信任度影响很大。
- **痛点：长时间运行的网关静默劣化。**[#97616](https://github.com/openclaw/openclaw/issues/97616)、[#91009](https://github.com/openclaw/openclaw/issues/91009)、[#134993](https://github.com/openclaw/openclaw/issues/134993)、[#143524](https://github.com/openclaw/openclaw/issues/143524) —— 均描述了故障发生前数小时到数天的时间尺度，令诊断变得困难。
- **痛点：更新如今成了风险操作。**[#145510](https://github.com/openclaw/openclaw/issues/145510)、[#145252](https://github.com/openclaw/openclaw/issues/145252)、[#146860](https://github.com/openclaw/openclaw/issues/146860)、[#135776](https://github.com/openclaw/openclaw/issues/135776)、[#145072](https://github.com/openclaw/openclaw/issues/145072) —— 升级动作本身在 macOS、Windows 和 Linux 上都是事故来源。
- **痛点：Codex-app-server 集成脆弱。**针对特定小版本的多起回归（#88312、#84037、#123326）正在侵蚀对 Codex 路径的信心。
- **痛点：跨用户隐私回归。**[#77292](https://github.com/openclaw/openclaw/issues/77292)（已关闭；跨私信上下文泄漏）、[#25592](https://github.com/openclaw/openclaw/issues/25592)（渠道错误路由）——安全与隐私类回归反复出现。
- **正在涌现的使用场景：**Discord 优先的长时间任务 UX、可持久跟进的子会话（[#148012](https://github.com/openclaw/openclaw/pull/148012)）、WearOS / 移动端网关伴侣（[#143216](https://github.com/openclaw/openclaw/pull/143216)）。
- **满意度信号：**今日合并集合中 `steipete` 署名的 PR 占主导，并带有维护者信任标签；贡献者梯队健康。

## 8. 积压事项观察

**长期无人跟进、既无维护者查看也无修复 PR 的 P1/P0 事项——面临延期风险：**

- [#25592](https://github.com/openclaw/openclaw/issues/25592) —— diamond-lobster，`clawsweeper:no-new-fix-pr`，自 2026-02-24 起开启。路由/叙述泄漏具有安全敏感性，且是社区关注的核心。
- [#97616](https://github.com/openclaw/openclaw/issues/97616) —— `clawsweeper:no-new-fix-pr`，自 2026-06-29 起开启。子进程生命周期问题；无明确负责人。
- [#125570](https://github.com/openclaw/openclaw/issues/125570) —— Skill Workshop 通过覆盖 `description` 静默破坏 skill 路由；无 PR。
- [#125764](https://github.com/openclaw/openclaw/issues/125764) —— Telegram 首次失败即转入死信；对生产环境 Telegram 部署影响很大。
- [#143524](https://github.com/openclaw/openclaw/issues/143524) —— Windows 上 SQLite WAL 失控增长；阻塞启动。
- [#146860](https://github.com/openclaw/openclaw/issues/146860) —— Windows InteractiveToken 计划任务交接停滞。
- [#91009](https://github.com/openclaw/openclaw/issues/91009) —— Codex 中继 CPU/RPC 停滞；与 [#97616](https://github.com/openclaw/openclaw/issues/97616) 共享根因。
- [#125333](https://github.com/openclaw/openclaw/issues/125333) —— `totalTokens` 棘轮式虚高：先前修复不完整；memory-flush 路径无防护。

**等待维护者审阅或作者行动的 PR：**[#145074](https://github.com/openclaw/openclaw/pull/145074)（`⏳ waiting on author`）、[#147724](https://github.com/openclaw/openclaw/pull/147724)（`⏳ waiting on author`，已附截图证明）、[#147188](https://github.com/openclaw/openclaw/pull/147188)（`📣 needs proof`，Telegram e2e）、[#67421](https://github.com/openclaw/openclaw/pull/67421)（`📣 needs proof`，按 agent 的 SSRF 覆盖——与安全相关）。

**每一位运行 2026.9.x 的运维人员都应关注的跟踪 issue：**[#145252](https://github.com/openclaw/openclaw/issues/145252)。

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / Agent 开源生态
**快照日期：2026-09-15** | 项目：OpenClaw, Hermes Agent, IronClaw, QwenPaw, ZeroClaw

---

## 1. 生态概览

当前个人 AI 助手版图分为**终端用户助手层**（OpenClaw、Hermes Agent、QwenPaw、ZeroClaw）和**执行运行时层**（IronClaw 的 Rust/wasm 宿主）。纵观所有活跃的待办事项，工程重心已明确从功能扩张转向**可靠性工程**：状态数据库完整性、长时运行进程卫生、更新安全性以及 MCP 集成加固主导着每一份摘要。消息渠道桥接（Telegram、Matrix、Slack、WhatsApp、XMPP、Feishu）仍是主要的集成面，而自托管运维者——而非普通消费者——是主导用户画像。治理水平明显趋于成熟（RFC 流程、贡献者阶梯、发布列车），尽管五个项目中有两个正处于回归驱动或刻意的稳定化阶段。

---

## 2. 活跃度对比

| 项目 | Issues 触及数（24h） | PR 触及数（24h） | 发布状态 | 健康分* | 关键风险 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（305 open / 195 closed） | 500（341 open / 159 merged） | 无；处于 2026.9.3/.4 热修复后的模式 | **7.0/10** | 6 个未关闭的 P0，其中 5 个没有修复 PR；活跃回归跟踪 issue [#145252](https://github.com/openclaw/openclaw/issues/145252) |
| **Hermes Agent** | 50 | 50 | ✅ **v0.21.3** 于 09-14 发布（汇总约 338 个 PR） | **7.5/10** | 7 个未关闭 P1 中 5 个没有进行中的修复 |
| **QwenPaw** | 45（31% 已关闭） | 50（22% 已合并） | 无；v2.2.1 线处于修复缺陷的浪潮中 | **7.0/10** | 三个 P0 级别的数据丢失/OOM issue 未关闭 |
| **ZeroClaw** | 26（6 已关闭） | 50（48 open / 2 closed） | 无；v0.8.5 线，合并入口已冻结 | **6.5/10** | 两个 S1 无 PR；决策队列瓶颈；XL 级 PR 已老化 50–77 天 |
| **IronClaw** | 1 | 6（4 个 = Dependabot；1 个已关闭） | 无 | **4.5/10** | 实质产出接近于零，社区参与度为零 |

\* 综合吞吐量、待办风险（P0/S1 修复覆盖率）、发布节奏、参与度和评审延迟。统计为 24 小时内触及的项目，且对最大的仓库似乎有窗口封顶（OpenClaw 为 500/500；其他为 50），因此 OpenClaw 相对于同类项目的真实规模可能被低估。

---

## 3. OpenClaw 的定位

**相对同类项目的优势：**
- **社区规模（约为最近对手的 10 倍）。** 头部 issue 的参与度达到 40 / 30 / 23 条评论，对比 Hermes 17、ZeroClaw 15、QwenPaw 6、IronClaw 0。累计 issue 编号（约 #148k，对比 Hermes 约 #111k、ZeroClaw/IronClaw 约 #10k、QwenPaw 约 #7.7k）意味着其历史用户基数以显著优势居首。
- **交付吞吐量。** 时间窗内合并 159 个 PR——比其余项目加总还高一个数量级——且有维护者主导的评审（steipete）和强制的验证标签，表明 QA 流程严谨（尽管已紧张承压）。
- **运维工具成熟度。** Doctor 诊断、托管更新/回滚机制、跟踪 issue 以及插件市场（ClawHub）——在完整性上没有同类项目可匹敌。

**技术路线差异：** OpenClaw 是一个**单体网关枢纽**——中心 Gateway 进程、多渠道桥接、插件/技能生态以及深度的 Codex app-server 集成。Hermes 拥有同样的网关/集群基因但规模约为 1/10，且正处于巩固模式。QwenPaw 以**桌面应用优先**并配有记忆子系统。ZeroClaw **协议/渠道优先**但治理开销较大。IronClaw 是基础设施，不是助手。值得注意的是，OpenClaw 最深的集成点（Codex app-server）也是其最高产的 bug 来源（#88312、#123326、#91009）。

**弱点：** 质量债务是真实存在的——6 个未关闭 P0 大多没有关联修复，更新机制本身在三个操作系统上都构成事故诱因，安全相关的旁白泄露 issue #25592 自 2026-02-24 起一直未关闭。OpenClaw 是持续承受回归压力下的生态领导者。

---

## 4. 共同技术关注领域

| 关注领域 | 项目 | 具体新兴需求 |
|---|---|---|
| **MCP 可靠性与隔离** | **全部五个** | 初始化超时的崩溃遏制（OpenClaw #144911）、不污染状态的连接恢复（ZeroClaw #10807）、标准化错误封装含 Java SDK（QwenPaw #7728/#7716）、出站流量泄露分类（IronClaw #8077）、免重启重载（Hermes #110976） |
| **SQLite/WAL 状态完整性** | OpenClaw, Hermes | 单写者保护、WAL checkpoint/截断（Windows 上 1.4–2.8 GB 增长）、发病前遥测；Hermes 的惰性文件锁修复已经过现场验证且可迁移 |
| **更新/迁移安全** | OpenClaw, Hermes, QwenPaw | 不被误读为失败的延迟重启终态（Hermes #107402）、运行时验证、profile 分发时数据/技能的保留（QwenPaw #7724、Hermes #110920） |
| **长时运行资源卫生** | OpenClaw, QwenPaw, Hermes | 子进程回收（OpenClaw #97616）、有界缓冲区/keep-alive 池（QwenPaw：20.7 GB 增长，约 1 MB/s 泄漏）、turn-lease/会话清理（Hermes #110985） |
| **内容边界卫生** | OpenClaw, ZeroClaw, QwenPaw | 将模型可见的旁白与渠道可投递文本分离（OpenClaw #25592）；多模态占位符/标记绝不能触达用户（ZeroClaw #10625/#10854）；定时任务输出不得静默消失（QwenPaw #7709） |
| **失控 Agent 遏制** | ZeroClaw, Hermes, QwenPaw | 执行树迭代预算（ZeroClaw #10351）、软性唤醒而非强杀的超时机制（Hermes #111035）、末日循环门控与溢出恢复（QwenPaw #7748） |
| **Windows 对等性** | OpenClaw, QwenPaw, Hermes, ZeroClaw | 更新交接停顿、WAL 阻塞、子 Agent 生成超时、CI 抖动——Windows 仍是被全生态二等对待的平台 |

---

## 5. 差异化分析

| 项目 | 功能重点 | 目标用户 | 架构 |
|---|---|---|---|
| **OpenClaw** | Gateway + 渠道桥接 + 插件/技能 + Codex 集成 | 运行常驻助手并桥接 Slack/iMessage/Discord 的运维者 | Node 网关枢纽、插件市场、Doctor 工具 |
| **Hermes Agent** | 集群网关、profiles、审批、Feishu/Slack/Telegram | 自托管者；Docker/Cloud 下游消费者 | 同样的网关基因、巩固标签发布模式（每个补丁约 338 个 PR） |
| **QwenPaw** | 桌面应用、记忆子系统（ReMe/dream digest）、数据分析（QwenPaw-Data 0.3）、Hub、ACP | Windows/macOS 上的终端用户，包括非英语区域（vi, pt-BR） | 桌面原生宿主 + Python 3.11 运行时 + 控制台 UI |
| **ZeroClaw** | 多渠道自托管、本地优先计算（edge-mesh RFC）、配置不变量 | 家庭实验室 / 自托管爱好者 | 基于 daemon、每个渠道一个模块、RFC/ADR 治理 |
| **IronClaw** | 沙箱执行、MCP 出站安全、基准测试框架 | 开发者 / 平台团队 | Rust + wasmtime/wasm 沙箱——基础设施层，不是助手 |

最清晰的架构分野在于：OpenClaw/Hermes 竞逐**常驻网关**类别；QwenPaw 占据**桌面消费者**利基市场；ZeroClaw 争取**拥有硬件的自托管者**；IronClaw 提供可供他人构建的**执行基座**。

---

## 6. 社区势能与成熟度

- **第一梯队 — 超大规模高强度运转、被迫稳定化：** **OpenClaw**。大规模的分类处理吞吐量但没有发布；是在有问题的补丁版本之后稳定下来，而非主动选择。
- **第二梯队 — 发布速度：** **Hermes**（时间窗内唯一的发布；修复链经报告者验证已修复——生态中最强的闭环信号）和 **QwenPaw**（并行功能冲刺——QwenPaw-Data 0.3、可视化压缩——加上安全收紧；22–31% 的关闭比率属于健康水平）。
- **第三梯队 — 主动巩固：** **ZeroClaw**。发布前合并冻结，治理日趋成熟（RFC 投票改革、加速合并通道、贡献者阶梯），但维护者决策队列是该项目公认的瓶颈。
- **第四梯队 — 维护/内部：** **IronClaw**。健康的 Dependabot 节奏和基准可观测性，但没有社区也没有发布实质内容——很可能处于内部框架阶段。

**值得注意的成熟度悖论：** ZeroClaw 在最小的助手规模上拥有最强的*流程性*成熟度（治理、不变量、贡献者阶梯），而 OpenClaw 拥有最*运维性*成熟的工具但回归遏制能力最弱。Hermes 展示了最健康的贡献者演进轨迹——用户现在带着补丁级 PR 而来，而不只是提工单。

---

## 7. 趋势信号

1. **在线时长工程已经取代了功能竞赛。** 各处的主导 bug 都是天级别的退化（僵尸进程、WAL 膨胀、内存渐增、事件循环停顿）——证明该品类已从演示阶段转向生产部署。
2. **MCP 既是万能集成面也是万能故障面**（全部五个项目）。超时隔离、连接恢复和错误封装标准化现在是任何 agent 运行时的入门门槛。
3. **自更新本身就是一个独立的事故类别。** 延迟重启语义、回滚、运行时验证以及分发过程中的用户数据保留在 OpenClaw、Hermes 和 QwenPaw 中均未解决——是共享工具的蓝海机会。
4. **对静默失败的零容忍。** 用户明确要求响亮的报错：无操作的 trait 默认值（ZeroClaw #10842）、"已完成但无内容"（QwenPaw #7715）、cron daemon 静默死亡（Hermes #111010）、单次尝试即进死信队列（OpenClaw #125764）。
5. **内容边界卫生是一个信任问题。** 模型旁白泄漏到私聊中以及多模态占位符触达终端用户（OpenClaw #25592、ZeroClaw #10625/#10854）表明，将*模型可见*与*用户可投递*的内容分离需要成为一种架构原语，而不是补丁。
6. **Agent 遏制经济学。** 三个项目中的迭代预算、软超时和末日循环门控反映了日益上升的成本/延迟敏感度——供应商 prompt-cache 失效（OpenClaw #102175、Hermes #105236）直接加剧了这一点。
7. **本地优先/边缘需求。** ZeroClaw 的家庭 edge-mesh RFC 和 OpenClaw 的 WearOS/移动网关伴侣应用都表明对单一主机之外的算力主权需求正在增长。
8. **可归因于基准测试的模型质量。** IronClaw 区分框架 bug 与模型失败的故障分类法（DeepSeek-V4-Flash 导航）预示着当模型选择变成可调参数时，agent 构建者将需要的可观测层。

**给构建者的核心结论：** 下一季度该生态中的差异化工作是可靠性基础设施——MCP 故障隔离、多写者状态保护、安全的自更新和内容边界执行——最先将这些工业化项目（Hermes 在验证闭环上最接近；OpenClaw 有规模来强制推动此事）将树立参考范式。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-15

## 今日概览

Hermes Agent 在过去 24 小时内呈现出 **开发节奏加快、稳定性工作高度集中** 的态势，触及 50 个 issue 与 50 个 PR，并发布了 v0.21.3 —— 这是一个补丁版本，将自 v0.21.2 以来合并的约 338 个 PR 整合为一个稳定的标签化构建版本，供下游 Docker/Cloud 用户使用。整体活动明显偏向缺陷修复而非功能扩展：在所有开放 issue 中，大多数集中在三个系统性问题 —— 多写者 WAL 下的 `state.db` 损坏、fleet 重启期间的 gateway/cron 生命周期处理、以及 profile 分发逻辑在更新时会清空用户技能。积压任务中仍有若干 **P1 级生产影响性 Bug** 处于开放状态，包括 cron 在启动时静默死亡（[#111010](https://github.com/NousResearch/hermes-agent/issues/111010)）以及在活跃 gateway 上投递义务从不重试（[#91653](https://github.com/NousResearch/hermes-agent/issues/91653)），而 prompt-cache 与 WAL 修复链路已开始通过 commit 落地。维护者似乎正在针对数据库损坏类问题组织一次协调的、多 PR 同步推进。

## 版本发布

**v0.21.3 (v2026.9.14)** — 发布于 2026-09-14。这是一个 **补丁 / 整合性标签版本**，并非功能版本。它将自 v0.21.2 以来合并的约 338 个 PR 打包为一个标签化构建版本，供下游消费者使用（Docker 镜像、Hermes Cloud、托管部署）。发布说明强调以 **远程 gateway 登录修复** 作为本次发版的主要动因。

- **破坏性变更：** 未记录。
- **迁移说明：** 标准升级流程；v0.21.2 → v0.21.3 的跳跃主要影响下游打包与登录流程。用户应查阅 #107402 中关于在 gateway 进程内执行 `hermes update` 时的延迟重启行为。
- **值得关注的已包含修复**（从已合并 PR 活动中推断）：WAL 交接链路（[#109841](https://github.com/NousResearch/hermes-agent/pull/109841)、[#110544](https://github.com/NousResearch/hermes-agent/pull/110544)）、`command_allowlist` 规则键匹配、Slack 澄清卡片取消、终端审批误报、`relativeTime`/`ago` V8 有限值守卫。

## 项目进展

**窗口期内已合并 / 已关闭（50 个中的 4 个）：**
- [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) — *已关闭*：通过 `doctor --fix` / `repair_state_db_schema` 引发的第二写者损坏；单写者惰性 flock 闸门方案已在现网验证通过，关闭了多写者损坏类问题的一个分支。
- [#105236](https://github.com/NousResearch/hermes-agent/issues/105236) — *已关闭*：提示缓存（prompt-cache）损坏综合性调查；五个缓存根因加一个相关的非缓存问题已被分类并解决。
- [#96776](https://github.com/NousResearch/hermes-agent/issues/96776) — *已关闭*：`approvals` 在包含引号的 grep 括号字符类上出现硬性阻断误报。
- [#75281](https://github.com/NousResearch/hermes-agent/pull/75281) — *已关闭*：原生 workflow 聚合（看板）。以关闭而非合并的状态收尾，提示维护者驳回了其作用域或将工作重定向。
- [#111024](https://github.com/NousResearch/hermes-agent/pull/111024) — *已关闭*：V8 "Invalid time value" 弃用守卫（自 [#108179](https://github.com/NousResearch/hermes-agent/issues/108179) 中抽取）。

**今日活跃推进中的 PR（开放中，共 46 个）：**
- [#111040](https://github.com/NousResearch/hermes-agent/pull/111040) — 飞书入站去重 flush 已迁移至 adapter 自有线程池（修复「默认执行器死亡」系列问题）。
- [#111031](https://github.com/NousResearch/hermes-agent/pull/111031) — `tui_gateway` 中跨面自动让位与可抢占、带 epoch 围栏的会话租约。
- [#110854](https://github.com/NousResearch/hermes-agent/pull/110854) — `hermes gateway migrate --multiplex` 保留系统服务的 `User=` 身份。
- [#110933](https://github.com/NousResearch/hermes-agent/pull/110933) — **P1 修复**：profile 分发现在于更新时 *合并* 技能而非删除现有树，直接解决 [#110920](https://github.com/NousResearch/hermes-agent/issues/110920)。
- [#110859](https://github.com/NousResearch/hermes-agent/pull/110859) — 套接字发送失败后 PTY 会话恢复（桌面仪表盘）。
- [#111022](https://github.com/NousResearch/hermes-agent/pull/111022) — Codex OAuth 用量端点在 token 撤销 401 后的恢复。
- [#111037](https://github.com/NousResearch/hermes-agent/pull/111037) — 显示元数据写入（reactions）不再重写整个会话历史。
- [#111035](https://github.com/NousResearch/hermes-agent/pull/111035) — 后台任务软超时（唤醒 agent 而非直接终止）。
- [#111036](https://github.com/NousResearch/hermes-agent/pull/111036) — 针对持久化控制文件变更的可选审批闸门。
- [#92122](https://github.com/NousResearch/hermes-agent/pull/92122) — Linux `.desktop` 启动器可靠解析具备 Hermes 能力的解释器。

## 社区热议话题

讨论以用户记录 **现网验证的损坏问题** 与提出具体缓解方案为主导，三条 issue 引发的来回最为密集：

1. **[#107402 — `hermes update` 留下永久的 "did not restart running gateways" 警告（17 条评论，P1）](https://github.com/NousResearch/hermes-agent/issues/107402)** — 作者 Rotifunk。核心 UX 问题：在 gateway 自身进程树内更新时，重启会被正确延迟到进行中的工作完成，但更新器会 *立即* 校验 fleet 并标记 `state: stale`，导致运行以 `partial` 收尾并留下永久的 `fleet_restart…` 警告。*底层诉求：* 一个不会被解读为失败的、清晰的「延迟重启」终态，以及对 `partial` 含义的明确报告。
2. **[#109966 — WAL 代际交接使长期持有者驻留在已删除的 `-wal/-shm` 上，并阻塞每个新打开者（11 条评论，P2）](https://github.com/NousResearch/hermes-agent/issues/109966)** — 作者 SuperMax110。报告者更新确认在 [#109841](https://github.com/NousResearch/hermes-agent/pull/109841) 与 [#110544](https://github.com/NousResearch/hermes-agent/pull/110544) 落地后，WAL 交接链路在 `743140cd8` 上已 *不可复现*。*底层诉求：* 在剩余交接路径被覆盖后关闭该 issue；这是数据库损坏修复推进正在生效的积极信号。
3. **[#100896 — 5 周内 4 次 `state.db` 损坏（10 条评论，P1）](https://github.com/NousResearch/hermes-agent/issues/100896)** — 作者 bronder。这是损坏类问题集群（#90837、#100313、#89737）中的一个案例。作者提出两个新要素：一个 **提前 7 分钟出现的预警特征**（「5 个活跃 SessionDB 句柄」），以及 `journal_mode=delete` 可抑制损坏但会丧失 WAL 并发收益的观察。*底层诉求：* 在故障发生前，提供统一的多写者权威守卫与可观测遥测。
4. **[#103339（已关闭）— `doctor --fix` 引入的第二写者损坏 live-WAL `state.db`（9 条评论）](https://github.com/NousResearch/hermes-agent/issues/103339)** — 作者 RChina。在惰性 flock 单写者闸门通过现网验证后关闭。是用户同时提供复现与补丁级修复的典型案例。
5. **[#79649 — agent-browser / web / ui-tui 中的 npm 漏洞（8 条评论，P2）](https://github.com/NousResearch/hermes-agent/issues/79649)** — 长线讨论；`hermes doctor --fix` 报告的 6 个漏洞在 `npm audit fix` 后并未消失，原因是 workspace pin 失效。*底层诉求：* 在安装路径中加入自动化的 lockfile 刷新。

**底层主题：** 用户越来越多地在 bug 报告中 *附带代码级修复方案*（惰性 flock、软超时封装、可选审批闸门、合式合并式分发）—— 社区如今已贡献至补丁 PR 层面，而非仅仅提单。

## 缺陷与稳定性

按严重程度排序（P1 优先）。每一行注明在开放集合中是否存在修复 PR：

| 严重度 | Issue | 标题 | 修复 PR |
|---|---|---|---|
| **P1** | [#107402](https://github.com/NousResearch/hermes-agent/issues/107402) | `hermes update` 留下 "did not restart running gateways" 警告 | 无开放 PR |
| **P1** | [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) | 5 周内 4 次 `state.db` 损坏（多写者 WAL） | 部分 — WAL 交接链路已落地（[#109841](https://github.com/NousResearch/hermes-agent/pull/109841)、[#110544](https://github.com/NousResearch/hermes-agent/pull/110544)）；惰性 flock 单写者闸门已在 [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) 关闭 |
| **P1** | [#91653](https://github.com/NousResearch/hermes-agent/issues/91653) | 失败的投递义务在所属进程存活期间从不重试 | 无开放 PR |
| **P1** | [#110920](https://github.com/NousResearch/hermes-agent/issues/110920) | profile 分发在更新时清空技能 | **有** — [#110933](https://github.com/NousResearch/hermes-agent/pull/110933)（合并而非删除） |
| **P1** | [#111010](https://github.com/NousResearch/hermes-agent/issues/111010) | gateway 启动时 cron 调度器守护线程静默死亡 | 无开放 PR |
| P2 | [#109966](https://github.com/NousResearch/hermes-agent/issues/109966) | WAL 交接阻塞每个新打开者（现已不可复现） | 已落地 |
| P2 | [#79649](https://github.com/NousResearch/hermes-agent/issues/79649) | npm 漏洞无法自动修复 | 无开放 PR |
| P2 | [#46771](https://github.com/NousResearch/hermes-agent/issues/46771) | Hermes 与新版 Qwen CLI OAuth（v0.18.1）不兼容 | 无开放 PR |
| P2 | [#110970](https://github.com/NousResearch/hermes-agent/issues/110970) | 托管 SSH 更新后连接永久暂停（Windows） | 无开放 PR |
| P2 | [#99631](https://github.com/NousResearch/hermes-agent/issues/99631) | `cron list` 在 profile 作用域 home 下误报 "Gateway not running" | 无开放 PR |
| P2 | [#96180](https://github.com/NousResearch/hermes-agent/issues/96180) | `hermes update` 重建 venv，丢弃可选 messaging extras → cron Telegram 失败 | 无开放 PR |
| P2 | [#110985](https://github.com/NousResearch/hermes-agent/issues/110985) | `/stop` 泄漏 turn lease，需重启才能恢复会话 | 无开放 PR |
| P2 | [#108564](https://github.com/NousResearch/hermes-agent/issues/108564) | Bot-mode DM 发送至 `default` profile 时解析进 `profiles/default/` | 无开放 PR |
| P2 | [#110961](https://github.com/NousResearch/hermes-agent/issues/110961) | `command_allowlist` 规则键失效 | 无开放 PR |
| P2 | [#111022 (auth)](https://github.com/NousResearch/hermes-agent/pull/111022) | token 撤销后 Codex 用量 401 | **有** — [#111022](https://github.com/NousResearch/hermes-agent/pull/111022) |
| P3 | [#99640](https://github.com/NousResearch/hermes-agent/issues/99640) | 插件 context-engine 克隆忽略 `clone_for_agent()` | 无开放 PR |
| P3 | [#110402](https://github.com/NousResearch/hermes-agent/issues/110402) | Hermes 忽略已加载的 skill 文件（skill 遵从性） | 无开放 PR |
| P3 | [#110996](https://github.com/NousResearch/hermes-agent/issues/110996) | 在被阻断的父卡片下创建的卡片无法认领 | 无开放 PR |
| P3 | [#111012](https://github.com/NousResearch/hermes-agent/issues/111012) | Langfuse SDK 插件：占位 API key 静默失败 | 无开放 PR |
| P3 | [#58425](https://github.com/NousResearch/hermes-agent/issues/58425) | 飞书批量 flush 错误以未处理循环异常形式抛出 | **部分** — 入站侧由 [#111040](https://github.com/NousResearch/hermes-agent/pull/111040) 修复；飞书 adapter 异常消费仍未解决 |
| P3 | [#110979](https://github.com/NousResearch/hermes-agent/issues/110979) | 短工具结果上完整的 `/steer` OOB 标记被误读为损坏 | 无开放 PR |
| P3 | [#50305](https://github.com/NousResearch/hermes-agent/issues/50305) | （功能项，见下文） | — |

**修复覆盖情况汇总：** 在活动集中的 7 个 P1 Bug 中，仅 2 个有开放修复 PR（技能被清空与 Codex 鉴权，后者为 P2）。其余 5 个 P1 —— 延迟重启警告、多写者下反复出现的 state.db 损坏、未恢复的投递义务、分发时技能被清空、以及 cron 静默死亡 —— 全部处于无在飞 PR 的开放状态。这是维护者一侧最大的缺口。

## 功能请求与路线图信号

**可能的 v0.21.4（或 v0.22）候选**（带维护者关注或接近合并质量的开放 PR）：
- [#111031](https://github.com/NousResearch/hermes-agent/pull/111031) — *跨面自动让位、可抢占会话租约*（`tui_gateway`）。高流量架构变更，跨多个组件标签（agent/gateway/tui），已标记会话状态与消息投递清扫器。
- [#111036](https://github.com/NousResearch/hermes-agent/pull/111036) — *针对持久化控制文件变更的可选审批闸门*。默认关闭；应对一类安全边界问题。
- [#111035](https://github.com/NousResearch/hermes-agent/pull/111035) — *后台任务软超时*。直接响应用户诉求；将当前约 10 分钟的硬终止替换为唤醒 agent 流程。
- [#110824](https://github.com/NousResearch/hermes-agent/pull/110824) — *可选的全量终端命令*，含密钥脱敏与 Slack 任务卡片进度。可在全局与按平台粒度配置。
- [#90964](https://github.com/NousResearch/hermes-agent/pull/90964) — *Discord 可配置 rich presence 活动*。
- [#111023](https://github.com/NousResearch/hermes-agent/pull/111023) — *使用操作系统默认应用打开文件*（桌面文件树 / 预览栏）。

**待分类的用户提交功能请求**（开放 issue，按近期纳入可能性排序）：

| Issue | 标题 | 预测 |
|---|---|---|
| [#110868](https://github.com/NousResearch/hermes-agent/issues/110868) | 用户 `AGENTS.md` 的触发式模块加载（缓存安全、LLM 前注入） | **高** — 回应具体痛点（129 KB 角色文件被静默截断），缓存安全框架契合既有 prompt-builder 模式 |
| [#67031](https://github.com/NousResearch/hermes-agent/issues/67031) | 在 `channel_overrides` 中支持按通道 `reasoning_effort` | **高** — 对既有 `channel_overrides` schema 的小型、范围明确的扩展，已获 👍 |
| [#110976](https://github.com/NousResearch/hermes-agent/issues/110976) | 通过信号 / 控制套接字暴露 MCP 重载（无需聊天消息） | **中** — 运营上重要，但触及 gateway 核心 |
| [#110662](https://github.com/NousResearch/hermes-agent/issues/110662) | 桌面附件存储遵循已配置的 profile 工作区 | **高** — 小修复，明显的 UX 提升，具备 profile 感知 |
| [#50305](https://github.com/NousResearch/hermes-agent/issues/50305) | 在终端 banner 显示剩余 OpenRouter 额度 | **中** — 纯增量 |
| [#110402](https://github.com/NousResearch/hermes-agent/issues/110402) | Hermes 忽略已加载的 skill 文件（skill 遵从性） | 对用户而言 **高**；归类为需要复现 |

**不在本窗口但相邻：** [#106460](https://github.com/NousResearch/hermes-agent/issues/106460)（Bot Mode 群组线程共享同一会话 —— 可挽救 PR #93580）属于 `from-pain-miner` 集群，且可能为 [#111031](https://github.com/NousResearch/hermes-agent/pull/111031) 中的跨面租约工作提供输入。

## 用户反馈摘要

**主要痛点（原话主题）：**

- *多进程部署下的

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-15

## 1. 今日概览

IronClaw 在过去 24 小时内呈现**中等偏维护、活动量偏低**的状态，有 1 个 issue 和 6 个 pull request 被更新。流水线以自动化依赖更新为主导（6 个活跃 PR 中有 4 个来自 Dependabot），符合一个健康但低节奏日子的特征。实质性工程关注点集中在单个 MCP 出站诊断修复上，而一份新发布的每日失败分类报告显示 `officeqa` 基准测试套件中存在一个 43 项任务的失败集群，主要归因于 `DeepSeek-V4-Flash` 的模型质量问题。未发布任何版本，整体互动指标（评论/反应）全部为零。

## 2. 版本发布

*过去 24 小时内无新版本发布。*

## 3. 项目进展

时间窗口内唯一已关闭/已合并的 PR 是一次常规的依赖更新，实际上已被后续更新取代：

- **[#8097](https://github.com/nearai/ironclaw/pull/8097) — 已关闭 (2026-09-13)**：`everything-else` 分组中 24 个 Rust 依赖的 Dependabot 批量更新（如 `uuid 1.24.0→1.26.0`）。未合并即被关闭，被更新的后续 PR 所取代。
- **[#8099](https://github.com/nearai/ironclaw/pull/8099) — 开放中 (2026-09-13)**：同一分组的后续批量更新，包含 25 项变更（`uuid 1.24.0→1.26.1`、`base64 0.22.1→0.23.1` 等），目前是该依赖通道的活跃候选。

今日无功能 PR 合并；流水线状态干净但节奏缓慢，未交付任何面向用户的功能。

## 4. 社区热议话题

互动量异常低迷：窗口期内**每条更新的评论和反应均为零**。实质上最具讨论价值的帖子，由于是唯一非依赖项的更新，是：

- **[#8100 — 每日 ironclaw 失败分类 — 2026-09-14](https://github.com/nearai/ironclaw/issues/8100)**（pranavraja99，2026-09-14 开启）：对各套件中的未通过任务进行分类，指出 `officeqa` 中的 43 项失败主要源自 `DeepSeek-V4-Flash` 导航行为产生的真实模型质量错误。

缺乏回复表明该 issue 可能作为内部/可观测性产物存在，而非社区讨论帖。潜在需求：对基准测试回归进行结构化、周期化的可视化，以便区分测试框架故障与模型质量问题。

## 5. Bug 与稳定性

| 严重程度 | 条目 | 状态 | 备注 |
|----------|------|--------|-------|
| 中 | [PR #8077 — fix(mcp): 对响应泄露诊断进行分类](https://github.com/nearai/ironclaw/pull/8077) | 开放中，更新于 2026-09-14 | 关闭 [#8009](https://github.com/nearai/ironclaw/issues/8009)。将 `response_leak_blocked` 哨兵集中至 `ironclaw_host_api::http`，并让 MCP 通道对其进行独立分类。修复了一个安全相关的正确性缺陷：宿主侧的泄露拦截可能与 MCP 可见的错误语义发生冲突。 |
| 低（可观测性） | [Issue #8100 — 失败分类](https://github.com/nearai/ironclaw/issues/8100) | 开放中 | 严格来说并非缺陷，但 `officeqa` 中的 43 项任务失败集群表明 `DeepSeek-V4-Flash` 模型在重导航任务上存在持续的稳定性问题。暂无关联修复 PR。 |

今日外部用户未报告任何崩溃或回归。MCP 修复是唯一的活跃纠错性变更，未附带任何风险标记。

## 6. 功能请求与路线图信号

24 小时窗口期内无明确的功能请求。但可推断出两个隐性的路线图信号：

1. **MCP 诊断加固（PR #8077）** — 将共享哨兵集中并为 MCP 重新引入可分类的错误原因，这一重构反映出对 MCP 集成层面的持续投入。合理的后续步骤：将同一模式扩展到其他出站通道，或为 MCP 工具响应添加结构化的错误原因。
2. **每日失败分类（Issue #8100）** — 存在一个周期化、自动化的失败分类 issue 系列，指向一个内部质量看板/报告流水线（关联 `nearai.github.io/benchmarks`）。一个合理的预测是：该分类在未来版本中可能被提升为 CI 门禁报告或发布阻塞检查。

## 7. 用户反馈摘要

24 小时数据窗口内实质上**没有终端用户反馈**：零评论、零反应，且唯一由人工撰写的 issue（#8100）读起来更像一条内部 QA 记录，而非用户上报的痛点。因此痛点与用例在本快照中无法直接观测。最接近的信号是依赖变更本身，它暗示下游消费者可能面临周期性的 lockfile 更新——这是快速演进的 Rust 代码库中常见的轻度摩擦点。

## 8. 待办关注

过去 24 小时内已更新但悬而未决、值得维护者关注的条目：

- **[PR #7834 — chore(deps): 更新 wasm 分组（4 项）](https://github.com/nearai/ironclaw/pull/7834)** — 创建于 **2026-08-23**，于 2026-09-13 刷新。约 3 周历史。标签为 `size: L`、`risk: medium`、`contributor: experienced`。涉及 `wasmtime`、`wasmtime-wasi`、`wit-component`、`wit-parser`。尺寸与风险标签叠加其陈旧度表明，该 PR 可能需要维护者审查或 rebase 后才能落地。
- **[PR #8077 — fix(mcp): 对响应泄露诊断进行分类](https://github.com/nearai/ironclaw/pull/8077)** — 自 2026-09-06 开放。关闭一个 issue（#8009），是当前唯一非依赖项的实质性变更；瓶颈在于缺少审查。
- **[PR #8078 — chore(deps): 更新 tokio-ecosystem 分组](https://github.com/nearai/ironclaw/pull/8078)** — 自 2026-09-06 与 #8077/#8079 同时开放；属于尚未收敛的同一 Dependabot 集群。
- **[PR #8079 — chore(deps): 更新 actions 分组（6 项）](https://github.com/nearai/ironclaw/pull/8079)** — 自 2026-09-06 开放；其中包含一次显著的 `actions/setup-node 4.0.2→7.0.0` 升级，属于主版本号跃迁，值得关注 CI 兼容性。

**项目健康度信号**：活动平稳但缺少新意。Dependabot 节奏健康（常规更新通常在发布后约 3 天内落地），但窗口期内缺少合并的实质性工作且社区互动为零，表明 IronClaw 正处于稳定化或内部测试框架迭代阶段，而非活跃的社区发布周期。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-15

## 1. 今日概览

QwenPaw (github.com/agentscope-ai/QwenPaw) 在过去 24 小时内呈现出**高强度的维护活跃度**，共有 45 个 issue 和 50 个 PR 被触达，但未发布新版本。开/关比例较为健康：45 个 issue 中有 14 个（31%）被关闭，50 个 PR 中有 11 个（22%）被合并/关闭。当前工作集中在三个主题：(1) **内存子系统稳定性**（向量库同步、ReMe/dream digest 交互、长时间运行的内存增长）；(2) **MCP/ACP 协议加固**（Java SDK 兼容性、权限选项解析、HTTP 错误封装）；(3) **Windows 桌面端与 Hub 的安全收紧**（本地 API 鉴权、审计日志、文件预览鉴权）。来自某位重度用户（xiaohushi512）的一系列关于模型配置丢失、会话丢失、工作区路径被重置的 UX 投诉是当前最显眼的终端用户痛点。

## 2. 版本发布

过去 24 小时无新版本发布。在当前活跃 issue/PR 中可见的最新版本线是 **v2.2.1 / v2.2.1-beta.2**（桌面端，Windows 与 macOS），它仍是当前这一波 Bug 修复的研发目标。

## 3. 项目进展

过去 24 小时有 11 个 PR 被合并/关闭（具体条目未全部出现在前 20 列表中）。推动代码库前进、值得关注的主要**未合并但活跃的 PR** 包括：

- **[#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637)** — *feat(qwenpaw-data): QwenPaw-Data 应用 0.3.0*：将 QPD 0.3 作为受管/外部分析引擎集成，并将 Data Console 嵌入为 PawApp 的主 UI。是一项重要的架构变更（新增一等公民的分析界面）。
- **[#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704)** — *feat(console): 将聊天文件抽屉移至右侧*：直接响应用户的功能请求 [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739)；重做了调整手柄与动画，并新增右侧指针拖拽的回归断言。
- **[#7750](https://github.com/agentscope-ai/QwenPaw/pull/7750)** — *feat(console): 在响应产物列表中展示 send_file_to_user 文件*：将已交付的文件显示在折叠的“已完成 N 步”分组之外。
- **[#7681](https://github.com/agentscope-ai/QwenPaw/pull/7681)** — *fix(console): 跨刷新持久化侧边栏折叠状态*：修复原先仅由 `useState` 持有、并被移动端视口副作用重置的状态。
- **[#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703)** — *feat(context): 改进视觉压缩*：按作用域压缩（历史、系统、工具 schema、工具结果）、稳定的图像批次、源文本召回、可读的压缩预设。
- **[#7752](https://github.com/agentscope-ai/QwenPaw/pull/7752)** — *fix(console): 让 vi 与 pt-BR 语言选择生效*：后端 `_VALID_LANGUAGES` 缺失所声明的七个语言中的两种。
- **[#7753](https://github.com/agentscope-ai/QwenPaw/pull/7753)** — *fix(skill): 将 make-skill 升级到 v2.1*：要求在创建草稿前由 `create_plan.py` 持久化 `plan_id`。
- **[#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)** — *fix(mcp): 在 discover 探针上识别 Java jsonRpcError 信封*：修复 [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728)。
- **[#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)** — *fix(mcp): 保留已解码的 HTTP 错误响应*：修复 [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716)。
- **[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)** — *fix(acp): 按协议类型选择权限选项*：修复 #7726 的根因。
- **[#7748](https://github.com/agentscope-ai/QwenPaw/pull/7748)** — *fix: 保留循环警告并修正预算与溢出恢复*：doom-loop 警告、预算读取、溢出重置。
- **[#7769](https://github.com/agentscope-ai/QwenPaw/pull/7769)** — *fix(desktop): 对原生宿主中的本地 API 请求进行鉴权*：业务处理器运行前需要进程级桌面会话。
- **[#7683](https://github.com/agentscope-ai/QwenPaw/pull/7683)** — *fix(hub): 审计登录尝试与被拒绝的运行时创建*。
- **[#7766](https://github.com/agentscope-ai/QwenPaw/pull/7766)** — *fix(hub): 对原生文件预览请求进行鉴权*。
- **[#7770](https://github.com/agentscope-ai/QwenPaw/pull/7770)** — *fix(pawport): 恢复 More 设置中缺失的 PawPort 条目*。
- **[#7763](https://github.com/agentscope-ai/QwenPaw/pull/7763)** — *fix(plugins): 处理目录响应读取失败*（修复 [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730)）。
- **[#7751](https://github.com/agentscope-ai/QwenPaw/pull/7751)** — *fix(docker): 统一应用 Python 运行时与桌面端*（Python 3.11 独立运行时，固定 OpenSSL 版本）。
- **[#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723)** — *fix(console): 当 stream_one 失败时抛出错误事件*。
- **[#7682](https://github.com/agentscope-ai/QwenPaw/pull/7682)** — *fix(console): 在 SettingsCenter 使用语义化 token*（[#7487](https://github.com/agentscope-ai/QwenPaw/issues/7487) 之后遗留的 21 处悬空 `var(--color*)` 引用）。
- **[#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211)** — *fix(runtime): 防止注入的上下文被持久化为用户聊天记录*。

## 4. 社区热议话题

**评论数/互动最多的 issue（过去 24 小时，前 6）：**

1. **[#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709)**（6 条评论）—— 定时任务输出被静默折叠到 `thinking`/步骤中，有时完全丢失。属于 v2.2.1 上的一项输出质量回退。
2. **[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)**（6 条评论）—— `spawn subAgent` 在 Windows 2.2.0 上无论超时设置如何都会超时。对该用户而言，核心的多智能体功能已不可用。
3. **[#7571](https://github.com/agentscope-ai/QwenPaw/issues/7577)**（6 条评论）—— 智能体“忘记”路径约束（A=源码，B=工作区，C=运行时）；在三个路径下都生成 TODO 文件，甚至在错误的部署路径下进行开发，从而导致覆盖。
4. **[#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660)**（4 条评论）—— 安装失败（仅提供截图；根因尚未明确）。
5. **[#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)**（4 条评论）—— 三条相互叠加的内存耗尽路径（无界流缓冲、keep-alive 实例堆叠、doom-loop gate 绕过）。作者提供了可控复现 + 最小修复。
6. **[#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715)**（4 条评论）—— arxiv.org 不可达时 ReMe `daily_paper` 定时任务静默失败；以“已完成但无返回内容”误导用户，而未抛出 `httpx.ConnectError`。

**浮现出的潜在需求：** 可靠的多智能体 spawn、**确定性的内存 + 路径约束**、透明的错误上报（不应出现静默的“已完成但无内容”），以及在小屏笔电上的**界面空间利用**（[#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739)）。

## 5. Bug 与稳定性

按严重程度排序（P0 = 生产环境数据丢失/OOM；P1 = 功能不可用；P2 = UX/数据完整性；P3 = 外观问题）。

| 严重度 | Issue | 组件 | 修复 PR / 状态 |
|---|---|---|---|
| **P0** | [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) — 后端内存在约 2 天内增长至 **20.7 GB** | 后端运行时 | 未关闭；相关 [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) 提供最小补丁 |
| **P0** | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — 三条叠加的内存耗尽路径，约 1 MB/s 增长 → OOM | 后端 / MCP keep-alive | 未关闭；已提供复现 + 最小修复 |
| **P0** | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — 插件重新部署 + 关机后**会话丢失**；**模型配置同时被清空** | Desktop Windows | 未关闭；用户反馈多次发生 |
| **P1** | [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — `spawn subAgent` 始终超时 | 多智能体运行时 | 未关闭 |
| **P1** | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) — 已配置的模型在会话中途“丢失”，需要重新选择 | Desktop 配置持久化 | 未关闭；根因可能与 #7724 相同 |
| **P1**

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目简报 — 2026-09-15

## 1. 今日概览

ZeroClaw 目前正处于以 v0.8.5 发布线为核心的活跃稳定化阶段，治理工作（RFC/ADR 流程）与缺陷修复速度并行推进。仓库的分诊吞吐状况健康：过去 24 小时内共处理 26 个 issue（20 个仍打开，6 个已关闭）和 50 个 PR（48 个仍打开，2 个已关闭），但**零个新版本发布**——这表明工作正在收拢整合，而非对外交付。工作重心明显偏向安全加固（provider 请求头、守护进程诊断、配置校验）、渠道使用体验（Telegram、Matrix、WhatsApp、XMPP），以及架构治理（RFC 投票简化、执行树预算、agent 生命周期协调）。项目整体健康状况看起来强劲但处于发布前夕：维护者有意推迟合并，以便在版本切出前先完成评审/后续事项的收尾。

## 2. 版本发布

**过去 24 小时内没有新版本发布。** v0.8.5 每周稳定化线（[Issue #9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)）仍是当前的活跃里程碑；需求准入已于 2026 年 8 月 4 日冻结，每周切版会直接交付已就绪的工作，而不必等待每个里程碑条目全部完成。

## 3. 项目进展

过去 24 小时内有两个 PR 转入关闭状态：

- **[PR #9678 — fix(config): harden Git shell policy arguments](https://github.com/zeroclaw-labs/zeroclaw/pull/9678)**（已关闭，`security:policy`，risk:high，size:XL）。该 PR 在策略边界对命令词进行统一规范化，使可执行文件白名单、Git 风险分类、环境变量赋值检查和工作区路径检查共享同一套对引号与转义敏感的表示。**是一项值得关注的安全相关关闭。**
- **[PR #10747 — refactor(channels): build every channel's transcription manager one way](https://github.com/zeroclaw-labs/zeroclaw/pull/10747)** 仍处于 OPEN 状态，但它是权威性的整合方案，一次性解决了横跨八个原生渠道、此前被先后逐个修复的四个同类缺陷（#9153、#10032、#10487、#10494）。

同一时间窗口内有六个 issue 关闭——全部属于缺陷类别：

- [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — OpenCode provider 缺少 `x-opencode-session` 头部（S1，已通过 #10604 修复）。
- [#10232](https://github.com/zeroclaw-labs/zeroclaw/issues/10232) — 守护进程诊断丢失了底层错误链。
- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — `knowledge.db_path` 的波浪号展开被当作全局替换执行（S2）。
- [#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324) — cron 手动触发在 agent 重命名场景下的 check-then-act 竞态（S2，安全）。
- [#10087](https://github.com/zeroclaw-labs/zeroclaw/issues/10087) — memory-postgres 测试在必需 CI 中运行。
- [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) — RPC `config/set` 跳过校验（#10320 的重复项）。

这批关闭项压倒性地属于**可观测性、校验与安全加固**，而非功能开发——与稳定化发布线的定位一致。

## 4. 社区热门话题

按评论数与反应数排序的最活跃讨论：

| 条目 | 类型 | 活跃度 | 为何重要 |
|------|------|----------|----------------|
| [Issue #8692 — Maintainer decision queue for RFCs and design issues](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 跟踪议题 | 15 条评论 | 治理工作名副其实的决策队列。整个项目的瓶颈——凡卡在这里的事项，就是项目层面被搁置的工作。 |
| [Issue #10549 — RFC: Simplify RFC voting](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) | RFC | 10 条评论 | 承认当前 RFC 流程存在摩擦——固定计时器“往往并不能带来更多评审”。与 [PR #10855](https://github.com/zeroclaw-labs/zeroclaw/pull/10855) 相互叠加关联。 |
| [Issue #10366 — RFC: Clarify PR review evidence & freshness warnings](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) | RFC | 8 条评论 | 新增快速合并通道和更严格的新鲜度规则。第 2 修订版日期为 2026-08-27——这是服务于快速推进 PR 的治理管道。 |
| [Issue #10603 — OpenCode providers never send x-opencode-session](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | 缺陷（S1） | 3 条评论、3 👍 | 本窗口内反应数最高的条目。OpenAI 账号被标记的风险催生了紧迫性——已随修复关闭。 |
| [Issue #10360 — RFC: opt-in household edge mesh](https://github.com/zeroclaw-labs/zeroclaw/issues/10360) | RFC | 4 条评论 | 无需额外购置 GPU 的跨主机算力共享。是明确的*用户拉动*信号——许多运营者手上有闲置硬件。 |
| [Issue #10625 — `[media attachment]` placeholder leaking](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | 缺陷（S2） | 3 条评论 | 直接影响用户体验：字面占位符在非视觉流程中直达最终用户。 |

深层信号：贡献者正用评论为**流程（RFC、合并通道）**投票，热情不亚于为代码投票——这表明项目正日趋成熟，治理滞后已开始取代技术评审成为主导因素。

## 5. 缺陷与稳定性

按严重程度排序（S1 优先），并标注修复进展：

| 严重程度 | 问题 | 组件 | 修复状态 |
|----------|-------|-----------|-----------|
| **S1** | [#10854 — Literal image marker promoted into malformed provider image](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) | provider | **尚无 PR**（今日新开，0 条评论） |
| **S1** | [#10807 — MCP connection permanently poisoned by one failed recovery](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | tools (MCP) | 尚无 PR |
| S1 | [#10603 — OpenCode `x-opencode-session` header missing](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) | provider | **已通过 #10604 关闭**；后续事项在 [#10853](https://github.com/zeroclaw-labs/zeroclaw/issues/10853) 中跟踪 |
| S2 | [#10625 — `[media attachment]` placeholder leaked to users](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | channel (Matrix) | 尚无 PR |
| S2 | [#10821 — `zeroclaw service logs` shows stale stderr](https://github.com/zeroclaw-labs/zeroclaw/issues/10821) | runtime/daemon | 尚无 PR |
| S2 | [#10842 — Telegram reaction tool silently no-ops](https://github.com/zeroclaw-labs/zeroclaw/issues/10842) | channel (Telegram) | 尚无 PR |
| S2 | [#10320 — `config set` / RPC persist values without validation](https://github.com/zeroclaw-labs/zeroclaw/issues/10320) | config / CLI / RPC | 部分修复已通过 #10837 落地；姊妹议题 [#10822](https://github.com/zeroclaw-labs/zeroclaw/issues/10822) 提出原子化的 `config/set-many` |
| S3 | [#10828 — `openai-codex --device-code` returns 404](https://github.com/zeroclaw-labs/zeroclaw/issues/10828) | gateway/api | 尚无 PR |
| S3 | [#10585 — log sink regression races migration tests](https://github.com/zeroclaw-labs/zeroclaw/issues/10585) | tooling/ci | 尚无 PR |
| S3 | [#10805 — control_plane liveness tests race on Windows](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) | tooling/ci | 尚无 PR |

**稳定性信号：** 24 小时内出现两个尚无关联 PR 的新 S1 缺陷——MCP 恢复污染和图像标记预处理。MCP 问题尤其令人担忧，因为它影响每一位使用上游工具服务器的用户。

## 6. 功能请求与路线图信号

用户驱动与维护者提出、且有较大概率落在 v0.8.6+ 的条目：

| 信号 | 条目 | 可能性 |
|--------|------|------------|
| 原生 XMPP/Prosody 渠道 | [#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) | 中——自托管家庭实验室社区持续呼吁；已有原生渠道先例（Matrix、Telegram、Discord），工程成本可控。 |
| 家庭边缘网格（跨主机算力共享） | [RFC #10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360) | 中——契合“本地优先、充分利用硬件”的理念；`risk:high` 与 `p3` 标签暗示将推迟到 v0.8.x 之后。 |
| 原子化 `config/set-many` RPC | [#10822](https://github.com/zeroclaw-labs/zeroclaw/issues/10822) | **高**——直接承接今天的 #10837 / #10320 关闭动作；已处于 `in-progress`。 |
| ZeroCode 显式会话根 | [#10826](https://github.com/zeroclaw-labs/zeroclaw/issues/10826) | 高——是最近合并的 #10565 的延续。 |
| WhatsApp PDF 内联预览（`jpegThumbnail`/`pageCount`） | [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) | 中——纯 UX 改进，无协议风险。 |
| Anthropic 拒绝响应 → 类型化回退通知 | [PR #9272](https://github.com/zeroclaw-labs/zeroclaw/pull/9272) | 中——自 2026-07-23 开启至今，等待评审。 |
| Telegram `multi_message` 流式模式 | [PR #8561](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) | 中——自 2026-06-30 开启至今，功能上已与 Discord/Matrix 对齐。 |
| 原生 Hailo-Ollama provider | [PR #9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) | 中——新增一类 provider。 |
| Matrix 语音回复（MSC3245） | [PR #10489](https://github.com/zeroclaw-labs/zeroclaw/pull/10489) | 中——补齐各渠道间的 TTS 对等能力。 |
| 执行树迭代预算 | [PR #10351](https://github.com/zeroclaw-labs/zeroclaw/pull/10351) | **高**——大型 PR，出自 distinguished-contributor，正处于积极评审中；属于核心运行时安全特性。 |
| agent 生命周期协调 | [PR #10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) | **高**——统一 RPC/gateway/channel/ACP 的变更权限。当前处于打开状态的最大单体架构 PR。 |

## 7. 用户反馈摘要

**满意度驱动因素**
- 活跃的治理（RFC、ADR、决策队列）为贡献者提供了可见的流程——多位维护者持有 "distinguished contributor" / "trusted contributor" / "principal contributor" 标签，表明贡献者晋升阶梯运转良好。
- 对 S1 条目的快速分诊（OpenCode 头部问题一天内修复）展现出对阻塞性问题的响应速度。

**今日暴露的痛点**
1. **藏在 trait 默认实现中的静默空操作。** [#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842)（Telegram 表情回应）和 [#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854)（图像标记提升）揭示了一个模式：继承来的默认实现既不报错，也不执行任何操作。用户希望失败时能更“响亮”。
2. **配置写入中的校验缺口。** 两个仍在打开的条目（#10320、#10837），再加上 [PR #10822 atomic-batch proposal](https://github.com/zeroclaw-labs/zeroclaw/issues/10822)，表明用户明确要求在写入面上提供**更强的不变量**——不仅是 GUI/CLI，还包括 RPC。
3. **多模态边界情况正渗入用户可见输出。** [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)（占位符泄漏）和 [#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854)（畸形图像提升）都是用户本不应看到的降级路径。
4. **Windows 及并行 runner 下的测试不稳定。** [#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585)、[#10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805)——贡献者若不重试，就无法让 PR 干净地通过 CI。
5. **硬件持有者对分布式算力的渴望。** RFC #10360 表明，爱好者/家庭实验室运营者感到受限于单主机算力上限。这是从用户评论中浮现的*用例*需求，而非维护者自上而下的推动。

## 8. 积压事项观察

重要度高但已停滞或正等待维护者行动的条目：

| 条目 | 开启时间 | 为何需要关注 |
|------|--------|------------------------|
| [PR #9272 — feat(anthropic): handle refusals with fallback notices](https://github.com/zeroclaw-labs/zeroclaw/pull/9272) | 2026-07-23（54 天） | XL 体量，评审中无人跟进；影响所有遇到 `stop_reason: refusal` 的 Anthropic 用户。 |
| [PR #8561 — feat(channels/telegram): add multi_message streaming mode](https://github.com/zeroclaw-labs/zeroclaw/pull/8561) | 2026-06-30（77 天） | 与 Discord/Matrix 长期存在的功能差距；虽未标记 `needs-author-action`，但维护者侧毫无动静。 |
| [PR #9451 — refactor(observability)!: retire dormant DORA telemetry](https://github.com/zeroclaw-labs/zeroclaw/pull/9451) | 2026-07-27 | 破坏性变更 PR（`!`）——需要维护者明确批准；目前处于闲置状态。 |
| [Issue #10320 — config set / RPC persist values without validation](https://github.com/zeroclaw-labs/zeroclaw/issues/10320) | 2026-08-24 | 尽管 #10837 已作为其部分修复关闭，但更大范围的功能工作（#10822）仍需维护者就 RPC 事务性给出方向。 |
| [Issue #10807 — MCP connection permanently poisoned by one failed recovery](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | 2026-09-12 | **S1 且无 PR**，也尚无明确的维护者评审。每一位 MCP 用户都暴露在风险之中。 |
| [Issue #10854 — Literal image marker promoted into malformed provider image](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) | 2026-09-14（今天） | S1，全新提交，零评论，无 PR——存在随时间推移被搁置的风险。 |
| [Issue #9814 — Native XMPP/Prosody channel](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) | 2026-08-07 | 已标记 `risk:high`，尽管用户需求明确，仍已等待维护者分诊超过 38 天。 |
| [Tracker #8692 — Maintainer decision queue](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | 2026-07-04 | 瓶颈中的瓶颈——15 条评论表明 RFC/设计提案的入队速度超过了消化速度。值得在下一次维护者同步会上专门提出。 |

**结论：** 仓库运转健康，但风险集中在三点：（a）两个尚无 PR 的打开状态 S1 缺陷； 维护者决策队列； 少量已等待评审超过一个月的 XL 大型 PR。无论切出 v0.8.5 版本还是开展一轮 v0.8.6 稳定化，都需要维护者在这三条线上投入专门时间。

---

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*