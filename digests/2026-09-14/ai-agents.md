# OpenClaw 生态日报 2026-09-14

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-14 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目简报 — 2026-09-14

## 1. 今日概览

OpenClaw 在过去 24 小时内展现出异常高的分流处理活跃度——**500 个 issue 与 500 个 PR 被触碰**，表明 2026.9.x 系列正处于活跃的发布稳定化周期。尽管今日没有任何新版本发布，项目仍在处理庞大的积压：同期仍有 296 个 issue 处于打开状态，204 个被关闭。今日浮现的条目中有相当比例为 **P0/P1 发布阻断型回归**，涉及 2026.9.3/9.4 升级路径、Gateway 崩溃循环以及 Codex/MCP 集成问题——这说明项目处于稳定化中期，而非功能冲刺阶段。大量 `clawsweeper:*` 自动化标签反映了成熟的分流工具链，但仍未修复的"钻石龙虾"评级 bug 的密度也意味着不容忽视的技术债。

## 2. 版本发布

**过去 24 小时内无新版本发布。** 当前活跃 issue 中引用到的最新已发布版本为 2026.9.2、2026.9.3 与 2026.9.4；多项高严重度报告表明，2026.9.3 → 2026.9.4 的升级路径在部分平台（Windows、macOS、Linux/arm64、npm 管理安装）上尚未被视为稳定。

## 3. 项目进展

**今日合并/关闭 PR 共 157 个。** 可见窗口内值得关注的已合并/已关闭条目：

- [#141252](https://github.com/openclaw/openclaw/issues/141252) — *已关闭*：2026.9.2 回归 "Reply operation has no active tool authority snapshot"（P1 钻石龙虾，影响消息丢失）。
- [#108435](https://github.com/openclaw/openclaw/issues/108435) — *已关闭*：Gateway 在 2026.7.1 上无法启动（P0）。
- [#88312](https://github.com/openclaw/openclaw/issues/88312) — *已关闭（#84076 的回归）*：Codex app-server 在 2026.5.27 上 turn-completion 卡死（P1 铂金寄居蟹）。
- [#145072](https://github.com/openclaw/openclaw/issues/145072) — *已关闭*：macOS npm 在 "global install swap" 阶段因 launcher 符号链接指纹导致更新失败（P0 钻石龙虾）。
- [#135776](https://github.com/openclaw/openclaw/issues/135776) — *已关闭*：升级后精确锁定的 channel 插件停留在旧版本，导致 Discord 插件加载失败（P0 发布阻断）。
- [#140162](https://github.com/openclaw/openclaw/issues/140162) — *已关闭*：Windows 上 Gateway 重启在 181 秒后杀死启动缓慢的 Gateway（P0）。
- [#76038](https://github.com/openclaw/openclaw/issues/76038) — *已关闭*：卡死的 Session Recovery 双重失败机制（P1）。

**等待维护者评审的开放 PR**（值得关注的高质量、"ready for maintainer look" 状态）：
- [#147941](https://github.com/openclaw/openclaw/pull/147941) — 为 canary readiness 绕过托管代理（P1，修复 [#147860](https://github.com/openclaw/openclaw/issues/147860)）。
- [#145043](https://github.com/openclaw/openclaw/pull/145043) — 防止过期的 Codex 迁移阻塞升级（P1，对应 [#123326](https://github.com/openclaw/openclaw/issues/123326)）。
- [#146913](https://github.com/openclaw/openclaw/pull/146913) — 隔离延迟配置重载上下文（P1）。
- [#145940](https://github.com/openclaw/openclaw/pull/145940) — 在 Gateway 重启后停止终端子代理流程改写（P2）。
- [#110450](https://github.com/openclaw/openclaw/pull/110450) — 限制 memory-core 中的 dreaming markdown 读取（XL，已标记安全边界风险）。
- [#147971](https://github.com/openclaw/openclaw/pull/147971) — 加速重复的 schema 校验（跨领域重构）。

## 4. 社区热点话题

参与度最高的 issue 全部集中在**运行时可靠性与静默失败模式**：

| Issue | 标题 | 评论数 | 评级 | 为何重要 |
|---|---|---|---|---|
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | 工具调用之间的文本泄漏到消息通道 | 40 | 🦞 P1 | 跨通道 UX bug；影响所有消息适配器 |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 未回收的 hook/tool 子进程 / 僵尸进程累积 | 31 | 🦪 P1 | 长时运行的 Gateway 性能衰减；影响 macOS/Linux |
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | 子代理完成结果静默丢失——无重试/通知 | 28 | 🦞 P1 | 多代理编排静默丢弃结果 |
| [#91009](https://github.com/openclaw/openclaw/issues/91009) | Codex PreToolUse 原生 hook 中继导致 Gateway RPC 卡死 | 23 | 🦪 P0 | Codex 集成卡死，每个 hook 进程 ~100% CPU |
| [#88312](https://github.com/openclaw/openclaw/issues/88312) | Codex turn-completion 卡死回归（2026.5.27） | 22 | 🐚 P1 | 已修复 issue 的回归（#84076） |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | 同步持久化在规模化时阻塞 Gateway 事件循环 | 20 | 🦞 P1 | 架构级扩展性问题 |
| [#48788](https://github.com/openclaw/openclaw/issues/48788) | 集中化文件名编码工具（飞书等） | 20 | 🌊 P3 | 非阻断，但覆盖多通道 |
| [#102175](https://github.com/openclaw/openclaw/issues/102175) | 嵌入式 prompt 缓存跨边界失效 | 19 | 🐚 P2 | 嵌入式会话的成本/性能影响 |
| [#144911](https://github.com/openclaw/openclaw/issues/144911) | MCP server 初始化超时导致 Gateway 崩溃 | 15 | 🦞 P1 | 未处理的 rejection 崩溃；待验证状态 |

**社区核心诉求：** 用户希望获得可预测、可观测的代理运行体验。主导主题是*静默失败*——上下文丢失、子代理结果被丢弃、工具文本泄漏到用户通道、升级路径无说明地回滚。可靠性 > 新功能。

## 5. Bug 与稳定性

**P0 / 发布阻断型（开放或近期活跃）：**

- [#144911](https://github.com/openclaw/openclaw/issues/144911) — MCP `initialize` 超时触发 Gateway 未处理 rejection 崩溃（P1 钻石龙虾，**尚未关联修复 PR**）。
- [#146394](https://github.com/openclaw/openclaw/issues/146394) — 更新失败：2026.9.3 上 global-install-failed（linux/arm64，P0 发布阻断）。
- [#145252](https://github.com/openclaw/openclaw/issues/145252) — 2026.9.3/9.4 更新/恢复可靠性追踪 umbrella issue（P0）。
- [#146860](https://github.com/openclaw/openclaw/issues/146860) — Windows：托管更新交接在 `InteractiveToken` 计划任务上卡住（P0 发布阻断）。
- [#145510](https://github.com/openclaw/openclaw/issues/145510) — 更新失败：2026.9.3 → 9.4 上 runtime-verification-failed（Windows x64，P0）。
- [#145192](https://github.com/openclaw/openclaw/issues/145192) — 2026.9.2 → 9.4 托管更新在 candidate-Doctor 阶段失败（macOS，P0）。
- [#123326](https://github.com/openclaw/openclaw/issues/123326) — 多代理 Codex 迁移导致 Gateway 启动崩溃循环（P0 钻石龙虾；候选修复 [#145043](https://github.com/openclaw/openclaw/pull/145043) 评审中）。
- [#125333](https://github.com/openclaw/openclaw/issues/125333) — memory-flush 路径上 `totalTokens` 膨胀；#123065 修复仅覆盖 `api === "cli"`（P0 钻石龙虾；**尚未关联修复 PR**）。
- [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex PreToolUse 中继卡死 Gateway RPC（P0 银贝；**尚未关联修复 PR**）。
- [#143524](https://github.com/openclaw/openclaw/issues/143524) — Agent SQLite WAL 在自动 checkpoint 下仍膨胀至 1.4–2.8 GB（P0 发布阻断，Windows；**尚未关联修复 PR**）。

**P1 值得关注：**

- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 僵尸进程泄漏（尚未关联修复 PR）。
- [#25592](https://github.com/openclaw/openclaw/issues/25592) — 工具调用文本泄漏到通道（尚未关联修复 PR）。
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — Telegram forum bot 上子代理静默丢失（尚未关联修复 PR）。
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — 同步持久化在规模化时阻塞事件循环（通过 #140231/#138984 部分修复，仍标记为钻石龙虾）。
- [#134993](https://github.com/openclaw/openclaw/issues/134993) — 在大型 skill/agent 集群上 Gateway 文件系统发现陷入忙循环（P1 金虾；**尚未关联修复 PR**）。
- [#113701](https://github.com/openclaw/openclaw/issues/113701) — 上下文溢出，压缩无法恢复，会话进入失败循环（P1；**尚未关联修复 PR**）。
- [#104719](https://github.com/openclaw/openclaw/issues/104719) — memory-wiki 穷尽回退忽略工具截止时间（P1 钻石龙虾；已关联 PR）。
- [#101929](https://github.com/openclaw/openclaw/issues/101929) — `context-overflow-midturn-precheck` 将 token 高估 2.3–2.6 倍（P1 钻石龙虾；**尚未关联修复 PR**）。

**模式：** 更新可靠性（npm、macOS launcher、Windows 计划任务、Doctor 运行时验证）与高负载下的 Gateway 稳定性（事件循环卡死、僵尸子进程、SQLite WAL、上下文估算）占据主导。多个高评级 bug 仍未关联 PR——存在维护者关注度的瓶颈。

## 6. 功能请求与路线图信号

具有相当评论参与度的活跃增强/功能请求：

- [#27445](https://github.com/openclaw/openclaw/issues/27445) — *已关闭*：子代理完成路由的 `announceTarget` 选项。可能**在下一个 minor 版本中发布**（已 CLOSED 且有关联 PR）。
- [#48788](https://github.com/openclaw/openclaw/issues/48788) — 集中化多编码 `Content-Disposition` 工具（Shift-JIS、EUC-KR、GB18030）。与即将到来的 channel-adapter 重构 PR（如 [#147971](https://github.com/openclaw/openclaw/pull/147971)）契合度高。
- [#52640](https://github.com/openclaw/openclaw/issues/52640) — 长时运行 channel turn 的持久化任务状态展示面（Discord 优先）。与 [#148014](https://github.com/openclaw/openclaw/pull/148014) 等 PR 中的 web-ui 任务进度工作方向一致。
- [#51028](https://github.com/openclaw/openclaw/issues/51028) — Sessions 面板：按"最后有意义的活动"排序。低成本的 UX 摩擦项。
- [#74077](https://github.com/openclaw/openclaw/issues/74077) — *已关闭*：按会话预览流模式的 `/stream` 斜杠命令（P3；大概率在设计决策后关闭）。

**预计将在下一版本（2026.9.5 或 2026.10.0）中发布：**
- Gateway 事件循环加固（僵尸进程回收、延迟重载上下文隔离 [#146913](https://github.com/openclaw/openclaw/pull/146913)、schema 校验加速 [#147971](https://github.com/openclaw/openclaw/pull/147971)）。
- 子代理完成路由（`announceTarget`）。
- 跨配对设备的自动会话负载均衡 [#148099](https://github.com/openclaw/openclaw/pull/148099)。
- 内存：向量替换开销 [#148201](https://github.com/openclaw/openclaw/pull/148201)，笔记元数据隔离 [#148190](https://github.com/openclaw/openclaw/pull/148190)。

## 7. 用户反馈摘要

**反复出现的痛点（来源于 issue 正文）：**

1. **静默失败是 #1 投诉。** 子代理结果、提示与上下文在没有用户可见通知的情况下消失（#44925、#25592、#144876、#101929）。用户反复要求的是*可观测性*而非*更多功能*。
2. **更新/安装路径脆弱，尤其是跨平台场景。** macOS launcher 指纹/符号链接 bug（#145072）、Windows 计划任务身份交接（#146860）、npm 托管代理失败（#147860）、插件与核心版本错配（#135776）。用户希望获得可预测、可安全回滚的升级路径以及更清晰的诊断输出。
3. **Channel 适配器不一致。** Telegram 轮询 409 冲突（#75852）、Telegram Mini App `/dashboard` 冲突（#142336）、飞书流式卡片不可搜索（#74767）、WhatsApp 事件循环阻塞（#77443）、Mattermost 0xC0000409 崩溃（#71699）、跨用户 Telegram DM 串扰（#77292）。社区呼吁统一的 channel 抽象层。
4. **上下文窗口估算不可靠。** 过度计数（#101929、#125333）与对大体积工具输出处理不足（#113701）都会导致压缩失败与误报溢出。Token 经济性是高级用户的首要关切。
5. **Codex / MCP 集成频繁回归。** 子代理线程绑定检测崩溃（#123326）、PreToolUse 中继卡死（#91009）、app-server turn-completion 卡死回归（#88312）、MCP 初始化超时导致 Gateway 崩溃（#144911）。

**满意度信号：** 成熟的分流自动化（`clawsweeper` 机器人）、响应及时的修完即关行为（#88312 在窗口内关闭）、针对可扩展性的活跃重构（[#147971](https://github.com/openclaw/openclaw/pull/147971)、[#148017](https://github.com/openclaw/openclaw/pull/148017)）。不满主要集中在 2026.9.3/9.4 的更新体验与 Codex 生态。

## 8. 积压监控

近期缺乏维护者关注的高重要性条目：

- [#25592](https://github.com/openclaw/openclaw/issues/25592) — 工具调用文本泄漏（P1 钻石龙虾，40 条评论，创建于 2026-02-24，**无修复 PR**）。已开放近 7 个月。
- [#44925](https://github.com/openclaw/openclaw/issues/44925) — 子代理静默丢失 umbrella（P1 钻石龙虾，28 条评论，自 2026-03-13 起）。
- [#119720](https://github.com/openclaw/openclaw/issues/119720) — 同步持久化在规模化时阻塞事件循环（P1 钻石龙虾，自 2026-08-05 起，已部分修复但仍评为钻石龙虾）。
- [#97616](https://github.com/openclaw/openclaw/issues/97616) — 僵尸子进程泄漏（P1 银贝，31 条评论，自 2026-06-29 起，**无修复 PR**）。
- [#113701](https://github.com/openclaw/openclaw/issues/113701) — 上下文溢出 / 压缩失败循环（P1 银贝，自 2026-07-25 起，**无修复 PR**）。
- [#101929](https://github.com/openclaw/openclaw/issues/101929) — Token 估算器高估 2.3–2.6 倍（P1 钻石龙虾，自 2026-07-08 起，**无修复 PR**）。
- [#125333](https://github.com/openclaw/openclaw/issues/125333) — memory-flush 路径上 `totalTokens` 持续累积（P0 钻石龙虾，自 2026-08-17 起，**无修复 PR**）。
- [#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex hook 中继 CPU 卡死（P0 银贝，自 2026-06-06 起，**无修复 PR**）。
- [#143524](https://github.com/openclaw/openclaw/issues/143524) — SQLite WAL 无界增长（P0 发布阻断，自 2026-09-09 起，**无修复 PR**）。
- [#69208](https://github.com/openclaw/openclaw/issues/69208) — Umbrella：跨通道的 transcript/replay 重复（P1，自 2026-04-20 起，等待维护者产品决策）。
- [#114414](https://github.com/openclaw/openclaw/issues/114414) — 过期 TODO 清理（P3，

---

## 横向生态对比

# 跨项目对比报告：个人 AI 助手 / Agent 开源生态
**日期：2026-09-14 | 涉及项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw**

---

## 1. 生态概览

个人 AI 助手赛道已收敛到一套通用架构——持久化网关/守护进程内核、可插拔的消息渠道适配器、MCP 工具集成、长期记忆子系统——值得注意的是，**五个项目均处于稳定化阶段，过去 24 小时内零版本发布**。整个生态的主导工程主题是"无聊"基础设施的可靠性：升级路径、配置持久化、进程生命周期与内存管理，而非新能力。MCP 已成为通用集成接口，同样也成了通用回归源头，今日每个项目的 Bug 列表上都有它的身影。社区预期已明显从功能速度转向可观测性，以及消除静默失败模式。

---

## 2. 活跃度对比

| 项目 | Issue（24h 触及） | PR（24h 触及） | 关闭/合并 | 发布状态 | 健康度评分 |
|---|---|---|---|---|---|
| **OpenClaw** | 500（关闭 204，开放 296） | 500（合并/关闭 157） | 31% PR 落地率 | 无发布；2026.9.3→9.4 中期稳定中 | 🟡 **6.5/10**——吞吐量无人能及，但存在 10+ 开放 P0 发布阻塞项和数月未修的 P1 |
| **Hermes Agent** | 50（关闭 7） | 50（合并 1） | 2% PR 落地率 | 无发布；落后 v0.21.2 约 472 个 commit | 🟡 **6/10**——技术深度型社区，但存在未解决的密钥泄露集群和一处重开的"已修复"回归 |
| **IronClaw** | 0 | 5 开放，1 关闭 | 仅 1 个依赖 PR | 无发布；窗口期内无 tag | 🟢 **7.5/10**——整洁的卫生度，社区几乎为零；依赖升级存在审查延迟风险 |
| **QwenPaw** | 44（关闭 13） | 50（合并/关闭 13） | 26% PR 落地率 | 无发布；v2.2.0 / v2.2.1-beta.2 线路 | 🟡 **6/10**——最佳修复速度与规模比，但存在严重的 20 GB 内存泄漏和 MCP 升级回归 |
| **ZeroClaw** | 25（关闭 5，开放 20） | 50（关闭 1） | 2% PR 落地率 | 无发布；v0.8.5 后硬化中 | 🟢 **7/10**——治理成熟，推动配置正确性，但有两项开放 S1 无修复 PR |

**关键判读：** OpenClaw 与 QwenPaw 正在积极落地代码；Hermes 与 ZeroClaw 处于评审/决策阶段；IronClaw 处于被动维护。

---

## 3. OpenClaw 的位置

**相比同侪的优势：**
- **规模领先一个数量级。** 每日 500+500 tracker 事件，对比所有同侪均 ≤100；Issue ID 已达约 148k，而 Hermes 约 110k，ZeroClaw 约 10.8k，QwenPaw 约 7.7k，IronClaw 约 8k。热门线程可达 40 条评论（其他项目峰值 6–15）。
- **覆盖面最广：** Discord、Telegram、WhatsApp、飞书、Mattermost 适配器，加上 Codex 集成、Web UI、会话恢复、多设备配对——渠道广度无出其右。
- **最成熟的三分类自动化：** `clawsweeper` 机器人配备结构化严重度分类体系（P0–P3，shellfish 评级）和"修复即关闭"行为（窗口期内关闭 #88312）。

**相比同侪的劣势：**
- **发布质量在当前是同类最差。** 一簇密集的 P0 升级路径故障（#146394、#146860、#145510、#145192、#145072）反衬出 ZeroClaw 对配置写入正确性的系统性中心化修复（PR #10499）以及 IronClaw 清爽的 Bug 列表。
- **维护者注意力瓶颈：** P0 #144911、#125333、#91009、#143524 无修复 PR；#25592 已存续约 7 个月且有 40 条评论。

**技术路线差异：** 以网关为核心的 TypeScript 架构，通过 npm 分发并采用托管升级（Doctor 校验、金丝雀就绪、渠道固定插件）、SQLite 持久化、带"做梦"机制的记忆内核——对比 Hermes 的 Python 插件模型（ContextEngine 钩子、Hindsight 记忆）、IronClaw 的 Rust 宿主 + WASM 沙箱与出站泄露阻断、QwenPaw 桌面优先的产品形态与 Hub 运行时及 ReMe 记忆、ZeroClaw 的 Rust 守护进程与 RFC 治理的配置 schema。

**社区规模：** 以互动量计为全生态最大；Hermes 第二（单报告复现质量最高）；ZeroClaw 规模小但流程密度高；IronClaw 几乎没有可见社区。

---

## 4. 共同技术焦点

| 焦点领域 | 涉及项目 | 具体诉求 |
|---|---|---|
| **MCP 可靠性与恢复** | 全部 5 个 | 初始化超时崩溃处理（OpenClaw #144911）、恢复失败后的连接投毒（ZeroClaw #10807）、升级回归（QwenPaw #7716、#7728）、依赖冲突（Hermes #95855）、诊断分类（IronClaw #8077） |
| **静默失败可观测性** | OpenClaw、QwenPaw、Hermes、ZeroClaw | 子 Agent 结果丢失（OpenClaw #44925）、定时任务吞掉输出（QwenPaw #7709）、插件失败被误报为成功（QwenPaw #7715）、错误仅在 DEBUG 可见（Hermes #109482）、陈旧的服务日志（ZeroClaw #10821） |
| **升级与配置持久化安全** | OpenClaw、Hermes、QwenPaw、ZeroClaw | 跨平台可回滚升级（OpenClaw 整个 P0 集群）、自动暂存清扫运行中状态（Hermes #110668）、会话中途 LLM 配置消失（QwenPaw #7708/#7724）、写入即校验语义（ZeroClaw #10320/#10837） |
| **记忆子系统稳定性** | OpenClaw、QwenPaw、Hermes | 运行时增长 20.7 GB（QwenPaw #7222/#7722）、SQLite WAL 膨胀（OpenClaw #143524）、Hindsight 守护进程重启（Hermes #107324） |
| **子 Agent 编排** | OpenClaw、QwenPaw、Hermes | 静默结果丢失（OpenClaw）、Windows 上子进程超时（QwenPaw #7678）、247 技能画像中的 chatloop（Hermes #45983） |
| **Token 计量与压缩** | OpenClaw、ZeroClaw、QwenPaw、Hermes | 估算器 2.3–2.6× 过量计数（OpenClaw #101929）、按窗口比例锚定的压缩（ZeroClaw PR #9535）、prompt-cache 透传（ZeroClaw #10623）、分层长上下文定价（Hermes #110793） |
| **Agent 与宿主安全边界** | Hermes、IronClaw、QwenPaw、ZeroClaw | 配置转储中的密钥脱敏（Hermes #84106/#110758）、出站泄露阻断（IronClaw）、受策略守护的破坏性命令（QwenPaw #7757） |

---

## 5. 差异化分析

| 项目 | 功能重心 | 目标用户 | 架构 |
|---|---|---|---|
| **OpenClaw** | 多渠道消息助手，Codex/MCP 集成，多设备 | 在多聊天平台上自托管助手的进阶用户 | TS 网关 + npm 分发，广泛的渠道适配层 |
| **Hermes Agent** | 插件/记忆生态、Provider 广度（OpenRouter、Z.AI、Codex Responses）、CLI/Desktop/网关 | 安全意识强的家庭实验室运维者、插件作者 | Python，ContextEngine 扩展模型，多 profile |
| **IronClaw** | 宿主沙箱化、出站泄露防护、MCP 诊断 | 嵌入 Agent 宿主的运行时/基础设施构建者 | Rust 宿主 API + WASM/wasmtime 沙箱——比同侪更底层的栈 |
| **QwenPaw** | 终端用户产品：桌面应用、Docker、Hub 运行时、ReMe 记忆、Daily Paper、技能市场 | 桌面优先、技术含量较少的终端用户 | 桌面应用 + 后端服务，venv/运行时对齐工作 |
| **ZeroClaw** | 配置正确性、治理/RFC 流程、A2A 协议、边缘网格、prompt-cache 经济性 | 运维者与协议导向的爱好者 | Rust 守护进程 + 网关，schema 校验的配置权威 |

**最鲜明的对比：** IronClaw 走基础设施（沙箱/宿主加固）路线，而其余四家在助手应用层竞争；ZeroClaw 是唯一一个将**流程资本**（RFC 改革）作为产品特性持续投入的项目。

---

## 6. 社区动能与成熟度

- **第一梯队——海量规模、中等危机式稳定化：** **OpenClaw**。全生态最高速度，但 2026.9.3/9.4 升级故障说明规模已跑赢发布工程。快速迭代伴生累积技术债。
- **第二梯队——活跃迭代：** **QwenPaw** 当日落地 13 个 PR、关闭 13 个 Issue——拥有最高的*相对*修复吞吐——但正在 v2.2.x 线路上为严重的内存泄漏与 MCP 回归暴露付出代价。
- **第二梯队——深度型但分诊繁重：** **Hermes Agent** 正在清理陈旧报告（关闭/合并比 7:1），同时一个体量庞大的未评审修复队列在逾期未发的 0.21.3+ 之前不断堆积。
- **第三梯队——审慎稳定化：** **ZeroClaw**——RFC 改革、发布效率追踪、配置写入加固，信号表明项目正从功能阶段过渡到持续维护阶段。
- **第四梯队——安静维护：** **IronClaw**——健康的 dependabot 节奏、一个进行中的实质性 PR、零有机社区信号。风险在于巴士因子与 PR 审查延迟，而非代码质量。

---

## 7. 趋势信号

1. **MCP 可靠性已成基本盘。** 五个项目在同一个 24 小时窗口内全部命中 MCP 故障——初始化崩溃、连接投毒、升级破坏、依赖错位。*开发者价值：* 在新增 MCP 功能之前，先投入初始化超时、抗投毒的恢复机制以及 IronClaw 式的错误分类（#8077 是参考范式）。
2. **可观测性胜过功能。** 各地参与度最高的线程都是静默失败，而非缺失能力（OpenClaw #44925、QwenPaw #7709）。用户明确要求可见的任务状态和诚实的错误报告——这是一个耐用的产品差异化点。
3. **升级安全是一种留存机制。** 升级路径破坏是整个生态的头号 P0 来源（OpenClaw、Hermes、QwenPaw）。原子化配置写入（ZeroClaw #10499/#10822）和状态保留式升级（Hermes #110668）应被视为信任基础设施。
4. **记忆系统正处从差异化到负债的拐点。** 每个记忆丰富的项目本周都报告了泄漏、索引失同步或静默回顾回滚。预期下一周期将出现一波记忆子系统硬化发布。
5. **Agent 与宿主安全边界是下一个战场。** 经 Agent 可读配置的密钥泄露（Hermes）、出站泄露阻断（IronClaw）、受策略守护的工具（QwenPaw）都表明：默认安全的隔离能力将把生产级 Agent 与业余项目区分开来。
6. **Token 经济性驱动进阶用户忠诚。** 精确的估算器、按真实模型窗口锚定的压缩、prompt-cache 透传出现在三个项目中——成本可预测性是竞争性功能，而非管道路具。
7. **治理与自动化决定社区规模。** ZeroClaw 的 RFC 改革与 OpenClaw 的分诊机器人表明，流程工具决定了大型贡献者基础是加速项目还是造成瓶颈。

---
*数据基础：各项目 2026-09-14 社区日报；24 小时观测窗口；健康度评分为分析师判断，按开放严重度债务与修复吞吐加权。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — 项目简报 (2026-09-14)

## 1. 今日概览

Hermes Agent 在过去 24 小时内产生了 100 条 tracker 事件（50 个 issue + 50 个 PR），**分诊速度相当快**，但尚未发布任何新版本。活动明显偏向 gateway、MCP 和 CLI 各层面的 **bug 报告与安全发现**，并且出现了一批值得关注的平台相关（Windows/macOS/Linux）回归问题。已关闭条目远多于合并的 PR（7 个已关闭 issue 对 1 个已合并 PR），表明维护者正在清理过期/重复的报告，而非发布新功能。今日无新版本发布，说明 **0.21.x** 仍是当前最新版本，同时一大批修复正在 `main` 上积聚。

## 2. 版本发布

**过去 24 小时内没有新版本发布。** 数据中引用的最新 tagged 版本为 **v0.21.2**（PR #110668），而用户报告回归问题所针对的版本仍是 **v0.19.1**（issue #76541）。`mcp==2.0.0` / `fastmcp` 之间的依赖锁定存在冲突（issue #95855，PR #107324），这意味着任何新版本的发布都应配合一次经过协调的 pyproject 版本提升。

## 3. 项目进展

过去 24 小时内仅有 **1 个 PR 被合并/关闭**，其余（49 个）仍处于打开状态。今日值得注意的已关闭 issue 活动（并非 PR 合并）：

- **#23837 [已关闭]** — ContextEngine 每轮观察钩子的功能请求已关闭，很可能是因为已得到处理/实现。([issue](https://github.com/NousResearch/hermes-agent/issues/23837))
- **#29418 [已关闭]** — Nous 推理流式传输超时问题以“已在 main 上实现”为由关闭，但随即被另一位报告者在 **#110769** 中**重新打开**，其表示该 bug 在提交 `5eb99eb2`（比 v0.21.2 晚约 472 个提交）上仍可复现。([reopen](https://github.com/NousResearch/hermes-agent/issues/110769))
- **#76541 [已关闭]** — v0.19.1 上 Telegram 网关被 watchdog 反复杀死的问题现已关闭，视为已在 main 上实现。
- **#110719 [已关闭]** — opencode-go MissingSessionID 网关图像预分析。
- **#110722 [已关闭]** — Multiplex 配置下 MCP 工具 include/exclude 不一致（0.21.1/0.21.2）。

今日切实**推进了实际工程工作**的开放 PR：

- **#110668** — `fix(update): ignore flat-install runtime state so autostash cannot sweep the live state.db`（P1，sweeper:risk-session-state）——修复了平铺安装下一处严重的数据丢失路径。([PR](https://github.com/NousResearch/hermes-agent/pull/110668))
- **#107324** — `fix(memory/hindsight): stop the per-session embedded daemon restart`——通过修复 `fastmcp`/`mcp` 版本冲突，直接解决 issue #95855。([PR](https://github.com/NousResearch/hermes-agent/pull/107324))
- **#110780** — Slack 的 `channel_*`/`pinned_item` 维护类子类型事件现由会话白名单门控。([PR](https://github.com/NousResearch/hermes-agent/pull/110780))
- **#110795** — Codex Responses API 现在会丢弃被截断的工具参数，而不是照常执行。([PR](https://github.com/NousResearch/hermes-agent/pull/110795))
- **#110794** — CLI 现可在 `gateway` 和 `gateway run` 上接受 `--yolo`。([PR](https://github.com/NousResearch/hermes-agent/pull/110794))
- **#110793** — 长上下文成本估算现已应用 OpenRouter 分层定价覆盖。([PR](https://github.com/NousResearch/hermes-agent/pull/110793))
- **#110792** — Z.AI 流式推理内容现已保存到会话历史中。([PR](https://github.com/NousResearch/hermes-agent/pull/110792))
- **#110775** — Hermes Desktop 现将原始外部锚点经由经过审计的打开器处理（修复失效的文档/登录链接）。([PR](https://github.com/NousResearch/hermes-agent/pull/110775))
- **#110788** — Windows VBS 启动器现会将网关退出码传递给任务计划程序。([PR](https://github.com/NousResearch/hermes-agent/pull/110788))

## 4. 社区热门话题

讨论最热烈的话题（按评论数计）无一不指向**网关认证、记忆与提供商层的结构性脆弱**：

| 排名 | 条目 | 评论数 | 主题 |
|---|---|---|---|
| 1 | [#95855](https://github.com/NousResearch/hermes-agent/issues/95855) Hindsight `local_embedded` 损坏 | 7 | 插件依赖冲突（mcp/fastmcp）导致每次更新后本地记忆被静默禁用 |
| 2 | [#23837](https://github.com/NousResearch/hermes-agent/issues/23837) ContextEngine 观察钩子 | 6 | 插件作者被迫滥用 `compress()` 作为每轮上下文观察的后门 |
| 3 | [#45983](https://github.com/NousResearch/hermes-agent/issues/45983) 技能密集型配置下的聊天死循环 | 6 | 247 技能的配置文件在约 19 轮后进入聊天死循环，原因是后台审查与内置 Compressor 冲突 |
| 4 | [#84106](https://github.com/NousResearch/hermes-agent/issues/84106) `config get mcp_servers` 泄露机密 | 5 | MCP 凭据未遵守 `security.redact_secrets`；agent 会话可经由终端工具外泄数据 |
| 5 | [#42997](https://github.com/NousResearch/hermes-agent/issues/42997) 邮件网关 IMAP 将未读标记为已读 | 5 | IMAP `RFC822` FETCH 并非 peek 操作——属于设计层面对 IMAP 协议的误用 |
| 6 | [#73403](https://github.com/NousResearch/hermes-agent/issues/73403) Windows ACP 适配器挂起 | 5 | 首次调用终端工具时在 Windows Git Bash 启动探测上永久挂起 |
| 7 | [#110591](https://github.com/NousResearch/hermes-agent/issues/110591) Discord Markdown 渲染 | 5 | GitHub 风格表格渲染效果差；请求提升为 embed 字段展示 |

**深层需求：** 跨更新的记忆/插件可靠性； 面向 agent 驱动终端的默认安全配置输出； 一等公民的插件扩展点而非后门式复用； Windows 与 macOS 上的平台一致性。

## 5. Bug 与稳定性

按数据中的**显式严重程度标签**排序：

### P1（最高）
- **#73403** — Windows ACP 适配器在终端工具上挂起。已有修复：**PR #69083**。([issue](https://github.com/NousResearch/hermes-agent/issues/73403))
- **#110668**（PR）— 平铺安装的 `state.db` 在 `hermes update` 期间被 `autostash` 清除。([PR](https://github.com/NousResearch/hermes-agent/pull/110668))
- **#76541 [已关闭]** — v0.19.1 上 Telegram 网关反复被关机 watchdog 杀死。已作为已实现而关闭。

### P2（高）
- **#84106** — 即使设置了 `redact_secrets: true`，`hermes config get mcp_servers` 仍会暴露解析后的 MCP 机密。**暂无修复 PR。**([issue](https://github.com/NousResearch/hermes-agent/issues/84106))
- **#110690** — `config.yaml` 中的 `gateway.allow_all_users` 被静默忽略；运行时只读取环境变量。**暂无修复 PR。**([issue](https://github.com/NousResearch/hermes-agent/issues/110690))
- **#110758** — `hermes config get providers` 以明文打印 API 密钥，并被记录到会话转录中。范围上与 #84106 重复。**暂无修复 PR。**([issue](https://github.com/NousResearch/hermes-agent/issues/110758))
- **#110769** — 在 agent 级别的上下文规模下流式传输仍然挂起（重新打开 #29418）。**暂无修复 PR。**([issue](https://github.com/NousResearch/hermes-agent/issues/110769))
- **#109837** — `key_cmd` 提供商在元数据探测时将 `repr(CommandTokenSource)` 作为 Bearer 令牌发送；异步辅助客户端则发送空密钥。**暂无修复 PR。**([issue](https://github.com/NousResearch/hermes-agent/issues/109837))
- **#110689** — 后台记忆审查发出不受支持的 `"action": "patch"` → 整批回滚并滞留在 `pending` 状态。**暂无修复 PR。**([issue](https://github.com/NousResearch/hermes-agent/issues/110689))
- **#110695** — `command.dispatch` 无法调用次级配置的技能（4018 路由 bug）。**暂无修复 PR。**([issue](https://github.com/NousResearch/hermes-agent/issues/110695))
- **#110737** — `busy_input_mode: interrupt` 会静默丢弃携带图像附件的打断消息。**暂无修复 PR。**([issue](https://github.com/NousResearch/hermes-agent/issues/110737))
- **#110276** — macOS 上因单进程多句柄 WAL 拆分导致的 `DeletedWalGenerationError` 自杀式重启循环（每 16-30 秒一次）。**暂无修复 PR。**([issue](https://github.com/NousResearch/hermes-agent/issues/110276))
- **#103665**（PR）— `fix(tui-gateway): hold a persistent WAL keeper`——解决 #110276 的根因。([PR](https://github.com/NousResearch/hermes-agent/pull/103665))
- **#104851** — cua-driver ≥0.23.2 需要为 `computer_use` 提供 `element_token` 回退。**暂无修复 PR。**([issue](https://github.com/NousResearch/hermes-agent/issues/104851))
- **#91742**（PR）— Responses API 输入消息缺少 `type=message`。([PR](https://github.com/NousResearch/hermes-agent/pull/91742))
- **#75562**（PR）— 网关流式输出的是推理回显而非真实内容。([PR](https://github.com/NousResearch/hermes-agent/pull/75562))
- **#100765**（PR）— Desktop 的 Wayland 剪贴板图像回退方案。([PR](https://github.com/NousResearch/hermes-agent/pull/100765))

### P3（标准）
- **#95855** — Hindsight `local_embedded` 因 mcp/fastmcp 版本偏差而损坏。**修复 PR：#107324。**([issue](https://github.com/NousResearch/hermes-agent/issues/95855))
- **#45983** — 技能密集型编排配置下的聊天死循环。**暂无修复 PR。**
- **#42997** — 邮件网关 IMAP FETCH 将 Gmail 未读邮件标记为已读。**暂无修复 PR。**
- **#109482** — `hermes update` 在 DEBUG 级别静默吞掉同级配置文件的迁移错误。**暂无修复 PR。**
- **#110766** — Desktop 暴露了 `compression.threshold` 却隐藏了 `codex_gpt55_autoraise` 覆盖项。**暂无修复 PR。**
- **#103062** — systemd 用户单元的时序检查读取 DEFAULT 90s → 产生误报的“stale”警告。**暂无修复 PR。**
- **#80336** — Matrix 的瞬时 TLS/超时被误判为永久性认证错误。**暂无修复 PR。**
- **#76362** — SimpleX 适配器丢弃内联 base64 图像。**暂无修复 PR。**

## 6. 功能请求与路线图信号

**预计近期落地（未来 1–2 个次版本内），依据是关联 PR 与话题聚类：**

- **#110591** — 面向表格/状态字段的 Discord Markdown 渲染。Discord 网关的功能缺口；尚无 PR 但讨论热度高。([issue](https://github.com/NousResearch/hermes-agent/issues/110591))
- **#23837 [已关闭]** — ContextEngine 每轮观察钩子——其关闭状态暗示正式 API 即将推出。([issue](https://github.com/NousResearch/hermes-agent/issues/23837))
- **#110767**（PR）— `feat(plugins): register browser login backends`，面向 Proton Pass、KeePassXC 等。([PR](https://github.com/NousResearch/hermes-agent/pull/110767))
- **#110736** — Bot 模式群聊增删成员（`groups.add_member`）。([issue](https://github.com/NousResearch/hermes-agent/issues/110736))
- **#110789**（PR）— 在 `/model` 切换时显示生效的 OpenRouter 提供商锁定。([PR](https://github.com/NousResearch/hermes-agent/pull/110789))
- **#110726** — 安装器不应为已安装的依赖调用 `sudo`。([issue](https://github.com/NousResearch/hermes-agent/issues/110726))

**预计中期：**

- **#110731** — 让 `hermes-agent` 本身可通过 `.no-bundled-skills` / `skills.disabled` 禁用（目前被硬编码为必需项）。涉及核心技能语义。([issue](https://github.com/NousResearch/hermes-agent/issues/110731))

## 7. 用户反馈摘要

**痛点（评论中反复出现的主题）：**

1. **更新可靠性。** 多位用户报告 `hermes update` *会静默破坏*原本正常工作的功能——Hindsight 记忆、同级配置文件（#109482）、平铺安装的 state.db（#110668）。其模式是：回归问题只有在 DEBUG 日志中，或在损害发生*之后*重新运行 `hermes doctor` 时才会暴露。
2. **CLI 泄露机密。** 一组彼此呼应的 issue（#84106、#110690、#110758）表明社区担心 `hermes config get …` 和 `gateway.allow_all_users` 实际上是“默认开放”的——当 agent 能调用自己的终端时，这是一次不容忽视的安全边界失守。
3. **长上下文下的流式传输与推理。** #29418 → #110769 表明社区认为一个“已修复关闭”的问题实际上并未解决；若不处理，将损害信任。
4. **跨平台脆弱性。** Windows ACP（#73403）、macOS WAL（#110276）、Wayland 剪贴板（#100765 / #85782）、systemd 用户级时序（#103062）——各平台的用户都报告了彼此独立但严重的故障模式。
5. **插件作者的开发体验。** #23837 明确指出缺乏一等公民的每轮观察钩子；用户被迫采用变通模式。Hermes-Mneme 的作者实际上是在做系统调用级别的集成。

**所代表的用例：**

- 自托管的多配置家用实验环境（#45983 中 247 个技能的配置；#110276 中的多句柄 WAL）。
- 移动优先的消息网关，带图像附件和 `free_response_channels`。
- 通过 OpenRouter 实现长上下文计费透明（PR #110793——用户希望 272K token 以上的成本报告准确无误）。
- 浏览器中介的凭证保管库（通过 PR #110767 支持 Proton Pass、KeePassXC）。

**满意度信号：** 健康良好。大多数 issue 都包含复现步骤、环境信息，甚至单元测试级别的细节（例如 issue #103062 给出了精确的探测路径和代码引用）。有多个 issue 由用户提交后又自行提交修复 PR，表明这是一个参与度高、技术功底深厚的社区。

## 8. 积压事项观察

以下条目**影响大、活跃度低且暂无修复 PR**，维护者应予以分诊：

| 条目 | 创建时间 | 评论数 | 为何重要 |
|---|---|---|---|
| [#84106](https://github.com/NousResearch/hermes-agent/

---

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目简报 — 2026-09-14

## 1. 今日概览

IronClaw 在过去 24 小时内呈现**低至中等活跃度**,完全由 PR 流转驱动,而非 issue 讨论。未新建、更新或关闭任何 issue,也没有新的 release 标签,表明这是一个平静的维护期。流水线主要由 `dependabot[bot]` 协调的例行依赖升级(Rust crates、GitHub Actions、WASM 工具链)主导,另有一项实质性工程变更在进行中:#8077,该 PR 集中处理 MCP 响应泄漏诊断。例行 PR 与功能性 PR 的健康比例,以及无未解决 bug 报告,都表明项目卫生状况稳定;但有限的社区讨论(所有条目的 👍 反应为零、评论数未定义)则反映出当前的外部参与度偏低。

## 2. 版本发布

过去 24 小时内未发布新版本。无版本标签记录。

## 3. 项目进展

**已关闭/合并活动(过去 24 小时):1 个 PR**

- **#8097** — [`chore(deps): bump the everything-else group with 24 updates`](https://github.com/nearai/ironclaw/pull/8097)(dependabot,关闭于 2026-09-13):例行的 24 个包依赖更新。该 PR 实际上**已被同日发出的 #8099 取代**(后续 PR 将同一批 crate 升级到了更新的 patch 版本)。代码语义未发生变化。

**今日推进中的实质性 PR(开放中):**

- **#8077** — [`fix(mcp): classify response leak diagnostics`](https://github.com/nearai/ironclaw/pull/8077)(linhongyu510,最后更新于 2026-09-14):重构宿主响应泄漏阻断逻辑,在 `ironclaw_host_api::http` 中引入集中式 `response_leak_blocked` 哨兵值,并让 MCP 通道对该哨兵进行差异化分类,在保留 MCP 可见失败原因的同时维持宿主泄漏阻断语义的安全。关闭 #8009。这是当前唯一一项非依赖性变更。

**仍待审核的开放依赖升级(更新于 2026-09-13):**

- [#8099 — everything-else 组,25 个更新](https://github.com/nearai/ironclaw/pull/8099)
- [#8079 — actions 组,6 个更新](https://github.com/nearai/ironclaw/pull/8079)
- [#8078 — tokio-ecosystem 组,2 个更新](https://github.com/nearai/ironclaw/pull/8078)
- [#7834 — wasm 组,4 个更新(陈旧中)](https://github.com/nearai/ironclaw/pull/7834)

## 4. 社区热门话题

观察窗口内**无 issue**,且任何跟踪条目都**无人工评论活动**。所有 5 个开放 PR 的 👍 反应均为 **0**,评论数未定义,表明不存在可量化的社区讨论。按更新时序排出的唯一"最热"条目是:

- [#8077(MCP 响应泄漏修复)](https://github.com/nearai/ironclaw/pull/8077) — 唯一一项非机械性 PR,也是最接近当前讨论话题的内容。底层诉求:当宿主出站策略阻断响应时,提供更清晰、可调试的 MCP 错误上报,同时不削弱宿主的泄漏防护保障。

除 dependabot 的自动化节奏外,在 24 小时窗口内**没有可见的有机社区需求信号**。

## 5. Bug 与稳定性

- 过去 24 小时内**未提交或更新任何 bug issue**。
- **PR #8077** 是当前审查中唯一一项与稳定性相关的变更。它针对 MCP 出站泄漏处理中的诊断分类缺口(所引用的 issue #8009 不在当前数据切片内)。严重性评估:看似是一项**正确性/可观测性修复**,而非崩溃或数据丢失类 bug — 宿主泄漏阻断机制保持完整,只是被暴露的失败原因被改得更精确。
- 未见回归或崩溃报告。**风险提示:** 5 个 dependabot PR 同时开放且 crate 更新存在重叠,若不按顺序合并,出现集成摩擦的可能性不容忽视;#8099 已取代 #8097,说明机器人具备自我修正能力,但维护者仍应在 CI 验证下批量合并。

## 6. 功能请求与路线图信号

- 过去 24 小时内**未提交任何功能请求 issue**,当前数据切片中也未浮现历史 issue。仅凭 issue 活动无法推断路线图信号。
- 唯一的方向性线索来自 PR #8077:对 **MCP 层诊断清晰度**进行了一笔虽小但刻意的投入,表明 `ironclaw_host_api::http` 内部的 MCP 集成面仍是持续投入的方向,而非全新功能的推进。
- dependabot 各分组(`everything-else`、`actions`、`tokio-ecosystem`、`wasm`)的覆盖广度表明维护者重视保持整个 Rust + WASM + GH Actions 工具链的更新 — 这更可能是一项长期承诺,而非路线图项。

## 7. 用户反馈汇总

在 24 小时窗口内**无可观察的用户反馈**:零评论、零反应、零新 issue。数据中不存在痛点、使用场景报告或满意度信号。任何用户情感分析都需要拉取更长的历史窗口。

## 8. 待办观察

- **PR #7834**([wasm 组升级,4 个更新](https://github.com/nearai/ironclaw/pull/7834))— 创建于 **2026-08-23**,最后触达 2026-09-13。已存在约 3 周,是当前可见集合中**最老的未合并 PR**。WASM(`wasmtime`、`wasmtime-wasi`、`wit-component`、`wit-parser`)是核心运行时依赖,此处的延迟可能与后续组别产生叠加影响;建议维护者审查并与 #8078 / #8099 批量合并。
- **PR #8079**([actions 组,6 个更新](https://github.com/nearai/ironclaw/pull/8079))— 包含 `actions/setup-node` 从 **4.0.2 → 7.0.1** 以及 `anthropics/claude-code-action` 从 1.0.183 → 1.0.221 的主版本号升级。CI action 的主版本号变更需要维护者明确签字,特此标注。
- **PR #8077**([MCP 响应泄漏诊断](https://github.com/nearai/ironclaw/pull/8077))— 当前唯一一项非平凡的代码变更,已存在 8 天,尚无评论。关闭 #8009;需要审阅者关注以打通 bug 修复链路。
- 当前数据切片中**未见孤立 issue**,因此无可报告的未回复 issue 待办。

---

**整体健康信号:**  稳定但沉寂。维护端卫生状况良好(dependabot 节奏活跃、诊断修复进行中),但社区端参与度持平。主要风险在于**重叠依赖升级以及 CI action 主版本号更新的 PR 审查延迟**,而非代码质量或未解决的 bug。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-14

## 1. 今日概览

QwenPaw 在过去 24 小时内表现出**高频维护活动**：`agentscope-ai/QwenPaw` 仓库共有 44 个 Issue 和 50 个 PR 更新，未发布新版本。活跃度大致在新 Bug 分类（31 个开放 Issue）与进行中的开发（37 个开放 PR）之间均衡分布，表明项目在 v2.2.x 系列之后已进入稳定化阶段。大量修复集中在内存子系统、MCP/ACP 协议处理和运行时韧性方面，而社区反映的持续痛点则围绕配置持久化、定时任务输出可靠性以及 Docker/MCP 升级回归。总体而言，项目健康状况**活跃但承压**，若干高危内存泄漏与协议兼容性 Bug 仍未关闭，尽管已有对应的 PR 正在推进。

## 2. 版本发布

过去 24 小时内未发布新版本。当前活跃 Issue 中用户报告的最新已知版本为 **v2.2.0** 和 **v2.2.1 / 2.2.1-beta.2**；数据源中未反映任何打 Tag 动作。

## 3. 项目进展

过去 24 小时内关闭了 13 个 Issue，合并/关闭了 13 个 PR。以下是已合入修复的代表性条目：

- [#4354](https://github.com/agentscope-ai/QwenPaw/issues/4354) — 大型 Excel 文件读取中断 Bug 已关闭（v1.1.6 时期）。
- [#4220](https://github.com/agentscope-ai/QwenPaw/issues/4220) — `auto_memory_interval` 写入内存文件但未同步向量索引；在 `memory_search` 一致性问题得到处理后关闭。
- [#3995](https://github.com/agentscope-ai/QwenPaw/issues/3995) — 内存管理与召回增强需求已关闭（可能由正在进行的 ReMe / 向量索引工作一并解决）。
- [#7199](https://github.com/agentscope-ai/QwenPaw/issues/7199) — `daily_paper` 的 `write_atomic` 因代理字符崩溃问题已修复。
- [#4710](https://github.com/agentscope-ai/QwenPaw/issues/4710) — 向量存储中 naive-datetime 与 UTC 元数据不一致问题已关闭。
- [#5122](https://github.com/agentscope-ai/QwenPaw/issues/5122) — 上下文压缩统计与实际 API 负载的偏差已关闭（skills/MCP 导致的膨胀已处理）。
- [#6840](https://github.com/agentscope-ai/QwenPaw/issues/6840)、[#6222](https://github.com/agentscope-ai/QwenPaw/issues/6222)、[#4208](https://github.com/agentscope-ai/QwenPaw/issues/4208)、[#3801](https://github.com/agentscope-ai/QwenPaw/issues/3801)、[#7594](https://github.com/agentscope-ai/QwenPaw/issues/7594)、[#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666) — 杂项咨询 / 无效 / Hugging Face 下载问题已关闭。

以下开放 PR 正在落地功能与修复（数据源中今天尚无 PR 标记为已合并，但以下 PR 均处于活跃评审中）：

- [#7751](https://github.com/agentscope-ai/QwenPaw/pull/7751) — 对齐 Docker 应用 venv 与桌面端 Python 3.11 独立运行时；为兼容入口点保留 Debian Python。
- [#7748](https://github.com/agentscope-ai/QwenPaw/pull/7748) — Doom-loop 警告在下一次模型调用前发出；预算与溢出恢复已修正（关联 [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722)）。
- [#7766](https://github.com/agentscope-ai/QwenPaw/pull/7766) — Hub 个人 Runtime 通过 query-string token 鉴权原生浏览器文件预览。
- [#7763](https://github.com/agentscope-ai/QwenPaw/pull/7763) — 插件目录现已能在 `ConnectionResetError` / `IncompleteRead` 下存活。
- [#7753](https://github.com/agentscope-ai/QwenPaw/pull/7753) — `make-skill` 升级至 v2.1，在草稿创建前强制执行存储计划步骤。
- [#7757](https://github.com/agentscope-ai/QwenPaw/pull/7757) — 治理：`PolicyGuardedTool` 现在端到端运行破坏性命令分类器与系统凭据防护。
- [#7737](https://github.com/agentscope-ai/QwenPaw/pull/7737) — 扩展多 Agent 协作技能触发关键词（修复 [#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113)）。
- [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)、[#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732)、[#7684](https://github.com/agentscope-ai/QwenPaw/pull/7684)、[#7762](https://github.com/agentscope-ai/QwenPaw/pull/7762)、[#7761](https://github.com/agentscope-ai/QwenPaw/pull/7761)、[#7765](https://github.com/agentscope-ai/QwenPaw/pull/7765)、[#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725)、[#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723)、[#7211](https://github.com/agentscope-ai/QwenPaw/pull/7211)、[#7756](https://github.com/agentscope-ai/QwenPaw/pull/7756)、[#7759](https://github.com/agentscope-ai/QwenPaw/pull/7759)、[#7760](https://github.com/agentscope-ai/QwenPaw/pull/7760)、[#7758](https://github.com/agentscope-ai/QwenPaw/pull/7758) — 其它 MCP/ACP 协议修复、控制台 UX、CLI 关闭排空、glob 大括号展开等。

## 4. 社区热议话题

按评论数排序的高热度帖集中于**内存可靠性**、**子 Agent 编排**与**静默失败模式**：

- [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) — **定时任务经常无输出**；在 v2.2.1 上结果被并入 `thinking` 或直接省略。（6 条评论）— 底层诉求：确定性的、用户可见的定时任务输出，以及更克制的 thinking 折叠启发式。
- [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — **`spawn subAgent` 在 Win v2.2.0 上始终超时**，与超时长度无关。（6 条评论）— 底层诉求：可信赖的子 Agent 派发，而不只是可配置的超时。
- [#7571](https://github.com/agentscope-ai/QwenPaw/issues/7571) — **Agent 持续"遗忘"项目约定**（如 TODO 文件位置、开发 vs 部署路径），即使明确指示后仍如此。（6 条评论）— 底层诉求：跨会话可存活的更强长期项目约定，以及用户可见的规则。
- [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — **通过三条复合路径造成的内存耗尽**：无界流缓冲、keep-alive 实例堆叠、doom-loop 闸门绕过（含可控复现）。（4 条评论）— 高质量的技术报告，提出了最小化修复草案；与 [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222)（20 GB+ 运行时增长）同源。PR [#7748](https://github.com/agentscope-ai/QwenPaw/pull/7748) 解决了其中一部分。
- [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) — **Daily Paper 插件在 arxiv.org 不可达时静默失败**；用户看到的是"完成但未返回内容"，而非网络错误。（4 条评论）— 底层诉求：诚实的错误上报以及代理/端点的配置开关。PR [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) 和 [#7756](https://github.com/agentscope-ai/QwenPaw/pull/7756) 触及了相关面。
- [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739) — **UX**：窄屏笔记本上希望历史侧边栏靠右。（4 条评论）
- [#7749](https://github.com/agentscope-ai/QwenPaw/issues/7749) — **模型故障转移在哪里配置？** 用户找不到 v2.2.1 新增故障转移功能的 UI 入口。（3 条评论）
- [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)、[#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — **已配置的 LLM 在 v2.2.1 桌面版会话中途"消失"**；下游影响：相关会话丢失，疑似同一根因。（各 4 条评论）

## 5. Bug 与稳定性

按严重程度与影响排序（除特别注明外均为 OPEN）：

| 严重度 | Issue | 概述 | 修复进行中？ |
|---|---|---|---|
| **Critical** | [#7222](https://github.com/agentscope-ai/QwenPaw/issues/7222) — 长时运行的 `qwenpaw-backend` 在 2 天内内存增长至 **20.7 GB**（运行时累积，非启动期泄漏）。 | 自托管用户的持续性拒绝服务。 | 通过 [#7748](https://github.com/agentscope-ai/QwenPaw/pull/7748) 部分解决；流缓冲与 keep-alive 路径仍开放。 |
| **Critical** | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — 通过**三条复合路径**造成内存耗尽；约 1 MB/s 增长，导致 OOM 挂起。可复现。 | 与 #7222 同根；报告附最小化修复草案。 | [#7748](https://github.com/agentscope-ai/QwenPaw/pull/7748) 部分解决。 |
| **High** | [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) — `spawn subAgent` 在 Win v2.2.0 上始终超时。 | 阻断所有多 Agent 工作流。 | 无针对性 PR。 |
| **High** | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) — 定时任务静默丢失输出。 | 定时任务核心价值主张被破坏。 | 无针对性 PR。 |
| **High** | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) / [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) — 在 Win v2.2.1 上，已配置 LLM 和会话在会话中途消失。 | 邻近数据丢失；多位用户受影响。 | 无针对性 PR。 |
| **High** | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) — **升级到 2.2.x 后 MCP 无法连接**（在 2.1.1b3 中正常）。 | 重大能力回归。 | [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) 处理了 HTTP 错误封装；根因仍在调查中。 |
| **High** | [#7728](https://github.com/agentscope-ai/QwenPaw/issues/7728) — Java MCP SDK 服务器返回的 `server/discover` HTTP 500 被当作协议错误处理，Driver 构建失败。 | 生态兼容性回归。 | 无已合并 PR；MCP 领域有相关工作。 |
| **Medium** | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) — arxiv 不可达时 Daily Paper 静默失败。 | 插件错误地报告成功。 | [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723)、[#7756](https://github.com/agentscope-ai/QwenPaw/pull/7756)。 |
| **Medium** | [#7745](https://github.com/agentscope-ai/QwenPaw/issues/7745) — Agent 切换会删除 `lastChatIdByAgent`，在 2.2.1-beta.2 上历史记录无法点击。 | 控制台会话簿记回归。 | 无 PR。 |
| **Medium** | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) — ACP `trusted: true` 回退到交互式提示（`_pick_allow_option` 仅匹配 `allow_*`）。 | 可信模式承诺被破坏。 | [#7732](https://github.com/agentscope-ai/QwenPaw/pull/7732) 开放中。 |
| **Medium** | [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) — Agent 工作目录忽略用户设置的默认值；重启后恢复到旧路径。 | 持久化 Bug。 | 无 PR。 |
| **Low/已关闭** | [#4354](https://github.com/agentscope-ai/QwenPaw/issues/4354)、[#4220](https://github.com/agentscope-ai/QwenPaw/issues/4220)、[#4710](https://github.com/agentscope-ai/QwenPaw/issues/4710)、[#5122](https://github.com/agentscope-ai/QwenPaw/issues/5122)、[#7199](https://github.com/agentscope-ai/QwenPaw/issues/7199) — 均已于今日关闭。 | 已解决。 | — |

## 6. 功能请求与路线图信号

- **右侧历史侧边栏**（[#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739)）— 极有可能进入下一个小版本；改动轻微但在小屏上有可衡量的 UX 提升。
- **Skills × 自定义渠道**作用域（[#7746](https://github.com/agentscope-ai/QwenPaw/issues/7746)）— 允许自定义渠道的 skills；与已标记的 Skills/Channels 组件自然契合。很可能在 v2.3 落地。
- **定时任务与插件的诚实失败上报**（[#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715)）— 应视为稳定性修复；预期与已有的内存错误工作一同发布。
- **内存归档策略 / 冲突检测**（[#3995](https://github.com/agentscope-ai/QwenPaw/issues/3995)，已关闭）— 最近围绕内存时间戳、向量索引同步与摘要设计的关闭表明这些正在逐步落地。
- **ReMe4 路线图（Auto-Link、三模态搜索、四类摘要）**（[#6840](https://github.com/agentscope-ai/QwenPaw/issues/6840)）— 咨询已关闭；用户等待路线图时间表。
- **`make

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-14

## 1. 今日概览

ZeroClaw 目前处于 v0.8.5 后稳定化周期，主线围绕治理与质量主题。过去 24 小时共有 25 个 issue 更新（5 个已关闭，20 个仍开放）以及 50 个 PR 更新（仅 1 个已合入），表明在途工作的重点在于评审与决策，而非合并落地。本日未发布新版本。反复出现的关注点集中在 **config-write 校验缺口**、**RFC 流程改革** 以及 **发布效率跟进**；同时若干 P1/S1 缺陷（MCP 恢复后连接中毒、OpenCode 会话头缺失、OpenAI device-code 404）仍处于开放状态，需维护者重点关注。

## 2. 版本发布

过去 24 小时内未发布新版本。在 [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 中跟踪的 v0.8.5 稳定化分支仍是当前工作的主线，同时新开了一条发布效率跟踪项 [#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814)，旨在减少重复构建、缩短下一版本的恢复周期。

## 3. 项目进展

共有 5 个 issue 被关闭，标志着此前报告的缺陷已得到具体修复：

- [#10721](https://github.com/zeroclaw-labs/zeroclaw/issues/10721) — 已修复：`knowledge.db_path` 的波浪号展开不再执行全局替换；此前知识工具会静默丢弃路径。
- [#10324](https://github.com/zeroclaw-labs/zeroclaw/issues/10324) — 已修复：cron 手动触发与运行历史读取不再在 agent 重命名场景下产生 check-then-act 竞态（提交时定为 S2）。
- [#10580](https://github.com/zeroclaw-labs/zeroclaw/issues/10580) — 已修复：文档 CI 链接检查现在会扫描仓库全量的内部链接，而不仅是新增行，因此预先存在的悬挂链接不会再静默失效。
- [#10533](https://github.com/zeroclaw-labs/zeroclaw/issues/10533) — 已修复：`model_routing_config` 工具现在接受 `custom.*` 及其他合法的 provider 槽位，使工具校验与配置 schema 对齐。
- [#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) — 已修复：RPC `config/set` 不再持久化被 `Config::validate()` 拒绝的值，与 gateway PATCH 及 CLI 行为恢复一致。

今日合并的 PR 仅 1 个：[#10742](https://github.com/zeroclaw-labs/zeroclaw/pull/10742)（rust-all 依赖升级，已被 [#10852](https://github.com/zeroclaw-labs/zeroclaw/pull/10852) 取代）。若干大型架构 PR 仍在评审中推进，尚未落地。

## 4. 社区热门话题

讨论最活跃的线程集中在治理/RFC 改革而非运行时缺陷 —— 这是一个明确的信号，表明项目正在同时投入于流程建设与代码本身：

- [#8692 — RFC 与设计 issue 的维护者决策队列（15 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)：流量最高的跟踪项，反映出社区对更快、更透明的分类处理的需求。
- [#10549 — RFC：取消强制讨论窗口以简化 RFC 投票（10 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)：社区普遍认为固定的 48h/72h 计时器徒增摩擦，并未带来更多有效评审。
- [#10366 — RFC：明确 PR 评审证据、时效性警告与作者行动边界（8 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/10366)：正在塑造一条用于"干净且基于精确 HEAD 的咨询式评审"的"快速合并通道"。
- [#10360 — RFC：基于 pull worker 与签名回执的可选家庭边缘 mesh（4 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/10360)：用户希望无需新增 GPU 即可将闲置硬件组成一个安全的 mesh。

**底层诉求：**社区正在呼吁更轻量的治理循环与更清晰的权责边界 —— 这类"管道成熟度"信号表明项目正从特性阶段迈向长期维护阶段。

## 5. 缺陷与稳定性

开放的 P1 缺陷（按对工作流的影响排序）：

1. **S1 — 工作流阻塞** [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — `x-opencode-session` 请求头从未被发送，导致 Go 模型不可用，并存在账号被标记的风险（👍 3）。尚未关联修复 PR。
2. **S1 — 工作流阻塞** [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) — MCP HTTP/SSE 连接在一次恢复失败后即被永久污染，运维必须重启才能恢复。
3. **S1 级回归** [#10320](https://github.com/zeroclaw-labs/zeroclaw/issues/10320) — `config set` 与 RPC `config/set` 会以退出码 0 持久化越界值；RPC 路径已有部分修复落地（[#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837)），更全面的修复已在 PR [#10499](https://github.com/zeroclaw-labs/zeroclaw/pull/10499) 中排期。
4. **P1** [#10828](https://github.com/zeroclaw-labs/zeroclaw/issues/10828) — `openai-codex --device-code` 命中已废弃端点，返回 404。
5. **P1** [#10533（已关闭）](https://github.com/zeroclaw-labs/zeroclaw/issues/10533) — 路由工具拒绝合法的 provider；今日已解决。

值得关注的 S2 稳定性项：

- [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) — 在非视觉模型下 `[media attachment]` 占位符会泄漏给用户。
- [#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842) — Telegram `reaction` 工具通过默认 trait 静默 no-op。
- [#10821](https://github.com/zeroclaw-labs/zeroclaw/issues/10821) — `zeroclaw service logs` 显示的是过期的 stderr，因为以服务方式安装的守护进程在不带 `--verbose` 时不输出任何 tracing。
- [#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585) — 在默认并行 runner 下 log-sink 与迁移测试之间存在竞态。

**稳定性信号：**校验/持久化类缺陷在 CLI、RPC、gateway 各表面反复出现 —— 这属于结构性问题而非偶发问题，正在通过在途的 [PR #10499](https://github.com/zeroclaw-labs/zeroclaw/pull/10499) 与后续增强项 [#10822](https://github.com/zeroclaw-labs/zeroclaw/issues/10822)（针对原子的 `config/set-many`）集中处理。

## 6. 功能请求与路线图信号

开放的增强 issue（按 PR 耦合度评估的近期落地概率）：

- **高概率，下个 minor 版本落地：** [#10822](https://github.com/zeroclaw-labs/zeroclaw/issues/10822) — `config/set-many` 原子批处理配置变更（已在进行中，与 [#10499](https://github.com/zeroclaw-labs/zeroclaw/pull/10499) 配对）。
- **高概率：** [#10826](https://github.com/zeroclaw-labs/zeroclaw/issues/10826) — 显式的 ZeroCode session-root 选择；承接 [#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)/[#10565](https://github.com/zeroclaw-labs/zeroclaw/pull/10565)。
- **可能在 RFC 通过后落地：** 可选家庭边缘 mesh [#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360)；来自 #10366 实现 PR [#10677](https://github.com/zeroclaw-labs/zeroclaw/pull/10677) 的快速合并通道为纯文档变更，已可合入。
- **运维/质量类：** [#10814](https://github.com/zeroclaw-labs/zeroclaw/issues/10814) — 发布效率与可重复发布跟踪项。
- **长尾：** [#10812](https://github.com/zeroclaw-labs/zeroclaw/issues/10812) — 填充 `DocumentMessage.jpegThumbnail`，以便 WhatsApp PDF 在手机上可预览。

若被接受，将显著扩展 ZeroClaw 能力面的大型 PR：

- [#10621](https://github.com/zeroclaw-labs/zeroclaw/pull/10621) — 在 daemon RPC、gateway、channels、ACP、CLI 之间共享 live-config 权威（XL）。
- [#10623](https://github.com/zeroclaw-labs/zeroclaw/pull/10623) — 为 OpenAI 兼容 provider 提供 Anthropic prompt-cache 透传（XL）。
- [#10636](https://github.com/zeroclaw-labs/zeroclaw/pull/10636) — ZeroCode effort 与显示会话控制（XL）。
- [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) — A2A 出站客户端阶段 1（XL）。
- [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) — 基于模型窗口比例的上下文压缩（XL）。
- [#10637](https://github.com/zeroclaw-labs/zeroclaw/pull/10637) — 在 agent 自有 provider 上进行的 gateway WS 内存整合（M）。

## 7. 用户反馈摘要

今日各条目中反复出现的痛点：

- **校验缺口侵蚀信任。** 运维人员持续发现 `config set`（CLI 与 RPC）会静默接受非法值，迫使其手工清理。社区正推动原子化批处理 RPC 与完整的"写入即校验"语义。
- **渠道集成质量参差不齐。** Telegram 的 `reaction` 工具、WhatsApp PDF 预览、OpenAI device-code 登录在 24 小时内接连暴露出正确性或体验缺陷 —— 渠道层相比核心显得更薄弱。
- **以服务方式运行时难以观测。** 以服务方式安装的守护进程默认不向 stderr 输出任何内容，使 `zeroclaw service logs` 具有误导性。
- **MCP 韧性是单点故障。** 一次瞬时故障即永久污染 MCP 连接，运维必须重启。这是当前开放 issue 中影响最大的运维痛点。
- **贡献者侧的流程摩擦。** 贡献者明确希望缩短强制讨论窗口，并希望为干净的咨询式评审设立快速合并通道 —— 这表明 RFC/PR 流程即将成为下一个需要缓解的瓶颈。

## 8. 待办观察

存在停滞风险、值得维护者关注的条目：

- [#10640 — feat(channels)：passive Telegram 群上下文（blocked, do-not-merge）](https://github.com/zeroclaw-labs/zeroclaw/pull/10640)：自 2026-09-05 起处于 blocked 状态，需要明确的解阻塞决策。
- [#10613 — feat(vi)：将约束标签、cnf.jwk.kid、L3 header 与规范对齐（blocked, do-not-merge）](https://github.com/zeroclaw-labs/zeroclaw/pull/10613)：高风险的规范对齐 PR，等待依赖项到位。
- [#9772 — feat(telegram)：per_user_session 开关（blocked, do-not-merge）](https://github.com/zeroclaw-labs/zeroclaw/pull/9772)：长期 XL，自 2026-08-05 起阻塞。
- [#9535 — feat(runtime)：基于模型窗口比例的上下文压缩（needs-author-action）](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)：XL，自 2026-07-29 起开放，反复出现的 "needs-author-action" 标签暗示回复存在延迟。
- [#9324 — feat(a2a)：outbound client 配置阶段 1（needs-author-action）](https://github.com/zeroclaw-labs/zeroclaw/pull/9324)：XL，自 2026-07-24 起开放。
- [#10603 — OpenCode `x-opencode-session` 请求头缺失（P1，👍 3）](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)：反应数最高的开放缺陷，尚未关联修复 PR —— 账号被标记的风险使其具有时间敏感性。
- [#10807 — MCP 连接被永久污染（S1）](https://github.com/zeroclaw-labs/zeroclaw/issues/10807)：自 2026-09-12 起开放，尚无可见的修复 PR。
- [#8692 — 维护者决策队列跟踪项（15 条评论）](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)：按评论量计算，这是项目的主要协调待办，应进行积极分类处理。

**项目整体健康度：**[#10837](https://github.com/zeroclaw-labs/zeroclaw/issues/10837) 的合入加上已排期的 PR [#10499](https://github.com/zeroclaw-labs/zeroclaw/pull/10499)，表明项目正集中力量硬化配置写入的正确性；治理改革通过 #10549 与 #10366 正在收敛。主要风险在于：(a) 开放的 S1 项 [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) 与 [#10807](https://github.com/zeroclaw-labs/zeroclaw/issues/10807) 尚未出现可见的修复 PR；(b) 越来越多的处于 `blocked` / `needs-author-action` 状态的 XL PR 若不能及时解阻塞，将拖慢 v0.8.5 之后的发布节奏。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*