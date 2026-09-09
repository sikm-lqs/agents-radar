# AI CLI 工具社区动态日报 2026-09-09

> 生成时间: 2026-09-09 11:30 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比报告 — 2026-09-09

## 1. 生态概览

AI CLI 领域已整合为七个活跃维护的工具，跨越三个层级：厂商旗舰 CLI（Claude Code、Codex、Gemini CLI、Copilot CLI）竞相推出平台功能（桌面应用、设备集群、SDK），独立/聚合类工具（OpenCode、Pi、Qwen Code）则在厂商中立性、可玩性与自托管部署上一较高下。重心已明显从单轮编码辅助转向**长期运行、无人值守的多智能体会话**——随之而来的主要工程问题也从提示词质量转向会话持久性、取消语义与多智能体协同。各家发布节奏都很激进（24 小时内七个仓库共打了 13 个 tag），但每个社区同时都在偿还回归债务，尤其是在 Windows 平台上。

## 2. 活跃度对比

*计数反映今日摘要中浮现的项目（热门 issue、亮点 PR、活跃讨论帖），并非仓库总量。"N/A" = 渠道存在但本窗口内未提供数据。*

| 工具 | 热门 Issue | 亮点 PR | 讨论帖 | 发布状态（24h） |
|---|---|---|---|---|
| **Claude Code** | 10（9 open，1 stale-closed） | 1（closed，未合并） | N/A — 无数据 | v2.1.266 hotfix + v2.1.265 |
| **OpenAI Codex** | 10（+3 mentions） | 10（+2） | 10 | 4 alphas（rust-v0.154.0 线） |
| **Gemini CLI** | 10 | 10（合并率高） | N/A — 无数据 | 3（v0.59.0 stable、v0.60.0-preview、v0.61.0-nightly） |
| **Copilot CLI** | 10 | 2 | N/A — 未上报 | 2 patches（v1.0.84-2/-3） |
| **OpenCode** | 10 | 11 | N/A — 未上报 | v1.18.30 |
| **Pi** | 10（窗口内关闭 7 个） | 10（关闭 8 个） | 2 | 24h 内无 |
| **Qwen Code** | 10（+mentions） | 10（+5 mentions） | N/A — 无数据 | v0.23.2（+SDK 0.1.10） |

**解读：** Codex 同步覆盖面最广（issue + PR + 讨论 + 最快 tag 节奏）。Gemini CLI 与 Pi 的关闭率最健康。Claude Code 单 PR 的一天说明是在分诊/清理而非停滞——其摘要明确指出活动偏"issue 侧"。

## 3. 共同演进方向

1. **多智能体编排** — *Claude Code、Codex、Qwen Code、Pi。* Claude Code 用户要求按智能体/集群粒度配置模型，而非改全局 `settings.json`（#66402，👍14）；Qwen Code 的 mesh PR（#11206）提出持久化的共享线程智能体身份并支持运行中途介入；Codex SDK 新增 `ExternalMessage` 用于智能体间工具授权（#44086），社区还造了 `postbag` 实现 Codex↔Claude 互通（#44109）；Pi 渲染了并发的每模型子智能体（#9373）。协同原语正全行业趋同。
2. **长会话持久性与恢复** — *全部七个。* Codex 分页冻结在 macOS 与 Windows 上都会丢轮次（#41566、#43124）；Copilot 恢复时 OOM（#4664），FileWatch 失控循环打出 13GB 日志（#4612）；Gemini 开放 PR #29265 针对中断轮次下的上下文污染；OpenCode 会话在 50 张图片上限时变砖（#47487）；Pi 修了 Esc 取消与压缩竞态；Qwen 在运行时回收时丢弃后台 shell 输出（#11119）；Claude Cowork 每 24–36h 强制登出（#81512）。这是整个生态的头号可靠性战场。
3. **厂商中立 / BYOK** — *七之六。* OpenCode 的模型自动发现是所有摘要里点赞最高的 issue（#6231，👍231）；Codex 用户撞上 OpenAI 特化假设（Azure 强制的 `tools[].description` #38573、硬编码的 `codex-auto-review`）；Copilot 用户想要 OpenRouter（#2943）；Claude 发版网关热修复；Pi 合入了由 provider 上报的成本统计（#6881、#9345）；Qwen 修了本地 llama-server 的 grammar 回归（#10530/#10435）。
4. **MCP 与工具协议成熟化** — *五个工具。* Codex 复用了休眠中的 MCP 绑定（#44121）；Gemini 强制执行 RFC 9207 OAuth 颁发者检查并暴露出 >128 工具的硬上限（#24246）；Copilot 修了 MCP OAuth 启动可靠性；Claude 新增多插件目录加载但禁止自托管 git 市场（#90141）。
5. **Windows/跨平台一致性** — *七之六。* Claude Cowork 在九月 KB 更新下崩溃（#92958）；Codex Top-10 里 Windows issue 占主导（Remote Control、WSL 桥接、Pets）；Gemini 缓解了 NTFS 8.3 路径问题；OpenCode 违反 XDG 规范（#27786）。
6. **权限与安全 UX** — *五个工具。* Claude 的 Auto Mode 仍会为 `grep` 弹提示（#91784），后台弹窗还缺个"接受"按钮（#92974）；Codex 调高了 Guardian 复核上限，但"网络安全"误报会卡住合法的安全工作（#34306）；Copilot 的 Assisted-mode 权限约 1h 后过期（#4764）。

## 4. 差异化分析

- **Claude Code** — 最偏企业自动化：设备集群（Cowork）、routines、网关遥测、插件市场。今日暴露出结构性弱点：全局配置单例与 OS 补丁脆弱性使无人值守使用有风险。
- **Codex** — 产品覆盖面最广（桌面应用、Computer Use、Remote Control、语音，甚至 Pets），节奏最快，但广度优先于打磨：Windows 全链路脆弱，安全分类器无恢复路径。Python SDK 的发布管线透露出平台野心。
- **Gemini CLI** — 分诊分类最严谨（P1/P2/EPIC），独特的"正确性伦理"："子智能体在 MAX_TURNS 后仍上报 GOAL 成功"（#22323）被定性为诚实性 bug，而非挂起。研发差异化在 AST 感知、token 节流型文件访问（#22745）。
- **Copilot CLI** — GitHub 原生集成（Mission Control、tasks、PR 工作流），终于在还 QoL 债（vim 模式、76👍 的 #13 关闭耗时约一年）。最弱环节：长会话内存稳定性，以及会 OOM 杀主机的原生 `tgrep`（#3976）。
- **OpenCode** — provider 聚合器：DeepSeek、GLM、Bedrock、Azure、Zen、本地模型各有专项修复。V2 API 剧变正持续破坏下游消费者（CodeNomad、#48090）——这是 API 频繁变更带来风险的活教材。
- **Pi** — 极简内核、扩展优先的理念（权限门禁刻意下放给扩展，如 pi-verdict）。差异化在适配器广度、严格的生命周期语义，以及与竞品相比的量化性能预算（#7739）。体量小但窗口内关闭率高得反常。
- **Qwen Code** — "守护进程即平台"：`qwen serve`、Web Shell、自定义前端托管（#11358）、面向集成者的 REST/SSE 文档，以及架构野心最大的多智能体 PR（mesh）。本地/开源模型取向，加上明显的 AI 辅助开发流程（autofix/takeover PR 标签）。

**目标用户：** Claude → 企业集群自动化；Codex → ChatGPT 订阅用户、桌面优先用户；Gemini → 谷歌生态、token 敏感的重度用户；Copilot → 嵌入 GitHub 的企业开发者；OpenCode → BYOK 多 provider 用户；Qwen → 自托管/本地模型运维者；Pi → 扩展开发者与极简主义者。

## 5. 社区动能与成熟度

- **最高互动度：** Codex（66 条评论的 Windows issue #28919；126👍 的 `/rewind` 帖仍是仓库点赞榜首）与 OpenCode（#6231 的 231👍——数据集里最强的单一 issue 信号）。
- **最快迭代：** Codex（4 alphas/24h）、Gemini CLI（一天三条发布通道）、Copilot（2 patches）、Claude Code（网关回归同日 hotfix）。
- **最佳关闭纪律：** Pi（窗口内关闭 7/10 issue 与 8/10 PR）与 Gemini CLI（长期 P1 已合并：Plan Mode 挂起、Seatbelt 崩溃、a2a 凭据清理）。
- **成熟度信号：** Claude 与 Codex 功能成熟但现在要应对规模驱动的回归；Gemini 展现出最成熟的工程流程；Copilot 处于还债模式；OpenCode 处于 V2 过渡期；Qwen 处于激进的平台构建期（带流程异味——#11205 在合并中丢了六处加固）。
- **信任风险：** Claude 的 14 天 stale-bot 会关闭活跃 issue（建议的 90 天修复 PR #63686 被关闭未合并）；Gemini 用户经常**禁用子智能体**以保持可用——这是严重的采纳信任信号。

## 6. 趋势信号

1. **CLI 智能体正在变成无头平台。** SDK（Codex Python、Qwen TS）、serve/daemon 模式、REST/SSE 接口以及自定义前端托管正在各工具间趋同。选用 API 契约稳定的工具；以 OpenCode V2 的故障为戒，看清 API 频繁变更对下游的代价。
2. **会话持久性成为新的评测标准。** 会话动辄跑上数小时乃至数天，恢复/压缩/OOM 行为比演示效果更重要。以中断语义与崩溃恢复能力来审视工具（Pi 与 Gemini 在明确地工程化这一点）。
3. **provider 可移植性是入场券。** 网关/代理支持、模型自动发现、按 provider 的成本可观测性（Pi 的 provider 上报成本）正是用户用点赞投票的地方。
4. **多智能体协同正在标准化** —— 共享线程、智能体间消息、外部消息 SDK 类型本周在四个仓库里各自独立地出现了。
5. **安全 UX 需要恢复路径。** 没有会话恢复能力的误报分类器（Codex #34306）以及静默过期的权限模型（Copilot #4764）会越来越阻碍安全敏感型专业用户的采纳。
6. **Windows 仍是全生态的系统性债务** —— 七之六的工具今天都发布了 Windows 专项修复或回归。
7. **token 效率工程正在成为差异化点** —— AST 感知读取（Gemini）、休眠 MCP 绑定复用（Codex）、工具子集化都在回应同一成本压力。
8. **工具正在自我构建** —— Qwen 的 autofix/takeover 自动化与 Codex 的 alpha 冲刺表明 AI 辅助的工具开发本身正成为值得关注的元趋势。

---
*来源：anthropics/claude-code、openai/codex、google-gemini/gemini-cli、github/copilot-cli、anomalyco/opencode、earendil-works/pi、QwenLM/qwen-code 的社区摘要，2026-09-09。计数为摘要中浮现的数据，上游总量可能不同。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告

**报告周期:** 数据截至 2026-09-09
**来源:** [github.com/anthropics/skills](https://github.com/anthropics/skills)（官方 Claude Code Skills 仓库）

> *注:数据集中未公开 PR 评论数,因此下方 PR 按提供的 feed 顺序排列。Issue 排名使用已核实的评论数。*

---

## 1. 热门 Skills 排行

讨论最热烈的 Skills 与元改进主要围绕三类方向:文档质量工具、Skills 创建可靠性,以及多 Agent 编排。

**1. `skill-creator` 评估流水线重构 — PR [#1298](https://github.com/anthropics/skills/pull/1298)** *(OPEN)*
作者: MartinCajiao
修复了一个关键 bug:`run_eval.py` 对每个 skill 描述都报告 `recall=0%`(已独立复现 10 余次,见 Issue [#556](https://github.com/anthropics/skills/issues/556))。由于 `run_loop.py` 和 `improve_description.py` 都依赖该信号,描述优化循环实际上是在对着噪声做优化。同时还处理了 Windows 流读取、触发检测以及并行 worker 的问题。**状态:开放中,属于基础设施级修复。**

**2. 文档排版 Skill — PR [#514](https://github.com/anthropics/skills/pull/514)** *(OPEN)*
作者: PGTBoos
提出一个排版质量 Skill,可捕获 Claude 生成文档中的孤词换行、寡行段落以及编号错位等问题。论点是:这些问题影响 Claude 产出的每一份文档,且很少被用户察觉。**状态:开放中,属于高影响力 UX 改进。**

**3. SCNet HPC Skill — PR [#1615](https://github.com/anthropics/skills/pull/1615)** *(OPEN)*
作者: lql341
为 SCNet HPC 集群新增基于 profile 的 SSH + Slurm 工作流 Skill,涵盖连接配置、partition/module/accelerator 指引、作业生成以及集群发现。**状态:开放中,属于垂直/企业级 Skill。**

**4. ODT(OpenDocument)Skill — PR [#486](https://github.com/anthropics/skills/pull/486)** *(OPEN)*
作者: GitHubNewbie0
通过新增对 `.odt` 与 `.ods` 文件的创建/填充/解析能力,补齐 LibreOffice / ISO OpenDocument 生态这块拼图,将文档格式覆盖范围扩展到既有的 PDF/DOCX Skills 之外。**状态:开放中。**

**5. Frontend-Design Skill 说明重写 — PR [#210](https://github.com/anthropics/skills/pull/210)** *(OPEN)*
作者: justinwetch
重写现有的 `frontend-design` Skill,使每条指令都能在一次对话中具体落地执行 —— 减少歧义,让 Claude 的行为引导更可靠。**状态:开放中。**

**6. 元 Skills:质量与安全分析器 — PR [#83](https://github.com/anthropics/skills/pull/83)** *(OPEN)*
作者: eovidiu
新增两个 marketplace 元 Skill:五维质量分析器(结构、文档、行为、性能、安全)以及用于审查 Claude Skills 的安全分析器。**状态:开放中,是队列中历史最久的 PR 之一。**

**7. Hivemind —— 零成本多 Agent 编排 — PR [#1628](https://github.com/anthropics/skills/pull/1628)** *(OPEN)*
作者: Hanishchow
将机械性工作下放给运行在免费模型上的无头 `opencode` worker,而 Claude Code 保留规划者/审查者/合并者的角色。其核心观点是:真正稀缺的资源是上下文(context),而非智能本身。**状态:开放中。**

**8. `testing-patterns` Skill — PR [#723](https://github.com/anthropics/skills/pull/723)** *(OPEN)*
作者: 4444J99
一份全栈测试手册:Testing Trophy 理念、unit/React/component 模式、AAA、命名规范、边界场景。填补了 Skills 集合中明显的空缺。**状态:开放中。**

---

## 2. 社区需求趋势

从 Issues 来看,呼声最高的社区信号集中在以下方向:

**信任边界与命名空间滥用(43 条评论) — Issue [#492](https://github.com/anthropics/skills/issues/492)**
仓库里最热门的一条讨论帖。以 `anthropic/` 命名空间分发的社区 Skills 会被用于冒充官方 Skills 并实施权限提升。社区呼吁更严格的信任标识(签名、徽章、命名空间隔离)。

**企业级 Skill 共享(16 条评论) — Issue [#228](https://github.com/anthropics/skills/issues/228)**
强烈希望在 Claude.ai 内部实现组织级的 Skill 分发。当前流程(下载 `.skill` → Slack → 在 Settings > Capabilities 手动上传)对团队而言难以规模化。需要共享 Skill 库或分享链接机制。

**Skill-Creator 可靠性(12 条评论) — Issue [#556](https://github.com/anthropics/skills/issues/556)**
`run_eval.py` 无法可靠判断某个 Skill 是否会被触发,这直接破坏了整条描述优化循环。已通过 PR [#1050](https://github.com/anthropics/skills/pull/1050)、[#1099](https://github.com/anthropics/skills/pull/1099)、[#1298](https://github.com/anthropics/skills/pull/1298) 等多次尝试修复。

**Skill 丢失与 UX(10 条评论) — Issue [#62](https://github.com/anthropics/skills/issues/62)**
用户反馈已上传的 Skill 在本地文件系统变更后会静默消失,暴露出 Skill 生命周期/持久化方面的 UX 缺口。

**插件冲突(6 条评论,9 👍) — Issue [#189](https://github.com/anthropics/skills/issues/189)**
同时安装 `document-skills` 与 `example-skills` 插件会产生重复 Skill,挤占上下文窗口。README 中的语义说明需要更正。

**记忆与治理类 Skills(9 + 6 条评论) — Issues [#1329](https://github.com/anthropics/skills/issues/1329)、[#412](https://github.com/anthropics/skills/issues/412)**
社区请求 `compact-memory`(用符号化表示压缩 Agent 状态)与 `agent-governance`(策略执行、威胁检测、信任评分、审计日志)。两者都反映出社区对**元认知型**和**安全导向型**Skills 的需求正在走向成熟。

**规模化下的工具调用(4 条评论) — Issue [#1487](https://github.com/anthropics/skills/issues/1487)**
内置的 `claude-api` Skill 会一次性急注入约 156k tokens,一次工具调用就把上下文耗尽。这说明 Skills 本身也需要**按需加载与配额控制**。

**跨平台与 MCP 集成(各 4 条评论) — Issues [#29](https://github.com/anthropics/skills/issues/29)、[#16](https://github.com/anthropics/skills/issues/16)、[#1390](https://github.com/anthropics/skills/issues/1390)**
Bedrock 支持、Skills-as-MCP,以及 `mcp-builder` 的评估缺陷,反映出社区希望 Skills 能够在不同 runtime 间可移植、可组合、可验证。

**质量门禁(4 条评论) — Issue [#1385](https://github.com/anthropics/skills/issues/1385)**
提议一条三道关卡的流水线(任务前校准 → 对抗性评审 → 交付验证),与 PR [#1367](https://github.com/anthropics/skills/pull/1367) 中的 `self-audit` Skill 思路一脉相承。

---

## 3. 高潜力待合并 Skills

持续受到关注、仍未合并,一旦评审解锁就很可能落地的 PR:

| PR | Skill / Fix | 作者 | 为何重要 |
|---|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | `run_eval.py` recall + Windows 修复 | MartinCajiao | 解锁整条描述优化循环 |
| [#514](https://github.com/anthropics/skills/pull/514) | `document-typography` | PGTBoos | 默认提升所有生成文档的质量 |
| [#486](https://github.com/anthropics/skills/pull/486) | `odt`(OpenDocument) | GitHubNewbie0 | 补齐文档格式的覆盖 |
| [#83](https://github.com/anthropics/skills/pull/83) | `skill-quality-analyzer` + `skill-security-analyzer` | eovidiu | 直接回应 Issue [#492](https://github.com/anthropics/skills/issues/492) 提出的信任问题 |
| [#1628](https://github.com/anthropics/skills/pull/1628) | `hivemind` | Hanishchow | 降低多 Agent 工作流的天花板成本 |
| [#1627](https://github.com/anthropics/skills/pull/1627) | `buffer-api` | JPeetz | 首个社交媒体排期 Agent Skill;在 Claude/Cursor/Codex 间可移植 |
| [#1367](https://github.com/anthropics/skills/pull/1367) | `self-audit` | YuhaoLin2005 | 输出验证 + 四维推理门禁;与 Issue [#1385](https://github.com/anthropics/skills/issues/1385) 互补 |
| [#723](https://github.com/anthropics/skills/pull/723) | `testing-patterns` | 4444J99 | 填补测试策略的空缺 |
| [#1615](https://github.com/anthropics/skills/pull/1615) | `scnet-hpc` | lql341 | HPC 用户的垂直 Skill |
| [#210](https://github.com/anthropics/skills/pull/210) | `frontend-design` 重写 | justinwetch | 收紧最常用的创意类 Skill 之一 |
| [#1362](https://github.com/anthropics/skills/issues/1362) | `web-artifacts-builder` pnpm/favicons/fonts 修复 | astradevkin | 阻塞 artifact 工作流的关键构建问题 |

---

## 4. Skills 生态洞察

> **社区最集中的诉求,是值得信赖的、轻量化的、聚焦文档与推理质量的 Skills —— 也就是那些能够"修复 Claude 自身输出"(排版、文档格式、评估可靠性、自审)并划清官方与社区贡献之间信任边界的 Skills。**

三种结构性压力正在交汇:(a)`skill-creator` 在 Windows 上无法可靠度量自身,导致 Skill 生态的自改进循环目前是断的;(b)文档生成是最高频的使用场景,却缺少排版/保真度方面的覆盖,且已有的某些 Skill(如 `claude-api`)单次工具调用就能把上下文耗尽;(c)命名空间级别的信任信号缺失的问题已经在被利用,这使得像质量/安全分析器、`self-audit` 这样的元 Skills 成为当前最具战略意义的待合并项。

---

# Claude Code 社区摘要 — 2026-09-09

## 今日要点

- **热修复 v2.1.266 发布了一个关键回归修复**，针对通过 LLM 网关和代理路由 Claude Code 的用户 —— 未文档化的 `CLAUDE_CODE_USE_GATEWAY` 环境变量在 2.1.265 中强制执行 Cloud 网关登录。
- **Windows 上的 Cowork 正在被 2026 年 9 月的累积更新反复折腾**，多个公开报告显示在重启或 bridge 中断后 Plan9 共享挂载和 shell 文件夹挂载被破坏（issues #92958、#93047）。
- **集群 / 单代理配置正在成为社区最关注的痛点** —— `/model` 和 `/effort` 仍然会修改全局 `settings.json`，无法为独立配置的 agent 提供受支持的路径（#66402，👍14）。

---

## 版本发布

**v2.1.266** — *最新*
- 修复：回退了 2.1.265 中的一个回归 —— `CLAUDE_CODE_USE_GATEWAY` 开始强制 Cloud 网关登录，但并未要求同时设置 `ANTHROPIC_BASE_URL` + `ANTHROPIC_AUTH_TOKEN`。使用网关 / 代理的用户应立即升级。

**v2.1.265**
- 遥测：Desktop 和 Cowork 会话在通过 Claude apps gateway 路由时，现在包含 `user.email` 和 `user.groups`，与终端会话已有的行为对齐。
- 插件：`--plugin-dir` 现在接受一个插件文件夹 —— 每个带清单的子文件夹都会被加载，目录内的添加 / 移除会被实时捕获。

---

## 热门 Issue

1. **[#92958] Cowork Windows — 2026 年 9 月累积更新破坏了 Plan9 共享挂载**（19 条评论，👍1）— 未关闭，已有复现。ARM64（KB5124012）和 x64（KB5124008）累积更新都会导致 Windows Cowork 上的 `device_bash` 死亡；通过五台机器的 A/B 回滚已确认。信号度高，因为这是已发布操作系统的回归。
2. **[#66402] `/model` 和 `/effort` 会修改全局 `settings.json`**（11 条评论，👍14）— 未关闭。目前没有受支持的方式来运行一组各自独立配置 model/effort 的 agent；一台主机只有一个全局文件。今日批次中点赞比最高。
3. **[#91784] Auto 模式仍然提示 `grep` 工具授权**（5 条评论，👍13）— 未关闭，macOS。源于之前某个版本的回归；Auto Mode 开启的情况下，`cd` 之后的 `grep` 仍会暂停 agent。社区反应强烈 —— 虽小但会直接打断工作流的回归。
4. **[#65781] Esc 关闭 `/btw` 弹窗并拒绝待处理的文件编辑**（7 条评论，👍9）— 已关闭。TUI 中的 UX bug：用 `Esc` 关闭弹窗时会静默地取消一个无关的待处理编辑。与 #74959 是反复出现的主题。
5. **[#81512] Cowork device 会话每 ~24–36h 被强制登出**（4 条评论，👍0）— 已关闭。`elevated_auth` / `session_stale_relogin` 正在杀掉无人值守的自动化。已关闭（可能已 stale），但代表了 Cowork 中的可靠性担忧。
6. **[#90141] 自托管 marketplace：desktop 拒绝非白名单 git 主机**（2 条评论，👍0）— 未关闭。运行自有技能 marketplace 的企业即使配置了已认证的 marketplace，也会在 desktop 应用中撞上硬性拦截。对自托管环境来说重要性很高。
7. **[#92974] 后台模式权限对话框只显示 Deny 按钮**（2 条评论，👍0）— 未关闭，macOS。今天新报 —— 后台模式的权限流程缺少 Accept 路径，相当于在后台时对工具的软拦截。
8. **[#93047] Cowork Windows：bridge 中断后 cloud shell 文件夹挂载永远不会重新挂载**（1 条评论，👍0）— 未关闭，刚刚提交。与 #92958 配套 —— Plan9/virtiofs 挂载在重启后仍处于死状态，即使相邻操作已经恢复。
9. **[#76841] Routines：在移动端无法列出 / 重新打开某个 routine 的会话**（3 条评论，👍1）— 未关闭。一旦某个 routine 的推送通知过期，该会话在移动端就变得不可达 —— 对 routine 驱动的工作流是一个真实的空白。
10. **[#83455] 自动生成会话名称的可配置命名规则**（1 条评论，👍1）— 未关闭，功能增强。并发会话下，默认的 `<dir>-<2char>` 和 AI 摘要标题很难一眼区分；`/rename` 和 `-n` 都得手动操作。

---

## 关键 PR 进展

1. **[#63686] 将 stale 和 autoclose 超时从 14 → 90 天** — 已关闭（未合并）。同时调整 `scripts/issue-lifecycle.ts` / `scripts/sweep.ts` 中的两个开关。值得关注，因为它解释了为什么今天这么多被打上 "stale" 标签的 issue（例如 #65781、#77377、#77022、#81512、#84377、#84538）最近被关闭，尽管它们仍在收到回复。

> 过去 24h 只有一个 PR 有动静。今天的活动压倒性地集中在 issue 端 —— 这是分流 / 清理的信号，而非活跃功能开发。

---

## 热门讨论

*本次摘要窗口未提供讨论数据 —— 该章节略过。*

---

## 功能请求

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-09

## 今日要点

`rust-v0.154.0` alpha 线推进迅速，过去 24 小时内发布了四个新的预发布版本，并伴随一波向 Python SDK 的大规模合并（历史选择、每轮选项、外部消息、发布后发布流水线）以及凭据代理/代理层。Bug 方面，Windows 继续主导热门 issue 流量，反复出现的问题集中在 Computer Use、MCP 服务器、浮动 Pets 功能，以及一个分页发布会话 Bug（可能导致 macOS 和 Windows 上的会话历史永久冻结）。

## 发布版本

过去 24 小时内在 `rust-v0.154.0` 线发布了四个新的 alpha 构建，表明正朝着下一个次要 CLI 版本进行积极的稳定性冲刺：

- `rust-v0.154.0-alpha.11` — [Release](https://github.com/openai/codex/releases)
- `rust-v0.154.0-alpha.10.2` — [Release](https://github.com/openai/codex/releases)
- `rust-v0.154.0-alpha.8` — [Release](https://github.com/openai/codex/releases)
- `rust-v0.154.0-alpha.7` — [Release](https://github.com/openai/codex/releases)

## 热门 Issue

1. **#28919 — Windows 应用在 Settings > Connections 中缺失“control other devices”选项卡** — 66 条评论，62 👍。长期存在的回归问题，阻碍了 Windows 上 Pro 用户的远程控制设置。本周获赞最多的开放 issue。[链接](https://github.com/openai/codex/issues/28919)

2. **#41513 — [Windows] 内置和自定义浮动 Pets 变为点击穿透且不可拖动** — 34 条评论，14 👍。在最近两个桌面版本上均可复现；吉祥物可见但点击事件穿透到下层窗口，导致该功能完全失效。[链接](https://github.com/openai/codex/issues/41513)

3. **#25271 — Computer Use 无法在 Windows 上确定 Chrome URL** — 34 条评论，9 👍。即便 `chrome://newtab/` 也无法被 Windows 上的 Computer Use 解析，削弱了 cua_repl 流水线在最流行桌面操作系统上的核心价值主张。[链接](https://github.com/openai/codex/issues/25271)

4. **#41566 — 分页发布在未完成的轮次后发出重复的序号，导致会话历史冻结** — 28 条评论。一个正确性 Bug，未完成的轮次可能导致会话分页永久失同步；不进行手动清理，会话历史永远无法恢复。[链接](https://github.com/openai/codex/issues/41566)

5. **#42215 — ChatGPT Work 本地聊天：“无法为此项目使用本地聊天”** — 26 条评论。对于具有 20+ 源文件的项目，项目上下文同步在文件系统阶段失败，阻碍了大量用户的 Work/Projects 使用。[链接](https://github.com/openai/codex/issues/42215)

6. **#29639 — Browser Use / Node REPL 在带有 WSL 工作区的 Windows Desktop 上失败** — 23 条评论，7 👍。自动生成的 `node_repl` MCP 服务器发送的是 Windows 二进制，但配的是 Linux/WSL 的 `sandboxCwd`，桌面 ↔ WSL 桥接层存在根本性的不匹配。[链接](https://github.com/openai/codex/issues/29639)

7. **#34306 — 在合法请求上误报“网络安全”策略标记（CLI）** — 20 条评论，14 👍。`gpt-5.6-sol-xhigh` 在良性工作上触发安全过滤器；报告模板不清晰，导致用户无法恢复会话。[链接](https://github.com/openai/codex/issues/34306)

8. **#42683 — Alt+P 键盘快捷键导致 Windows 应用崩溃** — 14 条评论，4 👍。在文档化的快捷键上发生硬崩溃，最后一次复现版本为 `26.901.22334`。[链接](https://github.com/openai/codex/issues/42683)

9. **#43124 — macOS 桌面历史在较早的轮次冻结（投影序号不匹配）** — 11 条评论。#41566 的 macOS 对应问题：分页发布报告 `expected 3185, got 3184`，UI 中最近几轮消失但磁盘上仍保留。[链接](https://github.com/openai/codex/issues/43124)

10. **#38573 — Azure Responses API 400：`input[0].tools[0].description is empty`** — 10 条评论，3 👍。Azure/Foundry 上的自定义模型用户受阻，因为 Desktop 客户端未填写 Azure Responses 端点所需的 `description` 字段。[链接](https://github.com/openai/codex/issues/38573)

**值得关注的：** [#29546](https://github.com/openai/codex/issues/29546) `gpt-5.5` 404（12 👍）显示 App/CLI 间存在模型版本漂移；[#24879](https://github.com/openai/codex/issues/24879) 暴露 `codex-auto-review` 被硬编码，对自定义提供方会出错；[#42514](https://github.com/openai/codex/issues/42514) 报告 Intel Mac（x86_64）上 Computer Use 完全缺失。

## 关键 PR 进展

1. **#44121 — 在缓存的服务器仍处于休眠状态时复用 MCP 绑定** — 当休眠服务器的工具目录仍可用时，停止让模型在每一步捕获新的 MCP 绑定。降低启动延迟和工具调用噪音。[链接](https://github.com/openai/codex/pull/44121)

2. **#44086 — 向 Python SDK 添加不可信外部消息** — 为同步/异步 `run(...)` 和 `run_streamed(...)` 新增 `ExternalMessage`，使应用能够传递来自其他代理的工具授权内容，而不会被当作用户输入处理。[链接](https://github.com/openai/codex/pull/44086)

3. **#44084 — 暴露 Python SDK 历史选择和每轮选项** — 调用方现在可以控制响应历史加载并为单个轮次覆盖服务层级，并附带运行时版本兼容性检查，使旧版 CLI 失败时报错而非静默忽略该选项。[链接](https://github.com/openai/codex/pull/44084)

4. **#44067 — 在稳定版 CLI 发布后发布 Python 包** — 新增下游工作流，将 SDK 运行时依赖固定到刚发布的 CLI 版本，并在发布 SDK 前在 PyPI 上验证运行时。[链接](https://github.com/openai/codex/pull/44067)

5. **#44061 — 在发布运行时前构建 Python SDK 制品** — 此前 SDK 构建失败可能导致运行时单独发布；该 PR 提取了可复用的 SDK 构建工作流并重新排序了流水线。[链接](https://github.com/openai/codex/pull/44061)

6. **#44060 — 将 Guardian 的动作审查上限提升至 200,000 字节** — 将 `GUARDIAN_MAX_ACTION_BYTES` 从 8,000 → 200,000，以便审查大型 diff/unified-exec 动作，同时保持 `MAX_STDIN_APPROVAL_BYTES` 上限为 8,000。[链接](https://github.com/openai/codex/pull/44060)

7. **#44056 — 向网络代理添加可配置的凭据提供方** — 为环境变量、URL 前缀以及 bearer/token/Basic 认证新增 `credential_providers` 配置，加上用于 HTTP `CONNECT`/SOCKS5 隧道的虚拟凭据生成。为更安全的代理工作流奠定基础。[链接](https://github.com/openai/codex/pull/44056)

8. **#44072 — 在 shell 快照中支持已配置的凭据提供方** — 即使 shell 环境策略对子进程隐藏凭据目标，也能保留它们；并确保令牌轮换保持原始目标绑定。[链接](https://github.com/openai/codex/pull/44072)

9. **#44043 — 在线程 fork API 中统一使用 `StartThreadOptions`** — 在单个选项结构后统一发布/已加载历史/已准备 fork，并用 fork 快照替换 `initial_history`，消除一类“fork 与 reload”配置漂移 Bug。[链接](https://github.com/openai/codex/pull/44043)

10. **#44049 — 提取凭据代理环境和注册表辅助函数** — 将环境/标记辅助函数拆分到 `credential_broker/environment.rs`，将优先级/选择拆分到 `credential_broker/registry.rs`，为更多提供方铺平道路。[链接](https://github.com/openai/codex/pull/44049)

**同样值得注意：** [#44070](https://github.com/openai/codex/pull/44070) 在 data URL 中拒绝空音频负载并返回明确错误；[#44062](https://github.com/openai/codex/pull/44062) 修复了语音运行时 Bazel `-c opt` 构建和签名后权限问题。

## 热门讨论

### Ideas
- **#9618 — `/rewind` 或 `/revert` 功能** — 仍是仓库中获赞最多的帖子（126 👍，21 条评论）。用户强调 OpenCode 和 Claude Code 都提供了撤销功能，而 Codex 缺乏这一功能迫使他们不断提交，并使长会话“几乎无法使用”。[链接](https://github.com/openai/codex/discussions/9618)

### Q&A
- **#43891 — 修复 Codex 26.820 上的 macOS `SkyComputerUseService` 进程风暴** — 用户确认的解决方案和更新：**26.901.51231** 修复了上百个进程/10+ GB RAM/内核崩溃的回归问题。对于仍停留在 26.8xx 的用户来说是实用的参考。[链接](https://github.com/openai/codex/discussions/43891)
- **#43911 — 纸牌游戏应用中 AI 分析思维和决策问题** — 开发者询问为何四个 AI 玩家无法利用可用的游戏状态；反映出用户对多代理游戏逻辑的提示/脚手架感到困惑这一反复出现的话题。[链接](https://github.com/openai/codex/discussions/43911)

### Show and Tell
- **#16329 — Awesome Codex CLI：150+ 生态工具** — 社区维护的子代理、技能、插件和 MCP 服务器索引。新用户的有用起点。[链接](https://github.com/openai/codex/discussions/16329)
- **#44109 — `postbag`：通过 `codex queue` 在 Codex 和 Claude Code 会话之间传递信件** — 利用各厂商自身的唤醒机制（无守护进程、无轮询）的轻量级代理间集成框架。多代理工作流的有趣原语。[链接](https://github.com/openai/codex/discussions/44109)
- **#44046 — Built with Codex：本地 CSV 对账（`csv-merge-dedupe`）** — 附带 HTML 报告的可复现演示；是使用 Codex 驱动数据工具并产生确定性输出的良好示例。[链接](https://github.com/openai/codex/discussions/44046)
- **#43908 — ManualMode：在 Codex 旁边预留一个真实的仓库任务供手动实践** — 由 Codex 提出一个所需的小任务、开发者手动实现的工作流；面向仍想动手实践的工程师。[链接](https://github.com/openai/codex/discussions/43908)

### General
- **#14104 — 在 Codex CLI 中插入新行** — 用户希望使用 `Shift+Enter` 而不是 `Ctrl+J` 来换行；14 👍。[链接](https://github.com/openai/codex/discussions/14104)
- **#41527 — 在 SteamOS 3.8.16（Steam Deck）上成功运行原生 ChatGPT Linux 应用** — 证实 Linux 预览版可在基于 Arch 的 SteamOS 上运行，尽管并未正式支持。[链接](https://github.com/openai/codex/discussions/41527)
- **#40132 — 你正在用 Codex 构建什么？** — 轻量级社区汇总；对寻找用例模式的新人很有帮助。[链接](https://github.com/openai/codex/discussions/40132)

## 功能请求趋势

在 issue 和讨论中，呼声最高且反复出现的需求方向包括：

1. **会话撤销/检查点。** `/rewind` 和 `/revert` 仍是获赞最多的帖子；用户明确与 Claude Code 和 OpenCode 进行对比，并将这一缺失视为严肃工作流的障碍。
2. **稳定的 Windows 平台对等。** 一长串 Bug（远程控制、Computer Use、MCP/WSL 桥接、Pets、项目同步、Alt+P 崩溃、阿拉伯语 RTL）显示 Windows 用户感觉自己是二等公民。
3. **可靠的会话/历史分页。** 重复序号和投影不匹配的 Bug（Windows + macOS）表明分页发布层需要恢复路径以及对未完成轮次更好的持久性。
4. **更好的提供方/模型可移植性。** Auto-review 被硬编码为 `codex-auto-review`、Azure Responses 缺少必需字段，显示出自定义提供方用户反复被 OpenAI 特定假设所困扰。
5. **更安全、更细致的安全分类器。** 在合法工程工作上出现多次误报“网络安全”/“网络滥用”拦截（#34306、#30271），推动更清晰的脱敏/恢复流程以及对已验证用户更温和的规则。
6. **TUI 体验质量。** 换行绑定（`Shift+Enter`）、RTL 渲染、输入法快捷键冲突表明 TUI 使用频繁，需要平台感知的键位映射。
7. **静默状态下的 MCP。** 休眠服务器的复用绑定、`cua_repl` 的配置覆盖、OAuth 范围选择——都指向一个更可配置、更易恢复的 MCP 层。
8. **Pets 作为正式产品功能。** 多份点击穿透报告和 macOS 快捷键冲突表明该功能在作为彩蛋之外的形态发布前需要自己的稳定性打磨。

## 开发者痛点

- **Windows 全链路脆弱。** 开放 issue 的最大单一来源：缺失远程控制选项卡、Computer Use URL 解析、WSL sandbox 路径桥接、Pets 点击穿透、项目同步、聊天编辑器消失、历史投影冻结、Alt+P 崩溃、TUI 中的阿拉伯语 RTL。
- **会话历史可能静默损坏。** Windows 和 macOS Desktop 应用都可能因分页发布不匹配丢失数天轮次，且没有恢复手段。
- **自定义提供方撞上 OpenAI 特定假设。** 硬编码的 `codex-auto-review` 模型名称、Azure Responses 要求 `tools[].description`、旧版本中的 `gpt-5.5` 404——对任何在 Azure/Foundry/本地代理上运行的用户都是阻力。
- **安全过滤器在安全工作上误报。** 逆向工程、漏洞分析及相邻的良性工作流在没有明确恢复路径的情况下触发网络安全分类器。
- **Computer Use 跨平台表现参差不齐。** 在 Apple Silicon macOS 上可用，在 Intel Mac 上破损，在 Windows 上 URL 解析不可靠，在旧版 macOS 上存在进程风暴回归。
- **MCP 体验需要改进。** OAuth DCR 范围选择、elicitation 通知、`cua_repl` 配置覆盖、绑定复用都在过去 24 小时内浮出水面，表明 MCP 是高级用户的主要痛点。
- **Python SDK 发布卫生。** 本周多个 PR 明确围绕运行时 → SDK 发布顺序、依赖 PyPI 可用性、避免静默不兼容展开——这表明开发者曾被先前损坏的 SDK 发布所伤害。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区简报 — 2026-09-09

## 1. 今日要点

今天共有三个版本发布，主打 **v0.61.0-nightly**（NTFS 短文件名路径问题缓解、沙盒内设置目录隔离）和 **v0.60.0-preview.0**（web fetch 路由加固、RFC 9207 MCP OAuth 签发方强制校验）。一份新的 **P1 报告 (#29257)** 指出 `cli_help` 子代理在回答 CLI 元问题时会精确卡住 3 分钟，为高优先级子代理可靠性问题群再添一例。贡献者方面，一个关键的开放 PR (#29265) 致力于解决**中断回合导致的会话上下文污染**，同时多个长期悬置的 P1/P2 修复（Plan Mode 非交互挂起、macOS Seatbelt 授权崩溃、a2a-server 凭据清理）已合并。

## 2. 版本发布

- **[v0.61.0-nightly.20260909](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260909.ged2ac40df)** — 缓解 Windows 上 NTFS 8.3 短文件名（SFN）路径问题（[PR #29116](https://github.com/google-gemini/gemini-cli/pull/29116)）；隔离沙盒容器内的设置目录（[PR #29216](https://github.com/google-gemini/gemini-cli/pull/29216)）。
- **[v0.60.0-preview.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-preview.0)** — 改进 web fetch 工具中的目标校验与连接路由（[PR #29120](https://github.com/google-gemini/gemini-cli/pull/29120)）；在 MCP OAuth 流程中强制执行 RFC 9207 签发方标识——这是对 MCP 集成的一项显著安全加固。
- **[v0.59.0](https://github.com/google-gemini/gemini-cli/releases/tag/v0.59.0)** — 稳定版切出，包含变更日志与版本号自动递增，以及累积的核心修复。

## 3. 热门 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子代理达到 MAX_TURNS 后仍报告 GOAL 成功（P1，13 💬）**
   `codebase_investigator` 一边声称成功，一边承认自己还没做任何工作就用完了回合数。这是一个正确性黑洞：被静默中断的代理运行，在编排器和用户看来却像是已成功完成。今日评论量最高；仍在等待复测确认。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用代理无限期挂起（P1，8 💬，8 👍）**
   本批中获赞最多的议题。即便是创建文件夹这样的琐碎任务，委派给通用子代理也会挂起，最长可达一小时。用户被迫在提示词中写明“不要使用子代理”——这是子代理委派正在切实损害用户体验的强烈信号。

3. **[#29257](https://github.com/google-gemini/gemini-cli/issues/29257) — `cli_help` 子代理恰好挂起 3 分钟（P1，昨日提交）**
   今日新增。内置的 CLI 自助帮助代理在任何元问题（“我要怎么升级？”）上都会稳定卡住 180 秒，原因是 `thinkingBudget` 无上限且缺少每回合超时。精确到 3 分钟的复现路径意味着这大概率是个快速修复——值得关注。

4. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖操作系统沙盒 + 执行后意图路由（P2，9 💬）**
   架构提案：让 Gemini 3 原生的 bash 倾向（grep/sed/awk 链式调用）在操作系统级沙盒保护下自由发挥，而不是被限制在自定义工具封装中。高参与度表明社区希望每次编辑能减少工具调用往返。

5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — AST 感知的文件读取、搜索与代码库映射（EPIC，P2，7 💬）**
   一个调研型 epic：探索语法感知工具，一次调用即可读取精确的方法边界，而非错位的行号范围。直击 token 浪费与多回合读取纠偏问题；配套的探索性验证 [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) 正在评估 `tilth`/`glyph` 作为起点。

6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — 模型几乎不会自主使用 skills 和子代理（P2，6 💬）**
   自定义的 `gradle`/`git` skills 除非被显式调用否则会被忽略，即使任务与之直接相关。这是一个反复出现的主题：用户投入精力定义 skill/代理，模型却无法发现或路由到它们。

7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 执行在命令完成后仍卡在“等待输入”（P1，4 💬，3 👍）**
   已完成的 shell 命令仍会让界面停留在激活状态的“等待用户输入”。结合 #22465（`create-vite` 交互式提示挂起），shell/TTY 生命周期管理仍是最主要的可靠性短板。

8. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory 在脱敏前就将转录内容发送给模型（P2，安全，5 💬）**
   密钥脱敏发生在转录内容已进入提取模型上下文*之后*。这是一个更广泛的内存质量问题群（#26516、#26522、#26523）的一部分，由同一位报告者跟踪；隐私角度使其成为其中最敏感的一项。

9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子代理在 Wayland 上失败（P1，4 💬）**
   浏览器代理在 Wayland Linux 会话中立即终止。值得注意，因为它让整个使用该显示服务器的用户群体都用不上这个旗舰级子代理；等待复测。

10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 注册工具超过 128 个时报 400 错误（P2，3 💬）**
    重度 MCP/扩展用户撞上了 API 硬限制，而客户端侧没有任何工具作用域裁剪。按任务智能选取工具子集的诉求，与下文提到的 token 效率趋势相互呼应。

## 4. 关键 PR 进展

1. **[#29265](https://github.com/google-gemini/gemini-cli/pull/29265) — 防止中断回合导致会话上下文污染（OPEN，P2）**
   当前，中断数据流（SIGINT、超时、工具调用中止）会破坏聊天历史并导致所有后续提示失败。这是今日影响最大的开放 PR——它解决的是上述挂起问题在“中断路径”上的同类问题。

2. **[#29163](https://github.com/google-gemini/gemini-cli/pull/29163) — 修复 git 仓库内授权时的启动崩溃（OPEN，P1，安全）**
   `useGitBranchName` 钩子在 macOS Seatbelt/受限权限下无法读取 `.git` 时崩溃。为沙盒化的 macOS 用户消除了一处硬性启动失败。

3. **[#29063](https://github.com/google-gemini/gemini-cli/pull/29063) — 阻止 Plan Mode 在非交互运行中等待用户反馈（CLOSED，P1）**
   修复了 `gemini -p ... -y` 下 Plan Mode 永久挂起的问题，原因是工作流指令假定存在交互式用户回合。为 headless/CI 使用扫清了障碍。

4. **[#29067](https://github.com/google-gemini/gemini-cli/pull/29067) — 移除 a2a-server 中误导性的安全方案与硬编码凭据（CLOSED，P1/P2）**
   从 coder 代理卡片中剥离了伪造的认证元数据和不安全的硬编码凭据——对 A2A 接口而言，这是一项与供应链安全密切相关的重要治理。

5. **[#29151](https://github.com/google-gemini/gemini-cli/pull/29151) — skill 优先级不区分大小写及激活状态跟踪（OPEN，P1）**
   当大小写不一致（`Git` vs `git`）时，工作区 skills 会静默地无法覆盖内置 skills。与议题 #21968 中“skills 不生效”的报告直接相关。

6. **[#29089](https://github.com/google-gemini/gemini-cli/pull/29089) — 将 abortSignal 透传至 retryWithBackoff（CLOSED，P2）**
   取消操作现在能在 `BaseLlmClient` 的重试逻辑（会话摘要、压缩、分类器）中传播，而不是留下孤立的重试循环——这是一项结构性修复，有助于减少“永久挂起”类问题。

7. **[#29087](https://github.com/google-gemini/gemini-cli/pull/29087) — 防止扩展并发安装竞态（CLOSED）**
   此前两个 Gemini CLI 进程可能对同一扩展交错进行文件复制与元数据写入；现已通过 `proper-lockfile` 串行化。对多终端用户是好消息。

8. **[#29088](https://github.com/google-gemini/gemini-cli/pull/29088) — 修复 VS Code 配套端 `stop()` 永不 resolve 的问题（CLOSED）**
   IDE 服务器的 MCP 长连接流阻碍了关闭时的排空（drain），进而阻塞扩展停用。修复了 VS Code 退出挂起问题。

9. **[#29156](https://github.com/google-gemini/gemini-cli/pull/29156) — 不再在 shell 执行中置空用户 git 配置（OPEN）**
   回退了一个回归（源自 #28792），该回归将 `GIT_CONFIG_GLOBAL`/`GIT_CONFIG_SYSTEM` 指向 `/dev/null`，导致每次 shell 工具调用都读不到 `user.name`/`user.email`——使代理署名的提交无法正常工作。

10. **[#29248](https://github.com/google-gemini/gemini-cli/pull/29248) — 确认操作后对历史与遥测数据去重（OPEN）**
    确认斜杠命令操作（例如 `/resume save <tag>` 覆盖）时，若消息与确认对话框发生竞态，不再重复记录历史/遥测。

*同批合并的还有：[#29155](https://github.com/google-gemini/gemini-cli/pull/29155)（UTF-16/32 BOM 解码修复，用于空计划检测）以及 nightly 版本号更新 [#29258](https://github.com/google-gemini/gemini-cli/pull/29258)。来自同一账号的一批低价值工作流重命名 PR（#29259–#29263）已被关闭且未合并。*

## 5. 热门讨论

*略——本数据集未提供 Discussion 讨论串数据。*

## 6. 功能请求趋势

- **代理可靠性与如实汇报**：正确的终止语义（#22323）、消除挂起（#21409、#29257）以及可安全中断的会话（#29265）占据主导。用户希望子代理的失败要“响亮”地暴露，而不是被伪装成“GOAL 成功”。
- **AST 感知的代码智能**：#22745/#22746 史诗加上"Tactful Extraction"（#19561，以 grep 优先的精准读取，对照约 36.6k token/回合的基线）表明社区强烈推动节省 token、感知结构的文件访问方式。
- **操作系统原生沙盒优先于工具封装**：#19873 主张让模型在 Seatbelt/sandbox 式隔离背后直接使用原生 POSIX 工具——自定义工具更少，更贴近模型原生的运作方式。
- **更好的 skill/子代理可发现性**：#21968、#29151 以及符号链接支持（#20079）都围绕同一个诉求：“让模型真正用上我配置好的东西。”
- **记忆系统走向成熟**：#265xx 问题群请求为 Auto Memory 引入确定性脱敏、有界重试、有效补丁呈现以及整体质量门禁。
- **可观测性**：通过 `/chat share` 分享子代理轨迹（#22598），以及在 `/bug` 报告中附带子代理上下文（#21763）。
- **安全护栏**：默认抑制破坏性的 git/数据库操作（#22672）。

## 7. 开发者痛点

- **子代理挂起是头号痛点**：通用代理挂起（#21409）、Wayland 上浏览器代理失败（#21983）、`cli_help` 3 分钟卡顿（#29257）、vite 交互式提示锁死（#22465）——用户为了保持效率，往往直接禁用子代理。
- **Shell/TTY 生命周期缺陷**：命令完成后仍显示“等待输入”（#25166）；中断回合可能污染整个会话（#29265）。
- **工作区卫生**：受 shell 限制的配置导致模型将临时编辑脚本散落在各种随机目录中，使干净的提交变得困难（#23571）。
- **静默不生效的配置**：浏览器代理忽略 `settings.json` 中 `maxTurns` 之类的覆盖项（#22267），以及符号链接的代理不加载（#20079），都在侵蚀对声明式配置的信任。
- **围绕 Auto Memory 的隐私焦虑**：转录内容在脱敏前就进入提取模型（#26525）是本周期呼声最高的安全顾虑。
- **重度用户的扩展性上限**：注册工具数超过 128 触发硬性 400 错误，且没有客户端侧的作用域裁剪（#24246）。
- **终端 UX 打磨**：调整窗口大小时的闪烁/性能问题（#21924）以及 `\n` 转义的怪异行为（#22466）仍是悬而未决的质量毛刺。

---
*数据来源：[google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) · 简报生成于 2026-09-09*

---

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要
**日期：2026-09-09**

---

## 🔥 今日亮点

- **Vim 模式已在 v1.0.84-2 中正式发布**——这是一项长期悬而未决的社区请求（issue #13，76 👍），在历经近一年后终于关闭。
- **24 小时内连续发布两个补丁版本（v1.0.84-2 与 v1.0.84-3）**，修复了 `/copy` 行为、MCP OAuth 可靠性以及 Windows 沙箱审计日志问题。
- **与内存相关的会话 Bug 正在恶化**：多个高优先级 issue 描述了 OOM 崩溃、失控循环以及会话无法恢复等问题，表明在长时间运行的工作流中存在稳定性回退。

---

## 📦 版本发布

### v1.0.84-3（最新版本）
- `/copy` 现在在可用时会包含任务完成消息。
- 通过 OAuth 认证的 MCP 服务器在会话启动阶段连接更加可靠。

### v1.0.84-2
- **新增**：Vim 模式现已正式可用——可通过 `/vim` 启用，或设置 `editorMode: "vim"`。当前模式会在输入时显示在编辑器中。
- **改进**：在受支持的 Windows 沙箱策略下，交互式 shell 命令现在会记录被阻止的访问。

---

## 🚨 热门 Issue

1. **[#4742](https://github.com/github/copilot-cli/issues/4742)** — Desktop app 1.1.15 在已有 Local（分支）会话运行时无法创建第二个会话。**重要性**：影响需要在同一项目中并行管理多个工作流线的用户；属于最新桌面版引入的回退。*（10 条评论，5 👍）*

2. **[#4612](https://github.com/github/copilot-cli/issues/4612)** — FileWatch 主机事件循环失控，导致 TUI 卡死并将调试日志膨胀至 13 GB。**重要性**：暴露了一个无界事件循环 Bug，对磁盘占用和响应性影响严重。*（9 条评论，1 👍）*

3. **[#4756](https://github.com/github/copilot-cli/issues/4756)** — Windows 应用在创建新的 Local 会话前，会强制归档每一个闲置的项目会话。**重要性**：高达 19 的 👍 数表明 1.1.15 桌面版更新后存在大范围的工作流摩擦。*（7 条评论，19 👍）*

4. **[#4664](https://github.com/github/copilot-cli/issues/4664)** — Copilot CLI 在恢复一个长期会话时因 JS 堆 OOM 而崩溃。**重要性**：恢复会话是核心用户路径；对拥有长时间会话历史的用户存在数据丢失风险。*（7 条评论，2 👍）*

5. **[#13](https://github.com/github/copilot-cli/issues/13)** — CLI 输入应当支持 vi/vim 输入模式。**已于今日关闭**。**重要性**：在所有列出 issue 中 👍 数最高（76），表明用户对模态编辑有着巨大的潜在需求。*（11 条评论，76 👍）*

6. **[#4775](https://github.com/github/copilot-cli/issues/4775)** — Mission Control 仪表板链接 404：`/copilot/tasks/<uuid>` 不存在；实际路径为 `/agents/tasks/<uuid>`。**重要性**：github.com 上远程会话管理的产品入口失效。*（3 条评论，0 👍）*

7. **[#2943](https://github.com/github/copilot-cli/issues/2943)** — OpenRouter 集成。**重要性**：体现出对模型提供商灵活性的需求；用户希望像竞品一样拥有多提供商备选方案。*（3 条评论，14 👍）*

8. **[#3976](https://github.com/github/copilot-cli/issues/3976)** — 原生 `tgrep` 索引器在大规模 monorepo 上因无内存上限而被 OOM kill。**重要性**：这个原生 Rust 工具比它所替代的 ripgrep *更*不可靠；实验门控掩盖了问题的严重性。*（3 条评论，0 👍）*

9. **[#4753](https://github.com/github/copilot-cli/issues/4753)** — v1.0.83 会话恢复时取消正在进行的 stdio MCP 连接（约 1s vs 约 16s 超时）。**重要性**：近期版本引入的静默 MCP 失败模式；用户会在毫无预警的情况下失去工具。*（3 条评论，1 👍）*

10. **[#2199](https://github.com/github/copilot-cli/issues/2199)** — 增加 Ctrl+Backspace 以删除整个单词。**重要性**：基础的编辑器人体工学；在 Windows（#3858）和 Unix 上都有持续的呼声。*（3 条评论，7 👍）*

---

## 🔧 重点 PR 进展

1. **[#4770](https://github.com/github/copilot-cli/pull/4770)** — *记录 WebSocket responses 退出选项*（OPEN）。为模型默认使用 WebSocket 传输并因 `400 input item ID does not belong to this connection` 而失败的情形补充文档说明。

2. **[#4761](https://github.com/github/copilot-cli/pull/4761)** — *install：报告不受支持的操作系统*（CLOSED）。修复了在 FreeBSD 等平台上 `install.sh` 误报"Windows detected"的问题。

---

## 📈 功能请求趋势

纵观今日的 issue 列表，可以归纳出几个反复出现的主题：

- **模态 / 进阶用户编辑**：Vim 模式（#13 → 已发布）、Ctrl+Backspace（#2199、#3858）、编辑器打磨。
- **编辑器 / IDE 人体工学**：可见的 TODO 列表（#1724）、更清晰的等待输入状态（#4778）、更佳的通知/任务栏反馈（#4771、#4381）。
- **模型与提供商灵活性**：OpenRouter 集成（#2943）、Gemini MCP 联合类型工具 Schema 修复（#4623）。
- **插件 / 扩展生态**：Marketplace 插件依赖解析（#4487）。
- **企业级控制**：带认证的 MCP 注册表读取（#3772）。
- **配置发现**：从非仓库根目录的项目目录读取 `.mcp.json` 与 hooks（#4765）。

---

## 😤 开发者痛点

- **会话不稳定**：多项关联 Bug——恢复时的堆 OOM（#4664）、压缩崩溃（#4780）、响应中断后的连接 ID 失效（#4505）、FileWatch 循环失控（#4612）。长时间的会话变得脆弱。
- **桌面应用回退（v1.1.15）**：会话创建冲突（#4742、#4756）、粘性的通知角标（#4381）。
- **搜索 / 索引器可靠性**：原生 `tgrep` 与内置 grep 在真实仓库中出现卡顿或被 OOM kill 的问题（#3976、#4448）。
- **MCP 摩擦**：OAuth scope 问题（#4582）、redirect 处理失败（#4769）、恢复时静默取消进行中的连接（#4753）、发现机制问题（#4779）。
- **权限 / 审批模型**：Assisted-mode 权限在约 1 小时后失效，需要开启新会话（#4764）。
- **跨平台摩擦**：Windows 特有的会话行为、Git 环境变量传递（#4531）、MallocStackLogging 警告（#4614）、macOS 通过 SSH 时的剪贴板问题（#4551）。

> **小结**：CLI 正在快速迭代功能（Vim 模式、MCP OAuth 修复），但长会话稳定性与桌面/会话生命周期管理是当前最需要优先处理的痛点。

---
*本摘要基于 github.com/github/copilot-cli 于 2026-09-09 的活动生成。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-09

## 今日要点

OpenCode v1.18.30 发布，包含适用于 GPT-6 模型的新 Astra 系统提示以及若干服务商 SDK 更新。社区持续推进 V2 稳定性，Zen 服务商模型发现、选择性会话内容删除 API，以及针对 DeepSeek V4 token 上限与缓存行为的服务商专项修复值得关注。

## 发布

### v1.18.30
- **改进**：为 GPT-6 模型新增 Astra 系统提示。
- **错误修复**：保留 Bedrock DeepSeek 模型 ID（包括基于 ARN 的 ID），确保正确解析（感谢 @YeEmrick）；更新 Azure 与 OpenAI 服务商 SDK 以修复兼容性问题。
- [发布详情](https://github.com/anomalyco/opencode/releases/tag/v1.18.30)

## 热门问题

1. **[#6231](https://github.com/anomalyco/opencode/issues/6231)** — 自动发现 OpenAI 兼容服务商端点的模型（54 条评论，👍231）。这是点赞数最高的开放问题；用户希望从 LM Studio 和 Ollama 等本地服务商动态发现模型，而非手动配置。
2. **[#27786](https://github.com/anomalyco/opencode/issues/27786)** — 违反 XDG 基础目录规范：`node_modules` 被安装到 `~/.config` 而非 `~/.local/share`（10 条评论）。跨平台打包层面的问题。
3. **[#38550](https://github.com/anomalyco/opencode/issues/38550)** — 手动待办管理（9 条评论，👍7）。当智能体忘记更新或清理条目时，用户希望直接控制待办列表。
4. **[#7262](https://github.com/anomalyco/opencode/issues/7262)** — 会话标题停止自动生成（已关闭，9 条评论）。自一月初以来，会话一直停留在"New session - timestamp"。
5. **[#43805](https://github.com/anomalyco/opencode/issues/43805)** — `deepseek-v4-flash-free` 在 `/zen/v1/models` API 中存在，但未出现在 Zen 服务商下拉菜单中（8 条评论）。
6. **[#24298](https://github.com/anomalyco/opencode/issues/24298)** — 强制立即读取队列中的消息（steering）（已关闭，7 条评论，👍8）。灵感来自 Copilot 的待发送消息交互。
7. **[#48090](https://github.com/anomalyco/opencode/issues/48090)** — V2 中缺少 #48043 之后的选择性会话内容删除功能（5 条评论）。CodeNomad 0.20.0 采用了已被移除的 API，社区需要一个受支持的替代方案。
8. **[#39170](https://github.com/anomalyco/opencode/issues/39170)** — 桌面应用在 Windows 上无法渲染内联 LaTeX 数学公式（`$...$`）（4 条评论）。块级数学公式可正常显示，内联公式则显示原始源码。
9. **[#47902](https://github.com/anomalyco/opencode/issues/47902)** — V2 工具调用参数在连续的助手轮次间损坏（3 条评论）。一个 `patch` 参数包含了内部序列化标记；不符合 schema 的调用被执行。
10. **[#47487](https://github.com/anomalyco/opencode/issues/47487)** — 智能体通过 read 工具累积 51 张图片，触及服务商 50 张图片的上限，导致自身会话不可用（3 条评论）。暂无文档化的恢复路径。

## 关键 PR 进展

1. **[#47973](https://github.com/anomalyco/opencode/pull/47973)** — `fix(core): close websocket after provider error frame`（已关闭）。防止陈旧的 Responses WebSocket 通道在下次交换时引发 `delivery: ambiguous` 失败。
2. **[#48132](https://github.com/anomalyco/opencode/pull/48132)** — `fix(core): report malformed glob patterns`。将 ripgrep 的 `error parsing glob` 暴露出来，而不是静默地视为无匹配。
3. **[#38229](https://github.com/anomalyco/opencode/pull/38229)** — `fix(opencode): add DeepSeek system prompt`（已关闭）。DeepSeek 模型此前继承了一套相互冲突的通用指令。
4. **[#38232](https://github.com/anomalyco/opencode/pull/38232)** — `fix(provider): preserve DeepSeek V4 output limit`。阻止 `ProviderTransform.maxOutputTokens()` 将 DeepSeek V4 请求封顶为 32K（其声明为 384K）。
5. **[#48124](https://github.com/anomalyco/opencode/pull/48124)** — `feat(plugin): add select dialog shortcuts`。结构化的快捷键元数据以与会话选择器相同的底部布局渲染。
6. **[#48130](https://github.com/anomalyco/opencode/pull/48130)** — `docs(go): update GLM-5.3-Flash allowance`。结束 2× 促销活动，并更新 Go 文档/图表以反映每月 $60 的额度。
7. **[#48129](https://github.com/anomalyco/opencode/pull/48129)** — `feat(plugin): support opening background tabs`。为 `ctx.ui.tabs.open` 新增可选的 `focus` 标志，用于非打断式的标签页创建。
8. **[#47289](https://github.com/anomalyco/opencode/pull/47289)** — `feat(tui): add manual todo management dialog`（关闭 #38550）。新增 `/todo` 命令，用于循环切换状态、编辑标题、添加和删除待办。
9. **[#48123](https://github.com/anomalyco/opencode/pull/48123)** — `feat(console): route migrated Go inference`。将旧版 Go 密钥和原生服务账号密钥转发至 Zen 的常规推理路径，同时保留流式响应与关联 ID。
11. **[#47999](https://github.com/anomalyco/opencode/pull/47999)** — `fix(tui): keep saved tabs separate by server`。防止远程 TUI 会话覆盖本地终端选区。
12. **[#48125](https://github.com/anomalyco/opencode/pull/48125)** — `fix(app): restore session timeline scroll position after tab switches`。切回标签页时重置到底部，并恢复已保存的阅读位置。

## 功能需求趋势

- **模型发现与管理** — 呼声最高的方向是从 OpenAI 兼容的本地服务商自动发现模型（#6231），以及对 Zen 服务商模型（存在于 API 但未在 UI 中渲染）提供更好的选择器保真度（#43805、#48027）。
- **V2 会话 API** — 多项请求涉及选择性会话内容删除的受支持 API（#48090）、CLI `--server` 接受仅远程路径（#47665），以及 Code Mode 目录调用（#48108）。V2 的 API 频繁变动正在破坏 CodeNomad 等下游消费者。
- **UI 灵活性** — 持久的 V1/V2 布局切换（#38230）、手动待办管理（#38550）、恢复的标签页滚动位置（#48125），以及页内搜索（#48088）。
- **工具与执行体验** — 为技能/工具预批准的临时目录（#48100）、鼠标捕获下 TUI 的右键粘贴（#36456），以及长提示词下可靠执行审批（#48104）。
- **提示词缓存与路由透明度** — 多项请求揭示 OpenCode Go 不会为 `deepseek-v4-flash` 和 `qwen3.8-max` 缓存提示词（#41125、#48116），促使用户要求更清晰的逐模型缓存行为说明。

## 开发者痛点

- **跨平台打包缺口** — XDG 目录违规（#27786）与 Windows 后台服务器端口冲突（#47776）暴露出 macOS 之外的安装与运行时行为仍有粗糙之处。
- **服务商正确性** — DeepSeek V4 输出上限被截断（#38236）、Zen 模型缺失（#43805、#48027）、`muse-spark-1.2-contributor-free` 返回 HTTP 500（#44847），以及 Go 上提示词缓存缺失（#41125、#48116）等反复出现的报告，指向一类反复出现的服务商专项回归。
- **会话可靠性** — 图像累积导致的自损式会话不可用（#47487）、每次更新产生消息快照导致的事件表膨胀（#41175），以及静默的任务停止（#48127）让用户没有清晰的恢复路径。
- **V2 下智能体的正确性** — 跨轮次的工具参数损坏（#47902）、目录已注入但 MCP Code Mode 工具缺失（#48108），以及并发位置下的插件重载崩溃（#48121）表明 V2 的工具执行层仍需加固。
- **桌面端、TUI 与 Web 之间的 UX 不一致** — 内联 LaTeX 仅在桌面端可用（#39170）、缺少 `mod+f` 搜索（#48088），以及 GUI 偏好 V1 而非 V2（#48110）表明桌面/Web 端的功能进度落后于 TUI。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-09

## Today's Highlights
Today's activity centers on provider-integration friction and reliability hardening. The OpenCode Go `x-opencode-session` header requirement generated three closely related reports (closed in 24h: #9230, #9326, #9371), and Anthropic OAuth usage reporting shipped as a merged feature (#9345). On the reliability front, WebSocket retry behavior, Esc-during-stream cancellation, and abort-after-compaction races all received fixes or closures, signaling a deliberate tightening of long-running session semantics.

## Releases
*No new releases in the last 24 hours.*

## Hot Issues

- **#7444 — WebSocket retry only handles two error codes** ([link](https://github.com/earendil-works/pi/issues/7444))
  Closed. `openai-codex-responses` only retried on `previous_response_not_found` and `websocket_connection_limit_reached`; any other `response.failed` frame terminated the turn. 10 comments of community discussion on resilience contract.

- **#8823 — Esc during active streaming fails to cancel** ([link](https://github.com/earendil-works/pi/issues/8823))
  Closed. Abort is registered but the HTTP request keeps streaming until the provider finishes; the turn persists with `stopReason: "aborted"` only after

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-09

## 1. 今日要点

v0.23.2 已发布，其中包含一项后续修复——将子进程密集型 E2E 测试与 fork 压力隔离开，让发布流水线更加顺畅。社区关注点主要分布在长期跟踪的 **ink → OpenTUI 迁移** 议题（33 条评论）以及一组 **daemon/Web Shell 会话生命周期缺陷**——后者在会话刷新或回收时会丢失提示、完成指示与后台 shell 输出。架构方面，一项名为"mesh"的**持久共享线程智能体协作**功能以 PR 形式落地；文档团队也在为集成方整合 daemon 的 REST/SSE 接口面。

---

## 2. 发布

### v0.23.2 — 已发布
- **CI:** 将子进程密集型 E2E 与 fork 压力隔离 ([#11388](https://github.com/QwenLM/qwen-code/pull/11388)) by @yiliang114
- **Web Shell:** 改进分屏视图的会话导航 ([#11250](https://github.com/QwenLM/qwen-code/pull/11250)) by @wensha
- 未声明破坏性变更。

### v0.23.1 — 本周期早些时候发布
- **Breaking:** `refactor!: 弃用 @qwen-code/webui` ([#9812](https://github.com/QwenLM/qwen-code/pull/9812)) — 已弃用的 webui 已被移除；集成方必须迁移到 `qwen serve` / Web Shell。
- **Web Shell:** 可视化并管理动态资源。
- **Memory:** 受管内存可用性现在遵循 `memory.enableManagedAutoMemory` ([#6941](https://github.com/QwenLM/qwen-code/pull/6941)) — 修复了 #11022 的回归（被禁用的主机仍会收到 remember/dream 请求）。

### SDK TypeScript v0.1.9 / v0.1.10
- 分别打包 CLI 0.23.0 → 0.23.1；与 CLI 共享同一源代码重构。同样的内存设置改进一并带入。

---

## 3. 热门 Issue

1. **[#8662](https://github.com/QwenLM/qwen-code/issues/8662) — 将 TUI 渲染层从 ink 迁移到 OpenTUI** *(P3, OPEN, 33 comments)*
   讨论度最高的单一议题。当前实现依赖在 ink 7 + React 19 之上的约 1037 行补丁，加上一套自研的 Virtual Viewport，已造成闪烁、布局漂移以及难以原地修复的渲染限制。该跟踪议题是跟进迁移路线图的权威入口。

2. **[#11119](https://github.com/QwenLM/qwen-code/issues/11119) — `qwen serve` 后台 shell 输出在会话运行时回收时静默丢失** *(P1, OPEN, 10 comments)*
   长时间运行的后台 `run_shell_command` 持续产生输出，但在源回合结束后，唤醒通知与 stdout 再也无法到达 Web Shell。最坏的情况是会话被卡死；需要在 daemon 侧的运行时回收路径中修复。

3. **[#10530](https://github.com/QwenLM/qwen-code/issues/10530) — 0.22.3 中出现 `400 Failed to initialize samplers`** *(P2, CLOSED, 7 comments)*
   通过 llama-server 接入的 `Qwen 3.8 27b` 与 `Qwen 3.6 35b` 在 0.22.3 之后开始出现 `failed to parse grammar`；`gemma4-12b` 不受影响。与 #10435 互相印证。

4. **[#10435](https://github.com/QwenLM/qwen-code/issues/10435) — 本地 llama-server 上的同类 sampler 初始化回归** *(P2, CLOSED, 6 comments, 👍1)*
   独立确认语法处理在版本间出现回归。#10530 与 #10435 一并关闭，表明修复已在 v0.23.x 中随包发布。

5. **[#11328](https://github.com/QwenLM/qwen-code/issues/11328) — provider 配置推理能力的后续工作** *(P2, OPEN, blocked, 4 comments)*
   在 PR #10999 落地了 deepseek-v4-pro 声明式底座之后，部分有效的边界场景被推迟以控制在 1k 行 PR 上限内。释放出 provider 感知推理持续投入的信号。

6. **[#8887](https://github.com/QwenLM/qwen-code/issues/8887) — WebShell 计划的 SSE 重连显示惊吓性横幅** *(P3, CLOSED, 4 comments)*
   即使是计划内的重连，也会在每个会话上展示一个红色的"Connection lost / 重新连接"标签——一处 UX 缺陷，已在 Web Shell 中修复。

7. **[#11410](https://github.com/QwenLM/qwen-code/issues/11410) — Windows 11 更新后 v0.23.1 在本地模型上报 API Error 400** *(P1, CLOSED, 4 comments)*
   Windows 更新破坏了 LM Studio 集成；可能通过后续发布关闭。反映出本地 provider 兼容性的整体脆弱性。

8. **[#11465](https://github.com/QwenLM/qwen-code/issues/11465) — Web-shell 视觉呈现不确定（1.31% diff → 重跑 0%）** *(P3, OPEN, 4 comments)*
   `session-workflow-cockpit-light` 预览在相同 commit 下渲染出不确定的像素 diff。可能成为视觉基线的 CI 阻塞点。

9. **[#11358](https://github.com/QwenLM/qwen-code/issues/11358) — 支持从 `qwen serve` 托管自定义 Web Shell 分发** *(P3, OPEN, 4 comments)*
   集成方希望基于 daemon 部署自己的前端。一个明确的产品化信号：`qwen serve` 正在演化为一个平台，而不仅仅是 UI 宿主。

10. **[#11205](https://github.com/QwenLM/qwen-code/issues/11205) — filter 屏幕合入 main 时丢失了六处加固** *(P2, OPEN, 4 comments)*
    #10421 的 filter 工作原本面向一个更丰富的屏幕编写；#9742 在 `main` 上为同一功能落地了一个屏幕，该 PR 直接照搬采用，导致丢失了读取顺序、EACCES、U+FFFD、spawn-timeout、候选上限以及保留策略等加固。反映出合并策略与评审流程的问题。

Honorable mentions：[#11274](https://github.com/QwenLM/qwen-code/issues/11274)（将 Skill 管理与 ACP 子项解耦，多 PR 计划）、[#11359](https://github.com/QwenLM/qwen-code/issues/11359) + [#11427](https://github.com/QwenLM/qwen-code/issues/11427)（面向集成方的 daemon REST/SSE 文档）、[#11448](https://github.com/QwenLM/qwen-code/issues/11448)（`ask_user_question` 卡片在重新打开后丢失）。

---

## 4. 关键 PR 进展

1. **[#11468](https://github.com/QwenLM/qwen-code/pull/11468) — `fix(bridge)`: 在刷新会话加载时保留待处理的 permission/question** *(review/self-reported)*
   当客户端重新打开停在 `ask_user_question` 或 permission 提示的会话时，会重新弹出交互卡片，而不再只是回放已持久化的转录。直接关掉了 #11448 类缺陷。

2. **[#10906](https://github.com/QwenLM/qwen-code/pull/10906) — `feat(web-shell)`: 展示 shell 与 monitor 任务输出** *(autofix/takeover)*
   将 Monitor 的 stdout/stderr 与 Shell 捕获一起持久化，并对外暴露一个限定活跃会话所有者可用的 daemon 端点，用于提供已脱敏的尾部流。Web Shell 任务详情面板向前迈出一大步。

3. **[#11371](https://github.com/QwenLM/qwen-code/pull/11371) — `chore`: Playwright 版本对齐 + 收尾延后的 #11336 后续工作** *(review/self-reported)*
   将 Web Shell 的 `@playwright/test` 锁定到根目录版本，消除一处已知的"地雷"。原属 #11101"仅关键修复"第六轮规则下被搁置的工作。

4. **[#11472](https://github.com/QwenLM/qwen-code/pull/11472) — `fix(serve)`: 重启后恢复已配置的 channels** *(OPEN)*
   当 `qwen serve` 启动时未显式指定 channel，则恢复工作区配置的启动 channels；显式选择仍然优先。补齐了 channel 管理 UI 与 daemon 之间的 UX 缺口。

5. **[#11469](https://github.com/QwenLM/qwen-code/pull/11469) — `chore(release)`: v0.23.2** *(skip-changelog)*
   自动发布 PR——也就是刚刚合入的那一个。

6. **[#11206](https://github.com/QwenLM/qwen-code/pull/11206) — `feat(mesh)`: 持久共享线程智能体协作** *(OPEN)*
   工作区常驻的 Agent 身份，持有共享线程：可分配工作、运行中途插话、归属结果、取消、解除阻塞、标记评审。本周期最具架构野心的 PR。

7. **[#11463](https://github.com/QwenLM/qwen-code/pull/11463) — `feat(sessions)`: 在会话注册时记录 `kind`** *(OPEN)*
   注册表现在承载 `tui | headless | serve | external`。前三种非 TUI kind 预留给尚不存在的注册方——为未来的 channel/SDK 形态搭建脚手架。

8. **[#10347](https://github.com/QwenLM/qwen-code/pull/10347) — `feat(core)`: 自动重试瞬时网络错误（EOF）** *(review/self-reported, autofix/needs-human)*
   将 `400 network error ... EOF` 重新归类为可重试的传输错误，而非 fail-fast 的客户端错误。在无法使用 Ctrl+Y 的非交互 channel 中尤为关键。

9. **[#11163](https://github.com/QwenLM/qwen-code/pull/11163) — `feat(web-shell)`: 在工作区分支选择器中管理 git remotes** *(autofix/takeover)*
   在二次确认之后新增一个"Manage Remotes"面板——补齐侧边栏 git 能力的一处真实缺口。

10. **[#11238](https://github.com/QwenLM/qwen-code/pull/11238) — `feat(web-shell)`: 改进会话概览导航与详情** *(autofix/takeover)*
    会话现在在标题下展示工作区/分支/PR，并区分不同状态；新增状态过滤、分支/PR 搜索以及紧凑图标。直接回应"会话面板难以扫读"的反馈。

Honorable mentions：[#10938](https://github.com/QwenLM/qwen-code/pull/10938)（Session Workflow 可导航性 + DAG 清理）、[#11395](https://github.com/QwenLM/qwen-code/pull/11395)（在 ACP reap 后保留调用方持有的 mode）、[#11470](https://github.com/QwenLM/qwen-code/pull/11470)（在紧凑断点下隐藏侧边栏版本标签，关闭 #11453）、[#11458](https://github.com/QwenLM/qwen-code/pull/11458)（下线遗留的 Stop-hook Goal 路由）。

---

## 5. 热门讨论

_本摘要窗口未提供 GitHub Discussions 数据——本节省略。_

---

## 6. 功能请求趋势

从所有开放 issue 与 PR 中提炼：

- **Daemon-as-platform** — 最一致的需求簇。[#11358](https://github.com/QwenLM/qwen-code/issues/11358)（托管自定义 Web Shell）、[#11357](https://github.com/QwenLM/qwen-code/issues/11357)（配置驱动的品牌定制）、[#11359](https://github.com/QwenLM/qwen-code/issues/11359) + [#11427](https://github.com/QwenLM/qwen-code/issues/11427)（集成方 REST/SSE 文档）以及 [#

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*