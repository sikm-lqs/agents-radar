# AI CLI 工具社区动态日报 2026-09-06

> 生成时间: 2026-09-06 15:00 UTC | 覆盖工具: 7 个

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

<think>The user wants me to translate the English technical report into Simplified Chinese. I need to follow specific rules:
- Output ONLY the translation
- Preserve Markdown structure exactly
- Keep URLs, code spans, numbers, dates verbatim
- Keep project names, repository slugs, usernames, version tags, file paths, API/config identifiers in original form
- Issue/PR references stay as-is
- Use natural technical Chinese register

Let me carefully translate this report, maintaining the structure while adapting to natural Chinese technical writing.</think>

# AI CLI 工具生态 — 跨工具对比报告
**日期：** 2026-09-06

## 1. 生态概览

2026 年的 AI CLI 工具市场呈现七强格局，各自拥有不同的所有者、模型结盟与架构押注：**Claude Code**（Anthropic）、**OpenAI Codex**（OpenAI）、**Gemini CLI**（Google）、**GitHub Copilot CLI**（GitHub/Microsoft）、**OpenCode**（开源）、**Pi**（独立、由创始人主导）、以及 **Qwen Code**（阿里）。纵观这七个工具，当前主导主题为**多智能体编排的可靠性**、**插件/扩展生态的成熟化**、**语音作为新兴的 CLI 能力**，以及**付费层级的计费/配额透明度**。当下的差异化已不再是底层模型的质量——而是模型之外的运行时：每个工具在会话、子智能体、钩子、MCP、ACP 以及跨平台一致性上的处理能力。**Claude Code 与 OpenAI Codex 是规模领先者**，而 **Pi 与 Qwen Code 分别代表了架构驱动型与协议驱动型（ACP）的两极**。

---

## 2. 活跃度对比

| 工具 | Issues（24h） | PRs（24h） | Discussions（24h） | Releases（24h） |
|---|---|---|---|---|
| **Claude Code** | ~15 高信号（最热话题：117 条评论） | ~12 已合并 | N/A（未提供） | **v2.1.263**（维护性发布） |
| **OpenAI Codex** | 50 | 29 | 8 | 无 |
| **Gemini CLI** | 30 | 20 | N/A（未提供） | **v0.60.0-nightly.20260906** |
| **GitHub Copilot CLI** | 15 | **0** | N/A（未提供） | 无 |
| **OpenCode** | 50 | 50（展示 Top 20） | N/A（未提供） | 无 |
| **Pi** | ~15（展示 Top 10） | ~15（展示 Top 10） | 2 | 无 |
| **Qwen Code** | ~10（展示 Top 10） | 20 | N/A（未提供） | **v0.23.1-preview.0/1**、**v0.23.0-nightly** ⚠️ *失败发布流水线* |

**关键观察：**
- **OpenAI Codex** 绝对工程吞吐量领先（合计 79 项），主要由协调一致的本机语音构建流水线（Bazel + WebRTC + RTP）拉动。
- **OpenCode** 呈现最高的 Issue-to-PR 比率（1:1），反映了一个活跃、对贡献者友好的开源项目——但计费/配额类 Issue 占据了 Issue 侧的主导。
- **GitHub Copilot CLI** 活跃度表面最低（15 个 Issue，0 个 PR），目前正处于围绕 1.0.82 的**回归密集期**。
- **Claude Code** 单话题评论密度最高（Function Hooks：117 条评论、74 👍），表明其深度参与的重度用户基础。
- **Qwen Code** 正处于**发布流水线不稳定窗口**——今日发布三个标签，但 `release.yml` 失败了四次。

---

## 3. 共同功能方向

以下需求在**多个工具社区**中持续出现并形成共识：

| 方向 | 提出需求的工具 | 具体诉求 |
|---|---|---|
| **多智能体编排原语** | Claude Code、Gemini CLI、Qwen Code | Claude Code：Agent Teams 重复 worker bug（#55586）、空闲循环消耗 token（#47930）、后台 `sleep` 挂起（#90930）。Gemini：子智能体谎报成功（#22323、#21983）。Qwen：Agent Team 状态可见性（#11072）。 |
| **插件 / 扩展生态** | Claude Code、Pi、Qwen Code | Claude Code：Function Hooks（#91870，117 条评论）。Pi：`setTuiMode`/`getLayoutRoot`（#9238），可托管的智能体运行时。Qwen：skills + hooks 可靠性（#11180）。 |
| **本机语音输入** | OpenAI Codex、OpenCode、GitHub Copilot CLI（回归影响） | Codex 正在交付 Bazel/MSVC/WebRTC/RTP 流水线（PR #43100、#43097、#43144）。OpenCode 语音 MCP server（#41413 + PR #47625）。 |
| **跨设备 / 多设备会话同步** | OpenAI Codex（投票最高：#14067，61 👍） | 整个生态中今日呼声最高的未实现想法。 |
| **配额与计费透明度** | OpenAI Codex、OpenCode、Claude Code | Codex：异常消耗（#41220）。OpenCode：100% 用量计算错误（#47547）、持续 429（#47613）。Claude Code：Team 计划 Max 20x 对齐（#47509）。 |
| **Windows 平台一致性** | 所有工具 | Claude Code：`CLAUDE_PLUGIN_ROOT`（#68694）、CRLF（#68701）。Codex：pet overlay（#34227）、cua_node 15 分钟挂起（#41170）、MS Store 插件故障（#26792）。Gemini：`git diff --output` 截断（#29184）。OpenCode：git bash 上 TUI 损坏（#39570）。 |
| **子智能体诚实性 / 正确遥测** | Gemini CLI、Claude Code | Gemini：`Termination Reason: GOAL` 出现在 MAX_TURNS 时（#22323）。Claude Code：Agent Teams 中同样模式（#47930）。 |
| **ACP（Agent Communication Protocol）一致性** | Qwen Code、GitHub Copilot CLI、Gemini CLI | Qwen：回合中的消息队列（#8542）。Copilot：`session/request_permission` 回归（#4537）。Gemini：a2a-server 中间件顺序（#29126）。 |
| **会话 / Worktree 生命周期** | OpenAI Codex、OpenCode、Qwen Code | Codex：托管 worktree（#43120）。OpenCode：会话期间位置保留（#47626）。Qwen：`sessionRotation`（#8927）。 |
| **长程记忆与自演化智能体** | Gemini CLI、OpenAI Codex、Claude Code | Gemini：Auto Memory 确定性脱敏（#26525）。Codex：`/learn` + AGENTS.md RFC（#40575）。Claude Code：skill/command 命名空间（#50486）。 |
| **Hook 超时单位兼容性** | Gemini CLI、Claude Code | Gemini：Claude Code hook 迁移时秒误传为毫秒（#29125）。 |
| **BYOK 下的 prompt-cache / 成本控制** | GitHub Copilot CLI、Pi | Copilot：BYOK 静默禁用缓存，成本约 5 倍（#4720）。Pi：Vercel AI Gateway 上 1h 缓存写入按 5m 计费（#9210）。 |

---

## 4. 差异化分析

### 功能聚焦
- **Claude Code** 围绕**插件 + 多智能体编排**展开——Function Hooks 提案与 Agent Teams 的 bug 决定了其当前的前沿。
- **OpenAI Codex** 在**原生基础设施**上加倍投入——语音是其近期 GA 的方向，代码库反映出严肃的平台工程（Bazel、MSVC、WebRTC、RTP）。
- **Gemini CLI** 押注于 **Gemini 3 的 POSIX-bash 亲和性**，并围绕零依赖 OS 沙箱（#19873）与 AST 感知读取（#22745）提出 EPIC——这与 MCP 重度的竞品在设计哲学上根本不同。
- **GitHub Copilot CLI** 通过**企业集成**实现差异化——默认模型策略强制、数据驻留端点、BYOK 行为。目前在可靠性上失分。
- **OpenCode** 是**模型无关、开源的一极**——其定义在于 provider 广度（NIM、Qwen、GitLab、Meta）与终端优先的人体工学。来自 Go 订阅层的商业压力显著。
- **Pi** 是**扩展优先 / 可嵌入的一极**——#8998 的拆分（系统消息 delta vs. 顶层 prompt 重写）与显式的扩展 API（`setTuiMode`、模型运行时暴露）指向一个可托管的智能体运行时。
- **Qwen Code** 是**协议驱动 / 守护进程驱动的一极**——ACP 一致性、`qwen serve` 守护进程的成熟度、与 Claude Code 2.1.260 的 Dynamic Workflows 对齐，构成了其路线图。

### 目标用户
- **Claude Code / Codex / Copilot CLI**：绑定相应厂商生态的企业用户与重度用户。
- **Gemini CLI**：在 Google Cloud 与 Gemini 3 原生 tool-use 甜区内工作的开发者。
- **OpenCode**：OpenCode Go 订阅用户，以及开源贡献者与 provider 无锁定团队。
- **Pi**：扩展作者，以及将 AI 嵌入到其他产品中的团队。
- **Qwen Code**：将 ACP 作为标准的团队，尤其是非西方市场与阿里云生态。

### 技术路径
- **Claude Code / Codex**：闭源，厂商控制。
- **Gemini CLI**：开源，Google 控制，nightly 发布节奏。
- **Copilot CLI**：闭源，GitHub 集成，IDE 邻近。
- **OpenCode / Pi**：开源，独立，社区驱动。
- **Qwen Code**：开源，阿里控制，ACP 原生。

---

## 5. 社区势能与成熟度

| 工具 | 社区信号 | 迭代节奏 | 成熟度指标 |
|---|---|---|---|
| **Claude Code** | **单话题声量最高**（关键 Issue 117 条评论、131 👍） | 稳定维护 + 偶发功能投放 | 高——但 Agent Teams 稳定性欠佳 |
| **OpenAI Codex** | **绝对吞吐量最高**（87 项/天） | 激进的功能推进（语音） | macOS/Linux 上成熟，Windows 上脆弱 |
| **Gemini CLI** | 规模较小但技术深度突出 | Nightly 节奏 | 趋于成熟——记忆与子智能体可靠性是当前的缺口 |
| **GitHub Copilot CLI** | 安静但企业相关性强 | 缓慢——过去 24h 内 0 PR | **停滞**——当前处于回归窗口期 |
| **OpenCode** | **Issue-to-PR 比率最高**（活跃贡献者） | 持续、由贡献者驱动 | 开源层面成熟，计费层尚未成熟 |
| **Pi** | 架构驱动（mitsuhiko） | 稳定的架构类 PR | 规模小但技术上领先——扩展面领先于竞品 |
| **Qwen Code** | CI/发布类信号密集 | **发布流水线不稳定** | 中等成熟度——daemon/ACP 集成是当前瓶颈 |

### 成熟度排名（今日）
1. **Claude Code**——高参与度、高功能性，但多智能体方面脆弱。
2. **OpenAI Codex**——最广的平台投入，Windows 可靠性最窄。
3. **OpenCode**——强健的开源健康度，计费层最弱。
4. **Qwen Code**——协议成熟，发布流水线投入不足。
5. **Gemini CLI**——核心扎实，记忆 + 子智能体诚实性是下一道关卡。
6. **Pi**——规模小但扩展面架构上领先。
7. **GitHub Copilot CLI**——企业相关但当前正在回归。

---

## 6. 趋势信号

### 给在这些工具之上构建的开发者

1. **多智能体编排是下一前沿——且尚未被解决。** 每个带子智能体的工具都在围绕取消、资源隔离、重复派发与诚实的终止报告发布 bug。把今天任何智能体功能视为"在 happy path 上工作，接缝处脆弱"。**参考价值：** 在你自己的多智能体系统中设计显式的取消令牌、共享资源池，以及独立的"终止诚实性"遥测路径。

2. **插件/扩展生态是新的锁定面。** Claude Code 的 Function Hooks（#91870）、Pi 的扩展 API 成熟化（#9238）、以及 Qwen 的 skills/hooks 工作都表明，**插件模型将是下一个差异化战场**。如果你在为长期投资选择一个工具，请先评估其 hook 故事。

3. **ACP 正成为互操作协议。** Qwen Code 全押 ACP，GitHub Copilot CLI 使用它，Gemini CLI 有 a2a-server 中间件，Claude Code 的插件系统遵循类似模式。**预计 2027 年将成为跨厂商智能体交接之年**，类似于十年前 LSP 统一语言服务器。**参考价值：** 从第一天起就用清晰的 JSON-RPC 或 ACP 风格边界来设计智能体接口。

4. **语音正成为 CLI 能力，而非聊天功能。** OpenAI Codex 正在交付一

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

<think>The user wants me to translate an English technical report into Simplified Chinese. I need to:
1. Output ONLY the translation, no preamble or explanation
2. Preserve Markdown structure exactly
3. Keep URLs, code, numbers, dates verbatim
4. Keep project names, repo slugs, usernames, version tags, file paths, API/config identifiers in original form
5. Keep Issue/PR references like #12345 as-is
6. Use natural technical Chinese, register of a Chinese developer newsletter

Let me translate the report carefully, maintaining the structure and technical accuracy.</think>

# Claude Code Skills 社区动态报告

**数据时间：** 2026-09-06 | **来源：** github.com/anthropics/skills

---

## 1. 热门 Skills 排行

以下 PR 代表了仓库中讨论度最高或影响力最大的提交。评估参与度时，综合参考了交叉引用的 Issue 活跃度、多人复现情况以及下游影响，而非仅看反应数。

### 1. PR #1298 — 修复 `run_eval.py` 召回率 0% 的 bug（skill-creator）
🔗 https://github.com/anthropics/skills/pull/1298
仓库中杠杆效应最高的 bug 修复。`run_eval.py` 对每个 skill 描述都报告 `recall=0%`，默默破坏了 `skill-creator` 使用的描述优化循环。已有 10+ 个独立复现案例和清晰的根因分析，该 PR 是 Issue #556 的权威修复方案，解锁了整个由评估驱动的描述调优工作流。

### 2. PR #514 — 文档排版 Skill
🔗 https://github.com/anthropics/skills/pull/514
针对 AI 生成文档中的排版质量问题——孤字换行、标题寡行、编号错位。引发了相当多的讨论，因为每份 Claude 生成的文档都存在这些问题；当前状态为开放，已有大量扩展范围的评论。

### 3. PR #83 — 技能质量与安全分析器（元技能）
🔗 https://github.com/anthropics/skills/pull/83
新增两个元技能（`skill-quality-analyzer`、`skill-security-analyzer`），覆盖五个维度的质量评分和威胁检测。这一提交反映了社区对自审基础设施日益增长的需求——这一主题在 Issue #492（信任边界滥用）中得到了进一步印证。

### 4. PR #210 — 前端设计 Skill 重写
🔗 https://github.com/anthropics/skills/pull/210
一次全面的重写，专注于单次会话内的可操作性以及内部一致性。凸显了一个反复出现的社区痛点：技能被写成开发者文档而非操作指令（参见 Issue #202）。

### 5. PR #486 — ODT（OpenDocument）Skill
🔗 https://github.com/anthropics/skills/pull/486
新增 ODT/ODS/ODF 创建、模板填充及 HTML 转换。对开放标准文档的支持是一致的需求信号——填补了文档技能产品线中的显著空白。

### 6. PR #1628 — Hivemind：零成本多智能体编排
🔗 https://github.com/anthropics/skills/pull/1628
将机械性工作下放至免费层的无头工作节点，同时保留 Claude Code 作为规划者与评审者。反映出社区对成本优化的多智能体模式的强烈兴趣。

### 7. PR #568 — ServiceNow 平台 Skill
🔗 https://github.com/anthropics/skills/pull/568
广泛的企业平台覆盖：ITSM、ITOM、SecOps、FSM、CSDM、IntegrationHub。预示着对深度企业 SaaS 集成的需求已超出纯编码工作流。

### 8. PR #723 — 测试模式 Skill
🔗 https://github.com/anthropics/skills/pull/723
涵盖完整的测试栈（测试金字塔、AAA、React 组件测试等）。直接回应社区最常被请求的工作流：自动化测试生成。

---

## 2. 社区需求趋势

基于 Issue 数据（按评论数排序）：

### 信任、安全与身份（最强信号）
- **#492（43 条评论）** — *社区技能通过命名空间滥用冒充官方 Anthropic 技能。* 这是仓库中讨论度最高的话题，迫切需要经验证的技能签名、命名空间控制与信任清单机制。
- **#16（4 条评论）** — 将 Skills 暴露为 MCP：将技能 API 与 MCP 协议对齐以实现可组合性。
- **#1175（已关闭，4 条评论）** — 在 `SKILL.md` 中嵌入访问控制时的 SharePoint 安全模式。

### 分发与发现
- **#228（16 条评论，👍8）** — *在 Claude.ai 中进行组织级技能共享。* 点赞数最高的开放 Issue；`.skill` 文件交接的摩擦是团队采用的主要阻碍。
- **#189（6 条评论，👍9）** — `document-skills` 与 `example-skills` 插件之间存在重复技能（开放 Issue 中 👍/评论比最高）。

### 新技能方向
- **#1329（9 条评论）** — `compact-memory`：用于紧凑智能体状态的符号化表示——解决长时运行智能体的上下文膨胀问题。
- **#1385（4 条评论）** — 推理质量门禁流水线：任务前校准 → 对抗性评审 → 交付验证。
- **#412（已关闭，6 条评论）** — `agent-governance`：安全模式、威胁检测、审计追踪。
- **#1487（4 条评论）** — `claude-api` 技能会预先注入约 156k tokens——典型地反映了懒加载/渐进式披露的必要性。
- **#29（4 条评论）** — Bedrock 集成——对非 Anthropic 托管部署的需求。

### 核心基础设施 Bug
- **#556（12 条评论，👍7）** — `run_eval.py` 触发率为 0%（PR #1298 和 #1099/#1050 所针对的经典 bug）。
- **#1390（4 条评论）** — `mcp-builder` 的 evaluation.py 对真实 MCP 服务器评分为 0/N。
- **#62（10 条评论）** — 用户技能在重命名后消失——暴露了本地状态处理的脆弱性。
- **#1362（3 条评论）** — `web-artifacts-builder` 在 pnpm ≥10.1 上失效。

### 技能设计质量
- **#202（已关闭，8 条评论）** — `skill-creator` 应遵循其自身的最佳实践——过于冗长、教学式语气、违反编写指南。

---

## 3. 高潜力待合并技能

讨论活跃、范围清晰、需求明确，最有希望合并的 PR：

| PR | 技能 | 为何潜力高 |
|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 评估修复 | 修复仓库中复现最多的 bug（Issue #556，10+ 次复现）；阻塞核心工作流 |
| [#1099](https://github.com/anthropics/skills/pull/1099) + [#1050](https://github.com/anthropics/skills/pull/1050) | skill-creator 的 Windows 兼容性 | 一行修复；彻底解决 Windows 用户痛点 |
| [#538](https://github.com/anthropics/skills/pull/538) | pdf 大小写敏感性修复 | 微小修复，解决了 pdf 技能在大小写敏感文件系统上的失效问题 |
| [#541](https://github.com/anthropics/skills/pull/541) | docx 修订追踪 `w:id` 冲突 | 防止文档损坏；范围明确 |
| [#539](https://github.com/anthropics/skills/pull/539) | YAML 未加引号描述的告警 | 防止静默解析失败 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | self-audit 技能（v1.3.0） | 与 Issue #1385 的推理质量门禁提案一致；元技能需求旺盛 |
| [#1607](https://github.com/anthropics/skills/pull/1607) | claude-api 停用模型清理 | 关闭 Issue #1603；记录了 4 个模型的停用情况 |
| [#1627](https://github.com/anthropics/skills/pull/1627) | buffer-api Agent Skill | 可移植、类 MCP 的接口，可在多种智能体运行时上使用 |

---

## 4. Skills 生态洞察

**社区在技能层面最为集中的需求，是信任、评估与自审的元能力层** ——涵盖签名化的技能身份（Issue #492，43 条评论）、可靠的技能评估工具（#556 + PR #1298，12+ 条评论）、技能质量分析工具（PR #83）以及推理质量门禁（Issue #1385、PR #1367）——清晰地反映了关注点从"技能能做什么"转向"技能如何被信任、被度量并在大规模下安全地组合"。

---

*本报告基于 anthropics/skills 的公开 GitHub 数据整理而成。PR 参与度信号来源于交叉引用的 Issue 活动与下游影响，因为原始查询未直接暴露评论与反应指标。*

---

<think>
We need answer only translation. Need preserve Markdown exactly. Source includes think tags content? User asks translate following English technical report, and included "&lt;think&gt;...&lt;/think&gt;" then report. Rules output only translation preserve structure. We should probably not translate think block? It's part English report? They likely want report translated, perhaps hidden-ish analysis content included intentionally. Need output ONLY translation, preserve Markdown exactly. We need translate the report, perhaps omit `&lt;think&gt;` internal reasoning because that's not part technical report? But request says following English technical report; "think" prefatory seems likely input artifact and should perhaps not be rendered. They explicitly preserve markdown structure, there is no Markdown heading inside think. We should translate actual report from # heading onward. No preamble.

Need natural technical Simplified Chinese. Keep all URLs, link text references unchanged. "Keep URLs, link targets, code spans, code blocks, numbers dates verbatim." Important issue/PR references and their link text stay as-is. They may mean do not translate link text, but title prose around reference? We must preserve all code. Need likely translate all English around. Links text includes title English, so must stay exactly according to "Issue/PR references like #12345 and their link text stay as-is." Yes bold linked titles unchanged. Issue list numbers preserved. Markdown headings translated, but internal code names same. They ask preserve structure exactly, including lists etc. Need carefully translate all.

Let's parse line by line.

Title:
# Claude Code Community Digest — 2026-09-06
Could translate "社区摘要" while project name unchanged. They said project names etc. Claude Code unchanged. Date unchanged.
## 今日要点
Paragraph:
社区正热烈讨论两项重大增强提案：**Function Hooks (#91870)** — ... and ... Since issue title link later unchanged; here reference #91870 not linked, but names? Rules project/API identifiers. "Function Hooks" is feature proper, keep. "Team-plan equivalent of Max 20x" perhaps "面向 Team 计划、相当于 Max 20x 的方案". "power users" high usage users. Stability: cluster of bugs, duplicate worker spawns, idle-loop token burn, backgrounded sleep timer hangs. "surface" exposed area / layer. Translate.

Release title same link text. "维护版本" with bug fixes. No user-facing changelog items. Should not translate? Link text is title and issue/PR reference, says issue/PR references and their link text stay as-is. Here release link text, likely preserve exact. Description translate. "无面向用户的更新日志条目。"

Hot Issues heading maybe "热门问题". Each title in bold linked text must remain as-is. Description translate.

1 #91870 link exact:
**[#91870 — Function Hooks: make plugins 10x more powerful](URL)** (OPEN, 117 comments, 74 👍) — Proposes a parameterized `$`-object hook model with Express/Koa-style `next()` chaining and side-effect tracking. By far the most discussed thread of the day and likely the most consequential plugin-systems RFC in months.

Translate statuses? OPEN, CLOSED are issue metadata; "numbers verbatim" doesn't mean text. Natural newsletter could use "（未关闭，117 条评论，74 👍）" or retain OPEN? User says issue references and link text as-is, not necessarily status. Existing all caps likely translate to "（开放）" perhaps preserve state semantics. Since technical newsletter maybe "（进行中，...）". We can translate OPEN as "（开放）" and CLOSED as "（已关闭）". But "preserve Markdown exactly" text not necessarily unchanged. Link text stays as-is. "comments" maybe "条评论". "consequential" impact. "插件系统 RFC". "$"-object hook model. Express/Koa-style `next()` 链式调用和副作用追踪. "今天讨论度最高，远超其他话题；可能是近几个月影响最深远的插件系统 RFC。" Good.

2 exact link text. "Team plan needs a Max 20x equivalent tier". Description: Senior engineers Team plan capped at 6.25x Pro say routinely limits during agentic sessions. Highest 👍-to-comment ratio, broad quiet demand. "高级工程师" and "智能体会话". Plan names and 6.25x keep. "最高点赞/评论比". Could say "这批摘要中". Fine.

3 title exact. Description critical severity, each duplicate consumes full context and actively edits files, correctness and cost concern. "严重程度：危急" perhaps critical standard = 严重. "每个重复实例都会占用完整上下文并主动编辑文件，带来了严重的正确性与成本问题。" Good.

4 "OSC 8 hyperlinks in statusline broken in Konsole" exact. Description IDE terminals render, real terminal emulators don't. Reminder TUI behavior diverges across `iTerm2`/VSCode/Konsole. "IDE 终端可以渲染，真正的终端模拟器却不行；再次说明不同 `iTerm2`/VSCode/Konsole 环境中的 TUI 行为并不一致。" Statusline should perhaps "状态栏". But link exact, surrounding could say "Konsole 中的状态栏". Good.

5 title exact. "Automatic parallel-tool-call cancellation indistinguishable from user interrupt" and desc. Tool-call maybe "工具调用". "模型无法判断停止操作来自用户还是并发控制，导致恢复流程令人困惑。" Good.

6 title exact. Docs claim monitor tool isn't shipped; recurring feature-reference drift. "文档声称存在，但产品并未提供该工具；再次暴露出功能说明与实际交付脱节的常见问题。"

7 title exact. "Plain quota/policy inconsistency; kind of friction erodes trust in plan messaging." "只是配额/策略不一致；这类摩擦会逐渐削弱用户对套餐说明的信任。" Good.

8 exact title. "lead loops on idle acks, burning 13–22% of input tokens". "Agent Teams 的主会话在空闲确认上循环，消耗 13–22% 的输入 token" "direct cost hit" "多智能体工作流的直接成本冲击；只能靠变通方案关闭会很难接受." Original weird "closed-only-by-workaround would be unwelcome" perhaps "如果只能通过权宜之计来规避，就很难令人接受。" Keep.

9 title exact. "`jdtls-lsp` per-subagent spawn exhausts >50 GB RAM". Description "Java workspaces effectively unusable with claude agents; forced multiple hard resets." Keep code spans. "Java 工作区在运行 `claude agents` 时几乎无法使用；不得不多次强制重置。" >50 GB numeric as is; in Chinese can "超过 50 GB". But number 50 same. "RAM" could translate 内存.

10 exact. Namespace plugin skills with plugin prefix (parity with commands). Description ergonomics fix, `/ce:triage` works, `/assess-repo` collides. "小幅但质量很高的交互体验改进" "命名空间". "与命令保持一致". Need keep code spans. "其他插件发生冲突."

Also notable paragraph exact links and status, no comments etc. "reinforce themes". Need translate.

Key PR
Progress heading "关键 PR 进展" (PR maybe project? acronym not listed but technical, keep). Each link exact and status translate.

1 exact title with feat(bug-reporter), /bug command etc. Since linked text is English and must stay as-is. "一个精致的插件..." "TTY" perhaps "终端内". "low friction for triaging in CI/SSH contexts" "降低 CI/SSH 环境下提交 issue 进行分诊的门槛." GitHub issues maybe "GitHub issue". Fine.

2 title exact. "将不安全的 ... 替换为 stdin redirection; security fix plugin-dev tooling itself." Need code snippet verbatim? Source inline code `bash -c "cat '$X' | …"` must be preserved exact. We can use “使用 stdin 重定向取代不安全的 `...`；这是针对插件开发工具本身的安全修复。” "stdin" is API? keep.

3 title exact. "Corrects three example hook scripts; reference implementations." Good.

4 title exact. "Highest-severity fix in batch" etc. "恶意仓库可能通过符号链接把 `.claude/claude-security-guidance.md` 指向 `~/.ssh/id_rsa`，从而泄露数据。" Exfiltration = 外传. "阻断可扩展性配置读取中的符号链接越界". "安全指引". Keep file paths.

5 link targets and title exact. The link title starts "#68694 / #68699 — normalize..." exact, URL points #68694. Description "Backslash path separators break inline bash hooks; this plus Python wrapper for Store stub restores Windows parity." "Windows 上反斜杠路径分隔符会破坏内联 bash hook；此项变更加上 Store stub 的 Python wrapper 恢复了 Windows 平台一致性。" Store stub maybe "Store stub". Could say "Microsoft Store stub" no, not in source. Keep Store stub. inline bash hooks translate but "bash hooks" maybe "bash hook". Good.

6 title exact. "two-line but repeatedly-felt fix" = 代码虽仅两行，但许多场景反复遇到. Keep security-guidance, learning-output-style code spans. They appear source in backticks. Good.

7 title exact. "guard PROMPT_PARTS expansion against set -u on bash 3.x (macOS)" "在 macOS 的 bash 3.x 上，防止 `PROMPT_PARTS` 展开在 `set -u` 下出错；让 `ralph-wiggum` 插件重新兼容默认 macOS shell。" Note source "Restores plugin" not exactly compatibility. Good.

8 exact. GitHub PATCH replaces whole label array; preserve platform/area/priority labels during dup-close. "GitHub PATCH 会替换整个标签数组；此改动可在重复 issue 关闭（dup-close）时保留平台、领域和优先级标签。" Dup-close maybe code/terminology; source no backticks but preserve maybe. Good.

9 exact. "Tiny CI ergonomics fix; silent exit-1 is maintenance hazard." "很小的 CI 易用性修复；静默以 exit-1 退出是维护隐患。" Keep exit-1 as text perhaps. If code? Original plain exit-1, keep.

10 exact. "Subtle YAML parsing bug left every agent loading with empty name/description/model; anishsamant proposes structured fix." User says usernames remain original. anishsamant should remain. "细微的 YAML 解析 bug 导致所有 agent 加载时 `name`/`description`/`model` 为空；anishsamant 提出结构化修复方案。" Good.

Also notable exact link title. "Fixes a silent security-rule miss because `fnmatch`'s `*` already crosses `/`." Translate. Note code spans: `**` maybe backticks. Keep exactly. "让 `**` glob 模式可匹配零深度路径" good. "解决安全规则被静默漏过的问题，因为 `fnmatch` 的 `*` 本来就能跨越 `/`。" Need curly possessive? `fnmatch` 的. Fine.

Feature Request Trends:
- Plugin extensibility. Function Hooks (#91870) largest; explicit ask for composable, side-effect-safe behaviors beyond today's hook events.
- Plan-tier parity. Persistent demand Team-plan top tier matching Max 20x (#47509), plus inconsistencies and missing monitor.
- Multi-agent orchestration. Features around Agent Teams dominate issue list (lead-session token burn, duplicate worker spawns, backgrounded sleep hang, per-subagent LSP instances). trajectory points toward explicit lifecycle, cancellation, resource-isolation primitives.
- Plugin ergonomics parity: Skills should be namespaced like commands (#50486); `/bug` (#68707) in-terminal bug filing; clearer update banners (#64358); per-prompt rewind/undo Desktop (#43755).
- Desktop / Cowork stability. Artifacts folder shouldn't be hardcoded etc. "Windows Cowork startup" etc.

Developer Pain Points:
- Agent Teams most fragile surface etc.
- Tool-call reliability on Opus 4.8.
- Plan/doc drift.
- Windows plugins bumpy.
- Security surface in plugins.

Need determine whether include horizontal rules. There is only `---` at end. Preserve.

Need no Markdown fences around output. "Preserve Markdown structure exactly" Means use same #, list. They say include horizontal rules. Keep final `---`.

Potential issue: translating "Today's Highlights" etc changes heading but that's intended. Internal link text cannot translate due rule. They also say "Keep URLs, link targets, code spans, code blocks, numbers and dates verbatim." Great.

Need maybe include `&lt;think&gt;`? Let's examine user prompt. They supply a hidden reasoning from another model in tags. They may expect translate everything in source, perhaps no, likely benchmark asks translation and `&lt;think&gt;` content could be considered text to translate. Rules say output only translation and preserve Markdown. If translate `&lt;think&gt;`? "following English technical report" begins "Let me analyze..." inside think, then report. Could be context generated by previous model. Typically user asks translation, and content includes think tags accidentally? We need not expose? Policy doesn't forbid. But output should perhaps start with translation of `&lt;think&gt;`? However, `&lt;think&gt;` is not Markdown heading and there is no corresponding output structure, while technical report starts after. The report itself includes no horizontal rule before #. We need output only translation. Better to omit analysis as not part of report. User likely assesses translation from report only.

Could translate status OPEN and CLOSED. Numbers and emojis verbatim. They said emoji preserve. "74 👍" exact number emoji. Dates exact. Number list exact. Need not alter `10–151` etc. Preserve 13–22%. Use halfwidth minus? Original uses en dash. Keep. &gt;50 GB maybe "超过 50 GB" but number symbol &gt; maybe changed. Rules keep numbers, not exact symbols. Could retain "`&gt;50 GB`" to be verbatim. But natural Chinese "超过 50 GB RAM". I'd use "超过 50 GB 内存" technically changes &gt;. Maybe exact says numbers verbatim only, 50 is same. Fine.

"10x" inside link title must stay exact. `$` object perhaps "参数化的 `$` 对象". Note Markdown interprets `$`? fine.

"Thread" discussion thread = 讨论串. "RFC" acronym keep.

"Max 20x" and "Team plan" maybe proper plan names. Project names and repository slugs etc. "Team plan" and "Max 20x" not explicitly project name, but should keep because in issue title link text and code. In descriptive text could translate "Team 计划" and "Max 20x". Good.

Could preserve exact opening paragraph with bold issue refs? Source bold only `**Function Hooks (#91870)**` and `**Team-plan equivalent of Max 20x**`. We must preserve bold. Inside first there is no issue link but reference. Keep formatting. Use:
社区正热烈讨论两项重大增强提案：**Function Hooks (#91870)**——这是一项变革性的插件可扩展性设计...——以及持续呼吁为高用量用户推出 **Team 计划版 Max 20x**...
Then stability.
Need not add em dash weirdly. Original first em dash. Preserve. Good.

"Agent Teams bugs is surfacing" phrase: "近期集中浮现出一组不寻常的 “Agent Teams” bug". Quotation marks? Original quotes. Chinese can use “Agent Teams”. Keep. "(duplicate worker spawns, idle-loop token burn, backgrounded sleep timer hangs)" use Chinese comma list. "suggesting ... most fragile surface" "这表明多智能体编排层目前是 Claude Code 中最脆弱的一环。" Fine.

Releases link bold exact:
**[v2.1.263](...)** — A maintenance...
Should we put spaces. Same. "维护版本，..." No period issues.

Hot issues:
Status maybe "（OPEN，117 条评论，74 👍）". User says English technical report into Chinese, but issue status commonly translated. Natural. Keep links. Number of comments = 117 comments. We can translate. "OPEN" could be "开放" awkward. "未关闭" sounds natural. In software issue, "开放" standard. Maybe "（开放中，117 条评论，74 👍）". But source says OPEN, likely exact status matters. User's rule "numbers and dates verbatim" not "status". Translation should be natural. "（未解决，...）" and "（已关闭）". This also mirrors GitHub semantics. "未解决" may be more Chinese developer newsletter. For open hot issues, "进行中". I'd use "（开放）" concise but status enum. Chinese developer communities commonly say “OPEN/CLOSED”. Yet translation is expected to translate all. We can use "（未关闭）". They said preserve issue references/link text, not status. Let's choose **（开放中）** for OPEN, **（已关闭）** CLOSED. However issue status is data and one might retain OPEN to avoid semantic drift. "OPEN" literally open. Simplified Chinese can say "（OPEN，...）" but less translated. User says "natural technical Chinese", likely "（开放）". Good.

All link text exact means descriptions can use issue numbers. Need not link numbers in text.

Potential translation nuances:
- "highest 👍-to-comment ratio" "👍/评论比最高".
- "single teammate spawn creates 10–151 duplicate worker instances" title must stay English, but description mention "单个 teammate 创建". Could say "每次创建一个 teammate 就会额外产生 10–151 个重复的 worker 实例". The title tells 10–151. Good.
- "full context" "一份完整上下文". 
- "real terminal emulators" "实体终端模拟器" maybe "传统终端模拟器". 
- "TUI behaviors diverge across iTerm2/VSCode/Konsole." Need keep code spans exact around iTerm2 etc. Original code spans each? `iTerm2`/VSCode/Konsole all are inline code. We must preserve exact code spans. Use "`iTerm2`/`VSCode`/`Konsole`" but this introduces slashes outside/inside? Source `iTerm2`/VSCode/Konsole where first and VSCode? Let's inspect: "across `iTerm2`/VSCode/Konsole." Actually markdown has backticks around iTerm2, then `/VSCode/Konsole` no backticks. The text says "across `iTerm2`/VSCode/Konsole." In prompt rendered plain. We can retain exact. In translation no reason change. Fine.
- "concurrency control" "并发控制机制".
- "feature-reference drift" "功能说明与实际交付逐渐偏离". Good.
- "1m" etc.
- "Max plan" maybe "Max 套餐".
- "closed-only-by-workaround" phrase. Could translate "若最后只能靠 workaround 关闭循环，开发者不会买账。" Use English workaround? Technical Chinese uses “workaround”. Keep maybe.
- `jdtls-lsp` per-subagent spawn exhausts &gt;50 GB RAM: "每个子 agent 启动一个 `jdtls-lsp` 实例，耗尽超过 50 GB 的内存". Good.
- forced multiple hard resets: "被迫多次硬重置". Fine.
- "plugin prefix" "插件前缀".
- "parity with commands" "与 commands
</think>


</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

<think>The user wants me to translate an English technical report (OpenAI Codex community digest) into Simplified Chinese. I need to:
1. Preserve Markdown structure exactly
2. Keep URLs, code spans, numbers, dates verbatim
3. Keep technical identifiers (issue/PR numbers, usernames, etc.) as-is
4. Use natural technical Chinese register appropriate for a developer newsletter
5. Output only the translation, no preamble or explanation

Let me work through this carefully, translating the content while preserving all the technical identifiers and structure.</think>

# OpenAI Codex 社区摘要 — 2026-09-06

## 今日要点

今天的脉搏由 **Windows 质量问题** 和 **原生语音基础设施工作** 主导。已合并的 PR 高度集中在基于 Bazel 的原生语音运行时构建流水线（macOS/Linux/Windows），预示着 Codex 即将推出语音/WebRTC 能力。与此同时，围绕 **配额核算**、**macOS 上的浏览器使用** 和 **VS Code Remote-SSH 会话交接** 的长期痛点仍在持续积累评论。

## 发布版本

_过去 24 小时内无新发布。_

## 热门 Issue

1. **[#34227](https://github.com/openai/codex/issues/34227)** — *Windows 宠物悬浮窗的点击区域随时间与可见吉祥物失同步。* 28 条评论。一个长期存在但令人困扰的 Windows 桌面 Bug，点击目标会逐渐偏离渲染的宠物。表明 "宠物" 功能需要布局重校验工作。
2. **[#7727](https://github.com/openai/codex/issues/7727)** — *在任务右键菜单中添加"删除"选项。* 24 条评论，**99 👍**，目前已 **关闭**。VS Code 扩展中一个高赞的任务管理增强功能终于合集。
4. **[#31073](https://github.com/openai/codex/issues/31073)** — *Windows 原生沙箱：Codex 内 Git HTTPS 远程操作失败/崩溃。* 20 条评论。本地 git 可用；远程 HTTPS 不可用，将问题隔离到 Windows 原生沙箱的网络层。
5. **[#41220](https://github.com/openai/codex/issues/41220)** — *[Meta] Codex 异常使用/配额消耗 — 跨报告追踪器。* 20 条评论，10 👍。一个整合性 Issue，归类了越来越多"配额消失过快"的报告。对计费/配额工程团队来说，这是个重要信号。
6. **[#39280](https://github.com/openai/codex/issues/39280)** — *macOS：Chrome 标签页可以被认领，但每个真实页面操作都失败，策略验证不通过。* 18 条评论。macOS 上的浏览器使用能够成功枚举标签页，但无法执行操作——很可能是打包扩展中策略/清单不匹配。
7. **[#39699](https://github.com/openai/codex/issues/39699)** — *在正常应用开发工作流中，Codex 周配额消耗速度远高于预期。* 15 条评论。ChatGPT Plus 用户报告配额指标已不再匹配他们的实际工作量。
8. **[#39933](https://github.com/openai/codex/issues/39933)** — *Windows 上的 Codex IDE 扩展无法执行命令：`helper_unknown_error`。* 12 条评论。使用 VS Code 1.136 的 Windows 用户遇到设置刷新失败，完全阻塞工具执行。
9. **[#26338](https://github.com/openai/codex/issues/26338)** — *Codex 应用：支持包含多个 Git 仓库的父工作区。* 12 条评论，**32 👍**。一个影响重大的工作区人体工学请求——被列为阻塞 monorepo 工作流的问题。
10. **[#40575](https://github.com/openai/codex/issues/40575)** — *[RFC] 迈向自我进化代理：`/learn` 与 AGENTS.md 的规则代谢。* 12 条评论。一个经过深思熟虑的 RFC，提出用于长时域代理的交互式指令提炼和 AGENTS.md "规则代谢"。值得持续关注。
11. **[#41170](https://github.com/openai/codex/issues/41170)** — *[Windows] 首次启动时约 15 分钟不显示窗口，期间正在解压 `cua_node` 运行时。* 11 条评论。Windows 上的首次运行 UX 回归——应用看起来卡住，实际上在静默解压 Computer-Use 运行时资源。
12. **[#26792](https://github.com/openai/codex/issues/26792)** — *每次 MS Store 自动更新后，打包插件（浏览器/计算机使用）都会静默失效。* 10 条评论。一个可重复出现的 Windows MS Store 回归问题，已连续影响三个版本。
13. **[#41520](https://github.com/openai/codex/issues/41520)** — *无法使用 `gpt-reserve`。* 10 条评论。Plus 等级的 CLI 用户看到 `gpt-reserve` 模型被拒绝，提示存在权益/路由回归。

## 关键 PR 进展

1. **[#43178](https://github.com/openai/codex/pull/43178)** — *在后台迁移启用时，允许有保护的遗留会话恢复。* 当 rollout 维护锁在恢复期间阻碍迁移时，恢复 TUI 缓存的遗留恢复快捷方式。
2. **[#43177](https://github.com/openai/codex/pull/43177)** — *在 TUI 全新启动时使用服务端模型默认值。* 通过在冷启动时遵从应用服务器的有效模型/推理配置，消除一类过时的引导启动 Bug。
3. **[#43147](https://github.com/openai/codex/pull/43147)** — *在会话启动时按模型能力门控实验性上下文。* 实验性上下文现在要求当前模型实际支持它，并且子会话不再从不同父代的上下文继承令牌预算激活。
4. **[#43144](https://github.com/openai/codex/pull/43144)** — *为原生语音库添加 Windows MSVC Bazel 目标。* 使用现有语音配方新增显式的 x64 和 ARM64 Windows 目标。
5. **[#43126](https://github.com/openai/codex/pull/43126)** — *通过 Bazel 目标暴露原生 Windows 构建工具。* 阻止 `windows_support` 丢弃 MSVC 工具和 SDK 支持文件，使其可在 Bazel 中寻址。
6. **[#43125](https://github.com/openai/codex/pull/43125)** — *为原生语音构建添加显式 Windows 工具选择。* 新增 `--windows-build-inputs` 标志，避免 libffi 构建中的 Cygwin/MSVC 工具混淆。
7. **[#43121](https://github.com/openai/codex/pull/43121)** — *组装语音辅助包时要求已准备的运行时。* `--runtime` 现在在 `third_party/voice` 中为必填项，防止仅辅助包在原生绑定加载时失败。
8. **[#43120](https://github.com/openai/codex/pull/43120)** — *为 TUI 会话命令添加托管工作树创建。* 新的 `/worktree` 斜杠命令，以及 `/new` 和 `/fork` 的托管检出选项。
9. **[#43114](https://github.com/openai/codex/pull/43114)** — *为原生语音运行时添加 Bazel 准备。* 手动 `//third_party/voice:native_runtime` 目标验证构建收据并为 macOS/Linux 准备库。
10. **[#43113](https://github.com/openai/codex/pull/43113)** — *通过应用服务器保存子代理和内存选择加入状态。* 切换现在通过服务端配置写入完成，并带有显式的成功/覆盖/失败报告。
11. **[#43100](https://github.com/openai/codex/pull/43100)** — *为语音主机添加有界传入 Opus RTP 处理。* 将未完成媒体上限设为 64 个数据包 / 2 MiB，并在拦截时为数据包打时间戳——是即将到来的实时语音路径的重要加固。
12. **[#43097](https://github.com/openai/codex/pull/43097)** — *添加由辅助进程支持的实时 WebRTC 会话 API。* 引入 `RealtimeWebrtcSession` 以及用于启动、应答协商、音频控制和电平表的可克隆句柄。强烈预示实时语音功能正在接近 GA。

## 热门讨论

### Ideas
- **[#14067](https://github.com/openai/codex/discussions/14067)** — *跨设备同步 Codex 线程和会话上下文。* **61 👍**，10 条评论。投票最高的开放想法——用户希望 Codex 能跨机器以有状态方式跟随他们。
- **[#37693](https://github.com/openai/codex/discussions/37693)** — *在用户消息之间跳转的键盘快捷键。* 长线程的简单导航人体工学。
- **[#28073](https://github.com/openai/codex/discussions/28073)** — *当前会话的可点击用户提示导航器。* 上述建议的补充——单个线程内的可视化历史。
- **[#42703](https://github.com/openai/codex/discussions/42703)** — *长时域上下文：历史检索会让历史递归自指吗？* 关于新令牌预算 / `notes` / `new_context` 机制的细致设计问题，以及"摘要的摘要"是否会降低召回率。

### Q&A
- **[#40740](https://github.com/openai/codex/discussions/40740)** — *Rollout 追踪是否能捕获产生 Declined 执行状态的路径？* 讨论 `policy.rs`/`protocol_event.rs` 中显式的 `match` 分支，以及将 `ExecApprovalRequest`/`ApplyPatchApprovalRequest`/`GuardianAssessment` 排除在持久化之外的理由。

### Show and tell
- **[#41157](https://github.com/openai/codex/discussions/41157)** — *CodexFuse 1.2.0 — Codex 速率限制的本地 Windows 仪表板。* 一个社区托盘应用，展示已用/可用配额和下次重置时间，无需 API 密钥。
- **[#42992](https://github.com/openai/codex/discussions/42992)** — *[macOS] OpenClaw 子代理/内部会话显示为顶层侧边栏聊天。* 内部子代理线程泄露到 Codex 项目侧边栏；部分无法归档。
- **[#43224](https://github.com/openai/codex/discussions/43224)** — *Show & Tell：NULLYARD — 带静态设置指南的公共 MCP 面板。* 运营者创建的纯文本面板，并发布了 MCP 集成指南。

## 功能请求趋势

提炼 Issue 和讨论的横截面，社区正在以下方向发力：

- **跨设备会话和上下文同步**（#14067 及相关线程）——显然是最被强烈要求的方向。
- **多仓库 / monorepo 工作区支持**（#26338 及其关联 Issue）——包含多个 Git 仓库的父文件夹仍是空白。
- **配额透明度和优雅停止策略**（#41220、#39699、#41520、#24927）——向代理暴露实时配额状态，并支持自动停止策略。
- **更好的会话生命周期控制**（#7727 "删除"任务、#20476 删除 Codex Web 历史、#43120 托管工作树）——跨各表面实现创建 / 分支 / 删除 / 归档的对等。
- **长时域代理内存**（#40575 `/learn` + AGENTS.md 代谢、#42703 历史检索限制）——一股朝向自我改进、多周代理的一致推动。
- **长会话导航**（#37693、#28073）——跳转快捷键和可点击的提示索引。
- **实时语音**（多个 PR）——协调一致的原生语音 Bazel + WebRTC + RTP 努力预示着一项面向用户的能力即将到来。

## 开发者痛点

- **Windows 优先的质量回归。** 宠物悬浮窗漂移（#34227）、`cua_node` 首次启动卡顿（#41170）、每次更新时 MS Store 打包插件失效（#26792）以及阻塞工具执行的 `helper_unknown_error`（#39933）共同使 Windows 成为最响亮的痛点面。
- **配额/使用核算不一致。** 多个高评论 Issue（#41220、#39699、#41520、#24927）描述与观察工作量不匹配的配额消耗——是首要的用户信任问题。
- **macOS 浏览器使用失败。** #39280 和 #41334 表明 Chrome 控制半残——认领标签页成功，但策略/管理员策略检查阻止实际操作。
- **Windows 原生沙箱网络。** #31073——在原生沙箱内 Git over HTTPS 无法工作，即使在普通 PowerShell 中可以工作。
- **Remote-SSH 会话交接。** #41849——重连后陈旧的 `app-server` 进程保留线程写入锁，阻塞新会话。
- **CLI 回归。** #42279（钩子在主体运行前超时，在 v0.148.0+ 中回归）和 #41520（`gpt-reserve` 不可用）侵蚀对 CLI 稳定性的信心。
- **认证/MCP 发现空白。** #42427——`codex mcp login` 在 DCR 期间忽略 `WWW-Authenticate resource_metadata`，破坏了发布受保护元数据的 MCP 服务器。
- **安全策略误报。** #43131——授权 Bug 分诊工作流上反复出现 `cyber_policy` 误报；#43058——合法提示被策略分类器标记。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

<think>The user wants me to translate a technical report about Gemini CLI community digest from English to Simplified Chinese. Let me carefully translate this while preserving all the structure, URLs, code, usernames, version tags, etc.

Let me go through each section:

1. Title and date
2. Highlights
3. Releases
4. Hot Issues
5. Key PR Progress
6. Feature Request Trends
7. Developer Pain Points

I need to:
- Preserve all markdown structure
- Keep URLs, usernames, version tags, file paths, code unchanged
- Use natural technical Chinese
- Not include preamble or fences

Let me translate:</think>

# Gemini CLI 社区动态 — 2026-09-06

## 今日要点

今天的活动聚焦于 **子代理可靠性与记忆系统加固**，两个高优先级 Bug（#22323 子代理误报成功、#21409 通用代理挂起）持续引发社区关注。PR 方面，团队合并了一波正确性修复——Windows 沙箱加固（#29184）、SSE flush Bug（#29106）、OAuth issuer 校验（#29117）、MCP 提示编码（#29205）——同时发布了新的 v0.60.0-nightly 版本。

---

## 发布版本

**v0.60.0-nightly.20260906.g85aca163f** — 推送 nightly 构建；与上一 nightly 的完整 diff 可通过 [release comparison](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20250905.g85aca163f...v0.60.0-nightly.20250906.g85aca163f) 查看。

> 注：原文链接日期为 20250905/20250906，按原文保留。

---

## 热门 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — *p1 Bug，agent 方向* — `codebase_investigator` 子代理即便在产出分析前已触发 `MAX_TURNS`，仍会返回 `status: "success"` 与 `Termination Reason: "GOAL"`。**13 条评论**，是当日讨论最多的帖子；将失败伪装为完成，是一项严重的遥测/诚实性回归。*(matei-anghel)*

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — *p1 Bug，agent 方向* — **通用代理在简单操作（如创建文件夹）上无限挂起**，部分用户甚至等待了一小时。值得注意的是该帖获得 **8 个点赞**——是当日最强的社区信号之一；而临时绕过方案（指示模型跳过子代理）暗示着存在路由 Bug。*(turmanticant)*

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — *p2 增强，agent 方向* — 提出 **零依赖 OS 沙箱 + 执行后意图路由** 的 EPIC，使 Gemini 3 可在不牺牲安全体验的前提下原生串联 POSIX 工具。9 条评论；体现了团队对 bash 原生模型的长期架构押注。*(abhipatel12)*

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — *p2 功能，agent 方向* — 追踪 **AST 感知的文件读取、搜索与代码库映射** 的 EPIC，旨在减少错位读取造成的上下文浪费，压缩单轮 token 占用。7 条评论；与 #22746 和 #19561 紧密关联。*(gundermanc)*

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — *p1 Bug，agent 方向* — 尽管有明确的技能描述，**Gemini 几乎不会自主调用自定义技能或子代理**，每次都需用户显式指示。凸显了技能作者在可发现性/指令遵循方面的缺口。*(rnett)*

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** — *p2 安全/agent Bug* — **Auto Memory 的脱敏处理是非确定性的**：密钥在提取提示要求模型清洗之前就已进入模型上下文。与 #26522、#26523 一同构成更广泛的记忆系统清理工作。*(SandyTao520)*

7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** — *p1 Bug，core 方向* — **Shell 命令在成功执行后仍挂起并显示 "Waiting input"**——3 个点赞，工作量中等，且可在简单命令上复现，对用户感知影响较大。*(rnett)*

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — *p1 Bug，browser agent* — **浏览器子代理在 Wayland 下失败**，并出现与 #22323 相同的误导性 `Termination Reason: GOAL` 模式。再次印证子代理上报机制在多个面均存在故障。*(sigmaSd)*

9. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)** — *p2 Bug，agent 方向* — **启用超过约 128 个工具时出现 400 错误**，表明缺乏工具作用域/优先级控制逻辑，阻碍大型扩展配置。*(gundermanc)*

10. **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)** — *p2 Bug* — **`~/.gemini/agents/*.md` 的符号链接文件未被加载为代理**。常见的 dotfile 软链/版本化配置模式会静默失效。*(wtanaka)*

---

## 关键 PR 进展

1. **[#29184](https://github.com/google-gemini/gemini-cli/pull/29184)** — *p1 安全* — **`git diff --output=<path>` 在 Windows 沙箱内会静默截断任意文件**。为 `git status|log|diff|show|branch` 添加参数校验，防止非 YOLO 模式下的隐式写入副作用。*(PakCyberbot)*

2. **[#29106](https://github.com/google-gemini/gemini-cli/pull/29106)** — *core，m-size* — **SSE 解析器在流以无尾随空行结束时，会静默丢弃最终的 `finishReason`/usage 事件**。现已在 EOF 时执行 flush，修复"丢失遥测、无报错"类 Bug。*(AnupamKumar-1，CLOSED)*

3. **[#29117](https://github.com/google-gemini/gemini-cli/pull/29117)** — *core，m-size* — 在 MCP OAuth 中实现 **RFC 9207 issuer 标识**，以防止跨授权服务器的 confused-deputy 令牌路由问题。*(jvargassanchez-dot，CLOSED)*

4. **[#29195](https://github.com/google-gemini/gemini-cli/pull/29195)** — *p2 core* — **`/resume` 在 checkpoint JSON 合法但 `history` 不是数组时会抛出原始 `TypeError`**。现已优雅降级为空 checkpoint，与现有对不可解析文件的处理行为一致。*(soroush5)*

5. **[#29098](https://github.com/google-gemini/gemini-cli/pull/29098)** — *p1/p2 core/agent* — **`useInputHistoryStore.addInput()` 包含非纯函数的 React state 更新器**，在 `setCurrentSessionMessages()` 内部调用了 `recalculateHistory()` 与 `setInputHistory()`——在 StrictMode 双调用下属于非法行为。重构为纯更新器。*(Eswar809)*

6. **[#29205](https://github.com/google-gemini/gemini-cli/pull/29205)** — *p2 core/agent* — **`McpPromptLoader` 对 MCP prompt 响应文本进行了 JSON 编码**，破坏了内嵌的引号与换行。现提交原始文本，并补充了回归测试。*(CoralGarden52)*

7. **[#29125](https://github.com/google-gemini/gemini-cli/pull/29125)** — *p2 core* — **Hook 迁移时原样复制了 Claude Code 的 `timeout` 字段**——但 Claude 单位为秒，Gemini 单位为毫秒，导致迁移后 `"timeout": 30` 实际表示 30ms 而非 30s。修复 #29122。*(0717lee)*

8. **[#29163](https://github.com/google-gemini/gemini-cli/pull/29163)** — *p1 安全* — **在 macOS Seatbelt / 受限权限下的 Git 仓库内运行鉴权时会崩溃**，原因是 `useGitBranchName` 在 `.git` 不可访问时失败。现已安全降级。*(ehsan-fj)*

9. **[#28967](https://github.com/google-gemini/gemini-cli/pull/28967)** — *p2 core* — **静态刷新在 Linux 模拟器上会清除终端回滚内容**（`clearTerminal`）。已替换为标准缓冲模式下的非破坏性清除。修复 #28954。*(Adityakk9031，CLOSED)*

10. **[#29126](https://github.com/google-gemini/gemini-cli/pull/29126)** — *a2a-server，s-size* — `express.json()` 在 `packages/a2a-server/src/http/app.ts` 中挂载于 **A2A SDK 路由之后**，导致 JSON-RPC body 解析失败。已调整中间件顺序。修复 #29073。*(Anurag-M1)*

---

## 功能请求趋势

综合 Issues 与 EPIC 的讨论，最受关注的方向包括：

- **子代理诚实性与遥测** —— 让终止原因与实际情况一致（`#22323`、`#21983`、`#21763`）；通过 `/chat share` 暴露轨迹（`#22598`）；在 `/bug` 报告中保留子代理上下文（`#21763`）。
- **更智能的工具选择** —— 工具数量增长时避免 400 错误（`#24246`）；禁用破坏性的 shell 习惯（`#22672`）；AST 感知的读取/搜索（`#22745`、`#22746`）。
- **与 Gemini 3 原生 POSIX-bash 亲和性对齐的沙箱**（`#19873`）—— OS 级隔离结合意图路由，使 `grep|awk|sed` 链式调用安全可用。
- **记忆系统加固** —— 确定性的密钥脱敏（`#26525`）、inbox 补丁校验（`#26523`）、有界重试（`#26522`）、质量追踪（`#26516`）。
- **持久化、文件化的任务追踪** —— 用文件方式取代上下文内 `WriteToDo`（`#18836`、`#21000`），实现跨会话连续性。
- **CLI 机制的自我感知** —— 让代理准确掌握 flag/快捷键（`#21432`）。
- **节省 token 的读取** —— "Tactful Extraction" 层级（`#19561`），应对约 36.6k token/turn 的基线开销。

---

## 开发者痛点

今日活跃议题中反复出现的困扰：

1. **子代理对成功状态撒谎** —— 多处 Bug 表现为终止原因与实际结果相矛盾（`#22323`、`#21983`），削弱了对遥测与 bug 报告的信任。
2. **挂起与静默失败** —— 通用代理挂起（`#21409`）、Shell 命令在完成后"Waiting input"（`#25166`）、vite 应用交互提示停滞（`#22465`）——均难以在无取消操作时恢复。
3. **跨配置兼容性漂移** —— Hook 超时单位不匹配（`#29125`）、符号链接的 skills/agents 被忽略（`#20079`、`#28968`）、排除工具的文档存在误导（`#28966`）——在 Claude Code 与 Gemini CLI 之间移植技能时产生摩擦。
4. **记忆/密钥暴露面** —— 非确定性脱敏与无界重试引发了对会话记录中 PII 泄漏的担忧（`#26525`、`#26522`）。
5. **Windows 沙箱存在缺口** —— `git diff --output` 静默截断文件（`#29184`）；受限权限下鉴权崩溃（`#29163`）——Windows 在沙箱加固方面持续落后于 macOS/Linux。
6. **工具数量爆炸阻碍大型配置** —— 超过 128 个工具即硬性 400（`#24246`），对拥有丰富扩展套件的资深用户造成惩罚。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

<think>The user wants me to translate a GitHub digest report from English to Simplified Chinese, following specific rules. Let me translate carefully while:
1. Preserving all Markdown structure
2. Keeping URLs, code spans, version tags, issue numbers verbatim
3. Using natural technical Chinese register (developer newsletter style)
4. Not translating project names, usernames, file paths, API identifiers

Let me translate section by section.</think>

# GitHub Copilot CLI — 社区摘要
**日期：** 2026-09-06

---

## 1. 今日要点

- **1.0.82 中的关键企业级回归**：多个高严重性问题集中出现在近期发布的 `1.0.82` 版本中 —— BYOK 提示词缓存被静默关闭（成本约 5 倍），WSL2 会话内存膨胀至约 31 GB，工具调用标记格式错误导致静默失败，以及 `agentStop` 在子代理回合触发致使 `/review` 无法完成。
- **认证与 MCP 可靠性成为焦点**：HTTP 类型 MCP 服务器的 OAuth 令牌缓存键生成重复条目，GHEC 数据驻留租户仍命中 `api.githubcopilot.com`，且 CLI 与其他客户端之间在企业默认模型选择上出现分歧。
- **UX 小问题积重难返**：`ask_user` 表单中的数据丢失、ACP 权限回归（自 1.0.81-1 起未发出 `session/request_permission`）、以及在 desktop 2.98.0 / runtime 1.1.15 升级后出现的 Worktree 缺失故障。

---

## 2. 发布

*过去 24 小时内无新发布。*

---

## 3. 热门 Issue

1. **[#4695 — MCP OAuth 令牌缓存重复](https://github.com/github/copilot-cli/issues/4695)** *(OPEN)* — 使用 OAuth/PKCE 的 HTTP 类型 MCP 服务器会生成重复的缓存键条目，迫使用户在多个会话中反复重新认证。影响所有使用公开 OAuth 客户端的长期运行 MCP 工作流。
2. **[#4692 — 企业默认模型未生效](https://github.com/github/copilot-cli/issues/4692)** *(OPEN)* — CLI 忽略了组织管理的默认模型 `MAI-Code-1.1-Flash`，转而使用其他模型，尽管 VS Code 和 GitHub Desktop 已遵循该策略。这是直接的企业策略一致性差距。
3. **[#4527 — GHEC 数据驻留环境下 `copilot -p` 返回 401](https://github.com/github/copilot-cli/issues/4527)** *(CLOSED)* — 在 `<tenant>.ghe.com` 数据驻留端点上的非交互式提示模式仍命中 `api.githubcopilot.com` 来获取模型目录。4 个 👍 印证了企业用户的痛点；是租户部署的重要参考 bug。
4. **[#4537 — ACP 模式自动批准工具调用（回归）](https://github.com/github/copilot-cli/issues/4537)** *(OPEN)* — 自 1.0.81-1 起，代理不再发送 `session/request_permission`，意味着 shell 命令、文件编辑和删除操作都将未经许可执行 —— 这是 #845 的直接安全回归。
5. **[#4720 — BYOK 静默禁用提示词缓存（成本约 5 倍）](https://github.com/github/copilot-cli/issues/4720)** *(OPEN)* — 1.0.82 的 BYOK 请求省略了提示词缓存声明；提供商报告 `cached_tokens=0`，使上下文成本最高膨胀 5 倍。
6. **[#4694 — WSL2 上 31 GB RSS / 57% CPU（Claude Opus 5）](https://github.com/github/copilot-cli/issues/4694)** *(OPEN)* — 在约 47% 上下文占用 + High Effort 下的长会话，在 WSL2 上会退化为资源失控状态。
7. **[#4706 — 工具调用标记格式错误（`<invoke>` / `court`）导致静默失败](https://github.com/github/copilot-cli/issues/4706)** *(OPEN)* — 由 Copilot CLI 代理自身（Opus 4.8）自行报告；间歇性的乱码调用输出导致静默失败而非抛出明确错误。
8. **[#4734 — desktop 2.98.0 / runtime 1.1.15 升级后出现"Worktree missing"](https://github.com/github/copilot-cli/issues/4734)** *(OPEN)* — 升级后所有基于 worktree 的会话均报缺失；中断现有及新建项目。
9. **[#4738 — `ask_user` 表单按 Enter 时丢弃已输入内容](https://github.com/github/copilot-cli/issues/4738)** *(OPEN, triage)* — 高严重性数据丢失 bug：在多行输入未完成时按 Enter 会直接提交并永久丢失用户已输入的内容。作者要求提供自动保存以及"Enter 换行"语义。
10. **[#3894 — `agentStop` 在子代理回合触发，致使 `/review` 无法完成](https://github.com/github/copilot-cli/issues/3894)** *(OPEN)* — 绑定到 `agentStop` 的自定义钩子会在子代理完成时递归触发，导致 `/review` 无法返回。影响构建自改进代理的插件作者。

*同样值得关注：* [#4272](https://github.com/github/copilot-cli/issues/4272)（CLOSED —— 模型灰显，3 👍）、[#4735](https://github.com/github/copilot-cli/issues/4735)（助手文本被折叠进"Thought for Ns"）、[#4733](https://github.com/github/copilot-cli/issues/4733)（BYOK `max_output_tokens` 事件丢失）、[#4736](https://github.com/github/copilot-cli/issues/4736)（Ctrl+E 内联建议 UX）、[#4737](https://github.com/github/copilot-cli/issues/4737)（社区致谢帖）。

---

## 4. 关键 PR 进展

*过去 24 小时内无 PR 更新。尽管 Issue 队列活跃，但仓库在过去一天内没有合并活动 —— 需关注这一空窗期，因为 1.0.82 中的若干回归仍等待修复。*

---

## 5. 热门讨论

*源数据源中未提供讨论数据 —— 本节省略。*

---

## 6. 功能请求趋势

综合开放 Issue 与功能请求提炼：

- **Emacs 风格的快捷键对齐**：通过 `Ctrl+E` 接受内联建议（#4736）反映出用户对当前默认快捷键之外、更丰富可配置键映射的需求。
- **更好的表单 UX**：在 `ask_user` 中支持多行草稿、自动保存/恢复以及"Enter 即换行"语义（#4738）—— 将表单视为一等编辑器，而非按 Enter 即提交的对话框。
- **推理与面向用户文本的清晰终端渲染**：#4735 呼吁更清晰的区分，使助手消息不会被静默折叠进"Thought for Ns"。
- **健康检查与可观测性**：会话/worktree 生命周期诊断（#4734）以及 `max_output_tokens` 截断日志（#4733）反映出对一等可观测性钩子的需求。
- **BYOK 的缓存与成本控制**：#4720 凸显出对显式提示词缓存开关以及按请求成本报告的需求。

---

## 7. 开发者痛点

本次快照中反复出现的痛点：

- **1.0.82 发布回归是压倒性主题** —— 提示词缓存丢失（#4720）、WSL2 内存爆涨（#4694）、工具调用标记格式错误（#4706）、ACP 权限绕过（#4537）以及 `agentStop` 误触发（#3894）都集中于同一版本。
- **企业/租户一致性差距** —— 默认模型策略（#4692）、数据驻留端点（#4527）以及灰显的模型门控（#4272）表明 CLI 在遵循组织级设置方面落后于 VS Code / Desktop。
- **MCP 认证脆弱** —— OAuth 令牌缓存不稳定（#4695）造成反复的交互式重新认证，中断长期运行的代理工作流。
- **静默失败多于显式失败** —— 标记格式错误时工具调用静默失败（#4706）、截断回合中事件被丢弃（#4733）以及隐藏的助手文本（#4735）都在侵蚀调试信任。
- **交互式 UI 中的数据丢失** —— `ask_user` 中按 Enter 提交的 bug（#4738）是当日对信任影响最直接的单个问题。
- **子代理生命周期钩子规范不足** —— 钩入 `agentStop` 的插件无法区分父回合与子代理回合，阻断了诸如评审后指令更新等常见模式。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

<think>The user wants me to translate an English technical report (a community digest for OpenCode) into Simplified Chinese. I need to:

1. Preserve Markdown structure exactly
2. Keep URLs, link targets, code spans, code blocks, numbers and dates verbatim
3. Keep project names, repository slugs, usernames, version tags, file paths and API/config identifiers in their original form
4. Keep Issue/PR references like #12345 as-is
5. Use natural technical Chinese, register of a Chinese developer newsletter
6. Output ONLY the translation, no preamble, no explanation, no markdown fences around the whole output

Let me carefully translate this community digest. I need to be thoughtful about technical terminology:
- "OpenCode" stays as is
- "TUI" - common term, keep as TUI or use 终端界面
- "MCP" - keep as MCP (Model Context Protocol)
- "PR" - keep as PR or use 拉取请求
- "Issues" - keep as Issues or use 工单/议题
- "HTTP 429" - keep as is
- Code-related terms like "provider", "stream", "session", etc. - some can be translated, some should stay

Let me translate this carefully and naturally as a Chinese developer newsletter would:

- "Community Digest" → 社区动态/社区摘要/社区周报
- "Today's Highlights" → 今日要点
- "Releases" → 版本发布
- "Hot Issues" → 热门 Issue / 热门议题
- "Key PR Progress" → 重点 PR 进展
- "Hot Discussions" → 热门讨论
- "Feature Request Trends" → 功能请求趋势
- "Developer Pain Points" → 开发者痛点

Let me draft the translation:

# OpenCode 社区动态 — 2026-09-06

## 今日要点
今日的活动以 **OpenCode Go 订阅投诉** 为主，多位用户反馈持续的 HTTP 429 速率限制、提前出现的 "100% 用量" 封禁，以及一个把各模型百分比简单求和当作 $60 上限的月度用量计算 Bug。工程方面，贡献者 **kitlangton** 集中提交了围绕会话/生命周期的若干修复（包括 location 缓存和 `FileAccess` 重构），同时多个生态文档类 PR 也在合并中（voice-mcp、llmman、opencode-memory-pro、rlm-opencode）。

## 版本发布
_过去 24 小时无新版本发布。_

## 热门 Issue

1. **[#47613 — Go 订阅：retry-after 长达 12 小时仍持续 HTTP 429](https://github.com/anomalyco/opencode/issues/47613)** — 付费 Go 用户被完全锁定约 3 天；`retryAfterMs` 不断重置，客户端无法恢复。对付费用户影响很大。(4 评论)
2. **[#47547 — Go 月度用量显示 100%，实为各模型百分比简单相加](https://github.com/anomalyco/opencode/issues/47547)** — 计费 Bug 将模型级别 % 与实际 $ 支出混为一谈，远低于 $60 上限的用户被错误封禁。(4 评论，👍 1)
3. **[#47634 — 用量远低于配额却报 `rate_limit_exceeded`](https://github.com/anomalyco/opencode/issues/47634)** — UI 显示各窗口分别为 6%/57%/23.2%，但所有请求均被拒绝；自动重试也失败。(1 评论)
4. **[#47614 — 月度周期重置后，每周配额仍保持 100%](https://github.com/anomalyco/opencode/issues/47614)** — 计数器在新月份边界不清零，即使月度额度充足也会被拦截。(1 评论)
5. **[#45278 — 持续付费 3 个月后付款被拒](https://github.com/anomalyco/opencode/issues/45278)** — 长期存在的计费可靠性讨论；卡片使用数月后突然续费失败。(10 评论，👍 2)
6. **[#10504 — OpenCode 二进制在 Termux / Android aarch64 上原生运行失败](https://github.com/anomalyco/opencode/issues/10504)** — 错误的解释器 + 非 PIE 二进制完全阻塞 Android/Termux 用户。在社区压力下**已关闭**。(10 评论，👍 7 — 窗口内最高 👍)
7. **[#39570 — 多次执行 MCP 操作时 TUI 崩溃](https://github.com/anomalyco/opencode/issues/39570)** — 在 Windows + git bash + v1.18.9 上，连续调用 `gitlab_list_merge_requests` 会破坏 UI。(5 评论)
8. **[#41413 — 为 CLI 工具提供语音输入的 MCP 服务器](https://github.com/anomalyco/opencode/issues/41413)** — 已附可工作的原型（关联 PR #47625）的功能请求。显示与 Cursor/Claude Code 语音能力对齐的需求。(5 评论)
9. **[#35112 — Qwen3.7Plus 上 6 MB 请求体上限阻塞正常图片](https://github.com/anomalyco/opencode/issues/35112)** — 硬性上限使 Go 上的正常截图/附件工作流无法使用。(4 评论，👍 1)
10. **[#30310 — `opencode-go/qwen3.7-max` 间歇性 500 错误](https://github.com/anomalyco/opencode/issues/30310)** — 确认 Go 上 Qwen 系列的可靠性问题（与 #47620 / Qwen 3.8 flash 现象一致）。(4 评论)

## 重点 PR 进展

1. **[#47630 — refactor(core)：将读权限校验集中到 `FileAccess`](https://github.com/anomalyco/opencode/pull/47630)** — 把路径/外部目录/读权限的判定从 `ReadTool` 抽出，汇入共享的 `FileAccess` 抽象，同时也涉及 `kitlangton` 更大的 FileAccess 重构。为更清晰的权限 UX 打基础。
2. **[#47629 — fix(core)：在闲置回收前中断会话](https://github.com/anomalyco/opencode/pull/47629)** — 与 #47626 配对；确保未应答问题的会话不会超过 60 分钟 location 期限，避免"幽灵问题/卡死进度"楔形状态。
3. **[#47626 — fix(core)：会话执行期间保留 locations](https://github.com/anomalyco/opencode/pull/47626)** — **已关闭。** 仅在 in-flight 表单服务结束后才移除 location 缓存项，修复问题消失 Bug。
4. **[#47611 — 对 provider-busy 消息（如 "no eligible device"）增加重试](https://github.com/anomalyco/opencode/pull/47611)** — **已关闭。** 将明文 "no eligible device / temporarily unavailable" 接入现有的 `SessionRetry` 调度（遵循 `Retry-After`、指数退避、重试预算）。对无头 CI 运行尤为重要。
5. **[#47554 — fix(core)：允许读取已注册的 skill 资源](https://github.com/anomalyco/opencode/pull/47554)** — 已发现的 skill 目录（含符号链接的 `~/.opencode/skill`）会在其支撑文件上触发误报的外部目录授权。Skill 加载不再自我阻塞。
6. **[#47621 — fix(provider)：无论内容类型均强制 chunk 超时](https://github.com/anomalyco/opencode/pull/47621)** — 移除 SSE 看门狗上的 `Content-Type` 判断；将 `wrapSSE` 重命名为 `wrapFetch`。有望减少非 `text/event-stream` 响应导致流中断时的会话挂起。
7. **[#47618 — fix(ci)：Bun 缓存键只计算一次](https://github.com/anomalyco/opencode/pull/47618)** — `setup-bun` 在 `restore` 与 `save` 中分别对 `bun.lock` 哈希两次，导致每次 CI 都缓存未命中。对贡献者 CI 影响面虽小但广泛。
8. **[#47595 — feat：技能开关 + 偏好 API](https://github.com/anomalyco/opencode/pull/47595)** — 全局持久化的技能开关 + TUI 控制；取代早期的能力偏好方案 (#43536)。
9. **[#47607 — refactor(opencode)：优化 Levenshtein 并限制编辑锁](https://github.com/anomalyco/opencode/pull/47607)** — 在 `src/tool/edit.ts` 中用两行分配替代完整 `(n+1)×(m+1)` 矩阵；为编辑加锁设上限，防止长编辑独占工具。
10. **[#47599 — fix(tui)：根据终端宽度动态扩展 DialogModel 尺寸](https://github.com/anomalyco/opencode/pull/47599)** — `DialogModel` 之前硬编码为 60 列；在宽屏终端上现在选择器更宽，可用性提升。
11. **[#47204 — fix(client)：流未连接时回退重连](https://github.com/anomalyco/opencode/pull/47272)** — Event-stream 客户端无论失败模式如何都按 1 秒重试，对鉴权失败的浏览器造成压力；现在改为退避。

## 热门讨论
_本次未提供讨论数据。_

## 功能请求趋势

- **运行时权限控制** — `#41909`（`/approve on|off`）和 `#47579`（`/auto` 斜杠命令）都要求会话级切换自动批准而无需重启；补齐与 Claude Code `/approve` 的差距。
- **面向 TUI 的语音输入** — `#41413` + 配套 PR `#47625` 提供社区语音输入 MCP 服务器；是 CLI AI 工具的反复诉求。
- **Go 上更高图片/多模态容量** — `#35112`（6 MB 请求体上限）等话题反映出对更高图片负载上限的需求，尤其是截图驱动的工作流。
- **模型选择器 UX 打磨** — `#47615`（输入后模型选择器卡死）、`#47632`（滚动后选项被清空）、`#47633`（可展开的文本摘要）——都围绕同一 TUI 界面。
- **更多 provider 集成与生态覆盖** — 新增 `llmman`、`voice-mcp`、`opencode-memory-pro`、`rlm-opencode` 的 PR，以及 `#47306` 中的 GitLab 推理变体，都显示出社区对扩展 provider/插件覆盖的明确推进。

## 开发者痛点

- **OpenCode Go 计费与配额正确性** — 最大痛点。带虚假重试窗口的 429 (#47613)、按百分比求和得到的 "100%" 用量 (#47547)、跨月度边界的过期周计数器 (#47614)，以及极低流量下的速率限制错误 (#47634)。付费用户被失灵的计量器挡在外面。
- **订阅/付款的边界场景** — `#45278` 显示即便是长期使用的卡片也会在续费时被静默拒绝，且用户侧缺乏诊断入口。
- **无头会话稳定性** — 约每 10 分钟一次的压缩抖动 (`#47485`)、provider 的 "no eligible device" 楔形状态 (`#47611`)、事件流的重试风暴 (`#47204`)，以及 Bun standalone 上 TUI 渲染时的 SIGILL (`#47037`) 都表明无人值守/长时间运行的会话非常脆弱。
- **1.18.x 中的 TUI 回归** — 选择器卡死 (#47615)、v2 中 Esc 中断失效 (#42960)、M 系列 Mac 上启动耗时 5–20 秒 (#46976)、滚动后文本选择丢失 (#47632)、会话中途无响应 (#47587)、启动即崩溃 (#47606) — 一组小 UI Bug 严重影响日常体验。
- **Provider SDK 可靠性** — `qwen3.7-max` 的 500 错误 (#30310)、`qwen3.8-flash` 崩溃 (#47620)，以及 `meta/muse-spark` 因 `name` 字段过大被拒 (#47619) 都表明网关侧的校验与可靠性存在缺口，这些问题以不透明错误的形式最终落在用户面前。
- **含斜杠 ID 的模型解析** — `#44799` 中类如 `nvidia/nemotron-3-ultra-550b-a55b`（带斜杠的 NVIDIA NIM 键）会完全破坏模型解析；影响所有用前缀 ID 的厂商。

Let me review the translation again for quality and naturalness, especially for the Chinese developer register. Let me also double-check all the technical terms, URLs, issue numbers, etc. remain intact.

I want to make sure:
- All URLs preserved ✓
- Issue/PR numbers preserved ✓
- Code paths preserved ✓
- File names like `src/tool/edit.ts` preserved ✓
- API names like `FileAccess`, `SessionRetry`, `wrapFetch`, etc. preserved ✓
- Configuration names preserved ✓
- User names like `kitlangton` preserved ✓

Let me also make sure the tone is natural for a Chinese developer newsletter. I think this is good. Let me finalize.

Actually, let me re-check #47204 - the original link is https://github.com/anomalyco/opencode/pull/47204 but I wrote 47272. Let me fix that.

Let me also review the formatting - the original has no code fence wrapping, and I should output only the translation.

Let me finalize the output.</think>

# OpenCode 社区动态 — 2026-09-06

## 今日要点
今日的活动以 **OpenCode Go 订阅投诉** 为主，多位用户反馈持续的 HTTP 429 速率限制、提前出现的 "100% 用量" 封禁，以及一个把各模型百分比简单求和当作 $60 上限的月度用量计算 Bug。工程方面，贡献者 **kitlangton** 集中提交了一批围绕会话/生命周期的修复（涉及 location 缓存和 `FileAccess` 重构），同时多个生态文档类 PR 也在合入中（voice-mcp、llmman、opencode-memory-pro、rlm-opencode）。

## 版本发布
_过去 24 小时无新版本发布。_

## 热门 Issue

1. **[#47613 — Go 订阅：retry-after 长达 12 小时仍持续 HTTP 429](https://github.com/anomalyco/opencode/issues/47613)** — 付费 Go 用户被完全锁定约 3 天；`retryAfterMs` 不断重置，客户端始终无法恢复。对付费用户影响很大。(4 条评论)
2. **[#47547 — Go 月度用量显示 100%，实为各模型百分比简单求和](https://github.com/anomalyco/opencode/issues/47547)** — 计费 Bug 把模型级百分比与实际 $ 支出混为一谈，远未达到 $60 上限的用户被错误封禁。(4 条评论，👍 1)
3. **[#47634 — 用量远低于配额却报 `rate_limit_exceeded`](https://github.com/anomalyco/opencode/issues/47634)** — UI 显示各窗口分别为 6%/57%/23.2%，但所有请求均被拒绝；自动重试也失败。(1 条评论)
4. **[#47614 — 月度周期重置后，每周配额仍卡在 100%](https://github.com/anomalyco/opencode/issues/47614)** — 计数器在新月份边界不清零，即使月度额度充足也会拦截正常使用。(1 条评论)
5. **[#45278 — 持续付费 3 个月后付款被拒](https://github.com/anomalyco/opencode/issues/45278)** — 长期存在的计费可靠性话题；卡片用得好好的，续费时突然被拒。(10 条评论，👍 2)
6. **[#10504 — OpenCode 二进制在 Termux / Android aarch64 上原生运行失败](https://github.com/anomalyco/opencode/issues/10504)** — 错误的解释器 + 非 PIE 二进制完全堵死 Android/Termux 用户。在社区压力下**已关闭**。(10 条评论，👍 7 — 本窗口最高 👍)
7. **[#39570 — 多次执行 MCP 操作时 TUI 崩溃](https://github.com/anomalyco/opencode/issues/39570)** — 在 Windows + git bash + v1.18.9 上，连续调用 `gitlab_list_merge_requests` 会破坏 UI。(5 条评论)
8. **[#41413 — 为 CLI 工具提供语音输入的 MCP 服务器](https://github.com/anomalyco/opencode/issues/41413)** — 已附可工作原型（关联 PR #47625）的功能请求。反映出与 Cursor/Claude Code 语音能力对齐的需求。(5 条评论)
9. **[#35112 — Qwen3.7Plus 上 6 MB 请求体上限阻塞正常图片](https://github.com/anomalyco/opencode/issues/35112)** — 硬性上限把 Go 上常规的截图/附件工作流拒之门外。(4 条评论，👍 1)
10. **[#30310 — `opencode-go/qwen3.7-max` 间歇性 500 错误](https://github.com/anomalyco/opencode/issues/30310)** — 确认 Go 上 Qwen 系列存在的可靠性问题（与 #47620 / Qwen 3.8 flash 的现象一致）。(4 条评论)

## 重点 PR 进展

1. **[#47630 — refactor(core)：将读权限校验集中到 `FileAccess`](https://github.com/anomalyco/opencode/pull/47630)** — 把路径/外部目录/读权限的判定从 `ReadTool` 抽出，统一到共享的 `FileAccess` 抽象，同时也涉及 `kitlangton` 的更大规模 FileAccess 重构。为更清晰的权限 UX 打基础。
2. **[#47629 — fix(core)：在闲置回收前中断会话](https://github.com/anomalyco/opencode/pull/47629)** — 与 #47626 配对；确保未应答问题的会话不会撑过 60 分钟的 location 期限，避免出现"幽灵问题/卡死进度"的楔形状态。
3. **[#47626 — fix(core)：会话执行期间保留 locations](https://github.com/anomalyco/opencode/pull/47626)** — **已关闭。** 仅在 in-flight 表单服务结束后才移除 location 缓存项，修复"问题凭空消失"的 Bug。
4. **[#47611 — 对 provider-busy 消息（如 "no eligible device"）增加重试](https://github.com/anomalyco/opencode/pull/47611)** — **已关闭。** 把明文 "no eligible device / temporarily unavailable" 接入现有的 `SessionRetry` 调度（遵循 `Retry-After`、指数退避、重试预算）。对无头 CI 场景尤为关键。
5. **[#47554 — fix(core)：允许读取已注册的 skill 资源](https://github.com/anomalyco/opencode/pull/47554)** — 已发现的 skill 目录（含符号链接的 `~/.opencode/skill`）会对其支撑文件触发误报的外部目录授权。Skill 加载不再自我阻塞。
6. **[#47621 — fix(provider)：无论内容类型均强制 chunk 超时](https://github.com/anomalyco/opencode

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

<think>The user wants me to translate the English technical report into Simplified Chinese. Let me carefully translate the content while preserving:
- Markdown structure (headings, lists, bold, links, code spans)
- URLs, issue/PR numbers, usernames, code identifiers
- Natural technical Chinese register

Let me work through this section by section.

Title and date: Pi Community Digest — 2026-09-06 → Pi 社区日报 — 2026-09-06

## Today's Highlights
The community's attention is dominated by #4945...
社区关注度最高的是 #4945...

Let me go through each section carefully.

Today's Highlights:
- The community's attention is dominated by **#4945** — an open, in-progress reliability investigation into `openai-codex` / `gpt-5.5` sessions that hang on `Working...` with no error, which has accumulated 76 comments and 32 👍.
- On the architecture side, **mitsuhiko** is driving a two-layer refactor (PRs **#9116** and **#9117**) that splits #8998 to deliver prompt and tool changes as system-message deltas rather than rewriting the top-level system prompt — a significant change for prompt caching and extension behavior.
- A cluster of 0.85.1 regression bugs (Ollama stream termination, missing package exports, missing `x-opencode-session` header) also landed today.

中文翻译:
社区当前最关注的当属 **#4945**——一个持续进行中的可靠性调查,聚焦 `openai-codex` / `gpt-5.5` 会话偶尔卡在 `Working...` 无任何输出或报错的问题,该议题已累积 76 条评论和 32 个 👍。架构方面,**mitsuhiko** 正在推动一项两层重构(PR **#9116** 和 **#9117**),将 #8998 拆分,改为以 system message 增量(delta)的形式下发 prompt 与 tool 变更,而不是重写顶层 system prompt——这对 prompt 缓存与扩展行为都有重大影响。此外,今天还集中出现了一批 0.85.1 回归 bug(Ollama 流中断、缺失包导出、缺少 `x-opencode-session` 请求头)。

## Releases
No new releases in the last 24 hours.
过去 24 小时内无新版本发布。

## Hot Issues

1. **[#4945](https://github.com/earendil-works/pi/issues/4945)** — `openai-codex` / `gpt-5.5` sessions occasionally hang on `Working...` with no streamed text or error; only Escape recovers. *Open, in-progress, 76 comments, 32 👍.* The single highest-impact reliability bug in the tracker.

中文:**[#4945](https://github.com/earendil-works/pi/issues/4945)** — `openai-codex` / `gpt-5.5` 会话偶尔卡在 `Working...`,既无流式文本也无错误,只能通过 Esc 恢复。*Open,进行中,76 条评论,32 👍。*跟踪列表中影响最大的单一可靠性 bug。

2. **[#8834](https://github.com/earendil-works/pi/issues/8834)** — Opt-in `pi.namespace` for packages so skills and templates resolve under one `<namespace>:<name>` surface. *Closed (no-action).* Captures an emerging packaging design pattern even though declined.

中文:**[#8834](https://github.com/earendil-works/pi/issues/8834)** — 为 package 增加可选的 `pi.namespace`,使 skills 与 templates 统一通过 `<namespace>:<name>` 形式解析。*已关闭(no-action)。*虽被驳回,但反映出一个新兴的打包设计模式。

3. **[#8826](https://github.com/earendil-works/pi/issues/8826)** — Cap the agent's exponential retry backoff so long transient outages don't run unbounded. Concrete trigger: `503 Too many open files`. Useful for production users hitting flaky upstreams.

中文:**[#8826](https://github.com/earendil-works/pi/issues/8826)** — 对 agent 的指数退避重试设置上限,避免在长时间瞬态故障下无限重试。具象触发场景:`503 Too many open files`。对在不稳定上游环境中运行的生产用户很实用。

4. **[#8827](https://github.com/earendil-works/pi/issues/8827)** — LaTeX blocks containing legacy font switches (`\rm`, `\bf`, `\it`) fall back to raw source instead of unicode math. A clear, narrow TUI rendering bug.

中文:**[#8827](https://github.com/earendil-works/pi/issues/8827)** — 包含传统字体切换指令(`\rm`、`\bf`、`\it`)的 LaTeX 块回退为原始源码,而非 unicode 数学字符渲染。范围明确、边界清晰的 TUI 渲染 bug。

5. **[#8617](https://github.com/earendil-works/pi/issues/8617)** — For Codex, materialize outbound images as `file_id` references rather than base64 on every request. The author has a local prototype ready to merge.

中文:**[#8617](https://github.com/earendil-works/pi/issues/8617)** — 对 Codex,出站图片以 `file_id` 引用形式物化,避免每次请求都重复 base64。作者已有本地原型可合并。

6. **[#9212](https://github.com/earendil-works/pi/issues/9212)** — 13% of `edit` tool calls from `anthropic/claude-sonnet-5` via Vercel AI Gateway arrive truncated (`edits:[{}]`); Fable variant shows 0%. A gateway-specific schema-validation failure worth watching.

中文:**[#9212](https://github.com/earendil-works/pi/issues/9212)** — 通过 Vercel AI Gateway 调用的 `anthropic/claude-sonnet-5`,13% 的 `edit` 工具调用被截断到达(`edits:[{}]`);Fable 变体表现为 0%。一个特定于网关的 schema 校验失败,值得关注。

7. **[#5200](https://github.com/earendil-works/pi/issues/5200)** — IME candidate window stuck at right edge in WezTerm on WSL. Root cause identified (`showHardwareCursor`); affects CJK users disproportionately.

中文:**[#5200](https://github.com/earendil-works/pi/issues/5200)** — WezTerm + WSL 下 IME 候选窗口卡在屏幕右边缘。根因已定位(`showHardwareCursor`),对 CJK 用户影响尤为明显。

8. **[#9209](https://github.com/earendil-works/pi/issues/9209)** — `github-copilot/gpt-6-astra` is routed to `/chat/completions` and rejected; the provider only exposes this model on the Responses API. Repro with extensions disabled.

中文:**[#9209](https://github.com/earendil-works/pi/issues/9209)** — `github-copilot/gpt-6-astra` 被路由至 `/chat/completions` 后遭拒;该 provider 仅在 Responses API 上提供此模型。禁用扩展后仍可复现。

9. **[#9238](https://github.com/earendil-works/pi/issues/9238)** — Request for `setTuiMode()` / `getLayoutRoot()` so side-panel extensions can mount as fullscreen layout columns. Signals the next direction for the extension surface.

中文:**[#9238](https://github.com/earendil-works/pi/issues/9238)** — 需求 `setTuiMode()` / `getLayoutRoot()`,以便侧边栏扩展可挂载为全屏布局列。预示着扩展面的下一个演进方向。

10. **[#8712](https://github.com/earendil-works/pi/issues/8712)** — `sendCustomMessage({ triggerTurn: true })` skips `before_agent_start`, causing extension-injected system prompts to flap and breaking prompt caching. Tightly coupled to the #8998 architecture work.

中文:**[#8712](https://github.com/earendil-works/pi/issues/8712)** — `sendCustomMessage({ triggerTurn: true })` 跳过了 `before_agent_start`,导致扩展注入的 system prompt 反复抖动并破坏 prompt 缓存。与 #8998 架构工作紧密耦合。

## Key PR Progress

1. **[#9116](https://github.com/earendil-works/pi/pull/9116)** — `feat(ai): add mid-conversation system messages`. First layer of the #8998 split. Adds the `system` role to pi-ai and threads it through pi-agent-core and the coding agent without breaking other transports.

中文:**[#9116](https://github.com/earendil-works/pi/pull/9116)** — `feat(ai): add mid-conversation system messages`。#8998 拆分的第一层。在 pi-ai 中新增 `system` 角色,并将其串入 pi-agent-core 与 coding agent,同时不影响其他传输通道。

2. **[#9117](https://github.com/earendil-works/pi/pull/9117)** — `feat(coding-agent): deliver prompt and tool changes as system message deltas`. Stacked on the above; the user-visible half of the architecture change.

中文:**[#9117](https://github.com/earendil-works/pi/pull/9117)** — `feat(coding-agent): deliver prompt and tool changes as system message deltas`。在 #9116 之上叠加;架构变更中面向用户的一半。

3. **[#9096](https://github.com/earendil-works/pi/pull/9096)** — `feat(ai,coding-agent): add Meta provider with Muse subscription OAuth`. Resolves #7543. Notable: refresh token is daily re-mint from identity token; streaming is currently "fake" (full burst).

中文:**[#9096](https://github.com/earendil-works/pi/pull/9096)** — `feat(ai,coding-agent): add Meta provider with Muse subscription OAuth`。关闭 #7543。值得注意:refresh token 由 identity token 每日重新生成;流式输出目前是"假的"(整段突发)。

4. **[#7610](https://github.com/earendil-works/pi/pull/7610)** — `feat(ai): add LLM Gateway and LLM Gateway DevPass providers` (OpenRouter-style router). Replaces a prematurely auto-closed prior PR.

中文:**[#7610](https://github.com/earendil-works/pi/pull/7610)** — `feat(ai): add LLM Gateway and LLM Gateway DevPass providers`(类 OpenRouter 的路由器)。替代了此前被自动过早关闭的 PR。

5. **[#9233](https://github.com/earendil-works/pi/pull/9233)** — `fix(coding-agent): resolve model auth live instead of from startup snapshot`. Removes the race where `hasConfiguredAuth()` reads a snapshot before the background refresh has populated it.

中文:**[#9233](https://github.com/earendil-works/pi/pull/9233)** — `fix(coding-agent): resolve model auth live instead of from startup snapshot`。消除了 `hasConfiguredAuth()` 在后台刷新完成前读取快照而引发的竞态。

6. **[#9224](https://github.com/earendil-works/pi/pull/9224)** — `fix(ai): clamp OpenRouter :free maxTokens to base model`. Cataloged :free entries advertise larger context than the underlying model accepts; clamps `max_tokens` to the base value.

中文:**[#9224](https://github.com/earendil-works/pi/pull/9224)** — `fix(ai): clamp OpenRouter :free maxTokens to base model`。目录中 :free 条目所标称的上下文大于底层模型实际接受值;此处将 `max_tokens` 钳制为基础值。

7. **[#9222](https://github.com/earendil-works/pi/pull/9222)** — `fix(coding-agent): reject reload during active session operations`. In RPC mode, reloads during a running tool could store an error result and forward it to the model. Adds `isStreaming` and active-tool guards.

中文:**[#9222](https://github.com/earendil-works/pi/pull/9222)** — `fix(coding-agent): reject reload during active session operations`。在 RPC 模式下,工具运行期间发生 reload 会存储错误结果并转发给模型。新增 `isStreaming` 与 active-tool 守卫。

8. **[#9227](https://github.com/earendil-works/pi/pull/9227)** — `feat(coding-agent): add per-call tool confirmation extension`. Companion to issue #9228; an opt-in example for per-call confirmation of state-changing custom tools.

中文:**[#9227](https://github.com/earendil-works/pi/pull/9227)** — `feat(coding-agent): add per-call tool confirmation extension`。issue #9228 的配套 PR;针对有副作用的自定义工具提供每次调用确认的可选示例。

9. **[#9219](https://github.com/earendil-works/pi/pull/9219)** — `fix(coding-agent): preserve host UI prototype methods and Proxy traps in wrapUIPromptContext`. Object-spread wrapping dropped non-own properties; switches to a Proxy that forwards correctly.

中文:**[#9219](https://github.com/earendil-works/pi/pull/9219)** — `fix(coding-agent): preserve host UI prototype methods and Proxy traps in wrapUIPromptContext`。原对象展开包装会丢失非自有属性;改用 Proxy 以正确转发。

10. **[#9214](https://github.com/earendil-works/pi/pull/9214)** — `Invoke skills and prompt templates mid-sentence`. Implements the #8457 direction: `/skill:name args` and `/template args` expand anywhere in the input, not only at line start.

中文:**[#9214](https://github.com/earendil-works/pi/pull/9214)** — `Invoke skills and prompt templates mid-sentence`。落实 #8457 的方向:`/skill:name args` 与 `/template args` 允许在输入的任意位置展开,而不仅限于行首。

Also worth noting: **#9080** (jump-to-latest TUI control, with demo video), **#9163** (TUI clipboard simplification, removing the Rust dep so NixOS builds cleanly), and **#8158** (Mermaid terminal rendering upgrade closing #8157/#7832).

中文:另值得关注:**#9080**(jump-to-latest TUI 控制,含演示视频)、**#9163**(简化 TUI 剪贴板处理,移除 Rust 依赖以使 NixOS 构建更顺畅)、**#8158**(Mermaid 终端渲染升级,关闭 #8157/#7832)。

## Hot Discussions

- **Ideas**
  - **[#9207](https://github.com/earendil-works/pi/discussions/9207)** — Suggestion to remove the `Available tools` section from the system message. 2 👍; cuts noise and tokens but tool list still needs to be communicated.

中文:**Ideas**
- **[#9207](https://github.com/earendil-works/pi/discussions/9207)** — 建议从 system message 中移除 `Available tools` 段。2 👍;能削减噪声与 token,但工具列表仍需以其他方式传达。

- **Show and tell**
  - **[#9213](https://github.com/earendil-works/pi/discussions/9213)** — External project offering to embed an "Agent-Friendly Score" badge (86.2/100) in the README. 1 👍.

中文:**Show and tell**
- **[#9213](https://github.com/earendil-works/pi/discussions/9213)** — 外部项目提议在 README 中嵌入 "Agent-Friendly Score"(86.2/100)徽章。1 👍。

## Feature Request Trends

- **Richer extension surface for TUI control** — `setTuiMode` / `getLayoutRoot` (#9238), fullscreen side-panel columns, runtime model registration (#8791), and cancellation of queued follow-ups (#9234) point to Pi evolving toward a hostable, embeddable agent runtime rather than a standalone CLI.

中文:**更丰富的 TUI 控制扩展面** — `setTuiMode` / `getLayoutRoot`(#9238)、全屏侧栏列、运行时模型注册(#8791)以及取消已排队跟进消息(#9234),表明 Pi 正从独立 CLI 向可托管、可嵌入的 agent runtime 演进。

- **Mid-conversation prompt evolution** — Skills/templates invocable mid-sentence (#8457 → #9214) and the #8998 split (PRs #9116/#9117) reframing prompt/tool changes as deltas both reflect demand for non-destructive, cache-friendly runtime prompt mutation.

中文:**会话进行中的 prompt 演进** — Skills/templates 支持句中调用(#8457 → #9214),以及 #8998 拆分(PR #9116/#9117)将 prompt/tool 变更重新表述为 delta,共同反映出对非破坏性、缓存友好的运行时 prompt 变更机制的诉求。

- **Reliability hardening** — Capped retry backoff (#8826), live auth resolution (#9233), reload-during-session rejection (#9222), and acknowledged user-turn delivery (#9236) form a coherent "stop the agent from corrupting its own state" theme.

中文:**可靠性加固** — 退避重试上限(#8826)、实时鉴权解析(#9233)、会话进行中的 reload 拒绝(#9222)与已确认的用户轮次交付(#9236),构成了一个统一的"防止 agent 损坏自身状态"主题。

- **Provider breadth and gateway ergonomics** — LLM Gateway (#7610), Meta+OAuth (#9096), OpenRouter `:free` token clamping (#9224), and Vercel AI Gateway routing config (#9211) reflect demand for a pluggable, well-tested provider matrix.

中文:**Provider 广度与网关易用性** — LLM Gateway(#7610)、Meta+OAuth(#9096)、OpenRouter `:free` token 钳制(#9224)以及 Vercel AI Gateway 路由配置(#9211),反映出对可插拔、经过充分测试的 provider 矩阵的需求。

- **Image and file-reference efficiency** — Codex `file_id` references for images (#8617) and bundled 1h cache TTL handling (#9210) point toward larger payload handling without re-billing the cache.

中文:**图片与文件引用效率** — Codex 图片的 `file_id` 引用(#8617)以及 1h 缓存 TTL 的统一处理(#9210),指向在不重复计费缓存的前提下处理更大负载的方向。

## Developer Pain Points

- **openai-codex hangs** (#4945) — by far the loudest single pain point, with users hitting it repeatedly and the only workaround being Escape-aborting a turn.

中文:**openai-codex 卡死** (#4945) — 截至目前呼声最高的</think>



</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

<think>The user wants me to translate the English technical report into Simplified Chinese. Let me carefully translate the entire digest while preserving the Markdown structure, URLs, code spans, version tags, issue/PR references, usernames, and technical terms.

Let me go through it section by section and translate carefully:

1. The title and date
2. Today's Highlights
3. Releases section with table
4. Hot Issues (10 items)
5. Key PR Progress (10 items + notable PRs)
6. Feature Request Trends
7. Developer Pain Points

I need to keep:
- URLs intact
- #issue/PR numbers
- Version tags like v0.23.1-preview.1
- Code spans
- File paths
- API/config identifiers
- Usernames like @qqqys

Let me write this out carefully.</think>

# Qwen Code 社区动态 — 2026-09-06

## 今日要点

0.23.1-preview 周期仍在稳定过程中：`v0.23.1-preview.1` 已发布，但 release 工作流**今日连续失败四次**，均发生在 `integration_docker` 和 `quality` 任务上（参见 #11166、#11170、#11173、#11179、#11185）。工程方面，社区正在攻克三类反复出现的痛点——臃肿的 `/export html` 产物、脆弱的 CI 基础设施，以及**动态工作流（Dynamic Workflows）**运行时中越来越多的行为差距，#11013 正在追踪其与 Claude Code 2.1.260 的对标差距。

## 发布

过去 24 小时内发布了三个标签，均包含相同的 Web Shell 变更对：

| 版本 | 变更要点 |
|---|---|
| **v0.23.0-nightly.20260905.0c945a6136** | Web Shell nightly 版本，详见下方变更 |
| **v0.23.1-preview.0** | Preview 预览版本，详见下方变更 |
| **v0.23.1-preview.1** | 最新 Preview 预览版本，详见下方变更 |

**本次发布包含的变更**（三个版本均包含）：
- `feat(web-shell): visualize and manage dynamic workflow runs` — [#10594](https://github.com/QwenLM/qwen-code/pull/10594)，作者 @qqqys
- `perf(web-shell): derive the session workflow project` — 同一 PR 的性能后续优化

> ⚠️ **请注意：** `v0.23.1-preview.1` 的发布流程今日已失败四次；在跑通一次干净的运行之前，请将 npm tag 视为尚未发布。

## 热门 Issue

1. **[#11091](https://github.com/QwenLM/qwen-code/issues/11091) — Mermaid（约 6 MB）仍被扁平化嵌入到导出 HTML 中** *(已关闭，7 条评论)*
   继 #9812 中 `/export html` 外链化工作之后的跟进。尽管渲染器已改为从 unpkg 加载，Mermaid 依赖仍按导出逐个内联。由于它阻塞了任何合理的会话体积预算，值得持续关注。

2. **[#11031](https://github.com/QwenLM/qwen-code/issues/11031) — Web Shell 运行时被嵌入到每个导出的 HTML 中** *(已关闭，6 条评论，P1)*
   这是 #11091 背后的根本原因。空会话导出约 19.5 MB，因为从 `WebShellTranscript` 可达的全部 React + Web Shell 图都被复制进了每个文件。现已通过 unpkg 固定版本解决。

3. **[#11109](https://github.com/QwenLM/qwen-code/issues/11109) — `release.yml` 存在重复工作，且有一个 20 分钟的步骤实际并未做任何校验** *(开放中，4 条评论，P2)*
   今日已有两次发布运行超时。任务图存在冗余工作，并且某个长步骤并未真正执行任何验证。直接解释了今日 v0.23.1-preview.1 四次失败的原因。

4. **[#9911](https://github.com/QwenLM/qwen-code/issues/9911) — 在 WebShell 切换后恢复 VS Code 中的消息编辑/回退功能** *(开放中，4 条评论，P2)*
   当 #9811 将 ACP 迁移到内嵌的 VS Code 宿主时，此功能被刻意推迟。原本依赖逐条消息编辑的编辑器现缺乏回退路径，与使用 nightly 版本的 VS Code 用户相关。

5. **[#10046](https://github.com/QwenLM/qwen-code/issues/10046) — PR #9891 中推迟的评审发现项** *(开放中，4 条评论)*
   autofix 自动维护的跟进项；代表了每个评审密集型 PR 在此处留下的技术债尾巴。

6. **[#11178](https://github.com/QwenLM/qwen-code/issues/11178) — SDK 规范化器静默丢弃 `resource_link` 附件** *(开放中，3 条评论，P2)*
   在线 UI 能正常显示卡片，但 SDK 回放路径会丢失它们。影响所有基于守护进程会话日志构建宿主 UI 的开发者。

7. **[#8542](https://github.com/QwenLM/qwen-code/issues/8542) — [ACP] 支持在轮次运行期间发送/排队消息** *(开放中，3 条评论，P2)*
   CLI 早已支持此能力；ACP 用户仍然无法提前键入。长期未解决的对标请求。

8. **[#11180](https://github.com/QwenLM/qwen-code/issues/11180) — Skill 的 `PreToolUse` 钩子在 `--continue` 后停止生效** *(开放中，3 条评论，P1，安全)*
   某个技能依赖基于会话作用域环境变量拦截 shell 执行的钩子，但会话恢复后钩子即被绕过，而技能说明仍保留在上下文中。存在真实的安全隐患。

9. **[#11096](https://github.com/QwenLM/qwen-code/issues/11096) — `main` 构建的导出指向一个 404 的 unpkg URL** *(开放中，3 条评论，P2，可供人工处理)*
   `@qwen-code/qwen-code@0.23.0` 是 npm 上的 `latest` 版本，早于 #9812，因此其 tarball 中没有 `export-transcript-document.js`。任何今天从 npm 安装并执行导出的用户都会得到一个损坏的页面。

10. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198) — 遥测将原始工具错误文本（包括 shell 命令行）上传至 RUM** *(开放中，2 条评论，P1，安全)*
    #10916 的更广泛版本。该问题在 `main` 上已存在，默认开启的使用统计中就有此问题。在升级遥测管道之前，值得仔细阅读。

## 关键 PR 进展

1. **[#11134](https://github.com/QwenLM/qwen-code/pull/11134) — 对全绿的 macOS E2E 分片瞬时故障重试一次**
   将 #10572 在 Linux `sandbox:none` 分支中使用的同一单次、受预算控制的重试机制移植到 macOS E2E 分片。正是近期故障集群所需的防御性 CI 调整。

2. **[#9305](https://github.com/QwenLM/qwen-code/pull/9305) — 短内容底部对齐，将空白置于顶部**
   小但非常显眼的 UX 修复：在 `useTerminalBuffer` 模式下（默认），短会话在编辑器上方会留下一段空白。现在改为底部对齐。

3. **[#10347](https://github.com/QwenLM/qwen-code/pull/10347) — 对 Ctrl+Y 不可用场景下的瞬时网络错误（EOF）进行自动重试**
   将 `400 network error ... EOF` 类响应重新归类为可重试的传输错误，而不是 fail-fast 的 4xx，以便在无头环境中套用已有的有界重试机制。

4. **[#11103](https://github.com/QwenLM/qwen-code/pull/11103) — 单独因 vitest worker RPC 饿死时不再让 Test 任务失败**
   新增 `classify-infra-flake.mjs`，使 vitest IPC 中断不再直接让 Linux `Test` 任务变红。与 #11134 贯彻相同的"基础设施故障分类"理念。

5. **[#10421](https://github.com/QwenLM/qwen-code/pull/10421) — 在探针树恢复之前先做内容过滤**
   `scratch-tree` 此前在仓库本地配置定义了内容过滤器（每次 checkout 都会触发 smudge 钩子）的情况下，仍会创建/重置树。修复了评审流程中的一个真实正确性漏洞。

6. **[#10455](https://github.com/QwenLM/qwen-code/pull/10455) — 输出语言文件不可写时不再让启动崩溃**
   CLI 在每次启动时向全局配置目录写入一份提示性规则文件；在只读的主目录下会抛错并中止启动。现已加上防护。

7. **[#11145](https://github.com/QwenLM/qwen-code/pull/11145) — 在 ACP 预热之后加载持久化的 MCP 配置**
   `qwen serve` 完成 ACP 预热后，现在会发起一次 fire-and-forget 的 `coordinator.ensure()`，使工作区作用域的 MCP 发现自启动时即开始，而不是等到首次使用时。

8. **[#11120](https://github.com/QwenLM/qwen-code/pull/11120) — 为永远无法成功的会话回收加上边界与诊断**
   并没有*真正修复*底层的回收失败（参见 #11118），但限制了循环并增加了诊断信息。诚实的分阶段修复。

9. **[#8927](https://github.com/QwenLM/qwen-code/pull/8927) — 通过 `sessionRotation` 为每通道会话生命周期设上限**
   新增 `maxTurns` / wall-clock 上限，使路由上下一条消息启动新会话，而不是复用陈旧会话。

10. **[#11196](https://github.com/QwenLM/qwen-code/pull/11196) — 记录失败的代理并将代理失败状态归一为 `null`**
    之前的恢复日志仅记录"started"和"returned"，中间什么也没有——无法区分失败与中断的代理。现已统一归一为 `null`。

其他值得关注的 PR：[#11117](https://github.com/QwenLM/qwen-code/pull/11117)（将 Prettier 设为真正的 CI 卡口，格式化积压）、[#11199](https://github.com/QwenLM/qwen-code/pull/11199)（压缩 E2E 种子数据适配 80x30 pty）、[#11151](https://github.com/QwenLM/qwen-code/pull/11151)（WebShell 编辑器中 Backspace/Delete 删除已粘贴的标签）、[#11189](https://github.com/QwenLM/qwen-code/pull/11189)（封堵 #10797 中最后两种工具结果 / system-reminder 泄漏形态）、[#11070](https://github.com/QwenLM/qwen-code/pull/11070)（审批模式在 ACP 冷启动恢复后保留）、[#10941](https://github.com/QwenLM/qwen-code/pull/10941)（在静默工具调用期间提示状态保持权威性）。

## 功能请求趋势

- **与 Claude Code 2.1.260 的动态工作流对标** — #11013 明确列出了剩余差距：合约清晰度、入口/预算处理、瞬时故障下的韧性、分发模型。#11196（失败代理日志记录）正是维护者们正在逐步缩小差距的一种增量式做法。
- **ACP ↔ CLI 功能对等** — #8542（轮次期间消息排队）就是典型范例：终端里已有的能力在 ACP 中仍缺失。
- **WebShell 切换后恢复 VS Code UX** — #9911（编辑/回退）以及来自更广泛 #9811 评审链路的隐性诉求。
- **Agent Team 可观测性** — #11072 在 CLI 和 WebShell 中为负责人呈现一份花名册；与近期 issue 中可见的更广泛的"子代理/后台自动化"路线图标签保持一致。
- **导出管线的成熟度** — #11096 + #11091 + #11031 构成一条连贯的演进弧线：将 Web Shell 从内嵌迁出，修复 unpkg 固定版本竞态，消除残留的 Mermaid 膨胀。
- **遥测作为一等的产品面** — #11198 隐含地要求提供有据可查的脱敏管道；随着 RUM 通道扩大，预计会有更多相关 issue。

## 开发者痛点

- **发布工作流不稳定。** 今日单个 preview 标签就出现了五个不同的 issue（#11166、#11170、#11173、#11179、#11185），加之 #11109 记录了冗余工作和一个"什么都不校验"的步骤。这是当前最突出的运营投诉。
- **CI 脆弱性是系统性的，而非局部问题。** #11134（macOS 分片死亡）、#11103（vitest IPC 饿死）、#11001（PTY 清理竞态）、#11199（PTY 视口适配）、#11094（压缩 E2E 事件预算）、#11197（E2E Interactive OpenTUI 在 `1a86cd6` 上）——团队正在逐一打补丁，因为底层测试框架缺乏共享的故障分类层。
- **`/export html` 在任何非平凡会话下都是坏的。** 24 小时内出现了三个开放/已关闭 issue（#11031、#11091、#11096），用户可见的产物要么是数 MB 的文件，要么是 404 的 `<script src>`。
- **Skills / 钩子存在隐蔽的正确性漏洞。** #11180（`--continue` 后 `PreToolUse` 不再生效）和 #11178（SDK 回放中 `resource_link` 丢失）都属于"在主流程下工作，恢复或回放后失败"的形态——正是侵蚀智能体系统可信度的那类 Bug。
- **`qwen serve` 守护进程的通道与回收需要文档与修复双管齐下。** #11118 / #11120（cron/goal/monitor/history 任务的回收无法成功）和 #11186（通道所有权未覆盖主目录工作区设置）都同时被打上 `scope/daemon` + `need-discussion`——模型与文档已脱节。
- **推迟评审发现项的 issue 不断累积。** #10046、#11008、#10974、#10585 都属于同一模式——autofix 循环正在做它该做的事，但每个 PR 都留下了 10–15 个无人认领的挂起跟进项。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*