# AI 开源趋势日报 2026-09-10

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-09 23:30 UTC

---

# AI 开源趋势报告 — 2026-09-10

**筛选说明（步骤一）：** 尽管带有相关主题标签或出现在热门榜单中，以下非 AI 项目已被排除：`liquidslr/system-design-notes`（读书笔记）、`Snailclimb/JavaGuide`（Java 面试指南）、`Developer-Y/cs-video-courses`（课程列表）、`netdata/netdata` 与 `D4Vinci/Scrapling`（通用基础设施/爬虫）、`medusajs/medusa`（电商平台）。最终保留约 85 个 AI 相关项目；下文按类别选取热度最高的项目。

---

## 1. 今日要点

今天的 AI 头条是**智能体"skills（技能）"经济走向主流**：[i-have-adhd](https://github.com/ayghri/i-have-adhd)（一个防止编码智能体把答案"埋起来"的技能）以 +4,624 stars 成为今日 AI 项目涨幅第一，[diagram-design](https://github.com/cathrynlavery/diagram-design) 以 +2,286 紧随其后。[affaan-m/ECC](https://github.com/affaan-m/ECC) 自称"agent harness 性能优化系统"，总 stars 已达 255,144——是整个数据集之最——今日仍新增 +1,151；[NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)（243,850）紧随其后。官方生态动作同样登场：[openai/plugins](https://github.com/openai/plugins)（+505）与腾讯的 [teamai-cli](https://github.com/Tencent/teamai-cli)（+563）双双上榜。最后，[awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2)（+612）与 [TradingAgents](https://github.com/TauricResearch/TradingAgents)（+367）的回归，直接把今日的热度与 GPT-Image-2 的发布以及持续升温的 agentic finance（智能体金融）赛道挂钩。

---

## 2. 各类别热门项目

### 🔧 AI 基础设施

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,531 | Kimi-K2.6、GLM-5.2、DeepSeek、gpt-oss、Qwen、Gemma 等模型的本地运行时。仍然是本地 LLM 的默认入口；它的模型列表就是开放权重前沿的实时索引。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,044 | 覆盖文本、视觉、音频与多模态训练/推理的 SOTA 模型定义框架。整个生态的基础依赖。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,708 | 单文件 CLI 代理，在常见开发命令上将 LLM token 消耗削减 60–90%，零依赖。是新兴"token 经济"基础设施层的典型代表。 |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,078 | 在工具输出、日志、文件与 RAG 片段送入 LLM 之前先做压缩——JSON 场景下削减 60–95% 的 token 且答案不变。以库、代理与 MCP server 三种形态分发。 |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,713 | 大语言与多模态模型的高性能推理框架。随着智能体负载规模化，推理吞吐仍是关键瓶颈。 |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | TypeScript | — (+563) | 腾讯推出的 CLI，让工程团队"AI native"。大型科技公司入局团队采用工具的标志性产品，上线首日即登榜。 |
| [openai/plugins](https://github.com/openai/plugins) | JavaScript | — (+505) | OpenAI 官方插件仓库。一手信号，表明插件市场正重新围绕厂商生态进行整合。 |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | — (+393) | 本地优先的 AI 编码智能体桌面端：Electron + Rust 宿主核心 + "pi" agent harness + 用户可安装插件。今日凭借"本地优先/桌面形态"的角度上榜。 |

### 🤖 AI 智能体 / 工作流

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,144 (+1,151) | 为 Claude Code、Codex、Opencode 与 Cursor 打包 skills、本能、记忆与安全的 agent harness 性能系统。数据集中 star 数最高，仍保持日增 1k+。 |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 243,850 | "与你共同成长的智能体"——Nous Research 出品的个人智能体。"个人智能体"定位在原生 star 数上跑赢通用框架。 |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,238 | 最早的自主智能体项目，如今被重新定位为普惠的 AI 工具。焦点转向 harness 的当下，惯性与品牌力让它稳居顶流。 |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,239 | 在同一协作空间内同时承载智能体工作流与 RAG 流水线，支持云端/VPC/自托管部署。产品团队可视化搭建智能体的默认选择。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,023 | 如今定位为"agent 工程平台"。从链式调用库成功转型为智能体平台。 |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 113,957 | 操作真实浏览器的智能体。浏览器控制已成为公认的智能体基本能力，而这是参考实现。 |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | — (+4,624) | 让编码智能体不再把答案"埋起来"的 skill——ADHD 友好的输出风格。今日 AI 涨幅第一，领先优势明显；证明 skills 市场奖励"输出体验

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*