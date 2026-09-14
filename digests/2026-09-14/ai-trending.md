# AI 开源趋势日报 2026-09-14

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-14 11:30 UTC

---

# AI 开源趋势报告 — 2026-09-14

**数据来源:** GitHub 今日趋势（20 个仓库）+ AI 主题搜索（83 个仓库，已去重）

**第一步 — 筛选结果:** 排除 9 个非 AI 仓库（来自趋势/主题数据）:[localsend](https://github.com/localsend/localsend)、[vaultwarden](https://github.com/dani-garcia/vaultwarden)、[ever-gauzy](https://github.com/ever-co/ever-gauzy)、[opendisplay](https://github.com/peetzweg/opendisplay)、[flowsint](https://github.com/reconurge/flowsint)、[project-nomad](https://github.com/Crosstalk-Solutions/project-nomad)、[cs-video-courses](https://github.com/Developer-Y/cs-video-courses)、[netdata](https://github.com/netdata/netdata)、[medusa](https://github.com/medusajs/medusa)（具有 AI 相关品牌定位，但实质上并非 AI 工具）。

---

## 1. 今日亮点

[VoiceStudio](https://github.com/debpalash/VoiceStudio) 以 **+2,632 星标** 成为今日最大爆款——约为第二名 AI 项目的 3.5 倍——它与 [VoxCPM](https://github.com/OpenBMB/VoxCPM) 和 [YuE](https://github.com/multimodal-art-projection/YuE) 一同登顶趋势榜，形成罕见的"语音/音频三连击"。[colibri](https://github.com/JustVugg/colibri)（+868）走的是极简主义逆流路线：在你已有的硬件上，用纯 C 语言从磁盘流式加载前沿 MoE 模型。[system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)（+706）显示，"Prompt 考古"——追踪 GPT-6-Astra、Claude Fable 5.1、Gemini 3.8 等前沿模型——已成为社区追踪新版本发布的常驻资源。由 [TradingAgents](https://github.com/TauricResearch/TradingAgents)（+756）领衔的金融 Agent 集群，以及攻击性安全技能库 [Claude-Red](https://github.com/SnailSploit/Claude-Red)（+506），为今日的图景画上句点——这一天由"agent-skills 元层"主导，它也占据了数据集中最高的累计星标（[ECC](https://github.com/affaan-m/ECC)，258,039）。

---

## 2. 分类热门项目

> ⚠️ 说明：趋势源数据的条目将总星标报告为 `0`（API 限制）；括号中的"今日增量"才是可靠的增长信号。

### 🔧 AI 基础设施

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+868) | 纯 C、零依赖的 MoE 推理引擎，从磁盘流式加载专家权重，在普通硬件上运行前沿模型。登顶今日 AI 趋势榜，彰显了"极简运行时跑巨型模型"的市场需求。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,881 | 本地 LLM 运行时的默认选择，现已支持 Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek、gpt-oss、Qwen 与 Gemma。其模型阵容本身即是一份开放权重前沿竞赛的实时索引。 |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,775 | 跨平台桌面控制中心，统一管理 Claude Code、Codex、OpenCode、OpenClaw、Grok Build 和 Hermes Agent。132k 星标表明，同时管理多个编程 Agent 订阅已成为日常工作流难题。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,276 | 单二进制 CLI 代理，在常见开发命令中将 LLM token 消耗削减 60–90%。在 headroom 和 caveman 之外，锚定了快速崛起的"token 经济学"细分赛道。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 72,013 | 在内容送抵 LLM 之前压缩工具输出、日志、文件和 RAG 分块——编程 Agent 场景 token 减少 20%，JSON 场景减少 60–95%，效果不变。上下文压缩已从"黑科技"演进为产品级库/代理/MCP 服务器。 |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 65,917 | 免费 MIT 协议的 AI 网关：一个端点，352 家供应商（150+ 免费），1,200+ 模型，具备配额感知的自动故障转移。由 550+ 贡献者共建，内置 RTK+Caveman 压缩，声称可节省 15–95% token。 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Go | 0 (+443) | 混合式代码审查：确定性流水线与 LLM Agent 相结合，在 NPE、线程安全、XSS 和 SQL 注入等维度提供行级注释。已在阿里规模生产环境验证，是"确定性 + LLM"企业级模式的清晰范本。 |
| [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) | TypeScript | 0 (+265) | 面向 Antigravity、Claude Code、Cursor、Copilot 等编程 Agent 的安全、经过验证的技能注册中心。+265 今日增量，标志着"技能供应链"的信任问题开始获得真正的基础设施支撑。 |

### 🤖 AI Agent / 工作流

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 258,039 | 面向 Claude Code、Codex、Opencode 与 Cursor 的 Agent 性能优化层，叠加了技能、本能、记忆和"研究优先"工作流。数据集中星标最高——编码 Agent 之上的"增强层"才是社区能量汇聚之处。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,317 | "与你共同成长的 Agent"——NousResearch 的个人 Agent 平台。其插件生态今日通过 [oh-my-hermes](https://github.com/rlaope/oh-my-hermes)（+52）进入趋势榜，印证了"平台+插件"飞轮效应。 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,242 | 公平代码（Fair-code）工作流自动化，原生 AI 能力 + 400+ 集成。仍是连接经典自动化与 Agent 工作流的桥梁。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,320 | 自主 Agent 项目的鼻祖，如今定位为"人人可用的 AI 工具包"基础。187k 星标体现了持久的品牌价值，尽管重心已转向 harness 与 skills。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,673 | 面向云、VPC 或自托管场景的协作工作空间，用于构建 Agent 工作流与 RAG 管道。仍是团队从原型走向生产时"Agent 应用平台"的首选。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,573 | 让 Agent 操控真实浏览器的库。浏览器控制仍是 Agent 技术栈中杠杆效应最强的通用工具。 |
| [lobehub/lobehub](https://github.com/lobehub/lobehub) | TypeScript | 82,465 | "首席 Agent 运营官"，为你的 AI 团队提供招聘、排班与汇报能力，实现 7×24 运营。标志着从单 Agent 向 Agent 团队运营管理的转移。 |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | 0 (+506) | 精心整理的攻击性安全技能库（从 SQLi 到 EDR 绕过），以 SKILL.md 文件形式打包给 Claude 的 skills 系统使用。+506 今日增量——红队方法论遇上 skills 格式，势必引发安全讨论。 |

### 📦 AI 应用

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) | Python | 0 (+2,632) | 完全本地的 ElevenLabs 替代品：语音克隆、声音设计、视频配音、听写、转录与有声书，覆盖 646 种语言。今日的绝对领跑者，增量几乎是其他任何 AI 仓库的 4 倍。 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | 0 (+756) | 多 Agent LLM 金融交易框架，设有专门的分析师/风控角色。领衔一个更广泛的金融集群，包括 [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)（65,028）与 [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)（33,414）。 |
| [666ghj/MiroFish](https://github.com/666ghj/MiroFish) | Python | 0 (+524) | "简洁通用的群体智能引擎"，号称通过集体智能预测任何事物。+524 今日增量，源自极致通用性叙事；其宣称背后的实质值得跟踪。 |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | 0 (+487) | YuE2：前沿音乐生成，具备符号化规划、零样本翻唱与 Agent 式音乐编辑。完成了同日趋势榜上罕见的音频/音乐三连击。 |
| [ruvnet/RuView](https://github.com/ruvnet/RuView) | Rust | 0 (+370) | 将普通 WiFi 信号转化为空间智能、生命体征监测与存在检测——零摄像头。代表了非 LLM 的边缘/感知 AI 在语言模型技术栈之外的多元化。 |
| [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) | Python | 0 (+204) | VoxCPM2：无分词器的 TTS，支持多语种语音、创意声音设计与逼真克隆。为今日本地语音应用浪潮提供模型层支撑。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,962 | 面向 Ollama、OpenAI API 等的用户友好的自托管 AI 界面。本地优先运动的默认聊天前端。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,553 | 本地优先的 AI 求职 Agent，对岗位评分 A–H，定制简历，并在 Claude Code/Codex/OpenCode 内追踪投递进度。71k 星标表明"个人运营"Agent 正成为消费端的爆款垂直方向。 |

### 🧠 LLM / 训练

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,787 (+152) | 面向 SOTA 文本/视觉/音频/多模态训练与推理的模型定义框架。在快速迭代的应用层之下，仍是稳定的基石（今日 +152）。 |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,940 | 一步步用 PyTorch 从零实现类 ChatGPT 的 LLM。教育需求与模型迭代同步增长——基础知识仍是最持久的资产。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,142 | 用于运行和训练 LLM 与扩散模型的本地 UI——支持 GGUF、MLX、Qwen3.8、DeepSeek-V4、MiniMax-H3、Gemma 4、FLUX。始终率先支持每一次开放权重前沿发布，是发布周期的风向标。 |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,094 | 微软推出的"点亮 AI Agent 的终极训练器"。标志着 RL 从对话模型迁移到 Agent 行为——后者已成为一等训练目标。 |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,712 | Agent 强化训练器（Agent Reinforcement Trainer），将 GRPO 应用于多步真实世界 Agent 任务。针对 Qwen3.6、GPT-OSS 和 Llama 的"在岗"强化学习——后 SFT 差异化叙事的代码实现。 |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 10,002 | 易用、可扩展的 Agent 强化学习框架（PPO、DAPO、REINFORCE++、VLM、vLLM、Ray、async）。更广泛的 Agentic-RL 技术栈所引用的共享底座。 |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,439 | ReLE 评测，覆盖 374 个模型，从 GPT-5.4、Gemini 3.1 Pro 到 DeepSeek-V4、Kimi-K2.6、GLM-5.1，并附带 2M+ 的缺陷库。近乎实时追踪开放权重竞赛的评测基础设施。 |

### 🔍 RAG / 知识

| 项目 | 语言 | 星标（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 180,200 | 用于大规模搜索、抓取和与 Web 交互的"上下文 API"。上下文获取已完全产品化，成为 Agent 与 RAG 管道的基础设施。 |
| [f/prompts.chat](https://github.com/f/prompts.chat) | HTML | 170,298 | 社区 Prompt 库（前身 Awesome ChatGPT Prompts），支持组织自托管。在今日的 Prompt 泄露浪潮中重获关注。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,586 | 通过 Claude Code/Cursor 技能，将代码库、文档、SQL 与 PDF 转化为可查询的知识图谱——本地 AST 解析、每条边都有解释、无需向量存储。"图优于向量"挑战以嵌入为中心的 RAG 的旗舰项目。 |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 80,859 | 自适应抓取框架，既能处理单次请求也能完成全规模爬取。为 Agent 上下文提供规模化的高韧性数据采集。 |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,985 | 将最新的代码文档投递到 LLM 与 AI 编辑器中。从源头而非生成时解决"陈旧文档导致幻觉"的问题。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,340 | 隐私优先、自托管的知识工作空间，人类与 Agent 协作其中。个人知识库正成为 Agent 的栖息地层。 |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | 0 (+706) | 提取自 Claude Fable 5.1/Opus 5、GPT-6-Astra/Codex、Gemini 3.8 Flash/3.1 Pro、Grok、Cursor 与 Kimi 的系统 Prompt，定期更新。+706 今日增量——Prompt 考古兼作免费的 Prompt 工程课程。 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 0 (+640) | 一条 CLI 赋予 Agent 对 Twitter、Reddit、YouTube、GitHub、Bilibili 与小红书的读/搜索能力——零 API 费用。+640 今日增量；以抓取为先的数据访问有意绕开平台 API 经济学。 |

---

## 3. 趋势信号分析

**语音/音频 AI 是今日的爆发点。** VoiceStudio 的 +2,632 是单日最大 AI 增量，约为第二名的 3.5 倍，且与 VoxCPM2（无分词器 TTS）和 YuE2（符号化规划音乐生成）同日爆发。本地语音正在复刻本地 LLM 的发展路径：模型层（VoxCPM）→ 引擎 → 打包的消费级应用（VoiceStudio）。

**Agent-skills 经济正在整合。** 数据集中最高的星标数不属于模型，而是 Agent 的增强层：ECC（258,039）将 skills 与 memory 叠加到编程 Agent 之上；今日又新增了 Claude-Red（+506，攻击性安全技能）、agent-skills（+265，经过验证的注册中心）以及 oh-my-hermes。Skills 正在演变为一条供应链——伴随着策展、信任与安全问题。

**Token 经济学已成熟为基础设施。** [rtk](https://github.com/rtk-ai/rtk)（80,276）、[headroom](https://github.com/headroomlabs-ai/headroom)（72,013）、[caveman](https://github.com/JuliusBrussee/caveman)（105,480）和 [codeburn](https://github.com/getagentseal/codeburn)（10,999）构成了"压缩 + 计量"的技术栈；OmniRoute 这类网关已将它们捆绑集成。

**全新方向：** colibri 的纯 C MoE 引擎从磁盘流式加载专家权重，将前沿模型推向消费级硬件；RuView 的无摄像头 WiFi 感知标志着非 LLM 边缘 AI 的崛起；"loop engineering"（[loop-engineering](https://github.com/cobusgreyling/loop-engineering)，11,202）和"harness SDK"（[harness-sdk](https://github.com/strands-agents/harness-sdk)，7,239）正在被确立为命名学科。

**LLM 发布联动：** Prompt 泄露档案现已追踪前沿节奏（GPT-6-Astra、Claude Fable 5.1、Gemini 3.8），而 Ollama、unsloth 与基准测试仓库索引着开放权重竞赛（Kimi-K2.6、GLM-5.2、DeepSeek-V4、Qwen3.8），正是这些推动着本地工具需求——包括支持 DeepSeek prefix-cache-native 的编码 CLI 如 [DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)（35,538）。金融 Agent 集群（TradingAgents +756、daily_stock_analysis 65,028、Vibe-Trading 33,414）则乘着同一波散户"Vibe-Trading"浪潮。

---

## 4. 社区热点

- **本地语音技术栈** —— [VoiceStudio](https://github.com/debpalash/VoiceStudio)（+2,632）、[VoxCPM](https://github.com/OpenBMB/VoxCPM) 与 [YuE](https://github.com/multimodal-art-projection/YuE) 同步登上趋势榜，是一个"品类创建"事件。预计克隆质量基准、配音流水线以及许可证/同意审查将迅速跟进。
- **Skills 供应链与安全** —— [ECC](https://github.com/affaan-m/ECC)、[agent-skills](https://github.com/tech-leads-club/agent-skills) 与 [Claude-Red](https://github.com/SnailSploit/Claude-Red) 共同定义了下一战场：谁来验证 skills，以及当攻击性安全技能以 SKILL.md 形式发布时会发生什么。注重安全的开发者在部署 skills 加载器之前应该先读一遍 Claude-Red。
- **Token 成本工具的投资回报** —— [rtk](https://github.com/rtk-ai/rtk) 与 [headroom](https://github.com/headroomlabs-ai/headroom) 提供可量化的收益（声称 20–95% 的削减）；可与 [codeburn](https://github.com/getagentseal/codeburn) 搭配，在前后进行计量。今日列表中摩擦最低的成本优化方案。
- **colibri** —— 纯 C 实现的 MoE 推理，磁盘流式加载专家权重。若独立基准测试成立，它将重新定义运行前沿模型的最低硬件门槛；值得关注其 fork 与类 GGUF 格式生态的涌现。
- **Agentic RL** —— [agent-lightning](https://github.com/microsoft/agent-lightning)、[ART](https://github.com/OpenPipe/ART) 与 [OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) 对阵 skills 蒸馏派（如 [distilly](https://github.com/titanwings/distilly)，24,704）——是本周期"Agent 如何自我提升"的核心争论。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*