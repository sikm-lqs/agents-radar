# AI 开源趋势日报 2026-09-08

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-08 11:30 UTC

---

# AI 开源趋势报告 — 2026-09-08

## 步骤 1 — AI 相关性筛选

**作为非 AI 项目排除**(尽管出现在趋势/主题列表中,实为通用工具):[MoonTechLab/LunaTV](https://github.com/MoonTechLab/LunaTV)(视频流聚合)、[viarotel-org/escrcpy](https://github.com/viarotel-org/escrcpy)(Android 投屏)、[Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide)(面试指南)、[Developer-Y/cs-video-courses](https://github.com/Developer-Y/cs-video-courses)(计算机科学课程列表)、[medusajs/medusa](https://github.com/medusajs/medusa)(电商平台,仅是面向 Agent 的品牌包装)、[netdata/netdata](https://github.com/netdata/netdata)(可观测性工具,与 MCP 相邻但非 AI 核心)。

**去重合并**:[affaan-m/ECC](https://github.com/affaan-m/ECC) 与 [browser-use/browser-use](https://github.com/browser-use/browser-use) 同时出现在两个列表中——已合并(总数 + 当日增量)。

---

## 1. 今日亮点

Agent **"skills"** 是今天最出圈的故事:16 个趋势仓库中有 9 个是技能包或 harness 配置,由 [affaan-m/ECC](https://github.com/affaan-m/ECC)(+1,897)和 OpenAI 官方的 Codex [skills](https://github.com/openai/skills) 目录(+351)领跑,同列的还有 [plugins](https://github.com/openai/plugins)。面向 Agent 的设计类内容正在激增——[diagram-design](https://github.com/cathrynlavery/diagram-design)(+1,070) 与 HeyGen 的 [hyperframes](https://github.com/heygen-com/hyperframes)(+474) 将 Agent 视为一等渲染目标。Token/上下文经济栈持续叠加:[markitdown](https://github.com/microsoft/markitdown)(+886)、[context-mode](https://github.com/mksglu/context-mode)、[rtk](https://github.com/rtk-ai/rtk)、[headroom](https://github.com/headroomlabs-ai/headroom)。[AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge)(+517) 印证金融仍是群体 Agent 最热的垂直领域;而一份 [基于 Karpathy LLM 陷阱观察衍生而来的 CLAUDE.md](https://github.com/multica-ai/andrej-karpathy-skills) 单日获得 +325 stars,说明思想领袖本身就是一种分发渠道。

---

## 2. 各类别顶级项目

### 🔧 AI 基础设施

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,451 | Kimi-K2.6、GLM-5.2、DeepSeek、gpt-oss、Qwen、Gemma 的本地运行时。仍是本地运行开源权重模型的默认入口。 |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 131,680 | Claude Code、Codex、OpenCode、OpenClaw、Grok Build 与 Hermes Agent 的一体化桌面管理器。131k stars 量化了多 CLI Agent 套装的主流化程度。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,397 | 单二进制 CLI 代理,在常见开发命令上削减 60–90% 的 LLM token 消耗。高速增长的"上下文经济"工具链的锚点。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 70,486 | 在工具输出、日志、文件与 RAG 分块抵达 LLM 之前进行压缩(JSON 上减少 60–95% token)。同时提供库、代理与 MCP server 三种形态。 |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,739 | 分布式 AI 计算引擎,附带加速 ML 工作负载的库。训练/服务流水线的标准底座。 |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,632 | LLM 与多模态模型的高性能服务框架。在开源模型流量规模化下押注推理层的代表。 |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | — (+96 today) | 沙箱化工具输出(削减 98%)、持久化会话记忆,并通过 MCP + hooks 在 17 个平台间强制路由。今日热门的上下文优化新晋条目。 |
| [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser) | JavaScript | — (+135 today) | 隐身无头浏览器,可直接替换 Puppeteer/Playwright,绕过 Cloudflare 与机器人检测。预示着 Agent 与反 Bot 之间正在形成军备竞赛。 |

### 🤖 AI Agent / 工作流

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 253,591 (+1,897) | 覆盖 Claude Code、Codex、Opencode、Cursor 的 skills、instincts、memory、security 的 Agent harness 性能系统。今日最大涨幅,技能浪潮的旗舰项目。 |
| [openai/skills](https://github.com/openai/skills) | Python | — (+351 today) | OpenAI 官方的 Codex Skills 目录。官方对 skills 格式的认证,需密切关注其是否成为事实上的打包标准。 |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | — (+446 today) | "真正能用"的 Agentic skills 框架与软件开发方法论。许多 skill 包在其之上构建,是社区的参考实现。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 113,046 (+330) | 让网站对 AI Agent 可访问,用于在线自动化。Agent 浏览成为最热门的交互界面,该项目再次登榜趋势。 |
| [titanwings/distilly](https://github.com/titanwings/distilly) | TypeScript | 24,432 | 将"它们的思考方式"提炼为可复用的 Skills,适用于任何 Agent 或 Bot。24k stars 显示出对 skill 创作与迁移工具的真实需求。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 243,232 | 通过累积 skills 与 memory 实现"与你共同成长的 Agent"。开源界规模最大的 Agent 仓库之一。 |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,710 | Fair-code 工作流自动化,原生支持 AI 与 400+ 集成。连接 Agent 与企业系统的桥梁。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 145,926 | 自称的"agent 工程平台"。尽管 skills 新势力崛起,它仍是被依赖最多的 Agent 框架。 |

### 📦 AI 应用

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | — (+1,070 today) | 38 种编辑级图表类型,以独立 HTML+SVG 呈现,面向 Claude Code、Codex 与 Pi("告别 Mermaid 垃圾")。今日涨幅第二高——Agent 级设计资产已成一类品类。 |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | — (+474 today) | 写 HTML,渲染视频——由商业视频公司 HeyGen 明确为 Agent 而建。首个严肃的"Agent 原生视频流水线"尝试。 |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | JavaScript | — (+580 today) | 面向 Claude Code 与 AI Agent 的营销技能(CRO、文案、SEO、增长分析)。垂直化 skill 包的模板。 |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | — (+517 today) | 借助群体智能在数分钟内搭建用于分析、风控与执行的自主对冲基金。印证金融是今日最热的 Agentic 垂直领域。 |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,306 | 默认的自托管 LLM 界面(兼容 Ollama/OpenAI)。本地优先 AI 运动的稳定锚点。 |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,476 | 通过 LLM 工作流一键从主题生成高清短视频。hyperframes 式 Agent 媒体流水线的先驱。 |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 52,979 | 将文档或主题转化为原生 PowerPoint 演示稿,含图表、动画与解说。文档生成垂直领域持续叠加。 |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,506 | 编码 CLI 内的本地 AI 求职助手:扫描招聘网站、评分职位、定制简历、追踪申请。是 Agent CLI 作为个人后台的典范。 |

### 🧠 LLMs / 训练

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,981 | 面向 SOTA 文本、视觉、音频与多模态训练/推理的模型定义框架。开源 ML 持久的底座。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,808 | 本地 UI 运行与训练 LLMs 及扩散模型(GGUF、MLX、Qwen3.8、DeepSeek-V4、MiniMax-H3、FLUX)。消费级 GPU 微调已成主流。 |
| [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) | Python | 45,239 | 面向 AI Agent 设计原则与工程实践的开源书籍,每章配套代码。45k stars 显示出巨大的教育需求。 |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,223 | 开源金融 LLMs,并已发布训练后的权重。与今日 Agentic 金融浪潮直接呼应。 |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,027 | "点亮 AI Agent 的绝对训练器"——面向 Agent 工作负载的 RL 训练。前沿正从提示 Agent 转向训练 Agent。 |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,427 | 评估 374 个模型(GPT-5.4、Gemini 3.1 Pro、Claude 4.6、Qwen3.6、DeepSeek-V4、GLM-5.1……)及 200 万实例的缺陷库。描绘当前模型格局的最佳单图。 |
| [wandb/wandb](https://github.com/wandb/wandb) | Python | 11,247 | 实验追踪与微调管理平台。训练工作流的标准 MLOps 搭档。 |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,737 | 面向 LLM Agent 应用的 RL 桥梁。规模小但方向重要,与 agent-lightning 并行。 |

### 🔍 RAG / 知识

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 177,847 | 用于规模化搜索、抓取与交互 Web 的上下文 API。RAG 与 Agent 的事实上的数据前端。 |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 115,867 | 通过 Claude Code/Cursor/Codex 技能,将代码库、文档、SQL 与 PDF 转化为可查询的知识图谱——确定性 AST 解析,无需向量库。115k stars 背后是"图谱优于向量"的鲜明定位。 |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | — (+886 today) | 将文件与办公文档转换为 Markdown,供 LLM 摄取。低调却不可或缺——今日 +886 stars。 |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 79,298 | 从单次请求到全规模爬取的自适应 Web 抓取。firecrawl 的韧性爬虫对应物。 |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,232 | 隐私优先的自托管知识工作区,人与 AI Agent 协作其中。本地知识 + Agent 访问是经久不衰的组合。 |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,022 | 赋予 Agent 对代码进行语义检索与编辑的 MCP 工具包——"你 Agent 的 IDE"。检索正从嵌入向量转向语义代码理解。 |

*注:趋势列表中的行在源数据中显示 ⭐0 总数(显示伪影);"— (+N)" 表示仅有今日增量。*

---

## 3. 趋势信号分析

**爆炸性品类:Agent skills 层.** 16 个趋势仓库中有 9 个是 skills 包、harness 预设或 Agent 行为配置——ECC (+1,897)、diagram-design (+1,070)、marketingskills (+580)、superpowers (+446)、i-have-adhd (+422)、openai/skills (+351)、karpathy-skills (+325)、hyperframes、context-mode。随着 OpenAI 如今为 Codex 发布官方 skills 与 plugins 仓库,skills 已演变为这一周期的 plugin 经济:微小的 markdown/HTML 工件,在 Claude Code、Codex、Cursor 与 Opencode 之间移植能力,极低的创作成本带来了极端的 star 增速。

**新栈涌现。** 首先,上下文/token 经济正在整合为"度量→压缩→路由"流水线:codeburn(跨 37 个工具追踪开销)、context-mode(削减 98% 工具输出)、rtk 与 headroom(60–95% 压缩)、caveman(通过输出风格节省 65%)、OmniRoute(352 家提供商)。其次,Agent 作为渲染目标:hyperframes(HTML→视频)与 diagram-design 将 ppt-master 的模式扩展到 Agent 原生的媒体生产。第三,Agent 的隐身浏览:camofox 的反 Bot 绕过与 browser-use 共同将一场对抗反爬厂商的军备竞赛制度化。第四,自演化 Agent(GenericAgent 的技能树、evolver 的可审计基因/事件演化、hermes-agent)正从 Demo 走向框架。

**与模型发布的联动。** 仓库描述中如今频繁出现 GPT-5.4、Gemini 3.1 Pro、Claude 4.6、DeepSeek-V4、Qwen3.6、GLM-5.x、Kimi-K2.6 与 MiniMax-M2.7——多模型工具链(cc-switch 131k;OmniRoute 的 1,200+ 模型)的存在正是因为没有单一实验室能够通吃。围绕 prefix-cache 稳定性展开的 DeepSeek-Reasonix 工程实践表明,推理成本特性正在直接塑造 Agent 设计。与此同时,Agent-RL 项目(agent-lightning、AReaL)预示下一波能力跃迁将来自训练循环,而非更长的 Prompt。

---

## 4. 社区热点

- **Skills"应用商店"之争**——[openai/skills](https://github.com/openai/skills)(+351) 对 [obra/superpowers](https://github.com/obra/superpowers)(+446) 对 [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills)(46,148;2,100+ skills 目录)。谁统一 skill 打包格式,谁就赢得 Agent 分发;[karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) 表明"方法论即 Skill"是一个可行的品类。
- **上下文经济**——[rtk](https://github.com/rtk-ai/rtk)、[headroom](https://github.com/headroomlabs-ai/headroom)、[context-mode](https://github.com/mksglu/context-mode)、[codeburn](https://github.com/getagentseal/codeburn)、[OmniRoute](https://github.com/diegosouzapw/OmniRoute):token 的度量/压缩/路由正成为 Agent 团队的默认 CI——同时也是一门生意。
- **面向 Agent 的隐身 Web 访问**——[camofox-browser](https://github.com/jo-inc/camofox-browser)(+135) 对 [browser-use](https://github.com/browser-use/browser-use)(113,046)、[AIHawk](https://github.com/feder-cr/AIHawk)(30,322)、[firecrawl](https://github.com/firecrawl/firecrawl) 与 [Scrapling](https://github.com/D4Vinci/Scrapling)。预计反 Bot 措施与合规审查将持续升级。
- **Agentic 金融**——[AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge)(+517)、[HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)(33,032)、[daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis)(64,777)。散户自主交易加速叠加;风控成熟度则相对滞后。
- **自演化 + 本地化 Agent**——[hermes-agent](https://github.com/NousResearch/hermes-agent)(243,232)、[GenericAgent](https://github.com/lsdefine/GenericAgent)(14,142)、[evolver](https://github.com/EvoMap/evolver)(9,101)、[CowAgent](https://github.com/zhayujie/CowAgent)(46,829),以及 [superpowers-zh](https://github.com/jnMetaCode/superpowers-zh)(8,023) 显示一个平行的中文 skills 生态正在形成。

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*