# OpenClaw 生态日报 2026-09-10

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-10 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目简报 — 2026-09-10

## 1. 今日概览

OpenClaw 呈现出 **高频维护活动** 态势，过去 24 小时共有 1,000 条 issue/PR 更新（500 个 issue、500 个 PR），但未关闭 issue 库存仍偏重，活跃项达 310 个，关闭项为 190 个。唯一一次发布是 **2026 年 6 月最终 LTS 版本**（`v2026.6.35`），重点放在加固 provider/channel 输入边界上，而非引入新功能——这清晰地表明项目在 LTS 分支处于稳定阶段，而主线开发则在内存核心、Gateway 与 Android UI 方面持续推进。PR 合入/关闭率达到 51.6%（258/500），表现健康，但长期存在的多月份 P1/P2 bug（如僵尸进程 #97616、SQLite 争用 #117262）反映出系统性的稳定性债务，单靠 24 小时的修复无法化解。

## 2. 版本发布

**v2026.6.35 — 2026 年 6 月最终长期支持版（LTS）**（2026-09-10 发布）

- **更安全的 provider 与 channel 边界：** 内置 provider 与 channel 适配器现在对不受信任的响应体进行边界限制，在执行开销较大的操作前拒绝超大规模输入，并在传输中断时保留安全恢复能力。
- **截取的变更日志片段中没有记录任何新功能或破坏性变更；** 本次发布是 LTS 分支的一次加固汇总。
- **迁移说明：** 无显式迁移说明——这是 6 月 LTS 的收尾版本，因此部署在 `2026.6.x` 的实例应将其作为补丁目标进行升级，而非直接跳到 `2026.9.x`。

6 月 LTS 节奏与快速的 `2026.8.x → 2026.9.x` 主线周期并行运行，表明项目同时维护两条受支持分支，相应扩大了测试与维护面。

## 3. 项目进展

**已关闭/合入 PR（24 小时）：** 258 个已关闭，其中值得关注的有：

- **#140296**（P0，等待维护者审阅）— `fix(doctor): session SQLite import drops Codex assistant messages from legacy transcripts`。关闭 #140100。
- **#137008**（P1）— `fix: skip managed gateway stop on no-op openclaw update`。关闭 #136997。
- **#142626**（P2，已开启自动合入）— `fix(imessage): restore feedback after bridge recovery`。关闭 #142603。
- **#143978**（重构）— `refactor(memory-wiki): share deferred test fixtures`（消除 6 个测试套件中重复的样板 fixture）。
- **#143982 / #143983 / #143969** — 文档审计闭环（53+20+1 行准确性发现）及一处无用代码清理。

**活跃开发主题（242 个开放 PR）：**

- `RomneyDa` 主导的 **配置 schema 推导重构系列**（#143985、#143986、#143987、#143988）——将手写的契约层级收敛为 schema 推导类型；每个 PR 均带来净代码量缩减。
- **Android 实时客户端** 加固（#142297、#142298）——在延迟启动、agent 运行与关闭过程中协调响应与转录状态。
- **Memory-core 与 active-memory** 可靠性（#142545、#142693）——防止超过引导上限的过度晋升，并在触发查找超时时继续 recall。
- **转录数据脱敏正确性**（#143937，P1）——仅回放带有来源标记的持久化掩码，避免将 `***` / `first6…last4` 当作真实值回传给模型。

## 4. 社区热门话题

评论最多的 Issue（前 5）：

- **#135111**（已关闭，26 条评论）— 在 `v2026.8.1` 上使用 `claude-sonnet-5` 时偶发 "malformed JSON arguments"。凸显了一个小版本中 provider 工具调用解析回归会如何主导噪声问题。[link](https://github.com/openclaw/openclaw/issues/135111)
- **#97616**（开放，15 条评论，🦪 银贝壳）— 未被回收的 hook/tool 子进程累积为僵尸进程，拖慢运行时。长达 3 个多月的高评论数说明分诊陷入停滞。[link](https://github.com/openclaw/openclaw/issues/97616)
- **#119720**（开放，15 条评论，🦞 钻石龙虾）— 同步持久化在规模化时阻塞 Gateway 事件循环；这是一个 *系统性* 的伸缩性问题，目前已被 #140231 与 #138984 部分缓解，但仍处于维护者持续审查中。[link](https://github.com/openclaw/openclaw/issues/119720)
- **#137927**（已关闭，14 条评论）— 内部 `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` 块以可见的 Telegram 文本形式呈现——这既是 **提示注入泄露**，同时也是一次 UX 回归。[link](https://github.com/openclaw/openclaw/openclaw/issues/137927)
- **#43367**（开放，14 条评论）— 多 agent 编排不稳定：并发 `agents add`、会话锁失败、子进程脱离。[link](https://github.com/openclaw/openclaw/issues/43367)

**潜在诉求：** 运维人员反复暴露同一模式——*核心运行时原语（进程生命周期、SQLite 锁、并发写入）尚未达到生产级别*。"clawsweeper" 自动分诊标签（`needs-maintainer-review`、`needs-product-decision`、`no-new-fix-pr`）出现在约一半的热门 issue 上，表明维护者注意力才是真正的瓶颈，而非缺乏诊断。

## 5. Bug 与稳定性

按严重程度排序（先列 P0/P1），仅展示今日有更新的条目：

| 严重程度 | Issue | 状态 | 修复 PR？ | 备注 |
|---|---|---|---|---|
| **P0 / 发布阻塞** | [#142585](https://github.com/openclaw/openclaw/issues/142585) — 2026.9.3 Doctor 拒绝合法的旧版 workspace 设置 | 开放，需要补充信息 | — | 迁移阻塞；等待维护者信息。 |
| **P0 / 发布阻塞** | [#137813](https://github.com/openclaw/openclaw/issues/137813) — 2026.9.1 之后 Windows gateway 无法启动；`--task-supervisor` 静默退出码 0 | 已关闭 | 可能已合入 | Gateway.cmd 重新生成回归。 |
| **P0 / 发布阻塞** | [#140162](https://github.com/openclaw/openclaw/issues/140162) — Windows `gateway restart` 在 181s 后将已就绪的 gateway 作为 "stale process" 终止；漏掉手动启动的前台 gateway | 开放，需要现场复现 | — | 多种失败模式叠加；慢启动时会出现停机。 |
| **P0 / 发布阻塞** | [#101763](https://github.com/openclaw/openclaw/issues/101763) — Hosted Molty：模型选择器无法持久化（`claude-opus-4.8` vs `4-8`） | 已关闭，需要补充信息 | — | Provider-id 点号 vs 短横线回归。 |
| **P0 / 发布阻塞** | [#115642](https://github.com/openclaw/openclaw/issues/115642) — 订阅鉴权故障恢复后，计费冷却仍持续生效（约 5 小时 `disabledUntil`） | 开放，可源码复现 | — | 需要基于探针的恢复 + 手动重置。 |
| **P1 / 崩溃循环** | [#117262](https://github.com/openclaw/openclaw/issues/117262) — SQLite 争用：3 个并发写句柄 → 约 33 秒事件循环停顿（DEF-61） | 开放，可源码复现 | 已关联开放 PR | 影响最严重的运行时 bug。 |
| **P1 / 安全** | [#115367](https://github.com/openclaw/openclaw/issues/115367) — Provider 自有的读取门控要求 `origin: bundled`，但 Slack/Discord/Matrix/MSTeams/Feishu 以外部插件形式分发 | 开放 | — | 2026.7.2-beta 之后权限边界不一致。 |
| **P1 / 会话状态** | [#127148](https://github.com/openclaw/openclaw/issues/127148) — Codex `sessions.compact` 获取第二个 app-server，触发活跃写者冲突 | 开放 | — | |
| **P1 / memory-core** | [#136311](https://github.com/openclaw/openclaw/issues/136311) — Gateway 每次启动都重新获取 reindex 锁；产生 19 GB 孤儿 `memory-reindex-*` 临时数据库 | 开放，需要现场复现 | — | |
| **P1 / memory-core** | [#143640](https://github.com/openclaw/openclaw/issues/143640) — 完整索引发布在单个 `IMMEDIATE` 事务中超出 5 秒 `busy_timeout` | 开放，可源码复现 | — | 同属 SQLite 争用主题。 |
| **P1 / 数据丢失** | [#104719](https://github.com/openclaw/openclaw/issues/104719) — memory-wiki 补充穷尽式回退忽略工具 deadline | 开放 | 已关联开放 PR | |
| **P1 / 消息丢失** | [#139274](https://github.com/openclaw/openclaw/issues/139274) — 原生 `/codex bind` 丢弃语音附件并跳过配置的 STT | 开放，可源码复现 | — | |
| **P1 / gateway 挂起** | [#138042](https://github.com/openclaw/openclaw/issues/138042) — Gateway 控制请求挂起 157–276 秒，无 OOM | 开放 | — | |
| **P1** | [#88757](https://github.com/openclaw/openclaw/issues/88757) — 主动消息在会话上下文中不可见，导致会话失步 | 开放 | — | |
| **P1** | [#128637](https://github.com/openclaw/openclaw/issues/128637) — 多 agent `AgentSelectionRequiredError` 回归 | 开放 | — | |

**模式：** SQLite 争用 / 锁生命周期 / 进程生命周期是至少四个 P1 中最主要的一类根因。今天关闭的 P0 都需要显式提及修复 PR；仍有数个 P0 处于开放状态，被 `needs-info` 卡住。

## 6. 功能请求与路线图信号

今日有更新的开放增强请求（按参与度排序）：

- **#6599**（P3，11 条评论，👍1）— `/models test-fallback` 命令，用于在等待真实故障前验证 fallback 链。**极有可能进入下一个小版本**——契合 "运维工具化" 主题，且规模小到可以快速合入。
- **#6757**（P3，8 条评论，👍2）— Agent 触发的上下文压缩（自压缩工具）。与活跃的 memory-core / 压缩重写（#132762 后续工作）一致。可能以可选形式提供。
- **#46058**（P3，6 条评论，👍1）— 以聊天为先的 Android 界面讨论。Android 投入明显在加码（#142297、#142298），本次讨论正逢其时。
- **#87584**（P2，5 条评论，👍2）— 让群组房间事件引导可配置（目前对房间事件硬禁用）。属于实时运维诉求；很可能进入 2026.9.x 或 2026.10。
- **#8285**（P3，5 条评论）— 在 agent 处理之前自动发送意图/确认文本。
- **#6625**（P3，6 条评论）— 子 agent 超时前的优雅处理（超时前预警）。运维吸引力强；目前没有替代方案。
- **#109657**（P1，7 条评论，**已关闭**）— 在 WhatsApp/Discord/Slack/Signal/iMessage 上采用持久化入站排空。该功能已通过 #108924 上线，且批量 PR #141283 已关闭；这是顺理成章的 **"持久化入站成为默认行为"** 里程碑。

**预测 `2026.10.x` 候选：** fallback 验证命令（#6599）、可配置群组引导（#87584）、自压缩工具（#6757）、子 agent 超时前预警（#6625）。PR 待办区已经包含相应的支撑性重构（#143985–#143988 schema 推导）。

## 7. 用户反馈汇总

**主要痛点**（摘录自 issue 概要）：

1. **生产部署被钉在旧版本上**，因为近期的回归都很严重——`2026.5.12 → 2026.7.1-2 → 2026.8.x → 2026.9.x` 各自携带不同类型的发布阻塞 bug。[#123799](https://github.com/openclaw/openclaw/issues/123799) 明确请求安全的升级与回退指导。
2. **SQLite 是吞吐量天花板。** 单进程内三个并发写句柄、`memory_index_chunks` / `memory_embedding_cache` 无界增长（#114612）、5 秒 `busy_timeout` 被全量发布事务突破（#143640）、争用下出现 33 秒停顿（#117262）。用户是在 *生产环境* 中真实遇到这些问题，并附有现场证据。
3. **Windows 是二等公民。** 顶部开放的 P0/P1 中有三个是 Windows 特有的：gateway.cmd 重新生成（#137813）、`gateway restart` 杀掉已就绪进程（#140162），以及历史 launchd 回归（#90711，现已关闭）。
4. **Channel 适配器权限边界不一致。** `origin: bundled` 读取门控（#115367）静默地破坏 Slack/Discord/Matrix/MSTeams/Feishu；Feishu 的全部 13 个工具因此丢失（#140971，回归）。
5. **Memory-core 在重启时很脆弱。** Reindex 锁从未释放（#136311）、索引发布阻塞写者数据库（#143640）、19 GB 临时数据库残留。用户想要的不是新的内存功能，而是可靠性。
6. **运维可见性存在空白。** launchd 中隐藏的 stderr（#90711）、缺失的诊断阈值连线（#87441）、插件 hook 中无 trace 上下文（#50291）。运维人员无法诊断上面 #1–#5 中的问题。

**满意度信号：** 点赞最多的条目上，issue 评级明显偏向 🦞 *钻石龙虾* 与 🦐 *金虾*——这并非小问题，而是项目内部评级体系中的最高严重等级，其中数项已开放数周到数月。

## 8. 待办观察

带有持续 `clawsweeper` 标记、表明需要 **维护者关注** 的 issue 与 PR：

- **#97616**（P1，自 2026-06-29 开放，15 条评论）— 僵尸进程泄漏。开放三个月，无修复 PR。**下一次维护者扫排的首要优先级。**
- **#115642**（P0 发布阻塞，自 2026-07-29 开放，8 条评论）— 计费冷却持续超过故障窗口。需要明确的产品决策（`needs-product-decision`）。
- **#115367**（P1 安全，自 2026-07-28 开放，9 条评论）— `origin: bundled` 权限边界不一致。`needs-product-decision`。
- **#119720**（P1 伸缩性，自 2026-08-05 开放，15 条评论）— Gateway 事件循环阻塞。已有部分修复合入，但根因仍在审查。
- **#50291**（P2，自 2026-03-19 开放，9 条评论）— 插件 hook 缺少 trace 上下文。`needs-product-decision`，无明确负责人。
- **#43367**（P2 多 agent，自 2026-03-11 开放，14 条评论）— 并发 `agents add`、会话锁失败。已有 `linked-pr-open`，但尚未合入。
- **#6599**（P3，自 2026-02-01 开放，11 条评论）— `/models test-fallback` 命令。规模小到可以直接发布；只差维护者点头。
- **#114612**（P2，自 2026-07-27 开放，12 条评论）— SQLite 无界增长。已附生产数据；**缺失的是保留策略，不只是修一个 bug。**
- **#117262**（P1，自 2026-08-01 开放，10 条评论）— SQLite 争用导致 33 秒停顿。`linked-pr-open`，但尚未合入。
- **PR #137008**（P1，自 2026-09-03 开放）— `skip managed gateway stop on no-op openclaw update`。状态：`📣 needs proof`。本应可轻易验证；一次验证即可解锁合入。

**模式：** 约一半的顶部开放 issue 同时携带 `clawsweeper:no-new-fix-pr` *和* `clawsweeper:needs-maintainer-review`。瓶颈在于审阅者容量，而非诊断——上面每一条都已在 issue 正文中有清晰、可追溯的根因。

---

*简报基于 2026-09-10 的 GitHub 24 小时活动窗口生成。展示的为参与度最高的子集；完整清单：500 个 issue、500 个 PR。*

---

## 横向生态对比

# 跨项目对比报告：个人 AI 助手 / Agent 开源生态
**快照日期：2026-09-10** | 项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

个人 AI 助手开源版图呈现出清晰的梯队：一个超大规模旗舰（OpenClaw，每日 ~1,000 条 issue/PR 更新），两个快速迭代、每周都在出货功能的中型项目（QwenPaw、Hermes Agent），一个在 RFC 治理下进行架构重写的项目，以及一个尚处早期奠基模式的项目。纵观全部五个项目，产品品类已然趋同：Agent 不再是 CLI 聊天工具，而是具备持久记忆、定时任务和桌面/移动承载面的常驻式多渠道个人助手。值得注意的是，硬骨头也高度趋同——存储争用、跨渠道会话身份、沙箱/租户隔离以及供应商路由保真度，几乎在每个项目中都独立出现，说明生态已经走出拼新奇功能的阶段，进入基础设施级的可靠性建设。各项目公认的头号瓶颈不是问题诊断本身，而是维护者的评审容量。

---

## 2. 活跃度对比

| 项目 | Issue 更新（24h） | PR 更新（24h） | 关闭/合并率 | 发布状态 | 健康分* |
|---|---|---|---|---|---|
| **OpenClaw** | 500（310 开放 / 190 关闭） | 500 | 51.6% PR 关闭（258/500） | ✅ `v2026.6.35` — 6 月 LTS 最终版今日发布；主线 `2026.9.x` 推进中 | **7.0** |
| **QwenPaw** | ~29 | 33 | 41% PR 合并（13/33） | ✅ `v2.2.1-beta.2` 同日发布，并经发布值班验证 | **7.5** |
| **Hermes Agent** | 50（14% 已关闭） | 50 | 34% PR 关闭（17/50） | ❌ 无发布；停留于 `v0.21.1` | **6.5** |
| **ZeroClaw** | 26（2 个已关闭） | 50 | 14% PR 关闭（7/50） | ❌ 无发布；处于设计/稳定化阶段 | **6.0** |
| **IronClaw** | 1 | 4（0 个合并） | 0% | ❌ 无发布 | **5.0** |

\* 基于 24h 窗口内的速度、吞吐比、积压老化与发布节奏合成的综合指标。尽管 OpenClaw 的活跃量高出 16 倍，综合权衡下 QwenPaw 仍略胜一筹（如期发布 + 41% 合并率 + 协同的可靠性清扫）；OpenClaw 被扣分是因为存在积压数月的 P1（#97616 僵尸进程，已超 3 个月），且约半数热门 issue 上都标注了评审瓶颈。IronClaw 的分数反映的是社区信号不足，而非质量低劣。

---

## 3. OpenClaw 的定位

**相对同类项目的优势：**
- **规模领先：** 日均 ~1,000 条更新——约为次大项目（Hermes/QwenPaw，50–100）的 10 倍。issue 编号已达 143k 量级，同类项目为 8k–107k，表明其累计用户基础最为深厚。
- **唯一拥有正式 LTS 模型的项目：** 双支持分支（6 月 LTS + `2026.9.x` 主线）——这是同类项目目前无人能及的企业级可运维性信号。
- **渠道覆盖最广：** WhatsApp、Slack、Discord、Signal、iMessage、Telegram、Matrix、MSTeams、Feishu，外加 Android 与托管版（Molty）承载面。同类项目各覆盖 1–3 个渠道（QwenPaw：Feishu/WeCom/Telegram；ZeroClaw/IronClaw：Telegram；Hermes：WeChat/iLink）。
- **记忆栈最深：** 设有专职的 memory-core、active-memory 与 memory-wiki 子系统，并支持带出处标记的对话记录脱敏——同类项目仍处早期（QwenPaw 的 ReMe 命令；Hermes 仅单一 MEMORY.md 工具）。
- **大规模自动化分诊**（`clawsweeper` 分类法）——针对这一体量 issue 队列的独门运维工具。

**技术路线差异：** OpenClaw 采用以网关为中心、渠道适配器可插拔的单体架构；对照之下，ZeroClaw 在做 RFC 驱动的 Rust crate 架构重写，IronClaw 走扩展/托管 MCP 模型，Hermes 主打桌面优先的插件目录。OpenClaw 为覆盖广度与快速主线迭代而优化；ZeroClaw 则明确以发布速度换取设计严谨。

**直陈风险：** SQLite 争用（#117262，33 秒卡顿）、Windows 网关 P0（#137813、#140162），以及 `origin: bundled` 权限边界失守（#115367），迫使生产用户锁定旧版本（#123799）——稳定性债务正是同类项目可乘之隙。

---

## 4. 共性技术焦点

| 主题 | 涉及项目 | 具体证据 |
|---|---|---|
| **阻塞事件循环 / 存储争用** | OpenClaw、Hermes、QwenPaw | 33 秒 SQLite 卡顿（#117262）、51 秒 GIL 冻结（#58576）、118–135 秒同步调用冻结（#7363）。堪称全生态最普遍的运行时问题。 |
| **SQLite 持久化与损坏** | OpenClaw、QwenPaw、Hermes | FTS `SQLITE_CORRUPT_VTAB`（#7596）、索引无限增长（#114612）、`BEGIN IMMEDIATE` 重试原语（#97863）。所需：单写入者纪律 + 数据保留策略。 |
| **跨渠道会话身份与静默失败** | QwenPaw、OpenClaw、Hermes、ZeroClaw | QwenPaw 前 5 热门 issue 中占 3 个（#7579、#7011、#7661）；OpenClaw 多 Agent 锁失效（#43367）；Hermes 幻影会话（#107069）；Feishu 死锁（#7534）。 |
| **沙箱、租户与权限边界** | 全部五个项目 | QwenPaw Windows 沙箱逃逸（#7672，无修复 PR）；OpenClaw `origin: bundled` 门禁（#115367）+ 提示注入披露（#137927）；ZeroClaw 细粒度沙箱 RFC（已接受）；IronClaw 多租户 MCP 按调用方键控。 |
| **供应商路由保真度与成本控制** | OpenClaw、Hermes、ZeroClaw | 模型 ID 错乱（OpenClaw #101763；Hermes DeepSeek 集群——今日 6 个合并中占 3 个）；思考 token 浪费 68%（#107260）；成本账本计价与预算强制（#10716、#10645）。 |
| **Windows 平台对齐** | OpenClaw、QwenPaw、ZeroClaw | 三者均存在 Windows 专属 P1/P0（网关生命周期、桌面冻结、`0xc00000fd` 栈溢出 #10734）。 |
| **评测/回归门禁** | ZeroClaw、QwenPaw | 回放回归套件作为硬性 CI 门禁（#9212）；QPQAT 测试计划（+2,475 个后端用例）。 |

---

## 5. 差异化分析

| 项目 | 功能侧重 | 目标用户 | 架构特征 |
|---|---|---|---|
| **OpenClaw** | 记忆连续性、10+ 消息渠道、Android、托管服务 | 生产级自托管用户 / 运维者 | 网关 + memory-core 单体，LTS/主线双分支 |
| **Hermes Agent** | 桌面体验、插件目录、DeepSeek/供应商调优、cron 定时任务 | 高级用户、模型玩家（NousResearch 出身） | 插件/调度器生命周期；正向应用级插件转型 |
| **IronClaw** | 托管 MCP 多租户、SEP-414 调用方归因、扩展打包 | 面向托管/共享部署的构建者 | 扩展宿主 + 按调用方凭据键控 |
| **QwenPaw** | 中文渠道生态（WeCom、Feishu）、控制台/移动端体验、PawPort 导入（Codex/Qoder） | 自托管用户（含中国市场）；桌面用户 | 渠道适配器 + 控制台/桌面端；重仓测试覆盖率 |
| **ZeroClaw** | 运行时自有会话、仅追加事件历史、WASM 插件、成本账本、边缘 mesh | 看重架构的技术用户 | Rust crate、正式 RFC 投票、确定性回放评测 |

**核心结论：** OpenClaw 与 QwenPaw 比拼覆盖广度与交付速度；ZeroClaw 与 IronClaw 比拼底层根基（正确性、租户化）；Hermes 比拼桌面体验与模型供应商的敏捷度。目前尚无人占据“可靠的多租户托管个人助手”这一生态位——IronClaw 卡位最早。

---

## 6. 社区动能与成熟度

- **第一梯队 — 规模 + 稳定化：** **OpenClaw**。互动量最高（热门 issue 评论数达 14–26 条），但处于 LTS 加固模式，背负系统性稳定性债务；24 小时吞吐量清不完 310 个开放 issue 的存量。
- **第二梯队 — 快速迭代：** **QwenPaw**（动能最佳：当日发 beta、41% 合并率、首次贡献者也能落地修复——贡献门槛健康）与 **Hermes**（维护者亲笔 PR，桌面插件转型在即；拖累项：与 Enterkey 跨 fork 的发布摩擦讨论已积至 83 条评论，以及 67 天未解的 GIL 卡顿这类陈旧 P1）。
- **第三梯队 — 审慎架构期：** **ZeroClaw**。设计参与度深（RFC 讨论串评论 19–37 条，文档迭代至 Rev. 5–10），但 60% 的活跃缺陷尚无修复 PR，且因非正式评审已经饱和而设立了正式决策队列（#8692）。
- **第四梯队 — 奠基/早期：** **IronClaw**。所有条目零评论/零反应；PR 技术质量高，但社区尚未成形。

---

## 7. 趋势信号

1. **持久层是整个生态的天花板。** 三个规模最大的项目中均独立出现 SQLite 争用/阻塞。持久化、单写入者、异步的存储方案（OpenClaw 的持久化入口、ZeroClaw 的仅追加事件历史）是正在成形的答案——从第一天起就要按此构建。
2. **以事件溯源赢得信任。** 带出处标记的脱敏（OpenClaw #143937）、带 CI 门禁的确定性回放以及 FTS 完整性修复表明，可审计性/可回放性正成为可靠性的权威机制。
3. **多渠道已是入场券，会话身份才是新前沿。** 各处互动量最高的缺陷类型都是“切换渠道/UI 后 Agent 状态漂移”。权威的会话身份模型尚无人占位，是现成的差异化高地。
4. **隔离与多租户正在快速升温。** 沙箱策略 RFC、MCP 调用方归因（SEP-414）与权限边界缺陷，都预示着个人助手正从单用户主机走向共享/托管服务。
5. **成本可观测性正在成为功能卖点。** 思考 token 浪费修复、按模型的 `memory_model` 拆分、提示词缓存透传以及溢价计价账本，都表明 token 经济学正在驱动设计。
6. **Windows 对齐是敞口的差异化机会**——每个主要项目都背着 Windows 专属 P1/P2；先动者将赢得一块守得住的细分市场。
7. **评审容量是普遍约束。** 自动分诊机器人、决策队列，以及 OpenClaw 和 ZeroClaw 上 `needs-maintainer-review` 标签的主导地位，都指向对 AI 辅助评审/分诊工具的旺盛需求——这是 Agent 开发者的一次元级机会。

---

*数据来源：标注日期为 2026-09-10 的各项目 24h 摘要。健康分为分析师推导的综合评分；所有 issue/PR 引用均可在所引仓库中解析查证。*

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — 项目摘要

**日期：** 2026-09-10
**仓库：** [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)

---

## 1. 今日概览

Hermes Agent 今日活动较为活跃，**过去 24 小时内有 50 个 issue 被更新、50 个 PR 被更新**，尽管没有新版本发布，仍可视为高产能的一天。**关闭比率健康**：在活跃条目中，7 个 issue 被关闭（14%），17 个 PR 被合并/关闭（34%），说明维护者正在积极分流与交付。反复出现的主题集中在**提供商路由 bug**（DeepSeek、OpenRouter）、**插件/调度器生命周期问题**（看板、校验顺序）以及**桌面端 UI 回归**。今日未产出新的发布制品，所有修复仍停留在 PR 队列中，等待下一次版本号提升（根据 issue 上下文，目前版本为 `v0.21.1`）。

---

## 2. 版本发布

**过去 24 小时内无新版本发布。** 当前 issue 报告中引用的最新已发布版本为 `v0.21.1`（参见 [#107238](https://github.com/NousResearch/hermes-agent/issues/107238)）。

---

## 3. 项目进展 — 今日合并/关闭的 PR

今日共有六个 PR 被合并/关闭，涉及提供商兼容性、会话状态泄漏以及跨版本兼容性问题：

| PR | 标题 | 影响 |
|---|---|---|
| [#107295](https://github.com/NousResearch/hermes-agent/pull/107295) | DeepSeek 提供商不再重写自定义模型 id（#107206 的后续修复） | 厂商模型名称（如 `deepseek-flash`）现在按原样传递给 API；仅对已弃用 id 进行重映射 |
| [#107215](https://github.com/NousResearch/hermes-agent/pull/107215) | 保留厂商 `deepseek-flash`，不再重写为已弃用的 `v4-flash` | 与 #107295 同源；关闭模型 id 回归问题 |
| [#107069](https://github.com/NousResearch/hermes-agent/pull/107069) | 停止后台审核创建幽灵插件会话 | 后台技能/记忆审核不再以活跃会话的 session id 发布生命周期事件 |
| [#107144](https://github.com/NousResearch/hermes-agent/pull/107144) | 让 `DaemonThreadPoolExecutor` 兼容 Python 3.14 | 修复因移除 `_initializer`/`_initargs` 导致的 `AttributeError` — 解锁 Py3.14 用户 |
| [#107260](https://github.com/NousResearch/hermes-agent/pull/107260) | 将 `effort: none` 与 `enabled: false` 一同视为禁用思考 | 为 DeepSeek 桌面端用户解决 68% 的思考 token 浪费 |
| [#97863](https://github.com/NousResearch/hermes-agent/pull/97863) | 加固访客 DB 争用与日志所有权 | 取代 #89420；引入带 bounded jitter 的 `BEGIN IMMEDIATE` 重试原语 |

一个值得关注的模式：**六个合并中有三个针对 DeepSeek 提供商的相关问题**，表明在下次发布前对这一集成进行了集中清理。

---

## 4. 社区热门话题

按评论数排名的前五大讨论条目揭示了用户正在将维护者注意力引向何处：

1. **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584) — 83 条评论** — *Nous→Enterkey 自动合并被阻塞*。`cron/jobs.py` 中的合并冲突导致仪表板更新器在较旧的 Enterkey 版本上停滞。这是一个**发布工程**问题而非面向用户的 bug，但其评论数远超第二名 4 倍，暗示 Nous 与 Enterkey 两个分支之间存在长期摩擦。

2. **[#10421](https://github.com/NousResearch/hermes-agent/issues/10421) — 21 条评论，9 👍（数据集中 👍 最高）** — *功能：回合级实时时间上下文*。用户希望智能体拥有一个稳定的"现在/今天/当前星期几"感知，而无需显式调用工具。强烈的点赞信号表明**对提示词中时间锚定的广泛潜在需求**。

3. **[#100401](https://github.com/NousResearch/hermes-agent/issues/100401) — 13 条评论** — *Cron 触发心跳在其自身运行上死锁*。一条仍在传输中的 cron 投递在 60 秒心跳到来时，30 秒后被当作幽灵"关闭"而杀掉。这是项目自身的扫描器分类法标记的**消息投递风险**。

4. **[#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — 12 条评论** — *`web_server` 事件循环在重负载智能体工作下停滞长达 51 秒（GIL 压力）*。在工具密集的会话中，桌面 UI 会冻结约 1 分钟。涉及 CLI、TUI、Gateway、Dashboard、Desktop 等多个组件，P1 严重程度。

5. **[#71650](https://github.com/NousResearch/hermes-agent/issues/71650) — 10 条评论** — *工具集校验早于插件加载执行*。注册自有工具集（如 `beads`）的插件总是触发"未知工具集"警告 — 这一误报已让用户困扰两个月。

**底层需求：** 用户希望**确定性的、低摩擦的插件与提供商生命周期** — 他们正撞上框架严格顺序在发现、校验与运行时之间留下的接缝。

---

## 5. Bug 与稳定性 — 今日报告，按严重程度排序

### P1（关键 / 消息投递风险）
- **[#100401](https://github.com/NousResearch/hermes-agent/issues/100401)** — Cron 触发自死锁；暂无关联 PR。
- **[#58576](https://github.com/NousResearch/hermes-agent/issues/58576)** — 51 秒事件循环停滞，Windows 上 GIL 压力；暂无关联 PR。
- **[#88667](https://github.com/NousResearch/hermes-agent/issues/88667)** — 来自 `key_cmd` 的可调用 `api_key` 在自定义提供商解析时因 `AttributeError` 崩溃（认证/配置边界）。

### P2（功能性 / 会话状态风险、兼容性风险）
- **[#74712](https://github.com/NousResearch/hermes-agent/issues/74712)** — `codex_app_server` 系统提示词始终未发送（SOUL.md、记忆、channel_overrides 静默失效）。
- **[#105104](https://github.com/NousResearch/hermes-agent/issues/105104)** — 桌面 Bot Mode 侧边栏点击偶发为 no-op（失败时后端无任何活动）。
- **[#106292](https://github.com/NousResearch/hermes-agent/issues/106292)** — Kanban CLI 完成绕过 `pre_tool_call` 钩子，允许提前完成根任务。
- **[#107238](https://github.com/NousResearch/hermes-agent/issues/107238)** — 桌面端"Thinking: Off"开关被 DeepSeek 插件忽略 → **PR [#107260](https://github.com/NousResearch/hermes-agent/pull/107260) 已合并 ✅**。
- **[#107270](https://github.com/NousResearch/hermes-agent/issues/107270)** — `memory` 工具在 MEMORY.md 与 `.bak` 字节完全一致时误报文件漂移（循环拒绝）。
- **[#107272](https://github.com/NousResearch/hermes-agent/issues/107272)** — 图像预处理期间的 `/steer` 被确认但被忽略。
- **[#100602](https://github.com/NousResearch/hermes-agent/issues/100602)** — 当压缩调用失败/超时时，会话卡在"正在总结会话…"（无 fail-soft）。
- **[#107199](https://github.com/NousResearch/hermes-agent/issues/107199)** — 桌面 Bot Chat 在历史刷新后回退到 `default` 配置。
- **[#101039](https://github.com/NousResearch/hermes-agent/issues/101039)** — 微信/iLink "rate limited" 误报掩盖了连接不稳定。
- **[#105719](https://github.com/NousResearch/hermes-agent/issues/105719)** — `hermes status` 将其他用户的网关进程计入调用者（`/proc` 扫描无 UID 过滤）。
- **[#103717](https://github.com/NousResearch/hermes-agent/issues/103717)** — `multiplex_profiles` 丢弃来自次级配置所有者的后续消息（忙路径无配置作用域）。

### P3（外观 / 警告 / 低影响）
- **[#107296](https://github.com/NousResearch/hermes-agent/issues/107296)** — systemd 网关单元 PATH 遗漏 NixOS 的 `/run/current-system/sw/bin`。
- **[#101160](https://github.com/NousResearch/hermes-agent/issues/101160)** — Buzz 读空闲看门狗在健康的静默中继上每 300 秒重连。

**今日刚关闭的 P1：** [#106459](https://github.com/NousResearch/hermes-agent/issues/106459) — "永久不可压缩"的痛点群，此前已通过每周用户痛点挖掘器标记。

**修复覆盖率：** 今日约 13 个活跃 bug issue 中，**仅有一个（#107238 → #107260）有确认合并**。P1 集群大体上**仍未修复**，尤其是 Cron 死锁（#100401）与 GIL 事件循环停滞（#58576）。

---

## 6. 功能请求与路线图信号

值得在下个版本中关注的开放功能/增强请求：

| 功能 | Issue/PR | 进入 v0.22 的可能性 |
|---|---|---|
| 回合级实时时间上下文 | [#10421](https://github.com/NousResearch/hermes-agent/issues/10421)（9 👍） | **高** — 数据集中最强的点赞信号 |
| 独立桌面插件纳入插件目录 | [#107262](https://github.com/NousResearch/hermes-agent/issues/107262) + PR [#107314](https://github.com/NousResearch/hermes-agent/pull/107314) | **高** — PR 今日已开启 |
| 运算符自定义子智能体委托的工作者配置 | [PR #103346](https://github.com/NousResearch/hermes-agent/pull/103346) | 中 — needs-decision 标签 |
| 在运行时页脚展示当前活跃提供商 | [PR #95135](https://github.com/NousResearch/hermes-agent/pull/95135) | 中 |
| Cron 可信计划运行钩子 | [PR #93977](https://github.com/NousResearch/hermes-agent/pull/93977) | 中 |
| `lsp.servers` 中的自定义语言服务器 | [PR #103372](https://github.com/NousResearch/hermes-agent/pull/103372) | 中 |
| 经典 CLI 中的 Markdown 流式重设计 | [PR #107074](https://github.com/NousResearch/hermes-agent/pull/107074) | 中 |
| 在终端中运行助手 shell 代码块（桌面端） | [PR #92017](https://github.com/NousResearch/hermes-agent/pull/92017) | 低–中 |

**信号：** 维护者 `teknium1` 今日开启了两个 PR（[#107314](https://github.com/NousResearch/hermes-agent/pull/107314)、[#107295](https://github.com/NousResearch/hermes-agent/pull/107295)），表明**桌面插件架构转向**（插件上移到应用级作用域）即将到来。

---

## 7. 用户反馈摘要

**反复出现的痛点（从活跃 issue 中提炼的主题）：**

1. **提供商路由的意外行为** — 多个不同 issue（#59089、#74143、#88667、#99389）报告用户明确选择的提供商会被静默重新路由到 OpenRouter，或在自定义凭据上崩溃。用户感到自己正在失去**对模型选择的控制权**。
2. **静默的插件生命周期缺口** — 插件工具集被标记为"未知"（#71650、#91757 重复）、桌面插件在 null SDK 命名空间下失败（[PR #107309](https://github.com/NousResearch/hermes-agent/pull/107309)）、Kanban 完成绕过钩子（#106292）。用户希望**确定性的插件表现**。
3. **会话状态泄漏与压缩脆弱性** — #106459（已关闭）、#100602（开放）、#74712（系统提示词静默丢失）。用户报告**token 浪费、上下文丢失以及会话无法恢复** — 高影响挫败感。
4. **桌面 UI 不稳定** — #58576（51 秒冻结）、#105104（侧边栏点击 no-op）、#107199（刷新后配置错误）、#107238（开关被忽略）。**桌面端界面**是回归密度最高的区域。
5. **多用户 / NixOS 主机边缘场景** — #105719（跨用户进程扫描）、#107296（NixOS 上 systemd PATH）。高级用户存在摩擦。

**满意度解读：** bug issue 上没有任何正面反应（👍），最强的 👍（9）出现在**功能**请求（#10421）上，而非修复。社区在请求**新能力**，而不仅仅是稳定性工作 — 对一个活跃项目而言是健康信号，但已解决 bug 缺少 👍 也表明用户对表达感激并不像表达功能需求那样积极。

---

## 8. 待办观察 — 长期未回应或需维护者关注

| 条目 | 开启时间 | 已开放天数 | 关注点 |
|---|---|---|---|
| **[#10421](https://github.com/NousResearch/hermes-agent/issues/10421)** | 2026-04-15 | ~148 天 | 点赞最高的功能；需要维护者 `needs-decision` 决策 |
| **[#58576](https://github.com/NousResearch/hermes-agent/issues/58576)** | 2026-07-05 | ~67 天 | P1，跨组件，无 PR — 可能需要去除 GIL 或异步重构 |
| **[#71650](https://github.com/NousResearch/hermes-agent/issues/71650)** | 2026-07-26 | ~46 天 | 微小修复（重排校验顺序），两份重复报告（#91757）累积 — **可快速赢取** |
| **[#74712](https://github.com/NousResearch/hermes-agent/issues/74712)** | 2026-07-30 | ~42 天 | `codex_app_server` 系统提示词始终未发送 — 该运行时下整套 SOUL/记忆栈静默失效 |
| **[#67426](https://github.com/NousResearch/hermes-agent/pull/67426)** | 2026-07-19 | ~53 天 | `write_file` 路径规范化开放 PR；`needs-decision`、`blast-moderate` 标签，未合并 |
| **[#10421](https://github.com/NousResearch/hermes-agent/issues/10421)** | — | — | 同上；标记 `needs-decision` |
| **[#91981](https://github.com/NousResearch/hermes-agent/pull/91981)** | 2026-08-22 | ~19 天 | Docker worker 工作区，安全边界标签，作者披露大量使用 AI — 需仔细人工审查 |
| **[#88584](https://github.com/NousResearch/hermes-agent/issues/88584)** | 2026-08-17 | ~24 天 | 跨分支发布流水线（Nous→Enterkey）；83 条评论但似乎需要跨组织维护者协调 |

**维护者待办：**
- 解决 [#71650](https://github.com/NousResearch/hermes-agent/issues/71650) — 一行重排序即可关闭 2 个开放 issue。
- 分流 [#100401](https://github.com/NousResearch/hermes-agent/issues/100401) 与 [#58576](https://github.com/NousResearch/hermes-agent/issues/58576) — 二者均为 P1，且均已停滞。
- 决策 [#10421](https://github.com/NousResearch/hermes-agent/issues/10421) — 已开放 148 天，9 👍，已标记 `needs-decision`。

---

*摘要基于 2026-09-10 的 GitHub 活动生成。所有链接指向 NousResearch/hermes-agent 的 issue 与 PR。*

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-10

## 1. 今日概览

IronClaw 目前处于低活跃度但技术含量较高的开发阶段。过去 24 小时内仅有 1 个 issue 和 4 个 pull request 产生了活动，没有新的版本发布。所有 4 个 PR 仍保持开启状态，说明今天是一个活跃但尚未收尾的工作日。技术内容质量较高——开放的工作覆盖了 hosted-MCP 正确性、扩展打包语义以及 Telegram 体验，表明维护者的关注点在基础完整性而非表层功能。未出现重大故障或社区升级信号。

## 2. 版本发布

过去 24 小时内未发布任何新版本。无可报告的版本变更或更新日志更新。

## 3. 项目进展

**今天没有 PR 被合并或关闭。** 所有进行中的工作仍处于开启状态：

- [#8090](https://github.com/nearai/ironclaw/pull/8090) — `fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension`（更新于 2026-09-10）。旨在修复 hosted-MCP 服务器上一个跨租户工具列表覆盖的缺陷——该场景下工具发现依赖于调用方凭据。
- [#8084](https://github.com/nearai/ironclaw/pull/8084) — `feat(mcp): opt-in SEP-414 caller attribution on outbound hosted-MCP calls`（更新于 2026-09-09）。为出站 MCP 调用添加按会话归属和重试幂等语义。
- [#8085](https://github.com/nearai/ironclaw/pull/8085) — `fix(extensions): treat operator-installed packages like host-bundled ones`（更新于 2026-09-09）。调和扩展构造函数与校验器在处理内联动态 schema 时的不一致。
- [#8072](https://github.com/nearai/ironclaw/pull/8072) — `feat(telegram): register the Bot API command menu at activation`（更新于 2026-09-09）。在扩展生命周期边界添加原生 Telegram 命令菜单注册（`setMyCommands` / `deleteMyCommands`）。

以上均尚未合入，因此今天没有功能正式进入代码库。

## 4. 社区热门话题

所有列出的条目互动度都很低——每个 issue 和 PR 都是零点赞、零评论。没有病毒式讨论或争议性辩论可见。主题上最突出的线索是 **hosted-MCP 调用方键控（caller-keying）工作**，由同一作者发起两个相关 PR（[#8090](https://github.com/nearai/ironclaw/pull/8090)、[#8084](https://github.com/nearai/ironclaw/pull/8084)），呈现出一个连贯的设计方向：让 hosted MCP 服务器正确支持多租户并具备重试安全性。所回应的社区底层需求：**在多用户 / 托管环境中安全部署 IronClaw**，在这些场景下用户间隔离是硬性要求。

## 5. 缺陷与稳定性

**今天提交/更新了一个缺陷报告：**

| 严重程度 | 条目 | 描述 | 是否有修复？ |
|---|---|---|---|
| 中（UX） | [#8091](https://github.com/nearai/ironclaw/issues/8091) | WebChat v2 在按下回车确认 IME 组合输入时，会发送一条聊天消息，导致未完成文本外泄。报告者指出这似乎是之前已修复行为的一次复现。 | 尚未关联 PR。 |

今天未报告崩溃、数据丢失或安全回归。唯一开放的缺陷是 WebChat v2 IME 流程中一个局部化的输入处理回归。

## 6. 功能请求与路线图信号

过去 24 小时内没有用户明确提交的功能请求。然而，由维护者发起的 PR 构成了前瞻性的路线图信号：

- **Hosted MCP 多租户**（[#8090](https://github.com/nearai/ironclaw/pull/8090)、[#8084](https://github.com/nearai/ironclaw/pull/8084)）——强烈暗示下一个版本将使 IronClaw 的 MCP 集成能够部署为共享托管服务，并具备正确的调用方隔离与符合 SEP-414 的归属机制。
- **扩展打包一致性**（[#8085](https://github.com/nearai/ironclaw/pull/8085)）——表明正在清理扩展安装期不变量，是更广泛分发/部署工作流的前置工作。
- **Telegram 原生命令菜单**（[#8072](https://github.com/nearai/ironclaw/pull/8072)）——标志着对 Telegram 渠道作为一等交互面的持续投入。

下一版本可能性：Telegram 命令菜单很高（低风险、范围明确、依赖较轻）；MCP 调用方键控修复为中等（架构上重要但可能需要额外评审）；SEP-414 归属功能为可选启用，很可能与该修复一同发布。

## 7. 用户反馈摘要

今天的用户层面信号量极少。唯一的用户报告条目 [#8091](https://github.com/nearai/ironclaw/issues/8091) 表达了对 WebChat v2 输入处理回归的不满，影响使用非英语 / IME 的用户。痛点具体且可复现：一次本应完成文本组合的按键意外地触发了消息发送。从现有互动（所有条目均为 0 反应、0 评论）无法有意义地评估满意度，但报告者的技术描述相当精准，提示其为一位有经验的用户。

## 8. 待办观察

今天活动集中的条目都没有陈旧——所有条目日期均在 2026-09-08 或 2026-09-09，远在有效关注窗口内。以下值得维护者以监控模式留意：

- [#8091](https://github.com/nearai/ironclaw/issues/8091) — WebChat v2 的 IME 缺陷；报告为之前已修复行为的复现，需要尽快分诊以确认是回归还是新出现的表面现象。
- [#8090](https://github.com/nearai/ironclaw/pull/8090) — hosted-MCP 上的多租户正确性修复；正确性影响很大（跨用户工具覆盖），应优先安排评审。
- [#8072](https://github.com/nearai/ironclaw/pull/8072) — 今天 PR 中最老的一个（创建于 2026-09-04）；标注为低风险、仅涉及文档与依赖、贡献者为资深——若评审者有余力，是快速取胜的候选。

今天的数据集中没有长期未得到回应的条目浮现。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-10

## 1. 今日概览

QwenPaw 目前处于高活跃度的预发布稳定阶段。维护者已于同日发布 **v2.2.1-beta.2**，并照例开出了发布值班验证工单（#7674）。流水线在 24 小时内共有 **62 项 issue/PR 更新**，合并/关闭率达到健康的 41%（33 个 PR 中合并 13 个），表明正在进行主动分流而非积压。任务分布偏向 **渠道可靠性**（飞书死锁、企业微信流式问题、Telegram 轮询黑洞）、**内存子系统成熟化**（ReMe 命令、记忆后端回退、FTS 损坏），以及 **测试覆盖加固**（多个 +2.4k 与 +382 用例的 PR 落地）。今日新增一份关于 Windows 安全沙箱的关键报告（#7672），应及时处理。整体项目健康度：**活跃且持续交付**，主要风险集中在跨会话/多渠道状态机层面。

## 2. 版本发布

### v2.2.1-beta.2 — 发布于 2026-09-10
- **类型：** Beta（预发布）
- **发布页：** https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2

**变更内容：**
- `feat(console): improve mobile agent selector` — [#7623](https://github.com/agentscope-ai/QwenPaw/pull/7623) by @zhaozhuang521
- `chore: bump the version to 2.2.1b2` — [#7643](https://github.com/agentscope-ai/QwenPaw/pull/7643) by @cuiyuebing
- `fix(console): align qwenpaw CSS selectors` — by @zhaozh（PR 在信息流中被截断）

**迁移说明：** Beta 版本；当前使用 2.2.0 稳定版的用户不会被强制升级。发布值班清单 #7674 要求在 2026-09-10 14:20 UTC 前完成全部一级平台的安装验证。变更日志中未涉及破坏性的 schema 或配置变更。

## 3. 项目进展（已合并/已关闭 PR）

**今日关闭（重要）：**
- **#7647** — `fix(channels): support Base64 data URLs in outbound media`（[链接](https://github.com/agentscope-ai/QwenPaw/pull/7647)）— 解决企业微信图片发送崩溃问题；与 #7516 和 #7370 配套。
- **#7663** — `fix(memory): fall back when plugin backend is unavailable`（[链接](https://github.com/agentscope-ai/QwenPaw/pull/7663)）— 提升记忆用户体验韧性；已配置的后端信息在磁盘上保留。
- **#7658** — `fix(backup): preserve Unix permission bits during restore for SECRET_DIR and .master_key`（[链接](https://github.com/agentscope-ai/QwenPaw/pull/7658)）— **安全修复**，修复静默发生的权限退化（`0o700→0o755`、`0o600→0o644`）。
- **#7655** — `fix(history): repair FTS corruption and retention cleanup`（[链接](https://github.com/agentscope-ai/QwenPaw/pull/7655)）— 修复 #7596（`history.db` 中的 `SQLITE_CORRUPT_VTAB`）。
- **#7641** — `fix(release): retry and verify desktop artifact downloads`（[链接](https://github.com/agentscope-ai/QwenPaw/pull/7641)）— 提升发布工具链可靠性。
- **#7667** — `fix(files): show upload only in workspace`（[链接](https://github.com/agentscope-ai/QwenPaw/pull/7667)）— 明确前端作用范围。
- **#7645** — `test(e2e): rebuild the Environments suite for the unified env page`（[链接](https://github.com/agentscope-ai/QwenPaw/pull/7645)）— 在 #7538 重构后保持 e2e 测试绿灯。
- **#7325** — `test(console): expand console unit tests`（+382 用例，+5.49pp）（[链接](https://github.com/agentscope-ai/QwenPaw/pull/7325)）— 质量提升。
- **#6978** — `feat(commands): add session management slash commands`（[链接](https://github.com/agentscope-ai/QwenPaw/pull/6978)）— 首次贡献者作品；为 IM 渠道提供 `/sessions`、`/session` 接口。

**综合效果：** 一组围绕 **记忆 + 备份 + 历史** 的耐久性修复同时落地，呈现协同的可靠性冲刺；同时 QPQAT 发起的测试覆盖计划持续推进（仅一个 PR 就新增了 2,475 个后端用例）。

## 4. 社区热点

| 排名 | 条目 | 互动量 | 背后诉求 |
|---|---|---|---|
| 1 | [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — 模型回复在持久化后从上下文中消失 | 10 条评论 | 对话连续性的信任；"模型看不到自己刚说过的话"这一长期 UX 问题 |
| 2 | [#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — 优化部署页入口位置 | 9 条评论 | platform.agentscope.io/deploy 托管部署页面的移动优先 UX |
| 3 | [#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — Console 停止会取消飞书会话 | 8 条评论 | 跨渠道会话身份隔离 |
| 4 | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — 裸 base64 工具输出被拒（返回 400） | 7 条评论 | 在 agent→model 契约中提供一等公民的多模态支持 |
| 5 | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — 同步调用冻结事件循环（118–135s） | 6 条评论 | Windows 桌面端的启动/响应速度 |

**贯穿性信号：** 前五名中有三项都涉及 **跨 UI 界面与渠道的会话/状态正确性**。社区实际上在呼吁一套统一且权威的会话身份模型，能够穿越界面切换与渠道交接 —— 这是 QwenPaw 长期存在的一类问题。

## 5. Bug 与稳定性

按影响范围与可复现性排序：

| 严重程度 | Issue | 组件 | 修复状态 |
|---|---|---|---|
| 🔴 严重 | [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) — Windows 安全沙箱绕过 | 核心沙箱 | **尚无修复 PR** |
| 🔴 高 | [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — 事件循环阻塞 118–135s，超时未触发 | 运行时/桌面 | 尚无修复 PR |
| 🔴 高 | [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) — 飞书队列消费者死锁，会话静默无响应 | 飞书渠道 | 尚无修复 PR |
| 🟠 中 | [#7597](https://github.com/agentscope-ai/QwenPaw/issues/7597) — 工具返回的图片/PDF 以裸 base64 形式提交 → 400 | 工具契约 | 今日合并集合中无直接修复 |
| 🟠 中 | [#7596](https://github.com/agentscope-ai/QwenPaw/issues/7596) — `history.db` FTS 损坏，在完整性检查中静默 | 历史/SQLite | **已由** [#7655](https://github.com/agentscope-ai/QwenPaw/pull/7655) **修复** |
| 🟠 中 | [#7445](https://github.com/agentscope-ai/QwenPaw/issues/7445) — QwenPaw Hub 在 LAN/本地 URL 上无法连接 | Hub | 尚无修复 PR |
| 🟠 中 | [#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507) — 企业微信 150ms 字符节流 | 企业微信渠道 | 尚无修复 PR |
| 🟠 中 | [#7668](https://github.com/agentscope-ai/QwenPaw/issues/7668) — 邮件监控 `last_uid=0` 导致整个收件箱被重新处理 | 邮件监控 | 尚无修复 PR |
| 🟡 低 | [#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642) — Chrome 控制台流式输出无渲染 | Console | 今日关闭 |
| 🟡 低 | [#7661](https://github.com/agentscope-ai/QwenPaw/issues/7661) — 首次提问时新建对话被重复创建 | Console | 尚无修复 PR |
| 🟡 低 | [#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666) — 本地模型无法从 HF 下载 | 桌面 | 已关闭（先关闭后续评审） |
| 🟡 低 | [#7662](https://github.com/agentscope-ai/QwenPaw/issues/7662) — Telegram 轮询在代理后静默停止 | Telegram 渠道 | 今日关闭 |

**安全项：** Windows 沙箱绕过报告 #7672 是一份刚开、单条评论的 issue，不应任其搁置。

## 6. 功能请求与路线图信号

当前活跃且有望进入下一个次要版本（2.2.x → 2.3）的候选：

| 功能 | Issue / PR | 可能性 | 理由 |
|---|---|---|---|
| ReMe 斜杠命令统一 | [#7444](https://github.com/agentscope-ai/QwenPaw/pull/7444) | **高** | 已基于落地的 #7561 基础进行 rebase；面向聊天的接口已就绪 |
| Advisor 模式（双模型 worker/advisor 循环） | [#7569](https://github.com/agentscope-ai/QwenPaw/pull/7569) | 高 | 自洽的循环模式；契合现有 "Goal/Mission" 选择器模式 |
| PawPort 导入流程（Codex/Qoder） | [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) | 中-高 | 长寿 issue（自 2026-08-13 起），持续更新中 |
| ntfy 渠道支持 | [#7657](https://github.com/agentscope-ai/QwenPaw/issues/7657) | 中 | 作者提供了可运行实现；契合自托管理念 |
| MCP `tls_verify` / `ca_file` | [#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) | 中 | 已存续 4 个月；企业/私有 CA 部署所需 |
| 附件图片过大时自动缩小 | [#7671](https://github.com/agentscope-ai/QwenPaw/issues/7671) | 中 | 范围明确；可消除一个令人沮丧的体验断崖 |
| Files 面板 Preview 支持语法高亮 | [#7670](https://github.com/agentscope-ai/QwenPaw/issues/7670) | 低-中 | 表面优化但易于实现 |
| 在 `MemoryConfig` 中分离 `memory_model` | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) | 中 | 成本控制的叙事颇具说服力 |
| 原生移动端（Expo/RN） | [#7378](https://github.com/agentscope-ai/QwenPaw/pull/7378) | 低（更长周期） | 标注 `[DO NOT MERGE]`；尚处探索阶段 |
| 第三方持久记忆集成（MemCode） | [#7656](https://github.com/agentscope-ai/QwenPaw/issues/7656) | 低 | 厂商对接类 issue；可作为生态信号参考 |

## 7. 用户反馈汇总

- **痛点 — 稳定性胜于花活：** 今日最热的 issue 都聚焦于静默失败（#7579、#7534、#7668、#7662）。用户反复反映在很多场景下无法区分智能体"在思考"还是"卡死"。一个清晰的 **会话活跃度指示器 + 自动恢复机制** 被反复提及。
- **痛点 — Windows 桌面体验：** #7363（长达数分钟的冻结）、#7672（沙箱）、#7666（HF 下载）都集中在 Windows，表明桌面端与 macOS/Linux 的体验差距切实存在。
- **痛点 — 移动端人体工学：** #7177 与 #7642（仅 Chrome 流式输出）显示移动端/浏览器版 Console 仍需专门的 UX 打磨 —— v2.2.1b2 的智能体选择器优化（#7623）只是起点而非终点。
- **正面信号：** #7569（Advisor 模式）、#7444（ReMe 命令）、#6960（PawPort）持续产生积极互动且无投诉线程，表明社区认可 **可插拔模型角色** 与 **可移植性** 的方向。
- **生态人气：** 首次贡献者（myselfAbdullah007、chenzier、LUOSENGWA）正在提交有意义的修复（#7611、#7614、#6978） —— 贡献门槛处于健康水平。

## 8. 待办观察

以下条目已超出应有的悬置时间，仍处于未回应状态：

| 条目 | 存续时长 | 重要性 | 需采取的行动 |
|---|---|---|---|
| [#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113) — 团队协作在首次请求时被忽略 | **约 5 个月**（2026-04-08） | 已确认可复现；属核心宣传特性 | 分配至里程碑，或给出理由后关闭 |
| [#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) — MCP 客户端的 `tls_verify`/`ca_file` | **约 4 个月**（2026-05-10） | 阻碍企业 MCP 集成 | 打上 `accepted` 或 `needs-design` 标签 |
| [#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507) — 企业微信 150ms 字符节流 | 8 天 | 影响每位企业微信用户；性能立竿见影 | 快速修复候选 |
| [#7445](https://github.com/agentscope-ai/QwenPaw/issues/7445) — Hub 本地 URL 连接问题 | 10 天 | Hub 是 2.2 的旗舰特性 | 需回应并开出修复分支 |
| [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) — 飞书队列死锁 | 7 天 | 会话级别故障；影响生产用户 | 不应错过下一个版本 |
| [#7363](https://github.com/agentscope-ai/QwenPaw/issues/7363) — 同步事件循环阻塞 | 14 天 | 冷启动 UX 回退 | 需由维护者显式认领 |
| [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) — Windows 沙箱绕过 | **不足 24 小时** | 安全严重级 | 立即分诊并评估 CVE |

---

**结论：** QwenPaw 正在稳定推进（v2.2.1-beta.2 顺利发布），同时围绕记忆、历史与渠道层开展一轮有意识的可靠性清扫。下一个稳定版本最实质的风险是：（1）Windows 沙箱报告 #7672；（2）飞书死锁 #7534；（3）反复出现的跨会话状态类 bug（#7579、#7011、#7661、#7231） —— 把后者作为一类问题集中处理，而不是逐个击破，将带来超额的稳定性收益。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-10

## 1. 今日概览

ZeroClaw 呈现出异常高的治理与架构导向的活动模式。在 26 条 issue 更新与 50 条 PR 更新中，项目由**长期推进的 RFC**（运行时会话、文件/附件架构、WASM 插件运行时、仅追加事件历史）和**追踪类条目**主导，而非大量新功能落地。过去 24 小时内关闭了 2 条 issue 和若干 PR，但**未发布任何新版本**，表明项目处于设计与稳定化阶段，而非发布阶段。活动集中在少数高影响力贡献者之间（Audacity88、NiuBlibing、IftekharUddin），维护者的注意力通过 issue #8692 的决策队列明确路由。

## 2. 版本发布

**过去 24 小时内无新版本发布。** 本期摘要暂无版本标签或发布说明可供记录。

## 3. 项目进展

过去 24 小时内关闭/合并的 PR（共 7 个）：

- **[#9212](https://github.com/zeroclaw-labs/zeroclaw/pull/9212)** — `feat(eval): gate CI on the replay regression suite` — 将回放 fixture 拆分至 `evals/regression/`，并通过 `crates/zeroclaw-eval/tests/regression_suite.rs` 将其设为强 CI 关卡，包含一个负向用例（`no_tools_on_greeting.json`）。
- **[#8546](https://github.com/zeroclaw-labs/zeroclaw/pull/8546)** — `fix(cli): localize status fragments` — 基于当前 master 刷新，补齐缺失的 dashboard 与文件系统隔离回归测试；CLI 状态现已本地化。
- **[#10730](https://github.com/zeroclaw-labs/zeroclaw/pull/10730)** — `chore(assets): optimize PR-evidence images via ImgBot lossless compression` — 14 个 PNG 资源已无损压缩。
- （另有 4 个已关闭 PR 未列入 top-20 评论列表。）

过去 24 小时内关闭的 issue：

- **[#10548](https://github.com/zeroclaw-labs/zeroclaw/issues/10548)** — PR #10515 引入的 Mermaid 图表 `aria-hidden` 可访问性回归；已修复。
- **[#10540](https://github.com/zeroclaw-labs/zeroclaw/issues/10540)** — `zeroclaw status` 现已上报 Web dashboard 资源可用性。

净进展信号：渐进式、偏治理导向。无用户可见的新功能落地；已关闭的工作集中在 CI 加固、i18n 与诊断改进上。

## 4. 社区热点话题

| # | 条目 | 评论数 | 类型 |
|---|---|---|---|
| [#9487](https://github.com/zeroclaw-labs/zeroclaw/issues/9487) | RFC：Runtime-owned conversation sessions and transport surface adapters (Rev. 5) | 37 | RFC, p2 |
| [#9488](https://github.com/zeroclaw-labs/zeroclaw/issues/9488) | RFC：Unified file and attachment architecture for conversation surfaces (Rev. 10) | 30 | RFC, p2 |
| [#6996](https://github.com/zeroclaw-labs/zeroclaw/issues/6996) | RFC：Granular sandbox policy — filesystem restrictions | 29 | RFC, p2, accepted |
| [#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396) | RFC：Make wire protocol first-class in provider construction | 19 | RFC, p2 |
| [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) | Tracker：Maintainer decision queue for RFCs and design issues | 15 | Tracker |

**底层诉求：**会话与渠道子系统正围绕统一的 runtime-owned session 模型、统一的附件处理以及 wire-protocol-as-first-class 进行重新架构。这意味着项目正处于 agent ↔ channel 边界核心重写的中期，社区讨论能量主要集中在这一区域。维护者决策队列追踪条目（#8692）明确承担起吸收这些长期 RFC 决策积压的职责——这是一个信号，表明非正式评审已触及极限。

## 5. Bug 与稳定性

按严重程度标签与风险排序：

| 严重程度 | Issue | 描述 | 是否有修复 PR |
|---|---|---|---|
| **S1（工作流阻塞）** | [#10673](https://github.com/zeroclaw-labs/zeroclaw/issues/10673) | 失败的 ACP 轮次未在 daemon RPC 路径上持久化（ZeroCode Code 面板）—— #9333 的剩余切片 | 相关修复已在 #9378 落地；本切片尚无关联 PR |
| **S1/P1** | [#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645) | 成本追踪上下文未传递至委托子循环；`check_tool_loop_budget` 返回 None | 无修复 PR |
| **High（依赖）** | [#10728](https://github.com/zeroclaw-labs/zeroclaw/issues/10728) | `npm audit` 失败——`js-yaml` 存在高危漏洞 | 无 PR |
| **S2** | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) | 在 Windows nextest 上 `process_line` 发生栈溢出（`0xc00000fd`），位于 `zeroclaw-runtime::rpc::dispatch::tests` | 无修复 PR |
| **S2** | [#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731) | `zeroclaw service logs` 在 macOS/Windows/OpenRC 上无任何输出 | 无修复 PR |
| **S2** | [#10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741) | ZeroCode 在一次看似正常的完成响应后静默暂停队列中的工作 | 无修复 PR |
| **S2** | [#10740](https://github.com/zeroclaw-labs/zeroclaw/issues/10740) | `Ctrl+N` 与 `[+]` 侧边栏在"new session"语义上不一致 | 无修复 PR |
| **S2** | [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | 预输出流失败时跳过了声明的非流式回退路径 | 无修复 PR |
| **S2** | [#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689) | 当回复以 `[` 开头（ElevenLabs v3 音频标签）时 Telegram 语音回复被跳过 | 无修复 PR |
| **S2/Follow-up** | [#10662](https://github.com/zeroclaw-labs/zeroclaw/issues/10662) | OAuth 系统前缀缓存标记低于 Anthropic 的下限，占用一个断点 slot | 无修复 PR |

**模式：** 10 个活跃 bug 中有 6 个**未关联修复 PR**。最紧迫的稳定性风险为：(a) daemon RPC 路径上 ACP 轮次持久化丢失，以及 (b) 委托子循环中成本执行存在缺口——两者均为尚无待提交补丁的安全/正确性问题。

## 6. 功能请求与路线图信号

活跃的增强类 RFC 与功能工作：

- **[#10076](https://github.com/zeroclaw-labs/zeroclaw/issues/10076)** — 可组合的 WASM 插件运行时架构（Rev. 2026-09-01，会话历史已拆分至 #10526）。**很可能塑造未来的一个版本**；被声明为今后仅追加事件词汇表的唯一权威来源。
- **[#10526](https://github.com/zeroclaw-labs/zeroclaw/issues/10526)** — 仅追加的会话事件历史，具备确定性回放与派生 agent 流。**未来记忆连续性特性的基石。**
- **[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** — RFC 投票机制简化（取消强制讨论窗口，REVISE 即终止当前快照）。流程变更；预计可快速落地。
- **[#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360)** — 可选的家居边缘网格，配备 pull worker 与签名回执。更宏观的架构方向。
- **[#10346](https://github.com/zeroclaw-labs/zeroclaw/issues/10346)** — Gateway/channels 采用 heartbeat worker 的 MCP-registry 缓存模式（修复每次启动 3× stdio spawn 问题）。
- **[#9967](https://github.com/zeroclaw-labs/zeroclaw/issues/9967)** — harness 评测框架追踪条目（基准选择、配置锁定、master 上的基线）。

最有可能在下一版本落地的开放 PR：

- **[#10716](https://github.com/zeroclaw-labs/zeroclaw/pull/10716)** — 按配置的写入溢价进行价格缓存写入（成本账本修复，覆盖 11 个 provider 后端）。
- **[#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480)** — 使用类型化 adapter 可识别代码隔离 provider 拒绝的图片（Anthropic + 兼容）。
- **[#10640](https://github.com/zeroclaw-labs/zeroclaw/pull/10640)** — 被动 Telegram 群组上下文（可选 `passive_group_context`）。
- **[#10623](https://github.com/zeroclaw-labs/zeroclaw/pull/10623)** — 面向 OpenAI 兼容 provider 的 Anthropic prompt-cache passthrough。
- **[#10455](https://github.com/zeroclaw-labs/zeroclaw/pull/10455)** — Gateway 配置写入不变量（与安全相关；区分配置写入安全性）。
- **[#9535](https://github.com/zeroclaw-labs/zeroclaw/pull/9535)** — 按模型窗口比例进行上下文压缩（XL 级变更；涉及多个 crate）。
- **[#10553](https://github.com/zeroclaw-labs/zeroclaw/pull/10553)** — ZeroCode "Add to Chat"，用于转写选区。

## 7. 用户反馈摘要

从今日条目中可直接观察到的用户/运维者痛点：

- **跨平台 daemon 诊断已失效。** `zeroclaw service logs` 在 macOS、Windows 与 OpenRC 上健康运行却无任何输出（[#10731](https://github.com/zeroclaw-labs/zeroclaw/issues/10731)）。运维者无法脱离 `journalctl` 假设观察 daemon 状态。
- **Windows CI 脆弱。** 在受限的 Windows 线程栈下 `process_line` 测试发生栈溢出（[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)），表明测试套件假设了 Linux 友好的栈大小。
- **Telegram 体验缺口。** ElevenLabs v3 音频标签（`[...]`）会静默降级为纯文本语音回复，且无日志记录（[#10689](https://github.com/zeroclaw-labs/zeroclaw/issues/10689)）。
- **ZeroCode TUI 不一致。** Ctrl+N 语义与 `[+]` 侧边栏相左（[#10740](https://github.com/zeroclaw-labs/zeroclaw/issues/10740)）；在一次干净的响应后队列中的工作可能静默卡住（[#10741](https://github.com/zeroclaw-labs/zeroclaw/issues/10741)）。
- **供应链隐患。** `js-yaml` 高危审计发现（[#10728](https://github.com/zeroclaw-labs/zeroclaw/issues/10728)）由 CI 自动提出；其处理节奏对下游运维者至关重要。
- **架构诉求。** 运维者希望通过家居边缘网格（[#10360](https://github.com/zeroclaw-labs/zeroclaw/issues/10360)）获得单一运行时的扩展路径——现有的"单主机"模型被视为天花板。

数据集中未出现明确的满意度/不满评价（所有 issue 的点赞数均为 0）。

## 8. 待办积压观察

需要维护者关注且近期未推进的条目：

- **[#10412](https://github.com/zeroclaw-labs/zeroclaw/pull/10412)** — XL 级 PR，抽取 `SessionBackend::claim_session_agent_alias`；`needs-author-action`。相对同类条目已显陈旧（开于 2026-08-27）。
- **[#10468](https://github.com/zeroclaw-labs/zeroclaw/pull/10468)** — XL 级 PR，向会话工具暴露 owned ACP 会话；`needs-maintainer-review`，`risk:high`。与 ACP 流程安全相关。
- **[#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)** — XL 级多模态 PR，加入像素级图片校验；`needs-author-action`，`risk:high`。对防止损坏图片导致的 provider 失败至关重要。
- **[#9214](https://github.com/zeroclaw-labs/zeroclaw/pull/9214)** — XL 级 eval 实时执行模式 PR；依赖于 #9212（现已关闭）。很可能解锁。
- **[#9225](https://github.com/zeroclaw-labs/zeroclaw/pull/9225)** — XL 级 eval PR，新增 boundary-backed 回放用例；叠加于 #9212（已关闭）之上，因此当前很可能可行动。
- **[#10346](https://github.com/zeroclaw-labs/zeroclaw/issues/10346)** — Gateway/channel 共享 MCP-registry 缓存模式的 RFC；`needs-author-action`。已陈旧（开于 2026-08-25）。
- **[#8396](https://github.com/zeroclaw-labs/zeroclaw/issues/8396)** — Wire-protocol-first-class RFC；`needs-author-action`，自 Rev. 15 以来无维护者动作。
- **[#10645](https://github.com/zeroclaw-labs/zeroclaw/issues/10645)** — P1 成本追踪 bug；**无修复 PR 待处理**，影响委托子循环的预算执行。

**维护者瓶颈信号：** `needs-maintainer-review` 是高影响力 RFC 与 PR 上占主导的关卡标签。当前活跃的决策队列追踪条目（[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)）是项目的明确缓解手段；其吞吐能力将决定下一版本的形态。

---

*本摘要基于 2026-09-10 的 GitHub 活动快照生成。来源：[github.com/zeroclaw-labs/zeroclaw](https://github.com/zeroclaw-labs/zeroclaw)。*

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*