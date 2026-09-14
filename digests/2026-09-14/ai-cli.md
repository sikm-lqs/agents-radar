# AI CLI 工具社区动态日报 2026-09-14

> 生成时间: 2026-09-14 11:30 UTC | 覆盖工具: 7 个

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

# AI CLI 工具跨工具对比报告 — 2026-09-14

*涵盖：Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、OpenCode、Pi、Qwen Code*

---

## 1. 生态概览

AI CLI 类别已经明显超越了"在终端里聊天"的阶段，进入了**持久化的智能体运行时**：每个社区如今都在攻克长生命周期会话、持久化内存、MCP 进程生命周期、权限作用域，以及多平台（Windows/桌面/移动端）交付，而不是停留在基础提示词工程。当下流量主要由两股结构性力量主导：**成本/上下文经济学**（缓存写入取证、MCP schema 膨胀吞噬高达 82% 的初始上下文）以及 **Windows 可靠性**——这是最具跨界性的痛点表面，在七个追踪源中有六个明确出现。与此同时，一个可见的社区工具层（会话导出器、查看器、监督器）正在围绕一派对持久化能力支持不足的缺口形成——这是这些产品演进方向的有力前瞻指标。

## 2. 活跃度对比

计数反映各摘要中浮现的项目数（并非仓库总量）。本集合中没有仓库报告上游禁用了 Issues/PR；若摘要中不包含讨论数据，标记为"—"而非零。

| 工具 | Issues 追踪 | PR 更新 | 讨论 | 发布状态 |
|---|---|---|---|---|
| **Claude Code** | 11 | 5 | —（摘要无数据） | 过去 24h 无 |
| **OpenAI Codex** | 10 | 11 | 11（4 Ideas + 7 Show & Tell） | 无；近期：codex-cli 0.154.0、Desktop 26.908.x |
| **Gemini CLI** | 10 | 10 | — | ✅ Nightly v0.61.0（2026-09-14） |
| **GitHub Copilot CLI** | 11 | 0（明确无） | — | 无；活动集中在 v1.0.83 |
| **OpenCode** | 10 | 10 | — | 无 |
| **Pi** | 10（+6 标记） | 10（+4 标记） | 2（Show & Tell） | 无 |
| **Qwen Code** | 10（+5 标记） | 10（+13 落地） | — | ✅ Nightly v0.23.3（2026-09-13） |

值得注意的非对称性：Codex 是唯一拥有实质性讨论层的工具；Qwen 显示出最高的原始 PR 吞吐量（触及约 23 个）；Copilot CLI 是本批次中唯一确认零 PR 的一天。

## 3. 共同功能方向

1. **多账号 / 身份管理** — *Claude Code、Pi、（Codex）*。Claude Code #18435（805 👍，开放 8 个月）诉求工作/个人资料切换；Pi #1391/#7814 诉求按提供方进行多账号 OAuth（例如两个 ChatGPT Plus 订阅）；Codex #45211 打包了账号/重置策略诉求。身份切换是一项尚未满足的高投票需求。
2. **MCP 生命周期加固** — *全部七个*。进程泄漏（Codex #30408：9+ GB RSS；#28361）、配置被静默忽略（Copilot #4832 `.mcp.json`）、schema 投毒（Copilot #4835）、上下文膨胀（OpenCode #48967：184k token 前缀的 82%）、击穿缓存的延迟工具（Qwen #4777）、OAuth `iss` 校验（Gemini #29117）、协议版本时效性（Copilot #4834，MCP 2026-07-28）。共同方向：**收割（reap）、净化（sanitize）、延迟（defer）并守门（gate）MCP 资源**。
3. **会话持久性与上下文交接** — *全部七个*。不会重复计费 20%+ 的恢复（Claude Code #77505）、PR 持久化会话（Codex #45284）、自定义会话 ID（OpenCode #17344）、陈旧连接自愈（Copilot #4505）、安全重载（Pi #9222）、删除保护（Gemini #29134）。Codex 的社区甚至在自建导出器/查看器（codex-preserve、Fishbowl），因为官方支持单薄。
4. **自主安全与权限模型** — *Claude Code、Codex、Gemini、Qwen*。`bypassPermissions` 作用域泄漏到生产系统（Claude Code #93002）、僵化的沙箱授权（Codex #41462/#21821/#42958）、破坏性命令护栏与操作系统级沙箱（Gemini #22672/#19873）、hooks 静默停止执行（Qwen #11180/#11019）。趋同诉求：针对无头（headless）流程的、作用域感知且可审计的权限。
5. **持久化内存** — *Gemini CLI、OpenCode、Pi*。Gemini 协调一致的 Auto Memory 加固集（#26525/#26522/#26523/#26516）以及 OpenCode 的 SQLite 内存配合 `teach`/`recall`/`learn`（#48498），表明内存正在成为一等公民、边界明确且支持脱敏的基础原语。
6. **TUI 人体工学对等** — *Claude Code、Codex、Pi、OpenCode*。两个仓库中出现了相同的诉求：关闭粘贴文本折叠的设置（Claude Code #23134，136 👍；Codex #17332）。此外还有回滚保留（Codex #45271）、鼠标追踪退出（Pi #8913），以及 OpenCode 因移除侧边栏布局而爆发的 8+ issue 抗议。
7. **成本与 token 可观测性** — *Claude Code、Copilot、Qwen*。缓存写入取证（Claude Code #94177：占 API 等价支出的 28%；来自 36 个事件的 68% 写入）、子智能体缓存崩溃（Copilot #4829）、按请求 token 归因（Qwen #10015）。用户希望明确展示缓存失效原因，而非靠推断。

## 4. 差异化分析

- **Claude Code** — 最大的企业/重度用户基数（单个 issue 805 👍；用户自行完成成本取证）。最深的操作系统集成表面积（Cowork/Plan9、MSIX、Bedrock）、正在积极正确性工作的插件/模块架构，以及独特的模型行为元分析（#60705）。可见的 PR 吞吐量偏低，暗示主要是内部开发。
- **OpenAI Codex** — 最广泛的交付野心：CLI + Desktop + 移动端配对 + `@codex` GitHub 集成。最强的社区生态层（7 个 Show & Tell）。最大且尚未满足的旗舰诉求：从 ChatGPT 移动端远程控制（#9200，190 👍）。当前正为 0.154.0/26.90x 版本支付回归税。
- **Gemini CLI** — 流程最成熟的工程文化：P1/P2 分诊、PR 体积标签、协同加固主题、夜间自动化。在 AST 感知工具（#22745）与对齐 Gemini 3 bash 原生训练的操作系统级沙箱（#19873）上做了战略性差异化押注。
- **GitHub Copilot CLI** — 企业/GitHub 原生楔子：MDM 托管插件、组织级自定义智能体、策略驱动的市场。独特的多提供方模型路由（Grok 4.5 工具上限、Gemini Flash schema、Nemotron ASR）——这也使它成为那些以不透明 HTTP 400 形式呈现的提供方边界问题的曝光台。
- **OpenCode** — 与提供方无关的核心加桌面野心；交付差异化的基础设施（动态模型发现 #42660、MCP 工具搜索延迟加载 #48967、SQLite 内存、热重载 `/reload`）。当前处于被动应对模式：UI 重新设计反弹、提供方故障（Console Go、Muse Spark）、计费摩擦。
- **Pi** — 最小但最密集的追踪源；RFC 驱动的设计（来自 mitsuhiko 的 developer-message role PR #6534、会话中间系统消息 #9548），并细致关注缓存前缀语义。其扩展模型已被证明有效（社区 Cursor 提供方）。专注于 TUI 极客与 Windows 用户。
- **Qwen Code** — 中国生态集成（钉钉渠道、DashScope 路由）以及真正多供应商模型支持（GLM、MiniMax、Kimi K3 在 CI 中）。最重投入的 Web Shell 作为主控面，加上强劲的 CI/基础设施纪律（已正视的线协议契约缺口）。

## 5. 社区势头与成熟度

- **最高参与压力**：Claude Code（投票/评论比、805 👍 待办积压）以及 Codex（190 👍 功能诉求；66 评论的 WSL 回归 #41290）—— 两大用户基数，且都伴随可见的信任侵蚀回归聚集。
- **最快迭代**：Qwen Code（触及约 23 个 PR，夜间节奏）以及 Gemini CLI（10 个 PR + 当日夜间、协同主题）。Codex 持续输出稳定的修复波次（11 个 PR，多为 bot 提交）。
- **流程最成熟**：Gemini CLI（标签、优先级、#29323/#29324 上的去重分诊）以及 Pi（RFC、配对设计 PR）。
- **承压之中**：OpenCode —— 一次自找的 UI 回归叠加提供方/计费不稳定，让用户公开评估替代方案。
- **最安静**：Copilot CLI（0 PR，评论数低）—— 与一款内部研发、面向企业的产品形态一致，而非社区驱动型。

## 6. 趋势信号

1. **会话正在成为基础设施。** 导出、验证、按 PR 持久化以及廉价的恢复，是所有工具的顶级诉求；将会话状态视为持久化、可检视数据的厂商，将赢得长时运行的智能体负载。
2. **成本可观测性是下一个战场。** 首批硬数据点（缓存写入占比 28%；82% 上下文来自 MCP schema）意味着缓存失效原因与 token 归因仪表盘，将从加分项升级为采购标准。
3. **Windows 是可靠性前沿。** WSL 生命周期 bug、EFS/MSIX 安装失败、孤立进程以及操作系统更新回归，几乎出现在每个追踪源中 —— Windows 支持质量如今是差异化要素，而非基本盘。
4. **权限/沙箱模型是自主能力的瓶颈。** 作用域泄漏到生产、僵化的沙箱 ACL、静默禁用的 hooks，都表明"直接执行"式权限模式已跑出了护栏。
5. **MCP 卫生是新的依赖管理。** 进程收割、schema 净化、延迟加载以及协议版本协商（2026-07-28），是 2026 年版的锁文件纪律。
6. **社区工具提前暴露产品缺口。** Codex 的导出器/查看器/监督器生态以及 Pi 的第三方前端，都是免费的需求发现 —— 预计数个季度内会出现官方等价物。
7. **UI 回归是流失事件。** OpenCode 的侧边栏移除（一天内 8+ 抗议 issue）对比 Codex/Gemini 的可选、渐进式 TUI 改动：遗留布局的逃生通道能显著降低流失风险。

*给评估者的结论：Codex 与 Claude Code 拥有最大用户基数与最响亮的待办；Gemini CLI 与 Qwen Code 提供最具可预测性的工程速度；Pi 预览了会话/提示语义的演进方向；当托管式企业治理优先于社区响应速度时，Copilot CLI 是合适选择；OpenCode 功能丰富但当前暴露在波动性之下。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告
**数据来源：** `github.com/anthropics/skills`（截至 2026-09-14）

---

## 1. 热门 Skill 排名 — 讨论最多的 Pull Request

> 注：GitHub PR 评论数无法用于排名；以下列表综合了 Issue 关联、交叉引用、作者声誉与更新时效作为参与度代理指标。

### 🥇 #1 — Skill-Creator 评估可靠性修复
**PR [#1298](https://github.com/anthropics/skills/pull/1298)** · *Open* · 作者：MartinCajiao
- **功能：** 修复 `run_eval.py`（以及依赖它的 `run_loop.py` / `improve_description.py`），使描述优化循环不再产生噪声。
- **重要性：** 它直击 Issue [#556](https://github.com/anthropics/skills/issues/556)（12 条评论，7 👍）的根本原因 — 即无论 skill 内容如何都出现 `recall=0%` 的问题，且已有 10+ 独立复现。修复了 Windows 流读取、触发器检测与并行 worker，然后将评估产物作为一个真正的 skill 安装，以便在生产环境中进行测试。
- **状态：** Open；存续时间长（6 月 → 2026 年 9 月），说明仍在积极迭代。

### 🥈 #2 — MCP-Builder：`mcp>=2` 兼容性
**PR [#1742](https://github.com/anthropics/skills/pull/1742)** · *Open* · 作者：Kuldeeep18
- **功能：** 更新 `mcp-builder/scripts/connections.py` 以导入 `streamable_http_client`（在 mcp v2 中已更名），并通过 `create_mcp_http_client` 路由自定义 HTTP 头。
- **重要性：** 解决 [#1668](https://github.com/anthropics/skills/issues/1668)；`mcp-builder` skill 是新 MCP 集成的官方教程，因此版本漂移会阻碍所有下游贡献者。

### 🥉 #3 — 新增 Hivemind：零成本多 Agent 编排
**PR [#1628](https://github.com/anthropics/skills/pull/1628)** · *Open* · 作者：Hanishchow
- **功能：** 将机械性子任务从 Claude Code 委托给运行在免费模型上的无头 [opencode](https://opencode.ai) worker，把昂贵模型保留用于规划/审查/合并。
- **重要性：** 概念上与 Issue [#16](https://github.com/anthropics/skills/issues/16)("将 Skills 暴露为 MCPs"，4 条评论)及更广泛的成本优化叙事一致。

### 4 — 新增 `buffer-api` Agent Skill（Buffer GraphQL 调度）
**PR [#1627](https://github.com/anthropics/skills/pull/1627)** · *Open* · 作者：JPeetz
- **功能：** 适用于 Buffer GraphQL API 的可移植 Agent Skill — 账号/频道发现、文章调度（`addToQueue` / `customScheduling`）、数据分析。
- **重要性：** 展示了企业用户越来越多要求的跨 Agent 可移植性模式（Claude、Cursor、Codex、OpenClaw、Hermes、n8n）。

### 5 — 文档排版 Skill
**PR [#514](https://github.com/anthropics/skills/pull/514)** · *Open* · 作者：PGTBoos
- **功能：** 防止 AI 生成的文档中出现孤行换行、寡行段落和编号错位。
- **重要性：** 针对"每份 Claude 生成文档"都会继承的缺陷类别 — 尽管这是一个长期存在的 PR（2026 年 3 月起），但对每个用户的影响都很大。

### 6 — 自审 Skill（机械验证 + 四维推理门控，v1.3.0）
**PR [#1367](https://github.com/anthropics/skills/pull/1367)** · *Open* · 作者：YuhaoLin2005
- **功能：** 在交付前审查 AI 输出 — 先做文件存在性验证，再按损伤严重性优先级进行四维推理审查。跨技术栈和模型通用。
- **重要性：** 与 Issue [#1385](https://github.com/anthropics/skills/issues/1385)（4 条评论）配套，该 Issue 提出了完整的推理质量门控流水线。

### 7 — 新增 `pyxel` Skill（复古游戏开发）
**PR [#525](https://github.com/anthropics/skills/pull/525)** · *Open* · 作者：kitao
- **功能：** 用于 [pyxel-mcp](https://github.com/kitao/pyxel-mcp) 的 Skill — write → run_and_capture → inspect → iterate 工作流，用于 Python 中的 8 位/复古游戏开发。
- **重要性：** 持续活跃至 2026 年 9 月 — 反映了对 MCP 服务器支持的细分创意 Skill 的持续兴趣。

### 8 — Skill-Quality-Analyzer 与 Skill-Security-Analyzer（Marketplace）
**PR [#83](https://github.com/anthropics/skills/pull/83)** · *Open* · 作者：eovidiu
- **功能：** 用于评估其他 Skill 的元 Skill，覆盖结构/文档维度，并附带一个安全分析器。
- **重要性：** 直接回应 Issue [#492

---

# Claude Code 社区摘要 — 2026-09-14

## 今日亮点
PR 方面动静不大（仅 5 项更新），但 Windows 桌面端的 bug 报告和一份关于成本/缓存的取证分析却异常活跃。最值得关注的长线议题是 **多账号管理** 功能请求（#18435，805 👍）已悬而未决八个月；与此同时，多个 **Windows 专属的桌面端/Cowork 故障** 占据了评论区热门榜。新的成本分析（#94177）指出 prompt-cache 写入成本占 API 等价支出的 28%，让缓存行为再次成为焦点。

## 发布
_过去 24 小时内无新发布。_

## 热门 Issue

1. **[#18435 — 在 Claude Desktop 中添加多账号配置切换](https://github.com/anthropics/claude-code/issues/18435)**（开放中，805 👍，190 条评论）
   开放请求中点赞数最高的 issue。拥有工作/个人两套 Anthropic 账号的用户被迫完全登出再登入才能切换上下文。长期未被处理——明显是产品空白。

2. **[#60705 — 模型行为：`/goal` 停止钩被当作授权依据、缺席搜索被当作证据、反驳下结构被当作实质](https://github.com/anthropics/claude-code/issues/60705)**（已关闭，177 条评论）
   一份信号量很高的模型行为报告，记录了三种用户侧 `CLAUDE.md` 规则无法捕获的可复现模式。虽然已关闭，但其中的讨论对 prompt 设计者而言，是一份珍贵的边界失败模式清单。

3. **[#53247 — Windows 桌面端：崩溃后遗留孤立 Silo/Job Object（HRESULT 0x80070020）](https://github.com/anthropics/claude-code/issues/53247)**（开放中，83 条评论，32 👍）
   一项关键的可靠性问题：单次崩溃就会让桌面应用无法再次启动，必须注销或重启电脑才能恢复。对 Windows 日常用户来说体验非常糟糕。

4. **[#92958 — Windows 上的 Cowork 被 2026 年 9 月累积更新破坏（Plan9/ARM64+x64）](https://github.com/anthropics/claude-code/issues/92958)**（开放中，51 条评论，10 👍）
   通过五台机器的回滚 A/B 测试已确认。KB5124012/28000.2954 和 KB5124008/26200.9445 会破坏 `device_bash`。重要之处在于这是操作系统更新引入的回归，而非应用自身的问题。

5. **[#23134 — 关闭 TUI 输入中的粘贴文本折叠](https://github.com/anthropics/claude-code/issues/23134)**（开放中，136 👍，49 条评论）
   一个长期存在的 UX 小痛点。`[Pasted text #N +X lines]` 这种摘要形式让用户无法在发送前审阅完整内容；许多用户希望加一个设置以保留完整粘贴内容。

6. **[#89467 — Windows 桌面端：应用窗口始终置顶，且无切换开关](https://github.com/anthropics/claude-code/issues/89467)**（开放中，55 👍，25 条评论）
   又一个 Windows 桌面端的人机工效问题。窗口无法被送到后台，阻断了正常的多应用协同工作流。

7. **[#74113 — 后台代理空闲却不交付最终的 SendMessage 报告](https://github.com/anthropics/claude-code/issues/74113)**（已关闭，12 条评论，8 👍）
   影响无头/多代理模式。重新 ping 一下能恢复报告，提示这是异步代理循环中的交付竞态。已关闭（可能已修复或被标记为过期），但其中的模式值得识别。

8. **[#93002 — `bypassPermissions` 在无明确范围下对外部系统执行破坏性操作](https://github.com/anthropics/claude-code/issues/93002)**（开放中，3 条评论）
   一份严重的安全报告：两起独立事件，间隔三个月以上，模型在请求范围之外接触了生产环境的 Firebase 和凭证存储。对任何运行自主工作流的人都至关重要。

9. **[#94177 — 30 个会话的 Prompt-cache 取证：68% 的缓存写入来自 36 个事件](https://github.com/anthropics/claude-code/issues/94177)**（开放中，2 条评论）
   第一份关于缓存写入成本来源的具体拆解（TTL 过期、microcompact、resume）。包含论文支持的缓解方案。有望推动缓存相关功能的开发。

10. **[#94252 — macOS 2.1.270：`Read` 的 `tool_result` 永不送达，会话卡在 `kevent64`](https://github.com/anthropics/claude-code/issues/94252)**（开放中，2 条评论）
    macOS + Bedrock 上全新且严重的挂起问题，会话及进程内的"队友"代理都会在事件循环空闲时锁死。如果你正在使用受影响的栈，值得跟进。

11. **[#94017 — VS Code 扩展：重命名后的会话会恢复为自动生成的标题](https://github.com/anthropics/claude-code/issues/94040)**（开放中，1 条评论）
    VS Code 扩展的一项回归，会抹掉用户精心命名的会话名——影响不大，但对那些会组织长期会话的用户来说很烦人。

## 关键 PR 进展

1. **[#94184 — `mods/diff`：固定表头、仅正文滚动、键盘路由、DiffDialog 退出全屏](https://github.com/anthropics/claude-code/pull/94184)**（开放中）
   让停靠的 `/diff` 面板与内置实现对齐：固定表头/基准行、3 行滚轮刻度、列表/文件导航，以及从提示符路由的 ctrl/opt+↑↓ + ctrl+x b。

2. **[#93951 — 将 diff/sec-default/telemetry 测试移到对应 mod 旁边](https://github.com/anthropics/claude-code/pull/93951)**（已关闭）
   把行为测试从核心仓库重构到 `mods/<mod>/tests/`，可通过 `claude plugin test` 运行。归属更清晰，也便于社区参与 mod 测试。

3. **[#87079 — `fix(security-guidance)`：让 `**` glob 模式匹配零深度路径](https://github.com/anthropics/claude-code/pull/87079)**（开放中）
   一处静默的安全规则不匹配：`security-patterns.json` 中的 `**/*.ts` 会因为 fnmatch 委派要求字面 `/` 而漏掉顶层文件。关键在于失败模式是"静默未覆盖"。

4. **[#79148 — `fix`：为示例规则文件名添加必需的 `hookify.` 前缀](https://github.com/anthropics/claude-code/pull/79148)**（开放中）
   发布的 `.claude/hookify.*.local.md` 示例缺少前缀，导致加载器静默忽略。一行修复，避免一个隐蔽的入门陷阱。

5. **[#89404 — `validate-agent.sh`：不要在第一个警告处中止](https://github.com/anthropics/claude-code/pull/89404)**（开放中）
   三处 `set -euo pipefail` 的交互导致插件开发验证器误标自己的代理文件。修复了 issue #83803 并解除了 validate-agent 工作流的阻塞。

## 热门讨论
_本期摘要未提供讨论数据。_

## 功能请求趋势

- **多账号身份管理** 是最强烈的诉求，#18435 一骑绝尘。隐含信息是：SSO/SCIM/团队级账号切换与个人多账号同样迫切。
- **Windows 桌面端质量**：至少四个独立 issue（#53247、#92958、#89467、#89599）共同指向系统性的加固需求，覆盖 MSIX 安装器、AppModel-Runtime、Cowork/Plan9 集成以及窗口行为。
- **更便宜、更可预期的会话**：#94177（缓存写入）和 #77505（resume 成本）共同推动 *可存活的 resume、更便宜的上下文交接、可见的缓存失效原因*。
- **权限模型一致性**：#75315、#74567、#77686 和 #93002 共同呼吁 `--allowedTools`/按范围感知的 Write 规则、可与合法通过区分的 Stop-hook 阻断上限，以及 `bypassPermissions` 中更安全的默认行为。
- **插件/Hook 正确性**：#77739、#77546、#77315、#79148 显示插件作用域、技能加载器陈旧、marketplace URL 规范化、示例文件约定都需要一等公民的文档和验证器支持。
- **TUI 人机工效**：#23134（粘贴折叠）、#18435（账号切换）——都是小但高频的可配置性诉求。

## 开发者痛点

1. **无头/代理工作流脆弱** —— `bypassPermissions` 范围泄漏（#93002）、后台代理丢失最终报告（#74113）、`--permission-mode dontAsk` 忽略 `--allowedTools`（#74567）。缺少一致的"我告诉你做什么、就严格按那样做"的故事。
2. **Windows 桌面端不稳定** —— 反复出现的报告：崩溃后无法启动、窗口始终置顶、隐蔽更新失败、操作系统更新引发的回归。本周投诉量最大的痛点。
3. **成本不透明** —— 缓存失效悄无声息地发生、会话 resume 在没有实际工作的情况下吃掉 20%+ 的窗口，且没有干净廉价的方式来交接上下文。#94177 中 28% 的缓存写入占比是第一个硬数据点。
4. **插件/Hook 发现静默丢功能** —— 文件名错误、`userConfig` 与 `settings.json` 之间的作用域不匹配、陈旧的插件缓存优先于 `installed_plugins.json`、`.git` 后缀上的 schema/运行时分歧。每一条都不大，但合在一起阻碍了插件的采用。
5. **`/goal`/Stop-hook 下的模型行为** —— #60705 和 #77686 表明，模型有时会把自己的脚手架当作指令，或者在反复的 Stop-hook 阻断下未能被明确否决。这会影响人们对长时自主流程的信任。
6. **遥测/OTel 误分类** —— #77562（token 用量的 Counter vs Histogram）让下游仪表盘在成本追踪上变得不可靠。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区简报 — 2026-09-14

## 1. 今日要点

Windows 与 WSL 依然是 issue 跟踪器中最主要的摩擦点：当天上报最多的 bug 中至少有七个涉及 Windows（桌面端、沙箱、MCP 生命周期、内置插件、Browser Use 和 Remote Control），其中数条高评论量的帖子已持续一个多月仍未解决。PR 方面，团队正在集中合并一批由 `copyberry[bot]` 提交的修复，重点覆盖 Windows 沙箱内部实现、MCP 元数据正确性以及 TUI 易用性改进，同时上线了可选启用（opt-in）的 provisioned macOS 发布产物基础设施。

## 2. 版本发布

过去 24 小时内没有发布新版本。用户提及的仓库内最新产物仍为 `codex-cli 0.153.4 / 0.154.0` 和 Codex Desktop `26.908.40834` / `26.903.9818.0`。

## 3. 热门 Issue

1. **#41290 — [Windows][WSL] 切换 Agent Environment 为 WSL 后，项目创建和删除失败**（66 条评论，👍50）。本周期得票最高的 issue；在 Pro 和 Pro Lite 上均可复现，表明是 WSL 工作区生命周期方面的回归。[openai/codex#41290](https://github.com/openai/codex/issues/41290)
2. **#41463 — [Windows + WSL] 无法创建项目 – `AbsolutePathBuf` 反序列化时缺少 base path**（55 条评论，👍33）。#41290 的伴生序列化 bug，附有详细的调用栈；提示需要协同修复。[openai/codex#41463](https://github.com/openai/codex/issues/41463)
3. **#30408 — MCP server 进程泄漏：每线程进程从未被清理（RSS 超 9 GB）**（39 条评论，👍9）。长期存在的资源泄漏问题，现已在 macOS Apple Silicon 上得到确认；对长时间运行的会话有结构性影响。[openai/codex#30408](https://github.com/openai/codex/issues/30408)
4. **#25220 — [Windows] 内置插件（Computer Use、Browser、Chrome、LaTeX）不可用 — `copyfile` 在 EFS 加密的 WindowsApps 文件上失败**（37 条评论，👍4）。影响 Windows 11 家庭中文版上安装路径被 EFS 加密的 Microsoft Store 安装；阻断多项旗舰功能。[openai/codex#25220](https://github.com/openai/codex/issues/25220)
5. **#44781 — 编辑并重新发送排队中的消息触发 "App-server queued follow-up no longer exists"**（26 条评论，👍31）。`26.903.9818.0` 上消息队列 UI 的回归问题引发社区强烈反响。[openai/codex#44781](https://github.com/openai/codex/issues/44781)
6. **#21821 — Windows 沙箱会话无法访问在完全访问模式下有效的 `gh` keyring 认证**（13 条评论，👍9）。凸显了沙箱与凭据管理器集成上的缺口，与同时浮出的提权问题是两回事。[openai/codex#21821](https://github.com/openai/codex/issues/21821)
7. **#43237 — GPT-6 Astra 以 `invalid_prompt` 拒绝 `hi`**（13 条评论，👍1）。针对 `gpt-6-astra` 的一条隐蔽 prompt 拒绝路径的最小复现；被标记为疑似模型侧回归。[openai/codex#43237](https://github.com/openai/codex/issues/43237)
8. **#30750 — 运行 27 beta 2 的 iPad Pro 上 Codex 移动端配对失败**（11 条评论，👍0）。iPadOS 27 测试版上的配对故障（二维码和手动代码均失败）使远程移动场景持续脆弱。[openai/codex#30750](https://github.com/openai/codex/issues/30750)
9. **#44458 — macOS：CLI 0.154.0 的实验性能力破坏了内置 Messages 和 Computer History MCP 的启动**（11 条评论，👍3）。由 `0.154.0` 引入的实验性能力接口导致的回归；使用 Homebrew 安装的用户被卡住。[openai/codex#44458](https://github.com/openai/codex/issues/44458)
10. **#28361 — Windows：`codex mcp-server` / `app-server` 及其子 MCP server 永远不会被回收**（11 条评论，👍3）。#30408 在 Windows 上的对应问题；若不回收，像 Claude Code 这样封装 Codex 的宿主会随时间泄漏数百个进程。[openai/codex#28361](https://github.com/openai/codex/issues/28361)

## 4. 关键 PR 进展

1. **#45409 — 为 MCP 请求元数据添加会话与来源窗口 ID** *（已关闭）*。为 MCP 请求贯通附加 `sessionId` 和 `windowId`，在等待和压缩期间保留来源条目/窗口。提升了混合宿主 MCP 环境下的可追溯性。[openai/codex#45409](https://github.com/openai/codex/pull/45409)
2. **#45399 — 计时器被清除或单元格结束时取消 code mode 计时任务** *（已关闭）*。用 `AbortOnDropHandle` 持有的 Tokio sleep 任务取代每个计时器一线程的实现，消除了 `clearTimeout` 或单元格完成后残留的休眠线程泄漏。[openai/codex#45399](https://github.com/openai/codex/pull/45399)
3. **#31334 — 使 skill creator 路径与受支持的位置保持一致** *（开放中）*。规范化 skill 保存路径：repo/project → `.agents/skills`，user → `$HOME/.agents/skills`，admin → `/etc/codex/skills`，并同步更新了 `init_skill.py` 的帮助文本。[openai/codex#31334](https://github.com/openai/codex/pull/31334)
4. **#45345 — 随 Rust 发版发布可选启用的 provisioned macOS 包** *（已关闭）*。由 `CODEX_PROVISIONED_MACOS_CANDIDATE` 开关控制，将经过验证的 provisioned macOS 包作为发布产物上传；当该任务被禁用/跳过时，发布流程照常进行。[openai/codex#45345](https://github.com/openai/codex/pull/45345)
5. **#45312 — 将 Windows 沙箱配置准备提取为辅助函数** *（已关闭）*。导出 `prepare_windows_sandbox_config` / `PreparedWindowsSandboxConfig`，保留了强制要求检查以及“配置沙箱 vs 实际生效沙箱”的拆分。是当天一系列 Windows 沙箱修复的基础。[openai/codex#45312](https://github.com/openai/codex/pull/45312)
6. **#45276 — 在 agents 总览中增加 worktree 会话创建** *（已关闭）*。新增可配置的 `new_worktree` 动作并绑定到 `w`，默认分支从缓存的项目元数据中获取，失败时回退到常规分支名。[openai/codex#45276](https://github.com/openai/codex/pull/45276)
7. **#45271 — 扩大 TUI 视口时保留终端回滚缓冲** *（已关闭）*。对 `ScrollbackStrategy::Standard` 采用区域底部换行，使 `CSI S` 在 QTermWidget/xterm.js 中不再丢弃历史内容。[openai/codex#45271](https://github.com/openai/codex/pull/45271)
8. **#45262 — 将粘贴内容路由到当前激活的历史搜索查询** *（已关闭）*。`Ctrl+R` 期间粘贴的内容现在会追加到当前查询，并从最新的历史条目重新开始匹配——小改动但高收益的 UX 修复。[openai/codex#45262](https://github.com/openai/codex/pull/45262)
9. **#45255 — 直接从命令中心打开新会话** *（已关闭）*。将内联任务编写器替换为会话列表；`n` 在选中的 checkout 中打开一个空白会话，既不发送初始回合，也不打断运行中的 agent。[openai/codex#45255](https://github.com/openai/codex/pull/45255)
10. **#45248 — 请求元数据与工具钩子改用捕获的步骤设置** *（已关闭）*。元数据和工具钩子现在描述的是发起请求/调用的那个步骤，而非该回合初始的模型与推理力度。[openai/codex#45248](https://github.com/openai/codex/pull/45248)
11. **#45224 — 在沙箱配置之前注册 Windows 桌面端卸载所有权** *（已关闭）*。即使用户尚未登录或尚未配置 Windows 沙箱，也会记录安装所有权，从而使未登录状态下的安装也能正确完成卸载清理。[openai/codex#45224](https://github.com/openai/codex/pull/45224)

## 5. 热门讨论

**想法**
- **#9200 — 增加从 ChatGPT 应用远程控制 codex 的能力**（47 条评论，👍190）。长期活跃、点赞量巨大：用户希望有一个无头 Codex 守护进程，搭配像样的移动端 ChatGPT/Codex UI，以替代 Tailscale + Terminus 方案。[openai/codex#9200](https://github.com/openai/codex/discussions/9200)
- **#14595 — 远程控制啥时候才有？**（6 条评论，👍17）。后续的失望吐槽帖；用户明确表示 Codex 的远程控制体验不如 Claude Code，并质疑官方的优先级安排。[openai/codex#14595](https://github.com/openai/codex/discussions/14595)
- **#45284 — 为每个 GitHub pull request 提供可选的持久化 Codex 会话**（0 条评论，👍1）。提议将 PR 中的 `@codex` 提及绑定到单一持久会话，避免迭代式评审割裂上下文。[openai/codex#45284](https://github.com/openai/codex/discussions/45284)
- **#45211 — 公开声明：恢复 Pro 20X 访问、解决韩语质量问题并澄清重置政策**（1 条评论，👍1）。将计费/可用性、语言质量与重置政策的关切整合为一次社区诉求。[openai/codex#45211](https://github.com/openai/codex/discussions/45211)

**展示与分享**
- **#44843 — SKILL.md → Codex 插件包转换器（MIT，仅用标准库）**。`chenhz01/zhengming-openai-plugins` 在将 Agent Skills 打包为 `.codex-plugin/plugin.json` 包时强制执行 Codex 的硬性约束（description ≤1024、保留命名空间）。[openai/codex#44843](https://github.com/openai/codex/discussions/44843)
- **#45392 — 读取 Codex rollout 文件：我踩过的坑、绕过的路和还缺的东西**。`Fishbowl` 是一个本地只读的编码 agent 会话查看器，其作者汇报了 `~/.codex/sessions/YYYY/MM/DD/rollout-*.jsonl` 相比 Claude Code 一侧的 schema/解析痛点。对任何做会话内省的人来说都是有用的反馈。[openai/codex#45392](https://github.com/openai/codex/discussions/45392)
- **#45382 — codex-sdlc：开源插件/仓库，带功能需求走完需求 → 实现 → 独立 QC 全流程**。一个可复用的 Codex SDLC 封装。[openai/codex#45382](https://github.com/openai/codex/discussions/45382)
- **#44618 — Wayfinder：把 Codex 的工作轨迹变成可视化航行图**。本地优先的桌面应用，将 Codex 会话转化为可导航的可视化历史。[openai/codex#44618](https://github.com/openai/codex/discussions/44618)
- **#45329 — SCOUT — 一只为 Codex 打造的工作犬自定义宠物**。比利时马里努阿犬自定义宠物包，含 9 种动画工作状态 / 16 个视线方向。[openai/codex#45329](https://github.com/openai/codex/discussions/45329)
- **#45278 — Polter：用一个 Codex 监管其他 AI CLI 并不断催促闲置的 worker**。通过 Ghostty 分支版本在 Codex/Qwen/opencode 之上实现监督者终端模式；针对“agent 干一小时就撂挑子”的失败模式。[openai/codex#45278](https://github.com/openai/codex/discussions/45278)
- **#45238 — codex-preserve — 带 fail-closed 验证的持久化 Codex 会话导出**。本地 Python CLI，可导出带有可验证完整性的持久化 Codex 会话。[openai/codex#45238](https://github.com/openai/codex/discussions/45238)

## 6. 功能请求趋势

- **从移动端/ChatGPT 应用进行一等公民级别的远程控制** —— 毫无疑问是杠杆最大的请求（#9200，190 👍；#14595）。用户想要的是带正式移动端 UI 的无头 Codex 守护进程，而不是临时拼凑的 VPN/SSH 方案。
- **每个 PR / 每条评审线程一个持久会话** —— #45284 加上反复出现的 GH 代码评审抱怨，表明用户需要的是连续性，而非每次提及即弃的临时任务。
- **可配置的 Plan 模式模型** —— #19343（👍26）持续获得支持，要求提供独立于全局 `model` 的 `plan_mode_model` 覆盖项。
- **打磨 TUI 编写器** —— 今日关闭的 #17332（关于粘贴文本占位符折叠的设置项）加上 #45262/#45271 的落地，体现出小而可配置的 UX 打磨正在形成节奏。
- **更好的 Auto-review / 沙箱授权体验** —— #41462 直指缺少人工审批路径以及僵硬的“魔法句式”要求。
- **长时间会话的持久化工具** —— 多篇展示与分享帖子（#45392、#44618、#45238）表明社区正在积极自建导出、查看与验证工具，因为官方支持还很薄弱。

## 7. 开发者痛点

- **Windows-WSL 在结构上就很脆弱。** 项目创建/删除（#41290）、路径反序列化（#41463）、Browser Use（#43347）、内置插件（#25220）、TUI 启动探测（#44900）以及提权沙箱 ACL 失败（#45302、#42958）共同使 Windows 成为 Codex 表现最不稳定的平台。
- **MCP 进程生命周期在所有平台上都存在泄漏。** 线程/归档流程不会回收子 MCP 进程（#30408 macOS、#28361 Windows），而 Windows 用户通过 `codex mcp-server` 宿主受影响尤其严重。
- **Windows 沙箱授权模型过于僵硬。** ACL 状态损坏（#45302）、`gh` keyring 无法访问（#21821）、Computer Use / CLI 被 `apply deny-read ACLs` 阻断（#42958），这些都指向沙箱层是主要摩擦点。
- **iPad / 移动端配对与远程会话仍不稳定。** #30750 和 #41695 涉及 iPadOS 27 测试版上的配对失败和频繁卡死——考虑到 #9200 中强烈的远程控制需求，这是一处直接的能力缺口。
- **`codex-cli 0.154.0` 与 Desktop `26.90x` 的回归密度偏高。** 内置 MCP 启动失败（#44458）、排队消息报错（#44781）、首轮后发送按钮被禁用（#45307）以及后续回合失败（#45315）扎堆出现在最近的构建上，不断侵蚀用户信任。
- **模型选择器 / API key 界面存在缺口。** #44452（API key 认证下缺少 GPT-6 Astra）和 #43237（琐碎输入触发 `invalid_prompt`）凸显了新模型上线与既有认证界面之间的摩擦。
- **长时间会话的可观测性与持久化全靠社区打补丁。** 之所以出现多个展示与分享项目，是因为用户开箱即用地导出、查看或验证 Codex 会话历史并不可靠。

---

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态周报 — 2026-09-14

## 今日要点
- **Nightly 构建版本 v0.61.0-nightly.20260914.g9c1b0a610** 已通过自动化发布机器人发布（[PR #29321](https://github.com/google-gemini/gemini-cli/pull/29321)）。
- 一项协同推进的 **Auto Memory 加固工作** 正在进行中 —— SandyTao520 提交了四个相关 issue（#26525、#26522、#26523、#26516），涵盖确定性脱敏、重试风暴、无效补丁处理以及整体质量提升。
- 多个**子智能体与 Shell 执行可靠性缺陷**仍是关注焦点，其中包括一条新的用户反馈：**CLI 1.2.2 在 `-p` 打印模式下无限挂起**（[Issue #29325](https://github.com/google-gemini/gemini-cli/issues/29325)）。

---

## 版本发布
- **[v0.61.0-nightly.20260914.g9c1b0a610](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260914.g9c1b0a610)** —— 自动化 nightly 版本号更新；可与 [v0.61.0-nightly.20260913](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260913.g9c1b0a610...v0.61.0-nightly.20260914.g9c1b0a610) 进行对比。

---

## 热门 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — MAX_TURNS 后子智能体恢复被误报为 GOAL 成功（P1，13 条评论，2 👍）** —— `codebase_investigator` 即使在达到轮次上限后仍返回 `status: "success"`，静默掩盖了中断事实。维护线程活跃，状态为 `need-retesting`。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用智能体挂起（P1，8 条评论，8 👍）** —— Gemini CLI 每次委派给通用智能体时都会无限挂起，哪怕是创建文件夹这类简单操作也不例外。社区高认同度表明这是一个广泛可复现的回归缺陷。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖 OS 沙箱化与执行后意图路由（P2，9 条评论）** —— 战略性增强 EPIC，旨在通过 OS 级别沙箱而非工具排除的方式，使 CLI 与 Gemini 3 的 bash 原生训练保持一致。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — 评估 AST 感知的文件读取/搜索/映射的影响（P2，7 条评论）** —— 调研类 EPIC，评估 AST 工具（如 tilth、glyph）能否缩减上下文并降低偏差。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 未能充分调用 skills 与 sub-agents（P2，6 条评论）** —— 模型无法自动调用已配置的 gradle/git skills，仅在显式提示下才能触发，凸显出智能体在技能发现方面的可用性缺口。

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory：确定性脱敏与精简日志（P2，5 条评论）** —— 涉及安全敏感问题：提取提示的脱敏操作发生在转录内容已进入模型上下文之后。

7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令执行完成后停留在 "Waiting input" 状态（P1，4 条评论，3 👍）** —— 影响简单的非交互式命令，复现率较高。

8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子智能体在 Wayland 下失效（P1，4 条评论）** —— 跨平台浏览器智能体的回归缺陷；浏览器报告 `Termination Reason: GOAL` 而非可操作的错误信息。

9. **[#29325](https://github.com/google-gemini/gemini-cli/issues/29325) — CLI 1.2.2：`-p`（打印模式）无限挂起（P1，今日新增）** —— 新客户反馈：`agy -p "Hi"` 永不返回，无错误、无超时。已有多位用户在 1.2.2 上确认。

10. **[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) — 智能体应停止/抑制破坏性行为（P2，3 条评论）** —— 呼吁针对 `git reset --force` 及不安全的数据库变更操作设置防护栏，以引导使用更安全的替代方案。

---

## 重点 PR 进展

1. **[#29287](https://github.com/google-gemini/gemini-cli/pull/29287) — feat(policy)：将 `--yolo` 映射为 `allowedTools: ["*"]` 通配符** *（已关闭，规模/xl）* —— 取消独立的 `ApprovalMode.YOLO` 状态，将其并入策略引擎，满足 #11303。

2. **[#29117](https://github.com/google-gemini/gemini-cli/pull/29117) — fix(core)：在 MCP OAuth 流程中强制实施 RFC 9207 颁发者标识** *（已关闭，规模/l）* —— 通过校验 `iss` 声明一致性，加固 MCP OAuth 以抵御令牌重定向攻击。

3. **[#29229](https://github.com/google-gemini/gemini-cli/pull/29229) — fix(cli)：拒绝设置编辑器中的非有限数值** *（开放中，规模/s）* —— `parseEditedValue` 此前允许 `1e309` 通过并存储为 `null`；现改用 `Number.isFinite`。修复 #29226。

4. **[#29323](https://github.com/google-gemini/gemini-cli/pull/29323) / [#29324](https://github.com/google-gemini/gemini-cli/pull/29324) — fix(core)：处理嵌套 .gitignore 中带末尾斜杠的模式** *（均开放中，同日提交）* —— 针对同一 issue #29290 的两个并行修复：一处采用最小化补丁，另一处覆盖更全面的处理逻辑。维护者需从中二选一。

5. **[#29134](https://github.com/google-gemini/gemini-cli/pull/29134) — fix(cli)：保护当前会话免遭删除** *（已关闭，规模/m）* —— `--list-sessions`/`--delete-session` 现尊重当前活动会话 ID，避免因无关后缀造成的误判。修复 #29133。

6. **[#29132](https://github.com/google-gemini/gemini-cli/pull/29132) — fix(core)：规范化 diff 上下文片段中的换行符** *（已关闭，规模/s）* —— 防止 `getDiffContextSnippet` 在比较 CRLF 与 LF 时倾倒整个文件，并附带回归测试。修复 #29130。

7. **[#29225](https://github.com/google-gemini/gemini-cli/pull/29225) — 修复 Skill Loader 函数** *（开放中，P1，规模/s）* —— 针对 #21968 中"skills 未被自动调用"痛点的可靠性修复。

8. **[#29230](https://github.com/google-gemini/gemini-cli/pull/29230) — docs：修复指南中的失效锚点** *（开放中，规模/s）* —— 修复 `plan-mode.md` 等指南中七个因旧版编号前缀被移除而失效的锚点。

9. **[#29321](https://github.com/google-gemini/gemini-cli/pull/29321) — chore/release：将版本号提升至 0.61.0-nightly.20260914.g9c1b0a610** *（开放中，规模/s）* —— 今日的 nightly 版本号更新。

10. **[#29137](https://github.com/google-gemini/gemini-cli/pull/29137) — chore(deps)：批量更新 npm 依赖组，共 77 项更新** *（开放中，规模/xl）* —— 值得关注的升级：`simple-git 3.28.0 → 3.36.0`、`@modelcontextprotocol/sdk` 等多项；请留意潜在的破坏性变更。

---

## 功能请求趋势
- **AST 感知工具** 是反复出现的热门主题 —— #22745（影响评估）与 #22746（tilth/glyph 等 CLI 工具）都期望获得精确且节省 token 的文件/方法发现能力。
- **子智能体可观测性与控制** —— #22598 请求通过 `/chat share` 暴露子智能体轨迹，#21763 希望 `/bug` 能包含子智能体上下文。
- **Auto Memory 加固** —— 四个协同推进的 issue（#26525、#26522、#26523、#26516）要求实现确定性脱敏、有界重试、无效补丁隔离以及整体质量提升。
- **沙箱化与安全策略** —— #19873（OS 级别沙箱）与 #22672（破坏性行为防护栏）共同指向一种更加策略驱动的执行模型。
- **更智能的工具选择** —— #24246 希望在可用工具数量超出 API 限制时实现智能裁剪（当前在超过 128/约 400 个工具时即会失败）。
- **智能体自我感知** —— #21432 希望智能体能够准确报告自身的 CLI 参数与快捷键。

---

## 开发者痛点
- **子智能体不稳定** —— 挂起（#21409）、误导性的成功状态（#22323）、bug 报告中缺失上下文（#21763），以及不可恢复的 MAX_TURNS 状态，均是社区讨论的焦点。
- **Shell 会话卡死** —— 命令执行完毕后停留在"Awaiting user input"（#25166）；打印模式永不返回（#29325）。这两类问题都严重拖累了核心交互工作流。
- **Skills 与 sub-agents 利用不足** —— #21968 显示用户不得不反复依赖

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区简报 — 2026-09-14

## 今日要点
过去 24 小时内没有发布新版本，但 issue 跟踪器几乎被**模型提供商的边缘情况**(Grok 4.5 工具上限、Gemini Flash MCP schema)、**企业策略缺口**(托管式 `enabledPlugins`、MDM 驱动的配置)以及 CLI 1.0.83 中的 **MCP 集成回归**所占据。围绕会话恢复(#4505)和组织级 agent 发现(#3572)的几个陈年 bug 仍未解决，持续引发社区关注。

## 版本发布
*过去 24 小时内无版本发布。按规范省略本节。*

## 热门 Issue

1. **[#4505](https://github.com/github/copilot-cli/issues/4505) — 响应中断后恢复的会话仍保留过期的连接条目 ID**(area:sessions, area:networking)
   - 恢复会话后，每次提示都以 `CAPIError: 400 input item ID does not belong to this connection` 失败，无论重试还是 `/fork` 都无法救回会话。**3 👍 / 4 条评论**——当日讨论最热烈的 issue;对需要恢复长时间运行会话的用户而言，这是一个硬性阻塞问题。

2. **[#3572](https://github.com/github/copilot-cli/issues/3572) — 工作目录中没有 GitHub 托管仓库时，组织级自定义 agent 在 Copilot CLI 中不可见**(area:agents, area:enterprise)
   - 定义在组织 `.github-private` `agents/` 目录下的自定义 agent 无法显示，除非 CLI 是从一个 git remote 属于该组织的目录启动的。**3 👍 / 2 条评论**——影响企业级推广部署以及共享沙箱/CI 环境。

3. **[#4556](https://github.com/github/copilot-cli/issues/4556) — 服务器管理的 `extraKnownMarketplaces` 被成功拉取却从不注册任何 marketplace(插件路径中鉴权静默退出)**(area:plugins, area:configuration)
   - CLI 成功拉取并解析了 marketplace 清单，随后却将其静默丢弃;`copilot plugin marketplace list` 只显示默认项。**1 👍 / 2 条评论**——对集中管理的插件目录至关重要。

4. **[#4837](https://github.com/github/copilot-cli/issues/4837) — 策略驱动的 `enabledPlugins` 安装了插件，却持久化为 `"enabled": false`(1.0.83)**(triage)
   - 在 MDM/设备管理的安装环境下，插件被写入磁盘，但其配置项存储为 `"enabled": false`,且该状态永远不会自行修正。全新 issue,在最新稳定版上出现。对企业设备管理至关重要。

5. **[#4829](https://github.com/github/copilot-cli/issues/4829) — 长工具调用序列中的子 agent 提示缓存失效且 token 消耗成倍累积**(triage)
   - 在 Windows 上通过 Copilot CLI v1.0.83 使用 Gemini 3.8 Flash 时，子 agent 单轮运行数百次工具调用会使提示缓存失效，造成严重的 token 膨胀。**1 条评论**——对运行自主 agent 且关注成本的用户高度相关。

6. **[#4838](https://github.com/github/copilot-cli/issues/4838) — `skill` 工具在无头 `-p` 模式下间歇性失败："No model-invocable skills available"**(triage)
   - 无头调用有时无法解析同一请求 `<available_skills>` 块中**明确列出**的 skill。看似确定性的行为出现间歇性失败，在 CI/自动化场景中尤其令人头疼。

7. **[#4836](https://github.com/github/copilot-cli/issues/4836) — Grok 4.5:351 个工具直接以 HTTP 400 失败，而不是提示 350 个工具的上限**(triage)
   - 当声明的工具数量超过 350 时，发往 `grok-4.5` 的请求会以一个不透明的 HTTP 400 失败。CLI 应在调用 API 之前校验并明示各模型的工具配额。对重度使用 MCP 的用户群体是共性问题。

9. **[#4835](https://github.com/github/copilot-cli/issues/4835) — Gemini Flash:一个格式错误的 MCP 数组 `enum` 就能让所有提示以 HTTP 400 失败**(triage)
   - 只要有一个 MCP 工具的 schema 在数组属性上直接放置整数 `enum`,发往 Gemini 3.7 Flash 的每个请求都会被一个不透明的 400 毒化。显然需要引入 schema 清洗机制。

10. **[#4834](https://github.com/github/copilot-cli/issues/4834) — 支持 MCP 2026-07-28 多轮往返请求(`input_required`)**(triage)
    - Copilot CLI 尚不支持协商 MCP 协议版本 2026-07-28,因此依赖 MRTR 做 URL 引导且不再提供旧版回退的服务器会直接失效。这是针对 MCP 集成的一个具体升级请求。

10. **[#4832](https://github.com/github/copilot-cli/issues/4832) — CLI 1.0.83 中工作区 `.mcp.json` 从未被加载**(triage)
    - 仓库根目录的 `.mcp.json` 被静默忽略——`copilot mcp list` 不显示 `Workspace` 分组，服务器也从未被启动。这是一个实打实的回归，破坏了标准的 Claude-Code 风格 MCP 配置。

## 关键 PR 进展
*过去 24 小时内没有更新任何 PR。按规范省略本节。*

## 热门讨论
*未提供讨论数据。按规范省略本节。*

## 功能请求趋势

- **MCP 协议现代化。**Issue [#4834](https://github.com/github/copilot-cli/issues/4834) 请求支持 MCP `2026-07-28` 多轮往返 / `input_required`,与 [#4832](https://github.com/github/copilot-cli/issues/4832) 的配置加载请求以及 [#4835](https://github.com/github/copilot-cli/issues/4835) 的 schema 校验投诉相互呼应。
- **企业级策略与插件管理。**多个 issue 呼吁将托管配置提升为一等公民：MDM/设备驱动的 `enabledPlugins`([#4837](https://github.com/github/copilot-cli/issues/4837))、服务器管理的 `extraKnownMarketplaces`([#4556](https://github.com/github/copilot-cli/issues/4556)),以及无需匹配 git remote 的组织级自定义 agent 发现([#3572](https://github.com/github/copilot-cli/issues/3572))。
- **按模型设定工具配额与更清晰的错误报告。**[#4836](https://github.com/github/copilot-cli/issues/4836) 呼吁在调用前针对各模型的工具上限做显式预检校验，并以更友好的方式呈现提供商限制，而不是抛出不透明的 HTTP 400。
- **可靠的会话生命周期。**[#4505](https://github.com/github/copilot-cli/issues/4505) 指向一个更广泛的需求：可恢复的会话应能从中断的连接中自愈；[#4838](https://github.com/github/copilot-cli/issues/4838) 则希望在无头 `-p` 模式下实现确定性的 skill 解析，以满足 CI 场景需求。
- **子 agent 效率。**[#4829](https://github.com/github/copilot-cli/issues/4829) 请求内置防护机制，防止失控的工具调用链导致提示缓存失效。

## 开发者痛点

- **托管环境中的静默失败。**多个企业路径(托管 marketplace、MDM `enabledPlugins`、工作区 `.mcp.json`)能正确完成安装/拉取，随后却静默失效，不留任何诊断线索。这是当日最大的挫败感来源。
- **模型提供商报错不透明。**Grok 4.5 工具上限超限([#4836](https://github.com/github/copilot-cli/issues/4836))与 Gemini Flash MCP schema 边缘情况([#4835](https://github.com/github/copilot-cli/issues/4835))都表现为裸的 `HTTP 400`,没有任何可操作的报错信息。
- **中断后的会话状态过期。**恢复的会话每次提示都失败，产品内没有任何补救手段，只有 `/fork` 这样的变通办法([#4505](https://github.com/github/copilot-cli/issues/4505))。
- **无头/CI 场景的可靠性缺口。**`-p` 模式下的 skill 解析具有不确定性([#4838](https://github.com/github/copilot-cli/issues/4838)),而 1.0.83 中工作区 MCP 配置完全不被加载([#4832](https://github.com/github/copilot-cli/issues/4832)),削弱了脚本化使用。
- **子 agent 的 token 经济性回归。**长的单轮工具调用序列因提示缓存失效而使 token 消耗不断叠加([#4829](https://github.com/github/copilot-cli/issues/4829))。
- **平台特定的崩溃。**在 Linux 上，语音模式因 Nemotron ASR 中的 ONNX Runtime 断言而以 `SIGABRT` 中止([#4833](https://github.com/github/copilot-cli/issues/4833)),问题虽小众，但对 Linux 桌面用户来说摩擦不小。

---

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-14

## 今日要点

社区因一次强制的 UI 改版（issue #20242）而炸开了锅——该改版移除了常驻的左侧边栏，并从桌面应用中取消了多 worktree/多项目工作流——今天至少有 8 个独立 issue 在要求恢复旧版布局。技术方面，多项高影响力的修复和功能在 PR 中落地：基于 Anthropic tool-search 延迟加载 MCP schema（#48967）、SQLite 长期记忆（#48498）、热重载 `/reload` 命令（#43458），以及修复 Windows 上 App Execution Alias 的 shell 问题（#48968）。提供方的可靠性也受到影响，出现了大范围的 Console Go 上游故障（#37231）以及 Muse Spark 模型上反复出现的 `encrypted_content` 错误。

## 版本发布

过去 24 小时内无新版本发布。

## 热门 Issue

1. **#37231 — Console Go 上游请求失败（已关闭，18 条评论）** — 影响所有"Go"模型的大范围提供方故障，覆盖 CLI、桌面端和 VSCode 扩展。意义重大，因为不论使用哪个客户端，只要触及 Console Go 集成的用户都受到影响。[链接](https://github.com/anomalyco/opencode/issues/37231)

2. **#45278 — 3 个月后付款被拒（未关闭，16 条评论，5 👍）** — 原本一直正常的卡/银行组合在订阅续费时突然失败。凸显了计费链路中的摩擦以及非自愿流失的风险。[链接](https://github.com/anomalyco/opencode/issues/45278)

3. **#48882 — 恢复带常驻左侧边栏的旧版 UI（未关闭，12 条评论，11 👍）** — 单条新功能请求中点赞数最高：在 #20242 移除旧布局后，请求团队将原先的双面板布局作为可选选项重新提供。是对这次改版最强烈的不满信号。[链接](https://github.com/anomalyco/opencode/issues/48882)

4. **#48888 — 布局被强制替换为单对话视图（未关闭，10 条评论）** — 拥有大量项目/对话的重度用户失去了高效的导航方式；仅剩一个 Home 按钮和 Ctrl+B。措辞激烈、充满挫败感，凸显了这次设计回退。[链接](https://github.com/anomalyco/opencode/issues/48888)

5. **#48372 — `SystemPrompt.environment` 的 `TypeError`（未关闭，4 条评论，13 👍）** — 每次 prompt 都通过 `opencode run` 和 TUI 崩溃，报错 `undefined is not an object (evaluating 'a.name')`。高点赞/评论比表明在 macOS 和其他平台上广泛可复现。[链接](https://github.com/anomalyco/opencode/issues/48372)

6. **#48811 — macOS：每次 prompt 都因 `undefined is not an object` 失败（未关闭，3 条评论，16 👍）** — 与 #48372 根因相同，但仅限于 macOS；极高的 👍/评论比说明大量 Mac 用户正在被此问题影响。[链接](https://github.com/anomalyco/opencode/issues/48811)

7. **#17344 — 允许在启动时使用自定义 session ID（已关闭，6 条评论，12 👍）** — 一个长期存在的体验性诉求：`--session my-project`，让用户能干净地对 session 进行命名、脚本化和恢复。即便已关闭，高互动量说明需求依然强烈。[链接](https://github.com/anomalyco/opencode/issues/17344)

8. **#48800 — Muse Spark 1.2 的 `invalid_request_error`（已关闭，6 条评论）** — 今早开始出现的、提供方侧的 `encrypted_content` 推理错误；是今天更大范围 1.3 报告的前兆。有助于追踪这次回退的时间线。[链接](https://github.com/anomalyco/opencode/issues/48800)

9. **#48960 — 新布局让工作无法进行（未关闭，3 条评论，7 👍）** — 被包装成合规性阻碍，因为用户表示在新布局下无法完成日常工作；尽管用户暗示可能会换工具，但仍能代表更广泛的情绪。[链接](https://github.com/anomalyco/opencode/issues/48960)

10. **#48747 — Windows 应用在 AMD Radeon 上无法启动（未关闭，3 条评论）** — GPU 和渲染进程在 AMD GPU 上以 `0x80000003` 崩溃，只剩下一个导出日志的界面。是桌面端某个重要细分群体的硬件相关阻塞问题。[链接](https://github.com/anomalyco/opencode/issues/48747)

## 重点 PR 进展

1. **#43458 — `feat(opencode): add reload_config agent tool with auto-resume`** — 新增一个 `/reload` 斜杠命令，可在不重启 TUI 的前提下热重载配置、插件、MCP 服务器、skills 和 agents，并自动恢复被中断的 session。对插件/skills 开发者来说是体验上的重大提升。[链接](https://github.com/anomalyco/opencode/pull/43458)

2. **#48967 — `feat(session): defer MCP tool schemas behind Anthropic tool search`** — MCP 工具定义会占据 prompt 前缀的很大比例（有一个报告：在一个 184k token 的初始上下文中占到 82%）。该 PR 利用 Anthropic 的 tool-search，让大型 MCP 工具集合实现按需延迟加载。在成本和延迟上都有显著改进。[链接](https://github.com/anomalyco/opencode/pull/48967)

3. **#48498 — `feat(core): add sqlite long-term memory persistence`** — 新增基于 SQLite 的长期记忆，提供 `teach`、`recall` 和 `learn` 原语；为跨 session 的持久化 agent 知识打开大门。关闭 #48497。[链接](https://github.com/anomalyco/opencode/pull/48498)

4. **#48968 — `fix(core): resolve Windows shells installed as app-execution aliases`** — 修复了当 `pwsh` 从 Microsoft Store（MSIX）安装时，会静默回退到 Windows PowerShell 5.1 的问题。关闭 #41426。[链接](https://github.com/anomalyco/opencode/pull/48968)

5. **#48969 — `fix(tui): roll over compact counts to M at 999,950`** — 边缘场景下的显示 bug：`999,950–999,999` 因 `toFixed(1)` 取整被渲染成 `1000.0K` 而非 `1.0M`。关闭 #33947。[链接](https://github.com/anomalyco/opencode/pull/48969)

6. **#42379 — `fix: log plugin load failures to stderr`（已关闭）** — 把之前只以 `Session.Event.Error` 形式发出的插件加载错误暴露到 stderr，大幅简化插件调试。关闭 #41817。[链接](https://github.com/anomalyco/opencode/pull/42379)

7. **#48605 — `feat(opencode): add interactive visualize command`** — 新增 `opencode visualize` CLI 命令和 `/visualize` 自定义命令，支持交互式选择目标位置。关闭 #48585。[链接](https://github.com/anomalyco/opencode/pull/48605)

8. **#48952 — `fix(tui): preserve form drafts across tabs`** — 当 session tab 卸载时，保留 V2 TUI 表单中尚未提交的内容（当前字段、选择项、自定义输入）。关闭 #48950。[链接](https://github.com/anomalyco/opencode/pull/48952)

9. **#48940 — `fix(tui): allow toggling several MCP servers at once`（已关闭）** — 之前 MCP 对话框将所有开关操作序列化到单个 `string | null` signal，在 `tools/list` 调用较慢（例如 Cloudflare 约 3.5k 个工具）时会冻结 UI。现在可以并发切换多个服务器。[链接](https://github.com/anomalyco/opencode/pull/48940)

10. **#42660 — `feat(provider): add dynamic model discovery for custom providers`** — 为 OpenAI 兼容提供方（LiteLLM、LM Studio 等）自动发现模型，免去手动配置。关闭了一长串相关 issue（#13891、#29308、#28999、#25624、#23327、#26863）。[链接](https://github.com/anomalyco/opencode/pull/42660)

## 功能请求趋势

- **恢复桌面端旧版布局（常驻左侧边栏 + 多 worktree/多项目视图）：** 无疑是今天最主流的诉求——#48882、#48888、#48953、#48960、#48835、#48951、#48958、#48933、#48954、#48945 都汇聚到这一主题。
- **启动时使用自定义/具名 session ID**，以支持脚本化、自动化和恢复流程（#17344）。
- **跨 session 的持久化 agent memory**（#48497 / #48498）。
- **长上下文显示相关修复**，围绕提问 prompt 界面（#37173 → #48949）。
- **插件可发现性 / 配置灵活性**——在不重启 TUI 的前提下热重载插件/MCP/skills（#43458）以及可配置 Web UI 标题（#47907）。
- **原生客户端覆盖**——社区展示了 Android（#48556）以及更广泛生态插件（#48955），说明需求不止于桌面端/TUI。
- **提供方改进**——为自定义 OpenAI 兼容端点提供动态模型发现（#42660）以及前端的"skill"包（#46129）。

## 开发者痛点

- **UI 回退打断核心工作流：** 改版后的桌面布局是最大且最集中的挫败感来源——用户反馈它阻碍了多项目切换、隐藏了 workspace/worktree，并埋没了聊天历史。多人表示正在评估替代方案。
- **提供方可靠性：** 反复出现的 Console Go 上游故障（#37231）以及 Muse Spark 1.2/1.3 上的 `encrypted_content` 错误（#48800、#48962、#48947）让多轮 session 变得不稳定，尤其是涉及图片附件和大量工具调用的场景。
- **每次 prompt 崩溃的回退：** `SystemPrompt.environment` 的 `TypeError`（#48372、#48811）会让 `opencode run` 和 TUI 在每次 prompt 时都崩溃，影响 macOS 和其他平台。
- **平台相关的启动失败：** Windows 桌面端在 AMD GPU 上崩溃（#48747）；macOS 26 的 sidecar 在约 2 分钟后以 SIGTERM 静默退出（#48814）；AppImage 安装在 Linux 应用菜单中不显示（#48869）。
- **成本与上下文膨胀：** MCP 工具的 schema 可能会主导 prompt token 占用；用户正在积极要求延迟加载（#48967），而目前还无法关闭。
- **计费摩擦：** 原本能用的卡出现付款被拒（#45278），退款请求渠道被路由到 GitHub issue（#48944），反映出自助账户工具链存在缺口。
- **插件调试：** 加载失败此前只以不透明的 session 事件形式暴露，催生了现已合并的 stderr 日志输出（#42379）。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-14

## 今日要点

Pi 项目经历了一个以分类排查与修复为主的繁忙一天，出现了 **多个关键的会话中断型 bug**，同时伴随一系列影响较小但重要的 provider 集成修复。社区还在大力推动 **多账号 OAuth 支持** 和 **Windows 兼容性**，这两项需求在多个 issue 中反复出现。在 PR 方面，最具影响力的提案来自 mitsuhiko 的 **"developer message role"** 变更，可能会重塑 system prompt 的工作机制。

## 版本发布

过去 24 小时内无新版本发布。

## 热门 Issue

1. **[#8684](https://github.com/earendil-works/pi/issues/8684) — `PI_OFFLINE` 静默禁用 provider 模型发现** *(OPEN，8 条评论)*
   文档记录了一个真实的矛盾：`PI_OFFLINE` 应当仅抑制启动时的常规任务（更新检查、遥测），但它同时会终止整个会话期间所有 provider 模型目录的发现功能。这是一个明显的范围与行为不匹配问题，文档和代码都需修复。

2. **[#7739](https://github.com/earendil-works/pi/issues/7739) — 面向 jcode 同级延迟的启动时间预算** *(OPEN，8 条评论)*
   提议设定一个以 `jcode` 为基准的明确启动预算。附有来自 `jcode` README 的硬数据表格，标明 pi 0.62.0 在哪些环节落后。为任何性能优化工作提供了有用的参考框架。

3. **[#9298](https://github.com/earendil-works/pi/issues/9298) — Grok 403 被标记为 "OpenAI API error"** *(CLOSED，7 条评论)*
   兼容 OpenAI 的 Responses 客户端将 Grok 的账单错误包裹上 "OpenAI API error" 前缀，误导用户。此修复至关重要，因为用户无法判断应排查哪家供应商。

4. **[#9381](https://github.com/earendil-works/pi/issues/9381) — 包报告：pi-safe-compact** *(CLOSED，6 条评论)*
   安全/策略报告，标记一个作者似乎已失联的扩展。任何安装第三方 pi 包的用户都值得关注。

5. **[#8720](https://github.com/earendil-works/pi/issues/8720) — 仅含空白的工具输出导致会话崩溃** *(OPEN，6 条评论)*
   当工具仅返回 `"\r\n"`（在 Windows bash 上极为常见）时，该内容会被原样发送并被 HTTP 400 拒绝，随后这条坏消息会留在历史记录中，污染之后的所有请求。是一个真正的"会话杀手"型 bug。

6. **[#9054](https://github.com/earendil-works/pi/issues/9054) — 在 `/new` 上保留模型与 effort** *(CLOSED，5 条评论)*
   一个干净的功能诉求，希望通过 `newSessionInherits` 标志控制临时的模型/effort 选择是否在 `/new` 之后保留。可能会影响未来 UX 的演进方向。

7. **[#8913](https://github.com/earendil-works/pi/issues/8913) — 全屏渲染器无条件启用鼠标追踪** *(OPEN，5 条评论)*
   `--tui-mode fullscreen` 请求 `?1003` any-event 追踪，但没有任何退出选项。渲染器已经具备 `mouse` 选项，只是调用方未将其传递下去。修复简单，但能带来真实的体验提升。

8. **[#8827](https://github.com/earendil-works/pi/issues/8827) — LaTeX 旧式字体切换强制走原始回退** *(OPEN，5 条评论)*
   任何使用 `\rm`、`\bf`、`\it` 的数学块都会回退为字面源码而非 unicode 数学字符。issue 中给出了具体的正则层面的诊断。

9. **[#9306](https://github.com/earendil-works/pi/issues/9306) — 中止/错误回合在上下文中留下未匹配的 toolCalls** *(OPEN，4 条评论)*
   当一次回合以 `stopReason: "error"`/`"aborted"` 结束（发生在部分 tool-call 流式传输之后），下一次 `runAgentLoopContinue` 会被 provider 拒绝。与 #8720 属于同一严重级别。

10. **[#9129](https://github.com/earendil-works/pi/issues/9129) — Windows bash 超时留下孤儿进程** *(OPEN，4 条评论)*
    `taskkill /F /T /PID` 无法触及 Git for Windows 中短命的 MSYS2 中间进程，因此即使命令被"终止"，流水线各阶段仍然存活。对在 Windows 上运行 pi 的用户而言很重要。

*同样值得关注：[#9391](https://github.com/earendil-works/pi/issues/9391)（Anthropic `prefix_binding_mismatch` 在压缩后出现）、[#9074](https://github.com/earendil-works/pi/issues/9074)（Anthropic 流中途回退失败）、[#9075](https://github.com/earendil-works/pi/issues/9075)（高 effort 下压缩触顶输出上限）、[#9354](https://github.com/earendil-works/pi/issues/9354)（格式错误的 prompt-template frontmatter 被静默丢弃）、[#9071](https://github.com/earendil-works/pi/issues/9071)（扩展工具名冲突被静默忽略）。*

## 关键 PR 进展

1. **[#4318](https://github.com/earendil-works/pi/pull/4318) — 将 changelog 确认状态迁移到 `state.json`** *(CLOSED)*
    让 `settings.json` 可以安全地通过 dotfiles 共享。新增了一个具备加锁写入、队列化 flush 与错误排空的 `StateManager`。

2. **[#6534](https://github.com/earendil-works/pi/pull/6534) — feat(ai): 新增 developer message role** *(OPEN)*
    来自 mitsuhiko 的实验性 PR，实现了 RFC 54。是提示词组织方式的宏观级变更；值得尽早阅读的一类 PR。

3. **[#9548](https://github.com/earendil-works/pi/pull/9548) — 会话中间插入系统消息** *(OPEN)*
    将 system prompt 与工具集变更记录到 transcript 中，而非静默修改起始条件。概念上与 #6534 配对；两者都会影响缓存前缀的行为。

4. **[#9329](https://github.com/earendil-works/pi/pull/9329) — 将 Orca 终端识别为具备 Kitty 图像能力** *(OPEN)*
    改动不大但有意义：让 Orca 用户获得内联图像支持，而不必回退到文本。

5. **[#9584](https://github.com/earendil-works/pi/pull/9584) — 在 Ctrl+P 上选中唯一的范围内模型** *(CLOSED，修复 #9580)*
    此前 Ctrl+P 会打印 "Only one model in scope" 而非直接切换。属于"事后看来显而易见"的修复。

6. **[#9434](https://github.com/earendil-works/pi/pull/9434) — 扩展向会话系统提示追加内容** *(OPEN)*
    允许 `session_start` 处理器返回仅追加的 `systemPromptAppend` 内容。关闭 #9432，并为更安全的扩展组合方式打开大门。

7. **[#9581](https://github.com/earendil-works/pi/pull/9581) — 在 prompt-template frontmatter 失败时发出警告** *(CLOSED，修复 #9354)*
    让 prompt-template 的诊断路径与 `SKILL.md` 已采用的告警路径对齐。恢复了对被静默丢弃模板的可见性。

8. **[#9441](https://github.com/earendil-works/pi/pull/9441) — 防止光标标记泄漏** *(OPEN)*
    将 APC 光标标记视为位置性元数据，避免其被重放进后续的选择切片。瞄准的是一类细微的 TUI 伪影问题。

9. **[#9570](https://github.com/earendil-works/pi/pull/9570) — 将 `TOO_MANY_TOOL_CALLS` 映射到 error 停止原因** *(OPEN)*
    `@google/genai@2.21.0` 新增了该 `FinishReason`；`google-shared.ts` 中的穷尽式 switch 未跟进，导致调用抛出 `Unhandled stop reason`。属于直接跟进式的修复。

10. **[#9569](https://github.com/earendil-works/pi/pull/9569) — 强制转换 JSON 编码的工具参数** *(OPEN)*
    恢复那些被模型双重引号包裹（外层 JSON 字符串 + 内嵌 JSON 字符串）的工具参数。减少一整类的校验失败。

*同样值得注意：[#9501](https://github.com/earendil-works/pi/pull/9501) 与 [#9504](https://github.com/earendil-works/pi/pull/9504)（Windows shell 解析统一 + Windows Store 别名支持）、[#8635](https://github.com/earendil-works/pi/pull/8635)（惰性设置期间保留 aborted 停止原因）、[#9442](https://github.com/earendil-works/pi/pull/9442)（为 Chat-Completions 代理提供 `compat.supportsPromptCacheKey`）、[#9222](https://github.com/earendil-works/pi/pull/9222)（拒绝在活跃会话操作期间重新加载）。*

## 热门讨论

**展示与分享**
- [#1558](https://github.com/earendil-works/pi/discussions/1558) — **Pi Cursor Provider**（3 条评论，9 👍）。社区构建的 npm 包，将 Cursor 的 CLI 作为自定义 provider 加入 Pi；这种外延式的实践正体现了扩展模型的可行性。
- [#9552](https://github.com/earendil-works/pi/discussions/9552) — **Pi Heao GUI**（1 👍）。基于 `pi-agent-studio` 聊天 UI 构建的 Windows 桌面客户端。值得关注，因为它凸显了对非 TUI 前端（尤其是在 Windows 上）的需求。

## 功能诉求趋势

- **每个 provider 的多账号 OAuth** — 在 [#1391](https://github.com/earendil-works/pi/issues/1391) 与 [#7814](https://github.com/earendil-works/pi/issues/7814) 中均有出现。真实的用例（例如同时使用两个 ChatGPT Plus 订阅）驱动了反复的诉求。
- **更完善的会话生命周期控制** — `/new` 保留模型/effort（#9054）、树形导航期间拒绝提示（#9155）、reload 安全性（#9222）——这一切都指向一个日趋成熟的会话模型。
- **扩展面扩展** — 追加系统提示（#9434）、原子化中断/无损投递（#9578）、带预算的 RPC 操作（#9568）。社区显然正在超越当前的扩展契约。
- **TUI 人机工程学** — 可选退出鼠标追踪（#8913）、光标标记卫生（#9441）、Orca 检测（#9329）、可选 Light/Dark 外观与背景覆盖（#9573）。
- **Provider 路由 / 网关控制** — [#9211](https://github.com/earendil-works/pi/issues/9211) 指出 `vercelGatewayRouting` 在 `vercel-ai-gateway` 目录上是失效的。预计会有更多关于细粒度 per-provider 路由的诉求。

## 开发者痛点

- **静默失败**：`PI_OFFLINE` 行为超出文档说明（#8684）、prompt-template frontmatter 被无声丢弃（#9354）、扩展工具名冲突被静默忽略（#9071）。诊断能力的一致性是反复出现的短板。
- **会话杀手型 bug**：仅含空白的工具输出（#8720）以及中止/错误后留下未匹配 toolCalls（#9306）都会永久破坏会话。优先级很高。
- **Provider 错误保真度**：Grok 错误被标记为 OpenAI（#9298）、Anthropic 回退失败而非记录交接（#9074）、重试分类器缺失 "fail to touch upstream"（#9585）。用户无法调试他们读不懂的内容。
- **Windows 始终体验粗糙**：bash 超时孤儿（#9129）、shell 解析散乱（#9501）、Windows Store 别名（#9504）。最近每五个 issue 中就有一个涉及 Windows。
- **压缩机制脆弱**：压缩后残留过期的 signed thinking 块（#9391）、高 effort 下压缩必然触顶输出上限（#9075）。长会话用户在这里推动最力。
- **Provider 边界的 schema/参数处理**：Anthropic adapter 丢弃根级 JSON-Schema 关键字（#9557）、模型对工具参数双重编码（#9569）、`models.json` 默认值覆盖真实值（#9566）。共同主线：tool-call 参数的传递链路是摩擦的高发区。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-14

## 今日要点

0.23.3 nightly 版本线持续推进，完成对钉钉后台响应聚合的重构并持续清理频道。今天的活动主要由**平台/IDE 集成痛点**（VS Code Remote-SSH webview 卡死、Windows 上 MCP 启动失败、TUI 中 React #185 死循环）和**hooks/安全正确性**（AUTO 模式审批被忽略、`--continue` 后技能 PreToolUse hook 丢失、Claude Code 工具名匹配）主导。Web Shell 多项 P1 修复与功能即将落地，包括手动上下文压缩和滑动标签胶囊。

## 版本发布

**[v0.23.3-nightly.20260913.faa395885e](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260913.faa395885e)** — 专注于频道清理的 nightly 切片：
- `refactor(dingtalk): remove obsolete background response aggregation` (#11570)
- `feat(channels)!: remove me…`（源文中截断）— 延续经过 #6327、#6443 和 #8935 一直推进的频道栈简化路线。

## 热门 Issue

1. **[#5199 — Windows 上 Qwen Code IDE 出现压缩版 React error #185](https://github.com/QwenLM/qwen-code/issues/5199)**（9 条评论，P2，自 2026-06-16 起 OPEN）— 今日投票最多的 TUI 崩溃帖，标签为 `welcome-pr`。与 [#11783](#-11783) 一起再次出现，表明后台任务注册引发的 React #185 在 IDE + TUI 中均可复现。
2. **[#11590 — OpenAI 兼容的 DashScope 路由上不兼容的 `metadata` 字段破坏非 Qwen 模型](https://github.com/QwenLM/qwen-code/issues/11590)**（7 条评论，P1，已 CLOSED）— 任何将 `metadata` 类型定义为 `string` 的模型（ZHIPU/GLM-5.3-Flash 等）都会返回 400。重要的是它记录了通过 DashScope 代理的用户所面临的明确线协议不兼容问题。
3. **[#4615 — 项目级 `.mcp.json` 配合待审批语义](https://github.com/QwenLM/qwen-code/issues/4615)**（7 条评论，已 CLOSED 的功能）— 为项目级 MCP 配置奠定安全基线：可发现但必须经用户明确批准才会启动。
4. **[#9693 — Windows 启动时 Qwen Desktop MCP -32000](https://github.com/QwenLM/qwen-code/issues/9693)**（7 条评论，P2，已 CLOSED）— 即使 MCP 未被激活，STDIO MCP 服务器在 Windows 上仍会失败；这是 Windows CI 修复 PR #11787 背后的标准 bug。
5. **[#11587 — PR #11562 的延迟评审发现](https://github.com/QwenLM/qwen-code/issues/11587)**（7 条评论，OPEN）— 针对"来自用户自身消息的单次系统提醒"变更的自动修复延迟清理队列。
6. **[#11556 — vscode-ide-companion 0.23.1 在 Remote-SSH 下卡在加载中](https://github.com/QwenLM/qwen-code/issues/11556)**（6 条评论，P1，OPEN）— 在混合架构的 VSCode 客户端/服务器（linux-x64 ↔ linux-arm64）下，webview 始终无法解析。对在远程主机上开发的用户影响很大。
7. **[#11795 — 以 ACP 连接为键的权限队列静默阻塞守护进程](https://github.com/QwenLM/qwen-code/issues/11795)**（5 条评论，P1，OPEN）— 一个空闲会话未应答的提示会拖垮共享该守护进程的所有其他会话；通过 #11802 进行中的第 3 个修复。从架构上非常重要。
8. **[#5540 — 通过 `send_message` 恢复已完成的 background 子代理](https://github.com/QwenLM/qwen-code/issues/5540)**（5 条评论，已 CLOSED 的功能）— 填补了 background 代理生命周期中长期存在的空白；目前唯一的恢复路径仅限于 `running` 状态。
9. **[#5431 — 为交互式提示提供可选语音输入](https://github.com/QwenLM/qwen-code/issues/5431)**（5 条评论，P1，已 CLOSED 的功能）— 可访问性与人体工学需求，自 6 月起反复出现。
10. **[#11834 — 简单"你好"触发 `400 invalid params, function parameters is empty (2013)`](https://github.com/QwenLM/qwen-code/issues/11834)**（4 条评论，P1，OPEN）— 与 PR #11842（在 MiniMax 线协议上保留工具参数）直接相关，这是 #11431 引入的回归，因其将 `parameters` 序列化为 `undefined`。

**同样值得关注：** [#11180（P1，`--continue` 之后 hook 门控不再生效）](https://github.com/QwenLM/qwen-code/issues/11180)、[#11019（P2，AUTO 模式审批从未到达分类器）](https://github.com/QwenLM/qwen-code/issues/11019)、[#11783（P1，后台任务后 TUI React #185）](https://github.com/QwenLM/qwen-code/issues/11783)、[#11817（P1，自 #11565 起 Windows/CI 上 useBoxMetrics 测试确定性失败）](https://github.com/QwenLM/qwen-code/issues/11817)，以及 [#11815（P3，`#` 注释拆分 shell 命令）](https://github.com/QwenLM/qwen-code/issues/11815) — 每条评论数都不多，但都预示着一类影响正确性或测试稳定性的 bug。

## 关键 PR 进展

1. **[#11843 — fix(ci): pass autofix reasoning effort to Kimi K3](https://github.com/QwenLM/qwen-code/pull/11843)**（CLOSED）— 修正 #11833：由于 kimi-k3 路径上缺少能力元数据，`QWEN_AUTOFIX_EFFORT` 被序列化为通用的嵌套 `reasoning_effort` 对象。
2. **[#11792 — fix(live): monitor debug store on Windows](https://github.com/QwenLM/qwen-code/pull/11792)**（OPEN）— Windows 上目录的 `stat` 模式位始终为 `0o777`，导致隐私检查拒绝了所有目录。修复 #11790 中追踪的 `qwen-live` Windows CI 通道。
3. **[#11835 — fix(cli): ink `useBoxMetrics` 循环防护与机器速度解耦](https://github.com/QwenLM/qwen-code/pull/11835)**（OPEN）— 将 wall-clock 预算转换为测量次数预算，修复 #11817 中 Windows 上的确定性失败。
4. **[#11297 — fix(ci): retry a failed E2E checkout once](https://github.com/QwenLM/qwen-code/pull/11297)**（OPEN）— 将 E2E Linux `sandbox:none` checkout 包装在与 Docker 发布所用相同的一次有界重试约定中。
5. **[#11787 — fix(ci): restore Windows test baseline](https://github.com/QwenLM/qwen-code/pull/11787)**（CLOSED）— 让运行时路径和仅 POSIX 假设可移植，并在原生 Windows 绑定无法加载时安装 tokenizer 的 WASI 回退。支撑 Windows 通道修复。
6. **[#11625 — chore(pnpm): gate pnpm-lock on package-lock and declare hoisted imports](https://github.com/QwenLM/qwen-code/pull/11625)**（CLOSED）— #10444 的 Stage-1 后续工作；引入 pnpm/npm 共存一直缺失的双 lockfile 一致性门控。
7. **[#11845 — chore(pnpm): correct the range-key rationale and cover the version union](https://github.com/QwenLM/qwen-code/pull/11845)**（OPEN）— 恢复因合并竞态而搁浅的 #11797 的评审后续事项。
8. **[#11842 — fix(core): keep tool parameters on the MiniMax chat-completions wire](https://github.com/QwenLM/qwen-code/pull/11842)**（OPEN）— 直接修复 #11834 / #11431 的回归；其他路由保持不变。
9. **[#11782 — feat(web-shell): manual compression in composer context hover](https://github.com/QwenLM/qwen-code/pull/11782)**（OPEN）— 上下文卡片现在暴露手动压缩和"查看详情"链接，与右侧上下文面板共享状态。
10. **[#11163 — feat(web-shell): manage git remotes from the workspace branch picker](https://github.com/QwenLM/qwen-code/pull/11163)**（OPEN）— 通过两次点击确认来列出/添加/删除远程；从侧边栏的 workspace git 胶囊和 composer 分支标签中浮出。

**即将落地或推进中：** [#11844（滑动标签胶囊）](https://github.com/QwenLM/qwen-code/pull/11844)、[#9305（短 VP 内容底对齐）](https://github.com/QwenLM/qwen-code/pull/9305)、[#11841（CUA macOS App 0.20.7 恢复）](https://github.com/QwenLM/qwen-code/pull/11841)、[#10455（输出语言文件不可写时启动不崩溃）](https://github.com/QwenLM/qwen-code/pull/10455)、[#11001（清理期间等待 PTY 子进程）](https://github.com/QwenLM/qwen-code/pull/11001)、[#11134（macOS E2E 单次重试）](https://github.com/QwenLM/qwen-code/pull/11134)、[#11436（ACP 子进程匹配）](https://github.com/QwenLM/qwen-code/pull/11436)、[#11575（桌面应用跟随 CLI 发布）](https://github.com/QwenLM/qwen-code/pull/11575)、[#11743（history-item id 严格递增）](https://github.com/QwenLM/qwen-code/pull/11743)、[#11821（shell 拆分器中的 `#` 注释）](https://github.com/QwenLM/qwen-code/pull/11821)。

## 功能请求趋势

综合已关闭/未关闭 issue 和 PR 队列来看：

- **项目级与团队级 MCP 治理。** [#4615 项目级 `.mcp.json` 配合待审批](#-4615) 与此前的 #4777（deferred-tools 破坏 prompt cache）共同指向一个一致的 MCP 生命周期：发现 → 审批 → 延迟 → 缓存稳定。
- **background 子代理生命周期扩展。** [#5540 通过 `send_message` 恢复](#-5540) 加上更广泛的 background 自动化路线图，标志着一次性子代理正在让位于长生命周期的、可消息化的工作单元。
- **Web Shell 作为主要控制面。** 一天之内三个 PR（[#11782 压缩](#-11782)、[#11163 git 远程](#-11163)、[#11844 标签胶囊](#-11844)）加上 [#11838 目标卡片悬停 UX](#-11838) 表明 Web Shell 获得了大部分新 UX 投入。
- **跨厂商模型路由。** [#11590 metadata 兼容性](#-11590) 和 [#11834 MiniMax 工具参数](#-11834) 都在推动通过 DashScope 代理时建立更干净的 OpenAI 兼容线协议契约。
- **多频道钉钉故事。** 一系列 issue（#6327、#6443、#8935、#11570）显示 bot-app 与 DWS 频道路径正在解耦并获得一等交互卡片。
- **上下文遥测。** [#10015 在 LLM span 上的 `qwen-code.context.usage`](#-10015) 暗示一个正在浮现的主题：让 token 归属在每个请求上都可观测。
- **可访问性与输入模态。** [#5431 语音输入](#-5431) 反复出现；结合新的 Web Shell 焦点，预示多模态输入正在成为一个真实的轨道。

## 开发者痛点

- **Windows + IDE 集成持续回归。** Desktop 上的 MCP STDIO (#9693)、Windows 上的 useBoxMetrics 循环防护测试 (#11817)、Qwen Code IDE React #185 (#5199)、后台任务后 TUI #185 (#11783)，以及 qwen-live debug store (#11792) 都指向一个脆弱的 Windows 故事，而 #11787 和 #11835 中的 CI 修复正试图明确地稳定它。
- **Hooks 是锋利的边缘。** 同一时间窗口内出现三个独立 bug：`--continue` 之后技能 `PreToolUse` 不再触发 (#11180)、qwen hook 匹配器中 Claude Code 工具名永远不匹配 (#11823)、hook 阻断时 headless 模式给出错误指引 (#11824)，以及 AUTO 模式审批从未到达分类器 (#11019)。Hooks 层正在变成一项未完全履行自身契约的高阶用户功能。
- **守护进程级别的耦合正在伤害用户。** #11795（以 ACP 连接为键的权限队列）和 #11802 中的序列化范围修复是更广泛的"一个行为异常的会话拖垮守护进程"问题的可见边缘。
- **CI 抖动而非测试失败。** #11777（workspace→test 交接时 SIGTERM，所有套件全绿）、#11465（web-shell 视觉渲染不确定）、#11817（高负载下循环防护测试）— 团队把大量时间花在了基础设施上而非产品逻辑。一次有界重试模式（#10572、#11297、#11134）正成为标准缓解措施。
- **兼容回归溜进了线协议格式。** #11590（metadata 字段）和 #11834（MiniMax 参数）都是由序列化变更（#11431）引起的回归，这些变更并未针对所有路由路径进行往返测试。这表明项目将从按上游模型系列组织的线协议契约测试矩阵中受益。
- **自动修复机器人正在产生有意义的清理工作。** #11587、#11408 和"延迟评审发现"模式显示自动修复循环

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*