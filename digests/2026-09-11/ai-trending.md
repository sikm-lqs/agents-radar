# AI 开源趋势日报 2026-09-11

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-10 23:30 UTC

---

# 📊 AI 开源趋势报告 — 2026 年 9 月 11 日

> **筛选说明（第一步）：** 共审阅 91 条原始条目，保留约 80 条明确属于 AI/ML 领域的内容。被排除的非 AI 项目：`gods-eye-view`（地理空间 3D 可视化，无 ML）、`armorpaint`（3D 图形工具）、`system-design-notes`、`JavaGuide`、`cs-video-courses`（通用面试/课程内容）、`netdata`（可观测性）、`medusa`（电商平台）、`Scrapling`（通用爬虫框架）。`OmniRoute`（同时出现在两个列表中）已去重，合并其星标数据。

---

## 1. 今日看点

今天的主旋律属于**智能体"技能（skills）"层**：总体趋势榜首的 `i-have-adhd`（+3,854）并非框架，而是一个打包好的智能体行为——这表明技能正在成为智能体能力的主导分发形态。机构玩家动作明显，**腾讯的 `teamai-cli`（+837）** 推动团队级 AI 原生工作流，**清华的 `OpenMAIC`（+806）** 则首发多智能体交互课堂。本地推理凭借 **`colibri`**（一款纯 C 的 MoE 引擎，可从磁盘流式加载专家）和 **`llmfit`**（一款支持数百款模型的硬件适配检测工具）重新获得关注。同时，多供应商网关 **`OmniRoute`（+591）** 今日同时登上两个榜单，总星标已达 64,211。在超大规模端，**ECC（255,873）** 与 **hermes-agent（244,204）** 印证了智能体"驾驭（harness）"类目正在围绕少数赢家平台走向整合。

---

## 2. 各分类顶级项目

### 🔧 AI 基础设施

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,592 | 事实上标准的前沿开源模型本地运行时，现已支持 Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen 和 Gemma。其模型阵容是衡量当下哪些开源权重真正重要的可靠指标。 |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,180 | Claude Code、Codex、OpenCode、OpenClaw、Grok Build 和 Hermes Agent 的跨平台桌面控制中心。132k 星标反映出多智能体工具切换已相当主流。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,366 | 在数据送达 LLM 之前压缩工具输出、日志、文件和 RAG 分块——为编程智能体节省 20% token，JSON 场景下节省 60–95%。是高速崛起的"token 经济"工具品类的旗舰。 |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 64,211 (+591) | MIT 协议的免费 AI 网关，统一 352 家供应商（150+ 免费）和 1,200+ 模型到单一端点，配额感知自动降级，token 压缩 15–95%。今日同时在热榜与 MCP 话题搜索中上榜——双重信号强劲。 |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | TypeScript | 0 (+837) | 腾讯推出的"让每个团队 AI 原生化"的 CLI，将智能体工作流带入群组协作。榜单上出现这家中国科技巨头的重量级新项目，标志着企业在团队级智能体工具上的推进。 |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | TypeScript | 0 (+175) | Vercel 官方的开源智能体技能工具（`npx skills`），可将便携式技能安装到任意智能体。主流平台的一手支持让技能成为标准化的封装格式。 |
| [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) | Rust | 0 (+247) | 一条 Rust 命令，判定数百款模型中哪些能真正在你的硬件上跑起来。解决了开源模型目录爆炸式增长带来的实际痛点——本地运行时的绝佳搭档。 |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+130) | 纯 C、零依赖的推理引擎，可从磁盘流式加载 MoE 专家，让前沿模型在自有硬件上运行。是重推理栈极简化的一股反向潮流，值得关注其消费级 GPU 前沿 MoE 的潜力。 |

### 🤖 AI 智能体 / 工作流

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,873 | 为 Claude Code、Codex、OpenCode 和 Cursor 增添技能、本能、记忆、安全与研究优先开发的智能体驾驭性能系统。今日数据集中星标最高的仓库——价值正在向驾驭层聚拢。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,204 | Nous Research 推出的"与你共同成长"的个人智能体，强调长期适应性。244k 星标表明，对持久化、个人化智能体的需求在编程之外同样旺盛。 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,952 | 公平代码的工作流自动化平台，原生 AI 能力，集成 400+，可自托管。仍是智能体工作流与企业系统对接的事实桥梁。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,356 | 跨云、VPC 或自托管部署的协作工作台，用于构建智能体工作流与 RAG 流水线。其稳定体量反映出超越爱好者的、生产级的智能体采用。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,079 | 操作真实浏览器的智能体的标准库。是围绕其崛起的网页自动化与智能体交易项目的基础依赖。 |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+3,854) | 一项让编程智能体不再把答案埋进长篇大论的技能——面向 ADHD 友好的简洁输出。今日总体趋势第一；证明"智能体输出 UX"是一项未被满足的痛点，需求爆发。 |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+731) | 跨编程智能体通用的智能体技能框架与软件开发方法论。其汉化版本提及 25 万+ 原始星标，是技能生态的基石。 |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | 0 (+636) | 本地优先的 AI 编程智能体桌面应用，融合 Electron、Rust 内核、pi 智能体驾驭及可由用户安装的插件。势头表明市场对桌面级、保护隐私的智能体环境有明确需求。 |

### 📦 AI 应用

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,566 | 易用的自托管 AI 界面，支持 Ollama、OpenAI API 等。仍是本地模型栈的默认入口。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,228 | 通过自动化 LLM 工作流，根据单个主题或关键词生成高清短视频。AI 内容生成应用的长期标杆，特别是在中文生态中。 |
| [koala73/worldmonitor](https://github.com/koala73/worldmonitor) | TypeScript | 85,983 | 实时全球情报仪表盘，结合 AI 新闻聚合、地缘政治监控与基础设施追踪。是智能体应用于态势感知（而非编程）的代表性案例。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,138 | 在 Claude Code、Codex 或 OpenCode 中本地运行的开源 AI 求职工具——扫描招聘平台、为岗位打分（A–H）、定制简历。是"个人运营"类应用以编程 CLI 为运行时的代表。 |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+1,287) | 38 种编辑级图表类型，以自包含的 HTML/SVG 形式交付给 Claude Code、Codex 与 Pi——明确"不要 Mermaid 凑数"。今日 +1,287 显示出对高质量智能体输出资产的渴求。 |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | 0 (+957) | 即"提示词即代码"的案例库，含 530+ 案例、20+ 行业模板，以及 GPT Image 2 与 2.5 对比专区。直接搭上 GPT Image 2.5 发布浪潮——图像提示工程正在走向专业化。 |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | 0 (+806) | 清华发布的开放式多智能体交互课堂，一键提供沉浸式多智能体学习。学术界进入这一领域，使教育成为可见的智能体垂类。 |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+299) | 跨 1,000+ 市场（Polymarket、Kalshi、Binance、Hyperliquid、Solana DEX、5 条 EVM 链）自主运行的 AI 交易智能体，搭载智能体商业支付协议。基于 Claude 构建；今日榜单上最具野心的"智能体商业"展示。 |

### 🧠 LLM / 训练

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,088 | 用于前沿文本、视觉、音频与多模态模型（推理与训练）的模型定义框架。仍是开源模型生态的中流砥柱。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,998 | 本地化 UI，用于运行与训练 LLM 及扩散模型，支持 GGUF/MLX、Qwen3.8、DeepSeek-V4、MiniMax-H3、Gemma 4 与 FLUX。微调已明显转向桌面端。 |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,770 | 分布式 AI 计算引擎，核心运行时搭配加速 ML 负载的库。是本榜单中大多数大规模训练栈的底层基础设施。 |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,236 | 开源金融 LLM，权重已在 HuggingFace 发布。配合当下的智能体交易热度（CloddsBot、Vibe-Trading），扮演金融领域的模型层。 |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,712 | 智能体强化训练器，将 GRPO 应用于多步智能体——为 Qwen3.6、GPT-OSS 和 Llama 提供"在岗训练"。清晰信号：RL 正从对话模型转向智能体行为。 |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,994 | 基于 Ray、vLLM 与异步执行构建的可扩展、高性能智能体 RL 框架（PPO、DAPO、REINFORCE++）。随着 RL 训练基础设施标准化，星标正逼近 10k。 |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,431 | 评测 374 款模型——从 GPT-5.4 与 Gemini 3.1 Pro 到 Kimi-K2.6、DeepSeek-V4 与 GLM-5.1，外加 2M+ 样本的模型缺陷库。对中文模型版图而言是难得的评测语料。 |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,749 | 让 LLM 智能体应用的强化学习变得简单灵活的"RL 桥梁"。与今日数据中显现的智能体 RL 工具集群形成呼应。 |

### 🔍 RAG / 知识

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 178,824 | 用于大规模搜索、抓取与网页交互的"context API"。尽管有下方图谱挑战者，网页检索仍是智能体的默认接地层。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,711 | 通过 Claude Code、Cursor、Codex 与 Gemini CLI 的 `/graphify` 技能，将任意代码库（含文档、SQL、PDF）转化为可查询的知识图谱——本地 AST 解析、每条边都可解释、无需向量库。116k 星标让其成为"图谱替代嵌入"运动的旗舰。 |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,852 | 直接向 LLM 与 AI 编辑器提供最新代码文档。是静默却关键的一环，修复了编程智能体因训练数据陈旧导致的幻觉问题。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,275 | 隐私优先的自托管知识工作空间，人类与 AI 智能体协作于此。是人+智能体知识工具领域中成熟的开源替代方案。 |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,311 | 面向 MCP 与 CLI 的本地优先代码智能图谱，构建持久化代码库地图，让智能体只读必要内容，并提供已基准化的上下文缩减证据。实际证明图谱上下文能压低审查成本。 |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 0 (+94) | 从你的文档增量构建并维护一份持久化、互联的 wiki 的桌面应用——明确以"逐次查询的 RAG"为对立面。一个"后 RAG"的论点，今日上榜值得关注。 |

---

## 3. 趋势信号分析

**智能体技能是本周期突破性的格式。** 今日最热仓库 `i-have-adhd`（+3,854）并非框架，而是一个打包好的行为——它与 `superpowers`（+731）、`vercel-labs/skills` 以及 255k 星的 ECC 并列。技能正在成为一种便携、跨工具的封装标准，覆盖 Claude Code、Codex、Cursor 和 Gemini CLI——实质上是智能体能力的"npm 时刻"，如今又获得 Vercel 的一手加持。

**Token 经济已成熟为一个产品类目。** 随着智能体循环带来成倍开销，压缩层快速扩张：headroom（71k 星，JSON 场景节省 60–95%）、rtk（79.8k，开发命令节省 60–90%）、caveman（104k，通过精简提示词节省 65%），以及 OmniRoute 内置的 15–95% 压缩。可以预期，"代理+技能"组合将成为默认的成本基础设施。

**本地优先推理正在复兴**，驱动来自前沿开源权重（Kimi-K2.6、GLM-5.2、DeepSeek-V4、Qwen3.6）：colibri 的纯 C MoE 引擎配合磁盘流式专家、llmfit 的硬件适配检测，以及 PI-Desktop 的本地智能体驾驭，都指向对云端依赖的主权诉求。

**今日真正的新方向：** 智能体商业（CloddsBot 在 1,000+ 市场上实现的机器对机器支付）、知识图谱上下文取代向量 RAG（graphify 116k 星）、后 RAG 时代的持久化 wiki（llm_wiki）、以及多智能体教育（清华的 OpenMAIC）。

**模型发布联动效应清晰可见：** `awesome-gpt-image-2`（+957）乘 GPT Image 2/2.5 发布之势；智能体 RL 集群（ART、OpenRLHF、AReaL）则同步追踪业界向"用 RL 训练智能体"在开源权重上的转向。

---

## 4. 社区热点

- **[vercel-labs/skills](https://github.com/vercel-labs/skills) + [obra/superpowers](https://github.com/obra/superpowers) — 技能标准。** 已支持 26+ 工具（据 superpowers-zh），加上 Vercel 推出官方安装器，技能是当下最高杠杆的贡献与分发入口。
- **Token 效率栈 — [headroom](https://github.com/headroomlabs-ai/headroom)、[rtk](https://github.com/rtk-ai/rtk)、[OmniRoute](https://github.com/diegosouzapw/OmniRoute)。** 三个互补层级（压缩库、CLI 代理、网关）合计可观察到的 15–95% 节省。对重度智能体用户而言立竿见影；该类目正在快速整合。
- **[JustVugg/colibri](https://github.com/JustVugg/colibri) — 本地 MoE 推理。** 纯 C、零依赖，专家从磁盘流式加载。若能在消费级硬件上跑出前沿 MoE 质量，将重置本地推理的经济模型；搭配 [llmfit](https://github.com/AlexsJones/llmfit) 可构成完整栈。
- **基于图谱的上下文工程 — [graphify](https://github.com/Graphify-Labs/graphify)（116k）与 [code-review-graph](https://github.com/tirth8205/code-review-graph)（31k）。** 由确定性 AST 派生的图谱加可解释的边，正在赢得开发者信任，胜过黑箱的向量检索；这是对主流 RAG 最具说服力的架构性挑战。
- **智能体交易与智能体商业 — [CloddsBot](https://github.com/alsk1992/CloddsBot)、[HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)、[FinGPT](https://github.com/AI4Finance-Foundation/FinGPT)。** 自主执行加上机器对机器支付是面向未来但风险较高的前沿；预计在机构采用之前，安全与监管审视会进一步收紧。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*