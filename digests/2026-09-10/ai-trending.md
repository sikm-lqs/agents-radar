# AI 开源趋势日报 2026-09-10

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-10 11:30 UTC

---

# AI 开源趋势报告 — 2026-09-10

*筛选说明：以下仓库因非 AI 主题已排除 —— `system-design-notes`、`armorpaint`（传统图形）、`gods-eye-view`（地理空间可视化）、`JavaGuide`、`cs-video-courses`（通用面试/课程清单）。保留 78 个 AI 相关项目。*

---

## 1. 今日要点

**智能体"技能(skills)"层迎来爆发日**：`ayghri/i-have-adhd`（+4,650）作为一款强制编码智能体直接呈现答案的单一用途技能，成为今日 AI 涨幅冠军；与此同时 `cathrynlavery/diagram-design`（+2,249）、`obra/superpowers`（+688）和 `vercel-labs/skills`（+125）共同印证 skills 是当前增速最快的类别。**Token 经济正成熟为基础设施层**，多提供商网关 `OmniRoute`（+591，覆盖 352 家提供商 / 1,200+ 模型）与 `rtk`（79.7k ⭐）等压缩代理一同走红。**本地前沿推理**方面，`colibri` 这一纯 C、零依赖的 MoE 引擎与负责硬件-模型匹配的 `llmfit` 携手推进。今日机构玩家也进入了 CLI 智能体赛道 —— **腾讯的 `teamai-cli`**（+556）和清华的 **`OpenMAIC`** 多智能体课堂（+806）—— 而历史总榜由智能体编排平台领跑（`ECC` 255.5k、`hermes-agent` 244k）。

---

## 2. 各分类热门项目

### 🔧 AI 基础设施

| 项目 | 语言 | Stars（总计 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,555 | Kimi-K2.6、GLM-5.2、DeepSeek、gpt-oss、Qwen 等模型的本地运行时。本地推理浪潮的基石，今日的 `colibri` 和 `llmfit` 是其延伸。 |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,115 | 桌面端一体化管理器，支持 Claude Code、Codex、OpenCode、Grok Build 与 Hermes Agent。其 132k stars 量化出如今开发者同时驾驭多个编码智能体的规模。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,773 | 单二进制 CLI 代理，可在常见开发命令上削减 60–90% LLM token 消耗。Token 经济栈的旗舰项目，今日基础设施领域的主导力量。 |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 63,794 (+591) | MIT 许可的网关，统一 352 家提供商（150+ 免费）与 1,200+ 模型于单一端点，具备配额感知回退和 15–95% token 压缩能力。今日双榜均上榜，由 550+ 贡献者共建。 |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | TypeScript | (+556) | 腾讯推出的"让每个团队原生 AI 化"CLI。大型企业为团队级智能体 CLI 形态背书，是今日最具战略意义的基础设施信号。 |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | (+417) | 本地优先的 AI 编码智能体桌面应用（Electron + Rust 宿主 + 插件编排）。代表 CLI 编码智能体向可安装桌面形态的迁移。 |
| [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) | Rust | (+247) | 一条命令即可找出你的硬件真正能跑的几百个模型中的哪一个。与 colibri 和 ollama 一同构成"本地优先"集群。 |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | (+157) | 纯 C、零依赖的引擎，从磁盘流式加载 MoE 专家，让前沿模型跑在你自己的硬件上。是重型运行时的极简主义对立面。 |

### 🤖 AI 智能体 / 工作流

| 项目 | 语言 | Stars（总计 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,532 | 智能体编排性能系统：覆盖 Claude Code、Codex、Cursor 等的技能、本能、记忆、安全。数据集中 star 最高的仓库 —— 编排优化已成为独立学科。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,054 | "与你共同成长的智能体" —— 一个积累记忆并自我进化的个人智能体。来自顶级开源模型实验室的大规模采用。 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,913 | 公平代码的工作流自动化，原生 AI 能力 + 400+ 集成。生产级智能体自动化的事实骨干。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,317 | 智能体工作流与 RAG 管道的协作工作区，支持云端到自托管。仍是企业级"智能体应用平台"的默认选择。 |
| [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | Python | 46,228 | 本地化、面向智能体的控制平面，覆盖 2,115+ 技能，提供 CLI、MCP 服务器与 Workbench。技能经济的基础目录设施。 |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | (+688) | 智能体技能框架与软件开发方法论。现已是该领域的权威参考（其 README 声称 250k+ ⭐；仅中文分支就有 8,049）。 |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | (+4,650) | 阻止编码智能体把答案埋在输出深处的技能 —— 面向 ADHD 友好的呈现。今日 AI 涨幅第一，证明单一用途技能可在一日内超越框架。 |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | TypeScript | (+125) | Vercel 的 `npx skills` 开源智能体技能工具。主流平台供应商正进入技能标准化领域。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总计 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | (+2,249) | 38 种编辑级图表类型，以自包含 HTML/SVG 形式服务于 Claude Code、Codex 与 Pi —— "告别 Mermaid 的糊弄。"今日 AI 涨幅第二；高质量输出资源已自成品类。 |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | (+806) | 清华开源的多智能体互动课堂 —— 一键开启沉浸式多智能体学习。多智能体编排被垂直化落地于教育场景。 |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | (+705) | 530+ 案例、20+ 行业模板与可复用技能，针对 GPT Image 2/2.5，并设有同 prompt 的 2.5 对比区。OpenAI 图像模型发布的直接余波。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,106 | 根据主题或关键词一键生成高清短视频。LLM+工作流自动化在消费级规模上的长期验证案例。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,907 | 本地化 AI 求职：扫描招聘门户、A–H 评分与 1–5 全球评级、定制简历、追踪申请。运行在现有编码 CLI 内 —— 务实的垂直智能体。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,877 | 由 LLM 驱动的多市场股票分析，涵盖新闻、仪表盘与零成本定时运行。与今日走红的 CloddsBot 一同为金融智能体集群的支柱。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,478 | 将文档或主题转为原生 PowerPoint 演示稿，含真实图形、过渡、图表与旁白。文档到成品的转换仍是经久不衰的 AI 应用模式。 |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | (+299) | 跨 1,000+ 市场（Polymarket、Kalshi、Binance、Solana DEX）的自主交易智能体，提供智能体间支付协议，基于 Claude 构建。智能体已开始在你熟睡时动用真金白银。 |

### 🧠 大模型 / 训练

| 项目 | 语言 | Stars（总计 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,071 | 文本、视觉、音频与多模态 SOTA 的模型定义框架，训练与推理通吃。生态基石。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,975 | 本地化 UI，用于运行与训练大模型与扩散模型（GGUF、MLX、Qwen3.8、DeepSeek-V4、Gemma 4）。消费级 GPU 微调已完全主流化。 |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,232 | 开源金融大模型，已在 HuggingFace 上发布训练权重。与今日的交易智能体热潮直接呼应。 |
| [wandb/wandb](https://github.com/wandb/wandb) | Python | 11,247 | 从微调到生产模型管理的实验追踪。训练栈的标准仪器化工具。 |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,711 | Agent Reinforcement Trainer：基于 GRPO 的多步智能体训练，面向真实任务（"在职训练"）。最明确的信号：智能体 RL 即将成为微调的下一个前沿。 |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,990 | 可扩展的智能体 RL 框架（PPO、DAPO、REINFORCE++、VLM），基于 vLLM + Ray。ART 智能体优先路线的生产级对应物。 |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,749 | "面向 LLM 智能体应用的 RL 桥梁。"第三个数据点，确认 RL-for-agents 是新兴栈而非孤立现象。 |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,431 | 评测 374 个模型 —— GPT-5.4、Gemini 3.1 Pro、Claude 4.6、Kimi-K2.6、GLM-5.1、DeepSeek-V4、Qwen3.6 —— 附带 2M+ 缺陷库。量化了驱动今日工具链的前沿模型发布潮。 |

### 🔍 RAG / 知识

| 项目 | 语言 | Stars（总计 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,545 | 通过 Claude Code/Cursor/Codex 技能，将代码库、文档、SQL、PDF 转化为可查询的知识图谱 —— 确定性 AST 解析、每条边都有解释、**无需向量库**。后 RAG 理念的领先表达。 |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,833 | 将最新的代码文档直接输送至 LLM 与 AI 编辑器。知识新鲜度即服务。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuannote) — [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,252 | 隐私优先、自托管的知识工作区，人类与智能体协作其中。本地知识库的常青之选，现已智能体原生化。 |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,307 | 持久化代码库地图，让 AI 编码工具只读取必要内容，提供经基准测试的上下文削减。面向大型仓库的上下文工程。 |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,127 | 用于语义检索与编辑的 MCP 工具集 —— "智能体的 IDE。"将知识工具接入 MCP 主流。 |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | (+94) | 桌面应用，从你的文档中增量构建并维护一份持久化 wiki，而非每次查询都现取现答。值得关注的明确反 RAG 定位。 |

---

## 3. 趋势信号分析

**爆发品类 —— 单一用途智能体技能。** `i-have-adhd` 一日内斩获 4,650 stars —— 超过任何框架 —— 而 `diagram-design` 以本质上是策划好的输出模板获得 2,249 stars。技能（打包好、安装进 Claude Code/Codex 类智能体的行为）正在迎来"包管理器时刻"：目录已收录 2,115+ 技能（`agentic-awesome-skills`），Vercel 发布 `npx skills`，`superpowers` 衍生出本地化分支。关注点正从"构建智能体"转向"向智能体内*分发能力*"。

**首次出现的新栈。** (1) *Token 经济中间件*：`rtk`（节省 60–90%）、`headroom`（JSON 场景下节省 60–95%）与带压缩能力的网关（`OmniRoute`）将成本控制做成产品层。(2) *极简本地推理*：纯 C 的 MoE 流式加载（`colibri`）加上硬件-模型匹配（`llmfit`），把前沿 MoE 模型推向自有硬件。(3) *命名学科*："智能体编排"优化（`ECC`，255k）与"循环工程"（`loop-engineering`、`DeepCode`）已拥有自己的工具与术语体系。(4) *智能体 RL*：ART、OpenRLHF、AReaL 共同汇聚于使用 GRPO 训练多步智能体 —— RL 正从聊天模型转向智能体行为。(5) *智能体商务*：CloddsBot 跨 1,000+ 市场的智能体间支付协议在本数据中属首例。

**与大模型发布的关联。** 数据集涉及 GPT Image 2/2.5、GPT-5.4、Gemini 3.1 Pro、Claude 4.6、Kimi-K2.6、GLM-5.x、DeepSeek-V4、Qwen3.6 —— 无休止的模型迭代直接解释了网关泛滥（352 家提供商）、智能体切换器（`cc-switch` 132k）与基准疲劳（追踪 374 个模型）。GPT Image 2.5 的 prompt 库走红（+705）是教科书级的发布余波，而 Claude Code 的主导地位则是几乎所有走红的技能工具所瞄准的底层土壤。

---

## 4. 社区热点

- **[obra/superpowers](https://github.com/obra/superpowers) + 技能生态** —— `i-have-adhd`、`diagram-design`、`vercel-labs/skills` 同时走红，技能已成为贡献者增速最快的切入点；早期技能作者拥有不成比例的分发杠杆。
- **[diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) + [rtk-ai/rtk](https://github.com/rtk-ai/rtk)** —— Token 成本层具备清晰 ROI（节省 15–95%），并将网关 + 压缩 + 回退整合为单一产品；有望成为默认基础设施。
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** —— 116k stars 投向"知识图谱、无需向量库"，标志着对 embedding 优先 RAG 的真正架构级反动；天然契合需要仓库上下文的编码智能体。
- **[OpenPipe/ART](https://github.com/OpenPipe/ART) + 智能体 RL 集群** —— 基于 GRPO 的真实任务智能体训练（OpenRLHF/AReaL 并行）是今日数据中技术含量最高的方向；技能的边界在行为打包，RL 则改变智能体能力本身。
- **[JustVugg/colibri](https://github.com/JustVugg/colibri) + [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit)** —— 纯 C 的 MoE 流式加载与硬件匹配工具，标志着对 API 依赖的严肃"自有推理"反潮流；随着前沿 MoE 权重扩散，值得长期关注。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*