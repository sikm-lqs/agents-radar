# AI 开源趋势日报 2026-09-13

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-12 23:30 UTC

---

# AI 开源趋势报告 — 2026-09-13

**筛选说明（第一步）：** 16 个热门仓库中保留了 9 个作为 AI 相关项目。作为非 AI 排除： `gods-eye-view`（地理空间可视化）、`iloader`、`zapret-discord-youtube`（DPI 绕过）、`Sonarr`（PVR）、`SmartTube`、`OpenFlux`（TCP 隧道）、`armorpaint`（3D 绘画）。从主题搜索结果中，`medusa`（通用电商）和 `cs-video-courses`（通用计算机科学教育）因不属于 AI 核心被排除。

---

## 1. 今日要点

最突出的故事是**"agent harness 经济"**：今日数据集中最大的项目不是模型，而是用于*操作*编程 agent 的工具——ECC（257,087⭐）、cc-switch（132,529⭐）、rtk（80,099⭐）和 headroom（71,751⭐）——反映出围绕优化 Claude Code / Codex / Cursor 类 agent 的一场圈地运动。NousResearch 的 [hermes-agent](https://github.com/NousResearch/hermes-agent)（244,895⭐）是单一获星最多的 agent 项目，印证了"陪伴你成长的个人 agent"已成为大众级品类。今日热门榜单偏向**垂直自治 agent 与 prompt 考古**：AI 销售操作系统（DeskcommCRM，+505）、支持机器对机器支付的自治交易 agent（CloddsBot，+377），以及覆盖 GPT-6-Astra、Claude Fable 5.1 和 Gemini 3.8 的系统提示词泄露档案（+357）。YuE2（+193）通过符号化规划与编辑把生成式音乐推入 agent 领域，而 pentagi（+193）与 Claude-Red（+99）则让 agent 站到了攻防安全的两侧。

---

## 2. 分类热门项目

### 🔧 AI 基础设施

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,087 | Agent harness 性能优化系统，为 Claude Code、Codex、Opencode 和 Cursor 打包技能、本能、记忆与安全能力。是今日整个数据集中获星最多的项目——优化现有 agent 已经比打造新 agent 更具吸引力。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,759 | 开源权重 LLM 的本地运行时（Kimi-K2.6、GLM-5.2、MiniMax、DeepSeek-V4、Qwen、Gemma）。其支持的模型名单读起来就像一份中国开源权重榜单，使其成为本地推理的默认入口。 |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,529 | 跨平台桌面端一体化管理器，覆盖 Claude Code、Codex、OpenCode、OpenClaw、Grok Build 与 Hermes Agent。132k⭐ 印证多 agent 配置管理已成为日常刚需品类。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,099 | 单二进制 CLI 代理，在常见开发命令上削减 LLM token 消耗 60–90%，零依赖。是今日上升最快的基础设施主题——token 经济学的旗舰项目。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,751 | 在内容送达 LLM 之前压缩工具输出、日志、文件与 RAG 切片——编程 agent 场景节省 20%，JSON 场景节省 60–95%。以库、代理和 MCP server 三种形态发布，可嵌入任何 harness。 |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 65,296 | MIT 协议的 AI 网关，通过单一端点暴露 352 家供应商（150+ 免费）和 1,200+ 模型，具备配额感知回退与内置压缩。由 550+ 贡献者共建——模型路由领域的整合压力确实存在。 |
| [Hmbown/Codewhale](https://github.com/Hmbown/Codewhale) | Rust | 40,960 | Rust 编写的开源终端编程 agent，在社区驱动的改进之路上前行。让 Rust 在与 qwen-code、kilocode 并行的编程 agent CLI 竞赛中保持竞争力。 |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | Rust | — (+137)* | 为并行 AI agent 工作流量身打造的 Git worktree 管理 CLI。今日上榜——多 agent 开发正在重塑哪怕最朴素的 Git 工具链。 |

### 🤖 AI Agent / 工作流

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | | 244,895 | "陪伴你成长的 agent"——来自 NousResearch 的长寿型个人 agent。数据集中最大的纯 agent 项目，是持久化陪伴类应用的晴雨表。 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,108 | 公平代码（Fair-code）的工作流自动化平台，原生 AI 能力，400+ 集成，支持自托管或云端。MCP 支持使其成为 agent 自动化之下的工作流骨干。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,289 | 最初的自治 agent 平台，如今重新定位为易上手的 AI 构建模块。在点燃浪潮三年后仍位列 agent 类前五。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,546 | 面向 agentic 工作流与 RAG 流水线的协作工作台，跨云、VPC 与自托管广泛支持模型与工具。仍是低代码 agent 构建器的标杆。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,199 | 自称的"agent 工程平台"。其从 chain 到 agent 的品牌重塑，正是整个生态演进方向的镜像。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,377 | 让 agent 能够驱动真实浏览器的库。浏览器操作如今已成为 agent 的默认能力，而非新鲜事。 |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | — (+237)* | 精心整理的 100+ 免费开源 AI agent、agent 技能与 RAG 应用合集。今日 +237——技能合集这种形态仍在持续复利。 |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | — (+99)* | 精心整理的进攻性安全 SKILL.md 文件库，按攻击面（SQLi、EDR 绕过、漏洞利用开发）为 Claude 注入专家方法论。是领域专业知识被打包为 agent 技能的一个醒目信号。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [f/prompts.chat](https://github.com/f/prompts.chat) | HTML | 170,143 | 社区提示词库（前身为 Awesome ChatGPT Prompts），可自托管。提示词共享仍是经久不衰的常青品类。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,787 | 体验友好的自托管 AI 界面，支持 Ollama 及 OpenAI 兼容 API 等。是 Ollama 生态默认的本地聊天前端。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,830 | 通过 LLM 工作流一键从主题生成高清短视频。内容生成类应用依然拥有海量用户。 |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | — (+505)* | 自托管的 AI 销售操作系统——原生集成 AI agent 与 WhatsApp（WAHA）的 CRM，支持 MCP、多租户、符合 LGPD；Kommo / Octadesk / Intercom 的开源替代。今日榜单中 AI 应用类的最强首发（+505）。 |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | — (+377)* | 跨 1,000+ 市场（Polymarket、Kalshi、Binance、Hyperliquid、Solana DEX、5 条 EVM 链）的自治交易 agent，并配套 agent 商务协议实现机器对机器支付。同时受益于 agent 交易与 agent 支付两条叙事线。 |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | — (+357)* | 定期更新的提取系统提示词档案，覆盖 Claude（Fable 5.1、Opus 5、Claude Code）、GPT-6-Astra/Codex、Gemini 3.8 Flash / 3.1 Pro / Antigravity、Grok、Kimi 与 Cursor。提示词考古如今几乎能实时追踪前沿模型发布。 |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | — (+264)* | 由 agent + 技能构成，可自主完成数学建模并生成可直接提交的论文。是"agent 交付端到端文档而非仅给出答案"的典型代表。 |
| [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) | Go | — (+193)* | 执行复杂渗透测试任务的完全自治多 agent 系统。在本周安全 agent 浪潮中，是 Claude-Red 的防御侧镜像。 |

### 🧠 LLMs / 训练

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,209 | 用于 SOTA 文本/视觉/音频/多模态模型的模型定义框架，覆盖推理与训练。仍是开源 ML 的引力中心。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,073 | 用于运行与训练 LLM 及扩散模型的本地 UI（GGUF、MLX、Qwen3.8、DeepSeek-V4、MiniMax-H3、Gemma 4、FLUX）。消费级 GPU 微调已完全主流化。 |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,785 | 分布式 AI 计算引擎，核心运行时加上 ML 加速库。支撑大规模训练，并经由 OpenRLHF 支撑 agentic RL 技术栈。 |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,861 | LLM 与多模态模型的高性能服务框架。推理吞吐仍是兵家必争之地。 |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,713 | Agent 强化学习训练器——对多步 agent 进行在职 GRPO 训练（Qwen3.6、GPT-OSS、Llama）。"面向 agent 的 RL"正在成为独立学科。 |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,997 | 可扩展的 agentic RL 框架（PPO、DAPO、REINFORCE++、VLM、vLLM、Ray、async）。开源 RL 技术栈的标杆，距 10k⭐ 仅一步之遥。 |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,751 | 面向 LLM agent 应用的 RL 桥梁，"做得既简单又灵活"。打通了 agent 框架与 RL 训练器之间的闭环。 |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | — (+193)* | YuE2：具备符号化规划、零样本翻唱与 agentic 音乐编辑的前沿音乐生成模型。生成式媒体正在吸收 agent 范式。 |

### 🔍 RAG / 知识

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,576 | 用于大规模搜索、抓取与交互 Web 的 context API。Web 数据仍是落地 agent 的护城河。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,245 | 通过一项技能，将代码库、文档、SQL schema 与 PDF 转化为可查询的知识图谱，支持 Claude Code / Cursor / Codex / Gemini CLI——基于确定性 AST 解析，无需向量库。"图优于向量"正在赢得更多信众。 |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 80,529 | 自适应抓取框架，从单次请求到全规模爬取皆可胜任。为检索流水线提供韧性数据采集。 |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,931 | 为 LLM 与 AI 代码编辑器提供最新的代码文档。直击陈旧文档导致的幻觉这一普遍痛点。 |
| [MemPalace/mempalace](https://github.com/MemPalace/mempalace) | Python | 59,022 | 基准测试表现最佳的开源 AI 记忆系统，且免费。记忆正独立成为一个产品层。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,319 | 隐私优先、可自托管的知识工作区，人类与 AI agent 协作其中。在中英双语用户中拥有强劲吸引力。 |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,361 | 面向 MCP/CLI 的本地优先代码智能图谱，可映射代码库，使 AI 工具只读取真正相关的内容，并提供基准化的上下文削减。直击代码评审的 token 账单。 |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,227 | 让 agent 具备语义检索与编辑能力的 MCP 工具包——"你 agent 的 IDE"。用符号化的代码理解替代粗暴的上下文堆砌。 |

\* *热门列表条目从 API 返回 total=0，仅展示今日增量。主题搜索的总数原文照录。*

---

## 3. 趋势信号分析

最清晰的信号是：**价值重心已从打造 agent 转向运营 agent**。生态的顶端不再是模型仓库，而是 harness 工具——ECC（257,087⭐）、cc-switch（132,529⭐）、rtk（80,099⭐）、headroom（71,751⭐）——它们对现有编程 agent 进行优化、路由、压缩与配置，而非取而代之。Token 经济是其中的子主题：rtk 宣称节省 60–90%，headroom 在 JSON 场景下节省 60–95%，还有像 caveman（105,238⭐）和 ponytail（136,596⭐）这种半玩笑式的"技能"，通过让 agent 变得简洁来削减 token——证明真正的瓶颈是上下文的*成本*，而非能力本身。

其次，**技能正成为打包标准**：SKILL.md 库（Claude-Red、24,659⭐ 的 distilly、拥有 2,115+ 技能的 agentic-awesome-skills）将专业知识视为可移植文件，可在 26+ 工具间复用（参考 superpowers-zh）——一个事实上的插件生态。

以新名称浮现的方向：**循环工程（loop engineering）** 作为一门学科（DeepCode、loop-engineering）、面向**并行 agent** 的 Git worktree CLI（worktrunk）、**agent 商务**支付协议（CloddsBot）、**自演化 agent**（GenericAgent、evolver、CowAgent），以及作为独立产品的记忆层（MemPalace、letta）。

与发布的关联是直接的：system_prompts_leaks 收录了 Claude "Fable 5.1"、GPT-6-Astra 与 Gemini 3.8——每一次前沿模型发布都会触发提示词考古（今日 +357）。开源权重的势头由中国实验室主导（ollama 上线 Kimi-K2.6、GLM-5.2、DeepSeek-V4；chinese-llm-benchmark 追踪 374 个模型并附带 2M+ 缺陷库）。最后，agentic RL（ART/AReaL/OpenRLHF）与安全 agent（pentagi、Claude-Red）表明训练与攻/防两端都在走向 agentic。

---

## 4. 社区热点

- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** — 数据集中获星最高的项目；其覆盖 Claude Code、Codex 与 Cursor 的 skills/instincts/memory/security 套装，正在收敛为一个事实上的 harness 性能标准。值得留意从这里萌生的跨工具兼容性规范。
- **技能经济** — [titanwings/distilly](https://github.com/titanwings/distilly)（24,659⭐）、[sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills)（2,115+ 技能）和 [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) 标志着 SKILL.md 成为新的打包格式；技能验证与安全审查工具是一个开放缺口。
- **Token 成本栈** — [rtk-ai/rtk](https://github.com/rtk-ai/rtk) + [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) + [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) 构成了压缩/路由层；那些激进到 15–95% 的节省声明值得独立基准测试，该品类也将迎来整合。
- **记忆层** — [MemPalace/mempalace](https://github.com/MemPalace/mempalace)（"基准测试最佳"的开源记忆）与 [letta-ai/letta](https://github.com/letta-ai/letta) 表明，记忆正成为一种被独立基准化的产品，每个 harness 都将不得不集成。
- **面向 agent 的 RL** — [OpenPipe/ART](https://github.com/OpenPipe/ART)（在职 GRPO 训练）、[areal-project/AReaL](https://github.com/areal-project/AReaL) 与 [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) 最有可能随着推理模型成熟，催生开源 agent 的下一波能力跃迁。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*