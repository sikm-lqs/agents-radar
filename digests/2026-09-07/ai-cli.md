# AI CLI 工具社区动态日报 2026-09-07

> 生成时间: 2026-09-07 13:28 UTC | 覆盖工具: 7 个

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## 横向对比

# 跨工具对比报告：AI CLI 生态系统 — 2026-09-07

## 1. 生态系统概览

AI CLI 领域已成熟为两个梯队：第一方厂商代理（Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI）以生态深度展开竞争，独立客户端（OpenCode、Pi、Qwen Code）则以供应商敏捷度和架构见长。功能面已大幅趋同——子代理、MCP 支持、沙箱、hooks/插件——因此竞争重心已转向可靠性、成本透明度与平台一致性。今日摘要的主角并非新能力，而是回归问题集群（Windows 桌面端、发布列车中断）、横跨 GPT-5/6 各档位的容量/限流事件，以及付费档可用性事故（OpenCode Go 429 服务中断并伴随补偿诉求）。可扩展性架构（hooks、扩展 API、审批中间件）正是当下最重磅的工程投入所在。

## 2. 活跃度对比

| 工具 | Issues（呈现） | PRs（呈现） | Discussions（呈现） | 发布（24h） |
|---|---|---|---|---|
| Claude Code | 10 | ~25（10 个关键 + 15+ 批量合并） | N/A* | 无 |
| OpenAI Codex | 10 | ~18（10 个关键 + 8 个相关） | 7 | 无 |
| Gemini CLI | 14（10 + 4 个值得关注） | 14（10 + 4） | N/A* | v0.60.0 nightly |
| Copilot CLI | 16（10 + 6 个追踪中） | 3 | N/A（数据源未返回） | 无 |
| OpenCode | 10 | 12 | N/A* | 未报告 |
| Pi | 10 | 11 | 1 | 无 |
| Qwen Code | 10 | 11 | N/A* | 3（v0.23.1-preview.2、cua-driver-rs 0.20.4、nightly） |

\* 摘要中未呈现 Discussions 板块；并不代表零活跃。计数反映的是精选 top-N 亮点，而非穷尽的每日总量。本组中没有任何仓库禁用了 Issues/PRs；Copilot CLI 在该时段明确未返回任何 Discussions。

## 3. 共性功能方向

- **Windows/WSL 一致性——全部七款工具。**最普遍的单一痛点：Claude Code 的 AppX/MSIX 锁死（#53247、#91763）、Codex 的 WSL 引导失败（#41463）与 rollout 损坏（#41566）、Gemini 的 CRLF/符号链接修复（#28975、#28983、#29132）、Copilot 的会话回归（#4742、#4756）、OpenCode 的证书/端口问题（#17798、#41746）、Pi 那条 57 条评论的问题分诊大帖（#7547）、Qwen 的 347 进程 `conhost.exe` 泄漏（#11303）。
- **MCP 成为一等集成面——全部七款。**Codex 正在加深协议纵深（认证变更通知 #43428、用户验证传输 #43452）；Copilot CLI 与 Qwen 在修复生命周期回归（#4753、#11272）；OpenCode 与 Gemini 在补齐暴露/注册缺口（#33027、#24246、#28971）。
- **撤销/回退与会话恢复——5 款工具。**Codex 的 #9618（119 👍，其社区呼声第一）将回退定位为对标 Claude Code 与 OpenCode 的标配能力；Pi 在追踪一整类会话延续 bug（#5886）；Qwen 在 hook 失败时保留分支提交（#11300）；OpenCode 新增最后一轮对话 diff 审查（#47795）。
- **成本/配额/容量可见性——5 款工具。**不可见的 Fable 限额（Claude #92080）、GPT-5/6 容量事件（Codex #43398、#43375）、OpenCode Go 429 服务中断 + Auto Router 不透明（#47613、#47794）、百炼计费投诉（Qwen #44）、提供商上报成本（Pi #6881）。第三方仪表盘正填补厂商留下的空缺。
- **审批/权限中间件——5 款工具。**Codex 通过 20+ 个 PR 整合了其 Guardian 子系统；OpenCode 将自动权限移至服务端（#47754）并新增插件权限断言（#46530）；Copilot 的 ACP 自动审批回归（#4537）从反面呈现了同一问题；Claude 的 Function Hooks（#91870）有望将这一模式正式定型；Gemini 则面临破坏性命令的隐忧（#22672）。
- **持久记忆与上下文压缩——4 款工具。**Claude #91913、Gemini 的 Auto Memory 工作流（#26516–#26525）、Qwen 的语义记忆提案（#10684）、OpenCode 的压缩三部曲（#47322–#47324）。

## 4. 差异化分析

- **Claude Code**——插件运行时深度是其战略押注（Function Hooks、技能、市场）。议题量与互动度最大，但 Windows 桌面端质量正在拖累品牌，提示词注入隐忧（#80818）属于信任级风险。
- **OpenAI Codex**——在安全中间件（Guardian V2 整合）与企业治理（签名工单 #37637/#37611）上投入独树一帜。新奇押注：桌面宠物/悬浮 UI 与 iOS 远程控制——目前两者都易出回归。缺少回退能力是其最大的竞争缺口。
- **Gemini CLI**——把 token 节俭写进架构：AST 感知读取（#22745）与模型优先的 bash 执行（#19873）直击每轮上下文成本，而非给工具加壳。自动化的 nightly 发布节奏彰显了扎实的 CI 纪律。
- **Copilot CLI**——聚焦编辑器集成的协议正确性（ACP 空闲/权限信号）与初露头角的扩展 SDK（#4746）。核心闭源；公开仓库实际充当分诊渠道，仅呈现 3 个 PR（其中一个纯属示例/玩笑）。
- **OpenCode**——定位为多提供商中间层；痛点集中在付费 Go 后端而非客户端。服务端/客户端分离扎实，力推插件 API，并推进 i18n（波斯语 README）。
- **Pi**——传输韧性工程（提供商回退链、DNS 固定、重试上限）与扩展契约的形式化。用户群小而精；修复延迟为全组最快。
- **Qwen Code**——架构差异化最强：守护进程编排（`qwen serve`）、Web Shell 工作流可视化、钉钉渠道集成，以及 CUA（computer-use）驱动。与中国生态深度契合；正在进行 ink→OpenTUI 渲染器迁移。

## 5. 社区势头与成熟度

- **量级领跑者：**Claude Code（单个议题 126 条评论/197 👍）与 Codex（119 👍 的讨论；单批合并 20+ 个 PR）——用户基数最大、内部工程产出最密集。
- **迭代最快：**Gemini CLI（nightly 发布）、Qwen Code（一天内 preview + 驱动 + nightly）、OpenCode（12+ 个 PR，含核心重构）。
- **Copilot CLI** 议题涌入量大但公开 PR 产出极少——与闭源核心的形态相符——其 1.1.15/1.0.83 回归集群（48 小时内 5+ 个议题）暴露出发布 QA 缺口。
- **Pi** 社区最小但响应最快：今日的热门 bug（Esc 取消、Copilot 路由、DNS）均已合并修复；知名从业者（mitsuhiko）的贡献提升了社区讨论的含金量。
- **成熟度悖论：**最严重的回归恰恰聚集在最成熟的版本上（Copilot 1.0.83、Claude Desktop v2.1.x），而 pre-1.0 工具（Gemini 0.60、Qwen 0.23）虽功能迭代频繁，每次发布对用户可见的破坏反而更少。

## 6. 趋势信号

1. **可扩展性正向中间件式 hooks 收敛**——Claude #91870、Pi 的扩展 API、OpenCode 的权限断言与 Codex 的扩展决策 API 正汇聚到同一形态：拦截、决策、审计副作用。
2. **审批/安全正在成为专职子系统**，而非提示词层面的关切——Codex 的 Guardian 整合是最清晰的例证；预计这一模式将扩散开来。
3. **代理回退已是标配。**Codex 社区呼声第一的诉求（119 👍）之所以存在，只因竞品早已上线该能力。
4. **可观测性缺口催生第三方生态**（CodexFuse、Blume.codes）——成本/配额 API 是厂商尚未兑现的机会。
5. **模型容量波动正在倒逼客户端侧韧性建设**——提供商回退链、有界自动重试（Qwen #10347）与多提供商路由，正成为对冲单一厂商故障（如今日 GPT-5/6 事件）的手段。
6. **协议迁移压力：**`chat/completions` → `responses` 正在切实破坏各类客户端（Codex #7782、Pi #9253）——基于 OpenAI 兼容接口构建的服务方应为这轮变动提前规划。
7. **终端 UI 框架正在向 OpenTUI 收敛**（Qwen 的迁移、OpenCode 的技术栈），使其成为后 Ink 时代的默认选择。
8. **后台/无头代理是下一个前沿**——守护进程工作负载（Qwen `serve`）、ACP 空闲信号与“Keep Waiting”自动接受（Codex #32139）都瞄准无人值守运行。
9. **Windows 仍是横跨全部七个社区、服务最不到位的最大可靠性面**——哪家厂商率先将其视为一等公民，谁就抓住了这个具体的机会。

---

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告
*数据截至 2026-09-07 | anthropics/skills 仓库*

---

## 1. 热门 Skills 排行榜

以下 PR 获得了最多社区关注。全部仍为 **OPEN** 状态，等待审核。

### 1.1 `skill-creator` 召回率 Bug 修复 — PR #1298
**作者:** MartinCajiao | [anthropics/skills#1298](https://github.com/anthropics/skills/pull/1298)
关键基础设施修复：`run_eval.py` 对每个 skill 描述都报告 `recall=0%`（已复现 10+ 次）。由于 `run_loop.py` 与 `improve_description.py` 都依赖这一信号，整个描述优化循环目前都是在对着噪声做调优。同时修复了 Windows 流读取、触发检测以及并行 worker 的 bug。**状态：OPEN。** 此 PR 解决了 Issue #556。

### 1.2 `document-typography` — PR #514
**作者:** PGTBoos | [anthropics/skills#514](https://github.com/anthropics/skills/pull/514)
一个质量控制类 skill，用于防止 AI 生成文档中的常见排版缺陷：孤立词换行（1–6 个单词溢出到下一行）、孤行章节标题以及编号错位。针对影响 Claude 生成的每一份文档的缺陷。**状态：OPEN。**

### 1.3 `scnet-hpc` — PR #1615
**作者:** lql341 | [anthropics/skills#1615](https://github.com/anthropics/skills/pull/1615)
用于操作 SCNet HPC 集群的 skill，通过基于配置文件的 SSH 与 Slurm 工作流。涵盖分区/内存/模块/加速器指导、集群发现以及计算节点诊断。代表了持续增长的领域特定工作流细分方向。**状态：OPEN。**

### 1.4 `ODT`（OpenDocument 格式）— PR #486
**作者:** GitHubNewbie0 | [anthropics/skills#486](https://github.com/anthropics/skills/pull/486)
新增对 OpenDocument（.odt/.ods/ODF）创作、模板填充以及 ODT→HTML 转换的原生支持。在提及 "ODT"、"OpenDocument"、"LibreOffice" 等关键词时触发。填补了与现有 DOCX/PDF skill 并列的、面向 ISO 标准开源办公格式的长期空白。**状态：OPEN。**

### 1.5 `frontend-design` 清晰度改进 — PR #210
**作者:** justinwetch | [anthropics/skills#210](https://github.com/anthropics/skills/pull/210)
修订 `frontend-design` skill，使每条指令都能在单次会话中执行。在不过度约束 Claude 的前提下，提升了内部一致性与行为具体性。**状态：OPEN。**

### 1.6 `skill-quality-analyzer` 与 `skill-security-analyzer` — PR #83
**作者:** eovidiu | [anthropics/skills#83](https://github.com/anthropics/skills/pull/83)
新增到 `example-skills` 的两个元 skill。第一个从五个维度（结构、文档、示例、资源、最佳实践）评估 skill；第二个扫描 skill 中的安全风险。直接回应了社区呼声最高的两个关切（安全信任边界——Issue #492；质量评估空白）。**状态：OPEN。**

### 1.7 `testing-patterns` — PR #723
**作者:** 4444J99 | [anthropics/skills#723](https://github.com/anthropics/skills/pull/723)
一个综合性测试 skill，涵盖 Testing Trophy 模型、AAA 模式、React 组件测试（Testing Library）、纯函数边界情况，以及*不应该*测试什么。**状态：OPEN。**

### 1.8 `Hivemind` 多智能体编排 — PR #1628
**作者:** Hanishchow | [anthropics/skills#1628](https://github.com/anthropics/skills/pull/1628)
让 Claude Code 将机械性任务委派给使用免费模型的无头 opencode worker，同时仍作为唯一的规划者/评审者/合并者。瞄准昂贵模型上下文这一稀缺资源瓶颈。反映出社区对零成本多智能体编排的浓厚兴趣。**状态：OPEN。**

---

## 2. 社区需求趋势

根据评论数最高的 Issue 提炼而成：

### 2.1 信任与安全边界（最高优先级）
- **[Issue #492](https://github.com/anthropics/skills/issues/492) — 43 条评论：** 以 `anthropic/` 命名空间分发的社区 skill 可被用于冒充官方 skill 并滥用提升后的权限。这是获赞最高的单一关切，表明社区强烈要求为第三方 skill 引入**审核/命名空间策略**。
- **[Issue #1175](https://github.com/anthropics/skills/issues/1175) — 4 条评论：** 在 SharePoint 集成的 `SKILL.md` 中嵌入访问控制逻辑时，对安全性与上下文窗口处理的担忧。

### 2.2 分发与共享
- **[Issue #228](https://github.com/anthropics/skills/issues/228) — 16 条评论：** 在 Claude.ai 中实现**组织内 skill 共享**的需求，无需通过 Slack/Teams 手动传输文件。8 个 👍 反应。
- **[Issue #189](https://github.com/anthropics/skills/issues/189) — 6 条评论：** `document-skills` 与 `example-skills` 插件安装了相同的内容，产生重复内容，膨胀上下文窗口。

### 2.3 评估基础设施可靠性
- **[Issue #556](https://github.com/anthropics/skills/issues/556) — 12 条评论：** `run_eval.py` 中的 `claude -p` 永远不触发 skill/命令 → 所有查询的触发率均为 0%。推动了 PR #1298、PR #1099 与 PR #1050。
- **[Issue #1390](https://github.com/anthropics/skills/issues/1390) — 4 条评论：** `mcp-builder/evaluation.py

---

# Claude Code 社区简报 — 2026-09-07

## 今日要点

社区正围绕 **#91870 "Function Hooks"** 讨论得热火朝天 —— 这是一项影响深远的增强提案，允许插件通过带副作用追踪的中间件式钩子来改变 Claude Code 的行为，自 9 月 3 日以来已吸引 126 条评论和 79 个 👍。另一方面，**一批 Windows 桌面端回归问题**（窗口置顶、MSIX 锁定、更新失败）占据了缺陷报告的主导地位，而贡献者 **AZERDSQ131** 的多项插件开发修复正在 security-guidance、hookify 和 ralph-wiggum 中迅速落地。

## 版本发布

过去 24 小时内没有新版本发布。

## 热门 Issue

1. **[#91870 — Function Hooks: make plugins 10x more powerful](https://github.com/anthropics/claude-code/issues/91870)** — Express/Koa 风格的钩子链式调用，支持参数化的 `$` 对象与副作用追踪。4 天内收获 126 条评论和 79 个 👍，是本周讨论热度最高的帖子，有可能重塑插件的可扩展性。*状态：OPEN，enhancement。*

2. **[#85891 — Claude Desktop stays always-on-top on Windows 11](https://github.com/anthropics/claude-code/issues/85891)** — 89 条评论，197 个 👍 —— 点赞数最高的活跃 issue。应用内没有关闭置顶行为的开关；虽被标记为 `invalid`，但热度仍在持续攀升，表明社区并不认同这一处理结论。*状态：OPEN，已标记 invalid。*

3. **[#53247 — Claude Desktop fails to launch on Windows (HRESULT 0x80070020)](https://github.com/anthropics/claude-code/issues/53247)** — 崩溃后残留的孤儿 AppX 作业对象依然存活，只有注销/重启才能恢复。69 条评论，29 个 👍。*状态：OPEN，bug。*

4. **[#74715 — "Always allow" Claude-in-Chrome permissions persist as `once`](https://github.com/anthropics/claude-code/issues/74715)** — 已批准站点列表始终为空，导致用户每次操作都要重新授权。这是浏览器扩展的一个回归问题。*状态：OPEN。*

5. **[#76694 — Cowork lost "Choose a folder" after Chat/Cowork merge](https://github.com/anthropics/claude-code/issues/76694)** — 上下文菜单被替换为仅支持上传的知识库菜单，用户无法让新项目指向本地文件夹。*状态：OPEN，macOS。*

6. **[#90102 — Slash command autocomplete regression mid-input](https://github.com/anthropics/claude-code/issues/90102)** — v2.1.0 中正常，v2.1.136 中修复，到 v2.1.228 又再次回归。这是一个有用的信号：自动补全回归测试没有捕获到中间件层级的变更。*状态：OPEN，TUI。*

7. **[#92080 — Fable 5.1 weekly limit invisible to CLI](https://github.com/anthropics/claude-code/issues/92080)** — 客户端收到了限额信息，将其标记为 'Fable' 后便丢弃。订阅用户会无声无息地撞上速率限制墙，statusline 和 `/usage` 均毫无显示。*状态：OPEN，duplicate。*

8. **[#91763 — `git fsmonitor--daemon` blocks MSIX relaunch](https://github.com/anthropics/claude-code/issues/91763)** — 守护进程继承了 AppX 容器作业对象，强制关闭后依然存活，并以 0x80070020 锁死新版本。包含根因分析 + 免重启的变通方案。*状态：OPEN，Windows。*

9. **[#87106 — Resuming completed subagents replays full transcripts](https://github.com/anthropics/claude-code/issues/87106)** — 一下午就烧掉了每周限额的 75%。指出了经由 `SendMessage` 重试造成的成本放大问题。*状态：OPEN。*

10. **[#80818 — Spurious "Exited Plan Mode" / "Auto Mode Active" notifications](https://github.com/anthropics/claude-code/issues/80818)** — 在 v2.1.186–v2.1.218 各版本中由提示词组装层注入，引发了对提示词注入的担忧。*状态：OPEN，core。*

## 重点 PR 进展

1. **[#26175 — fix: replace broken native installer bootstrap script](https://github.com/anthropics/claude-code/pull/26175)** — `curl … | bash` 会在静默中删除已有的 npm 安装，却又未能创建 `~/.local/bin/claude`。对官方安装路径而言是一次重要修复。*状态：CLOSED。*

2. **[#39043 — Remove "retro-futuristic" recommendation from Frontend Design Skill](https://github.com/anthropics/claude-code/pull/39043)** — 纯风格层面的清理；之所以引人注目，是因为 t3dotgg 的 PR 标题只有一句 "Trust me on this one."。*状态：OPEN。*

3. **[#87079 — fix(security-guidance): make `**` glob patterns match zero-depth paths](https://github.com/anthropics/claude-code/pull/87079)** — `fnmatch` 的语义意味着 `**/*.ts` 不包含顶层文件，安全规则因此静默漏检。*状态：OPEN。*

4. **[#68707 — feat(bug-reporter): add `/bug` command](https://github.com/anthropics/claude-code/pull/68707)** — 可直接从终端提交 GitHub issue —— 对 issue 提交闭环而言是一次显著的 UX 改进。*状态：CLOSED。*

5. **[#68786 — fix(plugin-dev): shell injection via stdin redirection in test-hook.sh](https://github.com/anthropics/claude-code/pull/68786)** — 一次真正的安全修复，针对 `bash -c` 字符串中单引号内嵌入的 `$TEST_INPUT`。

6. **[#68702 — fix(ralph-wiggum): guard PROMPT_PARTS against `set -u` on macOS bash 3.x](https://github.com/anthropics/claude-code/pull/68702)** — 一处单字符修复，让插件在 macOS 默认 bash 上恢复正常安装。

7. **[#68701 — fix(security-guidance): strip CRLF from Python version probe on Windows](https://github.com/anthropics/claude-code/pull/68701)** — `\r\n` 行尾符曾导致版本比较出错。

8. **[#68689 — fix(security-guidance): block symlink escape in extensibility config reads](https://github.com/anthropics/claude-code/pull/68689)** — 防止经由符号链接的 `.claude/claude-security-guidance.md` 外泄 `~/.ssh/id_rsa`。

9. **[#68699 — fix(hookify): Python wrapper + normalize plugin root paths on Windows](https://github.com/anthropics/claude-code/pull/68699)** — 解决了反斜杠路径分隔符，以及 MS Store `python3` 存根以退出码 49 退出的问题。

10. **[#68693 — fix(scripts): add duplicate label additively, not replace existing labels](https://github.com/anthropics/claude-code/pull/68693)** — `closeIssueAsDuplicate` 此前在关闭 issue 时会覆盖掉 platform/area/priority 标签。

*注：AZERDSQ131 于 2026-06-15 提交的一大批评 15+ 个已关闭 PR 均在本窗口期内合并 —— 它们共同加固了 plugin-dev、hookify、security-guidance 和 ralph-wiggum 插件，修复了 CI 脚本，并纠正了 Claude Desktop issue 的分诊逻辑（#68678）。*

## 功能请求趋势

- **插件可扩展性层**无疑是当下压倒性的主题 —— #91870（Function Hooks）、#86763（独立的 skill 调用路径）、#84495（插件市场 SSH）和 #91417（插件命名空间下的 skill 补全）都在推动一个更丰富的插件运行时。
- **跨会话记忆与上下文** —— #91913（持久化 CLI 记忆）、#90887（提交时由 harness 强制执行的对抗式审查）。
- **多设备与远程工作流** —— #92416（移动端 Remote Control 会话接管，与 Codex 对齐）。
- **UI 信息密度与降噪** —— #73413（VS Code 对话记录视图模式：Summary / Normal / Verbose）。
- **成本透明度** —— #92080（在 `/usage` 中显示 Fable 每周限额）、#87106（子代理恢复成本）。

## 开发者痛点

- **Windows 桌面端可靠性**问题主导着 issue 跟踪器：窗口置顶（#85891、#87895）、残留的 AppX/MSIX 作业对象（#53247、#91763）、损坏的更新流程（#92099）、Windows 特有的钩子路径处理（#68694、#68699）。
- **认证与上手阻力** —— #79808 报告验证邮件被静默吞掉，且没有任何可通过客服升级处理的途径。
- **溜过版本发布的 TUI 回归** —— 斜杠命令自动补全（#90102）、Linux 上向上复制（#92653）、Bash 工具的 stdout 从不显示（#86853）。
- **成本/配额不透明** —— 子代理恢复重放（#87106）和不可见的 Fable 限额（#92080）让规划长会话变得有风险。
- **提示词卫生隐忧** —— 虚假的 "Plan Mode / Auto Mode" 注入（#80818、#92659）拉响了提示词注入的警报，并侵蚀着用户对系统通知的信任。
- **Git/提交署名** —— 尽管设置了 `includeCoAuthoredBy: false`，`Claude-Session:` 尾注仍被追加（#91546），这是 #66504 的一次回归。

---

*本简报基于 GitHub 上 anthropics/claude-code 仓库 2026-09-07 的数据生成。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区动态 — 2026-09-07

## 今日要点

今日的活动主要由 Codex 内部对 Guardian 审批/审查子系统的协同清理工作主导（合并了 20+ 相关 PR），同时 Windows 和 WSL 的缺陷报告激增，影响项目创建、rollout 分页以及桌面宠物。在模型侧，多个 GPT-5/6 层级模型在 Pro 和 Pro 20x 套餐上均报告 "Selected model is at capacity"，而社区对 `/rewind` 以及宠物/输入修复的需求持续上升。

## 版本发布

过去 24 小时内无新版本发布。

## 热门 Issue

1. **[#36040](https://github.com/openai/codex/issues/36040) — iOS 远程仅列出有近期聊天的项目（34 条评论）**
   ChatGPT 移动端 iOS 26 上的远程控制与 macOS Codex 主机配合时出现回归，会隐藏没有活跃聊天记录的项目。关注度高，因为它阻塞了文档中"使用 iPhone 操控桌面 Codex"的工作流。

2. **[#41463](https://github.com/openai/codex/issues/41463) — Windows + WSL：因 `AbsolutePathBuf` 反序列化失败导致无法创建项目（33 条评论，👍23）**
   Windows 10/11 + WSL2 上的 Codex Desktop 因 `AbsolutePathBuf` 在反序列化时缺少基础路径而无法引导项目。社区反应强烈；这是 Windows 桌面引导流程的阻塞性问题。

3. **[#41566](https://github.com/openai/codex/issues/41566) — Windows：分页 rollout 在未完成 turn 后产生重复序号（20 条评论）**
   Codex rollout 分页中的 `duplicate ordinal` 缺陷会在中断 turn 之后永久冻结 Windows 上的会话历史投影。与 #42027 和 #42387 属于同一类问题——看起来是 rollout 文件轮转的系统性问题。

4. **[#42661](https://github.com/openai/codex/issues/42661) — Windows 宠物：输入区域偏移 + 重启后点击穿透（17 条评论，👍3）**
   在启用 DPI 缩放的多显示器 Windows 环境下，桌面宠物的命中测试区域会偏离其渲染位置，并在重启后恢复为点击穿透状态，导致完全无法交互。

5. **[#32139](https://github.com/openai/codex/issues/32139) — TUI：自动接受 "Keep Waiting" 提示（13 条评论，👍23）**
   长时间运行的工具调用经常会弹出 "Keep Waiting?" 提示，打断高级用户的操作流程。需求是在模型端做出决策后自动接受额外的等待时间。社区支持度很高（23 👍）。

6. **[#40902](https://github.com/openai/codex/issues/40902) — Windows 26.820.60940 回归：Java NIO `Selector.open` 失败（13 条评论，👍3）**
   安装 Codex App 26.820.60940 后，Java NIO 无法打开选择器，提示 "Unable to establish loopback connection"，导致所有使用 Java NIO 及嵌入式 app-server 的工具失灵。

7. **[#30043](https://github.com/openai/codex/issues/30043) — macOS：从 Codex 沙箱启动的 GUI 应用在 `_RegisterApplication` 处中止（12 条评论，👍3）**
   沙箱启动的 macOS GUI 应用（Chrome、LibreOffice）会立即以 SIGABRT 崩溃。这一点很重要，因为沙箱对应用启动本应是透明的。

8. **[#10486](https://github.com/openai/codex/issues/10486) — 计划模式：将计划导出为 Markdown（12 条评论，👍23）**
   高赞特性请求，希望在计划模式中添加一键"导出计划"操作，以便无需手动复制粘贴即可保存或分享计划。

9. **[#43398](https://github.com/openai/codex/issues/43398) — GPT-5.5、GPT-5.6-Sol、GPT-6 Astra 均显示容量已满（2026 年 9 月 7 日）（12 条评论，👍5）**
   Pro 20x 用户报告仅 `gpt-5.4-mini` 可用；所有更高层级模型均返回 "Selected model is at capacity"。这是今日多条几乎同时出现的容量报告之一。

10. **[#43375](https://github.com/openai/codex/issues/43375) — 多个 GPT-5/GPT-6 模型返回 "Selected model is at capacity"（12 条评论）**
    确认 #43398 是 9 月 7 日跨 GPT-5 和 GPT-6 系列的更大范围故障模式，而非单一模型问题。

## 重要 PR 进展

1. **[#43462](https://github.com/openai/codex/pull/43462) — 移除遗留的 Guardian 审批审查路径**
   删除旧的 `fast_decision`/`full_review` 钩子以及重复的 Guardian V2 快速审批实现，使 `ApprovalReviewContributor::decide` 成为唯一的审批接口。

2. **[#43458](https://github.com/openai/codex/pull/43458) — 集中管理 Guardian 上下文模式与检查点策略**
   在每个会话中仅解析一次 `GuardianContextMode`，并在历史保留、回放、证据采集、压缩和审查之间共享——消除每次调用重新推导导致的缺陷。

3. **[#43432](https://github.com/openai/codex/pull/43432) — 通过扩展决策 API 路由审批**
   扩展现在可以选择缓存审批、同步审查或用户提示；核心仍强制执行强制 Guardian 和新鲜审查的要求。

4. **[#43447](https://github.com/openai/codex/pull/43447) — 将 MCP elicitations 路由至共享审批决策路径**
   MCP elicitations 现在通过 `decide_approval` 进行处理，携带有效的审批策略、审查者以及同步审查要求；不支持的表单/URL elicitations 则保留供用户审查。

5. **[#43442](https://github.com/openai/codex/pull/43442) — 保持 Guardian 审查证据一致并拒绝过期审批**
   修复了一处竞态：并发父压缩可能在检查点选择与提示构建之间移除证据，以及审查期间的新用户输入可能使审批失效。

6. **[#43444](https://github.com/openai/codex/pull/43444) — 固定 V8 发布清单并禁止覆盖已发布的版本**
   将可信的 V8 工件摘要记录到代码库中，并禁止覆盖已发布的版本资源——填补了仅依赖校验和验证留下的供应链缺口。

7. **[#43428](https://github.com/openai/codex/pull/43428) — 向已启用的 stdio MCP 服务器通知认证变更**
   通告实验性的 `codex/auth-change` 能力，并在初始化时及后续认证变更时推送 `notifications/codex/authChanged`，凭据已做脱敏处理。

8. **[#43452 / #43352](https://github.com/openai/codex/pull/43352) — 新增可选的 MCP 用户验证传输**
   添加类型化的 `openai/userVerification` elicitations（title/message/url），使设备认证流程能够展示真正的 UI 提示，而不是被自动取消。

9. **[#43408](https://github.com/openai/codex/pull/43408) — 避免 Guardian v2 分类中的 WebSocket 等待**
   当连接池中没有健康的空闲 WebSocket 时回退到 HTTP 流式传输，并异步补充连接池——防止分类过程因握手而停滞。

10. **[#43360](https://github.com/openai/codex/pull/43360) — 使用 app-server 元数据进行 TUI 会话恢复**
    将工作目录和模型提供方从 `thread/list` / `thread/read` 传递到 resume/fork 流程，使 TUI 不再依赖与服务器状态可能不一致的本地猜测。

*(同一批次的相关 PR：[#43456](https://github.com/openai/codex/pull/43456) 模型切换测试中的 thread-idle 等待；[#43454](https://github.com/openai/codex/pull/43454) 标记的 shell-snapshot 采集指标；[#43423](https://github.com/openai/codex/pull/43423)/[#43421](https://github.com/openai/codex/pull/43421) app-server 文档/README 清理；[#43426](https://github.com/openai/codex/pull/43426) guardian 测试中的 Luna HTTP 处理；[#43376](https://github.com/openai/codex/pull/43376) 将 resume 选择器推迟到全新 TUI 栈；[#43359](https://github.com/openai/codex/pull/43359) `/status` 中的服务器端 provider ID；[#43355](https://github.com/openai/codex/pull/43355) CLI fork 上的服务器解析隐式模型设置；[#43340](https://github.com/openai/codex/pull/43340) TUI 中远程命名权限配置选择。)*

## 热门讨论

### Ideas

- **[#9618 — 怎么还没有 `/rewind` 或 `/revert` 功能？（20 条评论，👍119)](https://github.com/openai/codex/discussions/9618)**
  迄今为止仓库中点赞数最高的开放讨论。用户将 Codex 与 OpenCode 和 Claude Code 进行对比，两者都支持撤销 agent 的更改；没有这一功能，Codex 在处理复杂工作时几乎被视为不可用。

- **[#7366 — 引用被 gitignore 的文件（👍7）](https://github.com/openai/codex/discussions/7366)**
  允许 `@` 引用 `.gitignore` 中的文件，因为 "gitignored" 意味着"不要提交"，而非"不要读取"。

- **[#37611 — 用于受治理访问高能力 Codex 模型的签名企业工单](https://github.com/openai/codex/discussions/37611)**
  一位企业运维人员提议使用可签名、可审计的工单，使受治理客户能够在不绕过网络安全策略的前提下访问高能力模型（Astra 层级及以上）。

### Q&A

- **[#43257 — 实验性上下文管理如何将历史查询计入 Codex 用量限制？](https://github.com/openai/codex/discussions/43257)**
  使用 macOS GPT-6 Astra 的 Pro 用户询问，在上下文管理期间重新获取历史的多日会话会如何影响其用量额度。尚无答复——与今日的限速讨论相关。

### Show and tell

- **[#41157 — CodexFuse 1.2.0（本地 Windows Codex 限速仪表盘）](https://github.com/openai/codex/discussions/41157)**
   无需安装、无需 API key 的 Windows 托盘仪表盘，显示已用/可用配额、下次重置时间以及每小时用量（PT/EN）。

- **[#43224 — NULLYARD：带静态集成指南的公共 MCP 板](https://github.com/openai/codex/discussions/43224)**
  运维人员构建的纯文本 MCP 板，提供公开的 `skill.md` 和 `mcp.md`，无需登录。

- **[#43427 — Blume.codes：将编码 agent 会话转化为更好的规则与技能](https://github.com/openai/codex/discussions/43427)**
  从过往 Codex/agent 会话中挖掘可复用规则与技能的工具，作者动机来自其前一次创业中对 agent 漂移问题的感受。

### General

- **[#7782 — 在 Codex 中弃用 `chat/completions` 支持（👍21）](https://github.com/openai/codex/discussions/7782)**
  提醒：OpenAI 建议迁移至 `responses` API 以应对推理、多轮和工具调用工作流。

## 特性请求趋势

- **Agent 撤销 / 回退**（#9618，119 👍）—— 遥遥领先的第一社区诉求；被视为相对于竞品 agent 的基础能力。
- **计划模式体验优化** —— 导出为 Markdown（#10486，23 👍）表明用户希望计划模式成为一等产物，而非一个临时步骤。
- **TUI 摩擦降低** —— 自动接受 "Keep Waiting"（#32139，23 👍）以及更广泛的 TUI 栈/延迟改进（#43376）反映出对减少长时间运行流程被打断的需求。
- **MCP 作为一等协议** —— 多项 PR（认证变更通知、用户验证传输、共享审批路由）加上新的社区 MCP 板（NULLYARD），表明 MCP 正成为主要的集成界面。
- **企业治理** —— 用于高能力模型的签名工单（#37611）表明企业用户希望以可审计、符合策略的方式访问 GPT-6 Astra 及更高层级。
- **"宠物" / 浮层 UI 的更好输入处理** —— Windows 宠物命中测试（#42661、#42190）和 macOS `Ctrl+Space` 冲突（#42258，23 👍）表明桌面伴随 UI 仍需操作系统级的打磨。

## 开发者痛点

- **Windows + WSL 作为一等环境。** 项目引导（#41463）、Node REPL 沙箱路径（#29413）、浏览器插件引导（#35224）以及 app-server 启动（#40972）中反复出现的破坏，使得 Windows + WSL 成为最脆弱的支持组合。
- **Rollout 文件分页与投影。** Windows 上多起事件（#41566、#42027、#42387），中断 turn 后出现重复序号会永久破坏聊天历史——显然是系统性问题，而非偶发的损坏。
- **Windows 桌面宠物与浮层。** 命中测试、拖拽/缩放、重启持久化（#42661、#42190、#42813、#42258）都在持续回归。
- **容量 / 限速可见性。** 今日多个 GPT-5/6 层级的 "Selected model is at capacity"（#43398、#43375、#43455），加上 Astra 上本地遥测与实际消耗配额不一致（#43222、#43230），让用户难以判断实际可用配额。
- **Windows 上的 Java/嵌入式运行时。** NIO 选择器回归（#40902）以及 macOS 上持续存在的"幽灵"会话（#41987）表明捆绑运行时栈中存在生命周期缺陷。
- **设置静默回滚。** `sansFontSize` 在升级后重置（#39781）；Windows 重启后项目被遗弃（#19615）——基础状态持久化仍不均衡。
- **文档漂移。** 移除 app-server README 及其 `AGENTS.md` 引用（#43421、#43423）表明代码库中累积了与实现不再匹配的文档，新贡献者首当其冲受到影响。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-07

## 今日要点

v0.60.0 夜间版 (g85aca163f) 已于凌晨发布，包含常规的自动版本号更新和依赖刷新，而工程团队的注意力则集中在代理可靠性上：本周期最受关注的 issue 都围绕 **MAX_TURNS 后的子代理恢复** (#22323)、**通用代理挂起** (#21409) 以及 **浏览器代理在 Wayland 和设置覆盖下的稳定性** (#21983, #22267)。与此同时，一批新 PR 也已合并或提交，针对跨平台换行符 bug、符号链接工作区根目录、MCP 工具名冲突以及 EOL Node 20 沙箱镜像等问题，预示着面向 0.60 的质量与平台兼容性清扫工作正在展开。

---

## 发布版本

- **v0.60.0-nightly.20260907.g85aca163f** — 自动夜间发布。相对于昨晚的差异为增量更新；完整变更日志：[compare view](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f)。对应的版本号更新 PR：[#29233](https://github.com/google-gemini/gemini-cli/pull/29233)。

---

## 热门 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — MAX_TURNS 后子代理仍报告 GOAL 成功** *(p1, agent, 13 评论)*
   当子代理（如 `codebase_investigator`）达到回合上限时，仍会返回 `status: "success"` 并附带 `Termination Reason: "GOAL"`，掩盖了实际的中断。该问题关注度高，因为它直接破坏了各类工作流中所依赖的子代理可信度信号。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用代理无限挂起** *(p1, agent, 8 评论, 👍8)*
   当模型回退到通用代理时，连创建文件夹这样的简单任务也会冻结超过一小时。通过禁用子代理委托这一临时绕过方案可确认问题出在委托路径上。

3. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令完成后仍卡在"Waiting input"** *(p1, core, 4 评论, 👍3)*
   CLI 命令结束后，Gemini 仍将 shell 标记为活动状态，等待用户输入。这一问题在简单命令下反复出现，是会话卡死的常见来源。

4. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子代理在 Wayland 下失败** *(p1, agent/browser, 4 评论)*
   Linux/Wayland 用户看到浏览器代理以 `Termination Reason: GOAL` 结束，但实际上并未完成任何工作。对跨平台一致性而言至关重要。

5. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖 OS 沙箱化与执行后意图路由** *(p2, agent, 9 评论)*
   愿景层面的提案：借助 Gemini 3 原生的 bash 亲和力（grep/cat/sed/awk）配合操作系统级沙箱，去除模型侧工具包装层的必要性。一个高杠杆的架构设想。

6. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC：基于 AST 的文件读取、搜索与映射** *(p2, agent, 7 评论)*
   用于评估 `tilth` / `glyph` 等工具的跟踪项，目标是实现精确的方法边界读取和代码库映射，避免一次性灌入大量上下文。与 token 节约工作直接相关。

7. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 很少调用自定义技能 / 子代理** *(p2, agent, 6 评论)*
   虽属零散反馈但高度一致：除非被明确告知使用，否则模型会忽略描述良好的自定义技能。削弱了技能系统的价值。

8. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — 代理应停止破坏性行为** *(p2, agent, 3 评论, 👍1)*
   在存在更安全替代方案的情况下，模型仍会使用 `git reset --force` 或执行破坏性数据库操作。涉及重要的安全问题。

9. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) — 浏览器代理：自动会话接管与锁恢复** *(p3, agent, 4 评论)*
   当前对已锁定浏览器配置的"快速失败"机制阻碍了持久化会话。希望为 `BrowserManager.ts` 增加自动接管 / 孤立会话恢复能力。

10. **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079) — `~/.gemini/agents/` 中的符号链接代理文件无法被发现** *(p2, agent, 4 评论)*
    通过符号链接维护 dotfiles 的用户无法让自己的代理定义被识别——一个虽小但反复让人意外的小痛点。

*（同样值得关注：[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) Auto Memory 的确定性脱敏，[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) Auto Memory 重试风暴，[#26516](https://github.com/google-gemini/gemini-cli/issues/26516) 内存系统 bug 跟踪项，[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) 超过 128 个工具时的 400 错误，[#23571](https://github.com/google-gemini/gemini-cli/issues/23571) 临时脚本泛滥。）*

---

## 关键 PR 进展

1. **[#29209](https://github.com/google-gemini/gemini-cli/pull/29209) — 跳过非数字的后台 PID 行 (CLOSED)**
   防止杂散的 sysmond/警告行将 `NaN` 输出到 `llmContent`，并补充了回归测试。修复 [#29042](https://github.com/google-gemini/gemini-cli/issues/29042)。

2. **[#28975](https://github.com/google-gemini/gemini-cli/pull/28975) — 为符号链接工作区根目录保留 glob 结果 (CLOSED)**
   在 macOS 上，`/tmp` → `/private/tmp` 的符号链接曾导致 `glob` 错误地返回 `No files found`。此次修复恢复了默认工作区路径下的正确行为。

3. **[#28971](https://github.com/google-gemini/gemini-cli/pull/28971) — 保持截断后的 MCP 工具名唯一 (CLOSED)**
   原先 30+30 截断方式并非单射，导致不同的 MCP 工具被合并到同一个注册项中；现已实现防冲突处理。

4. **[#28983](https://github.com/google-gemini/gemini-cli/pull/28983) — 检测混合换行符而非仅在单次匹配时识别 CRLF (CLOSED)**
   `detectLineEnding()` 此前对 CRLF 过于激进；现在能够正确处理混合换行符的文件。

5. **[#28978](https://github.com/google-gemini/gemini-cli/pull/28978) — 补充缺失的 `HookDecision` 值文档 (CLOSED)**
   Hooks 参考文档现在覆盖了 `ask` 和 `approve` 两个已有但此前未文档化的决策值。

6. **[#28972](https://github.com/google-gemini/gemini-cli/pull/28972) — 对非正数 `maxChars` 为 `formatTruncatedToolOutput` 增加防御 (CLOSED)**
   新增 `maxChars > 0` 的检查，防止头部/尾部切片损坏以及 Infinity 输出。修复 [#28620](https://github.com/google-gemini/gemini-cli/issues/28620)。

7. **[#28973](https://github.com/google-gemini/gemini-cli/pull/28973) — 将沙箱镜像从 EOL 的 `node:20-slim` 升级到 `node:22-slim` (CLOSED)**
   安全卫生改进：Node 20 已于 2026-04-30 达到 EOL。沙箱 Dockerfile 现基于 Node 22 构建。

8. **[#29134](https://github.com/google-gemini/gemini-cli/pull/29134) — 防止 `--delete-session` 影响活动会话 (OPEN)**
   将活动会话 ID 贯穿到 list/delete 路径中，并通过短 ID 后缀匹配以避免误判。修复 [#29133](https://github.com/google-gemini/gemini-cli/issues/29133)。

9. **[#29132](https://github.com/google-gemini/gemini-cli/pull/29132) — 规范化 diff 上下文片段中的换行符 (OPEN)**
   避免 Windows 编辑场景下 `getDiffContextSnippet` 将整个 CRLF 文件 100% 倾倒出来。修复 [#29130](https://github.com/google-gemini/gemini-cli/issues/29130)。

10. **[#29229](https://github.com/google-gemini/gemini-cli/pull/29229) — 在设置编辑器中拒绝非有限数 (OPEN)**
    `parseEditedValue('number', ...)` 此前仅过滤 `NaN`；`1e309` 会悄悄存为 `null`。现已改用 `Number.isFinite`。修复 [#29226](https://github.com/google-gemini/gemini-cli/issues/29226)。

*（同样已合并/进行中：[#29137](https://github.com/google-gemini/gemini-cli/pull/29137) Dependabot npm 批量升级（77 个包），[#29230](https://github.com/google-gemini/gemini-cli/pull/29230) 失效锚点文档修复，[#29231](https://github.com/google-gemini/gemini-cli/pull/29231) 过期 JSDoc 参数，[#28982](https://github.com/google-gemini/gemini-cli/pull/28982) Build Remote Agent 手机配对扩展。）*

---

## 功能请求趋势

- **AST 感知的工具集是本周期呼声最高的主题** ([#22745](https://github.com/google-gemini/gemini-cli/issues/22745), [#22746](https://github.com/google-gemini/gemini-cli/issues/22746), [#19561](https://github.com/google-gemini/gemini-cli/issues/19561))。开发者希望获得精确的方法/符号边界读取，从而削减每回合 token、减少文件定位错乱造成的反复操作。

- **持久化、基于文件的任务追踪** 正在反复成为 `WriteToDo` 的替代目标 ([#18836](https://github.com/google-gemini/gemini-cli/issues/18836), [#21000](https://github.com/google-gemini/gemini-cli/issues/21000))——驱动力来自"上下文腐烂"以及会话间的完全记忆丢失。

- **子代理可观测性与轨迹共享** ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598), [#21763](https://github.com/google-gemini/gemini-cli/issues/21763))——为子代理提供 `/chat share`，并让 `/bug` 报告包含更丰富的子代理上下文。

- **Auto Memory 的质量与安全性** 作为一个完整工作流 ([#26516](https://github.com/google-gemini/gemini-cli/issues/26516), [#26522](https://github.com/google-gemini/gemini-cli/issues/26522), [#26523](https://github.com/google-gemini/gemini-cli/issues/26523), [#26525](https://github.com/google-gemini/gemini-cli/issues/26525))：脱敏、重试风暴、无效 patch 处理以及日志卫生。

- **原生模型优先的执行方式** ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873))——充分利用 Gemini 3 的 bash 训练，而非对每个 shell 调用都套一层包装。

- **浏览器代理成熟度** ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232), [#22267](https://github.com/google-gemini/gemini-cli/issues/22267))——会话接管、锁恢复，以及正确的 `settings.json` 覆盖传播。

- **代理自我认知** ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432))——准确回忆 CLI flag 与快捷键，让代理能够作为自身的使用向导。

---

## 开发者痛点

- **子代理可靠性是头号痛点。** 挂起 ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409))、终止时误报成功 ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323))，以及对可用技能/代理莫名不使用 ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968))——这是同一信任与路由缺口的三个不同症状。

- **浏览器代理在 Linux 上脆弱且忽略用户配置** —— Wayland 失败 ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)) 以及 `settings.json` 覆盖被静默丢弃 ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267))。

- **命令完成后 Shell/工具挂起** —— 多例报告称 "Waiting input" 在命令退出后仍然持续 ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166))，迫使用户手动取消。

- **跨平台换行符与符号链接 bug** —— 频繁到需要三个独立 PR ([#28983](https://github.com/google-gemini/gemini-cli/pull/28983), [#28975](https://github.com/google-gemini/gemini-cli/pull/28975), [#29132](https://github.com/google-gemini/gemini-cli/pull/29132))。macOS 的 `/tmp` 与 Windows 的 CRLF 是两大重灾区。

- **设置编辑器的静默损坏** ([#29229](https://github.com/google-gemini/gemini-cli/pull/29229))——像 `1e309` 这样的值在通过校验后被悄悄存为 `null`。

- **朴素读取导致的上下文爆炸** ([#19561](https://github.com/google-gemini/gemini-cli/issues/19561), [#23571](https://github.com/google-gemini/gemini-cli/issues/23571))——大文件读取与临时脚本泛滥推高了每回合的 token 成本，也让工作区清理更复杂。

- **破坏性命令的安全问题** ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672))——用户希望代理在无显式指令的情况下也能默认采用安全的 git/数据库操作。

---
*本摘要基于 google-gemini/gemini-cli 在 2026-09-07 的 GitHub 活动生成。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-07

## 今日要点

社区的关注点集中在刚发布的 **Desktop 应用 1.1.15 / CLI 1.0.83** 版本线上的一连串回归问题——多名用户报告 Windows/macOS 桌面应用出现会话创建失败、ACP 模式静默自动批准工具调用，以及 `session resume` 过早取消 MCP 连接等情况。MCP 与 ACP 集成仍然是最脆弱的领域，过去 48 小时内就有三个独立的回归问题被提交。

## 版本发布

_过去 24 小时内没有新版本发布。_

## 热门 Issue

1. **[#4742](https://github.com/github/copilot-cli/issues/4742)** —— Desktop 1.1.15:当一个 Local 会话正在运行时，无法创建第二个 Local 会话。阻碍了核心的多会话工作流，由高级用户提交。(OPEN)
2. **[#4753](https://github.com/github/copilot-cli/issues/4753)** —— v1.0.83:`session resume` 会取消正在运行中的 stdio MCP 服务器(超时从 ~16s 骤降至 ~1s)。这是会话处理行为的直接回归，会静默禁用 MCP 工具。(OPEN, 👍 1)
3. **[#4681](https://github.com/github/copilot-cli/issues/4681)** —— 登录后发出的 MCP OAuth `initialize` 请求丢失了 `User-Agent` 头，导致远程 MCP 服务器的自定义请求头认证失效。(OPEN)
4. **[#4749](https://github.com/github/copilot-cli/issues/4749)** —— Azure MCP 的 `learn=true` 调用在 CLI 1.0.83-5 中现在会在 180s 处超时(在 1.0.80 中工作正常)。这是一个清晰的回归案例，将问题定位到 v1.0.83 的 MCP 传输层变更。(OPEN)
5. **[#4537](https://github.com/github/copilot-cli/issues/4537)** —— ACP 模式再次自动批准工具调用(#845 的回归);shell/文件编辑在无人值守的情况下运行，且没有触发 `session/request_permission` 事件。(OPEN, 👍 2)
6. **[#4555](https://github.com/github/copilot-cli/issues/4555)** —— ACP 的 `session/prompt` 会无条件中止会话，导致后台子代理被终止。交互式 TUI 不受影响，可将该 bug 定位到 ACP。(OPEN)
7. **[#4743](https://github.com/github/copilot-cli/issues/4743)** —— ACP 在后台 shell 仍在运行时就返回 `end_turn`;观察不到任何空闲信号。这进一步加剧了 ACP 的痛点集群。(OPEN)
8. **[#4757](https://github.com/github/copilot-cli/issues/4757)** —— `--yolo`/`--allow-all` 在整个会话范围内被阻断，原因是施加了一项“默认拒绝”(fail-closed)限制，即使对没有托管策略的账户也同样生效。(OPEN)
9. **[#4756](https://github.com/github/copilot-cli/issues/4756)** —— Windows 应用(1.1.15)要求先将每个空闲会话归档，才能新建 Local 会话；这是 1.1.15 又一个会话管理回归。(OPEN)
10. **[#4755](https://github.com/github/copilot-cli/issues/4755)** —— 当排队通道中的消息恰好在回合结束时到达，会话会永久卡死；空闲收尾(idle finalization)被抑制，队列永远无法清空——只能通过杀掉进程来恢复。(OPEN)

*另值得关注：* [#1665](https://github.com/github/copilot-cli/issues/1665)(项目作用域插件，经过长时间讨论后 CLOSED——👍 18、14 条评论，是当日最强的社区信号)、[#2644](https://github.com/github/copilot-cli/issues/2644)(Shift+Arrow / Ctrl+A 文本选择)、[#4709](https://github.com/github/copilot-cli/issues/4709)(多仓库 worktree 关联)、[#4750](https://github.com/github/copilot-cli/issues/4750)(TUI 占用 CPU 过高)、[#4738](https://github.com/github/copilot-cli/issues/4738)(`ask_user` 中按 Enter 会丢弃已输入内容——数据丢失级严重度)、[#1999](https://github.com/github/copilot-cli/issues/1999)(德语 `@` 键位绑定，CLOSED)。

## 重点 PR 进展

1. **[#4746](https://github.com/github/copilot-cli/pull/4746)** —— *新增实验性 next-action 扩展原型。* 位于 `examples/next-best-action/` 下的选择性启用(opt-in)SDK 示例，通过 `joinSession()` 复用前台会话，并搭配一个不携带工具的 `ui.extend`。在不修改已发布 CLI 的前提下，展示了团队对“next best action”(下一步最佳行动)代理的设想形态。
2. **[#4739](https://github.com/github/copilot-cli/pull/4739)** —— *docs:提议由终端负责的 macOS 通知。* 原始的 MIT 许可参考示例，针对 macOS 通知点击问题附带了可移植的回归测试。由于这个公开仓库并不包含应用本体实现，该 PR 被明确定位为一项提案。
3. **[#4748](https://github.com/github/copilot-cli/pull/4748)** —— *新增 joke cli。* 一个轻量级 PR;可能是一次首次贡献/示例提交，用来演练贡献流程。

## 功能请求趋势

- **按仓库 / 项目作用域的配置**：插件作用域(#1665)与会话过滤(#4693)——用户希望插件、会话和提示词的设置按项目级生效，而不是按用户级。
- **原生 TUI 易用性**：Shift+Arrow/Ctrl+A 选择(#2644)、对非美式键盘布局更好的按键处理(#1999),以及低 CPU 占用的空闲状态(#4750)——TUI 仍然缺少基本的终端惯例。
- **MCP 成熟度**：OAuth 请求头保真度(#4681)、会话恢复时 MCP 连接状态可恢复(#4753)、Azure MCP 性能(#4749)——MCP 价值很高，但集成面依然脆弱。
- **ACP 正确性**：24 小时内的三个回归(#4537、#4555、#4743)都在呼吁更严格的权限/空闲信号，好让外部编辑器能准确推断代理状态。
- **表单与输入安全**：多行/非破坏性的 Enter 处理(#4738)是任何 elicitation(征询输入)类 UI 的反复诉求。

## 开发者痛点

- **1.1.15 / 1.0.83 发布回归问题扎堆**：集中在会话创建(#4742、#4756)、会话恢复时杀掉 MCP(#4753)、ACP 自动批准(#4537)、Azure MCP 超时(#4749)以及 TUI 空闲时 CPU 飙升(#4750)——对桌面端和 CLI 而言，这是一个“多处破损”的版本。
- **ACP 模式对编辑器集成不可靠**：工具在未经权限确认的情况下运行、后台任务被中止、空闲信号缺失——让人很难放心把 ACP 当作自动化界面来使用。
- **MCP 连接生命周期脆弱**：连接恢复、OAuth 请求头和 Azure 工具发现在 24 小时内都暴露出具体故障；开发者无法指望 MCP 服务器在会话恢复后仍保持存活。
- **交互式表单中的数据丢失**：在 `ask_user` 中按 Enter 会丢弃已输入的内容(#4738)——问题虽小，但对信任的打击很大。
- **从异常状态恢复往往只能靠杀进程**：卡死的会话(#4755)、Windows 上死锁的语音服务器(#4740)以及僵尸会话条目(#4754)都缺少优雅的应用内恢复途径。
- **策略/权限的“默认拒绝”意外**：#4757 显示，未配置托管策略的用户依然会在整个会话期间被限制使用 `--yolo`/`--allow-all`,而且没有任何 UI 解释原因。

*本周期源数据中没有返回任何 Discussions。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-07

## 1. 今日要点

OpenCode Go 的可靠性已成为社区最突出的痛点，涌现出一批相互重叠的故障报告，涵盖 HTTP 429 限流中断、部分模型上的 403/500 错误，以及缺失 `x-opencode-session` 请求头导致的 400 错误。在工程侧，核心团队正在落地一系列围绕 provider 压缩与统一文件系统访问策略的重构，同时推进 TUI 按键解析和服务端自动权限处理等面向用户的修复。

## 3. 热门议题

1. **[#47613](https://github.com/anomalyco/opencode/issues/47613) — Go 订阅：2026-09-06 HTTP 429 中断**（13 条评论）
   付费 Go 端点出现持续数小时的 429 中断，并附带明确的补偿请求。今日互动量最高的议题，也是 Go 可靠性问题群的标杆讨论帖。

2. **[#33027](https://github.com/anomalyco/opencode/issues/33027) — [BUG] MCP 工具已连接但未暴露给 agent**（10 条评论）
   MCP `pdfrag` 服务器通过 `tools/list` 注册了 6 个工具，但始终未到达 agent。长期存在的集成缺口，阻碍了有意义的 MCP 用例落地。

3. **[#34473](https://github.com/anomalyco/opencode/issues/34473) — OpenCode 随机停止响应**（9 条评论）
   在 v1.17.11 桌面端，响应会静默结束（播放会话完成音效，无错误），有时发生在思考过程中。影响使用体验的阻塞性问题，已收到 4 个 👍。

4. **[#42083](https://github.com/anomalyco/opencode/issues/42083) — GitHub Copilot provider 不显示任何模型**（9 条评论，5 个 👍）
   在 1.18.15 上，所有 Copilot 模型的 `model_picker_enabled: false`；鉴权成功但 `/models` 和 CLI 列表均返回为空。今日获赞最多的议题。

5. **[#17798](https://github.com/anomalyco/opencode/issues/17798) — Windows 忽略 `NODE_EXTRA_CA_CERTS`**（6 条评论，4 个 👍）
   处于 TLS 检测代理后的企业用户无法配合内部 PKI 证书使用 OpenCode。跨版本长期存在的回归问题，目前没有明确的解决办法。

6. **[#31737](https://github.com/anomalyco/opencode/issues/31737) — TUI：通过 Ctrl+V 粘贴图片无效果**（4 条评论）
   TUI 模式下图片粘贴被静默丢弃。对使用截图和视觉模型的用户影响较大。

7. **[#36081](https://github.com/anomalyco/opencode/issues/36081) — 在 Termux 下无法运行**（4 条评论）
   OpenCode 在 Android Termux 上无法启动；终端/环境兼容性问题进一步扩大。

8. **[#40343](https://github.com/anomalyco/opencode/issues/40343) — OpenCode Go：部分模型返回 403 Forbidden**（3 条评论，5 个 👍）
   `mimo-v2.5` 等模型即便订阅有效且配额充足，仍返回 `Forbidden`。疑似 Go 内部存在按模型白名单或路由问题。

9. **[#47545](https://github.com/anomalyco/opencode/issues/47545) — Auto 模式导致反复出现错误的权限通知**（3 条评论）
   自动审批发生在客户端，服务端却已经发出 `permission.asked`。今天的 PR #47754 直接解决了该问题。

10. **[#47794](https://github.com/anomalyco/opencode/issues/47794) — 改进 Auto Router 的错误提示与模型状态指示**（3 条评论）
    请求失败时，用户无法分辨 Auto Router 实际尝试的是哪个模型；已打 `needs:compliance` 标签，并持续获得关注。

## 4. 关键 PR 进展

1. **[#47630](https://github.com/anomalyco/opencode/pull/47630) — refactor(core): unify filesystem access policy** *(closed)*
   将路径解析与外部目录审批逻辑从 `LocationMutation` 中抽出，统一到共享策略层。消除了文件系统工具之间重复的实现。*（已合并）*

2. **[#47324](https://github.com/anomalyco/opencode/pull/47324) — feat(core): schedule provider compaction automatically**
   在安全的 Session 边界自动触发 provider 模式压缩；可选的 `threshold` 会限制在模型输入上限以内。与 #47323/#47322 共同构成压缩三部曲。

3. **[#47795](https://github.com/anomalyco/opencode/pull/47795) — feat(vcs): add last turn diff source**
   `GET /api/vcs/diff` 新增 `mode=turn` + `sessionID`，借助既有的每步骤快照返回会话最近一轮涉及到的文件。无需新增持久化状态。

4. **[#47792](https://github.com/anomalyco/opencode/pull/47792) — chore: bump gitlab-ai-provider to 6.15.0**
   在 monorepo 各包中升级固定的 GitLab AI SDK。关闭 #47791。

5. **[#47789](https://github.com/anomalyco/opencode/pull/47789) — fix(tui): drop key events with no name before keymap matching**
   OpenTUI 的 `parseKeypress` 可能因 Device Status Report 应答（`ESC[0n`）产生空事件；在匹配前将其过滤掉。关闭 #42408。

6. **[#47635](https://github.com/anomalyco/opencode/pull/47635) — fix(opencode): resolve markdown agent prompts**
   之前的 Markdown loader 会用正文覆盖 frontmatter 中的 `prompt:` 字段并跳过部分段落。关闭 #47616。

7. **[#27684](https://github.com/anomalyco/opencode/pull/27684) — feat: adjustable font size and line height for desktop/web**
   长期以来的 UX 请求——Desktop 和 Web 端新增相关设置。关闭 #26269、#16145、#10423。

8. **[#47754](https://github.com/anomalyco/opencode/pull/47754) — fix(opencode): decide auto permission approval on the server**
   将 Auto 权限处理迁到服务端，使自动批准的请求在 `permission.asked` 触发之前就完成解析。关闭 #47545。

9. **[#46530](https://github.com/anomalyco/opencode/pull/46530) — feat(plugin): expose permission assertions**
   为插件提供专属的 `ctx.permission.assert(input)`，复用现有引擎；可对规范化后的浏览器 URL 以及服务端文件/外部目录读取进行预校验。强化了插件安全机制。

10. **[#47776](https://github.com/anomalyco/opencode/pull/47776) — fix(cli): resolve background service port collision on Windows**
    Windows 上 `opencode2` 卡在 "Starting background server…" 的问题，根因是端口冲突与 bind 语义。关闭 #41746。

另需关注：**[#47783](https://github.com/anomalyco/opencode/pull/47783)** 新增波斯语/法尔西语 README，关闭 #47775；**[#46574](https://github.com/anomalyco/opencode/pull/46574)** 为 GPT-5.6 OAuth 引入可选的 1M 上下文变体（如 `gpt-5.6-sol-1m`）。

## 6. 功能请求趋势

- **Auto Router 透明度** — 用户希望获得清晰的逐模型状态指示以及更丰富的错误提示（#47794）。
- **本地化** — 今日新增波斯语/法尔西语 README（#47783/#47775），表明现有语言之外的需求仍在持续。
- **TUI 易用性** — 图片粘贴（#31737）、leader 键绕过 IME（#37167）以及终端原生进度指示器（#24807）。
- **桌面端可读性** — 字体大小和行高可调（#27684）终于落地。
- **插件能力扩展** — 权限断言（#46530）以及对话框选项页脚（#47780），反映出插件 API 走向一等公民的稳步推进。
- **压缩控制** — provider 模式与本地模式的显式区分（#47323）、自动调度（#47324）以及上下文持久化（#47322）。

## 7. 开发者痛点

- **OpenCode Go 的可靠性是当前最大的痛点。** 429 集中爆发（#47613、#47747、#47761）、特定模型的 403（#40343、#47777）、`gpt-5.6-luna` 的 500（#47778）以及 400 `MissingSessionID`（#47755、#47756、#47763），都暗示 Go 后端/边缘层存在多重叠加故障——客户已开始要求补偿。
- **Provider 集成参差不齐。** GitHub Copilot 返回零模型（#42083）或 `Forbidden`（#26344），MCP 工具注册后未暴露（#33027），Cloudflare Workers AI 缺少 Account ID 提示（#30033）。
- **Auto 模式的 UX 缺陷。** Auto 下出现虚假的 `permission.asked` 通知（#47545），削弱了用户对无人值守运行的信任——已在 PR #47754 中修复。
- **TUI 输入回归。** 图片粘贴（#31737）、来自 `ESC[0n` 的空按键事件（#47789）以及 IME 冲突（#37167）都集中影响了 TUI 的输入流水线。
- **Windows 及非 Linux 环境。** `NODE_EXTRA_CA_CERTS` 被忽略（#17798）、后台服务挂起（#41746 → #47776）以及 Termux 启动失败（#36081），与 macOS/Linux 支持相比仍明显落后。
- **模型静默失败。** 响应随机中断（#34473）、"思考"之后无应答（#47767），以及客户端缺失 Plan Mode（#47733）都有共同特征：失败发生时没有任何诊断信息。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-07

## 1. 今日要点

今天是 **提供商路由修复与 TUI 打磨** 密集的一天：合并的 PR 把 Copilot 的 `gpt-6-astra` 路由切换到 Responses 端点，修复了流式取消（`Esc`），并修补了 `wordWrapLine` 的无限递归。同样重要的是，**备用提供商链** 和 **将 undici 固定到系统 DNS** 两项功能都已落地，让会话能够抵御传输错误以及 MagicDNS 这类水平分割解析器。Windows 使用体验仍然是呼声最高的开放话题（#7547），评论数已达 57 条且仍在增长。

## 2. 版本发布

*过去 24 小时内无新版本发布。*

## 3. 热门议题

| # | 标题 | 为何重要 | 状态 | 链接 |
|---|------|----------|------|------|
| **#7547** | [Windows] 如何在 Windows 上使用 Pi？遇到了哪些问题？ | 分类汇总帖，**57 条评论** —— 显然是仓库中讨论最多的话题，集中反映了 WSL、路径以及终端按键映射方面的怪异问题。 | OPEN | [earendil-works/pi#7547](https://github.com/earendil-works/pi/issues/7547) |
| **#5886** | AgentSession 结算/续接以及 assistant-tail 生命周期 bug | 由 mitsuhiko 发起；覆盖整类运行后会话记录续接 bug 的元议题。11 条评论，4 👍。 | OPEN | [earendil-works/pi#5886](https://github.com/earendil-works/pi/issues/5886) |
| **#6996** | Bug：Gemini 3.x 模型因缺少 `thought_signature` 在工具调用时失败 | 导致整个模型族出现故障；修复后已关闭，但信号很强，因为 Gemini 3.x 的采用率正在上升。 | CLOSED | [earendil-works/pi#6996](https://github.com/earendil-works/pi/issues/6996) |
| **#9052** | 全屏模式下滚轮滚动速度比常规模式慢 3 倍 | 揭示了固定输入框全屏模式下的 UX 回退；3 👍 反映出这一明显的痛点。 | OPEN | [earendil-works/pi#9052](https://github.com/earendil-works/pi/issues/9052) |
| **#8760** | OpenRouter `:free` 模型返回 400 — `max_tokens` 超出提供商上限 | 影响大量免费模型；具体修复方案是对目录值进行截断。 | OPEN | [earendil-works/pi#8760](https://github.com/earendil-works/pi/issues/8760) |
| **#8823** | 流式输出期间按 Esc 经常无法取消，需等待提供商结束 | 可靠性 bug —— 用户期望 Esc 是硬取消。修复已发布。 | CLOSED | [earendil-works/pi#8823](https://github.com/earendil-works/pi/issues/8823) |
| **#9209** | GitHub Copilot GPT-6 Astra 被路由到了不支持的 Chat Completions | 触发了 PR #9253 中的路由修复。 | CLOSED | [earendil-works/pi#9209](https://github.com/earendil-works/pi/issues/9209) |
| **#8643** | Bedrock：OpenAI 模型拒绝 `toolResult.content` 中嵌套的图片 | 在 fork 上已有现成修复和回归测试；提交门槛历来阻碍合并。 | OPEN | [earendil-works/pi#8643](https://github.com/earendil-works/pi/issues/8643) |
| **#8826** | 为长时间持续故障中的智能体重试退避设置上限 | 在持续 `503` 情况下退避可能无限增长；加个上限并不复杂。 | OPEN | [earendil-works/pi#8826](https://github.com/earendil-works/pi/issues/8826) |
| **#9229** | Windows：`shell_path` 被忽略，即便关闭 WSL 也优先使用 WSL bash | 可复现的具体 Windows 配置 bug，已在最近的补丁中修复。 | CLOSED | [earendil-works/pi#9229](https://github.com/earendil-works/pi/issues/9229) |

## 4. 关键 PR 进展

| # | 标题 | 功能说明 | 状态 | 链接 |
|---|------|----------|------|------|
| **#9253** | fix(ai): 将 Copilot GPT 模型路由切换到 Responses（修复 astra） | 将 Copilot GPT-6 模型从 `/chat/completions` 重新路由；为未来 GPT-4 目录清空的情况预先做好准备。 | CLOSED (merged) | [earendil-works/pi#9253](https://github.com/earendil-works/pi/pull/9253) |
| **#9251 / #9249** | feat(coding-agent): 发生传输错误时跳转至备用提供商 | 在当前提供商遇到 DNS/超时/连接拒绝时启用可选的兜底链。**关闭 #9242。** | CLOSED (merged) | [#9251](https://github.com/earendil-works/pi/pull/9251), [#9249](https://github.com/earendil-works/pi/pull/9249) |
| **#9252 / #9250** | fix(coding-agent): 将 undici `connect.lookup` 固定为 `dns.lookup` | 修复 MagicDNS/水平分割主机的 `ENOTFOUND` 错误；与 #9244 配套。 | CLOSED (merged) | [#9252](https://github.com/earendil-works/pi/pull/9252), [#9250](https://github.com/earendil-works/pi/pull/9250) |
| **#9269** | fix(agent): 在循环被拒绝时以错误结果结束 `agentLoop` 流 | 增加拒绝处理逻辑，使 OAuth 刷新 / `convertToLlm` / `prepFn` 失败能够被暴露出来，而不是被吞掉。 | CLOSED (merged) | [earendil-works/pi#9269](https://github.com/earendil-works/pi/pull/9269) |
| **#9270** | fix(tui): 停止无法切分的宽字素导致的 `wordWrapLine` 无限递归 | 在 `maxWidth=1` 且片段为单个 emoji/CJK 字素时限制递归深度。 | CLOSED (merged) | [earendil-works/pi#9270](https://github.com/earendil-works/pi/pull/9270) |
| **#9259** | feat(coding-agent): 通过中断当前回合应用引导消息 | 用户更正现在可在长时间运行的工具调用中途生效，无需等待该回合结束。 | CLOSED (merged) | [earendil-works/pi#9259](https://github.com/earendil-works/pi/pull/9259) |
| **#9272** | fix(coding-agent): 允许扩展从自定义提供商进行流式输出 | 暴露与 `complete` 对应的 `stream`/`streamSimple`；修复 #8964。 | CLOSED (merged) | [earendil-works/pi#9272](https://github.com/earendil-works/pi/pull/9272) |
| **#9261** | feat(ai): 新增 `sendStrictToolField` 兼容性标志 | 让兼容 Anthropic 的网关（Bedrock 代理）能在没有其拒绝的 `strict` 字段的情况下接受严格的 `input_schema`。 | CLOSED (merged) | [earendil-works/pi#9261](https://github.com/earendil-works/pi/pull/9261) |
| **#9077** | docs(coding-agent): 文档化在 Docker 沙箱中运行 pi | 在 `containerization.md` 中新增 Docker 沙箱小节。关闭 #8788。 | CLOSED (merged) | [earendil-works/pi#9077](https://github.com/earendil-works/pi/pull/9077) |
| **#9179** | fix(coding-agent): 在压缩期间拒绝树形导航 | 防止导航跨越压缩分支重写时产生竞态。 | CLOSED (merged, inprogress) | [earendil-works/pi#9179](https://github.com/earendil-works/pi/pull/9179) |
| **#9274** | fix(coding-agent): 渲染 diff 时保留缩进 | 编辑工具的行内渲染器会丢弃插入行的缩进；新增回归测试。 | OPEN | [earendil-works/pi#9274](https://github.com/earendil-works/pi/pull/9274) |

## 5. 热门讨论

**Ideas**
- **#9146** — *针对单个仓库覆盖 API Key 并忽略 `auth.json`* — humphd 希望能够为单个仓库绕过共享的 `auth.json`（例如使用一次性密钥）。2 条评论，1 👍。[Discussion #9146](https://github.com/earendil-works/pi/discussions/9146)

## 6. 功能请求趋势

- **跨提供商兜底/韧性。** #8826（重试退避上限）、#9242（提供商兜底链）、#9230（OpenCode Go 会话头）都指向让长时间运行的会话在面对瞬时传输与协议变更时更具鲁棒性。
- **按提供商粒度的推理控制。** #9016（为 llama.cpp 启用 `reasoning_effort`）以及 `sendStrictToolField` PR（#9261）反映出持续推动：在非 Anthropic、非 OpenAI 提供商上暴露按请求粒度的开关。
- **提供商原生成本上报。** #6881 —— "当响应中包含提供商上报的成本时予以采用" —— 作为计费精度改进持续获得关注。
- **缓存断点优化。** #9246 提议将 Anthropic 未使用的第 4 个缓存断点用于稳定的会话检查点 —— 这是提升 Pi 提示缓存命中率的首个具体尝试。
- **扩展 API 覆盖面。** #9272（自定义提供商的 `stream`/`streamSimple`）、#9236（用户回合确认送达）、以及 #5732（`sendUserMessage` 中的 `allowCommands`）共同表明一项将扩展契约形式化的协调推进。
- **沙箱化与隔离。** #8788 / #9077（Docker 沙箱文档）加上 #9247（针对 JSON/RPC 的机器可读失败分类），推动 Pi 向一等公民沙箱运行时演进。
- **OpenAI 兼容端点文档。** #9271 提议在 `models.md` 中给出 Standard Compute 的完整示例。

## 7. 开发者痛点

- **Windows 易用性是最响亮的反复抱怨** —— `shell_path` 被忽略（#9229）、Shift+Enter 提交而非换行（#7175），以及蔓延的分类汇总帖（#7547），都反映出零散的终端/Shell 集成问题。
- **提供商路由 bug 反复出现** —— Copilot `gpt-6-astra` 在 Chat 与 Responses 之间的路由错配（#9209, #9277）、OpenRouter 免费模型超出 `max_tokens`（#8760）、通过 OpenRouter 调用的 Claude Opus 5 拒绝 `output_config`（#9165），以及 Bedrock OpenAI 模型拒绝嵌套的 toolResult 图片（#8643）。每一项都不大，但合在一起表明模型目录的更新速度超过了路由层。
- **TUI 渲染瑕疵** —— `wordWrapLine` 无限递归（#9270）、全屏滚动速度（#9052）、任务中途丢失滚动位置的破坏性重绘（#9240）、全屏图像裁切（#8306）、alt 为空的 Markdown 图片隐藏 URL（#9268），以及恢复会话时按原尺寸重渲染工具结果图片（#9256）。这些都属于"实际工作中看着像坏了"的 bug，会侵蚀信任。
- **可靠性基础设施存在缺口** —— `agentLoop` 拒绝未被处理（#9269）、指数退避无上限（#8826）、以及 Node fetch 对仅系统 DNS 主机解析失败（#9244）—— 开发者希望会话能在不稳定的网络下存活，而不是直接拆除整个回合。
- **贡献流程上的摩擦** —— #8643 明确提到"此前因贡献门槛被自动关闭"，反映出 PR 针对低优先级问题时，在评审前就被关停的开发者痛点。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区简报 — 2026-09-07

## 今日要点

Qwen Code 项目发布了 v0.23.1 的第二个预览版，同时推出了 cua-driver-rs v0.20.4，主打功能是 **在 Web Shell 中可视化并管理动态工作流运行**（#10594）。一个严重的 P1 级 Windows 问题浮出水面：VS Code Companion 扩展在约 12 小时的运行时间内泄漏数百个无头 `conhost.exe` 进程；此外还暴露出多个守护进程会话管理缺陷，会导致 Web Shell 会话卡死。与此同时，更大范围的 ink → OpenTUI 迁移，以及面向延迟工具的 prompt 缓存保留工作仍在推进。

## 版本发布

- **[v0.23.1-preview.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.2)** — 新增 Web Shell 中动态工作流运行的可视化与管理（[#10594](https://github.com/QwenLM/qwen-code/pull/10594)），并包含派生会话工作流投影的性能优化工作。
- **[cua-driver-rs v0.20.4](https://github.com/QwenLM/qwen-code)** — 预构建的 Qwen CUA Driver 二进制文件：已完成代码签名 + 公证的 macOS 通用二进制、未签名的 Linux 版（x86_64/arm64，glibc 2.31+），以及未签名的 Windows UIAccess worker + 原生 SDK payload。
- **[v0.23.0-nightly.20260906.92a8a8d179](https://github.com/QwenLM/qwen-code)** — 跟踪同一项 Web Shell 工作流运行可视化工作的 nightly 版本。

## 热门 Issue

1. **[#8662 — Migrate TUI rendering layer from ink to OpenTUI](https://github.com/QwenLM/qwen-code/issues/8662)** *（31 条评论，P3 跟踪）* — 长期跟踪 issue，旨在用 OpenTUI 替换打了大量补丁的 ink 7 + React 19 渲染器，并记录了在 ink 框架内难以根治的结构性问题（如闪烁等）。
2. **[#11119 — Background shell output and wake notifications silently dropped](https://github.com/QwenLM/qwen-code/issues/11119)** *（8 条评论，P1，daemon/web-shell）* — 在 `qwen serve` Web Shell 中，后台 `run_shell_command`（例如 CI 轮询）在发起它的轮次结束后会丢失全部输出，最终导致会话卡死。
3. **[#11303 — Windows qwen-cli (VS Code Companion) leaks headless conhost.exe processes](https://github.com/QwenLM/qwen-code/issues/11303)** *（3 条评论，P1）* — 运行约 12 小时后，单个 qwen-cli 泄漏了 **347 个子进程，占用约 2.8 GB 内存**，且永不释放。
4. **[#8586 — Track activeWork and background Agent recovery](https://github.com/QwenLM/qwen-code/issues/8586)** *（9 条评论，P2）* — 为守护进程健康状态添加显式的 `activeWork` 事实，并为那些存活超出其前台提示生命周期、或已停止推进的后台 Agent 构建恢复路径。
5. **[#44 — 百炼收费陷阱 (Bailian billing complaint)](https://github.com/QwenLM/qwen-code/issues/44)** *（20 条评论，已关闭）* — 有用户反映仅进行了几次问答请求就被扣费 ¥11；这是社区对定价透明度不满的一个反复出现的话题。
6. **[#3361 — Agent misinterprets shell output as empty](https://github.com/QwenLM/qwen-code/issues/3361)** *（6 条评论）* — 命令实际执行并产生了可见输出，但 agent 却判定输出为空（OpenAI 兼容 API 用户受影响尤为明显）。
7. **[#11272 — MCP stdio tool cancellation kills the MCP server (Channel mode)](https://github.com/QwenLM/qwen-code/issues/11272)** *（3 条评论，P2）* — 从钉钉 Channel 互动卡片中取消一个长时间运行的 MCP stdio 工具，会直接杀死服务器进程，且之后无法恢复。
8. **[#10865 — Session workflow projection derived three times per render](https://github.com/QwenLM/qwen-code/issues/10865)** *（5 条评论，P2）* — 性能后续：`SessionWorkflowCockpit.tsx` 每次渲染都会重建一个本应只构建一次的索引。
9. **[#10684 — First-class self-hosted semantic memory](https://github.com/QwenLM/qwen-code/issues/10684)** *（4 条评论，P3）* — 内置本地 memory MCP 服务器，或为 auto-memory 增加基于 embedding 的召回能力，替代目前基于关键词/标题的 MEMORY.md 召回方式。
10. **[#11118 — Sessions doing cron/goal/monitor work can never be reclaimed](https://github.com/QwenLM/qwen-code/issues/11118)** *（3 条评论，P2，已关闭）* — `qwen serve` 在 hold-set 上报与阻塞会话结算的工作之间，对 “busy” 的定义相互矛盾，导致这类工作负载的空闲会话永远无法被回收。

## 重点 PR 进展

1. **[#11207 — feat(serve): concurrent standalone daemons with session fencing](https://github.com/QwenLM/qwen-code/pull/11207)** — 允许升级后的多个独立守护进程并发共享 `Conversations`，同时保留 #10924 规定的每个已加载会话的强制单写者租约。
2. **[#10504 — feat(dingtalk): show dynamic lifecycle tags](https://github.com/QwenLM/qwen-code/pull/10504)** — 为钉钉消息增加本地化的生命周期反应（👀 Thinking/Reading/Searching/Running/Editing/Retrying/Replying），且不会泄露原始的工具 I/O。
3. **[#11300 — fix(core): keep branch commits made by a failing post-checkout hook](https://github.com/QwenLM/qwen-code/pull/11300)** — 当失败的 `post-checkout` 钩子已在新分支上推进了若干提交时，回滚操作现在会保留这个新建分支。
4. **[#11262 — feat(web-shell): add unified session sources](https://github.com/QwenLM/qwen-code/pull/11262)** — 统一的 Sources 列表，合并已上传文件、工作区文件引用和 HTTP(S) 链接，采用单行展示且不再重复显示。
5. **[#10410 — feat(core): preserve prompt cache for deferred tools](https://github.com/QwenLM/qwen-code/pull/10410)** — 两步桥接方案：先用 `tool_search` 查看延迟工具的 schema，再用 `tool_call` 调用它，从而保持 prompt 缓存稳定。
6. **[#10347 — feat(core): auto-retry transient network errors (EOF) where Ctrl+Y is unavailable](https://github.com/QwenLM/qwen-code/pull/10347)** — 在现有有限自动重试预算内，将被包装的底层网络失败（例如 `400 network error ... EOF`）视为可重试的传输错误。
7. **[#11282 — feat(core): expand ${session_id} in per-provider customHeaders](https://github.com/QwenLM/qwen-code/pull/11282)** — 在请求时将 `${session_id}` 解析为 `Config.getSessionId()`，为 OpenAI 兼容网关实现按会话定制的请求头。
8. **[#11305 — feat(goal): size checkpoint verifier timeout for full claim list](https://github.com/QwenLM/qwen-code/pull/11305)** — 将 Goal 证据检查点校验器的超时上限提升至 180 秒，并新增 `model.goalCheckpointTimeoutSeconds` 设置（1–3600）。
9. **[#10938 — feat(web-shell): make Session Workflow dependencies navigable](https://github.com/QwenLM/qwen-code/pull/10938)** — 补齐 #8583 之后在导航、形态与文档方面的缺口；计划 DAG 现在以步骤本身为主导，而非其状态。
10. **[#11208 — feat(web-shell): continuous history and compact turn navigation](https://github.com/QwenLM/qwen-code/pull/11208)** — 增加了有界的历史浏览，以及 Codex 风格的左侧栏：带紧凑刻度、悬停预览和跳转至指定轮次的功能。
11. **[#11302 — fix(build): remove heavy build/bundle from prepare hook](https://github.com/QwenLM/qwen-code/pull/11302)** *（附加）* — `prepare` 现在只运行 `husky` + `npm run generate`，避免每次 `npm install` 都触发冗余的完整构建。

## 功能需求趋势

以下趋势提炼自 issue 与 PR 积压工作：

- **Web Shell / 守护进程用户体验**是绝对主线：动态工作流可视化（[#10594](https://github.com/QwenLM/qwen-code/pull/10594)）、统一来源列表（[#11262](https://github.com/QwenLM/qwen-code/pull/11262)）、会话级轮次导航（[#10750](https://github.com/QwenLM/qwen-code/issues/10750)、[#11208](https://github.com/QwenLM/qwen-code/pull/11208)），以及共享的更新状态（[#11243](https://github.com/QwenLM/qwen-code/issues/11243)）。
- **后台自动化与 Agent 生命周期**：`activeWork` 跟踪与恢复（[#8586](https://github.com/QwenLM/qwen-code/issues/8586)）、支持 cron/goal/monitor 工作的可回收会话（[#11118](https://github.com/QwenLM/qwen-code/issues/11118)），以及跨作用域的 channel 所有权（[#11186](https://github.com/QwenLM/qwen-code/issues/11186)）。
- **更智能的记忆**：一流的自托管语义/embedding 记忆层，或内置的本地 MCP 服务器（[#10684](https://github.com/QwenLM/qwen-code/issues/10684)）。
- **OpenAI 兼容后端的功能对齐**：将 `/effort` 传递到非原生后端（[#11227](https://github.com/QwenLM/qwen-code/issues/11227)），以及按会话的 `${session_id}` 请求头模板化（[#10995](https://github.com/QwenLM/qwen-code/issues/10995)、[#11282](https://github.com/QwenLM/qwen-code/pull/11282)）。
- **可配置 / 声明式更新**：为 `qwen update` 支持下载基础 URL 覆盖（[#11149](https://github.com/QwenLM/qwen-code/issues/11149)），以及为 `/model` 指定压缩（compaction）模型（[#6019](https://github.com/QwenLM/qwen-code/pull/6019)）。
- **守护进程中解耦的 Skill 管理**：以一系列不超过 1000 行的 PR 逐步交付（[#11274](https://github.com/QwenLM/qwen-code/issues/11274)）。

## 开发者痛点

- **TUI 渲染器不稳定** — ink 7 + React 19 需要约 1037 行的补丁，仍会出现闪烁；#8662 是推动迁移至 OpenTUI 的长期跟踪 issue。
- **守护进程会话生命周期缺陷** — 后台 shell 输出被丢弃（[#11119](https://github.com/QwenLM/qwen-code/issues/11119)）、busy/idle 定义不一致（[#11118](https://github.com/QwenLM/qwen-code/issues/11118)）、MCP stdio 工具在取消后无法恢复（[#11272](https://github.com/QwenLM/qwen-code/issues/11272)），运行时可能卡死——守护进程可靠性问题反复出现。
- **Windows 上的资源泄漏** — qwen-cli（VS Code Companion）泄漏数百个无头 `conhost.exe` 进程（[#11303](https://github.com/QwenLM/qwen-code/issues/11303)），是最严重的新增 P1 问题。
- **计费透明度** — #44（20 条评论）及相关讨论显示，用户对百炼按问题计费的模式持续不满。
- **OpenAI 兼容 API 的功能缺口** — `/effort` 未被转发（[#11227](https://github.com/QwenLM/qwen-code/issues/11227)）、shell 输出被误判为空（[#3361](https://github.com/QwenLM/qwen-code/issues/3361)），在 [#11282](https://github.com/QwenLM/qwen-code/pull/11282) 之前也不支持按会话的请求头模板化。
- **工具调度器竞态条件** — 已提前中止的请求被卡在不相关的活动批次之后（[#11146](https://github.com/QwenLM/qwen-code/issues/11146)），以及取消时清理步骤被静默跳过（[#11162](https://github.com/QwenLM/qwen-code/issues/11162)）。
- **构建/体验摩擦** — `prepare` 在每次 `npm install` 时都运行完整的 `build`+`bundle`（[#11301](https://github.com/QwenLM/qwen-code/issues/11301)，已在 [#11302](https://github.com/QwenLM/qwen-code/pull/11302) 中修复）；CLI 顶栏/底栏缺少 Git 分支信息（[#1786](https://github.com/QwenLM/qwen-code/issues/1786)）；移动端 Web Shell 的会话切换体验卡顿（[#6181](https://github.com/QwenLM/qwen-code/issues/6181)）。
- **macOS / Linux E2E 的 CI 脆弱性** — 频繁出现偶发性失败，催生了一批有限重试补丁（[#11134](https://github.com/QwenLM/qwen-code/pull/11134)、[#11297](https://github.com/QwenLM/qwen-code/pull/11297)、[#11306](https://github.com/QwenLM/qwen-code/pull/11306)）。

---

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*