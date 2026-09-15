# AI CLI 工具社区动态日报 2026-09-15

> 生成时间: 2026-09-15 11:30 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比报告 — 2026-09-15

## 1. 生态概览

AI CLI 智能体品类已收敛为三个梯队：绑定自家模型厂商旗舰工具（Claude Code、Codex、Gemini CLI、Copilot CLI）、支持多提供商的开放客户端（OpenCode、Qwen Code），以及面向高级用户的专业级工具（Pi）。尽管商业模式各异，七款工具正在围绕相同的架构战场趋同 —— 多智能体编排、沙箱化执行、上下文/压缩管理、成本透明度 —— 而 Windows 支持则普遍滞后。发布节奏在各家都仍维持极高强度（nightly、alpha、热修复并行），但各家头号问题的性质折射出成熟度差异：Claude Code 的消费级计费争议 vs. Pi 的适配层保真度缺陷。社区信号越来越被运行 *无人值守、多日、多智能体* 工作流的用户所塑造，而非交互式聊天用户。

## 2. 活跃度对比

*数字反映各摘要 24 小时窗口内浮现的内容（热门议题列表按各摘要归一化到约 10 条），并非追踪器的绝对总量。*

| 工具 | 热门议题数 | 头号互动信号 | 活跃 PR（24h） | 讨论区（24h） | 发布（24h） |
|---|---|---|---|---|---|
| **Claude Code** | 10 | #38335：852 评论 / 476 👍 | 3（全部已列出） | — | 2 个稳定版（v2.1.271–272） |
| **Codex** | 10（+3 条重复配额报告） | #25719：397 👍（自 6 月起开放） | 10 | 5（1 idea、4 show-and-tell） | 4 个 alpha（v0.155.0 线；一周内 6 次） |
| **Gemini CLI** | 10 | #22323：P1，13 评论 | 10 | — | 1 个 nightly（v0.61.0） |
| **Copilot CLI** | 10（+6 条候补） | #13（vim 模式）：76 👍，约 1 年后关闭 | 0（明确为零） | — | 3 个预发布（v1.0.84-6/-7/-8） |
| **OpenCode** | 10 | #16017：138 👍（已关闭） | 10 | — | 1 个稳定热修复（v1.18.31） |
| **Pi** | 10 | #8752：6 评论 / 5 👍 | 10（若干已关闭） | — | 0 |
| **Qwen Code** | 10 | #11500：P1，15 评论 | 10 | — | 5（2 个核心含 v0.23.4 + 3 个 CUA 驱动包） |

**备注：** 本组中没有仓库在上游禁用了 Issues/PR（据各摘要所述），因此不适用 "N/A"。"—" 表示当日未浮现讨论区活跃度。Copilot CLI 的 0 PR 日在其摘要中有明确说明，且叠加长期悬而未决请求的关闭（#13、#54），提示其开发工作在公开 PR 表层之外进行。

## 3. 共同演进方向

| 方向 | 工具与证据 | 底层需求 |
|---|---|---|
| **每次调用的子智能体控制（模型 / 算力 / 提供商）** | Claude Code（#77298 算力，#72871 模型）、OpenCode（#6651，80 👍 —— 最热门开放请求）、Codex（#40858 —— 覆盖被静默丢弃）、Copilot（#4849/#4850） | *无需* 编写智能体定义文件即可为子智能体分配 cheap/strong 模型 |
| **成本与用量透明度** | Claude Code（#38335，852 评论；#72994；#73305）、OpenCode（#16017，138 👍；#42776）、Codex（Spark 配额三连 + #45602）、Pi（#8752/#9210/#9457 计费正确性） | 可编程可见的配额/余额、准确的计费、耗尽前的预警 |
| **长会话稳定性与压缩安全性** | Copilot（OOM 集群 #4664/#4725/#4251；压缩循环 #4780）、Pi（#9482 破坏性自动压缩删除约 40 万 token；`/forget` PR #9615）、OpenCode（#47510 事件表 GC；#36682 压缩注入）、Claude Code（#72997 上下文重注入）、Gemini（#22745 AST 感知读取以削减 36k token 基线） | 可预测、非破坏性、可检视的上下文管理 |
| **沙箱化与安全执行** | Copilot（`/sandbox` 主机 allow/deny）、Qwen（#11887 ACP 审批绕过；#11711 容器化子智能体）、Codex（Seatbelt 修复 #45548/#45559）、Gemini（#19873 零依赖 OS 沙箱；#24246 工具数量上限）、Claude Code（#71627 会话范围的主机审批） | 可组合、策略驱动的安全机制取代非黑即白的全放行 |
| **编辑器/终端级 UX** | Copilot（#13 vim 模式已关闭；#4843 主题）、Codex（#17793 Backspace bug；#45612 数学渲染）、Claude Code（#71700 Kitty、#77452 渲染）、Qwen（#11500 React 崩溃）、OpenCode（#48882 布局反弹） | CLI 作为日常驱动型 IDE 替代，而非简陋的 REPL |
| **Windows 兼容性** | 七款工具均报告 Windows 专属回归（Claude #92958/#94344、Codex Windows 会话集群、Pi #9361、Qwen #11935、Copilot #1148/#4549） | 尚未有工具把 Windows 当作一等平台 |
| **MCP 成熟度** | Copilot（CIMD OAuth 集群 #4793/#4800/#4525）、Claude（#85018 BigQuery OAuth）、OpenCode（#49151 工具列举；#48743 冷启动竞态）、Qwen（AppImage 环境变量泄漏到 stdio MCP 子进程） | MCP 作为稳定的默认集成面 |
| **可信的终止信号** | Gemini（#22323/#21983 在 MAX_TURNS/崩溃时报假 `GOAL`）、Qwen（#11924 goal-turn 持久化）、Codex（#41566 灰度损坏）、Claude（#77339 工具调用幻觉） | 智能体不得在中途中断的工作上报告成功 |

## 4. 差异化分析

| 工具 | 功能重心 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 企业工作流：后台智能体、定时任务、远程会话、Cowork 桌面、云连接器（BigQuery、Docs） | Max/Team 套餐的专业开发者 | 基于自家模型的稳定版 TypeScript harness；集成面最广，计费可信度最弱 |
| **Codex** | 安全/审查基础设施（Guardian reviewer、AgentControl 整合）、桌面应用、浏览器控制（Chrome） | OpenAI 技术栈开发者、自主运行用例 | Rust 内核，alpha 重度节奏（24h 内 4 个 tag）；最健康的 Discussions 生态（Fishbowl、CoCo） |
| **Gemini CLI** | Auto Memory 子系统、子智能体可靠性、AST 感知上下文经济、原生 bash 亲和性 | Gemini/Google Cloud 开发者、企业 | 纪律化的 nightly 自动化与 P1/P2 分流；协调一致的硬化（策略目录安全 PR #29333/#29336） |
| **Copilot CLI** | GitHub 原生收敛：VS Code 兼容（#54 已关闭）、Agent Factory、沙箱策略粒度 | 已身处 Copilot 生态的 GitHub 优先开发者 | 预发布阶段稳定化；公开 PR 表层安静但关闭了存在一年的请求；OOM 集群是主要风险点 |
| **OpenCode** | 提供商无关的多路由、Go 套餐用量经济性、UI 灵活性 | 切换模型并希望掌控成本的资深用户 | 热修复驱动的稳定（v1.18.30 全量中断同日修复）；社区响应度高（138 👍 请求已关闭） |
| **Pi** | 适配器保真度与计费精度；会话文件正确性（会话中途的系统消息、`/forget`） | 在智能体之上做架构/打磨的工程师 | 小而深的社区（mitsuhiko 作为直接贡献者）；零发布但 PR 吞吐稳定 |
| **Qwen Code** | 最广的覆盖面铺设：VS Code 伴生、Web Shell、Tauri 桌面、mesh 多智能体、容器隔离、CUA 驱动二进制 | VS Code 用户、Alibaba/Qwen 生态、多主机团队 | ACP 协议投入；操作员门控的容器执行（#11711）；本组中覆盖面扩展最快 |

## 5. 社区动能与成熟度

- **原始互动榜首：Claude Code** —— #38335（852 评论 / 476 👍）是所有追踪器中最大的单条帖子，是消费级规模的计费争议，表明安装基数极大；Codex 紧随其后的是 #25719（397 👍），但一个关键性能 bug 自 6 月开放至今。
- **迭代最快：Codex 与 Qwen Code** —— 分别 4 个 alpha tag 和 5 个发布（其中包括 3 个签名/公证的 CUA 驱动包）；Copilot 发出了 3 个聚焦一致人体工学体验的预发布。
- **单位信号密度最高：OpenCode 与 Pi** —— OpenCode 关闭了最被顶起的请求（#16017，138 👍）并发出了同日热修复，代价是一次让 macOS 用户每次 prompt 都中断的回归（速度优先于 QA）。Pi 的 10 个范围严密的 PRs 展示了本组中最高的单 PR 技术密度。
- **成熟度标记：** Claude Code 与 Copilot 正在关闭存在一年的 UX 请求（#72962、#13）—— 响应积极但节奏缓慢。Gemini 围绕 Auto Memory 的标签化 P1/P2 集中爆发，表明是有计划、协调一致的硬化。Copilot 的 0 PR 日叠加议题关闭，提示典型的企业支持型仓库的内部分支开发模式。
- **动能警示信号：** Codex 头部 bug 自 6 月老化至今；OpenCode 的 CPU 回归（#30086，53 评论）未修复；Copilot 的 OOM 类问题在五个议题中反复出现。

## 6. 趋势信号

1. **多智能体编排是 2026 年的架构战场。** 每次调用子智能体配置、容器隔离（Qwen #11711）、reviewer 层（Codex Guardian）、mesh 协作（Qwen #11206）、智能体工厂（Copilot）都在本周期内落地。基于这些工具构建的开发者应当 —— 也应当要求 —— 每次调用级的模型/算力 API。
2. **成本核算已成产品特性，而非锦上添花。** 各处最热闹的帖子都与计费相关；提供商约定分歧（净 vs. 毛输入 token、5m vs. 1h 缓存 TTL 费率）已渗透到每个客户端。任何展示成本的工具都必须把计费保真度当作核心正确性。
3. **压缩同时是可靠性与安全边界。** 破坏性自动压缩（Pi #9482）、压缩摘要注入（OpenCode #36682）、OOM/压缩循环（Copilot）都指向一个正在浮现的共识模式：保守压缩 + 手动回滚（`/forget`）。
4. **跨提供商路由存在抽象税。** `thoughtSignature`（Gemini）、`encrypted_content`（Muse Spark）、`reasoning_content`（DeepSeek）以及模式组合器（Anthropic）在翻译时都会静默失效。多路由模型的团队应当为适配层保真度工程预留预算 —— 这正是 Pi 全部的价值主张。
5. **Windows 兼容性是开放的差异化点。** 七家社区均报告 Windows 专属回归；目前尚无工具把 Windows 视作一等平台。
6. **会话文件正在成为公共接口。** 灰度查看器（Codex Fishbowl）、会话契约（Qwen #9387）、可回放的会话语义（Pi #9548）意味着持久化、有据可查的会话模式正在成为竞争护城河 —— 难以消费的格式现在会引发可见的社区摩擦。

---
*来源：anthropics/claude-code、openai/codex、google-gemini/gemini-cli、github/copilot-cli、anomalyco/opencode、earendil-works/pi、QwenLM/qwen-code 于 2026-09-15 的社区摘要。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告
*数据窗口：截至 2026-09-15 — anthropics/skills 仓库*

---

## 1. 热门 Skills 排名（讨论度最高的 PR）

由于数据集中未暴露每个 PR 的评论数，本排名基于近期活跃度（更新时间戳）、实质性技术深度，以及与 Issues 流中正在跟踪的缺陷的契合度综合评定。所列出的所有 PR 目前均处于 **OPEN** 状态。

### 1) skill-creator 可靠性修复 — [PR #1298](https://github.com/anthropics/skills/pull/1298) & [#1769](https://github.com/anthropics/skills/pull/1769)
**功能：** 用于编写新 Skills 的元技能（meta-skill）。这两个 PR 解决了 Windows 上并发触发评估的竞态问题（子进程 `select()` 失败），以及一个严重缺陷：`run_loop` 对每个技能都报告 `precision=100% recall=0%`，静默产生具有误导性的优化输出。
**讨论亮点：** 直接闭环响应 [#556](https://github.com/anthropics/skills/issues/556)（12 条评论，7 👍）和 [#1721](https://github.com/anthropics/skills/issues/1721) — 仓库中获赞最多的触发类缺陷。
**状态：** OPEN，最后更新于 2026-09-15。

### 2) mcp-builder 的 MCP-2 兼容性 — [PR #1742](https://github.com/anthropics/skills/pull/1742)
**功能：** 更新 `connections.py`，以适配 `mcp>=2.0.0` 中 `streamablehttp_client` → `streamable_http_client` 的重命名，以及新的 `create_mcp_http_client`/`http_client` 头部注入模式。
**讨论亮点：** 优先级很高，因为在当前 API 层面上，下游使用方无法构建 MCP 连接；将关闭 [#1668](https://github.com/anthropics/skills/issues/1668)。
**状态：** OPEN，更新于 2026-09-13。

### 3) md2video-audio Skill — [PR #1703](https://github.com/anthropics/skills/pull/1703)
**功能：** 零成本 Markdown → MP4 流水线（Marp 幻灯片 → TTS 配音 → 视频合成），定位为一项内容创作基础构件。
**讨论亮点：** 代表了最新提交的技能*类别*（媒体合成）；2026-09-15 的最新活动表明评审正在进行中。
**状态：** OPEN，更新于 2026-09-15。

### 4) mcp-builder 评估框架加固 — [PR #1602](https://github.com/anthropics/skills/pull/1602) & [#1724](https://github.com/anthropics/skills/pull/1724)
**功能：** #1602 修复了 MCP 结果中 `TextContent` 无法序列化的问题及基准指标缺陷；#1724 将默认评估模型升级为 `claude-sonnet-5`。
**讨论亮点：** 直接解决 [#1390](https://github.com/anthropics/skills/issues/1390)（MCP 评估在真实服务器上得分为 0/N 的问题）。
**状态：** OPEN。

### 5) Hivemind 多智能体编排 — [PR #1628](https://github.com/anthropics/skills/pull/1628)
**功能：** 让 Claude Code 将机械性子任务委派给运行免费模型的 headless `opencode` 工作进程，同时由 Claude 继续担任规划者/评审者/合并者 — 一种成本路由模式。
**讨论亮点：** 反映出社区的兴趣点在于*成本感知编排*类基础构件，而非新的领域技能。
**状态：** OPEN，更新于 2026-08-24。

### 6) document-typography — [PR #514](https://github.com/anthropics/skills/pull/514)
**功能：** 针对 AI 生成文档的排版质量保障（孤行/寡行控制、编号对齐）。据称会影响“Claude 生成的每一份文档”。
**讨论亮点：** 一个评论不多但意图坚定的 PR — 自 3 月提交以来一直未被拒绝。
**状态：** OPEN（长期悬置）。

### 7) ODT / OpenDocument Skill — [PR #486](https://github.com/anthropics/skills/pull/486)
**功能：** 创建、填充和解析 OpenDocument Format 文件（`.odt`/`.ods`），包括模板工作流 — 填补了 DOCX/PPTX/XLSX 套件长期遗留的空白。
**讨论亮点：** [#1175](https://github.com/anthropics/skills/issues/1175)（SharePoint/ODF 企业级需求）也印证了这一需求。
**状态：** OPEN，更新于 2026-04-14。

### 8) frontend-design 清晰度改进 — [PR #210](https://github.com/anthropics/skills/pull/210)
**功能：** 重写现有的 `frontend-design` 技能，使每条指令都能在单次对话内执行；缩小幻觉产生的空间。
**讨论亮点：** 与 [#202](https://github.com/anthropics/skills/issues/202) 的“skill-creator 最佳实践”方向一致（现已关闭）。
**状态：** OPEN。

---

## 2. 社区需求趋势（来自 Issues）

| 排名 | 主题 | 依据 | 信号 |
|---|---|---|---|
| 1 | **信任 / 命名空间完整性** | [#492](https://github.com/anthropics/skills/issues/492) — 43 条评论，2 👍 | 仓库中互动量最高的 issue：社区技能冒充 `anthropic/` 命名空间 |
| 2 | **企业级分发** | [#228](https://github.com/anthropics/skills/issues/228) — 16 条评论，**8 👍** | 组织内技能共享（点赞/评论比最高） |
| 3 | **技能触发可靠性** | [#556](https://github.com/anthropics/skills/issues/556) — 12 条评论，7 👍 | `run_eval.py` 显示触发率为 0%；阻塞所有技能编写工作流 |
| 4 | **技能生命周期 / 持久性** | [#62](https://github.com/anthropics/skills/issues/62) — 10 条评论 | 技能悄然消失 — 属于数据丢失类隐患 |
| 5 | **紧凑的智能体记忆** | [#1329](https://github.com/anthropics/skills/issues/1329) — 9 条评论 | 用于长时间运行智能体状态的符号化表示技能 |
| 6 | **插件去重** | [#189](https://github.com/anthropics/skills/issues/189) — 6 条评论，**9 👍** | `document-skills` ∩ `example-skills` 冲突 |
| 7 | **上下文窗口预算管理** | [#1487](https://github.com/anthropics/skills/issues/1487) — 4 条评论 | `claude-api` 技能每次工具调用注入 ~156k tokens |
| 8 | **智能体治理 / 安全** | [#412](https://github.com/anthropics/skills/issues/412) — 6 条评论（已关闭） | 智能体系统的策略执行与审计追踪 |
| 9 | **Skills ↔ MCP 互操作** | [#16](https://github.com/anthropics/skills/issues/16) — 4 条评论 | 通过 MCP 协议暴露技能 |
| 10 | **推理 QA 流水线** | [#1385](https://github.com/anthropics/skills/issues/1385) — 4 条评论，1 👍 | 任务前校准 → 对抗性评审 → 交付门禁 |

**宏观趋势：** 需求重心正从“增加更多技能” → “让技能底座可信、可靠、可治理”转移。排名前四的 issue 中有三个是关于技能系统本身的*元层面*关切，而非对新领域技能的请求。

---

## 3. 高潜力待合并 Skills（有望近期落地）

以下 PR 均具备新鲜的评审活动、清晰的范围，且无冲突 issue：

| 技能 | PR | 接近合并的原因 |
|---|---|---|
| **md2video-audio** | [#1703](https://github.com/anthropics/skills/pull/1703) | 截至 2026-09-15 评审活跃；填补了尚无竞争者的媒体合成细分领域 |
| **pyxel（复古游戏开发）** | [#525](https://github.com/anthropics/skills/pull/525) | 更新于 2026-09-13；范围明确、基于 MCP 服务器的技能 |
| **Buffer API Agent Skill** | [#1627](https://github.com/anthropics/skills/pull/1627) | 更新于 2026-09-05；可移植的技能规范，适合社交自动化演示 |
| **scnet-hpc** | [#1615](https://github.com/anthropics/skills/pull/1615) | 基于配置文件的整洁 SSH/Slurm 封装；运维用户受众明确 |
| **skill-quality-analyzer & skill-security-analyzer** | [#83](https://github.com/anthropics/skills/pull/83) | 直接回应 [#492](https://github.com/anthropics/skills/issues/492) 的信任问题；战略价值高 |
| **document-typography** | [#514](https://github.com/anthropics/skills/pull/514) | 长期待定但无争议；解决一个普遍痛点 |

---

## 4. Skills 生态洞察

**在 Skills 层面，社区最集中的诉求是构建一个可信、可靠的技能调用底座** — 具体表现为三股汇聚的力量：命名空间/身份完整性（[#492](https://github.com/anthropics/skills/issues/492)）、触发正确性（[#556](https://github.com/anthropics/skills/issues/556)、[#1769](https://github.com/anthropics/skills/pull/1769)），以及上下文窗口使用纪律（[#1487](https://github.com/anthropics/skills/issues/1487)）。简而言之：*在增加更多技能之前，先修好让用户能够安全采用既有技能的信任层。*

---

# Claude Code 社区摘要 — 2026-09-15

## 今日要点

今天的发布列车搭载了两个小而实用的更新：**v2.1.272** 带来通用的可靠性修复，**v2.1.271** 为 Claude Code Remote 会话（云端 + 自托管 runner）启用快速模式，并为全屏 `/config` 面板加入鼠标滚轮滚动。Issue 方面，长期持续的 **#38335** "Max 套餐会话限额消耗异常过快" 报告仍以 852 条评论和 476 个点赞主导讨论，而本周技术焦点集中在 Windows + macOS 在 Cowork/Plan9 中的回归问题（#92958）以及 `/release-notes` TUI 渲染问题（#77452）。社区信号持续偏向**逐次调用的 Agent 控制**（effort、advisor、模型）以及**透明的成本/限额 UX**。

---

## 发布

- **[v2.1.272](https://github.com/anthropics/claude-code/releases/tag/v2.1.272)** — Bug 修复与可靠性改进。
- **[v2.1.271](https://github.com/anthropics/claude-code/releases/tag/v2.1.271)** —
  - **Claude Code Remote 会话启用快速模式**（云端与自托管 runner）：宿主端的 `fast` 设置或在会话内输入的 `/fast` 现在在组织允许的范围内均会生效。
  - **全屏模式下 `/config` 的鼠标支持**：滚轮可滚动设置项。

---

## 热门 Issue

1. **[#38335 — 自 2026 年 3 月 23 日起 Max 套餐会话限额消耗异常过快](https://github.com/anthropics/claude-code/issues/38335)**（OPEN · 852 评论 · 👍 476）— 季度内关注度最高的帖子。多名 Max 套餐用户反馈其每周会话额度消耗速度远超公布速率，且无法在 CLI 端复现原因。已被标记为 `[invalid]`，但评论量表明 Anthropic 仍在持续介入。
2. **[#92958 — Cowork Windows：2026 年 9 月累积更新破坏 Plan9 共享挂载](https://github.com/anthropics/claude-code/issues/92958)**（OPEN · 54 评论 · 👍 11）— KB5124012（ARM64）与 KB5124008（x64）回归导致 Cowork 上 `device_bash` 异常；作者在 5 台机器上做了 A/B 回滚测试。对任何以 Windows Cowork + 共享 runner 为标准的团队都很重要。
3. **[#77298 — 为 Agent（Task）工具提供逐次调用的 `effort` 参数](https://github.com/anthropics/claude-code/issues/77298)**（OPEN · 5 评论 · 👍 14）— 高点赞评论比表明社区共识明确。目前要切换单个子代理的 effort 需要编写完整的代理定义文件。
4. **[#73197 — 禁用后台代理的自动 commit / 自动 push / 自动 PR（v2.1.198）](https://github.com/anthropics/claude-code/issues/73197)**（CLOSED · 4 评论 · 👍 5）— 涉及运行"仅提议"工作流的团队，这些团队的后台代理现在默认会对 git 产生副作用。
5. **[#92958/#93382 — Windows PowerShell 启动约 154s + macOS worktreeDepSeed 68 万文件克隆冻结](https://github.com/anthropics/claude-code/issues/94344)**（OPEN · 3 评论）— 两个桌面端的性能回归头条；如果依赖 Cowork/桌面端，值得跟踪。
6. **[#73305 — 在 Max 套餐中继续保留 Claude Fable 5](https://github.com/anthropics/claude-code/issues/73305)**（CLOSED · 10 评论 · 👍 3）— 7 月 1 日重新部署后，Fable 5 改为仅按使用额度计费；用户对该定价模式提出反对。
7. **[#77339 — Opus 4.8 出现工具调用、用户消息和系统提示的幻觉](https://github.com/anthropics/claude-code/issues/77339)**（CLOSED · 10 评论 · 👍 3）— 模型可靠性报告；引出关于以"用户消息"形式呈现的提示注入面问题。
8. **[#72997 — Harness 重复注入相同的上下文块（任务列表、tool-schema 增量、技能正文）](https://github.com/anthropics/claude-code/issues/72997)**（CLOSED · 4 评论）— 具体的 token 经济性分析（实测约 120 万 tokens），揭示 harness 中变更检测的缺口。
9. **[#79782 — 定时任务执行忽略 UI 配置的权限模式和模型](https://github.com/anthropics/claude-code/issues/79782)**（OPEN · 3 评论）— 对在生产环境中使用 `scheduled-tasks` MCP 服务器的用户而言是一个可靠性 Bug。
10. **[#85018 — BigQuery 连接器：`redirect_uri_mismatch` 与粘贴的 OAuth Client ID 看似未被使用](https://github.com/anthropics/claude-code/issues/85018)**（OPEN · 3 评论）— 已三次重新开启（#43959/#48957/#62271），本轮附带完整复现步骤；表明 Google Cloud 连接器需要更深入的集成工作。

---

## 关键 PR 进展

> 过去 24 小时仅 3 个 PR 处于活跃状态，全部列出。

- **[#94184 — mods/diff：固定表头，仅正文滚动](https://github.com/anthropics/claude-code/pull/94184)**（CLOSED）— 将停靠的 `mods/diff` 面板与内置 `/diff` 面板对齐：固定表头、基准行和 8 行文件列表；滚轮在 hunks 上每 tick 滚动 3 行，在文件列表上每 tick 滚动 1 项。增加从 prompt 经 Butter 透传的 ctrl/opt+↑↓ 和 ctrl+x b。提升从 CLI 操作 diff 的键盘一致性。
- **[#71627 — docs(sandbox)：说明 prompt 批准的主机为会话作用域](https://github.com/anthropics/claude-code/pull/71627)**（OPEN）— 在 `examples/settings/README.md` 中加一条澄清，区分 prompt 时批准（恢复会话时丢失）与声明式沙箱配置。对编写需要恢复的长生命周期会话的用户而言虽小但实用。
- **[#83890 — Create pylint.yml](https://github.com/anthropics/claude-code/pull/83890)**（CLOSED）— 仓库卫生：添加 pylint 配置文件，表明仓库正在向更广泛的静态分析覆盖范围开放。

---

## 功能请求趋势

提炼自看板上的热门 Issue 与增强请求：

1. **对子代理的逐次调用控制** — effort（#77298、#73072）、模型（#72871）、advisor — 无需编写单独的代理定义文件。
2. **成本/限额透明化** — 可配置的每周限额预警（#72994）、保留套餐档位中的模型权益（#73305），以及在 #38335 中更清晰的计费逻辑。
3. **TUI / 终端兼容性对齐** — Kitty 协议按能力而非按白名单处理（#71700）、挂起时拆解鼠标追踪（#77752）、`/release-notes` 的 Markdown 渲染（#77452）、prompt 中的项目身份（#73162）、语音模式恢复（#73313）。
4. **更安全的后台代理默认值** — 可关闭自动 commit/push/PR（#73197）；按例程的权限 + 模型覆盖（#72871、#79782）。
5. **MCP 能力差距收口** — Google Docs 原位编辑（#83942）、BigQuery OAuth 修复（#85018）、更精细的 GitHub 集成范围（#72856）。
6. **Harness 效率** — 对重复注入的上下文块进行变更检测/去重（#72997）。
7. **更完善的 hook 触发面** — 在 `/branch` 时触发 `SessionStart`（#73053）。
8. **恢复 UX 便利性** — 重新引入 `/agents` 向导（#72962）。

---

## 开发者痛点

- **Max 套餐成本不可预测** — #38335（852 评论）是单一最强烈的信号，表明会话限额计费不符合用户预期；周边帖（#72994、#73305）进一步强化了这一落差。
- **Windows + macOS 桌面端平台回归** — Plan9 挂载失效（#92958）、PowerShell 启动 154s（#94344）、每个 worktree 整个应用冻结 30s（#93382）、macOS git 间歇性挂起（#75781）。重度桌面/Cowork 用户正同时承受多个并行回归。
- **跨终端模拟器的 TUI 怪异行为** — Kitty、Alacritty 与 Ctrl-Z 挂起各自暴露不同 Bug；在非默认终端中工作的开发者会遇到意外的回退行为（#71700、#77752、#77452）。
- **后台代理副作用** — 7 月 1 日默认开启的自动 commit/push/PR 让各团队措手不及（#73197）；定时任务的权限和模型选择也存在部分失效（#79782、#72871）。
- **Harness 层面的 token 低效** — 经核实的重复注入相同上下文块（#72997）推高成本并稀释长会话中的信号。
- **模型可靠性隐忧** — Opus 4.8 出现工具调用/系统提示幻觉（#77339），以及在合法 Jira DELETE 上的分类器误报（#89557），都削弱了用户对自主模式的信任。
- **与竞品代理相比的 MCP 能力差距** — Google Docs 没有编辑工具（#83942），BigQuery OAuth 损坏（#85018），GitHub 集成超出仓库范围（#72856）。
- **对自身工具的知识盲区** — Claude 自身在推荐 resume 标志时给出错误（`-c` 与 `-r` 之分）（#72946），这一自指式 UX 问题值得特别指出。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-15

## 今日要点
Codex 项目在过去 24 小时内发布了 v0.155.0 的四个 Rust alpha 构建，PR 工作主要集中在整合 **Guardian 审查器** 和 **AgentControl** 架构上（合并了 5 个相关 PR）。社区痛点集中在长期存在的 **macOS CPU/内存失控** 问题（#25719，397 👍）以及一组新出现的 **Windows 桌面会话 Bug**（影响发送按钮、最近聊天列表和项目上下文同步）。

## 版本发布
过去 24 小时发布了 Rust 0.155.0 系列的四个 alpha 标签。虽未附带详细更新日志，但发布节奏（一周内推出六个 alpha 标签）表明正处于活跃的稳定化阶段：
- [`rust-v0.155.0-alpha.6`](https://github.com/openai/codex) — [Release 0.155.0-alpha.6](https://github.com/openai/codex)
- [`rust-v0.155.0-alpha.5`](https://github.com/openai/codex) — [Release 0.155.0-alpha.5](https://github.com/openai/codex)
- [`rust-v0.155.0-alpha.4`](https://github.com/openai/codex) — [Release 0.155.0-alpha.4](https://github.com/openai/codex)
- [`rust-v0.155.0-alpha.2.4`](https://github.com/openai/codex) — [Release 0.155.0-alpha.2.4](https://github.com/openai/codex)

## 热门 Issue

1. **[#25719 — macOS `syspolicyd`/`trustd` CPU 与内存失控](https://github.com/openai/codex/issues/25719)**（90 条评论，397 👍）。获赞最多的开放 Bug。macOS 上的 Codex Desktop 会触发 Apple 系统守护进程的 CPU 和内存占用失控。这是一个严重的性能回退，自六月起一直处于开放状态。
2. **[#42215 — Windows ChatGPT Work：项目上下文同步失败](https://github.com/openai/codex/issues/42215)**（33 条评论）。ChatGPT Windows 应用中基于项目的本地聊天在文件系统阶段失败，阻塞了 Windows 用户的一整套工作流。
3. **[#41566 — 分页 rollout 发出重复序号，冻结线程历史](https://github.com/openai/codex/issues/41565)**（33 条评论）。在未完成的回合之后，rollout 可能重新发出序号，导致会话投影被永久损坏 —— 一个接近数据丢失的会话 Bug。
4. **[#39855 — Windows Remote：畸形路径导致信任校验失败](https://github.com/openai/codex/issues/39855)**（19 条评论，12 👍）。每个新的无项目远程聊天都因畸形路径无法通过信任校验，阻塞了整个远程工作流。
5. **[#13270 — 工具调用出现 `invalid_request_error: string too long`](https://github.com/openai/codex/issues/13270)**（19 条评论）。超长工具调用参数（1.5MB+）触及 1MB 的服务端上限，并抛出晦涩的错误。影响任何进行大型上下文编辑的 Agent。
6. **[#17793 — TUI Backspace 删除多个字符](https://github.com/openai/codex/issues/17793)**（19 条评论，5 👍）。Kitty（及其他终端）上一个长期存在的 TUI 编辑器 Bug，Backspace 会一次性删除多个字符，导致提示词编辑不可靠。
7. **[#40858 — Native subagent 忽略显式 `model_provider` 覆盖](https://github.com/openai/codex/issues/40858)**（18 条评论，12 👍）。当子 Agent 上设置了 `--model` 时，`model_provider` 会被静默丢弃，阻塞了多 Agent 场景下的自定义 Provider 工作流。
8. **[#44135 — Windows Chrome 控制：`nodeRepl.fetch request failed`](https://github.com/openai/codex/issues/44135)**（16 条评论）。通过 Chrome 扩展进行的浏览器控制在 Windows 上失败，尽管应用内标签页列表可以正常工作 —— Edge 回退方案同样失效。
9. **[#45119 — macOS 14.2 沙箱启动失败：`unbound variable TIOCSTI`](https://github.com/openai/codex/issues/45119)**（14 条评论）。在 macOS 14.2 上由于 Seatbelt 脚本中存在未绑定的 shell 变量，沙箱在调用任何模型之前就初始化失败。
10. **[#34349 — 功能请求：彻底禁用 Pets](https://github.com/openai/codex/issues/34349)**（13 条评论，54 👍）。社区强烈要求提供一个能彻底关闭、并同时移除侧边栏入口的硬开关。这是待办列表中获赞最多的 UX 抱怨。

另外值得关注：经过长期呼吁，[#205 .codexignore](https://github.com/openai/codex/issues/205)（55 👍）已关闭；同时出现 **三份内容相同的报告**（[#38199](https://github.com/openai/codex/issues/38199)、[#45613](https://github.com/openai/codex/issues/45613)、[#45638](https://github.com/openai/codex/issues/45638)），均反映 **GPT-5.3-Codex-Spark 在模型选择器中不可见，尽管配额仍然显示**。

## 关键 PR 进展

1. **[#45677 — 将 Guardian 审查报告与拒绝统计迁入扩展](https://github.com/openai/codex/pull/45677)**。`SynchronousReview` 现在负责评估事件、遥测、拒绝统计和证据记录决策 —— 让审查策略与动作准备之间的职责分离更加清晰。
2. **[#45672 — 统一 Guardian 审查器的生命周期所有权](https://github.com/openai/codex/pull/45672)**。通过取消守卫将可复用的审查器和临时分叉绑定到其生命周期；被取消的审查器在复用前会被替换，并经由 `ReviewerTasks` 共享。
3. **[#45676 — 将派生子 Agent 的中断规则迁入 `AgentControl`](https://github.com/openai/codex/pull/45676)**。将 V2 中断校验与分发抽取为 `AgentControl::interrupt_spawned_agent`，并配套类型化错误。
4. **[#45670 — 将 V2 Agent 消息投递迁入 `AgentControl`](https://github.com/openai/codex/pull/45670)**。集中处理目标校验、运行时重载和消息投递；明文与结构化载荷得到统一处理。
5. **[#45669 — 在 agent 模块中集中子 Agent 配置](https://github.com/openai/codex/pull/45669)**。新增 `agent::child_config` 与 `prepare_agent_spawn_config`，让多 Agent 的两个版本共享同一套辅助函数，同时保留各版本独立的模型优先级。
6. **[#45602 — 修正限流与配额错误的重试分类](https://github.com/openai/codex/pull/45602)**。`slow_down` 现在归类为可重试的速率限制；耗尽的额度与消费上限不再下落到通用可重试的流错误。对于遇到 [#38199](https://github.com/openai/codex/issues/38199) 等问题的用户很有参考价值。
7. **[#45612 — 在 TUI 中渲染独立展示数学公式](https://github.com/openai/codex/pull/45612)**。展示型公式获得空间布局（不再仅依赖内联 Unicode），并在分隔符仍在流式传输时仍可编辑。
8. **[#45580 — 通过 CLI 显式替换守护进程包](https://github.com/openai/codex/pull/45580)**。新增 `codex app-server daemon update --from-cli`，支持安全（且可逆）的守护进程包切换，包括降级与本地构建版本。
9. **[#45559 — 服务重启后恢复 Windows 沙箱注册刷新](https://github.com/openai/codex/pull/45559)**。在就绪状态被撤销、服务重启中断了响应的情况下重新执行预配流程 —— 修复了一类 Windows 沙箱状态陈旧的问题。
10. **[#45548 — 在 Seatbelt 中遵守预置的 Unix 套接字权限](https://github.com/openai/codex/pull/45548)**。`ManagedNetworkSandboxContext` 现在使用预置的 `allow_unix_sockets`/`dangerously_allow_*`，而不再继承自活动代理的更宽泛权限。

## 热门讨论

**Ideas**
- **[#13287 — 长时域、多会话开发支持的使用场景](https://github.com/openai/codex/discussions/13287)**（12 条评论）。issue #13241 的姊妹帖；社区正在围绕持久化、多会话 Agent 工作流打磨一份具体的提案 —— 这是关于项目长期方向的最具实质性的开放讨论。

**Show and tell**
- **[#45392 — Fishbowl：读取 Codex rollout 文件](https://github.com/openai/codex/discussions/45392)**（1 条评论）。一个用于读取 `~/.codex/sessions/.../rollout-*.jsonl` 的本地只读查看器；作者指出 Codex rollout schema 的易用性逊于 Claude Code。
- **[#45659 — Quota Reset Watch](https://github.com/openai/codex/discussions/45659)**（0 条评论）。一份带原始来源链接的 Codex 重置公告历史记录 —— 结合当前的 Spark 配额投诉尤为相关。
- **[#45486 — UI 设计 Agent 工具包](https://github.com/openai/codex/discussions/45486)**（0 条评论）。一个项目级工作流，禁止 Agent 自由发挥 UI：调研 → 冻结计划 → 设计契约 → 浏览器验证的实施。
- **[#45474 — CoCo（Codex Coordinator）](https://github.com/openai/codex/discussions/45474)**（0 条评论）。一个本地 CLI + MCP 接口，可在多个终端和代码仓库之间以隔离的 Git 工作树与独立 Codex 会话运行 **并行 Codex Agent**。

## 功能请求趋势

- **隐私/排除控制** —— `.codexignore`（已关闭，预计已上线）表明社区对

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-15

## 今日要闻

每晚构建已发布 **v0.61.0-nightly.20260915.g9c1b0a610**，但议题追踪器上真正的动向集中在 **子智能体可靠性与 Auto Memory 子系统**。一组 `area/agent` 的 P1 缺陷——尤其是通用智能体卡死（#21409）以及子智能体在触发 `MAX_TURNS` 后静默上报 `GOAL`（#22323）——主导了讨论；同时一组相互呼应的 `Auto Memory` 议题（#26516、#26522、#26523、#26525）表明记忆管线正在认真加固。在 PR 侧，**L4XB** 一人就贡献了五项针对性修复，涵盖输入处理、沙箱扩展、凭据日志以及 SDK shell 选项。

## 发布

- **v0.61.0-nightly.20260915.g9c1b0a610** — 自动化每晚版本号更新；除对比链接外未发布变更日志：[compare commits](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260914.g9c1b0a610...v0.61.0-nightly.20260915.g9c1b0a610)。

## 热门议题

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子智能体在 MAX_TURNS 后误报 `GOAL` 成功** *(P1, 13 评论)*。`codebase_investigator` 在到达轮次上限中途完成分析，但外层包装仍报 `Termination Reason: "GOAL"`——这是一种危险的假阳性，会对用户隐藏被打断的工作。
2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖操作系统沙箱 & 执行后意图路由** *(P2, 9 评论)*。一个长期的设计 EPIC，呼吁 CLI 在合适的操作系统沙箱下充分利用 Gemini 3 原生的 bash 亲和力（`grep`/`sed`/`awk` 链式调用），而不是堆砌沉重的自定义工具脚手架。
3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用智能体无限期卡死** *(P1, 8 评论, 👍 8)*。即便是简单的文件夹创建也会让通用智能体一直停滞，直到用户强行取消；禁用子智能体委派是当前唯一已知的临时绕过方案。该议题获赞数最多。
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC：基于 AST 的文件读取、搜索与代码库映射** *(P2, 7 评论)*。追踪基于 AST 的工具（如 `tilth`/`glyph`）能否通过输出精确的方法边界替代"消防水龙头"式的整段读取，从而把每轮约 36k token 的基线降下来。
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 很少调用自定义技能或子智能体** *(P2, 6 评论)*。用户反馈不得不**强制**模型去使用其 `gradle`/`git` 技能包，说明描述与发现机制仍需打磨。
6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — 确定性脱敏与精简 Auto Memory 日志** *(P2, 5 评论)*。机密信息目前会**先**进入抽取模型再被脱敏，技能内容也可能经由日志泄露——这是 Auto Memory 管线上一处需要填补的明显加固缺口。
7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — 命令完成后 Shell 仍卡在 "Waiting input"** *(P1, 4 评论, 👍 3)*。一个简单的 shell 命令执行完毕后，CLI 仍停在 "Awaiting user input"——反复出现的体验小刺。
8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子智能体在 Wayland 下失败** *(P1, 4 评论)*。浏览器子智能体在 Wayland 下中止，并抛出了与 #22323 相同的误导性 `GOAL` 终止原因——可能存在共同的根因。
9. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) — `browser_agent` 韧性：会话接管与锁恢复** *(P3, 4 评论)*。当前在持久化 profile 被锁定时会直接 fail-fast，而不会接管会话。
10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 注册工具数超过约 400 时报 400 错误** *(P2, 3 评论)*。超过一定规模的工具目录会直接撑爆请求；需要更智能的作用域内工具筛选。

## 关键 PR 进展

1. **[#29335](https://github.com/google-gemini/gemini-cli/pull/29335) — 在对象展开时保留 `AgentLoopContext` 属性** *(P1, core)*。`Config` 类原本通过原型 getter 暴露上下文，导致 `...spread` 静默丢弃这些属性。修复了一类"工具莫名其妙收到 `undefined` 配置"的缺陷。
2. **[#29328](https://github.com/google-gemini/gemini-cli/pull/29328) — 在 A2A 服务端日志中遵循 `LOG_LEVEL` 并对凭据脱敏** *(P1, security)*。原本允许列表已经把 `LOG_LEVEL` 注入到 `process.env`，但 logger 写死了 `level: 'info'`；该 PR 同时清除了日志输出中的凭据。
3. **[#29333](https://github.com/google-gemini/gemini-cli/pull/29333) — 对所有基于约定的策略目录进行权限校验** *(P2, enterprise)*。`filterSecurePolicyDirectories` 此前只对系统策略目录执行 `isDirectorySecure`；用户和工作区策略目录默认被信任，构成了真实的供应链风险，该 PR 予以修复。
4. **[#29336](https://github.com/google-gemini/gemini-cli/pull/29336) — 为非系统策略目录收紧写权限** *(P2, enterprise, large)*。作为 #29333 的姊妹 PR：在 POSIX 与 Windows 上对 default、user 与 workspace 策略目录强制要求当前用户拥有所有权。*(Closes #29311。)*
5. **[#29332](https://github.com/google-gemini/gemini-cli/pull/29332) — 限制沙箱扩展的递归深度** *(P2, core)*。一个总是回答 `sandbox_expansion_required` 的工具此前会无限递归自身直至 OOM，现已加上边界。
6. **[#29330](https://github.com/google-gemini/gemini-cli/pull/29330) — 日志器响应期间不丢失用户输入** *(P2, cli)*。修复了一处 React StrictMode 纯净性违规——`setPastSessionMessages` 此前被在 `setCurrentSessionMessages` 的 updater 内部调用。
7. **[#29329](https://github.com/google-gemini/gemini-cli/pull/29329) — 截断后暂停 stdin，并在 stdin 被放弃时给出提示** *(P2, cli)*。不再调用不可逆的 `process.stdin.destroy()`，并在输入被丢弃时给出明确提示。
8. **[#29327](https://github.com/google-gemini/gemini-cli/pull/29327) — 在 `SdkAgentShell.exec` 中正确应用 `AgentShellOptions.env` 与 `timeoutSeconds`** *(P2, agent/sdk)*。两个字段此前只被解析、未被真正应用——`exec('sleep 30', { timeoutSeconds: 1 })` 实际等满了 30 秒。
9. **[#29304](https://github.com/google-gemini/gemini-cli/pull/29304) — 截断时不要拆散 UTF-16 代理对** *(core, small)*。处于截断边界的 emoji 此前会被静默丢弃，现已能完整保留代理对。
10. **[#29242](https://github.com/google-gemini/gemini-cli/pull/29242) — 停止在 `isAuthenticationError` 中对 `'401'` 进行子串匹配** *(P2, core)*。端口号 `4012` 或任何包含 `401` 这几个数字的错误都可能触发错误的重新认证流程，已替换为按状态码匹配的判断。

> 值得一提：[#29326](https://github.com/google-gemini/gemini-cli/pull/29326) 修复了 `unassign-inactive-assignees` 工作流中一处缺失的 `for` 循环——对维护者自动化来说是个安静但实在的修复。

## 功能请求趋势

- **智能体的自感知与可发现性。** 多个议题（#21968、#21432）都希望 Gemini 能在不被显式提示的情况下，自行**找到并使用**自身的技能、子智能体、开关与快捷键。
- **精准、克制的上下文加载。** 基于 AST 的 EPIC（#22745）、`Tactful Extraction` 提案（#19561）以及持久化任务追踪器（#18836、#21000）都指向同一个目标：通过精确读取与外部化状态，把每轮约 36k token 的基线压下去，而不是在上下文里堆砌冗余信息。
- **加固 Auto Memory 管线。** 几乎同时出现的一组议题（#26516、#26522、#26523、#26525）呼吁确定性的机密脱敏、对低信号会话的有界重试，以及对格式错误的 inbox patch 增强可观测性。
- **更安全的 Shell / 文件系统执行。** 破坏性命令防护（#22672）、零依赖操作系统沙箱（#19873）以及更严格的工具数量作用域（#24246）正在汇合成一套更克制的执行模型。
- **浏览器智能体走向成熟。** 韧性修复（#22232、#22267）、Wayland 支持（#21983）以及轨迹共享（#22598）都表明浏览器子智能体正在从原型阶段毕业。

## 开发者痛点

- **误导性的终止信号。** 子智能体在 `MAX_TURNS`（#22323）或在 Wayland 上崩溃后（#21983）仍上报 `GOAL`，动摇了用户对智能体循环的信任——他们根本无法判断任务是否真的完成了。
- **简单操作上的卡死。** 通用智能体停滞（#21409）以及执行完命令后卡在 "Waiting input"（#25166），让 CLI 即便在琐碎任务上也显得不可靠。
- **技能与子智能体被低估。** 尽管技能/子智能体系统具备扩展性，模型仍常常忽略它们（#21968），除非被人工提醒，削弱了社区扩展的价值。
- **记忆管线的信任问题。** Auto Memory 当前是在机密进入模型上下文**之后**才做脱敏，并把技能内容以明文写入日志（#26525），给企业用户的安全审查制造了摩擦。
- **工具目录上限。** 在约 400 个工具时遭遇 400 错误（#24246），对组装了大量 MCP/工具集的重度用户并不友好，只能被迫手动裁剪作用域。
- **CLI 交互细节。** 软链接形式的智能体不可见（#20079）、软链接/文件工具的交互问题、以及截断过程中输入被静默丢失（#29330）——这些都反映出"重度用户的真实文件系统"与 CLI 默认假设之间的摩擦。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-15

## 今日要点

1.0.84 发布波次带来了三个预发布版本，聚焦于开发者使用体验：简洁的会话记录视图将工具调用活动归并为可展开的工作摘要、Agent Factory 运行的暂停/恢复、以及新增的 `/config` 侧边栏和 `/sandbox` 的网络主机允许/拒绝规则。与此同时，Issue 跟踪列表被一类长期存在的会话稳定性问题主导——跨 Windows/Linux/macOS 多次报告恢复时 OOM、压缩循环、过期的会话锁文件——以及一波 MCP/OAuth 认证失败激增，尤其是围绕 CIMD 重定向 URI 处理和 Azure 注册表校验。一个长期悬而未决的社区请求——vi/vim 输入模式（Issue #13，76 👍）——在将近一年后终于被关闭。

## 发布版本

**v1.0.84-8** ([release](https://github.com/github/copilot-cli/releases/tag/v1.0.84-8))
- *新增：* `transcriptView: "concise"` 将工具调用活动折叠为可展开的工作摘要。
- *改进：* `/factories` 对话框支持 Agent Factory 运行的暂停/恢复。
- *修复：* 登录、切换账号和登出后，模型列表能正确刷新。

**v1.0.84-7** ([release](https://github.com/github/copilot-cli/releases/tag/v1.0.84-7))
- *修复：* 被归类为仅 adaptive 的 Claude 模型现在保持 adaptive；当禁用思考时，推理强度上限为 *high*，而不是直接报错。
- *修复：* 当 `/clear` 关闭一个活跃会话时，`sessionEnd` 钩子现在能正确触发。

**v1.0.84-6** ([release](https://github.com/github/copilot-cli/releases/tag/v1.0.84-6))
- *新增：* `/config` 在 CLI 内打开一个侧边栏配置界面。
- *新增：* `/sandbox` 网络主机允许/拒绝规则，且保留既有的上游代理配置。
- *改进：* 受管的 Edit/Write 规则现在覆盖原生 shell 重定向以及支持的原地 `sed` 模式。

## 热门 Issue

1. **[#13] 新增 vi/vim 输入模式** — ([closed](https://github.com/github/copilot-cli/issues/13)) 一个长期且高赞的功能请求（76 👍，13 条评论），来自模态编辑器用户。在约 12 个月后关闭，表明团队已将键盘驱动的导航作为交互式 REPL 的优先项。

2. **[#54] 与 VS Code Copilot Chat 的设置和能力集成** — ([closed](https://github.com/github/copilot-cli/issues/54)) 请求让 CLI 作为现有 VS Code Copilot Chat 配置的批量/CLI 入口。关闭该 Issue 暗示两个界面间的对等工作正在进行。

3. **[#4664] 恢复长会话时 CLI 因 JavaScript 堆 OOM 而崩溃** — ([open](https://github.com/github/copilot-cli/issues/4664)) V8 在用户能交互之前就触达约 4 GB。与 #4251、#4699、#4725 和 #4780 互为关联——这已成为一类反复出现的问题，而非常规边缘情况。

4. **[#4725] Linux 下频繁出现 JavaScript 堆 OOM** — ([open](https://github.com/github/copilot-cli/issues/4725)) 每隔几分钟就在 V8 分配约 4 GB 时崩溃。对最看重稳定性的无人值守/自动化工作流影响尤其严重。

5. **[#1148] CLI 在 Windows 上将 LF 转换为 CRLF** — ([open](https://github.com/github/copilot-cli/issues/1148)，8 👍) Edit/Write 工具会按某种规则规范化换行符，与用户意图相悖，破坏跨平台仓库和 `git diff` 的整洁性。

6. **[#4525] MCP 服务器在收到现代 `server/discover` 之后又收到旧版 `initialize`** — ([closed](https://github.com/github/copilot-cli/issues/4525)) 1.0.81-1 发送了一个重复的旧版探测，导致对 Python MCP SDK 2.0.0 服务器触发 `-32022` 错误。关闭该 Issue 表明协议协商已被清理。

7. **[#4251] 1.0.74 vs 1.0.73 的恢复 OOM 回归** — ([open](https://github.com/github/copilot-cli/issues/4251)) 受控的 A/B 对比精确定位了该回归，并报告约 3–4 倍的内存增长。是 OOM 问题族的理想 bisect 锚点。

8. **[#4699] OOM 崩溃转储被写入用户当前工作目录** — ([open](https://github.com/github/copilot-cli/issues/4699)) 除了崩溃本身，Node 的诊断信息还被随机落到了工作目录，污染了仓库——这是一个值得指出的二阶问题。

9. **[#4849] 降低子智能体工作流中的延迟** — ([open](https://github.com/github/copilot-cli/issues/4849)) 指出在 agent → review → fix 循环中，分钟级的启动开销和往返耗时。明确请求对子智能体运行时做一次架构层面的性能优化。

10. **[#4549] Windows 下每次 shell 命令都会弹出 PowerShell 控制台窗口** — ([open](https://github.com/github/copilot-cli/issues/4549)) 每次工具调用都会以可见（而非隐藏）方式拉起 `conhost`，导致普通 agent 操作时焦点被频繁夺取。

*(值得关注的次热门：[#4556](https://github.com/github/copilot-cli/issues/4556) 插件市场静默认证中断、[#4639](https://github.com/github/copilot-cli/issues/4639) 事件存储 500 事件重试风暴、[#4780](https://github.com/github/copilot-cli/issues/4780) 永久致会话失效的压缩循环、[#4793](https://github.com/github/copilot-cli/issues/4793) / [#4800](https://github.com/github/copilot-cli/issues/4800) CIMD OAuth 重定向端口不匹配、[#4847](https://github.com/github/copilot-cli/issues/4847) 受管设置刷新破坏 IDE MCP 重载。)*

## 关键 PR 进展

过去 24 小时内没有 Pull Request 更新，因此本节有意省略。

## 功能请求趋势

在最近的 Issue 浪潮中，几个主题反复出现：

- **编辑器级别的交互质量。** Vim 输入模式 (#13)、更好的 plan 模式渲染 (#4841)、感知终端主题的色彩 (#4843)，以及 Windows 上更低干扰的 shell 执行 (#4549)——这些都指向一个趋势：将 CLI 视为日常 IDE 替代品，而非一个轻薄的 REPL。
- **沙箱策略的细粒度化。** 新的 `/sandbox` 主机规则（1.0.84-6）、`python` 策略绕过 (#4846)、以及为 `--yolo` 设定的独立企业作用域 (#4783) 表明团队正在构建一个更丰富、更可组合的安全模型。
- **子智能体使用体验。** 更低延迟 (#4849)、有界的子智能体生命周期 (#4850)，以及对运行中 review agent 的更好可见性构成一条连贯线索——多智能体故事正在成为一等公民的工作流。
- **设置的可移植性。** #54（复用 VS Code Copilot 配置）和 #4845（跨机器的会话生命周期）都在呼吁让 CLI 与编辑器体验感觉像同一个产品。

## 开发者痛点

- **长会话稳定性是头号摩擦点。** 恢复时 OOM (#4664、#4725、#4251、#4699)、使会话砖掉的压缩循环 (#4780、#4506)、在 23% 上下文时强制压缩的看门狗 (#4506)，以及过期的 `inuse.<pid>.lock` 文件 (#4805)——全都击中了同一类用户：在编辑器里跑多日会话的人。
- **MCP/OAuth 集成很脆弱。** #4525（已关闭）、#4556、#4793、#4800、#4604、#4842 和 #4851 合在一起描绘出一幅 MCP 认证边缘场景的图景——CIMD 重定向 URI、GitHub token 注入、并发 401 刷新、Azure 注册表校验——这些都在阻塞实际的集成落地。
- **跨平台正确性。** Windows CRLF 损坏 (#1148)、Windows PowerShell 闪烁 (#4549) 以及 macOS Warp 主题不匹配 (#4843) 反复出现——CLI 在不同宿主平台上的体验仍不均衡。
- **受管策略的边界场景。** `--yolo` 被预认证 fail-closed 姿态吞掉 (#4844)、受管设置刷新破坏 `/allow-all` 和 IDE MCP 重载 (#4847)，以及 OAuth CIMD 端口不匹配 (#4793、#4800) 都表明：本地开关、服务端策略与刷新时机之间的相互作用仍需加固。
- **UX 清晰度缺口。** #4848（"Save feedback bundle" 被误读为提交反馈）和 #4841（自定义 agent 的 plan 面板空白）虽小，却会侵蚀成熟流程中的信任。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-15

## 今日要点

**v1.18.31 作为针对 v1.18.30 回归问题的热修复版本发布**，该回归在 macOS 及部分 Linux 环境下导致所有提示词抛出 `TypeError: undefined is not an object (evaluating 'a.name')` 错误（#48645、#48811、#49158）。此版本恢复了 1.18.30 中丢失的 ACP 会话边界，并在启动阶段暴露远程配置的鉴权错误。与此同时，长期存在的 CPU 回归问题（#30086）以及社区对新侧边栏布局的强烈反对（#48882）仍是用户最关注的议题。

## 发布

### v1.18.31 — 热修复
- **核心：** 在加载、恢复和分叉会话时，恢复 ACP 会话模型、effort、mode 和 reasoning chunk 的边界（@JacobNWolf）。
- **TUI：** 远程配置鉴权错误现在会在启动阶段暴露，并以失败状态退出，而不是静默失败。
- **扩展：** 改进项（源文中已截断）。

→ [v1.18.31](https://github.com/anomalyco/opencode/releases/tag/v1.18.31)

---

## 热门 Issue

**#30086 — 新版本中 CPU 占用过高** *(53 条评论，29 👍)*
用户反馈 OpenCode 在近期更新后，从能够支撑 10+ 并发会话退化到 3 个会话就吃力，并伴随严重的鼠标光标卡顿。这是当前讨论最多的开放性性能回归问题，直接影响运行并行 agent 工作流的高阶用户。
→ [Issue #30086](https://github.com/anomalyco/opencode/issues/30086)

**#6651 — 通过 Task 工具为子 agent 动态选择模型** *(41 条评论，80 👍)*
主 agent 调用 Task 工具时无法选择子 agent 使用的模型。该特性请求以 80 个点赞高居榜首，显示出社区对嵌套 agent 执行中成本/质量控制的强烈需求。
→ [Issue #6651](https://github.com/anomalyco/opencode/issues/6651)

**#16017 — Go 套餐用量/余额 API 接口** *(已关闭，35 条评论，138 👍)*
本期摘要中点赞数最高的 issue。Go 订阅用户希望以编程方式获取滚动/每周/每月的用量数据，以便构建外部仪表盘和预算告警。已关闭说明该工作可能已在其他地方推进。
→ [Issue #16017](https://github.com/anomalyco/opencode/issues/16017)

**#48741 — Muse Spark 系列在 Zen 上处理图像/工具调用时出现严重错误** *(27 条评论，6 👍)*
`reasoning encrypted_content was not issued to this caller` 错误导致 Muse Spark 在 Zen 上处理图像或触发工具调用时崩溃。该问题被标记为 2.0 版本的阻塞项，下文 PR #48908 直接将其关闭。
→ [Issue #48741](https://github.com/anomalyco/opencode/issues/48741)

**#39845 — DeepSeek V4 Flash 突然要求启用"中国托管模型"** *(23 条评论，27 👍)*
会话中途失败迫使用户启用中国托管模型，被视为未经预告的破坏性行为变更，已阻塞生产工作流。
→ [Issue #39845](https://github.com/anomalyco/opencode/issues/39845)

**#48882 — 恢复带持久化左侧边栏的旧版 UI** *(18 条评论，23 👍)*
针对 PR #20242 侧边栏改版的强烈负面反应：用户希望提供配置选项以回到经典的双面板布局。可与下文的 #38230 桌面端开关搭配使用。
→ [Issue #48882](https://github.com/anomalyco/opencode/issues/48882)

**#48811 — macOS：每个提示词都因 `undefined is not an object (evaluating 'a.name')` 失败** *(9 条评论，36 👍)*
高互动度的 macOS 专属崩溃报告，问题指向 `SystemPrompt.environment`。已确认为 v1.18.30 的回归，由 v1.18.31 解决。
→ [Issue #48811](https://github.com/anomalyco/opencode/issues/48811)

**#48645 — 1.18.30 回归：每个提示词在 SystemPrompt.environment 崩溃** *(7 条评论，12 👍)*
v1.18.31 修复的权威回归工单。已确认 1.18.18 可正常工作；1.18.30 在首次无工具调用的提示词上即可复现崩溃。
→ [Issue #48645](https://github.com/anomalyco/opencode/issues/48645)

**#36682 — 安全问题：压缩摘要中注入了可执行指令** *(4 条评论)*
自动压缩摘要中可能包含"下一步行动"计划，模型会在未经用户同意的情况下执行——一旦会话中混入外部内容，便构成提示词注入向量。虽然评论数较少，但具有安全相关性，值得持续关注。
→ [Issue #36682](https://github.com/anomalyco/opencode/issues/36686)

**#29094 — LLM 响应期间阅读聊天记录会导致视口重新贴底** *(10 条评论，3 👍)*
自动关闭后重新开启：在流式输出期间向上滚动阅读历史记录不可能实现，因为视口在每个 token 上都贴向底部。属于高阶用户的体验回归。
→ [Issue #29094](https://github.com/anomalyco/opencode/issues/29094)

---

## 重点 PR 进展

**#47510 — fix(core)：压缩已被取代的持久化事件快照**
针对 `event` 表的无界增长，通过 GC 清理已被取代的快照。关闭 #47223，并合并了若干重复工单（#47512、#47513、#33356、#46833、#47022）。对长生命周期会话尤为重要。
→ [PR #47510](https://github.com/anomalyco/opencode/pull/47510)

**#48908 — fix(session)：在 provider 拒绝时恢复陈旧的加密 reasoning**
直接关闭 #48741——恢复 Responses-API 模型会话时，旧运行的陈旧 `encrypted_content` 会导致拒绝；该 PR 改为清除或刷新该字段，而非直接报错。
→ [PR #48908](https://github.com/anomalyco/opencode/pull/48908)

**#49145 — fix(build)：允许 --baseline 仅构建 macOS 基线目标**
修复非 AVX 的 Intel Mac（Westmere、Xeon X5690）上的 SIGILL 崩溃——这些机器上打包的 bun-darwin-x64 启用了 AVX2。`--baseline` 标志现在可以正确产出单个兼容二进制。
→ [PR #49145](https://github.com/anomalyco/opencode/pull/49145)

**#49155 — fix(app)：在 question dock 自定义输入中忽略 IME 组字按键**
修复 #49154：日文/中文 IME 用户无法在桌面端 question dock 中确认假名汉字转换，因为 Enter/Escape 总是被用来提交/关闭。重要的无障碍/i18n 修复。
→ [PR #49155](https://github.com/anomalyco/opencode/pull/49155)

**#49106 — fix(client)：在快照读取期间保留 inbox 事件**
原实现中延迟到达的 HTTP 响应会在重连时覆盖较新的 inbox 事件，导致已回答的问题再次显示为待处理。该 PR 解决了服务端快照与客户端重新拉取之间的排序/竞态问题。
→ [PR #49106](https://github.com/anomalyco/opencode/pull/49106)

**#49151 — feat(mcp)：列出 MCP 服务器暴露的工具**
新增 CLI 接口 `opencode mcp tools`（以及 `... tools <name>` 用于查看描述）。关闭 #41499，将 MCP 自省提升为一等公民——对调试工具密集的配置非常有用。
→ [PR #49151](https://github.com/anomalyco/opencode/pull/49151)

**#47999 — fix(tui)：按服务器隔离已保存标签页**
防止远程 TUI 在连接服务器时继承或覆盖本地用户的已保存标签页/选中项。
→ [PR #47999](https://github.com/anomalyco/opencode/pull/47999)

**#49061 — fix(session)：无论 finish reason 如何都对空补全结果进行重试**
在 #40531 的基础上扩展，也对 `finish: "stop"` 情况进行重试，不再仅限于 `"unknown"`。减少因 provider 返回空补全但使用正常停止原因导致的"Failed to send prompt"波动性失败。
→ [PR #49061](https://github.com/anomalyco/opencode/pull/49061)

**#49071 — fix(ai)：对 openai prompt cache key 使用白名单**
阻止 `packages/ai` 无条件将 `promptCacheKey` 改写为 `prompt_cache_key`，该行为会破坏不接受此别名的 provider。关闭 #45113。
→ [PR #49071](https://github.com/anomalyco/opencode/pull/49071)

**#38308 — feat(app)：可选的纵向标签栏**
在 Settings › General 下新增可选的纵向标签布局，可调整大小并折叠。横向标签仍为默认。关闭 #36942。
→ [PR #38308](https://github.com/anomalyco/opencode/pull/38308)

---

## 特性请求趋势

1. **Go 套餐的成本与用量可见性** — 在 TUI（#42776）、通过 API（#16017，138 👍）以及预算守护中暴露订阅用量/余额。这是本期摘要中需求最集中的能力方向。
2. **子 agent / 多 agent 控制** — 每次 Task 调用动态选择模型（#6651，80 👍）、agent-factory 插件（#49161）、更丰富的 Plan UI 对等（#49135）共同指向对一等公民多 agent 编排的明确推进。
3. **UI 还原与布局灵活性** — 旧版持久化侧边栏（#48882）、永久的 Old/New UI 开关（#38230）、可选的纵向标签栏（#38308）、统一的 Thinking/Patch 指示器（#44164）以及自动折叠的响应行（#49088），均表明用户希望对信息密度拥有更多控制权。
4. **Provider 覆盖与接入** — 新增 provider xKiro（#49157）、QVAC（#35119）以及波斯语本地化（#47783），表明生态持续扩张。
5. **MCP 工具链成熟化** — 工具列表 CLI（#49151）、预热/预生成（#48743）以及静默 OAuth/RFC 8707 修复（#46316）标志着 MCP 正从实验性集成面演进为稳定的一等集成面。

---

## 开发者痛点

- **v1.18.30 回归级联效应** — 单个 `SystemPrompt.environment` 的 TypeError 导致 macOS 和部分 Linux 用户的所有提示词崩溃（#48645、#48811、#49158）。v1.18.31 提供了即时修复，但该事件凸显了提示词流水线中静默破坏的代价。
- **性能回归悄无声息** — #30086（CPU 飙升）已有 53 条评论且尚无明确修复方案，用户已无法运行一周前还能正常工作的工作负载。
- **Provider 集成脆弱性** — Provider 侧错误持续不断：Muse Spark `encrypted_content`（#48741）、DeepSeek V4 Flash 中国托管（#39845）、Kimi K3 上游故障（#37815）、Mistral 工具调用 schema 不匹配（#49139）、Bedrock 图像字段支持（#48069）以及 LiteLLM proxy 文本段丢失（#25487）。
- **强制的 UI 变更** — 新的侧边栏设计催生了 #48882 和 #38230；用户更希望提供退出开关，而非强制改版。
- **压缩作为安全边界** — #36682 揭示了压缩摘要会被模型视为可信用户输入，一旦会话中包含不受信任内容，便形成注入向量。
- **会话交互体验问题** — 流式期间视口贴底（#29094）、CLI 中跳到最新消息（#38692）以及重连后未回答/待处理的 inbox 问题（#49106），都降低了交互式 agent 工作流的质量。
- **macOS 构建兼容性** — 不兼容 AVX2 的二进制在较老的 Intel Mac 上崩溃（#49145、#49150）；Linux pacman 用户最先遇到提示词回归。
- **MCP 冷启动竞态** — 运行 14+ 个 stdio MCP 的用户在会话启动时看到全部被标记为 `failed`，不得不手动重启。

---

*摘要基于 anomalyco/opencode 仓库 2026-09-15 的活动生成。条目按社区互动度与维护者相关性排序。*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-15

## 今日要点
今天的活动主要围绕 **provider 一致性与成本核算 bug** 展开，覆盖 Bedrock、通过网关调用的 Anthropic 以及通过 OpenAI 接入的 Gemini，同时还有一批质量不错、体量小且专注的 PR（schema 修复、`/forget` 命令、新增 provider）。最值得关注的是 #9482：来自某个 OpenAI 兼容网关的空 body 400 响应被错误归类为上下文溢出，并触发 **可能删除约 40 万 token 对话历史的破坏性自动压缩**。

## 发布
*过去 24 小时内无新发布。*

## 热门 Issue

1. **[#7010](https://github.com/earendil-works/pi/issues/7010) — 为 OpenAI 兼容 provider 规范化可选对象类型的 tool schema**（8 条评论）
   `@earendil-works/pi-ai@0.81.1` 将原始的 `required` 数组直接转发给 OpenAI 兼容的 chat-completions 适配器，当 schema 采用 JSON-Schema-draft 写法时会导致 tool 调用失败。这是一个基础性修复，影响所有复用 `openai-completions` 的 provider。

2. **[#8752](https://github.com/earendil-works/pi/issues/8752) — bedrock-converse：`usage.input` 未归一化；出现误报缓存未命中，输入成本翻倍**（6 条评论，👍 5）
   Anthropic 报告的 input 是 **扣除缓存后** 的值，OpenAI 系列报告的是 **毛额**。Bedrock 适配器原样拷贝 `inputTokens`，导致成本报告虚高和错误的缓存未命中警告。社区关注度很高——计费错误是头号驱动力。

3. **[#9361](https://github.com/earendil-works/pi/issues/9361) — Windows：加载扩展时 `settings.shellPath` 被不确定性地忽略**（5 条评论）
   加载任何扩展都会静默绕过用户配置的 `shellPath`，回退到 `PATH`，在 Windows 上经常会落到 WSL 的 `bash.exe`。不确定行为 + 涉及安全（错误的 shell 可能读取到错误的 `~/.bashrc`）。

4. **[#9306](https://github.com/earendil-works/pi/issues/9306) — 中止/出错的回合会留下未匹配的 `toolCall` 块；下一次 `runAgentLoopContinue` 被拒绝**（5 条评论）
   当 `stopReason: "error" | "aborted"` 时，已流式输出但未匹配的 tool call 会留在上下文里，导致下一次续接调用被 provider 层拒绝。会破坏崩溃后恢复的流程。

5. **[#9210](https://github.com/earendil-works/pi/issues/9210) — Vercel AI Gateway + Anthropic：`cacheWrite1h` 始终未设置；1h 写入按 5m 费率计费**（5 条评论）
   当设置 `PI_CACHE_RETENTION=long` 时，网关会遵守 1h TTL，但 pi 始终记录 `cacheWrite1h: 0`，导致 `calculateCost` 把 1h 写入按 1.25× 而非 2× 计费。与 #8752 / #9457 同族——都是缓存 TTL 核算 bug 的同一类问题。

6. **[#9391](https://github.com/earendil-works/pi/issues/9391) — 压缩后，陈旧的已签名 thinking 块在每个回合被重放**（4 条评论，👍 1）
   Anthropic 在每次请求中都因 `prefix_binding_mismatch` 丢弃同样的 15 个已签名 thinking 块，导致日志噪音大，而且很可能在浪费 token。压缩本应清理这些块，但实际没有。

7. **[#9444](https://github.com/earendil-works/pi/issues/9444) — `openai-completions` 在流式 `tool_calls` 上丢失 Gemini 的 `thoughtSignature`**（3 条评论）
   走 OpenAI 兼容网关的 Gemini 模型在第二个回合因 HTTP 400 失败，因为 thought signature 从未被持久化。多轮 tool 使用被破坏——对任何通过聚合路由访问 Gemini 的用户来说都是一次回退。

8. **[#9134](https://github.com/earendil-works/pi/issues/9134) — Anthropic 适配器静默丢弃自定义 tool schema 根部的 `anyOf`**（3 条评论）— *已由 #9619 修复*
   模型只收到 `type` + `properties`，导致运行时校验拒绝了模型「正确」发出的调用。在 PR 层面已解决——为 schema 归一化类问题提供了有用的先例。

9. **[#9457](https://github.com/earendil-works/pi/issues/9457) — bedrock-converse：1h 缓存写入按 5m 费率计费**（3 条评论，👍 4）
   `bedrock-converse-stream` 从未把 `cacheDetails` 映射到 `cacheWrite1h`。与 #9210 同属一类计费 bug；并通过一张复现表明确展示了定价差异。

10. **[#9482](https://github.com/earendil-works/pi/issues/9482) — 空 body 的 400 被误判为上下文溢出 → 触发破坏性自动压缩**（1 条评论，严重程度：高）
    `opencode-go/deepseek-v4-flash` 返回的一个瞬时空 body HTTP 400 被当作溢出处理，跳过重试，并自动压缩最多约 40 万 token。作者将其标记为「直接拉低 pi 的工作质量」——属于数据丢失级别的 bug，不是表面问题。

## 关键 PR 进展

1. **[#9619](https://github.com/earendil-works/pi/pull/9619) — `fix(ai)`：让根 schema 的组合子对 Anthropic 可见**（已关闭）
   阻止非严格模式的 `anthropic-messages.ts` 转换在 tool schema 根部丢弃 `anyOf` / `oneOf` / `allOf`。关闭 #9134。Anthropic 对这些情况会返回 400，所以原本丢弃它们相当于向模型隐藏了有效的组合方式。

2. **[#9615](https://github.com/earendil-works/pi/pull/9615) — `feat(coding-agent)`：用于上下文回滚的 `/forget` 命令**（已关闭）
   一条新的斜杠命令，用于从模型上下文中移除最近 N 条用户回合（可选同时从会话文件中移除），并提供软删除与硬删除两种模式。直接应对长会话的上下文压力。

3. **[#9548](https://github.com/earendil-works/pi/pull/9548) — 对话中期的系统消息**（开放，mitsuhiko）
   把系统提示文本和 tool 变更纳入 transcript，而不是静默重写起始条件。让 resume/branch 时可以正确重放，并保留缓存的 prompt 前缀——是一次有意义的正确性改进。

4. **[#8635](https://github.com/earendil-works/pi/pull/8635) — `fix(ai)`：在 lazy setup 阶段保留 aborted 停止原因**（开放）
   将请求 abort 信号透传到 lazy stream setup，并在信号已触发时把 setup 失败报告为 aborted。增加了针对「tool 执行期间 abort、发生在下一次 auth setup 之前」的回归测试。

5. **[#9434](https://github.com/earendil-works/pi/pull/9434) — `feat(coding-agent)`：扩展可以追加到会话系统提示**（开放）
   `session_start` handler 可以返回 `systemPromptAppend` 贡献，折叠进基础提示，覆盖启动、会话恢复和分支。关闭 #9432，补齐了扩展 API 的覆盖面。

6. **[#9607](https://github.com/earendil-works/pi/pull/9607) — `fix(coding-agent)`：将 provider hook 应用于摘要流**（已关闭）
   原本直接的 compaction / 分支摘要调用绕过了 `onPayload`，导致 `before_provider_request` 扩展没有运行。恢复与普通 agent 回合一致的语义。

7. **[#9605](https://github.com/earendil-works/pi/pull/9605) — `feat(ai)`：GMI Cloud provider**（已关闭）
   新增 `https://api.gmi-serving.com/v1` 作为内置的 OpenAI-Chat-Completions 聚合器，前置对接多家上游厂商。复用 `openai-completions`，无需新增传输层代码。

8. **[#9594](https://github.com/earendil-works/pi/pull/9594) — `feat(ai)`：仅支持 Gemini 的 Antigravity provider**（已关闭）
   在 `@earendil-works/pi-ai` 中通过一等公民 OAuth provider 恢复订阅制 Gemini 访问，从 mariozechner/pi monorepo 的早期实现移植而来。

9. **[#8732](https://github.com/earendil-works/pi/pull/8732) — `fix(ai)`：跨模型重放到 DeepSeek 系列端点时保留 `reasoning_content`**（已关闭）
   DeepSeek 系列 thinking 端点会在重放丢失 reasoning 的 assistant message 时拒绝请求。该 PR 恢复了该字段，使跨模型分支进入 DeepSeek 重新可用。

10. **[#8474](https://github.com/earendil-works/pi/pull/8474) — `feat(coding-agent)`：打包 Node 运行时**（已关闭，mitsuhiko）
    减少 `pi-coding-agent` 启动时加载的文件数量，明确针对 Windows Defender / 慢 IO 造成的启动慢问题。与 #9361 中的 Windows shell 路径问题形成呼应——Windows 体验正在获得统一关注。

## 功能请求趋势

- **缓存成本保真度。** 多个 issue（#8752、#9210、#9457）都在提同一件事：按 provider 实际收费来计费。在 Bedrock / Vercel gateway / 直连 Anthropic 之间统一 `cacheWrite1h` 的映射是最受期待的核算修复。
- **Tool schema 的无损往返。** #7010、#9134、#9444 都希望 tool schema 在 provider 翻译后能无损保留（根组合子、`thoughtSignature`、`required` 归一化）。
- **扩展 API 的深度。** #8791（`ExtensionContext` 上的模型运行时）、#9434（系统提示追加）、#4807（用量监听器 / `agentDir` 上下文 / 工作计时器）显示出对更丰富的扩展面——可观测性、提示控制、运行时访问——的明确需求。
- **会话 / 压缩的可用性。** #9051（溢出重试）、#9482（自动压缩数据丢失）、#9476（过早重新压缩）、#9391（陈旧的已签名 thinking），以及 `/forget` PR，都集中在「给我更安全、更可预测的上下文管理」。
- **并发安全性。** #9596（两次 `pi -c` 交错写入同一个文件）和 #9610（短终端上的裁剪）关注的是真实工作条件下的健壮性，而非功能广度。

## 开发者痛点

- **Provider 计费不一致已成为头号槽点。** Bedrock 的 5m vs 1h 缓存写入、以及 Anthropic 净 vs 总的 input token 约定，会产生明显错误的成本。用户正在失去对用量展示的信任。
- **跨模型迁移时多轮 tool 使用会中断。** `thoughtSignature`（Gemini）和 `reasoning_content`（DeepSeek）在流式/重放时被丢弃，导致中途切换 provider 会静默破坏后续回合。
- **Windows 仍是二等公民。** 不确定的 shell 解析（#9361）、杀毒软件导致的启动延迟（#8474）、短终端上的 TUI 渲染（#9610）——Windows 用户报告的痛苦比 macOS/Linux 加起来还多。
- **压缩经常做错事。** 它要么销毁对话（#9482）、要么过早触发（#9476）、要么留下陈旧的已签名块（#9391）、要么跳过即时的溢出重试（#9051）。用户希望压缩更保守、更可预测，并提供退路（`/forget`）。
- **Provider 目录漂移。** #9616（zai-coding-cn 仍列出 8 个已下架的 GLM 模型）以及匆忙新增 GMI / Antigravity，凸显出随着 provider 阵容轮换速度超过目录更新速度，手工模型策展正变得难以为继。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-15

## 今日要点

今日发布的 **v0.23.4** 包含一项重要的破坏性变更，移除了通道上可配置的消息前缀过滤机制，从而简化了符合条件的消息在发送者/群组/@提及/配对策略下的流转流程。社区正积极跟进 **P1 TUI 稳定性** 问题——尤其是后台智能体完成任务时出现的静默 React 错误 #185 崩溃，以及 ACP 守护进程权限队列争用问题；同时大量关于 Web Shell、VS Code 配套扩展和子智能体容器化的 PR 涌现，标志着项目正大力推进稳健的多智能体工作流。

## 版本发布

- **v0.23.4** — 移除通道上可配置的消息前缀过滤；符合条件的消息现遵循常规的发送者、群组、@提及和配对策略，不再通过前缀进行覆盖。([#11571](https://github.com/QwenLM/qwen-code))
- **v0.23.4-nightly.20260914.f024b37689** — 包含 Windows inode 门控的测试优化（`#11853`）以及 `fix(cua)` 补丁。
- **cua-driver-rs v0.20.9 / v0.20.8 / v0.20.7** — Qwen CUA Driver 预构建二进制（vendored 到 `packages/cua-driver`）；macOS universal 二进制已签名公证，Linux 构建未签名（glibc 2.31 基线），Windows 提供未签名的 UIAccess worker 与原生 SDK 载荷，覆盖 x86_64 与 arm64。

## 热门 Issue

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — TUI 在 React #185 上静默退出（P1，15 条评论）**  
   多个后台子智能体完成时触发 Ink `useBoxMetrics` 布局监听器的 `setState` 循环，导致 TUI 因 "Maximum update depth exceeded." 崩溃。恢复后 CLI 报告上一个会话似乎无效。问题严重，因为影响所有运行并行后台智能体的用户。
2. **[#2382](https://github.com/QwenLM/qwen-code/issues/2382) — VS Code Companion 扩展无法使用（已关闭，9 条评论）**  
   从 v0.12.2 → v0.12.3 出现的回归，导致 "Preparing Qwen Code…" 长时间挂起；回滚宿主 VS Code 仍无法解决。
3. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556) — 0.23.1 上 Remote-SSH webview 卡在加载状态（P1，7 条评论）**  
   当 VS Code 客户端（1.133.0 linux-x64）连接 1.137.0 linux-arm64 服务端时，配套扩展的 webview 无法加载。阻塞 Apple Silicon / aarch64 远程主机上的 SSH 工作流。
4. **[#11574](https://github.com/QwenLM/qwen-code/issues/11574) — 扩展更新后隐藏所有历史会话（P2，7 条评论）**  
   历史对话框硬编码 `sourceType: "vscode"` 过滤器；0.23.x 之前写入的会话记录缺少此元数据，导致升级后所有遗留会话在对话框中消失。
5. **[#11514](https://github.com/QwenLM/qwen-code/issues/11514) — Companion UI 将思考强度上限限制为 "Extra High"（P3，5 条评论）**  
   后端支持 Max 思考强度，但 UI 下拉框未暴露该选项。
6. **[#11887](https://github.com/QwenLM/qwen-code/issues/11887) — `--acp` 忽略审批模式（P2，5 条评论）**  
   限制性模式仍会自动执行文件写入和 shell 命令，而未发出 `session/request_permission`，破坏了 ACP 的安全保障。
7. **[#9387](https://github.com/QwenLM/qwen-code/issues/9387) — 预校验共享聊天会话记录契约（P3，5 条评论）**  
   跨 Web/Qwen Server、Tauri Desktop、VS Code 和 HTML Export 宿主请求引入可复用的契约预校验阶段。
8. **[#9911](https://github.com/QwenLM/qwen-code/issues/9911) — 恢复 VS Code 消息编辑/回退（P2，5 条评论）**  
   WebShell 切换（#9811）刻意省略了传统的逐消息编辑/回退功能；请求通过守护进程快照 API 重新引入该能力。
9. **[#11795](https://github.com/QwenLM/qwen-code/issues/11795) — 权限队列以 ACP 连接为键（P1，5 条评论）**  
   一个空闲会话未应答的提示会无限期、悄无声息地阻塞守护进程上所有其他会话。修复 #3（序列化作用域）正在通过 [#11802](https://github.com/QwenLM/qwen-code/pull/11802) 进行中。
10. **[#11936](https://github.com/QwenLM/qwen-code/issues/11936) — `USE_OPENAI_RESPONSES` 泄漏 `${session_id}` 字面量且缺少 User-Agent（P2，4 条评论）**  
    `customHeaders` 占位符未在 Responses 链路上展开；与下方 [#11947](https://github.com/QwenLM/qwen-code/pull/11947) PR 属同类缺陷。

## 关键 PR 进展

1. **[#11947](https://github.com/QwenLM/qwen-code/pull/11947) — `fix(core): 在 Responses 链路上展开 ${session_id} 并标记 User-Agent`**  
   在 `allowDynamicHeaderValues` 许可网关下实现占位符展开，新增供白名单网关使用的 `session_id` 头部，并标记 `QwenCode/<version> (<platform>)` User-Agent。
2. **[#11946](https://github.com/QwenLM/qwen-code/pull/11946) — `refactor(vscode): 移除未使用的 token limit 镜像`**  
   移除失效的 VS Code token-limit 镜像；扩展现依赖服务端提供的限额，并配合 shared-core 回退。
3. **[#11206](https://github.com/QwenLM/qwen-code/pull/11206) — `feat(mesh): 持久化共享线程的智能体协作`**  
   工作区智能体身份可在共享线程上协作：分配任务、@多个智能体、运行中插入意见、检查归属结果、取消、解决阻碍、标记已审阅。
4. **[#11765](https://github.com/QwenLM/qwen-code/pull/11765) — `fix(core): 拆分时将单引号内的反斜杠视为字面量`**  
   修正 shell 段拆分逻辑，使权限规则匹配真实的 bash 语义（`'…'` 内的反斜杠为字面量而非转义符）。
5. **[#11794](https://github.com/QwenLM/qwen-code/pull/11794) — `fix(cli): 无状态生成时遵循输出语言设置`**  
   无状态/工作区文本生成现将用户的输出语言规则作为系统指令应用，覆盖接口回退语言。
6. **[#11924](https://github.com/QwenLM/qwen-code/pull/11924) — `fix(core): 将 Goal 回合结束记录持久化至模型历史之外`**  
   结构化的结束记录使恢复逻辑能够识别已完成的 Goal 回合，并仅重试后续未应答的输入，避免污染模型消息。
7. **[#11940](https://github.com/QwenLM/qwen-code/pull/11940) — `feat(serve): 接纳满载时回收空闲 ACP 子进程`**  
   按需回收空闲 ACP 子进程，使新连接可在不强制优雅终止活跃会话的情况下被接纳。
8. **[#11684](https://github.com/QwenLM/qwen-code/pull/11684) — `fix(core): 在 Responses 清理过程中保持 reasoning 与 function_call 项相邻`**  
   在历史重写时，将回放的 reasoning 项及其紧随其后的并行工具组视为单一单元，防止 function-call 孤儿丢弃。
9. **[#11711](https://github.com/QwenLM/qwen-code/pull/11711) — `feat(core): 为子智能体添加容器执行`**  
   仅限操作员的 `QWEN_AGENT_EXECUTION_BACKEND=docker|podman` 强制普通子调度使用容器；项目环境文件和设置无法覆盖此门槛。
10. **[#11904](https://github.com/QwenLM/qwen-code/pull/11904) — `feat(cli): /hooks 打开时重新加载 hook 注册表`**  
    在对话框打开时重新读取用户/工作区设置，通过 `setHooksFromSettings` 将解析后的 hook 字段注入 `Config`，并调用 `HookSystem.reload()`，使 hook 的实时编辑能立即生效。

## 功能需求趋势

- **ACP/守护进程可靠性与可观测性** — 审批模式强制、权限队列作用域、空闲子进程回收、机器可读的回合结果以及短时观察断连的存活能力（[#11887](https://github.com/QwenLM/qwen-code/issues/11887)、[#11795](https://github.com/QwenLM/qwen-code/issues/11795)、[#11940](https://github.com/QwenLM/qwen-code/pull/11940)、[#11944](https://github.com/QwenLM/qwen-code/issues/11944)）。
- **VS Code Companion 成熟度** — 0.23.x 之前会话记录的历史迁移、选择器中支持 Max 思考强度、恢复逐消息编辑/回退、稳定的会话块标识以及 ACP 权限槽并发修复（[#11574](https://github.com/QwenLM/qwen-code/issues/11574)、[#11514](https://github.com/QwenLM/qwen-code/issues/11514)、[#9911](https://github.com/QwenLM/qwen-code/issues/9911)、[#9726](https://github.com/QwenLM/qwen-code/issues/9726)、[#11899](https://github.com/QwenLM/qwen-code/issues/11899)）。
- **多智能体 / mesh 协作** — 持久化的工作区智能体身份、共享线程、容器隔离的子智能体执行、维度感知的 `/review` 工作树钉住（[#11206](https://github.com/QwenLM/qwen-code/pull/11206)、[#11711](https://github.com/QwenLM/qwen-code/pull/11711)、[#11895](https://github.com/QwenLM/qwen-code/issues/11895)）。
- **Web Shell 作为一等宿主** — 远程守护进程连接、工作区 git remote 管理、Goal 回合恢复、共享会话记录契约（[#11548](https://github.com/QwenLM/qwen-code/pull/11548)、[#11163](https://github.com/QwenLM/qwen-code/pull/11163)、[#11914](https://github.com/QwenLM/qwen-code/issues/11914)、[#9387](https://github.com/QwenLM/qwen-code/issues/9387)）。
- **跨平台打包打磨** — Windows Terminal DECSET 2026 支持、PowerShell 7 自动更新共存、大整数安全的 NTFS 文件标识、ICU 预检（[#11929](https://github.com/QwenLM/qwen-code/issues/11929)、[#11935](https://github.com/QwenLM/qwen-code/issues/11935)、[#11875](https://github.com/QwenLM/qwen-code/pull/11875)、[#11753](https://github.com/QwenLM/qwen-code/pull/11753)）。

## 开发者痛点

- 后台智能体扇出期间的 **TUI 静默崩溃** 迫使用户丢失交互会话且无任何错误提示；React 错误 #185 在防护措施落地后仍反复出现（[#11500](https://github.com/QwenLM/qwen-code/issues/11500)、[#11858](https://github.com/QwenLM/qwen-code/issues/11858)）。
- **VS Code 扩展是集成的瓶颈** — Remote-SSH 故障、小版本升级引发的回归、历史会话被隐藏、权限槽损坏以及 ARM64 宿主/服务端不匹配问题持续累积（[#11556](https://github.com/QwenLM/qwen-code/issues/11556)、[#2382](https://github.com/QwenLM/qwen-code/issues/2382)、[#11574](https://github.com/QwenLM/qwen-code/issues/11574)、[#11899](https://github.com/QwenLM/qwen-code/issues/11899)）。
- **ACP 安全保证存在漏洞** — 限制性审批模式悄无声息地绕过提示，过大的 `available_commands_update` 通知会拆毁通道（`MAX_JSON_NODES`），权限提示阻塞整个守护进程的流量（[#11887](https://github.com/QwenLM/qwen-code/issues/11887)、[#11908](https://github.com/QwenLM/qwen-code/issues/11908)、[#11795](https://github.com/QwenLM/qwen-code/issues/11795)）。
- **无状态/CLI 生成忽略用户设置** — 在特定链路格式上，输出语言规则、`${session_id}` 占位符展开与 User-Agent 标记均缺失，破坏了 OpenAI 兼容网关与 minimax 风格端点的正常使用（[#11794](https://github.com/QwenLM/qwen-code/pull/11794)、[#11936](https://github.com/QwenLM/qwen-code/issues/11936)、[#11905](https://github.com/QwenLM/qwen-code/issues/11905)）。
- **平台特定的隐患** — Windows Terminal 流式输出闪烁、PowerShell 7 自动更新死锁、缺失 ICU 的 Node 运行时，以及 AppImage 中 `PYTHONHOME`/`PYTHONPATH` 泄漏到 stdio MCP 子进程的问题反复出现（[#11929](https://github.com/QwenLM/qwen-code/issues/11929)、[#11935](https://github.com/QwenLM/qwen-code/issues/11935)、[#11753](https://github.com/QwenLM/qwen-code/pull/11753)、[#11789](https://github.com/QwenLM/qwen-code/pull/11789)）。
- **工具/提示身份漂移** — `tokenLimits` 错误解析 DeepSeek V4 的 1M/384k 窗口，`/review` 智能体忽略 PR 工作树，无参数的内置工具以错误 2013 被拒绝——这些均为脆弱的字符串匹配身份层的症状（[#11894](https://github.com/QwenLM/qwen-code/issues/11894)、[#11895](https://github.com/QwenLM/qwen-code/issues/11895)、[#11905](https://github.com/QwenLM/qwen-code/issues/11905)）。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*