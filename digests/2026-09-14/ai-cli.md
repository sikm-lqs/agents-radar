# AI CLI 工具社区动态日报 2026-09-14

> 生成时间: 2026-09-13 23:30 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比报告 — 2026-09-14

## 1. 生态概览

AI CLI 品类已成熟为一个分层市场：Anthropic 与 OpenAI 以企业级规模运营，背负庞大的 issue 待办队列并重度投入桌面端 / IDE；Google 与 Qwen 以激进的每夜发布节奏出货；而 OpenCode、Pi 与 Copilot CLI 则占据更聚焦的细分赛道（分别为模型无关的资深用户、可嵌入的 TUI 框架、以及 GitHub 原生工作流）。当日的主导议题呈现出惊人的趋同：subagent 编排可靠性、Windows / 桌面端稳定性、操作系统级沙箱、以及上下文 / token 经济性。值得注意的是，围绕会话格式与 agent 监督的社区工具开始在没有厂商协调的情况下自发涌现——这是一个信号，表明该品类正在演变为平台层，而不再是若干终端应用的集合。

## 2. 活跃度对比

*计数反映各 24 小时摘要窗口中浮现的条目，并非仓库总数。各摘要均未标注上游禁用的 Issue / PR，因此不适用 N/A 行；本窗口内 Copilot CLI 未提供 Discussions 数据。*

| 工具 | Issues (24h) | PRs (24h) | Discussions (24h) | 发布状态 |
|---|---|---|---|---|
| **Claude Code** | ~50 updated；15 surfaced（含多条陈旧关闭） | 5 | 无浮现 | 无发布；陈旧机器人积压清理中 |
| **OpenAI Codex** | 10 surfaced | 10（来自一批 15 个 PR 的自动化批次） | 10 条活跃帖（Ideas / Show & Tell / General） | 无发布 |
| **Gemini CLI** | 10 surfaced | 10 | 无浮现 | **1 nightly**（v0.61.0） |
| **Copilot CLI** | 4 surfaced | 2（仅 Dependabot） | 本窗口无数据 | 无发布（最新 v1.0.83） |
| **OpenCode** | 14 surfaced（10 + 4 noteworthy） | 10 | 无浮现 | 无发布 |
| **Pi** | 10 surfaced | 9 | 1（Show & Tell：Pi Heao GUI） | 无发布 |
| **Qwen Code** | 10 surfaced | 10 | 无浮现 | **2**（nightly + cua-driver-rs v0.20.6） |

## 3. 共同演进方向

- **Subagent 可靠性与可观测性（全 7 个工具）。** 最为强势的趋同主题。证据：Gemini #22323（subagent 在 `MAX_TURNS` 耗尽后仍上报 `GOAL` 成功）、Codex #42074（`wait_agent` 超时）、Copilot #4829/#2254（subagent token 爆量、无进度流式输出）、Claude Code #86370/#93345（跨会话静默消息丢失、worktree 被删）、Qwen #11500/#11756/#11783（并发后台 agent 下 TUI 崩溃）、Pi #9561（14k 次工具调用错误刷屏；社区 `loop-guard` 扩展）。用户希望知道委派出去的工作是否**真的完成了**。
- **沙箱化与执行隔离（Codex、Qwen、Gemini、Claude Code）。** Qwen 落地了最深的工作（bwrap 内核级沙箱 #11614、容器化 subagent #11711）；Codex 一次性合入 15 个 PR 的 Windows 沙箱加固批次；Gemini 正在征集架构反馈（#19873）；Claude Code 存在 devcontainer 防火墙边界场景（#91327）。
- **Windows / 桌面应用稳定性（Claude Code、Codex、OpenCode、Qwen、Pi）。** Claude #42776（182 条评论）、Codex #41463/#36475（WSL 项目创建、沙箱锁死循环）、OpenCode #34442/#48850、Qwen #11724（7 GB 内存膨胀）、Pi #9549。每一个有桌面端入口的厂商都背负着 Windows 专属的痛点。
- **上下文与 token 经济性（Copilot、Qwen、OpenCode、Pi、Gemini）。** Prompt cache 保持（Qwen #10410、Pi #9548）、压缩模式（OpenCode #44264、Pi #9075）、subagent 循环触发的缓存失效（Copilot #4829）、AST 限定的读取以削减上下文膨胀（Gemini #22745 EPIC）。
- **远程 / 移动端控制（Codex、Claude Code）。** Codex 获赞最高的 idea（#9200，190 👍）；Claude Code 已上线该功能，但正在承受默认开启（#88094）与数据丢失（#93345）的反噬。
- **多 provider 灵活性（Pi、Qwen、OpenCode、Gemini）。** Pi 的 `serverTools` + Azure Foundry 推进、Qwen 的按模型选择 wire-API（#11538）、OpenCode 的 provider 对齐修复、Gemini 的 pinned-model 修复（#29222）。

## 4. 差异化分析

- **Claude Code**——企业级 IDE 覆盖广度即护城河：VS 2026 兼容性是仓库呼声最高的诉求（#15942，437 👍）；fleet / per-agent 配置（#66402）瞄准多 agent 运维方。陈旧机器人清理体现着待办管理的成熟度。
- **OpenAI Codex**——最深度的沙箱工程投入和最活跃的讨论生态（24h 内 10 条活跃帖、5 个新社区工具）。独特的 ChatGPT 集成路径（移动端远程控制需求）。协调一致的机器人驱动 PR 批次显示出重度内部自动化。
- **Gemini CLI**——定位为平台 / SDK（A2A server 修复、extensions API），而非单纯的 CLI。纪律化的 P1 / P2 分流与当日 issue→PR 闭环；战略押注 Auto Memory 与 AST 感知工具。
- **Copilot CLI**——本窗口内可见声量最小：v1.0.83 的运行时回归，加之其差异化特性——本地语音模式（Nemotron ASR）。GitHub 原生工作流集成仍是其价值主张，而非原始功能速度。
- **OpenCode**——模型无关的 BYO-key 定位，附带独特的诉求（加密货币支付 #23153，51 👍）。目前正通过一次强制性的 V2 UI 迁移消耗社区好感，且没有退路。
- **Pi**——TUI 工艺与可嵌入性：session-tree 导航、视口 diff 渲染工作、为 SDK 用法设计的懒加载扩展。其他家都不碰的长尾 provider 支持（Zhipu GLM、llama.cpp、commandcode）。贡献者水准极高（如 mitsuhiko 提交的 transcript 保真度 PR #9548）。
- **Qwen Code**——在三条轴线上差异化：操作系统级隔离（bwrap / 容器）、桌面端**自动化**而非仅桌面应用（带 Windows UIAccess 签名的 cua-driver-rs）、以及异常自动化的开发流水线（Fleet Shepherd 自主 fleet 驱动日常迭代）。

## 5. 社区势能与成熟度

- **原始参与度最高：** Claude Code（约 50 issues/日更新、获赞 437 👍 的顶部 issue、182 条评论的讨论帖）——最大的装机量，配合成熟（虽缓慢）的队列管理。
- **讨论生态最强：** Codex——唯一拥有可观 Ideas / Show & Tell 流量的仓库；第三方工具正围绕其会话格式（#45238、#45251）形成生态。
- **迭代最快：** Gemini CLI 与 Qwen Code——本窗口内仅有的两家有发布的工具（nightly + 一个独立的 driver 二进制），且均合入了 10 个 PR。Gemini 的 issue 到修复延迟（小时级）全行业最佳。
- **信噪比最高：** Pi——量级较小，但架构精准的 bug 报告与来自资深用户的高质量 PR。
- **承压中：** OpenCode——社区活跃，但迁移反弹加之一个阻塞发布的回归（#48645），暴露出 QA 缺口。
- **最安静：** Copilot CLI（4 个 issue、2 个依赖升级）——可能反映内部开发节奏而非被放弃，但单日窗口样本偏弱。

## 6. 趋势信号

1. **编排是新的可靠性前沿。** 假成功的 subagent、静默消息丢失与卡死，已超越模型质量投诉——对**委派**的信任成为自主工作流的瓶颈。
2. **静默失败是头号原罪。** 跨所有工具，怒气最重的帖子都指向无报错的失败（MCP server 缺失、会话丢失、历史陈旧）。可观测性已成为采购标准。
3. **成本意识正在重塑架构。** Prompt cache 保持、压缩模式、AST 限定读取表明，token 经济性正在驱动 harness 设计，而不仅影响模型选型。
4. **沙箱化正在向操作系统层迁移。** bwrap、Windows MXC、容器化 agent 标志着从权限弹窗向结构性隔离的转变。
5. **会话格式正在演变为 API。** 围绕 `~/.codex` 与会话导出的社区工具——以及明确请求稳定性契约（#45251）——意味着下游生态锁定价值正在显现。
6. **Windows 是差异化的市场。** 谁先解决 Windows 沙箱 / 桌面可靠性（Codex 投入最重），谁就能拿下被低估的企业细分。
7. **Agent 正在构建 Agent。** copyberry 批次（Codex）与 Fleet Shepherd（Qwen）表明厂商在开发过程中狗粮化自家工具——这是该品类自我加速成熟曲线的早期证据。

*对评估者的建议：在近期工具选型中，大幅加重 subagent 可观测性、Windows 支持质量、以及 cache / 成本行为的权重；这些正是路线图与痛点交汇之处。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — 社区亮点报告
*数据截至 2026-09-14*

---

## 1. 热门技能排名

最受关注的 PR 集中在核心元技能（`skill-creator`、`mcp-builder`、`claude-api`）的修复上，而非全新的领域技能，这表明社区正聚焦于基础设施的可靠性。

| 排名 | PR / 技能 | 功能 | 状态 | 链接 |
|------|------------|---------------|--------|------|
| 1 | **#1298 — skill-creator eval 修复** | 解决 `run_eval.py` 在 10+ 复现案例中报告 0% 召回率的问题（#556）；修复 Windows 流读取、触发检测与并行 worker，使描述优化循环能够基于真实信号进行训练。 | OPEN（高度活跃，6 月→9 月） | [PR #1298](https://github.com/anthropics/skills/pull/1298) |
| 2 | **#1742 — mcp-builder mcp>=2 修复** | 将 `connections.py` 适配 MCP SDK v2.0.0 中更名后的 `streamable_http_client` 导入及新增的自定义 headers API。 | OPEN | [PR #1742](https://github.com/anthropics/skills/pull/1742) |
| 3 | **#1607 — claude-api 退役模型清理** | 移除四个仍被列为 active/deprecated 的过期模型 ID（`claude-opus-4-1`、`claude-sonnet-4-0`、`claude-opus-4-0`、`claude-3-haiku-20240307`）。 | OPEN | [PR #1607](https://github.com/anthropics/skills/pull/1607) |
| 4 | **#1628 — Hivemind 多智能体编排** | 将机械性工作委派给基于免费模型的无头 `opencode` worker，而 Claude Code 仍担任规划者、审查者与合并者的角色。 | OPEN | [PR #1628](https://github.com/anthropics/skills/pull/1628) |
| 5 | **#525 — Pyxel 复古游戏技能** | 面向 `pyxel-mcp` 的技能 —— write → run_and_capture → inspect → iterate 循环，用于 8-bit/Python 游戏开发。 | OPEN，持续维护（9 月更新） | [PR #525](https://github.com/anthropics/skills/pull/525) |
| 6 | **#1367 — Self-audit 技能（v1.3.0）** | 交付前审计：先进行机械式文件核验，再按损失严重程度顺序执行四维推理审计。跨技术栈通用。 | OPEN | [PR #1367](https://github.com/anthropics/skills/pull/1367) |
| 7 | **#514 — Document-typography 技能** | 捕获生成文档中的孤立换行、寡行段落与编号错位。 | OPEN（长期提案） | [PR #514](https://github.com/anthropics/skills/pull/514) |
| 8 | **#486 — ODT 技能** | 创建、填充、读取与转换 OpenDocument（.odt/.ods）文件；面向 ISO/开源工作流中 DOCX 的替代方案。 | OPEN | [PR #486](https://github.com/anthropics/skills/pull/486) |

---

## 2. 社区需求趋势

Issue 揭示了用户希望 Skills 生态演化成什么样。按评论数量排序：

| 排名 | Issue | 主题 | 评论数 | 链接 |
|------|-------|-------|----------|------|
| 1 | **#492 — 通过 `anthropic/` 命名空间实施信任边界越权** | **安全与治理**：社区技能以 `anthropic/` 命名空间发布并冒充官方技能，构成权限信任漏洞。社区最关注的问题。 | 43 | [Issue #492](https://github.com/anthropics/skills/issues/492) |
| 2 | **#228 — 在 Claude.ai 中实现组织级技能共享** | **分发体验**：用原生的组织级技能库取代通过 Slack 共享 `.skill` 文件的上传方式。 | 16 | [Issue #228](https://github.com/anthropics/skills/issues/228) |
| 3 | **#556 — `run_eval.py` 0% 触发率** | **评估基础设施**：子进程技能调用框架始终无法触发，削弱了所有描述优化循环。 | 12 | [Issue #556](https://github.com/anthropics/skills/issues/556) |
| 4 | **#62 — 重命名后技能消失** | **持久化/体验**：用户在重命名下载文件夹后丢失了 12 个技能 —— 无法恢复，且没有预警。 | 10 | [Issue #62](https://github.com/anthropics/skills/issues/62) |
| 5 | **#1329 — compact-memory 技能提案** | **长上下文效率**：使用符号化表示，将智能体的自笔记从散文篇幅压缩至精简形式。 | 9 | [Issue #1329](https://github.com/anthropics/skills/issues/1329) |
| 6 | **#202 — skill-creator 应遵循自身的最佳实践** | **元质量**：creator 技能读起来像开发者文档，而非执行指令。 | 8 | [Issue #202](https://github.com/anthropics/skills/issues/202) |
| 7 | **#189 — `document-skills` 与 `example-skills` 存在重复** | **打包规范**：同时安装两个

---

# Claude Code 社区摘要 — 2026-09-14

## 今日要点

- **过去 24 小时内没有新的发布**，但社区活跃度依然很高，有 50 个 issue 被更新，其中包括一些长期未解决的 IDE/Desktop 缺陷和功能请求，拥有数百个点赞。
- **Windows Desktop 稳定性**依然是 issue tracker 的焦点：孤立进程文件锁问题 (#42776) 评论数已达 182，而 VS Code 自动附加控制 (#24726) 与 VS 2026 集成 (#15942) 是呼声最高的增强请求，分别获得 237 和 437 个 👍。
- **一波陈旧机器人关闭了多个 macOS/Linux issue** —— 涉及 OAuth/Keychain 损坏、agent 会话路由以及 Homebrew/apt 更新提醒 —— 表明 Anthropic 正在清理积压 issue，同时聚焦于当前未解决的 IDE/Desktop 痛点。

## 发布

_过去 24 小时内无新发布。_

## 热门 Issue

1. **[BUG] Claude Code Desktop 在 Windows 上因孤立进程文件锁无法重新启动** [#42776](https://github.com/anthropics/claude-code/issues/42776) — OPEN，invalid，182 评论，88 👍。本摘要窗口内讨论度最高的 issue：Windows Desktop 因陈旧的进程文件锁无法重新启动。尽管被标记为 invalid，互动量仍然很高，说明社区希望从根本上修复该用户体验。

2. **添加 Visual Studio 2026 集成支持** [#15942](https://github.com/anthropics/claude-code/issues/15942) — OPEN，enhancement，152 评论，**437 👍**。本摘要中点赞数最高的单个条目。清晰表明 Visual Studio 与 VS Code 扩展的对等支持是企业的首要需求。

3. **VS Code 扩展：添加设置以禁用打开文件/选区的自动附加** [#24726](https://github.com/anthropics/claude-code/issues/24726) — OPEN，73 评论，237 👍。开发者希望对上下文注入进行更细粒度的控制 —— 当前始终启用的行为过于嘈杂。

4. **VSCode 扩展：为聊天面板添加字号设置** [#34196](https://github.com/anthropics/claude-code/issues/34196) — OPEN，16 评论，91 👍。简单但受欢迎的用户体验请求；91 个 👍 仅出现在 16 条评论的话题下，说明该请求在更广泛的沉默用户群中引起了共鸣。

5. **/model 和 /effort 会修改全局 settings.json —— 破坏 agents/fleet 视图** [#66402](https://github.com/anthropics/claude-code/issues/66402) — OPEN，16 评论，14 👍。架构层面的担忧：由于这些命令会写入全局配置，无法实现按 agent 的 model/effort 配置。对于运行多 agent 工作流的高级用户来说至关重要。

6. **Remote Control 默认开启** [#88094](https://github.com/anthropics/claude-code/issues/88094) — OPEN，10 评论，10 👍。用户对一个面向网络的功能采用"默认开启、退订才关闭"感到意外；隐私/安全方面的讨论仍在持续。

7. **Desktop 定时任务：模型选择端到端失效** [#91884](https://github.com/anthropics/claude-code/issues/91884) — OPEN，5 评论。详细的 bug 报告，显示定时任务在三个层面（spawn、UI 选择器、MCP 工具）都会忽略用户的模型设置 —— Desktop 可靠性存在明显缺口。

8. **[MODEL] Sonnet 5 将 UserPromptSubmit 误判为提示注入** [#76026](https://github.com/anthropics/claude-code/issues/76026) — CLOSED stale，4 评论。模型层面的误报破坏了合法的 hook 工作流；以陈旧而非修复为由关闭，值得重新提交。

9. **iTerm2：CLI 作为守护进程子会话启动，阻塞 Agents 面板/会话切换** [#74699](https://github.com/anthropics/claude-code/issues/74699) — CLOSED stale，4 评论。macOS 终端集成回归，影响新的 Agents 面板。

10. **自 2.1.227 以来跨会话消息被静默丢弃** [#86370](https://github.com/anthropics/claude-code/issues/86370) — CLOSED，4 评论。发送方收到成功提示，但接收方从未收到 —— 新 agents/sessions API 中的静默数据丢失回归；以重复/陈旧为由关闭。

11. **macOS CLI 登录循环：Keychain 凭证 blob 中的所有 accessToken/refreshToken 被清空** [#84331](https://github.com/anthropics/claude-code/issues/84331) — CLOSED stale，4 评论。macOS 上严重的认证回归，所有 OAuth 令牌都被从 Keychain 中清除。

12. **VS Code 扩展：焦点在两个可见的 Claude 面板之间反复跳动** [#90936](https://github.com/anthropics/claude-code/issues/90936) — OPEN，2 评论。根据陈旧机器人重新提交；两个面板实例下反复出现的用户体验缺陷。

13. **Devcontainer：当两个白名单域名解析到同一 IP 时 init-firewall.sh 在启动时中止** [#91327](https://github.com/anthropics/claude-code/issues/91327) — OPEN，1 评论。可复现的沙箱缺陷；`set -euo pipefail` 与 ipset 重复项导致许多真实 DNS 配置下 devcontainer 在首次启动时崩溃。

14. **技能加载：技能文件中的 $1-$19 被替换为不相关的对话文本** [#94065](https://github.com/anthropics/claude-code/issues/94065) — OPEN，1 评论。技能文件不是存放字面量 `$N` 占位符的安全位置；加载器似乎从错误的上下文应用了类似 shell 展开的替换。

15. **Remote Control：会话的 worktree 在会话归档前被删除** [#93345](https://github.com/anthropics/claude-code/issues/93345) — OPEN，1 评论。Remote Control 桥接中存在数据丢失/会话无法恢复的缺陷。

## 关键 PR 进展

1. **fix: 为示例规则文件名添加必需的 hookify. 前缀** [#79148](https://github.com/anthropics/claude-code/pull/79148) — OPEN。修复文档与实现的静默不匹配：已发布的 hookify 示例文件缺少必需的 `.claude/hookify.*.local.md` 前缀，因此会被加载器静默忽略。

2. **validate-agent.sh：不要在第一个警告处中止** [#89404](https://github.com/anthropics/claude-code/pull/89404) — OPEN。修复公开 issue #83803。plugin-dev 技能中校验器的 `set -euo pipefail` 与 `((count++))` 交互导致其在遇到第一个警告时就中止，从而错误地标记出合法的 plugin-dev agent 文件。

3. **补充缺失的 CLI 构建基础设施和打包配置** [#41621](https://github.com/an

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-14

## 今日要点

Codex Windows 桌面端体验正遭到集中"围攻"：今天的热门问题几乎被 Windows 沙盒配置失败、WSL 项目创建崩溃以及提权模式下的凭据问题所占据——其中许多直接导致用户完全无法运行任务。工程端同样异常活跃：`copyberry[bot]` 在 24 小时内连续提交了 15 个 PR，聚焦 Windows 沙盒加固、TUI 优化以及工具调用元数据的正确性。社区的创造力同样可见一斑——同一时段内还涌现了五款新的"Show and tell"工具。

## 发布

_过去 24 小时内无新发布。_

## 热门问题

1. **[#41463](https://github.com/openai/codex/issues/41463) — Windows + WSL：无法创建项目（`AbsolutePathBuf` 反序列化失败）**（54 条评论，33 👍）。本周期内获赞最高的 Windows Bug：桌面版 `26.825.4187.0` 在 WSL2 中甚至无法创建项目，因为路径序列化缺乏基准（base）。对 Windows/WSL 用户而言基本等于阻塞性故障。
2. **[#31073](https://github.com/openai/codex/issues/31073) — Windows 原生沙盒：Git HTTPS 远端操作失败/崩溃**（28 条评论）。Codex 内部的本地 Git 可正常工作，但 HTTPS 远端操作（`fetch`、`push`、`pull`）会崩溃——而同样的操作在普通 PowerShell 中却毫无问题。典型的沙盒/凭据隔离回归。
3. **[#44781](https://github.com/openai/codex/issues/44781) — 编辑并重发已排队消息会破坏队列**（22 条评论，26 👍）。Windows 桌面版 `26.903.9818.0`：编辑一条已排队的后续消息时，会弹出"App-server queued follow-up no longer exists"，静默丢失这一轮。
4. **[#44561](https://github.com/openai/codex/issues/44561) — 默认关闭 Astra 星光/奇趣特效**（15 条评论，31 👍）。一项配置人体工学诉求：用户希望 `[tui] whimsy = false` 成为默认值，因为新的 Astra 星光看起来像 Bug。
5. **[#37856](https://github.com/openai/codex/issues/37856) — VS Code 扩展：陈旧的线程所有者阻塞聊天**（13 条评论，9 👍）。VS Code Web 渲染进程重载后，线程仍由一个已死亡的客户端持有，导致提示"在其他应用中打开"。
6. **[#36475](https://github.com/openai/codex/issues/36475) — Windows 沙盒刷新失败：`helper_sandbox_lock_failed`**（11 条评论）。`SetNamedSecurityInfoW` 对已存在的 `.sandbox-bin` 返回 `ERROR_ACCESS_DENIED`；沙盒无法自我刷新，导致配置流程死循环。
7. **[#20988](https://github.com/openai/codex/issues/20988) — Codex 过于频繁地进行联网搜索**（10 条评论，现已关闭）。印证了一个长期存在的抱怨：联网搜索被不必要地触发，在 `gpt-5.3-codex` 上白白消耗用户 token。
8. **[#32082](https://github.com/openai/codex/issues/32082) — 回归：Windows SSH worktree 线程未在侧边栏归组**（9 条评论）。#10522 的回归——SSH worktree 任务存在，但在 Windows 应用中并未出现在其所属的已保存项目下。
9. **[#44458](https://github.com/openai/codex/issues/44458) — macOS：CLI 0.154.0 实验性能力破坏打包的 MCP 服务器**（9 条评论，3 👍）。`gpt-6-astra` 启动时，Messages 与 Computer History MCP 服务器会失败——是与 0.154.0 实验能力开关直接相关的回归。
10. **[#44035](https://github.com/openai/codex/issues/44035) — Windows 应用：最近聊天记录消失**（9 条评论）。`read_thread` 持续陈旧，而底层 rollout 已包含更新消息；用户升级到 `26.901.6511.0` 后看到的是空历史记录。

## 重点 PR 进展

1. **[#45276](https://github.com/openai/codex/pull/45276) — 在 agents 概览中新增 worktree 会话创建**。新快捷键 `w` 基于缓存的项目默认分支（优先使用远端 `HEAD`，再退回约定分支）创建 worktree，仅适用于本地会话。
2. **[#45271](https://github.com/openai/codex/pull/45271) — 在扩展 TUI 视口时保留终端回滚内容**。针对 QTermWidget 与 xterm.js 中由 `CSI S` 引发的行丢失，通过为 `ScrollbackStrategy::Standard` 输出尾部换行加以修复。
3. **[#45262](https://github.com/openai/codex/pull/45262) — 将粘贴内容路由到当前的历史搜索查询**。在 `Ctrl+R` 期间粘贴时，会更新搜索查询并重新执行匹配，而非泄漏到编辑器中。
4. **[#45255](https://github.com/openai/codex/pull/45255) — 从命令中心直接打开新会话**。用会话列表替换内联编辑器；按下 `n` 在选定的 checkout 中打开一个空白会话，且不会打断正在运行的 agent。
5. **[#45248](https://github.com/openai/codex/pull/45248) — 将捕获到的 step 设置用于请求元数据与工具钩子**。元数据现在描述的是发起请求/调用的那个 step，而非该轮次初始的模型/effort。
6. **[#45224](https://github.com/openai/codex/pull/45224) — 在沙盒配置之前注册 Windows 桌面端卸载所有权**。即便用户尚未登录或配置沙盒，也能确保卸载清理具备安装所有者。
7. **[#45185](https://github.com/openai/codex/pull/45185) — 将直接工具调用元数据绑定到调用输出**。即便调用 ID 被复用，元数据也保持挂载；完整性通过记录的调用清单计算。
8. **[#45182](https://github.com/openai/codex/pull/45182) — 在复制 SID 之前校验 Windows 沙盒令牌组**。新增共享的 `token_groups` 辅助函数，在复制前对组条目与 SID 指针进行边界检查。
9. **[#45178](https://github.com/openai/codex/pull/45178) — 将 Windows 沙盒清理拆分为准备阶段与完成阶段**。暴露 `prepare_packaged_windows_sandbox_cleanup` 与 `PreparedWindowsSandboxCleanup` 守卫，使清理在 setup 锁内进行。
10. **[#45176](https://github.com/openai/codex/pull/45176) — 将 Windows MXC 沙盒接入命令执行**。新增显式的 MXC 后端选择，并将其标识贯穿到 exec-server 的上报与违规分类中。

## 热门讨论

### 想法
- **[#9200 — 从 ChatGPT 应用远程控制 Codex](https://github.com/openai/codex/discussions/9200)**（46 条评论，190 👍）。长期占据榜首的高赞想法：在工作站上以无界面模式运行 Codex，再用手机驱动。仍无官方状态更新。
- **[#42703 — 长程上下文：历史检索能否具备自指能力？](https://github.com/openai/codex/discussions/42703)**（1 条评论，1 👍）。针对跨多个上下文窗口的新 `history` / `notes` / `new_context` 预算模型，就一种失败模式所做的深度探讨。
- **[#45284 — 为每个 GitHub PR 提供可选的持久 Codex 会话](https://github.com/openai/codex/discussions/45284)**（0 条评论，1 👍）。当前每次 `@codex` 提及都会生成一个新任务；该提案请求提供可选的"单 PR 单会话"模式，用于迭代式评审。

### Show and tell
- **[#16329 — Awesome Codex CLI（150+ 生态工具）](https://github.com/openai/codex/discussions/16329)**（7 条评论）。一份针对 subagent、skills、插件以及 MCP 服务器的精选目录；旨在解决这个生态飞速扩张中的可发现性问题。
- **[#45278 — Polter：一个 Codex 监督其他 AI CLI](https://github.com/openai/codex/discussions/45278)**（0 条评论，1 👍）。一款基于 Ghostty 派生的监督终端，将工作分派给 Codex/Qwen/opencode，并在它们停滞时反复催促。
- **[#45238 — codex-preserve：带"失败即关闭"校验的持久 Codex 会话导出](https://github.com/openai/codex/discussions/45238)**（0 条评论，1 👍）。一个本地优先的 Python CLI，用于导出运行后的 `~/.codex` 会话，并附带机械式的完整性校验。
- **[#45205 — Orchestrator：Codex + Kanban + 评审的免费 Mac 工作台](https://github.com/openai/codex/discussions/45205)**（0 条评论，1 👍）。在类 VS Code 工作区中，将 Codex 任务与仓库、会话以及 diff 关联起来。
- **[#44291 — Brain Scanner：理解你的编程 agent 都干了什么](https://github.com/openai/codex/discussions/44291)**（0 条评论，1 👍）。项目地图 + agent 工作记录 + 待办事项，便于交接与回顾。
- **[#44843 — SKILL.md → Codex 插件包转换器](https://github.com/openai/codex/discussions/44843)**（1 条评论，1 👍）。MIT 协议、仅依赖标准库的工具，将 Agent Skills 的 `SKILL.md` 目录转换为符合规范的 Codex `.codex-plugin` 包。

### 综合
- **[#45211 — 公开声明：重新开放 Pro 20X，回应韩语质量问题，并澄清重置策略](https://github.com/openai/codex/discussions/45211)**（0 条评论，1 👍）。面向用户的呼吁：希望 OpenAI 公布 Pro 20X 重启计划，并正面回应所报告的韩语混语 Bug。

## 功能请求趋势

- **Windows 配置/沙盒可靠性是头号诉求**。在 Windows 热门问题中，近半数（helper_failed、沙盒锁、ACL 被拒、UAC 前配置中断）都指向同一根本需求：首次运行的沙盒安装必须在没有任何手动绕过的情况下完成。
- **配置人体工学 > 新奇花活儿**。Astra "whimsy" 请求（15 条评论 / 31 👍）表明，用户更想要细粒度的 TUI 配置与更合理的默认值，而不是装饰性特效。
- **跨端连续性**。"每个 PR 持久会话"（#45284）、线程/归组回归（#32082、#44035）以及"在其他应用中打开"的锁定（#37856），描绘的是同一类诉求：状态要在重载、应用边界以及编辑器重载之间存活下来。
- **来自手机/桌面 ChatGPT 的远程控制**仍是仓库中点赞最高的单一想法（#9200，190 👍），本周 `iOS 远程控制不工作`（#40167）再次呼应了这一呼声。
- **更安静的工具体用**。已关闭的联网搜索过度使用问题（#20988）以及"等待期间输出乱码"（#45268）都表明，用户期望工具行为更克制、更可预测。
- **文档化的 rollout 格式**是一项新兴诉求（#45251）——第三方工具正基于 `~/.codex` 会话构建，下游使用者期望有稳定性的契约保障。

## 开发者痛点

- **Windows 沙盒是压倒性的阻塞点**。在 `#41463, #31073, #36475, #40550, #42621, #45003, #45069, #42794, #45302, #45119` 中反复出现相同的症状：helper 配置失败、ACL/SID 处理异常、提权模式下丢失凭据、队列/后续消息静默丢失。没有单一的根因，但呈现出一幅"Windows 边缘场景测试不足"的一致图景。
- **macOS 沙盒在前沿 CLI 上出现回归**。0.154.0 破坏了打包的 MCP 服务器（#44458），`TIOCSTI` 启动在 14.2 上失败（#45119）——运行 `alpha` 通道的用户需要更清晰的 gating。
- **速率限制账目不透明**。"26 分钟内仅两次提示即消耗 86% 配额"（#45073）与"Codex 耗尽配额后 Live Voice 报使用上限错误"（#38507）共同暴露了 Codex 与 ChatGPT 之间在配额共享/展示上的透明度缺失。
- **App-server ↔ 桌面端的竞态条件**。多个问题（#44781、#45075、#45069、#42794）描述了桌面应用重载或活动轮次被打断时的撕裂状态——投影器、光标与排队的后续消息出现用户可见却无法自愈的错位。
- **多 agent 原语不稳定**。`wait_agent` 在可观察的终止状态之后仍超时（#42074），让新的 `multi_agent` 特性难以依赖。
- **模型行为反直觉**。无视用户指令并暴露原始 Python/工具输出（#45289），以及等待期间流式文本乱码（#45268），都在侵蚀用户对当前 `gpt-5.6-sol` 变体的信任。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区简报 — 2026-09-14

## 今日要点
今日动态的主线是**子代理可靠性与 Auto Memory 加固**。最紧迫的是一个 P1 级 bug:子代理在触及 `MAX_TURNS` 后错误地报告 `GOAL` 成功，把实际被中断的事实掩盖起来，用户无从察觉；此外还有一个长期存在的 P1 报告，指出通用代理会无限挂起。PR 方面，SDK 与 A2A 服务器的稳定性修复(未加保护的 `JSON.parse`、中间件顺序问题)在相应 issue 报告后数小时内便已落地；另一项值得关注的配置修复，则防止显式指定的 `--model gemini-2.5-flash` 在 Vertex AI 后端被静默改写。

## 版本发布
- **v0.61.0-nightly.20260913.g9c1b0a610** — 例行的自动化 nightly 版本递升；与上一 nightly 版本的完整差异可参见[此处](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260912.g9c1b0a610...v0.61.0-nightly.20260913.g9c1b0a610)。该快照中未显现值得关注的变更日志细节。

## 热门 Issue

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子代理在达到 MAX_TURNS 后报告 GOAL(P1,13 条评论)**  
   `codebase_investigator` 即便在自身输出中承认因轮次预算耗尽而未分析任何内容，仍会返回 `status: "success"` 和 `Termination Reason: "GOAL"`。这会向用户静默隐藏失败的工作。P1 级，已由维护者跟踪。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用代理无限挂起(P1,8 条评论，8 个 👍)**  
   每当 CLI 将任务交给通用子代理处理时，连创建文件夹这类简单操作也会挂起一个多小时。这是本板上点赞/评论比最高的 issue;目前唯一已知的规避方法是禁用子代理委派。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖 OS 沙箱与执行后意图路由(P2,9 条评论)**  
   一项战略性增强：在保留沙箱安全保证的前提下，发挥 Gemini 3 对 bash 的原生亲和力。该 issue 开启了一场长期架构层面的讨论。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC:感知 AST 的文件读取、搜索与映射(P2,7 条评论)**  
   用于跟踪“以 AST 边界切片取代整文件读取、削减上下文膨胀”的跟踪 issue。衍生出了姊妹 issue #22746(其中推荐了 `tilth` 或 `glyph`)。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 对自定义技能与子代理利用不足(P2,6 条评论)**  
   即便安装了描述清晰的自定义技能，模型也只会在用户显式指示时才调用。这暴露了“能力可用”与“自主发现”之间的鸿沟。

6. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令执行完毕后卡在 "Awaiting user input"(P1,4 条评论，3 个 👍)**  
   CLI 命令刚执行完毕即出现挂起，常见且可复现。已标记为 `effort/medium` 进行跟踪。

7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory:确定性脱敏与日志削减(P2,5 条评论)**  
   安全相关：Auto Memory 会在模型*来得及脱敏机密信息之前*，就把对话记录片段发送给后台提取器。诉求是在发送前执行确定性的擦洗。

8. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 工具数超过 128 时出现 400 错误(P2,3 条评论)**  
   随着代理生态扩张，触达上游工具数量上限会产生难以排查的 400 错误。请求方希望采用更智能的范围收窄，而非全局注册所有工具。

9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子代理在 Wayland 上失败(P1,4 条评论)**  
   Wayland 会话下也报告了 `GOAL` 终止(假成功)的情况，对未使用 X11 的 Linux 桌面用户造成回归。

10. **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079) — 符号链接的 `~/.gemini/agents/*.md` 未被识别(P2,4 条评论)**  
    常见的 dotfile 工作流(跨机器符号链接共享代理)会静默注册子代理失败。

## 重点 PR 进展

1. **[#29319](https://github.com/google-gemini/gemini-cli/pull/29319) — `fix(sdk)`:在 `sendStream` 中对工具调用参数的 `JSON.parse` 加保护**  
   修复了 issue #29308 中未加保护的 `JSON.parse`;格式错误的工具参数现在会发出 `_parseError` 参数，而不会中断流式处理循环。附带回归测试。

2. **[#29320](https://github.com/google-gemini/gemini-cli/pull/29320) — `fix(a2a-server)`:在 A2A 路由之前注册 `express.json`**  
   重新排序中间件，使 JSON-RPC 处理器能拿到已解析的 `req.body`。与此前已关闭的 #29126 呼应。

3. **[#29286](https://github.com/google-gemini/gemini-cli/pull/29286) — 在 `RobustAutonomousAgent` 中实现 Google Search 工具**  
   新能力：为自主代理界面接入带来源支撑(grounded)的联网网页搜索。

4. **[#29222](https://github.com/google-gemini/gemini-cli/pull/29222) — `fix(config)`:防止改写显式指定的 flash 模型**  
   此前在 Vertex AI 后端上,`--model gemini-2.5-flash` 会被静默重映射为 `gemini-3.5-flash`;本 PR 恢复了用户意图，并避免在受限环境中出现 404。

5. **[#29163](https://github.com/google-gemini/gemini-cli/pull/29163) — `fix(cli)`:修复 macOS Seatbelt 下 git 仓库中认证时的崩溃**  
   修复了在严格沙箱下 `useGitBranchName` 钩子无法读取 `.git/` 导致的启动崩溃；缓解了 macOS 开发者的常见痛点。

6. **[#29304](https://github.com/google-gemini/gemini-cli/pull/29304) + [#29303](https://github.com/google-gemini/gemini-cli/pull/29303) — 代理对安全的截断**  
   两项并行修复分别位于 `sanitizeForDisplay` 和 `ExpandableText`,防止 UTF-16 代理对(surrogate pair)被拆分——此前该问题会静默丢弃 TUI 中的 emoji。

7. **[#29208](https://github.com/google-gemini/gemini-cli/pull/29208) — `fix(core)`:更健壮的 `agents.json` 加载**  
   格式合法但结构不符的 `agents.json`(如 `null`、标量、数组)不再抛出原始 `TypeError`;加载过程现在会校验结构并回退。

8. **[#27862](https://github.com/google-gemini/gemini-cli/pull/27862) — `fix(cli)`:在 UI 中保留执行中的子代理工具调用**  
   子代理的工具调用在仍在执行时从 UI 中消失；通过修改 `useToolScheduler` 予以恢复。

9. **[#27863](https://github.com/google-gemini/gemini-cli/pull/27863) — `fix(core)`:优先使用工具调用的结构化展示标题**  
   `getDisplayTitle()` 现在优先使用 `_toolDisplayName` 而非通用的 `_toolName`,让扩展获得更好的 UI 展示空间。

10. **[#29125](https://github.com/google-gemini/gemini-cli/pull/29125) — `fix(cli)`:迁移时将钩子超时从秒换算为毫秒**  
    `gemini hooks migrate` 此前原样照搬了 Claude Code 以秒为单位的超时值，导致实际超时只有 30 毫秒。现已完成换算。

## 功能请求趋势

- **基于 AST 的工具正成为热门主题。**两个关联 issue(#22745 EPIC、#22746 平台调研)加上 #19561("Tactful Extraction" 精准读取)，表明社区正推动用语义化、按上下文边界读取的方案取代“倾泻式”的 `read_file`。
- **Auto Memory 走向成熟。**四个聚焦的 issue(#26516、#26522、#26523、#26525)描述了一次协同的加固工作，涵盖机密脱敏、重试循环、补丁校验与可观测性——将 Auto Memory 当作一等子系统来对待。
- **子代理的可观测性与开发体验。**#22598(在 `/chat share` 中展示子代理轨迹)与 #21763(在 `/bug` 报告中附上子代理上下文)指向一个反复出现的诉求：让子代理行为可检视，而不仅仅是可调用。
- **更安全的默认代理行为。**#22672(劝阻破坏性的 git/DB 命令)与 #23571(模型随手乱扔 `tmp` 脚本)反映出对围绕副作用内置护栏的需求。
- **浏览器代理加固。**三个同期 issue(#21983 Wayland、#22267 设置覆盖、#22232 会话接管)显示用户正推动浏览器代理从“演示品”迈向“日常主力”级别的可靠性。
- **沙箱平台化。**#19873 提出的 OS 级沙箱 + 意图路由代表了一个长期方向，维护者正在公开征集反馈。

## 开发者痛点

- **挂起与静默终止**是本周期报告最多的一类 bug:通用代理挂起(#21409)、shell 完成后挂起(#25166)、子代理假成功(#22323)、Wayland 浏览器崩溃(#21983)。共同主题是：*用户无法判断工作是否真正完成*。
- **配置漂移 / 覆盖失效。** 浏览器代理忽略 `settings.json`(#

---

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-14

## 1. 今日要闻

过去 24 小时内没有新版本发布，但社区目光明确聚焦在 **v1.0.83 的运行时正确性**上：工作区 `.mcp.json` 发现机制的回归（Issue #4832）、Linux 上语音模式的硬崩溃（Issue #4833），以及子代理链式发起长工具调用序列时出现的提示缓存/token 成本病态问题（Issue #4829），三者集中在同一时间窗口内浮出水面。与此同时，`actions/stale` 和 `actions/github-script` 两个常规 Dependabot 升级被合并，表明 CI 卫生稳步推进，但并无功能层面的动作。

## 2. 版本发布

*过去 24 小时内无新版本发布。新提交 issue 中引用的最新跟踪版本为 `1.0.83`。*

## 3. 热门 Issue

1. **[#4832 — CLI 1.0.83 中工作区 `.mcp.json

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-14

## 今日要点

社区对 OpenCode Desktop 上**强制迁移到 V2 布局**反应强烈，多位用户反映生产力下降（没有 MCP 开关、没有多 worktree 支持、无法回退）。与此同时，**v1.18.30 中一处严重回归**（`SystemPrompt.environment` 中的 `TypeError`）导致每个 prompt 都崩溃，Zen 上的 **Muse Spark 系列**模型在工具调用和图片输入时遇到 `encrypted_content` 错误。

## 发布动态

*过去 24 小时内无新发布。*

## 热门 Issue

1. **[#4283](https://github.com/anomalyco/opencode/issues/4283) — 复制到剪贴板不可用**（133 💬，124 👍）。整个板块互动量最高的 issue。选中助手回复的文本后静默失败，影响最基础的终端交互体验。自 2025 年 11 月开放至今，暂无明确修复方案。
2. **[#48741](https://github.com/anomalyco/opencode/issues/48741) — Zen 上 Muse Spark 的严重错误（图片与工具调用）**（21 💬）。提供商侧 `encrypted_request_error reasoning encrypted_content was not issued to this caller` 阻塞了 Zen 上所有 Muse Spark 模型，只要涉及工具调用或图片即触发。
3. **[#23153](https://github.com/anomalyco/opencode/issues/23153) — crypto 支付 Pay-Go**（22 💬，51 👍）。长期存在的功能请求，希望在 opencode go 上支持加密货币支付，社区呼声很高。
4. **[#43277](https://github.com/anomalyco/opencode/issues/43277) — 会话永久卡死，重启后依然存在**（14 💬）。会话在完整重启后仍拒绝接收新消息，且无法清理，疑似服务端状态损坏。
5. **[#39835](https://github.com/anomalyco/opencode/issues/39835) — 新用户缺少布局切换**（3 💬）。新用户看到的是 V2 布局，UI 上没有任何回退入口；与本次迁移引发的整体反弹相关。
6. **[#48645](https://github.com/anomalyco/opencode/issues/48645) — v1.18.30 回归：每次 prompt 都报 `TypeError`**（4 💬）。每个 prompt 都在 `SystemPrompt.environment` 中读取 `a.name` 时崩溃；1.18.18 正常工作。已二分定位到 1.18.30 这个版本。
7. **[#46426](https://github.com/anomalyco/opencode/issues/46426) — 新 UI 中缺少 MCP 开关**（3 💬）。在 `config` 中配置的 MCP 服务无法在新版 Desktop UI 中启用，开关仅存在于旧 UI。
8. **[#34442](https://github.com/anomalyco/opencode/issues/34442) — Windows Desktop 离线安装已损坏**（3 💬，4 👍）。`grep`、`glob`、`skill` 以及 `customize-opencode` 在断网情况下无法使用，因为没有打包 `ripgrep`。
9. **[#38529](https://github.com/anomalyco/opencode/issues/38529) — 会话列表混入无关的非 Git 目录**（3 💬）。由于缺少目录过滤，`session list` 与 TUI 过滤会把无关非 Git 目录的会话一起暴露出来。
10. **[#48850](https://github.com/anomalyco/opencode/issues/48850) — Desktop 随机把回合标记为已中断**（3 💬）。Windows 上回合中途出现静默的 `AbortError`，UI 没有任何反馈，回合直接停止。

同样值得关注：**[#48805](https://github.com/anomalyco/opencode/issues/48805)**（在会话中途切换模型时，`muse-spark-1.3-contributor-free` 上出现同样的 `encrypted_content` 错误）、**[#48762](https://github.com/anomalyco/opencode/issues/48762)**（非 Git 的 Windows 会话因为 `session.path` 是绝对路径而被 TUI 隐藏）、**[#48848](https://github.com/anomalyco/opencode/issues/48848)**（快照 `index.lock` 竞态导致快照卡死）。

## 关键 PR 进展

1. **[#48871](https://github.com/anomalyco/opencode/pull/48871) — Fix：解析目录到其项目而非全局。** 关闭 #48870；`Project.resolve` 将在回退到 `ID.global` 之前先查询 `project_directory`，使位于非 Git 父目录中的会话能被正确归属。
2. **[#44535](https://github.com/anomalyco/opencode/pull/44535) — 停止在重发的 delta 上创建幽灵 "unknown" 工具部件。** 针对 #33618 的修复：只有模型自身发出的工具调用才会创建工具部件。
3. **[#44264](https://github.com/anomalyco/opencode/pull/44264) — 新增 suffix 压缩模式。** 实验性的 `compaction.mode: "suffix"`，用于会话压缩，由 GPT-6 Astra 准备。
4. **[#48867](https://github.com/anomalyco/opencode/pull/48867) — worktree API 改为基于项目。** 全部四个 worktree 操作现在都要求传入 `projectID`；list/read 直接使用已保存的清单，不再激活插件。
5. **[#45207](https://github.com/anomalyco/opencode/pull/45207) — TUI：展示可读的 Effect 错误。** 关闭 #34925；Effect 的 `Cause` 值不会再落到通用的 `JSON.stringify` 兜底输出。
6. **[#42319](https://github.com/anomalyco/opencode/pull/42319) — 恢复损坏的快照索引。** 在 capture 失败后，快照捕获能从无效的私有 Git index 中恢复。
7. **[#42326](https://github.com/anomalyco/opencode/pull/42326) — 累积 step 的 token 而不是覆盖。** `processor.ts` 之前会在每次 `step-finish` 时覆盖 `assistantMessage.tokens`，现在改为跨 step 累积。
8. **[#42340](https://github.com/anomalyco/opencode/pull/42340) — 停止 `run` 在配额耗尽时继续空转。** 配额耗尽现在会直接退出，不再静默挂起。
9. **[#42372](https://github.com/anomalyco/opencode/pull/42372) — 在上下文用量指示器中显示每秒 token 数。** 在会话头部的进度环上新增一个 tok/s 实时读数。
10. **[#42355](https://github.com/anomalyco/opencode/pull/42355) — 容忍缺失的 `{file:...}` 配置变量。** 缺失的文件引用解析为空字符串而不是让启动失败（修复 #15033）。

## 功能请求趋势

- **OpenCode Go 的支付灵活性**：crypto / 按量付费结算（#23153）。
- **布局 / UI 控制**：可用的布局切换以及从 V2 回退的能力（#39835、#48835、#48837、#48866）。
- **新版 Desktop UI 中的多 worktree 支持**（#48835）。
- **新 UI 中 MCP 的可发现性**：为 MCP 服务提供应用内开关（#46426、#48859）。
- **更好的会话/列表整理**：按目录作用域过滤会话、非 Git 目录的项目归属（#38529、#48762、#48870）。
- **提供商能力对齐**：OpenAI 兼容的 PDF 工具结果 replay 支持（#48868）；Gemini 兼容的、nullable 数组的 MCP schema（#48073）。
- **插件易用性**：插件 `bash` 的环境变量注入（#11065）、v2 插件工具中保留 URL/文件附件（#47458）。
- **视觉体验润色**：wordmark 入场动画（#48841）、每秒 token 数读数（#42372）。
- **历史记录控制**：提供清空最近项目/文件夹的选项（#19546）。

## 开发者痛点

- **迁移没有逃生通道。** 对现有用户强制启用 V2 布局引发了集中的反弹——MCP 开关损坏、没有多 worktree、无法回退——让新 UI 对同时管理 20+ 会话的重度用户变成生产力倒退。
- **回归问题溜进发布。** v1.18.30 的 `TypeError` 以及 Windows 离线安装包损坏说明：核心环节（系统 prompt 组装、打包依赖）在发布前缺乏稳定验证。
- **提供商集成的脆弱性。** Muse Spark 上的 `encrypted_content` 错误、PDF 工具结果在 OpenAI 兼容接口上的 422、以及 Gemini 拒绝带 nullable 数组 schema 的 MCP 工具，都指向跨提供商的 schema/特性处理不够健壮。
- **卡死状态与静默失败。** 重启后仍然卡住的会话、Desktop 回合被随机中断、被陈旧 `index.lock` 卡住的快照都有一个共同主题：错误没有暴露出来，恢复路径缺失。
- **非 Git 布局下的会话/项目归属。** 多个最近的 issue（以及 PR #48871）描述了会话要么在 TUI 中被隐藏、要么跨项目混杂、要么被解析到 `ID.global` 的情况——使用 monorepo 与非 Git 工作目录的开发者感受尤为强烈。
- **琐碎的回归却长期存在。** 剪贴板复制（#4283）自 2025 年 11 月起开放至今，已有 124 👍 仍未合入修复；代码块中的复制按钮（#48839）在 v2 web 中也是同样的情形。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-14

## 今日要点
- 出现了一个明显的 TUI 性能问题集群：多条报告指出全屏重绘风暴、思考令牌翻倍，以及在大型 diff/转录文本上崩溃（#9255、#9549、#9542、#8036）——表明长会话中存在系统性的渲染与流式输出问题。
- 主要的 provider 扩展工作已落地或被提出：Azure Foundry v3 支持（#9558）、服务端 `serverTools` 配置（#9556/#9560），以及持续推进的 Codex 传输加固（#9488、#9474）。
- 社区交付了若干 UX/质量改进：会话树分支删除（#9531）、人类可读的模型标签（#9541），以及循环防护扩展示例（#9539）。

## 发布
过去 24 小时内无新发布。

## 热门 Issue
1. **#7739 — 设定启动时间预算，目标对齐 jcode 的延迟与内存表现** [OPEN] — 基于 jcode README 基准的长期性能计划；pi 0.62.0 与目标的差距通过 10 次 PTY 启动量化。之所以重要，是因为启动慢是反复出现的痛点。[链接](https://github.com/earendil-works/pi/issues/7739)
2. **#8036 — 在渲染大型 diff 时，edit 工具导致 TUI 崩溃** [OPEN] — 内置 `edit` 工具在处理 14.5 MB 的 HTML diff 时导致 TUI 崩溃；该崩溃在会话恢复后仍然存在。对于任何编辑大型生成文件的用户而言，这是一个影响重大的稳定性缺陷。[链接](https://github.com/earendil-works/pi/issues/8036)
3. **#9255 — 在长转录文本上，TuiMainScreen 出现全屏重绘风暴** [OPEN] — 当流式思考尾部增长超出视口时，`firstChanged < prevViewportTop → fullRender(true)` 几乎每帧都会触发，造成"文字重复"和剧烈跳屏。可复现，且问题定位精确到架构层面。[链接](https://github.com/earendil-works/pi/issues/9255)
4. **#9075 — 在自适应模型上，压缩摘要继承了会话思考级别** [OPEN] — 在 Anthropic 自适应模型上，思考令牌会计入 `max_tokens`，因此高强度的压缩会确定性地撞上输出上限。本周期唯一获得 👍 反应的 issue（3 个）。[链接](https://github.com/earendil-works/pi/issues/9075)
5. **#9474 — Codex 传输：缺少不重置的每请求总截止时间** [OPEN] — 周期性的 SSE/WebSocket keep-alive 会击穿空闲超时，导致对停滞流没有任何挂钟截止时间。影响 Codex 以及 OpenAI 兼容路径。[链接](https://github.com/earendil-works/pi/issues/9474)
6. **#9561 — 长度截断的响应配合大量工具调用时，会为每个调用物化一条 error toolResult** — 模型坍塌在一次响应中产生了 **14,408 个工具调用**，最终堆出 14,000 条错误的"墙"，淹没上下文。凸显了截断路径上的错误放大陷阱。[链接](https://github.com/earendil-works/pi/issues/9561)
7. **#9565 — 不可写的 jiti 缓存导致扩重复编译并拖慢启动** — 在多用户 Linux 上，`/tmp/jiti` 符号链接到其他用户 `0700` 的目录，迫使每次启动都重编译。设置 `JITI_DEBUG=1` 即可具体复现。[链接](https://github.com/earendil-works/pi/issues/9565)
8. **#9562 / #9563 — MCP 适配器的钥匙串与 OAuth 刷新竞态** — 钥匙串重写会抹掉外部的静默读取授权（#9562）；并发会话在 OAuth 刷新上发生竞态，导致共享令牌链失效（#9563）。两者都与 macOS 上的 MCP OAuth 相关。[链接](https://github.com/earendil-works/pi/issues/9562)
9. **#9557 — Anthropic 适配器丢弃了根级 JSON Schema 关键字（`anyOf`、`oneOf` 等）** — 非严格模式的 `input_schema` 路径会剥离除 `type/properties/required` 之外的所有根级关键字，静默破坏依赖联合 schema 的工具。属于明确的正确性缺陷，修复方向是一行级别的改动。[链接](https://github.com/earendil-works/pi/issues/9557)
10. **#9549 — 大型转录文本每帧重渲染；resize 时重新发送整段转录** — 已使用 `pi -ne`（无扩展）在 Windows 11 / 2 逻辑核的环境下复现，单核打满。与 #9255 同源，但 resize 的复现路径是独立的。[链接](https://github.com/earendil-works/pi/issues/9549)

## 关键 PR 进展
1. **#9548 — 对话中段的系统消息** [OPEN] — 将系统提示与工具变更记录到转录中，而不是静默重写其起始条件，从而支持在恢复/分支导航后正确还原，并保留缓存的提示前缀。作者：mitsuhiko。[链接](https://github.com/earendil-works/pi/pull/9548)
2. **#9488 — 添加规范的 Codex turn 归属** [OPEN] — 新增 provider 中立的 `requestIdentity`（session/thread/turn/window/request-kind），以便关联工具续传、重试、引导以及压缩恢复等场景。瞄准长期存在的 Codex 归属缺口。[链接](https://github.com/earendil-works/pi/pull/9488)
3. **#9556 — `serverTools`：在模型配置中声明 provider 的服务端工具** — 将原始的 API 原生工具条目逐字追加到 OpenAI Responses 和 Anthropic Messages；解锁 Zhipu GLM 编程计划的 `web_search`、Anthropic `web_search` 等。配套提案见 #9560。[链接](https://github.com/earendil-works/pi/pull/9556)
4. **#9531 — 在会话树中永久删除分支** — `SessionManager.pruneBranch()` + `countSubtree()`，以及 `/tree` 下的 `shift+d`；保护活动路径与叶子节点，重新链接标签，重新指向幸存的压缩节点。[链接](https://github.com/earendil-works/pi/pull/9531)
5. **#9558 — Azure Foundry v3 支持** — 在 Azure Foundry 上的 Anthropic，AI 测试矩阵中新增了 stream/abort/empty/context-overflow/unicode/tool-call/image/total-tokens 等测试用例。[链接](https://github.com/earendil-works/pi/pull/9558)
6. **#9543 — 面向模型的 "Exit" 工具** — 允许模型自行结束会话，使"再见"或 `/exit` 等用户意图无需手动 `/quit` 即可完成。与 #4538 中关于 `/exit` 别名的讨论相互呼应。[链接](https://github.com/earendil-works/pi/pull/9543)
7. **#9541 — 显示人类可读的模型标签** — 在模型选择器中将受管目录的 `name` 作为主标签渲染，原始 id 退居为详情行。[链接](https://github.com/earendil-works/pi/pull/9541)
8. **#9539 — `examples/extensions/loop-guard.ts`** — 一个参考扩展，用于检测并打破"同一工具 + 同一参数，重复 N 次"的失败模式，这在因校验失败而陷入循环的智能体中很常见。[链接](https://github.com/earendil-works/pi/pull/9539)
9. **#9550 — 在发送前按 system 和 tool tokens 进行压缩** [已撤回] — 作者已撤回；已被取代或替换。作为上下文预算工作中的一次"擦肩而过"，值得关注。[链接](https://github.com/earendil-works/pi/pull/9550)

## 热门讨论

### 展示与分享
1. **#9552 — Pi Heao GUI：一个运行在 Windows 上的 pi 桌面客户端** — 基于现有的 `pi-agent-studio` 聊天界面构建，而非重新实现，并打包为原生 Windows 窗口以供日常使用。对于在 Windows 上以 TUI 形式运行 pi 的用户值得关注。[链接](https://github.com/earendil-works/pi/discussions/9552)

## 功能请求趋势
- **TUI 渲染性能与正确性** 在 issue 列表中占据主导：全屏重绘风暴（#9255）、resize 时每帧重渲染（#9549）、首个思考令牌被渲染两次（#9542）、ScrollView 吞掉鼠标事件（#9538）、edit 工具在巨大 diff 上崩溃（#8036），以及 `compaction_end` 清空转录文本（#9555）。社区正在大力推动 viewport-diffing 与不可变流式快照方案。
- **服务端/原生 provider 工具** 正成为一等配置轴：`serverTools` 用于 OpenAI Responses 与 Anthropic Messages（#9556、#9560），再加上用于将实时会话视图注入主转录的扩展 API（#9551）以及模态工作可见性租约（#9536）。
- **会话树作为真正的导航界面**：分支删除（#9531）、按 `cwd` 修正父会话嵌套（#9547），以及一个通过特性开关控制的 `newSessionInherits` 用于模型/强度继承（#9054）。
- **Provider 广度**：Azure Foundry Anthropic（#9558）、commandcode（#9553）、llama.cpp 对子代理的实时模型解析（#9559）、zai/glm-5.3-flash 的推理路由（#9554）。
- **面向 SDK/嵌入式使用的可靠性**：自定义 `agentDir` 登录状态路径（#9537）、懒加载扩展加载器，使 `pi-coding-agent` 能够在不带完整 TUI 的情况下被嵌入（#9540）。

## 开发者痛点
- **长会话很脆弱**：大型转录文本会触发渲染风暴、CPU 打满以及 edit/diff 崩溃——这是横跨 #9255、#9549、#8036、#9542、#9538 的一致痛点。
- **压缩很脆弱**：自适应模型的思考会泄漏到摘要器中（#9075），并且 `compaction_end` 会无条件清空可见的转录文本（#9555）。
- **macOS 上的 MCP OAuth** 存在两种不同的竞态/重置失效模式（#9562、#9563），在运行大量无头会话的生产机群中会遭到反噬。
- **多用户/受限环境** 通过 jiti 缓存权限问题暴露启动时间回退（#9565）。
- **工具 schema 保真度** 在 Anthropic 非严格路径上会被静默丢弃（#9557），而长度截断运行中的错误放大则会淹没上下文（#9561）——两者都让大规模使用工具的智能体更难被信任。
- **GitHub Copilot OAuth** 在 Windows 上间歇性出现 403（#9546），暗示该路径存在特定的传输/UA 指纹问题。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区简报 — 2026-09-14

## 今日要点

0.23.3-nightly 版本发布，同时带来了**重磅的全新 cua-driver-rs v0.20.6**,提供已签名的 macOS 二进制文件和 Windows UIAcess 支持，进一步扩大了桌面自动化的覆盖范围。与后台代理相关的**一组 P1 级 TUI 崩溃**(React #185 "Maximum update depth exceeded")主导了当天的 issue 流量，出现了三个独立的复现(#11500、#11756、#11783)。与此同时，**bwrap 内核沙箱后端**(#11614)和**子代理容器执行**(#11711)推进了平台在安全与隔离方面的建设。

## 版本发布

- **[v0.23.3-nightly.20260913.faa395885e](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260913.faa395885e)** — 移除了 DingTalk 渠道中已废弃的后台响应聚合，并重新梳理了 `feat(channels)` 相关功能面。
- **[cua-driver-rs v0.20.6](https://github.com/QwenLM/qwen-code)** — Qwen CUA Driver 预构建二进制文件(以 vendor 方式内置于 `packages/cua-driver`):macOS 为已代码签名并公证的通用二进制，附带 `QwenCuaDriver.app`;Linux 为未签名的 x86_64 + arm64(glibc 2.31+);Windows 为未签名的 UIAccess worker 及原生 SDK payload(x86_64 + arm64)。

## 热门 Issue

1. **[#11500 — TUI exits silently with React #185 during concurrent background agents](https://github.com/QwenLM/qwen-code/issues/11500)**(P1,12 条评论)— 当多个后台代理几乎同时完成时，Ink 的 `useBoxMetrics` 布局监听器进入 setState 循环；TUI 直接退出，且没有任何错误提示界面。**为何重要：** 这是该 bug 的核心可复现实例，今天已在三个 issue 中被报告。
2. **[#11587 — Deferred review findings from PR #11562](https://github.com/QwenLM/qwen-code/issues/11587)**(6 条评论)— 由 Autofix 延迟处理的审查项，让这次 system reminder 一次性修复保持了很高的质量门槛。
3. **[#11465 — web-shell `session-workflow-cockpit-light` renders nondeterministically](https://github.com/QwenLM/qwen-code/issues/11465)**(P3,5 条评论)— 一次运行出现 1.31% 的像素差异，下一次却是 0%;视觉预览的发布依赖感知差异(perceptual diff)判定，而流水线无法信任这类结果。
4. **[#11777 — CI `Test` job SIGTERMs at workspace→test:scripts handoff](https://github.com/QwenLM/qwen-code/issues/11777)**(P1,4 条评论)— 所有测试全部绿灯通过后，`npm run test:ci` 被外部强制终止，导致必需检查项被标红。
5. **[#11718 — Desktop AppImage `PYTHONHOME`/`PYTHONPATH` leak into stdio MCP servers](https://github.com/QwenLM/qwen-code/issues/11718)**(P2,已关闭，4 条评论)— 内置 Python 的环境变量污染了由 MCP 配置启动的外部 Python 解释器。**为何重要：** 这是一次真实的打包期安全边界失效，影响每一位 AppImage 用户。
6. **[#11756 — Virtualized history crashes with React #185](https://github.com/QwenLM/qwen-code/issues/11756)**(P1,4 条评论)— 证实了只要启用 Virtualized History,后台代理引发的 React 循环在 stable 0.23.3 和 main 分支上均可复现。
7. **[#11724 — High memory usage (7.00 GB) crashes long-running sessions on Windows](https://github.com/QwenLM/qwen-code/issues/11724)**(P2,4 条评论)— 会话在任务执行中途崩溃且无法恢复；用户只能从头重建进度。
8. **[#11590 — Auto-injected `metadata` field breaks non-Qwen models on DashScope OpenAI-compatible endpoint](https://github.com/QwenLM/qwen-code/issues/11590)**(P1,已关闭，4 条评论)— 聚合网关把 `metadata` 转发给期望 `string` 类型的厂商后端，导致每个非 Qwen 模型都返回 400。
9. **[#11736 — web-shell 200-record history-viewport smoke case times out at 60s budget](https://github.com/QwenLM/qwen-code/issues/11736)**(P2,已关闭，4 条评论)— 单个 e2e 用例就消耗掉其时间预算的 75–91%;会让无关的 PR 被标红。
10. **[#7167 — Fleet Shepherd Dashboard](https://github.com/QwenLM/qwen-code/issues/7167)**(3 条评论)— 自动维护的 bot 仪表盘；用于追踪驱动每日 PR/issue 流转的自主 agent 集群。

## 重点 PR 进展

1. **[#11711 — feat(core): add container execution for subagents](https://github.com/QwenLM/qwen-code/pull/11711)** — 可选启用 `QWEN_AGENT_EXECUTION_BACKEND=docker|podman`;代理定义可要求 `executionBackend: container`。这是安全/隔离方面的重要一步。
2. **[#11614 — feat(cli): add bwrap kernel sandbox backend for Linux](https://github.com/QwenLM/qwen-code/pull/11614)** — 无需容器、无需 root、无需守护进程、无需镜像，直接使用内核实现的沙箱；按名称选择性启用，任何平台上的默认行为均不变。
3. **[#11636 — feat: track background result execution across daemon and web shell](https://github.com/QwenLM/qwen-code/pull/11636)** — 为后台结果处理提供显式的守护进程生命周期管理，并支持重放、取消和权限控制。
4. **[#11722 — feat(web-shell): add PWA installability and Android development shell](https://github.com/QwenLM/qwen-code/pull/11722)** — 生产级 service worker + 安装元数据；采用内容寻址缓存，并对应用 HTML 和已认证流量实施严格的重验证规则。
5. **[#11794 — fix(cli): honor output language in stateless generation](https://github.com/QwenLM/qwen-code/pull/11794)** — Workspace 和 `-p` 生成模式现在会将用户的输出语言规则作为系统指令应用，优先于界面回退设置。
6. **[#11538 — feat: select the OpenAI wire API per model](https://github.com/QwenLM/qwen-code/pull/11538)** — 支持按模型设置 `wireApi: "chat-completions" | "responses"`;两种 API 均归入 `openai` 提供商组，并跨界面(CLI/ACP/daemon/Web Shell/VS Code)传播。
7. **[#10410 — feat(core): preserve prompt cache for deferred tools](https://github.com/QwenLM/qwen-code/pull/10410)** — 用 `tool_search` / `tool_call` 桥接机制取代延迟工具的 schema 揭示方式，保持已声明工具列表稳定，从而保留 prompt 缓存。
8. **[#11086 — feat(serve): scope extensions to workspace runtimes](https://github.com/QwenLM/qwen-code/pull/11086)** — 将全局扩展目录统一整合为按工作区划分的运行时；历经约 20 轮审查，后续待办已顺延至 #11793。
9. **[#11782 — feat(web-shell): add manual compression to composer context hover](https://github.com/QwenLM/qwen-code/pull/11782)** — 新增“查看详情”与手动压缩功能；压缩状态与右侧上下文面板共享。
10. **[#11692 — feat(core): make the web_search budget configurable and bound the extractor fallback](https://github.com/QwenLM/qwen-code/pull/11692)** — 新增 `tools.webSearch.timeoutMs`(默认 120s,环境变量 `WEB_SEARCH_TIMEOUT_MS`);限制搜索预算耗尽时模型可见的内容。

## 功能请求趋势

从近期 issue 和 PR 描述中提炼而来：

- **沙箱与隔离深度** — 内核级(bwrap)沙箱(#11614)和子代理容器执行(#11711)是两个最强劲的方向；尚未解决的 Bash 允许规则绕过问题(#11764)进一步印证了对更强沙箱原语的需求。
- **非 Qwen 模型兼容性** — DashScope 的 `metadata` 问题(#11590)和 SGLang 无 `signature` 思考块重放问题(#11772)都反映出，需要面向第三方提供商的更干净的网关/流水线抽象。
- **Web Shell 走向成熟** — PWA 可安装性(#11722)、手动压缩(#11782)、延迟任务侧边栏(#11635)、定时任务可见性(#11738)以及会话语言解释(#11791),都指向一个持续的方向：让 Web Shell 成为一等公民客户端。
- **按模型控制传输协议** — #11538 的 chat-completions 与 responses 选择，回应了通过单个 CLI 运行异构模型集群的运维者的需求。
- **后台自动化的可靠性** — 守护进程轮询 turn 状态(#11773)、运行时回收的重试语义(#11767)以及后台结果生命周期(#11636)都指向同一主题：让长时间运行的 agent 任务可观测、可恢复。

## 开发者痛点

- **并发后台代理下 TUI 渲染循环不稳定** — 同一时间窗口内出现三个独立的 React #185 复现(#11500、#11756、#11783);指向 Ink 与 Virtualized-History 之间的交互问题，需要结构性修复而非打补丁。
- **必需检查通道 `Test (ubuntu-latest, Node 22.x)` 上的 CI 抖动** — 交接阶段的 SIGTERM(#11777)、`tsc --build` 在 3072 MB 堆内存上限下 OOM(#11780),以及历史遗留的非确定性失败(#10490),正在逐渐侵蚀对该通道的信任。
- **Windows 上长会话内存暴涨** — 峰值达 7 GB 且无恢复路径(#11724、#11725);用户无法找回进度。
- **自动模式审批分类器失效** — 在 API 驱动的宿主程序中，审批请求从未到达分类器(#11019);会话重建时，审批模式会静默回退为 AUTO。
- **磁盘文件修改后 LSP 信息过期** — 悬停(Hover)仍显示修改前的类型(#11439);影响所有原生 LSP 集成。
- **AppImage 环境变量泄漏** — 内置 Python 的 `PYTHONHOME`/`PYTHONPATH` 污染子 MCP 服务器(#11718)——各桌面构建都需要改善打包卫生。
- **遥测脱敏缺口** — `qwen-logger.test.ts` 中缺少值级别的断言固定(pin),非命令类 hook 失败缺少归因记录(#11760)。
- **`/delete` 残留 `logs.json`** — 会话删除不彻底(#11762);期望被完全删除的用户，其会话内容仍会泄漏。
- **Bash 允许规则绕过** — 单引号内的反斜杠可让一条规则放行第二条未经确认的命令(#11764)。
- **跨平台运行时检测** — 在 Intl.Segmenter 损坏 / 缺少完整 ICU 数据的 RHEL 10 上，TUI 会静默崩溃(#11747);且没有输出任何可供排查的诊断信息。

---

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*