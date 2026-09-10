# AI CLI 工具社区动态日报 2026-09-11

> 生成时间: 2026-09-10 23:30 UTC | 覆盖工具: 7 个

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

# AI CLI 工具跨社区对比报告 — 2026-09-11

## 1. 生态概览

AI CLI 生态已围绕七款持续交付的编程代理工具形成格局,涵盖厂商主导的客户端(Claude Code、Codex、Gemini CLI、Copilot CLI、Qwen Code)与开源挑战者(OpenCode、Pi)。竞争焦点已从"能否运行"转向运营成熟度:成本治理、长会话可靠性、子代理安全与 Windows 支持同时成为各追踪榜的首要议题。代理集群与企业级使用模式现已成为主要压力测试,暴露出预算核算、压缩(compact)与权限模型方面的短板。与此同时,各工具的周边生态正在成形——围绕 Codex 的社区用量仪表板、围绕 Pi 的 GUI 外壳、围绕 OpenCode 的清理工具——这表明用户正在构建持久化的工作流,而非浅尝辄止。

## 2. 活跃度对比

| 工具 | 热门议题(列出数) | PR 更新(24h) | 讨论 | 发布状态(24h) |
|---|---|---|---|---|
| **Claude Code** | 10(+2 提及) | 3(完整) | N/A* | ✅ v2.1.268 |
| **OpenAI Codex** | 10 | ~20 已合并(其中 14 项详细列出) | 10 个活跃线程 | ✅ python 0.154.0;rust 0.155.0-alpha.1/2;voice CI 构建(未发布) |
| **Gemini CLI** | 10 | 13(10 + 3 个占位项已标记) | N/A* | ✅ nightly v0.61.0(20260910) |
| **Copilot CLI** | 10 | 2(完整) | N/A* | ✅ v1.0.84-4(2026-09-10) |
| **OpenCode** | 10(+3 提及) | 14(10 + 4 提及) | N/A* | ❌ 无 |
| **Pi** | 10(+6 关闭) | ~18–20(10 详细 + 8 已发布) | 4 个线程 | ❌ 无 |
| **Qwen Code** | 10 | 10 | N/A(摘要被截断)* | ✅ v0.23.3、nightly、SDK TS 0.1.12、desktop v0.3.0 + preview |

\* **N/A = 该时间窗口内频道数据不可用(或上游已禁用)——不代表缺乏活动。** 计数反映摘要报告的头部条目,而非追踪榜全量总数;Claude Code 与 Copilot CLI 的 PR 列表在窗口期内已明确注明为完整。Qwen Code 的摘要在报告中部被截断;以下评估基于可用数据。

## 3. 共同功能方向

1. **成本与用量可观测性**(Claude Code、Codex、OpenCode、Pi)——`budget.spent()` 低估约 72 倍(#83048)、缓存未命中计费惩罚(#83913、#91971)、一周内 Codex 出现三个独立的社区仪表板、OpenCode 的 #13003 token 用量 TUI(53 👍,窗口内最高赞数比)、Pi 的跨 provider `usage.input` 标准化(#8752)。用户已不再信任未经核验的计量数据。
2. **长会话可靠性:恢复、压缩、回滚**(全部七款)——Codex 的 `/rewind` 请求(131 👍,呼声最高的单一需求)与压缩卡死(#43855);OpenCode 的压缩目标漂移(#41358)与回滚修复(PR #41604);Copilot 的 resume-session OOM(#4699)与陈旧锁文件(#4805);Claude Code 在 `--resume` 上的缓存缺失;Qwen 的跨版本会话记录可移植性中断(#11489、#11574)。
3. **子代理安全与终止正确性**(Claude Code、Gemini CLI、OpenCode、Codex、Qwen Code)——递归扇出 3→24(#82565)与编排控制丢失(Claude)、代理在 `MAX_TURNS` 后仍报告 `GOAL` 成功(#22323,Gemini)、50 分钟内 364 次相同工具调用且无循环保护(#45442,OpenCode)、子代理恢复时的 MCP 进程泄漏(#37453,Codex)。Qwen 的回合/活跃时间目标预算(PR #11457)是主动防御的范例。
4. **Windows/WSL2 作为一等平台**(全部七款)——Claude Code 的 KB5124008 Plan9 挂载集群(4 个关联 issue、81 条评论);Codex 的 WSL 重启循环(#44612)与 Remote 信任的大小写敏感问题(#40002);Copilot 的剪贴板/插件更新回归(#3260、#3534、#4095);Qwen 在 Windows 上五个相关 issue 组成的 MCP STDIO 集群;Pi 的非确定性 `shellPath`(#9361)。
5. **MCP 集成加固**(Copilot CLI、Qwen、Codex、Gemini CLI)——违反规范的 `initialize` 前调用导致合规服务器崩溃(#4809)、STDIO 的 `Connection closed`/挂起(Qwen #9693、#11460)、OAuth 无头流程(Codex PR #44629、#44636)、运行时策略强制(Gemini PR #29200)。
6. **默认开启的安全与沙箱加固**(Gemini CLI、Codex、Copilot CLI、Claude Code)——Gemini 一次性交付完整一波修复(路径穿越 ×2、通过构建文件的提示注入、沙箱边界隔离);Codex 收紧登录重定向并添加 Windows 防火墙规则;Claude Code 用户仍在与出口策略/JWT 不匹配(#34690)抗争。

## 4. 差异化分析

| 工具 | 功能聚焦 | 目标用户 | 技术路线 |
|---|---|---|---|
| **Claude Code** | 代理集群、Cowork/云端会话、网关与预算治理 | 企业级集群运维者、重度用户 | 闭源核心;托管设置、会话代理;社区以报告为主,入站 PR 接近为零 |
| **Codex** | 覆盖面最广:语音、桌面、TUI 打磨、推理强度分级(`max`/`ultra`) | 从 Consumer Plus/Pro 到企业用户 | 合并速度最高;激进的跨平台投入,包括原生 Windows 语音 |
| **Gemini CLI** | 安全加固、AST 感知的省 token 工具链、Auto Memory | 注重安全与企业 Workspace 用户 | 开源、CVE 修补、研究色彩浓厚的专题(零依赖操作系统沙箱) |
| **Copilot CLI** | GitHub 原生插件/指令/LSP 市场、与 VS Code 紧耦合 | GitHub 生态开发者 | CLI + 桌面双轨;与 VS Code 紧密(有时冲突)的集成 |
| **OpenCode** | V2 重写:事件溯源存储、多 provider、TUI | 自托管用户、注重成本的多 provider 用户 | 开放核心;社区围绕其构建清理工具;计费摩擦(加密货币支付请求,50 👍) |
| **Pi** | 极简内核 + 扩展协议;provider 目录正确性 | 折腾型玩家、终端原教旨主义者、多 provider 切换者 | RPC 模式作为扩展接口——社区 GUI(Phosphor、Pi Manager)在一周内即在其上构建 |
| **Qwen Code** | 守护进程/多工作区、Web Shell/Tauri 桌面整合、记忆 | 多工作区用户、国内生态用户(DashScope、钉钉) | 模型无关的预设(Kimi/Qwen/DeepSeek);按需结构化记忆召回(PR #10183) |

## 5. 社区动能与成熟度

- **迭代最快:Codex**——24 小时内约 20 次合并、多条发布线(稳定版、alpha、仅 CI)、同日修复开放议题(reduced-motion → #44398)。工程动能显著,但容量错误(#43375)暴露了服务端成长阵痛。
- **社区压力强度最高:Claude Code**——81 条评论的 Windows 集群与自标记的 SEV-1 预算缺陷,反差之下窗口期内仅有 3 个 PR;社区是报告渠道而非贡献渠道。产品成熟,但在成本信号与模型路由透明度(#83510)上信任承压。
- **核心团队最规范:Gemini CLI**——13 个 PR 全部围绕安全/正确性主题,占位提交被公开标记供审阅跟进。评论量小(最多 42)但分诊信号密度高。
- **风险对象:Copilot CLI**——4 份独立的 OOM/泄漏报告(其中一份 33 GB 日志,#4807)对应仅 2 个合并 PR;入站稳定性报告与出站修复之间的差距在所有成员中最大。
- **拐点期:OpenCode**——V2 beta 动荡、计费抱怨强烈,但社区行动力强劲(外部清理工具,50–53 👍 的功能投票)。
- **最健康的小生态:Pi**——量低质精,涌现出二阶生态(同一窗口期出现两个 GUI 伴侣)——这是可扩展内核的经典信号。
- **稳健:Qwen Code**——一天内 5 个发布产物与主动的架构工作(目标预算、Web Shell),被 P1 级会话可移植性与 Remote-SSH 回归所抵消。

## 6. 趋势信号

1. **成本治理正成为产品必备而非单一指标。** 预算 API、缓存计费准确性、配额体验(重置后自动恢复,#21073)在 7 个社区中的 4 个反复出现。*参考:* 从第一天起就构建支出可观测性与缓存稳定的请求构造;用户正在审计账单。
2. **确定性护栏优于模型自觉行为。** 死循环、虚假成功信号、失控扇出出现在 5 个社区;Qwen 显式的回合/时间预算正在成为新范式。*参考:* 循环保护、终止诚实性、扇出上限应作为运行时强制项。
3. **Windows 已是主战场。** 挂载故障、WSL 重启、剪贴板、MCP STDIO 失败出现在每一份摘要中。*参考:* 将 Windows/WSL2 CI 视为强制项,而非尽力而为。
4. **压缩正成为新的可靠性前沿。** 卡死、目标漂移、OOM 问题集中出现在长上下文会话维护场景。*参考:* 压缩正确性(目标保留、回滚语义)将比裸上下文窗口更能区分工具。
5. **透明度是信任差异点。** 静默模型回退(Claude #83510)、不透明的安全拦截(Codex #44672)、不可见的凭证选择(Copilot #4804)均招致强烈反弹。*参考:* 在审计日志中暴露路由、回退与授权决策。
6. **扩展生态即护城河。** Pi 的 RPC 模式 GUI、Copilot 的插件市场、OpenCode 的 V2 插件 API(当前已损坏,#44788)表明集成方按可扩展性选型。*参考:* 稳定的插件/事件契约与无头/RPC 模式能解锁你不必亲自构建的生态。
7. **混合多供应商工作流正在浮现。** Codex 讨论 #37960(本地 Claude 代理与远程 Codex 代理协同)与 Pi 的订阅桥接中继,暗示跨厂商编排——而非对单一厂商的忠诚——是值得关注的下一个用户模式。

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills — 社区亮点报告

**数据窗口：**截至 2026-09-11
**来源：**[anthropics/skills](https://github.com/anthropics/skills)

---

## 1. 热门 Skills 排行

PR 数据集中的参与度（engagement）字段为 undefined；以下排名由讨论度最高的 issues、变更范围与更新活跃度交叉推导得出。

### #1 — [`skill-creator` run_eval.py recall overhaul (PR #1298)](https://github.com/anthropics/skills/pull/1298) — OPEN
**作者：**MartinCajiao | **创建于：**2026-06-10
本周期影响最深远的 skill 基础设施 PR。`run_eval.py`（以及依赖它的描述优化循环）此前一直在对所有 skill 静默返回 `recall=0%`。该 PR 将评估产物改造成真正可安装的 skill，并修补了 Windows 流读取、触发检测与并行 worker 路径。它直接对应 [Issue #556](https://github.com/anthropics/skills/issues/556)（12 条评论、10+ 次复现）。状态：open，最后更新于 2026-06-23。

### #2 — [Windows subprocess/encoding fix for skill-creator (PR #1050)](https://github.com/anthropics/skills/pull/1050) — OPEN
**作者：**gstreet-ops | **创建于：**2026-04-27
两处单行级 Windows 11 修复，彻底解除 `run_loop.py` 在 Windows 上的阻塞：`subprocess.Popen(["claude", …])` 之所以失败，是因为 CLI 以 `claude.cmd` 形式分发，而 Python 会忽略 `PATHEXT`。与 #1099 和 #1298 配套。

### #3 — [`run_eval.py` Windows pipe-read crash fix (PR #1099)](https://github.com/anthropics/skills/pull/1099) — OPEN
**作者：**joshuawowk | **创建于：**2026-05-07
解决了 `[WinError 10038]` 报错刷屏的问题——正是它导致 Windows 上每条查询都被记为“not triggered”。针对与 #1298 相同评估管线的精准、高杠杆修复。

### #4 — [mcp-builder evaluation/metrics/encoding stability (PR #1602)](https://github.com/anthropics/skills/pull/1602) — OPEN
**作者：**AbhiPra24 | **创建于：**2026-08-17
针对 Phase-4 MCP 评估框架的一揽子修复——涵盖 MCP 结果块的文本内容提取、序列化、编码及基准指标计算。解决 [Issue #1390](https://github.com/anthropics/skills/issues/1390) 背后的根因。

### #5 — [`mcp-builder` mcp≥2 import + custom headers (PR #1742)](https://github.com/anthropics/skills/pull/1742) — OPEN
**作者：**Kuldeeep18 | **创建于：**2026-09-08
让 `connections.py` 适配 mcp 2.x（`streamable_http_client` 更名 + 用 `http_client`/`create_mcp_http_client` 支持自定义 headers）。最新的 mcp-builder 兼容性补丁。

### #6 — [`claude-api` retire obsolete model IDs (PR #1607)](https://github.com/anthropics/skills/pull/1607) — OPEN
**作者：**adi-IL | **创建于：**2026-08-18
将 `claude-opus-4-1`、`claude-sonnet-4-0`、`claude-opus-4-0`、`claude-3-haiku-20240307` 标记为已退役。堵住了一处把用户引向已弃用快照的文档漂移——与 [Issue #1487](https://github.com/anthropics/skills/issues/1487) 中报告的上下文耗尽问题相关。

### #7 — [doc-typography skill (PR #514)](https://github.com/anthropics/skills/pull/514) — OPEN
**作者：**PGTBoos | **创建于：**2026-03-04
新增 skill，用于捕捉 AI 生成文档中的孤行/寡行与编号错位问题。信噪比极高：这是每个产出文档的会话都需要的一道单一用途质量关卡。

### #8 — [ODT skill (PR #486)](https://github.com/anthropics/skills/pull/486) — OPEN
**作者：**GitHubNewbie0 | **创建于：**2026-03-01
功能完整的 OpenDocument 创建 / 填充 / HTML 解析 skill，将 Claude 的文档覆盖面扩展到 docx/pdf 主轴之外。长周期 PR，讨论持续至 2026-04-14。

---

## 2. 社区需求趋势

以下提炼自参与度最高的 Issues：

| 排名 | 主题 | 锚定 Issue | 评论数 |
|---|---|---|---|
| 1 | **社区 skills 的信任 / 出处** | [#492 Community skills under `anthropic/` namespace enable trust-boundary abuse](https://github.com/anthropics/skills/issues/492) | 43 |
| 2 | **组织级 skill 分发** | [#228 Enable org-wide skill sharing in Claude.ai](https://github.com/anthropics/skills/issues/228) | 16 |
| 3 | **评估基础设施的可靠性** | [#556 `run_eval.py` 0% trigger rate](https://github.com/anthropics/skills/issues/556) | 12 |
| 4 | **Skill 持久化 / 生命周期体验** | [#62 All skills disappeared after rename](https://github.com/anthropics/skills/issues/62) | 10 |
| 5 | **紧凑 / 符号化 agent 记忆** | [#1329 compact-memory skill proposal](https://github.com/anthropics/skills/issues/1329) | 9 |
| 6 | **Skill creator 重写为操作式风格** | [#202 `skill-creator` should be updated to best practice](https://github.com/anthropics/skills/issues/202) *(已关闭)* | 8 |
| 7 | **插件安装去重** | [#189 document-skills and example-skills cause duplicates](https://github.com/anthropics/skills/issues/189) | 6 |
| 8 | **Agent 治理与安全模式** | [#412 Agent-governance skill proposal](https://github.com/anthropics/skills/issues/412) *(已关闭)* | 6 |
| 9 | **捆绑 skills 的上下文窗口预算** | [#1487 `claude-api` injects ~156k tokens](https://github.com/anthropics/skills/issues/1487) | 4 |
| 10 | **推理质量关卡流水线** | [#1385 Pre-task calibration → adversarial review → delivery verification](https://github.com/anthropics/skills/issues/1385) | 4 |

**反复出现的需求集群：**

- **工作流自动化与多 agent 编排** —— 体现在 [#1329](https://github.com/anthropics/skills/issues/1329)（compact-memory）和 [PR #1628 Hivemind](https://github.com/anthropics/skills/pull/1628)（零成本多 agent 委派）。
- **代码审查 / 输出审计** —— [PR #1367 self-audit](https://github.com/anthropics/skills/pull/1367)、[#1385 quality-gate pipeline](https://github.com/anthropics/skills/issues/1385) 以及 [PR #83 skill-quality-analyzer + skill-security-analyzer](https://github.com/anthropics/skills/pull/83)。
- **测试 / 评估生成的可靠性** —— 集中于 [#556](https://github.com/anthropics/skills/issues/556) 和 [#1390](https://github.com/anthropics/skills/issues/1390)；社区本质上是在呼吁一个*用于度量 skills 的元 skill（meta-skill）*。
- **文档与文档格式类 skills** —— [PR #514 typography](https://github.com/anthropics/skills/pull/514)、[PR #486 ODT](https://github.com/anthropics/skills/pull/486)、[PR #1734 orphaned docx comments](https://github.com/anthropics/skills/pull/1734) 以及 [PR #210 frontend-design](https://github.com/anthropics/skills/pull/210)。
- **分发渠道** —— [#228 org-wide sharing](https://github.com/anthropics/skills/issues/228)、[#16 expose Skills as MCPs](https://github.com/anthropics/skills/issues/16)、[#29 AWS Bedrock](https://github.com/anthropics/skills/issues/29)。

---

## 3. 高潜力待合并 Skills

以下 PR 均为 open 状态、时间较新，且在结构上契合社区需求——最有可能下一步落地：

| PR | Skill | 高潜力原因 |
|---|---|---|
| [PR #1628 Hivemind](https://github.com/anthropics/skills/pull/1628) | 通过 headless opencode workers 实现零成本多 agent 编排 | 直接命中“将机械性工作委派给廉价模型”的工作流自动化需求 |
| [PR #1367 self-audit v1.3.0](https://github.com/anthropics/skills/pull/1367) | 机械验证 + 四维推理质量关卡 | 与 #1385 质量关卡流水线提案及 #492 的信任顾虑相契合 |
| [PR #1627 buffer-api](https://github.com/anthropics/skills/pull/1627) | 面向任意 agent 的可移植 Buffer GraphQL 调度 | [#16](https://github.com/anthropics/skills/issues/16) 中“Skills 作为跨 agent API 表面”方向的一等范例 |
| [PR #514 document-typography](https://github.com/anthropics/skills/pull/514) | 对生成文档的排版 QC | 长周期 PR、范围聚焦，填补一个普遍性空白 |
| [PR #486 ODT](https://github.com/anthropics/skills/pull/486) | OpenDocument 创建/填充/解析 | 扩展文档格式覆盖面；持续受到关注 |
| [PR #1615 scnet-hpc](https://github.com/anthropics/skills/pull/1615) | 在 SCNet HPC 上基于 profile 的 SSH/Slurm 操作 | 领域专用，但对学术 HPC 用户高度可复用 |
| [PR #83 skill-quality-analyzer + skill-security-analyzer](https://github.com/anthropics/skills/pull/83) | 用于评估其他 skills 的元 skills | 直接回应 #492 的信任边界问题 |

---

## 4. Skills 生态洞察

> **社区最集中的需求，是*面向 skills 本身的信任基础设施*——来源验证、质量/安全分析，以及一条真正能跑通的评估闭环——其呼声高于任何一个新的领域 skill。**

证据：[#492 (43 comments)](https://github.com/anthropics/skills/issues/492) 的热度远超其他所有 issue；[PR #83](https://github.com/anthropics/skills/pull/83) 与 [PR #1367](https://github.com/anthropics/skills/pull/1367) 构建的是元分析类 skills；[

---

# Claude Code 社区简报 — 2026-09-11

## 1. 今日要点

v2.1.268 版本带来了 managed settings 与 `/cost` 的对齐以及网关启动警告，但当前社区最紧迫的关注点是 KB5124008 更新后出现的 **Cowork/Windows Plan9 挂载失败潮** —— 三个开放中的 issue(#92984、#93118、#93071、#93221)正汇聚到同一根因上。此外，一个严重的成本控制回归(#83048)以及 `--resume` 时持续出现的提示词缓存未命中，正引来运行 agent 集群的高阶用户的密切关注。

## 2. 版本发布

**v2.1.268**(最新)
- **Claude 应用网关定价对齐：** 当 `gateway.yaml` 中配置了 `pricing:` 时，已登录的 Claude Code 客户端将通过 managed settings 获得相匹配的费率，`/cost` 与遥测数据因此与消费计量器保持一致。
- **网关启动警告：** 当 `access_control.allow_cidrs` 为空时，现在会发出一条启动警告——在流量开始传输之前，就暴露出可能配置有误的出口策略。

## 3. 热门 Issue

1. **[#92984](https://github.com/anthropics/claude-code/issues/92984)** — KB5124008 (26200.9445) 之后，Windows 上的 Cowork 对所有 Plan9 共享均报 `"Plan9 mount failed: invalid argument"` 失败；卸载该 KB 即可恢复。**81 条评论、40 👍** —— 本周期热度最高的 bug,也是横跨多个 issue 的回归问题集群的锚点。
2. **[#76248](https://github.com/anthropics/claude-code/issues/76248)** — Cowork/云会话的 git 代理现在会阻止向会话“授权仓库集”(authorized repository set)之外的仓库推送，即使用户附上自己的细粒度 PAT 也不例外。**34 条评论** —— 破坏了此前已有文档记载的工作流，自 7 月开放至今悬而未决。
3. **[#66402](https://github.com/anthropics/claude-code/issues/66402)** — `/model` 与 `/effort` 会全局改写 `~/.claude/settings.json`,导致在集群视图中无法按 agent 配置模型或 effort。**14 👍** —— 随着用户扩大 agent 规模，这是一个明显的架构缺口。
4. **[#83510](https://github.com/anthropics/claude-code/issues/83510)** — 报告 Claude 第 5 代(Fable 5 / Opus 5 / Sonnet 5)存在可度量的质量回归：对无意义内容的检测变差、冗长度约达 2 倍，以及从 Fable 5 静默回退到 Opus 4.8。**21 👍** —— 直接指称存在未披露的模型回退，敏感性极高。
5. **[#92183](https://github.com/anthropics/claude-code/issues/92183)** — 桌面应用不允许 `SendMessage`,导致子 agent 无法被发送消息或恢复。**18 👍** —— 破坏了桌面用户进行 agent 编排的一项关键能力。
6. **[#34690](https://github.com/anthropics/claude-code/issues/34690)** — "Allow network egress — all domains" 设置未反映到会话代理 JWT 中。**17 👍** —— 网页/网络控制项与实际行为长期不一致的老问题，自 3 月起一直未关闭。
7. **[#83913](https://github.com/anthropics/claude-code/issues/83913)** — 历史重建期间，只要 `PreToolUse`/`PostToolUse` 的 `additionalContext` 发生变化，提示词缓存就会被作废，造成每轮缓存未命中并按缓存写入(cache-write)费率额外计费。在机制上与另外几份缓存未命中报告相关联。
8. **[#83048](https://github.com/anthropics/claude-code/issues/83048)** — SEV-1:`budget.spent()` 的上报值比实际消耗低约 72 倍，导致 50 个 agent 中有 36 个在 4 小时内烧穿每周预算。**报告者自行标记为需要升级处理**，以免更多用户中招。
9. **[#91971](https://github.com/anthropics/claude-code/issues/91971)** — 在链式 `-p --resume` 调用之间提示词缓存从未命中，即便采用最小配置也一样。与 #93490(同一症状出现在 Fable 5.1 上，但原因更具体)及 #83913 相互印证。
10. **[#82653](https://github.com/anthropics/claude-code/issues/82653)** — `claude-opus-5[1m]` 上的自动模式权限分类器中断持续数日；文档所载的“三次失败后回退为提示确认”机制从未生效(fails closed,失效即拒绝)。其重要性在于：对许多 agent 集群而言，自动模式是默认设置。

*(荣誉提及:[#57295](https://github.com/anthropics/claude-code/issues/57295) 在社区协助诊断出 `@Human` 冲突后关闭;[#68773](https://github.com/anthropics/claude-code/issues/68773) 计费循环案例已关闭，但用户对人工升级的呼声仍在。)*

## 4. 重点 PR 进展

> 过去 24 小时内仅 3 个 PR 有更新——全部列出。

1. **[PR #93244](https://github.com/anthropics/claude-code/pull/93244)** *(已关闭)* — `mods`:API 重命名、遥测修复以及 diff 后端接缝(seam)。重命名以对齐插件 API 的 `isFocused` / `tool` 传递；收紧分析逻辑(行序固定、开关按行读取、第三方 provider 不发送任何数据)；引入 git 后端接缝，使 diff 模块可以更换 VCS provider。*(已合并，未并入下方的 PR #93452。)*
2. **[PR #93452](https://github.com/anthropics/claude-code/pull/93452)** *(开放中)* — `mods/diff`:对齐内置 `/diff` 面板。使用引擎的 code 元素，复刻内置的关闭 ✕、行间距、空状态位置、窄终端下的 resize 线，并将仓库探测限制为同一时间仅一个在途。
3. **[PR #89404](https://github.com/anthropics/claude-code/pull/89404)** *(开放中)* — `validate-agent.sh`:不再在首个警告处即中止(`set -e` + `((x++))`),并不再将合法 agent 误判为无效。修复了三个由 `set -euo pipefail` 相互作用引发的 bug,正是它们导致 plugin-dev skill 的校验器对其自带的 agent 校验失败(closes #83803)。

## 5. 热门讨论

*本简报窗口期内未提供讨论数据——本节省略。*

## 6. 功能请求趋势

从浮出水面的各 issue 来看，呼声最高的方向包括：

- **按 agent / 按集群的模型与 effort 配置** —— `/model` 与 `/effort` 写入全局 `settings.json` 的行为，被反复点名为有规划地运行 agent 集群的拦路石(#66402)。
- **在 Cowork/云环境中保留信任的 git 推送** —— 恢复 PAT 透传，或让“授权仓库集”真正可配置(#76248)。
- **`--resume` 与历史重建时的提示词缓存可靠性** —— 三个 issue(#83913、#91971、#93490)描述了同一机制：逐轮会话内容未被提升进可复用缓存，导致按缓存写入费率被计费。
- **透明的模型路由** —— 用户希望在请求被降级(例如 Fable 5 → Opus 4.8)时得到明确信号，而不是静默回退(#83510)。
- **子 agent 生命周期控制** —— 桌面应用中的 `SendMessage`/`--resume`(#92183),以及防止子 agent 递归扇出的显式护栏(#82565:请求 3 个 → 实际运行 24 个)。
- **一等公民级的 egress / 网络策略 UI** —— 让 "Allow all domains" 真正传播到会话代理 JWT(#34690)。
- **成本控制原语** —— `budget.spent()` 在集群负载下的准确性(#83048),以及 Max 订阅下更清晰的 `--max-budget-usd` 语义(#85400)。

## 7. 开发者痛点

本周反复浮现的困扰：

- **“成本计量与现实对不上。”** 无论是网关与消费计量器不一致(v2.1.268 的修复只覆盖其中一半)、`budget.spent()` 少报约 72 倍、5 小时配额用量飙升约 15-20 倍，还是 `--max-budget-usd` 在 API 成本为零时就终止 Max 支撑的运行——成本信号目前仍须核验后才能采信。
- **“相同前缀却缓存未命中。”** 多份报告指出，静态的系统提示词/工具定义前缀可以正确缓存，而逐轮会话内容始终无法提升进缓存，推高了长时间 agent 运行的开销。
- **“Windows 上的 Cowork 对系统更新很脆弱。”** KB5124008 引发的 Plan9 问题集群只是显例；翻查 issue 历史就会发现，宿主侧任何 Windows 或内核层面的变更，都可能悄无声息地破坏 Cowork 挂载或设备身份(#88692 中重装后 `ant-did` 被遗弃成孤儿)。
- **“自动模式失效即封闭、没有回退。”** 当 `claude-opus-5[1m]` 权限分类器宕机时，文档记载的“三次失败后回退为提示确认”机制并不会触发——agent 直接停摆，而不是发起询问(#82653)。
- **“子 agent 编排四处漏风。”** 递归扇出、结果丢失以及队友系统提示词相互矛盾(#82565、#86070),让生产环境中的 agent 集群难以预测。
- **“重装桌面应用会静默遗弃既有会话。”** `ant-did` 被重新生成，而 `remoteToolsDeviceName` 得以保留，导致既有会话永久报 "Can't reach your computer" 错误(#88692)。

---

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-11

## 1. 今日要点

Python SDK **0.154.0** 与新增的 **`max` 和 `ultra` 推理强度值** 一同发布（[#39662](https://github.com/openai/codex/pull/39662)），Rust **0.155.0-alpha.1/2** 构建也已在迭代中。当下社区最热议的话题是一波 **"Selected model is at capacity"** 错误，覆盖 CLI、桌面端以及多个 GPT-5/GPT-6 模型 —— 今日首页上已有三个相关 issue。与此同时，过去 24 小时内合并了约 20 个 PR，其中较重要的包括 Windows 沙箱防火墙加固、登录重定向安全修复，以及语音工具的扩展。

## 2. 版本发布

- **python-v0.154.0** — Python SDK 0.154.0；通过 `pip install --upgrade openai-codex==0.154.0` 安装（Python 3.10+），包含配套的 `openai-codex-cli-bin==0.154.0`。
- **推理强度扩展** — [#39662](https://github.com/openai/codex/pull/39662) 新增 `max` 和 `ultra` 推理强度值；同时在同步 API 中加入 `ExternalMessage`。
- **rust-v0.155.0-alpha.2 / alpha.1** — 面向 0.155.0 的预发布迭代。
- **voice-cygwin-108b38cf67cbb731** — 仅用于 CI 的 Cygwin 构建输入（103 个固定包 + 源码），用于原生 Windows 语音版本；**未**包含在用户包中。

## 3. 热门 Issue

1. **[#43375](https://github.com/openai/codex/issues/43375)** — 多个 GPT-5/GPT-6 模型出现 "Selected model is at capacity"（20 条评论，11 👍）。今日热度最高的 issue；用户反馈该错误与模型无关，疑似服务端容量问题而非按模型限流。参见相关 [#44382](https://github.com/openai/codex/issues/44382)（CLI，11 条评论）和 [#43368](https://github.com/openai/codex/issues/43368)（macOS 桌面端，9 条评论）。
2. **[#21073](https://github.com/openai/codex/issues/21073)** — 使用额度重置时自动恢复 CLI 会话（50 👍，15 条评论）。企业用户长期以来的诉求：错误信息中已包含重置时间，但 Codex 不会自动恢复 —— 导致通宵批处理任务卡住。
3. **[#18396](https://github.com/openai/codex/issues/18396)** — 在 TUI 中隐藏工具调用/输出（34 👍）。呼声已久的"降噪"功能；冗长的工具输出让长会话难以阅读。
4. **[#40002](https://github.com/openai/codex/issues/40002)** — Android Remote 因大小写敏感的路径查找而无法验证受信的 Windows 项目（15 条评论）。破坏了 Plus 用户的移动端到 Windows Remote 工作流。
5. **[#42683](https://github.com/openai/codex/issues/42683)** — Alt+P 快捷键导致 Windows 应用崩溃（15 条评论，目前已 CLOSED）。多名 Windows 10 用户反馈的热键崩溃问题。
6. **[#37453](https://github.com/openai/codex/issues/37453)** — Windows 桌面端在恢复历史子代理线程时会生成重复的 MCP 和 `node_repl` 进程栈（10 条评论）—— 与 MCP 生命周期处理相关的资源泄漏。
7. **[#43855](https://github.com/openai/codex/issues/43855)** — 在 Windows CLI 0.153.4 + GPT-6-Astra 下，Codex 在压缩后停止响应；该会话连续性故障模式影响长时间任务。
8. **[#44130](https://github.com/openai/codex/issues/44130)** — Codex 在只读任务中插入了不相关、可能改变状态 的命令（GPT-5.6 Sol、WSL2）。引发对模型在非变更类任务上行为的安全/信任顾虑。
9. **[#44398](https://github.com/openai/codex/issues/44398)** — Astra 编辑器中的闪光动画在 kitty 中阻塞鼠标文本选择（0.154.0）。值得关注的点是今日合并的 [#44666](https://github.com/openai/codex/pull/44666) 新增了减弱动效（reduced-motion）支持，可能缓解此问题。
10. **[#44612](https://github.com/openai/codex/issues/44612)** — 更新后 WSL 反复重启，Codex 停止工作。类回归问题报告，暂无解决方案；留意 PR 队列中针对 Windows 的修复。

## 4. 关键 PR 进展

1. **[#44670](https://github.com/openai/codex/pull/44670)** — **安全**：将登录设置的跳转目标限制为已知平台来源，防止 ID token 通过 `platform_url` 泄露到任意目的地。
2. **[#44639](https://github.com/openai/codex/pull/44639)** — **安全**：为 Windows 离线沙箱添加入站非环回地址防火墙阻断，与现有出站规则形成互补。
3. **[#44671](https://github.com/openai/codex/pull/44671)** — 语音会话现可通过丢弃陈旧/超额的音频队列并保持静音对端存活，扛过静音和音频积压。
4. **[#44622](https://github.com/openai/codex/pull/44622)** — 新增 `/voice settings` TUI 选择器，用于为后续会话选择语音，并遵循服务端项目设置。
5. **[#44629](https://github.com/openai/codex/pull/44629)** — `codex mcp login <name> --no-browser` 接受手动粘贴的跳转 URL —— 解锁无头/受限浏览器环境下的 MCP OAuth。
6. **[#44636](https://github.com/openai/codex/pull/44636)** — OAuth 元数据发现在 503 时回退到 OIDC 元数据，使过期 token 在 MCP 启动期间仍可刷新。
7. **[#44666](https://github.com/openai/codex/pull/44666)** — TUI 在 macOS/Windows/Linux 上遵循系统的减弱动效偏好（无障碍体验提升；与 #44398 相关）。
8. **[#44650](https://github.com/openai/codex/pull/44650)** — 面向企业：托管需求现在可强制设定 `model_provider` 选择和定义，覆盖本地/会话配置。
9. **[#44626](https://github.com/openai/codex/pull/44626)** — 将 MXC 启动请求迁移到有界的环境变量传输（`CODEX_MXC_*` JSON），绕开大型沙箱策略下的 Windows 命令行长度限制。
10. **[#44658](https://github.com/openai/codex/pull/44658)** — Windows 沙箱的私有桌面缓存在调用进程中，可跨帮助进程退出存活并支持在多次文件系统请求间复用。

同时合并的还有：按模型的回合指标归因（[#44656](https://github.com/openai/codex/pull/44656)）、线程级插件排除（[#44655](https://github.com/openai/codex/pull/44655)）、Codex Doctor 环境变量诊断保留（[#44654](https://github.com/openai/codex/pull/44654)），以及分析数据退出选项的传递（[#44646](https://github.com/openai/codex/pull/44646)）。

## 5. 热门讨论

### Ideas
- **[#9618](https://github.com/openai/codex/discussions/9618)** — "怎么到现在还没有 /rewind 或 /revert 功能？"（**131 👍**，23 条评论）。今日获赞最多的讨论；用户普遍认为与 OpenCode 和 Claude Code 的撤销支持相比处于下风。
- **[#12567](https://github.com/openai/codex/discussions/12567)** — OpenAI 的 jif-oai 正在收集关于 **Codex 中的 Memories** 的意见（36 条评论）：引用透明度，以及记忆应按项目还是全局划分。
- **[#44419](https://github.com/openai/codex/discussions/44419)** — VS Code 扩展将历史会话上限限定为 50 个本地会话；用户希望与桌面端一样支持分页/搜索。
- **[#44547](https://github.com/openai/codex/discussions/44547)** — 一则措辞强烈的请求，要求移除桌面吉祥物功能；与之形成对比的是 [#44421](https://github.com/openai/codex/discussions/44421)，后者希望**增加**吉祥物在长时间任务中作为轻量级侧栏信息通道的呈现。

### Q&A
- **[#42503](https://github.com/openai/codex/discussions/42503)** — 尽管 9 月 1 日已发布公告，用户仍在寻找 Codex 中 Astra 的官方上线时间。
- **[#43257](https://github.com/openai/codex/discussions/43257)** — 实验性上下文管理的历史查找在多日 Pro 任务中如何计入使用额度 —— 计费语义尚不清晰。
- **[#37960](https://github.com/openai/codex/discussions/37960)** — 在跨仓库场景下协调本地基于 Claude 的代理与远程 Codex 代理；混合多供应商工作流正在成为一种新兴模式。

### Show and tell
- **[#44641](https://github.com/openai/codex/discussions/44641)** — **Codex Limits**：跨平台 CLI/TUI，用于查看用量、重置时间和重置额度 —— 在容量错误霸占 issue 追踪器的同一天发布。
- **[#44368](https://github.com/openai/codex/discussions/44368)** — **Usage HUD**：macOS 菜单栏用量计量工具，可跟踪 Codex/Claude/Gemini/Grok/Ollama 窗口并附置信度标签。
- **[#44453](https://github.com/openai/codex/discussions/44453)** — OrcaReplay 深入剖析了为何 `OPENAI_BASE_URL` 无法重定向配置了 `config.toml` 的 Codex，并基于该修复构建了一个会话录制/回放工具。

## 6. 功能请求趋势

- **会话回滚与历史**：`/rewind`-`/revert` 是呼声最高的诉求（#9618，131 👍）；与之并列的还有 VS Code 会话分页（#44419）以及额度重置时自动恢复（#21073）。
- **用量可见性与额度体验**：本周社区独立交付了三款仪表盘（Codex Limits、Usage HUD、CodexFuse）—— 官方客户端在额度/重置可见性方面显然未能满足需求。
- **TUI 输出控制**：隐藏工具调用噪声（#18396）、可逆的"Calm mode"（#37227）以及减弱动效支持 —— 三者都聚焦于减少视觉杂乱。
- **记忆与上下文连续性**：官方 Memories 设计讨论（#12567）、上下文管理成本问题（#43257），以及压缩相关的卡顿（#43855）。
- **语音打磨**：语音选择器设置（#44622）和会话韧性（#44671）表明在原生 Windows 语音构建发布前持续投入。

## 7. 开发者痛点

- **模型可用性**：容量错误是当前头号痛点，覆盖 Plus/Pro 套餐、CLI 与桌面端，以及至少四种模型变体（#43375、#44382、#43368）—— 用户侧无解。
- **额度使用摩擦**：硬性失败而非排队/恢复（#21073、#15788）浪费了通宵自动化的窗口期；重置信息虽已显示但不可操作。
- **Windows 是体验最差的平台**：更新后 WSL 重启循环（#44612）、大小写敏感性破坏 Remote 信任（#40002）、app-server 0xC0000005 崩溃（#44315）、Chrome/Edge 控件回退（#44140），以及 MCP 进程泄漏（#37453）。
- **长会话可靠性**：压缩卡顿（#43855）、导致持久历史卡住的 rollout 序号损坏（#44609），以及会话中段忽略 MCP 工具列表变更（#37417）—— 重度用户受影响最大。
- **安全检查过度触发**：网络安全警告阻塞日常工作（#44515）以及不透明的审查拦截（无可见发现或恢复路径）（#44672）正在削弱用户对防护机制的信任。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-11

## 今日要点

夜间版本 `v0.61.0-nightly.20260910.ged2ac40df` 已于凌晨发布，社区关注重点集中在 **安全加固**（沙箱边界、路径穿越、OAuth 持久化）以及 **Auto Memory 可靠性** 方面。最受热议的帖子仍是企业 Workspace 认证问题，目前评论数已达 42 条且仍在增长。

## 版本发布

- **v0.61.0-nightly.20260910.ged2ac40df** — 自动化夜间版本更新。完整变更日志：[compare diff](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260909.ged2ac40df...v0.61.0-nightly.20260910.ged2ac40df)

## 热门议题

1. **[#29101](https://github.com/google-gemini/gemini-cli/issues/29101) — 认证失败导致企业 Workspace 账号受阻**（42 条评论，👍 2）。*P1 企业级 Bug。* 此前可正常使用的 Google Workspace + Cloud Project 配置现在无法完成认证，阻塞了大量企业用户。当日讨论最活跃的帖子。
2. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — 子代理在达到 MAX_TURNS 后仍报告 GOAL 成功**（13 条评论）。将中断的子代理任务错误报告为成功，会掩盖实际中断——这是一个影响评估可靠性的隐性正确性 Bug。
3. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — 零依赖操作系统级沙箱与执行后意图路由**（9 条评论，enhancement）。建议利用 Gemini 3 原生的 bash 亲和性，通过操作系统级沙箱方案，避免引入较重的依赖。
4. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — 通用代理无限挂起**（8 条评论，👍 8，P1）。即便是简单的文件夹创建操作，在委派给通用代理时也可能挂起超过一小时，社区关注度很高。
5. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — 评估 AST 感知文件读取/搜索/映射的影响**（7 条评论，epic）。探讨 AST 感知工具（例如方法级读取）带来的 token 节省与精度提升。
6. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini 未能充分利用自定义技能与子代理**（6 条评论）。自定义技能需要显式提示才能调用，削弱了个性化的价值。
7. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — 为 Auto Memory 提供确定性脱敏方案**（5 条评论，security）。基于 LLM 的密钥脱敏发生在内容已进入模型上下文之后——需要在源头进行预脱敏处理。
8. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell 命令执行完成后卡在 "Waiting input" 状态**（4 条评论，👍 3，P1）。即使是简单命令也受影响，破坏了交互式 Shell 流程。
9. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — 浏览器子代理在 Wayland 下启动失败**（4 条评论，P1）。报告称浏览器子代理尽管实际未能启动，仍以 GOAL 状态终止。
10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 启用超过 128 个工具时出现 400 错误**（3 条评论）。工具数量上限导致 API 直接硬失败，而非优雅降级。

## 重点 PR 进展

1. **[#29282](https://github.com/google-gemini/gemini-cli/pull/29282) — `fix(auth)`：登录后持久化 OAuth 凭证**（P2，security）。消除浏览器/用户码认证流程成功后仍被重复提示的问题。
2. **[#29214](https://github.com/google-gemini/gemini-cli/pull/29214) — `fix(sandbox)`：强化文件系统边界并隔离运行时状态**（XL）。使用净化后的配置替代宿主机目录挂载，并统一使用 realpath 解析。
3. **[#29116](https://github.com/google-gemini/gemini-cli/pull/29116) — `fix(core)`：缓解 NTFS 8.3 短文件名（SFN）路径穿越**（已关闭）。关闭了 `AllowedPathChecker` 在 Windows 上的特定绕过方式（例如 `git~1`、`env~1`）。
4. **[#29250](https://github.com/google-gemini/gemini-cli/pull/29250) — `fix(core)`：防止通过构建文件/不可信标志发起的间接提示注入**（XL）。重构 `shell`、`edit` 和 `write_file`，在受限模式下校验工作区边界。
5. **[#29249](https://github.com/google-gemini/gemini-cli/pull/29249) — `fix(core)`：修复 `get_internal_docs` 路径守卫中的兄弟前缀绕过**（P1，security）。原本天真的字符串前缀检查导致兄弟目录的文档内容泄露给模型。
6. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200) — `fix(core)`：运行时统一强制执行 MCP 策略**（P2，enterprise）。将运行时 MCP 检查统一为大小写不敏感、空白修剪的匹配方式，并将空的 `mcp.allowed` 视为默认拒绝（fail-closed）。
7. **[#29134](https://github.com/google-gemini/gemini-cli/pull/29134) — `fix(cli)`：保护当前会话不被删除**（P2）。通过更严格的文件名匹配，防止通过 `--delete-session` 误删当前活跃会话。
8. **[#29278](https://github.com/google-gemini/gemini-cli/pull/29278) / [#29277](https://github.com/google-gemini/gemini-cli/pull/29277) — `fix(core)`：为 `expandEnvVars` 实现无冲突的键**（P2）。此前该辅助函数在遇到哨兵键冲突时会回退返回调用方传入的环境变量值——这是一个值得关注的微妙正确性 Bug。
9. **[#29094](https://github.com/google-gemini/gemini-cli/pull/29094) / [#29095](https://github.com/google-gemini/gemini-cli/pull/29095) — CVE 升级：`simple-git` 3.32.3 与 `shell-quote` 1.8.4**（均已关闭）。关键 CVE 补丁已发布。
10. **[#29271](https://github.com/google-gemini/gemini-cli/pull/29271) — `refactor`：简化项目结构与元数据**（P1，XL）。精简构建脚本并集中管理元数据。

> 注：PR #29272（`SECURITY.md`）、#29274（`NB-gemini`）以及 #29273（workflows eval）似乎是未完成/占位符提交，可能需要审阅人跟进。

## 功能请求趋势

提炼自活跃议题与史诗任务：

- **AST 感知工具**，用于代码库映射、方法级读取以及精准导航，以减少 token 浪费（#22745、#22746、#19561）。
- **操作系统级沙箱与意图路由**，尊重 Gemini 3 原生的 bash 亲和性（#19873）。
- **子代理可观测性**——通过 `/chat share` 公开轨迹、丰富 `/bug` 报告，以及对 CLI 机制的自我感知（#22598、#21763、#21432）。
- **更安全的代理行为**——劝阻破坏性的 git/数据库命令，并改进 subagent 的 settings.json 覆盖机制（#22672、#22267）。
- **浏览器代理韧性**——会话接管、锁恢复以及 Wayland 兼容性（#22232、#21983）。
- **记忆质量与安全性**——确定性脱敏、重试限制以及对无效补丁的隔离（#26525、#26522、#26523、#26516）。
- **节省 token 的读取方式**——"Tactful Extraction" 分层策略以避免上下文被大量灌入（#19561）。

## 开发者痛点

- **企业认证不稳定**——此前可用的 Workspace + GCP 配置现在会静默失败（#29101）。
- **子代理终止信号不可靠**——代理即使在达到 `MAX_TURNS` 时仍报告 `GOAL`（#22323），且 bug 报告会剥离子代理上下文（#21763）。
- **代理挂起**——通用代理与 shell 执行路径在简单任务上都可能无限阻塞（#21409、#25166、#22465）。
- **工具数量上限**——启用过多工具时出现静默的 400 错误（#24246）；用户期望能够优雅地收敛工具集。
- **工作区污染**——当 shell 执行受限时，临时脚本会散落在各目录中（#23571）。
- **符号链接与发现机制的怪癖**——`~/.gemini/agents/` 中的代理通过符号链接放置时无法被识别（#20079）。
- **会话恢复断层**——`/compress` 不会持久化，跨会话浪费 token（#21335）。
- **记忆系统噪声**——低信息量的会话被无限重试，无效补丁被静默吞掉（#26522、#26523、#26516）。
- **安全回退**——兄弟前缀绕过与 NTFS 8.3 路径穿越绕过（#29249、#29116），加上通过构建文件发起的间接提示注入（#29250），是今日 PR 浪潮的主要驱动。
- **自定义技能被忽略**——Gemini 经常不会主动调用技能/子代理，除非被显式告知（#21968），削弱了个性化效果。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区动态摘要 — 2026-09-11

## 今日要点

- **v1.0.84-4** 带来更整洁的插件/指令界面：新增独立的 `copilot instruction list` 与 `copilot lsp list` 命令，取代原先的 `copilot plugins list --kind` 标志，同时为插件列表提供 `--json` 输出以及 `enable`/`disable` 子命令。
- **内存稳定性是当天的核心议题** — 多条高严重度的 OOM/泄漏报告（#4686、#4725、#4699、#4780）描述了 libuv 句柄泄漏、堆内存触及 4 GiB 上限耗尽，以及无法恢复的压缩崩溃。
- **规范/契约回归出现在 MCP 与 Windows 平台**：原生 MCP 客户端发送了非标准的 `initialize` 之前请求（#4809），Windows/WSL2 用户则持续遭遇剪贴板与插件更新失败问题（#3260、#3534、#4095）。

## 发布版本

**[v1.0.84-4](https://github.com/github/copilot-cli/releases/tag/v1.0.84-4)** — *2026-09-10*

**新增**
- 新增 `copilot instruction list` 与 `copilot lsp list` 命令，取代 `copilot plugins list --kind instruction` 与 `--kind lsp`。
- 为 `copilot plugin list`、`copilot plugin marketplace list` 与 `copilot plugin marketplace browse` 增加 `--json` 输出标志，便于脚本化查询。
- 为 `copilot plugin` 增加 `enable` / `disable` 子命令，可在 CLI 内直接管理插件生命周期。

## 热门 Issue

1. **[#13 — Vi/Vim 输入模式（已关闭）](https://github.com/github/copilot-cli/issues/13)** — 长期呼声很高的功能请求：希望在 CLI 交互式提示中支持模态编辑器按键绑定。经过 12 条评论与 **76 👍**，现已关闭，是仓库中获赞最多的开放功能请求。

2. **[#4742 — Desktop 1.1.15：无法创建第二个 Local 会话](https://github.com/github/copilot-cli/issues/4742)** — 最近的回归：在已存在 CLI 会话的项目中创建第二个分支型会话时失败，提示 "This project already has an active Local workspace"。11 条评论，阻塞桌面端用户的工作流。

3. **[#1285 — 组织级 Agent 不显示](https://github.com/github/copilot-cli/issues/1285)** — 企业/Agent 发现缺陷：在 `{org}/.github-private` 仓库中声明的 Agent 始终不会出现在 CLI 或 VS Code 中。9 条评论、11 👍，对组织级自定义 Agent 的推广影响很大。

4. **[#4095 — Windows：`plugin update` 失败，提示 Access is denied (os error 5)](https://github.com/github/copilot-cli/issues/4095)** — VS Code 的 Copilot 扩展会持有已安装插件目录的监视句柄，从而阻塞 CLI 的更新流程。**21 👍**，是当前获赞最多的开放 Bug，也是 Windows 平台典型的小毛病。

5. **[#4686 — Node.js OOM 崩溃，运行约 37 分钟后泄漏 31,965 个 libuv 句柄](https://github.com/github/copilot-cli/issues/4686)** — 报告称 Node v24 SEA 内嵌运行时存在异步句柄泄漏，会耗尽堆内存；SEA 构建会忽略 `NODE_OPTIONS`，导致用户无法通过调参规避。属于稳定性关键问题。

6. **[#4725 — 每隔几分钟就发生一次 JavaScript 堆 OOM](https://github.com/github/copilot-cli/issues/4725)** — 在 Linux 上独立复现的 OOM 问题，并附带了完整的 V8 Mark-Compact 调用栈。进一步说明 #4686 是系统性问题，而非单一环境偶发。

7. **[#4699 — 长时间 `--resume` 会话发生 OOM 崩溃，转储文件写入 cwd](https://github.com/github/copilot-cli/issues/4699)** — 恢复的会话每天会崩溃多次，且诊断信息直接倾倒到用户的工作目录中。5 👍；关于转储文件落点的次级抱怨也被广泛反馈。

8. **[#3260 — Windows Server 2025 上 SSH + tmux 场景下复制/粘贴失效](https://github.com/github/copilot-cli/issues/3260)** — 该问题在 v1.0.47 中回归，剪贴板集成在远程 Windows 终端这一许多开发者依赖的工作流下完全失效。

9. **[#3534 — WSL2 ARM64 下 `/copy` 失败：`clip.exe exited with code 1`](https://github.com/github/copilot-cli/issues/3534)** — 1.0.55 引入的 `cmd.exe` 包装器引号处理缺陷，导致 ARM64 上 WSL2 的每一次剪贴板写入都会失败。5 👍。

10. **[#4807 — 空闲 CLI 进入 `FileWatch` 事件风暴，35 小时生成 33+ GB 日志，CPU 占用 221%](https://github.com/github/copilot-cli/issues/4807)** — 全新（今日出现）但极其严重：失控的文件监视循环占用两个核心，并在 CLI 闲置时写出 33 GB 的调试日志。值得重点跟踪。

## 关键 PR 进展

1. **[#4808 — 将 GitHub Actions 固定到 commit SHA（开放）](https://github.com/github/copilot-cli/pull/4808)** — 由 `github-security-bot` 自动发起的 PR，将可变 `uses:` 标签（4 个文件中跨 3 处引用）改为不可变 commit SHA。无行为变更，仅作供应链加固。

2. **[#4786 — 修订关于第三方服务的声明（已关闭、已合并）](https://github.com/github/copilot-cli/pull/4786)** — 关于第三方集成访问要求与条款的文档/法务澄清。从开放到合并的周转速度很快。

> 注：过去 24 小时仅有 2 个 PR 更新，以上列表已涵盖全部。

## 功能请求趋势

过去 24 小时的信号，按需求与覆盖面排序：

- **模态/键盘人体工学** — Vim/vi 输入模式（#13，76 👍）与 `Ctrl+Backspace` 单词删除（#2199，7 👍）都已积攒多年关注。两者共同表明，社区对更丰富的提示编辑器体验存在持续需求，期望对标现代 REPL。
- **身份与账户管理** — 多账户切换（#367）持续被提起；桌面沙盒静默选错缓存的 PAT（#4804）则从凭据授权角度反映了同一主题。
- **插件与市场工具** — 可复用的更新流（#4799）以及市场浏览的 JSON 输出（#4806，已在 v1.0.84-4 中处理）表明，社区更倾向于脚本优先的工作流，而非交互式操作。
- **自定义 Agent 编写** — `target` frontmatter 字段在 CLI 上毫无作用（#4806），加上组织级 Agent 无法被发现（#1285），说明自定义 Agent 的编写界面仍显粗糙。
- **Hook 可扩展性** — 当多个 Hook 同时触发时，发出的 `additionalContext` 会被覆盖（#3589）；"后写覆盖" 的默认行为让构建分层上下文管道的用户感到挫败。

## 开发者痛点

过去 24 小时反复出现、影响较大的摩擦类别：

- **长时间会话的堆与句柄泄漏。** 三份独立报告（#4686、#4725、#4699）加上第四份压缩 OOM（#4780）描述的是同一种问题——V8 在数十分钟后触及约 4.3 GB 的上限——而 SEA 构建忽略 `NODE_OPTIONS`，用户连调高上限都做不到。这是当前仓库里最紧迫的稳定性问题。
- **Windows 与 WSL2 平台 Bug。** 剪贴板、插件更新与 SSH-via-tmux 工作流近期均出现回归（#3260、#3534、#4095）。共同抱怨在于 Windows 工具链（clip.exe、VS Code 监视句柄、cmd.exe 引号处理）没有被防御性地处理。
- **`settings.json` 的 model 字段行为不一致。** 两份报告（#4067、#4252）描述了 CLI 要么忽略、要么静默覆盖顶层的 `model` 键——这正是应用内 `/model` 选择器所写入的那个键。会话会悄悄回退到 `claude-sonnet-5`。
- **MCP 生态的毛刺。** Atlassian OAuth 回调不匹配（#4795）、`tools/list` 刷新到繁忙服务器导致工具永久丢失（#4731），以及一条不符合规范的 `initialize` 之前 JSON-RPC 调用致使合规服务器崩溃（#4809），三者叠加让 MCP 集成变得脆弱。
- **会话生命周期与锁。** 主机崩溃后陈旧的 `inuse.<pid>.lock` 文件导致会话无法复活（#4805）；若排队消息到达，会话还可能在回合结束时永久卡死（#4755）——都说明会话恢复语义很脆弱。
- **凭据透明度。** 本地沙盒会静默选择一个不相关的缓存 PAT（#4804），且没有任何可见的审计轨迹——对安全敏感的用户而言，这是一个信任与可调试性的问题。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-11

## 今日要点

2.0 beta 渠道今天迭代密集，针对文件系统循环提示失败、插件事件投递以及 TUI 分组树等关键问题集中落地了修复。存储类问题在社区反馈中占据主导——多位用户报告 `opencode.db` 因 `message.updated` 快照无界增长而膨胀至 13 GB 以上，同时支付流程的摩擦抱怨（尤其来自 CIS 地区用户）正聚拢为一个反复出现的主题。一个长期存在的子代理无限循环 Bug 以及 V2 中缺失的循环保护机制被暴露为严重的运行风险。

## 发布动态

过去 24 小时内没有发布版本。

## 热门议题

1. **[#33356] `event` 表无界增长 — `opencode.db` 达到 13 GB+** — [anomalyco/opencode#33356](https://github.com/anomalyco/opencode/issues/33356)
   两个长时间运行的实例将 22 GB 磁盘填满至 97–99%，原因是事件溯源快照永远不会被清理。30 条评论，9 👍。对所有重度用户有实质性影响，指向 V2 中缺失的留存/压缩策略。

2. **[#15585] 免费模型出现"超出免费用量"** — [#15585](https://github.com/anomalyco/opencode/issues/15585)
   三个免费模型全部触发同一个限额错误。55 条评论（窗口期内最高），17 👍。鉴于 OpenCode 将免费模型作为重点宣传，这一点是非常显著的用户体验信号。

3. **[#23153] [功能请求] 使用加密货币按量付费** — [#23153](https://github.com/anomalyco/opencode/issues/23153)
   窗口期内点赞数最高的功能请求（50 👍，21 条评论）。对替代支付渠道的强烈呼声，很可能受到下文支付失败问题群的放大影响。

4. **[#13003] [功能请求] 在 TUI 中展示 token 用量信息** — [#13003](https://github.com/anomalyco/opencode/issues/13003)
   请求直接在 TUI 中展示已追踪的输入/输出/预算 token。13 条评论，53 👍——窗口期内点赞比最高。与支付议题中体现的成本控制焦虑相呼应。

5. **[#45278] 工作正常的卡片在使用 3 个月后支付被拒** — [#45278](https://github.com/anomalyco/opencode/issues/45278)
   在卡或银行信息未变的情况下，续费静默失败。13 条评论。这是本周多个支付被拒工单之一，提示这是一个系统性的计费问题，而非孤立案例。

6. **[#36942] [功能请求] 垂直标签页** — [#36942](https://github.com/anomalyco/opencode/issues/36942)
   新 UI 强制使用水平标签页，导致大部分会话标题被隐藏。31 👍。直接关联下文已合并的 PR #41575。

7. **[#41358] 自动压缩后 Agent 持续思考/行动，丢失任务目标** — [#41358](https://github.com/anomalyco/opencode/issues/41358)
   在 Windows 桌面端，压缩后 Agent 不做确认就继续运行，并遗忘原始目标。属于一个具有严重正确性影响的回归。

8. **[#45442] 子代理对相同工具调用陷入无限循环（约 50 分钟，364 次 grep）** — [#45442](https://github.com/anomalyco/opencode/issues/45442)
   2.0 中没有循环保护，导致 token 消耗完全失控。凸显新 Agent 运行时的安全机制缺失。

9. **[#41175] event 表在每次流式更新中存储完整消息快照（社区工具已可用）** — [#41175](https://github.com/anomalyco/opencode/issues/41175)
   进一步强化存储危机主题；贡献者已经构建了社区清理工具，表明外部已具备修复的就绪度。

10. **[#44788] V2 插件 API：`event.subscribe` 不投递任何事件；context 钩子无法到达模型提示（beta 18050）** — [#44788](https://github.com/anomalyco/opencode/issues/44788)
    记录了一种静默失败模式，破坏了 V2 整个插件扩展模型。对插件作者影响重大。

**值得一提：** #48246（缓存断点仅限 Anthropic 系列）、#43400（无法完成 Go 订阅支付）、#48389（桌面端 NodeService 退出时 SIGABRT）。

## 关键 PR 进展

1. **[#48397] fix(core): 打破已编译提示中的文件系统循环** — [#48397](https://github.com/anomalyco/opencode/pull/48397)
   直接针对 #48398——原生 Bun 构建在首次提示时失败并报错 `undefined is not an object`。是 1.4.2 Bun 兼容性的关键修复。

2. **[#48394 + #48395 + #48399] feat(tui): 递归式会话分组树（堆叠 PR）** — [#48394](https://github.com/anomalyco/opencode/pull/48394) · [#48395](https://github.com/anomalyco/opencode/pull/48395) · [#48399](https://github.com/anomalyco/opencode/pull/48399)
   来自 `jlongster` 的三连 PR，引入通用分组树、纯分组引擎，以及通过该引擎的生产环境投影。是 V2 TUI 会话呈现的基础。

3. **[#48376] fix(ai): 规范化扁平 Responses 流错误** — [#48376](https://github.com/anomalyco/opencode/pull/48376)
   在 `open-responses.ts` 的 SSE 与 WebSocket 解码中统一 Meta / xAI / OpenAI 的错误形态。减少网关侧的集成漂移。

4. **[#48381] fix(codemode): 使用 Bun 关于缺失 atob/btoa 参数的措辞** — [#48381](https://github.com/anomalyco/opencode/pull/48381)
   改动虽小但显式可见——将错误措辞对齐到当前运行时，而非浏览器的 WebIDL。

5. **[#35935] feat(observability): 新增 v2 genai tracing** — [#35935](https://github.com/anomalyco/opencode/pull/35935)
   为 Agent 轮次、HTTP/WS 传输、工具、重试、压缩、子代理提供端到端 OTLP tracing。包含 Dash0 的设置文档。

6. **[#41610] fix(core): 兼容缺失的工作区名称** — [#41610](https://github.com/anomalyco/opencode/pull/41610)
   在重建之前检测遗留的 `workspace` 模式漂移；为 `no such column: name` 失败添加回归测试。

7. **[#41604] fix(core): 在 revert 后保留压缩状态** — [#41604](https://github.com/anomalyco/opencode/pull/41604)
   在允许手动压缩之前先暂存会话 revert；防止下一条提示在旧边界处被截断。一个微妙但影响重大的正确性修复。

8. **[#41601] fix(tui): 限定关注通知的范围** — [#41601](https://github.com/anomalyco/opencode/pull/41601)
   忽略会话外的提问/权限事件；仅对当前活动位置的持久请求进行通知。在多工作区场景下减少通知噪音。

9. **[#41575] feat(tui): 可配置标签页位置** — [#41575](https://github.com/anomalyco/opencode/pull/41575)
   V2 TUI 标签页现在可以放置在顶部、底部、左侧或右侧——直接回应功能请求 #36942。

10. **[#41594] fix(compaction): 压缩时遵循 agent variant 配置** — [#41594](https://github.com/anomalyco/opencode/pull/41594)
    此前 `agent.compaction.variant` 被硬编码为继承自父用户消息；现在被正确遵循。在上下文缩减时尊重用户意图。

**值得一提：** #41553（桌面端主动 RAM 管理）、#41568（Windows 非 git 会话路径锚定）、#41576（Electron 42.8.1 更新）、#41579（V2 composer 大粘贴卡顿修复）。

## 功能请求趋势

| 方向 | 信号 | 代表项 |
|---|---|---|
| **支付与计费灵活性** | 多起拒付 + 加密支付诉求 | #23153（加密支付），#45278 / #43400 / #48374（拒付） |
| **UI 中的成本可视化** | 高点赞比 | #13003（TUI 中展示 token 用量） |
| **TUI 人机工程** | 高互动度 | #36942（垂直标签页——*已发布*），#39628（远程权限审批） |
| **存储/生命周期管理** | 多用户反复出现 | #33356、#41175（数据库留存），#44511（变更 epoch 周围的文件系统快照） |
| **平台覆盖** | 紧迫度不高但持续存在 | #11902（VS 2026 企业版） |

## 开发者痛点

- **本地存储无界增长** — `opencode.db` 的膨胀是单一最大声的运行类抱怨，已有三个独立 issue 记录了 GB 级别的爆炸性增长且没有内置缓解手段。社区已有人编写清理工具，更突显了这一缺位。
- **支付摩擦** — 今日工单中有不成比例的份额属于订阅/支付失败（尤其是 CIS 地区卡片和静默续费）。叠加点赞最高的加密支付功能请求，计费显然是提升信任最高杠杆的改进点。
- **V2 插件 API 静默** — 在 beta 18050 中，`event.subscribe` 和 `ctx.session.hook("context")` 注册成功但从不投递。插件作者没有任何诊断界面；这在 V2 扩展生态能够壮大之前就形成了阻碍。
- **Agent 安全性** — 子代理缺少循环保护；一位用户报告在 50 分钟内出现了 364 次相同的工具调用。压缩流程同样缺少确认步骤，并导致目标漂移（#41358）。
- **跨提供商缓存语义** — 显式缓存断点被限制在 Anthropic 一家（#48246）；其他系列依赖隐式前缀缓存，这使成本调优复杂化，并打破了对等性预期。
- **构建/运行时脆弱性** — 原生 Bun 1.4.2 构建在首次提示时失败（#48398），桌面端 1.18.30 在退出时崩溃（#48389）。两者都指向桌面端分发路径上的成长阵痛。

*注：本摘要窗口未提供 GitHub Discussions 数据——已按格式规范省略 Discussions 部分。*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区摘要 — 2026-09-11

## 今日要点
- 一组 TUI 渲染 bug 集中出现在光标标记、全屏拖拽选择以及浮层覆盖图片的层级问题上,相关 PR 已并行合入(#9441、#9438、#9332)。
- Provider 正确性仍是分诊主线:Bedrock 使用量归一化(#8752)、Fable 5 回退移除(#9297)、Gemini `thoughtSignature` 重放(#9443)均取得进展。
- 社区推出了两个值得关注的伴生界面 —— **Phosphor**(基于 `pi --mode rpc` 的桌面 UI)与 **Pi Manager**(面向 providers/models/settings 的本地控制平面),显示出一流 GUI 体验的需求正在增长。

## 版本发布
_过去 24 小时内无新版本发布。_

## 热门 Issue

1. **#9323 — 改进 Fireworks 专属配置**(已关闭,14 条评论)。关于 Fireworks provider 配置项应如何呈现的长期讨论,在整合后关闭。[链接](https://github.com/earendil-works/pi/issues/9323)
2. **#8061 — 上下文预算在 78% 时忽略 maxTokens 输出预留**(打开,进行中,8 条评论,👍2)。在通过 OpenAI 兼容网关访问 Gemini 类 1M token 窗口时,请求被拒,compact-and-retry 也失败,属于长上下文场景下的真实失败模式。[链接](https://github.com/earendil-works/pi/issues/8061)
3. **#9052 — 全屏模式滚轮滚动速度比常规模式慢约 3 倍**(打开,8 条评论,👍4)。用户为使用固定输入框而迁移到全屏模式后遭遇性能回归,点赞数高表明痛点广泛。[链接](https://github.com/earendil-works/pi/issues/9052)
4. **#8133 — 按模型粒度的压缩设置**(已关闭,6 条评论,👍5)。新增按模型 id 索引并支持全局兜底的 `compaction.profiles` 映射 —— 一个被频繁请求的控制项。[链接](https://github.com/earendil-works/pi/issues/8133)
5. **#8810 — 扩展 providers 间歇性地忽略 defaultProvider/defaultModel**(打开,6 条评论)。涉及 `pi.registerProvider` 时的竞态:会话静默地使用另一个 provider 的默认配置启动。[链接](https://github.com/earendil-works/pi/issues/8810)
6. **#9294 — `claude-fable-5` 内置 `allowedFallbackModels` 列出 `claude-opus-4-8`(API 400)**(打开,进行中,5 条评论)。硬编码的回退元数据与上游模型不同步。[链接](https://github.com/earendil-works/pi/issues/9294)
7. **#9257 — `extractCursorPosition` 留下重复的 CURSOR_MARKER**(打开,5 条评论)。一个可能让 APC 转义序列泄漏到终端中的一行 bug。[链接](https://github.com/earendil-works/pi/issues/9257)
8. **#9268 — alt 为空的远程 Markdown 图片会在用户消息中隐藏 URL**(打开,5 条评论)。在列表中渲染时图片完全丢失。[链接](https://github.com/earendil-works/pi/issues/9268)
9. **#9361 — Windows `shellPath` 在加载扩展时会被不确定性地忽略**(打开,4 条评论)。回退到 Git Bash 或 WSL 的 System32 `bash.exe`,表现难以预测。[链接](https://github.com/earendil-works/pi/issues/9361)
10. **#8752 — `bedrock-converse`: `usage.input` 在不同模型族之间未归一化**(打开,4 条评论,👍5)。Anthropic 是扣除缓存后的净值,OpenAI 系则是毛额,会导致错误的缓存未命中提示以及双倍的输入成本。[链接](https://github.com/earendil-works/pi/issues/8752)

**其他值得关注的关闭项:**#8463(openai-codex 5.6 在 30 分钟 TTL 之前的缓存未命中)、#9394(从 openai-codex 中移除 gpt-5.4)、#2374(Kitty 图片在 tmux

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-11

## 今日要点

v0.23.3 版本随同 v0.3.0 桌面端与 SDK TypeScript v0.1.12 更新一并发布，扩展了 Kimi、Qwen 和 DeepSeek 的推理预设。一场 P1 级别的社区讨论浮出水面：VS Code 扩展在 v0.21.x 到 v0.23.x 之间静默丢失会话历史，这促使人们关注会话持久化中的元数据兼容性问题。发布流程本人在首次尝试时失败，后通过在 [#11588](https://github.com/QwenLM/qwen-code/pull/11588) 中放宽 review-replay 的时间余量才得以挽回。

## 发布

- **[v0.23.3](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3)** — 为 Kimi、Qwen 和 DeepSeek 模型新增扩展推理预设（[#11349](https://github.com/QwenLM/qwen-code/pull/11349)）。无破坏性变更。首次发布尝试因 `quality` 任务失败，最终通过 [#11588](https://github.com/QwenLM/qwen-code/pull/11588) 恢复。
- **[v0.23.3-nightly.20260910.c46cb85cf2](https://github.com/QwenLM/qwen-code/releases)** — 夜间构建版本；移除了已废弃的 DingTalk 后台响应聚合（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)）。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*