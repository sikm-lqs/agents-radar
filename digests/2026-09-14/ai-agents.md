# OpenClaw 生态日报 2026-09-14

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-13 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-14

## 1. 今日概览

OpenClaw 经历了一个异常高流量的 24 小时窗口，共有 1,000 个 issue/PR 事件（500 个 issue，500 个 PR），但尽管出现了多份与刚发布的 2026.9.3 和 2026.9.4 版本相关的 P0 级发布阻塞报告，却没有新的标签版本发布。当日的主题是**更新/升级可靠性与安装生命周期管理**：至少有七个 P0 issue（#146394、#145252、#145192、#146958、#140162、#143334、#143524、#147160）描述了围绕托管更新、Doctor 校验、SQLite WAL 增长以及 9.2 → 9.3/9.4 升级路径的回滚机制等方面的故障模式。次要主题包括持续存在的**会话/转录正确性问题**（子代理完成结果丢失、通道卡死、内部上下文泄漏到聊天渠道）以及**MCP/Codex 集成回归**。仓库高度活跃但处于运维承压状态，`clawsweeper` 分诊机器人承担了主要的路由工作，许多 issue 被标记为 `needs-product-decision` / `needs-maintainer-review`。

## 2. 版本发布

**过去 24 小时内未发布新版本。** 今日 issue 和 PR 中引用的标签版本横跨 `2026.6.11` → `2026.9.4`。两个发布阻塞追踪 issue 占主导地位：

- **[#145252]** — 追踪：2026.9.3 / 2026.9.4 更新、升级与恢复可靠性 ([openclaw/openclaw#145252](https://github.com/openclaw/openclaw/issues/145252))
- **[#147160]** — 更新失败：finalize:doctor (2026.9.4) ([openclaw/openclaw#147160](https://github.com/openclaw/openclaw/issues/147160))
- **[#146394]** — 更新失败：global-install-failed (2026.9.3) ([openclaw/openclaw#146394](https://github.com/openclaw/openclaw/issues/146394))

## 3. 项目进展

过去 24 小时内有 266 个 PR 被合并/关闭。值得关注的已落地或已取代的工作：

- **[#135111]**（已关闭）— 修复 v2026.8.1 上间歇性出现的 "Provider completed tool call with malformed JSON arguments" ([openclaw/openclaw#135111](https://github.com/openclaw/openclaw/issues/135111))
- **[#85030]**（已关闭）— MCP 工具未被注入到子代理（sessions_spawn）会话 ([openclaw/openclaw#85030](https://github.com/openclaw/openclaw/issues/85030))
- **[#137927]**（已关闭）— 内部上下文块泄漏到 Telegram 可见消息文本 ([openclaw/openclaw#137927](https://github.com/openclaw/openclaw/issues/137927))
- **[#27445]**（已关闭）— 为子代理完成路由新增 `announceTarget` 选项 ([openclaw/openclaw#27445](https://github.com/openclaw/openclaw/issues/27445))
- **[#63216]**（已关闭）— 即便设置了较高的 reserveTokensFloor，同一会话密钥仍反复硬重置 ([openclaw/openclaw#63216](https://github.com/openclaw/openclaw/issues/63216))
- **[#79904] / [#79903] / [#79905]**（已关闭，相关集群）— SQLite 游标式转录读取 API、跨轮换的持久会话谱系、类型化转录投影 ([openclaw/openclaw#79904](https://github.com/openclaw/openclaw/issues/79904)、[#79903](https://github.com/openclaw/openclaw/issues/79903)、[#79905](https://github.com/openclaw/openclaw/issues/79905))
- **[#145503]**（已关闭）— 2026.9.3 Workshop 迁移后 `skill_workshop` 工具未注册 ([openclaw/openclaw#145503](https://github.com/openclaw/openclaw/issues/145503))
- **[#79752]**（已关闭）— macOS 上 Node v26 下 gzip 解压回归，影响 Discord HTTP ([openclaw/openclaw#79752](https://github.com/openclaw/openclaw/issues/79752))
- **[#79047]**（已关闭）— 跨后端模型切换时保留对话上下文 ([openclaw/openclaw#79047](https://github.com/openclaw/openclaw/issues/79047))
- **[#58057]**（已关闭）— 允许列表的动态身份解析（`dmPolicy: dynamic`）([openclaw/openclaw#58057](https://github.com/openclaw/openclaw/issues/58057))
- **[#146958]**（已关闭）— 带显式链接插件加载路径的 2026.9.2 → 2026.9.3 更新失败 ([openclaw/openclaw#146958](https://github.com/openclaw/openclaw/issues/146958))
- **[#147522]**（已关闭）— 加速 SQLite 快照 worker 启动 ([openclaw/openclaw#147522](https://github.com/openclaw/openclaw/pull/147522))
- **[#147529]**（已关闭）— 在测试套件中重叠隔离的配额与密钥 UI fixture ([openclaw/openclaw#147529](https://github.com/openclaw/openclaw/pull/147529))
- **[#60381]**（已关闭）— 浏览器工具：为 click 和 evaluate 操作新增 `force` 参数 ([openclaw/openclaw#60381](https://github.com/openclaw/openclaw/issues/60381))
- **[#26494]**（已关闭）— Telegram 机器人：使用 streaming: partial 时单条消息/停止输入 ([openclaw/openclaw#26494](https://github.com/openclaw/openclaw/issues/26494))

最有可能近期合并的进行中 PR（状态：待维护者审阅，证据充分）：

- **[#147540]** — feat(macos): 折叠聊天回复上方的已完成工作 ([openclaw/openclaw#147540](https://github.com/openclaw/openclaw/pull/147540))
- **[#143882]** — feat(slack): 将流式推理渲染为任务卡片 ([openclaw/openclaw#143882](https://github.com/openclaw/openclaw/pull/143882))
- **[#143937]** — fix(redaction): 仅重放带有来源标记的持久化掩码 ([openclaw/openclaw#143937](https://github.com/openclaw/openclaw/pull/143937)) — 标记了兼容性/会话状态/安全边界风险
- **[#144836]** — fix(update): 将脏检出（dirty checkout）报告为更新失败 ([openclaw/openclaw#144836](https://github.com/openclaw/openclaw/pull/144836))
- **[#147544]** — fix(update): 保留被替换的克隆目录 ([openclaw/openclaw#147544](https://github.com/openclaw/openclaw/pull/147544))
- **[#147543]** — 在多次请求间复用工具 schema 规范化 ([openclaw/openclaw#147543](https://github.com/openclaw/openclaw/pull/147543))
- **[#147538]** — 减少流式会话事件上的 CPU 占用 ([openclaw/openclaw#147538](https://github.com/openclaw/openclaw/pull/147538))
- **[#147532]** — 通过长内部标记序列加速历史读取 ([openclaw/openclaw#147532](https://github.com/openclaw/openclaw/pull/147532))
- **[#147499]** — 在子代理等待后保留自动化管理 ([openclaw/openclaw#147499](https://github.com/openclaw/openclaw/pull/147499)) — 安全边界风险

## 4. 社区热门话题

评论数最高的 issue 揭示了用户损失最多时间和信任的领域：

1. **[#25592]** — "工具调用之间的文本泄漏到聊天渠道"（40 条评论，1 👍，diamond lobster）([openclaw/openclaw#25592](https://github.com/openclaw/openclaw/issues/25592))。已存在六个月，仍活跃。反复出现的痛点：任何内部叙述或错误处理文本都会变成可见的 Slack/iMessage 消息。表明在推理轨迹与用户可见输出之间缺少渠道层面的隔离。

2. **[#97616]** — "OpenClaw 泄漏未被回收的 hook/tool 子进程，导致僵尸进程堆积"（31 条评论，1 👍，silver shellfish）([openclaw/openclaw#97616](https://github.com/openclaw/openclaw/issues/97616))。对任何长时间运行的网关而言都是运维关键问题。强烈的 "claw-sweeper-recovery-stuck" 痕迹表明分诊机器人无法自动恢复。

3. **[#44925]** — "子代理完成结果静默丢失——超时情况下无重试、无通知、无自动重启"（28 条评论，2 👍，diamond lobster）([openclaw/openclaw#44925](https://github.com/openclaw/openclaw/issues/44925))。多种故障模式（E31、E42、E45）相互叠加；处于论坛模式的 Telegram 用户完全不知道他们委派的工作已经失败。

4. **[#135111]** — v2026.8.1 上间歇性出现 "Provider completed tool call with malformed JSON arguments"（27 条评论，已关闭）([openclaw/openclaw#135111](https://github.com/openclaw/openclaw/issues/135111))。近期已解决，但历史上非常活跃。

5. **[#91009]** — Codex PreToolUse 原生 hook relay 生成 CPU 密集型 `openclaw-hooks` 进程（23 条评论，2 👍，silver shellfish）([openclaw/openclaw#91009](https://github.com/openclaw/openclaw/issues/91009))。每次工具调用都会消耗 100%+ 的 CPU 并阻塞网关 RPC——一个稳定的性能回归。

6. **[#119720]** — "同步代理持久化与转录维护在大规模下阻塞 Gateway 事件循环"（19 条评论，diamond lobster）([openclaw/openclaw#119720](https://github.com/openclaw/openclaw/issues/119720))。维护者标记：此前通过 #140231 / #138984 进行的部分修复改变了重写实现；评论线程是该重写工作的权威状态记录。

7. **[#69208]** — 伞状 issue：跨渠道的重复转录、重放与上下文组装（15 条评论，维护者标记）([openclaw/openclaw#69208](https://github.com/openclaw/openclaw/issues/69208))。汇总了 MSTeams、webchat、Telegram、followup 队列、delivery-mirror 消费者以及 bootstrap 路径上一系列重复/重放 bug。

底层需求：用户想要**确定性、无泄漏、可恢复的跨消息渠道多代理编排**——当前架构在推理 → 转录 → 渠道输出之间存在泄漏，并且对卡死的子代理缺乏可观测性。

## 5. Bug 与稳定性

**P0（发布阻塞）— 活跃中：**

| Issue | 标题 | 备注 |
|---|---|---|
| [#146394](https://github.com/openclaw/openclaw/issues/146394) | 更新失败：global-install-failed (2026.9.3) | linux/arm64，npm update 无法完成 |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | 2026.9.2 → 2026.9.4 托管更新在 v1 交接租约的 candidate-Doctor 阶段失败 | 在 [#145252] 中追踪 |
| [#146958](https://github.com/openclaw/openclaw/issues/146958) | 2026.9.2 → 9.3 更新在链接插件的 `llm-task` 包所有者元数据上失败 | 今日已关闭但具表征意义 |
| [#140162](https://github.com/openclaw/openclaw/issues/140162) | Windows：网关重启在 181s 后将就绪/慢启动网关作为 "stale process" 杀死 | 今日已关闭 |
| [#145563](https://github.com/openclaw/openclaw/issues/145563) | 微信渠道回复分发失败，抛出 `PreparedModelCatalogConfigReplacedError` | 今日已关闭 |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 代理 SQLite WAL 在数天内增长到 1.4–2.8 GB，即便设置 `wal_autocheckpoint=1000`；阻塞网关启动（Windows） | 尚无修复 PR |
| [#147160](https://github.com/openclaw/openclaw/issues/147160) | 更新失败：finalize:doctor (2026.9.4) | darwin/x64，Node 24.18.0 |
| [#143334](https://github.com/openclaw/openclaw/issues/143334) | 丢失的子代理完成交付将请求方停滞在 settle-yield；重启恢复失败 | 9.3 回归 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse hook relay 生成 CPU 密集型 `openclaw-hooks` 进程，阻塞网关 RPC | silver shellfish |

**P1（高）— 评论最活跃：**

- **[#44925]** 子代理完成结果静默丢失 ([openclaw/openclaw#44925](https://github.com/openclaw/openclaw/issues/44925)) — diamond lobster；尚无修复 PR。
- **[#25592]** 工具调用文本泄漏到渠道 ([openclaw/openclaw#25592](https://github.com/openclaw/openclaw/issues/25592)) — diamond lobster；已关联 PR 但尚未就绪。
- **[#119720]** 同步持久化阻塞事件循环 ([openclaw/openclaw#119720](https://github.com/openclaw/openclaw/issues/119720)) — diamond lobster；重写进行中，已有两个 PR 落地。
- **[#144911]** MCP 服务器初始化超时导致 Gateway 崩溃（`service child cleanup identity lost`）([openclaw/openclaw#144911](https://github.com/openclaw/openclaw/issues/144911)) — diamond lobster；有候选修复方案。
- **[#139847]** 回复中途消息丢失——"Reply operation has no active tool authority snapshot"（2026.9.2 回归）([openclaw/openclaw#139847](https://github.com/openclaw/openclaw/issues/139847)) — diamond lobster。
- **[#137332]** 混合终态请求方-结算批次无限重试 ([openclaw/openclaw#137332](https://github.com/openclaw/openclaw/issues/137332)) — diamond lobster。
- **[#141474]** `sessions_yield` 将 `agents_wait` 永久挂起；`outputSchema` 在 claude-cli 上静默无效 ([openclaw/openclaw#141474](https://github.com/openclaw/openclaw/issues/141474)) — diamond lobster。
- **[#132765]** `agents_wait` 忽略 `timeoutSeconds`——约 60s 后作为工具错误终止 ([openclaw/openclaw#132765](https://github.com/openclaw/openclaw/issues/132765)) — diamond lobster。
- **[#145152]** 卡死会话恢复将强制清除报告为中止，且不指明任何 run/owner 身份 ([openclaw/openclaw#145152](https://github.com/openclaw/openclaw/issues/145152)) — diamond lobster。
- **[#144809]** claude-cli 超过 `RUN_STALE_TAKEOVER_MS` 的回合会丢失整段生成的回复 ([openclaw/openclaw#144809](https://github.com/openclaw/openclaw/issues/144809))。
- **[#146118]** 被取代任务的压缩保护未覆盖 Codex-native 或非溢出压缩 ([openclaw/openclaw#146118](https://github.com/openclaw/openclaw/issues/146118)) — 直接回归了 #123737 中已发布的部分修复。
- **[#101929]** 上下文溢出中途预检相对于计费用量高估 2.3–2.6 倍 ([openclaw/openclaw#101929](https://github.com/openclaw/openclaw/issues/101929)) — 导致工具密集型回合过早截断。
- **[#81182]** 溢出恢复应在等待完整自动压缩超时之前先截断工具结果 ([openclaw/openclaw#81182](https://github.com/openclaw/openclaw/issues/81182)) — 已有关联 PR 待合并。
- **[#113701]** 上下文溢出：大工具输出超出窗口，压缩无法恢复，会话进入失败循环 ([openclaw/openclaw#113701](https://github.com/openclaw/openclaw/issues/113701))。
- **[#86214]** Codex app-server 客户端在回合中途关闭

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / Agent 开源生态
**快照日期：2026-09-14** · 分析项目：OpenClaw、Hermes Agent、ZeroClaw、QwenPaw、IronClaw

---

## 1. 生态概览

个人 AI 助手 / Agent 开源生态正在围绕一套共享架构进行整合 —— 一个常驻本地的 **网关/守护进程**，负责管理会话、对话记录（通常以 SQLite 为底）、MCP 工具集成以及多供应商模型路由 —— 但各项目在执行成熟度上差异显著。当前的工程主旋律是 **强化而非扩张**：更新可靠性、会话持久性、多租户隔离、推理/输出分离等议题占据了问题流量的大头。活动量呈幂律分布：OpenClaw 的事件量约为紧随其后的同类项目（Hermes、ZeroClaw）的 10 倍，而 IronClaw 几乎处于停滞状态。值得注意的是，**五个项目在最近 24 小时内均未发布任何版本**，其中三个项目存在公开的发布阻塞或已逾期的里程碑 —— 这表明整个生态正在集体偿还稳定性债务。

---

## 2. 活动量对比

| 项目 | Issues（24h） | PRs（24h） | 已合并 PRs | 发布状态 | 健康度评分 |
|---|---|---|---|---|---|
| **OpenClaw** | 500 events | 500 events | **266** | 未发布；2026.9.3/9.4 被 8+ P0 更新/恢复类缺陷阻塞 | **6/10** —— 吞吐量巨大，运维承压 |
| **Hermes Agent** | 50（26 open / 24 closed） | 50（35 open） | 15 | 未发布；v0.21.2 持续累积，备战 v0.22.x 协同发布 | **6.5/10** —— 修复速度高，但存在自引入的多路复用回退 |
| **ZeroClaw** | 37 | 50（全部 open） | **0** | 未发布；v0.8.5 系列较 8 月 30 日目标延期约两周 | **7/10** —— 节奏规范、RFC 驱动；审查瓶颈初现 |
| **QwenPaw** | 5 | 6 | 1 | 未发布；正在稳定 v2.2.0/2.2.1 桌面版线 | **7/10** —— 流量轻但健康，新人上手顺畅 |
| **IronClaw** | 0 | 5（全部 dependabot） | 0 | 未发布；无人工提交活动 | **4/10** —— 停滞；仅自动化维护 |

*评分综合考虑了活动量、修复速度、开放阻塞严重程度、发布节奏以及社区参与度。ZeroClaw 在 50 个开放 PR 下零合并，是一处显著异常。*

---

## 3. OpenClaw 的定位

**相对同侪的优势：**
- **规模与吞吐量：** 24 小时内 1,000 事件、266 已合并 PR —— 比 Hermes/ZeroClaw 高一个数量级，约为 QwenPaw 的 90 倍。其最深的讨论串（40、31、28 条评论）反映出最大的活跃用户基数。
- **最广泛的集成面：** 原生支持 Telegram、Slack、Discord、iMessage、MSTeams、WeChat，加上 Codex/claude-cli 后端、浏览器工具链以及子代理编排（`sessions_spawn`、`agents_wait`）。没有任何同侪能在渠道矩阵上与之匹敌。
- **规模化自动分诊：** `clawsweeper` 机器人承担了人工维护者难以承受的路由压力 —— 这是同类基础设施所缺乏的能力。

**技术路线差异：**
- OpenClaw 是 **消息渠道优先、支持托管更新的 Node.js 网关**（npm 全局安装、Doctor 校验、交接租约、回滚路径）。Hermes 共享网关模式，但正转向 **一个网关多路复用所有 profile**；ZeroClaw 是 **以 RPC 为中心、由正式 RFC/ADR 治理的 Rust 运行时**；IronClaw 是 **基于 WASM 沙箱（wasmtime/tokio）的 Rust 执行运行时**；QwenPaw 则是 **面向消费者的 Windows 桌面产品**，搭配供应商能力注册表。
- OpenClaw 的对话记录架构（SQLite 游标读取、类型化投影、持久化血缘 —— #79903–#79905）是当前最雄心的会话模型，但也是其最严重不稳定性的来源（WAL 膨胀到 GB 级，#143524；事件循环阻塞，#119720）。

**相对同侪的风险：** 9.2 → 9.3/9.4 更新危机（≥7 个 P0：#146394、#145192、#147160）是其他项目所未经历的严重级别。渠道泄漏（#25592，开置 6 个月）与静默的子代理失败（#44925）正在侵蚀其规模本应带来的信任。ZeroClaw 的治理严谨度与 QwenPaw 的低贡献门槛，都是 OpenClaw 当前的"速度优先"模式尚未复刻的优势。

---

## 4. 共享技术关注点

| 关注点 | 涉及项目 | 具体信号 |
|---|---|---|
| **会话/对话记录持久化与 SQLite WAL 持久性** | OpenClaw、Hermes、QwenPaw、ZeroClaw | WAL 膨胀阻塞启动（OC #143524）；跨进程 WAL 解链（HA #109727、#110106、#109946）；桌面关机导致会话丢失（QP #7724、#7708）；失败轮次从持久化历史中被抹除（ZC #10788）；ACP 对话分页（ZC #10596） |
| **推理内容与用户可见输出的分离** | OpenClaw、QwenPaw | 内部文本泄漏至 Slack/iMessage（OC #25592、#137927）；任务结果被吞入 `thinking` 块（QP #7709） |
| **上下文窗口管理** | OpenClaw、ZeroClaw、QwenPaw | 溢出预检重复计数 2.3–2.6 倍（OC #101929）；压缩锚定模型窗口比例（ZC #9535）；代理自主上下文交接提案（QP #7733） |
| **MCP 集成可靠性** | OpenClaw、Hermes、QwenPaw | 子代理中 MCP 工具缺失（OC #85030）；MCP 服务初始化崩溃（OC #144911）；`mcp test` 给出误导性诊断（HA）；HTTP 错误双重解压（QP #7735） |
| **更新/升级生命周期安全** | OpenClaw、Hermes、ZeroClaw | 7+ P0 更新失败（OC）；`hermes update` 幽灵运行时退出（HA #109680）；打包/cargo-install 后续工作（ZC #9381） |
| **子代理编排与可观测性** | OpenClaw、ZeroClaw、QwenPaw | 静默完成丢失、无重试（OC #44925）；委派子循环绕过成本预算（ZC #10645）；多代理首轮误分类（QP #3113） |
| **多供应商路由与中继合规** | 全部活跃项目 | 跨后端上下文保持（OC #79047）；OpenCode 缺失会话头，可能触发账号标记（ZC #10603）；DeepSeek V4 Flash 注册（QP #7736）；托管 Nous 网关（HA） |
| **Windows 作为二等平台** | OpenClaw、ZeroClaw、QwenPaw | 过期进程网关被杀掉（OC #140162）；RPC 栈溢出 0xc00000fd 与符号链接检出失败（ZC #10734、#9381）；QwenPaw 的数据丢失报告均与 Windows 桌面相关 |

---

## 5. 差异化分析

- **OpenClaw** — *跨聊天平台的常驻个人助手。* Node.js 托管更新网关；最深度的渠道与子代理功能集；面向常驻 Slack/Telegram/iMessage 的自托管深度用户。差异化在于广度；负债是更新路径的脆弱性。
- **Hermes Agent** — *多 profile 网关整合。* 其赌注是 `gateway.multiplex_profiles` + "一个网关管理所有会话"（#106742）：单台机器上承载多 persona/账号并保持隔离。面向多 profile 用户与 Desktop/TUI/CLI 体验对齐；其全部缺陷负担正是这一押注的隔离税。
- **ZeroClaw** — *受治理、可安全审计的 Agent 运行时。* Rust、RPC 优先、OIDC 认证主体（#10259）、shell 权限策略（#10610）、按 profile 成本账本。面向需要审计追溯、预算强约束与正式 RFC 流程的运维人员 —— 是唯一具备可见治理机制的项目。
- **QwenPaw** — *消费级桌面产品。* Windows 优先、i18n（pt-BR）、供应商能力注册表、技能系统；使用中文提交 issue 表明其拥有独立（很可能是中文用户）用户群。面向非技术终端用户，而非自托管者。
- **IronClaw** — *沙箱化执行底座。* WASM（wasmtime）+ tokio 暗示其以隔离为先的 Agent 执行 —— 架构上独树一帜，但无任何人工信号，读起来更像一个研究型/企业型（NEAR AI）项目，当前无社区号召力。

---

## 6. 社区势头与成熟度

**第一梯队 — 超高速迭代：** **OpenClaw。** 最高的合并吞吐（266/天）、最大的评论用户群、机器人辅助分诊。迭代速度超过稳定化能力 —— P0 缺陷在功能落地的同时持续老化。

**第二梯队 — 活跃迭代：** **Hermes Agent** 正在执行一场有序的多路复用战役（#109417），PR 卫生高度规范（关联 issue、修复归属清晰） —— 在自引入的回退面前快速迭代，v0.22.x 发布明显已在备料中。**ZeroClaw** 在迭代代码的同时也在迭代流程（RFC 投票改革 #10549、ADR 清点 #8691），但出现了 **审查瓶颈**：50 个开放 PR、窗口期内零合并，数项 needs-author-action 自七月挂起。

**第三梯队 — 稳健稳定化：** **QwenPaw** 处于 v2.2.x 的补丁模式；PR 小而聚焦，首次贡献者当日即可落地修复（健康的上手通道），但其影响最大的缺陷（桌面端会话丢失 #7724）尚无修复在进行。

**第四梯队 — 停滞：** **IronClaw。** 连续数周仅 dependabot 活动；wasm PR 已停滞 22 天；无社区可言。

---

## 7. 趋势信号

1. **持久化是生态的系统性弱点。** 四个活跃项目中有三个暴露了 SQLite WAL/会话持久性失败（OpenClaw WAL 膨胀、Hermes 跨进程 WAL 解链、QwenPaw 会话丢失）。*开发者启示：跨进程 WAL 隔离与崩溃安全的会话持久化已成入场券；需将只读消费者视为一等风险。*
2. **更新可靠性是信任的决定因素，而非一项功能。** OpenClaw 的 9.3/9.4 危机表明用户能容忍功能缺陷，但无法容忍更新后卡在版本之间。原子化、Doctor 校验、可回滚的更新正在成为竞争门槛。
3. **多租户/profile 隔离是下一道架构前沿** —— Hermes（profile 多路复用）、ZeroClaw（RPC 主体）、OpenClaw（动态身份白名单 #58057）。隔离失败会泄漏凭据与状态；安全缺陷正集中在这里（Hermes Slack token 跨 profile 泄漏 #108493）。
4. **推理/输出通道卫生是普适的 UX 要求。** 泄漏出的内心独白（OpenClaw）与被吞进 `thinking` 块的结果（QwenPaw）所引发的社区愤怒远超其技术严重度 —— 静默失败与可见的内部实现都会摧毁信任。
5. **上下文管理正从阈值式转向代理自主式**（QwenPaw #7733、ZeroClaw #9535） —— 与行业向长运行、自管理驱逐的代理方向同步。
6. **供应商无关的路由存在合规风险：** 缺失中继头（ZeroClaw #10603）可能触发账号标记；亚秒级 429 退避（#10779）浪费配额。供应商注册表正确性（QwenPaw #7736）正演变为独立的维护面。
7. **Windows 在三个项目中仍是欠服务板块**，但需求明显 —— 对任何投入一等 Windows 支持的项目而言是差异化机会。
8. **流程成熟度正在成为护城河：** ZeroClaw 的 RFC/ADR 纪律与 OpenClaw 的机器人分诊代表了开源 Agent 项目规模化扩张的两种不同答案；RFC 改革辩论（#10549）表明治理吞吐已成为被识别的瓶颈类别。

**结论：** OpenClaw 在规模与集成广度上领先，但正在支付稳定性的代价；Hermes 正在执行最连贯的架构战役；ZeroClaw 治理最成熟，却存在合并队列风险；QwenPaw 服务于消费级细分且贡献者生态健康；IronClaw 已停滞。对 AI Agent 开发者而言，此次横截面所指出的最高杠杆投资是：持久化会话状态、安全的更新路径、租户隔离，以及对委派子代理的失败可观测性。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-14

## 1. 今日概览

Hermes Agent（`nousresearch/hermes-agent`）正处于密集的稳定化阶段，核心围绕**配置文件多路复用**（`gateway.multiplex_profiles`）——即单一网关服务所有配置文件。过去 24 小时窗口吞吐量很高：50 个 issue 更新（26 个开放 / 24 个关闭）和 50 个 PR 更新（35 个开放 / 15 个合并/关闭），但**没有任何新版本发布**。活动明显偏向修 bug 而非新增功能。issue 与 PR 中贯穿的共同主题是"跨配置文件污染"：会话密钥、WAL 状态、MCP 服务器、环境桥接、prompt-cache 作用域以及 Slack token 在配置文件之间泄漏。严重程度偏高：围绕被删除的 WAL generation 与 Desktop 会话创建失败的多个 P1 bug 仍处于开放状态。整体项目健康度为**活跃但不稳定**——修复速度很快，但多路复用推广过程正持续产生需要协调落地的回归。

## 2. 版本发布

**过去 24 小时无新版本发布。** 用户报告中最近观察到的版本：`v0.21.2`（构建标签 `v2026.9.11`）。考虑到已有大量合并的修复（尤其是围绕配置文件隔离的修复），却没有发布标签，表明维护者正在为一次协调的 `v0.22.x` 切分积累变更，而非零散发布。

## 3. 项目进展

以下 PR 今日已关闭/合并，代表净项目推进：

- **[#109502](https://github.com/NousResearch/hermes-agent/pull/109502)** — `hermes profile create --clone` 默认不再携带源配置文件的消息机器人凭据；可通过 `--clone-channels` 显式恢复。新增对 `gateway.multiplex_profiles` 配置键的识别，以及一个显式的 `migrate --multiplex` 标志。*是安全采用多路复用的奠基性变更。*
- **[#108440](https://github.com/NousResearch/hermes-agent/pull/108440)** — 多路复用的配置文件不再通过 `config.yaml`→env 桥接、`TERMINAL_*` 环境锁存、Yuanbao 自动 home 写入、写保护路径备忘和 `terminal.env_passthrough` 白名单相互污染。挽救了 6 个先前的 PR。
- **[#108352](https://github.com/NousResearch/hermes-agent/pull/108352)** — 同名 MCP 服务器现可在多路复用下获得每配置文件的独立连接；`/reload-mcp` 不再使同住进程陷入停滞；`gateway start|install|restart`、`hermes status` 与 `API_SERVER_KEY` 都遵循实时多路复用器。
- **[#108294](https://github.com/NousResearch/hermes-agent/pull/108294)** — 次级配置文件在每个 gateway/TUI/Desktop 路径上保留会话密钥并写入各自的 `state.db`。修复了唤醒丢失、`/stop`/`/undo` 失效、QQ 审批按钮被拒、以及默认配置文件的行落入错误 `state.db` 的问题。
- **[#108501](https://github.com/NousResearch/hermes-agent/pull/108501)** — Prompt-cache 作用域现以配置文件身份为键（关闭 [#108494](https://github.com/NousResearch/hermes-agent/issues/108494)）。
- **[#108500](https://github.com/NousResearch/hermes-agent/pull/108500)** — Slack token 回退不再跨配置文件（关闭 [#108493](https://github.com/NousResearch/hermes-agent/issues/108493)）。
- **[#110388](https://github.com/NousResearch/hermes-agent/pull/110388)** — 从 provider-bound 的 chat-completion 载荷中剥离 `message_id` / `platform_message_id`（在持久化历史中保留以供平台去重）。修复共享 API/Telegram 会话上的跨会话污染。
- **[#106742](https://github.com/NousResearch/hermes-agent/pull/106742)** — （仍开放，但是基石级变更）"一个网关拥有所有本地会话"：CLI、TUI、Desktop、API、ACP、机器人和 cron 都附加到同一个网关拥有的会话，而不是各自在同一 `state.db` 上生成 agent。

合并模式（8 个已合并 PR 中有 7 个触及配置文件隔离/安全边界）表明多路复用专项行动（[#109417](https://github.com/NousResearch/hermes-agent/issues/109417)）正在执行中。

## 4. 社区热议话题

过去 24 小时讨论最多的帖子围绕三项社区需求聚集：

**A. 多配置文件安装上 Desktop 会话创建失败** — [#102792](https://github.com/NousResearch/hermes-agent/issues/102792)（11 条评论，P1）及其重复 [#108369](https://github.com/NousResearch/hermes-agent/issues/108369)（5 条评论，P2）。在非默认配置文件上点击项目侧边栏或标签条的 "+"，会生成带有 null owner 元数据的会话→立即出现"无法打开此会话"或"会话控件不可用"。在 macOS/Windows 上多个用户可复现。底层需求：**配置文件感知的会话所有权必须传播到标签条生成路径**，而不仅仅是主聊天。

**B. 副进程正在踩踏 state.db WAL generation** — [#109727](https://github.com/NousResearch/hermes-agent/issues/109727)（6 条评论，P1，Linux）、[#110106](https://github.com/NousResearch/hermes-agent/issues/110106)（4 条评论，P1）、[#109946](https://github.com/NousResearch/hermes-agent/issues/109946)（1 条评论，P1）。任何打开 `state.db` 的第二个 Hermes 进程（即使是只读的 `hermes sessions list`）会取消链接存活的 `state.db-wal`/`-shm`，使网关陷入 `DeletedWalGenerationError`。单个配置文件上多个并发的 `tui_gateway` 进程会反复触发 WAL 回收。Dashboard/Desktop 的全配置文件侧边栏轮询也可能触发同样问题。底层需求：**只读消费者不得与网关的 WAL 竞争**；WAL 处理需要跨进程围栏保护。

**C. WebUI/Dashboard 配置文件切换不稳定** — [#109480](https://github.com/NousResearch/hermes-agent/issues/109480)（4 条评论，P2，需要复现）。更改配置文件后，重启失败或在新配置文件的网关下显示"default"；聊天仍路由到旧网关。底层需求：**配置文件切换必须原子化地重新指向客户端、重启网关并进行验证**。

值得一提（各 3 条评论）：[#108310](https://github.com/NousResearch/hermes-agent/issues/108310) browser_exec/Nous gateway 路由拆分失败；[#108302](https://github.com/NousResearch/hermes-agent/issues/108302)（已关闭）机器人配置文件上的托管 Nous provider；[#107829](https://github.com/NousResearch/hermes-agent/issues/107829)（已关闭）已删除配置文件上 `tui_gateway` 崩溃；[#109680](https://github.com/NousResearch/hermes-agent/issues/109680)（已关闭）`hermes update` 因幽灵网关运行时退出码 1；[#109546](https://github.com/NousResearch/hermes-agent/issues/109546) Bitwarden 开关；[#109891](https://github.com/NousResearch/hermes-agent/issues/109891) 把本地网关提升为 Desktop 一等后端的设计提案。

## 5. Bug 与稳定性

### P1（关键，除非注明否则开放）
| Issue | 状态 | 标题 | 修复 PR |
|---|---|---|---|
| [#102792](https://github.com/NousResearch/hermes-agent/issues/102792) | **已关闭** | Desktop "+" 新建会话丢失全部 owner 元数据 → "无法打开此会话" | 当前开放集合中无关联修复；需核实关闭原因 |
| [#109727](https://github.com/NousResearch/hermes-agent/issues/109727) | 开放 | 第二个 Hermes 进程取消链接存活的 `state.db-wal`/`-shm`（Linux，`DeletedWalGenerationError`） | 暂无 |
| [#110106](https://github.com/NousResearch/hermes-agent/issues/110106) | 开放 | 多个并发 `tui_gateway` 反复触发 state.db WAL；会话中途死亡 | 暂无 |
| [#109946](https://github.com/NousResearch/hermes-agent/issues/109946) | 开放 | Desktop/dashboard 全配置文件侧边栏在活跃配置文件网关上触发已删除 WAL | 暂无 |
| [#108862](https://github.com/NousResearch/hermes-agent/issues/108862) | **已关闭** | Cron 投递 >30s 饿死 fire-claim 心跳 → 运行被标记为失败 | 已关闭（重复）；修复候选见 [#108456](https://github.com/NousResearch/hermes-agent/pull/108456) cron 硬化 |

### P2（高优先级，值得关注）
- [#108369](https://github.com/NousResearch/hermes-agent/issues/108369) — Desktop 标签条 "+" 未列出会话（已关闭，重复）
- [#109480](https://github.com/NousResearch/hermes-agent/issues/109480) — 通过 WebUI 切换配置文件失败
- [#108310](https://github.com/NousResearch/hermes-agent/issues/108310) — 使用 Nous 托管网关的 `browser_exec` 以两种方式路由失败
- [#108302](https://github.com/NousResearch/hermes-agent/issues/108302) — （已关闭）机器人配置文件上托管 Tool Gateway 不可用
- [#107829](https://github.com/NousResearch/hermes-agent/issues/107829) — （已关闭）已删除配置文件上 `tui_gateway` 崩溃
- [#109680](https://github.com/NousResearch/hermes-agent/issues/109680) — （已关闭）`hermes update` 因幽灵网关运行时退出码 1
- [#109024](https://github.com/NousResearch/hermes-agent/issues/109024) — 多路复用 Docker `MEDIA:` 基于环境默认解析 → 修复见 [#109102](https://github.com/NousResearch/hermes-agent/pull/109102)
- [#108088](https://github.com/NousResearch/hermes-agent/issues/108088) — Desktop 机器人模式 relay 维持多余本地后端存活（WebSocket 抖动、失去焦点）；修复见 [#108111](https://github.com/NousResearch/hermes-agent/pull/108111)
- [#110120](https://github.com/NousResearch/hermes-agent/issues/110120) — CLI agent 不执行动作；UI/上下文跟踪损坏（需要复现，可能是本地模型回归）
- [#110032](https://github.com/NousResearch/hermes-agent/issues/110032) — （已关闭）browser/computer_use 缓存仅以 session id 为键 → 跨配置文件泄漏

### P3（中优先级）
- [#108383](https://github.com/NousResearch/hermes-agent/issues/108383) — （已关闭）Dashboard `/chat` 会话卡在 "Setup Required"，而 CLI 正常
- [#108549](https://github.com/NousResearch/hermes-agent/issues/108549) — （已关闭）Kanban 通知器以 5s 周期运行却无配置开关
- [#108346](https://github.com/NousResearch/hermes-agent/issues/108346) — （已关闭）`profile` 参数接受穿越形态名称 → 路径穿越风险
- [#109949](https://github.com/NousResearch/hermes-agent/issues/109949) — Bot Screen 一次性安装锁是进程本地的
- [#108863](https://github.com/NousResearch/hermes-agent/issues/108863) — Desktop 池空闲回收器 SIGTERM 中途正在运行的 cron
- [#109480](https://github.com/NousResearch/hermes-agent/issues/109480) — Web UI 中配置文件切换失败（参见 P2）
- [#110336](https://github.com/NousResearch/hermes-agent/issues/110336) — Mermaid 查看器在画布外打开巨大图表
- [#110374](https://github.com/NousResearch/hermes-agent/issues/110374) — Slack 状态指示器在 `slack-sdk` ≥ 3.44 上静默损坏 → 修复见 [#110391](https://github.com/NousResearch/hermes-agent/pull/110391) / [#110389](https://github.com/NousResearch/hermes-agent/pull/110389)

**规律：** 大部分 P1/P2 回归都可追溯到多路复用推广过程——WAL 状态、会话密钥所有权以及配置文件作用域资源。Cron 投递、MCP 与 Desktop 池生命周期是次脆弱的层面。

## 6. 功能请求与路线图信号

- **[#109891](https://github.com/NousResearch/hermes-agent/issues/109891)** — *设计提案*：将实时本地网关提升为每个配置文件的 Desktop 一等后端，同时保留 `hermes serve` 作为兼容路径。需要决策。方向上与 [#106742](https://github.com/NousResearch/hermes-agent/pull/106742) 一致；预计将作为同一版本的一部分落地。
- **[#109417](https://github.com/NousResearch/hermes-agent/issues/109417)** — "以配置文件多路复用为唯一网关模式"的追踪 issue（9 月 10–12 日专项行动）。终态目标：多路复用安装的用户感觉与每配置文件独立网关无差别。很可能是下一版本的标志性特性。
- **[#106742](https://github.com/NousResearch/hermes-agent/pull/106742)** — 一个网关拥有所有本地会话（CLI/TUI/Desktop/API/ACP/机器人/cron）。P1，影响面广。若合并，将是*真正的*头条变更。

**预测 `v0.22.x`（下一可能发布版本）：**
1. `gateway.multiplex_profiles` 成为默认，带 `migrate --multiplex` 显式选择标志。
2. "一个网关拥有所有本地会话"（[#106742](https://github.com/NousResearch/hermes-agent/pull/106742)）。
3. WAL/跨进程 state.db 围栏保护（鉴于三个开放 P1 没有修复，可能是一个新 PR）。
4. Desktop 本地后端集成（[#109891](https://github.com/NousResearch/hermes-agent/issues/109891) / [#108111](https://github.com/NousResearch/hermes-agent/pull/108111)）。
5. Apple Container 终端后端（[#110390](https://github.com/NousResearch/hermes-agent/pull/110390)，开放）—— 除非有支持者推进，否则可能延期。
6. Slack SDK 3.44+ 状态兼容性（[#110389](https://github.com/NousResearch/hermes-agent/pull/110389) / [#110391](https://github.com/NousResearch/hermes-agent/pull/110391)）。

## 7. 用户反馈摘要

**主要痛点：**
- **多配置文件是用户不满的最大单一来源。** 配置文件隔离失败（会话密钥、MCP、环境变量、prompt-cache、Slack token）被多配置文件用户——恰好是最先采用多路复用的人群——持续报告。
- **多配置文件安装上的 Desktop 体验是最响亮的抱怨。** 评论数前 12 的 issue 中有 6 个涉及 Desktop 会话/标签/配置文件处理（[#102792](https://github.com/NousResearch/hermes-agent/issues/102792)、[#108369](https://github.com/NousResearch/hermes-agent/issues/108369)、[#109480](https://github.com/NousResearch/hermes-agent/issues/109480)、[#109946](https://github.com/NousResearch/hermes-agent/issues/109946)、[#109546](https://github.com/NousResearch/hermes-agent/issues/109546)、[#108088](https://github.com/NousResearch/hermes-agent/issues/108088)、[#108383](https://github.com/NousResearch/hermes-agent/issues/108383)、[#110336](https://github.com/NousResearch/hermes-agent/issues/110336)、[#109949](https://github.com/NousResearch/hermes-agent/issues/109949)）。用户感觉 Desktop 相对 CLI 出现了严重倒退。
- **使用本地模型的 CLI 用户（[#110120](https://github.com/NousResearch/hermes-agent/issues/110120)）报告了一个回归**，agent 不再执行动作，表现得像普通聊天界面。来自 Qwen3.5:9B / GPT-OSS:20B 用户的反馈无差别——若不解决，流失风险高。
- **MCP stdio 调试摩擦（[#50395](https://github.com/Users/NousResearch/hermes-agent/issues/50395) / [#50418](https://github.com/NousResearch/hermes-agent/pull/50418) / [#110393](https://github.com/NousResearch/hermes-agent/pull/110393)）** — `hermes mcp test` 报告 ✓ 健康而网关 spawn 失败的情况被反复指出是有误导性的诊断。
- **积极信号：** 像 `teknium1`、`JoaoMarcos44`、`DavidMetcalfe`、`isair` 和 `KoNit-K` 这样的贡献者正在落地范围明确的 PR，并附上关联 issue 引用和 salvage-line 署名——多路复用专项行动的执行质量异常高

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 — 2026-09-14

## 1. 今日概览

IronClaw (github.com/nearai/ironclaw) 今天异常平静，零新 issue、零新发布，观察到的所有活动仅限于自动化的依赖维护。数据中唯一来自人工的信号是缺失的——过去 24 小时内更新的每个 PR 都由 `dependabot[bot]` 开启。今日项目进度最准确的描述是**仅例行维护**，公共时间线上看不到任何功能开发、Bug 报告或社区讨论。从健康度来看，这并非危险信号（没有积压的过期 issue，依赖在积极跟踪），但它反映出维护者精力与贡献者活跃度目前处于休眠状态。

## 2. 发布

过去 24 小时内无新发布。根据日报惯例，发布章节予以省略。

## 3. 项目进展

过去 24 小时内只有一个 PR 状态发生变化——而且是**关闭**，并非新功能合并：

- **[PR #8097](https://github.com/nearai/ironclaw/pull/8097) — 已关闭**（dependabot, "everything-else group, 24 updates"）
  - 这份包含 24 个包的依赖升级被关闭而未合并。考虑到 **[PR #8099](https://github.com/nearai/ironclaw/pull/8099)** 于 2026-09-13 开启，包含了其超集（25 个更新，其中包含更新的 `uuid 1.26.1`，而 #8097 中为 `1.26.0`），此次关闭几乎可以确定是被更新一批次的批量更新所取代，而非被驳回。今日无面向用户的功能推进。

## 4. 社区热议话题

**无社区互动可报告。** 全部五个活跃 PR 的 `Comments: undefined`，`👍: 0`。过去 24 小时内无开放 issue，任何条目上都没有反应数据。这表明：

- 没有正在进行的讨论线程在吸引贡献者关注。
- 项目面向社区的渠道（issue 分诊、设计讨论）今天实际上处于闲置状态。
- 全部五个 PR 均由 `dependabot[bot]` 提交，因此没有可总结的人工对话。

按更新时间排序的最近活动条目：

1. [PR #8099](https://github.com/nearai/ironclaw/pull/8099) — 25 包 Rust 依赖升级（开放，2026-09-13）
2. [PR #8079](https://github.com/nearai/ironclaw/pull/8079) — 6-action GitHub Actions 升级（开放，2026-09-13 更新）
3. [PR #8078](https://github.com/nearai/ironclaw/pull/8078) — tokio-ecosystem 升级（开放，2026-09-13 更新）
4. [PR #7834](https://github.com/nearai/ironclaw/pull/7834) — wasmtime/wasm-tools group 升级（开放，2026-09-13 更新，**已存在 22 天**）
5. [PR #8097](https://github.com/nearai/ironclaw/pull/8097) — 已关闭的重复批次（已关闭，2026-09-13）

## 5. Bug 与稳定性

**今日未报告任何 Bug、崩溃或回归。** 过去 24 小时内没有新 issue 提交，所有开放 PR 都不针对已报告的缺陷——它们全部是依赖升级。因此稳定性信号为中性；我们无法仅凭现有数据判断代码库当前是否无 Bug，或是用户根本没有提交报告。

## 6. 功能请求与路线图信号

**今日未出现新的功能请求。** 由于零 issue 提交、零非 dependabot PR 更新，过去 24 小时内没有任何信号可以预测下一版本的内容。历史活动（依赖分组所暗示的 wasm-tokio-Rust 技术栈）持续表明 IronClaw 仍是一个**基于 Rust、采用 WASM 沙箱与 tokio 异步 I/O 的 AI agent/assistant runtime**，但今日的数据中没有任何前瞻性的路线图证据。

## 7. 用户反馈汇总

**今日未捕获任何用户反馈。** 没有 issue 线程、没有 PR 评论、没有任何反应可供分析。从当前数据窗口无法推断痛点、使用场景与满意度。建议在未来的日报中扩大回溯窗口，以呈现趋势级别的反馈信号。

## 8. 待办积压关注

以下条目因长时间开放且无人响应，值得维护者关注：

- **[PR #7834](https://github.com/nearai/ironclaw/pull/7834)** — `wasm` 组依赖升级（wasmtime、wasmtime-wasi、wit-component、wit-parser）。**于 2026-08-23 开启，截至 2026-09-13 仍开放——已停滞约 3 周。** 标记为 `size: L, risk: medium`。WASM runtime 组件很可能是 IronClaw 执行模型的基石，因此这份停滞的大型依赖升级 PR 值得维护者审查，决定合并还是关闭。
- **[PR #8078](https://github.com/nearai/ironclaw/pull/8078)** — tokio-ecosystem 升级（`tower-http`、`tokio-tungstenite`）。自 2026-09-06 起开放，属于低风险网络栈。
- **[PR #8079](https://github.com/nearai/ironclaw/pull/8079)** — GitHub Actions 组升级。自 2026-09-06 起开放。值得注意的是：`actions/setup-node` 从 `4.0.2` 升级至 `7.0.2`，这是一个**主版本跳跃**，合并前需要 CI 验证。

**整体积压健康度：** 轻度担忧。wasm PR 已挂起 22 天，dependabot 队列的堆积速度似乎超过其被消化速度（关闭 #8097 转而采用 #8099 是一次健康的去重，但也表明此前的批次未能及时合并）。

---

*本日报基于 24 小时 GitHub 活动窗口生成。今日观察到的所有活动均为自动化依赖维护；未记录到任何人工提交的 issue、PR 或评论。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-14

## 1. 今日概览

今日 QwenPaw 开发活动较轻，有 5 个 issue 更新和 6 个 PR 更新，但未发布新版本。PR 流水线倾向于小型、范围明确的修复（i18n、ACP 权限匹配、MCP HTTP 错误处理、提供商能力），且首次贡献者占比相当可观。开放 issue 主要由用户反馈的稳定性问题主导——会话丢失、定时任务输出消失、代理持续"遗忘"——表明项目处于近期发布的 v2.2.x 系列的稳定阶段，而非功能扩张周期。

## 2. 版本发布

过去 24 小时内无新版本发布。用户报告中引用的最新已发布版本仍为 **v2.2.0 / v2.2.1**（Windows 桌面端构建）。

## 3. 项目进展

- **PR #4009 — feat(i18n): 新增巴西葡萄牙语（pt-BR）语言支持** ([链接](https://github.com/agentscope-ai/QwenPaw/pull/4009)) — **已关闭**。已合并至 main 分支。随后紧跟一个缺陷修复 PR（#7734），表明原始基于字典的翻译在约 415 个键上留下了损坏字符串。
- **PR #7734 — fix(i18n): 补全 pt-BR 翻译并修复 #4009 中的损坏字符串** ([链接](https://github.com/agentscope-ai/QwenPaw/pull/7734)) — 开放中的跟进 PR，使 pt-BR 与 `en.json` 实现 100% 键对齐，闭合了本次本地化特性的完整闭环。
- **PR #7732 — fix(acp): 按协议 kind 选择权限选项** ([链接](https://github.com/agentscope-ai/QwenPaw/pull/7732)) — 开放中。改进 ACP 允许选项的匹配方式，以协议稳定的 `kind` 作为键，而非代理特定的 ID，从而减少错误的交互式提示。
- **PR #7735 — fix(mcp): 保留已解码的 HTTP 错误响应** ([链接](https://github.com/agentscope-ai/QwenPaw/pull/7735)) — 开放中。剥离过时的 body

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目简报 — 2026-09-14

## 1. 今日概览

ZeroClaw 处于持续的高速开发周期中，过去 24 小时内没有发布新版本，但 issue 和 PR 活动量可观（37 个 issue 和 50 个 PR 有动态）。今日无任何 PR 被合并——所有 50 个活跃 PR 均保持开启状态，这表明要么存在评审瓶颈，要么是围绕 v0.8.5 稳定化线路进行了有意识的统筹安排。Bug 修复工作高度集中在安全、配置校验和 provider 可靠性方面，而大型架构 RFC（RPC 投票、PR 评审证据、边缘 mesh）持续吸引着维护者的注意力。社区参与度健康，有多个 tracker issue、若干中等热度讨论串（5–15 条评论），且没有出现弃管迹象。

## 2. 版本发布

过去 24 小时内无新版本发布。最近一次被跟踪的里程碑是 v0.8.5 有限每周稳定化线路（[Issue #9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)），其发布目标为 2026 年 8 月 30 日；冻结收编于 8 月 4 日。

## 3. 项目进展

过去 24 小时内没有 PR 被合并或关闭——所有 50 个活跃 PR 均保持开启状态。以下实质性进展来自近期关闭的 **issue**（即使尚未发布，它们代表已解决的问题）：

- **#10721**（已关闭）— knowledge.db_path 波浪号展开 bug，已在 `all_tools_with_runtime` 中通过 home 前缀展开修复。
- **#10324**（已关闭）— cron 手动触发 / 运行历史在 agent 重命名时的 TOCTOU 问题；安全后续工作已完成。
- **#10580**（已关闭）— 文档链接检查门槛扩展至扫描整个仓库，而不仅是变更行。
- **#10533**（已关闭）— `model_routing_config` 现在接受 `custom.*` 及其他有效的 provider 槽位，使工具校验与配置 schema 保持一致。
- **#10837**（已关闭）— RPC `config/set` 校验缺口已补上（gateway PATCH 和 CLI 此前已有校验）。

数个大型**堆叠式** PR 正向可合并状态推进：[PR #8965](https://github.com/zeroclaw-labs/zeroclaw/pull/8965)（skills 自动激活）在 #9563 合并后已基于 master 重新堆叠；[PR #10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259)（RPC 认证主体，RFC #8289 第 3 阶段）及其依赖 [PR #10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)（oidc 令牌验证，第 5 阶段）仍处于安全加固流水线中。

## 4. 社区热门话题

按快照时间窗口内的评论活动排序：

1. **[Issue #8692 — RFC 与设计议题的维护者决策队列](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)**（15 条评论，tracker）— 核心的维护者协调讨论串。该 issue 本身就是一个 tracker，被用于对 RFC 和架构决策进行分诊；高评论数反映了其作为元流程工件的角色，而非针对单个功能的争论。
2. **[Issue #10549 — RFC：简化 RFC 投票（取消强制窗口；REVIZE 即停止快照）](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)**（10 条评论，RFC）— 反映流程摩擦的信号：社区认为固定的 48h/72h 讨论窗口往往不会带来额外评审，且 REVISE 应当是一个干净的停止信号。这是一个关乎治理体验质量的话题，对项目吞吐量有影响。
3. **[Issue #10366 — RFC：PR 评审证据、时效性警告、作者行动边界](https://github.com/zeroclaw-labs/zeroclaw/issues/10366)**（7 条评论，RFC，进行中，高风险）— 提议为干净的建议性评审设立快速合并通道，并明确时效性/作者行动语义。第 2 版修订已纳入快速合并路径。
4. **[Issue #10734 — RpcDispatcher::process_line 接近 2 MB 栈保护（Windows）](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)**（7 条评论，bug，p1，进行中）— CI 中暴露出的真实 Windows 原生栈溢出，揭示了 RPC 分发热路径上确实存在的跨平台内存风险。

**深层诉求：** 贡献者一方面推动*减少流程摩擦*（更快的 RFC、更快合并干净的 PR），另一方面又希望*更严格的评审把关*（更清晰的证据、新鲜的批准）。这是成熟开源核心项目中的经典张力。

## 5. Bug 与稳定性

过去 24 小时内报告，按严重程度排序：

### S1 / p0 / p1（阻塞工作流或涉及安全）
- **[Issue #10066 — SOP 引擎在记录 schema 拒绝之前就推进后续步骤](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)**（p0，daemon/runtime，高风险）。当某步骤的 `output` schema 校验被拒绝时，后续步骤仍然执行，拒绝结果事后才被记录。未关联修复 PR。**状态：需要维护者关注。**
- **[Issue #10603 — OpenCode providers 从不发送 `x-opencode-session`](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)**（p1，安全，进行中，👍 3）。影响 OpenCode 中继上的 Go 模型，存在账号被标记的风险。尚无修复 PR 关联。
- **[Issue #10635 — 运行时 profile 成本上限未反映实际生效的全局每日预算](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)**（p1，安全）。一个 profile 可以报告 `max_cost_per_day_cents = 4294967295`，而全局账本仍然强制执行 `$10/day`。遥测数据令人困惑 / 存在成本泄漏隐患。未关联修复 PR。
- **[Issue #10645 — 委托子循环中缺少成本跟踪上下文](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)**（p1，#10601 的后续）。`check_tool_loop_budget` 对 delegate 子项返回 `None`，导致子循环可以超出限定范围的预算。
- **[Issue #10788 — 失败的 Code/ACP 回合将提示词和已完成的工具交互从持久化历史中丢弃](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)**（p1，进行中，ACP）。在 provider 故障（非取消）时，整个回合从持久化历史中消失。未关联修复 PR。
- **[Issue #10785 — 通知延迟导致 zerocode 中所有运行中的回合被取消](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)**（p1，进行中，ACP）。一份真实生产追踪：3 个 ACP + 1 个 fable 会话在 1ms 内全部通过 `begin_notification_resync → session/cancel` 被取消。**可复现的运营事故。**
- **[Issue #10734 — RpcDispatcher 栈溢出](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)**（p1，进行中）。CI 中出现的真实 Windows 0xc00000fd。见上文。
- **[Issue #10828 — openai-codex --device-code 404](https://github.com/zeroclaw-labs/zeroclaw/issues/10828)**（p1，安全）。CLI 使用了已废弃的设备认证端点。

### S2 / p2（体验降级）
- **[Issue #10793 — advisory 作业上三个仅 Windows 的测试失败，被测代码无变更](https://github.com/zeroclaw-labs/zeroclaw/issues/10793)** — CI 偶发失败，尚未找到根因。
- **[Issue #10736 / #10787 — 可复现的 provider 流恢复 bug](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)** — 单候选 provider 在 529 过载时跳过非流式回退并忽略 `provider_retries`。两者均在处理中。
- **[Issue #10779 — OpenCode 429 配额耗尽后仍以亚秒级退避重试](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)** — 应当快速失败。
- **[Issue #10802 — `session/list-acp` 与 `turn_end` 的 `message_count` 不一致](https://github.com/zeroclaw-labs/zeroclaw/issues/10802)** — 两个 RPC 统计的是不同东西。
- **[Issue #10821 — `zeroclaw service logs` 显示过期的 stderr](https://github.com/zeroclaw-labs/zeroclaw/issues/10821)** — 服务方式安装的 daemon 在不加 `--verbose` 时不输出任何 tracing 日志。

### S3 / p3
- **[Issue #10812 — WhatsApp PDF 缺少 jpegThumbnail](https://github.com/zeroclaw-labs/zeroclaw/issues/10812)** — 移动客户端上的预览回归。

**修复 PR 覆盖情况：** 本次快照中大多数 p1 issue 缺少配对的开启 PR；RPC 配置校验相关的一组（#10320 → #10837）展示了典型的 issue → 修复 PR → 关闭模式，但 provider 可靠性和 ACP 历史 bug 仍在等待代码。

## 6. 功能请求与路线图信号

过去 24 小时内活跃的条目：

- **[PR #10840 — feat(docs): 在 mdBook 中生成 llms.txt 和 llms-full.txt](https://github.com/zeroclaw-labs/zeroclaw/pull/10840)** — 提升 ZeroClaw 文档对 LLM 的可发现性；极有可能率先落地。
- **[PR #10407 — feat(sessions): 持久化会话提示词附件](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)** — 可选启用，基于 SQLite；标记为 needs-author-action，仍处于门控状态。
- **[PR #10596 — feat(runtime): 对持久化的 ACP 对话记录进行分页](https://github.com/zeroclaw-labs/zeroclaw/pull/10596)** — 有界游标分页；缓解长上下文 ACP 痛点。
- **[PR #9809 — feat(providers): 每个 provider profile 支持多模型](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)** — `[providers.models.<family>.<alias>.models.<model_alias>]` 子表；长期存在的贡献者请求。
- **[PR #9535 — feat(runtime): 将上下文压缩锚定到模型窗口比例](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)** — 取代硬编码的 32k 截断预算；上下文感知压缩具有广泛用途。
- **[PR #10525 — feat(zerorelay): 中继终结的浏览器注册前门（第 1 阶段）](https://github.com/zeroclaw-labs/zeroclaw/pull/10525)** — 可选启用的浏览器注册配对界面。
- **[PR #10610 — feat(security): shell V1 权限策略（RFC #7155 第 0+1 阶段）](https://github.com/zeroclaw-labs/zeroclaw/pull/10610)** — 五次提交的已接受 RFC 切片；极有可能是下一个稳定化版本的主要候选。
- **[Issue #10822 — 通过 RPC 的 `config/set-many` 原子批量配置变更](https://github.com/zeroclaw-labs/zeroclaw/issues/10822)** — 消除多次写入的非原子性隐患。
- **[Issue #10360 — RFC: 可选启用的家庭边缘 mesh，配备拉取 worker 和签名回执](https://github.com/zeroclaw-labs/zeroclaw/issues/10360)** — 宏大的多主机扇出架构；属长线规划。
- **[Issue #10826 — 使 ZeroCode 会话根目录选择显式化并保留恢复的根目录](https://github.com/zeroclaw-labs/zeroclaw/issues/10826)** — #10609 / #10565 的后续。

**下个版本预测：** v0.8.6 或下一个稳定化版本很可能会纳入 llms.txt 文档工作、shell V1 权限策略、`config/set-many`、ACP 对话记录分页，以及一组仅限校验后写入的 RPC 配置变更。OpenCode 会话头和边缘 mesh 工作看起来更为遥远。

## 7. 用户反馈摘要

从 issue 正文中提取的具体痛点：

- **配置安全性不一致。** 用户可以通过 `zeroclaw config set` 和 `RPC config/set`（#[10320](https://github.com/zeroclaw-labs/zeroclaw/issues/10320)）写入超范围的值，但 gateway PATCH 和 CLI 路由会正确校验——这种分歧正在侵蚀用户对配置层面的信任。
- **OpenCode 中继上的 provider 可靠性脆弱。** 缺失 `x-opencode-session` 头（[#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)）、429 配额重试（[#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)）、流故障恢复缺口（[#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)、[#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10887)）表明用户在他们认为“受支持”的 provider 上遭遇不一致的行为。
- **Windows 体验仍然薄弱。** 在 Windows 上符号链接会在未开启开发者模式时破坏 checkout（[#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)）、RPC 分发中的栈溢出（[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)）、三个无代码变更的仅 Windows 偶发测试失败（[#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793)）。在 Windows 上运行 ZeroClaw 的用户显然是二等公民。
- **成本控制令人困惑。** 看起来“无上限”的 profile 实际上受全局每日上限约束（[#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)），而委托子循环绕过了该策略（[#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)）。这是真实存在的运维意外隐患。
- **持久化历史不够持久。** ACP 故障可能抹掉整个回合，包括已接受的提示词和已完成的工具交互（[#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)）。
- **Telegram 表情回应静默伪造成功**（[PR #10843](https://github.com/zeroclaw-labs/zeroclaw/pull/10843) — 修复 #10842）。该工具在未调用 API 的情况下打印了虚假的确认信息。这类静默失败的 UX 是真正的信任问题。
- **流程摩擦已被正视。** RFC 投票简化话题（#10549）的高评论数是最明确的证据，表明贡献者认为 RFC 流程本身需要精简。

快照中没有可见的直接满意度指标（star 数、NPS 等），但评论分布表明用户群体参与度高、技术含量足——多位 issue 作者提供了详细的堆栈追踪和复现链接。

## 8. 积压任务观察

需要关注的长期运行或依赖维护者的条目：

- **[Issue #9459 — v0.8.5 稳定化线路 tracker](https://github.com/zeroclaw-labs/zeroclaw/issues/9459)** — 里程碑范围原定至 2026 年 8 月 30 日，目前已超过名义截止日期两周。应当明确地以已发布为由关闭，或明确地滚动顺延。
- **[Issue #9381 — crates.io 发布、打包、cargo-install 后续工作](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)** — Windows 符号链接的后续工作具有真实的用户影响，且自 7 月 26 日起一直处于开启状态。
- **[Issue #8691 — ADR 清单与已接受 RFC 决策记录](https://github.com/zeroclaw-labs/zeroclaw/issues/8691)** — 评论数虽低，但它跟踪的是已接受 RFC 的持久化决策记录后续落实；进展缓慢意味着已接受的决策可能没有对应的 ADR。
- **[PR #9109 — feat(providers): 原生 Hailo-Ollama 支持](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** — 标记为 `status:blocked, do-not-merge`；自 7 月 17 日起开启。要么解除阻塞，要么关闭以释放该贡献者。
- **[PR #8965 — feat(skills): 声明式自动激活](https://github.com/zeroclaw-labs/zeroclaw/pull/8965)** — 大型、堆叠式、`needs-author-action`。自 7 月 11 日起一直处于进行中。
- **[PR #9535 — feat(runtime): 将上下文压缩锚定到模型窗口比例](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)** — 大型，自 7 月 29 日起标记 needs-author-action。
- **[PR #10407 — feat(sessions): 持久化会话提示词附件](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)** — XL 体量，自 8 月 27 日起标记 needs-author-action。
- **[PR #10337 — fix(tools): git 操作遵守允许的根目录](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)** — 与安全相关，needs-author-action，高风险。
- **[PR #9819 — fix(multimodal): 像素级图像校验](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)** — 高风险，principal 级贡献者，needs-author-action，自 8 月 7 日起开启。
- **[Issue #8692 — 维护者决策队列](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 评论数高，作为元 tracker 的角色意味着这里行动缓慢会阻塞下游的 RFC 决策。

**健康信号：** ZeroClaw 呈现出一个成熟、重视安全、由 RFC 驱动的开源核心项目画像，维护者积极活跃（尤其是 Audacity88 和 JordanTheJet），社区贡献的 PR 源源不断。主要风险向量是等待作者或维护者行动的大型及 XL 体量 PR 队列，若不加处理，将加剧评审瓶颈并推迟 v0.8.6 稳定化线路。

---

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*