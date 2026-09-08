# AI CLI 工具社区动态日报 2026-09-08

> 生成时间: 2026-09-08 11:30 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比报告 — 2026-09-08

## 1. 生态总览

AI CLI 领域已整合为三个梯队：厂商旗舰级 CLI（Claude Code、Codex、Gemini CLI），用户基数庞大且产品矩阵广泛；生态锚定型工具（Copilot CLI、Qwen Code），分别依托 GitHub 与中国市场集成；以及规模较小、迭代迅速的小厂挑战者（OpenCode、Pi），在供应商中立性与可扩展性上展开竞争。七个社区正在向同一批硬骨头收敛——持久记忆、多智能体编排可靠性、上下文压缩、Windows 兼容性——同时在表层策略（TUI vs. 桌面 vs. 守护进程/Web）上形成差异。值得注意的是，头部厂商的问题增长速率已显著超过修复速率，stale-bot 自动关闭问题正成为可见的摩擦点。与此同时，围绕这些智能体的第三方会话审计与上下文路由工具生态正在成形，标志着该品类的成熟。

## 2. 活跃度对比

| 工具 | 问题（汇总） | PR（汇总） | 讨论（汇总） | 发布（过去 24h） |
|---|---|---|---|---|
| **Claude Code** | 50（展示前 30） | 1（已关闭） | N/A — 拉取中无数据 | 无 |
| **OpenAI Codex** | 14 | 17 | 12（4 个 Ideas、3 个 Q&A、5 个 Show & Tell） | `rust-v0.154.0-alpha.6`（预发布） |
| **Gemini CLI** | 10 | 14 | n/r | `v0.60.0-nightly.20260908` |
| **Copilot CLI** | 10 | 3 | n/r | 无 |
| **OpenCode** | 10 | 12 | n/r | 无 |
| **Pi** | 15 | 15 | 2（1 个 Show & Tell、1 个 Idea） | 无 |
| **Qwen Code** | 10 | 11 | n/r | `v0.23.0-nightly.20260907` |

> *计数反映各摘要中汇总到的条目数，并非仓库绝对总数。"n/r" 表示摘要中未上报该频道；七个仓库在上游均未禁用 Issues/PRs。Claude Code 的摘要明确省略了 Discussions 数据。*

**关键解读：** Codex 显示出最强的工程产出（17 个 PR，包含协调一致的架构批次）。Gemini CLI 与 Qwen Code 保持 nightly 发布节奏。Copilot CLI 处于罕见的静默落地窗口（3 个 PR，官方自述为异常情况）。Claude Code 今日问题量最高，但 PR/发布活动接近于零。

## 3. 共性演进方向

1. **智能体持久记忆** — *Claude Code、Codex、Gemini CLI、Copilot CLI、Pi。* Codex 发布了 Memory v2（可配置版本、分层证据筛选、隔离存储——#43797–#43800）；Gemini CLI 正在完善 Auto Memory（脱敏、有界重试——#26516–#26525）；Claude Code 用户要求 `MEMORY.md` 阈值可配置（#91188）；Copilot CLI 暴露了一个跨仓库记忆**泄露** Bug（#3945）；Pi 正在研究压缩后决策记忆（#9312）。共同诉求：显式作用域、隐私保障与用户可控性。
2. **压缩与长会话可靠性** — *全部七个。* Pi 的压缩在 Anthropic 上可能永久破坏会话（#8667）；Copilot CLI 的 `/compact` 在 3 次重试后失败（#2861）；OpenCode 的自动压缩在 `invalid_prompt` 时中断排空（#47939）；Codex 修复了跨压缩的推理强度泄露（#43796）；Claude Code 在 1M 窗口上误算上下文百分比（#73399）；Gemini CLI 的 `/compress` 无法跨恢复存活（#21335）。
3. **多智能体编排与可观测性** — *Claude Code、Codex、Gemini CLI、OpenCode、Qwen Code。* 反复出现的模式：**静默成功掩盖真实失败**——Gemini CLI 在 MAX_TURNS 用尽时仍报告 `GOAL`/`success`（#22323、#21983）；Claude Code 的 `SendMessage` 返回 `success: true` 却遗弃消息（#85949）；Codex 的协调器在侧向提问后放弃运行（#43750）。OpenCode 正在构建智能体活动面板（#27995、#47455）；Qwen Code 将工作流运行可视化（#10594）。
4. **Windows 兼容性** — *7 个工具中 5 个。* Pi 的 61 条评论 Windows 调研（#7547）、Qwen Code 的 ConPTY 进程泄露（347 个子进程 / 约 2.8 GB，#11303–#11353）、Codex 的 Windows 桌面集群（pets、项目同步、marketplace）、Claude Code 的 TUI 路径解析（#91129）、Copilot CLI 的会话阻塞（#4756）。
5. **权限与安全可配置性** — *全部七个。* 需求集中在可观测、可逆、可选择退出的控制：Claude Code 的 ClAudit 误报（#85375–#85392）与浏览器硬阻塞（#90724）；Codex 的不可见站点"软黑名单"（#29343、#43068）；Copilot CLI 的失败关闭 `--yolo`（#4757）；Gemini CLI 的沙箱加固 PR；OpenCode 的逐会话可逆 Yolo（#47918）；Qwen Code 的钉钉权限卡片（#10457）。
6. **成本/配额透明度** — *Codex、OpenCode。* Codex 同时全模型"容量"错误（#43368）与用量 API 请求（#43788）；OpenCode 的付费计划禁用与计费争议（#47787、#47934）。

## 4. 差异化分析

| 工具 | 当下焦点 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 多智能体队友、Hooks、IDE/桌面/浏览器表层 | 企业级重度用户 | 强主张的默认配置；最广的表层矩阵；问题分诊承压 |
| **Codex** | 语音作为一等表层、Memory v2、用户验证流水线 | 从消费级到 Pro 的 ChatGPT 订阅用户 | 最高的内部 PR 速率；桌面/移动/浏览器/语音覆盖最广 |
| **Gemini CLI** | 沙箱加固、正确性修复、AST 感知的 Token 效率 | 开源开发者 | nightly 节奏；接受外部贡献者 PR（文档批次）；研究驱动的 EPIC |
| **Copilot CLI** | 权限治理、MCP 可靠性、会话生命周期 | GitHub 生态企业 | 策略感知（托管策略、失败关闭姿态）；安静的发布节奏 |
| **OpenCode** | 桌面插件模块化、多供应商目录 | 供应商中立的折腾型用户 | 扩展架构重构；Go/Zen 多模型计费表层 |
| **Pi** | 供应商适配器广度、扩展 API 完备性 | 扩展/智能体开发者 | 小团队快速迭代；OpenAI 兼容归一化；社区 GUI 搭建于其上 |
| **Qwen Code** | Web Shell/守护进程作为集成平台 | 集成方（渠道、IM、无头场景） | `qwen serve` 平台战略；autofix 自动化闭环；钉钉渠道 UX |

最显著的战略分化：**Codex 与 Qwen Code 在搭建平台**（语音、app-server、守护进程/Web 表层），**Gemini CLI 与 Pi 在硬化核心**（沙箱、流式、供应商正确性），而 **Claude Code 的差异化（teammates、hooks）恰是其最严重的静默失败 Bug 的高发区**。

## 5. 社区动能与成熟度

- **速率领跑者：** Codex（17 个 PR，协调的 Memory-v2 + TUI 验证批次）、Gemini CLI（14 个 PR + nightly，含外部贡献者）、Qwen Code（11 个 PR + nightly + 自动化 autofix 闭环）。
- **互动领跑者：** Claude Code（汇总 50 个 issue；issue ID 处于 91k 区间，暗示累计量比同行高一个数量级；置顶帖 38 条评论）与 OpenCode（141 条评论 / 109 👍 的记忆长帖，由维护者主导分诊）。
- **最健康的生态信号：** Codex 的 Discussions 区汇聚了五款活跃的第三方工具（CodexFuse、deja-vu、Compact Context、Blume.codes、DoneAudit）；Pi 在同一周期内闭环了合作伙伴上报的破坏性变更（#9290）。
- **风险信号：** Claude Code 在无维护者响应的情况下自动关闭了约 10 个 daemon/agent-view issue 为 stale，且多个高反应数 Bug（#36146、#44657）已挂起数月——互动度高，响应似乎已成瓶颈。Copilot CLI 当日 3 个 PR 处于低位，但很可能是暂时性的。

## 6. 趋势信号

1. **记忆正成为标准基础设施——早于其安全模型定型之前。** 跨仓库泄露（Copilot #3945）与上下文后脱敏（Gemini #26525）意味着安全团队应当**现在就**将智能体记忆视为新的数据边界，而非延后处理。
2. **"静默成功"是编排中的主导失败类型。** 在 Gemini、Claude、Codex 中，工作流*看起来*成功了，实际却失败。验证工具（DoneAudit）的出现标志着智能体自报告的"信任但验证"市场起步——可预见终态原因溯源将成为一项竞争差异化点。
3. **压缩即新崩溃。** 七个工具中有六个踩到压缩相关的正确性 Bug，长会话稳定性已被压缩质量卡住——这是生产采用的关键评估标准。
4. **CLI 正演变为无头平台。** `qwen serve`、Codex 的 app-server、OpenCode 的托管服务器标志着将智能体嵌入 CI、IM 渠道与自定义前端的需求；逐会话请求打标（Qwen #10995）是早期的集成方诉求。
5. **Windows 仍是行业级的二等平台**——可作为预判各工具下一波动荡来自哪里的可靠指标。
6. **成本透明度供给不足。** 误导性的容量错误与不透明的配额核算（Codex #43368、OpenCode 计费集群）正在侵蚀订阅信任；可预见对预检成本面板与用量 API 的压力。
7. **会话数据是新兴的资产类别。** 跨 24 个智能体进行索引与提炼的工具（deja-vu）提示开发者应当将会话日志视为可移植、可审计的制品，而非一次性状态。

**面向决策者：** Codex 与 Gemini CLI 在本周期提供最快的改进速率；Claude Code 提供最深的多智能体表层，但承担编排可靠性风险（待修复）；OpenCode 与 Pi 在扩展生态重要的场景下是可靠的供应商中立之选；Copilot CLI 适合策略治理型企业环境，尽管节奏较为安静。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告
**数据截至：** 2026-09-08 | **来源：** github.com/anthropics/skills

---

## 1. 热门 Skills 排名

按社区讨论量与话题影响力排序（本次快照未能获取 PR 评论数，因此排名综合了已列优先级和交叉引用 Issue 中的信号强度）。

### 1. skill-creator：修复 `run_eval.py` 0% 召回率 Bug — [PR #1298](https://github.com/anthropics/skills/pull/1298)
- **作者：** MartinCajiao | **状态：** OPEN
- **功能：** 修复 `skill-creator` 所用的评估框架，使 `run_eval.py`、`run_loop.py` 和 `improve_description.py` 能产出有意义的召回率信号，而不是对每个描述都报告 0%。
- **讨论要点：** 与 Issue #556 交叉引用，有 10+ 次独立复现；描述优化循环一直在"针对噪声做优化"——对任何迭代 Skill 描述的人来说，这都是关键的基础设施 Bug。

### 2. 新增 document-typography Skill — [PR #514](https://github.com/anthropics/skills/pull/514)
- **作者：** PGTBoos | **状态：** OPEN
- **功能：** 排版质量控制，防止 AI 生成文档中出现单词孤立换行、段落寡行与编号错位。
- **讨论要点：** 将排版问题定位为"影响 Claude 生成的每一份文档"——论点在于用户很少主动要求质量，因此必须主动执行。

### 3. 新增 skill-quality-analyzer 与 skill-security-analyzer — [PR #83](https://github.com/anthropics/skills/pull/83)
- **作者：** eovidiu | **状态：** OPEN（自 2025-11-06 起，是头部集合中悬而未决最久的）
- **功能：** 元 Skills，从五个质量维度（结构、示例等）对 Claude Skills 评分，并附带一个安全分析器。
- **讨论要点：** 直接回应生态系统日趋成熟带来的关切；与 Issue #492 的信任边界关切相互呼应，提供可落地的工具。

### 4. 新增 Hivemind：零成本多智能体编排 — [PR #1628](https://github.com/anthropics/skills/pull/1628)
- **作者：** Hanishchow | **状态：** OPEN
- **功能：** 将机械性子任务委托给使用免费模型的无头 opencode 工作进程，由 Claude Code 担任规划者、评审者与合并者——主张"昂贵的上下文比昂贵的智能更稀缺"。
- **讨论要点：** 以成本优化为切入点的架构模式；回应了 Issue #1487（token 膨胀）所隐含的成本担忧。

### 5. 改进 frontend-design Skill — [PR #210](https://github.com/anthropics/skills/pull/210)
- **作者：** justinwetch | **状态：** OPEN
- **功能：** 修订 frontend-design skill，使每条指令都能在单次 Claude 会话中可执行；减少歧义与过度规定。
- **讨论要点：** 涉及一个高频使用的 skill；改革目标是提升一致性，而非新增功能。

### 6. 新增 ODT（OpenDocument）Skill — [PR #486](https://github.com/anthropics/skills/pull/486)
- **作者：** GitHubNewbie0 | **状态：** OPEN
- **功能：** 通过 LibreOffice 创建、填写、读取和转换 ODT/ODS 文件；支持 ISO 标准的开放文档格式。
- **讨论要点：** 填补现有 PDF/DOCX skills 之外的显著格式空白；对开源/政府生态系统的用户尤为相关。

### 7. 新增 testing-patterns Skill — [PR #723](https://github.com/anthropics/skills/pull/723)
- **作者：** 4444J99 | **状态：** OPEN
- **功能：** 全面的测试栈指导——Testing Trophy 理念、AAA 模式、React 组件测试、纯函数启发式。
- **讨论要点：** 与从业者对工程最佳实践 skills 的强烈需求相吻合（见下文趋势 #2）。

### 8. 新增 self-audit Skill（v1.3.0）— [PR #1367](https://github.com/anthropics/skills/pull/1367)
- **作者：** YuhaoLin2005 | **状态：** OPEN
- **功能：** 交付前的审计，将机械的文件验证与四维推理质量门相结合，按损害严重程度排序。
- **讨论要点：** 与 Issue #1385（推理质量门流水线提案）相互呼应；标志着"交付验证"作为一类方向正在汇聚成形。

---

## 2. 社区需求趋势

提炼自热门前 15 个 Issue（按评论数排序）：

| 趋势 | 证据 |

---

# Claude Code 社区摘要 — 2026-09-08

## 1. 今日要点

Claude Code 仓库的活动主要由**长期存在的 Bug 讨论串和功能请求主导，而非新版本发布**，过去 24 小时内没有发布任何新版本。最活跃的讨论仍然是关于将自动记忆 `MEMORY.md` 的压缩阈值设为可配置的功能请求（#91188），同时一个获得大量点赞的 VS Code 扩展 UI Bug（首条消息置顶，#36146）持续吸引社区关注。一批围绕智能体视图、后台守护进程以及 ClAudit 误报的停滞 Issue 在没有维护者响应的情况下被自动关闭。

## 2. 版本发布

*过去 24 小时内没有新版本发布。PR 方面的最新动态仅限于今年早些时候关闭的一个 PR（#26175），该 PR 用于替换原生安装程序的引导脚本 — 今天没有可报告的合并变更。*

## 3. 热门 Issue

1. **[#91188](https://github.com/anthropics/claude-code/issues/91188) — 可配置的自动记忆压缩阈值（OPEN，38 条评论）**
   本周期讨论最多的帖子。用户希望将硬编码的 200 行 / 25KB `MEMORY.md` 提醒阈值设为可调整（或者可以独立关闭）。当前行为会对有意维护较大记忆文件的工作流产生破坏性的压缩提示。

2. **[#36146](https://github.com/anthropics/claude-code/issues/36146) — VS Code 扩展：首条消息被固定在聊天顶部（OPEN，28 条评论，42 👍）**
   一个长期存在的 UX Bug：用户的开场消息始终"粘"在 VS Code 聊天面板顶部，没有明显的方式可以关闭或滚动掉。高点赞数表明社区对 IDE 体验存在较大不满。

3. **[#44657](https://github.com/anthropics/claude-code/issues/44657) — 子智能体的 Write 工具拒绝写入以 report 命名的 `.md` 文件（OPEN，10 条评论，19 👍）**
   通过 `Agent` 工具派生的子智能体被禁止写入文件名以 `report`、`summary`、`findings` 或 `analysis` 开头的 `.md` 文件。没有可选项。这破坏了合法的文档工作流，是反应数最多的开放 Bug 之一。

4. **[#73399](https://github.com/anthropics/claude-code/issues/73399) — 1M 上下文模型变体的上下文使用百分比计算错误（OPEN，6 条评论）**
   使用 `claude-fable-5[1m]` 时，状态栏基于 200K 窗口而非实际的 1M 窗口计算上下文使用率。对于长上下文用户而言这是一个明显的 UX 回归。

5. **[#85949](https://github.com/anthropics/claude-code/issues/85949) — 分支技能的队友子智能体无法回复父智能体（OPEN，4 条评论）**
   一个隐蔽的死锁 Bug：向 `"team-lead"` 发出的 `SendMessage` 报告 `success: true`，但消息被静默地丢弃。父智能体无限期挂起，等待永远不会到来的回复 — 对多智能体编排而言是一个可靠性问题。

6. **[#82665](https://github.com/anthropics/claude-code/issues/82665) — `TeammateIdle` 钩子对携带父智能体身份的 worker 分支触发（OPEN，2 条评论）**
   分支 worker 的钩子负载与父智能体的负载逐字节相同，没有 `agent_id` 区分。这使得在分支拓扑中实现钩子的反馈循环逻辑成为不可能。

7. **[#79934](https://github.com/anthropics/claude-code/issues/79934) — 向 `"main"` 发送 `SendMessage` 解析到根会话而非调度器（OPEN，2 条评论）**
   嵌套子智能体通过 `SendMessage({to: "main"})` 发送的报告会被投递到根会话，绕过实际派生它们的编排器 — 这是一个破坏嵌套智能体流程的路由 Bug。

8. **[#91129](https://github.com/anthropics/claude-code/issues/91129) — Windows TUI：可点击的文件路径解析到了错误的基础目录（OPEN，1 条评论）**
   在 Windows 终端 UI 中，可点击的文件路径链接指向仓库子文件夹而非会话的 CWD，导致出现"文件未找到"错误。虽小但破坏了一个基本交互。

9. **[#90724](https://github.com/anthropics/claude-code/issues/90724) — Chrome 扩展中的 Claude 在 docs.google.com 上被硬性阻止（OPEN，1 条评论）**
   浏览器扩展拒绝加载 `docs.google.com`，且没有权限覆盖选项。对于 Google Workspace 工作流而言令人失望。

10. **[#92113](https://github.com/anthropics/claude-code/issues/92113) — Desktop 1.44121.x 静默移除了 Remote Control 自动启用（OPEN，1 条评论，1 👍）**
    一份回归报告：Desktop 1.44121.1 移除了对定时任务会话隐式自动启用 Remote Control 的功能。作者请求提供一个可选开关并发布 release note。这反映出 Desktop 与 CLI 配置契约之间持续存在的摩擦。

*值得注意的集群：大约十个来自同一 `agent-view`/`background-daemon` 领域的 Issue（#83554、#83050、#82129、#81630、#81456、#80923、#81071）在该时间窗口内全部因停滞被自动关闭，这暗示着要么守护进程可靠性方面得到的维护者关注减少了，要么停滞判定标准被收得更严了。*

## 4. 关键 PR 进展

活动窗口内仅出现**一个 PR**，并且它已经被关闭：

- **[#26175](https://github.com/anthropics/claude-code/pull/26175) — fix：替换损坏的原生安装程序引导脚本（CLOSED）**
  针对 `curl … | bash` 安装路径，该路径会在静默删除用户现有 npm 全局安装的同时，无法将 `~/.local/bin/claude` 创建为符号链接。PR 在数据中可见的状态为已关闭但未合并，但它代表了对首次安装流程的一项重要正确性修复。

## 5. 热门讨论

*本次数据拉取未提供 Discussion 数据 — 略去本节。*

## 6. 功能请求趋势

提炼所有开放的功能请求和标记为 enhancement 的 Issue：

- **硬编码限制的可配置性。** `#91188`（记忆压缩阈值）反映了用户希望为硬编码行为设置逃生口的更广泛模式 — 包括上下文窗口、文件大小上限和提醒阈值。
- **剪贴板 / 图片输入的便利性。** `#92824` 请求在 Windows 上直接将截图粘贴到控制台，取代当前先保存再拖拽的繁琐操作。
- **智能体寻址 / 路由语义。** `#79934` 和 `#85949` 均要求在嵌套智能体的 `SendMessage` 流程中实现更清晰、更确定性的寻址（`"main"` 与调度器的区分、队友邮箱）。
- **浏览器 / 桌面端的权限 UX。** `#90724`（Chrome 阻止 docs.google.com）和 `#92113`（Remote Control 开启选项）指向对 Claude-in-browser 和 Desktop 流程中更细粒度、可发现的权限控制的诉求。
- **钩子负载的丰富度。** `#82665` 请求在 `TeammateIdle` 负载中加入智能体标识 — 这是对钩子可观测性的反复请求。

## 7. 开发者痛点

今天 Issue 中浮现出的反复出现的挫败点：

- **长期开放的 Bug 毫无进展。** 多个 Issue（例如 3 月份的 #36146、4 月份的 #44657、7 月份的 #73399）已开放数月，进行了实质性讨论，但既无解决方案也无维护者确认。
- **Stale-bot 自动关闭可靠性报告。** 大量 agent-view / 后台守护进程相关的 Issue 在一天之内因停滞被关闭。在多智能体 / 守护进程方向工作的开发者认为这些领域被维护得不够。
- **多智能体编排存在毛刺。** 回复路由、钩子中的父 / 分支身份，以及 1M 变体的上下文窗口统计，都在产生静默失败或错误的数字 — 这是最糟糕的一类 Bug，因为工作流看似成功。
- **IDE / Desktop 集成出现回归。** VS Code 和 Desktop 应用引入了一些行为变更（粘性消息、被移除的自动启用），被视作未经文档化的回归，而非有意为之的 UX 调整。
- **ClAudit 误报阻碍合法工作。** 一系列模式相同的网络标志报告（#85375–#85392）描述了会话被强制中断的安全过滤过度触发情况，特别是在 Opus 4.8 上，这让防御性安全场景中的资深用户感到挫败。
- **对"贴心"默认值没有关闭选项。** #44657（子智能体文件名限制）和 #91188（记忆压缩）反映出一种更广泛的抱怨：Claude Code 做出了固执己见的行为选择，却没有提供任何关闭方式。

---

*摘要基于 `anthropics/claude-code` 的 GitHub 数据生成，覆盖截至 2026-09-08 的活动。条目数量：50 个 Issue（显示前 30 条），1 个 PR。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区周报 — 2026-09-08

## 今日要点

今天集中合入了一波内部 PR，正式确定了 **Memory v2 系统**（可配置版本、隔离存储、分层证据选取、仅摘要提取），以及完整的 **TUI 用户验证流水线**（请求簿记、提示组件、MCP 启用、应用服务器设备探测）。语音体验也获得了大幅升级，包括翻牌式转录动画、可配置的静音快捷键、语音编写器条，以及稳定化后的电平采样。

Bug 方面，社区仍在与 **Windows 专属的 Computer Use / Browser Use 不稳定**、**TUI 会话恢复失败**，以及在 Pro 层级模型上反复出现的 **"Selected model is at capacity"** 报错作斗争 —— 后者在不到 24 小时内收获了 6 个 👍。

---

## 发布

- **[rust-v0.154.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6)** — Codex Rust 核心的预发布版本；周报源中未提供 changelog 正文。可与现网配套的 `codex-cli 0.153.x` 构建一并追踪。

---

## 热门 Issue

1. **[#41513 — Windows 宠物窗口变为点击穿透且无法拖动](https://github.com/openai/codex/issues/41513)**（32 条评论，14 👍）— 内置和自定义悬浮宠物在 Windows 桌面上都丢失了命中测试；在两个构建上均可复现。由于宠物功能较新且视觉上显眼，可见度很高。
2. **[#18404 — Computer Use 插件在 macOS Intel 上不可用](https://github.com/openai/codex/issues/18404)**（27 条评论，17 👍）— 尽管 MCP 服务开关已打开，Computer Use 在 x86_64 Mac 上仍拒绝激活。今日获赞最多的 issue，是长期存在的平台对齐差距。
3. **[#42215 — Windows ChatGPT Work 本地聊天在项目上下文同步时失败](https://github.com/openai/codex/issues/42215)**（23 条评论）— 一个 23 个文件的项目反复触发文件系统阶段同步失败；该用户目前已无法在该项目中发起任何新的本地 Work 聊天。
4. **[#29343 — Chrome / 浏览器 / Computer Use 静默拒绝访问某些站点](https://github.com/openai/codex/issues/29343)**（21 条评论，7 👍）— 关于"软性黑名单"的长期抱怨，没有任何面向用户的提示。与 #43068 中提到的安全检查系统相关。
5. **[#42853 — GPT-6 Astra 在符合资格的 Pro 账户的模型选择器中缺失](https://github.com/openai/codex/issues/42853)**（18 条评论，4 👍）— Windows 桌面 26.901.4073.0 未向 Pro 用户暴露 Astra；而同层级的 macOS 则正常显示。属于模型发布的对齐缺陷。
6. **[#37754 — TUI 恢复失败：`list_turns is not supported yet`](https://github.com/openai/codex/issues/37754)**（16 条评论，4 👍）— `thread/resume` 在 TUI 启动期间调用了一个不受支持的方法，阻塞了 CLI 0.147.0 上任何已有本地会话的恢复。
7. **[#22851 — 移动端配对卡在"Waiting for desktop"状态](https://github.com/openai/codex/issues/22851)**（13 条评论，5 👍）— 远程控制守护进程无法使用已配置的代理，导致 iOS / Android 配对陷入无限等待。
8. **[#43368 — Terra、Luna、Sol、Astra 全部出现 "Selected model is at capacity"](https://github.com/openai/codex/issues/43368)**（7 条评论，6 👍）— Pro 20x 桌面用户反馈 *所有* 顶级模型同时显示容量已满，提示这更像配额 / 账户状态的 bug，而非真实的资源饱和。
9. **[#24222 — 在 General 和 Projects 之间移动会话](https://github.com/openai/codex/issues/24222)**（5 条评论，9 👍）— 今日获赞最多的增强请求：用户希望提供可逆、显式的流程来跨项目作用域迁移会话。
10. **[#43750 — 协调器在多智能体运行中因旁支提问而提前结束未完成的任务](https://github.com/openai/codex/issues/43750)**（5 条评论）— 子智能体编排会在用户中途追问时提前停止，导致已委派的工作被孤立遗留。

**其他值得一提：** [#41986](https://github.com/openai/codex/issues/41986) durable-rollout 任务历史被清空；[#43017](https://github.com/openai/codex/issues/43017) Android Remote 会话列表重复；[#31592](https://github.com/openai/codex/issues/31592) `SKILL.md` 软链接发现缺陷；[#43068](https://github.com/openai/codex/issues/43068) Browser Use 不可恢复的安全拦截。

---

## 关键 PR 进展

1. **[#43800 — Memory v2 仅摘要提取](https://github.com/openai/codex/pull/43800)** — 专用的提取提示，可在保留任务历史与修正范围的同时，避免过度泛化为用户声明。
2. **[#43799 — Memory v2 提取中优先采用人工证据](https://github.com/openai/codex/pull/43797)** — 分层选取：人工输入与助手最终回复的优先级高于评论 / 上下文 / 工具输出，受 rollout 预算约束。
3. **[#43798 — 批量非用户历史驱逐](https://github.com/openai/codex/pull/43798)** — 阻止逐条追加的驱逐破坏 Guardian 的转录游标，恢复 delta 模式同步。
4. **[#43797 — 可配置的 Memory 版本与隔离存储](https://github.com/openai/codex/pull/43797)** — 引入 `memories.version`（默认 `v1`，可选用 `v2`），将生成 / 摘要 / 检索都路由到所选版本，并对 `memories_v2` 进行惰性迁移。
5. **[#43796 — 在压缩过程中保留 reasoning effort，成功后重置](https://github.com/openai/codex/pull/43796)** — 修复了旧的固定 effort 泄漏到新上下文窗口的缺陷。
6. **[#43795 — 在 configuration overrides 生效期间固定请求的 reasoning effort](https://github.com/openai/codex/pull/43795)** — 在 `configuration_update` 项携带所选 effort 的同时，保持请求基线稳定。
7. **[#43702 — TUI 用户验证提示组件](https://github.com/openai/codex/pull/43702)** — 新的 `UserVerificationView`，提供显式的 verify / cancel 选项、请求详情以及等待状态。
8. **[#43712 — 在 TUI 中启用 MCP 用户验证](https://github.com/openai/codex/pull/43712)** — 停止 TUI 自动取消验证的行为，在活跃与非活跃线程上都展示提示。
9. **[#43715 — 在支持的设备上为内置 TUI 启用用户验证](https://github.com/openai/codex/pull/43715)** — 用 `native::device_supported` 取代始终为 `false` 的设备支持探测。
10. **[#43656 — 用翻牌式瓷砖为实时语音转录添加动画](https://github.com/openai/codex/pull/43656)** — 翻牌效果配合短暂的发声者颜色高亮；并通过 [#43699](https://github.com/openai/codex/pull/43699) 配套修复，在滚动时保留动画状态。

**今日合并的其他值得关注的语音 / TUI 工作：** [#43651](https://github.com/openai/codex/pull/43651) `Ctrl+X` 语音静音 + 录音指示器；[#43676](https://github.com/openai/codex/pull/43676) 语音提示样式与文件链接渲染；[#43683](https://github.com/openai/codex/pull/43683) 专用语音编写器条；[#43690](https://github.com/openai/codex/pull/43690) 可配置的语音静音键位；[#43695](https://github.com/openai/codex/pull/43695) 稳定化的实时语音电平；[#43708](https://github.com/openai/codex/pull/43708) TUI 验证的请求簿记；[#43790](https://github.com/openai/codex/pull/43790) 限定到会话目录的应用服务器存储指标。

---

## 热门讨论

### Ideas
- **[#43788 — Codex 使用透明度与基于订阅的 API](https://github.com/openai/codex/discussions/43788)** — 呼吁提供预飞行的成本预估，以及面向订阅用户的官方 API 表面；折射出关于弃用 / 静默切换模型不够透明的反复抱怨。
- **[#43696 — 为移动远程应用添加 Wake on LAN](https://github.com/openai/codex/discussions/43696)** — 希望移动客户端在配对前优雅地唤醒处于休眠状态的主机。
- **[#42965 — 为持久化的世界状态追踪来源 turn / 窗口出处](https://github.com/openai/codex/discussions/42965)** — 建议记录每条持久化状态项源自哪个 turn / 上下文窗口，以便让 diff 与回滚保持一致。
- **[#37611 — 面向高能力模型的可治理访问的签名企业工单](https://github.com/openai/codex/discussions/37611)** — 围绕面向前沿层模型的企业级授权的长期讨论。

### Q&A
- **[#43257 — 实验性上下文管理如何把历史查询计入限额？](https://github.com/openai/codex/discussions/43257)** — macOS 上的 Pro 用户希望厘清：恢复上下文窗口时的历史查询是否会消耗其 5h 预算。
- **[#41714 — 在 ChatGPT Codex 应用中指定新的默认项目根目录](https://github.com/openai/codex/discussions/41714)** — 确认存在 UX 缺口：可配置无项目任务目录，但默认 *项目* 根目录不可配置。
- **[#10045 — 会话隔离与模型配置](https://github.com/openai/codex/discussions/10045)** — 老话题但仍活跃：逐项目模型固定行为。

### Show and tell
- **[#41157 — CodexFuse 1.2.0](https://github.com/openai/codex/discussions/41157)** — 本地 Windows 仪表盘，展示 Codex 速率限制用量与重置时间。MIT 协议，无需 API 密钥，支持 EN+PT。
- **[#41642 — Compact Context](https://github.com/openai/codex/discussions/41642)** — MIT 协议的本地仓库路由器，在每个 turn 之前为 Codex 提供最多五个最可能的文件。
- **[#43427 — Blume.codes](https://github.com/openai/codex/discussions/43427)** — 将编码 agent 会话提炼为规则与技能的工具，针对 agent 漂移问题。
- **[#43598 — deja-vu](https://github.com/openai/codex/discussions/43598)** — 用 Go 编写的二进制工具，索引 Codex 及另外 23 个 agent 的本地磁盘会话，并为 Codex 提供跨 agent 的回溯能力。
- **[#43532 — DoneAudit](https://github.com/openai/codex/discussions/43532)** — 在信任 agent 的"已完成"声明之前，验证其背后的真实证据。

---

## 功能请求趋势

- **会话与项目生命周期的人体工学** — 在 General 与 Projects 间移动会话（#24222）、将会话标记为未读（#31082，已关闭）以及更清晰的新会话上下文选择，是获赞最多的产品诉求。
- **使用与成本透明度** — 预飞行的成本预估、弃用可见性以及更清晰的 5h 窗口核算（讨论 #43788、#43257、#42983）都指向一个统一的"这次会花多少 / 是否在预算内"表面。
- **语音作为一等编排表面** — Issue #38504 以及今日合并的整组语音 PR（#43651–#43699）表明，团队在战略上正推动把 Live Voice 视作严肃的工作表面，而不仅仅是聊天工具。
- **多智能体健壮性** — 协调器在旁支提问时仍能继续（#43750）以及子智能体出处追踪（讨论 #42965），反映出对更可靠的长时运行 agent 循环的需求。
- **远程 / 主机管理** — Wake-on-LAN（#43696）、代理感知的移动配对（#22851）以及 Android Remote 对齐（#43017）是反复出现的移动远程痛点。
- **显式作用域的 Memory v2** — 已合并的 PR 组（#43797–#43800）反映了社区的一种诉求：记忆应能捕获任务历史和修正，同时避免将任务特定的事实泄漏到全局用户画像中。

---

## 开发者痛点

- **Windows 桌面在 agentic 功能上沦为二等公民。** 悬浮宠物（#41513）、ChatGPT Work 项目同步（#42215）、Computer Use 缺失原生应用清单（#43596）、Computer Use `setup refresh had errors`（#43373）、Browser Use 的 Chrome URL 映射（#42766），以及打包 marketplace 状态损坏（#26501），都指向同一表面：Windows 桌面构建频繁回归，或根本无法提供 macOS 上可用的功能。
- **macOS Intel 对齐正在恶化。** Computer Use 插件门控（#18404）是头条，但更广泛的现象是 macOS x86_64 落后于 arm64。
- **Browser / Computer Use 安全检查不可观察也不可逆。** #29343、#43068 和 #42766 都在描述一种情况：模型静默或永久拒绝站点，没有重新检查路径，也没有用户信号。
- **TUI 会话连续性脆弱。** 恢复失败（#37754）以及今日合并的一系列 TUI 验证修复表明，TUI 的应用服务器契约仍处于变动之中。
- **模型容量错误具有误导性。** #43368"四个顶级模型同时容量已满"的模式，提示这是以通用 5xx 形式暴露出来的配额 / 账户状态 bug。
- **Memory 与上下文管理不透明。** 讨论 #43257 与 Issue #41986（durable-rollout 任务历史被清空）都凸显：新的上下文压缩 / 记忆系统尚未足够透明，还不足以让用户信任。
- **技能发现的边界情况。** #31592（软链接的 `SKILL.md`）对在多个 agent 目录间维护同一份规范技能的用户来说，是一个虽小但显眼的痛点。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区简报 — 2026-09-08

## 今日要点

新版 nightly 构建 `v0.60.0-nightly.20260908.g85aca163f` 已发布，v0.60 版本线继续保持快速迭代。本周社区的关注重心集中在 agent 可靠性与沙箱安全上，多个涉及子 agent 终止、挂起和 shell 执行的 P1 缺陷持续获得维护者关注。新的 “Auto Memory” 功能集群（issue #26516、#26522、#26523、#26525）表明对持久化 agent 记忆的投入正在加码，同时也迎来了第一批正确性与脱敏修复。

## 版本发布

- **v0.60.0-nightly.20260908.g85aca163f** — Nightly 版本。与上一个 nightly 版本的 diff 见[这里](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260907.g85aca163f...v0.60.0-nightly.20260908.g85aca163f)。（自动版本号提升 PR：[#29243](https://github.com/google-gemini/gemini-cli/pull/29243)）

## 热门 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — *子 agent 在 MAX_TURNS 之后的恢复被报告为 GOAL 成功*（13 条评论）。`codebase_investigator` 即使在尚未开始分析就已触及轮次上限，仍会报告 `status: "success"` / `Termination Reason: "GOAL"`。**为什么重要：**这会向用户掩盖真实的 agent 中断，并破坏任何失败模式分析所需的可观测性。P1 级别，维护者跟踪中。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — *Generalist agent 挂起*（8 条评论，8 👍）。一旦调用 generalist agent，创建文件夹这类简单操作都会无限挂起。**为什么重要：**这是一个影响面大、复现范围广的 P1 可靠性缺陷；临时规避方法是在提示词中明确要求“不要使用子 agent”。

3. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** — *Shell 命令执行卡在 “Waiting input”*（4 条评论，3 👍）。P1 核心缺陷：shell 命令执行完毕后，CLI 却仍显示 "Awaiting user input"。该问题相当常见，已成为开发者反复遭遇的痛点。

4. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — *浏览器子 agent 在 Wayland 下失败*（4 条评论）。尽管执行失败，终止原因仍报告为 `GOAL` —— 与 #22323 同属“子 agent 状态误导”这一类问题。

5. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — *零依赖的 OS 沙箱与执行后意图路由*（9 条评论）。提议通过操作系统级沙箱来发挥 Gemini 3 原生的 bash 亲和能力，而不是去限制模型本身。**为什么重要：**这是战略性、大工作量的 P2 增强，将定义长期的安全/UX 方向。

6. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — *评估 AST 感知的文件读取、搜索与映射的影响*（7 条评论）。这是一个 EPIC，旨在用 AST 感知工具实现省 token 的精准读取（与 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) 配套）。**为什么重要：**直接针对每轮约 ~36.6k token 的上下文膨胀问题。

7. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — *Gemini 对 skills 和子 agent 的使用不够*（6 条评论）。虽属个例观察，但引发广泛共鸣：模型只有在被明确要求时才会使用自定义 skills。这表明 agent 工具注册表在可发现性/调度上存在缺口。

8. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** — *确定性脱敏并减少 Auto Memory 日志*（5 条评论）。Auto Memory 目前依赖在内容已进入上下文之后由模型侧进行脱敏 —— 对这个新记忆子系统而言，这是一个不容忽视的隐私/安全隐患。

9. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)** — *阻止 Auto Memory 无限重试低信号会话*（4 条评论）。被提取器判定跳过的会话在每个周期都会被重新翻出来。属于一个高度聚集的记忆质量工作流。

10. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232)** — *浏览器 agent 韧性：自动会话接管与锁恢复*（4 条评论）。`BrowserManager` 目前在 profile 被锁定时会快速失败；用户希望实现优雅接管，尤其是在 `sessionMode: 'persistent'` 模式下。

## 关键 PR 进展

1. **[#29244](https://github.com/google-gemini/gemini-cli/pull/29244)** — *fix(core): 将工具的文件写入原子化并串行化同路径写入*。目前对同一文件的两个并发 `replace` 调用都会报告成功，却悄悄丢失其中一处修改；该 PR 将写入串行化。P1 级别、改动较大 —— 消除并行工具执行中真实存在的数据丢失隐患。

2. **[#29180](https://github.com/google-gemini/gemini-cli/pull/29180)** — *fix(core): 避免将同级 home 路径误显示为 ~ 形式*。名称与 `$HOME` 共享前缀的同级目录（例如 `/home/user-build`）此前会被错误地显示为 `~` 相对路径。一个隐蔽但影响广泛的显示缺陷。

3. **[#29242](https://github.com/google-gemini/gemini-cli/pull/29242)** — *fix(core): 停止在 isAuthenticationError 中将 401 作为子串匹配*。任何包含 `401` 的错误字符串（例如端口 `4012`）都会触发误登出。一个小而精准的 P2 修复。

4. **[#29166](https://github.com/google-gemini/gemini-cli/pull/29166)** — *fix(extensions): 更新前备份扩展目录以便回滚时恢复*。回滚逻辑此前会把空的临时目录复制回去，导致更新失败时悄无声息地毁掉扩展。

5. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214)** — *fix(sandbox): 加固文件系统边界并隔离运行时状态*。用净化后的只读配置替代宿主目录挂载，在路径检查时解析符号链接，解耦容器环境。属于更大范围沙箱加固浪潮的一部分。

6. **[#29022 (closed)](https://github.com/google-gemini/gemini-cli/pull/29022)** — *feat(tool): 将 ask_user 问题保留在文本历史中*。实现了 `ui.keepAskUserQuestionsInHistory`，使问答在会话恢复和 `/chat share` 之后仍然保留。在可复现性上是一次明确的 UX 改进。

7. **[#28935 (closed)](https://github.com/google-gemini/gemini-cli/pull/28935)** — *fix(sandbox): 在 macOS Seatbelt 中隔离 Docker 与容器运行时的套接字及二进制文件*。拒绝容器守护进程的 UDS、CLI 二进制、Mach/XPC 查找以及 POSIX 共享内存，以封堵借助 Docker Desktop 的 VirtioFS 挂载实现的沙箱逃逸。

8. **[#29008 (closed)](https://github.com/google-gemini/gemini-cli/pull/29008)** — *fix(core): 在 getSafeGitEnv 中剥离影响执行的 GIT_* 环境变量*。堵上了一个缺口：从 `.env` 加载的 `GIT_*` 变量（如 `GIT_DIR`、`GIT_INDEX_FILE`）此前可能在“受信任”项目内部劫持 git 操作。

9. **[#28995 (closed)](https://github.com/google-gemini/gemini-cli/pull/28995)** & **[#29004 (closed)](https://github.com/google-gemini/gemini-cli/pull/29004)** — *fix(core): 防止 formatTruncatedToolOutput 在 maxChars 为负时导致输出膨胀*。负数切片索引曾导致截断后输出反而*翻倍*；两个 PR 都对非正的 `maxChars` 做了防护。

10. **[#27636 (closed)](https://github.com/google-gemini/gemini-cli/pull/27636)** — *perf: 优化 VirtualizedList 并修复点击处理*。针对 [#21924](https://github.com/google-gemini/gemini-cli/issues/21924) 中长期跟踪的终端 resize 闪烁/性能痛点。

另外值得关注：`harshil-mistry` 带来了一波文档清理（[#29009](https://github.com/google-gemini/gemini-cli/pull/29009)、[#29011](https://github.com/google-gemini/gemini-cli/pull/29011)、[#29013](https://github.com/google-gemini/gemini-cli/pull/29013)、[#29015](https://github.com/google-gemini/gemini-cli/pull/29015)），修复了 CLI flag 缺失、ACP flag 表格错误、环境变量脱敏键拼写错误，以及未限定作用域的 workflow 权限等问题。

## 功能请求趋势

- **AST 感知的代码工具**（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）。社区正围绕“外科手术式”的文件读取、搜索与代码库映射达成共识，以对抗上下文膨胀 —— 当前基线约为每轮 ~36.6k token。
- **持久化 / 外部任务跟踪**（[#18836](https://github.com/google-gemini/gemini-cli/issues/18836)、[#21000](https://github.com/google-gemini/gemini-cli/issues/21000)）。弃用上下文内的 `WriteToDo`，转向基于文件的 CRUD 任务跟踪，包括原生文件工具的变体。
- **Auto Memory 走向成熟**（[#26516](https://github.com/google-gemini/gemini-cli/issues/26516) 及其三个同类 issue）。除了缺陷修复之外，方向指向透明的补丁暴露面、确定性的密钥脱敏和有界重试。
- **子 agent 可观测性**（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)、[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)）。用户希望在 `/chat share`、`/bug` 报告中看到子 agent 的执行轨迹，并获得可信的终止原因。
- **agent 自我认知**（[#21432](https://github.com/google-gemini/gemini-cli/issues/21432)）。推动 CLI 准确记住自身的 flag、快捷键和调用模式。
- **本地子 agent 成熟化**（[#20195](https://github.com/google-gemini/gemini-cli/issues/20195)）。Sprint-1 的目标是推动本地子 agent 更广泛落地，与改进 skill/agent 调度的 [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) 相配合。
- **对 bash 亲和能力进行 OS 级沙箱化**（[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)）。与其阉割模型原生的 bash 能力，不如对执行环境做沙箱隔离，之后再对意图进行路由。

## 开发者痛点

- **误导性的子 agent 终止信号。**多个未关闭的 issue（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)、[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)）报告 `GOAL`/`success` 状态掩盖了真实失败（`MAX_TURNS`、Wayland 浏览器错误）。这削弱了用户对 agent 遥测和缺陷报告的信任。
- **常规流程中 agent 挂起。**generalist agent 在创建文件夹时挂起（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)）、shell 命令执行完毕后卡在 "Awaiting user input"（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)），都是反复出现的可靠性问题。
- **工具注册表过载。**工具超过 128 个时触发 400 错误（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)），反映出扩展不断叠加时需要更智能的作用域限定。
- **工作区污染。**当 shell 执行受限时，模型经常把临时脚本写到任意目录（[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)），让干净地提交变得很痛苦。
- **交互式提示卡死。**在执行 `npm create vite` 之类命令时，Gemini CLI 会卡在交互式提示上（[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)）。
- **沙箱逃逸面。**本周多个高优先级安全修复（[#28935](https://github.com/google-gemini/gemini-cli/pull/28935)、[#29214](https://github.com/google-gemini/gemini-cli/pull/29214)、[#29005](https://github.com/google-gemini/gemini-cli/pull/29005)）表明沙箱方案仍在成熟过程中，尤其是在容器运行时隔离和 `DEBUG` 环境变量真值判断方面。
- **状态持久化缺口。**`/compress` 无法在会话恢复后保留（[#21335](https://github.com/google-gemini/gemini-cli/issues/21335)），`get-shit-done` 输出 hook 崩溃（[#22186](https://github.com/google-gemini/gemini-cli/issues/22186)），进一步坐实了会话/扩展状态脆弱这一模式。
- **文档漂移。**光是修文档就动了好几个 PR（[#29009](https://github.com/google-gemini/gemini-cli/pull/29009)、[#29011](https://github.com/google-gemini/gemini-cli/pull/29011)、[#29013](https://github.com/google-gemini/gemini-cli/pull/29013)）—— 未记录的 flag、错误的脱敏键、过时的 ACP 条目 —— 说明 CLI 的功能面已经跑在了参考文档前面。

---

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-08

## 今日要点
- 长期悬而未决的 **vi/vim 输入模式** 请求（Issue #13，76 👍，可追溯至 2025 年 9 月）终于 **已关闭** — 对重度用户而言是一个值得关注的里程碑。
- 在 **1.0.83 / Desktop 1.1.15** 版本前后，密集出现了一波会话管理相关的回归，包括孤儿化的会话状态目录、卡死的队列、过时的连接项 ID，以及在非第一方服务器上静默失败的 MCP OAuth 流程。
- 权限相关的交互体验仍是反复出现的痛点：`/permissions assisted` 与 `--yolo`/`--allow-all` 会在会话中途失效，且在没有托管策略的账号上出现了相互冲突的默认拒绝姿态。

## 发布动态
过去 24 小时内无新发布。

## 热门 Issue

1. **[#13] CLI 输入应支持 vi/vim 输入模式** — *已关闭*
   整个语料库中点赞数最高的特性请求（~76 👍，10 条评论）终于被关闭。这强烈反映出在 CLI 内部对模态编辑器交互体验的需求。
   👉 https://github.com/github/copilot-cli/issues/13

2. **[#4742] Desktop 1.1.15：在已有 Local 会话运行时无法创建第二个会话**
   高影响回归："This project already has an active Local workspace" 阻断了正常的并行工作流。
   👉 https://github.com/github/copilot-cli/issues/4742

3. **[#2861] 压缩失败：模型返回为空（Opus 4.6）**
   `/compact` 重试 3 次后失败 —— 在旗舰模型上打断了长会话工作流。
   👉 https://github.com/github/copilot-cli/issues/2861

4. **[#4756] Windows：每次创建新 Local 会话前都必须归档所有空闲会话**
   与 #4742 同源，但仅出现在 Windows 上（13 👍）—— 指向系统性的会话状态处理问题。
   👉 https://github.com/github/copilot-cli/issues/4756

5. **[#4753] v1.0.83：会话恢复时取消进行中的 stdio MCP 服务器（~1s vs 16s）**
   过于激进的超时回归会在恢复后的会话中静默禁用 MCP 工具。
   👉 https://github.com/github/copilot-cli/issues/4753

6. **[#4438] `disable-model-invocation: true` 会让技能变为不可达，而非仅限手动调用**
   文档描述的意图与运行时行为存在语义不一致 —— 对技能作者造成困惑。
   👉 https://github.com/github/copilot-cli/issues/4438

7. **[#4757] `--yolo` / `--allow-all` 被默认拒绝的绕过限制所阻断（无托管策略）**
   权限门控采用了"缺少策略即拒绝"的姿态，且在会话期间始终不会解除。
   👉 https://github.com/github/copilot-cli/issues/4757

8. **[#3945] 记忆在仓库之间发生泄露**
   涉及隐私：全新仓库似乎继承了来自其他位置的"事实" —— 影响信任。
   👉 https://github.com/github/copilot-cli/issues/3945

9. **[#4017] MCP OAuth：非第一方 HTTP 服务器始终无法启动浏览器流程**
   在 Desktop 应用中，类似 Atlassian/incident.io 的集成都处于静默死亡状态 —— 无弹窗，无报错。
   👉 https://github.com/github/copilot-cli/issues/4017

10. **[#4755] 当排队队列中的消息落在轮次末尾时，会话永久卡死**
    恢复需要杀掉进程 —— 影响长会话的稳定性保证。
    👉 https://github.com/github/copilot-cli/issues/4755

## 关键 PR 进展

1. **[#4761] install: report unsupported operating systems** — *Open*
   将 FreeBSD（以及其他非 macOS/Linux 平台）明确标记为不支持，而不是误导性地把用户指向 `winget`。
   👉 https://github.com/github/copilot-cli/pull/4761

2. **[#4762] install: report unsupported operating systems** — *Closed*
   同一修复的早期版本；已关闭（大概率被替代或采用了与 #4761 不同的合并方式）。
   👉 https://github.com/github/copilot-cli/pull/4762

3. **[#4100] shangti0168** — *Closed*
   标记为安全的变更（"安全性"）；已关闭但未合并 —— 公开描述极为有限。
   👉 https://github.com/github/copilot-cli/pull/4100

> 注：过去 24 小时内的 PR 数量异常偏低（仅 3 条）。可视为一个安静的合入窗口。

## 特性请求趋势

- **模态编辑器交互**：vi/vim 输入模式终于关闭，但预计会有关于按键可发现性（discoverability）与配置的后续讨论。
- **TUI 丰富度**：按类型分组的可折叠输出区段（#1787）、针对提示与回答的逐元素主题（#4767）、降低空闲 CPU 占用（#4750）。
- **MCP 成熟度**：分作用域的 **MCP Profiles**（#2235）、正确的 **取消传播机制**（#4759），以及 **OAuth 流程的可靠性**（#4017）。
- **跨平台安装**：在不支持的操作系统上给出更明确的提示（#4761/#4762），修复 Windows 上的路径分隔符正确性问题（#4702）。
- **权限 UX**：常驻的 `/permissions assisted`（#4764）以及 `--yolo`/`--allow-all`（#4696, #4757）。

## 开发者痛点

- **会话生命周期的脆弱性**：孤儿化的 `~/.copilot/session-state` 目录（#2836）、由排队队列收尾引发的卡死（#4755）、静默的删除无效操作（#4754）、恢复后过时的连接项 ID（#4505）。
- **权限波动**：旁路模式在空闲后、恢复时、或由于过于激进的默认拒绝检查而失效（#4696, #4757, #4764）。
- **MCP 集成的脆弱性**：激进的恢复超时（#4753）、由于 frontmatter 语义导致的技能不可达（#4438）、OAuth 死路（#4017）、Azure `learn=true` 超时（#4749）。
- **跨仓库上下文泄露**：跨仓库的记忆持久化产生了令人意外且涉及隐私的行为（#3945）。
- **Windows 与小众操作系统摩擦**：路径分隔符 bug（#4702）、创建会话被阻断（#4756）、FreeBSD 上的安装路径误导（#4761）。
- **初始提示处理回归**：`-i`/`--interactive` 提示在 CLI 启动后被静默丢弃（#4766）。
- **配置作用范围歧义**：当当前目录不是仓库根目录时，CLI 无法正确加载 `.mcp.json`/hooks（#4765）。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-08

## 今日亮点
**Memory Megathread (#20695)** 继续占据社区关注焦点，已有 141 条评论与 109 个点赞，维护者 `thdxr` 正在将分散的堆快照报告整合到一个统一的分类处理流水线中。**订阅与模型可用性相关 Bug** 激增（在 mimo-v2.5 上出现 Forbidden 错误、Zen 下拉菜单中缺失 DeepSeek-v4-flash-free、DeepSeek V4 Pro 出现意外 token 计费），这表明 OpenCode Go 计费界面正面临越来越多的摩擦。在工程方面，**`Hona` 的桌面端扩展重构系列**（#47935 → #47947 → #47948 → #47936）为把桌面外壳模块化拆分为独立打包插件打下了架构基础。

## 发布动态
过去 24 小时内无新版本发布。

## 热门 Issue

1. **[#20695 Memory Megathread](https://github.com/anomalyco/opencode/issues/20695)** — 141 条评论 / 109 👍。用于集中分类处理各类堆/内存报告；维护者明确要求提供堆快照，而非 LLM 生成的理论分析。这是目前仓库中关注度最高的 Issue。
2. **[#47787 明明已开通 Go 订阅却突然提示 "Forbidden: mimo-v2.5"](https://github.com/anomalyco/opencode/issues/47787)** — 活跃订阅者被锁在旗舰免费模型之外；与一波访问控制投诉相关联。
3. **[#47777 免费神经模型出现 "Forbidden" 错误](https://github.com/anomalyco/opencode/issues/47777)** — 关联报告；`mimo-v2.5-free` 在免费套餐下持续失败，疑似服务提供方侧回归。
4. **[#43805 DeepSeek-v4-flash-free 在 Zen 下拉菜单中缺失](https://github.com/anomalyco/opencode/issues/43805)** — 通过 `/zen/v1/models` 与配置层均可访问该模型，但 TUI 选择器中未暴露——典型的 UI/状态同步缺口。
5. **[#42729 [功能请求] 加入 Qwen3.8-27B](https://github.com/anomalyco/opencode/issues/42729)** — 12 👍。社区推动将新的 Qwen3.8-27B 开源权重模型纳入 Go 模型目录。
6. **[#47934 Go 上 DeepSeek V4 Pro 出现意外 token 用量](https://github.com/anomalyco/opencode/issues/47934)** — 月度额度的 $6.57 / 43.8% 被归到用户声称并未调用的模型上——计费信任度红灯。
7. **[#47932 Console Go 触发速率限制](https://github.com/anomalyco/opencode/issues/47932)** — 付费用户每轮需等待 40 秒以上；已打 `needs:compliance` 标签。
8. **[#41696 [2.0] opencode2 启动托管后台服务卡住](https://github.com/anomalyco/opencode/issues/41696)** — 反复触发 `serve --service` 衍生进程却无任何错误提示；阻塞 v2 启动流程。
9. **[#27995 [功能请求] Agent Activity Panel](https://github.com/anomalyco/opencode/issues/27995)** — 长期需求：希望在侧边栏展示 `explore`/`librarian`/`oracle` 后台 Agent 的实时状态，避免轮询 `background_output()`。
10. **[#43697 在 X11 + xclip 环境下 clipboard.write() 永不收敛](https://github.com/anomalyco/opencode/issues/43697)** — 复制本身可以完成，但 Promise 会挂起数分钟——典型的会话级累积性泄漏。

## 关键 PR 进展

1. **[#47935 feat(plugin): explore desktop extension primitives](https://github.com/anomalyco/opencode/pull/47935)** — 将桌面功能（browser、review/files、context）拆分为独立扩展的奠基性草案，共用一套带有五种放置模式的 TUI 槽位解析器。
2. **[#47947 refactor(app): extract review and file viewer extension](https://github.com/anomalyco/opencode/pull/47947)** — 把 diff、文件树、行内评论和 "Open in" 操作迁移至 `@opencode/plugin-review-desktop`；宿主进程保留面板/焦点/批注状态。
3. **[#47948 refactor(app): extract context usage extension](https://github.com/anomalyco/opencode/pull/47948)** — Context 按钮、统计信息、system-prompt 展示与导出功能迁入 `@opencode/plugin-context-desktop`，默认关闭面板。
4. **[#47936 refactor(desktop): extract the browser extension package](https://github.com/anomalyco/opencode/pull/47936)** — 将新扩展模型应用到应用内浏览器；切断其与 App/Desktop/Core 的导入依赖。
5. **[#47286 fix(app): align desktop agent and model switching](https://github.com/anomalyco/opencode/pull/47286)** *(已关闭)* — 将 #47260 的切换逻辑带入共享的 V2 渲染层，按会话持久化每个 Agent 的模型/变体。
6. **[#47455 fix(app): link background subagents to their sessions](https://github.com/anomalyco/opencode/pull/47455)** — 子 Agent 行与时间线提示成为指向子会话的真正导航链接，按 Escape 时保留父标签页。
7. **[#47942 fix(mcp): preserve tool discovery failure details](https://github.com/anomalyco/opencode/pull/47942)** — 在 MCP 状态/日志中保留原始 `tools/list` 错误，避免刷新失败时清空已缓存的工具（关闭 #47644）。
8. **[#46667 feat(ui): support loading a custom theme from a URL](https://github.com/anomalyco/opencode/pull/46667)** — Settings → General 新增 "Custom theme URL" 行，用于私有 `DesktopTheme` JSON。
9. **[#47293 feat(core): add console web search](https://github.com/anomalyco/opencode/pull/47293)** — 注册一个托管的 Console v2 web-search 描述符，含端点归属校验与重定向拒绝。
10. **[#47257 feat(core): add keenable web search](https://github.com/anomalyco/opencode/pull/47257)** — 在 Exa/Firecrawl/Parallel/Tavily 之外加入 Keenable，沿用与 `tavily.ts` 一致的供应方形态。
11. **[#47640 feat: preview and text extraction for office files and pdf](https://github.com/anomalyco/opencode/pull/47640)** — 为 Office/PDF 附件提供离线预览与文本提取——填补长期存在的附件处理空白。
12. **[#42433 fix(opencode): preserve response model metadata](https://github.com/anomalyco/opencode/pull/42433)** — 保留 AI SDK 的结构化模型 ID，而非使用任意的响应头（关闭 #42420）。

## 功能请求趋势

- **Go/Zen 模型覆盖更广**：Qwen3.8-27B (#42729)、DeepSeek-v4-flash-free 在 UI 中可见 (#43805)、DeepSeek V4 Pro 计费透明度 (#47934)。
- **多 Agent 可观测性**：Agent Activity Panel (#27995)、从父会话到子 Agent 会话的链接体验 (#47455)。
- **桌面模块化与主题**：自定义主题 URL (#46667)、透明背景切换 (#5657)、review/context/browser 基于扩展的拆分 (#47935/#47947/#47948/#47936)。
- **国际化**：波斯语 README (#47783)、印尼语 README (#47910)、意大利语文案修正 (#47941)。
- **更安全的自动化控制**：通过 ACP `configOptions` / `session/set_config_option` 实现按会话可逆 Yolo (#47918)。
- **更丰富的附件能力**：Office + PDF 预览/提取 (#47640)。
- **TUI 体验优化**：状态栏新增 token 速度指示 (#47921)、紧凑 Tab 栏 (#47938)、清屏命令 (#47928)、Markdown 导出时的工具调用过滤 (#47929)。

## 开发者痛点

- **内存与稳定性**：Memory Megathread (#20695)、TUI `localeCompare` 崩溃 (#47903)、v2 托管服务挂起 (#41696) 共同表明稳定性层面需要一条专门的工程线。
- **订阅信任度**：付费套餐出现 "Forbidden" (#47787, #47777)、Go 上的速率限制等待 (#47932)、DeepSeek V4 Pro 出现意外计费 (#47934) 正在侵蚀用户对计费界面的信心。
- **Linux 桌面脆弱性**：X11/xclip 下剪贴板永不收敛 (#43697)，以及 GNOME Wayland 上未安装辅助工具时静默成功 (#47900)——两者都是事后才暴露，掩盖了真实失败。
- **TUI/Desktop 行为分叉**：自动续接行为与文档化的 `opencode -c` 语义相矛盾 (#47892)；Desktop "卡在思考中" 而 TUI 正常工作 (#19083)。
- **静默的数据持久化**："Revert to this message" 保留了本应被回滚的状态，且未告知用户 (#47909)——这是 UX 安全问题，不只是一个 Bug。
- **权限机制的僵化**：在根级默认拒绝的前提下，Agent 插件无法为特定技能授权 (#47946)，ACP 侧按会话粒度的 Yolo 仍未实现 (#47918)。
- **压缩可靠性**：自动压缩可能直接抛出 OpenAI 的原始 `invalid_prompt` 错误并中止 draining (#47939)，而非进行恢复。
- **本地化缺口**：多个已关闭的完整翻译功能请求表明项目仍缺乏一等公民的 i18n 流水线。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区日报 — 2026-09-08

## 今日要闻

Pi 今天经历了一场密集的 Bug 围剿日，**没有新版本发布**，但迎来了一波 provider 集成修复（特别是新的 OpenCode Go `x-opencode-session` 请求头要求和 Z.AI 推理处理相关）以及 TUI 打磨。讨论区有两个新的社区项目值得关注：一个是桌面端 GUI（Eco Coding），另一个是上下文记忆追踪实验。最热门的长期社区帖——Windows 体验和打包问题——继续以 61 条评论领跑讨论热度。

---

## 版本发布

_过去 24 小时内无新版本发布。_

---

## 热门 Issue

1. **#7547 — [Windows] How do you use Pi on Windows? What issues are you seeing?**（61 条评论，👍 2）
   仓库里流量最高的帖子。维护者正在积极征集 Windows 使用调研，以梳理打包 Bug、文档缺口以及哪些应该交给扩展处理。强烈信号表明 Windows 是一个被低估的平台，存在大量潜在用户。
   https://github.com/earendil-works/pi/issues/7547

2. **#5363 — Add `amazon-bedrock-mantle` provider for OpenAI-compatible models**（进行中，19 条评论，👍 15）
   获赞最多的 Issue。为现有 `amazon-bedrock` provider 增加兄弟版本以支持 Bedrock Mantle 模型，这些模型使用 OpenAI 兼容端点，与 Converse API 不兼容。社区迫切希望扩大 AWS Bedrock 的覆盖范围。
   https://github.com/earendil-works/pi/issues/5363

3. **#8823 — Esc during streaming often fails to cancel in-flight request**（8 条评论）
   一个真实的体验回退：`stopReason: "aborted"` 已被持久化，但 HTTP 请求会一直持续到 provider 返回。已有多次报告，尚无点赞——说明可能复现门槛不高，但对交互式用户很关键。
   https://github.com/earendil-works/pi/issues/8823

4. **#7010 — Normalize optional object tool schemas for OpenAI-compatible providers**（7 条评论）
   `@earendil-works/pi-ai` 输出的工具 schema 中的 `required` 数组没有考虑可选属性，导致严格的 provider 报错。影响所有 chat-completions 风格的 provider，波及面很广。
   https://github.com/earendil-works/pi/issues/7010

5. **#8684 — `PI_OFFLINE` silently disables all provider model discovery**（6 条评论）
   该标志的文档说明范围（启动期整理）与实际实现（杀掉所有模型目录的拉取）存在偏差。一个有具体复现步骤的正确性 + 文档 Bug。
   https://github.com/earendil-works/pi/issues/8684

6. **#9290 — Extension API: `modelRegistry.complete()` doesn't send `x-opencode-session`**（已关闭）
   在合作方上报（#9230）后迅速关闭。导致所有调用 opencode-go 模型的扩展都因 `MissingSessionID` 失败。值得记录，这是一个对破坏性外部变更的快速响应案例。
   https://github.com/earendil-works/pi/issues/9290

7. **#8706 — zai thinking handler sends `disabled` for forced-thinking GLM 5.3/5.3-flash, leaking reasoning**（已关闭）
   当用户切换 `/thinking off` 时，适配器仍然在那些思考能力是强制的模型上发送 `thinking: {type: "disabled"}`，导致推理文本泄露到最终回复中。
   https://github.com/earendil-works/pi/issues/8706

8. **#8928 — Parallel `pi` startup can report "No API key found" for ~48s when `auth.json` has an expired OAuth credential**（4 条评论）
   一个多进程竞争的可确定性复现：报错信息指向当前*活动的* provider，但根本原因是某个不相关的过期 OAuth 记录。关联 #1871、#4919、#6880。
   https://github.com/earendil-works/pi/issues/8928

9. **#9055 — EventStream has quadratic CPU cost when draining buffered events**（已关闭）
   基于 `shift()` 的出队变成每个元素 O(n)，对长时间运行的服务端工作负载是沉重负担。已替换为索引指针或链表结构。
   https://github.com/earendil-works/pi/issues/9055

10. **#8667 — Stale compaction entry permanently bricks the session (Anthropic 400 unexpected tool_use_id)**（3 条评论，👍 1）
    自动压缩可能在 assistant `toolCall` 和它的 `toolResult` 之间丢失一个 `CompactionEntry`，产生一个成对残缺的中间状态，Anthropic 随后拒绝接受。这是一个影响范围很大的正确性 Bug，对长会话尤其致命。
    https://github.com/earendil-works/pi/issues/8667

_值得提及_：#9276（grep 工具在带上下文行时 OOM）、#9267（模糊会话搜索扫描）、#8700（Mistral Medium `reasoning prompt mode` 400）、#9230（opencode-go session header——已关闭）、#8706 已关闭，针对 Z.AI。

---

## 关键 PR 进展

1. **#8635 — `fix(ai)`: preserve aborted stop reason during lazy setup**（开放，修复 #8409）
   将 abort 信号穿透到懒加载的流式 setup 包装器中，这样在 auth setup 之前发生的 abort 会被正确报为 `aborted` 而不是通用错误。包含回归测试。
   https://github.com/earendil-works/pi/pull/8635

2. **#9116 — `feat(ai)`: add mid-conversation system messages**（开放）
   #8998 拆分后的第一部分——为 `pi-ai` 增加一个 system-message 角色，让会话期间的变更（工具加载、提示词编辑）可以在流式过程中传达，而不是通过重写提示词。具有架构意义。
   https://github.com/earendil-works/pi/pull/9116

3. **#9117 — `feat(coding-agent)`: deliver prompt/tool changes as system message deltas**（开放）
   拆分后的第二部分。将 coding agent 接入上面新增的 system-message 通道，使后续请求只 diff 变更的工具列表，而不是重新发送整个系统提示词。Token 效率上的大胜利。
   https://github.com/earendil-works/pi/pull/9117

4. **#8627 — Use `ctx.cwd` for cwd-sensitive tools**（已关闭）
   `read`、`write`、`edit`、`grep` 等工具在扩展提供 `ctx.cwd` 时以此解析路径，回退到创建时的 cwd。行为与 agent 循环处理路径的方式对齐。
   https://github.com/earendil-works/pi/pull/8627

5. **#9316 — `fix(ai, coding-agent)`: three easy fixes (#8919, #8717, #8720)**（已关闭）
   合并打包的 PR：允许全屏模式下零行自定义 footer，以及两个相关的小修复。低风险清理工作的便捷着陆点。
   https://github.com/earendil-works/pi/pull/9316

6. **#9152 — DRAFT: forks streaming**（开放）
   forks 功能的流式版本。仍是 WIP，但预示了 session-tree UX 的演进方向。
   https://github.com/earendil-works/pi/pull/9152

7. **#9329 / #9307 — Detect Orca terminal as Kitty-image capable**（开放/已关闭）
   两个几乎重复的 PR（一个作为重复被关闭），识别 `TERM_PROGRAM=Orca` 以支持内联图片、真彩色和 OSC 8 超链接。PR #9329 是最终保留版本。
   https://github.com/earendil-works/pi/pull/9329

8. **#7742 — `feat(ai)`: Ollama Cloud support**（开放）
   将 Ollama Cloud 作为基于 `OLLAMA_API_KEY` 的 provider 加入，把混合 local+cloud 流程留给 `ollama launch pi`。一个长期被社区呼吁的功能终于开始推进。
   https://github.com/earendil-works/pi/pull/7742

9. **#9301 — `feat(coding-agent)`: confirm device-code browser + clipboard actions**（开放，修复 #9282）
   恢复了设备码登录（Copilot 等）的"自动打开验证页 / 复制验证码到剪贴板"便利操作，但作为 opt-in 引入，以避免之前删除该功能时引入的回归。
   https://github.com/earendil-works/pi/pull/9301

10. **#256 — Implement XDG Base Directory Specification with auto-migration**（已关闭）
    符合 XDG 规范的 config/data/state 目录，并支持从 `~/.pi/` 一次性迁移。长期被要求的 Linux/Unix 卫生改进。
    https://github.com/earendil-works/pi/pull/256

_值得提及_：#9297（移除无效的 Fable 5 fallback）、#9319（保护扩展组件的 `MouseRegion.invalidate()`）、#9310（会话切换时清除残留鼠标选择）、#9303（关闭选择器前先 resume）、#9292（手动重试 api/command）。

---

## 热门讨论

### Show and tell
- **#9327 — Eco Coding, a GUI for Pi (vision split, teams, browser, computer use + mobile)** — 开源桌面 GUI，包装 Pi 的 agent 循环，加入专用视觉通道、浏览器自动化和移动端伴侣。如果你关心多模态路由和团队工作流，值得关注。
  https://github.com/earendil-works/pi/discussions/9327

### Ideas
- **#9312 — Pi Context Memory: tracing decisions back to the original conversation** — 实验如何在压缩后保留"为什么"。问题刻画（压缩后，agent 是否还能为早先的决策给出理由）具有广泛适用性；处于想法层面的讨论。
  https://github.com/earendil-works/pi/discussions/9312

---

## 功能请求趋势

从过去 24 小时更新的 Issue 和讨论中提炼：

1. **更广泛的 provider 覆盖与一等公民的 OpenAI 兼容适配器**——Amazon Bedrock Mantle (#5363)、Ollama Cloud (#7742)、LongCat (#9308)。社区持续推动 Pi 走向"任何 OpenAI 形态的端点都应即插即用"。
2. **更好的 provider 使用体验**——工具 schema 规范化 (#7010)、强制思考检测 (#8706)、`PI_OFFLINE` 范围澄清 (#8684)。这些本身不是功能，但却是新 provider 能用起来的拦路虎。
3. **多模态 / 团队工作流**——Eco Coding (#9327) 释放了对共享 agent、视觉路由和 GUI 表面的需求。目前尚无官方路线图，但意愿很明确。
4. **长会话正确性**——压缩相关 Bug (#8667, #6100) 和上下文记忆研究 (#9312) 表明，用户希望会话能跨越长度和时间存活下来。
5. **把 Windows 列为 tier-1 目标**——#7547 是最响亮的信号：Windows 的打包、文档和 Bug 修复需要一条专属通道。
6. **TUI 打磨**——鼠标选择 (#9310, #7973, #8744)、终端能力检测 (#9307, #9329)、全屏配置 (#9315)。小而连续的 UX 胜利。
7. **扩展 API 完整性**——请求头传递 (#9290, #9302)、`cwd` 传递 (#8627)、会话中 system 消息 (#9116/#9117)、窗口焦点事件 (#2924)。扩展正在成为一等公民的接触面，社区在呼吁与原生 agent 循环对等。

---

## 开发者痛点

1. **外部 API 变更会让扩展静默失效。** `x-opencode-session` 请求头的推出（#9230、#9290、#9302）在 24 小时内命中三条不同的代码路径，需要协同修复；随着其他 provider 演进，类似情况还会出现。
2. **流式控制面很脆弱。** Esc 在流式过程中无法可靠中断 (#8823)、`EventStream` 排空呈二次复杂度 (#9055)、懒加载 setup 阶段丢失 abort stop reason (#8635)——都指向一个需要在更多 provider 集成落地前加固的流式层。
3. **Auth 与 offline 语义未充分定义。** `PI_OFFLINE` 做的事超出文档说明 (#8684)、并行启动在过期 OAuth 上阻塞约 48 秒 (#8928)、工具 schema 被严格 provider 拒绝 (#7010)，这些都是隐式行为造成的。
4. **长会话是可靠性雷区。** 压缩可能在 Anthropic 上让会话彻底报废 (#8667)、带上下文的 grep 会 OOM 堆 (#9276)、模糊会话搜索逐字符扫描 (#9267)。这些问题随使用量增长，很容易被低估。
5. **Windows 仍是二等体验。** 61 条评论的帖子 (#7547) 加上相关 Windows Bug 的集中爆发，表明这背后有真实的开发者摩擦成本，没有单个 PR 能解决。
6. **扩展开发需要防御式编程。** `MouseRegion.invalidate` (#9319)、布尔标志定位 (#7139)、`cwd` 解析 (#8627)、steering-vs-prompt 事件语义 (#8718) 都说明，扩展必须自己打补丁来弥补缺失或反直觉的原生 API。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区简报 — 2026-09-08

## 今日亮点
Qwen Code 发布了 nightly 版本 **v0.23.0-nightly.20260907.f1ed3bc31a**，最大亮点是全新的 **Web Shell 工作流可视化与动态运行管理**（PR #10594）。围绕 **Windows ConPTY/PTY 资源泄漏**的维护工作占据了讨论主场——三个相关问题（#11303、#11352、#11353）本周齐齐升到 P1，而长期推进的 **Ink → OpenTUI TUI 迁移**（#8662）依旧是整个 issue 跟踪器里最深的一条讨论串。

## 版本发布
- **[v0.23.0-nightly.20260907.f1ed3bc31a](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260907.f1ed3bc31a)** — Web Shell 新增动态工作流运行的可视化与管理（[#10594](https://github.com/QwenLM/qwen-code/pull/10594)），外加针对会话派生的性能优化；发布说明由 `.github/release.yml` 自动生成。

## 热门 Issue

1. **[#8662 — Migrate TUI from ink to OpenTUI (tracking)](https://github.com/QwenLM/qwen-code/issues/8662)** · 33 条评论 · P3 · OPEN
   全仓库讨论最热烈的跟踪 issue。它记录了打过补丁的 ink 7 + React 19 渲染器（约 1037 行补丁）存在的结构性问题——闪烁、布局破损、alt-screen 残影，以及脆弱的自定义 Virtual Viewport。目前正在评估以 OpenTUI 作为替代方案。

2. **[#11119 — `qwen serve` background shell output silently dropped on session recycle](https://github.com/QwenLM/qwen-code/issues/11119)** · 10 条评论 · P1 · OPEN
   在由 daemon 托管的 Web Shell 里，一个 `run_shell_command` 后台循环会把会话卡死：shell 仍在运行并持续产出输出，但发起轮次结束后，什么都不会到达客户端，唤醒通知也不再触发。这是 daemon/web-shell 技术栈的核心可靠性问题。

3. **[#11303 — Windows VS Code Companion leaks headless conhost.exe ConPTY processes](https://github.com/QwenLM/qwen-code/issues/11303)** · 8 条评论 · P1 · OPEN · ready-for-human
   qwen-cli 运行约 12 小时后，子进程达 347 个 / 内存约 2.8 GB。VS Code Companion 提供了具体复现路径，对 Windows 集成方是阻塞性问题。

4. **[#11352 — node-pty leaks ConPTY host on natural shell exit (blocked)](https://github.com/QwenLM/qwen-code/issues/11352)** · 3 条评论 · P1 · OPEN
   从 #11303 拆分出来，因为这一半无法在 QC 侧修复——`@lydell/node-pty` 1.2.0-beta.10 会在 `onExit` 之前就抹掉 baton，JS 因此够不到 `ClosePseudoConsole`。等待上游修复。

5. **[#11353 — `WebTerminalRegistry` holds PTY resources up to 15 min past exit](https://github.com/QwenLM/qwen-code/issues/11353)** · 2 条评论 · P2 · OPEN
   PTY 销毁问题的另一半——与宿主侧缺陷无关，这里关乎释放*何时*执行。可以在 QC 侧修复。

6. **[#10530 — 400 Failed to initialize samplers in 0.22.3](https://github.com/QwenLM/qwen-code/issues/10530)** · 6 条评论 · P2 · OPEN · ready-for-human
   一个让 Qwen 3.8 27b / Qwen 3.6 35b 经由 llama-server 使用时出错的回归（`failed to parse grammar`）——gemma4-12b 不受影响。其重要性在于提醒用户：0.22.x 弄坏了特定的提供商/模型组合。

7. **[#11335 — Web Shell transcript drifts off composer axis when turn-rail is visible](https://github.com/QwenLM/qwen-code/issues/11335)** · 4 条评论 · P3 · OPEN
   外观层面的问题，但每个完成轮次的用户都会看到。与下文的修复 PR #11338 直接配对。

8. **[#10995 — `customHeaders` `${session_id}` template support](https://github.com/QwenLM/qwen-code/issues/10995)** · 3 条评论 · P1（👍）· CLOSED
   请求在 `generationConfig.customHeaders` 中支持模板替换，让按会话区分的请求头随请求一起携带。说明集成方想要细粒度的请求标记，又不必逐请求打补丁。

9. **[#11274 — Tracking: decouple daemon Skill management from child, in sub-1000-line PRs](https://github.com/QwenLM/qwen-code/issues/11274)** · 3 条评论 · P3 · OPEN
   在架构上把 daemon（目录/持久化/管理）与 ACP 子进程（配置/执行/上报）切开。已识别出三个耦合点，将分阶段交付。

10. **[#11205 — Filter screen on `main` lost six hardenings from #10421's branch](https://github.com/QwenLM/qwen-code/issues/11205)** · 3 条评论 · P2 · OPEN
    重要的安全/可靠性讨论串：读取顺序、EACCES、U+FFFD 处理、spawn 超时、候选数量上限、保留策略——这些在经 #9742 落地的版本里全部缺席。

## 重点 PR 进展

1. **[#10594 — feat(web-shell): visualize and manage dynamic workflow runs](https://github.com/QwenLM/qwen-code/pull/10594)** — 本期 nightly 的头条变更。在 Web Shell 中呈现正在运行/已完成的工作流运行及其状态。（已合入 v0.23.0-nightly.20260907。）

2. **[#10347 — feat(core): auto-retry transient network errors (EOF) where Ctrl+Y is unavailable](https://github.com/QwenLM/qwen-code/pull/10347)** · review/self-reported, needs-human
   将 `400 network error ... EOF`（对端在请求中途断开）重新归类为可重试的传输错误，从而套用现有的有界自动重试。消除了渠道/API 用户在没有 Ctrl+Y 逃生通道时的死局。

3. **[#10938 — feat(web-shell): Session Workflow dependencies navigable + chrome cleanup](https://github.com/QwenLM/qwen-code/pull/10938)** · autofix/takeover
   弥补 #8583 遗留的导航/结构/文档缺口。Plan DAG 以*步骤*本身而非其状态打头——这是一次有意义的交互设计转变。

5. **[#10410 — feat(core): preserve prompt cache for deferred tools](https://github.com/QwenLM/qwen-code/pull/10410)** · autofix/takeover
   用两步式的 `tool_search` + `tool_call` 桥接取代延迟工具的 schema 渐进揭示。减少了延迟工具导致的提示词缓存无谓失效。

4. **[#10457 — feat(dingtalk): native interactive cards for tool permission requests](https://github.com/QwenLM/qwen-code/pull/10457)** · review/self-reported
   钉钉侧的 UX 升级——有人值守的权限提示渲染为卡片，提供允许/拒绝/永久允许选项，并绑定发起用户与进行中的运行。

5. **[#11333 — feat(channels): add final-only and process output modes](https://github.com/QwenLM/qwen-code/pull/11333)**
   新增一个各渠道共享的输出模式开关：**仅最终结果**（默认，轮次结束时投递一次）与**过程和结果**（每段完整的助手输出单独投递）。影响所有集成渠道。

6. **[#11341 — fix(web-shell): require answers before submitting questions](https://github.com/QwenLM/qwen-code/pull/11341)**
   在 Web Shell 的每个问题都得到非空白回答之前禁用提交按钮；Enter / Ctrl+Enter 同样受此门槛约束。保留了取消和失败后重试的能力。

7. **[#11338 — fix(web-shell): keep transcript column on composer axis while turn-rail is visible](https://github.com/QwenLM/qwen-code/pull/11338)** · review/self-reported
   #11335 的直接修复——把 rail 移入滚动区旁的常规文档流，使居中锚点正确复位。

8. **[#11342 — feat(web-shell): model role and context window configuration](https://github.com/QwenLM/qwen-code/pull/11342)**
   Web Shell 设置页新增按角色选择模型的配置（Advisor / image / voice），默认值合理、行为能感知端点类型，并覆盖自定义提供商路径。

9. **[#10188 — fix(autofix): charge regressions to the brake and gate test weakening](https://github.com/QwenLM/qwen-code/pull/10188)** · autofix/takeover
   堵住两个漏洞——此前一轮迭代可以“免费”把回归带出去。让成本核算与该循环宣称的保证保持一致。

10. **[#11134 — fix(ci): retry transient all-green macOS E2E shard death once (#11131)](https://github.com/QwenLM/qwen-code/pull/11134)** · review/self-reported, needs-human
    把 Linux 的 `sandbox:none` 重试模式（#10572）移植到 macOS 分片上——失败后执行一次受预算门控的重试。针对的是反复出现的 macOS E2E 抖动。

11. **[#9983 — fix(review): keep host-trusted state out of the container's writable surface](https://github.com/QwenLM/qwen-code/pull/9983)** · autofix/takeover
    将 worktree 租约移出 `.qwen/tmp`（rw bind-mount），并阻止宿主侧 git 通过位于其中的指针进行解析。加固了 review 沙箱边界。

## 功能请求趋势

- **Web Shell 打磨与集成方界面。** 五个以上的开放请求都聚集在“把 Web Shell 做成可产品化界面”这一主题上：自定义品牌（#11357）、在 `qwen serve` 上托管自定义 Web Shell 发行版（#11358）、面向集成方的一体化 REST/SSE 文档（#11359），以及会话实时状态的 SSE 订阅（#11327）。外部集成方正把 daemon 当作一个*平台*来对待。
- **传输层中的按会话/按请求上下文。** `customHeaders` 中的 `${session_id}` 模板（#10995）是先导——集成方希望有稳定的 ID 附着在每个出站请求上，而无需逐调用传递。
- **渠道输出语义。** “仅最终结果 vs 过程和结果”（#11333）表明下游渠道消费 agent 输出的方式确实出现了分化；预计这一区分会逐渐扩散。
- **Skill 生命周期与 daemon/子进程解耦。** #11274 把一个长期抱怨正式化了：Skill 状态目前横跨 daemon + ACP 子进程纠缠不清。
- **TUI 渲染层替换。** Ink→OpenTUI 迁移（#8662）是整个看板上最大的单项架构请求，持续吸引着聚焦的讨论。

## 开发者痛点

- **Windows PTY 生命周期是当前最响亮的痛点。** 三个关联 issue（#11303、#11352、#11353）分别覆盖进程泄漏、自然退出时宿主句柄丢失、资源释放过晚——其中至少一个（#11352）不改动上游 `node-pty` 就无法修复。VS Code Companion 用户最先感受到这一点。
- **`qwen serve` 的会话/后台 shell 可靠性。** #11119——会话运行时回收时，输出与唤醒通知随之消失。后台自动化工作流（CI 轮询、定时任务）首当其冲。
- **提供商/模型回归悄然上线。** #10530 在 0.22.3 中经 llama-server 弄坏了两款特定的 Qwen 模型——正是那种没有模型矩阵就很难在 CI 中抓到的窄面回归。
- **macOS 与 E2E 上的 CI 抖动。** 多个机器人上报 CI 失败（#11367、#11364、#11307）；PR #11134 和 #11094 是专门的除抖工作。
- **锚定于上游、本地无修复路径的缺陷。** #11352（node-pty）以及 #11303 的部分内容被明确标记为受锁定依赖所阻——开发者希望有一条更清晰的说法：什么时候“在我们的仓库里修”要变成“去上游修、然后升级依赖”。
- **看起来像回归的小幅 UI 漂移。** 转录列对齐（#11335）和侧边栏分组嵌套（#11354）都在 24 小时内冒头——内部试用正在暴露新增的界面框架元素（turn rail、分组标题）与既有内容布局之间的接缝。

---

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*