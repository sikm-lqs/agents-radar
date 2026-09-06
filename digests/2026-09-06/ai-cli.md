# AI CLI 工具社区动态日报 2026-09-06

> 生成时间: 2026-09-06 13:00 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比报告 — 2026-09-06

*来源：Claude Code、OpenAI Codex、Gemini CLI、GitHub Copilot CLI、OpenCode、Pi、Qwen Code 的社区摘要*

---

## 1. 生态系统概览

AI CLI 品类已整合为两大战略阵营：以平台深度竞争的大厂实验室客户端（Claude Code、Codex、Gemini CLI、Copilot CLI、Qwen Code），以及以开放性与可扩展性竞争的厂商无关独立工具（OpenCode、Pi）。七款工具都在向同一套 agent 平台功能集收敛——多 agent 编排、skills/hooks、MCP、远程控制、无头运行——但在分发方式上各有侧重：Codex 正在构建原生语音运行时，Qwen Code 主推 IM 渠道控制面（DingTalk）与守护进程/WebShell 架构，Copilot CLI 则在深化企业/数据驻留支持。本周期最核心的叙事是：**瓶颈在于可靠性，而非能力**。每个 issue 跟踪器上都充斥着会话持久化、resume 正确性、静默失败模式以及计费/配额信任问题。Windows 是横跨整个生态的最大单一摩擦源，出现在全部七个社区的痛点清单中。

---

## 2. 活跃度对比

| 工具 | Issues（热门 / 今日新增） | PR（活跃度） | 讨论区 | 发布（24h） |
|---|---|---|---|---|
| **Claude Code** | 10 / 3 | 4（3 个实质性，1 个垃圾） | N/A* | ✅ v2.1.263 |
| **OpenAI Codex** | 10 / 2 | ~32 已关闭 | 5 个活跃话题 | — 无 |
| **Gemini CLI** | 10 / n.d. | 10（6 开启，4 关闭） | N/A* | ✅ v0.60.0-nightly |
| **Copilot CLI** | 10 / — | 0（无更新） | N/A* | — 无 |
| **OpenCode** | 10 / ~4 | ~20 有更新 | N/A* | — 无 |
| **Pi** | 10 / —（今日 30 个跟踪 issue 中 ≈20 个已关闭） | ~15（6 开启，9 关闭） | 2（通过带标签 issue） | — 无 |
| **Qwen Code** | 10 / 3（另有约 9 个自动提交的 CI/发布失败） | 12+ | N/A* | ⚠️ 已发布 2 个（v0.23.0-nightly、v0.23.1-preview.0）；preview.1 失败 5× |

\* *N/A = 本摘要周期内该渠道未提供数据（渠道不可用或未被采集）；这明确**不**被视为不活跃。Issue/PR 计数反映的是今日摘要中出现的内容，而非跟踪器总量。*

**观察：**
- **Codex 展现出最高的工程吞吐**（约 32 个已关闭 PR，其中不少由机器人提交），尽管没有版本发布；Qwen 发布的构建最多，但背负 CI 债务（一个版本连续失败五次）。
- **Pi 的分诊速度最快**：30 个被跟踪的 issue 中约三分之二已关闭，其中包括对启动时认证竞态问题的同日修复（PR #9233）。
- **Copilot CLI 是个异类**：本周期完全由 issue 驱动——没有发布、PR 或讨论数据——符合厂商节奏主导、面向企业的开发模式。

---

## 3. 共性功能方向

| 方向 | 工具与证据 |
|---|---|
| **跨设备会话同步与可移植性** | Codex #14067（61👍，最高票想法）、Claude Code #81658/#47926、Copilot CLI #3498（远程会话的移动端渲染）。会话正日益被期望成为可移植的工件，而非本地状态。 |
| **Resume/会话历史正确性** | Codex 序号冻结问题在 0.153.4 中仍未修复（#41079、#43142、#43124）；Qwen Code #11180（`--continue` 后 hooks 停止强制执行）；Claude Code #82476（压缩时指令丢失）；OpenCode 无头会话卡死（#47610）。这是最普遍的正确性主题。 |
| **Skills/hooks 生命周期完整性** | Claude Code Function Hooks 提案 #91870（114💬）+ 参数替换 bug #92457；Qwen Code #11180/#11068/#11184；Gemini CLI #21968（无显式提示时 skills 未被使用）；OpenCode PR #47595（持久的技能偏好）。 |
| **无人值守/无头 agent 运行** | OpenCode #47610/#47485（busy 时重试、压缩成本控制）；Claude Code #89439（计划任务模型锁定）；Qwen Code 的守护进程/`serve` 相关工作；Codex 可复现转录（PR #43110）。CI/agent 底座场景如今已是一等用户画像。 |
| **成本与配额透明度** | Copilot CLI #4720（BYOK 提示缓存被静默禁用，成本约 5 倍）、#4733（截断导致数据丢失）；Codex #41957（配额消耗 9 倍）+ 社区构建的 CodexFuse 仪表盘；OpenCode 的 Go 计费问题簇（#47547、#47613、#47614、#45278）。 |
| **MCP 认证与规模化加固** | Codex #39054/#42427（OAuth 重试循环、DCR 发现）；Copilot CLI #4695（token 缓存键重复）；Gemini CLI #29117（RFC 9207）、#29205、#24246（工具数 >128 → HTTP 400）。 |
| **Windows/WSL 作为一等目标平台** | Codex（#41463 WSL 项目创建、#27117 更新管道、#28919 Remote Control 对齐）、Claude Code 的 MSIX/AppX 问题簇、Gemini CLI PR #29184（沙箱校验）、Pi #9229/#7547、Copilot CLI #4652（Windows 25H2）。 |

---

## 4. 差异化分析

| 工具 | 重心 | 本周期独特信号 |
|---|---|---|
| **Claude Code** | 面向插件高级用户的深度可扩展性 | Function Hooks（#91870）提出中间件式（`next()`）拦截——是整个生态中最前沿的可扩展性讨论；痛点集中在 Windows 打包和长会话上下文保真度。绑定 Anthropic 模型。 |
| **OpenAI Codex** | 平台广度扩张 | 约 13 个 PR 组成的可复现原生**语音工具链**（WebRTC/Opus、Windows 优先的 Bazel 目标）、Remote Control、`/worktree`——最激进的功能面扩张；其贡献管道中机器人自动化占比很高。 |
| **Gemini CLI** | 正确性、安全性与互操作性 | 面向 Claude Code 用户的迁移修复（hook 超时从秒改为毫秒，PR #29125）加上沙箱/OAuth 加固——正积极以**吸收其他工具的用户**为竞争点。 |
| **Copilot CLI** | 企业与 GitHub 原生 | GHEC 数据驻留修复（#4527）、组织模型策略对齐（#4692）；鉴于其自带密钥的定位，在 **BYOK 成本机制**（#4720）上有独特的风险暴露。 |
| **OpenCode** | 厂商无关的 agent 底座 | 工程重心在存储/生命周期（增量 SQLite auto-vacuum、SSE 超时、重试预算）；最大风险是**其自身订阅计费的可靠性**，而非产品本身。 |
| **Pi** | 轻量级多厂商客户端 | 可插拔后端（Ollama、OpenRouter、Vercel 网关、Meta Muse、LLM Gateway）、扩展优先架构、Nix 打包文化；有趣的是，其热门 issue 竟是**其他厂商的可靠性问题**（#4945 codex 挂起、#9212 网关截断）。 |
| **Qwen Code** | 多渠道分发与守护进程架构 | DingTalk 交互式审批卡片、WebShell 工作流可视化、工作区级守护进程；发布节奏最快，但代价是 CI 确定性债务和机器人分诊积压。 |

---

## 5. 社区动能与成熟度

- **动能领先者：**Codex（吞吐量 + 最高票讨论）、OpenCode（一天内约 20 个 PR 和 4 条新的计费问题报告）、Qwen Code（今日新提交 3 个以上社区功能请求）、Pi（最高关闭率与同日修复）。
- **参与深度：**Claude Code 的 Function Hooks（约 1 周内 114 条评论）和 Pi 的 codex 挂起话题（4 个月内 76 条评论，#4945）显示出最持久的专业用户参与；Codex 的同步请求（61👍）是最强的单一需求信号。
- **成熟度债务：**厂商运营的仓库会积累长尾 issue——Claude Code #53247（自 4 月起开放）和 #14131（约 9 个月）、Codex #28919（约 3 个月）——而快节奏发布也带来反复出现的回归（Claude Code 的 peer-messaging 中断 #92258；Copilot 的 worktree 回归 #4734；Pi 0.85.1 导出损坏 #9226；Qwen preview.1 失败 5×）。
- **响应速度成为差异化因素：**Pi 在一天内关闭了约 2/3 的跟踪 issue——社区虽小，信噪比最佳。Copilot CLI 的公开迭代循环最慢，但有实实在在的企业级修复作为平衡（#4527、#4272 已关闭）。

---

## 6. 趋势信号

1. **静默失败是信任的头号侵蚀者。**虚假成功状态（Gemini #22323）、用户文本被吞进“Thought for Ns”（Copilot #4735）、卡滞但存活的会话历史（Codex #41079）、空操作的工具调用（Copilot #4706）、不可见的 5 倍成本放大（Copilot #4720）。*参考价值：*可观测性与诚实的状态报告将是下一个竞争前沿——无论在工具选型还是自建 agent 时，都应为此预留预算。
2. **Hooks/skills 正在成为安全面。**Qwen 的 P1（#11180——resume 后安全门 hooks 被静默跳过）表明策略执行必须经受会话生命周期转换的考验；Claude Code 的 Function Hooks 则显示出对中间件级拦截的需求。应将 hook 执行缺口视为漏洞，而非 UX bug。
3. **无人值守 CI 底座上的 agent 已成为标准用户画像。**有界重试、resume 确定性和压缩成本控制（OpenCode #47610/#47485、Pi #8826）正成为采购标准，而非锦上添花。
4. **Token 计量 ≠ 真实资源成本。**Codex #41338（230 个 token 却在网络上传输 4.2 MB）打破了上下文管理的假设；用户已经开始自建配额仪表盘（CodexFuse）。预计对第一方成本遥测 API 的需求将会出现。
5. **Windows/WSL 仍是系统性缺口**，横跨全部七款工具——打包（MSIX/AppX）、DPI/输入处理和更新管道是反复出现的负担。它既是最大的用户痛点，也是最明确的差异化机会。
6. **跨设备同步是呼声最高但尚未解决的需求**（Codex #14067）——Claude Code 的同步失败信任问题（#81658）佐证了这一点。
7. **AI 已经在构建 AI 工具**——机器人撰写的 PR 主导了 Codex 已合并的工作，autofix agent 在与 Qwen 的 CI 缠斗，Copilot 的 #4706 就是由 agent 自己提交的。效率提升是真实的，但分诊噪音同样真实（Qwen 的延迟发现积压）；善于筛选机器人产出的社区，其迭代速度将超过被其淹没的社区。

---
*本报告生成于 2026-09-06，基于各仓库的社区摘要；issue/PR 编号指向各自的上游跟踪器。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — Community Highlights Report

**Repository:** [anthropics/skills](https://github.com/anthropics/skills) · **Data as of:** 2026-09-06

> **Data note:** PR comment counts were unavailable (`undefined`) in this dataset. The ranking below follows the repository's engagement-based ordering, corroborated by linked issue threads, update activity, and cross-references. All 20 top PRs remain **OPEN** (none merged).

---

## 1. Top Skills Ranking (Most-Discussed PRs)

1. **skill-creator eval overhaul — [PR #1298](https://github.com/anthropics/skills/pull/1298)**
   Fixes `run_eval.py` reporting `recall=0%` on every description — the root failure behind [Issue #556](https://github.com/anthropics/skills/issues/556) (12 comments, 10+ independent reproductions). Installs eval artifacts as real skills; fixes Windows stream reading, trigger detection, and parallel workers. Parallel fixes exist in [#1099](https://github.com/anthropics/skills/pull/1099) and [#1050](https://github.com/anthropics/skills/pull/1050). **Status: OPEN.**

2. **document-typography — [PR #514](https://github.com/anthropics/skills/pull/514)**
   Typographic quality control for AI-generated documents: orphan-word wrap, widow headers, numbering misalignment. Framed as an always-on polish layer users "rarely ask for but always expect." **Status: OPEN.**

3. **skill-quality-analyzer + skill-security-analyzer — [PR #83](https://github.com/anthropics/skills/pull/83)**
   Two meta-Skills grading SKILL.md structure, documentation, and security across weighted dimensions. Directly anticipates the repo's biggest trust concern ([Issue #492](https://github.com/anthropics/skills/issues/492)). Long-pending since Nov 2025. **Status: OPEN.**

4. **frontend-design clarity revision — [PR #210](https://github.com/anthropics/skills/pull/210)**
   Rewrites guidance so every instruction is single-conversation actionable — echoing the "skills should instruct, not educate" critique in [Issue #202](https://github.com/anthropics/skills/issues/202) (closed). **Status: OPEN.**

5. **ODT Skill — [PR #486](https://github.com/anthropics/skills/pull/486)**
   OpenDocument creation, template filling, and ODT→HTML conversion — extends the document suite beyond pdf/docx/xlsx/pptx into open formats. **Status: OPEN.**

6. **self-audit — [PR #1367](https://github.com/anthropics/skills/pull/1367)**
   Pre-delivery quality gate: mechanical file-existence verification, then a four-dimension reasoning audit in damage-severity order; companion proposal in [Issue #1385](https://github.com/anthropics/skills/issues/1385). **Status: OPEN.**

7. **Hivemind multi-agent orchestration — [PR #1628](https://github.com/anthropics/skills/pull/1628)**
   Delegates mechanical work to headless opencode workers on free models, with Claude Code as sole planner/reviewer/merger — a token-economics answer to context scarcity ([Issue #1487](https://github.com/anthropics/skills/issues/1487)). **Status: OPEN.**

8. **ServiceNow platform Skill — [PR #568](https://github.com/anthropics/skills/pull/568)**
   Broad enterprise coverage (ITSM, ITOM, SecOps, HRSD, CSM, IntegrationHub) rather than a narrow scripting helper; the longest-lived active submission (updates spanning Mar–Aug 2026). **Status: OPEN.**

*Honorable mention:* Lubrsy706's fix trio — [#538](https://github.com/anthropics/skills/pull/538) (pdf case-sensitivity), [#541](https://github.com/anthropics/skills/pull/541) (docx OOXML `w:id` collision corrupting documents), [#539](https://github.com/anthropics/skills/pull/539) (YAML description validation) — high-signal correctness fixes from one prolific contributor.

---

## 2. Community Demand Trends (from Issues)

- **Security & provenance verification** — the dominant theme. [#492](https://github.com/anthropics/skills/issues/492) (43 comments — the repo's most active thread) documents community skills impersonating official ones under the `anthropic/` namespace; reinforced by [#1175](https://github.com/anthropics/skills/issues/1175) (permission logic in SKILL.md). Demand: signed, verified namespaces.
- **Enterprise distribution & org sharing** — [#228](https://github.com/anthropics/skills/issues/228) (16 comments, 👍8) wants native org skill libraries instead of Slack/Teams file handoffs; [#189](https://github.com/anthropics/skills/issues/189) (👍9) reports duplicate skills bloating context across plugins.
- **Dependable authoring & evaluation tooling** — [#556](https://github.com/anthropics/skills/issues/556) (12 comments) exposed a broken eval harness, spawning four fix PRs (#1298, #1099, #1050, #1602); [#202](https://github.com/anthropics/skills/issues/202) demanded best-practice skill-creator guidelines; [#1385](https://github.com/anthropics/skills/issues/1385) proposes reasoning-quality pipelines.
- **Context efficiency** — [#1487](https://github.com/anthropics/skills/issues/1487) reports `claude-api` eagerly injecting ~156k tokens; [#1329](https://github.com/anthropics/skills/issues/1329) proposes a **compact-memory** Skill (symbolic notation for agent state). Demand: token-budgeted, lazy-loading skills.
- **Orchestration & portability** — [#16](https://github.com/anthropics/skills/issues/16) (Skills-as-MCP), [#412](https://github.com/anthropics/skills/issues/412) (agent-governance, closed), [#29](https://github.com/anthropics/skills/issues/29) (Bedrock support).
- **Domain expansion niches** — enterprise platforms (ServiceNow), HPC/Slurm, retro game dev, social scheduling, typography, testing patterns.

---

## 3. High-Potential Pending Skills (Open, May Land Soon)

| PR | Skill | Why it may land soon |
|---|---|---|
| [#568](https://github.com/anthropics/skills/pull/568) | **servicenow** | 5-month active review window (Mar→Aug 2026); clear enterprise demand |
| [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator eval fix** | Unblocks the repo's most-reproduced bug (#556); consolidates three prior fix attempts |
| [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit** | Mature v1.3.0, backed by active proposal #1385 |
| [#514](https://github.com/anthropics/skills/pull/514) | **document-typography** | Universally applicable, low-dependency, aligned with output-quality trend |
| [#486](https://github.com/anthropics/skills/pull/486) | **odt** | Fills the open-format gap in the document suite |
| [#723](https://github.com/anthropics/skills/pull/723) | **testing-patterns** | Comprehensive stack (Trophy model, AAA, RTL) matching test-generation demand |
| [#525](https://github.com/anthropics/skills/pull/525) | **pyxel** | Authored by the Pyxel engine creator; MCP-integrated |
| [#1628](https://github.com/anthropics/skills/pull/1628) / [#1627](https://github.com/anthropics/skills/pull/1627) | **Hivemind / buffer-api** | Fresh Aug-2026 wave targeting multi-agent orchestration and agent-agnostic APIs |

Also likely: small, low-risk fixes — [#1607](https://github.com/anthropics/skills/pull/1607) (retired model IDs, fixes #1603) and [#1602](https://github.com/anthropics/skills/pull/1602) (mcp-builder eval serialization, addresses [#1390](https://github.com/anthropics/skills/issues/1390)).

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand is not for more Skills but for trustworthy Skills infrastructure — verified namespaces/provenance, organizational distribution, and dependable authoring/evaluation tooling — signaling the ecosystem's shift from skill quantity to skill trust and lifecycle reliability.**

---

# Claude Code Community Digest — 2026-09-06

## 1. Today's Highlights

Claude Code shipped **v2.1.263** (bug fixes and reliability improvements), but community attention is on regressions rather than the release: cross-session peer messaging (`SendMessage`/`ListAgents`) broke for Windows desktop users after the 2.1.258→2.1.260 update, and three fresh bugs were filed today around multi-agent tooling. The dominant discussion remains the **Function Hooks** proposal (#91870, 114 comments), which sketches an Express/Koa-style continuation model for deeply extensible plugins. Meanwhile, the long-running Windows MSIX install/launch failure cluster continues to accumulate root-cause analyses from users.

## 2. Releases

- **v2.1.263** — Generic "bug fixes and reliability improvements" changelog; no itemized notes. Ships while users are still triaging the 2.1.258–2.1.260 peer-messaging regression ([#92258](https://github.com/anthropics/claude-code/issues/92258)), which several users note makes it hard to know whether a fix landed.

## 3. Hot Issues

1. **[Function Hooks — make plugins 10x more powerful](https://github.com/anthropics/claude-code/issues/91870)** (#91870, OPEN, 114 💬 / 73 👍) — The week's most active thread. A community design proposal for a `$`-object-based hook API with side-effect tracking and registration-order `next()` composition. Strong engagement suggests plugin authors want far deeper interception points than current hooks offer.

2. **[Claude Desktop fails to launch on Windows — orphaned Silo/Job Object](https://github.com/anthropics/claude-code/issues/53247)** (#53247, OPEN, 67 💬) — After an app crash, an orphaned job object blocks relaunch (HRESULT 0x80070020) until logoff/reboot. Open since April; new root-cause work in [#91763](https://github.com/anthropics/claude-code/issues/91763) implicates `git fsmonitor--daemon` inheriting the AppX container job and surviving forced update shutdowns — includes a no-reboot workaround.

3. **[German umlauts randomly replaced with ASCII substitutes](https://github.com/anthropics/claude-code/issues/14131)** (#14131, OPEN, 41 💬) — Long-standing localization bug where ä/ö/ü become ae/oe/ue nondeterministically. Has repro; still open after ~9 months, making it a touchpoint for non-English users.

4. **[Windows installer fails with 0x80073CF6 after inconsistent prior install](https://github.com/anthropics/claude-code/issues/49917)** (#49917, OPEN, 38 💬) — The hub issue for a cluster of MSIX failures (see also closed duplicates #68792, #73734, #87314). Users are sharing manual `C:\ProgramData\Packages` cleanup recipes since no official fix has shipped.

5. **[Cross-platform sync failure — Cowork conversations disappear](https://github.com/anthropics/claude-code/issues/81658)** (#81658, OPEN, 17 💬) — Suspected server-side incident causing chats to vanish across Desktop/Web/Android. Matters because it undermines trust in cloud-stored sessions.

6. **[SendMessage/ListAgents broken after 2.1.258 → 2.1.260](https://github.com/anthropics/claude-code/issues/92258)** (#92258, OPEN, regression) — Cross-session peer messaging stopped working after a background update on Windows. Related: [#92409](https://github.com/anthropics/claude-code/issues/92409) (SendMessage tool absent from toolset while ListAgents advertises it) and [#91139](https://github.com/anthropics/claude-code/issues/91139) (message delivery kills the recipient's in-flight background Bash tasks). A fragile spot in the multi-agent story.

7. **[Skill/command argument substitution off by one](https://github.com/anthropics/claude-code/issues/92457)** (#92457, OPEN, filed today, has repro) — `$0`/`$1` map to `args[0]`/`args[1]` instead of the documented 1-indexed convention, and `$2`–`$9` are never substituted. Directly breaks skill/command authors; small but high-leverage fix.

8. **[Opt-out for find→bfs / grep→ugrep shadow functions](https://github.com/anthropics/claude-code/issues/69736)** (#69736, OPEN, 12 💬) — The Bash tool silently replaces `find`/`grep` with bundled `bfs`/`ugrep` via shell snapshots. Users want transparency and an escape hatch when shim behavior diverges from system binaries.

9. **[Session rot, directive violations, and manual handover before autocompact](https://github.com/anthropics/claude-code/issues/82476)** (#82476, OPEN) — Latest in a well-documented series (#81988, #80938, #85754) on CLAUDE.md directives being silently dropped in long sessions/compaction, with no signal at transition and unverified handover. A recurring trust issue for power users.

10. **[Scheduled Tasks: "model" field not persisted](https://github.com/anthropics/claude-code/issues/89439)** (#89439, OPEN, has repro) — Model pinning is silently ignored for tasks in the `claude-code-sessions` workspace. Pairs with (now-closed) #78558 on headless task hangs — routines/cloud scheduling still feels under-hardened.

## 4. Key PR Progress

Only 4 PRs saw activity in the window; three are substantive community fixes to the plugin/agent validation toolchain:

1. **[fix(pr-review-toolkit): repair invalid YAML frontmatter in all agents](https://github.com/anthropics/claude-code/pull/87077)** (#87077) — Agent descriptions containing unquoted dialogue lines parsed as nested mappings, loading agents with empty frontmatter. Fixes silent breakage of the toolkit's agents.

2. **[fix(security-guidance): make `**` glob patterns match zero-depth paths](https://github.com/anthropics/claude-code/pull/87079)** (#87079) — `fnmatch`-based matching made `**/*.ts` require a literal `/`, silently excluding top-level files from security rules despite the documented "any depth" contract. Security-relevant because the failure mode is silent non-coverage.

3. **[validate-agent.sh: don't abort at first warning; stop false-flagging valid agents](https://github.com/anthropics/claude-code/pull/89404)** (#89404) — Fixes three `set -euo pipefail` interactions that made the plugin-dev skill's validator fail on its own agent files. Fixes public issue #83803.

4. **[#56176 "Claude/book outline bootstrap toolkit"](https://github.com/anthropics/claude-code/pull/56176)** — Title/body appear incoherent; likely spam or accidental submission. Maintainers will presumably close.

## 5. Hot Discussions

*Omitted — no discussion data was provided in this cycle's dataset.*

## 6. Feature Request Trends

- **Deeper plugin extensibility**: Function Hooks (#91870) is the clearest signal — developers want safe, composable interception of core behavior, not just lifecycle event hooks.
- **Session portability & sync resilience**: resuming sessions across devices (#47926, closed as duplicate of a tracked request) and reliable cloud sync (#81658).
- **Transparency and opt-outs for injected behavior**: escape hatches for `bfs`/`ugrep` shims (#69736); visible signals when server-side flags disable bundled skills (#83565).
- **Scheduled-task hardening**: persistent model pinning (#89439) and reliable headless execution.
- **Long-context fidelity**: keeping CLAUDE.md directives alive through compaction, plus verified/automated handover at context limits (#82476 and related series).
- **Fix-quality preferences**: prefer complete fixes over quick workarounds when effort is low (#80003).

## 7. Developer Pain Points

- **Windows packaging lifecycle is the #1 recurring pain**: a months-long cluster of MSIX/AppX failures (0x80073CF6 installs, 0x80070020 launches, ENAMETOOLONG in Cowork) with community-derived root causes (orphaned job objects, ACL-corrupted package dirs, daemons inheriting the AppX container) but no consolidated official fix. Reboot-free recovery remains user-discovered.
- **Regression risk in the fast release cadence**: 2.1.196 introduced the sandbox E2BIG regression (#73437); 2.1.258→2.1.260 broke peer messaging (#92258). Opaque release notes ("bug fixes and reliability improvements") make it hard to correlate fixes and regressions.
- **Silent context degradation**: directive loss after compaction with no user-visible signal (#81988/#80938/#82476/#85754) is eroding trust among long-session users; mitigations are currently manual and unverified.
- **Multi-session/multi-agent fragility**: tools missing from toolsets, messaging regressions, and message delivery killing background tasks (#92258, #92409, #91139) — the feature set is powerful but brittle.
- **Silent behavior substitution**: injected shell shims and server-side skill flags change behavior without disclosure (#69736, #83565).
- **Sandbox growing pains on macOS**: Seatbelt profile bloat with many worktrees (#73437, closed) and the sandbox blocking its own eval wrapper (#77466, closed) show the macOS sandbox path needs more testing with real-world repo layouts.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区简报 — 2026-09-06

## 1. 今日要点

过去 24 小时没有发布新版本，但工程活动相当密集：**共关闭 32 个 PR**，其中最突出的是一场大规模协同攻坚，目标是构建**原生语音运行时基础设施**（面向 Windows/macOS/Linux 的 Bazel 构建目标、实时 WebRTC 会话 API、Opus RTP 处理）——强烈表明语音模式正处于积极开发之中。与此同时，会话历史可靠性仍是社区最关心的问题：今天又有两份新报告（[#43142](https://github.com/openai/codex/issues/43142)、[#43124](https://github.com/openai/codex/issues/43124)）显示分页线程序号冻结问题在 CLI 0.153.4 中依然存在，尽管一项带保护的传统恢复（legacy-resume）修复（[PR #43178](https://github.com/openai/codex/pull/43178)）已经落地。Windows 用户仍是 issue 数量的主要来源。

## 2. 版本发布

过去 24 小时没有版本发布。

## 3. 热门 Issue

1. **[#28919](https://github.com/openai/codex/issues/28919) — Windows 应用缺少“控制其他设备”标签页**（62 💬，55 👍）
   讨论最热烈的未关闭 issue。Windows Pro 用户无法访问其他平台上已有的远程控制设置，设备配对工作流被完全阻断。该问题已存在近三个月仍未解决——Windows 平台功能对齐上的明显缺口。

2. **[#41463](https://github.com/openai/codex/issues/41463) — [Windows + WSL] 无法创建项目：`AbsolutePathBuf` 反序列化失败**（30 💬，20 👍）
   一个硬性阻断问题：WSL2 用户完全无法创建项目，原因是路径反序列化缺少基础路径（base path）。这份仅一周的报告 👍 增速很快，说明其影响波及大量 Windows + WSL 开发者群体。

3. **[#27117](https://github.com/openai/codex/issues/27117) — 独立版更新从 pwsh 继承 `PSModulePath`，导致 `Get-FileHash` 失败**（31 💬，21 👍）
   Windows 底层机制的深层问题：更新过程中从 PowerShell 7 启动 `powershell.exe` 导致模块路径污染、更新失败。这是更广泛的 Windows 更新可靠性问题集群的典型缩影。

4. **[#41079](https://github.com/openai/codex/issues/41079) — Windows 分页线程历史因序号重复而停滞**（29 💬）
   UI 显示的是过期快照，而 rollout JSONL 中其实保存着完整、已完成的对话。这不是数据丢失——而是投影停滞——但对受影响的用户而言与数据丢失别无二致。属于跨平台序号重复模式的一部分（参见下文 #43142）。

5. **[#41960](https://github.com/openai/codex/issues/41960) — Windows 上 Pets 对点击/拖拽无响应**（17 💬，22 👍）
   近期 issue 中 👍 数最高；对受影响的 Windows 用户来说，Pets 功能实际上完全无法交互。相关 issue：[#42661](https://github.com/openai/codex/issues/42661)（多显示器/DPI 环境下输入区域偏移）和 [#42243](https://github.com/openai/codex/issues/42243)（"Tuck Away"收起后悬浮层再次出现）。

6. **[#41339](https://github.com/openai/codex/issues/41339) — AppX 迁移后，待处理的应用内更新策略导致启动阻塞超过 5 分钟**（15 💬）
   这是迁移至 Microsoft Store 之后出现的回归问题，使应用在启动时看似卡死。首次运行/首次更新的体验严重受损。

7. **[#35555](https://github.com/openai/codex/issues/35555) — 当 `logs_2.sqlite` 被写锁占用时，CLI 启动时直接硬性失败**（10 💬）
   一个遥测数据库以固定的 5 秒 busy_timeout 且毫无重试的方式卡住了 CLI 启动——CLI 在身份验证甚至还没运行时就已退出。架构坏味道：可观测性绝不应阻塞产品本身。

8. **[#39054](https://github.com/openai/codex/issues/39054) — MCP OAuth：被拒绝的 refresh token 无限重试，且没有重新认证提示**（9 💬，5 👍）
   在五个 CLI 版本（0.140 → 0.148-alpha）上完全复现。被拒绝的 token 仍被标记为“可用”，导致 MCP 服务器静默失败，而不是弹出登录流程。对重度依赖 MCP 的工作流影响重大。

9. **[#43142](https://github.com/openai/codex/issues/43142) — [0.153.4] 恢复时在尾部 `token_count` 记录之后重用 rollout 序号**（今日新增）
   今天针对最新版 CLI 提交：恢复被中断的任务会让桌面端历史冻结在较早的状态。结合 [#43124](https://github.com/openai/codex/issues/43124)（macOS、同日提交、序号不匹配 3185 vs 3184）来看，可以确认序号重复缺陷**在当前构建中尚未修复**。

10. **[#41338](https://github.com/openai/codex/issues/41338) — 内联图片输出仅约 230 token，但线上传输量达 4.2 MB**（5 💬）
    一份出色的取证式报告：基于 token 的上下文管理看不到那些卡死线程的有效负载，这与较早的 #18629 中的一个假设相矛盾。解释了图像生成工具调用后线程神秘冻结的原因。值得一提：[#41957](https://github.com/openai/codex/issues/41957) 报告在可比任务之间 Plus 配额消耗增加约 9 倍。

## 4. 关键 PR 进展

*以下所有 PR 均已关闭（已合并或已完成），作者均为 `copyberry[bot]`。*

1. **[#43178](https://github.com/openai/codex/pull/43178) — 允许在后台迁移启用时进行带保护的传统恢复**
   当 rollout 维护锁可以确保恢复期间不发生迁移时，恢复 TUI 缓存的传统恢复快捷方式。与上文序号/恢复冻结的报告直接相关。

2. **[#43097](https://github.com/openai/codex/pull/43097) — 基于 helper 的实时 WebRTC 会话 API**
   新增 `RealtimeWebrtcSession`，提供可克隆的句柄用于协商、音频控制和电平表——这是即将推出的语音模式的核心 API 基础。

3. **[#43100](https://github.com/openai/codex/pull/43100) — 有界的传入 Opus RTP 处理**
   在进入 track 队列之前拦截传入的 Opus RTP，并施加严格上限（待处理量 64 个数据包 / 2 MiB，单个数据包 64 KiB）——注重内存安全的媒体管线工作。

4. **[#43090](https://github.com/openai/codex/pull/43090) — 通过 RTP 发送处理后的麦克风音频**
   将音频采集接入传出媒体轨道，具备重采样、静音边界保留和陈旧音频限制——语音输入现在才真正能到达对端。

5. **[#43144](https://github.com/openai/codex/pull/43144) — 面向原生语音库的 Windows MSVC Bazel 构建目标**
   提供显式的 x64/ARM64 原生构建、运行时准备和链接目标。连同 [#43126](https://github.com/openai/codex/pull/43126)、[#43125](https://github.com/openai/codex/pull/43125)、[#43121](https://github.com/openai/codex/pull/43121)、[#43117](https://github.com/openai/codex/pull/43117)、[#43114](https://github.com/openai/codex/pull/43114)、[#43111](https://github.com/openai/codex/pull/43111)、[#43109](https://github.com/openai/codex/pull/43109)、[#43102](https://github.com/openai/codex/pull/43102) 和 [#43099](https://github.com/openai/codex/pull/43099)，这构成了一个约 13 个 PR 的集群，用于打造完全可复现、经回执校验的跨平台原生语音工具链——无论规模还是 Windows 优先的重视程度都相当引人注目。

6. **[#43177](https://github.com/openai/codex/pull/43177) — 全新启动 TUI 时使用服务器端模型默认设置**
   修复客户端过期的模型/推理设置泄漏到新会话的问题，包括服务器模型已被清除的边缘情况。

7. **[#43147](https://github.com/openai/codex/pull/43147) — 会话启动时按模型能力对实验性上下文进行门控**
   实验性上下文现在会检查模型的实际支持情况，子会话也不再盲目继承父会话的 token 预算激活状态。

8. **[#43120](https://github.com/openai/codex/pull/43120) — TUI 会话命令中受管的工作树创建**
   新增 `/worktree` 命令，并为 `/new` 和 `/fork` 提供工作树选项——借助隔离检出安全地进行并行实验，是一次有意义的工作流升级。

9. **[#43113](https://github.com/openai/codex/pull/43113) — 通过应用服务器保存子代理与记忆功能的启用确认**
   将 TUI 的启用确认提示改为经由服务器配置写入，并显式报告成功/覆盖/失败——为子代理和记忆带来更好的配置一致性。

10. **[#43110](https://github.com/openai/codex/pull/43110) — 在对话历史中记录推理力度变更（受 flag 控制）**
    默认关闭的 `reasoning_effort_override` 会追加可信的 `configuration_update` 记录——朝着完全可复现的会话转录迈出的一步。另见 [#43104](https://github.com/openai/codex/pull/43104)，将 Guardian 线程上下文整合进 `guardianv2` 配置。

## 5. 热门讨论

**想法**
- **[#14067](https://github.com/openai/codex/discussions/14067) — 跨设备同步线程与会话上下文**（61 👍，10 💬）：本周期得票最高的想法。在多台机器间工作的用户希望线程/上下文不再受本地状态束缚——该讨论历时已久且依然活跃。
- **[#37693](https://github.com/openai/codex/discussions/37693) — 在用户消息之间跳转的键盘快捷键**：基于锚点的导航，跳过助手/工具输出。
- **[#28073](https://github.com/openai/codex/discussions/28073) — 当前对话的可点击提示词导航器**：线程内用户提示词的可视化索引；与 #37693 互补。

**问答**
- **[#40740](https://github.com/openai/codex/discussions/40740) — rollout 追踪会记录是哪条路径产生了 `Declined` 执行状态吗？**：一个技术上颇具深度的问题，探讨将审批事件有意排除在 rollout 持久化之外的设计。

**展示与分享**
- **[#41157](https://github.com/openai/codex/discussions/41157) — CodexFuse 1.2.0：查看 Codex 速率限制的本地 Windows 仪表盘**：第三方工具，无需 API key 即可显示已用/可用配额和重置时间——印证了配额可见性方面未被满足的需求。

**综合**
- **[#42992](https://github.com/openai/codex/discussions/42992) — OpenClaw 子代理会话显示为侧边栏顶层聊天**：内部子线程污染了侧边栏，其中部分无法归档；与 [#42236](https://github.com/openai/codex/issues/42236) 中关于侧边栏整洁性的抱怨相呼应。

## 6. 功能请求趋势

- **跨设备线程/会话同步**——遥遥领先的最强信号（#14067 获 61 👍），再叠加远程控制的痛点（#28919、#36040）。
- **长对话导航**——两项活跃提案（#37693、#28073），用于在长线程中跳转/索引用户提示词。
- **速率限制与配额透明度**——配额消耗增加 9 倍的报告（#41957）加上社区自建的监控仪表盘，表明用户缺乏可靠的消耗可见性。
- **Windows 功能对齐**——Remote Control 标签页（#28919）、WSL 项目支持（#41463）和 MS Store 更新稳定性（#26792、#30015）是呼声最高的请求。
- **桌面平台打磨**——Linux 原生窗口装饰（#38595）以及子代理线程的侧边栏整洁性（#42992、#42236）。

## 7. 开发者痛点

- **Windows 是各类摩擦的重灾区。** 前 30 个 issue 中约有半数是 Windows 特有的：更新失败（#27117、#30015、#26792）、超过 5 分钟的启动挂起（#41339）、WSL 项目创建失败（#41463）、UI 不可见（#32926），以及 Defender 对未签名 `codex-computer-use.exe` 的误报（#31419）。MS Store/AppX 迁移则是反复加剧问题的因素。
- **分页历史序号冻结在当前构建中仍未修复。** 重复序号导致的投影停滞横跨 macOS 和 Windows（#41079、#40178），今天又新增两份针对 CLI 0.153.4 的*新*报告（#43142、#43124）——尽管相关恢复/迁移 PR 已经发布。这是追踪器中最顽固的正确性问题。
- **资源与生命周期泄漏。** 恢复子代理线程时出现重复的 MCP 和 `node_repl` 进程栈（#37453），以及一个硬性阻断 CLI 启动的遥测 SQLite 锁（#35555），两者都表明生命周期管理仍需加固。
- **Token 计量 ≠ 实际资源开销。** 内联图片仅约 230 token 但线上传输量达 4.2 MB（#41338），打破了上下文管理的前提假设，并让线程在无形之中卡死。
- **静默失败的认证流程。** MCP OAuth refresh-token 无限重试且没有重新认证提示（#39054），以及 DCR 发现忽略 `WWW-Authenticate resource_metadata`（#42427），使 MCP 集成的调试格外脆弱。
- **Pets 功能在 Windows 输入处理尚未稳固之前就已上线**——三个独立的输入缺陷（#41960、#42243、#42661）影响 DPI/多显示器配置，且 👍 数量不低。

---

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区简报 — 2026-09-06

## 1. 今日要点

本周期，Agent 可靠性问题在 issue 跟踪器中占据主导：子 Agent 虚报成功与通用 Agent 死锁是讨论最多的开放 bug，与此同时，Auto Memory 因敏感信息脱敏与日志记录行为引发新一轮安全审视。贡献方面，安全加固领跑开放 PR——包括 Windows 沙箱的 git 参数校验（#29184）和面向受限环境的认证崩溃修复（#29163）——另有一批值得关注的 Claude Code 迁移正确性修复。Nightly 版本 `v0.60.0-nightly.20260906` 已如期发布。

## 2. 版本发布

- **v0.60.0-nightly.20260906.g85aca163f** — 例行 nightly 构建；未发布逐项变更日志。[与上一 nightly 版本对比](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260905.g85aca163f...v0.60.0-nightly.20260906.g85aca163f)

## 3. 热门 Issue

| Issue | 为何值得关注 |
|---|---|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子 Agent 触及 MAX_TURNS 却被上报为 GOAL 成功 (13💬, P1) | `codebase_investigator` 在尚未开始分析便触及轮次上限后，仍返回 `status: "success"`。掩盖失败会破坏编排层面的信任；已被标记待复测。 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖 OS 沙箱与意图路由 (9💬) | 架构提案：利用 Gemini 3 对 bash 的原生亲和性，通过 OS 级沙箱加执行后意图路由来落地，而非重新实现工具。 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用 Agent 卡死 (8💬, 👍8, P1) | 即便是琐碎任务（如创建文件夹）也会无限卡死；用户必须显式禁止子 Agent 委派。👍 数量高企，说明影响范围广泛。 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — 感知 AST 的文件读取/搜索/映射 EPIC (7💬) | 探索 AST 工具（tilth/glyph），一次调用即可读取精确的方法边界——减少轮次浪费、降低 token 噪声。 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Skills 与子 Agent 利用不足 (6💬) | 除非显式指示，模型不会调用自定义 skills（如 gradle/git）——这是一个影响重度用户的路由/提示缺口。 |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Auto Memory 脱敏与日志记录 (5💬, 安全) | 敏感信息仅在对话内容进入模型上下文*之后*才被脱敏；社区呼吁实现确定性的发送前脱敏并减少日志。 |
| [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 卡在 "Awaiting user input" (4💬, 👍3, P1) | 命令执行完毕后 CLI 仍一直挂起；属于影响基础 shell 调用的核心工作流阻断问题。 |
| [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子 Agent 在 Wayland 上运行失败 (4💬, P1) | 未执行任何工作即上报 GOAL 终止；这是 Linux 显示服务器层面的兼容性缺口。 |
| [#20079](https://github.com/google-gemini/gemini-cli/issues/20079) — 符号链接的 agents 不被识别 (4💬) | `~/.gemini/agents/*.md` 的符号链接被忽略，阻碍 dotfile 仓库管理工作流。 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 工具数 >128 时报 400 错误 (3💬) | 大量 MCP/工具注册触及 API 限制；诉求更智能的动态工具范围控制。 |

*另值得关注：* [#22186](https://github.com/google-gemini/gemini-cli/issues/22186) GSD 输出钩子崩溃（P1）、[#22672](https://github.com/google-gemini/gemini-cli/issues/22672) 防范破坏性 git/DB 操作、[#22267](https://github.com/google-gemini/gemini-cli/issues/22267) 浏览器 agent 无视 `settings.json` 覆盖配置。

## 4. 重要 PR 进展

| PR | 说明 |
|---|---|
| [#29184](https://github.com/google-gemini/gemini-cli/pull/29184)（开放，P1/安全） | Windows 沙箱：校验 git 参数，防止在允许只读、非 YOLO 模式下 `git diff --output` 静默截断文件。 |
| [#29163](https://github.com/google-gemini/gemini-cli/pull/29163)（开放，P1/安全） | 修复在 macOS Seatbelt/受限权限下于 git 仓库中运行时的启动崩溃（问题出在 `useGitBranchName` 钩子）。 |
| [#29098](https://github.com/google-gemini/gemini-cli/pull/29098)（开放） | React 正确性：从 `useInputHistoryStore` 的更新器中移除副作用，避免在 StrictMode 下出现双重执行风险。 |
| [#29125](https://github.com/google-gemini/gemini-cli/pull/29125)（开放） | 迁移修复：Claude Code 的 hook 超时单位是秒，Gemini CLI 是毫秒——迁移后的 `"timeout": 30` 会变成 30ms。 |
| [#29195](https://github.com/google-gemini/gemini-cli/pull/29195)（开放） | `/resume` 在历史记录非数组的 checkpoint 上不再抛出裸 `TypeError` 崩溃；现在会优雅降级。 |
| [#29205](https://github.com/google-gemini/gemini-cli/pull/29205)（开放） | MCP prompts：直接提交响应文本而非 JSON 编码，保留内嵌的引号/换行。 |
| [#29106](https://github.com/google-gemini/gemini-cli/pull/29106)（已关闭） | SSE 解析器现在会在 EOF 时 flush 最后一个缓冲事件——此前 `finishReason`/用量元数据可能被静默丢弃。 |
| [#29117](https://github.com/google-gemini/gemini-cli/pull/29117)（已关闭） | 在 MCP OAuth 流程中强制执行 RFC 9207 签发方标识，防止 token 被意外路由到别处。 |
| [#28967](https://github.com/google-gemini/gemini-cli/pull/28967)（已关闭） | 阻止 `refreshStatic()` 在标准缓冲模式下清空 Linux/Unix 终端模拟器的回滚缓冲。 |
| [#28968](https://github.com/google-gemini/gemini-cli/pull/28968)（已关闭） | 发现阶段对经符号链接/junction 的 skills 目录（`.gemini` ↔ `.agents`）去重，修复重复注册问题。 |

*另外：* [#29126](https://github.com/google-gemini/gemini-cli/pull/29126) 通过在 SDK 路由之前挂载 `express.json()`，修复 a2a-server 的 JSON-RPC 请求体解析。⚠️ *质量提示：* 本周期若干低价值、顺手提交的 PR（#29227 Jekyll workflow、#29193 空模板、#29127 "Compare"）已被关闭——维护者的审查带宽依旧是一项成本。

## 5. 热门讨论

*已省略——本周期数据集中无讨论数据。*

## 6. 功能请求趋势

- **子 Agent 可观测性与控制** — 可共享的子 Agent 轨迹（[#22598](https://github.com/google-gemini/gemini-cli/issues/22598)）、`/bug` 报告中的子 Agent 上下文（[#21763](https://github.com/google-gemini/gemini-cli/issues/21763)）、如实上报的终止状态（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)）。
- **感知 AST 的代码智能** — 精确的方法边界读取与代码库映射（[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)），以及节省 token 的“巧妙提取”（[#19561](https://github.com/google-gemini/gemini-cli/issues/19561)）。
- **沙箱与安全** — 零依赖 OS 沙箱（[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)）与防范破坏性 git/DB 操作的护栏（[#22672](https://github.com/google-gemini/gemini-cli/issues/22672)）。
- **Auto Memory 加固** — 确定性脱敏（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)）、无效补丁隔离（[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)）、低信号会话的重试上限（[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)）。
- **配置保真与互操作** — 浏览器 agent 遵循 `settings.json` 覆盖配置（[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)）、符号链接支持（[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)）、agents 标准 skills 去重（[#28968](https://github.com/google-gemini/gemini-cli/pull/28968)）。

## 7. 开发者痛点

- **卡死是头号挫败点**：通用 Agent 死锁（[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)）、命令完成后 shell 卡在 "Awaiting user input"（[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)），以及在 `create-vite` 之类交互式提示处停滞（[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)）。
- **掩盖失败**：子 Agent 在实际被中断时仍上报 GOAL/成功（[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)、[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)），令失败难以察觉与调试。
- **工作区卫生**：模型会把临时编辑脚本散落在各种随机目录，令干净提交变得困难（[#23571](https://github.com/google-gemini/gemini-cli/issues/23571)）。
- **规模限制**：>128 个工具触发 400 错误（[#24246](https://github.com/google-gemini/gemini-cli/issues/24246)）；不经显式提示，skills/子 Agent 便不会被使用（[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)）。
- **终端体验**：窗口尺寸调整时的闪烁（[#21924](https://github.com/google-gemini/gemini-cli/issues/21924)）、回滚缓冲被清空（已在 [#28967](https://github.com/google-gemini/gemini-cli/pull/28967) 中修复），以及 `\n` 转义的怪异行为（[#22466](https://github.com/google-gemini/gemini-cli/issues/22466)）。
- **隐私顾虑**：Auto Memory 在脱敏发生之前就把对话内容发送给抽取模型（[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)）——这是本周期最紧迫的安全相关抱怨。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-06

## 1. 今日要点

过去 24 小时内没有版本发布或拉取请求活动落地——今天的信号完全由 issue 驱动。主要议题包括:**v1.0.82 中 BYOK 的成本/可靠性回归**(提示词缓存静默失效、截断轮次导致数据丢失)、一个**新近出现的升级回归，导致基于 worktree 的会话全部损坏**(desktop 2.98.0 / runtime 1.1.15),以及企业方面的好消息：两个长期悬而未决的 issue([#4527](https://github.com/github/copilot-cli/issues/4527)、[#4272](https://github.com/github/copilot-cli/issues/4272))现已关闭。

## 2. 热门 issue

1. **[#4695](https://github.com/github/copilot-cli/issues/4695) — MCP OAuth 令牌无法跨会话可靠复用** *(authentication, mcp)*
   使用 PKCE 公共客户端的 HTTP MCP 服务器会以不同的缓存键哈希生成重复的令牌缓存条目，迫使用户反复重新认证。这是今天评论最多的 issue(5 条评论)——随着 MCP 服务器采用范围的扩大，这一摩擦点正日益加剧。

2. **[#4692](https://github.com/github/copilot-cli/issues/4692) — CLI 未遵循企业默认模型** *(enterprise, models)*
   组织管理的默认模型 `MAI-Code-1.1-Flash` 在 VS Code 和 GitHub Desktop 中均能正确生效，但 CLI 会发出警告并回退(4 条评论)。这凸显了 CLI 与其他 Copilot 客户端之间的策略一致性差距。

3. **[#4527](https://github.com/github/copilot-cli/issues/4527) — ✅ 已关闭:`copilot -p` 在 GHEC 数据驻留租户上报 401**
   自 1.0.81-1 起，非交互式提示模式从 `api.githubcopilot.com` 而非租户端点获取模型目录，而交互模式工作正常。该 issue 的关闭(4 👍)对在 CI 中运行 CLI 的 GHEC DR 客户意义重大。

4. **[#4272](https://github.com/github/copilot-cli/issues/4272) — ✅ 已关闭：新模型因组织策略被置灰** *(enterprise, models)*
   模型显示 “disabled by your organization's policy”,但设置链接中并无任何开关(3 👍)。问题的解决表明策略/UX 层面的困惑已得到处理。

5. **[#4734](https://github.com/github/copilot-cli/issues/4734) — 升级 desktop 2.98.0 / runtime 1.1.15 后所有会话均报 “Worktree missing”** *(sessions)*
   昨天提交；自动更新后，所有基于 worktree 的会话——既有的*和*新建的——全部损坏。目前尚无回应；看起来是一个值得密切关注的回归问题。

6. **[#4720](https://github.com/github/copilot-cli/issues/4720) — v1.0.82 BYOK 静默禁用提示词缓存(~5x 成本)** *(networking, models)*
   聊天请求未携带任何缓存声明；提供商用量数据证实 `cached_tokens=0`,因此每一轮都要为不断增长的完整上下文重新计费。这对 BYOK 用户来说是直接的成本放大器，目前尚无维护者回应。

7. **[#4694](https://github.com/github/copilot-cli/issues/4694) — WSL2:长时间会话下 ~31 GB RSS、~57% CPU 占用** *(platform-linux)*
   一个长时间运行的 agent 会话(Claude Opus 5,high effort,上下文占用 ~47%)在 WSL2 上内存急剧膨胀。对于长时间运行的 agent 式工作流而言，这是严重的资源占用隐患。

8. **[#4706](https://github.com/github/copilot-cli/issues/4706) — 工具调用间歇性输出格式错误的调用标记并静默无操作** *(tools)*
   值得注意的细节：该 issue 由 Copilot CLI agent 本身(Claude Opus 4.8)在 Windows/PowerShell 上提交。静默的工具调用失败会侵蚀用户对 agent 可靠性的信任，且在任务中途难以察觉。

9. **[#4735](https://github.com/github/copilot-cli/issues/4735) — 工具调用前面向用户的文本被折叠进 “Thought for Ns”** *(terminal-rendering)*
   当一个大段推理块之后是可见文本块、随后紧跟工具调用时，渲染器会把回答重新归类为推理内容，永远不再显示。关键输出可能因此被静默隐藏。

10. **[#4733](https://github.com/github/copilot-cli/issues/4733) — `max_output_tokens` 截断会丢弃响应*及*续写内容** *(sessions)*
    在 BYOK 场景下(提供商限制 65,536 token),截断会导致事件未被发出/未被记录，后续的 “continue” 请求也会丢失——这是续写处理中数据丢失级别的 bug。

## 3. 关键 PR 进展

过去 24 小时内没有任何拉取请求更新。

## 4. 功能请求趋势

- **内联建议的按键绑定易用性** — 支持上下文相关的 `Ctrl+E` 来接受补全，与 Emacs 风格的终端惯例保持一致([#4736](https://github.com/github/copilot-cli/issues/4736))。
- **远程会话的移动端对等支持** — 在 Android 版 GitHub Mobile 中正确渲染远程会话 UI;WebSocket 数据已到达却未显示([#3498](https://github.com/github/copilot-cli/issues/3498),3 👍)。
- **最新版 Windows 上的沙箱覆盖** — 识别/支持 Windows 25H2 版本，而不是警告 “not supported on this host”([#4652](https://github.com/github/copilot-cli/issues/4652))。
- **Hook/插件生命周期语义** — 修正 `agentStop` 在子 agent 各轮次之间的行为，使轮次后的 hook 不会卡住 `/review` 之类的命令([#3894](https://github.com/github/copilot-cli/issues/3894))。
- **企业管理员体验** — 更清晰的组织模型策略开关，以及 CLI/VS Code/Desktop 间一致的组织默认设置([#4272](https://github.com/github/copilot-cli/issues/4272)、[#4692](https://github.com/github/copilot-cli/issues/4692))。

## 5. 开发者痛点

- **BYOK 成本与可靠性缺陷：** 提示词缓存被静默禁用(~5x 账单)([#4720](https://github.com/github/copilot-cli/issues/4720));截断处理丢失整轮内容([#4733](https://github.com/github/copilot-cli/issues/4733))。
- **企业/数据驻留摩擦：** 租户端点路由(已在 [#4527](https://github.com/github/copilot-cli/issues/4527) 修复)、组织默认模型未被遵循([#4692](https://github.com/github/copilot-cli/issues/4692))、模型策略 UX 不透明([#4272](https://github.com/github/copilot-cli/issues/4272))。
- **认证/会话持久化：** 缓存键重复导致 MCP 服务器需要反复进行 OAuth 流程([#4695](https://github.com/github/copilot-cli/issues/4695))。
- **资源占用：** 长时间 agent 会话中内存/CPU 极端增长，WSL2 上最为严重([#4694](https://github.com/github/copilot-cli/issues/4694))。
- **输出保真度：** 面向用户的回答被隐藏在折叠的推理内容中([#4735](https://github.com/github/copilot-cli/issues/4735)),以及工具调用静默无操作([#4706](https://github.com/github/copilot-cli/issues/4706))。
- **升级回归：** desktop 2.98.0 / runtime 1.1.15 自动更新后基于 worktree 的会话损坏([#4734](https://github.com/github/copilot-cli/issues/4734))——这是今天这批 issue 中最新的一条，适合尽快分诊处理。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区简报 — 2026-09-06

## 1. 今日要闻

过去 24 小时没有发布新版本，但贡献者的 PR 流水线异常活跃，约 20 个 PR 有更新——包括无头会话韧性(provider 重试、SSE 超时)、数据库维护(增量 auto-vacuum)以及 Desktop 网络(13 个请求合并为 1 个)方面的修复。在 issue 跟踪器上，最突出的主题是 **OpenCode Go 订阅可靠性**：一批新报告(#47547、#47613、#47614、#45278)描述了订阅被阻断、挥之不去的 429 错误以及影响付费用户的配额核算 bug。与此同时，得票最高的活跃 bug 仍然是 `@` 文件提及索引过期问题(#32747)，目前已达 13 个 👍。

## 2. 版本发布

过去 24 小时无发布。

## 3. 热门 Issue

1. **[#32747](https://github.com/anomalyco/opencode/issues/32747) — `@` 文件提及找不到启动后创建的文件**(15 💬、13 👍)。本周参与度最高的未关闭 bug:TUI 的文件选择器使用的是过期的搜索索引，导致新建文件在重启前始终不可见。高 👍 数说明它已经影响日常工作流。

2. **[#47547](https://github.com/anomalyco/opencode/issues/47547) — 百分比求和式核算导致 Go 订阅被阻断**。"Monthly Usage 100%" 是按各模型百分比之和计算的，而非实际美元消费额与 $60 上限的对比，导致用户明明还有充足预算却被锁在门外。今日新开，已有 4 条评论。

3. **[#45278](https://github.com/anomalyco/opencode/issues/45278) — 连续 3 个月成功扣款后付款被拒**(10 💬)。银行确认自己一侧没有任何问题；此类续费失败会直接阻断付费客户，并在社区引发持续讨论。

4. **[#47613](https://github.com/anomalyco/opencode/issues/47613) — 用量很低却持续遭遇 HTTP 429(retry-after 长达 12h)**。一位付费订阅者称 Go “约 3 天基本无法使用”；且重试窗口还在不断重置。相关的法语孪生 issue:[#47598](https://github.com/anomalyco/opencode/issues/47598)。

5. **[#47614](https://github.com/anomalyco/opencode/issues/47614) — 月度续费后周配额卡在 100%**。月度配额正确重置了，周上限却没有，从而阻断了使用——这是一个计费状态 bug,与 #47547 的核算 bug 不同。

6. **[#47610](https://github.com/anomalyco/opencode/issues/47610) — 瞬时 503 不重试直接终止回合；无头会话卡死**。provider 只要返回一次 "no eligible device" 响应就会永久结束当前回合，而在 ACP/自主运行环境中没有人能重新发起提示。修复已在推进中([PR #47611](https://github.com/anomalyco/opencode/pull/47611))。

7. **[#47566](https://github.com/anomalyco/opencode/issues/47566) — 并发进程触发 SQLITE_BUSY**。多个 `opencode` 实例访问同一数据目录时超出 5 秒的 `busy_timeout`,报出 "Failed to execute statement"——对并行 agent 部署而言是实打实的问题。

8. **[#47485](https://github.com/anomalyco/opencode/issues/47485) — 单轮无头运行中 `compaction.prune` 从不裁剪上下文**。长时间的 `opencode run --format json` 任务每约 10 分钟就压缩一次，数小时内每次摘要烧掉 45–85k token。直接推高 CI/agent 成本。

9. **[#47587](https://github.com/anomalyco/opencode/issues/47587) — 会话中途，提示静默地不再送达模型**。UI 无法反馈请求是否已发出；报告者附上了视频。与 #47605 同属一类卡死问题(缺少 `Content-Type` 会绕过 body 超时，让会话永远停在 “busy” 状态)。

10. **[#46976](https://github.com/anomalyco/opencode/issues/46976) — 近期 Mac 版本启动缓慢(5–20 秒)**。在仅配置单个 MCP 服务器的 M 系列硬件上，抱怨规模已接近回归级别；几天过去问题仍然活跃。稳定性类别的其他提名：[#47037](https://github.com/anomalyco/opencode/issues/47037)(TUI 渲染时发生 SIGILL)和 [#42960](https://github.com/anomalyco/opencode/issues/42960)(V2 中 Esc 中断失效，退出后后台任务依然存活)。

## 4. 重点 PR 进展

1. **[#47611](https://github.com/anomalyco/opencode/pull/47611) — 对 provider 繁忙的纯文本错误进行重试**。将 "no eligible device" 之类的消息视为可重试，复用现有的 SessionRetry 调度(Retry-After、退避、尝试次数预算)。直接解决 #47610 的无头卡死问题。

2. **[#46802](https://github.com/anomalyco/opencode/pull/46802) — 在 HTTP SSE 流上让 `chunkTimeout` 生效**。该设置此前在配置中被接受，却从未在 native 路径上被读取；本 PR 将其接入 HTTP 传输层，补上了流停滞挂起这一真实缺口。

3. **[#47204](https://github.com/anomalyco/opencode/pull/47204) — 流始终连不上时对重连做退避**。用合理的退避策略取代固定的 1 秒重连循环，避免未认证的浏览器会话持续轰击服务器。

4. **[#47589](https://github.com/anomalyco/opencode/pull/47589) — 对已删除的数据库页执行增量 auto-vacuum**。渐进式回收 SQLite 空间，无需再手动 vacuum——解决长期存在的存储膨胀问题(#31526/#33356 部分不在范围内)。

5. **[#47578](https://github.com/anomalyco/opencode/pull/47578) — 一次请求读取位置的 catalog**。`data.location.sync` 目前在每个会话标签页、`/cd` 和重连时都要扇出到 13 个端点；本 PR 将其整合为单次往返。Desktop 上一次显著的性能收益。

6. **[#47595](https://github.com/anomalyco/opencode/pull/47595) — Skill 启用/禁用 + 偏好设置 API**。提供服务器级、持久化的 skill 偏好设置并附 UI 控件——是已关闭的能力抽象工作(#43536)以更精简形式的复活。

7. **[#47493](https://github.com/anomalyco/opencode/pull/47493) — 限制单次请求的图片数量，将图片数量超限归类为 overflow**。防止截图循环型 agent 累积 50+ 附件、突破 provider 的请求限制。

8. **[#47592](https://github.com/anomalyco/opencode/pull/47592) — 优雅处理 OAuth 回调错误**。通过妥善处理被取消/失败的登录而非让流程走进死胡同，一次性关闭三个 issue(#47590、#40232、#39414)。

9. **[#47607](https://github.com/anomalyco/opencode/pull/47607) — 优化 Levenshtein 并约束编辑锁**。在 `edit.ts` 中改用两行 DP 取代完整矩阵，并为锁加上边界——核心路径上的性能基本功。

10. **[#47599](https://github.com/anomalyco/opencode/pull/47599) — 按终端宽度动态调整 `DialogModel` 尺寸**。修复模型对话框在宽终端上默认采用 60 列 “medium” 的问题。另值得关注:[#47588](https://github.com/anomalyco/opencode/pull/47588)(已关闭/合并——Desktop sidecar 凭据移出渲染器，消除了 GET 请求上的 CORS 预检)和 [#46940](https://github.com/anomalyco/opencode/pull/46940)(以 agent 名称调用 `skill` 工具时给出友好提示)。

## 5. 热门讨论

*已省略——未提供讨论数据。*

## 6. 功能请求趋势

- **运行时权限控制**：通过斜杠命令开关自动批准(`/approve on|off`、`/auto`)是反复出现的诉求(#41909、#47579——后者在发现/落地 palette 访问入口后被关闭，说明需求跑在了可发现性前面)。
- **无头/agent 级韧性**：繁忙时重试(#47610)、可通过任务 ID 恢复失败的子 agent(#39196)、以及长单轮运行下的可控压缩(#47485)——用户正越来越多地把 OpenCode 当作无人值守的 agent 底座来运行。
- **provider/模型兼容广度**：包含斜杠的模型 ID(NVIDIA NIM #44799)、Copilot Enterprise 第三方模型(#34030)、以及面向本地 OpenAI 兼容端点的 MCP 工具定义(#39164)。
- **记忆与 skill 管理**：持久化 skill 偏好(#47595),外加一批寻求收录进生态列表的社区记忆插件(今天有三个独立的文档 PR:#47594、#47596、#47593)。

## 7. 开发者痛点

- **OpenCode Go 计费/配额可靠性是当前最响亮的信号**：续费被拒(#45278)、配额算错(#47547)、周上限卡死(#47614)、以及持续多日的 429 锁定(#47613、#47598)——全部来自付费订阅者，信任流失在不断叠加。
- **会话静默卡死**：缺少重试(#47610)、无限期的 body 等待(#47605)、以及会话中途 UI 假死(#47587),让无头用户与交互用户同样既没有反馈也没有恢复手段。
- **索引与状态过期**:`@` 提及 bug(#32747)、文件夹移动后项目源码根目录失效(#47603)、以及 V2 会话在 Esc/Ctrl+C 后泄漏后台任务(#42960)。
- **资源争用与膨胀**：并发进程下的 SQLITE_BUSY(#47566)与失控的压缩 token 开销(#47485)伤害多 agent 和 CI 场景。
- **启动与渲染回归**：Mac 上 5–20 秒的冷启动(#46976)和 Linux Bun 构建上的 SIGILL 崩溃(#47037),表明近期存在值得做一轮专项分诊的性能/稳定性回归。

---
*数据来源:[anomalyco/opencode](https://github.com/anomalyco/opencode) · 生成于 2026-09-06*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-06

## 1. Today's Highlights

No new release shipped in the last 24 hours, but it was an unusually active triage day — roughly two-thirds of the 30 tracked issues were closed, many within a day of being filed. Reliability dominated traffic in both directions: a same-day fix for a startup auth-snapshot race ([PR #9233](https://github.com/earendil-works/pi/pull/9233)) landed alongside a still-escalating OpenAI-Codex hang report ([#4945](https://github.com/earendil-works/pi/issues/4945), 76 comments) and a clean 0.84→0.85 Ollama regression ([#9216](https://github.com/earendil-works/pi/issues/9216)). Time-sensitive for `opencode-go` users: OpenCode Go began requiring an `x-opencode-session` header **today** ([#9230](https://github.com/earendil-works/pi/issues/9230)).

## 2. Releases

None in the last 24 hours.

## 3. Hot Issues

1. **[#4945](https://github.com/earendil-works/pi/issues/4945) — openai-codex Connection Reliability Issues** (OPEN, in-progress). The repo's most-discussed issue (76 comments, 32 👍, open since May): `gpt-5.5` sessions hang on `Working...` with no stream, tool call, or error — only Escape recovers, logging an aborted turn. Still actively triaged; the canonical codex-stability thread.
2. **[#7547](https://github.com/earendil-works/pi/issues/7547) — Windows usage sink-thread** (OPEN, 52 comments). Maintainer-initiated thread to decide which of the many Windows installation paths deserve core investment vs. delegation to extensions. Timely, given several Windows-specific bugs filed this week.
3. **[#9230](https://github.com/earendil-works/pi/issues/9230) — opencode-go missing `x-opencode-session` header** (CLOSED). OpenCode Go started rejecting header-less requests on 2026-09-06; Pi's provider doesn't send one. Breaking-change-adjacent for anyone on that provider — check this if `opencode-go` errors today.
4. **[#9216](https://github.com/earendil-works/pi/issues/9216) — Ollama `qwen3.8:27b`: stream `terminated` errors, 0.84→0.85 regression** (CLOSED). Clean regression report: repeated zero-usage `terminated` failures plus auto-compaction silently stopping after the first run. High-value repro for local-model users.
5. **[#9212](https://github.com/earendil-works/pi/issues/9212) — sonnet-5 via Vercel AI Gateway: 13% of `edit` calls truncated to `edits:[{}]`** (CLOSED). Exemplary data-driven report: 18/134 failed calls over a week, with the same model at 0% via fable. Isolates a gateway-specific truncation path.
6. **[#8684](https://github.com/earendil-works/pi/issues/8684) — `PI_OFFLINE` silently disables all provider model discovery** (OPEN). Documented as housekeeping-only, but kills model-catalog network lookups for the whole session. Classic docs-vs-behavior drift that surprises offline/air-gapped users.
7. **[#9226](https://github.com/earendil-works/pi/issues/9226) — 0.85.1 `./client` and `./experimental/plugin` exports broken** (CLOSED). The `exports` map points at unpublished `src/*.ts` paths (`ERR_PACKAGE_PATH_NOT_EXPORTED`), breaking SDK consumers on the current release.
8. **[#9229](https://github.com/earendil-works/pi/issues/9229) — Windows: `shell_path` ignored, WSL bash preferred even with WSL disabled** (CLOSED). Pi keeps invoking `wsl.exe` despite an explicit `shell_path` override — a top pain point for native-Windows workflows.
9. **[#9220](https://github.com/earendil-works/pi/issues/9220) — Slash-command autocomplete async race with fast typing / IME** (CLOSED). Fast input (especially Chinese pinyin IME) submits `/re` as a literal message before the async autocomplete menu mounts. Recurring CJK-input friction.
10. **[#8826](https://github.com/earendil-works/pi/issues/8826) — Cap agent retry backoff for prolonged transient outages** (OPEN). Requests a configurable ceiling on exponential agent-level retries so long `503 upstream call failed` stretches settle at a bounded interval rather than exploding. Practical ops ask from heavy users.

## 4. Key PR Progress

1. **[#9233](https://github.com/earendil-works/pi/pull/9233) — Resolve model auth live instead of from startup snapshot** (CLOSED same-day). Fixes a race where an unawaited background refresh left `hasConfiguredAuth()` false at startup, wrongly filtering out usable models.
2. **[#9116](https://github.com/earendil-works/pi/pull/9116) + [#9117](https://github.com/earendil-works/pi/pull/9117) — Mid-conversation system messages** (OPEN, stacked). Layer 1 adds the `system` role mid-session in `pi-ai`; layer 2 rewires the coding agent to deliver prompt/tool-loadout changes as deltas instead of rewriting the top-level prompt — a meaningful token-efficiency and cache-stability architecture change (split from #8998).
3. **[#9096](https://github.com/earendil-works/pi/pull/9096) — Meta provider with Muse subscription OAuth** (OPEN). Adds a subscription-backed provider; quirks include daily re-minted API tokens and burst (non-incremental) streaming. Resolves #7543.
4. **[#7610](https://github.com/earendil-works/pi/pull/7610) — LLM Gateway + DevPass providers** (OPEN). Built-in `openai-completions` providers for an OpenRouter-style router, contributed on behalf of the LLM Gateway team; replaces the auto-closed #7480.
5. **[#9137](https://github.com/earendil-works/pi/pull/9137) — Nix flake** (OPEN, WIP by mitsuhiko). First-class Nix packaging, long-requested by the NixOS crowd.
6. **[#9163](https://github.com/earendil-works/pi/pull/9163) — Simplify clipboard handling** (CLOSED). Vendors away an overkill Rust clipboard dependency, unblocking NixOS builds — pairs naturally with the flake work.
7. **[#9214](https://github.com/earendil-works/pi/pull/9214) — Invoke skills and prompt templates mid-sentence** (CLOSED). Implements #8457: `/name args` now expands anywhere in the input, including for skills with `disable-model-invocation: true`.
8. **[#9222](https://github.com/earendil-works/pi/pull/9222) — Reject reload during active session operations** (OPEN). In RPC mode, an extension reload mid-tool-call left the wrapper touching an invalidated runner and sending spurious errors to the model; now guarded via `isStreaming` checks.
9. **[#9227](https://github.com/earendil-works/pi/pull/9227) — Per-call tool confirmation example extension** (CLOSED). Ships alongside issue #9228: opt-in confirmation for state-changing custom tools, complementing `permission-gate.ts`.
10. **[#9224](https://github.com/earendil-works/pi/pull/9224) — Clamp OpenRouter `:free` maxTokens to base model** (CLOSED). `:free` catalog entries advertise inflated context windows (e.g., minimax-m3:free ~943k vs. a real 524k cap), causing 400s; Pi now clamps to the base model's limit.

*Also closed:* zero-row custom footers ([#9215](https://github.com/earendil-works/pi/pull/9215)), scrolled-up transcript indicator ([#7970](https://github.com/earendil-works/pi/pull/7970)), Proxy-trap preservation in `wrapUIPromptContext` ([#9219](https://github.com/earendil-works/pi/pull/9219)), and the `--no-extensions` example fix ([#9208](https://github.com/earendil-works/pi/pull/9208)).

## 5. Hot Discussions

**Ideas**
- **[#9207](https://github.com/earendil-works/pi/issues/9207) — Remove the "Available tools" section from the system message.** Argues the tool listing is redundant with the tools API and wastes tokens on every request (2 👍). Ties directly into the system-message-delta work in PRs #9116/#9117.

**Show and tell**
- **[#9213](https://github.com/earendil-works/pi/issues/9213) — Embed Agent-Friendly Score badge in README.** An external project scored pi **86.2/100** for agent friendliness and offers a README badge. Light on comments, but a nice external validation signal.

## 6. Feature Request Trends

- **Provider ecosystem breadth & correctness:** New native providers keep arriving (Requesty [#5473](https://github.com/earendil-works/pi/issues/5473), LLM Gateway [#7610](https://github.com/earendil-works/pi/pull/7610), Meta Muse [#9096](https://github.com/earendil-works/pi/pull/9096)), alongside demands that gateway configs actually work (`vercelGatewayRouting` is inert [#9211](https://github.com/earendil-works/pi/issues/9211), 1h cache writes billed at 5m rates [#9210](https://github.com/earendil-works/pi/issues/9210)) and payload efficiency via image `file_id` references [#8617](https://github.com/earendil-works/pi/issues/8617).
- **Extension API maturation:** Expose `ModelRuntime` to extensions ([#8791](https://github.com/earendil-works/pi/issues/8791)), cancellation for queued follow-up sends ([#9234](https://github.com/earendil-works/pi/issues/9234)), per-call tool confirmation ([#9228](https://github.com/earendil-works/pi/issues/9228) → PR #9227), and readable extension-load errors ([#9235](https://github.com/earendil-works/pi/issues/9235)).
- **TUI interaction polish:** Mid-sentence invocation (shipped in #9214), incremental scrolling vs. jump-to-start ([#5786](https://github.com/earendil-works/pi/issues/5786)), consistent menu keybindings ([#9199](https://github.com/earendil-works/pi/issues/9199)), and rendering quality (legacy LaTeX font switches [#8827](https://github.com/earendil-works/pi/issues/8827), Mermaid [#8158](https://github.com/earendil-works/pi/pull/8158)).
- **Packaging & distribution:** Nix support (flake + clipboard vendoring), an esbuild-free runtime install path for SDK consumers ([#9225](https://github.com/earendil-works/pi/issues/9225)), and reliable published exports ([#9226](https://github.com/earendil-works/pi/issues/9226)).
- **Resilience under upstream flakiness:** Bounded retry backoff ([#8826](https://github.com/earendil-works/pi/issues/8826)), OpenAI async tool calling support ([#9113](https://github.com/earendil-works/pi/issues/9113)), and predictable offline semantics ([#8684](https://github.com/earendil-works/pi/issues/8684)).

## 7. Developer Pain Points

- **Silent upstream failures:** The dominant frustration — hangs with no error ([#4945](https://github.com/earendil-works/pi/issues/4945)), truncated tool-call arguments at the gateway ([#9212](https://github.com/earendil-works/pi/issues/9212)), terminated local streams ([#9216](https://github.com/earendil-works/pi/issues/9216)), and unbounded retry waits during outages ([#8826](https://github.com/earendil-works/pi/issues/8826)).
- **Windows remains second-class:** Ignored `shell_path`/WSL assumptions ([#9229](https://github.com/earendil-works/pi/issues/9229)), IME candidate-window and autocomplete races ([#5200](https://github.com/earendil-works/pi/issues/5200), [#9220](https://github.com/earendil-works/pi/issues/9220)), and fullscreen image rendering bugs ([#9169](https://github.com/earendil-works/pi/issues/9169)) — which is exactly why the maintainers opened the Windows sink-thread (#7547).
- **Docs promising more than the code delivers:** `PI_OFFLINE` scope ([#8684](https://github.com/earendil-works/pi/issues/8684)) and `vercelGatewayRouting` ([#9211](https://github.com/earendil-works/pi/issues/9211)) are both documented behaviors that don't match implementation.
- **Release/packaging hygiene:** 0.85.1 shipped broken subpath exports ([#9226](https://github.com/earendil-works/pi/issues/9226)), SDK installs drag in esbuild unnecessarily ([#9225](https://github.com/earendil-works/pi/issues/9225)), and `bun run eval` recursively re-invokes itself ([#9223](https://github.com/earendil-works/pi/issues/9223)).
- **Extension API gaps for serious integrations:** No cancellation of queued follow-ups ([#9234](https://github.com/earendil-works/pi/issues/9234)), opaque load failures like "Unknown system error -122" ([#9235](https://github.com/earendil-works/pi/issues/9235)), and no access to the underlying model runtime ([#8791](https://github.com/earendil-works/pi/issues/8791)) block builders of monitoring/multi-agent tooling.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-06

## 1. Today's Highlights

Two builds shipped in the last 24 hours — **v0.23.0-nightly** and **v0.23.1-preview.0** — both headlined by dynamic workflow run visualization in Web Shell ([PR #10594](https://github.com/QwenLM/qwen-code/pull/10594)). However, the follow-up **v0.23.1-preview.1 release failed repeatedly** (integration_docker / quality jobs), generating five tracked failure issues and a burst of test-determinism fixes. On the security front, a **P1 bug** was filed today revealing that skill `PreToolUse` hooks silently stop enforcing after `--continue`, with a fix PR already stacked and open for review.

## 2. Releases

- **[v0.23.0-nightly.20260905.0c945a6136](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260905.0c945a6136)**
  - `feat(web-shell)`: visualize and manage dynamic workflow runs ([PR #10594](https://github.com/QwenLM/qwen-code/pull/10594), by @qqqys)
  - `perf(web-shell)`: derive the session workflow project (perf follow-up)
- **[v0.23.1-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.0)** — same core changes promoted to the preview channel.
- ⚠️ Note: **v0.23.1-preview.1 failed to release** — see Issues below; blocking flaky tests are being addressed via [#11187](https://github.com/QwenLM/qwen-code/pull/11187) and [#11181](https://github.com/QwenLM/qwen-code/pull/11181).

## 3. Hot Issues

1. **[#11091](https://github.com/QwenLM/qwen-code/issues/11091) — Mermaid (~6 MB) still flattened into the exported transcript renderer** *(CLOSED, 7 comments)*
   The most-discussed issue of the day. Even after #9812 moved the export renderer to a CDN-loaded, SRI-pinned script, Mermaid's full bundle still bloats exports. Active discussion on stubbing/shaking it down; companion work continues in #11038.

2. **[#11180](https://github.com/QwenLM/qwen-code/issues/11180) — Skill `PreToolUse` hook stops enforcing after `--continue`** *(OPEN, P1, security)*
   Filed today by @TianYuan1024: a skill's safety-gate hook silently stops firing after session resume while its instructions remain in context — a genuine security-semantic hole. Fix is already in flight via [PR #11184](https://github.com/QwenLM/qwen-code/pull/11184).

3. **[#11096](https://github.com/QwenLM/qwen-code/issues/11096) — Exports built from `main` point at an unpkg URL that 404s** *(OPEN, P2)*
   The published `0.23.0` tarball predates the renderer split, so the derived unpkg URL 404s — a packaging/release-sequencing bug that breaks exported transcripts for current builds. Marked ready-for-human.

4. **[#9911](https://github.com/QwenLM/qwen-code/issues/9911) — Restore VS Code message edit & rewind after the WebShell cutover** *(OPEN, P2, roadmap/ide-integration)*
   Long-running IDE-parity request (4 comments, updated today). Users still lack per-message edit/rewind post-cutover; the path forward requires reconciling ACP runtime boundaries with daemon snapshot APIs.

5. **[#11186](https://github.com/QwenLM/qwen-code/issues/11186) — `qwen serve` channel ownership doesn't cover home-directory workspaces** *(OPEN, P2, filed today)*
   When the daemon binds to `$HOME`, workspace-scope settings are silently disabled and channel config becomes invisible. Directly related to open [PR #11083](https://github.com/QwenLM/qwen-code/pull/11083).

6. **[#11178](https://github.com/QwenLM/qwen-code/issues/11178) — SDK drops `resource_link` attachments during transcript normalization/replay** *(OPEN, P2, filed today)*
   Live UIs render linked-resource cards, but replayed SDK transcripts lose them — data-fidelity gap for anyone building on the daemon SDK.

7. **[#11185](https://github.com/QwenLM/qwen-code/issues/11185) (+ [#11179](https://github.com/QwenLM/qwen-code/issues/11179), [#11173](https://github.com/QwenLM/qwen-code/issues/11173), [#11170](https://github.com/QwenLM/qwen-code/issues/11170), [#11166](https://github.com/QwenLM/qwen-code/issues/11166)) — v0.23.1-preview.1 release failed, 5×** *(OPEN)*
   The same release run (34018769561) failed repeatedly on `integration_docker`, plus a `quality` job failure. Autofix agents are engaged; the community-visible symptom is release churn rather than product breakage.

8. **[#11183](https://github.com/QwenLM/qwen-code/issues/11183) (+ [#11176](https://github.com/QwenLM/qwen-code/issues/11176), [#11182](https://github.com/QwenLM/qwen-code/issues/11182), [#11168](https://github.com/QwenLM/qwen-code/issues/11168)) — Main-branch CI failures across four commits** *(OPEN)*
   E2E (OpenTUI renderer, docker shard) and unit test legs failing pre-report on `main` — consistent with the flakiness the determinism PRs below target.

9. **[#10378](https://github.com/QwenLM/qwen-code/issues/10378) — Superseded daemon child fires `onExit`, showing a false "stopped unexpectedly" banner** *(CLOSED)*
   A WebShell-cutover regression in the VS Code companion that eroded user trust with phantom crash banners; now resolved.

10. **[#11092](https://github.com/QwenLM/qwen-code/issues/11092) — Two majors of `react-markdown` in one tree** *(CLOSED)*
    Dependency-hygiene cleanup (9.x at root, 10.x nested under web-shell's chart package) — resolved, but emblematic of bundle-size pressure in the export/web-shell area.

## 4. Key PR Progress

1. **[#10983](https://github.com/QwenLM/qwen-code/pull/10983) — `fix(security)`: stop stripping unsafe env assignments in Bash allow matching**
   Closes two permission-bypass shapes where the command matcher's `stripLeadingVariableAssignments()` sanitized away assignments with execution/loader semantics. Security-critical; still open.

2. **[#11156](https://github.com/QwenLM/qwen-code/pull/11156) — `feat(channels)`: DingTalk interactive permission cards**
   Replaces plain-text `/approve` / `/deny` instructions with native interactive cards offering exactly the advertised decisions (allow once / always / deny). Filed today by @now-ing.

3. **[#11184](https://github.com/QwenLM/qwen-code/pull/11184) — `fix(skills)`: re-apply a Skill's side effects on session resume** *(stacked on #11068)*
   The direct fix for P1 issue #11180. Reviewers should scope to the single commit on the stacked branch.

4. **[#11068](https://github.com/QwenLM/qwen-code/pull/11068) — `fix(skills)`: register frontmatter hooks on the `/<skill-name>` path**
   Until now, a skill's declared hooks only registered on model invocation — not when invoked via slash command, leaving the same gate unenforced. Companion to the #11180 fix.

5. **[#11072](https://github.com/QwenLM/qwen-code/pull/11072) — `feat(ui)`: Agent Team status in CLI and WebShell**
   Adds a leader-facing team roster to the CLI live-agent panel and projects team state into WebShell's environment/workflow views, preserving teammate lifecycle semantics (idle ≠ completed).

6. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086) — `feat(serve)`: scope extensions to workspace runtimes**
   Reconciles the global extension catalog into per-workspace runtimes, with workspace-qualified daemon/SDK access — significant architectural groundwork for multi-workspace daemons.

7. **[#11083](https://github.com/QwenLM/qwen-code/pull/11083) — `fix(serve)`: read channel settings from user scope when workspace is home**
   Fixes channel config invisibility for home-directory workspaces (issue #11186) by unifying read/write scope resolution in `WorkspaceChannelSettingsStore`.

8. **[#11117](https://github.com/QwenLM/qwen-code/pull/11117) — Turn the Prettier lane into a real gate**
   Makes the formatting check actually failable, formats the backlog it silently rewrote, and deletes the no-op release-workflow copy — notable CI-integrity cleanup.

9. **[#10941](https://github.com/QwenLM/qwen-code/pull/10941) — `fix(web-shell)`: keep daemon prompt state authoritative through silence**
   Observer panes no longer lose "running" state during silent tool calls; the 3-second silence heuristic no longer overrides the daemon's `hasActivePrompt` signal.

10. **[#11120](https://github.com/QwenLM/qwen-code/pull/11120) — `fix(serve)`: bound and diagnose a session reclaim that can never succeed**
    Stops the daemon from retrying an impossible session close on every report forever; adds diagnostics instead of silently spinning.

*Also worth noting:* [#11187](https://github.com/QwenLM/qwen-code/pull/11187) and [#11181](https://github.com/QwenLM/qwen-code/pull/11181) (both filed today) convert flaky BOM-read and spaced-path-write integration tests to deterministic, fake-server-driven flows to unblock the failed release.

## 5. Hot Discussions

*No discussion data was provided for this period — section omitted.*

## 6. Feature Request Trends

- **WebShell / IDE parity** — the dominant theme: VS Code per-message edit/rewind restoration ([#9911](https://github.com/QwenLM/qwen-code/issues/9911)), agent-team state projection ([PR #11072](https://github.com/QwenLM/qwen-code/pull/11072)), prompt-state fidelity ([PR #10941](https://github.com/QwenLM/qwen-code/pull/10941)).
- **Skills & hooks lifecycle completeness** — hooks must hold across all invocation paths and session resume/continue ([#11180](https://github.com/QwenLM/qwen-code/issues/11180), [PR #11068](https://github.com/QwenLM/qwen-code/pull/11068), [PR #11184](https://github.com/QwenLM/qwen-code/pull/11184)).
- **IM-channel deepening** — DingTalk moving from text commands to interactive approval cards and per-segment streaming ([PR #11156](https://github.com/QwenLM/qwen-code/pull/11156), [PR #10899](https://github.com/QwenLM/qwen-code/pull/10899)).
- **Multi-workspace daemon semantics** — settings scoping, extensions, and session reclamation for `qwen serve` ([#11186](https://github.com/QwenLM/qwen-code/issues/11186), [PR #11086](https://github.com/QwenLM/qwen-code/pull/11086), [PR #11120](https://github.com/QwenLM/qwen-code/pull/11120)).
- **Lightweight, self-contained exports** — shrinking the transcript renderer and fixing CDN resolution ([#11091](https://github.com/QwenLM/qwen-code/issues/11091), [#11096](https://github.com/QwenLM/qwen-code/issues/11096), [#11092](https://github.com/QwenLM/qwen-code/issues/11092)).

## 7. Developer Pain Points

- **Release pipeline instability:** v0.23.1-preview.1 failed five times ([#11185](https://github.com/QwenLM/qwen-code/issues/11185) et al.), and four separate `main` commits tripped CI ([#11183](https://github.com/QwenLM/qwen-code/issues/11183), [#11176](https://github.com/QwenLM/qwen-code/issues/11176), [#11182](https://github.com/QwenLM/qwen-code/issues/11182), [#11168](https://github.com/QwenLM/qwen-code/issues/11168)). Flaky integration/E2E tests are the root cause, spawning a steady stream of determinism fixes ([#11187](https://github.com/QwenLM/qwen-code/pull/11187), [#11181](https://github.com/QwenLM/qwen-code/pull/11181), [#11094](https://github.com/QwenLM/qwen-code/pull/11094), [#11134](https://github.com/QwenLM/qwen-code/pull/11134)).
- **Export fragility:** a 6 MB Mermaid payload ([#11091](https://github.com/QwenLM/qwen-code/issues/11091)) and 404-ing unpkg renderer URLs ([#11096](https://github.com/QwenLM/qwen-code/issues/11096)) make a flagship feature (shareable HTML transcripts) unreliable.
- **Skills/hooks trust gaps:** safety gates that silently stop enforcing after `--continue` or slash-command invocation ([#11180](https://github.com/QwenLM/qwen-code/issues/11180)) undermine confidence in policy-based workflows.
- **CI gating that verifies nothing:** the Prettier lane silently auto-formatted instead of failing ([PR #11117](https://github.com/QwenLM/qwen-code/pull/11117)) — symptomatic of quality gates that drifted into no-ops.
- **Bot-triage backlog noise:** numerous auto-filed "Deferred review findings" issues ([#10046](https://github.com/QwenLM/qwen-code/issues/10046), [#9695](https://github.com/QwenLM/qwen-code/issues/9695), [#11147](https://github.com/QwenLM/qwen-code/issues/11147), etc.) accumulate faster than they're triaged, making genuine signal harder to find; [PR #11080](https://github.com/QwenLM/qwen-code/pull/11080) aims to enrich them with assignable context.

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*