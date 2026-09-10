# AI CLI 工具社区动态日报 2026-09-10

> 生成时间: 2026-09-10 11:30 UTC | 覆盖工具: 7 个

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

# 跨工具对比报告：AI CLI 编码代理 — 2026-09-10

## 1. 生态概览

AI CLI 工具领域已明确从"对话封装"转向**代理化工作台**：在全部七个社区中，主流主题是长时间运行的代理控制、会话持久性、MCP 集成与权限治理，而非基础的代码生成。今天多款前沿模型几乎同步落地（Codex 中的 GPT-6 Astra、Gemini CLI 默认模型 `gemini-3.8-flash`、Pi 中的 DeepSeek V4.1 Flash），加剧了对多提供商目录新鲜度的压力。官方工具（Claude Code、Codex、Gemini CLI、Copilot CLI）正在向企业级治理功能趋同，而提供商无关客户端（OpenCode、Pi、Qwen Code）则在可配置性与模型广度上展开竞争。可靠性债务集中在可预见的位置：Windows、长会话与 MCP/OAuth 管道。

## 2. 活跃度对比

*数量反映的是今日摘要（热门/已更新）中浮现的项目，而非仓库总数。"N/A" 表示源信息流中该渠道未提供数据 —— 并非该渠道已禁用或不活跃的证据。*

| 工具 | 热门议题 | 活跃 PR | 讨论 | 发布状态（24 小时） |
|---|---|---|---|---|
| **Claude Code** | 10（2 已关闭） | 3（2 open，1 merged） | N/A — 信息流中无 | ✅ v2.1.267 |
| **OpenAI Codex** | 10 | 12 | 11（5 Ideas / 3 Q&A / 3 Show & Tell） | ✅ rust-v0.154.0 + alpha |
| **Gemini CLI** | 10 | 10 | N/A — 信息流中无 | 仅每夜构建微调（无显著变更） |
| **GitHub Copilot CLI** | 10（同日 +4 报告） | 1 | N/A — 信息流中无 | ❌ 无 |
| **OpenCode** | 10 | 10（+3 提及） | N/A — 信息流中无 | ❌ 无（v1.18.x 稳定；2.0 进行中） |
| **Pi** | 已分诊 50 个中的 10 | 触及 12（列出 10） | 2（Show & Tell） | ❌ 无 |
| **Qwen Code** | 10 | 10 | 7（5 Roadmap / 2 Q&A） | ✅ 5 次发布（desktop v0.3.0、CLI nightly、TS SDK、cua-driver） |

**解读：** Codex、Pi 与 Qwen Code 显示出最高的工程吞吐；Copilot CLI 明显处于低合并窗口，无发布且追踪器上回归问题密集；Claude Code 尽管 PR 数量较低，但发布了一个具有战略意义的版本。

## 3. 共同功能方向

1. **后台代理控制与可观测性** — *全部工具。* Claude Code 用户要求具备与 Codex 持平的提示/任务排队能力（#33323，44👍）；Codex 发布了代理总览的整理工作（#44433/#44424 归档/隐藏），其热度最高的创意是从移动端进行远程控制（190👍）；Qwen Code 正在构建持久化的网状协作线程（#11206）；OpenCode 新增了闲置/回合差异预测（#47821）；社区工具（agent-watch、isitdone、Usage HUD）填补了厂商尚未覆盖的空白。编排非交互式代理已成为基本要求。
2. **会话持久性、恢复与回退** — *Codex、Copilot CLI、Qwen、Pi、Gemini CLI、OpenCode。* Codex 存在一系列回滚序号 Bug，在恢复/分叉时冻结历史（#43142、#43124、#42027）；Copilot CLI 的压缩 OOM 问题会永久损坏会话（#4780、#4699）；Qwen 在扩展升级时丢失用户历史（#11489），并正在评估 SQLite 会话存储（#11433）；Pi 存在数据丢失窗口（#9413、#9426）。撤销/回退已成为跨工具的明确基准 —— Codex 用户援引 Claude Code 与 OpenCode 的对等能力（#9618，129👍）。
3. **MCP 可靠性与认证** — *Copilot CLI、OpenCode、Qwen、Gemini CLI、Codex。* Copilot CLI 中三处独立的 OAuth 回调 Bug（#4795/#4796/#4800）；OpenCode OAuth 浏览器失败（#26195）与连接超时死锁（#46813）；Qwen 的 Windows MCP 集群（#9693、#11460）；Gemini CLI 强制执行失败即关闭策略（#29200）；Codex 将 MCP 描述从 Guardian 预算中剥离（#44493）。MCP 已是普遍标配 —— 但在边缘场景普遍脆弱。
4. **权限与力度治理** — *Claude Code、Codex、Gemini CLI、Copilot CLI、Pi。* Claude Code 的跨提供商 `maxEffortLevel` 上限、Codex 的 Guardian + 白名单请求（#31929

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
*数据快照：2026-09-10 · 来源：github.com/anthropics/skills*

---

## 1. 热门 Skills 排名

以下 PR 代表了仓库中讨论度最高的 Skill 活动，排名依据为社区关注度、与热门 Issue 的交叉引用，以及参与广度。

### 1.1 #1298 — 修复 skill-creator `run_eval.py`（0% 召回率 bug）
**链接：** https://github.com/anthropics/skills/pull/1298 · 状态：**OPEN**
当前 Skills 生态中最受关注的痛点。评估脚本（`run_eval.py`），以及随之而来的 `run_loop.py` 和 `improve_description.py`，对每个 Skill 描述都报告 `recall=0%`——意味着描述优化循环实际上是在对噪声做优化。该 PR 将 10+ 个 Issue #556 的复现案例打包为一个综合性修复，将评估产物作为真正的 Skill 安装，并修复了 Windows 流读取、触发检测以及并行工作进程问题。与 [Issue #556](https://github.com/anthropics/skills/issues/556)（12 条评论）密切关联。

### 1.2 #514 — `document-typography` Skill（排版质量检查）
**链接：** https://github.com/anthropics/skills/pull/514 · 状态：**OPEN**
一个新 Skill，用于防止 AI 生成文档中常见的排版回归——孤词换行、孤行标题、编号错位等问题。它会影响 Claude 生成的每一份文档，将排版定位为默认预期而非可选项。具备很强的"普适适用性"卖点。

### 1.3 #1615 — `scnet-hpc` Skill（HPC 集群运维）
**链接：** https://github.com/anthropics/skills/pull/1615 · 状态：**OPEN**
面向 SCNet HPC 集群的基于配置文件的 SSH 与 Slurm 工作流。涵盖分区/内存/加速器选型、作业生成、集群发现以及计算节点刷新。代表了"小众但深入"的模式：每个专业运维领域对应一个 Skill。

### 1.4 #83 — `skill-quality-analyzer` 与 `skill-security-analyzer`（元 Skills）
**链接：** https://github.com/anthropics/skills/pull/83 · 状态：**OPEN**
两个面向 `example-skills` 集合的元 Skill：一个从五个维度（结构、示例、资源等）评估 Skill 质量，另一个审计安全态势。反映了社区对**审计其他 Skill 的 Skill**的推动——为市场建立一个自我监管层。

### 1.5 #1628 — `Hivemind`：零成本多智能体编排
**链接：** https://github.com/anthropics/skills/pull/1628 · 状态：**OPEN**
将机械性子任务委派给运行免费模型的无头 [opencode](https://opencode.ai) 工作进程，而 Claude Code 保留规划者/评审者/合并者角色。其核心论点是：*"昂贵模型的上下文才是稀缺资源，而非其智能本身。"* 这是一份面向成本敏感型智能体编排的 Skill 蓝图。

### 1.6 #486 — `odt` Skill（OpenDocument 创建与解析）
**链接：** https://github.com/anthropics/skills/pull/486 · 状态：**OPEN**
用于创建、填充、读取和转换 `.odt`/`.ods` 文件。补齐了开源文档格式版图中长期缺失的一环——DOCX 与 PDF 已有覆盖，ODF/ODT 是面向 ISO 标准开放工作流的关键缺口。

### 1.7 #1367 — `self-audit` Skill（机械式 + 四维推理质量检查，v1.3.0）
**链接：** https://github.com/anthropics/skills/pull/1367 · 状态：**OPEN**
一个通用的交付前审计流水线：第 0 步机械式核验所有声明的文件确实存在；后续步骤按"破坏严重度"的优先级顺序审计推理质量。技术栈无关、模型无关。与提出三道关卡推理质量流水线的 [Issue #1385](https://github.com/anthropics/skills/issues/1385) 配套。

### 1.8 #538 / #539 / #541 — PDF/DOCX/SKILL frontmatter 的正确性修复
- https://github.com/anthropics/skills/pull/538 — PDF：修复大小写敏感的文件引用问题
- https://github.com/anthropics/skills/pull/539 — skill-creator：YAML 未加引号的描述字段校验器
- https://github.com/anthropics/skills/pull/541 — DOCX：`w:id` 与书签冲突导致的数据损坏修复

全部 **OPEN**。该组修复由 Lubrsy706 提交，集中解决了核心 Skill 中的隐性故障——大小写敏感文件系统上的文件路径失效、静默的 YAML 解析失败，以及修订记录与既有书签相遇时的文档损坏问题。

---

## 2. 社区需求趋势

从讨论度最高的 Issue 中提炼，五大需求向量占据主导：

### 2.1 信任与安全边界（评论数最高的 Issue）
[Issue #492](https://github.com/anthropics/skills/issues/492) — **43 条评论**。以 `anthropic/` 命名空间分发的社区 Skill 可冒充官方 Skill，构成信任边界漏洞。社区呼吁在官方 Skill 与贡献者 Skill 之间建立明确的隔离，并提供验证机制。

### 2.2 分发与共享
[Issue #228](https://github.com/anthropics/skills/issues/228) — **16 条评论**。企业用户希望拥有组织级的 Skill 库以及直接分享链接，以取代当前的"下载 .skill → 丢到 Slack → 手动上传"工作流。对官方 Skill 市场/分发层有明确需求。

### 2.3 Skill-Creator 工具链质量
一组高评论数 Issue：[#556](https://github.com/anthropics/skills/issues/556)（12 条评论，0% 触发率）、[#202](https://github.com/anthropics/skills/issues/202)（8 条评论，"读起来像开发文档而非可运行的 Skill"）、[#1390](https://github.com/anthropics/skills/issues/1390)（4 条评论，评估得分 0/N）。用于**创建与评估 Skill**的元工具被广泛认为是坏掉的或达不到最佳实践水准的。

### 2.4 上下文窗口纪律与 Skill 膨胀
[Issue #1487](https://github.com/anthropics/skills/issues/1487) — `claude-api` Skill 会急切地注入约 156k token，一次调用即可耗尽上下文窗口。[Issue #189](https://github.com/anthropics/skills/issues/189) — `document-skills` 与 `example-skills` 安装了**完全相同的 Skill**，导致重复。随着目录规模增长，上下文经济性与去重已成为一等公民议题。

### 2.5 平台/互操作性缺口
[Issue #29](https://github.com/anthropics/skills/issues/29)（AWS Bedrock 支持）、[Issue #16](https://github.com/anthropics/skills/issues/16)（将 Skills 暴露为 MCP）、[Issue #1362](https://github.com/anthropics/skills/issues/1362)（pnpm ≥10.1 破坏 web-artifacts-builder）。希望 Skills 能在多种运行时（Bedrock、Cursor、Codex、MCP）上运行的需求正在急剧上升。

---

## 3. 高潜力待合并 Skills

这些 PR 评论活跃、尚未合并，且有望很快落地——它们定义了市场中**近期的边界**：

| PR | Skill | 为何具备高潜力 | 状态 |
|---|---|---|---|
| [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator eval 修复 | 解锁整条描述优化工作流；引用了 10+ 个复现案例 | OPEN |
| [#1615](https://github.com/anthropics/skills/pull/1615) | `scnet-hpc` | 瞄准 HPC 小众场景；基于配置文件的可复用设计模式 | OPEN |
| [#1628](https://github.com/anthropics/skills/pull/1628) | `Hivemind` | 成本敏感型多智能体编排；论点击中要害 | OPEN |
| [#1627](https://github.com/anthropics/skills/pull/1627) | `buffer-api` | 首个跨智能体的社交排期可移植 Agent Skill（Claude/Cursor/Codex/n8n） | OPEN |
| [#1367](https://github.com/anthropics/skills/pull/1367) | `self-audit` | 通用质量检查关卡；与 Issue #1385 提案配套 | OPEN |
| [#83](https://github.com/anthropics/skills/pull/83) | `skill-quality-analyzer` / `skill-security-analyzer` | 对市场本身进行审计的元 Skill | OPEN |
| [#1734](https://github.com/anthropics/skills/pull/1734) | DOCX 孤立评论检测 | 应对现实场景下的 docx 损坏边界情况 | OPEN |
| [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder：`mcp>=2` 兼容性 | 必要的升级；修复重命名后的 `streamable_http_client` 导入 | OPEN |

---

## 4. Skills 生态洞察

> **社区在 Skills 层面最集中的诉求是一套可信的、自我监管的基础设施层——先修复坏掉的 Skill 创建/评估工具链，建立清晰的官方与社区 Skill 信任边界，再上线能在整个市场中审计质量与安全的元 Skill——之后领域特定的 Skills 才有望被放心采纳。**

---

*本报告基于 2026-09-10 快照时 anthropics/skills 中的 50 个 PR 与 50 个 Issue 生成。快照当时 PR 的评论数不可获取，故排名依据交叉 Issue 关注度、复现广度与生态影响力综合得出。*

---

# Claude Code 社区摘要 — 2026-09-10

## 今日要点

v2.1.267 版本引入了 **`maxEffortLevel`**,一个跨 Bedrock、Vertex 和 Foundry 生效的统一上限配置 —— 这是企业部署实现 effort 治理一致性的重要一步。一个影响严重的 **Windows Cowork 回归**(KB5124008 后 Plan9 挂载失败)正在引发大量讨论;此外,长期呼声很高的 **Team 套餐重度用户诉求** —— Max 20x 档位 —— 也已成为本期议题中点赞数最高的未解决问题。

---

## 版本发布

### v2.1.267
- **`maxEffortLevel` 设置** —— 现可在顶层配置,也可在 `modelSettings` 下按模型单独配置。在所有服务商(Bedrock、Vertex、Foundry)上对 effort 级别设定上限,同时仍允许用户手动调低。适合需要硬性封顶的组织使用。
- **`--system-prompt-snapshot off`** —— 每次请求都重新渲染系统提示,便于调试,或在不希望触发提示缓存行为时使用。

🔗 [Release notes](https://github.com/anthropics/claude-code)

---

## 热门 Issue

1. **[#92984 — Cowork(Windows):KB5124008 之后所有 Plan9 共享失效](https://github.com/anthropics/claude-code/issues/92984)** · 56 条评论,25 👍
   Windows 更新导致 Cowork 中所有 Plan9 挂载失败;卸载该 KB 后恢复正常。不到 24 小时已有 56 条评论,是今日进展最快的帖子 —— 很可能催生紧急补丁。

2. **[#47509 — Team 套餐需要一个对标 Max 20x 的档位](https://github.com/anthropics/claude-code/issues/47509)** · 138 👍
   本批次的最高点赞 Issue。资深开发者和团队负责人表示,当前 Premium 6.25x 的上限对持续的 agentic 工作流来说太低;他们希望在 Team 侧获得与个人 Max 20x 对等的档位。

3. **[#69044 — 数月日常使用中记录到的反复出现的错误](https://github.com/anthropics/claude-code/issues/69044)** · 39 条评论
   一份结构化的长期反馈汇总,涵盖日常使用 Claude Code 时观察到的模式。与其说是 bug 报告,不如说是一份元聚合 —— 对排定可靠性工作的优先级很有参考价值。

4. **[#33323 — 任务队列,用于排队多个 prompt/任务](https://github.com/anthropics/claude-code/issues/33323)** · 44 👍
   用户希望在一轮对话尚未结束时就能提交后续 3–5 条指令。Codex CLI 已经支持该功能;Anthropic 面临的对齐压力与日俱增。

5. **[#20324 — VSCode 扩展会遗留被锁定的标签页分组](https://github.com/anthropics/claude-code/issues/20324)** · 19 条评论 · *已关闭*
   已解决:在 VSCode/Cursor 中打开 Claude 标签页时,不再把其它文件孤立锁定在面板里。该修复新增了一个与同级扩展对齐的显式 Auto-open API。

6. **[#77697 — macOS Keychain 写入凭证时未附带受信任应用列表](https://github.com/anthropics/claude-code/issues/77697)** · 9 👍
   由于 Keychain ACL 过于严格,OAuth 凭证每次读取都会再次提示用户授权。对日常用户造成实际摩擦;属于安全/UX 正确性问题。

7. **[#88864 — x86 上 Qemu/KVM 挂起,纯 x86 崩溃](https://github.com/anthropics/claude-code/issues/88864)** · 2 条评论
   在 arm64(正常)、x86+KVM+AVX2(正常)、x86+KVM(挂起)、x86(崩溃)上均可稳定复现。对沙箱/VM 用户是一份很有用的兼容性矩阵。

8. **[#87741 — JetBrains 终端中 X11 PRIMARY 选区粘贴两次](https://github.com/anthropics/claude-code/issues/87741)** · 2 条评论
   在 Linux/X11 下的 JetBrains 集成终端中,鼠标中键粘贴内容会被重复插入一次。属于小众但可复现的问题。

9. **[#92598 — Linux .deb 包的 Recommends 字段引用了不存在的 `kwalletd6`](https://github.com/anthropics/claude-code/issues/92598)** · *已关闭(无效)*
   一个打包层面的 bug,导致 KDE 系统被拉入 `gnome-keyring`。虽然已关闭,但仍值得提醒包维护者注意。

10. **[#80834 — 后台 Bash 的通知文案对可孤立化的子代理具有误导性](https://github.com/anthropics/claude-code/issues/80834)** · 3 条评论 · *已关闭*
    "完成后将通知您"这样的措辞可能导致子代理被静默孤立,而正常的 agent 子任务则能正确恢复父进程。属于文档/文案不一致问题。

---

## 重点 PR 进展

1. **[#93244 — mods:API 重命名、遥测修复,以及 diff 后端抽象层](https://github.com/anthropics/claude-code/pull/93244)** · OPEN
   顺着插件 API 命名清理(`isFocused`、`tool`)的势头继续推进,加固了遥测(避免第三方服务商数据泄露),并引入基于 git 的 diff mod 后端,为后续接入非 git 的 VCS 留下扩展点。

2. **[#89404 — `validate-agent.sh`:遇到首个警告时不再中止](https://github.com/anthropics/claude-code/pull/89404)** · OPEN
   三处 `set -euo pipefail` 的交互导致合法的插件开发 agent 被误报;改为累加计数,让脚本能够跑到真正的判定结果。

3. **[#93215 — 新增 mods:sec-default、diff 和 telemetry](https://github.com/anthropics/claude-code/pull/93215)** · *已关闭*
   已合入:三个内置 hook 模块插件 —— `sec-default`(组织级最外层插件)、`diff`(`/diff`)和 `telemetry`(`$.telemetry`)。奠定了 mod 生态的基础。

---

## 热门讨论

*本期源数据中未提供讨论内容。*

---

## 功能诉求趋势

- **任务/Prompt 队列** —— 本周期呼声最高的 UX 升级(#33323,44 👍)。在长时运行的 agentic 流程中,用户希望像 Codex CLI 已经支持的那样,提前排好后续指令。
- **更高阶的 Team 套餐使用档位** —— 在共享套餐上提供 Max 20x 级别的倍率(#47509,138 👍)已成为当前未解决问题中点赞数最高的诉求。
- **更清晰的权限模式自省能力** —— Session 需要一种编程方式读取自身当前的生效模式(相关:#85699),而不是依赖状态栏或对端消息上的标注。
- **可插拔 VCS 的 diff 后端** —— 最近的 mod 工作(#93244)暗示了未来非 git 后端可以注册 diff provider 的可能性。

---

## 开发者痛点

- **平台特异性回归仍最致命**:Windows 更新交互(#92984)、macOS Keychain UX(#77697)以及 JetBrains/X11 粘贴(#87741)在过去 24 小时内均有新动态。
- **Edit/Write 透明度存在缺口**:有多个报告描述了工具返回成功但磁盘实际状态不一致的情况(#85700,幽灵编辑;#74636,误报的"文件已修改"提醒)。对工具结果真实性的信任是反复出现的关切点。
- **成本/用量统计令人困惑**:5 小时会话计量在 Team 套餐的某些亚太地区用户上明显计数异常(#85682),进一步放大了 #47509 中提到的档位不匹配痛点。
- **代理通信中的自寻址与权限语义模糊**:`SendMessage` 自投递会静默成功(#85690),而 session 无法自省自身模式(#85699) —— 对多代理工作流而言都是微妙的正确性问题。
- **受限网络下的网络/更新器怪癖**:分割 DNS 的 VPN 上 c-ares 与系统解析器的冲突(#71699),以及 Datadog 遥测被阻断时的 DNS 重试放大(#85707)持续浮现 —— 与企业级推广部署相关。

---

## 研究文档（引用信息均来自互联网公开内容）

## 研究文档（引用信息均来自互联网公开内容）

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区摘要 — 2026-09-10

## 今日亮点
`rust-v0.154.0` 的头条发布将 **GPT-6 Astra** 引入 Codex 模型选择器和 Amazon Bedrock 目录，同时为隔离的会话检出带来**实验性 worktree 支持**（`--worktree` / `/worktree`）。在幕后，一波可靠性修复登陆了智能体总览（归档/删除/隐藏快捷键、Guardian 重试、MCP 描述作用域），但社区关注的焦点仍然落在持续存在的 **Windows 桌面端回归**（computer use、浏览器控制、应用启动失败）以及一个追踪配额消耗异常的**跨报告 Meta Issue** 上。

## 发布
- **rust-v0.154.0**（[#42879](https://github.com/openai/codex/issues/42879)、[#42619](https://github.com/openai/codex/issues/42619)、[#42652](https://github.com/openai/codex/issues/42652)、[#43069](https://github.com/openai/codex/issues/43069)、[#43120](https://github.com/openai/codex/issues/43120)）：将 **GPT-6 Astra** 加入模型选择器和 Bedrock 目录；引入可创建、浏览和恢复的实验性 **worktree 会话**。
- **rust-v0.154.0-alpha.6.1**：0.154 系列的预发布版本。

## 热门 Issue
1. **[#25271](https://github.com/openai/codex/issues/25271)** — *Computer Use 无法在 Windows 上确定 Chrome URL*（37 条评论，9 👍）。Windows 浏览器自动化的长期阻碍，甚至影响 `chrome://newtab/`。
2. **[#41220](https://github.com/openai/codex/issues/41220)** — *Meta：Codex 用量/配额消耗异常*（33 条评论，13 👍）。汇总各报告中关于配额无故消耗和用量核算不一致的投诉的跨报告追踪。
3. **[#42853](https://github.com/openai/codex/issues/42853)** — *GPT-6 Astra 在 Windows 上 Pro 账户模型选择器中缺失*（19 条评论，4 👍）。今日 Astra 发布的直接附带影响；Windows 上的 Pro 订阅者看不到新模型。
4. **[#43142](https://github.com/openai/codex/issues/43142)** — *恢复会话时复用 rollout 序号，导致桌面端历史冻结*（18 条评论）。**rollout 序号相关 bug** 的模式如今在 macOS 和 Windows 上同时出现。
5. **[#40902](https://github.com/openai/codex/issues/40902)** — *Java NIO Selector.open 在 Windows 26.820.60940 上失败*（15 条评论，3 👍）。最新 Windows 桌面构建上的回环连接回归。
6. **[#41622](https://github.com/openai/codex/issues/41622)** — *禁用自动对话摘要*（14 条评论，**60 👍**）。本周期获赞最多的增强请求：高级用户希望有一个 `config.toml` 开关来关闭摘要。
7. **[#43124](https://github.com/openai/codex/issues/43124)** — *macOS 桌面历史在较早轮次处冻结*（12 条评论）。与 #43142 同源的投影/序号 bug，出现在 Apple Silicon 上。
8. **[#42027](https://github.com/openai/codex/issues/42027)** — *对话轮次中断后侧聊天分叉失败*（11 条评论）。分叉线程破坏 Windows 上的历史投影。
9. **[#41520](https://github.com/openai/codex/issues/41520)** — *无法使用 gpt-reserve*（11 条评论，3 👍）。据报告 Plus 层级上的 reserve 模型访问已失效。
10. **[#14162](https://github.com/openai/codex/issues/14162)** — *macOS 上存在陈旧/孤立的会话条目*（8 条评论）。存在数月的老 issue 仍在收到新报告——是一个会话状态卫生问题。

## 关键 PR 进展
1. **[#44493](https://github.com/openai/codex/pull/44493)** — *将 MCP 描述与 Guardian action JSON 分别绑定*。将 `tool_description` / `connector_description` 移至可选元数据，从而不再占用 Guardian 审查输入预算。
2. **[#44492](https://github.com/openai/codex/pull/44492)** — *区分 HTTP 配额错误与速率限制*。将 `insufficient_quota`、`credit_balance` 和 usage-limit 错误码映射为 usage-limit 错误而非 retry-limit 错误。
3. **[#44489](https://github.com/openai/codex/pull/44489)** — *认证所有权变更时重置缓存的 WebSocket 状态*。防止 Responses WebSocket 在账户切换之间被复用。
4. **[#44487](https://github.com/openai/codex/pull/44487)** — *预轮次压缩失败时保留传入的提示*。避免压缩失败时丢失用户输入。
5. **[#44482](https://github.com/openai/codex/pull/44482)** — *改进 Guardian 重试与审查失败上报*。对瞬时速率限制/流耗尽错误进行重试；无结果时停止上报高风险。
6. **[#44472](https://github.com/openai/codex/pull/44472)** — *强化 Code Mode 工具调用完成状态跟踪*。修复跨单元格的工具调用完成状态中的复用/歧义 bug。
7. **[#44433](https://github.com/openai/codex/pull/44433)** — *智能体总览中的归档与删除操作*。新增 `Ctrl+E`（归档）和 `Delete` 快捷键；暴露 `agents.archive` / `agents.delete`。
8. **[#44424](https://github.com/openai/codex/pull/44424)** — *智能体总览中的隐藏快捷键*。`Ctrl+W` 隐藏任务而不停止它；跨刷新持久化；在按键映射配置中暴露 `agents.hide`。
9. **[#31644](https://github.com/openai/codex/pull/31644)** — *Linux 沙箱：通过托管代理路由 DNS*。新增 `enable_dns` 启用选项；原生 DNS 客户端不遵守代理变量，因此在 bubblewrap 命名空间内增加 DNS 适配器。
10. **[#44400](https://github.com/openai/codex/pull/44400)** — *Python SDK 在附着点开始轮次订阅*。事件现在从附着时刻起开始交付，包括响应前事件。
11. **[#44392](https://github.com/openai/codex/pull/44392)** — *OpenAI API 密钥的 opt-in 模型发现*。新增默认关闭的 `api_key_model_discovery` 特性，呈现 API 密钥的模型元数据。
12. **[#44349](https://github.com/openai/codex/pull/44349)** — *在会话启动钩子中区分分叉会话*。在 `SessionSource` 中增加 `fork` 和 `resume`，避免启动钩子在继承的上下文中重复运行。

## 热门讨论

### Ideas
- **[#9200](https://github.com/openai/codex/discussions/9200)** — *从 ChatGPT 应用远程控制 Codex*（46 条评论，**190 👍**）。讨论板上获赞最多的 idea；用户希望获得官方移动/远程控制，而非 Tailscale + SSH 的变通方案。
- **[#9618](https://github.com/openai/codex/discussions/9618)** — *`/rewind` 或 `/revert` 在哪里？*（23 条评论，**129 👍**）。对与 OpenCode 和 Claude Code 看齐的撤销/倒回功能有强烈需求。
- **[#12567](https://github.com/openai/codex/discussions/12567)** — *Codex 中的记忆*（36 条评论）。由维护者发起；探讨 Codex 在使用记忆时应多大程度上引用先前的会话。
- **[#44421](https://github.com/openai/codex/discussions/44421)** — *长时间任务期间与 Codex 吉祥物的持久轻量级聊天*。在主线程繁忙时的侧通道 UI。
- **[#44419](https://github.com/openai/codex/discussions/44419)** — *VS Code Codex 历史分页超过 50 个会话*。更早的本地会话存在，但无法从扩展中打开。

### Q&A
- **[#40385](https://github.com/openai/codex/discussions/40385)** — *Windows → 连接 → 控制其他设备 缺失*。远程连接 UI 上的用户回归。
- **[#43257](https://github.com/openai/codex/discussions/43257)** — *实验性上下文管理如何将历史查询计入用量？*。定价/用量的不透明已成为反复出现的主题。
- **[#42503](https://github.com/openai/codex/discussions/42503)** — *Astra 何时进入 Codex 有新消息吗？*——实际上已被今日 0.154.0 版本在模型选择器中的发布所解决。

### Show and Tell
- **[#42041](https://github.com/openai/codex/discussions/42041)** — *agent-watch*。为后台 `codex exec` 运行区分 DONE / FAILED / STALL。
- **[#44368](https://github.com/openai/codex/discussions/44368)** — *Usage HUD*。跨 Codex + Claude + Gemini + Grok + Ollama 的原生 macOS 菜单栏计量器，带置信度标签。
- **[#44153](https://github.com/openai/codex/discussions/44153)** — *isitdone*。一种 Stop 钩子，在测试/类型检查/lint 通过之前阻止完成。

## 功能请求趋势
社区持续要求：

1. **一等公民的撤销/会话回退** — [#9618](https://github.com/openai/codex/discussions/9618)（129 👍）及相关讨论仍然是最受期待的能力缺口。
2. **移动端/ChatGPT 应用远程控制** — [#9200](https://github.com/openai/codex/discussions/9200)（190 👍）在 Ideas 板块占据主导。
3. **跨会话记忆并显式引用** — [#12567](https://github.com/openai/codex/discussions/12567)。
4. **可配置的摘要与 Worktree 工作流** — 可选退出的摘要（[#41622](https://github.com/openai/codex/issues/41622)，60 👍）；隔离的 worktree 会话（现已作为实验功能上线）。
5. **智能体总览卫生** — 归档/删除/隐藏、Esc 上恢复焦点、右箭头打开（[#44433](https://github.com/openai/codex/pull/44433)、[#44424](https://github.com/openai/codex/pull/44424)、[#44360](https://github.com/openai/codex/pull/44360)、[#44344](https://github.com/openai/codex/pull/44344)）。
6. **VS Code 与桌面端功能对齐** — 超过 50 个本地会话的分页（[#44419](https://github.com/openai/codex/discussions/44419)）。
7. **针对长时间任务的持久轻量级聊天界面**（[#44421](https://github.com/openai/codex/discussions/44421)）。
8. **在 Full Access / danger-full-access 之上增加允许列表**（[#31929](https://github.com/openai/codex/issues/31929)）。
9. **带朗读功能的阅读模式**（[#38834](https://github.com/openai/codex/discussions/38834)）。
10. **面向 Pro/Pro 20x 订阅者的更好的配额/重置可见性**（[#44443](https://github.com/openai/codex/issues/44443)、[#41220](https://github.com/openai/codex/issues/41220)）。

## 开发者痛点
1. **Windows 桌面端回归主导 issue 追踪。** Computer Use URL 检测（#25271）、Browser/Computer Use `nodeRepl.fetch request failed`（#44135、#44500）、Java NIO 回环（#40902）、启动动画卡住（#41015）、第二条消息挂起（#43366）、可信 Node 退出后的 Computer Use（#43373）、破坏自动更新的 `cua_node` 运行时重定位（#42412），以及 Modern Standby Job Object 错误（#44503）。Windows 显然是被测试不足的路径。
2. **会话历史投影很脆弱。** 一组 issue（#43142、#43124、#42027、#42241、#14162）显示**rollout 序号**在恢复/分叉/中断的轮次后会失步，导致 macOS 和 Windows 上的桌面历史被冻结。今日的 PR 解决了周边问题，但序号管道本身似乎仍未触及。
3. **配额与用量核算不透明。** Meta issue #41220、每周重置漂移（#44443）以及上下文管理计费问题（#43257）都指向同一个根本抱怨：开发者无法将 Codex 用量与其 token 账单对账。
4. **模型可用性与访问的 bug。** GPT-6 Astra 在 Windows Pro 上缺失（#42853）、Plus 层级无法使用 `gpt-reserve`（#41520），以及现已关闭的 `gpt-5.5` 未找到错误（#44098），都表明**模型上线在层级和平台之间存在延迟**。
5. **CLI/TUI 细节打磨不足。** 在 TUI 中选择 Astra 时光标跳动（#44444）；高级用户希望关闭的自动摘要噪音（#41622）。
6. **跨模型/跨机器的编排很难。** #37960（协调本地 Claude 与远程 Codex）以及多个"自己动手的 watcher/HUD"工具（#44368、#42041、#44153）都表明可靠、可观测的后台智能体编排仍是 DIY 的活儿。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区简报 —— 2026-09-10

## 1. 今日要点
社区的关注焦点高度集中在**智能体可靠性与子智能体行为**上：终止状态上报错误、通用智能体挂起、shell 命令卡顿等高互动 bug 霸占了 issue 跟踪器。安全方面，一批新 PR 正在加固路径防护、MCP 策略执行、沙箱边界和提示注入防御；与此同时，一次值得关注的模型升级将 `gemini-3.8-flash` 落地为默认 flash 模型。

---

## 2. 版本发布
- **v0.61.0-nightly.20260910.ged2ac40df** —— 自动化 nightly 版本更新。与上一 nightly 的 diff 为空/未列出显著变更。
  → [对比](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260909.ged2ac40df...v0.61.0-nightly.20260910.ged2ac40df)

---

## 3. 热门 Issue

| # | Issue | 为什么重要 | 评论 / 👍 |
|---|---|---|---|
| [#22323](https://github.com/google-gemini/gemini-cli/issues/22323) | 子智能体在触及 `MAX_TURNS` 后仍上报 `status: "success"` / `GOAL` | 把真实的中断伪装成成功——对 CI 流水线和调试非常危险；属于执行正确性问题。 | 13 / 2 |
| [#21409](https://github.com/google-gemini/gemini-cli/issues/21409) | 通用智能体在执行简单的文件夹创建时无限挂起 | 社区痛点明显——8 个 👍 表明强烈共鸣；阻碍基本工作流。 | 8 / 8 |
| [#19873](https://github.com/google-gemini/gemini-cli/issues/19873) | 零依赖 OS 沙箱与执行后意图路由 | 战略性增强：在不牺牲安全性的前提下发挥 Gemini 3 原生的 bash 亲和力。 | 9 / 1 |
| [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) | EPIC:支持 AST 感知的文件读取、搜索与代码库映射 | 有望显著减少代码导航中的 token 膨胀与轮次消耗。 | 7 / 1 |
| [#21968](https://github.com/google-gemini/gemini-cli/issues/21968) | Gemini 不会自主使用技能/子智能体 | 影响自定义配置的可发现性——属于 UX/认知层面的缺口。 | 6 / 0 |
| [#25166](https://github.com/google-gemini/gemini-cli/issues/25166) | Shell 命令在执行完成后卡在 "Waiting input" | 可稳定复现、具有阻塞性；破坏交互式 shell 流程。 | 4 / 3 |
| [#26525](https://github.com/google-gemini/gemini-cli/issues/26525) | 确定性脱敏 + 减少 Auto Memory 日志记录 | 针对 Auto Memory 功能的安全/隐私改进。 | 5 / 0 |
| [#22232](https://github.com/google-gemini/gemini-cli/issues/22232) | browser_agent:自动会话接管与锁恢复 | 针对持久会话场景下 `BrowserManager` "fail-fast" UX 的韧性修复。 | 4 / 0 |
| [#22672](https://github.com/google-gemini/gemini-cli/issues/22672) | 智能体应停止/劝阻破坏性行为 | 安全性回归——`git reset --force` 及类似模式需要护栏机制。 | 3 / 1 |
| [#24246](https://github.com/google-gemini/gemini-cli/issues/24246) | 启用 >128 个(或按原帖 >400 个)工具时出现 400 错误 | 硬性上限问题；需要更智能的工具范围界定，而非粗暴的数量限制。 | 3 / 0 |

---

## 4. 关键 PR 进展

| # | PR | 具体做了什么 |
|---|---|---|
| [#29249](https://github.com/google-gemini/gemini-cli/pull/29249) | **fix(core):** 堵住 `get_internal_docs` 路径防护中的同级前缀绕过漏洞 | 路径遍历修复——朴素的前缀匹配会放行以文档目录名开头的同级目录。**安全关键。** |
| [#29200](https://github.com/google-gemini/gemini-cli/pull/29200) | **fix(core):** 在运行时一致地执行 MCP 策略 | 统一服务器名匹配规则(不区分大小写、去除首尾空格)；将空的 `mcp.allowed` 按 fail-closed 处理；区分“未配置”与“显式空白名单”。 |
| [#29250](https://github.com/google-gemini/gemini-cli/pull/29250) | **fix(core):** 防止通过构建文件修改与不可信标志实施间接提示注入 | 重构 `shell`、`edit`、`write_file`,在受限模式下校验工作区边界。**Security XL。** |
| [#29214](https://github.com/google-gemini/gemini-cli/pull/29214) | **fix(sandbox):** 加固文件系统边界并隔离运行时状态 | 经过净化的配置挂载 + 基于 realpath 的路径敏感性检查。 |
| [#29172](https://github.com/google-gemini/gemini-cli/pull/29172) | **feat(core):** 将 `gemini-3.8-flash` 添加为默认 flash 模型 | 注册 `gemini-3.5-flash-lite` → `3.8-flash` 别名；将 3.8-flash 提升为默认模型。 |
| [#29166](https://github.com/google-gemini/gemini-cli/pull/29166) | **fix(extensions):** 更新前备份扩展目录，使回滚能够将其恢复 | 原有回滚逻辑复制回去的是一个空临时目录——实际上形同虚设；此 PR 予以修复。 |
| [#29266](https://github.com/google-gemini/gemini-cli/pull/29266) | **fix(config):** 防止复杂度路由覆盖手动模型选择 | 阻止 GCA 将用户手动选定的具体模型静默替换为 2.5 Flash。*(已关闭)* |
| [#29093](https://github.com/google-gemini/gemini-cli/pull/29093) | **fix:** 为 `getIgnoredPaths` 引入内存缓存 + 子树剪枝 | 对拥有大量 gitignore 规则的大型仓库是重大的性能提升。*(已关闭)* |
| [#29094](https://github.com/google-gemini/gemini-cli/pull/29094) | **fix:** 将 `simple-git` 升级到 3.32.3(CVE-2026-28292,CRITICAL) | 依赖安全升级。*(已关闭)* |
| [#29095](https://github.com/google-gemini/gemini-cli/pull/29095) | **fix:** 将 `shell-quote` 升级到 1.8.4(CVE-2026-9277,CRITICAL) | 依赖安全升级。*(已关闭)* |

---

## 5. 热门讨论
*源数据中未提供 GitHub Discussions 数据——本节省略。*

---

## 6. 功能请求趋势
- **更智能、更精准的代码阅读** —— AST 感知读取、"Tactful Extraction"(#19561)、代码库映射(#22746),以对抗上下文膨胀与轮次浪费。
- **更强的沙箱 + 执行意图** —— OS 级零依赖沙箱(#19873)、执行后意图路由，以及严格的工作区边界校验(#29250、#29214)。
- **智能体自我感知与 UX 打磨** —— 智能体指引中提供准确的 CLI 标志/快捷键(#21432)、通过 `/chat share` 导出子智能体轨迹(#22598)、包含子智能体上下文的 bug 报告(#21763)。
- **浏览器智能体健壮性** —— 会话接管/锁恢复(#22232)、settings.json 覆盖(#22267)、Wayland 支持(#21983)。
- **记忆系统质量** —— 无效补丁隔离(#26523)、重试疲劳(#26522)、确定性的机密信息脱敏(#26525)。
- **本地子智能体编写** —— 符号链接支持(#20079)、智能体自发现(#21968)、sprint-1 本地子智能体专项工作(#20195)。

---

## 7. 开发者痛点
- **不可靠的智能体终止信号** —— 子智能体即使从未完成任务也上报成功(#22323);用户无法信任 `Termination Reason`。
- **挂起与卡顿** —— 通用智能体在琐碎操作上挂起(#21409,8 个 👍);shell 在执行完成后冻结(#25166);交互式 CLI 提示导致永久卡死(#22465)。
- **Token / 轮次低效** —— 模型把整个文件倾倒进上下文(#19561),并在工作区里乱丢一次性 tmp 脚本(#23571)。
- **工具数量上限** —— 注册工具过多时出现 400 错误；缺乏自动裁剪或范围界定(#24246)。
- **技能/子智能体可发现性** —— 自定义技能除非被显式调用，否则基本被无视(#21968)。
- **安全回归** —— 核心工具中的路径前缀遍历(#29249)、通过构建文件的间接提示注入(#29250)、沙箱文件系统泄漏(#29214)、破坏性 git 命令(#22672)。
- **会话/记忆卫生** —— `/compress` 在会话恢复后不会持久化(#21335);Auto Memory 对低信号会话无限重试(#26522);会话中途出现 401 认证失败(#29275)。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-10

## 1. 今日要点

今天 issue 跟踪器上最突出的信号是**一组针对长时会话的内存/稳定性回归**(issues #4686、#4725、#4699、#4780)——运行 30 分钟以上后 V8 堆耗尽、嵌入式 Node SEA 中 libuv 句柄泄漏,以及压缩操作的 OOM 会永久性地损坏会话。**MCP 认证是第二大热点**,有三条独立报告分别指向 Atlassian、Entra 和 CIMD 服务器的 OAuth/callback 不匹配问题(#4795、#4796、#4800),外加一项针对自托管服务器请求 TLS-insecure 旁路的需求(#4801)。浅色/深色主题的可发现性问题(#135、#3773、#4620)仍是本周互动量最高的"小痛点"。

## 2. 版本发布

过去 24 小时内无新版本发布。

## 3. 热门 Issues

1. **[#135] 浅色主题失效** — 12 条评论 / 👍12。本仓库互动量最高的 issue。影响 v0.0.330;在浅色终端上,用户提示与选区高亮的对比度过低。该问题长期存在但仍未解决 → [github/copilot-cli#135](https://github.com/github/copilot-cli/issues/135)
2. **[#4535] v1.0.81 预发布版中 `store_memory` 失败,提示 "Instance id is required"** — 8 条评论。预发布渠道中上下文记忆子系统的回归,会端到端阻断新的 memory 工具 → [#4535](https://github.com/github/copilot-cli/issues/4535)
3. **[#4686] Node.js 在约 37 分钟后 OOM 崩溃——31,965 个异步 libuv 句柄泄漏(SEA 忽略 `NODE_OPTIONS`)** — 3 条评论。在 Linux EC2 上使用嵌入式 Node v24.20.0 可稳定复现;SEA 分发版无法应用 `NODE_OPTIONS` 临时方案,因此用户没有退路 → [#4686](https://github.com/github/copilot-cli/issues/4686)
4. **[#4725] 频繁出现 JavaScript 堆内存不足** — 3 条评论 / 👍1。与 #4686 相同的 V8 OOM 模式,但出现在不同平台;在 4 GB 上限时每隔几分钟就会崩溃 → [#4725](https://github.com/github/copilot-cli/issues/4725)
5. **[#3773] [theming-accessibility] 浅色主题损坏** — 4 条评论 / 👍4。第二份浅色主题报告,截图显示提示背景黑底黑字;与 #135 互为补充 → [#3773](https://github.com/github/copilot-cli/issues/3773)
6. **[#3700] [HIGH] 1.0.60 WSL2 回归:MainThread 在空闲时持续占用约 215% CPU,TUI 输出卡死** — 3 条评论 / 👍2。被标记为 #2208 的回归;每次新会话均能复现 → [#3700](https://github.com/github/copilot-cli/issues/3700)
7. **[#4699] 长时 `--resume` 会话上 OOM 崩溃;崩溃转储写入当前工作目录** — 2 条评论 / 👍5。一个 issue 包含两个问题:一是 OOM 本身,二是崩溃报告会污染用户的工作目录 → [#4699](https://github.com/github/copilot-cli/issues/4699)
8. **[#4780] 会话压缩触发 OOM 且永远无法完成,导致会话永久无法恢复** — 1 条评论 / 👍3。压缩过程陷入崩溃循环,而 `--resume` 会再次触发压缩;本质上等同于数据丢失 → [#4780](https://github.com/github/copilot-cli/issues/4780)
9. **[#4764] 自动审批在大约 1 小时后失效** — 3 条评论。在 v1.0.83 上,`/permissions assisted` 会在会话中途静默降级,迫使用户重启会话 → [#4764](https://github.com/github/copilot-cli/issues/4764)
10. **[#4755] 当排队通道中的消息在回合结束时到达,会话会永久卡死** — 2 条评论。空闲收尾逻辑被抑制,队列永远不排空,只能通过 `kill -9` 恢复 → [#4755](https://github.com/github/copilot-cli/issues/4755)

**同日本期值得关注的 issue:** [#4796](https://github.com/github/copilot-cli/issues/4796)(desktop 1.1.17 上 `COPILOT_ENTRA_AUTH_AUD` 导致 MCP Entra 登录失败,而 CLI 正常)、[#4800](https://github.com/github/copilot-cli/issues/4800)(CLI 随机选择端口,导致 CIMD OAuth 的 redirect-URI 不匹配)、[#4801](https://github.com/github/copilot-cli/issues/4801)(rustls 没有针对 MCP HTTP 的 `--insecure` 通道)、[#4609](https://github.com/github/copilot-cli/issues/4609)(Docker 沙箱静默绕过 `/permissions` 审批)。

## 4. 关键 PR 进展

过去 24 小时内仅有 1 个 PR 更新,不足以凑成 Top 10,标记为低合并量的合并窗口。

1. **[#4786] 修改关于第三方服务的声明** — *open*。文档/法务声明更新,旨在澄清第三方集成的访问要求和条款。目前尚无评审活动 → [#4786](https://github.com/github/copilot-cli/pull/4786)

## 5. 热门讨论

*本期摘要窗口未提供讨论数据——本节省略。*

## 6. 功能请求趋势

在互动量最高的 30 个 issue 中,呼声最高的方向包括:

- **长会话稳定性** — 明确诉求包括:优雅的堆内存管理、不会崩溃的会话压缩(#4780)、OOM 之后可恢复的会话(#1467、#4699),以及能区分新会话和近期会话的 `--resume` 交互(#1467)。
- **MCP 成熟度** — 为自托管 HTTP MCP 服务器提供 TLS-insecure 旁路(#4801)、可预测的 OAuth 回调端口(#4800、#4795),以及正确的 MCP 工具发现(避免对已加载命名空间报告 "Found 0 tools")(#4773)。
- **主题控制** — 提供独立于操作系统偏好的深色/浅色强制开关(#4620),以及修复损坏的浅色调色板(#135、#3773)。
- **权限交互** — 为 `/permissions assisted` 提供可预期的生命周期(#4764)、仅在确实存在策略时才应用 fail-closed 姿态(#4757),以及正确的命令归一化(使 `git -C <dir> --no-pager <sub>` 被识别为安全命令)(#4797)。
- **智能体入门** — 为自定义 Copilot CLI 智能体提供欢迎/激活卡片(#4798),以及修复多 hook `additionalContext` 注入,确保每次 sessionStart/subagentStart 都生效(#3589)。
- **更新可靠性** — 在安装失败时复用已下载的更新包(#4799)。
- **多账号工作流** — 在多个 GitHub 身份之间便捷切换(#367,已关闭但反复出现的主题)。

## 7. 开发者痛点

1. **会话不可恢复。** 四个相互重叠的 OOM bug(#4686、#4725、#4699、#4780)都在正常长时间工作中触发,除了 `kill -9` 之外没有任何恢复路径;最糟的情况下,压缩过程的 OOM 会损坏会话,导致 `--resume` 无法修复。崩溃转储写入 `$PWD`(#4699)进一步加重了项目整洁度方面的痛苦。
2. **浅色主题的可访问性。** 使用浅色终端的开发者得到的提示几乎无法阅读(#135、#3773);没有独立于操作系统偏好的强制调色板开关(#4620)。
3. **权限与审批不一致。** assisted 模式会在约 1 小时后静默失效(#4764);即便账号没有托管策略,`--yolo` 仍会被 fail-closed 姿态拦截(#4757);Docker 沙箱完全跳过审批(#4609);命令合法性检查器无法解析标准的 `git` 全局选项(#4797)。单看每一项都算小事,但叠加在一起,让"这次会话究竟会让智能体做什么?"变得难以预测。
4. **MCP 集成摩擦。** 针对不同 IdP 的三个独立 OAuth 回调/端口 bug(#4795、#4796、#4800)、误导性的 "Found 0 tools" 发现行为(#4773),以及缺失的 TLS-insecure 应急通道(#4801),都在把用户从自托管 MCP 推开。
5. **配置被改动。** 启动时的 `model` 值会在会话退出时静默覆盖对 `settings.json` 的手动编辑(#4252);`git` 上的 `--no-pager`/`-C` 被合法性检查器错误解析(#4797)——两者都是小事,但都体现出"CLI 改了我没让它改的东西"的问题。
6. **自我更新循环。** 安装失败时只能完整重新下载,而无法复用已缓存的安装包(#4799),在按流量计费的连接上尤其浪费带宽。

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-10

## 1. 今日要点

今日的活动主要围绕 **provider 集成与运行时可靠性问题**，而非版本发布。一些长期存在的 bug（Bun 安装故障、MCP OAuth、Bedrock 图像处理）收到了新的评论，而 PR 流水线则聚焦于 **让会话行为与 provider 默认配置变得可配置**（重试策略、webfetch 大小、MCP 连接超时、自动接受权限），以及对 xAI Responses WebSocket 传输层的一次显著重写。过去 24 小时内没有新的标签化发布。

---

## 2. 版本发布

过去 24 小时内没有新版本发布。最新可用版本仍为 **v1.18.x**（根据引用 1.18.29 / 1.18.30 的 issue 来看），下一个大版本 **OpenCode 2.0** 分支则在 `[2.0]` 标签下进行积极的 TUI/provider 工作。

---

## 3. 热门 Issue

1. **[#27906 — v1.15.1+ 破坏 Bun 安装](https://github.com/anomalyco/opencode/issues/27906)** — 25 条评论，16 👍
   今日点赞数最高的 issue。v1.15.1 启用了 postinstall 生命周期脚本，而 Bun 在全局安装时默认会阻止这些脚本。这影响到了大量 Bun 用户群体，issue 仍未关闭。

2. **[#26195 — `opencode mcp auth` 无法为 OAuth（Google Drive MCP）打开浏览器](https://github.com/anomalyco/opencode/issues/26195)** — 9 条评论，11 👍
   OAuth 流程打印出 "Authentication successful!" 但实际上从未完成 —— 没有浏览器窗口，也没有 token 持久化。信号噪声比很高。

3. **[#45011 — Web UI：CLI/TUI 创建的会话不会出现在 Home 中](https://github.com/anomalyco/opencode/issues/45011)** — 7 条评论
   从 `opencode run`、TUI 或 agent 创建的会话不会出现在 Web 客户端中，因为项目注册表仅存在于客户端侧。这阻碍了跨客户端工作流。

4. **[#42739 — 当存在 Cloudflare 环境变量但缺少 `CLOUDFLARE_API_TOKEN` 时 `Provider.list` 崩溃](https://github.com/anomalyco/opencode/issues/42739)** — 6 条评论
   一个通用的 "Unexpected server error" 作为未处理异常抛出，对用户隐藏了真正的配置错误。

5. **[#43596 — 可配置的重试策略](https://github.com/anomalyco/opencode/issues/43596)** — 5 条评论，7 👍
   在 #41939 之后 `RETRY_MAX_RETRIES = 5` 被硬编码。受配额限制的 provider 会过早中止回合；用户希望通过配置暴露 `maxRetries / initialDelay / backoffFactor / maxDelay`。

6. **[#47965 — OpenCode Go 上 DeepSeek V4 Flash Vision 限制为 4 张图片](https://github.com/anomalyco/opencode/issues/47965)** — 4 条评论
   Provider 端的限制（而非模型限制）泄漏到用户会话中，导致多图片请求失败并返回 HTTP 400。

7. **[#48069 — Bedrock `gpt-6-astra` 在 `read` 工具返回图像后失败](https://github.com/anomalyco/opencode/issues/48069)** — 3 条评论
   在下一回合重放用户消息中的图像时，Bedrock ConverseStream 返回 400；该模型实际上拒绝了 `image` 字段。

8. **[#47494 — Desktop 1.18.29：无法重命名本地 "global" 项目](https://github.com/anomalyco/opencode/issues/47494)** — 3 条评论
   在 Electron 构建中，对纯本地文件夹的重命名和图标颜色更改会静默地不生效。

9. **[#47022 — OpenCode 数据库在大约两周内增长到约 72 GB](https://github.com/anomalyco/opencode/issues/47022)** — 2 条评论
   Desktop 上严重的本地存储回归；宏观层面的膨胀在没有文档化的保留策略的情况下占用磁盘空间。

10. **[#42891 — `[2.0]` opencode2 upgrade 命令缺失/损坏](https://github.com/anomalyco/opencode/issues/42891)** — 2 条评论，2 👍
    `opencode2 upgrade` 抛出 `ENOENT`；`--version` 报告为 `v0.0.0-next-17400`。2.0 系列尚无一等公民的自更新路径。

---

## 4. 关键 PR 进展

1. **[#48117 — fix(provider)：解析模型 ID 中的 OpenRouter 路由修饰符后缀](https://github.com/anomalyco/opencode/pull/48117)**
   关闭 #48016。正确解析 OpenRouter slug 上的 `:floor`、`:nitro`、`:exacto`、`:online` 后缀 —— 一个容易被忽略的路由陷阱。

2. **[#48324 — fix(provider,skill)：在自定义网关上省略 textVerbosity + 技能提示词预算](https://github.com/anomalyco/opencode/pull/48324)**
   移除了自定义 OpenAI 兼容网关（Experiential Labs、Cloudflare AI Gateway）上对 `gpt-5.*` 无条件设置 `textVerbosity="low"` 的行为，并强制实施技能提示词预算。

3. **[#48300 — feat(tui)：添加最小化和隐藏的工具调用模式](https://github.com/anomalyco/opencode/pull/48300)**
   新增 **Settings → Session → Tool calls**，支持 `show | minimal | hidden` 三种模式。默认行为保持不变。

4. **[#47821 — feat(session)：添加回合差异路由 + `idle` 投影](https://github.com/anomalyco/opencode/pull/47821)**
   添加带 `outcome: succeeded|failed|interrupted` 的 `Session.Message.Idle` 事件和回合差异 API。以干净的历史取代了 #47795。

5. **[#48318 — fix(ai)：让 xAI Responses websocket 工作并重新启用它们](https://github.com/anomalyco/opencode/pull/48318)**
   通过修复增量 `previous_response_id` 处理，重新启用 xAI Responses 的 WebSocket 传输（在 #48231 中被禁用）。

6. **[#46812 — feat：使 webfetch 最大响应大小可配置](https://github.com/anomalyco/opencode/pull/46812)**
   在 ConfigV1 中添加 `webfetch.max_response_size`（字节）；移除了硬编码的 5MB 上限。关闭 #15459。

7. **[#46813 — fix：限制 MCP 连接，使 `mcp list` 不会挂起](https://github.com/anomalyco/opencode/pull/46813)**
   为 MCP `create()` 和 `mcp.status()` 添加超时，使卡住的服务器无法使 CLI 死锁。关闭 #43484。

8. **[#47104 — fix：在新会话上遵守设置中的自动接受](https://github.com/anomalyco/opencode/pull/47104)**
   Desktop Settings 中的按目录自动接受现在实际上会应用到新创建的会话，而不仅仅是提示栏的开关。

9. **[#47983 — feat(desktop)：重新设计设置导航和项目编辑](https://github.com/anomalyco/opencode/pull/47983)**
    将 Settings 重组为 **client preferences / servers / projects**，并提供明确的返回导航；解决了多个重命名/图标 bug（例如 #47494）。

10. **[#47867 — fix(core)：对日志时间戳使用本地时间](https://github.com/anomalyco/opencode/pull/47867)**
    将文件和 stderr 日志切换到 Effect 的本地时间 `DateTime` 格式化器（保留毫秒精度）。关闭 #21330 —— 一个长期存在的小痛点。

*值得一提：* [#48225 (ACP reasoning/session-option restoration)](https://github.com/anomalyco/opencode/pull/48225)、[#45103 (deep-link to existing Desktop sessions)](https://github.com/anomalyco/opencode/pull/45103)、[#48208 (Anthropic provider auth docs)](https://github.com/anomalyco/opencode/pull/48208)。

---

## 5. 热门讨论

本数据集中未提供讨论数据。略去本节。

---

## 6. 功能请求趋势

纵观开放的 issue 和已合并的 PR，最强的功能方向是：

- **可配置的运行时限制** —— 重试策略 ([#43596](https://github.com/anomalyco/opencode/issues/43596)、[#48298](https://github.com/anomalyco/opencode/issues/48298))、webfetch 大小 ([#46812](https://github.com/anomalyco/opencode/pull/46812))、MCP 连接超时 ([#46813](https://github.com/anomalyco/opencode/pull/46813))。模式：停止在 provider/session 层硬编码魔法数字。
- **TUI 可用性** —— 工具调用可见性模式 ([#48300](https://github.com/anomalyco/opencode/pull/48300))、MessageNav 中的按消息染色 + 悬停预览 ([#48292](https://github.com/anomalyco/opencode/issues/48292))、大型转录的 `/copy` 可靠性 ([#48320](https://github.com/anomalyco/opencode/issues/48320))。
- **Desktop UX 大改版** —— 设置重新设计 ([#47983](https://github.com/anomalyco/opencode/pull/47983))、deep-link 会话 ([#45103](https://github.com/anomalyco/opencode/pull/45103))、正确自动应用设置 ([#47104](https://github.com/anomalyco/opencode/pull/47104))。
- **Provider 兼容性与诊断** —— 当自定义网关拒绝默认值时显式报错 ([#48324](https://github.com/anomalyco/opencode/pull/48324))、OpenRouter 路由后缀解析 ([#48117](https://github.com/anomalyco/opencode/pull/48117))、为缺失凭据提供更好的崩溃界面 ([#42739](https://github.com/anomalyco/opencode/issues/42739))。
- **模型注册表可扩展性** —— UI 中的用户定义/自定义 Ollama 模型 ([#48279](https://github.com/anomalyco/opencode/issues/48279)、[#48282](https://github.com/anomalyco/opencode/issues/48282))。
- **OpenCode 2.0 基础** —— 回合差异路由 ([#47821](https://github.com/anomalyco/opencode/pull/47821))、upgrade 命令 ([#42891](https://github.com/anomalyco/opencode/issues/42891))、无头 `--agent` 遵守声明的模型 ([#42561](https://github.com/anomalyco/opencode/issues/42561))。

---

## 7. 开发者痛点

- **Bun 上的安装/打包摩擦** —— [#27906](https://github.com/anomalyco/opencode/issues/27906)：postinstall 脚本被默认阻止，破坏了相当一部分用户的全局安装路径。
- **静默失败与通用错误** —— [#42739](https://github.com/anomalyco/opencode/issues/42739)、[#48261](https://github.com/anomalyco/opencode/issues/48261)、[#48294](https://github.com/anomalyco/opencode/issues/48294)：用户看到 `Unexpected server error` 或 `CommandNotFoundException`，却没有可操作的诊断信息。
- **跨客户端会话可见性** —— [#45011](https://github.com/anomalyco/opencode/issues/45011)、[#39667](https://github.com/anomalyco/opencode/issues/39667)：Web UI 和 CLI/TUI 仅松散地共享项目状态，导致会话丢失和标签页标记错误。
- **本地资源膨胀** —— [#47022](https://github.com/anomalyco/opencode/issues/47022)：两周内 SQLite 增长约 72 GB，且没有文档化的保留策略；反映出基于数据库的 Desktop 在缺乏清理机制方面的普遍痛点。
- **Provider 特定的回归** —— Bedrock GPT-6 图像重放 ([#48069](https://github.com/anomalyco/opencode/issues/48069))、GitHub Copilot 思维显示 ([#46593](https://github.com/anomalyco/opencode/issues/46593))、DeepSeek vision 4 图片上限 ([#47965](https://github.com/anomalyco/opencode/issues/47965))。每个模型系列都有自己的怪癖；OpenCode 经常将它们呈现为不透明的 4xx 错误。
- **Windows + 非 NPM 工具链** —— [#48307](https://github.com/anomalyco/opencode/issues/48307)、[#42724](https://github.com/anomalyco/opencode/issues/42724)：PowerShell PATH 处理和 Bun 插件堆栈跟踪仍是反复出现的摩擦点。
- **2.0 的升级/自更新故事** —— [#42891](https://github.com/anomalyco/opencode/issues/42891)、[#48310](https://github.com/anomalyco/opencode/issues/48310)：没有一等公民的升级路径，二进制文件处理仍然会泄漏垃圾内容到上下文中。
- **定价/套餐清晰度** —— [#48266](https://github.com/anomalyco/opencode/issues/48266)：Go 套餐限制（$60/月）与 Omen Alpha（$100/月）的文档不一致，削弱了对计费的信任。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区简报 — 2026-09-10

## 今日要点

今天是项目分拣任务繁重的一天：50 个 issue 得到更新、12 个 PR 被处理，贡献者势头强劲。维护者团队关闭了一波通过 contribution gate 提交且无后续动作的 issue,同时交付了切实的改进：新增 DeepSeek V4.1 Flash 模型、每次工具调用默认 3 分钟超时、更宽松的技能名支持，以及文档导航校验。若干仍然 open 的 issue 指向真实的稳定性隐忧——包括中断流式输出时 TUI 冻结(#9410)、推理模型在上下文上限处会话永久卡死(#9409)——这些问题很可能会左右下一个版本的走向。

## 版本发布

过去 24 小时内没有新版本发布。

## 热门 Issue

1. **[#9052] 全屏模式滚轮滚动比普通模式慢 3 倍** — 8 条评论、4 个 👍。这是用户正逐步迁移使用的全屏 TUI 中一个真实的可用性回退。固定输入框广受喜爱，但滚动体验让全屏模式变得不实用。([链接](https://github.com/earendil-works/pi/issues/9052))
2. **[#9331] Bedrock:OpenAI reasoning effort 从未发送给模型** — 4 条评论。高影响的正确性 bug:对通过 Bedrock 路由的 OpenAI 模型，调整 thinking level 毫无效果，既破坏基准测试也违背用户预期。([链接](https://github.com/earendil-works/pi/issues/9331))
3. **[#9410] 按 Escape 中断流式输出导致约 60 秒 TUI 冻结** — 2 条评论。v0.85.1 在大上下文 Gemini 会话上严重的交互性回退：编辑器失去响应，而 spinner 一直停留在 `Working` 状态。([链接](https://github.com/earendil-works/pi/issues/9410))
4. **[#9409] 推理模型上会话在上下文上限处永久卡死** — 2 条评论。自动压缩静默失败，报 `Truncated response recovery failed after one compact-and-retry attempt`,用户陷入没有恢复路径的死循环。([链接](https://github.com/earendil-works/pi/issues/9409))
5. **[#9394] 从 openai-codex 目录中移除 gpt-5.4** — 3 条评论。目录漂移：gpt-5.4/gpt-5.4-mini 已无法通过 ChatGPT 账户使用，现有用户会直接撞上报错。([链接](https://github.com/earendil-works/pi/issues/9394))
6. **[#9381] 软件包报告:pi-safe-compact(恶意或不安全行为)** — 5 条评论。安全供应链警报：报告所列的 GitHub 用户已无法联系。值得持续关注上游的任何处置动作。([链接](https://github.com/earendil-works/pi/issues/9381))
7. **[#9396] 在 tmux 中 pi 立即退出并提示 `sessions should be nested with care`** — 2 条评论。在为 contribution gate 提交 issue 时发现；反映出 tmux 用户会真切遇到的一个易用性意外。([链接](https://github.com/earendil-works/pi/issues/9396))
8. **[#9395] openai-completions 丢失工具结果中的 isError 字段** — 2 条评论。权限门控扩展在 OpenAI 兼容端点(包括本地 llama-server)上无法区分被拦截/失败的工具调用与正常输出。([链接](https://github.com/earendil-works/pi/issues/9395))
9. **[#9426] 更高版本的会话文件被静默接受** — 1 条评论。前向兼容隐患：当文件版本高于当前版本时，`migrateToCurrentVersion` 静默返回；既无警告也无迁移。([链接](https://github.com/earendil-works/pi/issues/9426))
10. **[#9413] 新会话直到首次助手回复才持久化** — 1 条评论。数据丢失窗口：在首次回复前被中断或杀掉的会话会彻底消失；是个干净的低风险修复候选。([链接](https://github.com/earendil-works/pi/issues/9413))

## 重点 PR 进展

1. **[#9431] feat(agent): 为每次工具调用设置默认 3 分钟超时** — 已关闭。填补了一个真实缺口：此前只有 `bash`/`powershell` 有可选超时，其他工具可能让 agent 永久挂起。PR 还附带了促成这次改动的一段具体的 bash 挂起 trace。([链接](https://github.com/earendil-works/pi/pull/9431))
2. **[#9425] feat(ai): 新增 DeepSeek V4.1 Flash** — 已关闭。将最新的 DeepSeek Flash 模型加入原生目录，同时提供 `deepseek-flash` 和 `deepseek-v4.1-flash` 两个 id,并带有正确的 thinking-level 映射。([链接](https://github.com/earendil-works/pi/pull/9425))
3. **[#9416] fix(coding-agent): 技能名允许点号和下划线** — 已关闭。扩展了 Agent Skills 的可用字符集，使来自 Claude Code 风格 harness 的共享技能目录能干净地导入。([链接](https://github.com/earendil-works/pi/pull/9416))
4. **[#8799] feat(tui): 更美观的 Working... spinner** — 已关闭。spinner 现在绘制在输入编辑器边框上，颜色与当前 thinking level 匹配，并新增了专属的重试状态。([链接](https://github.com/earendil-works/pi/pull/8799))
5. **[#9430] fix(coding-agent): 移除子代理示例中不可达的 tool_result_end 监听器** — 已关闭。一次低调的死代码清理，而且判断正确:pi 从不发出该事件。([链接](https://github.com/earendil-works/pi/pull/9430))
6. **[#9380] docs: 校验文档导航与可达性** — 已关闭。将 `docs.json` 确立为权威导航清单，并在测试套件中加以校验，能捕获失效的本地链接与不可达页面。([链接](https://github.com/earendil-works/pi/pull/9380))
7. **[#9382] 浏览历史时始终将光标置于末尾** — 已关闭。使向上箭头的历史导航与 bash/标准终端行为保持一致。([链接](https://github.com/earendil-works/pi/pull/9382))
8. **[#8744] feat(tui): 新增可选的 overlay 选区排除** — 仍开放。允许 overlay 退出全屏文本选择，使复制/粘贴仍然从对话记录的 `ScrollView` 获取内容，而非合成后的屏幕画面。([链接](https://github.com/earendil-works/pi/pull/8744))
9. **[#8612] fix(coding-agent): 清理已送达的纯图片队列条目** — 仍开放。关闭 #8581:纯图片引导消息现在会丢弃已送达条目，并保持待处理计数同步。([链接](https://github.com/earendil-works/pi/pull/8612))
10. **[#8743] fix(coding-agent): 忽略过期的工具图片转换** — 仍开放。将 Kitty 图片转换缓存与其源图片绑定，避免迟到的部分转换覆盖较新的转换结果。([链接](https://github.com/earendil-works/pi/pull/8743))

## 热门讨论

**成果展示**

- **[#8803] pi-verdict — 面向 pi 的极简权限门** — 一个零依赖、基于文件的 allow/ask/deny 扩展，实现了 README 明确留作开放路径的“构建你自己的确认流程”方案。它将自己定位为 Pi 版的 Claude Code auto-mode 门控。([链接](https://github.com/earendil-works/pi/discussions/8803))
- **[#9427] Pi Manager — 管理提供商、模型与 `~/.pi/agent` 的本地 UI** — 一个非 fork 式的本地控制平面，用于管理 OpenAI 兼容中继(包括 Antigravity 桥接)、原生提供商登录、目录/轮换列表/思考映射，以及 `~/.pi/agent` 的写入与备份。([链接](https://github.com/earendil-works/pi/discussions/9427))

## 功能请求趋势

- **TUI 打磨与稳定性**：全屏滚动速度(#9052)、普通模式下的视口跳动(#9424)、退出全屏后光标被隐藏(#9419)、在自绘光标的宿主上出现双重光标(#9429)、纯图片消息计数逐渐失步(#8612)。
- **推理模型可靠性**：Bedrock 上 OpenAI reasoning effort 不生效(#9331)、上下文上限处永久卡死(#9409)、大会话中中断时的 60 秒冻结(#9410)。
- **扩展 API 扩充**：RPC 模型/思考命令上的 persist 标志(#9393)、`MainOptions` 中的 `extensionPaths`(#9406)、有界的 abort/force-idle 原语(#9386)、来自 `session_start` 的 `systemPromptAppend`(#9432)、默认工具超时(#9431)。
- **配置灵活性**：以上下文窗口为基准的压缩预算(#9415)、models.json 中 `baseUrl` 的取值解析(#9422)、启动列表中对技能捆绑的分组(#9420)。
- **前向兼容与会话生命周期**：静默接受未来版本的会话文件(#9426)、首次助手回复前不持久化(#9413)、新版会话 schema 的平滑迁移。

## 开发者痛点

- **全屏与普通 TUI 模式之间滚动/光标行为不一致**是最持续的 UX 抱怨——受影响的是那些依赖全屏模式来保持输入框可见的用户。
- **推理模型在大规模场景下很脆弱**：大上下文暴露出流式中断冻结、上下文上限永久卡死、thinking level 未经 Bedrock 传递等问题——这一簇问题值得集中优先处理。
- **OpenAI 兼容提供商在细微之处沦为二等公民**：错误体未规范化、工具结果上 `isError` 被丢弃、OpenRouter 上非 batch 的 Anthropic 模型 `baseUrl` 默认值错误、HTML 520 页面被原样输出到对话记录——这些都在过去 24 小时内被报告。
- **扩展作者需要更好的原语**：有界 abort、显式持久化标志、感知宿主的光标处理，以及稳定的基础系统提示追加点都在同一天被提出，表明当前扩展接口正承受实实在在的压力。
- **目录漂移是反复出现的成本**：gpt-5.4 的移除(#9394)与 DeepSeek V4.1 Flash 的缺失(#9428/#9425)说明目录需要自动化的新鲜度检查，尤其是对硬编码模型定义的提供商。
- **会话生命周期中的数据丢失窗口**(#9413、#9426)是唾手可得的低风险修复，多位贡献者已明确表示准备通过 contribution gate 落地。

---

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-10

## 今日聚焦

Qwen Code 本次带来一波较重的版本更新：**desktop-v0.3.0**（同步发布预览版 v0.3.0-preview.0）、**CLI nightly v0.23.2**、**TypeScript SDK v0.1.11** 与 **cua-driver-rs v0.20.5**。最显眼的痛点依然集中在 Windows：在 VS Code 配套扩展中出现 P1 级 ConPTY 进程泄漏（347 个僵尸进程 / 2.8 GB），Windows 上的 MCP 连接关闭错误，以及多个后台智能体同时完成时导致的 TUI 崩溃（React #185）。新功能方面，**Browser SDK**（基于 Playwright）与**持久化的 mesh 协作会话**都有新的 PR 落地，而 VS Code "自动将打开的文件加入上下文"的回归也得到了即时修复。

## 版本发布

- **[desktop-v0.3.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.3.0)** — 桌面端稳定版。CI 现已按计划运行桌面打包流程（#11519），桥接层在重启后会保留挂起的权限/问题状态。
- **[desktop-v0.3.0-preview.0](https://github.com/QwenLM/qwen-code/releases/tag/desktop-v0.3.0-preview.0)** — 预览构建；`desktop-latest` 更新通道仍指向 0.2.2，因此现有安装不会自动迁移。macOS arm64 构建产物命名为 `Qwen-Code-Desktop-arm64.d…`。
- **[v0.23.2-nightly.20260909.2e212144d3](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.2-nightly.20260909.2e212144d3)** — 包含 Goal 运行时修复（#11365），超额占用声明预算的检查点会重试而不是让主循环卡死。
- **[sdk-typescript-v0.1.11](https://github.com/QwenLM/qwen-code/releases/tag/sdk-typescript-v0.1.11)** — 内置 CLI 0.23.2（基于 SDK 分支源码构建）。
- **[cua-driver-rs-v0.20.5](https://github.com/QwenLM/qwen-code/releases/tag/cua-driver-rs-v0.20.5)** — macOS 通用二进制（已签名/已公证） + `QwenCuaDriver.app`；Linux x86_64 + arm64（glibc 2.31+）；Windows 提供 UIAccess worker 与原生 SDK 包（x86_64 + arm64），均位于 `packages/cua-driver`。

## 高热度问题

1. **[#11303 — P1] Windows 上的 ConPTY 进程泄漏（VS Code 配套扩展）** ([链接](https://github.com/QwenLM/qwen-code/issues/11303)) — 14 条评论。单个 qwen-cli 实例在运行约 12 小时后会累积约 347 个无头 `conhost.exe` 进程与约 2.8 GB 内存。当前影响力最高的未解决 bug，影响所有长期运行的 Windows + VS Code 用户。
2. **[#11500 — P1] TUI 在 React 错误 #185 下静默退出** ([链接](https://github.com/QwenLM/qwen-code/issues/11500)) — 多个后台智能体同时完成时 TUI 直接挂掉（Ink `useBoxMetrics` 的 setState 死循环）。最糟糕的一类失败：没有错误提示，直接掉回 shell 提示符；恢复会话时会提示"previous session appears…"。
3. **[#11489 — P1，已关闭] VS Code 扩展 v0.21.x → v0.23.x 丢失对话历史** ([链接](https://github.com/QwenLM/qwen-code/issues/11489)) — 数据仍保存在 `state.vscdb` 中，但新版扩展无法读取。这是一次付费功能面（历史持久化）上的迁移回归。
4. **[#11556 — P1] VS Code 配套扩展 0.23.1 在 Remote-SSH 下失效** ([链接](https://github.com/QwenLM/qwen-code/issues/11556)) — 在 linux-arm64 服务器主机上 Webview 卡在加载中。由于 Remote-SSH 是众多开发者的主流工作流，这一问题尤为关键。
5. **[#11558 — P2] VS Code 中任意打开的文件都会被自动加入上下文** ([链接](https://github.com/QwenLM/qwen-code/issues/11558)) — 在 0.23.1 上报告：在上下文面板中点击移除文件后，下一次打开新文件时该操作会被撤销。#11568 已带来快速修复。
6. **[#9693 — P2] Windows 启动时 MCP -32000 连接关闭** ([链接](https://github.com/QwenLM/qwen-code/issues/9693)) — 即便未启用 MCP，STDIO MCP 服务器（filesystem、sequential-thinking）在 Windows 上也无法启动。多个服务器上均可复现。
7. **[#8596 — P2, 需讨论] 弃用 Electron 桌面端，将 `desktop-shell` 重命名为 `desktop`** ([链接](https://github.com/QwenLM/qwen-code/issues/8596)) — 6 条评论。指向性信号表明 **Tauri 才是桌面端的未来**；引发了关于 Electron 迁移时间表与打包方式的讨论。
8. **[#8092 — feature-request] 围绕 Web Shell 打造更低维护成本的桌面端** ([链接](https://github.com/QwenLM/qwen-code/issues/8092)) — 6 条评论。与 #8596 互为姊妹话题：复用 Web Shell 合并桌面端入口面，免去维护一套并行的 Electron UI。
9. **[#11550 — P2] 内存写入时提示词被重复处理** ([链接](https://github.com/QwenLM/qwen-code/issues/11550)) — 性能回归：一次内存写入会强制重新处理提示词。每次内存变更都会带来额外的延迟与吞吐成本。
10. **[#11460 — P2] Qwen Desktop 1.0.3 MCP Filesystem 在首次交互后挂起** ([链接](https://github.com/QwenLM/qwen-code/issues/11460)) — 加入了 Windows 上 MCP 相关 bug 簇（#9693、#10056、#9675、#7771），显然是 Windows 集成体验的头号痛点。

## 关键 PR 进展

1. **[#11568 fix(vscode): preserve active file exclusion](https://github.com/QwenLM/qwen-code/pull/11568)** — 直接响应 #11558。当用户排除当前文件后，切换编辑器不会再静默地重新启用自动包含。
2. **[#11464 feat(web-shell): render URLs in user messages as clickable links](https://github.com/QwenLM/qwen-code/pull/11464)** — 已关闭/合并。用户消息中的 URL 现在会渲染为可点击链接（与助手消息行为一致）；在打包后的桌面端中通过系统浏览器打开。
3. **[#11241 feat(browser-use): add Playwright-based Browser SDK](https://github.com/QwenLM/qwen-code/pull/11241)** — 新增一套类型化的 Browser SDK，驻留在持久化的 Node REPL 中，提供语义化的 Playwright 选择器、DOM 快照引用以及可视坐标。与 #11526 的 MCP-server 打包提案配套。
4. **[#11206 feat(mesh): add persistent shared-thread agent collaboration](https://github.com/QwenLM/qwen-code/pull/11206)** — 工作区作用域的 Agent 身份可在共享会话上协作：分配任务、运行中途插话、查看归属明确的执行结果、取消、解决阻塞。队列中最具野心的 UX 变更。
5. **[#11086 feat(serve): scope extensions to workspace runtimes](https://github.com/QwenLM/qwen-code/pull/11086)** — 将全局扩展目录与每个工作区的运行时进行对齐；提供按工作区限定范围的守护进程与 SDK 访问；同时更新编辑器的 `@` 菜单与扩展管理。
6. **[#11342 feat(web-shell): add model role and context window configuration](https://github.com/QwenLM/qwen-code/pull/11342)** — 在 Web Shell 设置中提供 Advisor/图像/语音模型的端点感知选择器；自定义配置现已覆盖对话、图像生成与转写等用途。
7. **[#11360 feat(goal): start approved Web Shell proposals after their owning turn](https://github.com/QwenLM/qwen-code/pull/11360)** — Allow/Reject 面板在提议该目标的回合干净结束后，会真正执行已批准的 Goal。承接 #11284 的后续切片。
8. **[#10906 feat(web-shell): show shell and monitor task output](https://github.com/QwenLM/qwen-code/pull/10906)** — 捕获的 shell/monitor 标准输出与标准错误，与现有 shell 捕获一并持久化；守护进程暴露一个限定 live-session-owner 的端点，提供脱敏后的尾部输出。补齐了一个真实的可观测性缺口。
9. **[#11480 feat(web-shell): add source footnote citation cards](https://github.com/QwenLM/qwen-code/pull/11480)** — 将 `source-*` GFM 脚注渲染为紧凑的引用控件；把相邻的来源合并为一个知识图标，通过悬停/聚焦卡片进行分页展示。
10. **[#11169 fix(web-shell): close trust-gate and bystander gaps in local-files bridge](https://github.com/QwenLM/qwen-code/pull/11169)** — 拾起因 #10962 过早 squash-合并而滞留在特性分支上的四条修复；收紧工作区路由判定与 bystander 处理。

## 热门讨论

*按类别分组。这些是明确以 `need-discussion` / 路线图层级提出的议题，而非孤立的 bug 修复。*

### 创意 / 路线图
- **[#10118] 将 "Live" 拆分为独立的语音应用 — 为所有会话提供统一的语音入口** ([链接](https://github.com/QwenLM/qwen-code/issues/10118))) — Live 不再依赖后端会话注入，转为统一的快捷键唤起的语音前端，可列出/创建/操控任意用户会话。设计已收敛，进入排期。
- **[#11433] 评估在规模化场景下为 Session/Prompt 索引引入嵌入式 SQLite** ([链接](https://github.com/QwenLM/qwen-code/issues/11433))) — RFC 风格讨论：Qwen Code 是否应内置嵌入式 SQLite 层，以支撑长对话、多会话、精确提示词查询、记录回放以及重连/挂载。
- **[#8596] 弃用 Electron 桌面端，将 `desktop-shell` 重命名为 `desktop`** ([链接](https://github.com/QwenLM/qwen-code/issues/8596))) — 见热门问题 #7；关于冻结/迁移策略仍存在开放的设计问题。
- **[#11564] `web_search`：为被引来源设计页面标题（自 #11490 拆出）** ([链接](https://github.com/QwenLM/qwen-code/issues/11564))) — 按工具描述要求，从仅展示 URL 的引用方式过渡为 `[title](url)` 形式；经历两轮评审后将设计拆分出来。
- **[#10641] 自动清理 `.qwen` 目录的机制** ([链接](https://github.com/QwenLM/qwen-code/issues/10641))) — 用户反馈 `.qwen` 持续膨胀；提案基于年龄或大小进行裁剪。

### Q&A
- **[#9831] 与 `craft-agents-oss` 的关系是什么？** ([链接](https://github.com/QwenLM/qwen-code/issues/9831))) — 社区询问 Qwen Code 与 `craft-agents-oss` 是否互为分叉，二者外观高度相似且会话互通。
- **[#11489] 升级后 VS Code 扩展历史丢失** ([链接](https://github.com/QwenLM/qwen-code/issues/11489))) — 虽然已关闭，但该讨论区是跟进 `.vscdb` 状态迁移计划的权威位置。

## 功能请求趋势

综合 Issues 与 PR，热度最高的需求方向如下：

1. **将桌面端合并到 Web Shell / Tauri。** #8596、#8092 以及 `desktop-v0.3.0-preview.0` 中默认合并的方向，都指向淘汰 Electron 应用并行的 UI 入口，转而复用 Web Shell。
2. **Windows 上的 MCP，端到端。** 一组相关 bug（#9693、#10056、#11460、#9675、#7771），加上 #11526 提出将 Node REPL 作为版本化 MCP 服务器打包的诉求，可见 Windows MCP 的可靠性是当前最迫切的需求。
3. **会话/历史可移植性。** #11433（为会话引入 SQLite）、#11489（历史迁移）、#10118（跨会话语音控制）、#11206（共享会话协作）—— 都反映出社区希望 Qwen Code 妥善处理多会话、长生命周期工作流。
4. **将浏览器自动化提升为一等公民工具。** #11241（Playwright Browser SDK）、#11526（打包）以及最初的 #7859 系列 PR —— "Browser Use 应随 Qwen Code 一起发布" 的趋势已经清晰。
5. **语音 / 实时能力作为全局交互层。** #10118（Live 拆分）、#11342（Web Shell 中语音模型配置）—— 语音正从一个独立功能演变为跨场景的输入模态。
6. **具备引用能力的 Web 调研。** #11564（引用中加入页面标题）、#11480（Web Shell 中的脚注引用卡片）—— 持续改善 `web_search` 结果的呈现方式。
7. **后台自动化 UX。** #11360（Goal 在所属回合结束后自动启动）、#11547（后台 shell 报错后 Web Shell 旋转图标不清除）—— 针对长任务智能体的体验打磨。

## 开发者痛点

过去 24 小时内反复出现的抱怨：

- **Windows 专属的不稳定性。** ConPTY 泄漏（#11303）、MCP `-32000` 启动失败（#9693）、filesystem MCP 挂起（#11460）、SSE MCP 权限丢失（#10056）、Remote-SSH Webview 卡死（#11556）。P1/P2 bug 中有相当比例仅出现在 Windows —— 桌面端在 Windows 上仍然是最粗糙的边缘。
- **会话/升级的数据迁移。** v0.21.x → v0.23.x 丢失了对话历史（#11489），即便 SQLite 存储仍在；切换 Responses 模型甚至可能让已保存的会话失效（#9452）。用户希望会话格式向前兼容。
- **并发场景下的 TUI 健壮性。** React #185（#11500）、后台 shell 报错后旋转图标不清除（#11547）、会话重新打开后挂起的 `ask_user_question` 卡片丢失（#11448）—— 当回合与后台任务交错时，交互式 UI 表现脆弱。
- **VS Code 中上下文静默变更。** #11558（当前文件总是被重新加入上下文）是一个 "模型是不是刚刚看到了我的文件？" 的信任问题；#11568 的修复值得欢迎，但也反映出对显式上下文控制的更广泛需求。
- **跨 Provider 的推理信息泄漏。** #9453（`Part.thoughtSignature` 缺少来源标记，导致模型切换时可能把一家 Provider 的元数据拼接到另一家的调用中）—— 对会话中途切换模型的人来说，这是一个正确性层面的隐患。
- **构建/CI 可靠性。** macOS E2E 分片崩溃（#11134）、与 PTY 清理抢跑的测试（#11001）、配置目录不可写导致启动崩溃（#10455）、autofix 中回归成本的核算（#10188）—— 大多数标注为 `autofix/needs-human`，说明自动化循环已足够成熟可以标记问题，但真正的修复仍需人工介入。
- **隐式存储膨胀。** `.qwen` 目录持续累积（#10641）；缺少内置保留策略意味着用户只能手动清理。

---

*基于 `QwenLM/qwen-code` 在 2026-09-10 的 GitHub 数据生成。条目按社区信号（评论数、优先级、话题相关度）排序。*

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*