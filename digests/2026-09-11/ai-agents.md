# OpenClaw 生态日报 2026-09-11

> Issues: 447 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-11 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目简报 — 2026-09-11

## 1. 今日概览

OpenClaw 在 v2026.9.4 发布后进入密集的发布周期活动，**24 小时内有 447 个 issue 和 500 个 PR 得到更新** —— 为近几周可见的最高单日量之一。项目正处于高压力的发布管理阶段：v2026.9.4 发布当天即有人提交了针对它的 P0 级发布阻断问题(#144742),且 2026.9.x 系列上还有多个更新路径回归在陆续出现。维护者信号强劲(大多数可入队的 PR 带有 `fix-shape-clear` / `clawsweeper:source-repro` 标签并处于 ready-for-look 状态)，但会话状态、消息丢失和更新流程方面的回归率依然偏高。整体活动评估：**发布承压，但大多数新 bug 都有积极分诊和明确的负责信号。**

## 2. 发布

### v2026.9.4 — 于 2026-09-11 发布
本次唯一的新版本是 **v2026.9.4**,亮点是 "Recover from compatible failed updates"(从兼容的失败更新中恢复)功能：当 schema/config 检查确认回滚安全时，系统会连同之前的服务一起恢复先前的软件包和配置。数据库迁移仍然要求有经过验证的更新前备份(PR #140339)。

**️ 发布当天即提交的发布阻断问题：**[Issue #144742](https://github.com/openclaw/openclaw/issues/144742) 报告称，已发布的 2026.9.4 未包含 #144208 已合并的修复，残留的一条 version-1 交接租约行导致每次配置写入都失败(`assertSourceUnborrowed` 会扫描整个租约存储)。由维护者 `steipete` 提交，评级为 **P0 / diamond lobster / release blocker**。这实际上意味着，在包含 #144208 的 2026.9.5 发布之前，v2026.9.4 **不宜在生产环境中安装**。

**迁移说明：**无破坏性 schema 变更；回滚功能通过现有更新路径按需启用。

## 3. 项目进展

**过去 24 小时合并/关闭情况(共 186 个 PR)—— 值得关注的已关闭条目：**
- [PR #143276](https://github.com/openclaw/openclaw/pull/143276) —— `fix(memory): preserve managed local service startup budget`(memory-core)—— 已关闭但未合并，目标 issue 为 #143169。
- [Issue #140971](https://github.com/openclaw/openclaw/issues/140971) —— 因 `feishu_chat` 宿主限制导致 Feishu 插件工具被静默丢弃(2026.7.1→2026.8.1 回归)—— **已关闭**。
- [Issue #140821](https://github.com/openclaw/openclaw/issues/140821) —— 2026.9.2 更新后在 systemd 用户服务下网关重启挂起 —— **已关闭(修复方案已成形，回归 P1)**。
- [Issue #123326](https://github.com/openclaw/openclaw/issues/123326) —— 多智能体 Codex 迁移使网关启动陷入崩溃循环 —— **已关闭**(P0,gold shrimp)。
- [Issue #96337](https://github.com/openclaw/openclaw/issues/96337) —— `anthropic-vertex` route=native 回归导致输出不可见 —— **已关闭**(platinum hermit)。
- [Issue #96947](https://github.com/openclaw/openclaw/issues/96947) —— OpenRouter Anthropic `cacheWrite` 回归 —— **已关闭**(gold shrimp)。
- [Issue #97021](https://github.com/openclaw/openclaw/issues/97021) —— Telegram 输入状态指示器在 forum/topic 模式下卡住 —— **已关闭**(gold shrimp)。
- [Issue #92405](https://github.com/openclaw/openclaw/issues/92405) —— 子智能体 spawn 时持久化的是原始 provider 而非 CLI 运行时 —— **已关闭**(platinum hermit)。
- [Issue #79553](https://github.com/openclaw/openclaw/issues/79553) —— 向导交叉覆盖多账户插件凭据 —— **已关闭**(diamond lobster)。
- [Issue #76233](https://github.com/openclaw/openclaw/issues/76233) —— `exec-approval-followup` 与子智能体 bundle-mcp 销毁存在竞态 —— **已关闭**(diamond lobster)。

**推进中的开放 PR:**
- [PR #121668](https://github.com/openclaw/openclaw/pull/121668) —— `feat(codex): config kill-switch for the native hook relay`(针对 P0 #91009 hook 中继问题)。
- [PR #144768](https://github.com/openclaw/openclaw/pull/144768) —— `fix(models): require provider-bound credentials for provider use`(XL,维护者就绪，已标记安全边界)。
- [PR #144871](https://github.com/openclaw/openclaw/pull/144871) —— `feat(sqlite): run Team Reports storage in owned workers`(维护者,ready for look)。
- [PR #144699](https://github.com/openclaw/openclaw/pull/144699) —— `feat(memory): shared memory database for multi-agent deployments`(解决 #114612 类的扇出问题)。
- [PR stack #143587 → #143610 → #143615 → #143631 → #143834](https://github.com/openclaw/openclaw/pull/143615) —— 跨 iOS/macOS/web 的选中会话操作，并集成 Live Activities(vincentkoc)。
- [PR #144688](https://github.com/openclaw/openclaw/pull/144688) —— `fix(update): candidate snapshot fails on Windows when a registered agent path carries the extended-length prefix`(关闭 #144581)。

## 4. 社区热议话题

**按评论数排行(24 小时)：**

| 排名 | 条目 | 评论数 | 深层需求 |
|------|------|----------|-----------------|
| 1 | [Issue #125626](https://github.com/openclaw/openclaw/issues/125626) —— v2026.8.1 beta 反馈 | 24 | 汇总的 beta 分诊；已置顶用于发布验证 |
| 2 | [Issue #91009](https://github.com/openclaw/openclaw/issues/91009) —— Codex `PreToolUse` hook 中继拉起 CPU 密集的 `openclaw-hooks`,令网关 RPC 停滞 | 22 | **Hook 子系统在高负载下没有资源上限**；需要进程池或单进程超时 |
| 3 | [Issue #119720](https://github.com/openclaw/openclaw/issues/119720) —— 同步的智能体持久化阻塞网关事件循环 | 17 | **核心可扩展性天花板**；#140231/#138984 的局部修复并不足够 |
| 4 | [Issue #97616](https://github.com/openclaw/openclaw/issues/97616) —— 泄漏的 hook/工具子进程(僵尸进程累积)| 15 | **进程生命周期/回收**是反复出现的一类问题(另见 #91009、#144809)|
| 5 | [Issue #114612](https://github.com/openclaw/openclaw/issues/114612) —— SQLite 内存表无上限增长 | 13 | **长期运维健康度**；需要为 memory_index_chunks 和 memory_embedding_cache 制定保留策略 |
| 6 | [Issue #49876](https://github.com/openclaw/openclaw/issues/49876) —— Cron 会话在工具失败时输出幻觉内容 | 12 | **信任与安全**：cron 触发的输出中出现静默编造不可接受 |
| 7 | [Issue #40786](https://github.com/openclaw/openclaw/issues/40786) —— 功能:`backup` CLI 中支持 `.gitignore` 风格的排除模式 | 12 | 备份易用性；涉及敏感数据与体积膨胀的顾虑 |
| 8 | [Issue #136183](https://github.com/openclaw/openclaw/issues/136183) —— `ssh` exec 在 banner 处挂起(2026.8.1→2026.8.2 回归)| 11 | 子进程 I/O 处理需要 SIGTERM 安全的取消机制 |
| 9 | [Issue #141747](https://github.com/openclaw/openclaw/issues/141747) —— 运行时 `<system-reminder>` 每轮注入约 686 个 token,且无法关闭 | 10 | **成本与透明度**；用户希望掌控 token 计量 |
| 10 | [Issue #136203](https://github.com/openclaw/openclaw/issues/136203) —— Windows de-DE 2026.8.2 升级导致 Doctor 被阻塞 | 9 | **Windows 升级易用性**(区域设置相关路径)|
| 11 | [Issue #144712](https://github.com/openclaw/openclaw/issues/144712) —— `npm update` 在“global install swap”处失败；完好的回滚被报告为 unverified | 8 | **v2026.9.4 当天即出现故障**；更新路径脆弱 |
| 12 | [Issue #139847](https://github.com/openclaw/openclaw/issues/139847) —— 回复执行期间到达的消息被丢弃(2026.9.2 回归)| 8 | **回复与入口消息之间的并发控制**缺少工具权限快照 |
| 13 | [Issue #135776](https://github.com/openclaw/openclaw/issues/135776) —— 更新后核心/插件版本偏差;Discord 因缺少 `plugin-sdk/security-runtime` 导出而失败 | 7 | 未强制执行**核心+插件原子化更新** |

主导信号：**用户高度关注生命周期/进程类 bug**(僵尸进程、泄漏、挂起)以及更新/升级的安全性，而非功能缺失。社区将 2026.9.x 视为一条脆弱的过渡版本线。

## 5. Bug 与稳定性

### P0 / 发布阻断(需立即处理)
- **[#144742](https://github.com/openclaw/openclaw/issues/144742)** —— 2026.9.4 缺失 #144208;每次配置写入均失败。**当前版本中没有修复。**⚠️ 最高优先级。
- **[#144712](https://github.com/openclaw/openclaw/issues/144712)** —— `npm update` 的 global install swap 在 2026.9.3→2026.9.4 上失败(2/2 必现)。回滚报告显示 "unverified"。P0 diamond lobster。当日回归。
- **[#136203](https://github.com/openclaw/openclaw/issues/136203)** —— Windows de-DE 2026.8.2 升级导致 Doctor 维护被阻塞；旧版工作区状态被保留。P0 diamond lobster。
- **[#135776](https://github.com/openclaw/openclaw/issues/135776)** —— 更新后固定版本的插件仍停留在上一版本;Discord 因缺少 `plugin-sdk/security-runtime` 导出而失败。P0 platinum hermit。
- **[#91009](https://github.com/openclaw/openclaw/issues/91009)** —— Codex `PreToolUse` hook 中继拉起 CPU 密集的 `openclaw-hooks`(100%+ CPU),令网关 RPC 停滞。P0 silver shellfish。**PR #121668(kill-switch)是已排定的修复方案。**
- **[#142476](https://github.com/openclaw/openclaw/issues/142476)** —— 2026.9.3 的 cron 会话 reaper 对每个智能体 DB 同步执行 `PRAGMA integrity_check`,在拥有 632 个智能体的网关上阻塞事件循环 14-76 秒。P1 diamond lobster。

### P1 / 严重回归
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** —— 大规模场景下，同步的智能体持久化 + 会话记录维护阻塞网关事件循环(17 条评论)。Diamond lobster。部分修复 #140231/#138984 已落地；完整重写仍在进行。
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)** —— 未回收的 hook/工具子进程累积为僵尸进程(15 条评论)。Silver shellfish。
- **[#136183](https://github.com/openclaw/openclaw/issues/136183)** —— `ssh` exec 在 2026.8.1→2026.8.2 中于 banner 处挂起。Silver shellfish。
- **[#140620](https://github.com/openclaw/openclaw/issues/140620)** —— 原地 2026.7.1→2026.9.2 升级在会话记录对账进行到 27/~1500 时停滞。P0 silver shellfish。
- **[#139847](https://github.com/openclaw/openclaw/issues/139847)** —— 回复执行期间到达的并发消息被丢弃:"Reply operation has no active tool authority snapshot."。Diamond lobster。
- **[#137294](https://github.com/openclaw/openclaw/issues/137294)** —— 预检压缩(600 秒)被 300 秒的 ingress adoption watchdog 中止，消息随后被投入死信队列。Diamond lobster。
- **[#137332](https://github.com/openclaw/openclaw/issues/137332)** —— 混合终端的 requester-settle 批次在所有权检查后无限重试。Diamond lobster。
- **[#140821](https://github.com/openclaw/openclaw/issues/140821)** —— 2026.9.2 上 systemd 用户服务下网关重启挂起 —— **已关闭(修复方案已成形)**。
- **[#116691](https://github.com/openclaw/openclaw/issues/116691)** —— Volcengine 长对话经 `openai-responses` 出现故障："missing `input.status` parameter."。Silver shellfish。
- **[#144809](https://github.com/openclaw/openclaw/issues/144809)** —— `claude-cli` 轮次超过 `RUN_STALE_TAKEOVER_MS` 时会丢失已生成的全部回复。Gold shrimp。
- **[#103198](https://github.com/openclaw/openclaw/issues/103198)** —— WebChat 图片附件被映射到 `image_0` 而非 media-store 路径。Diamond lobster(3 👍 —— bug 列表中社区反应最高的一条)。
- **[#118839](https://github.com/openclaw/openclaw/issues/118839)** —— "Restart recovery claim changed before agent adoption" 在 2026.7.2-beta.7 上针对 WebChat → Telegram 绑定的会话再次出现。Platinum hermit。

### P2 / 重要但影响可控
- **[#141747](https://github.com/openclaw/openclaw/issues/141747)** —— `<system-reminder>` 每轮注入约 686 个 token,无法关闭(成本/透明度)。
- **[#143980](https://github.com/openclaw/openclaw/issues/143980)** —— `taskSuggestions.accept` 对 Docker 沙箱中的智能体失败(缺少 `/workspace`)。
- **[#141233](https://github.com/openclaw/openclaw/issues/141233)** —— Codex 会话记录镜像重复了来自 Chat Completions 的无键用户输入。
- **[#139098](https://github.com/openclaw/openclaw/issues/139098)** —— 一次性自动化会话无法删除(云端 worker 放置标识已变更)。
- **[#143752](https://github.com/openclaw/openclaw/issues/143752)** —— 软件包激活被中断后标准 CLI 被搁置，且没有仅重放软件包的途径。
- **[#143757](https://github.com/openclaw/openclaw/issues/143757)** —— Windows 计划任务默认配置无法无人值守地运行网关；就绪超时(90/181 秒)短于冷启动时间。Platinum hermit。
- **[#136360](https://github.com/openclaw/openclaw/issues/136360)** —— `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` 载体在 Microsoft Teams 上作为可见的用户轮次泄漏(与 #123265 Slack、#134240 Telegram、#115978 Feishu、#108409 Discord 同类)。Platinum hermit。
- **[#128971](https://github.com/openclaw/openclaw/issues/128971)** —— 终端回执返回 `delivery_ambiguous` 时，Telegram 最终回复被静默丢失。Gold shrimp。
- **[#138260](https://github.com/openclaw/openclaw/issues/138260)** —— Doctor `runtime-tool-schemas` 自检失败：Windows 上临时 doctor-lint 状态快照清理始终无法完成。Platinum hermit。

### P0 安全/稳定
- **[#49876](https://github.com/openclaw/openclaw/issues/49876)** —— **Cron 幻觉**：隔离的 cron 会话在工具失败时编造看似合理的输出，而不是干净地失败。Platinum hermit,与安全相关。**已关闭**，但鉴于这属于信任与安全类问题，值得再次验证。

## 6. 功能请求与路线图信号

**讨论最多的功能请求(开放中)：**

1. **[#40786](https://github.com/openclaw/openclaw/issues/40786)** —— `backup create` 中支持 `.gitignore` 风格的排除模式(12 条评论)。极有可能进入下一个小版本；改动范围很小，且用户反复提出。
2. **[#12855](https://github.com/openclaw/openclaw/issues/12855)** —— 内置自动更新，支持计划调度、确认和更新后通知。鉴于当前更新机制的脆弱性，用户意愿强烈。
3. **[#79168](https://github.com/openclaw/openclaw/issues/79168)** —— 对工具输出进行基于内容的提示注入扫描(8 条评论)。未实现即关闭；对间接注入防御的期待日益增强。
4. **[#141747](https://github.com/openclaw/openclaw/issues/141747)** —— 允许关闭/缩减运行时脚手架 `<system-reminder>` 注入。很可能会做成 `scaffolding.enabled` 或 token 预算开关。
5. **[#107930](https://github.com/openclaw/openclaw/issues/107930)** —— Node.js 版本要求变化时的升级体验。P0,评级为 ux-release-blocker;与 #144742 暴露的发布流程痛点相关。
6. **[#109370](https://github.com/openclaw/openclaw/issues/109370)** —— 在 `message_sent` hook 上暴露投递关联数据。这是插件实现幂等性的必要条件。
7. **[#114612](https://github.com/openclaw/openclaw/issues/114612)** —— 为 `memory_index_chunks` / `memory_embedding_cache` 制定保留策略。P2 但对运维至关重要；**PR #144699(多智能体共享内存数据库)** 解决了相关的扇出问题。

**对 v2026.9.5 / v2026.10.x 的预测：**
- `npm update` global install swap 修复(很可能与 #144208 合入同一补丁)
- Codex 原生 hook 中继 kill

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / Agent 生态系统
**快照日期:2026-09-11** · 数据来源:各项目社区摘要 (OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw)

---

## 1. 生态总览

自托管个人 AI 助手领域已经收敛到一套通用的架构模板——一个长驻运行的网关/守护进程,把聊天渠道(Telegram、Slack、Discord、WhatsApp、Teams)桥接到 LLM 提供商、MCP 工具和子 Agent 运行时——竞争重心已经从功能迭代速度转向**运行时的硬化与稳定**。当前五个项目的活跃度都被生命周期类 bug(进程泄漏、僵尸进程、事件循环阻塞)、更新/回滚安全性、以及会话状态完整性所主导,而非新功能。Windows 平台兼容性已成为最普遍的质量缺口;MCP 也正从实验性集成过渡为一等公民级别的接口,衍生出独立的鉴权、重连和内存开销失败模式。与此同时,前沿方向正从单用户助手转向舰队式运营(OpenClaw 的 632 个 Agent 网关)以及团队多租户化(QwenPaw Hub)。

---

## 2. 活跃度对比

*健康度评分:综合 1–10 分,权重为吞吐量(30%)、发布质量/风险(25%)、回归严重度负载(20%)、社区参与度(15%)、积压卫生(10%)。仅基于摘要数据估算。*

| 项目 | 24h 触及 Issue | 24h 触及 PR | 24h 关闭/合并 | 发布状态 | 健康度 | 一句话状态 |
|---|---|---|---|---|---|---|
| **OpenClaw** | 447 | 500 | 186 PR + 多项 P0/P1 Issue 关闭 | v2026.9.4 已发布——**同日出现 P0 阻塞** (#144742);已标记生产环境不安全 | **6.5** | 速度拉满,但发布风险偏高 |
| **QwenPaw** | 16 | 43 | 17 PR,4 Issue | **v2.2.1 stable 已发布**;2.2.2b1 周期已启动 | **7.5** | 发布纪律最佳;发布后回归簇需紧急修复 |
| **Hermes Agent** | 50(42 open / 8 closed) | 50(41 open / 9 closed) | 9 PR,8 Issue | 无(补丁可期) | **6.5** | 桌面端修复循环快;积压比例 42:8 不对称 |
| **ZeroClaw** | 50 | 50 | 5 Issue,2 PR | 无 | **7.0** | 健康且有节奏的治理;存在 S0 安全问题与评审人集中 |
| **IronClaw** | 1 | 8 | 2 PR,0 Issue | 无 | **5.0** | 安静维护模式;社区参与为零 |

**结论:** OpenClaw 日均量级是同行的约 5–10 倍,但 QwenPaw 今日展现出最佳的"速度/质量比"(稳定版发布 + 2475 个新增测试、覆盖率 +5.02pp、CI 门禁重新设计)。

---

## 3. OpenClaw 的定位

**相对同行的优势**
- **规模证明:** 是唯一有舰队级部署证据的项目(#142476 中 632 Agent 网关);多 Agent 共享记忆 DB 也在推进中(#144699)。
- **分诊机制:** 形式化的严重度标签(P0–P2)、归属标签(`fix-shape-clear`、`clawsweeper`),以及发布阻塞纪律——是五个项目里工业化程度最高的 Issue 流水线。
- **广度:** 最深的渠道矩阵(Teams/Slack/Telegram/Feishu/Discord)与提供商覆盖(Anthropic Vertex、OpenRouter、Volcengine)。
- **修复吞吐:** 日均合并 186 PR;大部分新 bug 都带有清晰的认领信号。

**相对同行的短板**
- **发布质量是今日同档最差:** v2026.9.4 发布时漏掉一个已合并的修复(#144742,每次配置写入都会失败),还附带一个确定性的 `npm update` 失败(#144712)——这些同日回归是 QwenPaw 和 ZeroClaw 没有出现的。
- **无界的 hook 架构:** #91009(`openclaw-hooks` CPU 密集阻塞 RPC)与 ZeroClaw 刻意有界的委托设计(#9833:每次 8 次调用/180s 上限)形成对照——这反映出执行约束上的理念差异。
- **2026.9.x 回归率**(消息丢失 #139847、转录对齐卡死 #140620)超过 Hermes、QwenPaw、ZeroClaw 今日的任何报告。

**架构与社区:** Node 网关 + systemd + npm 分发 + SQLite 记忆;对比之下,Hermes 是消费级桌面应用,ZeroClaw 是带 wasmtime 沙箱的 Rust 守护进程,QwenPaw 则是 Tauri + 托管控制台 + Hub 的栈。社区规模断层领先(Issue ID 处于约 14.4 万区间,而 Hermes 约 10.8 万,ZeroClaw/IronClaw/QwenPaw 约 1.0–1.1 万——只是历史体量的粗略代理;各项目编号体系不同)。

---

## 4. 共同的技术焦点领域

| 焦点领域 | 涉及项目 | 具体需求(证据) |
|---|---|---|
| **Windows 平台兼容性** | OpenClaw、Hermes、QwenPaw、ZeroClaw | 74 个 CI 失败(ZC #7462)、2MB 栈溢出(ZC #10734/#10753)、WSL bash 劫持(H #108165)、长路径支持(OC #144688)、Tauri 会话丢失(QP #7698) |
| **进程生命周期与资源泄漏** | OpenClaw、Hermes、ZeroClaw | 僵尸子进程(OC #97616)、hook relay CPU 死循环(OC #91009)、625MB MCP stdio 孙进程(H #108084)、端口占用的僵尸守护(ZC #8800)、schema 克隆引发的 RSS 增长(ZC #8642) |
| **更新/回滚安全** | OpenClaw、Hermes、QwenPaw、ZeroClaw | 发布漏修复 + 核心/插件版本错位(OC #144742, #135776)、重启告警永久残留(H #107402)、升级后配置丢失(QP #7708)、错误二进制修复——已修复(ZC #10532) |
| **会话持久化与消息完整性** | 全五个项目 | 并发消息丢失(OC #139847)、Telegram 最终回复丢失(OC #128971)、session JSON 缺失(QP #7698)、stop 后上下文被清空(ZC #8794)、session ID 泄露(H #108121/#108079) |
| **子 Agent 编排与工具权限** | OpenClaw、QwenPaw、ZeroClaw | 子 Agent 超时 + 忽略 `subagent_model`(QP #7678/#7676)、委托白名单绕过——**S0**(ZC #8279)、原始提供商持久化(OC #92405) |
| **MCP 硬化** | Hermes、ZeroClaw(OpenClaw 边缘涉及) | OAuth RFC 9207 `iss` 校验失败(H #92758)、恢复后工具注册表为空(H #108087)、图片块的视觉路由(ZC #9521) |
| **静默失败 / 信任问题** | OpenClaw、Hermes、QwenPaw | Cron 输出幻觉(OC #49876)、"报告成功,实际无产物"模式(H 媒体链接、MCP)、Stop 按钮无效但任务仍在运行(QP #7567) |
| **上下文 / token 预算控制** | OpenClaw、QwenPaw | 每轮约 686 token 脚手架且无法关闭(OC #141747)、`/compact` + 提供商解析的上下文窗口(QP #7679, #7652) |

---

## 5. 差异化分析

| 项目 | 功能侧重 | 目标用户 | 技术架构 |
|---|---|---|---|
| **OpenClaw** | 舰队/多 Agent 运维、广泛的渠道 + 提供商矩阵、更新恢复 | 规模化运行 Agent 舰队的运维者 | Node 网关、systemd 服务、npm 分发、SQLite 记忆、hook-relay 子进程模型 |
| **Hermes Agent** | 桌面端 UX 打磨、语音(Fluid Voice、Hermes Radio)、多提供商 LLM 支持(DeepSeek、xAI、Codex-compatible) | 自托管个人助手的个人爱好者 | 消费级桌面应用 + 网关桥接 Telegram/Signal/WhatsApp/Discord |
| **IronClaw** | 渠道配对正确性、IME/i18n、基准驱动的模型 QA(officeqa taxonomy) | 工程/研究导向用户(nearai);外部社区薄弱 | Rust 核心 + WebUI,OpenAI 兼容 API 表面 |
| **QwenPaw** | 上手可移植性(**PawPort** 从 Codex/Qoder 导入)、Hub 多租户、每 Agent 模型路由、移动端 Web | 从专业玩家到小团队;从其他 harness 切换而来的用户 | Tauri 桌面 + 托管控制台(`platform.agentscope.io`) + 插件生态 |
| **ZeroClaw** | 安全(工具白名单、wasmtime 沙箱、CVE 治理)、治理改革、插件/渠道运行时重构 | 把安全与流程严谨性放在首位的运维者 | Rust 守护进程(`zeroclaw-runtime` crates)、有界委托 + 显式上限、RFC 驱动的治理 |

最尖锐的战略对比是:**QwenPaw 在买增长**(移植工具、多租户 Hub、移动端),**ZeroClaw 在买信任**(S0 安全分诊、有界执行、治理),**OpenClaw 在买规模**(舰队运维、渠道广度);而 **Hermes 优化单用户体验**,**IronClaw 仍是基准导向的基础设施**。

---

## 6. 社区势能与成熟度

- **第一梯队——海量速度:** **OpenClaw**(每天约 950 项触及)。分诊机制成熟,但 2026.9.x 线暴露了速度的代价:反复出现的更新路径回归。迭代飞快,但稳定不足。
- **第二梯队——快速且有纪律的迭代:** **QwenPaw** 是最健康的快速迭代者——稳定版发布、覆盖率冲刺、同日启动下一轮 beta,加上 26 条评论的实质路线图 RFC(#7318),展现出真正的社区拉力。**Hermes** 在桌面端回归上迭代迅速(24–48h 修复周转),但其 open:close 比例(42:8)显示流入速度超过解决速度。**ZeroClaw** 显示出有治理的势能——关闭动作、RFC 流水线——但评审人集中在 1–2 位维护者身上,是其规模化的风险。
- **第三梯队——维护模式:** **IronClaw**——依赖 dependabot 驱动、自动失败分类 bot、快照期零用户参与;正确性 PR 卡 5 天无评论。

**轨迹解读:** QwenPaw 和 ZeroClaw 正在复利式积累(流程与产品并进); OpenClaw 必须把吞吐量转化为发布可靠性; Hermes 需要在 Windows/MCP 高影响缺口扩大前先填上; IronClaw 有社区沉寂的风险。

---

## 7. 趋势信号

1. **更新安全已是产品特性,不再是管道层。** OpenClaw 的同日 P0(#144742, #144712)与用户对自动更新的诉求(#12855)表明,事务性的、可验证的回滚(OpenClaw 的 v2026.9.4 特性、ZeroClaw 的 #10532)已成标配。*构建带预校验的原子化核心+插件更新链路。*
2. **有界执行是本季度的架构教训。** OpenClaw 无界的 hook relay(#91009)对比 ZeroClaw 受限的委托循环(8 次/180s)框定了设计选择:每个子进程/hook/委托调用都需要资源上限与回收。僵尸/泄漏 bug 在今日 5 个项目中出现了 3 个。
3. **Windows 是跨平台 Agent 的坟场。** 四个项目报告了 Windows 专项故障(栈溢出、路径前缀、WSL 劫持、会话丢失)。*Windows CI 矩阵是竞争护城河,不是卫生项。*
4. **MCP 进入运营时代:** OAuth 互操作(RFC 9207)、重连卫生、工具 schema 处理的内存成本成为新的失败类别——把 MCP server 当作不可信、易泄漏的长生命周期进程对待。
5. **"静默成功"是头号信任杀手。** Cron 输出幻觉(OC #49876)、UI 显示已停止但任务仍在跑(QP #7567)、已连接但空的 MCP 注册表(H #108087)——用户对"报告成功但交付失败"的惩罚比响亮的报错更重。*投入失败可观测性与送达回执语义。*
6. **市场正在从个人转向团队/舰队:** QwenPaw Hub(多租户、管理员治理的 skills)与 OpenClaw 的多 Agent 共享记忆(#144699)都把团队工作流推向下一个战场。
7. **可移植性是增长武器:** PawPort 从 Codex/Qoder 导入的流程显示,降低切换成本正被显式用作获客策略——预计各 harness 将在导入竞品配置、skills、历史的能力上展开竞争。
8. **子 Agent 安全继承仍是开放前沿:** ZeroClaw 的 S0 委托白名单绕过(#8279)与 OpenClaw 的工具权限快照失败(#139847)表明,*子 Agent 如何继承(或逃逸)父级策略*在整个生态里尚未解决——对任何构建委托能力的人来说,都是重点投入方向。

---

*所有数据均来自 2026-09-11 摘要;健康度评分为分析师综合,非项目自公布指标。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目简报 — 2026-09-11

## 1. 今日概览

Hermes Agent 今天节奏飞快,**过去 24 小时更新了 50 个 issue 和 50 个 PR**,但**没有发布新版本**。维护者显然正在清理积压:42 个 issue 仍处于开放状态,仅关闭了 8 个;PR 同样呈现一边倒的态势(41 个开放 vs 9 个关闭/合并)。活动高度集中在两个方向:**桌面端围绕标题栏/侧边栏/z-index 重设计引发的回归**(单次提交 `bbe212de9b` 触发了一连串 macOS 与 Windows UI 缺陷),以及**网关侧的 MCP / 会话状态机制**。流量最高的单条目(issue #88584,87 条评论)是一桩来自下游 fork 的自动合入阻塞,属于发布流程问题而非产品缺陷,正在拉高"热门讨论"指标的水分。

## 2. 版本发布

**过去 24 小时未发布新版本。** 鉴于合入的 UI 与 MCP 修复数量可观,未来几天推出补丁版本是合理预期,但仅凭现有数据尚无法确认。

## 3. 项目进展

过去 24 小时合并/关闭的 PR(从 9 个关闭项中选取,具有代表性):

- **[#107776](https://github.com/NousResearch/hermes-agent/pull/107776)** — `fix(desktop): ensure sidebar toggle stays above panel tabs (z-index)` — 修复了折叠侧边栏的"展开"按钮变得无法点击的回归。关闭 [#107774](https://github.com/NousResearch/hermes-agent/issues/107774)。
- **[#107823](https://github.com/NousResearch/hermes-agent/pull/107823)** — `fix(desktop): restore minimized sessions from sidebar toggle` — 在会话组被最小化时,恢复 Cmd+B / 侧边栏开关的行为。
- **[#107209](https://github.com/NousResearch/hermes-agent/pull/107209)** — `fix(desktop): restore minimized sidebar through sidebar controls` — #107823 的配套修复,解决"当前标签页未切换"的边界情况。
- **[#107217](https://github.com/NousResearch/hermes-agent/pull/107217)** — `fix(desktop): keep narrow sidebar tabs below window controls` — 在窄宽度下的裁切修复。
- **[#107223](https://github.com/NousResearch/hermes-agent/pull/107223)** — `fix(desktop): keep left titlebar tabs from clipping beside window controls` — `bbe212de9b` 回归的根因修复,解锁 issue [#107196](https://github.com/NousResearch/hermes-agent/issues/107196)。

今日关闭的 issue:

- **[#65094](https://github.com/NousResearch/hermes-agent/issues/65094)** — 兼容 Codex 的自定义 `/v1` 提供方现在会转发 Hermes 会话头。
- **[#108126](https://github.com/NousResearch/hermes-agent/issues/108126)** — 原生 DeepSeek 提供方配置保留 V4.1 Flash 的 `thinking`/`reasoning_effort`。
- **[#26832](https://github.com/NousResearch/hermes-agent/issues/26832)** — 关于工作日感知的 cron 前置条件的功能请求被标记为 "implemented-on-main"。
- **[#107774](https://github.com/NousResearch/hermes-agent/issues/107774)** 与 **[#107196](https://github.com/NousResearch/hermes-agent/issues/107196)** — macOS 标题栏/侧边栏重叠回归。

总体效果:今天大约关闭了 **6–8 个桌面端 UI 缺陷**,外加少量提供方/配置修复。桌面端这一簇问题正在被稳步逐个削平。

## 4. 社区热点话题

| 排名 | 条目 | 类型 | 评论数 | 为何重要 |
|---|---|---|---|---|
| 1 | [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — 自动化 Nous 集成被阻塞 | Issue (invalid) | 87 | 一张分类错误的自动化工单,涉及 `cron/jobs.py` 中 fork-to-fork 合入冲突——评论数高只是流程噪音,不代表产品信号。 |
| 2 | [#84361](https://github.com/NousResearch/hermes-agent/issues/84361) — 桌面端 MEDIA 文件链接失效 | Issue (P2 bug) | 9 | 真实面向用户的故障:聊天媒体链接因标签正则与 `file://` 字符串拼接静默失败。亟需关注——尚无 PR。 |
| 3 | [#65094](https://github.com/NousResearch/hermes-agent/issues/65094) — Codex 自定义提供方丢弃会话头 | Issue (closed) | 6 | 多提供方会话连续性是一个反复出现的可靠性主题。 |
| 4 | [#17476](https://github.com/NousResearch/hermes-agent/issues/17476) — 围绕单一临时运行时上下文整合 live-time PR | Refactor / needs-decision | 6 | 涉及 agent 与网关的架构梳理——需维护者拍板。 |
| 5 | [#92758](https://github.com/NousResearch/hermes-agent/issues/92758) — MCP OAuth 桌面端在 RFC 9207 `iss` 上失败 | Issue (P2) | 5 | 与现代鉴权服务器(如 Resend)的互操作性——MCP 表面积正在扩大。 |
| 6 | [#107402](https://github.com/NousResearch/hermes-agent/issues/107402) — `hermes update` 留下永久的"未重启"警告 | Issue (P2) | 5 | 影响集群运维的更新 UX 小毛刺。 |
| 7 | [#107196](https://github.com/NousResearch/hermes-agent/issues/107196) — macOS 标题栏面板标签被裁切 | Issue (closed) | 4 | 今天由 PR #107223 修复。 |
| 8 | [#106619](https://github.com/NousResearch/hermes-agent/issues/106619) — 无法连接 `opencode-go` 提供方 | Issue (P3) | 4 | 等待报告者补充信息——第三方提供方接入存在摩擦。 |

**底层主题:**

- **提供方膨胀之痛。** DeepSeek、xAI/OAuth、OpenCode-Go 以及兼容 Codex 的端点各自滋生平行缺陷(提供方特有的怪异行为、OAuth 刷新、会话头)。一次统一的提供方配置审计早该提上日程。
- **MCP 正成为一等公民表面。** 热门条目中有三项涉及 MCP(OAuth、工具注册、Windows 重连),说明它已从实验性目标晋升为主集成目标。
- **跨平台会话身份**(`message_id`、`session_id`、`HERMES_CRON_SESSION`)正在越界泄漏——亟需一套连贯的身份模型。

## 5. 缺陷与稳定性

按影响大致排序:

**高影响**

- **[#108084](https://github.com/NousResearch/hermes-agent/issues/108084)** — Windows MCP 重连泄漏 stdio 子孙进程(12 个 node.exe,跨 3 代约 625 MB)。尚无修复 PR。P2。
- **[#108085] 簇** — Windows 桌面端 zone-collapse 雪佛龙留下持久的输入陷阱([#108105](https://github.com/NousResearch/hermes-agent/issues/108105))。Ctrl+R 之后依然存在。尚无修复 PR。P2。
- **[#108147](https://github.com/NousResearch/hermes-agent/issues/108147)** — TUI WebSocket 发送批缺乏字节/帧上限,可能无限增长。P2。
- **[#108165](https://github.com/NousResearch/hermes-agent/issues/108165)** — Windows:`shutil.which("bash")` 解析到 WSL 的 bash,所有终端工具调用全部失败。相当于 P2 级别的运行中断。尚无修复 PR。

**中影响**

- **[#108122](https://github.com/NousResearch/hermes-agent/issues/108122)** — `xai-oauth` 陈旧令牌 403 中断网关回合;401 门控的刷新从未触发。P3,但会破坏长期运行的 Telegram/Signal/WhatsApp 部署。
- **[#108121](https://github.com/NousResearch/hermes-agent/issues/108121)** — `HERMES_CRON_SESSION` 泄漏到网关消息,导致人类用户(Discord/Telegram)无法使用 `execute_code`。
- **[#108079](https://github.com/NousResearch/hermes-agent/issues/108079)** — Slack `SessionSource` 从未填充 `message_id` — `HERMES_SESSION_MESSAGE_ID` 始终为空。
- **[#108088](https://github.com/NousResearch/hermes-agent/issues/108088)** — Bot Mode 中继在 remote-primary 桌面端上让一个多余的本地后端保持存活,伴随 30 秒 WebSocket 抖动与焦点丢失。
- **[#108087](https://github.com/NousResearch/hermes-agent/issues/108087)** — `_register_discovered_tools_if_needed()` 因 `_ready` 守卫 bug 而不可达——复活的 MCP 服务器提供空的工具注册表。
- **[#108171](https://github.com/NousResearch/hermes-agent/issues/108171)** — `openai-codex` 图像提供方静默忽略 `aspect_ratio` 且跳过模型 ID 校验。
- **[#108113](https://github.com/NousResearch/hermes-agent/issues/108113)** — Fluid Voice 听写确认后 Hermes Radio 仍保持暂停(macOS 26.6.2)。

**低/外观类**

- **[#107196](https://github.com/NousResearch/hermes-agent/issues/107196)** — macOS 标题栏面板标签裁切——**今日已修复**,PR #107223。
- **[#107774](https://github.com/NousResearch/hermes-agent/issues/107774)** — 折叠侧边栏标签重叠——**今日已修复**,PR #107776。
- **[#94703](https://github.com/NousResearch/hermes-agent/issues/94703)** — Linux ARM64 桌面端更新器误报 GUI/后端版本错位。
- **[#108066](https://github.com/NousResearch/hermes-agent/issues/108066)** — 桌面端 OAuth 刷新从未清除被拒令牌(`fetchJson` 丢弃了 `statusCode`)。
- **[#108075](https://github.com/NousResearch/hermes-agent/issues/108075)** — `backgroundDone` 原生通知仅显示命令的第一行。
- **[#108163](https://github.com/NousResearch/hermes-agent/issues/108163)** — 智能审批守护的 `max_tokens=16` 在推理模型上回答为空——**已有修复 PR** [#108168](https://github.com/NousResearch/hermes-agent/pull/108168)。
- **[#108150](https://github.com/NousResearch/hermes-agent/issues/108150)** — `scripts/desktop-update/repro.sh gate` 不具备可复现性(hermetic)。

**Windows 受影响尤为严重**——今天的条目中至少 5 项是 Windows 专属(MCP 重连泄漏、bash 解析、桌面端陷阱、ARM64 更新、包更新器回退)。一次 Windows 平台的清扫式修复就能消化掉相当一部分积压的 P2。

## 6. 功能请求与路线图信号

今日可见的活跃功能工作与请求:

- **[#79139](https://github.com/NousResearch/hermes-agent/pull/79139)** — 跨 Slack/Telegram/WhatsApp/钉钉的每聊天原生 @only 门控,并向网关代理宣贯"回复门控由配置强制"。可能近期合入;涉及所有主要平台。
- **[#58015](https://github.com/NousResearch/hermes-agent/pull/58015)** — Achievements:导出端点与代理摘要。开放 PR,低优先级功能但对用户可见。
- **[#108169](https://github.com/NousResearch/hermes-agent/pull/108169)** — A2A 在 loopback 绑定入站上的内联推送回调。对齐 A2A Protocol 1.0 §3.2.2。
- **[#108170](https://github.com/NousResearch/hermes-agent/pull/108170)** — Kanban:在 `initial_status=blocked` 任务上保留 sticky 块。已标记关闭完成。
- **[#26832](https://github.com/NousResearch/hermes-agent/issues/26832)** — 工作日感知的 cron 前置条件(已关闭,标记 **implemented-on-main**)。强烈信号:locale 感知调度已纳入路线图。
- **[#92208](https://github.com/NousResearch/hermes-agent/issues/92208)** — 将"添加到聊天"从终端输出泛化到聊天记录与图片/制品选择。下一桌面版本的合理候选。

**下一发布窗口预测(最有可能包含):**

- 桌面端标题栏/侧边栏/z-index 回归修复(已合入,待发版)。
- 智能审批守护 token 预算修复(PR #108168 就绪)。
- MCP 工具注册 `_ready` 守卫修复(等 PR 合入)。
- 若 cron 工作日前置条件通过评审,亦可能一并发布。

## 7. 用户反馈摘要

**痛点(真实用户):**

- **桌面端回归焦虑。** 多名用户反映新标题栏标签将他们"困"在 UI 中——zone collapse / 隐藏条带序列会破坏设置、布局编辑器与 HUD 输入,且 Ctrl+R 之后依然存在。在 [#107774]、[#108105]、[#107196] 中均出现了措辞强烈的"持久陷阱"与"无法点击"描述。`bbe212de9b` 这波重设计正在被一点点回退。
- **更新 UX。** [#107402] 与 [#94703] 显示,运行更新器的用户会遇到令人困惑的永久性警告("未重启网关"、"还需要一步")。集群/舰队运维的心智模型正被这些状态字符串反复惩罚。
- **跨平台提供方脆弱性。** xAI OAuth、DeepSeek、OpenCode-Go 以及兼容 Codex 的提供方今天各自分别有至少一个 bug 被提报。运行长期网关的用户(Telegram、Discord)受冲击最大,因为令牌/凭证轮换与会话连续性相互交织。
- **静默失败。** [#84361](无路径日志)、[#108087](MCP 服务器"已连接"但工具为零)、[#108171](静默丢弃宽高比)、[#108105](点击凭空消失)呈现出一个共同模式:Hermes 报告成功,实际什么都没交付。这是最高频的吐槽。
- **MCP 期望。** [#92758] 与 [#108087] 显示用户期望 Hermes 的 MCP 能与现代鉴权服务器互通,并能在重连后存活——而这两点目前都无法满足。

**满意度信号:**

- 今天一批 macOS 标题栏/裁切相关 issue 被集中关闭,加之维护者对来自 `wukangcheng1994`、`KoNit-K`、`kokhlo` 与 `MarionLiew` 的配套 PR 快速响应,显示对桌面端回归的维护投入。具体反馈裁切问题的用户在约 24–48 小时内就能拿到修复。
- 反观高影响的 Windows 项目与静默失败的 MCP 缺陷,目前仍无任何 PR,这正是用户不满可能加剧的地方。

## 8. 待办关注

需要维护者明确处理的事项——无论是陈旧、被决策阻塞,还是高影响但无人认领:

- **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)** (87 条评论,P3) — 已被标记 `invalid`,却在主导讨论指标;需要维护者添加说明解释为何属于外部自动化问题,或升级到 fork 责任人。评论量正在扭曲信号。
- **[#17476](https://github.com/NousResearch/hermes-agent/issues/17476)** (P2,`needs-decision`) — Live-time 临时运行时上下文重构。涉及 agent 与网关。无 PR;标记 `sweeper:risk-caching`,明确等待维护者架构裁决。约 4.5 个月未结。
- **[#17476] 时间戳/时区 PR 系列** — 大概率在此合流;没有决策的情况下,多名贡献者正在做重复工作。
- **[#106619](https://github.com/NousResearch/hermes-agent/issues/106619)** (awaiting-reporter) — `opencode-go` 提供方无法连接。已开两天,在分类员介入前需要报告者补充信息。
- **[#108084](https://github.com/NousResearch/hermes-agent/issues/108084)** (Windows MCP 重连泄漏) — 高影响,**无 PR**。默认 MCP 路径上的资源泄漏正是那种不应放置一周不处理的缺陷。
- **[#108087](https://github.com/NousResearch/hermes-agent/issues/108087)** (`needs-repro`) — MCP `_ready` 守卫导致工具注册不可达。需要一份复现提交/标签来确认,但描述已足够具体。
- **[#80135](https://github.com/NousResearch/hermes-agent/pull/80135)** (开放约 1 个月) — `fix(update): preserve non-prefixed systemd gateway process`。对非 Docker 舰队运维很重要;仍开放。
- **[#108121](https://github.com/NousResearch/hermes-agent/issues/108121)** — `HERMES_CRON_SESSION` 泄漏到人类聊天。已被标记重复,但其底层"标识符泄漏"模式也出现在 [#108079] 与 [#65094]——一次根因修复即可关闭全部三项。
- **[#94703](https://github.com/NousResearch/hermes-agent/issues/94703)** (Linux ARM64 更新器误报版本错位) — 小众但顽固,大概是一行代码的修复。

**帮维护者省时间的小窍门:** 把 [#88584](87 条评论的错分类工单)干净地关闭掉,将显著提升 issue 追踪的信噪比,把分诊精力释放给真正的 Windows 与 MCP 工作。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目日报 — 2026-09-11

## 1. 今日概览

IronClaw 今日维护活动较为平稳，没有新版本发布。当日的流量主要由 Dependabot 驱动的依赖更新（8 个 PR 中占 4 个）以及少量 bug 修复主导，同时还有一项值得关注的 Telegram 频道功能新增，以及一份自动生成的每日失败分类 issue。有 6 个 PR 仍处于待审阅状态，另有 2 个 PR 已被关闭（#8072 Telegram 命令菜单功能、#8080 一个被后续 #8097 取代的 Rust 依赖批量更新）。总体来看，这是一个健康但属于常规节奏的维护日，而非重大功能冲刺。

## 2. 版本发布

过去 24 小时内无新版本发布。无可报告的版本标签、变更日志或迁移说明。

## 3. 项目进展

过去 24 小时内有 2 个 PR 被关闭：

- **[#8072](https://github.com/nearai/ironclaw/pull/8072) — feat(telegram): 在激活时注册 Bot API 命令菜单**（已关闭）  
  作者：`thisisjoshford`。在扩展激活时调用 Telegram Bot API 的 `setMyCommands` 来注册 `/model`、`/status`、`/new`、`/stop`、`/interrupt` 命令，并在停用时尽力调用 `deleteMyCommands` 进行清理。标签为 `size: L`、`risk: low`、`scope: docs, dependencies`，贡献者等级：资深贡献者。提升了 Telegram 频道命令的可发现性。

- **[#8080](https://github.com/nearai/ironclaw/pull/8080) — chore(deps): 在 1 个目录中跨"其它"分组批量升级 21 项依赖**（已关闭）  
  Dependabot PR，共升级 21 个 Rust crate。实际已被更大的后续 PR [#8097](https://github.com/nearai/ironclaw/pull/8097) 所取代，后者在该分组中升级了 24 个 crate。

## 4. 社区热点话题

所有列出的事项互动量（评论和 👍 反应）都很低——今天没有任何 issue 或 PR 收到评论，且全部显示 0 反应。从内容量来看，最具实质性的一项是：

- **[#8093 — IronClaw 每日失败分类 — 2026-09-10](https://github.com/nearai/ironclaw/issues/8093)**（开放中）  
  作者：`pranavraja99`。对 IronClaw benchmark 套件中所有未通过任务（如 officeqa 的 42 个未通过任务）进行自动化每日分类的报告。摘要将失败归因于 DeepSeek-V4-Flash 导航中的"真实模型错误"，提供模型回退的持续、透明视图，而非面向用户的 bug。与已发布的 benchmark 仪表盘的关联表明这里存在一个结构化的评测反馈闭环。

评论量的缺失表明今日社区讨论极少；活动由工程驱动，而非由用户驱动。

## 5. Bug 与稳定性

有 2 个开放的 bug 修复 PR 面向用户层面缺陷：

| 严重程度 | 条目 | 描述 |
|---|---|---|
| **中等** | [#8092 — fix(webui): 在聊天编辑器中保留 IME 组字状态](https://github.com/nearai/ironclaw/pull/8092) | 作者：`huiq777`。恢复此前被命令菜单和回车发送处理器拦截的 IME 组字处理；同时处理 Safari 的 `keyCode === 229` 场景。附带回归测试。修复 PR 已就绪，等待评审。 |
| **中等** | [#8076 — fix(assistant): 区分已断开的共享频道](https://github.com/nearai/ironclaw/pull/8076) | 作者：`be-student`。在已配对用户的共享频道断开与完全未配对账户之间做出区分；在用户消息、机器人命令以及 OpenAI 兼容接口各处呈现频道专属的引导说明；在 product、adapter 和 capability 文件中统一拒绝分类。修复 PR 开放中。 |

这两项都是正确性修复，而非崩溃或数据丢失问题。今日未报告严重级别的事故。

## 6. 功能请求与路线图信号

今日窗口内最具象的路线图信号就是这个被关闭的功能 PR：

- **Telegram 聊天菜单命令注册**（[#8072](https://github.com/nearai/ironclaw/pull/8072)）——现已落地。Telegram 现在镜像了其它频道上已经暴露的同一套命令面（`/model`、`/status`、`/new`、`/stop`、`/interrupt`），这暗示着跨频道功能对齐的工作仍在持续推进。

过去 24 小时内未提交任何外部功能请求。每周 benchmark 分类 issue（[#8093](https://github.com/nearai/ironclaw/issues/8093)）作为一种低频信号，指出了当前最需要改进模型质量的方向（目前是 DeepSeek-V4-Flash 下的 `officeqa` 套件）。

## 7. 用户反馈汇总

过去 24 小时内未开启任何用户提交的 issue 或反馈帖。2 个开放的 bug 修复 PR（[#8092](https://github.com/nearai/ironclaw/pull/8092)、[#8076](https://github.com/nearai/ironclaw/pull/8076)）反映出该项目显然遇到过的两类反复出现的痛点：

- **国际化 / 非拉丁输入法**：WebUI 编辑器中 IME 组字被破坏是聊天 UI 中长期存在的一类问题；该修复同时覆盖了 Chromium/Firefox 与 Safari 路径。
- **频道配对状态**：区分"已配对但断开的共享频道"与"完全未配对的账户"，暗示此前用户曾因频道静默无法投递消息而产生困惑。

本快照中暂无满意度或情绪相关数据。

## 8. 待办关注清单

以下事项可能需要维护者留意：

- **[#8097 — Rust 其它分组，24 项更新](https://github.com/nearai/ironclaw/pull/8097)** —— 取代了已关闭的 #8080；评审人在合并前应确认 21 项更新与 24 项更新两个批次之间的差异。
- **[#8096 — vitest 4.1.9 → 4.1.11](https://github.com/nearai/ironclaw/pull/8096)** —— WebUI 前端的补丁级 JS 测试运行器升级。
- **[#8094 — js-yaml 4.3.1 → 4.3.2](https://github.com/nearai/ironclaw/pull/8094)** 与 **[#8095 — baseline-browser-mapping 2.10.17 → 2.11.22](https://github.com/nearai/ironclaw/pull/8095)** —— 文档/架构视频子模块的依赖升级；风险较低，但 `baseline-browser-mapping` 跨了相当多的版本号，值得扫一眼。
- **[#8076 — 区分已断开的共享频道](https://github.com/nearai/ironclaw/pull/8076)** —— 自 2026-09-06 起开放且零评论；这个已存在 5 天的正确性修复涉及 product、adapter 与 OpenAI 兼容接口多层，不应停滞。
- **[#8093 — 每日失败分类](https://github.com/nearai/ironclaw/issues/8093)** —— 虽然是自动生成的，但其附带的 officeqa 失败分布揭示了一项值得维护者层面进行分诊的模型侧反复出现的问题。

---

**汇总指标**
- 开放 issue 更新：1 · 关闭：0
- 开放 PR 更新：6 · 关闭/合并：2
- 新版本发布：0
- 社区互动总量（评论 + 反应）：所有列出的事项合计为 0

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目简报 — 2026-09-11

## 1. 今日概览

在 **v2.2.1 稳定版**发布落地的当天，QwenPaw 正处于活跃、高节奏的开发周期。过去 24 小时内，仓库共出现 16 个 issue(12 个开放 / 4 个关闭)和 43 个 PR(26 个开放 / 17 个已合并或关闭)，合并流以发布工程为主(版本号提升、发布说明、CI 门禁精简)，并伴随一次大规模的后端测试覆盖率冲刺(#7653 中语句覆盖率 +5.02pp、新增 2,475 个 pytest 用例)。真实用户的 bug 涌入量很大，且集中在三个主题——会话/文件同步、子代理路由与停止语义，以及 2.2.1-beta.x 中的桌面端/Tauri 回归——表明该版本仍处于发布后的持续加固阶段。整体健康状况良好：发布值班机器人关闭了 v2.2.1-beta.2 的验证 issue,新的 v2.2.1 稳定版验证 issue(#7692)如期开启，首次贡献者也在持续合入小范围修复。

---

## 2. 版本发布

### v2.2.1 — 稳定版([发布](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1))

2.2.1 变更日志亮点(部分——完整说明记录于 [PR #7694](https://github.com/agentscope-ai/QwenPaw/pull/7694)):

- **Per-Agent 模型路由** —— 现在可以为每个 agent 独立配置模型供应商与回退链。([#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501))
- **Auto Fin 主动记忆回顾**，搭配升级后的 **ReMe** 记忆后端。
- 由自动化机器人发起的**发布值班验证**:[Issue #7692](https://github.com/agentscope-ai/QwenPaw/issues/7692)(截止时间 2026-09-11 08:19 UTC,每个平台四道检查点门禁)。

**面向从 2.2.0 → 2.2.1 升级用户的迁移 / 风险提示：**

- 桌面端 `2.2.1-beta.2` 构建(Console bundle 2026-09-10)在 Windows 上已经出现**静默的会话切换回归**([Issue #7687](https://github.com/agentscope-ai/QwenPaw/issues/7687),已关闭)。在确认该问题已在 GA 正式版修复之前，稳定版用户应持续留意相同症状。
- 若干用户上报的 v2.2.0 / v2.2.1 桌面端 bug(模型配置丢失、工作目录漂移、幽灵会话)**今天**被归入新版本名下——升级后请核验各项设置。

后续 beta 线已在推进中:[PR #7695](https://github.com/agentscope-ai/QwenPaw/pull/7695)(已关闭)将版本号提升至 **2.2.2b1**。

---

## 3. 项目进展

过去 24 小时内合并 / 关闭的内容(节选，按影响力排序)：

- **[PR #6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) — `feat(pawport): import flow from other agent harnesses** (已关闭)。引入 **PawPort**——一个可移植性子系统，能够发现、归一化、校验并将来自 Codex 与 Qoder 的指令、设置、技能、插件、项目及近期工作导入 QwenPaw。这是上手体验方面的一次重大改进。
- **[PR #7653](https://github.com/agentscope-ai/QwenPaw/pull/7653) — `test(unit): coverage sprint batch 2` (+5.02pp)**(已关闭)。新增 2,475 个后端 pytest 用例，覆盖渠道(channels)、视觉压缩、路由(routers)、运行时(runtime)与 CLI;`src/qwenpaw` 覆盖率从 64.41% 提升至 69.43%。
- **[PR #7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) — `fix(models): preserve provider-resolved context windows`**(已关闭)。从供应商解析结果中恢复模型 `context_size`,防止对覆盖了 AgentScope 默认 32 768 值的供应商过早触发压缩。
- **[PR #7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) — `fix(api): 422 for non-finite validation inputs`**(已关闭)。应用层 `RequestValidationError` 处理器返回 FastAPI 风格的结构化 422 响应，并对错误输入做 JSON 安全处理。
- **[PR #7688](https://github.com/agentscope-ai/QwenPaw/pull/7688) — `fix(console): simplify grouped session pagination`**(已关闭)。移除 "Collapse List";替换为 **Load More** 分页，在选中列表深处的会话时可保持滚动位置。
- **[PR #7694](https://github.com/agentscope-ai/QwenPaw/pull/7694) / #6994**(已关闭)。**v2.2.1** 及历史版本 **v2.1.0** 的发布说明。
- **[PR #7695](https://github.com/agentscope-ai/QwenPaw/pull/7695) — 版本号提升至 2.2.2b1**(已关闭)。标志着下一个 beta 周期的启动。
- **[PR #7697](https://github.com/agentscope-ai/QwenPaw/pull/7697) — `ci: slim PR gate to Ubuntu backend tiers + release-time full test gate`**(开放中)。PR 阶段精简后端分层矩阵，发布时重新启用完整测试套件。PR 反馈更快，发布置信度不变。

总结：这是一次强劲的发布就绪冲刺——涵盖版本管理、发布说明、CI 门禁调优、测试覆盖率，以及今天合入的最大单项功能(PawPort)。

---

## 4. 社区热门话题

社区讨论目前由一个长期活跃的帖子主导：

- **[Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — “QwenPaw Hub(多租户版)将随 2.2.0 到来：接下来我们该构建什么？”** —— 26 条评论，4 个 👍,今日最后更新。
  作者 **rayrayraykk** 明确将 Hub 定位为 QwenPaw 对反复出现的多用户 / 管理员托管技能需求的首个回应，并链接了 [#2324](https://github.com/agentscope-ai/QwenPaw/issues/2324)。讨论正在塑造 Hub 的路线图(技能治理、管理员角色、租户隔离)。**建议维护者重点关注**——它实际上就是多租户产品线事实上的路线图 RFC。

紧随其后的活跃工程讨论：

- **[Issue #7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)**(今日关闭，10 条评论)—— `platform.agentscope.io/deploy` 上的移动端/Web UX:将顶层入口移至页面顶部，把 Stop 调整到 Run 之后。**该 issue 在讨论中未被采纳修复的情况下关闭；请留意其是否重新开启。**
- **[Issue #7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)** —— Stop 按钮不起作用；UI 显示已停止但任务仍在继续(4 条评论)。
- **[Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)** —— `spawn subAgent` 任务总是失败/超时(3 条评论)。
- **[PR #6776](https://github.com/agentscope-ai/QwenPaw/pull/6776)** —— 浏览器后端对已死亡 Playwright 驱动的自愈(“die once, dead forever”,一旦挂掉便永久失效)，首次贡献者，已就绪待评审。
- **[PR #7592](https://github.com/agentscope-ai/QwenPaw/pull/7592)** —— 可选的 Telegram 中间消息清理，在最终响应之后执行；默认关闭(opt-in),保持 2.2.x 行为。

这些讨论背后的共同诉求：**可预期的执行控制**(Stop 真正生效、subAgent 不挂起)和**多用户团队工作流**(Hub、对移动端友好的管理页面)。

---

## 5. Bug 与稳定性

过去 24 小时内上报，按严重程度 / 影响范围排序：

| # | 严重程度 | 症状 | 备注 / 修复 |
|---|----------|---------|-------------|
| [Issue #7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | **高** —— 存在静默数据损坏风险。Stop 按钮在 UI 中报告已停止，但任务仍在执行；发送纠正性指令会抛出 HTTP 409。v2.2 Web 端。 | 尚无关联 PR。 |
| [Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | **高** —— Windows 2.2.0 上功能完全失效。一旦任务触发 `spawn subAgent`,无论超时设置为何，每次尝试都会超时。 | 与 [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) 相近(`subagent_model` 被忽略——生成的子代理总是继承父级的 `active_model`)。强烈表明 2.2.x 存在系统性的子代理路由回归。 |
| [Issue #7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) | **高** —— 数据丢失。Tauri v2.2.1 Windows 侧边栏显示 9/10 的会话，却加载 9/9 的内容；底层会话 JSON 在磁盘上缺失。 | 影响对本地持久化的信任；需要一套索引重建方案。 |
| [Issue #7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) | **中** —— 供应商集成回归。在 [#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) 之后，面向 **OpenAI 兼容的 `/chat/completions` 多模态端点**，PDF 文档块仍被序列化为 `{"type":"file",...}` 并收到 HTTP 错误拒绝。 | 只修了一半；需要后续 PR。 |
| [Issue #7687](https://github.com/agentscope-ai/QwenPaw/issues/7687) | **中 —— 回归**，见于 `2.2.1-beta.2`(Console bundle 2026-09-10)。切换 agent 时会静默发送到新会话。 | **今日已关闭**(状态待定——需在稳定版中验证修复)。 |
| [Issue #7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | **中**。2.2.1 桌面端会话进行到一半时，已配置的模型消失；用户必须重新选择。 | 暂无修复 PR。 |
| [Issue #7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) | **中**。默认 Agent 工作目录在重启后回退到旧路径；按文件夹组织的项目-会话 UX 不够直观。 | 暂无修复 PR。 |
| [Issue #7693](https://github.com/agentscope-ai/QwenPaw/issues/7693) | **中**。Creator(多图项目)：图像生成期间点击“审核通过”(approve)会令任务永久卡在 RUNNING;并发槽位=1 导致无法恢复。 | 暂无修复 PR。 |
| [Issue #7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | **中**。`subagent_model` 设置不生效——生成的子代理总是继承父级的 `active_model`。影响 `2.2.1-beta.1` 和 `2.2.1-beta.2`。 | 暂无修复 PR。 |

**模式：**2.2.1 桌面端/Tauri 构建携带一组状态持久化与子代理路由方面的回归，需要一次协同的热修复发布。Issue [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) 最为紧迫——它可能损坏用户状态。

---

## 6. 功能请求与路线图信号

今日用户直接提交的请求，及其可能的版本归属：

| # | 请求 | 可能的目标版本 |
|---|---------|---------------|
| [Issue #7679](https://github.com/agentscope-ai/QwenPaw/issues/7679) | 在循环目标/任务模式下提供 `/compact` 命令，在提交前压缩超长上下文。 | **很可能在 2.2.2 / 2.3** —— 与 [PR #7703](https://github.com/agentscope-ai/QwenPaw/pull/7703) 中新的"Visual compaction"(视觉压缩)工作方向一致。 |
| [Issue #7700](https://github.com/agentscope-ai/QwenPaw/issues/7700) | 既然会话已移到左侧，将文档预览 / 浏览器面板切换到右侧。 | **很可能在 2.2.2** —— 与 [PR #7704](https://github.com/agentscope-ai/QwenPaw/pull/7704)(聊天文件抽屉右移)相符。 |
| [Issue #7707](https://github.com/agentscope-ai/QwenPaw/issues/7707) | Android 输入框：换行按钮应插入换行，而不是提交。 | **很可能是 2.2.2 移动端/Console 补丁** —— 今日已关闭，关注是否重开或出现 PR。 |
| [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | Hub 多租户：多用户、由管理员管理的技能。 | **活跃的路线图讨论**;[PR #7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)(`qwenpaw hub --init-admin`)是 Hub 的首个具体交付。 |
| [PR #7696](https://github.com/agentscope-ai/QwenPaw/pull/7696) | `qwenpaw hub --init-admin USERNAME`,用于无头(headless)环境下引导初始化首位管理员。 | Hub 能力管线。 |
| [PR #7702](https://github.com/agentscope-ai/QwenPaw/pull/7702) | `bot-manager` 插件——统一的多渠道机器人配置(WeChat、DingTalk……),并提供 agent↔渠道绑定视图。 | 可能在插件生态 / 下一个次版本。 |
| [PR #7592](https://github.com/agentscope-ai/QwenPaw/pull/7592) | 在最终回答后可选清理 Telegram 中间消息。 | 可能在 2.2.2 —— opt-in,默认关闭。 |

**路线图信号：**围绕“长任务上下文控制”的这组动向(#7679 + #7703 + #7652)表明，QwenPaw 正在收敛出一条一流的**上下文工程(context-engineering)**路线，覆盖压缩(compaction)、视觉压缩以及感知供应商的上下文窗口。

---

## 7. 用户反馈摘要

从今日讨论中提炼的痛点：

- **执行控制不可靠。**用户无法信任 Stop 按钮([#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)),`spawn subAgent` 会不可预测地挂起([#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)、[#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676))。这是当天最强烈的不满信号。
- **本地持久化很脆弱。**会话可能从索引中消失([#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698)),模型配置会不翼而飞([#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708))。Windows Tauri 2.2.1 用户感觉设置“留不住”。
- **移动端 Web 广受欢迎，

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-11

## 1. 今日概览

ZeroClaw 在过去 24 小时表现出**维护者高度参与，但高风险、安全相关工作高度集中**的特点。共涉及 50 个 issue 和 50 个 PR，活动几乎均匀分布在主动分诊/决策工作（RFC、维护者审阅队列、设计追踪器）和具体 Bug 修复之间。暂无新版本发布，但项目保持着健康的工程节奏：今日关闭了 5 个 issue 和 2 个 PR，其中包括长期未解决的 Telegram 媒体组 Bug（#5514 / #8955）。Windows 相关问题在堆栈顶部占主导地位——受限线程上的栈溢出、端口绑定僵尸进程以及 CI 矩阵缺失——表明团队正在积极扩展跨平台覆盖。RFC 流水线（决策追踪器 #8692、关于投票简化的 RFC #10549、关于 PR 评审证据的 RFC #10366）表明治理/流程正在与代码工作同步被有意重塑。

## 2. 版本发布

过去 24 小时内无新版本发布。

## 3. 项目进展

**今日关闭的 issue（5 个）：**
- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — *Bug: 将 Telegram 媒体组合并为一个多模态回合* — 在对应 PR 合入后关闭。
- [#9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521) — *将 MCP tools/call type:image 内容块映射到视觉管线* — 在多模态通路向上游迁移后关闭（状态：阻塞/跟进）。
- [#10532](https://github.com/zeroclaw-labs/zeroclaw/issues/10532) — *降级配置修复可能调用与运行中的守护进程不同的二进制文件* — 配置引导正确性 Bug 已关闭。
- 另外两个较小的关闭项完成今日配额。

**今日关闭的 PR（2 个）：**
- [#8955](https://github.com/zeroclaw-labs/zeroclaw/pull/8955) — *fix(telegram): 批量处理媒体组附件* — 关闭 #5514 的 XL Telegram 变更。
- 另外一项关闭（不在前 20 列表中）。

**项目净动向：** Telegram 媒体批处理已达到生产质量，MCP 多模态视觉路由已就位，CLI 的降级配置修复不再错误地指向二进制文件。

## 4. 社区热点话题

| 排名 | 项目 | 评论数 | 主题 |
|------|------|----------|-------|
| 1 | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — 74 个 Windows 测试失败 | 19 | 平台覆盖 |
| 2 | [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 维护者决策队列 | 15 | 治理 |
| 3 | [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC：简化 RFC 投票 | 9 | 流程改革 |
| 4 | [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — Telegram 媒体组 *（已关闭）* | 8 | 渠道 UX |
| 5 | [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) — Nextcloud Talk 错误 Bot API | 8 | 渠道集成 |
| 6 | [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) — RFC：PR 评审证据 | 7 | 评审者信任模型 |
| 7 | [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) — CI Rust 缓存改进 | 7 | 开发效率 |
| 8 | [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) — wasmtime-wasi CVE | 6 | 供应链安全 |

**浮现的底层需求：**
- **跨平台对等性** 是呼声最高的需求（#7462、#7461、#8800、#10753、#10734）。Windows 11 用户以及运行新咨询 CI 任务的维护者，正在发现 Linux CI 无法捕获的真实栈溢出和端口绑定缺陷。
- **流程/治理改革** 是第二主题：维护者精力正通过决策追踪器（#8692）被明显地定量分配，RFC 体系本身也正在被重新设计（#10549、#10366）。社区正在传达这样的信号：元流程成本已与代码成本相当。
- **渠道正确性**（Telegram 批处理、Nextcloud Talk Bot API）是一类反复出现的问题——第三方集成持续需要定制化修复，而不是套用共享抽象。

## 5. Bug 与稳定性

按严重程度 × 处理进度排序：

| 优先级 | Issue | 标题 | 状态 | 修复 PR？ |
|----------|-------|-------|--------|---------|
| **S0** | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) | delegate 绕过父级工具允许列表 | 已接受，无陈旧 | 未见 |
| **S1** | [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) | Web 仪表板代理在聊天窗口退出时停止 | 处理中 | [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) 覆盖了相关 #8794 |
| **S1** | [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) | 中途停止代理会从上下文中清除工具调用/思考 | 已接受 | 关联到 #9002 |
| **S1** | [#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) | Windows：zeroclaw 被杀后端口仍被绑定（僵尸 LISTENING） | 已接受 | 尚无 |
| **S1** | [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) | MCP 工具 schema 克隆导致代理循环中 RSS 无界增长 | 已接受，无陈旧 | 未见（从 #5542 拆分） |
| **S2** | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) | 74 个 Windows 测试失败（仅 Unix 命令） | 处理中 | 关联到 #7461（CI 矩阵） |
| **S2** | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | Windows 线程上 process_line 栈溢出 | 处理中 | 尚无 |
| **S2** | [#10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) | session/new 在 Windows 上溢出 2 MB 栈 | 开放 | 尚无 |
| **S2** | [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) | `service logs` 在 macOS/Windows/OpenRC 上无输出 | 处理中 | 尚无 |
| **S2** | [#10532](https://github.com/zeroclaw-labs/zeroclaw/issues/10532) | 降级配置修复错误二进制 *（已关闭）* | 已关闭 | 有 |
| **S3** | [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) | Nextcloud Talk 错误 Bot API | 阻塞 | 未见 |
| **S3** | [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) | Telegram 媒体组 *（已关闭）* | 已关闭 | #8955 |

**模式：** 严重程度最高的七个未关闭 Bug 中有四个是 Windows 专属。`process_line` / `session/new` 栈溢出出现在三个相关 issue 中（#10753、#10734，以及 #7462 CI 任务），表明存在单一根因——Rust 在 Windows 上的默认 2 MB 线程栈。S0 的两个安全 Bug（#8279）和 S1（#8642）目前未见进行中的 PR。

## 6. 功能请求与路线图信号

**已有 PR 的进行中增强：**
- [#9002](https://github.com/zeroclaw-labs/zeroclaw/pull/9002) — *Gateway：在查看器断开后保持代理回合存活* — 若顺利合入，将同时关闭 #8559 和 #8794。
- [#9143](https://github.com/zeroclaw-labs/zeroclaw/pull/9143) — *Channels：通过共享运行时路由插件事件* — 堆叠系列（#9138、#9139、#9142、#9143）中的基础 PR，正在重塑插件/渠道架构。
- [#9833](https://github.com/zeroclaw-labs/zeroclaw/pull/9833) — *新增 `web_research` delegate 工具*，带有界子代理循环（8 次调用 / 180 秒）。
- [#9829](https://github.com/zeroclaw-labs/zeroclaw/pull/9829) — *web_fetch 将大响应（>50 KB）溢出到工作区文件而非截断*。
- [#9828](https://github.com/zeroclaw-labs/zeroclaw/pull/9828) — *面向代理的配置编写，操作员批准的策略预览* — 大型架构变更。
- [#9341](https://github.com/zeroclaw-labs/zeroclaw/pull/9341) — *ZeroCode Code 面板：呈现会话历史与持久内存隔离*。
- [#9283](https://github.com/zeroclaw-labs/zeroclaw/pull/9283) — *解压 gzip/brotli/deflate 的 web_fetch 响应*。
- [#9229](https://github.com/zeroclaw-labs/zeroclaw/pull/9229) — *交互式 REPL 中状态感知的 Ctrl+C*（阻塞）。
- [#10771](https://github.com/zeroclaw-labs/zeroclaw/pull/10771) — *在工具注册表构建中共享一个配置快照*（性能 XS）。
- [#10775](https://github.com/zeroclaw-labs/zeroclaw/pull/10775) — *模式替换失败时保留活动会话*。

**指向下一版本范围的追踪 issue：**
- [#9967](https://github.com/zeroclaw-labs/zeroclaw/issues/9967) — Harness 评估框架（史诗级追踪器）。
- [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) — Rust CI 缓存/关键路径工作，将 PR CI 从约 15–20 分钟降下来。

**下一发布窗口的预测：**
1. Windows/macOS CI 矩阵铺开（#7461、#10734、#10753）——这些是平台轨道上可见的阻塞点。
2. Gateway 查看器/回合分离（#9002）——同时解决两个 S1 Bug，且 PR 虽为 XL 级别但已获得杰出贡献者推动。
3. 插件事件路由基础（#9138/#9139/#9142/#9143 堆叠）——取决于评审进度，但架构正在收敛。

## 7. 用户反馈摘要

**今日浮出的真实痛点：**

- **Windows 用户碰壁**（#7462、#8800、#10753、#10734）。主要抱怨：在 Linux 上测试通过，发布到 Windows 后，守护进程无法绑定端口或在正常 RPC 期间栈溢出。一位用户明确对比了 2026-09-07 的绿灯测试与 2026-09-10 的崩溃——快速演化的不稳定性。
- **代理控制很脆弱**（#8559、#8794）。用户反馈关闭仪表板标签页或中途停止代理会静默丢弃上下文，迫使他们重新解释工作。这被描述为工作流阻塞项，而非润色项。
- **Delegate 安全缺口**（#8279）。一位资深用户发现 `delegate` 注入的是**未过滤的**父级工具集，因此子代理可以调用父级策略明确排除的工具——这是一项具有广泛架构影响的 S0 数据丢失/安全发现。
- **MCP 中内存增长**（#8642）。在 WSL2 上运行长会话的实践者报告 OOM；根因是每次代理循环迭代都会克隆工具 schema。
- **配置漂移**（#10532、#7899）。用户希望 `zeroclaw` 遵守环境变量和他们实际调用的二进制文件，而不是 PATH 竞速中碰巧胜出的那个。

**满意度信号：** 今日关闭的两项（Telegram 批处理、降级配置修复）报告清晰、聚焦，解决方案明确——当 issue 范围明确时，维护者工作流运转顺畅。Telegram PR 从 issue #5514 到关闭耗时约 2 个月，对于此规模的 Bug 而言偏慢。

## 8. 待办积压观察

高优先级或高风险、但已多日无明确进展的项：

- [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) — **S0** 安全：delegate 绕过父级工具允许列表。开启于 2026-06-24。未见解 PR；受影响路径为 `crates/zeroclaw-runtime/src/tools/mod...`。需要维护者级别评审。
- [#8642](https://github.com/zeroclaw-labs/zeroclaw/issues/8642) — **P1** 通过 MCP 工具 schema 克隆导致的内存增长。开启于 2026-07-03。从 #5542 拆分但仍未修复。
- [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) — **P2，状态：阻塞** Nextcloud Talk 错误 Bot API。开启于 2026-04-27。已阻塞约 4.5 个月，近期无进展。
- [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) — **P1** wasmtime-wasi CVE 修复 + audit.toml/deny.toml 漂移。开启于 2026-06-30。仍在跟踪残余 CVE。
- [#9229](https://github.com/zeroclaw-labs/zeroclaw/pull/9229) — **杰出贡献者，状态：阻塞** 状态感知 Ctrl+C 的 PR。尽管在积极迭代，但仍停滞。
- [#10754](https://github.com/zeroclaw-labs/zeroclaw/issues/10754)、[#10755](https://github.com/zeroclaw-labs/zeroclaw/issues/10755)、[#10756](https://github.com/zeroclaw-labs/zeroclaw/issues/10756)、[#10758](https://github.com/zeroclaw-labs/zeroclaw/issues/10758)、[#10759](https://github.com/zeroclaw-labs/zeroclaw/issues/10759)、[#10764](https://github.com/zeroclaw-labs/zeroclaw/issues/10764)、[#10769](https://github.com/zeroclaw-labs/zeroclaw/issues/10769) — 由 IftekharUddin 于 2026-09-10/11 开启的 **needs-maintainer-review** 七项集群，涵盖内存来源、shell 标记保留、cron 传递、文档时效性以及插件载荷硬化。尚无维护者回应；它们共同构成了落在单一维护者（Audacity88）身上的可观的评审负担。
- [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 维护者决策队列本身是注意力需求的最强信号；追踪它是查看卡点项的最清晰方式。

**整体项目健康信号：** 强劲——团队在持续交付、关闭 Bug，并有意地同时重新工程化代码（插件栈、web_fetch、delegate 安全）和流程（RFC #10549、#10366，决策追踪器 #8692）。需关注的风险是评审者集中度：近期大量关键修复依赖于一两位维护者，上述七项 needs-maintainer-review 将竞争同一批评审者时间槽。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*