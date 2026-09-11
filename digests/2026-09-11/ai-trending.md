# AI 开源趋势日报 2026-09-11

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-11 11:30 UTC

---

# AI 开源趋势报告 — 2026-09-11

**过滤说明：**以下项目因属于非 AI 内容被排除出趋势榜:`Sonarr`、`armorpaint`、`OpenFlux`、`iloader`、`gods-eye-view`。以下项目因属于通用平台、仅带 AI 擦边定位而被排除出话题搜索:`medusa`、`netdata`、`JavaGuide`、`cs-video-courses`。最终保留 39 个项目并归类如下。

---

## 1. 今日看点

今日 AI 涨幅冠军既不是框架也不是模型，而是一个单一用途的智能体技能:[ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd)(+3,882)——它能让编程智能体不再把答案埋进冗长的输出里，这印证了“技能层”正是当前社区能量的汇聚之地。GitHub 官方的 [spec-kit](https://github.com/github/spec-kit)(+985)和 [obra/superpowers](https://github.com/obra/superpowers)(+732)表明，智能体开发方法论(规格驱动开发、技能框架)正在固化为默认实践。Token 经济学已经成熟为一个完整的产品品类，[rtk](https://github.com/rtk-ai/rtk)(79,917⭐)、[headroom](https://github.com/headroomlabs-ai/headroom)(71,495⭐)和 [caveman](https://github.com/JuliusBrussee/caveman)(104,837⭐)都在从不同角度压缩上下文成本。直接经手资金的智能体也登上了趋势榜:[CloddsBot](https://github.com/alsk1992/CloddsBot)(+277)可在 1,000+ 个市场上自主交易，并支持机器对机器支付。最后，一种明确的“后 RAG”模式在同一天出现了两次——[llm_wiki](https://github.com/nashsu/llm_wiki)(+142)和 [hyperresearch](https://github.com/jordan-gibbs/hyperresearch)(+118)构建的是持久、精选维护的维基，而非“检索即答”。

---

## 2. 各类别热门项目

### 🔧 AI 基础设施

| 项目 | 语言 | 星标(总数 / 今日)| 简介 |
| :--- | :--- | ---: | :--- |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+3,882) | 一个防止编程智能体把答案埋进冗长输出的技能，强制输出对 ADHD 友好的简洁内容。今日以巨大优势高居 AI 涨幅榜第一——一个单一行为的技能风头盖过了完整框架，印证了技能层的圈地运动。 |
| [github/spec-kit](https://github.com/github/spec-kit) | Python | 0 (+985) | GitHub 出品的规格驱动开发工具包——在智能体生成代码之前先写规格。今日 +985 表明 SDD 正从博文概念升级为默认工作流。 |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+732) | 一套智能体技能框架，外加一套“真正管用”的软件开发方法论。它是庞大生态的锚点，其中包括中文本地化版本 [superpowers-zh](https://github.com/jnMetaCode/superpowers-zh)(8,062⭐)。 |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | 0 (+624) | 本地优先的 AI 编程智能体桌面端(Electron + Rust 核心 + pi Agent Harness + 用户可安装插件)。预示着智能体外壳正从终端迁移到可安装的桌面应用。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 256,182 | 智能体外壳性能优化：覆盖 Claude Code、Codex、OpenCode 和 Cursor 的技能、本能、记忆与安全。今日数据集中星标最多的仓库——外壳工程正在成为新的平台层。 |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,308 | 跨平台桌面枢纽，可同时管理 Claude Code、Codex、OpenCode、Grok Build 和 Hermes Agent。其星标数证明，多智能体配置已经普遍到需要一个控制面板。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,917 | 单二进制 CLI 代理，在常见开发命令上削减 60–90% 的 LLM token 消耗，零依赖。位居快速增长的 token 经济学技术栈之首。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,495 | 在工具输出、日志、文件和 RAG 分块到达 LLM 之前对其进行压缩(JSON 上可削减 60–95% token)。与 rtk 和 caveman 一起，成本管道已成为必备基础设施。 |

### 🤖 AI 智能体 / 工作流

| 项目 | 语言 | 星标(总数 / 今日)| 简介 |
| :--- | :--- | ---: | :--- |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,401 | “与你共同成长的智能体”——数据集中星标最多的智能体运行时，也是 cc-switch 和 superpowers-zh 集成中的一等支持目标。个人智能体的参照标杆。 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,990 | Fair-code 工作流自动化，原生支持 AI 与 400+ 集成。连接自主智能体与企业系统的老牌桥梁。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,253 | 自主智能体项目的鼻祖。即便重心已转向外壳与技能，其星标仍在复利式增长。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,118 | 如今自称“智能体工程平台”。生产级智能体图之下的框架层。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,167 | 操作浏览器的智能体；计算机使用工作流的底座(参见 [AIHawk](https://github.com/feder-cr/AIHawk),30,338⭐)。浏览器依然是智能体的默认执行器。 |
| [lobehub/lobehub](https://github.com/lobehub/lobehub) | TypeScript | 82,394 | “首席智能体操作官”，7×24 为你的 AI 团队完成招聘、排班与汇报。智能体舰队管理正在崛起为一个独立的产品门类。 |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+277) | 覆盖 1,000+ 个市场的自主交易智能体(Polymarket、Kalshi、Binance、Hyperliquid、Solana DEX、5 条 EVM 链)，基于 Claude 构建，内置面向机器对机器支付的智能体商务协议。今日 +277 表明自托管的资金操作型智能体正在走向主流。 |
| [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) | Rust | 0 (+210) | 用任意模型并行运行研究智能体。出自 alphaXiv 团队——研究智能体编排已升格为一等公民工具。 |

### 📦 AI 应用

| 项目 | 语言 | 星标(总数 / 今日)| 简介 |
| :--- | :--- | ---: | :--- |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,410 | 智能体工作流 + RAG 构建平台，可部署于云端、VPC 或自托管环境。交付智能体应用的事实上的开放标准。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,612 | 自托管 AI 界面，支持 Ollama 和 OpenAI 兼容后端。本地模型技术栈的门户入口。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,391 | 通过自动化 AI 工作流，从一个主题或关键词一键生成高清短视频。规模化程度惊人的 AI 内容自动化。 |
| [koala73/worldmonitor](https://github.com/koala73/worldmonitor) | TypeScript | 86,038 | 实时全球情报仪表盘，提供 AI 驱动的新闻聚合与地缘政治监测。基于智能体采集数据构建的态势感知应用。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,222 | 运行在 Claude Code、Codex 或 OpenCode 内部的本地 AI 求职智能体：扫描职位、A–H 评分、定制简历、跟踪投递。一种新颖的分发模式——应用以智能体技能而非独立二进制文件的形式交付。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,926 | LLM 驱动的多市场股票分析，配备决策仪表盘和零成本定时运行。与 [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)(33,234⭐)和 [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT)(21,237⭐)共同构成一个密集的金融智能体集群。 |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | 0 (+132) | 由智能体加技能组成，端到端完成数学建模并生成可直接提交的论文。“智能体交付文档成果”这一垂直模式的干净范例，今日登上趋势榜。 |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 0 (+126) | 自托管 AI 销售操作系统：内置原生智能体的 CRM,经 WAHA 接入 WhatsApp,MCP 就绪、多租户、符合 LGPD。开源的 Kommo/Intercom 替代品，显示智能体正进入垂直中小企业 SaaS 领域。 |

### 🧠 LLM / 训练

| 项目 | 语言 | 星标(总数 / 今日)| 简介 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,650 | 本地运行时，已内置 Kimi-K2.6、GLM-5.2、DeepSeek、gpt-oss、Qwen 和 Gemma。它的 README 实际上就是当前开放权重前沿的快照。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,108 | 用于定义最先进文本、视觉、音频和多模态模型的框架。依然是本报告中几乎所有项目之下的底座。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,014 | 运行和训练 LLM 及扩散模型的本地 UI(GGUF、MLX、Qwen3.8、DeepSeek-V4、Gemma 4、FLUX)。微调已经变成一项桌面活动。 |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,775 | 支撑训练与服务技术栈的分布式 AI 计算引擎。规模化 RL 负载的吞吐骨干。 |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,806 | 面向 LLM 和多模态模型的高性能服务框架。推理吞吐仍是激烈竞争的战场。 |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,711 | 智能体强化训练器：为多步智能体提供“在岗”GRPO 训练(Qwen3.6、GPT-OSS、Llama)。智能体 RL 是本周期最亮眼的训练方向。 |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,994 | 可扩展的智能体 RL 框架(PPO、DAPO、REINFORCE++、VLM、vLLM + Ray)。众多智能体调优流水线背后的后训练骨干。 |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,431 | 覆盖 374 个模型的 ReLE 评测——GPT-5.4、Gemini-3.1-pro、Claude-4.6、Qwen3.6、DeepSeek-V4、GLM-5.1——外加 2M+ 样本的缺陷数据库。2026 年 9 月前沿格局的最佳公开地图。 |

### 🔍 RAG / 知识

| 项目 | 语言 | 星标(总数 / 今日)| 简介 |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,002 | 用于大规模搜索、抓取并交互 Web 的上下文 API。智能体与 RAG 流水线事实上的 Web 摄取层。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,877 | 通过确定性的本地 AST 解析，将代码库、文档、SQL schema 和 PDF 转化为可查询的知识图谱——无需向量库，每条边都有解释。代码领域“图谱优于嵌入”运动的旗舰。 |
| [MemPalace/mempalace](https://github.com/MemPalace/mempalace) | Python | 58,991 | 基准成绩最好的开源 AI 记忆系统，而且免费。智能体记忆已凝结成一个独立的、以基准为驱动的产品品类。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,300 | 隐私优先、自托管的知识工作区，人类与 AI 智能体在其中协作。长文知识应用正在原生吸纳智能体能力。 |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,329 | 面向 MCP 和 CLI 的持久化代码库地图，让 AI 工具只读取要紧的内容，并带有经基准验证的上下文缩减。代码智能图谱正成为可复用的智能体基础设施。 |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 0 (+142) | 桌面应用，从你的文档渐进式构建并维护一个持久、互链的维基，而非逐次查询的 RAG。今日登上趋势榜，定位鲜明地打出“后 RAG”。 |
| [jordan-gibbs/hyperresearch](https://github.com/jordan-gibbs/hyperresearch) | Python | 0 (+118) | 智能体对网络研究进行收集、检索与综合，沉淀为一个持久的可搜索维基。与 llm_wiki 持有相同的反 RAG 精选论，并在同一天起势。 |

*注：来自趋势榜的仓库在源数据中总星标显示为 ⭐0;对这些行而言，今日增量才是可靠的信号。*

---

## 3. 趋势信号分析

**技能层正在吸走全部注意力。**今日 AI 涨幅前三——i-have-adhd(+3,882)、spec-kit(+985)、superpowers(+732)——都是行为与方法论层面的产物，而非模型或框架。围绕它们的是一个真正的技能经济：六位数的星标([caveman](https://github.com/JuliusBrussee/caveman) 104,837;[ponytail](https://github.com/DietrichGebert/ponytail) 135,362;[ECC](https://github.com/affaan-m/ECC) 256,182)、本地化版本，以及技能蒸馏工具([distilly](https://github.com/titanwings/distilly),24,616⭐)。技能正在成为可移植、跨智能体的通用格式。

**Token 经济学已成熟为一个品类。**[rtk](https://github.com/rtk-ai/rtk)、[headroom](https://github.com/headroomlabs-ai/headroom)和 [codeburn](https://github.com/getagentseal/codeburn)(10,959⭐)分别从代理、预压缩和计量三个角度压缩上下文成本；宣称节省 15–95% 如今已是标准话术。

**新技术栈涌现：**(1)多智能体控制平面——[cc-switch](https://github.com/farion1231/cc-switch)同时管理五种外壳，[superset](https://github.com/superset-sh/superset)(14,079⭐)编排 100+ 智能体，[OmniRoute](https://github.com/diegosouzapw/OmniRoute)统一 352 家提供商;(2)MCP 走出 IDE——[pascalorg/editor](https://github.com/pascalorg/editor)(+83)把 MCP 工具装进了 3D 架构编辑器;(3)确定性 AST 知识图谱正在取代向量库;(4)后 RAG 持久维基。

**模型周期关联：**各家 README 和基准测试频繁提及 DeepSeek-V4、Qwen3.6/3.8、GLM-5.x、Kimi-K2.6、GPT-5.4——这轮前沿刷新带动了模型原生工具([DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix),35,503⭐,优化 DeepSeek 前缀缓存稳定性)以及廉价的长时运行循环，让自进化智能体([GenericAgent](https://github.com/lsdefine/GenericAgent)、[CowAgent](https://github.com/zhayujie/CowAgent))和智能体 RL 训练变得切实可行。

---

## 4. 社区热点

- **[obra/superpowers](https://github.com/obra/superpowers)(+732)与技能生态**——今日复利增长最快的一层；贡献可移植技能(参见 [superpowers-zh](https://github.com/jnMetaCode/superpowers-zh)、[distilly](https://github.com/titanwings/distilly))能以极少的代码换取超量的传播。
- **Token 成本技术栈:[rtk](https://github.com/rtk-ai/rtk) + [headroom](https://github.com/headroomlabs-ai/headroom) + [caveman](https://github.com/JuliusBrussee/caveman)**——可即刻上手、ROI 可量化(token 节省 15–95%);本榜单上最稳妥的生产力收益。
- **后 RAG 研究精选:[alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) + [hyperresearch](https://github.com/jordan-gibbs/hyperresearch) + [llm_wiki](https://github.com/nashsu/llm_wiki)**——三个独立项目在同一周殊途同归地汇聚到持久的智能体维护维基上；留意它在研究工作流中取代朴素 RAG 的进程。
- **确定性代码知识图谱:[graphify](https://github.com/Graphify-Labs/graphify)(116,877⭐)+ [code-review-graph](https://github.com/tirth8205/code-review-graph)**——“无需向量库，每条边都有解释”对基于嵌入的代码检索构成了有力挑战。
- **自主金融智能体:[CloddsBot](https://github.com/alsk1992/CloddsBot) + [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)**——自主执行叠加机器对机器支付，信号很强但风险也高；预计将引来监管关注与分叉乱象。

---

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*