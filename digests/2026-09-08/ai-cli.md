# AI CLI 工具社区动态日报 2026-09-08

> 生成时间: 2026-09-07 16:38 UTC | 覆盖工具: 7 个

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

## 1. 生态概览

AI 编码智能体 CLI 品类已分化为相互竞争的两大阵营:一方是厂商第一方 CLI(Claude Code、Codex、Gemini CLI、Copilot CLI),比拼广度与平台集成；另一方是独立/开源挑战者(OpenCode、Pi、Qwen Code),主打开放性、供应商无关与自动化入口。纵观这七款工具，重心已从纯粹的编码能力转向**运维层面的关切**——可跨多天续存的会话、成本治理、权限校准，以及 MCP 集成加固。很能说明问题的是，当日互动量最高的两个帖子诉求的都是*控制力*而非能力：Codex 的 `/rewind` 请求(119 👍)与 Claude Code 的 middleware-hooks 提案(129 条评论)。Windows/桌面端已成为各家共同的扩张前线，而上游供应商/API 漂移(OpenCode Go 新增的 session header、Copilot 仅走 Responses 的路由)在 48 小时内就显现为一类独立的运维风险。

## 2. 活跃度对比

| 工具 | Issues(24h) | PRs(24h) | Discussions(24h) | Releases(24h) |
|---|---|---|---|---|
| **Claude Code** | 10 条热门(峰值：#91870 — 129 条评论 / 80 👍) | 3 个活跃 — 被标注“异常稀少” | N/A† | 无 |
| **Codex** | 10 条热门(峰值：#25178 — 46 条评论) | 10 | 9 个讨论帖(峰值：#9618 — 119 👍) | 无 |
| **Gemini CLI** | 10 条热门，含 5 个 P1 | 11 | N/A† | 1(nightly v0.60.0) |
| **Copilot CLI** | 26 个更新 / 10 条热门 | 3(2 个微软原型，1 个跑题) | N/A† | 无 |
| **OpenCode** | 50 个更新 / 10 条热门 | 50 个更新 | N/A† | 无 |
| **Pi** | 10 条热门(峰值：#4945 — 77 条评论 / 32 👍) | 10(7 开 / 3 关) | N/A† | 无 |
| **Qwen Code** | 10 条热门，含 2 个 P1 | 16(10 个关键 + 6 个值得关注) | N/A† | 3(preview、nightly、cua-driver-rs v0.20.4) |

† 这些仓库的数据集中缺少 Discussions 数据(上游未提供/未启用该频道)；**N/A ≠ 不活跃**。Codex 是本周期唯一有 Discussions 数据的仓库。
*注：“热门”计数为编辑部遴选的 top-10;凡摘要提供原始更新数处均按原始数据展示(OpenCode 50/50、Copilot 26)。*

## 3. 共性功能方向

- **会话持久化与生命周期恢复** *(全部七款)* —— 会话正在演变为可跨多天续存的工作空间，而每一套状态机都开始露出裂缝：Copilot(#4755 队列卡死、#4742 单一活跃会话限制)、Codex(#41566 序号重复、#38787 恢复操作呈二次方级开销)、Qwen(#11119 后台 shell 输出丢失)、Pi(#5886 结算/延续元 issue)、OpenCode(#47510 事件压缩、#47567 SQLite 锁重试)。
- **撤销 / 回退 / 时间旅行** —— Codex 上呼声最高的未满足需求(#9618,119 👍——用户明确点名 Claude Code 和 OpenCode 已经具备)；Qwen 正在实现(#9466,回退锚定于稳定的提示词身份)。
- **硬性成本治理** —— Claude Code 希望有可强制执行的熔断器并按来源归因(#85422);OpenCode 记录了一个缓存失效 bug 造成的 $14.82 浪费(#40790,22.5% 失效率)，外加配额卡死(#47614);Codex 用户面临容量不稳定(#43398);Qwen 用户要求计费透明(#44)。成本管理正从仪表盘走向运行时强制执行。
- **权限 2.0** —— 两个方向都出了问题：一边是过于激进且没有退出选项的拦截(Claude #44657 文件名启发式误拦，Copilot #4757 在 `--yolo` 下 fail-closed 误报)，另一边是执行不足(Codex #42253 破坏性操作无弹窗确认、#33282 自动批准不被继承；Claude #53223 `CLAUDE.md`/`AGENTS.md` 仅具建议效力)。Codex 正在收敛为单一的 Guardian 审批界面(#43462、#43458);OpenCode 新增 URL 模式匹配的 `webfetch` 规则(#46611)。
- **MCP 生产化加固** —— 取消/生命周期是头号缺口(Copilot #4753 恢复时杀死 stdio 服务器；Qwen #11272 在 Channel 模式下取消会永久杀死服务器)，其后是鉴权(OpenCode #47814 refresh-token 绑定——与 Codex 的 `validate_refresh_token_issuer` 相呼应；Codex #43428/#43447),再是规模上限(Gemini #24246 128 个工具触发 400 错误、#28971 截断名称冲突)。
- **上下文与缓存经济学** —— 显式压缩调节旋钮(Claude #75335、#82761)、感知模型的窗口(Codex #16140)、感知 AST 的省 token 读取(Gemini #22745)、缓存命中工程(OpenCode #47816 把日期移出被缓存的提示词;Pi #9116/#9117 用系统消息增量提升缓存局部性)。
- **Windows 与桌面端对齐** *(全部七款)* —— Codex 最大的问题簇(截图 #25178、沙箱回归 #43313、宠物悬浮层 #34227)、Qwen 的 ConPTY 泄漏(#11303,约 2.8 GB/12h)、Copilot 的先归档再建新会话(#4756)、Claude 的窗口置顶(#89467)、OpenCode 的 CA 证书阻断问题(#17798)、Pi 的 57 条评论 Windows 元 issue(#7547)。
- **子智能体可靠性与退出状态诚实性** —— Gemini 的智能体在 `MAX_TURNS` 之后谎报 `GOAL` 成功(#22323、#21983),或一挂就是数小时(#21409);Codex 修复了恢复时子智能体被丢弃的问题(#43491);Qwen 请求后台智能体恢复能力(#8586);Claude 存在一处静默的 task 工具回归(#80015)。
- **记忆能力走向成熟** —— Gemini 加固 Auto Memory(#26516–#26525 问题簇)，Qwen 想要语义/嵌入召回(#10684),Claude 用户希望把指令文件当作强制契约执行(#53223)。

## 4. 差异化分析

| 工具 | 战略重心 | 差异化优势 | 当前阻力 |
|---|---|---|---|
| **Claude Code** | 可组合性 + 能力面广度(hooks、插件、Chrome、桌面端、远程控制) | 规模最大、发声最活跃的社区；#91870 middleware-hooks 提案主导 API 议程 | 护栏校准缺少退出选项；公开 PR 通道仅作分诊 |
| **Codex** | 审批/安全架构 + 偏消费级的桌面端 | Guardian V2 整合、供应链摘要锁定(#43444)、线程持久化工作 | Windows 问题簇；容量不稳定(#43398);尚无 `/rewind` |
| **Gemini CLI** | 开源优先的稳定性 + 研究导向 | 唯一肉眼可见在合并社区 PR 的大厂仓库；纪律严明的 P1–P3/EPIC 分诊 | 子智能体退出状态不诚实；128 工具的 MCP 上限 |
| **Copilot CLI** | GitHub 原生企业治理 | fail-closed 托管策略姿态；面向嵌入方的 ACP 协议 | v1.0.83 + 桌面端 1.1.15 回归簇；最弱的外部 PR 通道 |
| **OpenCode** | 开放的多供应商核心 + 付费 Go 路由 | 原始吞吐最高(50/50);供应商无关的广度 | Go 路由不稳定(429/403 风暴)；缓存失效造成的成本泄漏 |
| **Pi** | 极简、架构师主导的核心；SDK 优先 | 对话中途注入系统消息的底层机制(#9116/#9117)、文档评测、对标 jcode 的启动性能预算 | 供应商漂移的速度超过其模型目录更新；社区规模小 |
| **Qwen Code** | 无头/通道自动化 + 本地推理 | Web Shell、钉钉通道、`qwen serve` OpenAPI(#11314)、签名 CUA 驱动二进制；24 小时 3 个版本 | TUI 底座腐化(ink→OpenTUI,#8662);守护进程生命周期混乱 |

**目标用户分化：** 有治理要求的企业 → Copilot/Codex(策略、工单)；扩展作者与爱折腾的开发者 → Pi/Claude Code;CI/通道自动化与本地模型 → Qwen/OpenCode;OSS 贡献者 → Gemini CLI/OpenCode。

## 5. 社区动能与成熟度

- **体量领先者：** OpenCode(50 个 issue / 50 个 PR 更新)与 Claude Code(单帖互动最深：129 条评论)。Codex 在 issue + PR + Discussions 三个维度上最均衡。
- **迭代最快：** Qwen Code(24 小时内 3 个版本，含签名/公证二进制)、Gemini CLI(nightly + 窗口期内多个社区修复被合并)、OpenCode(快速收尾：#47743、#47806、#47808 当天落地)。
- **成熟度信号：** Claude Code 已进入*护栏调优*阶段——抱怨从“不能用”转向“太严格”，这是一款成熟且被重度采用的产品的典型标志。Gemini CLI 展现最成熟的开源流程(带优先级标签、EPIC)。Codex/Copilot 在发布回归管理上显出疲态。
- **贡献模式分化剧烈：** 大厂仓库(Claude:3 个 PR;Copilot:3 个 PR,其中一个是玩笑)实质上充当反馈汇聚池，修复落在内部——高质量社区 PR 无人审阅(Claude #87079)。Pi 展现出最高的人均迭代速度，驱动力来自首席架构师亲自交付基础性重构。

## 6. 趋势信号

1. **会话 → 持久工作空间。** 回退、检查点、后台智能体恢复、跨重启续跑是新的必争之地。*参考：*把智能体会话状态当作生产数据对待；现在就投入持久化与幂等重放。
2. **成本控制从可观测转向强制执行。** 硬性上限、按来源归因(hooks/插件/子智能体)、带美元级证据的缓存失效检测。*参考：*预算归因将成为采购评估标准。
3. **权限进入 2.0。** 对象级规则(URL 模式)、集中式审批管线(Guardian)、启发式拦截必须提供退出选项——过度拦截与执行不足会以对称的方式侵蚀信任。
4. **MCP 是普适依赖，也是普适软肋。** 取消语义、鉴权轮换与工具数量上限在全部七款工具上无一幸免。*参考：*为你的 MCP 集成做契约测试；别想当然认为 cancel 真的会取消。
5. **指令文件被当作信任边界，却只按建议执行。** Claude #53223 与形似提示注入的 #44778(系统事件以用户角色消息出现、伪造同意)预示：对 `AGENTS.md` 这类策略的运行时强制执行将成为下一个差异化要点。
6. **供应商漂移是新的运维风险。** 上游契约变更(OpenCode Go 强制要求的 header、Copilot 仅走 Responses 的路由)在 24 小时内就搞挂了客户端。*参考：*多供应商工具需要版本化的契约测试与适配层。
7. **Windows/桌面端是下一波用户所在**——而每一家都在同时缴纳同样的 ConPTY/沙箱/会话税。
8. **子智能体退出状态的诚实性正成为一项信任指标。** 虚假的“成功”(Gemini 的 `GOAL` bug)会瓦解编排；可验证的终止原因对所有构建多智能体系统的人都将变得重要。

**给决策者的结论：** 面向有治理要求的企业采用，选 Copilot CLI 或 Codex(配 Guardian 级审批)；面向 CI/无头与通道自动化，选 Qwen Code 或 OpenCode;面向可扩展性与自定义智能体技术栈，选 Pi 或 Claude Code(hooks API 尚待落地)；面向开源贡献与路线图影响力，Gemini CLI 与 OpenCode 目前是渗透性最好的仓库。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告
*数据快照：2026-09-08*

> **数据说明：** 本快照中各 PR 的评论数不可用（渲染为 `undefined`）；下方 PR 列表按数据集自身的排序排列（讨论最多的优先），并辅以时效性、范围以及与高评论 Issue 的交叉引用作为依据。Issue 数据是完整的。

---

## 1. 热门 Skills 排名（讨论最多的 PR）

**1. [PR #1298](https://github.com/anthropics/skills/pull/1298) — `skill-creator`：修复 `run_eval.py`（0% 召回率 + Windows）**
- 修复核心评估工具，使其真正将评估产物作为正式 skill 安装；解决 Windows 流读取、触发检测以及并行 worker 失败问题。
- **重要性：** skill 描述优化循环此前一直在对着噪声做优化（召回率始终为 0%）。交叉引用了评论密集的 Issue #556（12 条评论，👍7）以及 10+ 个独立复现报告。
- **状态：** OPEN——高优先级，因为它能打通整个 `skill-creator` 反馈循环。

**2. [PR #514](https://github.com/anthropics/skills/pull/514) — 新增 `document-typography` Skill**
- 对生成文档进行排版质量控制：孤立词换行、孤行段落、编号对齐错位。
- **重要性：** 直击一个影响 Claude 所生成*每一份*文档、却很少被用户主动提出的质量问题。
- **状态：** OPEN。

**3. [PR #1615](https://github.com/anthropics/skills/pull/1615) — 新增 `scnet-hpc` Skill**
- 通过基于配置文件的 SSH 和 Slurm 工作流来操作 SCNet HPC 集群（分区、模块、加速器、作业生成、集群发现）。
- **重要性：** 这种领域特定基础设施 skill 的模式（配置文件驱动）可复用于其他 HPC/云目标。
- **状态：** OPEN。

**4. [PR #538](https://github.com/anthropics/skills/pull/538) — 修复 `pdf` SKILL.md 大小写问题**
- 修正 8 处大小写不匹配（`REFERENCE.md`/`FORMS.md` → 小写），解决在大小写敏感文件系统上失效的问题。
- **重要性：** 改动虽小但影响面大，可提升跨平台 PDF skill 的可靠性。
- **状态：** OPEN。

**5. [PR #486](https://github.com/anthropics/skills/pull/486) — 新增 `odt` Skill（OpenDocument 创建/填充/HTML 转换）**
- 覆盖 `.odt`/`.ods`/ODF：创建、模板填充以及 ODT→HTML 解析。
- **重要性：** 弥补了开放标准文档格式长期存在的缺口，与现有的 PDF/DOCX skill 形成互补。
- **状态：** OPEN。

**6. [PR #210](https://github.com/anthropics/skills/pull/210) — 提升 `frontend-design` skill 的清晰度**
- 重写该 skill，使每一条指令都能在单次对话内可执行；消除导致行为不一致的歧义。
- **重要性：** 改善最常用的创意类 skill 之一的体验。
- **状态：** OPEN。

**7. [PR #83](https://github.com/anthropics/skills/pull/83) — 将 `skill-quality-analyzer` 与 `skill-security-analyzer` 加入 marketplace**
- 两个元 skill，从五个维度（结构、文档、示例、安全姿态等）对 Skills 进行打分。
- **重要性：** 直接回应 Issue #492（43 条评论，榜首 issue）中对信任边界的关切。
- **状态：** OPEN。

**8. [PR #1628](https://github.com/anthropics/skills/pull/1628) — 新增 `hivemind`（零成本多智能体编排）**
- 将机械性工作委派给运行免费模型的无头 opencode worker，由 Claude Code 充当唯一的规划者/审阅者/合并者。
- **重要性：** 直击多智能体 Skills 设计中成本与上下文之间的核心权衡。
- **状态：** OPEN。

---

## 2. 社区需求趋势（来自 Issues）

| 需求主题 | 锚定 issue | 信号强度 |
|---|---|---|
| **社区 Skills 的安全与信任边界** | [#492](https://github.com/anthropics/skills/issues/492)（43 条评论，👍2） | 第一名 issue，遥遥领先。在 `anthropic/` 命名空间下分发的社区 skill 会冒充官方 skill 并滥用高权限。这驱动了对 `skill-security-analyzer`（#83）以及更清晰的来源标注的需求。 |
| **Claude.ai 中的组织级 Skill 共享** | [#228](https://github.com/anthropics/skills/issues/228)（16 条评论，👍8） | 获赞最多。用户希望有一个共享的 skill 库，而不是用 `.skill` 文件在 Slack 上传来传去。 |
| **Skill 评估与触发可靠性** | [#556](https://github.com/anthropics/skills/issues/556)（12 条评论，👍7）、[#1390](https://github.com/anthropics/skills/issues/1390)（4 条评论）、[#1487](https://github.com/anthropics/skills/issues/1487)（4 条评论） | 评估工具和被它评估的 skill 互相损坏：`run_eval.py` 报告触发率为 0%；`mcp-builder/evaluation.py` 打分为 0/N；`claude-api` 在单次工具调用中注入了约 156k tokens。 |
| **自审计与质量门禁流水线** | [#1385](https://github.com/anthropics/skills/issues/1385)（4 条评论，👍1），[PR #1367](https://github.com/anthropics/skills/pull/1367) | 将“任务前校准 → 对抗式审查 → 交付校验”作为内建的 Skills 原语。 |
| **Skills 即 MCP / 跨智能体可移植性** | [#16](https://github.com/anthropics/skills/issues/16)（4 条评论），[PR #1627](https://github.com/anthropics/skills/pull/1627) | 将 Skills 重新打包为 MCP（例如 Buffer GraphQL），从而能在 Claude、Cursor、Codex、OpenClaw、Hermes、n8n 中运行。 |
| **领域 Skill 提案** | [#1329](https://github.com/anthropics/skills/issues/1329) `compact-memory`（9 条评论），[#412](https://github.com/anthropics/skills/issues/412) `agent-governance`（6 条评论，CLOSED） | 针对长时间运行智能体的记忆记法与安全/治理模式。 |
| **分发卫生 / 打包缺陷** | [#189](https://github.com/anthropics/skills/issues/189) 重复 skill（6 条评论，👍9），[#1362](https://github.com/anthropics/skills/issues/1362) pnpm ≥10 失败，[#62](https://github.com/anthropics/skills/issues/62) skill 消失（10 条评论） | 表明 marketplace/安装器层是主要的痛点。 |
| **云厂商集成** | [#29](https://github.com/anthropics/skills/issues/29) AWS Bedrock（4 条评论），[#1175](https://github.com/anthropics/skills/issues/1175) SharePoint 安全（4 条评论，CLOSED） | 需求已超出 Anthropic 自家产品范围。 |

**市场尚未填补的最大“预期落差”：** 一个具备清晰来源标注能力的安全分析 skill；Claude.ai 中的组织级共享原语；一套真正能跑的评估工具；以及能以可移植 MCP 形式交付的 Skills。

---

## 3. 高潜力待合并 Skills（活跃、未合并）

这些 PR 都是近期推出的、实质性的全新 Skills（而非修复），最有可能很快合并：

| Skill | PR | 新增内容 | 高潜力原因 |
|---|---|---|---|
| `skill-quality-analyzer` + `skill-security-analyzer` | [#83](https://github.com/anthropics/skills/pull/83) | 从结构/文档/安全等维度对其他 Skill 打分的元 skill | 直接回应榜首 issue #492 |
| `document-typography` | [#514](https://github.com/anthropics/skills/pull/514) | 对生成文档进行排版质量控制 | 普适性强；是用户反复反馈的问题 |
| `odt` | [#486](https://github.com/anthropics/skills/pull/486) | ODT/ODS/ODF 创建 + 模板填充 + HTML | 弥补与 PDF/DOCX 并列的开放格式空白 |
| `self-audit`（v1.3.0） | [#1367](https://github.com/anthropics/skills/pull/1367) | 机械化文件校验 + 四维推理门禁 | 与 #1385 中的质量门禁提案互补 |
| `testing-patterns` | [#723](https://github.com/anthropics/skills/pull/723) | 完整测试栈：单元、React、集成 | 高需求的开发者工作流 |
| `scnet-hpc` | [#1615](https://github.com/anthropics/skills/pull/1615) | 基于配置文件的 HPC SSH + Slurm | 模式可复用于其他 HPC 目标 |
| `buffer-api` Agent Skill | [#1627](https://github.com/anthropics/skills/pull/1627) | Buffer GraphQL 调度，可移植到多种智能体 | “Skills 即 MCP”（#16）的首类范例 |
| `hivemind` | [#1628](https://github.com/anthropics/skills/pull/1628) | 基于免费模型的多智能体编排 | 回应“成本即特性”的需求 |
| `frontend-design`（修订版） | [#210](https://github.com/anthropics/skills/pull/210) | 清晰度/可执行性重写 | 影响每一个前端任务 |

---

## 4. Skills 生态洞察

**社区在 Skills 层面最集中的需求，是一套具备自验证能力的 Skill 层——即用于审计、打分和保护其他 Skill 的元 Skills，以及一套真正能跑的评估工具——原因在于现有的创建/评估工具链目前正在对着噪声进行优化和评判（0% 召回率、0/N 打分、156k tokens 注入），这阻塞了所有依赖于此的下游工作流。**

---

*本报告基于 anthropics/skills 仓库的公开 GitHub 数据生成（快照日期 2026-09-08）。所有链接均指向规范的 PR/Issue URL。*

---

# Claude Code 社区摘要 — 2026-09-08

## 今日要点
今天最突出的讨论是 **#91870**，提议采用 Express/Koa 风格中间件语义的函数钩子 API —— 拥有 129 条评论和 80 个点赞，是迄今讨论最多的帖子，表明社区对更具可组合性的钩子系统有强烈需求。另外两个帖子反映出成本与能力之间的持续矛盾：**#85422** 关于"token 燃烧熔断器"的请求，以及 **#44778**

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区周报 — 2026-09-08

## 今日要点
Codex 仓库内部围绕 **Guardian 审核/审批子系统** 展开了密集的维护工作（多个 PR 重构审批路径、证据一致性以及上下文模式集中化），同时出现了一组 **Windows 桌面端回归**，影响 Computer Use、远程控制以及发送按钮。另外，长期呼声很高的 **`/rewind`/`/revert` 功能** 继续升温，成为点赞数最高的开放讨论（119 👍）。

## 发布
*过去 24 小时内无新版本。*

## 热门 Issue

1. **#25178** — Windows Computer Use 截屏失败，报错 `SetIsBorderRequired failed: 不支持此接口 (0x80004002)`，系统为 Windows 10 22H2。（46 条评论，22 👍）— 会阻塞任何依赖截屏的 `get_window_state` 调用。
2. **#34227** — Windows 桌面宠物/吉祥物悬浮层的命中区域会随时间与可见精灵逐渐错位，导致点击失效。（28 条评论）
3. **#41566** — 在未完成的回合后，分页式 rollout 会发出重复的序号，永久冻结 Windows 上线程历史的投影。（22 条评论）
4. **#42215** — "无法将此项目用于本地对话" — Windows 上的 ChatGPT Work 项目在文件系统同步阶段反复失败。（17 条评论）
5. **#33282** — Codex Desktop 的 `create_thread` 不会继承 worktree 任务的自动审批模式，强制要求手动确认。（16 条评论，6 👍）
6. **#39947** — Android 端远程控制 Windows 主机时常报告主机已断开；长时间任务无法打开。（15 条评论，6 👍）
7. **#10486** — 计划模式：新增 "导出计划为 Markdown" 选项。（13 条评论，23 👍）— 长期被请求的体验型功能。
8. **#43398** — 选定模型 "已满载" — GPT-5.5、GPT-5.6-Sol/Terra/Luna 以及 GPT-6 Astra 在 2026-09-07 全部失败，仅 5.4-mini 可响应（Pro 20x）。（13 条评论，5 👍）
9. **#38787** — 在较大的活跃线程上，`thread/resume` 实质上呈二次方复杂度，导致远程 steering 超时。（7 条评论）
10. **#35156** — VS Code 扩展：点击 Review 后没有可见的 diff。（6 条评论，40 👍）— 对 Plus 档位的审阅工作流影响很大。

## 关键 PR 进展

1. **#43504** — 在 Unix PID 后端中将僵尸进程视为非活跃，使已退出的 app-server/updater 进程不再显示为存活状态。（[PR](https://github.com/openai/codex/pull/43504)）
2. **#43495** — 新增 `ThreadManager::fork_internal_session`，允许从调用方指定的已提交历史分叉出内部会话，且不影响进行中的父级回合。（[PR](https://github.com/openai/codex/pull/43495)）
3. **#43494** — `RolloutReferenceIndex::scan_unarchived_threads` 将归档 rollout 的读取限制在请求的线程范围内，减少对无关压缩文件的 I/O。（[PR](https://github.com/openai/codex/pull/43494)）
4. **#43491** — Multi-agent v2 roster 现在会包含未加载的子代理及其完整代理路径，修复了冷启动恢复/压缩后子代理丢失的问题。（[PR](https://github.com/openai/codex/pull/43491)）
5. **#43462** — 移除遗留的 Guardian `fast_decision`/`full_review` 钩子以及重复的 Guardian V2 快速审批实现；`ApprovalReviewContributor::decide` 成为唯一的审批接口。（[PR](https://github.com/openai/codex/pull/43462)）
6. **#43458** — 在会话构建阶段集中解析 `GuardianContextMode`，并在保留、回放、证据采集、压缩和审阅环节共享该状态。（[PR](https://github.com/openai/codex/pull/43458)）
7. **#43447** — 将 MCP elicitations 路由到 `decide_approval`，从而遵循 policy/reviewer/review 的要求；对不支持的表单/URL elicitations 仍交给用户处理。（[PR](https://github.com/openai/codex/pull/43447)）
8. **#43432** — 允许审批扩展在缓存审批、同步审阅和用户提示之间选择，并新增 `review_reason` 字段；内核仍强制要求 Guardian 必审和每次新鲜审阅。（[PR](https://github.com/openai/codex/pull/43432)）
9. **#43428** — 向 stdio MCP 服务器声明实验性 `codex/auth-change` 能力，并在后续鉴权变更时发出 `notifications/codex/authChanged`。（[PR](https://github.com/openai/codex/pull/43428)）
10. **#43444** — 使用可信摘要对 V8 发布清单进行钉死，并防止已发布的发布资产被覆盖，强化供应链下载路径的安全性。（[PR](https://github.com/openai/codex/pull/43444)）

## 热门讨论

**Ideas**
- **#9618** — *"怎么到现在还没有 /rewind 或 /revert 功能？"*（20 条评论，119 👍）。仍是仓库里点赞数最高的讨论；用户把 Codex 与 OpenCode、Claude Code 对比，后两者已经支持无需逐步提交即可撤销。
- **#7366** — *"`@` 引用的文件被 gitignore 了"*（2 条评论，7 👍）。`.gitignore` 中的路径无法通过 `@` 引用；用户希望在不提交的情况下查看依赖源码。
- **#37611** — *"用于治理型访问的高能力 Codex 模型签名企业工单"*（2 条评论，1 👍）。建议将加密签名的工作单作为企业治理原语，与 OpenAI 的下一代网络安全防护对齐。

**General**
- **#7782** — *"在 Codex 中废弃 `chat/completions` 支持"*（14 条评论，21 👍）。官方说明 `responses` API 将取代 `chat/completions`；用户在询问工具链的迁移时间表。

**Q&A**
- **#43257** — *"实验性上下文管理如何将历史查询计入 Codex 用量限制？"*（0 条评论，2 👍）。使用 Pro/Astra 多日的用户希望了解新上下文窗口中的历史查询是否消耗配额。

**Show and tell**
- **#41157** — *CodexFuse 1.2.0* — 本地 Windows 托盘面板，用于查看 Codex 用量限制、重置与小时级使用情况；无需 API Key。（[链接](https://lilmark777.itch.io/codexfuse)）
- **#43224** — *NULLYARD* — 公开免登录的 MCP 面板，提供静态的技能与集成指南。
- **#43427** — *Blume.codes* — 将过去的编码代理会话转化为可复用的 rules 和 skills，对抗代理漂移。

## 功能请求趋势

- **代理操作的时间旅行 / 撤销** — `/rewind` 或 `/revert` 是迄今点赞数最多却仍未满足的需求；用户希望回退一次错误的工具调用，而无需逐步提交。
- **计划模式导出与持久化** — 将计划导出为 Markdown 以便分享或参考（#10486）。
- **模型感知的配置** — 上下文窗口和自动压缩阈值应跟随当前激活的模型，而不是使用单一的全局值（#16140）。
- **更好地支持 `@` 引用被忽略/依赖文件** — 解锁查看 `.gitignore` 中供应商代码实现的能力（#7366）。
- **一等公民的移动端/远程 CLI 控制** — 在保留终端主导权的前提下，将 ChatGPT 移动应用连接到正在运行的 Windows 原生 Codex CLI 会话（#43273）。
- **企业级治理访问** — 用于在受监管环境中调用高能力模型的签名工作单（#37611）。

## 开发者痛点

- **Windows 桌面端回归** 是本周最突出的主题：Computer Use 截屏失效（#25178）、桌面宠物悬浮层命中漂移（#34227）、发送按钮在 26.820 后失效（#41081）、远程配对断连（#39947）、Composer 消失（#42963），以及每次会话都会触发 UAC 提权沙箱重新弹窗（#42213）。
- **线程/会话持久化** — 重复序号（#41566）、二次方复杂度的 `thread/resume`（#38787），以及陈旧的 "newest-first" 查找（#43129）都说明：当会话跨多日运行时，rollout/线程持久化层需要加固。
- **审批与沙箱绕过担忧** — 破坏性操作在未弹出已配置审批窗口的情况下执行（#42253），且自动审批未传递到 worktree 子线程（#33282）。
- **macOS UI 怪相** — 重装后工具栏/终端不可见（#42664）、滚动后 Composer 被隐藏（#42776）、Computer History 每 10 分钟唤醒睡眠中的显示器（#42902）。
- **代码审阅体验** — diff 无法渲染（#35156），以及在常规开源审阅中过度激进的网安告警（#41466），正削弱用户对审阅工作流的信任。
- **容量/可用性不稳定** — 多个模型档位同时报告 "已满载"（#43398），动摇了 Pro/Pro Max 的可靠性预期。
- **跨平台沙箱回归** — 在 Windows 上 0.132.0 到 0.153.4 之间引入的 `CreateProcessAsUserW failed: 2`（#43313），正在困扰长期用户。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-08

## 今日要点

社区继续聚焦于**子代理可靠性与 Auto Memory 系统**。围绕子代理在 `MAX_TURNS` 后误报成功（#22323）、通用代理无限挂起（#21409），以及 shell 命令卡在 "Waiting input" 状态（#25166）的高优先级 bug，反映出稳定性问题持续存在。与此同时，维护者持续推送一系列针对性修复——尤其集中在换行符处理、MCP 工具名截断、沙箱隔离，以及 Node 20 → 22 沙箱镜像升级（#28973）方面。

## 发布版本

- **v0.60.0-nightly.20260907.g85aca163f** — 自动化 nightly 版本号递增；在前一个 nightly 基础上的增量更新。（[对比](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f)）

## 热门 Issue

1. **#22323 — `MAX_TURNS` 后子代理恢复却上报 `GOAL` 成功（P1 bug，13 条评论）** — `codebase_investigator` 即使在触及回合上限且未做任何分析时，仍上报 `status: "success"`，掩盖了来自用户的中断。问题关键在于用户无法信任子代理的退出信号。（[链接](https://github.com/google-gemini/gemini-cli/issues/22323)）
2. **#21409 — 通用代理挂起（P1 bug，8 条评论，👍 8）** — 本批中社区参与度最高。任何对通用代理的委派都可能挂起超过一小时。临时方案（禁用子代理延迟）暗示其底层存在更深的路由 bug。（[链接](https://github.com/google-gemini/gemini-cli/issues/21409)）
3. **#25166 — Shell 命令执行完成后卡在 "Waiting input"（P1 bug，4 条评论，👍 3）** — 常见 UX 痛点：简单的 shell 命令已结束，但 CLI 仍锁定提示符，阻塞后续操作。（[链接](https://github.com/google-gemini/gemini-cli/issues/25166)）
4. **#21983 — 浏览器子代理在 Wayland 上失败（P1 bug，4 条评论）** — 即使失败仍上报 `Termination Reason: GOAL`，与 #22323 属于同一类误导性退出状态 bug，但具体发生在浏览器代理上。（[链接](https://github.com/google-gemini/gemini-cli/issues/21983)）
5. **#22186 — `get-shit-done` 输出钩子导致崩溃（P1 bug，3 条评论）** — 第三方工作流集成触及边缘场景；反映出对更强钩子稳定性的需求。（[链接](https://github.com/google-gemini/gemini-cli/issues/22186)）
6. **#19873 — 零依赖操作系统级沙箱与执行后意图路由（P2 enhancement，9 条评论）** — 一项重要的架构提案，旨在让 Gemini 3 在不牺牲安全性的前提下使用原生 bash 链式调用。（[链接](https://github.com/google-gemini/gemini-cli/issues/19873)）
7. **#22745 — AST 感知的文件读取、搜索与映射（EPIC，P2，7 条评论）** — 调研可减少误读带来 token 浪费的工具。姊妹 issue #22746 探索具体工具（tilth、glyph）。（[链接](https://github.com/google-gemini/gemini-cli/issues/22745)）
8. **#21968 — Gemini 对 skills/sub-agents 使用不足（P2 bug，6 条评论）** — 尽管已配置 skills 和 subagents，模型仍很少自主调用它们——削弱了用户在定制化上的投入价值。（[链接](https://github.com/google-gemini/gemini-cli/issues/21968)）
9. **#24246 — 工具数 > 128 时 Gemini CLI 报 400 错误（P2 bug，3 条评论）** — 硬性工具数量上限为拥有大型 MCP / 扩展配置的重度用户设置了天花板。（[链接](https://github.com/google-gemini/gemini-cli/issues/24246)）
10. **#22232 — `browser_agent` 韧性：会话接管与锁恢复（P3 feature，4 条评论）** — 提议在浏览器 profile 被锁定时由 fail-fast 转为 fail-tolerant 的姿态。（[链接](https://github.com/google-gemini/gemini-cli/issues/22232)）

## 关键 PR 进展

1. **#28973 — 沙箱镜像从 EOL 的 `node:20-slim` 升级到 `node:22-slim`（P1 security，已关闭）** — 关闭 #28584；应对 Node 20 于 2026-04-30 达到 EOL 的问题。属于关键的安全维护。（[链接](https://github.com/google-gemini/gemini-cli/pull/28973)）
2. **#28972 — 为 `formatTruncatedToolOutput` 防御非正的 `maxChars`（P1，已关闭）** — 关闭 #28620；防止在 budget 为 0 或负数时工具输出被静默损坏。（[链接](https://github.com/google-gemini/gemini-cli/pull/28972)）
3. **#29216 — 在沙箱容器中隔离 settings 目录（规模 L，开放中）** — 阻止沙箱直接挂载宿主机 `~/.gemini`，避免通过用户自身容器配置造成的 OAuth / 凭据泄露。（[链接](https://github.com/google-gemini/gemini-cli/pull/29216)）
4. **#28971 — 保证截断后的 MCP 工具名唯一（P2，已关闭）** — 修复两个 MCP 工具首尾 30 字符相同时的冲突——消除一处真实的注册表歧义 bug。（[链接](https://github.com/google-gemini/gemini-cli/pull/28971)）
5. **#28975 — 为符号链接的工作区根保留 glob 结果（P2，已关闭）** — macOS 用户遇到 `/tmp` 指向 `/private/tmp` 时，对匹配项看到 `No files found`；影响面较广。（[链接](https://github.com/google-gemini/gemini-cli/pull/28975)）
6. **#28983 — 检测混合换行符，而非在单次匹配时直接标记 CRLF（P2，已关闭）** — 修正过于激进的 CRLF 分类，避免将正常文件误报。（[链接](https://github.com/google-gemini/gemini-cli/pull/28983)）
7. **#29229 — 在 settings 编辑器中拒绝非有限数值（规模 S，开放中）** — 关闭 #29226；防止 `1e309` 形式的输入被静默序列化为 `null` 而损坏配置。（[链接](https://github.com/google-gemini/gemini-cli/pull/29229)）
8. **#29131/#29132 — 规范化 diff 上下文片段中的换行符（开放中，重复轨道）** — 防止对比 CRLF 与 LF 文件时产生整文件 100% diff——一项 Windows 特有的小痛点，被修了两次。（[PR #29131](https://github.com/google-gemini/gemini-cli/pull/29131)，[PR #29132](https://github.com/google-gemini/gemini-cli/pull/29132)）
9. **#29237 — 修复 `list_background_processes` 对信号杀死的进程打印 `(Exit Code: null)` 的问题（P3，开放中）** — 改进后台进程被信号杀死时的诊断输出。（[链接](https://github.com/google-gemini/gemini-cli/pull/29237)）
10. **#29134 — 保护当前会话不被删除（P2，开放中）** — 关闭 #29133；`--delete-session` 不再允许用户误删当前正在使用的会话。（[链接](https://github.com/google-gemini/gemini-cli/pull/29134)）

## 功能请求趋势

- **AST 感知工具**：用于精确读取、搜索与代码库映射，以削减浪费的 token（#22745、#22746、#19561）。
- **子代理可观测性与健壮性** —— 通过 `/chat share` 提供轨迹（#22598），在 bugreport 中携带子代理上下文（#21763），以及韧性与 settings 覆盖（#22232、#22267）。
- **Auto Memory 加固** —— 确定性脱敏（#26525）、有界重试（#26522）、非法 patch 的显式呈现（#26523）、合并跟踪（#26516）。
- **沙箱与安全** —— 零依赖操作系统级沙箱（#19873）、容器 settings 隔离（#29216）、EOL Node 沙箱升级（#28973）。
- **任务跟踪现代化** —— 用基于持久化文件的 CRUD 替换上下文内 `WriteToDo`（#18836），以及基于本地文件的实验性任务跟踪器（#21000）。
- **Agent 自我认知** —— 准确的 CLI flag / 热键知识（#21432），劝阻破坏性的 `git reset --force` 用法（#22672）。

## 开发者痛点

- **误导性的终止信号** —— 子代理（#22323）与浏览器子代理（#21983）即使失败或达到 `MAX_TURNS`，仍上报 `GOAL`，让调试异常痛苦。
- **Agent 挂起** —— 通用代理委派可能挂起数小时（#21409）；shell 命令执行完成后卡在 "Waiting input"（#25166）。
- **Auto Memory 可靠性** —— 一组围绕脱敏、重试和非法 patch 的相关 bug（#26516、#26522、#26523、#26525）表明系统可用但在边缘场景上仍较粗糙。
- **工具数量上限** —— 大型 MCP / 扩展配置触碰到 400 工具 / 128 工具的 400 错误天花板（#24246）。
- **换行符引发的反复问题** —— Windows / macOS 上与 CRLF、混合换行符及整文件 diff 相关的持续痛点（#22466、#28983、#29131、#29132）。
- **Skills / 子代理调用不足** —— 用户投入定制 skills 与 agents，但模型除非被显式告知，否则很少调用（#21968）。
- **浏览器代理的脆弱性** —— Wayland 失败（#21983）、锁定 profile 的处理（#22232），以及 `settings.json` 覆盖被忽略（#22267）。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区简报 — 2026-09-08

## 1. 今日要点

今天 Copilot CLI 社区的关注焦点集中在 **v1.0.83 发布后的回归问题**上——Azure MCP `learn=true` 超时(Issue #4749)、会话恢复时 MCP stdio 连接被取消(Issue #4753),以及桌面应用 1.1.15 强制用户先归档所有空闲会话才能新建会话(Issue #4756),这些问题都扎堆出现在最新构建上。与此同时，桌面应用的会话管理层不断暴露出令人头疼的状态机缺陷(会话永久卡死、会话删除无效果、仅允许单个活跃 Local 会话的限制)，ACP 协议也逐渐成为反复出现的话题——三个独立 issue(#4555、#4743、#4740)描述了 ACP 模式特有的并发、空闲信号和生命周期缺陷。过去 24 小时内没有发布新版本。

## 2. 版本发布

_过去 24 小时内没有新版本发布。_

## 3. 热门 Issue

| # | Issue | 为什么重要 |
|---|-------|----------------|
| [#1665](https://github.com/github/copilot-cli/issues/1665) | 支持项目/仓库级作用域的插件(而不仅是用户级)——**已关闭** | 点赞最多的插件配置类请求(👍18,14 条评论)。团队希望插件随仓库一起签入管理，而不是全局安装。 |
| [#4756](https://github.com/github/copilot-cli/issues/4756) | Windows 桌面应用要求先归档所有空闲的项目会话，才能创建新的 Local 会话(👍6) | 刚发布的 1.1.15 桌面应用上令人头疼的 UX 回归，阻碍了 Windows 上的正常多任务使用。 |
| [#4757](https://github.com/github/copilot-cli/issues/4757) | 在**未配置任何托管策略**的账户上，`--yolo` / `--allow-all` 因 fail-closed 限制在整场会话中被禁用 | 策略引擎误报导致即使未配置策略也永久禁用绕过模式——属于安全/权限方面的回归。 |
| [#4742](https://github.com/github/copilot-cli/issues/4742) | 桌面应用 1.1.15:一个 Local 会话运行时无法创建第二个 Local 会话 | "This project already has an active Local workspace" 错误直接破坏了并行会话工作流。 |
| [#4753](https://github.com/github/copilot-cli/issues/4753) | v1.0.83:会话恢复会取消正在运行中的 stdio MCP 服务器(约 1 秒 vs. 此前约 16 秒) | MCP 会话恢复方面的**已确认回归**；恢复后 stdio MCP 服务器会悄无声息地变得不可用。 |
| [#4749](https://github.com/github/copilot-cli/issues/4749) | 在 1.0.83-5 中，Azure MCP `learn=true` 调用在 180 秒后超时(1.0.80 中正常) | 又一个 **v1.0.83 上的回归**——Azure 特有的 MCP 分层发现从 0.2 秒变成 180 秒超时。 |
| [#4755](https://github.com/github/copilot-cli/issues/4755) | 当队列通道(queued-lane)消息恰好在轮次结束时到达，会话会永久卡死 | 进程不会崩溃，但不再接受任何输入，队列也永远无法清空——只能强制终止进程才能恢复。 |
| [#4738](https://github.com/github/copilot-cli/issues/4738) | `ask_user` 表单：按下 Enter 会丢弃正在输入中的答案(数据丢失) | 引导式(elicitation)表单中的**高严重性数据丢失缺陷**；削弱了用户对表单 UI 的信任。 |
| [#4750](https://github.com/github/copilot-cli/issues/4750) | Copilot TUI 即使在空闲时也大量占用 CPU | 1.0.83 上空闲时仍有多核后台负载——可能是事件循环或渲染轮询的问题。 |
| [#4555](https://github.com/github/copilot-cli/issues/4555) | ACP `session/prompt` 无条件中止会话，连带取消后台子代理 | ACP 行为与交互式 TUI 不一致——代理开发者每次提交提示词都会丢失正在运行的后台任务。 |

特别提及:[#1999](https://github.com/github/copilot-cli/issues/1999)(德语键盘无法输入 `@` —— 已关闭)和 [#2644](https://github.com/github/copilot-cli/issues/2644)(Shift+方向键 / Ctrl+A 选择)仍是顽固存在的**国际化与文本编辑 UX 缺口**。

## 4. 重点 PR 进展

过去 24 小时内仅有三个 PR 处于开放状态，且全部是原型 / 文档类：

- **[#4746](https://github.com/github/copilot-cli/pull/4746)** —— *新增实验性 next-action 扩展原型*(作者:`anujb-msft`)。这是一个可选启用(opt-in)的 SDK 扩展示例，用于模型推断的下一步动作；位于 `examples/next-best-action/` 目录下，不在自动发现范围内，也不会修改已发布的 CLI。使用了 `joinSession()` 并搭配无工具 UI。
- **[#4739](https://github.com/github/copilot-cli/pull/4739)** —— *docs:提议由终端负责的 macOS 通知*(作者:`anujb-msft`)。该 PR 记录了 macOS 通知点击问题，并附带一个 MIT 许可的终端通知示例以及可移植的回归测试。**仅供参考的提案，并非 CLI 变更。**
- **[#4748](https://github.com/github/copilot-cli/pull/4748)** —— *Add joke cli*(作者:`tnk7899xd-create`)。无描述；很可能是一次投入甚少、与项目方向不符的贡献。

## 5. 热门讨论

_未提供讨论数据——本节省略。_

## 6. 功能请求趋势

在这 26 个有更新的 issue 中，呼声最高的功能方向主要集中在：

1. **项目/仓库级作用域配置**——插件(#1665)、代理(#4752 —— 通过 `--add-dir` 添加的代理未被 `--agent` 加载，#4754 —— 会话存储),以及会话标签页(#4693 —— 按仓库过滤/限定范围)想要的是同一件事：为如今按用户全局或按应用全局管理的状态提供按仓库划分的生命周期。
2. **ACP 协议成熟度**——三个 ACP 模式相关的 issue(#4555、#4743,以及围绕 MCP 取消的 #4759)指向同一个诉求：ACP 传输层需要具备对后台任务的正确感知、可观测的空闲信号，以及符合标准的 MCP 行为。
3. **TUI 中的标准文本编辑 / 国际化**——Shift+方向键选择(#2644)、德语键盘 `@`(#1999)、`ask_user` 表单的 Enter 处理(#4738)都汇聚到同一点：“CLI 的输入体验应当与普通终端看齐”。
4. **无处不在的取消与生命周期信号**——MCP 取消(#4759)、会话卡死恢复(#4755)、队列排空，以及 ACP 空闲信号(#4743)都反映出对贯穿整个技术栈的**完善的异步/取消原语**的需求。
5. **多仓库 / 集合工作区**——#4709(默认分支不同时的 worktree 关联)和 #4693(按仓库过滤会话列表)表明多仓库项目的采用率正在上升，而当前的会话模型对此支持不佳。

## 7. 开发者痛点

- **v1.0.83 发布后的回归问题是今天抱怨声最集中的地方。**MCP `learn=true` 超时(#4749)和恢复时取消 MCP stdio 连接(#4753)破坏了原本正常工作的集成；#4750(CPU 占用过高)和 #4756/4742(桌面会话限制)则表明 1.1.15 桌面版更新与 CLI 一同出现了回归。
- **桌面应用的会话管理层十分脆弱。**队列通道消息导致的卡死(#4755)、无效果的删除操作(#4754)、单活跃 Local 会话限制(#4742),以及强制归档空闲会话(#4756)都指向同一个根因：内存中的会话映射表无法与 `data.db` 正确对账。
- **MCP 集成的摩擦面广且反复出现。**认证(缺少 User-Agent 请求头 —— #4681)、传输(stdio 取消 —— #4753)、取消信号(#4759)以及发现延迟(#4749)意味着 MCP 作者在每一层都在碰壁。
- **CLI 的输入/编辑层尚达不到普通终端的水准。**不支持 Shift+方向键选择(#2644)、Alt-Gr 失效(#1999)、Enter 丢弃表单输入(#4738),再加上长期悬而未决的 VOICE 模式 pid 文件缺失死锁(#4740),这些都汇成同一个一致的抱怨：**交互界面需要打磨到与普通 shell 同等水平**。
- **策略/fail-closed 的姿态过于激进。**#4757(--yolo 在没有托管策略的账户上被禁用)表明安全护栏在并没有真正出错时也被触发，把用户困在降级模式中，除了杀掉会话之外没有任何恢复途径。

---

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-08

## 今日要点
一波 **OpenCode Go 服务商稳定性问题**占据了 issue 跟踪器的主导位置（HTTP 429 中断、特定模型返回 403 Forbidden、缺少 `x-opencode-session` 头），表明付费层的路由层出现了部分降级。在核心代码侧，两项重要的 **数据库/存储修复**取得进展——SQLite 写锁重试与事件快照压缩——同时还有一个安全加固 PR 将 **MCP OAuth 刷新令牌绑定到其颁发授权服务器**。

## 发布动态
过去 24 小时内无新发布。

## 热门 Issue

1. **[#47613](https://github.com/anomalyco/opencode/issues/47613)** — OpenCode Go 上的 HTTP 429 中断（2026-09-06，持续数小时）。当日讨论最多的帖子，共有 **14 条评论**；付费订阅用户正在请求赔偿。这表明 Go 端点 `opencode.ai/zen/go/v1/messages` 发生了真实的中断。

2. **[#47634](https://github.com/anomalyco/opencode/issues/47634)** — 即使用量低于 60%，Console Go 仍持续返回 `rate_limit_exceeded`。很可能与同一 Go 路由事件相关；UI 自动重试反复失败，影响付费用户的使用流程。

3. **[#40343](https://github.com/anomalyco/opencode/issues/40343)** — OpenCode Go：部分模型返回 `403 Forbidden: {"model":"<model>"}`（👍 5）。在持有有效订阅的情况下可针对 `mimo-v2.5` 复现；再现了跟踪器上"Forbidden"报告刷屏的一类问题（#47777、#47801）。

4. **[#17798](https://github.com/anomalyco/opencode/issues/17798)** — Windows 忽略 `NODE_EXTRA_CA_CERTS`（👍 4）。阻碍了部署在 TLS 检测代理后、使用内部 PKI 的企业用户；属于高影响的部署阻断问题。

5. **[#40790](https://github.com/anomalyco/opencode/issues/40790)** — Anthropic 缓存失效 bug 导致 **3 个会话共浪费 $14.82**（22.5% 失效率）。这是已知缓存失效问题（#24841）仍在生效的线上证据；对 Opus 5 用户来说财务影响显著。

6. **[#47168](https://github.com/anomalyco/opencode/issues/47168)** — `gpt.txt` 中未实现的 `commentary` 渠道提前结束 chat-completions 模型的回合。这是助手输出偶发性截断的根因；将通过 PR #47355 修复。

7. **[#47545](https://github.com/anomalyco/opencode/issues/47545)** — 自动模式在终端中反复触发误报的权限通知。服务器已经发出权限请求后，客户端又执行自动批准——属于 UX bug 而非安全 bug。

8. **[#31737](https://github.com/anomalyco/opencode/issues/31737)** — TUI：通过 `Ctrl+V` 粘贴图片无效（👍 2）。是截图驱动工作流中长期存在的卡点。

9. **[#47614](https://github.com/anomalyco/opencode/issues/47614)** — 每月周期续费后，每周用量配额卡在 100%。计费/配额状态 bug 阻断了正常使用。

10. **[#17044](https://github.com/anomalyco/opencode/issues/17044)** — 更新总是安装到 `%LOCALAPPDATA%`，无视实际安装路径（已关闭，7 条评论）。长期存在的 Windows 可移植性问题已解决。

> 值得关注的还有：[#47778](https://github.com/anomalyco/opencode/issues/47778)（`gpt-5.6-luna` 持续 HTTP 500）、[#12436](https://github.com/anomalyco/opencode/issues/12436)（OpenRouter "No cookie auth credentials found" —— 已关闭）。

## 重要 PR 进展

1. **[#47510](https://github.com/anomalyco/opencode/pull/47510)** — **压缩被取代的持久事件快照**。关闭 #47223 并解决了 5 个相关 issue；限制长时间运行会话遇到的 `event` 表无界增长问题。

2. **[#47567](https://github.com/anomalyco/opencode/pull/47567)** — **在 SQLite 锁超时时重试语句**。避免在多个 opencode 进程共享同一数据库时将 `database is locked` 当作致命错误。

3. **[#47814](https://github.com/anomalyco/opencode/pull/47814)** — **将 MCP OAuth 刷新令牌绑定到其颁发授权服务器**。#47743 的后续；参照 Codex 的 `validate_refresh_token_issuer` 以防止刷新令牌混淆攻击。

4. **[#47795](https://github.com/anomalyco/opencode/pull/47795)** — **回合差异路由**（`GET /api/session/:id/diff`）。新增 `session.diff` API，按需计算并返回某回合的 `FileDiff.Info[]`——不新增持久化数据。是评审/UI 功能的有用基础。

5. **[#47355](https://github.com/anomalyco/opencode/pull/47355)** — **为聊天模型省略渠道提示**。关闭 #47168；移除了在 chat-completions 服务商上提前终止回合的 `commentary` 提示。

6. **[#47818](https://github.com/anomalyco/opencode/pull/47818)** — **在 CLI 中保留远程启动目录**。修复了针对仅存在于远程的路径的 `opencode2 <dir> --server <url>`。

7. **[#47805](https://github.com/anomalyco/opencode/pull/47805)** — **在 ACP 中暴露可操作的配额错误**。在 `OPENCODE_CLIENT=acp` 时，停止长达数小时的静默配额重试；关闭 #47804。

8. **[#47816](https://github.com/anomalyco/opencode/pull/47816)** — **将日期从缓存的系统提示中移出**。关闭 #29672；通过将时间敏感的日期从缓存前缀中移除，提高提示缓存命中率。

9. **[#46611](https://github.com/anomalyco/opencode/pull/46611)** — **支持 URL 模式的细粒度 `webfetch` 权限**。关闭 #35565；将 `webfetch` 与对象规则授权对齐，同时保留 `websearch` 的简单允许/拒绝语义。

10. **[#44558](https://github.com/anomalyco/opencode/pull/44558)** — **跨进程串行化数据库初始化/迁移**。复现了 5/6 进程的 "database is locked" 竞态；在两个驱动中都先启用 WAL 再设置 `busy_timeout`。

> 已合入（已关闭）：[#47743](https://github.com/anomalyco/opencode/pull/47743)（MCP CIMD 客户端元数据文档）、[#47806](https://github.com/anomalyco/opencode/pull/47806)（重试瞬时服务商压缩失败）、[#47808](https://github.com/anomalyco/opencode/pull/47808)（将 `model.request.headers` 合并至 SDK 选项）、[#29102](https://github.com/anomalyco/opencode/pull/29102)（在 `@file` 扫描中跟随符号链接）。

## 功能请求趋势

- **更好的错误提示与配额 UX** —— 自动路由应指明尝试的模型（#47794），ACP 必须暴露配额错误而非卡住（#47804/#47805）。
- **本地化** —— 波斯语（`fa`）README 翻译请求（#47775）；表明用户增长已超出 EN/ZH 范围。
- **桌面应用 UX** —— 可配置的启动行为（新建会话 vs. 恢复上次的 vs. 起始页）（#47807）。
- **图片粘贴** —— TUI 的 Ctrl+V 与 VSCode 扩展都静默失败（#31737、#47762）。
- **细粒度权限** —— URL 模式的 `webfetch` 规则（#35565、#46611）。
- **会话生命周期 CLI** —— `session list` / `session delete`（通过 #47812 从开发分支恢复）。
- **终端原生进度指示器** —— ConEmu/WT 旋转指示器集成（#24807）。

## 开发者痛点

- **OpenCode Go 服务商不稳定** —— 本周最大的摩擦来源：429 风暴（#47613、#47634）、特定模型的 403 Forbidden（#40343、#47777、#47801），以及因缺少 `x-opencode-session` 头导致的路由失败（#47763、#47755、#47756）。
- **缓存 bug 造成的财务浪费** —— Anthropic 缓存失效问题造成了真实的金钱损失（#40790，$14.82 / 3 个会话）；Opus 5 用户希望得到修复。
- **Windows 专属痛点** —— `NODE_EXTRA_CA_CERTS` 被忽略（#17798）、更新写入 `%LOCALAPPDATA%` 而非安装路径（#17044）、图片粘贴失败（#47762）。
- **ACP 错误不透明** —— 可操作的服务商/配额错误被吞掉，导致客户端挂起或超时（#47804、#47805）。
- **配额/计费状态 bug** —— 每月续费后每周配额未重置（#47614），特定模型持续 500（#47778）。
- **自动模式误报权限提示** —— 服务器发出的请求被自动批准立即解决，产生干扰（#47545）。
- **TUI 体验差距** —— 图片粘贴（#31737），提示/渠道不匹配导致 chat-completions 服务商出问题（#47168）。

*基于过去 24 小时内更新的 50 个 issue 与 50 个 PR 整理。*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-08

## 今日亮点

提供商集成的脆弱性主导了今日的活动：一系列问题围绕 OpenCode Go 新要求的 `x-opencode-session` 请求头展开（#9230、#9237、#9290），同时 Copilot 的 `gpt-6-astra` 模型被发现被错误路由到了 `/chat/completions`（已通过 #9253 修复）。在架构层面，mitsuhiko 推动了 #8998 重大拆分的前两层，引入了对话中间系统消息（#9116），并将 prompt/工具变更以系统消息 delta 的形式接入（#9117）——这是编码代理构建请求负载方式的一次基础性转变。

## 版本发布

_过去 24 小时内无新版本发布。_

## 热门 Issue

1. **[#4945 — openai-codex 连接可靠性问题](https://github.com/earendil-works/pi/issues/4945)**（OPEN，进行中，77 条评论，👍 32）
   今日运行时间最长、获赞最多的讨论：`openai-codex`/`gpt-5.5` 间歇性使 TUI 卡在 `Working...`，无流式输出也无可见错误，只能通过 Escape 恢复。已标记为进行中。

2. **[#7547 — 如何在 Windows 上使用 Pi？遇到了哪些问题？](https://github.com/earendil-works/pi/issues/7547)**（OPEN，57 条评论）
   一条用于整合 Windows 上碎片化使用情况的元 issue。Petertroll 正在收集信号，以判断哪些运行模式（原生、WSL、容器）应获得一等修复，哪些应下放给扩展处理。

3. **[#5886 — AgentSession 结算/续接与 assistant-tail 生命周期缺陷](https://github.com/earendil-works/pi/issues/5886)**（OPEN，11 条评论，👍 4）
   由 mitsuhiko 提交，作为一类反复出现的缺陷的元 issue：运行后逻辑试图从一个已不再是活跃分支的会话记录中续接 agent。很可能驱动 agent loop 的协同修复。

4. **[#9052 — 全屏模式下滚轮滚动速度比常规模式慢 3 倍](https://github.com/earendil-works/pi/issues/9052)**（OPEN，6 条评论，👍 3）
   全屏模式的固定输入框备受好评，但滚轮滚动相比常规模式退化约 3 倍。这表明尽管 UX 仍有粗糙之处，全屏模式已获得实际采用。

5. **[#8760 — OpenRouter `:free` 模型因 Pi 发送超过提供商上限的 `max_tokens` 而返回 400](https://github.com/earendil-works/pi/issues/8760)**（OPEN，5 条评论）
   多个 OpenRouter `:free` 模型被阻断，因为 Pi 直接转发目录中的 `maxOutputTokens` 值，超过了上游提供商上限。是一个边界清晰的狭义缺陷，修复可能非常简单。

6. **[#8643 — Bedrock：OpenAI 模型拒绝 `toolResult.content` 中嵌套的图片](https://github.com/earendil-works/pi/issues/8643)**（OPEN，5 条评论，👍 1）
   作者已在 fork 上准备好了修复与回归测试（此前因贡献流程被阻塞）。凸显出 Bedrock 相比 OpenAI 一方服务对 tool-result 形态的要求更严格。

7. **[#9230 — OpenCode Go 提供商未发送必需的 `x-opencode-session` 请求头](https://github.com/earendil-works/pi/issues/9230)**（CLOSED，3 条评论，👍 1）
   OpenCode Go 于 2026-09-06 开始要求每个对话具备一个稳定的会话 ID。这触发了围绕 #9237 与 #9290 的问题簇，涉及到 `pi-opencode-bridge` npm 包以及 `modelRegistry.complete()` 扩展路径。

8. **[#8826 — 为长时间瞬时故障设定 agent 重试退避上限](https://github.com/earendil-works/pi/issues/8826)**（OPEN，4 条评论）
   在长时间上游故障期间（如 `503 upstream call failed: Connect: Too many open files`），无界的指数退避使 Pi 实质上处于空闲状态。提议：设定一个可配置上限，使重试稳定在一个有界间隔内。

9. **[#7739 — 设定启动时间预算，目标对齐 jcode 同等量级的延迟与内存](https://github.com/earendil-works/pi/issues/7739)**（OPEN，3 条评论）
   目标对标 jcode README 中对 Pi 0.62.0 测得的中位 PTY 启动延迟与 RSS 差距。建立一份回归级别的性能预算。

10. **[#9016 — 为内置 `llama.cpp` 提供商启用 `reasoning_effort`](https://github.com/earendil-works/pi/issues/9016)**（OPEN，2 条评论）
    `llama.cpp` 已于 2026 年 7 月通过其 OpenAI 兼容 API 引入 `reasoning_effort`（PR #26045）；而 Pi 的提供商创建时间早于该特性落地。是一项范围明确的小特性请求。

## 关键 PR 进展

1. **[#9117 — 以系统消息 delta 的形式下发 prompt 与工具变更](https://github.com/earendil-works/pi/pull/9117)**（OPEN）
   #8998 拆分的第二层。将编码代理的 prompt/工具加载变更改为通过系统消息 delta 进行，而不是重写顶层 system prompt——跨轮次的上下文缓存局部性更佳。

2. **[#9116 — 添加对话中间系统消息](https://github.com/earendil-works/pi/pull/9116)**（OPEN）
   上述 PR 的基础：在 pi-ai 中加入新角色并贯穿 pi-agent-core，使编码代理集成可以干净落地而不引入破坏。

3. **[#9280 — 增加基于实现的文档评估](https://github.com/earendil-works/pi/pull/9280)**（OPEN）
   对 `docs/index.md` 收录的每个 Markdown 页面生成一份实现审计，确定性校验目录覆盖率，并通过一个可终止的自定义工具捕获经 schema 校验的判定结论。向文档/代码漂移检测迈出了实质性一步。

4. **[#9253 — 将 Copilot GPT 模型路由到 Responses（修复 astra）](https://github.com/earendil-works/pi/pull/9253)**（CLOSED）
   解决 #9209：内置 Copilot 模型现已统一走 Responses 端点。注释指出此次改动是安全的，因为 Copilot 目录在相关位置已不再列出 gpt-4 类模型。

5. **[#9272 — 允许扩展从自定义提供商流式输出](https://github.com/earendil-works/pi/pull/9272)**（CLOSED，修复 #8964）
   在 `complete(...)` 之外暴露 `stream(...)` 与 `streamSimple(...)`，弥合了长期存在的 API 不对称，便利扩展作者。

6. **[#9269 — agentLoop 在循环拒绝时以错误结果结束流](https://github.com/earendil-works/pi/pull/9269)**（CLOSED）
   `agentLoop()`/`agentLoopContinue()` 此前以 `void runAgentLoop(...).then(...)` 启动循环且未挂载拒绝处理器——来自 `streamFn`、OAuth 刷新失败或上下文转换的未处理拒绝会被静默丢弃。现已正确以 `stopReason: "error"` 将其抛出。

7. **[#9270 — 阻止 `wordWrapLine` 在不可分割的宽字素上无限递归](https://github.com/earendil-works/pi/pull/9270)**（CLOSED）
   单个宽度为 2 的宽原子字素（如 CJK/emoji）配合 `maxWidth: 1` 会导致无界递归。修复干净，并附带回归测试。

8. **[#9155 — 在树形导航期间拒绝 prompt](https://github.com/earendil-works/pi/pull/9155)**（OPEN，进行中）
   在活跃的树形导航期间，对直接的 `AgentSession.prompt()` 调用显式拒绝，镜像 TUI 中已有的 `isCompacting` 守卫。

9. **[#9179 — 在压缩期间拒绝树形导航](https://github.com/earendil-works/pi/pull/9179)**（CLOSED，进行中）
   对应的竞态防护：在压缩进行时拒绝树形导航，并将压缩摘要保留在准备该摘要的分支上。

10. **[#9259 — 通过中断当前轮次及时应用 steering 消息](https://github.com/earendil-works/pi/pull/9259)**（CLOSED）
    此前 steering 消息被排队、只在进行中的轮次结束后才被应用——在长工具调用期间体验很差。此 PR 通过中断当前轮次来及时下发 steering。

## 特性请求趋势

- **对话中间系统消息**：#9116/#9117 组合将该机制确立为 prompt/工具 delta、扩展注入提醒与 steering 的新基础设施——预计扩展作者会开始依赖它。
- **`reasoning_effort` 的提供商对齐**：llama.cpp（#9016）加入需要按请求 reasoning 旋钮的提供商行列；该趋势表明统一的提供商级旋钮已属当务之急。
- **路由器的多模型定价**（#9291）：随着路由服务（成本/延迟优化）的增多，用户希望在单一已配置模型上拥有按模型的 `cost` 条目。
- **可配置的启动显示区块**（#9289）：拥有大型模型注册表的高阶用户希望对启动页所呈现的内容进行细粒度控制。
- **更佳的 Windows DX**（#7547）：对一等的 Windows 原生支持以及对受支持运行模式的更清晰文档持续存在需求。
- **设备码 UX**（#9282）：允许提供商在尽力而为的前提下自动打开验证页并复制用户代码。

## 开发者痛点

- **提供商集成漂移**：OpenCode Go 新的会话头要求（#9230/#9237/#9290）以及 Copilot 仅支持 Responses 的 `gpt-6-astra`（#9209/#9277）在 24 小时内接连落地——提供商收紧 API 合约的速度已超过 Pi 提供商注册表的吸收能力。
- **`max_tokens`/`maxOutputTokens` 不匹配**（#8760）：目录值被原样转发，超过了真实提供商上限，`:free` 层级尤其突出。
- **流取消不可靠**（#8823、#4945）：Esc 经常并不能真正取消在飞请求，导致用户在故障期间反复按键。
- **TUI 图片渲染回归**（#9052、#9169、#9256、#9268）：全屏滚动速度、全屏图片渲染、恢复会话的图片重新渲染、空 alt Markdown 图片全部处于 open 状态——TUI 中的图片处理像是一块补丁拼凑的区域。
- **Agent 会话生命周期**（#5886、#9269、#9155、#9179）：多处缺陷集中在续接、结算与并发状态变更上；最近的 PR 表明这是一个活跃的清理区域。
- **流式性能**（#9063）：三个适配器在每个 delta 上重新解析整个累积的 tool-call 参数——长工具输出下呈 O(n²)。
- **面向嵌入的 SDK 体验**（#9286）：`import 'pi'` 仍会执行 CLI `main`，且 esbuild 原生二进制对仅调用 `createAgentSession` / `@earendil-works/chord/context` 的用户来说也是一次硬性安装。
- **跨仓库引用腐烂**（#9278，已关闭）：对 `earendil-works/pi-mono` 的长期引用需要一次全局扫描式重写为 `earendil-works/pi`。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区简报 — 2026-09-08

## 今日要点

0.23 版本线持续演进，带来了全新的预览版(`v0.23.1-preview.2`)和 nightly 版(`v0.23.0-nightly.20260906.92a8a8d179`),二者均围绕 Web Shell 全新的动态工作流可视化以及派生的会话工作流投影展开。并行发布的 `cua-driver-rs v0.20.4` 为 macOS、Linux 和 Windows 提供了已签名/通用架构的 CUA 驱动二进制文件。在 bug 方面，有两个 P1 问题值得关注：一个是守护进程会话卡死并静默丢弃后台 shell 输出(#11119);另一个是 VS Code Companion 中仅影响 Windows 的 ConPTY 进程泄漏，半天之内内存可膨胀至约 2.8 GB(#11303)。

## 版本发布

- **[v0.23.1-preview.2](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.1-preview.2)** — 为 Web Shell 中动态工作流的运行新增可视化与管理能力(#10594),并派生会话工作流投影。
- **[v0.23.0-nightly.20260906.92a8a8d179](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.0-nightly.20260906.92a8a8d179)** — 同样的 Web Shell 工作流改进，同步到 nightly 版本线。
- **[cua-driver-rs v0.20.4](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.4)** — 内置(vendored)的 CUA 驱动预编译产物：macOS 通用架构(已代码签名 + 已公证的 `.app`)、Linux x86_64/arm64(glibc 2.31+)、Windows x86_64/arm64(UIAccess worker + 原生 SDK)。

## 热门 Issue

1. **[#8662 — Migrate TUI from ink to OpenTUI (tracking)](https://github.com/QwenLM/qwen-code/issues/8662)**(31 条评论,P3,OPEN)— 长期跟进的迁移跟踪 issue,目标是脱离被大量打补丁的 `ink 7 + React 19` 渲染器；结构性闪烁、resize 和焦点 bug 让 ink 实际上已走入死胡同。社区明确希望优先推进这次迁移。
2. **[#44 — 百炼收费陷阱](https://github.com/QwenLM/qwen-code/issues/44)**(20 条评论，CLOSED)— 关于百炼按次计费的高热度用户投诉。反馈后已关闭，但折射出持续存在的费用透明度顾虑。
3. **[#11119 — Background shell output silently dropped when session runtime recycles](https://github.com/QwenLM/qwen-code/issues/11119)**(8 条评论，P1,OPEN)— 由守护进程承载的 `qwen serve` Web Shell 在一轮对话结束后丢失后台 shell 输出与唤醒通知；会话随之不可恢复地卡死。对任何长期运行的 CI/自动化用例都至关重要。
4. **[#11303 — Windows qwen-cli leaks 347 headless conhost.exe processes](https://github.com/QwenLM/qwen-code/issues/11303)**(6 条评论，P1,OPEN)— VS Code Companion 的 ConPTY 进程泄漏在 12 小时后占用约 2.8 GB 内存。对 Windows 高级用户影响很大。
5. **[#10530 — "400 Failed to initialize samplers" in 0.22.3](https://github.com/QwenLM/qwen-code/issues/10530)**(6 条评论，P2,OPEN)— 0.22.3 引入的回归导致 llama-server 搭配 Qwen 3.x 27b/35b 模型时出错；与 #10435 为同类伴随问题。本地推理用户被卡住。
6. **[#3361 — Agent misinterprets shell output as empty](https://github.com/QwenLM/qwen-code/issues/3361)**(6 条评论，OPEN)— 存在已久(2026 年 4 月)的 OpenAI 兼容 API bug,成功执行的命令被当作空输出。影响 Agent 可靠性。
7. **[#8586 — Track activeWork and background Agent recovery](https://github.com/QwenLM/qwen-code/issues/8586)**(9 条评论，P2,OPEN)— 功能请求：在守护进程健康状态中暴露 `activeWork`,并为存活时间超过其前台提示词的后台 Agent 构建完善的恢复路径。
8. **[#10865 — Session workflow projection derived 3× per render](https://github.com/QwenLM/qwen-code/issues/10865)**(5 条评论，P2,OPEN)— #8583 的后续问题；新 Web Shell 驾驶舱中的性能 bug。症结在于：该投影本应只构建一次，却在每次渲染时被反复重建。
9. **[#10684 — First-class self-hosted semantic memory](https://github.com/QwenLM/qwen-code/issues/10684)**(4 条评论，P3,OPEN)— 诉求是提供内置的 memory MCP 服务器模板，或在 auto-memory 中实现基于 embedding 的召回。这释放出强烈信号：用户需要语义(而非仅关键词)召回。
10. **[#11272 — Cancelling a long-running stdio MCP call kills the server permanently](https://github.com/QwenLM/qwen-code/issues/11272)**(3 条评论，P2,OPEN)— 来自钉钉 Channel 部署的报告；在 Channel 模式下，卡片取消后 MCP 服务器再也无法恢复。对渠道集成方而言是生产级关切。

## 重点 PR 进展

1. **[#11314 — feat(serve): `--api-profile` + OpenAPI contract for REST integrators](https://github.com/QwenLM/qwen-code/pull/11314)** — 新增 `--api-profile` 标志和稳定的 OpenAPI 接口面，让外部团队无需 Web Shell 即可通过 HTTP 基于 Qwen Code 进行构建。
2. **[#10942 — feat(cli): list managed Agent View sessions in `qwen sessions ps`](https://github.com/QwenLM/qwen-code/pull/10942)** — 在 CLI 中与现有交互式会话并列展示更丰富的 Agent View 生命周期状态。
3. **[#11308 — fix(channels): restore worktree-task routes through managed load path](https://github.com/QwenLM/qwen-code/pull/11308)** — 渠道 worker 的冷启动会话恢复现在通过 workspace-root + 守护进程 worktree attestation 重新挂接 worktree-task 路由，而非走通用路径。
4. **[#9466 — refactor: anchor rewind mapping to stable prompt identity](https://github.com/QwenLM/qwen-code/pull/9466)** — Rewind 依据持久化的 prompt identity 解析目标，即使 resume/headless/session 链条对轮次重新编号也能正常工作。
5. **[#11086 — feat(serve): scope extensions to workspace runtimes](https://github.com/QwenLM/qwen-code/pull/11086)** — 全局扩展目录现在可通过各工作区所选运行时使用；同时更新了 composer 添加菜单与 `@` 提及。
6. **[#11083 — fix(serve): read channel settings from user scope when workspace is home](https://github.com/QwenLM/qwen-code/pull/11083)** — 修复 `qwen serve` 绑定到 `$HOME` 时渠道配置不可见的问题；读写统一解析到同一个设置作用域。
7. **[#11305 — feat(goal): size checkpoint verifier timeout to claim list + operator setting](https://github.com/QwenLM/qwen-code/pull/11305)** — 将 verifier 超时上限从 30 s 提升至 180 s,并新增 `model.goalCheckpointTimeoutSeconds` 配置项。
8. **[#11304 — fix(goal): count a checkpoint the verifier never answers as a stall](https://github.com/QwenLM/qwen-code/pull/11304)** — 溢出的 evidence 窗口现在也计入 stall 上限，而不再只计入 max-claim verifier。
9. **[#11277 — feat(ipc): meter inbound peer messages, drop with a `dropped` outcome](https://github.com/QwenLM/qwen-code/pull/11277)** — 新增第四种 IPC 结果，并加上按发送者与全局两级的速率闸门；发送者仅收到一次通知。
10. **[#10449 — perf(dev): opt-in pnpm worktree bootstrap foundation](https://github.com/QwenLM/qwen-code/pull/10449)** — 为额外的 worktree 提供冻结(frozen)的 pnpm 依赖引导，同时完整保留所有 npm 构建/CI/发布路径。

(其他值得关注的 PR:[#11070](https://github.com/QwenLM/qwen-code/pull/11070) 在冷恢复时保留 ACP 审批模式;[#11309](https://github.com/QwenLM/qwen-code/pull/11309) 在删除会话时回收其拥有的 worktree;[#11169](https://github.com/QwenLM/qwen-code/pull/11169) 弥合 local-files 桥接中的信任门/旁观者缺口;[#10347](https://github.com/QwenLM/qwen-code/pull/10347) 在渠道流程中对瞬时的网络 EOF 错误自动重试。)

## 功能请求趋势

- **语义化、结构化记忆** — 社区强烈希望超越基于关键词的 `MEMORY.md` 索引，转向基于 embedding 的召回，可配套内置 MCP 服务器模板或一等公民的 embedding 钩子(#10684)。
- **稳定的 HTTP/REST 接口面** — 外部集成方希望获得有文档、稳定的 OpenAPI 契约和 profile 标志，而不必去爬约 110 个路由(#11314)。
- **更完善的费用/会话透明度** — 支持 `${session_id}` 模板的 `customHeaders`(#10995)、将 `/effort` 正确传播到 OpenAI 兼容后端(#11227),以及更清晰的百炼/按次计费上下文(#44),共同指向同一主题：用户希望自己的 model-router 状态端到端可见、可配置。
- **会话导航与恢复** — Codex 式的会话级轮次导航(#10750,刚关闭)以及显式的 `activeWork`/后台 Agent 恢复(#8586)表明，用户期望长期运行的会话表现得像持久的工作区，而不是一次性的提示词。
- **Worktree 升级为一等公民** — 通过托管加载路径恢复(#11308)、删除会话时回收 worktree(#11309)、pnpm worktree 引导(#10449),都表明 worktree 正在成为会话身份的核心单元，而非附属功能。

## 开发者痛点

- **本地推理回归** — 两份几乎重复的报告(#10530、#10435)显示，0.22.3 引入的 `400 Failed to initialize samplers: failed to parse grammar` 阻塞了 llama-server 用户；其他推理框架不受影响，说明这是 Qwen Code 特有的语法/模板回归。
- **TUI 底层腐化** — OpenTUI 迁移跟踪 issue(#8662)已有 31 条评论，社区共识是打过补丁的 `ink` 层已无法就地修复；"OpenTUI renderer (bun)" E2E 分片的 CI 失败(#11219、#11210、#11203、#11197、#11183)说明这次迁移绝非易事。
- **守护进程会话可靠性** — 后台 shell 输出被静默丢弃(#11119)、运行 cron/goal/monitor 任务却无法回收的会话(#11118,已关闭)、Channel 模式下 MCP 服务器被取消杀掉且永不恢复(#11272),以及 workspace == $HOME 时的所有权缺口(#11186),共同构成一个问题簇："守护进程的会话生命周期尚未完全自洽"。
- **Windows 特有痛点** — VS Code Companion 的 ConPTY 进程泄漏(#11303)十分严重，而 Windows CI 脆弱到需要"分片死亡后重试"的权宜之计(#11134)。
- **Agent 对 shell 输出的判读正确性** — 把成功的 shell 输出误判为空(#3361)在各类 OpenAI 兼容后端上反复出现，正在侵蚀用户对 agentic 操作的信任。
- **CI / E2E 偶发失败** — 一摞自动生成的 "Main CI failed on commit …" issue(#11307、#11040、#11249、#11231、#11219、#11210、#11203、#11197、#11183)——其中几个很快被关闭——表明自动修复流水线在运转，但底层测试分片仍存在竞态或不稳定，尤其是 OpenTUI renderer 与 macOS shard 2/2 附近。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*