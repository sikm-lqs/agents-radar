# AI 开源趋势日报 2026-09-15

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-14 23:30 UTC

---

# AI 开源趋势报告 — 2026-09-15

**筛选说明：** 以下项目被排除在趋势榜之外（属非 AI 项目）：[localsend](https://github.com/localsend/localsend)、[vaultwarden](https://github.com/dani-garcia/vaultwarden)、[ever-gauzy](https://github.com/ever-co/ever-gauzy)、[opendisplay](https://github.com/peetzweg/opendisplay)、[flowsint](https://github.com/reconurge/flowsint)、[project-nomad](https://github.com/Crosstalk-Solutions/project-nomad)（AI 为可选项，并非核心）。[cs-video-courses](https://github.com/Developer-Y/cs-video-courses) 和 [netdata](https://github.com/netdata/netdata) 从主题检索结果中排除（AI 相关性较弱）。共保留 88 个 AI 相关项目。

---

## 1. 今日要点

今日最大主线是 **本地优先 AI（local-first AI）**：[VoiceStudio](https://github.com/debpalash/VoiceStudio)（+2,774）与 [colibri](https://github.com/JustVugg/colibri)（+2,233）——一款完全本地运行的 ElevenLabs 替代品，以及一款纯 C 实现的 MoE 推理引擎——是今日 AI 涨幅榜前两名，两者都承诺前沿能力、零 API 费用。[Alibaba 的 open-code-review](https://github.com/alibaba/open-code-review)（+1,796) 验证了 **确定性规则 + LLM 智能体混合架构** 在企业代码评审中的可行性。[system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)（+770）表明，针对 GPT-6-Astra、Claude Fable 5.1/Opus 5、Gemini 3.8 的提示词情报研究正在成为主流竞争情报。同时主题搜索数据揭示出 **智能体 harness / skills 经济** 的规模化扩张：[ECC](https://github.com/affaan-m/ECC)（258k stars）和 [hermes-agent](https://github.com/NousResearch/hermes-agent)（245k）构成了一层新的战场，技能、记忆与 token 压缩成为新的争夺焦点。

---

## 2. 分类热门项目

### 🔧 AI 基础设施

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+2,233) | 纯 C、零依赖的 MoE 推理引擎，从磁盘流式加载专家权重，在自有硬件上运行前沿模型。今日 AI 趋势涨幅榜 #1——极致本地优先工程。 |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Go | 0 (+1,796) | 混合式代码评审平台，将确定性规则流水线（NPE、XSS、SQLi）与 LLM 智能体结合，提供行级注释；已在阿里规模下实战验证。今日 +1,796 体现企业对"非幻觉"LLM 工具的强烈需求。 |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,957 | Kimi、GLM、MiniMax、DeepSeek、gpt-oss、Qwen、Gemma 的事实标准本地运行时。其模型列表表明中国开源权重已成为本地技术栈的默认底座。 |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,847 | 一体化桌面管理器，统一管理 Claude Code、Codex、OpenCode、OpenClaw、Grok Build 与 Hermes Agent。132k stars 标志着多智能体协同工作流已走向主流。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,386 | 单文件 CLI 代理，可在常见开发命令上削减 60–90% 的 LLM token 消耗。Token 经济性已成为一等公民基础设施。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 72,135 | 在 LLM 接收前压缩工具输出、日志与 RAG 切片——JSON 场景下 token 削减 60–95%，"答案不变"。提供库、代理与 MCP 服务器三种形态。 |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 66,169 | MIT 协议的 AI 网关：352 个提供方（150+ 免费）、1,200+ 模型，感知配额自动切换，由 550+ 贡献者共建。编码智能体的"反锁定"路由层。 |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,956 | 大模型与多模态模型的高性能服务框架——智能体强化学习与推理栈之下的服务底座。 |

### 🤖 AI 智能体 / 工作流

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 258,380 | 智能体 harness 性能层——技能、本能、记忆、安全——覆盖 Claude Code、Codex、Opencode、Cursor。整个数据集中 stars 最高：社区价值正在向 harness 层汇聚。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,508 | 来自开源权重实验室的"与你共同成长的智能体"。其插件经济已上线——[oh-my-hermes](https://github.com/rlaope/oh-my-hermes)（记忆 + 工作流包）今日登上趋势榜（+52）。 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,310 | 公平代码（Fair-code）工作流自动化，原生支持 AI，集成 400+ 服务，支持自托管。连接经典自动化与智能体工作流的桥梁。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,728 | 智能体工作流 + RAG 流水线构建器，跨云/VPC/自托管的多模型工具支持。从原型到生产，无需重构技术栈。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,333 | 现在自我定位为"智能体工程平台"——从 LLM 框架到智能体编排，这是一次颇具意味的品牌重定位。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,626 | 驱动真实浏览器的智能体；computer-use / web-agent 能力的参考实现。 |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 0 (+640) | 一条 CLI 赋予智能体在 Twitter、Reddit、YouTube、GitHub、Bilibili、小红书上的读/搜能力——零 API 费用。今日 +640 反映了对廉价智能体感知层的强烈需求。 |
| [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) | TypeScript | 0 (+506) | 为 Antigravity、Claude Code、Cursor、Copilot 提供经过验证的安全技能注册表。今日 +506——供应链信任正成为技能经济尚未解决的卡脖子问题。 |

### 📦 AI 应用

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) | Python | 0 (+2,774) | 完全本地运行的 ElevenLabs 替代品：声音克隆、声音设计、视频配音、听写、有声书，覆盖 646 种语言。今日以巨大优势领跑 AI 涨幅榜。 |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | 0 (+770) | 定期更新的系统提示词提取合集，覆盖 Claude Fable 5.1/Opus 5、GPT-6-Astra/Codex、Gemini 3.8 Flash/3.1 Pro/Antigravity、Grok、Kimi。今日 +770——提示词考古已成为标准竞争情报。 |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | 106,084 (+756) | 多智能体 LLM 金融交易框架。趋势榜与主题搜索双榜入围；金融仍是智能体最热门的垂直领域。 |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | 0 (+606) | 精选的攻防安全技能（SQLi → shellcode → EDR 绕过），打包为 Claude skills 系统的 SKILL.md 格式。今日 +606——安全从业者是技能格式的早期采用者。 |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | 0 (+578) | YuE2 前沿音乐生成，具备符号规划、零样本翻唱与智能体化编辑。符号规划是与端到端音频模型的显著差异化点。 |
| [666ghj/MiroFish](https://github.com/666ghj/MiroFish) | Python | 0 (+524) | "简洁通用的群体智能引擎，预测一切"——将群体智慧聚合作为预测服务；这是一条与众不同的集体智能方向。 |
| [ruvnet/RuView](https://github.com/ruvnet/RuView) | Rust | 0 (+370) | 将普通 WiFi 信号转化为空间智能、生命体征监测与存在检测——无需摄像头像素。RF 感知 ML 是趋势榜上罕见的新面孔。 |
| [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) | Python | 0 (+204) | VoxCPM2：无 tokenizer 的多语言 TTS，支持创造性声音设计与逼真克隆。与 VoiceStudio 搭档，构成完整的本地语音技术栈。 |

### 🧠 LLM / 训练

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,954 (+528) | SOTA 文本/视觉/音频/多模态训练与推理的模型定义框架。历经多年仍在趋势榜（+528）——生态的基石。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,167 | 本地 UI，用于运行与训练 LLM / 扩散模型（GGUF、MLX），首发即支持 Qwen3.8、DeepSeek-V4、MiniMax-H3、Gemma 4——是判断哪些开源权重真正重要的可靠代理指标。 |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,800 | 训练与服务栈底层使用的分布式 AI 计算引擎，OpenRLHF 等亦基于其上。低调却不可或缺的基础设施。 |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,113 | 微软推出的"点亮 AI 智能体的绝对训练器"——大厂在智能体 RL 后训练领域的重磅押注。 |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,718 | Agent Reinforcement Trainer，将 GRPO 应用于多步、实战中的智能体训练，覆盖 Qwen3.6、GPT-OSS、Llama。 |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 10,006 | 可扩展的智能体强化学习框架（PPO、DAPO、REINFORCE++、VLM），基于 Ray + vLLM 异步流水线构建。 |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,758 | 连接 LLM 智能体应用与强化学习的"RL 桥梁"——与上述项目共同构成一个值得关注的四项目智能体 RL 集群。 |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,439 | ReLE 评测，覆盖 374 个模型（GPT-5.4、Gemini-3.1-pro、Claude-4.6、GLM-5.1、DeepSeek-V4），并附带 2M+ 条模型缺陷数据库，供社区研究使用。 |

### 🔍 RAG / 知识

| 项目 | 语言 | Stars（总数 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,738 | 将代码库、文档、SQL schema 与 PDF 转化为可查询的知识图谱，适配 Claude Code/Cursor/Codex/Gemini CLI——确定性 AST 解析，每条边均可解释，明确**不使用向量库**。116k stars 是对"仅靠 embedding 的 RAG"的一次投票否定。 |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 62,021 | 直接为 LLM 与 AI 编辑器提供最新的代码文档，从源头解决训练数据过时问题。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,350 | 隐私优先、自托管的知识工作区，专为人–智能体协作设计——围绕智能体重构的个人知识管理。 |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,426 | 本地优先的代码智能图谱（MCP + CLI），让 AI 工具只读取必要内容，在大型仓库评审中具备基准化的上下文削减能力。 |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,330 | MCP 工具包，为智能体提供代码层面的语义检索与编辑能力——"智能体专属的 IDE"。 |

*\*注：趋势榜条目在源数据中"总 stars"显示为 0；今日增量见括号内。同时出现于两个来源的项目（transformers、TradingAgents），其总数与增量按原样合并。*

---

## 3. 趋势信号分析

**爆炸性关注：本地优先 AI。** 今日涨幅榜前列——VoiceStudio（+2,774）、colibri（+2,233）、Agent-Reach（"零 API 费用"）、VoxCPM——共享一个命题：前沿能力跑在你自己的硬件上，无订阅。Colibri 的纯 C、磁盘流式 MoE 专家加载是技术表达上最激进的方案，实际上将 DeepSeek 式稀疏架构的商品化推进到了消费级机器。

**Harness / skills 经济正在整合。** ECC（258k）、hermes-agent（245k）、cc-switch（132k），加上登榜的 skills 项目（agent-skills +506、Claude-Red +606、oh-my-hermes），表明 skills 正成为跨 Claude Code、Codex、Cursor、Antigravity 的可移植能力标准。值得注意的是，今日新进 Top 项目以 *安全与验证* 为核心叙事——这是 skills 层的供应链问题表达。

**首次出现的方向：** (1) 确定性规则 + LLM 混合流水线（Alibaba 的 +1,796）；(2) 知识图谱取代向量检索用于代码上下文（graphify 以 116k 明确拒绝向量库）；(3) 一个显著的智能体 RL 集群（agent-lightning、ART、AReaL、OpenRLHF）；(4) RF/WiFi 感知（RuView）。

**模型发布关联性：** system_prompts_leaks 收录了 GPT-6-Astra、Claude Fable 5.1/Opus 5、Gemini 3.8 的提示词——前沿模型竞争直接催生提示词情报需求。中国开源模型（DeepSeek-V4、Qwen3.8、Kimi K2.6、GLM-5.1、MiniMax-H3）已成为 ollama、unsloth、OmniRoute 的默认底座，这也解释了为何 colibri 这类本地 MoE 工具现在涌现。

---

## 4. 社区热点

- **Agent skills 成为新的插件标准** — [ECC](https://github.com/affaan-m/ECC)（258k）、[agent-skills](https://github.com/tech-leads-club/agent-skills)、[Claude-Red](https://github.com/SnailSploit/Claude-Red)、[distilly](https://github.com/titanwings/distilly)：SKILL.md 格式正在跨智能体通用；验证与安全仍是尚未解决的缺口，也是机会所在。
- **Token 经济工具** — [rtk](https://github.com/rtk-ai/rtk)、[headroom](https://github.com/headroomlabs-ai/headroom)、[OmniRoute](https://github.com/diegosouzapw/OmniRoute)、[codeburn](https://github.com/getagentseal/codeburn)：随着智能体循环将消耗放大 10–100×，压缩与路由层成为高杠杆的"铲子"生意。
- **本地语音技术栈** — [VoiceStudio](https://github.com/debpalash/VoiceStudio) + [VoxCPM](https://github.com/OpenBMB/VoxCPM)：一套完整、免费的 ElevenLabs 替代方案正在成形；关注 colibri 的磁盘流式专家加载技术，它是文本之外本地 MoE 的使能者。
- **智能体 RL 后训练** — [agent-lightning](https://github.com/microsoft/agent-lightning)、[ART](https://github.com/OpenPipe/ART)、[AReaL](https://github.com/areal-project/AReaL)：微软与初创公司在面向多步智能体的 GRPO 式训练上趋于收敛；很可能是下一轮框架之争的主战场。
- **基于图的代码知识** — [graphify](https://github.com/Graphify-Labs/graphify)、[code-review-graph](https://github.com/tirth8205/code-review-graph)、[serena](https://github.com/oraios/serena)：确定性、可解释的图正在取代向量 RAG，成为代码库上下文的事实标准——这是一次持久的架构转向。

---

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*