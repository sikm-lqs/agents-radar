# AI CLI 工具社区动态日报 2026-09-13

> 生成时间: 2026-09-12 23:30 UTC | 覆盖工具: 7 个

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

# AI CLI 工具横向对比报告 — 2026-09-13

## 1. 生态总览

AI CLI 生态已明确跨出单会话编码辅助阶段,全面迈向 **持久化的多智能体编排** —— 子智能体委派、后台任务以及远程/无头执行如今在每个追踪器上都占据主导。两大原型已经清晰分化:**第一方厂商工具**(Claude Code、Codex、Gemini CLI、Copilot CLI、Qwen Code)与模型订阅捆绑销售,以及 **与提供商无关的客户端**(OpenCode、Pi)凭借可扩展性和多供应商接入展开竞争。三大方向出现明显的趋同性投资:沙箱化/可插拔的执行环境、配额/成本透明度,以及让 CLI 变成可嵌入服务的程序化接口(RPC/ACP/app-server)。值得注意的是,用户已开始公开跨厂商比价 —— Codex 的 #45013 与 Claude Code 的 #93894 都把对方的定价模式当作基准来引用 —— 这意味着切换成本正在下降。

## 2. 活跃度对比

| 工具 | Issues (24h) | PRs (24h) | Discussions (24h) | 发版状态 |
|---|---|---|---|---|
| **Claude Code** | 10 热门(+8 ClAudit 集群) | 3 | N/A* | ✅ v2.1.270(回归补丁) |
| **OpenAI Codex** | 10 | 18(15+ 已合并) | 6 | — 无 |
| **Gemini CLI** | 10 | 14 | N/A* | ✅ v0.61.0-nightly(安全方向) |
| **Copilot CLI** | 8 | 3 | N/A* | — 无 |
| **OpenCode** | 10 | 9 | N/A* | — 无 |
| **Pi** | 10(已关闭 12) | 8(7 个实质性) | 3 | — 无 |
| **Qwen Code** | 10(+8 值得注意) | 22(10 个关键 + 12 个推进中) | N/A* | ✅ v0.23.3-nightly |

\* *源信息流中无 Discussions 数据 —— 标为 N/A,并非推断为不活跃。计数反映摘要层面浮现的活动,并非完整追踪器总量。Codex 与 Qwen Code 的 PR 合入吞吐最高;Pi 的分诊关闭率最高(24h 内关闭 12 个 issue)。*

## 3. 共性功能方向

1. **子智能体编排的可靠性与可观测性** —— 最普遍的共同短板。
   - Gemini CLI:无限期挂起 (#21409)、MAX_TURNS 误报成功 (#22323)、已配置智能体调用不足 (#21968)
   - Qwen Code:委派过程中 todo 计划陈旧 (#10953);为子智能体提供容器执行 (#11711)
   - OpenCode:子智能体 ID 对模型不可见 (#36761);错误被伪装为成功 (#38866)
   - Copilot CLI:子智能体的工具调用突发会破坏 prompt 缓存 (#4829)

2. **配额/成本透明度** —— 对长期用户怨言的直接回应。
   - Codex:指挥中心展示 token/USD (#44970)、精确的历史 token 估算 (#45094) —— 都是对 #41220(40 条评论)的直接回应
   - Claude Code:Fable 5.1 预算爆表 (#93894)、token 消耗回归 (#84750)
   - Copilot CLI:按阶段 OTel 发出模型/判定/积分信息 (#4825)
   - Qwen Code:为延迟工具保留 prompt 缓存 (#10410)

3. **沙箱化 / 可插拔执行环境。**
   - Qwen Code 的 #11695 伞形议题(本地/容器/SSH 后端,#11711/#11746)最为雄心勃勃;Gemini CLI 完成了隔离运行时状态的沙箱重写 (#29214)并将 `--yolo` 映射到统一的策略引擎 (#29287);Codex 正在硬化 deny 规则处理 (#43929)

4. **程序化/无头接口(RPC、ACP、app-server)。**
   - Pi 的 `--mode rpc` 已成为第三方项目的骨干 (#9525);Qwen Code 提议通过 ACP 在 `qwen serve` 上构建 Android 瘦客户端 (#11704);Codex 在打磨 app-server 任务生命周期 (#44969、#45124、#25383);Gemini CLI 存在与 Zed 的 ACP session-ID 互操作阻塞 (#29288)

5. **MCP 正确性** —— Gemini CLI (#29200、#29205)、Qwen Code (#7771、#11499、#11718、#10834)、Copilot CLI (#4759)、OpenCode(53 次重复的 MCP 进程拉起,#43845)。

6. **终端/TUI 健壮性** —— 静默退出与渲染 Bug 在各家反复出现:Qwen 的 React #185 崩溃 (#11500/#11732)、Gemini 的闪烁与卡死 shell Bug (#29294、#25166)、Pi 的全屏滚动回归 (#9052)、Claude Code 的 OSC 8 statusline 回归 (#70161)。

## 4. 差异化分析

| 工具 | 重力中心 | 差异化信号 |
|---|---|---|
| Claude Code | 企业/云端会话(Cowork)、桌面端 | 唯一长期存在 **安全过滤过度触发**(ClAudit 集群)的工具,且具备 `--worktree`/FleetView 车队编排能力;auth-token 泄漏 (#79427) 是独有的 CI/多账户风险 |
| Codex | 多面管理的消费级产品 | 最高的功能迭代速度;通过 app-server 收敛 CLI/桌面/iPad 入口;备受争议的 **宠物 UI** 移除请求是点赞最高的议题(48👍,#34349) |
| Gemini CLI | 安全与策略架构 | 唯一把 **prompt 注入防御**(#29250)和策略引擎统一作为发布主线的追踪器;战略性 AST 感知工具史诗级任务 (#22745) 瞄准 token 效率 |
| Copilot CLI | 多模型路由调度器 | 设计上即模型无关 —— issue 中引用 `claude-opus-5` 和 Gemini 3.8 Flash;差异点在于可观测性(OTel)与协议正确性,而非模型接入 |
| OpenCode | 与提供商无关的桌面/TUI | BYOK 重点(NVIDIA、DeepSeek、本地提供商);**剪贴板失败类问题**(131 条评论的 #4283)仍是其标志性短板 |
| Pi | 可扩展性优先的客户端 | 正在接入 **订阅制 OAuth 提供商**(Meta Muse #9096、Google Antigravity 与 Cursor Pro #9529) —— 把消费级订阅聚合为模型访问;会话树分叉的人机工程 |
| Qwen Code | 执行环境隔离 | 本周期最具架构魄力的动作:通过容器/SSH 后端将智能体底座与执行解耦 (#11695);同时背负最严重的 **遥测隐私缺陷**(#11198) |

## 5. 社区势头与成熟度

- **量级领先(成熟、高噪点):** Claude Code 与 Codex。Claude Code 的 #80444(111 条评论)和 Codex 的 #41220(40 条评论)显示出庞大而活跃的用户群 —— 但也伴随着长期悬而未决的平台痛点。
- **迭代最快:** Codex(每天 15+ 个 PR 合入)与 Qwen Code(22 个推进中 PR)以周为周期推送架构级变更;Gemini CLI 的每夜构建节奏以生产级质量交付安全硬化。
- **规模小但响应极快:** Pi —— 24h 内关闭 12 个 issue、维护者标记的 `[inprogress]` 条目,以及基于其 RPC 接口构建产品的第三方。
- **资源相对于用户群不足:** OpenCode —— 一个 131 条评论、123 赞的剪贴板 Bug 至今仍 open,说明这里存在深层次的跨平台技术难题或资源缺口。
- **最安静的追踪器:** Copilot CLI —— 活动处于分诊阶段,PR 由 Dependabot 主导;功能请求 (#4830、#4825) 合情合理,但节奏明显慢于同行。

## 6. 趋势信号

1. **成本归因正在成为基本要求。** 每家厂商都在用户压力下构建 token/成本展示(Codex #44970、Copilot #4825、Qwen #10410)。对团队而言:预算监控应从厂商仪表盘迁移到你们自己的 OTel 流水线。
2. **智能体底座正与执行环境分离。** Qwen 的容器/SSH 后端、Gemini 的沙箱重写以及 Codex 的沙箱硬化都指向同一个方向:工具调用将在隔离的、可寻址的运行时中执行。在做自动化设计时应假设隔离,而非共享进程状态。
3. **CLI 正在变成服务。** RPC(Pi)、ACP(Qwen、Gemini/Zed)和 app-server(Codex)接口意味着无头集成是增长前沿 —— 但每家都存在生命周期 Bug(Gemini #29288、Codex #45131)。把异步/无头流程视为早期阶段。
4. **订阅聚合正在兴起。** Pi 接入 Meta/Cursor/Google OAuth 提供商预示着未来客户端将通过消费级订阅路由,而不仅仅是 API key —— 这是值得关注的定价颠覆变量。
5. **状态字段会撒谎;静默失败是占主导地位的失败类别。** 假成功(Gemini #22323、OpenCode #38866)、卡死的"Working"状态(Pi #4945、Codex #44781、Copilot #4824)、错报的使用上限(Claude #77469)都意味着下游自动化必须独立校验结果,绝不能信任智能体的自报。
6. **Windows 是七个工具共同的薄弱平台**(Claude #80444、Codex 的回归集群、OpenCode #35258、Pi #9262、Qwen #11724)。对 Windows 优先的团队而言,Linux/WSL 与本地原生之间的不匹配仍是实际存在的选型标准。
7. **安全审视的对象正转向工具自身:** prompt 注入(Gemini #29250)、遥测泄漏(Qwen #11198)、auth-token 继承(Claude #79427)、Actions 供应链固定(Copilot #4808)。在企业部署之前,厂商 CLI 的遥测默认值值得做一次审计。

**结论:** Codex 与 Qwen Code 迭代最快;Gemini CLI 在安全架构上领先;Claude Code 占据企业入口但背负最重的历史 Bug 负担;Pi 与 OpenCode 证明了多提供商客户端这一细分赛道是可行的 —— Pi 靠可扩展性,OpenCode 则尽管背负剪贴板债。对评估者而言,2026 年的差异化要素是配额透明度、执行隔离与程序化接口的成熟度,而不再是单纯的模型接入。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区亮点报告
*数据截止 2026-09-13*

---

## 1. 热门 Skills 排名（最受关注的 PR）

**注：** 所提供的 PR 列表中所有条目均显示 "Comments: undefined"，因此排名依据信号密度（更新时效、多次更新以及与高流量 Issue 的关联度）进行评定。所有列出的 PR 均为 OPEN 状态。

| 排名 | PR | Skill / 主题 | 状态与亮点 |
|------|----|--------------|---------------------|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | **skill-creator 修复 — `run_eval.py` 召回率为 0%** | OPEN。解决了 [#556](https://github.com/anthropics/skills/issues/556)（12 条评论，10+ 次复现）。修复了 Windows 流读取、触发检测、并行 worker。关键在于 `improve_description.py` 和 `run_loop.py` 此前一直在针对噪声进行优化。 |
| 2 | [#1628](https://github.com/anthropics/skills/pull/1628) | **Hivemind — 零成本多智能体编排** | OPEN。让 Claude Code 使用免费模型将机械性工作委派给无头 opencode worker，同时自身保持唯一的规划者/评审者角色。一种新颖的多智能体委派模式。 |
| 3 | [#1615](https://github.com/anthropics/skills/pull/1615) | **scnet-hpc — SCNet HPC 集群 skill** | OPEN。基于 profile 的 SSH 与 Slurm 工作流，分区/内存/模块/加速器指引，计算节点发现。面向 HPC 用户的垂直 skill。 |
| 4 | [#514](https://github.com/anthropics/skills/pull/514) | **document-typography — 排版质量控制** | OPEN。防止 Claude 生成的每个文档出现单词孤立换行、孤行段落、编号错位。通用质量层。 |
| 5 | [#486](https://github.com/anthropics/skills/pull/486) | **ODT — OpenDocument 文本 skill** | OPEN。支持 `.odt` 与 `.ods` 的创建/填充/解析。ISO 标准开放格式补足了现有的 DOCX/PDF skills。 |
| 6 | [#210](https://github.com/anthropics/skills/pull/210) | **frontend-design 清晰度与可执行性** | OPEN。修订 frontend-design，使每条指令都能在单次对话中可执行；从描述性转向操作性。 |
| 7 | [#1367](https://github.com/anthropics/skills/pull/1367) | **self-audit — 机械式验证 + 推理门控 v1.3.0** | OPEN。通用质量门控（适用于任何技术栈/模型）。由 [#1385](https://github.com/anthropics/skills/issues/1385) 支撑。 |
| 8 | [#1627](https://github.com/anthropics/skills/pull/1627) | **buffer-api — Buffer GraphQL 调度** | OPEN。可移植的智能体 skill，用于社交调度；兼容 Claude/Cursor/Codex/OpenClaw/Hermes/n8n — 早期的 MCP 风格可移植模式。 |

---

## 2. 社区需求趋势（来自 Issues）

- **安全与信任边界** — [#492](https://github.com/anthropics/skills/issues/492)（43 条评论，最高热度 Issue）：社区 skills 冒充 `anthropic/` 命名空间。这是整个仓库中讨论最为集中的问题。
- **组织级分发与生命周期** — [#228](https://github.com/anthropics/skills/issues/228)（16 条评论）：在 Claude.ai 中实现组织级 skill 共享；[#62](https://github.com/anthropics/skills/issues/62)（10 条评论）：skills 无故消失。**安装 / 共享 / 版本管理** 是一个明确的痛点。
- **评估与自改进基础设施** — [#556](https://github.com/anthropics/skills/issues/556)（12 条评论）：`run_eval.py` 从不触发；[#1390](https://github.com/anthropics/skills/issues/1390)：`evaluation.py` 静默捏造错误；[#202](https://github.com/anthropics/skills/issues/202)（CLOSED）：skill-creator 应以最佳实践的形式可运行，而非仅仅是一份文档。对**可靠的描述优化与评估工具链**的需求强烈。
- **推理质量门控 / 治理** — [#1385](https://github.com/anthropics/skills/issues/1385) 与 [#1329](https://github.com/anthropics/skills/issues/1329)（compact-memory，9 条评论）：关于任务前校准、对抗性评审、符号化智能体状态的提案。
- **Token 效率 / 上下文整洁** — [#1487](https://github.com/anthropics/skills/issues/1487)：`claude-api` 在一次工具调用中注入了约 156k tokens；[#189](https://github.com/anthropics/skills/issues/189)：在 `document-skills`/`example-skills` 中存在重复的 skills。社区希望**精简 skill 加载与去重**。
- **可移植性 / 部署** — [#16](https://github.com/anthropics/skills/issues/16)：将 Skills 暴露为 MCPs；[#29](https://github.com/anthropics/skills/issues/29)：Bedrock 使用场景。跨运行时、跨云的 skill 可移植性。

---

## 3. 高潜力待合并 Skills

这些 OPEN PR 基于 Issue 关联度、近期活跃度与评审势头，最有可能近期合入：

| PR | Skill | 高潜力原因 |
|----|-------|---------------------|
| [#1742](https://github.com/anthropics/skills/pull/1742) | **mcp-builder — `mcp>=2` 兼容性** | 直接修复 [#1668](https://github.com/anthropics/skills/issues/1668)；更新于 2026-09-11。mcp>=2 版本线的必需前置。 |
| [#1734](https://github.com/anthropics/skills/pull/1734) | **docx — 孤立评论检测** | 时间较新（2026-09-06）且持续活跃。目标明确、低风险的 DOCX 健壮性修复。 |
| [#1724](https://github.com/anthropics/skills/pull/1724) | **mcp-builder — 默认模型 → claude-sonnet-5** | 简洁直接的现代化更新；与 [#1607](https://github.com/anthropics/skills/pull/1607)（标记已弃用模型）配合。 |
| [#1607](https://github.com/anthropics/skills/pull/1607) | **claude-api — 标记已弃用模型** | 关闭 [#1603](https://github.com/anthropics/skills/issues/1603)；低风险的文档/数据修复。 |
| [#1602](https://github.com/anthropics/skills/pull/1602) | **mcp-builder 评估序列化/编码** | 应对 [#1390](https://github.com/anthropics/skills/issues/1390)；影响范围广，显著提升可靠性。 |
| [#1099](https://github.com/anthropics/skills/pull/1099) / [#1050](https://github.com/anthropics/skills/pull/1050) | **skill-creator 的 Windows 兼容性** | 与 [#1298](https://github.com/anthropics/skills/pull/1298) 和 [#556](https://github.com/anthropics/skills/issues/556) 存在重叠；很可能被整合进那个总括性修复中。 |
| [#1595](https://github.com/anthropics/skills/pull/1595) | **docs — 新增 UIZZE 合作伙伴 skill** | 轻量的合作伙伴列表更新。 |
| [#83](https://github.com/anthropics/skills/pull/83) | **skill-quality-analyzer + skill-security-analyzer** | 长期挂起的 meta-skills；社区对安全分析器（#492）有明确需求 — 高度契合。 |

---

## 4. Skills 生态洞察

> 社区最集中的需求是 **Skills 自身的信任、安全与可靠性基础设施** —— 命名空间真实性（Issue #492）、Windows 及跨平台稳定性（PR #1050/#1099/#1298），以及可信赖的评估工具链（Issues #556/#1390）—— 其优先级高于对新的领域特定能力的需求。

---

# Claude Code 社区动态 — 2026-09-13

## 今日要点

今日发布的 **v2.1.270** 快速修复了 2.1.269 引入的一个回归问题：只读 git 命令在会话运行到一半时意外地弹出权限询问。与此同时，社区仍然聚焦于三个长期未决的痛点：Windows 桌面端 GPU 进程崩溃未解决（#80444，111 条评论）、Cowork/云会话的 GitHub 集成脆弱（#84581、#91805），以及订阅套餐上使用 Fable 5.1 模型带来的成本焦虑（#93894）。

## 发布

### v2.1.270
- 修复了 Bash 中只读 git 命令在会话运行一段时间后意外地请求权限的问题（2.1.269 引入的回归）。
- 📦 [Release](https://github.com/anthropics/claude-code/releases/tag/v2.1.270)

## 热门 Issue

1. **[#80444 — 桌面应用 GPU 崩溃导致 MSIX 在 Windows 上无法启动](https://github.com/anthropics/claude-code/issues/80444)** *(OPEN, 111 条评论, 👍17)*
   目前为止 issue 跟踪器中讨论最热烈的帖子。基于 Electron 的桌面应用会在应用内的 Browser 标签页中崩溃（NVIDIA RTX 2080, Win 11），破坏 MSIX 状态（`appxState=2`），直到用户运行修复才恢复。拥有 17 个点赞和持续每天的更新，这是 Windows 桌面用户最关心的阻断性问题。

2. **[#84581 — Cowork 云会话无法访问任何 GitHub 仓库](https://github.com/anthropics/claude-code/issues/84581)** *(OPEN, 8 条评论, 👍5)*
   git 代理让 agent 去调用一个不存在的 `add_repo` 工具，导致云会话实际上无法对任何仓库进行操作。与 #91805 和 #86828 直接相关。

3. **[#93894 — Fable 5.1 单次审查就烧光 $100/月的会话预算](https://github.com/anthropics/claude-code/issues/93894)** *(OPEN, 2 条评论)*
   反映了一个日益增长的定价/UX 抱怨：在 Fable 5.1 上执行高强度任务会消耗完 $100 档位的全部会话额度，用户明确地将 Anthropic 与 OpenAI 的每周限额模式进行不利的对比。

4. **[#91805 — Claude Code 网页仓库选择器中没有仓库](https://github.com/anthropics/claude-code/issues/91805)** *(OPEN, 3 条评论)*
   即便已经安装了 GitHub App，网页端用户仍然看到空的仓库列表。这是 web/Cowork 的 GitHub 集成体验支离破碎的又一个佐证。

5. **[#79427 — 共享的 `claude daemon` 跨会话泄漏 `ANTHROPIC_AUTH_TOKEN`](https://github.com/anthropics/claude-code/issues/79427)** *(CLOSED, high-priority)*
   一个安全回归：首个会话中携带认证信息的环境变量被后续所有由 daemon 派生出的会话继承，导致静默的错账号计费。打上了 `area:security` 和 `high-priority` 标签。

6. **[#86280 — macOS 更新/重启后所有 Cowork 项目丢失](https://github.com/anthropics/claude-code/issues/86280)** *(CLOSED, `data-loss`)*
   本地代理模式的会话被重建为空，`cleanupPeriodDays=30` 的默认值静默地清除了会话记录。这提醒我们：留存策略需要对用户可见。

7. **[#86828 — 云会话的 GitHub 网关覆盖了 "Full" 网络访问](https://github.com/anthropics/claude-code/issues/86828)** *(CLOSED)*
   出站代理对 GitHub 进行了硬编码的特殊处理，无视了环境中 "Unrestricted" 的网络策略，并且吞掉了用户的 Authorization 头。再次印证了 Cowork/网络这一痛点。

8. **[#93124 — Claude in Chrome 在 WSL 中无法使用；桌面应用强制使用 WSL 运行时](https://github.com/anthropics/claude-code/issues/93124)** *(OPEN, has repro)*
   在 Windows + WSL2 下，浏览器工具无法使用，因为 agent 是在 WSL 中启动的，而 Chrome 集成在其中被自动禁用。另见 #79655。

9. **[#84750 — Token 消耗异常回归](https://github.com/anthropics/claude-code/issues/84750)** *(CLOSED)*
   过去两周每个任务的 Token 消耗大约翻了一倍；用户引用了 #13552。成本透明度的回归问题是一个反复出现的类别。

10. **[#70161 — Statusline OSC 8 超链接无法点击（2.1.181 中的回归）](https://github.com/anthropics/claude-code/issues/70161)** *(CLOSED, has repro)*
    自定义状态栏程序发出的 OSC 8 超链接现在被渲染为纯文本。一个小但明显的体验回归，影响许多使用自定义状态栏的重度用户。

> 用户 `@sworrl` 提交的一组值得关注的相关 issue（#85369、#85354、#85385、#85365、#85381、#85352、#85348、#85346）报告了 **ClAudit 误报**：将合法的系统管理工作（UDR 网络配置、AD 操作、MySQL 安装）误判为网络/AUP 违规，并直接终止会话。如果你从事运维/安全相关工作，建议了解一下。

## 关键 PR 进展

1. **[#93452 — `mods/diff`：对齐内置的 `/diff` 面板](https://github.com/anthropics/claude-code/pull/93452)** *(CLOSED)*
    将 `/diff` mod 面板与原生面板对齐：引擎代码元素的 hunk、内置的 ✕ 关闭按钮、行间距、空状态位置、窄终端重绘时的边线，以及单次进行中的仓库探测。减少了 mod 与原生 UI 之间的体验差异。

2. **[#93912 — `mods`：diff、sec-default 和 telemetry 的单元测试](https://github.com/anthropics/claude-code/pull/93912)** *(CLOSED)*
    测试现在在 mod 实际运行的位置执行，使用引擎的 `$` 与 hook 注册机制。可通过 `claude plugin test <dir>` 运行。这表明插件/mod 的测试基础设施正在日趋成熟。

3. **[#61716 — docs：针对上下文溢出导致的虚假用量限制的故障排查文档](https://github.com/anthropics/claude-code/pull/61716)** *(OPEN)*
    文档说明：1M 上下文窗口下 `/compact` 失败被错误地映射为 "用量已达上限" 错误，并提供了临时解决办法。关闭了 #50321 — 这是社区撰写的文档填补令人困惑的 UX 空白的一个很好的例子。

> 注：过去 24 小时内只有 3 个 PR 有更新；以上部分反映了完整的内容。

## 功能请求趋势

通览开放的 issue 和最近的请求，最强烈的诉求集中在：

- **Claude in Chrome 在 WSL/Windows 原生流程下的体验** — 既有稳定性报告（#93124）也有增强请求（#79655）呼吁获得一等公民的支持；用户目前不得不借助 WSLg 退回到原生 Linux Chrome 作为变通方案。
- **Cowork 的持久性与可靠性** — 跨会话持久化的开放任务（#93910）、更好的数据丢失保护（#86280）、以及集成的 GitHub 仓库选择器（#91805/#84581）都指向同一个事实：Cowork 需要作为主力界面而非 beta 来加固。
- **可预测的成本与用量上限 UX** — Fable 5.1 预算爆掉（#93894）、token 消耗回归（#84750）、以及相互矛盾的额度重置时间提示（#77469、#74165）都指向同一个需求：产品内需要一个成本/额度解释层。
- **FleetView / agent 视图的可用性** — 独立置顶区段的渲染（#83013）、可达的置顶会话（#86864）、以及 `--worktree` 下不泄漏的 `/exit` 语义（#82192）。
- **文档与故障排查入口** — 社区 PR（#61716）和反复出现的"虚假用量上限"报告表明：一个专门针对额度/认证/权限错误的故障排查章节已经迫在眉睫。

## 开发者痛点

- **权限回归打乱工作流。** 只读 git 上的权限提示（v2.1.269 → v2.1.270）和陈旧的工作区信任对话框（#86857）反复打断长时间运行的会话。
- **Cowork / 云会话的 GitHub 集成很脆弱。** 三个开放的 issue（#84581、#91805、#86828）都在描述"代理吞掉、重定向或无法枚举 GitHub"的不同变体，使得云会话成为本地 CLI 的糟糕替代。
- **用量上限的提示信息不可靠。** 重置时间可能比实际恢复时间晚 3–4 小时（#77469、#74165），`/compact` 失败被误报为用量上限 — 用户在等待中损失了真正的工作时间。
- **成本回归不透明。** 单任务 token 用量飙升（#84750）以及高强度模型在单个任务中耗光预算（#93894），都没有按任务粒度的成本预览。
- **安全过滤器对合法运维工作过度触发。** 一波 ClAudit 误报将网络诊断、AD 操作、MySQL 安装以及密钥相关工作流标记为网络/AUP 违规并终止会话。
- **Windows 上的跨平台缺口。** 桌面端的 GPU 崩溃（#80444）、后台 PTY 主机引发的 `pwsh` 窗口闪烁（#78189）、以及 Claude in Chrome 在 WSL 上不可用（#93124/#79655），共同使 Windows 成为最坎坷的平台。
- **Cowork 中的数据丢失风险。** 静默的 30 天会话记录清理以及重启后丢失的本地模式会话（#86280）正在侵蚀用户对桌面产品的信任。
- **认证/计费的卫生。** 共享 daemon 的环境变量泄漏（#79427）是一个高优先级安全回归 — 任何运行多账号或 CI 池的人都应该固定版本并审计环境变量的作用域。

*源信息流中未提供讨论数据，因此本期摘要略过 Discussions 部分。*

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-13

## 1. 今日要点

Codex 团队合并了 **15+ 个 PR**，重点围绕 Agent 命令中心、上下文快照以及回顾体验的优化——包括 token/费用展示、模型分组，以及对外部管理任务的只读历史支持。社区方面，**持续的配额/计费不一致问题**（issue #41220 评论数已达 40 条）以及桌面客户端上**Windows 特定的应用回归**仍是焦点。好消息是，请求**完全禁用"Pets"界面**的功能请求（#34349）以 48 👍 成为本周获赞最多的条目。

## 2. 版本发布

*过去 24 小时内无新版本发布。*

## 3. 热门 Issue

1. **[#41220](https://github.com/openai/codex/issues/41220) — Codex 配额/用量异常消耗（Meta）**
   用于追踪用户订阅配额消耗远高于预期的跨报告工单。40 条评论，14 👍——目前社区呼声最高的抱怨，揭示 Pro/Plus/Max 各档位之间存在系统性的用量计费不一致。

2. **[#34349](https://github.com/openai/codex/issues/34349) — 允许用户完全禁用 Pets**
   请求彻底移除 Pets 界面的功能请求。**48 👍**（本期最高）——反映该功能徒增侧边栏冗余、无明确生产力价值的强烈情绪。

3. **[#25820](https://github.com/openai/codex/issues/25820) — Codex CLI 登录被手机验证速率限制阻塞**
   Pro 订阅用户无法完成 `codex login` → "Sign in with ChatGPT"。15 条评论——反复出现的认证摩擦正在阻碍付费用户采用 CLI。

4. **[#44781](https://github.com/openai/codex/issues/44781) — 编辑/重发队列中的消息触发 "App-server queued follow-up no longer exists"**
   Windows 桌面端用户无法稳定地编辑已排队提示。17 👍 表明影响面相当广。

5. **[#43924](https://github.com/openai/codex/issues/43924) — GPT 难以访问浏览器标签页**
   桌面浏览器集成在 Apple silicon 上不稳定——影响希望使用浏览器访问功能的 Max 订阅用户。

6. **[#41695](https://github.com/openai/codex/issues/41695) — iPad 应用在远程 Codex 会话下冻结**
   iPadOS 27 beta 用户在访问远程会话时频繁遇到冻结——移动端关键工作流被打断。

7. **[#43938](https://github.com/openai/codex/issues/43938) — Codex 工具 IPC 解码失败（`failed to decode code-mode`）**
   Linux app-server 26.901.51231 上每一次工具调用都失败——企业用户面临的硬性阻塞。

8. **[#42973](https://github.com/openai/codex/issues/42973) — 回归：无头 SSH 任务丢失 thread/delegation 工具**
   桌面端更新后，远程 SSH 工作流静默丢失 `send_message_to_user` 和 delegation 工具——对 HPC/远程用户而言是一次重大破坏。

9. **[#45073](https://github.com/openai/codex/issues/45073) — 5 小时窗口 ~86% 在 ~26 分钟内被消耗，仅发送 2 条提示**
   `gpt-5.6-sol medium fast`（CLI 0.154.0，Windows）上出现极端配额消耗。以一个可复现的具体数据点加剧了元问题 #41220。

10. **[#43929](https://github.com/openai/codex/issues/43929) — Linux 沙箱在多个拒绝文件下出现 `bwrap "Bad file descriptor"`**
    当工作区中存在 2 个及以上匹配 `deny` 文件系统规则的文件时，沙箱在启动时中止——一个带有安全影响的配置正确性缺陷。

## 4. 关键 PR 进展

1. **[#45124](https://github.com/openai/codex/pull/45124) — 新增异步用户消息的功能开关**
    新增默认关闭的 `send_message_to_user_async` 开关，使根 Agent 能够在无目录支持下使用异步消息——为异步问题流奠定基础设施。

2. **[#45094](https://github.com/openai/codex/pull/45094) — 基于内容而非序列化包络来估算历史 token**
    更准确的 token 计量（排除消息 ID、元数据、JSON 转义）。与 #41220 的配额投诉直接相关。

3. **[#44970](https://github.com/openai

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-13

## 今日要点
nightly 版本 v0.61.0 带来了两项重要的安全加固改动——针对经由构建文件修改和不可信标志实施的间接提示注入的缓解措施(PR #29250),以及一次将运行时状态与宿主配置目录隔离开来的沙箱重写(PR #29214)。与此同时，智能体可靠性依然是最主要的话题：通用智能体挂起问题(#21409)与 MAX_TURNS 状态误报缺陷(#22323)持续获得维护者的积极关注，这表明子智能体编排是整个代码库中迭代最活跃的领域。

## 版本发布

**v0.61.0-nightly.20260912.g9c1b0a610** — [发布](https://github.com/google-gemini/gemini-cli/releases/tag/v0.61.0-nightly.20260912.g9c1b0a610)
- [`#29250`](https://github.com/google-gemini/gemini-cli/pull/29250) **fix(core): 防止通过构建文件修改和不可信标志实施间接提示注入** (@villahernandez-coder) — 封堵了这样一个攻击向量：构建脚本和不受信任的 CLI 标志此前能够把提示内容夹带进模型上下文。
- [`#29214`](https://github.com/google-gemini/gemini-cli/pull/29214) **fix(sandbox): 强化文件系统边界并隔离运行时状态** (@diegogodinezr) — 以净化后的配置取代宿主目录挂载，并将路径敏感性检查统一为基于 realpath 的解析。

## 热门议题

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子智能体在达到 MAX_TURNS 后仍报告 GOAL 成功(p1,13 条评论)** `area/agent, kind/bug`
   `codebase_investigator` 的结果文本明明写着轮次已耗尽，却仍以 `status: "success"` 收尾。这个问题很关键，因为它会静默掩盖真实的失败，破坏信任该状态字段的下游自动化。

2. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用智能体无限期挂起(p1,8 条评论，👍8)** `area/agent, kind/bug`
   当模型把任务委托给通用子智能体时，哪怕是简单的创建文件夹任务也永不终止；有用户等了一个小时。社区高度认同：这是影响日常使用的阻塞性回归。

3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖的操作系统级沙箱与执行后意图路由(p2,9 条评论)** `area/agent, kind/enhancement, effort/large`
   提议让 Gemini 3 在不牺牲安全性的前提下发挥其原生的 bash 亲和性。这是一个把模型能力、沙箱与命令后处理串联起来的战略方向。

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC:AST 感知的文件读取、搜索与映射(p2,7 条评论)** `area/agent, kind/feature`
   追踪一项关于 AST 驱动工具的调研(精准读取、节省 token、代码库映射)。关联的姊妹 epic:[#22746](https://github.com/google-gemini/gemini-cli/issues/22746),主题是使用 tilth/glyph。

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 对自定义技能和子智能体的调用不足(p2,6 条评论)** `area/agent, kind/bug`
   模型只有在被明确指示时才会调用已配置的技能/智能体。缺失的一环是“披露”——这指向了提示工程在可发现性上的缺口。

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — 确定性脱敏 + 精简 Auto Memory 日志(p2,5 条评论)** `area/security, kind/bug`
   Auto Memory 目前依赖模型侧的事后脱敏步骤；在该步骤运行之前，会话记录(以及既有技能内容)可能先泄露到日志中。

7. **[#29288](https://github.com/google-gemini/gemini-cli/issues/29288) — Zed 下 ACP 会话加载报 "Invalid session identifier" 失败(p1,4 条评论)** `area/non-interactive, kind/bug`
   以 Zed 作为 ACP 客户端时无法恢复任何会话，原因是智能体写入了自行生成的 `sessionId`,而不是客户端提供的 ID。这是编辑器集成方面一个具体的互操作性阻塞点。

8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令完成后卡在 "Awaiting user input"(p1,4 条评论，👍3)** `area/core, kind/bug`
   即便是最简单的非交互式命令，完成后 shell 仍被标记为活动状态。由于复现频繁，它已成为用户最直观可见的头号困扰之一。

9. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522) — Auto Memory 对低价值会话无限重试(p2,4 条评论)** `area/agent, kind/bug`
   被提取器判定不读取的会话会永远停留在“未处理”状态，并不断在收件箱中重新出现。

10. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) — browser_agent:自动会话接管与锁定恢复(p3,4 条评论)** `area/agent, kind/feature`
    当前在持久化配置文件被锁定时会直接快速失败；用户希望能优雅地接管孤立的会话。

## 关键 PR 进展

1. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250) — fix(core): 防止通过构建文件修改和不可信标志实施间接提示注入** *开放中，p1* — 安全：封堵了一条经由项目构建配置实施的提示注入路径。

2. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214) — fix(sandbox): 强化文件系统边界并隔离运行时状态** *已关闭* — 沙箱重写：基于 realpath 解析的路径检查、净化后的配置注入、运行时状态与宿主机隔离。

3. **[#29294](https://github.com/google-gemini/gemini-cli/pull/29294) — fix(cli): 防止因 stdout 争用和光标焦点导致的终端闪烁** *开放中，p2* — 诊断出两个 ink-reconciler 瓶颈(stdout 争用 + 光标焦点)，它们会在后台命令运行期间快速输入时造成画面撕裂。关闭 [#29295]。

4. **[#29217](https://github.com/google-gemini/gemini-cli/pull/29217) — fix(config): 不再改写显式指定的 `gemini-2.5-flash` 模型选择** *开放中，p1/p2* — `isFlashModel()` 的 `endsWith('flash')` 启发式判断曾把显式锁定的 2.5 Flash 静默升级；现在由一个精确匹配守卫来保留用户意图。

5. **[#29287](https://github.com/google-gemini/gemini-cli/pull/29287) — feat(policy): 将 `--yolo` 映射为 `allowedTools: ["*"]` 策略** *已关闭，xl* — 移除了特殊的 `ApprovalMode.YOLO` 状态，改用统一的策略引擎通配符；实现 [#11303]。

6. **[#29201](https://github.com/google-gemini/gemini-cli/pull/29201) — fix(cli): 在确认重试之间保留已批准的 shell 命令** *开放中，p1/p2* — 修复了这样一个循环：TOML 命令中的多个 `!{...}` 注入即使选择了 "always allow" 仍会不断弹出确认。

7. **[#29203](https://github.com/google-gemini/gemini-cli/pull/29203) — fix(security): 剥离携带额外标志的 shell 包装器** *开放中，p2* — `stripShellWrapper` 现在即使存在额外标志也能识别 `bash -c` / `powershell … -Command`,从而让策略正确地重新检查内部命令。

8. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200) — fix(core): 在运行时统一执行 MCP 策略** *开放中，p2* — 服务器名称匹配改为不区分大小写并去除首尾空白；显式置空的 `mcp.allowed` 列表现在按 fail-closed 处理。

9. **[#29208](https://github.com/google-gemini/gemini-cli/pull/29208) — fix(core): agents.json 结构非法时回退为空** *开放中，p2* — 损坏的 `agents.json`(例如 `null`、标量或数组)不再使 `isAcknowledged`/`acknowledge` 崩溃；关闭 [#29207]。

10. **[#29205](https://github.com/google-gemini/gemini-cli/pull/29205) — fix(cli): 提交 MCP 提示文本时不进行 JSON 编码** *开放中，p2* — `McpPromptLoader` 此前会对响应做双重编码；现在内嵌的引号和换行符会按 MCP 服务器返回的原样保留。

*(值得一提:[#29292](https://github.com/google-gemini/gemini-cli/pull/29292) 为 checkpoint 历史增加了数组形状守卫；[#29211](https://github.com/google-gemini/gemini-cli/pull/29211) 禁止在状态更新器内部再调度状态更新;[#29114](https://github.com/google-gemini/gemini-cli/pull/29114) 为重复的 `handleExit` 添加重入守卫;[#29118](https://github.com/google-gemini/gemini-cli/pull/29118) 扩展仓库解析现在仅将 `.git` 视为结尾后缀。)*

## 功能请求趋势

- **子智能体可观测性与编排** — 通过 `/chat share` 呈现执行轨迹([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)),`/bug` 报告中携带子智能体上下文([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)),基于原生文件的任务跟踪([#21000](https://github.com/google-gemini/gemini-cli/issues/21000)),以及对自身标志/快捷键有感知的使用指引([#21432](https://github.com/google-gemini/gemini-cli/issues/21432))。
- **更智能的工具选择** — 当工具数量超出 API 限制时自动裁剪([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)),以及 AST 感知的读取/搜索以减少 token 洪流([#22745](https://github.com/google-gemini/gemini-cli/issues/22745)、[#22746](https://github.com/google-gemini/gemini-cli/issues/22746)、[#19561](https://github.com/google-gemini/gemini-cli/issues/19561))。
- **沙箱与执行安全** — 在保留 bash 亲和性的前提下进行操作系统级沙箱([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)),以及对破坏性命令的劝阻([#22672](https://github.com/google-gemini/gemini-cli/issues/22672))。
- **记忆系统质量** — 更好的脱敏、重试上限，以及对无效补丁的隔离([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)、[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)、[#26523](https://github.com/google-gemini/gemini-cli/issues/26523)、[#26516](https://github.com/google-gemini/gemini-cli/issues/26516))。
- **编辑器/ACP 集成** — 跨 ACP 传输的持久化、由客户端确立的会话标识符([#29288](https://github.com/google-gemini/gemini-cli/issues/29288) 呼应了这一点)。
- **UI/UX 打磨** — 无闪烁的终端尺寸调整([#21924](https://github.com/google-gemini/gemini-cli/issues/21924))与持久化的 `/compress`([#21335](https://github.com/google-gemini/gemini-cli/issues/21335))。

## 开发者痛点

- **子智能体可靠性**是反馈最集中的摩擦点：无限期挂起([#21409](https://github.com/google-gemini/gemini-cli/issues/21409))、虚假的成功报告([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)),以及模型无视已配置的智能体/技能([#21968](https://github.com/google-gemini/gemini-cli/issues/21968))。
- **浏览器智能体**问题反复出现——Wayland 下的失败([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)),`settings.json` 覆盖项被忽略([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)),以及锁定配置文件造成的死局([#22232](https://github.com/google-gemini/gemini-cli/issues/22232))。
- **Shell/执行链路**——命令执行完毕却始终不释放提示符([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)),spawn 失败时重复触发 `handleExit`(PR #29114),交互式提示把模型困住(例如 `create-vite`,[#22465](https://github.com/google-gemini/gemini-cli/issues/22465)),以及散落的 tmp 脚本把工作区搞得一团糟([#23571](https://github.com/google-gemini/gemini-cli/issues/23571))。
- **Auto Memory** 的边缘情况占据了安全/质量积压问题的大头——未脱敏会话记录的静默泄露(#26525)、低价值会话的无限重试(#26522)、无效补丁被摄取(#26523),以及汇总议题 [#26516](https://github.com/google-gemini/gemini-cli/issues/26516)。
- **工具数量限制**——对重度用户而言，128 个工具的 API 上限仍会以 400 错误的形式出现([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)),这进一步印证了对 AST 感知、外科手术式精准读取的需求。
- **ACP/编辑器集成**——会话 ID 不匹配导致 Zed 中无法恢复会话([#29288](https://github.com/google-gemini/gemini-cli/issues/29288)),而配置层仍会错误改写显式指定的 `gemini-2.5-flash`(PR #29217)。
- **安全/策略用户体验**——包含多次 shell 注入的 TOML 自定义命令在确认环节陷入循环(PR #29201),带额外标志的 shell 包装器则绕过了重检查(PR #29203)。

---

*本窗口期未提供 `github.com/google-gemini/gemini-cli/discussions` 数据——“热门讨论”部分因此省略。*

---

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要
**日期：** 2026-09-13

---

## 1. 今日要点

今日的活动以**分诊阶段的 Bug 报告和功能请求**为主，而非发布——过去 24 小时内没有新版本发布。值得关注的议题包括 **Linux 上的内存泄漏崩溃**（#4725）、围绕排队提示（#4824）和图片附件（#4831）的**会话用户体验问题**，以及多项关于**更完善的会话控制原语**的请求，例如 `/remove-dir`（#4830）和通过 OpenTelemetry 提供更丰富的可观测性（#4825）。PR 方面，依赖机器人正稳步推进 GitHub Actions 的现代化，而一项将 actions 固定到 commit SHA 的安全相关 PR 已被关闭（#4808）。

---

## 2. 发布

*过去 24 小时内无新版本发布。*

---

## 3. 热门 Issue

| # | Issue | 状态 | 重要性 |
|---|---|---|---|
| [#4725](https://github.com/github/copilot-cli/issues/4725) | 频繁出现 JavaScript 堆内存不足 | OPEN | 高影响力的稳定性 Bug —— CLI 在 Linux 上每隔几分钟就崩溃一次，无法支撑长时间会话。 |
| [#4829](https://github.com/github/copilot-cli/issues/4829) | 子智能体在长工具调用序列上无法命中提示缓存 | OPEN | 影响自主自定义智能体（task 工具）用户的 Token 效率和成本；在 Gemini 3.8 Flash 和 Claude 系列模型上均有报告。 |
| [#4831](https://github.com/github/copilot-cli/issues/4831) | `claude-opus-5` 每个会话仅能查看 1 张图片 | OPEN | 多模态工作流的效率回退；CLI 会静默丢弃额外的图片，且提示信息含糊不清。 |
| [#4824](https://github.com/github/copilot-cli/issues/4824) | `ctrl-t` 排队的提示卡在 "Working" | OPEN | 破坏了一个广泛使用的批处理快捷键；受影响用户在多步骤智能体工作中会中断思路。 |
| [#2147](https://github.com/github/copilot-cli/issues/2147) | CAPI 400: input item ID does not belong to connection | CLOSED | 存在已久的 3 月遗留 Bug；带 7 条评论关闭，表明问题已在上游解决。 |
| [#4759](https://github.com/github/copilot-cli/issues/4759) | Copilot CLI 应发送 MCP 取消请求 | CLOSED | 解决用户主动取消时 MCP 协议行为的正确性问题，与集成 MCP 的工作流密切相关。 |
| [#4830](https://github.com/github/copilot-cli/issues/4830) | 新增 `/remove-dir` 命令以撤销目录访问权限 | OPEN | 补充现有的 `/add-dir` 和 `/list-dirs`；会话权限管理中显而易见的对等性缺口。 |
| [#4825](https://github.com/github/copilot-cli/issues/4825) | HydraFusion：将每阶段的 model/verdict/credit 输出到 OpenTelemetry | OPEN | 可观测性诉求 —— 希望将 `events.jsonl` 中的路由决策通过 OTel 暴露出来，用于成本归因和调试。 |

---

## 4. 关键 PR 进展

| # | PR | 状态 | 说明 |
|---|---|---|---|
| [#4828](https://github.com/github/copilot-cli/pull/4828) | build(deps): bump `actions/github-script` 7.1.0 → 9.0.0 | OPEN | 常规 Dependabot 升级；跨主版本号升级 —— 值得留意脚本 API 的破坏性变更。 |
| [#4827](https://github.com/github/copilot-cli/pull/4827) | build(deps): bump `actions/stale` 9.1.0 → 11.0.0 | OPEN | 保持 Issue 分诊自动化与时俱进；v11 对过期处理带来了显著的行为变更。 |
| [#4808](https://github.com/github/copilot-cli/pull/4808) | 将 GitHub Actions 固定到 commit SHA | CLOSED | 供应链加固：将 4 个文件中 3 个 action 引用固定到不可变 SHA，以缓解标签被篡改的风险。 |

---

## 5. 热门讨论

*本周期未提供讨论数据 —— 该章节省略。*

---

## 6. 功能请求趋势

本周的 Issue 呈现出三个趋同的主题：

- **会话级权限控制**：`/add-dir` / `/list-dirs` 与缺失的 `/remove-dir`（#4830）之间的差距，反映出对**运行时、可逆的会话内信任边界**的需求。
- **遥测与成本归因**：#4825 希望将每阶段的路由、裁决和额度元数据通过 OpenTelemetry 暴露出来，指向对多模型智能体执行**细粒度可观测性**的更广泛需求。
- **并发与队列用户体验**：#4824 中的 `ctrl-t` 排队行为表明，用户希望获得具备**可预测执行语义的一等公民批处理/流水线化提示**能力。

---

## 7. 开发者痛点

- **Linux 上的运行时稳定性**：反复出现的 JS 堆 OOM 崩溃（#4725）使长时间会话变得脆弱。
- **自主智能体的 Token 经济性**：子智能体的工具调用突发会绕过提示缓存（#4829），推高成本。
- **静默的 UX 故障**：仅一个附件后图片被丢弃（#4831）、排队后无限期停留在 "Working" 状态（#4824），均无可操作的错误提示。
- **会话状态管理**：无法在会话中途撤销先前授予的目录访问权限（#4830）。
- **可观测性盲区**：多模型路由决策（HydraFusion）对外部监控不可见（#4825）。

---

*本摘要基于 github.com/github/copilot-cli 在截至 2026-09-13 的 24 小时窗口内的公开活动生成。*

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-13

## 今日要点

**剪贴板故障事件持续占据社区关注焦点** — 排名前 4 的活跃 issue（#4283、#13984、#41470、#26459）均报告了"已复制到剪贴板"通知正常弹出但实际并未复制的各种变体，覆盖原生终端、VS Code Server、code-server 以及 GitHub Codespaces。一个相关的 **桌面端 sidecar 崩溃循环**（#48715）正在 #48716 中积极修复，解决在内存压力下反复出现的 0xC0000409 故障。与此同时，V2 架构相关问题正在浮现 —— 尤其集中在 SSE 流韧性（#47258）、MCP 服务器按项目目录逐一派生（#43845）以及子代理错误传播（#38866）这几个方向。

## 版本发布

_过去 24 小时内无新版本发布。_

## 热门 Issue

1. **[#4283](https://github.com/anomalyco/opencode/issues/4283)** — 终端中复制到剪贴板功能失效（131 条评论，123 👍）。所有剪贴板 bug 的"鼻祖"；自 1.0.62 起持续未决，已积累大量复现信息。
2. **[#13984](https://github.com/anomalyco/opencode/issues/13984)** — CLI 中无法复制/粘贴（57 条评论）。通知显示成功但 `Ctrl+V` 无任何结果 —— 可能与 #4283 相关。
3. **[#41470](https://github.com/anomalyco/opencode/issues/41470)** — VSCode Server Docker 中"已复制到剪贴板"功能无效（22 条评论）。新增又一个剪贴板静默失效的场景（容器化 VS Code）。
4. **[#26459](https://github.com/anomalyco/opencode/issues/26459)** — 基于 Web 的 VSCode 终端中剪贴板失效（14 条评论）。详尽枚举了受影响的环境：code-server、Codespaces、Remote SSH、Gitpod。
5. **[#26602](https://github.com/anomalyco/opencode/issues/26602)** — 桌面端在慢速本地 provider 下触发 5 分钟请求头超时（12 条评论）。即使配置了 `"timeout": false` 也会被忽略；OpenCode Desktop 恰好在 300s 处中止请求。
6. **[#36761](https://github.com/anomalyco/opencode/issues/36761)** — V2 子代理工具未向模型暴露有效 ID（7 条评论）。模型只能猜测看似合理的 ID，导致委派失败 —— 这是 V2 中一处核心架构缺陷。
7. **[#32985](https://github.com/anomalyco/opencode/issues/32985)** — OpenCode 在 GNU Screen 内无法正常工作（5 条评论）。无真彩色、复制/粘贴失效、鼠标支持缺失 —— 终端复用器兼容性存在缺口。
8. **[#48661](https://github.com/anomalyco/opencode/issues/48661)** — 桌面端双击面板最大化（JetBrains 风格）（4 条评论）。在自动关闭后复现该行为，反映出这是一个反复出现的 UX 诉求。
9. **[#35258](https://github.com/anomalyco/opencode/issues/35258)** — Windows 终端中粘贴（右键与 Ctrl+V）失效（4 条评论）。对 Windows 用户构成显著的 UX 阻塞。
10. **[#39588](https://github.com/anomalyco/opencode/issues/39588)** — Mac 版 VS Code 扩展中复制/粘贴失效（4 条评论）。扩展 beta 版在 macOS 15.7.7 上没有任何可用的复制/粘贴路径。

## 重点 PR 进展

1. **[#48716](https://github.com/anomalyco/opencode/pull/48716)** — `fix(desktop): respawn crashed sidecar; classify image-count errors as overflow`。直接修复 #48715 的崩溃循环（0xC0000409），增加 sidecar 自动重启逻辑，并将"图片过多"识别为可恢复的溢出情况。
2. **[#48730](https://github.com/anomalyco/opencode/pull/48730)** — `fix(core): keep locations with running terminals out of eviction`。关闭 #48691 —— 防止 `LocationActivity` 仅因终端不发送会话事件就在 60 分钟后回收位置。
3. **[#48729](https://github.com/anomalyco/opencode/pull/48729)** — `fix(session): keep todo list current for non-Claude models`。修复 #27560 —— 非 Anthropic 模型从未接收到 todo 更新指令，导致任务项一直停留在 `in_progress` 状态。
4. **[#48727](https://github.com/anomalyco/opencode/pull/48727)** — `feat(app): move tab layout to general settings`。将标签页布局选择器从实验性设置提升至通用设置，并补充搜索元数据与回归测试覆盖。
5. **[#48724](https://github.com/anomalyco/opencode/pull/48724)** — `fix(desktop): migrate mac beta to stable installer`。将 macOS Beta 用户引导至已签名的 Stable DMG，解决 Squirrel.Mac 对应用包标识不一致的处理问题。
6. **[#46165](https://github.com/anomalyco/opencode/pull/46165)** — `fix(app): keep archived sessions open in their tabs`。关闭 #35058 —— 此前归档操作等同于导航命令；现在归档仅更新元数据而不再关闭标签页。
7. **[#48726](https://github.com/anomalyco/opencode/pull/48726)** — `docs: add BYOT to ecosystem projects`。仅文档的生态项目新增。
8. **[#48722](https://github.com/anomalyco/opencode/pull/48722)** — `docs(ecosystem): add lintlang plugin`。仅文档的生态项目新增（`lintlang` 插件）。
9. **[#48721-opened](https://github.com/anomalyco/opencode/issues/48721)** (Issue) — `ProviderModelNotFoundError suggests identical model string`。含斜杠的多段模型键（如 `nvidia/nemotron-...`）会被呈现为不透明的"Unexpected server error"。
10. **[#48712](https://github.com/anomalyco/opencode/pull/48712)** — `feat(tui): render latex math blocks via kitty graphics` *（已关闭）*。MathJax → SVG → resvg-wasm → kitty/sixel 渲染管线；在 tmux 中回退为原始 Markdown。推测维护者认同该特性的方向，但未合并即关闭 —— 可能需要重新设计。

## 功能请求趋势

- **跨平台剪贴板统一**：呼声最高的"隐形"特性 —— 一条在原生终端、Web 版 VSCode、macOS、Windows 以及远程/SSH 会话下都稳定可用的剪贴板路径。
- **远程审批工作流**：#39628 明确提出希望支持在移动端/第二设备上批准权限弹窗 —— 用于解决长时间运行会话在无人值守时被阻塞的问题。
- **TUI 保真度改进**：LaTeX/数学公式渲染（#48712，已关闭）、`tok/s` 吞吐显示（#42112，已关闭）以及保留逻辑文本的鼠标复制（#44056、#47165）表明用户希望 TUI 具备更接近富客户端的行为表现。
- **面板与标签页人体工学**：双击面板最大化（#48661）、右键菜单重命名会话（#46915，已关闭草稿）、"通过 `-s` 不带 ID 打开会话选择器"（#48718）共同指向对 JetBrains/IDE 级 UX 的追求。
- **Provider 易用性**：更完善的配额/窗口统计（DeepSeek 4.1 Flash #48687）、正确的 NVIDIA 鉴权（#48728）以及更友好的模型键错误提示（#48721）。

## 开发者痛点

1. **各环境下剪贴板静默失效** —— 单一类别中报告量最高的 bug，目前尚无统一修复方案。
2. **SSE 流不稳定** —— 长会话下内存增长（#31087，已关闭）、标签页切到后台后无自动恢复（#47258）、provider 出现零数据块停滞且无超时/重试机制（#48675）。
3. **V2 服务资源浪费** —— #43845 报告 V2 后台服务启动时会为每个已编目项目目录派生约 53 套本地 MCP stdio 进程。
4. **子代理黑盒化** —— 模型无法发现有效的子代理 ID（#36761），且流错误可能以"看似成功"的空 `<task_result>` 形式呈现（#38866）。
5. **桌面端不稳定** —— 内存压力下的 sidecar 崩溃循环（#48715）以及会让整个会话不可用的图片数量错误。
6. **终端兼容性缺口** —— GNU Screen 支持（#32985）、Web 版 VSCode 剪贴板（#26459）、Windows 粘贴（#35258）。
7. **Provider 超时处理** —— 慢速本地 OpenAI 兼容 provider 即便配置也无法绕过桌面端 5 分钟超时（#26602）。
8. **工作成果丢失的 UX** —— `Ctrl+C` 直接丢弃已编辑的 prompt 草稿且无法恢复（#48636，已关闭），以及 SSE 断开后需手动刷新（#47258）。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区日报 — 2026-09-13

## 今日亮点
Pi 仓库今日分诊速度较高，**24 小时内关闭了 12 个 issue**，主要集中在 OAuth 提供商接入（Google Antigravity、Cursor Pro）以及阻塞提示的 TUI 事件可观测性方面。长期跟踪的 `openai-codex` 连接可靠性讨论（#4945，78 条评论，33 👍）仍是最大的痛点，跨平台兼容性摩擦（Windows 路径处理、bash 超时强杀）也持续在 bug 报告中出现。

## 发布
*过去 24 小时内没有新发布。*

## 热门 Issue

1. **[#4945](https://github.com/earendil-works/pi/issues/4945) — openai-codex 连接可靠性问题**（78 条评论，33 👍，OPEN）
   通过 `openai-codex` 调用 `gpt-5.5` 时，TUI 经常卡在 `Working...`，既没有流式输出也没有可见的错误，只能按 Escape 恢复。这是讨论量遥遥领先的头号 issue，已标记 `[inprogress]`，说明正在积极调试。

2. **[#9052](https://github.com/earendil-works/pi/issues/9052) — 全屏模式下滚轮滚动慢 3 倍**（9 条评论，4 👍）
   全屏 TUI 下的滚动明显比普通模式慢，尽管用户选择全屏是为了获得常驻输入框。这指向渲染路径上的性能回退。

3. **[#8928](https://github.com/earendil-works/pi/issues/8928) — 并行启动 pi 时 OAuth 过期约 48 秒出现 "No API key found"**（7 条评论，OPEN）
   多进程环境下，OAuth 凭据过期静默重检时会显示误导性的 "No API key found"。附有确定性复现步骤，标记 `[inprogress]`。

4. **[#9311](https://github.com/earendil-works/pi/issues/9311) — 全屏鼠标选区在切换会话后仍保留**（6 条评论）
   文本选区会持续存在到新打开/创建的会话中，在不同上下文之间泄露状态。修复思路很简单（切换时清除选区）。

5. **[#5372](https://github.com/earendil-works/pi/issues/5372) — 允许自定义 OAuth 回调页面渲染**（5 条评论）
   Pi 的 OAuth 流程的外部调用者希望接入自己的 `oauthSuccessHtml` / `oauthErrorHtml` 渲染器，替换硬编码的内部 `renderPage()`。

6. **[#9098](https://github.com/earendil-works/pi/issues/9098) — 在 RPC 响应中暴露 prompt disposition**（4 条评论）
   希望在 `prompt` RPC 成功响应中携带 `data.disposition: "handled" | "queued" | "started"`，利用 Pi 的预飞决策，让下游工具区分已启动的 prompt 与被拦截的 prompt。

7. **[#9267](https://github.com/earendil-works/pi/issues/9267) — 降低模糊会话搜索的扫描开销且不改排名**（4 条评论，1 👍）
   提议把 `fuzzyMatch()` 中的逐字符扫描循环替换为 `String.indexOf()`，获得显著加速。issue 中附有具体补丁。

8. **[#9262](https://github.com/earendil-works/pi/issues/9262) — find 工具：Windows 风格的 glob 模式静默返回空结果**（4 条评论）
   `find` 接受 `src\**\*.ts` 而不报错并返回空结果——直接复制 Windows 原生路径的代理和用户会得到误导性的空结果。#6817 的后续。

9. **[#9243](https://github.com/earendil-works/pi/issues/9243) — 会话恢复还原了错误的模型**（3 条评论，1 👍）
   `getSessionContextSettings` 允许每条 assistant 消息覆盖 `model`，因此恢复时来自 provider 响应的回显模型名会覆盖原始的路由决策。

10. **[#7629](https://github.com/earendil-works/pi/issues/7629) — tui.select.pageUp/pageDown 并非在所有选择列表中都生效**（3 条评论）
    重映射的 `tui.select.pageDown` / `pageUp` 绑定在部分选择器中生效、在其他选择器中失效，导致没有 Page 键的键盘纯键盘工作流被打断。

## 关键 PR 进展

1. **[#9096](https://github.com/earendil-works/pi/pull/9096) — feat(ai,coding-agent): 新增 Meta 提供商及 Muse 订阅 OAuth**（OPEN）
   解决 #7543。订阅式 OAuth 采用不寻常的每日 identity-token 刷新而非滚动刷新令牌；目前流式行为为突发刷新。

2. **[#9529](https://github.com/earendil-works/pi/pull/9529) — feat(ai): 新增 Google Antigravity 和 Cursor Pro OAuth 提供商**（CLOSED）
   新增两个基于订阅的浏览器 OAuth 提供商（无需 API key）；Antigravity 使用 51123 端口的本地回调服务器，并支持手动输入代码回退。关闭 #9530。

3. **[#9517](https://github.com/earendil-works/pi/pull/9517) — feat(tui): 对长串工具调用进行分组**（CLOSED）
   把 ≥6 条连续工具调用折叠为一条聚合转录行，可点击展开，失败信息仍保留。包含渲染测试。

4. **[#9514](https://github.com/earendil-works/pi/pull/9514) — fix(tui): 将硬编码按键路由到可配置绑定**（CLOSED）
   将编辑器/输入框/模型选择器中的硬编码快捷键替换为可配置 keybinding，并增加 `Ctrl+C` 清空搜索和 Shift 修饰的删除行为。

5. **[#9531](https://github.com/earendil-works/pi/pull/9531) — feat(tree): 在会话树中支持永久删除分支**（CLOSED）
   `SessionManager.pruneBranch()` + `countSubtree()`：删除一条离路径的条目及其整个子树，同时保留活动路径；`shift+d` 快捷键绑定到选择器。

6. **[#9523](https://github.com/earendil-works/pi/pull/9523) — 修复 #9522：Pi 自有阻塞提示现在也会发出 ui_prompt_start/_end**（CLOSED）
   此前状态集成对扩展提示显示 "waiting for user"，对 Pi 自有的模型选择器/设置/恢复选择器却显示 "running"；两条路径现在都走 `showSelector()`。

7. **[#8635](https://github.com/earendil-works/pi/pull/8635) — fix(ai): 在延迟设置过程中保留中止的停止原因**（OPEN）
   将请求中止信号透传到延迟流设置包装器中，并在信号已中止时把设置失败上报为中止；增加回归测试。修复 #8409。

8. **[#9532](https://github.com/earendil-works/pi/pull/9532) — mahendra**（CLOSED）
   空/测试 PR，已关闭。

## 热门讨论

**Q&A**
- **[#3373](https://github.com/earendil-works/pi/discussions/3373) — 你最喜欢配合 Pi agent 使用哪些插件/扩展？**（16 条评论，9 👍）
   一个征求扩展推荐的长期讨论帖；对维护者而言，是了解生态中最被重视的扩展的有用信号。

**Show and Tell**
- **[#9525](https://github.com/earendil-works/pi/discussions/9525) — 感谢 —— `--mode rpc` 是一个新开源项目的支柱**（0 条评论，1 👍）
   作者基于一个常驻 Pi 会话构建了 [`web-agent`](https://github.com/kamilakis/web-agent)，包含手机友好的仪表盘以及 Siri/Matrix 桥接。有力地验证了 RPC 模式正在成为稳定的集成面。

**General / Compatibility**
- **[#9516](https://github.com/earendil-works/pi/discussions/9516) — openai-responses：`function_call_output` 中的工具结果图片被兼容网关丢弃**（1 条评论，1 👍）
   issue #9518 的镜像讨论，指出 Responses 编码与 Completions 不同，会被中间网关丢弃。

## 功能请求趋势

- **更多基于订阅的 OAuth 提供商**（Meta/Muse、Google Antigravity、Cursor Pro）——持续呼吁降低 API key 摩擦。
- **改进的会话树人体工学**——永久分支删除（#9531）、从当前节点 fork（#9533）、在 `/resume` 中通过 `Ctrl+F` 克隆（#9521）。
- **扩展/RPC API 的完备性**——响应中的 prompt disposition（#9098）、阻塞提示事件覆盖（#9522）、无竞争的 notification 替代方案（#9462）、自定义 OAuth 回调渲染（#5372）。
- **跨平台一致性（尤其 Windows）**——glob 分隔符（#9262）、bash 超时强杀（#9129），以及更广泛的 Windows QA。
- **可配置的 TUI 行为**——全屏滚动/翻页的键绑定（#9052、#7629、#9514）和窗口相对的压缩预算（#9415）。

## 开发者痛点

- **静默失败**：无效的 prompt 模板 frontmatter（#9354）、Windows glob（#9262）、`stream_read_error` 未归类为可重试（#9520）、扩展异常时 `user_bash` 回退到主机（#9068）。用户一致要求与 skill 风格警告保持一致。
- **Provider/传输脆弱性**：`openai-codex` 卡流（#4945，遥遥领先）、Codex 传输缺少非重置的 per-request deadline（#9474）、Vertex 在 Gemini 3 Flash 上拒绝 `THINKING_LEVEL_MINIMAL`（#9535）、OpenRouter 丢弃仅签名的 reasoning（#9534）。
- **跨平台 bug**：Windows glob 路径、bash 超时时 MSYS2 管道孤儿（#9129）、Bun 安装器最终装到了 Node（#5365，现已关闭）。
- **API 不一致/可观测性缺口**：prompt disposition 未暴露（#9098）、Pi 自有对话框缺少阻塞提示事件（#9522）、`ctx.ui.notify` 的 last-wins 竞态（#9462）。
- **用户反馈的性能回退**：全屏下滚轮滚动慢 3 倍（#9052）以及模糊搜索的扫描开销（#9267）——两者都附带可测量的复现和提议的修复。
- **会话恢复正确性**：从 assistant 消息回显恢复出错误的模型（#9243）；本地 vLLM 在使用过云端模型后出现误报 `Cache miss` 提示（#9013）。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区简报 — 2026-09-13

## 今日要点

Qwen Code 团队发布了 nightly 版本 **v0.23.3-nightly.20260912**，并合入了若干架构层面的重要 PR，其中最引人注目的是**子代理的容器化执行**（#11711）与**结构化按需记忆召回**（#10183）。在 issue 一侧，反复出现的**后台代理完成时 TUI 发生 React #185 崩溃**（#11500、#11732），以及**遥测数据隐私泄漏——原始工具错误被直接上报给 RUM**（#11198），是当前最值得关注的两大高优先级信号。**将代理框架与执行环境分离**（#11695）这一总体方向如今已获得具体的 Track A 与 Track B PR 支撑，标志着本周期最重大的一次运行时重构。

---

## 版本发布

- **v0.23.3-nightly.20260912.54aa66834b** — 钉钉（DingTalk）频道清理（移除了过时的后台响应聚合，#11570），并继续推进频道移除工作。该 nightly 版本未发布面向用户的更新日志摘要。
  - 发布地址：https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260912.54aa66834b

---

## 热门 Issue

1. **#11500 — 后台代理完成时 TUI 因 React #185 静默退出** *(P1，未关闭，10 条评论)*
   多个后台子代理在短时间内接连完成，触发 Ink 的 `useBoxMetrics` 布局监听器 `setState` 循环，使 React 更新深度溢出。进程直接退回 shell，没有任何渲染出的错误信息。第二份报告（#11732）确认在长时间运行的监控任务上同样会崩溃。本周期影响最大的稳定性缺陷。
   https://github.com/QwenLM/qwen-code/issues/11500

2. **#10065 — 无 MCP / `tools.core` 为空时，LM Studio 0.4.21 解析 grammar 失败** *(P2，已关闭)*
   在 LM Studio 上做本地推理的用户即便设置了 `tools.core=[]` 也会遇到 `failed to parse grammar`。该 issue 的关闭意味着修复已落地；建议用户在最新 nightly 上重新验证。
   https://github.com/QwenLM/qwen-code/issues/10065

3. **#7771 — 重启后持久化的 `mcp_config` 未加载进主进程 MCP 代理** *(已关闭)*
   Qwen Desktop 的 Electron 主进程在启动时丢失持久化的 MCP 配置，导致重启后通往 MCP 工具的 IPC 中断。影响所有保存过服务器的 Desktop 用户。
   https://github.com/QwenLM/qwen-code/issues/7771

4. **#11732 — 原生监控任务仍在运行时，Qwen Code 0.23.3 因 React #185 崩溃** *(P1，未关闭)*
   对 #11500 的独立复现：崩溃与长时间运行的原生监控输出交织出现，而不仅限于多个子代理同时完成的场景。这进一步印证了根因在于共享的布局度量，而非子代理管线。
   https://github.com/QwenLM/qwen-code/issues/11732

5. **#11695 — 跟踪：将代理框架与执行环境分离** *(P2，未关闭，5 条评论，总纲)*
   支撑 PR #11711（容器后端）与 #11746（SSH 后端）的总纲方向。它框定了下一代架构的叙事：工具应运行在可寻址的运行时中，而不是代理自己的进程里。对任何接触子代理或沙箱的人来说都是必读内容。
   https://github.com/QwenLM/qwen-code/issues/11695

6. **#11704 — 提案：基于 ACP 的 `qwen serve` 官方 Android 配套客户端** *(P3，未关闭，5 条评论)*
   作者主动提出构建并维护一个 MVP。它是在 `qwen serve` 之上的轻量 ACP 客户端，而非内嵌完整运行时，因此是首个有说服力的移动端方案。社区反响积极；值得持续关注其范围界定与评审进展。
   https://github.com/QwenLM/qwen-code/issues/11704

7. **#11465 — `session-workflow-cockpit-light` 渲染结果不确定（1.31% 像素差异）** *(P3，未关闭)*
   视觉预览冒烟 CI 对同一提交的运行结果在“干净”与“有差异”之间来回翻转，阻塞了发布。这表明 web-shell 预览的确定性快照工具链仍有缺口。
   https://github.com/QwenLM/qwen-code/issues/11465

8. **#10953 — 工作委派给子代理期间 Todo 计划停更** *(已关闭)*
   四个子代理节点持续推进的 55m44s 里，一份 Todo 计划一直冻结；`todo_write` 镜像保持正确，但活动 todo 提醒始终没有触发。这是子代理路线图上重要的内部试用信号。
   https://github.com/QwenLM/qwen-code/issues/10953

9. **#11728 — 堵上 REST 文档契约守护中剩余的 fail-open 缺口** *(P3，未关闭)*
   新的契约守护可能在其名称所指的属性并不成立时依然通过。这是 #11592 的后续；属于 CI 质量门槛方面的工作。
   https://github.com/QwenLM/qwen-code/issues/11728

10. **#11198 — 遥测未经脱敏就将原始工具错误文本（含 shell 命令行）上传至 RUM** *(P1，未关闭，安全)*
    默认开启的使用统计会上报 shell 命令行与未脱敏的错误正文。本周期最严重的隐私发现；与已关闭的 #11666（`logPrompts=false` 被违反）互为补充。
    https://github.com/QwenLM/qwen-code/issues/11198

其他值得关注：**#11720**（夏令时重复小时内 cron 返回过去时刻，已关闭）、**#11718**（Desktop AppImage 的 `PYTHONHOME`/`PYTHONPATH` 泄漏到 stdio MCP 服务器）、**#11499**（`.mcp.json` 中的 `${VAR}` 占位符未被展开）、**#11724**（长时间运行的 CLI 出现 7 GB 内存上限）、**#11710**（VP 模式退出时留下脏终端状态）、**#10834**（MCP 工具图像绕过 `read_file` 的图像预算）。

---

## 重点 PR 进展

1. **#11711 — 子代理的容器化执行** *(未关闭)*
   通过 `QWEN_AGENT_EXECUTION_BACKEND` 启用的可选 Docker/Podman 后端，可在每次 `Agent` 工具调用时通过 `execution_backend: "container"` 进行选择，并可搭配可选的 `isolation: "worktree"`。这是 #11695 的 **Track A** 实现，也是 SSH 后端（#11746）将要在其上构建的基础。
   https://github.com/QwenLM/qwen-code/pull/11711

2. **#11746 — 执行 worker 的 SSH 传输** *(未关闭，受 #11711 阻塞)*
   新增第三个 `ExecutionEnvironment`（与 `local`、`container` 并列），通过 SSH 连接远程主机。有意不纳入 #11698；承载着 Track A 与 Track B 如何衔接的讨论。
   https://github.com/QwenLM/qwen-code/pull/11746

3. **#10183 — 结构化按需记忆召回** *(未关闭)*
   以“语料变更时推送的两级 ref/title 树 + 相关轮次上聚焦查询的元数据子树 + 专门的召回工具”，取代原先扁平的自动记忆正文整体倾倒。托管记忆的扩展方式由此发生重大转变。
   https://github.com/QwenLM/qwen-code/pull/10183

4. **#11538 — 按模型选择 OpenAI API** *(未关闭)*
   为 `modelProviders.openai` 下的模型条目新增 `api: "chat-completions" | "responses"`，使同一提供方可以按模型混用不同端点。补上了与 Responses 端点之间长期存在的缺口。
   https://github.com/QwenLM/qwen-code/pull/11538

5. **#11540 — 将 review 基树复用围栏移出 bind-mount 的沙箱目录** *(未关闭)*
   把运行标识与捕获的 merge base 持久化到 `.qwen/review-leases`（宿主侧、未挂载），而非 `.qwen/tmp`（沙箱内可读写）。堵上了 `/review` 中一个实实在在的正确性缺口。
   https://github.com/QwenLM/qwen-code/pull/11540

6. **#11289 — 保留守护进程在空闲时拒绝的轮中消息** *(未关闭)*
   当会话已转为空闲导致用户输入的消息被拒绝时，守护进程现在会告知客户端将其作为普通 prompt 发送，而不是只返回一个裸拒绝。
   https://github.com/QwenLM/qwen-code/pull/11289

7. **#11686 — 在 `/review` 计划中记录默认截止时间** *(未关闭)*
   每次 `/review` 运行——不限于 CI 发起的——如今都会有一个挂钟截止时间；调用方未传 `--deadline` 时，默认值由 diff 拓扑推算得出。
   https://github.com/QwenLM/qwen-code/pull/11686

8. **#10410 — 为延迟工具保留 prompt 缓存** *(未关闭)*
   用两步式 `tool_search` / `tool_call` 桥接取代“通过变更工具列表来揭示 schema”的取巧做法，使声明的工具列表保持稳定。对工具密集型代理而言可实质性降低 token 成本。
   https://github.com/QwenLM/qwen-code/pull/10410

9. **#11692 — 可配置的 `web_search` 预算 + 有界抽取器回退** *(未关闭)*
   新增 `tools.webSearch.timeoutMs`（环境变量 `WEB_SEARCH_TIMEOUT_MS`），默认值提升至 120s，并配有有界回退——搜索超时时模型会看到该回退内容。
   https://github.com/QwenLM/qwen-code/pull/11692

10. **#9466 — 将回退映射锚定到稳定的 prompt 标识** *(未关闭)*
    回退现在通过持久化的 prompt 标识来解析目标 prompt，而非依据轮次位置顺序，因此在 resume、headless `-p --resume` 以及任何会重排轮次的界面下依然有效。
    https://github.com/QwenLM/qwen-code/pull/9466

其他进展中的 PR：**#11086**（将作用域扩展至工作区运行时）、**#10906**（在 web-shell 中显示 shell 与监控输出）、**#11727**（由生产方自身预算来限定 shell 输出体量）、**#11644**（web-shell 按需加载元数据）、**#11731**（对瞬态 `npm ci` 失败进行重试）、**#11745**（在 Windows 上禁用 DST 测试）、**#11557**（将两个测试套件与已发布行为重新对齐以修复主 CI）、**#9305**（短 VP 内容底部对齐）、**#10455**（输出语言文件不可写时不再导致启动崩溃）。

---

## 热门讨论

*本期简报的数据来源中未提供 Discussions 数据。* 若项目启用 GitHub Discussions，预计下一期简报将包含关于代理框架分离（#11695）与 Android 配套客户端提案（#11704）的讨论帖。

---

## 功能请求趋势

纵观各 issue 与 PR，以下方向在不断汇聚：

- **可插拔、可寻址的执行环境。** 子代理工具应运行在按调用选择的 `local`、`container` 或 `ssh` 后端中（#11695、#11711、#11746）。
- **`qwen serve` 之上的瘦客户端。** 移动端/外部界面通过 ACP 接入，而非重新托管一套运行时（#11704）。
- **结构化记忆取代扁平倾倒。** 带显式 ref/title 元数据的按需召回树（#10183）。
- **稳定的工具列表语义。** 通过 `tool_search`/`tool_call` 揭示延迟工具时，prompt 缓存得以保留（#10410）。
- **OpenAI 兼容提供方上的按模型 API 选择。** 在模型条目级别选用 `chat-completions` 还是 `responses`（#11538）。
- **有界且可配置的工具预算。** `web_search` 超时（#11692）、shell 输出体量（#11727）、MCP 图像预算（#10834）。
- **与 Claude Code 兼容的 hook 契约。** 纯文本 stdout、`stop_hook_active`、超时单位、匹配器、公共输入（#11610）。
- **以标识而非位置锚定的回退。** 在 resume、headless 与重排轮次的界面下保持稳定（#9466）。

---

## 开发者痛点

- **看似静默退出的 TUI 崩溃。** Ink `useBoxMetrics` 监听器引发的 React #185 是本周最主要的崩溃特征；已在两套独立环境中复现（#11500、#11732）。
- **遥测/隐私泄漏。** 默认情况下，包含 shell 命令行的原始工具错误文本被上传至 RUM（#11198）；`logPrompts=false` 同样遭到违反（#11666）。遥测脱敏显然测试不足。
- **MCP 正确性缺口。** 重启后持久化配置未加载（#7771）、`${VAR}` 占位符未展开（#11499）、图像结果绕过视觉预算（#10834）、AppImage 的 `PYTHONHOME` 泄漏进 stdio 服务器（#11718）。MCP 集成在各个界面上都较为脆弱。
- **提供方/模型互操作性。** LM Studio 的 grammar 解析（#10065）与 Fireworks 的工具调用续接 400 错误（#11657）表明，提供方兼容矩阵仍有毛边。
- **Cron 与时区正确性。** 秋季夏令时重复小时内的下次触发计算返回过去时刻（#11720）；频道循环可能在同一调度分钟内重复触发。
- **长会话资源上限。** Windows 上 7 GB 内存占用且没有崩溃安全的恢复路径（#11724），对“放着让它一直跑”的工作流是实打实的阻碍。
- **macOS E2E 分片上的 CI 抖动。** 有界重试方案正从 Linux 推广至 macOS（#11134）；另有 `npm ci` 瞬态失败（#11731）与 web-shell 冒烟预算超支（#11736）。
- **确定性视觉预览。** 同一提交的渲染不确定，像素差异达 1.31%（#11465）

---

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*