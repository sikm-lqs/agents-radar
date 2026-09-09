# OpenClaw 生态日报 2026-09-09

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-09 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-09

## 1. 今日概览

OpenClaw 今天异常活跃：**500 个 Issue 更新（283 开放，217 已关闭）**、**500 个 PR 更新（286 开放，214 已合并/关闭）**，并发布了一个新版本（`v2026.9.3`）。该版本聚焦于更安全的更新流程，加上异常高的关闭率（Issue 约 43%，PR 约 43%），表明维护者正在进行一轮激进的分类清理 —— 很可能是针对 2026.9.x 系列回归问题的稳定化推进。主导议题包括：(a) Codex/OAuth 提供方可靠性；(b) Windows、npm 以及核心/插件版本错位下的更新/安装路径脆弱性；(c) 多代理与嵌入式运行时的资源管理缺陷；(d) 内存子系统索引/召回回归。相当比例的 Issue 带有 P0/P1 优先级和影响安全或数据丢失的标签，说明项目健康度承压，但正在积极维护中。

---

## 2. 版本发布

### v2026.9.3 — 更安全的更新
- **亮点**：核心与插件变更在激活前先在隔离的候选状态中演练；支持从 2026.9.2 的合规迁移；可恢复被搁置的更新记录且不中断健康的 Gateway。
- **参考**：#138839、#141109、#141175、#1415xx（片段中部分可见）。
- **迁移说明**：运行 2026.9.2 的运维者应可自动获得候选状态演练。Windows de-DE 安装环境被特别指出仍会遗留 Doctor 维护阻塞（参见 #136203），可能需要额外的手动步骤。
- **风险**：提升了核心/插件版本错位问题（例如 #135776）的安全性，但并未直接修复它们。

---

## 3. 项目进展

**已合并/关闭动态（PR 列表精选）：**

| PR | 标题 | 影响 |
|---|---|---|
| [#143063](https://github.com/openclaw/openclaw/pull/143063) | refactor(build): simplify package import path resolution | 代码库健康度 |
| [#143059](https://github.com/openclaw/openclaw/pull/143059) | refactor(tests): remove duplicate warm chat metadata scenario | 测试清理 |

**通过已就绪 PR（开放但成熟）推进的高级特性与修复：**
- [#142933](https://github.com/openclaw/openclaw/pull/142933) — **feat(auth): import declared credentials during provider login**（XL，codex/openai，P2；待评审）。在 API-key 登录时复用现有 Codex key —— 直接缓解反复粘贴密钥的体验摩擦。
- [#143006](https://github.com/openclaw/openclaw/pull/143006) — **fix(discord): restore OpenClaw delegation from guild messages**（P1，已就绪）。修复来自 guild 消息的委派失败（关联 #142922）。
- [#143060](https://github.com/openclaw/openclaw/pull/143060) — **fix(agents): keep prepared music jobs alive through provider cleanup**（XL，P2，已就绪）。解决 music tool 的资源泄漏。
- [#142668](https://github.com/openclaw/openclaw/pull/142668) — **feat(doctor): diagnose Tailscale mobile pairing readiness**（XL，P2，已就绪）。关闭 #142531 —— 移动部署的运维体验提升。
- [#142626](https://github.com/openclaw/openclaw/pull/142626) — **fix(imessage): restore feedback after bridge recovery**（P2，已开启 automerge）。关闭 #142603。
- [#142810](https://github.com/openclaw/openclaw/pull/142810) — **fix(android): restore completed tool activity in chat**（XL，P2，含截图证据）。关闭 #142805 —— Android/Web 体验对齐。
- [#141570](https://github.com/openclaw/openclaw/pull/141570) — **fix(ui): reduce repeated session-list reads during sustained activity**（M，P2，已就绪）。性能修复。
- [#142693](https://github.com/openclaw/openclaw/pull/142693) — **fix: continue memory recall after optional trigger lookup times out**（S，P2）。关闭 #142479。

**值得关注的特性新增：**
- [#143068](https://github.com/openclaw/openclaw/pull/143068) 与 [#143069](https://github.com/openclaw/openclaw/pull/143069) — 在 OpenAI provider 与 fal 集成中加入 **GPT Image 2.5（Flare/Sunburst）变体**。
- [#142740](https://github.com/openclaw/openclaw/pull/142740) — **feat(dictation): standalone OpenAI-compatible STT add-on**（从 #142706 拆分）。可选的、与实时 Talk 解耦的 STT。
- [#88504](https://github.com/openclaw/openclaw/pull/88504) — **feat(memory): add multi-slot memory role architecture**（XL，P2，showcase）。实质性重写单一拥有者的 memory slot，使其独立支持事实性召回 / 自动捕获 / 压缩等职责。

---

## 4. 社区热门话题（评论数最多）

| # | 标题 | 评论数 | 分析 |
|---|---|---|---|
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | Intermittent "Provider completed tool call with malformed JSON arguments" on v2026.8.1 (claude-sonnet-5) | 23 | **已关闭。** 一个长期存在的回归讨论 —— 用户对*为何关闭却无公开根因说明*有强烈关注；需要补一篇事后总结，否则用户信任将持续受损。 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | OpenClaw leaks unreaped hook/tool child processes → zombie accumulation | 16 | **开放，P1。** 长期存在的内存与运行时退化问题；自 6 月以来无关联修复 PR。底层诉求：agent/hook 执行需要可靠的过程监管原语。 |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | Multi-agent orchestration unstable: concurrent add/config overwrites, session-lock failures | 14 | **开放，P1。** 多代理核心可靠性。已有关联 PR（clawsweeper:linked-pr-open）。底层诉求：`agents add` 与 detached 工作流需要一等并发模型。 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Synchronous agent persistence blocks Gateway event loop at scale | 14 | **开放，P1。** 已有部分修复（#140231、#138984）—— 有实质进展，但仍是首要关切。诉求：异步持久化路径。 |
| [#137927](https://github.com/openclaw/openclaw/issues/137927) | Internal context block leaks into visible Telegram text | 13 | **已关闭。** 安全相关（内部脚手架泄漏）。诉求：加入回归测试，断言内部 block 永不外发。 |
| [#85251](https://github.com/openclaw/openclaw/issues/85251) | Codex app-server emits turn/started then silent → wedges embedded run | 13 | **开放，P1。** 长期存在的卡顿会话问题；"needs-product-decision" 标签暗示需要运行时行为变更。 |
| [#41201](https://github.com/openclaw/openclaw/issues/41201) | Control UI Avatar not displaying (broken image) | 12 | **开放，P2 回归。** 长期存在的 UX 回归。 |

**社区底层诉求：***可靠性和可预期性*占据主导。前 7 个中有 5 个是与特定发布边界（8.1 / 8.2 / 9.2）绑定的可靠性回归。用户要么希望减少破坏性变更的覆盖面，要么希望升级时提供更好的防护。

---

## 5. Bug 与稳定性（今日报告的 Bug，按严重程度排序）

### P0 — 发布阻断 / 安全边界
- [#89278](https://github.com/openclaw/openclaw/issues/89278) — Codex OAuth refresh succeeds but cron/heartbeat fail with 10s auth refresh timeout。标记 `ux-release-blocker`。已有关联 PR 开放。
- [#136203](https://github.com/openclaw/openclaw/issues/136203) — Windows de-DE 2026.8.2 upgrade leaves Doctor maintenance blocked and legacy workspace state behind。`ux-release-blocker`。
- [#115642](https://github.com/openclaw/openclaw/issues/115642) — Billing cooldown outlives outage on subscription auth (5h fixed window)。需要基于探针的恢复 + 手动重置。`ux-release-blocker`。
- [#141617](https://github.com/openclaw/openclaw/issues/141617) — 2026.9.2 npm update remains stuck at requested/running after supported repair。**无关联修复 PR。**

### P1 — 高影响回归
- [#142037](https://github.com/openclaw/openclaw/issues/142037) — Embedded runtime records explicit-route message-tool replies as "mute" on v2026.9.2 → Slack top-level threads misroute。**无修复 PR。**
- [#141252](https://github.com/openclaw/openclaw/issues/141252) — 2026.9.2 regression: reply runs fail with "Reply operation has no active tool authority snapshot"。Fallback chain 误触发。**无修复 PR。**
- [#135704](https://github.com/openclaw/openclaw/issues/135704) — iMessage reflections with reply_to_guid bypass echo cache。**无修复 PR。**
- [#140971](https://github.com/openclaw/openclaw/issues/140971) — All Feishu plugin tools silently dropped in message-driven runs (regression 2026.7→2026.8)。**无修复 PR。**
- [#138342](https://github.com/openclaw/openclaw/issues/138342) — Official Discord plugin rejected by openKeyedStore trust check in 2026.9.1。**无修复 PR。**
- [#142336](https://github.com/openclaw/openclaw/issues/142336) — Core `/dashboard` shadows Telegram Mini App launcher (2026.9.2+)。**无修复 PR。**
- [#140455](https://github.com/openclaw/openclaw/issues/140455) — google-meet 2026.9.2: agent voice broken (circular-JSON in-call crash)。**无修复 PR。**
- [#127148](https://github.com/openclaw/openclaw/issues/127148) — Codex sessions.compact acquires second app-server, hits active-writer conflict。**无修复 PR。**
- [#125570](https://github.com/openclaw/openclaw/issues/125570) — Skill Workshop update apply overwrites live skill description, silently breaks skill routing。**无修复 PR。**
- [#136311](https://github.com/openclaw/openclaw/issues/136311) — memory-core: Gateway reacquires reindex lock on every start → 19 GB orphaned temp DBs。**无修复 PR。**
- [#112160](https://github.com/openclaw/openclaw/issues/112160) — SSH sandbox does not stage inbound media into existing remote workspace。**无修复 PR。**
- [#94716](https://github.com/openclaw/openclaw/issues/94716) — Anthropic claude-cli provider sends stale user-agent → bearer auth fails。**无修复 PR。**
- [#126906](https://github.com/openclaw/openclaw/issues/126906) — Denying write tool silently disables memory persistence; agent reports success anyway。安全/UX。**无修复 PR。**
- [#115367](https://github.com/openclaw/openclaw/issues/115367) — Provider-owned read gate requires `origin: bundled`; external chat plugins locked to current conversation。安全/架构。**无修复 PR。**
- [#88757](https://github.com/openclaw/openclaw/issues/88757) — Proactive messages invisible in session context → desync。**无修复 PR。**
- [#142549](https://github.com/openclaw/openclaw/issues/142549) — Messages duplicated 3-4 times in chat UI。UX 摩擦。**无修复 PR。**

### P2 — 值得注意的回归
- [#142479](https://github.com/openclaw/openclaw/issues/142479) — Memory recall skipped on optional trigger lookup timeout。**已有修复 PR：** [#142693](https://github.com/openclaw/openclaw/pull/142693)。
- [#139710](https://github.com/openclaw/openclaw/issues/139710) — Mid-turn plugin-generation supersede kills system-agent turn + planner fallback。**无修复 PR。**
- [#99925](https://github.com/openclaw/openclaw/issues/99925) — WebChat new session loses prior context (AI "blind")。**无修复 PR。**
- [#141747](https://github.com/openclaw/openclaw/issues/141747) — Runtime `<system-reminder>` injects ~686 tokens/turn with no opt-out。成本/UX。**无修复 PR。**

### 今日已关闭（已解决）
- [#135111](https://github.com/openclaw/openclaw/issues/135111) — malformed JSON arguments regression。
- [#137927](https://github.com/openclaw/openclaw/issues/137927) — internal context leak to Telegram。
- [#142530](https://github.com/openclaw/openclaw/issues/142530) — Telegram animated/video stickers arrive empty。
- [#141694](https://github.com/openclaw/openclaw/issues/141694) — Silent-fallback reply hardcodes wrong provider name。
- [#116851](https://github.com/openclaw/openclaw/issues/116851) — Beta blocker: Codex final replies lost for canonical SQLite sessions（已有关联 PR）。
- [#95121](https://github.com/openclaw/openclaw/issues/95121) — Codex/OAuth turns ~28s regression on 2026.6.8。
- [#87109](https://github.com/openclaw/openclaw/issues/87109) — Gateway heap growth to 1073MB+ at idle。

**稳定性评估：** 发布阻断 / P1 列表仍然较长（15+ 开放，均无确认合并 ETA）。发布管线似乎跑在缺陷修复覆盖之前，若 2026.9.3 在待清理的 P0/P1 积压消化之前落地，将构成项目健康度风险。

---

## 6. 功能请求与路线图信号

- **Multi-slot memory architecture**（[#88504](https://github.com/openclaw/openclaw/pull/88504)）—— 已是一个实质性开放 PR，标记为 `showcase`。有可能是 2026.10 / 2026.Q4 的候选；响应了关于单一独占 memory owner 的反复投诉。
- **GPT Image 2.5 variant support**（[#143068](https://github.com/openclaw/openclaw/pull/143068)、[#143069](https://github.com/openclaw/openclaw/pull/143069)）—— 均已就绪；合理可在 2026.9.4 或 2026.10 落地。
- **Standalone dictation (STT) add-on**（[#142740](https://github.com/openclaw/openclaw/pull/142740)）—— 可选，与实时 Talk 解耦。适合下一个 minor 版本。
- **Tailscale mobile pairing Doctor check**（[#142668](https://github.com/openclaw/openclaw/pull/142668)）—— 已就绪；适合下一个 patch 版本。
- **WhatsApp phone-code login**（[#85866](https://github.com/openclaw/openclaw/pull/85866)）—— 长期开放（5 月起），已提供证据但状态为 `needs proof`。说明被列为优先但尚未落地。
- **Cyclic `sessions_send` loop protection**（[#94594](https://github.com/openclaw/openclaw/pull/94594)）—— gateway 协议 schema 变更；存在安全边界风险。可能需要专门的评审窗口。
- **Skill Workshop description-preservation fix** —— 由 [#125570](https://github.com/openclaw/openclaw/issues/125570) 暗示但尚无 PR；预计在 2026.9.x 系列中出现修复。
- **Cursor activity scroll-boundary consolidation**（[#139120](https://github.com/openclaw/openclaw/pull/139120)）—— UX 打磨；P2。
- **Heartbeat-only-when-file-exists**（[#83143](https://github.com/openclaw/openclaw/issues/83143)）—— 低成本的 prompt 节省项；尽管有 👍 反应，仍无修复 PR。
- **Recipient-addressed outbound sends**（[#110872](https://github.com/openclaw/openclaw/issues/110872)）—— 已关闭但标记 `off-meta tidepool`；概念上对安全有吸引力，短期不会落地。
- **Android chat-first surface**（[#46058](https://github.com/openclaw/openclaw/issues/46058)）—— 探索性；不在近期路线图内。
- **Skip HEARTBEAT prompt when file missing**（[#83143](https://github.com/openclaw/openclaw/issues/83143)）—— 简单的胜利项，尚无 PR。

**下一版本（预计 2026.9.4 / 2026.10）预测：** Tailscale Doctor 检查、GPT Image 2.5、dictation 插件、至少一个凭据导入流程，以及*希望是*一波来自当前积压的 P0/P1 可靠性修复。

---

## 7. 用户反馈摘要

**反复出现的痛点：**
1. **更新脆弱性。** 多位生产用户（例如 #123799、#141617、#136203）描述在 npm 升级后需要进行手动恢复。2026.9.3 版本是对此的直接回应 —— 社区将根据 v2026.9.3 的候选状态演练在实践中是否真正有效来评判。
2. **Codex/OAuth 不稳定。** 跨多个维度：超时（[#89278](https://github.com/openclaw/openclaw/issues/89278)）、静默 turn（[#85251](https://github.com/openclaw/openclaw/issues/85251)）、compaction 冲突（[#127148](https://github.com/openclaw/openclaw/issues/127148)）、过期 profile（[#91352](https://github.com/openclaw/openclaw/issues/91352)）。综合来看，Codex 集成是运维不满的最大单一来源。
3. **"Silent success /

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / Agent 开源生态
**快照日期：2026-09-09** | 项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

开源个人 AI 助手领域呈两极分化：**规模化玩家**（OpenClaw、Hermes Agent）在庞大的集成面上管理大量回归积压；而**架构导向的挑战者**（ZeroClaw、IronClaw）在功能规模化之前优先投入治理、隔离与运行时设计。QwenPaw 居于独特的中间位置，将严谨的发布节奏与快速当日分诊相结合。五个项目都反复出现相同的技术难题——上下文预算、Provider 漂移、升级安全性与多用户隔离——说明尽管架构分化，该品类已收敛于同一组核心问题。值得注意的是，**成本可观测性与更新可靠性已取代原始能力成为用户首要痛点**，这清晰表明生态正从早期采用阶段过渡到生产运营阶段。

---

## 2. 活跃度对比

*健康度评分：分诊响应度、发布纪律性、未解决 P0/P1 负载、社区广度与审阅吞吐量的综合指标（单日快照，仅作方向性参考）。*

| 项目 | Issues（24h） | PRs（24h） | 发布状态 | 关闭率（Issues/PRs） | 健康度 | 关键风险 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 500（283 open / 217 closed） | 500（286 open / 214 closed） | ✅ v2026.9.3 已发布 | 43% / 43% | **6.5/10** | 15+ 未关闭 P0/P1，多无修复 PR；发布节奏跑赢修 bug 节奏 |
| **Hermes Agent** | 50（26 closed） | 50（9 closed） | ❌ 无发布；5+ 已合并修复未打包 | 52% / 18% | **7.0/10** | P0 `state.db` 损坏；修复在无 tag 情况下触达不到用户 |
| **IronClaw** | 2 | 11（5 closed） | ❌ 无发布 | 0% / 45% | **6.0/10** | 单一贡献者集中度（10/13 条目）；#6778 中凭据泄漏问题未完全解决 |
| **QwenPaw** | 20（11 closed） | 34（9 closed） | ✅ v2.2.1-beta.1（已迭代至 2.2.1b2） | 55% / 26% | **8.5/10** | 两个高严重度 Bug 未修复（#7579 上下文丢失、#7633 静默回滚） |
| **ZeroClaw** | 37（3 closed） | 50（1 closed、0 merged） | ❌ 无发布（当前 v0.8.5） | 8% / 2% | **7.0/10** | 审阅带宽瓶颈（merge-to-open 为 1:49）；两个 P1 无修复 PR |

**社区规模代理**（累计追踪器编号）：OpenClaw ~143K PRs » Hermes ~106K issues » ZeroClaw ~10.7K » IronClaw ~8.1K » QwenPaw ~7.6K。OpenClaw 与 Hermes 的社区规模比其他项目高出一个数量级。

---

## 3. OpenClaw 的定位

**相对优势：**
- **集成广度无可匹敌。** Telegram、Discord、iMessage、飞书、WhatsApp、Google Meet 语音、Android/Web——无任何对标项目覆盖此渠道矩阵（QwenPaw 以 QQ 为中心；ZeroClaw 覆盖 Telegram/Discord；Hermes 有 Telegram/企业微信）。
- **发版速度 + 安全更新工程。** v2026.9.3 的候选态预演（在激活前隔离预演 core/plugin 变更）是针对更新脆弱性问题的差异化解决方案，而 Hermes 和 QwenPaw 仍依赖常规打补丁方式。
- **最深的功能面：** 多槽位记忆架构（#88504）、Doctor 诊断子系统、独立 STT、率先支持 GPT Image 2.5 变体。

**相对劣势：**
- **队列中回归与发布比最差。** QwenPaw 可当日关闭报告的 issue；OpenClaw 背负 15+ 未关闭 P0/P1，多无修复 PR，且最高评论数的 bug（#135111）关闭时未公开根因。
- **Codex/OAuth 是单一最大不满集群**，涵盖超时、静默回合与压缩冲突——而 Hermes 在更小表面上以同等强度管理着 Provider 可靠性问题。
- 对标项目在架构上更为严谨：ZeroClaw 的 RFC 驱动沙箱/文件系统隔离和 IronClaw 的按调用者隔离，都超出 OpenClaw 当前队列中可见的任何设计。

**社区规模：** 日均追踪器量为任何对标项目的 ~5–10×，也是唯一社区参与（23 条评论的置顶帖）呈现广度而非集中于少数维护者的项目。这是 OpenClaw 的护城河——也是它的压力测试。

---

## 4. 共享技术焦点领域

| 焦点领域 | 涉及项目 | 具体证据 |
|---|---|---|
| **上下文/Token 预算与压缩** | **全部 5 个** | OpenClaw #141747（686 tokens/turn system-reminder）、记忆召回回归；Hermes #106338（1M token 窗口下压缩从不触发）；ZeroClaw #9535（窗口比例锚定）；QwenPaw #7628（压缩超出 Provider 预算）；IronClaw #8087（上下文上限覆写）、#8082（PDF 指针模式，约 25k tokens/文档） |
| **成本可观测性** | 4（除 QwenPaw 外） | ZeroClaw：三起并发成本账本故障（#9816、#10699、#10700）；Hermes：成本已成首要痛点；OpenClaw：不可关闭的 token 注入 |
| **Provider 适配器漂移** | 4（除 IronClaw 外） | OpenClaw：Codex/OAuth 集群；Hermes：Copilot、Mistral、OpenRouter、GPT-5 Responses、OpenCode Zen；ZeroClaw：Anthropic 缓存定价/TTL；QwenPaw：llama.cpp 版本误解析（#7633） |
| **更新/升级安全性** | 3 | OpenClaw：整个 v2026.9.3 发布；Hermes：托管 Node 升级路径、更新时区域设置重置；QwenPaw：2.1→2.2 回归（弹窗样式、丢失路径字段） |
| **多 Agent / 多租户并发** | 4 | OpenClaw #43367（并发 `agents add` 互相覆盖）；IronClaw #6778/#8090（按调用者目录键控）；ZeroClaw 沙箱策略 RFC #6996 + A2A；Hermes profile/cron 治理 |
| **MCP 可靠性** | 4 | IronClaw（核心焦点，SEP-414）；Hermes #84772（工具可发现但未注册到调度）+ MCP SDK 2.1.1；QwenPaw #7649（可配置超时）、#7650（渠道元数据透传）；ZeroClaw WASM 插件运行时 RFC |
| **移动端 / 伴生端一致性** | 3 | QwenPaw（移动优先集群 #7177/#7378）；OpenClaw（Android/Web 一致性 #142810、Tailscale 移动配对）；Hermes（Desktop 回归） |

---

## 5. 差异化分析

| 项目 | 功能重心 | 目标用户 | 架构 |
|---|---|---|---|
| **OpenClaw** | 常驻多渠道助手；记忆子系统；图像/STT 扩展 | 在聊天平台上运行持久化 Agent 的进阶用户 | Gateway + 插件模型、Doctor 诊断、候选态更新预演 |
| **Hermes Agent** | CLI/Desktop 优先 Agent；profile、cron 治理、本地模型支持（llama.cpp、Ollama） | 在本地/低成本模型上自托管的开发者；Nous 生态 | Desktop 后端 + CLI 一致性、`state.db` 会话存储、Provider 适配层 |
| **IronClaw** | 多租户托管 MCP 隔离；运维体感 | 运行共享/多主体的部署的运维者 | Rust、捆绑扩展包、按调用者命名空间、SEP-414 归因 |
| **QwenPaw** | 精致的 Web Console；应用市场、技能版本管理；QQ 渠道深度 | 希望获得托管 UI 化 Agent 部署的用户（中国市场偏重） | Console + 插件生态、Expo/RN 移动端推进、测试覆盖率治理（+5pp） |
| **ZeroClaw** | 运行时架构、沙箱安全、A2A 协议、WASM 插件 | 架构师与安全导向的构建者 | RFC 治理的运行时重构；细粒度 FS 沙箱（Bubblewrap/Landlock/Seatbelt） |

**最鲜明对比：** OpenClaw 优化 *广度优先*（先发渠道/功能、后分诊）；ZeroClaw 优化 *正确性优先*（49 个 open PR、近乎零合并、重 RFC 修订）。IronClaw 是唯一将多用户隔离视为主要设计约束而非 bug 类目的项目。

---

## 6. 社区动能与成熟度

- **Tier 1 — 大规模、高承压：** **OpenClaw**（500/500 日均条目）。激进的清理分诊（约 43% 关闭率）维护健康度，但发布流水线跑赢 bug 修复覆盖。
- **Tier 2 — 高活跃度、方向分化：** **Hermes**（50/50）正在 *稳定化*——有意识偿还技术债，但修复积压未打包。**ZeroClaw**（37/50）正在 *整合*——RFC 修订与治理简化暗示着 0.9 之前的架构冻结。
- **Tier 3 — 快速、健康迭代：** **QwenPaw**（20/34）是队列中速度—稳定性比最优者：Beta 节奏、当日关闭、可量化的质量投入（覆盖率 64.4%→69.4%）。
- **Tier 4 — 聚焦小众：** **IronClaw**（2/11）呈现一致的单一作者设计动能，但社区参与近乎为零（项目内仅 2 条评论），巴士因子风险极高。

**趋势判断：** QwenPaw 的信任积累最快；ZeroClaw 的瓶颈是审阅带宽而非想法；OpenClaw 下一发布周期（P0/P1 燃烧 vs. 功能落地）将决定规模究竟是资产还是负担。

---

## 7. 趋势信号

1. **成本核算正在成为一等子系统。** ZeroClaw 的三连成本账本故障与 Hermes 的成本痛点表明用户现在按对话、按缓存写入审计支出。*价值：尽早构建账本正确性与预算上限；事后补建是信任修复工程。*
2. **更新安全是竞争性功能，而非管道工程。** OpenClaw 整个发布周期投入于此；Hermes 与 QwenPaw 用户在同一周遭遇升级回归。*价值：隔离的预演/回滚路径可显著降低运维流失。*
3. **静默失败是信任的头号杀手。** 拒绝写入却报告成功（OpenClaw #126906）、静默运行时回滚（QwenPaw #7633）、$0.00 支出上报（ZeroClaw）、已取消却仍在运行的执行器（Hermes #106179）。*价值：显式的状态确认优于乐观上报。*
4. **Provider 漂移是永久税。** 五个项目中有四个今天在与 Provider API 回归作战（GPT-5 Responses 参数拒绝、Mistral 填充、Anthropic 缓存定价、llama.cpp 版本管理）。*价值：投入适配器隔离与逐 Provider 的契约测试。*
5. **多租户从边缘场景走向核心需求。** IronClaw 为此而设计；OpenClaw 与 ZeroClaw 正为缺乏它付出代价。*价值：按主体键控与归因应从第一天就写入数据模型。*
6. **上下文经济学驱动架构。** 每个项目都触及 token 预算——窗口比例压缩、指针模式附件、多槽位记忆。*价值：记忆与附件设计应以 tokens-per-turn 而非仅功能维度衡量。*
7. **治理在大规模下涌现。** ZeroClaw 的 RFC 投票简化（#10549）表明一旦贡献者规模增长，重流程会被精简。*价值：轻量级决策队列比正式 RFC 窗口更长寿。*

---
*方法论说明：单日快照；关闭率与健康度评分为方向性指标。累计追踪器编号用作社区规模代理。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-09

## 1. 今日概览

Hermes Agent 今天变动量极高,**过去 24 小时内共有 100 项追踪条目更新**(50 个 issue、50 个 PR),且**无新版本发布**。仓库目前处于密集的 Bug 稳定阶段:更新的 issue 中约 50% 已关闭(26/50),围绕会话状态、网关取消、Desktop 推理块泄漏以及 `state.db` 损坏等多个长期存在的 P0/P1 缺陷已得到分诊或修复。未完成的工作主要由 Desktop/CLI 回归、定时任务治理以及提供商兼容性补丁(Copilot、Mistral、OpenRouter、GPT-5 Responses、OpenCode Zen)主导。今日 PR 中大量的独立 Bug ID、后续回滚以及 `sweeper:risk-*` 标签表明维护者正在主动偿还技术债,而非发布新功能。

## 2. 版本发布

**过去 24 小时内无新版本发布。** Issue 中提及的最近已发布版本为 v0.20.6(Copilot 回归基线,[#96925](https://github.com/NousResearch/hermes-agent/issues/96925))、v0.21.0/v0.21.1(Desktop 更新路径,[#105465](https://github.com/NousResearch/hermes-agent/issues/105465))以及 v0.21.1(OpenCode Zen 请求头,[#106495](https://github.com/NousResearch/hermes-agent/issues/106495))。今天合并的多个修复(PR #63800、#73992、#101723、#104535、#106478)尚未打包进任何已标记的版本。

## 3. 项目进展

今日已关闭/已合并的 PR(50 个活跃 PR 中关闭 9 个):

- [#63800](https://github.com/NousResearch/hermes-agent/pull/63800) — **fix(auxiliary): 省略 GPT-5 Responses 的 temperature 参数。** 正确路由 GPT-5 辅助请求;GPT-5 Responses API 会拒绝 `temperature` 字段。
- [#101723](https://github.com/NousResearch/hermes-agent/pull/101723) — **fix(sessions): 按物理列名映射 `lost_and_found` 单元格。** 在原地模式升级(`ALTER TABLE ADD COLUMN`)后,恢复操作不再错位对齐。
- [#104535](https://github.com/NousResearch/hermes-agent/pull/104535) — **fix(worktree): 绝不通过 Windows junction 进行删除。** 防止在 `git worktree remove` 跟随 JUNCTION 时发生静默数据丢失。
- [#73992](https://github.com/NousResearch/hermes-agent/pull/73992) — **fix(desktop): 防止 `followActiveSessionCwd` 中过时的项目作用域 yank。** 阻止 `git init`/clone + `cd` 链路覆盖当前会话的项目绑定。
- [#106478](https://github.com/NousResearch/hermes-agent/pull/106478) — **fix(profiles): `--clone-all` 不再将定时任务复制到新 profile。** 克隆后的 profile 现在以空的定时任务工作区开始。
- [#106495](https://github.com/NousResearch/hermes-agent/issues/106495) — 作为 HermesAgent OpenCode Zen 请求头相关 issue 的重复项关闭。
- CLI/profile、sessions 以及风险分类回归方面还有若干其他修复。

总体走向:**稳定性与回归修复** 而非新增功能面。

## 4. 社区热门话题

| 条目 | 评论数 | 状态 | 潜在需求 |
|---|---|---|---|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — 计划中的 Nous → Enterkey 合并因 `cron/jobs.py` 冲突而阻塞 | **80** | OPEN,被打上 invalid 标签但评论活跃 | 跨组织发布协调与仪表盘自动化可靠性 |
| [#63472](https://github.com/NousResearch/hermes-agent/issues/63472) — Desktop 的 `/v1/models` 对 llama.cpp 报告"无模型",而 CLI 正常 | 8 | CLOSED | CLI 与 Desktop 之间 OpenAI 兼容本地端点的对等性 |
| [#26665](https://github.com/NousResearch/hermes-agent/issues/26665) — Desktop 的 `pt-BR` 语言在重启后被重置 | 6 | CLOSED | 非英语用户的跨区域配置持久化 |
| [#92837](https://github.com/NousResearch/hermes-agent/issues/92837) — 代理缓存驱逐后,心跳 tick 计数已触发但始终未投递 | 5 | OPEN,P1 | 长生命周期 Telegram/leader 会话上可靠的定时唤醒 |
| [#96925](https://github.com/NousResearch/hermes-agent/issues/96925) — v0.20.6 后 Copilot 重复工具调用 | 5 | CLOSED | 提供商适配器回归隔离 |
| [#93817](https://github.com/NousResearch/hermes-agent/issues/93817) — Desktop 关闭推理后仍向 transcript 写入 trace | 5 | CLOSED | 用户隐私/UX 期望显式开关被尊重 |

主要信号是**对等性与持久化**:用户期望他们设置的开关(语言、推理块、模型列表)能在重启后存活,并在 CLI / Desktop / Dashboard 界面上保持一致行为。

## 5. Bug 与稳定性

**严重 / P0(开放):**
- [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) — **5 周内 state.db 损坏 4 次**,gateway+dashboard 多写者 WAL;在损坏发生前 7 分钟触发告警;`journal_mode=delete` 进行遏制。今日无可见修复 PR。
- [#93817](https://github.com/NousResearch/hermes-agent/issues/93817) — Desktop 关闭推理块后仍泄漏 trace(报告者定为 P0)。今日 CLOSED — 需验证是否真正发布。
- [#106179](https://github.com/NousResearch/hermes-agent/issues/106179) — Hermes Console 取消后,执行器 worker 与 LLM 请求仍在运行(P2)。今日新增。

**P1(开放或刚刚关闭):**
- [#92837](https://github.com/NousResearch/hermes-agent/issues/92837) — 心跳已触发但从未投递,仍 OPEN,无可见修复 PR。
- [#103054](https://github.com/NousResearch/hermes-agent/issues/103054) — 在 `--ssh-session-token-file` 后 Dashboard 仍下发过期 token,Desktop 在每次访问非公开 `/api/*` 时返回 401。CLOSED。
- [#102504](https://github.com/NousResearch/hermes-agent/issues/102504) — `hermes serve`(Desktop 后端)从未注册 `config.yaml` 的 shell 钩子;出站/租户/破坏性防护静默缺失。CLOSED。
- [#105663](https://github.com/NousResearch/hermes-agent/issues/105663) — 受保护的尾部可能超出压缩阈值 → 会话永久不可恢复。作为重复项 CLOSED。
- [#103792](https://github.com/NousResearch/hermes-agent/issues/103792) — Desktop 在 macOS 上 ready 宣告后丢失本地后端(回归)。CLOSED。
- [#101719](https://github.com/NousResearch/hermes-agent/issues/101719) — Bot Chat 的 capability-refresh 将命名 profile 的回合持久化到 launch-profile 的 `state.db`。CLOSED。
- [#103623](https://github.com/NousResearch/hermes-agent/issues/103623) — 云网关对所有入站请求返回 503 "Auth provider 'nous' unreachable"。作为重复项 CLOSED。
- [#106331](https://github.com/NousResearch/hermes-agent/issues/106331) — 在 systemd <254(Ubuntu 22.04)上,通过 OOMPolicy=kill 的 transient scope 导致定时任务失败。作为重复项 CLOSED。

**值得关注的反复出现的缺陷类别(根据 `sweeper:risk-*` 标签):**
- `risk-session-state`:state.db / sessions / 压缩 — 仍是最大的单一风险簇。
- `risk-message-delivery`:心跳、群聊回合、WeCom 流式。
- `risk-compatibility`:跨 Copilot、OpenAI Responses、OpenRouter 变体、OpenCode Zen、Mistral 的提供商漂移。

## 6. 功能请求与路线图信号

今日开放的功能/增强 PR 与 issue:

- [#106456](https://github.com/NousResearch/hermes-agent/issues/106456) — **自管 Node 运行时的升级路径(`~/.hermes/node`)** — 与 PR [#106498](https://github.com/NousResearch/hermes-agent/pull/106498) `upgrade_managed_node` 直接匹配。**很可能进入下一版本。**
- [#106496](https://github.com/NousResearch/hermes-agent/pull/106496) / [#80648](https://github.com/NousResearch/hermes-agent/pull/80648) — `cron resnap` 在不锁定的情况下采用已变更的全局默认值。对 [#44585](https://github.com/NousResearch/hermes-agent/pull/44585) 的补救工作。**高概率落地。**
- [#105863](https://github.com/NousResearch/hermes-agent/pull/105863) — **Claude OAuth DirectSDK 提供商**(委派)。以原生 admission + Hermes 压缩新增 Anthropic 鉴权路径。
- [#101116](https://github.com/NousResearch/hermes-agent/pull/101116) — Web dashboard + Desktop 的瑞典语(`sv`)区域设置。
- [#96942](https://github.com/NousResearch/hermes-agent/pull/96942) — WeCom 原生流气泡中的工具计时器动画。
- [#80850](https://github.com/NousResearch/hermes-agent/pull/80850) — Hindsight 记忆插件:`system_prompt_block` 中的使用指引。
- [#106502](https://github.com/NousResearch/hermes-agent/pull/106502) — 在群聊成员回合中重试瞬时错误且不消耗 mention。
- [#106497](https://github.com/NousResearch/hermes-agent/pull/106497) — `cron runs` / `cron notepad` 接受任务名(与其他 `cron` 命令对等)。
- [#105438](https://github.com/NousResearch/hermes-agent/pull/105438) — MCP SDK 从 2.0.0 升级到 2.1.1 以支持跨版本响应。
- [#96408](https://github.com/NousResearch/hermes-agent/pull/96408) — `hermes update` 应重启 `hermes-webui*` systemd 单元。
- [#106483](https://github.com/NousResearch/hermes-agent/pull/106483) — 将委派子会话的陈旧超时下限设为 150s(P-0097)。

**预测的下一版本(可能是 0.21.2 / 0.22.0):** managed-Node 升级路径、cron resnap、Windows junction 防护、GPT-5 Responses temperature 修复、过时的项目作用域修复、`--clone-all` 定时任务排除、MCP 2.1.1 以及瑞典语区域设置。

## 7. 用户反馈摘要

**真实痛点(原话分类):**

- **隐私 / 泄漏:** 用户明确关闭 "Reasoning Blocks OFF",但完整 trace 仍被写入 transcript([#93817](https://github.com/NousResearch/hermes-agent/issues/93817))。开关必须名副其实。
- **区域持久化:** 即便 `display.language` 正确持久化,语言首选项在重启和 `hermes update` 后仍被重置为英语([#26665](https://github.com/NousResearch/hermes-agent/issues/26665)、[#105465](https://github.com/NousResearch/hermes-agent/issues/105465))。i18n 回归影响多语言用户(pt-BR、zh)。
- **成本 / 上下文膨胀:** 在约 1M token 的窗口下,默认压缩阈值在长生命周期 always-on 会话上始终不触发 → 每个回合上下文无界增长([#106338](https://github.com/NousResearch/hermes-agent/issues/106338))。心跳静默时段仍由模型在读完完整上下文后强制执行([#106339](https://github.com/NousResearch/hermes-agent/issues/106339))。**成本痛点已成为首要抱怨。**
- **提供商脆弱性:** 免费层速率限制指纹([#106495](https://github.com/NousResearch/hermes-agent/issues/106495))、Mistral 的 `p`-padding 字段破坏流式([#106006](https://github.com/NousResearch/hermes-agent/issues/106006))、OpenRouter `:nitro`/`:floor`/`:exacto`/`:online` 后缀路由与能力缓存不匹配([#106493](https://github.com/NousResearch/hermes-agent/pull/106500))。
- **并发 / 数据完整性:** 即便使用 WAL 模式,`state.db` 损坏仍反复出现([#100896](https://github.com/NousResearch/hermes-agent/issues/100896));会话被静默持久化到错误 profile 的数据库([#101719](https://github.com/NousResearch/hermes-agent/issues/101719));在 systemd <254 上 `cron` 任务失败([#106331](https://github.com/NousResearch/hermes-agent/issues/106331))。
- **取消的诚实性:** Console 取消报告已取消,但执行器 + LLM 请求仍在继续([#106179](https://github.com/NousResearch/hermes-agent/issues/106179))。
- **本地化 UX:** 需要瑞典语([#101116](https://github.com/NousResearch/hermes-agent/pull/101116))。

**满意度信号:** 高参与度(50/50 issue + PR 变动)以及提交详细复现的意愿表明用户投入度较高;不满集中在回归的回归上,而非对整体方向的不满。

## 8. 待办观察

需要维护者关注、但长期未处理的条目:

- **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)** — 80 条评论,自 2026-08-17 起 OPEN,尽管讨论激烈仍被标记为 `invalid`。Nous → Enterkey 发布合并自动化仍因 `cron/jobs.py` 冲突而阻塞。属跨组织协调问题,用户无法自行修复。
- **[#4170](https://github.com/NousResearch/hermes-agent/issues/4170)** — 自 2026-03-31 起开放。**安全:** 终端命令无网络出站过滤。PR #4168 关闭了 11 项审计发现中的 5 项;剩余 6 项(其中凭据文件拒绝列表最为关键)需架构层面的决策。
- **[#61660](https://github.com/NousResearch/hermes-agent/issues/61660)** — 自 2026-07-09 起开放,1 👍。`codex_models.py` 的 `DEFAULT_CODEX_MODELS` 提供 8 个 slug;`*-pro` slug 对 ChatGPT 账户返回 HTTP 400(100% 复现)。
- **[#84772](https://github.com/NousResearch/hermes-agent/issues/84772)** — 自 2026-08-12 起开放。MCP 工具可通过 `hermes mcp test` 发现,但**未注册到代理的主调度中** — 只能通过原始 `tool_call` 调用。MCP 用户面临静默的能力丧失。
- **[#71169](https://github.com/NousResearch/hermes-agent/issues/71169)** — 自 2026-07-25 起开放。Desktop GUI 的 "Models" 面板静默丢弃 Ollama 中存在的模型(`qwen3.6:35b` 已确认)。CLI 与 GUI 的过滤逻辑不一致。
- **[#9297 / #92837 簇](https://github.com/NousResearch/hermes-agent/issues/92837)** — 心跳 / 循环 / 调度

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-09

## 1. 今日概览

IronClaw 在过去 24 小时内呈现出**中等强度、聚焦性的开发活动**：更新了 2 个 issue 和 11 个 PR，已关闭与已开启的 PR 比为 5:6，表明正在进行积极的分类与合并处理。没有新版本发布。几乎所有活动都集中在单一贡献者 `kirikov` 手中（13 个条目中占 10 个），另有 `thisisjoshford` 提交的一个 PR。当日占主导地位的技术主题是**多租户托管型 MCP 隔离**——发现目录、调用方归属（caller attribution）以及包验证——辅之以配置人体工学（`env_or_override`）、提示词上下文预算以及 Telegram 集成打磨方面的工作。项目当前处于一个"逐步消除微妙的多用户与部署形态 bug"的阶段，而非交付重大功能。

## 2. 版本发布

过去 24 小时内没有发布新版本。

## 3. 项目进展

过去 24 小时内有 5 个 PR 被关闭/合并。它们共同推进了 MCP 打包、运维人体工学以及 MCP 归属方案：

- **[#8088](https://github.com/nearai/ironclaw/pull/8088) — `feat(common): distinguish a set-but-empty env var from an unset one`（已关闭）。** 在 `env_or_override` 中真正区分 `FOO=` 与不存在的 `FOO`。消除了一类针对部署决策变量（例如端点覆盖）的静默运维笔误故障。
- **[#8089](https://github.com/nearai/ironclaw/pull/8089) — `feat(extensions): bundle the agent-market hosted-MCP provider package`（已关闭）。** 将 `agent.market` provider 作为一等包进行添加，沿用其他已打包托管型 MCP 包相同的形态：清单（manifest）+ 各工具输入 schema + 用于发现前阶段的静态工具兜底。
- **[#8083](https://github.com/nearai/ironclaw/pull/8083) — `fix(extensions): merge discovered hosted-MCP catalogs instead of replacing them`（已关闭）。** 直接修复跨用户工具目录覆盖 bug：发现的目录现在按扩展进行合并而非替换，因此一个用户的发现结果不再破坏另一个用户的工具。
- **[#6760](https://github.com/nearai/ironclaw/pull/6760) — `feat(extensions): bundle the agent-market marketplace extension`（已关闭，已被取代）。** 最初用于打包 `agent-market` 的大体量工作，支持通过环境变量配置服务器 URL。已关闭，因为包形态被重组为后来在 #8089 中实现的单 crate 模型。
- **[#6759](https://github.com/nearai/ironclaw/pull/6759) — `feat(mcp): SEP-414 _meta attribution on outbound hosted-MCP tools/list + tools/call`（已关闭，需要 rebase）。** 早期版本的按主体（per-principal）归属方案。已关闭，转而采用 #8084 中提出的 opt-in 形态。

当天实际上**终结了三个既有工作的篇章**（#6760、#6759 以及 #8083 时期那个版本的开放 PR 设计），并**开启了更清晰的跟进浪潮**（#8089、#8084），以新的打包扩展架构瞄准同样的底层问题。

## 4. 社区热点话题

互动（评论 + 反应）异常安静：所有条目都没有点赞反应，全项目总计仅 2 条评论，且都集中在 [Issue #6778](https://github.com/nearai/ironclaw/issues/6778) 上。由于标准互动信号均为平淡，"热点"更应理解为**主题中心性**，而非评论数量：

- **[Issue #6778 — Hosted-MCP 跨用户元数据暴露](https://github.com/nearai/ironclaw/issues/6778)**（2 条评论；更新于 2026-09-08；开立于 2026-07-28）。这是今天将近一半工作的**锚点 issue**。Bug 出在：`tools/list` 发现过程使用的是*激活用户*的凭据，但结果发布时仅以扩展 id 为键，因此第二个主体的发现会静默地覆盖第一个。两个修复 PR（#8083 已合并，#8090 仍开放）处理的是目录替换这一半；凭据泄漏这一半（使用用户 A 的令牌来物化用户 B 的包元数据）仍然是 issue 正文中的结构性关切。
- **[Issue #8086 — `ironclaw skills list` 无法看到运行时写入的 skill](https://github.com/nearai/ironclaw/issues/8088)**（0 条评论；更新于 2026-09-08）。新开立的 issue，暂无评论，但指出同一位置的两处潜在可用性 bug：(1) agent 安装的 skill 对 CLI 不可见；(2) CLI 只能看到为其配置的那个用户的 skill。两处都指向运行时与 CLI 之间缺失的索引/状态串联。
- **[PR #8072 — Telegram Bot API 命令菜单注册](https://github.com/nearai/ironclaw/pull/8072)**（开放状态，今日唯一非 `kirikov` 提交的 PR）。在激活时通过 `setMyCommands` 注册 `/model`、`/status`、`/new`、`/stop`、`/interrupt`，在停用时调用 `deleteMyCommands`。这是当日唯一具有非平凡历史的条目（创建于 2026-09-04，最近更新于 2026-09-08），作者是一位有经验的贡献者——属于一项体量小但面向用户的体验升级。

**底层需求：** 运维者和 agent 都希望从*按安装（per-installation）*而非按包的视角查看扩展、工具和 skill，而 CLI/runner 边界反复成为这种区分发生泄漏的位置。

## 5. Bug 与稳定性

大致按严重程度排序（安全/多用户优先）：

| 严重程度 | 条目 | 修复 PR |
|---|---|---|
| **高** | [#6778](https://github.com/nearai/ironclaw/issues/6778)：托管型 MCP 目录在激活用户凭据下发布却仅以扩展 id 为键 → 多主体服务器上的跨用户元数据暴露 | 部分修复：[#8083](https://github.com/nearai/ironclaw/pull/8083) 已合并（合并而非替换）；[#8090](https://github.com/nearai/ironclaw/pull/8090) 开放中（按调用方而非扩展为键）。凭据绑定的发现仍未修复。 |
| **中** | [#8086](https://github.com/nearai/ironclaw/issues/8086)：`ironclaw skills list` 对运行时安装的 skill 以及非默认用户所拥有的 skill 返回为空——调试器会把运维者引向错误的问题 | 尚无。 |
| **低** | `env_or_override` 把 `FOO=` 与未设置的 `FOO` 混为一谈（[#8088](https://github.com/nearai/ironclaw/pull/8088)）——静默的运维笔误故障模式 | 已修复并关闭。 |
| **低** | `from_host_bundled_manifest_with_inline_dynamic_schemas` 与 `validate_consistency` 对哪些清单源可以携带内联动态描述符 schema 持不同意见（[#8085](https://github.com/nearai/ironclaw/pull/8085)）——运维者安装的包可以构建但无法使用 | 修复 PR 开放中。 |

过去 24 小时内没有崩溃、panic 或回归报告。当日占主导地位的 bug 类别是**多用户部署中的状态键控错误**，而非局部正确性 bug。

## 6. 功能请求与路线图信号

当日开放的 PR 共同勾勒出一个清晰可见的近期形态：

- **在所有地方实现按调用方隔离** — [#8090](https://github.com/nearai/ironclaw/pull/8090)（目录按调用方为键）和 [#8084](https://github.com/nearai/ironclaw/pull/8084)（出站托管型 MCP 调用上的 SEP-414 `_meta` 调用方归属）共同将托管型 MCP 推向一个模型：每个安装都是一个独立的命名空间，并对每次调用提供显式归属。两者均开放中；#8084 需在 provider 清单中 opt-in。
- **可配置的模型上下文预算** — [#8087](https://github.com/nearai/ironclaw/pull/8087) 将 `PromptContextTokenBudget::DEFAULT_CONTEXT_LIMIT_TOKENS` 从 128k 常量改为可覆盖。预计的下一步：在 agent loop CLI 配置中与其他运维旋钮一起暴露此覆盖项。
- **运维者可安装的包与宿主机打包包同等对待** — [#8085](https://github.com/nearai/ironclaw/pull/8085) 让校验器与构造器在"哪些清单源可以携带内联动态 schema"上达成一致，消除了一种会阻断整类部署侧包被使用的不对称。
- **文档附件的"指针模式"** — [#8082](https://github.com/nearai/ironclaw/pull/8082) 允许运维者选择不将提取出的 PDF/DOCX 文本内联到每个模型请求中（单个 PDF ≈ 25k tokens）。指针模式是最有可能近期落地的*面向用户*的能力，因为其成本模型易于解释。
- **Telegram 菜单打磨** — [#8072](https://github.com/nearai/ironclaw/pull/8072) 是开放条目中最小、最自包含的一个，是下次合并的合理候选。

**预测的下个版本内容：** 如果未来几天发布版本，预计会捆绑 #8085、#8087 和 #8072 作为"运维人体工学 + 小型渠道打磨"片段，而 MCP 隔离工作（#8089 已关闭，#8090、#8084）可能落在再下一个版本中。

## 7. 用户反馈摘要

反馈量较低（今日全项目仅 2 条评论），且几乎全部是结构化的 PR/issue 行文，而非对话式回复。从这些行文中提炼出的主题：

- **多租户运维者正在积极部署 IronClaw**，他们是 #6778、#8083、#8089、#8090 和 #8084 的隐含受众——每一个条目都把问题框定为"在单用户下能工作，第二个用户一出现就坏掉"。这对部署故事的生产就绪度而言是一个正面信号，同时也警告说按安装的数据模型仍然欠规范。
- **CLI 人体工学仍然是最尖锐的痛点。** `env_or_override` 修复（#8088）与 `skills list` bug（#8086）共享一个根因：面向运维者的表面会静默地对系统状态撒谎。skills-list 问题尤其显眼，因为"我装了一个 skill，CLI 找不到它"是调试器最先撞上的问题。
- **上下文预算的痛点是具体的、可量化的。** #8082 和 #8087 的作者给出了一个数字（约 25k tokens/PDF，默认 128k），这暗示这些数据是针对真实工作负载测量得出的，而非凭空假设。
- **满意度信号：** 没有任何显式正向信号；缺少负面反应以及同一作者愿意在一天内连续关闭五个 PR，表明该贡献者正朝着一个连贯的设计方向推进，而非与代码库搏斗。

## 8. 待办事项关注

值得维护者关注的条目，因为它们比今日这波活动存在时间更久：

- **[Issue #6778 — Hosted-MCP 跨用户元数据暴露](https://github.com/nearai/ironclaw/issues/6778)** — 开立于 **2026-07-28**，在今日这波活动触及之前已经存在约 6 周。目录合并那一半今天已通过 #8083 和 #8090 修复，但凭据绑定发现那一半（issue 中最具安全相关性的主张）尚无对应修复。**这是最值得维护者给出明确回应的条目**，应说明凭据泄漏是否在项目范围内。
- **[PR #6760](https://github.com/nearai/ironclaw/pull/6760)** — 已关闭/被 #8089 取代；需验证取代关系已被记录，以免未来读者试图复活原形态。
- **[PR #6759](https://github.com/nearai/ironclaw/pull/6759)** — 已关闭，转而采用 #8084 的 opt-in 形态；同样存在取代关系追踪的需求。
- **[PR #8084 — SEP-414 调用方归属](https://github.com/nearai/ironclaw/pull/8084)** — 在 provider 清单中 opt-in。维护者应确认 opt-in 是否为预期姿态，或者归属是否应对托管型 provider 默认开启，因为该规范恰恰针对的就是 provider *希望*获得归属的场景。
- **[PR #8090 — 按调用方的目录键控](https://github.com/nearai/ironclaw/pull/8090)** — 开放中，暂无评论。与 #6778 中仍未解决的凭据问题协同演进；若维护者就两者是否应共同落地给出指引，将有助于解除作者阻塞。
- **[Issue #8086 — `skills list` 对运行时写入的 skill 视而不见](https://github.com/nearai/ironclaw/issues/8086)** — 新开，但一石二鸟（运行时安装 + 非默认用户），值得尽早给出分类响应，以免修复最终只解决较容易的那一半。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目简报 — 2026-09-09

## 1. 今日概览

QwenPaw 展现出**高开发速度**：过去 24 小时内活跃 issue 20 个、PR 34 个，并发布了 v2.2.1-beta.1。各类工作分布均衡，涵盖 bug 修复（控制台/弹窗样式、MCP、channel）、新功能（skills 版本管理、移动端 UX、红绿灯状态指示）以及基础设施工作（memory 插件迁移、测试覆盖率冲刺）。关闭率表现良好（11/20 issue、9/34 PR 已关闭），说明维护者正在积极处理 v2.2.0 → v2.2.1 的待办积压。整体项目状态健康，稳步向 v2.2.1 稳定版迭代。

## 2. 发布

已发布 **v2.2.1-beta.1**（[Release](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.1)）。

本次合入的值得关注的变更：
- **feat**: 新增 agent 模型路由配置（[#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)）
- **docs**: 更新官网以适配 v2.2.0（[#7517](https://github.com/agentscope-ai/QwenPaw/pull/7517)）
- **fix(chat)**: 流式过程中同步已解析的会话

迁移说明 —— [#7643](https://github.com/agentscope-ai/QwenPaw/pull/7643) 紧随其后将版本号升至 `2.2.1b2`，表明该 beta 线仍在积极迭代。本次发布未记录到破坏性变更。安装校验问题 [#7635](https://github.com/agentscope-ai/QwenPaw/issues/7635) 已通过四项检查的平台门禁后关闭。

## 3. 项目进展

今日已合并/关闭的 PR（共 9 个，重点摘要）：

| PR | 领域 | 结果 |
|---|---|---|
| [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649) | MCP | 为 `MCPClientConfig` 新增可配置的 HTTP/SSE 超时 |
| [#7651](https://github.com/agentscope-ai/QwenPaw/pull/7651) | 控制台/应用市场 | 应用"已安装"状态现可正确显示（关闭 [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228)） |
| [#7646](https://github.com/agentscope-ai/QwenPaw/pull/7646) | 控制台 CSS | `qwenpaw-*` 选择器与 `prefixCls` 对齐（关闭 [#5688](https://github.com/agentscope-ai/QwenPaw/issues/5688)） |
| [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) | Skills | 暴露版本号与依赖校验（关闭 [#7557](https://github.com/agentscope-ai/QwenPaw/issues/7557)） |
| [#7643](https://github.com/agentscope-ai/QwenPaw/pull/7643) | 发布 | 版本号升至 `2.2.1b2` |

**已取得进展但仍在进行中的主要功能：**
- [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) Memory 插件重构（ADBPG、PowerContext）
- [#7382](https://github.com/agentscope-ai/QwenPaw/pull/7382) AgentScopeRuntimeWebUI 1.2 适配
- [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) 原生移动端体验（Expo/React Native 草案）
- [#7653](https://github.com/agentscope-ai/QwenPaw/pull/7653) 后端测试覆盖率 `64.41% → 69.43%`（+2475 用例）

## 4. 社区热点话题

**讨论最多的 issue（按评论数排序）：**

1. [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — *部署页移动端 UX*（8 条评论，**open**）。反复要求将部署入口移至顶部，并重新调整"启动/停止"控件以适配移动端的拇指操作。提交了多张截图；反映了 mobile-first 反馈的更广泛趋势（另见 [#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329)、[#7600](https://github.com/agentscope-ai/QwenPaw/issues/7600)）。

2. [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — *模型回复在后续上下文中丢失*（8 条评论，**open**，严重程度：高）。助手消息已被持久化，但在下一轮中缺失，导致空回复。这是一个影响生产用户的真实正确性 bug。

3. [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228) — *应用市场悬停状态错误*（6 条评论，**closed**）。充分体现了维护者的高响应度 —— 当天即由 [#7651](https://github.com/agentscope-ai/QwenPaw/pull/7651) 修复。

4. [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — *工具返回的图片/PDF 以裸 base64 返回"file must have a file_id or file_data"*（6 条评论，**closed**）。反映出多模态工具链中的摩擦点。

5. [#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460) — *Wayland 上的 Edge 浏览器：会话页单标签页 CPU 占用过高*（5 条评论，**closed**）。表明 WebSocket/渲染循环优化工作已落地。

**底层诉求：** 移动端/触控交互体验、安装/版本状态的透明度、以及稳定的多模态与 channel 流水线占据了优先级前列。

## 5. Bug 与稳定性

按用户影响与活跃度排序：

| 严重度 | Issue | 状态 | 修复 PR |
|---|---|---|---|
| **高** | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — 模型丢失自己上一条回复 → 空响应 | OPEN | 暂无 |
| **高** | [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — Chrome 中控制台流式内容在本轮结束前不可见 | OPEN | [#7382](https://github.com/agentscope-ai/QwenPaw/pull/7382) 进行中 |
| **高** | [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) — llama.cpp 5 位构建号解析错误 → 静默运行时回滚 | OPEN | 暂无 |
| **中**  | [#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622) — v2.2.0 弹窗背景透明 | CLOSED（很可能经 [#7646](https://github.com/agentscope-ai/QwenPaw/pull/7646)） | [#7646](https://github.com/agentscope-ai/QwenPaw/pull/7646) |
| **中**  | [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) — 上下文压缩仍可能超出 provider 配额 | OPEN | 暂无 |
| **低**  | [#7618](https://github.com/agentscope-ai/QwenPaw/issues/7618) — QQ channel 群聊无响应 | CLOSED | 不适用 |
| **低**  | [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601) — 2.2.0 中工作目录选择器丢失可编辑路径功能 | CLOSED | 修复可能待定；属于回归 |

注：[#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633)（静默运行时回滚）与 [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)（上下文丢失）是今日优先级最高且仍未修复的两个缺陷 —— 都直接影响用户数据与信任。

## 6. 功能请求与路线图信号

活跃请求围绕几个主题聚类：

**移动端 / 多实例交互体验**（可能影响 v2.2.x 与 v2.3）：
- [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — 部署页 mobile-first 布局
- [#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329) — 紧凑模式下的侧边栏 agent 切换器 + 新建会话 *（已关闭，与 [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) 移动端草案方向一致）*
- [#7600](https://github.com/agentscope-ai/QwenPaw/issues/7600) — 红绿灯状态指示（避免长时间运行任务失联）
- [#7648](https://github.com/agentscope-ai/QwenPaw/issues/7648) — 可自定义页面标题（多标签工作流，同时开 7–8 个实例）

**配置透明度：**
- [#7644](https://github.com/agentscope-ai/QwenPaw/issues/7644) — 在 UI 中可编辑 default-agent 的关键参数（邮箱、模型路由）
- [#3997](https://github.com/agentscope-ai/QwenPaw/issues/3997) — 可配置的 MCP 超时 *（已在 [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649) 中交付）*

**集成 / 扩展性：**
- [#7650](https://github.com/agentscope-ai/QwenPaw/issues/7650) — 将 channel 级元数据（QQ ID、手机号）透传给 MCP 工具

**预计纳入 v2.2.1 stable / v2.3：**
- 红绿灯状态指示（[#7600](https://github.com/agentscope-ai/QwenPaw/issues/7600)）
- 移动端 UI 优化（[#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)、[#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378)）
- Reranker UI（[#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)）
- default-agent 编辑界面（[#7644](https://github.com/agentscope-ai/QwenPaw/issues/7644)）

## 7. 用户反馈摘要

**满意度信号：** [#7228](https://github.com/agentscope-ai/QwenPaw/issues/7228)、[#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597)、[#6460](https://github.com/agentscope-ai/QwenPaw/issues/6460)、[#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)、[#5688](https://github.com/agentscope-ai/QwenPaw/issues/5688) 与 [#7618](https://github.com/agentscope-ai/QwenPaw/issues/7618) 均在当日关闭，体现了高效的 triage 节奏，进一步增强了用户对 v2.2.1 线的信心。

**痛点：**
- *移动端交互体验* 在反馈中占主导。用户明确期待手机级别的交互一致性（紧凑型侧边栏 agent 切换器、置顶的部署入口、无破坏性的 Stop 按钮）。
- *状态透明度*："安装"与"已安装"状态错误、llama.cpp 静默回滚都会侵蚀用户信任；用户希望获得明确的版本/升级提示。
- *升级引发的回归*：2.1.0 → 2.2.0 丢失了可编辑的工作目录路径字段（[#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)），并引入了透明弹窗（[#7622](https://github.com/agentscope-ai/QwenPaw/issues/7622)）。
- *多模态脆弱性*：裸 base64 的工具结果可能违反 provider 契约并返回 400（[#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597)）。
- *多实例工作流*：并行运行多个 QwenPaw 面板的重度用户需要可区分的标题（[#7648](https://github.com/agentscope-ai/QwenPaw/issues/7648)）。

## 8. 待办积压观察

仍开放或停滞、需要维护者关注的事项：

- [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — 上下文丢失 bug，用户影响大，暂无 PR。
- [#7633](https://github.com/agentscope-ai/QwenPaw/issues/7633) — 静默运行时回滚；需在用户再次踩坑前及时 triage。
- [#7628](https://github.com/agentscope-ai/QwenPaw/issues/7628) — 上下文压缩预算准确性，暂无 PR。
- [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — Chrome 流式回归；依赖 [#7382](https://github.com/agentscope-ai/QwenPaw/pull/7382) 合入。
- [#3997](https://github.com/agentscope-ai/QwenPaw/issues/3997) — 创建于 **2026-05-02**（约 4 个月）。今日经 [#7649](https://github.com/agentscope-ai/QwenPaw/pull/7649) 关闭；可作为长尾问题解决的正面示例。
- [#5329](https://github.com/agentscope-ai/QwenPaw/issues/5329) — 创建于 **2026-06-19**，今日关闭，历时约 2.5 个月。
- [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) — 移动端草案标有 **[DO NOT MERGE]**；需设计/维护者评审以明确 v2.3 移动端策略。
- [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) — Reranker UI 自 **2026-07-23** 起处于 **Under Review**；等待合入以解锁 ReMeLightMemory 工作。
- [#7057](https://github.com/agentscope-ai/QwenPaw/pull/7057) — 服务端子进程的 `PATH` 注入，自 **2026-08-15** 起处于 **ready-for-human-review**。
- [#7237](https://github.com/agentscope-ai/QwenPaw/pull/7237) —

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目日报 — 2026-09-09

## 1. 今日概览

ZeroClaw 今天活动量较高，过去 24 小时内有 **37 个 issue** 和 **50 个 PR** 更新，尽管**没有新版本发布**。项目正处于架构打磨阶段：讨论最多的主题是关于运行时持有的会话、统一文件/附件架构、细粒度沙箱策略以及可组合 WASM 插件运行时的大型 RFC —— 这些都带有高风险标签并经历了多次修订。在运营层面，团队正在收尾 **ZeroCode 侧边栏 / 多会话工作流**（关闭了 3 个 issue + 1 个 PR），同时新开了一组围绕 **Anthropic/OpenAI 成本追踪**、ACP 转录渲染以及提供方缓存配置的 P1/P2 Bug。活跃度评估：**健康且治理导向**，RFC 迭代活跃但合入吞吐量较低（1 个 PR 关闭 vs. 49 个 PR 开放）。

## 2. 版本发布

过去 24 小时内无新版本发布。Bug 报告中引用的当前生产版本为 **v0.8.5**。

## 3. 项目进展

### 已关闭的 Issue
- [#9729](https://github.com/zeroclaw-labs/zeroclaw/issues/9729) — zerocode：在每个聊天面板中追踪多个并发活跃会话 *（已关闭）*
- [#9730](https://github.com/zeroclaw-labs/zeroclaw/issues/9730) — zerocode：带状态点的 Agent 侧边栏、添加选择器以及点击切换 *（已关闭）*
- [#9731](https://github.com/zeroclaw-labs/zeroclaw/issues/9731) — zerocode：将 Quickstart 从模式栏移入侧边栏 *（已关闭）*

### 已关闭的 PR
- [#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739) — `feat(zerocode): multi-session panes with agent sidebar and sidebar-launched quickstart` *（已关闭；XL，禁止合入 — 在受限重连/生命周期修复后，原始功能范围保留在贡献者分支上）*

### 净变化

三个已关闭 issue 加上 [#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739) 代表了 **#9727 zerocode UX 重新设计 epic** 的收尾 —— 基于侧边栏的 Agent 选择、多会话追踪，以及将 Quickstart 向导从模式栏迁移到侧边栏。今天没有后端、提供方或安全相关的 PR 落地。

## 4. 社区热议话题

按评论数排序。绝大多数流量集中在**架构 RFC**上，而非 Bug。

| 排名 | 条目 | 类型 | 评论数 | 为何热议 |
|------|------|------|----------|--------------|
| 1 | [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) RFC：运行时持有的会话与传输适配器 | RFC | 36 | 第 5 版取代第 4 版 —— ACP/聊天会话所有权的基石级 RFC；需要维护者重新投票。 |
| 2 | [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) RFC：会话面的统一文件与附件架构 | RFC | 29 | 第 10 版 —— 涵盖工具、渠道、安全的高度迭代的附件模型。 |
| 3 | [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) RFC：细粒度沙箱策略 —— 文件系统限制 | RFC | 26 | 解决 `SecurityPolicy` 与操作系统沙箱（Bubblewrap/Landlock/Seatbelt）之间长期存在的漂移问题。 |
| 4 | [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) RFC 与设计 issue 的维护者决策队列 | Tracker | 15 | 决定哪些 RFC 推进的元跟踪器；每日更新。 |
| 5 | [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076) RFC：可组合 WASM 插件运行时架构 | RFC | 12 | 技能/工具的插件运行时形态；明确将会话历史推迟到 #10526。 |

**潜在信号：** 项目正在整合治理 —— [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)（RFC 投票简化，5 条评论）希望完全取消强制讨论窗口，表明评审者认为当前的 RFC 流程过度设计。

## 5. Bug 与稳定性

### P1（最高严重度）— 2 项
| Issue | 标题 | 修复 PR？|
|-------|-------|---------|
| [#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816) | Anthropic 提供方上报 `$0.00` 消耗；预算上限永不触发 | 没有专门针对此问题的开放 PR —— [#10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716) 解决了缓存写入定价问题，但未触及底层的零成本 Bug。 |
| [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697) | ZeroCode ACP 转录在工具调用前丢失助手文本 | 没有匹配的 PR。 |

### P2 — 今日报告或更新的 Bug
- [#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690) — Integrations 页面将显示名 slugify（Z.AI → `z-ai`）→ **已在** [#10714](https://github.com/zeroclaw-labs/zeroclaw/pull/10714) **中修复**。
- [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) — `[media attachment]` 占位符在纯文本模型上泄露给用户。
- [#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700) — `CostTracker.session_id` 是守护进程生命周期级别的，阻碍按会话消费明细。
- [#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699) — 成本账本低估缓存写入 → **修复见** [#10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716)。
- [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) — 图片附件使整个兼容提供方缓存前缀失效。
- [#10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720) — ZeroCode v0.8.5：Agent 响应渲染两次（仅显示问题）。
- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — `knowledge.db_path` 波浪号展开是全局 `replace`，而非 home-prefix。
- [#10548](https://github.com/zeroclaw-labs/zeroclaw/issues/10548) — Mermaid SVG 在缩放对话框内丢失可访问性。

### 稳定性结论

**6 个 P2 修复被在途 PR 解锁**，但**两个 P1 Bug 尚无针对性修复 PR**，这是今日板上最大的稳定性风险。

## 6. 功能请求与路线图信号

### 新开或正在讨论的功能
- [#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) — 为 Anthropic（原生 + 透传）配置 1 小时 prompt-cache TTL → 与下一发布周期契合度极高。
- [#10706](https://github.com/zeroclaw-labs/zeroclaw/issues/10706) — 在 OpenAI Responses 路径间保留不透明的推理状态。
- [#10707](https://github.com/zeroclaw-labs/zeroclaw/issues/10707) — 通过 OpenAI Responses 进行有界编程式工具调用。
- [#10708](https://github.com/zeroclaw-labs/zeroclaw/issues/10708) — 在 OpenAI Responses WebSockets 上进行主动响应引导。
- [#10704](https://github.com/zeroclaw-labs/zeroclaw/issues/10704) — OpenAI Responses 的异步函数工具。
- [#8763](https://github.com/zeroclaw-labs/zeroclaw/issues/8763) — ZeroCode 中的子 Agent 活动/可展开工具结果（已接受）。

### 推进功能的开放 PR
- [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — 将上下文压缩锚定到**模型窗口比例**而非固定 token 预算（XL，主要贡献者）。
- [#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809) — **每个提供方配置支持多个模型**（XL）。
- [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) — **A2A 出站客户端**，带共享 wire-model 和四个 `a2a_*` 工具（#9106 的第 1 阶段）。
- [#10623](https://github.com/zeroclaw-labs/zeroclaw/pull/10623) — 为 OpenAI 兼容提供方做 Anthropic prompt-cache **透传**。
- [#10727](https://github.com/zeroclaw-labs/zeroclaw/pull/10727) — CI：从发布说明合成 X / Discord 公告（发布流程卫生）。
- [#10729](https://github.com/zeroclaw-labs/zeroclaw/pull/10729) — 升级 `js-yaml` 至 4.3.2（清除一直导致 `npm audit` 报红的已知公告）。
- [#10680](https://github.com/zeroclaw-labs/zeroclaw/pull/10680) — `rust-all` 依赖升级，共 44 个包（含 clap、tokio-util）。

### 下版本预测

最有可能在 **v0.8.6** 或 **v0.9.0** 落地：
1. Anthropic 缓存 TTL 可配置性（[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) ↔ [#10623](https://github.com/zeroclaw-labs/zeroclaw/pull/10623)）
2. 成本账本中的缓存写入定价（[#10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716)）
3. 像素级图片校验（[#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)）
4. 上下文压缩比例（[#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)）
5. A2A 出站工具（[#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)）

## 7. 用户反馈摘要

**今日浮现的主要痛点：**
- **成本透明度全面失灵。** 今天有三个独立讨论串（[#9816](https://github.com/zeroclaw-labs/zeroclaw/issues/9816)、[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)、[#10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)）报告成本账本同时出现零消耗上报、缓存写入定价错误，以及将所有交易归属到单一守护进程生命周期级别的 session ID。用户无法信任 `zeroclaw status` 或预算上限。
- **与 Anthropic 的缓存控制体验不佳。** 原生（[#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)）与兼容（[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)、[#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)）提供方都泄漏了 5 分钟默认值并浪费了缓存断点 —— 对成本敏感的运营者是反复出现的痛点。
- **ZeroCode v0.8.5 回归。** [#10720](https://github.com/zeroclaw-labs/zeroclaw/issues/10720)（重复回复）和 [#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)（ACP 中工具调用前的文本丢失）是新版本带来的全新 UX 回归。
- **Telegram 媒体批处理**（[#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)）自 **2026 年 4 月**以来一直开放 —— 表明渠道层的轮次聚合是一个长期缺口。
- **仪表板路由脆弱性**（[#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)）—— 显示名 slugify 破坏了 Z.AI 的每个 "Configure" 链接，暗示 UI 显示字符串与提供方键之间的耦合很脆弱。

整体情绪：**架构雄心勃勃，但在成本和最新 UI 版本方面运营上较为脆弱**。

## 8. 待办积压观察

开放时间最长且仍需维护者主动关注的事项：

| 条目 | 年龄 | 重要性 | 最后活动 |
|------|-----|----------------|---------------|
| [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) Telegram 媒体批处理 | **5 个月**（2026-04-08） | 影响所有 Telegram 用户；完全绕过多模态分组。今日有更新但已进行数月。 | 2026-09-09 |
| [#8546](https://github.com/zeroclaw-labs/zeroclaw/pull/8546) `fix(cli): localize status fragments` | **2 个月以上** | 状态输出是面向用户的 CLI 关于成本/运行时信息的主要表面；需作者操作。维护者已重做该分支。 | 2026-09-09 |
| [#10241](https://github.com/zeroclaw-labs/zeroclaw/pull/10241) `fix(channels): restore supervised shell approval routing` | 状态：**受阻** | 受监督 shell 在 **9 个渠道**上的高风险安全回归；在维护者审核完成前无法合入。 | 2026-09-09 |
| [#9977](https://github.com/zeroclaw-labs/zeroclaw/pull/9977) `fix(tools): confine filesystem mutations to workspace` | XL，需维护者审核 | 工具的基础安全边界；符号链接/文件系统逃逸加固。 | 2026-09-09 |
| [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) A2A 出站客户端（第 1 阶段） | 需作者操作 | 已接受 RFC 的首个交付物；阻塞 A2A 生态工作。 | 2026-09-09 |
| [#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819) 像素级图片校验 | 需作者操作 | 防止损坏图片导致提供方失败 —— 常见的多模态回归。 | 2026-09-09 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) 细粒度沙箱策略 RFC | 自 2026-05-28 开放 | 评论持续活跃但尚未合并落地。 | 2026-09-08 |

**积压健康度：** 今日关闭 PR 与开放 PR 的比例为 **1:49**，这反映了健康的广度，但也表明**维护者审核带宽** —— 而非贡献者供给 —— 是瓶颈。维护者决策队列跟踪器（[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）是观察分诊进展的合适入口。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*