# AI CLI 工具社区动态日报 2026-09-15

> 生成时间: 2026-09-14 17:02 UTC | 覆盖工具: 7 个

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

## 1. 生态系统概览

AI CLI 工具格局已收敛为七个活跃竞争的产品，横跨巨头阵营（Anthropic、OpenAI、Google、GitHub/Alibaba）与独立阵营（OpenCode/anomalyco、earendil-works）。竞争重心已从核心代码生成能力转向**智能体编排可靠性、会话完整性、成本透明度与企业可管理性**——如今的 issue 队列里，主角不再是“模型不行”，而是“harness 坏了”。第二个清晰的模式是：随着工具走向成熟，社区越来越追求*可验证性*（可审计的支出、可重放的转录记录、可检视的子智能体），而非单纯的原始能力。与此同时，跨平台差距——尤其是 Windows——以及多提供商路由（BYOK、OpenAI 兼容网关）仍是整个生态的系统性软肋。

## 2. 活跃度对比

*计数反映各 24 小时摘要中出现的内容（经筛选，非仓库原始总量）；信息流中无数据的渠道标记为 N/A。*

| 工具 | 热门 issue | PR | 讨论 | 发布（24h） |
|---|---|---|---|---|
| **Claude Code** | 10（最高：#69044，50 💬） | 约 4 个，全部关闭；除文档/测试基础设施外无其他开放 PR | 未报告 | 无 |
| **OpenAI Codex** | 10（最高：#44720，36 💬） | 10 个，全部关闭（沙箱/MCP/代理工程） | 约 9 个（含 #9200：190 👍） | rust-v0.155.0-alpha.4 |
| **Gemini CLI** | 10（已完成 P1/P2 分诊） | 10 | N/A——信息流中无数据 | v0.61.0-nightly（nightly 发布节奏） |
| **Copilot CLI** | 11（含已关闭的 #1029） | 0——明确 24 小时内无任何更新 | 未报告 | v1.0.84-6 |
| **OpenCode** | 10（最高：#48811，24 👍） | 12 | N/A——信息流中无数据 | 无 |
| **Pi** | 12（摘要显示 24 小时内触及 50 个 issue / 30 个 PR） | 12 | 1 | 无 |
| **Qwen Code** | 10 | 10 | N/A——信息流中无数据 | v0.23.4 stable + v0.23.3-nightly + CUA driver 预编译产物 |

**解读：** Codex 的绝对参与度和 PR 吞吐量最高；Pi 相对项目体量的迭代速度最快（触及 50 个 issue/30 个 PR）；Qwen Code 的发布工程最有章法（stable + nightly + vendored 二进制）；Copilot CLI 是唯一 PR 零动静的工具，尽管照常发布了版本。

## 3. 共性功能方向

1. **子智能体/智能体可靠性与可观测性**——*Gemini CLI、Claude Code、Codex、Qwen Code、OpenCode*。Gemini 的 #22323（子智能体在 MAX_TURNS 耗尽后仍报告“成功”）和 #21409（通用智能体挂起）；Claude Code 的 #77798（轮次中间消息被隐藏）和 #93996（孤儿子进程）；Codex 的 #43468（`read_thread` 对可见轮次返回空）和 #44088（shell 写入没有编辑卡片）；Qwen 的 #11500 崩溃问题集群；OpenCode 的 #49008 自回复循环。一致诉求：*终止原因必须显式且可检视。*
2. **成本/速率限制透明度**——*Claude Code、Codex、Pi、Qwen Code、OpenCode*。Claude Code 由四个 issue 组成的计费集群（#94339/37/42/30）；Codex 的 5 小时窗口耗尽（#43341、#45411）与 Pro 20X 暂停引发的反弹（#45211）；Pi 的缓存 TTL 计费缺陷（#9457、#9210）；Qwen 的 batch API 与每会话搜索上限（#11874、#11846）；OpenCode 悬而未决的计费讨论帖（#45278，17 💬）。
3. **Shell 权限解析安全**——*Claude Code、Qwen Code*。Claude #94314（`;`/`&&` 在 allow 规则匹配前未被拆分）vs. Qwen #11851（`\s` 分隔符夹带异步操作符）和 #11882（两个拆分器对 `#` 注释处理不一致）。同一类 bug，却被各自独立发现——强烈预示需要一套共享且经过测试的命令解析标准。
4. **会话持久化与恢复完整性**——*全部七个工具*。Claude #94336（静默数据丢失）；Copilot #4505（过期连接 ID 让恢复的会话直接变砖）；Pi #9306/#9391/#9590（孤儿工具调用、过期签名 thinking、损坏的 base64）；OpenCode #42735/#45839（重放被拒）；Codex #43468。本组摘要中覆盖面最广的单一痛点。
5. **远程/无头/守护进程运行**——*Codex、Qwen Code、OpenCode、Claude Code*。Codex 的 #9200（190 👍，从 ChatGPT 远程控制——明确对标 Claude Code）加上 #20312（事件驱动唤醒）；Qwen 的守护进程协议问题集群（#11866–69）和远程 web shell（#11548）；OpenCode 的后台服务器（#41696）。
6. **企业策略管线**——*Copilot CLI、Codex、Claude Code*。Copilot 的 #4556/#4837/#3572（插件装完却始终禁用、marketplace 从未注册、组织智能体不可见）；Codex 的 IdP 感知 MCP 目录（#45459）；Claude 的 Cowork git 代理过度拦截（#76248）与 JWT 出站缺口（#34690）。
7. **BYOK/多提供商路由**——*Copilot CLI、Qwen Code、OpenCode、Pi*。Copilot 同一天的三起提供商回退（#4840 Deepseek、#4836 Grok 工具限制、#4835 Gemini schema）；Qwen #11590（自动注入的 `metadata` 经 DashScope 搞挂所有第三方模型）；Pi 的多账户 OAuth 诉求（#1391、#7814）。

## 4. 差异化分析

- **Claude Code**——*治理*层面耕耘最深：CLAUDE.md 契约遵循（#90542）、沙箱规则语义、Cowork 白名单。UX 打磨仍在推进（#94184 diff 面板），但发布质量正在侵蚀信任（2.1.247/269/270 三个版本连续 TUI 回退）。闭源内核意味着 PR 面仅限文档/插件/测试。
- **OpenAI Codex**——重注押在**Rust 内核 + 桌面应用 + ChatGPT 集成**技术栈上；当天的 PR 全是纯平台工程（Windows 沙箱模块化 #45455/#45312、托管代理隔离 #45463、MCP 内存/性能 #45439/#45440）。社区压力聚焦在消费端的连续体验（移动端远程控制），而非企业策略。
- **Gemini CLI**——最具*研究前瞻性*：借助原生 bash 亲和性实现零依赖 OS 沙箱（#19873），以及感知 AST 的工具链以削减 token 噪声（#22745）。分诊纪律独树一帜（P1/P2 标签、维护者主导的 Auto Memory 加固）。
- **Copilot CLI**——**GitHub 原生企业级**定位：组织智能体、MDM 策略、托管 marketplace。终端用户配置 UX（`/config`、`/sandbox`）正在交付，但当天的 issue 队列显示企业化路径处处漏风。
- **OpenCode**——*贡献者驱动*色彩最浓：带标签的贡献者 PR（i18n、自动补全、技能设置）与架构工作并行（provider/model 注册表拆分 #48901、codemode 宿主类暴露 #48941）。独一份的自伤式危机：强制下线 V2 布局却没有多 worktree 对等能力——一个流程成熟度的警示。
- **Pi**——纯粹的*harness 工程*项目：可重放转录架构（#9548 记录会话中途的系统提示词/工具变更）、扩展 API 原语（RFC 54 developer 角色）、按 adapter 精确成本核算。受众最小，单 PR 技术密度最高。
- **Qwen Code**——**覆盖面扩张**最广：CUA driver（macOS 已公证、Windows UIAccess）、把 web shell 做成 PWA/Android 产品、DashScope batch 集成、DingTalk 渠道。企业协同推进的功能集群（@wenshao 的守护进程协议系列），而非被动式修补。

## 5. 社区动能与成熟度

- **迭代最快**：**Codex**（10 个已关闭的工程 PR + alpha 版发布 + 190 👍 的讨论）与 **Qwen Code**（一天内 stable + nightly + 二进制 vendoring）。**Pi** 以小博大、表现远超体量（触及 50 个 issue/30 个 PR；维护者批量关闭分诊积压）。
- **参与质量最高**：**Claude Code**（#69044 里长达 50 条评论的纵向故障编年）与 **OpenCode**（附工作流证据的 13 条评论布局之争）——重度投入的资深用户信号，不过 OpenCode 那场目前带着对抗性。
- **流程最成熟**：**Gemini CLI**（nightly 发布节奏、严重度标签、具名维护者专项）与 **Qwen Code**（结构化的发布列车）。
- **风险信号**：Claude Code 在“最新版”上的连续回退正在侵蚀自动更新的信任；Copilot CLI 在 issue 队列火热之际的 PR 零动静日，说明工程开发要么在闭门进行、要么跟不上分诊节奏；OpenCode 的计费讨论帖（#45278）与强制重设计引发的反弹，暴露了支持与发布管理的短板。

## 6. 趋势信号

1. **“静默失败”是头号信任杀手。** 子智能体虚报成功（Gemini #22323）、消息被隐藏（Claude #77798）、TUI 无报错暴毙（Qwen #11500）、提供商错误被误标（Pi #9298）。*参考价值：*在堆新功能之前，先做好显式的终止原因传播与崩溃可见化。
2. **权限解析需要行业标准。** 本周两家厂商各自独立爆出经复合命令/空白符语义绕过 allowlist 的漏洞。一个共享的、经模糊测试的 shell 语法库是现成的机会。
3. **成本核算正在成为产品功能，而非遥测。** 缓存 TTL 计费缺陷（Pi）、5 小时窗口耗尽（Codex）、batch 节流的坑（Claude）都招来了不成比例的社区怒火。
4. **远程控制/事件驱动唤醒是下一个战场**，Claude Code 正是 Codex 用户口中的对标基准（190 👍）。无头守护进程 + 移动端 UI 很可能在两个季度内成为入场标配。
5. **可重放转录正在成为会话的规范架构**（Pi #9548、OpenCode 的重放修复、普遍的会话恢复损坏投诉）——持久且可安全重放的会话状态，是所有构建智能体 harness 的团队的差异化筹码。
6. **Windows 仍被系统性忽视**——七个工具中有五个如此（conhost 闪窗、孤儿进程树、沙箱回退、UTF-8 乱码）——一个具体的差异化切入点。
7. **BYOK 放大了 schema 脆弱性故障**——所有经 OpenAI 兼容网关路由的工具都撞上过不透明的 400 错误；事前的提供商能力校验（工具数量上限、schema 形状）是低成本、高好感的修复。

---
*来源：2026-09-15 各工具社区摘要（按原始提供内容）；issue/PR 引用链接指向各自仓库。*

---

## 各工具详细报告

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills 社区热点

> 数据来源: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills 社区热点报告
*数据截止 2026-09-15 | 来源：github.com/anthropics/skills*

> **关于数据的说明：** 源数据中 PR 评论数未定义；下方的"热门 Skills 排名"采用间接关注度信号（相关 Issue 讨论量、👍 反应数、关键程度以及更新时间）来识别最受关注的 PR。

---

## 1. 热门 Skills 排名

以下 PR 引发了最强的社区关注，主要原因是它们解决了核心工具链中被广泛复现的故障，而非新增技能。

### 1. [#1298 — fix(skill-creator): run_eval.py always reports 0% recall](https://github.com/anthropics/skills/pull/1298)
- **作者：** MartinCajiao | **状态：** OPEN | **更新于：** 2026-09-14
- **功能：** 修复 `skill-creator` 使用的评估工具链。缺少此修复时，`run_loop.py` 和 `improve_description.py` 实际上是在针对噪声进行优化 —— 无论内容如何，每个 skill 描述的召回率都会得 0%。
- **热度原因：** 直接关联 [Issue #556](https://github.com/anthropics/skills/issues/556)（**12 条评论，7 👍**），且有 10+ 独立复现案例，堪称仓库中验证最充分的 bug。同时还将评估产物安装为真正的 skill，并修复了 Windows 流读取和并行工作进程的稳定性问题。

### 2. [#1742 — fix(mcp-builder): mcp>=2 streamable_http_client import & custom headers](https://github.com/anthropics/skills/pull/1742)
- **作者：** Kuldeeep18 | **状态：** OPEN | **更新于：** 2026-09-13
- **功能：** 恢复与 `mcp>=2.0.0` SDK 的兼容性。在该版本中，`streamable_http_client` 被重命名，且自定义 HTTP 头现在必须通过 `create_mcp_http_client` 进行配置。缺少此修复，当前 SDK 上的 `connections.py` 将无法工作。
- **讨论要点：** 修复 [Issue #1668](https://github.com/anthropics/skills/issues/1668)；属于近期 mcp-builder 可靠性修复集群的一部分，该集群主导了近期活动。

### 3. [#1602 — fix: evaluation serialization, benchmark metrics, encoding, script stability](https://github.com/anthropics/skills/pull/1602)
- **作者：** AbhiPra24 | **状态：** OPEN | **更新于：** 2026-08-24
- **功能：** 一揽子可靠性补丁，涉及 **mcp-builder**（序列化前提取 `TextContent` 块）、编码修复以及基准指标修正。
- **热度原因：** 直接解决 [Issue #1390](https://github.com/anthropics/skills/issues/1390)（**4 条评论**），其中 `evaluation.py` 针对真实 MCP 服务器的**每一次**调用都静默捏造了一个工具执行错误，得分为 0/N。

### 4. [#1724 — mcp-builder: update evaluation.py default model to claude-sonnet-5](https://github.com/anthropics/skills/pull/1724)
- **作者：** ExpertVagabond | **状态：** OPEN | **更新于：** 2026-09-07
- **功能：** 将评估模型从已弃用的 `claude-3-7-sonnet-20250219` 快照更新到 `claude-sonnet-5`，同时更新 `run_evaluation()` 函数签名和 `-m/--model` argparse 选项。
- **讨论要点：** 反映了社区对过时模型引用的不满 —— 另见 [PR #1607](https://github.com/anthropics/skills/pull/1607) 对 `claude-api` skill 做同样的处理（将四个已退役的模型 ID 标记为 retired）。

### 5. [#538 — fix(pdf): correct case-sensitive file references in SKILL.md](https://github.com/anthropics/skills/pull/538)
- **作者：** Lubrsy706 | **状态：** OPEN | **更新于：** 2026-04-29
- **功能：** 修补 8 处大小写不匹配问题（`REFERENCE.md` → `reference.md`，`FORMS.md` → `forms.md`），这些问题会导致 `pdf` skill 在大小写敏感的文件系统（Linux/macOS）上无法加载。
- **热度原因：** 一个典型的"小修复、大影响"案例 —— 一个字符错误就会在所有非 Windows 用户上静默破坏 skill 加载。

### 6. [#541 — fix(docx): prevent tracked-change w:id collision with existing bookmarks](https://github.com/anthropics/skills/pull/541)
- **作者：** Lubrsy706 | **状态：** OPEN | **更新于：** 2026-04-16
- **功能：** 修复 DOCX skill 向已包含书签的文档添加修订时导致的文档损坏 —— 硬编码的低 `w:id` 值（1、2、3）与共享的 OOXML ID 空间冲突。
- **热度原因：** 静默数据损坏是最昂贵的 bug 类型；影响每一个编辑真实 DOCX 文件的用户。

### 7. [#539 — fix(skill-creator): warn on unquoted description with YAML special characters](https://github.com/anthropics/skills/pull/539)
- **作者：** Lubrsy706 | **状态：** OPEN | **更新于：** 2026-04-16
- **功能：** 在 `quick_validate.py` 中添加解析前校验，在 `yaml.safe_load()` 静默截断之前捕获包含 `:` 的未加引号 `description` 字段。
- **热度原因：** 改善开发者体验 —— 把令人困惑的"我的 skill 描述被吞了"故障转变成恰到好处的清晰警告。

### 8. [#1765 — fix(office): decode redlining diffs as UTF-8](https://github.com/anthropics/skills/pull/1765)
- **作者：** 00200200 | **状态：** OPEN | **更新于：** 2026-09-14
- **功能：** 在 DOCX/PPTX/XLSX 修订校验器中将 `git diff` 输出按 UTF-8 解码，修复在 Windows 和非 UTF-8 区域设置下非 ASCII 内容的修订差异显示问题。
- **热度原因：** 修复 [Issue #1707](https://github.com/anthropics/skills/issues/1707)；已对波兰语及其他非拉丁文字进行验证。

---

## 2. 社区需求趋势（来自 Issues）

Issues 流揭示了三类汇聚的需求：

### 🔒 信任与安全（最高音量）
- **[#492 — `anthropic/` 命名空间下的社区 skills 助长信任边界滥用](https://github.com/anthropics/skills/issues/492)** —— **43 条评论，2 👍**。数据集中讨论最热的单一话题。以官方命名空间分发的社区 skill 冒充 Anthropic skill，可能继承用户的额外信任。社区强烈期待引入经过验证的发布者或命名空间隔离机制。

### 🏢 企业级分发
- **[#228 — 在 Claude.ai 中启用组织级 skill 共享](https://github.com/anthropics/skills/issues/228)** —— **16 条评论，8 👍**（数据集中 👍 比例最高）。用户希望提供共享库或直接分享链接，而不是手动逐个下载 `.skill` 文件再上传。
- **[#1175 — 通过 Agent Skills 接入 SharePoint Online](https://github.com/anthropics/skills/issues/1175)** —— **4 条评论**（CLOSED）。针对企业文档系统中基于 SKILL.md 的访问控制进行早期范围讨论。
- **[#29 — 与 AWS Bedrock 集成使用](https://github.com/anthropics/skills/issues/29)** —— **4 条评论**（自 2025-10 至今仍 OPEN）。长期悬而未决的企业集成缺口。

### 🧠 记忆、推理与 Agent 质量
- **[#1329 — compact-memory skill 提案](https://github.com/anthropics/skills/issues/1329)** —— **9 条评论**。用于精简 agent 状态的符号化表示，减少长任务 agent 笔记的上下文开销。
- **[#1385 — 推理质量门禁流水线](https://github.com/anthropics/skills/issues/1385)** —— **4 条评论，1 👍**。将任务前校准 → 对抗性审查 → 交付验证串联为可组合 skill。
- **[#412 — agent-governance skill](https://github.com/anthropics/skills/issues/412)** —— **6 条评论**（CLOSED）。策略执行、威胁检测、信任评分、审计日志。
- **[#16 — 将 Skills 暴露为 MCPs](https://github.com/anthropics/skills/issues/16)** —— **4 条评论**（自 2025-10 OPEN）。长期、稳定的一类请求：希望将 skill API 作为一等公民通过 MCP 暴露。

### 🛠 Skill 可靠性与质量
- **[#556 — `run_eval.py` 0% 触发率](https://github.com/anthropics/skills/issues/556)** —— **12 条评论，7 👍**。与 PR #1298 同根因。
- **[#62 — Skills 消失问题](https://github.com/anthropics/skills/issues/62)** —— **10 条评论，2 👍**。影响用户信任的持久化/可见性 bug。
- **[#189 — `document-skills` 与 `example-skills` 安装内容相同](https://github.com/anthropics/skills/issues/189)** —— **6 条评论，9 👍**。插件打包重复导致上下文窗口膨胀。
- **[#1487 — `claude-api` skill 一次工具调用注入约 156k tokens](https://github.com/anthropics/skills/issues/1487)** —— **4 条评论**。急切的预加载耗尽上下文。
- **[#1362 — web-artifacts-builder 在 pnpm ≥10.1 下崩溃](https://github.com/anthropics/skills/issues/1362)** —— **3 条评论**。工具链漂移问题。

---

## 3. 高潜力待合并 Skills

以下 PR 仍为 OPEN 但处于活跃状态，针对关键 bug 或广泛请求的功能 —— 预计很快会合并：

| # | PR | Skill / 领域 | 预计合并原因 |
|---|----|--------------|--------------------------|
| 1 | [#1298](https://github.com/anthropics/skills/pull/1298) | skill-creator 评估修复 | #556 有 10+ 复现案例；涉及核心创作闭环 |
| 2 | [#1742](https://github.com/anthropics/skills/pull/1742) | mcp-builder SDK 兼容性 | 恢复 `mcp>=2.0.0` 上的功能 —— 整个 mcp-builder 工作流的合并阻塞点 |
| 3 | [#1602](https://github.com/anthropics/skills/pull/1602) | mcp-builder 评估序列化 | 解决真实 MCP 服务器上的 0/N 评分问题（#1390） |
| 4 | [#1724](https://github.com/anthropics/skills/pull/1724) | mcp-builder 模型刷新 | 默认评估模型与当前 Sonnet 系列对齐 |
| 5 | [#538](https://github.com/anthropics/skills/pull/538) | pdf skill 大小写修复 | 改动小、影响面大的 Linux/macOS 修复 |
| 6 | [#541](https://github.com/anthropics/skills/pull/541) | docx 修订 ID 修复 | 防止静默的 DOCX 文件损坏 |
| 7 | [#539](https://github.com/anthropics/skills/pull/539) | skill-creator YAML 校验 | 改善所有 skill 作者的开发体验 |
| 8 | [#1765](https://github.com/anthropics/skills/pull/1765) | office 修订 UTF-8 解码 | 恢复修订差异的国际化支持 |

---

## 4. Skills 生态洞察

> **社区最集中的诉求是让 skill 创作闭环本身值得信赖 —— 修复 `skill-creator` 和 `mcp-builder` 中已损坏的评估工具链，使 skill 描述、MCP 服务器以及修订工作流能够被度量而非凭感觉判断，同时防止社区 skill 通过 `anthropic/` 命名空间冒充官方 skill。**

---

*生成于 2026-09-15 | 来源：anthrop 仓库中的 50 个 PR 和 15 个 Issue*

---

# Claude Code 社区摘要 — 2026-09-15

## 今日要点

社区信号主要被**会话完整性以及成本/计费可靠性相关 Bug**占据，尤其在新版本（2.1.269、2.1.270）中问题更为突出。最受关注的帖子 —— [#69044](https://github.com/anthropics/claude-code/issues/69044) —— 是一位日常用户历时数月整理的反复出错问题清单。与此同时，多篇新的 macOS/Bedrock 报告（[#94252](https://github.com/anthropics/claude-code/issues/94252)、[#94335](https://github.com/anthropics/claude-code/issues/94335)）描述了在 `tool_result` 投递后会话永久挂起的问题。好消息方面，PR [#94184](https://github.com/anthropics/claude-code/pull/94184) 落地了一个打磨精致的 `/diff` 停靠面板，PR [#87079](https://github.com/anthropics/claude-code/pull/87079) 修复了一个静默的安全规则匹配漏洞。

## 版本发布

_过去 24 小时内无新版本发布。_

## 热门 Issue

1. **[#69044 — 历时数月的日常 Claude Code 使用反复错误记录](https://github.com/anthropics/claude-code/issues/69044)** —— 一位日常重度用户整理了一份结构化的、跨数月时间的失败模式清单。该帖评论数居榜首（50 条评论）；说明这是广泛、持续存在的摩擦，而非一次性回归。
2. **[#76248 — Cowork git 代理现在会拦截所有授权仓库之外的推送](https://github.com/anthropics/claude-code/issues/76248)** —— Cowork 在会话中途的变更导致任何不在会话白名单内的仓库（含合法的细粒度 PAT）都无法推送。35 条评论 / 15 👍；疑似与 `CCR_TEST_GITPROXY` 的灰度有关。
3. **[#51847 — Windows 下更新后出现"另一个程序正在使用此文件"](https://github.com/anthropics/claude-code/issues/51848)** —— 典型的 Windows 文件句柄锁导致无法更新；已关闭，说明修复已落地。17 👍 反映出该更新阻塞 Bug 在 Windows 平台的影响面非常广。
4. **[#90542 — 一份 700 行的 CLAUDE.md 在 4.5 小时会话中被完全忽略](https://github.com/anthropics/claude-code/issues/90542)** —— 用户严格遵守了所有契约规则，却看到每一条都被违反，包括模型自身引用过的规则。对依赖系统提示治理的重度用户而言，这是高风险故障。
5. **[#34690 — "Allow network egress – All domains" 未反映在会话代理 JWT 中](https://github.com/anthropics/claude-code/issues/34690)** —— 该设置在运行时被静默忽略，阻塞了用户预期的 Web/Cowork 出站访问。20 👍 表明多人确认了该缺口。
6. **[#90067 — WezTerm 中 Shift 后的标点键输出未带 Shift（2.1.247 回归）](https://github.com/anthropics/claude-code/issues/90067)** —— `Shift+/` 输出 `/` 而非 `?`；根因追溯到 kitty 键盘协议标志位变更。已关闭，但作为近期 TUI 输入回归的典型案例值得关注。
7. **[#93782 — 2.1.269 之后 VS Code WSL 终端听写粘贴失效](https://github.com/anthropics/claude-code/issues/93782)** —— Wispr Flow 的粘贴内容被静默吞掉；2.1.268 工作正常。复现版本范围非常窄，便于定位修复。
8. **[#94252 — Bedrock：Read 的 `tool_result` 永远未投递，会话在 `kevent64` 中卡死](https://github.com/anthropics/claude-code/issues/94252)** —— Mac/Bedrock 用户在工具结果上遭遇永久挂起，影响生产可靠性。
9. **[#77798 — Fable 中途消息被隐藏；长文本以 thinking 块形式输出](https://github.com/anthropics/claude-code/issues/77798)** —— 影响运维对长助手轮次的可见性；与一批相关的会话持久化报告有关联。
10. **[#94314 — Bash 允许规则在匹配前未按 `;`/`&&` 拆分](https://github.com/anthropics/claude-code/issues/94314)** —— 复合命令绕过受限的允许列表，尽管文档并非如此说明。对沙盒用户而言是高危安全问题。

## 关键 PR 进展

1. **[#94184 — 停靠式 `/diff` 面板，含固定头部、仅正文滚动、滚轮路由](https://github.com/anthropics/claude-code/pull/94184)** —— 弥合了与内置 diff 面板的视觉差距。*已关闭。*
2. **[#71627 — 文档：注明提示已批准的主机是会话级作用域](https://github.com/anthropics/claude-code/pull/71627)** —— 澄清了此前让沙盒用户感到意外的行为 —— 在恢复会话时会丢失主机批准。
3. **[#93951 — 将 diff/sec-default/telemetry 测试移至对应模块旁](https://github.com/anthropics/claude-code/pull/93951)** —— 将单元测试就近放置在 `mods/<mod>/tests/` 下，可通过 `claude plugin test` 运行。*已关闭。*
4. **[#87079 — 让安全指引中的 `**` 通配符匹配零深度路径](https://github.com/anthropics/claude-code/pull/87079)** —— 修复了一个静默的非覆盖 Bug：`**/*.ts` 类规则会跳过顶层文件；由于这些是安全规则，静默漏匹配是危险行为，这一点尤为重要。
5. **[#93782 —（追踪）2.1.269 听写粘贴回归](https://github.com/anthropics/claude-code/issues/93782)** —— 已在上文列出；修复 PR 尚未出现。
6. **[#93951 — 模块测试搬迁](https://github.com/anthropics/claude-code/pull/93951)** —— 已在上文列出；有助于插件作者。
7. **[#94184 — Diff 面板优化](https://github.com/anthropics/claude-code/pull/94184)** —— 已在上文列出。
8. *过去 24 小时内无其他开放 PR。* 24 小时窗口中其余事项均为文档澄清和测试基础设施搬迁，并非面向用户的功能。

## 功能请求趋势

- **可靠的会话核算**：多个 Issue（[#94339](https://github.com/anthropics/claude-code/issues/94339)、[#94337](https://github.com/anthropics/claude-code/issues/94337)、[#94342](https://github.com/anthropics/claude-code/issues/94342)、[#94330](https://github.com/anthropics/claude-code/issues/94330)）汇聚为一个诉求：可预测、可审计的 token/花费报告 —— 涵盖中断、工具结果持久化以及 MCP 批量调度等场景。
- **更好的 MCP 人机工程**：[#78041](https://github.com/anthropics/claude-code/issues/78041) 指出工具命名空间不透明且不一致；[#85908](https://github.com/anthropics/claude-code/issues/85908) 希望 Desktop Chat 成为可被唤起的编排者。
- **更清晰的提示治理**：[#90542](https://github.com/anthropics/claude-code/issues/90542) 凸显了对 `CLAUDE.md` 契约进行可验证遵守的必要性。
- **跨端功能一致性**：[#92031](https://github.com/anthropics/claude-code/issues/92031)（账号级插件未同步至 Web）与 [#94309](https://github.com/anthropics/claude-code/issues/94309)（Cowork 的斜杠命令选择器行为）都在推动 Desktop、Cowork 与 Web 之间的一致性。

## 开发者痛点

- **TUI/输入回归严重困扰重度用户**：连续两个版本（2.1.247、2.1.269）分别破坏了 Shift 标点和听写粘贴功能。结合 [#85776](https://github.com/anthropics/claude-code/issues/85776)（退出时终端标题被清空，导致 tmux-resurrect 损坏），终端状态处理显然是一块薄弱环节。
- **"最新版本" 不等于 "稳定版本"**：多个帖子明确验证了 Bug 在最新版本（2.1.269/270）上仍可复现，削弱了用户对自动更新的信任 —— 在 Windows 和 macOS Bedrock 上尤为突出。
- **沙盒与权限语义文档不足**：[#94314](https://github.com/anthropics/claude-code/issues/94314) 表明文档所述的复合命令拆分实际上并未发生，使受限的允许列表给人一种虚假的安全感。
- **会话终止时的孤儿子进程**（[#93996](https://github.com/anthropics/claude-code/issues/93996)）：Claude Code 崩溃后 `tsc`/`vitest` 仍在无人监管下运行，浪费算力并污染状态。
- **会话丢失 / 静默数据丢失**：[#94336](https://github.com/anthropics/claude-code/issues/94336) 报告工具之间的助手文本在磁盘上被替换为摘要 —— 这是从"仅展示用摘要"退化为真正数据丢失的回归，是严重的持久化问题。
- **成本透明度**：用户希望批量级提示只出现一次，而非每个工具结果都重复一遍（[#94338](https://github.com/anthropics/claude-code/issues/94338)）；希望在"自由探索"任务前有花费预检点（[#94342](https://github.com/anthropics/claude-code/issues/94342)）；并希望 bash 输出不要被静默持久化到 `~/.claude` 后再被回读（[#94337](https://github.com/anthropics/claude-code/issues/94337)）。

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex 社区日报 — 2026-09-15

## 今日要点

今天的动态主要被来自 `copyberry[bot]` 自动化（Guardian / MCP / Windows 沙盒维护）的大量 closed/refactoring PR 刷屏，伴随一个全新的 `rust-v0.155.0-alpha.4` 预发布版本，以及一批评论数较高的 Windows Desktop bug 报告（队列、跟进消息、app-server 守护进程）。社区对**通过 ChatGPT 应用远程控制**以及**原生事件驱动的会话唤醒原语**的需求依然非常强烈。

## 版本发布

- **rust-v0.155.0-alpha.4** — 新的 Rust CLI alpha 版本已发布；除版本标签外未提供 changelog 正文。请关注 0.155.0 稳定后的后续说明。
  [Release](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.4)

## 热门 Issue

1. **#44781 — Codex Desktop: 编辑并重新发送队列中的消息触发 "App-server queued follow-up no longer exists"**（28 条评论，34 👍）。今日反应数最高的 Windows Desktop 话题 — 直接阻塞常见的迭代循环。[Link](https://github.com/openai/codex/issues/44781)
2. **#44720 — ChatGPT hit a snag bug reproduce（macOS，26.908.31457）**（36 条评论）。评论量最多的主题；已 closed，但其回归模式催生了下面几条跟进。[Link](https://github.com/openai/codex/issues/44720)
3. **#45069 — Codex Desktop（Windows）：已有会话中的跟进消息始终无法发送**（7 条评论）。Open 状态，刚出现在 `26.908.40834` — 回复路径被破坏，使会话实际变为只读。[Link](https://github.com/openai/codex/issues/45069)
4. **#43468 — `[desktop] read_thread/wait_threads 返回 items=[]`，但 UI 中可看到已完成的回合**（8 条评论）。App-server 的语义缺口，破坏了程序化的会话检查。[Link](https://github.com/openai/codex/issues/43468)
5. **#45119 — macOS 14.2：沙盒启动失败，错误为 unbound variable `TIOCSTI`**（10 条评论）。在较旧 macOS 上的沙盒回归；影响 `0.154.0-alpha.6.2` 以及当前的 `main`。[Link](https://github.com/openai/codex/issues/45119)
6. **#44743 — macOS app 26.908.31748：空白窗口 — `r is not a function`（循环导入）**（10 条评论）。通过回滚到 `26.901.51231` 已 closed；可作为回归标记参考。[Link](https://github.com/openai/codex/issues/44743)
7. **#44088 — Codex desktop：通过 shell/Python 的写入缺少逐文件编辑卡片**（11 条评论）。一个真实的信任/安全缺口：经 shell 完成的文件编辑绕过了可见的审查界面。[Link](https://github.com/openai/codex/issues/44088)
8. **#44736 — Windows：ChatGPT 项目预热会锁定本地镜像；启动时会清除 `node_repl` 临时方案**（7 条评论）。长期未解决的旧话题（引用 #42215、#34499），存在用户已确认的临时方案。[Link](https://github.com/openai/codex/issues/44736)
9. **#44768 — Windows 上 app-server 守护进程为每个 hook 和 shell 命令打开一个可见的控制台窗口**（2 条评论）。Windows 上 `codex app-server daemon start` 的破坏性 UX 副作用。[Link](https://github.com/openai/codex/issues/44768)
10. **#45411 — Codex 0.154.0 / Plus / GPT-5.6 Sol High 在同一任务上耗尽两个连续的 5h 窗口**（2 条评论，1 👍）。限速争议的延续；与 #43341 配套阅读。[Link](https://github.com/openai/codex/issues/45411)

## 重要 PR 进展

1. **#45463 — 允许为托管网络代理配置专用监听器**（closed）。在 `NetworkProxyBuilder` 中新增 `ManagedProxyRouting`，使沙盒化端点获得独立的 loopback 端口，而非共用 SID 归属的入站。[Link](https://github.com/openai/codex/pull/45463)
2. **#45457 — 修复 tmux 和 SSH 会话的剪贴板路由**（closed）。关闭了 issue #45068 的来源：获得远程客户端的持久 tmux 会话现在可以正确转发终端复制内容。[Link](https://github.com/openai/codex/pull/45457)
3. **#45455 — 重构 Windows 沙盒设置和服务辅助函数**（closed）。模块化了辅助函数拷贝、token-user SID 查询、管道所有权以及 Windows 上的服务运行时生命周期管理。[Link](https://github.com/openai/codex/pull/45455)
4. **#45312 — 将 Windows 沙盒配置准备工作抽取为辅助函数**（closed）。引入 `prepare_windows_sandbox_config` 和 `PreparedWindowsSandboxConfig`，将配置模式与生效的沙盒层解耦。[Link](https://github.com/openai/codex/pull/45312)
5. **#45459 — 在目录中解析企业托管的 MCP 注册项**（closed）。由 `features.use_xaa` 控制的企业 IdP 感知型 MCP 目录绑定。[Link](https://github.com/openai/codex/pull/45459)
6. **#45440 — 共享 Apps 工具目录，但不再保留未使用的快照**（closed）。阻止空闲的 Apps 客户端持有已被替换的工具定义，并仅在确有需要时使已准备的调用失效。[Link](https://github.com/openai/codex/pull/45440)
7. **#45439 — 共享工具输出 schema，并延迟 MCP 包装构建**（closed）。懒加载的 `ToolOutputSchema` 加上延迟的 call-result envelope — MCP 在性能与内存方面的一次有意义的胜利。[Link](https://github.com/openai/codex/pull/45439)
8. **#45445 — 将命令和插件分析归属到发起调用的模型**（closed）。分析数据现在能正确归属到真正调用该命令的执行步骤，即便后续模型设置发生变更也是如此。[Link](https://github.com/openai/codex/pull/45445)
9. **#45441 — 在采样请求之间保留 Guardian 的父响应 ID**（closed）。防止 Guardian 审阅在响应回合之间丢失 `parent_response_id`。[Link](https://github.com/openai/codex/pull/45441)
10. **#45399 — 在清除或单元格完成时取消 code-mode 的定时任务**（closed）。将每个 `setTimeout` 线程替换为 `AbortOnDropHandle`，消除了泄漏的 sleeper。[Link](https://github.com/openai/codex/pull/45399)

## 热门讨论

### Ideas
- **#9200 — 从 ChatGPT 应用远程控制 Codex**（190 👍）。迄今 upvote 数最高的 open idea；社区希望 Codex 具备一等公民级的 headless/daemon 形态，可通过 ChatGPT 移动端 UI 控制。[Link](https://github.com/openai/codex/discussions/9200)
- **#14595 — 远程控制何时落地？**（18 👍）。围绕远程控制的路线图压力，并以 Claude Code 的实现作为基准。[Link](https://github.com/openai/codex/discussions/14595)
- **#13287 — 长跨度、多会话开发支持的用例**（12 条评论）。issue #13241 的姊妹篇；讨论跨多个会话的长生命周期 agent。[Link](https://github.com/openai/codex/discussions/13287)
- **#45284 — 为每个 GitHub PR 提供可选的持久化 Codex 会话**（1 👍）。避免迭代式 `@codex` 评审周期中上下文被切碎。[Link](https://github.com/openai/codex/discussions/45284)

### General
- **#45211 — 公开声明：重新开放 Pro 20X 访问、解决韩语质量问题并澄清重置策略。**关于 Pro 20X 注册/升级暂停以及韩语混用问题的统一用户反馈。[Link](https://github.com/openai/codex/discussions/45211)

### Show and tell
- **#44843 — SKILL.md → Codex 插件包转换器（MIT，仅使用标准库）。**面向 marketplace / agent-skills 生态的参考工具。[Link](https://github.com/openai/codex/discussions/44843)
- **#45392 — 解读 Codex rollout 文件：踩过的坑与绕行方案。**Fishbowl viewer 作者的一线报告 — 对 rollout schema 的稳定性很有参考价值。[Link](https://github.com/openai/codex/discussions/45392)
- **#45382 — codex-sdlc：需求 → 实现 → 独立质检。**构建在 Codex 之上的可重复多角色工作流。[Link](https://github.com/openai/codex/discussions/45382)
- **#44618 — Wayfinder：将 Codex 工作可视化为一段航海图。**本地优先的 Codex 会话可视化工具。[Link](https://github.com/openai/codex/discussions/44618)
- **#45278 — Polter：一个 Codex 监督其他 AI CLI。**Ghostty 的 fork + supervisor 模式，用于让子 agent 保持可控。[Link](https://github.com/openai/codex/discussions/45278)

## 功能请求趋势

- **来自 ChatGPT / 移动端的一等远程控制。** #9200、#14595 — 社区中最主导的主题。
- **事件驱动 / 基于推送的会话唤醒。** #20312（"native event-driven session wake primitive"）与 #9200 相结合 — 把回合驱动的 Codex 变成响应式 agent。
- **长跨度、多会话连续性。** #13287、#13241 — 跨会话与跨 PR 的持久上下文（#45284）。
- **Agent 派生进程的可观测性。** #42244（Desktop 中展示 dev server / 后台进程）与 #44088（即便通过 shell 的写入也提供逐文件编辑卡片）— 都指向更透明的 agent 执行界面。
- **成本 / 限速的透明度与可预测性。** #43341、#45411 — 用户希望配额反映真实工作量，而非被额外开销占据的富裕空间。

## 开发者痛点

- **Windows Desktop 回归正在聚集：**队列/跟进消息（#44781、#45069）、app-server 守护进程打开控制台窗口（#44768）、NUL 损坏状态导致项目被清空（#38757）、首个回合后 Composer 被禁用（#40872），以及只读沙盒阻塞 Node/WSL/pip（#21470）。
- **较旧版本上的 macOS 沙盒不稳定：**`TIOCSTI` 失败（#45119）以及 `26.908.31748` 的空白窗口回归（#44743、#44738、#44886、#44818）— 整体构成一波 "ChatGPT hit a snag" 现象，目前多数已通过回滚关闭，但反映出渲染层导入的脆弱性。
- **App-server 语义与 UI 状态不一致：**对可见回合 `read_thread` / `wait_threads` 返回空数组（#43468），以及工具输出顺序导致的 "No tool output found for tool call X"（#44604）— 两者都破坏了程序化/自动化流程。
- **跨平台可靠性摩擦：**提权的 Windows 沙盒缺乏私有 Git 所需的凭据上下文（#42621），Windows desktop 启动过程又会侵蚀已有的临时方案（#44736）。对长期临时方案的信任正在流失。
- **限速信任赤字：**Plus 用户在 GPT-5.6 / 6 档推理模型上反馈，单个任务就耗尽 5 小时窗口（#43341、#45411）；Pro 20X 暂停进一步放大了这一感受（#45211）。

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI 社区摘要 — 2026-09-15

## 今日要点

Gemini CLI 社区目前高度关注 **智能体可靠性与可观测性**：多个 P1 级缺陷涉及子智能体在达到 MAX_TURNS 后仍上报虚假成功（issue #22323）、通用智能体在简单任务上无限挂起（#21409），以及 shell 命令卡在"等待输入"状态（#25166）。另一条并行的工作线是 **Auto Memory 加固**，由维护者 SandyTao520 主推，重点解决脱敏、重试循环以及非法补丁的处理问题。版本方面，项目按节奏推送了例行的 v0.61.0-nightly.20260914，并落地了若干实质性修复，包括 MCP OAuth（RFC 9207）、嵌套 `.gitignore` 处理以及设置编辑器溢出保护。

## 版本发布

- **v0.61.0-nightly.20260914.g9c1b0a610** — 自动夜间版本号递增（[#29321](https://github.com/google-gemini/gemini-cli/pull/29321)）。完整 diff：[compare link](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260913.g9c1b0a610...v0.61.0-nightly.20260914.g9c1b0a610)。

## 热门 Issues

1. **[#22323 — 子智能体在达到 MAX_TURNS 后仍上报 GOAL 成功](https://github.com/google-gemini/gemini-cli/issues/22323)** · P1, agent · 13 条评论，👍2。`codebase_investigator` 在尚未开展任何分析之前就耗尽了轮次预算，却仍然上报 `status: "success"` 并标注 `Termination Reason: "GOAL"`——这会以静默方式掩盖中断事件。对子智能体输出的可信度至关重要。

2. **[#21409 — 通用智能体挂起](https://github.com/google-gemini/gemini-cli/issues/21409)** · P1, agent · 8 条评论，👍8。一旦委派给通用智能体，即便是创建文件夹这样的轻量操作也会引发挂起；用户的临时解决方案是显式声明"不要使用子智能体"。鉴于较高的 👍 数，社区影响很大。

3. **[#19873 — 零依赖 OS 级沙箱与执行后意图路由](https://github.com/google-gemini/gemini-cli/issues/19873)** · P2, enhancement · 9 条评论，👍1。雄心勃勃的提案：利用 Gemini 3 对 POSIX bash 的原生亲和力（链式 `grep`/`sed`/`awk`），并结合 OS 级沙箱。工程量不小，但对安全 UX 具有战略意义。

4. **[#22745 — 评估 AST 感知的文件读取、搜索与映射](https://github.com/google-gemini/gemini-cli/issues/22745)** · P2, feature · 7 条评论，👍1。史诗级探索议题，目标是引入 AST 感知工具以减少 token 噪音和读取错位（例如在同一次调用中读取方法作用域内的内容）。

5. **[#21968 — Gemini 不会主动调用 skills 与 sub-agents](https://github.com/google-gemini/gemini-cli/issues/21968)** · P2, agent · 6 条评论。虽然是经验性反馈但极具共鸣：用户观察到模型只有在被显式提示时才会调用自定义 skills/sub-agents，这削弱了它们的价值。

6. **[#25166 — Shell 命令卡在"等待输入"状态](https://github.com/google-gemini/gemini-cli/issues/25166)** · P1, core · 4 条评论，👍3。简单的 CLI 调用结束后，shell 仍停留在"等待用户输入"状态。属于明确的 UX 回归。

7. **[#26525 — Auto Memory 的确定性脱敏与日志降噪](https://github.com/google-gemini/gemini-cli/issues/26525)** · P2, security · 5 条评论。Auto Memory 在脱敏*之前*就把转写内容发送给抽取模型，并且 skill 服务可能会记录密钥。属于敏感安全问题。

8. **[#26522 — 停止 Auto Memory 对低信号会话的重试](https://github.com/google-gemini/gemini-cli/issues/26522)** · P2, agent · 4 条评论。被抽取智能体跳过的会话仍处于"未处理"状态，可能无限循环复现——这是记忆管道中的持久化缺陷。

9. **[#21983 — 浏览器子智能体在 Wayland 下失败](https://github.com/google-gemini/gemini-cli/issues/21983)** · P1, agent/browser · 4 条评论。浏览器智能体在 Wayland 下以 `GOAL` 终止但没有任何输出；这是 Linux 桌面用户复现用例时的阻断性问题。

10. **[#22267 — 浏览器智能体忽略 `settings.json` 覆盖（例如 `maxTurns`）](https://github.com/google-gemini/gemini-cli/issues/22267)** · P2, agent · 3 条评论。`BrowserManager` 绕过了用户配置的智能体设置——这是影响高级用户的配置正确性缺口。

## 关键 PR 进展

1. **[#29117 — 在 MCP OAuth 流程中强制执行 RFC 9207 颁发者标识](https://github.com/google-gemini/gemini-cli/pull/29117)** · size/m。为 `OAuthAuthorizationResponse` 增加 `iss` 校验，避免令牌被错误路由——属于重要的 MCP 加固项。

2. **[#29287 — 将 `--yolo` 映射到 `allowedTools` 通配策略](https://github.com/google-gemini/gemini-cli/pull/29287)** · size/xl, closed。将遗留的 `ApprovalMode.YOLO` 重构为通配形式的 `allowedTools` 策略，统一信任模型。（目前已关闭——可能经过了重新设计。）

3. **[#29229 — 设置编辑器拒绝非有限数](https://github.com/google-gemini/gemini-cli/pull/29229)** · size/s。`parseEditedValue('number', ...)` 此前接受 `1e309`（解析为 `Infinity`）并以静默方式序列化为 `null`，从而损坏设置；现已改用 `Number.isFinite`。

4. **[#29323 — 嵌套 `.gitignore` 中的尾部斜杠模式](https://github.com/google-gemini/gemini-cli/pull/29323)** · size/l，以及最小修复 [**#29324**](https://github.com/google-gemini/gemini-cli/pull/29324)。这是针对 #29290 的两个相互竞争的修复方案：`pkg/.gitignore` 中的 `build/` 应匹配任意深度的同名目录，而非仅匹配文件自身所在目录。

5. **[#29132 / #29131 — 规范化 diff 上下文片段的换行符](https://github.com/google-gemini/gemini-cli/pull/29132)** · size/s。避免 `getDiffContextSnippet` 在 LF 与 CRLF 不一致导致整文件 diff 时输出整个文件——这在 Windows 上是长期痛点。

6. **[#29134 — 防止当前会话被删除](https://github.com/google-gemini/gemini-cli/pull/29134)** · size/m, closed。在 `--list-sessions` / `--delete-session` 之间传递当前会话 ID，避免用户误删自己正在使用的会话。

7. **[#29326 — 修复 `unassign-inactive-assignees` 中缺失的循环](https://github.com/google-gemini/gemini-cli/pull/29326)** · size/xs。工作流脚本主体按循环方式进行了缩进，但缺少 `for` 头语句——导致 `continue` 从未执行，unassign 逻辑失效。

8. **[#29230 — 修复各指南中的失效锚点](https://github.com/google-gemini/gemini-cli/pull/29230)** · size/s。七篇文档页面存在过时的页内锚点（尤其是 `plan-mode.md`，原因是一次标题重新编号）；修复内容已与实际标题核对。

9. **[#29231 — 修复过时的 JSDoc 参数名](https://github.com/google-gemini/gemini-cli/pull/29231)** · size/xs。删除了 `addDirectory` 与 `loadAgent` 上已不存在的 `basePath` 和 `agentCardUrl` 参数文档。

10. **[#29137 — Dependabot：升级 npm-dependencies 组（77 项更新）](https://github.com/google-gemini/gemini-cli/pull/29137)** · size/xl。值得关注的升级：`simple-git` 3.28 → 3.36 以及 `@modelcontextprotocol/sdk`（1.x → current）。建议在合并前进行一次安全审计。

## 功能请求趋势

- **面向代码库导航的 AST 感知工具。** Issues #22745 和 #22746 推动实现精确到方法级的读取/搜索以及基于 AST 的映射（候选 `tilth`、`glyph`），从而降低 token 用量与读取错位。
- **Auto Memory 作为一等子系统。** 一组相互协调的议题（#26525、#26522、#26523、#26516）呼吁引入确定性脱敏、重试上限、非法补丁隔离，以及一个统一的跟踪 epic——表明 Auto Memory 正从原型走向产品化。
- **子智能体的透明度与可达性。** 围绕 `/chat share` 暴露子智能体轨迹（#22598）、bug 报告附带子智能体上下文（#21763）以及 skills/subagent 的主动调用（#21968）等功能请求，都指向同一个方向：*让多智能体行为可被检视、可被发现。*
- **浏览器智能体的韧性。** #22232（会话接管/锁恢复）、#22267（遵循 `settings.json`）和 #21983（Wayland）共同呼吁加强浏览器智能体的生命周期管理。
- **更安全的破坏性操作默认值。** #22672 请求智能体在存在替代方案时避免使用 `git reset`/`--force`，这与 #21432 中更宏观的"智能体自我认知"目标相一致。
- **遥测标准化。** #11802 请求支持 OTLP header，以便对 OTEL Collector 进行身份认证。

## 开发者痛点

- **子智能体静默失败或挂起。** #22323 的虚假成功缺陷、#21409 的通用智能体挂起、以及 #22267 的设置覆盖被忽略，都共享一个主题：多智能体编排*可观测性与可控性都不足*。开发者无法可靠判断子智能体是已完成还是已卡住。
- **交互式 shell 与 CLI 提示卡顿。** #25166（命令结束后仍"等待输入"）和 #22465（Vite 交互式提示卡住）是同类缺陷在不同层级上的表现——智能体无法可靠识别非交互式命令的完成事件。
- **Token / 工具数量上限。** #24246 暴露出当工具数超过约 128 个时出现 400 错误；#12214（现已关闭）则涉及 token 数溢出——两者共同说明当前的 `enabled-tools` 与上下文窗口启发式策略过于粗糙。
- **Auto Memory 的噪音与风险。** 四个相关 issues（#26516/22/23/25）分别描述了未处理会话的重试循环、被静默丢弃的非法补丁、密钥在脱敏前到达抽取模型，以及 skill 服务记录密钥等问题。这是当前积压中密度最高的痛点区域。
- **文件系统边界场景。** #20079（`~/.gemini/agents/` 中的符号链接未被加载）以及 #29323/#29324（嵌套 `.gitignore` 尾部斜杠锚定）反映出路径/忽略规则处理存在空白，跨平台环境下尤其容易咬人。
- **症状：智能体自我认知的缺口。** #21432（"智能体应能准确描述自己的 flags 和快捷键"）和 #22598（子智能体轨迹不透明）表明，开发者希望智能体成为更可信的引导者与更易调试的协作者。

> **说明：** 本次快照未提供 GitHub Discussions 数据，因此"热门讨论"一节被有意省略。

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI 社区摘要 — 2026-09-15

## 今日要点

CLI 发布了 **v1.0.84-6**，新增 `/config` 侧边栏配置界面，以及 `/sandbox` 按主机粒度的网络允许/拒绝规则（并保留用户已配置的上游代理）。issue 队列中，横跨 Deepseek、Grok 4.5 和 Gemini Flash 的 **BYOK 回归**问题占据主导，同时还有一批**插件/市场与企业 agent**相关的 bug 阻碍受管部署。一个长期痛点——Windows 上每执行一条 shell 命令都会弹出可见的 PowerShell 窗口——至今仍未解决，社区压力正在不断积聚。

---

## 版本发布

### [v1.0.84-6](https://github.com/github/copilot-cli/releases/tag/v1.0.84-6)

**新增**
- `/config` —— 在 CLI 内直接打开侧边栏配置界面。
- `/sandbox` —— 网络主机允许/拒绝规则不再覆盖用户配置的上游代理。

**改进**
- 受管的 `Edit` 和 `Write` 规则现在也会应用于可识别的原生 shell 重定向（例如 `>`、`>>`、`2>&1`）以及受支持的 `sed -i` 原地编辑操作。

---

## 热门 issue

1. **[#4505 — Resumed session retains stale connection item IDs](https://github.com/github/copilot-cli/issues/4505)** *(Adamkadaban, 👍 3, 💬 4)*
   `/resume` 之后每条提示词都以 `400 input item ID does not belong to this connection` 报错失败；即使 `/fork` 也无法挽救会话。高互动量使其成为本周期受关注度最高的可靠性 bug。

2. **[#3572 — Org-level custom agents invisible outside GitHub-hosted repos](https://github.com/github/copilot-cli/issues/3572)** *(cmpl-giedriusk, 👍 3, 💬 2)*
   来自组织 `.github-private` 仓库的自定义 agent 只有在 CWD 包含指向该组织的 git remote 时才会出现——这对在本地或非 GitHub 仓库中工作的企业用户是一大阻碍。

3. **[#4556 — `extraKnownMarketplaces` fetched but never registered](https://github.com/github/copilot-cli/issues/4556)** *(loganvolkers, 👍 2, 💬 2)*
   服务器管理的市场条目虽能成功解析，却从未进入插件代码路径，在企业安装环境中静默破坏了由策略驱动的扩展目录。

4. **[#4549 — PowerShell console window flashes on every shell command (Windows)](https://github.com/github/copilot-cli/issues/4549)** *(siramk2022, 👍 1, 💬 2)*
   在 Windows 上，每个子进程都会闪现 `conhost`，agent 运行期间反复抢占焦点。这是一条长期存在的 UX 投诉，切实损害着 Windows 开发者体验。

5. **[#4841 — Custom agent plan-mode leaves Plan panel blank](https://github.com/github/copilot-cli/issues/4841)** *(dylanwhite-velocity, 👍 0, 💬 1)*
   当用户选择的自定义 agent（`disable-model-invocation: true`、`infer: false`）调用 `exit_plan_mode` 时，面板只渲染出操作气泡而没有计划文本——这是新版 agentic UX 上的一次严重回归。

6. **[#4837 — Policy-driven `enabledPlugins` installs but persists `enabled: false`](https://github.com/github/copilot-cli/issues/4837)** *(jozsurf, 👍 0, 💬 1)*
   通过 MDM/设备级和仓库级策略启用插件后，磁盘上的插件仍处于禁用状态；技能始终无法激活，状态也不会自行纠正。该问题在 1.0.83 上可复现，威胁到受管部署的推进。

7. **[#4840 — BYOK broken with Deepseek](https://github.com/github/copilot-cli/issues/4840)** *(Bude2408, 👍 0)*
   通过 BYOK 面向 Deepseek 选择 GPT5.4 时返回 `400 Failed to deserialize the JSON body… unknownvariant 'custom', expected 'function'`。这是不断增多的 BYOK 提供商回归问题中的又一例。

8. **[#4836 — Grok 4.5: 351 tools fail with opaque HTTP 400](https://github.com/github/copilot-cli/issues/4836)** *(kondv, 👍 0)*
   当工具数量超过 Grok 4.5 宣称的 ~350 个上限时，得到的是一个毫无提示的 400，而不是清晰的模型侧限制报错，用户因此无从知晓真正的原因。

9. **[#4835 — Gemini Flash: a single MCP enum-on-array breaks every prompt](https://github.com/github/copilot-cli/issues/4835)** *(kondv, 👍 0)*
   只要有一个 MCP 工具在数组属性上直接使用 `integer enum`，就会静默导致整批请求失效——这是工具 schema 校验中的一个脆弱点，BYOK 用户首当其冲。

10. **[#4838 — `skill` tool intermittently fails in headless `-p` mode](https://github.com/github/copilot-cli/issues/4838)** *(armannjo, 👍 0)*
    尽管同一技能已列在请求的 `<available_skills>` 块中，headless 模式偶尔仍会报告“No model-invocable skills available”。这会破坏依赖稳定技能解析的 CI/自动化流程。

> 另外值得注意的是：[#1029 — Reject/feedback should trigger replanning for *all* tool calls](https://github.com/github/copilot-cli/issues/1029) 已被**关闭**且未合并——这是一项长期存在的工作流改进请求，社区很可能会将其重新打开。

---

## 关键 PR 进展

过去 24 小时内没有任何 PR 更新。`github/copilot-cli` 今天的活动都集中在 issue 跟踪器上；预计等 BYOK 和插件/市场回归问题完成分诊后，PR 方面才会有后续动作。

---

## 功能请求趋势

- **现代 MCP 协议支持** —— [#4834](https://github.com/github/copilot-cli/issues/4834) 呼吁支持 2026-07-28 的 Multi Round-Trip Requests（`input_required`）协议，让服务器在 URL elicitation 时不再依赖旧版回退机制。
- **细粒度 UI 控制** —— [#4839](https://github.com/github/copilot-cli/issues/4839) 请求增加一个可禁用任务栏图标的开关，理由是多会话工作流带来的任务栏杂乱。
- **更智能的 Plan 模式重规划** —— [#1029](https://github.com/github/copilot-cli/issues/1029)（已关闭）显示出持续的需求：对某个工具调用的反馈应作为重规划触发器传播到整批调用，而不仅限于被拒绝的那一个。
- **BYOK 提供商的工具数量预检** —— 在 #4836（Grok）及相关报告中反复出现：用户希望 CLI 能在上游返回不透明的 400 *之前*就把提供商的工具数量上限暴露出来。
- **更严密的企业策略挂钩** —— 围绕 #4556、#4837 和 #3572 的一组问题指向同一个统一诉求：为服务器和 MDM 驱动的配置提供一等公民支持，并*真正生效*、不发生静默失效。

---

## 开发者痛点

- **BYOK 提供商回归是今天的头号主题。** Deepseek（#4840）、Grok 4.5（#4836）和 Gemini Flash（#4835）出于各自不同的原因（自定义工具变体、工具数量上限、MCP enum 形状）都表现为不透明的 HTTP 400，让 BYOK 用户几乎得不到可操作的反馈。
- **Windows 使用体验持续落后。** 可见的 `conhost` 问题（#4549）是呼声最高的单项投诉，而且它还会放大 agent 运行的其他所有命令的痛感。
- **会话持久化十分脆弱。** 会话恢复后丢失 connection-item ID（#4505）意味着一次崩溃或中断的响应就可能让整个会话报废，`/fork` 之后也不例外。
- **企业/市场的底层管道正在漏水。** 插件安装了却保持禁用（#4837），受管市场始终不注册（#4556），组织级 agent 只在特定工作目录出现（#3572）——三条不同的路径，暴露的却是同一套底层策略/状态缺陷。
- **Headless 自动化很脆弱。** headless `-p` 模式会间歇性失去对技能的访问（#4838），Plan 模式对自定义 agent 渲染为空白（#4841），导致脚本化/agentic CI 工作流不可靠。
- **自定义 agent 的编写 UX 重视不足。** 空白的 Plan 面板（#4841）以及“反馈传播触发重规划”原语的缺失（#1029），都指向同一道鸿沟——“agent 能跑起来”与“agent 能正确重新规划”之间的差距。

---

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode 社区摘要 — 2026-09-15

## 1. 今日要点

OpenCode 社区因**旧版桌面布局被迫下线**（停用日期 2026-09-14）而闹得沸沸扬扬：近十位重度用户在多个 issue 中要求将持久化左侧边栏作为可选项恢复，尤其因为新版 V2 布局缺失多 worktree 支持。更糟糕的是，**v1.18.30 中普遍出现的 `TypeError: undefined is not an object (evaluating 'a.name')` 回归**，通过 `SystemPrompt.environment` 让每一次对话请求都崩溃，受影响的用户只能暂时回退到 1.18.20。

## 2. 版本发布

_过去 24 小时内无新版本发布。_

## 3. 热门 Issue

1. **[#48811](https://github.com/anomalyco/opencode/issues/48811)** — *macOS: every prompt fails with "undefined is not an object (evaluating 'a.name')"*（24 👍，5 条评论）。当日的最高赞 bug；v1.18.30 的回归在 macOS 上完全可复现，所有 prompt 均无法执行。
2. **[#48882](https://github.com/anomalyco/opencode/issues/48882)** — *[FEATURE] Restore the legacy UI with the persistent left sidebar as an option*（14 👍，13 条评论）。关于 V2 布局上线的头号投诉，13 位活跃评论者正在互相分享工作流截图。
3. **[#45278](https://github.com/anomalyco/opencode/issues/45278)** — *Payment Declined After 3 Months Despite No Issue With Card or Bank*（17 条评论，5 👍）。长期的订阅扣费失败问题，至今未有解决方案；评论数远高于点赞数，暗示官方支持流程令人不满。
4. **[#48837](https://github.com/anomalyco/opencode/issues/48837)** — *[UI feedback] Forced V2 interface destroys productivity for multi-project/multi-agent workflows (20+ sessions)*（11 👍）。来自一位同时管理 20+ 会话的重度用户，详细描述了对工作流的影响。
5. **[#48645](https://github.com/anomalyco/opencode/issues/48645)** — *Regression in 1.18.30: every prompt crashes with TypeError in SystemPrompt.environment ("a.name")*（10 👍）。确认了从 1.18.20 升级到 1.18.30 后的破坏；帖子里甚至记录了一次成功的 A/B 回退。
6. **[#48835](https://github.com/anomalyco/opencode/issues/48835)** — *[UI/UX] Old layout removed but new layout does not support multiple worktrees*（9 👍）。针对"仅保留 V2 布局"这一决策的最有力技术论据。
7. **[#48958](https://github.com/anomalyco/opencode/issues/48958)** — *New layout makes the UI unusable*（7 👍）。简洁有力的用户证言：这次重设计破坏了最基本的项目切换功能。
8. **[#41696](https://github.com/anomalyco/opencode/issues/41696)** — *[2.0] opencode2 became stuck starting its managed background server*（6 条评论）。2.0 的遗留阻塞问题，`serve --service` 会静默失败。
9. **[#49008](https://github.com/anomalyco/opencode/issues/49008)** — *OpenCode infinitely spams messages in a loop and responds to its' messages*（4 条评论）。由自定义 GLM-5.3-Flash 提供方触发的循环 bug——对任何通过第三方网关路由的用户都值得关注。
10. **[#48964](https://github.com/anomalyco/opencode/issues/48964)** — *Request fails with reasoning `encrypted_content` was not issued to this caller*（3 条评论，已关闭）。一波相同的"第二次请求失败"报告——与 Zen 上 Anthropic 风格的推理缓存相关。

## 4. 重点 PR 进展

1. **[#49015](https://github.com/anomalyco/opencode/pull/49015)** — *test(app): retire legacy layout e2e coverage*（开放中）。通过移除旧版路由测试来巩固"V2 唯一"的未来，正式确立 2026-09-14 的停用安排。
2. **[#49012](https://github.com/anomalyco/opencode/pull/49012)** — *fix/windows powershell utf8*（开放中）。解决 Windows PowerShell 终端中的中文字符乱码问题（关闭 #30205、#30055）——对 Windows 上的非 ASCII 用户非常重要。
3. **[#49010](https://github.com/anomalyco/opencode/pull/49010)** — *fix(core): normalise absolute plugin paths before dedupe*（开放中）。修复绝对路径 `C:/Users/...` 下插件去重失败的问题（关闭 #48706）。
4. **[#48941](https://github.com/anomalyco/opencode/pull/48941)** — *feat(codemode): expose host classes and functions through extensions*（开放中）。一项重要的 codemode 能力：程序现在可以跨越值拷贝边界，调用真正的宿主机端类与函数。
5. **[#48901](https://github.com/anomalyco/opencode/pull/48901)** — *refactor(core): split provider and model registries*（已关闭）。由 `thdxr` 提交的内部重构，将 `Catalog` 拆分为 `Provider` 和 `Model`，减少各 location 下模型目录的重复。
6. **[#48731](https://github.com/anomalyco/opencode/pull/48731)** — *[contributor] feat/tui i18n*（开放中）。TUI 国际化基础工作。
7. **[#48638](https://github.com/anomalyco/opencode/pull/48638)** — *fix(core): eliminate durable event write amplification from turn diffs*（开放中）。避免每条用户消息的 `summary.diffs` 都重新 fork 出完整的 git patch（关闭 #48641）——长会话场景下的大幅性能提升。
8. **[#48551](https://github.com/anomalyco/opencode/pull/48551)** — *[contributor] feat(tui): label mention autocomplete options*（开放中）。为 TUI 自动补全的 Skill/Agent/File/Dir/Reference 添加带主题配色的标签。
9. **[#47595](https://github.com/anomalyco/opencode/pull/47595)** — *[contributor] feat: add skill activation settings*（开放中）。在 TUI 和桌面/Web 设置中提供持久化的、服务端范围的技能启用/禁用开关（关联 #43536）。
10. **[#42735](https://github.com/anomalyco/opencode/pull/42735)** — *fix(core): replay thinking safely and drop unsettled tool calls from errored messages*（已关闭）。多轮 Anthropic 思维链 + 工具调用对话在中断/失败后不再崩溃（关闭 #38620）。
11. **[#45839](https://github.com/anomalyco/opencode/pull/45839)** — *fix(opencode): drop assistant turns without model-visible content from replay*（开放中）。避免严格模式的提供方（Moonshot、DeepSeek、Azure、litellm）因为空的 assistant turn 而拒绝重放请求。
12. **[#48998](https://github.com/anomalyco/opencode/pull/48998)** — *feat(tui): add last turn source to diff viewer*（开放中）。TUI diff 视图新增"Last turn"来源，由 `session.diff` 提供支持（#47821）——展示自上一次 prompt 以来发生变化的文件。

## 5. 热门讨论

_未提供讨论数据——本节略。_

## 6. 功能请求趋势

- **布局 / UI 逃生通道（呼声极高）：**将持久化左侧边栏作为可选项开关恢复，在桌面端和 Web 端同时暴露两套 UI，并重新引入多 worktree 支持。在 #48882、#48835、#48972、#48958、#48951、#48837、#48980 以及已关闭的 #38230 中被反复提出。
- **更好的会话/标签页交互：**切换标签页的快捷键（#37077）、会话标签页的拖拽排序（#48982），以及"Last turn" diff 视图（#48998）。
- **附件与输入辅助：**将大量粘贴文本转换为虚拟文件（#40312）；支持自定义输入框字体（#49003）。
- **吸顶式导航辅助：**为会话添加 Medium 风格的吸顶式目录（#48979）。
- **TUI 国际化与国际化感知的主题：**在 `opencode web` 中恢复主题命令（#48977）以及 TUI 国际化（#48731）。
- **提供方灵活性：**为自定义 OpenAI 兼容提供方提供动态模型发现（#42660，一并关闭了 6 个长期未决的 issue）。
- **技能/代理设置：**持久化的、服务端范围的技能激活设置（#47595）。

## 7. 开发者痛点

- **v1.18.30 致命回归：**`SystemPrompt.environment` 深处抛出 `TypeError`（"a.name"），导致许多用户每次 prompt 都失败（#48811、#48645、#48803、#48996）。临时解决方案是回退到 1.18.20。
- **强制 UI 重设计：**V2 布局成为唯一选项，移除了一直存在的开关（#38230），破坏了依赖持久化侧边栏、多 worktree 以及大量并发会话的工作流。
- **不透明的错误遮蔽：**提供方侧的 429 和 `encrypted_content` 错误被包装成笼统的 "Unexpected server error" / `TypeError`，掩盖了真实原因（#48988、#48964、#48989）。
- **后台服务可靠性：**托管服务可能静默挂起，或在端口已被占用时仅返回笼统的超时错误（#41696、#49009）。
- **`session.time_updated` 过期：**正在进行的流式会话会从最近活跃排序中掉队，因为 `time_updated` 只在一小部分被投影的事件上更新（#36893）。
- **自定义提供方循环 bug：**通过第三方网关路由（例如 llmapi.ai 上的 GLM-5.3-Flash）可能触发无限自回复循环（#49008）。
- **Windows 区域设置问题：**PowerShell UTF-8 乱码问题仍在影响非 ASCII 用户，目前才刚刚打上补丁（#49012）。
- **插件路径解析：**Windows 风格的绝对插件路径绕过了 `./` / `../` 解析器，导致重复注册（#49010）。

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi 社区日报 — 2026-09-15

## 今日要点

`earendil-works/pi` 的活动依然活跃，过去 24 小时内有 50 个 issue 和 30 个 PR 被触及，但没有新的 release 发布。维护者在 triage 后关闭了大量未分类的报告，而针对孤立 tool-call 块的修复（#9306）正在进行中，加上 Bedrock、Vercel AI Gateway、OpenAI-compatible 等提供方成本核算准确性的一波问题，构成了当天讨论的主线。值得关注的 PR 包括 Antigravity Gemini 提供方（#9594）和旨在缓解 Windows 冷启动问题的 Node 运行时打包重构（#8474）。

## 版本发布

过去 24 小时内无新版本发布。

## 热门 Issue

1. **[#9298](https://github.com/earendil-works/pi/issues/9298)** — *已关闭* — 通过 OpenAI-compatible Responses 客户端暴露的 Grok 403 错误，被 `openai-responses` 格式化器错误标记为 "OpenAI API error"，导致提供方额度/订阅错误难以归因。（7 条评论）
2. **[#9211](https://github.com/earendil-works/pi/issues/9211)** — *开放* — `compat.vercelGatewayRouting` 仅在 `openai-completions.js` 中生效，但所有内置的 `vercel-ai-gateway` 目录模型都使用 `anthropic-messages`，因此文档化的路由配置实际上形同虚设。（5 条评论）
3. **[#9306](https://github.com/earendil-works/pi/issues/9306)** — *开放 / 进行中* — 中止或出错的回合会留下未被匹配的流式 `toolCall` 块，导致下一次 `runAgentLoopContinue` 被提供方拒绝。对长时间 agent 运行的可靠性至关重要。（4 条评论）
4. **[#9129](https://github.com/earendil-works/pi/issues/9129)** — *开放* — 在 Windows 上，`killProcessTree` 通过 `taskkill /F /T` 在 MSYS2 bash 下会遗留下游管道进程，因为每个管道阶段都通过一个短暂的中间进程运行。（4 条评论）
5. **[#9457](https://github.com/earendil-works/pi/issues/9457)** — *开放* — `bedrock-converse-stream` 永远不会从 `cacheDetails` 设置 `cacheWrite1h`，因此 1 小时缓存写入按 5 分钟费率计费——这可是真金白银的 bug。（4 👍）
6. **[#9210](https://github.com/earendil-works/pi/issues/9211)** — *开放* — #9457 的孪生问题，影响 Vercel AI Gateway + Anthropic Messages 传输：1h 缓存写入计数被清零，用户只能以更便宜的 5m 费率承担费用。（3 条评论）
7. **[#9391](https://github.com/earendil-works/pi/issues/9391)** — *开放* — 手动压缩后，陈旧的签名 thinking 块在每个回合都会重放，Anthropic 以 `prefix_binding_mismatch` 拒绝它们，污染日志并浪费重试次数。（3 条评论，1 👍）
8. **[#9354](https://github.com/earendil-works/pi/issues/9354)** — *开放* — 带有无效 frontmatter 的提示模板会被静默丢弃，而 Skills 已经会发出警告——这种不一致让模板作者感到沮丧。（3 条评论）
9. **[#9444](https://github.com/earendil-works/pi/issues/9444)** — *开放* — `openai-completions.ts` 会从流式 `tool_calls` 中剥离 Gemini 的 `thoughtSignature`，当 Gemini 通过 OpenAI-compatible 网关提供时会破坏多轮工具使用。（2 条评论）
10. **[#9595](https://github.com/earendil-works/pi/issues/9595)** — *已关闭 / 未分类* — Agent 级别的重试忽略 HTTP 429 上的 `Retry-After`，在配额触发的几秒内就疯狂重击提供方，而不是等待其公布的间隔。
11. **[#9590](https://github.com/earendil-works/pi/issues/9590)** — *已关闭 / 未分类* — 恢复包含大量多 MB 图像工具结果的会话时，base64 会损坏（长度 ≡ 1 mod 4），且错误字节会留在上下文中，导致后续每个请求都失败。
12. **[#9455](https://github.com/earendil-works/pi/issues/9455)** — *开放* — 通过 Google GenAI 访问 `gemini-3.8-flash` 时，在禁用 thinking 的情况下传入 `thinkingLevel: "MINIMAL"` 会返回 400——默认值与阈值不匹配。

## 关键 PR 进展

1. **[#9594](https://github.com/earendil-works/pi/pull/9594)** — *已关闭* — 将 **Google Antigravity** 添加为 `pi-ai` 中的一等 OAuth 提供方，恢复了基于订阅的 Gemini 访问，改编自早期的上游工作（#9529）。
2. **[#8474](https://github.com/earendil-works/pi/pull/8474)** — *已关闭* — `pi-coding-agent` 现在捆绑 Node 运行时，显著减少了启动时的文件数量。主要针对 Windows Defender / 慢 IO 冷启动问题。
3. **[#9274](https://github.com/earendil-works/pi/pull/9274)** — *开放* — 修复了 edit 工具渲染器在插入文本到原本不变的内容之前时，丢失已删除行前导空白的问题——更正了误导性的 diff。
4. **[#9351](https://github.com/earendil-works/pi/pull/9351)** — *开放* — 通过将错误显示延迟到远程操作实际返回之后，消除了远程编辑工具行上恼人的红色 "Could not edit file" 闪烁。
5. **[#6534](https://github.com/earendil-works/pi/pull/6534)** — *开放* — 实验性地添加由 RFC 54 引用的 **developer message role**；为未来的 prompt 缓存和指令路由工作奠定基础。
6. **[#9548](https://github.com/earendil-works/pi/pull/9548)** — *开放* — 将对话中途的系统提示和工具集变更移入 **transcript 本身**，以便在恢复/分支时可以重放并保留已缓存的提示前缀。
7. **[#9581](https://github.com/earendil-works/pi/pull/9581)** — *已关闭* — 修复 #9354：带有格式错误 YAML frontmatter 的提示模板现在通过与提示冲突相同的诊断路径产生启动警告。
8. **[#9570](https://github.com/earendil-works/pi/pull/9570)** — *开放* — 将 Gemini 新的 `TOO_MANY_TOOL_CALLS` `FinishReason` 映射到错误停止原因，而不是抛出 `Unhandled stop reason`。
9. **[#9569](https://github.com/earendil-works/pi/pull/9569)** — *开放* — `validateToolArguments` 现在可以为以 JSON 编码字符串形式传递的 `object`/`array` 参数恢复工具参数，修复那些双重编码的模型。
10. **[#9329](https://github.com/earendil-works/pi/pull/9329)** — *开放* — 将 `TERM_PROGRAM=Orca` 视为支持 Kitty 图像协议，这样图像组件可以在 Orca 终端中内联渲染，而不是降级为文本。
11. **[#9441](https://github.com/earendil-works/pi/pull/9441)** — *开放* — 阻止 APC 光标标记在选择切片和渲染过程之间泄漏——修复全屏 TUI 中的游离标记。
12. **[#9501](https://github.com/earendil-works/pi/pull/9501)** — *开放* — 统一并文档化 `pi` 在 Windows 上定位 shell 二进制文件（pwsh、cmd、bash）的方式，使非默认目录中的安装能够被正确发现。

## 热门讨论

**Show and tell**
- **[#1558](https://github.com/earendil-works/pi/discussions/1558)** — *netandreus* 宣布 **[Pi Cursor Provider](https://www.npmjs.com/package/@netandreus/pi-cursor-provider)**，一个已发布到 npm 的扩展，让 Pi Coding Agent 可以驱动 CursorAI 的 CLI。作者请求将其与 Claude Code 和 OpenAI Codex 提供方并列收录。（9 👍，3 条评论）

## 功能请求趋势

- **每个提供方支持多账号 OAuth** 是 #1391 和 #7814 中反复出现的需求——拥有多个 ChatGPT Plus / Claude / Copilot 订阅的用户希望使用有标签的凭证，而不是重复的提供方扩展。
- **更广泛、更准确的提供方覆盖**：Antigravity（#9594 PR）、Wallaby/Kimi K3（#9597）、`opencode-go` session affinity（#9437）以及 GitHub Copilot SDK tokens（#9454）都希望获得一等支持。
- **更强的诊断能力**：格式错误的 skill *和* prompt-template frontmatter 的对等警告（#9354 → #9581）、识别更多可重试的网络错误（#9585）以及遵守 `Retry-After`（#9595）。
- **UI/样式调节**：可配置的 tool-call 边框（#9598）和 TUI 的 `wheelScrollLines`（#9447）指向一个更可由用户调节的视觉层。
- **扩展 API 的成熟**：原子化中断 + 无损消息传递（#9578）、仅追加的会话系统提示贡献（#9434 → PR）以及工具侧的回合终止（#7824）表明扩展作者希望拥有一等原语，而不是原型式的补丁。
- **可感知 transcript 的上下文**：在 transcript 中记录对话中途的系统提示和工具变更（#9548 PR）以及更干净的压缩重放（#9391）表明了在向一等、可重放的会话历史方向上的更广泛推进。

## 开发者痛点

- **成本核算漂移**：至少三个适配器中缓存写入 TTL 处理不当（Bedrock #9457、Vercel AI Gateway/Anthropic #9210，再加上特定提供方的定价），导致账单悄无声息地膨胀。
- **Windows 敌意**：bash 超时会遗留子进程（#9129）、shell 发现不一致（#9501 PR）、Windows Store shim 误检（#9504 PR）以及 Node 运行时冷启动被防病毒扫描拖慢（#8474 PR）。
- **macOS 沙盒意外**：本地网络隐私门控附加到 `pi` 进程上，即使相同的二进制在外部工作正常，也会阻止 LAN 工具调用（#9453）。
- **恢复/扩展性隐患**：恢复时损坏的 base64 图像（#9590）、即使使用 `-ne` 时 4K+ transcript 也有 16 秒启动时间（#9440），以及并发的 `pi -c` 运行交错写入同一会话文件（#9596）都困扰着高级用户。
- **提供方可靠性怪癖**：Gemini 特有的签名剥离（#9444）、新的 Gemini 停止原因抛出（#9570 PR）、`fail to touch upstream` 未被归类为可重试（#9585）以及忽略 `Retry-After`（#9595）使得长时间的 agent 运行变得脆弱。
- **中断后的上下文卫生**：中止的回合留下未匹配的 tool 调用（#9306），以及压缩后陈旧的签名 thinking 块重放（#9391），迫使用户手动看护错误恢复。

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code 社区摘要 — 2026-09-15

## 今日要点
今日发布的 **v0.23.4** 与更新后的 `cua-driver-rs` 预构建产物（v0.20.8 / v0.20.7）一同发布，社区近期持续聚焦于**静默 TUI 崩溃（`Minified React error #185`）**——该问题在多个后台 agent 同时完成时触发。至少四个相关 issue（#11500、#11849、#11873、#11858）和两个 PR（#11835、#11817）正在围绕 Ink 中同一个 `useBoxMetrics` layout-listener 循环收敛。跨厂商模型兼容性也浮现为第二大痛点，#11590 记录了 Qwen Code 自动注入的 `metadata` 字段如何破坏经 DashScope OpenAI 兼容网关路由的第三方模型。

---

## 版本发布

### v0.23.4（stable）
最新稳定版。完整变更列表请参阅项目发布说明。本窗口内顺带更新的重要内容：
- **CUA Driver v0.20.8 与 v0.20.7** —— 预构建二进制收录于 `packages/cua-driver`：
  - **macOS**：已签名并公证的 universal binary + `QwenCuaDriver.app`
  - **Linux**：未签名的 x86_64 + arm64（glibc 2.31 起步）
  - **Windows**：未签名的 UIAccess worker + 原生 SDK 负载（x86_64 + arm64）

### v0.23.3-nightly.20260913.faa395885e
随 OpenTUI parity 收尾一同发布的 nightly 切片。要点：
- **`refactor(dingtalk)`** —— 移除过时的后台响应聚合逻辑（[#11570](https://github.com/QwenLM/qwen-code/pull/11570)）
- **`feat(channels)!` — BREAKING** —— 移除 channels 中可配置的消息前缀过滤。符合条件的消息现在遵循标准的 sender / group / mention / pairing 策略，不再依赖前缀。（[#11571](https://github.com/QwenLM/qwen-code/pull/11571)）

> **面向渠道集成方的待办事项**：若你此前依赖前缀过滤来路由消息，请重新审视你的消息处理假设。

---

## 热门 Issue

1. **#11500 — 后台 agent 完成时 TUI 以 React #185 静默退出** — *13 条评论，P1*
   当多个后台子代理在短时间内相继完成时，交互式 TUI 因未捕获的 "Maximum update depth exceeded" 而崩溃，用户被直接丢回裸 shell 提示符，无任何错误提示。该 issue 已成为多 PR 修复集群中的标杆条目。[链接](https://github.com/QwenLM/qwen-code/issues/11500)

2. **#11590 — 自动注入的 `metadata` 破坏 DashScope OpenAI 兼容端点上的非 Qwen 厂商模型** — *8 条评论，P1，已关闭*
   Qwen Code 会向每个请求注入顶层 `metadata` 对象，DashScope 的聚合网关将其原样转发到第三方后端（如 ZHIPU/GLM-5.3-Flash），而这些后端的 `metadata` 字段类型为 `string`，导致全部命中 `400` 错误，使这些模型完全不可用。[链接](https://github.com/QwenLM/qwen-code/issues/11590)

3. **#11834 — 简单问候场景下出现 `[API Error: 400 invalid params, function parameters is empty (2013)]`** — *6 条评论，P1*
   0.23.3 上的全新报告：一次简单的 "你好" 往返调用即触发函数参数反序列化错误，即便 `/update` 已确认二进制为最新。[链接](https://github.com/QwenLM/qwen-code/issues/11834)

4. **#11556 — vscode-ide-companion 0.23.1 在 Remote-SSH（arm64 服务端）下 webview 卡在加载态** — *6 条评论，P1*
   VSCode Client 1.133（linux-x64）通过 Remote-SSH 连接 linux-arm64 上的 VSCode Server 1.137 时，配套扩展的 webview 始终无法完成加载。[链接](https://github.com/QwenLM/qwen-code/issues/11556)

5. **#11849 — 0.23.3 上间歇性静默崩溃（疑似后台 shell / 子代理所致）** — *5 条评论，P1*
   作者显式交叉链接了 #11500；长会话后崩溃频率上升，resume 时无任何错误提示。[链接](https://github.com/QwenLM/qwen-code/issues/11849)

6. **#11777 — CI `Test` 任务在 workspace→scripts 交接点 SIGTERM，所有用例全部通过** — *5 条评论，P3，已关闭*
   外部 `SIGTERM` 在每个 vitest 套件都已通过后中止 `npm run test:ci`。对必需的 CI 关卡构成可靠性隐患。[链接](https://github.com/QwenLM/qwen-code/issues/11777)

7. **#11795 — 以 ACP 连接为键的权限队列无限阻塞所有守护进程会话** — *5 条评论，P1*
   一个挂有未应答权限提示的空闲会话，会阻塞守护进程上的*所有*其他会话。PR #11802（序列化作用域）已部分修复；剩余问题导致该 bug 仍未关闭。[链接](https://github.com/QwenLM/qwen-code/issues/11795)

8. **#11872 — Web Terminal 显示 `[Error: PTY not available]` —— `@lydell/node-pty` 已声明但未打包** — *3 条评论，P1*
   macOS 代码签名还会阻断本地安装的 prebuild，使运行时故障雪上加霜。跟进 PR #11881。[链接](https://github.com/QwenLM/qwen-code/issues/11872)

9. **#11851 — 安全问题：Bash allow 规则可通过 `\r/\v/\f/\u00a0` 词分隔符覆盖第二条命令** — *3 条评论，P1，安全*
   `isAsyncOperator` 使用 JS `\s` 进行反向扫描，因此一条看似只授权单条命令的 Bash allow 规则，实际上可以授权一条异步管道化的第二条命令。[链接](https://github.com/QwenLM/qwen-code/issues/11851)

10. **#11882 — Shell 注释语义：两个复合命令分割器的范围决策** — *2 条评论，P1，需讨论*
    #11821 在权限侧分割器中加入 `#` 注释处理后，同源的 `splitCompoundCommandSegments` 仍未引入 `#` 状态——两者对相同输入现已产生分歧。[链接](https://github.com/QwenLM/qwen-code/issues/11882)

---

## 关键 PR 进展

1. **#11844 — `feat(web-shell)`：活动指示条在 tab 间滑动**（[链接](https://github.com/QwenLM/qwen-code/pull/11844)）
   为侧边栏 tab 切换（Tasks/Channels、MCP/Plugins/Agents/Extensions、技能安装、设置）新增 200ms 的滑动指示条高亮——纯 UX 打磨，覆盖面广。

2. **#11835 — `fix(cli)`：使 Ink 的 `useBoxMetrics` 循环守卫与机器速度无关**（[链接](https://github.com/QwenLM/qwen-code/pull/11835)）
   将守卫由 16ms 墙钟时间补充改为按 commit 次数计数，定位 React #185 集群的根本原因。作为 R1-2 后续 #11858 进行评审。

3. **#11874 — `feat(cli)`：DashScope Batch API 任务的 `qwen batch` 命令**（[链接](https://github.com/QwenLM/qwen-code/pull/11874)）
   新增 `submit` / `status` / `fetch` / `cancel` 子命令；按实时价格的一半计费，并占用独立配额。凭证复用现有解析路径。

4. **#11881 — `fix(standalone)`：打包 `@lydell/node-pty` 预构建产物，使 Web Terminal 可用**（[链接](https://github.com/QwenLM/qwen-code/pull/11881)）
   standalone 归档在 `optionalDependencies` 中声明了六个 `@lydell/node-pty*` 包但均未实际打包。修复 #11872 的 standalone 路径。

5. **#11871 — `fix(core)`：裁剪 hook matcher 时保留被转义的尾部空白**（[链接](https://github.com/QwenLM/qwen-code/pull/11871)）
   解决形如 `\.env\ ` 的 matcher（以被转义的空格结尾）抛出 "invalid regex" 的问题；闭合 #11862 的根本原因。

6. **#11821 — `fix(core)`：在分割 shell 命令时将词首 `#` 视作注释**（[链接](https://github.com/QwenLM/qwen-code/pull/11821)）
   为 `splitCompoundCommandSegments` 新增 `comment` 状态，修复权限侧复合命令分割器（#11815）。后续范围决策在 #11882 跟进。

7. **#11856 — `feat(core)`：支持外部推理 profile 与默认值**（[链接](https://github.com/QwenLM/qwen-code/pull/11856)）
   消费者可通过 `modelProviders[].capabilities.reasoning` 覆写模型的推理 profile、支持的 effort 与默认值。已知内置端点接受部分默认值；新别名从十种既有 wiring 中择一使用。

8. **#11548 — `feat(web-shell)`：连接至指定远程守护进程**（[链接](https://github.com/QwenLM/qwen-code/pull/11548)）
   standalone Web Shell 现可通过连接门户或 Daemon Status 中输入的地址与可选 bearer token，定位至显式的远程守护进程。切换目标会启动全新的页面上下文。

9. **#11859 — `ci(pnpm)`：全面使用 pnpm 安装并下线 `package-lock.json`**（[链接](https://github.com/QwenLM/qwen-code/pull/11859)）
   收尾 #10444 的 Stage 2 与 Stage 3；CI 现可测试与发布版本一致的依赖图。

10. **#11658 — `fix(cli)`：将展开后的 OpenTUI 确认框留在视口内（#11654）**（[链接](https://github.com/QwenLM/qwen-code/pull/11658)）
   修复 parity 收尾以来一直飘红的 OpenTUI E2E CI 链路——hook 强制触发的确认框在 ctrl-s 展开后，长负载会溢出。

---

## 热门讨论
*本 feed 未提供 GitHub Discussions 数据。本节略去。*

---

## 功能请求趋势

- **多 agent / `serve` 守护进程成熟化** —— 由 `@wenshao` 发起的协同集群（#11866、#11867、#11868、#11869）正推动规范化的守护进程协议规范、bridge.ts 沿控制面 / harness 边界拆分、外置的事件 / journal 数据面，以及一份 Java 控制面纵向切片。
- **Web Shell 作为完整产品面** —— PWA 可安装 + Android 开发 shell（#11722）、远程守护进程连接（#11548）、脚注预览与逐轮来源（#11480）、tab 指示条动效（#11844），表明 Web Shell 正步入功能加速轨道。
- **成本与配额工程化** —— DashScope Batch API 的 `qwen batch`（#11874）与按会话的 `web_search` 上限（#11846）反映了用户对一等成本控制的需求。
- **更智能的 monorepo / worktree 工程体验** —— 基于依赖变更检测的条件式 `node_modules` 软链（#5790）与全 pnpm 的 CI（#11859），共同构成一波开发者体验浪潮。
- **可观测性深度** —— LLM span 上的上下文窗口使用细分（#10015）延续了可观测性的推进。

---

## 开发者痛点

- **长会话后台作业下 TUI 静默死亡** —— `useBoxMetrics` React #185 循环已形成一个四 issue / 两 PR 的集群（#11500、#11849、#11873、#11858 / #11835、#11817）。用户反馈进程无任何错误提示即终止，恢复时为冷启动，崩溃既难复现也难察觉。
- **自动注入的 `metadata` 引发的跨厂商模型破坏** —— 经 DashScope OpenAI 兼容网关提供的任何非 Qwen 模型均开箱不可用（#11590、#11571）。叠加全新安装上泛化的 `function parameters is empty (2013)` 错误（#11834）。
- **Hook 与 shell 解析的不一致** —— 含被转义尾部空白的 matcher 抛出含义不明的 "invalid regex" 错误（#11862 → #11871）；两个复合命令分割器对 `#` 注释存在分歧（#11815 → #11821 → #11882）；`isAsyncOperator` 允许 `\r/\v/\f/\u00a0` 作为词分隔符，削弱了 Bash allow 规则（#11851）。
- **Standalone 打包缺口** —— Web Terminal PTY 预构建产物已声明但未打包（#11872 → #11881）；macOS 代码签名阻断本地安装的回退二进制。
- **CI 不稳定** —— scripts 通道的测试在用例全绿时被 SIGTERM（#11777）；Windows + CI 负载下新循环守卫测试确定性失败（#11817、#11850）；全绿的 macOS E2E 分片异常终止（#11134）。
- **VSCode Remote-SSH 摩擦** —— 跨架构 Remote-SSH 下配套 webview 卡在加载态（#11556）；发布版本升级后 ECS runner 集群陈旧（#11633）。
- **守护进程会话公平性** —— 单个空闲会话未应答的权限提示，会静默且无限地阻塞所有其他 ACP 会话（#11795）。

</details>

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*