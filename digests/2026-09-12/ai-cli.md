# AI CLI 工具社区动态日报 2026-09-12

> 生成时间: 2026-09-11 23:30 UTC | 覆盖工具: 7 个

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

# 跨工具对比报告 —— AI CLI 生态系统,2026-09-12

## 1. 生态概览

AI CLI 这一品类已从早期的终端封装工具完全成熟为多面体 Agent 平台 —— 每一款主流工具都同时覆盖 CLI、桌面应用、IDE 扩展以及云端/远程执行,而桌面端正在催生一类新型生命周期缺陷(进程泄漏、更新暂存、文件锁)。迭代节奏出现分化:OpenAI Codex 在 alpha 分支上以每天 7 个版本的速度狂奔,Anthropic 和 GitHub 则维持更慢、更稳定的版本节奏,辅以阶段性功能投放。社区需求正在向四个方向收敛:Agent 治理(循环保护、成本上限、诚实遥测)、可移植的记忆/会话、插件与技能标准化,以及 Windows 兼容性 —— 最后一项仍然是全部七款工具共同的短板。与此同时,Claude Code 的约定(hooks、`AGENTS.md`、`SKILL.md`)正成为事实上的互操作契约,Qwen Code、OpenCode 和 Copilot CLI 都在明确对齐。

## 2. 活跃度对比

| 工具 | 热门 Issue(24h) | PR 活跃度(24h) | 讨论(24h) | 发版状态 |
|---|---|---|---|---|
| Claude Code | 10(+4 个重要关闭) | 1 —— 异常安静 | — † | 已发布 v2.1.269 |
| OpenAI Codex | 10(+4 个提及) | 17 已合并/更新 | 14(6 个想法、8 个 showcase) | **7 个版本**(0.155.0-alpha.3.x 线 + 0.154 patch) |
| Gemini CLI | 10 | 10 | — † | 1 个 nightly(0.61.0 线) |
| Copilot CLI | 10(+2 个提及) | 0 报告 | — † | 已发布 v1.0.84-5 |
| OpenCode | 10 | 10 | — † | 无 |
| Pi | 10 | 10 | — † | 无 |
| Qwen Code | 9 | 10 | — † | 1 个 nightly(0.23.3) |

† 这些仓库在本次时间窗口内未提供 Discussions 数据;其中多个仓库将所有社区流量都路由至 Issues,因此标记为 N/A 而非计入不活跃。

**峰值互动信号:** Claude Code #42776(177 条评论,开放约 5 个月 —— 本批中最大的单条讨论线)、Pi #7547(62 条评论,Windows 战略枢纽)、Codex #30408(37 条评论,9+ GB MCP 泄漏)、Codex 讨论 #9618(132 👍,rewind/undo)。各仓库点赞最高的 Issue:Codex 132 👍、Claude #25947 39 👍、OpenCode #27110 32 👍、Copilot #4095 21 👍。

## 3. 共性功能方向

- **会话回滚/撤销 与 历史可移植性** —— Codex 的 `/rewind` 诉求(132 👍,加上 PR #44915 中 `thread/revert` 的合并)、OpenCode 的"撤销消息但保留文件变更"(#7963,12 👍)、Copilot 已上线的语义化 JSONL 会话/记忆导入,以及 Qwen 的会话元数据稳定性工作(#11574、#11545)。共同诉求:*选择性* 撤销(对话 vs. 文件系统)以及升级安全的历史记录。
- **持久的、项目级作用域记忆** —— Claude #25947(39 👍,项目本地 `.claude/memory/`)、Copilot #2436(跨会话查询)、Gemini 的磁盘记忆 CRUD 推进(#18836、#21335)以及 Auto Memory 脱敏(#26525)。方向:可 gitignore、可移植、可版本控制的状态。
- **Subagent/Agent 循环治理** —— Gemini 在 MAX_TURNS 后误报"成功"(#22323)以及通用型卡死(#21409);OpenCode 的 364 次调用无限 grep 循环(#45442)以及并行 subagent 限制(#27110,32 👍 —— 该仓库点赞最高);Claude 持续 4 天的 PR 监控预算耗尽(#77310);Codex 对虚假目标延续的代价度量(#44909)。普遍诉求:循环检测、硬性的成本/轮次上限,以及可信赖的终止遥测。
- **Windows 与桌面端对齐** —— 唯一一个在全部 **七份** 摘要中都出现的主题:Claude #42776/#89992,Codex #40968/#43596,Copilot #4095(21 👍)/#3700/#4652,Pi #7547 + PR #9501/#9504,Qwen #9693/#11352,OpenCode 的 Windows 签名冲刺,Gemini 的 Windows 沙箱 git 参数校验。
- **插件/技能标准与 hooks 互操作** —— Claude 上线 `claude plugin eval`(marketplace 质量保障基础设施);Qwen 明确以与 Claude Code 的 hooks 对齐为目标(#11610);OpenCode 索要 Agent Plugins 规范(#40993,12 👍);Copilot 在加固 `SKILL.md`/`AGENTS.md` 语义(#4438、#4822);Codex 则有社区版的 SKILL.md→plugin 转换器。
- **沙箱化与提示注入加固** —— Gemini 的零依赖操作系统级沙箱宏大工程(#19873)以及注入防御 PR(#29250);Codex 的 Windows MXC 沙箱 PR;Claude 的 Cowork VM 回归(#93507、#93221);Copilot 在 Windows 25H2 上损坏的 `--sandbox`。
- **MCP 生命周期与合规性** —— Copilot 的非标准 `server/discover` 预初始化(#4370)、OAuth 回调不匹配(#4795),以及恢复时的连接拆除(#4753);Codex 每线程 9+ GB 的 MCP 进程泄漏(#30408);Qwen 的 STDIO 失败与池化连接恢复(#9693、#11392);Claude 的跨 worktree 连接器作用域泄漏(#93722)。

## 4. 差异化分析

- **Claude Code** —— 在 *治理与生态质量保障* 方面走得最远:插件评估打分、本地/云端/远程的输出风格一致性。面向企业与合规方向(规则强制 #82184,代理/CA 网络问题)。可见的 PR 吞吐量最慢,但 Issue 积压最深。
- **OpenAI Codex** —— 速度最高、覆盖面野心最大:语音对话已晋升为稳定版,多账号会话生命周期、Computer Use、personality→fixed model instructions。以消费级桌面端为先;alpha 频繁迭代带来回归集群(macOS 渲染器崩溃、Windows 发送按钮卡死)。
- **Gemini CLI** —— 最为严谨的 *安全工程* 冲刺:文件系统隔离、OAuth 持久化、注入防御、沙箱拒绝绕过修复,全部集中在一个窗口内完成。独树一帜的 token 经济性聚焦(AST 感知读取,每轮削减约 36k token)。
- **Copilot CLI** —— 借助 GitHub/VS Code 的深度绑定;差异化点在于 *可移植状态*(语义化 JSONL 互转)以及成本层级灵活性(OpenAI Flex tier 请求)。在 MCP 规范合规性与 Windows/WSL 稳定性上表现最弱。
- **OpenCode** —— 供应商无关的开源玩法(vLLM 自动发现、Go/Zen 用量 API、多供应商元数据)。目前正承受 v1→v2 迁移阵痛与计费信任事件;社区最积极地推动互操作标准。
- **Pi** —— 面向折腾型玩家与本地模型用户的精简、以扩展 API 为核心的设计(vLLM/llama.cpp 采样参数、Bedrock Mantle)。交付的是底层架构(对话中段的 system-message delta)而非功能特性;社区规模小但信号密度高,有核心开发者(mitsuhiko)深度参与。
- **Qwen Code** —— 生态特定型集成打法:DashScope 会话缓存、钉钉渠道、Chrome Native Messaging 浏览器中继、VS Code 配套。背负最重的遥测隐私债务(三个独立的泄漏向量)。

## 5. 社区势头与成熟度

**势头领跑者:** OpenAI Codex 是当之无愧的速度王者(7 个版本、17 个 PR、14 条讨论,均发生在 24h 内)—— 但仍处于 alpha 级别,以回归集群作为代价。Gemini CLI 展现出最健康的工程节奏(nightly + 10 个有分量的安全 PR,搭配严谨的 p1/p2 分级)。

**深度胜过体量:** Claude Code 拥有最成熟的 Issue 基础 —— 一条 177 条评论、开放 5 个月的讨论线意味着持续的企业级使用,以及交付评估基础设施标志着生态成熟 —— 尽管今日其 PR 管道异常安静。Pi 表现优于其体量:62 条评论的战略讨论线叠加来自核心维护者的基础性 PR。

**观察清单:** OpenCode 处于迁移中期(v1→v2 回归、计费同步失败正在侵蚀付费者信任);Copilot CLI 发版稳定但零可见 PR 活动,Windows/WSL 覆盖率回归密集;Qwen Code 工程活跃但正在累积 CI 与隐私卫生债务。

## 6. 趋势信号

1. **CLI 到桌面的迁移正在催生新的故障分类法** —— 进程/磁盘泄漏(Codex:9 GB RSS、559 GB 暂存)、更新暂存冲突(Claude MSIX、OpenCode 签名)、文件锁。率先加固桌面生命周期的供应商将赢得长会话用户。
2. **"可信遥测"正在成为产品级需求** —— 三款工具独立报告了 Agent 虚假声明成功(Gemini、OpenCode、Codex)。预计验证层将持续涌现:Claude 的 plugin eval、社区版 stop-hook(`isitdone`)、Pi 的评估驱动文档。
3. **互操作正在向 Claude Code 约定标准化** —— hooks、`AGENTS.md`、`SKILL.md` 以及 Agent Plugins 规范。当前最稳妥的可移植赌注,是基于这些契约来编写扩展。
4. **记忆正在成为可移植的制品**(Copilot 的 JSONL 互转、Claude 的项目本地诉求)—— 要为可导出、可 diff、可版本控制的 Agent 状态做规划。
5. **遥测隐私正在被审视**("默认关闭或证明已脱敏" —— Qwen 的三个泄漏向量、Gemini 的 Auto Memory 脱敏)。在把 Agent 指向凭据之前先审计出站流量。
6. **Windows 仍是共同的缺口** —— 对于率先补齐的供应商而言,这将是一个企业级差异化机会。

**实操指引:** 在 Codex alpha 线上请锁定版本;未经外部验证(测试/hooks),永远不要相信 subagent 的成功状态;为长跑 Agent 套上明确的预算上限;今天的工具选型要把平台(Windows/WSL)因素放得很重。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — 社区亮点报告
*数据快照：2026-09-12 · 来源：github.com/anthropics/skills*

---

## 1. 热门 Skills 排行（讨论度最高的 PR）

PR 列表综合反映了近期活跃度、影响力以及与高流量 Issue 的关联程度（本次快照未展示 PR 评论数，因此排名依据所解决问题的重要性、贡献者参与度以及新鲜度综合得出）。

### 1.1 [PR #1298] `skill-creator` — 修复 `run_eval.py`（0% 召回率 Bug）
- **内容：** 修复描述优化循环目前针对噪声进行优化的问题。同时处理 Windows 流读取、触发检测、并行 worker 可靠性，并将评估产物作为正式 skill 安装。
- **讨论亮点：** 解决了长期悬而未决的 [#556](https://github.com/anthropics/skills/issues/556)（12 条评论，10+ 次独立复现）—— skill-creator 上被报告最多的 Bug。
- **状态：** OPEN（自 2026-06-10 活跃，最近更新 2026-09-11）。
- 🔗 https://github.com/anthropics/skills/pull/1298

### 1.2 [PR #210] `frontend-design` — 清晰度与可操作性重构
- **内容：** 重写 frontend-design skill，使每一条指令都能在单次会话内直接执行；移除含糊不清的指引。
- **讨论亮点：** 持续时间最长的开放 skill 质量改进之一（自 2026-01-05 开放；最近活动 2026-03-07），反映出社区对设计输出质量的长期关注。
- **状态：** OPEN。
- 🔗 https://github.com/anthropics/skills/pull/210

### 1.3 [PR #83] `skill-quality-analyzer` + `skill-security-analyzer`（marketplace 元技能）
- **内容：** 两个元技能，分别从五个质量维度（结构、示例、健壮性、性能、可维护性）评估任意 Claude Skill，并进行安全分析。
- **讨论亮点：** 直接回应社区的头号关切（Issue [#492](https://github.com/anthropics/skills/issues/492)，43 条评论），即 skill 的信任边界问题。位于"质量"与"安全"两大主题的交汇处——也是本仓库的两大主导议题。
- **状态：** OPEN（自 2025-11-06）。
- 🔗 https://github.com/anthropics/skills/pull/83

### 1.4 [PR #1367] `self-audit` — 机械验证 + 推理质量门控
- **内容：** 一个在交付前对 AI 输出进行审计的 skill——先进行机械化的文件验证，再按严重性顺序开展四个维度的推理审计。
- **讨论亮点：** 紧扣 Issue [#1385](https://github.com/anthropics/skills/issues/1385)（4 条评论）中提出的三道关卡"推理质量流水线"方案。通用、与框架无关。
- **状态：** OPEN（自 2026-06-28）。
- 🔗 https://github.com/anthropics/skills/pull/1367

### 1.5 [PR #1628] `Hivemind` — 零成本多智能体编排
- **内容：** 让 Claude Code 将机械性子任务委派给运行在免费模型上的无头 [opencode](https://opencode.ai) worker，同时由 Claude Code 保留规划/评审/合并的控制权。
- **讨论亮点：** 将成本重新框定为*上下文预算*问题而非*能力*问题——这是 skill 组合的一种颇具启发性的架构思路。
- **状态：** OPEN（自 2026-08-21）。
-  https://github.com/anthropics/skills/pull/1628

### 1.6 [PR #514] `document-typography` — 生成文档的排印质量控制
- **内容：** 防止 AI 生成文档中出现孤字换行、寡行段落以及编号错位等问题——这些缺陷影响 Claude 产出的每一份文档。
- **讨论亮点：** 体现了社区对*输出质量*类 skill 的强烈需求，与现有的 `pdf`/`docx`/`pptx` skill 形成互补。
- **状态：** OPEN（自 2026-03-04）。
- 🔗 https://github.com/anthropics/skills/pull/514

### 1.7 [PR #1615] `scnet-hpc` — SCNet HPC 集群运维
- **内容：** 基于配置文件的 SSH + Slurm 工作流，覆盖 SCNet HPC 集群，包含作业生成、集群发现、partition/module/内存指引等。
- **讨论亮点：** 是 marketplace 中日益涌现的*垂直/领域专用* skill（HPC、金融、治理等）的典型代表。
- **状态：** OPEN（自 2026-08-20）。
-  https://github.com/anthropics/skills/pull/1615

### 1.8 [PR #486] `ODT` — OpenDocument 文本创建与 ODT↔HTML 转换
- **内容：** 任何提及 ODT、ODS、ODF、OpenDocument 或 LibreOffice 时即触发；支持创建、模板填充以及 HTML 转换。
- **讨论亮点：** 将 document-skill 系列从 MS Office 格式扩展到 ISO 标准的开放格式。
- **状态：** OPEN（自 2026-03-01）。
-  https://github.com/anthropics/skills/pull/486

---

## 2. 社区需求趋势（Issues）

Issue 看板呈现出**四个清晰的需求方向**：

### 2.1 信任、安全与命名空间完整性 — 🔥 最高音量信号
- **[#492](https://github.com/anthropics/skills/issues/492)**（43 条评论，2 👍）：以 `anthropic/` 命名空间分发的社区 skill 造成了信任边界滥用。**本仓库讨论度最高的单一 Issue。**
- **[#1175](https://github.com/anthropics/skills/issues/1175)**（4 条评论，已关闭）：SharePoint Online 与基于 skill 的访问控制安全顾虑。
- **[#412](https://github.com/anthropics/skills/issues/412)**（6 条评论，已关闭）：提议引入 `agent-governance` skill（策略执行、威胁检测、审计日志）。

### 2.2 发现、分发与 Skill 生命周期
- **[#228](https://github.com/anthropics/skills/issues/228)**（16 条评论，8 👍）：Claude.ai 内组织级 skill 共享——目前仍需手工下载/上传往返。
- **[#189](https://github.com/anthropics/skills/issues/189)**（6 条评论，9 👍）：`document-skills` 与 `example-skills` 插件存在重复内容，污染上下文窗口。
- **[#62](https://github.com/anthropics/skills/issues/62)**（10 条评论）：文件/文件夹重命名后用户丢失自定义 skill——缺乏持久性保证。

### 2.3 Skill-Creator 与评估基础设施可靠性
- **[#556](https://github.com/anthropics/skills/issues/556)**（12 条评论，7 👍）：`run_eval.py` 在所有查询上报告 0% 触发率。
- **[#1390](https://github.com/anthropics/skills/issues/1390)**（4 条评论）：`mcp-builder` 在任何真实 MCP 服务器上的评估得分均为 0/N。
- **[#1487](https://github.com/anthropics/skills/issues/1487)**（4 条评论）：`claude-api` skill 会急切注入约 156k tokens，瞬间撑爆上下文窗口。
- **[#202](https://github.com/anthropics/skills/issues/202)**（8 条评论，已关闭）：`skill-creator` 读起来像开发文档，而非可执行 skill。

### 2.4 新能力方向（提案）
- **[#1329](https://github.com/anthropics/skills/issues/1329)**（9 条评论）：`compact-memory`——用于压缩长期运行智能体状态的符号化记法。
- **[#1385](https://github.com/anthropics/skills/issues/1385)**（4 条评论）：推理质量门控流水线（任务前校准 → 对抗性评审 → 交付验证）。
- **[#16](https://github.com/anthropics/skills/issues/16)**（4 条评论）：将 Skills 暴露为 MCP，使 skill 能力成为可发现的工具 API。
- **[#29](https://github.com/anthropics/skills/issues/29)**（4 条评论）：在 AWS Bedrock 上支持 Skills——互操作性请求。

---

## 3. 高潜力待合并 Skills（可能很快落地）

这些 PR 处于活跃状态、技术聚焦、且对应高流量 Issue——是近期合并的强有力候选。

| PR | Skill / 变更 | 为何临近合并 | 链接 |
|---|---|---|---|
| #1298 | `skill-creator` 评估流水线重构 | 解决了被复现最多的 skill-creator Bug（#556，12 条评论） | https://github.com/anthropics/skills/pull/1298 |
| #1742 | `mcp-builder`：`mcp>=2` `streamable_http_client` + 自定义请求头 | 针对活跃使用依赖的兼容性修复 | https://github.com/anthropics/skills/pull/1742 |
| #1724 | `mcp-builder`：默认评估模型 → claude-sonnet-5 | 常规的模型版本升级 | https://github.com/anthropics/skills/pull/1724 |
| #1607 | `claude-api`：将 4 个已弃用模型 ID 标记为 retired | 与 issue #1603 相关的清理工作 | https://github.com/anthropics/skills/pull/1607 |
| #1602 | 评估序列化/编码/脚本稳定性修复 | 在一个 PR 内聚合多个可靠性 Bug | https://github.com/anthropics/skills/pull/1602 |
| #1099 / #1050 | `skill-creator` Windows 兼容性 | 两个并行 PR 尝试修复同一 Windows 阻塞 Bug | https://github.com/anthropics/skills/pull/1099 · https://github.com/anthropics/skills/pull/1050 |
| #538 / #541 / #539 | `pdf` / `docx` / `skill-creator` 正确性修复 | 来自同一活跃贡献者的一系列小型、范围明确修复 | https://github.com/anthropics/skills/pull/538 · https://github.com/anthropics/skills/pull/541 · https://github.com/anthropics/skills/pull/539 |

---

## 4. Skills 生态洞察

> **社区最为集中的需求是用于保障、审计与治理 Skills 生态自身的元技能**——命名空间信任（#492，43 条评论）、skill 质量/安全分析（PR #83）、推理质量门控（PR #1367 / Issue #1385）以及智能体治理（Issue #412）——这使得"信任与质量保障"成为当前 Skills 讨论的标志性主题，领先于新领域能力或工作流自动化方向。

---

# Claude Code 社区摘要 — 2026-09-12

## 今日要点

- **v2.1.269 发布**，带来 `claude plugin eval`（一个新子命令，用于针对 Claude Code 运行插件的评估套件，并生成带评分的 JSON 和 HTML 报告）以及 `/output-style [name]` 斜杠命令，用于在远程控制、云端和 "ot" 上下文中列出和切换输出风格。
- **macOS Cowork 沙箱回归**（Issue #93507，自 2026-09-10 ~23:15 UTC 起）是当前最受关注的活跃事故：虚拟机启动后只有本地网络路由，云端出口代理对所有域名都返回 403，即使开启了"所有域名"也不行 —— 在同一 24 小时窗口内还冒出了多个后续 issue。
- 长期未决的 **Windows 桌面端重启/孤立进程文件锁** 议题（#42776）评论数已突破 177 条，仍是流量最高的开放 bug，社区关注持续约 5 个月。

---

## 版本发布

**v2.1.269**（最新版，过去 24 小时内）

- **`claude plugin eval`** —— 针对 Claude Code 运行插件的评估套件，并获得可复现的 JSON 与 HTML 报告形式的评分结果。可运行 `claude plugin eval --help` 查看选项。（可能面向插件作者和 Anthropic 插件市场的审核人员。）
- **`/output-style [name]`** —— 用于列出和切换输出风格的斜杠命令。支持远程控制以及云端和 ot[her] 上下文。（发布说明似乎被截断。）

完整更新日志：github.com/anthropics/claude-code/releases/tag/v2.1.269

---

## 热门 Issue

1. **#42776 — Claude Code 桌面端在 Windows 上因孤立进程文件锁无法重启**（177 条评论，88 👍）
   *重要性：* 这是仓库中讨论最多的 bug。Windows 用户无法干净地重启桌面应用，因为旧进程持有一个文件锁。长达半年的持续活跃度表明需要架构层面的修复，而非简单的补丁。[链接](https://github.com/anthropics/claude-code/issues/42776)

2. **#11897 — Claude Code on the Web 的 .NET SDK 二进制下载被代理拦截，即使开启"所有域名"也无济于事**（21 条评论，25 👍）
   *重要性：* 云沙箱的出口流量理应遵守用户的域名白名单，但 .NET SDK 绕过了它。高 👍/评论比表明用户强烈认同这是一个真实的回归，而非配置错误。[链接](https://github.com/anthropics/claude-code/issues/11897)

3. **#93507 — Cowork macOS：本地沙箱虚拟机无网络路由，云端出口代理返回 403**（9 条评论，1 👍）
   *重要性：* 一个时间戳明确标注在 2026-09-10 ~23:15 UTC 的全新回归 —— macOS 上的云沙箱实际上已无法使用。已打上 repro + networking/sandbox 标签进行分流。[链接](https://github.com/anthropics/claude-code/issues/93507)

4. **#25947 — 功能请求：将项目记忆存储在项目本地的 `.claude/memory/` 中**（9 条评论，39 👍）
   *重要性：* 本周获赞最多的增强请求。项目记忆目前存放在 `~/.claude/projects/<encoded-path>/memory/`，破坏了可移植性和版本可管理性。39 👍 对比 9 条评论，表明存在沉默而强烈的共识。[链接](https://github.com/anthropics/claude-code/issues/25947)

5. **#93221 — 已连接的文件夹在虚拟机内始终未挂载：主机端报告 Plan9 共享添加成功，但客户端看不到**（8 条评论，1 👍）
   *重要性：* Cowork 的挂载/文件夹流程在 Windows + cowork 上完全失效。与 #93507 配对，构成本周浮现的一组 Cowork 回归。[链接](https://github.com/anthropics/claude-code/issues/93221)

6. **#82184 — 项目规则被视为建议性：执行钩子自我失效，压缩过程丢弃治理规则而保留叙述，自动记忆优先级高于项目指令**（3 条评论，0 👍）
   *重要性：* 一份内容扎实的治理/控制平面报告，涵盖三种不同的失效模式（钩子自我失效、压缩中的治理丢失、自动记忆优先）。作者引用了多个相关 issue。对任何依赖 `.claude/rules*` 实现合规的团队都很重要。[链接](https://github.com/anthropics/claude-code/issues/82184)

7. **#89992 — Windows MSIX 自动更新终止正在运行的应用程序 —— "另一个程序正在使用此文件"**（5 条评论，1 👍）
   *重要性：* 记录了 Electron 42 / Node 24 自动更新暂存与仍在运行的 MSIX 进程发生冲突。具体的版本号（1.32352.x、1.37937.1→.2→.3）使维护者可以据此采取行动。[链接](https://github.com/anthropics/claude-code/issues/89992)

8. **#93707 — 远程机器 SSH 失败并提示"No route to host"，原因是 TCC 声明免责的子进程缺少本地网络权限**（2 条评论，0 👍）
   *重要性：* 一个真实的 macOS 平台故事（TCC / 本地网络授权），阻塞了桌面应用中的 SSH 到局域网工作流。随着 Apple 加强本地网络执行，值得持续关注。[链接](https://github.com/anthropics/claude-code/issues/93707)

9. **#93722 — Worktree 会话会重新加载每个 claude.ai 连接器；按项目禁用列表不跟随 worktree**（1 条评论，0 👍）
   *重要性：* MCP/连接器的范围模型会跨 worktree 泄漏，并且没有设置项键可以抑制应用注入的连接器。对任何按 repo 标准化连接器白名单的团队都很实用。[链接](https://github.com/anthropics/claude-code/issues/93722)

10. **#80846 — Plan 模式：每个只读 Bash 命令仍需手动批准 —— 无自动批准选项**（1 条评论，2 👍）
    *重要性：* Plan 模式的既定用途是只读探索，但目前无法自动批准 `git log`、`jq` 等命令。对任何将 Plan 模式用作检查工具的人来说都是摩擦倍增器。[链接](https://github.com/anthropics/claude-code/issues/80846)

*其他值得注意的活动（本窗口期内全部关闭/失效，但仍是有用的背景信息）：#85979（v2.1.228 上持续的 ECONNRESET）、#78834（ugrep 对有界 `.{N}` 模式分配 4–17 GB 内存）、#77310（无限制的每小时 PR-watch 自检在 4 天内耗尽会话预算）、#72714（`/worktree` 静默地将 `core.hooksPath` 写入主仓库共享的 `.git/config`）。*

---

## 关键 PR 进展

过去 24 小时内仓库中仅更新了 **一个 PR**，完整列表很短：

1. **#42205 — fix(hookify): normalize tool matcher parsing**（已关闭）
   - **作者：** Balajitechlabs
   - **作用：** 裁剪匹配器并规范化每个 `OR` 段，使诸如 `Edit space-or Write` 这样的模式能正确比较。此前值会被拆分，但在比较前未做裁剪。
   - **状态：** 已关闭（已合并或被取代 —— 未显示作者/评审者）。对任何在 `hookify` 配置中使用空格的场景而言，这是一个小但关乎正确性的修复。
   [链接](https://github.com/anthropics/claude-code/pull/42205)

*（在 24 小时窗口内没有其他 PR 更新 —— 即使 issue 活动升温，PR 端的节奏也异常冷清。）*

---

## 功能请求趋势

从过去 24 小时窗口内的开放 Issue 和增强标签提炼：

1. **项目范围配置** —— 两个请求指向同一个缺口：
   - 记忆文件存储在全局路径 `~/.claude/projects/.../memory/` 下，而非 `<project>/.claude/memory/`（#25947，39 👍）。
   - 会话/聊天历史以绝对文件系统路径为键，文件夹移动或重命名后无法保持连续性（#84918）。
   → 方向：让 Claude Code 的状态默认成为 **项目本地化、可 gitignore、可移植**。

2. **Plan 模式人体工学** —— 只读 Bash 仍会触发手动批准（#80846）。方向：为 Plan 模式引入只读白名单和/或自动批准标志。

3. **可强制执行的项目规则 / 治理** —— #82184 主张真正的强制层（不会自我失效的钩子、在压缩中保留的治理文本、项目规则优先级高于自动记忆）。方向：一流的"规则是强制性的，而非建议性的"语义。

4. **插件编写表面** —— v2.1.269 的 `claude plugin eval` 暗示着一套构建计划（eval + 评分报告）。可预见的后续：更好的插件文档、钩子自省、市场分级。

5. **输出风格人体工学** —— 新的 `/output-style [name]` 斜杠命令和跨上下文支持（远程控制、云端、ot）暗示着本地与远程/云端表面之间即将开展的拉齐工作。

---

## 开发者痛点

过去 24 小时窗口内开放 + 最近关闭 issue 中反复出现的主题：

- **Windows 桌面端脆弱性。** 重启/MSIX/Code 标签三件套（#42776、#89992、#86576）表明 Windows 用户在生命周期、打包和更新通道 bug 方面受到不成比例的影响。文件锁和 MSIX 暂存问题表明安装模型需要加固。

- **macOS Cowork / TCC / 本地网络回归。** #93507、#93221、#93707、#80291 以及围绕 macOS 沙箱边界的持久 EPERM/iCloud 问题簇。丢失联网或无法挂载主机文件夹的云/虚拟机沙箱正阻塞核心工作流。

- **成本与失控的 agent。** #77310（每小时 PR-watch 自检在 4 天内耗尽用量，没有周期/成本上限）是一个典型的"无护栏 agent 循环"事件。预计会有更多针对 `send_later` 类工具的硬性用量上限请求。

- **治理与规则执行。** #82184 抓住了一种结构性的挫败感：一旦钩子、压缩和自动记忆开始介入，项目规则就显得只是建议性的。需要合规级保证的团队被迫构建变通方案。

- **路径耦合的状态。** 跟随绝对文件夹路径的记忆和会话历史（在重命名/移动后无法保持连续性）让任何重组仓库或通过云盘同步的人都感到沮丧。

- **禁用相邻工具的工具 bug。** `/worktree` 覆盖全局 `core.hooksPath`（#72714）、ugrep 在小文件上 OOM（#78834）、`pkill -f` 匹配到 Claude 自身的 bash 包装器（#93607）—— 每个单独看都很小，但合在一起侵蚀了"Claude 动过我的 git/工具状态"的信任。

- **代理 / 企业网络。** #11897（云沙箱 .NET SDK 绕过白名单）和 #86349（MCP HTTP 预检在自定义 CA 下挂起）表明企业用户仍在与 Claude Code 的网络假设作斗争。

*本窗口内失效/关闭量较高* —— 最近关闭的项目中有很大一部分带有 `stale` 标签。这与 Anthropic 定期的分流清理一致，也提醒用户：如果能复现，应重新打开或在失效 issue 上留言，尤其是在 Windows 桌面端和 Cowork 回归上。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-12

## 今日要点

Alpha 版本的密集迭代仍在持续，**24 小时内发布了 7 个新版本**，主要集中在 `rust-v0.155.0-alpha.3.x` 线上，同时附带一个 `0.154.0-alpha.6.2` 补丁。社区最迫切关注的是一个长期存在的**桌面应用 MCP 服务器进程泄漏**问题（占用 9 GB 以上 RSS），而合并队列中的工作则集中在 **TUI/语音体验优化**、**Windows MXC 沙箱加固**以及 **app-server API 扩展**（账户会话生命周期、禁用插件设置、模型访问计划）。

---

## 版本发布

- [`rust-v0.155.0-alpha.3`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3) — 0.155.0 alpha 周期的主线版本
- [`rust-v0.155.0-alpha.3.7`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.7)、[`.3.8`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.8)、[`.3.9`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.9)、[`.3.10`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.10) — `.3` 线的快速后续补丁
- [`rust-v0.155.0-alpha.2.3`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.2.3) — 回溯移植分支
- [`rust-v0.154.0-alpha.6.2`](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6.2) — 上一条 alpha 分支的最新 0.154 补丁

本次数据集中未填充版本发布说明，但 `.3.x` 版本的高频发布强烈表明这是在快速修复更广泛 alpha 测试中暴露出的回归问题——包括 Windows 沙箱故障以及 macOS 渲染器崩溃（见热门问题）。

---

## 热门问题

1. **[#30408 — MCP 服务器进程泄漏：每个线程的进程永不清理（占用 9 GB 以上 RSS）](https://github.com/openai/codex/issues/30408)** — 37 条评论。严重的资源泄漏：`codex app-server` 为每个线程/会话派生全局 MCP 进程，但在归档/关闭时从不终止。影响 0.142.3+ 上的 macOS Apple Silicon。这是一项主要的稳定性抱怨。

2. **[#40968 — Windows Codex 桌面端：发送按钮无限旋转，提示永远无法提交](https://github.com/openai/codex/issues/40968)** — 36 条评论。在 Windows 11 build 26200 上阻塞 Pro 用户的基础聊天功能；持续反复出现的回归问题。

3. **[#44720 — "ChatGPT hit a snag" 错误复现](https://github.com/openai/codex/issues/44720)** — 31 条评论，现已关闭。在 `26.908.31457`（macOS，20x Pro）上大规模复现的客户端崩溃。与下方 [#44824] 和 [#44743] 高度相关。

4. **[#18693 — 桌面端在大型本地会话历史下性能崩溃](https://github.com/openai/codex/issues/18693)** — 20 条评论，9 👍。长期存在的问题：拥有少量超长线程的配置会导致打字、滚动、线程列表性能下降，并触发随机退出。

5. **[#42435 — Windows 应用推理力度从 Extra High 重置为 Instant](https://github.com/openai/codex/issues/42435)** — 14 条评论。Windows Business 版本上的设置持久化回归。

6. **[#43596 — Windows Computer Use 无法访问原生应用：应用清单为空，sky RPC 不可用](https://github.com/openai/codex/issues/43596)** — 10 条评论。严重限制了 Computer Use 在 Windows 上的实用性。

7. **[#40060 — Windows execpolicy 在同一 PowerShell 脚本中对 `Start-Process` + URL 的误报](https://github.com/openai/codex/issues/40060)** — 9 条评论。影响 PowerShell 工作流的分类器回归；在 `main` 上仍然存在。

8. **[#42236 — 已删除的 ChatGPT 对话仍残留在 Codex 侧边栏中且无法移除](https://github.com/openai/codex/issues/42236)** — 9 条评论。Windows 上 ChatGPT ↔ Codex 桌面端的同步/状态问题。

9. **[#44743 — macOS 26.908.31748：窗口空白 — "r is not a function"](https://github.com/openai/codex/issues/44743)** — 8 条评论，4 👍。由于 `authed-route ↔ app-primary` 循环导入导致渲染器崩溃；回滚到 `26.901.51231`（codex-cli 0.153.4）可修复——指向 0.154 alpha 周期。

10. **[#39421 — Marketplace 升级暂存泄漏：41 天内产生 559 GB / 4,972 个孤立目录](https://github.com/openai/codex/issues/39421)** — 5 条评论。精选克隆存在清理程序，但 marketplace 没有；导致大量磁盘泄漏。

*值得一提：* [#44783](https://github.com/openai/codex/issues/44783)（Windows 沙箱在 0.154.0 上 `CreateProcessAsUserW` 错误 2）、[#44824](https://github.com/openai/codex/issues/44824)（重复出现的 "ChatGPT hit a snag" 弹窗）、[#43820](https://github.com/openai/codex/issues/43820)（Code Mode 主机在 57 位 VA / 200 GiB RLIMIT_AS Linux 上 SIGSEGV）、[#39704](https://github.com/openai/codex/issues/39704)（Linux/NixOS 启动时 GPU 卡死）。

---

## 重点 PR 进展

1. **[#44935 — 从 TUI 中移除个性选择](https://github.com/openai/codex/pull/44935)** — 移除 `/personality`、选择弹窗以及轮次上的覆盖行为。与下方 PR #44930 配套。

2. **[#44934 — 远程压缩和 Code Mode 工具的场景快照](https://github.com/openai/codex/pull/44934)** — 新的 `gpt-6-astra` 集成测试，覆盖远程压缩 + 图像跟进以及 Code Mode 发布冒烟测试。

3. **[#25383 — 添加 app-server 账户会话生命周期 [2/2]](https://github.com/openai/codex/pull/25383)** — 提供桌面端多账户配置切换的 Rust 生命周期：`accountSession/login|add|list|switch|logout`。跨账户 UX 工作的基础。

4. **[#44933 — 从 TUI 中移除 Windows 全局可写扫描和警告](https://github.com/openai/codex/pull/44933)** — 清理 TUI 中启动/权限变更的扫描遥测和对话框。

5. **[#44932 — 统一上下文快照并将请求归组为窗口](https://github.com/openai/codex/pull/44932)** — 为捕获的请求、原始请求体和输入项提供单一渲染器；请求查看器中的快照边界更清晰。

6. **[#44930 — 在打包的 GPT-5.4 和 GPT-5.5 中嵌入友好指令](https://github.com/openai/codex/pull/44930)** — 用固定的友好指令替代这些模型的可选个性模板；对这些模型而言，TUI 中将不再提供个性选择。

7. **[#44928 — 通过静默样本保留语音计量历史](https://github.com/openai/codex/pull/44928)** — 修复语音计量滚动问题，使静默样本不会清除早先的活动记录。

8. **[#44922 — 在 Windows 发布中打包原生语音运行时](https://github.com/openai/codex/pull/44922)** — 在 Windows 包中提供语音助手 + 原生音频库；修复全新安装上的 Realtime TLS（平台证书验证）。

9. **[#44921 — 默认启用 TUI 语音对话](https://github.com/openai/codex/pull/44921)** — 将 `realtime_conversation` 提升为稳定版；移除实验性提示。

10. **[#44915 — 移除已弃用的 `thread/rollback` API](https://github.com/openai/codex/pull/44915)** — 删除 `thread/rollback`、相关类型、绑定以及 `Op::ThreadRollback`；引导用户使用 `thread/revert`。

*此外已合并：* [#44905](https://github.com/openai/codex/pull/44905)（在 app-server thread/turn API 中的 `disabledPluginIds`）、[#44903](https://github.com/openai/codex/pull/44903)（原生 Windows MXC 助手入口点）、[#44872](https://github.com/openai/codex/pull/44872)（Windows MXC 沙箱中的托管网络策略）、[#44879](https://github.com/openai/codex/pull/44879)（Astra composer 星星淡入 + 光标稳定）、[#44883](https://github.com/openai/codex/pull/44883)（对缺少 `supports_experimental_context` 的模型拒绝 `token_budget.use_history_notes_extension`）、[#44893](https://github.com/openai/codex/pull/44893)（模型发现中的 `availableAccessPrograms`）、[#44877](https://github.com/openai/codex/pull/44877)（从 `userVerification/enroll` 返回公钥元数据）。

---

## 热门讨论

### 💡 创意

- **[#9618 — 怎么还没有 `/rewind` 或 `/revert` 功能？](https://github.com/openai/codex/discussions/9618)** — 23 条评论，132 👍。点赞数最高的讨论。将基于 `thread/revert` 实现内置撤销/回退的长期诉求正式确立下来。
- **[#41716 — ChatGPT Planner 与 Codex Worker 编排](https://github.com/openai/codex/discussions/41716)** — 2 条评论。提议采用原生规划者/工作者分离架构，由 ChatGPT 驱动一个或多个 Codex 实例。
- **[#27754 — 实验：一个用于在 `AGENTS.md` 中生成可复用项目指引映射的 Codex 插件](https://github.com/openai/codex/discussions/27754)** — 1 条评论，4 👍。社区插件，用于生成紧凑的 `AGENTS.md` 动作映射。
- **[#44797 — 一流的、用户可控的浏览器扩展管理](https://github.com/openai/codex/discussions/44797)** — 请求 Codex/ChatGPT 调用扩展弹窗、操作和选项。
- **[#44795 — 实时集成、安全登录和低延迟 computer use](https://github.com/openai/codex/discussions/44795)** — 综合性的集成层功能请求。
- **[#44792 — 与 Google 服务的通用实时知识集成](https://github.com/openai/codex/discussions/44792)** — Drive/Calendar/Keep 索引以及持续同步。

### 🛠️ 展示与分享

- **[#44643 — CoCo：用于跨终端和仓库并行工作的 Codex 协调器](https://github.com/openai/codex/discussions/44643)** — 用于监控和恢复并行 Codex 会话的命名工作区。
- **[#44453 — 为什么 `OPENAI_BASE_URL` 在带 `config.toml` 时无法重定向 Codex（以及 OrcaReplay）](https://github.com/openai/codex/discussions/44453)** — 本地录制和回放 Codex 会话；记录了一个细微的配置与环境变量优先级陷阱。
- **[#33807 — Codebase Argus：真实 PR 上的只读 Codex CLI 审查边界](https://github.com/openai/codex/discussions/33807)** — 使用只读 Codex CLI 边界的确定性审查台模式。
- **[#44153 — isitdone：阻止声明 "done" 的 Stop 钩子，要求通过测试/类型检查/lint](https://github.com/openai/codex/discussions/44153)** — `npx isitdone init --agent codex` 写入 `.codex/hooks.json`；在发布中受到信任。
- **[#44843 — SKILL.md → Codex 插件包转换器（MIT，仅标准库）](https://github.com/openai/codex/discussions/44843)** — 强制执行上传硬性约束（描述 ≤1024、保留名称）。
- **[#44618 — Wayfinder：将 Codex 工作可视化为航行地图](https://github.com/openai/codex/discussions/44618)** — 用于可视化 Codex 会话历史的本地优先桌面 UI。
- **[#44291 — Brain Scanner：在 Codex 修改共享助手前查看其调用方](https://github.com/openai/codex/discussions/44291)** — 编码代理可消费的项目映射。
- **[#44756 — 让 Codex 在运行时观察和控制 Android 与 iOS 应用](https://github.com/openai/codex/discussions/44756)** — 用于 Codex 的开源移动控制集成。

---

## 功能请求趋势

汇总 Issues 和 Discussions，最受关注的方向是：

1. **跨订阅的多账户/配置切换** — [#25342](https://github.com/openai/codex/issues/25342)、[#36454](https://github.com/openai/codex/issues/36454) 以及 PR #25383（`accountSession/*` 路由）均表明用户希望在桌面端和 iOS 之间清晰分离工作与个人会话。
2. **Windows 平台对等及 Windows 原生远程控制** — [#34028](https://github.com/openai/codex/issues/34028)（Windows 对 Windows 的 Codex Remote）、[#42435](https://github.com/openai/codex/issues/42435)、[#43596](https://github.com/openai/codex/issues/43596)、[#42520](https://github.com/openai/codex/issues/42520)。Windows 桌面端体验在稳定性和功能覆盖度上落后于 macOS。
3. **可靠的回退/撤销 UX** — 由 Discussion [#9618](https://github.com/openai/codex/discussions/9618)（132 👍）驱动；与 PR #44915 中 `thread/revert` 的整合保持一致。
4. **一流的浏览器集成/扩展管理** — [#44797](https://github.com/openai/codex/discussions/44797) 以及 [#42520](https://github.com/openai/codex/issues/42520) 和 [#42757](https://github.com/openai/codex/issues/42757)。
5. **持续的实时集成（Google 等）** — [#44792](https://github.com/openai/codex/discussions/44792)、[#44795](https://github.com/openai/codex/discussions/44795)。
6. **移动端（Android/iOS）运行时控制** — [#44756](https://github.com/openai/codex/discussions/44756)。

---

## 开发者痛点

- **桌面应用的进程和磁盘泄漏** — MCP 每线程进程泄漏（[#30408](https://github.com/openai/codex/issues/30408)，9 GB 以上 RSS）和 marketplace 暂存泄漏（[#39421](https://github.com/openai/codex/issues/39421)，559 GB / 4,972 个目录）。这些问题在长会话中会累积，marketplace 路径上也没有清理程序。
- **Windows 稳定性与沙箱回归** — 发送按钮卡死（[#40968](https://github.com/openai/codex/issues/40968)）、`CreateProcessAsUserW` 失败（[#44783](https://github.com/openai/codex/issues/44783)）、execpolicy 误报（[#40060](https://github.com/openai/codex/issues/40060)）、推理力度重置（[#42435](https://github.com/openai/codex/issues/42435)），以及 Windows 上 Computer Use 不可达（[#43596](https://github.com/openai/codex/issues/43596)

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态 — 2026-09-12

## 今日要点

`0.61.0` 系列的每夜构建仍在持续推进，团队集中合并了一批沙箱/鉴权加固类 PR（文件系统隔离、OAuth 凭证持久化、Windows 下 git 参数校验、以及间接提示注入防护）。在 Issue 方面，社区高度关注 P1 级别的 Agent 可靠性缺陷——子代理在达到 MAX_TURNS 后误报成功、通用代理挂起、以及 Shell 执行在「等待用户输入」状态下冻结；而更宏观的功能方向正逐渐收敛于 AST 感知的工具链、持久化记忆系统，以及更安全的自主执行。

## 版本发布

- **[v0.61.0-nightly.20260911.ged2ac40df](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260910.ged2ac40df...v0.61.0-nightly.20260911.ged2ac40df)** — 自动化每夜版本号更新（[PR #29285](https://github.com/google-gemini/gemini-cli/pull/29285)）。与上一晚 `v0.61.0-nightly.20260910.ged2ac40df` 的差异即为本次实际落地的规范变更日志。

## 热门 Issue

1. **[#22323 — 子代理在 MAX_TURNS 后上报 GOAL 成功](https://github.com/google-gemini/gemini-cli/issues/22323)**（p1，13 条评论）`codebase_investigator` 在触及轮次上限且未真正完成分析时仍报告 `status: "success"`，向用户隐藏了失败。讨论热度高，反映出对子代理遥测可信度的担忧。
2. **[#21409 — 通用代理挂起](https://github.com/google-gemini/gemini-cli/issues/21409)**（p1，8 条评论，8 👍）诸如创建文件夹之类的简单任务，在委派给通用代理后会无限期停滞。较高的点赞比例表明影响面广泛；当前的临时方案是禁止子代理委派。
3. **[#25166 — Shell 命令卡在「等待输入」](https://github.com/google-gemini/gemini-cli/issues/25166)**（p1，4 条评论，3 👍）简单 Shell 命令执行完成后，CLI 会在「Awaiting user input」提示处挂起——典型的 IO 卡死 bug，影响日常工作流。
4. **[#19873 — 零依赖 OS 沙箱与执行后意图路由](https://github.com/google-gemini/gemini-cli/issues/19873)**（p2，9 条评论）战略性 EPIC：借助 Gemini 3 原生的 bash 亲和性，同时通过 OS 原语（Seatbelt、bubblewrap、runsc）保障沙箱安全。
5. **[#21968 — Gemini 未能充分利用 skills/子代理](https://github.com/google-gemini/gemini-cli/issues/21968)**（p2，6 条评论）虽多为个例反馈，但问题一致：模型除非被显式指示，否则会回避用户自定义的 skills 与子代理。这对自定义能力的故事线至关重要。
6. **[#22745 — 基于 AST 的文件读取、搜索与映射 EPIC](https://github.com/google-gemini/gemini-cli/issues/22745)**（p2，7 条评论）调研方向：通过 AST 工具（tilth/glyph）实现精准读取，以削减单轮 token 消耗。
7. **[#26525 — Auto Memory 的确定性脱敏](https://github.com/google-gemini/gemini-cli/issues/26525)**（p2，5 条评论）Auto Memory 当前会在脱敏前将对话记录上传给模型——存在安全敏感性，需要在客户端做确定性的清洗。
8. **[#21983 — 浏览器子代理在 Wayland 下失败](https://github.com/google-gemini/gemini-cli/issues/21983)**（p1，4 条评论）浏览器子代理在 Wayland 会话中失败后以 GOAL 退出，掩盖了真实错误。
9. **[#24246 — 工具数量超过 128 时出现 400 错误](https://github.com/google-gemini/gemini-cli/issues/24246)**（p2，3 条评论）工具过载导致请求失败；需要更智能地按 Agent 调用范围收敛启用的工具集合。
10. **[#22672 — Agent 应阻止/劝阻破坏性行为](https://github.com/google-gemini/gemini-cli/issues/22672)**（p2，3 条评论，1 👍）点名将 `git reset --force` 这类高危命令纳入视野；呼吁默认采用更安全的姿态，并在破坏性语境中提供更明确的指引。

## 关键 PR 进展

1. **[#29282 — fix(auth): persist oauth credentials after login](https://github.com/google-gemini/gemini-cli/pull/29282)**（p2，security）在浏览器/用户码登录流程成功之后立即写入 OAuth 令牌，避免重复弹出 Google 登录。
2. **[#29283 — fix(sandbox): improve filesystem isolation & isolate runtime state](https://github.com/google-gemini/gemini-cli/pull/29283)**（large）沙箱运行现在可获得只读的配置挂载点和临时运行时状态，覆盖 Docker/Podman/runsc/LXC/Seatbelt。
3. **[#29250 — fix(core): prevent indirect prompt injection via build-file & untrusted-flag handling](https://github.com/google-gemini/gemini-cli/pull/29250)**（large）重构 `shell`、`edit` 与 `write_file`，在受限模式下对照被修改的构建配置与外部参数校验工作区边界。
4. **[#29287 — feat(policy): map --yolo to allowedTools wildcard policy](https://github.com/google-gemini/gemini-cli/pull/29287)**（closes [#11303](https://github.com/google-gemini/gemini-cli/issues/11303)）移除特殊处理的 `ApprovalMode.YOLO` 状态；`--yolo` 被映射为 `["*"]` 的 allowedTools 策略。
5. **[#29184 — fix(core): validate git args in Windows sandbox](https://github.com/google-gemini/gemini-cli/pull/29184)**（p1，security）在 Windows 下把 git 子命令视为只读之前校验其参数，阻止 `git diff --output=<path>` 引发的静默截断。
6. **[#29192 — fix(checkpoint): contain legacy raw tag path](https://github.com/google-gemini/gemini-cli/pull/29192)**（p1，security）`/chat delete <tag>` 不再通过 `../` 越出 checkpoints 目录。
7. **[#29186 — fix(core): correct exitCode null check in shell sandbox denial heuristic](https://github.com/google-gemini/gemini-cli/pull/29186)**（p1，security）`ExecutionResult.exitCode` 的类型是 `number | null`，而非 `undefined`——修复了一处沙箱拒绝绕过（#29043）。
8. **[#29187 — fix(core): safeLiteralReplace for LLM prompt template placeholders](https://github.com/google-gemini/gemini-cli/pull/29187)**（p2，security）将 `$` 相关的 `String.prototype.replace` 替换为字面量替换器，避免由用户可控值引发的模板注入（#29044）。
9. **[#29188 — fix(core): match include patterns exactly in read-many-files](https://github.com/google-gemini/gemini-cli/pull/29188)**（p1，security）`String.includes` 曾被滥用——借助目录名片段的包含关系，把二进制资源伪装成「显式请求」；现改为精确匹配 stem/扩展名。
10. **[#29110 — fix(core): route read_file content through FileSystemService](https://github.com/google-gemini/gemini-cli/pull/29110)** 将 `read_file` 接入注入的 `FileSystemService`，恢复与 `write_file`/`replace` 的对等行为，以便使用自定义 FS Provider 的 ACP 客户端正常工作。

## 功能诉求趋势

- **子代理透明性与可靠性** — 通过 `/chat share` 暴露子代理轨迹（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）、准确的终止原因（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)），以及在 Bug 报告中附带子代理上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)）。
- **AST 感知、节省 token 的代码导航** — 多个关联 Issue（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）推动通过 `tilth`/`glyph` 实现精准读取，以削减约 36k token/轮的基线开销。
- **基于文件的持久记忆与任务跟踪** — 用磁盘上的 CRUD 取代 `WriteToDo` 的上下文内列表（[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)）、让 `/compress` 在恢复会话后保持持久（[#21335](https://github.com/google-gemini/gemini-cli/issues/21335)），以及改进 Auto Memory（[#26516](https://github.com/google-gemini/gemini-cli/issues/26516)、[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)、[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)、[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)）。
- **更安全的自主执行** — OS 级别的零依赖沙箱（[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)）、破坏性命令的护栏（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)），以及在工具数量较多时严格执行工作区范围控制（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)）。
- **自我感知的 CLI 界面** — Agent 准确掌握自身 flag/快捷键，以便自我执行（[#21432](https://github.com/google-gemini/gemini-cli/issues/21432)）。

## 开发者痛点

- **Agent 挂起与静默失败** — 通用代理无限等待（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)）以及命令执行后 Shell 卡在「等待输入」（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)）反复出现，严重打断工作流。
- **误导性的子代理遥测** — `Termination Reason: GOAL` 掩盖了 MAX_TURNS（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)），以及对 `get-shit-done` 输出的未处理崩溃（[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)）削弱了对 Agent 报告的信任。
- **浏览器 Agent 不稳定** — Wayland 下的失败（[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)）、`settings.json` 覆盖被忽略（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)），以及脆弱的锁处理（[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)）都在持续削弱浏览器子代理的可靠性。
- **工作区整洁度** — 当 Shell 工具被排除时，模型将临时脚本散落到各个目录（[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)），增加了整洁提交的难度。
- **Skills/子代理的可发现性** — Gemini 在没有显式提示的情况下不会调用可用的 skills（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)），使自定义能力形同虚设。
- **文件/配置边界场景** — 软链形式的 `~/.gemini/agents/*.md` 未被加载（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)），以及格式异常的 `agents.json`/`checkpoint` 导致 CLI 崩溃（[#29208](https://github.com/google-gemini/gemini-cli/pull/29208)、[#29195](https://github.com/google-gemini/gemini-cli/pull/29195)）带来不必要的启动失败。

---

*注：本 24 小时窗口未提供 GitHub Discussions 数据，故省略「热门讨论」一节。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-12

## 今日要点
团队发布了 **v1.0.84-5**，新增基于语义化 JSONL 交换格式的会话与记忆导入命令，同时引入了由文法驱动生成的 shell 自动补全，修复了根级 flag 与子命令补全中长期存在的不一致问题。社区关注度仍然集中在 MCP 协议兼容性相关的若干 bug、几项尚未解决的 Windows 回归问题，以及一波需要分诊的高影响 skills / 插件 / 沙箱议题。

## 版本发布
**v1.0.84-5** — [Release](https://github.com/github/copilot-cli/releases)
- **新增：** 针对语义化 JSONL 交换格式的会话与记忆导入命令，便于实现代理状态的可移植共享与恢复。
- **改进：** Shell 自动补全现在由 CLI 解析所使用的同一份文法生成，因此 `copilot <TAB>` 会在子命令旁同时展示根级 flag，且每个子命令只展示其自身的选项。

## 热门 Issue

1. **[#4095](https://github.com/github/copilot-cli/issues/4095) — Windows 插件更新失败，报 `Access is denied (os error 5)`**（👍 21）。VS Code 的 Copilot 扩展持有 `installed-plugins` 上的监听句柄，即便 git fetch / checkout 已成功，仍会阻断 `copilot plugin update`。以 21 个赞计算，这是反馈最强烈的痛点。
2. **[#4438](https://github.com/github/copilot-cli/issues/4438) — `disable-model-invocation: true` 使 skill 不可达，而非仅限手动调用**（👍 7）。通过 `copilot skill list` 展示的 skill 对模型的 `skill()` 工具不可见——显式请求的 skill 会返回 `Skill not found`，与 frontmatter 标志位所记录的语义相矛盾。
3. **[#4699](https://github.com/github/copilot-cli/issues/4699) — 长时 `--resume` 会话出现 OOM（`JavaScript heap out of memory`）**（👍 5）。CLI 1.0.82 在长时间恢复会话中约每隔数小时撞上 4 GiB V8 上限，且 Node 的诊断转储直接写入用户当前工作目录——同时影响稳定性与目录整洁度。
4. **[#4035](https://github.com/github/copilot-cli/issues/4035) — 语音安装器访问私有 Azure Artifacts 源（HTTP 401）**。启用语音模式时会尝试从私有源拉取 `Microsoft.AI.Foundry.Local.Core 1.2.3`，尽管该包在 nuget.org 上是公开的，导致无源凭据的用户无法使用 `/voice`。
5. **[#4753](https://github.com/github/copilot-cli/issues/4753) — v1.0.83：会话恢复会取消进行中的 stdio MCP 服务连接**（约 1s 超时，1.0.82 中约 16s）。前台会话交接过程会拆除仍在初始化的 MCP 服务，导致整个恢复会话中这些服务被静默禁用。
6. **[#3700](https://github.com/github/copilot-cli/issues/3700) — 高危 WSL2 回归：CLI 空闲时 CPU 占用约 215%，TUI 卡死**。在默认使用场景下，每次干净重启后开启新会话均可复现；实时输出在重启前不再刷新。已被标记为高严重度，并标注为 #2208 的回归。
7. **[#1168](https://github.com/github/copilot-cli/issues/1168) — 单次请求中的“授权疲劳”问题**。一条高层提示（例如“调查 PR 727”）可能触发十数次授权弹窗，使辅助工作既不实用又令人沮丧。
8. **[#4764](https://github.com/github/copilot-cli/issues/4764) — 自动审批在约 1 小时后失效**。辅助权限模式在约 60 分钟后静默降级，仅在执行 `/clear` 或开启新会话时重置，严重限制其在长时间工作流中的可用性。
9. **[#4795](https://github.com/github/copilot-cli/issues/4795) — Atlassian MCP OAuth 失败：回调地址不匹配**。CLI 在随机的临时端口上打开 OAuth 回调，而非已注册的 `:33418`，导致在 WSL Ubuntu 24.04 上 Atlassian MCP 开箱即无法使用。
10. **[#4370](https://github.com/github/copilot-cli/issues/4370) — `server/discover` 返回 `-32602` 时 MCP 初始化失败**（👍 3）。Copilot 在 `initialize` 之前发送专有的 `server/discover` 预请求；符合规范的服务器（如 FastMCP）会拒绝该请求，而 Copilot 将其视为硬性初始化失败，而非回退到标准握手流程。

*值得一提：* [#4026](https://github.com/github/copilot-cli/issues/4026)（2026 年 5 月以来 Windows 原生运行时崩溃，跨 4+ 版本仍未解决）以及 [#4652](https://github.com/github/copilot-cli/issues/4652)（Windows 25H2 上 `--sandbox` 被拒绝）。

## 关键 PR 进展
过去 24 小时内无 PR 活动。

## 热门讨论
本期摘要未提供讨论数据。

## 功能请求趋势
Issue 列表中浮现出若干反复出现的主题：

- **长会话与跨会话记忆。** [#2436（跨会话上下文查询）](https://github.com/github/copilot-cli/issues/2436) 加上 [#4699](https://github.com/github/copilot-cli/issues/4699) 中的 OOM 问题，以及刚刚发布的 JSONL 导入格式，共同指向社区对持久化、可移植、可查询的代理记忆的强烈诉求。
- **生命周期 / 钩子扩展性。** [#4820（会话结束钩子）](https://github.com/github/copilot-cli/issues/4820) 表明用户希望在 `/clear` 与会话边界处获得一等公民的钩子，用于自动保存摘要或运行清理型 skill。
- **模型档位灵活性与成本控制。** [#4821（OpenAI Flex 档位支持）](https://github.com/github/copilot-cli/issues/4821) 给出了具体诉求：在 CLI 中暴露 `service_tier: flex`，将后台任务的 token 成本减半。
- **MCP 生态成熟度。** 持续的 OAuth / refresh、生命周期与对账类 bug（[#4753](https://github.com/github/copilot-cli/issues/4753)、[#4370](https://github.com/github/copilot-cli/issues/4370)、[#4795](https://github.com/github/copilot-cli/issues/4795)、[#4636](https://github.com/github/copilot-cli/issues/4636)、[#4818](https://github.com/github/copilot-cli/issues/4818)）表明用户正在围绕 MCP 构建真实工作流，并期待获得一等公民的、符合规范的支持。
- **Skills 作为一等工件。** `SKILL.md` 的 frontmatter 语义（[#4438](https://github.com/github/copilot-cli/issues/4438)、[#4637](https://github.com/github/copilot-cli/issues/4637)、[#4823](https://github.com/github/copilot-cli/issues/4823)）以及 `AGENTS.md` 的发现规则（[#4822](https://github.com/github/copilot-cli/issues/4822)）正在被推向更严格、更可预测的行为。

## 开发者痛点
- **MCP 协议兼容性与生命周期处理。** 非标准的预初始化 `server/discover` 调用、易碎的对账逻辑、会话恢复时 OAuth 回调失效以及静默的连接取消，正在阻碍 MCP 在生产工作流中的落地。
- **Windows 与 WSL2 上的稳定性。** 反复出现的主题包括：插件安装 / 更新时 `Access is denied`、Windows 25H2 不支持沙箱、2026 年 5 月以来的原生运行时崩溃，以及 WSL2 上的高 CPU 占用 TUI 回归——这些共同让 Windows 沦为“二等公民”平台。
- **授权 / 权限体验。** “授权疲劳”（单次请求弹窗过多）以及辅助权限在约 1 小时后静默过期，都指向当前缺失一套会话内、细粒度的信任模型。
- **长会话记忆的稳定性。** `--resume` 上的 OOM 崩溃、cwd 中残留的崩溃转储，以及缺少跨会话上下文查询能力，都使长时间、多会话的代理工作流脆弱不堪。
- **Skills 与指令的发现机制。** `disable-model-invocation` 的语义、`/skills list` 格式的不一致、`AGENTS.md` 经由符号链接的祖先目录穿越到无关仓库，以及防数据外泄的误报，均表明自定义指令系统需要一次加固。
- **安装器摩擦。** 在 PATH 长度超过 2047 字符的系统上 PATH 被改写（[#4816](https://github.com/github/copilot-cli/issues/4816)）以及语音模式的 401 错误（[#4035](https://github.com/github/copilot-cli/issues/4035)、[#4814](https://github.com/github/copilot-cli/issues/4814)）被反复列为首次运行的阻碍。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-12

## 今日要点

`thdxr` 带来了一波 **发布流水线修复**，稳定了 Windows CLI 签名、将实验性 Node CLI 从 `latest` 渠道移除，并在配置 Azure Trusted Signing 期间暂时省略 v2 Windows 桌面构件。与此同时，社区正大力推进 **子智能体治理**（循环保护、并行上限）和 **供应商可靠性** 问题——尤其是 OpenCode Go、Muse Spark，以及 DeepSeek 上的 prompt 缓存。一些高赞特性请求（#27110 32 👍，#40993 12 👍）反映出对标准化和成本控制的诉求。

## 发布动态

_过去 24 小时内无新发布。_

## 热门议题

1. **[BUG] OpenCode Go 已付费订阅但工作区显示"余额不足"** — [#37790](https://github.com/anomalyco/opencode/issues/37790)（18 条评论）
   付费用户实际无法使用 Go，因为工作区余额未反映 Stripe 支付。社区关注度高，很可能是关键的体验/计费阻塞问题。
2. **[FEATURE] 有没有类似 Claude Code 动态工作流的功能？** — [#30308](https://github.com/anomalyco/opencode/issues/30308)（10 条评论，5 👍）
   对 Claude Code 文档中那种声明式、多步骤工作流的需求旺盛——这是一个明显的产品空白。
3. **[CLOSED] 供应商（Console Go）报错：Upstream request failed** — [#37231](https://github.com/anomalyco/opencode/issues/37231)（9 条评论）
   跨所有 Go 模型的故障，影响 CLI、桌面端以及 VSCode 中的 OpenChamber。表明供应商层存在可靠性问题。
4. **[FEATURE] 仅撤销消息——保留文件更改（像 Claude Code 那样）** — [#7963](https://github.com/anomalyco/opencode/issues/7963)（9 条评论，12 👍）
   强烈要求与 Claude Code 的选择性撤销行为对齐。
5. **[2.0] subagent：约 50 分钟内出现相同工具调用的死循环** — [#45442](https://github.com/anomalyco/opencode/issues/45442)（8 条评论，1 👍）
   364 次相同的 `grep` 调用无控制地消耗 token；暴露了缺乏循环保护的问题——这是一个严重的成本安全隐患。
6. **[macOS v1.17.18] gpt-5.6-sol-fast/high 因 reasoning part rs_*:0 not found 反复失败** — [#36241](https://github.com/anomalyco/opencode/issues/36241)（7 条评论，2 👍）
   在 Codex OAuth 路径上启用高推理强度时流式中断——主要影响 macOS 用户。
7. **[CORE] 提供隐藏或调整右侧状态栏的选项** — [#24373](https://github.com/anomalyco/opencode/issues/24373)（6 条评论，1 👍）
   长期存在的人机工学抱怨；在较小屏幕上状态栏占用终端宽度过多。
8. **[FEATURE] 支持 Agent Plugins 标准（agent-plugins.org）** — [#40993](https://github.com/anomalyco/opencode/issues/40993)（6 条评论，12 👍）
   用于 Skills + MCP 服务器的多厂商打包规范——社区显然希望 OpenCode 在互操作性方面引领。
9. **[2.0] Copilot Legacy 套餐被单条提示一次性耗尽** — [#48330](https://github.com/anomalyco/opencode/issues/48330)（6 条评论）
   v1 → v2 的回归：原本 1500 次/月的订阅在一次会话内就被烧完。对付费用户而言是信任层面的打击。
10. **[FEATURE] 提供限制最大并行子智能体数量的设置** — [#27110](https://github.com/anomalyco/opencode/issues/27110)（5 条评论，**32 👍**）
    本批次中点赞数最高的议题——本地模型用户需要一个防止内存/上下文过载的护栏。

## 关键 PR 进展

1. **feat(app)：类 Codex 风格的侧边栏导航，支持实时线程状态、settle 与 pins** — [#48526](https://github.com/anomalyco/opencode/pull/48526)
   在 Settings → General 后门控的可选持久化导航侧边栏，借鉴 Codex 的 UX。新功能，仍处于开放状态。
2. **fix(release)：从 latest 中省略 node CLI** — [#48568](https://github.com/anomalyco/opencode/pull/48568)
   让实验性 Node 分发不进入 `latest` 渠道；dev/beta 渠道不变。已关闭。
3. **fix(release)：对主 Windows CLI 进行签名** — [#48567](https://github.com/anomalyco/opencode/pull/48567)
   将 Azure 签名限定为主 V2 Windows CLI 二进制文件。已关闭。
4. **fix(release)：对 v2 Windows CLI 进行签名** — [#48566](https://github.com/anomalyco/opencode/pull/48566)
   启用此前被跳过的 V2 签名器。已关闭。
5. **fix(release)：省略 v2 Windows 桌面端** — [#48564](https://github.com/anomalyco/opencode/pull/48564)
   在 Azure Trusted Signing 尚未接入 `v2` 期间的临时变通方案。已关闭。
6. **fix：bash 内存使用** — [#22660](https://github.com/anomalyco/opencode/pull/22660)
   对 bash 工具进行资源效率改进。已关闭（beta）。
7. **feat：暴露 Go 与 Zen 用量** — [#41824](https://github.com/anomalyco/opencode/pull/41824)
   新增 `GET /api/usage`，提供归一化的 Go 配额与 Zen 计费数据，以及 Promise/Effect 客户端方法。已关闭。
8. **refactor(core)：统一 session 消息行** — [#41830](https://github.com/anomalyco/opencode/pull/41830)
   在 core 持久化中引入新的 `SessionMessageRow` 边界——更清晰的 decode/split 语义。已关闭。
9. **feat(plugin)：新增 session stopping 钩子** — [#41811](https://github.com/anomalyco/opencode/pull/41811)
   插件可在 session 进入空闲前按顺序追加上下文（作为隐藏 turn 持久化）。关闭 #16626。已关闭。
10. **fix(desktop)：恢复服务端 CORS 策略** — [#41803](https://github.com/anomalyco/opencode/pull/41803)
    移除 Electron 中的通配符 CORS/Stream 重写，锁定 `oc://renderer`。已关闭。

## 特性请求趋势

- **子智能体治理**：并行智能体上限（#27110，32 👍）、循环检测（#45442）以及子智能体成本控制占据高赞请求前列。
- **工作流编排**：类 Claude Code 的声明式/多步骤工作流（#30308），中断/限额后 session "continue inference"（#44921）。
- **插件与互操作性标准**：采用 Agent Plugins 规范（#40993，12 👍）、SKILL.md 发布流水线（#48504）、MCP 生态示例（#41829）。
- **供应商人机工学**：vLLM 自动发现（#47344），更好地处理 OpenAI 兼容网关拒绝 `prompt_cache_key` 的情况（#45113）。
- **UI/UX 体验改进**：侧边栏开关（#48569）、隐藏/调整状态栏（#24373）、仅撤销消息不恢复文件（#7963，12 👍）、TUI 控制台输出清洗（#48520）。
- **移动端与跨平台**：原生 Android 客户端展示（#48556）、Visual Studio 2026 支持（#11902）。

## 开发者痛点

- **计费/状态同步**：Go 订阅支付未反映到工作区余额（#37790）；v2 session 内一次性烧光 Copilot legacy 配额（#48330）。
- **供应商抖动**：Console Go 上游错误反复出现（#37231），macOS 上 GPT-5.6-sol 推理流中断（#36241），Muse Spark 在 `/chat/completions` 返回 500（#48512、#47237）。
- **Prompt 缓存缺口**：通过 Go 端点即便相同提示，DeepSeek 的 cache_hit 仍为 0（#41125、#43218）——对高强度用户同时影响成本和延迟。
- **TUI 健壮性**：文件监听期间 ENOSPC 崩溃（#48384），库内 `console.*` 输出污染 alternate screen（#48520），音频引擎无限重试（#41770），VCS/session 事件跨工作区串扰（#41842）。
- **v1 → v2 回归**：静默提示不产生输出（#48503、#48506），桌面端启动遮罩永不消失（#48553），`session.error` 事件被忽略导致 UI 一直"busy"（#48530）。
- **文档漂移**：意大利语文档落后于英文，并对 xAI 认证路径描述有误（#48565）。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区动态 — 2026-09-12

## 1. 今日要点

社区焦点仍是 **Windows 兼容性**：Issue [#7547](https://github.com/earendil-works/pi/issues/7547) 评论数已达 62 条，并推动了一次协调性合入（PR [#9504](https://github.com/earendil-works/pi/pull/9504)、[#9501](https://github.com/earendil-works/pi/pull/9501)）。架构侧，`mitsuhiko` 的两个堆叠 PR（[#9116](https://github.com/earendil-works/pi/pull/9116)、[#9117](https://github.com/earendil-works/pi/pull/9117)）落地了对话中段的 system message —— 这是 Pi 处理"由扩展驱动的 prompt 与工具更新"的基础性变更。大会话场景下的性能回退（#9410、#9265）持续暴露，已进入分流处理。

## 2. 版本发布

*过去 24 小时内无新版本发布。*

## 3. 热门 Issue

| # | Issue | 评论数 | 为何重要 |
|---|-------|---------:|----------------|
| [#7547](https://github.com/earendil-works/pi/issues/7547) | How do you use Pi on Windows? | 62 | 汇集 Windows 痛点的中枢 —— 正在塑造 shell 解析、IME 与 PATH 策略。 |
| [#9323](https://github.com/earendil-works/pi/issues/9323) | Improve Fireworks-specific config | 14 | 通过结构化 bug 报告暴露面向用户的 provider 怪行为（`last-read`）。 |
| [#5323](https://github.com/earendil-works/pi/issues/5323) | Vertex + GCP metadata server support | 9 | 对 `GOOGLE_APPLICATION_CREDENTIALS` 同步执行 `existsSync`，会阻断 GCP 元数据服务器上的合法认证。 |
| [#7321](https://github.com/earendil-works/pi/issues/7321) | Multi-line paste broken on Termux | 5 | 缺少括起粘贴（bracketed-paste）回退 —— 首个 `\r` 即触发提交。影响移动端用户。 |
| [#6108](https://github.com/earendil-works/pi/issues/6108) | `/reload` re-evaluates extension side effects | 5 | 每次 reload 都重复注册主题/副作用 —— 可靠性缺陷。 |
| [#8810](https://github.com/earendil-works/pi/issues/8810) | Extension-registered providers ignored on fresh session | 5 | `defaultProvider`/`defaultModel` 静默回退 —— 对使用扩展 provider 的用户造成困惑。 |
| [#7658](https://github.com/earendil-works/pi/issues/7658) | Extension API for persisting API-key credentials | 4 | 长期缺失的能力：扩展无法写入 `auth.json`。阻碍 OAuth/Key 工作流。 |
| [#6930](https://github.com/earendil-works/pi/issues/6930) | Make `renderPage`/oauth HTML functions public | 4 | 扩展作者希望在不 fork 内部代码的前提下提供品牌化 HTML 页面。 |
| [#9045](https://github.com/earendil-works/pi/issues/9045) | Invalid `--mode` values silently ignored | 4 | `parseArgs(["--mode","yaml"])` 返回 `mode: undefined` —— CLI 卫生不佳。 |
| [#9410](https://github.com/earendil-works/pi/issues/9410) | Escape on large sessions freezes TUI ~60s | 4 | ~465k token 会话上的流式中断几乎不可用 —— 可能与压缩路径相关。 |

## 4. 关键 PR 进展

| PR | 标题 | 状态 | 影响 |
|----|-------|--------|--------|
| [#9116](https://github.com/earendil-works/pi/pull/9116) | `feat(ai):` add mid-conversation system messages | Open（堆叠） | #8998 的第一层 —— 让 pi-ai 在不重写顶层 prompt 的前提下携带 `system` 角色走完一轮。 |
| [#9117](https://github.com/earendil-works/pi/pull/9117) | `feat(coding-agent):` deliver prompt/tool changes as system deltas | Open（堆叠） | 第二层 —— 把 agent 接线为：当工具/prompt 在会话中途变化时，发出 `system` delta。属于基础性变更。 |
| [#9504](https://github.com/earendil-works/pi/pull/9504) | Accept Windows Store shell aliases | Open | 用 `accessSync(F_OK)` 替换 `existsSync` —— 修复 Store 别名上的 EACCES（#36790）。 |
| [#9501](https://github.com/earendil-works/pi/pull/9501) | Resolve Windows shells from installation dirs | Open | 统一硬编码/环境变量/多级回退的 shell 查找；随附 Windows 文档清理。 |
| [#9505](https://github.com/earendil-works/pi/pull/9505) | Honor `model.samplingParams` in openai-completions stream | Open | 修复工具调用轮次上被丢弃的 per-model 采样参数（vLLM/llama.cpp 的 `repetition_penalty`、`dry_multiplier_*`）。 |
| [#9489](https://github.com/earendil-works/pi/pull/9489) | Bedrock Converse: normalize gross `inputTokens` per family | Open | 区分 Anthropic（cache-net）与其他模型族，以正确核算费用与限额。 |
| [#9488](https://github.com/earendil-works/pi/pull/9488) | Add canonical Codex turn attribution | Open | 为 Codex 提供与 provider 无关的 `requestIdentity`（session/thread/turn/window 元数据）—— 改善 steer、重试与压缩恢复。 |
| [#8572](https://github.com/earendil-works/pi/pull/8572) | Amazon Bedrock Mantle | Open | 在既有 Converse 路径之外，新增 Mantle 接入面（新的 OpenAI/GPT-OSS 端点）。 |
| [#9442](https://github.com/earendil-works/pi/pull/9442) | Allow prompt cache keys for compatible proxies | Open | 通过 `compat.supportsPromptCacheKey` opt-in，让兼容 OpenAI 的代理在短保留场景下接收 pi 的会话 key。 |
| [#9468](https://github.com/earendil-works/pi/pull/9468) | Deferred extension reload (`requestReload`) | Open | reload 在 settle 时合并（绝不会在轮次中途触发）；`ReloadHandler.followUp` 支持 reload 后 TUI 自动提交。 |

## 5. 热门讨论

*本次动态未提供讨论数据。*

## 6. 功能请求趋势

- **Windows 一等公民支持** —— shell 发现、IME、非 `C:` 盘路径、Store 别名（Issue #7547、#7175、#9490、#9497、#9507；PR #9501、#9504）。
- **更丰富的扩展 API 表面** —— `auth.json` 持久化（#7658）、公开 HTML 辅助函数（#6930）、显式 `customCwd`/ctx-cwd 回退（#9483）、延迟 reload（#9468）。
- **Provider 覆盖与元数据** —— Bedrock Mantle（#8572）、Bedrock Converse 的 input-token 语义（#9489）、Vertex/GCP 元数据（#5323）、Fireworks 配置（#9323）、Codex turn 标识（#9488）。
- **会话中段的上下文管理** —— 用于 prompt/工具变更的 system-message delta（#9116/#9117）；有界压缩输入（#8371）。
- **TUI 人机交互** —— 内联图片开关（#9496）、Markdown 标题/代码样式修复（#9473）、Windows Terminal 上的 Shift+Enter（#7175）。
- **评测驱动的文档** —— PR #9491 引入 provider 定制的 doc-lift 评测。

## 7. 开发者痛点

- **Windows 仍不平滑**：盘符边界情况（#9490）、IME 延迟（#9497）、Store 别名 EACCES、Shift+Enter 误绑定（#7175）、RPC 关停时 libuv 崩溃（#9507）。
- **大规模场景的性能悬崖**：大上下文流式传输中按 Escape 导致 TUI 冻结约 60 秒（#9410）；OpenAI 流上工具调用参数的 O(n²) 重解析（#9265）。
- **扩展生命周期的意外行为**：`/reload` 重复执行依赖副作用（#6108）；扩展注册的 provider 上 `defaultProvider`/`defaultModel` 被忽略（#8810）。
- **CLI 静默失败**：非法值的 `--mode` 静默 no-op（#9045）；发布示例中 `--no-extensions` 与 `--no-extension` 拼写不一致（#9205）。
- **Provider 集成摩擦**：工具调用轮次上 `samplingParams` 被丢弃（#9506）、带 URL 依赖时 `pi update --extensions` 触发 `EALLOWREMOTE`（#9499）、`build:offline` 在 Google 的 `TOO_MANY_TOOL_CALLS` 结束原因上失败（#9502）。
- **工具层人机交互**：`read`+`edit` 竞态导致 "1-line EOF" 错误（#8318）；无界压缩输入无法再次压缩（#8371）；启动横幅列出 `disable-model-invocation` 技能却未做 per-project 排除（#9493）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-12

## 今日要点

夜间构建版本 **v0.23.3-nightly.20250911** 持续收紧守护进程/Web Shell 的会话生命周期，同时在 VS Code 扩展、Windows PTY 层以及遥测管线中浮出多个高严重性 Bug。社区关注点集中在 **会话历史可见性（#11574）**、**VS Code Remote-SSH Webview 卡死（#11556）**，以及一项隐私敏感的 **遥测泄露原始工具错误文本（含 shell 命令行）（#11198）** ——其中最后一项已有修复 PR（#11649）在路上。

## 版本发布

**v0.23.3-nightly.20250911**（[#aaa6a32aae](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20250911.aaa6a32aae)）
- 移除钉钉渠道中已废弃的后台响应聚合逻辑（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)）。
- 继续推进 `feat(channels)!` 重构分支；源文件中 CHANGELOG 被截断。

## 热门议题

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500)** —— 多个后台子代理完成时，TUI 以 **Minified React error #185**（"Maximum update depth exceeded"）静默退出。由 `Ink useBoxMetrics` 布局监听器 `setState` 循环引起的 P1 渲染 Bug；用户会在没有任何错误提示的情况下丢失会话连续性。
2. **[#9693](https://github.com/QwenLM/qwen-code/issues/9693)** —— Windows 上的 Qwen Desktop 在启动时针对 STDIO MCP 服务器报告 `MCP -32000 Connection closed`，即便 MCP 尚未启用。Windows 用户长期面临的集成阻塞问题。
3. **[#8138](https://github.com/QwenLM/qwen-code/issues/8138)** —— 在 `git worktree` 内保存设置时，会写入 **项目根目录** 的 `settings.json`，而非 worktree 自身的 `.qwen/settings.json`，破坏了按 worktree 隔离的原则。
4. **[#11352](https://github.com/QwenLM/qwen-code/issues/11352)** —— Windows Web 终端 PTY 即便在 shell 工具端已由 #11497 修复后，正常退出时仍会泄漏 `conhost.exe`。范围已收窄至 Web 终端 PTY，等待后端修复。
5. **[#11574](https://github.com/QwenLM/qwen-code/issues/11574)** —— VS Code 0.23.1 扩展更新后 **隐藏了所有先前的会话历史**，原因是历史对话框硬编码了 `sourceType=vscode` 过滤器，而旧版对话记录从未写入该字段。给升级用户带来真实的数据丢失感受。
6. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556)** —— `vscode-ide-companion` 0.23.1 在 Remote-SSH 下无法工作，Webview 一直停留在加载状态。正在浮现跨架构（x64 客户端 → arm64 主机）失败模式。
7. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198)** —— **安全/隐私：** 默认开启的使用统计通道会在未经脱敏的情况下，将原始工具错误文本（包括 shell 命令行、URL 中嵌入的凭据、Bearer token）上传至 RUM。该问题早已存在于 `main` 分支，影响范围大于先前标记的 #10916 字段。
8. **[#10850](https://github.com/QwenLM/qwen-code/issues/10850)** —— `Dependency CVE audit` CI 因 `fast-uri`、`qs`、`uuid` 的新公告而在全仓库范围内失败。仓库卫生方面已具备 P1 等待人工介入的条件。
9. **[#11610](https://github.com/QwenLM/qwen-code/issues/11610)** —— Hooks 引擎契约需与 Claude Code 对齐：明文 stdout、`stop_hook_active`、超时单位、matchers、通用输入。属于跨工具可移植性层面的路线图级 P1。

## 关键 PR 进展

1. **[#11636](https://github.com/QwenLM/qwen-code/pull/11636)** —— 为守护进程与 Web Shell 中的后台结果处理引入明确的守护进程执行生命周期。补齐长期悬而未决的结果延续语义缺口。
2. **[#11649](https://github.com/QwenLM/qwen-code/pull/11649)** —— 在使用统计遥测 sink 中对错误文本进行脱敏处理 —— 直接修复 [#11198](https://github.com/QwenLM/qwen-code/issues/11198)。关键隐私修复 PR。
3. **[#11643](https://github.com/QwenLM/qwen-code/pull/11643)** —— 将 Web 终端 PTY 运行在捆绑的 ConPTY 后端上（`useConptyDll: true`），即时释放宿主引用。闭合 [#11352](https://github.com/QwenLM/qwen-code/issues/11352) 的剩余一半问题。
4. **[#11242](https://github.com/QwenLM/qwen-code/pull/11242)** —— `feat(browser-use)`：新增 Chrome Native Messaging 中继，通过本地宿主 + Qwen Chrome 扩展将 Browser SDK 连接到用户现有的 Chrome。无需定制 Chromium 构建即可解锁 browser-use。
5. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086)** —— `feat(serve)`：将扩展作用域限定在工作区运行时；将扩展状态协调到活跃工作区，并更新 `@`/composer 入口。
6. **[#11392](https://github.com/QwenLM/qwen-code/pull/11392)** —— `fix(mcp)`：在失败后恢复池化 MCP 连接而不重放调用，恢复守护进程/ACP 上下文中的会话工具/提示/资源注册。
7. **[#11640](https://github.com/QwenLM/qwen-code/pull/11640)** —— `fix(core)`：将 DashScope 对话缓存断点置于重新附加的图片 **之前**，使"最近重新附加的图片"区块不再污染缓存对话标识。
8. **[#11625](https://github.com/QwenLM/qwen-code/pull/11625)** —— 在 `pnpm-lock` 与 `package-lock` 之间增加一致性校验关卡，并补充 hoisted-import 声明。最终落实 #10444 的双锁文件设置。
9. **[#11001](https://github.com/QwenLM/qwen-code/pull/11001)** —— `fix(test)`：让交互式 PTY 测试用具等待其结束的所有会话（而非发出信号后即跳过），降低清理路径中的 flaky 问题。
10. **[#6019](https://github.com/QwenLM/qwen-code/pull/6019)** —— `feat(cli)`：新增 `/model --compaction`，用于指定专用的自动压缩模型 —— 让用户可独立于聊天模型调优压缩质量/成本。

## 功能诉求趋势

- **与 Claude Code 的 Hooks 兼容性** —— 契约对齐（明文 stdout、`stop_hook_active`、超时单位、matchers、通用输入）已成为跨工具可移植性的最高优先级诉求（[#11610](https://github.com/QwenLM/qwen-code/issues/11610)）。
- **跨扩展的会话历史可靠性** —— VS Code 会话历史（[#11574](https://github.com/QwenLM/qwen-code/issues/11574)）与 Web Shell 的"继续被打断的会话"（[#11545](https://github.com/QwenLM/qwen-code/pull/11545)）共同表明一个统一诉求：稳定、可迁移的会话元数据。
- **Web Search 体验** —— 为引用来源提供真实页面标题（[#11564](https://github.com/QwenLM/qwen-code/issues/11564)），便于模型输出 `[title](url)` 而非不透明的 URL。
- **独立 / 感知 worktree 的会话** —— 按所有者作用域命名的会话（[#10103](https://github.com/QwenLM/qwen-code/issues/10103)）、worktree 会话生命周期清理（[#11024](https://github.com/QwenLM/qwen-code/issues/11024)）、以及无工作区的独立会话 serve 模式（[#8908](https://github.com/QwenLM/qwen-code/issues/8908)），正汇聚为"一等公民的多会话"产品面。
- **扩展 skill 命名空间化** —— 从扁平全局命名迁移至 `extension:skill` 的限定调用方式，与上游 gemini-cli 对齐（[#9408](https://github.com/QwenLM/qwen-code/issues/9408)）。

## 开发者痛点

- **后台代理风暴导致 TUI 静默崩溃。** `Ink useBoxMetrics` 中触发的 React "Maximum update depth exceeded"（[#11500](https://github.com/QwenLM/qwen-code/issues/11500)）会以无可视错误提示的方式终止会话并丢失上下文 —— 在并发执行工作中反复出现的 Bug 类型。
- **Windows 仍是二等平台。** MCP STDIO 失败（[#9693](https://github.com/QwenLM/qwen-code/issues/9693)）、PTY/`conhost.exe` 泄漏（[#11352](https://github.com/QwenLM/qwen-code/issues/11352)）、以及仅 Windows 上出现的 monitor 调试目录权限问题（[#11679](https://github.com/QwenLM/qwen-code/pull/11679)）均在过去 24 小时内集中暴露。
- **遥测 / 隐私可见性。** 默认开启的 RUM 在泄露原始工具错误与 shell 命令行（[#11198](https://github.com/QwenLM/qwen-code/issues/11198)），`api_request.request_text` 即便在 `logPrompts=false` 下仍会上传（[#11666](https://github.com/QwenLM/qwen-code/issues/11666)），Responses 管线以未脱敏方式写入 500 字符的请求体前缀（[#11667](https://github.com/QwenLM/qwen-code/issues/11667)）。三条相互独立的泄露路径 —— 明确提出"默认关闭或证明已脱敏"的要求。
- **模型/提供商元数据冲突。** `Part.thoughtSignature` 在各提供商之间共享却无所有权标记（[#9453](https://github.com/QwenLM/qwen-code/issues/9453)）；Responses 清理可能破坏推理/工具调用的邻接关系（[#11665](https://github.com/QwenLM/qwen-code/issues/11665)）；重新附加的图片会污染缓存标识（[#11640](https://github.com/QwenLM/qwen-code/pull/11640)）。多提供商正确性是首要的可靠性主题。
- **CI/CD 脆弱性。** 陈旧的 ECS runner 资源池（[#11633](https://github.com/QwenLM/qwen-code/issues/11633)）、hk4-host 标签争用（[#10879](https://github.com/QwenLM/qwen-code/issues/10879)）、macOS E2E 分片死亡（[#11134](https://github.com/QwenLM/qwen-code/pull/11134)），以及新的 CVE 公告（[#10850](https://github.com/QwenLM/qwen-code/issues/10850)） —— 发布管线的可靠性已成为当前首要运营问题。
- **ACP / VS Code 会话体验。** 被取代的会话强制关闭会丢弃进行中的工作（[#11511](https://github.com/QwenLM/qwen-code/issues/11511)），断连升级在 POSIX 上的能力缺口（[#11510](https://github.com/QwenLM/qwen-code/issues/11510)），正阻塞 IDE 集成路线的推进。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*