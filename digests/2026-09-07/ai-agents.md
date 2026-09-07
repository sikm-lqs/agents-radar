# OpenClaw 生态日报 2026-09-07

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-07 01:16 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告



---

## 横向生态对比



---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-07

## 1. 今日概览

Hermes Agent 今日**维护活动非常活跃**,24 小时内更新了 50 个 issue 和 50 个 PR,但没有新版本发布——这是修复不断累积、等待下一个标签版本的典型模式。50 个 issue 中仅有 2 个被关闭(均为 P2 bug),50 个 PR 中有 3 个被关闭(其中一个是 Discord 清理功能的重复 PR)。新工作的主体集中在**会话状态正确性**(重复持久化、推理重复计数、MCP 工具丢失)、**网关投递完整性**(Discord 附件 404、回复上下文过时)以及 **Desktop/TUI 回归**(光标消失、WAL 抖动)。今日出现两个 P1 bug:ACP 提供的 MCP 工具在模型请求中被丢弃,以及 Windows + npm-Codex 启动失败——两者目前都尚未合并修复。

## 2. 版本发布

过去 24 小时无新版本发布。issue 中引用的最新标签版本仍为 v0.21.0(在 [#104453](https://github.com/NousResearch/hermes-agent/issues/104453)、[#104666](https://github.com/NousResearch/hermes-agent/issues/104666) 中引用),该版本本身就是今日两个 P1 回归(systemd 249 cron 故障、Windows Codex 启动)的根源。

## 3. 项目进展

**今日合并/关闭:**

- **PR #104600**(作为重复关闭):Discord `delete_message`,以便 `cleanup_progress` 在 Discord 上可用——已被 PR [#42661](https://github.com/NousResearch/hermes-agent/pull/42661) 取代,后者仍处于开启状态,处理相同的适配器层修复。
- **PR #99398**(作为重复关闭):预检估算器对 `reasoning` 重复计费,使上下文膨胀约 42%——被标记为现有压缩循环修复工作的重复。
- **PR #70328**(作为重复关闭):压缩触发器中采用固定 1500 token 的图像定价——作为重复关闭;同样的以视觉为主的 64K 上下文压缩修复似乎在其他地方已合并。

**值得关注的功能推进型开放 PR:**

- **[#104673](https://github.com/NousResearch/hermes-agent/pull/104673) (P1)** — 修复 [#104653](https://github.com/NousResearch/hermes-agent/issues/104653):Telegram 上入站用户对话被持久化两次(网关 + agent flush)。关键的数据完整性修复。
- **[#104669](https://github.com/NousResearch/hermes-agent/pull/104669)** — 修复 [#104652](https://github.com/NousResearch/hermes-agent/issues/104652):在 Telegram/Discord/Signal 网关上渲染回复上下文锚点年龄。
- **[#104646](https://github.com/NousResearch/hermes-agent/pull/104646)** — 当压缩失败冷却已生效时,抑制多余的 `turnhold_deferred` 通知。
- **[#104677](https://github.com/NousResearch/hermes-agent/pull/104677)** — 限制长生命周期进程中每个会话的批量序数(#104187 的后续),防止无会话父节点上内部字典无界增长。
- **[#104676](https://github.com/NousResearch/hermes-agent/pull/104676)** — Desktop 后台窗口在 `preview.act.request`/`tour.request` 上保持静默,防止多窗口会话中的首次响应竞态。
- **[#104283](https://github.com/NousResearch/hermes-agent/pull/104283)** — 集群重启逻辑:在没有网关 PID 存活时,不再声明"无需重启",而是实际启动挂起单元(此前的标记被过早清除)。
- **[#104121](https://github.com/NousResearch/hermes-agent/pull/104121)** — 传递 ClawHub `?owner=` 提示,避免多所有者 slug 模糊时返回 409。
- **[#104112](https://github.com/NousResearch/hermes-agent/pull/104112)** — 将 `brotlicffi` 从 1.2.0.1 升级到 1.2.0.2,修复分块 brotli 流解码器的回归。
- **[#103665](https://github.com/NousResearch/hermes-agent/pull/103665)** — 在托管房间驱动中托管一个常驻 WAL keeper,使仪表板轮询循环不再从对等网关下删除 shm 代次。
- **[#104672](https://github.com/NousResearch/hermes-agent/pull/104672)** — Desktop "添加到聊天" 选区批注操作,带有独立的批注区域和源 URL。
- **[#104668](https://github.com/NousResearch/hermes-agent/pull/104668)** — 新增有界的 `engineering-evidence` 插件,将 HEAD/test/learning 凭证接入现有 Hermes agent。
- **[#101420](https://github.com/NousResearch/hermes-agent/pull/101420)** — 跨操作系统安装/更新 E2E 矩阵(Windows/macOS/Linux)。
- **[#102765](https://github.com/NousResearch/hermes-agent/pull/102765)** — 统一包管理器(干净谱系):winrt 依赖、wheel 修复、CLI/gateway/desktop/Docker/插件准入的上游合并。
- **[#70093](https://github.com/NousResearch/hermes-agent/pull/70093) (security)** — 跨流边界保留 WhatsApp/Signal/WeCom 的原始密钥候选,防止凭据片段发布到其原始令牌上下文之外。

## 4. 社区热点话题

1. **[#66616 — Skills 索引陈旧或降级(29.8 小时未更新,限制 26 小时)](https://github.com/NousResearch/hermes-agent/issues/66616)** — 169 条评论,遥遥领先。这是一个自动化的 `skills-index-watchdog` 探针失败:统一的 skills 索引在 6/18 UTC cron 上未被重建,因为 deploy-site 工作流似乎已成为实际的重建路径。该主题帖是一个元 bug,其解决需要恢复 cron 路径或更新 watchdog 的真实来源期望。底层需求:**站点构建管线的可观测性与归属清晰度**。

2. **[#97681 — Bot 群聊应在 Desktop 关闭后继续工作](https://github.com/NousResearch/hermes-agent/issues/97681)** — 25 条评论。功能请求:将群聊生命周期与运行中的 Desktop 实例解耦,使异构硬件(笔记本/家用服务器/VPS)上的 bot 在桌面关闭后仍能存活。底层需求:**多 bot 工作流的服务连续性**,特别是对将 Hermes 视为分布式运行时而非单机应用的用户。

3. **[#73327 — 可定制的 cron 响应包装模板](https://github.com/NousResearch/hermes-agent/issues/73327)** — 6 条评论,3 👍。`cron/scheduler.py` 中硬编码的 "Cronjob Response: {task_name} (job_id: ...)" 头/尾部是本地化/UX 痛点;用户希望自定义其投递包装模板。底层需求:**定时任务输出的国际化与展示控制**。

## 5. Bug 与稳定性

### P1(最高严重度,今日无合并修复)

- **[#42719 — ACP 提供的 MCP 工具已注册但从模型请求中丢弃](https://github.com/NousResearch/hermes-agent/issues/42719)**(自 2026-06-09 起)。工具在注册和 chat-completions 网络请求之间消失。无关联 PR。**核心协议路径上长期未处理的 P1。**
- **[#104653 — 入站用户对话被持久化两次(网关 + agent flush)](https://github.com/NousResearch/hermes-agent/issues/104653)**(2026-09-07)。已有修复 PR:[#104673](https://github.com/NousResearch/hermes-agent/pull/104673)。
- **[#104442 — 回合内 `/steer` 文本从未持久化,75–85% 提示缓存未命中](https://github.com/NousResearch/hermes-agent/issues/104442)**(2026-09-06)。`apply_pending_steer_to_tool_results` 写入非持久化字段;用户指令在重新水合时丢失。无 PR。
- **[#104453 — systemd 249(Ubuntu 22.04)上重启安全的 cron 调度已坏](https://github.com/NousResearch/hermes-agent/issues/104453)**(2026-09-06)。v0.21.0 回归:`OOMPolicy=kill` 在 transient scope 上被拒绝,**所有** cron 任务中断。无 PR。
- **[#104653 — Telegram 上的重复持久化**,见上。

### P2(重要)

- **[#100302 — Desktop DOM 规范化器移除 Chromium 的活动光标节点](https://github.com/NousResearch/hermes-agent/issues/100302)**(2026-09-01)。输入中途停止;contenteditable 保持聚焦但无法接收输入。无 PR。
- **[#104357 — Discord cron 附件 404(未知频道)](https://github.com/NousResearch/hermes-agent/issues/104357)**(2026-09-06)。文本可投递,媒体静默丢失。无 PR。
- **[#104176 — 继承的 `ContextCompressor._generate_summary` 重写在 `bypass_cooldown` 上失效](https://github.com/NousResearch/hermes-agent/issues/104176)**(2026-09-06)。第三方引擎在新签名上崩溃。无 PR。
- **[#100836 — `hermes doctor --fix` 将自身检测为活动写入者;泄漏的 COUNT(*) 连接](https://github.com/NousResearch/hermes-agent/issues/100836)**(2026-09-02)。修复工具拒绝修复空闲 DB。无 PR。
- **[#104622 — `resolve_anthropic_token()` 在 Hermes 池之前借用 Claude Code 登录,将 Claude Code 登出](https://github.com/NousResearch/hermes-agent/issues/104622)**(2026-09-06)。共享机器上的认证边界违规。无 PR。
- **[#94921 — Ghostty 上 Shift+letter 泄漏原始 `ESC[27;2;<cp>~`](https://github.com/NousResearch/hermes-agent/issues/94921)**(2026-08-25)。#87630 的回归;`modifyOtherKeys=2` 路径将字面 ANSI 插入到提示符中。无 PR。
- **[#104666 — Windows 上使用 npm 安装的 Codex 时 `codex_app_server` 永不启动](https://github.com/NousResearch/hermes-agent/issues/104666)**(2026-09-07)。Windows 启动忽略 PATHEXT。无 PR。P1。

### P3(较低严重度)

- **[#104641 — hermes-talk 以两条错误的错误信息拒绝有效的 OpenAI 密钥](https://github.com/NousResearch/hermes-agent/issues/104641)**(2026-09-07)。
- **[#104603 — Desktop 无法解析本地 llama.cpp 的函数调用钩子](https://github.com/NousResearch/hermes-agent/issues/104603)**(2026-09-06)。原始 JSON 文本出现而非已解析的工具调用。
- **[#45125 — 仪表板每次打开标签页时因 React 错误 #520 而崩溃](https://github.com/NousResearch/hermes-agent/issues/45125)**(自 2026-06-12 起,仍开放,反复出现)。
- **[#104591 — 启动更新检查生成交互式 ssh 主机密钥提示,劫持 CLI 输入](https://github.com/NousResearch/hermes-agent/issues/104591)**(2026-09-06)。`GIT_CONFIG_GLOBAL=/dev/null` 不匹配导致 `/dev/tty` 保持开启。
- **[#104637 — 凭据池 `request_count` 仅在 `least_used` 下递增](https://github.com/NousResearch/hermes-agent/issues/104637)**(2026-09-06)。`fill_first` 下指标饥饿。

**模式**:今日的 bug 画像由**会话状态与投递路径正确性**主导——这类问题不会剧烈崩溃,而是悄无声息地损坏或丢失数据。

## 6. 功能请求与路线图信号

最受关注且有进展的主题(👍、评论或配套 PR):

1. **网关 ↔ Desktop 解耦** — [#97681](https://github.com/NousResearch/hermes-agent/issues/97681)。强烈的 v0.22 架构转变信号:bot 作为独立守护进程,Desktop UI 可选。
2. **Cron 模板定制** — [#73327](https://github.com/NousResearch/hermes-agent/issues/73327)(3 👍)。可能与 cron 配置重构一同落地。
3. **凭据池人体工学** — 24 小时内由 `0xble` 同时提出的三个近乎同步的请求 [#104636](https://github.com/NousResearch/hermes-agent/issues/104636)、[#104637](https://github.com/NousResearch/hermes-agent/issues/104637)、[#104638](https://github.com/NousResearch/hermes-agent/issues/104638)。**可能的下个版本**:`hermes auth list/remove` 获得条目 ID 显示;`request_count` 跟踪在策略间归一化;`hermes auth add --priority` 允许用户显式排序 fill_first。
4. **Cron 中原子化的已禁用任务创建** — [#104572](https://github.com/NousResearch/hermes-agent/issues/104572)。范围紧密的 API 新增,极有可能落地。
5. **按 profile 作用域加载 `AGENTS.md`** — [#104640](https://github.com/NousResearch/hermes-agent/issues/104640)。一旦提示构建器因任何原因被触及,很可能落地。
6. **插件来源 / 已认证上下文** — [#69882](https://github.com/NousResearch/hermes-agent/issues/69882)。插件安全故事;与 #70093 密钥保留工作结合,预示更广泛的插件信任模型即将到来。
7. **Desktop 中的选区批注** — 已存在 PR [#104672](https://github.com/NousResearch/hermes-agent/pull/104672),低风险 UX 改进。

**下个版本的可能内容**(v0.21.1 或 v0.22):
- P1 bug 修复:重复对话持久化(#104673)、systemd 249 上的重启安全 cron、ACP/MCP 丢弃(#42719)、Windows Codex 启动(#104666)。
- 一组 cron 相关修复(Discord 附件、回复上下文年龄、终端包装)。
- brotlicffi 升级(#104112)。
- 凭据池 UX 改进。

## 7. 用户反馈摘要

**痛点:**

- **跨平台脆弱性占主导**:Windows Codex 启动(#104666)、Windows TUI npm PATH(#104092)、systemd 249 cron(#104453)、Ubuntu 22.04 与较新 systemd 的差异。在非 macOS 主机上运行 Hermes 的用户报告持续不断的平台特定回归。
- **遥测/可观测性债务**:watchdog issue #66616 本质上是"谁负责此重建"的问题——重建路径已悄然迁移到 deploy-site,但 watchdog 从未被告知。
- **认证边界混乱**:Anthropic 令牌解析窃取 Claude Code 的 OAuth(#104622);凭据池优先级不可见(#104637/#104638/#104636);Talk 产品错误处理有效密钥(#104641)。共享或多租户机器上的用户感受到这种摩擦。
- **持久化不透明**:重复写入(#104653)、`/steer` 持久化缺失(#104442)、摘要重写失效(#104176)。当出现问题时,历史记录与用户所言根本对不上。
- **本地模型开发体验粗糙**:Desktop 与 llama.cpp 的工具使用输出原始 JSON(#104603);图像令牌定价固定,破坏 64K 上下文本地工作流(#70328)。
- **仪表板可靠性**:每个标签页上的 React #520 崩溃(#45125)自六月以来一直开放。

**满意度信号**:PR #104668(engineering-evidence 插件)以及流式密钥保留工作(#70093, [security] 标签)的工程质量,表明贡献者社区关心有界的、范围良好的插件界面——这是 bug 流的正面对冲。

## 8. 待办关注

最需要维护者关注的 issue 和 PR,按年龄 × 严重度排序:

1. **[#42719 (P1)](https://github.com/NousResearch/hermes-agent/issues/42719)** — 模型请求中 ACP/MCP 工具被丢弃。自 **2026-06-09**(约 3 个月)开放。核心协议正确性;无关联 PR。
2. **[#45125 (P3)](https://github.com/NousResearch/hermes-agent/issues/45125)** — 每个标签页上的仪表板 React #520 崩溃。自 **2026-06-12** 开放。影响所有平台的首次运行体验。
3. **[#44963 (P3)](https://github.com/NousResearch/hermes-agent/issues/44963)** — 内存写入网关审批应明确且分阶段。自 **2026-06-12** 开放。内存写入的安全/UX 问题。
4. **[#426

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目简报 — 2026-09-07

## 1. 今日概览

过去 24 小时内的项目活跃度偏低,且以自动化依赖维护为主,而非社区驱动的开发工作。所有 9 个更新的 PR 都在过去一天内被触及,但其中 7 个是 Dependabot 的依赖升级(Rust crates 与 GitHub Actions),只有 2 个是人类贡献者提交的实质性代码变更。没有 issue 被创建、评论或关闭,也没有发布新的版本。总体信号表明 IronClaw 处于维护/依赖整理阶段,有两项针对性的 bug 修复并行推进。

## 2. 版本发布

过去 24 小时内没有新版本发布。本节略。

## 3. 项目进展

今日共有 3 个 PR 被合并/关闭,均为 Dependabot 的依赖更新,无功能性代码变更:

- **[#8049](https://github.com/nearai/ironclaw/pull/8049)** — 已关闭。升级了 `everything-else` Rust 依赖组,共 19 项更新(uuid 1.24.0 → 1.26.0、base64 0.22.1 → 0.23.1、toml 等)。低风险。
- **[#7835](https://github.com/nearai/ironclaw/pull/7835)** — 已关闭。升级了 GitHub Actions 组,共 5 项更新(含 `anthropics/claude-code-action` 1.0.183 → 1.0.210 以及 `actions/setup-node` 4.0.2 → 7.0.0)。中等风险,原因是 `setup-node` 跨大版本升级。
- **[#7020](https://github.com/nearai/ironclaw/pull/7020)** — 已关闭。将 `tokio-tungstenite` 从 0.29.0 升级到 0.30.0。低风险,单包更新。

今日没有功能类 PR 落地。

## 4. 社区热议话题

按常规指标(评论数或表情反应),**没有热议话题**。今日涉及的所有 PR 评论数与点赞数均为 0,这要么说明评审流程静默,要么说明当前活跃主要由自动化触发,不会产生讨论。最有可能吸引评审关注的两项人类贡献者 PR 是:

- **[#8077](https://github.com/nearai/ironclaw/pull/8077)** — `fix(mcp): classify response leak diagnostics`(作者:linhongyu510)——关闭 issue #8009(在当前数据中不可见),并引入了一个共享的 `response_leak_blocked` 哨兵值。这表明围绕 MCP 出站诊断仍存在悬而未决的问题,一直在等待修复。
- **[#8076](https://github.com/nearai/ironclaw/pull/8076)** — `fix(assistant): distinguish disconnected shared channels`(作者:be-student)——优化了 Slack 共享频道在"已断开"与"未配对"状态下的呈现方式,并在产品、适配器以及 OpenAI 兼容接口之间保持拒绝分类的一致性。表明助手的 Slack 集成正在进行 UX 正确性方面的工作。

## 5. Bug 与稳定性

有两项 bug 修复 PR 处于开放状态,等待评审:

| 严重程度 | PR | 涉及模块 | 描述 | 修复状态 |
|---|---|---|---|---|
| 中 | [#8077](https://github.com/nearai/ironclaw/pull/8077) | MCP / host API | 响应泄漏诊断可能将"host leak blocked"与 MCP 可见的错误原因混为一谈,从而削弱安全信号。该 PR 集中提供 `response_leak_blocked` 哨兵,并在 MCP 通道中正确分类。 | 开放,等待合并;关闭 #8009。 |
| 中 | [#8076](https://github.com/nearai/ironclaw/pull/8076) | Assistant / Slack | 已配对用户的"已断开的共享频道"未能与"未配对账号"区分开来,导致拒绝提示具有误导性。新增频道级指引,并在产品、适配器以及 OpenAI 兼容接口间统一分类;同步更新了 Slack 能力描述。 | 开放,等待评审。 |

过去 24 小时内没有报告崩溃、回归或安全事件。两个待处理 bug 均属正确性/UX 类别,而非稳定性类别,且各自都有具体的修复 PR 在推进中。

## 6. 功能请求与路线图信号

从过去 24 小时的数据中**无法得出新的功能请求或路线图信号**。开放的与有更新的 issue 均为零,仅有的非 dependabot PR 都是 bug 修复。要提取路线图信号,维护者需要将目光投向 24 小时窗口之外(例如之前已合并的功能、里程碑,或在今日未更新的开放 issue 中的讨论)。当前数据不足以支撑近期的版本预测。

## 7. 用户反馈摘要

**过去 24 小时内无可用的用户反馈数据。** 没有 issue 被创建或评论,所有 PR 的评论数/反应数均为 0。两项人类贡献者 PR(#8077、#8076)均为贡献者主动提交的 bug 修复,而非对公开用户报告的响应。本次快照中不存在任何来自终端用户的满意度/不满信号。

## 8. 待办积压观察

以下条目仍处于开放状态,且近期没有活动或评审关注:

- **[#7834](https://github.com/nearai/ironclaw/pull/7834)** — `chore(deps): bump the wasm group`(wasmtime、wasmtime-wasi、wit-component、wit-parser)。**自 2026-08-23 起开放,已停滞约 15 天。** 规模为 L,中等风险,贡献者经验较丰富。wasm 工具链是 IronClaw 沙箱化方案的重要支撑面,放任其停滞会增加与上游 `bytecodealliance` 的漂移。建议维护者优先评审,或给出后续计划后关闭。
- **[#8078](https://github.com/nearai/ironclaw/pull/8078)** — Dependabot 升级 `tokio-ecosystem` 组(tower-http 0.7.0 → 0.7.1、tokio-tungstenite)。于 2026-09-06 创建,尚未分流。
- **[#8079](https://github.com/nearai/ironclaw/pull/8079)** — Dependabot 升级 GitHub Actions 组,共 6 项更新,其中包含 `actions/setup-node` 的大版本升级(4.0.2 → 7.0.0)。于 2026-09-06 创建,尚未分流。CI 动作的大版本升级历来是本批中风险最高的项。
- **[#8080](https://github.com/nearai/ironclaw/pull/8080)** — Dependabot `everything-else` 组,共 21 项 Rust 更新(uuid、base64、rust_decimal 等)。于 2026-09-06 创建。可能是刚刚关闭的 #8049 的后续,可能需要合并或关闭以避免重复 churn。

**建议维护者重点关注:** #7834(停滞时间最长)与 #8079(CI action 的大版本升级,回归风险最高)。

---

*本快照基于 `nearai/ironclaw` 的 GitHub 活动生成,覆盖截至 2026-09-07 的 24 小时窗口。数据来源:通过 GitHub API 获取的 issue 与 pull request。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>



</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-07

## 1. 今日概览

ZeroClaw 处于**高架构活跃度**状态，过去 24 小时内有 33 个 issue 和 50 个 PR 更新，但未发布新版本。项目正处于深度 RFC/设计阶段，由维护者 @NiuBlibing 和 @Audacity88 主导推进 v0.8.5+ 稳定化主线，并为 v0.9 奠定基础（会话/事件历史、WASM 插件运行时、统一文件/附件架构、网关传输解耦）。目前仍有 44 个 PR 处于开放状态，6 个已关闭/合并，其中包含一组关于 Matrix 渠道转写、CLI 内存工厂和 Discord STT 分发的显著 bug 修复。活跃度画像显示项目健康但维护者负担沉重——许多 XL/L 级别的 PR 阻塞在维护者评审或作者操作环节，且存在一批 P1/S1 级别的稳定性 bug，集中在守护进程启动、预算执行和 Anthropic provider 解析方面，亟需分类处理。

## 2. 发布

过去 24 小时内无新版本发布。当前活跃的稳定化主线在 [#9459 (v0.8.5 有限周度稳定化主线)](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 中追踪，2026 年 8 月 30 日前持续进行每周发版。

## 3. 项目进展

**已关闭/合并的 PR（从顶部活跃列表中可见）：**

- **[#10487](https://github.com/zeroclaw-labs/zeroclaw/pull/10487) — `fix(channels/matrix): resolve transcription providers from live config`（已合并）**，作者 @sebkraemer。修复了一个回归：Matrix 渠道在构造时捕获了 `TranscriptionConfig` 快照，导致类型化的 `[providers.transcription.<type>.<alias>]` 条目从未被注册。
- **[#10650](https://github.com/zeroclaw-labs/zeroclaw/pull/10650) — `ci(channels/matrix): execute every Matrix lib test`（已合并）**，作者 @sebkraemer。修复了 CI 流程，使 `channel-matrix` 库的测试能够真正执行（此前只有单个模块通过过滤步骤运行）。
- **[#10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668) — `fix(ci): scope Windows tests for locale resources`（XS）**，作者 @Audacity88。属于 [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) 中跟踪的更广泛 Windows 语言环境/编码工作的一部分。

**已关闭 issue（3 个）：**
- **[#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575) — 通过 `/models` 预热 OpenAI 兼容连接**（NiuBlibing）。已接受并发布。
- **[#9653](https://github.com/zeroclaw-labs/zeroclaw/issues/9653) — `plugin wasi:http` 信任存储缺口**（ZiBibro）。已关闭，可能通过引用的后续 issue（[#9395](https://github.com/zeroclaw-labs/zeroclaw/issues/9395)、PR #9137）处理。
- **[#10572](https://github.com/zeroclaw-labs/zeroclaw/issues/10572) — 记录 WeCom（企业微信）渠道**（JordanTheJet，`good first issue`）。

**已推进的功能（评审中，尚未合并）：**
- WebSocket 生命周期解耦（[#7759](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)）——在 [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)（ACP 轮次持久化）中跟踪。
- 多会话 ZeroCode 面板（[#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)）——经维护者修复后重新与 master 合并。
- 有界委托文件系统工具现尊重目标自身的工作区（[#10391](https://github.com/zeroclaw-labs/zeroclaw/pull/10391)）。

## 4. 社区热点议题

**最活跃 issue（按评论数排序）：**

1. **[#9487 — RFC：运行时拥有的会话和传输表面适配器（Rev 5）](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)** —— 34 条评论。作者：@NiuBlibing。这是对 Rev 4 的**实质性替换**；原公开投票不延续，需要新的讨论窗口和快照。此处的反复修改表明会话模型是项目最核心的架构争论，维护者需要一个稳定的快照约定。

2. **[#9488 — RFC：会话表面的统一文件和附件架构（Rev 10）](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)** —— 27 条评论。同样处于 **Rev 10**，呈现相同的"投票不延续"模式。表明该领域存在长期反复修改的困扰，提示项目可能需要采纳 [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) 中简化 RFC 投票的提案。

3. **[#6996 — RFC：细粒度沙箱策略——文件系统限制](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)** —— 25 条评论，进行中。是一项高风险 RFC，协调应用层 `SecurityPolicy` 与操作系统级沙箱（Bubblewrap、Landlock、Seatbelt）。自 5 月开放至今，需要维护者收敛共识。

4. **[#7462 — Windows 上 74 个测试失败](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)** —— 19 条评论，P1 进行中。CI Test 任务仅在 Linux 上运行，因此 Windows 的回归被静默忽略。

5. **[#8692 — RFC 和设计 issue 的维护者决策队列](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** —— 15 条评论。一个本身就反映维护者负担问题的追踪 issue。

**潜在诉求：**社区正在发出信号，**RFC 流程本身已过载**——多个高风险架构提案（会话历史 [#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)、WASM 插件 [#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)、沙箱策略、会话表面）争夺相同的评审带宽，且修订不断重置。

## 5. 缺陷与稳定性

**S1 — 工作流阻塞（最高严重级）：**

- **[#10230 — 守护进程启动或重载时可能在 agent 初始化期间溢出](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)**（P1，`r:needs-repro`）。在守护进程运行时从 ZeroCode 应用 Quickstart 配置可能导致 Tokio 运行时工作线程因栈溢出而中止。**尚未关联修复 PR。**
- **[#9421 — 不完整的终端响应可能被报告为成功](https://github.com/zeroclaw-labs/zeroclaw/issues/9421)**（P1，进行中）。provider 可能在没有可信最终答案的情况下结束轮次，但运行时仍呈现成功。**修复 PR：[#9447](https://github.com/zeroclaw-labs/zeroclaw/pull/9447)**，作者 @vrurg（对不完整终端响应进行分类），处于作者操作状态。
- **[#9191 — Cron agent 任务没有挂钟超时](https://github.com/zeroclaw-labs/zeroclaw/issues/9191)**（P1，已接受，进行中）。`run_agent_job` 等待 `agent::run` 时没有外层超时；shell 任务有 120 秒上限。**尚未关联修复 PR。**
- **[#10670 — `heartbeat.target` 拒绝渠道实例复合键](https://github.com/zeroclaw-labs/zeroclaw/issues/10670)**（S1，今日新出现）。**修复 PR：[#10671](https://github.com/zeroclaw-labs/zeroclaw/pull/10671)**，作者 @metalmon——当天即已开启，响应迅速。
- **[#10659 — 预算超限的 Code 轮次在会话恢复后丢失可见进度](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)**（P1，新出现）。运行时在每日成本上限时发出终端失败轮次事件并丢弃未完成的助手文本。可能与下文的成本追踪集群相关。
- **[#10644 — 后台委托结果未绑定到所有者主体](https://github.com/zeroclaw-labs/zeroclaw/issues/10644)**（P1，#10601 的后续）。工作区级 JSON 文件可能在主体间泄漏。

**S2 — 行为降级：**

- **[#7462 — Windows 上 74 个测试失败](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)**（P1，已接受）。多个后续 issue 和 PR 在跟进中（[#10668](https://github.com/zeroclaw-labs/zeroclaw/pull/10668)）。
- **[#10635 — 运行时 profile 成本限额未反映有效全局每日预算](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)**（P1）。profile 报告实际无限，但 agent 轮次仍会在进程级 $10 账本处被拒绝。
- **[#10645 — 成本追踪上下文未传递到委托子循环](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)**（P1）。`check_tool_loop_budget` 对委托返回 `None`。
- **[#10617 — `thinking.display = "updates"` 在 Claude Fable 5.1 上返回 400](https://github.com/zeroclaw-labs/zeroclaw/issues/10617)**（P1）。实时探测将线上枚举值收窄到 `summarized`/`omitted`。
- **[#10302 — ZeroCode Code 面板浏览历史时可能停留在处理状态](https://github.com/zeroclaw-labs/zeroclaw/issues/10302)**（P2，#10141 的后续）。CPU 占用持续升高。
- **[#10662 — OAuth 系统前缀缓存标记低于 Anthropic 缓存最小值](https://github.com/zeroclaw-labs/zeroclaw/issues/10662)**（P2）。浪费了四个缓存断点槽位中的一个。

**稳定性趋势：**主要的缺陷集群集中在**成本/预算执行 + Anthropic provider 语义**——三个相关 P1 issue（#10635、#10645、#10617）加上 [#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659) 和 [#10644](https://github.com/zeroclaw-labs/zeroclaw/issues/10644) 共同指向 profile 级、进程级和委托作用域预算之间的系统性鸿沟。

## 6. 功能请求与路线图信号

**可能的 v0.8.6 / 下一发版候选（小型、低风险、可直接处理）：**

- **[#10426 — 在 Telegram 中显示面向用户的 agent 进度](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)**（P2）。长时间运行的工具看似停滞；可通过流式回执解决。
- **[#10580 — 文档链接检查应能捕获全仓库内的悬空内部链接](https://github.com/zeroclaw-labs/zeroclaw/issues/10580)**（P2，低风险，仅 CI）。廉价的 CI 加固。
- **[#9575](https://github.com/zeroclaw-labs/zeroclaw/issues/9575)（已关闭）** —— `/models` 预热已接受，将在下一版本中发布。

**中期（v0.9 候选，需要 RFC 收敛）：**

- **[#7759 — 将网关 WebSocket 生命周期与 agent 轮次生命周期解耦](https://github.com/zeroclaw-labs/zeroclaw/issues/7759)**（P1，已接受，进行中）。后台轮次执行 + 重连后恢复。PR [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)（ACP 中断轮次持久化）是天然的协同发布项。
- **[#6932 — 将网关 WebSocket 会话持久化为完整对话记录](https://github.com/zeroclaw-labs/zeroclaw/issues/6932)**（P2，已接受）。#7759 的自然后续。
- **[#10531 — 向父级暴露委托子 agent 进度](https://github.com/zeroclaw-labs/zeroclaw/issues/10531)**（P2）。来自后台委托的部分输出和工具回执。
- **[#10356 — AnySearch 网络搜索 provider](https://github.com/zeroclaw-labs/zeroclaw/pull/10356)**（增强，阻塞中）。可选的 `[web_search]` provider，默认无身份验证。

**长期（v0.9 之后架构级）：**

- **运行时拥有的会话及传输适配器**（[#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487)）
- **统一文件/附件架构**（[#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488)）
- **可组合 WASM 插件运行时**（[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)）
- **仅追加的会话事件历史及确定性重放**（[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)）
- **细粒度沙箱策略**（[#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996)）
- **持久化会话提示附件**（[#10407](https://github.com/zeroclaw-labs/zeroclaw/pull/10407)，XL）
- **带 agent 侧栏的多会话 ZeroCode 面板**（[#9739](https://github.com/zeroclaw-labs/zeroclaw/pull/9739)，XL，杰出贡献者）
- **Telegram 安全模型选择器**（[#9997](https://github.com/zeroclaw-labs/zeroclaw/pull/9997)，阻塞，请勿合并）
- **上一轮最后一条消息的第三个缓存断点**（[#10660](https://github.com/zeroclaw-labs/zeroclaw/issues/10660)，Anthropic 缓存）

## 7. 用户反馈摘要

**今日浮现的痛点：**

- **Telegram 长任务时的静默体验**（[#10426](https://github.com/zeroclaw-labs/zeroclaw/issues/10426)）——用户在长时间搜索/工具调用期间感觉 agent 已停滞；渠道没有任何中间信号。
- **Quickstart 重载时守护进程不稳定**（[#10230](https://github.com/zeroclaw-labs/zeroclaw/issues/10230)）——在守护进程运行时应用 Quickstart 是硬性工作流阻塞；CPU 实际会挂起。
- **成本预算意外**（[#10635](https://github.com/zeroclaw-labs/zeroclaw/issues/10635)、[#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)）——**显示的**每日限额与**实际执行的**限额不一致，削弱了预算本应提供的安全保障。
- **预算上限时进度丢失**（[#10659](https://github.com/zeroclaw-labs/zeroclaw/issues/10659)）——失败的轮次会丢弃用户已经看到的助手文本，破坏信任。
- **跨主体委托结果泄漏**（[#106

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*