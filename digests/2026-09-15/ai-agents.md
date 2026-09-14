# OpenClaw 生态日报 2026-09-15

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-14 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目简报 — 2026-09-15

## 1. 今日概览

在本期简报之前的 24 小时内，OpenClaw 的活跃节奏异常之高：更新了 **500 个 issue** 和 **500 个 pull request**，其中 **191 个 issue 被关闭**，**212 个 PR 被合并/关闭**。活动重心是围绕近期 **2026.9.x 发布线**的救火工作，尤其是网关稳定性、更新/恢复可靠性以及会话状态回归。过去 24 小时内没有切出新版本，说明团队目前把问题分流和合并修复放在首位，而非发布新版本——这与“问题次版本发布后积极进行稳定化”的模式一致。P0 发布阻塞项、崩溃循环，再加上多个“钻石龙虾”/“铂金寄居蟹”优先级标签，表明项目正承受着不小的压力，但社区发现的 issue 源源不断，高质量 PR 的流入依然强劲。

## 2. 版本发布

*过去 24 小时内没有新版本发布。* issue 中被引用的最新带标签版本为 **2026.9.2、2026.9.3 和 2026.9.4**，每个版本都各自带来了一批后续回归问题（见下文“Bug 与稳定性”）。

## 3. 项目进展

今天有相当一大批 PR 落地或关闭，聚焦于稳定性、热重载正确性、插件加载器整洁性以及渠道适配器一致性：

- **[#148310](https://github.com/openclaw/openclaw/pull/148310)** — fix：命令 secret 门控在带引号的配置键上会跳过 env SecretRefs（关闭 [#148131](https://github.com/openclaw/openclaw/issues/148131)）。认证类修复；防止名为 `0` 的账户因环境凭据解析错误而收到 401。
- **[#148608](https://github.com/openclaw/openclaw/pull/148608)** — fix(worktrees)：避免在大型 ignored 树上清理失败（关闭 [#148599](https://github.com/openclaw/openclaw/issues/148599)）。Worktree 清理健壮性改进。
- **[#148606](https://github.com/openclaw/openclaw/openclaw/pull/148606)** — fix(memory)：在清理 watcher fixture 前先排空 agent 状态（维护者跟进）。
- **[#148581](https://github.com/openclaw/openclaw/pull/148581)** — fix(openai)：启用 codex 插件时 `gpt-5.4-nano` 被误判为不兼容（关闭 [#148559](https://github.com/openclaw/openclaw/issues/148559)）。
- **[#148463](https://github.com/openclaw/openclaw/pull/148463)** — improve(plugins)：跳过不必要的启动路径检查（性能优化，无行为变化）。
- **[#148499](https://github.com/openclaw/openclaw/pull/148499)** — fix：稳定化 config include revision 相关测试（仅涉及测试的修复，已关闭）。
- **[#148592](https://github.com/openclaw/openclaw/pull/148592)** — fix(gateway)：在 cron 调和仍在收敛时保持热重载存活。
- **[#146913](https://github.com/openclaw/openclaw/pull/146913)** — fix(gateway)：隔离延迟配置重载的上下文（取代 [#146368](https://github.com/openclaw/openclaw/pull/146368)）。
- **[#148607](https://github.com/openclaw/openclaw/pull/148607)** — fix：修复参与者缓存刷新抛出异常导致会话更新失败的问题。
- **[#148278](https://github.com/openclaw/openclaw/pull/148278)** — perf(memory)：在捕获会话准备阶段避免使用持久租约（已关闭）。
- **[#148577](https://github.com/openclaw/openclaw/pull/148577)** — perf(android)：减少 outbox 数据库读取（已关闭）。
- **[#147971](https://github.com/openclaw/openclaw/pull/147971)** — perf：编译已度量的嵌套工具校验。
- **[#147936](https://github.com/openclaw/openclaw/pull/147936)** — chore(ui)：刷新 control ui 的 locale。
- **[#148604](https://github.com/openclaw/openclaw/pull/148604)** — fix(update)：迁移后完成 2026.9.3 托管升级（修复 [#148454](https://github.com/openclaw/openclaw/issues/148454)）。

按活跃度排名的前 30 个 PR 中，今天约有 **10 个被关闭/合并**，其余正排队等待维护者评审。几个已关闭的 PR（如 [#148499](https://github.com/openclaw/openclaw/pull/148499)、[#148577](https://github.com/openclaw/openclaw/pull/148577)）属于低风险的日常维护性修复，说明合并管理健康有序。

## 4. 社区热议话题

过去 24 小时内讨论最热烈的话题集中在**会话状态完整性**与**文本路由正确性**上：

1. **[#25592 — Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592)**（40 条评论，🦞 钻石龙虾）。资历最老的头部 issue：内部叙述/错误文本被当作可见消息路由到 Slack/iMessage。这是真实的 UX/安全隐患，社区参与度很高。
2. **[#97616 — Unreaped hook/tool child processes leak as zombies](https://github.com/openclaw/openclaw/issues/97616)**（31 条评论，🦐 金虾）。长期存在的退化 bug，影响多种部署形态。
3. **[#88312 — 2026.5.27 Codex app-server turn-completion stall (regression)](https://github.com/openclaw/openclaw/issues/88312)**（22 条评论，已关闭，🐚 铂金寄居蟹，👍5）。属于“回归之上再回归”的追踪；此前已由 [#85107](https://github.com/openclaw/openclaw/pull/85107) 修复。
4. **[#119720 — Synchronous agent persistence blocks the Gateway event loop at scale](https://github.com/openclaw/openclaw/issues/119720)**（20 条评论，钻石龙虾）。高优先级性能 bug；部分修复已在 [#140231](https://github.com/openclaw/openclaw/pull/140231) 和 [#138984](https://github.com/openclaw/openclaw/pull/138984) 中落地。
5. **[#48788 — Centralized filename encoding utility for multi-encoding Content-Disposition](https://github.com/openclaw/openclaw/issues/48788)**（20 条评论）。源自 [#48578](https://github.com/openclaw/openclaw/pull/48578) 的架构性请求；社区希望为 Feishu/日文/韩文文件名提供一套像样的编码抽象。
6. **[#102175 — Embedded prompt cache breaks across boundaries](https://github.com/openclaw/openclaw/issues/102175)**（19 条评论，铂金寄居蟹）。长生命周期会话会静默失去 prompt 缓存复用；隐蔽的成本/正确性问题。
7. **[#144911 — MCP server init timeout crashes the Gateway](https://github.com/openclaw/openclaw/issues/144911)**（16 条评论，🦞 钻石龙虾）。近期的崩溃 bug；子进程清理中的一个未处理 rejection 会拖垮整个进程。

**社区背后的核心诉求：** 故障下的会话完整性、可预测的渠道路由、非 ASCII 地区的编码正确性，以及避免“单个进程卡死演变成全面崩溃”的场景。各 issue 反复指向同一个架构模式——异步清理路径抛出异常并拖垮网关。

## 5. Bug 与稳定性

按严重程度排序（P0 优先），筛选范围为仍开放或近期活跃的条目：

### P0 — 发布阻塞 / 崩溃

| Issue | 标题 | 备注 |
|---|---|---|
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | Windows 托管更新交接在 `LogonType InteractiveToken` 下停滞 | 开放中，🦪 银贝。更新流程始终无法完成；驱动进程死亡 → 被弃置。 |
| [#145252](https://github.com/openclaw/openclaw/issues/145252) | **[追踪] 2026.9.3 / 2026.9.4 更新与恢复可靠性** | 协调索引，P0，维护者。关联 PR：[#148604](https://github.com/openclaw/openclaw/pull/148604) 已解决其中一项。 |
| [#145510](https://github.com/openclaw/openclaw/issues/145510) | 更新失败：runtime-verification-failed（2026.9.3） | 开放中，🦪 银贝。阻塞用户升级。 |
| [#145072](https://github.com/openclaw/openclaw/issues/145072) | macOS npm 更新在“global install swap”环节失败 | **已关闭**，但时间较近。修复已落地；属更新流程的回归。 |
| [#123326](https://github.com/openclaw/openclaw/issues/123326) | 多代理 Codex 迁移使 Gateway 启动陷入崩溃循环 | 开放中，🦞 钻石龙虾。即使没有任何 sidecar，sidecar 检测逻辑也会崩溃。 |
| [#125333](https://github.com/openclaw/openclaw/openclaw/issues/125333) | `totalTokens` 在 2026.8.1-beta.2 上虚增 | 开放中，🦞 钻石龙虾。此前的修复 [#123065](https://github.com/openclaw/openclaw/pull/123065) 只覆盖了 `api === "cli"`；memory-flush 的 transcript 路径缺乏防护，计数只增不减。 |

### P1 — 高影响回归 / 崩溃循环 / 数据完整性

- **[#144911](https://github.com/openclaw/openclaw/issues/144911)** — MCP 初始化超时导致 Gateway 崩溃（未处理的 rejection）。钻石龙虾。
- **[#125570](https://github.com/openclaw/openclaw/issues/125570)** — Skill Workshop 的更新应用会静默覆盖线上技能描述，破坏路由。钻石龙虾，有数据丢失风险。
- **[#125764](https://github.com/openclaw/openclaw/openclaw/issues/125764)** — Telegram：外发消息一次失败即进入死信；高价值消息被静默丢失。钻石龙虾。
- **[#104719](https://github.com/openclaw/openclaw/issues/104719)** — memory-wiki 补充操作无视工具截止时间。钻石龙虾。
- **[#144809](https://github.com/openclaw/openclaw/issues/144809)** — `claude-cli`：长轮次丢失全部已生成的回复（“no active tool authority snapshot”）。金虾。
- **[#141252](https://github.com/openclaw/openclaw/issues/141252)** — 2026.9.2 回归：“Reply operation has no active tool authority snapshot”。今天**已关闭**（12 条评论）——修复似乎已落地。
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — 同步 agent 持久化在大规模场景下阻塞事件循环。部分修复已发布。
- **[#142336](https://github.com/openclaw/openclaw/issues/142336)** — 核心 `/dashboard` 遮蔽了 Telegram Mini App 启动器（2026.9.2+）。钻石龙虾，阻塞 UX。
- **[#145152](https://github.com/openclaw/openclaw/issues/145152)** — 卡死会话的恢复被强制按 abort 清除，按会话 id 释放回复通道（2026.7.1）。钻石龙虾。
- **[#144876](https://github.com/openclaw/openclaw/issues/144876)** — 基于工具的 dashboard 会话在长度定稿失败后可能静默结束。

### P2 — 值得关注的回归 / 行为类 bug

- **[#102175](https://github.com/openclaw/openclaw/issues/102175)** — 内嵌 prompt 缓存在边界处失效。
- **[#139710](https://github.com/openclaw/openclaw/issues/139710)** — 轮次中途的插件取代操作会杀掉 system-agent 轮次和 planner。
- **[#146004](https://github.com/openclaw/openclaw/issues/146004)** — 2026.9.3 上子代理完成时会触发多余的 dashboard 心跳。
- **[#99586](https://github.com/openclaw/openclaw/issues/99586)** — 运行时工具面在涉及网关的操作之后返回空 body（已关闭）。
- **[#84037](https://github.com/openclaw/openclaw/issues/84037)** — Codex app-server 稳态 CPU / 辅助进程开销。

**严重程度图景：** 围绕 **2026.9.3/9.4 更新流程**的 P0 问题群最为紧迫。若干 2026.9.x 的 issue 带有 `maturity:stable` + `impact:ux-release-blocker` 标签，说明团队认为在这些解决之前，最新版本尚不适合大规模推送。

## 6. 功能请求与路线图信号

今天出现的大多数功能请求属于中等优先级的增强项，而非路线图上的头条项目：

- **[#52640 — Persistent task-status surface for long-running channel turns](https://github.com/openclaw/openclaw/issues/52640)**（先做 Discord，之后再做通用抽象）。强烈的信号：用户想要一个单一权威的“我的 agent 现在到底在做什么”界面。
- **[#48788 — Centralized filename encoding utility](https://github.com/openclaw/openclaw/issues/48788)** — 很可能是实现亚太渠道全面可靠性的前置条件。
- **[#51028 — Sessions panel: sort by last meaningful activity](https://github.com/openclaw/openclaw/issues/51028)** — UX 打磨；与更广泛的“会话卫生”趋势相契合。
- **[#74077 — Slash command for per-chat preview streaming mode](https://github.com/openclaw/openclaw/issues/74077)**（已关闭但特性从未落地）——`/stream off|final|partial|progress|reset` 风格的操作体验。

**预示下个版本可能特性的 PR：**
- **[#148464 — Read GitHub issues, PRs, and commits beside chat](https://github.com/openclaw/openclaw/pull/148464)**（XL，P2）。Web UI 中的内联 GitHub 阅读器——一项重要的新能力。
- **[#148256 — Recover repository sessions without workers (Control UI)](https://github.com/openclaw/openclaw/pull/148256)**（P0）。UI 侧恢复路径。
- **[#142954 — Share the Gateway client with Wear OS](https://github.com/openclaw/openclaw/pull/142954)**（XL）。跨设备 Android 版图持续扩张。
- **[#112811 — Multi-account Microsoft Teams support](https://github.com/openclaw/openclaw/pull/112811)**（XL，P2）。长期诉求；将补齐与 Slack/Discord 之间的功能差距。
- **[#145792 — Time-range filters in sessions_search](https://github.com/openclaw/openclaw/pull/145792)**（P2）。搜索易用性改进。
- **[#83440 — CLI: resolve pending exec approvals](https://github.com/openclaw/openclaw/pull/83440)**（P2）。运维易用性；`openclaw approvals pending|resolve` 填补了真实空白。
- **[#87764 — Owner-scoped ClawHub skill refs](https://github.com/openclaw/openclaw/pull/87764)**（`@openclaw/demo` 风格）。技能分发基础设施。

**对下个次版本的预测（可能是 2026.9.5 / 2026.9.6）：**
- 所有仍开放的 P0 更新流程修复（[#146860](https://github.com/openclaw/openclaw/issues/146860)、[#145510](https://github.com/openclaw/openclaw/issues/145510)、[#145252](https://github.com/openclaw/openclaw/issues/145252) 追踪项，[#148604](https://github.com/openclaw/openclaw/pull/148604) 已在评审中）。
- MCP 初始化崩溃修复（[#144911](https://github.com/openclaw/openclaw/issues/144911)）。
- Skill Workshop 路由修复（[#125570](https://github.com/openclaw/openclaw/issues/125570)）。
- Telegram 死信重试（[#125764](https://github.com/openclaw/openclaw/issues/125764)）。
- Codex 多代理迁移崩溃循环（[#123326](https://github.com/openclaw/openclaw/issues/123326)）。
- `totalTokens` 棘轮问题的后续修复（[#125333](https://github.com/openclaw/openclaw/issues/125333)）。
- 可能新增内联 GitHub 阅读器（[#148464](https://github.com/openclaw/openclaw/pull/148464)）和 Control UI 会话恢复（[#148256](https://github.com/openclaw/openclaw/pull/148256)）作为特性。

## 7. 用户反馈总结

**满意度信号：**
- 维护者积极投入：`roboclaw-bot`、`openclaw-mantis[bot]` 和 `openclaw-barnacle[bot]` 等机器人账号在推送针对性 PR 并按日期清理 todo，显示出流程的成熟度。
- 社区对小众渠道的使用热情高涨（Feishu、Mattermost、MS Teams、Synology Chat、Tlon、Zalo、Nostr、Nextcloud Talk）——适配器生态覆盖广泛。
- 多条回归 issue 得到关闭，表明用户信任项目会及时修复 bug。

**痛点（反复出现的主题）：**
1. **更新可靠性**——多位用户报告升级*到*近期版本以及在近期版本*之间*升级时失败。这是当前最大的不满来源。
2. **静默的数据/功能丢失**——技能描述被覆盖、totalTokens 误计数导致错误压缩、prompt 缓存失效、Telegram 发送进入死信。用户一致将这些描述为没有任何报错浮现的“静默”失败。
3. **共享机器人中的跨租户污染**——反复有报告称同一 Telegram/Google Chat 机器人实例上的不同用户之间出现上下文/消息泄漏。
4. **单个子进程卡死即可拖垮整个网关**——多起崩溃循环被追溯到子进程清理路径中的未处理 rejection。
5. **长轮次的脆弱性**——`claude-cli` 和 Codex app-server 路径在数分钟后丢失回复；用户不得不手动干预。
6. **亚太渠道的疑难杂症**——Feishu 文件名编码、Feishu 卡片搜索索引以及中文语境相关的问题反复出现。
7. **技能路由的脆弱性**——以技能描述作为路由键（单一字符串匹配）十分脆弱。

**数据中可见的使用场景：** 多代理 Codex 迁移、付费订阅的内嵌 CLI 运行器（`claude-cli`、`codex`）、Docker-out-of-Docker 沙箱、SMB 挂载的 macOS 工作区、多机器人 MS Teams 集群，以及亚太消息平台。

## 8. 积压任务观察

评论/表情数量很高但近期没有修复动作的条目，提示可能存在维护者关注度缺口：

| 条目 | 存在时长 | 重要性 | 最近活动 |
|---|---|---|---|
| **[#25592 — Text between tool calls leaks to messaging channels](https://github.com/openclaw/openclaw/issues/25592)** | 自 2026-02-24 起开放，40 条评论，

---

---

## 横向生态对比

# 跨项目对比报告：个人 AI 助手 / 智能体开源生态
**日期：2026-09-15 | 范围：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw**

---

## 1. 生态系统概览

开源个人 AI 助手领域正在分化为明显不同的几类形态：渠道编排枢纽（OpenClaw）、桌面优先并具备集群管理能力的产品（Hermes Agent）、以记忆为核心的本地智能体（QwenPaw）、安全治理驱动的自托管运行时（ZeroClaw），以及安全强化的参考平台（IronClaw）。整体动态以**稳定化而非功能扩张**为主旋律 —— 五个项目中有四个正处于近期发布线的硬化阶段中段（OpenClaw 2026.9.x、Hermes v0.21.3、QwenPaw 2.2.x、ZeroClaw v0.8.5），且最高严重度的 Bug 集中在若干共享子系统中：MCP 互操作性、长生命周期会话状态、记忆生命周期、以及更新/迁移可靠性。一个值得关注的结构性信号：每个项目都在与**静默失败**缠斗 —— 进入死信队列的消息、空操作的工具调用、丢失的会话 —— 这表明该生态的下一个竞争前沿是可观测性与交付保证，而非单纯堆叠能力。与此同时，治理成熟度（RFC、ADR、自动分诊机器人、每日基准分类体系）正在成为预示项目寿命的领先指标。

---

## 2. 活跃度对比

| 项目 | Issues（24 小时） | PRs（24 小时） | 关闭率 | 发布状态 | 健康度评分* |
|---|---|---|---|---|---|
| **OpenClaw** | 500 条更新（191 条关闭） | 500 条更新（212 条合并/关闭） | 两者均约 40% | 无新版本；2026.9.2–9.4 处于密集修复期 | **7.0/10** —— 吞吐与修复速度极佳，但存在 P0 级更新可靠性集群以及反复出现的网关崩溃模式 |
| **Hermes Agent** | 50 条更新（18 条关闭） | 50 条更新（3 条合并） | Issues 36% | **v0.21.3 于 09-14 发布**（合并 ~338 个 PR） | **8.0/10** —— 节奏按计划推进，多路复用 Bug 当天即关闭；存在结构性测试缺口 |
| **QwenPaw** | 45 条（31 开放 / 14 关闭） | 50 条（39 开放 / 11 合并） | Issues 31%，PRs 22% | 无新版本；2.2.x 进行中 | **7.0/10** —— 势头良好且 MCP 分诊及时，但 3 个严重记忆 Bug 尚无修复 PR |
| **ZeroClaw** | 22 条（11 条新增 P1） | 50 条（12 条合并） | PRs 24% | 无新版本；v0.8.5 稳定分支 | **7.5/10** —— 安全合并批次协调一致，RFC/ADR 流程严谨；4 个新增 S1 加 XL PR 已积压 42–54 天 |
| **IronClaw** | 1 | 1 | 0 | 无发布 | **6.0/10** —— 稳定、无事故，但公开面几乎沉寂；唯一的 PR 已等待评审约 9 天 |

\* 健康度评分 = 基于 24 小时摘要的活动量、关闭速度、发布纪律与事故负载的加权综合分。OpenClaw 的 500/500 数字看上去是跟踪器的上报上限，即下限而非上限。

---

## 3. OpenClaw 的定位

**相对于同侪的优势：**
- **社区规模（约 10–20 倍）：** 日均触及 500 条 issues/PRs，对比 Tier-2 同侪的约 50 条；头部讨论帖可持续保持 40 条评论；适配器矩阵最为广泛（Slack、iMessage、Telegram、Discord、飞书、Mattermost、MS Teams、Synology Chat、Tlon、Zalo、Nostr、Nextcloud Talk） —— 形成一道同侪难以企及的渠道护城河。
- **修复速度：** 24 小时内合并/关闭 212 个 PR，并配套分诊机器人基础设施（`roboclaw-bot`、`openclaw-mantis[bot]`），其流程自动化水平只有 IronClaw 的基准自动化可与之比肩。
- **超越桌面的覆盖范围：** Wear OS 网关共享（#142954）、Android 发送队列优化、多账户 Teams（#112811）以及 ClawHub 技能分发市场（#87764） —— 这是唯一同时具备跨设备 + 市场化叙事能力的项目。

**相对于同侪的劣势：**
- **发布质量：** 2026.9.x 版本线尚不适合大规模铺开（P0 跟踪 issue #145252，标签 `impact:ux-release-blocker`）。同一周 Hermes 干净地交付了 ~338 个 PR 的滚动合并；ZeroClaw 则在显式风险标签与 ADR 之下完成合并。
- **架构脆弱性：** 反复出现的模式是异步清理路径拖垮整个网关（#144911、#123326）；技能路由仅依赖单一描述字符串（#125570）。IronClaw 的防泄漏宿主 API 展示了一种更具防御工程设计的出站边界。

**技术路线差异：** OpenClaw 端到端掌控托管更新路径（Windows `LogonType InteractiveToken` 交接、macOS npm 替换） —— 这是同侪普遍回避的一个面。它直接内嵌 provider CLI 运行器（`claude-cli`、`codex`），而 Hermes 抽象出 provider 分层，QwenPaw 则瞄准本地/量化模型。其网关中心的热重载设计以速度换取了目前正在暴露的崩溃循环风险。

---

## 4. 共同技术聚焦方向

| 浮现的需求 | 涉及项目 | 证据 |
|---|---|---|
| **MCP 互操作性与韧性** | OpenClaw、QwenPaw、IronClaw、ZeroClaw | OpenClaw #144911（初始化超时导致网关崩溃）；QwenPaw #7716/#7728（注册失败、Java SDK HTTP 帧 500 错误）；IronClaw PR #8077（出站泄漏原因码）；ZeroClaw #10603（OpenCode 会话头） |
| **长生命周期会话持久化与恢复** | 全部 5 个 | OpenClaw #145152/#141252（工具授权快照、卡死的会话）；Hermes #97681（28 条评论、跨设备群聊持久化）与 #109966（state.db WAL 交接）；QwenPaw #7708/#7724/#7745（配置/会话丢失）；ZeroClaw PR #10197（ACP 中断轮次持久化，已开 26 天） |
| **记忆生命周期与成本控制** | OpenClaw、Hermes、QwenPaw | QwenPaw #7222/#7722（无界增长至 20 GB+，三条叠加路径）；Hermes #111205（49 条重复事实 ≈ 每轮 98k token）；OpenClaw #104719/#125333（记忆 wiki 截止时间、token 计数棘轮） |
| **更新/迁移可靠性** | OpenClaw、Hermes | OpenClaw #146860/#145510/#145072（Windows/macOS/npm 升级失败）；Hermes #110850（多路复用 systemd 迁移杀掉网关），#111272（陈旧 `fleet_restart_pending` 标记） |
| **Prompt 缓存稳定性** | OpenClaw、ZeroClaw | OpenClaw #102175（跨会话边界缓存失效）；ZeroClaw #10858（`DateTimeSection` 在午夜使每个已缓存前缀失效） |
| **安全与信任边界** | 全部 5 个 | ZeroClaw（配对策略 #10307、代理路由 #10748、沙箱镜像 #10745）；Hermes（扫描器误报家族 #92478/#103364/#110974/#111193）；QwenPaw #7727（工作区外写入）、#7726（ACP `trusted:true` 回退）；IronClaw（泄漏拦截）；OpenClaw（共享机器人上的跨租户污染） |
| **后台/Cron 执行保证** | OpenClaw、Hermes、QwenPaw | Hermes #111010（cron 守护进程静默死亡）；QwenPaw #7709（定时任务的输出被折叠进"思考"）；OpenClaw #148592（热重载与 cron 的协调） |
| **子智能体委托可靠性** | OpenClaw、Hermes、QwenPaw | QwenPaw #7678（`spawn subAgent` 100% 超时）；Hermes PR #107316（子智能体仪表板）；OpenClaw #123326（多智能体 Codex 迁移崩溃循环） |

---

## 5. 差异化分析

| 维度 | OpenClaw | Hermes Agent | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **功能聚焦** | 多渠道编排、技能/插件、托管更新 | 桌面 UX、配置多路复用、集群运维、provider 分层 | 宿主安全强制、基准 QA 自动化 | 以记忆为核心的智能体（ReMe）、本地模型、数据分析 | 安全优先运行时、SOP、联邦化渠道 |
| **目标用户** | 运行消息矩阵的自托管者；亚太区渠道运营方 | 桌面重度用户、集群/托管云运营方 | 内部/研究工程师 | 本地优先及亚太区用户、数据分析工作流 | 注重隐私的家庭实验室/自托管运营方 |
| **架构** | 网关 + 渠道适配器 + 插件加载器；内嵌 provider CLI | 网关 + TUI + Desktop；SQLite WAL（`state.db`） | Rust 宿主 API（`ironclaw_host_api`），沙箱化通道 | Python 后端、向量库、记忆节点 | Rust 运行时 crate、Docker 沙箱、ZeroCode TUI |
| **治理** | 机器人驱动的分诊、优先级分类体系 | 发布列车节奏 | 每日自动失败分类体系 | 内联维护者分诊 | RFC/ADR 流程、风险标签、加速合并 RFC |

最鲜明的对比在于：**OpenClaw 优化的是广度**（渠道、设备、集成），并接受由此带来的集成面风险；**ZeroClaw 与 IronClaw 优化的是正确性与可控性**（出站过滤、SOP 细节、规约遵循）；**QwenPaw 是唯一把"记忆"本身做成产品核心的项目**；**Hermes 则是面向终端用户产品完成度最高的**（无障碍请求、桌面打磨、计费 UX）。

---

## 6. 社区势头与成熟度

- **Tier 1 —— 巨型规模、忙于救火：** **OpenClaw**。规模比同侪高一个数量级；当前处于发布后稳定化阶段（日关闭 191 条 issue）而非探索阶段。社区信任度高，但更新可靠性集群是其最大的信誉风险。
- **Tier 2 —— 高速度、结构化：**
  - **Hermes Agent** —— *稳定化中。* 按节奏发布 v0.21.3，随后单日内关闭 7 个多路复用 Bug；多路复用的铺开本应通过 feature flag 灰度更长时间，但响应速度堪称顶尖。
  - **ZeroClaw** —— *向 v0.8.5 稳定化推进中*，治理成熟度在群体中最高（RFC 改革以加速自身合并队列）。需关注：`risk:high` XL PR 已积压 42–54 天。
  - **QwenPaw** —— *快速迭代中。* 开放 PR 占比最高（39/50）；活跃的功能管线（QwenPaw-Data 0.3.0、make-skill v2.1、可视化压缩重写）。最薄弱点：三个严重记忆 Bug 尚无修复 PR。
- **Tier 3 —— 安静/良性：** **IronClaw**。公开活动屈指可数，但其每日基准分类体系（#8100、DeepSeek-V4-Flash 上 43 个未通过的 `officeqa` 任务）说明内部 QA 持续运作。这一模式更像是企业背书的、对外可见但非社区驱动的项目。

---

## 7. 趋势信号

1. **MCP 已成为承载性基础设施 —— 而互操作的接缝正在暴露。** 一天之内四个项目撞上 MCP 失败（初始化崩溃、HTTP 帧问题、Java SDK、头部规约）。*开发者启示：* 构建 MCP 规约一致性测试套件，并绝不让 MCP 初始化走上宿主关键路径。
2. **会话持久性是信任的前沿。** 跨项目来看，最牵动情绪的 issue 都在讨论会话/配置丢失与中断轮次（Hermes #97681 已 28 条评论；ZeroClaw 那个已开 26 天的持久化 PR）。*启示：* 将会话状态当作具备恢复语义的事务性数据，而非缓存。
3. **记忆是一颗成本炸弹，而不仅仅是特性。** 实测出的故障规模从 20 GB 的进程膨胀（QwenPaw）到每轮注入 98k token 的重复内容（Hermes）不等。*启示：* 记忆系统需要生命周期管理、去重与配额强制。
4. **Prompt 缓存稳定性是一根新近可见的成本杠杆。** 午夜时间戳重新渲染（ZeroClaw #10858）与跨边界失效（OpenClaw #102175）悄无声息地推高开销。*启示：* 设计缓存稳定的系统提示；对任何随时间变化的成分进行审计。
5. **安全工具的成熟速度跑在了其精确度前面。** Hermes 扫描器误报拦截了安全强化的插件（#111193），预示着即将出现的生态级难题：技能/插件的供应链扫描需要硬化白名单语义。
6. **静默失败是头号信任杀手。** Telegram 发送进入死信（OpenClaw #125764）、反应工具空操作（ZeroClaw #10842）、定时任务输出被折叠（QwenPaw #7709）、cron 悄无声息地死亡（Hermes #111010）。*启示：* 每一项异步操作都需要显式的投递回执或对用户可见的失败提示。
7. **治理复杂度预示项目走向。** ZeroClaw 的 RFC 改革与 IronClaw 的每日失败分类体系是群体中两项最具前瞻性的流程投入；预计其他项目会将自动化失败分类体系作为标准实践加以采纳。
8. **自托管/家庭实验室的需求具有持续性**（ZeroClaw 收到的 XMPP 请求、OpenClaw 上的 Synology/Nextcloud 适配器） —— 渠道广度与低资源联邦化仍是一片被低估的护城河。

---

*本报告基于 2026-09-15 社区摘要生成。健康度评分为本次群体内的相对值，反映单日快照；建议在做出投入决策前参考多周趋势。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-15

## 1. 今日概览

Hermes Agent 在 **v0.21.3** 补丁发布当天呈现出高强度的维护活跃度，50 个 issue 被更新（18 个已关闭），50 个 PR 被更新（3 个已合并/关闭）。当日主旋律是**围绕新版 profile-multiplex 功能的状态管理卫生** —— 绝大多数 bug 都源于对 session/状态隔离、profile 范围内的密钥以及 `state.db` 的 WAL 交接链处理不当。次要议题是 **`skills_guard` 与 `plugin-guard` 安全扫描器产生的误报**，它们会把正常的文档、散文以及经过安全加固的插件拦下来。整体活动强度很高，但补丁都精准且范围明确，说明这是一个成熟的稳定化周期，而非功能上的反复横跳。

## 2. 版本发布

**v2026.9.14 — Hermes Agent v0.21.3**（2026-09-14）
- 补丁版本，将自 v0.21.2 以来合并的约 **338 个 PR** 汇总为稳定 tag，便于下游消费者（Docker、Hermes Cloud、托管部署）使用。
- 官方给出的主要驱动因素：**远程网关登录修复**。
- 此次发布未附带公开的破坏性变更说明或迁移步骤。

🔗 [v0.21.3 Release](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.14)

## 3. 项目进展

过去 24 小时内仅落地/关闭了 3 个 PR，全部是**针对 skills/plugin 扫描器的误报修复** —— 对社区安装体验而言是一场干净利落的胜利：

- **#110978 — `fix(skills): ignore Markdown documentation traversal links`** *(closed)*。将 skill README 文件中普通的相对链接排除在路径遍历检测之外。[PR #110978](https://github.com/NousResearch/hermes-agent/pull/110978)
- **#110989 — `fix(skills): ignore path traversal in Markdown link destinations`** *(closed)*。配套修复，排除平衡的内联链接目标，并提升扫描器版本以使缓存中的误报失效。[PR #110989](https://github.com/NousResearch/hermes-agent/pull/110989)
- 加上另一个未在 Top-20 列表中展示的已合并/关闭 PR。

今日没有大型新功能推进。仍在进行中的重要工作（仍未关闭）包括：
- **#102765 — bundles & unified package manager**（open，needs-decision，ci-reviewed）。一项跨领域重构，引入 `pm/` 与 `pm/lock.json`，用于在 Windows/Docker/Desktop 上实现统一的安装、构建与更新器选择。[PR #102765](https://github.com/NousResearch/hermes-agent/pull/102765)
- **#107316 — dashboard: live view of running subagents in Chat sidebar**。在 Chat 侧边栏新增一个只读 Subagents 面板，通过现有的 `tui_gateway` 事件监听 `delegate_task` 子任务。[PR #107316](https://github.com/NousResearch/hermes-agent/pull/107316)
- **#110612 — Kanban: preserve task run provenance**（在执行时附带 session 与显式 model 选择）。[PR #110612](https://github.com/NousResearch/hermes-agent/pull/110612)

## 4. 社区热议话题

讨论最活跃的帖子揭示了用户群体真正关心什么：

1. **#97681 — Bot Group Chats should keep working after Desktop closes** *(28 条评论，👍1)*。迄今讨论最热的帖子。用户希望不同 gateway 上的 bot 能在群聊中协作，并且**在 Desktop 关闭后仍然存在** —— 即 session 所有权必须在不同设备与已授权的消息通道之间干净地转移。[Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681)
   - *底层诉求*：跨设备 session 连续性，以及 gateway 作为权威 session 持有方的语义。

2. **#109966 — `state.db` WAL hand-off during fleet restart blocks new openers for hours** *(12 条评论)*。报告者确认最初描述的失败链路在合并 #109841 与 #110544 后已不再复现，但该帖已成为 **state.db 生命周期讨论**的焦点。[Issue #109966](https://github.com/NousResearch/hermes-agent/issues/109966)
   - *底层诉求*：在 WAL/-shm 替换场景下可预测的 fleet 重启行为。

3. **#110769 — Streaming still hangs on agent-sized context after update to upstream main** *(7 条评论，P1)*。重开 #29418：agent 级别上下文仍会导致流式输出卡住。[Issue #110769](https://github.com/NousResearch/hermes-agent/issues/110769)
   - *底层诉求*：长上下文生产负载下的流式可靠性。

4. **#103483 — `muse-spark` turns end mid-task on `finish_reason=stop`** *(3 条评论，**👍7** —— 当日最高反应数)*。通过 opencode-go 的贡献者级用户看到流被截断为单个奇怪的结尾词。[Issue #103483](https://github.com/NousResearch/hermes-agent/issues/103483)
   - *底层诉求*：Responses 协议上 spark 级别模型的稳定完成语义。

## 5. 缺陷与稳定性

今日 P1/P2 缺陷密集，几乎全部集中在三个子系统中。按严重程度列出，并尽可能关联修复 PR。

### P1 — 关键的用户可见故障

| Issue | 组件 | 摘要 | 修复 PR |
|-------|------|------|---------|
| [#110850](https://github.com/NousResearch/hermes-agent/issues/110850) | cli, gateway | `gateway migrate --multiplex` 安装默认 systemd 单元时未带 `--run-as-user`，迁移中途崩溃，导致 gateway 死亡 | **closed**（未列出公开 PR） |
| [#111010](https://github.com/NousResearch/hermes-agent/issues/111010) | gateway, cron | Gateway 启动时 cron 调度器守护线程静默死亡 —— 没有任何任务触发 | open，无修复 PR |
| [#110769](https://github.com/NousResearch/hermes-agent/issues/110769) | agent, nous provider | Agent 级上下文下流式输出挂起（重开 #29418） | open，无修复 PR |

### P2 — 重要的回归问题，多与 profile-multiplex 相关

| Issue | 组件 | 摘要 | 修复 PR |
|-------|------|------|---------|
| [#109966](https://github.com/NousResearch/hermes-agent/issues/109966) | cli, gateway, cron | Fleet 重启过程中 `state.db` 的 WAL 交接链问题 | open —— 报告者指出已被 #109841/#110544 解决 |
| [#110695](https://github.com/NousResearch/hermes-agent/issues/110695) | gateway, tui, skills | `command.dispatch` 在 multiplex 下无法调用次级 profile 的 skills | **closed**（修复已落地） |
| [#110622](https://github.com/NousResearch/hermes-agent/issues/110622) | gateway, plugins, memory | Multiplex 下 OpenViking `on_session_end` 失败（`UnscopedSecretError`） | **closed** |
| [#110635](https://github.com/NousResearch/hermes-agent/issues/110635) | browser vault | Multiplex 启动 gateway 时 `check_fn` 抛出 `UnscopedSecretError`（#100697 的回归） | **closed** |
| [#110303](https://github.com/NousResearch/hermes-agent/issues/110303) | code-exec, desktop | Multiplex 下的 Desktop 中 `execute_code` 子进程拿到错误的 `HERMES_HOME` | **closed** |
| [#111228](https://github.com/NousResearch/hermes-agent/issues/111228) | gateway, desktop | #107498 之后 Desktop Preview 控件超时 | open（needs-repro） |
| [#111294](https://github.com/NousResearch/hermes-agent/issues/111294) | desktop | 工具结果后长时间只显示空白 indeterminate spinner —— 工具后压缩静默失效 | open |
| [#110630](https://github.com/NousResearch/hermes-agent/issues/110630) | agent, file | 命名 profile 下受保护指令门拦截了 ROOT 对自身文件的直接访问 | **closed** |
| [#110683](https://github.com/NousResearch/hermes-agent/issues/110683) | cli, config | 自动 multiplex 迁移的 opt-out 声明了 `gateway.auto_migrate` 但读取 `gateway.auto_multiplex_migration` | **closed** |
| [#111272](https://github.com/NousResearch/hermes-agent/issues/111272) | cli, gateway | 成功更新后遗留 `fleet_restart_pending` 标记 → 每次启动都误报警告 | open |
| [#110919](https://github.com/NousResearch/hermes-agent/issues/110919) | gateway, cron, discord | Discord 频道上的 Kanban `notify-subscribe` —— multiplex 下 notifier 无法投递的订阅 | **closed** |
| [#111017](https://github.com/NousResearch/hermes-agent/issues/111017) | agent, cli, openai | Codex 池化凭据忽略 `HERMES_CODEX_BASE_URL`；未映射的 `_getenv` 抛出 `NameError` | open |

### P3 / 扫描器误报（高频低风险）

一个明显的模式：**新的 `skills_guard` 与 `plugin-guard-v1` 扫描器在散文、文档以及安全加固插件上过度匹配。**
- [#92478](https://github.com/NousResearch/hermes-agent/issues/92478) — skill 自带的 denylist 字符串被打分为 ssh_backdoor / aws_dir_access → **closed**。
- [#103364](https://github.com/NousResearch/hermes-agent/issues/103364) — plugin-guard 对上下文隔离散文与裸 CLAUDE.md 引用的误报 → **closed**。
- [#110974](https://github.com/NousResearch/hermes-agent/issues/110974) — Markdown `../` 文档链接被归类为路径遍历 → **closed（经由 #110978、#110989）**。
- [#111193](https://github.com/NousResearch/hermes-agent/issues/111193) — 安装期扫描器将安全文档与对抗性测试标记为 critical，导致加固插件被拦截 → **closed**。

### 模式 / 项目健康度

multiplex 功能似乎在**发布时缺乏对 profile 范围内密钥、`HERMES_HOME` 传播以及命令分发的端到端覆盖**。今日多条不同的 bug 共享同一个根因：某个子系统假设了 `resolved_profile_scope`，而代码实际上是在 `gateway.multiplex_profiles: true` 下被调用的。这是一个结构性的测试缺口，而非一系列不相关的笔误。

## 6. 功能请求与路线图信号

从 issue 流中可观察到的具体用户请求：

- **#97681** — *Bot Group Chats 跨 Desktop 关闭后持续存在*（讨论量最高）。多 gateway bot 协作与跨设备 session 接管。[Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681)
- **#72485** — *Desktop 字体定制（如 OpenDyslexic）* **（今日已 CLOSED）**。面向阅读障碍/可读性的无障碍能力。[Issue #72485](https://github.com/NousResearch/hermes-agent/issues/72485)
- **#50799** — *Desktop 侧边栏应在首次 prompt 持久化前展示新创建的 gateway session*（自 6 月起仍开放）。[Issue #50799](https://github.com/NousResearch/hermes-agent/issues/50799)
- **#111117** — *Identity-kind vault fill 必须冻结绑定来源上的 vision/截图*。弥补 `browser_vault_fill` 未覆盖可视化界面的隐私漏洞。[Issue #111117](https://github.com/NousResearch/hermes-agent/issues/111117)

### 对下一版本的预测

- **Multiplex 可靠性补丁（很可能为 v0.21.4 或 v0.21.5）**：multiplex/state 缺陷簇（110695、110622、110635、110303、110630、110919、110683、111017）密度过大，不可能拖到 v0.22。预计将出现一次**集中化 `resolved_profile_scope` 语义的 profile-scope 重构**。
- **Scanner v2 升级**：今日合并的 PR 已将扫描器版本提升以使缓存失效（#110989）；预计会有更多规则细化以及一个可选的「安全加固插件」白名单。
- **Subagents dashboard 面板**（#107316）很可能在 v0.21.x 中合并 —— 这是一个聚焦的只读功能，UX 价值明确且不破坏现有接口。
- **Bundles & unified package manager**（#102765）规模较大，且标记为 `needs-decision` + `ci-reviewed`；在维护者层面设计签字之前不太可能落地。

## 7. 用户反馈摘要

- **强烈不满**：扫描器误报。三类不同用户受到影响 —— (a) 编写安全加固插件的插件作者（#111193），(b) 用 markdown 记录安全内容的插件作者（#110974），(c) 自家 denylist 被误报的 skill 作者（#92478）。每一项今日都已关闭，说明维护者对这类报告响应良好。
- **生产运维者反馈出真实成本**：#111205 测出**单个回合被注入 49 条重复事实（约 98k token）**，源自 memory 预取，意味着这是一次切实可计费/质量的回归。
- **Multiplex 已投产但仍显粗糙**：110695、110622、110635、110303、110630、110919、110683 全部**今日关闭**，说明维护者的关注点已切到这一子系统 —— 但这种数量说明它理应更长时间地保持 `feature-flagged`。
- **积极信号**：v0.21.3 汇总了约 338 个 PR，并干净地打 tag 以供下游 Docker/Cloud 使用。发布节奏与补丁纪律是健康的。
- **长尾问题中有热心的作者**（#103483，7 个 👍；#97681，28 条评论）昭示着**真实的产品缺口** —— `muse-spark` 上的流式完成 bug 与跨设备群聊持久化都有愿意验证修复的用户。

## 8. 待办观察

需要维护者关注、已老化或高参与度但未解决的事项：

- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — Bot Group Chats 持久化（28 条评论，创建于 2026-08-29，仍开放）。** 数据集中讨论最热的帖子。维护者需要就 gateway 作为 session 持有方的语义给出设计声明。
- **[#103483](https://github.com/NousResearch/hermes-agent/issues/103483) — `muse-spark` 在任务中途出现 `finish_reason=stop`（👍7，创建于 2026-09-05，仍开放）。** 反应数高且是贡献者层级的反复回归 —— 应优先分诊。
- **[#87248](https://github.com/NousResearch/hermes-agent/issues/87248) — Desktop 计费错误气泡在自动故障转移后仍然残留（创建于 2026-08-15，仍开放）。** 面向 UX 的 bug，对成功回合给出了错误的视觉表现。
- **[#52040](https://github.com/NousResearch/hermes-agent/issues/52040) — Dashboard tailscale 配置过于复杂（创建于 2026-06-24，仍开放）。** 反映的是文档/上手引导缺口而非代码 bug —— 报告者找到了一篇一页的教程，理应从 dashboard 配置流程中链接过去。
- **[#50799](https://github.com/NousResearch/hermes-agent/issues/50799) — Desktop 侧边栏应在首次 prompt 持久化前展示新创建的 gateway session（创建于 2026-06-22，仍开放）。** 小而真实的 UX 回归，约 3 个月未修复。
- **[#111205](https://github.com/NousResearch/hermes-agent/issues/111205) — Memory 预取每回合重复注入相同事实（49 条重复 / 约 98k token）**。具有生产影响的回归，鉴于测得的成本，应升级到 P3 以上。
- **[#111299](https://github.com/NousResearch/hermes-agent/issues/111299) — 原生 macOS 测试失败（relay traceparent、Hermes-home 权限）**。与 CI 相关，今日开单；很可能很快被认领。
- **[#37137](https://github.com/NousResearch/hermes-agent/pull/37137) — Termux `--` 分隔符用于 `setsid bash`（自 2026-06-02 开放）**。小但挂起已久的 Termux 兼容性修复，根因清晰 —— 应该是一行就能合的改动。

---

**整体健康度评估**：**稳定且在积极加固中。** v0.21.3 准时发布，

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目简报 — 2026-09-15

## 1. 今日概览

IronClaw 在 2026-09-15 的活跃度明显偏低，过去 24 小时内仅有一个 issue 被更新、一个 PR 被更新，且无新版本发布。唯一一个未关闭的 issue（#8100）是一份周期性的基准测试失败分类报告，而非新功能或缺陷报告，这表明维护者仍在持续投入对 agent 基准测试套件（例如 `officeqa`）的自动化质量监控。唯一一个未合并的 PR（#8077）针对 MCP 出站/诊断路径中一处精确且与安全相关的修复，提示团队仍在积极迭代 MCP 集成层。整体项目状态稳定但平静，当天没有合并、关闭或发版动作。

## 2. 版本发布

过去 24 小时内无新版本发布。本节按惯例省略。

## 3. 项目进展

过去 24 小时内无 PR 被合并或关闭。唯一被更新的 PR 仍处于 open 状态：

- **[PR #8077 — fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)**（open，作者 `linhongyu510`，更新于 2026-09-14）
  - 关闭 issue #8009。
  - 将共享的 `response_leak_blocked` 哨兵值集中到 `ironclaw_host_api::http`。
  - 让 MCP 通道将该哨兵值分类为一种独立的、对外可见的 MCP 原因。
  - 净效果：在不破坏安全不变量的前提下，强化了 MCP 响应中的宿主端泄漏拦截行为。尽管尚未合入，这代表了 MCP 出站诊断面上的渐进但有意义的进展。

## 4. 社区热点

所有跟踪项的社区互动信号（表情/评论）都极少：

- **[Issue #8100 — Daily ironclaw failure taxonomy — 2026-09-14](https://github.com/nearai/ironclaw/issues/8100)**（open，作者 `pranavraja99`，0 条评论，0 个 👍）
  - 这是一份自动化的每日基准测试失败报告。作者对各套件（例如 `officeqa`，43 个未通过任务，主要归因于 DeepSeek-V4-Flash 在导航任务上的真实模型质量问题）中的未通过任务进行分类。
  - 潜在需求：对 agent 在标准化基准上失败的位置提供系统化、逐日透明的信息，并建立结构化的分类体系以区分模型质量问题与基础设施/工具链故障。
- **[PR #8077 — fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)**（open，0 个 👍，无评论数）
  - 尽管可见的互动很少，但该主题本身（MCP 出站泄漏分类）具有隐含的高风险，因为它涉及宿主安全执行与 MCP 对外错误报告之间的边界。

## 5. 缺陷与稳定性

过去 24 小时内无新的缺陷报告、崩溃报告或回归问题被提交。与稳定性最相关的信号仍是那个未合并的 MCP 修复：

- **[PR #8077](https://github.com/nearai/ironclaw/pull/8077)** — 修复了 MCP 响应泄漏诊断中的分类缺口。这是一个防御性修复（在保留泄漏拦截的同时恢复 MCP 可见的原因码），而非引入新缺陷；严重程度可归为 **低到中**（属于正确性/诊断层面，而非崩溃或数据丢失），且对应的修复 PR 已就绪可合并。

## 6. 功能请求与路线图信号

过去 24 小时内没有明确的功能请求。但可以推断出两个与路线图相关的信号：

- **自动化基准测试失败分类（Issue [#8100](https://github.com/nearai/ironclaw/issues/8100)）** — 每日分类报告的存在表明仓库中正在浮现一种周期性的诊断产物模式。如果该节奏持续下去，可以预期在后续版本中出现用于对比每日分类、套件级仪表板或自动分诊重复失败模式的工具类需求。
- **MCP 诊断细化（PR [#8077](https://github.com/nearai/ironclaw/pull/8077)）** — 将 `response_leak_blocked` 集中到 `ironclaw_host_api::http` 的动作，暗示了对 MCP 出站错误语义的更长期整合，很可能是未来版本中更丰富的 MCP 错误码面世的前奏。

预测：下一个打标签的版本最有可能打包 MCP 诊断加固（#8077 工作的延续），以及可能源自基准测试分类分诊的改进，而非任何重磅新功能。

## 7. 用户反馈摘要

在过去 24 小时窗口内，直接的用户反馈（评论、表情、点赞/点踩）实际上为零——所有跟踪项均显示 0 表情和 0 评论。因此，从今日活动中无法提取具体的终端用户痛点、使用场景或满意度信号。最接近“用户”声音的代理指标是自动化基准测试分类报告的作者（`pranavraja99`），其报告指出了 `officeqa` 上真实且持续的模型质量失败（43 个未通过任务，主要是 DeepSeek-V4-Flash 的导航错误），这暗示下游用户在办公类工作流中仍可能遭遇导航质量方面的回退。

## 8. 待办事项观察

需要维护者关注的事项，按优先级排序：

1. **[PR #8077 — fix(mcp): classify response leak diagnostics](https://github.com/nearai/ironclaw/pull/8077)** — 自 2026-09-06 起 open，2026-09-14 最近一次更新，无评论/表情。PR 描述中已声明关闭 #8009，因此已是可审阅状态，是一个低风险的合并候选。建议维护者尽快审阅并合并，以清理 MCP 诊断的积压。
2. **[Issue #8100 — Daily ironclaw failure taxonomy — 2026-09-14](https://github.com/nearai/ironclaw/issues/8100)** — 很可能是一个周期性的自动化产物。维护者应考虑是否在分诊完成后自动关闭此类每日报告，或希望将其作为滚动记录长期保留。若选择后者，可采用统一的标签约定（例如 `taxonomy`、`automated`）以辅助分诊。
3. **关联但未直接出现：Issue #8009**（被 #8077 引用为 closed-by）。在 #8077 合入后值得核验 #8009 是否确实已关闭，以避免 issue 图中出现悬空引用。

整体待办事项状态良性：从 24 小时数据中未发现长期未回复的关键 issue，但那个唯一的 open PR 已等待审阅约 9 天，是今日最具可操作性的待办项。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目简报 — 2026-09-15

## 1. 今日概览

QwenPaw 展现出强劲的开发势头，**过去 24 小时内活跃 50 个 PR 和 45 个 issue**，但**未发布任何新版本**。活动明显倾向于未完成工作（39 个 PR 未合并 vs. 11 个已关闭，31 个 issue 未关闭 vs. 14 个已关闭），表明当前处于活跃的稳定化阶段而非发布冲刺阶段。issue 和 PR 的主题集中在**内存子系统可靠性**、**MCP/ACP 集成边界场景**、**控制台 UX 优化**，以及一个明显的**安全/鉴权加固 PR** 集群。整体项目健康度良好——社区参与度高（多个 issue 有 4–6 条评论），维护者正与 bug 报告同步落地针对性修复。

## 2. 版本发布

**过去 24 小时内无新版本发布。** 最近的活动集中在版本分支 `2.2.0`、`2.2.1` 和 `2.2.1-beta.2`，但未打出 tag。这与 2.2.x 系列的进行中稳定化阶段相符。

## 3. 项目进展

**已合并/已关闭活动（过去 24 小时）：** 11 个 PR 关闭 + 14 个 issue 关闭——具体修复和说明已落地。

推动项目前进的已关闭 PR/issue：

- **#4220（已关闭）** — *auto_memory_interval 写入 memory 文件但未同步向量索引*：bug 已确认并修复；直接改善了 auto-memory 流程。
- **#4354（已关闭）** — *大体积 Excel 文件被强制中断*：大文件读取路径已修复。
- **#4710（已关闭）** — *向量存储时间戳不一致*：`reme.MemoryNode` 中 naive 与 UTC datetime 不匹配问题已解决。
- **#5122（已关闭）** — *上下文压缩统计与实际 API 输入不匹配*：skills/MCP 上下文膨胀问题已解决。
- **#3995（已关闭）** — *增强型内存管理与召回*：增强提案已关闭（很可能已合入路线图）。
- **#7199（已关闭）** — *daily_paper `write_atomic` 在代理对（surrogate character）上崩溃*：PDF 文本编码边界场景已修复。
- **#7666（已关闭）** — *本地模型无法从 HF 下载 / 选择量化文件*。
- **#7594（已关闭）** — *任务重复执行 3 次* — 作为无效问题关闭（疑似用户侧重复触发）。
- **#3801（已关闭）** — *自适应上下文问题* 已关闭（已回复）。
- **#6840（已关闭）** — *ReMe4 路线图问题* 已答复。
- **#6222（已关闭）** — *MEMORY.md 与 Dream digest 定位* 已答复。
- **#4208（已关闭）** — *mem0 支持问题* 已关闭。

当前待审阅的开放 PR 预示了下一版本的进展方向：

- **#7637** — *QwenPaw-Data 0.3.0 集成* 作为托管式分析引擎（[PR](https://github.com/agentscope-ai/QwenPaw/pull/7637)）。
- **#7704** — *将聊天文件抽屉移至右侧*（[PR](https://github.com/agentscope-ai/QwenPaw/pull/7704)）。
- **#7753** — *make-skill v2.1* — 稳健的"先规划再起草"流水线（[PR](https://github.com/agentscope-ai/QwenPaw/pull/7753)）。
- **#7703** — *旧对话历史的可视化压缩重写*（[PR](https://github.com/agentscope-ai/QwenPaw/pull/7703)）。
- **#7732** — *按协议种类区分的 ACP 权限选项*（[PR](https://github.com/agentscope-ai/QwenPaw/pull/7732)）。

## 4. 社区热点话题

| 排名 | 条目 | 标题 | 评论数 |
|------|------|-------|--------|
| 1 | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | 定时任务经常无输出；结果被折叠进步骤/思考中 | 6 |
| 2 | [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | `spawn subAgent` 任务普遍超时失败 | 6 |
| 3 | [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) | Agent 在重启后会丢失路径约束 | 6 |
| 4 | [#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660) | 安装失败 | 4 |
| 5 | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 三条复合路径导致的内存耗尽 | 4 |
| 6 | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | arxiv.org 不可达时 Daily Paper 静默失败 | 4 |
| 7 | [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) | 长时间运行后端内存无限增长至 20 GB+ | 4 |
| 8 | [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739) | 在小屏幕上将历史侧栏移到右侧 | 4 |
| 9 | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | 配置的 LLM 在会话中途消失 | 4 |
| 10 | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | 对话丢失；LLM 配置也被清空 | 4 |

**浮现出的底层需求：**

- **对定时/自动化工作的信任**（#7709、#7678）—— 用户需要来自 cron/定时任务和子代理委派的确定性、可见输出。"结果折叠进思考中"这一模式表明 prompt/输出后处理需要保证对用户可见的交付。
- **状态持久化的耐久性**（#7708、#7724、#7745、#4220）—— 关于丢失模型配置、丢失会话、内存索引失同步的反复投诉表明持久层需要端到端一致性保证与更好的恢复机制。
- **路径/工作区纪律**（#7571、#7705、#7727）—— Agent 反复写到允许的工作区之外或错误的部署目标。用户希望得到沙箱 + 强制执行机制，而非仅仅靠提示。

## 5. Bug 与稳定性

按严重程度排序的今日报告或更新的 bug（🔴 高 / 🟠 中 / 🟡 低）：

| 严重程度 | Issue | 标题 | 修复 PR？ |
|----------|-------|-------|-----------|
| 🔴 高 | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 内存耗尽——三条复合路径（流缓冲、keep-alive 堆积、doom-loop gate） | 暂无 |
| 🔴 高 | [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) | 后端内存 2 天内增长到 20 GB+ | 暂无 |
| 🔴 高 | [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | `spawn subAgent` 普遍超时/失败 | 暂无 |
| 🟠 中 | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | 定时任务静默不产生用户可见输出 | 暂无 |
| 🟠 中 | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | 已配置模型在会话中途消失 | 暂无 |
| 🟠 中 | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | 中断后会话与模型配置同时丢失 | 暂无 |
| 🟠 中 | [#7745](https://github.com/agentscope-ai/QwenPaw/issues/7745) | 切换 Agent 删除 lastChatIdByAgent；历史记录无法点击（2.2.1-beta.2） | 暂无 |
| 🟠 中 | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | 自 2.2.x 起 MCP 无法连接/注册 | [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)（开放中，修复 HTTP 错误封装） |
| 🟠 中 | [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) | `server/discover` HTTP 500 vs. Java MCP SDK | [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)（开放中，修复 #7728） |
| 🟠 中 | [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) | 工作区外写入硬阻断对 kimi-code 无感知 | 暂无 |
| 🟠 中 | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) | ACP `trusted:true` 静默回退到提示 | [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)（开放中） |
| 🟠 中 | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | Daily Paper 静默失败——缺少代理/端点配置 | 暂无 |
| 🟠 中 | [#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660) | 安装失败 | 暂无 |
| 🟡 低 | [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) | Agent 工作目录回退到遗留路径 | 暂无 |
| 🟡 低 | [#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594) | 任务在不同时间重复执行 3 次 | 已关闭（无效） |

**修复覆盖度：** 三个中等严重度的 MCP/ACP bug 已有对应开放 PR（#7735 → #7716、#7729 → #7728、#7732 → #7726），表明对集成面正在进行集中分诊处理。三个最高严重度条目（内存耗尽、subAgent 超时）尚无公开修复 PR——这是需要持续关注的方向。

## 6. 功能请求与路线图信号

活跃的增强提案：

- **#7739** — *在小屏幕上将聊天历史移到右侧*（[issue](https://github.com/agentscope-ai/QwenPaw/issues/7739)）—— **极有可能进入下个版本**，与已开放 [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704)（将聊天文件抽屉移至右侧）配对。
- **#7746** — *Skills：按渠道的适用性清单*（[issue](https://github.com/agentscope-ai/QwenPaw/issues/7746)）—— 可能在 2.3.x 范围；涉及渠道 + skills 跨切面配置。
- **#3995** — *增强型内存管理与召回（生命周期、冲突检测）* — 已关闭但预计将为 ReMe 路线图提供输入。
- **#6840** — *ReMe4 路线图问题（Auto-Link、三模态搜索、4 类摘要权重）* — 指向多模态召回的方向性信号。
- **#7637** — *QwenPaw-Data 0.3.0 集成*（[PR](https://github.com/agentscope-ai/QwenPaw/pull/7637)）—— 可能在下个次要版本中作为托管分析引擎落地。
- **#7753** — *make-skill v2.1*（[PR](https://github.com/agentscope-ai/QwenPaw/pull/7753)）—— 为 skill 编写提供稳健的"先规划再起草"流程。
- **#7703** — *可视化压缩重写*（[PR](https://github.com/agentscope-ai/QwenPaw/pull/7703)）—— 应对 #5122/#3801 系列的上下文压缩关切。

**预测的下个版本范围（可能是 2.2.2 补丁或 2.3.0 次要版本）：** 右侧聊天文件抽屉、ACP 权限加固、MCP Java-SDK 兼容性、侧栏折叠状态持久化、vi/pt-BR 本地化修复，以及 Docker ↔ 桌面端 Python 运行时对齐（[#7751](https://github.com/agentscope-ai/QwenPaw/pull/7751)）。

## 7. 用户反馈摘要

**痛点（提炼自今日 issue）：**

1. **状态丢失焦虑。** 多位用户（xiaohushi512、yuzhuliu226-ctrl）报告在重启、Agent 切换、关闭后丢失模型配置与整个会话。这正在侵蚀用户对长时间运行工作的信任。
2. **定时/集成功能中的静默失败。** Daily Paper（#7715）和定时任务（#7709）失败时未暴露真实原因；用户描述"无输出"和"折叠进思考中"是反复出现的现象。
3. **Agent 路径纪律。** 插件开发者（#7571）报告 Agent 在 source/runtime/backup 路径之间互换写入，有时通过自动部署脚本覆盖生产代码——这是超出内存问题之外的具体安全问题。
4. **子代理委派不可靠。** #7678 报告 `spawn subAgent` 失败率 100%，即使设置很长的超时也一样。
5. **MCP 生态回归。** 升级到 2.1.1b3 → 2.2.x 的用户丢失了 MCP 连接（#7716），特别影响 Java SDK 服务端（#7728）。
6. **小屏幕上的 UX 密度。** 14 寸笔记本上的侧栏 + 历史记录 + 文件抽屉不滚动就难以使用（#7739 → #7704 已在推进）。
7. **满意度信号：** PR #7704（右侧抽屉）、#7681（侧栏持久化）、#7682（语义 token）、#7752（i18n 修复）表明维护者正在积极响应小屏幕与本地化的投诉。

## 8. 待办关注清单

需要维护者关注的 issue 与 PR（陈旧或高影响但无修复）：

- **[#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) — 长时间运行内存增长至 20 GB+** — 自 2026-08-23 起开放，无关联修复 PR；**#7722 明确指出三条复合路径**并提供了最小修复提案，但仍无 PR。这是待办风险的头号项。
- **[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — `spawn subAgent` 普遍超时** — 开放中，无修复 PR，6 条评论。影响核心委派原语。
- **[#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) + [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — Windows 桌面上模型/会话丢失** — 多份报告，无诊断 PR，无

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目日报 — 2026-09-15

## 1. 今日概览

ZeroClaw 开发节奏很快，过去 24 小时内触及了 22 个 issue 和 50 个 PR，但没有发布新版本。已关闭的 12 个 PR 形成了一组连贯的安全加固（更强的配对码、通道代理路由、可配置的 Docker 沙箱镜像）、多模态修复（图片大小默认值提升到 20 MiB、图片标记 MIME 校验）以及重构（在 8 个通道间统一转写管理器）。新打开的 11 个 P1 项主要集中在 Telegram 可靠性、视觉能力路由和提示词缓存失效方面，说明团队正在积极分诊后期上报的边缘场景。项目整体健康，正在向 [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 中追踪的 v0.8.5 稳定化目标收敛。

## 2. 版本发布

过去 24 小时内无新版本发布。当前的开发重心是 v0.8.5 有限周期的稳定化线（里程碑目标：2026-08-30，需求冻结：2026-08-04）。

## 3. 项目进展

过去 24 小时内合并/关闭的 PR：

| PR | 标题 | 影响 |
|---|---|---|
| [#10307](https://github.com/zeroclaw-labs/zeroclaw/pull/10307) | fix(gateway): one shared pairing-code policy, stronger default | 安全：使用可配置的共享策略替换原先的 6 位 `{:06}` 配对码生成器（关闭 [#6613](https://github.com/zeroclaw-labs/zeroclaw/issues/6613)） |
| [#10748](https://github.com/zeroclaw-labs/zeroclaw/pull/10748) | fix(channels): route every outbound HTTP client through the runtime proxy | 在剩余通道上关闭代理策略绕过问题 |
| [#10747](https://github.com/zeroclaw-labs/zeroclaw/pull/10747) | refactor(channels): build every channel's transcription manager one way | 移除了 8 份已偏离的 `with_transcription` 副本；根除了 [#9153](https://github.com/zeroclaw-labs/zeroclaw/issues/9153)、[#10032](https://github.com/zeroclaw-labs/zeroclaw/issues/10032)、[#10487](https://github.com/zeroclaw-labs/zeroclaw/issues/10487)、[#10494](https://github.com/zeroclaw-labs/zeroclaw/issues/10494) 的根本原因 |
| [#10745](https://github.com/zeroclaw-labs/zeroclaw/pull/10745) | feat(security): make the docker sandbox image configurable | 弥合了 `[security.sandbox].image` 的文档/行为差距 |
| [#10589](https://github.com/zeroclaw-labs/zeroclaw/pull/10589) | feat(config): default `multimodal.max_image_size_mb` to 20 MiB | 将默认值与文档上限对齐（关闭 [#10588](https://github.com/zeroclaw-labs/zeroclaw/issues/10588)） |
| [#9930](https://github.com/zeroclaw-labs/zeroclaw/pull/9930) | feat(rpc): add `sops/run-detail` returning full step results | 第二轮修复；信任边界缺口已关闭 |
| [#10727](https://github.com/zeroclaw-labs/zeroclaw/pull/10727) | ci(release): compose X/Discord announcements from release notes | 修正了按字母排序 `feat:` 产生混乱发布内容的问题 |
| [#10582](https://github.com/zeroclaw-labs/zeroclaw/pull/10582) | fix(runtime): decide attachment image markers by provider-loadable contract | 防止不支持的 MIME（svg、bmp）被提升为 provider 图片 |
| [#10562](https://github.com/zeroclaw-labs/zeroclaw/pull/10562) | docs(adr): define holding-crate exception process | 弥合 `zeroclaw-runtime/AGENTS.md` 中的文档缺口 |
| [#10543](https://github.com/zeroclaw-labs/zeroclaw/pull/10543) | chore(zerocode): drop dead `sop-authoring` feature | 清理工作；不涉及功能代码 |
| [#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585)（已关闭 issue） | new log sink regression races migration tests | 追溯到 [#10203](https://github.com/zeroclaw-labs/zeroclaw/pull/10203) 中 `WRITER_TEST_LOCK` / `HOOK_TEST_LOCK` 的交互 |
| [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794)（已关闭 issue） | Advisory Windows nextest publish-contract failure | 已应用文档化的例外处理 |

总体效果：这一天以安全和一致性为重点，关闭了一批长期存在的横切性问题。

## 4. 社区热议话题

讨论量主要由**流程改革 RFC**主导：

- **[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC: 简化 RFC 投票（10 条评论）。** 提议取消固定的 48h/72h 讨论窗口，让 `REVISE` 能够暂停当前快照。反摩擦论点：计时器很少带来更多评审。社区信号：截至目前点赞数为 0，但话题活跃度很高。
- **[#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — RFC: 明确 PR 评审证据、时效性告警、作者职责边界（8 条评论）。** 第二版新增了"快速合并通道"，条件是：获得一位 Core 审批、CI 绿、无未解决发现项。标记为 `risk:high`；面向维护者评审队列。

两者的共同诉求：项目已超出原有共识机制的承载能力，正在寻求不损失评审质量的前提下加快节奏。

其他值得关注的动态：
- **[#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)（已关闭，👍 3）** — OpenCode 缺少 `x-opencode-session` 头部，可能导致 Go 模型失败和账号标记。今日最高点赞数；修复已通过后续文档任务 [#10853](https://github.com/zeroclaw-labs/zeroclaw/issues/10853) 落地。
- **[#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)** — ACP 中断回合持久化（XL，需要维护者评审）是 PR 侧开放时间最长的讨论。
- **[#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753)** — 风险画像中 `allowed_tools` 缺失与为空的区分（XL，需要维护者评审）仍然是最具影响力的未解决安全 PR。

## 5. Bug 与稳定性

新打开的 P1/S1 Bug（除非特别说明，严重程度均为 S1"工作流受阻"）：

| Issue | 严重程度 | 组件 | 修复状态 |
|---|---|---|---|
| [#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863) | P1 | Telegram 通道 | 打开；在 PR [#10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) 中被引用；重试无限期拒绝语音更新，阻塞长轮询队列 |
| [#10857](https://github.com/zeroclaw-labs/zeroclaw/issues/10857) | P1 | ZeroCode + provider | 打开；ZeroCode 向仅文本会话发送图片，provider 返回 400 |
| [#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) | P1 | Anthropic provider | 打开（进行中）；工具输出 `[IMAGE:...]` 标记被自动提升为畸形的 provider 图片 |
| [#10858](https://github.com/zeroclaw-labs/zeroclaw/issues/10858) | P1 | agent prompt | 打开（进行中）；`DateTimeSection` 在系统提示首位导致每个会话在午夜时分缓存前缀全部失效 |

新打开的 P2/S2 Bug：

| Issue | 严重程度 | 组件 | 备注 |
|---|---|---|---|
| [#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842) | P2 | Telegram | 打开（进行中）；`reaction` 工具在默认 trait stub 下静默无效 |
| [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | P2 | channel/Matrix | 打开；在非视觉模型上字面量 `[media attachment]` 占位符泄露给用户 |

今日关闭/已分诊：
- [#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585)（P2，log sink 回退）— 已关闭。
- [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796)（P3，ZeroCode TUI 中 Delete 键被忽略）— 已关闭。
- [#10232](https://github.com/zeroclaw-labs/zeroclaw/issues/10232)（P2，守护进程丢弃错误原因链）— 已关闭；修复已纳入 supervisor 路径。

按严重程度加权的判断：24 小时内新增 4 个 S1 项属于较高水平；全部与视觉/多模态附件路由和缓存失效相关。S1 集群目前还没有修复 PR。

## 6. 功能请求与路线图信号

仍在开放中的增强/提案：

- **[#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) — 原生 XMPP / Prosody 通道。** 自托管/家庭实验室使用场景。与现有的 Matrix/Telegram/Discord 通道模式一致，可能是 v0.9.x 稳定化后的候选。
- **[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC: 更简单的投票流程。** 若通过，将实质性地缩短 RFC 周期并间接加速功能交付。
- **[#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — RFC: 快速合并通道。** 同一系列；面向 PR 队列吞吐。

今日关闭的增强（已落地的功能）：
- [#10588](https://github.com/zeroclaw-labs/zeroclaw/issues/10588) → [#10589](https://github.com/zeroclaw-labs/zeroclaw/pull/10589)：20 MiB 图片默认值。
- [#10307](https://github.com/zeroclaw-labs/zeroclaw/pull/10307)：共享、可配置的配对码策略。
- [#10745](https://github.com/zeroclaw-labs/zeroclaw/pull/10745)：可配置的 Docker 沙箱镜像。
- [#10336](https://github.com/zeroclaw-labs/zeroclaw/issues/10336)：AnySearch 内置 provider 提案 — 已关闭（数据中状态未明确，可能被延期或驳回）。

**下个次要版本（v0.8.5 切割或 v0.8.6）的预测：** Telegram 可靠性修复（#[10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863)、#[10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842)）是当前优先级最高的剩余项，很可能在下一次稳定化版本中发布。XMPP [#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814) 有可能，但取决于是否有维护者牵头。

## 7. 用户反馈摘要

通过 Bug 报告反映的真实痛点：

- **多模态路由不一致** 占主导。使用仅文本模型的用户看到 `[media attachment]` 占位符泄露到聊天中（[#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)）；5 到 20 MiB 之间的图片被静默丢弃（已在 [#10589](https://github.com/zeroclaw-labs/zeroclaw/pull/10589) 中修复）；工具输出 `[IMAGE:...]` 标记被自动提升，即便并非有意为之（[#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854)）。反复的修复表明多模态子系统仍然缺乏统一的负责人或契约。
- **Telegram 可靠性回退** 在持续累积。Reaction 工具静默无效（[#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842)）和无限期语音更新重试循环（[#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863)）表明该通道的错误恢复路径测试不足。
- **午夜时分的提示词缓存失效**（[#10858](https://github.com/zeroclaw-labs/zeroclaw/issues/10858)）是一个成本/体验问题：`DateTimeSection` 重新渲染时，所有打开会话的缓存前缀都会失效。
- **自托管运营者对 XMPP 的需求**（[#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814)）印证了对低资源、联邦式聊天后端的反复请求。
- **ZeroCode TUI 的打磨** — Delete 键 Bug（[#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796)）和 TUI 死代码（[#10120](https://github.com/zeroclaw-labs/zeroclaw/pull/10120)）表明 CLI 界面正在被积极使用和测试。

满意度信号：代理路由修复（[#10748](https://github.com/zeroclaw-labs/zeroclaw/pull/10748)）和统一转写管理器（[#10747](https://github.com/zeroclaw-labs/zeroclaw/pull/10747)）表明项目对反复出现的跨通道痛点是响应的。不满信号：一天内同时出现 4 个 S1 视觉路由 Bug，指向结构性缺口。

## 8. 待办事项观察

需要维护者关注的项，按"年龄 × 优先级 × 风险"排序：

| 项 | 年龄 | 状态 | 重要性原因 |
|---|---|---|---|
| [#9753](https://github.com/zeroclaw-labs/zeroclaw/pull/9753) PR — `risk-profile.allowed_tools` 缺失与为空 | 42d | 打开，XL，`risk:high`，需要维护者评审 | 安全模式边缘情况；维护者已重写描述；仍未合并 |
| [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) PR — ACP 中断回合持久化 | 26d | 打开，XL，`risk:high`，需要维护者评审 | 中断时用户可见的数据丢失 |
| [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381) PR — 主机启动器在 workspace cwd 之前解析 | 19d | 打开，XL，`risk:high`，需要维护者评审 | 沙箱/shell 工具逃逸面 |
| [#9272](https://github.com/zeroclaw-labs/zeroclaw/pull/9272) PR — Anthropic 拒绝回退提示 | 54d | 打开，XL，`risk:medium` | Provider 正确性；最老的未关闭 XL PR |
| [#10853](https://github.com/zeroclaw-labs/zeroclaw/issues/10853) — OpenCode 头部后续工作（3 项） | 1d | 打开，`needs-maintainer-review`，`follow-up` | 最近的安全修复仍有未完成的清理 |
| [#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863) — Telegram 语音重试循环 | 1d | 打开，P1，S1 | 生产事故，在 [#10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) 中上报 |
| [#10857](https://github.com/zeroclaw-labs/zeroclaw/issues/10857) — ZeroCode 向仅文本模型发送图片 | 1d | 打开，P1，S1 | 主路径上 Provider 返回 400 |
| [#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) — 工具输出图片标记注入 | 1d | 打开，P1，S1（进行中） | 可能存在 provider 误用 |
| [#9971

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*