# AI CLI 工具社区动态日报 2026-09-13

> 生成时间: 2026-09-13 11:31 UTC | 覆盖工具: 7 个

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

# 跨工具对比报告 — AI CLI 生态
**日期：2026-09-13 | 来源：7 款主要工具的社区摘要**

---

## 1. 生态概览

AI CLI 品类已整合为两大阵营：绑定模型订阅的官方 CLI（Claude Code、Codex、Gemini CLI、Copilot CLI），以及与厂商无关的开源脚手架（OpenCode、Pi、Qwen Code）。各处的工程关注点正在汇聚到相同的难题——沙箱执行、长上下文管理、子代理生命周期保障——而 **Windows 平台兼容性仍是每款工具中最高严重度 bug 的最大来源**。互操作性正在自下而上涌现：Gemini CLI 正在迁移 Claude Code 的 hooks 格式（#29124/#29125），Pi 实现了 Codex 的回合归属元数据（#9488），OpenCode 针对 Anthropic 的 prompt-cache 语义进行了调优（#48777）。迭代速度参差不齐——每夜构建（Gemini、Qwen）与当日热修复（OpenCode）形成了与仅维护日（Copilot CLI）的鲜明对比。

---

## 2. 活跃度对比

*数量为今日策展摘要中浮现的条目，并非 GitHub 累计总数。七个仓库在本窗口期内均有活跃的 Issue/PR 跟踪器（因此无需 N/A）；讨论区在无数据时标记为 N/A。*

| 工具 | 浮现的 Issue | 浮现的 PR | 讨论 | 发布（24h） |
|---|---|---|---|---|
| **Claude Code** | 10（+4 提及） | 6 | N/A* | ✅ v2.1.270（回滚补丁） |
| **OpenAI Codex** | 10 | 10 | 5 | 无 |
| **Gemini CLI** | 10 | 10 | N/A* | ✅ v0.61.0-nightly |
| **Copilot CLI** | 7 | 3 | N/A* | 无 |
| **OpenCode** | 10 | 10 | N/A* | 无 |
| **Pi** | 10 | 7 | 1 | 无 |
| **Qwen Code** | 10 | 10 | N/A* | ✅ v0.23.3-nightly + cua-driver-rs v0.20.6 |

\* *摘要窗口期内无讨论数据——并非无活跃度的证据。*

**互动极值：** Claude Code #85891（239 👍，数据集中最高）和 #42776（180 条评论）；Codex #40700（48 条评论）和 #21803（37 👍，最热门功能诉求）；OpenCode #36942（31 👍）。Codex 拥有最广泛的讨论覆盖面，包括维护良好的 150+ 工具生态索引（#16329）。

---

## 3. 共同的功能方向

1. **操作系统级 / 容器化沙箱**——汇聚度最高的方向，7 款中 3 款在并行构建：Codex（MXC 后端接入 #45176、清理阶段 #45178、token-group 加固 #45182），Gemini（Seatbelt/bubblewrap 史诗 #19873、边界加固 #29214），Qwen（harness/executor 拆分 #11695、docker/podman 后端 #11711、review 租约 #11540）。
2. **子代理可靠性与生命周期保障**——Gemini（P1 挂起 #21409、误报 `GOAL` 成功 #22323/#21983），Claude Code（休眠时后台代理静默死亡 #63023），Qwen（React #185 崩溃集群 #11500/#11732/#11756），Copilot（可观测性诉求 #2254），Codex（异步消息 #45124），Pi（回合归属 #9481、循环防护）。
3. **压缩安全性与上下文预算 UX**——Codex（原地转录销毁 #44363、约 150k 缓存 token 重放 #44386），Claude Code（"usage limit" 掩盖压缩失败，PR #61716 已开放约 4 个月），Qwen（容量概览 + 手动压缩 #11700），Gemini（递归检索漂移风险，讨论 #42703）。
4. **Prompt-cache / 成本保留**——OpenCode（冻结的系统提示 #48777、通过代理实现 0% 缓存 #45750），Copilot（#4829），Codex（#45094）。破坏缓存的回归现在会立即引发报告——成本可观测性已成为基线预期。
5. **持久化 / 自我演化的代理记忆**——Codex `/learn` RFC #40575（29 条评论），Gemini Auto Memory 加固（#26525 脱敏、#26522 循环抑制），Qwen（#11280 恢复时技能重新应用）。
6. **Windows 兼容性**——Claude Code（#42776、#85891、#84792 MSIX），Codex（#40700 启动失败、#42299 全局 Alt+P 捕获），OpenCode（ConPTY 退出损坏 #48776、WSL #48796、非 git 会话 #48762）。
7. **跨设备 / 瘦客户端触达**——Codex（#21803 云同步，37 👍），Qwen（#11704 基于 ACP 的 Android、#11548 远程守护进程、#11086 工作区作用域的服务）。
8. **遥测脱敏**——Qwen（#11198，P1 安全：未脱敏的工具错误上报）和 Gemini（#26525）都面临在传输前脱敏的压力。

---

## 4. 差异化分析

- **Claude Code**——社区规模最大；通过插件（"mods"）生态的正式化实现差异化（按 mod 的测试脚手架 #93912/#93951、内置 UI 兼容性 #93452）。瓶颈：桌面打包与 Windows 分发质量。
- **Codex**——系统工程最深（沙箱内部实现、SID 处理、供应链升级）以及 RFC 驱动的设计文化。风险面：压缩当前具有数据破坏性（#44363）。
- **Gemini CLI**——最有纪律的分流（P1–P3、规模标签、每夜自动化）；投资于基础能力史诗（AST 感知工具 #22745）而非功能特性，并显式实现竞争对手的格式——实际上的标准化策略。
- **Copilot CLI**——GitHub 平台内的多模型脚手架（claude-opus-5、gpt-5.4 在用）；今日活动纯属维护性（SHA 固定的 Actions、Dependabot）。用户诉求集中在可观测性与成本，而非功能特性。
- **OpenCode**——厂商无关的聚合器（Zen、Kimi、cerebras、代理）；数据集中最快的响应循环（issue #48776 → 当日合并的热修复 #48782）；独特的 TUI 无障碍投资（原生 RTL/bidi #48587）。
- **Pi**——定位为协议兼容层：Codex 回合归属兼容、OAuth 订阅登录（Antigravity、Cursor Pro、Meta/Muse）、扩展 API，以及正式的性能 SLO（#7739）。面向扩展作者和多提供商的进阶用户。
- **Qwen Code**——进行中的架构重构最具野心（harness/executor 解耦 #11695、容器执行 #11711）加上移动/守护进程策略与独立发布的原生 CUA 驱动；背负显著的遥测隐私债（#11198）以及未解决的 TUI 崩溃集群。

**目标用户分化：** 官方模型订阅者（Claude、Codex、Gemini）vs. 自带模型与自托管用户（OpenCode、Pi、Qwen；Copilot 介于两者之间）。

---

## 5. 社区动能与成熟度

- **互动领跑者：** Claude Code 是异常值（180 条评论和 239 👍 的帖子——规模的代价在 Windows 摩擦持续数月中可见）。Codex 拥有最广泛的讨论文化；OpenCode 显示出强烈的点赞驱动优先级信号。
- **最快迭代：** Gemini（每夜构建 + 优先级分流）、Qwen（每夜构建加上独立版本化的原生二进制）、OpenCode（当日热修复）、Codex（约 10 个合并 PR，机器人辅助的合并吞吐）。
- **最慢可见速度：** Copilot CLI——3 个维护性 PR，无发布，无讨论浮现。单一窗口无法区分"产品稳定"与"开发在其他地方进行"，但它是最明显的异常值。
- **Pi** 评论量较少（≤6），但每帖的工程密度异常高——早期但健康。
- **成熟度判断：** Claude Code 和 Codex 展现出规模 *与* 规模相关的痛点（分发、计费边缘情况）；Gemini/Qwen/OpenCode 在架构上迭代最快；Pi 较为小众但战略上一致。

---

## 6. 趋势信号

1. **沙箱至上。** 执行隔离正从策略允许列表迁移到 OS/容器原语。评估工具时，应高度重视公开的沙箱路线图。
2. **事实标准自下而上涌现。** Claude Code 的 hooks 格式（现已被 Gemini 迁移）、Codex 的会话/回合元数据（由 Pi 实现）、Anthropic 缓存语义（由 OpenCode 调优）正成为互操作层——基于它们构建可降低锁定风险。
3. **会话正变为长生命周期、可分叉的资源。** Fork/分支人体工学（Pi）、恢复保真度 bug（各处皆有）以及 Codex 的压缩数据丢失 bug（#44363）标志着持久化转录与非破坏性压缩将成为下一个竞争差异化点。
4. **成本/缓存可观测性已是基本要求。** 静默的缓存破坏现已在三款工具中引发当日报告。
5. **瘦客户端、胖守护进程、移动伴侣。** Qwen 的远程守护进程 Web Shell 和 Android 提案加上 Codex 获赞最多的同步请求，表明远程控制协议将在工具选型中变得重要。
6. **Windows 是无人过关的基本要求。** 以 Windows 为主的组织今天就应为平台特定的故障预留预算。
7. **遥测审查正在升温。** 默认开启、未脱敏的遥测（Qwen #11198）现已被用户视为安全问题——请审查你的 CLI 默认上传了什么。

**给评估者的结论：** 在沙箱架构、压缩安全性和缓存透明度上短名单；将 Windows 支持成熟度视为风险乘数；并关注上述互操作标准——它们正是生态正在浮现的共同基础。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区焦点报告
**数据快照：** 2026-09-13 | **来源：** github.com/anthropics/skills

> **方法说明：** 本快照中 PR 评论数不可用（全部标记为 `undefined`），因此排名使用综合信号 —— 关联 issue（被引用的 bug/复现）、更新时效以及围绕同一痛点的 PR 聚类程度。Issue 端的参与度使用已确认的评论数。

---

## 1. 热门 Skill 排名（按社区关注度）

### 1. `skill-creator` —— 评估管线修复（讨论量最高的话题）
- **PR #1298** —— fix: `run_eval.py` 始终报 0% 召回率 ([link](https://github.com/anthropics/skills/pull/1298))
- **PR #1099** —— Windows 子进程崩溃修复 ([link](https://github.com/anthropics/skills/pull/1099))
- **PR #1050** —— Windows 子进程与编码 bug ([link](https://github.com/anthropics/skills/pull/1050))
- **关联 issue #556** —— 12 条评论，10+ 独立复现 ([link](https://github.com/anthropics/skills/issues/556))
- **讨论：** 描述优化循环目前是在对着噪声做优化。三个独立的 PR 都瞄准同一个 `run_eval.py` 缺陷，说明这是仓库中被反馈最多的故障。**状态：** 全部 OPEN。

### 2. `mcp-builder` —— 评估框架与 SDK 兼容性
- **PR #1742** —— `mcp>=2` 导入路径与自定义请求头 ([link](https://github.com/anthropics/skills/pull/1742))
- **PR #1724** —— 将默认评估模型升级到 claude-sonnet-5 ([link](https://github.com/anthropics/skills/pull/1724))
- **PR #1602** —— 序列化、指标、编码、稳定性 ([link](https://github.com/anthropics/skills/pull/1602))
- **关联 issue #1390** —— 4 条评论：Phase-4 评估在所有真实 MCP 服务器上得分 0/N ([link](https://github.com/anthropics/skills/issues/1390))
- **讨论：** 评估工具链是端到端坏掉的：评分机制凭空捏造工具错误（`TextContent` 无法 JSON 序列化），而它所依赖的 SDK 接口早已改弦更张。**状态：** 全部 OPEN。

### 3. `claude-api` —— 模型生命周期管理
- **PR #1607** —— 将四个已退役模型 ID 标记为 retired ([link](https://github.com/anthropics/skills/pull/1607))
- **关联 issue #1487** —— 4 条评论：skill 会急切注入约 156k tokens，一次工具调用就把上下文撑爆 ([link](https://github.com/anthropics/skills/issues/1487))
- **讨论：** 文档化的模型与当前 SDK 现状互相矛盾，而急切注入则破坏了单次调用的工作流。**状态：** OPEN。

### 4. `pdf` —— 大小写敏感的文件引用
- **PR #538** —— 修正 SKILL.md 中大小写敏感的文件引用 ([link](https://github.com/anthropics/skills/pull/538))
- **讨论：** 文档中写的文件名（`REFERENCE.md`、`FORMS.md`）与实际文件名（`reference.md`、`forms.md`）存在 8 处不匹配 —— 在 Linux 上会静默失效。该 PR 自三月起就静静躺在这里。**状态：** OPEN。

### 5. `docx` —— 修订追踪与书签 ID 冲突
- **PR #541** —— 防止修订追踪与书签之间的 `w:id` 冲突 ([link](https://github.com/anthropics/skills/pull/541))
- **PR #1734** —— 检测孤立的 docx 注释 ([link](https://github.com/anthropics/skills/pull/1734))
- **讨论：** OOXML 共享的 ID 命名空间会导致文档损坏；docx skill 持续吸引底层正确性方面的修复。**状态：** 均为 OPEN。

### 6. `frontend-design` —— Skill 清晰度重构
- **PR #210** —— 提升指令的清晰度与可执行性 ([link](https://github.com/anthropics/skills/pull/210))
- **讨论：** 一个基础性创意 skill 正在被重写，目的是让其中的指令在一次对话内真正可执行。**状态：** OPEN。

### 7. `web-artifacts-builder` —— 工具链漂移
- **关联 issue #1362** —— 3 条评论：pnpm ≥10.1 出现 ERR_PNPM_IGNORED_BUILDS、favicon 剥离逻辑过时、字体内联 ([link](https://github.com/anthropics/skills/issues/1362))
- **讨论：** 打包脚本已经跟不上上游包管理器的演进。**状态：** OPEN。

### 8. `document-typography` —— 新 Skill 提案
- **PR #514** —— 排版质量控制（孤行、寡头、编号格式） ([link](https://github.com/anthropics/skills/pull/514))
- **讨论：** 针对 AI 生成文档中一种近乎普遍存在的失败模式。较慢的合并节奏说明新文档质量类 skill 的门槛很高。**状态：** OPEN。

---

## 2. 社区需求趋势

| 排名 | 主题 | 证据 |
|---|---|---|
| 1 | **安全与信任边界** | Issue #492 —— 43 条评论，2 👍：以 `anthropic/` 命名空间分发的社区 skill 会被用来实施冒充 ([link](https://github.com/anthropics/skills/issues/492)) |
| 2 | **组织级 skill 分发** | Issue #228 —— 16 条评论，8 👍：希望在 Claude.ai 内部提供原生的 skill 共享能力 ([link](https://github.com/anthropics/skills/issues/228)) |
| 3 | **多 Agent 编排** | PR #1628 Hivemind ([link](https://github.com/anthropics/skills/pull/1628))；Issue #1385 Reasoning Quality Gate Pipeline ([link](https://github.com/anthropics/skills/issues/1385)) |
| 4 | **跨平台可靠性（Windows）** | 三个 PR（#1298、#1099、#1050）以及针对同一根因的多项修复 |
| 5 | **Skill 自审与质量** | PR #1367 self-audit ([link](https://github.com/anthropics/skills/pull/1367))；PR #83 skill-quality-analyzer ([link](https://github.com/anthropics/skills/pull/83)) |
| 6 | **Skills ↔ MCP 桥接** | Issue #16 —— "Expose Skills as MCPs"，4 条评论 ([link](https://github.com/anthropics/skills/issues/16)) |
| 7 | **紧凑 / Token 高效的 memory** | Issue #1329 —— compact-memory 提案，9 条评论 ([link](https://github.com/anthropics/skills/issues/1329))；Issue #1487 —— 156k token 急切注入 |
| 8 | **云平台可移植性** | Issue #29 —— Bedrock 使用，4 条评论 ([link](https://github.com/anthropics/skills/issues/29)) |
| 9 | **文档工作流覆盖** | PR #486 ODT ([link](https://github.com/anthropics/skills/pull/486))；PR #514 排版；PR #1627 内容调度的 Buffer API ([link](https://github.com/anthropics/skills/pull/1627)) |

---

## 3. 高潜力待合并 Skill

以下 PR 尚未合并，但具备最强的即将落地信号：

| PR | Skill | 为何可能很快合并 | 链接 |
|---|---|---|---|
| #1298 | skill-creator 评估修复 | 关联 issue #556（12 条评论），是仓库中最活跃的话题 | [link](https://github.com/anthropics/skills/pull/1298) |
| #1742 | mcp-builder SDK 兼容 | 关联 issue #1668；在 mcp≥2 上阻碍所有 mcp-builder 用户 | [link](https://github.com/anthropics/skills/pull/1742) |
| #1724 | mcp-builder 模型升级 | 纯文档/默认值更新，风险极低 | [link](https://github.com/anthropics/skills/pull/1724) |
| #1607 | claude-api 退役模型 | 文档卫生性修复，关闭 issue #1603 | [link](https://github.com/anthropics/skills/pull/1607) |
| #1602 | 评估序列化修复 | 一次性聚合 4+ 个已知缺陷 | [link](https://github.com/anthropics/skills/pull/1602) |
| #1367 | self-audit skill | 提出一种带机械化验证的通用推理质量门槛 | [link](https://github.com/anthropics/skills/pull/1367) |
| #83 | skill-quality-analyzer / security-analyzer | 面向 Skill 市场本身的元 skill | [link](https://github.com/anthropics/skills/pull/83) |
| #486 | ODT skill | 将文档格式覆盖扩展到 ODF | [link](https://github.com/anthropics/skills/pull/486) |
| #1627 | buffer-api skill | 跨 Agent 可移植的 GraphQL 调度能力 | [link](https://github.com/anthropics/skills/pull/1627) |

---

## 4. Skills 生态洞察

**社区最集中的需求集中在 Skill 的可信评估与分发基础设施上** —— 同时支撑 `skill-creator` 和 `mcp-builder` 的同一套评估管线在多个平台上是坏的（#1298、#1099、#1050、#1602、#1390），命名空间正被滥用于信任边界攻击（#492），而组织内部目前还没有一等公民的方式来共享或审计 Skill（#228、#83）。

简而言之：**瓶颈已经不再是编写 Skill —— 而是验证、信任与分发它们。**

---

# Claude Code 社区摘要 — 2026-09-13

## 📌 今日要点
- **v2.1.270 发布**，这是一个快速补丁版本，回滚了 2.1.269 中引入的回归问题——只读 git 命令在会话运行过程中会重复弹出权限请求——对于依赖 Bash 的工作流来说是个小但操作上令人困扰的修复。
- **Windows/桌面端问题占据议题榜首。** 两个高互动帖子（#42776 有 180 条评论，#85891 有 239 👍）暴露了 Windows 11 上文件锁重启失败和窗口始终置顶的长期问题。
- **"mods" 插件生态正在整合。** poteat 推送了一组已合并的 PR（#93912、#93452、#93932）以及一个开放的重构 PR（#93951），将 mods/diff、sec-default 和 telemetry 的测试代码移到 mods 本体旁边，并使它们的类型路径和 UI 与内建插件对齐。

---

## 🚀 版本发布

### [v2.1.270](https://github.com/anthropics/claude-code/releases/tag/v2.1.270)
单行补丁版本：
- 修复了在会话运行一段时间后，Bash 中的只读 git 命令意外请求权限的问题（2.1.269 引入的回归）。

无新增功能——这是一个严格的回滚。如果你正在使用 2.1.269 且依赖长时间运行的会话，建议立即升级。

---

## 🔥 热门议题

1. **[#42776 — Claude Code 桌面版在 Windows 上因孤立进程文件锁而无法重启](https://github.com/anthropics/claude-code/issues/42776)** *（OPEN，180 条评论，88 👍）*
   虽然被标记为无效，但仍是讨论量最高的 bug。使用 Windows 原生安装包的用户反复遇到孤立文件锁导致桌面版无法重启的问题；该帖子已成为社区记录重装/重启解决方法的日志。*重要性：* 反映了 Windows 发行方案存在真实的使用摩擦。

2. **[#85891 — Claude 桌面版（Win11）主窗口始终置顶且无设置项](https://github.com/anthropics/claude-code/issues/85891)** *（OPEN，100 条评论，239 👍）*
   与 macOS 的 #66516 对应的 Windows 问题。窗口拒绝让出焦点给其他应用，且没有开关。239 票的点赞比是数据集中最高的——*开发者想要的是"一键关闭"开关*，而不只是一个修复。

3. **[#69044 — 数月日常使用 Claude Code 中记录到的反复出现的错误](https://github.com/anthropics/claude-code/issues/69044)** *（OPEN，48 条评论）*
   一位资深用户整理了一份德语的结构化反馈文档，涵盖了跨模型领域的反复错误模式。作为长期可靠性问题的纵向信号很有价值，尽管它并非单一复现案例。

4. **[#63023 — 后台 agent 在会话暂停/恢复时静默死亡](https://github.com/anthropics/claude-code/issues/63023)** *（OPEN，9 条评论）*
   使用 `run_in_background: true` 调用的 agent 会在宿主会话休眠或闲置时被终止，但**永远收不到完成通知**——工作静默丢失。*重要性：* 破坏了后台 agent 存在的初衷——"合上笔记本 → 稍后恢复"的工作流。

5. **[#74708 — WorktreeRemove hook 在会话退出时删除 worktree 时从不触发](https://github.com/anthropics/claude-code/issues/74708)** *（CLOSED，9 条评论）*
   文档声称 hook 会在会话退出清理时触发，但在 macOS 26.5 上不会。对于 CI 卫生依赖 `WorktreeRemove` 的团队来说是个常见陷阱。

6. **[#74023 — `.claude/settings.json` 相对于字面 cwd 而非 git 根目录解析](https://github.com/anthropics/claude-code/issues/74023)** *（CLOSED，8 条评论）*
   从子目录启动时会静默丢弃所有项目范围内的设置。影响很大，因为它是隐形的——开发者以为他们的 `.claude/` 配置已加载，实际上并没有。

7. **[#71437 — Claude 桌面版中的 `/clear` 原地重置当前会话，而非创建新会话](https://github.com/anthropics/claude-code/issues/71437)** *（CLOSED，7 条评论）*
   桌面版 `/clear` 行为与 CLI `/clear` 不同，破坏了肌肉记忆，也破坏了依赖"先归档再清除"的工作流。

8. **[#79776 — 无版本号的官方插件在每次刷新时反复触发"Plugins updated"横幅](https://github.com/anthropics/claude-code/issues/79776)** *（OPEN，4 条评论）*
   影响 `skill-creator`、`frontend-design` 以及任何没有 semver 的插件。虽然是表面问题，但会让用户习惯忽略该横幅——这是糟糕的安全 UX。

9. **[#86979 — 公开的编程评测分数将任务解题与已知修复检索混为一谈](https://github.com/anthropics/claude-code/issues/86979)** *（CLOSED/invalid，4 条评论）*
   一项评测/透明度的批评意见，要求 Anthropic 披露评测套件已知修复与真实任务解题之间的泄露率。虽然被关闭并标记为无效，但讨论串是基准方法论辩论的有用参考。

10. **[#93675 — Task 工具按模型关闭，无设置项，默认无法保留会话清单](https://github.com/anthropics/claude-code/issues/93675)** *（OPEN enhancement，1 条评论）*
    自 2.1.233 起，`TaskCreate`/`TaskList`/`TodoWrite` 在 Opus 4.8、Sonnet 5、Fable 5 及更新版本上不可用，除非设置 `CLAUDE_CODE_ENABLE_TODO_TOOLS=1`。用户希望通过 settings 控制，而非环境变量。*重要性：* 对在长会话中依赖任务跟踪的人来说是个真实的隐患。

*值得一提：* [#89026（hookify 在 Windows 上跳过非 ASCII）](https://github.com/anthropics/claude-code/issues/89026)、[#92004（auto-continue-at-limit 仅在 N 个并发会话中的一个触发）](https://github.com/anthropics/claude-code/issues/92004)、[#93688（Linux 桌面版 `.desktop` 条目破坏 `claude://` 移交）](https://github.com/anthropics/claude-code/issues/93688) 以及 [#84792（MSIX 自动更新导致应用无法启动，0x80070002）](https://github.com/anthropics/claude-code/issues/84792) ——都是评论较少但可复现的问题。

---

## 🛠️ 关键 PR 进展

1. **[#41621 — 添加缺失的 CLI 构建基础设施和打包配置](https://github.com/anthropics/claude-code/pull/41621)** *（CLOSED）*
   添加了完整的源码树、esbuild 打包配置和构建文档，以便 CLI 可以从 TypeScript 编译为单个可执行文件。现已合并——如果你想要可复现的本地构建 Claude Code，这是很好的参考。

2. **[#93951 — mods：将 diff、sec-default 和 telemetry 的测试移至 mods 本体旁](https://github.com/anthropics/claude-code/pull/93951)** *（OPEN）*
   重构测试布局，使每个 mod 的测试位于 `mods/<mod>/tests/` 中，可通过 `claude plugin test` 运行。开放中，有望成为 mods 生态的规范测试模式。

3. **[#93932 — mods：telemetry 的 types 路径与其他 manifest 路径一样使用 `./` 相对路径](https://github.com/anthropics/claude-code/pull/93932)** *（CLOSED）*
   一行一致性修复：`"types": "./types/index.d.ts"`。已合并——填补了之前拒绝其他位置所用的裸相对路径的 schema 验证缺口。

4. **[#93452 — mods/diff：对齐内建 `/diff` 面板](https://github.com/anthropics/claude-code/pull/93452)** *（CLOSED）*
   使 `/diff` mod 的面板与内建 diff 面板对齐：相同的 hunk 渲染、✕ 关闭按钮、行间距、空状态位置、窄终端缩放处理，以及"同时只探测一个仓库"的语义。

5. **[#93912 — mods：diff、sec-default 和 telemetry 的单元测试，按插件声明类型化](https://github.com/anthropics/claude-code/pull/93912)** *（CLOSED）*
   每个测试都获得引擎自带的 `$` 和 `on`，并根据需要注册 `mock.clock` / `mock.store` / `mock.env` 辅助函数。为 #93951 所基于的测试框架奠定了基础。

6. **[#61716 — [docs] 添加因上下文溢出导致误报使用上限的故障排查说明](https://github.com/anthropics/claude-code/pull/61716)** *（OPEN，自 2026-05-23 起）*
   文档说明"已达到使用上限"实际上可能是 `/compact` 在 1M 上下文模型上失败，切换到 1M 模型是解决方法。关闭 #50321。*重要性：* 一个长期存在的困惑源，修复很小却已搁置约 4 个月。

---

## 📈 功能请求趋势

汇总自标记为 `enhancement`、`feature` 及嵌入 bug 报告中的功能类请求：

1. **桌面窗口控件** — 始终置顶开关 (#85891)、焦点/让步行为、多窗口会话处理 (#92004)。*方向：将桌面版视为一等窗口应用，而非包裹的 TUI。*
2. **插件/市场打磨** — 无版本号插件的横幅抑制 (#79776)、hookify 示例文件前缀文档 (#79143)，以及跨生命周期事件的一致 hook 行为 (#74708)。*方向：收紧插件 DX 契约。*
3. **会话生命周期管理** — 断开连接的远程控制会话的归档/清理 (#87877)、限额重置时的并行会话自动续接 (#92004)、后台 agent 跨暂停/恢复的存活 (#63023)。*方向：会话正在成为长寿资源；用户想要生命周期原语。*
4. **设置 UI/可发现性** — settings.json 中的任务工具开关 (#93675)、跟随 git 根目录而非 cwd 的设置 (#74023)。*方向：消除环境变量的逃生口，转向声明式设置。*
5. **授权/账户层级** — 捆绑 Claude Code 席位的家庭/家族套餐 (#75063)。*方向：更多的多用户打包方式。*
6. **评测透明度** — 披露已知修复检索与真实任务解题之间的泄露率 (#86979)。*方向：不是产品功能，但是反复出现的社区诉求。*

---

## 😤 开发者痛点

数据反复暴露的常见摩擦点：

- **Windows 桌面打包脆弱。** 一组相关问题——#42776（文件锁）、#84792（MSIX 0x80070002）、#87097（CLI 自动更新阻塞主线程）、#89026（非 ASCII 被跳过）——表明 Windows 发行方案尚未达到 macOS/Linux 的可靠性。
- **Hook 行为与文档不一致。** `WorktreeRemove` 在退出时不触发 (#74708)、hookify 示例文件缺少强制前缀 (#79143)、hookify 在 Windows 上静默丢弃非 ASCII (#89026)。任何围绕 hook 构建严肃 CI 的团队都会遇到这些问题。
- **设置解析存在隐患。** `.claude/settings.json` 相对于字面 cwd 解析 (#74023)，而新的开关类环境变量（如 `CLAUDE_CODE_ENABLE_TODO_TOOLS`）正在浮现，而非设置项 (#93675)。
- **后台/并行 agent 缺乏生命周期保证。** 后台 agent 在休眠时静默消失 (#63023)；N 个并发桌面会话中只有一个在限额重置时获得自动续接 (#92004)。
- **"已达到使用上限"是误导性错误。** 它实际上可能意味着 `/compact` 在 1M 上下文模型上失败；这种错误标记已是众所周知的 (#50321，通过文档修复的 PR #61716 已搁置数月)。
- **插件市场 UX 训练用户忽略横幅。** 无版本号插件在每次刷新时反复触发"Plugins updated"横幅 (#79776)——典型的告警疲劳路径。
- **面向高级用户的源码构建摩擦。** 在 #41621 落地之前，从源码构建 Claude Code 需要不小的拆解工作；该 PR 存在本身就说明了社区对此的需求频率。
- **跨平台窗口/桌面约定。** 始终置顶无开关 (#85891)、Ubuntu 上的 `.desktop` 条目破坏自身的 `claude://` 移交 (#93688)——桌面平台约定仍在以"逐个 bug"的方式被学习。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-13

## 今日要点

社区今天的关注焦点集中在 **Windows 平台回归问题**：打包的 `codex.exe` 无法从 WindowsApps 中迁移出来，Codex 桌面进程始终无法生成窗口，以及 `Alt+P` 被全局拦截（导致 Unreal Engine 的 Play 快捷键失效）。在协议与运行时一侧，**多个上下文压缩缺陷浮出水面** —— 自动压缩会就地重写 rollout 并破坏对话记录，或让已经过时的指令重新出现。与此同时，`copyberry[bot]` 自动化合入了一批 **Windows 沙箱重构**，将新的 MXC 后端接入命令执行流程，并伴随一份值得关注的 RFC，提议通过 `/learn` 机制让 `AGENTS.md` 实现自我演化。

## 发布

*过去 24 小时内无新发布。*

## 热门 Issue

1. **[#40700](https://github.com/openai/codex/issues/40700) — Codex Desktop 无法启动：打包的 codex.exe 从 WindowsApps 迁移失败（48 条评论）**
   当日最高热度的 Bug。Windows 11 24H2 用户在版本 26.820.7780.0 上完全无法启动 Codex Desktop；打包的二进制无法移出 WindowsApps 沙箱，连 About 对话框都无法渲染。对 Plus 用户来说是一个高影响的阻塞问题。

2. **[#40575](https://github.com/openai/codex/issues/40575) — [RFC] 自我演化 Agent：`AGENTS.md` 的 `/learn` 与规则代谢机制（29 条评论）**
   一项雄心勃勃的设计提案，面向长时间运行的 Agent，能将用户纠错提炼为持久的 `AGENTS.md` 规则，并附带明确的规则淘汰/合并语义。值得关注其对 Codex 记忆演化方向的影响。

3. **[#34331](https://github.com/openai/codex/issues/34331) — Windows：在 danger-full-access 下对路径绑定的被忽略缓存目录执行删除被拦截（15 条评论）**
   即使缓存目录已被显式忽略，沙箱仍拒绝删除。影响了使用高权限 workspace-write 配置的 Pro 20x 用户，与用户「忽略了 = 可删除」的预期相矛盾。

4. **[#38128](https://github.com/openai/codex/issues/38128) — Remote Control 在未 root 的 GrapheneOS 上阻断 ChatGPT Android 注册（15 条评论，👍10）**
   官方的 GrapheneOS 客户端在配对时被错误地标记为异常。考虑到 GrapheneOS 在安全方面的口碑，这很可能是安全检查中的厂商识别误报。

5. **[#42299](https://github.com/openai/codex/issues/42299) — Windows：`Alt+P` 被全局拦截，关闭 Codex 并阻塞 Unreal Engine 的 Play（11 条评论，👍5）**
   全局热键的捕获范围泄露到了应用窗口之外，打断 IDE/编辑器的快捷键。属于典型的 Electron accelerator Bug，需要修正作用域。

6. **[#28361](https://github.com/openai/codex/issues/28361) — Windows：`codex mcp-server` 与子 MCP 服务器永远不会被回收（9 条评论）**
   长期存在的进程泄漏：每次 MCP 请求都会派生一个新的 `codex app-server` 以及若干子 MCP 服务器，且永远不会被清理——在 Claude Code 这类长时间运行的主机上可能堆积数百个进程。

7. **[#42466](https://github.com/openai/codex/issues/42466) — Browser Use 在所有站点失败：无法验证管理员强制策略（9 条评论）**
   新的浏览器工具在启用 ChatGPT 扩展的 Chrome 上完全不可用，阻断了所有通过浏览器进行的自动化流程。

8. **[#21803](https://github.com/openai/codex/issues/21803) — Codex Projects 与 Chats 的跨设备同步（8 条评论，👍37）**
   本时间窗口内获赞最多的功能请求。多台 Mac 的用户希望在同一个 OpenAI 账户下云端同步 Projects 与 Chats —— 这是一项缺失的基础连续性体验。

9. **[#44386](https://github.com/openai/codex/issues/44386) — Codex Desktop 每次工具调用重放约 150k 缓存输入，消耗 Plus 额度（3 条评论）**
   每次工具调用似乎都会重发约 150K 的缓存 token，导致 Plus 套餐账单大幅膨胀。可能是计费/定价层面的可被利用点，也可能是 token 估算出现了回退。

10. **[#44363](https://github.com/openai/codex/issues/44363) — 上下文压缩就地重写已存储的 rollout，永久破坏对话记录（3 条评论）**
    压缩会静默覆盖 rollout 文件，而不是归档它。在会话中段触发压缩后，用户无法恢复历史——这是一个数据丢失 Bug，而非简单的体验问题。

## 关键 PR 进展

1. **[#45185](https://github.com/openai/codex/pull/45185) — 将直接工具调用元数据绑定到调用输出上**
   将直接工具调用记录（含复用的 call ID）始终挂在产生该输出的调用上。Completeness 现在独立于工具成功与否来描述调用清单。

2. **[#45182](https://github.com/openai/codex/pull/45182) — 在复制 SID 前校验 Windows 沙箱的 token 组**
   新增一个共享的 `token_groups` 辅助函数，支持调用方提供大小限制；修掉了当 SID 指针超出返回缓冲区时的 OOB 遍历。

3. **[#45180](https://github.com/openai/codex/pull/45180) — 抽取共享的网络配置与环境策略辅助函数**
   引入 `PreparedNetworkConfig`，将代理准备与管理网络应用解耦，在权限回退时保留准备阶段的状态。

4. **[#45178](https://github.com/openai/codex/pull/45178) — 将 Windows 沙箱清理拆分为准备阶段与完成阶段**
   `prepare_packaged_windows_sandbox_cleanup` 在返回前禁用沙箱账户并停止进程，返回一个持有 setup 锁的 `PreparedWindowsSandboxCleanup` 守卫对象。

5. **[#45176](https://github.com/openai/codex/pull/45176) — 将 Windows MXC 沙箱接入命令执行**
   增加显式的 MXC 后端选择，将身份信息贯穿到 exec-server 的进程上报与违规分类中。标志着 Windows 上一个新的沙箱后端即将上线。

6. **[#45169](https://github.com/openai/codex/pull/45169) — 将 Windows 沙箱的 setup 与安装存储抽到库中**
   将 setup 辅助函数与存储操作搬入 `codex-windows-sandbox`，二进制改为委托给 `setup_helper_main`。

7. **[#45149](https://github.com/openai/codex/pull/45149) — musl 构建使用 OpenSSL 3.6.4**
   静态链接的 OpenSSL 升级到 3.6.4（安全发布版本），同时为 `x86_64` 和 `aarch64` musl 目标保留 3.x ABI。

8. **[#45124](https://github.com/openai/codex/pull/45124) — 异步用户消息的特性开关**
   新增 `send_message_to_user_async`（默认关闭），仅对根 Agent 开放 —— 为未来的子 Agent 通信模式打好基础。

9. **[#45094](https://github.com/openai/codex/pull/45094) — 根据内容而非序列化包络来估算历史 token**
   在 token 估算时去掉 message ID、元数据与 JSON 转义 —— 应能缓解 #44386 中观察到的缓存输入重放膨胀。

10. **[#45089](https://github.com/openai/codex/pull/45089) — 延迟自动 recap 并压缩其 TUI 排版**
    将自动 recap 间隔从 3 分钟延长到 30 分钟，并切换为更紧凑的斜体 `↳ Recap:` 排版，缓解长时间会话中关于 recap 噪音的反馈。

## 热门讨论

**Ideas**
- **[#42703](https://github.com/openai/codex/discussions/42703) — 长程上下文：历史检索会让历史本身递归地自指吗？**
   指出了新的 token 预算/`history`/`notes`/`new_context` 模型的一个微妙失败模式——如果每个新窗口检索到的 notes 本身又在描述先前的检索过程，会话可能会逐渐偏离原始任务。在采用新的上下文生命周期之前值得一读。

**General**
- **[#45211](https://github.com/openai/codex/discussions/45211) — 公开声明：重新开放 Pro 20X 申请、解决韩语质量问题、明确重置政策**
   一位用户公开发声，反映 Pro 20X 注册暂停、韩语混用问题以及 $80 付费重置行为。与下文若干速率限制问题相互印证。

**Show and tell**
- **[#16329](https://github.com/openai/codex/discussions/16329) — Awesome Codex CLI：精心整理的 150+ 生态工具清单**（7 条评论）
   持续维护的社区索引，覆盖子 Agent、技能、MCP 服务器与插件。适合作为新用户的入口。
- **[#45205](https://github.com/openai/codex/discussions/45205) — Orchestrator：面向 Codex + Kanban + code review 的免费 Mac 工作台**
   一款开源 Mac 应用，将 Codex 任务与仓库、会话以及最终 diff 关联起来。
- **[#44291](https://github.com/openai/codex/discussions/44291) — Brain Scanner：在下一个任务之前理解你的编码 Agent 做了什么**
   在项目地图与后续任务旁展示已记录的 Agent 工作内容。
- **[#45128](https://github.com/openai/codex/discussions/45128) — VibeFuse：在 Windows 画布上将 Codex CLI 作为实时小组件运行**
   面向 Codex CLI、Claude Code、Gemini CLI、Cursor 与 Qwen 的多 Agent 桌面编排工具。

## 功能请求趋势

1. **跨设备同步** —— Projects/Chats 跨机器跟随用户（#21803，37 👍）。当前最具杠杆效应的空白点。
2. **自我演化/持久的 Agent 记忆** —— `AGENTS.md` 的 `/learn` 与规则代谢（#40575），更丰富的 `notes`/`history` 检索（#42703）。两者共同推动长程任务支持。
3. **更好的 Windows 沙箱体验** —— 可识别的 `openai_base_url` 错误（#40435），让 `danger-full-access` 真正能删除被忽略的目录（#34331），以及在 `CreateProcess` 命令长度限制下的合理默认值（#38985）。
4. **透明的用量与计费** —— 同时展示 5 小时与每周限额（#41553），统一暴露重置日期（#44663），核查付费重置后 Astra 上 5× 用量激增问题（#44894）。
5. **子 Agent 与工具调用生命周期** —— 异步用户消息（#45124），子 Agent 审阅的可信审批路径（#45167），保留压缩后的对话记录（#44363、#42695）。
6. **跨平台质量打磨** —— 应用内浏览器的 Apple Passwords AutoFill（#38004），合理的全局热键作用域（#42299），Edge/Chrome/WSL 之间浏览器与 computer-use 的一致性（#44169、#34458、#42466）。

## 开发者痛点

- **Windows 仍是最粗糙的体验面**：应用无法启动（#40700），Electron 派生后从不生成窗口（#41125），沙箱 payload 超出 `CreateProcess` 限制（#38985），MXC 后端接入仍在进行中（#45176），并且 Remote Control 配对在常见 Android 设备（#42576、#42026）或 GrapheneOS（#38128）上失败。
- **上下文压缩脆弱且具有破坏性**：rollout 被就地重写（#44363），过时指令在压缩后重新浮现（#42695），工具调用重放导致缓存输入 token 膨胀（#44386）。
- **长时间运行主机上的进程与资源泄漏**：`codex mcp-server` 与子 MCP 服务器累积到数百个（#28361）；rollout 期间的 WSL `thread/list` 超时破坏了 Remote Control（#36416）。
- **用量遥测不可靠**：用量掉到 0% 并停滞（#44278），Plus 的限额界面隐藏了 5 小时窗口（#41553），重置日期字符串与实际情况不一致（#44663）。
- **全局输入捕获与按键绑定**：`Alt+P` 泄露到全局，破坏 Unreal Engine 等工具（#42299）；多行粘贴过早提交（#45116）。
- **Browser/Computer Use 集成**：在 Edge（#44169）、WSL Chrome（#34458）以及受托管策略保护的站点（#42466）上全面失效。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-13

## 今日要点

每夜构建持续推进至 **v0.61.0-nightly.20260913**，但真正值得关注的是 issue 跟踪列表：**子代理（subagent）可靠性是当前最突出的主题**——多个 P1 级 bug 报告了卡死、误导性的 `GOAL` 成功报告，以及通用代理无限冻结等问题（#22323、#21409、#25166）。在自动记忆（Auto Memory）方面，一组 P2 级 issue（#26525、#26522、#26523、#26516）正在重新定义记忆子系统在脱敏、重试和补丁校验方面的处理方式。

## 发布

- **v0.61.0-nightly.20260913.g9c1b0a610** — 自动版本号升级（[PR #29300](https://github.com/google-gemini/gemini-cli/pull/29300)）。变更日志为相对于 `v0.61.0-nightly.20260912` 的标准 nightly diff。

## 热门 Issue

1. **#22323 [P1, 13 💬]** — `codebase_investigator` 子代理在未执行任何任务、触及 `MAX_TURNS` 后仍上报 `status: "success"` / `Termination Reason: "GOAL"`。这是一种具有误导性的恢复信号，掩盖了真实的中断情况，并破坏了评估正确性。（[链接](https://github.com/google-gemini/gemini-cli/issues/22323)）
2. **#21409 [P1, 8 💬 👍=8]** — 通用代理在创建文件夹等简单任务上**无限卡死**。当前唯一的绕过方法是禁止子代理委派。本批中获赞最多——明显的用户体验阻塞。（[链接](https://github.com/google-gemini/gemini-cli/issues/21409)）
3. **#25166 [P1, 4 💬 👍=3]** — Shell 命令已执行完毕，但 CLI 仍停留在 "Awaiting user input" 状态。在最基础的命令上即可复现。属于核心执行循环缺陷。（[链接](https://github.com/google-gemini/gemini-cli/issues/25166)）
4. **#19873 [P2, 9 💬]** — *零依赖操作系统级沙箱 & 执行后意图路由*——一项颇具野心的 EPIC，旨在借助操作系统级沙箱（Seatbelt、bubblewrap）而非临时排除规则，让 Gemini 3 的 bash 亲和性得以发挥，同时不牺牲安全性。（[链接](https://github.com/google-gemini/gemini-cli/issues/19873)）
5. **#22745 [P2, 7 💬]** — 评估 **AST 感知的文件读取/搜索/映射**（tilth/glyph）的 EPIC，旨在减少轮次、压缩上下文并改善子代理导航。属于基础能力诉求。（[链接](https://github.com/google-gemini/gemini-cli/issues/22745)）
6. **#21968 [P2, 6 💬]** — 模型在未明确指示的情况下，对自定义技能和子代理的利用率偏低——属于可发现性/编排层面的缺口。（[链接](https://github.com/google-gemini/gemini-cli/issues/21968)）
7. **#26525 [P2, 5 💬]** — 自动记忆目前依赖抽取模型在内容进入上下文**之后**再对密钥进行脱敏。该 issue 要求增加**确定性脱敏**，并缩减自动记忆的日志记录面。（[链接](https://github.com/google-gemini/gemini-cli/issues/26525)）
8. **#26522 [P2, 4 💬]** — 由于未处理的会话永远不会被标记为完成，自动记忆可能无限次地反复呈现同一低信息量会话。（[链接](https://github.com/google-gemini/gemini-cli/issues/26522)）
9. **#2930 [P3, CLOSED, 9 💬]** — 长期存在的**对 Node < 20 给出警告**的诉求（Node 18 已 EOL）。今日已关闭——请在变更日志中确认警告是否已发布。（[链接](https://github.com/google-gemini/gemini-cli/issues/2930)）
10. **#21983 [P1, 4 💬]** — `browser` 子代理在 Wayland 上失败；同属 #22323 系列的又一条误导性 `GOAL` 终止报告。（[链接](https://github.com/google-gemini/gemini-cli/issues/21983)）

## 关键 PR 进展

1. **#29303 [size/L]** — *修复 `ExpandableText` 截断边界处的代理对（surrogate pair）问题。* 当截断切片命中高代理项（high surrogate）时，emoji 标签会被静默丢弃。关闭 #29296。（[链接](https://github.com/google-gemini/gemini-cli/pull/29303)）
2. **#29163 [P1, security]** — *防止在 macOS Seatbelt / 受限权限下、Git 仓库内进行身份验证时发生崩溃。* `useGitBranchName` 钩子在 `.git` 不可读时会抛出未被捕获的异常。（[链接](https://github.com/google-gemini/gemini-cli/pull/29163)）
3. **#29222 [P1/P2]** — *停止在不具备 3.5 Flash 访问权限的后端（例如部分 Vertex 环境）上静默将 `--model gemini-2.5-flash` 改写为 `gemini-3.5-flash`。* 用户钉死的模型应被遵从。（[链接](https://github.com/google-gemini/gemini-cli/pull/29222)）
4. **#29294 [P2]** — *抑制后台命令执行期间的终端闪烁。* 诊断结论为 stdout 争用与 Ink reconciler 光标焦点问题双重根因。（[链接](https://github.com/google-gemini/gemini-cli/pull/29294)）
5. **#29208 [P2]** — *更稳健的 `agents.json` 加载器。* 损坏但语法合法的 JSON（`null`、标量、数组）此前会抛出 `TypeError` 或静默丢失状态；现统一回退为空。（[链接](https://github.com/google-gemini/gemini-cli/pull/29208)）
6. **#29292 [P2]** — *在 `loadCheckpoint` 中校验 `history` 为数组。* 部分写入或人工编辑过的 checkpoint（如 `{"history": null}`）此前能通过类型检查并破坏 `/resume`。（[链接](https://github.com/google-gemini/gemini-cli/pull/29292)）
7. **#29214 [size/L/XL, CLOSED]** — *加固沙箱文件系统边界，并将运行时状态与宿主机配置目录隔离；* 采用基于 realpath 的路径敏感检查。（[链接](https://github.com/google-gemini/gemini-cli/pull/29214)）
8. **#29125 [P2, CLOSED]** — *Hooks 迁移：将超时单位由秒改为毫秒。* Claude Code 中的 `"timeout": 30` 此前被解读为 30 ms 而非 30 s，导致钩子立即被杀死。（[链接](https://github.com/google-gemini/gemini-cli/pull/29125)）
9. **#29124 [P2, CLOSED]** — *Hooks 迁移：修正 `SubagentStop`（小写 `a`）事件键。* 该事件此前被映射为 `SubAgentStop`，导致 Claude 风格的子代理停止钩子被静默丢弃。（[链接](https://github.com/google-gemini/gemini-cli/pull/29124)）
10. **#29230 [size/s]** — *文档：修复七个指南页面中的失效锚点*（例如 `plan-mode.md` 中过时的数字前缀）。虽属体验改进，但对新用户而言是真实存在的摩擦。（[链接](https://github.com/google-gemini/gemini-cli/pull/29230)）

## 功能请求趋势

- 将 **AST 感知工具**作为一等能力（#22745、#22746）——更精准的文件边界、代码库映射与子代理导航。
- **操作系统级沙箱化**，让模型能够原生串联 `grep`/`sed`/`awk`，而无需反复纠结安全性问题（#19873）。
- **自动记忆加固**——确定性脱敏、有界重试，以及对无效补丁的显式呈现（而非静默丢弃）（#26525、#26522、#26523、#26516）。
- **子代理可观测性与控制**——面向子代理轨迹的 `/chat share`（#22598）、附带子代理上下文的 `/bug` 报告（#21763）、代理对自身 CLI 标志的自感知（#21432），以及服务于评估的轨迹审阅。
- **浏览器代理韧性**——会话接管、锁恢复，以及对 `settings.json` 中 `maxTurns` 等覆盖项的遵从（#22232、#22267）。

## 开发者痛点

- **代理执行卡死**是当前第一大痛点：通用代理冻结（#21409）以及执行完成后仍停留在 "Awaiting user input" 的卡顿（#25166）均会阻塞简单工作流。
- **误导性的子代理遥测**——`MAX_TURNS` 后上报 `GOAL` 成功（#22323），以及同样终止原因的 Wayland 浏览器失败（#21983），使得运行结果完全不可信。
- **自动记忆的信任缺口**——密钥在脱敏前已进入抽取器（#26525），低信息量会话无限循环（#26522），无效补丁被静默吞掉（#26523）。
- **技能与子代理在未被显式点名时使用率偏低**（#21968）——可发现性较差。
- **清理开销**——受限 shell 提示促使模型将临时脚本散落到随机目录（#23571），且代理偶尔会在存在更安全替代方案的情况下动用 `git reset --force`（#22672）。
- **工具集上限**——400+ 个工具的返回会触发 400 错误；代理不会主动裁剪工具范围（#24246）。
- **基于符号链接的代理配置无法在 `~/.gemini/agents/` 下被识别**（#20079）。
- **终端人体工学**——高负载下的闪烁（#29294）与失效的文档锚点（#29230）在长会话中叠加放大。
- **迁移陷阱**——从 Claude Code 迁移过来的钩子因秒与毫秒混淆、以及 `SubagentStop` 大小写错误（#29125、#29124）而被静默禁用。

---
*本摘要周期未提供 Discussions 数据，故省略"热门讨论"板块。*

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要
**日期：** 2026-09-13
**仓库：** [github/copilot-cli](https://github.com/github/copilot-cli)

---

## 🔥 今日要点

过去 24 小时内没有新版本发布，但社区活动集中在 **代理可观测性、提示缓存效率和平台稳定性** 方面。最紧迫的问题包括 Linux 上反复出现的 JavaScript 堆内存溢出崩溃（#4725）以及在长时间运行的子代理工具调用序列中出现的提示缓存回归（#4829）。在维护方面，最近合并的所有 PR 都聚焦于 **依赖项卫生和供应链安全**，通过 Dependabot 和 SHA 锁定的 GitHub Actions 实现。

---

## 📦 发布

*过去 24 小时内没有发布版本。*

---

## 🐛 热门 Issue

1. **[#4725 – Linux 上频繁发生 JavaScript 堆内存溢出 (platform-linux)](https://github.com/github/copilot-cli/issues/4725)** *(OPEN)*
   关键稳定性缺陷：CLI 在 Linux 上每隔几分钟就因 V8 Mark-Compact 内存溢出（约 3.9 GB 堆）而崩溃。目前已有 4 条评论且还在增加，这是首要的平台可靠性问题。

2. **[#4829 – 子代理在长工具调用序列中无法命中提示缓存](https://github.com/github/copilot-cli/issues/4829)** *(OPEN)*
   有报告称，在单次回合中执行数百次工具调用的自治子代理会破坏提示缓存，使 token 成本叠加。这对使用 Gemini/Claude 模型且注重成本的用户尤为相关。

3. **[#2254 – 为后台子代理添加实时进度流](https://github.com/github/copilot-cli/issues/2254)** *(OPEN)*
   功能请求，旨在提供更丰富的代理可观测性 — `/tasks` 目前仅展示工具调用计数，使用户对多阶段编排代理（plan → implement → deliver → review）一无所知。

4. **[#4831 – claude-opus-5 在首次粘贴图片后无法继续查看图片](https://github.com/github/copilot-cli/issues/4831)** *(OPEN)*
   Opus 5 模型上的回归问题：在粘贴第一张图片后，后续的 `view` 调用会触发"已查看图片数量上限（1）"限制，直接影响多模态工作流。

5. **[#4830 – 添加 /remove-dir 命令以撤销目录访问权限](https://github.com/github/copilot-cli/issues/4830)** *(OPEN)*
   一个虽小但很有价值的 UX 缺口：`/add-dir` 和 `/list-dirs` 已存在，但没有对称的方式在会话中途撤销目录访问权限。

6. **[#4824 – 代理完成后，Ctrl-T 排队的提示不会执行](https://github.com/github/copilot-cli/issues/4824)** *(OPEN)*
   快捷键缺陷：通过 Ctrl-T 排队的提示一直卡在"Working"状态，而不是在前一回合完成后执行 — 这是高级用户的使用痛点。

7. **[#2147 – CAIP 400: input item ID does not belong to this connection](https://github.com/github/copilot-cli/issues/2147)** *(CLOSED)*
   针对 `gpt-5.4 (xhigh)` 的错误最近已关闭，表明上游连接器的弹性改进已经发布。

---

## 🔧 关键 PR 进展

1. **[#4808 – 将 GitHub Actions 锁定到提交 SHA](https://github.com/github/copilot-cli/pull/4808)** *(CLOSED)*
   安全加固：在 4 个文件中将 3 个 action 引用锁定为不可变的提交 SHA — 堵住一个供应链攻击向量。

2. **[#4827 – build(deps): bump actions/stale 9.1.0 → 11.0.0](https://github.com/github/copilot-cli/pull/4827)** *(CLOSED)*
   Dependabot 将 `actions/stale` 工作流升级到 v11.0.0。

3. **[#4828 – build(deps): bump actions/github-script 7.1.0 → 9.0.0](https://github.com/github/copilot-cli/pull/4828)** *(CLOSED)*
   Dependabot 将 `actions/github-script` 升级到 v9.0.0。

*过去 24 小时内只有 3 个 PR 被更新 — 全部为常规维护，没有面向用户的功能 PR 落地。*

---

## 💡 功能请求趋势

综合未解决的 issue，社区正在围绕三个主题形成共识：

- **代理可观测性与控制** — 为后台子代理提供实时进度流（#2254），并改进长时间运行自治工作流的诊断能力。
- **会话清理命令** — 对称的 `/remove-dir`（#4830）以补充现有的 `/add-dir` 和 `/list-dirs`，实现在会话中途降低权限。
- **多模态可靠性** — 修复 claude-opus-5 等较新模型上的图片查看限制（#4831），使截图和文件引用能够在同一会话中正常工作。

---

## 😤 开发者的痛点

- **Linux 上的稳定性**：反复出现的 V8 堆内存溢出（#4725）使得部分用户的长时间会话无法使用，且没有文档化的变通方案。
- **Token/成本效率低下**：破坏提示缓存的子代理工具链（#4829）直接转化为高级用户更高的账单 — 这是一个与模型无关的问题。
- **快捷键死锁**：Ctrl-T 提示排队（#4824）使 UI 永久停留在"Working"状态，迫使用户重启会话。
- **图片处理能力有限**：claude-opus-5 上的单张图片上限（#4831）甚至阻断了"先粘贴截图，再读取文件"这种简单流程。
- **无法在会话中途撤销权限**：缺少 `/remove-dir`（#4830）意味着用户必须重置状态才能收紧访问权限 — 这是注重安全工作流的痛点。
- **子代理可见性弱**：`/tasks` 仅显示工具调用计数（#2254），使得调试或信任编排型代理变得困难。

---

*有希望在下期重点展示的 issue 或 PR 吗？请打上 `[triage]` 或 `[area:agents]` 标签，帮助维护者更快地分类。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-13

## 1. 今日要点

社区焦点集中在 **OpenCode Zen 的 Muse Spark 模型上爆发的 `encrypted_content` 错误潮**，数小时内就产生了多个重复的问题报告（#48741、#48773、#48795、#48800）。与此同时，维护者合并了一批高质量的 TUI 和 provider 修复 —— 包括 Windows ConPTY 栈的终端重置热修复（#48782）以及针对非交错模型的推理回放剥离（#48775）—— 并伴随着几项实质性新功能，例如 **原生阿拉伯语/RTL bidi 支持**（#48587/#48590/#48753）以及为插件新增的内联主页底部插槽（#48798）。

## 2. 发布动态

过去 24 小时内无新版本发布。

## 3. 热门问题

1. **#48741 — [2.0] Opencode Zen 在 Muse Spark 系列上的严重错误**（9 条评论）—— 新出现的 Zen provider 全局回归：任何对 Muse Spark 模型的图像/工具调用都会失败，报错 `reasoning 'encrypted_content' was not issued to this caller`。很可能是一次重大用户侧故障。
2. **#36942 — [功能] 垂直标签页**（17 条评论，31 👍）—— 本周期获赞最多的问题。用户反馈新引入的仅水平标签布局让 5 个以上的会话难以阅读。
3. **#37815 — Kimi K3 上游故障**（11 条评论）—— Kimi K3 模型可选，但每次请求都会在上游失败；问题仅限 Console Go 上的这一个模型。
4. **#23655 — Go 服务的 Responses API 支持**（7 条评论，29 👍）—— 长期高需求功能，旨在与 Anthropic 风格 Responses API 的 V1 保持对等。
5. **#45750 — Anthropic 提示缓存未通过代理生效**（6 条评论）—— 经第三方代理路由 Claude 时，提示缓存命中率长期为 0%；与 PR #1305 相关。
6. **#48776 — TUI 在 /exit 后将终端留在 raw/损坏状态（Alacritty + Zellij on Windows）**（2 条评论）—— 需立即处理：同日已合并热修复 PR #48782。
7. **#48787 — LSP 服务器冷启动时不返回诊断信息**（2 条评论）—— 一个隐性的静默假阴性：首次写入新启动的 LSP 服务器时即使文件存在错误也会报告为干净。
8. **#48762 — Windows 上的非 Git 项目在 TUI 中隐藏会话**（3 条评论）—— `session.path` 写入为绝对路径，导致会话选择器无法找到会话。
9. **#38644 — 静默失败：opencode provider 500 错误被丢弃且无 UI 提示**（4 条评论，已关闭）—— Agent 静默停止响应，只剩转圈；已关闭（可能已修复）。
10. **#45938 — macOS 退出/清理时向所有用户进程广播 SIGTERM**（2 条评论）—— 退出 opencode 会连带关闭 Ghostty、Terminal.app、Chrome —— 清理路径中存在 `kill(-1, SIGTERM)` 行为。

## 4. 关键 PR 进展

1. **#48782 — fix(tui): 在任意退出路径上强制重置终端**（已关闭）—— 直接修复 #48776；保证 ConPTY 下 alternate-screen/鼠标/kitty-keyboard 全部被正确拆除。
2. **#48775 — fix(provider): 为不支持交错的模型剥离推理回放**（已关闭）—— 通过从历史记录中移除序列化的 `reasoning_content`，修复 cerebras/qwen-3.8-27b 上的无限重试循环。
3. **#48796 — fix(desktop): [v2] 使用 --exec 运行 WSL 命令**（开启中）—— 修复一直无法工作的 V2 Desktop WSL server add 流程（`UnknownError`）。
4. **#48798 — feat(tui): 新增内联主页底部插槽**（开启中）—— 新增类型化的 `home.footer.status` 插槽，让 TUI 插件可在与内置底部同一行渲染精简状态（关闭 #48797）。
5. **#48777 — fix(session): 冻结每个会话的系统提示以保留前缀缓存**（开启中）—— 按 session ID 缓存系统提示，让 Anthropic 提示缓存在多轮之间保持温热。
6. **#48779 — fix(client): 设置默认 SSE Accept 头**（开启中）—— 将 Promise SSE 请求默认设为 `Accept: text/event-stream`，避免代理返回 HTML 错误页（关闭 #48771）。
7. **#48788 — fix(opencode): 在 `opencode serve` 失败时展示可操作的错误详情**（开启中）—— 将不透明的 `Unexpected error` 替换为端口占用 / 权限拒绝等明确消息。
8. **#48791 — fix(app): 无需启动 locations 即可查询 worktree 清单**（开启中）—— 新增 `GET /api/worktree/inventory` 端点，使 Worktrees 页面无需启动插件/MCP 即可加载。
9. **#48587 / #48590 / #48753 — feat(tui): 原生阿拉伯语与 RTL (bidi) 支持**（开启中，覆盖 dev + beta 分支）—— 期待已久的双向文本渲染，覆盖提示与消息；关闭四个相关问题。
10. **#48793 — feat(v2): 允许禁用 Anthropic thinking block 绑定**（开启中）—— 让用户可在不接受 thinking block 绑定的非 Anthropic 端点上选择退出。

## 5. 热门讨论

*源数据中未提供讨论信息，故省略本节。*

## 6. 功能请求趋势

- **UI/UX 灵活性**占据榜首：垂直标签页（#36942）、可切回旧布局的能力（#39835），以及在新会话页恢复文件树按钮（#42031）。
- **Provider 对等与可定制性**：Go 的 Responses API（#23655）、禁用工具调用配置（#35432）、退出 Anthropic thinking block 绑定（#48793）、退出"基于请求数据训练"开关（#47562）。
- **TUI 打磨**：单词级 diff 高亮（#44348）、i18n 基础设施（#48731）、原生 RTL/bidi（#48587），以及内联主页底部插件插槽（#48797）。
- **性能/缓存**：通过不可变系统提示保留 Anthropic 前缀缓存（#33246、#48777）—— 反复出现的主题。
- **诊断与 schema**：为标准 JSON LSP 提供更好的 config.json schema（#41014）、非静默的 LSP 错误（#48787）。

## 7. 开发者痛点

- **Provider 可靠性是今日头号槽点**：Zen 的 Muse Spark 模型上暴增的 `encrypted_content` / `upstream request failed` 错误表明，向 Anthropic 兼容端点转发推理时出现了回归。多名用户反馈其付费的 Zen 订阅已无法使用（#48792）。
- **V2 布局迁移仍显粗糙**：新用户无法回退（#39835），新会话页缺少文件树（#42031），首次按键时输入法组合被破坏（#39632），工具调用禁用配置被忽略（#35432）。
- **桌面端的安全性与可预测性**：至少一例报告显示 Desktop agent 在仅请求切换目录时删除了整个项目目录（#38191）；macOS 退出逻辑会向所有用户进程广播 SIGTERM（#45938）。
- **静默失败**：opencode provider 的 500 错误在无任何 UI 提示的情况下被吞掉（#38644）；首次写入新启动的 LSP 服务器会返回错误的"干净"结果（#48787）。
- **AI 对手动编辑的回滚**：开发者反馈，手动调整 AI 生成代码后，后续提示会静默还原其改动（#48676）—— 与 agent 迭代时是一大实际工作流隐患。
- **跨平台终端卫生**：退出路径在 Windows ConPTY（#48776）与 macOS（#45938）上都会将终端留在 raw/损坏状态，影响 Alacritty、Zellij、Ghostty 以及 Terminal.app 用户。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-13

## 今日要点
Pi 生态在 provider 接入和会话管理体验方面非常活跃，两个新的 OAuth provider 上线（Google Antigravity、Cursor Pro），在与 Codex 兼容的 turn 归属方面也取得了实质进展。一个长期存在的性能话题（#7739）继续推动实现与 jcode 相当的启动延迟，多个 UI/流式输出相关的 bug 已完成分流与关闭。整体信号：项目正在加倍投入多 provider 能力对齐、会话保真度和 TUI 打磨。

## 发布
过去 24 小时内无新发布。

## 热门议题

1. **[#7739](https://github.com/earendil-works/pi/issues/7739)** — 设定启动时间预算，目标对齐 jcode 的延迟与内存。以 jcode README 的基准为依据建立正式的的性能目标，并明确差距度量。其意义在于将性能工作从零散修补转变为可衡量的 SLO。（开放，6 条评论）

2. **[#9098](https://github.com/earendil-works/pi/issues/9098)** — 在 RPC 响应中暴露 prompt 处理状态（`handled`/`queued`/`started`）。影响所有外部集成与扩展消费者；直接呈现 Pi 已有的 preflight 决策，而不是从通用成功响应中猜测。（开放，4 条评论）

3. **[#9311](https://github.com/earendil-works/pi/issues/9311)** — 全屏鼠标选区在会话切换后仍然保留，导致新会话中出现幽灵选区。易于复现的 UX bug，一行即可修复。（开放，6 条评论）

4. **[#9474](https://github.com/earendil-works/pi/issues/9474)** — Codex `openai-codex-responses` 传输缺少非重置的逐请求 deadline；keep-alive 帧会绕过空闲超时。对卡死的流来说是切实的可靠性/UX 问题。（开放，3 条评论）

5. **[#9243](https://github.com/earendil-works/pi/issues/9243)** — 会话恢复时，模型从最后一条 assistant 消息回显的名称恢复，而不是从 `model_change` 恢复。provider 名称回显破坏了会话保真度。（开放，1 👍，3 条评论）

6. **[#9481](https://github.com/earendil-works/pi/issues/9481)** — 使 Pi 与 Codex 规范的 turn 归属元数据对齐，让 `turn_id` 覆盖一次运行中的所有请求（tools、retries、compaction）。跨工具推理保真度的基础。（开放，1 条评论）

7. **[#9545](https://github.com/earendil-works/pi/issues/9545)** — 在批量编辑的唯一性检查中复用整文件规范化；冗余的 `normalizeForFuzzyMatch()` 调用是容易拿到的性能收益。（开放，1 条评论）

8. **[#9542](https://github.com/earendil-works/pi/issues/9542)** — 流式 UI 会重复渲染首个思考 token，因为 `message_start` 快照共享了实时可变的内容。影响所有启用思考功能的客户端的具体 bug。（已关闭/未分流，2 条评论）

9. **[#9538](https://github.com/earendil-works/pi/issues/9538)** — `ScrollView` 不会将鼠标事件转发给其内容；继承自 `Container.handleMouse` 的逻辑被 `dispatchMouseToLayout` 绕过。对交互式 TUI 扩展很重要。（已关闭/未分流，2 条评论）

10. **[#9462](https://github.com/earendil-works/pi/issues/9462)** — `ctx.ui.notify` 存在竞态，且扩展 API 没有可并存的替代方案用于多条通知。扩展作者的真实痛点。（已关闭/未分流，1 条评论）

## 关键 PR 进展

1. **[#9529](https://github.com/earendil-works/pi/pull/9529)** — 新增 **Google Antigravity** 和 **Cursor Pro** OAuth provider（无需 API key，浏览器 OAuth，51123 端口本地回调服务）。扩展零配置登录选项。

2. **[#9488](https://github.com/earendil-works/pi/pull/9488)** — 通过流选项中与 provider 无关的 `requestIdentity`，引入规范的 **Codex turn 归属**。在工具续接、重试、steering 和 compaction 恢复中解决归属问题。

3. **[#9096](https://github.com/earendil-works/pi/pull/9096)** — 新增 **Meta provider**，支持 **Muse** 订阅 OAuth。值得注意的特性：每日身份令牌重新铸造和"假"突发式流式输出。

4. **[#9543](https://github.com/earendil-works/pi/pull/9543)** — 新增 **`exit` 工具**，使模型可以在用户说"bye"或 `/exit` 时结束聊天，免去用户学习 `/quit` 的负担。

5. **[#9531](https://github.com/earendil-works/pi/pull/9531)** — 在会话树中通过 `SessionManager.pruneBranch()` 和 `shift+d` 快捷键实现永久**分支删除**，并带有活跃路径保护和标签重链。

6. **[#9541](https://github.com/earendil-works/pi/pull/9541)** — TUI：在选择器中将人类可读的模型与 provider **名称**作为主标签渲染（受管目录已提供）。改动虽小，但生活质量提升明显。

7. **[#9539](https://github.com/earendil-works/pi/pull/9539)** — 新增 `examples/extensions/loop-guard.ts`：检测重复的相同工具调用模式，打断失控的 LLM 验证循环。

8. **[#9533](https://github.com/earendil-works/pi/issues/9533)** *(相关)* — `/fork` 应支持**从当前位置**分叉，而不仅仅是从更早的消息分叉。常见的 UX 缺口（与新增的分支删除 PR 配套）。

## 热门讨论

**展示与问答 / Q&A**
- **[#3373](https://github.com/earendil-works/pi/discussions/3373)** — *你最喜欢与 Pi agent 一起使用哪些插件、附加组件或扩展？*（16 条评论，9 👍）持续进行的社区最爱扩展汇总；与新的 `loop-guard` 示例天然搭配。

## 功能请求趋势

- **Provider OAuth 扩展**：Google Antigravity、Cursor Pro、Meta/Muse —— 向"无需 API key"的订阅登录明显推进。
- **会话树体验**：从当前位置分叉、分支删除、选择器中更好的父路径/cwd 嵌套 —— 会话管理器是焦点区域。
- **Codex 对齐**：规范的 turn 归属、传输 deadline、request identity —— Pi 正在向 Codex 的协议元数据收敛。
- **模型控制**：在 `/new` 时保留 model/effort，在 RPC 中暴露 prompt 处理状态，从 `model_change`（而非回显名称）恢复模型 —— 配置保真度是反复出现的需求。
- **内置安全机制**：loop-guard 扩展和 `exit` 工具是"agent 护栏作为一等公民"需求的早期信号。

## 开发者痛点

- **启动性能差距** vs. jcode —— 被反复指出是最大的单一 UX 退化（#7739）。
- **流式/TUI bug**：首个思考 token 重复渲染（#9542）、过期的全屏选区（#9311）、`ScrollView` 鼠标事件转发（#9538）。
- **Provider 怪癖堆积**：Vertex 在 Gemini 3 Flash 上拒绝 `THINKING_LEVEL_MINIMAL`（#9535）、OpenRouter 丢弃 Claude 的仅签名推理（#9534）、llama.cpp 忽略推理级别（#9528）、GitHub Copilot OAuth 在 Windows 上 403（#9546）。
- **会话/状态保真度**：从回显名称恢复模型（#9243）、跨 CWD 的会话嵌套（#9547）、全局 auth 路径泄漏到 SDK 嵌入场景（#9537）。
- **扩展 API 缺口**：`ctx.ui.notify` 存在竞态且无替代通道（#9462）、导入时急于加载 `jiti` 和完整 TUI 图损害了嵌入场景（#9540）。
- **潜在冗余**：批量编辑期间对每次编辑都进行整文件规范化（#9545）—— 社区请求维护者拿下的简易收益。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-13

## Today's Highlights

今天的流量主要被 **0.23.3 版本下的一组 P1 React #185 TUI 崩溃** 所占据，已有三条独立报告（#11500、#11732、#11756）在后台 agent 工作流中全部命中 "Maximum update depth exceeded"——维护者需要在下一个稳定版发布前拿出统一的修复方案。架构方面，**#11695** 拉开了期待已久的讨论：把 agent harness 与执行环境解耦；**#11711** 则落地了该方向的第一块具体内容（subagent 的容器执行）。

## Releases

- **v0.23.3-nightly.20260912.54aa66834b** — 夜间构建。值得关注的变更：
  - `refactor(dingtalk): remove obsolete background response aggregation`（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)）
  - `feat(channels)!` — 渠道轮换工作进行中（[release notes](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260912.54aa66834b)）
- **cua-driver-rs v0.20.6** — Qwen CUA Driver 预构建二进制（内嵌于 `packages/cua-driver`）。macOS 为已签名 + 公证的通用二进制（`QwenCuaDriver.app`）；Linux 提供未签名的 x86_64 + arm64（glibc 2.31 底线）；Windows 提供未签名的 UIAccess worker + x86_64 + arm64 原生 SDK payload。

## Hot Issues

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500)** — *P1, OPEN* — 多后台 agent 同时完成时，TUI 因未捕获的 React #185 而静默退出；Ink `useBoxMetrics` 布局监听器 `setState` 死循环。**12 条评论，👍 1。** Resume 时可复现的回归；这是 0.23.3 React-loop 集群的"金丝雀"issue。
2. **[#11732](https://github.com/QwenLM/qwen-code/issues/11732)** — *P1, OPEN* — Qwen Code 0.23.3 在原生 monitor 任务持续运行期间因 React #185 崩溃。两个独立会话，同样的失败模式。**6 条评论。**
3. **[#11756](https://github.com/QwenLM/qwen-code/issues/11756)** — *P1, OPEN* — 启用虚拟化 History 后，当前 main 分支和 stable 0.23.3 在后台 agent 工作流中都会进入递归更新循环。**4 条评论。**
4. **[#11747](https://github.com/QwenLM/qwen-code/issues/11747)** — *P2, OPEN* — 在 RHEL 10 上，主机 Node 运行时缺少完整 ICU 数据时，交互式 TUI 静默 / 原生崩溃；`Intl.Segmenter` 被破坏，Qwen 没有检测也没有诊断。**3 条评论。** 现实中的企业级阻塞问题。
5. **[#11695](https://github.com/QwenLM/qwen-code/issues/11695)** — *P2, OPEN, tracking* — 方向性 umbrella issue：将 agent harness 与执行环境分离，使工具运行时可寻址。**5 条评论，`roadmap/multi-agent`。** 未来数月工作的战略主线。
6. **[#11704](https://github.com/QwenLM/qwen-code/issues/11704)** — *P3, OPEN, proposal* — 官方 Android 伴生客户端，作为基于 `qwen serve` 的 ACP 瘦客户端构建。作者愿意实现最初的 MVP。**5 条评论。**
7. **[#11590](https://github.com/QwenLM/qwen-code/issues/11590)** — *P1, CLOSED* — Qwen Code 向 DashScope 的 OpenAI 兼容端点插入顶层 `metadata` 对象，而该端点会将其转发给非 Qwen 厂商（如 `ZHIPU/GLM-5.3-Flash`），在那里 `metadata` 是 `string` 类型——所有这类模型均返回 400。**4 条评论。**
8. **[#11657](https://github.com/QwenLM/qwen-code/issues/11657)** — *P1, CLOSED* — Fireworks 上 Qwen3 工具调用续接因镜像的 `messages[].reasoning` 而 400 失败。由 [#11662](https://github.com/QwenLM/qwen-code/pull/11662) 修复。**3 条评论。**
9. **[#11718](https://github.com/QwenLM/qwen-code/issues/11718)** — *P2, CLOSED* — 桌面端 AppImage 全局设置 `PYTHONHOME`/`PYTHONPATH`，破坏所有自行 spawn Python 解释器的 stdio MCP 服务器。**4 条评论，`scope/linux`。**
10. **[#11198](https://github.com/QwenLM/qwen-code/issues/11198)** — *P1, OPEN, security* — 默认开启的使用统计遥测通道将原始工具错误文本（含 shell 命令行）上传到 RUM，未做任何脱敏。**3 条评论。** 影响面超过最初的 #10916 发现。

## Key PR Progress

1. **[#11711](https://github.com/QwenLM/qwen-code/pull/11711)** — `feat(core): add container execution for subagents` — 运维可要求 `QWEN_AGENT_EXECUTION_BACKEND=docker|podman`；agent 定义和项目声明中可标注 `executionBackend: container`。#11695 方向的第一块具体落地。
2. **[#11548](https://github.com/QwenLM/qwen-code/pull/11548)** — `feat(web-shell): connect to a selected remote daemon` — 独立 Web Shell 现可通过连接门或 Daemon Status 显式连接到一个远程 daemon（地址 + 可选 bearer token）。
3. **[#11700](https://github.com/QwenLM/qwen-code/pull/11700)** — `feat(web-shell): Improve context overview and add manual compression` — Composer tooltip 显示精确剩余容量；卡片展示已用 / 总 token 及分类细分；历史卡片标注为快照。
4. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086)** — `feat(serve): scope extensions to workspace runtimes` — 全局扩展目录被调和进按 workspace 选定的运行时；workspace 级 daemon + SDK 访问；composer `@` 菜单已更新。
5. **[#8927](https://github.com/QwenLM/qwen-code/pull/8927)** — `feat(channels): bound session lifetime with sessionRotation` — 每个渠道的 `sessionRotation`（`maxTurns` 或 `maxAge`）在达到上限时，于该路由上启动新会话。
6. **[#11280](https://github.com/QwenLM/qwen-code/pull/11280)** — `fix(skills): re-apply a Skill's side effects when a session is resumed` — `--continue` / `--resume` 现在会恢复每个 Skill 的 `allowedTools` 会话允许规则与 `hooks:`。
7. **[#11562](https://github.com/QwenLM/qwen-code/pull/11562)** — `fix(cli): keep one-shot system reminders out of the user's own message` — 提醒不再泄漏到 transcript、上箭头召回历史或取消后的 composer 回填中。（延期评审发现记录于 [#11587](https://github.com/QwenLM/qwen-code/issues/11587)。）
8. **[#11540](https://github.com/QwenLM/qwen-code/pull/11540)** — `fix(review): fence base-tree reuse on state kept outside the mount` — Run identity 与 merge base 从 `.qwen/tmp` 迁出，移至宿主机侧的 `.qwen/review-leases`，review 沙箱并未以读写方式 bind-mount。
9. **[#11538](https://github.com/QwenLM/qwen-code/pull/11538)** — `feat: select the OpenAI API per model` — 模型级 `api: "chat-completions" | "responses"`，用于 OpenAI 兼容提供方；自定义提供方设置统一为单一 OpenAI 兼容选项。
10. **[#11769](https://github.com/QwenLM/qwen-code/pull/11769)** — `fix(core): purge a deleted session's prompts from the log history` — `/delete` 现在还会通过新增的 `Logger.removeSessionMessages(sessionId)`，将该会话的提示从 `~/.qwen/tmp/<project-hash>/logs.json` 中一并移除。

## Feature Request Trends

- **Harness / 执行器分离** — #11695（umbrella）、#11711（subagent 容器执行）。当前项目最清晰的架构方向。
- **移动 / 跨设备触达** — #11704（基于 ACP 的 Android 伴生客户端）、#11548（Web Shell → 远程 daemon）、#11086（serve 运行时的 workspace 限定扩展）。产品正朝"瘦客户端 + 胖 daemon"演进。
- **上下文窗口 UX** — #11700（Web Shell 上下文总览 + 手动压缩）。Token 预算可见度已成为反复出现的诉求。
- **提供方灵活性** — #11538（按模型选择 OpenAI API 风格）、#11662（Fireworks reasoning 镜像）、#11590（DashScope `metadata` 字段）。
- **会话 / 日志卫生** — #11769（清除已删除的提示）、#11762（`/delete` 应清理 `logs.json`）、#11280（Resume 时恢复 Skill 副作用）、#10953（委派给 subagent 时陈旧的 Todo 计划）。
- **定时任务可见性** — #11635（侧边栏中的固定会话定时任务）。

## Developer Pain Points

- **React #185 TUI 崩溃** — 0.23.3 上有四条独立报告（#11500、#11732、#11756，以及邻近的 #11724）在后台 agent 工作流中命中同一个 布局监听器内 `setState` 死循环；TUI 直接挂掉，没有任何错误信息渲染。
- **长会话内存增长** — #11724 / #11725（重复）在 v0.20.0 + Node 24 上报告 7 GB+ 工作集；溢出时 CLI 在任务中途中止，`/continue` 也无法恢复。
- **第三方提供方故障** — #10065（LM Studio "failed to parse grammar"）、#11590（DashScope + 非 Qwen 厂商 400）、#11657（Fireworks 工具续接 400）。Qwen Code 的请求形态泄漏了对 Qwen 原生端点的假设。
- **Linux 打包异味** — #11718（AppImage `PYTHONHOME`/`PYTHONPATH` 泄漏到 MCP stdio 服务器）、#11747（RHEL 10 上 Node 缺少完整 ICU 时 TUI 崩溃）、#9037（短终端下 `/statusline` 对话框被裁切）。
- **遥测隐私** — #11198：默认开启的 RUM 通道上传原始工具错误文本（含 shell 命令行），未做任何脱敏。
- **时区正确性** — #11720：在 DST 重复的小时内，cron 下一次触发计算返回了过去时刻。
- **测试基建 flaky** — #11736（web-shell smoke 在 60 s 预算的 75–91% 超时）、#11465（同一 commit 上 1.31% 像素差的视觉预览）、#11001（交互式 PTY 子进程清理竞态）。
- **Subagent 委派漂移** — #10953：持久化的 Todo 计划在四个计划节点推进过程中冻结了 55 分 44 秒；在 subagent 委派下，活跃 todo 提醒从未触发。
- **LSP 陈旧** — #11439（closed）：磁盘编辑之后，原生 LSP 查询返回的是编辑前的文档内容。
- **渠道 / 运行时鲁棒性** — #117

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*