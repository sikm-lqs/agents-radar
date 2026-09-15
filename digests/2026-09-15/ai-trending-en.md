# AI Open Source Trends 2026-09-15

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-15 11:30 UTC

---

# AI Open Source Trends Report — September 15, 2026

**Sources:** GitHub Trending (today, 14 repos) + AI Topic Search (83 repos, last 7 days). Non-AI entries filtered out: `ever-gauzy` (ERP/CRM), `Homebrew/BrewUI` (macOS GUI), `ghidra` (reverse engineering), `omniget` (media downloader), `medusa` (commerce platform), `cs-video-courses` (lecture list). ASC retained as agent-facing tooling.

---

## 1. Today's Highlights

[VoiceStudio](https://github.com/debpalash/VoiceStudio) leads all AI repos with **+2,776 stars today**, positioning itself as a fully-local, open-source ElevenLabs alternative spanning voice cloning, dubbing, and transcription in 646 languages. [colibri](https://github.com/JustVugg/colibri) (+2,173) revives the minimalist-runtime tradition with a zero-dependency pure-C engine that streams MoE experts from disk to run frontier sparse models on consumer hardware. Alibaba entered AI code review with [open-code-review](https://github.com/alibaba/open-code-review) (+1,571), pairing deterministic rule pipelines with an LLM agent for precise line-level findings. Agent operations is maturing fast: [atlas](https://github.com/pacifio/atlas) (+1,091) provides source control across multiple coding agents, while [OpenResearch](https://github.com/alphaXiv/OpenResearch), [pi](https://github.com/earendil-works/pi), and [agent-skills](https://github.com/addyosmani/agent-skills) deepen the harness ecosystem. Ten of fourteen trending repos are AI-related — and across the topic search, agent harnesses, MCP, and RL training dominate all activity.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+2,173) | Zero-dependency, pure-C inference engine that runs frontier MoE models by streaming experts from disk on hardware users already own. Today's second-highest AI gainer signals strong appetite for minimalist runtimes built for the sparse-model era. |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Go | 0 (+1,571) | Battle-tested hybrid code-review tool: deterministic rule pipelines plus an LLM agent for line-level comments (NPE, thread-safety, XSS, SQL injection), OpenAI/Anthropic-compatible. +1,571 stars on its trending day shows enterprise-backed AI dev tooling draws instant trust. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 181,018 | The de-facto local runtime for Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen and Gemma. Rapid support for each new open-weight release keeps it the front door to local LLMs. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,964 | Cross-platform desktop all-in-one for Claude Code, Codex, OpenCode, OpenClaw, Grok Build and Hermes Agent. 132,964 stars show that juggling multiple coding-agent subscriptions is now a mainstream daily workflow. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,454 | Single-binary CLI proxy that cuts LLM token consumption 60–90% on common dev commands. At 80,454 stars, token economics has become a first-class infrastructure concern. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 72,247 | Compresses tool outputs, logs, files and RAG chunks before they reach the LLM — 20% fewer tokens for coding agents, 60–95% for JSON, same answers. Ships as library, proxy and MCP server; complements rtk as the "context firewall" layer. |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 66,393 | MIT-licensed AI gateway: one endpoint, 352 providers (150+ free), 1,200+ models, quota-aware auto-fallback and built-in compression. 550+ contributors make it the open router of the agentic coding era. |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,982 | High-performance serving framework for large language and multimodal models. A staple choice for teams pushing inference throughput in production. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 258,712 | The agent harness performance optimization system — skills, instincts, memory, security and research-first development layered onto Claude Code, Codex, Opencode and Cursor. The most-starred repo in today's dataset; evidence the harness is the new battleground. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,690 | "The agent that grows with you" — the most-followed purpose-built agent project. Signals that persistent, self-improving personal agents remain the ecosystem's north star. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,361 | Fair-code workflow automation with native AI, 400+ integrations and self-hosting. The bridge where traditional automation audiences meet agentic AI. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,360 | The original autonomous-agent project, still among the most-starred AI repos. Functions as the longevity benchmark for the category it created. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,797 | Collaborative workspace for agentic workflows and RAG pipelines, deployable on cloud, VPC or self-hosted. Remains the default "build agents visually" platform. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,692 | The canonical library for agents that drive a real browser. Anchors the web-automation and computer-use stack most agents build on. |
| [pacifio/atlas](https://github.com/pacifio/atlas) | Rust | 0 (+1,091) | "Source control for agents" — run multiple coding agents, track their changes and query them in one place. +1,091 stars today shows governance demand rising as multi-agent coding becomes routine. |
| [agentscope-ai/agentscope](https://github.com/agentscope-ai/agentscope) | Python | 31,704 | Framework for agents "you can see, understand and trust." Represents the observability-and-trust turn in agent framework design. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) | Python | 0 (+2,776) | Fully-local ElevenLabs alternative: voice cloning, voice design, video dubbing, dictation, transcription and audiobooks in 646 languages. Today's top AI gainer — local-first voice AI is having its breakout moment. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 152,119 | User-friendly AI interface supporting Ollama, OpenAI-compatible APIs and more. The default front end of the local-model movement. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 123,816 | One-click HD short-video generation from a topic or keyword via automated LLM workflows. Content automation remains one of the highest-demand consumer AI categories. |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | 106,486 | Multi-agent LLM financial trading framework. Confirms finance as the deepest vertical for agentic experimentation. |
| [koala73/worldmonitor](https://github.com/koala73/worldmonitor) | TypeScript | 86,322 | Real-time global intelligence dashboard combining AI news aggregation, geopolitical monitoring and infrastructure tracking. Shows "situational awareness" apps are a fast-growing consumer of LLM summarization. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,814 | AI productivity studio with smart chat, autonomous agents and 300+ assistants under unified frontier-model access. A desktop staple with sustained momentum. |
| [melgarafael/DeskcommCRM](https://github.com/melgarafarel/DeskcommCRM) | TypeScript | 0 (+408) | Self-hosted AI sales OS with native agents and WhatsApp (WAHA) — an open alternative to Kommo, Octadesk and Intercom; MCP-ready and multi-tenant. +408 today reflects the vertical "AI SaaS replacement" wave. |
| [danny-avila/LibreChat](https://github.com/danny-avila/LibreChat) | TypeScript | 0 (+286) | Multi-provider chat app with agents, MCP, skills and support for GPT-5, Claude, DeepSeek, Gemini and more. +286 today keeps this long-running self-hosted chat UI in steady demand. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 166,159 | The model-definition framework for state-of-the-art text, vision, audio and multimodal models, for inference and training. The foundational layer nearly everything else in this report builds on. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,193 | Local UI to run and train LLMs and diffusion models, already supporting Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4 and FLUX. Fast tracking of new open weights is making fine-tuning a desktop activity. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,808 | Distributed AI compute engine combining a core runtime with ML acceleration libraries. The backbone for scale-out training and agentic RL. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,252 | Open-source financial LLMs with trained weights released on Hugging Face. Establishes finance as a leading domain-specific model vertical. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,128 | Microsoft's "absolute trainer to light up AI agents." Marks big tech's serious entry into agent RL training. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,722 | Agent Reinforcement Trainer applying GRPO to multi-step agents — "on-the-job training" for Qwen3.6, GPT-OSS, Llama and more. RL is moving from chat models to tool-using agents. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 10,005 | Scalable, high-performance agentic RL framework (PPO, DAPO, REINFORCE++, VLM) built on Ray and vLLM. Core infrastructure for the post-training wave. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,442 | Continuously updated Chinese LLM evaluation covering 374 models — GPT-5.4, Gemini 3.1 Pro, Claude 4.6, DeepSeek-V4, Qwen3.6, GLM-5.1 and more — plus a 2M+ sample defect library. Useful ground truth for the current frontier generation. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,880 | Turns any codebase — docs, SQL schemas, configs, PDFs — into a queryable knowledge graph via a /graphify skill, using deterministic AST parsing with every edge explained and no vector store. Embodies the shift from embedding RAG to structured code knowledge. |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 62,044 | Up-to-date code documentation delivered to LLMs and AI code editors. Solves stale-docs hallucination and is widely embedded in agent setups. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,372 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. Personal knowledge management is being rebuilt around agents. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,451 | Local-first code intelligence graph for MCP and CLI that builds a persistent map of the codebase so AI tools read only what matters. Benchmarked context reductions on reviews and large-repo workflows. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,365 | MCP toolkit providing semantic retrieval and editing — "the IDE for your agent." Coding agents increasingly get their own dedicated retrieval layer. |

**Also on the radar** (cut by category caps): [letta](https://github.com/letta-ai/letta) (24,747 — stateful agent memory), [titanwings/distilly](https://github.com/titanwings/distilly) (24,759 — distills expert thinking into reusable skills), [HKUDS/DeepCode](https://github.com/HKUDS/DeepCode) (16,539 — harness and loop engineering), [Hmbown/Codewhale](https://github.com/Hmbown/Codewhale) (40,980 — Rust terminal coding agent), [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) (27,865), [earendil-works/pi](https://github.com/earendil-works/pi) (+437 today), [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) (+354 today), [firecrawl](https://github.com/firecrawl/firecrawl) (180,623 — web context API).

---

## 3. Trend Signal Analysis

The agent-harness economy is today's explosive center of gravity. Six of the ten AI repos on the trending list are tooling *around* coding agents rather than agents themselves: [open-code-review](https://github.com/alibaba/open-code-review) (+1,571) adds LLM-driven review, [atlas](https://github.com/pacifio/atlas) (+1,091) provides source control across agents, [OpenResearch](https://github.com/alphaXiv/OpenResearch) (+568) converts coding agents into research agents, while [pi](https://github.com/earendil-works/pi) (+437), [agent-skills](https://github.com/addyosmani/agent-skills) (+354) and [ASC](https://github.com/MG1937/ASC) (+122) extend the same stack. With [ECC](https://github.com/affaan-m/ECC) at 258,712 stars — the dataset's most-starred repo — community energy has shifted from building agents to skilling, operating and governing them.

Two new directions stand out. First, [colibri](https://github.com/JustVugg/colibri) re-architects local inference for the MoE era — pure C, zero dependencies, experts streamed from disk — a llama.cpp-style bet that frontier sparse models can run on hardware users already own. Second, "no-vector-store" knowledge graphs are challenging embedding RAG for code: [graphify](https://github.com/Graphify-Labs/graphify) (116,880) and [code-review-graph](https://github.com/tirth8205/code-review-graph) (31,451) rely on deterministic AST parsing with explained edges. A quieter third layer is context economics: [rtk](https://github.com/rtk-ai/rtk) claims 60–90% token cuts on dev commands, [headroom](https://github.com/headroomlabs-ai/headroom) 60–95% on JSON, and [codeburn](https://github.com/getagentseal/codeburn) meters spend across 37 tools.

The model-cycle linkage is direct. [chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) now tracks 374 models — GPT-5.4, Gemini 3.1 Pro, Claude 4.6, DeepSeek-V4, Qwen3.6, GLM-5.1, Kimi-K2.6 — while [ollama](https://github.com/ollama/ollama) and [OmniRoute](https://github.com/diegosouzapw/OmniRoute) already ship Kimi, GLM, MiniMax and DeepSeek support, and [unsloth](https://github.com/unslothai/unsloth) targets Qwen3.8, DeepSeek-V4, MiniMax-H3 and Gemma 4. Each open-weight drop instantly regenerates demand for gateways, harnesses and local runtimes. MCP has become default plumbing ([n8n](https://github.com/n8n-io/n8n), [dify](https://github.com/langgenius/dify), [open-webui](https://github.com/open-webui/open-webui), [DeskcommCRM](https://github.com/melgarafarel/DeskcommCRM), [serena](https://github.com/oraios/serena) all expose it natively), and Chinese-language localization of the harness stack ([superpowers-zh](https://github.com/jnMetaCode/superpowers-zh), [vibe-coding-cn](https://github.com/tradecatlabs/vibe-coding-cn)) shows the ecosystem globalizing in both directions.

---

## 4. Community Hot Spots

- **[JustVugg/colibri](https://github.com/JustVugg/colibri)** — Pure-C MoE runtime with disk-streamed experts (+2,173 today). If it holds up, it could do for sparse frontier models what llama.cpp did for dense LLMs; watch memory footprint vs. expert-load latency on consumer GPUs.
- **[debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)** — +2,776 stars/day for a fully-local voice stack (cloning, dubbing, 646 languages). The strongest signal yet that voice is the next modality to go local-first; expect a fine-tuned TTS/STT model ecosystem to form around it.
- **Agent ops: [pacifio/atlas](https://github.com/pacifio/atlas) + [alibaba/open-code-review](https://github.com/alibaba/open-code-review)** — Versioning and reviewing agent output is the missing trust layer for multi-agent teams; both surged today (+1,091 / +1,571). Expect "agent PR review" to become a standard CI stage.
- **Deterministic code knowledge: [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify), [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph)** — "No vector store" positioning plus benchmarked context reduction makes structured graphs a practical RAG alternative for monorepos; auditable, explainable edges matter for regulated teams.
- **Token economics stack: [rtk-ai/rtk](https://github.com/rtk-ai/rtk), [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom), [getagentseal/codeburn](https://github.com/getagentseal/codeburn)** — Measure first (codeburn), then compress (rtk, headroom). With coding agents burning context all day, this trio belongs in every agent-based development setup.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*