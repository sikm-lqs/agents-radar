# OpenClaw 生态日报 2026-09-13

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-12 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-13

## 1. 今日概览

OpenClaw 正处于围绕 2026.9.3 → 2026.9.4 版本线的高活跃但动荡时期。过去 24 小时内，**500 个 issue 和 500 个 PR 被更新**，两个数据流中**约 55% 处于开启状态、45% 已关闭**——关闭率符合稳定项目的特征，但 P0/P1 发布阻塞项上的评论密度表明发布压力显著。**主导主题是更新、升级与恢复可靠性**（在 [roboclaw-bot/opencraw#145252](https://github.com/openclaw/openclaw/issues/145252) 中统一协调），同时伴随反复出现的 **subagent/sessions_yield 编排缺陷**、**进程泄漏与崩溃循环回归**，以及**provider/channel 一致性差距**。今天没有新版本发布；势头集中在 9.4 版本线的 PR 评审与事件分诊上。

## 2. 版本发布

**过去 24 小时内没有新版本发布。** 当前所有 issue 和 PR 引用的发布产物为 **2026.9.2 (3928bad)**、**2026.9.3 (1391f7c)** 和 **2026.9.4 (15285e57a4f, 1391f7c 候选版)**。多位用户报告在 Windows、macOS 和 Linux npm 全局安装上，从 2026.9.3 升级到 2026.9.4 时更新失败（[#145510](https://github.com/openclaw/openclaw/issues/145510)、[#145782](https://github.com/openclaw/openclaw/issues/145782)、[#144739](https://github.com/openclaw/openclaw/issues/144739)）。

## 3. 项目进展

### 已合并/关闭的 PR（今日高信号）
- **[#146384](https://github.com/openclaw/openclaw/pull/146384) — `improve(cron): avoid loading retained history during settlement`**（steipete，已关闭）— 每次清理轮询最多减少 64 个回执 ID 的获取；关闭 [roboclaw/openclaw#146197](https://github.com/openclaw/openclaw/pull/146197)。
- **[#142888](https://github.com/openclaw/openclaw/pull/142888) — `fix(openai-completions): live assistant text doubles when a provider resends full content in one delta`**（Richard355168，等待维护者评审）— 关闭 [#136262](https://github.com/openclaw/openclaw/issues/136262)；防止 OpenAI 兼容 provider 出现消息中段文本重复。
- **[#145639](https://github.com/openclaw/openclaw/pull/145639) — `fix(bonjour): stop ENODEV log bursts when transient interfaces disappear`**（tontoko）— 关闭 [#144796](https://github.com/openclaw/openclaw/issues/144796)；消除来自 Docker/CI 网卡的 mDNS 日志噪音。
- **[#144902](https://github.com/openclaw/openclaw/pull/144902) — `fix: restore media uploads through protected egress`**（roboclaw-bot）— 修复在受保护 egress 代理后端、要求内容长度的目标地址被拒绝上传的问题。
- **[#146356](https://github.com/openclaw/openclaw/pull/146356) — `fix(nextcloud-talk): reject excess concurrent webhook reads`**（eleqtrizit）— 在 Nextcloud Talk webhook 上对认证前读取器并发进行限流（认证失败 DoS 防护加固）。

### 值得关注的开放 PR（等待维护者评审）
- **[#146512](https://github.com/openclaw/openclaw/pull/146512) — `fix: avoid repeated agent database integrity scans`**（P1）— 消除大型 agent 数据库重新打开时的卡顿。
- **[#146542](https://github.com/openclaw/openclaw/pull/146542) — `fix(agents): keep subagent reconciliation scoped and current`** — 从 [#130741](https://github.com/openclaw/openclaw/pull/130741) 中拆分；解决整库快照陈旧问题。
- **[#146491](https://github.com/openclaw/openclaw/pull/146491) — `fix: keep I/O responsive during queued session writes`** — 处理事件循环阻塞类 bug 背后的微任务排空模式。
- **[#146547](https://github.com/openclaw/openclaw/pull/146547) — `refactor(transcripts): run stored lookups in the shared SQLite worker`** — 将 transcript/utterance 读取从 Gateway 事件循环中移出。
- **[#146246](https://github.com/openclaw/openclaw/pull/146246) — `fix(update): preserve migrated default agent across restarts`**（修复 [#146195](https://github.com/openclaw/openclaw/issues/146195)）— 对 9.3→9.4 升级路径的用户尤为重要。
- **[#143234](https://github.com/openclaw/openclaw/pull/143234) — `fix(agents): Code Mode deadline expiry during a tool call is reported as an internal failure`** — 修复进行中工具调用的超时分类问题。
- **[#146516](https://github.com/openclaw/openclaw/pull/146516) — `docs(plugins): remove obsolete Gateway restart guidance`** — 对齐 113 个文档文件；涉及每个 channel/extension/plugin。
- **[#145167](https://github.com/openclaw/openclaw/pull/145167) — `fix(ui): unify chat collapse chevron direction`** — UX 一致性修复。

## 4. 社区热门话题

1. **[#44925 — Subagent 完成结果静默丢失](https://github.com/openclaw/openclaw/issues/44925)**（27 条评论，🦞 diamond lobster）— 多场景下的 subagent 结果丢失：announce 失败（E31/E42/E45）、会话被排空/恢复、以及孤儿清理场景，**超时既无重试也无通知或自动重启**。关联的 [#67777](https://github.com/openclaw/openclaw/issues/67777)（已关闭，16 条评论）在未实现所需的持久化层的情况下被关闭。

2. **[#97616 — 未回收的 hook/tool 子进程 / 僵尸进程累积](https://github.com/openclaw/openclaw/issues/97616)**（28 条评论，🦪 silver shellfish）— OpenClaw 泄漏 `openclaw-hooks`、`bash`、`codex` 等子进程；性能退化随时间复合加重。

3. **[#142585 — 2026.9.3 中 Doctor 拒绝合法的旧版工作区设置](https://github.com/openclaw/openclaw/issues/142585)**（17 条评论，🦐 gold shrimp，P0，ux-release-blocker）— 从 `2026.7.1-2` 升级无法迁移 attestation 状态，阻塞升级路径上的用户。

4. **[#78308 — MCP 工具调用的 channel 介导审批](https://github.com/openclaw/openclaw/issues/78308)**（16 条评论，🦞 diamond lobster，feature）— 要求将现有的 `/approve <id>` shell-exec 模式扩展到会变更外部状态（邮件、vault 写入）的 MCP 工具。表明对插件边界**统一工具授权 UX** 的切实需求。

5. **[#115367 — Provider 拥有的读锁门控将外部聊天插件拒之门外](https://github.com/openclaw/openclaw/issues/115367)**（10 条评论，🦞 diamond lobster，P1）— `enforceMessageActionConversationReadGate`（`origin: bundled`）这一卡点意味着 slack/discord/matrix/msteams/feishu 插件——目前均为外部插件——无法对过往会话上下文执行 provider 拥有的读取。

**底层需求：** 用户希望获得**持久化、可观测、跨 channel 的 subagent 编排**以及**默认安全的插件集成**。前三个讨论本质上指向同一个产品问题：*当工作跨越会话、channel 和进程边界时，OpenClaw 对完成交付和副作用审批提供怎样的保障？*

## 5. Bug 与稳定性（按严重程度及修复 PR 可用性排序）

| 严重程度 | Issue | 标题 | 修复 PR? |
|---|---|---|---|
| **P0 / release-blocker** | [#145252](https://github.com/openclaw/openclaw/issues/145252) | 2026.9.3/9.4 更新与恢复可靠性追踪 | 追踪 issue |
| **P0** | [#145192](https://github.com/openclaw/openclaw/issues/145192) | 2026.9.2 → 9.4 托管更新在 handoff lease 的 candidate-Doctor 阶段失败 | 部分：[#146246](https://github.com/openclaw/openclaw/pull/146246) |
| **P0** | [#145510](https://github.com/openclaw/openclaw/issues/145510) | 更新失败：runtime-verification-failed（2026.9.3 → 9.4） | 暂无可见 |
| **P0** | [#145782](https://github.com/openclaw/openclaw/issues/145782) | 更新失败：repairing（2026.9.3 → 9.4，darwin/arm64） | 暂无可见 |
| **P0** | [#144739](https://github.com/openclaw/openclaw/issues/144739) | 2026.9.3 → 9.4 npm 更新在 schema-17 候选状态下仍运行 9.3 | 暂无可见 |
| **P0** | [#145929](https://github.com/openclaw/openclaw/issues/145929) | 认证 profile 登出/写入因 lock-may-be-busy 永久失败 | 暂无可见 |
| **P0** | [#112475](https://github.com/openclaw/openclaw/issues/112475) | 设备配对移除后恢复失败 | 暂无可见 |
| **P1 / crash-loop** | [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server 初始化超时导致 Gateway 崩溃（"service child cleanup identity lost"） | [#146561](https://github.com/openclaw/openclaw/pull/146561)（仅保留原因） |
| **P1** | [#139847](https://github.com/openclaw/openclaw/issues/139847) | 回复运行进行中时消息被丢弃（"no active tool authority snapshot"） | 暂无可见 |
| **P1** | [#136183](https://github.com/openclaw/openclaw/issues/136183) | 命令执行器派生 ssh 时挂起（2026.8.1 回归） | 暂无可见 |
| **P1** | [#144502](https://github.com/openclaw/openclaw/issues/144502) | WhatsApp 移动端无法播放 TTS 语音消息（48 kHz + Lavf 标签） | 暂无可见 |
| **P1** | [#115367](https://github.com/openclaw/openclaw/issues/115367) | Provider 拥有的读锁门控将外部插件拒之门外 | 暂无可见 |
| **P1** | [#142476](https://github.com/openclaw/openclaw/issues/142476)（已关闭） | Cron 会话清理器阻塞事件循环 14–76s | 已修复（今日关闭） |
| **P1** | [#67777](https://github.com/openclaw/openclaw/issues/67777)（已关闭） | direct-announce 超时时 subagent 完成交付丢失 | 未修复即关闭 |
| **P1** | [#140620](https://github.com/openclaw/openclaw/issues/140620)（已关闭） | 会话 transcript 调和在导入中途卡住 | 已关闭 |
| **P2** | [#106704](https://github.com/openclaw/openclaw/issues/106704) | 叶子节点首轮 `sessions_yield` 以空结果静默终结 | 暂无可见 |
| **P2** | [#118776](https://github.com/openclaw/openclaw/issues/118776) | 叶子 sub-agent 保留 `sessions_yield` 但丢失产出事件的工具 | 暂无可见 |
| **P2** | [#141474](https://github.com/openclaw/openclaw/issues/141474) | Collector 子任务将 `agents_wait` 永久挂起 | 暂无可见 |
| **P2** | [#137332](https://github.com/openclaw/openclaw/issues/137332) | 混合终端 requester-settle 批次无限重试 | 暂无可见 |
| **P2** | [#146096](https://github.com/openclaw/openclaw/issues/146096)（已关闭） | Agent 整文件写入接受了陈旧读取派生内容 | 已关闭 |
| **P2** | [#145266](https://github.com/openclaw/openclaw/issues/145266)（已关闭） | Git/dev Doctor 从 npm 刷新 Codex 并遮蔽 bundled 插件 | 已关闭 |
| **P2** | [#145689](https://github.com/openclaw/openclaw/issues/145689)（已关闭） | 现有 cron 更新被 tool-policy 迁移阻塞 | 已关闭 |
| **P2** | [#100941](https://github.com/openclaw/openclaw/issues/100941)（已关闭） | Gateway 在并行扇出时丢弃并发 tool WebSocket | 已关闭 |
| **P2** | [#141558](https://github.com/openclaw/openclaw/issues/141558) | 即使配置 `every: 0m` 仍持续进行心跳轮询 | 暂无可见 |
| **P2** | [#122019](https://github.com/openclaw/openclaw/issues/122019) | `openclaw update status` 缺少插件可用性与迁移风险信息 | 暂无可见 |
| **P2** | [#145993](https://github.com/openclaw/openclaw/issues/145993) | Codex prompt 注解为已准备内容生成指纹 | 暂无可见 |
| **P2** | [#145192](https://github.com/openclaw/openclaw/issues/145192) | 已在上面列出 | — |
| **P2** | [#138260](https://github.com/openclaw/openclaw/issues/138260) | Doctor runtime-tool-schemas 自检在 Windows 上失败 | 暂无可见 |
| **P2** | [#117243](https://github.com/openclaw/openclaw/issues/117243) | 被列入白名单但被排除在 gateway 启动之外的插件不可见 | 暂无可见 |

**模式信号：** 今日的 crash-loop 与事件循环阻塞类问题（[#142476](https://github.com/openclaw/openclaw/issues/142476)、[#144911](https://github.com/openclaw/openclaw/issues/144911)、[#136183](https://github.com/openclaw/openclaw/issues/136183)、[#100941](https://github.com/openclaw/openclaw/issues/100941)）均可追溯到 **Gateway 事件循环上的同步 SQLite / 子进程清理 / SSH 类 I/O**——这是一个结构性问题，团队目前正通过 [#130741](https://github.com/openclaw/openclaw/pull/130741) → [#146491](https://github.com/openclaw/openclaw/pull/146491) → [#146547](https://github.com/openclaw/openclaw/pull/146547) → [#146512](https://github.com/openclaw/openclaw/pull/146512) → [#146542](https://github.com/openclaw/openclaw/pull/146542) 链路进行整体性处理。

## 6. 功能请求与路线图信号

- **[#78308 — MCP 工具调用的 channel 介导审批](https://github.com/openclaw/openclaw/issues/78308)**（P2，安全 diamond lobster）— 强烈且具体的需求，已提出 `consent envelope` 形态。**鉴于与 [#115367](https://github.com/openclaw/openclaw/issues/115367) 的趋同，很可能是 2026.9.5 / 2026.10 周期内的目标。**
- **[#126876 — 可访问性审计：13 项屏幕阅读器障碍](https://github.com/openclaw/openclaw/issues/126876)**（P0 release-blocker，盲人用户第一手报告）— 具体的 VoiceOver 障碍；其中四项改动即可解锁大部分场景。若有维护者接手，纳入 9.5 的可能性很大；否则会被搁置。
- **[#131457 — 飞书（Lark）的进度流式模式](https://github.com/openclaw/openclaw/issues/131457)**（P3）— 最后一个尚未支持 `streaming.progress` 配置的主要 channel，用于补齐一致性。
- **[#101656 — Telegram 中 detached subagent 静默运行](https://github.com/openclaw/openclaw/issues/101656)**（P2，2 👍）— 为 detached 子任务提供用户可见的存活反馈；契合更广泛的 subagent 可观测性主题。
- **[#77798 — 通过 Canvas 的协作式 Markdown 编辑器](https://github.com/openclaw/openclaw/issues/77798)**（P2，2 👍，今日关闭）— 未实现即关闭；**已延后**。
- **[#78308 / #115367 交叉影响](#)** 暗示近期的**插件安全与授权模型**发布范围。

**预测：** 下一版本线（2026.9.5）最可能交付：(a) 共享 SQLite-worker 重构（[#146547](https://github.com/openclaw/openclaw/pull/146547)、[#146557](https://github.com/openclaw/openclaw/pull/146557)），(b) `sessions_yield` 持久化 / 孤儿重启，(c) 插件 consent-envelope MVP

---

## 横向生态对比

# 跨项目对比报告：开源个人 AI 助手 / Agent 生态
**日期：2026-09-13 | 数据来源：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw 的 24 小时社区摘要**

---

## 1. 生态概览

个人 AI 助手 / agent 开源领域正处于**整合与硬化阶段**：过去 24 小时内五个受跟踪的项目均未发布新版本，活动以可靠性、安全性和互操作性修复为主，而非前瞻性功能。MCP/ACP 显然已胜出，成为通用的工具集成层——但它在四个项目中同样是缺陷的同义来源（OAuth 触发器、非规范信封、中毒连接）。在架构上，整个品类已收敛到**一个常驻网关/守护进程前置多个消息通道**的模式（Telegram、WhatsApp、Slack、飞书、QQ、Discord），这使得持久化状态管理和进程生命周期治理成为品类的核心工程难题。活动量跨两个数量级（OpenClaw 每天约 1,000 条更新 vs. IronClaw 的 2 条），但同样的**信任主题**——静默失败、授权边界、状态持久性——在各处反复出现。

---

## 2. 活动对比

| 项目 | Issues（24h） | PRs（24h） | 发布状态 | 健康度评分* |
|---|---|---|---|---|
| **OpenClaw** | 500 条更新（约 55% 开放） | 500 条更新（约 55% 开放） | 无；2026.9.4 被 P0 更新失败集群阻塞 | **7.0**——吞吐巨大、关闭率 45%，但存在 P0 发布阻塞项和结构性事件循环债务 |
| **Hermes Agent** | 50 | 50（45 开放 / 5 已关闭） | 无；v0.21.2（09-11），0.21.0→0.21.2 共 11 天 | **5.5**——节奏快但 PR 关闭率仅 10%，积压增长，4 个 P1（其中 3 个安全）无修复 |
| **IronClaw** | 0 | 2（1 已合并 / 1 开放） | 无 | **4.0**——稳定但能量极低；信号不足以可靠评分 |
| **QwenPaw** | 17（3 已关闭） | 7（0 合并，全部待评审） | 无；2.2.x 分支处于活跃 beta/stable 硬化期 | **7.5**——关键 bug 到修复 PR 的覆盖率达 100%，首次贡献者流入健康；状态丢失导致的信任侵蚀是拖累 |
| **ZeroClaw** | 24（18 开放 / 6 已关闭） | 50（39 开放 / 11 已合并） | 无 | **7.5**——24 小时内 issue 关闭率 25%，供应链/安全纪律强；S0 数据丢失 bug（#10797）仍未修复 |

\* 由吞吐、关闭/合并率、关键 bug 的修复 PR 覆盖率以及贡献者流入综合得出。

---

## 3. OpenClaw 的位置

**相对同行的优势**
- **规模与社区引力：** 每天约 500 个 issue + 500 个 PR，约为 **Hermes 或 ZeroClaw 的 10 倍，QwenPaw issue 量的 30 倍，IronClaw 的 250 倍**——是本领域最丰富的缺陷发现与验证引擎。
- **最广的通道矩阵：** Slack、Discord、Matrix、MS Teams、飞书、WhatsApp、Telegram、Nextcloud Talk——没有同行能匹配此广度，且 OpenClaw 正在把**通道外置**为插件，而同行仍在硬编码适配器。
- **深度的架构自我修正：** #130741 → #146491 → #146547 → #146512 → #146542 这条链路表明团队正在修复整个**类问题**（Gateway 事件循环上的同步 SQLite/子进程 I/O），而非个别症状。
- **授权模型领先：** #78308 提出的 MCP 工具审批 `consent envelope` 是生态中最为具体的跨通道授权设计；只有 ZeroClaw（ADR-014 出站权限）在明确程度上可比。

**相对同行的劣势**
- **发布可靠性目前是同类最差：** 一个 P0 集群（#145510、#145782、#144739、#142585）导致用户无法在三大操作系统上完成 9.3→9.4 升级——ZeroClaw 的 digest 钉死 + cosign 签名供应链和 Hermes 的 11 天补丁节奏，眼下都显得更可靠。
- **Node/TypeScript 事件循环脆弱性**是结构性税负，而 Rust 的 ZeroClaw 不必承担（其平台代价体现在 Windows 栈深度问题 #10734 上）。
- 一个 P0 可访问性阻塞项（#126876，13 处屏幕阅读器障碍）无主——这是同行目前没有暴露的空白。

**技术路线差异：** OpenClaw = TypeScript Gateway + `sessions_yield` 子 agent 编排 + 外置插件生态。Hermes = Python 网关 + 桌面端为中心的 UX + 本地模型通道。QwenPaw = Python/Docker 单体 + 记忆子系统（ReMeLight）+ 创作者工具链。ZeroClaw = Rust 守护进程/控制平面，带正式 ADR 与供应链签名。IronClaw = 狭窄的企业 Slack 集成聚焦。

---

## 4. 共同的技术关注领域

| 关注领域 | 涉及项目 | 具体证据 |
|---|---|---|
| **持久化状态 / 失败即响应的交付** | 全部 5 个 | OpenClaw #44925（子 agent 完成结果静默丢失）；ZeroClaw #10788（失败的 ACP 回合丢弃已完成的工具历史）、#10797（S0 记忆数据丢失）；QwenPaw #7724/#7708（对话 + 模型配置丢失）；Hermes #102945（静默配置回退，现已修复）；IronClaw #8098（钉死回合状态谱系契约） |
| **MCP/ACP 互操作性** | OpenClaw、Hermes、QwenPaw、ZeroClaw | QwenPaw #7728（Java SDK `jsonRpcError` 信封）、#7727（kimi-code 写入绕过）；Hermes #89412（缺少 401 时 OAuth 永远不触发）；ZeroClaw #10807（一次重试后连接被污染）；OpenClaw #144911（MCP 初始化超时崩溃） |
| **工具授权与安全边界** | OpenClaw、Hermes、QwenPaw、ZeroClaw | OpenClaw #78308/#115367（授权信封、读取网关）；Hermes #39609（审批网关 1 秒竞态）、#109440（跨域 API key 泄漏）、#109422（OAuth 身份串号）；QwenPaw #7726（`trusted:true` 回退到提示词）；ZeroClaw #10726/#10449/#10091（供应链、文件权限） |
| **子 agent / 多 agent 编排** | OpenClaw、Hermes、QwenPaw | OpenClaw `sessions_yield` 集群（#106704、#118776、#141474、#137332）；Hermes #97681（Desktop 关闭后 bot 网格存活，28 条评论）+ #98470（worker 契约）；QwenPaw #7676/#4901（每子 agent 模型） |
| **事件循环阻塞 / 资源生命周期** | OpenClaw、QwenPaw、Hermes | OpenClaw #142476（reaper 阻塞 14–76 秒）、#97616（进程泄漏）；QwenPaw #7721（watchfiles 冻结服务器）、#7722（三路径 OOM）；Hermes #82304（无界任务丢失租用 GPU） |
| **通道对等与语音/TTS** | 全部 5 个 | OpenClaw #144502（WhatsApp TTS 编解码）、#131457（飞书流式）；ZeroClaw #10689（ElevenLabs 括号标签）、#10812（WhatsApp 缩略图）；QwenPaw #7718（Telegram 审批卡片）；Hermes #109423（Telegram 白名单）；IronClaw #8076（Slack 断连状态） |
| **升级 / 打包可靠性** | OpenClaw、Hermes、QwenPaw | OpenClaw 整个 P0 看板；Hermes #94375/#83673（doctor --fix、依赖卫生）；QwenPaw #7582（舰队插件更新） |
| **成本可观测性** | ZeroClaw、QwenPaw | ZeroClaw #10699（缓存写入计费）；QwenPaw #7664→#7719（专用廉价记忆模型） |

---

## 5. 差异化分析

| 项目 | 主要差异化点 | 目标用户 | 架构重心 |
|---|---|---|---|
| **OpenClaw** | 通道广度 + 插件生态 + 规模 | 希望一个助手覆盖全场景的高阶用户与自托管者 | TypeScript Gateway、外置通道插件、`sessions_yield` 编排 |
| **Hermes Agent** | 多 bot 协作 + 本地模型投入 | 折腾本地 LLM、运行多 bot 桌面工作流的人 | Python 网关 + 多路复用 profile + Desktop；VOICEVOX TTS、RFC 8252 移动端 OAuth |
| **IronClaw** | 企业级 Slack 正确性；回合状态谱系契约 | 以 Slack 为中心的企业部署 | 助手/适配层，带显式的 `TurnRunState` 语义 |
| **QwenPaw** | 中文通道覆盖（飞书/QQ/OneBot）+ 记忆子系统 + 创作者工作流 | 中文市场用户；维护型 agent 舰队；内容创作者 | Python/Docker 单体，ReMeLight 记忆，统一 MCP/ACP/A2A 驱动愿景 |
| **ZeroClaw** | 安全与供应链严格度；正式治理 | 注重安全的自托管者 | Rust 守护进程 + 控制平面；cosign 签名镜像、ADR 流程、成本账本 |

最尖锐的分野是**集成广度优先（OpenClaw、QwenPaw）vs. 信任与正确性优先（ZeroClaw、IronClaw）**，而 Hermes 走的是**多 agent/本地推理**这条其他人都未占据的赛道。

---

## 6. 社区动能与成熟度

- **第一梯队——规模巨大/成熟但承压：** **OpenClaw。** 高体量与高关闭率，但发布压力（9.4 阻塞项）和事件循环债务显示了广度的代价。
- **第二梯队——活跃硬化：** **ZeroClaw**（24 小时内 issue 关闭率 25%；合并的 PR 全是纪律导向：digest 钉死、权限、CI 夹具）和 **Hermes**（0.21.x 节奏快，但 50 个 PR 中仅 5 个关闭——积压增长快于清理）。
- **第三梯队——新分支上的快速迭代：** **QwenPaw。** 2.2.x beta→stable 周期展示了最快的**功能**节奏，24 小时内每个关键 bug 都已带修复 PR——这是集合中最好的分诊纪律比。
- **第四梯队——安静稳定：** **IronClaw。** 零 issue，一个合并的正确性修复，一个测试硬化 PR；要么是成熟且稳定，要么是躺平——信号不足以区分。

**快速迭代中：** QwenPaw、Hermes。**稳定硬化中：** ZeroClaw、OpenClaw。**低能量/休眠：** IronClaw。

---

## 7. 趋势信号

1. **持久性是品类的信任货币。** 每个项目最热的讨论都涉及静默丢失的工作——子 agent 完成结果（OpenClaw）、回合历史（ZeroClaw）、对话（QwenPaw）、定时任务（Hermes）。*开发者启示：* 在添加功能之前先设计错误路径上的状态保留与失败即响应通知；"不重试、不通知、不自动重启"（OpenClaw #44925）是用户惩罚的反面模式。
2. **工具副作用的授权 UX 是下一个竞争前沿。** OpenClaw 的授权信封、ZeroClaw 的 ADR-014、Hermes 的审批网关竞态、QwenPaw 的 ACP `trusted:true` 失败，全部指向同一方向：**针对状态变更工具的、统一的、通道中介的审批**正在成为购买决策标准，而非锦上添花。
3. **MCP 赢了协议之战；互操作严格度决定谁在 MCP 上取胜。** 真实部署撞上了 Java SDK 信封、kimi-code schema、非 401 的 OAuth、瞬时失败的中毒。对远程 MCP 服务器不做任何规范化假设。
4. **多 agent 正从进程内扇出走向持久的、跨网关的网格**（Hermes #97681/#98470；OpenClaw sessions_yield）。跨进程/会话边界的完成交付保证是未解决的核心问题。
5. **运行时架构会泄漏到 bug 列表中。** Node/Python 事件循环上的同步 SQLite 与子进程清理会生成整个 bug **类**（OpenClaw、QwenPaw、Hermes）；Rust 把代价转移到了平台对等性（Windows 栈深度、拆解竞态）。从第一天起就把 I/O 卸载出主循环。
6. **成本可观测性正作为功能登场**（ZeroClaw 的账本、QwenPaw 的专用记忆模型）——用户越来越把"思考模型"和"后台模型"的支出分开。
7. **更新可靠性成为新的部署难题。** 在规模下，自更新守护进程（OpenClaw 的 P0 看板、Hermes doctor、QwenPaw 舰队请求）需要与运行时本身同等的严格度。
8. **通道特殊性是永久的工程负担**——ElevenLabs 括号标签、WhatsApp 编解码/缩略图、Telegram 解析模式——这论证了 OpenClaw 风格的外置适配器，而非内嵌在主干中的实现。
---
*结论：OpenClaw 在规模与广度上仍是生态的重心，但在 2026-09-13 它是集合中可信度最低的升级者；ZeroClaw 与 QwenPaw 展示了单位活动下最佳的工程纪律；Hermes 在押注多 bot + 本地模型；IronClaw 在统计意义上是沉默的。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — 项目摘要 (2026-09-13)

## 1. 今日概览

Hermes Agent 在过去 24 小时内呈现**高频维护性变更**，涉及 50 个 issue 和 50 个 PR，但未发布新版本。信号主要由**缺陷修复和安全加固**主导，而非前瞻性的功能开发：新开启的条目中有相当比例被标记为 `duplicate`（重复），并且围绕多路复用配置文件以及 OAuth/MCP 集成出现了若干 P1 安全边界问题。开发节奏健康（45 个开放 PR 涵盖 CLI、gateway、cron、agent、MCP 和 Desktop），但**已关闭 PR 仅 5 个**，且 issue 待办仍在持续增长。项目健康度读数为"积极清理历史债务"，而非"交付新能力"。

## 2. 版本发布

**过去 24 小时内无新版本发布。**新报告中引用的最新已标记基线为 Hermes Agent **v0.21.2**（`1021a032`，日期 2026-09-11）；早先的 **v0.21.0**（2026-08-31）仍是多个待修复 bug 的复现基准版本。

## 3. 项目进展

本窗口期内关闭了 5 个 PR，其中两项是明确的面向用户的修复：

- **[#109463](https://github.com/NousResearch/hermes-agent/pull/109463)** — *fix(config): recover last good config.yaml instead of defaults.* 重新关闭了一个长期存在的容错缺口（issue [#102945](https://github.com/NousResearch/hermes-agent/issues/102945)），即格式错误的 `config.yaml` 会静默回退到默认值并擦除用户自定义配置。
- **[#109299](https://github.com/NousResearch/hermes-agent/pull/109299)** — *fix(cli): unroute the old name before renaming a multiplexed profile.* 解决了在 gateway 进行多路复用时，`rename_profile` 留下的"幽灵已服务配置"问题。

另有 2 个关闭的 PR 被标记为 **duplicate**，3 个关闭的 issue（如 [#101975](https://github.com/NousResearch/hermes-agent/issues/101975)、[#109448](https://github.com/NousResearch/hermes-agent/issues/109448)、[#108883](https://github.com/NousResearch/hermes-agent/issues/108883)）属于测试/清理类条目，而非用户可见的回归问题。

**进行中（尚未合并）的功能工作：**

- **[#98470](https://github.com/NousResearch/hermes-agent/pull/98470)** — `feat(agent): validated worker collaboration contracts`（大型跨模块 agent/gateway/cron/Desktop 变更，标记 needs-decision）。
- **[#108914](https://github.com/NousResearch/hermes-agent/pull/108914)** — `feat: Bot Screen` — 将每个 bot 的 Xfce 桌面串流至 Hermes Desktop，用于人机共享会话（needs-decision）。
- **[#103353](https://github.com/NousResearch/hermes-agent/pull/103353)** — 高级本地模型运行时与 gateway 路由（needs-decision）。
- **[#109281](https://github.com/NousResearch/hermes-agent/pull/109281)** — Desktop TTS 的句子级 VOICEVOX 流式输出。
- **[#109467](https://github.com/NousResearch/hermes-agent/pull/109467)** — 为 RFC 8252 原生 OAuth 加入白名单自定义 scheme 重定向 URI（打通 iOS/Android 原生登录）。
- **[#109457](https://github.com/NousResearch/hermes-agent/pull/109457)** — 新增 ClixRx 处方折扣 MCP 目录条目。
- **[#99757](https://github.com/NousResearch/hermes-agent/pull/99757)** — *fix(security): scope `key_cmd` subprocess environment* — 重要的加固变更，防止助手子进程继承无关提供商的凭证。

## 4. 社区热点话题

互动最高的讨论线程呈现一个共同模式：**静默失败或信任边界缺陷，使用户面对系统如同面对黑盒。**

| 条目 | 标题 | 评论数 | 热度原因 |
|---|---|---|---|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Bot Group Chats should keep working after Desktop closes | **28** | 当日最高流量线程。希望不同 gateway 上的 bot 在没有 Desktop 实例充当常驻宿主的情况下仍可持续协作——多设备持久化的 bot mesh 用例。 |
| [#109243](https://github.com/NousResearch/hermes-agent/issues/109243) | cron: external-worker handoff requires 5s ack but cold start is ~12s | **17** | 可复现的定时任务丢失；工程师们正在权衡 ack 与握手机义。 |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | `--initial-status blocked` tasks auto-promote to `ready` ~1s later, no actor recorded | **16** | 存在 1 秒确定性竞态的审批绕过——P1，因为它使一项安全/运维承诺失效。 |
| [#94375](https://github.com/NousResearch/hermes-agent/issues/94375) | `hermes doctor --fix` leaves npm apps insecure | **7** | 用户对包管理卫生的挫败感；用户 `@eabase` 持续推动，也是 [#83673](https://github.com/NousResearch/hermes-agent/issues/83673) 和 [#102563](https://github.com/NousResearch/hermes-agent/issues/102563) 的发起者。 |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | `hermes config set` bypasses system-config write protection | **6** | CLI 通过"正门"写入了原本通过 shell 写入会被阻止的内容——削弱了审批层。 |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) | MCP OAuth flow never triggers for servers that don't 401 first (e.g. Gmail MCP) | **6** | 与一款标杆 Google MCP 服务器的真实集成缺口。 |

**底层诉求：** 用户希望在配置、调度和多配置文件 OAuth 全场景下获得**响亮失败、彼此隔离、可恢复**的行为，并希望 bot 工作流能在客户端断连后存活。

## 5. 缺陷与稳定性

按严重度排序（P1 优先），其后按活跃度。已开放的修复 PR 在表格中注明。

**P1 — 严重 / 安全 / 数据正确性**

| Issue | 标题 | 修复 PR |
|---|---|---|
| [#109440](https://github.com/NousResearch/hermes-agent/issues/109440) | `hermes chat -q -m <alias>` 将 alias 的 API key 发往默认提供商的 host（跨域凭证泄露），v0.21.2 | 无开放 PR |
| [#109422](https://github.com/NousResearch/hermes-agent/issues/109422) | 共享同一 OAuth MCP server URL 的多路复用配置文件会静默互用对方身份 | 无开放 PR |
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | `--initial-status blocked` ~1 秒后自动提升为 `ready`，无 actor——审批门被绕过 | 无开放 PR |
| [#107191](https://github.com/NousResearch/hermes-agent/issues/107191) | CLI 启动时丢失 `model_aliases:` 自定义 `base_url` → 收到 OpenRouter 的 401 | 无开放 PR |

**P2 — 高**

| Issue | 标题 | 修复 PR |
|---|---|---|
| [#109243](https://github.com/NousResearch/hermes-agent/issues/109243) | cron external-worker handoff 的 5s ack 与 ~12s 冷启动不匹配——任务间歇性不执行 | 无开放 PR |
| [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | `hermes config set` 绕过 system-config 写保护 | 无开放 PR |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) | 非 401 服务器（Gmail MCP）无法触发 MCP OAuth 流程 | 无开放 PR |
| [#102945](https://github.com/NousResearch/hermes-agent/issues/102945) | 无法解析的 `config.yaml` 静默回退到默认值 | **[#109463](https://github.com/NousResearch/hermes-agent/pull/109463)**（已合并）✅ |
| [#109258](https://github.com/NousResearch/hermes-agent/issues/109258) | Telegram UI 中 `/save md …` 失败（`'GatewayRunner' object has no attribute 'get_adapter'`） | 无开放 PR |
| [#108302](https://github.com/NousResearch/hermes-agent/issues/108302) | Managed Tool Gateway 在每个 bot 配置上都不可用（鉴权回退被跳过） | 无开放 PR |
| [#96610](https://github.com/NousResearch/hermes-agent/issues/96610) | 受限后端（Kimi）上 `tool_call` bridge 参数到达为空 | 无开放 PR |
| [#95078](https://github.com/NousResearch/hermes-agent/issues/95078) | 嵌套 Hermes 继承了过期的 `TERMINAL_CWD` | 无开放 PR |
| [#90679](https://github.com/NousResearch/hermes-agent/issues/90679) | Docker 终端后端：新建桌面会话失败，`cd: D:\.hermes: No such file or directory` | 无开放 PR |
| [#109215](https://github.com/NousResearch/hermes-agent/issues/109215) | Native memory 阶段会写入本已失效的提案 | **[#109280](https://github.com/NousResearch/hermes-agent/pull/109280)**（补充修复） |
| [#108659](https://github.com/NousResearch/hermes-agent/issues/108659) | 当 `extra_body` 强制 `cache_prompt` 时，Vision 轮次可能返回上一请求的答案 | 无开放 PR |
| [#109423](https://github.com/NousResearch/hermes-agent/issues/109423) | Telegram `allowed_chats` 以 JSON 字符串存储导致解析错误 → 群组消息被静默丢弃 | 无开放 PR |

**P3 — 显著**

| Issue | 标题 | 修复 PR |
|---|---|---|
| [#109452](https://github.com/NousResearch/hermes-agent/issues/109452) | Kanban 在每个 dispatcher tick 重复提升非粘性的已阻塞卡片——30 分钟内跑了 30 次 | 无开放 PR |
| [#94375](https://github.com/NousResearch/hermes-agent/issues/94375) | `hermes doctor --fix` 失败；留下不安全的 npm 应用 | 无开放 PR |
| [#84235](https://github.com/NousResearch/hermes-agent/issues/84235) | 同一会话的并发轮次基于过期快照执行 → 重复副作用 | 无开放 PR |
| [#82304](https://github.com/NousResearch/hermes-agent/issues/82304) | 无人值守的自主任务缺乏资源生命周期；丢失租用的 GPU 与已完成的工作 | 无开放 PR |

**小结：** 当日开启或活跃的 P1 共 4 个，**均无已合并或开放的修复 PR**（仅配置恢复一项刚刚落地）。P1 集群集中在 `gateway.multiplex_profiles` 与 CLI alias 路径下的**凭证泄露 / 身份隔离失败**——这些应作为下一补丁版本的最高优先级。

## 6. 功能请求与路线图信号

- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681)**（P2，28 评论）— **Desktop 关闭后仍能存活的 Bot 群聊**、多 gateway bot 协作、bot 间文件交接。这是本窗口内最强的路线图信号，并与正在进行的 Bot Screen 工作 **[#108914](https://github.com/NousResearch/hermes-agent/pull/108914)** 直接契合。可能成为 0.22 功能。
- **[#83673](https://github.com/NousResearch/hermes-agent/issues/83673)** / **[#102563](https://github.com/NousResearch/hermes-agent/issues/102563)** — 用户推动建立**发布期依赖卫生门禁**（npm outdated + npm audit）以及 venv 过期报告。抱怨的模式提示维护者应当落地 CI 检查；相对低成本的收益。
- **[#103353](https://github.com/NousResearch/hermes-agent/pull/103353)** — 高级本地模型运行时控制 + 安全的 gateway 发布（KV cache 类型、MTP、推理槽位、planner）。预示"自托管优先"的路线方向。
- **[#109281](https://github.com/NousResearch/hermes-agent/pull/109281)** — Desktop 的句子级 VOICEVOX 流式输出 → 预示对**低延迟、多语种 Desktop TTS** 的投入。
- **[#109467](https://github.com/NousResearch/hermes-agent/pull/109467)** — 允许自定义 scheme 的 OAuth 重定向 → 打通**原生移动端登录**（平台扩展信号）。
- **[#98470](https://github.com/NousResearch/hermes-agent/pull/98470)** — worker 协作契约（证据、目标、能力、共识）→ 多 agent 协调正在协议层被正式化。

**下一版本预测（0.21.3 / 0.22.0）：** 预计将包含多路复用配置文件的凭证/OAuth P1 集群（[#109440](https://github.com/NousResearch/hermes-agent/issues/109440)、[#109422](https://github.com/NousResearch/hermes-agent/issues/109422)、[#108302](https://github.com/NousResearch/hermes-agent/issues/108302)），以及 cron 握手（[#109243](https://github.com/NousResearch/hermes-agent/issues/109243)）与阻塞任务竞态（[#39609](https://github.com/NousResearch/hermes-agent/issues/39609)）的修复。Bot Screen（#108914）和 worker contracts（#98470）规模过大，很可能不会进入补丁版本。

## 7. 用户反馈汇总

**反复出现的痛点：**

1. **静默失败。** 在配置（[#102945](https://github.com/NousResearch/hermes-agent/issues/102945)）、Telegram 白名单（[#109423](https://github.com/NousResearch/hermes-agent/issues/109423)）、模型自动修正（[#101975](https://github.com/NousResearch/hermes-agent/issues/101975)，已关闭）、MCP OAuth（[#89412](https://github.com/NousResearch/hermes-agent/issues/89412)）、视觉缓存（[#108659](https://github.com/NousResearch/hermes-agent/issues/108659)）等场景中，用户抱怨 Hermes 至多只输出一行 stderr 便丢弃了行为。新近合并的 **#109463 "last good config" 恢复**直接回应了其中最响亮的一项诉求。
2. **审批层 / 信任边界的不一致。** 用户主动指出不对称：同样的变更，通过 shell 被阻止，通过 `hermes config set` 却不被阻止（[#59293](https://github.com/NousResearch/hermes-agent/issues/59293)）；一个配置文件的 OAuth 身份被另一个静默采用（[#109422](https://github.com/NousResearch/hermes-agent/issues/109422)）；alias 的 API key 被发送到错误的 host（[#109440](https://github.com/NousResearch/hermes-agent/issues/109440)）。这是 issue 流中**最大的信任顾虑**。
4. **Cron / Kanban 可靠性。** 多条高互动条目（#109243、#39609、#109452、#82304、#109468）描述了任务不执行、执行过多或绕过审批门的情况。多位用户报告**丢失租用的 GPU 和已完成的工作**——切实的资金损失。
5. **依赖卫生。** 用户 `@eabase` 持续发起运动（#83673、#94375、#102563），聚焦过期的 venv 包以及 `hermes doctor --fix` 不可用。这是本窗口内**最显眼的满意度下滑信号**。
6. **tool-call 易用性。** 各提供商的特定故障（#96610 Kimi、#108659 llama.cpp 视觉、#107191 自定义 `base_url`）表明**自定义提供商表面对后端怪癖很脆弱**。

**满意度信号：** 高互动功能线程 [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)（28 评论）与 Bot Screen PR [#108914](https://github.com/NousResearch/hermes-agent/pull/108914) 显示了对多 bot / 共享桌面方向的高度热情。

## 8. 待办观察

重要性高但**今天尚无修复或维护者响应可见**的条目：

- **[#39609

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-13

## 1. 今日概览

IronClaw（nearai/ironclaw）在过去 24 小时内活跃度较低，仅有两个 Pull Request 被更新，没有新 Issue 或发布记录。已合并的 PR（#8076）修复了 assistant/Slack 集成中关于"已断开共享频道"的分类问题，表明团队仍在持续打磨多频道消息行为。新开启的测试类 PR（#8098）用于锁定 turn run 中由状态派生的 lineage 元数据行为。整体项目推进节奏平稳但偏缓，工作集中在测试覆盖与集成正确性上，而非新功能开发。

## 2. 发布

过去 24 小时内无新版本发布。

## 3. 项目进展

**已合并/关闭的 PR（1 个）：**

- **PR #8076 — fix(assistant): distinguish disconnected shared channels**（[链接](https://github.com/nearai/ironclaw/pull/8076)）— *作者：be-student*
  - 区分已配对用户的"已断开共享频道"与未配对账户，避免歧义的拒绝状态。
  - 为用户消息与机器人命令分别补充频道专属的引导文案。
  - 在产品 UI、适配器层以及 OpenAI 兼容接口之间保持一致的拒绝分类。
  - 更新 Slack 能力清单以反映新行为。
  - **影响：** 提升了 Slack 集成路径的正确性与用户体验，减少断连场景下的误判。

## 4. 社区热点

过去 24 小时内社区互动偏少，无论是开启还是关闭的 PR 均无评论或反应（两者 👍 均为 0）。值得关注的工作：

- **PR #8098 — test(turns): pin state-derived lineage drop**（[链接](https://github.com/nearai/ironclaw/pull/8098)）— *作者：huiq777，状态：开启*
  - 在已有的 terminal-rewrite lineage 测试基础上，新增一个反向回归测试。
  - 断言 claim 的元数据初始时携带 `depth`、激活来源以及后代上限，而随后由 `TurnRunState` 派生的快照会刻意省略这三项 lineage 字段。
  - **背后诉求：** 锁定状态派生快照中刻意省略的字段，防止 lineage 传播出现隐性回归——这表明团队正在围绕 turn 执行语义强化内部契约。

## 5. 缺陷与稳定性

过去 24 小时内没有新的崩溃、缺陷或回归报告提交或更新。有一项缺陷类修复已合并：

- **PR #8076**（已合并）— 修复了一处误分类：已断开的共享频道此前未能与未配对账户正确区分。这是 assistant 在 Slack/频道处理路径上的一项正确性修复；严重程度评估为中等（用户可见但非崩溃级），未衍生新的后续 Issue。

## 6. 功能请求与路线图信号

过去 24 小时内未提交任何新功能请求或 Issue，因此无法从用户新需求中推断路线图信号。当前唯一活跃的 PR（#8098）属于测试加固，而非面向用户的功能。本周期不做预测性评述。

## 7. 用户反馈摘要

无直接用户反馈可总结——过去 24 小时内没有 Issue 提交，也无 PR 评论或反应。活跃度的缺失限制了对当前用户情绪的洞察。PR #8076 的合并表明维护者（或贡献者）识别到了"已断连频道"用户体验上的内部摩擦，这类问题可能源于本快照窗口之外的早期用户反馈。

## 8. 待办关注

- **PR #8098**（[链接](https://github.com/nearai/ironclaw/pull/8098)）— 新开启的测试 PR，零评论/零反应；建议由维护者复核，确认所锁定的不变式与预期 turn-state 契约一致后再合并。
- **PR #8076**（[链接](https://github.com/nearai/ironclaw/pull/8076)）— 今日已关闭/合并；建议在生产遥测中验证拒绝分类在各端的一致性，并确认 Slack 清单更新是否需要下游消费者协同。

本 24 小时窗口内不存在长期未回复的 Issue。维护者的关注重点建议放在确认 #8098 的测试不变式，以及对 #8076 的合并后验证上。

---

**2026-09-13 汇总指标：**
- 活跃 Issue：0 | 活跃 PR：1 | 关闭 PR：1 | 发布：0
- 项目活跃度：**低** — 工作集中在测试覆盖与集成正确性上。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目日报 — 2026-09-13

## 1. 今日概览

QwenPaw (agentscope-ai/QwenPaw) 分类处理活动显著增加,**过去 24 小时内有 17 个 issue 和 7 个 PR 更新**,但未发布新版本。活跃度集中在近期发布的 **2.2.x 系列**(beta.1、beta.2,以及 Desktop 上的稳定版 2.2.1)上,多个回归报告——模型配置丢失、MCP 连接中断、大工作区下的服务器冻结——与对应的修复 PR 一同浮现。整体模式是健康的:今天提交的每个高严重性 Bug 都有对应的开放 PR 试图合入下一个 2.2.x 补丁,表明发布管线正在积极分类。社区参与度(评论数)为中等,但集中在少数反复出现的痛点上(模型持久化、插件商店 UX、MCP 互操作性)。

## 2. 发布版本

过去 24 小时内未发布新版本。issue 中讨论的最新标签版本包括:
- **2.2.1-beta.2**(Desktop, Windows 10)— 在 #7715、#7676 中提及
- **2.2.1-beta.1** / **2.2.1b1**(Console)— 在 #7676、#7720 中提及
- **2.2.1**(Desktop)— 在 #7708、#7721、#7724 中提及
- **2.2.0**(Desktop, macOS arm64;Docker `agentscope/qwenpaw:latest`)— 在 #7726、#7727、#7728、#7717、#7722 中提及
- **2.1.1b3** — 在 #7716 中提及,是 MCP 可用的最后一个版本

## 3. 项目进展

今日无 PR 被合并或关闭;全部 7 个开放 PR 都是首次或后续贡献,等待评审:

| PR | 标题 | 领域 | 状态 |
|---|---|---|---|
| [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) | fix(acp): select permission options by protocol kind | ACP 客户端 | OPEN — 修复 #7726 |
| [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) | fix(mcp): recognize Java jsonRpcError envelope on discover probe | MCP 驱动 | OPEN — 修复 #7728 |
| [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) | fix(workspace): replace blocking watchfiles.awatch SSE watcher with threaded polling | Workspace SSE | OPEN — 修复 #7721 |
| [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) | fix(console): emit an error event when stream_one fails | Console SSE | OPEN — 首次贡献者 |
| [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | feat(memory): allow a separate model for ReMeLight memory writing | Memory/ReMe | OPEN — 实现 #7664 |
| [#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718) | fix(telegram): render approval-card markdown via HTML parse_mode | Telegram 渠道 | OPEN — 首次贡献者 |
| [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) | fix(agents): diagnose dropped subagent model overrides | Subagent 派生 | OPEN — 首次贡献者,修复 #7676 |

**今日关闭的三个 issue(#7676、#7582、#7664)** 都已在开放队列中找到对应的实现 PR,呈现出干净的"转 PR"模式。

## 4. 社区热点话题

过去 24 小时内按评论数排名的热门 issue:

1. **[#7484 — A2A 在 2.x 上的支持时间线](https://github.com/agentscope-ai/QwenPaw/issues/7484)**(3 条评论)。用户询问与 MCP/ACP 一同在统一 Driver 机制下承诺的 A2A 协议何时发布。显示出对超越 MCP 的**多协议 Agent 互操作性**的需求。
2. **[#7708 — 使用过程中已配置的 LLM 模型消失](https://github.com/agentscope-ai/QwenPaw/issues/7708)**(3 条评论)。Desktop 2.2.1 用户报告模型选择在会话中途静默丢失。该问题在 #7724 中也有体现,且历史上反复出现——表明存在**持续的状态持久化缺陷**。
3. **[#7715 — arxiv 不可达时 Daily Paper 静默失败](https://github.com/agentscope-ai/QwenPaw/issues/7715)**(3 条评论)。暴露了 `reme_daily_paper` 中缺失的代理/端点配置;展示的错误信息具有误导性。底层需求:定时后台任务的**优雅降级 + 对运维可见的诊断信息**。
4. **[#7676 — `subagent_model` 无效(已关闭)](https://github.com/agentscope-ai/QwenPaw/issues/7676)**(3 条评论)。派生的 subagent 始终继承父级的 `active_model`。目前已有诊断 PR #7680。反映出对**按任务/按 subagent 选择模型**的需求(相关 issue #4901 仍处于开放状态)。
5. **[#7582 — 插件商店 UX 缺少批量操作(已关闭)](https://github.com/agentscope-ai/QwenPaw/issues/7582)**(2 条评论)。多机器的重度用户希望支持一键更新和更新通知。底层需求:跨机队部署 **QwenPaw-as-maintenance-agent** 时的可管理性。

## 5. Bug 与稳定性

按严重性和影响排名:

**🔴 严重(服务器阻塞或数据丢失)**
- **[#7721 — Workspace 文件浏览器冻结整个服务器](https://github.com/agentscope-ai/QwenPaw/issues/7721)**(Docker, v2.2.1)。`watchfiles.awatch` 在其 `__init__` 中执行同步的递归基线扫描,阻塞事件循环并挂起 WebUI 及所有渠道(飞书/QQ/OneBot)。**修复 PR:** [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725)——替换为线程轮询。
- **[#7722 — 通过三条复合路径导致的内存耗尽](https://github.com/agentscope-ai/QwenPaw/issues/7722)**(v2.2.0, Docker)。容器以约 1 MB/s 的速度被填满,然后发生 OOM。作者记录了受控复现和最小修复方案,涉及:无界流缓冲区、keep-alive 实例堆叠、doom-loop 绕过。**暂无修复 PR。**

**🟠 高(功能回归)**
- **[#7728 — Java MCP SDK 服务端返回 `server/discover` HTTP 500](https://github.com/agentscope-ai/QwenPaw/issues/7728)**(v2.2.0, macOS)。非标准的 `jsonRpcError` 信封被 `_unwrap_jsonrpc_result` 拒绝。**修复 PR:** [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)。
- **[#7716 — 2.2.x 以来 MCP 无法连接/注册](https://github.com/agentscope-ai/QwenPaw/issues/7716)**。qwenpaw-hub 在 2.1.1b3 上工作正常;升级后失效。与 #7728 互为关联。
- **[#7724 — 对话丢失 + 级联模型丢失](https://github.com/agentscope-ai/QwenPaw/issues/7724)**(Desktop 2.2.1, Win10)。一个晚上 9 点的会话在插件重装 + 关机的循环后消失;相关的模型配置丢失问题再次出现(#7708)。**暂无修复 PR。**
- **[#7676 — `subagent_model` 覆盖被丢弃 — 已关闭](https://github.com/agentscope-ai/QwenPaw/issues/7676)**。**诊断 PR:** [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680)。

**🟡 中(安全/UX 正确性)**
- **[#7727 — 通过 kimi-code ACP 绕过工作区外写入的硬性阻止](https://github.com/agentscope-ai/QwenPaw/issues/7727)**(v2.2.0, macOS)。`_paths` 提取遗漏了 kimi 的 toolCall 字段。**暂无修复 PR。**
- **[#7726 — ACP `trusted:true` 静默回退到交互式提示](https://github.com/agentscope-ai/QwenPaw/issues/7726)**(v2.2.0)。`_pick_allow_option` 仅匹配 `allow_*` 形式的 optionId,遗漏了 `approve_once` 风格的 id。**修复 PR:** [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)。
- **[#7720 — Creator 将提示词同步阻塞器隐藏在 `GATED` 后且缺少手动图像确认](https://github.com/agentscope-ai/QwenPaw/issues/7720)**(Console 2.2.1b1, Creator 1.2.0)。阻塞了推进至分镜图。**暂无修复 PR。**
- **[#7715 — Daily Paper 静默失败](https://github.com/agentscope-ai/QwenPaw/issues/7715)**(前文已提及)。
- **[#7708 — 已配置的 LLM 模型消失](https://github.com/agentscope-ai/QwenPaw/issues/7708)**(前文已提及)。
- **[#7718 等价问题:Telegram 审批卡片渲染原始 markdown](https://github.com/agentscope-ai/QwenPaw/pull/7718)** — 修复 PR 已开放。

## 6. 功能请求与路线图信号

| 请求 | Issue | 是否可能是下一版本候选? |
|---|---|---|
| 在统一 Driver 下的 A2A 协议(MCP/ACP 的对等协议) | [#7484](https://github.com/agentscope-ai/QwenPaw/issues/7484) | 高 —— 已在 2.x 架构文档中承诺;其缺失相当显眼。 |
| 为 ReMeLight(摘要/dream)设置独立的 `memory_model` | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664)(已关闭) | **已在进行中** —— [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719)。 |
| DeepSeek 原生能力元数据、提示前缀稳定性、KV-cache 可观测性 | [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) | 中 —— 属于 provider 层级的改动,可能落在 2.3+,除非被合并。 |
| 文件面板:可切换显示点前缀文件 | [#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731) | 低工作量,**可能进入 2.2.2 / 2.3**。 |
| 插件商店:批量更新 + 更新通知 | [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)(已关闭) | **未关联 PR** —— 需要维护者认领。 |
| 按任务选择模型(subagent 模型实际生效) | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)(已关闭)、[#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)(开放) | **诊断 PR 已开放**(#7680);完整功能可能落在 2.3。 |
| 插件目录离线回退(真正的实现) | [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730) | 中 —— 鲁棒性诉求。 |

**预测:**最现实的 **2.2.2 补丁**很可能打包 [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725)、[#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)、[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)、[#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718)、[#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723),并可能包含 [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719)。A2A 支持和插件商店批量操作最有可能落在 **2.3**。

## 7. 用户反馈汇总

- **重度用户/机队运维的痛点(#7582):** 在多台机器上以 QwenPaw-as-maintenance-agent 方式运行,暴露出缺乏批量插件管理;在机队规模下,手动逐个更新不可行。
- **成本敏感型用户的痛点(#7664 → #7719):** 在聊天场景使用旗舰 LLM 的用户,为后台 memory 写入支付了高昂的 token 成本;明确要求使用更便宜的专用 memory 模型。
- **后台任务的可靠性(#7715、#7722):** 运行定时任务(Daily Paper、Memory)的运维人员报告出现静默失败和无界资源增长;需要**透明的状态 + 有界的资源**。
- **持久化/状态丢失的挫败感(#7708、#7724):** 多位 Desktop 用户在无明显原因的情况下既丢失了模型选择也丢失了对话历史,指向一个**损害信任的状态管理缺陷**,该缺陷已在多个版本中出现。
- **多协议互操作(#7484、#7716、#7727、#7728):** 实际部署中将 MCP/ACP 与异构 SDK(Java/Kotlin、kimi-code)对接时,暴露出 QwenPaw 的 MCP/ACP 代码路径假设了规范化的编码方式和单一的工具 schema 词汇。
- **首次贡献者活动健康:** #7723、#7718、#7680 都是 `[first-time-contributor]` 的 PR,与经验丰富的维护者并行落地——这是一个积极的社区健康信号。

## 8. 待办观察

如不及时认领,最可能滑落的事项:

- **[#7484 — A2A 支持](https://github.com/agentscope-ai/QwenPaw/issues/7484)** — 高访问量的架构承诺,无维护者响应;需要公开的时间线。
- **[#7722 — 三路径内存耗尽](https://github.com/agentscope-ai/QwenPaw/issues/7722)** — 严重性为严重;附带受控复现但无修复 PR。
- **[#7727 — kimi-code 越界写入硬性阻止绕过](https://github.com/agentscope-ai/QwenPaw/issues/7727)** — 与安全相关,尚无 PR。
- **[#7720 — Creator 提示词同步 `GATED` 阻塞器](https://github.com/agentscope-ai/QwenPaw/issues/7720)** — 阻塞端到端工作流,评论数低,可能因为受影响用户流失而未提交工单。
- **[#7730 — 插件目录离线回退逃逸](https://github.com/agentscope-ai/QwenPaw/issues/7730)** — 鲁棒性诉求,但尽管有架构级影响,只有 1 条评论。
- **[#7717 — DeepSeek provider 增强](https://github.com/agentscope-ai/QwenPaw/issues/7717)** — 实质性提案(4 项增强),参考了 `deepseek-harness` 的设计;需要维护者界定范围。
- **[#4901 — 按任务选择模型](https://github.com/agentscope-ai/QwenPaw/issues/4901)** — 长期未决,仍开放;#7680 仅诊断了更广泛需求中的一小块。
- **[#7582(已关闭) → 插件商店 UX](https://github.com/agentscope-ai/QwenPaw/issues/7582)** — 关闭时未关联实现 PR;有从视线中消失的风险。
- **PR 评审积压(全部开放,等待维护者分类):** [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)、[#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)、[#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725)、[#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723)、[#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719)、[#7718](https://github.com/agentscope-ai/QwenPaw/pull/7718)、[#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680)。全部都是手术刀式的低风险修复,且与 Bug 报告匹配——非常适合一次性切出 2.2.2 版本。

---

**结论:** QwenPaw 的 2.2.x 系列正处于积极的硬化阶段。过去 24 小时内提交的每个严重 Bug 都已对应一个开放的 PR,或已在关闭的 issue 后等待实现。项目健康的主要风险在于 (a) **状态持久化回归** 正在侵蚀用户信任(#7708、

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目简报 — 2026-09-13

## 1. 今日概览

过去 24 小时 ZeroClaw（github.com/zeroclaw-labs/zeroclaw）活动高度密集，共涉及 24 个 issue 和 50 个 PR，但**没有发布任何新版本**。活动集中在运行时稳定性修复（RPC 分发器、ACP 会话持久化、记忆后端）、Windows CI 的 advisory 测试套件（4 个以上互不相同的失败），以及一批来自杰出贡献者、由维护者推动并已合并的 PR。markdown 记忆后端上新增了一个 **S0（数据丢失 / 安全）**缺陷（#10797），另有若干 P1 运行时缺陷（#10734、#10788、#10785）仍在处理中。传递出的信号是“重度维护 + 加固”而非推进新功能——对一个在途面积如此之大（RPC、网关、插件、ACP、渠道）的项目而言，这是恰当的节奏。

## 2. 版本发布

*过去 24 小时内没有新版本发布。根据模板要求，本节省略。*

## 3. 项目进展

过去 24 小时内有 6 个 PR 被合并/关闭。实质性合并内容：

- **#10726** `ci(zerorelay): pin published relay base images by digest` —— 关闭了 issue #10277 的后续跟进事项；在经 cosign 签名的 relay 镜像上消除了可变基础标签（`rust:1.96.1-slim`、`distroless/cc-debian13:nonroot`）。属于供应链加固。
- **#10449** `fix(channels): create Edge TTS artifact with owner-only permissions` —— 将合成音频文件的权限模式从 `0o644` 收紧为仅所有者可访问，完成了一个虽小但切实的本地隐私修复。
- **#10091** `fix(memory): harden response cache storage permissions` —— 为响应缓存提供审计数据库已在使用的同款仅所有者保护；补上了静态数据的权限缺口。
- **#9577** `test(plugins): prove typed config end to end with an in-tree tool fixture` —— 用一个从源码构建的 `wasm32-wasip2` 测试夹具，替换了手工准备、从未在 CI 中构建过的 `reference-plugin.wasm`。提升了插件配置的 CI 覆盖率。
- **#10676** `fix(ci): compare publish exceptions as paths` —— 修复了发布契约 CI 检查中一个仅影响 Windows 的回归。
- **#10169** `docs(adr): file ADR-014 plugin egress authority as proposed` —— 以 proposed 状态归档 ADR-014“插件出站权限”，填补了这一文档空白。

净效果：在**安全加固、供应链固定与 CI 可靠性**方面稳步推进，另有一份 ADR 落地。本窗口期内没有合并面向用户的功能开发。

## 4. 社区热门话题

讨论最热烈的都是 P1 / S0 缺陷，而非功能 PR。按评论数排序：

- **#10734** [Bug] `RpcDispatcher::process_line` 在 Windows nextest 上的栈用量距离其 2 MB 栈防护界限不足 2% —— 6 条评论。作者：Project516。在 `RpcDispatcher::process_line_session_new_creates_session_on_two_mega…` 中暴露出真实的 `0xc00000fd` 栈溢出。（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)）
- **#10788** [Bug] 失败的 Code/ACP 轮次会从持久化历史中丢弃已接受的提示词和已完成的工具交互 —— 2 条评论。作者：Audacity88。当提供方失败（而非用户取消）时，整个轮次——包括已经成功完成的工具工作——都会被无声地从持久化历史中丢弃。（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)）
- **#10534** [Bug] 受限委托会静默剥离 `delegate` 工具（已关闭）—— 2 条评论。作者：Audacity88。现已修复。（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)）
- **#10689** [Bug] 当回复以 `[` 开头时，Telegram 语音回复被静默跳过（ElevenLabs v3 音频标签）（已关闭）—— 2 条评论。作者：badbat75。（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)）

**潜在需求：** 这一簇问题表明用户极其在意*持久化状态的正确性*——他们希望无论提供方出错还是平台差异，自己输入了什么、哪些工具运行了、哪些历史被保留，行为都是可预测的。语音/ACP 委托与 TTS 渠道显然已在生产环境中使用。

## 5. 缺陷与稳定性

按严重程度排序（P1/S0 优先），凡已有修复 PR 的均给出关联：

| 严重程度 | Issue | 概要 | 状态 / 关联 PR |
|---|---|---|---|
| **S0 / 数据丢失** | [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | `MarkdownMemory::store` 在无写入方串行化的情况下基于过期快照重写——并发的 `store()` 调用可能丢失条目。 | 开放中，已受理。**尚无修复 PR。** |
| P1 / S2 | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | `RpcDispatcher::process_line` 在 Windows nextest 上栈溢出。 | 开放中，处理中。 |
| P1 / S2 | [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | 失败的 Code/ACP 轮次会从历史中丢弃全部内容（提示词 + 已完成的工具）。 | 开放中。**无关联修复 PR。** |
| P1 / S2 | [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) | ZeroCode 的 `begin_notification_resync` 因通知延迟而取消所有正在运行的轮次。 | 开放中，处理中。 |
| P1 / S2 | [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) | 守护进程健康时，`zeroclaw service logs` 在 macOS/Windows/OpenRC 上不打印任何内容（已关闭）。 | 已修复。 |
| P2 | [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) | 单候选 Reliable 提供方的流恢复忽略 `provider_retries`；529 只有一次立即重试，没有退避。 | 开放中，处理中，后续跟进。 |
| P2 | [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) | 被测代码未作任何变更，advisory 任务上却出现三个仅 Windows 的测试失败。 | 开放中，处理中。 |
| P2 | [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794) | `publish_contract::published_crates_never_include_files_outside_their_own_directory` 在 Windows 上失败。 | 开放中，处理中。 |
| P2 | [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) | `zeroclaw agent` REPL 从不启用终端 `IUTF8`；退格键删除的是字节而非字符。 | 开放中，已受理。 |
| P2 | [#10805](https://github.com/zeroclaw-labs/zeroclaw/issues/10805) | `control_plane` 存活测试在 Windows advisory 任务上与进程拆除产生竞态。 | 开放中。 |
| P2 | [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) | MCP 连接因一次失败的恢复尝试而被永久“毒化”（只重试一次，随后彻底失活）。 | 开放中。**尚无修复 PR。** |
| P2 | [#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534) | 受限委托静默剥离 `delegate` 工具（已关闭）。 | 已修复。 |
| P2 | [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) | 回复以 `[` 开头时，Telegram 语音回复被丢弃（ElevenLabs v3 标签）（已关闭）。 | 已修复。 |
| P2 | [#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277) | 按摘要固定已发布 `zerorelay` 镜像的基础标签（已关闭）。 | 已通过 PR #10726 修复。 |
| P2 | [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) | 成本账本按普通输入费率给缓存写入计价，低估了缓存未命中（已关闭）。 | 已修复。 |
| P2 | [#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436) | 原生 OpenRouter 流式传输使用整体请求超时，会切断仍在进行的响应（已关闭）。 | 已修复。 |
| P3 | [#10802](https://github.com/zeroclaw-labs/zeroclaw/issues/10802) | 同一会话中 `session/list-acp` 报告的 `message_count` 与 `turn_end` 不一致。 | 开放中。 |
| P3 | [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | ZeroCode 聊天输入忽略 Delete 键。 | 开放中，good first issue。 |
| P3 | [#10789](https://github.com/zeroclaw-labs/zeroclaw/issues/10789) | 对 ZeroCode 守护进程启动诊断信息进行本地化。 | 开放中，good first issue，后续跟进。 |
| P3 | [#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792) | 阐明守护进程拒绝重载后 Windows 上的恢复方法（文档）。 | 开放中，good first issue，后续跟进。 |
| P3 | [#8733](https://github.com/zeroclaw-labs/zeroclaw/issues/8733) | `models.dev` 目录只解析模型 ID——逐模型能力（视觉）被丢弃。 | 开放中，no-stale（长期悬置）。 |
| P2 | [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) | 填充 `DocumentMessage.jpegThumbnail`，让 PDF 能在 WhatsApp 手机上预览。 | 开放中，功能请求。 |

**头号关注：** Issue **#10797（S0 数据丢失）**是当前尚无修复 PR 的最高严重度事项——markdown 记忆后端上并发的 `store()` 调用可能静默丢失条目。维护者应在任何涉及 `MarkdownMemory` 的功能合并之前先行分诊处理。

## 6. 功能请求与路线图信号

本窗口期内出现了两个明确的功能请求和一个相关联的增强 PR：

- **#10812** 填充 `DocumentMessage.jpegThumbnail` / `pageCount`，使经 WhatsApp 发送的 PDF 能在移动端客户端预览。（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10812)）—— 有很强的“随时可交付”信号：WhatsApp 的线上传输格式明确支持这些字段。
- **#10400** / PR **#10401** 使 Telegram 未授权发送者提示可配置并具备授权感知。（[issue](https://github.com/zeroclaw-labs/zeroclaw/issues/10400)，[PR](https://github.com/zeroclaw-labs/zeroclaw/pull/10401)）—— 长期未决。带有 stale-candidate 标记；需要作者采取行动。
- **#8733** 将 `models.dev` 目录中的逐模型能力（如视觉）提升为一等公民。（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8733)）—— 自 2026-07-05 开放至今；持续被重新提及表明存在真实需求。

**下一版本预测：** 若无人明确推动，这些都不会随版本交付。未来 1–2 周内最有可能合并的是 **P1 运行时修复**（#10734、#10788、#10785）和 **S0 记忆后端修复**（#10797），因为它们是呼声最高且目前没有 PR 的开放事项。WhatsApp 缩略图（#10812）是最有可能下一个落地的用户可见功能，因为这是一个小而独立的改动。

## 7. 用户反馈摘要

过去 24 小时观察到的痛点：

- **持久化焦虑（高）。** 用户和维护者反复发现运行时在错误路径上丢弃用户输入和工具结果（#10788、#10797、#10785）。这意味着：用户正在把长期会话托付给 ZeroClaw，需要可预测的状态行为。
- **Windows 平台对等性（高）。** 24 小时内有四个独立的 Windows 专属 issue 提出（#10734、#10793、#10794、#10805，外加 #10795 REPL UTF-8）。维护者显然在认真对待（advisory 任务虽非必需通过，但被积极分诊），但这仍是一个真实存在的易用性差距。
- **提供方可靠性配置项（中）。** #10787 —— 单候选 Reliable 提供方忽略 `provider_retries`；529 错误没有退避。为韧性而选择 Reliable 的用户希望自己的重试配置能够生效。
- **TTS 语音渠道（低–中，但面向用户）。** #10689（现已修复）表明 ElevenLabs v3 的带方括号音频标签在真实工作流中确有使用，需要能完好通过 TTS 管线。
- **本地化规范。** #10789（ZeroCode 守护进程诊断的 Fluent 目录）—— 事情虽小，却表明存在多语言用户群体。

数据中没有净推荐值（NPS）类信号；满意度最好从“维护者是否已经交付了修复？”来推断——答案是，24 小时内 **24 个 issue 中有 6 个**已修复，关闭率相当健康。

## 8. 积压事项观察

开放时间最长、仍需维护者关注的事项：

- **#8733** —— 自 **2026-07-05** 开放（约 2.5 个月）。`models.dev` 目录能力被丢弃，`supports_vision()` 回退为按模型系列的布尔值。状态：`no-stale`。无关联 PR。（[链接](https://github.com/zeroclaw-labs/zeroclaw/issues/8733)）
- **#10797** —— 开放事项中严重度最高（S0）。**尚无修复 PR。** 在任何涉及记忆子系统的变更交付之前应先分诊。
- **#10807** —— MCP HTTP/SSE “只重试一次随即毒化”的行为；只要 MCP 服务器出现任何抖动，实际上就会阻塞工作流（S1）。无 PR。
- **#10805** —— `control_plane` 存活测试在 Windows 上与进程拆除产生竞态；advisory 任务不稳定，但与 PR #10262 的重载取消工作相关。
- **#10400 / PR #10401** —— Telegram 未授权提示的工作自 **2026-08-26** 起开放，带有 `stale-candidate` 标记和 `needs-author-action`。值得 ping 一下。
- **#10787** —— 提供方重试/退避语义，#10736 的后续跟进事项。需要设计决策（`provider_retries` 是否应适用于流恢复路径？）。
- **#10791** —— PR #10262 遗留的非阻塞性后续事项；写入端出现终结性失败后，本地 RPC 连接不会被回收。正悄然老化。

*今天*最需要维护者亲自过目的项目：**#10797（S0）**、**#10788（P1，无 PR）**、**#10807（S1，无 PR）**以及 **#8733（长尾能力缺失）**。

---

*本简报基于 2026-09-12–13 UTC 期间更新的 24 个 issue 和 50 个 PR 生成。窗口期内无版本发布。活动分布：18 个开放 / 6 个已关闭 issue；39 个开放 / 11 个已合并或关闭的 PR。*

---

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*