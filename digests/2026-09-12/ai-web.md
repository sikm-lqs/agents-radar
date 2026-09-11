# AI 官方内容追踪报告 2026-09-12

> 今日更新 | 新增内容: 13 篇 | 生成时间: 2026-09-11 23:30 UTC

数据来源:
- Anthropic: [anthropic.com](https://www.anthropic.com) — 新增 12 篇（sitemap 共 443 条）
- OpenAI: [openai.com](https://openai.com) — 新增 1 篇（sitemap 共 959 条）

---

# AI 官方内容追踪报告

**报告日期：** 2026-09-12 | **抓取窗口：** 2026-09-11
**来源：** anthropic.com（12 条） · openai.com（1 条，仅元数据）

---

## 1. 今日要点

Anthropic 今天集中浮现了一批 12 篇研究页面，但发布日期横跨 2024 年 4 月至 2026 年 8 月——这几乎可以确定是一次**研究中心的重组 / URL 迁移回填**，而非同日发布的 12 篇内容（详见第 2 节的完整性说明）。真正近期且具有战略意义的条目包括：**"Enabling independent research on how people use Claude"**（2026-08-26），通过注重隐私保护的 **Anthropic Insights** 工具向外部研究者开放真实使用数据；**"How Claude's values vary by model and language"**（2026-07-13），一套系统化的价值观测量框架；以及**经济指数 "Cadences" 报告**（2026-06-26），该报告对方法论进行了全面升级，以追踪 Claude Code 和 **Cowork** 上的智能体使用情况——由此可隐含确认：长时间运行的智能体会话已主导 Claude 的使用组合。OpenAI 仅贡献了一条仅有元数据的工程文章 "**Scaling Storage One Billion Users Part One**"，未抓取到正文。综合信号：Anthropic 正巩固其作为 AI 社会与经济测量议程设定者的地位，同时围绕其测量研究构建教育垂直板块（Claude Academy）。

---

## 2. Anthropic / Claude 内容要点

### ⚠️ 抓取完整性说明（请先阅读）
全部 12 条 Anthropic 条目都带有"Published/Updated: 2026-09-11"的时间戳，但其声明的原始发布日期范围为 **2024 年 4 月至 2026 年 8 月**。摘要中还出现了此前这些页面上并不常见的全新分类标题（"Societal Impacts"、"Economics"、"Interpretability"、"Alignment"）。结论：Anthropic 似乎对其**研究资源库进行了重组**，爬虫将迁移/重新打标的页面误识别为新内容。以下分析将其视为投资组合快照，而非同日发布事件。

### A. 经济学 —— Anthropic 经济指数系列（时间线追溯）

本次抓取中可见完整系列演进过程，记录了一个从以对话为中心分析演进到智能体工作负载追踪的测量项目：

| 日期 | 报告 | 关键里程碑 |
|---|---|---|
| 2025-02-10 | [Introducing the Anthropic Economic Index](https://www.anthropic.com/research/the-anthropic-economic-index) | 项目启动；开源数据集 |
| 2025-03-27 | [Insights from Claude 3.7 Sonnet](https://www.anthropic.com/research/anthropic-economic-index-insights-from-claude-sonnet-3-7) | 首次模型发布后的使用增量；自下而上的任务分类法 |
| 2025-04-28 | [AI's impact on software development](https://www.anthropic.com/research/impact-software-development) | Claude Code 与 Claude.ai 的自动化比例拆分 |
| 2025-09-15 | [AI's role in the US and global economy](https://www.anthropic.com/research/economic-index-geography) | 首次美国州级与国家级拆分 |
| 2026-01-15 | [New building blocks for AI use](https://www.anthropic.com/research/economic-index-primitives) | 引入"economic primitives" |
| 2026-06-26 | [Cadences report](https://www.anthropic.com/research/economic-index-june-2026-report) | 智能体时代的方法论重塑 + 首次调查数据 |

- **[Introducing the Anthropic Economic Index](https://www.anthropic.com/research/the-anthropic-economic-index)**（2025-02-10）—— 基础性发布，基于数百万条匿名化 Claude.ai 对话及**开源数据集**。核心发现：使用集中在软件开发与技术写作；约 36% 的职业在 ≥25% 的任务中存在 AI 使用；增强（57%）略胜自动化（43%）。商业意义：这是任何竞争对手都未以同等严谨度发布的第一方需求情报，且设计初衷是供政策制定者引用。

- **[Economic Index: Insights from Claude 3.7 Sonnet](https://www.anthropic.com/research/anthropic-economic-index-insights-from-claude-sonnet-3-7)**（2025-03-27）—— 首次将使用变化与特定模型发布挂钩的报告：3.7 发布后，编程 / 教育 / 科学 / 医疗健康占比上升，"extended thinking" 模式偏向技术职业。同时引入了任务级增强/自动化拆分（例如，文案撰写者的高协同迭代 vs. 译者的高度指令性行为）。

- **[Economic Index: AI's impact on software development](https://www.anthropic.com/research/impact-software-development)**（2025-04-28）—— 基于 50 万次编程交互的分析。突出数据：**Claude Code 对话被归类为自动化的占比达 79%，而 Claude.ai 上为 49%** —— 这是早期量化证据，表明智能体编程产品会改变增强/自动化平衡。对任何企业级劳动力规划模型都具有高度参考价值。

- **[Economic Index: Tracking AI's role in the US and global economy](https://www.anthropic.com/research/economic-index-geography)**（2025-09-15）—— 首次美国州级评估；州经济结构可预测人均使用量，且（出乎意料的是）使用率最高的州*并非*以编程为主。国际部分：巴西的翻译/语言学习使用约为全球平均的 6 倍；印度在 Web 应用构建方面表现突出。可作为国际化市场进入优先级排序的代理数据。

- **[Economic Index: New building blocks for AI use](https://www.anthropic.com/research/economic-index-primitives)**（2026-01-15）—— 引入五个**"economic primitives"**：任务复杂度、技能水平、目的（工作 / 教育 / 个人）、AI 自主性、成功度——由 Claude 对每个抽样对话进行分类得到。这是一次方法论升级，将该指数从描述性报告转变为可复用的测量框架，并被明确定位为经济影响的"领先指标"。

- **[Anthropic Economic Index report: Cadences](https://www.anthropic.com/research/economic-index-june-2026-report)**（2026-06-26）—— 战略信息量最高的一期。Anthropic 指出"随着 Claude Code 和 **Cowork** 的快速增长，Claude 的会话现在越来越由长时间运行的智能体任务构成"——对话记录"已无法完整捕捉"使用情况。变更包括：小时级采样、新的输出分类器，以及针对对话、Cowork 和 1P API 的分别拆解。同时首次发布 **Anthropic Economic Index Survey**（于 2026 年 4 月启动），收集关于工作者对 AI 认知的数据。**"Cowork" 在此作为一个被命名、被测量的产品形态出现**——这是一次低调但意义重大的产品确认。

### B. 社会影响与透明度（真正的新条目）

- **[Enabling independent research on how people use Claude](https://www.anthropic.com/research/enabling-independent-research)**（2026-08-26）—— Anthropic 通过 **Anthropic Insights**（其注重隐私保护的分析工具），试点向外部研究者开放对真实世界聚合使用数据的访问：三个研究小组自行设计研究，Anthropic 运行数据采集，研究小组独立分析。其措辞明显带有竞争意味：真实世界 AI 数据"集中在少数几家实验室手中"，无论是实验室自行发布的分析还是有偏差的公开数据集，都不足以支撑独立研究。随附的意向表达表格预示该计划将扩展。从战略上看，这既是对监管数据访问压力的先发制人，也将 Anthropic 定位为前沿实验室中的透明度引领者。

- **[How Claude's values vary by model and language](https://www.anthropic.com/research/claude-values-models-languages)**（2026-07-13）—— 70 万次对话价值观研究（识别出 3,000+ 种价值观）的后续工作，将这些价值观压缩为**对立轴**（例如情感温度 ↔ 严谨性），并衡量 Claude 在不同*模型*和*语言*下每条轴上的位置。从技术角度看，这使价值观可在大规模下被审计和比较——直接关系到 Constitutional AI 治理、本地化质量保证，以及任何要求跨市场行为一致性的合规体系。

### C. 教育垂直板块

- **[Education Report: How educators use Claude](https://www.anthropic.com/research/anthropic-education-report-how-educators-use-claude)**（2025-08-27）—— 基于约 7.4 万次高等教育对话的分析，并与 Northeastern University 建立合作。核心发现：教育者将行政"琐务"自动化，同时增强教学法；值得注意的是，他们正在**使用 Claude Artifacts 构建自定义工具**（化学模拟、评分量表、仪表板）。引用 Gallup 的每周节省 5.9 小时数据 —— 作为 EDU 销售动作的 ROI 锚点。

- **[Anthropic Education Report: The AI Fluency Index · Claude Academy](https://www.anthropic.com/research/AI-fluency-index)**（2026-02-23）—— 定义构成"AI 素养"的 **11 种可观察行为**，并在数千次对话中追踪它们；最常见的表现是增强型（AI 作为思考伙伴）。面包屑导航（"Academy / Tutorials"）显示该页面归属于 **Claude Academy**，一个教育门户 —— 表明 Anthropic 正在构建一个结构化的学习/赋能平台，而不仅仅是发布报告。

### D. 安全与可解释性（重新浮现的经典）

- **[Many-shot jailbreaking](https://www.anthropic.com/research/many-shot-jailbreaking)**（2024-04-02）—— 长上下文攻击的经典论文：攻击者通过在上下文窗口中塞入伪造的问答对话来侵蚀安全训练。Anthropic 在发布前向其他实验室进行了通报并推出了缓解措施 —— 树立了其协调披露姿态的标杆。该论文此时被重新浮现，正值长上下文军备竞赛持续升级。

- **[Mapping the mind of a large language model](https://www.anthropic.com/research/mapping-mind-language-model)**（2024-05-21）—— 在已部署的生产模型（Claude Sonnet）内部识别出数百万个概念级特征的可解释性里程碑成果，被定位为通向可验证安全的路径。该文章被显著地重新索引，强化了 Anthropic 将可解释性品牌作为持久差异化因素的形象。

---

## 3. OpenAI 内容要点

**⚠️ 数据局限：** 今日 OpenAI 抓取仅包含**一条元数据记录** —— 标题源自 URL slug，无文章正文。依照追踪协议，不提供内容摘要或解读；仅列出可验证的元数据。

- **[Scaling Storage One Billion Users Part One](https://openai.com/index/scaling-storage-one-billion-users-part-one/)** —— 分类：index | Published/Updated: 2026-09-11。客观元数据说明：URL slug 字面上包含 "scaling"、"storage"、"one-billion-users" 和 "part-one" 这些字符串；"Part One" 的命名表明这是 OpenAI 官方 index 上关于该主题的多部分系列的首篇。**未抓取到文章正文，因此无法基于今日数据对其范围、声明或技术内容进行实质性分析。** 建议重新抓取以获取全文后再下结论。

---

## 4. 战略信号分析

**Anthropic 的优先事项（高置信度、多信号交叉验证）：**
1. **测量既是护城河，也是政策工具。** 经济指数现已是一个包含六期、经过多次方法论迭代的项目，配有开源数据集、明确的"primitives"、小时级粒度以及新增的调查分支。没有任何竞争对手发布过可媲美的一手经济影响数据；这使关于 AI 与劳动力关系的政策讨论按 Anthropic 的设定进行。
2. **透明度持续升级。** Anthropic Insights 外部研究者试点（2026-08）从"我们发布自己的分析"推进到"你们在我们的数据上运行自己的分析" —— 这是对前沿实验室封闭数据批评的直接回应，也是对强制性数据访问监管的对冲。
3. **智能体产品化由遥测数据确认。** Cadences 方法论重写的存在本身，正因为 Claude Code 和 Cowork 会话已主导使用模式。测量基础设施跟随产品形态演进，是营收与用户参与度实际分布的有力间接证据。
4. **教育垂直板块的建设。** Claude Academy + 素养指标 + 教育者报告构成一套连贯的 EDU 战略：定义技能标准、对其进行衡量、再教会用户 —— 经典的供给侧锁定策略。
5. **安全/可解释性连续性。** 重新索引 2024 年的越狱与可解释性里程碑，使这些差异化要素在更新后的分类体系中持续可见。

**OpenAI（低置信度，数据受限）：** 仅凭一条仅有元数据的工程文章，今日无法评估 OpenAI 的研究、发布或安全节奏。唯一站得住脚的观察：该文章日期与 Anthropic 那批内容相同，且其系列格式（"Part One"）暗示后续篇目的存在。任何关于基础设施规模或用户指标的推断，都将仅仅基于标题字符串的推测，本报告明确避免此类推断。

**议程设定 vs. 跟随：** 在 *AI 使用的量化社会/经济影响* 这一具体领域，Anthropic 毫无疑问是议程设定者 —— 它创造了一个被政策制定者、经济学家和企业引用的类别（经济指数），并通过外部研究者访问持续扩大领先优势。OpenAI 在本次抓取中未出现在可比类别下，可能仅反映数据缺口，而非内容缺失。

**对开发者与企业的影响：**
- **Claude Code 79% 的自动化率**与向智能体会话的转变，应促使任何企业重新校准其假设：AI 编程辅助并非主要是增强性的 —— 基于智能体的工作流表现得更像是委派，而非结对编程。
- Cadences 中的 **1P API 单独拆解**，为 B2B 采购方提供了更清晰的业务 vs. 消费者使用模式数据，便于采购规划。
- **按语言划分的价值观研究**对多语言部署至关重要 —— 在这些场景中，跨市场模型行为的一致性是合规要求。
- **外部研究计划**大概率会产出关于 Claude 真实世界效用的第三方验证（或批评）—— 值得作为采购证据加以关注。

---

## 5. 值得关注的细节

**本次抓取中首次出现的新术语/专有名词：**
| 术语 | 上下文 | 信号强度 |
|---|---|---|
| **Anthropic Insights** | 注重隐私保护的外部分析工具 | 高 —— 全新透明度项目 |
| **Cowork** | 被命名的智能体产品形态，与 Claude Code 一同被测量 | 高 —— 产品确认埋藏于研究报告之中 |
| **Claude Academy** | Fluency Index 上的面包屑（"Academy / Tutorials"） | 中 —— 教育门户/垂直板块 |
| **Economic primitives** | 5 个基础指标（复杂度、技能、目的、自主性、成功度） | 中 —— 框架 IP |
| **AI Fluency Index** | 用户技能的 11 项行为分类法 | 中 —— 教育领域的标准设定 |
| **Economic Index Survey** | 2026 年 4 月启动，首次结果见 Cadences | 中 —— 感知数据扩展 |
| **"Cadences"** | 小时节奏使用分析 | 低 —— 新的分析视角 |

**措辞与时机中隐藏的信号：**
- 该批内容的分类重打标（"Societal Impacts"、"Economics"、"Interpretability"、"Alignment"）表明 Anthropic 研究中心进行了**一次深思熟虑的分类法刷新** —— 这类重组通常预示着重大站点/产品节点；值得关注后续变化。
- "Chat transcripts no longer fully capture how people are using AI"（Cadences）是异常坦率的承认 —— Anthropic 自己的旗舰测量必须为智能体时代重建。
- 独立研究文章中提到数据"is concentrated in a handful of labs" —— 这是对 OpenAI 与 Google 的一次**几乎不加掩饰的竞争性暗讽**，将封闭数据做法框定为集体行动问题。
- 价值观研究明确锚定到"Claude's constitution" —— 2026 年的输出中延续了 Constitutional AI 的品牌叙事。
- 重新浮现 2024 年的 many-shot jailbreaking 论文，恰逢全行业的长上下文竞赛 —— 这是对"context 长度营销伴随安全成本"的一次微妙提醒。
- OpenAI 同日发布基础设施系列文章（"Part One"），暗示一种面向技术受众的工程博客节奏；预计 Part Two 将在数天至数周内跟进 —— 但这仅为格式推断，而非内容推断。

**建议关注项：**（1）重新抓取 OpenAI，以获取存储文章全文及其续篇；（2）监控 anthropic.com/research 的进一步分类变化，以捕捉研究中心重启信号；（3）追踪 Anthropic Insights 的意向表达流程，关注具名的外部研究合作伙伴；（4）留意 Cowork 是否出现在官方产品页面中，从研究报告提及升级为正式营销产品。

---

*本报告基于截至 2026-09-12 的抓取元数据与摘要生成。OpenAI 部分受限于仅有元数据；所有 OpenAI 内容结论均推迟至全文抓取后再行处理。*

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*