# AI Open Source Trends 2026-09-12

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-11 23:30 UTC

---

# AI Open Source Trends Report — 2026-09-12

**Step 1 — Filtering note:** From 16 trending + 83 topic-search repos, the following were excluded as non-AI: `gods-eye-view` (real-data 3D geo-visualization, no ML), `iloader` (sideloader), `armorpaint` (3D texturing), `Sonarr` (PVR), `OpenFlux` (TCP tunnel), `JavaGuide` (interview guide), `netdata` (observability, AI only as a feature), `Scrapling` (scraping framework), `cs-video-courses` (course list). `medusajs/medusa` flagged borderline (commerce platform with agent-oriented positioning; noted in trends, not tabulated). ~75 AI-relevant projects remain; 39 highest-signal ones are tabulated below.

---

## 1. Today's Highlights

The **agent "skills" layer exploded today**: [i-have-adhd](https://github.com/ayghri/i-have-adhd) — literally a single output-formatting skill for coding agents — is the #1 AI repo on the trending list (+3,440 stars), while [superpowers](https://github.com/obra/superpowers) (+731) supplies the framework beneath it. GitHub's official [spec-kit](https://github.com/github/spec-kit) (+985) pushed Spec-Driven Development from community practice toward platform default. A **post-RAG wave** is visible in [llm_wiki](https://github.com/nashsu/llm_wiki) (+640), [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) and [hyperresearch](https://github.com/jordan-gibbs/hyperresearch), all building persistent, incrementally-maintained knowledge instead of stateless retrieval. Autonomous money agents arrived force: [CloddsBot](https://github.com/alsk1992/CloddsBot) (+627) trades 1,000+ markets while you sleep. Beneath the noise, cumulative stars confirm "harness engineering" as the dominant paradigm: [ECC](https://github.com/affaan-m/ECC) (256,508) and [hermes-agent](https://github.com/NousResearch/hermes-agent) (244,596) lead the entire dataset.

---

## 2. Top Projects by Category

> **Data note:** Trending-list rows report total ⭐ as `0` in the source feed — today's delta is the reliable signal. Topic-search totals are cumulative (active in last 7 days); no daily delta available.

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [github/spec-kit](https://github.com/github/spec-kit) | Python | 0 (+985) | GitHub's official toolkit for Spec-Driven Development, where specs become the contract between humans and coding agents. Today's strongest non-skill AI gainer, signaling SDD's move to platform-default status. |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | 0 (+545) | Local-first AI coding agent desktop: Electron + Rust host core + pi Agent Harness + user-installable plugins. +545 today shows demand for agent workspaces that keep compute and data on-device. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,699 | The default local runtime for frontier open-weight models — its README now leads with Kimi-K2.6, GLM-5.2, DeepSeek and gpt-oss. Still the on-ramp for the entire local-agent stack. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,369 | Cross-platform desktop managing configs across Claude Code, Codex, OpenCode, OpenClaw, Grok Build and Hermes Agent in one place. Its scale reflects a multi-harness-per-developer reality where switching agents is routine. |
| [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman) | Go | 105,038 | A Claude Code skill cutting ~65% of token usage by forcing terse "caveman" output. Six-figure stars for a joke-shaped skill is the clearest proof that token cost is now a first-class UX concern. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,998 | Single-binary CLI proxy that strips 60–90% of tokens from common dev command output before it reaches the LLM. Zero dependencies make it the drop-in layer of the token-economics stack. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,593 | Compresses tool outputs, logs, files and RAG chunks ahead of the LLM — 20% savings for coding agents, 60–95% on JSON, same answers. Rising as agent sessions get longer and run in parallel. |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 64,871 | MIT AI gateway exposing one endpoint across 352 providers (150+ free), 1,200+ models, with quota-aware fallback and built-in RTK/Caveman compression. 550+ contributors make it the neutral switchboard as model churn accelerates. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+3440) | A single skill that stops coding agents from burying the answer, with ADHD-friendly output. +3,440 today — the top AI repo on the list and proof one well-scoped skill can out-earn entire frameworks. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+731) | An agentic skills framework plus a software-development methodology installable into existing coding agents. Its Chinese localization ([superpowers-zh](https://github.com/jnMetaCode/superpowers-zh), 8,066 ⭐) shows the framework's global reach. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 256,508 | The agent-harness performance optimization system: skills, instincts, memory, security and research-first development for Claude Code, Codex, Cursor and beyond. The largest repo in today's entire dataset. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,596 | "The agent that grows with you" — a persistent personal agent accumulating skills and memory over time. Flagship of the self-improving-agent movement. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,041 | Fair-code workflow automation with native AI capabilities and 400+ integrations, self-hostable. Remains the bridge between agentic prototypes and production business processes. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,256 | The standard library for agents that drive a real browser. Recurring MCP integrations keep it central as web-actuating agents spread. |
| [lobehub/lobehub](https://github.com/lobehub/lobehub) | TypeScript | 82,411 | Your "Chief Agent Operator" — hires, schedules and reports on a team of AI agents running 7×24. Captures the shift from single agents to agent-fleet operations. |
| [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | Python | 46,287 | Agent-first control plane for discovering, selecting and validating from a catalog of 2,115+ agentic skills, with CLI, local MCP and Workbench. Effectively the registry of the emerging skills economy. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+627) | Autonomous trading agent across 1,000+ markets (Polymarket, Kalshi, Binance, Hyperliquid, Solana DEXs, 5 EVM chains) with risk management and a machine-to-machine payment protocol. The boldest self-hosted "while you sleep" autonomy demo, built on Claude. |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | 0 (+132) | Agent and skills that complete mathematical-modeling projects end-to-end and emit a submission-ready paper. A sharp example of agents targeting entire professional deliverables. |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 0 (+126) | Self-hosted AI sales OS: multi-tenant CRM with native agents and WhatsApp (WAHA), MCP-ready and LGPD-compliant, positioned against Kommo/Octadesk/Intercom. Rides the SMB push toward self-hosted agentic sales. |
| [pascalorg/editor](https://github.com/pascalorg/editor) | TypeScript | 0 (+83) | Open-source 3D architectural editor exposing a local CLI and MCP tools so humans and AI agents share the same workflows. An early template for MCP-native vertical software. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,513 | One-click HD short-video generation from a topic via automated LLM workflows. Still the reference open-source answer to commercial AI video pipelines. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,291 | Local-first AI job search running inside coding CLIs (Claude Code, Codex, OpenCode): scans portals, scores listings, tailors CVs, tracks applications. Shows consumer agents finding a home inside dev tooling. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,942 | LLM-driven multi-market stock analysis with live news, decision dashboards, push notifications and zero-cost scheduled runs. Mainstream retail adoption of LLM analytics. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,690 | AI productivity studio with smart chat, autonomous agents and 300+ assistants behind one UI. The polished consumer face of unified multi-model access. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,130 | The model-definition framework for SOTA text, vision, audio and multimodal training and inference. Every new open-weight frontier release still lands here first. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,039 | Local UI to run and train LLMs and diffusion models — GGUF/MLX support now headlined by Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4. The consumer edge of the training stack. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,240 | Open-source financial LLMs with trained weights on HuggingFace. Pairs directly with today's trading-agent surge. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,712 | Agent Reinforcement Trainer: trains multi-step agents with GRPO on real-world tasks (Qwen3.6, GPT-OSS, Llama). The "on-the-job training" tool agents were missing. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,995 | Scalable, high-performance agentic RL framework (PPO, DAPO, REINFORCE++, VLM) on Ray/vLLM async infra. The research backbone behind GRPO-style agent training. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,434 | ReLE evaluation covering 374 models — GPT-5.4, Gemini 3.1 Pro, Claude 4.6, Kimi K2.6, DeepSeek-V4, GLM-5.1 and more — plus a 2M+ defect library. The scoreboard of an unusually crowded frontier. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,749 | The "RL bridge" for LLM-based agent applications, made simple and flexible. Closes the loop between agent frameworks and RL trainers. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 0 (+640) | Desktop app that incrementally builds and maintains a persistent, interlinked wiki from your documents — explicitly positioned against per-query RAG. +640 today shows the anti-RAG stance resonating. |
| [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) | Rust | 0 (+156) | Run parallel research agents with any model, from the alphaXiv team. Research synthesis is rapidly becoming an agent-native workload. |
| [jordan-gibbs/hyperresearch](https://github.com/jordan-gibbs/hyperresearch) | Python | 0 (+118) | Agent-driven research knowledge base where agents collect, search and synthesize web research into a persistent, searchable wiki. Third trending repo today with the same persistent-knowledge thesis. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,206 | The context API to search, scrape and interact with the web at scale. The acquisition layer beneath nearly every agent knowledge pipeline. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 117,017 | Turns a codebase plus docs, SQL and PDFs into a queryable knowledge graph via a `/graphify` skill — deterministic local AST parsing, every edge explained, no vector store. Flagship of the no-embedding movement. |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,894 | Up-to-date documentation delivered straight to LLMs and code editors. Solves stale-docs hallucination better than chunked RAG for code. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuann) | TypeScript | 46,308 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. Especially strong in the Chinese ecosystem, where note apps lead agent adoption. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,338 | Local-first code intelligence graph for MCP and CLI, giving agents a persistent codebase map so they read only what matters. Ships benchmarked context reductions on large-repo review workflows. |

---

## 3. Trend Signal Analysis

**The explosively hot tool type is the single-purpose agent skill.** [i-have-adhd](https://github.com/ayghri/i-have-adhd) (+3,440/day) is one behavior module; [caveman](https://github.com/JuliusBrussee/caveman) (105,038 ⭐) and [ponytail](https://github.com/DietrichGebert/ponytail) (135,809 ⭐) are essentially persona/compression skills. With [superpowers](https://github.com/obra/superpowers) as framework and [agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) indexing 2,115+ skills, a distribution layer ("app store for agents") is forming in real time.

**New stacks/directions consolidating this week:** (1) *Token economics as infrastructure* — [rtk](https://github.com/rtk-ai/rtk) (60–90% cuts), [headroom](https://github.com/headroomlabs-ai/headroom) (60–95% on JSON), metering via [codeburn](https://github.com/getagentseal/codeburn), routing via [OmniRoute](https://github.com/diegosouzapw/OmniRoute). (2) *Post-RAG knowledge* — three separate trending projects (llm_wiki, hyperresearch, OpenResearch) plus [graphify](https://github.com/Graphify-Labs/graphify)'s no-vector-store graphs replace stateless retrieval with incremental persistent memory. (3) *Spec-driven development going official* via GitHub's spec-kit. (4) *Agent RL* — [ART](https://github.com/OpenPipe/ART)'s GRPO training shifts agents from prompt-engineered to reward-trained. (5) *Parallelism as methodology* — [superset](https://github.com/superset-sh/superset) orchestrates 100+ coding agents; ECC codifies "harness engineering"; [loop-engineering](https://github.com/cobusgreyling/loop-engineering) names the discipline.

**LLM-release connection:** the stack now assumes a rotating open-weight frontier. Ollama leads with Kimi-K2.6/GLM-5.2, unsloth with Qwen3.8/DeepSeek-V4; [DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) is DeepSeek-native, exploiting V4 prefix-cache stability for long-running sessions. [chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) tracks 374 models including GPT-5.4 and Claude 4.6 — frontier churn directly explains the growth of multi-provider switching ([cc-switch](https://github.com/farion1231/cc-switch)) and Claude Code's gravity as the primary skills target.

---

## 4. Community Hot Spots

- **Build for the skills economy** — [superpowers](https://github.com/obra/superpowers) + [agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) define the distribution format; [distilly](https://github.com/titanwings/distilly) (24,625 ⭐) auto-distills expert behavior into reusable skills. Highest ROI entry point for individual contributors right now.
- **Token-cost control plane** — combine [rtk](https://github.com/rtk-ai/rtk) + [headroom](https://github.com/headroomlabs-ai/headroom) + [caveman](https://github.com/JuliusBrussee/caveman), observe with [codeburn](https://github.com/getagentseal/codeburn). As agents run 24/7, token budgets are becoming an ops line item.
- **Post-RAG knowledge infrastructure** — [llm_wiki](https://github.com/nashsu/llm_wiki), [graphify](https://github.com/Graphify-Labs/graphify), [code-review-graph](https://github.com/tirth8205/code-review-graph) and [context7](https://github.com/upstash/context7) suggest MCP-delivered persistent knowledge beats vector-only RAG for code and research workloads.
- **RL-trained agents** — [ART](https://github.com/OpenPipe/ART), [AReaL](https://github.com/areal-project/AReaL), [OpenRLHF](https://github.com/OpenRLHF/OpenRLHF): the GRPO-on-agents wave is the clearest technical frontier beyond prompting.
- **Autonomous vertical agents + agentic commerce** — [CloddsBot](https://github.com/alsk1992/CloddsBot)'s machine-to-machine payment protocol, [DeskcommCRM](https://github.com/melgarafael/DeskcommCRM), [career-ops](https://github.com/career-ops-hq/career-ops), and even [medusa](https://github.com/medusajs/medusa) repositioning as "commerce for agents" hint at AI customers transacting via MCP/A2A — an early but fast-moving direction.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*