# AI CLI 工具社区动态日报 2026-09-07

> 生成时间: 2026-09-07 01:51 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比报告 — 2026-09-07

## 1. 生态概览

AI CLI 编程 Agent 市场目前已收敛到七个持续维护的工具，并大致分为两个阵营：绑定单一厂商模型与订阅服务的官方客户端(Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI),以及开放的、多提供商的客户端(OpenCode、Pi、Qwen Code)。整个行业最突出的张力在于:Agent 的自主性——多 Agent 扇出、长时间运行任务、后台执行——已经远远领先于其控制平面:成本上限、撤销机制、审批门控、诚实的失败报告,几乎是所有社区都在呼吁的头号需求。第二个系统性的薄弱环节是状态转换(resume、压缩、配置重载),无论正确性还是安全保证,都在反复泄露。与此同时,官方客户端在平台广度(语音、设备控制、企业租户)上做差异化,而开源客户端则在提供商路由的韧性与可扩展性上展开竞争。

## 2. 活跃度对比

| 工具 | Issues 摘要 | PRs 摘要 | Discussions | Release(近 24 小时) |
|---|---|---|---|---|
| **Claude Code** | 10 个热门(最高: 197💬, 151👍) | 10(2 open / 8 closed) | N/A* | ✅ v2.1.263(可靠性汇总) |
| **OpenAI Codex** | 10 个热门 + 5 个被引用 | ~23(~20 closed, 1 open) | 8 个活跃话题 | 无 |
| **Gemini CLI** | 10 个热门(2 closed) | 10(3 open / 7 closed) | N/A* | Nightly v0.60.0(自动 bump) |
| **Copilot CLI** | 14(2 closed) | 1 | N/A* | 无(上次: 1.0.82 / desktop 1.1.15) |
| **OpenCode** | 10 个热门 | 14 | N/A* | 无 |
| **Pi** | 11(6 closed) | 15(6 open / 9 closed) | 1 | 无 |
| **Qwen Code** | 10 个热门(1 closed) | 11 | N/A* | ⚠️ v0.23.1-preview.1(发布 CI 任务失败) + 2 个 nightly |

\* 摘要源未提供这些仓库的 Discussions feed;按规范标记为 N/A,并非表示不活跃。本周期内七个仓库的 Issues/PRs 均处于启用状态。统计数为摘要中浮出的条目(通常为 top-10),并非穷尽的 tracker 总数。

## 3. 共同的演进方向

- **成本可见性与支出控制(6/7 工具)。** 这是整个生态最响亮的诉求。Claude Code 的头号痛点——六个相互呼应的 issue 集中讨论 token 上限、Agent 生成数量上限以及扇出确认(#90664、#87178、#89596 等);Codex 用户自建第三方仪表盘(CodexFuse),并要求规划阶段感知配额(#42182、#43257);Copilot BYOK 静默关闭 prompt 缓存,成本飙升约 5 倍(#4720);OpenCode Go 配额数学 bug(#42935、#47613、#47703);Pi 接入了提供商上报的成本(#6881)。
- **Windows 兼容性与桌面端稳定性(7/7 工具)。** Codex 体量最大的 issue(#28919, 59👍,缺失设备控制 tab)外加一组由五个 issue 构成的 Chrome native-host 集群;Pi 的 Windows 元话题(57💬);OpenCode 的 3–5 秒卡顿;Claude Code 的 always-on-top bug 和 Windows 路径/CRLF 加固 PR;Gemini 无头模式 `-p` 静默失败以及 CRLF 检测 bug。
- **上下文压缩的正确性与可配置性(4 个工具)。** Claude Code 在压缩时丢失行为规则(#67500)并希望 MEMORY.md 上限可调(#91188);Codex 压缩后会复活已完成指令(#29811),且 AGENTS.md 重载可能让 session 砖掉(#43295);Qwen 稳定了 `/compress` 并重构了记忆召回(#10183、#11094);Gemini 则在讨论确定性记忆脱敏(#26525)。
- **Session 安全、撤销与可移植性(4 个工具)。** Codex 占据整个生态点赞最高的两项需求:`/rewind` 撤销(118👍)和跨设备同步(61👍);Claude Code 希望实现跨账号、跨环境的 session 连续性(#74662、#74671);OpenCode 与 Qwen 在迭代 session 生命周期以及 worktree 安全的重置(#47652、#11015)。
- **权限/沙箱执行的完整性(5 个工具)。** Copilot 的 ACP 模式自动放行工具调用(#4537);Qwen 的 `PreToolUse` 钩子在 `--continue` 之后停止触发(#11180);OpenCode 文档化的 `permission.ask` 钩子从未触发(#7006),且通配符优先级与文档矛盾(#24335);Gemini 修补了一个 `git diff --output=` 的沙箱逃逸(#29184);Claude Code 合入了符号链接逃逸和 shell 注入的修复(#68689、#68786)。
- **MCP 在规模下的健壮性(4 个工具)。** Gemini 修复了工具名冲突以及超过 128 个工具被 API 拒绝的问题(#28971、#24246);OpenCode 在 `anyOf`/`oneOf` schema 上撞上 Anthropic 400 错误(#46628),且 OAuth `resource_metadata` 被忽略(#44790);Copilot 未能复用 MCP OAuth token(#4695);Pi 为 MCP 客户端提供了机器可读的失败分类(#9247)。

## 4. 差异化分析

| 维度 | 官方阵营 | 开源多提供商阵营 |
|---|---|---|
| **功能侧重** | Claude Code:插件生态加固 + Agent 化支出控制。Codex:平台广度——worktree、语音(RTP 播放)、设备控制、用户验证 API。Copilot:GitHub/企业租户(GHEC 路由、组织托管模型、仓库级插件 #1665 已落地)以及面向 IDE 互操作的 ACP。Gemini:沙箱卫生、扩展(手机配对)、AST 感知工具链研发(#22745)。 | Pi:提供商无关的路由——跨提供商 fallback 链路(三份重复 PR = 共识)、有界重试、快速接入新提供商(Meta Muse、LLM Gateway)。OpenCode:桌面应用性能(三层持久化重写 #47704–06)以及插件/权限面。Qwen Code:结构性押注——ink→OpenTUI 迁移(#8662)以及 mesh 多 Agent 编排(#11225–11230)。 |
| **目标用户** | 企业团队(Copilot、Claude Code)、订阅制重度用户(Codex Pro 档位)、Google Workspace 开发者(Gemini)。 | 多模型折腾党、对成本敏感的用户,以及嵌入/集成方(Pi 的 JSON/RPC 和 extension host;OpenCode 的 SDK;Qwen 的移动端 Web shell)。 |
| **失败画像** | 授权与信任系统:误伤已审批组织的网络防护误报(Claude #84352, 197💬)、Pro 档容量错误(Codex #41790/#43322)、OAuth 验证死循环(Gemini #19936)、发布回归集群(Copilot 1.0.81–82)。 | 上游提供商不稳(Pi 的 `openai-codex` 卡死 #4945)、计费/权限系统仍在成熟中(OpenCode),以及快速迭代下的 CI/流水线不稳(Qwen)。 |

## 5. 社区势能与成熟度

- **参与度最高的用户群:** Claude Code(197 条评论与 151 赞的话题)和 Codex(118 赞与 61 赞的讨论需求;本周期内唯一拥有实质性 Discussions 文化的仓库)。它们的痛点已处在平台规模:授权、容量与信任系统。
- **工程吞吐最高:** Codex(~20 PR/天,bot 辅助,覆盖语音/worktree/验证)与 Qwen Code(并行的结构性重写持续出货——OpenTUI 兼容性、mesh 基础)。
- **最快修复节奏:** Pi——24 小时窗口内 issue 提交并修复(#9209 → PR #9253);15 个 PR 中 9 个到货即合。Gemini 在正确性/安全修复上同样节奏利落。
- **稳态成熟:** Claude Code(例行可靠性发布 + 协调一致的社区加固批次)、Gemini(nightly 节奏)。
- **值得关注:** Copilot CLI 接近零的 PR 可见度(1 个 PR)与 1.0.81–82 回归带来的大量 issue 涌入形成对比;Qwen 失败的发布 CI 任务(#11185)与它自己提出的流水线浪费议题(#11109)互为呼应。OpenCode 凭集中贡献者(Hona 的持久化重写)以小博大,但正因计费 bug 而面临付费用户信任的流失。

## 6. 趋势信号

1. **自主性正在跑赢控制力——"护栏"将成为下一阶段功能战的焦点。** 支出上限、撤销/rewind、扇出前确认在各阵营都获得最高票;预计在 1–2 个发布周期内将成为标配。
2. **授权与计费已成为可靠性表面。** 验证死循环、容量错误、配额数学 bug、静默关闭缓存,正在驱动真实的流失,而第三方补救工具(CodexFuse)正在填补官方空白。
3. **状态转换正在泄露安全保证。** 压缩时规则丢失(Claude)、压缩后指令复活(Codex)、`--continue` 后钩子被绕过(Qwen)、ACP 模式下权限被丢弃(Copilot)。任何要把 Agent 投产的团队,都应当显式测试 resume/compact/reload 路径。
4. **静默的"假成功"正在成为新兴的信任杀手**(Qwen #11217、Gemini #22323、Copilot #4706)——退出码与终止原因的诚实性,正变成一种差异化竞争力。
5. **Windows 是整个生态最大的兼容性负债**(7/7 工具);一等公民的 Windows 支持将显著扩大可触达用户。
6. **架构分叉:** 官方客户端在专有深度上加码(语音、设备控制、企业租户),而开源客户端则在向提供商无关的韧性收敛——跨提供商 fallback 链路(Pi,留意在 OpenCode/Qwen 中的采纳)正是直接对冲 Codex Pro 用户本周遭遇的容量错误的手段。

**给决策者:** 接受单一厂商容量/授权风险时,选官方客户端以获得深度与企业集成;追求路由韧性与成本可控时,选开源多提供商客户端。无论哪种路径,预算监控工具以及围绕 session 状态转换的回归测试都应当被视为前置条件,而不是可选项。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告
**数据截至：2026-09-07 | 来源：github.com/anthropics/skills**

---

## 1. 热门 Skills 排行榜 — 讨论度最高的 Pull Request

> **数据说明：** 抓取的数据集中 PR 不含评论数（仅 Issue 有），因此下方排名综合了 PR 排序、对应底层 Issue 的关注度，以及社区活动的交叉印证。所有列出的 PR 当前均为 **OPEN** 状态。

### 🥇 #1 — [PR #1298：修复 `run_eval.py` 报告 0% 召回率的问题（skill-creator）](https://github.com/anthropics/skills/pull/1298)
**状态：** OPEN | **作者：** MartinCajiao | **创建时间：** 2026-06-10
- **作用：** 修复 `skill-creator` 中的描述优化循环，使 `run_eval.py`、`run_loop.py` 和 `improve_description.py` 能够正确测量触发率。同时处理 Windows 管道读取、触发检测与并行 worker 问题。
- **热度原因：** 直接解决 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 条评论，10+ 次独立复现）。若不修复，每个 skill 的描述实际上都是在针对纯噪声做优化——这是一个影响整个生态元工具链的基础性缺陷。

### 🥈 #2 — [PR #1602：解决评估序列化、编码与基准测试缺陷](https://github.com/anthropics/skills/pull/1602)
**状态：** OPEN | **作者：** AbhiPra24 | **创建时间：** 2026-08-17
- **作用：** 整合修复 `mcp-builder` 的评估（TextContent 提取）、skills 仓库整体可靠性以及平台兼容性问题。
- **热度原因：** 直接对应 Issue [#1390](https://github.com/anthropics/skills/issues/1390)——`evaluation.py` 会静默伪造工具错误并给出 0/N 的得分，是一种会遮蔽损坏 MCP 集成的"幽灵成功"隐患。

### 🥉 #3 — [PR #1099：`run_eval.py` 的 Windows 子进程管道修复](https://github.com/anthropics/skills/pull/1098)
**状态：** OPEN | **作者：** joshuawowk | **创建时间：** 2026-05-07
- **作用：** 解决 Windows 上的 `WinError 10038` 崩溃问题，该问题导致每次查询都被标记为"未触发"（`precision=100% recall=0%`）。
- **热度原因：** 关闭了 Issue #556 的同一 Windows 分支；与 PR #1298 互补。Windows 用户在贡献者中占相当比例，他们目前完全无法对描述进行迭代。

### 4. [PR #1050：Windows 子进程与编码修复（skill-creator）](https://github.com/anthropics/skills/pull/1050)
**状态：** OPEN | **作者：** gstreet-ops | **创建时间：** 2026-04-27
- **作用：** 两行修复——`subprocess.Popen(["claude", …])` 在 Windows 上失败（CLI 实际为 `claude.cmd`，未遵守 PATHEXT），同时修复编码相关缺陷。
- **热度原因：** 改动极小但杠杆极高，解锁了 Windows 贡献者——正因其精准的改动范围，这类 PR 通常能很快合入。

### 5. [PR #1628：Hivemind — 零成本多 Agent 编排 Skill](https://github.com/anthropics/skills/pull/1628)
**状态：** OPEN | **作者：** Hanishchow | **创建时间：** 2026-08-21
- **作用：** 该 skill 将机械性工作委派给运行在免费模型上的无头 [opencode](https://opencode.ai) worker，而 Claude Code 保留规划/评审/合并的角色。
- **热度原因：** 精准捕捉到 2026 年社区最清晰的叙事转向——稀缺资源是上下文窗口，而非智能本身。多 Agent 编排是当前新 skill 的主流主题。

### 6. [PR #514：新增 `document-typography` skill](https://github.com/anthropics/skills/pull/514)
**状态：** OPEN | **作者：** PGTBoos | **创建时间：** 2026-03-04
- **作用：** 对 AI 生成文档进行排版质检——孤行、寡行、编号错位等问题。
- **热度原因：** 瞄准的是每个 Claude 文档都存在的那类缺陷；适用范围广、目标明确，使其成为强力的合入候选。

### 7. [PR #486：新增 ODT skill（OpenDocument 创建、模板填充、ODT→HTML）](https://github.com/anthropics/skills/pull/486)
**状态：** OPEN | **作者：** GitHubNewbie0 | **创建时间：** 2026-03-01
- **作用：** 原生 OpenDocument 支持——创建、填充、解析与转换 `.odt`/`.ods` 文件。
- **热度原因：** 长期存在的格式覆盖空白（DOCX/PDF 已有，ODT 缺失）。评审速度缓慢，反映出维护者侧的评审产能是当前的瓶颈约束。

### 8. [PR #538：修复 PDF skill 中大小写敏感的文件引用](https://github.com/anthropics/skills/pull/538)
**状态：** OPEN | **作者：** Lubrsy706 | **创建时间：** 2026-03-06
- **作用：** 修正 `skills/pdf/SKILL.md` 中 8 处大小写不匹配（`REFERENCE.md` → `reference.md` 等），这些不匹配会在大小写敏感的文件系统上导致问题。
- **热度原因：** 属于"低级但尴尬"的缺陷，修复方案简单明确——该 PR 开了约 6 个月仍悬而未决，反映出的是评审瓶颈而非技术分歧。

---

## 2. 社区需求趋势（来自 Issues）

按评论量排序，Issues 浮现出五个清晰的需求簇：

### 🔒 A. 信任、安全与命名空间完整性（最高紧迫度）
- **[#492（43 条评论，2 👍）](https://github.com/anthropics/skills/issues/492)** — *以 `anthropic/` 命名空间分发的社区 skill 助长了信任边界滥用。* 这是迄今为止讨论最多的 Issue。用户无法可靠区分官方与社区 skill，由此带来钓鱼/权限滥用风险。

### 🏢 B. 企业分发与治理
- **[#228（16 条评论，8 👍）](https://github.com/anthropics/skills/issues/228)** — *在 Claude.ai 中实现组织级 skill 共享。* 数据集中点赞比最高；清晰的企业诉求指向共享 skill 库或直接分享链接。
- **[#412（6 条评论）](https://github.com/anthropics/skills/issues/412)** — *提案：`agent-governance` skill，用于策略执行、威胁检测、信任评分与审计日志。*

### 🛠 C. Skill-Creator 可靠性（元工具链危机）
- **[#556（12 条评论，7 👍）](https://github.com/anthropics/skills/issues/556)** — *`run_eval.py` 报告 0% 触发率。* 与 PR #1298 配套。
- **[#202（8 条评论）](https://github.com/anthropics/skills/issues/202)** — *`skill-creator` 应更新为最佳实践（token 效率、操作语气）。*
- **[#189（6 条评论，9 👍）](https://github.com/anthropics/skills/issues/189)** — *`document-skills` 与 `example-skills` 插件安装了完全相同的内容。*

### 🧠 D. 记忆、上下文与推理质量
- **[#1329（9 条评论）](https://github.com/anthropics/skills/issues/1329)** — *提案：`compact-memory`——用于压缩 agent 状态的符号化表示。*
- **[#1487（4 条评论）](https://github.com/anthropics/skills/issues/1487)** — *`claude-api` skill 一次性贪心地注入约 156k token，单次工具调用就把上下文窗口耗尽。*
- **[#1385（4 条评论）](https://github.com/anthropics/skills/issues/1385)** — *提案：推理质量门控流水线（校准 → 对抗式审查 → 交付核验）。*

### 🔌 E. 互操作性：Skills 作为 MCP / 外部平台
- **[#16（4 条评论）](https://github.com/anthropics/skills/issues/16)** — *将 Skills 暴露为 MCP。* 这一早期信号如今已演变为实际提交（PR #1627 Buffer、PR #1628 Hivemind）。
- **[#1175（4 条评论）](https://github.com/anthropics/skills/issues/1175)** — *通过 Skills 接入 SharePoint Online 的安全/上下文顾虑。*
- **[#29（4 条评论）](https://github.com/anthropics/skills/issues/29)** — *与 AWS Bedrock 配合使用。*

**需求摘要：**
1. **信任与命名空间安全**（仅 #492 一项评论量就是次高 Issue 的 2.7 倍）
2. **多 Agent 编排**（Hivemind + opencode + 零成本模式）
3. **在描述优化工作流变得可信之前，必须先修复 skill-creator 元工具链**
4. **上下文经济型 skill**（compact-memory、反贪心注入）
5. **推理质量门控** 应作为一等交付物

---

## 3. 高潜力待合并 Skill（近期有望合入）

这些 PR **OPEN、范围明确、解决的是已被充分理解的问题**——强力合入候选：

| PR | Skill / 修复 | 高潜力原因 |
|---|---|---|
| [#1050](https://github.com/anthropics/skills/pull/1050) | Windows 子进程与编码（skill-creator） | 单行精准修复，解锁大批贡献者 |
| [#538](https://github.com/anthropics/skills/pull/538) | PDF 大小写敏感性修复 | 简单明确、低级但尴尬的缺陷 |
| [#539](https://github.com/anthropics/skills/pull/539) | YAML 未加引号描述的预解析校验 | 预防影响所有 skill 作者的静默失败类问题 |
| [#541](https://github.com/anthropics/skills/pull/541) | DOCX 修订追踪 `w:id` 冲突修复 | 已记录根因的文档损坏 bug |
| [#1298](https://github.com/anthropics/skills/pull/1298) | `run_eval.py` 综合修复 | 解锁整个描述优化工作流 |
| [#1607](https://github.com/anthropics/skills/pull/1607) | 在 `claude-api` skill 中标注已退役模型 | 文档正确性，关闭被引用的 issue #1603 |
| [#1595](https://github.com/anthropics/skills/pull/1595) | 将 UIZZE 加入 Partner Skills | 纯列表新增，评审负担低 |

**停滞 / 高摩擦候选**（技术上过硬但合并缓慢）：
- [#514 document-typography](https://github.com/anthropics/skills/pull/514) — 适用范围广，已开约 6 个月
- [#486 ODT skill](https://github.com/anthropics/skills/pull/486) — 格式覆盖空白，已开约 6 个月
- [#83 skill-quality/security-analyzer](https://github.com/anthropics/skills/pull/83) — 元 skill，已开约 10 个月

---

## 4. Skills 生态洞察

> **社区最集中的诉求是一个值得信赖的 Skills 基础——命名空间完整性、修复 skill-creator 评估循环、以及上下文经济模式（多 Agent 委派、压缩记忆、质量门控）。这表明 2026 年的重心已经从"Claude 还能做什么新 skill"，转向"如何让 skills 生态本身变得安全、可靠且 token 高效"。**

---

### 方法说明
- PR 排名综合源数据集中的排序与所关联 Issue（#556、#1390 等）的关注度得出，因为抓取的 PR 数据未填充评论数字段。
- 列出的 20 个 PR 全部为 OPEN；相对其提交量而言，该仓库存在显著的评审侧瓶颈，这一结构性信号本身也值得向维护者提示。

---

# Claude Code 社区摘要 — 2026-09-07

## 今日要点

社区当前最受关注的话题集中在**成本控制与多智能体安全**上——多个高影响力 issue 描述了自主智能体循环（agent loop）疯狂消耗 Max 套餐配额与周额度的情况，由此催生了一波关于支出限制的关联需求。**网络内容安全防护（cyber-safeguard）出现持续回退**，仍然在拦截已通过审批的组织以及 Sonnet 5 用户执行合法的代码分析任务。版本方面，v2.1.263 低调发布，主要是一次可靠性修复合集；与此同时，贡献者 **AZERDSQ131** 集中提交了一批插件/脚本安全加固修复（Windows 路径处理、Shell 注入、符号链接逃逸）。

---

## 版本发布

- **[v2.1.263](https://github.com/anthropics/claude-code/releases/tag/v2.1.263)** — 常规 Bug 修复与可靠性改进。更新日志中未列出新功能。

---

## 热门 Issue

1. **[#84352 — CVP 已通过审批的组织仍遭遇网络内容安全拦截（197 条评论，27 👍）](https://github.com/anthropics/claude-code/issues/84352)**  
   一个此前已通过审批的组织再次被拦截；验证门户（Verification Portal）显示该申请重新变为"审核中"。这是当前活跃时间最长的讨论帖，反映出一个系统性的信任/审批循环问题。

2. **[#26224 — 提示时出现 5–20+ 分钟的卡死/冻结（130 条评论，151 👍）](https://github.com/anthropics/claude-code/issues/26224)**  
   本期摘要中获赞最多的 issue。跨会话持续无响应表明编排层存在资源争用或排队问题，且重度用户受影响尤为明显。

3. **[#62699 — TUI 文本复制在 `Ctrl+Shift+C` 与右键下失效（42 条评论，68 👍）](https://github.com/anthropics/claude-code/issues/62699)**  
   终端界面的一项基础可用性故障：用户无法通过常规方式复制 Claude 的输出。评论/点赞比偏高，表明影响面广且可稳定复现。

4. **[#91188 — 将 MEMORY.md 自动压缩阈值设为可配置（28 条评论）](https://github.com/anthropics/claude-code/issues/91188)**  
   希望将硬编码的 200 行 / 25 KB 上限改为可调或可关闭。反映出对自动记忆功能依赖度的增长，以及按项目设定预算的诉求。

5. **[#89467 — Windows 桌面应用强制置顶且无法关闭（16 条评论，14 👍）](https://github.com/anthropics/claude-code/issues/89467)**  
   Windows 平台上的一项阻塞性桌面端可用性缺陷，且文档中无应急方案——影响该平台上每一位桌面用户。

6. **[#80015 — 更新后任务列表工具（TaskCreate/Update/List/Get）丢失（14 条评论，13 👍）](https://github.com/anthropics/claude-code/issues/80015)**  
   一次回归：模型已无法查看或调用任务工具，尽管界面仍显示任务列表。评论与点赞 1:1 的比例说明这是一个可稳定复现的故障。

7. **[#67500 — 上下文压缩会丢弃关键行为规则（12 条评论）](https://github.com/anthropics/claude-code/issues/67500)**  
   会话状态块、记忆写入指令以及禁止停止策略等在压缩过程中会被静默丢失——对长时间运行的工作流而言，这是正确性与信任层面的问题。

8. **[#85520 — VS Code 扩展侧边栏无法渲染内联图片（2 条评论，近期）](https://github.com/anthropics/claude-code/issues/85520)**  
   在 Remote-WSL 下同时影响 `Read` 与 `SendUserFile` 两条路径，并附带一个次要的回合注入问题。对任何依赖图片的工作流都很重要。

9. **[#92565 — Sonnet 5 安全防护误拦合法代码分析（2 条评论，近期）](https://github.com/anthropics/claude-code/issues/92565)**  
   作为 #84352 的新姊妹 issue，揭示了模型侧误报的模式，并明确指引用户前往 Cyber Verification Program。

10. **[#90301 — 受治理的密钥交接原语（1 条评论，含深度分析）](https://github.com/anthropics/claude-code/issues/90301)**  
    归纳了 18 条相关需求，并提议用单一最小原语来安全地向 Claude 传递密钥——一份条理清晰的 RFC 风格增强提案，往往能催生后续工作。

---

## 关键 PR 进展

1. **[#87079 — `**` glob 模式必须匹配零层级路径（OPEN）](https://github.com/anthropics/claude-code/pull/87079)**  
   `fnmatch` 此前会让 `security-patterns.json` 中的 `**/*.ts` 规则静默跳过顶层文件，与文档说明不符。问题在于其失败模式是对安全规则形成静默的"未覆盖"。

2. **[#87077 — 修复 pr-review-toolkit 中无效的 YAML frontmatter（OPEN）](https://github.com/anthropics/claude-code/pull/87077)**  
   由于 `Daisy: "..."` 这类对话行被解析为嵌套映射，导致智能体加载时 frontmatter 为空。属于针对 review 工具集的正确性修复。

3. **[#68707 — 终端内用于提交 GitHub Issue 的 `/bug` 斜杠命令（CLOSED）](https://github.com/anthropics/claude-code/pull/68707)**  
   一个新的 `bug-reporter` 插件，允许用户无需离开 Claude Code 即可提交结构化报告——有望实质性提升 tracker 中的信噪比。

4. **[#68786 — 通过 stdin 重定向避免 `test-hook.sh` 中的 Shell 注入（CLOSED）](https://github.com/anthropics/claude-code/pull/68786)**  
   修复一处真实的注入路径——此前 `$TEST_INPUT` 被嵌入到 `bash -c` 的单引号字符串中。对插件开发者而言值得特别关注。

5. **[#68689 — 在扩展性配置读取中阻断符号链接逃逸（CLOSED）](https://github.com/anthropics/claude-code/pull/68689)**  
   堵上一个本地文件泄露漏洞：`.claude/claude-security-guidance.md` 此前可能是一个指向 `~/.ssh/id_rsa` 等敏感文件的符号链接。属于重要的安全加固。

6. **[#68785 — Hook JSON 输出到 stdout、收紧 su* glob、修正 CI 检测（CLOSED）](https://github.com/anthropics/claude-code/pull/68785)**  
   对 `plugins/plugin-dev/` 中的示例 hook 进行的三项修复——之所以重要，是因为这些是其他插件作者会复制的参考实现。

7. **[#68701 — 在 Windows 上剥离 Python 版本探测输出中的 CRLF（CLOSED）](https://github.com/anthropics/claude-code/pull/68701)**  
   修复了仅在 Windows 下、由 Python 输出的 `\r\n` 引发的故障。属于改动很小但触发频率较高的环境修复。

8. **[#68699 — Windows 上的 Python 包装与规范化插件根路径（CLOSED）](https://github.com/anthropics/claude-code/pull/68699)**  
   处理了反斜杠形式的 `CLAUDE_PLUGIN_ROOT` 路径破坏内联 bash 的问题，以及 Microsoft Store 的 `python3` 桩以退出码 49 静默失败的状况。

9. **[#68702 — 在 bash 3.x 的 `set -u` 下保护 `PROMPT_PARTS` 的展开（CLOSED）](https://github.com/anthropics/claude-code/pull/68702)**  
   恢复了 stock macOS bash 3.x 上 `ralph-wiggum` 插件的可用性。这也是一个提醒：Bash 3 仍然是有相当比例开发者机器上的默认版本。

10. **[#68693 — 以叠加方式添加重复 label，而非替换已有 label（CLOSED）](https://github.com/anthropics/claude-code/pull/68693)**  
    `closeIssueAsDuplicate` 流程此前在 PATCH 时会清空 platform/area/priority 等 label——这是一处底层但对 triage 卫生很重要的修复。

---

## 热门讨论

*源数据中未提供 GitHub Discussions 内容。按摘要规范省略本节。*

---

## 功能诉求趋势

- **支出与多智能体控制。** 当前呼声最高的方向。共有 6 个 issue 在此方向上汇聚：token/费用上限、智能体生成上限、失控重试循环防护，以及在 fan-out 之前显式向用户确认（#90664、#87178、#89964、#91682、#77964、#89596）。
- **硬编码阈值可配置化。** MEMORY.md 压缩上限（#91188）是典型案例——用户希望按项目调优，而非一刀切的默认值。
- **多账号与会话可携带性。** 同时运行个人与工作账号的桌面用户，希望侧边栏会话能在重新登录后保持（#74662）。
- **跨环境连续性。** Chrome 工具未能继承到 `claude remote-control` 会话（#74671），以及 Remote Control 中 Android 推送失效（#87003）——"在一个地方发起会话、在另一个地方继续"的故事尚未完整。
- **更安全的密钥处理。** 一项具有内在一致性的诉求：希望提供一等公民的、可审计的密钥交接原语，而不是继续依赖临时性的 env 文件（#90301）。
- **桌面端/TUI 人机工程。** 项目会话排序（#87723）、置顶切换（#89467）、内联图片渲染（#85520）以及复制粘贴（#62699）共同构成一份清晰的 UX 待办清单。

---

## 开发者痛点

- **不可控的成本增长是头号痛点。** 一种反复出现的模式：自主循环或多智能体 fan-out 静默消耗 20%–100% 的周 Max 配额，有时甚至引发订阅超支焦虑（#87178、#77964、#89596、#89964、#91682、#90664、#77943）。用户希望看到用量计量、硬性上限，以及在派生子智能体之前给出明确确认。
- **网络内容安全防护的误报。** 已审批组织和合法代码分析任务被拦截；验证门户似乎会丢失此前已授予的审批状态（#84352、#92565）。这正在造成真实的工作流中断，并影响用户的模型选型行为。
- **更新后的可靠性回退。** 任务列表工具消失（#80015）、压缩后行为规则丢失（#67500），以及数分钟级别的卡死（#26224），均提示回归测试覆盖不足

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-07

## 1. 今日要点

过去 24 小时没有新版本发布，但开发活动依然密集：约 20 个 PR 被合并，以 worktree 管理、voice-host 音频播放以及实验性用户验证 API 为主。今日社区最强烈的信号是可靠性问题 —— "Selected model is at capacity" 错误正在多个帖子里扰乱 ChatGPT Pro/Pro 20x 用户（#41790、#43322），而获赞最多的讨论仍是长期存在的 `/rewind` 撤销功能请求（118 👍）。

## 2. 版本发布

过去 24 小时无新版本发布。

## 3. 热门 Issue

1. **[#28919](https://github.com/openai/codex/issues/28919) — Windows 应用缺少 "Control other devices" 标签页（63 💬，59 👍）**
   反馈系统中互动量最高的 Issue。Windows Pro 用户仍然无法使用其他平台已上线的"设置 > 连接"中的远程设备控制标签页。该问题已存在近三个月仍未关闭 —— 是一个持续存在的平台功能差距问题，且仍在不断积累不满的订阅用户。

2. **[#41790](https://github.com/openai/codex/issues/41790) — "Selected model is at capacity" 中断 Pro 任务（16 💬）**
   自 8 月 31 日以来 ChatGPT Pro 在任务执行过程中频繁出现容量错误。今日提交的新反馈 [#43322](https://github.com/openai/codex/issues/43322)（Pro 20x，切到 GPT-5.6-sol 也无效）证实这是一个持续存在的服务端问题，而非偶发事件。

3. **[#29811](https://github.com/openai/codex/issues/29811) — 目标压缩（Goal compaction）恢复已完成的 manual steer（14 💬）**
   在长时间进行的 `/goal` 会话中，上下文压缩会在恢复继续前重新注入已经完成的引导指令，导致智能体重做或违背此前的用户指令。这是一个微妙却影响深远的上下文管理正确性 Bug。

4. **[#40596](https://github.com/openai/codex/issues/40596) — Windows unified exec 失败并报 `helper_unknown_error`（13 💬）**
   Windows 上的 Plus 等级用户完全无法启动 unified exec 终端（`setup refresh had errors`），沙箱工具调用被彻底阻断。这是 Windows 平台特有的运行时故障模式的一部分。

5. **[#10571](https://github.com/openai/codex/issues/10571) — "Bad request" 错误（28 💬）**
   老问题（自 2 月起）至今仍在 CLI 0.94 + gpt-5.2 xhigh 上每日收到新评论。其长期存在说明该错误类别仍未被充分诊断。

6. **[#41874](https://github.com/openai/codex/issues/41874) — Windows 桌面端选择性丢失会话历史（8 💬）**
   更新后较新的本地会话消失，而较早的遗留会话则得以幸存，伴随项目分配迁移不完整。这种"近似数据丢失"的问题正在不断侵蚀用户对桌面应用存储层的信任。

7. **[#8317](https://github.com/openai/codex/issues/8317) — 为命令/任务提供基于时间的调度（38 👍）**
   呼声很高的增强需求：延迟、循环以及条件轮询式的任务执行（例如"每晚运行测试"、"轮询直到健康"）。目前用户只能借助 cron 包装脚本来实现。该 Issue 已开放近 9 个月。

8. **[#43237](https://github.com/openai/codex/issues/43237) — GPT-6 Astra 以 `invalid_prompt` 拒绝 `hi`（2 💬）**
   昨日提交，附带异常严谨的隔离 CLI + 极简后端复现方案，跨 Linux/macOS 验证。极简 prompt 被拒绝指向一个值得关注的模型服务或 prompt 校验 Bug。

9. **[#43295](https://github.com/openai/codex/issues/43295) — AGENTS.md 自动重载可能溢出并锁死会话（2 💬）**
   重载发生变更的 `AGENTS.md` 时，会将完整的更新包追加进去而原文仍保留在上下文中，从而可能把一个正常会话推过上下文上限并直接"砖掉"。这对正在迭代项目指令的开发者直接相关。

10. **[#40228](https://github.com/openai/codex/issues/40228) — Chrome native host 版本过旧；卸载/反馈失败（10 💬）**
    这是一组 Windows Chrome 集成故障的典型代表（另见 [#40357](https://github.com/openai/codex/issues/40357)、[#42520](https://github.com/openai/codex/issues/42520)、[#40923](https://github.com/openai/codex/issues/40923)，已关闭 [#39466](https://github.com/openai/codex/issues/39466)）：陈旧的 `chrome-native-hosts-v2` 条目、缺失的 `codexCliPath`，以及扩展和 host 之间的版本不匹配拒绝，都导致更新后浏览器控制功能变成只读或彻底失效。

## 4. 关键 PR 进展

*（注：今日 PR 流以 `copyberry[bot]` 自动化为主；下列均为已关闭，除非另有标注。）*

1. **[#43286](https://github.com/openai/codex/pull/43286) — TUI 中的托管 worktree 浏览器：** 提供可搜索的"Browse worktrees"视图，列出仓库池中的 checkout 并附带所有者元数据、线程恢复以及 worktree 路径复制功能。对 worktree 工作流是一次重大可用性提升。
2. **[#43279](https://github.com/openai/codex/pull/43279) — TUI 会话发现中的 linked worktree 支持：** 基于目录的查找不再遗漏位于同一仓库 linked worktree 中的会话；同时将 Git 工作移出事件循环。与 [#43298](https://github.com/openai/codex/pull/43298) 配合，将 worktree 切换延迟到下一次 TUI 迭代中执行，以避免阻塞 UI。
3. **[#43289](https://github.com/openai/codex/pull/43289) — 基于能力开关的 MCP 用户验证：** 通过 `openai/elicitation/create` 处理 `openai/userVerification`，并附加严格的字段/大小/编码校验 —— 为人工验证流程搭好了管道。基于 [#43265](https://github.com/openai/codex/pull/43265) 中定义的契约（`status`/`enroll`/`delete`/`verify` 均隐藏在 `experimentalApi` 之后）。
4. **[#43248](https://github.com/openai/codex/pull/43248) + [#43244](https://github.com/openai/codex/pull/43244) — Voice-host RTP 回放：** 此前传入的 RTP 音频被直接丢弃，现在经由 GStreamer 管道进行路由，加入抖动缓冲和有界 `GstAudioSink`（处理部分写入、在 speaker-epoch 变化时取消）。[#43144](https://github.com/openai/codex/pull/43144) 为原生 voice 库新增了 Windows MSVC x64/ARM64 Bazel target。
5. **[#43308](https://github.com/openai/codex/pull/43308) — Windows app-server 通过 socket 关闭：** 用经过认证的 `/daemon/shutdown` 请求（要求提供 server PID）取代关闭哨兵文件 —— 更干净的生命周期管理，可能有助于改善 Windows 桌面的可靠性。
6. **[#43315](https://github.com/openai/codex/pull/43315) — 唯一会话标签解析：** 当标签重复时，命令不再静默地命中第一个匹配会话；在未设置名称时接受预览文本。
7. **[#43253](https://github.com/openai/codex/pull/43253) — 活动写入冲突时的只读会话：** 在其他应用中已打开的线程，恢复后会回退为只读转写，不再直接报错。
8. **[#43177](https://github.com/openai/codex/pull/43177) + [#43261](https://github.com/openai/codex/pull/43261) — TUI 的服务端模型默认值：** 全新启动和后台任务现在遵循 app-server 的有效配置，而非可能已过时的客户端模型/推理设置。
9. **[#43147](https://github.com/openai/codex/pull/43147) — 按模型能力门控实验性上下文：** 实验性上下文的激活现在会检查模型是否支持（而不仅仅是 provider/账号），子会话也不再盲目继承 token 预算激活。与下文将讨论的上下文管理议题直接相关。
10. **[#31471](https://github.com/openai/codex/pull/31471) — `ConnectorRuntimeManager` 抽取（开放中）：** 今日仍处于活跃状态的唯一由人撰写的 PR；"faster-connectors" 工作四部分中的第一部分，将 Apps 工具缓存隔离到一个按 account/user/workspace 作用域的不可变快照之后 —— 为更快的 connector 刷新打下基础。

值得提及的荣誉条目：构建基础设施改进 [#43282](https://github.com/openai/codex/pull/43282)/[#43304](https://github.com/openai/codex/pull/43304)（可选 Bazel 戳记以提升远程缓存复用）以及 [#43281](https://github.com/openai/codex/pull/43281)（将 npm 暂存迁移到最小权限的 workflow job）。

## 5. 热门讨论

### Ideas
- **[#9618](https://github.com/openai/codex/discussions/9618) — "怎么会连一个 /rewind 或 /revert 功能都没有？"（118 👍，20 💬）：** 仓库内信号最强的功能请求。用户提到了 OpenCode 和 Claude Code 的撤销支持；没有它，"每次变更都提交"就成了唯一的安全网。目前仍看不到任何官方回应途径。
- **[#14067](https://github.com/openai/codex/discussions/14067) — 跨设备会话/线程同步（61 👍）：** 线程和上下文仍停留在单台机器上，打断了跨设备工作流（工作场所 ↔ 家中）。该议题历史悠久、获赞极高。
- **[#42703](https://github.com/openai/codex/discussions/42703) — 长程上下文的递归风险：** 对 `history`/`notes`/`new_context` 检索是否会因摘要跨上下文窗口累积而变成递归自指的深入分析。
- **[#7366](https://github.com/openai/codex/discussions/7366) — 使用 `@` 引用被 gitignore 的文件：** `.gitignore` 的语义不应阻止本地依赖/库文件被纳入上下文。

### Q&A
- **[#43257](https://github.com/openai/codex/discussions/43257) — 实验性上下文历史查询会消耗用量上限吗？** 使用 Pro 多日的用户希望明确上下文窗口轮转和历史检索是否消耗配额。与 PR #43147 的能力门控直接相关。
- **[#40740](https://github.com/openai/codex/discussions/40740) — Rollout 追踪与 `Declined` exec 状态：** 对 `rollout/src/policy.rs` 持久化排除项（ExecApprovalRequest、GuardianAssessment）以及审批决定可审计性的深度探讨。

### Show and Tell
- **[#41157](https://github.com/openai/codex/discussions/41157) — CodexFuse 1.2.0：** 用于 Codex 速率限制可见性的本地 Windows 仪表盘（已用/可用、下次重置时间、每小时用量）。之所以流行，正因为配额不透明是一个痛点。
- **[#43224](https://github.com/openai/codex/discussions/43224) — NULLYARD：** 公开、无需登录的 MCP 看板，提供静态的 skill/MCP 集成指南。

## 6. 功能请求趋势

1. **会话安全与可移植性：** `/rewind`/撤销（#9618）以及跨设备同步（#14067）是整个反馈系统中获赞最高的两项需求 —— 明确指向事务式会话状态（transactional session state）。
2. **配额透明度与规划：** 主动感知配额的计划任务（#42182）、第三方限额仪表盘（CodexFuse）以及关于上下文管理计费的提问（#43257），都汇聚到同一个诉求 —— "让限额可见、可规划。"
3. **调度与自主性：** 基于时间/循环/条件的任务执行（#8317），满足无人值守的工作流需求。
4. **设备控制的平台一致性：** Windows "control other devices" 标签页（#28919）以及 Linux Computer Use 支持（#42846）。
5. **上下文管理控制：** 更安全的 AGENTS.md 重载（#43295）、可预测的压缩行为（#29811），以及对递归历史膨胀的防护（#42703）。
6. **更优的审批体验：** 当 Auto-review 拒绝升级时提供人工审批回退（#41462），而不是要求用户精确复述"魔法语句"。

## 7. 开发者痛点

- **付费等级的容量错误：** "Selected model is at capacity" 已成为多报告共现的模式（#41790、#43322），会在任务中途打断 Pro 和 Pro 20x 用户的智能体运行 —— 本周最突出的可靠性投诉。
- **Windows 桌面脆弱性：** 评论数高的问题中有不成比例的比例与 Windows 平台相关：更新后窗口不可见（#42714）、unified exec 失败（#40596）、会话丢失（#41874），以及围绕 Chrome native-host 版本/配置不匹配的五连发 Issue 集群（#40228、#40357、#42520、#40923、#39466）。
- **速率限制的不透明：** 错误模型的用量归属（#13854）、在 `prompt_cache_key` 稳定的情况下仍间歇性命中零 prompt-cache（#30425），再加上缺乏官方的限额可见性 —— 推动用户转向第三方仪表盘。
- **上下文管理的边界情况：** 压缩恢复已完成指令（#29811）、AGENTS.md 重载"砖掉"会话（#43295），以及历史检索如何映射到配额的不确定性（#43257）。
- **流式/连接不稳定：** 长生命周期的传输错误（"stream disconnected before completion"，#29087）以及泛化的 "Bad request" 故障（#10571）数月未解决，且难以诊断。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态汇总 — 2026-09-07

## 今日要点
v0.60.0 nightly 流水线今天照例完成了一次版本构建（无重大 changelog），而社区的关注点集中在两个长期议题上：**Pro 账号验证死循环**（#19936，19 条评论）以及**子代理终止状态上报 Bug**——`codebase_investigator` 在触发 `MAX_TURNS` 后仍然上报 `GOAL` 成功（#22323）。PR 方面，Maintainer 合并了一批面向 **MCP 工具名冲突**、**符号链接工作区 glob**、**CRLF 换行检测**以及 **Node 20 → Node 22 沙箱镜像升级**的修复，以应对 EOL 安全风险。

## 发布
- **v0.60.0-nightly.20260907.g85aca163f** ([compare](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f)) — 通过 [#29233](https://github.com/google-gemini/gemini-cli/pull/29233) 自动完成的 nightly bump；无人工撰写的 changelog 条目。

## 热门 Issue

1. **[#19936](https://github.com/google-gemini/gemini-cli/issues/19936) — Pro 订阅卡在验证死循环（19 💬 / 👍5）**
   讨论量最高的未关闭 Issue：Pro 用户在浏览器端完成鉴权后，CLI 会无限次地重复提示验证。由于直接阻塞付费用户，影响面较大；社区希望当 OAuth 回调 token 未被持久化时能给出更清晰的错误状态。

2. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子代理在 `MAX_TURNS` 后仍上报 `GOAL` 成功（13 💬 / 👍2，p1）**
   `codebase_investigator` 在实际未做任何分析时，对外谎报终止原因。对依赖多代理流水线的用户来说影响显著，需要重新验证。

3. **[#28088](https://github.com/google-gemini/gemini-cli/issues/28088) — 突然登出 / OAuth 拒绝已授权组织账号（12 💬 / 👍5，CLOSED）**
   使用 Standard 许可证的企业用户被强制重新认证，随后又被拒。虽已解决，但帖子记录了托管账号在 OAuth token 刷新上的一次回归模式。

4. **[#27466](https://github.com/google-gemini/gemini-cli/issues/27466) — Windows 下 `-p/--print` 无头模式静默无输出（7 💬，CLOSED）**
   Windows 上的 AGY 1.0.2 即使 API 调用成功也不会向 stdout 输出任何内容。修复落地后已关闭。

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC：基于 AST 的文件读取、搜索与代码库映射（7 💬 / 👍1）**
   一项长期调研，探索使用 AST 工具（如 tilth/glyph）来减少错位读取与 token 噪声；对性能敏感的用户值得关注。

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — 代理很少调用自定义 skills / 子代理（6 💬，p1）**
   现象零散但反复出现：即便显式给出了描述，模型也不会主动调用 `gradle`/`git` 等 skills，除非被直接点名。与子代理的自动调度逻辑相关。

7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — 为 Auto Memory 提供确定性脱敏（5 💬，security，p2）**
   Auto Memory 当前依赖抽取模型在事后对敏感信息脱敏。SandyTao520 的跟踪 Issue 主张在内容进入模型上下文之前就完成确定性脱敏。

8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — 命令退出后 Shell 卡在 "Awaiting user input"（4 💬 / 👍3，p1）**
   即使是 `echo` 这类最简单的命令，也会让 CLI 一直停在 "Waiting input" 提示。讨论规模不大，但社区反应强烈。

9. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 启用工具超过约 128 个（用户报告约 400）时返回 400 错误（3 💬）**
   Agent 应该更智能地控制启用工具列表的范围，以避免被 API 拒收。对接入大量 MCP 服务器的用户尤其相关。

10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — 抑制破坏性命令（`git reset --hard`、删除数据库等）（3 💬 / 👍1）**
    特性请求：希望在复杂的 git/数据库场景下，Agent 能优先选择更安全的替代方案。

## 关键 PR 进展

1. **[#28975](https://github.com/google-gemini/gemini-cli/pull/28975) — `glob` 在符号链接工作区根目录下结果丢失** *(closed)*：macOS `/tmp`（指向 `/private/tmp` 的符号链接）用户在使用合法 pattern 时会看到 `No files found`。是一项针对真实 macOS 体验的修复。

2. **[#28971](https://github.com/google-gemini/gemini-cli/pull/28971) — 截断后的 MCP 工具名可能冲突** *(closed)*：两个首尾 30 字符相同的 MCP 工具被折叠成同一个注册名。本次新增了确定性消歧策略。

3. **[#28983](https://github.com/google-gemini/gemini-cli/pull/28983) — 仅匹配到一处 `\r\n` 就误判整个文件为 CRLF** *(closed)*：`detectLineEnding` 现在基于比例而非是否出现来判断，避免在混合换行文件上做整体重写。

4. **[#28973](https://github.com/google-gemini/gemini-cli/pull/28973) — 升级沙箱镜像 `node:20-slim` → `node:22-slim`** *(closed，p1，security)*：Node 20 已于 2026-04-30 达到 EOL。属于关键的安全卫生修复。

5. **[#28972](https://github.com/google-gemini/gemini-cli/pull/28972) — 在 `formatTruncatedToolOutput` 中拦截非正的 `maxChars`** *(closed，p1)*：负数预算会通过 `slice(0, negative)` 产生损坏输出。

6. **[#29134](https://github.com/google-gemini/gemini-cli/pull/29134) — 在 `--delete-session` 中保护当前会话不被删除** *(open)*：当前会话 ID 会流经列表/删除流程；新增了后缀匹配的精确度与回归测试。

7. **[#29184](https://github.com/google-gemini/gemini-cli/pull/29184) — 在 Windows 沙箱中校验 `git` 参数以拦截 `git diff --output=`** *(open，p1，security)*：一个只读的 git 子命令可以通过 `--output` 静默截断任意文件。值得作为真实存在的沙箱逃逸加以标记。

8. **[#28982](https://github.com/google-gemini/gemini-cli/pull/28982) — 构建 Remote Agent 手机配对（`gbr/1`）扩展** *(closed)*：示例扩展，通过二维码配对让手机旁观桌面 CLI 会话。预示着围绕会话共享的扩展生态正在形成。

9. **[#29106](https://github.com/google-gemini/gemini-cli/pull/29106) — 在 EOF 且无尾随空行时 flush 最后一条 SSE 事件** *(closed)*：`CodeAssistServer` 之前会在截断流上丢弃最后一条缓冲事件（连同 `finishReason`/usage 元数据）。

10. **[#29230](https://github.com/google-gemini/gemini-cli/pull/29230) — 修复 7 个文档页面中的失效锚点** *(open)*：清理了 `docs/cli/plan-mode.md` 等页面中未编号的标题与陈旧的编号锚点。改动不大，但能减少新用户的查阅障碍。

## 特性请求趋势

- **基于 AST 的工具链集成** — #22745 与 #22746 正在探索基于 AST 的读取与代码库映射（tilth、glyph），以降低错位读取与 token 开销。
- **子代理可观测性与控制** — #22598（在 `/chat share` 中展示子代理轨迹）、#22232（`browser_agent` 锁恢复）、#22267（browser agent 遵循 `settings.json` 覆盖）。
- **更安全的 Agent 行为** — #22672（避免破坏性命令），#26525/#26522/#26523（Auto Memory 卫生：确定性脱敏、重试上限、非法 patch 隔离）。
- **工具生态改进** — #24246（优雅处理超过 128 个启用工具的情况），#21968（更好地自动调度自定义 skills/子代理）。
- **鉴权/身份稳定性** — #19936、#28088、#28062 都暴露出 Pro/Enterprise 鉴权的脆弱性。

## 开发者痛点

- **付费 Pro 与托管组织账号的鉴权脆弱性**：静默重认证死循环、OAuth 回调失败、许可证识别错误，是本周期内社区摩擦的最大单一来源。
- **Agent 的可靠性与诚实性**：子代理在达到轮次上限后仍上报 `GOAL` 成功、模型静默创建临时脚本、命令退出后 Shell 卡住（#22323、#23571、#25166）——都在持续消耗用户对长时间 Agent 工作流的信任。
- **跨平台无头模式**：Windows 上 `--print` 静默失败（#27466）是反复出现的主题——非交互式 CI 场景下，Windows 的体验仍在追赶。
- **沙箱/安全逃逸缺口**：静默的 `git diff --output=` 截断（#29184）以及沙箱镜像中使用已达 EOL 的 Node 20（#28973），都说明沙箱边界还需要更多针对参数的校验。
- **Windows 上的 CRLF 处理**：多个 PR（#28983、#29131、#29132）以及 #22466 表明，CRLF 的检测与归一化是导致细微 diff 与重写问题的长期源头。
- **MCP 工具名冲突与工具数量上限**（#28971、#24246）表明，模型上下文的工具面正在被压榨到超出注册层最初设计的承载力。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI — 社区摘要
**日期：** 2026-09-07

---

## 🔥 今日要点

Copilot CLI 仓库在 2026-09-07 的活动主要来自 2026-09-06 集中提交的大量新 issue——主要与 **1.0.81-1 / 1.0.82 引入的回归和边界情况** 有关，尤其是 **ACP（Agent Client Protocol）模式**、**BYOK 网络** 和 **输入/表单处理** 方面。两个长期存在、高点赞的 issue 已关闭：长期未解决的 aarch64 exec 错误（#827）以及 `copilot -p` 在 GHEC 数据驻留场景下的 401 问题（#4527），同时关闭的还有备受期待的项目级插件功能（#1665）。过去 24 小时内没有新版本发布。

---

## 📦 版本发布

*过去 24 小时内无新版本发布。*（最新关闭的 issue 涉及版本至 **1.0.82**，桌面应用至 **1.1.15**。）

---

## 🐛 热门 Issue

1. **[#1665 — 支持限定到项目或仓库的 Copilot CLI 插件（已关闭）](https://github.com/github/copilot-cli/issues/1665)**
   作者 **willmarkley**。拥有 **18 👍 和 14 条评论**，是今日批次中点赞数最高的 issue。经过数月反馈后终于关闭，标志着按仓库限定插件配置即将落地——对希望在不同仓库之间使用一致插件设置（而非依赖每个用户的 `~/.copilot` 配置）的团队而言，这是一个重大可用性改进。

2. **[#4527 — 自 1.0.81-1 起 `copilot -p` 在 GHEC 数据驻留场景下出现 401（已关闭）](https://github.com/github/copilot-cli/issues/4527)**
   作者 **AvitalLivshits**（4 👍）。对企业用户而言是一个重要的回归：非交互式 prompt 模式请求被发送到了 `api.githubcopilot.com` 而非租户对应的 `<tenant>.ghe.com` 端点，导致登录失败。该 issue 的关闭意味着 GHEC 数据驻留客户的租户路由修复已得到确认。

3. **[#4695 — MCP OAuth 令牌无法在会话间复用](https://github.com/github/copilot-cli/issues/4695)**
   作者 **DaveHolden2025**（5 条评论）。对于使用 OAuth PKCE 的 HTTP MCP 服务器，重复的缓存键条目会强制用户反复重新认证。对于将 Copilot CLI 接入 Atlassian、Sentry 或自定义企业级 MCP 服务器的用户而言，这是一个高摩擦问题。

4. **[#4692 — CLI 未识别企业默认模型](https://github.com/github/copilot-cli/issues/4692)**
   作者 **muhssamy**（4 条评论）。VS Code 和 GitHub Desktop 能正确遵循 `MAI-Code-1.1-Flash`，但 CLI 忽略了组织管理的默认值。这是一个影响企业管理员策略强制执行的差异性缺陷。

5. **[#2644 — prompt 输入框的 Shift+Arrow / Ctrl+A 选区操作](https://github.com/github/copilot-cli/issues/2644)**
   作者 **mu88**（2 👍，3 条评论）。CLI 输入框缺少基础的 TUX 风格文本选择功能。这是一个长期存在的体验问题——虽小，却是每个重度用户每天都会遇到的摩擦。

6. **[#4537 — ACP 模式自动批准工具调用（#845 的回归）](https://github.com/github/copilot-cli/issues/4537)**
   作者 **richardjv-msft**（2 👍）。自 1.0.81-1 起，`--acp` 不再发送 `session/request_permission`，导致 shell 命令和文件编辑在未经用户同意的情况下直接执行。对于依赖权限请求机制保障安全性的第三方 ACP 客户端（编辑器、IDE）而言，这是一个严重的回归。

7. **[#4720 — BYOK 静默禁用 prompt 缓存（成本约 5×）](https://github.com/github/copilot-cli/issues/4720)**
   作者 **Jianshui**。Copilot CLI 1.0.82 的 BYOK 在发送请求时不附带 prompt 缓存声明，因此提供商报告的 `cached_tokens=0`。对于 Anthropic/OpenAI 的 BYOK 用户而言，这是一个直接、可量化的财务影响。

8. **[#4694 — WSL2：使用 Claude Opus 5 时 RSS 约 31 GB、CPU 约 57%](https://github.com/github/copilot-cli/issues/4694)**
   作者 **stark-antonio-almeida**。在 WSL 上使用高推理强度进行长时间会话时，内存占用会急剧膨胀。这可能与上下文/推理缓冲区处理有关——对 Linux 开发机上的用户而言是一个阻塞性问题。

9. **[#4706 — 格式错误的 tool-call 标记被静默忽略](https://github.com/github/copilot-cli/issues/4706)**
   作者 **MortenBoysen**。工具/函数调用偶尔会发出 `<invoke>` / `court` 这类标记，但被直接丢弃而未报错。这是一个可靠性问题，可能导致 agent 静默跳过关键动作。

11. **[#4735 — 助手文本被折叠进 "Thought for Ns" 隐藏推理区](https://github.com/github/copilot-cli/issues/4735)**
    作者 **Defiect**。紧邻工具调用之前的用户可见文本被重新归类为推理内容并隐藏。这削弱了透明度——用户无法看到模型实际输出的内容。

*其他值得注意但讨论较少的 issue：**#4738**（ask_user 表单在回车后丢弃已输入内容——高严重程度的数据丢失问题）、**#3894**（agentStop 在子代理轮次触发，破坏 `/review`）、**#4743**（ACP 的 `end_turn` 在后台 shell 完成前发出）、**#4741**（HydraFusion + Astra 计划接受卡住）。

---

## 🔧 关键 PR 进展

过去 24 小时内仅有一个 PR 有变动：

1. **[#4739 — docs: 提出由终端负责的 macOS 通知方案](https://github.com/github/copilot-cli/pull/4739)** — 作者 **anujb-msft**。这是一个参考性提案（并非针对已发布 CLI 的代码改动），记录了 macOS 通知点击投递的问题，并提供了一个 MIT 许可、可移植的终端通知示例及回归测试。对桌面应用团队而言是有用的前期方案。

*注：过去 24 小时内无其他 PR 活动。*

---

## 💬 热门讨论

*源信息流中未提供讨论数据——根据格式规则省略本节。*

---

## 📈 功能请求趋势

汇总今日的 issue 和请求，最受关注的方向是：

- **项目 / 仓库级配置**（#1665）。让插件、代理、hook 和 prompt 跟随仓库走，而不是固化在 `~/.copilot` 中。
- **TUI 中提供一流编辑器级输入体验**（#2644、#4736）。Shift+Arrow 选区、Ctrl+A、Ctrl+E 接受内联自动补全建议。
- **ACP 集成更好的可靠性与可见性**（#4537、#4555、#4743）。权限请求、后台任务生命周期，以及给第三方客户端清晰的会话空闲信号。
- **BYOK 能力对齐与成本透明**（#4720、#4733）。Prompt 缓存、max_output_tokens 计量，以及可预测的截断行为。
- **企业/管理员策略与 VS Code 和 Desktop 对齐**（#4692）。组织管理的默认模型和租户路由必须统一生效。
- **更安全的交互式表单**（#4738）。自动保存/可恢复的问答机制以避免数据丢失。
- **模型输出的渲染保真度**（#4735）。不要将面向用户的正文折叠进收起的推理块中。

---

## 😤 开发者痛点

开发者今天在 Copilot CLI 上反复遇到的困扰：

1. **1.0.81-1 / 1.0.82 的回归。**多项不同问题（ACP 权限、GHEC 路由、桌面会话创建）都可追溯到最近的同一批版本——升级指引和回滚路径成为反复被提出的需求。
2. **BYOK 下的成本静默放大。**缓存在无通知的情况下被禁用，导致意外的高额账单。
4. **Linux/WSL 资源占用。**在持续使用 Opus 级推理强度时 RSS 偏高，在资源受限的开发机上是一个真实的阻塞点。
5. **交互模式与非交互模式行为不一致。**`copilot -p` 和 `copilot --acp` 在认证路由、权限请求和会话生命周期方面与交互式 `copilot` 存在差异。
6. **隐藏推理吞掉面向用户的正文。**当 "Thought for Ns" 吞掉了真实内容时，调试和信任都会受到影响。
7. **ACP 客户端的权限模型脆弱。**对破坏性操作在未明确发出 `session/request_permission` 的情况下自动批准，是安全和工作流层面的回归。
8. **交互式表单中的数据丢失。**`ask_user` 在回车后丢失已输入内容，是一个高严重程度的 UX 缺陷。
9. **tool-call 标记偶尔格式错误且无报错。**失败被静默吞掉而非显式上报，导致排查极其困难。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区简报 — 2026-09-07

## 1. 今日要点

OpenCode v2.0 桌面应用正在进行一次大规模性能改造:贡献者 **Hona** 落地了三层持久化重写(#47704 → #47705 → #47706),用 VS Code 风格的 `Memento` + 按资源备份取代了渲染进程的 `electron-store` 写入路径，消除了 Windows 上主进程 3-5 秒的冻结。与此同时，**OpenCode Go 订阅用户正遭遇一波计费与限流的困扰**：至少有三个仍处于打开状态的 issue(#42935、#47613、#47703)报告配额耗尽和持续的 HTTP 429,尽管界面显示的用量很低。插件/权限的易用性也在持续引发讨论，当日最热门的 issue(#7006,25 👍)指出 `permission.ask` 虽有定义却从不触发。

---

## 2. 版本发布

_过去 24 小时内没有新版本发布。_

---

## 3. 热门 Issue

| # | Issue | 为何重要 | 热度 |
|---|---|---|---|
| [#7006](https://github.com/anomalyco/opencode/issues/7006) | `permission.ask` 插件钩子有定义但从未触发 | 使新权限系统的插件自定义能力整体落空；用户无法编写自动批准插件 | 💬16 · 👍25 |
| [#45278](https://github.com/anomalyco/opencode/issues/45278) | 连续 3 个月付款成功后遭拒付 | 付费产品的计费可靠性问题——卡和银行账户均未变更 | 💬12 · 👍2 |
| [#24335](https://github.com/anomalyco/opencode/issues/24335) | 通配符 `*` 规则会覆盖较低权限 | 权限文档承诺"最后一条规则生效”，但实现与之矛盾 | 💬10 · 👍5 |
| [#42935](https://github.com/anomalyco/opencode/issues/42935) | 在 DeepSeek V4 Flash 上约 20 分钟即耗尽 OpenCode Go 配额 | 缓存读取量离奇降为 0;有很强的计费/缓存问题嫌疑 | 💬8 · 👍3 |
| [#32202](https://github.com/anomalyco/opencode/issues/32202) | Skill 重复根目录导致 `available_skills` 随重启而变 | Skill 解析不确定，令插件行为时好时坏 | 💬8 · 👍1 |
| [#47613](https://github.com/anomalyco/opencode/issues/47613) | Go 出现 HTTP 429,`retry-after` 长达 12 小时，持续约 3 天 | 付费用户实际上被锁在门外;`retryAfterMs` 不断重置 | 💬7 |
| [#36454](https://github.com/anomalyco/opencode/issues/36454) | TreeSitter 客户端销毁 → 内存泄漏 | 反复出现 `warn: TreeSitter client destroyed`;长时间运行下内存可能持续增长 | 💬6 |
| [#46628](https://github.com/anomalyco/opencode/issues/46628) | MCP 的 `anyOf`/`oneOf`/`allOf` schema 在 Anthropic 上返回 400;MCP 工具从未到达 `tool.definition` | 整类工具对 Claude 不可用；阻塞了大量真实 MCP 服务器 | 💬5 |
| [#43758](https://github.com/anomalyco/opencode/issues/43758) | [Feature] 会话级终端 + 可选的终端上下文提供给模型 | 呼声很高的易用性改进；自 #12468 起终端一直停留在工作区级 | 💬4 |
| [#47703](https://github.com/anomalyco/opencode/issues/47703) | Go 在 $60 配额仅用 $24.54 时即被限制；免费模型同样被限制 | 控制台显示总量 101%,但各模型用量加总与之不符——配额计算 bug | 💬1 |

---

## 4. 重点 PR 进展

| # | PR | 改动内容 |
|---|---|---|
| [#47704](https://github.com/anomalyco/opencode/pull/47704) | **perf(app):** 在渲染进程中缓存存储命名空间并批量写入 | Hona 持久化重写的第 1/3 层——批量加载 + Map 读取 + 批量刷新窗口，参照 VS Code 的 `Memento` 设计。 |
| [#47705](https://github.com/anomalyco/opencode/pull/47705) | **perf(app):** 按计划序列化持久化存储，而非每次 setter 触发即写 | 第 2/3 层——将写入推迟到保存窗口、所有者清理和页面隐藏时执行。 |
| [#47706](https://github.com/anomalyco/opencode/pull/47706) | **perf(app):** 将大型草稿文本外置为内容寻址分块 | 第 3/3 层——大段粘贴被切分为固定大小的分块，使每次保存的开销保持恒定。 |
| [#47695](https://github.com/anomalyco/opencode/pull/47695) | **fix(desktop):** 用 SQLite 而非 `electron-store` 持久化渲染进程状态 | (已关闭)Windows 上 3–5 秒冻结的根因；已被上述三层方案取代。 |
| [#47694](https://github.com/anomalyco/opencode/pull/47694) | **fix(app):** 为 worktree 创建设置与安装时长相匹配的请求截止时间 | (已关闭)撤销了对 `POST /api/worktree` 新加的 60 秒请求中止，因为 `git worktree add` + `commands.start` 需要 90–120 秒。 |
| [#47427](https://github.com/anomalyco/opencode/pull/47427) | **fix(desktop):** 防止大段粘贴导致的崩溃 | 对粘贴处理设置上限，使桌面端提示输入框在超大文本涌入时不再卡顿/崩溃。 |
| [#45424](https://github.com/anomalyco/opencode/pull/45424) | **fix(core):** 分发 AI SDK 包缺少原生路由的 provider | `SessionRunnerModel.fromCatalogModel` 仅硬编码了 3 个包；此 PR 为其余包补上路由。Closes #45426。 |
| [#47702](https://github.com/anomalyco/opencode/pull/47702) | **fix:** 将 Muse Spark 模型路由至 Responses API 而非 Chat Completions | Muse Spark 1.2/1.3 此前返回 0 tokens / HTTP 500。Closes #44659。 |
| [#45482](https://github.com/anomalyco/opencode/pull/45482) | **fix(task):** 让异步子 agent 任务如实、一次性、按顺序作答并停止 | 当被调用的 agent 尚有未完成的异步子任务时，发送一条仅含请求的收尾确认。Depends on #43510。 |
| [#42223](https://github.com/anomalyco/opencode/pull/42223) | **fix(tui):** 修正在新目录中继续会话时的工作目录 | `opencode -c` 显示的是过期目录；SDK 的 `pick()` 缺少 config.dir 回退。 |
| [#47699](https://github.com/anomalyco/opencode/pull/47699) | **fix(cli):** 将 `--model` 透传给 TUI 入口 | 根命令虽接受 `--model`,却在 TUI 启动前将其丢弃。 |
| [#47635](https://github.com/anomalyco/opencode/pull/47635) | **fix(opencode):** 解析 markdown 格式的 agent prompt | Frontmatter 的 `prompt:` 此前会被空的 Markdown 正文覆盖。 |
| [#47175](https://github.com/anomalyco/opencode/pull/47175) | **fix(core):** 明确读取工具的 offset 校验错误 | 当模型幻觉出负数 `offset` 时给出更清晰的报错。 |
| [#47262](https://github.com/anomalyco/opencode/pull/47262) | **fix(workflows):** 在 fork 上跳过 close-issues 与 close-prs 任务 | 添加标准的 `if: github.repository == 'anomalyco/opencode'` 守卫。 |

---

## 5. 热门讨论

_本期未提供讨论数据——本节略过。_

---

## 6. 功能请求趋势

提炼自本周提出的开放功能请求与改进项：

- **更佳的会话体验** — 收藏/星标会话(#47700)、可为模型附带可选终端上下文的会话级终端(#43758)、项目名称与文件夹名称解耦(#47708)、会话在 `.git` 被移除后仍能保留(#47652)。
- **一流的插件接口** — 预留**插件数据流/指标面板**，按会话展示实时数据而不污染聊天流(#46156);可选启用从 `.claude/` 目录发现 Claude Code 的 `agents/` 和 `commands/`(#47650)。
- **Provider 文档与覆盖** — 为现有的 Standard Compute provider 补充文档(#47475);新增 Nous Research portal 集成(#47515)。
- **权限自定义** — 让 `permission.ask` 真正触发，使插件能够实现自动批准(#7006);修复文档已写明却无法工作的“最后一条规则生效”通配符语义(#24335)。
- **性能与桌面端稳定性** — 对 SQLite 承载的渲染进程状态(现已落地)以及大段粘贴保护(#47427)的持续需求。

---

## 7. 开发者痛点

1. **OpenCode Go 计费混乱** — 三份独立报告(#42935、#47613、#47703)描述了配额耗尽、持续 12 小时的 429 错误，以及与显示总量对不上的配额计算。这是付费用户反映最强烈的单一痛点。
2. **权限系统只做了一半** — 新权限模型(出自 #6319)的文档语义与实现不符(#24335 的通配符优先级问题)，且插件钩子(`permission.ask`)从未触发(#7006),令插件作者颇为沮丧。
3. **MCP 集成缺口** — `anyOf`/`oneOf`/`allOf` 输入 schema 在 Anthropic 上返回 400(#46628)、MCP 工具从未到达 `tool.definition`、OAuth `resource_metadata` 被忽略导致 AWS Bedrock AgentCore 故障(#44790),以及 Ghidra MCP 间歇性请求超时(#47584)。
4. **Windows 桌面端性能** — 启动时 GPU 进程反复崩溃(#46691)、关闭标签页时因 `electron-store` 同步写入导致主进程冻结 3–5 秒(#47695)、大段粘贴崩溃(#47425 / #47427)。Hona 的持久化系列改动(#47704–#47706)直接解决了这一问题。
5. **会话/目录生命周期怪癖** — 在新目录中运行 `opencode -c` 显示过期目录(#42221)、项目 `.git` 被移除后会话从 `/sessions` 中消失(#47652),以及配置的默认模型被弃用时 `opencode run` 返回令人费解的 `UnknownError`(#46760)。
6. **TUI / shell 开销** — 空闲时主线程因持续 writev 绘制约 15 fps 的 spinner 而占满约 100% CPU(#42306),另有暗示内存泄漏的 TreeSitter 客户端销毁警告(#36454)。
7. **配置陷阱** — `opencode2 serve` 拒绝已配置的 Basic Auth(#45856)、保存 CLI 偏好时覆盖符号链接的 `cli.json`,破坏 Stow 式 dotfile 管理(#45067),以及本地 TUI 插件在 node 构建中加载失败(#42481)。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区速递 — 2026-09-07

## 今日要闻

过去 24 小时的主要话题集中在 **provider 可靠性与路由修复**：长期存在的 `openai-codex` 卡在 `Working...` 的问题（#4945）持续引发大量讨论；同时围绕 OpenCode Go 新的 `x-opencode-session` header、GitHub Copilot GPT-6 Astra 路由、以及经由 OpenRouter 调用 Claude Opus 5 的若干紧急故障也陆续出现并被修复。社区还推动了 **跨 provider fallback** 作为主要的韧性主题 —— 同一提案以三份重复 PR（#9251、#9249、#9248）的形式提交，表明社区对该方向已形成强烈共识。在 UX 方面，全屏 TUI 滚动回归（#9052）以及 Windows shell/终端的怪异问题再次浮出水面。

## 发布

过去 24 小时内无新发布。

## 热门 Issue

1. **[#4945](https://github.com/earendil-works/pi/issues/4945) — `openai-codex` 连接可靠性问题** *(OPEN, 进行中, 76 条评论, 👍32)*
   活跃度最高的一条讨论。用户反馈通过 `openai-codex` 调用 `gpt-5.5` 时，TUI 静默卡在 `Working...`，无任何流式文本、工具调用或错误信息，只能通过 Escape 中止回合。已标记为 `inprogress`，但从讨论量看更像是上游侧的不稳定，而非稳定可复现的 bug。

2. **[#7547](https://github.com/earendil-works/pi/issues/7547) — 你如何在 Windows 上使用 Pi？遇到了哪些问题？** *(OPEN, 57 条评论, 👍2)*
   一条明确征集 Windows 用户体验的元 issue，便于维护者排定修复、文档或非核心解决方案的优先级。近期针对 Windows 专属 bug（#9229、#7175）的关闭动作，反映出该帖给团队带来的压力。

3. **[#9052](https://github.com/earendil-works/pi/issues/9052) — 全屏 TUI 滚轮滚动速度比普通模式慢 3 倍** *(OPEN, 6 条评论, 👍3)*
   在口碑良好的全屏模式下出现的一个明显 UX 回归。用户选择全屏模式正是为了固定的输入框，但滚动性能令人难以接受。

4. **[#8826](https://github.com/earendil-works/pi/issues/8826) — 限制 agent 在长时间瞬态故障下的退避重试** *(OPEN, 4 条评论)*
   具体的可用性诉求：为 agent 层级的重试设置有限上界的指数退避，避免长时间会话因上游 `503` 等瞬态错误而卡死。

5. **[#9229](https://github.com/earendil-works/pi/issues/9229) — Windows：`shell_path` 被忽略，始终优先使用 WSL bash** *(CLOSED, 4 条评论)*
   在已禁用 WSL 功能的 Windows 11 上，`settings.json` 中的 `shell_path` 会被忽略。已关闭（很可能已合入），对 Windows 用户来说是一次明确的胜利。

6. **[#9209](https://github.com/earendil-works/pi/issues/9209) — GitHub Copilot GPT-6 Astra 被路由到不支持的 `/chat/completions`** *(CLOSED, 4 条评论)*
   针对新版 Copilot 模型的直接路由 bug，已在同一窗口内通过 PR #9253 修复。

7. **[#9246](https://github.com/earendil-works/pi/issues/9246) — Anthropic：将未使用的第 4 个缓存断点用于一个稳定检查点** *(CLOSED, 3 条评论)*
   针对 `anthropic-messages` 的一个不错的成本/性能优化：Anthropic 接受 4 个断点，但 Pi 只发送了 3 个，相当于白白丢掉一次缓存命中。

8. **[#9247](https://github.com/earendil-works/pi/issues/9247) — JSON/RPC：对外暴露 provider 原生的终态失败分类** *(CLOSED, 3 条评论)*
   扩展作者希望在 JSON/RPC 的 assistant 事件上获得机器可读的失败类别（上下文溢出、拒绝、瞬态、未知）。

9. **[#8306](https://github.com/earendil-works/pi/issues/8306) — 全屏 TUI 图片渲染只显示首行** *(CLOSED, 3 条评论)*
   尽管视觉 bug 很明确，仍以 `no-action` 关闭 —— 提醒社区：全屏模式下部分 UX 回归仍未解决。

10. **[#9165](https://github.com/earendil-works/pi/issues/9165) — 通过 OpenRouter 调用 Claude Opus 5 时拒绝逐消息的 `output_config`** *(CLOSED, 3 条评论)*
    一处 provider 特定的兼容性问题：Pi 发送了 OpenRouter 在该模型上拒绝的字段。已通过临时方案关闭。

11. **[#8617](https://github.com/earendil-works/pi/issues/8617) — Codex：对图片密集型工具结果使用文件引用** *(OPEN, 3 条评论)*
    作者已有一个可工作的原型，仅询问是否应合入上游。有望显著降低图片密集型会话的负载大小与延迟。

## 关键 PR 进展

1. **[#6881](https://github.com/earendil-works/pi/pull/6881) — `feat(ai)`：当响应包含费用时使用 provider 上报的成本** *(OPEN, 进行中)*
    将 `usage.cost` 与 BYOK 上游推理成本接入 `usage.cost.total`，并回退到目录价。对 BYOK 及 Vercel 风格 provider 的精确计费非常重要。

2. **[#9253](https://github.com/earendil-works/pi/pull/9253) — `fix(ai)`：将 Copilot GPT 模型路由到 Responses（修复 astra）** *(OPEN)*
    修复 #9209。考虑到 `gpt-4` 系列已不在其目录中，此次修复也为未来 Copilot 路由做好准备。

3. **[#9252](https://github.com/earendil-works/pi/pull/9252) / [#9250](https://github.com/earendil-works/pi/pull/9250) — 将 undici `connect.lookup` 固定到系统 `dns.lookup`** *(CLOSED)*
    修复 MagicDNS / split-horizon 解析问题（#9244）。重复 PR 已合并，修复已落地。

4. **[#9251](https://github.com/earendil-works/pi/pull/9251) / [#9249](https://github.com/earendil-works/pi/pull/9249) / [#9248](https://github.com/earendil-works/pi/pull/9248) — 传输错误时的跨 provider fallback** *(CLOSED, 重复)*
    实现 #9242：一个可启用的 fallback 链，会话在遇到传输/DNS/超时错误时跳转到另一个已注册的 provider/model。社区对此方向释放了强烈信号。

5. **[#9080](https://github.com/earendil-works/pi/pull/9080) — `feat(tui)`：新增跳到最新消息的控制项** *(CLOSED)*
    基于 `@dgtlntv` 的新消息指示器分支 —— 长期呼吁的 UX 改进终于落地。

6. **[#9233](https://github.com/earendil-works/pi/pull/9233) — 实时解析模型鉴权，而非依赖启动时的快照** *(CLOSED)*
    消除了一个竞态：启动时可用性快照尚未稳定，导致出现错误的"无鉴权"失败。是一项真正的正确性修复。

7. **[#7610](https://github.com/earendil-works/pi/pull/7610) — 新增 LLM Gateway 与 LLM Gateway DevPass providers** *(OPEN)*
    由 LLM Gateway 团队贡献的 OpenRouter 风格路由器。延续了 Pi 一贯的"一等公民 provider 集成"风格。

8. **[#9137](https://github.com/earendil-works/pi/pull/9137) — 新增 Nix flake** *(OPEN, WIP)*
    作者标记为 WIP。这是 Linux/NixOS 上呼声较高的打包格式，值得持续关注。

9. **[#9224](https://github.com/earendil-works/pi/pull/9224) — 将 OpenRouter `:free` 的 `maxTokens` 限制为基础模型的值** *(CLOSED)*
    `:free` 目录条目夸大了限制，导致上下文较小的模型（例如 `minimax-m3:free`）出现 400。改动虽小但影响显著，是一项重要的 provider 卫生修复。

10. **[#9222](https://github.com/earendil-works/pi/pull/9222) — 在活动会话操作期间拒绝 reload** *(OPEN)*
    修复一个微妙的 RPC 竞态：工具执行成功，但外层封装命中了已失效的 runner，向模型回传了一个虚假错误。

11. **[#9096](https://github.com/earendil-works/pi/pull/9096) — 新增 Meta provider 及 Muse 订阅 OAuth** *(OPEN)*
    新 provider，鉴权方式较为特殊：每天需重新铸造的 token，以及"突发式"流式输出。解决了 #7543。

12. **[#9219](https://github.com/earendil-works/pi/pull/9219) — 在 `wrapUIPromptContext` 中保留宿主 UI 原型方法与 Proxy 陷阱** *(CLOSED)*
    细微但真实存在的问题：对象展开会静默丢失 `ExtensionUIContext` 上由宿主提供的方法，从而破坏嵌入方的使用。

## 热门讨论

### Ideas
- **[#9146](https://github.com/earendil-works/pi/discussions/9146) — 按仓库覆盖 API Key 并忽略 `auth.json`** *(2 条评论, 👍1)*
  作者希望全局使用由 1Password 托管的 OpenRouter key，但在特定仓库中钉住另一把 key（并跳过 `auth.json`）。用例是可复现实验/评测工作 —— 这类场景下不应让个人 key 被扣费。值得与现有 `--provider` 标志一起支持。

## 功能请求趋势

- **Provider 韧性与可移植性** 是呼声最高的主题：跨 provider fallback 链（#9242/9251/9249/9248）、有界重试退避（#8826）、准确的 provider 上报成本（#6881）、实时鉴权解析（#9233），以及逐调用的工具确认（#9227/#9228）。
- **TUI 打磨**：全屏模式下的可用性细节（固定输入框 vs. 滚动性能 vs. 图片渲染 —— #9052、#8306、#9240）、跳到最新消息（#9080）、会话树的增量滚动（#5786），以及为扩展提供的运行时 TUI 模式切换（#9238）。
- **新

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区简报 — 2026-09-07

## 1. 今日亮点

Qwen Code 发布了 **v0.23.1-preview.1**,主打功能是 Web Shell 动态工作流的可视化与管理(#10594)。不过发布流水线出了点岔子 —— `integration_docker` 作业失败(#11185),这也呼应了 #11109 中提出的关于 CI 效率的更广泛担忧。安全问题成为本期 issue 区的焦点：**一份 P1 报告(#11198)**指出，默认开启的使用统计遥测会在未经脱敏的情况下上传工具报错原文(包括 shell 命令行)；此外还有 `--continue` 之后技能钩子校验可被绕过的 P1 问题(#11180)。与此同时，**mesh 编排**体系快速推进，一口气新增三个 PR(#11225、#11229、#11230);ink→OpenTUI 迁移(#8662,30 条评论)也随着 #11152 的推进逼近功能对齐。

## 2. 版本发布

- **[v0.23.1-preview.1](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.1)** — `feat(web-shell)`:可视化并管理动态工作流运行([#10594](https://github.com/QwenLM/qwen-code/pull/10594),作者 @qqqys);`perf(web-shell)`:派生会话工作流项目。注意：本次发布运行的 `integration_docker` 作业失败([#11185](https://github.com/QwenLM/qwen-code/issues/11185))。
- **[v0.23.0-nightly.20260906.92a8a8d179](https://github.com/QwenLM/qwen-code/releases)** 与 **[v0.23.0-nightly.20260905.0c945a6136](https://github.com/QwenLM/qwen-code/releases)** — 携带相同 web-shell 工作流变更的 nightly 构建。

## 3. 热门 Issue

1. **[#8662](https://github.com/QwenLM/qwen-code/issues/8662) — 将 TUI 渲染从 ink 迁移到 OpenTUI(跟踪)** · 30 条评论。当日讨论最热烈的问题：现有 ink 7 + React 19 技术栈背负着一个约 1037 行的补丁渲染器，并存在结构性闪烁与响应性问题。该跟踪 issue 规划了完整的迁移路线；PR #11152 补齐了最后的对齐差距。
2. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198) — 遥测未经脱敏即上传工具报错原文(P1)** · Shell 失败信息(包括完整命令行)会流入默认开启的 RUM 端点。该问题在 `main` 上早已存在，且波及范围比 #10916 中标记的那个字段更广；已标记为 ready-for-human。
3. **[#11180](https://github.com/QwenLM/qwen-code/issues/11180) — 技能 `PreToolUse` 钩子在 `--continue` 后不再执行(P1)** · 一个校验注入会话 ID 的安全门钩子起初工作正常，但在恢复的会话中会静默停止触发，而其指令仍留在上下文中 —— 对基于技能的工作流而言，这是一次实实在在的安全边界回退。
4. **[#6181](https://github.com/QwenLM/qwen-code/issues/6181) — Web Shell 移动端会话切换卡顿(P1)** · 四层开销叠加(侧边栏轮询、未压缩的全量历史加载、每帧 O(transcript) 的渲染)导致在抽屉关闭动画期间，大会话的 UI 会卡死数秒。已标记为 ready-for-agent。
5. **[#11031](https://github.com/QwenLM/qwen-code/issues/11031) — 导出的 HTML 内嵌整个 Web Shell 运行时(P1,已关闭)** · 由于完整依赖图被内联，每个 `/export html` 文件即使会话为空也高达约 19.5 MB。本周期内已关闭 —— 这对可分享的会话记录是一大胜利；后续的泄漏问题在 #11100 中跟踪。
6. **[#11217](https://github.com/QwenLM/qwen-code/issues/11217) — Anthropic SSE 失败却报告 headless JSON 成功(P2)** · 在 Anthropic 兼容 SSE 上复现了 #8920 那一类“假成功”问题：即便流已失败，headless 运行仍会以退出码 0 结束并输出格式完好的 JSON。严重破坏 CI/自动化的可信度。
7. **[#11146](https://github.com/QwenLM/qwen-code/issues/11146) — 预先中止的工具请求卡在无关批次之后(P2)** · `CoreToolScheduler.schedule()` 可能让一个已取消的请求仍排队在活动批次之后；相关清理缺口见 #11162。
8. **[#11109](https://github.com/QwenLM/qwen-code/issues/11109) — release.yml 重复劳动；一个 20 分钟的步骤什么都没验证(P2)** · 该 issue 提交当天就有两次发布运行超时，因此与今天 v0.23.1-preview.1 的发布失败(#11185)直接相关。
9. **[#11227](https://github.com/QwenLM/qwen-code/issues/11227) — `/effort` 未传递到 OpenAI 兼容后端(P2)** · 推理强度(reasoning effort)的选择只在本地更新，从不进入发往第三方 OpenAI 兼容端点的 HTTP 请求 —— 一个反复出现的兼容性痛点。
10. **[#10247](https://github.com/QwenLM/qwen-code/issues/10247) — Better Agent Team:稳定性审计后续事项(P2)** · 多智能体质量工作的统一跟踪入口，汇总竞态条件修复与面向贡献者的 `welcome-pr` 事项。

## 4. 重点 PR 进展

1. **[#11152](https://github.com/QwenLM/qwen-code/pull/11152) — OpenTUI 对齐收尾(对话框、composer、shell 模式)** · 补齐与 ink 渲染器相比最后一批已知行为差距 —— 认证对话框自动打开、延迟更新、shell 模式行为 —— 并附带用于验证这些行为的验收测试装置。
2. **[#11225](https://github.com/QwenLM/qwen-code/pull/11225) — Mesh:隐藏式宿主会话启动器** · 新增工作区作用域的隐藏 mesh 宿主，具备私有启动路由、基于锁的认领、跨启动复用以及基于 reaper 的恢复机制。
3. **[#11229](https://github.com/QwenLM/qwen-code/pull/11229) / [#11230](https://github.com/QwenLM/qwen-code/pull/11230) — Mesh:运行绑定、轮次提示信封与线程状态** · 以纯净且可在运行时验证的基础能力(逐轮的环境运行绑定、由关闭义务推导出的线程状态)先行落地，为依赖它们的线程工具铺路。
4. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086) — 将扩展作用域收敛到工作区运行时** · 把全局扩展目录整合为按工作区的运行时，提供带工作区限定符的 daemon/SDK 访问，并更新 composer `@` 菜单与扩展管理。
5. **[#10183](https://github.com/QwenLM/qwen-code/pull/10183) — 结构化按需记忆召回** · 将自动记忆从平铺的提示注入演进为推/拉协议：两级语料树、面向查询的元数据子树，以及专用的召回工具。
6. **[#11015](https://github.com/QwenLM/qwen-code/pull/11015) — 命名会话的 worktree 重置(Channels 第 4B 部分)** · `/clear`、`/new` 与 `/reset` 现在可作用于 worktree 隔离的任务，同时保留经 daemon 认证的 worktree、文件与分支。
7. **[#10347](https://github.com/QwenLM/qwen-code/pull/10347) — 瞬时网络错误自动重试(EOF)** · 将被包装的底层传输失败(如 `400 network error ... EOF`)重新归类为可重试，把有界自动重试扩展到无法使用 Ctrl+Y 的通道。
8. **[#7957](https://github.com/QwenLM/qwen-code/pull/7957) — 粘贴复制的 Windows 文件** · 文件资源管理器剪贴板中选中的内容可通过现有的粘贴路径转换为图片附件或文件引用。
9. **[#11169](https://github.com/QwenLM/qwen-code/pull/11169) — 本地文件桥接的信任门修复** · 补上了在 #10962 squash 合并时遗漏的四项评审修复，关闭工作区路由判定中的信任门与旁观者缺口。
10. **[#10421](https://github.com/QwenLM/qwen-code/pull/10421) — 每次授权重写时执行内容过滤** · 确保有效性探针在临时树(throwaway tree)上的所有重写都会执行本地配置的内容过滤器；相关加固回退问题在 #11205 中跟踪。

## 5. 热门讨论

*已省略 —— 本周期数据集中未提供讨论数据。*

## 6. 功能请求趋势

- **Web Shell 性能与体积**：导出体积膨胀(#11031、#11100)、移动端卡顿(#6181)以及会话记录与运行时解耦占据主导 —— `roadmap/export-data` 与 `scope/web-shell` 标签反复出现。
- **多智能体编排**:mesh 系列(#11225/#11229/#11230)、Agent Team 质量待办(#10247)以及通道/worktree 隔离(#11015、#11186)体现了对协同智能体工作流的持续投入。
- **终端 UX 现代化**:OpenTUI 迁移(#8662、#11152、#9305)是本季度最明确的 UI 主题。
- **第三方提供商兼容性**:`/effort` 传递(#11227)、Anthropic SSE 错误语义(#11217、#11215),以及轮次中消息排队等 ACP 对齐特性(#8542)。
- **记忆与上下文管理**：结构化召回(#10183)与 `/compress` 稳定化(#11094)。

## 7. 开发者痛点

- **静默失败模式侵蚀信任**：SSE 出错时的假成功 headless JSON(#11217)、`ask_user_question` 未展示问题就报告 "User declined"(#9011)、启动引导时被吞掉的子命令参数(#11193)。
- **失灵的安全门**：技能 `PreToolUse` 钩子可经 `--continue` 绕过(#11180),或经 `/skill-name` 调用时根本不触发(#11067,已关闭)—— 再加上未脱敏的遥测(#11198)—— 位居隐私/安全类槽点之首。
- **CI 抖动与流水线浪费**：发布超时(#11109、#11185)、资源池争用下因一刀切超时被强杀的 E2E(#11209,已关闭;#11134 已添加重试)，以及可能白白带入回退的 autofix 循环(#10188、#11214)。
- **取消/中止的边缘场景**：围绕已中止工具请求的一批调度器 bug(#11146、#11162、#11232)表明，异步取消路径需要一次专项审计。
- **错误细节卫生**:daemon 日志中出现 `[object Object]`(#11123)、会话记录回放时丢失 `resource_link` 附件(#11178),降低了 SDK 使用方的可调试性与数据保真度。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*