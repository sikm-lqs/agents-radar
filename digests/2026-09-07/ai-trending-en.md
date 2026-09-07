# AI Open Source Trends 2026-09-07

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-07 01:16 UTC

---

# AI Open Source Trends Report — 2026-09-07

> **Filtering note:** Of 18 trending repos, 15 are AI-relevant. Excluded as non-AI: [llvm/llvm-project](https://github.com/llvm/llvm-project) (compiler toolchain), [Stremio/stremio-web](https://github.com/Stremio/stremio-web) (streaming app), [BraveOPotato/FckSignups](https://github.com/BraveOPotato/FckSignups) (tool directory). From topic search, excluded [Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide) and [Developer-Y/cs-video-courses](https://github.com/Developer-Y/cs-video-courses) (general CS content). Duplicates across sources merged.

---

## 1. Today's Highlights

Today's trending list is essentially an **"agent skills" event**: capability packs and behavior mods for coding agents occupy 9 of 15 AI-relevant slots, led by [mattpocock/skills](https://github.com/mattpocock/skills) (+2,207 today), [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (+1,539) and [affaan-m/ECC](https://github.com/affaan-m/ECC) (+1,485, 251K total). [openai/skills](https://github.com/openai/skills) — OpenAI's official skills catalog for Codex — marks the first major platform endorsement of the cross-harness skills format. [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) (242K total, +520) continues climbing as the open-weights community's bet on persistent personal agents. Local-first inference also surged: [magnitude](https://github.com/magnitudedev/magnitude) (+604) auto-selects the best local models for your hardware and plugs them into any agent, while [openwhispr](https://github.com/OpenWhispr/openwhispr) (+121) delivers on-device Whisper/Parakeet dictation.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,312 | De facto local runtime for open-weight models (Kimi-K2.6, GLM-5.2, DeepSeek, gpt-oss, Qwen, Gemma). Its 180K stars anchor the entire local-first agent stack trending today. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,121 | Single-binary CLI proxy that cuts LLM token consumption 60–90% on common dev commands. 79K stars signal that token economics is now first-class agent infrastructure. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 131,363 | Cross-platform desktop control panel for Claude Code, Codex, OpenCode, OpenClaw, Grok Build & Hermes Agent. 131K stars reflect how many users now juggle multiple agent harnesses daily. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 69,145 | Compresses tool outputs, logs, files and RAG chunks before they reach the LLM — 60–95% token cuts on JSON with "same answers." Ships as library, proxy, and MCP server. |
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | TypeScript | 0 (+551) | The open-source coding agent, and a common compatibility target for the skills ecosystem. +551 today on sustained harness-agnostic momentum. |
| [magnitudedev/magnitude](https://github.com/magnitudeddev/magnitude) | TypeScript | 0 (+604) | Open-source inference server that runs the best local models for your hardware, plugged into Pi, OpenCode, Hermes, Codex, Claude Code and Cline. +604 today on local-first demand. |
| [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | TypeScript | 27,686 | Qwen's official terminal-based AI coding agent. 27K stars show the Alibaba model family building its own first-party harness. |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,535 | High-performance serving framework for LLMs and multimodal models. Remains the production inference baseline behind the agent boom. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 251,364 (+1,485) | Agent harness performance-optimization system: skills, instincts, memory, security for Claude Code, Codex, OpenCode and Cursor. +1,485 today atop 251K total makes it the flagship of the harness-optimization wave. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 242,556 (+520) | "The agent that grows with you" — a persistent, evolving personal agent from the open-weights lab. 242K total and +520 today show durability beyond launch hype. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 129,392 (+1,539) | A persona skill that makes your agent "think like the laziest senior dev" — minimal code, maximum deletion. +1,539 today shows skills-as-behavioral-tuning resonating strongly. |
| [mattpocock/skills](https://github.com/mattpocock/skills) | Shell | 0 (+2,207) | Curated agent skills "for Real Engineers," straight from the author's `.agents` directory. Today's top AI gainer (+2,207), demonstrating developer-influencer gravity in the nascent skills market. |
| [blader/humanizer](https://github.com/blader/humanizer) | Python | 0 (+748) | Agent skill that removes tells of AI-generated writing from text. +748 today reflects surging demand for human-quality output as agents draft more prose. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+620) | 38 editorial diagram types as self-contained HTML+SVG for Claude Code, Codex and Pi — "no Mermaid slop." +620 today shows skills delivering deterministic, high-craft artifacts. |
| [openai/skills](https://github.com/openai/skills) | Python | 0 (+46) | OpenAI's official Skills Catalog for Codex. Modest star velocity, but its existence is the strongest signal yet of platform-level standardization of the skills format. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,555 | Fair-code workflow automation with native AI capabilities and 400+ integrations. 203K stars make it the workflow backbone many teams bolt agents onto. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,143 | Self-hosted AI interface supporting Ollama and OpenAI-compatible APIs. 151K stars cement it as the default local chat frontend. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,154 | Generates HD short videos from a topic/keyword via automated AI workflow. 121K stars show content automation remains the highest-mass consumer AI use case. |
| [koala73/worldmonitor](https://github.com/koala73/worldmonitor) | TypeScript | 85,712 | Real-time global intelligence dashboard: AI news aggregation, geopolitical monitoring, infrastructure tracking. 85K stars for situational-awareness-as-an-app. |
| [sansan0/TrendRadar](https://github.com/sansan0/TrendRadar) | Python | 62,074 | AI-driven opinion/trend monitor with multi-platform aggregation, smart alerts and MCP integration. 62K stars; a strong example of MCP-native vertical apps. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,521 | AI productivity studio with smart chat, autonomous agents and 300+ assistants, unified across frontier LLMs. 51K stars in the crowded desktop-client category. |
| [aipoch/open-science](https://github.com/aipoch/open-science) | TypeScript | 0 (+146) | Local-first, model-agnostic AI research workbench with scientific agents, notebooks, data connectors and reproducible provenance. +146 today — research workbenches are an under-supplied vertical. |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | 0 (+142) | Build an autonomous hedge fund in minutes using swarm intelligence for market analysis, risk and execution. +142 today as autonomous-finance agents go mainstream. |
| [OpenWhispr/openwhispr](https://github.com/OpenWhispr/openwhispr) | JavaScript | 0 (+121) | Privacy-first voice-to-text dictation with local Parakeet/Whisper models and BYOK cloud options. +121 today — on-device speech is quietly maturing into daily-driver tooling. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,911 | The model-definition framework for SOTA text, vision, audio and multimodal models, for training and inference. Still the ecosystem's gravitational center at 164K stars. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,478 | Implements a ChatGPT-like LLM in PyTorch, step by step. 104K stars confirm education demand persists even as abstraction layers multiply. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,734 | Local UI to run and train LLMs and diffusion models (GGUF, MLX, Qwen3.8, DeepSeek-V4, Gemma 4). 75K stars — consumer-grade fine-tuning is now a real category. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,000 | "The absolute trainer to light up AI agents" — post-training for agent workloads. 18K stars at the intersection of the two biggest waves: agents and RL. |
| [Farama-Foundation/Gymnasium](https://github.com/Farama-Gymnasium/gymnasium) | Python | 12,473 | Standard API for single-agent RL environments (formerly Gym). The quiet foundation beneath the agent-RL renaissance. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,704 | Agent Reinforcement Trainer: trains multi-step agents on real-world tasks with GRPO. 10.7K stars — on-the-job agent training moving from research to practice. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,422 | Benchmarks 374 models including GPT-5.4, Gemini 3.1 Pro, Claude 4.6, GLM-5.1 and DeepSeek-V4, plus a 2M+ defect library. A uniquely transparent window into frontier-model failure modes. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,729 | "The RL Bridge for LLM-based Agent Applications," built simple and flexible. Part of a fast-forming agent-RL trio with agent-lightning and ART. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 177,292 | The context API to search, scrape and interact with the web at scale. 177K stars — effectively the default data-acquisition layer for agents. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 115,361 | Turns any codebase (plus docs, SQL, PDFs) into a queryable knowledge graph via local deterministic AST parsing — no vector store. 115K stars for a deterministic alternative to embedding-based RAG. |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 78,771 | Adaptive web-scraping framework handling everything from one request to full crawls. 78K stars as agent-grade crawling becomes table stakes. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 78,452 | Gives agents read/search access to Twitter, Reddit, YouTube, GitHub, Bilibili and XiaoHongShu via one CLI with zero API fees. 78K stars for community-run context plumbing. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,203 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. 46K stars in the human+agent knowledge-management niche. |

---

## 3. Trend Signal Analysis

**Explosive attention: agent "skills."** Nine-plus of today's AI trending repos are capability packs or behavior mods for coding agents — [mattpocock/skills](https://github.com/mattpocock/skills) (+2,207), [ponytail](https://github.com/DietrichGebert/ponytail) (+1,539), [ECC](https://github.com/affaan-m/ECC) (+1,485), [humanizer](https://github.com/blader/humanizer) (+748), [diagram-design](https://github.com/cathrynlavery/diagram-design) (+620), plus [openai/skills](https://github.com/openai/skills), [humanlayer/skills](https://github.com/humanlayer/skills) and [marketingskills](https://github.com/coreyhaines31/marketingskills). The unifying trait is **harness-agnostic packaging** — one skill runs across Claude Code, Codex, Cursor, OpenCode and Hermes. Skills are becoming the portable unit of agent capability (an "npm moment" for agents), and their spread into marketing, diagramming and writing shows the format escaping pure engineering.

**New directions.** (1) The "agent harness" crystallizes as a product category: ECC (251K), [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk), [HKUDS/DeepCode](https://github.com/HKUDS/DeepCode), [superset](https://github.com/superset-sh/superset) orchestrating 100+ parallel agents, and [loop-engineering](https://github.com/cobusgreyling/loop-engineering) CLIs. (2) Token economics emerges as middleware: [rtk](https://github.com/rtk-ai/rtk) (60–90% cuts), [headroom](https://github.com/headroomlabs-ai/headroom), [codeburn](https://github.com/getagentseal/codeburn). (3) Self-evolving agents appear — [GenericAgent](https://github.com/lsdefine/GenericAgent), [evolver](https://github.com/EvoMap/evolver), [distilly](https://github.com/titanwings/distilly), [CowAgent](https://github.com/zhayujie/CowAgent). (4) Agent RL goes practical — [agent-lightning](https://github.com/microsoft/agent-lightning), [ART](https://github.com/OpenPipe/ART) (GRPO), [AReaL](https://github.com/areal-project/AReaL).

**LLM-release linkage.** Descriptions cite DeepSeek-V4, Qwen3.6/3.8, Kimi-K2.6, GLM-5.x and gpt-oss — 2026's rapid open-weight cadence explains both the portability push and local-first stacks ([ollama](https://github.com/ollama/ollama), [magnitude](https://github.com/magnitudedev/magnitude), [unsloth](https://github.com/unslothai/unsloth)). [DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) (35K) optimizes specifically for DeepSeek prefix-cache stability, showing model-specific harnesses coexisting with cross-vendor skills. Chinese-ecosystem projects ([superpowers-zh](https://github.com/jnMetaCode/superpowers-zh), [cc-switch](https://github.com/farion1231/cc-switch), TrendRadar) confirm a parallel, fast-moving community.

---

## 4. Community Hot Spots

- **Agent skills standardization** — [openai/skills](https://github.com/openai/skills) (official Codex catalog) vs. [mattpocock/skills](https://github.com/mattpocock/skills) (+2,207) and [humanlayer/skills](https://github.com/humanlayer/skills) (+451): watch whether skill conventions converge into a true cross-vendor standard. First-mover skills repos are accruing stars at package-registry speed.
- **Token-efficiency middleware** — [rtk](https://github.com/rtk-ai/rtk) (79,121), [headroom](https://github.com/headroomlabs-ai/headroom) (69,145), [codeburn](https://github.com/getagentseal/codeburn) (10,870): as agent loops balloon context, compression proxies deliver immediate, measurable cost ROI — the easiest infrastructure wedge for new contributors.
- **Local-first inference → agent path** — [magnitude](https://github.com/magnitudedev/magnitude) (+604), [openwhispr](https://github.com/OpenWhispr/openwhispr) (+121), [unsloth](https://github.com/unslothai/unsloth) (75,734): privacy concerns and subscription fatigue are pushing both model serving and speech recognition fully on-device.
- **Agent RL training** — [agent-lightning](https://github.com/microsoft/agent-lightning) (18,000), [ART](https://github.com/OpenPipe/ART) (10,704), [AReaL](https://github.com/areal-project/AReaL) (5,729): GRPO-style post-training of multi-step agents is moving from papers to practice, and pairs naturally with the harness category above.
- **Vertical autonomous agents** — [AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) (+142), [open-science](https://github.com/aipoch/open-science) (+146), [career-ops](https://github.com/career-ops-hq/career-ops) (70,337): finance, research and job-search swarms show agents shipping into verticals — and where autonomy risk (real money, real trades) gets stress-tested first.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*