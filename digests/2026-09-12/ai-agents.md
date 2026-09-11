# OpenClaw 生态日报 2026-09-12

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-11 23:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目摘要 — 2026-09-12

## 1. 今日概览

OpenClaw 发布了 **v2026.9.4**，头条改动是支持从兼容的失败更新中安全恢复（#140339），但该版本本身引发了新一轮与升级相关的阻塞问题。活跃度很高：24 小时内有 500 个 issue 和 500 个 PR 被触及（按 266/234 和 265/235 拆分），issue 跟踪器被 **会话状态回归、升级/迁移失败、Gateway 崩溃循环** 所主导。由 `steipete` 主导的维护者正在落地一批针对升级路径的协调修复（`#145043`、`#145044`、`#145379`、`#145369`、`#133884`）以及若干鉴权/模型解析问题（`#145196`、`#144768`、`#145051`、`#145248`）。

## 2. 版本发布

**v2026.9.4**（openclaw 2026.9.4）— 发布于 2026-09-11。（[Release notes](https://github.com/openclaw/openclaw/releases/tag/v2026.9.4)）

- **从兼容的失败更新中恢复**：在 `openclaw update` 失败时，若 schema/配置校验证明回滚是安全的，则保留上一个包并连同其配置与服务一同恢复。数据库迁移仍然需要经过验证的更新前备份。（#140339）

⚠️ **兼容性说明**：已发布的 v2026.9.4 **不包含** [#144208](https://github.com/openclaw/openclaw/issues/144742)，后者在发布分支切出后才合入 `main`。一个被保留的版本 1 交接租约行会导致每次配置写入失败；[#145192](https://github.com/openclaw/openclaw/issues/145192) 和 [#144742](https://github.com/openclaw/openclaw/issues/144742) 记录了在 9.2 → 9.4 路径上回滚到已迁移的 9.4 状态所导致的失败。运行托管更新的运维人员应暂缓升级，或在依赖 [#144208](https://github.com/openclaw/openclaw/pull/145043) 的修复可用后再行应用。

## 3. 项目进展

过去 24 小时内关闭/合并（节选，多数 PR 无公开评论数，但合并状态可见）：

- **[#144712](https://github.com/openclaw/openclaw/issues/144712)** — 已关闭：`npm update` 在 "global install swap" 阶段失败，回滚完整却被报告为 "recovery is unverified"。
- **[#140908](https://github.com/openclaw/openclaw/issues/140908)** — 已关闭：`doctor --fix`/`gateway status --deep` 在 `systemd --user` 下因 `systemctl --user is-enabled` 报 `EACCES` 而失败。
- **[#140971](https://github.com/openclaw/openclaw/issues/140971)** — 已关闭：消息驱动的运行中全部 13 个飞书插件工具被静默丢弃（2026.7.1-2 → 2026.8.1 的回归）。
- **[#140821](https://github.com/openclaw/openclaw/issues/140821)** — 已关闭：systemd 用户服务下，2026.9.2 升级后 Gateway 重启挂起。
- **[#137377](https://github.com/openclaw/openclaw/issues/137377)** — 已关闭：Windows 2026.8.2 上 Doctor `--fix` 在最终重启步骤始终失败。
- **[#144581](https://github.com/openclaw/openclaw/issues/144581)** — 已关闭：Windows 上 `openclaw update` 在 dev/git 通道的候选快照步骤失败。
- **[#49876](https://github.com/openclaw/openclaw/issues/49876)** — 已关闭（stale）：工具调用失败时，定时会话投递产生幻觉输出。
- **[#40786](https://github.com/openclaw/openclaw/issues/40786)** — 已关闭：为备份 CLI 增加 `.gitignore` 风格排除模式的功能请求（待复审）。
- **[#79168](https://github.com/openclaw/openclaw/issues/79168)** — 已关闭（stale）：对工具输出进行基于内容的提示注入扫描。
- **[#92405](https://github.com/openclaw/openclaw/issues/92405)** — 已关闭：子代理 spawn 持久化了原始 provider 而非 CLI 运行时。
- **[#96337](https://github.com/openclaw/openclaw/issues/96337)** — 已关闭：anthropic-vertex 在纯文本响应上的回归。
- **[#96947](https://github.com/openclaw/openclaw/issues/96947)** — 已关闭：2026.6.10 之后 OpenRouter Anthropic cacheWrite 回归。
- **[#97021](https://github.com/openclaw/openclaw/issues/97021)** — 已关闭：Telegram 输入状态指示器在 forum/topic 模式下卡住。
- **[#92367](https://github.com/openclaw/openclaw/issues/92367)** — 已关闭：作用域绑定的 gateway auth token 功能请求。
- **[#136827](https://github.com/openclaw/openclaw/pull/136827)** — 已合并：将 `qs` 覆盖移出两项已发布的 moderate 依赖告警。
- **[#129157](https://github.com/openclaw/openclaw/pull/129157)** — 已合并：Web UI 展示嵌套的工具活动与失败详情。

进行中的开放 PR（状态：👀 待评审 / ⏳ 等作者 / 📣 需要验证）：

- [#145043](https://github.com/openclaw/openclaw/pull/145043) — 防止过期的 Codex 迁移阻塞升级（关闭 [#123326](https://github.com/openclaw/openclaw/issues/123326)）。
- [#145044](https://github.com/openclaw/openclaw/pull/145044) — 在更新的候选版本状态下执行无人值守修复。
- [#145379](https://github.com/openclaw/openclaw/pull/145379) — 保留开放的 `groupPolicy` 作为告警，使 9.3 → 9.4 的 Doctor lint 通过。
- [#145369](https://github.com/openclaw/openclaw/pull/145369) — 更新后仍展示不可用的插件需求。
- [#133884](https://github.com/openclaw/openclaw/pull/133884) — 在更新过程中恢复托管的插件发布版本钉位（关闭 [#135776](https://github.com/openclaw/openclaw/issues/135776) 这类插件版本错位问题）。
- [#144768](https://github.com/openclaw/openclaw/pull/144768) — Provider 凭据仅在其绑定到对应 provider 时启用对应模型。
- [#145196](https://github.com/openclaw/openclaw/pull/145196) — 等待持久化的 OAuth 刷新过渡完成。
- [#145051](https://github.com/openclaw/openclaw/pull/145051) — 让聊天登录和模型访问恢复操作可被采取行动。
- [#145248](https://github.com/openclaw/openclaw/pull/145248) — 在思考层级解析中尊重 `compat.supportedReasoningEfforts`。
- [#145377](https://github.com/openclaw/openclaw/pull/145377) — Radius provider，附带浏览器登录与原生流式（Pi 协议）。
- [#132769](https://github.com/openclaw/openclaw/pull/132769) — LINE：将群组的 `requireMention` 应用于每条消息。
- [#145391](https://github.com/openclaw/openclaw/pull/145391) — 保留完整的语音消息转写（移除 1,200 秒的解码上限）。
- [#145316](https://github.com/openclaw/openclaw/pull/145316) — 在模型选择器中展示每个 provider 的登录方式。
- [#145384](https://github.com/openclaw/openclaw/pull/145384) — 缓存成功的 Gateway 目录读取以避免重复等待。
- [#145043](https://github.com/openclaw/openclaw/pull/145043)、[#145044](https://github.com/openclaw/openclaw/pull/145044)、[#145379](https://github.com/openclaw/openclaw/pull/145379) 作为一组协调的升级路径加固集群发布。

## 4. 社区热议话题

| 排名 | 项目 | 评论数 | 潜在需求 |
|---|---|---|---|
| 1 | [#119720](https://github.com/openclaw/openclaw/issues/119720) — 同步的 agent 持久化与转写维护在大规模下阻塞 Gateway 事件循环 | 17 | 需要非阻塞持久化，能在多代理（600+ 代理）部署下存活，且不会因 `integrity_check` 卡住循环 |
| 2 | [#97616](https://github.com/openclaw/openclaw/issues/97616) — OpenClaw 泄漏未被回收的 hook/tool 子进程（僵尸积累） | 16 | 需要在长运行的 Gateway 主机上可靠地回收进程 |
| 3 | [#96834](https://github.com/openclaw/openclaw/issues/96834) — WhatsApp 1:1 入站图片使主通道卡住约 3 分钟 | 15 | 多模态入站不得阻塞 active_reply/queued_work 通道 |
| 4 | [#140620](https://github.com/openclaw/openclaw/issues/140620) — 原地 7.1-2 → 9.2 在 ~1500 中第 27 个处停止会话转写对账 | 12 | 8.x 之前的转写（`.trajectory.jsonl`）导入需要有界进度与可恢复性 |
| 5 | [#144712](https://github.com/openclaw/openclaw/issues/144712) — `npm update` 在 "global install swap" 失败，回滚完整却被误报为 "recovery unverified" | 12 | 更新交接必须区分 "包已恢复但未执行校验" 与 "包已安全恢复" |
| 6 | [#127148](https://github.com/openclaw/openclaw/issues/127148) — Codex `sessions.compact` 触发第二个 app-server，导致活动写入者冲突 | 12 | 压缩必须在所属线程/客户端上运行 |
| 7 | [#142585](https://github.com/openclaw/openclaw/issues/142585) — 2026.9.3 Doctor 拒绝合法的旧版 workspace 状态 | 12 | Doctor 迁移路径需要对旧版数据规范化，或在证明合法时跳过 |
| 8 | [#49876](https://github.com/openclaw/openclaw/issues/49876) — 工具失败时定时会话投递产生幻觉输出 | 12 | 信任/安全：隔离的定时任务应 fail-closed，而非编造输出 |
| 9 | [#40786](https://github.com/openclaw/openclaw/issues/40786) — 为 `openclaw backup create` 增加 `.gitignore` 风格排除模式 | 12 | 备份易用性 + 密钥安全 |
| 10 | [#141252](https://github.com/openclaw/openclaw/issues/141252) — 2026.9.2 回归："Reply operation has no active tool authority snapshot" | 11 | 繁忙会话/排队回复在调度跳转时丢失其权限快照 |
| 11 | [#141747](https://github.com/openclaw/openclaw/issues/141747) — 运行时脚手架 `<system-reminder>` 每轮注入约 686 tokens，无法关闭 | 11 | 仅聊天部署下的 token 成本透明度与退出选项 |

**潜在需求分析**：社区正在围绕三个持续主题聚合 — （a）**升级/迁移安全**（前列条目 #4、#5、#7、#10 都源自 7.x → 8.x → 9.x 的存储与配置演进），（b）**Gateway 事件循环纪律**（#1、#3），以及（c）**工具权限与会话状态正确性**（#6、#10、#11）。

## 5. Bug 与稳定性

按严重程度排序（P0 / `ux-release-blocker` / `crash-loop` / `diamond lobster`）：

| 严重度 | Issue | 影响 | 修复 PR？ |
|---|---|---|---|
| 🔴 P0 release-blocker | [#144742](https://github.com/openclaw/openclaw/issues/144742) — 2026.9.4 未包含 [#144208](https://github.com/openclaw/openclaw/pull/145043)；v1 交接租约行导致每次配置写入失败 | 所有从先前版本升级的 2026.9.4 用户 | 待 [#145043](https://github.com/openclaw/openclaw/pull/145043)（草稿尚未通过校验） |
| 🔴 P0 release-blocker | [#145192](https://github.com/openclaw/openclaw/issues/145192) — 9.2 → 9.4 托管更新在候选 Doctor 步骤失败，随后回滚到已迁移的 9.4 状态 | macOS/npm-global 用户升级到 9.4 | 同上 |
| 🔴 P0 release-blocker | [#140620](https://github.com/openclaw/openclaw/issues/140620)

---

## 横向生态对比

# 跨项目对比报告 — 个人 AI 助手 / 智能体开源生态

**窗口期：** 2026-09-12 · **项目：** OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw

---

## 1. 生态总览

开源个人 AI 助手品类已经明确超越了单用户 CLI 智能体的形态：五个被跟踪的项目如今都作为常驻、由网关托管的服务，嵌入到消息平台（Telegram、WhatsApp、飞书、微信、LINE、Mattermost）之中；工程重心已转移到该模型带来的运维课题——安全升级、租户隔离、会话状态持久化、Token 成本控制。五个项目中有四个在 24 小时窗口期内发布或预发布了版本，说明发布列车文化正在走向成熟。与此同时，一层竞争性的可移植能力正在浮现：QwenPaw 的 PawPort 主动承接 Codex 和 Qoder 的迁移用户，OpenClaw 也保持着对 Codex 迁移路径的兼容——这是整合期和用户互相挖角的明显信号。最后，安全能力正走向专业化：OIDC 主体栈（ZeroClaw）、跨 Profile 凭据隔离闭环（Hermes）、以及默认失败的审批门控语义，已经从差异化变成了入场券。

---

## 2. 活跃度对比

| 项目 | Issues（24h） | PRs（24h） | 发布状态 | 健康度评分 |
|---|---|---|---|---|
| **OpenClaw** | 500 touched | 500 touched | v2026.9.4（9/11）已发布 **伴随两个 P0 升级阻塞问题**（#144742、#145192）；托管更新暂停建议 | **7/10** — 规模与速度无人能及，但发布纪律出现下滑，7.x→9.x 迁移债务是主导风险 |
| **Hermes Agent** | 50（21 已关闭） | 50（34 已合并） | v0.21.2 补丁（9/11）针对 state.db 并发写损坏 | **8/10** — 最佳关单率（68% PR 合并），安全加固里程碑；但结构性 Profile 身份债务（#88715）仍未关闭 |
| **IronClaw** | 0 | 1（未评审） | 窗口期内无 | **4/10\*** — 单个 PR（#8076）自 9/6 起等待评审；*\*置信度低——大概率是迭代间歇低谷，非项目停滞* |
| **QwenPaw** | 21 | 41（18 已关闭） | v2.2.1 stable（9/11）—— 按智能体模型路由、内存升级 | **7.5/10** — 节奏稳健、贡献者管道活跃，但仍有三个未修复的 HIGH 级回归（#7567、#7678、#7708） |
| **ZeroClaw** | 50 | 50 | 无；当前版本 v0.8.5，至少 3 个已知回归 | **6.5/10** — OIDC/安全方向势头强劲（#8289），但治理队列（#8692）阻塞合并，回归等待发版 |

*方法说明：健康度评分 = 吞吐 × 关单率 × 发布纪律 × 待处理 P0/P1 负载 × 待办清单整洁度，仅基于 24h 数据加权得出。*

---

## 3. OpenClaw 的位置

**相对于同行的优势：**
- **规模（约为同行 10 倍）：** 每日约 1,000 项交互，对比 Hermes/ZeroClaw 的 50–100 和 QwenPaw 的 62；热门讨论帖单帖即可收获 11–17 条评论，说明是深度运维者的实质性参与，而非路过式提报。
- **最广的接入面矩阵：** WhatsApp、Telegram、飞书、LINE，新增的 Radius provider（Pi 协议）、语音转写——同行中没有项目能覆盖如此多的传输通道与 provider。
- **把更新机制做成产品功能：** v2026.9.4 中"从失败更新中恢复"的能力（#140339）是独一份的；没有任何竞争对手把可回滚升级作为主打发布项。
- **已被验证的规模余量：** 600+ 智能体部署对事件循环进行压力测试（#119720）——这是同行尚未触达的问题面。

**技术路线差异：** OpenClaw 是以网关为中心的设计，配备执行通道（active_reply/queued_work）与工具权限快照；而 Hermes 是在同一主机上的多路复用 Profile，ZeroClaw 是 Rust 写的 RPC 内核搭配正式的 RFC 治理，QwenPaw 则在智能体运行时之上叠了一层桌面/控制台 + Hub 产品。

**弱点：** 发布纪律——v2026.9.4 在未合并 #144208 的情况下发布，直接催生两个 P0。升级路径的痛苦（7.x→9.x 存储演进：#140620、#142585、#144712）远超同行的迁移问题；事件循环阻塞与僵尸回收（#97616）是规模税。颇具讽刺意味的是，OpenClaw 的若干问题恰恰是它走在采用曲线更前端的产物。

**社区规模：** 在活跃度总量与贡献者广度上无疑是最大的；具备一支由 `steipete` 领衔的维护者队伍，能够在一天之内落地一组协调一致的 5-PR 修复集群（#145043/#145044/#145379/#145369/#133884）。

---

## 4. 共同关注的技术方向

| 主题 | 项目 | 具体需求 / 证据 |
|---|---|---|
| **多租户、Profile 隔离与主体认证** | Hermes、ZeroClaw、QwenPaw、OpenClaw | Hermes：多路复用群组中约 2/3 的关单集中在此；延迟绑定身份的元 issue #88715；跨 Profile 凭据泄漏 #65940/41 已关闭。ZeroClaw：8-PR OIDC 栈 #8289（主体归属、会话归属、私有记忆）。QwenPaw：Hub RBAC 路线图 #7318 + 管理员引导 #7696。OpenClaw：作用域受限 Token #92367，权限快照 #141252。 |
| **会话状态持久化与存储并发** | Hermes、OpenClaw、ZeroClaw | Hermes：state.db 因二级写入导致 WAL 损坏、默认放行的守卫（#103339）。OpenClaw：600+ 智能体下的阻塞式持久化（#119720），transcript 调和停滞（#140620）。ZeroClaw：失败轮次后丢弃持久化历史（#10788）。 |
| **升级 / 迁移安全性** | OpenClaw、Hermes、QwenPaw | OpenClaw：压倒性的核心议题；协调式加固集群推进中。Hermes：v0.21.x 修复性发布。QwenPaw 反向操作——把迁移做成增长向量（PawPort 从 Codex/Qoder 导入，#6960）。 |
| **Token 成本控制与缓存完整性** | ZeroClaw、OpenClaw、QwenPaw | ZeroClaw：Anthropic 缓存前缀失效集群（#10777/#10778/#10701），压缩逻辑被移除（#10780）。OpenClaw：每轮约 686 Token 的隐藏 `<system-reminder>`（#141747）。QwenPaw：`/compact` 请求（#7679）、提前压缩的修复（#7652）。 |
| **子智能体编排与按任务模型路由** | QwenPaw、OpenClaw、ZeroClaw | QwenPaw：`spawn_subagent` 100% 超时（#7678），`subagent_model` 被静默忽略（#7676/#4901）；v2.2.1 已交付按智能体路由。OpenClaw：压缩与活动写入者的冲突（#127148）。ZeroClaw：按智能体的工具作用域（#9746）。 |
| **默认失败的信任语义** | Hermes、OpenClaw、ZeroClaw | Hermes：`--initial-status blocked` 被自动提升、绕过人工审批（#39609，**未关闭，无 PR**）。OpenClaw：工具失败时的 cron 幻觉（#49876）。ZeroClaw：记忆作者身份误分类（#10754）。 |
| **消息平台多模态入口** | OpenClaw、ZeroClaw、QwenPaw、Hermes | OpenClaw：WhatsApp 图片卡死主通道 3 分钟（#96834）。ZeroClaw：媒体组批处理（#5514）、图片能力缓存淘汰（#10778）。QwenPaw：Telegram 富文本渲染（#7713）。Hermes：Mattermost 语音转码（#108653）。 |

---

## 5. 差异化分析

- **OpenClaw** — *运维者的平台。* 始终在线、自托管的个人助手，舰队级规模；最广的传输通道/provider 矩阵；产品化的更新/回滚机制。目标人群：自托管者与运行常驻助手的运维方，覆盖 600+ 智能体部署。
- **Hermes Agent** — *多角色宿主。* 差异化点在于同一主机上多路复用的 Profile（多个角色共用基础设施）、外部插件 API 配合调用级上下文、以及 Nous 推理集成。目标人群：在一台机器上跑多个不同角色 Profile 的高级用户。
- **QwenPaw** — *产品化的团队玩法。* 精致的桌面/控制台 UX、中国市场的渠道覆盖（微信/钉钉与 Telegram 并行），以及押注多租户 Hub（共享工作区、RBAC）的战略选择。PawPort 让转入路径零摩擦——这是五者中增长取向最激进的项目。
- **ZeroClaw** — *安全/治理最大化派。* Rust 内核（RPC 派发器、栈守卫）、正式的 RFC 流程、深度 OIDC/主体架构、ZeroCode 桌面客户端。发布节奏更慢，架构投入更深。目标人群：安全导向的自托管者。
- **IronClaw** — 兼容 OpenAI 的助手接口面，Slack 能力扩展在推进中（#8076）；窗口期内信号不足以刻画其策略。

架构路线的分野相当清晰：OpenClaw 和 Hermes 是网关守护进程式设计（分别基于 Node/Python 生态），ZeroClaw 是编译型内核配更严格的进程纪律，QwenPaw 则在智能体运行时之上交付了一套面向终端用户的桌面/控制台产品。

---

## 6. 社区势能与成熟度

**活跃度梯队：**
- **第一梯队（巨型）：** OpenClaw——日均约 1,000 项；维护者板凳深度无人能及。
- **第二梯队（高）：** Hermes 与 ZeroClaw（各约 100/日），QwenPaw（约 62/日，合并吞吐强劲）。
- **第三梯队（窗口期内静默）：** IronClaw——大概率是周期性低谷，但那条跨切面的 PR #8076 长期未评审，值得维护者关注。

**快速迭代型：** QwenPaw——发布列车节奏、功能速度、以及最健康的首次贡献者管道（单日 5+ 个首提 PR：#7712、#7713、#6499、#6776、#7592）。OpenClaw——尽管 P0 负载高，每日仍能协调推进修复集群。

**稳定 / 整合型：** Hermes——重写后进入整合模式（日合并 34 个，绝大部分是隔离性修复而非新功能）；存在"只修补症状、让结构性 #88715 修复不断延后"的风险。ZeroClaw——安全架构处于发版前的堆积态；速度被治理吞吐（#8692 决策队列，15 条评论）卡住，而非工程产能不足。

**成熟度标志：** 来自运维者的现场级诊断（Hermes #103339）、带显式设计批准的 RFC 纪律（ZeroClaw #8289）、与用户双向协商路线图（QwenPaw #7318）、以及协调一致的多 PR 修复策略（OpenClaw）。IronClaw 在本窗口期内无法评估成熟度。

---

## 7. 趋势信号

1. **单用户智能体 → 多租户服务。** 身份/主体相关工作在 5 个项目中出现 4 次（Hermes 多路复用、ZeroClaw OIDC、QwenPaw Hub、OpenClaw 作用域 Token）。*开发者启示：* 在系统边界规范化身份模型——Hermes 的延迟绑定身份债务（#88715，约 20 个下游 bug）就是前车之鉴。
2. **可移植性即竞争策略。** PawPort 从 Codex/Qoder 的导入，以及 OpenClaw 对 Codex 兼容性的维护，表明切换成本正在下降。数据引力正在向"拥有用户会话历史与配置"的智能体转移。
3. **Token 成本可问责性已经成为产品需求。** 缓存前缀失效（ZeroClaw 的四 issue 集群）、每轮隐藏 Token 开销（OpenClaw #141747）、压缩控制（QwenPaw #7679）——任何一项缺失都会引发用户愤怒。沉默的成本 = 流失。
4. **自主性要求默认失败的语义。** Hermes 的审批门绕过（#39609）与 OpenClaw 的 cron 幻觉（#49876）划定了信任的边界：定时/自主路径必须显式失败，绝不能伪造结果或自动放行。
5. **消息平台才是运行时；多模态入口是新的 Bug 前线。** 图片处理（WhatsApp 卡死、缓存淘汰、媒体批处理）在四个项目里主导了新增的高严重度报告。
6. **升级安全性建立运维信任。** OpenClaw 的可回滚升级机制指明了生态演进的方向；Hermes 在修复过程中发生损坏的事件则展示了做反的代价。状态存储的单写者纪律是硬底线。
7. **维护者带宽与治理是规模化的瓶颈。** ZeroClaw 的决策队列、OpenClaw 对协调式修复集群的依赖，都说明流程设计对速度的卡点已不亚于代码本身——贡献者引导管道（QwenPaw 的强项）已经成为战略性资产。

**结论：** OpenClaw 在规模与覆盖面领先，但必须修正发布纪律；Hermes 与 QwenPaw 提供了最佳的"用户响应度/产出"比；ZeroClaw 在安全方向押下了最深的架构赌注；IronClaw 的定位在本窗口期内无法评估。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent — 项目摘要 (2026-09-12)

**来源：** github.com/NousResearch/hermes-agent · **时间窗口：** 最近 24 小时

---

## 1. 今日概览

Hermes Agent 经历了高强度的维护日：**50 个 issue 更新（29 个开放、21 个关闭）** 和 **50 个 PR 更新（16 个开放、34 个关闭/合并）**，核心事件是 **v0.21.2 "state.db 补丁版"** 于 2026-09-11 发布。当日讨论的主题集中在 v0.21.0 多路复用网关/会话存储重写所带来的后续问题上——今日开启或关闭的 issue 主要围绕**多路复用模式下的 profile 隔离**、**`state.db` 的并发写入损坏**，以及**跨传输/会话/存储路径的延迟绑定 profile 身份**展开。严重程度偏向 **P1/P2**，其中包含若干安全相关项（`sweeper:risk-session-state`、`risk-security-boundary`）。整体项目健康度**活跃且响应迅速**，但同样的架构性缺陷被反复打补丁，说明根本性的修复需要结构性方案，而非增量修补。

---

## 2. 发布

### v0.21.2 (v2026.9.11) — *state.db 补丁版* — 2026-09-11

**补丁版**针对 v0.21.0 会话存储连接重写引入的 `state.db` 脆弱性问题。在部分部署中，次级写入线程相互取消锁，导致实时 WAL 状态损坏。**未声明任何破坏性变更**；此版本定位为可直接替换的修复。

**迁移说明 / 告警**（根据相关 issue 推断）：
- 运行**多路复用网关**（`gateway.multiplex_profiles: true`）且同一主机上部署多个 profile 网关的实例属于最高风险群体。[#103339](https://github.com/NousResearch/hermes-agent/issues/103339) 报告在类似配置下 **4 天内（9/2–9/5）发生 7 次 state.db 损坏**，并提出了惰性 `flock` 单写入者门控方案。使用此拓扑的运维人员应在下次并发操作（例如 `hermes update`、`doctor --fix`、托管房间 worker 重启）之前完成升级。
- 注意上游守卫呈"fail-open"（即出错时放行）特征的情况。补丁与 [#107688](https://github.com/NousResearch/hermes-agent/issues/107688)（dashboard 启动时无条件可写地打开 `SessionDB`）均针对此类缺陷。
- 多路复用网关上的 cron 重启安全性也得到处理（[#107399](https://github.com/NousResearch/hermes-agent/issues/107399)）。
- 未提及配置文件变更；v0.21.x 内部应保持自洽。

> 注：数据源中的发布说明片段被截断于半句（"healthy…"）。在应用于生产多 profile 主机之前，建议在 GitHub 上阅读完整的发布说明。

---

## 3. 项目进展 — 今日合并/关闭的 PR

34 个关闭/合并的 PR（代表性条目见下）围绕三大支柱：**profile 作用域正确性**、**会话状态卫生**、以及**小型平台/提供方修复**。

| PR | 标题 | 主题 |
|---|---|---|
| [#108645](https://github.com/NousResearch/hermes-agent/pull/108645) | 为插件斜杠命令添加调用作用域上下文与可用性 | 插件 API 切片 — 为主机创建的、绑定 profile/会话/平台的调用本地上下文 |
| [#108653](https://github.com/NousResearch/hermes-agent/pull/108653) | fix(gateway)：保证 Mattermost 语音回复在 iOS 上可播放 | 网关投递 — 当 ffmpeg 可用时，将 OGG/Opus 转码为 MP3 |
| [#108627](https://github.com/NousResearch/hermes-agent/pull/108627) | fix(managed-uv)：从 managed_python_env() 中剥离 UV_PYTHON_PREFERENCE | 安装/更新 — 当用户设置了 `UV_PYTHON_PREFERENCE` 时，`hermes update` 不再失败（针对 pip-audit SIGABRT 的 Python 3.14 变通方案） |
| [#63962](https://github.com/NousResearch/hermes-agent/pull/63962) | fix(feishu)：为 SDK 线程回调保留 profile 作用域 | Profile 隔离 — Feishu 的 SDK 线程不再丢失多路复用适配器的 profile `ContextVar` |
| [#56508](https://github.com/NousResearch/hermes-agent/pull/56508) | security(gateway)：每次调用重新解析 hooks 目录 | Profile 隔离 — `gateway/hooks.py` 的 `HOOKS_DIR` 在导入时被冻结 |
| [#56315](https://github.com/NousResearch/hermes-agent/pull/56315) | fix(security)：每次调用重新解析 checkpoint/sticker-cache 路径 | Profile 隔离 — `CHECKPOINT_BASE` 与 `CACHE_PATH` 不再跨 profile 泄漏至多路复用网关 |
| [#107688](https://github.com/NousResearch/hermes-agent/issues/107688) *（已关闭 issue，修复可能与补丁版耦合）* | Dashboard 在启动时无条件可写地打开 SessionDB | 会话状态 — 关闭文档化的并发 FTS 重建损坏路径 |
| [#91654](https://github.com/NousResearch/hermes-agent/issues/91654) *（已关闭 issue）* | MCP 会话/熔断器注册表仅按服务器名作为键 | Profile 隔离 — 关闭多路复用网关中的注册表冲突 |
| [#107327](https://github.com/NousResearch/hermes-agent/issues/107327) *（已关闭 issue）* | 多路复用网关中的进程全局路径记忆 | Profile 隔离 — 受保护指令门与 config.yaml 硬阻断不再被 profile 污染 |
| [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) *（已关闭 issue）* | 多路复用 profile：MCP 连接未按 profile 作用域 | Profile 隔离 — 先/后 profile 胜出 |
| [#102120](https://github.com/NousResearch/hermes-agent/issues/102120) *（已关闭 issue）* | hosted_room_worker 在多 profile 网关重启时损坏共享 state.db | 会话状态 — 重启路径不再竞争 |
| [#71344](https://github.com/NousResearch/hermes-agent/issues/71344) *（已关闭 issue）* | 命名 profile 的消息面板 "gateway stopped" | Profile 隔离 |
| [#107399](https://github.com/NousResearch/hermes-agent/issues/107399) *（已关闭 issue）* | 直通环境变量键破坏 cron 重启安全派发 | Profile 隔离 |
| [#103717](https://github.com/NousResearch/hermes-agent/issues/103717) *（已关闭 issue）* | 飞书次级所有者的繁忙会话后续操作未授权 | Profile 隔离 |
| [#65940](https://github.com/NousResearch/hermes-agent/issues/65940) *（已关闭 issue）* | 凭据池可能使用其他 profile 的 API 密钥 | **安全** — 凭据池不再回退到来自不同 profile 的进程级环境变量 |
| [#65941](https://github.com/NousResearch/hermes-agent/issues/65941) *（已关闭 issue）* | Nous 请求可能使用其他 profile 的端点 | **安全** — Nous 推理端点覆盖按 profile 作用域 |
| [#107422](https://github.com/NousResearch/hermes-agent/issues/107422) *（已关闭 issue）* | 多路复用 dashboard 一次性 TERMINAL_* 环境桥接 | Profile 隔离 — Docker 策略不再锁存次级 profile |
| [#98292](https://github.com/NousResearch/hermes-agent/issues/98292) *（已关闭 issue）* | QQBot 审批按钮在命名 profile 会话中被拒绝 | Profile 隔离 |
| [#82903](https://github.com/NousResearch/hermes-agent/issues/82903) *（已关闭 issue）* | session_search 工具在网关中忽略 'profile' 参数 | Profile 隔离 |
| [#102526](https://github.com/NousResearch/hermes-agent/issues/102526) *（已关闭 issue）* | 桌面启动后端绑定到其他 profile 的 state.db | Profile 隔离 — `HERMES_HOME` 覆盖竞争已修复 |
| [#99121](https://github.com/NousResearch/hermes-agent/issues/99121) *（已关闭 issue）* | mem0 插件在自托管 OSS 上失败关闭 | Profile 隔离 — `UnscopedSecretError` 已修复 |
| [#2825](https://github.com/NousResearch/hermes-agent/issues/2825) *（已关闭 issue）* | 在 Termux/proot Ubuntu 25.10 中安装 | 安装 |

**净动态：** 今日关闭项中约**三分之二集中在多路复用/profile 隔离队列**——目标明确、聚焦。#65940 / #65941（跨 profile 凭据/端点泄漏）的安全关闭是一次有意义的硬化里程碑。

---

## 4. 社区热点

按最近 24 小时评论量排序，全部 issue：

| # | Issue | 评论数 | 根本需求 |
|---|---|---:|---|
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | 使用 `--initial-status blocked` 创建的任务约 1 秒后无主体自动晋升至 `ready` — **人工审批门被绕过** | **14** | **信任边界**：kanban 的 `--initial-status` 标志本应表达人工门禁，但门禁被静默自动解除。这是一项被调度器悄然违反的 UX/安全预期。 |
| [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) | Dashboard/桌面 profile 切换不完整 — MCP 工具始终不加载，secrets/`${VAR}` 从启动 profile 而非所选 profile 解析 | **11** | **Profile 身份**在有状态使用前未被规范化；用户在 UI 中选择一个 profile 后却得到混合行为。这与 #88715（身份延迟绑定）属于同一类投诉，但视角来自终端用户。 |
| [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) | 来自 `doctor --fix` / `repair_state_db_schema` / hosted_rooms 的次级写入损坏 live-WAL state.db — **上游守卫呈 fail-open**（已现场验证） | **8** | **运行可靠性**：维护侧工具自身可能损坏会话存储。提出惰性 `flock` 单写入者门控方案，直接促成 v0.21.2。 |
| [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) | 多路复用 profile：MCP 连接/工具集解析未按 profile 作用域 | **6** | **多租户**：仅首个 profile 获得 MCP 工具；后续 profile 静默继承或一无所获。已于今日关闭，暗示修复已落地。 |
| [#87739](https://github.com/NousResearch/hermes-agent/issues/87739) | `/hatch` 对无法分割的动画行重试时消耗付费图片请求 | **6** | **成本控制 / petdex UX**：已知不可分割的行仍触发付费图片重试；用户可感知成本痛点。 |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) | 针对未质询未认证请求的服务器（例如 Google Gmail MCP），MCP OAuth 流程从未触发 | **5** | **集成覆盖**：OAuth 以 401 为触发条件被动触发；不主动 401 探测的提供方会静默失败 — Google Gmail/Developer Productivity 已确认。 |
| [#88715](https://github.com/NousResearch/hermes-agent/issues/88715) | 多路复用：profile 身份跨传输、会话、存储、控制路径**延迟绑定** | **5** | **架构综合**：这是将 #67605、#91654、#106005、#65940/41、#102526 联系起来的元 issue — 不存在单一的规范化锚点。 |

**模式：** 评论数排名前 7 的 issue 中有 3 个（#103339、#39609、#67605）的评论读起来像维护者与运维者之间的协商（含具体复现、代码级提案、安全框架）。社区在贡献**经过现场验证的诊断与补丁**，而不仅仅是缺陷报告 —— 这是项目韧性的健康信号。

---

## 5. 缺陷与稳定性 — 今日报告，按严重程度排序

### P1（影响生产）

| Issue | 摘要 | 修复 PR？ |
|---|---|---|
| [#103339](https://github.com/NousResearch/hermes-agent/issues/103339) | 次级写入（`doctor --fix`、`repair_state_db_schema`、hosted_rooms）损坏 live-WAL `state.db`；守卫呈 fail-open；现场 4 天内 7 次损坏 | **部分修复 — v0.21.2 已涵盖**；报告者提出的惰性 `flock` 门控方案仍待结构性落地 |
| [#102120](https://github.com/NousResearch/hermes-agent/issues/102120) | hosted_room_worker 在多 profile 网关同时重启时损坏共享 state.db | **今日关闭**（可能由补丁版或同期修复完成） |
| [#91654](https://github.com/NousResearch/hermes-agent/issues/91654) | 多路复用 profile 间 MCP 会话/熔断器注册表冲突（仅按服务器名作键） | **今日关闭** |
| [#102526](https://github.com/NousResearch/hermes-agent/issues/102526) | 桌面启动后端绑定到其他 profile 的 state.db（`HERMES_HOME` 竞争）— 默认 bot 打开错误的聊天 | **今日关闭** |
| [#107688](https://github.com/NousResearch/hermes-agent/issues/107688) | Dashboard 在启动时无条件可写地打开 `SessionDB`，暴露并发 FTS 重建损坏路径 | **今日关闭**（几乎可以肯定由 v0.21.2 解决） |
| [#107422](https://github.com/NousResearch/hermes-agent/issues/107422) | 多路复用 dashboard 一次性 TERMINAL_* 环境桥接锁存次级 profile 的 Docker 策略 | **今日关闭** |

### P2（重要）

| Issue | 摘要 | 状态 |
|---|---|---|
| [#39609](https://github.com/NousResearch/hermes-agent/issues/39609) | `--initial-status blocked` 约 1 秒后自动晋升至 `ready` — **人工审批门被绕过** | **开放**，尚无 PR — 高影响的信任问题仍未修复 |
| [#67605](https://github.com/NousResearch/hermes-agent/issues/67605) | Dashboard profile 切换呈混合态（MCP/工具/secrets 取自启动 profile） | 开放 |
| [#106005](https://github.com/NousResearch/hermes-agent/issues/106005) | 多路复用下 MCP 未按 profile 作用域 | 今日关闭 |
| [#89412](https://github.com/NousResearch/hermes-agent/issues/89412) | 针对不主动质询的服务器（Gmail/Developer Prev.），MCP OAuth 永不触发 | 开放 |
| [#88715](https://github.com/NousResearch/hermes-agent/issues/88715) | Profile 身份跨所有路径延迟绑定 | 开放 — 结构性 |
| [#107485](https://github.com/NousResearch/hermes-agent/issues/107485) | SSH 隔离的 cron 后端空闲退出杀死了运行中的 cron 并跳过 slot |

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目摘要 — 2026-09-12

**仓库:** [github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)

---

## 1. 今日概览

2026-09-12 当日，仓库在所有跟踪维度上的活跃度都极低。过去 24 小时内没有 issue 被开启、更新或关闭，也没有发布新版本。仅有一个 pull request（[#8076](https://github.com/nearai/ironclaw/pull/8076)）有动态，且仍处于 open 状态，尚未获得任何评审关注（零 reactions，无讨论记录）。整体信号指向一个平静的日子——可能是周末、节假日，或处于发布周期之间的空档——而非维护停滞的迹象，因为现有未完成的工作范围都较窄且较为近期。

---

## 2. 发布动态

过去 24 小时内无新版本发布。发布流水线看起来处于空闲状态，目前无需进行版本化、迁移或文档化操作。

---

## 3. 项目进展

今日没有 pull request 被合并或关闭，因此没有功能被正式合入代码库。唯一活跃的 PR（[#8076](https://github.com/nearai/ironclaw/pull/8076)）—— *fix(assistant): distinguish disconnected shared channels* —— 仍处于评审阶段，尚未落地。

---

## 4. 社区热点话题

没有高互动度的话题值得报告。最近有更新的唯一条目是：

- **[PR #8076 — fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)** — `0` 👍，评论未定义
  *分析:* 尽管公开反应为零，该话题本身具有实际意义。该 PR 表明 IronClaw 的助手正在被优化，以正确区分 (a) 已断开连接的已配对用户共享频道，以及 (b) 从未进行配对的账号。底层诉求：在助手本体、其适配器层以及任何 OpenAI-compatible 接口上，提供更清晰的错误语义和一致的拒绝消息——这是一项典型的开发者体验改进，可减少模糊的机器人回复。

---

## 5. Bug 与稳定性

过去 24 小时内没有新的 bug、崩溃或回归被上报。与稳定性相关的唯一工作仍是仍处 open 状态的 [PR #8076](https://github.com/nearai/ironclaw/pull/8076)，其处理的是对已断开（但此前已配对）共享频道的错误分类——这是一项中低严重程度的 UX 缺陷，而非崩溃或数据丢失类问题。基于现有数据无法产出严重程度排序。

---

## 6. 功能请求与路线图信号

今日未提交新的功能请求。唯一的前瞻性信号包含在 [PR #8076](https://github.com/nearai/ironclaw/pull/8076) 中，其中提及 "update the Slack capabili[t]…" —— 表明 Slack 能力扩展与该 bug 修复捆绑在一起，可能在该 PR 合入后一同发布。仅凭一个无发布提交记录的 open PR，无法对下一版本做任何预测。

---

## 7. 用户反馈汇总

过去 24 小时内未捕获到用户提交的 issue 或反应，因此没有新的定性反馈可汇总。[PR #8076](https://github.com/nearai/ironclaw/pull/8076) 缺少点赞或点踩，可能意味着维护者尚未对其进行公开分流。

---

## 8. 待办观察

- **[PR #8076 — fix(assistant): distinguish disconnected shared channels](https://github.com/nearai/ironclaw/pull/8076)**
  *状态:* 自 2026-09-06 起 open，最近更新于 2026-09-11（距本摘要约 1 天）。无评审评论，无 reactions。
  *建议:* 建议维护者关注。该改动涉及助手核心、适配器层以及 OpenAI-compatible 接口，组合起来属于一项跨切面的修复，值得及时评审以避免合并冲突。

今日未浮现长期搁置的 issue，但本期窗口内整体 issue 待办列表未刷新，因此基于所提供的数据切片无法评估此前未解决的条目。

---

*摘要基于 24 小时 GitHub 活跃窗口生成；数据仅反映过去一天内的更新情况，而非仓库的累计状态。*

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目简报 — 2026-09-12

## 1. 今日概览

QwenPaw 展现出 **高开发节奏**：过去 24 小时内共有 62 条可追踪更新（21 个 issue、41 个 PR），并稳定发布了 **v2.2.1**。项目正处于 v2.2.0 多租户 Hub 公告发布后的活跃稳定阶段，团队同时在推进功能新增（per-agent 模型路由、主动记忆升级）以及对社区反馈的 2.2.x 版本回归问题进行快速修复。社区参与度健康——关于 Hub 路线图的头部讨论（#7318）已有 26 条评论和 4 次反应，同时首次贡献者正在工具、提供商和 Telegram 集成等方向提交他们的首个 PR。综合来看，这表明项目具有 **成熟的发布节奏**，拥有一条健康的首次贡献者通道，并存在若干需要持续分诊的显著回归问题。

## 2. 版本发布

### v2.2.1（稳定版）— 发布于 2026-09-11
发布验证已确认关闭（[Issue #7692](https://github.com/agentscope-ai/QwenPaw/issues/7692)）。

**亮点**
- **Per-agent 模型路由**（[#7501](https://github.com/agentscope-ai/QwenPaw/pull/7501)）：每个 Agent 现在都可以独立声明其自身的提供商偏好与回退链，与全局默认值解耦。
- **主动记忆审查（Auto Fin）**：新增面向长期记忆的自动审查流程。
- **ReMe 升级**：记忆子系统刷新，召回率与稳定性提升。

**迁移说明**
- Per-agent 提供商配置优先级高于全局提供商设置——既有单 Agent 部署应继续正常工作，但多 Agent 用户应审查模型分配。
- 发布说明摘录中没有记录到破坏性 API 变更；beta.2 → stable 的改动以 bug 修复为主。

## 3. 项目进展

**已合并/关闭的 PR（过去 24h）** — 共关闭 18 个，关键项如下：

| PR | 领域 | 影响 |
|---|---|---|
| [#6960](https://github.com/agentscope-ai/QwenPaw/pull/6960) | PawPort 导入流程 | 重大可移植性突破——首次实现从 Codex 与 Qoder 向 QwenPaw 的一键迁移（指令、设置、技能、插件、工程、最近工作） |
| [#7652](https://github.com/agentscope-ai/QwenPaw/pull/7652) | Models | 修复上下文过早压缩：当模型上报 `32768` 时，恢复提供商解析出的真实上下文窗口 |
| [#7688](https://github.com/agentscope-ai/QwenPaw/pull/7688) | Console UX | 用按页"加载更多"分页替换"全部折叠"，并在选择时保留滚动位置 |
| [#7677](https://github.com/agentscope-ai/QwenPaw/pull/7677) | API | 对非有限（non-finite）的校验输入返回结构化的 422 响应，替代原先的 500 |
| [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) | Telegram | Markdown 表格现在以 `<pre>` 块渲染，而非原始管道符（修复 #7585） |
| [#6994](https://github.com/agentscope-ai/QwenPaw/pull/6994) | Release notes | 回填 v2.1.0 发布说明 |
| [#7674](https://github.com/agentscope-ai/QwenPaw/issues/7674)、[#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) | 发布值班 | Beta-2 与 stable v2.2.1 验证均已关闭 |

**PawPort 合入是今日战略上最重要的 PR**——它把跨工具的 Agent 可移植性正式确立为一条产品面。

## 4. 社区热点

| 话题 | 讨论帖 | 互动量 |
|---|---|---|
| **QwenPaw Hub 路线图** | [Issue #7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) | 26 条评论，4 👍 |
| **移动端 Web UX 优化** | [Issue #7177](https://github.com/agentscope-ai/QwenPaw/issues/7177) | 10 条评论（已关闭） |
| **Spawn 子 Agent 故障集群** | [Issue #7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) + [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) + [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) | 3+3+3 条评论 |

**底层需求：**
- **#7318 — 多租户治理**：团队希望拥有共享工作区、由管理员管理的技能以及 RBAC。维护者已开启讨论帖以梳理 v2.2.0+ Hub 的功能范围；预计很快会推出具体 RFC。已关联的 PR [#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)（本地管理员引导）表明相关工作已经在进行中。
- **#7177 — 移动端人体工学**：手机上的 Web 控制台需要将运行/停止开关放在顶部（而非深埋），并把提交按钮与换行键分开——这也是 [#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707) 中反复出现的主题。
- **子 Agent 模型选择**：三条趋同的讨论（#4901、#6302 父帖、#7676 回归）表明 **按任务分配模型是高优先级功能**但尚未完整接入——`subagent_model` 字段虽然存在却被忽略，这已在 2.2.1-beta.1/2 中被确认为 bug。

## 5. Bug 与稳定性

过去 24h 内按严重程度排序的 Bug：

| 严重度 | Issue | 现象 | 修复进展 |
|---|---|---|---|
| 🔴 **高** | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | 停止按钮移除了 UI 指示，但任务仍在运行；重新提交后报 409。**执行控制完整性问题。** | 尚无 |
| 🔴 **高** | [#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678) | 2.2.0 中 `spawn_subagent` 100% 超时失败；延长超时也无效 | 尚无 |
| 🔴 **高** | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | 2.2.1 桌面端配置好的模型会在会话中途静默消失，用户必须重新选择 | 尚无 |
| 🟠 中 | [#7689](https://github.com/agentscope-ai/QwenPaw/issues/7689) | 在 OpenAI 兼容的 `/chat/completions` 上，PDF 块仍被序列化为 `{"type":"file"}` 传给多模态模型；#7621 只补了非多模态路径 | 尚无 |
| 🟠 中 | [#7687](https://github.com/agentscope-ai/QwenPaw/issues/7687) | 2.2.1-beta.2 中切换 Agent 会把消息静默路由到新会话——已作为已解决关闭，但仍建议持续观察 | 很可能已在 v2.2.1 修复 |
| 🟠 中 | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | v2.2.1 中定时任务输出被并入步骤/思考块，或彻底消失 | 尚无 |
| 🟠 中 | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | 2.2.1-beta.1/2 中 `subagent_model` 配置被静默忽略；子 Agent 始终继承父模型 | 尚无——已关联 #4901 |
| 🟠 中 | [#7705](https://github.com/agentscope-ai/QwenPaw/issues/7705) | 新建任务时默认 Agent 工作目录设置被忽略，旧路径仍然生效 | 尚无 |
| 🟢 低 | [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) | "幽灵会话"——索引/文件不匹配 | 已作为无效关闭 |

**模式观察**：v2.2.1 引入了比典型发布更多的高严重度稳定性回归，尤其集中在执行生命周期控制（停止、工作目录、模型持久化）以及子 Agent 栈上。发布验证 PR（#7674、#7692）已干净关闭，说明这些问题很可能是在更广泛的社区测试中浮出的，并未阻塞发布。

## 6. 功能请求与路线图信号

**大概率进入 v2.2.2（下个补丁版，鉴于已有活跃 PR）：**
- **Serply 作为第三个 `web_search` 提供商**——[issue #7711](https://github.com/agentscope-ai/QwenPaw/issues/7711) 与 [PR #7712](https://github.com/agentscope-ai/QwenPaw/pull/7712) 已经成对出现（googio）。
- **Telegram Rich Messages 支持 Markdown 表格**（[#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713)）——以原生富文本渲染取代 #7590 的 `<pre>` 方案。
- **Bot-manager 统一插件**（[#7702](https://github.com/agentscope-ai/QwenPaw/pull/7702)）——为微信/钉钉/多渠道绑定提供统一控制台。

**大概率进入 v2.3.0（Hub 发布列车）：**
- **Hub 本地管理员引导**（[#7696](https://github.com/agentscope-ai/QwenPaw/pull/7696)）——首个具体的 Hub 功能。
- **控制台历史分组：跨 Agent 与主动消息**（[#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710)）——Hub "per-agent inbox" UX 的前置条件。
- **子 Agent 按任务模型分派**（[#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)）——长期搁置需求，#7676 一旦修复即可解锁。

**来自社区的强信号：**
- **循环上下文压缩命令（`/compact`）**（[#7679](https://github.com/agentscope-ai/QwenPaw/issues/7679)）——在意 token 成本的资深用户希望为长任务运行提供显式的压缩触发点。
- **可定制的默认 Loop 模式**（[#7714](https://github.com/agentscope-ai/QwenPaw/issues/7714)）——把"默认"重命名为"标准"，允许任一模板作为默认。
- **控制台布局：文档预览置右**（[#7700](https://github.com/agentscope-ai/QwenPaw/issues/7700)）——与 PR #7704（聊天文件抽屉移到右侧）配套。
- **Atlas Cloud 提供商**（[#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499)）——首次贡献者提交，自 7 月起等待评审；大概率很快合入。
- **可视化压缩改进**（[#7703](https://github.com/agentscope-ai/QwenPaw/pull/7703)）——与 `/compact` 请求协同演进。

## 7. 用户反馈摘要

**痛点（真实且反复出现）：**
- **停止按钮"说谎"**（[#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)）：用户不敢轻易点击停止，因为前端指示变化无法反映后端真实状态——引发对 token 浪费与重新提交竞态的焦虑。
- **2.2.0 中子 Agent 已坏**（[#7678](https://github.com/agentscope-ai/QwenPaw/issues/7678)）："没有一个执行的下去"——零成功运行，阻塞了一项重要的对外宣传能力。
- **模型配置静默重置**（[#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)）：用户必须重启应用才能恢复，侵蚀了桌面端的信任度。
- **长 Loop 会话 token 暴涨**（[#7679](https://github.com/agentscope-ai/QwenPaw/issues/7679)）：资深用户每次提交都重新发送完整长上下文，token 消耗巨大。
- **移动端（Android）输入 UX**（[#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707)）：聊天输入框无法插入换行——每次按 Enter 都会提交。
- **幽灵会话**（[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698)）：索引/文件错位导致用户感知到数据丢失。

**满意度信号：**
- v2.2.1 的移动端 Web 被评价为"已经比较好了"（[#7707](https://github.com/agentscope-ai/QwenPaw/issues/7707)）——整体积极，附带一个具体摩擦点。
- 首次贡献者活跃度高（今日 5+ 个首次 PR 待处理：#7712、#7713、#7592、#6499、#6776），表明贡献流程对新人友好。
- Hub 的方向由社区主动推动，而非仅由维护者单向输出——[#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) 是一场双向对话。

## 8. 待办观察

需要维护者关注的事项（高影响力、近期活跃度低）：

| 事项 | 开放天数 | 重要性 |
|---|---|---|
| [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) **spawn_subagent 按任务模型** | ~100 天 | 子 Agent 增强投票第一；#7676 已确认这不只是缺失而是确实坏掉 |
| [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) **Atlas Cloud 提供商** | ~47 天 | 首次贡献者 PR，完成度高且范围合理，仅需评审 |
| [#6776](https://github.com/agentscope-ai/QwenPaw/pull/6776) **Playwright 自愈** | ~36 天 | 修复浏览器后端"死一次就永远死"的问题；已标记 ready-for-human-review |
| [#7318](https://github.com/agentscope-ai/QwenPaw/issues/7318) **Hub 路线图 RFC** | ~17 天 | 讨论活跃但尚未定案；建议转化为带行动项的 issue，或以总结形式关闭 |

**风险提示**：2.2.1 中未修复的高严重度回归集群（#7567、#7678、#7708），加上悬而未决的 [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) / [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) 子 Agent 模型缺口，提示 2.2.x 线需要在团队全力投入 Hub（2.3.0）工作之前，尽快出一个 v2.2.2 补丁。

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-12

## 1. 今日概览

ZeroClaw 在过去 24 小时内有 50 个 issue 和 50 个 PR 被触动，开/关比例在两侧都约为 3.5:1 —— 这表明存在大量并发进行中的工作，而不是一个收尾日。没有发布新版本，符合当前以落地堆叠式安全工作（RFC #7141 / #8289 OIDC 轨道）以及解决一批 provider/缓存前缀回归为目标的开发阶段。最热门的开放讨论是维护者决策队列（#8692），最活跃的工程工作集中在 Anthropic 缓存失效、Windows 栈溢出以及多阶段 OIDC principal 重构上。项目健康度：**活跃且稳定**，有多个 p1/p2 issue 需要在堆叠的 PR 链上进行协同修复。

## 2. 版本发布

过去 24 小时内没有新版本发布。issue 中最后提及的生产版本为 **v0.8.5**，针对该版本已知至少有三处回归（缓存前缀重写、失效的配置键、`service logs` 输出为空）。

## 3. 项目进展

今天有 3 个 PR 被合并/关闭，以及若干 tracker/失效配置类 issue 在没有代码改动的情况下被关闭：

- **[#10786 — CLOSED]** `anthropic: dropping previous-turn thinking blocks rewrites cached history at every turn boundary` —— 确认了 #10778 / #10777 缓存抖动的机制。关闭很可能只是作为追踪引用，而非代码修复。
- **[#10676 — OPEN→likely merged]** `fix(ci): compare publish exceptions as paths` —— Audacity88。跨平台 CI 修复（Windows/Unix），针对 publish-contract 异常匹配器；新增 Windows 回归测试。规模 XS。
- **[#10790 — OPEN]** `chore(assets): optimize PR-evidence images via ImgBot lossless compression` —— 仓库清理；涉及 `.pr-evidence/` 下 5 个 PNG。
- 已关闭的非代码项：**#9047**（ZeroCode 会话/内存隔离澄清）、**#10690**（Integrations "Configure" slugification bug）、**#10532**（降级配置调起错误二进制）、**#9092**（ZeroCode 按键延迟）、**#10786**（Anthropic thinking-block 缓存重写 —— 单独追踪）。

取得实质性推进的工程：**#10732**（`service logs` 在 macOS/Windows/OpenRC 上按内容选择守护进程日志）、**#10640**（Telegram 群组的被动上下文），以及整个 **#8289 第 3–6 阶段 PR 栈**（principal 归属、会话所有权、私有内存、browserless OIDC、网关鉴权、Nevis/iam_policy 退役）保持开放但持续活跃。

## 4. 社区热点话题

评论分布偏向治理与流程讨论，而非功能争论：

| 排名 | 条目 | 评论数 | 热门原因 |
|---|---|---|---|
| 1 | [#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692) — 维护者决策队列（RFC/设计） | 15 | 是接受/驳回进行中 RFC 和设计追踪的瓶颈；明确请求维护者/代码负责人关注。 |
| 2 | [#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549) — RFC：取消强制的 RFC 讨论窗口 | 9 | 一项元流程提案，如获通过将加速 #8692 的输入管线。 |
| 3 | [#5514](https://github.com/zeroclaw-labs/zeroclaw/issues/5514) — 批量处理 Telegram 媒体组 | 8 | 长期存在的体验痛点（多张图片 → 多个 LLM 轮次）。状态已移至 `in-progress`。 |
| 4 | [#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734) — Windows 上 `RpcDispatcher::process_line` 2 MB 栈溢出 | 6 | CI 稳定性问题；在 `Advisory Windows nextest` 上出现。 |
| 5 | [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) — OIDC 里程碑追踪 | 3 | 是本窗口内整个 8 个 PR 安全栈的锚点。 |

**底层诉求：** 社区在表达三点信号：(a) 治理吞吐是合并大型架构工作的限制因素，(b) Telegram 多模态批处理是被频繁请求的体验修复，(c) Windows CI 表现足够脆弱，需要显式的守护测试。

## 5. 缺陷与稳定性

按严重程度（S1 → S3）排序，并标注是否存在修复 PR：

**S1 / S2 — p1 优先级，行为阻塞或降级**

- **[#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)** — 失败的 Code/ACP 轮次会丢弃持久历史中已接受的 prompt + 已完成的工具交互。*暂无关联修复 PR。*
- **[#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785)** — `zerocode` 通知延迟会取消每一个正在运行的轮次（begin_notification_resync → session/cancel）。*暂无关联修复 PR。*
- **[#10782](https://github.com/zeroclaw-labs/zeroclaw/issues/10782)** — 频道回复意图预检丢弃 LLM 用量；分类器成本从未被记录。*暂无关联修复 PR。*
- **[#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780)** — Token 预算上下文压缩被移除；`keep_recent`/`collapse_tool_results` 失效。*修复预期跟随 #10781。*
- **[#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778)** — 多模态图像上限驱逐会重写更早的历史消息，从该点起使缓存前缀失效。*机制已识别；关联到 #10701；尚无修复 PR。*
- **[#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777)** — `thinking/effort` 请求配置在轮次间来回翻转，并重写缓存的历史片段。*暂无关联修复 PR。*
- **[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)** — `RpcDispatcher::process_line` 在 Windows 上仅运行在其 2 MB 栈守护的 2%。*修复由 #10753（已关闭）和 #10676（CI）隐含提供。*
- **[#10759](https://github.com/zeroclaw-labs/zeroclaw/issues/10759)** — SOP `run-detail` RPC 遗漏了保留的 `failure_reason`。*关联到 PR #9930。*
- **[#10754](https://github.com/zeroclaw-labs/zeroclaw/issues/10754)** — 在分类偏好时，内存作者身份与传输被混淆（`TurnOrigin::user_authored`）。*暂无关联修复 PR。*

**S2/S3 — p2 优先级**

- **[#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)** — 单候选流恢复忽略 `provider_retries`；529 错误仅做一次即时重试且无退避。*暂无关联修复 PR。*
- **[#10757](https://github.com/zeroclaw-labs/zeroclaw/issues/10757)** — `agent-browser` 可用性探测超时与缺少 CLI 的错误无法区分。*暂无关联修复 PR。*
- **[#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)** — 预输出流失败跳过宣称的非流式回退。*状态：进行中。*
- **[#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)** — OpenCode `FreeUsageLimitError`（429）以亚秒级退避重试而非快速失败。*暂无关联修复 PR。*
- **[#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701)** — 图像附件使完整历史缓存前缀失效，而不仅是新消息。*机制现已归并到 #10778。*

**已关闭缺陷（过去 24 小时）：** #5514（进行中，尚未合并修复）、#10753（Windows 栈溢出，已修复）、#10690（Integrations slugification）、#10532（降级配置错误二进制）、#10609（zerocode 启动目录，S1）、#10115（工具结果截断不可见）、#9092（ZeroCode 按键延迟）。

**模式：** 明显的 Anthropic provider 缓存重写集群（#10777、#10778、#10786、#10701）需要单一根因修复，而上下文压缩移除（#10780/#10781）是影响最大的用户面回归。

## 6. 功能请求与路线图信号

- **[#8289 OIDC 里程碑](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)** — *正在积极交付。* 第 2–6 阶段由开放的 PR 栈代表（#10248、#10255、#10259、#10263、#10265、#10268、#10270、#10274、#10275、#10321）。该栈合并后高置信度会在下一版本落地。
- **[#9809 — support multiple models per provider profile](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)** — 新增 `[providers.models.<family>.<alias>.models.<model_alias>]`。规模 XL，需要作者行动。可能是下一版本的候选。
- **[#10640 — passive Telegram group context](https://github.com/zeroclaw-labs/zeroclaw/pull/10640)** — 可选的 `passive_group_context`，默认 `false`。与 #5514（媒体批处理）天然搭配。可能是下一小版本。
- **[#9109 — native Hailo-Ollama support](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** — 可选的类型化 provider。标记为 `do-not-merge`，因此很可能会推迟。
- **[#9713 — token accounting on history-trim events](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** — 解决 #9619；暴露 `tokens_before`/`tokens_after`。标记为 `do-not-merge` 且 `blocked`。
- **[#9967 — harness evaluation framework](https://github.com/zeroclaw-labs/zeroclaw/issues/9967)** — 路线图追踪；基准钉版本 + 每轮插桩。战略性，长期视角。
- **[#10781 — remove or implement inert config keys](https://github.com/zeroclaw-labs/zeroclaw/issues/10781)** — `context_compression.*`、`history_pruning.keep_recent`、`collapse_tool_results`、`keep_tool_context_turns`。二选一的清理；预计在下一版本。
- **[#10780 — restore proactive token-budget compaction](https://github.com/zeroclaw-labs/zeroclaw/issues/10780)** — 影响最大的缺失功能；如被接受，几乎必然进入下一版本。
- **[#10214 — entry-count rotation + multi-segment log queries](https://github.com/zeroclaw-labs/zeroclaw/pull/10214)** — 新增 `log_persistence_max_entries_per_segment` 配置。规模 XL，需要作者行动。

**下一小版本预测（很可能是 v0.8.6 或 v0.9.0）：** OIDC 栈落地、Telegram 群组被动上下文、Telegram 媒体批处理（#5514）、`service logs` 跨平台修复（#10732）、失效配置清理（#10781），以及部分 Anthropic 缓存前缀修复。

## 7. 用户反馈摘要

- **Telegram 用户**是最响亮的群体：媒体组批处理（#5514，8 条评论）是反复出现的痛点，#10640 的群组被动上下文正是对这一反馈的直接回应。
- **长会话 ACP/ZeroCode 用户**正遭遇延迟墙：#9092（按键延迟）、#10785（通知延迟导致批量取消）、#10788（失败时历史丢失）。表明渲染器和轮次取消路径需要分别处理。
- **Provider/缓存前缀的痛苦**主导了工程讨论：#10701、#10777、#10778、#10786 全部描述了对 Anthropic 用户的真实成本/配额影响。同一个根因被反复提报这一事实表明用户侧的 workaround 不足。
- **失效的配置键**（#10780/#10781）引发用户挫败感，因为用户合理地预期文档化的配置会生效。这既是文档信任问题，也是代码问题。
- **Windows 支持**参差不齐：栈溢出（#10734/#10753）、`service logs` 输出为空（#10731/#10732）以及 publish-exception 路径不一致（#10676）都在同一 48 小时窗口内集中暴露。
- **正面信号：** OIDC 栈（#8289）显示由单一主要贡献者（`JordanTheJet`）持续、多 PR 推进，并伴随明确的设计批准，表明强劲的架构动能。

## 8. 待办关注清单

需要维护者明确关注的项目 —— 无论是陈旧、被阻塞，还是存在风险但缺少明确负责人：

- **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 维护者决策队列本身。在处理完之前，下游 RFC（#10549）和设计接受会被搁置。**负责人：全体维护者。**
- **[#10549](https://github.com/zeroclaw-labs/zeroclaw/issues/10549)** — RFC 投票简化。需要 `needs-maintainer-review` 处置。
- **[#9109](https://github.com/zeroclaw-labs/zeroclaw/pull/9109)** — Hailo-Ollama，标记为 `do-not-merge`，自 2026-07-17 起开放（约 2 个月）。需要合并/推迟决策。
- **[#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** — trim 事件上的 token 记账，`blocked` + `do-not-merge` 自 2026-08-03 起。等待解锁。
- **[#9635](https://github.com/zeroclaw-labs/zeroclaw/pull/9635)** — `fix(config): resolve git subcommand past global options` —— `needs-author-action`，风险高，安全：策略，自 2026-08-01 起。
- **[#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)** — `fix(tools): honor allowed roots for git operations` —— `needs-author-action`，风险高，安全：策略。
- **[#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736)** — 预输出流失败跳过回退，`in-progress` 但无关联 PR。
- **[#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787)** — 529 上 `provider_retries` 被忽略，今天刚开，但是 #10736 的实际对应项。
- **[#9521](https://github.com/zeroclaw-labs/zeroclaw/issues/9521)** — 将 MCP `image` 内容映射到视觉管线，`blocked` 自 2026-07-28 起。
- **[#10754](https://github.com/zeroclaw-labs/zeroclaw/issues/10754)** — 内存作者身份/传输分类，`needs-maintainer-review`，安全相关，昨日开单。
- **[#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777)** / **[#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778)** — Anthropic 缓存前缀失效集群，`needs-maintainer-review`。开放集中用户成本影响最高。
- **[#10214](https://github.com/zeroclaw-labs/zeroclaw/pull/10214)** — 日志轮转，`needs-author-action`，自 2026-08-21 起开放。
- **[#9809](https://github.com/zeroclaw-labs/zeroclaw/pull/9809)** — 多模型 provider profile，`needs-author-action`，规模 XL，自 2026-08-07 起开放。
- **[#9746](https://github.com/zeroclaw-labs/zeroclaw/pull/9746)** — 会话工具 + `discord_search` 的每 agent 所有权作用域，`needs-maintainer-review`，安全领域，自 2026-08-04 起开放。

**共同主线：** 安全/认证轨道健康且在推进；Anthropic 缓存前缀集群和上下文压缩回归是下一版本最需要维护者果断介入以避免 0.8.5 → 0.8.6 抖动模式的两个领域。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*