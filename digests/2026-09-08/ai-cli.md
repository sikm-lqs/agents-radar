# AI CLI 工具社区动态日报 2026-09-08

> 生成时间: 2026-09-07 23:30 UTC | 覆盖工具: 7 个

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

# 跨工具对比报告 —— AI CLI 生态系统,2026-09-08

## 1. 生态系统概览

AI 编程 Agent CLI 市场已围绕两种原型形成格局：供应商绑定的旗舰工具(Claude Code、Codex、Gemini CLI、Copilot CLI),通过订阅与自家模型变现；以及供应商无关的挑战者(OpenCode、Pi、Qwen Code),以开放性、本地推理与多供应商路由为竞争点。在全部七个项目中,工程前沿已从"Agent 能否写代码"转向"Agent 的 *会话* 能否存活"——持久化、恢复、撤销与留存主导着每条追踪线。互操作标准(ACP 用于 Agent 间通信,MCP 用于工具调用)正成为生态系统的连接组织,Qwen 已通过 ACP 将子 Agent 轮次委派给 Claude Code。与此同时,共同的成长痛点——Windows 作为二等平台、配额/计费不透明、资源管控失守(20 GB 的发布包、OOM、futex 风暴)——依然是全行业未解的难题。

## 2. 活跃度对比

*计数反映今日摘要(热点议题 / 重点 PR 列表)中浮现的项目,并非仓库全部活动。讨论数在信息流未提供数据时标注 N/A——部分仓库将社区流量路由至 Issues。*

| 工具 | Issues(已追踪) | PRs(已追踪) | Discussions | 发布状态 |
|---|---|---|---|---|
| Claude Code | 10 | 2 | N/A(未在信息流中) | 过去 24h 无 |
| OpenAI Codex | 12(10 + 2 已追踪) | 16(10 + 6 部分 Guardian 重构) | 8(3 个 ideas、1 个 official、4 个 show-and-tell) | ✅ rust-v0.154.0-alpha.6 |
| Gemini CLI | 10 | 10 | N/A(未在信息流中) | ✅ v0.60.0-nightly.20260907 |
| Copilot CLI | 21(10 + 11 notable) | 2 | N/A(未在信息流中) | 无(1.0.83/1.1.15 回归问题活跃中) |
| OpenCode | 10 | 10 | N/A(未在信息流中) | 无 |
| Pi | 10 | 10 | N/A(未在信息流中) | 无 |
| Qwen Code | 10 | 12 | N/A(未在信息流中) | ✅✅ 3 个(preview.2、nightly、cua-driver-rs v0.20.4) |

**值得注意:** Codex 展现出最高的工程吞吐;Qwen 发版最多;Copilot CLI 议题涌入量最高,但几乎无外部 PR 活动——这是封闭式快速发版更迭的典型特征。

## 3. 共同特性方向

- **会话持久化与恢复**——*全部七个工具*。Claude Code 会话记录删除(#59248/#62476)、Copilot CLI 永久卡死会话(#4755)与工作区锁(#4742/#4756)、OpenCode 重启后残留的 `busy` 锁(#43277)、Qwen 守护进程 reclaim/busy-idle 协调(#8586、#11118、#11119、#11070)、Gemini 未持久化的 `/compress`(#21335)、Pi 结算/续接 Bug(#5886)、Codex 中途打断的空白期(#4945 类似需求)。
- **撤销 / 回滚 / 变更安全**——Codex 社区呼声最高的诉求(#9618,119 👍)明确指出 Claude Code 与 OpenCode 已具备该能力;OpenCode 正在积极加固快照回滚(#47861)。这是入门级标配功能,但存在明显落后者。
- **经由 ACP 的多 Agent 编排**——Qwen 通过 ACP 将子 Agent 轮次委派给外部 Agent(#11003),并在产品内构建 Agent 网格(#11206);Copilot CLI 存在 ACP 契约违规(#4743);OpenCode 输出 ACP 计划更新(#41132);Codex 用户请求跨 Agent 意图映射(#36719);Claude Code 暴露 `ListAgents`/`SendMessage` 缺口(#84894)。
- **持久化记忆系统**——Claude Code MEMORY.md 阈值控制(#91188)、Gemini Auto Memory 在上下文前重写与重试循环(#26522–#26525)、Qwen 面向本地主机的语义记忆 MCP(#10684),以及 Codex 社区工具(Blume.codes)将会话历史转换为规则。
- **多供应商路由与 BYO/本地推理**——Pi 整日的主题(Copilot GPT-6 Astra 路由 #9253、Fable 5 回退 #9297、OpenRouter 免费层上限 #8760、Bedrock 图像嵌套 #8643);OpenCode 供应商中断(Mistral GLM-5.2 #43199、Bedrock #40663)以及对 OpenAI 兼容端点的诉求(#31724);Qwen llama-server 语法回归(#10530);Claude Code `ANTHROPIC_BASE_URL` 网关支持(#84852)。
- **配额/计费透明度**——Codex 配额可见但仍报容量错误(#43337)催生了第三方仪表板(CodexFuse);Claude 极速模式被排除在 Max 套餐之外(#83302);OpenCode Go 套餐 Zen 余额回退失败(#42938);Qwen Bailian 计费投诉(#44)。

## 4. 差异化分析

**供应商旗舰:**
- **Claude Code**——聚焦企业托管桌面(MSIX、apps 网关、IT 策略密钥 #83723)与订阅体验。闭源核心(2 个 PR,其中一项为新奇特性)。当前危机是 *信任*:静默的 30 天会话记录删除且无退出选项,这是数据治理层面的责任风险,而不只是 Bug。
- **Codex**——覆盖面最广(TUI + 桌面 + iOS 远程 + WebRTC 语音 #43581),内部架构工作也最深(6 个 PR 的 Guardian 上下文注册表整合、用户验证 Provider 栈)。也是唯一在交付新奇 UX(Pets)却产生净负面信号(#41513、#34349)的项目。
- **Gemini CLI**——最注重安全:沙箱文件系统加固、主机凭据隔离(#29214/#29216)、EOL 运行时升级。针对 36.6k token/轮基线,押注 AST 感知、token 节流的工具化方向(#22745)。
- **Copilot CLI**——聚焦协议合规(MCP OAuth/取消/User-Agent #4759/#4681/#4017;ACP)与企业级默认失败关闭的策略姿态(#4757)。差异化体现在回归速度:1.0.83 集群(stdio 超时 #4753、Azure MCP #4749、TUI CPU #4750)正迫使自动化工作流用户回退到 1.0.82。

**开源挑战者:**
- **OpenCode**——定位为供应商无关的中枢;呼声最高的需求是 IDE 集成(#11176,147 👍)与 BYOK 暴露(#27303)。架构上正趋向 CLI/TUI/Web 会话统一。
- **Pi**——面向高阶用户/扩展作者:对话中系统消息重构(#9116/#9117)、扩展流式 API(#9272)、无头 SDK 性能预算(O(n²) 修复、grep OOM #9276)。Provider 目录修正闭环最快。
- **Qwen Code**——路线图最为激进:Web Shell 作为完整工作 IDE(预览、分割视图、git 管理)、多 Agent 网格、跨工具 ACP 委派、本地推理,以及中国本地化场景(钉钉渠道、Bailian)。正经历一次结构性的渲染层迁移(ink→OpenTUI,#8662),目前对 CI 造成压力。

## 5. 社区势能与成熟度

- **最高发版速度:** Codex(16 个 PR + alpha + 8 条讨论)与 Qwen(12 个 PR、3 个发版)迭代最快;Gemini 与 Pi 展现稳定、良好分类的产出(P1/P2 标签;实名维护者)。
- **最高互动信号:** OpenCode #11176(147 👍)、Codex #9618(119 👍)、Pi #4945(77 条评论)、Qwen #8662(32 条评论)、Claude #59248(41 条评论)——是深入且持续的讨论,而非路过 +1。
- **采用成熟度标志:** Claude Code 与 Codex 的议题队列由计费、企业部署与留存策略主导——这是主流、付费、组织规模使用的症状。Gemini(0.60 前)与 Copilot CLI(1.x 回归更迭)处于硬化期;OpenCode 与 Pi 是社区主导、架构驱动的项目;Qwen 是最具实验性的,正在执行一次重大的渲染层迁移。
- **风险模式:** Copilot CLI 高议题涌入、近乎零的外部贡献、版本被钉死的用户群,这三者叠加表明发版节奏跑赢了 QA。Claude Code 低 PR 吞吐搭配高议题互动在闭源核心语境下尚属预期,但未解决的数据丢失群组正在侵蚀口碑(一日内 32 👍)。

## 6. 趋势信号

1. **会话正在成为有状态基础设施。** 每个工具最严重的 Bug 都是生命周期 Bug(卡死、僵死、删除、不可恢复)。持久化、恢复与 *撤销* 是新的基线;Codex 那条 119 👍 的回滚讨论表明用户已将其视为理所当然。
2. **围绕 Agent 的验证/审计工具市场正在形成。** DoneAudit(声明验证)、deja-vu(跨 Agent 回溯)、Blume.codes(漂移对策)、CodexFuse(配额仪表板)在一次信息流中同时涌现——第三方正在围绕信任缺口变现。
3. **ACP 与 MCP 是互操作接缝——也是风险面。** 跨 Agent 委派(Qwen→Claude Code)已上线,但协议合规缺口(Copilot 缺失 MCP 取消、ACP `end_turn` 顺序)会导致集成失败。请像对待 API 契约一样对待 Agent 互操作契约。
4. **供应商无关路由是开源工具的持久护城河。** 本地推理需求(llama-server、BYOK、OpenAI 兼容端点)持续增长,而托管方计费不透明(今日共四项独立计费投诉)则驱动用户流失。
5. **Windows 在所有工具中仍被忽视**——死锁、进程泄漏(Qwen 的 347 个 conhost 子进程 / 2.8 GB)、安装损坏、代码完整性拦截横跨七个工具中的五个。这是一个有意义的差异化机会。
6. **Agent 资源管控已成生产级关切**——20 GB 的发布包(Codex #37346)、grep OOM(Pi #9276)、每秒 118 万次 futex 调用(Codex #43170)、空闲 CPU 燃烧(Copilot #4750)。

**给技术决策者的建议:** 在回归窗口期内钉死版本(Copilot 1.0.83),将会话记录/记忆视为数据治理面(Claude 的留存行为),在撤销功能普及前勤于提交,并优先采用符合 MCP/ACP 规范的工具——下一季度的故障与机会将集中在生态系统的兼容性接缝处。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告
**报告周期截至 2026-09-08 | 数据来源：github.com/anthropics/skills**

*注：数据集中未提供 PR 评论数，因此下方 PR 排名基于内容重要性、影响广度以及更新时效综合评定。Issue 评论数来自真实数据，直接采用。*

---

## 1. 热门 Skills 排名

依据影响范围、技术深度与数据窗口内的互动信号综合排序：

**① skill-creator: fix run_eval.py — #1298** — [OPEN](https://github.com/anthropics/skills/pull/1298)
关键基础设施修复：`run_eval.py` 对所有 skill 都返回 `recall=0%`，导致描述优化循环彻底失效（10+ 次复现，详见 #556）。该 PR 同时修复了 Windows 子进程流式输出与并行 worker 的 bug。**影响：** 解锁整个 skill 质量工具链。

**② document-typography — #514** — [OPEN](https://github.com/anthropics/skills/pull/514)
全新 skill，用于预防 AI 生成文档中的排版缺陷（孤立词、孤行、编号错位等）。定位为通用型 —— "影响 Claude 生成的每一份文档"。

**③ Improve frontend-design — #210** — [OPEN](https://github.com/anthropics/skills/pull/210)
对已有热门 skill 的改版，使指令在单次会话内即可具体落地。讨论周期长（最后更新于 2026-03-07），反映出持续迭代的压力。

**④ skill-quality-analyzer & skill-security-analyzer — #83** — [OPEN](https://github.com/anthropics/skills/pull/83)
两个元 skill：五维质量分析器与安全分析器。亮点在于它们对 skill 生态自身进行反思 —— 与 #492 中提出的信任边界关切直接相关。

**⑤ Hivemind — Multi-Agent Orchestration — #1628** — [OPEN](https://github.com/anthropics/skills/pull/1628)
将机械性工作委托给通过 opencode 调度的无头 worker，由 Claude Code 负责规划与评审。创新性模式，直面"昂贵模型上下文稀缺"这一核心矛盾。

**⑥ self-audit (v1.3.0) — #1367** — [OPEN](https://github.com/anthropics/skills/pull/1367)
交付前验证 skill：先进行机械式文件检查，再按"损坏严重度"顺序做四维推理审计。跨技术栈、跨模型通用 —— 与 Issue #1385 提出的"质量门控流水线"提案高度契合。

**⑦ ODT skill — #486** — [OPEN](https://github.com/anthropics/skills/pull/486)
填补 OpenDocument 空白：支持 .odt/.ods 文件的创建、填充、读取与转换。对 ISO 及开源文档工作流意义重大。

**⑧ testing-patterns — #723** — [OPEN](https://github.com/anthropics/skills/pull/723)
综合性测试 skill，覆盖 Testing Trophy、AAA 模式、React Testing Library 等。强烈的开发者工作流信号。

**特别提及：** [scnet-hpc #1615](https://github.com/anthropics/skills/pull/1615)（HPC 领域）、[buffer-api #1627](https://github.com/anthropics/skills/pull/1627)（agent 可移植的社交排程）、[web-artifacts-builder 修复 #1362](https://github.com/anthropics/skills/issues/1362)（pnpm ≥10 兼容性）。

---

## 2. 社区需求趋势（基于 Issues）

| 需求信号 | Issue | 评论数 | 👍 | 洞察 |
|---|---|---|---|---|
| **信任与真实性** | [#492](https://github.com/anthropics/skills/issues/492) | **43** | 2 | **讨论量最高的 Issue。** 以 `anthropic/` 命名空间分发的社区 skill 仿冒官方 skill，导致用户误授予高权限。强烈呼吁建立可验证的 skill 来源与签名机制。 |
| **企业级分发** | [#228](https://github.com/anthropics/skills/issues/228) | 16 | **8** | 在 Claude.ai 中实现组织级 skill 共享 —— 告别 Slack 传 `.skill` 文件的时代。👍 数最高；企业接入是当前瓶颈。 |
| **Eval / skill-creator 可靠性** | [#556](https://github.com/anthropics/skills/issues/556) | 12 | 7 | `claude -p` 始终无法触发 skill —— 评测框架存在缺陷。与 PR #1298 高度相关。 |
| **Skill 持久化 / UX** | [#62](https://github.com/anthropics/skills/issues/62) | 10 | 2 | 用户自定义 skill 在文件重命名后消失 —— 生命周期 UX 脆弱。 |
| **紧凑记忆 / 上下文效率** | [#1329](https://github.com/anthropics/skills/issues/1329) | 9 | 0 | 提议用符号化记法压缩 agent 状态、释放上下文。与 #1487 一致。 |
| **插件重复打包** | [#189](https://github.com/anthropics/skills/issues/189) | 6 | **9** | `document-skills` 与 `example-skills` 内容重复 —— 造成上下文重复注入。**中等量级中 👍 数最高。** |
| **上下文窗口爆炸** | [#1487](https://github.com/anthropics/skills/issues/1487) | 4 | 0 | `claude-api` skill 在单次工具调用中贪婪注入约 156k token。 |
| **MCP 评分正确性** | [#1390](https://github.com/anthropics/skills/issues/1390) | 4 | 0 | `mcp-builder/evaluation.py` 因吞掉 TextContent 序列化 bug，在真实 MCP 服务器上评分为 0/N。 |
| **推理质量门控** | [#1385](https://github.com/anthropics/skills/issues/1385) | 4 | 1 | 任务前校准 → 对抗性评审 → 交付验证的流水线。 |
| **Skills-as-MCPs** | [#16](https://github.com/anthropics/skills/issues/16) | 4 | 0 | 将 skill 行为打包为类型化的 MCP 接口，便于与其他 agent 互操作。 |

**反复出现的需求主线：**
- **信任与来源**（43 条评论）—— 远高于其他信号。
- **分发 UX**（组织共享、插件打包）。
- **评测正确性**（run_eval、mcp-builder eval）—— 评测循环若失效，社区就无法迭代 skill。
- **上下文效率**（紧凑记忆、skill 的懒/急加载）。
- **跨 agent 互操作**（Skills-as-MCPs）。

---

## 3. 高潜力待合并 Skill

尚未合并但与上述需求信号高度契合的活跃 PR：

- **[#1298 — skill-creator run_eval 修复](https://github.com/anthropics/skills/pull/1298)** —— 解锁描述优化；直击 #556 的痛点（12 评论、7 👍）。队列中影响最大的阻塞项。
- **[#1724 — mcp-builder 升级至 claude-sonnet-5](https://github.com/anthropics/skills/pull/1724)** —— 保持评测参考实现为最新；与 #1602 形成互补。
- **[#1628 — Hivemind 多 agent skill](https://github.com/anthropics/skills/pull/1628)** —— 与跨 agent / 编排需求主线吻合。
- **[#1627 — buffer-api agent skill](https://github.com/anthropics/skills/pull/1627)** —— 可移植的 agent 间集成 skill；呼应 #16 中 Skills-as-MCPs 的主题。
- **[#1615 — scnet-hpc](https://github.com/anthropics/skills/pull/1615)** —— 垂直领域的 HPC 工作流；适用于研究集群。
- **[#1367 — self-audit v1.3.0](https://github.com/anthropics/skills/pull/1367)** —— 直接落地 #1385（推理质量门控）提案中的部分流程。
- **[#83 — skill-quality-analyzer / skill-security-analyzer](https://github.com/anthropics/skills/pull/83)** —— 搁置已久的元 skill，能大幅回应 #492 提出的信任边界担忧。
- **[#514 — document-typography](https://github.com/anthropics/skills/pull/514)** —— 填补内容质量空白，影响所有生成文档。

**规律：** 战略价值最高的待合并项并非"全新炫酷 skill"，而是**基础设施与质量控制类 skill**（#1298、#83、#1367、#1724）。新格式 skill（#1615、#1627、#486、#514）构成第二梯队。

---

## 4. Skill 生态洞察

> **社区在 Skills 层面最集中的诉求，是让生态具备自我信任、自我度量、上下文高效的**元 skill —— skill 来源/签名、可工作的评测框架、紧凑记忆、交付前审计流水线，其关注度高于任何单一领域 skill。

---

*基于 anthropics/skills 仓库中 20 条高互动 PR 与 15 条高互动 Issue 整理而成。Issue 评论数来自数据集，可作权威依据；PR 互动度根据内容深度、时效性及与高评论 Issue 的关联性推断得出。*

---

# Claude Code 社区简报 — 2026-09-08

## 1. 今日要点

过去 24 小时没有新版本发布，但社区正在围绕一组影响会话记录和自动记忆(auto-memory)的**静默数据丢失 bug**积极行动。当日获赞最多的开放 issue(#59248,32 👍)记录了一条在毫无预警的情况下销毁对话历史的保留期清理路径，一份密切相关的报告(#62476)则证实了默认 30 天的删除策略。自动记忆的易用性(#91188)以及订阅计费的合理性(#83302,fast mode 的纳入)构成了其余讨论最热烈的话题。

## 2. 版本发布

*过去 24 小时内未发布新版本。*

## 3. 热门 Issue

1. **#59248 — 保留期清理静默删除会话记录，无警告、无 opt-in、无恢复途径**  
   [OPEN,41 条评论，32 👍] — 一位使用 Cursor + Claude Code 2.1.141 的用户在一次后台保留期清扫之后，失去了恢复*所有*既有工作区会话记录的能力。该讨论帖已成为 30 天会话记录删除行为的权威报告。  
   👉 https://github.com/anthropics/claude-code/issues/59248

2. **#91188 — 让 auto-memory 的 MEMORY.md 压缩提醒阈值可配置**  
   [OPEN,35 条评论] — Auto-memory 会硬性加载 MEMORY.md 的前 200 行 / 25 KB,并在接近上限时发出压缩提示。用户希望该阈值(以及提示本身)可以调节。  
   👉 https://github.com/anthropics/claude-code/issues/91188

3. **#62476 — Claude Code 默认在 30 天后静默删除对话记录**  
   [OPEN,25 条评论，24 👍] — 附带明确的版本数据复现了与 #59248 相同的记录丢失路径；实际上构成了这场数据丢失风波的另一极。  
   👉 https://github.com/anthropics/claude-code/issues/62476

4. **#88323 — Claude Desktop(Windows MSIX)自我变砖:vk_swiftshader.dll 被 Code Integrity 拦截**  
   [CLOSED,14 条评论] — 旁加载(side-load)的 Windows MSIX 安装在 Windows Defender Application Control 标记 vk_swiftshader.dll 后即告失败，随后该包显示“Modified”且无法启动。对于企业内通过 MS 分发的部署至关重要。  
   👉 https://github.com/anthropics/claude-code/issues/88323

5. **#67051 — 助手在工具调用之前/之间输出的文本被 CLI 静默丢弃**  
   [CLOSED,7 条评论，7 👍] — 工具调用前的叙述文本对模型和 hooks 可见，却从未在 TUI 中渲染。hook 作者们正在针对用户实际上根本看不到的文本调优行为。  
   👉 https://github.com/anthropics/claude-code/issues/67051

6. **#91712 — Code 标签页的用量环应显示会话上下文，而不只是 5 小时窗口**  
   [OPEN,3 条评论，3 👍] — Claude Desktop 中 Code 标签页底部的上下文计量器与滚动的 5h 配额绑定，掩盖了 1M token 会话窗口已被消耗的量。与 `opus[1m]` 用户直接相关。  
   👉 https://github.com/anthropics/claude-code/issues/91712

7. **#83723 — Apps gateway 桌面 overlay 缺少 `chatTabEnabled` 键，导致受管 Chat 标签页失效**  
   [CLOSED,3 条评论，1 👍] — IT 管理策略可以开关 Cowork 和 Claude Code 标签页，却管不到 Chat;而引入该键又会令 gateway 启动失败。对于以 gateway 为标准化方案的组织来说是一个实打实的阻碍。  
   👉 https://github.com/anthropics/claude-code/issues/83723

8. **#84894 — 会话显示名称未在 ListAgents 中暴露，也不被 SendMessage 接受**  
   [OPEN] — 在 VS Code 扩展中，会话拥有面向用户的显示名称，但编程 API 只接受不透明的 ID,破坏了跨工具自动化。  
   👉 https://github.com/anthropics/claude-code/issues/84894

9. **#83302 — Fast mode 未纳入订阅计划**  
   [OPEN,12 👍] — Max 订阅用户希望至少获得有上限的 fast-mode 配额，让这份主打订阅覆盖他们实际上最常用的功能。  
   👉 https://github.com/anthropics/claude-code/issues/83302

10. **#77973 — 前台→后台切换后，后台 worker 无法读取 Keychain(2.1.211 回归)**  
    [CLOSED] — 将会话转入后台突然失败并提示 "Not logged in · Please run /login",原因是子进程在切换后失去了 Keychain 访问权限。  
    👉 https://github.com/anthropics/claude-code/issues/77973

## 4. 重点 PR 进展

1. **#26175 — fix: 替换损坏的原生安装器 bootstrap 脚本**  
   [CLOSED] — 官方的 `curl … | bash` bootstrap 不仅静默失败、无法创建 `~/.local/bin/claude`,*还*会以"cleanup"之名抹掉用户已有的 npm 全局安装。本 PR 将安装路径替换为可用方案。长期以来“装完什么都没发生”类报告的根源。  
   👉 https://github.com/anthropics/claude-code/pull/26175

2. **#39043 — 从 Frontend Design Skill 中移除“复古未来主义”(retro-futuristic)推荐**  
   [OPEN] — 单行 PR,全部理由只有一句 "Trust me on this one."。如今已成为检验该设计技能编辑品味的社区试金石。  
   👉 https://github.com/anthropics/claude-code/pull/39043

## 5. 热门讨论

*今日数据源未提供讨论数据 — 本节省略。*

## 6. 功能请求趋势

- **记忆的透明度与控制** — 可配置的 MEMORY.md 阈值、可关闭的压缩提示、以及对保留/清理行为的可见性，构成了目前最大的一簇请求(#91188、#59248、#62476)。
- **订阅计划的覆盖面** — 多项请求(#87063、#83302)希望将 fast-mode 额度并入 Max/Max-20 档位，而非单独计费。
- **一等公民的可编程 agent API** — 通过 `ListAgents` / `SendMessage` 暴露会话显示名称(#84894),以及稳定的公开 agent 发现接口。
- **本地 / 自带模型(BYO-model)工作流** — VS Code 扩展遵循 `ANTHROPIC_BASE_URL` + `disableLoginPrompt`(#84852),让团队无需翻越 OAuth 高墙即可对接内部 gateway。
- **受管桌面的完整性** — 为 apps gateway 提供有文档的 `chatTabEnabled` 键，让 IT 策略能够控制全部三个标签页(#83723)。
- **具备上下文感知的配额 UI** — 在底部计量器中区分会话窗口消耗与 5h 滚动配额(#91712)。

## 7. 开发者痛点

- **静默且不可恢复的数据丢失**是主旋律：对话记录默认在 30 天后消失(#59248、#62476),既无警告，也无法 opt-out 或找回。
- **后台 / agent 视图的脆弱性**:`SendMessage(to: "main")` 被丢弃(#76382)、切换后 Keychain 丢失(#77973)、登出状态下 Keychain 失效(#79511)、SSH 失败(#77678)、以及 agent 视图中的 `Ctrl+b` 双事件(#79036),这些都表明新的后台会话架构在 macOS 和 Windows 上还相当脆弱。
- **TUI/hook 契约漂移**：模型输出的文本用户看不到、hook 却看得到(#67051),导致基于 hook 的治理策略作用在用户从未看到过的内容上。
- **记忆与上下文爆炸**：auto-memory 阈值是硬编码的(#91188),大文件上下文累积会触发安全过滤器(#74295)——两者都迫使用户手动绕行。
- **认证与反馈的摩擦**:`/feedback` 返回 403(#84313)让用户无法上报他们正遭遇的安全机制误报(#84821),形成一个反馈闭环，唯一的出路只能是去 tracker 上提 issue。
- **打包与安装可靠性**：原生安装器 bootstrap 会静默失败并卸载 npm 全局安装(#26175),而 Windows MSIX 路径被 Code Integrity 拦成砖(#88323)——两者对全新安装的伤害都甚于升级。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-08

## 📌 今日要点

Codex 在 alpha 渠道发布了 **rust-v0.154.0-alpha.6**，而合并的 PR 流水线显示在三个方向上投入了大量精力：**TUI 语音对话（WebRTC）**、**app-server 守护进程生命周期可配置性**，以及一次大规模的 **Guardian context-registry 重构**。在 issue 跟踪方面，社区关注主要集中在 Windows 桌面端 Pets 变为点击穿透（#41513，28 条评论）、配额充足却报容量错误（#43337），以及 Linux 桌面性能长期存在的问题。

---

## 🚀 发布

- **[rust-v0.154.0-alpha.6](https://github.com/openai/codex/releases/tag/rust-v0.154.0-alpha.6)** — 面向前沿 Rust 渠道的 Alpha 预发布版本；未提供 changelog 正文。伴随的 PR 流（tmux 缩放恢复、语音模式、守护进程更新控制）暗示了此版本线正在落地哪些变更。

---

## 🔥 热门 Issue

1. **[#41513](https://github.com/openai/codex/issues/41513) — Windows Pets 变为点击穿透且无法拖动**（28 ，13 👍）
 今日讨论度最高的 issue。在 Windows 构建版本 `26.825.x` 上，无论是内置（Codey）还是自定义的浮动宠物，都丢失了点击/拖动交互，导致该功能基本不可用。高互动量表明复现范围较广。

2. **[#21653](https://github.com/openai/codex/issues/21653) — TUI 中的多行状态栏支持**（19 ，76 👍）
 一项长期存在的增强请求，今日获得最多 👍。配置多个条目的状态栏会被截断且不换行——对重度 CLI 用户而言是一项生活质量短板，提交数月后仍在持续吸引投票。

3. **[#43337](https://github.com/openai/codex/issues/43337) — 周配额完全可用仍报容量错误**（10 💬）
 ChatGPT Pro 20x 用户在使用 `gpt-6-astra` 和 `gpt-5.6-luna`（`low` 推理档）时遇到账户级别的容量错误，而配额显示可用。自 9 月 7 日起新出现且持续复现——直接阻塞付费层级的工作流。

4. **[#42902](https://github.com/openai/codex/issues/42902) — Computer History 轮询每 10 分钟唤醒 macOS 休眠显示器**（8 💬）
 Computer Use 助手的状态轮询使显示器无法进入休眠——这是一项与电池/隐私相关的回归，且没有面向用户的解决方案。

5. **[#43347](https://github.com/openai/codex/issues/43347) — 关闭最后一个 Browser Use 标签页会导致 Windows 桌面应用崩溃**（4 💬）
 在 `26.901.5280` 和 `26.901.6511` 构建版本上均复现了整应用终止，且经过 Microsoft Store 更新后仍存在。属于数据丢失级别的严重问题。

6. **[#34349](https://github.com/openai/codex/issues/34349) — 需求：完全禁用 Pets 并隐藏菜单项**（4 💬，28 👍）
 强烈认为 Pets 应当可选。结合 #41513/#42857，Pets 本周产生了不成比例的负面信号。

7. **[#43170](https://github.com/openai/codex/issues/43170) — app-server 在 musl `__malloc_lock` 上每秒消耗 118 万次 futex 调用**（3 💬）
 深度技术报告：45 秒内产生 5300 万次 futex 调用，Tokio worker 之间因 musl Linux 构建上的分配器争用导致内核 CPU 占用超过 50%。诊断非常扎实；可能需要调整分配器策略（例如切换 musl 的默认分配器）。

8. **[#37346](https://github.com/openai/codex/issues/37346) — 压缩过程中内联图片失控复制，导致 rollout 文件膨胀至 20+ GB**（3 💬）
 上下文压缩过程中内联图片被重复复制，最终使 rollout 文件膨胀到 20+ GB。长会话存在磁盘耗尽风险。

9. **[#37526](https://github.com/openai/codex/issues/37526) — 出站队列（128 条消息）打满时 app-server 丢弃远程客户端**（3 💬，2 👍)
 回归报告：#18203 的修复遗漏了一条代码路径；0.147+（包括 `main`）中慢速远程控制连接在对话轮次中途仍会被断开。

10. **[#43536](https://github.com/openai/codex/issues/43536) — iOS Remote：主机列出任务但消息加载失败**（2 ）
 iOS Remote 客户端（`1.2026.237`）对接桌面端 `26.901.51231` 时出现的新故障——与 #37526 一同勾勒出脆弱的远程控制现状。

*值得关注：* [#43041](https://github.com/openai/codex/issues/43041)（在显式授权部署后疑似对 Astra 出现误安全暂停）以及 [#42804](https://github.com/openai/codex/issues/42804)（Linux 普通聊天推理卡在 "Instant"）。

---

## 🔧 关键 PR 进展

1. **[#43581](https://github.com/openai/codex/pull/43581) — TUI 中的实时 WebRTC 语音对话**
 通过特性开关提供 `/voice`、`/voice mute`、`/voice stop` 命令，支持本地 WebRTC 音频、app-server 信令、实时转写以及麦克风/扬声器电平指示。今日最亮眼的功能 PR。

2. **[#43562](https://github.com/openai/codex/pull/43562) — 显式的 `app-server daemon update` 命令**
 即便禁用了自动更新，也可按需检查最新稳定版本，并回报 `updated`/`noUpdate` 结果。

3. **[#43542](https://github.com/openai/codex/pull/43542) — 可配置的守护进程自动更新**
 新增 `updater.autoUpdateEnabled` 和 `updater.updateIntervalMinutes` 设置，取代原先固定的每小时节奏。

4. **[#43572](https://github.com/openai/codex/pull/43572) — 可配置的 app-server 关闭宽限期**
 守护进程设置中的 `shutdownGraceSeconds` 取代了原先硬编码的 60 秒强制终止窗口。

5. **[#43547](https://github.com/openai/codex/pull/43547) + [#43568](https://github.com/openai/codex/pull/43568) — 用户验证提供方栈**
 新增 `codex-user-verification` crate 及其提供方抽象，随后将原先桩化的 `userVerification/*` RPC 接入原生提供方——包括凭证状态、注册、删除与挑战签名。

6. **[#43603](https://github.com/openai/codex/pull/43603) — 恢复遗漏的 tmux 缩放通知**
 一个 500ms 的后台尺寸监视器，将陈旧的尺寸修正作为 resize 事件投递——直接解决 tmux TUI 的经典痛点。

7. **[#43604](https://github.com/openai/codex/pull/43604) — 从打包的模型目录中剥离 `base_instructions`**
 精简 `models.json`，并防止 release-prepare 工作流出现回归。

8. **[#43558](https://github.com/openai/codex/pull/43558) — TUI 回合后补上完成时间戳**
 用淡灰的 `done 2:32 PM` 元数据（必要时包含日期/年）取代回合分隔符——是一项贴心的会话审计增强。

9. **[#43576](https://github.com/openai/codex/pull/43576) — 在 TUI 中对相邻的计算机操作进行分组**
 相邻的 `cua_repl` 调用折叠为紧凑的 "Using computer" 分组，优先显示失败/截图预览。

10. **[#43619](https://github.com/openai/codex/pull/43619) — 稳定的 TUI/app-server 版本比较辅助函数**
 `is_official_server_older` 强制使用严格的三段式 semver 解析——为更安全的混版本场景铺路。

*同样值得关注：* Guardian 重构系列（[#43595](https://github.com/openai/codex/pull/43595)、[#43597](https://github.com/openai/codex/pull/43597)、[#43599](https://github.com/openai/codex/pull/43599)、[#43601](https://github.com/openai/codex/pull/43601)、[#43602](https://github.com/openai/codex/pull/43602)、[#43570](https://github.com/openai/codex/pull/43570)）系统性地将审阅证据、工具元数据与图片选择集中到 `codex-guardian-context`——是一项重要的内部架构整合。

---

## 💬 热门讨论

### Ideas
- **[#9618](https://github.com/openai/codex/discussions/9618) — "怎么会没有 /rewind 或 /revert 功能？"**（119 👍，20 💬)
 压倒性的社区诉求。用户指出 OpenCode/Claude Code 都支持撤销；没有它，"每次改动都提交"就成了唯一的安全网。今日互动最高的帖子。
- **[#7366](https://github.com/openai/codex/discussions/7366) — 通过 `@` 引用被 gitignore 的文件**（7 👍）
 `.gitignore` ≠ "不要使用"；用户希望 `@` 引用能够访问被忽略的文件（例如 vendored 的库源码）。
- **[#37611](https://github.com/openai/codex/discussions/37611) — 用于受治理的高能力模型访问的已签名企业工单**
 一项深思熟虑的提案，将 OpenAI 的前沿网络安全保障讨论与企业治理工作流衔接起来。

### General
- **[#7782](https://github.com/openai/codex/discussions/7782) — 在 Codex 中弃用 `chat/completions` 支持**（官方，21 👍）
 持续已久的官方迁移至 Responses API 的帖子；仍在收集用户的迁移痛点。

### Show and tell
- **[#43598](https://github.com/openai/codex/discussions/43598) — deja-vu**：Go 二进制程序，将 Codex 以及约 23 个其他 agent 的会话文件统一索引到本地回忆层。
- **[#43532](https://github.com/openai/codex/discussions/43532) — DoneAudit**：MIT 许可的工具，用于核对 agent "已完成，全部测试通过" 的声明是否对应实际证据。
- **[#43427](https://github.com/openai/codex/discussions/43427) — Blume.codes**：将 agent 会话历史转换为更优的 rules/skills，以对抗 agent 漂移。
- **[#41157](https://github.com/openai/codex/discussions/41157) — CodexFuse 1.2.0**：面向 Windows 本地的 Codex 速率限制可视化仪表盘——鉴于今日的速率限制问题，颇具相关性。

---

## 📈 功能请求趋势

1. **agent 操作的撤销/回退** — #9618 的 119 👍 使会话级 revert 成为最明确、未被满足的需求。
2. **Pets 退出与稳定化** — 完全禁用（#34349，28 👍），修复交互缺陷（#41513、#42857）。
3. **Linux 桌面端对等** — 原生窗口装饰（#38595）、Computer Use 支持（#42846）、可平铺的语音控件（#43577）、Wayland 热键门户（#38126）。
4. **TUI 人机工程** — 多行状态栏（#21653，76 👍）、更完善的回合元数据。
5. **守护进程/app-server 可配置性** — 团队正在落地（更新节奏、宽限期），与用户对掌控力的诉求相吻合。
6. **多 agent 协调** — 跨 agent 意图地图以防止编辑重叠（#36719）。

---

## ⚠️ 开发者痛点

- **速率限制的不透明与错误**：配额可见却仍报容量错误（#43337），5 小时重置时间漂移（#22133），以及第三方仪表盘（CodexFuse）在填补可视化缺口。
- **Linux 桌面端不稳定集群**：inotify 句柄耗尽且监视数归零（#39123）、musl 分配器 futex 风暴（#43170）、Pantheon 上合成器崩溃（#43424）、推理模式重置（#42804）、Projects 缺失（#42228）。Linux 是今日问题量最大的平台。
- **远程/iOS 可靠性**：出站队列断开（#37526）与 iOS 消息加载失败（#43536）削弱了远程控制的故事。
- **会话/上下文膨胀**：压缩过程中因图片复制导致 rollout 文件达到 20+ GB（#37346）。
- **macOS 资源纪律**：后台轮询唤醒显示器（#42902）。
- **信任摩擦**：在显式授权后出现误安全暂停（#43041）以及最终答案丢失中间过程的质量（#42017），都在侵蚀对 agent 输出的信心。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-08

## 1. 今日要点

- **夜间版本已发布**：`v0.60.0-nightly.20260907.g85aca163f` 于昨夜构建完成，持续推进 0.60 稳定版前的稳定性周期。
- **本周主题为安全加固**：多项 PR 聚焦沙箱隔离（文件系统边界、配置目录隔离、EOL Node 镜像），集中解决围绕凭证泄露与容器逃逸风险的关联问题。
- **子代理与 Auto Memory 质量占据 Issue 榜首**：子代理终止状态报告、代理卡死、Auto Memory 脱敏与重试等长期存在的缺陷正获得维护者重点关注。

## 2. 发布

- **[v0.60.0-nightly.20260907.g85aca163f](https://github.com/google-gemini/gemini-cli/releases/tag/v0.60.0-nightly.20260907.g85aca163f)** — 自动化的夜间版本更新。与上一个夜间版本的差异较小；在 0.60 稳定版发布前可预期常规的测试与依赖变动。（[完整变更日志](https://github.com/google-gemini/gemini-cli/compare/v0.60.0-nightly.20260906.g85aca163f...v0.60.0-nightly.20260907.g85aca163f)）

## 3. 热门 Issue

1. **[#25306 — "The caller does not have permission" 403 错误](https://github.com/google-gemini/gemini-cli/issues/25306)** — 33 条评论，12 👍，已关闭。本周期讨论最多的帖子；API 反复出现的鉴权/权限 403，并附上聊天历史 JSON 以便排查。
2. **[#22323 — MAX_TURNS 后子代理恢复但报告 GOAL 成功](https://github.com/google-gemini/gemini-cli/issues/22323)** — P1，13 条评论。`codebase_investigator` 将轮次耗尽伪装为干净的 `GOAL` 终止，导致用户无法察觉实际失败的运行。
3. **[#21409 — 通用代理无限挂起](https://github.com/google-gemini/gemini-cli/issues/21409)** — P1，8 👍。调用通用代理时，简单操作（如创建文件夹）会冻结长达一小时。临时方案是禁止子代理延迟执行，但实际并不实用。
4. **[#25166 — Shell 命令完成后仍显示 "Waiting input"](https://github.com/google-gemini/gemini-cli/issues/25166)** — P1。常见 CLI 工作流在 Shell 命令已正常返回后，仍卡在虚假的 "Awaiting user input" 状态。
5. **[#21968 — Gemini 不会主动使用技能与子代理](https://github.com/google-gemini/gemini-cli/issues/21968)** — 行为缺陷：描述清晰的定制技能（gradle、git 等）除非显式调用，否则会被忽略，影响子代理生态的感知价值。
6. **[#19873 — 零依赖 OS 沙箱与执行后意图路由](https://github.com/google-gemini/gemini-cli/issues/19873)** — 大型设计提案，将沙箱边界与 Gemini 3 原生 bash 亲和性对齐；同时涉及 UX 与安全。
7. **[#26525 — Auto Memory 的确定性脱敏](https://github.com/google-gemini/gemini-cli/issues/26525)** — P2 安全问题。当前脱敏发生在转录内容已进入模型上下文之后；需要在提取前完成清洗。
8. **[#26522 / #26523 — Auto Memory 重试与无效补丁处理](https://github.com/google-gemini/gemini-cli/issues/26522)** — 一组协同的 P2 缺陷，涉及后台提取代理在低信息量会话中循环以及静默丢弃格式错误的补丁。
9. **[#24246 — 注册工具数超过 128 时出现 400 错误](https://github.com/google-gemini/gemini-cli/issues/24246)** — 在 MCP 重度使用的实际场景中触及工具数上限；需要更智能的上下文内工具作用域控制。
10. **[#22745 — EPIC：基于 AST 的文件读取、搜索与映射](https://github.com/google-gemini/gemini-cli/issues/22745)** — 战略性调研，引入 tree-sitter/类型化工具以降低每轮 36.6k token 的基线消耗并修正错位的文件读取。

## 4. 关键 PR 进展

1. **[#29214 — fix(sandbox): 加固文件系统边界并隔离运行时状态](https://github.com/google-gemini/gemini-cli/pull/29214)** — 用经过清理的只读配置替换宿主机目录挂载，在路径检查中解析符号链接，解耦容器环境。与 #29216 配套。
2. **[#29216 — fix(cli): 在沙箱容器中隔离配置目录](https://github.com/google-gemini/gemini-cli/pull/29216)** — 阻止宿主机 `~/.gemini`（含 OAuth 令牌、凭证）泄漏至容器沙箱；关闭了一个真实的凭证暴露路径。
3. **[#28973 — fix(sandbox): 将沙箱镜像从 EOL node:20-slim 升级至 node:22-slim](https://github.com/google-gemini/gemini-cli/pull/28973)** — Node 20 已于 2026-04-30 达到 EOL；此次升级使运行时重新回到安全维护周期内。
4. **[#29239 — fix(cli): 修复窄宽度下幽灵文本换行的无限循环](https://github.com/google-gemini/gemini-cli/pull/29239)** — 修复 #19985：`InputPrompt.tsx` 的 `getGhostTextLines` while 循环在极窄终端宽度下挂起的问题。
5. **[#29237 — Fix: list_background_processes 对信号终止进程输出 (Exit Code: null)](https://github.com/google-gemini/gemini-cli/pull/29237)** — 防止因信号终止的后台任务显示 `exitCode: null`，改善 `/bg` 列表的 UX。
6. **[#29134 — fix(cli): 防止当前会话被删除](https://github.com/google-gemini/gemini-cli/pull/29134)** — 阻止通过 `--delete-session` 删除活动会话；仅匹配正确的短 ID 后缀。
7. **[#29132 / #29131 — 规范化 diff 上下文片段中的换行符](https://github.com/google-gemini/gemini-cli/pull/29132)** — 两个相互收敛的修复：在 diff 计算前进行 CRLF/CR 规范化，避免在 Windows 上将整个文件回灌至上下文。
8. **[#28975 — fix(core): 为符号链接的工作区根保留 glob 结果](https://github.com/google-gemini/gemini-cli/pull/28975)** — 解决 macOS 上 `/tmp`（符号链接至 `/private/tmp`）出现 "No files found" 的问题；实际影响面比原始工单描述更广。
9. **[#28971 — fix(core): 保持截断后的 MCP 工具名唯一](https://github.com/google-gemini/gemini-cli/pull/28971)** — 此前 "前 30/后 30" 截断方式并非单射，可能造成 MCP 工具名冲突；现在保证注册表中的唯一性。
10. **[#29137 — chore(deps): 升级 npm 依赖组（77 项更新）](https://github.com/google-gemini/gemini-cli/pull/29137)** — 值得关注的升级包括 `simple-git 3.28.0 → 3.36.0` 和 `@modelcontextprotocol/sdk 1.x`；合并前建议留意行为变化。

## 5. 热门讨论

*源数据中未提供 GitHub Discussions 内容，故省略本节。*

## 6. 功能请求趋势

- **更智能的代理组合与技能发现**：[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)、[#21432（代理自我感知）](https://github.com/google-gemini/gemini-cli/issues/21432)、[#22598（通过 /chat 分享查看子代理轨迹）](https://github.com/google-gemini/gemini-cli/issues/22598) — 用户希望代理主动利用定制技能/子代理，并为这些委派运行提供更丰富的可观测性。
- **节省 token 且结构感知的工具链**：[#22745（基于 AST 的读取/映射）](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746（用于代码库映射的 AST CLI 工具）](https://github.com/google-gemini/gemini-cli/issues/22746)、[#19561（精准提取以实现外科手术式读取）](https://github.com/google-gemini/gemini-cli/issues/19561) — 明确希望以 grep → 符号 → AST 的检索方式取代大水漫灌式的文件读取。
- **与模型行为对齐的沙箱**：[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)，以及已关闭的 PR [#29214](https://github.com/google-gemini/gemini-cli/pull/29214) 和 [#29216](https://github.com/google-gemini/gemini-cli/pull/29216) — 零依赖的 OS 级边界、执行后意图路由与宿主机配置隔离。
- **浏览器代理成熟度**：[#22232（锁恢复 / 会话接管）](https://github.com/google-gemini/gemini-cli/issues/22232)、[#21983（Wayland 失败）](https://github.com/google-gemini/gemini-cli/issues/21983)、[#22267（settings.json 被忽略）](https://github.com/google-gemini/gemini-cli/issues/22267) — 韧性、平台覆盖与配置管线。
- **记忆系统质量**：[#26516 / #26522 / #26523 / #26525 集群](https://github.com/google-gemini/gemini-cli/issues/26516) 表明用户期待更可靠、更不易陷入循环、且具备更强密钥处理能力的 Auto Memory。

## 7. 开发者痛点

- **代理卡死是头号挫败感来源**：[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)（通用代理）与 [#25166](https://github.com/google-gemini/gemini-cli/issues/25166)（Shell "Waiting input"）都描述了在简单操作上出现分钟乃至小时级的空转，严重损害信任。
- **终止状态报告掩盖失败**：[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) 与 [#21983](https://github.com/google-gemini/gemini-cli/issues/21983) 显示子代理在实际耗尽或失败时仍返回 `GOAL`，给评估与事件排查带来困扰。
- **从零开始的脚本污染工作区**：[#23571](https://github.com/google-gemini/gemini-cli/issues/23571) — `gemini` 在各目录乱扔 `tmp` 脚本，让提交卫生变得痛苦。
- **配置未被尊重**：[#22267](https://github.com/google-gemini/gemini-cli/issues/22267)（浏览器代理忽略 `settings.json`）与 [#20079](https://github.com/google-gemini/gemini-cli/issues/20079)（符号链接的代理定义不被识别）— 用户无法信赖自己的配置生效。
- **交互式提示困住 CLI**：[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)（创建 vite 应用时卡在交互式提示）— 这是一类反复出现的问题：代理未预先设置非交互标志。
- **沙箱/凭证泄漏担忧**：[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) 与 #29214/#29216 解决的宿主机挂载问题 — 在 Docker/Podman 中运行的开发者在不知不觉间暴露了宿主机密钥。
- **工具数量上限**：[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 128 工具的限制阻断了 MCP 重度工作流，且缺乏自动回退机制。
- **会话连续性回退**：[#21335（/compress 未持久化）](https://github.com/google-gemini/gemini-cli/issues/21335)、[#21763（bugreport 缺少子代理上下文）](https://github.com/google-gemini/gemini-cli/issues/21763) — 恢复与上报流程正在丢失重要状态。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-08

## 今日要点

- **MCP 生态可靠性成为焦点**：多条关于 OAuth 失败、会话恢复时 stdio 交接异常，以及对 MCP 规范要求的 `User-Agent`/`cancellation` 请求缺失的报告。
- **桌面端 1.1.15 引入工作区争用回归**：在已有 Local（分支）会话运行的情况下，无法再创建第二个同类会话 — 影响 macOS（#4742）和 Windows（#4756）。
- **CLI 1.0.83 出现多项回归**：MCP stdio 超时缩短（#4753）、Azure MCP `learn=true` 性能下降（#4749）、子代理事件顺序变更（#4760），以及 TUI 空闲 CPU 回归（#4750）。

## 版本发布

_过去 24 小时内无新版本发布。_

## 热门议题

1. **[#4757](https://github.com/github/copilot-cli/issues/4757) — 在没有任何托管策略的账号上，全会话范围的 `--yolo` / `--allow-all` 被失败闭合（fail-closed）旁路限制阻断** *(open, 3 条评论)* — 一项安全/UX 回归：将缺失托管策略视为旁路模式的"失败闭合"，且没有逐会话的逃生通道。对任何使用自治标志的企业用户都很重要。
2. **[#4756](https://github.com/github/copilot-cli/issues/4756) — Windows 应用每次创建新的 Local 会话前都需要归档所有空闲项目会话** *(open, 7 👍, 2 条评论)* — 与 #4742 直接对应的 Windows 端表现；1.1.15 用户被迫先归档会话才能创建新会话，阻碍正常流程。
3. **[#4755](https://github.com/github/copilot-cli/issues/4755) — 队列通道消息在回合结束时落入导致会话永久卡死（空闲终态被抑制，队列永不排出）** *(open, 1 条评论)* — 严重的可靠性缺陷：会话进入既非空闲也非运行的卡死状态，只能通过 `kill` 恢复。存在数据丢失/未保存工作的风险。
4. **[#4753](https://github.com/github/copilot-cli/issues/4753) — v1.0.83：会话恢复时取消进行中的 stdio MCP 服务器连接（超时约 1s，v1.0.82 为约 16s）** *(open, 2 条评论, 1 👍)* — 1.0.83 的重大回归，会话恢复时破坏 MCP 集成；许多工具静默不可用。
5. **[#4752](https://github.com/github/copilot-cli/issues/4752) — `--agent <name>` 无法识别通过 `--add-dir` 加载的自定义代理** *(open, 0 条评论)* — 通过 `--add-dir` 的子代理发现机制在提示时委派可用，但顶层的 `--agent` 标志不识别，破坏多代理工作流。
6. **[#4749](https://github.com/github/copilot-cli/issues/4749) — Copilot CLI 1.0.83-5 中 Azure MCP `learn=true` 调用在 180s 后超时** *(open, 0 条评论)* — 1.0.80（0.2s）与 1.0.83-5（超时）之间干净的 A/B 对比；将回归隔离到新版本。
7. **[#4750](https://github.com/github/copilot-cli/issues/4750) — Copilot TUI 占用 CPU 过高** *(open, 0 条评论)* — v1.0.83 上空闲 TUI 消耗约一核 6–7%，提示后进一步放大；疑似渲染/事件循环回归。
8. **[#4743](https://github.com/github/copilot-cli/issues/4743) — ACP：`end_turn` 先于后台 shell 完成及自治后续工具调用出现；无可观察的会话空闲信号** *(open, 0 条评论)* — 破坏 ACP 集成的 Agent Client Protocol 契约；与 #4555 相关但独立。
9. **[#4742](https://github.com/github/copilot-cli/issues/4742) — 桌面应用 1.1.15：在已有 Local（分支）会话运行时无法创建第二个** *(open, 7 条评论)* — 活动会话锁回归，阻塞并行工作；明确指出由 1.1.15 自动更新触发。
10. **[#4740](https://github.com/github/copilot-cli/issues/4740) — 语音服务器在删除 pid 文件而服务器进程仍存时进入永久死锁** *(open, 0 条评论)* — 平台/Windows 边缘情况：陈旧 pid 文件清理触发不可恢复的 bind-loser 死锁，无恢复路径。

其他值得关注的条目：
- **[#1665](https://github.com/github/copilot-cli/issues/1665) — 限定项目/仓库范围的插件（CLOSED, 18 👍, 14 条评论）** — 高流量特性请求，要求项目级（而非仅用户级）的插件配置；最近已关闭。
- **[#1999](https://github.com/github/copilot-cli/issues/1999) — 德语键盘无法输入 `@`（CLOSED, 10 条评论）** — 长期存在的国际化缺陷；现已关闭。
- **[#4017](https://github.com/github/copilot-cli/issues/4017) — MCP OAuth：非第一方 HTTP 服务器取消 host-token 后永不启动运行时浏览器流程** *(open, 3 👍, 3 条评论)* — 与 Atlassian/incident.io MCP 服务器之间的重大互操作性缺口。
- **[#4681](https://github.com/github/copilot-cli/issues/4681) — MCP OAuth `initialize` 请求缺少 User-Agent 头** *(open, 2 条评论)* — 破坏按 UA 鉴权服务器的规范合规性问题。
- **[#4759](https://github.com/github/copilot-cli/issues/4759) — Copilot CLI 应发送 MCP 取消请求** *(open, 1 条评论)* — 带来真实 UX 后果的 MCP 规范合规缺口（用户取消后浏览器认证流程挂起）。
- **[#4670](https://github.com/github/copilot-cli/issues/4670) — 扩展启动失败后工具调用挂起** *(open, 1 条评论)* — 扩展生命周期卫生：`joinSession()` 失败应将该工具从提供列表中移除。
- **[#4754](https://github.com/github/copilot-cli/issues/4754) — 删除已驱逐会话时静默 no-op；ON DELETE CASCADE 永不触发** *(open, 0 条评论)* — 伴随 UI 持续陈旧的 SQLite/数据层缺陷。
- **[#4709](https://github.com/github/copilot-cli/issues/4709) — 多仓库集合工作区在成员仓库默认分支不同时永不关联 worktree** *(open, 1 条评论)* — 在 `main` 与 `master` 混用的场景下多仓库代理不可用。
- **[#4738](https://github.com/github/copilot-cli/issues/4738) — `ask_user` 表单：提前按 Enter 会提交/取消并永久丢弃已键入的答案** *(open, 0 条评论)* — 严重的数据丢失 UI 缺陷。
- **[#4693](https://github.com/github/copilot-cli/issues/4693) — 按仓库/解决方案筛选/限定会话标签与恢复列表** *(open, 0 条评论)* — 来自重度用户的 UX 扩展请求。
- **[#4760](https://github.com/github/copilot-cli/issues/4760) — 后台子代理启动事件被延迟至父任务完成（1.0.83）** *(open, 0 条评论)* — 子代理生命周期中的可观测性/事件时序回归。

## 关键 PR 进展

过去 24h 内仅有 2 个 PR 更新；都处于早期阶段，值得跟踪：

1. **[#4748](https://github.com/github/copilot-cli/pull/4748) — Add joke cli** *(open, 0 👍)* — 社区 PR，向仓库添加一个新颖的"joke" CLI；可能是面向新贡献者的低优先级贡献。
2. **[#4746](https://github.com/github/copilot-cli/pull/4746) — Add experimental next-action extension prototype** *(open, 0 👍)* — 微软官方编写的可选 SDK 扩展示例，位于 `examples/next-best-action/`，通过 `joinSession()` 与一个无工具的 UI 面板加入现有会话，以呈现模型推断的 next actions。位于扩展自动发现之外，且不修改已安装 CLI — 是一种安全的原型模式。

## 热门讨论

_未提供讨论数据 — 本节省略。_

## 功能请求趋势

- **项目/仓库级配置**：每仓库插件（#1665）和每仓库会话筛选（#4693）都反映出将 CLI 状态从全局、用户级作用域剥离的需求。
- **多代理人体工学**：`--add-dir` 代理发现、通过 `--agent` 选择自定义代理（#4752），以及更佳的子代理生命周期可观测性（#4760）。
- **MCP 协议合规**：显式取消请求（#4759）、User-Agent 转发（#4681），以及运行时浏览器流程恢复（#4017）— 用户希望 MCP 服务器（尤其非第一方）"开箱即用"。
- **工作区/会话并行**：在同一项目中运行多个 Local 会话的能力（#4742、#4756）。
- **精细化/UX 易用性**：`/refine` 在 `gpt-4o-mini` 上因不支持的 `reasoning_effort` 反复返回 400（#4747），反映出对模型降级时优雅能力协商的需求。

## 开发者痛点

- **会话生命周期脆弱**：队列通道回合卡死（#4755）、静默驱逐/删除（#4754）、混用默认分支集合中的 worktree 关联失败（#4709），以及阻塞并行会话的工作区锁（#4742、#4756）— 是 1.x 线中最常见的故障模式。
- **1.0.83 回归聚集**：恢复时更短的 MCP stdio 超时（#4753）、Azure MCP `learn=true` 180s 超时（#4749）、子代理事件重排（#4760），以及 TUI 空闲 CPU 飙升（#4750）。运行自动化负载的用户正被推向固定到 1.0.82。
- **MCP 认证脆弱**：OAuth 流程静默丢弃 token（#4017）、剥离已配置头（#4681），且不传递取消信号（#4759）— 对非第一方服务器尤为痛苦。
- **失败闭合策略姿态过度**：在未配置策略时旁路模式（`--yolo`/`--allow-all`）被禁用（#4757），破坏个人账号工作流。
- **扩展生命周期缺口**：来自已崩溃扩展的工具仍保留在提供列表里（#4670），且 `--add-dir` 发现在不同标志层面不一致（#4752）。
- **平台/边缘情况死锁**：Windows 语音服务器 pid 文件死锁（#4740）和 Windows 会话归档要求（#4756）指向 Windows 上生命周期加固不足。
- **输入/UX 数据丢失**：`ask_user` 表单 Enter 处理丢弃已键入内容（#4738）；德语 `Alt-Gr` `@` 无法使用（#1999，现已关闭）。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-08

## 今日要点

社区的两大主流议题仍是**对官方 VS Code 扩展的长期诉求**（issue #11176），以及一波**会话/恢复相关的回归问题**——OpenCode 会话会卡在永久的 `busy` 状态，且重启后依然存在，通常与被丢弃的子代理权限请求或静默的 SSE 流失败有关。在提供商一侧，**Go 订阅计费的边界场景**（Zen 余额回退）以及与 Mistral GLM-5.2、Tencent WorkBuddy 和 next-channel Bedrock 的**兼容性破坏**引发最多讨论。

---

## 版本发布

_过去 24 小时内无新版本发布。_

---

## 热门 Issue

1. **[#11176 — 官方 OpenCode VS Code 扩展](https://github.com/anomalyco/opencode/issues/11176)**（29 条评论，147 👍）
   点赞数最高的开放功能请求。用户希望使用第一方的 VS Code 扩展，而非依赖社区封装。与 #27303（Copilot BYOK 提供商）密切相关。

2. **[#43199 — Mistral 的 GLM-5.2 工具调用报错](https://github.com/anomalyco/opencode/issues/43199)**（9 条评论）
   Mistral 托管的 GLM-5.2 在纯文本场景下正常，但一旦调用工具就出错——很可能是 `mistral` 提供商适配器中工具定义与流式输出不匹配。

3. **[#43277 — 正常使用中会话永久卡死](https://github.com/anomalyco/opencode/issues/43277)**（8 条评论）
   会话拒绝接收新消息，且卡死状态在系统完全重启后仍然存在。影响普通用户的高严重度 UX 回归。

4. **[#47842 — Cursor 中 OpenCode 无法工作](https://github.com/anomalyco/opencode/issues/47878)**（7 条评论，已关闭）
   从 Cursor 调用时出现 `ERROR_PROVIDER_ERROR` / "model channel not available"；虽已关闭，但对将 OpenCode 作为后端集成的用户仍有参考价值。

5. **[#17044 — 更新安装总是落到 APPDATA 而无视安装位置](https://github.com/anomalyco/opencode/issues/17044)**（7 条评论，已关闭）
   一个长期存在的 Windows 痛点：即便 OpenCode 安装在其他位置，更新也总是写入 `%LOCALAPPDATA%`，污染了用户级状态。

6. **[#27303 — VSCode Copilot 的官方 Go/Zen BYOK 提供商扩展](https://github.com/anomalyco/opencode/issues/27303)**（6 条评论）
   与 #11176 是同类问题；用户希望 OpenCode 的 Go/Zen 模型能通过 VS Code 的 BYOK 提供商扩展机制暴露出来。

7. **[#31724 — 从本地 opencode 服务器暴露 OpenAI 兼容端点](https://github.com/anomalyco/opencode/issues/31724)**（6 条评论，已关闭）
   反复出现的需求：让 `opencode serve` 提供一个 OpenAI 兼容的 `/v1`，以便 Continue、Cline 等外部工具复用已配置的提供商。

8. **[#45011 — Web Home 始终不显示 CLI/TUI 创建的会话](https://github.com/anomalyco/opencode/issues/45011)**（6 条评论）
   Web UI 的项目注册是纯客户端的，因此从 `opencode run`/TUI 创建的会话在手动添加项目之前不会出现在 `opencode web` 中。

9. **[#42938 — Go 套餐达到 100% 但 $39.89 的 Zen 余额从未被使用](https://github.com/anomalyco/opencode/issues/42938)**（6 条评论）
   即便启用了 "Use balance"，当月度套餐用尽时，Go 也不会回退到 Zen 信用——这是一个值得跟踪的计费完整性 bug。

10. **[#36241 — gpt-5.6-sol-fast/high 反复报错 `reasoning part rs_*:0 not found`](https://github.com/anomalyco/opencode/issues/36241)**（6 条评论）
    在 macOS 上，流式推理分片查找在响应中途失败，导致回合中止；属于更广泛的流式状态损坏 bug 类别。

---

## 关键 PR 进展

1. **[#47848 — fix(session): clear the archived timestamp instead of silently ignoring it](https://github.com/anomalyco/opencode/pull/47848)**（open）
    恢复可用的 "unarchive" 语义，而非丢弃调用；关闭 #47849 并处理了 #24153 的后端部分。

2. **[#47861 — fix(snapshot): scope revert patches and guard deletions](https://github.com/anomalyco/opencode/pull/47861)**（open）
    快照存储是 worktree 全局的，但补丁列表并非如此——此次改动将补丁限定到正确的 worktree，并防止不安全的删除。关闭 #40736、#33940、#46783。

3. **[#41016 — fix(provider): forward agent temperature for config-defined custom models](https://github.com/anomalyco/opencode/pull/41016)**（closed）
    在 `opencode.json` 中声明的自定义模型将 `temperature` 能力默认设为 `false`，从而静默丢失代理级别的设置。

4. **[#47859 — fix(session-ui): align retry icon with label](https://github.com/anomalyco/opencode/pull/47859)**（open）
    清理残留的 spinner 偏移量（自重试 spinner 变为警告图标后），并为组件几何增加回归测试。

5. **[#47835 — fix(app): keep tab progress visible on hover](https://github.com/anomalyco/opencode/pull/47835)**（closed）
    移除仅在悬停时生效的 `revealProjectOnHover` 选项，使 busy 进度指示器在标签页上始终可见。

6. **[#41145 — fix(tui): preserve legacy Option+Enter newlines](https://github.com/anomalyco/opencode/pull/41145)**（closed）
    保留原始/遗留的 Option+Enter 作为换行别名，并将默认的 prompt-queue 绑定限制为 Kitty 协议上报的事件，源码选择在 keybind 层声明式完成。

7. **[#41143 — fix(tui): move debug overlay to devtools](https://github.com/anomalyco/opencode/pull/41143)**（closed）
    将渲染调试覆盖层从全局命令面板中移除，并迁移到 DevTools → Tools 下，与其他渲染诊断工具并列。

8. **[#41135 — feat(app): add message timeline navigation strip](https://github.com/anomalyco/opencode/pull/41135)**（closed）
    实现了一个紧凑的、仿 DeepSeek Web 风格的珠链导航条，用于在长会话中快速跳转——即 #32999 中请求的紧凑版本。

9. **[#47858 — feat(updates): serve updates under opencode.ai/update](https://github.com/anomalyco/opencode/pull/47858)**（closed）
    由维护者驱动：将更新 Worker 挂载到 `opencode.ai/update`（保留原始主机名），并新增本地构件的 AUR 发布。

10. **[#41132 — fix(acp): emit plan updates for todos](https://github.com/anomalyco/opencode/pull/41132)**（closed）
    将 OpenCode 的 `todo.updated` 事件映射为 ACP 的 `session/update` 消息，其中 `sessionUpdate: "plan"`，从而允许 ACP 客户端渲染实时的 todo 计划。

---

## 功能请求趋势

- **编辑器/IDE 集成** 是呼声最高的类别：官方 VS Code 扩展（#11176，约 150 👍）、Copilot 的 Go/Zen BYOK 提供商（#27303）以及桌面端的"以新/旧会话启动"选项（#47807）都反映出同一需求。
- **本地服务器/API 接口扩展**：用户希望 `opencode serve` 暴露 OpenAI 兼容端点（#31724），并允许任意工具消费已配置的提供商栈。
- **子代理与权限 UX**：可绑定的"设为该代理的默认模型"操作（#47836）、更完善的 auto-mode 权限处理（#47545），以及长期存在的禁用 "Allow always" 的请求（#19528，已关闭），都指向代理控制环节的同一摩擦点。
- **插件可扩展性**：预留的**插件数据流/指标面板**（#46156），用于展示每个会话的数据日志和结构化指标，且在聊天流之外呈现。
- **跨客户端会话可见性**：让 CLI/TUI 会话在 `opencode web` 中显示（#45011、#46444）是一个反复出现的架构性诉求。

---

## 开发者痛点

- **永久的会话锁**：多个报告（#43277、#44747、#37580）描述会话永远停留在 `busy`——通常是因为子代理权限请求或 SSE 数据块被静默丢弃，导致 stop/interrupt 失效，且状态在重启后仍然存在。
- **工具调用与修复边界场景**：未命名调用在工具修复中丢弃 `tool` 字段（#47831），以及 chat-completions 提供商的 `commentary` 通道尚未实现（#47168），都会导致回合异常中止。
- **提供商集成的脆弱性**：Mistral GLM-5.2（#43199）、next-channel Bedrock（#40663）、Tencent WorkBuddy（#47820）以及 OpenRouter cookie 认证（#12436）的回归表明第三方提供商的怪癖矩阵非常棘手。
- **Auto 模式噪音**：#47545 指出，由于自动审批是在服务器已发出权限请求之后在客户端完成的，因此会反复出现误报的权限通知。
- **macOS 上的 TUI 输入**：全屏 TUI 中存在间歇性的按键丢失（#37336），而 `--mini` 与 shell 仍正常响应——这是反复出现的终端栈痛点。
- **Windows 安装/更新卫生问题**：仅写入 APPDATA 的更新（#17044）以及纯白 GUI 启动（#23949）持续出现在 Windows 专属报告中。
- **Go 计费正确性**：Go 套餐未能回退到 Zen 余额（#42938）对付费用户而言是一个信任问题，即便该功能已有文档说明。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区日报 — 2026-09-08

## 今日要点

今天的活动主要由**提供商路由 bug 修复**主导（Copilot GPT-6 Astra、Claude Fable 5 fallback、OpenRouter `:free` max_tokens），以及**对话中系统消息重构**（#9116/#9117）的首个可落地层级——它重构了 coding agent 传递 prompt 与工具变更信号的方式。一个长期存在的 `openai-codex` 流式可靠性问题仍以评论数占据 issue 列表榜首，而 Pi 在 Windows 上的体验依旧是热门讨论话题。

## 发布

_过去 24 小时内无新发布。_

## 热门 Issue

1. **#4945 — openai-codex 连接可靠性问题**（77 条评论，👍33）
   `gpt-5.5` 经常导致交互式 TUI 在回合中途卡住，没有流式文本、没有工具调用、也没有可见的错误——Escape 是唯一的恢复路径。今日流量最高的帖子；社区正在呼吁更清晰的 abort / 错误提示。[链接](https://github.com/earendil-works/pi/issues/4945)

2. **#7547 — 你如何在 Windows 上使用 Pi？遇到了什么问题？**（61 条评论）
   由维护者 petrroll 发起的"分享你的环境"协调贴，用于梳理 Windows 上的各类场景（WSL、原生、终端、沙箱）。[链接](https://github.com/earendil-works/pi/issues/7547)

3. **#8760 — OpenRouter `:free` 模型因 Pi 超出 `max_tokens` 而返回 400**（5 条评论）
   Pi 传递了目录里的 `maxOutputTokens`，超过了提供商的硬性上限。影响多个 `:free` 模型；问题具体且易于验证。[链接](https://github.com/earendil-works/pi/issues/8760)

4. **#5886 — AgentSession 结算/续接与 assistant-tail 生命周期 bug**（11 条评论）
   来自 mitsuhiko 的元 issue，涵盖运行后逻辑从已不再与现实匹配的 transcript 中恢复的反复出现的 bug。[链接](https://github.com/earendil-works/pi/issues/5886)

5. **#8823 — 活跃流式传输中的 Esc 经常无法取消正在进行的请求**（6 条评论）
   abort 已被注册，但 HTTP 请求仍会持续运行直到提供商完成，造成取消时的 token 与延迟浪费。[链接](https://github.com/earendil-works/pi/issues/8823)

6. **#8643 — Bedrock：OpenAI 模型拒绝 `toolResult.content` 中嵌套的图片**（5 条评论，👍1）
   提议将 tool-result 图片提升为兄弟 user block，以实现与 `openai-completions.ts` 一致的 Bedrock-OpenAI 行为；具备 PR 质量的修复已在 fork 上。[链接](https://github.com/earendil-works/pi/issues/8643)

7. **#9209 — GitHub Copilot GPT-6 Astra 被路由到不支持的 `/chat/completions`**（5 条评论）
   更广泛的配置与端点不匹配问题的征兆（现也已作为 #9277 浮出水面）。[链接](https://github.com/earendil-works/pi/issues/9209)

8. **#8826 — 为长时间的瞬态故障设定 agent 重试退避上限**（4 条评论）
   为 coding-agent 的指数退避增加可配置上限，避免网络不稳定的用户在两次尝试之间等上数分钟。[链接](https://github.com/earendil-works/pi/issues/8826)

9. **#9276 — 带 context 行的 grep 工具可能导致 OOM**（2 条评论）
   当 `context > 0` 时，grep 工具会将整个匹配文件读入内存；在无头 SDK 场景下造成 JavaScript 堆 OOM。真实的生产影响。[链接](https://github.com/earendil-works/pi/issues/9276)

10. **#6996 — Gemini 3.x 模型因缺少 `thought_signature` 在工具调用时失败**（9 条评论，已关闭）
    现已关闭（已修复），但仍值得追踪——该模式在 Gemini 各版本中反复出现：`thought_signature` 必须在跨轮次的历史中保留下来。[链接](https://github.com/earendil-works/pi/issues/6996)

## 关键 PR 进展

1. **#9116 — feat(ai): 增加对话中系统消息**（mitsuhiko，OPEN）
   #8998 拆分的第一层：在 `pi-ai` 中增加对显式 `system` 角色的支持，可在对话中间插入。为会变更 prompt 状态的工具/扩展奠定基础。[链接](https://github.com/earendil-works/pi/pull/9116)

2. **#9117 — feat(coding-agent): 将 prompt 与工具变更作为系统消息增量传递**（mitsuhiko，OPEN）
   第二层：coding-agent 将 prompt/工具加载的变更以系统消息增量的形式发出，而非直接修改顶层系统提示。对每次工具新增/移除之后的所有请求都有可见影响。[链接](https://github.com/earendil-works/pi/pull/9117)

3. **#9253 — fix(ai): 将 Copilot GPT 模型路由至 Responses（修复 astra）**（petrroll，已关闭）
   通过将 Copilot GPT 模型从 `/chat/completions` 切换到 `/responses` 修复 #9209；并清理遗留的 `gpt-4*` 引用。[链接](https://github.com/earendil-works/pi/pull/9253)

4. **#9297 — fix(ai): 移除无效的 Fable 5 fallback 目标**（petrroll，OPEN）
   从 `claude-fable-5` 的 `allowedFallbackModels` 中移除 `claude-opus-4-8`（API 现已拒绝该模型），并锁定覆盖所生成 fallback 元数据的测试，包括 Fable 5.1。[链接](https://github.com/earendil-works/pi/pull/9297)

5. **#9301 — feat(coding-agent): 确认 device-code 浏览器与剪贴板操作**（petrroll，OPEN）
   修复 #9282：恢复 best-effort 下的 device-code 验证页面自动打开与剪贴板复制（默认关闭；Copilot 下可选启用）。[链接](https://github.com/earendil-works/pi/pull/9301)

6. **#7742 — feat(ai): 增加 Ollama Cloud 支持**（ParthSareen，OPEN）
   将 Ollama Cloud 作为提供商加入，数据来源为 `OLLAMA_API_KEY` 与 `models.dev`。保留本地 Ollama 流程；遵循现有提供商模式。[链接](https://github.com/earendil-works/pi/pull/7742)

7. **#9292 — feat(coding-agent): 增加手动重试 api/command**（jwueller，已关闭）
   为自动重试过早放弃的场景增加一条显式的用户触发重试路径。[链接](https://github.com/earendil-works/pi/pull/9292)

8. **#8744 — feat(tui): 增加 opt-in 的 overlay 选择排除**（wutongyuonce，OPEN）
   允许 overlay 选择退出全屏文本选择捕获，确保复制的内容始终来自底层 transcript。[链接](https://github.com/earendil-works/pi/pull/8744)

9. **#8615 — fix(coding-agent): 保留交错排列的用户内容**（wutongyuonce，已关闭）
   在 `sendUserMessage()`、空闲提示以及流式 steer/follow-up 传递过程中保持文本/图像块的顺序；覆盖扩展输入的交错场景。[链接](https://github.com/earendil-works/pi/pull/8615)

10. **#9272 — fix(coding-agent): 允许扩展从自定义提供商进行流式输出**（rwachtler，已关闭）
    在 `complete(...)` 之外同时暴露 `stream(...)` 与 `streamSimple(...)`，使扩展能够从自定义提供商进行流式输出。修复 #8964。[链接](https://github.com/earendil-works/pi/pull/9272)

## 热门讨论

_源数据中未提供讨论数据——本节略。_

## 功能请求趋势

- **对话中 prompt/工具变更** — #9116/#9117 的拆分是用户一直期待的结构性修复，使扩展能够在不重启会话的前提下更新工具集与 prompt 片段。
- **有界的重试 / 取消控制** — 多条 issue（#8826 重试上限、#8823 流式中 Esc、#9292 手动重试）都指向用户希望对失控或卡住的请求拥有更具确定性的控制。
- **提供商一致性与路由正确性** — 对干净提供商→端点路由的反复呼声（#9209、#9277、#9253、#8760、#8643、#9294、#9298）。用户希望 Pi 在模型新增或更新时不再发送错误 API 的请求。
- **将 Windows 作为一等目标** — #7547 是维护者明确提出要在 Windows 上投入资源的信号；剪贴板行为（#7973）、全屏图片渲染（#9169）以及 TUI 兼容性问题都在此汇聚。
- **为扩展提供自定义流式输出** — #9272 / #8964 表明用户希望 `modelRegistry` 提供一流的流式 API 以构建自定义提供商。
- **性能预算与无头 SDK 可靠性** — #7739（启动预算）、#9055（EventStream O(n²)）、#9063（tool-call 参数重新解析 O(n²)）、#9267（fuzzy scan）、#9276（grep OOM）都集中在长时间运行 / 无头使用场景。
- **可用性回退** — #9273（手动 model/thinking 自 0.84.3 起不再自动持久化）是一项用户急切希望回退的回退。

## 开发者痛点

- **流式挂起与静默 abort** — #4945 与 #8823 都描述了 Escape 并不能真正停止工作的情形，让用户无法判断模型仍在运行还是已经卡死。
- **提供商目录漂移** — 今天几乎每一条已关闭 issue 都涉及端点或定价发生变化的模型（Copilot、Grok、Fable 5、Gemini、OpenRouter 免费层）。目录层需要与 `models.dev` 及提供商发布日志形成更快的反馈回路。
- **无头 SDK 稳定性** — grep 工具引发的 OOM（#9276）、二次复杂度的流式缓冲（#9055、#9063）以及缺失的 `x-opencode-session` 头（#9290、#9237），都是用户在服务端或 CI 场景下运行 Pi 时遇到的日常故障。
- **Windows 专属摩擦** — #7547 + #9169 + #7771 描绘出 Windows 仍处于"尽力而为"状态的画面：安装错误、全屏模式下的图片渲染，以及纷繁复杂的终端/WSL 配置组合。
- **扩展接口的缺口** — 扩展作者反复撞上同样的遗漏（缺少 `stream` API、缺少 `allowCommands`、缺少 `x-opencode-session` 注入、缺少 opt-in 的 overlay 排除），不得不采取临时方案。
- **跨提供商 tool-result 结构不匹配** — #8643（Bedrock-OpenAI 图片）与 #6996（Gemini `thought_signature`）表明 Pi 的归一化层仍存在到晚期才暴露的、提供商特有的漏洞。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-08

## 今日要点
v0.23.1-preview.2 与一个新的 nightly 版本（v0.23.0-nightly.20260907）同步发布,同时**OpenTUI 迁移追踪议题（#8662）**迎来了迄今为止最具体的一次预览工作——该议题评论数已突破 32 条,标志着项目意图告别那块被重度补丁化的 ink 7 + React 19 渲染层。Web Shell 仍是当前最活跃开发的主战场,横切型的 PR 覆盖了分屏导航、Web 预览、上下文用量侧边栏、git 远程管理以及 shell/monitor 输出渲染等方向;与此同时,另一条修复线专门针对**守护进程会话回收缺陷**(`activeWork` 恢复见 #8586、后台 shell 丢弃见 #11119、busy/idle 协调见 #11118)。

## 版本发布
- **[v0.23.1-preview.2](https://github.com/QwenLM/qwen-code/releases)** —— 新增动态 workflow 运行（workflow-run）的 web-shell 可视化与管理,并派生出会话 workflow 项目([#10594](https://github.com/QwenLM/qwen-code/pull/10594) by @qqqys)。
- **[v0.23.0-nightly.20260907.f1ed3bc31a](https://github.com/QwenLM/qwen-code/releases)** —— 与 preview 相同的 workflow-run 界面;沿用至 nightly 通道。
- **[cua-driver-rs v0.20.4](https://github.com/QwenLM/qwen-code/releases)** —— CUA driver 预编译产物,支持 macOS（已签名 + 公证的通用二进制 + `QwenCuaDriver.app`）、Linux（x86_64 + arm64,glibc ≥ 2.31）以及 Windows（UIAccess worker + 原生 SDK,x86_64 + arm64）。

## 热门议题
1. **[#8662 — 将 TUI 渲染层从 ink 迁移到 OpenTUI（追踪）](https://github.com/QwenLM/qwen-code/issues/8662)** —— 32 条评论,板上最高互动量。议题梳理了约 1037 行 ink 补丁的结构性成本（闪烁、视口缺陷）,并把迁移框定为战略性解答。作为路线图信号具有重要意义。
2. **[#44 — 百炼收费陷阱](https://github.com/QwenLM/qwen-code/issues/44)** —— 20 条评论,仍在更新。这是一项长期存在的用户投诉:即便只是简单查询,百炼也会产生意料之外的计费——反映的是对托管路径的信任问题,而非代码缺陷。
3. **[#8586 — 追踪 `activeWork` 与后台 Agent 恢复](https://github.com/QwenLM/qwen-code/issues/8586)** —— 9 条评论。要求在 deep-daemon 健康度中显式声明 `activeWork` 事实,并为寿命超过前台 prompt 的后台 agent 提供五层恢复路径。对守护进程托管的 Web Shell 具有战略意义。
4. **[#11119 — `serve`:后台 shell 输出与唤醒通知被静默丢弃](https://github.com/QwenLM/qwen-code/issues/11119)** —— 8 条评论,P1。在 `qwen serve` 中,后台 shell 持续产生输出,但一旦启动它的回合被回收,守护进程会话就会陷入死锁。直接推动了 #8586 的工作。
5. **[#11303 — Windows `qwen-cli`（VS Code Companion）泄漏 headless conhost.exe ConPTY 进程](https://github.com/QwenLM/qwen-code/issues/11303)** —— 6 条评论。约运行 12 小时后,单个 qwen-cli 实例会累积 347 个 conhost 子进程,占用约 2.8 GB。是一项具体且影响严重的 Windows 可靠性回归。
6. **[#10530 — 0.22.3 中出现 400 "Failed to initialize samplers: failed to parse grammar"](https://github.com/QwenLM/qwen-code/issues/10530)** —— 6 条评论。Qwen 3.8 27b / Qwen 3.6 35b 通过 llama-server 启动时失败,报此前版本不存在的 grammar 解析错误。Pi 与 OpenCode 不受影响——指向 qwen-code 端的请求负载变更。
7. **[#3361 — Agent 误将成功执行的 shell 输出解读为空](https://github.com/QwenLM/qwen-code/issues/3361)** —— 6 条评论,长期存在。在 OpenAI 兼容 API 下,模型声称 `pwd && git rev-parse --show-toplevel` 未返回任何结果,但 UI 上明明有输出。
8. **[#10435 — 新版本在本地 llama-server 上崩溃推理](https://github.com/QwenLM/qwen-code/issues/10435)** —— 5 条评论,与 #10530 重复。进一步强化了本地推理回归作为首要关切的判断。
9. **[#8835 — [repo-hygiene] 2026-W33 仅报告类发现（8 项）](https://github.com/QwenLM/qwen-code/issues/8835)** —— 5 条评论。自动化安全/代码卫生扫描,包括 ACP 会话 cwd / worktree sidecar 路径中同类 `startsWith('..')` 包含判定缺陷。
10. **[#10865 — `perf(web-shell)`:每个渲染周期都会重复派生三次会话 workflow 投影](https://github.com/QwenLM/qwen-code/issues/10865)** —— 5 条评论。已合并 #8583 的后续跟进。凸显了在 `SessionWorkflowCockpit.tsx` 中本应仅构建一次的索引被反复派生的问题。

## 关键 PR 进展
1. **[#11003 — 通过 ACP 将子 agent 回合委派给外部 agent（Claude Code 优先）](https://github.com/QwenLM/qwen-code/pull/11003)** —— 子 agent 定义可声明 `executor` 块;回合在另一进程中通过 ACP 运行,并重新发布到同一流中。本周期的头条互操作特性。
2. **[#11289 — `fix(web-shell)`:保留 daemon 在 idle 时拒绝的回合中消息](https://github.com/QwenLM/qwen-code/pull/11289)** —— 在运行回合期间输入、并恰好撞上空闲会话的请求,现在会以普通 prompt 的形式重新投递,而不是返回一条裸拒。
3. **[#11250 — `feat(web-shell)`:改进分屏会话导航](https://github.com/QwenLM/qwen-code/pull/11250)** —— 复用了侧边栏的会话详情弹窗来展示标题,新增一条细窄的页头指示器用于标记最近交互的面板,以及一个用于轮询等待审批或用户输入面板的工具栏按钮。
4. **[#11086 — `feat(serve)`:将扩展作用域限定在工作区运行时](https://github.com/QwenLM/qwen-code/pull/11086)** —— 全局扩展目录会被调和进各工作区的实时运行时;同步更新扩展管理、composer 添加菜单与 `@` 解析逻辑。
5. **[#11276 — `feat(web-shell)`:具备已保存投递历史的 Web 预览](https://github.com/QwenLM/qwen-code/pull/11276)** —— Web 预览面板,支持浏览器可达的开发 URL,提供桌面/移动宽度、刷新以及外链打开;URL/宽度按会话记忆。
6. **[#9305 — `fix(ui)`:短内容底部对齐](https://github.com/QwenLM/qwen-code/pull/9305)** —— 解决对话内容刚好在视口内时,composer 上方出现的视觉留白（VP 模式）。
7. **[#10347 — `feat(core)`:在无法使用 Ctrl+Y 的通道中对瞬态网络错误（EOF）进行自动重试](https://github.com/QwenLM/qwen-code/pull/10347)** —— 将包装后的传输错误（如 `400 network error ... EOF`）重新归类为可重试,从而在通道中也受有界重试机制覆盖。
8. **[#10455 — `fix(cli)`:当输出语言文件不可写时不再崩溃启动](https://github.com/QwenLM/qwen-code/pull/10455)** —— 加固全局配置写入,使只读 home 目录（例如共享 runner）不再导致启动中止。
9. **[#10938 — `feat(web-shell)`:让 Session Workflow 依赖可导航,并精简其外壳](https://github.com/QwenLM/qwen-code/pull/10938)** —— 弥合 #8583 遗留的导航、外形与文档缺口;计划 DAG 现在以步骤本身而非状态作为视觉主线。
10. **[#11206 — `feat(mesh)`:持久化的共享线程 agent 协作](https://github.com/QwenLM/qwen-code/pull/11206)** —— 具备身份的工作区 agent 可在共享线程上协作:分派任务、运行中插话、检视署名结果、取消、解除阻塞并标记已审阅。
11. **[#11308 — `fix(channels)`:通过托管加载路径恢复 worktree 任务路由](https://github.com/QwenLM/qwen-code/pull/11308)** —— 通道 worker 冷启动时,会通过托管加载路径（工作区根 + daemon worktree 证明）重新挂载已持久化的 worktree 任务路由。
12. **[#11070 — `fix(acp)`:在冷恢复时保留审批模式](https://github.com/QwenLM/qwen-code/pull/11070)** —— 守护进程会话的审批模式（包括 Plan return 模式）现在可在 ACP 子进程被收割后,以及冷加载/恢复时保留下来。

## 功能诉求趋势
综合议题与 PR 来看,主要方向如下:

- **Web Shell 作为首要客户端界面。** 半数的活跃 PR 都瞄准它:分屏导航、Web 预览、上下文用量 tab、git 远程管理、monitor/shell 任务输出、workflow-cockpit 打磨。Web Shell 正演化为一款长时运行的 work IDE,而不再只是一层薄薄的 CLI 前端。
- **多 agent 编排。** 两大重注——向其他编码 agent 的外部 ACP 委派（#11003）,以及带共享线程的产品内多 agent mesh（#11206）——清晰展现了从"一个模型 + 一个用户"向"一个用户 + N 个 agent + 跨工具委派"的转变。
- **守护进程 / 会话生命周期的韧性。** `activeWork` 恢复（#8586）、后台 shell 丢弃（#11119）、cron/goal/monitor 忙碌时的会话回收（#11118）、审批模式持久化（#11070）、通道 worktree 路由恢复（#11308）。所有这些都指向同一个主题:长寿、多回合的托管会话必须能够跨空闲、收割与冷恢复存活下来。
- **OpenTUI 取代 ink。** 随着 #8662 被立为追踪议题,且若干 CI 失败 PR 明确提到"E2E Interactive - OpenTUI renderer (bun)",渲染层迁移已成为测试矩阵上一项在飞的硬约束。
- **一等公民的本地 / OpenAI 兼容推理。** 反复出现的诉求包括:与 llama-server 更好的 sampler/grammar 兼容性（#10530、#10435）、`/effort` 向通用后端的传递（#11227）、用于按会话路由的 `customHeaders` 模板扩展（#10995）、面向本地主机的语义记忆 MCP（#10684）。

## 开发者痛点
- **0.22.3 中的本地推理回归。** 多位用户（Qwen 3.8 27b、Qwen 3.6 35b 通过 llama-server）现在都会遇到 `400 Failed to initialize samplers: failed to parse grammar`,而 Pi 和 OpenCode 不会触发——强烈指向 qwen-code 中的请求负载或 grammar 格式变更。
- **`/effort` 在 OpenAI 兼容后端被静默丢弃。** UI 会变化,但该值从未出现在 HTTP 请求中（#11227）,使得推理力度控制在阿里托管端点之外变得不可靠。
- **Windows / VS Code Companion 稳定性。** #11303 中的 conhost.exe 泄漏（12 小时后 347 个子进程、约 2.8 GB）这类回归会在 Windows 路径上迅速瓦解信任;一条 Windows 可靠性用户故事现已主导一条长评论线程。
- **守护进程托管的 Web Shell 陷入死锁。** 本该正常产生输出的后台 shell 在会话回收时被丢弃（#11119）,而运行 cron/goal/monitor/history 工作的会话也无法被回收（#11118）——两者叠加,让 `qwen serve` 在任何非平凡工作流上都显得不可靠。
- **Agent 误读 shell 输出（#3361）。** 在 OpenAI 兼容 API 下,模型会声称命令未返回结果,但实际输出可见——这是工具结果处理跨后端不一致的反复信号。
- **通道 / 钉钉生命周期可见性（#10504 PR）。** 对 Thinking / Reading / Searching / Running / Editing / Retrying 等本地化反应的需求表明,用户希望在聊天界面内获得实时、清洗过的生命周期提示——光有原始工具输出是不够的。
- **CI 抖动 vs. 真实缺陷的噪声。** 一长串 `qwen-main-ci-failure` 议题（#11197、#11203、#11210、#11219、#11231、#11249、#11040、#11307）——大多是 E2E Interactive OpenTUI 分片——表明渲染层迁移目前在主干 CI 上还是信噪比上的一笔税,而尚未成为用户侧的一笔税。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*