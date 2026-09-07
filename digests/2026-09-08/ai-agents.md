# OpenClaw 生态日报 2026-09-08

> Issues: 482 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-07 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目简报 — 2026-09-08

## 1. 今日概览

OpenClaw 展现出很高的开发活跃度，过去 24 小时内涉及 482 个 Issue 和 500 个 PR，开闭状态几乎对半分布（Issue 238/244，PR 264/236）。今天没有发布新版本，结合大量未解决的 P0/P1 回归来看，团队正在等待一个稳定窗口之后再发布下一个版本。积压问题集中在 **2026.8.x → 2026.9.2 期间的事件循环阻塞、子进程生命周期以及 provider/认证回归**，表明这是一个系统性的性能与正确性主题，而非单一组件故障。维护者审查和产品决策仍是主要的瓶颈——许多高严重度 Issue 都带有 `clawsweeper:needs-maintainer-review` / `needs-product-decision` 标签，却尚未关联到任何修复 PR。

---

## 2. 版本发布

**过去 24 小时内无版本发布。** 当前开发主线看起来是 2026.9.2（在 #139578、#140129、#140620、#140497 中被引用），先前稳定版本引用包括 2026.7.1-2 和 2026.8.1/2026.8.2。

---

## 3. 项目进展

**过去 24 小时关闭/合并的 PR：** ~236 个 PR 合并或关闭。值得关注的已完成工作：

- **原生认证/CLI 模型** — [PR #141654](https://github.com/openclaw/openclaw/pull/141654) `fix: preserve native CLI auth status in model lists` (obviyus)
- **会话恢复与测试基础设施** — [PR #141629](https://github.com/openclaw/openclaw/pull/141629) `improve: reduce session recovery import overhead` (steipete)；[PR #141650](https://github.com/openclaw/openclaw/pull/141650) `refactor(tests): remove duplicate memory resolver cases`；[PR #141637](https://github.com/openclaw/openclaw/pull/141637) `fix(test): preserve process snapshot selection`
- **设备 UX** — [PR #141649](https://github.com/openclaw/openclaw/pull/141649) `fix(devices): use operator labels in node approval notices` (关闭 #141644)
- **Codex 插件分发** — [PR #135970](https://github.com/openclaw/openclaw/issues/135970) 已关闭（`dist/extensions/codex` 缺失 `node_modules`）——修复已进入流水线。
- **浏览器与 UI 优化** — [PR #135648](https://github.com/openclaw/openclaw/pull/135648) `perf(browser): prepare profile defaults in one map`；[PR #141632](https://github.com/openclaw/openclaw/pull/141632) `fix(ui): refresh selected usage details`；[PR #141543](https://github.com/openclaw/openclaw/pull/141543) `chore(i18n): refresh native locales` (已关闭)
- **macOS 守护进程** — [PR #133380](https://github.com/openclaw/openclaw/pull/133380) `fix(daemon): launchd gateway crash loop leaves no stderr` (待维护者审查)
- **CI 冻结版本通道** — [PR #141640](https://github.com/openclaw/openclaw/pull/141640)、[#141648](https://github.com/openclaw/openclaw/pull/141648)、[#141652](https://github.com/openclaw/openclaw/pull/141652) 均为 RomneyDa 提交：将根目录 Docker smoke 绑定到冻结源码，接受旧版同版本 updater 合约，并使用与冻结版本兼容的 Node 运行时进行测试。

**推进的领域：** CI/冻结验证流水线、原生 CLI 认证 UX、测试去重、浏览器 profile 性能、i18n 刷新。维护者 steipete 尤为活跃，单日完成了 6+ 个小型 S/XS 级重构。

---

## 4. 社区热点话题

按评论数排序的热门条目围绕三个核心需求：

**A. Claude-Sonnet-5 与 Codex OAuth 的 Provider/认证可靠性**
- [#135111](https://github.com/openclaw/openclaw/issues/135111) — *17 条评论* — v2026.8.1 上的间歇性 `Provider completed tool call with malformed JSON arguments` (claude-sonnet-5)；约影响 6% 的运行，与文件无关。Platinum Hermit，需在线复现。
- [#89278](https://github.com/openclaw/openclaw/issues/89278) — *11 条评论，👍2* — Codex OAuth 刷新成功，但 cron/heartbeat 因 10s 认证刷新超时失败。Diamond Lobster，回归，已关联待合并 PR。

**B. 多 Agent 生命周期正确性**
- [#43367](https://github.com/openclaw/openclaw/issues/43367) — *14 条评论，👍1* — 并发的 `agents add/config` 互相覆盖、会话锁失败、脱离的子进程工作。自 2026 年 3 月开启——长期存在的稳定性缺口。
- [#126360](https://github.com/openclaw/openclaw/issues/126360) — *16 条评论* — 显式多 Agent 所有权下 `AgentSelectionRequiredError` 刷屏（日志插件、Control UI 全局 RPC、system-agent 轮次）。需要就默认 agent 策略做出产品决策。
- [#137332](https://github.com/openclaw/openclaw/issues/137332) — *6 条评论* — 混合终端 requester-settle 批次在所有权校验后无限重试（Diamond Lobster，修复形态已明确）。

**C. 上下文窗口与会话记录生命周期**
- [#115908](https://github.com/openclaw/openclaw/issues/115908) — *16 条评论* — 持续写入下，会话记录投影协调可能陷入活锁，阻塞主线程并卡住所有 channel 传输（Diamond Lobster，已确认源码可复现）。
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — *13 条评论* — 同步 agent 持久化和会话记录维护在大规模下阻塞 Gateway 事件循环。与 #115908 相关。
- [#117262](https://github.com/openclaw/openclaw/issues/117262) — *8 条评论，👍2* — SQLite 争用：`state/openclaw.sqlite` 上 3 个并发写句柄导致约 33s 的事件循环卡顿（DEF-61）。
- [#140620](https://github.com/openclaw/openclaw/issues/140620) — *4 条评论* — 原地升级 2026.7.1-2 → 2026.9.2：会话记录协调导入 27/~1500 会话后卡住；升级前的会话无法通过 `sessions_search` 找到。**直接影响走升级路径的用户。**

**社区底层诉求：** 用户希望获得可靠的长时间运行、多通道的 Agent，在持续负载下不会静默丢失上下文、泄漏会话或卡死事件循环。记录/所有权/认证这三条信任支柱需要在下次发布前加固。

---

## 5. Bug 与稳定性

### P0（发布阻塞 / 阻塞发布的 UX）

| Issue | 标题 | 修复 PR？ |
|---|---|---|
| [#140908](https://github.com/openclaw/openclaw/issues/140908) | `doctor --fix` / `gateway status --deep` 在 systemd --user 下调用 `systemctl --user is-enabled` 因 EACCES 失败，阻塞所有升级后迁移 | 无开放 PR |
| [#140620](https://github.com/openclaw/openclaw/issues/140620) | 原地升级 2026.7.1-2 → 2026.9.2 在 27/~1500 会话处卡住会话协调 | 无开放 PR |
| [#140497](https://github.com/openclaw/openclaw/issues/140497) | Discord 配置将 application ID 误作为 bot token 接受，标记 channel 已配置但从未启动（lastError=null） | 无开放 PR |
| [#89278](https://github.com/openclaw/openclaw/issues/89278) | Codex OAuth 刷新成功，但 cron/heartbeat 因 10s 认证刷新超时失败 | 关联 PR 待合并 |

### P1（高严重度）

| Issue | 标题 | 备注 |
|---|---|---|
| [#135111](https://github.com/openclaw/openclaw/openclaw/issues/135111) | claude-sonnet-5 (v2026.8.1) 上间歇性畸形 JSON 参数 | 回归；需在线复现 |
| [#97616](https://github.com/openclaw/openclaw/openclaw/issues/97616) | 未回收的 hook/tool 子进程 → 僵尸进程累积 | 自 2026 年 6 月起的回归 |
| [#126360](https://github.com/openclaw/openclaw/openclaw/issues/126360) | 显式所有权下 `AgentSelectionRequiredError` 刷屏 | 需要产品决策 |
| [#115908](https://github.com/openclaw/openclaw/openclaw/issues/115908) | 会话记录协调活锁卡住主线程 | 已确认源码可复现 |
| [#119720](https://github.com/openclaw/openclaw/openclaw/issues/119720) | 同步 agent 持久化在大规模下阻塞 Gateway 事件循环 | Diamond Lobster |
| [#136183](https://github.com/openclaw/openclaw/openclaw/issues/136183) | 命令执行器在 banner 阶段因 SIGTERM 卡在 ssh 生成（2026.8.1 回归） | 无开放 PR |
| [#140010](https://github.com/openclaw/openclaw/openclaw/issues/140010) | Windows 上的休眠/唤醒：唤醒后 30-60s+ 重连失败 | 无开放 PR |
| [#137613](https://github.com/openclaw/openclaw/openclaw/issues/137613) | 预压缩内存刷新在 CLI 后端被禁用 | 修复命中 compactionCount 陷阱 |
| [#139578](https://github.com/openclaw/openclaw/openclaw/issues/139578) | 2026.9.2 中 llama.cpp 管理的 EmbeddingGemma 以 ubatch 512 运行 | 可能源自 #134389 的回归 |
| [#137927](https://github.com/openclaw/openclaw/openclaw/issues/137927) | 内部上下文块泄漏至 Telegram 消息文本（安全相关） | 无开放 PR |
| [#117262](https://github.com/openclaw/openclaw/openclaw/issues/117262) | SQLite 争用导致 33s 事件循环卡顿（DEF-61） | 无开放 PR |
| [#118018](https://github.com/openclaw/openclaw/openclaw/issues/118018) | 陈旧的子 agent 完成投递到已替换的 requester 生命周期 | Diamond Lobster |
| [#101793](https://github.com/openclaw/openclaw/openclaw/issues/101793) | Signal 上工具调用前的助手文本被丢弃 | 关联 PR 待合并 |
| [#125764](https://github.com/openclaw/openclaw/openclaw/issues/125764) | Telegram 适配器在一次尝试后对外发发送进行 dead-letter | 无开放 PR |
| [#121232](https://github.com/openclaw/openclaw/openclaw/issues/121232) | memory-core dreaming：ranker 永远提升 0 个候选项 | Diamond Lobster |
| [#113701](https://github.com/openclaw/openclaw/openclaw/issues/113701) | 上下文溢出：大型工具输出，压缩无法恢复 | Silver Shellfish |
| [#140129](https://github.com/openclaw/openclaw/openclaw/issues/140129) | 2026.9.2 中 Anthropic 缓存卡在约 46k 前缀，重写历史指纹 | 无开放 PR |
| [#140971](https://github.com/openclaw/openclaw/openclaw/issues/140971) | 飞书插件工具在消息驱动运行中被静默丢弃（2026.7.1-2 → 2026.8.1 回归） | 无开放 PR |

**严重度集中度：** 今日 4× P0 + 15× P1。**会话记录/所有权/事件循环** 是主导主题；在投影协调与 SQLite 写入队列上做一个协同修复，就可能同时推动多个头部 Issue 取得进展。

---

## 6. 功能请求与路线图信号

**可能的近期版本（未来 1–2 个版本）：**

- **Telegram bot-to-bot / guest-bot 支持** — [#79077](https://github.com/openclaw/openclaw/issues/79077) (closed-stale, 8 👍, 15 条评论)。对应 Telegram 5 月 7 日的平台特性；高 👍 表明社区诉求强烈；随着新 channels SDK 工作可能重新浮出水面。
- **暴露已解析的后端模型** — [#51441](https://github.com/openclaw/openclaw/issues/51441) (8 条评论, 1 👍) — `session_status` 应在路由代理（LiteLLM）别名的情况下报告实际使用的模型。对成本追踪和调试很有用；与 [`openclaw models status --agent --probe`](https://github.com/openclaw/openclaw/issues/89278) 的使用模式一致。
- **聊天中的推理流** — [#42276](https://github.com/openclaw/openclaw/issues/42276) (6 条评论)。类 OpenAI/Grok 的流式思考指示器；已有 `/reason` channel 但不会覆盖实时内容。明确的 UX 改进点。
- **工具返回后脱离管理的 Lobster 运行** — [#126781](https://github.com/openclaw/openclaw/issues/126781) — 作者指出 OpenClaw 2026.9.1 已覆盖"该请求的大部分"；为后续工作细化范围。
- **WhatsApp 仅监听 / 仅 hooks 模式** — [#78963](https://github.com/openclaw/openclaw/issues/78963) — 不调用 LLM 的归档/ETL 场景。可能与更广泛的 hooks 表面配套。
- **使 Workboard 卡片备注可点击** — [#141472](https://github.com/openclaw/openclaw/issues/141472) — 推动 Workboard 采用的小型 UX 改进。

**中期（可能的路线图，但非近期）：**

- **针对 cron 和 heartbeat 的每任务高权限执行作用域** — [#41484](https://github.com/openclaw/openclaw/issues/41484) — 仅支持通配符的高权限作用域是多用户场景下的安全限制；需要安全审查。
- **脱离管理的 Lobster 运行** [#126781](https://github.com/openclaw/openclaw/issues/126781) — 审批、恢复、取消跟踪集成到 TaskFlow。
- **跨已清洗历史的原生缓存复用** — [#140129](https://github.com/openclaw/openclaw/issues/140129) 作为 bug 提交，但包含明确的功能诉求。

---

## 7. 用户反馈摘要

**主要痛点（直接引自 Issue 正文）：**

1. **多通道 Telegram/Discord/Signal 一致性回归。** 用户明确指出 v2026.8.1 / 2026.8.2 破坏了原本可用的 channel 行为——引用消息丢失内容（#101793 Signal）、`file://` URI 出现 markdown 泄漏（#137705）、内部上下文块作为可见文本泄漏（#137927）、一次尝试后 send 进入 dead-letter（#125764），以及 Discord `/new` 返回 "No reply was generated" 而不重置会话（#140535）。情绪：高度挫败；channel 是旗舰功能。

2. **升级痛点。** 多个用户（如 #135111、#140620、#140908、#106920 已关闭）在执行 `openclaw update` 后*立即*遇到阻塞问题。2026.7.x → 2026.8.x → 2026.9.x 这条升级链至少记录了三条"升级即破坏"的路径。对升级命令的信任正在下降。

3. **macOS 守护进程静默失败。** [#140010](https://github.com/openclaw/openclaw/issues/140010)（Windows 休眠/唤醒）、[#133380](https://github.com/openclaw/openclaw/pull/133380) PR（launchd 崩溃循环，stderr 为空）、[#97616](https://github.com/openclaw/openclaw/issues/97616)（macOS 上的僵尸子进程）——macOS LaunchAgent 的整体情况被一致反映为不透明。

4. **Provider 锁定顾虑。** 多条 P1（#89278 Codex OAuth、#135111 Claude-Sonnet-5）使单家 provider 的故障上升到 P1。用户希望有更清晰的失败模式，而不仅仅是重试。

5. **积极信号：**
   - steipete、vincentkoc、RomneyDa、fuller-stack-dev 等维护者活动密集。
   - `i18n`、`tests` 和小型重构周转迅速。
   - [#135970](https://github.com/openclaw/openclaw/issues/135970)（Codex `dist` 缺失 `node_modules`）在 24 小时内关闭——修复形态清晰。
   - 积极的外部贡献者参与（maintainer-allowed-edit 政策运转良好）。

**用例信号：** Workboard/TaskFlow 用于看板式 agent 工作（[\#141472](https://github.com/openclaw/openclaw/issues/141472)）、通过 WhatsApp hooks 自动归档（[\#78963](https://github.com/openclaw/openclaw/issues/78963)）、路由代理/成本可观测性（[\#51441](https://github.com/openclaw/openclaw/issues/51441)），以及长生命周期夜间内存整合（[\#121232](https://github.com/openclaw/openclaw/issues/121232)）——OpenClaw 正在被当作基础设施使用，而非一次性聊天客户端。

---

## 8. 待办积压观察 — 需要维护者关注的事项

**长期未回复的高优先级未关闭事项：**

| 事项 | 存在时间 | 卡住原因 |
|---|---|---|
| [#43367](https://github.com/openclaw/openclaw/issues/43367) 多 Agent 编排不稳定性 | 自 **2026-03-11** 开启（6 个月） | `needs-product-decision`、`needs-security-review`、`linked-pr-open` —— 并发 agent add/config 语义的基础性问题 |
| [#42276](https://github.com/openclaw/openclaw/issues/42276)

---

## 横向生态对比

# 跨项目对比报告：个人 AI 助手 / Agent 开源生态
**数据窗口：2026-09-08（24 小时）· 项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw**

---

## 1. 生态总览

开源个人 AI 助手赛道已经从「聊天客户端」明显演化为「常驻基础设施」：五个项目的 issue 队列几乎都被守护进程生命周期、cron/心跳调度、崩溃恢复持久化以及原地升级路径占据，而不是对话功能。五个项目中有四个在 **上下文/对话记录完整性** 方面存在严重未修复 bug——静默丢上下文已成为该生态的头号信任问题。Provider 异构化（BYO 端点：LM Studio、DeepSeek、GLM、Bedrock、LiteLLW 类网关、OAuth 流程）已成标配，硬编码的模型假设在生产环境数日内就会翻车（OpenAI 在 2026-09-07 下线 gpt-5.5，直接导致 Hermes 的 image_gen 插件整体瘫痪）。最后还能看到一个反常的元趋势：项目正在用 AI agent 对自身开发进行 dogfood（QwenPaw 的 QPQAT 机器人 PR、由 agent 起草的 bug 报告、IronClaw 的自动化失败分类）。

---

## 2. 活跃度对比

| 项目 | 24h Issues（开/关） | 24h PRs（开/合并-关） | 关闭率（issues/PRs） | 发布状态 | 健康度评分 |
|---|---|---|---|---|---|
| **OpenClaw** | 482（238/244） | 500（264/236） | 51% / 47% | 无；2026.9.2 系列暂稳 | **B+** — 吞吐量领先约 5–10 倍，但 4 个 P0 + 15 个 P1 未关，维护者评审是瓶颈 |
| **QwenPaw** | 39（23/16） | 48（30/18） | 41% / 38% | v2.2.0（约 1 周前发布）；预计出补丁 | **B+** — 平衡度最佳：积极分诊发布后回归浪潮，3 位新晋贡献者，仍有 3 个 critical 未修 |
| **Hermes Agent** | 50（45/5） | 48（48/2） | 10% / 4% | v0.21.1 补丁已发（rollup tag） | **B−** — 大型在飞改动集，补丁纪律保持，但 Windows 更新 + profile 隔离方向聚集 P1 |
| **ZeroClaw** | 30（26/4） | 50（46/4） | 13% / 8% | 无；当前 v0.8.5 | **C+** — 深度用户在提交精准报告，但 6:1 开/关比加上累积的 XL PR 队列和一个未关的 S0 数据丢失 bug |
| **IronClaw** | 1（1/0） | 5（5/0） | 0% / 0% | 无 | **C** — 安静的维护者驱动迭代；窗口内零社区互动信号 |

---

## 3. OpenClaw 的定位

**相较同侪的优势：**
- **规模与社区：** 24 小时内触达约 982 条 tracker 条目，而 QwenPaw 87 条、Hermes 100 条、ZeroClaw 80 条、IronClaw 6 条。没有任何项目能接近这个量级，这让 OpenClaw 拥有最深的 bug 发现、特性信号挖掘以及外部贡献者池（允许维护者直接编辑的策略是奏效的）。
- **覆盖面广：** 是唯一同时在多 agent 编排、五大消息渠道（Telegram/Discord/Signal/WhatsApp/Feishu）、Workboard/TaskFlow、记忆整合上都有深度的项目——用户把它当基础设施用，而不是客户端。
- **确定形态 bug 的修复速度：** #135970（Codex `dist` 打包）在 24 小时内关闭。

**劣势：**
- **未解决的严重度积压：** 4 个 P0（systemd EACCES 阻塞所有迁移、27/~1500 会话处升级卡住、Discord 误配置、Codex OAuth）均无对应修复 PR；许多 P1 卡在 `needs-product-decision` 标签上——瓶颈是评审吞吐量，而不是工程能力。
- **架构压力：** Node.js 单 event-loop 模型是其头部问题群的系统性根因（transcript reconcile livelock #115908、sync 持久化阻塞 #119720、SQLite 争用 33 秒卡顿 #117262）。ZeroClaw 的 Rust/Tokio 守护进程则避开了 event-loop 卡顿（它的失败反而是重载时的栈溢出和 turn 状态机 bug）。
- **升级信任流失：** 在 2026.7→2026.9 升级阶梯中记录到三条「升级即崩溃」路径——比 QwenPaw v2.2.0 后那一波单次回归风险更尖锐。

**社区规模对比：** OpenClaw > Hermes ≈ ZeroClaw（技术型、精准报告者） > QwenPaw（覆盖面广、多渠道、CJK 占比高） >>> IronClaw（实际上无社区）。

---

## 4. 共同技术关注方向

| 关注方向 | 涉及项目 | 具体诉求 |
|---|---|---|
| **上下文/对话记录持久化完整性** | OpenClaw、QwenPaw、ZeroClaw、（Hermes：WAL 脑裂 #102589） | 崩溃安全的 turn 持久化（ZeroClaw #10121，S0），不能静默丢弃回复（QwenPaw #7579），不能 reconcile livelock（OpenClaw #115908），升级安全的会话迁移（OpenClaw #140620） |
| **异构 provider / 自带模型支持** | 全部 5 个 | LM Studio/DeepSeek/GLM/WUSRouter 边界场景（QwenPaw）、OAuth 刷新超时（OpenClaw #89278）、自定义 provider 超时查询（Hermes #105371）、Bedrock cachePoint 紧急开关（ZeroClaw #8720）、禁止硬编码模型绑定 |
| **多渠道消息对等性** | 全部 5 个 | 语音转写（ZeroClaw #10688/#10689）、Markdown/BiDi 渲染（QwenPaw #2120、#7585）、死信重试（OpenClaw #125764）、Slack 频道状态消歧（IronClaw #8076） |
| **并发 / 多 agent 正确性** | OpenClaw、ZeroClaw、QwenPaw、Hermes | 并行 turn 交错（ZeroClaw #10408）、agent 所有权策略（OpenClaw #126360）、任务中消息排队 vs 409（QwenPaw #7559）、多路复用网关上的 profile 隔离（Hermes #105396） |
| **安全与信任边界** | Hermes、ZeroClaw、QwenPaw、OpenClaw | 带认证的带外通道（Hermes #81828 steer-marker 伪造）、工作区隔离与内部主体（ZeroClaw #9977、#10425）、受保护的执行契约（QwenPaw #7526）、context-block 泄漏（OpenClaw #137927） |
| **Prompt cache 正确性与成本核算** | ZeroClaw、OpenClaw | 可配置的 cache_control TTL/breakpoint（ZeroClaw #10663/#10662）、卡死的前缀 cache 重写（OpenClaw #140129） |
| **桌面端 / 安装器可靠性** | Hermes、OpenClaw、QwenPaw | Windows 更新退出码（Hermes #105145）、launchd 崩溃循环（OpenClaw #133380）、macOS TCC（QwenPaw #7614） |
| **作为可插拔子系统的记忆模块** | QwenPaw、OpenClaw | 带生命周期契约的记忆后端插件架构（QwenPaw #7561/#7616）、可靠的夜间合并（OpenClaw #121232） |

---

## 5. 差异化分析

- **OpenClaw** — *自托管玩家的瑞士军刀式基础设施。* 覆盖面最广（多 agent + 多渠道 + 记忆 + 看板）；TypeScript/Node 网关配 SQLite 状态；规模是它的护城河，单线程阻塞是它的代价。
- **Hermes Agent** — *桌面优先、具备多租户野心的个人助手。* 桌面打包（Windows/macOS）扎实，共享网关上有 profile 级隔离，并且拥有最超前的 **安全边界思考**（steer-marker 认证、出站授权、文件隔离）。NousResearch 系出身让它在模型侧做了不少实验（Collective Wisdom Agent V1、跨组织知识共享）。
- **IronClaw** — *企业集成后端，不是社区项目。* Slack/共享频道语义、OpenAI 兼容面齐平；具备独特的 **基准驱动的质量文化**（每日失败分类，把失败归因到上游模型质量 vs. 产品缺陷）。节奏基本封闭。
- **QwenPaw** — *BYO 模型与 CJK 市场的冠军。* 对本地/小众端点以及 WeChat/QQ/Feishu 渠道支持最深；唯一拥有插件/技能市场并由此产生生态活跃度的项目；并且做出了最大胆的架构动作（破坏性的 memory 插件重构）。也是在 AI 辅助开发上表态最明确的（QPQAT agent PR 团队）。
- **ZeroClaw** — *性能与协议优先的运维工具。* Rust/Tokio；面向编辑器集成（Zed）的 ACP/ZeroCode turn 生命周期；独此一家专注 **Anthropic prompt cache 经济性**。发布节奏最弱，积压 PR 最重。

---

## 6. 社区势能与成熟度

- **Tier 1 — 巨量速度，规模化压力（OpenClaw）：** 5–10 倍于同侪的体量；风险已经从「会不会有人贡献」转移到「维护者能不能评审过来」。产品决策标签的积压是卡点。
- **Tier 2 — 健康迭代（QwenPaw、Hermes）：** QwenPaw 是当下生态里跑得最稳的 tracker（41%/38% 关闭率、贡献者流入、通过 merge-freeze CI 强化发布流程）。Hermes 处于过渡季——补丁已发，一大批特性在路上（v0.22 信号：subagent picker UX、可脚本化的模型发现）。
- **Tier 3 — 活跃但停滞（ZeroClaw）：** 深度用户在提交行号级别的精准 S0 报告，但 8 个 XL PR 积压 3–8 周（其中三个处于 `do-not-merge`/`blocked`/`stale`），加上单一贡献者（Audacity88）的巴士因子集中，是值得警惕的信号。
- **Tier 4 — 安静（IronClaw）：** 稳定的内部迭代，零社区信号；路线图只能从 PR 流里读。

**快速迭代中：** OpenClaw、QwenPaw。**趋于稳定：** Hermes。**有漂移风险：** ZeroClaw（积压）、IronClaw（社区缺位）。

---

## 7. 趋势信号

1. **上下文完整性是信任战场。** 静默丢上下文或对话记录丢失出现在 4/5 个项目中，并已造成实际损失（QwenPaw #7571：「在运行时部署了错误的代码」）。崩溃安全、并发安全的持久化应当是任何 agent 构建者的 v1 课题，而不是事后加固项。
2. **Provider 是不稳定的依赖。** 模型下线（gpt-5.5）、OAuth 超时回归、端点怪癖在各处 P1 队列里都占大头。**永远不要硬编码模型标识；运行时解析并暴露真正路由到的模型**（参见 OpenClaw #51441、Hermes #105435、ZeroClaw #8966——三个项目独立收敛到同一结论）。
3. **Prompt cache 核算正在变成用户可见特性。** cache marker 放置 bug 表现为成本泄漏；可配置性（TTL、breakpoint、按 provider 禁用）是近期差异化点（ZeroClaw 领先）。
4. **安全正在从 prompt 走向原语：** HMAC 认证的带外通道、内部主体身份、工作区隔离、受保护执行契约——预计这些会变成 agent 平台的标配原语。
5. **记忆正在演化为可插拔、可版本化的子系统**，不再是烤进状态机里的固定部分（QwenPaw 的破坏性重构是先行指标）。
6. **升级信任是留存指标：** OpenClaw 和 QwenPaw 都展现出可被观测到地侵蚀用户好感的回归浪潮；发布流程加固（merge-freeze、冻结版本 CI lane）正在成为新的应对手段。
7. **Agent 写 Agent：** bot 提交的 PR、agent 起草的 bug 报告、自动化失败分类正在让 AI 辅助维护成为常态——对那些能安全驾驭它的项目来说，这是竞争优势。

**一句话总结：** OpenClaw 在规模和广度上领先，但必须在下次发布前把吞吐量转化为解决率；QwenPaw 是最值得关注的最佳中型项目；Hermes 以安全与多租户拉开身位；ZeroClaw 占据性能/成本生态位但需要评审产能；IronClaw 是一场安静的企业押注。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-08

## 1. 今日概览

Hermes Agent（`NousResearch/hermes-agent`）在过去 24 小时内展现了极高的开发节奏，涉及 50 个 issue 和 50 个 PR。活跃度明显偏向未完成工作（45 个 issue、48 个 PR 仍处于活跃状态），而关闭数量较少（5 个 issue、2 个 PR 已合并/关闭），说明当前处于大规模在飞变更集阶段，而非稳定化周期。一个补丁版本已发布（v0.21.1 / tag v2026.9.7），描述为自 v0.21.0 以来的 main 分支汇总——即面向下游稳定性的 tag，而非功能发布。今日流量中的主导主题包括：多路复用网关下的 profile 级资源隔离（MCP server、state DB、profile）、Windows 桌面端的更新/可靠性缺陷、沙箱与工具链管道（cua、terminal env_type、kanban stop-guard），以及围绕 steer-marker、文件隔离区和 relay egress 授权的一组安全/边界问题。

## 2. 版本发布

- **[v2026.9.7 — Hermes Agent v0.21.1](https://github.com/NousResearch/hermes-agent/releases/tag/v2026.9.7)**（2026 年 9 月 7 日）
  - 补丁版本；自 v0.21.0 以来对 `main` 分支进行汇总，面向已 tag 部署和下游消费者。
  - 基准 commit 为 `6178e9f4eed8d99f4fc550add939d58c7bed6206`。
  - **未声明破坏性变更或迁移说明。** 这是一个标记版本，v0.21.0 → v0.21.1 可直接替换。

## 3. 项目进展

过去 24 小时内已合并/关闭的 2 个 PR 未出现在按评论数排序的前 20 个 PR 样本中；采样的全部 20 个 PR 仍为 OPEN。今日关闭的 5 个 issue 集中在安装/更新流程以及会话/通知边界场景：

- [#101147 (closed)](https://github.com/NousResearch/hermes-agent/issues/101147) — 密封 venv（uv2nix/wheel/Docker）中的 `pyproject.toml` 的 `py-modules` 字段缺失 `hermes_state_registry`，导致 `state.db` 不可用。修复仅为注册补全；可干净地回移植到 v0.21.x。
- [#98680 (closed)](https://github.com/NousResearch/hermes-agent/issues/98680) — macOS 桌面端约 30 秒的 keep-alive transcript 滴答闪烁 composer 并抢占光标焦点。
- [#96070 (closed)](https://github.com/NousResearch/hermes-agent/issues/96070) — 无 `api_server` adapter 的原始会话中，异步委派监听通知被静默丢弃。
- [#57645 (closed)](https://github.com/NousResearch/hermes-agent/issues/57645) — macOS 应用内桌面更新关闭后未执行安装（与既有修复线重复）。
- [#85575 (closed)](https://github.com/NousResearch/hermes-agent/issues/85575) — 由 dispatcher 创建的会话所生成的 Kanban 卡片继承了临时通知目标。

净效果：今日关闭项解决了三处状态/生命周期正确性 bug 和两处 macOS 桌面端 UX 缺陷；全部为低至中风险，且未引入对非受影响用户可见的行为变更。

## 4. 社区热议话题

按评论量排序，今日最受关注的讨论集中在配置 UX、多路复用下的隔离以及安全三类：

1. **[#67347 — Advanced Settings 中 Subagent 模型与 Provider 的引导式选择器（9 条评论）](https://github.com/NousResearch/hermes-agent/issues/67347)** — 作者：DavidMetcalfe。Desktop 与 Dashboard 中的自由文本字段 `delegation.model` / `delegation.provider` 容易混淆。底层需求：与父级模型选择器一致的一级 subagent 路由发现 UX。
2. **[#96532 — 在 fleet profile 侧栏中隐藏应用托管的 'This device' 网关（5 条评论，👍2）](https://github.com/NousResearch/hermes-agent/issues/96532)** — 作者：nikhilnair31。仅使用远端网关的 Windows 桌面端用户仍会在侧边栏中看到本地 runtime 自动注册的网关。需求：允许退出本地应用托管连接自动注册。
3. **[#101147 — 密封 venv 缺失 `hermes_state_registry`（5 条评论，closed）](https://github.com/NousResearch/hermes-agent/issues/101147)** — 作者：Headscracher。一个具体的打包 bug；修复后关闭。
4. **[#92478 — `skills_guard` 将技能自身的 denylist 误判为访问行为（4 条评论）](https://github.com/NousResearch/hermes-agent/issues/92478)** — 作者：yotamleo。显式拒绝读取凭据类文件（如 `authorized_keys`、`~/.aws/credentials`）的技能本身被标记为 critical。表明威胁扫描器在解析与语义之间存在落差。
5. **[#81828 — Steer-Marker 可被模型自行伪造（3 条评论）](https://github.com/NousResearch/hermes-agent/issues/81828)** — 作者：birle274。静态明文 `[OUT-OF-BAND USER MESSAGE …]` 标记可被模型自身复制，从而破坏 `/steer` 的信任边界。需求：在带外通道上引入认证机制（HMAC/nonce/secret）。

跨领域总结：社区反馈最强烈的信号聚焦于 *带内信任*（skills_guard denylist 误报、steer-marker 伪造、PR [#99220](https://github.com/NousResearch/hermes-agent/pull/99220) 中的 relay egress 授权）以及单网关多路复用多个 profile 时的 *跨 profile 隔离*（PR [#104534](https://github.com/NousResearch/hermes-agent/pull/104534)、[#105396](https://github.com/NousResearch/hermes-agent/issues/105396)、[#105405](https://github.com/NousResearch/hermes-agent/issues/105405)）。

## 5. Bug 与稳定性

按优先级与影响排序：

### P1 — 必须修复

- **[#105145 — Windows `hermes update` 在成功后仍始终报告 FAILED（exit 8）](https://github.com/NousResearch/hermes-agent/issues/105145)** — 作者：rickykan。`scripts/desktop-update/windows.ps1` 中更新后校验步骤解析工作目录错误，影响所有通过应用内交接执行更新的 Windows 桌面端用户。**暂无可见修复 PR。**
- **[#102589 — `cron/lifecycle_guard` 直接打开 `state.db` 导致 POSIX 锁丢失 → WAL 脑裂](https://github.com/NousResearch/hermes-agent/issues/102589)** — 作者：aoeman84。cron 命令中的类路径 token 触发对网关自身 `state.db` 的 `os.open()`，释放掉网关持有的全部 POSIX 锁。**P1，今日样本中暂无修复 PR。**
- **[#105396 — 多路复用网关下非默认 profile 拿不到 MCP server](https://github.com/NousResearch/hermes-agent/issues/105396)** — 作者：wbrione。scope 标签与按名称的发现机制绑定；在非默认 profile 上 `/reload-mcp` 会报告 "No MCP servers connected"。很可能由 PR [#104534](https://github.com/NousResearch/hermes-agent/pull/104534)（同区域）修复。
- **[#105228 — 默认 profile 下新建与已有会话报错](https://github.com/NousResearch/hermes-agent/issues/105228)** — 作者：DylanJMuller。TUI 网关启动时报 `Profile '.hermes' does not exist`。**P1，暂无可见修复 PR。**

### P2 — 应当修复（节选）

- **[#104402 — Reasoning model 的 stale floor 抑制本地端点解除](https://github.com/NousResearch/hermes-agent/issues/104402)** — 作者：purewebs。运行在本地端点的自托管模型会被套上 180 秒的云端 stale floor 超时。属于配置与运行时的契约问题。
- **[#105371 — 命名自定义 provider 忽略 `stale_timeout_seconds` / `request_timeout_seconds`](https://github.com/NousResearch/hermes-agent/issues/105371)** — 作者：JordiPosthumus。provider 查询使用了 `providers["custom"]` 而非 `providers["custom:<name>"]`。
- **[#105405 — 锁顺序死锁：`load_hermes_dotenv()` 在 `_CONFIG_LOCK` 内调用 `_SECRET_SOURCE_CACHE_LOCK` → watchdog exit 75](https://github.com/NousResearch/hermes-agent/issues/105405)** — 作者：franciscoabad-founder。reload 场景下网关事件循环冻结。
- **[#105427 — Gateway lifecycle scanner 拒绝 Python 目录字面量与绝对解释器二进制路径](https://github.com/NousResearch/hermes-agent/issues/105427)** — 作者：RouteRefund。`cron/lifecycle_guard.py` 对良性 REST/RSS 收集器产生误报。
- **[#105399 — `/skills diff <id>` 在 pending create 操作下返回空批次上下文](https://github.com/NousResearch/hermes-agent/issues/105399)** — 作者：arty-hlr。
- **[#105186 — TUI 网关崩溃：`FileNotFoundError: Profile 'hermes' does not exist`](https://github.com/NousResearch/hermes-agent/issues/105186)** — `tui_gateway/server.py` 中的后台线程崩溃，可能与 #105228 相关。
- **[#105398 — `image_gen/openai-codex` 中硬编码的 `gpt-5.5` host model 在已下线账号上失效](https://github.com/NousResearch/hermes-agent/issues/105398)** — 作者：zbabiarz。OpenAI 于 2026-09-07 移除了 `gpt-5.5`，该 pin 导致该插件 100% 失败。
- **[#92478 — `skills_guard` 误判技能自身 denylist（见 §4）](https://github.com/NousResearch/hermes-agent/issues/92478)** — 修复 PR 为 **[#92632](https://github.com/NousResearch/hermes-agent/pull/92632)**，作者 jackulau，目前 OPEN。

### P3 — 可选修复

- **[#105383 — Zed 1.18+ 中缺失 ACP 模型选择器（adapter 仍使用旧 API）](https://github.com/NousResearch/hermes-agent/issues/105383)** — 作者：iyabot。ACP v1.3.0 已切换至 `configOptions`，Hermes adapter 仍基于 session-models。
- **[#105412 — Codex app-server 在 v0.21.1 上重复计算缓存输入](https://github.com/NousResearch/hermes-agent/issues/105412)** — 作者：Atroci。由既有 PR [#63654](https://github.com/NousResearch/hermes-agent/pull/63654) 跟踪；与 #48801 重复。
- **[#105404 — 工具循环停止响应将用户引导至不可见的工具结果](https://github.com/NousResearch/hermes-agent/issues/105404)** — 修复 PR 为 **[#105424](https://github.com/NousResearch/hermes-agent/pull/105424)**（OPEN），作者 kokhlo。

稳定性解读：P1 集群集中在 Windows/桌面更新流程以及多路复用网关的 profile 模型。多处 P2 bug 属于 *配置查找* 类缺陷（timeout/provider 查询），表明声明式配置与运行时解析之间出现漂移——这是一个值得维护者集中梳理的系统性方向。

## 6. 功能请求与路线图信号

今日提交的用户驱动功能请求：

- **[#67347 — Subagent 模型与 Provider 的引导式选择器](https://github.com/NousResearch/hermes-agent/issues/67347)** — 评论已达 9 条；与 PR [#105431](https://github.com/NousResearch/hermes-agent/pull/105431)（辅助模型设置中的委派 reasoning）和 [#105435](https://github.com/NousResearch/hermes-agent/pull/105435)（可脚本化的 `hermes models --json`）方向一致。**很可能进入下个次版本。**
- **[#105235 — 流式 TTS：独立调节首句](https://github.com/NousResearch/hermes-agent/issues/105235)** — 作者：francip。稳态批处理延迟导致短英文开场语被推迟。
- **[#105408 — Kanban orchestrator：原生审计的 dependency-unlink 工具](https://github.com/NousResearch/hermes-agent/issues/105408)** — 作者：AKAICH00。原 Kanban 界面暴露 link 但无 unlink，尽管后端 endpoint 已存在。工具表面存在 parity gap。
- **[#105422 — PDF skill：专业文档生成默认值（重复）](https://github.com/NousResearch/hermes-agent/issues/105422)** — 作者：TheSkyhan。默认 PDF skill 产生纯白页面；需要设计系统级默认值。
- **[#105420 — macOS：本地终端一致性 + 通过 chat_completions 强制工具调用（重复）](https://github.com/NousResearch/hermes-agent/issues/105420)** — 作者：TheSkyhan。

已与上述请求匹配的 PR（前瞻信号）：

- **[#105434 — Desktop：编辑既有 Goal/Loop/Heartbeat 自动化](https://github.com/NousResearch/hermes-agent/pull/105434)** — 叠在 #104716 之上。
- **[#105431 — CLI：在辅助模型设置中配置委派 reasoning](https://github.com/NousResearch/hermes-agent/pull/105431)** — 与 #67347 形成闭环。
- **[#105435 — 模型：可脚本化的 provider 模型发现（`hermes models --json`）](https://github.com/NousResearch/hermes-agent/pull/105435)** — 为 adapter 提供机器可读的模型元数据。
- **[#75502 — Signal：共享账号但 group 归属分离](https://github.com/NousResearch/hermes-agent/pull/75502)** — 长期存在的 opt-in 多 profile Signal 共享。
- **[#94266 — Hermes Collective Wisdom Agent V1](https://github.com/NousResearch/hermes-agent/pull/94266)** — 跨组织知识共享（私有沉淀 → owner 审核发布 → 受控消费）。需要决策；这是在飞功能中最具野心的一个。

对下个次版本（v0.22.x）的预测：

- Subagent 选择器引导式 UX + 可脚本化的 `hermes models --json`（#67347 → #105435/#

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目简报 — 2026-09-08

## 1. 今日概览

2026-09-08 的项目活跃度为**轻到中等，且全部处于合并前阶段**。没有新发布，没有 PR 被关闭或合并，仅有一个自动化 Issue 被开启。过去 24 小时内有 5 个 PR 被更新，其中 4 个是来自同一核心贡献者（`italic-jinxin`）的小型 Web UI 体验优化修复，另有 1 个是针对 Slack 共享频道消歧的小型助手侧修复。唯一的 Issue 是一份周期性的基准测试/失败分类报告，而非社区讨论。总体而言，项目处于稳定的维护与迭代阶段，今日无交付动能。

- Issue 更新（24h）：**1**（开放：1 / 关闭：0）
- PR 更新（24h）：**5**（开放：5 / 合并：0）
- 发布：**0**

## 2. 版本发布

过去 24 小时内无新发布。按规范略去本节。

## 3. 项目进展

今日没有 PR 被合并或关闭，因此过去 24 小时内没有功能正式推进。不过，以下进行中的 PR 显示了活跃迭代，且都在 2026-09-07 更新过——它们是最有可能短期内落地的项目：

- **[#8071](https://github.com/nearai/ironclaw/pull/8071)** — `fix(webui): preserve command result card height`（XS，低风险，核心）。解决会话 flex 列中结构化命令结果卡片塌陷的问题；同时保护内联命令提示与拒绝结果；新增回归覆盖。*状态：2026-09-07 更新，尚未合并。*
- **[#8070](https://github.com/nearai/ironclaw/pull/8070)** — `fix(webui): align slash-command metadata`（XS，低风险，文档/核心）。用响应式网格替换变宽的 flex 行来重排斜杠命令菜单；对齐标题/描述；在窄屏上堆叠元数据；截断过长名称；包含回归覆盖。
- **[#8069](https://github.com/nearai/ironclaw/pull/8069)** — `fix(webui): add dismiss actions to command result cards`（M，低风险，核心）。为成功、命令列表、回退和拒绝结果添加可访问的关闭操作；通过 `Chat` → `MessageList` → `MessageBubble` 贯穿回调；仅选择性地移除临时命令结果消息，不影响持久化的聊天消息。
- **[#8068](https://github.com/nearai/ironclaw/pull/8068)** — `fix(webui): keep the active slash command visible`（S，低风险，文档/核心）。在键盘导航期间保持当前斜杠命令选项可见；悬停时将部分隐藏的选项滚入视口；包含回归覆盖和独立的 Chromium 测试。
- **[#8076](https://github.com/nearai/ironclaw/pull/8076)** — `fix(assistant): distinguish disconnected shared channels`（规模/风险未标注，推断为低）。区分已配对用户的断连共享频道与未配对账户；为用户消息和机器人命令渲染频道专属的引导；在产品、适配器与 OpenAI-compatible 层面保持拒绝分类一致；更新 Slack 能力文档。

净效果：WebUI 的会话/命令结果体验正通过一次协调性的批量更新在渲染、对齐、关闭与键盘导航等方面得到强化，同时 Slack 侧的修正也已排入队列。以上均尚未交付。

## 4. 社区热点话题

今日所有条目的互动信号（表情/评论）均为**零**，这意味着要么社区参与度极低，要么本简报窗口主要被自动化/策划活动占据，而非讨论。

按内在重要性（而非互动量）排列的最值得关注的条目：

- **[Issue #8081](https://github.com/nearai/ironclaw/issues/8081)** — *Daily ironclaw failure taxonomy — 2026-09-07*。一份自动化风格的报告，汇总各基准测试套件中的未通过计数（例如 officeqa 出现 42 次未通过，归因于 DeepSeek-V4-Flash 中模型质量的数值错误）。这是周期性的"ironclaw 失败分类"系列——是一个透明的质量报告通道，而非社区讨论帖。
- **[PR #8069](https://github.com/nearai/ironclaw/pull/8069)** — *Add dismiss actions to command result cards*。今日最大的开放 PR（M 规模），也是最具用户面的 UX 改进；解决了一项长期存在的痛点——用户此前无法清除临时命令输出而不丢失聊天记录。
- **[PR #8076](https://github.com/nearai/ironclaw/pull/8076)** — *Distinguish disconnected shared channels*。跨层面（产品 + 适配器 + OpenAI-compatible）的 Slack 修复，可能是面向多用户/企业部署中杠杆最高的项目。

潜在诉求解读：今日维护者似乎在主导议程，社区保持沉默；主旋律是*临时输出的 UI 交互*与*消息渠道中更清晰的错误语义*。

## 5. Bug 与稳定性

今日明确处理的 Bug（PR 仍处开放状态，尚未合并——尚无修复落地）：

| 严重程度 | 条目 | 涉及区域 | 修复 PR 状态 |
|---|---|---|---|
| 低 | 斜杠命令菜单布局漂移 / 宽度不一致 | webui 渲染 | [PR #8070](https://github.com/nearai/ironclaw/pull/8070) 开放 |
| 低 | 键盘/指针导航时当前斜杠命令选项滚出视口 | webui 可访问性/UX | [PR #8068](https://github.com/nearai/ironclaw/pull/8068) 开放 |
| 低 | 命令结果卡片在会话 flex 列中塌陷 | webui 渲染 | [PR #8071](https://github.com/nearai/ironclaw/pull/8071) 开放 |
| 中（UX） | 无法关闭临时命令结果卡片而不丢失聊天 | webui UX | [PR #8069](https://github.com/nearai/ironclaw/pull/8069) 开放 |
| 低 | 断连的 Slack 共享频道与未配对账户无法区分 | assistant/adapter | [PR #8076](https://github.com/nearai/ironclaw/pull/8076) 开放 |

今日未报告崩溃、安全事件或回归。基准失败分类（[#8081](https://github.com/nearai/ironclaw/issues/8081)）*并非*产品缺陷——它将 officeqa 的失败归因于上游模型质量的数值错误，而非 IronClaw 自身的缺陷，这是一个有用的佐证，表明今日在应用层面的稳定性状况是干净的。所有 Bug 相关 PR 仍处开放状态；**过去 24 小时内没有修复被合并**。

## 6. 功能请求与路线图信号

今日窗口内没有显式的用户提交的功能请求。但进行中的 PR 本身揭示了路线图方向：

- **会话卫生 UX** —— [#8069](https://github.com/nearai/ironclaw/pull/8069)、[#8071](https://github.com/nearai/ironclaw/pull/8071)、[#8068](https://github.com/nearai/ironclaw/pull/8068)、[#8070](https://github.com/nearai/ironclaw/pull/8070) 的聚合表明内部在推动将斜杠命令/命令结果界面打造为一等公民：可关闭、可扫读、对齐良好且支持键盘导航。这看起来像是一个近期的 UI 质量里程碑，很可能打包进下一个 webui 版本。
- **频道状态的多端一致性** —— [#8076](https://github.com/nearai/ironclaw/pull/8076)（产品 + 适配器 + OpenAI-compatible 表面的一致性）信号表明 IronClaw 在作为第三方集成后端（而非仅 UI）方面持续投入。

预测：下一个 webui 版本很可能将 `italic-jinxin` 的四个 webui PR 一起打包为一次"命令结果体验"专项；[#8076](https://github.com/nearai/ironclaw/pull/8076) 则有可能作为另一条并行的 assistant/adapter 发布线。

## 7. 用户反馈摘要

今日 24 小时窗口内的用户反馈信号基本为**零**：每一条目都显示 0 表情和 0 评论。本周期内未出现社区痛点、满意度信号或用例描述。进行中的 PR 反映的是*维护者主观感知*到的 UX 缺口（命令结果卡片塌陷、关闭交互、斜杠菜单对齐、频道消歧），而非用户报告的投诉。请将本节视为数据稀疏，而非对用户情绪的定性结论。

## 8. 待办关注

最需要维护者关注以避免停滞的条目：

- **[PR #8069](https://github.com/nearai/ironclaw/pull/8069)** —— 本批中规模最大（M）；触及 `Chat` → `MessageList` → `MessageBubble` 回调链。审阅成本最高，用户面影响也最大；应优先安排审阅以解锁其他更小的依赖性 UI 修复。
- **[PR #8076](https://github.com/nearai/ironclaw/pull/8076)** —— 跨表面变更（产品、适配器、OpenAI-compatible、文档）。需要跨多个负责人协调，也是最可能被忽略的候选；放置时间越长，合入风险越高。
- **[Issue #8081](https://github.com/nearai/ironclaw/issues/8081)** —— 每日失败分类。预期会有例行的确认/分流处理；否则会在开放 Issue 队列中堆积噪音。
- **[PRs #8070](https://github.com/nearai/ironclaw/pull/8070)、[#8068](https://github.com/nearai/ironclaw/pull/8068)、[#8071](https://github.com/nearai/ironclaw/pull/8071)** —— 三者均为 XS/S，低风险，且已包含回归覆盖。属于低成本合入项，一旦有审阅者签字便可快速发布，尤其适合打包。

本 24 小时窗口内未出现长期未回复（多周以上）的条目，但今日完全没有任何合并活动本身就是积压风险：两位贡献者更新的 5 个 PR 都在等待审阅。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目每日摘要 — 2026-09-08

---

## 1. 今日概览

QwenPaw 今日活动**频繁且健康**:过去 24 小时内更新了 87 条条目(39 个 issue:23 个开放 / 16 个关闭;48 个 PR:30 个开放 / 18 个合并或关闭),未发布新版本 —— 项目仍停留在 **v2.2.0**,距其发布约一周。今天的工程主题是**记忆子系统重大重构**(插件迁移、生命周期统一、Auto-Dream / ReMe 更新),而 issue 列表则被 **v2.2.0 回归与上下文管理 bug** 占据。社区贡献表现尤为亮眼:今天合入了三份首次贡献者 PR,同时 **QPQAT 机器人团队**(如 狄仁杰·Repairer、小乔·FEUnit、秦琼·CIOOps)持续提交由自动化智能体发起的 PR —— 这是智能体框架"自家食用"的典型案例。从 issue 到修复的流转速度(16 个 issue 关闭、18 个 PR 关闭)表明维护者正在积极分流 v2.2.0 发布后的 bug 高峰。

---

## 2. 版本发布

今天没有新版本发布。**v2.2.0 仍为最新发布版本。** 值得注意的背景:issue [#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604) 引用了提交 `ae092fdca6` 与 v2.2.0-beta.4 发布周期(8 月 31 日),已关闭的 CI PR [#7603](https://github.com/agentscope-ai/QwenPaw/pull/7603) 在发布窗口期实现了合并冻结 —— 表明团队正在加强发布流程,大概率是为即将到来的 v2.2.1 补丁或 v2.3.0 做准备。

---

## 3. 项目进展

**今日合并 / 关闭的 PR(共 18 个,精选):**

| PR | 变更 | 意义 |
|---|---|---|
| [#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561) | `refactor(memory)`:统一自动记忆生命周期与动作 | 对 memory-manager 契约的刻意**破坏性重构** —— 记忆改造的基石 |
| [#7603](https://github.com/agentscope-ai/QwenPaw/pull/7603) | `ci`:在发布期间冻结默认分支合并 | 8 月 31 日发布期合并事故后的流程加固 |
| [#7530](https://github.com/agentscope-ai/QwenPaw/pull/7530) | `test(console)`:+245 个单元测试,语句覆盖率 +5.02pp | 第四批 Console 覆盖率冲刺(由 AI 智能体提交) |
| [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) | `fix(providers)`:将字符串类型的工具参数强制转换为 JSON 数字 | 修复长期存在的 MCP 工具调用失败 [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) |
| [#7499](https://github.com/agentscope-ai/QwenPaw/pull/7499) | `fix(console)`:统一导航 / 主题图标 | 针对 [#7376](https://github.com/agentscope-ai/QwenPaw/issues/7376) 的 UI 一致性修复 |

**正在推进中的特性(开放 PR):**
- [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) —— ADBPG 与 PowerContext 记忆后端迁移至插件(完成核心 → 插件抽取)
- [#7486](https://github.com/agentscope-ai/QwenPaw/pull/7486) —— Creator app-plugin v1.1.2:运行时通知总线、多时间线 A/B 对比、T2V/I2V/S2V 调度、Docker 部署
- [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) —— Console 侧边栏 / 设置完整重新设计
- [#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526) —— 智能体的受保护执行 / 澄清 / 授权契约
- [#7521](https://github.com/agentscope-ai/QwenPaw/pull/7521) —— 在上下文压力下折叠已消费的思考块(上下文窗口保护)
- [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) —— 技能版本化与依赖校验
- 首次贡献者:[#7614](https://github.com/agentscope-ai/QwenPaw/pull/7614)(computer-use 的 macOS TCC 辅助重启)、[#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613)(OpenViking 长期记忆后端)、[#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611)(BiDi RTL/LTR 渲染修复)

---

## 4. 社区热门话题

**讨论最多的 issue:**

1. **[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505)**(12 条评论,已关闭)—— 局域网 LM Studio 连接频繁出现"客户端断连" → 重试风暴 → 超时失败。*当日最热话题。*
2. **[#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576)**(5 条评论,开放)—— `RetryChatModel` 硬编码了 32768 token 的上下文兜底,导致所有不同窗口大小的模型失效(`CONTEXT_UNFIT` 错误),在 **v2.1.0–v2.2.0 的所有已发布版本** 中均可复现。
3. **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)**(5 条评论,开放)—— 助手回复已持久化,但在后续请求中缺失("模型看不到自己刚说的话"),报告者还附上了详细的 PyInstaller 逆向分析。
4. **[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)**(5 条评论,开放)—— 在任务进行中发送消息返回 HTTP 409 而非排队。
5. **[#6820](https://github.com/agentscope-ai/QwenPaw/pull/6820)** / [#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820)(5 条评论,已关闭)—— Console UI 在任务完成前不显示任何流式输出。

**深层需求分析:** 热门话题围绕两个主题:**(a) 自托管 / 第三方模型集成**(LM Studio、DeepSeek、WUSRouter、智谱 GLM 用户遇到 provider 边缘不兼容 —— 这是开源助手的关键人群),以及 **(b) 上下文完整性** —— 用户越来越依赖 QwenPaw 处理长时间、有状态的任务,静默的上下文丢失会严重损害信任。多份细节详尽、由 AI 协助生成的 bug 报告(例如 [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597),由智能体起草)显示用户群体具备相当的技术深度。

---

## 5. Bug 与稳定性

按严重程度排序:

| 严重程度 | Issue | 描述 | 修复状态 |
|---|---|---|---|
| 🔴 严重 | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) / [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584)(已作为重复关闭) | 助手回复被静默丢弃 → 工具调用死循环、行为失控 | **尚无修复 PR** |
| 🔴 严重 | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) | 硬编码 32k 上下文兜底导致所有非 32768 窗口模型失效;影响自 v2.1.0 起的每个版本 | **尚无修复 PR** |
| 🔴 严重 | [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) | Heartbeat cron 会话反馈循环 —— 重复消息堆积致智能体无响应约 2 小时;验证仍在 `main` 上存在 | 尚无修复 PR |
| 🟠 高 | [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617) | 工具结果历史中的单个 PDF DataBlock **永久破坏** 纯文本端点的会话(GLM 错误 1210) | 尚无修复 PR |
| 🟠 高 | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) | 任务进行中的消息返回 409 而非排队 | ✅ 修复 PR [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) 开放 |
| 🟠 高 | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | 停止按钮显示已停止,但任务仍在执行 | 尚无修复 PR |
| 🟡 中 | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) | 工具返回的图片 / PDF base64 以裸 `"type":"data"` 发送 → 400 错误 | 尚无修复 PR |
| 🟡 中 | [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572) | Coordinator `_drain()` 吞掉异常栈 —— 无日志、无法调试 | ✅ 修复 PR [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) 开放(首次贡献者) |
| 🟡 中 | [#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513) | deepseek-v4-pro 输出与 QwenPaw 工具调用协议交错 | 尚无修复 PR |
| 🟡 中 | [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587) | Cloudflare 403 挑战阻塞 WUSRouter 模型列表获取 | 尚无修复 PR |
| 🟢 低 | [#7242](https://github.com/agentscope-ai/QwenPaw/issues/7242) | 74 个智能体时 Dashboard 加载超过 6 分钟(Docker) | 自 8 月 24 日开放 |
| 🟢 低 | [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585) | Markdown 表格在 Telegram 上渲染为原始的 `|` / `---` | 开放 |
| 🟢 低 | [#2120](https://github.com/agentscope-ai/QwenPaw/issues/2120) | BiDi(阿拉伯语 / 英语)渲染错误 | ✅ 修复 PR [#7611](https://github.com/agentscope-ai/QwenPaw/pull/7611) 开放 |

**今日已修复 / 关闭:** [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839)(MCP 数字字符串参数,通过 PR [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936))、[#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604)(硬编码 30 秒流空闲超时)、[#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541)(上下文压缩以 `role=user` 注入破坏 DeepSeek)、[#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594)(任务输出三重出现)、[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505)(局域网断连)、[#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820)(流式 UI)。

**稳定性判定:** v2.2.0 发布时伴随一波回归(工作目录选择器、消息排队 / 409、停止按钮语义)。修复速度尚可,但三项严重的上下文 / 会话完整性 bug(#7579、#7576、#7589)截至今天**尚无修复 PR 正在推进**,是当前最大的稳定性风险敞口。

---

## 6. 功能请求与路线图信号

**用户请求:**
- [#7570](https://github.com/agentscope-ai/QwenPaw/issues/7570) —— 自动折叠飞书流式"思考"卡片(报告者已验证本地补丁可用 —— 强合并候选)
- [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601) / [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588)(均已关闭)—— 恢复 v2.1.0 中可输入的工作目录路径输入框,该输入在 v2.2.0 中被移除;关闭说明修复即将合入
- [#4077](https://github.com/agentscope-ai/QwenPaw/issues/4077)(已关闭)—— UI 字体缩放与可点击文件路径

**从 PR 流向看出的路线图信号(v2.3.0 可能的主题):**
1. **记忆即插件** —— [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616)、[#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561)、[#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613)、[#7606](https://github.com/agentscope-ai/QwenPaw/pull/7606):完整的记忆后端插件架构,以及经过重新设计的生命周期契约(显式破坏性变更)。
2. **智能体安全 / 执行契约** —— [#7526](https://github.com/agentscope-ai/QwenPaw/pull/7526)(受保护执行、澄清、授权)。
3. **Console UX 大改版** —— [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) 侧边栏 / 设置重新设计。
4. **技能生态成熟化** —— [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) 版本化 / 依赖校验;[#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) 应用市场的插件更新检测。

**预测:** 短期内将发布 **v2.2.1 补丁**(工作目录回归、通过 [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) 修复的 409 排队、流超时、上下文丢失修复),随后是聚焦于记忆插件架构与 Console 重新设计的 **v2.3.0**。

---

## 7. 用户反馈汇总

- **痛点 —— 上下文可靠性是信任的头号杀手。** [#7579](https://github.com/agentscope-ai/Qwen

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-08

## 1. 今日概览

ZeroClaw 今日节奏密集，过去 24 小时内触及了 30 个 issue 和 50 个 PR，但每个仅关闭了 4 个 —— 开/关比例（约 6:1）表明项目处于重度分流阶段而非发版模式。未发布任何新版本，说明工作集中在发版前的质量/回归修复上，而非新功能打标。活动紧密围绕三大主题：(a) ZeroCode/ACP（Agent Communication Protocol）轮次生命周期问题（会话记录持久化、会话恢复、并行运行处理），(b) Anthropic 及兼容提供商的提示缓存正确性（断点、TTL、OAuth 前缀、成本核算），以及 (c) 渠道集成基础设施（Telegram、WhatsApp、Matrix）。一位贡献者 —— **Audacity88** —— 贡献了大多数新提交的 issue 和数个最高风险的 PR，这既是速度信号，也是巴士因子（bus-factor）隐患。

## 2. 版本发布

**过去 24 小时内无新版本发布。** 当前 bug 中引用的最新发布版本为 **v0.8.5**（[Issue #10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)、[#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)）。

## 3. 项目进展

本期窗口内有 4 个 issue 和 4 个 PR 转为已关闭状态。值得注意的合并/关闭项：

| 项目 | 类型 | 标题 |
|---|---|---|
| [#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671) | PR（已关闭） | `fix(daemon): accept channel instance composite key in heartbeat.target` — 修复 [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) |
| [#8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720) | Issue（已关闭） | Support: 通过配置为 Bedrock Nova 2 Lite 模型禁用 cachePoint |
| [#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660) | Issue（已关闭） | Feature: 在上一轮最后一条消息上设置第三个缓存断点 |
| [#10693](https://github.com/zeroclaw-labs/zeroclaw/issues/10693) | Issue（已关闭） | ZeroCode 在显示已连接时静默忽略 Enter 提交 |

已关闭的 issue 都配套了实质性修复或被并入相邻工作；没有一项是毫无进展就关闭的。然而，今天没有 PR 落地到 `master` 分支，这暗示队列由大型、被阻塞或等待作者操作的 PR 主导，而非可直接合并的就绪代码。

## 4. 社区热点话题

按评论数和互动密度排序，最活跃的讨论帖包括：

- **[#8720 — Support: 为 Bedrock Nova 2 Lite 禁用 cachePoint](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)**（12 条评论，讨论最多）—— 一位实际运营者在 Bedrock 上反复遇到 cache-point 错误，请求一个配置层面的总开关。对任何通过 Bedrock 提供商运行非 Anthropic 模型的人都具有较高复用价值。
- **[#10230 — 守护进程在 agent 初始化时启动/重载可能栈溢出](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)**（6 条评论，S1）—— 在守护进程运行时应用 Quickstart 配置会触发 Tokio worker 中止并栈溢出。这与多个"守护进程侧配置变更在运行时不安全"的 issue 属于同一架构类别。
- **[#9333 — 切换会话后失败的 ACP 轮次消失](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)**（4 条评论，S1）—— 一个基础的 ACP 正确性缺陷；衍生出后续 issue [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673)、[#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)、[#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667)、[#10697](https://github.com/zeroclaw-labs/zeroclaw/issues/10697)。表明守护进程 RPC 路径上轮次持久化机制存在更深层的结构性问题。
- **[#10121 — 进程在完成前退出时，部分 Code/ACP 轮次消失](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)**（3 条评论，S0 — 数据丢失）—— 数据丢失级别严重性；相关 PR [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) 自 2026-08-20 起就一直开着。
- **[#10408 — 当前轮次进行中时，第二条消息触发并行运行](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)**（3 条评论，S1）—— 同会话队列中的并发缺陷；尚未关联 PR。

**根本需求：** 在 Anthropic 类提供商上运行长生命周期、多轮会话的运营者希望实现 (1) 跨崩溃与会话切换的无损会话记录持久化，(2) 可预测的成本/缓存核算，(3) 守护进程配置的安全热重载。

## 5. 缺陷与稳定性

### S0 — 数据丢失 / 安全风险
- [#10121 部分 Code/ACP 轮次在进程完成前退出时消失](https://github.com/zeroclaw-labs/zeroclaw/issues/10121) —— **尚无合并修复。** 候选 PR [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)（开放中，`needs-maintainer-review`，XL）。

### S1 — 工作流受阻
- [#10230 守护进程启动/重载时 agent 初始化可能栈溢出](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) —— 未关联修复 PR。
- [#9333 切换会话后失败的 ACP 轮次消失](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) —— 今日新增跟进切片 [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673)；PR [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) 处理了该系列的部分问题。
- [#10659 超出预算的 Code 轮次在会话恢复后丢失可见进度](https://github.com/zeroclaw-labs/zeroclaw/issues/10659) —— 尚无 PR。
- [#10693 ZeroCode 在显示已连接时静默忽略 Enter](https://github.com/zeroclaw-labs/zeroclaw/issues/10693) —— **今日已关闭。**
- [#10670 `heartbeat.target` 拒绝渠道实例复合键](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) —— **已通过 PR [#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671) 修复并关闭。**

### S2 — 行为降级
- [#10408 同会话中第二条消息触发并行运行](https://github.com/zeroclaw-labs/zeroclaw/issues/10408) —— 无 PR。
- [#9940 Cron 投递渠道无法解析](https://github.com/zeroclaw-labs/zeroclaw/issues/9940) —— 纳入实施批次 [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685) 跟踪。
- [#10115 工具结果截断对模型上下文外部不可见](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) —— 无 PR。
- [#10689 Telegram 语音回复在回复以 `[` 开头时被跳过](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) —— ElevenLabs v3 音频标签的边缘情况。
- [#10688 WhatsApp Web 语音消息永远不会被转写](https://github.com/zeroclaw-labs/zeroclaw/issues/10688) —— **存在修复 PR：** [#10692](https://github.com/zeroclaw-labs/zeroclaw/pull/10692)。
- [#10694 PowerShell shell 测试在 Windows 上间歇性超时](https://github.com/zeroclaw-labs/zeroclaw/issues/10694) —— 无 PR。
- [#10667 当提示完成先于 TurnComplete 时 ZeroCode 重复流式响应](https://github.com/zeroclaw-labs/zeroclaw/issues/10667) —— 无 PR。

**模式：** 多个并发/状态问题集中在 ACP 轮次生命周期周围，表明轮次状态机尚未在崩溃恢复场景下进行审计。

## 6. 功能请求与路线图信号

- **Anthropic 缓存可配置性** —— [#10663（1h TTL）](https://github.com/zeroclaw-labs/zeroclaw/issues/10663) 和 [#10662（OAuth cache-min 槽位）](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) 指向一个明确的近期路线图项：使 `cache_control` 标记完全可控。PR [#10605（通过 OpenAI 兼容网关的 Anthropic 扩展思考）](https://github.com/zeroclaw-labs/zeroclaw/pull/10605)（XL）进一步强化了这一方向。
- **新搜索提供商** —— PR [#10679 Keenable web search](https://github.com/zeroclaw-labs/zeroclaw/pull/10679) 是"除 DuckDuckGo 之外第一个无需配置即可工作的提供商"；很可能被接纳为开箱即用选项。
- **Telegram 体验** —— PR [#9997（安全模型选择器）](https://github.com/zeroclaw-labs/zeroclaw/pull/9997) 和 [#10640（被动群组上下文）](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) 表明一轮协调推进的 Telegram 改进。
- **健康端点加固** —— [#10606 清理未认证健康检查中的组件错误](https://github.com/zeroclaw-labs/zeroclaw/issues/10606) 是一项应在下个补丁中落地的安全诉求。
- **启动器与发布目标注册表** —— 跟踪项 [#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684) 预示着面向 MCP 主机的打包/分发计划。

**下一版本预测：** 下个打标版本很可能打包 (a) ACP 轮次持久化修复（[#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197) 系列），(b) WhatsApp 转写接线（[#10692](https://github.com/zeroclaw-labs/zeroclaw/pull/10692)），(c) heartbeat-target 复合键修复（[#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671)），以及 (d) 一个或多个缓存控制开关。

## 7. 用户反馈摘要

**数据中最清晰传达的痛点：**

1. **崩溃或会话切换后工作丢失** —— Anthropic 上的多轮、长生命周期会话产生失败/被取消的轮次，从会话记录中消失，消耗运营者实际时间与信任。（#10121、#9333、#10659、#10673、#10697）
2. **缓存失效意外** —— 使用兼容（LiteLLM 风格）网关或 OAuth 路径的用户因 `cache_control` 标记落点问题而悄无声息地丢失缓存命中；部分用户仅通过成本泄漏才发现。（#10699、#10701、#10662）
3. **配置键不一致** —— 集成页面将显示名 slug 化而非使用族键，导致用户进入 404（[#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)）；`heartbeat.target` 拒绝本应接受的键（[#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)）。表明 UI/配置的真实数据源未对齐。
4. **Telegram 与 WhatsApp 能力差异** —— 常见模型输出触发语音回复失灵（#10689）；语音消息永不转写（#10688）；跨渠道运营体验不一致。
5. **工具结果不透明** —— 截断发生在模型上下文内，但运营者和日志都看不到（[#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)）。
6. **Windows 上 CI 不稳定** —— PowerShell 超时（[#10694](https://github.com/zeroclaw-labs/zeroclaw/issues/10694)）以及 `zeroclaw-hardware` feature 在 CI 中从未被实际跑过（[#10104](https://github.com/zeroclaw-labs/zeroclaw/issues/10104)）是单元测试中无法体现但会侵蚀发版信心的运维隐患。

整体满意度信号喜忧参半：深度用户在提交精准到代码行的技术性 bug 报告（高互动），但若干核心工作流（ACP 崩溃恢复、并行轮次处理）在 S0/S1 级别仍然存在故障。

## 8. 待办关注

长期开放、体量较大或被显式阻塞、需要维护者关注的 PR 与 issue：

- **[#10197 持久化被中断轮次的进度（XL，`needs-maintainer-review`）](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)** —— 自 2026-08-20 开放。解决 ACP 周围 S0 级数据丢失问题。队列中影响力最高的未合并 PR。
- **[#10241 恢复受监督 shell 审批路由（XL，状态：阻塞）](https://github.com/zeroclaw-labs/zeroclaw/pull/10241)** —— 自 2026-08-22 开放，已阻塞，安全领域。涉及所有渠道。
- **[#9997 Telegram 安全模型选择器（XL，`do-not-merge`）](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)** —— 自 2026-08-14 开放，标记为 `do-not-merge`；需要重新切分设计。
- **[#10325 轮次前的工具征集提示（XL，`stale-candidate`）](https://github.com/zeroclaw-labs/zeroclaw/pull/10325)** —— 自 2026-08-24 开放，被标记为陈旧候选。已被接纳 RFC 的第二切片；需要作者推进。
- **[#10425 内部主体信封与 cron 运行结果（XL，RFC #6954，1/3）](https://github.com/zeroclaw-labs/zeroclaw/pull/10425)** —— 自 2026-08-28 开放，`needs-author-action`，`stale-candidate`。三段式安全/架构变更的第一切片；若不持续跟进，后续两片将逐渐偏离。
- **[#9977 将文件系统变更限制在工作区内（XL，`needs-author-action` + `needs-maintainer-review`）](https://github.com/zeroclaw-labs/zeroclaw/pull/9977)** —— 自 2026-08-13 开放。安全领域；两项评审关卡均未满足。
- **[#9283 解压 gzip/brotli/deflate 的 web_fetch 响应（XL，有依赖项，`needs-author-action`）](https://github.com/zeroclaw-labs/zeroclaw/pull/9283)** —— 自 2026-07-23 开放；一位维护者已做了大量修复工作。实质上已准备好合并，待评审。
- **[#8966 在用量事件上暴露实时提供商身份 / 修正上下文窗口（XL）](https://github.com/zeroclaw-labs/zeroclaw/pull/8966)** —— 活动队列中最老的（自 2026-07-11）；涉及 agent、网关与 ACP。对 TUI/Web 上下文计量器的正确性至关重要。

**维护者关注建议：** 下个补丁优先处理 [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)、[#9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283) 和 [#10692](https://github.com/zeroclaw-labs/zeroclaw/pull/10692) —— 每一项都能在不依赖未合并设计工作的前提下，关闭一类独立的 S0/S1 问题。三个 `do-not-merge` / `blocked` / `stale-candidate` 状态的 PR（[#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)、[#10241](https://github.com/zeroclaw-labs/zeroclaw/pull/10241)、[#10325](https://github.com/zeroclaw-labs/zeroclaw/pull/10325)）需要维护者明确分流 —— 队列不会自行消化。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*