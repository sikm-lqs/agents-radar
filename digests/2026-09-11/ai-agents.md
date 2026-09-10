# OpenClaw 生态日报 2026-09-11

> Issues: 421 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-10 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-11

## 1. 今日概览

OpenClaw 在 **v2026.6.35**（2026 年 6 月 LTS 最终版本）发布之后进入了密集的稳定化阶段。仓库活跃度依然很高，过去 24 小时内共有 **421 个 issue 更新**（236 个仍开放，185 个已关闭）以及 **500 个 PR 被触及**（241 个开放，259 个合并/关闭）。问题类型主要集中在两个子系统的 P0/P1 回退：**memory-core**（SQLite 锁、无限增长、reindex 锁泄漏）以及 **codex/codex-cli** 集成（僵尸子进程、语音消息丢失、转录镜像重复）。这表明这两个子系统是当前的技术债热点。维护者的分诊动作清晰可见——大量近期 issue 都带有 `clawsweeper` 队列标签（`fix-shape-clear`、`queueable-fix`、`needs-maintainer-review`），说明是在有意识地梳理 backlog，而非临时救火。

## 2. 发布

**v2026.6.35 — `openclaw 2026.6.35`**（2026 年 6 月 Extended Stable / LTS 最终版本）

- **更安全的 provider 与 channel 边界：** 内置 provider 与 channel adapter 现在会对不可信的响应体进行边界约束，在执行重型操作前拒绝超量输入，并在传输过程中的瞬时故障下保留安全的恢复路径。LTS 通道上的运维者将看到与畸形上游负载相关的崩溃循环减少。
- 该版本被标记为 **6 月 LTS 终版**，后续只会接收关键/安全补丁；想要新功能的用户应规划迁移到滚动发布的 2026.9.x 分支（当前为 2026.9.3）。

除标准的 `openclaw doctor` 建议之外，没有公开的迁移说明。（[Release 链接](https://github.com/openclaw/openclaw/releases/tag/v2026.6.35)）

## 3. 项目进展

合并/关闭速度（500 个被触及的 PR 中有 259 个落地）反映出健康的吞吐。过去 24 小时内值得关注的落地工作：

- **[#144292](https://github.com/openclaw/openclaw/pull/144292) — `fix(agents): avoid sibling output limits for unlisted models`**（合并/关闭，diamond-lobster）。自定义 provider 中未列出的模型不再继承首个列出行的 `max_tokens` 上限。（关闭 [#144160](https://github.com/openclaw/openclaw/issues/144160)。）
- **[#144438](https://github.com/openclaw/openclaw/pull/144438) — `fix(agents): preserve captured fallback model selections`**（关闭，platinum-hermit）。解决了 `entry → middle → final` 别名被双重消费、可能落地错误 fallback 层级的问题。
- **[#144367](https://github.com/openclaw/openclaw/pull/144367) — `fix(doctor): repair fails after removing a bundled plugin alias`**（关闭，P1）。对已选定的迁移 owner 进行排序，使 immutable-plan 检查在 Doctor 插件清理后不再拒绝合法的 finalization。
- **[#144478](https://github.com/openclaw/openclaw/pull/144478) — `chore(ui): refresh control ui locales`**（关闭）。由机器人生成的 locale 同步 PR，沿可审查路径保留。
- **[#142626](https://github.com/openclaw/openclaw/pull/142626) — `fix(imessage): restore feedback after bridge recovery`**（开放，automerge 已就绪）。iMessage 的输入指示器与已读回执将在私有 bridge 从卡顿恢复后回归。（关闭 [#142603](https://github.com/openclaw/openclaw/issues/142603)。）
- **[#144495](https://github.com/openclaw/openclaw/pull/144495) — `fix(memory): keep lexical recall available during failed upgrades`**（开放）。当自动 chunking 升级重建失败时，记忆搜索不再返回零结果，最后发布的 lexical index 仍然可查询。

## 4. 社区热门话题

评论最多的帖子集中在系统性的、多 issue 的类别上，而非孤立 bug：

- **[#125626](https://github.com/openclaw/openclaw/issues/125626) — OpenClaw 2026.8.1 beta 反馈**（关闭，24 条评论，Patrick-Erichsen，维护者精选）。今日互动量最大的单条帖；用于汇总 8 月 beta 的现场报告，是维护者分诊 9 月版本的依据。
- **[#91009](https://github.com/openclaw/openclaw/issues/91009) — Codex PreToolUse hook relay 生成 CPU 密集的 `openclaw-hooks` 进程并阻塞网关 RPC**（开放，22 条评论，P0 🦪）。在 2026.6.1 上，Codex 的 hook relay 进程各自消耗 100%+ CPU，从而阻塞网关 RPC。底层需求：一份干净、原生 provider hook 的进程生命周期契约，并带有受控的 CPU/IO 预算。
- **[#97616](https://github.com/openclaw/openclaw/issues/97616) — OpenClaw 泄漏未被回收的 hook/tool 子进程**（开放，16 条评论，P1 🦞）。僵尸进程（`openclaw-hooks`、`bash`、`codex`）作为主进程的子进程持续累积，拖垮运行时。与 #91009 叠加，指向一处系统性的子进程回收缺口，团队需要作为一个特性统一处理。
- **[#114612](https://github.com/openclaw/openclaw/issues/114612) — `memory-core` SQLite 无限增长**（开放，13 条评论，P2 🦞）。`memory_index_chunks` 与 `memory_embedding_cache` 没有任何保留策略——生产实例已经出现多 GB 增长。底层需求：保留/淘汰机制以及对记忆存储的可观测性。
- **[#139714](https://github.com/openclaw/openclaw/issues/139714) — `update_runs` 行已接收但从未 finalize**（关闭，13 条评论）。Core 更新恢复后的子进程一直报告"update in progress"。一处清晰、范围较小的 bug，很可能是单行修复，并且暴露了一个有据可查的状态机缺口。
- **[#132762](https://github.com/openclaw/openclaw/issues/132762) — 工具结果上的溢出重试以成功结束，但没有任何最终投递**（关闭，12 条评论）。多阶段文档工作流产生了一个 `toolResult` 最终项，但没有 assistant 响应，因此用户视角看不到任何交付。

**社区底层需求：** 持久的投递语义、受控的后台工作，以及对用户和运维者都可见的状态。"卡在 pending 状态"与"资源泄漏"类报告的数量说明，OpenClaw 正在被用于比其最初生命周期设计更长的运行工作流。

## 5. Bug 与稳定性

按严重度 × 影响 × 开放状态排序：

### P0 — 崩溃循环 / 阻塞发布
- **[#142585](https://github.com/openclaw/openclaw/issues/142585)** — `2026.9.3 Doctor 在缺少规范行的情况下拒绝合法的旧 workspace 设置与 attestation 导入`（开放，🦐 gold shrimp）。从 2026.7.1-2 → 2026.9.3 的迁移阻塞项。修复 PR：**目前尚未观察到**——需要维护者分诊。
- **[#140162](https://github.com/openclaw/openclaw/issues/140162)** — Windows 网关重启在 181 秒超时后将已就绪/慢启动的网关当作"陈旧进程"杀掉（开放，🦚 platinum hermit）。尚无修复 PR。
- **[#91009](https://github.com/openclaw/openclaw/issues/91009)** — Codex hook relay CPU 密集卡顿（参见 §4）。尚无关联修复 PR。
- **[#101763](https://github.com/openclaw/openclaw/issues/101763)** — Hosted Molty 模型选择器未持久化；API 收到 `claude-opus-4.8`（带点）而非 `claude-opus-4-8`（关闭，🦐 gold shrimp）。今日关闭，假定已修复。

### P1 — 会话状态 / 消息丢失
- **[#97616](https://github.com/openclaw/openclaw/issues/97616)** — 子进程泄漏 / 僵尸进程累积。尚无修复 PR。
- **[#136183](https://github.com/openclaw/openclaw/issues/136183)** — SSH 在 banner 交换阶段 SIGTERM 卡死，2026.8.1 → 2026.8.2 回退（开放）。尚无修复 PR。
- **[#117262](https://github.com/openclaw/openclaw/issues/117262)** — SQLite 争用：3 个并发写句柄导致约 33 秒事件循环停顿（DEF-61）（开放，🦞）。很可能是多个 memory 问题背后的根因模式。尚无修复 PR。
- **[#136311](https://github.com/openclaw/openclaw/issues/136311)** — `memory-core` reindex 锁在每次 Gateway 启动时都被重新获取；19 GB 孤立临时数据库（开放，🐚 platinum hermit）。尚无修复 PR。
- **[#139847](https://github.com/openclaw/openclaw/issues/139847)** — 回复运行进行中时消息被丢弃（`Reply operation has no active tool authority snapshot`）—— 2026.9.2 中的回退（开放，🦞）。尚无修复 PR。
- **[#142476](https://github.com/openclaw/openclaw/issues/142476)** — 2026.9.3 的 cron 会话回收器对全部 632 个 agent DB 同步执行 `PRAGMA integrity_check`，阻塞事件循环 14–76 秒（开放，🦞）。尚无修复 PR。
- **[#144424](https://github.com/openclaw/openclaw/issues/144424)** — Heartbeat-lane 风暴触发真实的 Anthropic 429，且退避策略未被遵守（开放，🦞）。自维持的失效模式。尚无修复 PR。
- **[#137366](https://github.com/openclaw/openclaw/issues/137366)** — `memory_search` 在脏状态时触发全量源端协调，造成 CPU 饥饿与超时（开放，🦞）。尚无修复 PR。
- **[#144269](https://github.com/openclaw/openclaw/pull/144269)** — `fix(agents): preserve tool restrictions across session sends`（PR 开放，P0 🦐，安全边界风险）。子委派的回合可能会重新拿到发送方已移除的工具。**PR 处于开放状态并被打上 "needs proof" 标签——快速通道的强候选。**
- **[#121617](https://github.com/openclaw/openclaw/issues/121617)** — 压缩后 "Already compacted" 守卫错误分类了终结性失败（开放，🦞）。尚无修复 PR。
- **[#139274](https://github.com/openclaw/openclaw/issues/139274)** — 原生 `/codex` 绑定丢弃语音消息附件并跳过 STT（开放，🦞）。尚无修复 PR。
- **[#128971](https://github.com/openclaw/openclaw/issues/128971)** — 当终态回执返回 `delivery_ambiguous` 时，Telegram 的最终回复被静默丢弃（开放，🦐 gold shrimp）。尚无修复 PR。
- **[#112110](https://github.com/openclaw/openclaw/issues/112110)** — **安全**：子 agent MCP 工具执行的鉴权检查不当；子工具作用域是按父会话评估的（开放，P1 🦪，`impact:security`）。陈旧标签已被标记；**已请求安全审查但尚无修复 PR**。

### P2 — UX / 状态卫生
- **[#143752](https://github.com/openclaw/openclaw/issues/143752)** — 中断的包激活可能把规范 CLI 搁浅，且没有仅包重放（开放，🦞）。尚无修复 PR。
- **[#136360](https://github.com/openclaw/openclaw/issues/136360)** — 内部 `<<<BEGIN_OPENCLAW_INTERNAL_CONTEXT>>>` 载体在 Microsoft Teams 上以可见的用户角色回合泄漏（开放，🐚）。与 Slack/Telegram/Feishu/Discord 上的先例同类，msteams 尚无修复 PR。
- **[#143640](https://github.com/openclaw/openclaw/issues/143640)** — memory-core 在单个 `IMMEDIATE` 事务中发布完整索引，耗尽 5 秒 busy 超时（开放，🦞）。尚无修复 PR。

**模式：** 大多数 P0/P1 崩溃都与 SQLite 相关（锁、busy 超时、写句柄争用），并集中在 `memory-core`；最高严重度项目尚无修复 PR，是下一个 2026.9.x 补丁版本的最大风险。

## 6. 功能请求与路线图信号

- **[#12855](https://github.com/openclaw/openclaw/issues/12855)** — 内置自动更新，带可配置计划、确认与更新后通知（P2，enhancement，需要安全审查，8 条评论，👍 0）。当前原语（`update.checkOnStart`、`update.channel`、`gateway.update.run`）已存在，但缺少内置工作流。鉴于下文提到的 launchd/Windows 计划任务投诉，可能是 **2026.10/2026.11** 时段的路线图候选。
- **[#109657](https://github.com/openclaw/openclaw/issues/109657)** — 在 WhatsApp、Discord、Slack、Signal、iMessage 上采用核心的持久入站排空（关闭，P1，维护者）。继 [#108924](https://github.com/openclaw/openclaw/pull/108924) 已在 core 落地之后，该 issue 主动推动了相关通道的落地。状态显示有进展——预计在接下来的两个小版本中，这些通道将获得持久入站能力。
- **[#109370](https://github.com/openclaw/openclaw/issues/109370)** — 在 `message_sent` hook 上暴露投递关联数据（`MessageReceipt`、队列逻辑 id、重试次数、起始 `runId`）（P2，enhancement，安全审查，5 条评论，👍 1）。用于在插件侧实现幂等投递协调。可能是持久入站工作的后续。
- **[#141747](https://github.com/openclaw/openclaw/issues/141747)** — 运行时脚手架（`<system-reminder>`）每回合注入约 686 个 token，且无法关闭（P2，🦪）。用户可见的 token 成本投诉；预计将在 2026.10 或 2026.11 增加一个配置开关（`agents.runtime.scaffolding` 或类似）。
- **[#8285](https://github.com/openclaw/openclaw/issues/8285)** — 在 agent 处理之前自动发送意图/确认消息（P3，5 条评论）。长期存在但关注度低——可能不在路线图上。
- **[#144491](https://github.com/openclaw/openclaw/pull/144491)** — `feat(auth): sign in to OpenRouter from private chat`（obviyus 提交的 XL PR）。若被接受，将成为首个聊天端原生的 OAuth 完成路径，去掉 Control UI 的中转。若验证通过，预计在 2026.10 落地。
- **[#144480](https://github.com/openclaw/openclaw/pull/144480)** — 浏览器侧边栏资产下载操作（Patrick-Erichsen 提交的 L PR）。macOS/web 侧边栏的 UX 优化。
- **[#144439](https://github.com/openclaw/openclaw/pull/144439)** — 可配置的提示片段覆写（L PR）。运维者将能够对单个 system-prompt 片段进行 append/prepend/replace/disable，无需 fork。

**预测近期新增项：**
1. 其余通道上的持久入站排空（由 #109657 驱动）。
2. memory-core 保留策略 + 记忆存储可观测性（由 #114612、#143640、#136311 驱动）。
3. 子进程生命周期 + CPU/IO 预算（由 #91009、#97616 驱动）。
4. SQLite 写句柄整合 / `busy_timeout` 调优（由 #117262、DEF-61 驱动）。
5. 可配置的运行时脚手架开关（由 #141747 驱动）。

## 7. 用户反馈汇总

**主要痛点（采样自高评论帖）：**

- **记忆子系统可靠性。** 多位用户报告生产实例出现多 GB 的记忆 DB（#114612）、不可恢复的索引（#136311，19 GB 临时 DB 累积）以及自造的 SQLite 锁风暴（#117262、#143640）。这是 P0/P1 报告的最大单一来源，反映出对 `memory-core` 的信任已超出其当前的稳定性边界。
- **Windows 与 macOS 上的慢启动/重启脆弱性。** #140162（Windows 在 181 秒后将陈旧进程杀掉）、#143757（Windows 计划任务默认配置无法无人值守运行）、#90711（macOS launchd plist 把 `StandardErrorPath` 硬编码为 `/dev/null`，隐藏诊断信息）。运维者要么在盲目操作，要么被自己的重启逻辑杀掉。
- **Provider 集成意外。** #101763（Hosted Molty 上模型 id 的点与短横线）、#116691（火山引擎 openai-responses 长上下文 `input.status` 回退）、#123009（原生 Codex 订阅重检即使使用率低也每 5 分钟阻塞一次）、#101445（嵌入式 Ollama 对合法的 tool_calls 上报 `incomplete_result`）。单看每条都很小，但放在一起说明 provider 适配器矩阵需要一套结构化的回归测试。

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / 智能体开源生态
**快照日期：2026-09-11** · 涉及项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态概览

开源个人 AI 助手领域已分化为几个截然不同的战略阵营：OpenClaw 以接近商业化的规模运营，遵循 LTS / 滚动双轨发布纪律；QwenPaw 正在收敛到稳定的 2.2.1 版本，同时从个人场景向团队 / 企业场景转型；ZeroClaw 处于安全优先的架构重写阶段，重写被一层 8 层深的 PR 栈所阻塞；Hermes Agent 分类处理正常但发布停滞；IronClaw 则进入安静的维护模式。五者的共同点是：技术前沿已从「智能体能否对话」转向**持久化交付、记忆可靠性、成本核算、多租户与安全边界**——这些基础设施属性是助手被信任承担长时间、真实工作负载的前提。

---

## 2. 活跃度对比

| 项目 | Issues（24h） | PRs（24h） | Close / Merge 率 | 发布状态 | 健康度评分 |
|---|---|---|---|---|---|
| **OpenClaw** | 421（已关闭 185） | 500（已合并 259） | ~44% / ~52% | ✅ v2026.6.35 LTS 已发布；滚动版 2026.9.3 | **7.5/10** — 吞吐量巨大，但 P0/P1 缺少修复 PR；memory-core 存在技术债 |
| **QwenPaw** | 28（已关闭 10） | 35（已合并 6+） | ~36% / 良好 | ✅ v2.2.1-beta.2 已发布 | **7/10** — 发布节奏良好；3 个 High 级别 Bug 仍开放且无修复 PR |
| **IronClaw** | 1（每日分类报告） | 8（5 个 Dependabot 自动化） | n/a / 1 次真实合并 | ❌ 无发布 | **6.5/10** — 稳定、低风险、低动能 |
| **Hermes Agent** | 50（~90% 仍开放） | 50（已关闭 2） | 低 / ~4% | ❌ 无发布（已逾期） | **6/10** — 分类处理活跃但发布节奏停滞；Windows 回归逃逸 CI |
| **ZeroClaw** | 50（已关闭 0） | 50（已合并 0） | 0% / 0% | ❌ 无发布（最近：v0.8.3） | **5/10** — 高参与度、零吞吐；S0 安全 Bug 无人处理 |

**关键指标：** OpenClaw 24 小时内处理 921 个条目，而中游项目仅 ~50–100，约为**同行活动量的 5–9 倍**。

---

## 3. OpenClaw 的定位

**相对于同行的优势：**
- **规模与吞吐** — 24 小时内合并 259 个 PR，超过其余所有项目的总和；Issue / PR ID 空间约 14.4 万，表明其历史贡献者规模最大。
- **发布纪律** — 唯一同时运行正式 LTS + 滚动双轨的项目（终端 June LTS v2026.6.35、滚动版 2026.9.3），配套迁移工具（`openclaw doctor`）并对功能启用安全评审闸门。
- **结构化分类处理** — `clawsweeper` 队列标签将 Bug 报告转化为范围明确的修复候选；维护者整理的 Beta 反馈帖（#125626）体现出有意识的发布 QA。
- **集成矩阵最广** — 渠道覆盖 WhatsApp / Discord / Slack / Signal / iMessage / Teams / Telegram / 飞书，无同行能匹配此广度。

**技术路线差异：** 基于 Node / TypeScript 的插件 + 网关架构，配合 SQLite 后端的 `memory-core`；相比之下，Hermes 走 Python / Electron 群控桌面路线，QwenPaw 是 Python IM 优先栈，ZeroClaw / IronClaw 则采用 Rust 多 crate 设计。OpenClaw 在广度上做了优化（提供商、渠道、插件），ZeroClaw 在形式化安全姿态上做了优化（RFC 驱动、证明、平面隔离），Hermes 则聚焦运营成本治理。

**相对同行的劣势：** memory-core 是整个生态中最大的不稳定性聚集点（SQLite 锁竞争、19 GB 孤立临时数据库、多 GB 级别无界增长）——这是同行尚未遇到的规模性问题。Windows 重启脆弱性（#140162）落后于 QwenPaw 对桌面的关注；缺乏移动端规划，相比之下 QwenPaw 有清晰的移动端推进；安全边界 Bug（#112110 子智能体 MCP 鉴权、#144269 工具限制被绕过）与 ZeroClaw 的 S0 相似但流程不够正式。

**社区规模：** OpenClaw > Hermes ≈ ZeroClaw ≈ QwenPaw（中游）> IronClaw（小型）。Hermes 一条 85 条评论的协调帖与 QwenPaw 一条 24 条评论的路线图帖显示出参与度高但基数较小的社区；IronClaw 全天零评论、零反应。

---

## 4. 共同的技术关注领域

| 新兴需求 | 涉及项目 | 具体诉求 |
|---|---|---|
| **记忆子系统可靠性与成本** | OpenClaw、QwenPaw、Hermes、ZeroClaw | SQLite 争用与保留策略（OpenClaw #117262、#114612；Hermes #107688）；廉价的背景记忆模型（QwenPaw #7664）；记忆启动回退（QwenPaw #7663）；谱系成本核算（Hermes #107775） |
| **Windows / 跨平台一致性** | OpenClaw、Hermes、ZeroClaw、QwenPaw | ZeroClaw：74 个 Windows 测试失败（#7462）；Hermes：8+ 个 Windows Bug，含 AppHangB1 与孤立 Chrome；OpenClaw：网关陈旧进程清理（#140162）；QwenPaw：Windows 沙箱绕过（#7672） |
| **子智能体 / 委派鉴权** | OpenClaw、ZeroClaw、（QwenPaw） | 委派白名单绕过（ZeroClaw #8279）、shell 符号链接逃逸（#9247）；子智能体 MCP 工具作用域按父级评估（OpenClaw #112110）；子委派时工具限制被绕过（OpenClaw #144269）；subagent_model 被忽略（QwenPaw #7676） |
| **持久化渠道交付语义** | OpenClaw、QwenPaw、ZeroClaw、Hermes | 持久化入站排空（OpenClaw #109657）；飞书队列死锁（QwenPaw #7534）；A2A 空文本解析（Hermes #87822）；ACP 轮次丢失（ZeroClaw #9333）；Telegram 媒体批处理（ZeroClaw #5514） |
| **Token 成本可观测性** | Hermes、OpenClaw、QwenPaw、ZeroClaw | Hermes：4 条收敛中的讨论线（每会话保留、每任务看板、压缩谱系、models.dev 回退）；OpenClaw：每轮 686 token 脚手架且无法关闭（#141747）；ZeroClaw：上下文计量对图片欠计（#9332） |
| **进程生命周期治理** | OpenClaw、Hermes | 僵尸 hook / codex 子进程 + CPU 密集中继（OpenClaw #97616、#91009）；200+ 孤立 Chrome 进程、清理器遗漏两条路径（Hermes #32047、#100855） |
| **多租户 / 群控** | QwenPaw、Hermes、IronClaw、ZeroClaw | Hub 团队版路线图（QwenPaw #7318 — 最热门讨论线）；群控配置治理（Hermes）；按调用方托管 MCP 目录键控（IronClaw #8090 — 跨用户泄漏）；主体记忆 + 平面隔离（ZeroClaw #10268） |

---

## 5. 差异化分析

| 维度 | OpenClaw | Hermes | IronClaw | QwenPaw | ZeroClaw |
|---|---|---|---|---|---|
| **功能焦点** | 最广的提供商 / 渠道矩阵、插件生态、迁移工具 | 群控运维、看板、成本核算、A2A | Telegram 打磨、托管 MCP、基准 QA | IM 优先（飞书 / 企业微信 / QQ + 国际）、移动端 UX、团队 Hub | 安全模型、本地模型（Qwen3.6 JIT、Hailo）、证明 |
| **目标用户** | 高阶用户 / 自托管用户 + LTS 企业用户 | 群控 / 桌面运维人员（Windows 为主） | 小型托管部署 | IM 常驻助手用户 → 团队 | 安全敏感、本地 / 边缘、治理导向 |
| **架构** | Node 网关 + SQLite memory-core、插件适配器 | Python + Electron + WS 网关 | Rust 内核 + WebUI 扩展 | Python Console / TUI + IM 渠道 + ClawHub | Rust 多 crate workspace、RFC 驱动 |
| **成熟度信号** | 存在 LTS 计划 | 发布节奏已中断 | 安静稳定 | Beta → 稳定 过渡中 | 1.0 之前，中期重写中 |

**值得关注的对比：** ZeroClaw 将安全视为架构（RFC #7141 重写涉及每个 crate），而 OpenClaw 将安全视为对广阔面上的评审闸门——相应地拥有更大的攻击面（渠道泄漏如 Teams #136360、子智能体鉴权缺口）。QwenPaw 是唯一具备清晰移动原生路径的项目；Hermes 是唯一将成本治理作为发布主题的项目。

---

## 6. 社区动能与成熟度

- **第一梯队 — 超活跃（OpenClaw）：** 持续每日 400+ Issue / 500 PR 流量，维护者主动梳理；技术债是规模驱动而非疏忽驱动。
- **第二梯队 — 活跃（Hermes、ZeroClaw、QwenPaw）：** Hermes 与 ZeroClaw 表现出*有动作无发布*——0 次发布、接近 0 次合并，原因各异（组织阻塞 #88584 vs 刻意的重构闸门）。QwenPaw 是中游中最健康的：Beta 持续发布、Issue 关闭率 36%、路线图讨论建设性。
- **第三梯队 — 维护（IronClaw）：** Dependabot 主导，唯一一次实质性合并（Telegram 命令菜单），每日基准分类报告是主要脉搏。

**快速迭代中：** OpenClaw、QwenPaw。**趋于稳定：** IronClaw（已稳定）、Hermes（需把合并的工作转化为发布）。**重构阻塞：** ZeroClaw——在 8 层深的安全栈合并前任何东西都不会落地；风险集中度很高。

---

## 7. 趋势信号

1. **Windows 一致性是生态最大的未满足需求** — 5 个项目中有 4 个出现明确的失败（CI 缺口、进程泄漏、重启脆弱性）。瞄准广泛采用面的开发者应将 Windows CI 与进程生命周期视为一等公民，而非事后移植。
2. **成本可观测性正成为基线要求** — 4 个项目都体现出用户对每会话 / 每任务 Token 核算、廉价背景模型用于记忆写入、脚手架 Token 透明度的需求。预计「成本治理」将成为命名发布主题（Hermes 可能的 v0.22 是领先指标）。
3. **个人 → 团队 的转型已成行业趋势** — Hub 团队版、群控配置、托管 MCP 租户隔离、主体平面隔离都在本周期出现。多用户正确性（每凭证键控、跨会话隔离）是下一个竞争战场。
4. **记忆子系统是头号技术债热点** — SQLite 争用、保留策略与回退行为在 4 个项目中反复出现；受限增长与可观测性是新兴需求。
5. **委派安全是系统性缺口** — 3 个项目存在开放的子智能体 / 沙箱鉴权绕过。任何暴露子智能体或工具白名单的框架都应立即审计父 → 子作用域的传递。
6. **持久化交付语义优先于新功能** — 队列死锁、含糊的回执、丢失的最终回复在投诉帖中占主导；用户将这些问题描述为信任问题而非 Bug。
7. **基础设施多元化** — 欧洲托管提供商（mittwald）、边缘加速器（Hailo）、本地 JIT 模型，与托管 API 默认形态并行，体现出对主权与端侧方案的需求。

**给技术决策者的结论：** OpenClaw 当下提供了最成熟、最受支持的底座，但也带有可见的记忆子系统风险；QwenPaw 是面向 IM 与移动端部署的最强上升期备选；ZeroClaw 在安全重写后值得密切关注；Hermes 与 IronClaw 当前服务于更窄、更具体的运维画像。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目摘要 — 2026-09-11

## 1. 今日概览

Hermes Agent 在 2026-09-11 表现出 **分类处理活动显著但无新版本发布**：过去 24 小时内有 50 个 issue 和 50 个 PR 被触及，两侧开放率均为 90%。主导主题是 **Windows 桌面端回归噪声** — 至少四个今日提交的 P1/P2 issue 描述了同一个打包构建中的插件加载器崩溃（SDK GLOBALS 中的 `Object.keys(undefined)`），尽管修复已在相邻 PR（#107776、#107773）中暂存，这仍在消耗维护者精力。定时任务子系统、网关消息投递和按会话成本核算方面的可靠性工作持续推进；同时看板使用聚合、集群档案治理、mittwald 提供商等功能请求源源不断，显示出活跃的生态，但也意味着产品表面积在持续扩大。

## 2. 版本发布

**过去 24 小时无新版本发布。** 无版本标签，无更新日志变更。鉴于 `main` 上已合并的修复量（成本核算、看板通知、侧边栏 z-index、FastMCP 回调），下一个补丁版本可能已经逾期。

## 3. 项目进展

有两个 PR 被记录为已合并/已关闭，但数据集未明确呈现其合并提交。今日推进的实质性开放工作如下：

| PR | 标题 | 影响 |
|---|---|---|
| [#84236](https://github.com/NousResearch/hermes-agent/pull/84236) | fix(agent): visible closing message and structured stop_kind for interrupted turns | 改善轮次被中断时的网关 UX |
| [#107776](https://github.com/NousResearch/hermes-agent/pull/107776) | fix(desktop): ensure sidebar toggle stays above panel tabs (z-index) | 关闭 #107774 |
| [#107775](https://github.com/NousResearch/hermes-agent/pull/107775) | fix(state): sum lineage costs in `_project_compression_tips` and include continuations in usage_totals | 压缩会话的成本可审计性修复 |
| [#107777](https://github.com/NousResearch/hermes-agent/pull/107777) | fix(tools): hosted OCR resolves `FIRECRAWL_API_KEY` through the profile secret scope | 最后一批游离的工具凭证迁移至 `secret_scope` |
| [#107779](https://github.com/NousResearch/hermes-agent/pull/107779) | feat(kanban): carry worker follow-ups into terminal notifications | 补齐集群看板运维中的一个文档化缺口 |
| [#107773](https://github.com/NousResearch/hermes-agent/pull/107773) | fix(desktop): commit Quick Entry route before submitting | 修复新建会话流程中的渲染层/React 竞态 |
| [#67037](https://github.com/NousResearch/hermes-agent/pull/67037) | fix: share compression budget with context engines | 让外部引擎容量与 `ContextCompressor` 对齐 |
| [#56625](https://github.com/NousResearch/hermes-agent/pull/56625) | fix(dashboard): add models.dev pricing fallback for unknown providers | 解决自定义端点的 `n/a` 成本问题 |
| [#56628](https://github.com/NousResearch/hermes-agent/pull/56628) | feat(cli): expand `/sessions` with delete, rename, prune subcommands | TUI 内的会话管理 |
| [#107755](https://github.com/NousResearch/hermes-agent/pull/107755) | feat: add mittwald AI Hosting as a first-class provider | 欧盟托管的 OpenAI 兼容推理 |
| [#107778](https://github.com/NousResearch/hermes-agent/pull/107778) | feat(catalog): add four ChuggiesMart plugins | 社区插件目录扩展 |
| [#107748](https://github.com/NousResearch/hermes-agent/pull/107748) | fix(git): carry user `safe.directory` past non-interactive config isolation | 防止内部管道中的 git 所有权错误 |

## 4. 社区热门话题

讨论度最高的帖子集中在 **基础设施脆弱性** 而非新功能：

1. **[#88584 — Automated Nous integration is blocked](https://github.com/NousResearch/hermes-agent/issues/88584)** — 85 条评论，是迄今最响亮的帖子。一个计划的 Nous→Enterkey 合并在 `cron/jobs.py` 上存在冲突，阻塞了自动化集成。高评论数却零表态反应，表明 Nous 与 Enterkey 轨道之间存在 **组织协作摩擦**；这并非 bug，而是一个维护者近一个月都未能解决的协同瓶颈。🔗 <https://github.com/NousResearch/hermes-agent/issues/88584>

2. **[#84361 — Desktop MEDIA file links dead](https://github.com/NousResearch/hermes-agent/issues/84361)** — 8 条评论。两个独立的缺陷（标签正则吞掉尾部 markdown + `file://` URL 字符串拼接）静默地破坏媒体链接点击。暂无修复 PR。

3. **[#32047 — agent-browser leaves 200+ orphaned Chrome processes](https://github.com/NousResearch/hermes-agent/issues/32047)** — 6 条评论。Windows 上的重大资源泄漏，与较新的 [#100855](https://github.com/NousResearch/hermes-agent/issues/100855) 相关，该 issue 证明孤立进程回收器在结构上遗漏了 `browser_exec` / real-profile 通道。底层需求：**Windows 上的进程生命周期管理**。

4. **[#43073 — .sh cron scripts fail on Windows](https://github.com/NousResearch/hermes-agent/issues/43073)** — 5 条评论。调度器到 bash 桥接中 `str(path)` 导致的反斜杠路径损坏。

5. **[#65094 — Custom Codex-compatible /v1 providers omit Hermes session headers](https://github.com/NousResearch/hermes-agent/issues/65094)** — 5 条评论。`ResponsesApiTransport.build_kwargs()` 对第三方 OpenAI 兼容端点吞掉了 `session_id`。🔗 <https://github.com/NousResearch/hermes-agent/issues/65094>

6. **[#37632 — `hermes -z` SIGABRT on exit](https://github.com/NousResearch/hermes-agent/issues/37632)** — 5 条评论。Honcho 内存守护线程在解释器终结期间阻塞于 httpx I/O —— 经典的守护进程关闭竞态。🔗 <https://github.com/NousResearch/hermes-agent/issues/37632>

## 5. Bug 与稳定性

### P1（严重 — 生产阻塞）

| Issue | 组件 | 症状 | 修复 PR？ |
|---|---|---|---|
| [#103786](https://github.com/NousResearch/hermes-agent/issues/103786) | Desktop / Windows | 网关重试循环阻塞 Electron 主线程 → AppHangB1；远程 WS 冻结，约 900 KB 未读缓冲区 | 无 |
| [#107484 (closed)](https://github.com/NousResearch/hermes-agent/issues/107484)、[#107304 (closed)](https://github.com/NousResearch/hermes-agent/issues/107304)、[#107721](https://github.com/NousResearch/hermes-agent/issues/107721) | Desktop plugins | Windows 打包构建：所有运行时磁盘插件因 SDK GLOBALS 中的 `Object.keys(undefined)` 失败 | [#107721](https://github.com/NousResearch/hermes-agent/issues/107721) 帖子中存在 PR，但尚无规范修复合并 |
| [#107688](https://github.com/NousResearch/hermes-agent/issues/107688) | Dashboard | 启动时无条件以可写方式打开 SessionDB，暴露文档化的并发 FTS 重建损坏风险 | 无 |

### P2（重大）

| Issue | 摘要 | 修复 PR？ |
|---|---|---|
| [#107559](https://github.com/NousResearch/hermes-agent/issues/107559) | 手动运行完成后，残留的内存触发锁永久阻塞 Cron `run` 重触发 | 无 |
| [#107666](https://github.com/NousResearch/hermes-agent/issues/107666) | Desktop cron 以 `profile=all` 列出作业但以当前 profile 保存 —— 非属主作用域返回 404 | 无 |
| [#107685](https://github.com/NousResearch/hermes-agent/issues/107685) | Windows 自更新在携带自身 verify 修复的运行中将健康安装报告为 FAILED（退出码 8） | 无 |
| [#103633](https://github.com/NousResearch/hermes-agent/issues/103633) | MCP OAuth code→token 交换对 `/mcp` 路径服务器永不完成；重试因 "callback port already in use" 崩溃 | 无 |
| [#91547](https://github.com/NousResearch/hermes-agent/issues/91547) | `hermes gateway restart` 与自身端口竞态，然后无限期运行且无 API server | 无 |
| [#87822](https://github.com/NousResearch/hermes-agent/issues/87822) | a2a: 快速单轮 `message/send` 以空文本解析为 `TASK_STATE_COMPLETED`（notify 解析输给 fallback） | 无 |
| [#95753](https://github.com/NousResearch/hermes-agent/issues/95753) | A2A 回复文本在持久化会话中首 1-2 个字符被剥离 | 无 |

**模式：** 今日约 12 个高严重度 bug 中，**仅 2-3 个有开放修复 PR**。插件加载器回归尤为突出，同日有三条重复报告但无已发布修复 —— 这是令人担忧的回归追踪缺口。

## 6. 功能请求与路线图信号

今日活跃的功能工作清晰地映射到两大主题：**集群/企业治理** 与 **可观测性/成本核算**。

| 信号 | Issue/PR | 进入下一版本的可能性 |
|---|---|---|
| **会话终结后保留单会话成本**（#102848）、按任务看板 token 聚合（#107744）、压缩提示成本求和（#107775）、models.dev 定价回退（#56625） | 4 项并行工作 | **高** — 改动小、内部自洽，其中 3 项已进入 PR review |
| **集群档案治理** — 容错的档案切换器 + 集群视图（#107681）；已删除 Desktop bot 档案的持久性（#94842）；跨档案 cron 隔离（#107666） | 3 个 issue，1 个 PR | **中** — desktop UX 工作，可能在下一次桌面版本中以补丁形式发布 |
| **Secrets 模型澄清** — source-apply 与 wrap 契约（#107700）、文档警告（#107698） | 2 个成对的文档/功能 issue | **高** — 纯文档工作，低风险 |
| **提供商扩展** — mittwald EU 托管（#107755）、通过 models.dev 提供 Xiaomi MiMo（#56625） | 2 个 PR | **中** — 社区驱动，将以目录新增形式落地 |
| **看板 worker 跟进通知**（#107779） | 1 个 PR | **高** — 小而精准 |
| **TUI 内会话管理器**（`/sessions delete/rename/prune`）（#56628） | 1 个 PR | **中** — UX 打磨，自 7 月起已在 review 中 |
| **可信的计划任务钩子**（#93977） | 1 个 PR，`needs-decision` | **低–中** — `needs-decision` 标签是瓶颈 |
| **Hillclimb playbook skill**（#47156） | 1 个 issue，无 PR | **低** — 自 6 月起长期停滞 |

最强信号是 **成本可观测性**：四个独立帖子（#102848、#107744、#107775、#56625）都指向同一方向（按会话、按任务、按 lineage），暗示一次协调的 v0.22 成本治理版本。

## 7. 用户反馈摘要

**真实痛点（原文主题）：**

- **Windows 桌面端是故障高发面。** 今日至少 8 个 issue 与 Windows 相关（AppHangB1、孤立 Chrome、插件加载器崩溃、反斜杠路径损坏、自更新误报 FAIL、.sh cron、桌面 cron 档案作用域、网关 WS 冻结）。维护者显然在 Windows CI 覆盖上投入不足。
- **定时任务子系统是多线负债。** 档案作用域（#107666）、内存锁泄漏（#107559）、用量审计绕过（已关闭 [#96391](https://github.com/NousResearch/hermes-agent/issues/96391)）、Docker/看板导入失败（#107661、#107758）以及 Nous→Enterkey 合并阻塞（#88584）全部汇聚于同一模块。
- **插件生态在打包环节脆弱。** 同一回归（命名空间赋值前 SDK GLOBALS 被捕获）在打包的 Windows 构建中破坏了每个磁盘插件，且同日被三个用户独立发现 —— 表明打包构建路径未纳入标准 CI。
- **成本审计不完整且不一致。** 用户报告用量行在会话终结时被清除（#102848）、手动 cron 运行对审计不可见（[#96391](https://github.com/NousResearch/hermes-agent/issues/96391)）、压缩 lineage 计数偏低（#107775）、未知提供商显示 `n/a`（#56091→#56625）。痛点很具体："本地无法审计支出"。
- **网关消息投递边缘情况是反复出现的尾巴。** `message/send` 空文本 bug（#87822）、`/model` payload 多行 bug（#22982）、`/title` 轮次中途（#98177）、`/stop` 静默停止（#84236）、A2A 文本截断（#95753）。每一项单独来看都很小，但合在一起描绘出一个有许多毛边的网关。
- **Quick Entry 竞态**（#107773）属于那种虽然严重程度低、但会损害首启印象的 UX bug —— 新会话偶尔会落入错误状态。

**满意度信号：** 尽管 bug 密度较高，仍有部分用户在推进 **建设性的集群功能**（按任务成本聚合 #107744、档案容错加固 #107681、看板通知 #107779），表明存在一批投入平台建设的运营级用户。

## 8. 待办观察

具有明确价值但 **近期无维护者响应或决策** 的项目：

| 项目 | 年龄 | 为何需要关注 |
|---|---|---|
| [#88584](https://github.com/NousResearch/hermes-agent/issues/88584) | 约 25 天，85 条评论 | **评论数最高，零表态反应。** Nous 与 Enterkey 之间的集成阻塞引发了持续讨论却无任何解决。是 owner 协同问题，而非代码问题。 |
| [#84361](https://github.com/NousResearch/hermes-agent/issues/84361) | 约 30 天，8 条评论 | Desktop 聊天中的媒体链接失效 —— 首印象 bug，无修复 PR。 |
| [#32047](https://github.com/NousResearch/hermes-agent/issues/32047) | 约 109 天，6 条评论 | Windows 上 200+ 孤立 Chrome 进程。资源泄漏，结构上与 #100855 相关，该 issue 证明回收器遗漏了两个通道。需要结构性修复，而非补丁。 |
| [#93977](https://github.com/NousResearch/hermes-agent/pull/93977) | 约 18 天，`needs-decision` | 可信的计划任务钩子 PR —— 框架级工作，等待维护者设计决策。 |
| [#47156](https://github.com/NousResearch/hermes-agent/issues/47156) | 约 87 天，1 条评论 | Hillclimb playbook skill 提案，最初基于一个 Cursor 插件提交。参与度低但具体且自洽。 |
| [#102848](https://github.com/NousResearch/hermes-agent/issues/102848) | 约 7 天 | 单会话成本保留功能 —— 与 #107775 和 #107744 自然协同；值得设立跟踪 issue。 |
| [#107484](https://github.com/NousResearch/hermes-agent/issues/107484) / [#107304](https://github.com/NousResearch/hermes-agent/issues/107304)（作为重复被关闭） | 今日关闭，但 **根因未明显修复** | 插件加载器回归在 24 小时内产生了三条重复报告。重复项被关闭；底层 bug 仍处开放状态。风险：用户看到"已关闭"便以为已解决。 |

---

**项目健康度记分卡（定性）：** 分类处理吞吐量健康（每日触及 50/50 个 issue 与 PR），但 **发布节奏停滞**（0 个版本）且 **Windows 桌面端回归未能合并前捕获**。插件加载器和定时任务子系统需要专项加固冲刺。成本核算工作正在汇聚成一次连贯的下一版本，应优先推进。#88584 协同阻塞是当下最显眼的信任风险，值得维护者层面给出响应。

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目简报 — 2026-09-11

## 1. 今日概览

IronClaw 在 2026-09-11 的活动更多呈现出维护密集的特征,而非头条功能开发。在过去 24 小时内涉及的 8 个 PR 中,有 5 个是自动化的 Dependabot 依赖更新(Rust crates、vitest、js-yaml、baseline-browser-mapping),仅有 3 个是实质性的人工提交。新建了一个 issue —— 一份每日故障分类报告,而非 bug 报告。未发布新版本。整体项目健康度保持稳定,重点在于依赖卫生,以及 Telegram 扩展、WebUI 聊天编辑器和 MCP 目录集成上的渐进式 UX/正确性修复。

## 2. 版本发布

过去 24 小时内未发布新版本。

## 3. 项目进展

本周期内关闭/合并了 2 个 PR:

- **[#8080](https://github.com/nearai/ironclaw/pull/8080)** — *已关闭*:Dependabot 批量更新,在主目录下捆绑了 21 个 Rust crate 更新。被 [#8097](https://github.com/nearai/ironclaw/pull/8097) 取代,后者包含 24 个更新,涵盖了相同的 `uuid`/`base64`/`rust_decimal` 升级以及额外的包。未合并直接关闭很可能表明 Dependabot 的自动取代行为。
- **[#8072](https://github.com/nearai/ironclaw/pull/8072)** — *已关闭*:`feat(telegram): register the Bot API command menu at activation`,作者 @thisisjoshford。这是窗口期内最具实质性的合并:Telegram 的聊天菜单按钮(编辑器附近的"汉堡"菜单)现在会在扩展激活时通过 `setMyCommands` 注册该频道声明的命令 —— `/model`、`/status`、`/new`、`/stop`、`/interrupt` —— 并在停用时通过 `deleteMyCommands` 尽力清除。归类为 `size: L`,`risk: low`,范围:文档 + 依赖,贡献者:经验型。这对 Telegram 用户而言是一项切实的 UX 改进。

净进展:1 个已合并特性(Telegram 命令菜单),1 个被关闭并取代的 Dependabot PR。

## 4. 社区热门话题

所有条目的互动(评论 + 反应)普遍偏低 —— 每条记录均显示 0 条评论和 0 个反应。按内容而非评论数衡量,最具实质性讨论的话题是:

- **PR [#8090](https://github.com/nearai/ironclaw/pull/8090)** — `fix(mcp): key discovered hosted-MCP catalogs per caller, not per extension`,作者 @kirikov(创建于 2026-09-08,更新于 2026-09-10)。底层需求:**托管 MCP 服务器上的多租户正确性**。当工具列表依赖于用户凭证时,所有用户当前在注册表中共享一个以扩展 ID 为键的槽位,因此最后写入者会覆盖先前的发现结果。这是共享基础设施上的跨用户数据泄露/可用性 bug,而其底层需求 —— MCP 目录注册表中的按凭证隔离 —— 很可能影响任何生产托管部署。
- **Issue [#8093](https://github.com/nearai/ironclaw/issues/8093)** — *Daily ironclaw failure taxonomy — 2026-09-10*,作者 @pranavraja99。这是一份周期性的运维报告(非社区讨论),对 officeqa 基准套件中未通过的任务进行分类(42 个失败,主要归因于 DeepSeek-V4-Flash 上的真实模型错误)。底层需求:**对基准回归的系统化可观测性**,有助于维护者对上游模型行为进行分类。

## 5. Bug 与稳定性

有两个值得关注的待合并 bug 修复 PR:

| 严重程度 | 条目 | 问题 | 修复 PR |
|---|---|---|---|
| 中 | WebUI 聊天编辑器中输入法组合输入失效(CJK 输入法,Safari 的 `keyCode 229`/`isComposing=false` 怪癖) | 非拉丁语系用户的 UX 回归 | [#8092](https://github.com/nearai/ironclaw/pull/8092),@huiq777(待合并) |
| 高 | 托管 MCP 目录跨用户冲突 —— 工具列表按凭证泄露/覆盖 | 托管服务器上跨用户的状态损坏 | [#8090](https://github.com/nearai/ironclaw/pull/8090),@kirikov(待合并) |

两者在可见的数据窗口内均无对应的用户报告 issue —— 都作为 PR 直接浮现,并附带详细的根因分析。两个修复仍处于待合并状态,等待维护者审核/合并。

Telegram "命令菜单" PR([#8072](https://github.com/nearai/ironclaw/pull/8072))已关闭/合并,表明该工作成功落地。窗口期内未提交新的崩溃报告或回归。

## 6. 功能请求与路线图信号

过去 24 小时内未提交明确的功能请求 issue。然而,已合并的工作暗示了近期优先方向:

- **Telegram 原生 UX 打磨** —— Bot API 命令菜单注册([#8072](https://github.com/nearai/ironclaw/pull/8072))表明 Telegram 正被当作一等公民界面来对待;未来版本很可能会继续使 Telegram 行为与原生 Bot API 规范对齐。
- **托管 MCP 多租户加固** —— [#8090](https://github.com/nearai/ironclaw/pull/8090) 表明托管/服务端部署是一种真实的使用模式,按调用方键控是迈向正确租户隔离的第一步。该领域后续很可能会跟进更多审计/鉴权工作。
- **WebUI 国际化** —— [#8092](https://github.com/nearai/ironclaw/pull/8092)(输入法组合)暗示 WebUI 拥有 CJK 用户;可预期后续会有更多输入法与 RTL 修复。

未发布公开的路线图更新或与版本标签绑定的功能列表。

## 7. 用户反馈摘要

本 24 小时窗口内的直接用户反馈(评论、反应、非维护者的 issue 正文)较为稀疏:

- **通过 PR 而非 issue 浮现的痛点**:托管 MCP 目录冲突([#8090](https://github.com/nearai/ironclaw/pull/8090)) —— 一种多用户场景,表现为"用户之间互相覆盖工具" —— 表明对共享基础设施上当前单槽位发现模型的不满。
- **通过 PR 浮现的痛点**:聊天编辑器中的输入法组合 bug([#8092](https://github.com/nearai/ironclaw/pull/8092)) —— Safari 的 `isComposing=false` + `keyCode 229` 怪癖破坏了 CJK 输入用户的自然键入体验;该 PR 明确为纯文本和输入法场景补充了回归用例,说明此前存在用户投诉。
- **运维信号**:每日故障分类 issue([#8093](https://github.com/nearai/ironclaw/issues/8093))表明基准未通过项正被每日分类处理,其中模型错误(DeepSeek-V4-Flash 导航)主导了 officeqa 运行。这属于维护者驱动的可观测性工作,而非终端用户反馈。

从现有数据中无法推导满意度/不满度指标。

## 8. 待办观察

在 24 小时窗口内,无长期未答复的条目被更新 —— 所有活动均为新近发生。以下仍处于待合并状态、值得维护者关注的条目:

- **[#8097](https://github.com/nearai/ironclaw/pull/8097)** — 包含 24 个包更新的 Dependabot 批量 PR;需在合并前完成审核/冲突解决,以避免进一步的取代循环。
- **[#8090](https://github.com/nearai/ironclaw/pull/8090)** — 多租户 MCP 目录修复;对托管部署影响重大,应优先处理以保障安全性/正确性。
- **[#8092](https://github.com/nearai/ironclaw/pull/8092)** — 输入法组合修复;影响国际用户,是低风险的合并候选。
- **[#8096](https://github.com/nearai/ironclaw/pull/8096)**、**[#8094](https://github.com/nearai/ironclaw/pull/8094)**、**[#8095](https://github.com/nearai/ironclaw/pull/8095)** — `ironclaw_webui/frontend` 和 `docs/internal/architecture-video` 中的常规 JS/开发依赖更新;虽然安全,但目前与实质性工作一起积压于开放 PR 队列中。

本窗口内未涉及任何更早的 issue 或 PR,因此无法据此判断待办积压的老化情况。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目摘要 — 2026-09-11

## 1. 今日概览

QwenPaw 当前处于活跃的 beta 周期阶段，项目在过去 24 小时内发布了 2.2.1 系列的第二个 beta 构建（[v2.2.1-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2)）。社区活跃度健康：昨日触及 28 个 issue 和 35 个 PR，issue 的关闭/打开比例良好（关闭 10 个、打开 18 个），表明分类流转速度可观。发布信号主要由移动端和 Console 的优化主导（移动端 agent 选择器、CSS 选择器对齐），而后端工作则覆盖 MCP 可靠性、记忆后端降级以及 FTS 历史损坏等议题。一小群但值得关注的跨会话与渠道正确性缺陷（飞书、企业微信、Telegram、邮件监听器）已被关闭，说明团队正在系统性地清理渠道稳定性技术债，为 2.2.1 稳定版做准备。

## 2. 发布版本

### [v2.2.1-beta.2](https://github.com/agentscope-ai/QwenPaw/releases/tag/v2.2.1-beta.2)

2.2.1 系列的 beta 切片，包含以下值得关注的变更：

- **Console 移动端 agent 选择器优化**（[PR #7623](https://github.com/agentscope-ai/QwenPaw/pull/7623)）— 改善在移动设备上选择 agent 时的体验。
- **Console CSS 选择器对齐** — 针对 Web UI 的稳定性/可维护性修复。
- **版本号升至 2.2.1b2**（[PR #7643](https://github.com/agentscope-ai/QwenPaw/pull/7643)）。

> 注：此版本为 beta 而非稳定版。预发布安装验证任务已在 [Issue #7674](https://github.com/agentscope-ai/QwenPaw/issues/7674) 中跟踪，发布后设有 4 小时的通过/失败窗口。本次发布未附带任何破坏性变更说明。

## 3. 项目进展

过去 24 小时内已合并的 PR 与落地工作：

| PR | 标题 | 影响 |
|---|---|---|
| [#7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) | fix(channels): support Base64 data URLs in outbound media | 解决企业微信 "OSError [Errno 36] File name too long" 类缺陷；agent 现在可以安全地将图片以 `data:<mime>;base64,...` 形式发出。 |
| [#7663](https://github.com/agentscope-ai/QwenPaw/pull/7663) | fix(memory): fall back when plugin backend is unavailable | 当配置的记忆插件不可用时，记忆层不再硬性失败工作区启动；将以内置的 ReMeLight 作为优雅降级方案。 |
| [#7667](https://github.com/agentscope-ai/QwenPaw/pull/7667) | fix(files): show upload only in workspace | 前端作用域清理 — 上传操作不再泄漏到只读标签页（Profile、Daily、Digest）。 |
| [#6978](https://github.com/agentscope-ai/QwenPaw/pull/6978) | feat(commands): add session management slash commands (`/sessions`, `/session`) | 在 IM 渠道（Matrix、QQ、Telegram）中引入会话列表/切换能力，此前仅 Console/TUI 可管理会话。 |

合并的修复整体覆盖三个可靠性主题：**渠道媒体处理**（Base64）、**记忆启动韧性**、以及**会话管理在各表面间的对等性**。

## 4. 社区热议话题

昨日最受讨论/反应最多的条目：

1. **[Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) — *QwenPaw Hub 多租户路线图*（24 条评论，4 👍，OPEN）**
   最热讨论。社区正在塑造 Hub（团队/企业）版本的下一步交付内容。主题包括：多用户访问、管理员管理的 skills，以及团队工作区基本原语。**底层需求：** 当前的个人助理根基阻碍了团队采用，维护者正在明确征集意见 — 这是一个健康的开放治理信号。

2. **[Issue #7579](https://github.com/agentscope-ai/QwenPaw/issues/7579) — *模型回复静默脱离上下文*（10 条评论，CLOSED）**
   严重的正确性缺陷，助手自己的消息被持久化了但却从后续轮次中缺失，产生空回复。**底层需求：** 多轮历史的确定性往返持久化。

3. **[Issue #7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) — *改进平台部署落地页*（9 条评论，OPEN）**
   针对 `platform.agentscope.io/deploy` 移动端人体工学（入口位置、"Stop" 按钮的误触风险）的 UX 反馈。**底层需求：** 部署流程的第一印象与触控人体工学 — 是非桌面端使用占比增长的强烈信号。

4. **[Issue #7011](https://github.com/agentscope-ai/QwenPaw/issues/7011) — *Console 的 stop 操作取消了活动的飞书会话*（8 条评论，CLOSED）**
   Console UI 中的跨会话身份泄漏问题。**底层需求：** 加强并发 Console 标签/会话之间的隔离，尤其是在 IM 渠道绑定到同一后端时。

5. **[Issue #7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) — *飞书队列消费者卡死，会话静默死亡*（4 条评论，OPEN）**
   一条高优先级消息路径在无异常情况下阻塞队列消费者，冻结了整个 DM。**底层需求：** 对飞书消息处理建立有界队列并配备超时/看门狗机制。

## 5. 缺陷与稳定性

| 严重程度 | Issue | 组件 | 状态 | 修复 PR? |
|---|---|---|---|---|
| **高** | [#7672](https://github.com/agentscope-ai/QwenPaw/issues/7672) Windows 安全沙箱绕过 | Desktop / 安全 | OPEN | 无 |
| **高** | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) `subagent_model` 被忽略 — 子代理总是继承父级 `active_model` | Core / agents | OPEN | 无 |
| **高** | [#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534) 飞书队列消费者死锁会话 | 渠道 | OPEN | 无 |
| **中** | [#7661](https://github.com/agentscope-ai/QwenPaw/issues/7661) 第二次提示后新会话自动重复 | Console | OPEN | 无 |
| **中** | [#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660) 安装失败 | 安装 | OPEN | 无 |
| **中** | [#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507) 企业微信逐字符流式输出（150 ms 节流） | 渠道 | OPEN | 无 |
| **中** | [#7668](https://github.com/agentscope-ai/QwenPaw/issues/7668) `last_uid=0` 导致邮件监听器首轮守卫失效 | 渠道（邮件） | OPEN | 无 |
| **中** | [#7445](https://github.com/agentscope-ai/QwenPaw/issues/7445) QwenPaw Hub 无法连接本地模型服务（2.2.0-beta.5） | Hub | OPEN | 无 |
| **低** | [#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113) 初始团队协作指令被忽略 | Core | OPEN（长期） | 无 |

**近期已关闭（已解决）：** [#7579](https://github.com/agentscope-ai/QwenPaw/issues/7579)（上下文丢失）、[#7011](https://github.com/agentscope-ai/QwenPaw/issues/7011)（跨会话取消）、[#7642](https://github.com/agentscope-ai/QwenPaw/issues/7642)（Chrome 流式）、[#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666)（HF 下载）、[#7662](https://github.com/agentscope-ai/QwenPaw/issues/7662)（Telegram 代理看门狗）、[#3254](https://github.com/agentscope-ai/QwenPaw/issues/3254)（聊天 UUID 竞态）、[#7231](https://github.com/agentscope-ai/QwenPaw/issues/7231)（跨会话混淆）、[#7516](https://github.com/agentscope-ai/QwenPaw/issues/7516) 与 [#7370](https://github.com/agentscope-ai/QwenPaw/issues/7370)（企业微信 Base64）、[#7634](https://github.com/agentscope-ai/QwenPaw/issues/7634)（ClawHub 重名安装）。所有这些均对应已合并的 PR（[#7647](https://github.com/agentscope-ai/QwenPaw/pull/7647) 覆盖了企业微信媒体集群）。

**模式：** 开放缺陷偏向*跨会话/跨渠道身份*与*渠道韧性*，而修复落地最快的是*媒体载荷处理*与*前端竞态条件*。当前所有开放的高严重度 issue 都没有关联的修复 PR。

## 6. 功能请求与路线图信号

今日开放的增强项：

- **[#7671](https://github.com/agentscope-ai/QwenPaw/issues/7671) 自动缩放过大的附件图片而非丢弃** — 需求高、风险低的改动。是 2.2.x 补丁或 2.2.2 的可能候选。
- **[#7670](https://github.com/agentscope-ai/QwenPaw/issues/7670) Files 面板预览中的语法高亮** — 纯 UI/生活质量改进；在小版本发布中可行。
- **[#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) RemeLight：专属 `memory_model` 配置** — 针对"昂贵的 LLM 处理后台记忆"问题的经济型方案。与活跃的 ReMe 工作一致（参见 [PR #7444](https://github.com/agentscope-ai/QwenPaw/pull/7444) 与 [PR #6399](https://github.com/agentscope-ai/QwenPaw/pull/6399)）。
- **[#7657](https://github.com/agentscope-ai/QwenPaw/issues/7657) ntfy 渠道支持（已有可用的工作实现）** — 自托管推送契合项目的用户群；提供了一份开箱即用的 PR。
- **[#7656](https://github.com/agentscope-ai/QwenPaw/issues/7656) 持久化的跨会话记忆（第三方集成）** — 对将 MemCode 作为可选记忆层有兴趣。
- **[#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) MCP 客户端：`tls_verify` 与 `ca_file`** — 长期悬而未决的企业网络需求。
- **[#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) `platform.agentscope.io/deploy` 首页改版** — 随移动端用户群增长的 UX 请求。

**对下一个小版本（很可能是 2.2.1 稳定版或 2.2.2）的预测：** 图片自动缩放、MCP TLS 支持、RemeLight `memory_model`，以及至少一个新渠道（鉴于已有现成实现，ntfy 是强有力的候选）。来自 [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) 的 Hub 路线图信号很可能塑造 2.3.x 版本。

## 7. 用户反馈摘要

**今日浮现的痛点：**

- **移动端 UX 被到处呼吁** — Console 移动端 agent 选择器（[PR #7623](https://github.com/agentscope-ai/QwenPaw/pull/7623)）、部署页面的移动端人体工学（[#7177](https://github.com/agentscope-ai/QwenPaw/issues/7177)），以及一个原生的移动端体验草案（[PR #7378](https://github.com/agentscope-ai/QwenPaw/pull/7378)，DO NOT MERGE），都在同一时间窗口浮现。这是主导性的未满足需求。
- **渠道可靠性参差不齐。** 企业微信流式输出感觉迟缓（[#7507](https://github.com/agentscope-ai/QwenPaw/issues/7507)），飞书队列会静默死锁（[#7534](https://github.com/agentscope-ai/QwenPaw/issues/7534)），Telegram 在代理后可能死亡（[#7662](https://github.com/agentscope-ai/QwenPaw/issues/7662)，已关闭），邮件监听器可能重处理整个收件箱（[#7668](https://github.com/agentscope-ai/QwenPaw/issues/7668)）。将 QwenPaw 作为常驻 IM 助理的用户是最响亮的声音。
- **成本人体工学很重要。** 使用旗舰 LLM 的用户正在为记忆写入请求更便宜的后台模型（[#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664)） — 这直接表明记忆/后端成本已成为现实中的摩擦点。
- **安装/升级摩擦真实存在。** [#7660](https://github.com/agentscope-ai/QwenPaw/issues/7660)（安装失败）与 [#7666](https://github.com/agentscope-ai/QwenPaw/issues/7666)（桌面端 HF 模型下载）均出现在过去 24 小时内。
- **满意度信号：** 关于 Hub 的讨论（[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318)）是建设性的而非受挫的 — 维护者团队在路线图事项上似乎很好地调动了社区参与。

## 8. 待办事项观察

具有明显长期性或关注度不足、值得维护者优先处理的条目：

- **[#3113](https://github.com/agentscope-ai/QwenPaw/issues/3113) 团队协作指令被忽略（开启于 2026-04-08）** — 已存在约 5 个月，仍影响旗舰"团队模式"承诺。无关联修复 PR。
- **[#4175](https://github.com/agentscope-ai/QwenPaw/issues/4175) MCP `tls_verify` / `ca_file`（开启于 2026-05-10）** — 一个常规的企业网络需求，已停滞约 4 个月。无关联修复 PR。
- **[#5992](https://github.com/agentscope-ai/QwenPaw/pull/5992) Per-session model overrides（PR，开启于 2026-

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目日报 — 2026-09-11

## 1. 今日概览

ZeroClaw 在过去 24 小时呈现**高活跃度但零吞吐**的状态：有 50 个 Issue 和 50 个 PR 被更新,但**关闭的 Issue 为 0、合并的 PR 为 0**,且没有新版本发布。活动面主要由 **S0/S1 级安全缺陷**主导(委派白名单绕过、Shell 工作区边界绕过、紧急停止未接入运行时、审计日志默认开启但无输出),以及一条**长期堆积的 PR 系列(#8289)**,围绕 RFC #7141 重写整套认证/安全模型。CI/跨平台加固(Windows 测试对齐、Rust 缓存关键路径、发布签名归并)也是重要主题。从健康度看,项目当前处于**重构模式而非发版模式**——参与度高,推进速度低。

## 2. 版本发布

过去 24 小时**无新版本发布**。最近一次有据可查的发布背景为 v0.8.3(该版本同时附带三套并行的来源/签名机制——参见 Issue [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101))。

## 3. 项目进展

**过去 24 小时内无 PR 被合并或关闭。** 已合并 PR 列为空,因此今天没有新功能落地或缺陷修复可以汇报。所列 50 个 PR 全部仍处于 Open 状态。

值得关注的在途 PR(Open,等待评审/合并):
- [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337) — fix(tools): git 操作时遵守 allowed roots(安全,XL)
- [#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511) — feat(quickstart): 当 provider 拒绝凭据时阻止持久化
- [#10768](https://github.com/zeroclaw-labs/zeroclaw/pull/10768) — feat(channels): 新增 Sendblue iMessage/SMS 通道(新通道)
- [#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109) — feat(providers): 原生 Hailo-Ollama 支持(do-not-merge)
- [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248)、[#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255)、[#10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265)、[#10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268)、[#10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270)、[#10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274)、[#10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275)、[#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) — RFC #7141 安全重构的分阶段堆栈(8 层深链)

## 4. 社区热议话题

**按评论数排序(Issue):**

1. [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) — **Windows 上 74 个测试失败**(19 条评论)。讨论量最大的单条 Issue。根因:Windows 被当作二等公民——CI 只在 Linux 跑测试,而用户日常使用 Windows/macOS。表现:仅 Unix 可用的测试命令、路径语义、控制台编码(代码页 936)均出错。
2. [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) — **归并发布签名机制**(9 条评论)。需求:将三套签名(cosign + GitHub attestations + slsa-github-generator)收敛为一种机制,约 20 个发布资产。
3. [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — **RFC:简化 RFC 投票流程**(8 条评论)。需求:取消强制的 48h/72h 讨论窗口,并允许 REVISE 中止当前快照——即降低流程开销。
4. [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — **将 Telegram 媒体组合并为单个多模态轮次**(8 条评论)。需求:多图消息应当只需一次 LLM 调用,而不是 N 次。
5. [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) — **Nextcloud Talk 机器人消息 API 错误**(8 条评论,已阻塞)。需求:在 Nextcloud Talk 通道上实现真实的消息送达。

**按结构排序(PR):** [RFC #7141](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) 的 8 层 PR 堆栈(JordanTheJet)主导了 PR 活动——它触及每一个 crate(agent、channel、config、daemon、gateway、memory、runtime、security、tool、tests),是数据集中可见的最大规模横切重构。

## 5. Bug 与稳定性

按严重度排序(S0 = 数据丢失/安全风险,S1 = 工作流阻塞):

| 级别 | Issue | 组件 | 修复 PR? |
|-----|-------|-----------|---------|
| **S0** | [#8279](https://github.com/zeroclaw-labs/zeroclaw/issues/8279) 委派绕过父级工具白名单——子代理可调用父策略排除的工具 | tool/delegate, security | 未关联 |
| **S0** | [#9247](https://github.com/zeroclaw-labs/zeroclaw/issues/9247) 通过符号链接绕过 Shell 工具工作区边界 | tool/shell, security:policy | 未关联 |
| **S1** | [#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559) 在 Web 仪表盘退出聊天窗口时代理会停止 | web dashboard | 未关联 |
| **S1** | [#9207](https://github.com/zeroclaw-labs/zeroclaw/issues/9207) `web_fetch` 对 gzip/brotli/deflate 返回乱码 | tool/web | 未关联 |
| **S1** | [#9333](https://github.com/zeroclaw-labs/zeroclaw/issues/9333) 切换会话后失败的 ACP 轮次消失 | channel/acp | 未关联 |
| **S1** | [#9421](https://github.com/zeroclaw-labs/zeroclaw/issues/9421) 不完整的终端响应被报告为成功 | runtime, multiple providers | 未关联 |
| **S1** | [#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794) 中途停止代理会从上下文中清除工具调用与思考过程 | web dashboard | 未关联 |
| **S1** | [#9191](https://github.com/zeroclaw-labs/zeroclaw/issues/9191) Cron 代理任务缺少挂钟超时 | runtime/cron | 未关联 |
| **S2** | [#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462) Windows 上 74 个测试失败(见上) | tooling/ci | 关联至 [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) |
| **S2** | [#9284](https://github.com/zeroclaw-labs/zeroclaw/issues/9284) 配置 flush 可能覆盖并发写入 | runtime/daemon | 未关联 |
| **S2** | [#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800) 终止 zeroclaw 进程后端口仍被 Windows 占用 | gateway | 未关联 |
| **S2** | [#7899](https://github.com/zeroclaw-labs/zeroclaw/issues/7899) OpenAI STT provider 忽略基于环境变量的凭据 | channel | 未关联 |
| **S2** | [#9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089) 工具输出支持 `[IMAGE:]` 但不支持 `[AUDIO:]` 标记 | provider | 未关联 |
| **S2** | [#9332](https://github.com/zeroclaw-labs/zeroclaw/issues/9332) 多模态上下文计量在图像密集型请求中低估 | zerocode | 未关联 |
| **S2** | [#9177](https://github.com/zeroclaw-labs/zeroclaw/issues/9177) Qwen3.6-35B-A3B 的 JIT 加载失败,提示 "Engine protocol startup was aborted" | runtime | 未关联 |
| **S2** | [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) 紧急停止仅为 CLI 状态文件,无运行时路径读取 | cli/security | 未关联 |
| **S2** | [#9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391) 命令审计日志默认开启但不写入任何内容 | security/audit | 未关联 |
| **S3** | [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) Telegram 媒体组未合并(见上) | channel/telegram | 未关联 |
| **S3** | [#6157](https://github.com/zeroclaw-labs/zeroclaw/issues/6157) Nextcloud Talk API 错误(见上,已阻塞) | channel/nextcloud-talk | 未关联 |
| **S3** | [#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198) 守护进程重载后 Discord 输入指示器卡住 | channel/discord | 未关联 |
| **S3** | [#9363](https://github.com/zeroclaw-labs/zeroclaw/issues/9363) 本地化 UI 中配置元数据仍为英文 | zerocode/web | 未关联 |

**相邻的安全发现**(由 `belumume` 从主机审计中提交,未标注明确严重度,但均涉及安全原语):
- [#9393](https://github.com/zeroclaw-labs/zeroclaw/issues/9393) Bluesky 与 Reddit 缺少发送方授权与中心化网关(P1)
- [#9390](https://github.com/zeroclaw-labs/zeroclaw/issues/9390) 紧急停止(见上)
- [#9391](https://github.com/zeroclaw-labs/zeroclaw/issues/9391) 审计日志不写入内容(见上)
- [#8519](https://github.com/zeroclaw-labs/zeroclaw/issues/8519) 对齐 cargo-audit/deny 漂移 + wasmtime-wasi CVE(P1)

**闭环说明:** 在今天更新的 22+ 个 Bug Issue 中,**零个有明确关联的修复 PR 被合并或关闭**。堆叠的 [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) → [#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321) 链在落地后预计会覆盖其中若干项,但它仍处于 8 层堆叠状态。

## 6. 功能请求与路线图信号

**强烈的路线图信号(PR 已在途中,很可能进入下一版本):**
- **Sendblue iMessage/SMS 通道**([#10768](https://github.com/zeroclaw-labs/zeroclaw/pull/10768))——在非 Apple 主机上接入 iMessage。
- **Hailo-Ollama 原生 provider**([#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109),do-not-merge)——支持 Hailo 加速器。
- **Quickstart 凭据预检**([#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511))——当 provider 拒绝凭据时阻止持久化。
- **OIDC `oidc.<alias>` token-verification provider**([#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255))——RFC #7141 第 5 阶段。
- **浏览器 PKCE + 跨面注册**([#10321](https://github.com/zeroclaw-labs/zeroclaw/pull/10321))——认证重构。
- **无浏览器 OIDC device-grant + client_credentials**([#10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270))。
- **私有主体内存 + 平面隔离**([#10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268))。
- **下线 Nevis/iam_policy**([#10275](https://github.com/zeroclaw-labs/zeroclaw/pull/10275))——以 shim 替代。
- **推迟 RFC 投票周期文档**([#10288](https://github.com/zeroclaw-labs/zeroclaw/pull/10288))——治理更新(FND-003 Rev. 17)。

**可能即将转为 PR 的开放增强 Issue(RFE/功能请求):**
- [#9101](https://github.com/zeroclaw-labs/zeroclaw/issues/9101) 归并发布签名机制(P1)
- [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) Telegram 媒体组合并
- [#7108](https://github.com/zeroclaw-labs/zeroclaw/issues/7108) 改进 Rust 缓存构建 / CI 关键路径
- [#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461) 在 CI 中运行 Windows/macOS 测试套件
- [#9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089) 支持 `[AUDIO:]` 标记(接近 [#10480](https://github.com/zeroclaw-labs/zeroclaw/pull/10480)——后者用于隔离被拒绝的图像)
- [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) RFC 投票简化
- [#10366](https://github.com/zeroclaw-labs/zeroclaw/issues/10366) PR 评审证据/时效性(已有 Rev. 2,带加速合并通道)

**下一版本预测:** v0.8.4 或 v0.9.0 最有可能在 **[#8289 堆栈](https://github.com/zeroclaw-labs/zeroclaw/pull/10248)** 合并后才落地——该堆栈触及每个层面的安全边界。在此之前,预计会有以 [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)、[#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635)、[#10511](https://github.com/zeroclaw-labs/zeroclaw/pull/10511)、[#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)(ACP 中断轮次恢复) 为门禁的增量 Bug 修复版本。

## 7. 用户反馈摘要

**反复出现的痛点(跨 Issue):**

1. **Windows 是二等公民。** 评论数最多的三个 Issue([#7462](https://github.com/zeroclaw-labs/zeroclaw/issues/7462)、[#8800](https://github.com/zeroclaw-labs/zeroclaw/issues/8800)、[#7461](https://github.com/zeroclaw-labs/zeroclaw/issues/7461))均明确涉及 Windows 专属 Bug 或测试缺口。用户反馈在 Windows 11 25H2 上,被终止的进程会留下僵尸的 LISTENING/CLOSE_WAIT 端口。
2. **安全模型存在可见漏洞。** 由 `belumume` 从主机审计中提交了多条 S0 Issue——紧急停止文件仅为 CLI 使用,运行时无法读取;命令审计日志默认开启却不写入任何内容;Bluesky/Reddit 通道缺少发送方授权。审计内容已公开且详尽(每处引用均从 HEAD 打开并摘录原文)。这反映出用户对默认安全姿态的低信任度。
3. **流程摩擦。** Issue [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) 明确抱怨 48h/72h 的 RFC 讨论窗口"往往并不能带来更多评审"——社区希望治理更轻量。
4. **Web 仪表盘 UX。** 三条 S1 级 Web 仪表盘 Bug([#8559](https://github.com/zeroclaw-labs/zeroclaw/issues/8559)、[#8794](https://github.com/zeroclaw-labs/zeroclaw/issues/8794)、[#9198](https://github.com/zeroclaw-labs/zeroclaw/issues/9198))提示仪表盘在会话/取消语义上较为脆弱——用户离开时代理停止、取消后上下文丢失、重载后输入指示器卡住。
5. **通道可靠性。** Telegram、Discord、Nextcloud Talk 均存在未关闭 Bug。Telegram 那条([#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514))起于 2026-04-08——已开放超过 5 个月——说明通道团队人手紧张。
6. **多模态缺口。** 用户正推动多模态能力([#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514)、[#9089](https://github.com/zeroclaw-labs/zeroclaw/issues/9089)、[#9332](https://github.com/zeroclaw-labs/zeroclaw/issues/9332)、[#10480](https://github.com/zeroclaw-labs/zeroclaw

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*