# OpenClaw 生态日报 2026-09-13

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-13 11:31 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-13

## 1. 今日概览

OpenClaw 今日吞吐量极高,**24 小时内更新了 1,000 项**议题与 PR,但**没有新版本发布**——考虑到积压的 P0 发布阻断项,这是一个值得关注的信号。约 45% 的议题和 PR 在同一窗口内由 open → closed,说明维护者正在积极分诊处理。今日活动集中在**核心子系统的稳定性与生命周期缺陷**(子代理会话、SQLite 状态、Gateway 重启、MCP 插件生命周期,以及 2026.9.3/9.4 线路的更新可靠性)。社区讨论集中在少数几个 diamond-lobster 级别的回归问题上,而非分散的抱怨,说明这是一个有内聚性的问题簇而非零散的投诉。

## 2. 版本发布

**过去 24 小时无新版本发布。** 鉴于仍有多个未关闭的 P0 发布阻断项(#145252、#145929、#112475、#145510、#140162),2026.9.5 补丁线路大概率即将推出,但尚未发布。

## 3. 项目进展

**今日关闭/推进的工作**(从 226 个已关闭 PR 中精选):

- **子代理生命周期重构落地。** [#67777](https://github.com/openclaw/openclaw/issues/67777)(已关闭)——超时/drain/orphan-prune 时完成交付可能丢失。一个长期 diamond-lobster 议题与 PR 工作同步关闭。
- **Telegram 内部上下文泄露已修复。** [#137927](https://github.com/openclaw/openclaw/issues/137927)——`<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` 块在用户消息中可见渲染(安全/UX P1)已解决。
- **Provider 端畸形 JSON 回归关闭。** [#135111](https://github.com/openclaw/openclaw/issues/135111)——在 claude-sonnet-5 / v2026.8.1 上间歇性出现 "malformed JSON arguments"。
- **Cron 会话回收器事件循环修复发布。** [#142476](https://github.com/openclaw/openclaw/issues/142476)(已关闭)——同步的 `PRAGMA integrity_check` 在 632-agent 网关上阻塞了 14–76 秒。(关闭了 fix-for-#139583 线程。)
- **WeChat 分发错误关闭。** [#145563](https://github.com/openclaw/openclaw/issues/145563)——`openclaw-weixin` 上的 `PreparedModelCatalogConfigReplacedError`。
- **SQLite 会话记录伴生特性合并**(均来自 #79902 umbrella):[#79904](https://github.com/openclaw/openclaw/issues/79904) 游标读取 API、 [#79903](https://github.com/openclaw/openclaw/issues/79903) 会话谱系发现、 [#79905](https://github.com/openclaw/openclaw/issues/79905) 类型化投影。整体上完成了一次 SQLite-first 会话存储重构(#78595)。
- **多个 Discord/Telegram 缺陷关闭:** [#79752](https://github.com/openclaw/openclaw/issues/79752) Node v26 下 gzip 解码、 [#26494](https://github.com/openclaw/openclaw/issues/26494) Telegram 单消息流式回归、 [#90444](https://github.com/openclaw/openclaw/issues/90444) 子代理 kill 后 `task_runs` 卡住。
- **鉴权/跨后端功能工作已关闭但仍待跟进:** [#78041](https://github.com/openclaw/openclaw/issues/78041) 冷路径鉴权延迟(4 秒)、 [#79047](https://github.com/openclaw/openclaw/issues/79047) 跨后端会话上下文、 [#58057](https://github.com/openclaw/openclaw/issues/58057) 动态白名单身份、 [#60381](https://github.com/openclaw/openclaw/issues/60381) 浏览器工具 `force` 点击、 [#71326](https://github.com/openclaw/openclaw/issues/71326) 跨 exec 陈旧文件读取。
- **重试运行器计时器修复合并:** PR [#145718](https://github.com/openclaw/openclaw/pull/145718)——无上限的 `Retry-After` 不再坍缩为 1 毫秒。
- **macOS 启动器工作、调试面板中的网关运行时长、浏览器会话标签页重构、脚本可靠性修复、Linux 伴生恢复状态**均通过新 PR 取得进展([#146976](https://github.com/openclaw/openclaw/pull/146976)、 [#146960](https://github.com/openclaw/openclaw/pull/146960)、 [#146973](https://github.com/openclaw/openclaw/pull/146973)、 [#146857](https://github.com/openclaw/openclaw/pull/146857)、 [#146214](https://github.com/openclaw/openclaw/pull/146214) codex 规范沙箱策略)。

## 4. 社区热点话题

**按评论量排序:**

1. **[#97616](https://github.com/openclaw/openclaw/issues/97616) — Hook/tool 子进程僵尸泄露(31 条评论,OPEN)** —— 一个长期的 P1 silver-shellfish 缺陷,父进程下未回收的 `openclaw-hooks`/`bash`/`codex` 子进程不断累积。底层需求:OpenClaw 的 hook 执行模型需要一个 reaper/wait-id 抽象层,缺失正在降低多日长跑网关的稳定性。
2. **[#135111](https://github.com/openclaw/openclaw/issues/135111) — claude-sonnet-5 上工具调用 JSON 畸形(27 条评论,CLOSED)** —— 社区驱动的独立用户复现将故障定位到 provider 端的参数截断,而非工具 schema 问题。
3. **[#44925](https://github.com/openclaw/openclaw/issues/44925) — 子代理完成结果静默丢失(27 条评论,OPEN,2 👍)** —— 旗舰级 "diamond lobster" 投诉,反映 Telegram 论坛机器人丢失子任务完成结果,且无重试/通知/重启。与刚关闭的 #67777 高度相似,说明修复并未覆盖所有代码路径。
4. **[#137927](https://github.com/openclaw/openclaw/issues/137927) — 内部上下文块泄露至 Telegram(14 条评论,CLOSED)** —— 与安全相关(可见的脚手架暴露内部指令);虽然已关闭,但话题暴露了社区对 prompt 注入暴露面的普遍担忧。
5. **[#114612](https://github.com/openclaw/openclaw/issues/114612) — memory-core SQLite 无界增长(14 条评论,OPEN)** —— 生产环境中 `memory_index_chunks` + `memory_embedding_cache` 表无界增长的证据;对于长时间运行的安装来说,这是一个随时会爆磁盘的定时炸弹。
6. **[#144911](https://github.com/openclaw/openclaw/issues/144911) — MCP 初始化超时导致 Gateway 崩溃(13 条评论,OPEN)** —— MCP 子进程清理中的未处理异常把整个 Gateway 拖垮;影响很大,因为 MCP 服务正变得越来越承重。
7. **[#139847](https://github.com/openclaw/openclaw/issues/139847) — 活跃回复运行期间消息被丢弃(12 条评论,OPEN)** —— 2026.9.2 回归:同一活跃 session key 上的并发入站消息因 "no active tool authority snapshot" 静默失败。
8. **[#144502](https://github.com/openclaw/openclaw/issues/144502) — WhatsApp TTS 语音消息(12 条评论,OPEN)** —— 移动端 WA 拒绝 48 kHz + Lavf vendor-tag 音频;一个影响用户可见功能的媒体管线缺陷。
9. **[#142476](https://github.com/openclaw/openclaw/issues/142476) — Cron 回收器 integrity_check 阻塞(12 条评论,CLOSED)** —— 632-agent 网关把单核钉住数十秒;**典型的运维高成本缺陷**,已迅速修复关闭。
10. **[#136183](https://github.com/openclaw/openclaw/issues/136183) — 命令执行器启动的 ssh 挂起(12 条评论,OPEN)** —— 2026.8.1 回归;执行器在服务端 banner 交换完成前就 kill 了 ssh。底层需求:长生命周期交互式命令的 PTY/spawn 语义。

**浮现出的社区底层需求:** (a) 一个统一、加固的 hook/MCP/SSH 进程生命周期管理器;(b) 子代理/孤儿完成交付的重试与退避语义(不仅仅是"首次尝试");(c) 内存存储容量治理;(d) 同一 session key 上重叠回复运行间的工具调用权限追踪。

## 5. 缺陷与稳定性

**按严重度排序(P0 发布阻断项优先):**

| 严重度 | Issue | 状态 | 备注 |
|---|---|---|---|
| **P0** | [#145252](https://github.com/openclaw/openclaw/issues/145252) — 2026.9.3/9.4 更新/升级/恢复追踪 | OPEN | 所有更新相关崩溃的 umbrella;尚无已提交修复。 |
| **P0** | [#145929](https://github.com/openclaw/openclaw/issues/145929) — 鉴权档案登出永久失败(lock-may-be-busy) | OPEN | 中断的 self-update 后锁状态仍残留;无竞争进程。 |
| **P0** | [#112475](https://github.com/openclaw/openclaw/issues/112475) — 设备移除后配对恢复失败 | OPEN | Gateway 2026.7.1 / CLI 2026.6.9;全设备作用域升级被阻断。 |
| **P0** | [#145510](https://github.com/openclaw/openclaw/issues/145510) — 更新在 `runtime-verification-failed` 失败 | OPEN | 2026.9.3 → 2026.9.4,win32/x64。 |
| **P0** | [#140162](https://github.com/openclaw/openclaw/issues/140162) — Windows 网关重启误杀就绪网关(181 秒陈旧清理) | OPEN | 在慢启动期间叠加;同样影响前台托管网关。 |
| **P0** | [#145072](https://github.com/openclaw/openclaw/issues/145072) — macOS npm 更新在 global-install-swap 失败 | CLOSED | 回滚启动器备份失败(符号链接模式 + chmod)。 |
| **P0** | [#133331](https://github.com/openclaw/openclaw/pull/133331) — UI:代理切换后 session actions 陈旧(PR) | OPEN | Diamond-lobster 级 UI 正确性问题,已有就绪 PR。 |
| **P0** | [#145563](https://github.com/openclaw/openclaw/issues/145563) — WeChat `PreparedModelCatalogConfigReplacedError` | CLOSED | |
| **P1 diamond** | [#44925](https://github.com/openclaw/openclaw/issues/44925)、 [#144911](https://github.com/openclaw/openclaw/issues/144911)、 [#139847](https://github.com/openclaw/openclaw/issues/139847)、 [#137332](https://github.com/openclaw/openclaw/issues/137332)、 [#115367](https://github.com/openclaw/openclaw/issues/115367)、 [#132765](https://github.com/openclaw/openclaw/issues/132765)、 [#141474](https://github.com/openclaw/openclaw/issues/141474)、 [#145152](https://github.com/openclaw/openclaw/issues/145152)、 [#106704](https://github.com/openclaw/openclaw/issues/106704)、 [#118885](https://github.com/openclaw/openclaw/issues/118885) | OPEN | 子代理/会话生命周期、MCP、鉴权关卡、swarm。尚无已确认合并的修复。 |
| **P1 platinum** | [#63216](https://github.com/openclaw/openclaw/issues/63216)、 [#135111](https://github.com/openclaw/openclaw/issues/135111)、 [#144502](https://github.com/openclaw/openclaw/issues/144502)、 [#134993](https://github.com/openclaw/openclaw/issues/134993)、 [#86214](https://github.com/openclaw/openclaw/issues/86214)、 [#135858](https://github.com/openclaw/openclaw/issues/135858) | OPEN/CLOSED | 回归问题与平台特定运行时问题的混合。 |

**2026.9.x 线路的崩溃/回归热点:** MCP 子进程清理(#144911)、cron 回收器(#142476 ✅)、9.2 消息丢弃(#139847)、9.3 WAL 暴涨(#143524)、9.3/9.4 更新路径(#145252/#145510/#145072)。**7 个 9.x 线路缺陷中有 5 个收敛到 SQLite 或进程生命周期。**

## 6. 功能请求与路线图信号

- **伴生端的游标 SQLite 会话记录读取 API** —— [#79904](https://github.com/openclaw/openclaw/issues/79904) ✅ 今日已发布;预期可催生监听规范存储的第三方 UI/TUI。
- **类型化会话记录投影与重建契约** —— [#79905](https://github.com/openclaw/openclaw/issues/79905) ✅ 已发布;标志着规范事件存储是长期读取路径。
- **跨轮换的会话谱系与 `sessionId` 发现** —— [#79903](https://github.com/openclaw/openclaw/issues/79903) ✅ 已发布;补齐了与新 SQLite 运行时之间的空白。
- **可配置的 `memory_search` / `memory_get` 超时** —— PR [#140933](https://github.com/openclaw/openclaw/pull/140933)(OPEN,diamond-lobster)把硬编码的 15 秒改为可调。**高概率纳入 2026.9.5。**
- **Skill Workshop 提案上下文收敛** —— PR [#146977](https://github.com/openclaw/openclaw/pull/146977)(基于今日的缺陷 [#145503](https://github.com/openclaw/openclaw/issues/145503) 的跟进)。
- **面向 storage-worker 切换的浏览器会话标签页重构** —— PR [#146973](https://github.com/openclaw/openclaw/pull/146973)(OPEN);标志着 storage-worker 迁移正在中途。
- **长期路线图想法仍在排队:** 与版本匹配的捆绑文档 + 原生检索用于上手([#71301](https://github.com/openclaw/openclaw/issues/71301))、面向盲人用户的"线性持久工作区"无障碍模式([#82450](https://github.com/openclaw/openclaw/issues/82450))、浏览器工具 `force` 点击([#60381](https://github.com/openclaw/openclaw/issues/60381))、跨后端会话上下文([#79047](https://github.com/openclaw/openclaw/issues/79047))、动态白名单身份([#58057](https://github.com/openclaw/openclaw/issues/58057))。
- **Codex 规范沙箱读取策略** —— PR [#146214](https://github.com/openclaw/openclaw/pull/146214)(XL,兼容性风险)是当前体量最大的 PR;被打了 broad-area 标签,暗示近期可能有 Codex 平台版本发布。

## 7. 用户反馈摘要

**痛点(来自真实生产环境的用户):**

- **运维可靠性:** 多代理网关(例如 632 个代理)上的多位用户反映,亚秒级的响应能力退化到 14–76 秒的阻塞,原因来自同步 SQLite 操作或未处理异常。(#142476、 #118885、 #143524。)
- **Telegram 论坛用户**意见尤为强烈:子代理完成结果静默丢失、内部上下文泄露至用户可见文本、子代理脱缰在背后继续运行。(#44925、 #137927、 #101656。)
- **

---

## 横向生态对比

# 跨项目对比报告:个人 AI 助手/Agent 开源生态
**快照日期:2026-09-13** · 项目:OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

个人 AI 助手层正在向一套共享架构收敛 —— 一个长期运行的守护进程/网关,统一编排 LLM 调用、工具/子代理进程,以及本地 SQLite 支持的会话存储 —— 因此也撞上了同一类问题。在所有五个项目中,当日最主要的 Bug 流集中在**状态存储并发、持久的会话历史以及子进程监管**,而非模型质量或提示词行为。消息通道适配器(Telegram、WhatsApp、微信、Discord)与 MCP/ACP 协议互通构成了第二大工作主线。值得注意的是,**五个项目在本周期内均未发布新版本**:生态整体处于修缮与加固姿态,其中 OpenClaw 和 Hermes 处于活跃的热修复循环中,ZeroClaw 则明确在重构其发布流程。

---

## 2. 活跃度对比

| 项目 | Issue 活跃度(24h) | PR 活跃度(24h) | 发布状态 | 健康度评分* |
|---|---|---|---|---|
| **OpenClaw** | ~1,000 issue+PR 合计¹ | 关闭 226 PR;触及项中约 45% 已关闭 | 无;2026.9.5 可能临近(5 个未解决的 P0 阻塞项) | **7.5** —— 吞吐量与关闭率在同组中最高,但 P0 积压集中在升级路径上 |
| **Hermes Agent** | 50 项更新 | 50 项更新;12 项已合并/关闭 | 无;当前 v0.21.2(2026-09-11),v0.21.3 热修复预计 24–48h 内发布 | **7.0** —— 事件收敛速度极佳(一日内 6 个相互竞争的修复 PR),但 v0.21.2 带入了一个 P0 级回归 |
| **ZeroClaw** | 34 项更新(已关闭 6) | 50 项更新(已合并/关闭 12) | 无;v0.8.5 后稳定化周期 | **6.0** —— 稳定加固节奏,但每个未解决的 P0 都缺少关联的修复 PR |
| **QwenPaw** | 8 项有动静 | 2 个开放修复,0 个合并 | 无 | **5.5** —— 定向的协议修复卡在评审中;面向用户的持久性投诉无人回应 |
| **IronClaw** | 0 | 1 个开放 PR(仅测试) | 无 | **n/a** —— 信号不足 |

¹OpenClaw 的日报统计将 issue 与 PR 合并报告;无法按类型拆分。
*评分相对得出,综合考虑吞吐量、关闭率、P0 暴露度与维护者响应度。

---

## 3. OpenClaw 的位置

**相较同侪的优势:**
- **规模与吞吐量** 远超同组(约 1,000 项/天 对 比下一档的 50–100 项/天),约 45% 的当日关闭率表明其具备真正的分诊能力,而非单纯的积压滚动。
- **部署证据** 无可匹敌:社区报告提及 632 节点的 agent 网关、持续多日的不停机运行,以及四个活跃的消息通道(Telegram、WhatsApp、微信、Discord)。同侪的 tracker 中没有可相比拟的生产级使用记录。
- **状态层的架构纵深**:今日落地的 SQLite-first 会话存储套件(#79904 cursor 读取 API、#79903 lineage 发现、#79905 类型化投影)明确面向第三方 companion/UI 生态 —— 这是同侪尚未布局的生态打法。

**技术路线差异:** OpenClaw 押注以规范化 SQLite 事件存储作为外部客户端的读取路径,并行推进存储层 worker 迁移与 Codex 沙箱平台工作(#146973、#146214)。Hermes 将网关 + CLI + Desktop + cron 多路写入器复用到同一 `state.db` 上(目前是它的故障点);ZeroClaw 是带 RPC/ACP 表面的 Rust 守护进程;QwenPaw 围绕插件商店 + Driver 架构构建。

**坦诚的风险提示:** OpenClaw 9.x 线的七个 Bug 中有五个集中在 SQLite 或进程生命周期 —— 这正是本周 Hermes 最严重故障(#109509 → `DeletedWalGenerationError`)所对应的子系统类别。OpenClaw 投入更大但不等于免疫;升级路径上仍有五个未解决的 P0(#145252、#145929、#112475、#145510、#140162)。

**社区规模:** 各项可观察指标均居首位 —— 评论量(31 与 27 楼的讨论帖)、issue ID 总量(约 146k 对比 Hermes 约 109k、ZeroClaw 约 10.8k、QwenPaw 约 7.7k),以及平台特定报告者的广度。

---

## 4. 共同的技术焦点领域

跨多个项目浮现的需求:

| 浮现中的需求 | 涉及项目 | 证据 |
|---|---|---|
| **多写入者 SQLite / 会话状态持久化** | OpenClaw、Hermes、QwenPaw | Hermes:前 30 个 issue 中约 15 个是短生命周期写入者引发的 WAL/锁僵局;OpenClaw:WAL 膨胀(#143524),同步 `integrity_check` 阻塞 14–76 秒(#142476);QwenPaw:重新部署后会话丢失(#7724、此前的 #7708) |
| **无静默丢失的 turn/补全投递** | OpenClaw、ZeroClaw、QwenPaw | OpenClaw:子代理补全丢失(#44925)、活跃运行中消息被丢弃(#139847);ZeroClaw:失败的 ACP turn 清空已接受的 prompt 与工具历史(#10788、#10673),resync 会取消正在运行的 turn(#10785) |
| **子进程监管(MCP/hooks/SSH)** | OpenClaw、Hermes | OpenClaw:僵尸进程泄漏(#97616)、MCP 初始化超时使 Gateway 崩溃(#144911)、ssh 挂起(#136183);Hermes:MCP 重启时 `_refresh_tools` 崩溃(#109824) |
| **MCP/ACP/A2A 跨 SDK 互通** | QwenPaw、OpenClaw、Hermes、ZeroClaw | QwenPaw:Java/Kotlin SDK 错误信封(#7728/#7729)、ACP 权限匹配(#7732)、A2A 路线图需求(#7484);Hermes:SDK 2.x `readOnlyHint` 大小写问题、Zoho Calendar(#47963);ZeroClaw:ACP 持久化集群 |
| **升级/打包可靠性** | OpenClaw、ZeroClaw、Hermes | OpenClaw:5 个 P0 升级问题集群;ZeroClaw:crates.io 打包 + Windows 符号链接(#9381)、发布效率 tracker(#10814);Hermes:浅克隆出现误报 "update available"(#98214) |
| **Provider 重试/退避/降级纪律** | ZeroClaw、OpenClaw、Hermes | ZeroClaw:529 无退避(#10787)、未使用的非流式降级(#10736)、429 在亚秒级重试(#10779);OpenClaw:`Retry-After` 未设上限导致退避 1ms(#145718);Hermes:Copilot/Fireworks/key_cmd 适配脆弱 |
| **资源治理(磁盘/成本)** | OpenClaw、ZeroClaw | OpenClaw:`memory_index_chunks` 无界增长(#114612);ZeroClaw:成本账本低估(#10699)、按配置文件的限额失效(#10635、#10645) |
| **Windows 兼容性** | ZeroClaw、OpenClaw | ZeroClaw:RPC 调度器栈溢出(#10734)、3 个 advisory-job 失败;OpenClaw:win32 升级失败(#145510)、gateway 重启被杀死(#140162) |

---

## 5. 差异化分析

| 项目 | 核心架构 | 主要交互面 | 明显目标用户 |
|---|---|---|---|
| **OpenClaw** | Node 网关、SQLite-first 规范化事件存储、多代理编排 | 4 个消息通道、浏览器工具、skills workshop、companion UI | 在网关规模上运营生产级多代理助手的操作者 |
| **Hermes Agent** | Python,多进程 profile 多路复用(gateway/CLI/cron/Desktop) | TUI + Desktop GUI、广泛的 provider 矩阵、kanban/cron 自动化 | 拥有异构 provider 的高阶用户;面向瘦客户端 Desktop 方向(#50643,👍14) |
| **IronClaw** | Turn 状态元数据引擎(`TurnRunState` lineage) | 本窗口内不可观察 | 研究/内部正确性导向(NearAI) |
| **QwenPaw** | 插件商店 + 统一 MCP/A2A Driver 架构 | 控制台、插件市场、Docker | 运行多机 "管家" agent 的中文用户 |
| **QwenPaw vs. ZeroClaw** 对比 | — | — | QwenPaw 优化插件广度;ZeroClaw 优化守护进程正确性、SOP 工作流与硬性成本控制 |
| **ZeroClaw** | Rust 守护进程、RPC/ACP、SOP 引擎、成本账本 | ZeroCode 编辑面板、TUI、服务生命周期 | 想要一个带强制预算的自托管 Rust 守护进程的开发者 |

关键结构性差异:OpenClaw 与 Hermes 优化**对话式助手广度**(通道、provider、GUI),ZeroClaw 优化**运营严谨度**(账本准确性、持久历史、确定性发布),QwenPaw 优化**可扩展性**(插件、协议 Driver)。IronClaw 是唯一在纯正确性/QA 上投入、且本周期内无用户可见表面变化的项目。

---

## 6. 社区势头与成熟度

- **第一梯队 —— 极度活跃的迭代:****OpenClaw**(约 1,000 项/天;存储层 worker 迁移、Codex 平台 PR、companion API 同步推进)与 **Hermes**(100 项/天;同一 Bug 上出现 6 个相互竞争的修复 PR、协调式的 supersede、社区 agent —— "Team6" —— 提交自动化 PR)。两者都发布得快、坏得也快。
- **第二梯队 —— 稳态加固:****ZeroClaw** —— 在持久化/成本/打包主题上合并了 12 个 PR,并设有专门的发布工程 tracker(#10814)。这是一个在打磨流程而非扩张表面的项目。
- **第三梯队 —— 可观察活跃度低:****QwenPaw** —— 优先级正确(协议修复),但本周期零合并,持久性报告无人回应;**IronClaw** —— 仅有单个测试 PR,无社区牵引力。
- **成熟度研判:** OpenClaw 拥有最成熟的分诊机器,但背负发布债务(两条发布线上的 P0 都未解决);Hermes 事件响应最快,但合并前的回归纪律最弱;ZeroClaw 表现出最强的发布纪律自觉。

---

## 7. 趋势信号

1. **状态层是主战场。** 跨项目最大的 Bug 类别是来自短生命周期写入者的并发 SQLite 访问(Hermes 整个 P0 日;OpenClaw 的 WAL/reaper 集群;QwenPaw 的会话丢失)。持久且支持多写入者安全的会话存储已成为入门门槛,而缺乏这一能力的项目(QwenPaw)正在肉眼可见地流失信任。
2. **持久 turn 历史成为正确性契约。** "静默丢失" 一词反复出现在 OpenClaw(#44925、#139847)、ZeroClaw(#10788)与 QwenPaw(#7724)。可以预期,带重试/退避的 turn 补全投递语义将成为差异化特性。
3. **进程监管仍是未解决的共同缺口。** 没有一个项目为 hooks、MCP server、SSH 子进程提供统一的 reaper/wait-id 抽象(OpenClaw #97616/#144911/#136183)。这是共享库或规范标准的优质候选方向。
4. **MCP 碎片化真实存在且在扩大。** SDK 方言差异(Java 错误信封、hint 大小写、错误形态)在四个项目中产生适配 Bug;A2A 是下一个抢位的协议(QwenPaw #7484、ZeroClaw 的 ACP 工作)。
5. **自升级可靠性驱动流失。** OpenClaw 的 P0 集群、ZeroClaw 的打包 tracker、Hermes 的误报升级检查都表明:让用户流失的不是运行时,而是安装/升级路径。
6. **成本与磁盘治理正在成为差异化点**,尤其对常驻型助手而言(ZeroClaw 的成本账本三件套;OpenClaw 的内存无界增长 #114612)。
7. **Agent 作为贡献者:** Hermes 社区管理的 agent 开出自动化 PR(#109768)是一个值得跟踪的早期 dogfooding 信号 —— 生态的工具开始自我维护。

**给开发者的结论:** OpenClaw 在规模、通道广度与生态架构上领先,但必须清掉升级路径上的 P0;Hermes 推进最快,代价是回归风险;ZeroClaw 是正确性/运维的基准;QwenPaw 在其插件野心放大问题之前,需要先投入持久化能力。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-13

## 1. 今日概览

Hermes Agent 今日节奏异常密集,**过去 24 小时内有 50 个 issue 和 50 个 PR 更新**,尽管没有发布新版本。最主要的信号是**由 PR #109509 合入的权限加固引发的回归集群** —— 该 PR 新增了 `_secure_state_db_files()` 辅助函数,在 open/fchmod/close 周期中意外丢失了 POSIX SQLite 锁,导致 Linux 和 macOS 上出现连锁的 `DeletedWalGenerationError` 卡死。维护者和社区响应者对问题进行了紧急分诊 —— 当天内至少**六个 P0/P1 级别的 PR** 提交并关闭,针对 WAL 锁问题(PR [#109841](https://github.com/NousResearch/hermes-agent/pull/109841)、[#109754](https://github.com/NousResearch/hermes-agent/pull/109754)、[#109759](https://github.com/NousResearch/hermes-agent/pull/109759)、[#109752](https://github.com/NousResearch/hermes-agent/pull/109752)、[#109734](https://github.com/NousResearch/hermes-agent/pull/109734))。整体活动表明项目处于**紧急补丁与发布循环**,而非新功能开发模式。

## 2. 版本发布

**过去 24 小时内无新版本发布。** 数据中提到的最新发布版本为 **v0.21.2(2026-09-11)**,即当前触发 WAL 回归报告的构建。

## 3. 项目进展

**已合入/关闭的 PR(共 12 个)** —— 今日以针对 state.db/WAL 回归的紧急修复为主:

- [#109841](https://github.com/NousResearch/hermes-agent/pull/109841) — **Teknium 的挽救性修复**,解决短生命周期写入者导致的 state.db WAL 解除链接问题;关闭 [#109786](https://github.com/NousResearch/hermes-agent/issues/109786) 和 [#109687](https://github.com/NousResearch/hermes-agent/issues/109687)。从 `os.open/fchmod` 切换为直接 `os.chmod`。
- [#109754](https://github.com/NousResearch/hermes-agent/pull/109754) — 基于 chmod(2) 的同款修复变体;关闭 [#109727](https://github.com/NousResearch/hermes-agent/issues/109727),修复 [#109728](https://github.com/NousResearch/hermes-agent/issues/109728)。
- [#109759](https://github.com/NousResearch/hermes-agent/pull/109759) 和 [#109752](https://github.com/NousResearch/hermes-agent/pull/109752) — 重复的 **macOS 专属**锁保护修复(其中一个因另一个被关闭)。
- [#109734](https://github.com/NousResearch/hermes-agent/pull/109734) — **Linux 专属**的 `_secure_state_db_files` 锁保护修复;修复 [#109728](https://github.com/NousResearch/hermes-agent/issues/109728)。
- [#109819](https://github.com/NousResearch/hermes-agent/pull/109819) — Kanban 熔断器必须发出 `blocked` 事件(后被 [#109843](https://github.com/NousResearch/hermes-agent/pull/109843) 取代)。
- 另有 5 个已关闭的 PR,涉及遥测、网络、安装与更新方面的细节优化。

从合并修复的节奏来看,**v0.21.3 热补丁即将发布**,原因包括严重程度标签(两个 P0)以及广泛的环境矩阵(Linux ext4、macOS APFS、单配置与多配置网关)。

## 4. 社区热议话题

讨论最多的帖子(按评论数和反应数排序):

- **WAL/会话状态卡死** — [#109786](https://github.com/NousResearch/hermes-agent/issues/109786)(9 条评论,已关闭) 和 [#109687](https://github.com/NousResearch/hermes-agent/issues/109687)(9 条评论,已关闭) 报告:单次短生命周期的 CLI 调用会永久卡住运行中网关的 `state.db` WAL generation。两个问题已通过 PR [#109841](https://github.com/NousResearch/hermes-agent/pull/109841) 修复。
- **权限加固回归** — [#109728](https://github.com/NousResearch/hermes-agent/issues/109728)(7 条评论,开放中) 将同一类故障归因于 [#109509](https://github.com/NousResearch/hermes-agent/pull/109509) 的所有者权限加固,候选修复方案正在推进。
- **自定义 provider 上下文 bug** — [#86097](https://github.com/NousResearch/hermes-agent/issues/86097)(5 条评论,开放中) — `/api/model/info` 将 256,000 的回退值错误地报告为 `custom_providers` 安装的"自动检测"。自 2026-08-14 开放至今未解决。
- **GitHub Copilot OAuth 回归** — [#49582](https://github.com/NousResearch/hermes-agent/issues/49582)(5 条评论,开放中,自 2026-06-20 起) — `gho_` token 通过直接调用可以成功,但经由 Hermes 则报"PAT not supported"。凸显了 provider 集成的脆弱性。
- **仅 Desktop 安装 + 远程网关** — [#50643](https://github.com/NousResearch/hermes-agent/issues/50643)(👍 14,开放中) 是**反应数最高的功能请求**:希望启用一个轻量级 Desktop GUI 客户端,仅连接远程网关,无需本地 CLI/agent 组件。

**社区核心需求:** 用户希望**在多写入者拓扑下实现会话韧性**(网关 + cron + CLI + Desktop 共享同一个 `state.db`),而今日流量显示当前的锁模型无法应对短生命周期的并发 SQLite 写入者。

## 5. Bug 与稳定性

### P0 — 严重,会话中断
- [#109786](https://github.com/NousResearch/hermes-agent/issues/109786) — `hermes doctor` / 短生命周期连接解除链接实时 WAL → 网关 SIGBUS 级故障。**修复:PR #109841 已合入。**
- [#109687](https://github.com/NousResearch/hermes-agent/issues/109687) — 单次普通 CLI 调用导致 Linux ext4 上网关 WAL 孤立。**修复:PR #109841 已合入。**

### P1 — 严重,回归与卡死
- [#109728](https://github.com/NousResearch/hermes-agent/issues/109728) — `_secure_state_db_files()` 在 fchmod 期间丢弃 POSIX 锁。**修复:PR #109754(已关闭)与 #109734(已关闭,仅 Linux 范围)。**
- [#109825](https://github.com/NousResearch/hermes-agent/issues/109825) — 回归 337ef8f8:通过一次性 fd 的 fchmod 丢弃 WAL 死开关锁 → SIGBUS(👍 1)。
- [#109790](https://github.com/NousResearch/hermes-agent/issues/109790) — macOS 上全新会话出现约 1 小时的 `DeletedWalGenerationError` 卡死。
- [#109824](https://github.com/NousResearch/hermes-agent/issues/109824) — 两个 WAL bug:cron 写入者每 30 分钟触发一次 inode 冲突;MCP 重启期间 `_refresh_tools` 在 `None` 会话上崩溃。
- [#109823](https://github.com/NousResearch/hermes-agent/issues/109823) 与 [#109809](https://github.com/NousResearch/hermes-agent/issues/109809) — 跨网关重启持续出现 `DeletedWalGenerationError`;Desktop 应用不可用。
- [#109819](https://github.com/NousResearch/hermes-agent/pull/109819)(PR,已关闭) — kanban 熔断器从未发出 `blocked` 事件。

### P2 — 显著的稳定性/UX 问题
- [#86097](https://github.com/NousResearch/hermes-agent/issues/86097) — `/api/model/info` 回退值误报。
- [#49582](https://github.com/NousResearch/hermes-agent/issues/49582) — Copilot OAuth 回归。
- [#78497](https://github.com/NousResearch/hermes-agent/issues/78497) — TUI 通知轮询绕过会话上下文。
- [#101418](https://github.com/NousResearch/hermes-agent/issues/101418) — `skill_manage` 校验报错过于笼统,导致 agent 重试循环。
- [#109774](https://github.com/NousResearch/hermes-agent/issues/109774) — 辅助 `title_generation` 向非推理 provider 发送 `reasoning` 字段(Fireworks 400)。
- [#109837](https://github.com/NousResearch/hermes-agent/issues/109837) — `key_cmd` provider 在 metadata/aux 路径中发送 `repr(token)` 或空凭据。
- [#107528](https://github.com/NousResearch/hermes-agent/issues/107528) — Desktop 的 `active-profile.json` 重新启动后过期;消息会泄漏到错误的 profile。

### P3 — 轻微
- [#103410](https://github.com/NousResearch/hermes-agent/issues/103410)、[#79874](https://github.com/NousResearch/hermes-agent/issues/79874)、[#109806](https://github.com/NousResearch/hermes-agent/issues/109806)、[#109805](https://github.com/NousResearch/hermes-agent/issues/109805)、[#109756](https://github.com/NousResearch/hermes-agent/issues/109756)、[#105710](https://github.com/NousResearch/hermes-agent/issues/105710)、[#98214](https://github.com/NousResearch/hermes-agent/issues/98214)。

**规律:** 今日前 30 个 issue 中大约 **15 个与会话状态/WAL 相关**,表明一次单一根因的热补丁可以解决当天大部分 P0/P1 积压。

## 6. 功能请求与路线图信号

今日流量中可见的开放功能请求:

- **#39372 — 后台/集成运行污染用户可见的会话列表**(4 条评论)。可能在下一个 minor 版本中处理 —— 是 Desktop 整洁度的根本问题,与活跃的 `sweeper:risk-session-state` 工作流一致。
- **#50662 — 关闭按钮应最小化到系统托盘**(2 条评论,自 2026-06-22 起)。长期挂起的 Desktop UX 请求;尚无开放 PR。
- **#50643 — 仅 GUI 的 Desktop 安装,用于远程网关客户端**(👍 14,自 2026-06-22 起)。社区信号强烈;与 PR [#109768](https://github.com/NousResearch/hermes-agent/pull/109768)("reuse the gateway backend for profiles it already serves")方向一致,提示**multiplex_profiles 路径最终可能支持一个仅远程的轻量级 Desktop 客户端**。
- **#109746 — `kanban.wake_event_kinds` 过滤**(开放 PR) — 增量配置,在嘈杂的终端事件上抑制来源 agent 唤醒。
- **#109816 — 仅在文件编辑时触发回合结束验证提示** — 提议对纯文本回答回合添加验证钩子。
- **#109066 — Camofox 浏览器执行后端**(开放 PR) — 为现有浏览器工具增加替代实现。

**预测:** 下一个版本(预计**24–48 小时内的 v0.21.3 热补丁**)将整合 WAL 修复,并可能加入 [#109746](https://github.com/NousResearch/hermes-agent/pull/109746) 和 [#109768](https://github.com/NousResearch/hermes-agent/pull/109768)。轻量级 Desktop 客户端架构(围绕 [#50643](https://github.com/NousResearch/hermes-agent/issues/50643))有可能排入 v0.22。

## 7. 用户反馈汇总

**满意度信号:**
- 社区响应速度极高 —— 24 小时内针对同一个 bug 提出六个竞争性 PR,表明维护者/协作者生态健康。
- PR 互相引用并取代重复项(#109843 取代 #109819),显示出协同落地能力。

**痛点(集中):**
- **多进程会话并发** 是最强烈的单一抱怨 —— 用户在同一个 `state.db` 上同时运行网关 + cron + 交互式 CLI + Desktop,锁模型无法应对。多位报告者表示"全新网关自行挂起"。
- **权限加固未经充分回归测试即发布** —— 用户指出,#109509 是在仍有破坏 Linux 与 macOS POSIX 锁语义的开放代码路径时合入的。
- **跨 provider 脆弱性** — Copilot、Fireworks、自定义 `key_cmd`、MCP SDK 2.x 都暴露了适配器/SDK 版本不匹配的问题。
- **MCP 工具集成** — Zoho Calendar 与 SDK 2.0 `readOnlyHint`(驼峰式 vs 下划线式)的问题,表明 MCP 适配器维护已落后于 SDK 发布节奏。
- **Desktop profile 管理** — 过期的 `active-profile.json` 静默地将消息路由到错误的 profile 存储,存在数据完整性风险。
- **更新/安装 UX** — 浅克隆更新检查误报"Update available"([#98214](https://github.com/NousResearch/hermes-agent/issues/98214))。

**亮点:** 社区管理的 `agent` "Team6" 现在正基于日常使用发起自动化 PR([#109768](https://github.com/NousResearch/hermes-agent/pull/109768)),体现出社区对项目的信任与势能。

## 8. 待办事项关注

重要性高但维护者关注度低的 issue(老旧且仍开放):

- [#86097](https://github.com/NousResearch/hermes-agent/issues/86097) — 自定义 provider 的 `/api/model/info` 上下文长度误报(自 **2026-08-14** 起开放,30 天)。
- [#49582](https://github.com/NousResearch/hermes-agent/issues/49582) — GitHub Copilot `gho_` OAuth 回归(自 **2026-06-20** 起开放,约 85 天)。
- [#39372](https://github.com/NousResearch/hermes-agent/issues/39372) — 后台会话污染历史记录(自 **2026-06-04** 起开放,约 100 天;仅 4 条评论)。
- [#50662](https://github.com/NousResearch/hermes-agent/issues/50662) — 关闭时最小化到托盘(自 **2026-06-22** 起开放,与 #46566 重复)。
- [#50643](https://github.com/NousResearch/hermes-agent/issues/50643) — 仅 GUI Desktop 用于远程网关(自 **2026-06-22** 起开放,👍 14,获得最多点赞的功能请求)。
- [#47963](https://github.com/NousResearch/hermes-agent/issues/47963) — Zoho Calendar MCP 失败(自 **2026-06-17** 起开放)。
- [#78497](https://github.com/NousResearch/hermes-agent/issues/78497) — TUI 通知轮询上下文绕过(自 **2026-08-04** 起开放)。
- [#107528](https://github.com/NousResearch/hermes-agent/issues/107528) — `active-profile.json` 过期的数据完整性 bug(自 **2026-09-10** 起开放,尚无修复 PR)。

**给维护者的建议:** 优先处理 **#49582(Copilot OAuth)**、**#50643(仅 GUI Desktop)** 和 **#107528(profile 指针过期)**。第一个影响 provider 覆盖范围,第二个有 14 个 👍(社区需求最高),第三个存在跨 profile 静默数据丢失的风险。

---

**项目健康度总结:** Hermes Agent 当前处于活跃的热补丁循环。今日最大的单一风险 —— 由 #109509 引起的 WAL/generation 卡死 —— 已在合并队列中处理,预计即将发布。待办项偏向 provider/MCP/Desktop 方面的打磨,而非核心功能,表明项目基础正在趋于稳定,而集成广度已超过适配器维护速度。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目每日摘要 — 2026-09-13

## 1. 今日概览

过去 24 小时内 IronClaw 仓库活动极少，**没有新增、关闭或评论的 Issue，也没有发布新版本**。唯一的仓库事件是一个处于开启状态的 Pull Request（[PR #8098](https://github.com/nearai/ironclaw/pull/8098)），它在已有的 lineage 测试基础上新增了一个逆向回归测试。从项目健康度来看，今天属于低活跃度的一天，而非负面信号：未出现崩溃、回归或社区争议，且这一唯一改动延续了围绕 `TurnRunState` 元数据处理的测试加固方向，并未触及任何用户可见的行为变更。

## 2. 版本发布

过去 24 小时内未发布新版本。按照摘要撰写规范，本节省略。

## 3. 项目进展

**今日合并/关闭的 PR：** 无。

**未关闭 PR 动态：**
- [PR #8098 — test(turns): pin state-derived lineage drop](https://github.com/nearai/ironclaw/pull/8098)（作者：huiq777，于 2026-09-12 开启）— 在已有的终态重写 lineage 测试之外，新增一个配套的逆向回归测试。它断言初始 turn 元数据携带三个 lineage 字段（`depth`、`activation provenance` 与 `descendant cap`），而由 `TurnRunState` 派生得到的后续快照则刻意省略这三个字段。该 PR 当前仍处于开启状态，尚无任何表情反应或评审意见，表明它刚刚进入评审队列。

今日没有功能或缺陷修复分支合入；唯一的贡献仍是测试加固。

## 4. 社区热议话题

过去 24 小时内没有评论量或表情数明显突出的 Issue 或 Pull Request。[PR #8098](https://github.com/nearai/ironclaw/pull/8098) 是唯一活跃的事项，零表情反应，尚未引发评审讨论。因此，**根据当前活动无法推断出任何潜在的社区需求或痛点** —— 现有信号（turn-state 快照中的 lineage 元数据规范性）似乎源于内部对正确性的关注，而非用户上报的问题。

## 5. 缺陷与稳定性

**过去 24 小时内没有报告任何缺陷、崩溃或回归。** 未关闭 Issue 列表显示无新增或更新的条目，也未合并任何缺陷修复 PR。虽然开启中的 [PR #8098](https://github.com/nearai/ironclaw/pull/8098) 本身是一个 *测试* PR（即它编码了一项先前已识别或预期存在的回归风险 —— `TurnRunState` 派生 lineage 字段可能被丢弃），但其性质属于预防性措施 —— 用于固化行为而非修复当前缺陷 —— 不应将其归类为活跃 Bug。

**严重程度评级：** 无可报告内容。

## 6. 功能请求与路线图信号

今日没有提交新的功能请求，从当前数据窗口中也无从提炼路线图信号。唯一的未关闭 PR（[#8098](https://github.com/nearai/ironclaw/pull/8098)）表明对 **turn-state 元数据保障机制** 的持续投入，具体而言是原始 turn 元数据（携带 depth / activation provenance / descendant cap）与 `TurnRunState` 派生快照（丢弃这些字段）之间的非对称处理。如果该测试合入后没有后续跟进，最可能的相邻工作是 —— 在面向用户的文档或表层遥测中明确化这种 lineage 字段丢弃行为 —— 但仅有单日数据，这一推断仍属推测。

## 7. 用户反馈摘要

**过去 24 小时内未捕获到新的用户反馈**：零 Issue 更新、零评论记录、零表情反应。因此，无法基于当前活动总结任何痛点、使用场景或满意度信号。任何关于用户情绪的结论都需要拉取今日摘要时间窗口之外的更长周期数据。

## 8. 待办事项观察

在窗口期内没有 Issue 更新，也没有 PR 合入，**没有新事项进入待办列表**。今日唯一需要维护者关注的事项是：

- [PR #8098 — test(turns): pin state-derived lineage drop](https://github.com/nearai/ironclaw/pull/8098) — 等待首次评审；截至当前快照，零评论、零表情反应。由于这是仓库内唯一在动的项目，若能尽快完成评审，今日队列即可清空。

---

**整体健康度评估：** 安静、平稳的一天。仓库活动仅限于一个尚未获得社区关注的测试类 PR；无版本发布压力、无回归、无争议。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-13

## 1. 今日概览

QwenPaw（github.com/agentscope-ai/QwenPaw）在过去 24 小时内活跃度适中，涉及 8 个 issue、2 个 PR 有更新，但**未发布任何新版本**。活动主要集中于 MCP/A2A 协议硬化（2 个 bug 报告与对应的 2 个修复 PR），以及用户在插件开发工作流与会话持久化方面的稳定性问题。维护者在本周期内尚未合并任何 PR，说明这两项待修复内容仍在评审中。总体而言，项目目前处于稳步修复 bug 的节奏，而非功能发布周期。

## 2. 版本发布

过去 24 小时内未发布新版本，无版本号变更。

## 3. 项目进展

今日无 PR 被合并或关闭。有 2 个 PR 处于开放状态，直接针对近期提交的 bug：

- **[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)** — `fix(acp): select permission options by protocol kind` *（axrelay-dev，今日更新）*  
  通过优先使用稳定的 `kind` 而非实现自定义的 `optionId` 来改进 ACP 权限匹配，修复对安全工具调用错误回退到交互式提示的问题。仍处于开放状态，等待维护者评审。

- **[#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)** — `fix(mcp): recognize Java jsonRpcError envelope on discover probe` *（kabishou11，2026-09-12 更新）*  
  修复 `_unwrap_jsonrpc_result` 信封检查逻辑，使 Java/Kotlin MCP SDK 响应（HTTP 500 + `jsonRpcError` 包体）在 Driver 构造过程中能够被正确解析。关闭 [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728)。

进展信号：MCP/ACP 协议栈正在得到积极且有针对性的修复——这是跨 SDK 互操作能力健康的良好迹象。

## 4. 社区热议话题

过去 24 小时内评论最多的条目集中在智能体记忆与会话管理相关的用户痛点：

- **[#7571 — "总是记不住，还是会遗忘"](https://github.com/agentscope-ai/QwenPaw/issues/7571)** *（4 条评论，xiaohushi512）* — 尽管反复给出指令，智能体仍反复在配置路径之外创建 `TODO` 文件，甚至在开发目录（A）与运行时插件路径（C）之间迁移源代码编辑，导致通过自动部署覆盖正在运行的运行时代码。核心需求：更强的**工作区/路径作用域记忆与指令**，以及防止智能体在声明的开发边界外操作的护栏机制。
- **[#7724 — "会话丢失"](https://github.com/agentscope-ai/QwenPaw/issues/7724)** *（3 条评论，xiaohushi512）* — 在会话中途进行插件重新部署 + 关闭后，先前的对话和已配置的 LLM 都会丢失；停止/重启也无法恢复被中断的会话。核心需求：**插件重新部署与关闭事件下的会话持久性**，以及更清晰的模型配置持久化机制。
- **[#7484 — "基于qwenpaw 2.x的A2A何时支持"](https://github.com/agentscope-ai/QwenPaw/issues/7484)** *（3 条评论，qixinbo）* — 社区询问 A2A 协议何时能像 2.x 架构文档中所承诺的那样，加入现有的 MCP Driver 支持。核心需求：**统一 Driver 机制的路线图透明度**。
- **[#7582 — Plugin store UX](https://github.com/agentscope-ai/QwenPaw/issues/7582)** *（2 条评论，One-sixth，现已关闭）* — 批量更新、页面重置闪烁以及缺失的更新通知，使多插件管理变得繁琐。
- **[#7728 — MCP Java SDK 500 error](https://github.com/agentscope-ai/QwenPaw/issues/7728)** *（2 条评论，remotepan-design）* — Java/Kotlin MCP 服务端返回带有非标准错误包体的 HTTP 500，导致 Driver 构建失败。

## 5. 缺陷与稳定性

按用户可见严重程度排序：

| 严重程度 | Issue | 描述 | 修复 PR |
|----------|-------|-------------|--------|
| **高** | [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | 插件重新部署 + 关闭后对话与模型配置丢失；无恢复路径 | 无 |
| **高** | [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) | 智能体忽略路径/指令约束，悄悄编辑错误目录并通过自动部署覆盖运行时代码 | 无 |
| **中** | [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) | Java/Kotlin MCP SDK 的 `server/discover` HTTP 500 错误导致 Driver 构造失败 | [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) ✅ 开放 |
| **中** | [#7730](https://github.com/agentscope-ai/QwenPaw/issues/7730) | 插件目录读取失败（连接重置/CDN 中断）绕过了文档中规定的离线回退机制并抛出服务端错误 | 无 |
| **关联** | [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) | 当 `optionId` 非标准时 ACP 权限选择遗漏安全选项——引发不必要提示的 UX 回退 | PR 本身即为修复 |

严重程度判定依据：[#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) 与 [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) 会导致**静默的数据/工作丢失**；[#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) 则会破坏与一大类 MCP 服务端的互操作性。

## 6. 功能请求与路线图信号

- **[#7484 A2A 协议支持](https://github.com/agentscope-ai/QwenPaw/issues/7484)** — 强信号表明统一 Driver 架构预计将很快推出 A2A 支持；维护者的回复将有助于明确时间表。
- **[#7582 Plugin store UX](https://github.com/agentscope-ai/QwenPaw/issues/7582)**（已关闭但尚未合并）— 诉求包括：(1) 安装时不进行整页刷新，(2) 一键批量更新，(3) 第三方插件的更新通知。这些需求合理，可以纳入下一个 2.x 小版本。
- **[#7731 Files panel: dot-file toggle](https://github.com/agentscope-ai/QwenPaw/issues/7731)** — 小型、低风险的 Console 增强。
- **[#3429 Pre-install CLI tools in Docker image](https://github.com/agentscope-ai/QwenPaw/issues/3429)**（今日关闭）— 长期存在的将 `himalaya` 等 CLI 工具预装入官方镜像的请求；关闭表明该请求已落地或已被拒绝。

**下一版本预测：**预计将发布 2.2.x 补丁版本，包含 MCP 信封修复（[#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729)）与 ACP 权限修复（[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)），可能还会一并打包 dot-file 切换功能（[#7731](https://github.com/agentscope-ai/QwenPaw/issues/7731)）。

## 7. 用户反馈摘要

- **不满——智能体指令遵循度：** [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) 表明智能体在跨会话中反复遗忘路径/作用域规则，导致运行代码被静默覆盖。这是一个反复出现的主题（用户甚至引用了此前的会话）。
- **不满——持久性：** [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) 与引用的 [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) 揭示出在重新部署/关闭后模型配置丢失与会话恢复方面存在持续性问题——这是一种模式，而非偶发个例。
- **不满——插件管理 UX：** [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582) 凸显了将 QwenPaw 用作多机器"维护管家"的用户所面临的摩擦（批量更新、更新通知）。
- **用例佐证：** 多机器插件管理（One-sixth）、严格区分开发/运行时的插件开发（xiaohushi512）、跨 SDK MCP 互操作（remotepan-design）、容器化 CLI 工作流（MCQSJ）——QwenPaw 正被用于**生产级智能体运维**，而不仅仅是玩具级演示。

## 8. 待办关注

需要维护者关注的事项：

- **[#7571 (xiaohushi512)](https://github.com/agentscope-ai/QwenPaw/issues/7571)** — 尚无 👍 反应，也无维护者回应，但所报告的损害（自动部署覆盖）十分严重。需要排查指令作用域属于配置问题、提示问题还是运行时护栏问题。
- **[#7724 (xiaohushi512)](https://github.com/agentscope-ai/QwenPaw/issues/7724)** — 会话丢失回退，且存在先例（[#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)）；需要确认是否为已知的 2.2.x 回退。
- **[#7730 (anxkhn)](https://github.com/agentscope-ai/QwenPaw/issues/7730)** — 契约文档中提到的"离线回退"在实现中并未真正生效；应修复文档/代码漂移。
- **[#7484 (qixinbo)](https://github.com/agentscope-ai/QwenPaw/issues/7484)** — 一个路线图层面的问题，长期未得到回应；维护者只需简短回复即可明确预期。
- **[#7732 PR (axrelay-dev)](https://github.com/agentscope-ai/QwenPaw/pull/7732)** — 面向 ACP UX 回退的开放修复；需要评审人。
- **[#3429 (MCQSJ)](https://github.com/agentscope-ai/QwenPaw/issues/3429)** — 经过约 5 个月后今日关闭；值得维护者备注确认 `himalaya` 是否现已预装。

---

**总结：** QwenPaw 的协议栈正在获得扎实且有针对性的修复，但面向用户的稳定性（会话持久性、指令遵循度）是当前最主要的痛点，且尚未得到足够重视。建议优先推进 [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) 与 [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) 的调查，并将 [#7729](https://github.com/agentscope-ai/QwenPaw/pull/7729) / [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) 快速纳入下一个补丁版本。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目简报 — 2026-09-13

## 1. 今日概览

过去 24 小时内，ZeroClaw 的分类处理活动显著上升：**34 个 issue** 被更新（6 个已关闭，28 个仍开放），**50 个 PR** 被刷新（12 个已合并/关闭，38 个仍开放）。**核心主题是 Windows 路径与 ACP/ZeroCode 路径上的运行时与守护进程正确性**：至少有 3 个开放的 P0/P1 Bug 涉及 ACP 回合持久化、成本上限和 SOP 引擎，此外还有 3 个 issue 处理 Windows 特有的栈溢出以及 `Advisory Windows nextest` 作业中反复出现的测试失败。今日新开了一个发布效率追踪项（[#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814)），标志着 v0.8.5 之后的稳定化周期正在积极推进。未发布任何新的标签化版本。

## 2. 版本发布

过去 24 小时内无新版本发布。上一标签版本为 **v0.8.4**（参见 [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)），新开的追踪项 [#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814) 将后续工作定位为下一次发布的"发布效率与可重复发布能力"（尚未公布版本号）。

## 3. 项目进展

过去 24 小时内有 6 个 issue 和 2 个值得关注的 PR 被关闭：

- **[#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)（已关闭）** — 有界委托静默剥离 `delegate` 工具；运行时配置现与 `delegation_policy`/`max_delegation_depth` 保持一致。
- **[#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)（已关闭）** — 当回复以 `[` 开头（ElevenLabs v3 音频标签）时，Telegram TTS 语音回复被丢弃。
- **[#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277)（已关闭）** — `zerorelay` Docker 基础镜像通过摘要锁定（`rust:1.96.1-slim`、`gcr.io/distroless/cc-debian13:nonroot`）；CI 一致性变更。
- **[#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)（已关闭）** — `zeroclaw service logs` 在 macOS/Windows/OpenRC 上返回空结果。
- **[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)（已关闭）** — 成本账本因 `ModelCostRates` 缺失缓存写入费率而少计缓存未命中。
- **[#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436)（已关闭）** — 原生 OpenRouter 流式响应在长推理回合中被总 HTTP 超时截断。
- **[#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248)（已关闭）** — 关于规范化主体与共享授权解析的 PR（#8289 阶段 2）——已合入或被撤回；其依赖项 #10255 / #10259 仍开放。
- **[#10586](https://github.com/zeroclaw-labs/zeroclaw/pull/10586)（已关闭）** — Dependabot Web 小版本/补丁批量更新（已被更大的 [#10820](https://github.com/zeroclaw-labs/zeroclaw/pull/10820) 取代，后者仍开放）。

净效应：渐进式加固 —— 成本核算准确性、跨平台守护进程卫生、供应链锁定，以及若干长期存在的体验小问题都在一个周期内取得进展。

## 4. 社区热点话题

按过去 24 小时 issue/PR 评论数排序：

1. **[#10734 — Windows 上 `RpcDispatcher::process_line` 栈溢出](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)**（7 条评论，P1，进行中）。由 Advisory Windows nextest 作业触发 —— `process_line_session_new_creates_session_on_two_mega…` 触及 2 MB 栈保护阈值（余量 2%）。底层需求：Windows 特有的测试基础设施在原本干净的纯 cron PR 上偶发卡死。
2. **[#9381 — crates.io 发布、打包、cargo-install 后续工作](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)**（5 条评论，P2 追踪项，高风险）。自 7 月下旬以来一直开放；首个后续项（crate 内符号链接在未启用开发者模式的 Windows 检出中会被破坏）具有真实用户影响，目前正阻塞一条更可用的安装路径。
3. **[#10066 — SOP 引擎在记录输出架构拒绝之前就推进了后续步骤](https://github.com/zeroclaw-labs/zeroclaw/issues/10066)**（4 条评论，P0，已接受）。P0 工作流阻塞：下游 SOP 步骤在引擎已判定结果无效的情况下继续执行。
4. **[#10788 — 失败的 Code/ACP 回合丢弃已接受的提示与已完成的工具交互](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)**（3 条评论，P1，进行中）。ACP 回合上的提供商错误会清除已接受的用户提示及任何已完成的工具交互 —— 一个影响持久历史完整性的 Bug，兼具隐私与恢复影响。
5. **[#10814 — 发布效率与可重复发布追踪项](https://github.com/zeroclaw-labs/zeroclaw/issues/10814)**（新开，P1）。今日新建；v0.8.5 之后发布工程诉求的集合。

这些讨论背后共通的需求：**守护进程/回合管线正被端到端审计其持久性与可复现性** —— 记录了什么、持久化了什么、故障后哪些内容得以保留，以及 Windows/非 Linux 路径如何在 CI 中被覆盖。

## 5. Bug 与稳定性

### P0 / S1（工作流阻塞、数据丢失、安全）

| Issue | 领域 | 状态 | 修复 PR？ |
|---|---|---|---|
| [#10066](https://github.com/zeroclaw-labs/zeroclaw/issues/10066) | SOP 引擎 —— 验证顺序 | 已接受 | 未关联 |
| [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | markdown 内存后端 —— 并发 `store()` 竞态静默丢弃条目 | 已接受（S0） | 无 |
| [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673) | 在守护进程 RPC 路径上持久化失败的 ACP 回合（ZeroCode Code 面板） | 已接受 | 追踪 [#9378](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) |
| [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) | `begin_notification_resync` 取消所有运行中的回合 | 进行中 | 无 |
| [#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635) | 运行时配置 `max_cost_per_day_cents` 报 `u32::MAX`，而全局账本仍然拒绝 | 已接受 | 无 |

### P1 / S2（行为降级）

| Issue | 领域 | 状态 | 修复 PR？ |
|---|---|---|---|
| [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | 失败的 ACP 回合清除已接受提示与工具历史 | 进行中 | 无 |
| [#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645) | 成本追踪上下文未传递到委托子循环 | 已接受 | 无 |
| [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | Windows 上 `RpcDispatcher::process_line` 栈溢出 | 进行中 | 无 |
| [#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) | Advisory 作业上三个 Windows 专属测试失败 | 进行中 | 无 |
| [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) | 单候选流恢复忽略 `provider_retries`；529 → 一次即时重试，无退避 | 进行中 | 无 |
| [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | 输出前流失败跳过已声明的非流式回退 | 进行中 | 无 |
| [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) | `knowledge.db_path` 的波浪号展开为全局替换，导致知识工具被丢弃 | 开放 | 无 |
| [#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814) | 发布效率追踪项 | 开放 | 无 |

### P2 / S3（次要）

[#10802](https://github.com/zeroclaw-labs/zeroclaw/issues/10802)（`session/list-acp` 与 `turn_end` 间 `message_count` 不一致）、[#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)（429 FreeUsageLimitError 以亚秒级退避重试）、[#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795)（交互式 REPL 从未启用 `IUTF8` → 多字节字符下退格键失效）、[#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796)（ZeroCode 聊天输入忽略 Delete 键）、[#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794)（Advisory Windows 作业上 publish_contract 测试失败）、[#10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741)（ZeroCode 在干净响应后暂停队列）。

今日关闭（已从 Bug 板上移除）：[#10534](https://github.com/zeroclaw-labs/zeroclaw/issues/10534)、[#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)、[#10277](https://github.com/zeroclaw-labs/zeroclaw/issues/10277)、[#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)、[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)、[#10436](https://github.com/zeroclaw-labs/zeroclaw/issues/10436)。

活跃 P0 列表中无带 `fix:` 的 PR 被关闭 —— **上述每个 P0 仍未关联修复 PR**，这是本简报中最重要的风险信号。

## 6. 功能请求与路线图信号

具有维护者或贡献者活跃牵引力的开放功能/增强项：

- **crates.io 发布与 Windows 安全打包** — [#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)。下一个版本的高置信候选；"符号链接破坏 Windows 检出"子任务具有真实的上手影响。
- **可配置、感知授权的 Telegram 未授权发送者通知** — [Issue #10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400) + [PR #10401](https://github.com/zeroclaw-labs/zeroclaw/pull/10401)（状态：`needs-author-action`、`stale-candidate`）。若维护者重启该 PR，可能进入下一版本。
- **持久化的会话提示附件** — [PR #10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)。可选的 SQLite 持久化附件（每会话 ≤ 4 个），变更操作采用一次性审批。需要作者操作。
- **按模型窗口比例锚定的上下文压缩** — [PR #9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)。用 `runtime_profiles.<name>.context_compact_ratio` 替代固定的 32k token 预算。与最近的 `ModelCostRates` 工作自然契合。
- **每个提供商配置支持多个模型** — [PR #9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)。`[providers.models.<family>.<alias>.models.<model_alias>]` 子表；长期处于 `needs-author-action`。
- **通道中按会话的消息序列化** — [PR #10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411)。当 `interrupt_on_new_message` 开启时，消除同一会话的并发回合。
- **像素级图像校验** — [PR #9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)。通过使用 `image` crate 解码来防御损坏图像上传对提供商的危害。
- **Web 编辑器的 `/upload` 斜杠命令** — [PR #10578](https://github.com/zeroclaw-labs/zeroclaw/pull/10578)。小而集中、低风险；可能很快合入。

**下一标签版本的发布就绪度预测**：下一发布版本最有可能捆绑 #10248 系列的主体工作（部分已合入）、若 `needs-author-action` 项得到解决还将包含图像校验与多模型提供商工作，以及可能包含 Windows 发布与 SOP 修复 —— 但**不会**包含仍未解决的 P0 成本/SOP/内存 Bug，除非未来 48–72 小时内出现专属的修复 PR。

## 7. 用户反馈摘要

从今日流量可见的具体痛点：

- **Windows 上手体验脆弱**：未启用开发者模式的开发者无法检出带有符号链接编译时资产的 crate（[#9381](https://github.com/zeroclaw-labs/zeroclaw/issues/9381)）；`service logs` 在 Windows/macOS/OpenRC 上静默无输出（[#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)，现已关闭）；多字节输入下 TUI 退格键失效（[#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795)）。
- **Telegram 是高摩擦通道**：以 `[` 开头的输出导致语音回复被静默丢弃（[#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)，已关闭）；未授权发送者通知是不可本地化的硬编码字符串，未反映实际授权路径（[#10400](https://github.com/zeroclaw-labs/zeroclaw/issues/10400)）。
- **ACP / ZeroCode 上的持久历史很脆弱**：失败的回合会丢失已接受的提示与已完成的工具交互（[#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)），看似干净的完成仍可能卡住队列（[#10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741)），`session/list-acp` 与 `turn_end` 报告的数量不一致（[#10802](https://github.com/zeroclaw-labs/zeroclaw/issues/10802)）。
- **成本控制存在泄漏**：配置本地的 `max_cost_per_day_cents` 未反映有效全局上限（[#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)），委托子循环在无作用域成本上下文下运行（[#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)），缓存写入 token 未计价（[#10699](https://github.com/zeroclaw-labs/zeroclaw/issues/10699)，已关闭）。
- **提供商韧性不一致**：429 配额错误被重试而非快速失败（[#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)），单候选 529 仅一次无退避重试（[#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)），非流式回退被记录但未被调用（[#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)）。
- **可靠性相关的人体工学诉求**：ZeroCode 聊天编辑器中的 Delete 键（[#10796](

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*