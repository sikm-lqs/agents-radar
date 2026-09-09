# OpenClaw 生态日报 2026-09-10

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-09 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-10

## 1. 今日概览

OpenClaw 仓库活跃度非常高：**过去 24 小时内有 500 个 issue 和 500 个 PR 被更新**（issue 310/190 拆分，PR 262/238 拆分），期间未发布任何带 tag 的版本。活动明显偏向 **2026.9.x 系列的稳定化** —— 今日几乎所有 P0/P1 都涉及 2026.7.1-2 到 2026.9.3 之间引入的回归问题，主要集中在 Gateway 事件循环、memory-core SQLite 膨胀、OAuth/Codex 流程以及渠道插件（Telegram、Slack、Discord、飞书）方面。维护者评审带宽是最大的瓶颈：许多高优先级 bug 已有关联的修复 PR 处于 "ready for maintainer look" 或 "needs proof" 状态，但今日没有任何合并动作。社区显然处于回归消化阶段，而非功能扩展阶段。

## 2. 版本发布

**过去 24 小时无新版本发布。** issue 流中引用的最新 tag 版本为 2026.8.1、2026.8.2、2026.9.1、2026.9.2 和 2026.9.3（commit `1391f7c`）；特别是 2026.9.x 系列在过去 24 小时内引发了数个"发布阻塞"回归 —— 参见 [Issue #137813](https://github.com/openclaw/openclaw/issues/137813)（Windows gateway 无法启动）、[Issue #142336](https://github.com/openclaw/openclaw/issues/142336)（`/dashboard` 遮挡 Telegram Mini App），以及 [Issue #142585](https://github.com/openclaw/openclaw/issues/142585)（在 2026.9.3 上 Doctor 拒绝合法的旧版工作区配置）。

## 3. 项目进展

相对于庞大的活动量，今日关闭/合并的 PR 数量很少。值得注意的已关闭 PR 都是低影响范围的内部改进：

- [PR #143451](https://github.com/openclaw/openclaw/pull/143451) — `fix(sessions): identify slow SQLite writer operations`（XL，涉及 docs/gateway/commands/agents）。具有运营意义：解决了 [Issue #119720](https://github.com/openclaw/openclaw/issues/119720)（Gateway 事件循环卡顿）中提到的"慢写入缺少 trace 上下文"的缺口。
- [PR #143472](https://github.com/openclaw/openclaw/pull/143472) — `docs(gateway): lift non-family sections out of RPC method families`（XS）。纯文档整理。
- [PR #143469](https://github.com/openclaw/openclaw/pull/143469) — `improve(test): reduce Gateway worktree fixture setup`（S）。测试基础设施提速，无运行时行为变更。

其他仍处于开放队列、"ready for maintainer look" 状态尚未合并的值得注意的 PR 包括：[PR #141072](https://github.com/openclaw/openclaw/pull/141072)（空闲超时结束的回合应标记为 `failed`）、[PR #143433](https://github.com/openclaw/openclaw/pull/143433)（heartbeat MCP 子进程泄漏）、[PR #142626](https://github.com/openclaw/openclaw/pull/142626)（bridge 恢复后 iMessage 反馈 —— 已准备好 automerge）、[PR #142768](https://github.com/openclaw/openclaw/pull/142768)（排空 ingress 声明）、[PR #142888](https://github.com/openclaw/openclaw/pull/142888)（OpenAI completions 文本重复），以及 [PR #143437](https://github.com/openclaw/openclaw/pull/143437)（Control UI Stop 按钮持久化）。

## 4. 社区热点

按评论数和反应数排序，置顶项目都集中在同样的几个反复出现的痛点：**工具调用可靠性**、**多 agent 编排**、**memory-core SQLite 膨胀**、**OAuth/Codex 回归**，以及 **prompt cache 失效**。

- [Issue #135111](https://github.com/openclaw/openclaw/issues/135111)（26 条评论）— 在 v2026.8.1 上使用 claude-sonnet-5 时偶发 `Provider completed tool call with malformed JSON arguments`。**诉求：** 在模型侧对部分 JSON 工具参数增加重试/容错，并补充 provider 版本固定的相关文档。
- [Issue #97616](https://github.com/openclaw/openclaw/issues/97616)（16 条评论，👍1）— 在 `openclaw` 下，未被回收的 hook/工具子进程会累积为僵尸进程。**诉求：** 为工具/hook 执行期间衍生的子进程建立显式的生命周期/清理契约。
- [Issue #119720](https://github.com/openclaw/openclaw/issues/119720)（15 条评论）— 同步的 agent 持久化和会话记录维护在大规模下阻塞 Gateway 事件循环。**诉求：** 异步/队列解耦的持久化路径。
- [Issue #43367](https://github.com/openclaw/openclaw/issues/43367)（14 条评论，👍1）— 多 agent 编排不稳定：并发的 `agents add/config` 相互覆盖、会话锁失败、子任务脱离管控。**诉求：** 按 agent 粒度的配置锁以及幂等的 CLI 语义。
- [Issue #89278](https://github.com/openclaw/openclaw/issues/89278)（12 条评论，👍2）— Codex OAuth 刷新成功，但 cron/heartbeat 以 10s 超时失败。**诉求：** 增加一个与实际探测时长对齐的刷新超时旋钮。
- [Issue #95610](https://github.com/openclaw/openclaw/issues/95610)（12 条评论，👍2）— OpenAI 模型上的 prompt cache 前缀抖动：每轮动态注入破坏了自动前缀缓存。**诉求：** 具备缓存感知能力的布局（手动的 `cache_control` 断点或将易变块提升到前缀之外）。
- [Issue #88757](https://github.com/openclaw/openclaw/issues/88757)（6 条评论，👍3 —— 今日反应数最高）— 主动发送的消息未出现在会话上下文中，导致状态不同步。**诉求：** 将主动发送的记账信息回写到会话记录中。
- [Issue #126906](https://github.com/openclaw/openclaw/issues/126906)（5 条评论）— 拒绝 write 工具会静默禁用 memory 持久化，但 agent 仍然报告成功。**诉求：** 当 `tools.deny` 与系统关键工具冲突时，向运维者发出显式可见的告警，并向 agent 抛出可见的错误。

## 5. Bug 与稳定性

今日新增或今日更新，按 P 级别和 `impact:*` 标签排序。P0/P1 优先。

### P0 / 发布阻塞回归（2026.9.x 系列）
- **[Issue #137813](https://github.com/openclaw/openclaw/issues/137813)** — 更新到 2026.9.1 后 Windows gateway 无法启动；新增的 `--task-supervisor` 标志静默退出码 0。*尚无关联的修复 PR。*
- **[Issue #89278](https://github.com/openclaw/openclaw/issues/89278)** — cron/heartbeat 内部 Codex OAuth 10s 刷新超时失败。已有关联 PR，但今日未进入关闭集合。
- **[Issue #115642](https://github.com/openclaw/openclaw/issues/115642)** — 订阅鉴权下，计费冷却时长在故障结束后仍未解除；在一次瞬态计费错误后长达 5 小时内请求仍因 `Provider anthropic is in cooldown (suspending lanes) (billing)` 失败。*尚无关联的修复 PR。*
- **[Issue #142585](https://github.com/openclaw/openclaw/issues/142585)** — 2026.9.3 上 Doctor 在缺少规范行时拒绝合法的旧版工作区配置和 attestation 导入。*尚无关联的修复 PR。*

### P1 平台/稳定性
- **[Issue #97616](https://github.com/openclaw/openclaw/issues/97616)** — 僵尸 hook/工具子进程。自 2026-06-29 起开放。
- **[Issue #119720](https://github.com/openclaw/openclaw/issues/119720)** — 同步持久化阻塞 Gateway 事件循环。近期评论指出 [#140231](https://github.com/openclaw/openclaw/issues/140231) 和 [#138984](https://github.com/openclaw/openclaw/issues/138984) 带来了部分修复。
- **[Issue #140010](https://github.com/openclaw/openclaw/issues/140010)** — Windows 休眠/唤醒后：WebSocket 重连可能失败 30–60s 以上。
- **[Issue #138042](https://github.com/openclaw/openclaw/issues/138042)** — Gateway 控制请求可能停顿 157–276s。
- **[Issue #127148](https://github.com/openclaw/openclaw/issues/127148)** — `sessions.compact` 会获取第二个 app-server，触发 active-writer 冲突。
- **[Issue #136311](https://github.com/openclaw/openclaw/issues/136311)** — `memory-core` Gateway 每次启动都重新获取 reindex 锁；产生 19 GB 孤立的 `memory-reindex-*` 临时数据库。
- **[Issue #114612](https://github.com/openclaw/openclaw/issues/114612)** — `memory_index_chunks` + `memory_embedding_cache` 表缺少保留策略。
- **[Issue #125570](https://github.com/openclaw/openclaw/issues/125570)** — Skill Workshop 的 update apply 会覆盖在线 skill 的描述，静默破坏 skill 路由。
- **[Issue #139274](https://github.com/openclaw/openclaw/issues/139274)** — 原生 `/codex bind` 丢弃语音附件，并跳过配置的 STT。
- **[Issue #115367](https://github.com/openclaw/openclaw/issues/115367)** — 平台自有的读访问门控要求 `origin: bundled`，但 slack/discord/matrix/msteams/feishu 现在以外部插件形式分发 → 读取被限定在当前会话内。
- **[Issue #123799](https://github.com/openclaw/openclaw/issues/123799)** — 基于 2026.5.12 的生产部署仍被 Codex compact 404 阻塞；需要明确的升级/backport 指引。

### 今日关闭的 P1 回归（残余风险）
- **[Issue #135111](https://github.com/openclaw/openclaw/issues/135111)** — 格式错误的 JSON 工具调用（已关闭）。
- **[Issue #137927](https://github.com/openclaw/openclaw/issues/137927)** — 内部的 `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` 块泄漏到 Telegram 消息正文中（已关闭）。
- **[Issue #140971](https://github.com/openclaw/openclaw/issues/140971)** — 在消息驱动的运行中，全部 13 个 Feishu 插件工具被静默丢弃（已关闭）。
- **[Issue #133692](https://github.com/openclaw/openclaw/issues/133692)** — 隔离的 cron 在派发前拒绝了已被取代的 prepared runtime generation（已关闭，已关联 PR）。
- **[Issue #141617](https://github.com/openclaw/openclaw/issues/141617)** — 2026.9.2 npm 更新在完成支持的修复后仍卡在 `requested/running`（已关闭）。

### P2 渠道/UX 回归
- **[Issue #142037](https://github.com/openclaw/openclaw/issues/142037)** — 内嵌运行时会将显式路由的 `message` 工具回复在 Slack 中记录为 "mute"。
- **[Issue #142336](https://github.com/openclaw/openclaw/issues/142336)** — `/dashboard` 遮挡 Telegram Mini App 启动器。
- **[Issue #143278](https://github.com/openclaw/openclaw/issues/143278)** — 2026.9.3 上 heartbeat 内部输出泄漏到 Telegram 用户聊天中。
- **[Issue #139714](https://github.com/openclaw/openclaw/issues/139714)** — `updateCommand()` 接受了一个永远无法完成的 `update_runs` 行 → `openclaw status` 永远报告 "update in progress"。
- **[Issue #44502](https://github.com/openclaw/openclaw/issues/44502)** — Discord 路由/mention 门控过于宽松的回归。
- **[Issue #112160](https://github.com/openclaw/openclaw/issues/112160)** — SSH 沙箱不会把入站媒体暂存到已有的远端工作区。
- **[Issue #128637](https://github.com/openclaw/openclaw/issues/128637)** — 多 agent 场景下 Exec/无 agent 操作出现 `AgentSelectionRequiredError`。
- **[Issue #99925](https://github.com/openclaw/openclaw/issues/99925)** — WebChat 新建会话会丢失全部历史会话上下文（Windows）。
- **[Issue #53628](https://github.com/openclaw/openclaw/issues/53628)** — 安装 skill 时未对 `${XDG_CONFIG_HOME}` 进行展开（自 2026-03-24 起开放）。
- **[Issue #41201](https://github.com/openclaw/openclaw/issues/41201)** — Control UI 头像图片显示为损坏（自 2026-03-09 起开放）。

### 严重度模式

主导的故障模式是 **2026.7 → 2026.9 迁移过程中引入的、对运维者可见的回归**：更严格的插件来源门控（[#115367](https://github.com/openclaw/openclaw/issues/115367)）、Windows 上 `--task-supervisor` 静默退出（[#137813](https://github.com/openclaw/openclaw/issues/137813)）、命令遮挡（[#142336](https://github.com/openclaw/openclaw/issues/142336)），以及 Doctor 拒绝旧版状态（[#142585](https://github.com/openclaw/openclaw/issues/142585)）。围绕 SQLite 路径的 memory-core 回归是第二类聚集问题（[#136311](https://github.com/openclaw/openclaw/issues/136311)、[#114612](https://github.com/openclaw/openclaw/issues/114612)、[#50611](https://github.com/openclaw/openclaw/issues/50611)）。

## 6. 功能请求与 Roadmap 信号

今日更新的功能请求大多是长寿命、尚未获得维护者产品决策的项目（多数带有 `clawsweeper:needs-product-decision` 标签）。

- **[Issue #6599](https://github.com/openclaw/openclaw/issues/6599)** — 增加 `/models test-fallback` 命令。*很可能在下一个 minor 版本中落地*：低风险、高实用性，契合现有的 `/models` 入口。
- **[Issue #6757](https://github.com/openclaw/openclaw/issues/6757

---

## 横向生态对比

# 跨项目对比报告：开源个人 AI 助手生态
**数据窗口：2026-09-10（24小时）| 涉及项目：OpenClaw、Hermes Agent、QwenPaw、ZeroClaw、IronClaw**

---

## 1. 生态概览

个人 AI 助手/Agent 赛道已经过了功能抢地盘的阶段，进入**整合与稳定期**——五个跟踪项目在窗口期内均零发布，其中四个要么处于回归收敛阶段（OpenClaw、QwenPaw），要么处于架构/RFC 迭代周期（ZeroClaw）。趋同现象十分显著：各独立代码库正同时撞上同样的墙——上下文压缩预算、记忆存储膨胀、供应商成本与提示缓存经济性、MCP 标准化、Windows 平台对齐以及移动端覆盖。普遍瓶颈已不再是创意匮乏或贡献不足，而是**维护者审阅带宽**——每个项目都有修复 PR 卡在"待审阅"或"需作者/维护者操作"状态。对开发者而言，这是一个走向成熟的市场，竞争前沿已转向可靠性工程与信任边界，而非新增能力。

---

## 2. 活跃度对比

*计数 = 24 小时窗口内更新的条目（不仅限于新增）；合入 = 窗口期内 PR 的 merge/close。*

| 项目 | Issue（24h） | PR（24h） | 已合入 PR | 发布状态 | 健康度（0–10） |
|---|---|---|---|---|---|
| **OpenClaw** | ~500（310 开放 / 190 关闭） | ~500（262 / 238） | ~3 | 无；最新版本 2026.9.3，分支持续生成发布阻塞 | **6.5** — 速度与采用率无出其右，但 P0 未修，合并率仅 ~0.6% |
| **Hermes Agent** | 50（46 / 4） | 50（42 / 8） | 8 | 无；发布流水线被阻塞（#88584，已 24 天） | **7.0** — 修复合并纪律最佳；Windows 技术债 + 发布受阻 |
| **QwenPaw** | 22（11 / 11） | 34（26 / 8） | 8 | 无；正在稳定 v2.2.0（2.2.0b7） | **7.5** — 吞吐量、分诊速度与功能管线三者最均衡；3 个高危 bug 缺修复 PR |
| **ZeroClaw** | 33 开放 | 49 开放 | 1 | 无；ZeroCode v0.8.5 发布引入回归 | **6.0** — 设计文化最强；合并率约 2%，有数月之久的已确认 bug |
| **IronClaw** | 1 | 6（4 开放 / 2 合入） | 2 | 无 | **5.0** — 干净且稳定，但单一贡献者高度集中，社区参与为零 |

---

## 3. OpenClaw 的定位

**相对同行的优势**
- **量级不在一个层次：** 日均 issue/PR 量是任何同行的约 10 倍。累计追踪编号（~#143k 对比 Hermes ~#106k、ZeroClaw ~#10.7k、IronClaw ~#8k、QwenPaw ~#7.6k\*）印证了其最大的历史贡献者与用户基数。\*各项目编号规则不同，仅作方向性参考。
- **集成覆盖面最广：** Telegram、Slack、Discord、飞书、Matrix、MS Teams、iMessage、WebChat，外加心跳/定时、memory-core 以及多 Agent CLI。企业级痛点（计费冷却、飞书工具掉线、订阅鉴权）表明其已具备同行尚未呈现的生产部署采用度。
- **结构化分诊成熟度高：** 产品决策门槛标签与按影响打标的做法显示出制度化流程。

**短板**
- **吞吐转化率低：** 约 500 条 PR 更新仅合入 ~3 条；Hermes 以十分之一的体量合入了 8 条。多个 P0（Windows 网关启动 #137813、计费冷却 #115642、Doctor 拒绝旧版工作区 #142585）排在队列顶端却无关联修复 PR。
- **发布列车回归：** 2026.7→2026.9 迁移反复触发发布阻塞——属于节奏问题，而非偶发事件。

**技术路线差异：** OpenClaw 是**以网关为中心的单体 + 插件化通道**——集成价值最大化，但网关事件循环本身就是反复出问题的表面（#119720 同步持久化卡顿、#138042 157–276 秒控制卡顿）。ZeroClaw 正有意识地朝相反方向重构（runtime 拥有 session + transport 适配器，RFC #9487）；QwenPaw 以打磨良好的 Console/Desktop 搭配可替换的本地运行时；Hermes 跑的是跨 fork 的交付流水线；IronClaw 是托管 MCP 平台层。

**社区：** OpenClaw 的互动广而浅（每条平均热度 12–26 评论、点赞 ≤3👍）；Hermes 呈集中式深度讨论（81 条评论的流程辩论）；QwenPaw 的新人漏斗最健康（首次贡献者能交付有意义的修复）。

---

## 4. 共同关注的技术方向

| 主题 | 项目 | 具体证据与诉求 |
|---|---|---|
| **上下文压缩与会话完整性** | OpenClaw、QwenPaw、ZeroClaw、Hermes | OpenClaw 同步持久化阻塞事件循环（#119720）；QwenPaw 压缩超出 provider 预算（#7628、PR #7652）；Hermes 压缩后上下文过期（#94001）；ZeroClaw 压缩比例 PR 停滞（#9535）。诉求：预算感知的异步持久化路径。 |
| **记忆存储膨胀与保留策略** | OpenClaw、QwenPaw、Hermes、ZeroClaw | 19 GB 孤儿重建索引数据库 + 无保留策略（OpenClaw #136311、#114612）；QwenPaw FTS 损坏 + 静默清除失败（#7596/PR #7655）；Hermes 记忆合并需手动开启（#106919）；ZeroClaw 采用仅追加历史设计（#10526）。 |
| **Provider 成本与提示缓存经济性** | OpenClaw、ZeroClaw、Hermes | OpenClaw 缓存前缀抖动击穿 OpenAI 缓存（#95610）；ZeroClaw Anthropic 支出上报始终 $0.00 导致预算上限永不生效（#9816）；1 小时缓存 TTL + 缓存写入计费（ZeroClaw #10663/#10699）。 |
| **MCP 成熟化** | IronClaw（核心）、QwenPaw、Hermes、ZeroClaw | SEP-414 调用方归属、按调用方目录（IronClaw #8084/#8090）；QwenPaw 可配置 HTTP/SSE 超时（#7649）；Hermes 桥接审批布线（#56971）；ZeroClaw WASM 插件运行时（#10076）。 |
| **Windows 平台对齐** | OpenClaw、Hermes、QwenPaw | OpenClaw 网关无法启动（#137813）；Hermes 13 个 bug 中有 5 个是 Windows 专属；QwenPaw 事件循环冻结 118–135 秒（#7363，已 2 周无修复 PR）。 |
| **进程生命周期 / 僵尸处理** | OpenClaw、Hermes | OpenClaw 工具/钩子子进程成僵尸（#97616，6 月以来未关）；MCP 子进程泄漏（#143433）；Hermes 网关僵尸 + TCP 耗尽（#106359）。 |
| **移动端与多设备覆盖** | Hermes、QwenPaw、OpenClaw | Hermes 原生移动 + 语音（#11911）；QwenPaw Expo/RN 客户端处于草案阶段（#7378，DO-NOT-MERGE）；QwenPaw 移动端 Web 人体工学投诉（#7177、#5329）；OpenClaw Telegram Mini App 被屏蔽（#142336）。 |
| **细粒度信任与安全** | Hermes、OpenClaw、ZeroClaw | Hermes 按工具 YOLO 作用域（#106267）、子 Agent 验证模式（#356）；OpenClaw 被拒写入工具静默破坏记忆（#126906）；ZeroClaw 沙箱策略统一 RFC（#6996）。 |

---

## 5. 差异化分析

| 维度 | OpenClaw | Hermes Agent | QwenPaw | ZeroClaw | IronClaw |
|---|---|---|---|---|---|
| **功能侧重** | 通道广度、网关、多 Agent 编排 | 桌面 UX、本地模型互通（Ollama/Qwen）、信任控制、语音 | 终端用户产品：Console、Desktop、应用/技能市场、Advisor 模式（双模型） | 架构正确性：沙箱化、会话/传输分离、成本账本、协议对齐（OpenAI Responses、A2A） | 托管 MCP 提供方平台、扩展生命周期 |
| **目标用户** | 自托管玩家与多通道生产运维者 | 桌面优先用户、本地模型爱好者 | 非技术终端用户；自托管面板；中国生态通道（QQ） | 开发者、安全敏感的运维者、TUI/CLI 用户 | 嵌入 Agent 基础设施的平台集成方 |
| **架构** | 单体网关事件循环 + 插件化通道 | 网关 + 辅助重试/压缩栈；跨 fork 发布流水线 | Console + Desktop 客户端，底层可替换本地运行时（llama.cpp） | Rust 守护进程，RFC 驱动，TUI（ZeroCode/ACP） | 打包的扩展/Provider 包，多租户目录 |
| **质量姿态** | 流量驱动；发布列车易回归 | 维护者主导的热修复纪律 | 小版本存在 QA 缺口，分诊关闭迅速 | 设计先行、执行力不足 | 规模小、干净、低 churn |

**总评：** OpenClaw 与 QwenPaw 争夺终端用户广度（集成为先 vs. UX 为先）；ZeroClaw 以架构正确性为竞争点；Hermes 与 IronClaw 分占开发者/平台细分领域。

---

## 6. 社区动能与成熟度

- **第一梯队 — 规模（OpenClaw）：** 原始动能最高，但处于回归收敛的*稳定期*；社区精力被迁移善后吞噬，而非用于新能力。
- **第二梯队 — 均衡迭代（QwenPaw、Hermes）：** 真正的最快前行者。QwenPaw 跑双轨（v2.2.0 清理 + 重大布局：Advisor 模式、移动端、Data 0.3、后端插件化），新人漏斗最健康。Hermes 合并率占更新 PR 的 16%，P1 当日关闭（#105145），但被 24 天阻塞的发布管线卡住上限。
- **第三梯队 — 设计驱动（ZeroClaw）：** 核心圈活跃（36 与 29 条评论的 RFC，已到 Rev 5/Rev 10），但设计吞吐跑赢合并吞吐（~1 合入/天 对比 49 个开放 PR）；多个已确认 issue 自 4–5 月以来一直未关。
- **第四梯队 — 维护态（IronClaw）：** 内部 churn 平稳，但 6 个 PR 中 4 个、两个合入全部来自单一贡献者（`kirikov`），无任何外部评论/点赞——属于巴士因子风险，并非真正的社区。

**快速迭代：** QwenPaw、Hermes。**稳定中：** OpenClaw、QwenPaw（同时进行）。**架构期：** ZeroClaw。**半休眠：** IronClaw。

---

## 7. 趋势信号

1. **审阅带宽是生态最稀缺的资源。** 每个项目都有待修 PR 卡在维护者注意力上（OpenClaw 的"待维护者审阅"队列、ZeroClaw 的 XL PR 积压、Hermes 已 2 个月的安全 PR）。*含义：* 贡献容易、落地难——分诊自动化与审阅能力是杠杆最高的投入方向。
2. **成本可观测性正在成为标配。** 预算上限失灵（ZeroClaw #9816）、缓存写入计费缺口、缓存前缀抖动（OpenClaw #95610）在各项目中独立出现。*含义：* 从第一天起就应构建缓存感知的提示布局与诚实的成本账本。
3. **记忆/上下文工程在大规模场景下仍未解决。** 五个项目中有四个本周撞上了存储膨胀、保留策略或压缩预算失败。*含义：* 保留策略与预算感知的压缩已成为差异化能力，而非基础卫生。
4. **MCP 正快速标准化——假设多调用方场景。** SEP-414 归属、按调用方目录（IronClaw）、超时可配置（QwenPaw）。*含义：* 托管/多租户 MCP 的正确性将在数季度内成为基本预期。
5. **移动端是下一战场。** 两个原生客户端在推进（Hermes #11911、QwenPaw #7378），加上持续的移动端 Web 投诉。
6. **信任正在走向细粒度。** 按工具权限作用域、沙箱策略统一、子 Agent 验证模式本周悉数浮出水面——非全即无的自治模式正被深度用户拒绝。
7. **静默失败是头号信任杀手。** 引发社区最大反弹的 bug 都属于隐藏性故障：QwenPaw 静默运行时回滚（#7633）、ZeroClaw 知识工具静默禁用（#10721）、OpenClaw 工具被拒却回报成功（#126906）。*含义：* 每条降级路径都应向运维方暴露可见错误，应作为设计硬性要求。
8. **Windows 仍是开放的差异化点** — 三个项目背负活跃的 Windows P1；率先达成对齐者将收获被忽视的细分市场。

---

*方法学说明：所有数据来源于各项目 2026-09-10 digest，覆盖此前 24 小时。"Updated" 计数包含收到评论/标签的长期条目，并非仅为新增项；解读合并率时应注意此前提。健康度评分综合了速度、高危 bug 的修复 PR 关联度、发布节奏与贡献者/社区多元化程度。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — 项目摘要 (2026-09-10)

## 1. 今日概览

Hermes Agent 展现出**高频维护活动**，过去 24 小时内共有 100 项更新（50 个 issue：46 开放 / 4 关闭；50 个 PR：42 开放 / 8 已合并/关闭）。今日未发布新版本，但更新日志形态的流量主要由 Windows 桌面端回归、网关/会话生命周期修复以及对辅助重试/压缩栈的协同重构（PR #106866、#106955）主导。围绕 Windows 打包、OAuth 和更新交接的几个长期未解决的 P1 缺陷仍然处于开放状态。维护者 @teknium1 极为活跃，亲自合并关键的可靠性修复（压缩、OAuth、lint 策略），而非通过发布分支交付。

## 2. 发布版本

**过去 24 小时无新版本发布。** 一项待处理的发布工程 issue（#88584）持续阻塞计划的 Nous→Enterkey 合并，导致仪表板更新器仍停留在上次测试通过的 Enterkey 版本。

## 3. 项目进展

**今日合并/关闭的 PR（共 8 个，可见前几项）：**

| PR | 标题 | 影响 |
|---|---|---|
| [#106866](https://github.com/NousResearch/hermes-agent/pull/106866) | fix: compression no longer times out silently on aux retries (#98466) | P1 — OpenAI 后端会话的可靠性；挽救先前的尝试 #98480 |
| [#106955](https://github.com/NousResearch/hermes-agent/pull/106955) | fix(auxiliary): origin-scoped session-key shield, task overrides, negotiation-only stream fallback | P2 — 对 #106866 的后续安全加固 |
| [#106953](https://github.com/NousResearch/hermes-agent/pull/106953) | fix(cli): stop gateway `start()` blocking on non-TTY prompts and double-spawning | P2 — 在 Windows 上解除 agent/cron 触发 `hermes gateway restart` 的阻塞 |
| [#103776](https://github.com/NousResearch/hermes-agent/pull/103776) | fix(tools): guide malformed tool_call without `name` to direct tool (Ollama/Qwen) | 本地模型后端的工具调用健壮性 |
| [#106646](https://github.com/NousResearch/hermes-agent/pull/106646) | fix(gateway): preserve `x-opencode-session` on `llm.oneshot` for OpenCode Go | 全新安装场景下的 provider 崩溃修复 |
| [#106885](https://github.com/NousResearch/hermes-agent/pull/106885) | fix(release): correctly strip scoped conventional prefixes in `clean_subject` | 发布说明生成正确性 |
| （另有 2 个已关闭 PR 未显示在前 20 名） | — | — |

**净效果：** 压缩、Windows 网关启动、OpenCode/Ollama provider 互通、发布工具链方面获得可衡量的可靠性提升。今日未交付面向用户的新功能。

## 4. 社区热门话题

| 排名 | 项目 | 评论 / 👍 | 核心诉求 |
|---|---|---|---|
| 1 | [Issue #88584](https://github.com/NousResearch/hermes-agent/issues/88584) — "Automated Nous integration is blocked" | 81 💬 / 0 👍 | 流程/协作摩擦：计划的 Enterkey↔Nous 合并在 `cron/jobs.py` 上持续失败；发布分支无任何推进。社区期望跨 fork 的自动化交付能真正跑通。 |
| 2 | [Issue #105145](https://github.com/NousResearch/hermes-agent/issues/105145) — "Windows desktop-driven `hermes update` always reports FAILED (exit 8)" | 17 💬 / 0 👍 | Windows 上的更新通道 UX 损坏：实际成功但返回错误退出码；工作目录解析错误。P1，已在本次修复浪潮中关闭。 |
| 3 | [Issue #11911](https://github.com/NousResearch/hermes-agent/issues/11911) — "Native Mobile App (iOS & Android) with Voice Calling" | 7 💬 / 2 👍 | 长期产品愿景：在手机上通过免提语音访问 Hermes 助手。投入小、对用户增长影响大。 |
| 4 | [Issue #70421](https://github.com/NousResearch/hermes-agent/issues/70421) — "Desktop: show all chats under a project (remove 3-session cap)" | 5 💬 / 7 👍 | 实际的生产力痛点：被隐藏的会话迫使用户层层点入。今日 👍/💬 比值最高 — 需求明确。 |
| 5 | [Issue #48860](https://github.com/NousResearch/hermes-agent/issues/48860) — "OAuth prompt sanitizer greedy-replaces docs URL → NXDOMAIN" | 5 💬 / 1 👍 | 反规避清洗器的连带损伤：产品名改写破坏合法文档 URL（NXDOMAIN）。P1，尚未修复。 |
| 6 | [Issue #106267](https://github.com/NousResearch/hermes-agent/issues/106267) — "per-tool-scope YOLO mode via `/yolo allow/deny`" | 5 💬 / 0 👍 | 高阶用户的安全控制：细粒度信任，而非要么全开要么全关的会话绕过。 |
| 7 | [Issue #356](https://github.com/NousResearch/hermes-agent/issues/356) — "Acceptance Criteria & Independent Judge for Sub-agent Delegation"（今日关闭） | 3 💬 / 2 👍 | 来自 OpenPlanter 的质量门控模式（`IMPLEMENT-THEN-VERIFY`）。虽已关闭，但代表了社区对子代理验证的反复诉求。 |

**共同主线：** 社区日益推动**信任边界**（per-tool YOLO、子代理验证、OAuth 清洗）和**多设备一致性**（移动端、桌面端会话列表完整性），同时伴随持续的可靠性投诉。

## 5. Bug 与稳定性

按严重程度排序，并标注修复 PR 状态：

| 严重程度 | Issue | 摘要 | 修复 PR？ |
|---|---|---|---|
| **P1** | [#105145](https://github.com/NousResearch/hermes-agent/issues/105145) | Windows `hermes update` 在成功后始终报告 FAILED（exit 8） | **今日关闭** |
| **P1** | [#105629](https://github.com/NousResearch/hermes-agent/issues/105629) | Windows 桌面端构建：electron-builder asar 完整性重写 → rcedit `Unable to commit changes` | 无 |
| **P1** | [#48860](https://github.com/NousResearch/hermes-agent/issues/48860) | OAuth 清洗器改写文档 URL → `claude-code.nousresearch.com` NXDOMAIN | 无 |
| **P2** | [#106909](https://github.com/NousResearch/hermes-agent/issues/106909) | 无 root Docker：iron-proxy 绑定 `127.0.0.1`，从 `host.docker.internal` 不可达 | 无 |
| **P2** | [#102958](https://github.com/NousResearch/hermes-agent/issues/102958) | Cron：在非默认 profile 中 `--no-agent` 任务脚本路径格式错误（缺少分隔符，2026-09-04 回归） | 无 |
| **P2** | [#79833](https://github.com/NousResearch/hermes-agent/issues/79833) | 桌面端：内嵌卡片（X/Twitter card）跨视图遮盖 UI | 无 |
| **P3** | [#94001](https://github.com/NousResearch/hermes-agent/issues/94001) | 桌面端状态栏上下文用量在压缩后过期，跨会话污染 | 无 |
| **P3** | [#106292](https://github.com/NousResearch/hermes-agent/issues/106292) | `hermes kanban complete` 绕过 `pre_tool_call` hooks → 过早标记根任务完成 | 无 |
| **P3** | [#106285](https://github.com/NousResearch/hermes-agent/issues/106285) | 跨混合 DPI 显示器时 Windows 桌面窗口变透明 | 无 |
| **P3** | [#106359](https://github.com/NousResearch/hermes-agent/issues/106359) | Windows 网关僵尸进程：TCP 端口耗尽冻结事件循环 | 无 |
| **P3** | [#99533](https://github.com/NousResearch/hermes-agent/issues/99533) | Firecrawl `web_extract` 将 4xx/5xx 折叠为成功的空结果（未检查 `metadata.statusCode`） | 无 |
| **P3** | [#89700](https://github.com/NousResearch/hermes-agent/issues/89700) | 桌面端：取消固定会话不生效 — 会移至 Pinned 列表底部 | 无 |
| **P3** | [#45983](https://github.com/NousResearch/hermes-agent/issues/45983) | 在技能繁重的 orchestrator profile 中约 19 轮后陷入循环（bg-review + Compressor 冲突） | 无 |

**稳定性概览：** 今日共有 13 个不同的 bug 被提出或处于活跃状态。**已关闭的 Windows 更新之外，其余 4 个 P1 全部无修复 PR。** Windows 桌面端仍是主要的故障面（13 个中占 5 个）。网关/会话回收的正确性正在 PR [#106966](https://github.com/NousResearch/hermes-agent/pull/106966) 和 [#106964](https://github.com/NousResearch/hermes-agent/pull/106964) 中积极推进。

## 6. 功能请求与路线图信号

| 功能 | Issue | 预计时间窗 |
|---|---|---|
| 原生 iOS/Android 移动应用 + 语音通话 | [#11911](https://github.com/NousResearch/hermes-agent/issues/11911) | **长期**（1–2 个季度）。基础设施投入大；尚未进入近期视野。 |
| 桌面端：移除 3 会话预览上限 | [#70421](https://github.com/NousResearch/hermes-agent/issues/70421) | **下一小版本**（0.21.x / 0.22）。低风险 UX 改动，👍 信号强（7）。 |
| Per-tool-scope `/yolo allow/deny` | [#106267](https://github.com/NousResearch/hermes-agent/issues/106267) | **近期**。现有 YOLO 管线的自然延伸。 |
| 针对实时选项的斜杠命令自然语言解析（`"switch to grok oauth"` → `/model xai-oauth`） | [#106258](https://github.com/NousResearch/hermes-agent/issues/106258) | **近期**。与更宏观的模型切换 UX 工作方向一致。 |
| Cron：周期性任务的 `start_at` | [#106908](https://github.com/NousResearch/hermes-agent/issues/106908) | **近期**。消除文档中已记录的不安全变通方案。 |
| `feat(voice): Codex OAuth STT/TTS/live voice` | [PR #106640](https://github.com/NousResearch/hermes-agent/pull/106640) | **下一小版本**，若合并。 |
| 后台记忆整合 opt-in + `/memory` 策略展示 | [#106919](https://github.com/NousResearch/hermes-agent/issues/106919), [#106918](https://github.com/NousResearch/hermes-agent/issues/106918) | **近期**。直接构建于 #106310 之上。 |
| 动态工作区绑定至终端 env-provider 插件 | [#104163](https://github.com/NousResearch/hermes-agent/issues/104163) | **中期**，依赖树外插件生态的成熟度。 |
| Computer-use provider 工厂接缝 + 远程桌面传输 | [PR #103653](https://github.com/NousResearch/hermes-agent/pull/103653) | **中期**，基础性工作 — 尚未形成面向用户的功能。 |
| 桌面端 Fast 切换重新定位为优先通道 | [#106253](https://github.com/NousResearch/hermes-agent/issues/106253) | **下一小版本**。纯 UI/文案调整。 |
| `feat(delegate)`：per-parent-session 子代理上限 | [PR #59233](https://github.com/NousResearch/hermes-agent/pull/59233) | **即将合并** — 关闭来自 #52484 的失控生成路径。 |

## 7. 用户反馈摘要

**满意信号：**
- 对 Windows 更新 P1 的快速响应表示高度认可（Issue #105145 当日关闭）。
- 对桌面端会话列表扩展的高 👍（#70421：7 个赞，5 条评论）反映出该小而明显的 UX 缺口存在已久。
- 接受 OpenPlanter 风格的子代理验证模式（#356 已关闭，2 个赞） — 社区对质量门控模式持开放态度。

**痛点（反复出现的主题）：**
1. **Windows 是最弱的平台。** 24 小时内出现 5 个独立的 Windows 专项 bug（更新交接、electron-builder、DPI 透明、网关僵尸进程、Kanban worker）。用户感到桌面端质量落后于 macOS/Linux。
2. **信任边界不一致。** OAuth 清洗器过度触发（#48860），YOLO 要么全开要么全关（#106267），Kanban CLI 绕过 hooks（#106292）。用户希望获得明确、有作用域的信任控制。
3. **会话/上下文状态错位。** 压缩后状态栏过期（#94001），跨会话污染，刷新迟缓 — 用户无法信任 UI 所显示的内容。
4. **斜杠命令的 CLI 摩擦**（#106258）：用户希望支持自然语言解析，而非要求精确输入指令。
5. **反规避改写造成的文档/URL 损坏**（#48860）：安全工具正在破坏合法文档链接。

**不满集中点：** 集中在 (a) Windows 桌面端质量，以及 (b) 智能体如何判定"可信"的不透明性。对已关闭的 #356 功能无社区反弹 — 关闭结果可接受。

## 8. 待办观察

因时效、严重程度或停滞进度需要**维护者关注**的项目：

| 项目 | 存在时长 | 状态 | 需要关注的原因 |
|---|---|---|---|
| [Issue #88584](https://github.com/NousResearch/hermes-agent/issues/88584) | 24 天 | **开放**，81 条评论 | 计划的 Nous→Enterkey 自动合并因 `cron/jobs.py` 冲突阻塞；阻塞定时发布交付。当前最大的活跃讨论 — 社区期待解决。 |
| [PR #59233](https://github.com/NousResearch/hermes-agent/pull/59233) — `fix(delegate): cap total subagent children per parent session` | 2 个月 | **开放**，P2，影响半径中等 | 关闭已记录的失控生成路径（#52484）；低风险防护措施，审阅周期过长。 |
| [PR #56971](https://github.com/NousResearch/hermes-agent/pull/56971) — `fix(mcp): wire bridge approval tools to the gateway` | 2 个月 | **开放**，P2，需决策 | 安全边界修复；目前 MCP bridge 无法看到网关审批。 |
| [Issue #45983](https://github.com/NousResearch/hermes-agent/issues/45983) — 技能繁重 profile 中的聊天循环 | 约 3 个月 | **开放**，P3 | 在 247 技能 profile 上 bg-review + Compressor 冲突；仅在大型 homelab profile 上可完整复现。 |
| [Issue #42289](https://github.com/NousResearch/hermes-agent/issues/42289) — Windows Kanban worker 误报 'pid not alive' | 约 3 个月

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-10

## 1. 今日概览

IronClaw 在过去 24 小时内活动温和,主要集中在基础设施层面,**共更新了 6 个 PR**(2 个已合并,4 个仍处于开放状态)以及 **1 个 issue**(唯一的开放 bug)。所有活动集中在单一内部方向——**托管 MCP 提供商与扩展生命周期相关工作**——其中 6 个 PR 中的 4 个(以及两个已合并项)均由同一贡献者(`kirikov`)提交。期间没有发布新版本,所有更新的 issue/PR 均无任何反应或评论,表明尽管内部迭代持续,但外部社区对这些具体事项的参与度较低。总体而言,该项目维护节奏健康,但主题聚焦较为狭窄,且缺乏外部贡献者信号。

## 2. 版本发布

*过去 24 小时内无新版本发布。无可报告内容。*

## 3. 项目进展

两个 PR 已关闭/合并:

- **#8088 — feat(common): 区分已设置但为空的环境变量与未设置的环境变量** ([link](https://github.com/nearai/ironclaw/pull/8088))
  - 修复了 `env_or_override` 将 `FOO=` 与缺失的 `FOO` 折叠为同一情形的问题。运维人员在设置具有部署语义的变量(例如端点覆盖)时,将不再因拼写错误而默默回退到默认值。作者:`kirikov`。

- **#8089 — feat(extensions): 打包 agent-market 托管 MCP 提供商** ([link](https://github.com/nearai/ironclaw/pull/8089))
  - 为 `agent.market` 托管 MCP 提供商新增了一等打包包,形态与其他打包提供商一致,包含清单、各工具的输入 schema,以及作为预发现回退的静态工具声明。作者:`kirikov`。备注:摘要说明此 PR"重新打开"了此前的讨论线程,表明这是对之前工作的重新提交。

净效果:在环境变量处理方面带来小而实在的可靠性提升,并对打包的 MCP 目录进行了渐进式扩展。

## 4. 社区热点话题

按 GitHub 原生参与度指标(评论、反应)来看,**今日更新中的所有条目均没有任何评论或 👍 反应**。每个条目都显示 0 评论和 0 点赞,因此"热点"必须从主题聚类而非用户信号来推断:

- **托管 MCP 提供商基础设施** 是主导主题:
  - #8084 [open] — SEP-414 调用方归属 ([link](https://github.com/nearai/ironclaw/pull/8084))
  - #8090 [open] — 目录按调用方而非按扩展进行键控 ([link](https://github.com/nearai/ironclaw/pull/8090))
  - #8089 [merged] — 打包 agent.market 提供商 ([link](https://github.com/nearai/ironclaw/pull/8089))
- **扩展生命周期 / 打包一致性**: #8085 [open] ([link](https://github.com/nearai/ironclaw/pull/8085))
- **渠道 UX(Telegram)**: #8072 [open] ([link](https://github.com/nearai/ironclaw/pull/8072))

**底层需求:** 打包的 MCP 模型正在被加固,以抵御多租户与多调用方带来的混淆(目录争用、重试归属、运维安装包的等价性)。Telegram PR 是今日唯一面向用户侧的变更。

## 5. Bug 与稳定性

| # | 标题 | 状态 | 严重程度 | 修复 PR? |
|---|------|------|----------|----------|
| [#8091](https://github.com/nearai/ironclaw/issues/8091) | bug(webchat-v2): 在确认 IME 组合输入时按 Enter 会发送消息 | OPEN, 0 评论 | 低–中(UX,为此前行为的复现) | 未关联 |

**#8091 备注:** WebChat v2 即使在按键本意是确认 IME 候选词时,也会触发发送动作,从而发送出一条不完整的消息。报告者明确指出这是此前已修复的用户可见行为的复现。过去 24 小时内尚未开启修复 PR。严重程度有限(不太可能导致数据损坏;属轻微困扰与误发),但这是今日浮现的唯一开放 bug,值得维护者响应。

在该时间窗口内未提交崩溃、回归或数据丢失的报告。

## 6. 功能请求与路线图信号

今日未开启明确的"功能请求"issue。从开放 PR 中可以观察到以下前瞻性信号:

- **#8084 — 在出站托管 MCP 调用上实现 SEP-414 调用方归属** ([link](https://github.com/nearai/ironclaw/pull/8084)):使 IronClaw 与新兴的 MCP 规范扩展对齐,以便托管服务器能够将调用关联到对话并检测重试。如果两者评审通过,很可能与 #8090 一同发布。
- **#8090 — 按调用方键控的托管 MCP 目录** ([link](https://github.com/nearai/ironclaw/pull/8090)):消除多用户目录争用 bug。是下一版本的有力候选。
- **#8072 — Telegram Bot API 命令菜单注册** ([link](https://github.com/nearai/ironclaw/pull/8072)):在激活时注册 `/model`、`/status`、`/new`、`/stop`、`/interrupt`;在停用时清除。是面向用户的 Telegram UX 改进。

**预测:** 当下一个带标签版本发布时,合理推测将包含 #8084、#8090 和 #8088,作为一个托管 MCP / 通用工具批次,#8072 要么一并纳入,要么留待后续渠道 UX 版本单独发布。#8085(扩展打包一致性)依赖于构造器与校验器之间的跨模块共识,可能需要额外评审。

## 7. 用户反馈摘要

过去 24 小时内的外部用户反馈量**几乎为零**:所有更新条目均无评论、无反应。唯一由用户发起的实质性内容是来自 `supermomonga` 的 **#8091** bug 报告,该报告揭示了 WebChat v2 的一个具体 UX 痛点(IME 与 Enter 冲突),并指出其为**对先前修复的复现**。这是对 WebChat v2 输入处理鲁棒性的一个微弱不满信号。

从进行中的工作推断出的隐含需求:
- 托管 MCP 部署中的多租户正确性(面向多用户托管服务的运维人员)。
- 在部署环境变量中更清晰地区分"已配置"与"默认值"。
- 在聊天平台(Telegram)上提供可发现的命令菜单,而非依赖记忆斜杠命令。

## 8. 待办事项观察

由于缺乏互动、存在歧义或依赖评审者,以下条目可能需要维护者关注:

- **#8091(issue)** — 开放 bug,自创建以来 0 评论;报告者明确指出其为回归。**需要维护者分诊并提交确认/拒绝的 PR**,尤其考虑到其引用了先前的修复。
- **#8072(PR)** — 标签为 `[size: L, risk: low, scope: docs, scope: dependencies, contributor: experienced]`;最后更新于 2026-09-09,仍处开放状态。工作量大但风险低的文档/依赖类工作,不太可能引发争议;经一次维护者审阅即可合并。
- **#8085(PR)** — 旨在解决两个扩展清单函数之间的不一致;评审者应先确认哪一侧为规范实现,然后再合并。
- **#8084(PR)** — 引用新兴 MCP 规范(SEP-414);鉴于规范状态尚不确定,合并前宜由维护者确认对齐情况。
- **#8090(PR)** — 动机明确的正确性修复;风险低,与 #8084 天然适合合并到同一轮评审中。
- **贡献者集中度风险:** 今日 6 个 PR 中的 4 个以及两个合并项均来自 `kirikov`。该时间窗口内未捕捉到任何外部贡献者信号(评论、反应、评审)。维护者或宜关注托管 MCP 与扩展层的"巴士因子"暴露风险。

---

*数据窗口:截至 2026-09-10 的过去 24 小时。基于 `nearai/ironclaw` 的公开 GitHub 活动生成。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-10

## 1. 今日概览

QwenPaw 呈现 **中高度活跃** 状态：过去 24 小时内有 22 个 issue（11 个开放 / 11 个已关闭）和 34 个 PR（26 个开放 / 8 个已合并或已关闭）更新，尽管没有新版本发布。该模式强烈反映了 **v2.2.0 的发布后稳定期**：大部分已关闭项针对近期版本升级引入的回归和 UX 问题（模态背景蒙层、FTS 损坏、控制台流式输出、MCP 超时）。同时，多个雄心勃勃的功能 PR（Advisor Mode、QwenPaw Mobile、QwenPaw-Data 0.3、ADBPG/PowerContext 插件化）在评审管线中持续成熟，表明路线图推进势头不减。整体项目健康度良好：bug 报告被快速响应和分流，至少有三个开放 bug 已与修复 PR 配对。

## 2. 版本发布

**过去 24 小时内无新版本发布。** 在 issue 和 PR 中引用的最新版本仍为 **v2.2.0**（包括预发布 `2.2.0b7`），旧版 **v2.1.1b1** 仍被 Windows 桌面端用户引用。

## 3. 项目进展

过去 24 小时内有八个 PR 已合并或已关闭，推进了若干主题：

| PR | 标题 | 影响 |
|---|---|---|
| [#7577](https://github.com/agentscope-ai/QwenPaw/pull/7577)（已关闭） | fix(console): enqueue follow-up messages when chat task is running | 解决长期存在的 UX 摩擦点：在聊天进行中发送的后续文本/文件消息现在会排队而不是返回 HTTP 409。 |
| [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649)（已关闭） | feat(mcp): support configurable timeout for HTTP/SSE clients | 在 `MCPClientConfig` 中新增可选的 `http_timeout`，并通过 DriverCard 和 handlers 传递；关闭了长期未决的 issue [#3997](https://github.com/agentscope-ai/QwenPaw/issues/3997)。 |
| [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609)（已关闭） | feat(skills): expose versions and validate declared dependencies | 实现技能版本管理和依赖校验（响应 [#7557](https://github.com/agentscope-ai/QwenPaw/issues/7557) 的诉求）。 |
| 其他已关闭 | 较小的修复 | 可能是例行清理和依赖更新。 |

**评审中进展显著的开放 PR：**
- [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) — FTS 损坏 + 保留期清理（修复 [#7596](https://github.com/agentscope-ai/QwenPaw/issues/7596)）
- [#7639](https://github.com/agentscope-ai/QwenPaw/pull/7639) — 避免重复执行历史完整性扫描的性能修复
- [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) — 保留 provider 解析的上下文窗口以防止过早压缩
- [#7641](https://github.com/agentscope-ai/QwenPaw/pull/7641) — 重试并校验桌面端产物下载（发布硬化）
- [#7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) — 在跨渠道的外发媒体中支持 Base64 data URL
- [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) — 重构：将 ADBPG 和 PowerContext 内存后端迁移为插件
- [#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569) — Advisor Mode（双模型循环模式）
- [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) — QwenPaw 原生移动端体验（Expo/React Native）
- [#7637](https://github.com/agentscope-ai/QwenPaw/pull/7637) — QwenPaw-Data 0.3 集成
- [#7653](https://github.com/agentscope-ai/QwenPaw/pull/7653) — 新增 +2,475 个后端 pytest 用例（覆盖率 +5.02pp）

## 4. 社区热门话题

按评论数排序（过去 24h）：

| 排名 | 条目 | 评论数 | 为何重要 |
|---|---|---|---|
| 1 | [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — Deploy 页面 UX（rerbin） | 8 | 关于部署页移动端/Web 端 UI 人体工学的反复痛点（按钮位置、误触停止运行）。 |
| 2 | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — 工具返回的二进制为裸 base64（已关闭） | 7 | 跨切面的 schema 契约问题：携带 base64 图片/PDF 的工具结果被拒绝并返回 HTTP 400；影响所有多模态智能体流水线。 |
| 3 | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — 同步调用冻结事件循环（Windows） | 6 | Desktop 2.1.1b1 中的高严重度回归：启动停顿 118–135s，消息延迟约 126s。 |
| 4 | [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228) — 已安装应用仍显示"安装"按钮（已关闭） | 6 | 一个破坏应用内市场信任感的视觉 bug。 |
| 5 | [#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329) — 紧凑模式下的侧边栏智能体切换器（已关闭） | 5 | 移动端浏览器用户希望在紧凑模式下控制侧边栏。 |
| 6 | [#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460) — Edge+Wayland 下 CPU 高占用（已关闭） | 5 | 渲染相关：在 Wayland 下的 Edge 中，大结果集或 WebSocket 推送似乎会引发 CPU 飙升。 |
| 7 | [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — Chrome 中控制台流式输出失效 | 4 | 浏览器特定的流式输出回归，在同一会话的 Safari 中"自然正常"。 |

**讨论反映出的潜在需求：**（a）**移动优先的人体工学**——头部投诉中有不少来自移动端用户；（b）**多模态/工具结果 schema 的稳定性**；（c）**Windows 上的运行时响应能力**；（d）**新版 Console UI 的跨浏览器一致性**。

## 5. Bug 与稳定性

按可能的用户影响排序：

| 严重度 | Issue | 摘要 | 修复 PR |
|---|---|---|---|
| **高** | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) | 同步调用在启动时冻结 QwenPaw Desktop 2.1.1b1 事件循环 118–135s，发送时约 126s；超时永不触发。 | 暂无关联 |
| **高** | [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) | llama.cpp 的 5 位构建号无法被版本解析正确处理；QwenPaw 在约 40 分钟内静默将用户升级后的运行时回滚到 4 位快照版本，且无任何告警。 | 暂无关联 |
| **高** | [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) | 控制台流式输出 **仅在 Chrome 中** 直到回合结束才渲染（Safari 正常）。影响 v2.2.0 上所有 Chrome 用户。 | 暂无关联 |
| **高** | [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) | 在 v2.2.0b7 上，上下文压缩可能超出 provider 的完整请求预算，导致回合中途失败。 | 暂无关联（[#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) 中有相关方向的上下文窗口保留工作） |
| **中** | [#7596](https://github.com/agentscope-ai/QwenPaw/issues/7596) — *已关闭* | `history.db` FTS 损坏未被完整性检查发现；保留期清理静默失败。 | [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) 开放中 |
| **中** | [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) — *已关闭* | v2.2.0 模态背景蒙层"透明"；背景内容透出（官方样式问题，非插件导致）。 | 暂无关联 |
| **中** | [#7618](https://github.com/agentscope-ai/QwenPaw/issues/7618) — *已关闭* | QQ Channel：bot 在私聊中可用，但在群聊中无响应。 | 暂无关联 |
| **低–中** | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — *已关闭* | 工具返回的图片/PDF 为裸 base64（`type:"data"`）触发 HTTP 400。 | 暂无关联 |
| **低** | [#5688](https://github.com/agentscope-ai/QwenPaw/issues/5688) — *已关闭* | CSS 前缀不匹配 `ant-` 与 `qwenpaw-`（关于样式正确性的疑问）。 | 暂无关联 |
| **低** | [#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460) — *已关闭* | Edge+Wayland 单标签页 CPU 飙升。 | 暂无关联 |
| **低** | [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228) — *已关闭* | 应用市场中已安装应用的"安装"按钮 hover 状态错误。 | 暂无关联 |
| **低** | [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601) — *已关闭* | v2.2.0 在目录选择器中丢失手动路径编辑字段（自 2.1.0 起的回归）。 | 暂无关联 |

**观察：** 三个高严重度 bug（llama.cpp 回滚、Chrome 流式输出、上下文预算）目前都 **没有关联的修复 PR**，这是下一个补丁版本的主要风险所在。相反，FTS 损坏和历史清理路径有一份高质量修复正在进行中。

## 6. 功能请求与路线图信号

过去 24 小时用户提交的功能请求（以及邻近的近期请求）：

| 请求 | 来源 | 在下一个小版本中的可能性 |
|---|---|---|
| **ntfy channel 支持**（推送通知、自托管） | [#7657](https://github.com/agentscope-ai/QwenPaw/issues/7657) — 作者提供可用的实现 | **高** — 作者表示 PR 已就绪；契合自托管用户群体 |
| **Console 标签页的自定义页面标题**（多项目用户） | [#7648](https://github.com/agentscope-ai/QwenPaw/issues/7648) | **高** — 实现简单，直击标签页管理痛点 |
| **在 UI 中编辑默认 agent 参数** | [#7644](https://github.com/agentscope-ai/QwenPaw/issues/7644) | **中–高** — 常见的管理员痛点 |
| **红绿灯状态指示器**（长时任务的感知） | [#7600](https://github.com/agentscope-ai/QwenPaw/issues/7600) | **中** — 可作为小型 UX 改进交付 |
| **持久化的跨会话记忆**（MemCode 集成） | [#7656](https://github.com/agentscope-ai/QwenPaw/issues/7656) | **低–中** — 外部集成提案 |
| **Channel 请求元数据 → MCP 工具**（如 QQ ID、手机号） | [#7650](https://github.com/agentscope-ai/QwenPaw/issues/7650) | **中** — 合理的开发者体验诉求 |
| **QwenPaw Mobile 原生客户端**（Expo/RN） | [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) | **中** — PR 是 `DO NOT MERGE` 草稿，但指明了产品方向 |
| **Skills 版本管理 / 元数据** | [#7557](https://github.com/agentscope-ai/QwenPaw/issues/7557) / [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) | **已落地**（PR 已关闭） |
| **可配置的 MCP HTTP/SSE 超时** | [#3997](https://github.com/agentscope-ai/QwenPaw/issues/3997) / [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649) | **已落地**（PR 已关闭） |
| **已压缩聊天的向上滚动分页** | [#7542](https://github.com/agentscope-ai/QwenPaw/pull/7542)（首次贡献者） | **中** — 解决"对话中途静默"的 UX bug |
| **Deploy 页面 UX**（移动端按钮位置、open 与 stop 排序） | [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) | **中** — 反复出现的需求表明维护者已在关注 |
| **QQ Channel 群聊支持** | [#7618](https://github.com/agentscope-ai/QwenPaw/issues/7618) — *已关闭* | 修复后状态不明；存在被重新打开的风险 |

**路线图信号：** 信号汇聚最多的三个方向是（a）**移动端 / 移动浏览器 UX**，（b）**MCP 生态成熟**（超时、structuredContent、channel 元数据），以及（c）**长时任务的可观测性**（红绿灯、上下文预算）。

## 7. 用户反馈摘要

**今日报告的痛点：**

- **移动端的使用体验始终逊于桌面端。** 多个 issue（[#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)、[#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329)、[#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)）抱怨在手机尺寸的屏幕上关键控件无法触达、目录选择器不再支持手动输入，以及模态操作可能被误触发。明显有大量用户将移动浏览器作为主要界面，却感觉被当作二等公民。
- **v2.2.0 回归是呼声最高的主题。** 模态背景透明（[#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622)）、Chrome 流式输出失效（[#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642)）、目录选择器字段丢失（[#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)）——每一项都被快速关闭，但累积起来反映出预发布 QA 环节的缺失。
- **资深用户对透明度的担忧。** [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633)（运行时静默回滚）和 [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)（事件循环冻结且无超时反馈）都描述了应用对用户隐瞒失败的情境——这是一个反复出现的信任问题。
- **多项目工作流支持不足。** [#7648](https://github.com/agentscope-ai/QwenPaw/issues/7648)（自定义标题）和 [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)（部署页）来自同时运行 7–8 个及以上 QwenPaw 面板的用户；他们需要 UI 当前并未提供的身份标识。

**积极信号：**

- MCP 超时和 Skills 版本管理的功能请求在 24 小时内被关闭，表明维护者对边界清晰的提案响应迅速。
- 一位首次贡献者（[PR #7577](https://github.com/agentscope-ai/QwenPaw/pull/7577)）正在交付有意义的 Console UX 修复——社区入门引导看起来很健康。

## 8. 待办观察

长期未响应、高影响或等待维护者关注的条目：

| 条目 | 时长 | 关切点 |
|---|---|---|
| [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — 桌面端事件循环冻结 | 约 2 周 | 高严重度 Windows 回归，暂无修复 PR。 |
| [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) — llama.cpp 静默回滚 | 约 2 天 | 属于数据丢失级别的 UX bug；需要一个明确的"不要自动更新此二进制"的开关。 |
| [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) — 上下文压缩超出预算 | 约 2 天 | 可能让进行中的回合在对话中途失败；与 [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) 紧密相关。 |
| [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — 仅 Chrome 的流式输出回归 | 约 1 天 | 最新版本上所有 Chrome 用户受影响。 |
| [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — Deploy 页面 UX | 约 3 周 | 8 条评论，尽管已有明显共识仍未落地实现。 |
| [#7378](https

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-10

## 1. 今日概览

ZeroClaw 呈现出**高设计强度但无交付产出**的状态：仍有 33 个 issue 和 49 个 PR 处于 open 状态，过去 24 小时内仅合并 1 个 PR、关闭 3 个 issue，且没有新的 release tag。当前活跃工作流以长篇 RFC 和架构追踪 issue 为主（尤其是 NiuBlibing 的会话表面、会话历史和 WASM 插件提案），同时还集中了一批围绕 Anthropic provider 成本核算、ZeroCode ACP 转录文本以及反复出现的 CI 安全告警的 P1/P2 Bug。整体活动健康且活跃，但开合比表明项目处于**提案密集、吞吐受限**的阶段，而非发布周期。

## 2. 发布

*过去 24 小时内无新发布。* 最近的可交付工作通过合并的 issue（ZeroCode 多会话跟踪批次）实现，而非通过打 tag 的版本。

## 3. 项目进展

三个与多会话侧边栏计划（`#9727`）相关的 ZeroCode issue 于今日关闭，标志着 TUI/agent 侧边栏工作取得了具体进展：

- [#9729](https://github.com/zeroclaw-labs/zeroclaw/issues/9729) — 在每个聊天面板中跟踪多个并发实时会话（P2，已接受，规模：XL）
- [#9730](https://github.com/zeroclaw-labs/zeroclaw/issues/9730) — Agent 侧边栏，含状态点、添加选择器、点击切换（P2，已接受）
- [#9731](https://github.com/zeroclaw-labs/zeroclaw/issues/9731) — 将 Quickstart 从模式栏移至侧边栏（P2，已接受）

在该时间窗口内仅有 1 个 PR 被合并/关闭，今日没有 PR 以 merged 状态落地，说明长期挂起的安全、ACP 和 provider 侧的变更集存在 review 阻力。

## 4. 社区热门话题

讨论主要由处于修订周期的架构 RFC 主导：

- [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) — **RFC：运行时持有的会话会话和传输表面适配器（Rev 5）** — 36 条评论。参与度最高的讨论串。底层需求：在运行时持有的会话状态和传输适配器之间实现清晰分离，使渠道（Telegram、WhatsApp、ACP、Web）可以在不泄露会话语义的情况下接入。
- [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) — **RFC：会话表面的统一文件与附件架构（Rev 10）** — 29 条评论。反复的修订周期表明维护者仍在协调各渠道间的附件语义。
- [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) — **RFC：细粒度沙箱策略 — 文件系统限制** — 28 条评论，进行中。社区希望在应用层 `SecurityPolicy` 与 OS 级沙箱（Bubblewrap、Landlock、Seatbelt）之间建立单一事实来源。
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — **RFC 和设计 issue 的维护者决策队列** — 15 条评论。这本身就是一个协调追踪 issue；属于关于流程的元讨论。
- [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) — **RFC：可组合的 WASM 插件运行时架构** — 12 条评论。表明团队正在投入一个类型化、可替换的 provider/插件表面。

模式：**长期 RFC 评审的维护者带宽是瓶颈**，而非创意数量。

## 5. Bug 与稳定性

**P1（最高严重程度，今日仍 open）：**

- [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) — Anthropic provider 报告 `$0.00` 支出，导致每日/每月预算上限永远无法触发。**已接受，进行中。** 静默的预算上限失效对于成本受控部署而言是真实的安全隐患。*今日 open 列表中无关联修复 PR。*
- [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) — ZeroCode ACP 转录文本丢失工具调用前发出的助手文本；仅渲染最后一次工具调用之后的文本。P1，高风险。**尚无修复 PR。**

**P2（值得关注）：**

- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram 媒体组被分批处理为 N 个独立回合，而非一个多模态回合（进行中）。
- [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) — `[media attachment]` 占位符在非视觉模型上泄漏给用户（已接受）。
- [#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690) — 集成中的「Configure」链接对显示名称做了 slugify（Z.AI → `z-ai`），而非使用 family key（已接受）。
- [#10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720) — ZeroCode v0.8.5 会重复渲染 agent 回复（进行中）。
- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — `knowledge.db_path` 的波浪号展开是全局替换而非家目录前缀，导致 knowledge 工具被静默丢弃。
- [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) — `zeroclaw service logs` 在 macOS/Windows/OpenRC 上不输出任何内容；守护进程日志选择存在平台回归。
- [#10728](https://github.com/zeroclaw-labs/zeroclaw/issues/10728) — **CI：npm audit 失败（js-yaml 高危）**。修复已立即落地：[#10729](https://github.com/zeroclaw-labs/zeroclaw/pull/10729) 将 `js-yaml` 升级至 4.3.2。

**修复相关 Bug 的 PR（open，等待合并）：**

- [#10732](https://github.com/zeroclaw-labs/zeroclaw/pull/10732) — 修复 #10731（按内容而非存在性选择守护进程日志）。
- [#10733](https://github.com/zeroclaw-labs/zeroclaw/pull/10733) — Telegram/WhatsApp 上的语音回复以表现性音频标签开头。
- [#10442](https://github.com/zeroclaw-labs/zeroclaw/pull/10442) — 保持 OpenRouter 流存活（自定义客户端，无 reqwest 超时）。
- [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — 为 git 操作遵守允许的根目录。
- [#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391) — 有界委托文件系统工具遵守目标工作区。

## 6. 功能请求与路线图信号

对 **provider 成本/可观测性成熟度** 和 **OpenAI Responses 功能对等** 有强烈需求：

- [#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) — 为 Anthropic 缓存标记配置 1 小时 prompt-cache TTL。与 [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)（低于 Anthropic 最小值的 OAuth 系统前缀缓存标记）和 [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)（成本账本缺少缓存写入定价）相互呼应。**预测：** Anthropic 缓存工作将在下一个版本中以打包形式落地 —— 三个相关 issue，其中两个触及同一模块。
- [#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706)、[#10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708)、[#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704) — 来自 IftekharUddin 的一组协调性需求：OpenAI Responses 的不透明推理重放、WebSocket 上的主动响应引导、异步函数工具以及有界编程式工具调用。**预测：** 这些将一并评审；要么以单个 PR 形式呈现，要么以序列化方式分批发布。
- [#8763](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) — ZeroCode 中的子 agent 活动与可展开的工具结果。已接受，作为刚刚关闭的多会话工作的补充。
- [#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277) — 通过 digest 固定已发布的 `zerorelay` 镜像基础标签。供应链卫生；改动小但出于安全动机。

长期信号（很可能在 **0.9 之后**）：WASM 插件运行时（#10076）、仅追加的会话事件历史（#10526），以及统一的会话/附件架构（#9488、#9487）。

## 7. 用户反馈摘要

**issue 作者和报告者表达的痛点：**

- *Anthropic 成本可见性损坏*（[#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)）—— 运维人员没有可用的预算上限，削弱了 `zeroclaw status` 作为可信信息源的地位。
- *ZeroCode ACP 转录文本丢失工具调用前文本*（[#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)）和*重复渲染*（[#10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720)）—— v0.8.5 在旗舰 TUI 中带可见回归发布；发布后 48 小时内被报告，说明用户测试活跃。
- *Telegram 语音/elevenlabs 冲突*和*媒体批处理* —— 高频用户渠道流程（音频标签、多图）未得到妥善处理。
- *跨平台守护进程日志查看*（[#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)）—— macOS/Windows 用户目前实际上无法访问守护进程日志。
- *波浪号展开 Bug 导致 knowledge 工具被静默禁用*（[#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721)）—— 用户 joalvaradon 标记的高影响「静默失败」模式。

在 24 小时窗口内，除技术报告外未出现明确的满意/不满讨论串；社区信号是**对已接受工作执行速度的挫败感**（多个「已接受、进行中」的 issue 已挂起数月，例如 5 月的 #6996、4 月的 #5514）。

## 8. 待办观察

那些开放时间最长但仍然重要且缺乏合并修复的条目：

- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram 媒体批处理 Bug，开启于 **2026-04-08**（约 5 个月）。状态：进行中，24 小时窗口内无合并 PR。
- [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) — 细粒度沙箱策略 RFC，开启于 **2026-05-28**。高风险安全架构；进行中但无落地 PR。
- [#8546](https://github.com/zeroclaw-labs/zeroclaw/pull/8546) — 本地化 CLI 状态片段。由维护者 Audacity88 刷新，但需要维护者评审。
- [#8966](https://github.com/zeroclaw-labs/zeroclaw/pull/8966) — 使用事件上的实时 provider 身份；开启于 2026-07-11，规模 XL，需要作者响应。
- [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) — A2A 出站客户端，开启于 2026-07-24，需要作者响应，XL。
- [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — 上下文压缩与模型窗口比，开启于 2026-07-29，需要作者响应。
- [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713) — 历史裁剪事件上的 token 核算，**已阻塞 / 禁止合并**。
- [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) — ACP 中断回合持久化，需要维护者评审，高风险。
- [#10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214) — 日志条目计数轮转，需要作者响应，高风险。
- [#10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381) — 在工作区 cwd 之前解析宿主机启动器（安全），需要维护者评审，XL。
- [#10358](https://github.com/zeroclaw-labs/zeroclaw/pull/10358) — Mattermost 审批提示，已阻塞 / 禁止合并。
- [#10430](https://github.com/zeroclaw-labs/zeroclaw/pull/10430) — Gemini 语音转语音代理（PR1），需要作者响应，XL。
- [#10405](https://github.com/zeroclaw-labs/zeroclaw/issues/10405) — #9998（会话作用域 prompt 附件）的实现批次追踪器。已接受但执行归口尚未产出合并。

**模式：** 队列中充斥着**大量需要作者或维护者评审的大型（XL）安全与架构 PR** —— 不是被放弃的工作，而是阻塞在人力带宽上。这是项目的主要健康风险：设计吞吐量超过评审吞吐量。

---

*摘要生成于 2026-09-10，基于过去 24 小时的 GitHub 数据。所有计数和链接均引用观察窗口内处于活跃状态的条目。*

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*