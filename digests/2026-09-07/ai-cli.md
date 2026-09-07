# AI CLI 工具社区动态日报 2026-09-07

> 生成时间: 2026-09-07 01:16 UTC | 覆盖工具: 7 个

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



---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告

**仓库:** [anthropics/skills](https://github.com/anthropics/skills) | **快照时间:** 2026-09-07

---

## 1. 热门 Skills 排行榜

社区关注度最高的 PR 集中在三个主题上：**修复 `skill-creator` 评估流程**、**扩展文档格式覆盖**，以及**面向 Skills 质量的元技能**。

1. **[#1298 — 修复 `run_eval.py` 始终报告 0% 召回率](https://github.com/anthropics/skills/pull/1298)**（MartinCajiao，未合并）
   修复 `skill-creator` 评估框架，使 `run_loop.py` 和 `improve_description.py` 能针对真实信号（而非噪声）进行优化。同时打包修复了 Windows 流读取、触发检测和并行工作进程的问题——被 10+ 个独立复现该底层 bug 的案例提及。

2. **[#514 — `document-typography` skill](https://github.com/anthropics/skills/pull/514)**（PGTBoos，未合并）
   针对 AI 生成文档的排版质量控制：孤行/寡行处理与编号对齐。解决每个 Claude 用户最终都会遇到的问题。

3. **[#1615 — `scnet-hpc` skill](https://github.com/anthropics/skills/pull/1615)**（lql341，未合并）
   在 SCNet HPC 集群上基于配置文件的 SSH + Slurm 操作。是集群/云平台 Skills 浪潮中的最新成果。

4. **[#538 — 修复 PDF skill 中大小写敏感的文件引用](https://github.com/anthropics/skills/pull/538)**（Lubrsy706，未合并）
   `SKILL.md` 与实际文件名之间存在 8 处不匹配——提醒我们：大小写敏感的文件系统（如 Linux）会悄无声息地破坏大写引用。

5. **[#486 — ODT（OpenDocument）skill](https://github.com/anthropics/skills/pull/486)**（GitHubNewbie0，未合并）
   创建、填充、解析和转换 `.odt`/`.ods` 文件。填补了开放格式文档工作流的一大空白。

6. **[#210 — 提升 `frontend-design` skill 的清晰度](https://github.com/anthropics/skills/pull/210)**（justinwetch，未合并）
   收紧指令，使每条指令都能在单次对话中即可执行，减少前端生成循环中的歧义。

7. **[#83 — `skill-quality-analyzer` 与 `skill-security-analyzer`](https://github.com/anthropics/skills/pull/83)**（eovidiu，未合并）
   两个元 Skills，从结构、文档和安全维度对其他 Skills 评分——直接回应社区对信任边界的关切。

8. **[#1628 — Hivemind：零成本多智能体编排](https://github.com/anthropics/skills/pull/1628)**（Hanishchow，未合并）
   将机械性工作委托给运行免费模型的无头 [opencode](https://opencode.ai) 工作进程，而 Claude Code 仍担任规划者/评审者。把成本问题重新定义为一个上下文预算问题。

---

## 2. 社区需求趋势

从互动度最高的 Issues 可以看出，需求集中在五个方向：

- **跨用户 / 全组织的 Skill 共享** —— [#228（16 条评论，8 👍）](https://github.com/anthropics/skills/issues/228) 希望在 Claude.ai 中建立共享库，而非通过 Slack/Teams 来回传递 `.skill` 文件。这是追踪器中获得点赞数最多的需求。
- **信任、命名空间与安全边界** —— [#492（43 条评论）](https://github.com/anthropics/skills/issues/492) 指出社区 Skills 假冒 `anthropic/` 命名空间的问题；[#412（已关闭，6 条评论）](https://github.com/anthropics/skills/issues/412) 提议推出一个 `agent-governance` skill，用于策略执行与威胁检测。
- **推理质量与评估基础设施** —— [#1385（4 条评论）](https://github.com/anthropics/skills/issues/1385) 提议构建一条三关流水线（任务前校准 → 对抗性评审 → 交付验证）；[#1390](https://github.com/anthropics/skills/issues/1390) 和 [#556（12 条评论，7 👍）](https://github.com/anthropics/skills/issues/556) 暴露出当前 `evaluation.py` / `run_eval.py` 在真实工作负载下悄无声息地打出 0/N 的评分。
- **紧凑的智能体记忆与状态表示** —— [#1329（9 条评论）](https://github.com/anthropics/skills/issues/1329) 提议推出 `compact-memory`——一种用于压缩长时间运行的智能体笔记的符号化表示法。
- **插件整洁度与打包标准** —— [#189（6 条评论，9 👍）](https://github.com/anthropics/skills/issues/189) 指出 `document-skills` 与 `example-skills` 发布的内容完全相同，浪费上下文。打包与去重问题悬而未决。

在这些需求之下，还存在反复出现的运营痛点：[#1487](https://github.com/anthropics/skills/issues/1487)（对 `claude-api` 进行约 156k token 的急切实例化）、[#62](https://github.com/anthropics/skills/issues/62)（重命名后 Skills 消失）、[#16](https://github.com/anthropics/skills/issues/16)（Skills 即 MCP）、[#29](https://github.com/anthropics/skills/issues/29)（AWS Bedrock 使用问题）。

---

## 3. 高潜力待合并 Skills

近期迭代活跃、合并路径清晰的 PR：

- **[#1628 — Hivemind 多智能体编排](https://github.com/anthropics/skills/pull/1628)** —— 8 月 21 日；成本路由理念契合持续存在的需求。
- **[#1627 — `buffer-api` Agent Skill](https://github.com/anthropics/skills/pull/1627)** —— 8 月 21 日；通过 Buffer GraphQL 实现可移植的社媒排程。
- **[#1615 — `scnet-hpc` skill](https://github.com/anthropics/skills/pull/1615)** —— 8 月 20 日；面向特定领域，但范围划分清晰。
- **[#1607 — 标记四个已弃用的 Claude 模型 ID](https://github.com/anthropics/skills/pull/1607)** —— 8 月 18 日；关闭 [#1603](https://github.com/anthropics/skills/issues/1603)；近乎确定会快速合并。
- **[#1602 — 评估/序列化/编码修复](https://github.com/anthropics/skills/pull/1602)** —— 8 月 17 日；针对与 #1298/#1099/#1050 同类的评估失效 bug。
- **[#1734 — 检测孤立的 docx 批注](https://github.com/anthropics/skills/pull/1734)** —— 9 月 6 日；最新的 DOCX 完整性改进。
- **[#1367 — `self-audit` skill v1.3.0](https://github.com/anthropics/skills/pull/1367)** —— 6 月 28 日；机械化校验 + 4 维度推理审计；与 [#1385](https://github.com/anthropics/skills/issues/1385) 所提的质量关卡主题相呼应。

---

## 4. Skills 生态洞察

**社区最集中的需求是值得信赖、可自我校验的 Skill 开发基础设施——对 `skill-creator`/`run_eval.py` 的逐项修复、可对质量与安全打分的元 Skills，以及一套能阻止假冒行为的命名空间模型。**

---

*注：快照数据未公开 PR 评论数；上述排行榜以更新时间、年龄以及与高评论 Issues 的交叉引用作为互动代理指标。*

---



</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>



</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-07

## 今日要点
- Nightly `v0.60.0-nightly.20250906.g85aca163f` 已发布，继续 v0.60 开发线，相对上一个 nightly 仅包含少量增量变更。
- 智能体可靠性是讨论焦点：围绕 **子智能体在 MAX_TURNs 时误报成功**（#22323）、**generalist-agent 死锁**（#21409）以及 **shell 命令执行完成后挂起**（#25166）这几个 P1 Bug 都有新的动态。
- 安全加固持续推进 —— Auto Memory 日志记录与脱敏（#26525）、Windows 沙箱的 git 参数校验（#29184）以及 RFC 9207 OAuth issuer 校验（#29117）都已落地或在合并中。

## 版本发布
- **v0.60.0-nightly.20250906.g85aca163f** —— Nightly 续发；相对上一个 nightly 的完整 diff 属于增量变更（[对比](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20250905.g85aca163f...v0.60.0-nightly.20250906.g85aca163f)）。

## 热门 Issue

1. **[#22323 — 子智能体达到 MAX_TURNS 后误报 GOAL 成功（P1，bug）](https://github.com/google-gemini/gemini-cli/issues/22323)** —— *matei-anghel，13 条评论。* `codebase_investigator` 在还未做任何分析就已触及轮次上限时，仍返回 `status: "success"` / `Termination Reason: "GOAL"`。这种误导性的遥测数据损害了用户对智能体报告及事件复现的信任。

2. **[#21409 — 通用智能体挂起（P1，bug）](https://github.com/google-gemini/gemini-cli/issues/21409)** —— *turmanticant，8 条评论，👍8。* 即使是创建文件夹这类简单任务，一旦委派给通用智能体就会挂起超过一小时。社区广泛认同（点赞数在所有 issue 中最高），表明子智能体调度存在系统性问题。

3. **[#21983 — 浏览器子智能体在 Wayland 下失败（P1，bug）](https://github.com/google-gemini/gemini-cli/issues/21983)** —— *sigmaSd，4 条评论。* 浏览器子智能体在报告失败的同时以 `Termination Reason: GOAL` 退出 —— 与 #22323 属于同一类误导性报告模式，疑为共因缺陷。

4. **[#25166 — Shell 命令执行完成后卡在"等待输入"（P1，bug）](https://github.com/google-gemini/gemini-cli/issues/25166)** —— *rnett，4 条评论，👍3。* 即便是 `ls` 这类极简命令，退出后 Gemini 仍会一直等待输入。频繁出现的小问题严重阻塞了交互式会话。

5. **[#26525 — 增加确定性脱敏并减少 Auto Memory 日志记录（P2，安全）](https://github.com/google-gemini/gemini-cli/issues/26525)** —— *SandyTao520，5 条评论。* Auto Memory 在对密钥进行脱敏之前就将转录内容发送到了后台模型，且服务端日志可能持久化保存技能密钥。对用户而言是切实的隐私风险。

6. **[#19873 — 零依赖的 OS 沙箱与执行后意图路由（P2，enhancement）](https://github.com/google-gemini/gemini-cli/issues/19873)** —— *abhipatel12，9 条评论。* 提议在不破坏沙箱保证的前提下，让 Gemini 3 串联调用原生 POSIX 工具。是释放模型 Bash 亲和力的战略性方向。

7. **[#22745 — 评估 AST 感知的文件读取/搜索/映射（P2，feature）](https://github.com/google-gemini/gemini-cli/issues/22745)** —— *gundermanc，7 条评论。* 这是一项 EPIC 级探索，研究 AST 工具能否减少读取量、降低轮次消耗，以及更高效地导航大型代码库。有望显著削减 token 成本。

8. **[#21968 — Gemini 未能充分利用自定义技能与子智能体（P2，bug）](https://github.com/google-gemini/gemini-cli/issues/21968)** —— *rnett，6 条评论。* 用户自定义的技能只有在用户显式调用时才会被使用。这影响了每个投入精力建设技能库的团队。

9. **[#24246 — 工具数量超过 128 时报 400 错误（P2，bug）](https://github.com/google-gemini/gemini-cli/issues/24246)** —— *gundermanc，3 条评论。* 大量使用 MCP / 扩展的"重度用户"撞上了硬性工具上限。需要更智能的上下文内工具作用域管理。

10. **[#21763 — Bug 报告缺失子智能体上下文（P1，bug）](https://github.com/google-gemini/gemini-cli/issues/21763)** —— *rkj，2 条评论。* `/bug` 命令仅捕获父会话信息；若不手动收集日志，几乎无法对子智能体故障进行分诊。

## 关键 PR 进展

1. **[#29137 — 批量 npm 依赖升级（76 项更新）](https://github.com/google-gemini/gemini-cli/pull/29137)** —— *dependabot。* 大规模依赖刷新，包括 `simple-git`、`@modelcontextprotocol/sdk` 等多项。建议扫一眼是否有行为变化。

2. **[#29184 — 在 Windows 沙箱中校验 git 参数以阻止静默的 `git diff --output`](https://github.com/google-gemini/gemini-cli/pull/29184)** —— *PakCyberbot。* P1 安全修复：Windows 沙箱目前将所有 `git status|log|diff|show|branch` 一律视为只读而不论参数；`--output=` 可能截断任意文件。

3. **[#29106 — EOF 时刷新最终 SSE 事件而无需末尾空行（已关闭）](https://github.com/google-gemini/gemini-cli/pull/29106)** —— *AnupamKumar-1。* 修复在流被截断或代理不符合规范时，`finishReason`/使用量元数据静默丢失的问题。

4. **[#29117 — 在 MCP OAuth 中强制执行 RFC 9207 issuer 标识（已关闭）](https://github.com/google-gemini/gemini-cli/pull/29117)** —— *jvargassanchez-dot。* 通过在 MCP OAuth 流程中校验响应 `iss` 与请求来源是否一致，关闭了 OAuth 令牌路由的隐患。

5. **[#29163 — 防止 macOS Seatbelt 下 git 仓库内认证崩溃（P1）](https://github.com/google-gemini/gemini-cli/pull/29163)** —— *ehsan-fj。* 启动时的 `useGitBranchName` 钩子在受限权限环境下可能崩溃；已修复为优雅降级。

6. **[#29098 — 将 `useInputHistoryStore` 的状态更新器改为纯函数](https://github.com/google-gemini/gemini-cli/pull/29098)** —— *Eswar809。* 带副作用的 `recalculateHistory()` 此前在 `setState` 更新器内部被调用；在 React StrictMode 下会被双重调用，进而损坏输入历史。

7. **[#29195 — 降级处理非数组形式的检查点历史，避免 `/resume` 崩溃](https://github.com/google-gemini/gemini-cli/pull/29195)** —— *soroush5。* 在 JSON 合法但结构异常的检查点文件上，恢复操作不再直接抛出 `TypeError`。

8. **[#29125 — 将钩子超时单位由秒改为毫秒](https://github.com/google-gemini/gemini-cli/pull/29125)** —— *0717lee。* 从 Claude Code 迁移过来的钩子配置（单位为秒）实际获得的超时比预期短 1000 倍。对所有导入钩子的用户都至关重要。

9. **[#29205 — 提交 MCP 提示文本时不再进行 JSON 编码](https://github.com/google-gemini/gemini-cli/pull/29205)** —— *CoralGarden52。* 保留 MCP 服务器返回的换行符与引号原样传递，避免双重编码。

10. **[#29229 — 在设置编辑器中拒绝非有限数](https://github.com/google-gemini/gemini-cli/pull/29229)** —— *bunnysayzz。* 类似 `1e309` 的输入此前会被静默序列化为 `null`，破坏刚刚"接受"的设置。

## 功能请求趋势

- **AST 感知工具**（#22745、#22746）：精确的文件读取、代码库映射以及"tactful extraction"（#19561），用以取代当前每轮 36.6k token 的"消防水龙头"式输出。
- **智能体自我认知**（#21432）：智能体应当准确了解并向用户讲解自身的 CLI 参数、快捷键与调用模式。
- **子智能体可观测性**：通过 `/chat share`（#22598）以及更丰富的 bug 报告上下文（#21763）实现。
- **本地子智能体 / Sprint 1**（#20195）：将用户自定义的子智能体提升为头等公民。
- **更安全的破坏性行为**（#22672）：在存在更安全替代方案时，劝阻 `git reset --force` 等高危默认行为。
- **OS 级沙箱**以支持原生 Bash 亲和力（#19873）。

## 开发者痛点

- **子智能体调度与报告不可靠**：智能体在出错时静默"成功"（#22323）、无限挂起（#21409），或在 Wayland 下失败（#21983）。这是被提及最多的痛点类别。
- **交互式会话卡死**：简单命令阻塞在"等待用户输入"（#25166）；`create-vite` 等交互式脚手架工具直接死锁（#22465）。
- **默认情况下技能与子智能体被忽略**（#21968）：自定义技能库需要显式提示才能发挥作用，削弱了其价值。
- **工具数量硬上限**：在约 128 个工具时直接返回 400 错误（#24246），对拥有大量 MCP 配置的重度用户造成中断。
- **工作区整洁度**：模型将临时脚本散落在各个目录（#23571），使干净的提交变得复杂。
- **不安全的默认值**：通过 git 静默写入的 `--output`（#29184）、含有密钥的转录内容进入模型（#26525）、bug 报告缺失子智能体上下文（#21763）。
- **钩子迁移陷阱**：Claude Code 风格的钩子（秒级）被悄悄变成毫秒级超时（#29125、#29122）。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>



</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-07

## 今日要点

过去 24 小时内,主导话题是 **OpenCode Go 上的计费/额度回归**(额度突然耗尽、持续 429)以及一波 **Desktop 稳定性修复**落地到 Tabs、粘贴处理和基于 SQLite 的渲染器状态。平台侧,**插件 `permission.ask` hook**长期缺口和 **Anthropic MCP `oneOf/anyOf` 400 错误**仍是重度用户最痛的集成 bug。

---

## 发布

*过去 24 小时内无新版本发布。*

---

## 热门 Issue

1. **[#7006 — `permission.ask` 插件 hook 已定义但未触发](https://github.com/anomalyco/opencode/issues/7006)** — 新的权限系统(PR #6319)宣传支持 `permission.ask` 插件 hook,但它从未被触发,阻塞了一整类自定义自动批准插件。16 条评论,25 👍 — 本周期内反应数最高的 issue,也是 v2 插件故事的明显卡点。
2. **[#45278 — 卡片和银行均无问题,3 个月后付款仍被拒](https://github.com/anomalyco/opencode/issues/45278)** — 之前一直正常的卡片续费失败;这是一次信任级别的计费回归。12 条评论,2 👍。
3. **[#42935 — DeepSeek V4 Flash 缓存读取降为 0 后,OpenCode Go 额度约 20 分钟内耗尽](https://github.com/anomalyco/opencode/issues/42935)** — 缓存计费疑似回退到全 token 计费,20 分钟烧光一个 Go 额度。使用历史中有充分证据。8 条评论,3 👍。
4. **[#47613 — Go 订阅:低用量下仍持续 HTTP 429(retry-after 12h)](https://github.com/anomalyco/opencode/issues/47613)** — `https://opencode.ai/zen/go/v1/messages` 持续返回 429 并重置 12h 退避,持续约 3 天,让付费用户的 Go "基本无法使用"。7 条评论。
5. **[#32202 — Skill 重复根目录会导致 `available_skills` 在重启间变化](https://github.com/anomalyco/opencode/issues/32202)** — 当两个 skill 根目录包含同名 skill 时,skill 发现结果不确定;排序在去重之后进行,因此去重本身是不稳定的。8 条评论,1 👍。
6. **[#36454 — TreeSitter client 的销毁会导致内存泄漏吗?](https://github.com/anomalyco/opencode/issues/36454)** — 拆解阶段反复出现 `TreeSitter client destroyed` 警告,堆栈指向 `finalizeDestroy`。交叉引用 #47696(trust/scripts 清理)。6 条评论。
7. **[#46628 — MCP 工具 schema 未针对 Anthropic 做清洗:根级 anyOf/oneOf/allOf 触发 400](https://github.com/anomalyco/opencode/issues/46628)** — 任何 `inputSchema` 使用根级联合类型的 MCP 工具,在 Anthropic 请求中都会以 `input_schema does not support oneOf, anyOf, allOf` 失败。同时报告 `tool.definition` 永远看不到 MCP 工具。4 条评论。
8. **[#46760 — 配置的默认模型已弃用时,`opencode run` 返回 `{UnknownError}`](https://github.com/anomalyco/opencode/issues/46760)** — 新用户按文档从 Zen 页面选择 `x-preview-f-free`;一旦该模型下线,`opencode run` 就会返回一个不透明的错误而非引导式恢复。4 条评论。
9. **[#44790 — 远程 MCP OAuth:`WWW-Authenticate` 中的 `resource_metadata` URL 被忽略](https://github.com/anomalyco/opencode/issues/44790)** — RFC 9728 合规缺口:仅查询域名根下的 `.well-known/oauth-protected-resource`,导致 AWS Bedrock AgentCore 运行时(将元数据发布在别的 URL)失效。3 条评论。
10. **[#46156 — 插件数据流面板 — 为每会话指标和数据日志预留 UI 空间](https://github.com/anomalyco/opencode/issues/46156)** — 特性请求:为插件提供一个真正可用的 dashboard 表面,而不是把内容倒进聊天流。3 条评论,1 👍 — v2 插件工作中反复出现的主题。

---

## 关键 PR 进展

1. **[#45424 — fix(core): 分发没有原生路由的 AI SDK 包的 provider](https://github.com/anomalyco/opencode/pull/45424)** — `SessionRunnerModel.fromCatalogModel` 只路由 3 个 AI SDK 包;其他的会被静默丢弃。修复 #45426 并解锁新的 provider。
2. **[#47310 — feat(desktop): 改进 worktree UI](https://github.com/anomalyco/opencode/pull/47310)** — 在新建会话位置、会话详情、移动菜单和设置中提供一致的 worktree 控件。弥补了 Desktop 长期存在的 UX 缺口。
3. **[#45482 — fix(task): 让异步子代理任务如实、仅一次、依次回答并停止](https://github.com/anomalyco/opencode/pull/45482)** — 依赖 #43510。用"所有子任务结束后,只追加一条仅请求的用户消息"取代当前的"伪确认消息"。关闭 #45480。
4. **[#47695 — fix(desktop): 将渲染器状态持久化到 SQLite 而非 electron-store(已关闭)](https://github.com/anomalyco/opencode/pull/47695)** — 在 Windows 上,关闭一个 tab 会让 Desktop 卡 3–5 秒,因为每个 `persisted()` 写入都通过主线程上的同步 electron-store 完成。已迁移到 SQLite。
5. **[#47427 — fix(desktop): 防止大粘贴导致崩溃](https://github.com/anomalyco/opencode/pull/47427)** — 大粘贴会让 Desktop 提示词卡顿、冻结或崩溃。关闭 #47425。
6. **[#47699 — fix(cli): 将 `--model` 透传到 TUI 入口](https://github.com/anomalyco/opencode/pull/47696)** — `opencode --model <id> --prompt ...` 在根命令上接受 `--model`,但在 TUI 启动前会丢弃它,导致会话以默认模型打开。修复 #47172。
7. **[#47262 — fix(workflows): 在 fork 上跳过 close-issues 和 close-prs 任务](https://github.com/anomalyco/opencode/pull/47262)** — 为定时 close 任务添加 `if: github.repository == 'anomalyco/opencode'`,使 fork 不会自动关闭贡献者 PR。关闭 #35666。
8. **[#42223 — fix(tui): 在新目录继续会话时纠正工作目录](https://github.com/anomalyco/opencode/pull/42223)** — 在新目录中执行 `opencode -c` 显示的是陈旧目录;SDK 的 `pick()` 没有回退到 `config.directory`。关闭 #42221 和 #41562。
9. **[#47696 — chore: 停止信任 tree-sitter 安装脚本(已关闭)](https://github.com/anomalyco/opencode/pull/47696)** — 将 `tree-sitter`、`tree-sitter-bash`、`tree-sitter-powershell` 和 `web-tree-sitter` 从 `trustedDependencies` 中移除。V2 仅加载随包分发的 `.wasm`,因此不再需要原生安装脚本。安全收紧,与 #36454 相关。
10. **[#34947 — feat(opencode): 为 task 工具增加分发控制](https://github.com/anomalyco/opencode/pull/34947)** — 对每次分发的 Task 控件做 7 项变更(model 参数、variant 保留等);关闭 #17595、#6651、#26925、#29984、#24757,并取代 #29447 和 #32122。是目前进行中范围最大的 task 工具重构。

同样值得关注:
- **[#47694 — fix(app): 为 worktree 创建设置一个足够长的请求超时(已关闭)](https://github.com/anomalyco/opencode/pull/47694)** — 在 #47572 新增 60s 响应头中止后,`POST /api/worktree`(会执行 `git worktree add` 加 `commands.start`,在 Windows 上约 90–120s)需要自己的超时。
- **[#47676 — fix(util): 通过原地裁剪头部来限定 opencode.log 大小(已关闭)](https://github.com/anomalyco/opencode/pull/47676)** — 自 #31310 起 `opencode.log` 一直仅追加;长期安装的实例增长到 500 MB–1 GB。现在会在超过 `LOG_MAX_BYTES`(50 MB)时裁剪头部。
- **[#47635 — fix(opencode): 解析 markdown agent 提示词](https://github.com/anomalyco/opencode/pull/47635)** — markdown agent/mode 加载器会用(可能为空的)Markdown body 覆盖 frontmatter 中的 `prompt:`。关闭 #47616。

---

## 热门讨论

*源数据中未提供讨论内容 — 本节省略。*

---

## 特性请求趋势

- **一等公民插件表面**:专门的插件数据流/指标面板(#46156)、从 `.claude/` 目录可选发现 Claude Code agents/commands(#47650)、生态插件注册(#44509 opencode-dejavu、#43353 opencode-autorecord)。v2 插件故事显然是最活跃的扩展方向。
- **会话管理 UX**:收藏/星标会话(#47700)、worktree UI 打磨(#47310)、恢复因 `.git` 被删除而孤立的会话(#47652)。
- **Provider 目录覆盖**:Standard Compute(#47475)和 Nous Research 推理 API(#47515)的文档与集成请求;为没有原生路由的 AI SDK 包提供分发路由(#45424)。
- **OAuth/MCP 合规**:RFC 9728 `resource_metadata` 遵从(#44790)、Anthropic MCP schema 清洗(#46628)、ChatGPT OAuth 上下文窗口修正(#47646)。
- **运维卫生**:日志轮转(#47676)、更安全的 `tree-sitter` 安装策略(#47696)、对 fork 安全的定时任务(#47262)。

---

## 开发者痛点

- **OpenCode Go 上的计费信任侵蚀** — 缓存读取降为 0 时额度耗尽(#42935),低用量下仍持续 12h 429(#47613),原本正常的卡片在静默续费时被拒(#45278)。24 小时内三起独立报告 — 这是头号信任问题。
- **Hook 与插件表面不匹配** — `permission.ask` 有文档但未分发(#7006);MCP 工具从未出现在 `tool.definition`,同时其 schema 让 Anthropic 返回 400(#46628);本地 TUI 插件在 node 构建上失败(#42481)。
- **Windows 上的 Desktop 稳定性** — GPU 进程崩溃循环(#46691)、electron-store 导致的 tab 关闭卡顿(#47695)、大粘贴崩溃(#47427)、60s 头部超时撞上慢速 `git worktree add` + `bun install` 流程(#47694)。
- **弃用配置下的不透明错误路径** — 默认模型弃用时,`opencode run` 返回 `{UnknownError}`(#46760);TUI 在 `opencode -c` 时显示错误的 CWD(#42223);CLI 在 TUI 启动前丢弃 `--model`(#47699)。
- **Skill 发现的不确定性** — 重复的 skill 根目录导致重启之间 `available_skills` 不同(#32202),使插件和提示词缓存变得不可靠。
- **后台 CPU / TUI 性能** — 在无活动输出时,主线程被一个旋转 spinner 钉在 ~100% 反复重绘(#42306);TreeSitter 销毁警告反复出现,指向 finalize-destroy 泄漏(#36454)。
- **点文件/配置管理被破坏** — 保存 CLI 偏好会把符号链接的 `cli.json` 替换为普通文件(#45067),破坏 GNU Stow 等类似工作流。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区速览 — 2026-09-07

## 今日要点

社区涌现了大量关于 provider 路由、DNS 解析以及跨 provider 可靠性的已关闭 issue 和 PR，其中最值得关注的是针对 GitHub Copilot GPT-6 Astra 路由的修复（#9253）以及通过 undici 实现 MagicDNS 风格的主机名解析（#9250/#9252）。仍有若干与可靠性相关的 issue 处于开放状态，长期悬而未决的 `openai-codex` 连接可靠性讨论帖（#4945，76 条评论）依然是互动量最高的线程。此外，社区也围绕针对单个仓库的 API Key 覆盖方案（#9146）以及对于可选用跨 provider 回退链路的呼声（#9242）展开了讨论。

## 版本发布

过去 24 小时内无新版本发布。

## 热门 Issue

1. **[#4945](https://github.com/earendil-works/pi/issues/4945) — openai-codex 连接可靠性问题**（OPEN，进行中，76 条评论，32 👍）。在使用 `openai-codex`/`gpt-5.5` 时，TUI 卡在 "Working…"，既无流式文本也无工具调用，用户必须按 Esc 才能中断。是当日互动量最高的线程——显而易见的可靠性难点。

2. **[#7547](https://github.com/earendil-works/pi/issues/7547) — 你如何在 Windows 上使用 Pi？遇到了哪些问题？**（OPEN，56 条评论）。维护者明确在征集 Windows 端的反馈以排定修复优先级——对所有 Windows 开发者来说都是一个值得关注的战略性议题。

3. **[#9258](https://github.com/earendil-works/pi/issues/9258) — 编排 DX：`models.json` 中 `apiKey: "$ENV"` 未被解析**（已关闭）。`~/.pi/agent/models.json` 中的 `$ENV` 插值返回的是字面量字符串，导致 401 错误。对程序化/harness 用法很重要。

4. **[#9242](https://github.com/earendil-works/pi/issues/9244) — 在 transport/不可达错误时启用跨 provider 回退链路**（已关闭）。希望在当前 provider 不可达时，可选地切换到其他 provider/model。24 小时内针对此需求提交了三份 PR（#9248/#9249/#9251）。

5. **[#8826](https://github.com/earendil-works/pi/issues/8826) — 对长时间瞬时故障的 agent 重试退避进行封顶**（OPEN）。在长时间上游故障期间，指数退避始终无法收敛，需要一个可配置的封顶值。

6. **[#8827](https://github.com/earendil-works/pi/issues/8827) — TUI LaTeX 旧式字体指令触发整块回退到源码渲染**（OPEN）。`\rm`、`\bf` 等指令会导致 Pi 直接回退到渲染原始源码，而非 unicode 数学公式渲染。

7. **[#8617](https://github.com/earendil-works/pi/issues/8617) — Codex：使用文件引用替代图片密集的工具结果**（OPEN）。将图片存储与 provider payload 解耦，每次请求发送 `file_id` 引用而非 base64。

8. **[#9237](https://github.com/earendil-works/pi/issues/9237) — `pi-opencode-bridge@0.2.1` 未发送 `x-opencode-session` 头**（已关闭）。一个社区包破坏了与 OpenCode Go 之间的 prompt-cache 亲和性。该 issue 同时也请求在核心中基于 host 自动注入该头。

9. **[#8791](https://github.com/earendil-works/pi/issues/8791) — 向扩展暴露 model runtime**（已关闭，4 👍）。在进程内构建 agent 会话的扩展需要对底层 `ModelRuntime` 的只读访问权限。

10. **[#9209](https://github.com/earendil-works/pi/issues/9209) — GitHub Copilot GPT-6 Astra 被路由到不支持的 Chat Completions 端点**（已关闭）。已由 PR #9253 在进行中修复——是 issue→PR 快速闭环的典型案例。

## 关键 PR 进展

1. **[#9253](https://github.com/earendil-works/pi/pull/9253) — fix(ai): 将 Copilot GPT 模型路由到 Responses**（OPEN）。将 Copilot GPT 模型路由到 Responses 端点，修复 #9209。面向未来：GitHub 目录中已无 GPT-4 模型，因此该改动是安全的。

2. **[#6881](https://github.com/earendil-works/pi/pull/6881) — feat(ai): 当响应中包含 provider 上报的成本时优先使用**（OPEN，进行中）。优先采用 `usage.cost` / `cost_details.upstream_inference_cost`，回退到 `calculateCost`。主要影响 OpenAI completions。

3. **[#9096](https://github.com/earendil-works/pi/pull/9096) — feat(ai, coding-agent): 新增带 Muse 订阅 OAuth 的 Meta provider**（OPEN）。新增 Meta + Muse OAuth 订阅 provider。注意其使用了不太常见的刷新令牌机制（每日从身份令牌重新生成）以及会“爆发式”输出的“假”流式。

4. **[#7610](https://github.com/earendil-works/pi/pull/7610) — feat(ai): 新增 LLM Gateway 和 LLM Gateway DevPass providers**（OPEN）。以类 OpenRouter 风格的路由器作为内置 `openai-completions` provider 加入，由 LLM Gateway 团队贡献。

5. **[#9137](https://github.com/earendil-works/pi/pull/9137) — feat(coding-agent): 新增 Nix flake**（OPEN，WIP）。为 coding agent 提供可复现的 Nix 打包方案。

6. **[#9222](https://github.com/earendil-works/pi/pull/9222) — fix(coding-agent): 在活动会话操作期间拒绝 reload**（OPEN）。防止在流式过程中 reload 导致 runner 失效，并向模型发送虚假错误。

7. **[#9251](https://github.com/earendil-works/pi/pull/9251) — feat(coding-agent): 在 transport 错误时切换到回退 provider**（CLOSED）。这是为实现 #9242 而快速迭代的三份 PR 之一；引入了 provider 回退辅助函数及会话层接线。

8. **[#9252](https://github.com/earendil-works/pi/pull/9252) — fix(coding-agent): 将 undici 的 connect lookup 固定为系统 `dns.lookup`**（CLOSED）。解决了 #9244——依赖系统 DNS 解析的 MagicDNS / Tailscale / split-horizon 主机名现已可用。

9. **[#9224](https://github.com/earendil-works/pi/pull/9224) — fix(ai): 将 OpenRouter `:free` 的 maxTokens 限制为基础模型值**（CLOSED）。目录中 `:free` 条目声明的 `max_tokens` 超出底层模型支持上限；Pi 现将其限制为基础值，以避免 400 错误。

10. **[#9233](https://github.com/earendil-works/pi/pull/9233) — fix(coding-agent): 实时解析模型鉴权，而非基于启动时的快照**（CLOSED）。避免与后台 `configuredProviders` 刷新之间产生竞态，导致启动时鉴权状态不稳定。

## 热门讨论

**Q&A**
- **[#9146](https://github.com/earendil-works/pi/discussions/9146) — 提供针对单个仓库的 API Key 覆盖并忽略 auth.json**（1 👍）。作者在 `auth.json` 中使用 1Password 管理的 OpenRouter key，但希望可以按仓库进行覆盖（例如用于评测 harness）。这反映出社区越来越需要按范围/按项目的鉴权配置，而非单一的全局 `auth.json`。

## 功能请求趋势

- **跨 provider 回退链路**：一项明确且反复出现的需求（#9242 加上一日内三份 PR 迭代），希望在 transport 级错误时在 provider 间切换，而非硬性失败。
- **更充分的 Anthropic 缓存利用**：#9246 请求将闲置的第 4 个缓存断点用于稳定的会话检查点——这是一项低成本、高收益的缓存优化。
- **面向 TUI/runtime 的扩展面**：多项请求（#9238 `setTuiMode`、#8791 model runtime、#9236 已确认的需求、#9247 JSON/RPC 失败分类）共同指向一个更丰富的扩展 API。
- **Codex 图片处理细化**：#8617（文件引用）和 #9256（恢复的会话重新内联渲染工具结果图片）共同表明图片管线需要一次系统性的重构。
- **自定义工具的安全控制**：#9228 / #9227 请求针对不受信任工具输出的、可选的、每次调用都需确认的流程。
- **应对长时间故障的可靠性旋钮**：#8826（重试退避封顶）和 #9240（TUI 滚动位置保持）共同体现了在长时间上游不稳定情况下加固会话这一主题。

## 开发者痛点

- **Windows 摩擦占主导**：Shift+Enter 直接提交而非换行（#7175）、在 WSL 禁用时 `shell_path` 被忽略（#9229）以及 TUI 图片渲染错误（#8306）形成了反复出现的 Windows 特定抱怨簇——#7547 中维护者的呼吁进一步强化了这一点。
- **OpenAI Codex 可靠性回归**：#4945 是互动量最高的单一线程，用户仍然会遇到需要手动按 Esc 才能恢复的静默卡顿。
- **Provider 特有的怪癖**：Copilot 上的 GPT-6 Astra 需要 Responses 路由（#9209/#9253）；通过 OpenRouter 调用 Claude Opus 5 时拒绝每消息 `output_config`（#9165）；OpenRouter `:free` 模型 max tokens 溢出（#9224）；OpenCode Go 需要新增 `x-opencode-session` 头（#9230/#9237）。
- **DNS 解析缺口**：MagicDNS / Tailscale / split-horizon 主机名解析失败，因为 undici 未固定 `dns.lookup`（#9244，已由 #9252 修复）。
- **会话恢复不一致**：恢复的会话可能以全尺寸重新渲染图片（#9256），并从上一条 assistant 消息的错误字段覆盖激活的模型（#9243）。
- **程序化编排的粗糙边角**：`models.json` 中 `$ENV` 插值未解析（#9258）以及缺少导出的 `package.json` 路径，给 harness 构建者带来摩擦。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-07

## 1. 今日要点

社区的重心高度集中在**架构整合**上：长期推进的 ink → OpenTUI TUI 迁移（#8662）借助行为对齐收尾 PR（#11152）又闭合了一个重大缺口；而**多智能体网格**计划通过每轮 run 绑定与线程状态派生（#11229、#11230）迈出了实质性一步。质量方面，多个 P1 问题浮出水面——**技能 `PreToolUse` 钩子在 `--continue` 之后静默失效**（#11180）以及**遥测将原始工具错误泄露到 RUM**（#11198），两者都需立即关注提示安全。v0.23.1-preview.1 版本已发布，但其工作流在 `integration_docker`（#11185）中失败，当前已自动回滚。

## 2. 版本发布

- **v0.23.1-preview.1** — 预览版本。[Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.1)（工作流失败，参见 [#11185](https://github.com/QwenLM/qwen-code/issues/11185)）
- **v0.23.0-nightly.20260906.92a8a8d179** — 每夜构建。[Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260906.92a8a8d179)
- **v0.23.0-nightly.20260905.0c945a6136** — 每夜构建。[Release](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260905.0c945a6136)

三个版本均包含来自 @qqqys 的 **Web Shell 动态工作流可视化**（#10594）及会话工作流派生相关工作。

## 3. 热门议题

| # | 议题 | 优先级 | 为何重要 |
|---|-------|----------|----------------|
| [#8662](https://github.com/QwenLM/qwen-code/issues/8662) | 将 TUI 渲染从 ink 迁移至 OpenTUI（跟踪） | P3 | 30 条评论的跟踪型史诗议题，承载本项目最大规模的 TUI 重写；打过补丁的 ink 渲染器（约 1k 行）是结构性闪烁/VP bug 的根源。 |
| [#11031](https://github.com/QwenLM/qwen-code/issues/11031) | `/export html` 每个文件嵌入 19.5 MB Web Shell 运行时 | P1（已关闭） | 导出数据成本回退：即使是空会话，每个 HTML 也会打包完整的 React/daemon 图。修复后已关闭。 |
| [#11100](https://github.com/QwenLM/qwen-code/issues/11100) | `web-shell/transcript` 仍拉取 daemon React 运行时 | P2 | 只读转录本不应依赖 daemon SDK，这违背了新转录本包的设计初衷。 |
| [#11146](https://github.com/QwenLM/qwen-code/issues/11146) | 已预先中止的请求在无关批次后排队 | P2 | 核心调度逻辑缺陷——已取消的请求会卡在活跃任务之后，导致令人困惑的挂起。 |
| [#11109](https://github.com/QwenLM/qwen-code/issues/11109) | `release.yml` 重复劳动，某一步实际未校验任何东西 | P2 | 同一天两次发布超时；CI 做了重复工作并包含一个空操作的校验步骤。 |
| [#6181](https://github.com/QwenLM/qwen-code/issues/6181) | Web Shell 在移动端的会话切换卡顿 | P1 | 完整转录同步渲染 + 2 秒侧边栏轮询 + 200 ms 抽屉动画内每帧 O(transcript) 开销——手机上出现多秒级冻结。 |
| [#11180](https://github.com/QwenLM/qwen-code/issues/11180) | `--continue` 之后技能 `PreToolUse` 钩子停止生效 | P1（安全） | 恢复会话时安全门禁被静默关闭，而技能指令仍保留在上下文中。 |
| [#11186](https://github.com/QwenLM/qwen-code/issues/11186) | `qwen serve` 通道所有权模型泄露用户作用域配置 | P2 | 主目录工作区禁用了工作区作用域，把共享设置错误归属到用户作用域——真实的多租户隔离缺陷。 |
| [#11198](https://github.com/QwenLM/qwen-code/issues/11198) | 遥测将原始工具错误文本（含 shell 命令行）上传到 RUM | P1（安全） | 默认开启的遥测路径缺少脱敏处理，问题在 `main` 上已存在。是 #10916 的前身。 |
| [#10247](https://github.com/QwenLM/qwen-code/issues/10247) | Agent Team — 稳定性审计跟进项 & 体验待办 | P2 | 多智能体质量工作的跟踪议题；将零散 bug 整合为面向贡献者的 `welcome-pr` 入口。 |

## 4. 关键 PR 进展

| # | PR | 内容说明 |
|---|----|----|
| [#11229](https://github.com/QwenLM/qwen-code/pull/11229) | mesh：每轮 run 绑定及轮次提示封装 | Mesh 第 5a 步——纯粹、可在无运行时下证明，先于依赖它的线程工具（第 5b 步）落地。 |
| [#11230](https://github.com/QwenLM/qwen-code/pull/11230) | mesh：以每次 run 的关闭义务派生线程状态 | 用确定性的关闭义务模型（`blocked`/`review`/`waiting`/`unclosed`/`failure`）取代「最后完成的 run 说了算」。 |
| [#11152](https://github.com/QwenLM/qwen-code/pull/11152) | OpenTUI 行为对齐收尾（对话框、编辑器、shell 模式） | 借助验收用例补齐与 ink 渲染器最后的差距——鉴权对话框、延迟更新等。 |
| [#10504](https://github.com/QwenLM/qwen-code/pull/10504) | 钉钉：本地化的动态生命周期标签 | 状态表态（Thinking/Reading/Running/Editing/Retrying/...），不暴露原始工具输入或推理内容。 |
| [#11103](https://github.com/QwenLM/qwen-code/pull/11103) | CI：仅因 vitest worker IPC 抖动不再判失败 | 新增 `classify-infra-flake.mjs` 区分基础设施抖动与真实失败，输出 `::warning::` 而非红色。 |
| [#11171](https://github.com/QwenLM/qwen-code/pull/11171) | VS Code：权限差异视图关闭时返回编辑结果 | `onDidCloseTextDocument` 路由到 `DiffManager.cancelDiff`，填补「对已消失的 diff 点批准」的体验死胡同。 |
| [#11086](https://github.com/QwenLM/qwen-code/pull/11086) | `serve`：将扩展作用域限定到工作区运行时 | 将全局扩展目录协调进运行中的工作区运行时；暴露工作区限定的 daemon/SDK。 |
| [#10916](https://github.com/QwenLM/qwen-code/pull/10916) | core：对重复相同的工具错误中止轮次 | 循环检测器中的常驻守卫——对 `functionResponse.response.error` 取指纹，走 `LoopDetected` 分支。 |
| [#10183](https://github.com/QwenLM/qwen-code/pull/10183) | memory：结构化按需召回（push/pull） | 用两级 ref/title 树 + 面向查询的元数据子树 + 专用召回工具，取代扁平且堆砌正文的记忆提示。 |
| [#6213](https://github.com/QwenLM/qwen-code/pull/6213) | CLI：处理 IME 组合输入（清理拼音中间态） | IME 组合期间的动作键不再触发常规处理，使中文 IME 真正可用。 |
| [#11169](https://github.com/QwenLM/qwen-code/pull/11169) | web-shell：修补本地文件桥的信任门禁与旁观者漏洞 | 为 #10962 带来四项后续评审修复；保留「仍在解析」的工作区路由判定状态。 |

## 5. 热门讨论

*源数据未提供 GitHub Discussions 数据——本节省略。*

## 6. 功能请求趋势

- **多智能体网格编排**是当前最具前瞻性的主导方向：每轮 run 绑定、确定性线程状态、稳定的关闭义务语义正作为连贯的设计步骤陆续落地（#11229、#11230、#10247）。
- **将结构化记忆作为一等公民的召回协议**正在被正式化：push/pull 模型配合 ref/title 树，再加上面向查询的元数据子树和专用工具，取代扁平等大量正文的记忆提示（#10183）。
- **ACP/IDE 与终端 CLI 的能力对齐**——长期诉求是能在 IDE 里**在轮次运行期间排队消息**，对齐 `qwen` CLI 的使用体感（#8542）。紧密相关：轮次时生命周期的可视化（#10504 钉钉侧）。
- **项目作用域（相对于用户作用域）的扩展**——设计提案（#4790）在沉寂数月后终于获得关注，得益于 `Storage.getExtensionsDir`、`loadExtensionsFromDir` 等此前未接通的代码路径。
- **离线 / 独立授权**用于气隙客户包（#4318）——首次启动激活、内置签名授权文件、无需联网。
- **有界通知溢出**避免静默结果丢失（#7805）——异步系统设计的反复热点。

## 7. 开发者痛点

- **钩子/技能生命周期不一致**：`PreToolUse` 钩子在 `/<技能名>`（#11067）和 `--continue`（#11180）下静默失效，而技能主体仍会执行——对「技能即安全门禁」的信任是重大打击。
- **TUI 按键处理的广播模型**：`KeypressContext` 是「发后即忘」的广播，丢弃处理函数的返回值（#11228），导致打开的右键上下文菜单无法消费按键，进而引发编辑器/对话框竞态。
- **CI 抖动与重复劳动**：`release.yml` 重复工作并包含空操作校验步骤（#11109）；`web-shell E2E Smoke` 是 ECS 池上唯一仍使用扁平 20 分钟超时的任务，在资源争用下被强杀（#11209）；当 issue 已有创建时指派人时，自动修复循环仍会启动一条注定失败的路由任务（#11214）。
- **Web Shell daemon/Runtime 耦合泄露**：只读转录本包仍拉取 daemon React SDK（#11100）；HTML 导出膨胀至 19.5 MB（#11031）；移动端会话切换在 200 ms 动画内每帧 O(transcript)（#6181）；侧边栏未挂载时 VS Code 丢失提示权威轮询（#10989）。
- **调度/取消的正确性**：已预先中止的请求可能被卡在无关批次之后（#11146）；常规排队的取消会跳过完成清理（#11162）。
- **HTTP/SSE 假成功错误**：无状态码的 SSE 限流错误跳过限速重试（#11215）；Anthropic SSE 失败却报告成功的 headless JSON 结果（#11217）——headless CLI 路径上反复出现的一类 bug。
- **安全/遥测缺口**：用量统计上传包含 shell 命令行的原始工具错误文本，未做脱敏（#11198）；`main` 分支上的内容过滤屏相较 #10421 分支丢失了六项加固（#11205）；`.qwen/tmp` 缓存同级写者仍未清除（#10974）。
- **本地化缺口**：`/effort` 未传递到通用 OpenAI 兼容后端（#11227）；CLI 启动期的 help/version 拦截会静默吞掉子命令的自由文本参数并以 exit 0 退出（#11193）。
- **对话框的体验回退**：短终端下的对话框裁剪（#9040）以及贴在底部的 VP 内容在编辑器上方出现空白缝隙（#9305）依然被反复提报，量小但频率高。

---
*基于 QwenLM/qwen-code 的 GitHub 数据生成于 2026-09-07。共扫描 50 个议题与 50 个 PR，按活跃度展示 30/20。*

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*