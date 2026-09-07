# OpenClaw 生态日报 2026-09-07

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-07 01:51 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目简报 — 2026-09-07

## 1. 今日概览

OpenClaw 在 2026-09-07 处于活跃但**紧张**的开发周期中，问题追踪器和拉取请求队列均有大量变更：过去 24 小时内有 500 个 issue 被触及（375 个仍处于打开状态，125 个已关闭），500 个 PR 被触及（310 个打开，190 个合并/关闭）。**24 小时窗口内未发布新版本**，但 P0/P1 活动的规模——特别是围绕 2026.9.x 版本线、Windows 网关启动、会话/状态生命周期——表明维护者仍在处理近期版本引入的回归问题，而不是发布新标签。从吞吐量角度看项目是健康的（合并/关闭率高，许多交叉关联的修复 PR 等待维护者审阅），但 issue 待办事项主要偏向**稳定性、会话完整性和 provider/auth 回归**，而非新功能。总体而言，项目在 2026.9.1 和 2026.9.2 节奏发布后处于稳定阶段。

---

## 2. 发布

**过去 24 小时内无新发布。** 数据中引用的最新版本是 2026.9.1 (`ad6fe23`) 和 2026.9.2，两者均涉及多个未解决的 P0/P1 回归——值得注意的是：

- **2026.9.1**：Windows 网关无法启动（[#137813](https://github.com/openclaw/openclaw/issues/137813)）；cron 调度器静默吞掉 tick（[#139215](https://github.com/openclaw/openclaw/issues/139215)）；claude-cli 410 session_expired（[#132720](https://github.com/openclaw/openclaw/issues/132720)）。
- **2026.9.2**：`updateCommand` 写入了一行永远无法完成的 `update_runs` 记录（[#139714](https://github.com/openclaw/openclaw/issues/139714)）；并发回复消息丢失，提示 `Reply operation has no active tool authority snapshot`（[#139847](https://github.com/openclaw/openclaw/issues/139847)）；llama.cpp EmbeddingGemma ubatch 回归（[#139578](https://github.com/openclaw/openclaw/issues/139578)）。

2026.9.x 版本线是主要的回归前沿，队列中许多待处理的修复 PR 都明确针对它。

---

## 3. 项目进展

过去 24 小时内大约有 **190 个 PR 被合并或关闭**，并且在 2026-09-07 大量新开的修复 PR 排队等待维护者审阅。值得注意的合并/关闭工作和进行中的进展：

- **PR #140566（已关闭）** — *fix(anthropic): preserve resumed CLI caches across Git changes*（[链接](https://github.com/openclaw/openclaw/pull/140566)），作者 VACInc。禁用 Claude Code 对恢复的 CLI 运行所做的启动 Git 快照，以防止工作区变更后出现 prompt-cache miss。
- **Issue #124991（已关闭）** — CLI session reseed 在 SQLite session store 上无效（[链接](https://github.com/openclaw/openclaw/issues/124991)）。确认 `loadCliSessionEntries` 的旧版 JSONL 路径对 SQLite 安装无效。
- **Issue #137056（已关闭）** — `memory-core`：将维护操作从 search/watch 热路径中移出，并对每个文件保持失效控制（[链接](https://github.com/openclaw/openclaw/issues/137056)）。

今天新开或更新的 PR，很可能很快会被合并（大多数处于"ready for maintainer look"状态）：

- **PR #140589** — *fix(ci): avoid Linux packaging on pull requests*（vincentkoc）——CI 成本/速度优化。
- **PR #140593** — *fix(windows): avoid compiler-triggered gateway startup failures*（steipete）——Windows AV/编译器干扰问题，与 [#139468](https://github.com/openclaw/openclaw/issues/139468) 相关。
- **PR #140603** — *fix(onboarding): load installed runtime for first dashboard chat*（steipete）——修复 Codex 插件 onboarding。
- **PR #140531** — *fix(discord): reject numeric application ID pasted as bot token during setup* ——解决设置时的踩坑问题。
- **PR #140458** — *fix(infra): start source workers outside the package directory* ——修复源码安装时 `tsx` 的 `ERR_MODULE_NOT_FOUND` 问题。
- **PR #140235** — *fix(cli): reject blank numeric options across inference and scans* ——关闭一类静默 shell 变量的 bug。
- **PR #140563** — *fix(transcripts): preserve fixed and legacy capture history* ——防止 archive 被重新打开。
- **PR #140412** — *fix: clear stale task progress when resetting a conversation* ——UX 清理。
- **PR #140598** — *fix(update): complete same-version Git-to-package switches* ——发布工程修复。
- **PR #140558** — *fix: identify workers behind slow session-write warnings* ——可观测性。
- **PR #140602** — *refactor(telegram): unify delivery ownership and remove retired paths*（obviyus）——关闭 [#140601](https://github.com/openclaw/openclaw/issues/140601)；与未解决的 Telegram 内部上下文泄漏 [#137927](https://github.com/openclaw/openclaw/issues/137927) 相关。
- **PR #140597** — *fix(plugins): reduce bundled catalog lookup overhead*（steipete）——性能优化。
- **PR #140600** — *refactor(plugins): reuse immutable installed-index preparation* ——启动性能。
- **PR #140599** — *refactor: consolidate LINE markdown parser coverage* ——测试/维护清理。
- **PR #140596** — *refactor(plugin-sdk): simplify approval forwarding mode resolution* ——[#135868](https://github.com/openclaw/openclaw/issues/135868) 的后续工作。
- **PR #140594** — *fix(exec): accept no-pager overrides without executable lookup* ——修复 `GIT_PAGER=cat` 被拒绝的问题。
- **PR #140585** — *fix(ci): keep routine iOS checks on a build smoke* ——CI 优化。

今天更新的另外两个实质性 PR 仍处于打开状态：

- **PR #136820** — *fix(subagents): keep in-flight announce handoffs retryable*（leilei3167）——处理重复 handoff 幂等性问题 #136513；需要证据。
- **PR #134547** — *fix: prevent Codex compaction from stalling replies*（jarbas-marco）——关闭 #127148 类 bug。

---

## 4. 社区热议话题

过去 24 小时内关注度最高的 issue 集中在**会话完整性、provider 异常输出和 Windows 网关启动**。潜在的用户需求很明确：由 `claude-cli` 和 Codex provider 驱动的 OpenClaw 会话经常陷入不可恢复或静默降级的状态，而 Windows 安装路径非常脆弱。

| 排名 | Issue | 评论数 | 👍 | 潜在需求 |
|---|---|---|---|---|
| 1 | [#97616](https://github.com/openclaw/openclaw/issues/97616) — OpenClaw 泄漏未被回收的 hook/tool 子进程（僵尸进程） | 14 | 1 | 进程生命周期卫生；用户希望网关能稳定长时间运行。 |
| 2 | [#135111](https://github.com/openclaw/openclaw/issues/135111) — v2026.8.1 上间歇性出现"Provider completed tool call with malformed JSON arguments" | 14 | 0 | `claude-sonnet-5` 上 provider 的鲁棒性；用户希望 tool call 可靠。 |
| 3 | [#119720](https://github.com/openclaw/openclaw/issues/119720) — 同步 agent 持久化在大规模下阻塞网关事件循环 | 12 | 0 | 性能/规模；高负载下网关的响应能力。 |
| 4 | [#96975](https://github.com/openclaw/openclaw/issues/96975) — 将子 agent 完成的处理与父上下文分离 | 12 | 1 | 子 agent 的人体工学；用户希望 handoff 干净。 |
| 5 | [#132762](https://github.com/openclaw/openclaw/issues/132762) — 溢出重试可能以工具结果成功结束而不进行最终投递 | 12 | 0 | 重试/恢复语义的正确性。 |
| 6 | [#113306](https://github.com/openclaw/openclaw/issues/113306) — SQLite snapshot restore 缺少崩溃/身份保证 | 12 | 0 | snapshot/restore 的数据持久性。 |
| 7 | [#41201](https://github.com/openclaw/openclaw/issues/41201) — Control UI 头像不显示（图片损坏） | 11 | 1 | 外观问题，但长期未解决的 UX bug（自 2026-03-09 起打开）。 |
| 8 | [#95610](https://github.com/openclaw/openclaw/issues/95610) — OpenAI 模型上的 prompt-cache 前缀抖动 | 11 | 2 | 运行成本；用户希望 prompt-cache 能被复用。 |
| 9 | [#137813](https://github.com/openclaw/openclaw/issues/137813) — Windows 网关在 2026.9.1 后无法启动 | 11 | 0 | **关键** Windows 安装/升级阻塞问题。 |
| 10 | [#48920](https://github.com/openclaw/openclaw/issues/48920) — Live Docs 领先于发布版本 | 10 | 4 | 文档/发布卫生。 |

贯穿其中的共同主题是**对运行时的信任**：僵尸进程、格式错误的 tool 参数、被阻塞的事件循环、丢失的消息和损坏的升级，这些都是"网关不应静默降级"这一问题的不同变体。

---

## 5. Bug 与稳定性

**按严重程度排序的新出现/近期活跃 P0 和 P1 bug 报告摘要（附带修复 PR 可用情况）：**

| 严重程度 | Issue | 摘要 | 修复 PR？ |
|---|---|---|---|
| **P0 / 发布阻塞** | [#137813](https://github.com/openclaw/openclaw/issues/137813) | Windows 网关在 2026.9.1 后无法启动；`--task-supervisor` 静默退出码 0。 | 暂无。 |
| **P0 / 发布阻塞** | [#136203](https://github.com/openclaw/openclaw/issues/136203) | Windows de-DE 2026.8.2 升级后 Doctor 维护被阻塞。 | 暂无。 |
| **P0 / 发布阻塞** | [#114967](https://github.com/openclaw/openclaw/issues/114967) | agent 驱动的实时更新导致 `launchctl submit` keepalive 每约 2 分钟强制重启网关。 | 暂无。 |
| **P0 / 发布阻塞** | [#48920](https://github.com/openclaw/openclaw/issues/48920) | Live Docs（Heartbeat IsolatedSessions）领先于 2026.3.13 发布版本——长期未解决。 | 暂无。 |
| **P1** | [#97616](https://github.com/openclaw/openclaw/issues/97616) | Hook/tool 子进程泄漏 → 僵尸进程累积及运行时降级。 | 暂无。 |
| **P1** | [#135111](https://github.com/openclaw/openclaw/issues/135111) | v2026.8.1 上间歇性出现格式错误的 JSON tool-call 参数（`claude-sonnet-5`）。 | 暂无。 |
| **P1** | [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步 agent 持久化/transcript 维护在大规模下阻塞网关事件循环。 | 部分——运行时批量删除 (#133925) 和 Doctor 迁移 (#134062) 已落地；网关线程性能问题仍未解决。 |
| **P1** | [#132762](https://github.com/openclaw/openclaw/issues/132762) | 溢出重试在没有最终投递的情况下以工具结果"成功"结束。 | 暂无。 |
| **P1** | [#127148](https://github.com/openclaw/openclaw/issues/127148) | Codex `sessions.compact` 获取第二个 app-server 并触发 active-writer 冲突。 | **PR #134547** 打开中，需要证据。 |
| **P1** | [#134579](https://github.com/openclaw/openclaw/issues/134579) | Active Memory `before_prompt_build` 处理器带 `requiresToolAuthority` 时从未被分派（2026.8.1 回归）。 | 暂无。 |
| **P1** | [#112259](https://github.com/openclaw/openclaw/issues/112259) | 可见的入站通道 turn 被静默丢弃（zero-payload 分派）。 | 暂无。 |
| **P1** | [#99910](https://github.com/openclaw/openclaw/issues/99910) | Memory dreaming 运行使网关事件循环占用约 10 分钟；短期 recall 永远不持久化。 | 暂无。 |
| **P1** | [#54488](https://github.com/openclaw/openclaw/issues/54488) | Session lane starvation——后续 drain 独占 lane，阻塞入站 20-30 分钟。 | 暂无。 |
| **P1** | [#132720](https://github.com/openclaw/openclaw/issues/132720) | `claude-cli` 410 `session_expired`（2026.9.1-beta.1，使用有效的 paste-token）；Doctor 将主 provider 从 `claude-cli` 迁出。 | 暂无。 |
| **P1** | [#101929](https://github.com/openclaw/openclaw/issues/101929) | `context-overflow-midturn-precheck` 比计费用量多算约 2.3–2.6 倍。 | 暂无。 |
| **P1** | [#92241](https://github.com/openclaw/openclaw/issues/92241) | 网关在更新/回滚后保留过时的模块导入路径 → 消息被丢弃。 | **PR #140458** 解决了源码树变体。 |
| **P1** | [#124991](https://github.com/openclaw/openclaw/issues/124991) | CLI session reseed 在 SQLite session store 上无效。 | **Issue 在 24 小时内关闭**；修复可能已落地。 |
| **P1** | [#128637](https://github.com/openclaw/openclaw/issues/128637) | 多 agent 环境操作以 `AgentSelectionRequiredError` 失败。 | 暂无。 |
| **P1** | [#112160](https://github.com/openclaw/openclaw/issues/112160) | SSH 沙盒未将入站媒体暂存到现有远程工作区。 | 暂无。 |
| **P1** | [#90378](https://github.com/openclaw/openclaw/issues/90378) | 5.28 → 6.1 cron store 静默迁移到 SQLite；新作业默认 `delivery.mode=announce`，导致通道错误。 | 暂无。 |
| **P1** | [#137813](https://github.com/openclaw/openclaw/issues/137813) / [#140010](https://github.com/openclaw/openclaw/issues/140010) | Windows 上的 sleep/resume 导致繁忙网关上 WebSocket 重连失败 30-60 秒以上。 | 暂无。 |
| **P1** | [#139847](https://github.com/openclaw/openclaw/issues/139847) | 在回复运行处于活跃状态时发送的消息被丢弃（2026.9.2 回归）。 | 暂无。 |
| **P1** | [#139215](https://github.com/openclaw/openclaw/issues/139215) | 自 2026.9.1 起 cron 调度器静默吞掉计划 tick。 | 暂无。 |
| **P1** | [#140535](https://github.com/openclaw/openclaw/issues/140535) | Discord `/new` 返回"No reply was generated"且不重置频道会话。 | 暂无。 |
| **P1** | [#134896](https://github.com/openclaw/openclaw/issues/134896) | 2026.8.1 更新：5 个阻塞器级联触发网关重启 + doctor `--fix` 自指失败。 | 暂无。 |
| **P1** | [#140535](https://github.com/openclaw/openclaw/issues/140535) | （已在上方列出） | — |
| **P1** | [#140010](https://github.com/openclaw/openclaw/issues/140010) | （已在上方列出） | — |
| **P1** | [#139714](https://github.com/openclaw/openclaw/issues/139714) | post-core update resume 子流程写入了一行 `update_runs` 记录

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / Agent 开源生态
**数据窗口：** 2026-09-06 → 2026-09-07 UTC | 项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

个人 AI 助手生态已围绕一种共同的运行时形态完成整合 —— 一个网关 / 桌面核心，编排 LLM 提供商、消息通道（Telegram、Discord、Slack、Matrix、飞书）、定时自治（heartbeat/cron）以及多 Agent 委派 —— 但这五个项目显然处于不同的成熟度节点。值得注意的是，**窗口期内这五个项目均未发布版本**：整个生态正处于集体稳定化阶段，消化此前快速迭代周期（OpenClaw 2026.9.x、Hermes v0.21.0、QwenPaw v2.2.0-beta.7、ZeroClaw v0.8.5 周更列车）带来的回归问题。工程主战场已从功能广度转向**运行时可信度** —— 会话完整性、定时任务送达、token 计账正确性，以及 Windows 平台一致性。社区参与度依旧旺盛，但维护者审阅带宽已成为其中两个项目明确点名的瓶颈（ZeroClaw 的决策队列 #8692；OpenClaw 的 310 个待审 PR）。

---

## 2. 活跃度对比

| 项目 | Issues（24h） | PRs（24h） | 发布状态 | 健康度评分* |
|---|---|---|---|---|
| **OpenClaw** | 500 条变动（375 open / 125 closed） | 500 条变动（310 open / 190 merged·closed） | 无；2026.9.x 稳定化阶段，多个 P0 仍无修复 PR | **7/10** — 生态内吞吐最高；回归积压压力较大 |
| **Hermes Agent** | 50（94% 变动项仍 open） | 50 | 无；v0.21.0 为最新；v0.21.1 候选簇正在形成 | **7/10** — 当日修复速度；分类处理密集日 |
| **ZeroClaw** | 33 | 50（~6 merged/closed） | 无；v0.8.5 周更稳定线（#9459） | **6/10** — 势头强劲；维护者带宽成瓶颈 |
| **QwenPaw** | 24 | 12（2 merged） | 无；v2.2.0-beta.7 安装验证中 | **6/10** — 速度良好 + 新晋贡献者涌入；严重 bug 无人认领 |
| **IronClaw** | 0 | 9（3 closed — 全部为依赖升级） | 无 | **5/10** — 维护模式；Dependabot 主导 |

\* 由吞吐、顶级严重度 bug 的修复 PR 可用性、回归积压、审阅带宽综合得出。

---

## 3. OpenClaw 的定位

**相对同侪的优势：**
- **规模（约 10× 同侪）：** 24h 内 500 issues + 500 PRs 变动；仅 190 个 merged/closed 的 PR 就已超过本集合中其他所有项目的活动总量。
- **最广的覆盖面：** 提供商（claude-cli、Codex、llama.cpp）、通道（Discord、Telegram、LINE）、插件 SDK、自更新 / doctor 机制、后台记忆合并。无一同侪能与之比肩。
- **深度修复 PR 流水线：** 多数 P1 在上报数日内即有交叉关联的修复 PR 等待审阅。

**相对同侪的劣势：**
- **P0 收尾滞后：** Windows 网关启动失败（#137813）、cron tick 吞消息（#139215）、launchctl keepalive 循环（#114967）均无修复 PR —— 而 Hermes 已对自身头部 P1（#104653 → PR #104673）实现当日修复，ZeroClaw 也当日修补了 heartbeat key bug（#10670 → #10671）。OpenClaw 在 PR 队列上很快，但在 P0 收尾上较慢。
- **发布卫生度滑坡：** Live Docs 自三月起领先于发布（#48920）；310 个 open PR 是 ZeroClaw 明确抱怨的那种审阅队列债务。

**社区规模：** Issue 编号空间（约 14 万，对比 Hermes 约 10.4 万、ZeroClaw 约 1.06 万、IronClaw 约 8.1 千、QwenPaw 约 7.6 千）加上日均量，确认其拥有最大用户基数。提醒：单帖参与深度方面其他项目更高（Hermes #97681 有 25 条人工评论；ZeroClaw RFC 有 25–34 条）—— OpenClaw 的广度大于深度。

**技术路线：** 单体式、网关中心的运行时，附以提供商适配器与日历版本发布 —— 不同于 ZeroClaw 由 RFC 治理的事件溯源雄心、IronClaw 的 Rust 安全优先主机隔离、QwenPaw 的桌面优先编排，以及 Hermes 强调本地模型的桌面+网关混合形态。

---

## 4. 共同技术焦点领域

| 焦点领域 | 涉及项目 | 证据 |
|---|---|---|
| **会话持久化 / 重建完整性** | OpenClaw、Hermes、QwenPaw、ZeroClaw | OpenClaw #139847、#124991；Hermes #104653（重建时出现重复回合）；QwenPaw #7584/#7579（模型看不见自己上一条消息）、#7447；ZeroClaw #9487 RFC、#10526 append-only history |
| **Heartbeat/cron 可靠性** | 同上 4 个 | OpenClaw #139215、#99910；Hermes #92837、#104453；QwenPaw #7589（agent 卡死约 2h）；ZeroClaw #9191、#10670 |
| **Windows 平台一致性** | 同上 4 个 | OpenClaw #137813、#140010；Hermes #104666；QwenPaw #7363（UI 卡死 118–135s）；ZeroClaw #7462（74 个测试失败） |
| **Token 计账 / 压缩正确性** | OpenClaw、Hermes、QwenPaw | OpenClaw #101929（2.3–2.6× 多计）；Hermes #99398（推理计费虚高 42%，已 closed）；QwenPaw #6541（压缩破坏 DeepSeek API 契约） |
| **提供商侧脆弱性** | OpenClaw、Hermes、QwenPaw、ZeroClaw | OpenClaw #135111、#132720；Hermes #42719、#104678；QwenPaw #7513；ZeroClaw #10617 |
| **委派语义（进度、归属、预算）** | OpenClaw、QwenPaw、ZeroClaw | OpenClaw #96975、#128637；QwenPaw #7450、#7580；ZeroClaw #10644/#10645 |
| **插件隔离 / 出站安全** | ZeroClaw、IronClaw | ZeroClaw #6996、#10076、#10391；IronClaw #8077（漏检阻断哨兵分类） |

最强信号：**5 个项目中有 4 个（除 IronClaw 外）同时存在定时自治与会话状态相关的活跃 bug** —— 这些已是入门级子系统，但无一项目达到生产级标准。

---

## 5. 差异化分析

| 项目 | 功能聚焦 | 目标用户 | 架构 |
|---|---|---|---|
| **OpenClaw** | 最广的助手面：多提供商、多通道、插件 SDK、自更新 / doctor | 长期运行 always-on 个人助手的资深用户 | 网关中心单体（TS），calver 节奏 |
| **Hermes Agent** | 持久化对话机器人、委派、技能中心 | 家用服务器 / VPS bot 集群运营者；本地模型用户 | 桌面 + 网关 + CLI 混合（Python）；NousResearch 血脉 |
| **IronClaw** | 安全 / 出站控制、MCP 主机隔离、Slack 接入 | 安全敏感型 / 企业用户 | Rust，主机 API 边界，WASM 工具链 |
| **QwenPaw** | 多 Agent 编排、桌面 UX、插件商店、飞书 | 桌面优先的 prosumer、CJK 市场（可见中文文档工作流） | 桌面中心应用 + agent 运行时；与 AgentScope 相关 |
| **ZeroClaw** | 架构严谨性：sessions RFC、沙箱策略、WASM 插件、Matrix、边缘硬件（Hailo/Ollama） | 自托管折腾者、注重隐私的用户 | RFC 治理、周更稳定线、pre-1.0（v0.8.x） |

---

## 6. 社区势头与成熟度

- **第一梯队 — 巨量规模，吸收压力：** OpenClaw。吞吐无出其右，但当前主要投入 2026.9.x 回归清理而非新功能面。
- **第二梯队 — 快速迭代：** Hermes（当日 bug→修复闭环；委派 PR 栈趋于整合；最响亮的诉求 = 超越 Desktop 应用生命周期的会话）与 ZeroClaw（当日 patch、周更列车，但 RFC 收敛缓慢，且维护者决策队列本身就是头部元话题）。
- **第三梯队 — 压力下成长：** QwenPaw。多数开放的修复 PR 来自**新晋贡献者** —— 这是健康的 onboarding 信号 —— 但严重的上下文丢失与心跳循环 bug 在 v2.2.0 GA 之前无人认领。
- **第四梯队 — 维护模式：** IronClaw。仅有 Dependabot 活动加上两个针对性的安全 / UX 修复；窗口期内无用户面社区信号。

**成熟度判读：** OpenClaw 运营上最为成熟（更新 / doctor / 插件机制），但呈现成熟期阵痛 —— 回归节奏超过 QA。Hermes 拥有最佳响应比。ZeroClaw 版本号上最不成熟，但流程上最为严谨。QwenPaw 版本号已是 v2.x，流程上仍在稳定化。**快速迭代：** Hermes、ZeroClaw。**稳定化：** OpenClaw、QwenPaw。**平稳：** IronClaw。

---

## 7. 趋势信号

1. **事件溯源会话正在成为参考架构。** 24h 窗口内，4/5 项目出现静默状态丢失；ZeroClaw 的 append-only 事件历史 RFC（#10526）与 Hermes 的持久化会话诉求（#97681）指明了方向。*价值点：* 将会话设计为持久事件日志，在写入边界做去重并确定性重建；将"模型看不见自己上一条消息"（QwenPaw #7584）视为 P0 级别。
2. **主动 Agent 已遍地交付，但无一获得信任。** 4/5 项目存在 heartbeat/cron 缺陷 —— tick 被静默丢弃、无挂钟超时、反馈循环把 agent 卡死数小时。*价值点：* 定时自治需要送达确认语义、幂等 tick、硬超时以及失控循环熔断，才能达到生产级。
3. **Windows 平台一致性是普遍税负。** 4/5 项目存在 Windows 专属的 P0/P1。Hermes 的跨 OS E2E 安装 / 更新矩阵 PR（#101420）是他者应当复制的对策。*价值点：* Windows CI 必须前置 GA，而非后置。
4. **Token 计账是信任与成本界面。** 多计（OpenClaw 2.3–2.6×；Hermes 推理双计 42%）以及破坏 API 契约的压缩载荷，正在悄无声息地侵蚀信心。*价值点：* 仪表化"估算 vs 计费" token；为压缩消息结构编写契约测试。
5. **提供商 churn 要求防御式适配器。** 格式错误的 tool-call JSON、enum 收窄（Anthropic `thinking.display`）以及锁死的计费状态，在 4 个项目同时击穿运行时。*价值点：* 在适配器边界对提供商响应做规范化与校验；将提供商 beta 行为置于 flag 之后。
6. **委派需要身份与预算透传。** ZeroClaw 的 owner-principal 与成本串接缺口，加上业界普遍缺失阻塞等待原语（QwenPaw #7580），表明 sub-agent 仍运行于计账模型之外 —— 这是一种安全与成本敞口。
7. **部署模型正向 always-on 迁移。** 生态中最响亮的人工诉求（Hermes #97681：群聊需在 Desktop 关闭后存活）加上 OpenClaw 的网关中心设计，确认助手正变成常驻服务型应用而非桌面应用。插件隔离（WASM 沙箱、出站哨兵、审批流）正在成为新兴的信任前沿，并将决定下一代运行时的分野。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-07

## 1. 今日概览

Hermes Agent (NousResearch/hermes-agent) 的分类处理活动较为活跃，**24 小时内更新了 100 个条目**（50 个 issue，50 个 PR），但**开放/关闭比例偏高（94/6）**，说明今天是积压偏多的维护日，而非发布日。队列主要由**会话状态、消息投递、上下文压缩**相关问题构成，涵盖网关、agent 运行时和桌面客户端。期间未发布新版本，大部分合并/关闭的 PR 都是被取代的检查点或新报回归的 bug 修复，呈现出活跃但尚处于发布前期的动荡状态。今天新增的多个 P1（#42719、#104453、#104653）指向围绕提供商集成和平台特定调度的持续可靠性主题。

## 2. 版本发布

过去 24 小时内没有新版本发布。数据中引用的最新发布版本为 **v0.21.0**（在 #104453 和 #104666 中被引用），对应 `main @ 820106d4a5`。更新渠道和 `hermes update` 路径仍是摩擦点（见 Bug 部分）。

## 3. 项目进展

**今日关闭/合并（6 项）：**

- [#104426](https://github.com/NousResearch/hermes-agent/pull/104426) — 关闭（已被取代）。在 #104299 完成单元之上接入投递端口的委托注入。
- [#104419](https://github.com/NousResearch/hermes-agent/pull/104419) — 关闭（错误基底，已被取代）。委托最小注入策略。
- [#99398](https://github.com/NousResearch/hermes-agent/issues/99398) — 关闭。预检估算器对 `reasoning` 重复计费，导致上下文膨胀约 42% 并陷入压缩循环。
- [#70328](https://github.com/NousResearch/hermes-agent/issues/70328) — 关闭。压缩触发器中图像采用固定 1500 token 计费，导致视觉密集型 64K 本地模型会话在压缩前直接返回 400。

**净进展：** 关闭了两个真实 bug（reasoning 重复计数、图像 token 成本），委托功能工作（[#85648](https://github.com/NousResearch/hermes-agent/issues/85648)）整合到单一着陆目标（[#104434](https://github.com/NousResearch/hermes-agent/pull/104434)），两版早期草稿被正确废弃。这是清理日，而非功能合并日。

## 4. 社区热门话题

| # | 条目 | 类型 | 评论数 | 为何重要 |
|---|------|------|--------|----------|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | 技能索引新鲜度探针降级 | Issue（自动） | **169** | 自动化看门狗；索引 29.8 小时未更新，超过 26 小时上限。Skills Hub 文档是下游产物——这是一个基础设施可靠性问题，并非用户报告的 bug。 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Desktop 关闭后 Bot 群聊必须保持工作 | 功能请求 | **25** | 头号*用户*诉求：能在本地 Desktop 生命周期之外存活的持久多机器人群聊。预示着向服务端常驻 / VPS 部署的强烈推动。 |
| [#26277](https://github.com/NousResearch/hermes-agent/issues/26277) | 按规范化主题进行邮件会话隔离 | 功能请求 | 9（👍2） | 邮件网关目前将同一发件人的所有消息归入同一会话——希望提供可选的主题键控隔离。 |
| [#73327](https://github.com/NousResearch/hermes-agent/issues/73327) | 可定制的 cron 响应包装模板 | 功能请求 | 6（👍3） | 硬编码的 `Cronjob Response:` 头/尾；用户希望使用自己的品牌/格式。 |
| [#92837](https://github.com/NousResearch/hermes-agent/issues/92837) | 心跳 tick 被计为已触发但实际从未投递 | Bug（P2） | 4 | 一处微妙的有限状态机缺陷：`last_fired_at`/`fire_count` 推进但投递被丢弃，agent 缓存空闲驱逐后唤醒也会丢失。 |

**底层需求：** 呼声最高的两个人类话题——持久化群聊和邮件主题隔离——有一条共同主线：用户希望 Hermes 会话表现得像**长生命周期、可寻址的对话**，而非瞬时消息处理调用。技能索引话题尽管评论很多，其实是内部 CI/cron 信号，并非社区诉求。

## 5. Bug 与稳定性

### P1（今日新建或仍处于活跃状态）

- **[#104653](https://github.com/NousResearch/hermes-agent/issues/104653)** — 入站用户轮次被**重复持久化两次**（网关接收时一次 + agent 运行时刷盘时一次）；其中一行设置了 `platform_message_id`，另一行为 NULL；历史加载不去重 → 每次重新加载模型都会看到每条用户消息出现两次。**修复 PR 已存在：** [#104673](https://github.com/NousResearch/hermes-agent/pull/104673)，作者 BrunoBza，同日提交。这是今日影响最严重的问题。
- **[#104453](https://github.com/NousResearch/hermes-agent/issues/104453)** — **systemd 249（Ubuntu 22.04）上**重启安全的 cron 调度已坏：`OOMPolicy=kill` 在 transient scope 上被拒。针对 v0.21.0 提交，影响升级后的所有 cron 任务。**尚无修复 PR。**
- **[#42719](https://github.com/NousResearch/hermes-agent/issues/42719)** — ACP 提供的 **MCP 工具已注册但从模型请求中被丢弃**——工具出现在注册/刷新中，但不出现在实际的 chat-completions 负载中。问题较老但仍开放，优先级高。

### P2（精选，标注已有的修复 PR）

| Issue | 标题 | 修复 PR |
|---|---|---|
| [#92837](https://github.com/NousResearch/hermes-agent/issues/92837) | 心跳已触发但从未投递，空闲驱逐后唤醒丢失 | — |
| [#94921](https://github.com/NousResearch/hermes-agent/issues/94921) | CLI 中 Shift+字母 在 Ghostty 上泄漏原始 `ESC[27;2;<cp>~`（#87630 引入的回归） | — |
| [#100302](https://github.com/NousResearch/hermes-agent/issues/100302) | Desktop 编辑器光标消失（DOM 标准化器移除了 Chromium 的活跃光标） | — |
| [#104357](https://github.com/NousResearch/hermes-agent/issues/104357) | Discord cron 附件 404（Unknown Channel），文本消息投递正常 | — |
| [#104176](https://github.com/NousResearch/hermes-agent/issues/104176) | 继承的 `ContextCompressor` 摘要覆写在 `bypass_cooldown` 时失效（第三方子类回归） | — |
| [#100836](https://github.com/NousResearch/hermes-agent/issues/100836) | `hermes doctor --fix` 误报 "live writer"——泄漏 `COUNT(*)` 连接 | — |
| [#104169](https://github.com/NousResearch/hermes-agent/issues/104169) | `refresh_agent_mcp_tools()` 重新派生工具数组，静默丢弃每会话组装上下文 | — |
| [#104678](https://github.com/NousResearch/hermes-agent/issues/104678) | Anthropic Pro/Max 额度耗尽锁存 `failure_reason=billing` 且无过期 | — |
| [#104666](https://github.com/NousResearch/hermes-agent/issues/104666) | `codex_app_server` 在使用 npm 安装的 Codex 时无法在 Windows 上启动（子进程忽略 PATHEXT） | — |
| [#104671](https://github.com/NousResearch/hermes-agent/issues/104671) | 后台补全积压为每个陈旧/已死进程消耗一整轮 agent | [#104686](https://github.com/NousResearch/hermes-agent/pull/104686) ✅ |
| [#104591](https://github.com/NousResearch/hermes-agent/issues/104591) | 启动时更新检查生成交互式 `ssh` 主机密钥提示，劫持 CLI 输入 | — |
| [#100680](https://github.com/NousResearch/hermes-agent/pull/100680) *（Desktop 切换 bug）* | 卡死的远程网关切换会清除本地状态 | [#104680](https://github.com/NousResearch/hermes-agent/pull/104680) ✅ |

**严重性排序（今日）：** P1 = 用户轮次重复写入（#104653）> P1 cron 回归（#104453）≈ P1 ACP/MCP 工具丢失（#42719）。P2 集群以有限状态机和平台特定缺陷为主；重复写入（#104653 → #104673）和 CLI 后台补全风暴（#104671 → #104686）均已同日提交修复，是正向的速度信号。

## 6. 功能请求与路线图信号

**最强信号：持久化、服务端常驻的会话状态** — [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（25 条评论）是呼声最高的人类诉求。预计后续版本将把"群聊存活于 Desktop 之外"作为第一类故事；其描述已暗示对 VPS 友好的每机器人模型/工具/凭据隔离。

**可能的近期方向：**
- **邮件主题键控会话** [#26277](https://github.com/NousResearch/hermes-agent/issues/26277) — 低风险、可选、作用域明确。可能的下一个小版本。
- **Cron 包装模板** [#73327](https://github.com/NousResearch/hermes-agent/issues/73327) — 小型 UX 修复；唯一的痛点就是硬编码的尾部。
- **系统提示中统一注入渠道能力** [#45122](https://github.com/NousResearch/hermes-agent/issues/45122) — 已有匹配的 PR（[#104685](https://github.com/NousResearch/hermes-agent/pull/104685)），今日开启；预计下个版本合并。
- **macOS 上 Dashboard 的 LaunchAgent 生命周期** [#104022](https://github.com/NousResearch/hermes-agent/pull/104022) — 实现 [#44106](https://github.com/NousResearch/hermes-agent/issues/44106)；同日 PR 暗示即将落地。
- **凭据池优先级排序** [#104638](https://github.com/NousResearch/hermes-agent/issues/104638) + **跨策略请求计数对齐** [#104637](https://github.com/NousResearch/hermes-agent/issues/104637) — 一组连贯的凭据池强化批次。

**中期方向：**
- **委托时序——就绪的依赖项影响未完成的父任务** [#85648](https://github.com/NousResearch/hermes-agent/issues/85648) / [#76230](https://github.com/NousResearch/hermes-agent/pull/76230) / [#104434](https://github.com/NousResearch/hermes-agent/pull/104434) — 三 PR 栈正在收敛；PR 图正在向 #104434 整合。等评审者有空时合并。
- **统一包管理器** [#102765](https://github.com/NousResearch/hermes-agent/pull/102765) — 体量大、跨领域（CLI/网关/桌面/Docker/插件准入）；需决策且需跨平台。
- **systemd 249 上重启安全的 cron** [#104453](https://github.com/NousResearch/hermes-agent/issues/104453) — 鉴于 v0.21.0 上的回归，必须在下个版本 tag 之前发布。

## 7. 用户反馈汇总

**痛点（具体）：**
- **会话感觉是瞬时的** — 在 Telegram、Discord 和飞书上运行的用户正在丢失连续性（心跳静默丢弃、空闲驱逐时唤醒丢失、重新加载时出现重复行、Discord cron 附件 404）。痛点在长期存活的网关会话上最为突出。
- **邮件网关粒度过粗** — 一发件人一会话对正常邮件场景是错误的；用户希望按主题隔离（[#26277](https://github.com/NousResearch/hermes-agent/issues/26277)）。
- **v0.21.0 回归** — systemd-249 的 cron 中断（[#104453](https://github.com/NousResearch/hermes-agent/issues/104453)）、Ghostty 上 Shift+字母 出现原始 ANSI 序列（[#94921](https://github.com/NousResearch/hermes-agent/issues/94921)，#87630 引入的回归）、`hermes doctor --fix` 误报（[#100836](https://github.com/NousResearch/hermes-agent/issues/100836)）紧密聚集在最新 tag 上，提示发布前 QA 中 Linux/终端矩阵覆盖不足。
- **更新 UX 不友好** — [#104591](https://github.com/NousResearch/hermes-agent/issues/104591) 描述了更新检查通过孤立的 `ssh` 子进程劫持交互输入。在共享终端中运行 `hermes update` 让用户感到不安全。
- **压缩行为不透明** — 计费层级回退对 `reasoning` 重复计数（今日以 #99398 关闭），图像 token 采用固定计费（今日以 #70328 关闭）；42% 的膨胀和提供商 400 正是那种侵蚀信任的静默上下文失败。

**积极信号：**
- 多条同日报告、同日修复的 PR（#104653 的 [#104673](https://github.com/NousResearch/hermes-agent/pull/104673)；#104671 的 [#104686](https://github.com/NousResearch/hermes-agent/pull/104686)；Desktop 切换 bug 的 [#104680](https://github.com/NousResearch/hermes-agent/pull/104680)）——响应速度良好。
- 跨操作系统 E2E 安装/更新矩阵 PR（[#101420](https://github.com/NousResearch/hermes-agent/pull/101420)）直接针对 v0.21.0 的回归集群。

**正在浮现的使用场景：** 家用服务器 / VPS 常驻机器人集群；跨设备的长生命周期群聊；通过 cron 向 Discord 投递报告/附件；邮件作为 Hermes 会话载体。

## 8. 待办观察

**老旧、重要、仍未处理的条目：**

- **[#66616](https://github.com/NousResearch/hermes-agent/issues/66616)** — 技能索引陈旧（2026-07-18 开启，169 条评论）。尽管评论很多，这是自动化探针，但底层工作流（`skills-index.yml` cron 于 6/18 UTC + `deploy-site.yml`）无法自动恢复；需要维护者增加自愈运行或缩短 cron 周期。
- **[#42719](https://github.com/NousResearch/hermes-agent/issues/42719)** — ACP/MCP 工具已注册但从模型请求中被丢弃（P1，2026-06-09 开启，3 条评论）。对任何基于 ACP 的 IDE 集成影响很大；无关联 PR。
- **[#45125](https://github.com/NousResearch/hermes-agent/issues/45125)** — Dashboard 在所有标签页加载时因 React 错误 #520 崩溃（P3，2026-06-12 开启）。与仅 Chat 标签页的 bug #41739 不同；意味着 React 压缩是*广泛*不稳定的。维护者应区分这是构建/打包回归还是运行时 DOM 契约变更。
- **[#26277](https://github.com/NousResearch/hermes-agent/issues/26277)** — 邮件主题隔离（2026-05-15 开启，2 👍）。低风险、范围明确；它拖了约 4 个月，是最令人意外的积压条目。
- **[#73327](https://github.com/NousResearch/hermes-agent/issues/73327)** — Cron 包装模板（2026-07-28 开启，3 👍）。极简修复，反复被 👍，无 PR。
- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)** — 跨设备 Bot 群聊（2026-08-29 开启，25 条评论）。这已是社区中呼声最高的单一话题，但仍未关联任何设计文档或 PR。
- **[#92837](https://github.com/NousResearch/hermes-agent/issues/92837)** — 心跳已触发但从未投递（P2，2026-08-23 开启，4 条评论）。一处微妙但严重的有限状态机缺陷；无修复 PR。
- **[#69882](https://github.com/NousResearch/hermes-agent/issues/69882)** — 插件工具处理器的认证网关请求上下文（P3，2026-07-23 开启，需决策，涉安全边界）。"needs-decision" 标签一直未被处理；这会阻塞需要来源信息的第三方插件。

**建议维护者关注：**（a）网关会话持久化（#97681、#92837、#104653、#104176）、（b）v0.21.0 发布回归（#104453、#94921、#100836）、（c）凭据池一致性（#104637、#104638、#104678）这几个集群共同构成了一个连贯的"下个补丁版本"集合。如果 v0.21.1 在议程上，systemd-249 的 cron 修复和用户轮次重复写入修复是两件不可妥协的事项；其余都是强有力的候选。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目简报 — 2026-09-07

**仓库：** [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日概览

在过去 24 小时窗口内（截至 2026-09-07），IronClaw 的自动化活跃度为**低到中等**，**更新了 9 个 PR**，**问题未涉及**。活动主要由 **Dependabot 驱动的依赖项维护工作**主导：9 个 PR 中有 7 个是覆盖 Rust crates、tokio 生态、WASM 工具链和 GitHub Actions 的常规 chore/deps 更新。剩下的 2 个 PR 是针对 **MCP 出站诊断流水线**以及 **助手共享频道处理**（Slack 相关）的**定向 Bug 修复**。未发布新版本，也无待分流的问题，这一天整体氛围是安静的维护模式，而非新功能冲刺。

---

## 2. 版本发布

**过去 24 小时内无新版本发布。** 版本发布部分依据简报指南省略。

---

## 3. 项目进展

在 24 小时窗口内有 **3 个 PR 被关闭/合并**。这 3 个 PR 都是依赖项更新，按 Dependabot 惯例未合并到主线（通常会被后续 rebase 或重新批处理更新取代）：

- **[PR #8049](https://github.com/nearai/ironclaw/pull/8049)** — `chore(deps): bump the everything-else group across 1 directory with 19 updates`（已关闭，2026-09-06）
  批量 Rust 依赖项刷新，覆盖 19 个包。被下方更大的跟进 PR #8080 取代。
- **[PR #7835](https://github.com/nearai/ironclaw/pull/7835)** — `chore(deps): bump the actions group across 1 directory with 5 updates`（已关闭，2026-09-06）
  GitHub Actions 升级（5 个包）——为了让位给 6 个包的 PR #8079 而关闭。
- **[PR #7020](https://github.com/nearai/ironclaw/pull/7020)** — `chore(deps): bump tokio-tungstenite from 0.29.0 to 0.30.0 in the tokio-ecosystem group across 1 directory`（已关闭，2026-09-06）
  值得注意的是该 PR 在关闭前已有 **35 天**历史——即 tokio-tungstenite 0.30.0 升级。大概率通过合并了同一 crate 的更新版 #8078 而合入。

**已交付逻辑方面的净进展：基本为零。** 被关闭的 PR 互相取代，今天没有新功能或新行为落地。

---

## 4. 社区热点话题

**数据局限：** 所有 9 个 PR 的 `Comments: undefined` 且反应数为零（👍: 0）。**无新问题活动**可按参与度排序。下表列出基于规模、风险和主题相关性最可能引起关注的 PR：

| 排名 | PR | 为何值得关注 |
|---|---|---|
| 1 | **[#8077 `fix(mcp): classify response leak diagnostics`](https://github.com/nearai/ironclaw/pull/8077)** | 关闭一个被引用的问题（#8009，不在 24 小时 feed 内）。涉及安全相关的出站/主机泄漏分类——通常会引发安全审查关注。 |
| 2 | **[#8076 `fix(assistant): distinguish disconnected shared channels`](https://github.com/nearai/ironclaw/pull/8076)** | 用户可见的 Slack/助手行为修复；跨多个界面（产品、适配器、OpenAI 兼容）。可能会受到产品/UX 方面的审视。 |
| 3 | **[#7834 `chore(deps): bump the wasm group`](https://github.com/nearai/ironclaw/pull/7834)** | 最大的未合并 PR（规模：L，风险：中），自 2026-08-23 起就一直开着。WASM 升级历来以易引入破坏著称。 |

**潜在需求信号：** 今天非 Dependabot 的 PR 都指向**状态分类歧义**——IronClaw 目前将 "leak-blocked" 响应与其他失败模式混为一谈（#8077），并将"未配对用户"与"已配对但已断开"的共享频道状态混为一谈（#8076）。这是一个反复出现的需求：需要更清晰的诊断信号以及更精细的用户/账户状态。

---

## 5. Bug 与稳定性

在 24 小时内新开了 2 个 Bug 修复 PR。未提交回归问题或崩溃报告。

| 严重程度 | PR | 组件 | 描述 | 修复状态 |
|---|---|---|---|---|
| **中**（安全相关） | [#8077](https://github.com/nearai/ironclaw/pull/8077) | MCP / host HTTP API | `response_leak_blocked` 哨兵值曾与其他 MCP 可见的错误原因混在一起，削弱了安全保证以及面向用户的错误信息。在 `ironclaw_host_api::http` 中集中了该哨兵值，并为 MCP 通道赋予了独立的分类。 | **修复 PR 已开启**；关闭 #8009。 |
| **中**（UX / 正确性） | [#8076](https://github.com/nearai/ironclaw/pull/8076) | Assistant / Slack 适配器 | 已配对用户的已断开共享频道与未配对账户无法区分，导致产品、适配器、OpenAI 兼容界面上的错误拒绝与提示信息不一致。 | **修复 PR 已开启。** |

**稳定性风险关注：** [PR #7834](https://github.com/nearai/ironclaw/pull/7834)（规模 L，风险中）打包了 4 个包的 WASM 升级，**已开放 15 天**——历史上 WASM 生态的主版本/次版本升级在该代码库中具有最高的回归概率，值得指派专门的评审者。

---

## 6. 功能请求与路线图信号

**24 小时窗口内未提交任何功能请求问题。** 可以从两个开启中的 Bug 修复中推断出间接的路线图信号：

- **#8076** 表明项目正在投入**多界面一致性**（产品 UI、适配器、OpenAI 兼容端点）方面的建设以改善助手状态——可能是下一周期更广泛的 Slack 频道功能工作的前奏。
- **#8077** 表明**MCP 出站/主机隔离边界**持续加固——预计下一个发布周期会有更多诊断清晰度方面的改进。
- Dependabot churn 的节奏（24 小时内 4 个新的 chore PR，其中 3 个针对 `/`）表明一个**活跃的发布分支**正在持续接收依赖项更新，与"今天虽然没有打 tag 但确实在为即将到来的标签版本做准备"这一推测一致。

由于未开启任何新功能 PR，因此除依赖项整理外，无法可靠预测近期版本的功能。

---

## 7. 用户反馈摘要

**24 小时 feed 内没有可用的用户提交问题或评论。** 唯一可用的信号是隐式的，即通过两个 Bug 修复体现：

- **痛点 — MCP 中的失败原因不清晰：** 在主机泄漏拦截介入时，MCP 通道的用户/运维收到含糊不清的错误信息。（#8077 解决了这一问题。）
- **痛点 — 共享频道中的拒绝状态令人困惑：** 已配对的 Slack 用户其共享频道已断开，却被告知是"未配对"，导致错误的补救措施。（#8076 解决了这一问题。）

**满意度信号：** 这两个修复都以**明确的多界面一致性**（host API ↔ MCP，产品 ↔ 适配器 ↔ OpenAI 兼容）落地，表明维护者对多界面 UX 投诉的响应性，尽管今天看不到任何直接的用户评论。

---

## 8. 待办关注清单

24 小时 feed 中因**年龄、规模或风险**需要维护者关注的项：

| 项目 | 年龄（截至 2026-09-07） | 关注点 | 链接 |
|---|---|---|---|
| **[PR #7834](https://github.com/nearai/ironclaw/pull/7834)** — WASM 组升级（4 个包） | **15 天** | 规模 L，风险中；WASM 升级历来是该仓库风险最高的类别。看不到评审者参与。 | [未合并 PR](https://github.com/nearai/ironclaw/pull/7834) |
| **PR #7020** — tokio-tungstenite 0.30.0 升级 | 在 2026-09-06 关闭前已开放 **35 天**。 | 今天通过合并版 PR #8078 解决，但漫长的停留时间表明该 crate 可能曾因某事被阻塞（可能是 CI matrix 或下游 API 变更），类似的停滞风险也适用于还未完成的 WASM 工作。 | [已关闭 PR](https://github.com/nearai/ironclaw/pull/7020) |
| **Issue #8009**（被 #8077 引用） | 不在 24 小时 feed 内，但是泄漏分类修复背后的议题。 | 一旦 #8077 合并，请确认所引用的 issue 已关闭，且已附上任何后续的安全披露说明。 | [PR #8077](https://github.com/nearai/ironclaw/pull/8077) |

**今天的数据中没有出现长期未回复的问题**（该窗口内的问题 feed 为空），因此主要的待办压力集中在未合并的 WASM 依赖项 PR 上，而非问题分流。

---

*简报生成于 2026-09-07。数据窗口：2026-09-06 → 2026-09-07 UTC。所有 PR 和链接均反映源数据 feed 中捕获的状态。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目日报 — 2026-09-07

## 1. 今日概览

QwenPaw 今日呈现**高强度的缺陷分诊活动，但无新版本发布**：过去 24 小时内有 24 个 Issue 与 12 个 PR 更新，大部分精力集中在稳定近期发布的 v2.2.0 系列（当前为 `v2.2.0-beta.7`）。Issue 类型明显偏向**上下文/记忆丢失类回归**和**多智能体编排边界场景**，PR 队列则由**首次贡献者**（Bruce-Yii、kabishou11）主导，他们提交了目标明确、范围合理的修复和小幅 UX 还原。整体项目健康度为**活跃但承压**：开发节奏强劲，但多个被报告的缺陷被标记为严重级别（智能体行为陷入循环、异常被静默吞掉、心跳会话无响应）。

---

## 2. 版本发布

**今日无新版本发布。** 版本值守跟踪 Issue [#7503](https://github.com/agentscope-ai/QwenPaw/issues/7503) 确认 v2.2.0-beta.7 正在进行安装验证（截止时间 2026-09-02 14:50 UTC）。从 PR/Issue 数量来看，v2.2.0 GA 系列是当前稳定化工作的重点。

---

## 3. 项目进展

今日合并了两个 PR：

- **[#7163](https://github.com/agentscope-ai/QwenPaw/pull/7163) — feat: 优化会话思考与模型管理**（zhaozhuang521，自 2026-08-20 起）
  - 通过编辑图标内联修改智能体名称，移除独立的编辑入口。
  - 创建智能体时保留回退模型配置。
  - 优化智能体—模型/回退模型的交互逻辑。

- **[#2134](https://github.com/agentscope-ai/QwenPaw/pull/2134) — feat(heartbeat): 支持可配置的心跳超时**（dai-junjie，自 2026-03-23 起）
  - 将硬编码的 120s 心跳运行超时替换为可在控制台配置的每运行超时。
  - 关闭了一个长期挂起的待办项（从创建至今约 5.5 个月）。

这些改动属于模型/会话 UX 的渐进式改进，以及备受期待的心跳灵活性——体量不大但切实有用。

---

## 4. 社区热议话题

按过去 24 小时评论量排序：

| 条目 | 标题 | 评论数 | 链接 |
|------|-------|----------|------|
| Issue #7450 | 主智能体 + 多个子智能体仅在被询问时才检查子智能体状态 | 8 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7450) |
| Issue #7559 | 任务执行过程中发送新消息时报 409 错误 | 5 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7559) |
| Issue #7363 | 同步调用冻结事件循环；超时从未触发（启动 118–135s，每条消息约 126s） | 4 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7363) |
| Issue #6814 *（已关闭）* | 在 macOS 上打开 Scroll history.db 时 sqlite3WalFindFrame 出现 SIGBUS | 4 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/6814) |
| Issue #7513 | deepseek-v4-pro 的回复与 QwenPaw 工具调用混在一起 | 3 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7513) |
| Issue #6541 | scroll 上下文压缩将 `[context compressed]` 注入为 `role=user`，导致 DeepSeek 报错 | 3 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/6541) |
| Issue #7447 *（已关闭）* | 长会话中早期上下文记录完全丢失 | 3 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7447) |
| Issue #7584 | 严重：模型回复从上下文中丢失 → AI 行为循环，反复触发工具调用 | 2 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7584) |
| Issue #7589 | 心跳定时会话反馈循环（约 2 小时无响应） | 1 | [链接](https://github.com/agentscope-ai/QwenPaw/issues/7589) |

**核心诉求**：用户依赖 QwenPaw 处理**长时间运行、多智能体、长上下文的工作流**（OCR 校对、插件开发、文档处理），而平台的**上下文管理、异步协同、可观测性**在这些负载下尚不够稳健。多条高赞话题本质上属于同一类问题——"系统悄悄丢失了状态，要等到模型行为异常时才会被发现。"

---

## 5. 缺陷与稳定性

### 严重 / 高危（尚无修复 PR）

- **[#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584)** / **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)** — 助手回复已持久化，但在后续请求中缺失；模型无法"看到自己的上一条消息"，导致工具调用 → 结果丢失 → 再次调用的循环。已交叉引用。**无 PR。**
- **[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589)** — 心跳定时会话反馈循环导致消息重复堆积；智能体无响应约 2 小时，需手动重启。已在 `main` 分支（2026-09-06）复现，会造成智能体"变砖"。**无 PR。**
- **[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)** — 主智能体仅在用户主动询问时才查询子智能体状态；复杂多智能体任务会出现长时间静默挂起。高评论量话题。**无 PR。**
- **[#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)** — 在 Windows 桌面端（QwenPaw Desktop 2.1.1b1）同步调用阻塞事件循环，启动时 UI 无响应 118–135s，每次发送无响应约 126s；已配置的超时从未触发。**无 PR。**

### 中危（部分已有合并或开放的修复 PR）

- **[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)** — 任务运行期间的后续消息返回 409。**修复 PR： [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577)**（开放中，改为入队而非拒绝）。
- **[#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572)** — `tool_calls/_coordinator.py` 的 `_drain()` 将异常吞为单个字符串，既无 `logger.exception` 也不重新抛出。**修复 PR： [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578)**（开放中）。
- **[#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585)** — Telegram Markdown 表格渲染为原始的 `|`/`---`。**修复 PR： [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590)**（开放中）。
- **[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)** *（已关闭）* — 停止按钮显示已停止但任务仍在执行。
- **[#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594)** *（已关闭）* — 任务执行状态在三个不同时间戳重复触发。
- **[#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548)** *（已关闭）* — 切换会话或重启后导航记录丢失；history.db 内容完整但界面未展示。
- **[#7447](https://github.com/agentscope-ai/QwenPaw/issues/7447)** *（已关闭）* — 长会话（约 160 页文档）中早期上下文完全丢失。
- **[#6814](https://github.com/agentscope-ai/QwenPaw/issues/6814)** *（已关闭）* — 在 macOS 上打开 Scroll history.db 时 SQLite WAL 出现 SIGBUS 崩溃。

### 低危但值得关注

- **[#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513)** — deepseek-v4-pro 的工具调用片段与模型输出交错出现。
- **[#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541)** — Scroll 策略 + DeepSeek：`[context compressed]` 块使用 `role=user`，API 拒绝并返回 `MODEL_EXECUTION_ERROR`。
- **[#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587)** — OpenAI 兼容提供方通过 WUSRouter 列出模型时遭遇 Cloudflare 403。
- **[#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571)** — 智能体反复遗忘用户多次强调的规则，例如 TODO 文件路径以及开发与部署路径的区分。

**规律**：上下文/记忆完整性、多智能体任务生命周期、失败的可观测性是当前稳定性的主要议题。中危缺陷中约有一半已有针对性的 PR（多由首次贡献者提交）——这对维护者带宽来说是一个积极信号。

---

## 6. 功能请求与路线图信号

开放的功能/增强 Issue 及对应的 PR：

| 请求 | 标题 | 纳入下一版本的可能性 | 链接 |
|---------|-------|-------------------------------|------|
| #7588 | 恢复 v2.1.0 工作目录的直接输入 | **高** — PR [#7593](https://github.com/agentscope-ai/QwenPaw/pull/7593) 已开放（首次贡献者） | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7588) |
| #7586 | Telegram：在最终回复后自动清理/隐藏流式中间消息 | **高** — PR [#7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) 已开放 | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7586) |
| #7570 | 飞书流式卡片：最终化后自动折叠推理过程 | **高** — PR [#7591](https://github.com/agentscope-ai/QwenPaw/pull/7591) 已开放（验证 collapsible_panel 可用） | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7570) |
| #7580 | 新增阻塞式工具以等待被委派智能体任务完成（避免 `check_agent_task` 轮询） | **中** — 与 #7450/#7589 之后的多智能体稳定性推进方向一致 | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7580) |
| #7583 | AgentScope 社区联动（登录、收件箱、快速反馈） | **中** — 社区平台型功能，预计 2.3+ | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7583) |
| #7582 | 插件商店 UX：一键升级、更新提醒、减少页面刷新 | **低–中** — 体验优化，可能进入 2.2.x 补丁 | [issue](https://github.com/agentscope-ai/QwenPaw/issues/7582) |
| PR #7502 *（开放中）* | 控制台侧边栏与设置页改版（侧边栏可配置，保留插件注册表） | **中** — 涉及较大 UX 改动，待评审 | [PR](https://github.com/agentscope-ai/QwenPaw/pull/7502) |

**预测**：
- **v2.2.x 补丁版本**很可能合入来自 Bruce-Yii 的三个 Telegram/飞书/目录相关 PR、频道队列修复 [#7547](https://github.com/agentscope-ai/QwenPaw/pull/7547)、懒加载修复 [#7546](https://github.com/agentscope-ai/QwenPaw/pull/7546)，以及消息入队修复 [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577)。
- **v2.3.0 候选方向**与多个用户痛点对齐：阻塞式等待智能体任务的工具（#7580）、心跳反馈循环加固（#7589）、以及上下文丢失/思考折叠机制（[#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521)）。
- **AgentScope 社区集成**（#7583）与**插件商店重构**（#7582）属于更长期的路线图条目。

---

## 7. 用户反馈摘要

**常见痛点（基于真实用例）**：

- *长时间运行的文档工作流*（[7447](https://github.com/agentscope-ai/QwenPaw/issues/7447) 与 [7450](https://github.com/agentscope-ai/QwenPaw/issues/7450) 中提到的 160 页中文 Word OCR 校对）——用户将上下文推到约 100 万 token 后手动压缩，**仍会丢失更早的上下文**，有时在一天之内就会发生。
- *多智能体编排*——用户期望被委派的智能体自动汇报进展；但主智能体一直静默空闲直到被追问，又没有阻塞式等待原语，只能依赖不可靠的轮询（[#7450](https://github.com/agentscope-ai/QwenPaw/issues/7450)、[#7580](https://github.com/agentscope-ai/QwenPaw/issues/7580)）。
- *持久化与界面不一致*——`history.db` 中仍存有内容，但在会话界面中消失（[#7548](https://github.com/agentscope-ai/QwenPaw/issues/7548)、[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)）。
- *v2.1 → v2.2 UX 回退*——工作目录选择器失去直接路径输入、智能体字段不再可编辑等问题被列为体验降级（[#7588](https://github.com

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-07

## 1. 今日概览

ZeroClaw 经历了一个高协作量的一天，过去 24 小时内有 **33 个 issue** 和 **50 个 PR** 更新，表明当前处于活跃的架构阶段而非发版冲刺期。活跃度集中在长期推进的 RFC（会话会话架构、沙箱策略、WASM 插件运行时）以及对 agent 运行时 / ACP-Code 会话路径的加固，应对未完成回合、成本预算漂移和委托所有权缺口等问题。期间没有新版本发布，这与项目正处于 v0.8.5 稳定化分支中周期阶段相吻合（[#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)）。整体项目健康度为 **中等**：修复源源不断地涌入，但 `needs-maintainer-review` 和 `do-not-merge` 的 PR 积压越来越多，说明维护者带宽正成为制约因素。

## 2. 版本发布

过去 24 小时无新版本发布。当前在跟踪的是 **v0.8.5 有限周期的周级稳定化分支**（8 月 4 日冻结 intake，按周切割），在 [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 中跟踪。

## 3. 项目进展

共 6 个 PR 被合并 / 关闭。在 top-20 列表中可见：

- **[#10487](https://github.com/zeroclaw-labs/zeroclaw/pull/10487)** `fix(channels/matrix): resolve transcription providers from live config` — 已关闭。修复 Matrix STT 路径，使类型化 `[providers.transcription.<type>.<alias>]` 条目能够真正注册。（注：是关闭而非合并；后续跟进在 [#10669](https://github.com/zeroclaw-labs/zeroclaw/pull/10669)，新增了 Discord 等价的回归测试；以及 [#10627](https://github.com/zeroclaw-labs/zeroclaw/pull/10627) 针对非零 pre_skip 布局修正了 Matrix `opus_duration`。）
- **3 个已关闭 issue**（轻量级收尾）：[#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575)（通过 `/models` 预热）、[#9653](https://github.com/zeroclaw-labs/zeroclaw/issues/9653)（插件 `wasi:http` 操作系统信任库——安全跟进）、[#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572)（企业微信渠道文档）。

其他推进代码库的进行中 PR（仍为开放状态，但有进展）：
- [#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671) — 修复 [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) 的心跳复合键校验（当日补丁）。
- [#10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668) — Windows 测试选择器范围限定于包区域设置资源，推进 Windows 测试失败清理工作（[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)）。
- [#10652](https://github.com/zeroclaw-labs/zeroclaw/pull/10652) — CLI 内存工厂现在能正确路由 postgres / qdrant 后端。
- [#10669](https://github.com/zeroclaw-labs/zeroclaw/pull/10669) — Discord STT 分发回归测试。

## 4. 社区热议话题

讨论最多的条目都围绕 **会话 / 运行时架构与流程**：

1. **[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** — RFC：运行时主导的会话会话与传输层适配器。**34 条评论**，目前处于第 5 次修订，第 4 次修订的投票被作废。这是仓库中最大的开放架构讨论。
2. **[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** — RFC：面向对话面的统一文件与附件架构。**27 条评论**，第 10 次修订。经过大幅修订；同样呈现出"实质性替换会重启投票"的趋同模式。
3. **[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** — RFC：细粒度沙箱策略（文件系统限制）。**25 条评论**，`in-progress`。存在时间最长的开放 RFC（于 2026-05-28 提出）。
4. **[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** — Bug：Windows 上 74 个测试失败。**19 条评论**，`accepted/in-progress`。强烈表明该项目仍主要以 Linux 为验证平台。
5. **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 跟踪器：维护者决策队列。**15 条评论**。队列本身成为热议话题——关于评审带宽的元讨论。
6. **[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)** — RFC：可组合的 WASM 插件运行时架构。**10 条评论**。值得注意的是它剥离了会话历史相关决策，让位于 [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526) 作为唯一权威。

**潜在需求：** 社区正在推动建立一个统一的会话、附件、事件和沙箱策略模型，能够抵御提供商更迭、渠道多样性和委托深度。头部 RFC 中反复出现的"第 N 次修订"模式表明贡献者正在趋于一致，但达成共识的过程较为缓慢。

## 5. Bug 与稳定性

今日报告 / 仍处于活动状态的 S1（工作流阻塞）issue：

| Issue | 标题 | 修复 PR？ |
|---|---|---|
| [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) | Agent 初始化期间守护进程启动 / 重载可能溢出 | 动态中无匹配 PR |
| [#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421) | 未完成的终止响应被报告为成功 | **是 — [#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)**（XL，`needs-author-action`） |
| [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) | Cron agent 任务没有 wall-clock 超时 | 动态中无 |
| [#10644](https://github.com/zeroclaw-labs/zeroclaw/issues/10644) | 后台委托结果未绑定到所有者主体 | 动态中无 |
| [#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645) | 成本追踪上下文未传递到委托子循环中 | 动态中无 |
| [#10617](https://github.com/zeroclaw-labs/zeroclaw/issues/10617) | 在 Claude Fable 5.1 上 `thinking.display="updates"` 返回 400 | 动态中

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*