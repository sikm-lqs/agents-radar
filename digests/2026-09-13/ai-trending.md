# AI 开源趋势日报 2026-09-13

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-13 11:31 UTC

---

# AI 开源生态趋势报告 — 2026-09-13

**筛选说明（第一步）：** 在 19 个热门仓库中，有 13 个与 AI 相关。被排除的非 AI 仓库包括：ever-gauzy（ERP/CRM）、gods-eye-view（地理空间可视化，无 ML 核心）、SmartTube、omniget、douyin-downloader（媒体下载器）、cool-retro-term（终端模拟器）。在 83 个话题搜索仓库中，cs-video-courses、netdata 和 medusa 因尽管带有 AI 相关标签但属于通用工具而被排除。仅热门仓库的总 Star 数在源数据中不可得（记为 0）；以下展示今日增量。

---

## 1. 今日要点

[debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) 今日收获 **+2,546 stars**——约为第二名 AI 项目的 4 倍——作为一款完全本地化、支持 646 种语言的 ElevenLabs 替代品，凸显了对"本地优先"替代闭源 AI SaaS 的强劲需求。基础设施侧，[JustVugg/colibri](https://github.com/JustVugg/colibri)（+652）作为一款零依赖的纯 C 推理引擎，能够从磁盘流式读取 MoE 专家，正面回应了当下由开源 MoE 权重主导的模型格局（DeepSeek-V4、Kimi-K2.6、GLM-5.2、MiniMax-H3）。Agentic 垂直应用持续涌现：[DeskcommCRM](https://github.com/melgarafael/DeskcommCRM)（+504）作为开源 AI 销售操作系统、[OpenMontage](https://github.com/calesthio/OpenMontage)（+383）用于 agentic 视频制作、以及 [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch)（+452）用于并行研究智能体。同时"技能经济"正在制度化——一个经过验证的多智能体技能注册中心（[agent-skills](https://github.com/tech-leads-club/agent-skills)，+215）与 [ECC](https://github.com/affaan-m/ECC) 257k Star 的 harness 优化仓库领跑话题榜——伴随着一股安全暗流（[pentagi](https://github.com/vxcontrol/pentagi)、[Claude-Red](https://github.com/SnailSploit/Claude-Red)、[system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)）收尾今日榜单。

---

## 2. 各分类头部项目

### 🔧 AI 基础设施

| 项目 | 语言 | Stars（总 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | （今日 +652） | 纯 C、零依赖的推理引擎，从磁盘流式加载 MoE 专家，让用户在已有硬件上运行前沿模型。今日 +652 stars 使其成为最热门的基础设施新晋项目，MoE 正成为默认架构的背景下，市场对极致轻量化运行时的渴望清晰可见。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,781 | 事实上的本地 LLM 运行时；其当前支持的模型清单（Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma）本身就是一份"哪些开源权重值得关注"的实时快照。仍是消费级本地推理的首选入口。 |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,605 | 跨平台桌面控制中心，统一管理 Claude Code、Codex、OpenCode、OpenClaw、Grok Build 与 Hermes Agent。132k stars 反映出在 agentic CLI/IDE 不断涌现之际，工具疲劳症已十分明显。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,125 | 单二进制 CLI 代理，可在常用开发命令上削减 60–90% 的 LLM token 消耗。它锚定了一个快速崛起的"token 经济"基础设施品类。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,817 | 在到达 LLM 之前压缩工具输出、日志、文件和 RAG chunk——编程智能体场景减少 20% tokens，JSON 场景减少 60–95%，且答案质量不变。可作为库、代理或 MCP 服务器交付。 |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 65,487 | MIT 许可的 AI 网关，统一接入 352 家服务商（150+ 免费）和 1,200+ 模型，支持配额感知 fallback 与 15–95% 的 token 压缩。由 550+ 贡献者共建——这是社区对供应商锁定和不断攀升的 API 成本的回应。 |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,884 | 大语言模型与多模态模型的高性能服务框架。仍是生产级推理吞吐量的开源标杆。 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Go | （今日 +264） | 混合式代码审查，将确定性规则流水线（NPE、线程安全、XSS、SQLi）与 LLM 智能体结合，输出精准的逐行批注，已在阿里规模生产中久经验证。今日 +264 显示"规则 + LLM"的企业级混合方案正在引起共鸣。 |

*本分类同样活跃的还有：终端编码智能体集群——Codewhale（40,962）、CopilotKit（37,336）、DeepSeek-Reasonix（35,522）、qwen-code（27,812）、kilocode（27,285）、superset（14,136）——以及 serena 风格的 MCP 工具集和 firecrawl/Scrapling 数据采集（179,709 / 80,635）。*

### 🤖 AI 智能体 / 工作流

| 项目 | 语言 | Stars（总 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,391 | 智能体 harness 性能优化系统：技能、本能、记忆、安全与研究优先的开发方式，兼容 Claude Code、Codex、Opencode、Cursor 等。是今日整个数据集中 Star 数最高的单一仓库。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,018 | "与你共同成长的智能体"——Nous Research 的个人智能体。245k stars 奠定了其消费级旗舰智能体的地位，并且它已在 cc-switch 等切换工具中获得一等公民支持。 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,144 | 公平代码（Fair-code）的工作流自动化，原生 AI 能力，400+ 集成，支持自托管或云端。是传统自动化与 agentic 工作流之间的实用桥梁。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,294 | 最初的自主智能体项目，仍在向更易用的智能体工具演进。是其开创的整个品类的历史性势能锚点。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,576 | agentic 工作流与 RAG 管线的协作工作空间，可部署在云、VPC 或自托管环境。定位为无需重构技术栈即可从原型走向生产的平台。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,427 | 操作浏览器的智能体的事实标准库。爬取、测试与 computer-use 自动化栈的基础层（另见 AIHawk 的隐身变体，30,669）。 |
| [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) | Rust | （今日 +452） | 使用任意模型运行并行研究智能体。今日 +452 表明多智能体研究并行化击中了用户的真实痛点。 |
| [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) | TypeScript | （今日 +215） | 面向 Antigravity、Claude Code、Cursor 和 Copilot 的专业编码智能体的安全、经过验证的技能注册中心。是在爆炸式增长的技能生态之上，正在形成的早期信任层。 |

*值得关注的"安全智能体"：[vxcontrol/pentagi](https://github.com/vxcontrol/pentagi)（Go，今日 +189）与 [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red)（Python，今日 +113）。*

### 📦 AI 应用

| 项目 | 语言 | Stars（总 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) | Python | （今日 +2,546） | 开源、完全本地的 ElevenLabs 替代品：支持语音克隆、声音设计、视频配音、听写、转录和有声书，覆盖 646 种语言。今日 AI 项目涨幅冠军，约为第二名的 4 倍——是本日最强的本地优先信号。 |
| [melgarafael/DeskcommCRM](https://github.com/melgarafilar/DeskcommCRM) | TypeScript | （今日 +504） | 自托管的 AI 销售操作系统，原生集成智能体与 WhatsApp（WAHA），对标 Kommo、Octadesk 与 Intercom；支持 MCP、多租户、符合 LGPD。印证了销售技术领域以开源替代垂直 SaaS 的势头。 |
| [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) → 见"智能体"表 | Rust | （今日 +452） | — |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | （今日 +383） | 号称首个开源 agentic 视频制作系统：12 条流水线、100+ 工具、700+ 智能体技能与制作知识文件。将一个标准 AI 编程助手改造为完整的视频工作室。 |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | （今日 +262） | 智能体 + 技能，端到端完成数学建模并生成可直接提交的论文。是智能体自动化应用于垂直学术工作流的鲜明范例。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,829 | 友好的 AI 界面，支持 Ollama、OpenAI API 及兼容后端。本地模型自托管的事实默认入口。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 123,018 | 通过自动化 LLM 工作流，从主题或关键词一键生成高清短视频。长期证明 AI 内容自动化需求持续旺盛。 |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,990 | LLM 驱动的多市场股票分析，提供多源数据、实时新闻、仪表板和零成本定时运行。65k stars 印证金融是智能体的"杀手级"垂直领域（另见 Vibe-Trading，33,340；FinGPT）。 |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,747 | 集智能聊天、自主智能体与 300+ 助手于一体的 AI 生产力工作室，统一接入前沿模型。打磨精致的消费级桌面端入口。 |

### 🧠 LLM / 训练

| 项目 | 语言 | Stars（总 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,257（今日 +102） | 面向 SOTA 文本、视觉、音频与多模态模型的模型定义框架，覆盖推理与训练。仍是整个生态的引力中心，今日重回热门榜单。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,088 | 本地 UI，用于运行和训练 LLM 与扩散模型（GGUF、MLX；Qwen3.8、DeepSeek-V4、MiniMax-H3、Gemma 4、FLUX）。持续在消费级硬件上推动微调民主化。 |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | （今日 +210） | YuE2：前沿音乐生成，支持符号化规划、零样本翻唱与 agentic 音乐编辑。生成模型持续扩展至文本与图像之外。 |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter | 21,243 | 开源金融 LLM，已在 HuggingFace 发布训练权重。领域专属开源模型趋势的典范。 |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,713 | Agent Reinforcement Trainer：基于 GRPO 的多步智能体在岗强化学习（Qwen3.6、GPT-OSS、Llama）。后训练正明显地从对话对齐转向智能体任务能力。 |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,998 | 易用、可扩展的 agentic-RL 框架（PPO、DAPO、REINFORCE++、VLM、vLLM、Ray、async）。新兴智能体 RL 训练栈的支柱之一。 |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,751 | "面向 LLM 智能体应用的 RL 桥梁"，简洁灵活。与 ART、OpenRLHF 共同构成清晰的智能体 RL 三件套。 |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,436 | 评测 374 个模型——GPT-5.4、Gemini-3.1-Pro、Claude-4.6、ERNIE-5.0、Qwen3.6、DeepSeek-V4、GLM-5.1 等——并附带 200 万+ 条的模型缺陷数据库。社区驱动的、规模罕见的评测项目。 |

### 🔍 RAG / 知识

| 项目 | 语言 | Stars（总 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [f/prompts.chat](https://github.com/f/prompts.chat) | HTML | 170,197 | 经典的 Awesome ChatGPT Prompts 集合，现已免费且支持隐私自托管。仍是现存最大的社区提示词知识库。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,323 | 通过 `/graphify` 技能，将任意代码库（含文档、SQL schema、配置文件、PDF）转化为可查询的知识图谱：确定性 AST 解析、每条边都有解释、无需向量库。是"图谱优于向量"上下文运动的旗舰项目。 |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,947 | 将最新的代码文档直接交付给 LLM 与 AI 代码编辑器。正面解决拖累编程智能体的"过时上下文"问题。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,322 | 隐私优先、自托管的知识工作空间，人类与 AI 智能体在其中协作。知识管理被明确地重新定位至智能体时代。 |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,367 | 面向 MCP 与 CLI 的本地优先代码智能图谱，构建持久化的代码库地图，并提供有基准对比的上下文压缩效果。是"将整个仓库塞进上下文窗口"的具体替代方案。 |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,252 | 提供语义检索与编辑能力的 MCP 工具集——"智能体的 IDE"。与上文图谱上下文栈天然搭配。 |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | （今日 +217） | 提取自 Claude（Fable 5.1、Opus 5、Claude Code/Design）、GPT-6-Astra、Codex、Gemini 3.8 Flash / 3.1 Pro / Antigravity、Grok、Cursor 与 Kimi 的系统提示词，并定期更新。今日 +217 表明提示词透明文化正随每一次前沿模型发布而活跃。 |

---

## 3. 趋势信号分析

**爆发式关注：本地优先、"自有技术栈"的 AI。** 今日涨幅最大的 VoiceStudio（+2,546）是一套完全本地的语音套件；DeskcommCRM（+504）是自托管的 AI 销售操作系统；colibri（+652）瞄准的是"用户已有的硬件"。模式高度一致——以明确的数据主权叙事，开源替代闭源 SaaS（ElevenLabs、Intercom/Kommo）。

**首次出现的新栈。** 三个方向看起来具有结构性新意：(1) **技能即包（skills-as-packages）**——SKILL.md 风格的注册中心（agent-skills、agentic-awesome-skills 的 2,115+ 目录、distilly、Claude-Red）类似智能体能力的"npm 时刻"，而安全/验证正在成为差异化点；(2) **作为基础设施层的 token 经济**——rtk（削减 60–90%）、headroom（JSON 削减 60–95%）、caveman（65%）、codeburn（度量）形成"先度量再压缩"的工作流，一年前还不存在这个品类；(3) **被命名的学科**——"智能体 harness 优化"（ECC，257k）与"循环工程（loop engineering）"（11k）标志着智能体编排走向专业化。

**与 LLM 发布的关联。** 数据中随处可见的前沿模型名——GPT-6-Astra、Claude Opus 5 / Fable 5.1、Gemini 3.8 Flash / 3.1 Pro、Grok——解释了 system_prompts_leaks +217 的更新节奏。MoE 的主导地位（Kimi-K2.6、GLM-5.2、DeepSeek-V4、MiniMax-H3 出现在 ollama/unsloth 支持列表中）直接推动了 colibri 的专家流式设计。IDE 碎片化（Antigravity、Grok Build、Codex、Claude Code、Cursor）正在催生中立中间件——cc-switch（132k）、OmniRoute（352 家服务商）、多客户端技能注册中心。最后，智能体 RL 三件套（ART、OpenRLHF、AReaL）表明后训练投入正明确地向智能体任务倾斜。

*（约 250 字）*

---

## 4. 社区热点

- **[JustVugg/colibri](https://github.com/JustVugg/colibri)** — 纯 C 实现的专家流式 MoE 推理。如果磁盘流式方案能持续保持性能，将重置消费级 GPU 上运行前沿模型的预期；值得关注的指标是其模型支持路线图与内存映射策略。
- **[debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)** — 今日遥遥领先的涨幅王，整合本地语音栈（克隆 + 设计 + 配音 + 听写，646 种语言）。可以预见，围绕语音克隆安全与模型许可的治理讨论将随其增长而来。
- **技能注册中心之争**——[tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills)（经过验证、聚焦安全）vs. 社区目录（[agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills)、[superpowers-zh](https://github.com/jnMetaCode/superpowers-zh)）。SKILL.md 正在成为一种可移植的包标准；其攻击性安全子集（[Claude-Red](https://github.com/SnailSploit/Claude-Red)、[pentagi](https://github.com/vxcontrol/pentagi)）则同时带来了能力与政策层面的问题。
- **Token 成本工程**——将 [codeburn](https://github.com/getagentseal/codeburn)（跨 37 款工具度量用量）与 [rtk](https://github.com/rtk-ai/rtk)/[headroom](https://github.com/headroomlabs-ai/headroom)/[caveman](https://github.com/JuliusBrussee/caveman)（压缩）搭配使用。对任何重度依赖 Claude Code/Codex 的团队而言，ROI 立竿见影。
- **图谱化上下文优于向量 RAG**——[graphify](https://github.com/Graphify-Labs/graphify)、[code-review-graph](https://github.com/tirth8205/code-review-graph)、[serena](https://github.com/oraios/serena)：为代码场景提供确定性、可审计、边可解释的检索。它们"反向量"的定位与基准声明，值得独立验证。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*