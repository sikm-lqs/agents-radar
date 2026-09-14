# AI CLI 工具社区动态日报 2026-09-15

> 生成时间: 2026-09-14 23:30 UTC | 覆盖工具: 7 个

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

# 跨工具对比报告：AI CLI 生态系统 — 2026-09-15

## 1. 生态概览

AI CLI 工具领域已明显走出"编码助手"阶段，进入平台整合阶段：本周追踪的七款工具中，贯穿所有工具的共同主题是可扩展性框架（Claude Code 的 Mods、OpenCode 的扩展钩子、Qwen 的扩展商店）、安全策略引擎，以及长时程/多会话编排。Windows 已成为共享的质量战场——七款工具中有六款出现了 Windows 特有的缺陷，这是企业级采用明确无误的信号。两条与信任相关的暗流贯穿各社区：计费/配额透明度不足（Claude Code、Codex、Pi）以及会话/恢复完整性（几乎所有工具都有）。与此同时，原始能力已不再是差异化要素；耐久性、可观测性，以及与提供商无关的保真度才是。

## 2. 活跃度对比

| 工具 | Issues（24 小时） | PRs（24 小时） | 讨论（24 小时） | 发布状态 |
|---|---|---|---|---|
| **Claude Code** | 10 条热门；最热帖子 851 条评论 / 476 👍（#38335） | 5 条更新 | 被趋势提及；未报告数量 | v2.1.271 已发布（稳定版） |
| **Codex** | 15 条（10 条热门 + 5 条提及） | **50 条已合并**（机器人驱动） | 9 条（3 条想法、1 条综合、5 条展示） | 2 个 alpha 版（0.155.0-alpha.4 / -alpha.2.4） |
| **Gemini CLI** | 10 条热门 | 10 条 | 摘要中未报告 | 常规每夜构建（v0.61.0） |
| **Copilot CLI** | 新提交 21 条；重点关注 10 条 | 0（"无 PR 更新"） | 无数据 | 连续 2 个补丁版（v1.0.84-6/-7） |
| **OpenCode** | 10 条热门（约 50 条活跃条目中） | 10 条（约 50 条活跃条目中） | 摘要中未报告 | v1.18.31 缺陷修复版 |
| **Pi** | 10 条热门 | 10 条 | 1 条（展示） | 无 |
| **Qwen Code** | 10 条热门 | 10 条 | 摘要中未报告 | v0.23.4 + 每夜构建 + 2 个 CUA 驱动二进制（共 4 个） |

*注：没有摘要显示上游已禁用的 Issues/PRs；"未报告"反映该渠道在此期间缺少数据，并非确认无活动。Codex 的 50 次合并均来自 `copyberry[bot]`，表明这是自动化/内部流水线，而非社区贡献流。*

## 3. 共同功能方向

- **一流的可扩展性（插件/钩子/模组）** — Claude Code Mods 框架（#91870，104 👍；首批 `mods/diff` PR 已合并）；OpenCode 正在恢复 `permission.ask` 钩子（#42633），同时面临一波扩展 API 请求；Copilot CLI 市场注册缺口（#4556）；Qwen 扩展商店加固（#11883/#11831）；Codex 可配置的 Guardian 提示模板（#45516）。
- **Windows 平台质量** — Claude Code 在 KB5124008 后 Cowork/Plan9 损坏（#92984）以及 PowerShell 卡顿 154 秒（#94344）；Codex 前 15 队列中约一半问题与 Windows 相关（截图 #25178、lsass 泄漏 #33356、AppX #35347）；Qwen 扩展重命名时出现 `EPERM`（#11883）以及 NTFS 文件 ID 损坏（#11848）；Pi 存在孤立管道进程问题（#9129）；OpenCode 触发 Defender 误报（#49047）；Copilot 控制台窗口闪烁（#4549）。
- **会话持久化与恢复完整性** — Claude Code 转录损坏导致永久性 400 错误（#86198），以及 `--resume` 时 12.4 GB OOM（#79196）；Copilot 在 `/resume` 后连接 ID 陈旧（#4505）；Codex 在线程恢复时恢复模式（#45519）；Gemini 的 `/compress` 无法在恢复后保留（#21335）；OpenCode 的 v1.18.31 专门用于修复 ACP 会话状态丢失。Pi 的"对话中系统消息"PR（#9548）是最具架构性的回应：转录即真相之源（transcript-as-source-of-truth）。
- **用量/计费透明度与成本归因** — Claude Code #38335（仓库中获赞最多的 issue，被标记为无效）；Codex Pro 被以 5 倍而非 20 倍限流（#38157），远程使用被重复计费（#44719），以及一封社区公开信（#45211）；Pi 通过未规范化的 Bedrock `usage.input` 多收费（#8752）以及 1 小时缓存写入定价错误（#9457、#9210）。Codex #17827（182 👍 状态栏）和 OpenCode 的智能体群组迷你图（#49066）反映出对会话内成本 HUD 的需求。
- **远程、多会话、长时程工作流** — Codex 从 ChatGPT 应用进行远程控制是社区榜首创意（#9200，190 👍），外加 Daybreak 持久化工作；Claude Code 正在交付远程极速模式对等性；Qwen 正在构建规范化守护进程协议（#11867）和远程 Web Shell 连接（#11548）；OpenCode 用户要求恢复多项目标签工作流（#37077）。
- **沙箱作为策略引擎** — Gemini CLI 将 `--yolo` 转换为通配符策略（#29287）并审查策略目录权限（#29333/#29336）；Copilot 预授权失败关闭 vs. `--yolo` 冲突（#4844）和开发工具策略绕过（#4846）；Qwen shell 分隔符安全绕过（#11851）和容器化子智能体（#11711）；Codex 加固 Windows 沙箱身份（#45533/#45542）。
- **多模型/与提供商无关的保真度** — Copilot 触及工具数量上限（Grok 4.5）以及来自 Gemini Flash、Deepseek BYOK 的 schema 400 错误，诊断信息不透明（#4835/#4836/#4840）；OpenCode Gemini 可空数组拒绝（#48073）；Qwen 的元数据注入破坏非 Qwen 模型（#11590）；Pi 在各提供商间保留 `thoughtSignature`/`reasoning_content`（#9444/#8732）。

## 4. 差异化分析

| 工具 | 重心 | 独特押注 |
|---|---|---|
| Claude Code | 企业级产品打磨；可扩展性路线图 | Mods 插件框架；Cowork 桌面端；但 IDE（VS Code）集成落后于 CLI/TUI，计费信任是公开的伤疤 |
| Codex | 最高的工程产出 | App-server 架构、Guardian 自动审查、Daybreak 长时程目标、Computer Use；大量 Windows 沙箱投入 |
| Gemini CLI | 核心循环加固 | 策略目录安全审查、沙箱边界处理、AST 感知上下文工程研究（#22745） |
| Copilot CLI | GitHub 原生企业级 | 组织级智能体、托管市场、失败关闭策略姿态；多模型枢纽（Claude/Grok/Gemini/Deepseek）而非单一供应商 |
| OpenCode | 开放、与提供商无关 | Zen 网关广度、可观测性（W3C traceparent）、社区驱动路线图——目前正将精力投入 V2 UI 反弹 |
| Pi | 极简、架构严谨 | 转录即历史（#9548）、精确成本核算、启动性能；专家小众吸引力 |
| Qwen Code | 多宿主编排 | 守护进程协议规范、ACP 契约、容器化子智能体、CUA 驱动二进制；DashScope/供应商兼容重点 |

目标用户因此分化：Claude Code 与 Codex 面向专业/企业开发者（具备远程和策略功能）；Copilot CLI 利用 GitHub 企业渠道；OpenCode 与 Pi 服务于自托管、多提供商的高级用户；Gemini CLI 瞄准 Google Cloud 主流用户；Qwen Code 正在以强大的非西方供应商支持开辟跨宿主/守护进程细分市场。

## 5. 社区动量与成熟度

- **速度领跑者：Codex** — 每日 50 次合并（尽管是机器人自动化）、9 个活跃讨论、整个集合中获赞最多的创意（#9200，190 👍），以及双 alpha 轨道接近 0.155.0 冻结。
- **参与度领跑者：Claude Code** — 无与伦比的反应集中度（851 条评论的帖子；单个 issue 获得 476 👍），但仅有 5 条外部 PR 更新，证实了其产品主导、外部贡献低的模式。社区对计费的压力仍未得到解决，且在累积。
- **最响应式的开源治理：OpenCode** — 每天约 50 个活跃条目，维护者积极回应 UI 反弹（5+ 个 issue，合计 50+ 👍）；健康信号，但这种动荡表明路线图/社区存在错位风险。
- **有纪律的加固：Gemini CLI 与 Qwen Code** — 稳定的每夜/发布列车；Qwen 正在交付平台原语（CUA 驱动、容器后端、协议规范），而不仅仅是灭火。
- **最小但最深：Pi** — 数量少、信号强；核心贡献者（mitsuhiko）就基础转录架构发表见解。
- **交付快速、倾听不足：Copilot CLI** — 同日两个补丁，但零 PR 更新且无讨论数据；社区渠道活跃度是七款工具中最弱的。

成熟度判读：七款工具都在向稳定性/安全性工作收敛，而非头条级能力——这是经典的成熟信号。前沿已转向编排（插件、远程控制、长时程目标）。

## 6. 趋势信号

1. **Windows 是企业级采用的税。** 七款追踪工具中有六款记录了 Windows 特有的头部 issue（沙箱、Plan9、AppX、PowerShell、Defender、NTFS），任何面向企业级推广的团队都应将 Windows CI 视为一等公民投入，而非事后移植。
2. **计费透明度现在是信任护城河，而非支持工单。** 生态中两个最大的参与度帖子（Claude Code #38335、Codex #38157/#45211）都是关于配额/成本核算的。最先交付可审计的、每模型/每子智能体成本归因的厂商，将把不信任转化为忠诚度。
3. **转录正成为真相之源。** Pi 的 #9548 以及其他地方恢复/损坏 bug 的普遍存在，指向一个明确的架构方向：将系统提示变更、工具集变化和推理状态作为一等转录记录持久化，以实现可恢复性和缓存保留。
4. **权限提示正在让位于策略引擎。** Gemini 的策略目录审查、Copilot 的失败关闭姿态、Qwen 的容器隔离以及 Codex 的沙箱身份工作，都指向声明式、可组织管理策略作为企业级安全模型。
5. **可观测性是下一个差异化要素。** Token 消耗率 HUD（Codex #17827）、追踪上下文传播（OpenCode #49046）、每智能体成本仪表板（#49066）以及上下文用量遥测（Qwen #10015）反映出对智能体工作负载可观测性的需求，可比肩面向服务的 APM。
6. **多模型路由已成商品；提供商保真度成为基线要求。** Bug 群（schema 验证、缓存定价、推理内容保留）表明工具现在按跨提供商正确性而非模型接入来评判。
7. **远程/移动控制是下一个 UX 前沿。** Codex 排名第一的社区创意（190 👍）明确对标 Claude Code；预计无头守护进程 + 移动伴侣模式将在数个季度内成为标准竞争轴。

**给决策者的底线：** 对于企业级 Windows 环境，今天这七款中没有一款是无痛的——请为沙箱和平台变通方案预留预算。对于插件生态，Claude Code（Mods）和 OpenCode 是近期赌注。对于成本敏感的多提供商工作负载，Pi 和 OpenCode 提供最深的控制；对于托管的长时程编排，Codex 和 Claude Code 正在领先。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
*数据截至 2026-09-15 · 来源：github.com/anthropics/skills*

> **数据质量说明：** PR 列表显示所有 20 条记录的"Comments: undefined"和零互动数，因此下方 PR 排名依据 issue 交叉引用、更新时效和声明的影响得出。Issue 排名使用已核实的评论数。

---

## 1. 热门 Skills 排名（按社区关注度）

### 1. skill-creator 评估循环修复 — `run_eval.py` 0% 召回率 Bug
**PR [#1298](https://github.com/anthropics/skills/pull/1298)** · 状态：OPEN
修复评估框架，该框架一直静默地将每个 skill 描述报告为 `recall=0%`（在 [Issue #556](https://github.com/anthropics/skills/issues/556) 中已追踪到 10+ 次独立复现，12 条评论）。由于 `run_loop.py` 和 `improve_description.py` 都依赖该信号，整个描述优化循环目前实际上是在针对噪声进行优化。同时也修复了 Windows 流读取、触发检测和并行工作进程问题。
*为何高居榜首：* 它打破了 skill 创作本身的根基。

### 2. claude-api skill 准确性 — 弃用模型 ID 与 token 膨胀
**PR [#1607](https://github.com/anthropics/skills/pull/1607)** · 状态：OPEN · 相关：[Issue #1487](https://github.com/anthropics/skills/issues/1487)
在 `skills/claude-api/shared/models.md` 中将 `claude-opus-4-1`、`claude-sonnet-4-0`、`claude-opus-4-0` 和 `claude-3-haiku-20240307` 标记为已弃用。此外，Issue #1487（4 条评论）指出同一 skill 会激进地注入约 156k tokens，并在单次工具调用中耗尽上下文 —— 这对内置 skill 而言是关键的正确性 *且* 效率问题。

### 3. mcp-builder 兼容性 — `mcp>=2` 可流式 HTTP 客户端
**PR [#1742](https://github.com/anthropics/skills/pull/1742)** · 状态：OPEN · 修复 [#1668](https://github.com/anthropics/skills/issues/1668)
适配上游的重命名（`streamablehttp_client` → `streamable_http_client`）以及新的 `create_mcp_http_client` / `http_client` 请求头注入路径。如果没有此修复，每个使用 `mcp>=2.0.0` 的 mcp-builder 用户都会遇到 skill 损坏。
*关联 issue：* [#1390](https://github.com/anthropics/skills/issues/1390) — `evaluation.py` 在针对任何真实 MCP 服务器时评分为 0/N，因为 `TextContent` 不可 JSON 序列化（错误是被静默伪造的）。

### 4. mcp-builder 默认模型刷新
**PR [#1724](https://github.com/anthropics/skills/pull/1724)** · 状态：OPEN
将 `scripts/evaluation.py` 和 `reference/evaluation.md` 中的默认值从 `claude-3-7-sonnet-20250219` 提升至 `claude-sonnet-5`。常规但符合预期的更新。

### 5. 文档格式质量套件 — 排版、ODT、DOCX、PDF、UTF-8
一组互补的 PR，用于改进办公文档类 skills：
- **[#514](https://github.com/anthropics/skills/pull/514)** — `document-typography` skill（孤行/寡行/编号对齐）。长期挂起，2026 年 3 月提出。
- **[#486](https://github.com/anthropics/skills/pull/486)** — `odt` skill（创建/填充/读取 ODT 和 ODS）。
- **[#538](https://github.com/anthropics/skills/pull/538)** — PDF `SKILL.md` 大小写敏感的文件引用（8 处修复）。
- **[#541](https://github.com/anthropics/skills/pull/541)** — DOCX 修订追踪 `w:id` 与书签冲突（损坏 bug）。
- **[#1765](https://github.com/anthropics/skills/pull/1765)** — 在 DOCX/PPTX/XLSX 红线校验器中将 `git diff` 解码为 UTF-8。修复 [#1707](https://github.com/anthropics/skills/issues/1707)。

### 6. 多智能体编排 — Hivemind
**PR [#1628](https://github.com/anthropics/skills/pull/1628)** · 状态：OPEN
将机械性工作从 Claude Code 委派给无头 [opencode](https://opencode.ai) 工作进程（运行在免费模型上），同时让 Claude Code 担任规划者/评审者/合并者。与零成本扩展的广泛需求信号高度契合。

### 7. 创意流水线 — md2video-audio
**PR [#1703](https://github.com/anthropics/skills/pull/1703)** · 状态：OPEN
Markdown → Marp 幻灯片 → MP4，并合成配音。零成本、端到端的内容流水线。

### 8. 领域专用与元 skills
- **[#1615](https://github.com/anthropics/skills/pull/1615)** `scnet-hpc` — SCNet HPC 集群工作流（SSH/Slurm/加速器）。
- **[#525](https://github.com/anthropics/skills/pull/525)** `pyxel` — 通过 `pyxel-mcp` 进行复古/像素艺术 8-bit 游戏开发。
- **[#83](https://github.com/anthropics/skills/pull/83)** `skill-quality-analyzer` + `skill-security-analyzer` — 用于评分和加固其他 skills 的元 skill（自 2025 年 11 月起仍未合并）。
- **[#210](https://github.com/anthropics/skills/pull/210)** 改进 `frontend-design` 的清晰度与可操作性。
- **[#539](https://github.com/anthropics/skills/pull/539)** `quick_validate.py` YAML frontmatter 加固（未加引号的 `:` 截断问题）。
- **[#1627](https://github.com/anthropics/skills/pull/1627)** `buffer-api` — Buffer GraphQL 调度。
- **[#1595](https://github.com/anthropics/skills/pull/1595)** UIZZE 合作伙伴 skill 列表。

---

## 2. 社区需求趋势（基于 Issues）

| 主题 | 证据 | 方向 |
|---|---|---|
| **Skills 的分发与治理** | [#492 (43 评论)](https://github.com/anthropics/skills/issues/492) — 通过 `anthropic/` 命名空间滥用信任边界；[#228 (16)](https://github.com/anthropics/skills/issues/228) — 组织级共享；[#62 (10)](https://github.com/anthropics/skills/issues/62) — 重命名时 skill 消失 | 最强烈的单一需求。用户希望有一个官方认证渠道和管理员级共享机制。 |
| **可靠的评估基础设施** | [#556 (12)](https://github.com/anthropics/skills/issues/556) — 0% 触发；[#1390 (4)](https://github.com/anthropics/skills/issues/1390) — 0/N 评分；[#1487 (4)](https://github.com/anthropics/skills/issues/1487) — 156k token 注入 | 在 `skill-creator` 评估框架值得信赖之前，所有 skill 质量工作都是盲目猜测。 |
| **推理质量与安全模式** | [#1385 (4)](https://github.com/anthropics/skills/issues/1385) — 三重门控流水线；[#412 (6, 已关闭)](https://github.com/anthropics/skills/issues/412) — 智能体治理 skill；[#1175 (4, 已关闭)](https://github.com/anthropics/skills/issues/1175) — SharePoint 安全 | 需要那些约束和验证 Claude 行为、而不仅仅是执行操作的 skills。 |
| **记忆与压缩状态** | [#1329 (9)](https://github.com/anthropics/skills/issues/1329) — `compact-memory` 符号化表示法 | 长上下文智能体需要专属的压缩层。 |
| **多智能体 / 编排原语** | [#1385](https://github.com/anthropics/skills/issues/1385)、[#16 (4)](https://github.com/anthropics/skills/issues/16) "Skills as MCPs" | Skills 越来越希望能够 *委派* 给子智能体和外部 MCP。 |
| **平台集成缺口** | [#29 (4)](https://github.com/anthropics/skills/issues/29) — AWS Bedrock；[#189 (6)](https://github.com/anthropics/skills/issues/189) — 重复 skill 安装 | Skills 在 Claude Code 之外尚未成为一等公民。 |
| **打包与可复现性** | [##1362 (3)](https://github.com/anthropics/skills/issues/1362) — `web-artifacts-builder` 在 pnpm ≥10.1 上的问题 | 工具链漂移正在静默破坏 skill 包。 |

---

## 3. 高潜力待合并 Skills（活跃中，尚未合并）

这些 PR 都是近期提交、针对真实故障，最有可能率先落地：

1. **[#1298](https://github.com/anthropics/skills/pull/1298)** — `skill-creator` 评估循环修复。当前仓库中杠杆效应最高的修复。
2. **[#1742](https://github.com/anthropics/skills/pull/1742)** — mcp-builder `mcp>=2` 导入与自定义请求头。解除所有 mcp-builder 用户的阻塞。
3. **[#1765](https://github.com/anthropics/skills/pull/1765)** — UTF-8 红线 diff。范围小、目标明确，属于回归级修复。
4. **[#1724](https://github.com/anthropics/skills/pull/1724)** — 默认模型升级至 `claude-sonnet-5`。
5. **[#1607](https://github.com/anthropics/skills/pull/1607)** — claude-api 弃用模型清理。
6. **[#539](https://github.com/anthropics/skills/pull/539)** + **[#541](https://github.com/anthropics/skills/pull/541)** — DOCX/PDF/SKILL.md 加固（小型、低风险）。
7. **[#1703](https://github.com/anthropics/skills/pull/1703)** `md2video-audio` — 高曝光度的创意能力。
8. **[#1628](https://github.com/anthropics/skills/pull/1628)** `Hivemind` — 直接切入多智能体需求信号。
9. **[#1615](https://github.com/anthropics/skills/pull/1615)** `scnet-hpc` — 填补 HPC 用户的未满足需求。

**长尾但值得关注：** [#486](https://github.com/anthropics/skills/pull/486) ODT、[#525](https://github.com/anthropics/skills/pull/525) pyxel、[#1627](https://github.com/anthropics/skills/pull/1627) buffer-api —— 小众但内在逻辑自洽。

---

## 4. Skills 生态洞察

> **社区最为集中的需求是构建一个值得信赖的 Skills 基底 —— 可验证的作者身份与命名空间、可靠的评估框架、以及一流的发布/共享机制 —— 以便让快速增长的小众 skills 库（HPC、复古游戏、社交 API、文档格式）能够在企业规模下安全使用。**

---

# Claude Code 社区摘要 — 2026-09-15

## 今日要点
**v2.1.271 为远程会话推出 fast 模式**（云端和自托管 runner），实现了本地 `/fast` 与远程工作流的体验一致。社区也在围绕即将推出的 **"Mods" 扩展框架**（Issue #91870，170 条评论 / 104 👍）集结力量，该框架承诺提供函数钩子级别的插件定制能力——Anthropic 已承诺将在"数周内"交付。与此同时，长期未决的 **Max 套餐会话限额讨论帖**（#38335）评论数已突破 **851 条、476 👍**，表明这是一个尚未解决的计费/用量问题，也是追踪器上点赞最多的议题。

## 发布
**v2.1.271** ([release](https://github.com/anthropics/claude-code/releases/tag/v2.1.271))
- **远程会话中的 Fast 模式**：云端和自托管 runner 现在遵循主机的 `fast-mode` 设置或会话内 `/fast` 切换（受组织策略约束）。
- **`/config` 全屏下的鼠标支持**：滚动现可浏览设置面板——一个微小但久候多时的 TUI 人体工学改进。

## 热门议题

1. **[#38335](https://github.com/anthropics/claude-code/issues/38335) — 自 2026-03-23 起 Max 套餐会话限额异常快速耗尽**
   *851 条评论 · 476 👍 · OPEN（被标记为 invalid）*。整个仓库中讨论量最高的帖子。使用 Max/Pro 的用户反馈 CLI 用量下的会话预算远低于文档阈值。尽管评论和反应数量庞大，该议题仍被标记为 `invalid`——这是一个强烈的社区信号：Anthropic 的 CLI 配额计费遥测亟需公开审计。

2. **[#91870](https://github.com/anthropics/claude-code/issues/91870) — Mods：让 Claude 的可扩展性提升 10 倍**
   *170 条评论 · 104 👍*。当前呼声最高的增强提议。提议构建一等公民的插件/钩子系统。Anthropic 9 月 9 日的更新确认 **函数钩子已确定落地**，时间表是"以周计而非以天计"。这实际上定义了下一个面向高阶用户的重要扩展面。

3. **[#92984](https://github.com/anthropics/claude-code/issues/92984) — Cowork（Windows）：KB5124008 之后 Plan9 共享失效**
   *112 条评论 · 58 👍 · 接近数据丢失*。Windows Update KB5124008（26200.9445）破坏了 Cowork 中的所有 Plan9 驱动器共享；卸载该 KB 后恢复。影响企业 Windows 用户的高优先级平台兼容性回归。

4. **[#36146](https://github.com/anthropics/claude-code/issues/36146) — VS Code：第一条用户消息始终被固定**
   *29 条评论 · 43 👍 · 已开放 6 个月*。VS Code 扩展中长期存在的 UI 缺陷：聊天面板中的第一条用户消息无法滚动越过。点赞比（43/29）异常之高，表明开发者对 IDE 体验普遍不满。

5. **[#74715](https://github.com/anthropics/claude-code/issues/74715) — Chrome 扩展"始终允许"被持久化为 `duration:"once"`**
   *18 条评论 · 5 👍 · 有复现步骤*。已批准的站点权限被静默降级为一次性，用户必须重新批准每个浏览器操作。Chrome 扩展权限模型中的一个正确性 bug。

6. **[#93071](https://github.com/anthropics/claude-code/issues/93071) — Cowork Windows 10：`sandbox-helper: no Plan9 drive shares mounted`**
   *5 条评论 · 0 👍 · 影响沙箱*。#92984 在 Windows 10 22H2 上的对应问题。自 2026-09-08 起 `device_bash` 工具完全失效；重启/重装无效。

7. **[#86198](https://github.com/anthropics/claude-code/issues/86198) — `advisor` 进行中使用 `/effort` 会导致会话永久 400**
   *4 条评论 · 0 👍 · 数据完整性*。当服务端工具调用仍在进行时输入任何斜杠命令会破坏会话记录——`local_command` 记录被插入到未关闭的助手消息中，破坏服务端工具配对关系。附完整复现步骤。

8. **[#93646](https://github.com/anthropics/claude-code/issues/93646) — `--model sonnet` 解析为 Sonnet 4.5 而非 Sonnet 5**
   *2 条评论 · 0 👍 · API 一致性*。CLI 的简写模型解析与 v2.1.270+ 上的 `/model` 选择器不一致。Bedrock 用户立即遇到该问题。说明 Sonnet 5 发布时别名映射更新不够严谨。

9. **[#93046](https://github.com/anthropics/claude-code/issues/93046) — 用量上限警告显示的是父模型而非子代理**
   *2 条评论 · 0 👍 · 代理正确性*。当 `fable` 上的子代理耗尽预算时，提示横幅将*父*（Opus）模型报告为消耗方。用户无法从会话内警告可靠地归因于具体模型的花费。

10. **[#94344](https://github.com/anthropics/claude-code/issues/94344) — 桌面应用：每次 PowerShell 工具调用都要等待约 154 秒**
    *2 条评论 · 0 👍 · 性能*。Windows 桌面上 PowerShell 调用在执行前停滞约 2.5 分钟；同一会话中 Bash 立即运行。已排除对话框/权限/IPC 问题——指向宿主 shell 启动引导的回归。

## 关键 PR 进展

1. **[#94184](https://github.com/anthropics/claude-code/pull/94184) — `mods/diff`：固定表头，正文区域可滚动**
   *Closed · poteat*。停靠的 diff 面板现已与内置 `/diff` 面板逐帧对齐：固定表头、基线和 8 行文件列表；滚轮以 3 行/刻度滚动 hunks（文件列表溢出时为 1 文件/刻度）。值得关注的是，这是扩展路线图上首个具体的 `mods/` 交付物。

2. **[#93951](https://github.com/anthropics/claude-code/pull/93951) — `mods`：将测试迁至 mods 旁边**
   *Closed · poteat*。`diff`、`sec-default` 和 `telemetry` mods 的行为测试现已移至 `mods/<mod>/tests/` 下，可通过 `claude plugin test` 运行。表明稳定的插件测试框架正与 Mods 一起落地。

3. **[#87079](https://github.com/anthropics/claude-code/pull/87079) — `fix(security-guidance)`：使 `**` glob 匹配零层级路径**
   *Open · anishsamant*。目前 `security-patterns.json` 中使用 `**/*.ts` 的规则会静默地排除顶层文件，因为 `glob_match` 委托给 `fnmatch`，而裸 `*` 已可跨越 `/`。该 PR 使运行时行为与文档化的"** 匹配任意层级"语义一致——一个安静但实在的安全规则正确性修复。

4. **[#71627](https://github.com/anthropics/claude-code/pull/71627) — `docs(sandbox)`：说明提示中批准的主机为会话作用域**
   *Open · mahirhir*。在 `examples/settings/README.md` 中新增一条说明：沙箱提示中批准的网络主机在恢复时丢失。为沙箱网络策略的一项非显然行为变更补充文档。

5. **[#83890](https://github.com/anthropics/claude-code/pull/83890) — 创建 pylint.yml**
   *Closed · KrypticKode007*。CI lint 工作流新增；未合并即关闭——可能已被替代或因偏好内部配置而驳回。

*（注：过去 24 小时仅有 5 个 PR 更新，已全部列出。）*

## 功能请求趋势

纵观 Issues 和 Discussions，三个方向占据主导：

- **一等公民的插件 / Mods 生态**——毫无争议的第一名。[#91870](https://github.com/anthropics/claude-code/issues/91870) 是焦点；子主题中请求可挂钩的生命周期事件、作用域权限和插件市场。
- **"Discussion" / 只读会话模式**——在 [#85848](https://github.com/anthropics/claude-code/issues/85848) 和 [#91301](https://github.com/anthropics/claude-code/issues/91301) 中被独立提出。定位：一种介于 Chat 和 Plan 之间的模式，Claude 可读取、搜索和解释，但不能编辑甚至不能*提议*计划——适用于代码审查和入职上手。
- **按模型 / 按子代理归因**——模型限额、成本跟踪和用量警告应归属于实际消耗方模型，而非父模型。[#93046](https://github.com/anthropics/claude-code/issues/93046) 和 [#76484](https://github.com/anthropics/claude-code/issues/76484)（已关闭）表明用户已厌倦不透明、归因到父模型的遥测。

次级信号：桌面应用改进远程/多会话 UX（多面板、持久化标签组），以及 Windows 沙箱/Plan9 加固。

## 开发者痛点

- **Max 套餐的计费与配额透明度**——[#38335](https://github.com/anthropics/claude-code/issues/38335) 反映出围绕 CLI 会话预算如何计算的深层、未解决的不信任。任何此处的改进都是信任杠杆。
- **Windows 平台回归正在聚集**——三个热门议题（#92984、#93071、#94344、#93482）涉及 Windows 上的 Cowork/Plan9/PowerShell。PowerShell 存在一个可追溯至 #57960 的已知启动引导问题，至今仍未关闭。
- **VS Code 扩展 UX 债务**——[#36146](https://github.com/anthropics/claude-code/issues/36146)（消息被固定）、[#72707](https://github.com/anthropics/claude-code/issues/72707)（提示无法折叠）、[#62804](https://github.com/anthropics/claude-code/issues/62804)（内联与代码块渲染）。IDE 集成落后于 CLI/TUI。
- **会话记录中的静默状态损坏**——[#86198](https://github.com/anthropics/claude-code/issues/86198) 和 [#92509](https://github.com/anthropics/claude-code/issues/92509) 表明，在服务端工具进行中交错本地命令会将会话永久损坏为 400。开发者希望获得可恢复性保证。
- **无头 `--resume` 的内存与恢复回归**——[#79196](https://github.com/anthropics/claude-code/issues/79196) 记录了在重建会话记录时的 12.4 GB OOM；[#85983](https://github.com/anthropics/claude-code/issues/85983) 表明 `max_tokens` 恢复会使缓存失效并丢弃思考输出。二者都削弱了高阶用户依赖的无头/CI 工作流。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区简报 — 2026-09-15

## 今日要点

- 一夜之间发布了 **0.155.0** 的两个 alpha 构建（`rust-v0.155.0-alpha.4` 和 `rust-v0.155.0-alpha.2.4`），表明团队正逼近下一个 CLI 版本的功能冻结点。
- 获赞最多的开放 issue 仍然是 **#17827（可自定义状态栏，182 👍）**，而讨论最热烈的帖子是 **#25178（Windows Computer Use 截图失败，58 条评论）**——Windows 平台质量再次成为 issue、PR 和讨论中的主导话题。
- 一波基础设施工作（50 个已关闭的 PR，大多出自 `copyberry[bot]`）整合了 Windows 沙箱服务、Guardian 审查器生命周期以及 app-server 的协作/Daybreak 状态机。

## 版本发布

- [`rust-v0.155.0-alpha.4`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.4) — 最新 alpha 版
- [`rust-v0.155.0-alpha.2.4`](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.2.4) — alpha.2 线上的 backport 刷新版

两者均切自 `rust-v0.155.x` 系列；数据中未提供已发布的 changelog，因此可将它们视作常规的预发布构建。

## 热门 Issue

1. **[#25178 — Windows Computer Use 在 Win10 22H2 上截图失败](https://github.com/openai/codex/issues/25178)** —— `SetIsBorderRequired` 在执行任何捕获之前就返回 `0x80004002`，导致 `get_window_state` 失效。58 条评论 / 25 👍。新 Computer Use 功能在平台层面的头号阻塞项。
2. **[#17827 — 可自定义状态栏](https://github.com/openai/codex/issues/17827)** —— 45 条评论 / 182 👍，获赞最高的开放 issue。希望在 TUI 中提供 Claude Code 风格的状态脚本（token 用量、速率限制、模型、git 分支）。
3. **[#40060 — Windows 上 `Start-Process` + URL 触发 execpolicy 误报](https://github.com/openai/codex/issues/40060)** —— 0.146–0.149+ 版本的分类器会误判混合的 PowerShell 命令。17 条评论。已附具体复现用例；影响安全 UX。
4. **[#25826 — 最大化的 Codex 窗口溢出跨越多块显示器](https://github.com/openai/codex/issues/25826)** —— 16 条评论 / 18 👍。Windows 多显示器 UX 回归问题。
5. **[#35347 — Codex AppX 卡在“Modified, NeedsRemediation”状态](https://github.com/openai/codex/issues/35347)** —— 15 条评论。Win11 25H2 上走 Microsoft Store 的安装路径；安装流程始终到不了 UAC 环节。
6. **[#33356 — Windows 沙箱执行中的 `lsass` 句柄泄漏](https://github.com/openai/codex/issues/33356)** —— 13 条评论。每条命令泄漏 3–5 个句柄，长会话下会造成操作系统层面的劣化。高危的性能/正确性 bug。
7. **[#17401 — 用于可组合 `AGENTS.md` 的 `@include` 指令](https://github.com/openai/codex/issues/17401)** —— 12 条评论 / 21 👍。可让仓库把上下文拆分为可复用的模块化文件；与长程（long-horizon）工作流高度契合。
8. **[#28361 — Windows 上 `codex mcp-server` / `app-server` 子进程永远不被回收](https://github.com/openai/codex/issues/28361)** —— 11 条评论。由 Claude Code 托管时，进程会随时间累积泄漏至“数百个”。
9. **[#30271 — 合法逆向工程被误报“Cyber Abuse”](https://github.com/openai/codex/issues/30271)** —— 10 条评论。针对已验证用户的策略/安全误报；阻断了合法工作流。
10. **[#38157 — Pro（20x）账户被按 5x 限速](https://github.com/openai/codex/issues/38157)** —— 10 条评论 / 5 👍。付费用户遭遇套餐/容量不匹配。

**其他值得一提：**[#42739（Windows 更新后侧边栏项目消失）](https://github.com/openai/codex/issues/42739)、[#45444（回归：达到用量上限时任务中途被中止）](https://github.com/openai/codex/issues/45444)、[#36973（多智能体提示词包含相互冲突的委派指引）](https://github.com/openai/codex/issues/36973)、[#45003（Windows 安装在 UAC 之前失败）](https://github.com/openai/codex/issues/45003)、[#45068（`/copy` 在远程 tmux 中写入宿主机剪贴板 —— 已关闭）](https://github.com/openai/codex/issues/45068)。

## 重点 PR 进展

> 本周期内关闭的全部 50 个 PR 均出自 `copyberry[bot]`，且目前已全部合并。

1. **[#45543 — 重构图像内容以使用共享的 `ImageReference`](https://github.com/openai/codex/pull/45543)** —— 将 `image_url` 的传输格式扁平化为 `ContentItem` 与 `FunctionCallOutputContentItem` 共用的单一类型；并重新生成 app-server 的 JSON schema。图像处理的基础性清理。
2. **[#45542 — 为 Windows 沙箱账户提供服务管理的包注册](https://github.com/openai/codex/pull/45542)** —— 新增显式的 `registered_core` 预配模式，依据服务的包系列（package family）对调用方进行认证。
3. **[#45537 — 将 Guardian 审查器生命周期移入扩展](https://github.com/openai/codex/pull/45537)** —— 确保 Guardian 审查随其父级干净地终止，速率限制重试这一边界情况也已覆盖。
4. **[#45534 — 在 Linux 托管沙箱中遵循显式的 Unix socket 授权](https://github.com/openai/codex/pull/45534)** —— 修复了 `dangerously_allow_all_unix_sockets` 在独立 socket 上被忽略的回归问题。
5. **[#45533 — 加固并共享 Windows 沙箱身份辅助函数](https://github.com/openai/codex/pull/45533)** —— 限制 token 查询的大小、校验 SID 指针/修订号，并将查找路径统一收拢到 `codex_windows_sandbox`。
6. **[#45529 — 在 `account/read` 中暴露所选工作区的路由信息](https://github.com/openai/codex/pull/45529)** —— 为 app-server 客户端新增实验性的 `account/read.workspaceRouting`（工作区 ID、origin、`us` / `us_cr` / `NO_CONSTRAINT` 覆盖值）。
7. **[#45524 — 在 exec server 中启用 MXC TTY 启动与托管网络](https://github.com/openai/codex/pull/45524)** —— 上报 `windows_mxc`，允许在没有 shared-ingress 限制性 SID 的情况下启动 MXC TTY。
8. **[#45519 — 恢复线程时还原协作模式](https://github.com/openai/codex/pull/45519)** —— bug 修复：恢复的线程不再丢失已保存的 Plan 模式与开发者指令。
9. **[#45518 — 为内联父线程通过 ThreadManager 路由 Guardian 审查器](https://github.com/openai/codex/pull/45518)** —— 捕获父级的身份/认证/共享信息，使内联委派无需查询注册表即可派生审查器。
10. **[#45516 — 允许配置 Guardian 提示词模板](https://github.com/openai/codex/pull/45516)** —— 在 `config.toml` 中新增 `auto_review.experimental_policy_template`，该覆盖配置优先于模型目录模板。

**其他值得关注的合并：**[#45513（`thread/start` 中的 `daybreakEnabled`）](https://github.com/openai/codex/pull/45513)、[#45509（通过 `Arc<ToolSpec>` 共享 MCP 工具规格）](https://github.com/openai/codex/pull/45509)、[#45506（引导式用户输入的后台持久化）](https://github.com/openai/codex/pull/45506)、[#45521（连接池中 Guardian 审查器的启动回调）](https://github.com/openai/codex/pull/45521)、[#45528（优先压缩较大的 Windows 构建产物）](https://github.com/openai/codex/pull/45528)。

## 热门讨论

### 创意
- **[#9200 — 从 ChatGPT 应用远程控制 Codex](https://github.com/openai/codex/discussions/9200)** —— 47 条评论 / 190 👍。全板块获赞最多的创意：无头守护进程模式加上真正的移动端 UI，取代目前 Tailscale + SSH 的临时方案。
- **[#14595 — 远程控制：啥时候？](https://github.com/openai/codex/discussions/14595)** —— 6 条评论 / 18 👍。请求给出路线图信号；并把 Claude Code 的远程控制视为需要跨越的标杆。
- **[#13287 — 长程、多会话开发的使用场景](https://github.com/openai/codex/discussions/13287)** —— 12 条评论 / 2 👍。与 issue #13241 互为姊妹篇；作者给出了具体方案，并寻求更广泛的验证。

### 综合讨论
- **[#45211 — 重新开放 Pro 20X 访问、解决韩语质量问题、澄清重置政策](https://github.com/openai/codex/discussions/45211)** —— 社区致 OpenAI 管理层的公开信，内容涉及套餐可用性与特定语言区域的质量回归。

### 展示与分享
- **[#45392 — 读取 Codex rollout 文件：心得与变通方案](https://github.com/openai/codex/discussions/45392)** —— **Fishbowl**（一个面向编码智能体会话的本地只读查看器）的作者总结了解析 `~/.codex/sessions/.../rollout-*.jsonl` 时遇到的坑。
- **[#45486 — UI Design Agent Kit](https://github.com/openai/codex/discussions/45486)** —— 一个强制执行“调研 → 计划 → 设计契约 → 浏览器验证”UI 循环的 Skill。共 11 个演示，其中 2 个为可玩的 3D。
- **[#45474 — CoCo（Codex 协调器）现在会 FART 了](https://github.com/openai/codex/discussions/45474)** —— 跨终端、跨仓库并行运行 Codex 智能体的本地 CLI + MCP 接口，每个智能体拥有自己独立的 Git worktree。
- **[#45382 — codex-sdlc](https://github.com/openai/codex/discussions/45382)** —— 开源的插件/仓库框架，引导功能需求走完“需求 → 实现 → 独立 QC”的全流程。
- **[#44618 — Wayfinder：Codex 工作的可视化航程图](https://github.com/openai/codex/discussions/44618)** —— 本地优先的桌面应用，将会话历史转化为可导航的时间线。
- **[#45329 — SCOUT：为 Codex 打造的自定义宠物](https://github.com/openai/codex/discussions/45329)** —— 以比利时马里努阿犬为主题的自定义宠物，拥有 9 种动画工作状态和 16 个视线方向。

## 功能需求趋势

- **更丰富的 TUI/HUD 交互体验** —— 可自定义状态栏（#17827）、token/配额消耗速率的“速度表”（#45427），以及更清晰的“模型到底在干什么”指示器。
- **长程、多会话工作流** —— 通过 `@include` 实现可组合的 `AGENTS.md`（#17401）、长程/多会话使用场景（#13287、#13241），以及 Daybreak/协作持久化的改进（#45513、#45519）。
- **远程与移动控制** —— 多个高热度讨论帖（#9200、#14595、#30417）都希望有一流的远程/移动控制能力，另有一些帖子在为现有功能报 bug（例如远程场景下用量重复计算 #44719）。
- **图像生成透明度** —— 公开实际生效的图像模型，并为内置 `image_gen` 提供模型选择器（#43965）。
- **套餐与订阅透明度** —— Pro 20X 的可用性、容量报告和速率限制 UX 是反复出现的痛点（#38157、#45211、#45444、#44909）。
- **模块化智能体设计** —— 希望子智能体委派更可控、提示词契约更清晰（#36973，Guardian 提示词模板覆盖 #45516）。

## 开发者痛点

- **Windows 平台回归问题主导了整个队列。** 在最活跃的前 15 个 issue 中，约有一半是 Windows 特有的：安装失败（#45003、#35347）、AppX/MSIX 更新问题（#25770）、多显示器布局（#25826）、RTL 界面（#41624），以及久拖不决的自动滚动/视口 bug（#45479）。
- **Windows 沙箱既有正确性 bug，也有性能 bug。** lsass 句柄泄漏（#33356）、MCP/app-server 进程泄漏（#28361）、execpolicy 误报（#40060）以及 Computer Use 截图失败（#25178）都指向同一个主题：Windows 的沙箱/身份这一层十分脆弱。
- **用量核算混乱且不一致。** 套餐档位显示 5x 而非 20x（#38157）、Windows→Linux 远程场景下用量重复计算（#44719）、长回合在触及限额时被中止而非正常收尾（#45444），以及据估计有 3,808 个会话浪费在“虚假”目标延续上（#44909）。
- **TUI / 终端摩擦。** 在由 SSH 启动的 tmux 中运行时，`/copy` 会写入宿主机剪贴板（#45068）；状态栏自定义功能尽管呼声很高却依然缺失（#17827）。
- **安全/策略误报伤害真实工作流。** 合法逆向工程触发 Cyber Abuse（#30271）、Daybreak 误报令进行中的目标陷入停顿（#44848）——两者本质上都是披着策略外衣的正确性问题。
- **App-server 状态管理存在明显 bug。** 排队的后续追问莫名消失（#45019）、“Waiting for worktree setup…”卡死状态（#40253），以及 Windows 更新后项目从侧边栏消失（#42739），都指向脆弱的客户端/服务器同步机制。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区动态周报 — 2026-09-15

## 今日要点
过去 24 小时的工作重点集中在 agent loop、沙箱机制以及策略目录安全性方面的加固。一个夜间构建版本（`v0.61.0-nightly.20260914`）与一批 `fix(core)` 和 `fix(a2a-server)` PR 同步发布，修复了 React StrictMode 纯度违规、沙箱扩展递归、MCP OAuth issuer 校验以及策略目录写权限审查等问题。在 Issue 端，子 agent 生命周期类缺陷（MAX_TURNS 误报、通用型 agent 挂起、Wayland 上浏览器子 agent 失败）依然是社区反馈最集中的痛点。

## 发布版本
- **v0.61.0-nightly.20260914.g9c1b0a610** — 常规自动化夜间构建。与上一夜版的完整 diff 仅是一次由发布机器人生成的提交号递增（[更新日志](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260913.g9c1b0a610...v0.61.0-nightly.20260914.g9c1b0a610)）。

## 热门 Issue
1. **#22323 — MAX_TURNS 后子 agent 恢复被上报为 GOAL 成功（p1，bug，13 条评论）** — `codebase_investigator` 子 agent 在尚未做任何分析就触达轮次上限时，仍会静默地记录 `status: "success"` 与 `Termination Reason: "GOAL"`，掩盖了真实的执行中断。([链接](https://github.com/google-gemini/gemini-cli/issues/22323))
2. **#21409 — 通用型 agent 挂起（p1，bug，8 条评论，8 👍）** — 即便是创建文件夹这类琐碎任务，`gemini-cli` 在转交给通用型子 agent 后也会无限挂起；临时解决办法是显式禁止子 agent 委托。高点赞数表明该问题影响面较广。([链接](https://github.com/google-gemini/gemini-cli/issues/21409))
3. **#19873 — 零依赖 OS 沙箱与执行后意图路由（p2，enhancement，9 条评论）** — 提出战略方向：通过操作系统级沙箱以及执行后意图路由，使 Gemini CLI 与 Gemini 3 原生的 bash 偏好对齐，而非简单限制工具集合。([链接](https://github.com/google-gemini/gemini-cli/issues/19873))
4. **#22745 — 评估 AST 感知文件读取、搜索与映射的影响（p2，feature，7 条评论）** — EPIC 级追踪：是否可用 AST 感知的工具（精确方法读取、可导航的代码图）来降低相对当前全文件洪流式读取所浪费的 token 和轮次。([链接](https://github.com/google-gemini/gemini-cli/issues/22745))
5. **#21968 — Gemini 对技能和子 agent 的调用不够充分（p2，bug，6 条评论）** — 即便已经清晰定义了自定义技能（例如 `gradle`、`git`），模型除非被显式要求，否则不会自主调用它们。这属于行为层面而非工具层面的差距。([链接](https://github.com/google-gemini/gemini-cli/issues/21968))
6. **#25166 — Shell 命令执行完成后卡在"Waiting input"（p1，bug，3 👍）** — 在简单的 CLI 命令执行完成后，CLI 会一直挂起，命令状态仍标记为活动且显示"Awaiting user input"。该问题影响非交互式命令，疑似 stdin/管道处理回退所致。([链接](https://github.com/google-gemini/gemini-cli/issues/25166))
7. **#26525 — 为 Auto Memory 增加确定性脱敏并减少其日志输出（p2，security bug，5 条评论）** — Auto Memory 目前依赖模型在提取 prompt 中自行脱敏，这意味着敏感内容在脱敏发生前就已进入模型上下文。([链接](https://github.com/google-gemini/gemini-cli/issues/26525))
8. **#21983 — 浏览器子 agent 在 Wayland 上失败（p1，bug，4 条评论）** — 在 Wayland 会话下，浏览器 Agent 会立即以 `Termination Reason: GOAL` 终止；在常见 Linux 桌面环境下均可复现。([链接](https://github.com/google-gemini/gemini-cli/issues/21983))
9. **#24246 — 可用工具超过 128 个时出现 400 错误（p2，bug，3 条评论）** — 当工具注册量超过模型的工具 schema 上限时，请求会直接返回 400；agent 应当自行裁剪其工具范围。([链接](https://github.com/google-gemini/gemini-cli/issues/24246))
10. **#22672 — Agent 应阻止/抑制破坏性行为（p2，customer issue）** — 在存在更安全替代方案时，模型偶尔仍会回退到 `git reset --force` 或破坏性的数据库命令；需要在 prompt 与策略层面增加防护栏。([链接](https://github.com/google-gemini/gemini-cli/issues/22672))

## 关键 PR 进展
1. **#29333 — fix(core): 审查约定路径下策略目录的权限** — 扩展 `isDirectorySecure` 的检查范围，使其覆盖 user 和 workspace 层级的策略目录，而非仅因 CLI 会到这些位置查找就默认信任它们。([PR](https://github.com/google-gemini/gemini-cli/pull/29333))
2. **#29336 — fix(core): 防止非系统策略目录被未授权写入（#29311）** — 将安全检查移出仅系统层级的分支，并为 POSIX 和 Windows 上的 default/user/workspace 目录增加 `allowUserOwnership` 显式开关。([PR](https://github.com/google-gemini/gemini-cli/pull/29336))
3. **#29332 — fix(core): 限制单次调用扩展沙箱的频率** — 修复一处致命的 OOM 循环：当某工具每轮都返回 `sandbox_expansion_required` 时，会在没有轮次计数保护的情况下递归进入 `_execute`。([PR](https://github.com/google-gemini/gemini-cli/pull/29332))
4. **#29335 — fix(core): 在对象展开时保留 AgentLoopContext 属性（p1）** — 用显式字段替换 `Config` 上脆弱的原型 getter，确保 `config`、`promptId`、`toolRegistry`、`messageBus`、`geminiClient`、`sandboxManager`、`promptRegistry`、`resourceRegistry` 在展开操作后仍然存活。([PR](https://github.com/google-gemini/gemini-cli/pull/29335))
5. **#29328 — fix(a2a-server): 遵循 LOG_LEVEL 并避免凭据泄露到日志（p1，security）** — A2A 服务端此前在 `process.env` 中允许 `LOG_LEVEL`，但又硬编码 `level: 'info'`；本 PR 还会在日志输出中脱敏凭据。([PR](https://github.com/google-gemini/gemini-cli/pull/29328))
6. **#29330 — fix(cli): 在 logger 响应前保留已键入的输入，并只读取一次** — 修复一处 React StrictMode 纯度违规：`setPastSessionMessages` 此前在 `setCurrentSessionMessages` 的 updater 内部被调用；一并处理了相关的 stdin 竞态。([PR](https://github.com/google-gemini/gemini-cli/pull/29330))
7. **#29329 — fix(cli): 在截断后暂停 stdin，并在放弃时给出提示** — 不再调用 `process.stdin.destroy()`（这会永久阻断后续读取器），改为暂停 stdin，并在输入被丢弃时向用户给出可见提示。([PR](https://github.com/google-gemini/gemini-cli/pull/29329))
8. **#29327 — fix(sdk): 遵循 AgentShellOptions 的 env 与 timeoutSeconds** — `SdkAgentShell.exec` 此前忽略 `env` 和 `timeoutSeconds`，导致 `exec('sleep 30', { timeoutSeconds: 1 })` 实际仍会等满 30 秒，不返回的命令则会永久挂起。([PR](https://github.com/google-gemini/gemini-cli/pull/29327))
9. **#29287 — feat(policy): 将 --yolo 映射为 allowedTools 通配符策略** — 完全移除 `ApprovalMode.YOLO` 这一特殊状态，改用普通的通配符策略 `allowedTools: ["*"]` 来表达，顺带关闭 #11303。([PR](https://github.com/google-gemini/gemini-cli/pull/29287))
10. **#29117 — fix(core): 在 MCP OAuth 中强制 RFC 9207 issuer 标识** — 为 MCP OAuth 响应增加可选的 `iss` 参数并校验响应来源一致性，避免 MCP OAuth 流程中出现意外的 token 路由。([PR](https://github.com/google-gemini/gemini-cli/pull/29117))

## 功能请求趋势
- **AST 感知代码导航。** 本周最具共识的设计方向，由 EPIC #22745 牵头，叠加跟进 #22746 和 #19561，主张使用基于 AST 的精确切片（`grep → AST slice → symbol scope`）来替代每轮消耗 15k+ token 的整文件读取。
- **沙箱与意图路由重构。** #19873 提出操作系统级零依赖沙箱加上执行后意图路由，使 CLI 与 Gemini 3 的原生 bash 训练对齐，暗示团队正在重新审视模型应看到的工具面。
- **记忆系统加固。** 一组协同推进的讨论（#26516、#26522、#26523、#26525）要求确定性脱敏、无效 patch 的隔离队列，以及 Auto Memory 的有界重试语义——其潜台词是希望把记忆视作对安全敏感的子系统，而不是一个自由形式的提取流水线。
- **子 agent 可观测性与生命周期清晰化。** 通过 `/chat share` 共享轨迹（#22598）、在 `/bug` 报告中附带子 agent 上下文（#21763），以及准确的终止语义（#22323），共同推动子 agent 行为变得可审查、可调试。
- **浏览器 agent 的鲁棒性。** 锁恢复（#22232）、Wayland 支持（#21983）、以及 `settings.json` 覆盖合规（#22267）共同勾勒出一份"浏览器 agent 必须能在无人值守下工作"的愿望清单。
- **持久化、基于文件的任务追踪。** 用磁盘上的 CRUD 取代 `WriteToDo`（#18836）是反复出现的诉求，驱动力来自上下文腐化与内存式 todo 丢失的问题。
- **对 CLI 自身的自知能力。** #21432 希望 agent 能准确掌握自身的 flags、快捷键与命令语法，从而能扮演一个自我指南的角色。

## 开发者痛点
- **子 agent 的可靠性与可观测性。** 单一最突出的主题——通用型 agent 挂起（#21409）、Wayland 上浏览器失败（#21983）、MAX_TURNS 被误报为 GOAL（#22323）、`/bug` 缺少子 agent 上下文（#21763）以及技能/子 agent 利用率不足（#21968）——合力描绘出一幅子 agent 过于脆弱、无法放心交给其独立运行的画像。
- **工具注册规模。** 在工具数突破约 128 时遭遇 400 错误（#24246）打乱了任何会拉入大量 MCP 服务器或本地技能包的工作流；用户希望工具能自动裁剪。
- **Stdin / Shell 生命周期。** "Waiting input" 挂起（#25166）叠加最近的 stdin 截断修复（#29329、#29330）表明存在一类 bug：CLI 在进程结束后仍将其视作等待输入，尤其是在调用 `process.stdin.destroy()` 之后。
- **Auto Memory 的语义。** 低信息量会话被无限重试（#26522）、无效 patch 被静默丢弃（#26523）、密钥仅在 prompt 中脱敏（#26525）——这些都让 Auto Memory 看起来像一个契约不够清晰的"漏"抽象。
- **沙箱扩展缺乏上限。** #29332 中描述的"工具每次尝试都触发 `sandbox_expansion_required` 并最终拖垮进程"的情形，凸显出安全关键路径上缺少轮次计数器会如何升级为 OOM 崩溃。
- **策略目录的信任问题。** #29333/#29336 证实 user 与 workspace 层级的策略目录此前仅凭路径就被信任，构成潜在的供应链风险，目前正在被修复。
- **会话持久化缺口。** `/compress` 在会话恢复后无法存活（#21335）以及 WriteToDo 完全停留在上下文内（#18836），共同反映出内存态会话与磁盘态会话之间存在更宽的鸿沟。
- **Agent 卫生。** 散落在临时目录里的脚本（#23571）和破坏性命令的选择（#22672），即便在 agent 的"答案"正确时，也会带来清理与安全方面的摩擦。
- **终端 UX。** 窗口缩放时的闪烁与重渲染抖动（#21924）仍是 ink/React 渲染层面长期存在的痛点。
- **软链接的易用性。** `~/.gemini/agents/*.md` 在以软链接形式存在时不被识别（#20079）是一个小但反复出现的痛点，对用 dotfile 管理 agent 的用户尤其明显。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-15

## 今日亮点

Copilot CLI 团队连续发布了两个补丁版本（`v1.0.84-7` 和 `v1.0.84-6`），分别修复了发送给 Claude adaptive-thinking 模型的 shape 问题，并新增了 `/config` 侧边栏配置界面以及沙箱的网络允许/拒绝规则。Issue #4525——一个长期存在的、影响 Python MCP SDK 2.0.0 服务器的 MCP dual-era 初始化 bug——已被关闭，这是 MCP 兼容性方面取得进展的重要信号。然而，过去 24 小时新进的 21 个 issue 大多是关于沙箱策略缺口、插件激活边界情况以及跨模型兼容性（Grok、Gemini Flash、Deepseek）的新分诊报告，这表明 v1.0.83/84 正在暴露多个新的回归面。

## 版本发布

- **v1.0.84-7** — 修复了发送给 Claude 模型的 thinking shape（被归类为 adaptive-only 的模型现在会保持 adaptive 而非失败，且当 thinking 被禁用时 reasoning effort 会被限制为 `high`）；`sessionEnd` hooks 现在会在 `/clear` 关闭会话时运行。
- **v1.0.84-6** — 新增 `/config` 用于在 CLI 中打开侧边栏配置界面；新增 `/sandbox` 的网络主机允许/拒绝规则，且不会替换已配置的上游代理；managed Edit/Write 规则现在适用于已识别的原生 shell 重定向以及受支持的原地 `sed` 操作。

## 热门 Issue

1. **[#4525](https://github.com/github/copilot-cli/issues/4525) — 已关闭 · `server/discover` 之后的 MCP dual-era `initialize`（-32022）**（👍 3, 7 条评论）  
   CLI 1.0.81-1 在成功的现代 `server/discover` 探测之后发送了一个遗留的 `initialize` 请求，导致 Python MCP SDK 2.0.0 服务器异常。今日已关闭——这是 MCP 协议版本协商正在被加固的重要信号。

2. **[#4725](https://github.com/github/copilot-cli/issues/4725) — 开启中 · Linux 上频繁出现 JavaScript 堆 OOM**（👍 1, 5 条评论）  
   每隔几分钟就会反复发生 V8 OOM 崩溃，峰值驻留集接近 3.9 GB。这是影响长时间运行 Linux 会话的关键稳定性问题。

3. **[#4505](https://github.com/github/copilot-cli/issues/4505) — 开启中 · 恢复的会话保留了过期的连接项 ID**（👍 3, 4 条评论）  
   在 `/resume` 之后，每个 prompt 都会因 `CAPIError: 400 input item ID does not belong to this connection` 而失败；`/fork` 也无法恢复。对于长时间运行的工作流而言，这是影响很大的数据完整性 bug。

4. **[#4549](https://github.com/github/copilot-cli/issues/4549) — 开启中 · Windows：每个 shell 命令都会闪烁 PowerShell 控制台窗口**（👍 1, 2 条评论）  
   每个 agent shell 命令都会生成一个可见的 `conhost` 窗口，而不是以隐藏方式运行。这是严重的 Windows UX 回归。

5. **[#4556](https://github.com/github/copilot-cli/issues/4556) — 开启中 · 服务端管理的 `extraKnownMarketplaces` 从未注册 marketplace**（👍 2, 2 条评论）  
   拉取成功并完成解析，但条目始终无法到达插件/marketplace 代码路径。影响企业级管理的插件目录。

6. **[#3572](https://github.com/github/copilot-cli/issues/3572) — 开启中 · 在 cwd 没有 GitHub 托管的远程仓库时，组织级自定义 agent 不可见**（👍 3, 2 条评论）  
   来自 `.github-private` 的自定义 agent 仅在 cwd 包含属于该组织的 git remote 时才会加载。长期存在的企业可用性缺口。

7. **[#4843](https://github.com/github/copilot-cli/issues/4843) — 开启中 · 颜色不符合 macOS 上 Warp 终端的主题**（👍 0, 1 条评论）  
   CLI 依据的是操作系统的明/暗模式，而不是当前激活的 Warp 主题，当两者不一致时会产生难以辨认的文字。

8. **[#4841](https://github.com/github/copilot-cli/issues/4841) — 开启中 · 自定义 agent 的 plan-mode 留空 Plan 面板**（👍 0, 1 条评论）  
   当一个非推断、由用户选定的自定义 agent 调用 `exit_plan_mode` 时，面板只渲染气泡而没有计划正文（`plan_content` 为空，但 summary 已填充）。

9. **[#4846](https://github.com/github/copilot-cli/issues/4846) — 开启中 · 启用「允许开发工具访问」后沙箱文件系统策略被忽略**（👍 0, 0 条评论）  
   启用开发工具访问会绕过针对 `python` 等工具的用户文件系统策略。这是 1.0.83 中一项重要的安全策略回归。

10. **[#4844](https://github.com/github/copilot-cli/issues/4844) — 开启中 · `--yolo` 被预认证的 fail-closed bypass 上限吞掉**（👍 0, 0 条评论）  
    在预认证窗口期间，fail-closed 姿态会在服务端策略到达之前禁用 bypass 模式，并且 `--yolo` 在策略解析后也不会被重新应用。企业姿态与用户意图之间的冲突。

## 关键 PR 进展

过去 24 小时内没有 pull request 更新。

## 热门讨论

本周期未提供讨论数据。

## 功能请求趋势

- **MCP 协议现代化（#4834, #4525）** — 对 MCP `2026-07-28` Multi Round-Trip Requests（`input_required`）以及正确的 `server/discover` 语义有强烈需求。现代化是 issue 流中最大的单一主题。
- **沙箱策略粒度（#4783, #4844, #4846）** — 多项请求希望为 CLI 沙箱 `yolo` 模式设立独立的企业策略作用域、在 fail-closed 启动下更好地处理 `--yolo`，以及在开启开发工具访问时保持文件系统规则的一致执行。
- **企业/组织 agent 发现（#3572）** — 组织级自定义 agent 应可在与 cwd 仓库无关的情况下被发现。
- **终端/操作系统集成打磨（#4549, #4839, #4843）** — 在 Windows 上隐藏生成的控制台窗口、禁用任务栏图标、尊重各终端的主题（Warp）。
- **模型兼容性上限（#4835, #4836, #4840）** — 工具数量上限（Grok 4.5：350）、schema 校验错误（Gemini Flash MCP 数组枚举）以及 BYOK 回归（Deepseek `custom` 工具类型）

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-15

## 今日要点

今天的头条是社区对强推 V2 侧边栏改版的强烈反弹 —— 至少五个独立 issue（#48882、#48953、#48837、#49021、#49031、#38230）合计获得 50+ 点赞，要求恢复旧版双面板布局，并已引发维护者的积极讨论。与此同时，**v1.18.31** 发布了一个针对 ACP 会话状态的 Bug 修复，而 Zen 网关目前正在发生 DeepSeek V4.1 Flash 故障，以及 Muse Spark 系列模型间歇性的 `reasoning encrypted_content` 错误。

---

## 版本发布

### v1.18.31 — Bug 修复版本

- **Core**：在加载、恢复或分叉会话时，恢复 ACP 会话的 model、effort、mode 和 reasoning chunk 边界。([@JacobNWolf](https://github.com/anomalyco/opencode/releases/tag/v1.18.31))
- **TUI**：启动时暴露远程配置的认证错误并以失败状态退出（此前这些错误被静默吞掉）。
- **Extensions**：发布说明中的改进部分被截断。

---

## 热门 Issue

1. **[#13984 — CLI 中复制/粘贴失效](https://github.com/anomalyco/opencode/issues/13984)** *(59 条评论, 32 👍, OPEN)*
   流量最高的开放 issue：虽然显示"已复制到剪贴板"，但 `Ctrl+V` 无法粘贴任何内容。该问题持续影响大量用户长达数月 —— 是基础体验的阻断问题。

2. **[#48741 — Zen 上 Muse Spark 系列出现严重错误](https://github.com/anomalyco/opencode/issues/48741)** *(26 条评论, OPEN)*
   新错误 `reasoning encrypted_content was not issued to this caller` 阻断了 Zen 上所有 Muse Spark 模型。对付费用户影响范围极大。

3. **[#48882 — 恢复带有持久化左侧栏的旧版 UI](https://github.com/anomalyco/opencode/issues/48882)** *(14 条评论, 20 👍, OPEN)*
   "请恢复旧版 UI"的代表性帖。指出最近的侧边栏改版（#20242）移除了双面板布局且没有提供切换开关。

4. **[#17318 — SSE 读取超时](https://github.com/anomalyco/opencode/issues/17318)** *(47 条评论, 37 👍, CLOSED)*
   长时间运行的文件写入流被中断。虽然已解决，但暴露出多个提供商集成存在流式传输可靠性问题。

5. **[#26602 — 桌面端 5 分钟请求头超时](https://github.com/anomalyco/opencode/issues/26602)** *(13 条评论, OPEN)*
   桌面客户端对本地 OpenAI 兼容提供商强制设定 5 分钟的硬性请求头截止时间，无视 `"timeout": false` 配置。会阻断较慢的本地推理设置。

6. **[#5391 — 每个提供商支持多个认证配置](https://github.com/anomalyco/opencode/issues/5391)** *(13 条评论, 41 👍, OPEN)*
   本批中点赞最高的特性请求。用户希望在个人/工作/API Key 账户之间切换，而无需手动编辑配置文件。

7. **[#49041 — DeepSeek V4.1 Flash 在 Zen 上不可用](https://github.com/anomalyco/opencode/issues/49041)** *(7 条评论, OPEN)*
   模型一直转圈无输出，而 V4 Pro 正常工作。一个小时前刚开始出现 —— 新发故障。

8. **[#48953 — "为什么我们必须使用新布局？"](https://github.com/anomalyco/opencode/issues/48953)** *(8 条评论, 12 👍, CLOSED)*
   V2 改版彻底移除了布局切换开关。是更广泛 UI 反抗浪潮中的典型讨论帖。

9. **[#48811 — macOS：每次提示都失败 `undefined is not an object`](https://github.com/anomalyco/opencode/issues/48811)** *(6 条评论, 29 👍, OPEN)*
   macOS 的全面崩溃，问题根源定位在 `SystemPrompt.environment`。29 个点赞强烈表明影响范围广泛。

10. **[#49047 — Windows Defender 将 OpenCode 标记为木马](https://github.com/anomalyco/opencode/issues/49047)** *(6 条评论, CLOSED)*
    杀毒软件误报 —— 是 Windows 新用户面临的信任/体验问题。

---

## 关键 PR 进展

1. **[#49046 — 对出站 LLM 请求传递 W3C traceparent](https://github.com/anomalyco/opencode/pull/49046)** *(OPEN)*
   关闭 #49038。让支持 OTLP 的网关/代理能在 OpenCode → LLM 提供商之间端到端关联追踪。对可观测性体系非常重要。

2. **[#49071 — 对 OpenAI 提示缓存键使用白名单](https://github.com/anomalyco/opencode/pull/49071)** *(OPEN)*
   关闭 #45113。`lowerOptions` 此前会无条件将 `promptCacheKey` 转为小写；本次限制重命名只作用于支持的提供商。

3. **[#49069 — 暴露持久化服务的启动失败](https://github.com/anomalyco/opencode/pull/49069)** *(OPEN)*
   关闭 #49034。当两个后台服务竞争者重叠时，第一个的启动错误会被丢弃。这次把静默超时替换为清晰的失败消息 —— 同时也触及了 #41746 和 #41696 这组 issue。

4. **[#48990 — TUI 在 SIGUSR2 重载时跳过实例销毁](https://github.com/anomalyco/opencode/pull/48990)** *(OPEN)*
   关闭 #42621。切换主题时的 SIGUSR2 信号此前会中止进行中的模型请求；现在当配置未变更时予以跳过。

5. **[#48943 — 重构模型解析逻辑，修复缺失的 variant 逻辑](https://github.com/anomalyco/opencode/pull/48943)** *(CLOSED)*
   对 model-variant 解析的内部清理 —— 有望解除多个下游提供商 bug 的阻塞。

6. **[#49068 — 新增协议 body 扩展](https://github.com/anomalyco/opencode/pull/49068)** *(CLOSED)*
   新增 `Protocol.withBody` 用于类型化请求体方言；迁移了 Alibaba 和 Z.AI Messages 方言。为更整洁的提供商特定扩展奠定基础。

7. **[#49052 — 新增 Azure Foundry message 区分器](https://github.com/anomalyco/opencode/pull/49052)** *(CLOSED)*
   将 `*.services.ai.azure.com/api/projects/...` 端点区分为类型化的 `azure-responses` 方言，并显式标注 `type: "message"`。

8. **[#49065 — 将 Set/RegExp/URLSearchParams 跨边界传递至 codemode 宿主](https://github.com/anomalyco/opencode/pull/49065)** *(CLOSED)*
   阻止 `JSON.stringify` 在工具/结果边界造成的数据丢失 —— `new Set([1,2])` 不再变成 `{}`。

9. **[#49066 — agents 集群页签带 token 迷你图](https://github.com/anomalyco/opencode/pull/49066)** *(OPEN)*
   新的跨项目 Agents 视图：状态脉冲、阶段标签（SPEC/PLAN/BUILD/GATE/REVIEW）、输入/输出 token、滚动 tok/s、缓存命中率、预估费用、TTFT，以及每个 agent 64 桶的输出 token 迷你图。

10. **[#42633 — 安全地恢复 permission ask 钩子](https://github.com/anomalyco/opencode/pull/42633)** *(CLOSED)*
    关闭 #7006。在 OpenCode 创建交互式权限请求之前，恢复声明的 `permission.ask` 插件钩子 —— 填补了一个长期存在的插件 API 空缺。

---

## 特性请求趋势

从过去 24 小时内活跃的 50 个 issue 和 PR 中提炼：

- **恢复旧版 UI / 双面板侧边栏** —— 压倒性的主题（#48882、#48953、#48837、#49021、#49031、#38230）。管理 20+ 会话的用户反馈 V2 标签页布局是生产力倒退，希望在桌面端和 Web 端都提供永久的切换开关。
- **每个提供商的多账户认证**（#5391，41 👍）—— 在个人/工作/API Key 配置之间切换而无需编辑配置文件。
- **追踪上下文传递**（#49038，PR #49046）—— 对出站 LLM HTTP 请求附加 W3C `traceparent`，与 MCP `tools/call`（SEP-414）保持分布式追踪对等。
- **标签页快捷键**（#37077）—— `Ctrl+T`/`Ctrl+W`/`Ctrl+Tab` 用于切换标签页，强化了"请把多项目工作流还给我们"的诉求。
- **可配置的超时**（#26602、#49044）—— 桌面端 5 分钟请求头硬性超时，以及客户端 SDK 300 秒的 undici 请求头超时，都需要提供覆盖钩子。
- **跨模型工具回退**（#49026）—— 当当前聊天模型无法读取图像时，调用已配置的图像生成模型。

---

## 开发者痛点

1. **强制 UI 改版且没有逃生通道。** 本周社区投诉声量最大的问题。管理多个并发会话的重度用户认为 V2 标签页布局破坏了他们的工作流，且设置层面没有任何回退开关。

2. **Zen 网关不稳定。** 同一 24 小时窗口内：DeepSeek V4.1 Flash 挂起（#49041）、DeepSeek V4 Flash（New）路由在 zen 网关上挂起（#40479）、Muse Spark 系列报 `reasoning encrypted_content` 错误（#48741）。该网关在多个模型系列上似乎是单点故障。

3. **macOS 基础功能崩溃。** Issue #48811 和 #48372（合计 48 👍）表明 macOS 上每次提示都以相同的 `undefined is not an object` 错误失败，问题出在 `SystemPrompt.environment`。实际上已阻断了该平台。

4. **流式/可靠性故障。** SSE 读取超时（#17318）、桌面端 5 分钟请求头超时（#26602）、长时间使用后模型卡在"Thinking"状态（#49033），以及客户端 SDK 300 秒的 undici 请求头超时（#49044）—— 都指向薄弱的长时流处理能力。

5. **Windows 上的信任信号。** Windows Defender 将可执行文件标记为木马（#49047）—— 在新用户引导和升级时是摩擦点。

6. **CLI 复制/粘贴失效。** 评论数最高的 issue #13984 自二月以来一直未解决，说明低优先级的 UI 体验问题在 backlog 中长期搁置。

7. **提供商 schema 不匹配。** Gemini 因可空数组 schema 拒绝 MCP 工具（#48073）—— 一份不良的工具声明就会破坏整个请求，因为 Gemini 会一次性校验所有声明。

8. **会话状态回归。** `session_message.seq NOT NULL constraint failed`（#31204）在切换 agent 的会话上出现，以及"更新后旧的会话/项目不可见"（#49029）—— 都表明 v2 schema 变更存在迁移脆弱性。

---

*基于 anomalyco/opencode 仓库 2026-09-15 的 GitHub 活动生成。*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-15

## 今日要点
本周 Bedrock 成本核算相关的 bug 在 issue tracker 上集中爆发——`usage.input` 归一化与 1 小时缓存写入计费均以"多付费用"事件的形态浮现——与此同时，mitsuhiko 提交的"对话中系统消息"PR 接近合入，它将作为基础性变更，改变 Pi 在 transcript 中记录 prompt 与工具历史的方式。

## 版本发布
过去 24 小时内无新版本。

## 热门 Issue

1. **#8752 — bedrock-converse：`usage.input` 在不同模型族之间未做归一化** (5 👍, OPEN)
   Anthropic 上报的 `input` 是扣减缓存后的净值，OpenAI 族上报的是总值；Pi 直接透传原始值，导致 Bedrock 上出现错误的缓存未命中通知和翻倍的输入成本。因涉及具体金额损失，获得较多点赞。
   https://github.com/earendil-works/pi/issues/8752

2. **#9457 — bedrock-converse：1 小时缓存写入按 5 分钟费率计费** (4 👍, OPEN)
   流式路径从未从 `cacheDetails` 设置 `cacheWrite1h`，因此每次 1 小时 prompt 缓存写入都被错误计价。这是 #8752 归一化缺失的一个伴随症状。
   https://github.com/earendil-works/pi/issues/9457

3. **#9210 — 通过 Vercel AI Gateway 接入 Anthropic：`cacheWrite1h` 从未设置**
   即便 Vercel 上游通过 `PI_CACHE_RETENTION=long` 遵守 1 小时 TTL，Pi 仍按 5 分钟费率（1.25×）计费。这是 #9457 在 Bedrock 上命名的缓存计价模式的第二例。
   https://github.com/earendil-works/pi/issues/9210

4. **#9211 — `vercelGatewayRouting` 在 `vercel-ai-gateway` provider 上形同虚设**
   文档中的"Vercel AI Gateway 路由配置"选项只接入到 `openai-completions.js`，但内置目录中的所有模型都使用 `anthropic-messages`——所以文档化的功能实际上没有任何效果。
   https://github.com/earendil-works/pi/issues/9211

5. **#9391 — 压缩后陈旧的签名思考块被重放**
   在一次手动 compaction 之后，后续每次 Anthropic 请求都会触发相同的 15 条 `prefix_binding_mismatch` 路径。已签名的 thinking block 在上下文被摘要时未被丢弃/替换。
   https://github.com/earendil-works/pi/issues/9391

6. **#9306 — 中止/错误的回合在上下文中留下未匹配的 `toolCall` 块**
   当 agent 回合以 `stopReason: "error"` 或 `"aborted"` 结束时，已经流入 assistant 消息的 tool call 始终未获得匹配的 tool 结果；下一次 `runAgentLoopContinue` 被 provider 拒绝。
   https://github.com/earendil-works/pi/issues/9306

7. **#9129 — Windows 下 bash 超时留下孤儿管道进程**
   `taskkill /F /T /PID <bash>` 无法触及 MSYS2 管道中间进程，因此每个管道阶段在超时后仍在继续运行。这是真实的 Windows 易用性回归。
   https://github.com/earendil-works/pi/issues/9129

8. **#9440 — 使用全新 `--session-id` 时扫描所有 transcript**
   一位拥有 4k+ transcript 的用户报告：即便使用 `-ne`，启动仍需约 16 秒，因为 Pi 仍要全量扫描以查找"无现有匹配项"。扩展作者因此无法廉价地预计算 session id。
   https://github.com/earendil-works/pi/issues/9440

9. **#9354 — frontmatter 无效的 prompt 模板被静默丢弃**
   Skills 在 YAML 解析失败时会发出警告；而 `prompts/*.md` 中的 prompt 模板只会从 `/` 自动补全与 `/resources` 中悄然消失，不给出任何诊断信息。两条几乎相同的代码路径行为不一致。
   https://github.com/earendil-works/pi/issues/9354

10. **#9444 — `openai-completions` 在流式 `tool_calls` 上丢失 Gemini `thoughtSignature`**
    通过 OpenAI 兼容网关对 Gemini 的多轮工具调用在第二次请求时失败，因为 assistant 消息上的 signature 从未被捕获；预计在 Pi 侧修复。
    https://github.com/earendil-works/pi/issues/9444

## 关键 PR 进展

1. **#9548 — Mid conversation system messages** (mitsuhiko, OPEN)
    将 system prompt 文本与工具集变更作为记录的 transcript 条目呈现，而非静默的前缀重写，从而支持分支导航、resume 保真度以及 resume 之间的缓存 prompt 保留。
    https://github.com/earendil-works/pi/pull/9548

2. **#9601 — Avoid transcript scans for exact session IDs** (metaist, OPEN)
    直接修复 #9440：在不加载整个 transcript 的情况下查找 session header，改为同步而非异步。微基准测试显示可观的启动性能提升。
    https://github.com/earendil-works/pi/pull/9601

3. **#9594 — Add Gemini-only Antigravity provider** (a209m, CLOSED)
    通过一等 OAuth provider 恢复基于订阅的 Gemini 访问，将专用的 Antigravity 传输层与 OAuth 流程适配进当前的 provider 架构。
    https://github.com/earendil-works/pi/pull/9594

4. **#8474 — Bundle Node runtime into `pi-coding-agent`** (mitsuhiko, CLOSED)
    加载时的文件数量大幅减少；动机来自 Windows + Defender 启动痛点。注：今天标记为关闭，但仍被标注为"需要更多测试与优化"。
    https://github.com/earendil-works/pi/pull/8474

5. **#8732 — Preserve `reasoning_content` on cross-model replay into DeepSeek-family endpoints** (CLOSED)
    通过将 `reasoning_content` 一路透传到目标请求，修复 DeepSeek、B.AI / SenseNova 以及 OpenRouter 上托管的 DeepSeek 模型上的多轮思考模式行为。
    https://github.com/earendil-works/pi/pull/8732

6. **#9274 — Preserve indentation in rendered diffs** (dannote, OPEN)
    在保持其他内容不变而插入文本时，edit 工具的同行渲染器会从被删除行中剥离缩进；渲染器现已保证周围空白完整保留。
    https://github.com/earendil-works/pi/pull/9274

7. **#9589 — Type user input items in the Responses API** (Clmzz-gra, CLOSED)
    两个相关 bug 都在严格的 Responses 端点上产生 `unsupported input item type:` 400 错误；修复方案对用户输入项正确打标。
    https://github.com/earendil-works/pi/pull/9589

8. **#9351 — Fix edit preview flicker on remote edits** (terrorobe, OPEN)
    edit 工具行在远端操作替换前会闪现本地的"Could not edit file"错误；现在预览与远端 diff 一起原子更新。
    https://github.com/earendil-works/pi/pull/9351

9. **#9570 — Map `TOO_MANY_TOOL_CALLS` to an error stop reason** (rsaryev, OPEN)
    `@google/genai@2.21.0` 新增了该 FinishReason；`google-shared.ts` 中的穷举 switch 之前会抛出 `Unhandled stop reason`。此次新增映射使 Gemini 端的限流响应能够被优雅处理。
    https://github.com/earendil-works/pi/pull/9570

10. **#9581 — Warn when prompt template frontmatter fails to parse** (gvkhosla, CLOSED)
    修复 #9354：格式错误的 `prompts/*.md` 现在会产生与 skills 已有的"prompt-collision"相同的诊断警告，而非静默消失。
    https://github.com/earendil-works/pi/pull/9581

## 热门讨论

**Show and tell**
- **#1558 — CursorAI Agent CLI custom provider for the Pi Coding Agent** (9 👍, 3 comments)
  netandreus 在 npm 上发布了 `@netandreus/pi-cursor-provider`——一个让 Pi 驱动 Cursor CLI 的社区 provider——并请求与 Claude Code / OpenAI Codex provider 一同被收录。 https://github.com/earendil-works/pi/discussions/1558

## 功能请求趋势

- **网关上的成本/缓存保真度。** Bedrock、Vercel AI Gateway 与 Anthropic 的缓存语义本周均暴露出计价 bug——用户希望对 `cacheWrite1h`、`cacheRead`、`usage.input` 做按 provider 的归一化，并将该选项作为一等 compat flag 暴露，而非硬编码常量。
- **Provider 的覆盖广度与对等性。** 对 `opencode-go`、Antigravity 以及按会话粒度的 `SessionAffinityFormat` 变体的需求在上升；用户希望在不开 fork 的前提下，获得一条面向非 OpenAI/Anthropic provider 的文档化目录路径。
- **Transcript 即历史。** 两条线索（#9548、#9432、#9441）收敛于"把更多内容记录进 transcript、更少放进隐式会话状态"——system prompt 变更、工具变更与选择标记都希望获得一等表示，从而让 resume / 分支 / 上下文缓存正常工作。
- **扩展 API 的易用性。** `#7824`、`#9434`、`#9578` 都提出了新的扩展 hook——从 tool result 触发的回合终止、prompt appender、以及原子化的 interrupt+pending-message 投递——表明一批扩展作者已超越当前的扩展面。
- **更好的诊断，而非单纯的修复。** `#9354`、`#9453`、`#9585`、`#9599` 都要求比静默失败更清晰的信号（在 `/resources` 中展示警告、macOS 本地网络隐私 UX、可重试错误的分类、监听器抛错的护栏）。

## 开发者痛点

- **静默失败模式。** 跨请求存活下来的损坏 base64 图像块（#9590）、一个 YAML 拼写错误就让 prompt 模板消失（#9354）、错误停止时孤立的 tool call（#9306）、compaction 后被无限重放的已签名 thinking block（#9391）——最主要的抱怨就是"我没有收到任何警告"。
- **跨模型的脆弱性。** 向新模型族的 replay 仍会泄漏先前模型的推理、signature 或无界思考文本（#9433、#9444、#9391）——这是产生不透明 400 错误的反复出现的源头。
- **Windows 是二等公民。** 孤儿 bash 管道进程（#9129）、shell 解析不一致（#9501/#9504）、与 Pi 进程相关的本地网络隐私拒绝（#9453），以及由 Defender 扫描所驱动的打包变更（#8474），都凸显出 Windows DX 方面的真实缺口。
- **网关计费的信任。** 在 Bedrock 和 Vercel AI Gateway 上，用户一直在不知不觉中多付费用；多个并发 bug 表明成本管道需要一个统一的归一化层，而不是按 provider 打补丁。
- **并发与会话完整性。** 并发的 `pi -c` 进程在没有锁的情况下向同一文件追加（#9596）；`--session-id` 触发启动时的全目录扫描（#9440）。两者都表明会话文件处理在设计时并未考虑并行使用场景。
- **扩展面的缺口。** 多个长期存在的请求（#7824、#9434、#9578）表明扩展常常在运行时打补丁到原型上——这是一个信号，说明文档化的 API 需要一次扩展点审查。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-15

## 今日亮点

v0.23.4 版本带来了一项破坏性变更，移除了通道中可配置的消息前缀过滤功能，同时为 Computer-Use 驱动新增了两个 cua-driver-rs 二进制文件（v0.20.8 和 v0.20.7）。社区的工作重心仍然集中在分类处理 **由 React 错误 #185 触发的 TUI 崩溃**（三个独立 issue 跟踪同一个 Ink `useBoxMetrics` 循环），以及出现在扩展、钩子和身份比较器中的 **Windows 特有的文件系统与安全缺陷**。

## 版本发布

- **[v0.23.4](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.4)** — 移除了通道中可配置的消息前缀过滤；符合条件的消息现在遵循常规的发送者/群组/提及/配对策略。（#11571）
- **[v0.23.4-nightly.20260914](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.4-nightly.20260914.f024b37689)** — Windows inode 网关上的测试基础设施改进（#11853）以及 CUA 驱动修复。
- **[cua-driver-rs v0.20.8](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.8)** & **[v0.20.7](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.7)** — 预编译的 CUA 驱动二进制文件（macOS 已签名并公证；Linux x86_64/arm64 glibc 2.31+；Windows UIAccess + SDK payload）。

## 热门问题

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500)** — 当多个后台子代理并发完成时，**TUI 因 React 错误 #185 而静默退出**。Ink 的 `useBoxMetrics` 布局监听器触发了 `setState` 循环，超出 React 的最大更新深度，导致进程被终止且不渲染任何错误。（13 条评论，P1）
2. **[#11590](https://github.com/QwenLM/qwen-code/issues/11590)** — Qwen Code 会自动向通过 DashScope 路由的 OpenAI 兼容请求注入顶层 `metadata` 对象，导致 **所有非 Qwen 模型**（如 GLM-5.3-Flash）出现 HTTP 400 错误。已**关闭**，标记为 ready-for-human。（8 条评论，P1）
3. **[#11834](https://github.com/QwenLM/qwen-code/issues/11834)** — 在 0.23.3 上，中文问候语触发 `API Error: 400 invalid params, function parameters is empty (2013)`，尽管 `/update` 报告其为最新版本。（6 条评论，P1）
4. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556)** — 在 Remote-SSH（VSCode 1.137.0 server / 1.133.0 client）环境下，**vscode-ide-companion 0.23.1 的 webview 卡死**。在混合架构环境下可复现。（6 条评论，P1）
5. **[#11849](https://github.com/QwenLM/qwen-code/issues/11849)** — 0.23.3 上的间歇性静默崩溃与 #11500 高度相关，长时间会话后更为频繁；会话恢复后无任何错误轨迹。（5 条评论，P1）
6. **[#11795](https://github.com/QwenLM/qwen-code/issues/11795)** — **权限队列以 ACP 连接为键**：一个空闲会话中未应答的提示会静默阻塞守护进程上的其他所有会话。#11802 中已有部分修复（序列化范围）；队列可见性与 TTL 修复仍有待完成。（5 条评论，P1）
7. **[#11887](https://github.com/QwenLM/qwen-code/issues/11887)** — `qwen --acp` **完全忽略审批模式**：工具自动执行，从未向 ACP 客户端发送 `session/request_permission`，使安全合约失效。（4 条评论，P2）
8. **[#11851](https://github.com/QwenLM/qwen-code/issues/11851)** — **安全**：`isAsyncOperator` 将 `\r`、`\v`、`\f`、`\u00a0` 视为 bash 单词分隔符，使 Bash 允许规则可静默覆盖攻击者注入的第二条命令。（3 条评论，P1）
9. **[#11872](https://github.com/QwenLM/qwen-code/issues/11872)** — Web Terminal 报告 `[Error: PTY not available]`，原因是 `@lydell/node-pty` 已被声明但未打包；macOS 代码签名同样会阻止本地安装的预编译包。（3 条评论，P1）
10. **[#11883](https://github.com/QwenLM/qwen-code/issues/11883)** — 在 Windows 上，**扩展更新与卸载因 `EPERM` 失败**，原因是扩展商店依赖 Windows 会锁定的单次目录重命名操作。（2 条评论，P1）

## 关键 PR 进展

1. **[#11821](https://github.com/QwenLM/qwen-code/pull/11821)** — 让 `splitCompoundCommandSegments` 识别 `#` 注释，避免尾部注释切分复合命令并触发多余的权限提示。
2. **[#11711](https://github.com/QwenLM/qwen-code/pull/11711)** — 为 Unix 上的子代理新增 **容器执行能力**（`QWEN_AGENT_EXECUTION_BACKEND=docker|podman`），支持按代理和项目级别选择性启用。
3. **[#11889](https://github.com/QwenLM/qwen-code/pull/11889)** — 修复 Windows 扩展商店的 `EPERM` 问题（参见 #11883），当目录重命名被拒绝时回退到复制后交换的策略。
4. **[#11842](https://github.com/QwenLM/qwen-code/pull/11842)** — 在 MiniMax 路由的 chat-completions 请求线上恢复 `parameters` 字段，修复 #11834 的空工具调用回归。
5. **[#11778](https://github.com/QwenLM/qwen-code/pull/11778)** — 通过 `cmd.exe → PowerShell` 回退机制解析 Windows 命令钩子（对面向原始 `cmd` 的钩子作者而言属于破坏性变更）。
6. **[#11857](https://github.com/QwenLM/qwen-code/pull/11857)** — 当 push 的 diff 与已评审的 head 字节级完全相同时，跳过自动重新评审（减少 "Update branch" 上的冗余 CI）。
7. **[#11893](https://github.com/QwenLM/qwen-code/pull/11893)** — 在评审清理测试套件中 mock `realpathSync`，使 cwd 调用计数见证在 Windows 上保持稳定。
8. **[#11879](https://github.com/QwenLM/qwen-code/pull/11879)** — 通过 120 秒的拉取超时与 3 次指数退避重试加固发布流水线中的独立归档下载（#11870）。
9. **[#11466](https://github.com/QwenLM/qwen-code/pull/11466)** — 在用户取消工具调用后重新连接 MCP 服务器，因为当前的取消路径同时跳过了重连逻辑。
10. **[#11831](https://github.com/QwenLM/qwen-code/pull/11831)** — 在评估更高作用域的禁用守卫之前，先从权威目录解析技能身份（现已**关闭/合并**）。

## 功能请求趋势

- **跨主机代理编排** — 子代理的容器执行（#11711）、将 Web Shell 连接到选定的远程守护进程（#11548），以及带有一致性门控的规范化守护进程协议规范（#11867），标志着多主机能力正趋于成熟。
- **工具的成本与安全上限** — 参照 Claude Code 的每会话 `web_search` 调用上限（#11846）反映出对工具级速率限制的需求。
- **上下文工程的遥测深度** — 在 `qwen-code.llm_request` span 上暴露版本化的 `qwen-code.context.usage` 细分（#10015），以实现上下文窗口的可观测性。
- **Worktree 的易用性** — 基于依赖差异的智能条件式 `node_modules` 符号链接（#5790），可回收每个 worktree 约 1 GB 的空间。
- **Web Shell 工作区管理** — UI 内的 git 远程管理（#11163）以及支持每轮来源的脚注预览（#11480）。

## 开发者痛点

- **并发场景下的 TUI 不稳定性** — 多子代理完成时反复出现的 React #185 崩溃（#11500、#11849、#11873）是当前讨论度最高的可靠性缺陷。
- **Windows 文件系统的怪癖** — 扩展重命名的 `EPERM`（#11883）、破坏 `isSameFile` 的 64 位 NTFS 文件 ID（#11848/#11877），以及 PTY/代码签名的障碍（#11872）构成了反复出现的 "Windows 税"。
- **Shell 解析的安全缺口** — `\r/\v/\f/\u00a0` shell 单词分隔符绕过（#11851）以及重复的 `splitCompoundCommandSegments` 解析器（#11882）凸显出手写 shell 解析器的碎片化问题。
- **ACP 协议的边界场景** — 审批模式绕过（#11887）和按连接的权限队列争用（#11795）暴露了 ACP 安全合约中的漏洞。
- **CI 抖动与基础设施变更** — 绿色测试套件上间歇性的 `SIGTERM`（#11777）、过时的 ECS runner 集群（#11633），以及 macOS E2E 分片死亡（#11134）消耗了大量维护者时间。
- **模型供应商兼容性** — 顶层 `metadata` 字段破坏非 Qwen 供应商（#11590）以及 MiniMax wire 回归（#11842），都指向脆弱的 OpenAI 兼容序列化假设。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*