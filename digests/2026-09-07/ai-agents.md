# OpenClaw 生态日报 2026-09-07

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-07 13:28 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-07

## 1. 今日概览

OpenClaw 呈现出 **高吞吐量筛选活动并保持健康的关闭率**：过去 24 小时内有 500 个 issue 和 500 个 PR 被处理，其中 223 个 issue 被关闭、250 个 PR 被合并/关闭（issue 关闭率约 45%，PR 关闭率 50%）。维护者参与度异常强劲——`steipete` 主导了今日约三分之二的 PR，表明围绕 `openclaw update` 流水线、网关插件和 TUI 性能正在进行一次集中的稳定性推进。Issue 的构成以 2026.8.1 / 2026.8.2 / 2026.9.2 版本的 **P1 回归问题** 为主，说明近期发布版本尽管今天没有新的版本发布，依然处于"灼热"状态。虽然没有发布新版本，但多个 PR（#140981、#141109、#141146、#141175）明确旨在加强发布验证和更新流程的正确性，预示着补丁版本即将发布。

## 2. 发布

过去 24 小时内无新版本发布。然而，PR #140981（"fix(release): restore verification inputs and supported upgrade proof"）和 PR #141146（"fix: catch published upgrade regressions before merging"）是下一次发布的直接前置条件，而 #141109 专门针对 2026.9.2 用户的状态结构（state-schema）升级收尾。补丁版本很可能即将到来。

## 3. 项目进展

**已合并/关闭的 PR 活动（按影响力筛选）：**

- [#141109](https://github.com/openclaw/openclaw/pull/141109) — `fix(update): let 2026.9.2 finish state-schema upgrades`。防止更新器用旧代码重新打开已迁移的数据库；闭环了 [#140784](https://github.com/openclaw/openclaw/issues/140784)。**P1 维护者**。
- [#140981](https://github.com/openclaw/openclaw/pull/140981) — `fix(release): restore verification inputs and supported upgrade proof`。恢复 CI 任务标识、浏览器设置、CPU 计量以及升级测试夹具；同时包含 Telegram 确定性夹具工作。**P2 维护者**。
- [#141146](https://github.com/openclaw/openclaw/pull/141146) — `fix: catch published upgrade regressions before merging`。捕获 AWS Crabbox 矩阵在 12 个已发布 npm 版本中发现的缺陷类型（其中 5 个已由 #140778/#140784/#140886/#140825 修复）。**P2 维护者**。
- [#141175](https://github.com/openclaw/openclaw/pull/141175) — `fix(update): installed plugins fail candidate validation`。修复在大小写不敏感卷上的暂存主机插件加载失败问题。**P1 维护者**。
- [#141011](https://github.com/openclaw/openclaw/pull/141011) — `fix(update): support Homebrew installs and preserve stable LaunchAgent paths`。解决 `brew install openclaw-cli` 在 `openclaw update` 失败以及 LaunchAgent 路径漂移的问题。**P2**。
- [#140309](https://github.com/openclaw/openclaw/pull/140309) — `fix(gateway): Tailscale serve fails at boot before the daemon connects`。闭环 [#139097](https://github.com/openclaw/openclaw/issues/139097)。**P1**。
- [#121204](https://github.com/openclaw/openclaw/pull/121204) — `fix(discord): keep stale ambient backlog from starving live mentions after gateway recovery`。**P1**。
- [#141125](https://github.com/openclaw/openclaw/pull/141125) — `fix(mcp): keep session servers alive between turns`。在 10 分钟默认驱逐被驳回后，恢复 MCP 会话空闲覆盖。**P2 维护者**。
- [#141217](https://github.com/openclaw/openclaw/pull/141217) — `improve(nodes): reduce remote session completion delays`。替代 [#132180](https://github.com/openclaw/openclaw/issues/132180) 的终结批处理实现。**P2**。
- [#141244](https://github.com/openclaw/openclaw/pull/141244) — `improve(tui): reduce preparation work during text and picker updates`。**XS 维护者**。
- [#141240](https://github.com/openclaw/openclaw/pull/141240) — `fix(gateway): UTF-16-safe public session title and message truncation`。修复共享会话 HTML 中代理对半字符的输出问题。**P2**。
- [#141239](https://github.com/openclaw/openclaw/pull/141239) — `fix(gateway): trim device.scopes.waitUpgrade requestId`。**P2**。
- [#141210](https://github.com/openclaw/openclaw/pull/141210) — `improve(anthropic): reduce setup work for large tool rosters`。**P2 维护者，已关闭**。

## 4. 社区热门话题

**按评论量排序的热门 issue（24 小时，含直达链接）：**

1. [#97616 — OpenClaw 泄漏未被回收的 hook/tool 子进程，导致僵尸进程堆积（15 条评论）](https://github.com/openclaw/openclaw/issues/97616)。长期存在的 P1 回归；需要为 hook/tool 派生进程引入进程组回收机制。症状：长生命周期网关性能下降；尚未关联 PR。
2. [#79077 — Telegram bot-to-bot 与 guest-bot 模式（15 条评论，👍8）](https://github.com/openclaw/openclaw/issues/79077)。针对 Telegram 2026-05-07 版本的功能请求；已因过时关闭，但仍出现在评论量榜单中——社区显然希望 OpenClaw 原生支持这些原语。
3. [#135111 — 在 v2026.8.1 上间歇性出现"Provider completed tool call with malformed JSON arguments"（15 条评论）](https://github.com/openclaw/openclaw/issues/135111)。`claude-sonnet-5` 上从 2026.7.1-2 → 2026.8.1 的 P1 回归；每个会话大约复现 6 次。需要一个 provider 端的重试/校验钩子。
4. [#43367 — 多智能体编排不稳定（14 条评论）](https://github.com/openclaw/openclaw/issues/43367)。P1：并发的 `openclaw agents add` 覆盖配置；会话锁失败；子任务脱离。最明显的信号表明多智能体**尚未达到 GA 就绪状态**。
5. [#74586 — AM 嵌入式运行中止 `memory_search` 工具调用（14 条评论，👍3）](https://github.com/openclaw/openclaw/issues/74586)。`active-memory` 插件将模型完整完成的响应误判为超时。
6. [#119720 — 同步智能体持久化在规模场景下阻塞 Gateway 事件循环（12 条评论）](https://github.com/openclaw/openclaw/issues/119720)。Diamond-lobster 评级；通过 [#133925](https://github.com/openclaw/openclaw/issues/133925) 和 [#134062](https://github.com/openclaw/openclaw/issues/134062) 部分修复已落地，但主线程持久化路径仍未解决。
7. [#89278 — Codex OAuth 刷新成功，但 cron/heartbeat 因 10 秒超时失败（11 条评论，👍2）](https://github.com/openclaw/openclaw/issues/89278)。P0，影响标记为 `ux-release-blocker`；OAuth 探测略微超出 10 秒窗口。展示了一个尖锐但可修复的边界条件。
8. [#136183 — 在 SSH 横幅交换期间，命令执行器因 `ssh` SIGTERM 而挂起（10 条评论）](https://github.com/openclaw/openclaw/issues/136183)。2026.8.1 中出现的回归，在 2026.8.2 中仍然存在。
9. [#139714 — post-core update resume 接受了一条永远无法终结的 `update_runs` 记录（9 条评论）](https://github.com/openclaw/openclaw/issues/139714)。`openclaw status` 永远显示"update in progress"。与今日的 [#141109](https://github.com/openclaw/openclaw/pull/141109) 修复相关。
10. [#140010 — Windows 休眠/唤醒：WebSocket 重连失败 30–60 秒以上（9 条评论）](https://github.com/openclaw/openclaw/issues/140010)。网关已唤醒但将解冻恢复推迟在繁忙任务之后；P1。

**社区的根本诉求：**用户希望（a）稳定的多智能体并发方案，（b）provider 协议的韧性（OAuth/Codex/Anthropic 的畸形 JSON、App-server 所有权），以及（c）`openclaw update` 的可靠性，确保升级永远不会破坏原本健康的安装。

## 5. Bug 与稳定性

**今日 P0 / P1 / P2，按严重程度排序：**

| 严重程度 | Issue | 标题 | 状态 |
|----------|-------|-------|--------|
| **P0** | [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth 刷新成功，但 cron/heartbeat 因 10 秒鉴权刷新超时失败 | 未关闭，可本地复现，已关联 PR |
| **P0** | [#140497](https://github.com/openclaw/openclaw/issues/140497) | Discord 配置将 application ID 误作为 bot token 接受 | **过去 24 小时内已关闭** |
| **P0** | [#106920](https://github.com/openclaw/openclaw/issues/106920) | openclaw 2026.7.1 无法重启网关 | **过去 24 小时内已关闭**（👍5） |
| **P1** | [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw 泄漏未被回收的 hook/tool 子进程 | 未关闭，无修复 PR |
| **P1** | [#135111](https://github.com/openclaw/openclaw/issues/135111) | v2026.8.1（claude-sonnet-5）上间歇性出现畸形 JSON 工具调用 | 未关闭，无修复 PR |
| **P1** | [#43367](https://github.com/openclaw/openclaw/issues/43367) | 多智能体编排不稳定 | 未关闭，已关联 PR |
| **P1** | [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步智能体持久化阻塞 Gateway 事件循环 | 未关闭，仅部分修复 |
| **P1** | [#136183](https://github.com/openclaw/openclaw/issues/136183) | 派生 ssh 时命令执行器挂起 | 未关闭，回归问题 |
| **P1** | [#140010](https://github.com/openclaw/openclaw/issues/140010) | Windows 休眠/唤醒：WebSocket 重连失败 30–60 秒以上 | 未关闭 |
| **P1** | [#137927](https://github.com/openclaw/openclaw/issues/137927) | `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` 泄漏到 Telegram 可见文本中 | 未关闭 |
| **P1** | [#117262](https://github.com/openclaw/openclaw/issues/117262) | SQLite 争用：3 个并发写句柄导致 33 秒停顿（DEF-61） | 未关闭 |
| **P1** | [#118018](https://github.com/openclaw/openclaw/issues/118018) | 陈旧的子智能体完成事件被投递到已被替换的请求方生命周期中 | 未关闭 |
| **P1** | [#127148](https://github.com/openclaw/openclaw/issues/127148) | Codex `sessions.compact` 获取第二个 app-server，出现活动写入者冲突 | 未关闭 |
| **P1** | [#139847](https://github.com/openclaw/openclaw/issues/139847) | 回复运行活跃期间消息被丢弃 — "no active tool authority snapshot"（2026.9.2） | 未关闭，回归问题 |
| **P1** | [#139578](https://github.com/openclaw/openclaw/issues/139578) | llama.cpp EmbeddingGemma 在 2026.9.2 中以服务器默认 ubatch 512 运行（回归） | 未关闭 |
| **P1** | [#99910](https://github.com/openclaw/openclaw/issues/99910) | 记忆 dream 运行使事件循环满载约 10 分钟 | 未关闭 |
| **P1** | [#121232](https://github.com/openclaw/openclaw/issues/121232) | memory-core dreaming 排序器与应用器不一致 — "Ranked N, Promoted 0" | 未关闭，已关联 PR |
| **P1** | [#140129](https://github.com/openclaw/openclaw/issues/140129) | 2026.9.2 Anthropic 缓存卡在约 46k tools+system 前缀 | 未关闭 |
| **P1** | [#128637](https://github.com/openclaw/openclaw/issues/128637) | 多智能体 `AgentSelectionRequiredError` 出现在 ambient 操作中 | 未关闭，回归问题 |
| **P1** | [#119454](https://github.com/openclaw/openclaw/issues/119454) | 卡住会话恢复在泄漏的空闲嵌入式运行上自抑制 | 未关闭 |
| **P1** | [#134896](https://github.com/openclaw/openclaw/issues/134896) | 2026.8.1 更新：5 重阻塞的网关重启级联 + `doctor --fix` 自我引用失败 | 未关闭 |
| **P1** | [#112160](https://github.com/openclaw/openclaw/issues/112160) | SSH 沙箱不将入站媒体暂存到远程工作区 | 未关闭 |
| **P2** | [#139714](https://github.com/openclaw/openclaw/issues/139714) | post-core update resume 接受了一条永远无法终结的 `update_runs` 记录 | 未关闭 → 由 [#141109](https://github.com/openclaw/openclaw/pull/141109) 修复 |

**今日已合并的修复：**
- [#140497](https://github.com/openclaw/openclaw/issues/140497) — 已关闭（Discord 配置 token 校验）。
- [#106920](https://github.com/openclaw/openclaw/issues/106920) — 已关闭（网关重启）。
- [#137024](https://github.com/openclaw/openclaw/issues/137024) — 已关闭（通过 settled-turn 回退机制打破 NO_REPLY 静默）。
- [#136200](https://github.com/openclaw/openclaw/issues/136200) — 已关闭（Feishu 引用合并转发的占位文本）。
- [#135970](https://github.com/openclaw/openclaw/issues/135970) — 已关闭（codex `dist/extensions/codex` 缺少 node_modules）。
- [#140535](https://github.com/openclaw/openclaw/issues/140535) — 已关闭（Discord `/new` "No reply was generated"）。
- [#123872](https://github.com/openclaw/openclaw/issues/123872) — 已关闭（重启排空 300 秒与 systemd 30 秒冲突）。

**仍未解决的最高严重程度回归：**2026.9.2 消息丢失回归 [#139847](https://github.com/openclaw/openclaw/issues/139847) 和 Anthropic 缓存重写回归 [#140129](https://github.com/openclaw/openclaw/issues/140129)——两者直接影响当前稳定版本上用户可见的聊天可靠性。

## 6. 功能请求与路线图信号

**强信号（多评论 / 👍 或被维护者标记）：**

- **Telegram bot-to-bot / guest-bot 集成**（[#79077](https://github.com/openclaw/openclaw/issues/79077)，👍8）。虽以过时关闭，但持续的需求表明应作为范围限定的 RFC 重新打开。
- **`session_status` / agent runtime 中已解析的后端模型**（[#51441](https://github.com/openclaw/openclaw/issues/51441)）。对任何使用 LiteLLM 或路由代理的用户都是普遍需求；变更小而可控。
- **在会话重置/剪枝（而非仅压缩）时挂载 `session-memory` 钩子**（[#51572](https://github.com/openclaw/openclaw/issues/51572)）。钩子面完整性的诉求。
- **针对 cron 和 heartbeat 的每任务提升执行范围**（[#41484](https://github.com/openclaw/openclaw/issues/41484)，👍1）——已关闭；很可能作为安全 RFC 重新浮现。
- **带角色隔离的 cron 维护窗口**（[#120244](https://github.com/openclaw/openclaw/issues/120244)，#79192 / #119575 的后续）。出于运维驱动，非投机性。
- **Reason-aware cron 防护机制**（[#14376](https://github.com/openclaw/openclaw/issues/14376)）——计费/配额 vs 瞬时错误 vs 限流的区分。与 [#89278](https://github.com/openclaw/openclaw/issues/89278) 和 [#139465](https://github.com/openclaw/openclaw/issues/139465) 中表达的运维痛点一致。
- **推理流 UX**（[#42276](https://github.com/openclaw/openclaw/issues/42276)）。`/reason` 流目前在某些聊天客户端中无法覆写行；与 OpenAI/Grok 的竞品对标。
- **工具结果的手动上下文清理**（[#45503](https://github.com/openclaw/openclaw/issues/45503)，👍2）。用户希望除了 TTL 之外还有智能体控制的剪枝能力。
- **`memory-lancedb` 工具暴露**（[#84242](https://github.com/openclaw/openclaw/issues/84242)，👍3）。插件注册了工具，但 Codex/OpenClaw 接口并未暴露——这是一个伪装成功能请求的工具面契约 bug。
- **Control UI 中以 roster 为先的 Agents 首页**（[#141097](https://github.com/openclaw/openclaw/pull/141097)）——已在进行中；针对 UX 缺口。
- **WhatsApp 仅监听 / 仅钩子模式**（[#78963](https://github.com/openclaw/openclaw/issues/78963)，👍1）——已关闭；预计会有 RFC。

**最有可能纳入下个版本的内容（高置信度）：**
1. MCP 会话空闲覆盖（#141125，进行中）。
2. Homebrew/LaunchAgent 感知的更新（#141011，进行中）。
3. 更新流程回归防护（#141146 + #140981，进行中）。
4. 以 roster 为

---

## 横向生态对比

# 跨项目对比报告：个人 AI 助手 / 智能体开源生态
**快照日期：2026-09-07** | 项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

个人 AI 助手 / 智能体开源领域正处于**集体硬化阶段**：在所有五个项目中，过去 24 小时内的主导活动是回归修复、升级流水线加固与可靠性工作，而非新增功能。各项目的架构取向正在收敛——网关/守护进程运行时、多渠道分发（Slack、Telegram、Discord、飞书/企业微信）、MCP 集成、长期记忆子系统、定时自治（cron/heartbeat）——但各项目的成熟节奏不同，从 OpenClaw 的大规模分诊运转到 IronClaw 的静默维护模式。最一致的外部依赖风险是**LLM 服务商方差**（OAuth 边界、格式错误的工具调用 JSON、prompt 缓存经济性、硬编码上下文假设），最一致的内部风险是**维护者集中度**。值得注意的是，五个项目在该日期均未发布版本。

---

## 2. 活动对比

| 项目 | 24h 内触及 Issue | 24h 内触及 PR | Issue 关闭率 | PR 合并/关闭率 | 发布状态 | 健康度评分* |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | ~45%（关闭 223） | ~50%（250） | 无；补丁即将发布 | **7.5/10** |
| **Hermes Agent** | 50 | 50 | 52% | 38% | 无；上一版 v0.21.0 | **6.5/10** |
| **QwenPaw** | 40 | 47 | ~38% | ~38% | 无；v2.2.1 已逾期 | **6.0/10** |
| **ZeroClaw** | 33 | 50 | 9% | **2%** | 无；v0.8.5 分支已于 8/30 关闭 | **5.5/10** |
| **IronClaw** | 0 | 13 | — | 23% | 无 | **7.0/10** |

*\*分析师综合产出指标，综合吞吐、关闭率、开放 P0/P1 负载、修复 PR 覆盖率与巴士因子风险。指标说明：各摘要对"触及/更新"项的计数口径略有差异；OpenClaw 的计数包含标签/机器人噪声，但 6 位数 Issue ID 印证其累计追踪规模相比 ZeroClaw/QwenPaw/IronClaw 高出一个数量级。*

---

## 3. OpenClaw 的定位

**相对于同行的优势：**
- **规模与速度**：日吞吐是任一同行的约 10 倍（500/500 对比 33–50 触及），关闭率（~45–50%）仍可与较小项目媲美。累计追踪规模（~14.1 万 Issue/PR ID）对比 ~10.5 万（Hermes）以及 ~0.8–1.1 万（IronClaw、QwenPaw、ZeroClaw）。
- **覆盖面**：唯一同时硬化 Telegram、Discord、飞书、Homebrew、Tailscale、MCP、Codex 与 Anthropic 集成路径的项目——外加网关、TUI、插件与记忆子系统。
- **P0 响应速度**：两个 P0（#140497、#106920）在 24 小时内关闭；系统化的发布验证加固正在进行（#140981、#141146——跨 12 个已发布 npm 版本的回归门禁）。
- **维护者深度参与**：`steipete` 撰写约 2/3 的日 PR（同时也是集中度风险，见下）。

**技术路线差异：** OpenClaw 采用日历版本号（2026.x）快速发布、再做后置硬化（如 AWS Crabbox 升级矩阵），而 ZeroClaw 走 RFC 先行、落地率仅 2% 的路线，QwenPaw 投入覆盖率冲刺（+245 测试用例）与社区引导，IronClaw（Rust/wasmtime）则优先低变更的安全路线。

**社区规模：** 广度最大——热门 Issue 在*多个*议题下汇聚 9–15 条评论。Hermes 在单议题上展现更深度的讨论（#88584 上 74 条评论），ZeroClaw 体现长文设计参与（RFC 上 25–34 条评论），但二者都未达到 OpenClaw 的分布式体量。

**劣势：** 开放的 P0/P1 负载最高（25+ 表项），连续三个版本反复出现回归模式，多智能体明确**未达 GA 就绪**（#43367），当前版本存在聊天可靠性回归（#139847、#140129）。

---

## 4. 共性技术焦点

| 主题 | 涉及项目 | 具体需求 |
|---|---|---|
| **更新/升级流水线安全** | OpenClaw、Hermes、QwenPaw | 状态 Schema 迁移收尾（#141109）；`ls-remote` 退出码 2 导致的升级器错配（Hermes #105042）；发布期间 CI 合并冻结（QwenPaw #7603，post-beta.4 事件） |
| **服务商协议韧性** | 全部 5 个 | 格式错误 JSON 的工具调用重试（OpenClaw #135111）；Codex OAuth 10 秒超时（OpenClaw #89278）；硬编码 32k 上下文（QwenPaw #7576）；vLLM `max_tokens` 注入（Hermes #105090）；Bedrock cachePoint 配置（ZeroClaw #8720） |
| **Anthropic prompt 缓存正确性** | ZeroClaw、OpenClaw | 第三断点 + 1 小时 TTL + OAuth 前缀标记（ZeroClaw #10660–63）；缓存卡在 46k 前缀（OpenClaw #140129）；历史回剪破坏缓存（ZeroClaw #10674） |
| **Cron/heartbeat 可靠性与诚实投递** | OpenClaw、ZeroClaw、QwenPaw、Hermes | 静默 cron 不执行与虚假"发送成功"（ZeroClaw #10599/#10600，追踪议题 #10685）；heartbeat 反馈环路（QwenPaw #7589）；基于推理的 cron 护栏（OpenClaw #14376） |
| **Windows/桌面端对等性** | Hermes、ZeroClaw、QwenPaw、OpenClaw | 51 秒 GIL 停顿（Hermes #58576）；74 项 Windows 测试失败但仅有 Linux CI（ZeroClaw #7462）；睡眠/唤醒 WebSocket 失败（OpenClaw #140010） |
| **会话/轮次数据丢失** | QwenPaw、ZeroClaw、OpenClaw | 回复已持久化但上下文中缺失（QwenPaw #7579/#7584）；S0 ACP 轮次丢失（ZeroClaw #10121、#9333）；消息丢失回归（OpenClaw #139847） |
| **事件循环阻塞** | Hermes、QwenPaw、OpenClaw | 51 秒–135 秒 UI 卡顿（Hermes #58576、QwenPaw #7363）；同步持久化阻塞网关（OpenClaw #119720） |
| **MCP 健壮性** | 全部 5 个 | 会话服务器生命周期（OpenClaw #141125）；跨进程 OAuth 损坏（Hermes #71335）；出网泄漏诊断（IronClaw #8077）；工具参数类型强制转换（QwenPaw #6936） |
| **评测/QA 工业化** | ZeroClaw、QwenPaw、OpenClaw | 7 个 PR 构成的 LLM 评审评测平台（ZeroClaw）；+245 用例的覆盖率冲刺（QwenPaw）；已发布版本的升级回归门禁（OpenClaw #141146） |

---

## 5. 差异化分析

| 项目 | 功能重心 | 目标用户 | 架构特征 |
|---|---|---|---|
| **OpenClaw** | 最广的渠道/插件/服务商矩阵；多智能体编排（pre-GA）；`openclaw update` 作为一等公民产品 | 自托管深度用户、运维者 | 网关 + TUI + 插件系统；npm 分发；日历版本号驱动的快速补丁节奏 |
| **Hermes Agent** | 多前端连续性（桌面/VPS/网关共享状态）；长尾服务商可移植性 | 跨设备运行永续机器人的个人用户 | Python；活动追踪器的"抢救"工作流；桌面 + 网关分离 |
| **IronClaw** | WebUI 斜杠命令打磨；Slack 多用户配对语义；MCP 出网安全边界 | 安全导向的团队运维者 | Rust；wasm/wasmtime 插件方向；刻意低变更的维护 |
| **QwenPaw** | 桌面应用分发；中文服务商目录（Qwen、Volcengine、MiMo、DeepSeek）；Creator 插件（A/B 对比、视频排程） | 中文模型生态的资深用户 | PyInstaller 桌面版 + 控制台 + Hub 沙箱；强首次贡献者引导 |
| **ZeroClaw** | 运行时自有会话、统一附件、WASM 插件、仅追加事件历史、评测平台、ACP/ZeroCode | 构建智能体运行时的开发者 | RFC 驱动的设计流程；超大 XL PR；显式维护者决策队列 |

---

## 6. 社区势能与成熟度

- **Tier 1 —— 超大规模迭代**：**OpenClaw**。吞吐量*与*关闭率均最高，但背负最大的开放 P1 积压；运营成熟，稳定度仍在提升。
- **Tier 2 —— 快速迭代伴新流入**：**QwenPaw**。一日内出现 5+ 名首次贡献者并由机器人驱动 QA 投入；势头强劲，但 25 个开放 Bug 中约 22 个尚无修复 PR，其中包括数据丢失级别缺陷。
- **Tier 2 —— 硬化阶段**：**Hermes Agent**。通过活动 #104904 实现 52% 的当日 Issue 关闭率，但存在无 PR 的 P1 与一个跨仓库已阻塞 21 天的议题（#88584），暴露尾部风险。
- **Tier 2 —— 设计阶段**：**ZeroClaw**。互动密集（触及 50 个 PR）但落地率仅 ~2%；瓶颈明确是维护者决策节奏（#8692），而非贡献量。
- **Tier 3 —— 稳定维护**：**IronClaw**。零 Issue 提交、Dependabot + 一位贡献者的 UX 打磨；稳定但社区引力低。

**成熟度 ≠ 稳定性**：OpenClaw 按发布历史与规模是最成熟的，但持有的开放严重 Bug 最多；IronClaw 是最稳定的，却最小。ZeroClaw（v0.8.x）正在以速度换取架构正确性。

---

## 7. 趋势信号

1. **可靠性已取代功能开发，成为生态首要工作项。** 五份摘要均以硬化为主导；Hermes 用户给出的判语——"文档行为 ≠ 实际行为"——点出了该赛道的核心声誉风险。
2. **升级器即产品表面。** 三个项目当日投入于升级路径安全与回归门禁；预期"升级永不破坏健康安装"将成竞争底线。
3. **永续自治是新的可靠性前线。** 静默 cron 不执行、虚假投递成功、定时任务触发时的 OAuth 过期正催生专属追踪议题（ZeroClaw #10685）——定时智能体的*结果回执*正在成为新刚需。
4. **服务商方差是首要外部依赖。** 格式错误 JSON 的重试、边界时序的 OAuth 失败、硬编码上下文窗口在各处重现；**prompt 缓存正确性如今同时作为 P1 Bug（OpenClaw）与功能批次（ZeroClaw）**——缓存感知的历史裁剪直接削减成本。
5. **架构收敛已显形**：会话/传输分离、统一附件模型、WASM 插件运行时（ZeroClaw、IronClaw）、仅追加事件历史——皆为多端智能体的前置条件。
6. **Windows/桌面端对等性是 5 个项目中 4 个的系统债**，ZeroClaw 仅在 Linux 上跑 CI 正在主动掩盖回归。
7. **QA 正在工业化**：LLM 评审评测平台、覆盖率冲刺、已发布版本的升级矩阵正在取代临时测试。
8. **巴士因子风险可量化**：OpenClaw 单人（`steipete`）贡献约 2/3 的日 PR，Hermes 单人（`teknium1`）主导分诊，IronClaw 单人（`italic-jinxin`）主导 webui 集群；ZeroClaw 是唯一将瓶颈形式化的项目。

**给智能体开发者**：优先为服务商失败模式做设计，将升级流水线与 cron 调度器视为面向用户的可靠性功能，让缓存行为可观测，并在用户之前就在 Windows 上完成测试。

---
*方法论说明：基于 2026-09-07 项目摘要的单日快照；三份摘要（OpenClaw §6、QwenPaw §7、ZeroClaw §8）在源端被截断——结论仅依赖可用章节。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-07

## 1. 今日概览

Hermes Agent 在 2026-09-07 维持了高强度但两极分化的节奏:**50 个 Issue**(24 个开放 / 26 个关闭)与 **50 个 PR**(31 个开放 / 19 个关闭)被触及,且没有发布新版本。活动明显偏向 **Bug 集中修复和"补救"PR**,而非全新功能;一个明显可识别的协同工作 — 活动追踪器 [#104904](https://github.com/NousResearch/hermes-agent/issues/104904) — 占据了大部分开放 PR 数量。单日 Issue 关闭率达 52%、PR 合并率达 38%,项目推进迅速,但一个长期存在的集成阻塞项(#88584,74 条评论)及多个高严重度的开放 P1 Bug 表明稳定性工作仍未完成。总体健康度:**活跃、高吞吐、处于加固阶段**。

---

## 2. 版本发布

过去 24 小时内未发布新版本。当前提到的最新版本仍为 v0.21.0(`693641a`)和 v2026.8.3 / 0.20.0("The Herald")。使用者应将实时 `main` 分支视为修复来源(见下方活动 #104904)。

---

## 3. 项目进展

今日合并或关闭的 PR(精选,按重要性排序):

| PR | 标题 | 重要性 |
|---|---|---|
| [#103109](https://github.com/NousResearch/hermes-agent/pull/103109) | **fix(gateway):** 停止将 `sys.maxsize` 打印为迭代上限 | UX/外观;状态行不再显示 `9223372036854775807` 作为上限 |
| [#104982](https://github.com/NousResearch/hermes-agent/pull/104982) | **fix(desktop):** 工具编辑与失败重建保留会话配置文件 | #104842 的堆叠跟进 — Desktop 会话稳定性 |
| [#105096](https://github.com/NousResearch/hermes-agent/pull/105096) | **fmt(js):** `npm run fix` 自动修复 | 机器人自动合并;例行 |
| (活动 #104904 关闭项:#104445、#104537、#104729、#104536、#104509、#104176、#104242、#104275、#104249、#104093、#81584) | 各类 Bug 修复 | Issue 端关闭跟随已完成的修复 PR |

**净方向:**网关状态格式化、Desktop 配置持久化、Windows 安装程序、MCP 工具发现,以及若干 cron / 会话 / 计费修复均已合入。两项实质性功能工作仍处 *开放* 状态:**#97083(分片 Webhook 持久化授权管道)** 与 **#98615(`execute_code` 中的只读 MCP 工具)** — 均标记为 `needs-decision`。

---

## 4. 社区热门话题

| # | 标题 | 评论数 | 为何热门 |
|---|---|---:|---|
| [Issue #88584](https://github.com/NousResearch/hermes-agent/issues/88584) | 自动 Nous-to-Enterkey 集成阻塞 — `cron/jobs.py` 合并冲突 | **74** | 已停滞约 3 周,阻塞定时合并管道,仪表板更新器固定到上次测试的 Enterkey 版本。运营层面造成干扰。 |
| [Issue #97681](https://github.com/NousResearch/hermes-agent/issues/97681) | Bot 群聊在 Desktop 关闭后应继续工作 | **27** | 跨设备连续性是 Hermes 的核心卖点;用户期望笔记本 / VPS / 家用服务器上的 Bot 能在共享群聊中持续运行。 |
| [Issue #58576](https://github.com/NousResearch/hermes-agent/issues/58576) | `web_server` 事件循环在重型 Agent 工作下停滞高达 51 秒(GIL 压力) | **10** | Windows 上的 P1 回归;在重型工具使用期间冻结 Desktop UI 约 1 分钟。所有重度用户都能看到。 |
| [Issue #71335](https://github.com/NousResearch/hermes-agent/issues/71335) | 共享 `HERMES_HOME` 的并发进程损坏 MCP OAuth 轮换授权(Notion) | **7** | P1;违反了文档中"所有前端共享状态"的承诺 — 跨进程加锁缺失,存在安全隐患。 |

**潜在需求:**互动量最高的讨论都围绕 **产品文档已承诺的连续性 / 安全性保证**:后台工作持续进行、UI 不冻结、跨前端状态不损坏、定时发布管道可用。这些并非功能愿望清单 — 而是对文档行为的回归。

---

## 5. Bug 与稳定性

按优先级标签排序,最具影响的排在前面:

### P1(高严重度,开放)
- [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — Windows 11 / Python 3.11.15 下重型 Agent 工作导致 **51 秒 `web_server` 事件循环停滞**。引起可见的 Desktop UI 冻结。**尚未关联 PR。**
- [#71335](https://github.com/NousResearch/hermes-agent/issues/71335) — 多个 Agent 进程共享 `HERMES_HOME` 时 **跨进程 MCP OAuth Token 损坏**(Notion)。**尚未关联 PR。**
- [#98206](https://github.com/NousResearch/hermes-agent/issues/98206) — 压缩剪除原始技能内容后,`skill_view` 返回去重桩。**尚未关联 PR。**

### P2(开放)
- [#105090](https://github.com/NousResearch/hermes-agent/issues/105090) — 私有 vLLM qwen3 模型:从子串表注入 `max_tokens=65536`,然后 **对必然返回 HTTP 400 的请求进行 4 次完全相同的重试**。
- [#80625](https://github.com/NousResearch/hermes-agent/issues/80625) — 远程 Shell 为 **Fish** 时,Desktop SSH 远程后端失败(通过 SSH 发送了 Bash/POSIX 语法)。
- [#105042](https://github.com/NousResearch/hermes-agent/issues/105042) — Desktop 更新器误将 `git ls-remote` 的 **退出码 2 解释为"分支已合并/消失"**,静默地重新固定到 `main`。对 Fork / 功能分支存在非预期降级风险。
- [#105052](https://github.com/NousResearch/hermes-agent/issues/105052) — 运行中的会话期间,Desktop 聊天输入框 **点击后数秒即丢失焦点**。
- [#104093](https://github.com/NousResearch/hermes-agent/issues/104093)(已关闭) — `memory_tool` 删除了文档化的 `new_text` 别名(用于 `content`),导致 `replace` 失效。修复很可能已在活动中合并。
- [#104176](https://github.com/NousResearch/hermes-agent/issues/104176)(已关闭) — `ContextCompressor._generate_summary()` 签名变更破坏了带有 `bypass_cooldown` 的子类。今日关闭。
- [#104445](https://github.com/NousResearch/hermes-agent/issues/104445)(已关闭) — `/goal` 被空闲/每日会话过期孤立;未调用 `migrate_goal_to_session`。今日关闭。
- [#104249](https://github.com/NousResearch/hermes-agent/issues/104249)(已关闭) — 无网关运行时,待处理 Fleet 重启被静默丢弃。今日关闭。

### P3 / 平台特定
- [#103793](https://github.com/Users/NousResearch/hermes-agent/issues/103793) — Windows 本地 STT 失败:**找不到 `cublas64_12.dll`**。需要 CUDA 12 wheels 或强制回退到 CPU。
- [#105074](https://github.com/Users/Research/hermes-agent/issues/105074) — 仪表板心跳看门狗在 Windows 休眠/唤醒后报告长达一小时的 "GIL 停滞" — 需要 **电源感知的基线重置**(对照 `gateway power_management.py`)。
- [#104537](https://github.com/Users/Research/hermes-agent/issues/104537)(已关闭) — Windows 分离式 Desktop 更新失败,返回 **退出码 124**;`_run_logged_subprocess` 缓冲输出。今日关闭。

**Bug-带修复-PR 状态:**今日关闭的 Issue 中约一半对应到活动 #104904 中合并/补救的修复 PR;其余 P1/P2 **尚未挂接 PR** — 这些是真正的积压风险。

---

## 6. 功能请求与路线图信号

| # | 标题 | 优先级 | 路线图解读 |
|---|---|---|---|
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 跨设备 Bot 群聊在 Desktop 关闭后仍存活 | P2 | **可能是下一个小版本** — 高互动,直接延伸"共享状态"承诺;需要在网关侧守护进程化 Bot 生命周期 |
| [#97390](https://github.com/NousResearch/hermes-agent/issues/97390) | 网关会话的每频道后台空闲上下文压缩 | P3 / `needs-decision` | **较可能** — 与 #97681 互补;降低长寿命聊天会话的用户感知延迟 |
| [#59784](https://github.com/NousResearch/hermes-agent/issues/59784) | Hermes Desktop 中显眼的"需要审批"提醒模式 | P3 | 低成本,UX 提升;很可能作为小型跟进版本 |
| [#104729](https://github.com/NousResearch/hermes-agent/issues/104729)(已关闭) | Desktop 斜杠自动补全完整描述悬停 | P3 | 已关闭(可能已发布);预计将出现在下一版发布说明中 |
| [#104275](https://github.com/Users/Research/hermes-agent/issues/104275)(已关闭) | 被动更新检查的可选关闭项(环境变量 + 配置项) | P3 | 已关闭(可能已发布) — 对嵌入式 / 设备类用户很重要 |

**长周期信号**(开放、`needs-decision`、已存在多周):
- **PR [#97083](https://github.com/NousResearch/hermes-agent/pull/97083)** — 为 Webhook 分片持久化授权管道。架构性;合成 Gate 日期为 2026-08-30。
- **PR [#98615](https://github.com/NousResearch/hermes-agent/pull/98615)** — 为 `execute_code` 提供受控的只读 MCP 工具面。受安全边界约束;很可能在策略评审后落地。
- **PR [#82243](https://github.com/NousResearch/hermes-agent/pull/82243)** — 通过 Tool Search 桥在 `execute_code` 中组合延迟 MCP / 插件工具。
- **PR [#85571](https://github.com/NousResearch/hermes-agent/pull/85571)** — 受保护接收方的 `final_only` 逐轮展示策略(安全 / UX 边界)。

**下一标签版本的预测**(可能为 0.21.x 或 0.22.0):代码执行中的只读 MCP 暴露、空闲压缩、斜杠自动补全打磨,以及一批 Desktop profile / 会话连续性修复。

---

## 7. 用户反馈摘要

**满意度信号**
- 用户主动撰写详细的复现步骤,附带版本、操作系统、Python 与 Commit 哈希 — 互动质量高。
- 多项功能请求(如 #104729 悬停、#104275 可选关闭)在开启 24 小时内即关闭 — 对外观 / 体验类项的响应速度很快。
- 活动 #104904 展现了明确的"补救模式":旧 PR 通过修正基底重做而非废弃,用户通过关联的活动追踪器 Issue 跟踪进展。

**痛点**(取自今日 Issue 的原文主题)
1. **"文档行为 ≠ 实际行为。"** 多个 P1/P2 Bug(#71335 跨进程状态、#104093 `new_text` 别名、#104445 `/goal` 孤立)直接违反 README 或 docstring 中的声明。信任缺口是主导主题。
2. **Windows 与 WSL2 是二等公民。** [#58576](#58576)、[#103793](#103793)、[#105074](#105074)、[#104537](#104537)、[#104536](#104536) — 今日 Issue 中有 5 项为 Windows 专属,其中多项为 P1。
3. **提供商可移植性摩擦。** vLLM Token 计量(#105090)、DeepSeek 高峰/非高峰计费(#88374)、OpenCode Go `deepseek-v4-flash`(#81584,已关闭) — 用户将 Hermes 跑在长尾提供商上,频繁撞到代码库尚未吸收的边缘情况。
4. **更新管道脆弱。** Desktop 更新器在 `ls-remote` 退出码 2 上的固定(#105042)、Windows 分离式更新退出码 124(#104537)、待处理 Fleet 重启丢弃(#104249)、定时 Nous 合并阻塞(#88584)。四种独立的更新/安装机制各有各的失败模式。
5. **会话连续性。** `/goal` 孤立、Desktop 关闭后 Bot 群聊存活、配置在重建时丢失 — 用户构建的长运行自动化悄无声息地死去。

---

## 8. 积压关注

最需要维护者关注的事项(高影响、无近期维护者活动 / 无修复 PR 挂接):

| 项 | 存在时间 | 关注点 |
|---|---|---|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — Nous 集成阻塞,74 条评论 | 开放 21 天,0 👍 | 跨仓库协同失败仍未解决;影响发布节奏 |
| [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — 51 秒事件循环停滞(P1) | 约 2 个月,10 条评论 | 无关联 PR;GIL 压力缓解方案 / 异步循环重构尚未尝试 |
| [#71335](https://github.com/NousResearch/hermes-agent/issues/71335) — 跨进程 MCP OAuth Token 损坏(P1) | 约 6 周,7 条评论 | 安全类回归;需要跨进程锁或 Token 存储重设计 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) — 跨设备 Bot 群聊(P2) | 9 天,27 条评论 | 需求强烈;尚未在 Issue 上提出设计方案 |
| [#97390](https://github.com/NousResearch/hermes-agent/issues/97390) — 每频道空闲压缩(`needs-decision`) | 10 天,3 条评论 | 等待维护者就范围做出决策 |
| **PR** [#97083](https://github.com/NousResearch/hermes-agent/pull/97083) — 分片 Webhook 持久化授权 | 开放 10 天,`needs-decision` | 架构性变更;需要维护者签批才能合并 |
| **PR** [#98615](https://github.com/NousResearch/hermes-agent/pull/98615) — `execute_code` 中的只读 MCP 工具 | 开放 8 天,`needs-decision` | 受安全边界约束的功能;停留在 `needs-decision` 标签 |
| **PR** [#82243](https://github.com/NousResearch/hermes-agent/pull/82243) — `execute_code` 中的延迟工具组合 | 开放约 1 个月,`needs-decision` | 已停滞;可由维护者评审或附带理由关闭 |
| [#105097](https://github.com/NousResearch/hermes-agent/issues/105097) — 网关:基于可恢复 Webhook 传输能力的交互式澄清门控 | 开放 1 天,0 条评论 | 自描述为传输能力 *差距报告*,而非复现;需要维护者分流以确认范围 |

**维护者带宽信号:**teknium1 正在编写今日大部分开放修复 PR;许多 PR 明确引用了活动追踪器([#104904](https://github.com/NousResearch/hermes-agent/issues/104904)),表明单一驱动者吸收了大部分分流工作。分散评审负载或关闭停滞的 `needs-decision` PR(#82243、#97083、#98615)将解除对可见功能工作的阻塞。

---

*摘要生成于 2026-09-07,基于 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) 的 GitHub 活动。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目速览 — 2026-09-07

## 1. 今日概览

IronClaw（github.com/nearai/ironclaw）在过去 24 小时内呈现出以维护为主的活跃度，没有新 issue 提交，也没有新版本发布。仓库脉搏以 Pull Request 活动为主导：共涉及 13 个 PR，仍开放的有 10 个、关闭/合并的有 3 个。主题上呈现明显的分化——大约一半的活动是通过 Dependabot 进行的自动化依赖维护（Rust crates、GitHub Actions、wasm 工具链），另一半则是由 `italic-jinxin` 发起的一组协调性 `webui` UX 打磨 PR，外加两项实质性的功能性修复（`#8076` 用于助手通道配对，`#8077` 用于 MCP 出站诊断）。整体项目健康度读数为稳定且维护良好：常规、低风险的日常变动，没有升级告警、没有崩溃性回归，也没有阻塞维护者的待处理事项。

## 2. 版本发布

过去 24 小时内无新版本发布。发布流水线在依赖轮换 PR（#8080、#8079、#8078、#7834）落定之前保持安静，这在打包 webui UX 修复与 MCP/assistant 更正的标签版本之前属于常态。

## 3. 项目进展

窗口期内有 3 个 PR 被关闭/合并：

- **[#8049](https://github.com/nearai/ironclaw/pull/8049)** — *chore(deps): bump the everything-else group (19 updates)* — 大规模、低风险的 Rust 依赖刷新，覆盖 `uuid`、`base64`、`toml` 等。成功合入，说明在广泛的依赖面上 CI 信号健康。
- **[#7835](https://github.com/nearai/ironclaw/pull/7835)** — *chore(deps): bump the actions group (5 updates)* — 中等风险的 CI 升级，包括 `anthropics/claude-code-action` 以及 `actions/setup-node` 升级至 `7.0.0`。干净关闭，巩固了 v7 Node action 基线。
- **[#7020](https://github.com/nearai/ironclaw/pull/7020)** — *chore(deps): bump tokio-tungstenite 0.29.0 → 0.30.0* — 长期搁置的 token PR 终于关闭，将 Tokio WebSocket 技术栈统一到 0.30.x。

此外，仍开放的 webui PR 集群（[#8071](https://github.com/nearai/ironclaw/pull/8071)、[#8070](https://github.com/nearai/ironclaw/pull/8070)、[#8069](https://github.com/nearai/ironclaw/pull/8069)、[#8068](https://github.com/nearai/ironclaw/pull/8068)）构成一次针对斜杠命令与命令结果 UI 的协调升级，推进布局一致性、关闭操作的可用性、滚动视口的正确性，以及响应式元数据对齐——共同抬升了聊天界面的打磨水准。

## 4. 社区热点

过去 24 小时内无 issue 更新，所列 PR 也均未携带表情或评论指标，因此无法基于当前快照对"热度"进行量化排名。从定性角度看，最值得关注互动性的事项包括：

- **[#8077](https://github.com/nearai/ironclaw/pull/8077)** — *fix(mcp): classify response leak diagnostics* — 关闭 #8009（主端泄漏阻止哨兵的分类问题）。MCP 通道是受关注度极高的集成界面；该 PR 解决了诊断正确性问题，同时未削弱安全边界。
- **[#8076](https://github.com/nearai/ironclaw/pull/8076)** — *fix(assistant): distinguish disconnected shared channels* — 针对用户难以区分"已配对但断开的 Slack 频道"与"未配对账户"的困惑，并在适配器、产品侧以及 OpenAI 兼容接口上统一拒绝消息文案。这回应了多用户 Slack 场景下反复出现的 UX 痛点。
- **Webui PR 集群（#8068–#8071）** — 大概率反映了用户在斜杠命令导航、卡片关闭以及布局跳动方面累积下来的挫败感。

这些线索背后的需求是一致的：让产品内的反馈（命令、诊断、通道状态）更加清晰，让运营者无需猜测即可行动。

## 5. Bug 与稳定性

过去 24 小时内无新 issue 报告。在 PR 之中，以下属于 bug 类修复（按影响范围与重要程度排序）：

| 严重程度 | PR | 标题 | 影响范围 | 修复状态 |
|---|---|---|---|---|
| 中 | [#8076](https://github.com/nearai/ironclaw/pull/8076) | fix(assistant): distinguish disconnected shared channels | 跨界面（Slack + OpenAI 兼容接口） | 修复 PR 开放中 |
| 中 | [#8077](https://github.com/nearai/ironclaw/pull/8077) | fix(mcp): classify response leak diagnostics (closes [#8009](https://github.com/nearai/ironclaw/issues/8009)) | MCP 通道安全边界 | 修复 PR 开放中 |
| 低 | [#8068](https://github.com/nearai/ironclaw/pull/8068) | fix(webui): keep the active slash command visible | UI 可用性 | 修复 PR 开放中 |
| 低 | [#8069](https://github.com/nearai/ironclaw/pull/8069) | fix(webui): add dismiss actions to command result cards | UI 状态卫生 | 修复 PR 开放中 |
| 低 | [#8070](https://github.com/nearai/ironclaw/pull/8070) | fix(webui): align slash-command metadata | UI 布局 | 修复 PR 开放中 |
| 低 | [#8071](https://github.com/nearai/ironclaw/pull/8071) | fix(webui): preserve command result card height | UI 布局 | 修复 PR 开放中 |

本窗口期内无崩溃、数据丢失或安全披露报告。

## 6. 功能请求与路线图信号

过去 24 小时内未出现明确的功能请求 issue。但仍可从 PR 流中读出隐含的路线图信号：

- **斜杠命令 UX 走向成熟** — 这 4 个 PR 组成的 webui 批处理（#8068–#8071）表明团队正在将聊天命令界面收敛为一个"v1"形态：可预测的布局、键盘可导航的菜单、可关闭的临时卡片，以及外层滚动纪律。下一次标签版本中很可能将它们打包为面向用户的发布说明。
- **MCP 诊断精度** — 集中化处理 `response_leak_blocked` 哨兵（[#8077](https://github.com/nearai/ironclaw/pull/8077)）是后续更丰富 MCP 可观测性的基础；可预期会有后续工作将分类后的原因暴露给客户端。
- **多用户 Slack 配对清晰化** — [#8076](https://github.com/nearai/ironclaw/pull/8076) 在修复 Slack 能力面的同时也在同步推进，暗示配对状态的语义正在被形式化，以适用于外部集成，而不仅限于产品内 UI。
- **依赖基线变动** — 多项 Dependabot PR（Node `setup-node` → `7.0.0`、`wasmtime`/`wit-component`/`wit-parser` 更新、`claude-code-action` 1.0.215）暗示下一个版本会要求维护者关注 CI 矩阵兼容性，而非引入面向用户的功能。

## 7. 用户反馈汇总

过去 24 小时内无来自 issue 的新反馈，因此没有可直接引用的用户原话。但 PR 流仍编码出维护者正在回应的三项反复出现的用户痛点：

- **共享通道上的失败模式含混不清** — 用户（或运营者）无法判断 Slack 频道被拒绝意味着机器人与已配对账户断开，还是根本未配对。由 [#8076](https://github.com/nearai/ironclaw/pull/8076) 解决。
- **MCP 出站阻止原因晦涩** — 主端阻止泄漏时，仅以通用错误暴露给 MCP 客户端；[#8077](https://github.com/nearai/ironclaw/pull/8077) 在保留主端安全不变性的前提下，恢复了一个 MCP 可见的明确原因。
- **斜杠命令 UX 摩擦** — 卡片折叠、当前选项被滚出视图、元数据错位、临时结果缺少关闭入口。#8068–#8071 集群逐一对症下药，体现出对聊天界面的持续用户测试投入。

尚不存在足够广泛的负面信号以暗示流失风险；这些修复的基调属于迭代式打磨，而非补救性整改。

## 8. 待办观察

- **[#7834](https://github.com/nearai/ironclaw/pull/7834)** — *chore(deps): bump the wasm group (4 updates, medium risk)* — 自 2026-08-23 起开放，已停滞约 15 天。wasmtime/wit-* 系列更新被标记为中等风险，在下次发布前值得由维护者显式过一遍。
- **等待合并的 webui 集群** — [#8068](https://github.com/nearai/ironclaw/pull/8068)、[#8069](https://github.com/nearai/ironclaw/pull/8069)、[#8070](https://github.com/nearai/ironclaw/pull/8070)、[#8071](https://github.com/nearai/ironclaw/pull/8071) 均出自同一核心贡献者（`italic-jinxin`），且触及相邻组件；协调式评审可降低布局回归冲突的概率。
- **[#8076](https://github.com/nearai/ironclaw/pull/8076) 与 [#8077](https://github.com/nearai/ironclaw/pull/8077)** — 当前影响用户最深的两项修复在途。两者均未停滞，但都跨越产品边界（assistant ↔ Slack 适配器、主端 ↔ MCP 通道），需要审查者对跨界面契约给出明确签字。
- **[#8080](https://github.com/nearai/ironclaw/pull/8080)** — 已关闭 #8049 之后出现的更新版合并请求（21 项更新，对比原先的 19 项）。应在 #8049 落地之后的基线上做校验，避免重新引入变动。

今日没有需要维护者介入升级的开放 issue。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目每日摘要 — 2026-09-07

## 1. 今日概览

QwenPaw 表现出**较高的分诊与稳定化活动**：40 个 Issue 被更新（25 个开放，15 个已关闭），47 个 PR 被更新（29 个开放，18 个已合并/关闭），但**没有新版本发布**。项目目前处于 v2.2.0 之后的补丁周期，许多用户反馈指出 **v2.2.0 引入的回归问题**（工作目录选择器、空闲超时硬编码、模型回复从上下文中消失、仪表盘卡顿）。首次贡献者活跃度尤为突出（一天内出现 5+ 个首次 PR），表明社区新人引导健康；同时维护者的 "QPQAT" 机器人账号持续推进测试、CI 以及 provider 目录相关工作。总体健康度：**稳定性方面令人担忧，但在动能和贡献者参与度上表现强劲**。

---

## 2. 版本发布

**过去 24 小时内无新版本发布。**

项目当前仍停留在 **v2.2.0**（约 2026 年 8 月下旬发布）。多个 Issue（#7604、#7588、#7601、#7594）表明 **v2.2.1 / v2.2.0-patch1 版本已逾期**，尤其是工作目录选择器回归以及无法配置的 LLM 流式空闲超时问题。

---

## 3. 项目进展

### 今日合并/关闭的 PR

| PR | 标题 | 影响 |
|---|---|---|
| [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) | fix(providers): coerce string-typed tool args emitted as JSON numbers | 关闭 [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839)；修复 MCP 工具校验失败问题 |
| [#7499](https://github.com/agentscope-ai/QwenPaw/pull/7499) | fix(console): unify nav and theme-toggle icons with Spark line series | UI 一致性清理（关闭 #7376） |
| [#7530](https://github.com/agentscope-ai/QwenPaw/pull/7530) | test(console): expand console unit tests (+245 cases, +5.02pp coverage) | 第四批覆盖率冲刺批次 —— 强劲的 QA 投入 |
| [#7603](https://github.com/agentscope-ai/QwenPaw/pull/7603) | ci: freeze default-branch merges during releases | 防止 v2.2.0-beta.4 事故重演（当时 PR #7267 在发布过程中被合并） |
| [#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561) | refactor(memory): unify automatic memory lifecycle and actions | 对内存管理器契约的破坏性重构 |
| [#6515](https://github.com/agentscope-ai/QwenPaw/pull/6515) | feat(providers): add Volcengine Agent Plan & MiMo V2.5 providers | 更新 Volcengine / MiMo 模型目录（2026-08-24 官方） |

### 仍在推进中的功能（开放 PR）

- **Memory（记忆）**：[#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) 新增 OpenViking 长期记忆后端；[#7606](https://github.com/agentscope-ai/QwenPaw/pull/7606) 为 ReMe 0.4.1.12 适配 Auto-Dream。
- **Skills/Plugins（技能/插件）**：[#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) 暴露技能版本并校验声明的依赖；[#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) 为插件管理器添加更新检测。
- **Console UX（控制台体验）**：[#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) 重新设计侧边栏与设置；[#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611) 修复 BiDi RTL/LTR 文本渲染。
- **Reliability（可靠性）**：[#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) 处理工具协调器吞掉异常的问题（#7572）；[#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) 防止聊天提交绕过 localStorage 队列（#7559 的根因）。
- **Computer Use (macOS)**：[#7614](https://github.com/agentscope-ai/QwenPaw/pull/7614) 新增 helper-restart 动作以从缓存的 TCC 权限拒绝中恢复。
- **Shell 加固**：[#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598) 将子进程 stdin 与交互式控制台解耦（Windows）。
- **Creator 应用插件**：[#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486) 发布 Creator 1.1.2 —— 运行时通知总线、多时间线 A/B 对比、T2V/I2V/S2V 调度、Docker 部署。

---

## 4. 社区热议话题

| 项目 | 类型 | 评论数 | 为何重要 |
|---|---|---|---|
| [#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505) | 问题（已关闭） | 12 | LAN LLM 服务器可靠性 —— 使用 LM Studio 时反复出现 `client disconnect`，导致重试与超时。表明局域网上的 OpenAI 兼容流式传输较为脆弱。 |
| [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) | Bug（开放） | 5 | 直接返回 409 "task already running" 而非排队 —— 与用户预期不符；PR [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) 正在处理。 |
| [#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820) | Bug（已关闭） | 5 | 前端 UI 隐藏流式输出（工具调用、思考过程） —— 透明度/UX 上的回归。 |
| [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | Bug（开放） | 4 | **`RetryChatModel` 中硬编码 32768 token 上下文回退**，导致所有非 Qwen 模型触发 `CONTEXT_UNFIT` —— 影响面广，存在于所有已发布的 v2.1.0–v2.2.0 版本中。 |
| [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587) | Bug（开放） | 4 | 在 WUSRouter 上列出模型时，OpenAI 兼容 provider 命中 **Cloudflare 403** —— provider 接入存在摩擦。 |
| [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) | Bug（已关闭） | 4 | MCP 工具调用将字符串类型参数作为数字发送 —— 已在 [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) 中修复。 |
| [#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513) | Bug（开放） | 4 | DeepSeek-v4-pro 的回复与 QwenPaw 工具调用交错 —— 暗示某些模型的工具调用边界解析存在问题。 |

**潜在诉求**：用户希望获得一个**可预期、透明**的流式传输与排队模型 —— 同时适用于工具调用和人类消息，并覆盖多个 LLM provider。当前系统在某些情况下会静默丢弃、交错或硬编码上下文窗口，正在侵蚀用户信任。

---

## 5. Bug 与稳定性

### 高严重度（数据丢失/不可恢复）

- **[#7579 / #7584](https://github.com/agentscope-ai/QwenPaw/issues/7579)** —— 在 v2.2.0 桌面端（PyInstaller 后端）中**模型回复从上下文中静默丢失**。助手消息虽已写入数据库，但**未出现在后续请求中**，导致工具调用无限循环和 AI 行为异常。作者明确标注其为"非常严重"。尚无修复 PR。
- **[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)** —— "停止"按钮隐藏了进行中的任务 UI，但**服务端仍继续执行**；用户再次提交时会触发 409。尚无修复 PR。
- **[#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)** —— **`RetryChatModel.__init__` 中硬编码 32768 token 上下文**，强制对所有非默认模型返回 `CONTEXT_UNFIT (>31130)`。影响所有已发布的 v2.1.x–v2.2.0 构建。尚无修复 PR。
- **[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589)** —— 心跳 cron 会话**反馈循环/消息堆积**，导致 agent 无响应约 2 小时，需手动重启（v2.0.1，在 main 分支上已复现）。尚无修复 PR。

### 中等严重度

- **[#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363)** —— 同步调用在启动时**冻结事件循环 118–135 秒**，且每条消息再冻结约 126 秒，`timeout` 永不触发（v2.1.1b1 Desktop）。
- **[#7242](https://github.com/agentscope-ai/QwenPaw/issues/7242)** —— 单个 Docker 实例在派生 74 个 agent 时，**仪表盘加载耗时 6 分钟以上**。
- **[#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597)** —— 工具返回的图片/PDF 二进制以裸 base64（`type:"data"`）形式发送，在后续模型调用中触发 **400 "file must have file_id or file_data"**。
- **[#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541)** —— 滚动上下文压缩将 `[context compressed]` 注入为 `role=user`（应为 `system`），导致 DeepSeek 抛出 `MODEL_EXECUTION_ERROR`。
- **[#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513)** —— DeepSeek-v4-pro 工具调用/输出交错（Windows 11 桌面端，2.1.0）。
- **[#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587)** —— OpenAI 兼容 provider 在拉取 WUSRouter 模型列表时返回 Cloudflare 403。
- **[#7612](https://github.com/agentscope-ai/QwenPaw/pull/7612)** —— 内置的 `qwenpaw agents list` 等 CLI 命令**在 Hub 管理的本地沙箱内运行失败**，原因是 `RuntimeBoundaryMiddle…` 中间件。

### 低严重度 / 已修复

- **[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505)**（已关闭）—— LM Studio 局域网客户端断开；根因已定位。
- **[#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820)**（已关闭）—— UI 隐藏流式输出。
- **[#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839)**（已关闭）—— MCP 字符串作数字 ——**已由 [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) 修复**。
- **[#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604)**（已关闭）—— v2.2.0 中硬编码的 LLM 流空闲超时 —— 已关闭，推测已修复。
- **[#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588)** / **[#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)**（已关闭）—— 恢复 v2.1.0 的工作目录文本输入 —— 已关闭，修复版本推测已发布。
- **[#3328](https://github.com/agentscope-ai/QwenPaw/issues/3328)**、**[#7006](https://github.com/agentscope-ai/QwenPaw/issues/7006)**、**[#7099](https://github.com/agentscope-ai/QwenPaw/issues/7099)**、**[#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594)** —— 均为 UI/控制台小问题，全部已关闭。

**修复 PR 覆盖情况总结**：在 25 个开放 Bug Issue 中，**仅 3 个**有直接可用的 PR（#7572 → #7578；#7559 → #7610；#6839 → #6936 —— 最后一个已合并）。其余约 22 个高/中等严重度 Bug 均无关联修复 PR —— 这是维护者注意力需要关注的信号。

---

## 6. 功能请求与路线图信号

| Request | Source | Likely v2.2.1 / v2.3 candidate? |
|---|---|---|
| 恢复 v2.1.0 的文本输入式工作目录选择器 | [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588)、[#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601) | **高** —— 已关闭的 Issue 表明相关工作已完成或在推进中 |
| Telegram：自动清理中间（思考/工具）消息 | [#7586](https://github.com/agentscope-ai/QwenPaw/issues/7586) | **中** —— 与 #7585 配套 |
| 飞书：流式结束后自动折叠思考卡片 | [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) | **中** —— 作者已有可用补丁 |
| UI 字体缩放与可点击的文件路径链接 | [#4077](https://github.com/agentscope-ai/QwenPaw/issues/4077)（已关闭但未实现） | **低-中** —— 体验优化，易实现 |
| OpenViking 长期记忆后端 | [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) | **高** —— 首次贡献者 PR，正在评审 |
| 内存配置中的 Reranker UI | [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) | **中** |
| 技能版本化与市场校验 | [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) | **高** —— 与插件管理器工作互补 |
| 受保护执行 / 授权契约 | [#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526) | **中** —— 安全/语义清晰化方向 |

**下一小版本（v2.2.1）预测**：最有可能包含恢复工作目录选择器（#7588/#7601）、流空闲超时配置默认值（#7604）、工具协调器异常日志（#7572/#7578）以及 OpenViking 记忆后端（#7613）。

---

## 7. 用户反馈摘要

**反复出现的痛点**
- **"上下文丢失"/"回复丢失"的焦虑感**：[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) 和 [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) 描述了一种工作流

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目日报 — 2026-09-07

## 1. 今日概览

ZeroClaw 在 2026-09-07 当日活跃度较高，过去 24 小时内有 33 个 issue 和 50 个 PR 被触动，但尚未发布新版本。合并/关闭数量较低（3 个 issue、1 个 PR），说明当前处于重评审、重讨论阶段，而非集中合入阶段。issue 中的主导主题是一场跨越数月的架构与可靠性推进 —— 运行时持有的会话、WASM 插件运行时、append-only 事件历史、Anthropic prompt-cache 调优，以及 ACP/ZeroCode turn-loss 类 bug。多个 tracker issue（#8692、#9459、#10684、#10685）表明对大型 PR 批次的积极协调，包括 eval 工具链、bootstrap 启动器以及投递/cron 可靠性。总体而言，项目健康且繁忙，但瓶颈明显落在维护者对 RFC 与大型堆叠 PR 的决策吞吐量上。

## 2. 发布

过去 24 小时无新版本发布。最近一条仍在主动跟踪的稳定化线是 [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 中跟踪的 **v0.8.5 有限周期稳定化线**（提交通道已于 8 月 4 日冻结，该线于 2026 年 8 月 30 日结束），但它近期只有 1 条评论更新。今天没有可见的 tag 发布动作。

## 3. 项目进展

**过去 24 小时内的合并/关闭：**

- **Issue [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)**（已关闭）：关于禁用 Bedrock Nova 2 Lite `cachePoint` 的支持请求 —— 作为配置文件支持类问题予以处理。
- **Issue [#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575)**（已关闭）：已接受的功能 —— 通过 `GET /models` 而非 `GET /chat/completions` 来预热 OpenAI 兼容的 provider。对 provider 预热正确性是净改进。
- **Issue [#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572)**（已关闭）：WeCom（企业微信）channel 的文档任务。
- **PR（50 个中仅 1 个合并/关闭）** —— 着陆/开放比极低（约 2%），再次印证项目当前处于评审/堆叠阶段，而非合并阶段。

**今日取得实质进展的功能与修复：**

- **Bootstrap 基础已准备合入**：[#10590](https://github.com/zeroclaw-labs/zeroclaw/pull/10590)（规范化发布目标注册表 `zeroclaw-dist`）以及堆叠其上的 [#10591](https://github.com/zeroclaw-labs/zeroclaw/pull/10591)（MCP 启动器 `zeroclaw-bootstrap`） —— 由 tracker [#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684) 统一协调。
- **可靠性批（tracker [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685)）**：[#10599](https://github.com/zeroclaw-labs/zeroclaw/pull/10599) 记录周期性 cron 任务的未执行情况，让静默失败变得可见；[#10600](https://github.com/zeroclaw-labs/zeroclaw/pull/10600) 阻止 channel 层的误报"发送成功"；[#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604) 发送 `x-opencode-session`，以在多轮之间保持上游 prompt cache 的热度。
- **UX 改进**：[#10578](https://github.com/zeroclaw-labs/zeroclaw/pull/10578)（web composer 中的 `/upload` 斜杠命令）、[#10589](https://github.com/zeroclaw-labs/zeroclaw/pull/10589)（将 `multimodal.max_image_size_mb` 默认值由 5 MiB 提高到 20 MiB，避免支持的图片被静默丢弃）、[#10543](https://github.com/zeroclaw-labs/zeroclaw/pull/10543)（移除 ZeroCode 中已死的 `sop-authoring` 功能）。
- **运行时权威**：[#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621)（XL，风险：high）将 agent 生命周期变更统一收口到一个共享的 live-config 权威，覆盖 daemon RPC、gateway、各 channel、ACP admission 与 CLI —— 是一项基础性重构。
- **Eval 平台栈**（IftekharUddin 的多个堆叠 XL PR）：[#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214)、[#9217](https://github.com/zeroclaw-labs/zeroclaw/pull/9217)、[#9219](https://github.com/zeroclaw-labs/zeroclaw/pull/9219)、[#9220](https://github.com/zeroclaw-labs/zeroclaw/pull/9220)、[#9221](https://github.com/zeroclaw-labs/zeroclaw/pull/9221)、[#9222](https://github.com/zeroclaw-labs/zeroclaw/pull/9222)、[#9245](https://github.com/zeroclaw-labs/zeroclaw/pull/9245) —— 异步 Grader、live execution 模式、运行回执、baseline、回归门禁、LLM-judge 评分器以及 judge 校准工具。

## 4. 社区热门话题

| Item | Title | Comments | Signal |
|---|---|---|---|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC: Runtime-owned conversation sessions and transport surface adapters (Rev. 5) | 34 | 讨论热度最高的一条。其底层诉求：将会话生命周期与 transport 干净解耦，使任何 channel（ACP、ZeroCode、web、聊天应用）都能接入同一个运行时而不泄漏 surface 特有的语义。 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC: Unified file and attachment architecture for conversation surfaces (Rev. 10) | 27 | 与 #9487 配对。需求：在 web composer、ACP、ZeroCode、各聊天 channel 之间建立统一的文件/附件模型 —— 当前是割裂的。 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC: Granular sandbox policy — filesystem restrictions | 25 | 需求：将应用层路径许可与 OS 级沙盒（ Bubblewrap、Landlock、Seatbelt）对齐，并通过 agent 风险配置文件来表达 workspace/路径限制。 |
| [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | 74 test failures on Windows | 19 | 长期存在的 CI 缺口：仅 Linux 的测试任务掩盖了 Windows 上的回归（路径语义、控制台编码 936）。 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Tracker: Maintainer decision queue for RFCs and design issues | 15 | 元 thread，表明 RFC 流水线本身已经拥堵，需要明确的决策节奏。 |
| [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720) | Bedrock Nova 2 Lite cachePoint disabling | 12（已关闭） | 运维人员对 provider cache 标记与 Bedrock 错误模式的真实摩擦。 |
| [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) | RFC: Composable WASM plugin runtime architecture | 10 | 需求：提供类型化、可替换的扩展点，避免 WASM 运行时围绕单一 provider 形态僵化。 |

**规律：** 七项最受关注的条目中有四项是由 `NiuBlibing` 发起的架构 RFC（常常与 Codex 共同起草），全部被 `needs-maintainer-review` 卡住。社区在 **运行时持有的会话、附件、插件面、sandbox 策略** 上集中发力，而 tracker 类 issue 则显示项目的瓶颈是维护者的决策节奏 —— 参见 [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)（RFC 流程简化：取消强制讨论窗口，让 REVISE 直接停止当前快照）。

## 5. Bug 与稳定性

**已报告或正在处理的 P1 / S0–S1（最高严重度）：**

1. **[#10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)** —— *S0 数据丢失/安全风险。* 若进程在完成前退出，部分 Code/ACP turn 会消失。**今日尚未关联修复 PR。**
2. **[#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** —— *S1 工作流阻塞。* 在从 ZeroCode 应用 Quickstart 配置时，agent 初始化过程中 daemon 启动/重载会发生栈溢出。需要复现。
3. **[#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** —— *S1。* 切换会话后失败的 ACP turn 会消失。**今日尚未关联修复 PR。**
4. **[#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** —— *S1。* Cron agent 任务没有 wall-clock 超时；in-flight 锁仅在进程启动时清理。**今日尚未关联修复 PR。**
5. **[#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)** —— *S1。* 预算超限的 Code turn 在会话恢复后丢失可见进度。**今日尚未关联修复 PR。**
6. **[#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)** —— *S1。* `heartbeat.target` 拒绝 channel 实例的复合 key（`<type>.<alias>`），导致非默认实例无法被路由。
7. **[#9940](https://github.com/zeroclaw-labs/zeroclaw/issues/9940)** —— *S2。* turn-context 将 agent 引导到一个无法解析的 cron 投递 channel，而投递默认值重复了同样的错误。
8. **[#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)** —— *S2。* 工具结果截断在模型上下文之外不可见（日志/UI 没有反映出 `[... N characters ...]` 的截断）。
9. **[#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)** —— *S2。* 在活跃 turn 期间收到第二条消息会在同一会话中启动并行执行 → 重复工作与重复回复。**今日尚未关联修复 PR。**
10. **[#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** —— *S2。* Windows 上 74 个测试失败（仅 Unix 的测试命令、路径语义、代码页 936）。CI 仅覆盖 Linux。

**已进入 PR 评审的可靠性修复（尚未合并）：**

- [#10600](https://github.com/zeroclaw-labs/zeroclaw/pull/10600) —— channel 上的虚假"发送成功"。
- [#10599](https://github.com/zeroclaw-labs/zeroclaw/pull/10599) —— cron 静默未执行。
- [#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604) —— 缺失的 `x-opencode-session` header。
- [#10241](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) —— 恢复被监管 shell 的审批路由（状态：blocked，等待维护者解除阻塞）。

**进行中的可观测性/安全加固：** [#10606](https://github.com/zeroclaw-labs/zeroclaw/issues/10606) 在未鉴权的 `/health` 响应中清洗组件错误；[#10644](https://github.com/zeroclaw-labs/zeroclaw/issues/10644) 将后台 delegate 结果绑定到一个 owner principal（#10601 的后续）。

**稳定性趋势：** 多个 S0/S1 issue 没有关联的修复 PR，主要集中在 ACP/ZeroCode turn-loss 这一族。趋势是 *已知并通过 tracker（#10685、#10674）在推进*，但今天尚未合入任何修复。

## 6. 功能请求与路线图信号

**与下一条稳定化线高度相关：**

- **Anthropic cache 调优**（PR/Issue #10660、#10662、#10663） —— 在 turn 边界设置第三个 cache 断点、低于 cache 下限的 OAuth prefix marker，以及一个可配置的 1 小时 prompt-cache TTL。全部来自 `Audacity88`，全部于 2026-09-06/07 开启。强烈信号表明它们会作为一个"Anthropic cache 正确性"批次一起合入。
- **可靠的投递 + cron 结果** [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685) —— 实现批次 tracker，把虚假发送成功、重复回复、cron 结果、投递默认值等 bug 串起来。已有四项以 PR 形式提交。
- **Bootstrap 启动器** [#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684) —— 用于 Claude Code / Codex 主机的 `zeroclaw-dist` 注册表 + MCP 启动器。
- **历史裁剪 + prompt 缓存** [#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674) —— 修复裁剪边界，避免工具密集型会话每隔几轮就重新裁剪而击穿缓存。
- **Eval 平台** —— IftekharUddin 的 eval 栈（7 个堆叠 PR）是评审中最大的功能面，一旦原生栈合并，很可能作为一个统一能力落地。
- **ZeroCode 中的推理控制** [#10636](https://github.com/zeroclaw-labs/zeroclaw/pull/10636) —— 用于自适应思考的 effort 与展示会话控制；堆叠在 #10611 之上。
- **Channel 文档** [#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572)（已关闭） —— WeCom/企业微信文档终于补齐。

**等待维护者决策的架构 RFC（可预测的下一版候选）：** [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)（运行时持有的会话）、[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)（统一附件）、[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)（细粒度 sandbox）、[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)（WASM 插件运行时）、[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)（append-only 事件历史，在 #10076 修订之后成为唯一权威）。

## 7. 用户反馈摘要

**运维痛点（在 issue 中反复出现）：**

- **虚假投递/静默失败** 是最常见的运维抱怨：agent 告诉人类它已通知对方，但实际并没有（PR #10600）；cron 任务消失且无任何记录（#9191、#10599）；channel 发送成功返回 true，但实际什么也没发（#10600）。Tracker #10685 就是对这一簇问题的明确回应。
- **Anthropic cache 行为** 对运维而言脆弱且不透明 —— 五分钟 TTL 默认值、低于 cache 下限的 OAuth prefix marker、仅两个断点、没有可观察的截断（[#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660)、[#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)、[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)、[#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)）。运维人员被迫要么接受默认，要么手动改 provider 代码路径。
- **Bedrock provider 意外行为**（[#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)，已关闭） —— 目前 Nova 2 Lite 的缓存错误不可配置。
- **Cron 投递 channel 命名**（[#9940](https://github.com/zeroclaw-labs/zeroclaw/issues/9940)、[#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)） —— 运行时告诉 agent 去使用无法解析的 channel alias，而 `heartbeat.target` 又拒绝投递路径自身所要求的复合 key。
- **ACP / Code turn 丢失**（[#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)、[#10121](https://github.com/zeroclaw-labs/zeroclaw

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*