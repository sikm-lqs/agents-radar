# OpenClaw 生态日报 2026-09-08

> Issues: 473 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-07 16:38 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-08

## 1. 今日概览

OpenClaw 展现了极高的分流吞吐量（24 小时内处理了 473 个 issue 和 500 个 PR），两个渠道的开闭比例约为 54%/46%，表明维护节奏保持稳定。但定性信号令人担忧：一大簇回归问题集中在 **2026.8.1 / 2026.8.2** 版本上 —— 涵盖 provider 工具调用 JSON 格式错误、SQLite 写入争用、OAuth 刷新超时、OAuth 过期的 User-Agent、渠道侧故障（Discord、Telegram、飞书）以及会话/状态缺陷 —— 而 **2026.9.2** 版本线则浮现出新的安装期缺陷（例如 Discord 设置将 application ID 误判为 token、内嵌 llama.cpp 的 ubatch 回归）。窗口期内未发布新版本，这与在下个发版列车前的稳定化冲刺节奏一致。项目健康度：**活跃但承受回归压力**，维护者 `steipete` 在开放 PR 队列中承担了不成比例的份额。

## 2. 版本发布

*过去 24 小时内无新版本发布。当前已发布版本线仍为 2026.9.2，2026.8.x 分支处于活跃回归修复中。*

## 3. 项目进展

虽然没有任何 PR 以正式发布的形式落地，但过去 24 小时内有数个值得关注的 PR 推进或被关闭：

- **维护 / 可观测性**
  - [#141329](https://github.com/openclaw/openclaw/pull/141329) — `openclaw status --all` 日志汇总提速（已关闭/合并）。
  - [#141216](https://github.com/openclaw/openclaw/pull/141216) — 控制面板 usage-timeline 计数器准确性（已关闭/合并）。
  - [#141127](https://github.com/openclaw/openclaw/pull/141127) — `reef`：跨实时帧的暂挂消息恢复（已关闭/合并）。
  - [#141334](https://github.com/openclaw/openclaw/pull/141334) — 死代码扫描中保留 iOS Siri/Shortcuts intent 元数据（已关闭/合并）。

- **Provider 与推理**
  - [#141114](https://github.com/openclaw/openclaw/pull/141114) — 复用单块压缩的暖前缀（Anthropic/OpenAI Responses）。
  - [#141113](https://github.com/openclaw/openclaw/pull/141113) — 尊重自托管模型的上下文元数据（vLLM/SGLang `max_model_len`）。
  - [#141354](https://github.com/openclaw/openclaw/pull/141354) — `openclaw models status` 不再将已解析的凭证误报为缺失。
  - [#135366](https://github.com/openclaw/openclaw/pull/135366) — Firecrawl 自托管 DNS 失败诊断。
  - [#128642](https://github.com/openclaw/openclaw/pull/128642) — Amazon Bedrock 回放时 `toolUse.input` 清洗。
  - [#118896](https://github.com/openclaw/openclaw/pull/118896) — 停止声明不支持的 Gemini web-search filters。

- **渠道与集成**
  - [#141086](https://github.com/openclaw/openclaw/pull/141086) — 文件传输归档策略遵循已准入成员身份（修复 macOS bsdtar 上的显示转义欺骗）。
  - [#140989](https://github.com/openclaw/openclaw/pull/140989) — 备份跳过 macOS AppleDouble `._*.sqlite` 伴生文件。
  - [#121050](https://github.com/openclaw/openclaw/pull/121050) — 控制面板在 `config.apply/patch` 重启后保留 webchat 上下文。

- **Agent / 会话 / 记忆**
  - [#138984](https://github.com/openclaw/openclaw/pull/138984) — 在不放大重置的前提下发布完整的 transcript 重写。
  - [#133693](https://github.com/openclaw/openclaw/pull/133693) — 防止孤立 cron 运行在运行时刷新期间失败。
  - [#133376](https://github.com/openclaw/openclaw/pull/133376) — Code Mode `skills.read` 在 skill 根目录下加载文件。
  - [#141352](https://github.com/openclaw/openclaw/pull/141352) — 避免对已确认完成的完成事件产生重复 agent 轮次。
  - [#141353](https://github.com/openclaw/openclaw/pull/141353) — 保留大命令输出的诊断信息（修复 17 MiB blob 上的 RangeError）。

- **发布流水线**
  - [#141146](https://github.com/openclaw/openclaw/pull/141146) — 在合并前捕获已发布的升级回归（AWS Crabbox 跨 12 个 npm 版本的矩阵已发现 5 个缺陷，分别由 #140778、#140784、#140886、#140825 修复）。
  - [#136761](https://github.com/openclaw/openclaw/pull/136761) — 整合冻结目标 harness 契约。
  - [#141175](https://github.com/openclaw/openclaw/pull/141175) — 已安装插件在更新期间未通过候选校验。

头条架构 PR —— [#135599](https://github.com/openclaw/openclaw/pull/135599) "manage and reload plugins without restarting the Gateway" —— 仍处开放状态，并已被明确拆分为可落地的切片；#139775 和 #1398xx 的部分已落地，但完整生命周期尚未交付。

## 4. 社区热点议题

过去 24 小时内按评论数排序的热门 issue，均聚集在 2026.8.x 回归潮周围：

1. **[#135111](https://github.com/openclaw/openclaw/issues/135111)**（17 条评论，P1）— 在 v2026.8.1 上使用 `claude-sonnet-5` 时出现间歇性的 *"Provider completed tool call with malformed JSON arguments"*。被标记为 platinum hermit、no-new-fix-pr、needs-live-repro。**底层诉求：** provider 层的工具调用校验不应悄悄截断结构化参数；用户希望获得稳定的 LLM 错误分类体系，而不是间歇性的工具失败。
2. **[#97616](https://github.com/openclaw/openclaw/issues/97616)**（15 条评论，P1）— 未回收的 hook/tool 子进程累积为僵尸进程，导致运行时退化。**诉求：** 在 hook exec 场景下建立规范的进程生命周期所有权，并具有确定性的 SIGCHLD/回收行为。
3. **[#79077](https://github.com/openclaw/openclaw/issues/79077)**（15 条评论，8 👍，已关闭）— Telegram Guest Bots 与 Bot-to-Bot 通信（2026 年 5 月 7 日的 Telegram 规范）。目前因等待产品决策而被关闭/标记为 stale。**诉求：** 对新的 Telegram bot 平台原语提供一等公民支持。
4. **[#43367](https://github.com/openclaw/openclaw/issues/43367)**（14 条评论，P1）— 多 agent 编排的不稳定性：并发的 `openclaw agents add` 配置覆盖、会话锁失败、孤儿子进程。**诉求：** 为 `agents` 配置写入建立真正的并发模型，并采用原子化的会话锁。
5. **[#74586](https://github.com/openclaw/openclaw/issues/74586)**（14 条评论，3 👍，P2）— `active-memory` 内嵌运行会中止 `memory_search` 并被误分类为超时。**诉求：** 将"工具完成但驱动超时"与"工具未响应"区分开。
6. **[#119720](https://github.com/openclaw/openclaw/issues/119720)**（12 条评论，diamond lobster）— 同步的 agent 持久化/transcript 维护在大规模下阻塞 Gateway 事件循环。关联修复 #133925 和 #134062 部分落地但尚未关闭。**诉求：** 为 Gateway 热路径提供离线程的持久化。
7. **[#89278](https://github.com/openclaw/openclaw/issues/89278)**（11 条评论，P0，ux-release-blocker）— Codex OAuth 刷新成功，但 cron/heartbeat 因 10 秒刷新超时而失败。**诉求：** 超时应对齐到实际探测延迟，并且在下游路径无法满足预算时不应误报为"可用"状态。
8. **[#136183](https://github.com/openclaw/openclaw/issues/136183)**（10 条评论，P1）— 命令执行器派生的 `ssh` 在 banner 交换时挂起（2026.8.1 → 2026.8.2 回归）。**诉求：** 在子进程 stdin/stdout 排空期间实现信号安全的 I/O。
9. **[#139714](https://github.com/openclaw/openclaw/issues/139714)**（9 条评论，diamond lobster，批量提交）— `updateCommand()` 准入了一条永远无法最终化的 `update_runs` 记录；`openclaw status` 永远报告"更新进行中"。**诉求：** `update_runs` 记录的原子化准入与提交。
10. **[#140010](https://github.com/openclaw/openclaw/issues/140010)**（9 条评论，P1）— Windows 睡眠/唤醒后：30–60 秒以上的 WebSocket 重连失败。**诉求：** 解冻恢复不应排在繁忙的 Gateway 之后。

从热门议题中浮现的横向需求：**Gateway 事件循环是前七热门议题中三处的瓶颈**（#119720、#140010、#117262），描述的都是同一根因的不同症状 —— 同步持久化、SQLite 写入争用，以及解冻/恢复的延迟处理。

## 5. Bug 与稳定性

按严重程度排序（P0 优先），并附带修复 PR 关联：

### P0 — 发布阻塞
- **[#89278](https://github.com/openclaw/openclaw/issues/89278)** — Codex OAuth 刷新 10 秒超时破坏 cron/heartbeat。*无关联修复 PR。*被标记为 ux-release-blocker。
- **[#140497](https://github.com/openclaw/openclaw/issues/140497)** — Discord 设置将 application ID 接受为 bot token，渠道报告 enabled/stopped 时 `lastError=null`。窗口期内关闭但仍请求复现（`needs-live-repro`）。
- **[#140550](https://github.com/openclaw/openclaw/pull/140550)** — Discord guild 白名单写入在重启前不生效；`stop/start` 保留过期的运行时配置。PR 开放中，等待评审。
- **[#106920](https://github.com/openclaw/openclaw/issues/106920)** — `openclaw 2026.7.1` 更新后无法重启 gateway。在持续的 5 个 👍 压力下*窗口期内关闭*。

### P1 — 高影响回归 / 数据丢失
- **[#135111](https://github.com/openclaw/openclaw/issues/135111)** — 间歇性的工具调用 JSON 格式错误。*无修复 PR。*
- **[#43367](https://github.com/openclaw/openclaw/issues/43367)** — 多 agent 编排并发。关联 PR 开放中但不完整。
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — 同步持久化阻塞事件循环。经 #133925、#134062 部分修复；尚未关闭。
- **[#117262](https://github.com/openclaw/openclaw/issues/117262)** — SQLite 争用：`state/openclaw.sqlite` 上的 3 个并发写句柄造成约 33 秒的卡顿（DEF-61）。*无修复 PR。*
- **[#118018](https://github.com/openclaw/openclaw/issues/118018)** — 过时的子 agent 完成事件被投递到已替换的请求方生命周期中。
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — 子进程僵尸化。
- **[#89278](https://github.com/openclaw/openclaw/issues/89278)** — OAuth 10 秒超时（同上）。
- **[#136183](https://github.com/openclaw/openclaw/issues/136183)** — `ssh` 在 banner 阶段的 SIGTERM。
- **[#140010](https://github.com/openclaw/openclaw/issues/140010)** — Windows 睡眠/唤醒后重连卡顿。
- **[#140971](https://github.com/openclaw/openclaw/issues/140971)** — 飞书插件所有工具在消息触发的运行中被静默丢弃（回归 2026.7.1-2 → 2026.8.1）。
- **[#139578](https://github.com/openclaw/openclaw/issues/139578)** — llama.cpp 管理的 `EmbeddingGemma` 以服务器默认的 ubatch 512 运行（来自 #134389 的回归）。
- **[#137927](https://github.com/openclaw/openclaw/issues/137927)** — 内部上下文块泄漏到可见的 Telegram 消息正文中（接近安全问题）。
- **[#137332](https://github.com/openclaw/openclaw/issues/137332)** — 混合终端请求方结算批在所有权检查后无限重试。
- **[#113701](https://github.com/openclaw/openclaw/issues/113701)** — 上下文溢出 + 压缩失败 → 会话失败循环。
- **[#121232](https://github.com/openclaw/openclaw/issues/121232)** — `memory-core` dreaming 排序器与应用器分歧（"Ranked N, Promoted 0"）。
- **[#119454](https://github.com/openclaw/openclaw/issues/119454)** — 卡住会话的恢复在泄漏的内嵌运行上自我抑制。
- **[#94716](https://github.com/openclaw/openclaw/issues/94716)** — Anthropic `claude-cli` 发送过期的 `claude-cli/2.1.75` User-Agent → bearer 认证失败。
- **[#140129](https://github.com/openclaw/openclaw/issues/140129)** — 2026.9.2 Anthropic 缓存在约 46k tools+system 前缀处卡住；`session:sanitized` 重写历史指纹。
- **[#99910](https://github.com/openclaw/openclaw/issues/99910)** — 记忆 dreaming 将 Gateway 事件循环挂死约 10 分钟；短期召回永远无法持久化。

### P2 — 行为 bug / 回归
- **[#74586](https://github.com/openclaw/openclaw/issues/74586)** — `memory_search` 超时误分类。
- **[#137705](https://github.com/openclaw/openclaw/issues/137705)** — Telegram 流式输出泄漏原始 `file:///` Markdown（接近安全问题）。
- **[#140971](https://github.com/openclaw/openclaw/issues/140971)** — 飞书插件工具丢弃。
- **[#115256](https://github.com/openclaw/openclaw/issues/115256)** — 桌面应用让 gateway 进入启动循环；`doctor` 的修复被立即回退。
- **[#45469](https://github.com/openclaw/openclaw/issues/45469)** — `scheduleReconnect()` 没有最大重试次数限制。
- **[#120006](https://github.com/openclaw/openclaw/issues/120006)** — CLI 会话重置会丢弃工具历史；并发的 CLI 会话在同一 key 上发生冲突。
- **[#126874](https://github.com/openclaw/openclaw/issues/126874)** — **Windows CI 仅运行 10,979 个测试文件中的 66 个（0.60%）**；`checks-windows` 在被跳过时通过。关键的基础设施覆盖率缺口。
- **[#68264](https://github.com/openclaw/openclaw/issues/68264)** — Canvas/Browser UI 可视化回归（已关闭，stale）。

**模式：** **2026.8.1 → 2026.8.2** 列车至少涉及七处回归（provider JSON、ssh banner、OAuth 超时、内嵌 ubatch、飞书工具、Telegram Markdown 泄漏、内部上下文泄漏）。两个最严重的 P0（#89278、#140550）和数个 P1（#94716、#140129）仍然**在队列中没有开放的修复 PR**。

## 6. 功能请求与路线图信号

窗口期内活跃的增强与产品方向项：

- **[#79077](https://github.com/openclaw/openclaw/issues/79077)** — Telegram Guest Bots + Bot-to-Bot 通信。作为 stale 关闭，但规范真实且运维方需求旺盛（8 👍）。可能在 2026.Q4 重新提上日程。
- **[#78963](https://github.com/openclaw/openclaw/issues/78963)** — WhatsApp 仅监听 / 仅 hook 模式，用于 ETL/归档插件（已关闭/stale，需要安全审查）。
- **[#51441](https://github.com/openclaw/openclaw/issues/51441)** — 在 `session_status` 和 agent 运行时中暴露已解析的后端模型（LiteLLM 透明性）。代理 provider 用户群中持续存在的诉求。
- **[#51572](https://github.com/openclaw/openclaw/issues/51572)** — 在重置/裁剪时也触发 `session-memory` hook，而不仅在压缩时。强"长记忆"用例。
- **[#42276](https://github.com/openclaw/openclaw/issues/42276)** — 带覆写行的可见推理流（OpenAI/Grok 风格）。长期存在的 UX 请求。
- **[#45503](https://github.com

---

## 横向生态对比

# 跨项目对比报告：个人 AI 助手 / 智能体生态
**快照日期：2026-09-08** | 项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

2026-09-08 的个人 AI 助手 / 智能体开源领域整体处于**稳定阶段**——五个项目在该时间窗口内均未发布新版本，并且都在消化近期发布列车带来的回归债务（OpenClaw 2026.8.x、QwenPaw v2.2.0、Hermes v0.21.0）。该品类已收敛至一套通用架构——网关/守护进程 + 多渠道适配器 + 记忆子系统 + 定时任务 + 桌面/TUI——因此竞争正从功能抢滩转向**可靠性工程**：持久化会话记录、无值守执行的可信任度、以及对供应商边缘情况的加固。活动规模差异约 70 倍（OpenClaw 的 973 个触达条目对比 IronClaw 的 14 个），表明市场正在成熟，呈现一家参考实现加若干差异化挑战者的格局。巴士因子风险（bus-factor risk）现已成为主导的健康变量：OpenClaw（steipete）和 Hermes（Teknium 在 51 个 issue 的修复战役中作为唯一的合并把关人）都将审阅权限集中在单一维护者身上。

---

## 2. 活跃度对比

| 项目 | Issues 触达（24h） | PRs 触达（24h） | PRs 合并/关闭 | 发布状态 | 健康分* |
|---|---|---|---|---|---|
| **OpenClaw** | 473（≈46% 已关闭） | 500（≈46% 已关闭） | ~230 | 无；当前版本 2026.9.2，2026.8.x 处于回归修复中 | **6/10**——吞吐量无出其右，但 2 个 P0 缺少修复 PR（#89278、#140550 同类），单次发布列车带来 7+ 回归，Windows CI 覆盖率仅 0.6%（#126874） |
| **Hermes Agent** | 50（38% 已关闭） | 50（36% 已关闭） | 18 | 无；版本即将发布但被 Teknium 的修复战役审阅阻塞 | **7/10**——最佳关闭率平衡；P1 #104653（对话轮次重复持久化）未修复 |
| **IronClaw** | 1 | 13 | 3 | 无；常规依赖刷新 | **7/10**——稳定、低风险，但依赖机器人驱动，社区参与度近乎为零 |
| **QwenPaw** | 41 | 48 | 5 | 无；v2.2.0 回归潮；建议发布 v2.2.1 补丁 | **5.5/10**——高速度 + 测试覆盖率投入（+5pp），但 2 个 critical 仍开放且无修复（#7579、#7589） |
| **ZeroClaw** | 26（3 个关闭） | 50 | 1（~2% 合并率） | 无；v0.8.5 周更持续 | **6/10**——追踪单纪律性强，但 XL-PR 审阅延迟（尤其是 #9378）阻塞了一整个 S0/S1 bug 集群 |

*基于 24 小时快照：bug 严重程度与修复可得性、合并吞吐量、维护者集中度、回归压力。

---

## 3. OpenClaw 的定位

**相对同侪的优势：**
- **规模（约为最近对手的 10 倍）：** 日均触达 473 issues / 500 PRs，对比 Hermes 的 50/50——拥有最大的社区、分类吞吐能力以及成熟的 issue 分类体系（P0–P2 标签、修复 PR 关联、跨领域根因分析）。
- **最广泛的集成面：** 六个以上渠道（Discord、Telegram、飞书、WhatsApp），覆盖 Anthropic/OpenAI/Bedrock/vLLM/SGLang/Gemini 的供应商矩阵，Control UI，iOS Siri/Shortcuts 意图，以及插件生命周期架构（#135599 热重载，已部分落地）。
- **发布工程领先：** 合并前的升级回归矩阵（#141146）在 12 个 npm 版本中提前捕获 5 个缺陷——同侪中尚无对等的已发布机制。

**技术路线差异：** TypeScript/npm 分发，对比 Rust（IronClaw、ZeroClaw）与 Python（QwenPaw）；单体网关 + 插件系统，对比 ZeroClaw 的 Tokio 守护进程 + ACP TUI 或 Hermes 的桌面优先混合架构。

**相对同侪的劣势：**（1）网关事件循环瓶颈（同步持久化 #119720、SQLite 争用 #117262、解冻恢复 #140010）出现在前 7 大议题中的 3 个，而 ZeroClaw 正为同类问题积极构建会话所有权契约（#10412）；（2）2026.8.1→8.2 发布列车带来 7+ 回归——本周期发布卫生差于 QwenPaw，后者针对其 beta.4 事故采取了合并冻结策略（#7603）；（3）Windows CI 仅覆盖 0.60% 测试（#126874），而 Hermes 至少能及时处理 Windows 修复。**社区规模：** 按活动量代理指标，OpenClaw（973 项/日）> Hermes（~100）> QwenPaw（~89）> ZeroClaw（~76）> IronClaw（14）。

---

## 4. 共同技术焦点领域

| 焦点领域 | 涉及项目 | 具体证据 |
|---|---|---|
| **持久化、恰好一次的会话记录持久存储** | OpenClaw、Hermes、QwenPaw、ZeroClaw | OpenClaw #119720/#140129/#120006；Hermes #104653（轮次写入两次） + #94486（提示词丢失）；QwenPaw #7579（模型遗忘自身回复）；ZeroClaw #9333/#10121/#10659（S0 数据丢失）—— #9378 修复停滞 |
| **非阻塞事件循环 / 热路径** | OpenClaw、QwenPaw、ZeroClaw | OpenClaw #117262（约 33 秒 SQLite 阻塞）；QwenPaw #7363（118–135 秒阻塞）；ZeroClaw #10230（守护进程栈溢出） |
| **定时任务 / 无值守运行的可靠性与结果回报** | 全部五个 | OpenClaw #89278（OAuth 超时杀掉 cron） + #139714（卡在"更新中"）；Hermes #100437/#105188；ZeroClaw #9191/#9940 + 追踪单 #10685（"发送假成功、重复回复"）；QwenPaw #7589（2 小时心跳锁死） |
| **LLM 边界的工具调用参数健壮性** | OpenClaw、Hermes、QwenPaw | OpenClaw #135111（畸形 JSON 参数，17 条评论）；Hermes #105189（流中断派发 `{}` 参数——副作用风险）；QwenPaw #6936（已修复：字符串类型强制转换） |
| **供应商侧真实的 token 计量与缓存感知的上下文管理** | Hermes、QwenPaw、ZeroClaw、OpenClaw | Hermes #104462/#80246（`bytes/4` 忽略 `reasoning_content`）；QwenPaw #7576（硬编码 32768 回退→ 误报 CONTEXT_UNFIT）；ZeroClaw #10663/#10660/#10674（缓存 TTL、第三个断点、裁剪 vs 缓存）；OpenClaw #113701/#140129 |
| **Windows / 桌面打包脆弱性** | Hermes、OpenClaw、QwenPaw | Hermes #105184（白屏） + #105145（退出码 8） + #46332（WSL vs Git Bash）；OpenClaw #140010 + #126874；QwenPaw v2.2.0 工作目录选择器回归 |
| **多会话并发与所有权** | OpenClaw、ZeroClaw、Hermes | OpenClaw #43367（配置覆盖竞态）；ZeroClaw #10408/#10412/#10670；Hermes #97681（多设备群聊，27 条评论） |

---

## 5. 差异化分析

- **OpenClaw**——*广度领导者。* 功能聚焦：最大化的渠道/供应商矩阵 + 插件生态。目标：希望一个网关搞定一切的自托管者和集成者。架构：TypeScript monorepo，npm 发布列车，内置记忆"做梦"子系统。
- **Hermes Agent**——*前沿模型速度 + 桌面 UX。* 率先落地 GPT-6 Astra Responses 合约（#103016）、Poolside 供应商、推理模型修复；Electron 应用，凭据池，看板任务模型，Honcho 记忆。目标：在多设备上跑 bot 的高阶用户与 Nous 社区折腾者。唯一维护者把关合并是结构性成本。
- **QwenPaw**——*记忆优先、中国市场技术栈。* 在可插拔记忆后端（ReMe 0.4.1.12 准备、ADBPG/PowerContext → 插件 #7616、OpenViking #7613）以及国内/本地供应商（智谱 GLM、DeepSeek、WUSRouter、局域网内 LM Studio）方面形成差异。Python + PyInstaller 桌面；重度投入控制台 UI。
- **ZeroClaw**——*成本与信任工程。* 在 Anthropic 提示缓存经济学（TTL、断点、裁剪感知）和送达保证（结果回报追踪单 #10685）方面最深耕；MCP 可安装的发布目标（#10684）；安全仪式（出口授权 #9584、沙箱启动器解决方案 #10381）。Rust/Tokio 守护进程 + ACP 多窗格 TUI。目标：成本敏感的运营者。
- **IronClaw**——*评测驱动与安全聚焦。* 独特的每日失败分类纪律（#8081：42 个 officeqa 未归因于 DeepSeek-V4-Flash 数值错误）；MCP 主机泄漏分类（#8077）；WASM 沙箱栈。目标：nearai 上的托管/企业 Slack 用户。五者中社区活跃度最低。

---

## 6. 社区动能与成熟度

- **Tier 1——规模领导者：** **OpenClaw** 主导数量但承受回归压力；健康度取决于能否将负载分散到 `steipete` 之外。
- **Tier 2——快速迭代者：** **Hermes**（最佳关闭比、组织化的 15 通道战役）和 **QwenPaw**（高速度叠加有意识的测试债务偿还——+245 用例，第四次覆盖率冲刺）——都在快速推进并存在开放的 critical 问题。
- **Tier 3——架构稳定者：** **ZeroClaw**——50 个 PR 中 49 个仍开放，由 size:XL 重构主导；v0.8.5 周更保持发布节奏，但 2% 的合并率意味着深层 bug（#9378 集群）依赖审阅能力。
- **Tier 4——安静维护：** **IronClaw**——依赖自动化与 WebUI 打磨；稳定但本窗口无增长信号。

成熟度备注：calver 发布列车（OpenClaw 2026.9.x）意味着最高的发布节奏纪律；ZeroClaw（v0.8.x）与 Hermes（v0.21.x）尽管表面积可观，仍处于 1.0 之前。

---

## 7. 趋势信号

1. **发布列车是头号回归来源**——贯穿 OpenClaw、QwenPaw 与 Hermes——推动了对合并前升级回归测试（OpenClaw #141146）以及发布窗口合并冻结（QwenPaw #7603）的采用。*开发者要点：回归测试应针对升级路径，而不仅仅是主干。*
2. **启发式 token 计数已死**——推理模型（`reasoning_content`、effort 级别）暴露了 `bytes/4` 风格估算与硬编码上下文回退导致误报溢出的 bug（Hermes、QwenPaw）。压缩必须由供应商上报的实际用量驱动。
3. **提示缓存经济学正成为面向用户的功能**（可配置 TTL、断点放置、裁剪感知的历史）——ZeroClaw 领先；随着 Anthropic 缓存行为演进，预计其他项目将跟进。
4. **持久化会话记录是信任原语：** 智能体轮次的丢失、重复或消失是横跨四个项目最常见的 critical bug。崩溃/被杀轮次边界上的恰好一次持久化应是架构性要求，而非补丁。
5. **无值守执行需要结果回报：**"发送假成功"、缺失的 cron 结果以及缺失的挂钟超时（ZeroClaw #10685、Hermes #105188）表明运营者尚不能信任智能体单独运行。
6. **Windows 在本应是跨平台的品类中长期被低估**——一个持久的差异化机会。
7. **记忆正在变得可插拔**（QwenPaw 的后端插件、Hermes 的 Honcho、OpenClaw 的 dreaming）——记忆即插件正在成为新兴的接口标准。

**结论：** OpenClaw 在规模与集成广度上仍是生态的参考实现，但本周期其优势正被回归债务以及同侪更系统化解决的同类事件循环/持久化问题所侵蚀。ZeroClaw 与 Hermes 分别在信任/成本与前沿模型速度上提供了最具可信度的替代选择。

---

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-08

## 1. 今日概览

Hermes Agent 保持高开发节奏,过去 24 小时内更新了 **50 个 issue 和 50 个 PR**,显示维护周期非常活跃。关闭率保持健康,issue 为 38%(19/50),PR 为 36%(18/50),但未发布新版本,说明团队正处于版本迭代之间的稳定阶段。改动广泛分布于整个技术栈 —— 智能体运行时、桌面应用、网关、CLI、cron、认证/凭证池以及服务商集成 —— 多项高优先级(P1/P2)缺陷与功能开发同步推进。由维护者发起的"集中修复行动"(#104868)涵盖 15 个实施轨道上的 51 个 issue,标志着在被动修 bug 之外,还进行了有组织的清理工作。

**活动评估:高迭代 / 中等健康度** —— 大量中小型修复,但桌面更新流程和消息持久化方面出现了若干令人担忧的回归,值得在发版时重点关注。

---

## 2. 版本发布

**过去 24 小时内无新版本发布。** 尽管合并了大量代码,团队尚未发布带标签的版本。通常应纳入发布的关键已合入工作包括 Poolside 服务商修复(#58374、#58367)、捷克语本地化(#56521、#104670)、GPT-6 Astra Responses 契约(#103016)以及多项 cron/CLI/认证改进 —— 暗示版本可能即将发布,或者团队在等待"集中修复行动"完成。

---

## 3. 项目进展

### 已合并/已关闭的 PR(重要项)
- **[#103016](https://github.com/NousResearch/hermes-agent/pull/103016)** — 落地 GPT-6 Astra 模型的账户门控及 Responses 契约(主跟踪单 [#103015](https://github.com/NousResearch/hermes-agent/issues/103015))。
- **[#56521](https://github.com/NousResearch/hermes-agent/pull/56521)** / [#104670](https://github.com/NousResearch/hermes-agent/pull/104670)** — 在 CLI、Web 仪表盘和 Electron 桌面应用中完成捷克语(cs)本地化,已 rebase 到最新 main。
- **[#58374](https://github.com/NousResearch/hermes-agent/pull/58374)** / [#58367](https://github.com/NousResearch/hermes-agent/pull/58367)** — Poolside(Laguna)成为一等服务商,实现整数型 `finish_reason` 与 `tool_call.id` 规范化。
- **[#104572](https://github.com/NousResearch/hermes-agent/pull/104572)** — cron 调度器的禁用任务创建改为原子操作(关闭创建与暂停之间的竞态窗口)。
- **[#104637](https://github.com/NousResearch/hermes-agent/pull/104637)** / [#104638](https://github.com/NousResearch/hermes-agent/pull/104638)** / [#104634](https://github.com/NousResearch/hermes-agent/pull/104634)** / [#104635](https://github.com/NousResearch/hermes-agent/pull/104635)** — 凭证池改进:`request_count` 现在在所有策略下累加;`auth priority` / `auth refresh` / `auth reset` 新增针对性的子命令。
- **[#104693](https://github.com/NousResearch/hermes-agent/issues/104693)** — Honcho 自动回忆不再为上一条用户消息注入结果(混合模式修复)。
- **[#104782](https://github.com/NousResearch/hermes-agent/issues/104782)** — `kanban_complete` 在 `handle_max_iterations` 的无工具摘要中不再不可达(消除了误触发的熔断计数)。
- **[#103556](https://github.com/NousResearch/hermes-agent/issues/103556)** — GPT-6 Astra `MAX` 推理等级在 `openai-codex` 上不再被静默压至 `xhigh`。
- **[#104711](https://github.com/NousResearch/hermes-agent/issues/104711)** — 修复了因列表型 `reasoning_content` 导致的流式崩溃(Grok / OpenAI 兼容中继)。
- **[#104448](https://github.com/NousResearch/hermes-agent/issues/104448)** — 重试更新成功后,陈旧的 `latest.json` 集群重启告警已被替换。

### 推进中的开放 PR
- **[#105197](https://github.com/NousResearch/hermes-agent/pull/105197)** — 主机失联后 Bot 模式群聊恢复(针对 [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) 的草案实现)。
- **[#105203](https://github.com/NousResearch/hermes-agent/pull/105203)** — 当桌面渲染器 chunk 不是合法 ESM 时,显式报错(应对 #105184 白屏回归)。
- **[#105200](https://github.com/NousResearch/hermes-agent/pull/105200)** — Telegram 网关在最终消息落地时删除已废弃的流式预览。
- **[#105199](https://github.com/NousResearch/hermes-agent/pull/105199)** — `todo_list` 改名后桌面任务面板正常工作;子代理进度在 `display.tool_progress: off` 下仍能保留。
- **[#105201](https://github.com/NousResearch/hermes-agent/pull/105201)** — 桌面档案编辑器说明为何缺失 `SOUL.md`。
- **[#92437](https://github.com/NousResearch/hermes-agent/pull/92437)** — Claude Code 风格的 ask/allow/deny 审批规则(长期用户诉求)。
- **[#104687](https://github.com/NousResearch/hermes-agent/pull/104687)** — Windows 桌面更新保留所有权并自动重启。

---

## 4. 社区热门话题

| 项目 | 类型 | 评论数 | 背后诉求 |
|---|---|---|---|
| [#66616](https://github.com/NousResearch/hermes-agent/issues/66616) | 缺陷(自动化) | 173 | **Skills 索引新鲜度看门狗** —— 索引已 29.8 小时未更新,超过 26 小时上限,阻塞 Skills Hub。是一项长期存在的基建信号,说明重建 cron(UTC 6/18)不可靠。 |
| [#97681](https://github.com/NousResearch/hermes-agent/issues/97681) | 功能 | 27 | **多设备 Bot 群聊连续性** —— 用户希望群对话不依赖单一主机,从而能在笔记本 / 家用服务器 / VPS 之间切换而不丢失上下文。 |
| [#80246](https://github.com/NousResearch/hermes-agent/issues/80246) | 缺陷(已关闭) | 9 | **Token 估算忽略 `reasoning_content`** —— DeepSeek/Kimi 长思考会话触发误报"上下文溢出",因为 Web UI 漏算。凸显按服务商实际用量计费的必要性。 |
| [#103015](https://github.com/NousResearch/hermes-agent/issues/103015) | 功能跟踪单 | 6 | **GPT-6 Astra 落地** —— 大范围跨模块集成,涉及服务商原生异步工具、引导、努力度缓存变更、压缩。 |
| [#100437](https://github.com/NousResearch/hermes-agent/issues/100437) | 缺陷 | 5 | **v0.21.0 cron 回归** —— agent 类型 cron 任务忽略模型钉选,且 Ollama 64K 上下文门控失败。暗示发布链路存在故障,需要小版本修复。 |
| [#46332](https://github.com/NousResearch/hermes-agent/issues/46332) | 缺陷(Windows) | 5 | **`shutil.which("bash")` 优先解析到 WSL 而非 Git Bash** —— Windows 原生 cron 运行 `.sh` 脚本失败;MSYS 还会吞掉反斜杠。 |

**分析:** 两大话题(Skills 索引看门狗、多设备群聊)代表了截然不同层面的痛点 —— 基建新鲜度 vs. 用户侧韧性。两者都需要专门的工程 owner 跟进,而不是临时打补丁。

---

## 5. 缺陷与稳定性

### 严重 / P1
- **[#104653](https://github.com/NousResearch/hermes-agent/issues/104653)** — **入站用户消息被重复持久化两次**(网关 + agent flush),出现在 Telegram/网关会话中,一行带 `platform_message_id`,另一行为 NULL。历史回放时每条用户消息显示两次。尚无修复 PR。**当前最严重的开放缺陷。**

### 高 / P2
- **[#105184](https://github.com/NousResearch/hermes-agent/issues/105184)** — **桌面应用内更新发布损坏的渲染器包** → 出现 `Uncaught SyntaxError` 白屏。构建仍报告成功。修复 PR [#105203](https://github.com/NousResearch/hermes-agent/pull/105203) 已开放。
- **[#105145](https://github.com/NousResearch/hermes-agent/issues/105145)** — **Windows 桌面驱动 `hermes update` 始终报告 FAILED(exit 8)**,尽管更新实际成功;更新后验证解析到了错误的工作目录。修复 PR [#104687](https://github.com/NousResearch/hermes-agent/pull/104687) 已开放。
- **[#105176](https://github.com/NousResearch/hermes-agent/issues/105176)** — **桌面引导消息回显到错误的会话窗口**(会话/状态不匹配)。尚无 PR。
- **[#105202](https://github.com/NousResearch/hermes-agent/issues/105202)** — **委派的子代理继承 `HERMES_KANBAN_TASK`**,可对父任务执行 `kanban_complete`,导致工作区被过早删除。既有所有权守卫失效。尚无 PR。
- **[#105189](https://github.com/NousResearch/hermes-agent/issues/105189)** — **工具调用中途流式断开,残缺参数被替换为 `{}` 并派发出去** —— 对有副作用的工具非常危险。尚无 PR。
- **[#100437](https://github.com/NousResearch/hermes-agent/issues/100437)** — v0.21.0 cron agent 任务忽略模型钉选;Ollama 64K 上下文门控失败。尚无 PR。
- **[#46332](https://github.com/NousResearch/hermes-agent/issues/46332)** — Windows cron `.sh` 脚本失败(WSL 与 Git Bash 优先级冲突)。尚无 PR。
- **[#94486](https://github.com/NousResearch/hermes-agent/issues/94486)** — **会话中途切换模型会丢失下一条用户提示**(消息交替修复 + 缺失 `row_id`)。尚无 PR。
- **[#104505](https://github.com/NousResearch/hermes-agent/issues/104505)** — **Nous Portal 订阅代理阻止 `/v1/responses`**,即使上游支持;Codex CLI 在 Nous 订阅下不可用。尚无 PR。

### 中等 / P3
- **[#104693](https://github.com/NousResearch/hermes-agent/issues/104693)**(已关闭) — Honcho 回忆注入了上一条消息的上下文。
- **[#105052](https://github.com/NousResearch/hermes-agent/issues/105052)**(已关闭) — 桌面聊天输入框中途失焦。
- **[#96219](https://github.com/NousResearch/hermes-agent/issues/96219)** — 窗口失焦时动画冻结(UX 回归)。
- **[#104653](https://github.com/NousResearch/hermes-agent/issues/104653)** 与若干会话状态报告存在重叠。

**严重度排序:** P1 #104653 > 桌面更新损坏链(#105184 + #105145)> #105202 / #105189 / #105176(状态/委派安全)> 服务商回归(#100437、#104505)> Windows 易用性(#46332)。

---

## 6. 功能请求与路线图信号

### 强信号(很可能进入下一版本)
- **[#97681](https://github.com/NousResearch/hermes-agent/issues/97681) Bot 群聊连续性** —— PR [#105197](https://github.com/NousResearch/hermes-agent/pull/105197) 草案实现已进入评审。
- **[#92437](https://github.com/NousResearch/hermes-agent/pull/92437) Claude Code 风格 ask/allow/deny** —— 长期未合并的 PR,显然存在很高的精细化审批需求。
- **GPT-6 Astra 基线支持**([#103015](https://github.com/NousResearch/hermes-agent/issues/103015) / #103016) —— 部分已落地,跟踪单仍开放,等待服务商原生异步/引导/努力度缓存等模块。

### 中等信号
- **[#96219](https://github.com/NousResearch/hermes-agent/issues/96219)** — 提供窗口失焦时仍运行动画的选项(低成本,体验提升明显)。
- **[#105188](https://github.com/NousResearch/hermes-agent/issues/105188)** — 对"推进中的智能体轮次"施加挂钟时间上限(安全性诉求)。
- **[#104462](https://github.com/NousResearch/hermes-agent/issues/104462)** — Token 计量重构:每次压缩决策都基于服务商真实用量,而不是 `bytes/4`。由维护者 Teknium 强力主导。
- **[#105204](https://github.com/NousResearch/hermes-agent/pull/105204)** — 在 API 客户端投影中暴露 `unread` 标志(改动小,但与会话 UX 一致)。

### 较低优先级 / 探索性
- 除捷克语外的更多语言环境(暂无其他 PR,但模式暗示 i18n 将持续扩展)。
- Poolside 成为一等服务商([#58374](https://github.com/NousResearch/hermes-agent/pull/58374) 已关闭 —— 可能以"first-class provider"特性开关的形式上线)。

---

## 7. 用户反馈摘要

### 痛点(反复出现的主题)
1. **Windows 桌面更新流程脆弱** —— 多份缺陷报告(#105145、#105184、#46332、#104687)描述应用内静默损坏更新包、解析到错误工作目录、或选错 `bash`。用户普遍认为 Linux/Mac 体验扎实,但 Windows 像后娘养的。
2. **v0.21.0 之后的 cron / 调度回归** —— 模型钉选被忽略、本地 Ollama 回退失效、kanban 任务被过早关闭(#100437、#105202、#104782)。用户明确指出"在升级到 v0.21.0 之后"。
3. **推理模型的上下文处理** —— DeepSeek/Kimi/XAI 用户(#80246、#104711)遭遇误判溢出和流式崩溃,原因是 Hermes 假定 `reasoning_content` 是字符串,忽略其 token 开销。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-08

## 1. 今日概览

IronClaw 在过去 24 小时内呈现出中等强度的维护性活动，**1 个 issue** 和 **13 个 PR** 有更新，无新版本发布。PR 构成以**自动化的依赖升级**为主（13 个中占 5 个），以及由 `italic-jinxin` 提交的一批协调一致的 **WebUI 打磨工作**（4 个 PR），主要面向命令结果卡片、斜杠命令菜单和键盘导航。功能层面的修复在助手层（Slack 共享通道消歧）和 MCP 通道（响应泄漏诊断分类）上有所推进。整体项目健康状况看起来稳定——属于稳定的例行维护，而非被动的应急处理——但每日失败分类 issue 暴露了 `officeqa` 中持续存在的模型质量回归问题。

## 2. 版本发布

**过去 24 小时内无新版本发布。** 未报告任何版本标签。

## 3. 项目进展

今日关闭/合并了 3 个 PR，全部为常规依赖更新：

| PR | 标题 | 类型 |
|---|---|---|
| [#8049](https://github.com/nearai/ironclaw/pull/8049) | chore(deps): bump the everything-else group (19 Rust updates, e.g. `uuid` 1.24.0→1.26.0, `base64` 0.22.1→0.23.1, `toml`) | Deps (已关闭) |
| [#7835](https://github.com/nearai/ironclaw/pull/7835) | chore(deps): bump the actions group (5 GitHub Actions updates incl. `actions/setup-node` 4.0.2→7.0.0) | CI/Deps (已关闭) |
| [#7020](https://github.com/nearai/ironclaw/pull/7020) | chore(deps): bump tokio-tungstenite 0.29.0→0.30.0 (tokio-ecosystem) | Deps (已关闭) |

这些 PR 完成了一波 Rust 生态更新以及 Actions 工具链升级；今日未合并面向用户的功能性变更。

## 4. 社区热议话题

今日条目互动量较低（所有列出条目均为 0 反应/评论），但以下话题在运维层面具有实际意义：

- **[Issue #8081 — 每日 ironclaw 失败分类 — 2026-09-07](https://github.com/nearai/ironclaw/issues/8081)**（开放中）。这是基准测试失败的每日重复分类。今日的统计显示 **`officeqa` 中有 42 个未通过用例**，被描述为"绝大多数为真实的模型质量数值错误"，归因于 **DeepSeek-V4-Flash**。底层需求：对模型回归的持续可见性，以及用于分类测试套件的结构化失败分类法。
- **[PR #8077 — fix(mcp): 对响应泄漏诊断进行分类](https://github.com/nearai/ironclaw/pull/8077)**（开放中，关闭 [#8009](https://github.com/nearai/ironclaw/issues/8009)）。将 `response_leak_blocked` 哨兵值集中到 `ironclaw_host_api::http`，并让 MCP 通道区分宿主机屏蔽与 MCP 可见的原因——这表明运维人员对安全相关屏蔽决策的可见性正在被优先提升。
- **[PR #8076 — fix(assistant): 区分断开的共享通道](https://github.com/nearai/ironclaw/pull/8076)**（开放中）。解决 Slack 适配器中"已配对但已断开"与"从未配对"通道之间的歧义，表明社区对更清晰的配对状态用户体验存在诉求。

## 5. 缺陷与稳定性

| 严重程度 | 条目 | 状态 | 备注 |
|---|---|---|---|
| 中 | [PR #8077 — MCP 响应泄漏诊断分类](https://github.com/nearai/ironclaw/pull/8077) | 修复已提出（关闭 #8009） | 宿主机泄漏屏蔽过度合并了原因；MCP 现公开了不同的分类。与安全相关。 |
| 中 | [PR #8076 — 断开共享通道的消歧](https://github.com/nearai/ironclaw/pull/8076) | 修复已提出 | 可能导致用户在已配对通道上重复尝试配对；引导文案及 Slack 能力文档已更新。 |
| 低 | [PR #8071 — 命令结果卡片高度塌陷](https://github.com/nearai/ironclaw/pull/8071) | 修复已提出 (XS) | 对话记录弹性布局列中的回归。 |
| 低 | [PR #8070 — 斜杠命令元数据对齐](https://github.com/nearai/ironclaw/pull/8070) | 修复已提出 (XS) | 变宽行破坏了响应式网格；已添加窄视口截断。 |
| 低 | [PR #8069 — 命令结果卡片缺少关闭操作](https://github.com/nearai/ironclaw/pull/8069) | 修复已提出 (M) | 可访问性缺陷；通过 `Chat`→`MessageList`→`MessageBubble` 串联回调。 |
| 低 | [PR #8068 — 活动斜杠命令未保持在滚动视口中](https://github.com/nearai/ironclaw/pull/8068) | 修复已提出 (S) | 键盘导航 UX 回归。 |

**模型质量信号（非代码层面）：** [#8081](https://github.com/nearai/ironclaw/issues/8081) 标记出 **DeepSeek-V4-Flash** 在 `officeqa` 上系统性的数值失败。非代码缺陷，但对依赖该模型的下游用户而言是可靠性隐患。

## 6. 功能请求与路线图信号

今日未提出明确的功能请求 issue。但已合并 PR 的方向暗示了近期主题：

- **WebUI 命令结果人体工学**：由 `italic-jinxin` 提交的 4 个 PR（[#8068](https://github.com/nearai/ironclaw/pull/8068)、[#8069](https://github.com/nearai/ironclaw/pull/8069)、[#8070](https://github.com/nearai/ironclaw/pull/8070)、[#8071](https://github.com/nearai/ironclaw/pull/8071)）共同交付了关闭操作、滚动区域控制、响应式对齐和键盘导航打磨。有可能进入下一版本

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目简报 — 2026-09-08

## 1. 今日概览

过去 24 小时内，QwenPaw 有 41 个 issue 和 48 个 PR 更新，呈现出**高活跃度、高缺陷密度**的一天，不过期间并未发布新版本。社区信号以 **v2.2.0 回归报告**为主导——尤其集中在上下文/记忆处理、工作目录 UX 以及流式超时可配置性上——与此同时，围绕记忆后端正掀起一轮活跃的重构浪潮（ReMe 0.4.1.12 准备工作、ADBPG/PowerContext 插件迁移、OpenViking 集成）。维护者的产出节奏依然健康：今日合并/关闭了 5 个 PR（包括工具参数强制转换修复、侧边栏图标统一、控制台测试覆盖率 +5pp、CI 发布窗口冻结以及一次记忆生命周期重构），另有 30 个 PR 处于待审查状态。**项目整体健康度：活跃但明显承压**，仍有若干处于开放状态的关键级别缺陷（上下文丢失循环、心跳反馈堆积）尚未获得修复。

## 2. 版本发布

**过去 24 小时内没有新版本发布。**

各 issue 中被引用的最新版本为 **v2.2.0**（PyInstaller 打包的桌面后端）。同一时间窗口内出现了多份“2.1.0 → 2.2.0 回归”报告（工作目录选择器、LLM 流式空闲超时被硬编码、上下文丢失缺陷）。如果这些问题集中指向同一次发布，维护者或许应考虑发布 **v2.2.1 补丁**，或整理一套成文的临时解决方案。

## 3. 项目进展

**已合并/已关闭的 PR（共 5 个）：**

| PR | 领域 | 影响 |
|---|---|---|
| [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) — fix(providers): coerce string-typed tool args | 提供方 / MCP | 解决了 [#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839)。对于在 `type: string` schema 字段中输出未加引号数字的模型（如 `"assetInfo": 1.000001`），现会在 jsonschema 校验之前先行强制转换，消除了一整类 MCP 工具调用失败。 |
| [#7499](https://github.com/agentscope-ai/QwenPaw/pull/7499) — unify nav and theme-toggle icons | 控制台 UI | 将三个偏离风格系列的侧边栏图标对齐到 Spark 细线系列，修复了 #7376 中的视觉不一致问题。 |
| [#7530](https://github.com/agentscope-ai/QwenPaw/pull/7530) — console unit tests +245 cases | 测试基础设施 | 语句覆盖率 +5.02pp；持续推进的前端覆盖率攻坚的第四个冲刺。 |
| [#7603](https://github.com/agentscope-ai/QwenPaw/pull/7603) — ci: freeze default-branch merges during releases | 发布基础设施 | 防止 v2.2.0-beta.4 事故重演：当时发布流水线仍在运行，#7267 却被合并进了 `main`。产物已做 SHA 锁定（这点是正确的），新策略则在发布窗口期间强制冻结合并。 |
| [#7561](https://github.com/agentscope-ai/QwenPaw/pull/7561) — refactor(memory): unify automatic memory lifecycle and actions | 记忆核心 | **破坏性重构。** 以统一的自动记忆生命周期（捕获 / 回忆 / 后台执行 / 可选后端动作）取代原先基于摘要的捕获方式。与 [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616)（ADBPG + PowerContext → 插件）配套进行。 |

## 4. 社区热门话题

**按评论量排名（过去 24 小时）：**

1. **[#7505](https://github.com/agentscope-ai/QwenPaw/issues/7505) — 局域网 LLM 客户端频繁断连（12 条评论，已关闭）**
   今日讨论度最高的一条。QwenPaw 在局域网中连接 LM Studio 会频繁触发客户端断连 → 重试风暴 → 最终超时。深层需求：**对长时间运行的局域网 LLM 流的优雅处理**，以及可配置的重试预算。该 issue 已关闭但未见注明代码修复；使用类似拓扑的用户仍会受到影响。

2. **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — 模型“忘记”自己刚发出的回复（5 条评论，开放中，高严重级别）**
   已持久化的助手回复在后续请求中消失 → 空响应和工具调用循环。与 [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584)（已作为重复项关闭）根因相同。多名用户报告完全相同的症状 → **这是 v2.2.0 中系统性的上下文持久化缺陷**，而非孤立个案。

3. **[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) — 任务运行期间发送新消息返回 409（5 条评论，开放中）**
   用户期望消息进入队列排队，API 却返回 `409 {"detail":"A task is already running..."}`。这直接推动了 [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610)——将聊天提交路由到 localStorage 队列中，等待后端空闲后再发送。社区在 UX 上已形成强烈共识：这是错误的默认行为。

4. **[#6820](https://github.com/agentscope-ai/QwenPaw/issues/6820) — 前端 UI 在任务完成前不显示模型输出（5 条评论，已关闭）**
   后端其实正在流式传输，但直到运行结束才渲染出来。与 [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) 的症状相呼应（用户先看到“毫无动静”，随后输出涌来）。

5. **[#6839](https://github.com/agentscope-ai/QwenPaw/issues/6839) — MCP 工具参数强制转换（4 条评论，已通过 [#6936](https://github.com/agentscope-ai/QwenPaw/pull/6936) 关闭）**
   本统计窗口内 issue→PR 顺利闭环的一个好例子。

**深层需求模式：** 用户希望 QwenPaw 在以下场景中行为可预期：长时间运行的流；任务期间的用户并发输入；以及助手自身刚刚生成的模型输出。其中“上下文丢失”问题簇最令人担忧，因为它既高频又无声（不会抛出任何可见错误）。

## 5. 缺陷与稳定性

按严重程度 × 用户影响排序。修复可用性已注明。

| 严重程度 | 问题 | 状态 | 修复 PR？ |
|---|---|---|---|
| 🔴 关键 | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) / [#7584](https://github.com/agentscope-ai/QwenPaw/issues/7584) — 助手回复从上下文中丢失，导致工具调用循环和“ai 行为错乱” | 开放中（重复项已关闭） | 暂无。**最高优先修复候选。** |
| 🔴 关键 | [#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) — 心跳 cron 会话反馈回路导致 agent 约 2 小时无响应 | 开放中 | 暂无 |
| 🟠 高 | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — 同步调用在启动时阻塞事件循环 118–135 秒，每条消息阻塞 126 秒；超时从不触发 | 开放中（自 08-27 起） | 暂无 |
| 🟠 高 | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — 工具返回的图像/PDF 以裸 base64（`type: data`）形式传入，触发 400 “file must have file_id or file_data” | 开放中 | 暂无 |
| 🟠 高 | [#7576](https://github.com/agentscope-ai/QwenPaw/issues/7576) — `RetryChatModel` 硬编码 32768 兜底值，迫使所有模型在 31130 tokens 时被判为 CONTEXT_UNFIT | 开放中 | 暂无 |
| 🟠 高 | [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617) — 工具结果中的 PDF DataBlock 会使纯文本的 OpenAI 兼容端点永久失效（Zhipu GLM 错误码 1210） | 开放中 | 暂无 |
| 🟠 高 | [#6541](https://github.com/agentscope-ai/QwenPaw/issues/6541) — 滚动压缩以 `role=user` 注入 `[context compressed]` → 在 DeepSeek 上引发 MODEL_EXECUTION_ERROR | 开放中（自 07-29 起） | 暂无 |
| 🟠 高 | [#7587](https://github.com/agentscope-ai/QwenPaw/issues/7587) — OpenAI 兼容提供方连接 WUSRouter 时遭遇 Cloudflare 403（managed challenge） | 开放中 | 暂无 |
| 🟡 中 | [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) — 任务运行期间发新消息返回 409 | 开放中 | [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) 审查中 |
| 🟡 中 | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) — 停止按钮显示已停止但任务仍在运行 | 开放中 | 暂无 |
| 🟡 中 | [#7572](https://github.com/agentscope-ai/QwenPaw/issues/7572) — 工具分发 `_drain()` 吞掉异常堆栈（仅将 `str(exc)` 返回给模型） | 开放中 | [#7578](https://github.com/agentscope-ai/QwenPaw/pull/7578) 审查中（首次贡献者） |
| 🟡 中 | [#7513](https://github.com/agentscope-ai/QwenPaw/issues/7513) — DeepSeek-v4-pro 的输出与 QwenPaw 工具调用交错混杂（markdown 混排） | 开放中 | 暂无 |
| 🟡 中 | [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585) — Telegram 渠道将 markdown 表格的 `|` 和 `---` 按字面字符渲染 | 开放中 | 暂无 |
| 🟢 低 | [#7604](https://github.com/agentscope-ai/QwenPaw/issues/7604) — LLM 流式空闲超时（30 秒）被硬编码，v2.2.0 中无法通过 WebUI/envs.json 配置 | 已关闭 | 暴露 envs.json 中的设置项后大概率可解决 |
| 🟢 低 | [#7099](https://github.com/agentscope-ai/QwenPaw/issues/7099) — 深色模式下渠道标签无法辨认（LESS 选择器缺陷） | 已关闭 | 未注明 |
| 🟢 低 | [#7006](https://github.com/agentscope-ai/QwenPaw/issues/7006) — 右上角下拉菜单与设置齿轮入口的语言选项列表不一致 | 已关闭 | 未注明 |
| 🟢 低 | [#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594) — 单个任务的输出在一小时内重复出现 3 次（web 端） | 已关闭 | 未注明 |

**模式：** 今日高严重级别缺陷中，占比异常高的部分集中于**上下文持久化、工具参数的 schema 强制转换以及事件循环阻塞**。前 5 位关键/高严重问题均尚无已发布的修复 PR。

## 6. 功能请求与路线图信号

**有望进入 v2.2.1 / v2.3.0 的候选**（多名用户、反复出现的抱怨、修复 PR 已在推进中）：

| 信号 | Issue / PR | 为何可能很快落地 |
|---|---|---|
| 侧边栏 + 设置重设计 | [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) — feat(console): redesign sidebar and settings experience | 由维护者一侧贡献者提交的开放 PR；解决 [#7588](https://github.com/agentscope-ai/QwenPaw/issues/7588) 和 [#7601](https://github.com/agentscope-ai/QwenPaw/issues/7601)（工作目录 UX 回归） |
| 排队而非 409 | [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) — fix(console): prevent chat submissions from bypassing the queue | 直接解决 [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) |
| Reranker 配置界面 | [#6399](https://github.com/agentscope-ai/QwenPaw/pull/6399) — feat: reranker UI panel in ReMeLightMemoryCard | 自 07-23 起处于 Under Review，慢速通道 |
| 插件管理器更新流程 | [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) — fix/issue 7582 plugin manager | 更新检测 + 按插件更新 / “Update All” |
| 技能版本 + 依赖校验 | [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) — feat(skills): expose versions and validate declared deps | 弥合 [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) 暴露的缺口（agent “忘记”项目布局约定） |
| OpenViking 长期记忆后端 | [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) | 首次贡献者，REST 范围源自 #7252 |
|

---

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-08

## 1. 今日概览

ZeroClaw 处于密集的稳定化与架构收敛阶段。过去 24 小时内虽无新版本发布，但项目记录了 **26 条 issue 更新**（23 条仍开放，3 条已关闭）和 **50 条 PR 更新**（49 条仍开放，1 条已合并/关闭），并新增了用于"可靠代理交付与定时任务结果回报"（#10685）和"启动加载器与发布目标注册表"（#10684）的实施批次追踪 issue。当前工作聚焦于三大方向：ACP/ZeroCode 会话回合持久化、Anthropic 提示缓存策略优化、运行时与会话所有权加固。整体活跃度很高 —— 在 v0.8.5 分支（#9459）持续推进 triage 的同时，前瞻性的安全、缓存与 MCP 启动设计也在并行展开。

## 2. 发布

过去 24 小时无新版本发布。v0.8.5 稳定性追踪 issue（#9459）仍是当前活跃的发布线，采用每周切版的策略，一旦工作就绪即随版本发布，不再等待所有里程碑项完成。

## 3. 项目进展

过去 24 小时仅 **合并/关闭了 1 个 PR**，但代码层面的活动量依然可观：

- **#10649 — `fix(ci): allow PR size label updates`** — 为 PR 体积打标工作流授予 `pull-requests: write` 权限，并移除了多余的 `issues: write` 作用域。虽小但重要的 CI 卫生修复，为后续自动化扫清障碍。
- **已关闭的 Issue（3 个）：**#8720（通过配置开关 Bedrock Nova 2 Lite 的 `cachePoint`）、#9575（通过 `/models` 预热 OpenAI 兼容连接）、#10572（WeCom/企业微信渠道文档）。

合并/开放 PR 的比率约 2%，反映出多数提交工作仍处于评审中或等待作者响应；开放堆栈由 **size:XL** 级别的架构重构主导（例如 #10621、#10407、#10381、#10591、#9584、#9739）—— 通常这类工作需要超过一轮评审周期。

## 4. 社区热议话题

参与度最高的帖子是一条支持类 issue，而非 Bug：

- **[Issue #8720](https://github.com/zeroclaw-labs/zeroclaw/issues/8720)** — *通过配置关闭 Bedrock Nova 2 Lite 的 cachePoint* — **12 条评论**，在社区围绕配置展开讨论后于今日关闭。背后的诉求：用户需要按 provider/模型粒度的运行时缓存行为覆盖能力，而非仅依赖全局开关。
- **[Issue #10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)** — *Quickstart 应用配置时守护进程栈溢出* — **6 条评论**。工作流阻塞级严重度；记录了一次 Tokio worker 在配置热重载过程中的崩溃。
- **[Issue #9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333)** — *会话切换后失败的 ACP 回合消失* — **4 条评论**。该帖衍生出了多个相关工作：#10121、#10659、#10673 —— 它是 ZeroCode Code 面板最典型的用户影响类 Bug。
- **[Issue #10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408)** — *同一会话中第二条消息触发的并行运行* — **3 条评论**。会引发重复工作的 Bug，已在真实用户场景中触发。
- **[Issue #10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121)** — *进程退出时部分 ACP 回合丢失* — **3 条评论**。数据丢失级严重度。
- **[Issue #9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)** — *定时任务缺少挂钟超时* — **3 条评论**。长期存在的可靠性问题。
- **[Issue #9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575)** — *通过 `/models` 预热 OpenAI 兼容连接* — **3 条评论**，今日关闭。健康的反馈闭环：社区指出冗余的预热路径，PR 随即跟进。

**底层诉求：**用户希望运行时在并发会话之间、以及回合边界发生崩溃时，仍能保持行为可预测。围绕 ACP/Code 面板持久化的议题集合（#9333、#10121、#10659、#10673、#10667）是本周最突出的 UX 主题。

## 5. Bug 与稳定性

按用户影响与严重度排序：

| 严重度 | Issue | 组件 | 修复状态 |
|---|---|---|---|
| **S0 — 数据丢失** | [#10121](https://github.com/zeroclaw-labs/zeroclaw/issues/10121) 退出时部分 ACP 回合丢失 | ZeroCode/TUI | 相关工作：#9378（开放，`needs-author-action`） |
| **S1 — 工作流阻塞** | [#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230) Quickstart 时守护进程栈溢出 | Daemon/Tokio | 无对应 PR |
| **S1 — 工作流阻塞** | [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) 会话切换后失败的 ACP 回合消失 | channel:acp | #9378 提供部分修复；#10673 处理剩余部分 |
| **S1 — 工作流阻塞** | [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) 定时任务缺少挂钟超时 | runtime/daemon | 无修复 PR |
| **S1 — 工作流阻塞** | [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659) 超预算的 Code 回合丢失进度 | ZeroCode/TUI | 无修复 PR |
| **S1 — 工作流阻塞** | [#10670](https://github.com/zeroclaw-labs/zeroclaw/issues/10670) `heartbeat.target` 拒绝复合 channel key | runtime/daemon | 无修复 PR |
| **S2 — 性能降级** | [#10408](https://github.com/zeroclaw-labs/zeroclaw/issues/10408) 第二条消息触发并行代理运行 | runtime/daemon | 无修复 PR |
| **S2 — 性能降级** | [#9940](https://github.com/zeroclaw-labs/zeroclaw/issues/9940) 定时任务投递渠道无法解析 | runtime/daemon | 无修复 PR |
| **S2 — 性能降级** | [#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115) 工具结果截断在日志中不可见 | runtime/daemon | 无修复 PR |
| **S2 — 性能降级** | [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) Telegram TTS 丢弃以 `[` 开头的回复 | channel/telegram | 无修复 PR |
| **S2 — 性能降级** | [#10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688) WhatsApp Web 从不转写语音消息 | channel/whatsapp | 无修复 PR |
| **S2 — 性能降级** | [#10667](https://github.com/zeroclaw-labs/zeroclaw/issues/10667) ZeroCode 重复流式响应 | ZeroCode/TUI | 无修复 PR |
| **S2 — 安全/成本** | [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) OAuth 系统前缀缓存标记空间过小 | provider:anthropic | 无修复 PR |
| **S3 — 次要** | [#10104](https://github.com/zeroclaw-labs/zeroclaw/issues/10104) `zeroclaw-hardware` lib 的测试在 CI 中从未运行 | tooling/ci | 无修复 PR |

**规律：**S1 级 Bug 的数量超过了对应的修复 PR。唯一一个 ACP 持久化修复 PR（#9378，标记为 `needs-author-action`、`stale-candidate`）已成为多项最高严重度报告的瓶颈。健康度评估：**稳定性风险处于高位**；周度 v0.8.5 切版在持续吸纳工作，但最深层的 Bug 仍在等待维护者对 XL 级 PR 的评审。

## 6. 功能请求与路线图信号

过去 24 小时新增的功能请求集中在提示缓存、配置化与可观测性方向：

- **[#10663](https://github.com/zeroclaw-labs/zeroclaw/issues/10663)** — *为 Anthropic 标记（原生 + passthrough）配置 1 小时提示缓存 TTL* — Anthropic 现已支持可配置 TTL；用户希望摆脱默认 5 分钟的惩罚成本。
- **[#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660)** — *在前一回合最后一条消息上设置第三个缓存断点* — 两标记方案正让缓存收益白白流失；作者提议引入三个断点。
- **[#10606](https://github.com/zeroclaw-labs/zeroclaw/issues/10606)** — *对未鉴权 `/health` 中的组件错误进行清洗* — 安全导向：当前网关的健康端点会原样泄露任意组件的 `last_error` 字符串。
- **[#10665](https://github.com/zeroclaw-labs/zeroclaw/issues/10665)** — *将 ZeroCode 的每面板会话上限设为可配置* — 当前硬编码为 8。
- **[#10674](https://github.com/zeroclaw-labs/zeroclaw/issues/10674)** — *历史截断在上限处停止，破坏了提示缓存* — 虽然未标为 enhancement，但描述实质上是修复请求。

**路线图信号：**新开启的追踪 issue [#10685](https://github.com/zeroclaw-labs/zeroclaw/issues/10685)（"可靠代理交付与定时任务结果回报"）聚合了四项独立修复 —— 误报发送成功、重复回复、定时任务结果缺失、投递渠道 —— 表明下一批 v0.8.6 或 v0.9.0 将聚焦于运维可信任性。追踪 issue [#10684](https://github.com/zeroclaw-labs/zeroclaw/issues/10684) 将规范化的发布目标注册表（#10590）与 MCP 启动加载器（#10591）打包在一起，指向下一个将 ZeroClaw 作为 MCP 可安装目标暴露的版本。**下一版本最可能包含的预测：**可配置的 Anthropic 缓存 TTL（#10663）、清洗后的健康响应（#10606）、具备缓存感知的历史截断（#10674），以及至少一项来自 #9378 的 ACP 持久化修复。

## 7. 用户反馈汇总

今日流量中反复出现的真实世界痛点：

- **ACP / ZeroCode Code 面板十分脆弱。**五个独立 issue（#9333、#10121、#10659、#10667、#10673）描述了回合丢失的场景 —— 失败、取消、超预算、被进程杀死 —— 同一套丢失模式分类反复出现。用户希望即使在守护进程崩溃时，也能获得持久且可重放的会话记录。
- **定时任务静默不可靠。**#9191（无超时）、#9940（投递渠道解析错误），以及新追踪 issue #10685 明确指出"误报发送成功"与"重复回复"。运维者反馈他们无法判断无人值守的工作是否真正执行、或是否送达预期接收方。
- **并发规范不足。**#10408（第二条消息触发并行运行）和 #10670（heartbeat target 拒绝多实例 channel key）表明用户确实会同时运行多个实例和聊天面板；而系统当前将其视为配置错误，而非正常用例。
- **提供方侧的实际怪癖。**Bedrock Nova 2 Lite 的 cachePoint（#8720）、ElevenLabs v3 音频标签被 Telegram 误判为 Markdown（#10689）、WhatsApp Web 完全没有转写接线（#10688）—— 提供方生态不断在生产环境中暴露边界场景。
- **配置化优于魔法默认值。**已关闭的 #8720 与新增的 #10663 / #10665 / #10606 共享同一主题：用户希望显式的开关（TTL、会话上限、清洗策略），而非隐式的默认行为。
- **满意度信号：**#8720 与 #9575 凭借具体配置开关迅速关闭，#10572 企微文档任务同日关闭，表明在 Bug 边界清晰时，维护者循环响应迅速。不满情绪主要集中在尚无对应 PR 的大型架构性 Bug 上。

## 8. 待办关注

以下高影响项因开放时间过长或携带维护者行动标签，值得重点关注：

- **[PR #9378](https://github.com/zeroclaw-labs/zeroclaw/pull/9378)** — `fix(acp): persist failed and cancelled turn transcripts` — size:XL，标记为 `needs-author-action` 与 `stale-candidate`。该 PR 是至少四个开放 issue（#9333、#10121、#10659、#10673）的关键缺失环节。它一旦停滞，整组 ACP 持久化工作都会受阻。
- **[PR #10381](https://github.com/zeroclaw-labs/zeroclaw/pull/10381)** — `fix(security): resolve host launchers before workspace cwd` — size:XL，`needs

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*