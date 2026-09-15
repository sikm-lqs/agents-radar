# OpenClaw 生态日报 2026-09-15

> Issues: 434 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-15 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-15

## 1. 今日概览

OpenClaw 表现出**极高的分流/关闭速率但零发版产出**：过去 24 小时更新了 934 个条目（434 个 issue + 500 个 PR），净关闭 397 个（175 个 issue + 222 个 PR），新增活跃条目 537 个。尽管有如此高的流转，没有发布任何新版本——项目仍停留在 **2026.9.3 → 2026.9.4** 发布线上，并公开跟踪一个协调 issue（[#145252](https://github.com/openclaw/openclaw/issues/145252)），涵盖该发布线的更新/升级/Doctor/迁移/回滚/重启可靠性。issue 与 PR 共同的主导主题是 **Gateway 运行时稳定性**（内存泄漏、事件循环阻塞、僵尸进程、MCP stdio 清理、SQLite WAL 膨胀），仍有多个 P0 发版阻塞项处于开放状态。社区健康状况喜忧参半：许多 5.x 时代的回归问题终于被关闭，但仍有少量长期未解决的 P1「钻石龙虾」issue 悬而未决并持续引发大量讨论。

## 2. 发版

**过去 24 小时无新发版。** 当前发布线为 **2026.9.3 → 2026.9.4**。用户报告该线上多次更新失败：

- [#148614](https://github.com/openclaw/openclaw/issues/148614) — 在 2026.9.3 更新上出现 `runtime-verification-failed`（darwin/arm64）——**已关闭**。
- [#146637](https://github.com/openclaw/openclaw/issues/146637) — 2026.9.3 → 2026.9.4 npm 全局安装切换在 Linux Mint 上失败（P0）。
- [#146860](https://github.com/openclaw/openclaw/issues/146860) — Windows 计划任务（`LogonType: InteractiveToken`）托管更新交接停滞（P0）。
- [#145252](https://github.com/openclaw/openclaw/issues/145252) — 维护者跟踪 issue，针对 2026.9.3/9.4 可靠性。

**迁移说明：** 此前开放的多个 P0 多智能体/Codex 迁移崩溃循环（[#123326](https://github.com/openclaw/openclaw/issues/123326)）今天被关闭，表明部分缓解措施已发布但未显式提升版本号。

## 3. 项目进展

今日合并/关闭的活动主要由 **steipete**（维护者）主导，落地了一批针对 9.x 线的小型、精准修复（多为 XS/S 规模）。值得注意的落地工作：

**稳定性与运行时修复**
- [#149036](https://github.com/openclaw/openclaw/pull/149036) — 在子智能体派生中保留所选父模型（修复静默模型回退）。
- [#149038](https://github.com/openclaw/openclaw/pull/149038) — 恢复 Copilot 仅凭凭据的登录选项。
- [#149026](https://github.com/openclaw/openclaw/pull/149026) — 在 API 密钥设置提示中保留带点键名（`acme.weather`）；关闭 [#148994](https://github.com/openclaw/openclaw/issues/148994)。
- [#148993](https://github.com/openclaw/openclaw/pull/148993) — 持久化回合时避免冗余会话读取。
- [#148984](https://github.com/openclaw/openclaw/pull/148984) — 展示慢速 Codex 目录控制调用的耗时分布；关闭 [#148983](https://github.com/openclaw/openclaw/issues/148983)。
- [#148623](https://github.com/openclaw/openclaw/pull/148623) — 将项目注册表移除迁移到状态 worker（解除 Gateway 事件循环阻塞）。
- [#148919](https://github.com/openclaw/openclaw/pull/148919) — 在 worktree 清理时避免重复的 Git 扫描。
- [#148773](https://github.com/openclaw/openclaw/pull/148773) — 复用已编译的转录元数据查询。
- [#148948](https://github.com/openclaw/openclaw/pull/148948) — 将面板与进度卡写入排到原生智能体写入器预留队列之后。
- [#121022](https://github.com/openclaw/openclaw/pull/121022) — 在重启事件发出前完成 `config.patch` / `config.apply` RPC 响应；关闭 [#120408](https://github.com/openclaw/openclaw/issues/120408)。
- [#149005](https://github.com/openclaw/openclaw/pull/149005) — 等待自有 stdio 清理完成，避免过早超时（MCP/LSP 关闭）；修复 [#148998](https://github.com/openclaw/openclaw/issues/148998)。
- [#146645](https://github.com/openclaw/openclaw/pull/146645) — 在 systemd 启动期间保留 `${VAR}` 环境变量键（P0 修复，针对 `OPENCLAW_SERVICE_MANAGED_CONFIG` 变更检测）。
- [#148834](https://github.com/openclaw/openclaw/pull/148834) — 在 Doctor 中保留遗留目录修复逻辑。
- [#148248](https://github.com/openclaw/openclaw/pull/148248) — 侧边栏聊天不再因搜索会话历史而超时。

**测试与诊断**
- [#149035](https://github.com/openclaw/openclaw/pull/149035) — 在 Web UI 回归检查中区分模型就绪与账户健康。
- [#149039](https://github.com/openclaw/openclaw/pull/149039) — 模型测试夹具与运行时鉴权读取对齐。
- [#149031](https://github.com/openclaw/openclaw/pull/149031) — 覆盖回收与子中断持久化。
- [#149008](https://github.com/openclaw/openclaw/pull/149008) — 加速遗留更新器兼容性测试。
- [#149032](https://github.com/openclaw/openclaw/pull/149032) — 移除重复的 Copilot 注册表键（测试夹具修复）。
- [#148982](https://github.com/openclaw/openclaw/pull/148982) — 修复账户连接回归检查（已被 [#149023](https://github.com/openclaw/openclaw/pull/149023) 取代）。

**UX 与文档**
- [#147588](https://github.com/openclaw/openclaw/pull/147588) — 使用通俗语言描述更新检查（「Checking update health」「Checking Gateway startup」）。
- [#147557](https://github.com/openclaw/openclaw/pull/147557) — 在智能体指南中禁止分离式主机更新修复。
- [#137828](https://github.com/openclaw/openclaw/pull/137828) — 保留已确认的 worker 清理失败，避免重放（P1；仍开放，等待维护者评审）。

## 4. 社区热点话题

讨论最多的 issue（40、30、25、20 条评论）都共享同一个底层模式：**Gateway 事件循环正被同步的、紧耦合终端的工作所阻塞**，当这种情况发生时，用户无法获得可靠的投递或运行时指标。

- **[#25592（40 条评论，P1 🦞）](https://github.com/openclaw/openclaw/issues/25592)** — 工具调用之间的文本泄露到消息渠道。来自 `doomclaw` 的长期 UX 投诉，被标记为钻石龙虾，因为它涉及会话状态与安全边界（内部叙述被当作用户可见的渠道输出投递）。
- **[#97616（30 条评论，P1 🦪）](https://github.com/openclaw/openclaw/issues/97616)** — 未回收的 hook/工具子进程累积为僵尸，随时间推移降低运行时性能。事件循环阻塞主题的直接子问题。
- **[#91588（25 条评论，P1 🦪）](https://github.com/openclaw/openclaw/issues/91588)** — Gateway RSS 在数天内从 350MB 增长到 15.5GB；被 OOM kill 并陷入 `launchd-handoff` 重启循环。已标记 stale/needs-info；未关联修复 PR。
- **[#119720（20 条评论，P1 🦞）](https://github.com/openclaw/openclaw/issues/119720)** — 同步的智能体持久化/转录维护在大规模下阻塞 Gateway 事件循环。确认通过 [#140231](https://github.com/openclaw/openclaw/issues/140231) 和 [#138984](https://github.com/openclaw/openclaw/issues/138984) 部分修复，但重写仍在维护者评审中。
- **[#102175（19 条评论，P2 🐚）](https://github.com/openclaw/openclaw/issues/102175)** — 嵌入式提示缓存在房间事件、策略和 Responses 边界间失效，导致回合之间的工具清单发生变化。底层需求：长生命周期嵌入式会话的稳定 provider 缓存复用。
- **[#144911（16 条评论，P1 🦞）](https://github.com/openclaw/openclaw/issues/144911)** — MCP 服务器 `initialize` 超时触发未处理的拒绝「service child cleanup identity lost」，导致 Gateway 崩溃。
- **[#80520（13 条评论，已关闭 P1 🦐）](https://github.com/openclaw/openclaw/issues/80520)** — Telegram 消息静默丢失（无 `sendMessage` 日志）。今日关闭；反映了 [#125764](https://github.com/openclaw/openclaw/issues/125764) 中看到的 Telegram 适配器投递脆弱性。

在 PR 侧，**steipete** 主导的维护者驱动 XS/S 集群占据了「等待维护者查看」队列，信号表明项目处于**修复与精简**模式而非功能开发模式。

## 5. Bug 与稳定性

### 紧急（P0，发版阻塞）
| Issue | 状态 | 组件 | 修复 PR |
|---|---|---|---|
| [#146860](https://github.com/openclaw/openclaw/issues/146860) | 开放 | Windows 计划任务更新交接 | 未关联 |
| [#146637](https://github.com/openclaw/openclaw/issues/146637) | 开放 | npm 全局安装切换 9.3→9.4 | 未关联 |
| [#145252](https://github.com/openclaw/openclaw/issues/145252) | 开放（跟踪） | 9.3/9.4 更新可靠性索引 | n/a |
| [#143524](https://github.com/openclaw/openclaw/issues/143524) | 开放 | 智能体 SQLite WAL 增长至 1.4–2.8 GB | 未关联 |
| [#148614](https://github.com/openclaw/openclaw/issues/148614) | **已关闭** | 9.3 更新上的 `runtime-verification-failed` | — |
| [#123326](https://github.com/openclaw/openclaw/issues/123326) | **已关闭** | 多智能体 Codex 迁移启动崩溃循环 | — |

### 高优先级（P1）—— 开放，无明确修复 PR
- [#25592](https://github.com/openclaw/openclaw/issues/25592) 工具调用间文本泄漏（40 条评论）。
- [#97616](https://github.com/openclaw/openclaw/issues/97616) 僵尸子进程。
- [#91588](https://github.com/openclaw/openclaw/issues/91588) Gateway RSS OOM 泄漏（stale，需要信息）。
- [#119720](https://github.com/openclaw/openclaw/issues/119720) 同步持久化阻塞事件循环（部分修复已落地）。
- [#144911](https://github.com/openclaw/openclaw/issues/144911) MCP stdio 初始化超时崩溃。
- [#139847](https://github.com/openclaw/openclaw/issues/139847) 活动运行消息丢失——「no active tool authority snapshot」（2026.9.2 回归）。
- [#137332](https://github.com/openclaw/openclaw/issues/137332) 混合终端请求者结算批次无限重试。
- [#125764](https://github.com/openclaw/openclaw/issues/125764) Telegram 适配器单次尝试死信。
- [#125570](https://github.com/openclaw/openclaw/issues/125570) Skill Workshop 更新静默破坏技能路由。
- [#144809](https://github.com/openclaw/openclaw/issues/144809) claude-cli 回合超过 `RUN_STALE_TAKEOVER_MS` 时丢失整条回复。
- [#148755](https://github.com/openclaw/openclaw/issues/148755) 90 秒瞬态重试窗口被重试尝试本身耗尽。
- [#148614](https://github.com/openclaw/openclaw/issues/148614) —— 见上（已关闭）。

### 高优先级（P1）—— 今日随修复关闭
- [#148584](https://github.com/openclaw/openclaw/issues/148584) 插件自有的 CLI 后端在启动时被跳过 —— 已关闭。
- [#148680](https://github.com/openclaw/openclaw/issues/148680) Control UI TTS 补全未与源消息合并 —— 已关闭。
- [#145152](https://github.com/openclaw/openclaw/issues/145152) 卡死会话恢复报告将强制清除当作中止（2026.7.1）—— 已关闭。

### 中优先级（P2）回归，值得关注
- [#146004](https://github.com/openclaw/openclaw/issues/146004) 子智能体完成在 9.3 上触发虚假仪表板心跳。
- [#118839](https://github.com/openclaw/openclaw/issues/118839) `restart recovery claim changed before agent adoption` 在 2026.7.2-beta.7 上回归。
- [#146391](https://github.com/openclaw/openclaw/issues/146391) 全新 Groq 配置无法从外部插件解析清单模型。
- [#102175](https://github.com/openclaw/openclaw/issues/102175) 嵌入式提示缓存边界失效。
- [#112313](https://github.com/openclaw/openclaw/issues/112313) 已死信的外发投递队列条目永久保留（无 CLI/RPC/TTL 清除）。

## 6. 功能请求与路线图信号

- **[#143610](https://github.com/openclaw/openclaw/pull/143610)** — iOS 上的选中会话操作（撰写、发送确认、重连）。规模 XL，跨应用界面（iOS/macOS/Web-UI/Discord），维护者 `vincentkoc`。强烈信号表明 iOS 原生 UX 拉齐已列入 9.x 周期路线图。
- **[#148893](https://github.com/openclaw/openclaw/pull/148893)** — 沙箱文件工具与重叠挂载对齐（Windows + 后端特定路径）。表明针对 `openshell` / `mxc` 插件面的持续沙箱加固。
- **[#112820](https://github.com/openclaw/openclaw/pull/112820)** — 插件 SDK 方法 `api.runtime.talk.openSession(...)`，用于 Gateway 管理的实时语音（已关闭）。信号表明插件 SDK 是新的语音功能插件的预期集成面。
- **[#87584](https://github.com/openclaw/openclaw/issues/87584)** — 使群组房间事件引导可配置。当前硬编码在 `!isRoomEvent` 之后；2 👍 暗示来自多用户 Discord/Slack 部署的潜在需求。
- **[#51572](https://github.com/openclaw/openclaw/issues/51572)** — 在会话重置/剪枝（而非仅压缩）时触发 `session-memory` 钩子。长期（2026 年 3 月）功能请求；1 👍；与 [#119720](https://github.com/openclaw/openclaw/issues/119720) 中可见的更广泛会话生命周期重构一致。
- **[#60602](https://github.com/openclaw/openclaw/issues/60602)** — 多智能体成本归因的每智能体 Bedrock `requestMetadata`。**今日关闭**，暗示部分或替代方案已发布。

**下一版本（预计 2026.9.5）预测：** 维护者的 XS/S 集群指向维护/质量

---

## 横向生态对比

# 跨项目对比报告 —— 个人 AI 助手 / 智能体 开源生态

**日期：** 2026-09-15 | **分析项目：** OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

个人 AI 助手领域已收敛于一套通用架构：以消息渠道（Telegram、Discord、Slack、Matrix）和 Web/TUI 控制台为前端的常驻网关 / 守护进程运行时，MCP 作为事实上的工具集成层。活动呈现明显分化 —— OpenClaw 日均交互量约为同类项目的 10 倍，但处于修缮与精简的稳定化阶段；Hermes Agent 刚完成一次发布，QwenPaw 即将迎来以 Hub 为核心的版本，ZeroClaw 则处于发布前的硬化打磨期。工程前沿已从功能广度转向常驻运行时的运营可靠性：状态存储完整性、事件循环响应性、子进程生命周期、权限边界。IronClaw 是类别上的离群点 —— 作为评测框架，目前唯一的信号来源是自动化基准遥测。

---

## 2. 活跃度对比

| 项目 | Issue（24h：更新 / 关闭） | PR（24h：更新 / 关闭） | 发布状态 | 健康度评分 |
|---|---|---|---|---|
| **OpenClaw** | 434 / 175（40%） | 500 / 222（44%） | 无；卡在 2026.9.3→9.4 版本线，存在 **2 个阻塞升级的 P0 问题**（#146637、#146860） | **B−（关注）** —— 生态内吞吐最高，但零发版且 P1 债务累积 |
| **Hermes Agent** | 50 / 28（56%） | 50 / 23（46%） | **v0.21.3 于 9/14 发布**（约 338 个 PR 汇总，标签 `v2026.9.14`） | **A−** —— 发布节奏稳定，关闭率与流入量持平 |
| **IronClaw** | 1 / 0（自动化） | 0 / 0 | 无 | **C（监控）** —— 仅遥测；本窗口内无人工活动 |
| **QwenPaw** | 25 / 14（56%） | 50 / 27（54%） | 无；当前为 2.2.x，Hub 多租户 2.2.0 待发 | **B+** —— 合并速度强劲；存在 3 个 P0，含一个安全敏感的沙箱绕过 |
| **ZeroClaw** | 34 / 18（53%） | 50 / 16（32%） | 无；处于 v0.8.5 稳定化线（追踪单 #9459） | **B** —— 优先级清晰的发布前冲刺；S1 多模态簇未解决 |

*健康度评分 = f(吞吐、发布纪律、阻塞负载)。ZeroClaw 较低的 PR 关闭率反映的是排队等待 v0.8.5 的长期功能分支，而非审查停滞。*

---

## 3. OpenClaw 的定位

**社区规模 —— 高出一个数量级。** 日均更新约 934 条，对比同类 50–84 条；讨论线程最深（40/30/25/20 条评论，Hermes 最高 14 条）；追踪单 ID 深度约 149K，对比 ~111K（Hermes）、~11K（ZeroClaw）、~8K（IronClaw/QwenPaw） —— 作为代理指标并不完美，但方向毫无歧义。

**相对优势：**
- **最广泛的部署面：** npm / systemd / launchd / Windows Scheduled Task 安装路径；Telegram、Discord、Slack 适配器；iOS / macOS / Web UI；带语音能力 `openSession` API 的插件 SDK。
- **最强的维护者吞吐：** steipete 的外科手术式 XS/S 簇（子代理模型保留 #149036、MCP stdio 清理 #149005、systemd 环境变量处理 #146645）—— 24 小时内净关闭 397 条。
- **同类缺乏的企业级信号：** 逐 Agent 的 Bedrock 成本归因、沙箱重叠挂载硬化、iOS 原生对齐 PR（#143610，XL）。

**相对弱点：**
- **唯一未发版的主要项目。** Hermes 打了 338 个 PR 的稳定标签；OpenClaw 存在阻塞升级的 P0，且在**不升版本号**的情况下提交修复 —— 存在发布卫生与可维护性风险。
- **系统性运行时债务：** 同步持久化导致事件循环阻塞（#119720），RSS 增长 350MB→15.5GB（#91588），僵尸子进程（#97616），WAL 膨胀至 1.4–2.8GB（#143524） —— 这类缺陷与其 Node 风格单事件循环网关直接相关，与 ZeroClaw 的 Rust 监督模型形成对比。
- **长尾 P1 "钻石龙虾"问题**（如 #25592，40 条评论）吸引大量讨论但迟迟未修复。

**技术路线：** 渠道适配器优先的网关 + 插件 SDK（OpenClaw）vs 多路复用网关 + 商业模型路由（Hermes）vs Python Web 控制台 + MCP（QwenPaw）vs Rust 守护进程 + WIT-ABI 验证插件（ZeroClaw）。

---

## 4. 共同技术关注领域

| 关注领域 | 涉及项目 | 具体需求（证据） |
|---|---|---|
| **SQLite / 多写者下状态存储完整性** | OpenClaw、Hermes | WAL 膨胀 #143524、同步持久化 #119720；Hermes #100896 五周内 state.db 损坏 ×4 —— 都需要单写者语义 |
| **同步 I/O 阻塞事件循环** | OpenClaw、QwenPaw | OpenClaw #119720/#148623；QwenPaw #7786 —— NFS 文件浏览器冻结整个 WebUI 5–6 分钟 |
| **MCP 传输正确性** | OpenClaw、QwenPaw、Hermes | stdio 初始化崩溃 #144911；gzip 4xx 双重解压 #7735/#7787；服务器名不匹配 #111707 |
| **Telegram 作为生产级控制平面** | OpenClaw、Hermes、ZeroClaw | 静默丢包 / 死信（#80520、#125764）；CLOSE-WAIT 套接字误报"已连接"（#111727）；语音无界重试（#10863），群组会话作用域（#9772） |
| **取消 / 停止语义** | QwenPaw、OpenClaw、Hermes | 停止按钮无操作 → 409（#7567）；陈旧接管回复丢失（#144809）；生命周期守卫缺失（#110422） |
| **沙箱与权限硬化** | 全部 4 个活跃项目 | 通过 kimi-code `Write` schema 实现沙箱绕过（#7727 —— QwenPaw）；配置写保护的 CLI 绕过（#59293 —— Hermes）；WIT ABI 插件验证（#10746）、跨代理内存 ACL（#10252）、配对熵（#6613 —— ZeroClaw） |
| **提示缓存 / 上下文效率** | OpenClaw、Hermes、ZeroClaw | 跨边界缓存失效（#102175）；字节级稳定缓存标记（#111774）；模型窗口锚定的压缩（#9535） |
| **升级 / 监督进程可靠性** | OpenClaw、Hermes、ZeroClaw | 整个 OpenClaw 9.3→9.4 P0 集合；`fleet_restart_pending`（#111272）；Windows 守护进程重载恢复（#10792） |
| **模型快速接入（DeepSeek V4 Flash）** | QwenPaw、IronClaw | 与 IronClaw 将 43 项基准失败主要归因于该模型同期（#8100），能力目录新增（#7736） |

---

## 5. 差异化分析

| 维度 | OpenClaw | Hermes Agent | QwenPaw | ZeroClaw | IronClaw |
|---|---|---|---|---|---|
| **功能聚焦** | 渠道优先的个人助手、插件 SDK、iOS 对齐 | 网关 / profile 多路复用、Nous 模型路由与 Portal 计费 | Web 控制台体验、Hub 多租户、MCP 客户端 / 服务端 | 安全硬化、ZeroCode TUI、A2A 互操作、内存授权 | 基准失败分类法 |
| **目标用户** | 高阶用户 / 自托管玩家、跨操作系统、多渠道 | 自托管用户（Docker / NixOS / systemd）、Nous 生态 | 向多租户迁移的团队（Hub 2.2.0）、控制台为中心用户 | 安全敏感的运维者、桌面端 / Rust 用户 | 模型与智能体研究者 |
| **架构** | Node 风格事件循环网关、SQLite WAL、插件 SDK | 多路复用网关、`profiles/`、state.db | Python 技术栈（httpx）、Web 控制台 + 守护进程 | Rust 守护进程、监督进程、WIT/WASM 插件 ABI、有界日志 | 自动化 CI 风格评测流水线 |

最显著的架构分叉是运行时基底：OpenClaw 的事件循环瓶颈 vs ZeroClaw 的 Rust 监督模型。最显著的产品分叉是用户走向：个人（OpenClaw、Hermes）→ 团队（QwenPaw）→ 安全 / 互操作（ZeroClaw）→ 研究（IronClaw）。

---

## 6. 社区动能与成熟度

- **第一梯队 —— 庞大规模，进入稳定期：** **OpenClaw。** 最大的社区与分类处理机器，但当前模式是**关闭速度而非发版**。关键观察项：2026.9.5 是否能在清空 P0 阻塞后落地。
- **第二梯队 —— 快速迭代，持续发版：** **Hermes Agent**（发布纪律最佳；风险集中于自 7 月起未解决的 `needs-decision` 安全项 #59293）与 **QwenPaw**（合并超过新增；Hub 2.2.0 是催化剂；需为停止按钮 / NFS 的 P0 提供热修复）。
- **第二至第三梯队 —— 快速迭代，发布前夕：** **ZeroClaw。** PR 倾斜的流水线（34 个开放）面向 v0.8.5；相对其规模，流程信号异常成熟（RFC 精简、自动化风险标签、供应链卫生）。
- **休眠 / 自动化：** **IronClaw。** 一条机器人生成的遥测 issue；在得出维护者带宽结论前监控 48–72 小时。

---

## 7. 趋势信号

1. **运行时可操作性才是护城河，而非功能。** 内存泄漏、僵尸进程、状态存储损坏、事件循环阻塞主导了全部四个活跃项目。智能体网关就是守护进程，现在需要守护进程级的工程能力。
2. **Telegram 是生产级关键基础设施。** 三个项目出现投递静默失败或健康度误报 bug；用户需要反映真实套接字状态的健康检查、投递回执与有界重试。
3. **MCP 是基线配置；硬化已转向边缘场景** —— stdio 关闭、gzip 解码错误、服务器命名、健康状态持久化。
4. **智能体权限是安全前沿：** 沙箱守卫必须理解*每一个*运行器的工具调用 schema（QwenPaw 的绕过问题），保护层不能存在 CLI 形状的漏洞（Hermes），插件 / 内存访问需要 ABI 验证与 ACL（ZeroClaw）。
5. **个人 → 团队转型：** 多租户 Hub、Telegram 群组会话、房间事件引导 —— 助手品类正在走向协作化。
6. **模型迭代在数天内被吸收**（DeepSeek V4 Flash），IronClaw 的分类法表明任务失败主要源于*模型质量*而非框架 —— 模型选型对端到端成功的重要性已不亚于框架质量。
7. **对静默失败零容忍：** 最高互动量的 bug 都是*可见*的可靠性问题（流式截断、文件丢失），项目正在收敛于明确的"应该怎么做"错误提示。
8. **效率经济学：** 提示缓存稳定性、窗口锚定压缩、逐 Agent 成本归因独立出现在三个项目中。

**对智能体开发者的启示：** 从第一天起就为单写者状态、热点循环外的异步 I/O、子进程收割、有界重试做好预算；将取消与渠道投递视为一等特性；针对第三方运行器 schema 验证沙箱守卫；维护缓存稳定的上下文分层；将错误大声暴露而非静默回退。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-15

## 1. 今日概览

Hermes Agent 正处于高速发布窗口。**v0.21.3（标签 `v2026.9.14`）** 于 2026-09-14 发布，将自 v0.21.2 以来的大约 **338 个已合并 PR** 汇总为一个稳定的标签构建，用于 Docker/Cloud/托管部署,核心改动是远程网关登录修复。过去 24 小时活动显著：**50 个 issue** 和 **50 个 PR** 被更新，其中 **28 个 issue 关闭**、**23 个 PR 合并/关闭** —— issue 关闭率约 46%，PR 关闭率约 46%，表明团队正与新增负载保持同步。主导议题包括：(a) 状态存储可靠性（SQLite WAL 损坏、会话租约、消息投递回退），(b) 多路复用 profile 与外部监管进程（systemd、launchd、NixOS）下的网关可运维性，以及 (c) 跨平台一致性（Telegram、Slack、Discord、MCP/Desktop）。少数自 6/7 月遗留的长期项（#59293 安全问题、#39797 SOUL.md、#65604 write_file）虽被触及但仍未解决，表明它们需要维护者做出明确决策。

## 2. 发布

### v2026.9.14 — Hermes Agent v0.21.3 (2026-09-14)

- **类型：** 补丁。
- **范围：** 自 v0.21.2 以来约 338 个已合并 PR 的标签化汇总。非功能发布；其目的在于为 Docker 镜像、Hermes Cloud 及托管下游消费者提供一个稳定、可复现的构建。
- **核心改动：** 远程网关登录修复（参见更新日志）。
- **破坏性变更：** 无。
- **迁移说明：**
  - 标准 `hermes update` 流程会在新代码上重启网关；若更新后重启路径遗留 `fleet_restart_pending` 标记，请参见 [Issue #111272](https://github.com/NousResearch/hermes-agent/issues/111272)（已于本窗口修复）。
  - 已使用近期 `main` 的用户无需操作；此标签实质上是 `main @ 2026-09-14` 加登录加固。

## 3. 项目进展

过去 24 小时合并/关闭（精选要点，除标注外均为本周期 PR）：

| PR | 标题 | 修复 Issue |
|---|---|---|
| [#111351](https://github.com/NousResearch/hermes-agent/pull/111351) | 归档 Bot Chat 不再锁定其标题 | [#110871](https://github.com/NousResearch/hermes-agent/issues/110871) |
| [#111348](https://github.com/NousResearch/hermes-agent/pull/111348) | 泄露的 `<\|eos\|>` 哨兵不再隐藏 MEDIA 附件 | [#111046](https://github.com/NousResearch/hermes-agent/issues/111046) |
| [#111844](https://github.com/NousResearch/hermes-agent/pull/111844) | Cron "script not found" 展示 per-profile 查找路径；在创建时拒绝非法任务 | [#94821](https://github.com/NousResearch/hermes-agent/issues/94821)，复用 [#105775](https://github.com/NousResearch/hermes-agent/pull/105775) |
| [#111840](https://github.com/NousResearch/hermes-agent/pull/111840) | Nous 路由覆写在缺少 profile scope 时 fail closed | 跟进 [#111809](https://github.com/NousResearch/hermes-agent/issues/111809)（评审中的两个 P1） |
| [#111831](https://github.com/NousResearch/hermes-agent/pull/111831) | Telegram: CJK 可选用原生富文本消息 | 复用 [#56155](https://github.com/NousResearch/hermes-agent/pull/56155)；同时关闭较早的 [#62448](https://github.com/NousResearch/hermes-agent/pull/62448) 与 [#85197](https://github.com/NousResearch/hermes-agent/pull/85197) |
| [#110281](https://github.com/NousResearch/hermes-agent/pull/110281) | Bot Screen 忽略过期的 `display.status` 应答 | [#110037](https://github.com/NousResearch/hermes-agent/issues/110037) |
| [#109297](https://github.com/NousResearch/hermes-agent/pull/109297) | Kanban 在会话重连时回放补全结果 | （会话状态清理） |
| [#111837](https://github.com/NousResearch/hermes-agent/pull/111837) | Desktop MCP 健康检查暂停在重启后被遵守 | [#111830](https://github.com/NousResearch/hermes-agent/issues/111830) 的伴随修复 |
| [#105775](https://github.com/NousResearch/hermes-agent/pull/105775) | 校验 cron 脚本存在性并修正错误信息中 profile 感知路径 | [#105761](https://github.com/NousResearch/hermes-agent/issues/105761) |
| [#109231](https://github.com/NousResearch/hermes-agent/pull/109231) | 将启动别名 `base_url` 合并到 `_explicit_base_url` | [#107191](https://github.com/NousResearch/hermes-agent/issues/107191)、[#103933](https://github.com/NousResearch/hermes-agent/issues/103933) |
| [#111838](https://github.com/NousResearch/hermes-agent/pull/111838) | 文档：使 delegation 文档与代码默认值保持一致 | （文档漂移） |

**推进中的功能（开放）：**
- [#111413](https://github.com/NousResearch/hermes-agent/pull/111413) `profile clone --sync-imports`（基于 [#88855](https://github.com/NousResearch/hermes-agent/issues/88855) 叠加）。
- [#111834](https://github.com/NousResearch/hermes-agent/pull/111834) `delegate_task` 配额壁垒梯降（`delegation.descent_order`）。
- [#111849](https://github.com/NousResearch/hermes-agent/pull/111849) 原子化 `hermes kanban ensure-escalation` 以去重 `[ESC]` 卡片。
- [#111850](https://github.com/NousResearch/hermes-agent/pull/111850) 平台设置值改走 `.env` 而非 `config.yaml`。
- [#111851](https://github.com/NousResearch/hermes-agent/pull/111851) 推理模型放弃时面向用户的"该怎么办"提示（针对 [#61128](https://github.com/NousResearch/hermes-agent/issues/61128)）。
- [#111819](https://github.com/NousResearch/hermes-agent/pull/111819) Desktop `titleBar.center` 槽位,避免 kanban 切换器与面板标签重叠。

## 4. 社区热点

**过去 24 小时最高互动项（按评论/反应数）：**

1. [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) — **state.db 5 周内损坏 4 次**（14 评论，P1）。多进程 WAL 写者（gateway + dashboard），加上故障前 7 分钟出现 `"5 live SessionDB handles"` 警告。同一缺陷类同于 [#90837](https://github.com/NousResearch/hermes-agent/issues/90837)、[#100313](https://github.com/NousResearch/hermes-agent/issues/100313)、[#89737](https://github.com/NousResearch/hermes-agent/issues/89737)。**底层需求：** 在 gateway + dashboard 共租场景下为 `state.db` 提供可靠的单写者语义；当前 `journal_mode=delete` 的抑制是被动的。
2. [#110912](https://github.com/NousResearch/hermes-agent/issues/110912) — **Nous Portal 在订阅额度有效情况下仍全额计费**（10 评论，P2）。这是 `glm`/`glm-flash`/`kimi` 折扣路由的 bug，非额度耗尽。**底层需求：** 对本应落入 Plus 计划的模型路由进行确定性的订阅额度核算。
3. [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) — **`hermes config set` 绕过 v0.18.0 系统配置写保护**（9 评论，P2，`needs-decision`）。shell 写入路径已受门控；CLI 修改路径未受门控，因而具备终端访问权限的智能体可绕过审批层。**底层需求：** 保护层不应存在 CLI 形态的漏洞。
4. [#100437](https://github.com/NousResearch/hermes-agent/issues/100437) — **v0.21.0 cron 代理任务忽略 model pin；Ollama 回退无法通过 64K 上下文闸口**（9 评论，P1）。**底层需求：** cron 必须遵守每任务的 `--provider`/`--model`，本地 Ollama 必须能容纳无 64K 容量提示缓存的小模型。
5. [#103483](https://github.com/NousResearch/hermes-agent/issues/103483) — **Muse Spark 在 `finish_reason=stop` 时中途结束**（8 评论，**8 👍**，P2，Responses wire）。流被切断为一个不相关的单词。当日社区反应最高。**底层需求：** Responses wire 上的 stop 原因处理不应让一个孤立的终止 token 提前关闭回合。
6. [#109417](https://github.com/NousResearch/hermes-agent/issues/109417) — **跟踪：将 profile 多路复用作为网关唯一模式**（6 评论，P2）。一项旗舰级网关重构；目标是让单一 `hermes gateway run` 在 default profile 上服务 `profiles/` 下的所有 profile。
7. [#111727](https://github.com/NousResearch/hermes-agent/issues/111727) — **Telegram 网关在报告"已连接"的同时静默失聪（socket 处于 CLOSE-WAIT）**（3 评论，P1）。**底层需求：** 健康检查应反映真实 socket 状态，而不仅是单元的 `active` 标志，覆盖多路复用 profile。
8. [#96384](https://github.com/NousResearch/hermes-agent/issues/96384) — **转发的 Slack 消息静默丢失文本和文件**（2 评论，**2 👍**，`needs-repro`）。报告者自评 P0；一项核心 Slack 工作流被破坏。

**模式：** 热点议题汇聚于三大系统痛点 —— **(a) 多写者并发下的 SQLite 会话状态完整性**、**(b) 跨平台一致性回退**（Telegram、Slack、Discord、MCP），以及 **(c) CLI/网关表层一致性**（配置、生命周期、与监管进程交互）。流式/UX 类 bug 上的高 👍 数（#103483、#96384）表明用户最在意的是**可见的**可靠性，而不仅是后端正确性。

## 5. Bug 与稳定性

按上报严重度排序，仅包含仍开放或本窗口浮现的项。

| 严重度 | Issue | 摘要 | 修复 PR? |
|---|---|---|---|
| **P1** | [#100896](https://github.com/NousResearch/hermes-agent/issues/100896) | 多写者 WAL 下 `state.db` 损坏；生产环境复现 | **无** —— 开放，需设计方案 |
| **P1** | [#100437](https://github.com/NousResearch/hermes-agent/issues/100437) | Cron 代理任务忽略 model pin；Ollama 回退无法通过 64K 闸口 | **无** —— 开放 |
| **P1** | [#111727](https://github.com/NousResearch/hermes-agent/issues/111727) | Telegram socket 卡在 CLOSE-WAIT；网关报告健康并占用 ~1 核 | **无** —— 开放 |
| **P1** | [#110422](https://github.com/NousResearch/hermes-agent/issues/110422) | 生命周期守卫未对引用脚本遍历应用 inert-heredoc 屏蔽 | 已关闭（本窗口修复） |
| P2 | [#59293](https://github.com/NousResearch/hermes-agent/issues/59293) | `hermes config set` 绕过系统配置写保护 | **无** —— `needs-decision` 状态自 7 月起 |
| P2 | [#103483](https://github.com/NousResearch/hermes-agent/issues/103483) | Muse Spark 流在孤立终止 token 上中断（Responses wire） | **无** —— 开放，高 👍 |
| P2 | [#110912](https://github.com/NousResearch/hermes-agent/issues/110912) | Nous Portal 在 `glm/glm-flash/kimi` 上无视额度全额计费 | **无** —— 开放 |
| P2 | [#111707](https://github.com/NousResearch/hermes-agent/issues/111707) | Kanban Codex App Server 因 `mcp_servers.hermes-mcp` 与 `hermes-tools` 不匹配失败 | **无** —— 开放 |
| P2 | [#100854](https://github.com/NousResearch/hermes-agent/issues/100854) | `opencode-go`：`qwen3.8-flash` HTTP 404（网关 URL 覆写） | **无** —— 开放 |
| P2 | [#111774](https://github.com/NousResearch/hermes-agent/issues/111774) | 静态提示缓存标记未命中字节稳定上下文层级；压缩会重写该标记 | **无** —— 开放（`type/perf`） |
| P2（报告者自评 P0） | [#96384](https://github.com/NousResearch/hermes-agent/issues/96384) | Slack 转发消息丢失文本和文件 | **无** —— `needs-repro

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-15

## 1. 今日概览

2026-09-15 的项目活跃度处于明显低位。过去 24 小时内仅有一个 issue 被更新（#8100），且仍处于开启状态，暂无评论或反应。没有 pull request 更新，也没有发布新的 release。这暗示当天可能处于维护/休整日，或处于活跃开发周期之间的过渡期——而非停滞不前；IronClaw 最近的活动表明该项目仍在通过自动化基准分析流水线进行监控。

## 2. Releases

过去 24 小时内没有发布任何新的 release。未见版本变更、tag 或 release 制品。

## 3. 项目进展

过去 24 小时内没有 pull request 被开启、合并或关闭。无法报告今日窗口期内的代码层面进展。

## 4. 社区热议话题

过去 24 小时内唯一活跃的讨论线索是：

- **#8100 — Daily ironclaw failure taxonomy — 2026-09-14**（[链接](https://github.com/nearai/ironclaw/issues/8100)）
  - 作者：@pranavraja99 | 状态：开启 | 评论数：0 | 👍：0
  - 内容：一份关于 `officeqa` 套件的自动化/模板化基准分析报告（43 个未通过任务），将失败原因主要归因于 DeepSeek-V4-Flash 模型在 navigate 类任务上真实存在的模型质量问题。
  - **潜在需求：** 社区（很包括维护者）希望对 IronClaw 的失败点进行系统化的每日分类——区分模型质量问题与工具/Agent/Prompt/基础设施故障。这对于优先级排定工程工作至关重要。

## 5. Bug 与稳定性

过去 24 小时内没有用户上报的 bug、崩溃或回归问题。唯一的活动项（#8100）属于诊断/可观测性产物，而非缺陷报告——它记录了 43 个 officeqa 任务失败主要源于 DeepSeek-V4-Flash 模型的能力局限，并非 IronClaw 框架本身的 bug。

**严重度评估：** 今天没有需要分诊的活跃缺陷。

## 6. 功能请求与路线图信号

今日未提交明确的功能请求。然而，反复出现的 "Daily ironclaw failure taxonomy" issue（#8100）暗示了一个**新兴的路线图信号**：项目正在投入自动化失败分析与基准可观测性工具的建设。预计将持续投入于：

- 逐套件的基准面板（通过 `nearai.github.io/benchmarks` 引用）
- 失败分类法（模型质量 vs. Agent vs. 工具 vs. Prompt 失败）
- 集成新的模型后端（如 DeepSeek-V4-Flash）作为评估目标

## 7. 用户反馈汇总

所有更新项的评论数与反应数均为零，因此过去 24 小时没有直接的用户反馈信号。#8100 缺乏互动与其作为机器人生成或维护者自动化遥测报告的性质一致，而非社区讨论帖。从今日数据无法推断满意或不满意的趋势。

## 8. 待办关注

由于仅有 1 个开放项且 PR 为零，当前积压基本清空。然而，维护者仍应关注以下事项：

- **#8100**（[链接](https://github.com/nearai/ironclaw/issues/8100)）—— 与 `officeqa` 套件关联的失败分类报告，显示 43 个未通过任务归因于 DeepSeek-V4-Flash 模型质量问题。虽然根本问题出在模型而非 IronClaw，但仍应对该报告本身进行分诊，以确认是否存在部分失败实际上可归因于 Agent/Prompt/工具缺陷而需要修复。

---

**项目健康快照：** 表层活跃度低，无代码变更，无发布，但可观测性流水线仍在运行。唯一的活动项反映的是持续的质量监控，而非开发停滞。建议持续观察未来 48–72 小时的 PR 活动，以确认这是正常的间歇期，还是维护者带宽减少的早期信号。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-15

## 1. 今日概览

QwenPaw 在过去 24 小时内呈现**活跃的开发态势**：50 个 PR 被触碰（27 个已关闭/合并，23 个仍开放），25 个 Issue 被更新（14 个已关闭，11 个仍开放）。暂无新版本发布，但 PR 的合并速度强劲（已关闭数量多于开放数量），表明维护者吞吐量健康。主要议题集中在 **QwenPaw Hub（多租户 2.2.0）筹备**、**Web 控制台在小屏幕上的可用性**、**MCP 客户端/服务端健壮性**，以及**内存/长时间运行任务的正确性**。总体项目健康状况**稳定且活跃**，Bug 类与功能类 PR 比例均衡，维护者响应积极（多个长期遗留 Bug 今天被关闭）。

## 2. 版本发布

过去 24 小时内无新版本发布。项目仍处于 **2.2.x**（最新 Issue 引用了 2.2.0 / 2.2.1），即将到来的 **QwenPaw Hub 多租户版**预告将在 **2.2.0** 中发布（参见 [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)）。

## 3. 项目进展

**已合并 / 已关闭的 PR（今日，27 个）：**

| PR | 标题 | 领域 |
|---|---|---|
| [#7737](https://github.com/agentscope-ai/QwenPaw/pull/7737) | 扩展多智能体协作的触发关键词 | 技能 / 智能体 |
| [#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736) | 新增 DeepSeek V4 Flash 能力 | 模型提供方 |
| [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) | 保留解码后的 HTTP 错误响应（MCP） | MCP |
| [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) | 诊断子智能体模型覆盖被丢弃的问题 | 智能体 |
| [#7759](https://github.com/agentscope-ai/QwenPaw/pull/7759) | 恢复可见的链接焦点指示器 | 控制台 UI / 可访问性 |
| [#7758](https://github.com/agentscope-ai/QwenPaw/pull/7758) | 对齐 embedding 超时校验 | 控制台 UI |
| [#7756](https://github.com/agentscope-ai/QwenPaw/pull/7756) | 区分空的错误通知（内存） | 内存 |
| [#7787](https://github.com/agentscope-ai/QwenPaw/pull/7787) | 避免对 gzip 4xx MCP 响应进行双重解压 | MCP |
| [#7683](https://github.com/agentscope-ai/QwenPaw/pull/7683) | 审计登录尝试与被拒绝的运行时创建 | Hub / 安全 |
| [#7750](https://github.com/agentscope-ai/QwenPaw/pull/7750) | 在响应产物列表中展示 `send_file_to_user` 文件 | 控制台 UI |
| [#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704) | 将聊天文件抽屉移至右侧 | 控制台 UI |
| [#7682](https://github.com/agentscope-ai/QwenPaw/pull/7682) | 在 `SettingsCenter` 中使用语义化 token | 控制台 UI / 主题 |

**主要进展：**
- **Hub 强化落地**（[#7683](https://github.com/agentscope-ai/QwenPaw/pull/7683)）—— 为登录尝试与被拒绝的运行时创建添加审计日志，在 2.2.0 Hub 版本发布前关闭了一个重要的安全缺口。
- **MCP 传输韧性提升**（两处相关修复：[#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735)、[#7787](https://github.com/agentscope-ai/QwenPaw/pull/7787)）—— 都解决了 gzip 4xx 发现响应的双重解压问题，这是反复引发 `httpx.DecodingError` 的根因。
- **模型提供方目录扩展**（[#7736](https://github.com/agentscope-ai/QwenPaw/pull/7736)）—— DeepSeek V4 Flash 现已声明图像输入、1M 上下文以及推理强度元数据。
- **控制台 UX 打磨**（[#7750](https://github.com/agentscope-ai/QwenPaw/pull/7750)、[#7704](https://github.com/agentscope-ai/QwenPaw/pull/7704)、[#7682](https://github.com/agentscope-ai/QwenPaw/pull/7682)、[#7759](https://github.com/agentscope-ai/QwenPaw/pull/7759)）—— 文件现在直接展示在响应区域（不再折叠在步骤中），抽屉移至右侧，设置中主题 token 修复，链接焦点恢复以提升可访问性。

## 4. 社区热点话题

| 排名 | 项目 | 类型 | 评论数 / 👍 | 为何重要 |
|---|---|---|---|---|
| 1 | [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — *Hub 多租户路线图讨论* | 讨论 | 27 / 4 | 围绕 2.2.0 Hub 版本（多用户访问、管理员管理的技能）的长期塑造帖。高 👍 数 = 社区需求强烈。 |
| 2 | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) — *停止按钮并未真正停止执行* | Bug | 7 | 安全/UX 隐患：用户以为任务已停止，但守护进程仍在运行。 |
| 3 | [#5872](https://github.com/agentscope-ai/QwenPaw/issues/5872) — *Docker 中 `browser_use` 因 dbus 失败* | Bug（已关闭） | 6 | 拖了数月的旧 Issue 今天被关闭；影响所有容器化的浏览器工具链。 |
| 4 | [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739) — *将历史面板移至右侧* | 功能请求 | 6 | 反映更广泛的"小屏幕局促"问题；另见 [#7700](https://github.com/agentscope-ai/QwenPaw/issues/7700)。 |
| 5 | [#3871](https://github.com/agentscope-ai/QwenPaw/issues/3871) — *智能体在完成后卡在"思考中"* | Bug（已关闭） | 5 | 五个月之久的 SSE 关闭 Bug 终于关闭；其修复对大量用户具有追溯性影响。 |
| 6 | [#7772](https://github.com/agentscope-ai/QwenPaw/issues/7772) — *无法通过 newapi 代理连接* | 提问 | 4 | 与一款流行的第三方网关（`new-api v1.0.0-rc.26`）存在兼容性缺口。 |
| 7 | [#7749](https://github.com/agentscope-ai/QwenPaw/issues/7749) — *模型故障转移在哪里配置？* | 提问 | 4 | 针对 2.2.1 故障转移功能的文档可发现性缺口。 |

**底层需求：**
- **团队 / 多用户工作流**是头号愿景性主题（Hub 讨论在评论数和 👍 上均居首位）。
- **小尺寸笔记本 UX**（13–14 英寸）如今成为反复出现的抱怨模式（#7739、#7700、#7778）。
- **工具 / MCP 易用性**——用户希望像现有的 `/skill` 快捷方式那样提供显式调用方式。
- **诊断透明化**——子智能体覆盖被丢弃（#7680）、dagu MCP 处于不活跃状态（#7764）、`max_iters` 静默终止（#7775）等失败案例，都反映出用户希望看到**可见**的错误，而非静默回退。

## 5. Bug 与稳定性

按用户可见严重程度排序（P0 → P2）。关联的 PR 表示是否有修复在进行中。

| 严重度 | Issue | 摘要 | 修复进行中？ |
|---|---|---|---|
| **P0** | [#7786](https://github.com/agentscope-ai/QwenPaw/issues/7786) | 在 Cloud/NFS 上打开工作区文件浏览器会让整个实例冻结 5–6 分钟；事件循环上存在同步文件 I/O。阻塞整个 WebUI。 | 尚无 PR。 |
| **P0** | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | 停止按钮在视觉上清除了进行中标记，但任务仍在执行——用户重新发出指令后遭遇 409。 | 尚无 PR。 |
| **P0** | [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) | 工作区外写入防护对 kimi-code 的 `Write` 工具视而不见——`_paths` 提取无法识别该 runner 的 toolCall 字段，导致一次沙箱绕过成功。 | 尚无 PR。涉及安全。 |
| **P1** | [#7767](https://github.com/agentscope-ai/QwenPaw/issues/7767) | 多项护栏插件回归：第二个及之后的控制台图片附件出现陈旧 blob、一次性定时任务误触丢弃、控制台尾部丢弃、`on_acting` 从不触发。 | 尚无 PR。 |
| **P1** | [#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) | PDF `DataBlock` 在面向 OpenAI 兼容 `/chat/completions` 端点时仍被序列化为 `{"type":"file"}`（回归——[#7621](https://github.com/agentscope-ai/QwenPaw/pull/7621) 中已有部分修复）。 | 是——[#7636](https://github.com/agentscope-ai/QwenPaw/pull/7636)（开放，评审中）。 |
| **P1** | [#7775](https://github.com/agentscope-ai/QwenPaw/issues/7775) | ReAct 回合耗尽 `max_iters` 后静默结束，无最终答案，也无"已达最大迭代次数"警告；强制收尾被抢占。 | 尚无 PR。 |
| **P1** | [#7764](https://github.com/agentscope-ai/QwenPaw/issues/7764) — *已关闭* | MCP 客户端 `dagu` 因 `httpx.DecodingError: zlib incorrect header check` 卡在非活跃状态。 | 由 [#7787](https://github.com/agentscope-ai/QwenPaw/pull/7787) / [#7735](https://github.com/agentscope-ai/QwenPaw/pull/7735) 解决。 |
| **P2** | [#7771](https://github.com/agentscope-ai/QwenPaw/issues/7771) | 上下文管理压缩 / 新建聊天会产生诸如 "Compact Chat Session Title" 的空占位标签。 | 尚无 PR。 |
| **P2** | [#7743](https://github.com/agentscope-ai/QwenPaw/issues/7743) — *已关闭* | Hub 模式下文件预览尽管 query-token 登录有效，仍返回 401。 | 与 Hub token 处理相关；尚无列出的 PR，但 Issue 已关闭。 |
| **P2** | [#5872](https://github.com/agentscope-ai/QwenPaw/issues/5872) — *已关闭* | Docker 中 `browser_use` Chromium 因 dbus 连接失败而退出。 | 今天关闭；Issue 中未列出具体解决路径。 |
| **P2** | [#3871](https://github.com/agentscope-ai/QwenPaw/issues/3871) — *已关闭* | 智能体在响应完成后卡在"思考中"气泡中（SSE 未关闭）。 | 五个月后今天关闭。 |
| **P2** | [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) — *PR* | Playwright 驱动一旦连接断开，永不自我恢复（"死一次，永不再活"）。 | PR 自 **2026-08-07**（约 5 周）开放，仍待维护者评审。 |

**趋势：** 尚未有 PR 的两个 P0 Issue（停止按钮、NFS 文件浏览器冻结）是影响最大的可靠性缺口，应被纳入热修复或 2.2.2 补丁的评估范围。

## 6. 功能请求与路线图信号

| 信号 | 项目 | 可能的版本 |
|---|---|---|
| **实时语音聊天** | [#7785](https://github.com/agentscope-ai/QwenPaw/pull/7785)（开放 PR，刚刚提交） | 2.3.0 候选 |
| **内存插件：OpenViking** | [#7613](https://github.com/agentscope-ai/QwenPaw/pull/7613)（开放，首次贡献者，评审中） | 2.2.x 或 2.3.0 |
| **显式工具调用（`//` 快捷方式）** | [#7778](https://github.com/agentscope-ai/QwenPaw/issues/7778)、[#7780](https://github.com/agentscope-ai/QwenPaw/issues/7780)、[#7777](https://github.com/agentscope-ai/QwenPaw/issues/7777)——重复提交 | 2.2.x（对照现有 `/` 技能快捷方式；实现成本低） |
| **小屏幕侧边栏重设计** | [#7788](https://github.com/agentscope-ai/QwenPaw/pull/7788)（开放 PR）+ [#7739](https://github.com/agentscope-ai/QwenPaw/issues/7739) / [#7700](https://github.com/agentscope-ai/QwenPaw/issues/7700) | 2.2.x |
| **按通道的技能白名单** | [#7746](https://github.com/agentscope-ai/QwenPaw/issues/7746)（今天作为增强关闭） | 2.2.x 或 2.3.0 |
| **后台自更新** | [#7543](https://github.com/agentscope-ai/QwenPaw/issues

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-15

## 1. 今日概览

ZeroClaw 工程活动密集，过去 24 小时内 issue 与 PR 合计产生 **84 项更新**，显示出这是面向发布前的集中稳定化推进，而非日常维护。流水线明显向 PR 倾斜（**50 项更新、34 项开启**），对比 issue（**34 项更新、16 项开启**），说明维护者正赶在版本切割前合入长期运行的功能分支。安全加固（宿主启动器、插件校验、内存授权、渠道审批路由）以及 ZeroCode TUI 打磨是今天工作的主线，今天未发布任何版本。健康度评估：**活跃且优先级清晰，但仍有若干 S1/P1 issue 未关闭**，集中在渠道与提供方图像处理路径，需在近期解决。

## 2. 版本发布

2026-09-15 未发布新版本。追踪 issue [#9459](https://github.com/zeroclaw-labs/zeroclaw/issues/9459) 仍作为 v0.8.5 有限周度稳定化分支的可见坐标。

## 3. 项目进展

过去 24 小时内已合并或关闭的 PR 如下：

| PR | 标题 | 影响 |
|---|---|---|
| [#10252](https://github.com/zeroclaw-labs/zeroclaw/pull/10252) | feat(memory): add category-scoped cross-agent grants | 实现 [#8983](https://github.com/zeroclaw-labs/zeroclaw/issues/8983) 中提出的设计 —— 类型化的跨智能体内存授权，支持可选的精确类别作用域。在 recall、point 读取以及兄弟可见路径上强制作用域。 |
| [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772) | feat(telegram): add per_user_session toggle for shared group-chat sessions | 允许 Telegram 群聊在多个用户间共享同一会话，而非按发送者隔离。 |
| (Issue) [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) → [#10604](https://github.com/zeroclaw-labs/zeroclaw/pull/10604) | OpenCode `x-opencode-session` 亲和性头 | 修复一个 S1 缺陷：ZeroClaw 此前从未发送 session 头，导致 Go 模型失效并有触发账号风控的风险。后续跟踪见 [#10853](https://github.com/zeroclaw-labs/zeroclaw/issues/10853)。 |
| (Issue) [#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625) | `[media attachment]` 占位符泄露给用户 | 在使用非视觉模型时，Matrix 渠道不再向用户投递字面占位符。 |
| (Issue) [#6613](https://github.com/zeroclaw-labs/zeroclaw/issues/6613) | 更强的配对码 | 配对码熵值显著提升；默认值已远超 6 位纯数字。 |
| (Issue) [#10585](https://github.com/zeroclaw-labs/zeroclaw/issues/10585) | 日志汇回归与迁移测试竞态 | 修复了并行测试运行器下 tracing-subscriber 的测试锁竞争问题。 |
| (Issue) [#10232](https://github.com/zeroclaw-labs/zeroclaw/issues/10232) | 守护进程诊断信息丢失底层错误链 | 监管进程现已在诊断信息中保留 `anyhow` 因果链。 |
| (Issue) [#10488](https://github.com/zeroclaw-labs/zeroclaw/issues/10488) | Matrix TTS 支持 | `TtsManager` 现已在 Matrix 渠道上调用，行为对齐 Telegram/WhatsApp Web。 |
| (Issue) [#9632](https://github.com/zeroclaw-labs/zeroclaw/issues/9632) | `--agent` 用于独立 ACP | 裸 `zeroclaw acp --agent <alias>` 为无别名 `session/new` 调用设置进程级默认智能体。 |
| (Issue) [#10104](https://github.com/zeroclaw-labs/zeroclaw/issues/10104) | `zeroclaw-hardware` lib 测试从未在 CI 运行 | CI 现已在对应任务中演练被门控的硬件特性。 |
| (Issue) [#9293](https://github.com/zeroclaw-labs/zeroclaw/issues/9293) | Anthropic 拒答与安全护栏回退 | 空成功响应已替换为正确的回退路由。 |
| (Issue) [#10606](https://github.com/zeroclaw-labs/zeroclaw/issues/10606) | 未认证健康响应中的组件错误已脱敏 | 公共 `GET /health` 不再泄露任意 `last_error` 字符串。 |
| (Issue) [#10588](https://github.com/zeroclaw-labs/zeroclaw/issues/10588) | 默认 `multimodal.max_image_size_mb` 提升至 20 | 默认值对齐已有的上限钳制，并在文档中说明理由。 |
| (Issue) [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | ZeroCode 聊天输入忽略 Delete 键 | 小型 TUI 按键映射修复。 |
| (Issue) [#10789](https://github.com/zeroclaw-labs/zeroclaw/issues/10789) | 本地化 ZeroCode 守护进程启动诊断信息 | 启动通知新增 i18n 覆盖。 |
| (Issue) [#10792](https://github.com/zeroclaw-labs/zeroclaw/issues/10792) | 明确守护进程重载被拒后的 Windows 恢复步骤 | `docs/book/src/ops/service.md` 中新增按平台区分的恢复说明。 |
| (Issue) [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794) | Windows nextest 偶发失败提示 | 修复了 `publish_contract::published_crates_never_include_files_outside_their_own_directory` 的不稳定问题。 |

净方向：**提供方可靠性、渠道对等性（TTS、视觉）、安全默认以及多智能体内存安全** 今天均取得进展。

## 4. 社区热点

| 排名 | 条目 | 互动量 | 底层需求 |
|---|---|---|---|
| 1 | [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) — 加固运行时写入的可执行测试夹具 | 12 条评论，进行中 P1 | Cron 测试夹具在派生线程后写入可执行垫片；并行测试门的可靠性 |
| 2 | [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC 投票简化 | 11 条评论，进行中 RFC | 维护者希望移除 48/72 小时的强制讨论计时器，并允许 `REVISE` 中止当前快照 |
| 3 | [#9345](https://github.com/zeroclaw-labs/zeroclaw/issues/9345) — 每次更新重算 PR 风险/规模标签 | 6 条评论，进行中 P2 | 手工维护标签容易出错；需要在保留维护者覆写的前提下动态重算 |
| 4 | [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603) — OpenCode 会话头 | 3 个 👍（窗口期内最高），已关闭 | 当天最强的用户痛点信号：Go 模型的生产环境故障与账号风控风险 |

**要点：** 社区最迫切的关注是 **(a) 并行测试运行器下的测试基础设施不稳定** 与 **(b) RFC 流程的治理摩擦** —— 两者均由维护者侧驱动。在用户侧，OpenCode/Go 模型故障产生了最明确的正向反馈信号（3 个 👍），印证了"小众"模型的提供方可靠性是高价值场景。

## 5. Bug 与稳定性

### 开启中的 P1 / S1 issue（工作流阻塞）

| Issue | 标题 | 状态 | 修复是否在途？ |
|---|---|---|---|
| [#10858](https://github.com/zeroclaw-labs/zeroclaw/issues/10858) | `DateTimeSection` 在午夜使整个缓存前缀失效 | 进行中 | 暂未可见 |
| [#10857](https://github.com/zeroclaw-labs/zeroclaw/issues/10857) | ZeroCode 向非视觉会话附加图片 → 提供方 400 | 已接受 | 可能与 [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) 关联 |
| [#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854) | 工具输出中的字面 `[IMAGE:…]` 标记被当作畸形提供方图片 | 进行中 | 可能与 [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) 关联 |
| [#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863) | Telegram 对被拒绝的语音更新无限重试 | 已接受 | 引用了 [#10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640) |
| [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673) | 在守护进程 RPC 路径上持久化失败的 ACP 轮次（ZeroCode Code 面板） | 开启 | [#9378](https://github.com/zeroclaw-labs/zeroclaw/issues/9378) 的姊妹项 |
| [#9965](https://github.com/zeroclaw-labs/zeroclaw/issues/9965) | 并行门控下运行时写入的可执行测试夹具 | 进行中 | 测试夹具加固任务 |

### 开启中的 P2 / S2 issue

| Issue | 标题 | 状态 |
|---|---|---|
| [#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842) | Telegram `reaction` 工具静默 no-op | 进行中 |
| [#10740](https://github.com/zeroclaw-labs/zeroclaw/issues/10740) | Ctrl+N 与 `[+]` 会话语义不一致 | 已接受 |
| [#10853](https://github.com/zeroclaw-labs/zeroclaw/issues/10853) | OpenCode 会话头后续事项（来自 #10604） | 已接受，等待维护者评审 |

**严重度偏向：** 2026-09-14 集中提报了四项 S1/P1（即 [#1085x](https://github.com/zeroclaw-labs/zeroclaw/issues/10858) 簇），反映出对多模态/图像路径的一次端到端审查尚未被 [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480) 单独解决 —— 应当作为同一工作流来看待。

## 6. 功能请求与路线图信号

**下一版本（v0.8.5 稳定化切割）的可能候选：**

- **SOP 重命名流程** — [#10233](https://github.com/zeroclaw-labs/zeroclaw/pull/10233) + [#10527](https://github.com/zeroclaw-labs/zeroclaw/pull/10527)（堆叠，约 9 个文件的可评审面 + 基础 1,450 行）。两项 PR 均已开启超过 2 周，疑似排队等待 v0.8.5。
- **插件安装时加载校验** — [#10746](https://github.com/zeroclaw-labs/zeroclaw/pull/10746) 将 `zeroclaw plugin install` 与宿主 WIT ABI 进行门控；出站拒绝现在会给出修复路径。
- **渠道会话串行化** — [#10411](https://github.com/zeroclaw-labs/zeroclaw/pull/10411) 消除共享会话上的并发轮次。
- **上下文压缩锚定模型窗口** — [#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535) 取代原先固定的 32,000 token 预算。
- **A2A 出站客户端（第一阶段）** — [#9324](https://github.com/zeroclaw-labs/zeroclaw/pull/9324) 提供四个 `a2a_*` 工具、共享的 Serde 线路模型，以及默认关闭的 `[a2a.client]` 配置块。
- **Always-ask 在 Full 自治下仍生效** — [#9724](https://github.com/zeroclaw-labs/zeroclaw/pull/9724)（Audacity88 刷新分支）恢复策略优先级。
- **桌面端守护进程有界日志** — [#10236](https://github.com/zeroclaw-labs/zeroclaw/pull/10236) 引入隐藏的监管进程，提供安全的有界日志与已认证的升级重启。

**可能被推迟（长期开启的 issue）：**

- **原生 XMPP / Prosody 渠道** — [#9814](https://github.com/zeroclaw-labs/zeroclaw/issues/9814)（2026-08-07 开启，仅 2 条评论）。与现有 Matrix/Telegram/Discord 适配器对齐使其成为 v0.8.5 之后的合理候选，但目前没有 PR。
- **ZeroCode 子智能体活动 / 可展开工具结果** — [#8763](https://github.com/zeroclaw-labs/zeroclaw/issues/8763)（2026-07-06 开启）。确实存在操作员的实际人体工学需求，但尚无实现 PR 引用。
- **RFC 流程简化** — [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) 属于治理内部事项，影响落在策略文档而非二进制产物上。

**依赖/PR 混合中的其他显著条目：** dependabot 开启了 [#10873](https://github.com/zeroclaw-labs/zeroclaw/pull/10873)（similar 2.7.0→3.2.0）、[#10872](https://github.com/zeroclaw-labs/zeroclaw/pull/10872)（hmac 0.12.1→0.13.0）、[#10871](https://github.com/zeroclaw-labs/zeroclaw/pull/10871)（flate2/lettre/cpal）、[#10870](https://github.com/zeroclaw-labs/zeroclaw/pull/10870)（codeql-action 3.36.2→4.38.0）—— 供应链卫生工作按常规节奏持续推进。

## 7. 用户反馈摘要

**反复出现的痛点：**

1. **提供方协议合规性缺口。** [#10603](https://github.com/zeroclaw-labs/zeroclaw/issues/10603)（3 👍）—— ZeroClaw 之前未发送 OpenCode 中继所要求的文档化头，导致模型失效并危及账号状态。社区反应表明这类缺陷的成本被显著低估。
2. **多模态 / 视觉边界场景。** 单个 24 小时窗口内出现四个独立的 S1/S2 issue（[#10857](https://github.com/zeroclaw-labs/zeroclaw/issues/10857)、[#10854](https://github.com/zeroclaw-labs/zeroclaw/issues/10854)、[#10858](https://github.com/zeroclaw-labs/zeroclaw/issues/10858)、[#10625](https://github.com/zeroclaw-labs/zeroclaw/issues/10625)），表明图像处理路径是当前的故障前沿。用户期望优雅降级，而不是 400 错误或字面占位符。
3. **Telegram 作为生产关键渠道。** 三项 Telegram 专项 issue（[#10842](https://github.com/zeroclaw-labs/zeroclaw/issues/10842)、[#10863](https://github.com/zeroclaw-labs/zeroclaw/issues/10863)，以及已关闭的群组会话 [#9772](https://github.com/zeroclaw-labs/zeroclaw/pull/9772)）印证了 Telegram 已被用于多用户工作流，其中静默 no-op 与无界重试是不可接受的。
4. **ZeroCode TUI 打磨。** 小但可见的体验瑕疵（[#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) Delete 键、[#10740](https://github.com/zeroclaw-labs/zeroclaw/issues/10740) Ctrl+N 语义）持续累积。这些被打上 `good first issue` / `help wanted

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*