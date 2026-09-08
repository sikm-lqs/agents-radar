# OpenClaw 生态日报 2026-09-09

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-08 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目简报 — 2026-09-09

## 1. 今日概览

OpenClaw 今日发布了 **v2026.9.3**，该版本重点强化更新/收尾路径（隔离候选态、废弃运行恢复、2026.9.2 迁移支持 — [发布说明](https://github.com/openclaw/openclaw/releases/tag/v2026.9.3)）。项目活跃度高且持续：24 小时内触及 **500 个 issue** 和 **500 个 PR**，其中 **269 个 PR 已合并/关闭**，**231 个仍处于开放状态**，表明分诊速度快于新增流入。积压问题以更新恢复和多智能体编排缺陷为主，其中若干已存在约 6 个月。项目整体健康状况**稳定但承压**——发布工程正在积极重构，以应对 2026.9.1 / 2026.9.2 系列引发的多次 P0/P1 升级事故。

---

## 2. 发布

### v2026.9.3 — 发布于 2026-09-09
- **更安全的更新：** 核心与插件变更现在会在激活前于隔离候选态中进行预演；支持符合条件的 2026.9.2 迁移；可在不停止健康匹配 Gateway 的情况下恢复被废弃的更新记录。
- **引用：** #136997、#138839、#141109、#141175。
- **迁移说明：** 从 2026.9.1/2026.9.2 升级且使用多平台或多智能体安装的运维人员，应在升级后运行 `openclaw doctor --fix` 以应用新的迁移路径；OCM 风格环境下的托管升级用户应在继续推进前审查部分收尾器修复路径。
- **风险画像：** 行为风险低、可靠性提升高——直接解决过去 30 天内提交的 `gateway restart`、`doctor --fix` 和 `update_runs` 卡死状态等连锁事故。

窗口期内无其他发布。

---

## 3. 项目进展

今日 PR 吞吐量较高（269 个合并/关闭 vs. 231 个开放），反映出非常活跃的合并流水线。推进的显著方向如下：

**更新 / Doctor 工具链**（直接响应当前发布事故）：
- **#142672** `fix(update): preserve Doctor diagnostics when finalization times out`
- **#142675** `fix(doctor): omit unrelated diagnostics during update repair`
- **#142668** `feat(doctor): diagnose Tailscale mobile pairing readiness`（关闭 #142531）
- **#142631** `fix(update): restart Git installs upgrading from 2026.9.1`

**Codex 运行时加固：**
- **#142628** `fix(codex): reuse completed OAuth access rotations`（取代 #122566）
- **#142670** `fix(codex): prevent native node inference failures under managed sandbox policy`
- **#142621** `fix(codex): tolerate transient native-home auth state on homeScope=user`

**性能 / 可扩展性：**
- **#142534** `fix(state): gate SQLite integrity checks to explicit verification paths` — 解决 632 智能体安装环境下 `sweepCronRunSessions` 导致的 14–76 秒事件循环阻塞
- **#141869** `fix: configured model fallbacks are skipped when the primary model times out`
- **#142500** `fix(plugins): reuse prewarmed catalog presentation`

**Web UI 打磨批次**（主要由维护者 @vyctorbrzezowski + @steipete 完成）：#142635（消息宽度）、#142671（文件附件位置）、#142555（技能阅读器中的 ClawHub Markdown）、#142540（技能导入源控制）、#142536 / #142658 / #142667 / #142613（编写器与手机布局）、#142422（水合后重复的最终回复）、#142674（Mac 文本编辑快捷键）。

**渠道插件修复：** #142678（IMAP 纯 HTML 消息）、#138537（工作板在 blocked 状态下误报 `isError`）、#142679（Crabbox 宣告 Windows WSL2 工作节点）。

**CI / 开发基础设施：** #141851（托管限额下的 macOS CodeQL）、#142645（e2e 引导诊断）、#142677（标注器文档拆分）、#142659（共享发布说明测试夹具）。

此前开放的 UI PR **#142550** `fix(ui): size skill readers to content and compact headers` 今日被**关闭**（很可能被堆叠式系列 #142555 → #142540 → #142536 取代）。

---

## 4. 社区热点话题

最活跃的讨论串揭示了当前 OpenClaw 面临的**四大汇聚压力点**。

### (a) 智能体输出静默丢失
- **[#44925](https://github.com/openclaw/openclaw/issues/44925)** — "子智能体完成结果被静默丢失——无重试、无通知、超时后无自动重启" — **26 条评论**，diamond-lobster 级别，自 2026-03-13 开放至今。多种 E 码故障模式（E31/E42/E45…）在用户无感知的情况下丢弃结果。
- **[#119720](https://github.com/openclaw/openclaw/issues/119720)** — 大规模场景下同步智能体持久化阻塞 Gateway 事件循环 — **14 条评论**，同为 diamond-lobster 级别，此前有部分修复（#140231、#138984）但仍未关闭。
- **[#85251](https://github.com/openclaw/openclaw/issues/85251)** — Codex `notification:turn/started` 后陷入静默，使嵌入式运行在完整的 360 秒恢复窗口内卡住。

### (b) 2026.7→2026.9 系列的升级与迁移痛点
- **[#137813](https://github.com/openclaw/openclaw/issues/137813)**（已关闭）— Windows Gateway 在 2026.9.1 后永远无法启动（`--task-supervisor` 静默退出码 0）。**12 条评论**。
- **[#133984](https://github.com/openclaw/openclaw/issues/133984)**（已关闭）— `2026.7.1-2 → 2026.8.1` 导致 Gateway 无法启动；`doctor --fix` 在非交互模式下跳过配置迁移。
- **[#134896](https://github.com/openclaw/openclaw/issues/134896)**（已关闭）— 2026.8.1 更新连锁：5 重阻塞重启链 + doctor 自引用故障。
- **[#139714](https://github.com/openclaw/openclaw/issues/139714)** — `update_runs` 记录已录入但从未收尾 → `openclaw status` 永远报告"更新进行中"。
- **[#141617](https://github.com/openclaw/openclaw/issues/141617)** — 2026.9.2 npm 更新在支持修复后仍卡在 requested/running。
- **[#139485](https://github.com/openclaw/openclaw/issues/139485)** — 托管升级在收尾仍处非终态时使 gateway 离线。
- **[#136203](https://github.com/openclaw/openclaw/issues/136203)**（已关闭）— Windows de-DE 2026.8.2 因遗留工作区状态导致 Doctor 阻塞。

### (c) Telegram 渠道记账
- **[#127229](https://github.com/openclaw/openclaw/issues/127229)** — Telegram watchdog 释放的持久更新被误标墓碑（diamond lobster）。
- **[#126246](https://github.com/openclaw/openclaw/issues/126246)** — Telegram 持久出站投递卡在 `send_attempt_started`。
- **[#139809](https://github.com/openclaw/openclaw/issues/139809)** — Telegram 未收到来自 Codex 的受保护密钥提示。
- **[#142037](https://github.com/openclaw/openclaw/issues/142037)** — 嵌入式运行时在 v2026.9.2 上将显式路由 Slack 回复记录为"静音"。
- **[#142336](https://github.com/openclaw/openclaw/issues/142336)** — 核心 `/dashboard` 在 2026.9.2+ 中遮蔽 Telegram Mini App 启动器。
- **[#142530](https://github.com/openclaw/openclaw/issues/142530)**（已关闭）— Telegram 动画/视频贴纸以空消息体到达。

### (d) 认证、提供方与信任边界
- **[#135111](https://github.com/openclaw/openclaw/issues/135111)** — v2026.8.1 / claude-sonnet-5 上间歇性出现 "Provider completed tool call with malformed JSON arguments" — **23 条评论**，自 2026.7.1-2 起回归。
- **[#115642](https://github.com/openclaw/openclaw/issues/115642)** — 订阅认证的计费冷却期超出故障持续时间；无基于探针的恢复机制。
- **[#138342](https://github.com/openclaw/openclaw/issues/138342)** — 官方 Discord 插件在 2026.9.1 中被 `openKeyedStore` 信任检查拒绝。
- **[#115367](https://github.com/openclaw/openclaw/issues/115367)** — 提供方拥有的读门要求 `origin: bundled`，但所有特权聊天界面现在均为外部插件。
- **[#136311](https://github.com/openclaw/openclaw/issues/136311)** — Gateway 每次启动都重新获取重建索引锁，累积了 19 GB 孤立的 `memory-reindex-*` 临时数据库。

**底层诉求：** 运维人员希望 OpenClaw 表现为一个*可恢复的运行时*，而非脆弱的守护进程——需要持久重试、幂等升级、可见的子智能体生命周期，以及按渠道的投递记账。

---

## 5. 缺陷与稳定性

### P0（发布阻塞）
| Issue | 标题 | 修复 PR？ |
|---|---|---|
| [~~#137813~~](https://github.com/openclaw/openclaw/issues/137813) | Windows gateway never starts after 2026.9.1 | **今日关闭** |
| [#115642](https://github.com/openclaw/openclaw/issues/115642) | Billing cooldown outlives the outage | 无关联 PR |
| [#140908](https://github.com/openclaw/openclaw/issues/140908) | `doctor --fix` fails with EACCES on `systemctl --user` under sudo -u | 无关联 PR |
| [#136203](https://github.com/openclaw/openclaw/issues/136203) | Windows de-DE 2026.8.2 upgrade leaves Doctor blocked | **今日关闭** |
| [#141617](https://github.com/openclaw/openclaw/issues/141617) | 2026.9.2 npm update stuck at requested/running | 无关联 PR |

### P1（高影响）
| Issue | 标题 | 修复 PR？ |
|---|---|---|
| [#44925](https://github.com/openclaw/openclaw/issues/44925) | Subagent completion silently lost | 关联 PR 开放中（#43367 链），无专项修复 |
| [#135111](https://github.com/openclaw/openclaw/issues/135111) | Malformed JSON tool-call args on v2026.8.1 | 无关联 PR |
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | Unreaped hook/tool child processes (zombies) | 无关联 PR |
| [#43367](https://github.com/openclaw/openclaw/issues/43367) | Multi-agent orchestration unstable (config overwrite, session-lock, detached children) | 关联 PR 开放中 |
| [#119720](https://github.com/openclaw/openclaw/issues/119720) | Sync persistence blocks event loop at scale | 部分修复：#140231、#138984 已落地；仍开放 |
| [#85251](https://github.com/openclaw/openclaw/issues/85251) | Codex `turn/started` then silent (wedge) | 无关联 PR |
| [#127229](https://github.com/openclaw/openclaw/issues/127229) | Telegram watchdog-released update tombstoned | 无关联 PR |
| [#127148](https://github.com/openclaw/openclaw/issues/127148) | Codex `sessions.compact` acquires 2nd app-server | 无关联 PR |
| [#136183](https://github.com/openclaw/openclaw/issues/136183) | ssh SIGTERM during banner (regression 2026.8.1→8.2) |

---

## 横向生态对比

# 跨项目对比报告 —— 个人 AI 助手 / 智能体开源生态
**快照日期：2026-09-09** | 来源：各项目社区摘要（OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw）

---

## 1. 生态概览

个人 AI 助手 / 智能体开源领域正围绕一种通用的运行时原型走向整合 —— 一个常驻的网关 / 守护进程，跨消息渠道、MCP 工具和本地沙箱编排 LLM 智能体 —— 而各项目则在部署形态（桌面、托管、集群）和供应商策略上寻求差异化。活跃度分布并不均匀：OpenClaw 的规模大约比任何一个同类项目高出一个数量级，并且是当前唯一在发布稳定版的项目，其余项目仍处于 Beta、加固或设计阶段。值得注意的是，相同的缺陷类别在不同代码库中反复出现 —— 升级流程无法收敛、智能体输出静默丢失、大规模下的事件循环阻塞、提示缓存抖动 —— 这表明它们已经成为生态层面的工程问题，而非单个项目的问题。MCP 显然已成为默认的集成层，多租户隔离正在成为其最尖锐的痛点。

---

## 2. 活跃度对比

*计数 = 各摘要中 24 小时窗口内更新的条目数。健康度评分为分析师根据分诊速度、事故负载、发布节奏和贡献者分布综合评定（1–10 分）。*

| 项目 | Issue（24h） | PR（24h） | PR 合并/关闭 | 发布状态 | 健康度评分 |
|---|---|---|---|---|---|
| **OpenClaw** | 500 | 500 | **269**（231 未关） | **v2026.9.3 已于 2026-09-09 发布** | **7/10** —— 稳定但承压；存在未解决的 P0（#115642、#140908、#141617） |
| **Hermes Agent** | 50 | 50 | 1 | 无；预发布加固阶段 | **6/10** —— 输入活跃，审查瓶颈（合并率 1/50）；存在 P1 Windows 更新缺陷 |
| **QwenPaw** | 30 | 45 | **24** | v2.2.1-beta.1（2026-09-08） | **7.5/10** —— 活跃且持续改进；50% Issue 当日关闭，无故障报告 |
| **ZeroClaw** | 24 | 47 | 3 | 无；最新为 v0.8.5 | **6/10** —— 工程健康，交付受限于 RFC 治理流程 |
| **IronClaw** | 2 | 11 | 3 | 无；重构正在主干落地 | **5/10** —— 安静的预发布窗口；单一贡献者总线因子风险 |

---

## 3. OpenClaw 的定位

**相对于同类项目的优势**
- **规模与分诊能力：** 每日触及 500 个 Issue / 500 个 PR，其中 269 个已合并 —— 约为最接近的同类项目（Hermes，50/50）的 10 倍，也是唯一在入库速度上快于流入速度的项目。
- **发布工程成熟度：** 隔离的候选态更新演练、遗弃运行的恢复、`doctor --fix` 工具链、以及托管式升级（OCM 风格）路径 —— 同类项目均无对等的运维能力；Hermes 仍在修复在错误 CWD 下运行的更新校验逻辑（#105145）。
- **覆盖广度：** 最广泛的渠道矩阵（Telegram、Slack、IMAP、Crabbox、Discord），并已验证的集群规模（一个 632 智能体的部署正在调试中）。
- **社区深度：** 多人维护者（@steipete、@vyctorbrzezowski 等）及分布式贡献者 —— 反观 Hermes（Xipong：单日 12+ PR）和 IronClaw（kirikov：近乎全部署名），均存在集中度风险。

**劣势**
- 2026.7→2026.9 期间发生的升级事故级联（多个已关闭的 P0 以及仍开放的 #141617、#139485）表明发布节奏已超过验证能力。
- 队列中最古老的未修补严重问题：#44925（子智能体完成结果静默丢失，自 3 月起开放，已有 26 条评论）和 #119720（同步持久化阻塞事件循环）。
- QwenPaw 以更少可见 P0 的情况下更快发布；ZeroClaw 正在设计更清晰的结构性方案（运行时拥有的会话、仅追加事件），OpenClaw 若要追平则需要补做改造。

**技术路线：** 单体 Gateway 守护进程 + 插件化渠道，采用基于演练的更新机制。Hermes 以桌面进程为先、自托管 LLM 亲和；IronClaw 将托管式 MCP 提供方打包为每个扩展一个 crate；QwenPaw 在 Hub 后面插件化记忆后端；ZeroClaw 通过 RFC 驱动模块化基底（WASM 插件、操作系统级沙箱）。

---

## 4. 共同的技术聚焦领域

| # | 主题 | 涉及项目 | 具体需求（依据） |
|---|---|---|---|
| 1 | **可恢复的更新 / 幂等迁移** | OpenClaw、Hermes | `update_runs` 无法收敛（#139714、#141617、#139485）；Windows 更新校验在错误 CWD 下执行（#105145/#105883） |
| 2 | **会话 / 智能体输出的静默丢失** | OpenClaw、QwenPaw、ZeroClaw | 子智能体结果被丢弃，无重试（#44925、#85251）；模型丢失自己的回复（#7579）；ACP 失败回合在会话切换时消失（#9333）；RFC #9487/#10526 作为结构性答案 |
| 3 | **大规模下的事件循环阻塞** | OpenClaw、QwenPaw | 632 智能体部署上 14–76 秒的阻塞（#119720、#142534）；桌面端 118–135 秒冻结，超时从未触发（#7363） |
| 4 | **MCP 隔离、作用域与拆除** | IronClaw、Hermes、QwenPaw | 托管 MCP 上的跨用户目录暴露（#6778 → PR #8090 按调用方密钥化）；anyio 传输重连死循环（#31987）；配置文件状态泄漏（#106005）；401 探测误分类（#7620/#7627） |
| 5 | **提示缓存稳定性与成本归属** | ZeroClaw、Hermes、（QwenPaw） | 一张图片清空缓存前缀（#10701）；裁剪使缓存失效（#10674/#10702）；缓存写入计费错误（PR #10716）；守护进程生命周期级成本会话 ID（#10700）；按对话的 `session_id` 实现缓存亲和（#106113） |
| 6 | **Windows / WSL 兼容性** | OpenClaw、Hermes、QwenPaw | WSL 盘符路径及 GPU/ANGLE 修复（Hermes）；`CREATE_NEW_PROCESS_GROUP` Shell 处理（#7554/#7598）；Windows 网关启动失败（#137813、#136203） |
| 7 | **多智能体 / 每智能体模型路由** | OpenClaw、QwenPaw、ZeroClaw | 编排不稳定（#43367）；智能体路由设置 + 每会话模型（#7501、#5992）；多智能体侧边栏 epic（#9727） |

---

## 5. 差异化分析

| 项目 | 功能聚焦 | 目标用户 | 架构特征 |
|---|---|---|---|
| **OpenClaw** | 渠道广度、集群更新编排、多智能体运维 | 常驻多渠道智能体网关的运营者（含 600+ 智能体部署、OCM 托管资产） | 单体 Gateway 守护进程；插件化渠道；候选态更新演练；doctor 工具链 |
| **Hermes Agent** | 桌面 UX / 性能、邮件网关会话、远程控制（`computer_use`） | 个人桌面重度用户，尤其是 Windows；自托管爱好者 | 桌面优先应用 + 网关；Ollama / LiteLLM 提供方亲和 |
| **IronClaw** | 托管式 MCP 提供方打包、多租户隔离、SEP-414 归因 | 托管平台 / 多主体运营者 | 每个打包扩展一个 crate；按调用方注册的注册表；智能体市场集成 |
| **QwenPaw** | 插件 / 技能市场、记忆后端插件化、多模态归一化 | 插件生态构建者；中英文用户；开源权重模型用户（qwen-35B-FP8） | 带运行时令牌边界的 Hub；OpenAI 兼容的内容块归一化；打包的记忆后端（OpenViking、ADBPG） |
| **ZeroClaw** | 沙箱化、治理、成本核算 | 架构导向的贡献者；安全敏感型部署 | RFC 驱动的基底：运行时拥有的会话、WASM 插件、操作系统级沙箱（Bubblewrap / Landlock / Seatbelt）、仅追加事件日志 |

核心对比：**OpenClaw 优化运维规模，ZeroClaw 优化架构正确性，QwenPaw 优化生态模块化，Hermes 优化终端桌面体验，IronClaw 优化多租户托管。**

---

## 6. 社区动能与成熟度

- **Tier 1 —— 超大规模、在压力下迭代：OpenClaw。** 2026.9.1→9.3 的补丁节奏仅在数天内完成，由 P0 事故驱动而非路线图；动能真实但偏被动响应。
- **Tier 2 —— 持续交付：QwenPaw。** 最佳的合并 / 入库比（24/45），具备自动化安装校验的 Beta 流水线（#7635），一半的 Issue 当日关闭。正在快速收敛至 2.2.1 稳定版。
- **Tier 2 —— 稳定中、预发布前：Hermes Agent。** 高质量的输入（24 小时内成对的 issue + 修复 PR），但 1/50 的合并率表明审查能力不匹配；正在形成 0.22「桌面性能与可靠性」发布主题。
- **Tier 2 —— 设计成熟、交付受限：ZeroClaw。** RFC 处于第 5–10 次修订，每篇 26–35 条评论；明确的瓶颈在于治理吞吐（#8692 决策队列、#10549 流程 RFC），而非工程本身。
- **Tier 3 —— 孵化期：IronClaw。** 由单一作者主导的审慎整合（7 月三个 PR 被同日替换）；社区参与近乎为零（≤2 条评论、零互动）。

成熟度解读：OpenClaw 在**运维**层面最成熟；ZeroClaw 在**流程**层面最成熟（可能过度流程化）；QwenPaw 展现出最佳的速率 / 稳定性平衡。

---

## 7. 趋势信号

1. **「可恢复运行时」契约已成为入场门槛。** 四个项目中最强烈的抱怨不是答错，而是**静默** —— 子智能体结果被丢弃、升级流程无法收敛、回合凭空消失。从第一天起就要为可重试、幂等的状态转换以及可见的终态而设计。
2. **Token 经济性正在成为一种可观测性特性。** 缓存前缀稳定性、缓存写入计费精度（1.25× / 2× TTL）、按对话的成本账本、会话亲和路由正在作为一等公民问题出现。智能体开发者应当像对待延迟一样对待成本的可观测化。
3. **MCP 既是集成前沿，也是失败前沿。** 早期就要假设多主体使用：按调用方目录密钥化（IronClaw）、干净的传输拆除（Hermes）、OAuth 与静态令牌的仲裁（QwenPaw），都是正在上演的教训。
4. **异步纪律决定规模上限。** 智能体事件循环上的阻塞型持久化是共同的 P0 类别 —— 它在 632 智能体规模下出现（OpenClaw），也在单一桌面用户上出现（QwenPaw，118 秒冻结）。在扩大并发之前，务必把持久化与回收移出主循环。
5. **Windows / WSL 是一等公民需求面，** 而非可忽略项 —— 五个项目中有三个在同一日发布了 Windows 特定的进程 / 更新修复。
6. **渠道广度会拖累交付核算。** OpenClaw 的 Telegram 持久投递 / 墓碑集群表明，每增加一个渠道都需要发件箱语义，而非尽力而为的发送。
7. **治理必须随社区规模扩展。** ZeroClaw 的 RFC 投票快照 churn 拖累了一个技术上很强的项目；OpenClaw 的 269 合并分诊机器是反例。流程债和技术债一样真实。

**给构建者的结论：** 持久性 + 成本遥测 + 多租户 MCP 隔离 + 非阻塞运行时，正在成为 2026 年末竞争性智能体框架的新基线栈。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — 项目摘要 (2026-09-09)

## 1. 今日概览

Hermes Agent 活动密集且高度集中,**过去 24 小时内有 50 个 issue 和 50 个 PR 更新**,除一个 PR 已合并外,其余 issue 和 PR 均保持开启状态。工作内容以**桌面端 bug 修复和性能改进**为主,重点聚焦** Windows 专属缺陷**(更新校验、WSL 路径解析、GPU/ANGLE)以及** MCP 工具集成问题**。邮件网关也在围绕"按邮件主题隔离会话"进行积极的重构。尽管活动量很大,**并未发布新版本**,说明项目正处于下一个版本发布前的稳定化阶段。

## 2. 版本发布

过去 24 小时内无新版本发布。(无版本报告。)

## 3. 项目进展

**已合并/已关闭 PR:** 1 个(今日更新的 50 个中)

已合并的 PR 未在展示的前 20 列表中详述。在剩余 49 个仍开放的 PR 中,最重要的进展集中在两个领域:

- **邮件网关线程/定时任务修复** — [#103196](https://github.com/NousResearch/hermes-agent/pull/103196) 引入了按主题作用域的会话,支持 `/new` 重置和自动轮换;[#104625](https://github.com/NousResearch/hermes-agent/pull/104625) 和 [#100583](https://github.com/NousResearch/hermes-agent/pull/100583) 修复了定时任务报告继承发送者主题的问题。
- **桌面端性能与正确性** — 来自贡献者 Xipong 的一系列协同 PR,涵盖:MCP 健康扫描合并([#106136](https://github.com/NousResearch/hermes-agent/pull/106136))、并发花名册/资料获取([#106134](https://github.com/NousResearch/hermes-agent/pull/106134))、SSH 平台探测复用([#106132](https://github.com/NousResearch/hermes-agent/pull/106132))、WSL 盘符路径短路([#106130](https://github.com/NousResearch/hermes-agent/pull/106130))、流式过程中的工具调用索引([#106126](https://github.com/NousResearch/hermes-agent/pull/106126))、机器人中继保留清理([#106037](https://github.com/NousResearch/hermes-agent/pull/106037), [#106038](https://github.com/NousResearch/hermes-agent/pull/106038))、状态栏稳定化([#106040](https://github.com/NousResearch/hermes-agent/pull/106040)),以及草稿建议生命周期修复([#106041](https://github.com/NousResearch/hermes-agent/pull/106041), [#106042](https://github.com/NousResearch/hermes-agent/pull/106042))。
- **网关可靠性** — [#106142](https://github.com/NousResearch/hermes-agent/pull/106142) 将全局广播与慢速对端隔离;[#106161](https://github.com/NousResearch/hermes-agent/pull/106161) 在工具边界刷新 TTS 确认。
- **更新管线加固** — [#105883](https://github.com/NousResearch/hermes-agent/pull/105883) 在 stash-restore 时校验网关配置属性契约,防止 Windows 上更新后网关崩溃。

## 4. 社区热点话题

互动量最高的是一项长期存在的 Windows 更新 bug:

- **[#105145](https://github.com/NousResearch/hermes-agent/issues/105145) — Windows 桌面端 `hermes update` 始终报告 FAILED(退出码 8)(14 条评论)。** 更新后校验步骤在错误的工作目录中执行(`$HERMES_HOME` 而非安装根目录)。已标记为 P1 并正在积极分诊;[#106097](https://github.com/NousResearch/hermes-agent/issues/106097) 是同日提交的重复 issue,[#105883](https://github.com/NousResearch/hermes-agent/pull/105883) 是对应的 Windows 修复 PR。

其他讨论聚类:
- **MCP 连接可靠性** — [#31987](https://github.com/NousResearch/hermes-agent/issues/31987)(5 条评论)报告 HTTP `streamable_http_client` 清理时的 anyio `RuntimeError`,触发重连循环;[#106005](https://github.com/NousResearch/hermes-agent/issues/106005)(3 条评论)发现多路复用配置间共享 MCP 状态;[#101007](https://github.com/NousResearch/hermes-agent/issues/101007)(2 条评论)报告 `mcp_servers.<name>.lazy` 因 `ttl_ms: 0` 永远不会触发。底层需求是:**按配置隔离并干净地清理 MCP 传输**,以保证多配置工作流的稳定性。
- **自托管网关的提示缓存局部性** — [#106113](https://github.com/NousResearch/hermes-agent/issues/106113) 请求在 chat-completion 元数据中转发按会话的 `session_id`,以实现部署亲和性(LiteLLM Proxy 模式)。

## 5. Bug 与稳定性

过去 24 小时内报告,按严重程度排序:

| 严重程度 | Issue | 标题 | 修复 PR? |
|---|---|---|---|
| P1 | [#105145](https://github.com/NousResearch/hermes-agent/issues/105145), [#106097](https://github.com/NousResearch/hermes-agent/issues/106097) | Windows 桌面更新始终报告 FAILED — CWD 错误 | [#105883](https://github.com/NousResearch/hermes-agent/pull/105883) |
| P2 | [#31987](https://github.com/NousResearch/hermes-agent/issues/31987) | MCP HTTP 传输 anyio RuntimeError 导致重连循环 | 无 |
| P2 | [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) | 多路复用配置未限定作用域 — 仅首个配置获得 MCP 工具 | 无 |
| P2 | [#101007](https://github.com/NousResearch/hermes-agent/issues/101007) | `mcp_servers.<name>.lazy` 永不触发(`ttl_ms: 0`) | 无 |
| P2 | [#106009](https://github.com/NousResearch/hermes-agent/issues/106009) | 桌面端会话侧边栏宽度接近零;focus_pane 无效 | 无 |
| P2 | [#106063](https://github.com/NousResearch/hermes-agent/issues/106063) | 快捷命令别名 → 技能在桌面/TUI 上永不运行 | 无 |
| P2 | [#106066](https://github.com/NousResearch/hermes-agent/issues/106066) | WhatsApp 引用解析器在 `ephemeralMessage` 中丢失文本 | 无 |
| P2 | [#106120](https://github.com/NousResearch/hermes-agent/issues/106120) | 长度延续重试使 prompt 变长,4 次尝试更糟 | 无 |
| P2 | [#106010](https://github.com/NousResearch/hermes-agent/issues/106010) | 自重构后辅助 `provider: ollama` + 空 `api_key` 报错 | 无 |
| P2 | [#106096](https://github.com/NousResearch/hermes-agent/issues/106096) | `cron.update_job` 在切换为周期任务后仍保留 `repeat.times=1` | 无 |
| P2 | [#106077](https://github.com/NousResearch/hermes-agent/issues/106077) | 压缩在摘要前丢弃澄清回答 | 无 |
| P2 | [#106103](https://github.com/NousResearch/hermes-agent/issues/106103) | CI 公告公共面检查可能超时阻塞 Windows 任务 | 无 |
| P3 | [#70444](https://github.com/NousResearch/hermes-agent/issues/70444), [#103569](https://github.com/NousResearch/hermes-agent/issues/103569), [#106117](https://github.com/NousResearch/hermes-agent/issues/106117), [#106098](https://github.com/NousResearch/hermes-agent/issues/106098), [#106127](https://github.com/NousResearch/hermes-agent/issues/106127), [#106129](https://github.com/NousResearch/hermes-agent/issues/106129), [#106131](https://github.com/NousResearch/hermes-agent/issues/106131), [#106135](https://github.com/NousResearch/hermes-agent/issues/106135), [#45709](https://github.com/NousResearch/hermes-agent/issues/45709) | 桌面 UI 回归以及飞书/WhatsApp 边缘情况 | 多项有 Xipong 对应的修复 PR |

**稳定性信号:** 多个 issue 源于近期的重构(例如 [#106010](https://github.com/NousResearch/hermes-agent/issues/106010) 中的 `auxiliary_client`、[#106077](https://github.com/NousResearch/hermes-agent/issues/106077) 中的 `compression`),提示**末期内部清理带来的回归风险**,应当配套更强的发布测试覆盖。

## 6. 功能请求与路线图信号

开放的功能请求及可能的下一版本候选:

- **[#103196](https://github.com/NousResearch/hermes-agent/pull/103196) — 邮件:按主题作用域的会话,支持 `/new` 重置和自动轮换。** 鉴于同作者的配套修复 PR([#104625](https://github.com/NousResearch/hermes-agent/pull/104625), [#100583](https://github.com/NousResearch/hermes-agent/pull/100583)),是下一小版本的有力候选。
- **[#103653](https://github.com/NousResearch/hermes-agent/pull/103653) — `computer_use` 提供方工厂接缝和远程桌面传输。** 目标为 `main`;与远程控制工作流相关。
- **[#93180](https://github.com/NousResearch/hermes-agent/pull/93180) — 仪表盘鉴权:通过 `supports_request_auth` 实现受信反向代理(`X-Remote-User`)。** 增加了一个安全友好的鉴权接缝;已标记 `needs-decision` — 可能延后等待设计评审。
- **[#106113](https://github.com/NousResearch/hermes-agent/issues/106113) — 在 chat-completions 元数据中按会话传递 `session_id`**,用于自托管网关上的提示缓存局部性。
- **[#106152](https://github.com/NousResearch/hermes-agent/pull/106152) — 桌面面板标签:Chrome 风格弧形标签,带悬停预览。** UX/可视化功能。

**聚焦性能的 PR**([#106134](https://github.com/NousResearch/hermes-agent/pull/106134), [#106126](https://github.com/NousResearch/hermes-agent/pull/106126), [#106062](https://github.com/NousResearch/hermes-agent/issues/106062), [#106123](https://github.com/NousResearch/hermes-agent/issues/106123), [#106125](https://github.com/NousResearch/hermes-agent/issues/106125), [#106064](https://github.com/NousResearch/hermes-agent/issues/106064)) 表明** 0.22 版本以"桌面性能与可靠性"为主题** 的方向正在浮现。

## 7. 用户反馈摘要

实际使用中用户反馈的痛点:

- **Windows 更新/安装流程脆弱。** 24 小时内出现两个 P1 bug 均与 `hermes update` 的更新后校验有关(CWD 错误),此外还有通用的更新 stash 竞态;用户不得不手动审计自己的安装(见 [#45556](https://github.com/NousResearch/hermes-agent/issues/45556))。
- **MCP 是高价值但高度脆弱的集成。** 三种独立的失败模式(传输清理锁、配置作用域、惰性初始化 `ttl_ms`)表明用户正将 MCP 运行在非平凡的拓扑中(多配置、HTTP、惰性)。
- **消息投递网关仍有边缘情况。** WhatsApp 在 `ephemeralMessage` 上的引用解析([#106066](https://github.com/NousResearch/hermes-agent/issues/106066))以及飞书 `kanban notify-subscribe` 的静默丢弃([#103569](https://github.com/NousResearch/hermes-agent/issues/103569))暴露出平台协议解析的缺口。
- **桌面端 UX 回归导致真实的操作迷失感。** 项目列表重排序([#70444](https://github.com/NousResearch/hermes-agent/issues/70444))、零宽度侧边栏([#106009](https://github.com/NousResearch/hermes-agent/issues/106009)),以及快捷命令别名静默跳过技能执行([#106063](https://github.com/NousResearch/hermes-agent/issues/106063))都破坏了肌肉记忆。
- **压缩会丢失决策上下文。** [#106077](https://github.com/NousResearch/hermes-agent/issues/106077) 突出了一个企业级关切:摘要器永远看不到澄清回答,打破了决策连续性。
- **持续的贡献者活跃度**(尤其是 Xipong 一天内提交的 12+ 桌面 PR)和 kiwipaulrob 的邮件重构表明**社区对桌面端和网关层面的投入** — 对产品方向的满意度足够高,以至于贡献者在同一 24 小时窗口内同时提交成对的 issue 与修复。

## 8. 待办观察

仍然开放、值得维护者关注的长期 issue:

- **[#31987](https://github.com/NousResearch/hermes-agent/issues/31987)** — MCP HTTP `streamable_http_client` 清理 RuntimeError(自 2026-05-25 起开放,5 条评论)。无 PR。这是一个真实的生产级 MCP 可靠性阻塞。
- **[#45709](https://github.com/NousResearch/hermes-agent/issues/45709)** — Hermes Link 未能同步已附会话中源自 Web 的消息(自 2026-06-13 起开放)。跨面同步 bug,PR 队列中无活动。
- **[#70444](https://github.com/NousResearch/hermes-agent/issues/70444)** — 桌面端项目列表重排序(自 2026-07-24 起开放)。影响 UX;尽管有 `needs-decision` 标签,仍无 PR。
- **[#45556](https://github.com/NousResearch/hermes-agent/issues/45556)** — 本地审计记录到不安全的 CLI CWD 变通方法仍可观察到,且陈旧的更新缓存会产生错误的"落后"计数。`needs-repro`。
- **[#81707](https://github.com/NousResearch/hermes-agent/pull/81707)** — WhatsApp 快速文本合并 message-id 传递(自 2026-08-08 起开放)。长期 P2 PR,等待评审。
- **[#93180](https://github.com/NousResearch/hermes-agent/pull/93180)** — 仪表盘反向代理鉴权接缝(自 2026-08-23 起开放)。已标记 `needs-decision`;这是一个与安全相关的功能,不应停滞。
- **[#105145](https://github.com/NousResearch/hermes-agent/issues/105145)** — 尽管已有进行中的修复 PR([#105883](https://github.com/NousResearch/hermes-agent/pull/105883))以及同日提交的重复 issue([#106097](https://github.com/NousResearch/hermes-agent/issues/106097)),但该 P1 Windows 更新失败仍是项目中信号最强的 issue — **应优先纳入下一个补丁版本。**

---

**结论:** Hermes Agent 正处于积极的硬化阶段。桌面端/性能的协同工作正在收敛,MCP 和 Windows 更新路径是最显眼的痛点;一个将邮件线程重构与 Windows 更新修复打包的版本发布,将有意义地重置用户信心。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目简报 — 2026-09-09

## 1. 今日概览

IronClaw 今日呈现出高速运转、几乎由单一贡献者驱动的一天，活动集中在 **hosted-MCP 扩展层**。过去 24 小时内共有 11 个 PR 更新（3 个关闭、8 个开启），另有 2 个 issue 更新，且**没有发布任何新版本**。几乎所有活动都出自同一位作者（`kirikov`）之手——他既是两个 open issue 的提交者，也在主导一场针对 hosted-MCP 工具目录与 provider 捆绑模型的成体系重写。七月时期的旧 PR 被关闭并旋即被当天提交的替代 PR 顶替，这种模式表明这是一场进行中的重构，而非例行维护。今日没有版本发布，说明变更仍在持续合入主干，尚未打 tag 切出版本。

## 2. 版本发布

*过去 24 小时内没有新版本发布。* 依据简报规则，本节省略。

## 3. 项目进展

今日关闭了三个 PR，均属于朝着更整洁的 hosted-MCP 设计进行的一次有意识的整合：

- **[#8083](https://github.com/nearai/ironclaw/pull/8083) — 已关闭**：`fix(extensions): merge discovered hosted-MCP catalogs instead of replacing them`。该修复方案被否决，以让位于更严格的按调用方（per-caller）键控策略；实际上已被 [#8090](https://github.com/nearai/ironclaw/pull/8090) 取代——后者用另一种设计解决了同一类 bug（按调用方作为键，而非按追加进行合并）。
- **[#6760](https://github.com/nearai/ironclaw/pull/6760) — 已关闭**：`feat(extensions): bundle the agent-market marketplace extension (env-configurable server URL)`。关闭原因是**在形态上已被取代**，其原有意图由 [#8089](https://github.com/nearai/ironclaw/pull/8089) 延续，后者采用了原 PR 提交之后引入的新约定——“每个捆绑扩展对应一个 crate”。
- **[#6759](https://github.com/nearai/ironclaw/pull/6759) — 已关闭**：`feat(mcp): SEP-414 `_meta` attribution on outbound hosted-MCP tools/list + tools/call`。关闭时明确注明需要 rebase。功能上由 [#8084](https://github.com/nearai/ironclaw/pull/8084) 接棒，后者将该特性重新表述为**按 provider manifest 选择性启用**，而非全局开启。

净效果：hosted-MCP 技术栈正围绕**按调用方划定作用域**、**可选启用元数据**以及统一的捆绑扩展打包约定收紧。今日没有合并任何面向用户的功能。

## 4. 社区热点话题

以绝对数量衡量，互动度不高（没有任何条目的评论超过 2 条，也没有任何条目收到 👍 反应），但话题层面的高度集中值得注意：

- **[#6778](https://github.com/nearai/ironclaw/issues/6778)** — *2 条评论*。当日讨论最热烈的议题。提出了一个真实的多租户安全隐患：在 hosted-MCP 服务器上，一个用户的 `tools/list` 发现结果会覆盖另一个用户的结果。关联到修复链 [#8083](https://github.com/nearai/ironclaw/pull/8083) → [#8090](https://github.com/nearai/ironclaw/pull/8090)。
- **[#8086](https://github.com/nearai/ironclaw/issues/8086)** — *0 条评论，但为今日新开*。一个面向运维人员的 CLI 可观测性缺口：`ironclaw skills list` 看不到运行时写入的技能，把排障者引上了歧途。目前尚无关联 PR。
- **hosted-MCP 主题主导了当前队列。** 在 11 个 PR 中，有 6 个的作用域限定在 `mcp` / `extensions`，针对 hosted-MCP 行为。反复出现的横切关注点是**共享同一 hosted-MCP 服务器的各主体之间的隔离**；在过去约 36 小时内，它已经催生出 1 个 issue、2 个被取代的修复 PR 和 1 个仍在活跃的修复 PR。

背后的社区需求很明确：部署正从单用户场景走向多主体场景，而目前以扩展 ID 为键的注册表在粒度上是错的。

## 5. Bug 与稳定性

按严重程度与影响范围排序：

| # | 严重程度 | 条目 | 状态 | 修复 PR |
|---|----------|------|--------|--------|
| 1 | **高 — 安全/数据隔离** | [#6778](https://github.com/nearai/ironclaw/issues/6778)：hosted-MCP 上跨用户的工具目录暴露 | 未关闭 | [#8090](https://github.com/nearai/ironclaw/pull/8090) 未关闭 |
| 2 | **中 — 可观测性** | [#8086](https://github.com/nearai/ironclaw/issues/8086)：运行时安装的技能对 `ironclaw skills list` 不可见 | 未关闭 | 暂无 |
| 3 | **中 — 可安装性** | [#8085](https://github.com/nearai/ironclaw/pull/8085)：运维人员安装的包能构建却无法使用（manifest-schema 校验器不匹配） | 未关闭（PR） | PR 内自行修复 |
| 4 | **低 — 静默配置错误** | [#8088](https://github.com/nearai/ironclaw/pull/8088)：`FOO=` 与未设置的 `FOO` 被同等对待，掩盖了运维人员的拼写错误 | 未关闭（PR） | PR 内自行修复 |

今日数据中没有崩溃报告或回归。两个真正意义上的 bug（均为 issue 而非 PR）的合理根因分别在于注册表键的设计，以及 CLI 与运行时之间数据作用域的不对称。

## 6. 功能请求与路线图信号

虽然没有条目被正式标记为功能请求，但若干 open PR 可以看作面向未来的能力建设工作：

- **SEP-414 调用方归因**（[#8084](https://github.com/nearai/ironclaw/pull/8084)）— 为出站 hosted-MCP 调用提供按 provider 可选启用的元数据。预计将随下一个捆绑 hosted-MCP provider 包的版本一同发布。
- **文档附件的指针模式**（[#8082](https://github.com/nearai/ironclaw/pull/8082)）— 解决将 PDF 内联进模型上下文带来的约 25k token 开销；在任何会常态化处理附件的部署上线之前就应先行合入。
- **可配置的提示上下文上限**（[#8087](https://github.com/nearai/ironclaw/pull/8087)）— 将硬编码的 128k token 常量提升为运维人员可调的取值。风险低，对更大上下文的模型几乎是普遍收益。
- **Telegram Bot API 命令菜单**（[#8072](https://github.com/nearai/ironclaw/pull/8072)）— 在扩展激活时调用 `setMyCommands`，由 `thisisjoshford` 注册。面向 Telegram 渠道的持续 UX 打磨。
- **`agent-market` provider 包**（[#8089](https://github.com/nearai/ironclaw/pull/8089)）— 与安全修复相配合，补全捆绑的第一方 hosted-MCP provider 集合。

预测的下一版本形态：一次 hosted-MCP 加固版本，整合 #8090、#8084、#8088 与 #8089；#8082 和 #8087 紧随其后，作为独立的运维质量改进落地。

## 7. 用户反馈摘要

今日数据中没有第一人称的终端用户报告。现有的信号是 issue 作者以文字记录下来的运维/开发者痛点：

- **调试死角**：[#8086](https://github.com/nearai/ironclaw/issues/8086) — 技能缺失时，CLI 是最自然的第一站，但它对运行时安装的技能返回空列表，“把人引向了错误的问题”。
- **静默回退默认值**：[#8088](https://github.com/nearai/ironclaw/pull/8088) — 运维人员在对部署至关重要的环境变量（如端点覆盖）中打错字时，会静默落入默认值，而非显式报错。
- **多租户信任破坏**：[#6778](https://github.com/nearai/ironclaw/issues/6778) — 按扩展 ID 组织的注册表所隐含的契约，在 hosted-MCP 服务器上一旦涉及多个主体便会立即失效。

所提供的数据中没有暴露任何社区满意度或情绪指标；评论数偏少（每条目 ≤2 条、零反应）表明项目目前正处于发布前的静默窗口期，而非社区范围的讨论阶段。

## 8. 积压事项观察

过去 24 小时窗口内没有出现长期无人回应的条目。不过，有两个相邻条目值得维护者关注，因为它们**处于活跃状态但尚无修复路径**：

- **[#8086](https://github.com/nearai/ironclaw/issues/8086)** — 开启不足 24 小时、0 条评论、无关联 PR。这类 CLI/运行时可见性错位的问题容易越拖越糟，因为孤立地看，每一侧都“显得正确”。值得写一条 triage 备注，澄清究竟是运行时应当写入 CLI 的列举范围，还是 CLI 应当支持 `--user` / 作用域标志。
- **[#8085](https://github.com/nearai/ironclaw/pull/8085)** — 一个以 PR 形式提交的 bug 报告：运维人员安装的包能构建但无法使用，校验器与构造器在“哪些 manifest 来源可以携带内联动态描述符 schema”上各执一词。这种不对称会随着包来源的增多而恶化，因此它应当在 #8089 引入另一个捆绑 provider 之前先落地。

两条七月旧条目（[#6759](https://github.com/nearai/ironclaw/pull/6759)、[#6760](https://github.com/nearai/ironclaw/pull/6760)）今日已通过“被取代”方式了结——两者实际上都已移出积压清单，而不是无人应答。

---

*本简报基于 IronClaw 在 2026-09-09 的 GitHub 活动生成。所有 PR/issue 编号均链接至 github.com/nearai/ironclaw。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目简报 — 2026-09-09

## 1. 今日概览

QwenPaw 展现出较高的开发节奏，过去 24 小时内有 **30 个 Issue** 和 **45 个 PR** 更新，并发布了 **v2.2.1-beta.1** 预发布版本。维护者明显处于 2.2.x 系列的稳定阶段：大约一半的 Issue 流量在同一窗口内被关闭（15/30），且已合并的 PR 中很大一部分针对 v2.2.0 引入的回归和体验缺陷。当前代码库压力集中在三个领域——**第三方 OpenAI 兼容端点的多模态/内容块规范化**、**Windows 上的 Shell/沙箱进程隔离**以及**插件/技能市场的易用性**——三者今天都有已合并的修复。整体来看，项目健康度为**活跃且持续改善**，未出现大规模故障报告。

---

## 2. 版本发布

### v2.2.1-beta.1（Beta，发布于 2026-09-08）

2.2.1 系列的 beta 预发布版本。可见更新日志包括：

- **feat: 新增 agent 模型路由设置** — [#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)（作者 @zhaozhuang521）。引入委托 agent 所使用模型的可配置路由；与长期存在的 [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)（按会话覆盖模型，自 2026-07-12 起开放）配合使用。
- **docs: 更新官网 v2.2.0 内容** — [#7517](https://github.com/agentscope-ai/QwenPaw/pull/7517)（作者 @cuiyuebing）。
- **fix(chat): 流式传输期间同步已解析会话** — 部分作者 @zhaozhuang521。很可能与 [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610)("防止聊天提交绕过队列")中合并的修复相同——消息队列/流式同步的 Bug 正在运行时边界处得到修复。

**验证情况：** 发布值班 Issue [#7635](https://github.com/agentscope-ai/QwenPaw/issues/7635) 由 `github-actions[bot]` 开启，安装验证期限为 4 小时；该 Issue 已关闭，表明机器人流水线已顺利运行。

**升级说明：** 未列出明确的破坏性变更。由于这是 *beta* 版本，生产环境部署应继续停留在 v2.2.0，直至 2.2.1 稳定版发布。此版本正在修复 v2.2.0 中的若干回归（侧边栏重设计、队列绕过、模态框透明、MCP 401 探测），意味着升级风险较低，但仍建议在控制台 UI 和任何自定义 MCP 服务端上进行冒烟测试。

---

## 3. 项目进展

### 已合并/已关闭的 PR（节选，窗口内共关闭 24 个）

| 领域 | PR | 摘要 |
|---|---|---|
| 多模态规范化 | [#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) | 在请求规范化期间将 `application/pdf` 数据块视为媒体，使纯文本模型不会接收到 OpenAI 不支持的 `{"type":"file"}` 部分。与 [#7617](https://github.com/agentscope-ai/QwenPaw/issues/7617) 配合。 |
| 消息队列 | [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) | 新增由 `TaskTracker` 支持的聊天运行状态端点；将附件和重新提交路由到 localStorage 队列中，避免触发 409 错误。修复 [#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559)。 |
| Hub CLI 鉴权 | [#7631](https://github.com/agentscope-ai/QwenPaw/pull/7631) | 内置 CLI 命令（如 `qwenpaw agents list`）现在获取 Hub 运行时边界令牌，避免在本地沙箱内出现 401 失败。修复 [#7612](https://github.com/agentscope-ai/QwenPaw/issues/7612)。 |
| Shell 工具 | [#7598](https://github.com/agentscope-ai/QwenPaw/pull/7598) | 在 Windows 上将子进程 stdin 与交互式控制台分离，并新增 `CREATE_NEW_PROCESS_GROUP` 处理。修复 [#7554](https://github.com/agentscope-ai/QwenPaw/issues/7554)。 |
| MCP | [#7627](https://github.com/agentscope-ai/QwenPaw/pull/7627) | 允许旧版 MCP 握手对 401 "探测请求" 进行仲裁，避免静态令牌端点被错误标记为 "需要 OAuth"。修复 [#7620](https://github.com/agentscope-ai/QwenPaw/issues/7620)。 |
| 控制台 UI | [#7502](https://github.com/agentscope-ai/QwenPaw/pull/7502) | 重设计侧边栏和设置体验；将简易/完整侧边栏模式合并为一个可配置的侧边栏；保留插件插槽。 |
| 插件管理器 | [#7605](https://github.com/agentscope-ai/QwenPaw/pull/7605) | 在安装/更新后保留市场标签页/上下文，检测官方和社区插件的可更新版本，并新增批量更新。修复 [#7582](https://github.com/agentscope-ai/QwenPaw/issues/7582)。 |
| 本地化 | [#7482](https://github.com/agentscope-ai/QwenPaw/pull/7482) | 为 Agent Kanban PawApp 新增中英文本地化，遵循 QwenPaw 当前的语言设置。

### 推动路线图的开放 PR

- **记忆后端插件架构：** [#7616](https://github.com/agentscope-ai/QwenPaw/pull/7616) 完成了将 ADBPG 和 PowerContext 从核心迁移到独立打包的记忆插件的工作。
- **新记忆后端：** [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613) 新增可选的 **OpenViking** 长期记忆后端（基于来自 #7252 的 REST 范围）。
- **技能元数据：** [#7609](https://github.com/agentscope-ai/QwenPaw/pull/7609) 暴露可选的技能版本，并对 MCP/env/bin 声明进行校验，记录并跳过不可用的技能。
- **移动端 UX：** [#7623](https://github.com/agentscope-ai/QwenPaw/pull/7623) 在移动端侧边栏新增置顶 agent 入口。
- **按会话指定模型：** [#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992)（自 7 月 12 日开放）仍在评审中。

---

## 4. 社区热门话题

按过去 24 小时评论数量排序：

1. **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — 模型的回复意外从上下文中丢失（8 条评论，OPEN）。** 报告称 assistant 回复被持久化但在后续请求中消失，在 v2.2.0 上产生空响应。作者已验证 `_maybe_stamp_finished_at` 存在于 `runtime/executor.py` 中。这是一个会话状态持久化 Bug——当日影响力最大的开放 Issue，目前尚无修复 PR。
2. **[#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — 工具返回的 image/PDF 二进制以裸 base64（`"type":"data"`）触发 400（6 条评论，CLOSED）。** AI 协助起草；描述了与 OpenAI 兼容服务提供商之间的内容块形状不匹配。已关闭，很可能与 #7621 / #7636 同一 PDF 块规范化修复路径相关。
3. **[#7559](https://github.com/agentscope-ai/QwenPaw/issues/7559) — 任务执行期间新消息出现 409（5 条评论，CLOSED）。** 用户预期冲突：用户期望队列行为，服务端返回 `409 {"detail":"A task is already running"}`。在 [#7610](https://github.com/agentscope-ai/QwenPaw/pull/7610) 将提交重定向到现有队列后关闭。
4. **[#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — 同步调用冻结事件循环，超时永不触发（5 条评论，自 2026-08-27 起 OPEN）。** Windows Desktop 2.1.1b1 在启动时冻结 118–135 秒，发送时冻结约 126 秒。一个影响严重且长期开放的 Bug——参见*积压关注*部分。
5. **[#7469](https://github.com/agentscope-ai/QwenPaw/issues/7469) — ReMe 后台嵌入/索引任务失败：`as_embedding:default` 在启动前被访问（5 条评论，CLOSED）。** OpenAI 兼容嵌入上的静默失败。已关闭，但在可见数据中未关联明确的 PR。
6. **[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) — Heartbeat 定时任务会话反馈循环/消息重复堆积（4 条评论，OPEN）。** 作者标为高严重性：agent 约 2 小时无响应，需要人工干预。v2.0.1 上出现的回归在 `main` 分支上截至 2026-09-06 仍存在。
7. **[#7615](https://github.com/agentscope-ai/QwenPaw/issues/7615) — 在哪里咨询第三方插件/技能/部署问题（1 条评论，3 个反应，OPEN）。** 内容量较轻但是当日获得*最多反应*的条目——表明用户对更清晰的仓库外支持渠道存在需求，并指向 AgentScope Platform 社区。

**顶层条目背后的共同需求：** 用户希望 (a) 可靠的会话持久化，使模型能够"看到"自己先前的输出；(b) 在负载下以优雅的队列机制替代错误响应；(c) 事件循环/异步运行时真正遵守超时，而不是冻结 UI；(d) 更清晰的插件/技能问题归属渠道。

---

## 5. Bug 与稳定性

按用户报告的严重性排序：

### 高严重性 — 开放，未见已合并修复

- **[#7589](https://github.com/agentscope-ai/QwenPaw/issues/7589) — Heartbeat 定时任务重复消息堆积。** Agent 约 2 小时无响应。影响已部署的 v2.0.1；已在 `main` 分支上验证可复现。*未关联 PR。*
- **[#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — 模型从上下文中丢失自己的回复。** 持久化的会话历史与实时请求矛盾，产生空模型响应。*未关联 PR。*
- **[#7619](https://github.com/agentscope-ai/QwenPaw/issues/7619) — Windows 11 + qwen-35B-A3B-FP8 上会话意外结束。** 在 v2.2.0 上可复现；Issue 正文中无诊断数据。*未关联 PR。*
- **[#7625](https://github.com/agentscope-ai/QwenPaw/issues/7625) — 后台工具完成后 Gemini 400 错误。** "不支持以模型轮次结尾的请求"；在工具被卸载/中断后可复现。*未关联 PR。*
- **[#7363](https://github.com/agentscope-ai/QwenPaw/issues

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-09

## 1. 今日概览

ZeroClaw 在 2026-09-09 进行了密集的架构与稳定性工作：更新了 24 个 issue，待合并 PR 达 47 个，但未发布任何版本。活动主要围绕成熟的 RFC 讨论（会话、插件、沙箱、文件附件），多数已进入第 5/第 10 修订阶段；同时伴随一波围绕提示缓存失效和历史裁剪的 P1 缺陷报告，直接影响 token 成本与厂商兼容性。过去 24 小时内关闭了 3 个 PR，但队列中仍有大量 `needs-maintainer-review` 与 `needs-author-action` 状态的条目，表明该项目正处于深度设计打磨阶段，而非快速交付。

## 2. 版本发布

过去 24 小时内无新版本发布。数据集中最近被引用的版本为 `v0.8.5`（引用自 [Issue #10688](https://github.com/zeroclaw-labs/zeroclaw/issues/10688)）。

## 3. 项目进展

**过去 24 小时内合并/关闭的 PR：**

- **[PR #10718](https://github.com/zeroclaw-labs/zeroclaw/pull/10718) — `feat(cost): attribute ledger records to the chat conversation`**（已关闭）。通过修正守护进程生命周期的会话 ID，推进了按会话归因成本的工作；部分解决了 [Issue #10700](https://github.com/zeroclaw-labs/zeroclaw/issues/10700)，追踪关联仍待处理。
- **[PR #10719](https://github.com/zeroclaw-labs/zeroclaw/pull/10719) — `fix(providers): preserve tool image references through normalization`**（已关闭）。防止工具在发出图片标记时丢失原始路径/URL，从而帮助智能体交付或串联图片附件。
- **[PR #10717](https://github.com/zeroclaw-labs/zeroclaw/pull/10717) — `Feat/native security and helpers v2`**（已关闭）。横跨渠道、记忆、cron、运行时与厂商层的原生安全/辅助变更合集。

**审核中推进但仍待合并的值得关注的 PR：**

- [PR #10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716) — 按配置的写缓存溢价（Anthropic 1.25x / 2x TTL）对缓存写入计费，弥补了一项实际的成本追踪缺口。
- [PR #10605](https://github.com/zeroclaw-labs/zeroclaw/pull/10605) — 在 OpenAI 兼容网关上透传 Anthropic extended thinking，解锁 LiteLLM 风格的路由。
- [PR #9977](https://github.com/zeroclaw-labs/zeroclaw/pull/9977) — 受工作区限制的文件系统变更，并具备符号链接安全的强制约束。
- [PR #9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724) — 在审批策略中，`always_ask` 在完全自主模式下仍然生效。
- [PR #9320](https://github.com/zeroclaw-labs/zeroclaw/pull/9320) — 为 cron 智能体任务添加挂钟超时并释放锁。

## 4.

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*