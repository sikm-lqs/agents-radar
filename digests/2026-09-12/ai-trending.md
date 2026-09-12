# AI 开源趋势日报 2026-09-12

> 数据来源: GitHub Trending + GitHub Search API | 生成时间: 2026-09-12 11:30 UTC

---

# AI 开源趋势报告 — 2026-09-12

## 1. 今日速览

今日热榜被**深入垂直领域的自主 AI Agent**占据：[CloddsBot](https://github.com/alsk1992/CloddsBot)（+626 ⭐）覆盖 1000+ 预测市场/DEX,并搭载 Agent 商务支付协议;[vxcontrol/pentagi](https://github.com/vxcontrol/pentagi)（+250 ）提供全自动渗透测试能力;[melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM)（+152 ⭐）面向 WhatsApp 销售场景推出 AI 原生 CRM。**Claude 的 Skills 生态正在爆发**——[SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red)（+99 ⭐）整合了安全攻击方向的 Skills,而 [awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps)（+237 ⭐）则精选了 100+ Agent / RAG 应用。两个值得关注的信号:[multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE)（+193 ⭐）在前沿音乐生成中引入了 Agent 式编辑流程,而 [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)（+216 ⭐）则曝光了 Claude 5.1、GPT-6-Astra、Gemini 3.8 与 Grok 的泄露系统提示词,折射出"透明化/可基准化"的细分趋势。综合来看,**Agent 脚手架工程 + Skills 市场**是今天最热的微观趋势。

---

## 2. 各类别头部项目

### 🔧 AI 基础设施

| 项目 | 语言 | Stars（总星 / 今日） | 简介 |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,720 | 事实上的本地 LLM 运行器,现已支持 Kimi-K2.6、GLM-5.2、DeepSeek、gpt-oss 与 Qwen3;仍是自托管推理的首选入口。 |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,157 | 覆盖文本/视觉/音频/多模态训练与推理的基础模型定义框架,生态引力中心地位不变。 |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,184 | 重新定位为"Agent 工程平台",整合编排、评估与部署,是生产级 Agent 栈的骨架。 |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,046 | 单二进制 Rust CLI 代理,在常见开发命令场景下压缩 LLM token 消耗 60–90%,直击成本痛点。 |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,055 | 本地化 UI,用于微调与部署 LLM/扩散模型（Qwen3.8、DeepSeek-V4、FLUX）;低显存训练场景的热门选择。 |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 65,074 | MIT 协议的 AI 网关,统一入口对接 352 家服务商 / 1,200+ 模型,具备配额感知自动回退与 RTK token 压缩,开箱兼容 Claude Code/Cursor。 |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,785 | 分布式 AI 计算引擎,同时支撑训练与在线推理;为众多 |

---
*本日报由 [agents-radar](https://github.com/sikm-lqs/agents-radar) 自动生成。*