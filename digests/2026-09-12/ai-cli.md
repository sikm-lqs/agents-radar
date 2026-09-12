# AI CLI 工具社区动态日报 2026-09-12

> 生成时间: 2026-09-12 11:30 UTC | 覆盖工具: 7 个

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

# AI CLI 工具跨工具对比报告
**日期：** 2026-09-12 · **范围：** Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、OpenCode、Pi、Qwen Code

---

## 1. 生态概览

AI CLI 编码代理市场已围绕七个持续维护的工具形成格局——五款第一方厂商 CLI（Claude Code、Codex、Gemini CLI、Copilot CLI、Qwen Code），以及两款独立/不限提供商的入场者（OpenCode、Pi）。竞争重心已从核心终端对话能力转向生态纵深——插件平台、多代理编排、执行隔离、计费透明度——与此同时，新模型（GPT-6 Astra、Fable 5、Gemini 3、gpt-5.5）密集发布，正在对各家配额核算与可靠性进行压力测试。值得注意的是，桌面配套应用（而非 CLI 本体）已成为严重回归的主要源头，而计费/配额信任事件在同一天内于七个社区中的四个里冒出。用户切换成本明显下降：社区公开横向测评各工具，并要求功能对位（`/rewind`）和数据可迁移性。

---

## 2. 活跃度对比

| 工具 | Issues（24h 摘要） | PRs（24h 摘要） | Discussions（24h） | 发布状态 |
|---|---|---|---|---|
| **Claude Code** | 10 条上榜（榜首：👍61；大量陈旧关闭） | N/A¹ — 未返回 PR 数据 | N/A¹ — 未提供 | ✅ v2.1.269（`plugin eval`、`/output-style`） |
| **OpenAI Codex** | 10 条上榜（58/40/32 评论长帖） | 10（Command Center 批次、性格下线） | 10（含 👍132 `/rewind` 提议；6 个 showcase 项目） | ✅ 2 次发布（rust-v0.155.0-alpha.3.9/.10） |
| **Gemini CLI** | 10 条上榜（P1/P2 已分流） | 10（安全 + 可靠性修复） | N/A¹ — 不在摘要中 | ✅ v0.61.0-nightly（安全导向） |
| **GitHub Copilot CLI** | 21 条更新（10 条上榜） | 0 — 无更新（频道活跃） | N/A¹ — 未提供 | ✅ v1.0.84-5（JSONL 导入、补全） |
| **OpenCode** | 10 条上榜（计费集中爆发） | 10（7 open / 3 closed） | N/A¹ — 不在摘要中 | — 24h 内无 |
| **Pi** | 10 条上榜（含 78 评论长帖） | 15（10 + 5 honorable mentions） | 2（show-and-tell；协议缺口） | — 24h 内无 |
| **Qwen Code** | 10 条上榜（带优先级标签） | 10（新功能 + 修复） | N/A¹ — 不在摘要中 | ✅ v0.23.3-nightly（重构批次） |

> ¹ **N/A = 上游已禁用该频道或源摘要未提供数据——不计入"不活跃"。** 计数仅反映各 24h 摘要窗口内上榜条目，并非追踪器全量总数。唯一确认的"真零"是 Copilot CLI 的 PR 列（"no pull requests updated"）。

---

## 3. 共同演进方向

1. **多代理编排——及其可靠性债**（5 个工具）。Codex 正产品化该能力（Agent Command Center：token/credit 预估 #44970、模型分组 #44957、跨应用历史 #44969）；OpenCode 明确请求"Claude Code 风格的子代理"（#48612）。但可靠性严重滞后：Gemini 子代理挂起（#21409）以及 **MAX_TURNS 后的误报成功**（#22323），Qwen 在后台代理突发时 TUI 崩溃（#11500），Claude Code 的 tmux 编排被安全机制阻塞（#84266）。
2. **跨会话持久化记忆**（4 个工具）。OpenCode 提出原生的 `/teach`//`/recall`//`/memory`（#48497）；Copilot 寻求跨会话上下文查询（#2436）；Gemini 上线 Auto Memory，但存在密钥泄露（#26525）和重试循环（#26522）隐患；Claude Code 的持久记忆可经本地化注入被投毒（#85432）。**先脱敏再入上下文**是核心瓶颈。
3. **配额/成本透明化**（4 个工具）。Claude Code `cache_read` 计量漂移（#81234）和静默的 OAuth→Console-credit 回退（#86794）；Codex 👍161 的"永久移除 5 小时窗口"诉求（#34035）以及 GPT-6 Astra 上的两轮配额抽干（#42987）；OpenCode 的支付-额度对账失效（#37790、#48604）；Copilot 的 Flex Tier 成本控制诉求（#4821）。
4. **插件/扩展平台成熟度**（全部 7 个）。Claude Code 推出可复现的 **plugin eval + JSON/HTML 报告**；Pi 通过会话中途系统消息增量落地协议级扩展变更（#9116/#9117）；Qwen 将扩展范围限定在工作区运行时（#11086），并 **正式将其 hook 契约对齐 Claude Code**（#11610）；Codex 扩展 SKILL.md→plugin 转换器（#44843）；Copilot 和 OpenCode 仍在修补基础 skill/插件语义（#4438、#42409）。
5. **MCP 运维加固**（5 个工具）。Copilot CLI 是主要痛点（OAuth 重定向不匹配 #4795、恢复回归杀掉 stdio 连接 #4753、缺失取消 #4759）；OpenCode 要求 per-server TLS 信任（#40111）和非阻塞式发现（#48630）；Qwen 的 `.mcp.json` 不展开 `${VAR}`（#11499）；Gemini 强制 MCP 失败关闭策略（#29200）；Codex 在一次稳定 bump 上撞上 MCP 回归（#37567）。规律：MCP 处处能用，处处运行脆弱。
6. **Windows/桌面端对位**（4 个工具）。Codex 的 WSL 工程破坏是当日榜首（#41290，👍48）；Claude Code 的 MSIX/GPU 崩溃；Pi 的 Windows 元问题（#7547）及 shell 发现修复（#9501/#9504）；Qwen 的 Windows MCP 失败（#9693）。
7. **省 token 的上下文管理**（4 个工具）。Gemini 的外科手术式读取层级（今日基线 ~36.6k tokens/turn，#19561）及 AST 感知工具 epic（#22745）；Qwen 的缓存保留型延迟工具（#10410）与手动压缩（#11700）；Claude Code 不一致的压缩窗口（#85205）；Codex 的上下文快照渲染统一（#44976）。

---

## 4. 差异化分析

- **Claude Code** — 在 **plugin QA 作为产品面**（`claude plugin eval`）以及远程/云端输出风格一致性上更深。闭源二进制；仓库仅作 issue tracker。最薄弱之处：Fable 5 安全机制对合法安全工作的误报（4+ 条 issue）、计费不透明、本地化质量。
- **OpenAI Codex** — 内部工程速度最高；正在打造 **代理运营仪表盘**（Command Center），并主动 **收缩** 表面积（下线 Friendly/Pragmatic 性格，改用字面指令模板）。Rust CLI 且 alpha 版本频繁迭代；桌面端应用是回归重灾区。在配额政策社区压力下最为暴露。
- **Gemini CLI** — **安全优先姿态** 的工具：在一个 nightly 内完成跨 Docker/Podman/runsc/LXC/Seatbelt 的沙箱文件系统加固，并交付间接提示注入防御。研究驱动的上下文效率（AST epic）。开源且分流纪律严明（P1/P2 严格分级）。
- **Copilot CLI** — 下注 **互操作性**：用于跨工具可迁移会话/记忆的语义化 JSONL 交换——可能成为一项标准玩法。24h 速度最弱（可见合并 PR 为 0）；预发布节奏快于回归处理速度（#4753、#4826）。
- **OpenCode** — **不限提供商的多模型**路由（Kimi K3、DeepSeek、Requesty、Zen），但商业化基础设施尚不成熟（计费对账故障即当日第一大集中问题）。在子代理/记忆上是功能追随者；在无障碍上领先（屏幕阅读器、RTL/阿拉伯语）。
- **Pi** — **协议级创新最深**：会话中途系统消息增量的方案，其他工具只能靠全量重写系统提示来 hack；提供商抽象最广（Bedrock Mantle、Vertex 元数据、cache-key 兼容、跨家族用量归一化 #9489）。RPC 模式正孵化第三方产品（web-agent）。规模小但信噪比异常高，含外部核心贡献者提交的成体系架构 PR。
- **Qwen Code** — 最大胆的架构赌注：以 **凭证隔离 + 可插拔执行器后端**（阿里云参考实现 #11695–#11698）**将 agent harness 与执行环境分离**。明确以 Claude Code 惯例为兼容目标（hook 契约 #11610）。多端覆盖：daemon、Web shell、Android 伴侣、macOS Computer Use。

**目标用户分群：** 订阅锁定的专业开发者（Claude、Codex），企业/安全敏感的开源用户（Gemini），GitHub 原生团队（Copilot），BYO 模型/路由控本用户（OpenCode、Pi、Qwen）。

---

## 5. 社区动能与成熟度

- **参与度领先：** **Codex**（👍161 配额 issue、👍132 `/rewind` 讨论、58 评论 WSL 长帖，以及最丰富的第三方生态——6 个 showcase 工具，含 `isitdone`、CoCo、Wayfinder）和 **Claude Code**（issue ID 进入 93k 区间，意味着累计追踪量最大；今日榜首 👍61）。
- **速度领先：** Codex（10 PR + 2 releases/天）、Gemini（10 PR + 安全发布）、Qwen（10 PR + nightly）、Pi（15 PR，含一位知名外部贡献者提交的连串 PR）。
- **快速迭代近乎普遍**——Gemini、Qwen、Codex 的 nightly/alpha 频道；Claude 走 v2.1.269 点版本节奏；Copilot 走激进预发布 dash 版本——但 Copilot 暴露了"快而无力分流"的风险（连续两个预发布版本各引入一处新回归）。
- **规模 ≠ 信任：** 两大社区（Claude、Codex）同时也背负最响的信任投诉（计费、安全机制、配额）。**Pi** 规模最小但架构上最有野心；**Qwen** 展示出最结构化的治理（追踪 umbrella、优先级标签、needs-discussion 状态）；**OpenCode** 有参与度但当下处于用户疏离期（支付故障）；**Copilot CLI** 给人"工单驱动式运维"的观感，今日几乎看不到社区工程产出。

---

## 6. 趋势信号

1. **计量透明度成为采购标准。** 计费/配额事件同日内击中四款工具；Codex 上线按任务的 credit/USD 预估（#44970）意味着仪表盘将成为标配。*对开发者而言：在承诺花费前，要求导出用量与对账 API。*
2. **安全分类器需要"授权安全工作"通道。** 对 WAF 代码、凭证轮换、审计文档的误报（Claude Fable 5 集中案例；Copilot #4065）正迫使安全专业人员绕道而行。预计审计模式 / 策略画像将出现并成为差异化点。
3. **代理遥测完整性如今与能力同等重要。** 错误"成功"上报（Gemini #22323）、静默崩溃（Qwen #11500）、无错挂起（Pi #4945，78 评论）直接削弱自主代理的落地；可观测性 PR 在 Codex、Pi、Copilot 上都在上升。
4. **向 Claude Code 惯例收敛 + 可迁移性压力。** Qwen 正式对齐 hook 契约（#11610），Codex 用户引用 Claude/OpenCode 论证 `/rewind`，Copilot 的 JSONL 交换——都在压低切换成本，预计功能对位压力将加剧，交换格式将成为战略级议题。
5. **执行隔离成为企业级差异化点。** Gemini 的多运行时沙箱加固与 Qwen 的 harness/执行器分离 + 凭证隔离，预示沙箱化将成为 2027 年的采购勾选项。
6. **上下文经济学驱动架构。** 在新模型配额放大效应下，省 token 的读取（AST 感知、外科读取层级、prompt-cache 保留）已属于成本工程而非润色。
7. **新模型发布在冲击 CLI 而非仅模型本身。** GPT-6 Astra 在平凡输入上 `invalid_prompt`、Fable 5 过度严苛、gpt-5.5 流式挂起——这些都落在 CLI issue tracker 里；CLI 厂商越来越要为模型侧表现"背锅"。
8. **桌面应用是回归前沿；TUI 本体趋于稳定**（今日最严重的 TUI 问题仅停留在闪烁层面；真正硬崩溃都发生在 Electron/MSIX/Tauri/AppImage 表面）。

**决策者一句话：** 沿三条轴评估——*互操作性*（交换格式、hook/MCP 契约）、*可观测性*（用量、遥测、成本）、*隔离性*（沙箱、凭证分离）——在这些契约仍在收敛的当下，避免深度锁定。

---

Rules:
- Output ONLY the translation. No preamble, no explanation, no markdown fences around the whole output.
- Preserve the Markdown structure exactly: headings, tables (including column alignment rows), lists, blockquotes, bold/italic, horizontal rules, emoji.
- Keep URLs, link targets, code spans, code blocks, numbers and dates verbatim.
- Keep project names, repository slugs, usernames, version tags, file paths and API/config identifiers in their original form — do not translate them.
- Issue/PR references like #12345 and their link text stay as-is.
- Use natural technical Chinese, the register of a Chinese developer newsletter — not a literal word-for-word rendering.

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告

**数据来源：** github.com/anthropics/skills（数据截至 2026-09-12）
**代码仓库：** 官方 Claude Code Skills 合集

---

## 1. 热门 Skills 排行（最受关注的 PR）

虽然数据中未公开 PR 的评论数，但通过对高评论 Issues 的交叉引用、时效性以及主题覆盖面进行排序，得到以下最受关注的 Skill 提交：

### 1. skill-creator 可靠性修复（PR #1298）
**作者：** MartinCajiao | 状态：OPEN
**功能：** 修补基础 `skill-creator` 评估工具 —— `run_eval.py` 由于触发检测失效、产物安装缺失以及 Windows 流读取 Bug，导致所有技能描述的召回率均报告为 0%。
**讨论亮点：** 直接解决了长期存在的 Issue [#556](https://github.com/anthropics/skills/issues/556)（有 10+ 独立复现）。由于 `run_loop.py` 与 `improve_description.py` 都依赖该信号，整个描述优化闭环实际上一直在针对噪声做优化。
**链接：** https://github.com/anthropics/skills/pull/1298

### 2. Skill 质量与安全分析器（PR #83）
**作者：** eovidiu | 状态：OPEN
**功能：** 两个元技能，从五个维度（结构、安全、性能、可维护性、易用性）对其他 Skills 进行评估。新增的 `skill-security-analyzer` 覆盖提示注入、数据外泄以及权限提升等模式。
**讨论亮点：** 最早一批由第三方提出的元技能之一；回应了社区在 Skill 发布前进行自动化审查的日益增长的需求。
**链接：** https://github.com/anthropics/skills/pull/83

### 3. frontend-design Skill 重写（PR #210）
**作者：** justinwetch | 状态：OPEN
**功能：** 重写 `frontend-design` Skill，使每条指令在单次对话内即可落地执行，将"目标式"指引替换为可执行步骤。
**讨论亮点：** 面向官方合集中使用频率最高的 Skill 之一；对高流量的 UI 生成工作流是一次重要的清晰度升级。
**链接：** https://github.com/anthropics/skills/pull/210

### 4. document-typography Skill（PR #514）
**作者：** PGTBoos | 状态：OPEN
**功能：** 针对 AI 生成文档的排版质量检查 —— 防止孤词换行（1–6 个单词被挤到下一行）、寡行段落以及编号错位。
**讨论亮点：** 直击"Claude 生成的每篇文档"都存在的问题；被定位为任何文档生成类 Skill 的通用质量层。
**链接：** https://github.com/anthropics/skills/pull/514

### 5. Hivemind —— 多代理编排（PR #1628）
**作者：** Hanishchow | 状态：OPEN
**功能：** 将机械性工作从 Claude Code 委派给运行在免费模型上的无头 opencode worker；Claude Code 仅保留规划者、审核者与合并者角色。
**讨论亮点：** 将成本模型的思考重心重新定位为"上下文才是稀缺资源"；把编排提升为一类一等公民的 Skill，而非一个框架。
**链接：** https://github.com/anthropics/skills/pull/1628

### 6. self-audit 质量门禁（PR #1367）
**作者：** YuhaoLin2005 | 状态：OPEN
**功能：** 两阶段输出审计 —— 先进行机械性的文件存在性校验，再按"破坏严重度"优先级执行四维推理审计。模型无关、技术栈无关。
**讨论亮点：** 源自提案 Issue [#1385](https://github.com/anthropics/skills/issues/1385)；代表了社区正在浮现的"交付验证"模式。
**链接：** https://github.com/anthropics/skills/pull/1367

### 7. ODT / OpenDocument Skill（PR #486）
**作者：** GitHubNewbie0 | 状态：OPEN
**功能：** 创建、填写、读取并转换 OpenDocument 文件（.odt/.ods），包括模板填充与 ODT→HTML 转换。当文本中出现 "ODT"、"ODF"、"LibreOffice document" 等关键词时触发。
**讨论亮点：** 填补了 Microsoft Office 生态之外的 ISO 标准化 / 开源文档格式的明显空白。
**链接：** https://github.com/anthropics/skills/pull/486

### 8. scnet-hpc Skill（PR #1615）
**作者：** lql341 | 状态：OPEN
**功能：** 针对 SCNet HPC 集群的基于配置文件的 SSH + Slurm 工作流 —— 提供连接、分区、内存、模块与加速器选型的指导，并自动生成作业脚本。
**讨论亮点：** 面向科学计算用户的领域专用 Skill 范例；可作为其他 HPC / 云集群 Skill 的模板。
**链接：** https://github.com/anthropics/skills/pull/1615

---

## 2. 社区需求趋势（基于 Issues）

提炼自评论数最多的 15 条 Issue：

| 主题 | 依据 | 启示 |
|---|---|---|
| **信任与安全边界** | [#492](https://github.com/anthropics/skills/issues/492)（43 条评论）—— 社区 Skill 仿冒 `anthropic/` 命名空间；[#1175](https://github.com/anthropics/skills/issues/1175) —— SKILL.md 中的权限问题 | 最强烈的信号：亟需"已认证发布者 / 命名空间隔离"机制 |
| **组织级分发** | [#228](https://github.com/anthropics/skills/issues/228)（16 条评论）—— 通过 Slack 手动共享 .skill 文件 | 期望在 Claude.ai 内置原生 Skill 库 / 分享链接 |
| **skill-creator 的可靠性** | [#556](https://github.com/anthropics/skills/issues/556)（12 条评论）—— 0% 触发率；[#62](https://github.com/anthropics/skills/issues/62) —— Skill 消失 | 在自改进闭环规模化之前，评估工具必须达到生产级可信度 |
| **记忆与状态压缩** | [#1329](https://github.com/anthropics/skills/issues/1329)（9 条评论）—— 用符号化符号表示代理状态 | 长期运行的代理记忆是被公认的短板 |
| **插件打包规范性** | [#189](https://github.com/anthropics/skills/issues/189) —— `document-skills` 与 `example-skills` 推送了相同内容 | 需要去重 / 更清晰的插件分区 |
| **上下文高效的 Skill 加载** | [#1487](https://github.com/anthropics/skills/issues/1487) —— `claude-api` 一次调用注入约 156k tokens | 期望支持参考资料的懒加载 / 按需加载 |
| **Skill 作为 MCP Server** | [#16](https://github.com/anthropics/skills/issues/16) —— 通过 MCP 协议暴露 Skill | 模式融合：Skills ↔ MCP 一体化 |
| **平台兼容性** | [#29](https://github.com/anthropics/skills/issues/29) —— Bedrock；[#1390](https://github.com/anthropics/skills/issues/1390) —— MCP 评估得 0/N | Skill 必须突破 Claude Code 默认运行时的限制 |
| **质量门禁流水线** | [#1385](https://github.com/anthropics/skills/issues/1385) —— 任务前预检 → 对抗式评审 → 交付验证 | 社区正在将"推理质量"形式化为一个 Skill 类别 |

---

## 3. 高潜力待合并 Skill（即将落地的活跃 PR）

这些 PR 都较新，针对由热门 Issue 记录在案的成熟缺陷，且范围明确：

| PR | Skill / 修复 | 为何大概率会合并 | 链接 |
|---|---|---|---|
| **#1298** | skill-creator 评估产物安装 + Windows 流读取修复 | 关闭 [#556](https://github.com/anthropics/skills/issues/556)，解决描述优化闭环跨平台阻断问题 | https://github.com/anthropics/skills/pull/1298 |
| **#1742** | mcp-builder 适配 `mcp>=2` 的 streamable_http_client 与自定义 headers | 解锁所有使用当前 MCP SDK 版本的用户 | https://github.com/anthropics/skills/pull/1742 |
| **#1724** | mcp-builder 默认模型升级至 claude-sonnet-5 | 评估工具的例行性时效更新 | https://github.com/anthropics/skills/pull/1724 |
| **#1734** | 检测 DOCX 孤立评论 | 范围小、目标明确，针对高流量文档 Skill 的正确性修复 | https://github.com/anthropics/skills/pull/1734 |
| **#1607** | 标记四个已退役的 Claude 模型 ID | 仅文档更新，对应 Issue [#1603](https://github.com/anthropics/skills/issues/1603) | https://github.com/anthropics/skills/pull/1607 |
| **#538** | PDF 大小写敏感的文件引用 | 修改很小，但会导致 Linux 上的整个 PDF Skill 失效 | https://github.com/anthropics/skills/pull/538 |
| **#541** | DOCX 修订追踪 `w:id` 冲突 | 防止文档损坏 —— 影响面大，根因清晰 | https://github.com/anthropics/skills/pull/541 |
| **#539** | skill-creator YAML 未加引号描述的校验 | 捕获一类静默失败；前置解析钩子侵入性低 | https://github.com/anthropics/skills/pull/539 |
| **#1099 / #1050** | skill-creator Windows 子进程 + 编码问题 | 恢复 Windows 平台一致性 —— 覆盖非 Mac 评估的必需项 | [#1099](https://github.com/anthropics/skills/pull/1099) · [#1050](https://github.com/anthropics/skills/pull/1050) |

---

## 4. Skills 生态洞察

> **社区最集中的诉求是一个值得信赖的 Skill 生命周期 —— 已认证发布、命名空间完整性、确定性的评估工具以及按需加载上下文 —— 即让整个目录能够安全扩展的"元 Skills"基础设施。**

---

### 方法学说明
- 源数据集中未公开 PR 评论数（`Comments: undefined`），因此 PR 排序采用了 Issue 交叉引用、时效性与主题广度作为参与度的代理指标。
- Issue 排序使用了明确可获取的评论数：43 / 16 / 12 / 10 / 9 / 8 / 6 / 6 / 4 / 4 / 4 / 4 / 4 / 4 / 3。
- 所有状态标记反映的是截至 2026-09-12 的快照情况。

---

# Claude Code 社区摘要 — 2026-09-12

## 今日要点

今日发布的 **v2.1.269** 带来两项值得关注的更新：新增的 `claude plugin eval` 命令，可对插件评估套件进行可复现运行并输出 JSON + HTML 报告；以及 `/output-style [name]`，用于列出和切换输出样式——支持通过 Remote Control 及云环境使用。Issue 跟踪器方面，讨论活跃主要集中在 Windows Desktop 稳定性、安全防护误报，以及反复出现的 OAuth/配额计量问题；与此同时，得票最高的开放请求 (#48805) 提议在桌面应用中定制终端字体，显示出用户对 UI 个性化持续不减的需求。

---

## 版本发布

### [v2.1.269](https://github.com/anthropics/claude-code/releases/tag/v2.1.269)
- **`claude plugin eval`** — 针对 Claude Code 运行插件的 eval 套件，并输出可计分、可复现的 JSON + HTML 结果。详见 `claude plugin eval --help`。
- **`/output-style [name]`** — 列出并切换输出样式，支持通过 Remote Control 以及云/ot...（原文截断）。

---

## 热门 Issue

1. **[#48805] 桌面应用中的终端字体族设置** — *closed, enhancement*
   获得高票（👍 61，12 条评论）的功能请求，希望允许用户在 Claude Desktop 的 Code 标签页内自定义终端字体族。代码库已支持加载外部字体，因此这主要是一个设置 UI 的缺口。([link](https://github.com/anthropics/claude-code/issues/48805))

2. **[#66077] Claude in Chrome：将截图保存到本地文件系统** — *open, enhancement*
   目前截图只能停留在浏览器内；该请求希望截图能在会话期间写入磁盘，以便进行差异比对、归档或回灌至工具。 (👍 14，9 条评论) ([link](https://github.com/anthropics/claude-code/issues/66077))

3. **[#81234] Max 20x 周配额 2 天内耗尽 53%** — *closed, stale, bug*
   一位 Max 20x 订阅者反馈其周配额消耗速度远超对话记录核算所显示的数字，怀疑是 `cache_read` 计量所致。是关于用量核算透明度的一个有价值的案例。 (👍 2，6 条评论) ([link](https://github.com/anthropics/claude-code/issues/81234))

4. **[#93667] 将 IDE 选择指示器保留在底部状态栏而非内联提示中** — *open, enhancement*
   直接针对 v2.1.268 底部状态栏重构的回应：请求者希望将之前位于底栏的编辑器/`/diff` 选择指示器位置恢复为可选方案。 (👍 8，5 条评论) ([link](https://github.com/anthropics/claude-code/issues/93667))

5. **[#86016] 跨会话消息发送后会话冻结（Windows）** — *closed, stale, bug*
   在会话之间发送消息后，目标会话停留在 `isRunning:true` 状态且不再响应。与其他冻结报告不同。 (5 条评论) ([link](https://github.com/anthropics/claude-code/issues/86016))

6. **[#80751] 可插拔的上下文管理器与智能上下文检索** — *closed, stale, enhancement*
   提出一个可插拔的上下文层，使长时间运行的会话能够智能地获取/淘汰上下文，而非仅依赖压缩。与 `claude plugin eval` 方向在理念上一致。 (5 条评论) ([link](https://github.com/anthropics/claude-code/issues/80751))

7. **[#85432] 德语版 Claude Code 破坏技术术语** — *closed, stale, bug*
   将规范术语（Gate→Zaun、Policy→Politik、Root→Wurzel）直译，破坏了语义连贯性，并污染了持久化记忆。提醒我们本地化模式对工程师而言仍存在不少瑕疵。 (4 条评论) ([link](https://github.com/anthropics/claude-code/issues/85432))

8. **[#86794] 静默的 OAuth → 旧版 API 凭据回退导致 Console 额度被消耗** — *closed, stale, bug*
   当 claude.ai OAuth 过期时，Claude Code 静默回退到残留的旧版凭据，并继续消耗 Console 额度——既未提示重新认证，也未警告用户。涉及成本/计费完整性。 (3 条评论) ([link](https://github.com/anthropics/claude-code/issues/86794))

9. **[#84266] `model_refusal_fallback` 在合法的 tmux 编排场景下反复触发** — *closed, stale, bug*
   即便设置了 `switchModelsOnFlag: false`，网络分类器仍会对无害的基于 tmux 的多会话启动误判，从而阻断协调器会话。这是 Fable 5 防护机制的反复出现的问题。 (3 条评论) ([link](https://github.com/anthropics/claude-code/issues/84266))

10. **[#81320] `${CLAUDE_PLUGIN_ROOT}` 在插件 `settings.json` 中无法解析** — *open, documentation, reproduced*
    自带 `subagentStatusLine` 脚本的插件无法在其自身设置中引用它，因为 `CLAUDE_PLUGIN_ROOT` 在插件合并后的设置中不会被替换。属于文档未覆盖的行为缺口。 (2 条评论) ([link](https://github.com/anthropics/claude-code/issues/81320))

---

## 关键 PR 进展

*过去 24 小时内未返回任何 Pull Request 数据——本节省略。*

---

## 热门讨论

*本数据集中未提供讨论数据——本节省略。*

---

## 功能请求趋势

1. **UI/TUI 个性化** — 终端字体族 (#48805)、IDE 选择指示器位置 (#93667)、自动主题调色板与显式 Light/Dark 的一致性 (#75586)、macOS Finder 拖放保真度 (#86833)。
2. **本地优先的文件与截图输出** — Claude-in-Chrome 截图保存到磁盘 (#66077)；跨界面渲染主题保持一致。
3. **插件生态成熟度** — `claude plugin eval`（现已发布）、`${CLAUDE_PLUGIN_ROOT}` 变量替换 (#81320)、可插拔的上下文管理器 (#80751)。
4. **跨场景的输出样式控制** — v2.1.269 中通过 Remote Control / 云会话发布的 `/output-style`，反映了用户对跨场景一致定制能力的更广泛诉求。
5. **防御性安全与审计工作流** — 多项请求要求提供显式的“这是安全审计/防御性工作”模式，以避免 Fable 5 双重用途防护机制误触发 (#86804, #86835, #86820, #84266)。
6. **跨平台一致性** — Windows MSIX GPU 崩溃 (#68049, #89525)、Windows 上的 WSL/Linux 沙箱 (#91028)、Remote-SSH SSE 渲染 (#86854)。

---

## 开发者痛点

- **合法工作被安全防护误判** — 最集中的主题：WAF 检测代码、凭据轮换、反弹 shell 文档，乃至 tmux 编排都被反复误分类，导致模型切换或会话阻断。Fable 5 似乎尤为严格。
- **会话与状态不稳定** — 跨会话消息后会话卡在 `isRunning:true`、工作量等级在无用户输入时发生变化 (#86850)、分类器忽略指令 (#86846)。侵蚀了人们对长时间运行自动化的信任。
- **成本/计费不透明** — 静默的 OAuth → 旧版凭据回退消耗 Console 额度 (#86794)，以及 `cache_read` 核算不一致导致周配额被消耗 (#81234)。开发者无法将自身操作与实际账单对账。
- **Windows Desktop 之痛** — ARM64 GPU 崩溃 (#68049)、macOS 钥匙串 107 秒卡顿 (#76079)、崩溃转储文件被破坏 (#89525)、Linux 沙箱启动失败 (#91028)，以及破坏性的侧边栏分组写入 (#86843)。MSIX 安装包是受影响最严重的载体。
- **插件与配置体验** — 插件设置中变量未解析 (#81320)、`CLAUDE_CONFIG_DIR` 未能隔离 `~/.claude/CLAUDE.md` (#86837)、`claude-api` 载荷重复触发压缩 (#86817)。
- **本地化质量** — 德语模式误译规范技术术语并污染持久化记忆 (#85432)，表明非英文开发工作流仍存在不少瑕疵。
- **压缩窗口不一致** — 同一个 `claude-opus-5[1m]` 模型 ID 在不同会话中显示 150k 与 1M 两种自动压缩窗口 (#85205)，削弱了上下文行为的可预测性。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区速览 — 2026-09-12

## 今日要点
过去 24 小时 `openai/codex` 仓库的活动主要由 **Windows 桌面端的回归问题**（WSL 项目处理、`app-server` 生命周期、Computer Use 暂存）以及一波 **GPT-6 Astra 可靠性报告**（从提示被拒到两轮内耗尽 5 小时配额）主导。工程方面，一批数量罕见的内部 PR 推动了 **Agent Command Center** 的演进（令牌/用量预估、模型分组、跨应用只读历史），同时正式下线了 **Friendly / Pragmatic 性格选择器**，改用字面化的模型指令模板。

## 版本发布
过去 24 小时发布了 Rust CLI 的两个连续 alpha 补丁：

- **rust-v0.155.0-alpha.3.9** — [发布说明](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.9)
- **rust-v0.155.0-alpha.3.10** — [发布说明](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.10)

发布说明非常简短（"Release 0.155.0-alpha.3.x"），符合 Rust CLI 在稳定版 0.155 之前频繁的 alpha 迭代节奏。

## 热门 Issue

1. **[#41290] [Windows][WSL] 切换 Agent 环境到 WSL 后项目创建与删除失败** — 58 条评论，👍 48。当日流量最高的 issue；用户切换 WSL 后无法创建或删除项目。[链接](https://github.com/openai/codex/issues/41290)
2. **[#34035] 将 5 小时使用上限的临时取消永久化** — 28 条评论，👍 161。整个 backlog 中获赞最多的 issue；社区强烈支持将 2026 年 7 月的临时暂停永久化，适用于 Plus/Pro/Business。[链接](https://github.com/openai/codex/issues/34035)
3. **[#25271] Computer Use 在 Windows 上无法识别 Chrome URL，即便在 `chrome://newtab/`** — 40 条评论，👍 9。长期存在的浏览器自动化回归问题，持续阻塞 Windows 上的 Computer Use 流程。[链接](https://github.com/openai/codex/issues/25271)
4. **[#44720] ChatGPT 报错 "hit a snag" 问题复现** — 32 条评论，👍 6（已关闭）。`26.908.31457` 上的渲染器崩溃，影响 macOS Pro 用户。[链接](https://github.com/openai/codex/issues/44720)
5. **[#25744] macOS 版 Codex 累积 Computer Use / MCP 辅助进程及未被回收的僵尸子进程** — 23 条评论，👍 4。资源泄漏导致 HID 延迟和 WindowServer/TCC 卡顿；属于系统性的 macOS agent 运行时问题。[链接](https://github.com/openai/codex/issues/25744)
6. **[#42853] 符合条件的 ChatGPT Pro 账户在模型选择器中找不到 GPT-6 Astra** — 22 条评论，👍 4。符合资格的 Pro 用户在 Windows 上无法选择这款最新旗舰模型。[链接](https://github.com/openai/codex/issues/42853)
7. **[#42987] GPT-6 Astra Medium 在短短两轮内耗尽了 Plus 5 小时配额的 100%** — 18 条评论，👍 13。具体投诉，凸显了新模型附带的配额放大问题。[链接](https://github.com/openai/codex/issues/42987)
8. **[#42501] [Windows] 26.901.1978.0 在 `cua_node` 暂存无法复制 `node_repl.exe` 时无法启动 UI** — 17 条评论，👍 3。Computer Use 运行时打包缺陷，静默破坏 Windows UI。[链接](https://github.com/openai/codex/issues/42501)
9. **[#44102] Windows Desktop 26.903.61454：第一轮完成后无法发送后续消息** — 13 条评论。严重的 UX 回归，导致桌面客户端在第一轮之后无法继续使用。[链接](https://github.com/openai/codex/issues/44102)
10. **[#40231] Windows：命令执行过程中 `app-server` 被 `STATUS_CONTROL_C_EXIT`（0xC000013A）杀死；在 26.818.5229 中回归** — 12 条评论。一个此前已修复的 shell-kill 回归再次出现；agent 轮次在数分钟内崩溃。[链接](https://github.com/openai/codex/issues/40231)

## 关键 PR 进展

1. **[#44970] 在 agent command center 显示任务令牌与用量预估** — 在任务详情中新增输入/输出令牌计数以及预估信用点和美元金额，倾向于显示实时汇总而非明细。[链接](https://github.com/openai/codex/pull/44970)
2. **[#44957] 在 agent command center 添加模型分组** — `Ctrl+S` 现在可在 project / status / model 之间循环切换分组，并在页脚显示当前分组。[链接](https://github.com/openai/codex/pull/44957)
3. **[#44969] 将其他应用管理的任务作为只读历史在 command center 中打开** — 当任务归属其他 app server 时回退到冻结快照，从而解锁跨设备历史查看。[链接](https://github.com/openai/codex/pull/44969)
4. **[#44976] 统一上下文快照的文本渲染** — 统一 request 设置与 Responses Lite 开发者内容的指令渲染；`rewrite_known_segments` 现在为已知指引输出纯标签。[链接](https://github.com/openai/codex/pull/44976)
5. **[#44946] 下线 Friendly 与 Pragmatic 性格选择** — 删除性格模板；内置模型预设现在报告 `supports_personality: false`。[链接](https://github.com/openai/codex/pull/44946)
6. **[#44935] 从 TUI 中移除性格选择** — 移除 `/personality` 命令、弹窗及持久化层；轮次不再携带性格覆写。[链接](https://github.com/openai/codex/pull/44935)
7. **[#44945] TUI Windows 沙箱设置改走 app server** — 切换到 `windowsSandbox/setupStart`，并根据 app server 就绪状态启用沙箱模式。[链接](https://github.com/openai/codex/pull/44945)
8. **[#44944] 对已有 app-server 线程强制托管 provider 要求** — 针对当前托管要求重新校验保留的 `model_provider`，防止使用过时的配置。[链接](https://github.com/openai/codex/pull/44944)
9. **[#44952] 语音字幕在说话人更新与历史交接期间保持可见** — 修复排队历史插入期间字幕消失以及说话人之间的动画竞态。[链接](https://github.com/openai/codex/pull/44952)
10. **[#44942] 明确 Windows 语音包的 Visual C++ 运行时提示** — 指明 `bin/vcruntime140.dll`，补充许可证/可再分发链接，并在发布说明中新增专门章节。[链接](https://github.com/openai/codex/pull/44942)

## 热门讨论

**Ideas**
- **[#9618] 怎么还没有 `/rewind` 或 `/revert` 功能？** — 23 条评论，👍 132。本周期最受欢迎的 Codex 讨论；用户明确将该功能的缺失与 Claude Code 和 OpenCode 进行负面对比，并主张除非每次修改都提交，否则这一功能不可或缺。[链接](https://github.com/openai/codex/discussions/9618)
- **[#27754] 实验：一个用于 `AGENTS.md` 中可复用项目指引地图的 Codex 插件** — 一个社区插件，用于为未来的 Codex 会话生成并刷新一份紧凑的行动地图。[链接](https://github.com/openai/codex/discussions/27754)

**General**
- **[#45013] Codex review 千万别订阅，浪费钱** — 新鲜出炉的用户报告，在同一真实工作流上对比 Codex 和 Claude；声称在 Claude 上进行的对话量约为 8 倍，却未遭遇配额烦恼。[链接](https://github.com/openai/codex/discussions/45013)
- **[#40132] 你正在用 Codex 构建什么？** — 为新手设立的轻量社区帖，用于分享工作流与技巧。[链接](https://github.com/openai/codex/discussions/40132)

**Show and tell**
- **[#44153] `isitdone`：在测试/类型检查/lint 通过前阻止 "done" 的停止钩子** — `npx isitdone init --agent codex` 写入 `.codex/hooks.json`，在允许 Codex 停止前在工作树上重新跑仓库检查。[链接](https://github.com/openai/codex/discussions/44153)
- **[#44643] CoCo：跨终端与仓库并行工作的 Codex 协调器** — 跨多个 Codex 运行提供命名工作空间、断点续跑与监控。[链接](https://github.com/openai/codex/discussions/44643)
- **[#33807] Codebase Argus：在真实 PR 上架设的只读 Codex CLI 评审边界** — 确定性检查与编码 agent 共享同一份 PR 证据；展示了长评审包如何继承本地用户上下文。[链接](https://github.com/openai/codex/discussions/33807)
- **[#44618] Wayfinder：将 Codex 工作可视化为航行地图** — 本地优先的桌面应用，生成项目达成结果的视觉化历史。[链接](https://github.com/openai/codex/discussions/44618)
- **[#44291] Brain Scanner：在 Codex 修改共享辅助函数前查看调用方** — Codex 可在会话中查询的项目地图，配 `p-limit` 上的实例演示。[链接](https://github.com/openai/codex/discussions/44291)
- **[#44843] SKILL.md → Codex 插件包转换器（MIT，仅标准库）** — 在将 `SKILL.md` 文件夹打包为 Codex 插件清单时强制上传硬约束（描述 ≤1024、保留命名空间）。[链接](https://github.com/openai/codex/discussions/44843)

## 功能请求趋势
- **会话级撤销**：`/rewind` 或 `/revert` 明显领先，获 132 👍，并有与 Claude Code / OpenCode 的活跃对比帖。（[#9618]）
- **永久放宽 5 小时使用窗口**，适用于 Plus/Pro/Business，同时保留每周配额。（[#34035]）
- **更安全的 TUI 退出语义**：双击 `Ctrl+C` 二次确认，模仿 Claude Code。（[#14708]）
- **基于证据的完成报告**：在任务结束时从需求到可观测证据的结构化映射。（[#36718]）
- **Windows 上可靠的 Computer Use**：URL 识别、MCP/computer-use 暂存与 Chrome 扩展 RPC 反复回归。
- **子 agent 透明度**：在 Subagents 面板中显示每个 agent 的模型与推理 effort。([#32283])
- **为 GPT-6 Astra Medium 提供更智能的配额核算**：诸如 "hi" 这类提示返回 `invalid_prompt`，小会话就耗尽全部配额。（[#43237], [#42987], [#44700]）
- **插件 / 市场化工具**：清单转换器、市场索引以及受限的 `description` 强制。（[#44843]）

## 开发者痛点
- **Windows 桌面端不稳定**：`app-server` 生命周期、`cua_node` 暂存、沙箱提权、全局可写扫描以及 WSL 项目创建这些同一根因在各 point release（26.825 → 26.901 → 26.903）反复回归。受影响 issue：#41290, #42501, #42853, #42987, #43628, #44102, #40231, #44697, #34182。
- **GPT-6 Astra 不可预测**：提示接受不一致（trivial 输入即返回 `invalid_prompt`）、配额消耗过高、符合资格的 Pro 账户模型缺失。受影响 issue：#42853, #42987, #43237, #44184, #44700。
- **macOS 渲染器 / agent 运行时崩溃**：`r is not a function` 循环导入导致的空白窗口，以及长时间会话的僵尸进程，是被引用最多的 macOS 痛点。受影响 issue：#25744, #36946, #44434, #44743。
- **Linux 启动崩溃**：Debian 13 上使用 26.908.31748 包时出现 `AppRoutes TypeError: n is not a function`。（[#44785]）
- **Windows 上的 CLI 可靠性**：63.8 MB 的图像历史请求、空闲看门狗仍会触发的 WebSocket 回退，以及 shell 中途的 `STATUS_CONTROL_C_EXIT`。受影响 issue：#40231, #43015, #43022, #44884。
- **稳定版本 bump 上的 MCP 回归**：Qonto MCP 从 0.146.0 升到 0.147.0 后失效且没有缓存工具，暴露出已发布 CLI 中脆弱的初始化路径。（[#37567]）
- **配额成本透明度**：独立用户反馈 Codex Pro + review 相比 Claude 显得更贵；成本仪表盘以及每任务信用点/美元预估（正通过 #44970 落地）被越来越多地呼吁。（[#45013]）

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-12

## 今日要点

2026-09-12 的 nightly 版本 `v0.61.0-nightly.20260912.g9c1b0a610` 包含两项关键安全修复：加固沙箱文件系统边界 (#29283/#29214)，以及通过构建文件篡改和不可信标志位防御间接提示注入 (#29250)。一批近期合并的 PR 还修复了一个长期存在的终端闪烁 bug、MCP 策略执行、OAuth 凭据持久化以及状态更新重入问题——表明维护者正在为即将到来的 0.61 稳定版收紧可靠性和安全姿态。

## 发布版本

**v0.61.0-nightly.20260912.g9c1b0a610** ([#29291](https://github.com/google-gemini/gemini-cli/pull/29291))
- **安全（核心）**：防御通过构建文件修改和不可信 CLI 标志位进行的间接提示注入。重构 `shell`、`edit` 和 `write_file` 路径，在受限工作区模式下校验工作区边界。— [PR #29250](https://github.com/google-gemini/gemini-cli/pull/29250)
- **沙箱**：加固文件系统挂载边界，并在 Docker、Podman、runsc、LXC 和 macOS Seatbelt 之间隔离运行时状态；沙箱现在以只读方式访问配置，并使用可写但临时性的运行时状态。— [PR #29283](https://github.com/google-gemini/gemini-cli/pull/29283) / [PR #29214](https://github.com/google-gemini/gemini-cli/pull/29214)

## 热门 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — *子代理在 MAX_TURNS 后错误地报告为成功（13 条评论）*。P1 bug，`codebase_investigator` 在达到回合上限后仍记录 `status: "success"` / `Termination Reason: "GOAL"`，掩盖了中断。影响重大，因为它破坏了代理遥测与恢复逻辑的可信度。

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — *零依赖操作系统沙箱与执行后意图路由（9 条评论）*。P2 增强功能，利用 Gemini 3 原生的 bash 亲和性（`grep`/`cat`/`sed`/`awk`），同时保留安全 UX。模型对齐工具调用的战略方向。

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — *通用代理无限期挂起（8 条评论，👍8）*。P1——委派给通用子代理会在创建文件夹等简单任务上造成多小时的挂起。用户反馈唯一的绕过方法是显式指示模型不要委派。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — *基于 AST 的文件读取、搜索与映射（7 条评论）*。EPIC，评估 AST 工具（如 tilth、glyph）能否在减少 token 噪声和回合数方面优于盲目的 `read_file`。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — *Gemini 很少自主调用技能或子代理（6 条评论）*。虽是轶事级反馈但反复出现——显式指令有效，否则模型会忽略自定义技能/代理。

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** — *为 Auto Memory 增加确定性脱敏（5 条评论）*。P2 安全 bug——在提取代理脱敏之前，机密就进入了模型上下文；技能内容也会通过日志泄露。

7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** — *Shell 在命令完成后卡在"等待输入"（4 条评论，👍3）*。P1——TUI shell exec 在子进程结束后仍显示为活动状态，阻塞后续操作。

8. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)** — *Auto Memory 无限重试低信号会话（4 条评论）

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区速递
**日期：** 2026-09-12
**仓库：** [github/copilot-cli](https://github.com/github/copilot-cli)

---

## 1. 今日要点

CLI 发布了 **v1.0.84-5**，新增对语义化 JSONL 会话/记忆交换格式的导入支持，并统一了 shell 补全：根级 flag 与子命令选项现在由同一套语法生成——显著提升了 `copilot <TAB>` 补全的可发现性。过去 24 小时内更新的 21 个活跃 issue 集中体现了 MCP 集成层面的诸多痛点（OAuth、resume/重启交接、stdio 取消传播），同时围绕 `disable-model-invocation` 出现了多个 agent 技能缺陷，以及一起新出现的 Linux 桌面端 UI 重绘回归。

---

## 2. 发布版本

### [v1.0.84-5](https://github.com/github/copilot-cli/releases/tag/v1.0.84-5)
**新增**
- 新增 `session` 与 `memory` 的 import 命令，支持 **语义化 JSONL 交换格式**，便于在不同工具间实现可移植的会话/记忆迁移。

**改进**
- Shell 补全现在基于 **CLI 自身解析所用的同一套语法** 生成，因此：
  - `copilot <TAB>` 会在展示子命令的同时展示根级 flag。
  - 每个子命令仅展示自身选项（不再夹杂兄弟命令的选项）。

---

## 3. 热门 Issue

| # | Issue | 影响 | 社区 |
|---|---|---|---|
| [#4438](https://github.com/github/copilot-cli/issues/4438) | `disable-model-invocation: true` 让技能完全无法访问，而非仅限手动调用 | 标记为「手动专属」的技能实际上连模型都无法调用，破坏了文档承诺的契约。 | 👍 7 · 💬

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-12

## 今日要点

今天的社区关注主要集中在影响 Console Go 订阅的**计费/支付同步缺陷**——多名用户反馈 Stripe / 支付宝扣款成功,但持续出现"Insufficient balance"错误,表明 webhook 到额度的对账流程存在故障。工程方面,**持久化事件表膨胀**问题正在积极处理中,一个修复已经合入,消除了 `SessionSummary.summarize` 中冗余的 diff payload 写入。此外,Desktop 应用上又出现了一轮针对屏幕阅读器的无障碍回归问题。

## 版本发布

_过去 24 小时内无新版本发布。_

## 热门议题

1. **[#37790](https://github.com/anomalyco/opencode/issues/37790)** — **OpenCode Go 订阅已支付但工作区显示 "Insufficient balance"**(20 条评论)。严重计费缺陷:Stripe 扣款成功,但额度始终未到账。这是今日访问量最高的议题,并与多条关联报告一致。

2. **[#37231](https://github.com/anomalyco/opencode/issues/37231)** — **来自 Provider (Console Go) 的错误: Upstream request failed**(10 条评论,已关闭)。跨端点的中断,影响 CLI、桌面应用以及 OpenChamber VSCode 扩展——所有 Console Go 模型均不可用。

3. **[#37815](https://github.com/anomalyco/opencode/issues/37815)** — **Kimi K3 在 Console Go 上专门抛出 upstream 错误**(9 条评论,9 👍)。该议题颇受欢迎,因为它精确地隔离出模型层面的故障,而不是笼统的全局中断,有助于分类排查。

4. **[#34087](https://github.com/anomalyco/opencode/issues/34087)** — **OpenCode 不返回响应**(8 条评论,5 👍)。高影响的功能性回归——请求能进入"thinking"阶段,但始终没有最终输出流式返回。在 Go 和 Zen provider 的 v1.16.2 上可复现。

5. **[#48604](https://github.com/anomalyco/opencode/issues/48604)** — **支付已扣款但额度未更新(支付宝,工作区 `wrk_01KZRXBAM6RNF1HZX921YNQJWF`)**(4 条评论)。与 #37790 属于同一类问题——支付宝扣款成功后,credits 端点仍返回 `$0.00`,提示存在跨 provider 的 webhook 缺口。

6. **[#48497](https://github.com/anomalyco/opencode/issues/48497)** — **长期持久化记忆系统(`/teach`, `/recall`, `/learn`, `/memory`)**(4 条评论)。今日最实质性的功能请求——提议构建一个一等公民的持久记忆层。

7. **[#40111](https://github.com/anomalyco/opencode/issues/40111)** — **按 MCP 服务器配置的信任设置**(4 条评论)。企业用户希望为 MCP 服务器(OPNsense、Proxmox、Home Assistant、内部 K8s)启用自签名/私有 CA 证书的白名单。

8. **[#42409](https://github.com/anomalyco/opencode/issues/42409)** — **`tool.execute.before` hook 无法修改 `output.args.command`**(3 条评论)。Windows / PowerShell 上的插件 API 契约缺陷——文档说明的可变更操作被 shell 工具默默忽略。

9. **[#36288](https://github.com/anomalyco/opencode/issues/36288)** — **本地 MCP 服务器不可达,导致所有基于文件的 TUI 命令被静默隐藏**(3 条评论)。影响用户体验:单个 MCP 探测失败就会让 `/command` 面板丢失自定义斜杠命令,且没有任何错误提示。

10. **[#48645](https://github.com/anomalyco/opencode/issues/48645)** — **1.18.30 回归: 每次输入都会在 `SystemPrompt.environment` 中抛出 `TypeError`**(1 条评论)。全新会话首条消息即触发的新崩溃——看似简单,但在最新版本上会完全阻断使用。

## 关键 PR 进展

1. **[#48638](https://github.com/anomalyco/opencode/pull/48638)** — **fix(core): 消除回合 diff 带来的持久化事件写入放大**(open)。关闭 [#48641](https://github.com/anomalyco/opencode/issues/48641)。用更紧凑的会话状态表示,替代每回合不可变行的写入。

2. **[#48630](https://github.com/anomalyco/opencode/pull/48630)** — **fix(opencode): 列出文件命令时不再阻塞 MCP 连接**(open)。关闭 [#36288](https://github.com/anomalyco/opencode/issues/36288)。通过不在列出文件命令前等待 MCP 连接,将 `/command` 初始化延迟从约 5.6s(9 个 MCP 服务器)降至约 0.65s。

3. **[#48600](https://github.com/anomalyco/opencode/pull/48600)** — **fix(app): 稳定移动端时间线触摸滚动**(open)。修复在 iPhone 上由于滚动中行高回流导致的 544px 手指拖动偏移,并保留跨图像批次的阅读锚点。

4. **[#48632](https://github.com/anomalyco/opencode/pull/48632)** — **fix(tui): 恢复 SSH 下终端能力检测**(open)。关闭 [#39923](https://github.com/anomalyco/opencode/issues/39923)。opentui 的自动远程检测在 Mac→Linux 的 SSH 会话中处理不当,导致颜色显示异常。

5. **[#28973](https://github.com/anomalyco/opencode/pull/28973)** — **feat(provider): 通过 `/v1/models` 增加 Requesty 模型发现**(open,长期未合并)。关闭 [#16344](https://github.com/anomalyco/opencode/issues/16344)。用 Requesty 实时审批的模型与路由数据替代静态快照。

6. **[#48646](https://github.com/anomalyco/opencode/pull/48646)** — **docs: 增加 npm v11/v12 `--allow-scripts` 说明**(open)。在 README 故障排查章节中记录 #39660 的安装绕过方法。

7. **[#48627](https://github.com/anomalyco/opencode/pull/48627)** — **fix: 让 skill 斜杠默认值与文档对齐**(closed,已被取代)。#48022/#48023 的后续,修正了错误前提——实际存在差异的端面是 mini TUI 和 ACP,而非 main/desktop。

8. **[#46562](https://github.com/anomalyco/opencode/pull/46562)** — **feat(tui): 将助手消息底部行变为可替换插件**(open)。关闭 [#46268](https://github.com/anomalyco/opencode/issues/46268)。将 `▣ mode · model · duration` 这一行外部化为可插拔的页脚。

9. **[#48620](https://github.com/anomalyco/opencode/pull/48620)** — **fix(tools): 优化不可用工具的错误提示**(closed)。当模型请求了当前注册表中不存在的工具时,提供更清晰的反馈——在 Core tool registry 和 AI tool dispatcher 中保持一致。

10. **[#43038](https://github.com/anomalyco/opencode/pull/43038)** — **fix(opencode): 处理字面量的 Windows 归档路径**(closed)。通过子进程环境变量而非 PowerShell 插值传递 Windows 归档/目标路径,避免反引号与引号被破坏。

## 功能请求趋势

从 issue / PR 积压中提炼:

- **记忆与长期上下文**:通过显式命令(`/teach`, `/recall`, `/learn`, `/memory`)提供跨会话知识的一等公民持久化能力。
- **MCP 运维成熟度**:按服务器配置 TLS 信任;在 MCP 服务器慢/不可达时非阻塞地发现命令;更清晰的 `HttpApi` 下 MCP 子进程生命周期。
- **多 Agent 编排**:类 Claude Code 的 Subagents / "ultracode" 模式([#48612](https://github.com/anomalyco/opencode/issues/48612))——单 agent 循环越来越被视为不够用。
- **无障碍**:在 Desktop 上实时将流式 / thinking / 工具调用内容暴露给屏幕阅读器(NVDA)——存在多条并发报告([#46396](https://github.com/anomalyco/opencode/issues/46396), [#41408](https://github.com/anomalyco/opencode/issues/41408))。
- **TUI 体验**:浏览器风格的 Tab 历史/恢复([#48635](https://github.com/anomalyco/opencode/issues/48635))、Ctrl+C 下的提示草稿恢复([#48636](https://github.com/anomalyco/opencode/issues/48636))、外部编辑器启动配置([#48648](https://github.com/anomalyco/opencode/issues/48648))、切换侧边栏命令([#48614](https://github.com/anomalyco/opencode/issues/48614))。
- **国际化**:`opencode2` beta 上的原生 RTL / 阿拉伯语双向支持——解决 4 个相关 issue([#38524](https://github.com/anomalyco/opencode/issues/38524), [#40004](https://github.com/anomalyco/opencode/issues/40004), [#39525](https://github.com/anomalyco/opencode/issues/39525), [#32984](https://github.com/anomalyco/opencode/issues/32984))。
- **隐私/控制 UI**:统一的隐私与控制中心,提供紧凑的设置仪表板([#48583](https://github.com/anomalyco/opencode/issues/48583))。

## 开发者痛点

- **Console Go 的计费对账已损坏**:至少存在三种用户可见的失败模式(Stripe、支付宝、通用工作区余额),本质都是"支付成功,额度不到账"。这是恢复信任的首要任务。
- **Console Go 上游不稳定**:跨多个模型反复出现 "Upstream request failed" 错误,正在削弱用户对托管 provider 路径的信心。
- **静默的 UX 故障**:MCP 探测失败和 TUI 在 null server 响应下的崩溃,虽然日志中记录得很响亮,但对用户却悄无声息——文件命令消失,或整个 UI 直接崩溃。
- **持久化事件表膨胀**:每个回合都将完整 git diff 重新 fork 到新的不可变行中,导致存储膨胀速度远超会话内容本身——目前正在修复中。
- **Desktop 上的无障碍回归**:屏幕阅读器用户无法实时跟随流式 thinking / 工具调用——对相当一部分用户群体形成使用障碍。
- **安装/文档摩擦**:npm v11/v12 的 lifecycle-script 默认行为悄悄破坏安装;Windows 归档目标的 PowerShell 路径处理;shell 提示前缀被一起复制为 `$ `。都是小问题,但累积的摩擦很重。
- **成本核算缺口**:DeepSeek 的峰时/谷时定价仅存储为谷时值,因此在峰时段显示的费用会偏低。
- **跨会话的 thinking block 复用**:API 拒绝与错误会话绑定的 `signature` 字段,迫使用户手动剥离 reasoning block([#48637](https://github.com/anomalyco/opencode/issues/48637))。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区速递 — 2026-09-12

## 今日要点
最活跃的帖子仍然是 [#4945](https://github.com/earendil-works/pi/issues/4945)，关于 `openai-codex` / `gpt-5.5` 的连接可靠性问题——TUI 卡在 "Working…" 没有流式输出（78 条评论，33 👍）。mitsuhiko 的 PR 栈中落了一个重要的架构调整：[#9116](https://github.com/earendil-works/pi/pull/9116) 和 [#9117](https://github.com/earendil-works/pi/pull/9117) 引入了对话中途的系统消息（mid-conversation system messages），让扩展可以在不重写顶层系统提示（system prompt）的前提下修改提示词和工具加载配置。Windows 支持也有了实质性进展，[#9501](https://github.com/earendil-works/pi/pull/9501) 和 [#9504](https://github.com/earendil-works/pi/pull/9504) 统一了 shell 发现逻辑。

## 发布
过去 24 小时内没有新发布。

## 热门 Issue

1. **[#4945 — openai-codex 连接可靠性问题（78 条评论，33 👍）](https://github.com/earendil-works/pi/issues/4945)** — 通过 `openai-codex` 使用 `gpt-5.5` 时，TUI 经常卡在 "Working…" 状态，没有流、没有工具调用、也没有错误。只能按 Esc 恢复。已标记为处理中，是当前获赞最多的活跃 bug。
2. **[#7547 — 你们在 Windows 上怎么用 Pi？（62 条评论）](https://github.com/earendil-works/pi/issues/7547)** — 收集 Windows 上零散的运行/安装路径，用来聚焦工程力量的元 issue。对于任何要在 Windows 上交付 Pi 的人来说都是一份权威参考。
3. **[#9052 — 全屏模式下滚轮速度慢 3 倍（9 条评论，4 👍）](https://github.com/earendil-works/pi/issues/9052)** — 从普通 TUI 迁移到全屏模式的用户遇到了 3 倍的滚动速度回退。表明用户希望全屏布局能被当作一等公民。
4. **[#5323 — 改进 Vertex + GCP metadata server 支持（9 条评论）](https://github.com/earendil-works/pi/issues/5323)** — 对 `GOOGLE_APPLICATION_CREDENTIALS` / gcloud config 调用 `existsSync` 会返回错误的认证状态；需要一次真正的 metadata-server 探测。
5. **[#8928 — 并行启动 pi 时报 "No API key found" 持续约 48 秒（7 条评论）](https://github.com/earendil-works/pi/issues/8928)** — 多进程启动时，另一个 provider 的过期 OAuth 凭据会把当前活跃 provider 阻塞将近一分钟。附带了可确定性复现的步骤和时序数据。
6. **[#5372 — 允许自定义 OAuth 回调页面渲染（5 条评论）](https://github.com/earendil-works/pi/issues/5372)** — 扩展希望能定制 OAuth 成功/失败页面的品牌样式，而不是只能使用内置的 `renderPage`。
7. **[#9311 — 全屏模式下鼠标选区在会话切换后仍然保留（5 条评论）](https://github.com/earendil-works/pi/issues/9311)** — 全屏 TUI 中的选区状态会跨会话切换泄漏，应当在切换时清除。
8. **[#7321 — Termux 上多行粘贴失效（5 条评论）](https://github.com/earendil-works/pi/issues/7321)** — 由于缺少 bracketed-paste 支持，首个 `\r` 会触发提交而不是插入粘贴内容。这限制了 Pi 在移动 Android 终端上的可用性。
9. **[#6108 — `/reload` 会重新触发扩展依赖的副作用（5 条评论）](https://github.com/earendil-works/pi/issues/6108)** — Linux 发布版二进制每次 reload 时都会重跑 `@plannotator/pi-extension` → `@pierre/diffs` 的副作用，导致注册的主题重复。
10. **[#5365 — 用 bun 安装的 Pi 实际跑在 node 上（已关闭，4 条评论）](https://github.com/earendil-works/pi/issues/5365)** — bun 安装的 Pi 在 `undici` 的 `cachestorage` 中崩溃，因为 Node 兼容垫片没有完整应用。虽已关闭，但对安装文档有借鉴意义。

## 重点 PR 进展

1. **[#9116 — feat(ai): 添加对话中途系统消息](https://github.com/earendil-works/pi/pull/9116)** — #8998 拆分的第一层。在 pi-ai 中打通了一个新的 system-message 角色，会话中途的变更不再需要重写顶层提示。
2. **[#9117 — feat(coding-agent): 将提示与工具变更作为 system message 增量下发](https://github.com/earendil-works/pi/pull/9117)** — 叠加在 #9116 之上；把 coding agent 的工具/提示变更改造为增量下发，而不是整段覆盖系统提示。
3. **[#9488 — fix(ai): 添加规范的 Codex 轮次归属](https://github.com/earendil-works/pi/pull/9488)** — 新增 provider 中立的 `requestIdentity`，让重试、steering 和压缩恢复能够跨工具续接串联起来。
4. **[#9442 — fix(ai): 为兼容代理允许 prompt cache key](https://github.com/earendil-works/pi/pull/9442)** — `compat.supportsPromptCacheKey` 让兼容代理在默认短保留时长下能收到 `prompt_cache_key`。
5. **[#8572 — feat(ai): amazon bedrock mantle](https://github.com/earendil-works/pi/pull/8572)** — 为 Bedrock 上托管的 OpenAI 模型新增 Mantle 接入面（对应 #5363）。WIP，等待 API key 权限。
6. **[#9489 — fix(bedrock-converse): 按模型系列把总输入用量归一为净输入用量](https://github.com/earendil-works/pi/pull/9489)** — Anthropic 上报的是缓存后的净用量，其他系列上报的是总用量。让 `usage.inputTokens` 在各系列间保持一致（修复 #8752）。
7. **[#8635 — fix(ai): 在延迟初始化期间保留被中止的 stop reason](https://github.com/earendil-works/pi/pull/8635)** — 中止信号现在可以扛过延迟的 auth-stream 初始化；新增了「工具执行期间中止」场景的回归测试。
8. **[#9501 — fix(coding-agent): 从安装目录解析 Windows shell](https://github.com/earendil-works/pi/pull/9501)** — 统一并文档化 Windows shell 发现流程；收尾了 Windows 元 issue #7547。
9. **[#9504 — fix(coding-agent): 接受 Windows Store 的 shell 别名](https://github.com/earendil-works/pi/pull/9504)** — 使用 `accessSync(F_OK)`，避免 Store 上的可执行别名被 `existsSync` 的 EACCES 怪行为拒掉。
10. **[#9517 — feat(tui): 将长串工具调用分组展示](https://github.com/earendil-works/pi/pull/9517)** — 把 6 次以上的连续工具调用折叠成单条可点击展开的记录行；失败调用仍保留展示。

（本次批次中的提名：[#9505 samplingParams](https://github.com/earendil-works/pi/pull/9505)、[#9514 可配置快捷键](https://github.com/earendil-works/pi/pull/9514)、[#9503 浅色主题警告对比度](https://github.com/earendil-works/pi/pull/9503)、[#9523 核心对话框的 ui_prompt spans](https://github.com/earendil-works/pi/pull/9523)、[#8627 给 cwd 相关工具提供 ctx.cwd](https://github.com/earendil-works/pi/pull/8627)。）

## 热门讨论

**Show and tell**
- [#9525 — 感谢 —— `--mode rpc` 是一个新开源项目的支柱](https://github.com/earendil-works/pi/discussions/9525) — kamilakis 构建了 [web-agent](https://github.com/kamilakis/web-agent)，这是一个围绕持久化 Pi 会话打造的手机仪表盘，外加 Siri/Matrix 桥接。对 Pi 的 RPC 扩展性来说是一次很好的验证。

**想法 / 协议空白**
- [#9516 — openai-responses: function_call_output 中的工具结果图片被兼容网关丢弃](https://github.com/earendil-works/pi/issues/9516) — 目前 `function_call_output.output` 使用 `input_image`，这对 Responses 合法，但部分兼容 Chat-Completions 的网关会拒绝。建议双编码，让同一负载在两种接入面上都能工作。

## 功能请求趋势

1. **Windows 作为一等公民。** Shell 发现（PR #9501、#9504）、PowerShell D 盘兜底（#9490）、Shift+Enter（#7175）、`taskkill`/孤儿 pipeline（#9129）以及 Store shell 别名 —— 都说明 Windows 用户想要的是对等，而不是特例。
2. **扩展 API 扩展。** 可编程的 `auth.json` 持久化（#7658）、公开的 OAuth 渲染钩子（#5372、#6930）、以及给 cwd 相关工具提供 `ctx.cwd`（#8627）—— 扩展正在成为一个需要稳定契约的重要接入面。
3. **Provider 接入面覆盖。** Bedrock Mantle（#8572）、代理可选的 prompt-cache-key（#9442）、Vertex metadata server（#5323）、Bedrock 用量归一化（#9489）、`model.samplingParams`（#9505）—— provider 差异化的速度超过了抽象层能吸收的速度。
4. **TUI 打磨与可访问性。** 可配置快捷键（#9514）、PageUp/Down 覆盖（#7629）、全屏滚动对等（#9052）、bracketed-paste 兜底（#7321）、工具调用分组（#9517）。
5. **可靠性与可观测性。** 规范的轮次归属（#9488）、`stream_read_error` 上的自动重试（#9520）、原生对话框的 `ui_prompt_*` spans（#9522）、无竞态的通知面（#9462）。

## 开发者痛点

- **Codex/OpenAI 挂起。** 远超其他项的头号抱怨；用户会丢失对话轮次，只能 Escape 恢复，且没有任何错误栈。
- **多进程启动卡顿。** 过期 provider 的 `auth.json` 凭据会把当前活跃 provider 阻塞数十秒。
- **Windows 特有的摩擦。** shell 路径不一致、非 `C:` 安装下 PowerShell 缺失、bash 超时产生的孤儿 pipeline —— 让 Windows 用户撞上一长串小而致命的 bug。
- **终端兼容性差距。** Termux（无 bracketed paste）、iTerm2 内联图片（#9519 —— 缺少重绘路径）、Windows Terminal Shift+Enter。
- **静默失败。** frontmatter 错误的提示模板会静默消失（#9354）；user_bash 路由异常会回退到宿主执行（#9068）；本地 vLLM 上的假阳性缓存未命中提示（#9013）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-12

## 1. 今日要点

今日的活动以**运行时边界上的稳定性加固为主线**：同一日接连出现一起由并发后台代理引发的 P1 级 TUI 崩溃、一起因 DashScope 路由至非 Qwen 模型时元数据不兼容导致的 P1 级 400 错误，以及一起已关闭但仍持续跟踪的遥测导出隐私回归。设计层面，一个总览 issue（#11695）连同三个子 issue（#11696/#11697/#11698）正式确立了一项长期架构转向：**将代理框架（agent harness）与执行环境分离**，并配套凭证隔离以及可替换的执行后端。

## 2. 发布动态

**[v0.23.3-nightly.20260911.aaa6a32aae](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260911.aaa6a32aae)** — 渠道清理工作持续推进：删除钉钉集成中已废弃的后台响应聚合逻辑，并继续进行 `feat(channels)!` 的移除整理。本版本属于重构级别，未涉及面向用户的功能开关。

## 3. 热门 Issue

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — 后台代理完成时 TUI 因 React #185 静默退出（P1）** — 8 条评论。多个并发后台子代理触发 Ink 的 `useBoxMetrics` setState 循环，突破 React 最大更新深度后直接退回 shell 且未渲染任何错误，并污染下一会话的 "Previous session appears…" 提示。是当前影响最大的 UX 问题。
2. **[#11590](https://github.com/QwenLM/qwen-code/issues/11590) — 通过 DashScope OpenAI 兼容网关路由至非 Qwen 模型时，`metadata` 字段导致请求失败（P1）** — 4 条评论。删除一个被自动注入的字段即可恢复功能；该 issue 本质上是要求按模型粒度控制厂商特定的元数据注入。跨厂商兼容性是反复出现的主题。
3. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556) — vscode-ide-companion 0.23.1 在 Remote-SSH 下 webview 卡在加载（P1）** — 5 条评论。在 VSCode 1.137 服务端的 AArch64 Linux Remote-SSH 上稳定复现，webview 始终无法完成初始化。受影响的是整个 arm64 上的 Remote-SSH 用户群体。
4. **[#9693](https://github.com/QwenLM/qwen-code/issues/9693) — Qwen Desktop MCP 即使未启用 MCP，Windows 上仍报 `-32000 Connection closed`（P2）** — 6 条评论。该问题自 8 月底以来持续存在；即便 MCP 处于空操作状态仍报告连接失败，疑似存在一次无条件启动探测。
5. **[#11665](https://github.com/QwenLM/qwen-code/issues/11665) — Responses 清理过程可能打断 reasoning 与 tool-call 的相邻性（P2）** — 5 条评论。OpenAI Responses 流程在清理时可能将 `reasoning`+`function_call` 配对拆分，重放时违反 API 的相邻性约束。是近期 Responses 工作的架构跟进。
6. **[#11657](https://github.com/QwenLM/qwen-code/issues/11657) — Fireworks 上的 Qwen3 工具调用在镜像 `messages[].reasoning` 第二轮返回 400（P1）** — 3 条评论。首轮成功，第二轮被拒；与 #9453 已部分解决的同一 `thoughtSignature` 归属缺口相关。
7. **[#11577](https://github.com/QwenLM/qwen-code/issues/11577) — 目标检查点在溢出场景下重试同一请求直至熔断器触发（P2）** — 4 条评论。属守护进程侧问题：在三次连续失败之前一直重复发起相同的请求，而非调整证据窗口；最终触发 Goal 中止。
8. **[#11695](https://github.com/QwenLM/qwen-code/issues/11695) — Tracking: 将代理框架与执行环境分离（P2, needs-discussion）** — 4 条评论。架构拆分（Track A/B/C，对应 #11696/#11697/#11698）的总览 issue。定义的是跨多个季度的演进方向，而非单一修复。
9. **[#11710](https://github.com/QwenLM/qwen-code/issues/11710) — 虚拟视口退出时残留脏状态（P2）** — 3 条评论。通过 Ctrl-D/Ctrl-C/`/exit`/`/quit` 退出后会破坏 alt-screen；随后运行 `nano` 会输出 `[ Unknown sequence ]`。影响所有使用 VP 模式的终端模拟器用户。
10. **[#11499](https://github.com/QwenLM/qwen-code/issues/11499) — `.mcp.json` 中的 `${VAR}` 占位符未被展开（P2）** — 4 条评论。文档中给出的 `headers` 示例会按字面字符串发送 `${MY_TOKEN}`。是一项存在已久的、与安全相关的 UX 缺口。

## 4. 关键 PR 进展

1. **[#11670](https://github.com/QwenLM/qwen-code/pull/11670) — fix(telemetry): 对 `logPrompts` 启用 `request_text`/`response_text` 的条件判断（已关闭）** — 关闭 #11666 中报告的数据隐私回归；`LoggingContentGenerator` 现在会在 `logPrompts=false` 时省略这两个属性，避免会话内容通过 OTLP 导出。
2. **[#11610](https://github.com/QwenLM/qwen-code/issues/11610) — hooks: 将 hook 契约与 Claude Code 对齐** — 含三个跟进项的跟踪 issue（stop_hook_active 语义、默认 600s 超时、明文 stdout、matchers、common input）。Hooks 引擎在结构上已完备，本 PR 负责收齐契约边界。
3. **[#11538](https://github.com/QwenLM/qwen-code/pull/11538) — feat: 按模型选择 OpenAI API** — 在 `modelProviders.openai` 下为模型级配置新增 `api: "chat-completions" | "responses"`。可在不改动 provider 表面的前提下，将指定模型路由至 OpenAI Responses。
4. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086) — feat(serve): 将扩展限定在工作区运行时范围内** — 将全局扩展目录与实时工作区运行时对齐，开放工作区限定的守护进程与 SDK 访问，并更新 `@` 菜单及扩展管理 UX。
5. **[#11594](https://github.com/QwenLM/qwen-code/pull/11594) — feat(workflow): 通过原生工具支持预编排流程** — 外部调用方可以预先编排好流程脚本，再由代理通过原生 Workflow 工具执行；来源信息会随结果/快照/恢复一并传递。
6. **[#10410](https://github.com/QwenLM/qwen-code/pull/10410) — feat(core): 为延迟工具保留 prompt cache** — 用 `tool_search` / `tool_call` 两步桥接替代延迟工具的 schema 揭示方式，保持声明的工具列表稳定，从而让 prompt cache 命中在多轮间持续生效。
7. **[#11705](https://github.com/QwenLM/qwen-code/pull/11705) — feat(cua): 新增 app-bound 操作与紧凑的原生观察结果** — 增加 macOS Computer-Use 的 app 句柄（安装身份、窗口选择、短元素 ID），并将原生 AX 观察结果折叠为紧凑形式，从面向模型的 API 中移除前台/后台的选项。
8. **[#11700](https://github.com/QwenLM/qwen-code/pull/11700) — feat(web-shell): 改进上下文总览并增加手动压缩** — 剩余 token/分类明细、快照标注、按需刷新，使 Web Shell 的上下文面板从装饰性变为可操作。
9. **[#10906](https://github.com/QwenLM/qwen-code/pull/10906) — feat(web-shell): 展示 shell 与 monitor 任务输出** — 将 Monitor 的 stdout/stderr 与 Shell 捕获结果一并持久化，并新增一个仅返回该会话所有者可读、已清洗缓冲区尾部的实时会话接口，供任务详情面板使用。
10. **[#11562](https://github.com/QwenLM/qwen-code/pull/11562) — fix(cli): 将一次性系统提醒移出用户消息本身** — 折叠进 prompt 的一次性提醒不再回显到对话记录、上箭头召回历史以及取消回合后的编辑器回填；虽小却是一次有意义的 UX 修正。

## 5. 功能请求趋势

- **框架/执行器分离**（#11695 总览 → #11696/#11697/#11698）。本周期最受关注的演进方向：可替换的执行后端（含一个容器参考实现）、面向 MCP/云端密钥的结构化凭证隔离，以及"执行环境作为一种可寻址资源"，并以阿里云作为参考实现。
- **多平台覆盖面扩展** — 基于 `qwen serve` 的 Android 伴随客户端（#11704）；macOS app-bound Computer Use（#11705）。
- **Web 搜索 UX** — 提供真实的页面标题，以便模型按工具描述要求生成 `[title](url)` 形式的引用（#11564）。
- **上下文控制** — Web Shell 中支持手动压缩并准确展示剩余容量（#11700）。
- **按模型选择 API** — 让 `modelProviders.openai` 下的模型可在不改动 provider 表面的前提下选择 Responses 端点（#11538 → #11538）。
- **与 Claude Code 的 Hook 契约对齐** — 形成文档化的对齐清单（#11610），涵盖 stdout 格式、stop_hook_active、超时单位、matchers、common input。

## 6. 开发者痛点

- **后台代理并发时 TUI 静默崩溃** — 流量最高的单一 issue（#11500），反映出的核心痛点是：一次"冒烟测试"的多代理运行就可能在毫无报错信息的情况下破坏下一次会话。
- **跨厂商兼容性问题** — 经 DashScope OpenAI 兼容网关发往非 Qwen 后端的 Qwen 特定元数据字段会直接触发 400（#11590）；同一 `thoughtSignature` 归属缺口在 Fireworks 上再次浮现（#11657）。
- **Windows + Remote-SSH** — 两个独立的 P1（#9693 MCP、#11556 webview）分别击中 Windows 与 Remote-SSH 用户，且在 CI 中缺少可复现的上游路径。
- **`.mcp.json` 易用性** — 未文档化的 `${VAR}` 不展开行为（#11499）会原样发送占位符字符串，构成一种用户预期之外的、潜在的凭证泄露形态。
- **遥测/隐私泄露** — `logPrompts=false` 一度未被一致遵守（#11666、#11667），#11670 仅修复了请求/响应路径；更广泛的调试日志脱敏仍处于审计中。
- **终端 UX 回归** — VP 模式退出时的脏状态（#11710）以及长负载下 OpenTUI 确认渲染异常（#11658/#11659），使 TUI/性能边界持续脆弱。
- **守护进程会话管理正确性** — 对相同 `mtimeMs` 的文件做分页时会永久跳过部分文件（#11706）；Live-task 线程缺少来源标注（#11707）；`output-language` 规则文件写入在只读主目录下崩溃（#10455）。
- **Hooks 契约模糊地带** — stop-hook 阻塞计数在工具调用往返间被重置（#11673），且在没有 `MessageBus.request` 超时修复（#11688 → #11610）之前无法落地默认 600s 超时。

---

*本摘要基于 GitHub 数据生成，仓库为 [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code)。P1/P2/P3 优先级沿用项目自身的 `priority/*` 标签。*

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*