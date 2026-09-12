# OpenClaw 生态日报 2026-09-12

> Issues: 500 | PRs: 500 | 覆盖项目: 5 个 | 生成时间: 2026-09-12 11:30 UTC

- [OpenClaw](https://github.com/openclaw/openclaw)
- [Hermes Agent](https://github.com/nousresearch/hermes-agent)
- [IronClaw](https://github.com/nearai/ironclaw)
- [QwenPaw](https://github.com/agentscope-ai/QwenPaw)
- [ZeroClaw](https://github.com/zeroclaw-labs/zeroclaw)

---

## OpenClaw 项目深度报告

# OpenClaw 项目简报 — 2026-09-12

## 1. 今日概览

OpenClaw 在过去 24 小时内呈现出**高频分诊活动**，共触及 500 个 issue 和 500 个 PR，其中开启（267 个 issue / 290 个 PR）与关闭（233 个 issue / 210 个 PR）几乎各占一半。尽管没有新版本发布，项目仍处于围绕 2026.9.x 系列的**活跃热修复窗口**：一批 P0 回归与迁移阻塞类 issue（尤其是 #142585、#144742、#145192、#142770）贡献了今日大部分动态，同时涌现出一批中小型、目标明确的 PR，处理更新预算、模型目录刷新以及 Doctor 恢复流程。整体健康度可概括为**稳定但承压**：维护者正在快速关闭升级路径上的缺陷，但仍有多个“发布阻塞”issue 处于开启状态，且尚未出现打上标签的正式版本，这提醒我们在这些问题解决之前应谨慎发布。

## 2. 版本发布

**过去 24 小时内没有新版本发布。** issue 流中引用的最新已发布版本是 `2026.9.3 (1391f7c)` 和 `2026.9.4 (15285e57a4f)`，但多个 P0 阻塞问题表明 `2026.9.4` 发布时并不完整（参见 #144742 —— 缺少 #144208 的修复）。`2026.9.5`（或热修复版）很可能正在等待维护者审核后发布。

## 3. 项目进展

已关闭/已合并的 PR 及其推进的 issue：

- **#145810**（已关闭）—— *fix(logging)：保留固定的脱敏规则与公共 URL 边界*。恢复了 #145553 之后丢失的表单请求体与 Digest 凭据保护；评级 🦞 钻石龙虾，P1。重要的安全/隐私回归修复。
- **#145872**（已关闭）—— *fix(config)：将不可用的运行时值报告为未设置*。修复 `openclaw config get` 对未设置键返回 `null`/退出码 0 的问题（正确性上的小修）。
- **#145809**（已关闭）—— *fix：已取消的 steering 消息仍会送达进行中的运行*。关闭 #145727 —— 修复 steer 模式下 `chat.send` 在 `chat.abort` 之后仍投递输入的问题。
- **#145807**（已关闭）—— *fix(openai)：修正面向公开版 GPT-Live 的语音更新指引*。使 Live 语音后端更新与公开 API 的语音标记保持一致。
- **#145349**（已关闭）—— *fix(update)：版本匹配时保留现有产物（no-op）*。当已安装的 semver 与所选版本一致时，不再进行不必要的重新构建（🦞 钻石龙虾，P2）。
- **#145427**（已关闭）—— *fix(macos)：将调试操作保持在所选 Gateway 路由上*。防止 Mac SSH 调试重置期间，过时任务中断较新的 Gateway 路由。
- **#145783**（已关闭）—— *fix(cron)：计划账号不可用时报告失败的运行*。关联 #145689 —— 让静默的 cron 失败暴露出来。
- **#140620**（已关闭）—— 升级会话对账停滞（P0，🦪 银贝）已关闭，但未关联修复 PR —— 数据中看不到解决路径。
- **#145266**（已关闭）—— Git/dev Doctor Codex 刷新会遮蔽重建的内置插件；已关闭（P1，🐚 铂金寄居蟹）。
- **#144712**（已关闭）—— `npm update` 全局安装切换失败；回滚报告“recovery unverified”（P0，🦞 钻石龙虾）。

## 4. 社区热门话题

评论最多的条目集中在**升级痛点与迁移工具**上：

1. **#142585** — *[回归] 2026.9.3 Doctor 拒绝合法的旧版工作区配置与 attestation 导入* — 17 条评论。P0，🦐 金虾，`impact:ux-release-blocker`。[openclaw/openclaw#142585](https://github.com/openclaw/openclaw/issues/142585)
2. **#97616** — *OpenClaw 泄漏未回收的 hook/tool 子进程（僵尸进程不断累积）* — 15 条评论。P1，🦪 银贝。[openclaw/openclaw#97616](https://github.com/openclaw/openclaw/issues/97616)
3. **#96834** — *WhatsApp 1:1 入站图片使主通道卡死约 3 分钟* — 15 条评论。P1，🦪 银贝。[openclaw/openclaw#96834](https://github.com/openclaw/openclaw/issues/96834)
4. **#140620** — *原地升级 2026.7.1-2 → 2026.9.2：会话 transcript 对账卡住* — 12 条评论。[openclaw/openclaw#140620](https://github.com/openclaw/openclaw/issues/140620)
5. **#144712** — *`npm update` 在“global install swap”阶段失败；回滚报告“recovery unverified”* — 12 条评论。[openclaw/openclaw#144712](https://github.com/openclaw/openclaw/issues/144712)
6. **#127148** — *Codex `sessions.compact` 获取第二个 app-server，触发活动写入者冲突* — 12 条评论。🦞 钻石龙虾。[openclaw/openclaw#127148](https://github.com/openclaw/openclaw/issues/127148)
7. **#141252** — *2026.9.2 回归：“Reply operation has no active tool authority snapshot”* — 11 条评论。[openclaw/openclaw#141252](https://github.com/openclaw/openclaw/issues/141252)
8. **#139847** — *回复运行期间发送的消息被丢弃*（#141252 的伴生问题）— 10 条评论。[openclaw/openclaw#139847](https://github.com/openclaw/openclaw/issues/139847)
9. **#96007** — *Discord：内联错误文本之后的消息内容被截断* — 10 条评论。[openclaw/openclaw#96007](https://github.com/openclaw/openclaw/issues/96007)
10. **#136203** — *Windows de-DE 2026.8.2 升级导致 Doctor 维护被阻塞* — 10 条评论。[openclaw/openclaw#136203](https://github.com/openclaw/openclaw/issues/136203)

**深层需求：** 用户呼吁**可信、非破坏性的升级**。反复出现的抱怨模式是“升级部分成功，随后 Doctor 阻塞恢复，回滚声称成功却报告未经验证的状态”。这表明升级/Doctor 工具链需要为“部分成功”定义更明确的契约。

## 5. 缺陷与稳定性

按严重程度排列（P0 发布阻塞优先）：

### P0 — 发布阻塞问题（多数尚无已发布的修复）
| Issue | 标题 | 评级 | 修复 PR？ |
|---|---|---|---|
| [#142585](https://github.com/openclaw/openclaw/issues/142585) | Doctor 拒绝合法的旧版工作区与 attestation 导入（2026.9.3） | 🦐 金虾 | ❌ `clawsweeper:needs-info` |
| [#144742](https://github.com/openclaw/openclaw/issues/144742) | 2026.9.4 未包含 #144208 —— v1 handoff lease 阻塞所有配置写入 | 🦪 银贝 | ❌ 已被引用但尚未合并 |
| [#145192](https://github.com/openclaw/openclaw/issues/145192) | 2026.9.2 → 2026.9.4 托管更新在候选 Doctor 阶段因活跃的 v1 handoff lease 而失败 | 🦪 银贝 | ❌ |
| [#142770](https://github.com/openclaw/openclaw/issues/142770) | 2026.9.3 更新失败后回滚到 9.2，仍残留前向迁移的 Workshop 状态 | 🦞 钻石龙虾 | ❌ |
| [#136203](https://github.com/openclaw/openclaw/issues/136203) | Windows de-DE 2026.8.2 升级导致 Doctor 被阻塞 | 🦞 钻石龙虾 | ❌ |
| [#112475](https://github.com/openclaw/openclaw/issues/112475) | 设备移除后配对恢复失败（Gateway 7.1 / CLI 6.9） | 🦪 银贝 | ❌ |
| [#125333](https://github.com/openclaw/openclaw/issues/125333) | 2026.8.1-beta.2 上 `totalTokens` 虚增 —— #123065 修复不完整 | 🦞 钻石龙虾 | ⚠️ `linked-pr-open` |
| [#123326](https://github.com/openclaw/openclaw/issues/123326) | 显式多智能体 Codex 迁移导致 Gateway 启动陷入崩溃循环 | 🦞 钻石龙虾 | ❌ |

### P1 — 高严重性
- [#141252](https://github.com/openclaw/openclaw/issues/141252) 与 [#139847](https://github.com/openclaw/openclaw/issues/139847) —— “Reply operation has no active tool authority snapshot” 回归（🦞 钻石龙虾）—— **没有修复 PR**。
- [#142476](https://github.com/openclaw/openclaw/issues/142476) —— 在 632 智能体的 Gateway 上，cron 会话回收器阻塞事件循环 14–76 秒（🦞 钻石龙虾）。
- [#144911](https://github.com/openclaw/openclaw/issues/144911) —— MCP 服务器初始化超时，子进程清理中的未处理 rejection 导致 Gateway 崩溃（🦞 钻石龙虾）。
- [#138139](https://github.com/openclaw/openclaw/issues/138139) —— `providerConfigMatchesRuntimeSnapshot` 的递归哈希在大型模型目录下导致事件循环饥饿（🦞 钻石龙虾）。
- [#127148](https://github.com/openclaw/openclaw/issues/127148) —— Codex `sessions.compact` 获取第二个 app-server，产生活动写入者冲突（🦞 钻石龙虾）。
- [#126246](https://github.com/openclaw/openclaw/issues/126246) —— Telegram 持久化出站消息卡在 `send_attempt_started`，重启后丢失（🦞 钻石龙虾）。
- [#140455](https://github.com/openclaw/openclaw/issues/140455) —— google-meet 2026.9.2：通话中 circular-JSON 崩溃 + 音频路由问题（🦞 钻石龙虾）。
- [#94716](https://github.com/openclaw/openclaw/issues/94716) —— `claude-cli` provider 发送过期的 user-agent，导致 OAuth bearer 认证失败（🦞 钻石龙虾，`linked-pr-open`）。
- [#137377](https://github.com/openclaw/openclaw/issues/137377) —— Windows Doctor `--fix` 最终重启失败（已关闭；疑似已绕过）。

### 崩溃循环与数据完整性
- [#140908](https://github.com/openclaw/openclaw/issues/140908) —— 在 systemd `--user` 服务账户下，Doctor `--fix`/`gateway status --deep` 以 EACCES 失败 —— 已关闭（🐚 铂金寄居蟹）。
- [#72948](https://github.com/openclaw/openclaw/issues/72948) —— `gateway stop` 无法终止前台启动的 gateway —— 已关闭。
- [#123326](https://github.com/openclaw/openclaw/issues/123326) 与 [#142770](https://github.com/openclaw/openclaw/issues/142770) 仍**未修复**，且为 P0。

**评估：** 今日 P0/P1 积压中相当一部分属于**修复思路清晰**（根因明确）但**没有开启中的修复 PR** 的情况。瓶颈在于维护者的精力，而非问题诊断。

## 6. 功能请求与路线图信号

- **#9016** —— *将 OpenRouter 用量成本暴露给 agent 运行时*（8 👍；已关闭且未合并）。强烈信号表明运营者希望按消息的成本归因对 agent 本身可见；后续很可能会被重新提交。
- **#77798** —— *通过 Canvas 嵌入实现协作式 Markdown 编辑器*（2 👍；已关闭）。UX 类功能；属于边缘需求池（tidepool），但热度渐涨。
- **#126876** —— *无障碍审计：13 项屏幕阅读器障碍*（已关闭，待维护者评审）。一位盲人用户首次提交了具体的安装阻塞问题 —— 很可能推动近期的一次无障碍专项改进。
- **#131457** —— *飞书进度流式模式*（P3）。使飞书与 Slack/Discord/Telegram 的流式能力对齐；实现成本低，很可能进入下个小版本。
- **#59109** —— *会话分叉、恢复、继续*（与 open-agent-sdk 对齐）。一项元能力请求，自四月以来一直处于开启状态。
- **#8724** —— *按模型的生成超时配置*。可缓解 Gemini Flash 无限思考循环；反复出现的 P3 诉求，很可能随模型目录刷新一同发布。
- **#8285** —— *在 agent 处理前自动发送意图/确认文本*。延迟体验上的收益；长期悬置的需求池诉求。
- **#7476** —— *WhatsApp 贴纸发送支持*。渠道对齐；功能不大但很显眼。
- **#145562** —— *原生 Gemini `systemInstruction` 缺少 available_skills，但报告声称已包含*。严格来说是 bug，但更像是 Gemini 原生与 Anthropic 原生 agent 管线之间的“功能差距”。

**下个版本预测：** 下一个标签版本将优先保障**升级路径的完整性**（#144208 的修复、Doctor 恢复、npm 切换可靠性），之后才考虑新功能。一旦发布，最可能进入下个小版本的是飞书进度流式（#131457）、按模型超时（#8724），以及可能启动 Gemini 技能对齐的第一步（#145562）。

## 7. 用户反馈摘要

**痛点（反复出现）：**
- **“升级吃掉了我的状态。”** 多位用户报告 transcript 表、Codex 会话线程、Workshop 状态和 handoff lease 仅部分迁移，回滚声称成功却留下了前向迁移的残留物（#142770、#140620、#145192、#142585、#136203）。
- **“Doctor 让我修复，却在自己建议的修复上失败。”** #145503（Workshop 迁移后 skill_workshop 未注册；Doctor 建议的 `alsoAllow` 修复又被它自己的解析器拒绝）。#137377（Windows 最终重启）。
- **“消息静默丢失。”** #139847/#141252（忙碌时回复被丢弃）、#126246（Telegram 卡在 `send_attempt_started`）、#59618（自动压缩静默放弃任务执行）。
- **“多智能体 Gateway 很脆弱。”** #123326（迁移崩溃循环）、#142476（632 智能体配置下事件循环被 cron 回收器的 PRAGMA 阻塞）。
- **“渠道能力不对齐。”** Discord 在内联错误后截断消息（#96007）；WhatsApp 入站图片卡死（#96834）；Telegram 在 IPv6→IPv4 回退时出现 409 级联（#89954）；飞书缺少进度模式。
- **“Doctor 对系统服务不友好。”** #140908（在 `sudo -u` systemd `--user` 下出现 `EACCES`）；#72948（`gateway stop` 杀不掉前台进程）。

**满意度信号：**
- 近期多个修复都在 issue 报告后很快落地（例如 #145727 → #145809、#145689 → #145783），说明分诊响应迅速。
- Discord 内联错误截断（#96007）、飞书卡片页脚解析（#59360）以及 macOS 调试路由问题（#145427）均已关闭，且用户反馈满意。
- 长篇幅的正面反馈来自面向运维者的 PR（#141276 Prometheus provider 用量窗口、#140897 磁盘压力清理）—— 这反映出在其之上构建的活跃运维生态。

**总体基调：** 挫败感集中在 **2026.9.x 升级路径**上；除此之外社区氛围总体具有建设性，维护者在积极推动修复，外部贡献者提供了高质量的复现步骤。

## 8. 积压观察

以下 issue 和 PR 尽管重要性较高，却长期未获维护者处理：

| 条目 | 时长（约） | 为何需要关注 |
|---|---|---|
| [#97616](https://github.com/openclaw/openclaw/issues/97616) | 约 2.5 个月 | 僵尸进程泄漏；P1，🦪 银贝；影响所有长期运行的安装。未关联修复 PR。 |
| [#59662](https://github.com/openclaw/openclaw/issues/59662) | 约 5 个月 | Anthropic Max 用量告警以助手消息的形式泄漏到渠道中；因过期被关闭，但底层的模型流过滤问题仍未解决。 |
| [#59618](https://github.com/openclaw/openclaw/issues/59618) | 约 5 个月 | 自动压缩会静默放弃正在执行的轮次；因过期被关闭。 |
| [#89954](https://github.com/openclaw/openclaw/issues/89954) | 约 3 个月 | Telegram 在 IPv6 回退时出现 409 级联；因过期被关闭，无文档化的缓解方案。 |
| [#114158](https://github.com/openclaw/openclaw/issues/114158) | 约 2 个月 | `fs-safe` 硬编码 `0o600`、无视 umask，破坏 NFS/SMB 共享工作区（🦐 金虾，带安全标签）。无 PR。 |
| [#77798](https://github.com/openclaw/openclaw/issues/77798) | 约 4 个月 | 协作式 Markdown 编辑器（Canvas 嵌入）；2 👍，尽管产品价值明确仍因过期被关闭。 |
| [#59109](https://github.com/openclaw/openclaw/issues/59109) | 约 5 个月 | 与 `open-agent-sdk` 对齐的会话分叉/恢复/继续；因过期被关闭。 |
| [#9016](https://github.com/openclaw/openclaw/issues/9016) | 约 7 个月 | OpenRouter 成本归因；尽管有 8 👍 仍因过期被关闭。 |
| [#125333](https://github.com/openclaw/openclaw/issues/125333) | 约 1 个月 | 通过内存刷写的 transcript 路径导致 `totalTokens` 只增不减；P0，🦞 钻石龙虾，PR 已关联但未合并。 |
| [#94716](https://github.com/openclaw/openclaw/issues/94716) | 约 3 个月 | `claude-cli` 过期 user-agent 导致 OAuth 失败；PR 已关联但未合并。 |
| [#126876](https://github.com/openclaw/openclaw/issues/126876) | 约 3 周 | 来自盲人用户的无障碍审计；已关闭但标记 `needs-maintainer-review` —— 若无分诊负责人，存在被遗忘的风险。 |
|

---

---

## 横向生态对比

# 跨项目对比报告 —— 个人 AI 助手 / Agent 开源生态
**日期：2026-09-12 | 项目：OpenClaw、Hermes Agent、IronClaw、QwenPaw、ZeroClaw**

---

## 1. 生态概览

个人 AI 助手/Agent 开源领域正在向一套共同架构收敛——桌面或 TUI 前端、网关/运行时层、多供应商 LLM 路由，以及消息渠道适配器——但各项目的成熟度差异悬殊。今日数据揭示出一个共同的战场：**发布后的回归管理**(OpenClaw 2026.9.x、QwenPaw 2.2.x、ZeroClaw v0.8.5、Hermes v0.21.x 都在处理升级引发的缺陷)，其中静默失败与状态丢失是侵蚀信任的头号因素。反复出现的用户诉求——多模型成本路由、无损升级、一等公民级别的 Windows 支持，以及“响亮”的失败模式——贯穿每一个活跃项目。其中一个入局者(IronClaw)参与度几乎为零，说明其要么采用内部开发模式，要么社区牵引力正在衰退。

---

## 2. 活跃度对比

| 项目 | Issues(24h) | PR(24h) | 关闭率(Issues) | 发布状态 | 健康评分 |
|---|---|---|---|---|---|
| **OpenClaw** | 500(267 未关闭 / 233 已关闭)| 500(290 未关闭 / 210 已关闭)| ~47% | 无新发布；2026.9.3/9.4 已上线，热修复待出 | **紧张-稳定**——吞吐量高，但 8 个开放中的 P0 阻塞项尚无修复 PR |
| **Hermes Agent** | 50(50 未关闭 / 0 已关闭)| 50(46 未关闭 / 4 已合并)| 0% | v0.21.2 已于 2026-09-11 发布 | **承压**——新爆出的 P1 插件 SDK 回归(5 份重复报告)，最高严重级别的在途修复为零 |
| **IronClaw** | 0 | 1 个已关闭(未合并)| 不适用 | 无 | **休眠**——24h 窗口太小难下定论，但信号为零 |
| **QwenPaw** | 20(16 未关闭 / 4 已关闭)| 9(8 未关闭 / 1 已合并)| 20% | 无新发布；v2.2.1 验证已通过 | **琥珀-绿**——2.2.x 回归数量偏高，但 issue→PR 追溯链干净 |
| **ZeroClaw** | 33(26 未关闭 / 7 已关闭)| 50(49 未关闭 / 1 已合并)| 21% | 无新发布；v0.8.5 为最新版 | **紧张**——积压持续增长(26 未关闭 vs 7 已关闭)；S0 级数据丢失 bug;RFC 队列瓶颈 |

**关键解读:** 活动量 ≠ 健康度。OpenClaw 的流量是任何同类的 10–20×,每天关闭约 ~47% 经手的 issue;而 Hermes 经手 50 个 issue 却零关闭——这是空转信号。QwenPaw 体量较小，却拥有最佳的修复可追溯比(每个已关闭工单都有对应的开放 PR)。

---

## 3. OpenClaw 的定位

**相对同类的优势：**
- **分诊吞吐量：** 24h 内关闭 210 个 PR,对比 Hermes 为 4、QwenPaw 为 1、ZeroClaw 为 1。issue 关闭→修复的闭环周期以天为单位(#145727→#145809、#145689→#145783)。
- **运维级能力面：** 唯一拥有专职自修复子系统(Doctor)、托管式更新/回滚机制(handoff lease、attestation 导入、install-swap 预算)以及舰队级遥测(Prometheus 使用窗口、实际环境中 632 个 agent 的 Gateway 配置)的项目。
- **流程成熟度：** 结构化的 P0–P3 严重度 + 影响评级分类体系；没有同类项目具备同等的分诊纪律。
- **渠道广度：** Discord、WhatsApp、Telegram、飞书、Google Meet 语音——同类项目中最宽的消息渠道矩阵。

**技术路线差异：** OpenClaw 独树一帜，是一个**多 agent、自愈型编排平台**(Gateway + Doctor + 托管迁移)，而同类项目以单用户优先：Hermes 以桌面/插件为中心，QwenPaw 主打成本感知编排，ZeroClaw 是强调 TUI/ACP 的 Rust 原生运行时。这种复杂性是把双刃剑——OpenClaw 最主要的痛点(升级路径上的 P0,如 #142585、#145192、#142770)是自身招来的复杂面，同类项目均无此负担。

**社区规模：** 累计 tracker 体量(issue+PR,共用编号)——OpenClaw 约 145k 条，Hermes 约 109k,ZeroClaw 约 11k,QwenPaw 约 7.7k,IronClaw 约 8k。OpenClaw 与 Hermes 领先一个数量级；OpenClaw 在多方参与的话题(17 条评论的 P0 讨论)以及在其之上构建遥测的外部运维者/贡献者生态方面领先。

---

## 4. 共性技术关注点

| 需求 | 项目 | 具体诉求 |
|---|---|---|
| **无损升级** | OpenClaw(占主导)、QwenPaw、ZeroClaw | OpenClaw:回滚后残留已前向迁移的状态(#142770、#145192)。QwenPaw:2.2.x 升级静默破坏了 MCP(#7716)。ZeroClaw:v0.8.5 移除了文档记载的 `context_compression` 键(#10780/#10781)。 |
| **“响亮失败”/可观测性** | 全部 4 个活跃项目 | QwenPaw:Daily Paper 静默失败(#7715)、`subagent_model` 被静默丢弃(#7676)。Hermes:Yuanbao 误报成功(#107227)。OpenClaw:消息静默丢失(#139847)。ZeroClaw:记忆存储静默丢数据(#10797)。 |
| **多模型成本路由** | QwenPaw(占主导)、OpenClaw、ZeroClaw | QwenPaw:3 个独立讨论帖希望为子 agent/记忆使用廉价模型(#4901、#7664、#7717)。OpenClaw:对 agent 可见的成本归因(#9016)。ZeroClaw:分类器用量未记录，破坏成本面板(#10782)。 |
| **Windows 一等公民支持** | OpenClaw、Hermes、ZeroClaw | ZeroClaw:一天内 4 个栈溢出/CI 相关 issue(#10753、#10793、#10794、#10734)。Hermes:`.cmd` 子进程挂起、Bots 标签页缺失。OpenClaw:de-DE 升级阻塞 Doctor(#136203)。 |
| **会话/状态持久化** | 全部 4 个活跃项目 | QwenPaw:模型/会话凭空消失(#7708、#7724)。ZeroClaw:失败的回合丢弃已接受的历史(#10788)。Hermes:`state.db` 锁丢失。OpenClaw:对话记录对账停滞(#140620)。 |
| **记忆作为独立子系统** | ZeroClaw、QwenPaw、OpenClaw | QwenPaw:独立的 `memory_model`(PR #7719)。ZeroClaw:MarkdownMemory 竞态(S0)+ 裁剪时的 token 记账。OpenClaw:压缩过程弃置任务(#59618)。 |
| **渠道功能对齐** | 全部 4 个活跃项目 | Telegram 四家皆有；相册/媒体组拆分(ZeroClaw #10776)、富格式(QwenPaw #7713)、入站图片卡死(OpenClaw #96834)。 |
| **停止/取消语义** | QwenPaw、OpenClaw、ZeroClaw | QwenPaw:“停止按钮在撒谎”(#7567)。OpenClaw:已取消的 steering 仍会送达运行(#145727)。ZeroClaw:通知延迟导致进行中的回合被取消(#10785)。 |

---

## 5. 差异化分析

| 项目 | 功能重心 | 目标用户 | 架构特征 |
|---|---|---|---|
| **OpenClaw** | 多 agent Gateway、Doctor 自修复、托管更新、渠道舰队 | 舰队规模的自托管者/运维者 | Node/npm;升级机制、handoff lease、cron reaper、Prometheus |
| **Hermes Agent** | 桌面 UX、插件 SDK、看板编排器、Matrix 平台 | 桌面终端用户 + 插件作者 | Vite/Rolldown 桌面打包；多 profile 网关；供应商插件 |
| **IronClaw** | Slack 渠道状态建模、OpenAI 兼容 API | (不明确——偏企业/Slack 场景)| 适配器 + API 层；公开信号稀少 |
| **QwenPaw** | 成本感知编排、子 agent、记忆(ReMeLight)、定时任务 | 对成本敏感的重度用户，Telegram 优先 | 桌面 + agent 运行时；按任务路由模型(初见端倪)|
| **ZeroClaw** | ZeroCode TUI、ACP 会话、OIDC 认证、上下文压缩 | 终端原生开发者、使用 Anthropic 扩展上下文的用户 | **Rust**(同类中唯一)；堆叠式 PR 工程实践；egress-grant 安全模型 |

最鲜明的架构分野在于：OpenClaw/Hermes/QwenPaw 优化的是**助手体验**(渠道、人设、状态)，而 ZeroClaw 优化的是**运行时底座**(栈安全、认证流程、流生命周期)。IronClaw 唯一可见的贡献(未合并的 PR #8076——区分已断开连接的共享 Slack 渠道)暗示了一种渠道状态建模思路，而这是其他项目均未优先布局的方向。

---

## 6. 社区势头与成熟度

- **第一梯队——超活跃：** **OpenClaw**。体量与关闭率无可匹敌；但“P0 开放中却无修复 PR”的积压表明，瓶颈是维护者带宽，而非诊断能力。
- **第二梯队——活跃：** **ZeroClaw**(快速迭代：由 8 个 PR 组成的 OIDC 技术栈、49 个开放 PR、强烈的管护信号)和 **Hermes**(被动应对模式：发布补丁版本 + 当天出现、至今未回应的 P1 回归集群；插件作者的信任肉眼可见地在流失)。
- **第三梯队——稳健健康：** **QwenPaw**——9 个 PR 中有 5 个来自首次贡献者，issue→PR 当天响应；同类中最好的贡献者漏斗。
- **第四梯队——休眠：** **IronClaw**——一整天只有一个未合并 PR;需要 7 天窗口加以确认，但目前没有社区心跳。

**趋稳中：** OpenClaw(下一个 tag 前的热修复窗口)、Hermes(v0.21.2→v0.21.3 稳定化)。**快速迭代中：** ZeroClaw、QwenPaw。**面临风险：** Hermes(重复的 P1 集群 + 前 30 个 issue 零 👍)、IronClaw(参与度崩塌)。

---

## 7. 趋势信号

1. **升级是头号用户流失时刻。** 最强的跨项目信号：用户可以原谅 bug,但不会原谅吞掉状态的迁移和“未经验证”的回滚(OpenClaw 整个 P0 看板便是明证)。要把升级当作事务来对待——原子化、可验证、支持对称回滚。
2. **静默回退比报错更快摧毁信任。** 五个项目中有四个，其用户明确要求可见的失败胜过优雅降级。响亮的失败模式如今已是标配。
3. **成本归因正在成为产品能力面，而非一项设置。** 按模型路由、子 agent/任务级模型选择、对 agent 可见的用量数据(QwenPaw 的主旋律，OpenClaw #9016、ZeroClaw #10782)——整个群体正在把 token 经济学收敛为一等公民能力。
4. **Windows 支持是一道可信度门槛。** 四个活跃项目中有三个在 Windows 上承受着不成比例的痛点；解决好这一点的团队，将转化一批未被充分服务且乐于发声的用户群体。
5. **记忆正在拆分为独立子系统**——拥有自己的模型、序列化契约和失败语义(三个项目，一天内三个记忆 bug)。
6. **安全姿态正从被动响应转向架构化**——ZeroClaw 的 egress grant 与 allowed-roots、QwenPaw 的沙箱绕过报告、Hermes 的 12 条 HIGH 级安全公告欠账——依赖治理现状如今已遭用户公开批评。
7. **消息渠道仍是主要的人机接口**(Telegram 覆盖全部四个活跃项目)，且对实时控制的期望正在上升——用户如今默认“停止/取消”是真能停下来的。

**给 agent 开发者：** 从这批项目中浮现出的最高杠杆投入是：事务化升级路径、响亮失败插桩、附带诚实成本核算的可插拔按任务模型路由、序列化记忆后端，以及从第一天起就配置好的 Windows CI 通道。

---

## 同赛道项目详细报告

<details>
<summary><strong>Hermes Agent</strong> — <a href="https://github.com/nousresearch/hermes-agent">nousresearch/hermes-agent</a></summary>

# Hermes Agent 项目简报 — 2026-09-12

## 1. 今日概览

Hermes Agent 呈现出**活跃度升高但以稳定化为重心**的态势：过去 24 小时内有 50 个 issue 和 50 个 PR 得到更新，50 个 issue 全部仍处于开启状态(0 个已关闭)，50 个 PR 中有 4 个被合并/关闭。项目昨天发布了一个补丁版本(v0.21.2),用于解决 v0.21.0 会话存储重写所引入的 `state.db` 脆弱性问题，但该版本发布之际，桌面插件 SDK 中似乎又出现了一项**新的严重回归**，影响所有运行时/磁盘加载的插件。维护者显然处于被动应对模式，正忙于分诊多份重复的 P1 报告，而非推进功能开发。

## 2. 版本发布

**v2026.9.11 — Hermes Agent v0.21.2(state.db 补丁版本)** — 发布于 2026-09-11

- **类型：** 补丁
- **范围：** 修复继承自 v0.21.0 会话存储重写的 `state.db` 连接处理脆弱性。此前的版本会导致第二个写入者取消对方的锁，造成锁丢失和状态卡死。
- **迁移说明：** 无破坏性 schema 变更。使用 v0.21.0 / v0.21.1 的用户应尽快升级。
- **注意事项：** 该补丁**并未**解决同一天浮现的另一项 P1 回归([#107288](https://github.com/NousResearch/hermes-agent/issues/107288)、[#107312](https://github.com/NousResearch/hermes-agent/issues/107312)、[#107352](https://github.com/NousResearch/hermes-agent/issues/107352)、[#107336](https://github.com/NousResearch/hermes-agent/issues/107336)、[#107291](https://github.com/NousResearch/hermes-agent/issues/107291)) — `#107212` “one Plugins surface” 重构之后，桌面运行时插件报 `TypeError: Cannot convert undefined or null to object` 而失败。v0.21.3 或 v0.21.2.x 热修复很可能很快推出。

## 3. 项目进展

**已合并/已关闭的 PR(4 个)：** 整体活动以频繁变动为主、合并收尾为辅 — 大多数开启中的 PR 都是近期的修复，另有几个长周期的 PR(Matrix 平台相关工作)自 7 月/8 月起一直保持开启。

值得关注的 PR 动向：
- [PR #109027](https://github.com/NousResearch/hermes-agent/pull/109027) — `feat(kanban): first-class kanban_archive orchestrator tool`(新增，2026-09-12)
- [PR #109009](https://github.com/NousResearch/hermes-agent/pull/109009) — `feat(kanban): add tree command`(新增，2026-09-12,15 个测试通过)
- [PR #109028](https://github.com/NousResearch/hermes-agent/pull/109028) — `fix(gateway): resolve Docker media in routed profile`(新增，2026-09-12)
- [PR #109005](https://github.com/NousResearch/hermes-agent/pull/109005) — `fix(gateway): throttle restart drain notices`(新增，2026-09-12)
- [PR #108986](https://github.com/NousResearch/hermes-agent/pull/108986) — `feat(whatsapp_cloud): length-proportional human-pacing delay`(新增，2026-09-12)
- [PR #108948](https://github.com/NousResearch/hermes-agent/pull/108948) — `fix(whatsapp): spawn bridge process via asyncio.to_thread`(新增，2026-09-12)
- [PR #108899](https://github.com/NousResearch/hermes-agent/pull/108899) — `fix(state): retire a lost-generation handle unclosed when setconfig raises`(新增，2026-09-12,处理 #106840 的评审跟进)

整体脉络：一批 **v0.21.2 后续修复**正在向会话状态、网关重启语义和平台适配器汇聚，与此同时 kanban 作为一等编排界面持续走向成熟。

## 4. 社区热门话题

按所更新条目的评论量排序：

1. **[#107288 (6 comments)](https://github.com/NousResearch/hermes-agent/issues/107288)** — *P1 桌面插件 SDK 模块循环问题。* 当前影响最大的单一话题：PR #107212 重构之后，所有运行时(磁盘)插件在桌面启动时全部失败。多位报告者，包括 [mr-NFA (#107312)](https://github.com/NousResearch/hermes-agent/issues/107312)、[CHEN-CR-JS (#107352)](https://github.com/NousResearch/hermes-agent/issues/107352)、[Linyuxujun (#107336)](https://github.com/NousResearch/hermes-agent/issues/107336) 和 [Yzz2023 (#107291)](https://github.com/NousResearch/hermes-agent/issues/107291),都提交了标记为 P1 的重复工单。**底层需求：** 需要能在 Vite/Rolldown DCE(死代码消除)下幸存的健壮插件 SDK 打包方案 — 据反馈，该 bug 源于 `installPluginSdk()` 调用被 tree-shaking 从构建产物中移除。

2. **[#101535 (6 comments)](https://github.com/NousResearch/hermes-agent/issues/101535)** — *Windows Desktop v0.21.0 上 Bot Mode 的 “Bots” 标签页缺失。* 自 2026-09-02 起长期悬而未决，至今仍未解决。**需求：** Windows 安装器构建上可靠的多 profile UI。

3. **[#107356 (5 comments)](https://github.com/NousResearch/hermes-agent/issues/107356)** — *安全审计：12/18 条安全通告为 HIGH 级别，npm 依赖包陈旧。* **需求：** 制定上游依赖刷新策略，并考虑引入 Dependabot/Renovate,尤其针对 `@vitest/mocker` 及其他会被打进运行时产物的纯测试用途依赖包。

4. **[#107238 (4 comments)](https://github.com/NousResearch/hermes-agent/issues/107238)** — *“Thinking: Off” UI 开关不会传递到 DeepSeek 插件。* **需求：** 在桌面开关与提供商插件之间为 reasoning/think 标志建立单一事实来源(多个提供商都会踩到同样的坑)。

5. **[#107259 (3 comments)](https://github.com/NousResearch/hermes-agent/issues/107259)** — */v1/responses 流式传输丢失 reasoning/thinking 内容。* **需求：** 网关侧针对推理轨迹实现 OpenAI Responses API 的对等支持。

6. **[#107232 (3 comments)](https://github.com/NousResearch/hermes-agent/issues/107232)** — *Windows 下调用 `.cmd` 文件时 `_agent_browser_session_cmd` 中子进程挂起。* **需求：** 对 Windows shell 脚本调用进行正确的进程树处理。

7. **[#107149 (3 comments)](https://github.com/NousResearch/hermes-agent/issues/107149)** — *被杀死的 git 子进程遗留 `<index>.lock` — 检查点永久失败。* **需求：** checkpoint_manager.py 运行 git 时必须带有清理 trap 和 `O_EXCL` 恢复机制。

## 5. 缺陷与稳定性

**按严重程度排序，并标注修复状态：**

| 严重程度 | Issue | 标题 | 修复 PR? |
|---|---|---|---|
| **P1** | [#107288](https://github.com/NousResearch/hermes-agent/issues/107288) | 桌面插件 SDK 模块循环 — 所有运行时插件失败 | 暂无开启中的 PR(重复工单 [#107312](https://github.com/NousResearch/hermes-agent/issues/107312)、[#107336](https://github.com/NousResearch/hermes-agent/issues/107336)、[#107352](https://github.com/NousResearch/hermes-agent/issues/107352)、[#107291](https://github.com/NousResearch/hermes-agent/issues/107291)) |
| **P1** | [#107312](https://github.com/NousResearch/hermes-agent/issues/107312) | SDK `Object.keys(undefined)` + 侧边栏开关卡死 | 暂无开启中的 PR |
| **P2** | [#101535](https://github.com/NousResearch/hermes-agent/issues/101535) | v0.21.0 Windows 安装版中 Bots 标签页缺失 | 无 |
| **P2** | [#107238](https://github.com/NousResearch/hermes-agent/issues/107238) | Thinking 开关未传递到 DeepSeek | 无 |
| **P2** | [#107232](https://github.com/NousResearch/hermes-agent/issues/107232) | Windows `.cmd` 子进程挂起 | 无 |
| **P2** | [#107149](https://github.com/NousResearch/hermes-agent/issues/107149) | 子进程被杀后 git index 锁残留 | 无 |
| **P2** | [#107343](https://github.com/NousResearch/hermes-agent/issues/107343) | 磁盘清理会删除用户 `scripts/` 下的 test_*/tmp_* | 无 |
| **P2** | [#107270](https://github.com/NousResearch/hermes-agent/issues/107270) | Memory 工具对字节完全相同的内容误报 “drift” | 无 |
| **P2** | [#107224](https://github.com/NousResearch/hermes-agent/issues/107224) | `respawn-argv` 重启机制未实现 | 无 |
| **P2** | [#107199](https://github.com/NousResearch/hermes-agent/issues/107199) | Bot Chat 刷新后回退到默认 profile | 无 |
| **P2** | [#100610](https://github.com/NousResearch/hermes-agent/issues/100610) | podman quadlet 内 UI pip install 失效(如 `ddgs`) | 无 |
| **P2** | [#107227](https://github.com/NousResearch/hermes-agent/issues/107227) | Yuanbao 对被拒绝的长回复静默报成功 | 无 |
| **P2** | [#107391](https://github.com/NousResearch/hermes-agent/issues/107391) | Copilot 模型被隐藏 — 目录拉取失败污染 1 小时缓存 | 无 |
| **P3 / 安全** | [#107356](https://github.com/NousResearch/hermes-agent/issues/107356) | 尚有 12 条 HIGH 级 npm 安全通告未解决 | 无 |
| **P3 / 安全** | [#101351](https://github.com/NousResearch/hermes-agent/issues/101351) | Background-review 可能将有效凭据持久化到工作仓库 | 无 |

**评估：** 这是**稳定性比往常更差的一天**。最令人担忧的模式，是围绕桌面插件 SDK 回归出现的四份重复 P1 工单 — 这表明 v0.21.0 重构在合入时，针对第三方插件作者的回归测试覆盖不足。目前最高严重级别的 bug 还没有一个有对应的开启 PR,这说明团队仍处于诊断而非修复阶段。

## 6. 功能请求与路线图信号

正在进行中的具体功能工作：

- **[PR #109027](https://github.com/NousResearch/hermes-agent/pull/109027)** — `kanban_archive` 编排工具 — 很可能下一个合入。
- **[PR #109009](https://github.com/NousResearch/hermes-agent/pull/109009)** — `hermes kanban tree`(ASCII/Mermaid)— 只读，15 个测试通过，风险低。
- **[PR #108986](https://github.com/NousResearch/hermes-agent/pull/108986)** — WhatsApp Cloud 仿人节奏延迟 — 可选开启，回应了关于“机器人式秒回”的 UX 抱怨。
- **[#107354](https://github.com/NousResearch/hermes-agent/issues/107354)** — TUI/CLI 状态栏字段，显示当前生效的池化凭据标签(认证可观测性)。
- **[#107233](https://github.com/NousResearch/hermes-agent/issues/107233)** — 在 Codex OAuth 图片路由上强制执行 `image_generation` 工具规范(目前有 1 个 👍 反应)。
- **Matrix 平台系列**(自 7 月起开启):[PR #68199](https://github.com/NousResearch/hermes-agent/pull/68199) 紧凑审批卡片、[PR #99040](https://github.com/NousResearch/hermes-agent/pull/99040) 合并回合面板、[PR #61511](https://github.com/NousResearch/hermes-agent/pull/61511) 活动列表面板、[PR #61218](https://github.com/NousResearch/hermes-agent/pull/61218) 紧凑 Matrix 工具，以及修复 [#61210](https://github.com/NousResearch/hermes-agent/pull/61210)、[#61206](https://github.com/NousResearch/hermes-agent/pull/61206)、[#61219](https://github.com/NousResearch/hermes-agent/pull/61219)。Matrix 这条线正在成形为一个成体系的 v0.22 发布面。

**对下一版本的预测(v0.21.3 热修复或 v0.22):**
- 热修复：插件 SDK DCE bug(#107288 系列)— 必须在 v0.22 之前发布。
- 很可能进入 v0.22:kanban_archive + kanban tree(均为新增、低风险、有测试覆盖)、WhatsApp Cloud 节奏延迟、若干 state.db 后续修复([PR #108899](https://github.com/NousResearch/hermes-agent/pull/108899))。
- 可能包含：TUI 状态栏账户字段、Matrix 紧凑卡片系列(若依赖问题得以解决)。

## 7. 用户反馈总结

**痛点(真实，来自 issue 正文):**

- **Windows 用户感觉自己是二等公民。** [#107232](https://github.com/NousResearch/hermes-agent/issues/107232)(浏览器 `.cmd` 挂起)、[#101535](https://github.com/NousResearch/hermes-agent/issues/101535)(Bots 标签页缺失)、[#107198](https://github.com/NousResearch/hermes-agent/issues/107198)(对 Helium/Arc 的 Chromium 分支检测)、[#101190](https://github.com/NousResearch/hermes-agent/issues/101190)(集成浏览器中 `target="_blank"` 无效)— Windows 特有的粗糙边缘被反复上报，却很少在同一个时间窗口内得到修复。
- **Profile/多租户 UX 十分脆弱。** [#107199](https://github.com/NousResearch/hermes-agent/issues/107199)(刷新后 profile 回退)、[#107238](https://github.com/NousResearch/hermes-agent/issues/107238)(开关不传递)、[#97586](https://github.com/NousResearch/hermes-agent/issues/97586)(多个网关在默认端口上冲突)、[#100610](https://github.com/NousResearch/hermes-agent/issues/100610)(podman quadlet 中 pip install 失效)— 同时周旋于 profile/容器/网关之间的运维人员不断遭遇摩擦。
- **插件作者的信任正在流失。** 围绕桌面 SDK 回归的五工单重复集群(全部 P1、全部与插件内容无关)正是会让外部插件作者丧失信心的那类回归。Hermes 一直宣称“桌面插件是一等公民”，但一次重构就悄无声息地弄坏了每一个用户自写的插件。
- **提供商对等性缺口令人沮丧。** DeepSeek 的 thinking 开关、OpenAI Responses 的推理流式传输、Copilot 目录过期、Codex OAuth 图片规范 — 每个提供商都有自己的怪癖，而网关“如实报告成功与否”的立场在 Yuanbao([#107227](https://github.com/NousResearch/hermes-agent/issues/107227))和 SMS([#107430](https://github.com/NousResearch/hermes-agent/issues/107430))上出现了倒退，而这些恰恰是静默失败最损害客户信任的界面。
- **依赖卫生状况正被公开批评。** [#107356](https://github.com/NousResearch/hermes-agent/issues/107356) 的标题毫不客气地写着 “Keeps Stacking up”(不断堆积)— 社区对无人维护的传递性依赖的耐心正在耗尽。

**满意度信号：** 偏低。排名前 30 的所有 issue 中 👍 反应为零，说明即使是已被承认的痛点也没有获得点赞(或许因为报告者就是唯一的参与者)。唯一带 👍 的条目是 [#107233](https://github.com/NousResearch/hermes-agent/issues/107233)(Codex 图片规范)— 那是一个功能请求，而非 bug。

## 8. 积压工单观察

以下 issue 存在时间长、很重要，但已陷入停滞(近期维护者参与度低甚至为零)：

- **[#100268](https://github.com/NousResearch/hermes-agent/issues/100268)** — v0.21.0 之后宿主机上缺失 `/proc/uptime`(3 条评论，2026-09-01 开启)。导致主机监控脚本失效；需要维护者排查容器/沙箱的挂载策略。
- **[#100610](https://github.com/NousResearch/hermes-agent/issues/100610)** — podman quadlet 中 UI pip install 失效(2 条评论，2026-09-01 开启)。暂无修复 PR。
- **[#101351](https://github.com/NousResearch/hermes-agent/issues/101351)** — Background-reviewer 可能将有效凭据持久化到 `.git/config`(1 条评论，2026-09-02 开启，标记为 `needs-repro`)。**安全敏感** — 不应要求先提供复现用例才开始凭据脱敏修复。
- **[#101190](https://github.com/NousResearch/hermes-agent/issues/101190)** — 集成浏览器中 `target="_blank"` 无效(1 条评论，2026-09-02 开启)。修复成本低，却一直搁置。
- **[#97586](https://github.com/NousResearch/hermes-agent/issues/97586)** — 多个网关在默认端口上冲突(1 条评论，开启于 2026-

---

</details>

<details>
<summary><strong>IronClaw</strong> — <a href="https://github.com/nearai/ironclaw">nearai/ironclaw</a></summary>

# IronClaw 项目简报 — 2026-09-12

## 1. 今日概览

过去 24 小时内，IronClaw 仓库的活动非常有限。未新建或关闭任何 issue，未发布新版本，仅有一个 pull request 产生了活动 —— PR #8076，该 PR 被关闭但未合并。当前零开放 issue、零合并 PR，项目似乎处于低活跃度的维护阶段，而非活跃的功能开发期。唯一的关闭 PR 体现出有序的评审流程，但其未合并的结果可能反映出对范围或方案的分歧。

- [github.com/nearai/ironclaw](https://github.com/nearai/ironclaw)

## 2. 版本发布

今日未发布任何新版本，无可汇报的内容。

## 3. 项目进展

过去 24 小时内无任何 pull request 被合并。一个 PR 被关闭：

- **PR #8076** — *fix(assistant): distinguish disconnected shared channels* ([link](https://github.com/nearai/ironclaw/pull/8076))
  - 作者：be-student | 创建时间：2026-09-06 | 更新时间：2026-09-12 | 状态：**已关闭（未合并）**
  - 拟议变更：区分已配对用户断连的共享频道与未配对账户；为用户消息和机器人命令呈现针对性的引导文案；在产品层、适配层以及 OpenAI 兼容接口之间保持一致的拒绝分类；更新 Slack 能力声明。
  - 结果：关闭但未合并。没有任何提交被记录为合入主线，因此该 PR 中的代码未进入主干。

## 4. 社区热议话题

当前无开放或近期活跃的 Issue，唯一涉及的 PR（#8076）也未收到任何 reaction。今日没有可衡量的社区讨论可分析。已关闭 PR 缺乏评论 —— 加之是关闭而非合并 —— 可能表明维护团队通过其他途径处理了底层需求，或决定不采用此方案。

## 5. 缺陷与稳定性

过去 24 小时内未提交或更新任何缺陷报告、崩溃报告或回归问题。被关闭的 PR #8076 涉及一处与 Slack 相关的歧义（断连的共享频道与未配对账户无法区分），这属于真实但较为小众的 UX / 集成边界场景。由于该 PR 未被合并，目前通过此 PR 并未交付任何修复；不过该问题可能在内部已解决或被暂时搁置。

## 6. 功能请求与路线图信号

今日未提出明确的功能请求。被关闭的 PR #8076 触及的方向，若后续被重新审视，可为未来的路线图决策提供参考：

- **统一拒绝 / 错误分类** —— 横跨产品层、适配层与 OpenAI 兼容 API，体现出跨表面保持错误语义一致性的诉求。
- **Slack 频道状态 UX** —— 区分"已配对但断连"的频道与未配对账户，提示 Slack 适配器需要更丰富的频道状态建模。

鉴于该 PR 被关闭且未合并，上述信号应视为低置信度。仅凭单日活动不足以对下一次发布做出预测。

## 7. 用户反馈摘要

过去 24 小时内无公开的用户反馈 —— 无评论、无 reaction、无新增 issue 讨论。从今日数据中无法提取痛点、使用场景或满意度信号。任何关于用户情绪的结论都需要基于更长期的趋势分析。

## 8. 待办与观察

由于 issue 和 PR 待办区相对单薄，单日窗口内并未浮现长期未回复的事项。不过仍有两项值得后续跟进观察：

- **PR #8076** ([link](https://github.com/nearai/ironclaw/pull/8076)) —— 已关闭未合并；如果底层 Slack 频道区分问题仍然存在，可能需要提交一份调整范围后的新 PR。维护者应明确说明该问题是否在其他途径中处理。
- 总体活动缺失（24 小时内 0 开放 issue、0 合并 PR）应结合更长的时间窗口进行交叉核实，以判断这反映的是代码库健康稳定，还是社区参与度下降。

---

**整体健康度信号：** 中性偏沉寂。今日唯一的活动就是一个被关闭未合并的 PR。无回归缺陷、未新提交 bug、未发布版本。建议以 7 天为窗口持续观察，再对项目节奏或社区参与度得出更确定的结论。

</details>

<details>
<summary><strong>QwenPaw</strong> — <a href="https://github.com/agentscope-ai/QwenPaw">agentscope-ai/QwenPaw</a></summary>

# QwenPaw 项目简报 — 2026-09-12

## 1. 今日概览

QwenPaw 今日**活跃度较高**,过去 24 小时内有 20 个 issue 更新、9 个 PR 变动(16 个开放 / 4 个关闭的 issue;8 个开放 / 1 个关闭的 PR)。今天没有新版本发布,但项目正处于 **v2.2.1** 系列的稳定阶段,刚刚关闭的发布值班验证 issue([#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692))便是佐证。今天最突出的主题是**发布后的回归排查**:多个 2.2.x 版本缺陷涉及数据丢失(模型/会话消失)、静默失败(Daily Paper、MCP 注册)以及严重的资源问题(内存耗尽、服务器卡死的文件监听)。在积极的一面,有四个功能 PR 排队待处理(Serply 提供方、ReMeLight 模型拆分、Telegram 富文本消息、Atlas Cloud),并且第二批首次贡献者群体正在积极提交代码。

## 2. 版本发布

过去 24 小时内没有新版本发布。最新稳定版本系列为 **v2.2.1**,其安装验证报告([#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692))今日顺利关闭。

## 3. 项目进展

**已合并/已关闭的 PR(1 个):**
- [#7590](https://github.com/agentscope-ai/QwenPaw/pull/7590) — `fix(telegram): render Markdown tables as <pre> instead of raw pipes`(首次贡献者,Bruce-Yii)。关闭 [#7585](https://github.com/agentscope-ai/QwenPaw/issues/7585)。修复了 Telegram 对 GFM 表格使用原始管道符渲染的问题。

**表明进展的已关闭 issue(4 个):**
- [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) — v2.2.1 稳定版的发布值班验证通过。
- [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — `subagent_model` 覆盖被静默丢弃。已诊断完成,等待 [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) 中的代码修复。
- [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) — "幽灵会话"不同步已作为无效报告关闭(可能是用户侧报告,但该症状仍然是已知的并发缺陷)。
- [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) — 关于独立 `memory_model` 的功能请求已关闭,因为实现 PR [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) 已开放。

**合并模式:** Issue 与 PR 的追溯关系今天异常清晰:上述每个已关闭的功能/缺陷工单都有对应的开放 PR,说明维护者正在实时进行分类处理。

## 4. 社区热门话题

过去 24 小时内参与度最高的帖子(按评论数排序):

| # | 条目 | 评论数 | 标题 |
|---|------|---------:|-------|
| 1 | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | 6 | 停止按钮撒谎 — 任务在后台继续执行 |
| 2 | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) | 3 | 已配置的 LLM 模型在会话中途消失 |
| 3 | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | 3 | arxiv 不可达时 Daily Paper 静默失败 — 错误被隐藏 |
| 4 | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | 3 | `subagent_model` 覆盖被忽略 |
| 5 | [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) | 3 | `spawn_subagent` 按任务选择模型(自 2026-06-02 起) |
| 6 | [#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698) | 3 | 幽灵会话 / 侧边栏会话不同步 |
| 7 | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 2 | 内存耗尽:三条叠加路径 |
| 8 | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) | 2 | ReMeLight 独立记忆模型 |
| 9 | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | 2 | 2.2.x 上 MCP 无法连接(从 2.1.1b3 回归) |
| 10 | [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) | 2 | 智能体间/主动聊天的历史分组 |

**反映出的潜在需求:**
- **旗舰模型的成本控制。** [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)、[#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664)、[#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) — 用户希望将低成本任务(子智能体、记忆写入、摘要)路由到更便宜的模型。这是跨多个独立 issue 中最一致的主题。
- **失败可见性。** [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) 和 [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) — 静默吞错再回退的做法正在被积极报告;这与 PR [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) 和 [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) 相吻合。
- **会话/模型持久化的可靠性。** [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)、[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698)、[#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) 都共享同一个根因:状态在桌面端重启边界处丢失。

## 5. 缺陷与稳定性

按严重程度排序(数据丢失 > 可用性 > 静默失败 > 体验):

| 严重程度 | Issue | 标题 | 修复 PR? |
|---|---|---|---|
| **严重** | [#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) | 通过三条路径导致内存耗尽(无界流 + keep-alive 堆积 + 死循环门控规避);约 1MB/秒的泄漏 | 部分 — [#7723](https://github.com/agentscope-ai/QwenPaw/pull/7723) 仅处理静默错误路径 |
| **严重** | [#7721](https://github.com/agentscope-ai/QwenPaw/issues/7721) | 文件浏览器冻结整个服务器(`watchfiles.awatch` 的 RustNotify 阻塞事件循环) | ✅ [#7725](https://github.com/agentscope-ai/QwenPaw/pull/7725) 已开放 |
| **高** | [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) | 自 2.2.x 升级后 MCP 无法连接(相对于 2.1.1b3 的回归) | ❌ 暂无 |
| **高** | [#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567) | 停止按钮报告已停止但任务仍在运行;下一次输入时造成 409 | ❌ 暂无 |
| **高** | [#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708) / [#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724) | 使用过程中 LLM 模型配置 + 会话意外消失 | ❌ 暂无 |
| **高(安全)** | [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) | 工作区外写入硬性阻断被 kimi-code 绕过(路径字段解析盲点) | ❌ 暂无 |
| **高(安全)** | [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) | ACP `trusted: true` 静默降级为交互式提示(optionId 不匹配) | ❌ 暂无 |
| **中** | [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715) | Daily Paper 以误导性的"已完成,无内容"失败 — arxiv 不可达,无代理开关 | ❌ 暂无 |
| **中** | [#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676) | `subagent_model` 覆盖被静默忽略 | ✅ [#7680](https://github.com/agentscope-ai/QwenPaw/pull/7680) 已开放 |
| **中** | [#7709](https://github.com/agentscope-ai/QwenPaw/issues/7709) | 计划任务不产生可见输出 — 结果隐藏在 `thinking`/步骤中 | ❌ 暂无 |

**稳定性信号:** 参与度最高的前 10 个帖子中有 5 个是 v2.2.x 用户的缺陷报告;这是正常的发布后回归聚集,但当前频率偏高。还有两个 issue 涉及安全([#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726)、[#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727)),应优先于外观改进类工作处理。

## 6. 功能请求与路线图信号

已有 PR 支持的开放功能(可能合并到 v2.2.2 或 v2.3.0):

| 功能 | Issue | PR | 可能性 |
|---|---|---|---|
| Serply 作为第三个 `web_search` 提供方 | [#7711](https://github.com/agentscope-ai/QwenPaw/issues/7711) | [#7712](https://github.com/agentscope-ai/QwenPaw/pull/7712) | **高** — issue + PR 同日提交,范围明确 |
| ReMeLight 记忆写入使用独立模型 | [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) | [#7719](https://github.com/agentscope-ai/QwenPaw/pull/7719) | **高** — 成本控制需求强烈,PR 已就绪 |
| Atlas Cloud 作为内置 OpenAI 兼容提供方 | — | [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) | **中** — PR 较老(7 月起),但预设简单 |
| Telegram 富文本消息支持 Markdown 表格 | — | [#7713](https://github.com/agentscope-ai/QwenPaw/pull/7713) | **中** — 取决于富文本消息的推广进度 |
| `spawn_subagent` 中按任务选择模型 | [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) | — | **中** — 战略性需求,但尚无 PR |
| 智能体间/主动聊天的历史分组 | [#7710](https://github.com/agentscope-ai/QwenPaw/issues/7710) | — | **中** — 体验改进,需求明确 |
| Serply + DeepSeek 能力元数据 | [#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717) | — | **低** — 处于提议阶段,包含 4 项子需求 |

**路线图信号:** 成本优化(多模型路由)现在已经成为横跨 3 个独立帖子的*反复出现*的主题([#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901)、[#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664)、[#7717](https://github.com/agentscope-ai/QwenPaw/issues/7717))。建议将其作为下一个次要版本的候选**主题**。

## 7. 用户反馈摘要

**今日浮现的痛点:**

1. **桌面端状态持久化脆弱。** 三份独立报告([#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)、[#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)、[#7698](https://github.com/agentscope-ai/QwenPaw/issues/7698))描述了在正常使用过程中丢失模型配置和会话的情况,通常伴随着插件重新部署。用户认为桌面端在长会话中**不可靠**。
2. **MCP 集成在 2.2.x 中损坏。** [#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716) — 依赖 `qwenpaw-hub` MCP 连接的用户(在 2.1.1b3 中正常工作)在升级后静默丢失该能力。这是一种**由回归引发的信任流失**。
3. **静默失败削弱了可调试性。** [#7715](https://github.com/agentscope-ai/QwenPaw/issues/7715)、[#7676](https://github.com/agentscope-ai/QwenPaw/issues/7676)、[#7722](https://github.com/agentscope-ai/QwenPaw/issues/7722) — 多份缺陷报告共同指向"系统吞掉错误并伪装成功"。用户明确希望**失败要响亮**,而不是宽容地回退。
4. **旗舰模型的 token 成本是真实痛点。** [#7664](https://github.com/agentscope-ai/QwenPaw/issues/7664) 明确列举了后台记忆写入使用聊天模型所带来的*经济*损害。
5. **积极信号:** 首次贡献者产出健康(9 个 PR 中有 5 个标注为 `[first-time-contributor]`)。PR 实现了当日合并对应 issue,说明维护者分类处理响应迅速。

**隐含的使用场景:** 混合模型编排的长时桌面端会话;外部工具/MCP 集成;计划任务/自动化记忆作业;Telegram 作为主要交互界面。

## 8. 待办关注

需要维护者关注的项目:

| 项目 | 时长 | 原因 |
|---|---|---|
| [#4901](https://github.com/agentscope-ai/QwenPaw/issues/4901) `spawn_subagent` 按任务选模型 | 2026-06-02 → 2026-09-11(约 3.5 个月) | 战略性高影响功能请求;虽有 3 条评论但尚无 PR |
| [#6499](https://github.com/agentscope-ai/QwenPaw/pull/6499) Atlas Cloud 提供方 | 2026-07-27 → 2026-09-11(约 7 周) | PR 一直开放,无评审活动 |
| [#7692](https://github.com/agentscope-ai/QwenPaw/issues/7692) 已关闭的发布值班 + 每个开放的 2.2.x 回归([#7567](https://github.com/agentscope-ai/QwenPaw/issues/7567)、[#7708](https://github.com/agentscope-ai/QwenPaw/issues/7708)、[#7716](https://github.com/agentscope-ai/QwenPaw/issues/7716)、[#7724](https://github.com/agentscope-ai/QwenPaw/issues/7724)) | 0–7 天 | 用户影响高,大多数尚无修复 PR;建议在下一版本中处理 |
| [#7726](https://github.com/agentscope-ai/QwenPaw/issues/7726) / [#7727](https://github.com/agentscope-ai/QwenPaw/issues/7727) —

</details>

<details>
<summary><strong>ZeroClaw</strong> — <a href="https://github.com/zeroclaw-labs/zeroclaw">zeroclaw-labs/zeroclaw</a></summary>

# ZeroClaw 项目摘要 — 2026-09-12

## 1. 今日概览

ZeroClaw 展现出非常高的开发节奏，过去 24 小时内有 33 个 issue 和 50 个 PR 被更新，但仅有 1 个 PR 被合并/关闭，且未发布新版本。活动主要集中在以下几个方面：Windows CI 稳定性相关的 bug 报告、ZeroCode（TUI/代码面板）的回归问题、各提供商的可靠性问题（Anthropic、OpenRouter、OpenCode），以及在 v0.8.5 中被移除的主动 token 预算上下文压缩功能。当前项目有 26 个开放 issue 正在积极处理，而过去一天仅关闭了 7 个，表明积压增长速度快于消化速度。整体健康状况：**活跃但承压**——大量高严重度 bug 不断涌现，而更大的架构工作（OIDC、会话所有权、ACP 恢复）仍在进行中。

## 2. 版本发布

过去 24 小时内无新版本发布。在 issue 文本中提及的最新标记版本为 v0.8.5。

## 3. 项目进展

今日关闭的 issue 涵盖了修复和验收两类：

- **[#10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753)** — Windows 防护测试中 `session/new` 出现 2 MB 栈溢出（已关闭）。
- **[#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)** — 集成页面 "Configure" 链接针对 Z.AI 的 slugify 缺陷（已关闭；轻微 S3）。
- **[#9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047)** — 澄清 Code 会话历史记录与持久化内存的隔离关系（已关闭；文档/功能）。
- **[#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609)** — `zerocode` 忽略启动目录（已关闭）。
- **[#10115](https://github.com/zeroclaw-labs/zeroclaw/issues/10115)** — 工具结果截断在模型上下文之外不可见（已关闭；可观测性改进）。
- **[#10786](https://github.com/zeroclaw-labs/zeroclaw/issues/10786)** — Anthropic 丢弃上一轮的 thinking 块（已关闭）。
- **[#9092](https://github.com/zeroclaw-labs/zeroclaw/issues/9092)** — ZeroCode 在长会话中的按键延迟（已关闭）。

该窗口期内有 1 个 PR 被合并/关闭（未列入前 20 列表）；更广泛的 PR 积压仍完全开放（49 开放 / 1 关闭）。

## 4. 社区热点话题

评论最多的条目指向两个反复出现的痛点：维护者分诊和 Windows/CI 可靠性。

- **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — *针对 RFC 和设计类 issue 的维护者决策队列*（15 条评论，p2，追踪类）。持续时间最长的协调线程。信号：维护者需要一个更高吞吐量的 RFC 验收流程；没有该流程，设计讨论会在多个子 issue 中停滞不前。
- **[#10734](https://github.com/zeroclaw-labs/zeroclaw/issues/10734)** — *Windows 上 `RpcDispatcher::process_line` 距离 2 MB 栈防护仅差 2%*（6 条评论，p1，进行中）。一项重要的正确性信号：即便仅是建议性的 Windows nextest 任务，也在发现真实的 Windows 栈溢出 bug（`0xc00000fd`）。
- **[#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289)** — *OIDC 里程碑追踪*（3 条评论，p2，高风险）。多个堆叠的 PR（`#10248`、`#10255`、`#10270`、`#10274`）为此追踪提供输入；社区关注点集中在权威主体和入站认证。
- **[#10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753)** — Windows 防护测试在 2026-09-07 至 2026-09-10 期间的回归（3 条评论；已关闭）。
- **[#10690](https://github.com/zeroclaw-labs/zeroclaw/issues/10690)** 和 **[#9047](https://github.com/zeroclaw-labs/zeroclaw/issues/9047)** — 均为 2 条评论，均于今日关闭。

底层需求：协调一致的 Windows 测试流水线与维护者 RFC 漏斗，都是制约更高吞吐量的关键环节。

## 5. Bug 与稳定性

按严重度排序（最严重的优先）：

| 严重度 | Issue | 摘要 | 修复 PR？ |
|---|---|---|---|
| **S0 — 数据丢失** | [#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797) | 当 `store()` 调用重叠时，`MarkdownMemory::store` 会静默丢失条目（无写入序列化或校验）。 | 暂无 |
| **S1 — 工作流阻塞** | [#10609](https://github.com/zeroclaw-labs/zeroclaw/issues/10609) | `zerocode` 强制将代理工作区设为当前工作目录，无视启动目录。 | 今日关闭 |
| **S2 — 行为降级** | [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) | 失败的 Code/ACP 轮次会从持久化历史中丢弃已接受的提示和工具交互记录。 | 与 [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)（持久化中断轮次进度）一同追踪 |
| **S2** | [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) | `zerocode` 的通知延迟会取消多会话实例上所有正在运行的轮次。 | 暂不可见 |
| **S2** | [#10787](https://github.com/zeroclaw-labs/zeroclaw/issues/10787) | 单候选流恢复忽略 `provider_retries`；Anthropic 529 仅获得一次即时重试且无退避。 | 暂不可见 |
| **S2** | [#10778](https://github.com/zeroclaw-labs/zeroclaw/issues/10778) | 多模态图像上限驱逐机制会重写较早的历史消息，并使 Anthropic 缓存前缀失效。 | 后续跟进 [#10701](https://github.com/zeroclaw-labs/zeroclaw/issues/10701) |
| **S2** | [#10777](https://github.com/zeroclaw-labs/zeroclaw/issues/10777) | `thinking`/`effort` 配置在轮次间切换会重写已缓存的历史段。 | 暂不可见 |
| **S2** | [#10782](https://github.com/zeroclaw-labs/zeroclaw/issues/10782) | 渠道回复意图预检查丢弃 LLM 使用记录；分类器调用成本从未被记录。 | 暂不可见 |
| **S2** | [#10736](https://github.com/zeroclaw-labs/zeroclaw/issues/10736) | 预输出流失败时跳过所声明的非流式回退。 | 状态：进行中 |
| **S2** | [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795) | `zeroclaw agent` 交互式 REPL 从未启用终端 `IUTF8`，破坏多字节 Backspace。 | 暂不可见 |
| **S2** | [#10776](https://github.com/zeroclaw-labs/zeroclaw/issues/10776) | 跨轮询页面的 Telegram 相册被拆分成多个轮次。 | 暂不可见 |
| **S2（此前开放）** | [#10753](https://github.com/zeroclaw-labs/zeroclaw/issues/10753) | Windows 2 MB 栈溢出。 | **今日关闭** |
| **S3 — 轻微** | [#10794](https://github.com/zeroclaw-labs/zeroclaw/issues/10794)、[#10793](https://github.com/zeroclaw-labs/zeroclaw/issues/10793) | 三个仅限 Windows 的 nextest 失败且无代码改动；`publish_contract` 的 Windows 反斜杠路径问题。 | [#10676](https://github.com/zeroclaw-labs/zeroclaw/pull/10676) 开放 |
| **S3** | [#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779) | OpenCode FreeUsageLimitError（429 配额耗尽）以亚秒级退避重试，而非快速失败。 | 暂不可见 |
| **S3** | [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796) | ZeroCode 聊天输入忽略 Delete 键。 | 暂不可见 |

最令人担忧的条目是 **[#10797](https://github.com/zeroclaw-labs/zeroclaw/issues/10797)**（S0 数据丢失）—— markdown 内存后端中的 `read-modify-write` 竞态条件，既无序列化也无写入校验。

## 6. 功能请求与路线图信号

下一版本的强烈信号：

- **主动 token 预算上下文压缩** — [#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780)（p1，高风险）明确呼吁恢复带 `keep_recent`/`collapse_tool_results` 语义的 `context_compression`。可能目标是 v0.8.6。
- **失效配置清理** — [#10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781) 请求要么实现、要么移除失效的 context/history 配置键（`context_compression.*`、`history_pruning.keep_recent`、`collapse_tool_results`、`keep_tool_context_turns`）。可能以"文档 + 行为变更"的形式在同一版本中发布。
- **历史裁剪事件的 token 核算** — [#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)（已阻塞，XL）自 2026-08-03 起等待；处理 [#9619](https://github.com/zeroclaw-labs/zeroclaw/issues/9619) 中整轮裁剪看起来像是消耗完整 token 预算的普通轮次的问题。
- **OIDC 权威主体 / 入站认证（第 5 阶段）** — [#8289](https://github.com/zeroclaw-labs/zeroclaw/issues/8289) 追踪项；堆叠 PR [#10248](https://github.com/zeroclaw-labs/zeroclaw/pull/10248) → [#10255](https://github.com/zeroclaw-labs/zeroclaw/pull/10255) → [#10259](https://github.com/zeroclaw-labs/zeroclaw/pull/10259) → [#10263](https://github.com/zeroclaw-labs/zeroclaw/pull/10263) → [#10265](https://github.com/zeroclaw-labs/zeroclaw/pull/10265) → [#10268](https://github.com/zeroclaw-labs/zeroclaw/pull/10268) → [#10270](https://github.com/zeroclaw-labs/zeroclaw/pull/10270) → [#10274](https://github.com/zeroclaw-labs/zeroclaw/pull/10274) 构成最大待合并变更集。最早现实合并时间需在所有堆叠层完成之后。
- **用于 webhook 聊天轮次的 Server-Sent Events** — [#10450](https://github.com/zeroclaw-labs/zeroclaw/pull/10450)（XL）为 `POST /webhook` 提供可选流式输出。
- **插件安装/列表的出站授权仪式** — [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584)（XL），在 [#9582](https://github.com/zeroclaw-labs/zeroclaw/pull/9582) 合并之后。
- **Edge TTS 所有者专属产物权限** — [#10449](https://github.com/zeroclaw-labs/zeroclaw/pull/10449)（安全修复，S）—— 改动小，下个补丁版本的合理候选。
- **OpenRouter 流式生命周期修复** — [#10442](https://github.com/zeroclaw-labs/zeroclaw/pull/10442)（S）—— 同样改动小，可能进入补丁版本。
- **QQ 渠道一次性发送 / cron 投递 / 健康检查机器人探测** — [#10799](https://github.com/zeroclaw-labs/zeroclaw/pull/10799)、[#10798](https://github.com/zeroclaw-labs/zeroclaw/pull/10798)（XS/S）—— 今日新开启。
- **ZeroCode：从选中文本"添加到聊天"** — [#10553](https://github.com/zeroclaw-labs/zeroclaw/pull/10553)（XL）。
- **原子的 `SessionBackend` 所有权契约** — [#10412](https://github.com/zeroclaw-labs/zeroclaw/pull/10412)（XL）。
- **持久化中断的 Code/ACP 轮次进度** — [#10197](https://github.com/zeroclaw-labs/zeroclaw/pull/10197)（XL）；处理 [#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788)。
- **git 操作的允许根目录** — [#10337](https://github.com/zeroclaw-labs/zeroclaw/pull/10337)（XL 安全）。

## 7. 用户反馈摘要

来自今日信号的真实、反复出现的痛点：

- **Windows 用户受影响的比例明显偏高。** 今日有四个独立 issue 仅限 Windows（`#10753`、`#10793`、`#10794`，以及进行中的 `#10734`）。`Advisory Windows nextest` 任务现正在触发 cron 相关 PR 上发现真实的栈溢出 bug，且无代码改动。用户认为 Windows 流水线脆弱且投入不足。
- **Token 预算上下文控制是一处回归。** [#10780](https://github.com/zeroclaw-labs/zeroclaw/issues/10780) 和 [#10781](https://github.com/zeroclaw-labs/zeroclaw/issues/10781) 明确指出 v0.8.5 移除或悄悄削弱了文档化的配置键（`context_compression`、`keep_recent`、`collapse_tool_results`、`keep_tool_context_turns`）。用户感觉自己在配置一些毫无作用的选项。
- **长 ACP 会话很脆弱。** [#10785](https://github.com/zeroclaw-labs/zeroclaw/issues/10785) 报告说 *三个* 并发的约 200k token 的 ACP 会话被同时取消；[#10788](https://github.com/zeroclaw-labs/zeroclaw/issues/10788) 报告在失败的轮次中，已接受的提示和工具交互从持久化历史中消失。使用 Anthropic 原生扩展上下文的高阶用户是受影响最大的群体。
- **ZeroCode UX 回归。** [#10795](https://github.com/zeroclaw-labs/zeroclaw/issues/10795)（多字节 Backspace 失效）和 [#10796](https://github.com/zeroclaw-labs/zeroclaw/issues/10796)（忽略 Delete 键）表明 TUI 输入层在简单按键处理上出现回归。
- **成本/配额可见性缺口。** [#10782](https://github.com/zeroclaw-labs/zeroclaw/issues/10782) 报告渠道回复意图分类器会进行一次实际计费的调用，但记录的使用量为零——用户无法信任自己的成本仪表盘。
- **OpenCode 免费层用户遭遇重试风暴**（[#10779](https://github.com/zeroclaw-labs/zeroclaw/issues/10779)），原因是配额耗尽导致的 HTTP 429 以亚秒级退避被反复重试。
- **Telegram 相册拆分**（[#10776](https://github.com/zeroclaw-labs/zeroclaw/issues/10776)）即使在早期修复（#8955、#5514）之后仍持续困扰高阶用户。
- **满意度：** 维护者一天内关闭了 7 个 issue，其中包括多个 S2（#10609、#10115、#10753、#9092），且审阅认真的 PR（例如 Audacity88 对 [#9584](https://github.com/zeroclaw-labs/zeroclaw/pull/9584) 范围的修正）表明维护工作积极且细致。

## 8. 积压关注

等待维护者关注的 issue 和 PR，按"陈旧度 × 影响"排序：

- **[#8692](https://github.com/zeroclaw-labs/zeroclaw/issues/8692)** — 维护者决策队列（始于 2026-07-04，15 条评论）。杠杆作用最高的流程项；没有此处的吞吐量，子 issue 就会逐渐老化。
- **[#9713](https://github.com/zeroclaw-labs/zeroclaw/pull/9713)** — 历史裁剪事件的 token 核算（已阻塞，始于 2026-08-03，XL）。阻塞状态本身就是信号。
- **[#9819](https://github.com/zeroclaw-labs/zeroclaw/pull/9819)** — 多模态图像像素级校验（始于 2026-08-07，XL，`needs-author-action`）。运行时间长，涉及安全。
- **[#10417

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*