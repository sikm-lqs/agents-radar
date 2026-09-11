# AI 开源趋势日报 2026-09-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-11 23:30 UTC

---

# AI 开源趋势报告 — 2026-09-12

**第一步 — 筛选说明:** 从 16 个趋势仓库和 83 个话题搜索仓库中,以下项目因非 AI 相关被排除:`gods-eye-view`(真实数据的三维地理可视化,无机器学习)、`iloader`(侧载工具)、`armorpaint`(三维贴图)、`Sonarr`(PVR)、`OpenFlux`(TCP 隧道)、`JavaGuide`(面试指南)、`netdata`(可观测性,AI 仅作为功能)、`Scrapling`(爬虫框架)、`cs-video-courses`(课程清单)。`medusajs/medusa` 处于边界(面向 Agent 的电商平台;已在趋势中提及,但未列入表格)。剩余约 75 个 AI 相关项目,其中信号最强的 39 个列于下表。

---

## 1. 今日要点

**Agent 的"技能"层今天彻底爆发:** [i-have-adhd](https://github.com/ayghri/i-have-adhd) —— 字面意义上只是一个面向编程 Agent 的输出格式化技能 —— 成为趋势榜上第一 AI 仓库(单日 +3,440 ⭐),[superpowers](https://github.com/obra/superpowers)(+731)则提供了底层的框架支撑。GitHub 官方的 [spec-kit](https://github.com/github/spec-kit)(+985)将"规约驱动开发"从社区实践推向平台默认。**后 RAG 浪潮**清晰可见于 [llm_wiki](https://github.com/nashsu/llm_wiki)(+640)、[alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) 与 [hyperresearch](https://github.com/jordan-gibbs/hyperresearch),三者都在构建持续存在、增量维护的知识体系,而非无状态的检索。自主赚钱 Agent 重磅登场:[CloddsBot](https://github.com/alsk1992/CloddsBot)(+627)在你睡觉时交易 1,000+ 个市场。在喧嚣之下,累计 Star 数确认"脚手架工程"已成为主导范式:[ECC](https://github.com/affaan-m/ECC)(256,508)与 [hermes-agent](https://github.com/NousResearch/hermes-agent)(244,596)领跑整个数据集。

---

## 2. 分类热门项目

> **数据说明:** 趋势榜行的总 Star 数在源数据中显示为 `0`,今日增量才是可靠信号。话题搜索的总数为累计值(近 7 天活跃),无每日增量。

### 🔧 AI 基础设施

| 项目 | 语言 | Star (总数 / 今日) | 简介 |
| :--- | :--- | ---: | :--- |
| [github/spec-kit](https://github.com/github/spec-kit) | Python | 0 (+985) | GitHub 官方的规约驱动开发工具包,规约成为人类与编程 Agent 之间的契约。今日最强非技能类 AI 增长者,标志着 SDD 走向平台默认地位。 |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | 0 (+545) | 本地优先的 AI 编程 Agent 桌面端:Electron + Rust 内核 + pi Agent Harness + 用户可装插件。单日 +545 反映出对"算力与数据留在本机"的 Agent 工作空间的旺盛需求。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,699 | 前沿开源权重模型的默认本地运行时 —— README 当前主打 Kimi-K2.6、GLM-5.2、DeepSeek 与 gpt-oss。仍是整个本地 Agent 技术栈的入口。 |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,369 | 跨平台桌面工具,统一管理 Claude Code、Codex、OpenCode、OpenClaw、Grok Build 与 Hermes Agent 的配置。其规模折射出"每位开发者同时驾驭多个脚手架"已成常态。 |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Go | 105,038 | 一个 Claude Code 技能,通过强制输出简洁的"穴居人式"文本来削减约 65% 的 Token 用量。一个玩笑式技能拿下六位数 Star,是 Token 成本已成为一等 UX 关切的最好证明。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,998 | 单二进制 CLI 代理,在输出到达 LLM 之前剥离常见开发命令输出中的 60–90% Token。零依赖,是 Token 经济栈的开箱即用层。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,593 | 在 LLM 之前压缩工具输出、日志、文件与 RAG 分块 —— 编程 Agent 节省 20%,JSON 节省 60–95%,答案不变。随着 Agent 会话越来越长且并行运行,该项目热度持续上升。 |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 64,871 | MIT 协议 AI 网关,单一端点对接 352 家供应商(150+ 免费)、1,200+ 模型,具备配额感知回退与内置 RTK/Caveman 压缩。550+ 贡献者,在模型快速更迭下成为中立的交换枢纽。 |

### 🤖 AI Agent / 工作流

| 项目 | 语言 | Star (总数 / 今日) | 简介 |
| :--- | :--- | ---: | :--- |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+3440) | 一个阻止编程 Agent 埋没答案、并以 ADHD 友好方式输出的技能。单日 +3,440 —— 本榜单第一 AI 仓库,证明一个边界清晰的技能可以跑赢整个框架。 |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+731) | 一个 Agentic 技能框架,加上一套可安装到现有编程 Agent 中的软件开发方法论。其中文本地化版本([superpowers-zh](https://github.com/jnMetaCode/superpowers-zh),8,066 ⭐)展现了框架的全球影响力。 |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 256,508 | Agent 脚手架的性能优化系统:技能、直觉、记忆、安全与研究优先的开发流程,覆盖 Claude Code、Codex、Cursor 等。是今日整个数据集中最大的仓库。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,596 | "与你一同成长的 Agent" —— 一个长期持续、不断积累技能与记忆的个人 Agent。自改进 Agent 运动的旗舰项目。 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,041 | 公平代码的工作流自动化,原生支持 AI 能力,集成 400+ 组件,可自托管。仍是 Agent 原型与生产业务流程之间的桥梁。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,256 | 操控真实浏览器的 Agent 的标准库。随着 MCP 集成持续接入,其在驱动网页的 Agent 生态中保持核心地位。 |
| [lobehub/lobehub](https://github.com/lobehub/lobehub) | TypeScript | 82,411 | 你的"首席 Agent 运营官" —— 招聘、排班并汇报一支 7×24 运行的 AI Agent 团队。映射了从单一 Agent 到 Agent 舰队化运营的转向。 |
| [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | Python | 46,287 | Agent 优先的控制平面,从 2,115+ Agentic 技能中检索、选择与验证,提供 CLI、本地 MCP 与 Workbench。本质上就是新兴技能经济的注册中心。 |

### 📦 AI 应用

| 项目 | 语言 | Star (总数 / 今日) | 简介 |
| :--- | :--- | ---: | :--- |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+627) | 横跨 1,000+ 市场(Polymarket、Kalshi、Binance、Hyperliquid、Solana DEX、5 条 EVM 链)的自主交易 Agent,具备风控与机对机支付协议。最具野心的自托管"睡眠中自动运行"演示,基于 Claude 构建。 |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | 0 (+132) | 端到端完成数学建模项目并输出可提交论文的 Agent 与技能。Agent 瞄准完整专业交付物的鲜明例证。 |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 0 (+126) | 自托管的 AI 销售操作系统:多租户 CRM,原生支持 Agent 与 WhatsApp(WAHA),MCP 就绪,符合 LGPD,定位对标 Kommo/Octadesk/Intercom。踩中中小企业向自托管 Agent 销售转型的浪潮。 |
| [pascalorg/editor](https://github.com/pascalorg/editor) | TypeScript | 0 (+83) | 开源三维建筑编辑器,暴露本地 CLI 与 MCP 工具,让人类与 AI Agent 共享同一套工作流。MCP 原生垂直软件的早期模板。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,513 | 一键从主题生成高清短视频的全自动 LLM 工作流。仍是商业 AI 视频流水线在开源侧的参考答案。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,291 | 运行在编程 CLI(Claude Code、Codex、OpenCode)内的本地优先 AI 求职工具:扫描招聘门户、评分岗位、定制简历、跟踪申请。展示了消费级 Agent 入驻开发工具的趋势。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,942 | LLM 驱动的多市场股票分析,实时新闻、决策看板、推送通知、零成本定时运行。LLM 分析在散户中的主流化。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,690 | 集成智能聊天、自主 Agent 与 300+ 助手的 AI 生产力工作台。统一多模型访问的精致消费级入口。 |

###  LLM / 训练

| 项目 | 语言 | Star (总数 / 今日) | 简介 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,130 | 面向 SOTA 文本、视觉、音频与多模态训练与推理的模型定义框架。每一款新的开源权重前沿模型仍率先落地于此。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,039 | 本地运行与训练 LLM 及扩散模型的 UI —— GGUF/MLX 支持当前主打 Qwen3.8、DeepSeek-V4、MiniMax-H3、Gemma 4。训练栈的消费级入口。 |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,240 | 开源金融 LLM,权重已在 HuggingFace 开放。与今日交易 Agent 浪潮直接呼应。 |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,712 | Agent 强化学习训练器:用 GRPO 在真实任务上训练多步 Agent(Qwen3.6、GPT-OSS、Llama)。Agent 一直缺失的"在职训练"工具。 |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,995 | 可扩展、高性能的 Agentic RL 框架(PPO、DAPO、REINFORCE++、VLM),跑在 Ray/vLLM 异步基础设施上。GRPO 式 Agent 训练的研究底座。 |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,434 | ReLE 评测覆盖 374 个模型 —— GPT-5.4、Gemini 3.1 Pro、Claude 4.6、Kimi K2.6、DeepSeek-V4、GLM-5.1 等,附带 2M+ 缺陷库。一个异常拥挤的前沿格局的排行榜。 |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,749 | 面向 LLM Agent 应用的"强化学习桥梁",简洁而灵活。打通 Agent 框架与 RL 训练器之间的回路。 |

### 🔍 RAG / 知识

| 项目 | 语言 | Star (总数 / 今日) | 简介 |
| :--- | :--- | ---: | :--- |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 0 (+640) | 桌面应用,从你的文档中增量构建并维护一个持续互联的 Wiki —— 明确以"按查询 RAG"为对立面。今日 +640 反映出反 RAG 立场的共鸣。 |
| [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) | Rust | 0 (+156) | 由 alphaXiv 团队打造,用任意模型并行运行研究 Agent。研究综合正在快速成为 Agent 原生工作负载。 |
| [jordan-gibbs/hyperresearch](https://github.com/jordan-gibbs/hyperresearch) | Python | 0 (+118) | Agent 驱动的研究知识库,Agent 收集、检索并将网络研究综合进一个持久、可检索的 Wiki。今日第三趋势仓库,共享同一份"持久知识"主张。 |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,206 | 用于大规模搜索、抓取与交互网页的"上下文 API"。几乎所有 Agent 知识流水线底层的采集层。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 117,017 | 通过 `/graphify` 技能把代码库加文档、SQL 与 PDF 转成可查询的知识图谱 —— 确定性本地 AST 解析,每条边都可解释,无需向量库。无嵌入运动的旗舰。 |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,894 | 将最新文档直接送到 LLM 与代码编辑器。针对代码场景,在解决"陈旧文档幻觉"方面优于分块 RAG。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuann) | TypeScript | 46,308 | 隐私优先、自托管的知识工作空间,人类与 AI Agent 协同作业。在中文生态中尤为强势,中文笔记应用正在领跑 Agent 落地。 |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,338 | 面向 MCP 与 CLI 的本地优先代码智能图谱,为 Agent 提供持久的代码库地图,使其只读真正相关的内容。附带大型仓库评审工作流下的上下文缩减基准数据。 |

---

## 3. 趋势信号分析

**最具爆发力的工具类型是"单一用途的 Agent 技能"。** [i-have-adhd](https://github.com/ayghri/i-have-adhd)(单日 +3,440)是一个行为模块;[caveman](https://github.com/JuliusBrussee/caveman)(105,038 ⭐)与 [ponytail](https://github.com/DietrichGebert/ponytail)(135,809 ⭐)本质上都是人格/压缩类技能。在 [superpowers](https://github.com/obra/superpowers) 作为框架、[agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) 索引 2,115+ 技能的基础上,一个"Agent 应用商店"式的分发层正在实时成形。

**本周正在固化的新栈与新方向:** (1) *Token 经济成为基础设施* —— [rtk](https://github.com/rtk-ai/rtk)(削减 60–90%)、[headroom](https://github.com/headroomlabs-ai/headroom)(JSON 削减 60–95%),通过 [codeburn](https://github.com/getagentseal/codeburn) 计量,经 [OmniRoute](https://github.com/diegosouzapw/OmniRoute) 路由。(2) *后 RAG 知识* —— 三个独立趋势项目(llm_wiki、hyperresearch、OpenResearch)加上 [graphify](https://github.com/Graphify-Labs/graphify) 的"无向量库"图谱,以增量持久记忆替代无状态检索。(3) *规约驱动开发走向官方化* —— 通过 GitHub 的 spec-kit。(4) *Agent 强化学习* —— [ART](https://github.com/OpenPipe/ART) 的 GRPO 训练让 Agent 从"提示工程"转向"奖励训练"。(5) *并行即方法论* —— [superset](https://github.com/superset-sh/superset) 编排 100+ 编程 Agent;ECC 将"脚手架工程"体系化;[loop-engineering](https://github.com/cobusgreyling/loop-engineering) 为该学科正名。

**与 LLM 发布的关联:** 整个技术栈如今假设一个"轮换中的开源权重前沿"。Ollama 主推 Kimi-K2.6/GLM-5.2,unsloth 主推 Qwen3.8/DeepSeek-V4;[DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) 则是 DeepSeek 原生,利用 V4 的 prefix-cache 稳定性支撑长会话。[chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) 追踪 374 个模型,包括 GPT-5.4 与 Claude 4.6 —— 前沿模型的快速更迭,直接解释了多供应商切换([cc-switch](https://github.com/farion1231/cc-switch))的增长,以及 Claude Code 作为主要技能目标的引力。

---

## 4. 社区热点

- **为技能经济而建** —— [superpowers](https://github.com/obra/superpowers) + [agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) 定义了分发格式;[distilly](https://github.com/titanwings/distilly)(24,625 ⭐)自动把专家行为蒸馏成可复用技能。当前个人贡献者最高 ROI 的切入点。
- **Token 成本控制平面** —— 把 [rtk](https://github.com/rtk-ai/rtk) + [headroom](https://github.com/headroomlabs-ai/headroom) + [caveman](https://github.com/JuliusBrussee/caveman) 组合起来,用 [codeburn](https://github.com/getagentseal/codeburn) 观测。随着 Agent 7×24 运行,Token 预算正成为一项运维开销。
- **后 RAG 知识基础设施** —— [llm_wiki](https://github.com/nashsu/llm_wiki)、[graphify](https://github.com/Graphify-Labs/graphify)、[code-review-graph](https://github.com/tirth8205/code-review-graph) 与 [context7](https://github.com/upstash/context7) 表明:在代码与研究工作负载下,MCP 投递的持久知识优于纯向量 RAG。
- **强化学习训练的 Agent** —— [ART](https://github.com/OpenPipe/ART)、[AReaL](https://github.com/areal-project/AReaL)、[OpenRLHF](https://github.com/OpenRLHF/OpenRLHF):在提示工程之外,GRPO-on-Agent 浪潮是最清晰的技术前沿。
- **自主垂直 Agent 与 Agent 商务** —— [CloddsBot](https://github.com/alsk1992/CloddsBot) 的机对机支付协议、[DeskcommCRM](https://github.com/melgarafael/DeskcommCRM)、[career-ops](https://github.com/career-ops-hq/career-ops),甚至 [medusa](https://github.com/medusajs/medusa) 重新定位为"面向 Agent 的商务",都预示着 AI 客户通过 MCP/A2A 完成交易 —— 早期但快速演进的方向。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*