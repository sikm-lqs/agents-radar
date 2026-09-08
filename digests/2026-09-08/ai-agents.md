# OpenClaw 生态日报 2026-09-08

> Issues: 449 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-08 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-08

## 1. 今日概览

OpenClaw 在 2026-09-08 处于高吞吐但**未发布**状态。过去 24 小时内，仓库记录了 **449 个更新的 issue**（229 个仍开放，220 个已关闭）和 **500 个更新的 pull request**（286 个开放，214 个已合并/关闭），综合关闭率接近 46%，但**没有发布任何新版本**。活动重点集中在 Telegram 通道的持久化、多智能体会话稳定性、Gateway 事件循环上的 SQLite/事务争用，以及升级后的恢复路径。多版本（2026.8.1、2026.8.2、2026.9.1、2026.9.2）中持续存在多个未修复的反复出现的 bug，最新版本上还有数个"钻石龙虾"级别的回归问题尚未合并修复。整体项目健康度：**活跃且响应迅速，但发布节奏低于 bug 引入速度**。

## 2. 版本发布

**无。** 过去 24 小时没有新的标签化发布，尽管存在一个开放 issue [#139485](https://github.com/openclaw/openclaw/issues/139485)，用户在该 issue 中反馈从 2026.9.1 → 2026.9.2 的托管升级会导致 Gateway 离线，必须通过快照回滚。在 2026.9.2 上 P0/P1 回归不断累积的情况下，仍然没有新版本发布，这一现象本身就是一个值得关注的信号。

## 3. 项目进展

从今日已合并/关闭的条目来看，主要实质性合并集中在以下方面：

- **Provider 元数据加固** — [PR #142125](https://github.com/openclaw/openclaw/pull/142125)（已关闭）：`perf(vllm): keep model metadata reads lightweight` —— 关闭了一条慢首用路径，该路径会将回放/插件代码错误地卷入 vLLM thinking 策略。
- **发布工具修复** — [PR #142017](https://github.com/openclaw/openclaw/pull/142017)（已关闭）：`fix(release): classify inconclusive Kova CPU evidence`，避免横跨阈值的 harness 自身 CPU 区间被误判为产品回归。[PR #142126](https://github.com/openclaw/openclaw/pull/142126)（已关闭）：`fix(release): OpenShell preview fails on nested optional dependencies` —— 解决了一处 EOVERRIDE 包组装失败。
- **测试隔离** — [PR #142060](https://github.com/openclaw/openclaw/pull/142060)（已关闭）：`fix(qa): finish stateful settled-tool continuations` —— 覆盖 Responses API 中先前的工具输出以内联方式提供的有状态延续场景。

上述主要为基础设施/性能与测试正确性提交；**今天没有面向用户的功能分支被合并**。较大型的重构（如 [PR #142063](https://github.com/openclaw/openclaw/pull/142063) `refactor(models): read published catalog inventory through the Gateway` 和 [PR #141913](https://github.com/openclaw/openclaw/pull/141913) `Security/harden local security gateway`）仍处于开放状态，等待验证。

## 4. 社区热门话题

按今日更新 issue 的评论量排序：

| # | Issue | 评论数 | 主题 |
|---|-------|----------|-------|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子智能体完成时静默丢失 —— 超时无重试/通知/重启 | 26 | 长期存在的会话状态可靠性问题 |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | v2026.8.1 上 claude-sonnet-5 间歇性出现"malformed JSON arguments" | 18 | Provider/回归问题 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw 泄漏未回收的 hook/tool 子进程（僵尸进程） | 16 | 运行时卫生 |
| [#126360](https://github.com/openclaw/openclaw/issues/126360) | 显式多智能体所有权下日志中充斥 `AgentSelectionRequiredError` | 16 | 多智能体所有权模型 |
| [#115908](https://github.com/openclaw/openclaw/issues/115908) | 会话记录投影协调可能陷入活锁 | 16 | 事件循环停滞 |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | 多智能体编排不稳定：覆盖、会话锁、孤儿子进程 | 14 | 多智能体核心 |
| [#127229](https://github.com/openclaw/openclaw/issues/127229) | Telegram：被 watchdog 释放的持久化更新被错误标记为 tombstone | 13 | Telegram 投递 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步智能体持久化在大规模下阻塞 Gateway 事件循环 | 13 | 吞吐量上限 |

**底层需求**：四种用户层面主题主导讨论。(a) *持久化且可观测的投递* —— 多个 Telegram 相关 issue 描述消息静默丢失、单次尝试即进入死信、卡在 `send_attempt_started` 状态。(b) *多智能体可预测性* —— 维护者希望保证哪个智能体处理某一轮交互，并发 `agents add` 不会损坏配置。(c) *事件循环健康* —— 同步维护任务（记录协调、SQLite 写入）是主线程停滞反复出现的根因。(d) *升级可信度* —— 从 2026.5.12 到 2026.9.2 的每一个小版本升级都至少产生过一份"升级后无法启动"的用户报告，且文档化的 `doctor --fix` 恢复方案经常无效。

## 5. Bug 与稳定性

按严重程度排序（P0/P1 与影响标签）。已关闭的条目已标注。

**关键 / 发布阻塞**
- [P0, **已关闭**] [#137813](https://github.com/openclaw/openclaw/issues/137813) Windows 上 2026.9.1 后 Gateway 无法启动；新增的 `--task-supervisor` 标志静默返回 0。*在 feed 中未关联修复 PR 即被关闭。*
- [P0] [#140908](https://github.com/openclaw/openclaw/issues/140908) 在 `sudo -u` 下 `doctor --fix` / `gateway status --deep` 因 `systemctl --user is-enabled` 报 EACCES 失败，阻塞所有升级后迁移。**无修复 PR。**
- [P0] [#111578](https://github.com/openclaw/openclaw/issues/111578) 升级时 Gateway 鉴权 token 从服务环境中丢失（虽已在 2026.7.1 中修复但再次出现）；CLI 本地无法鉴权。**无修复 PR。**

**P1，最新版本上的"钻石龙虾"回归**
- [#139847](https://github.com/openclaw/openclaw/issues/139847) 在 reply run 运行期间发送的消息被丢弃 —— `Reply operation has no active tool authority snapshot`（2026.9.2 中的回归）。**修复 PR 已开放：** [#140158](https://github.com/openclaw/openclaw/pull/140158) `fix(agents): reply authority falls back to direct preparation when captured reply operation is retired`（关闭 #139847）。
- [#139714](https://github.com/openclaw/openclaw/issues/139714) 核心更新后恢复的子任务接受了一条永远无法终结的 `update_runs` 记录；`openclaw status` 永远报告"update in progress"。**无修复 PR。**
- [#137613](https://github.com/openclaw/openclaw/issues/137613) CLI 后端的预压缩内存刷新被禁用；显而易见的修复触发了 `compactionCount` 陷阱。**无修复 PR。**
- [#119720](https://github.com/openclaw/openclaw/issues/119720) 同步智能体持久化与记录维护在大规模下阻塞 Gateway 事件循环。**无修复 PR。**
- [#126246](https://github.com/openclaw/openclaw/issues/126246) Telegram 持久化出站投递仍卡在 `send_attempt_started`，重启后丢失。**无修复 PR。**
- [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram：网络失败的出站发送在单次尝试后即被死信 —— 静默丢失。**无修复 PR。**
- [#139809](https://github.com/openclaw/openclaw/issues/139809) Telegram 收不到 Codex 的受保护 secrets 提示 —— `secrets` 工具以 `no_answer` 超时。**无修复 PR。**

**P1，持久化 / 事件循环 / 安全**
- [#115908](https://github.com/openclaw/openclaw/issues/115908) 会话记录投影协调可能陷入活锁。**无修复 PR。**
- [#117262](https://github.com/openclaw/openclaw/issues/117262) SQLite 争用：3 个并发写句柄作用于 `state/openclaw.sqlite` 造成约 33 秒的事件循环停滞（DEF-61）。**无修复 PR。**
- [#136311](https://github.com/openclaw/openclaw/issues/136311) memory-core：Gateway 在每次启动时重新获取 reindex 锁；累计 19 GB 孤儿 `memory-reindex-*` 临时数据库。**无修复 PR。**
- [#97616](https://github.com/openclaw/openclaw/issues/97616) 钩子/工具子进程未被回收；僵尸进程累积与运行时退化。**无修复 PR。**
- [#123265](https://github.com/openclaw/openclaw/issues/123265) `role:"custom"` 运行时上下文载体带有 `display:false` 时，会在每次请求中被序列化为尾部 `role:"user"` 消息。**无修复 PR。**
- [#92870](https://github.com/openclaw/openclaw/issues/92870) 系统事件文本在压缩过程中泄漏到用户消息归属中（信任边界违反）。**无修复 PR。**

**今日已关闭（P1）**
- [P1, **已关闭**] [#137927](https://github.com/openclaw/openclaw/issues/137927) 内部上下文块（`<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>`）泄漏到 Telegram 可见消息正文中 —— 影响安全。
- [P1, **已关闭**] [#133984](https://github.com/openclaw/openclaw/issues/133984) `2026.7.1-2 → 2026.8.1` 导致 Gateway 无法启动；`doctor --fix` 在非交互模式下跳过 config-key 迁移。
- [P1, **已关闭**] [#134896](https://github.com/openclaw/openclaw/issues/134896) `2026.8.1` 触发 5 阻塞 Gateway 重启级联 + `doctor --fix` 自指失败。
- [P1, **已关闭**] [#138965](https://github.com/openclaw/openclaw/issues/138965) 中断的记录重写导致陈旧历史成为活动对话。

模式已非常明显：**回归问题集中在每个小版本边界，且恢复工具（`doctor --fix`）反复被证实不够用。**

## 6. 功能请求与路线图信号

具备关注度的活跃"非主流潮池"（功能）与增强 issue：

- [P2, 🌊] [#96675](https://github.com/openclaw/openclaw/issues/96675) **所有者签名的责任门控**，针对助手记忆、行为、技能与证据复用。建议在输出成为持久记忆或规则之前进行显式的用户审核。（👍 2，10 条评论）
- [P2, 🌊] [#118785](https://github.com/openclaw/openclaw/issues/118785) **QA 容器与外部应用 SDK 主证明** —— 跟踪 23 个容器 ID 与 31 个外部应用 SDK ID；在 `app-sdk` 上绑定分类法。
- [P2, 🌊] [#60602](https://github.com/openclaw/openclaw/issues/60602) **Per-Agent Bedrock `requestMetadata`** 注入，用于多智能体成本归属（关联 PR 已开放）。
- [P2, 🌊] [#49223](https://github.com/openclaw/openclaw/issues/49223) **WhatsApp `inter_session`** 投递请求被错误抑制为 `REPLY_SKIP`/`ANNOUNCE_SKIP`/`NO_REPLY`。
- [P3, 🌊] [#45503](https://github.com/openclaw/openclaw/issues/45503) **工具结果的手动上下文清理**（当前仅支持 TTL 修剪）。
- [P3, 🌊] [#126781](https://github.com/openclaw/openclaw/issues/126781) **工具返回后的分离托管 Lobster 运行** —— 在 2026.9.1 中部分解决。
- [P2, 🌊] [#98084](https://github.com/openclaw/openclaw/issues/98084) **MiniMax M3 原生视频输入**支持（仅有参考分支）。

**下一个版本可能落地**：(i) Bedrock per-agent request metadata（关联 PR 已存在，影响面最小），(ii) 所有者签名责任门控 —— 跨安全/UX 的特性，长期点赞，并被反复出现的"信任边界"讨论线索（#92870、#137927）持续推动，(iii) WhatsApp `inter_session` 正确性修复（高用户影响、通道特定）。QA 主证明与 M3 视频项目涉及面较大，不太可能在下一个补丁版本中发布。

## 7. 用户反馈汇总

**反复出现的用户痛点**（来自 issue 正文）：
- **"升级破坏了我的 Gateway"** —— 在 `2026.5.12 → 2026.7.1-2 → 2026.8.1 → 2026.9.1 → 2026.9.2` 全程出现。用户反复需要手动检查发行源、多次调用 `openclaw` 或 OCM 快照回滚（[#133984, #134896, #137813, #139485, #111578]）。
- **"我的 Telegram 消息消失了"** —— 至少五个开放的钻石龙虾条目描述了 Telegram 通道上的静默丢失：卡住的 `send_attempt_started` 记录、单次尝试即死信、被 watchdog 错误标记 tombstone 的持久化更新、被丢弃的 secrets 提示、被丢弃的 mid-turn 更新。无论根因如何，用户看到的效果都一样：消息消失。
- **"我的多智能体环境不稳定"** —— 并发 `agents add` 覆盖配置，并行运行下会话锁失败，logbook/Control UI/system-agent turn 都缺少 `agentId` 目标并以 `AgentSelectionRequiredError` 灌满日志（[#126360, #43367]）。
- **"运行时在大规模下停滞"** —— 持续写入导致事件循环阻塞数十秒，阻塞所有通道传输（[#115908, #119720, #117262]）。
- **"内部脚手架出现在用户可见的聊天中"** —— `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` 块已确认在至少一起生产事件中以 Telegram 文本形式渲染（[#137927]，今日已关闭但根模式在 [#123265] 中重现）。

**满意度信号** —— 今日顺利关闭的条目包括 [#137927]（上下文泄漏修复）、[#138965]（记录重写中断）、[#134896]（级联升级）、[#133984]（配置迁移），表明维护者正在解决高严重度项，但每一项都需要多条评论和一起真实的生产事件才能浮出水面。

## 8. 待办观察

高严重度、长寿命且目前缺乏维护者参与的条目（多个 `needs-maintainer-review` / `no-new-fix-pr` 标签）：

- [#44925](https://github.com/openclaw/openclaw/issues/44925)（创建于 2026-03-13，26 条评论，🦞）

---

## 横向生态对比

# 跨项目对比报告：开源 AI 智能体 / 个人助手生态
**快照日期：2026-09-08** · 来源：各项目社区摘要（OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw）

---

## 1. 生态概览

开源个人 AI 助手领域已围绕一套通用的架构范式整合成型 —— 一个持久的智能体运行时，配合网关/守护进程、SQLite 级别的状态存储、多渠道消息投递以及 Provider 适配层 —— 但各项目在成熟度与执行层面差异显著。当前的活跃度主要由可靠性工作主导，而非全新功能：事件循环健康度、持久化消息投递、Cron 正确性以及缓存感知的上下文管理，在所有活跃项目的高优先级（ P1）缺陷中占据绝大多数。QwenPaw 与 Hermes Agent 展现出最健康的缺陷修复比，ZeroClaw 处于中期阶段且审查积压逐渐增长，IronClaw 则已收缩为自动化基准监控。OpenClaw 仍是参与规模的领导者，数量级领先，但发布速度已慢于回归速度。

## 2. 活跃度对比

| Project | Issues (24h) | PRs (24h) | Release status | Health score |
|---|---|---|---|---|
| **OpenClaw** | 449（229 待处理 / 220 已关闭） | 500（286 待处理 / 214 已合并，约 43%） | 无；P0 自 2026.9.2 起一直未处理 | **6/10** —— 分类吞吐极高，但 3 个开放 P0 + 7 个 P1 回归无修复 PR；引入缺陷的速度超过交付速度 |
| **Hermes Agent** | 50（41 待处理 / 9 已关闭） | 50（44 待处理 / 6 已合并） | **v0.21.1 补丁已发布**（tavily 打包缺失问题已标注） | **7/10** —— 当日解决 P0/P1（Debian 安装、WAL 分裂脑），但积压持续增长 |
| **IronClaw** | 1（自动化分类） | 0 | 无 | **3/10** —— 监控状态；仅产出可观测性制品 |
| **QwenPaw** | 31（快速流转） | 40（16 待处理 / 24 已关闭，**60% 合并率**） | 无；当前主线 2.2.0 | **8.5/10** —— 合并速度最佳，正在关闭遗留回归，并引入首次贡献者 |
| **ZeroClaw** | 29（24 待处理 / 5 已关闭） | 50（全部待处理，**0 合并**） | 无 | **6.5/10** —— 吞吐高但存在审查瓶颈；治理 RFC 正在推进 |

## 3. OpenClaw 的定位

**相对于同行的优势：**
- **社区规模无可匹敌** —— 24 小时内触及 949 个条目，而次大规模项目仅约 100，带来最深入的真实世界反馈闭环（多渠道生产事故、同行尚未遇到的规模引发的 SQLite 争用）。
- **覆盖面最广**：Telegram + WhatsApp 渠道、多智能体编排、Provider 元数据加固（vLLM、Bedrock），以及安全路线图（属主签名的责任门控、本地安全网关），无同行能与之比肩。
- **分类响应迅速**：今日关闭 4 个 P1，包括一项生产环境上下文泄漏修复。

**相对于同行的劣势：**
- 零发布，而 QwenPaw 合并率达 60%、Hermes 持续发布补丁标签；**自 2026.5.12 以来的每一个小版本边界都出现了"升级后无法启动"的反馈**，且 `doctor --fix` 反复无效 —— 而 Hermes 在当日就解决了其同类的 Debian P0。
- 系统性的事件循环/SQLite 问题（#117262、#119720）缺乏修复 PR；Hermes 已关闭其同类的 WAL 分裂脑问题（#104596）。

**技术路线**：OpenClaw 独树一帜地呈 **服务端产品形态** —— 中央网关、可管理的升级、持久化事件存储、运维工具（doctor、snapshots）、多智能体属主注册表。同行均为客户端形态（Hermes 桌面优先、ZeroClaw IDE/ACP 优先、QwenPaw 控制台优先）。这扩大了 OpenClaw 的运维面，也解释了为何升级信任问题主导了其问题流。

## 4. 共同的技术焦点领域

| 主题 | 涉及项目 | 具体需求 |
|---|---|---|
| **非阻塞持久化 / 事件循环健康** | OpenClaw（#117262：SQLite 卡顿 33 秒；#119720），QwenPaw（#7363：启动冻结 120 秒） | 原生异步写入；Hermes 已关闭的 WAL 修复（#104596）可作为参考范式 |
| **Cron / 定时任务可靠性** | Hermes（#100401 自防御心跳），QwenPaw（#7589 反馈循环堆积），ZeroClaw（#10685 误报成功） | 幂等的定时回合；真实的结果上报；经过验证的 Cron 交互体验（#10641） |
| **持久化出站渠道投递** | OpenClaw（5+ Telegram 静默丢失问题），Hermes（#103575 最终响应丢失），ZeroClaw（#10689、#5514） | 带可见性的重试与死信队列展示，而非静默丢失 |
| **多智能体 / 多会话并发** | OpenClaw（#43367、#126360 `AgentSelectionRequiredError`），ZeroClaw（#9727 史诗级问题、#10695），Hermes（#86890 排序） | 属主/agentId 保证；并行的可观测性 |
| **缓存感知的上下文管理** | ZeroClaw（#10660/#10674/#10701 缓存断点），QwenPaw（#7576 上下文回退、#7628 预算压缩），OpenClaw（#137613） | 保留 Provider 缓存前缀的压缩；按模型定制的上下文大小 |
| **人工审批 / 信任门控** | OpenClaw（#96675 属主签名门控），QwenPaw（#7526 受保护的执行契约），Hermes（#39609 阻塞任务自动提升） | 不可被自动化绕过的强制审批状态 |
| **Windows 平台一致性** | OpenClaw（#137813），Hermes（#105145、#37594），QwenPaw（#7554） | 一流的 Windows CI 与升级衔接测试 |

## 5. 差异化分析

- **OpenClaw** —— *常驻助手平台*。以网关为中心、多渠道（Telegram/WhatsApp）、多智能体、安全优先。目标用户：自托管者与将持久助手作为基础设施运行的运维者。
- **Hermes Agent** —— *终端用户多端产品*。CLI/桌面/TUI/手机中继的连续性，看板驱动的自主工作流，Cron 调度。目标用户：寻求桌面到移动端会话衔接的个人重度用户。
- **QwenPaw** —— *控制台与生态优先*。插件市场、Hub 沙箱、ReMe 记忆、深度支持中国生态 Provider（QQ 渠道、DeepSeek、qwen 权重、i18n）。目标用户：基于 AgentScope 技术栈的中国市场开发者。
- **ZeroClaw** —— *面向开发者/智能体编码*。ZeroCode ACP 客户端、成本账本与提示缓存经济、插件 Webhook 治理、集中推进 OpenAI Responses API。目标用户：针对代码运行智能体的开发者。
- **IronClaw** —— *评测/基准可观测性*（officeqa 失败分类、模型质量归因）。非面向用户；内部工具以开源形式发布。

## 6. 社区动能与成熟度

- **第一梯队 —— 规模领先但承压**：**OpenClaw**。社区规模最大，但回归债务（开放 P0 无修复 PR、零发布）暗示其处于"救火模式"；若升级信任持续下滑，成熟度风险显著。
- **第二梯队 —— 健康快速迭代**：**QwenPaw**（60% 合并率，正在关闭 8 月以来的回归、首次贡献者的 PR 正在合入）与 **Hermes Agent**（发布节奏 + 当日解决 P0）。这两者将反馈转化为修复的速度最快。
- **第三梯队 —— 高在制品，流程正规模化**：**ZeroClaw**。50 个开放 PR、窗口期内零合并，且一项关于重审评审证据的 RFC 已被接受 —— 这是一个在中期阶段中超越非正式治理的项目。
- **第四梯队 —— 休眠**：**IronClaw**，仅有自动化日报。

**快速迭代中**：QwenPaw、ZeroClaw、Hermes。**需要稳定**：OpenClaw。**已收缩**：IronClaw。

## 7. 趋势信号

1. **异步持久化正在成为护城河。** 每个活跃项目最严重的缺陷都是同步持久化阻塞运行时。解决了这一点的团队（如 Hermes 的 WAL 修复）能将规模转化为优势；而未解决的（OpenClaw 开放的 #117262/#119720）则使其成为吞吐天花板。
2. **提示缓存经济正在走向主流。** ZeroClaw 的缓存断点集群与 QwenPaw 的预算感知压缩请求表明，上下文管理如今以 *保留的成本* 而非"裁剪的 token 数"来衡量。
3. **信任门控正在成为产品特性。** 属主签名的责任门控（OpenClaw）、受保护的执行契约（QwenPaw）以及看板人工门控绕过报告（Hermes）表明，"安全即 UX"正在成为差异化点，其驱动因素是真实事故（内部上下文泄漏到用户聊天）。
4. **静默消息丢失是社区信任的头号杀手** —— 这是高严重度、高评论数问题的最大单一集群（OpenClaw Telegram、Hermes、ZeroClaw）。具备可见死信队列的持久化投递队列已是基本要求。
5. **OpenAI Responses API 是一个新兴的 Provider 战场** —— ZeroClaw 协调推进的 5 项特性（#10704–#10708）与 OpenClaw 的有状态续接测试覆盖都指向这一方向。
6. **多智能体需求在各处都超过了实现成熟度**。
7. **运维质量塑造留存率**：OpenClaw 的升级破损链条对比 Hermes 的当日安装修复，表明恢复工具的质量直接驱动社区情绪；Windows 一致性与可逆升级在整个生态中仍被低估。

**对于智能体开发者而言**：优先投入异步优先的持久化、保留缓存前缀的压缩、可观测的投递重试、显式的审批状态机，以及 Windows CI —— 这些是整个生态中用户痛点最集中的领域。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-08

## 1. 今日概览

Hermes Agent（`nousresearch/hermes-agent`）过去 24 小时处于高活跃度的维护节奏，共触及 **50 个 issue** 与 **50 个 PR**，以缺陷修复和小型功能新增为主。一个补丁版本已打标签（**v0.21.1 / v2026.9.7**），将 `main` 自 v0.21.0 以来的变更打包给下游消费者使用。Issue 关闭/开启比为 9 关闭 vs. 41 开启，PR 为 6 合并/关闭 vs. 44 开启，表明分诊节奏健康，但 P1/P2 可靠性问题（横跨 cron、Windows 桌面、state-DB WAL 以及网关投递）正形成持续积压。整体信号表明这是一个被积极维护的多端产品（CLI / 桌面 / 网关 / TUI / phone-relay），其核心主题是可靠性与跨平台正确性。

## 2. 发布

**v2026.9.7 — Hermes Agent v0.21.1**（发布日期 2026-09-07）
- 类型：**补丁版本**；将 `main` 自 v0.21.0 以来的变更打包，供标签化部署与下游消费者使用。
- 固定于提交 `6178e9f4eed8d99f4fc550add939d58c7bed6206`。
- 发布说明中**未出现任何破坏性变更或迁移说明**；正在使用 v0.21.0 的消费者可直接采用此标签。
- 发布说明链接：[v2026.9.7](https://github.com/nousresearch/hermes-agent/releases/tag/v2026.9.7)（由 issue [#101865](https://github.com/nousresearch/hermes-agent/issues/101865) 引用，该 issue 指出了此稳定标签中缺失 `plugins/web/tavily` 的打包回退问题）。

> ⚠️ 打包缺失已标记：[#101865](https://github.com/nousresearch/hermes-agent/issues/101865) — `plugins/web/tavily/` 在 `v2026.8.31`/`v0.21.0` 中缺失，尽管它出现在 `v2026.8.27` 以及 `main` 分支上。建议确认同样的遗漏是否同样存在于 v2026.9.7。

## 3. 项目进展

### 合并 / 关闭的 PR（过去 24 小时）
- [#75060](https://github.com/nousresearch/hermes-agent/pull/75060) **`fix(install): link all console script launchers`** — 安装器现在会暴露声明的 `hermes-agent` 控制台脚本，并扩展 macOS 启动器回归测试以覆盖 `hermes`、`hermes-acp` 与 `hermes-agent`，改善各端的安装可靠性。
- [#75616](https://github.com/nousresearch/hermes-agent/pull/75616) **`fix(desktop): stop sessions before deleting them`** — 在删除持久化的会话记录之前，会正确终止正在运行的轮次；释放被阻塞的 approval/clarify/sudo/secret 等待。
- [#105728](https://github.com/nousresearch/hermes-agent/pull/105728) **`fix: clarify kanban operator review changes`** — 将 `request-changes` 限定于当前 reviewer 持有的运行；将 operator/manual 的 review 变更路由到 `reopen-review`，并补充回归覆盖。

### 关闭的 issue（过去 24 小时，关键解决项）
- [#87093](https://github.com/nousresearch/hermes-agent/issues/87093) — Debian 13.6 安装失败（`uv.lock` / `npm install`）；P0 安装更新已解决。
- [#104596](https://github.com/nousresearch/hermes-agent/issues/104596) — 单进程 `state.db` WAL 脑裂（P1 会话）已解决。
- [#77142](https://github.com/nousresearch/hermes-agent/issues/77142)、[#74389](https://github.com/nousresearch/hermes-agent/issues/74389)、[#77033](https://github.com/nousresearch/hermes-agent/issues/77033)、[#92163](https://github.com/nousresearch/hermes-agent/issues/92163)、[#37594](https://github.com/nousresearch/hermes-agent/issues/37594)、[#103049](https://github.com/nousresearch/hermes-agent/issues/103049) — 性能/次要缺陷关闭（Anthropic 客户端复用、CLI 导入膨胀、会话搜索 I/O、流式文本重建、IPv6 探测超时、renderer-reload 子代理清除）。

当日的进展主要由**性能与可靠性清理**主导，而非全新功能。

## 4. 社区热点话题

| 排名 | 项目 | 类型 | 评论数 | 信号 |
|---|---|---|---|---|
| 1 | [#88584](https://github.com/nousresearch/hermes-agent/issues/88584) — Nous→Enterkey 计划合并受阻 | Issue（无效，P3） | 77 | 评论数最多，但被标记为 `[invalid]`；反映 `cron/jobs.py` 中的内部跨 fork 集成冲突，**并非面向社区的缺陷**。评论量属运维性讨论，并非产品关键问题。 |
| 2 | [#87093](https://github.com/nousresearch/hermes-agent/issues/87093) — Debian 安装失败 | Issue（P0，**已关闭**） | 24 | 真实安装痛点；当日解决。凸显了 `curl \| bash` 安装路径在全新 Linux 发行版上的反复脆弱性。 |
| 3 | [#39609](https://github.com/nousresearch/hermes-agent/issues/39609) — Kanban `--initial-status blocked` 自动提升为 `ready`，绕过人工关卡 | Issue（P2，开启） | 13 | **高信任/安全隐患**：明确标记为 "blocked" 的任务约 1 秒后被无主语地自动提升，随后被默认 worker 认领并执行。提示看板状态机中人工审批 gate 存在漏洞。 |
| 4 | [#104596](https://github.com/nousresearch/hermes-agent/issues/104596) — state.db WAL 脑裂 | Issue（P1，**已关闭**） | 11 | 在活跃当日即关闭 — 一项重要的持久性修复已发布。 |
| 5 | [#100401](https://github.com/nousresearch/hermes-agent/issues/100401) — cron fire-claim heartbeat 自栅栏死锁 | Issue（P1，开启） | 8 | 运行超过 60 秒的任务会被标记为 "Interrupted by shutdown"，即便实际并无 shutdown 发生。 |
| 6 | [#105145](https://github.com/nousresearch/hermes-agent/issues/105145) — Windows `hermes update` 在成功更新后退出码为 8 | Issue（P1，开启） | 8 | 更新后验证阶段解析到错误的工作目录；Windows 桌面交付可靠性问题。 |
| 7 | [#62774](https://github.com/nousresearch/hermes-agent/issues/62774) — 桌面流式输出对葡萄牙语口音字符截断 | Issue（P1，开启） | 4 | 编码/流式管道在带口音字符附近丢失整个音节。 |
| 8 | [#86890](https://github.com/nousresearch/hermes-agent/issues/86890) — 桌面聊天时间线在并发会话下顺序错乱 | Issue（P2，开启） | 4 | `terminal` 事件携带空的 `session_id`，导致同一 profile 上并发会话的排序被破坏。 |

**核心需求：** 评论量最多的议题集中于**持久化（state.db WAL）、cron/heartbeat 语义、Windows 桌面可靠性以及跨会话排序** — 即自主代理的信任基础设施，而非表面功能。

## 5. 缺陷与稳定性

### 开启中的 P1/P2（按严重程度排序）

| 严重度 | Issue | 组件 | 概述 | 修复 PR? |
|---|---|---|---|---|
| **P1** | [#100401](https://github.com/nousresearch/hermes-agent/issues/100401) | cron | Fire-claim heartbeat 在自身栅栏上死锁；任务被错误报告为 "Interrupted by shutdown"。 | 暂无。 |
| **P1** | [#105145](https://github.com/nousresearch/hermes-agent/issues/105145) | desktop / windows / install-update | `hermes update` 在成功更新后总是显示 `FAILED (exit 8)`。 | 暂无。 |
| **P1** | [#62774](https://github.com/nousresearch/hermes-agent/issues/62774) | desktop / streaming | 流式输出中带口音字符（葡萄牙语）时出现严重文本截断。 | 暂无。 |
| **P1** | [#98588](https://github.com/nousresearch/hermes-agent/issues/98588) | cli / gateway / install-update | macOS 上 launchd 重新拉起后误报 "gateways may still be serving pre-update modules"。 | 暂无。 |
| **P2** | [#39609](https://github.com/nousresearch/hermes-agent/issues/39609) | cron | `--initial-status blocked` 的任务约 1 秒后自动提升至 `ready`，绕过人工审批 gate。 | 暂无。**安全相关。** |
| **P2** | [#86890](https://github.com/nousresearch/hermes-agent/issues/86890) | desktop / sessions | 并发会话下聊天时间线顺序错乱（terminal 事件上 `session_id` 为空）。 | 暂无。 |
| **P2** | [#34143](https://github.com/nousresearch/hermes-agent/issues/34143) | auth / profiles | 当本地状态陈旧时，Profile Codex 认证可能忽略全局凭据池。 | 暂无。 |
| **P2** | [#93633](https://github.com/nousresearch/hermes-agent/issues/93633) | cli | 在 Ghostty/VS Code/iTerm2 上的 `modifyOtherKeys=2` 模式下，经典 CLI 对 Shift+符号键输出字面量 `[27;2;64~`。 | 暂无。 |
| **P2** | [#62333](https://github.com/nousresearch/hermes-agent/issues/62333) | mcp / auth | 每次刷新都会清空 OAuth `refresh_token` — MCP 服务器在登录后约 1 小时即失效。 | 暂无。 |
| **P2** | [#77797](https://github.com/nousresearch/hermes-agent/issues/77797) | gateway / cron | API 服务器唤醒重试可能导致 agent 运行重复，或将持久化投递钉在缓存的 502 上。 | 暂无。 |
| **P2** | [#103575](https://github.com/nousresearch/hermes-agent/issues/103575) | gateway / telegram | 在故障期间 `_send_with_retry max_retries=2` 耗尽后，最终响应被永久丢弃。 | 暂无。 |

### 值得关注的当日关闭项 — 持久性突破
- [#104596](https://github.com/nousresearch/hermes-agent/issues/104596) state.db WAL 脑裂 — 已修复。
- [#87093](https://github.com/nousresearch/hermes-agent/issues/87093) Debian 安装 — 已修复。

## 6. 功能请求与路线图信号

今日或近期开启/更新的功能请求：

- [#105740](https://github.com/nousresearch/hermes-agent/issues/105740) — **Hermes 桌面应用中按 Bot 可视化会话**（bot↔session 归属清晰化）。→ 低工作量 UI，预计很快落地。
- [#105734](https://github.com/nousresearch/hermes-agent/issues/105734) — 从 Hermes-Relay 手机应用**恢复桌面持有的会话**（跨端会话租约协调）。→ 多端交接是当前明确主题。
- [#105750](https://github.com/nousresearch/hermes-agent/issues/105750) — `hermes:readFileDataUrl` 在文件缺失时的优雅降级（桌面端）。→ 小型修复。
- [#96455](https://github.com/nousresearch/hermes-agent/issues/96455) — **默认技能目录改为按需磁盘查找**，而非每轮注入 `<available_skills>`（token 效率）。→ 标记为 `innovation`/`needs-decision`。因能降低每轮 token 成本，可能是下一版本的候选。
- [#92500](https://github.com/nousresearch/hermes-agent/issues/92500) — 桌面上**关闭预览/浏览器面板**的简易方法。→ 微小改动。
- PR [#92213](https://github.com/nousresearch/hermes-agent/pull/92213) — 将群聊**轮次/消息/成员/历史限制设为按房间可配置**（目前为硬编码模块常量）。→ 预计在下一个 minor 版本合入。
- PR [#105753](https://github.com/nousresearch/hermes-agent/pull/105753) — **从 projects.db 注入每会话项目上下文文件**。叠加在 `feature/context-file-includes` 之上；依赖 [#98614](https://github.com/nousresearch/hermes-agent/pull/98614)。→ 重磅特性：按会话上下文组装。
- PR [#105630](https://github.com/nousresearch/hermes-agent/pull/105630) — `/access` 命令，用于**在聊天中管理 DM/群组白名单**，覆盖 Telegram/Discord/Slack/WhatsApp。→ 可能是 v0.22 的路线图候选。

**路线图预测：** v0.22 候选 — 按房间的群聊限制、`/access` 白名单命令、按会话项目上下文文件、懒加载技能目录。可靠性修复（cron heartbeat、Windows 更新、OAuth 刷新、MCP 去重、Telegram 投递）也很可能排在前列。

## 7. 用户反馈摘要

**反复出现的痛点：**
- **跨平台安装/更新脆弱性** — Debian 安装（已修复）、Windows 桌面 `hermes update` 退出码 8、macOS launchd 更新后误报。
- **Windows 特定缺口** — 桌面更新交接（[#105145](https://github.com/nousresearch/hermes-agent/issues/105145)）、skill 路径未做 POSIX 规范化（[#105747](https://github.com/nousresearch/hermes-agent/pull/105747)）、本地代理启动时 IPv6 双栈超时（[#37594](https://github.com/nousresearch/hermes-agent/issues/37594)）。
- **流式/编码正确性** — 桌面流式中葡萄牙语口音字符截断（[#62774](https://github.com/nousresearch/hermes-agent/issues/62774)）。
- **并发/多会话正确性** — 聊天时间线顺序错乱（[#86890](https://github.com/nousresearch/hermes-agent/issues/86890)）、Telegram 重试后最终响应被丢弃（[#103575](https://github.com/nousresearch/hermes-agent/issues/103575)）、API 服务器唤醒导致运行重复（[#77797](https://github.com/nousresearch/hermes-agent/issues/77797)）。
- **信任与安全缺口** — Kanban `blocked` 任务被无主语自动提升（[#39609](https://github.com

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目简报 — 2026-09-08

**仓库:** [nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日概览

截至 2026-09-08 的过去 24 小时内，IronClaw 的 GitHub 活动极为有限。仅有一个 issue 被更新（#8081），没有新的 pull request 被开启或合并，也没有发布任何新版本。这一唯一的活动点是内部/自动化的失败分类报告，而非社区驱动的 bug 报告或功能讨论。总体而言，该仓库目前处于安静的维护或监控阶段，没有显示出与发布相关的活跃开发信号。

---

## 2. 版本发布

过去 24 小时内无新版本发布。按规范省略本节。

---

## 3. 项目进展

过去 24 小时内没有 pull request 被开启、合并或关闭。因此在此时间窗口内，通过 PR 队列推进的任何功能或合并的任何修复均未发生。如有进展，可能发生在 GitHub 之外或以非 PR 形式进行。

---

## 4. 社区热门话题

过去 24 小时内唯一被更新的条目是：

- **[#8081 — Ironclaw 每日失败分类 — 2026-09-07](https://github.com/nearai/ironclaw/issues/8081)**（作者：`pranavraja99`，0 条评论，0 个反应）

**分析：** 从标题和部分摘要来看，这似乎是一份自动化或模板化的每日分类报告，用于归类基准测试失败模式（具体而言是 42 个 officeqa 非通过结果，归因于 "DeepSeek-V4-Flas…[truncated]"）。截断的 "DeepSeek-V4-Flas…" 很可能指向 DeepSeek-V4-Flash 模型质量的数值错误。缺少评论和反应表明这并未引发社区讨论，而是作为内部可观测性产物公开发布。潜在需求：对模型质量和基准可靠性的持续跟踪。

---

## 5. Bug 与稳定性

过去 24 小时内未报告新的 bug、崩溃或回归。唯一更新的 issue（#8081）是一份失败分类报告，而非 bug 报告，但其中隐含记录了 **42 个 officeqa 测试用例失败**，主要归因于模型本身的数值质量问题，而非基础设施问题。尚未针对此问题开启任何修复 PR。

**严重程度分级：**
- **低/信息性：** #8081 — 记录 42 个 officeqa 基准测试失败；定位为模型质量问题，而非系统回归。

---

## 6. 功能请求与路线图信号

过去 24 小时内未提交或更新任何功能请求。从当前 GitHub 活动无法推断出任何路线图信号。

---

## 7. 用户反馈汇总

过去 24 小时内没有来自社区的用户反馈。唯一的 issue（#8081）拥有零条评论和零个反应，表明没有任何外部用户参与。仅凭此时间窗口无法评估用户满意度。

---

## 8. 待办事项关注

- **[#8081](https://github.com/nearai/ironclaw/issues/8081)** — 创建与最后更新均在同一天（2026-09-07）；虽然尚未处于"长期未响应"状态，但维护者可能希望确认每日分类发布的节奏是否符合预期，并核实被截断的摘要文本是否能够正常渲染/完整显示。如果该 issue 在标准自动化发布之外仍未获得任何确认，可能会进入待办积压列表。

根据过去 24 小时的时间窗口，没有其他条目需要维护者关注。

---

**总结评估：** IronClaw 当前处于低活跃度的监控状态。唯一活动 = 自动化的每日基准测试失败分类。代码层面无变动，社区层面无参与信号。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-08

## 1. 今日概览

QwenPaw 在 2026-09-08 表现出非常高的活跃度，过去 24 小时内有 31 个 issue 和 40 个 PR 更新，PR 的合并/关闭与开放比例健康（关闭 24 个，开放 16 个）。维护者们正在积极推送修复，覆盖 Console、MCP、Memory、Agent Runtime 和 Plugin 等子系统，今天暂无新的发布标签。社区反馈主要集中于三大主题：运行时的脆弱性（同步调用冻结事件循环、心跳 cron 反馈循环、异常堆栈被吞掉）、Provider 兼容性边界场景（Gemini、DeepSeek、OpenAI-compat 的 PDF 处理、MCP 401 握手），以及 Console 体验（模态透明度、插件商店易用性、移动端 Agent 选择器）。整体项目健康状况良好 — issue 处理周转迅速，多位首次贡献者成功合入 PR，长期存在的回归（例如 8 月份的 IME 崩溃）也正在被关闭。

## 2. 发布

过去 24 小时内无新发布。根据 issue 反馈，最新的标签版本仍停留在 `2.2.0` / `2.2.0b*` 系列。

## 3. 项目进展

以下 PR 在过去 24 小时内被合并/关闭，代表了具体的进展：

- **[#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610)** `fix(console): prevent chat submissions from bypassing the queue` — 通过将发送端的提交路由到 localStorage 队列，关闭了 409 "A task is already running" 问题（[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)）。
- **[#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631)** `fix(hub): authenticate CLI requests to the current local runtime` — 解决 [#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612)；内置 CLI 命令在 Hub 托管沙盒中不再出现 401。
- **[#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598)** `fix(shell): detach child stdin from interactive console` — 解决 [#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554)；Windows 上子 shell 进程不再劫持 cmd 的 stdin。
- **[#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627)** `fix(mcp): let the legacy handshake arbitrate a 401 discover probe` — 解决 [#7620](https://github.com/agentscope-ai/QwenPaw/issues/7620)；遗留 MCP 服务器（如 pkulaw）不再被错误地报告为 "requires OAuth"。
- **[#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605)** `fix(issue 7582 plugin manager)` — 保留 marketplace 标签页、显示更新、支持批量更新（[#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)）。
- **[#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578)** `fix(tool_calls): log exceptions in coordinator _drain()` — 解决 [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572)；工具调度中的异常堆栈现在会被记录，而不是被静默地字符串化。
- **[#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621)** `fix(agents): handle PDF blocks for text-only models` — 解决 [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617)；持久化的 PDF `DataBlock` 历史不再永久性地破坏纯文本的 OpenAI-compat 端点。
- **[#7482](https://github.com/agentscope-ai/QwenPaw/pull/7482)** `feat(agent-kanban): add Chinese and English localization` — Kanban PawApp 现在遵循宿主语言环境。
- **[#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502)** `feat(console): redesign sidebar and settings experience` — 统一且可配置的侧边栏；保留插件注册表/扩展插槽。
- **[#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521)** `fix(agent): fold consumed thinking under context pressure` — 减少因滚动/思维链溢出导致的 `MODEL_EXECUTION_ERROR`（与 [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) 相关）。
- **[#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526)** `feat(agent): add protected execution contract` — 在工作区提示文件之前应用授权/澄清契约。

## 4. 社区热点话题

过去 24 小时内评论最多的条目以及它们反映出的需求：

1. **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)** — *"模型回复意外从上下文中丢失"*（6 条评论，**OPEN**）。需求：跨轮的持久、可靠的对话记忆，特别是当助手消息看似已保存但对下一次请求不可见时 — 指向 `_maybe_stamp_finished_at` 持久化与下一请求上下文组装之间的同步缺口。
2. **[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)** — *任务运行中发送聊天时出现 409 冲突*（5 条评论，**CLOSED**，由 [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) 修复）。需求：队列优先的体验 — 用户期望正在途中的提交能够等待，而不是报错。
3. **[#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)** — *同步调用在启动和发送消息时冻结事件循环约 120 秒*（5 条评论，**OPEN**）。需求：原生异步的启动/健康检查路径；可配置的超时。这是一个基础的响应性回归。
4. **[#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597)** — *工具返回的图片/PDF 以裸 base64 形式触发 400*（5 条评论，**CLOSED**）。需求：在到达 Provider 之前，对工具输出的媒体进行统一的规范化处理（上传/编码）。
5. **[#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469)** — *ReMe 后台嵌入/索引静默失败*（5 条评论，**CLOSED**）。需求：内存任务失败的可见性（大声失败而非静默），以及 OpenAI-compat 嵌入的正确依赖启动顺序。
6. **[#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)** — *`RetryChatModel` 中硬编码的 32768 回退值导致所有模型出现 `CONTEXT_UNFIT`*（5 条评论，**OPEN**）。需求：按模型的默认上下文大小，而不是一刀切的回退值。
7. **[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589)** — *心跳 cron 会话反馈循环 — 重复消息堆积，Agent 约 2 小时无响应*（4 条评论，**OPEN**）。需求：定时 cron 驱动轮次的幂等性/去重保护；严重程度：高。
8. **[#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541)** — *滚动上下文压缩对 `[context compressed]` 标记使用 `role=user`，破坏 DeepSeek*（4 条评论，**CLOSED**）。需求：注入的系统标记应使用 Provider 感知的消息角色映射。

**底层主题：** 大多数热点都集中在 *持久化、上下文组装与 Provider 适配器之间的衔接处的正确性* — 当非典型的消息形态（PDF 数据块、系统标记、卸载的工具完成、base64 媒体）跨越该边界时，用户反复遭遇边界场景。

## 5. Bug 与稳定性

按严重程度排序（每行注明是否存在已合并的 PR）：

| 严重程度 | Issue | 标题 | 修复 PR？ |
|---|---|---|---|
| **Critical** | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) | 模型 "看不到自己刚说的话" — 上下文组装回归 | **尚无（开放）** |
| **High** | [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) | 心跳 cron 重复反馈循环；Agent 约 2 小时无响应 | **尚无（开放）** |
| **High** | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | 同步调用在启动时阻塞事件循环 118–135 秒；超时从未触发 | **尚无（开放）** |
| **High** | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | `RetryChatModel` 中硬编码的 32768 `context_size` 回退值（v2.1.0–v2.2.0） | **尚无（开放）** |
| **Medium** | [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617) | 工具结果中的 PDF `DataBlock` 永久破坏纯文本 OpenAI-compat 端点 | [#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) 已合并 |
| **Medium** | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) | 任务运行时提交聊天出现 409 | [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) 已合并 |
| **Medium** | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) | 工具返回的图片/PDF 以裸 base64 形式导致 400 | 已合并（未标注编号） |
| **Medium** | [#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469) | ReMe 后台嵌入失败；新记忆从不被索引 | 已合并 |
| **Medium** | [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572) | `_coordinator._drain` 静默吞掉堆栈跟踪 | [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) 已合并 |
| **Medium** | [#7620](https://github.com/agentscope-ai/QwenPaw/issues/7620) | MCP streamable-http 401 错误地报告 "requires OAuth" | [#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627) 已合并 |
| **Medium** | [#6885](https://github.com/agentscope-ai/QwenPaw/issues/6885) | Console UI 在中文 IME `compositionEnd` 时崩溃（v2.1.0b2） | **先前已合并；今日验证稳定** |
| **Low** | [#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554) | Windows 上 Shell 工具子进程继承 Console stdin | [#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598) 已合并 |
| **Low** | [#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612) | Hub 本地沙盒中内置 CLI 命令出现 401 | [#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631) 已合并 |
| **Low** | [#7619](https://github.com/agentscope-ai/QwenPaw/issues/7619) | qwen-35B-A3B-FP8 对话无原因结束 | **尚无（开放）** |
| **Low** | [#7618](https://github.com/agentscope-ai/QwenPaw/issues/7618) | QQ 频道机器人在群聊中无响应 | **尚无（开放）** |
| **Low** | [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) | v2.2.0 Web Console 模态背景 "透明" | **尚无（开放）** |
| **Low** | [#7630](https://github.com/agentscope-ai/QwenPaw/issues/7630) | NumPy baseline 优化在 VM/云桌面（CPU 检测）上崩溃 | **尚无（开放）** |
| **Low** | [#7625](https://github.com/agentscope-ai/QwenPaw/issues/7625) | Gemini 400 错误出现在后台工具完成之后 | [#7629](https://github.com/agentscope-ai/QwenPaw/pull/7629) 开放（do-not-merge） |
| **Low** | [#7607](https://github.com/agentscope-ai/QwenPaw/issues/7607) | Cursor ACP Runner JSON-RPC 协议违规 → 流崩溃 | **尚无（开放）** |
| **Low** | [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) | llama.cpp 5 位构建号 → 静默降级 | **尚无（开放）** |

## 6. 功能请求与路线图信号

过去 24 小时观察到的面向用户的需求，及其在下一个 minor 版本（`2.2.x` 补丁或 `2.3.0`）中合入的可能性：

- **[#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628)** — *预算感知的上下文压缩，并安全处理活动轮次溢出。* 与已关闭的 [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) / 已合并的 [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521) 工作方向一致。**很有可能** 合入 `2.2.1`/`2.3.0`。
- **[#7583](https://github.com/agentscope-ai/QwenPaw/issues/7583)** — *将 AgentScope 社区（登录、收件箱、反馈）集成到 Console。* 战略级、生态层面的布局。**可能** 合入近期某个 Console 版本。
- **[#7479](https://github.com/agentscope-ai/QwenPaw/issues/7479)** — *对未知斜杠命令的本地反馈（含纠正建议）。* 已有首次贡献者提交的 PR [#7632](https://github.com/agentscope-ai/QwenPaw/pull/7632)。**可能** 合入 `2.2.1`。
- **[#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)** — *插件商店：批量更新 + 更新通知。* 已通过 [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) 合并。**已发布**。
- **[#7623](https://github.com/agentscope-ai/QwenPaw/pull/7623)** — *带固定 Agent 入口的移动端 Agent 选择器。* 开放 PR。**可能** 合入 `2.2.x` 或 `2.3.0`。
- **[#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)** — *`Re

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目日报 — 2026-09-08

## 1. 今日概览

ZeroClaw 在 2026-09-08 呈现 **高开发吞吐但零发布输出** 的状态。仓库今日涉及 29 个 issue（24 个仍开放，5 个已关闭）和 50 个 pull request（全部仍开放，无合并/关闭），表明存在严重的审查积压而非低产。已关闭的工作集中在 Telegram/WhatsApp 渠道修复以及 provider 缓存调优优化。开放工作横跨一组协调推进的 bootstrap/启动器基础 PR、ZeroCode ACP/代码面板修复，以及 Anthropic 兼容 provider 的缓存断点工作。今天整体呈现 **发布周期中的中期稳定** 态势：维护者在清理小型 bug 修复，同时大量 XL 级 PR 等待审查。

## 2. 发布

**过去 24 小时内无新发布**。无版本号变更可报告。

## 3. 项目进展

今日关闭了 5 个 issue，全部为 bug/增强工作：

| Issue | 标题 | 结果 |
|---|---|---|
| [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) | `heartbeat.target` 拒绝 `<type>.<alias>` 复合键 | 已关闭（P2, S1）— 渠道路由修复已落地 |
| [#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660) | 在上一轮最后一条消息处设置第三个缓存断点 | 已关闭（P2）— Anthropic 及兼容 provider 缓存策略扩展 |
| [#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688) | WhatsApp Web 语音消息从未被转录 | 已关闭（P2）— orchestrator 现已接入 agent 的转录 provider |
| [#10326](https://github.com/zeroclaw-labs/zeroclaw/issues/10326) | 可靠流式错误报告错误的模型 | 已关闭（P3）— 诊断准确性修复 |
| [#10693](https://github.com/zeroclaw-labs/zeroclaw/issues/10693) | ZeroCode 静默忽略 Enter 提交 | 已关闭（S1）— 工作流阻塞已解决 |

**重要进展：** 一组关于 prompt 缓存正确性的连贯工作通过 [#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660) 落地，并与仍开放的配套工作 [#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674) 和 [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) 形成协同。provider/缓存领域正作为一个整体被加固。

**今日无 PR 合并** — 涉及的 50 个 PR 全部仍在审查队列中。

## 4. 社区热点议题

互动最高的讨论集中在三大主题：**PR 审查治理**、**ZeroCode ACP/代码面板正确性**，以及 **Telegram 渠道用户体验**。

- [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — *RFC：澄清 PR 审查证据、时效性警告及作者行为边界*（6 条评论，已接受，高风险）。反映了维护者面对含糊审查证据与合并阻塞决策时的痛点；该 RFC 甚至提议设立"快速合并通道"。这属于 PR 治理层面的流程杂音，说明项目已不再适用非正式的审查规则。
- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — *将 Telegram 媒体组合并为单个多模态轮次*（7 条评论，进行中，已存在 5 个月）。用户期望相册式附件对应一次 LLM 调用；Zeroclaw 当前将其拆散。明显的 UX 期望偏差。
- [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) — *失败的 ACP 轮次在切换会话后消失*（5 条评论，P1，进行中）。Code/ACP 会话失败时的运维工作流阻塞。
- [#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641) — *按字段输入的 cron 调度*（3 条评论，已接受）。Web UI 的 cron 输入目前是原始 cron 字符串；用户希望采用引导式、按字段校验的输入方式。
- [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) — *Epic：从 zerocode 侧边栏运行并监控多个 agent*（2 条评论，进行中，高风险）。多 agent 并行需求通过 epic 跟踪 issue 浮现。

**底层需求：** 用户正逐渐超出单会话、单 agent 工作流（ZeroCode + ACP）的承载能力，期望获得并行可观测性；与此同时，维护者社区正重新协商审查规则以保持 PR 队列畅通。

## 5. Bug 与稳定性

按严重度排序：

**S1 / P1（阻塞工作流）：**
- [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) — 失败的 ACP 轮次在切换会话后消失。进行中，尚未关联修复 PR。
- [#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674) — 历史裁剪在上限处停止，导致工具密集型会话的 prompt 缓存失效。已接受，高风险，未关联修复 PR。
- [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) — ZeroCode ACP 转录会丢弃工具调用前发出的助手文本。P1，高风险，未关联修复 PR。
- [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685) — Tracker：可靠的 agent 投递与 cron 结果上报（误报成功、重复、cron 结果缺失）。P1，已接受。

**S2 / P2（降级行为）：**
- [#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667) — 当 prompt 完成先于 TurnComplete 时，ZeroCode 重复渲染流式响应。进行中。
- [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) — 当回复以 `[` 开头时（ElevenLabs v3 音频标签），Telegram 语音回复被静默跳过。
- [#10694](https://github.com/zeroclaw-labs/zeroclaw/issues/10694) — Windows 上 PowerShell shell 测试间歇性超时（CI flake）。
- [#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690) — 集成页面"Configure"链接对显示名做了 slugify 处理（Z.AI → `path_not_found`）。
- [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) — 成本账本以普通输入价格写入缓存价格，低估了每次缓存未命中。
- [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700) — 成本记录共享 daemon 生命周期内的 session id；无法按对话拆分支出。
- [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) — 含图片附件的用户消息会让整个历史缓存前缀失效。
- [#10695](https://github.com/zeroclaw-labs/zeroclaw/issues/10695) — 被其他客户端修改的 ZeroCode 会话在聚焦时未刷新。
- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram 媒体组未合并为单个多模态轮次。

**S3 / P3（轻微）：**
- [#10702](https://github.com/zeroclaw-labs/zeroclaw/issues/10702) — Token 预算裁剪器与消息上限裁剪器存在相同的滞后间隙。

**修复 PR 覆盖：** 在今日数据中，开放的 P1/S1 bug 均未直接关联已合并的修复。[#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) 与 [#10693](https://github.com/zeroclaw-labs/zeroclaw/issues/10693) 已关闭，但剩余 P1 集合（#9333、#10674、#10697、#10685）**正等待作者提交或维护者审查**。

## 6. 功能请求与路线图信号

多个功能请求围绕 OpenAI Responses 增强展开，暗示短期内会有 provider 层面的推进：

- [#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704) — OpenAI Responses 上的异步函数工具（允许模型在已批准工具运行时继续）。
- [#10705](https://github.com/zeroclaw-labs/zeroclaw/issues/10705) — 为兼容的 OpenAI 模型显式指定 `max` 推理强度（GPT-6 Astra）。
- [#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706) — 在 OpenAI Responses 调用路径间保持不透明的推理状态。
- [#10707](https://github.com/zeroclaw-labs/zeroclaw/issues/10707) — 通过 OpenAI Responses 的有界程序化工具调用。
- [#10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708) — OpenAI Responses WebSocket 上的主动响应引导。

由同一作者（`IftekharUddin`）在 24 小时窗口内集中开启的五项 OpenAI Responses 功能 — 这是一次协调推进的功能推送，**极有可能在下一次 provider 适配器发布中落地**。

其他已接受/进行中的功能工作：
- [#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641) — 按字段的 cron 调度输入（Web）。优秀的下一小版本候选。
- [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) — 多 agent 侧边栏 epic。长期、结构性工作。
- [#10695](https://github.com/zeroclaw-labs/zeroclaw/issues/10695) — 刷新被其他已连接客户端修改的 ZeroCode 会话。与 [#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727) 及 [#9739](https://github.com/zeroclaw-labs/zeroclaw/issues/9739) 配套。
- [#10709](https://github.com/zeroclaw-labs/zeroclaw/issues/10709) — 记录 Astra 在 API key 与 Codex 订阅 provider 下的设置方式。

**下一版本预测：** 下一个标签版本最有可能打包 OpenAI Responses 功能集群（#10704–#10708）、Anthropic 缓存策略优化（#10660 + #10674 + #10701），以及今日关闭的 bug 修复（#10670、#10688、#10693、#10326）。

## 7. 用户反馈摘要

从 issue 正文和近期报告中可见的真实用户痛点：

- **Cron 用户体验不友好。** 用户拿到的是未经校验、且无可读预览的原始 cron 表达式 — [#10641](https://github.com/zeroclaw-labs/zeroclaw/issues/10641) 直接反映了这一点。
- **聊天渠道语音转录不可靠。** WhatsApp Web 语音消息从未被转录（[#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)），Telegram 语音回复在以 `[` 开头的输出上被静默跳过（[#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)）。
- **成本可见度过粗。** 缓存写入的 token 计费（[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)）与 session id 粒度（[#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)）共同阻碍按对话的成本分析。
- **单会话工作流无法扩展。** 用户希望并行观察多个 agent（[#9727](https://github.com/zeroclaw-labs/zeroclaw/issues/9727)），并让 UI 反映来自其他客户端的并发编辑（[#10695](https://github.com/zeroclaw-labs/zeroclaw/issues/10695)）。
- **多模态输入下 prompt 缓存脆弱。** 图片导致缓存失效范围超出应有程度（[#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)），且工具密集型会话中历史裁剪的滞后效应让缓存失效（[#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)）。
- **ACP/代码面板保真度在退化。** 工具调用前的助手文本被丢弃（[#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)），失败轮次消失（[#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)），流式完成可能重复渲染（[#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667)）。

今日所有条目均未显示 👍 反应 — 互动以评论为主。满意度信号是隐性的：大多数开放 issue 均处于已跟踪或进行中状态，而非长期无人问津。

## 8. 待办积压观察

需要维护者关注的条目 — 长期存在或体量大但缺乏明确进展：

| 条目 | 类型 | 存续时间 | 需关注原因 |
|---|---|---|---|
| [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) | Bug（P2） | 5 个月 | Telegram 媒体批处理自 4 月起一直"进行中"；是现存最古老的开放项。 |
| [#9341](https://github.com/zeroclaw-labs/zeroclaw/issues/9341) | PR（XL，需维护者审查） | 约 6 周 | 代码会话历史 vs 持久化内存隔离；体量大，标记需审查。 |
| [#8949](https://github.com/zeroclaw-labs/zeroclaw/issues/8949)、[#8862](https://github.com/zeroclaw-labs/zeroclaw/issues/8862) | 堆叠 PR（XL，需作者操作） | 约 9 周 | 受治理的插件 webhook 入口 — 堆叠中，阻塞于作者操作；是插件生态的基础。 |
| [#9002](https://github.com/zeroclaw-labs/zeroclaw/issues/9002) | PR（XL，需作者操作） | 约 8 周 | 网关在查看者断开后仍保持 agent 轮次存活。 |
| [#9222](https://github.com/zeroclaw-labs/zeroclaw/issues/9222) | PR（XL，需作者操作） | 约 7 周 | 按维度的 LLM-judge 评估评分器。 |
| [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) | RFC（已接受） | 2 周 | PR 审查策略 RFC，提出快速合并通道 — 社区意见征集仍在进行。 |
| [#10119](https://github.com/zeroclaw-labs/zeroclaw/issues/10119) | PR（

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*