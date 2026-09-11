# AI Open Source Trends 2026-09-11

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-11 11:30 UTC

---

# AI Open Source Trends Report — 2026-09-11

**Filtering note:** Excluded from trending as non-AI: `Sonarr`, `armorpaint`, `OpenFlux`, `iloader`, `gods-eye-view`. Excluded from topic search as general-purpose platforms with only AI-adjacent positioning: `medusa`, `netdata`, `JavaGuide`, `cs-video-courses`. 39 projects retained and categorized below.

---

## 1. Today's Highlights

The day's top AI gainer is not a framework or a model but a single-purpose agent skill: [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) (+3,882), which stops coding agents from burying the answer — confirmation that the "skills layer" is where community energy now concentrates. GitHub's own [spec-kit](https://github.com/github/spec-kit) (+985) and [obra/superpowers](https://github.com/obra/superpowers) (+732) show agentic development methodology (Spec-Driven Development, skills frameworks) hardening into default practice. Token economics has matured into a full product category, with [rtk](https://github.com/rtk-ai/rtk) (79,917⭐), [headroom](https://github.com/headroomlabs-ai/headroom) (71,495⭐) and [caveman](https://github.com/JuliusBrussee/caveman) (104,837⭐) all attacking context cost from different angles. Money-moving agents arrived on the trending list: [CloddsBot](https://github.com/alsk1992/CloddsBot) (+277) trades autonomously across 1,000+ markets with machine-to-machine payments. Finally, an explicit "post-RAG" pattern surfaced twice in one day — [llm_wiki](https://github.com/nashsu/llm_wiki) (+142) and [hyperresearch](https://github.com/jordan-gibbs/hyperresearch) (+118) build persistent, curated wikis instead of retrieve-and-answer.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+3,882) | A skill that stops coding agents from burying the answer, enforcing ADHD-friendly concise output. Today's #1 AI gainer by a wide margin — a single-behavior skill out-drew full frameworks, confirming the skills-layer land grab. |
| [github/spec-kit](https://github.com/github/spec-kit) | Python | 0 (+985) | GitHub's toolkit for Spec-Driven Development — write specs before agent codegen. +985 today signals SDD graduating from blog posts to default workflow. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+732) | An agentic skills framework plus a software development methodology "that works." Anchor of a sprawling ecosystem including the Chinese localization [superpowers-zh](https://github.com/jnMetaCode/superpowers-zh) (8,062⭐). |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | 0 (+624) | Local-first AI coding agent desktop (Electron + Rust core + pi Agent Harness + user-installable plugins). Signals agent harnesses migrating from terminal to installable desktop apps. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 256,182 | Agent harness performance optimization: skills, instincts, memory, and security across Claude Code, Codex, OpenCode, and Cursor. The largest repo in today's dataset — harness engineering is the new platform layer. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,308 | Cross-platform desktop hub managing Claude Code, Codex, OpenCode, Grok Build, and Hermes Agent side-by-side. Its star count proves multi-agent setups are common enough to need a control panel. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,917 | Single-binary CLI proxy cutting LLM token consumption 60–90% on common dev commands, zero dependencies. Tops the fast-growing token-economics stack. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,495 | Compresses tool outputs, logs, files, and RAG chunks before they reach the LLM (60–95% token cuts on JSON). Together with rtk and caveman, cost plumbing is now mandatory infrastructure. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,401 | "The agent that grows with you" — the most-starred agent runtime in the dataset and a first-class target in cc-switch and superpowers-zh integrations. The reference point for personal agents. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,990 | Fair-code workflow automation with native AI and 400+ integrations. The incumbent bridge between autonomous agents and enterprise systems. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,253 | The original autonomous-agent project. Still compounding stars even as the center of gravity shifts to harnesses and skills. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,118 | Now self-described as "the agent engineering platform." The framework layer beneath production agent graphs. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,167 | Agents that operate the browser; the substrate for computer-use workflows (cf. [AIHawk](https://github.com/feder-cr/AIHawk), 30,338⭐). The browser remains the default agent actuator. |
| [lobehub/lobehub](https://github.com/lobehub/lobehub) | TypeScript | 82,394 | "Chief Agent Operator" that hires, schedules, and reports on your AI team 7×24. Agent fleet management is emerging as a distinct product genre. |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+277) | Autonomous trading agent spanning 1,000+ markets (Polymarket, Kalshi, Binance, Hyperliquid, Solana DEXs, 5 EVM chains) with an agent commerce protocol for machine-to-machine payments, built on Claude. +277 today shows self-hosted money-moving agents going mainstream. |
| [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) | Rust | 0 (+210) | Run parallel research agents with any model. From the alphaXiv team — research-agent orchestration promoted to a first-class tool. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,410 | Agentic workflow + RAG building platform deployable on cloud, VPC, or self-hosted. The de-facto open standard for shipping agent applications. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,612 | Self-hosted AI interface supporting Ollama and OpenAI-compatible backends. The front door for local-model stacks. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,391 | One-click HD short-video generation from a topic or keyword via automated AI workflows. AI content automation at serious scale. |
| [koala73/worldmonitor](https://github.com/koala73/worldmonitor) | TypeScript | 86,038 | Real-time global intelligence dashboard with AI-powered news aggregation and geopolitical monitoring. Situational-awareness apps built on agent-collected data. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,222 | Local AI job-search agent running inside Claude Code, Codex, or OpenCode: scan, score A–H, tailor CV, track applications. A novel distribution model — apps shipped as agent skills rather than standalone binaries. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,926 | LLM-driven multi-market stock analysis with decision dashboards and zero-cost scheduled runs. Part of a dense finance-agent cluster alongside [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) (33,234⭐) and [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) (21,237⭐). |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | 0 (+132) | An agent plus skills that completes mathematical modeling end-to-end and generates a submission-ready paper. A clean example of the "agent delivers a document artifact" vertical pattern, trending today. |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 0 (+126) | Self-hosted AI sales OS: CRM with native agents, WhatsApp via WAHA, MCP-ready, multi-tenant, LGPD-compliant. An open Kommo/Intercom alternative showing agents entering vertical SMB SaaS. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,650 | Local runtime shipping Kimi-K2.6, GLM-5.2, DeepSeek, gpt-oss, Qwen, and Gemma. Its README is effectively a snapshot of the current open-weights frontier. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,108 | The model-definition framework for state-of-the-art text, vision, audio, and multimodal models. Still the substrate beneath nearly everything in this report. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,014 | Local UI to run and train LLMs and diffusion models (GGUF, MLX, Qwen3.8, DeepSeek-V4, Gemma 4, FLUX). Fine-tuning has become a desktop activity. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,775 | Distributed AI compute engine underlying training and serving stacks. The throughput backbone for scaled RL workloads. |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,806 | High-performance serving framework for LLMs and multimodal models. Inference throughput remains a competitive battleground. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,711 | Agent Reinforcement Trainer: on-the-job GRPO training for multi-step agents (Qwen3.6, GPT-OSS, Llama). Agentic RL is this cycle's breakout training direction. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,994 | Scalable agentic RL framework (PPO, DAPO, REINFORCE++, VLM, vLLM + Ray). The post-training backbone behind many agent-tuning pipelines. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,431 | ReLE evaluation covering 374 models — GPT-5.4, Gemini-3.1-pro, Claude-4.6, Qwen3.6, DeepSeek-V4, GLM-5.1 — plus a 2M+ sample defect database. The best public map of the September 2026 frontier. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,002 | The context API to search, scrape, and interact with the web at scale. The de-facto web-ingestion layer for agent and RAG pipelines. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,877 | Turns codebases, docs, SQL schemas, and PDFs into queryable knowledge graphs via deterministic local AST parsing — no vector store, every edge explained. Flagship of the "graph over embeddings" movement for code. |
| [MemPalace/mempalace](https://github.com/MemPalace/mempalace) | Python | 58,991 | The best-benchmarked open-source AI memory system, free. Agent memory has crystallized into a standalone, benchmark-driven product category. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,300 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. Long-form knowledge apps are absorbing agent capabilities natively. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,329 | Persistent codebase map for MCP and CLI so AI tools read only what matters, with benchmarked context reduction. Code-intelligence graphs as reusable agent infrastructure. |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 0 (+142) | Desktop app that incrementally builds and maintains a persistent, interlinked wiki from your documents instead of per-query RAG. Trending today with explicit post-RAG positioning. |
| [jordan-gibbs/hyperresearch](https://github.com/jordan-gibbs/hyperresearch) | Python | 0 (+118) | Agents collect, search, and synthesize web research into a persistent searchable wiki. The same anti-RAG curation thesis as llm_wiki, gaining traction the same day. |

*Note: trending-list repos show ⭐0 total in the source data; today's delta is the reliable signal for those rows.*

---

## 3. Trend Signal Analysis

**The skills layer is absorbing all the attention.** Today's top three AI gainers — i-have-adhd (+3,882), spec-kit (+985), superpowers (+732) — are behavior and methodology artifacts, not models or frameworks. Around them sits a genuine skills economy with six-figure star counts ([caveman](https://github.com/JuliusBrussee/caveman) 104,837; [ponytail](https://github.com/DietrichGebert/ponytail) 135,362; [ECC](https://github.com/affaan-m/ECC) 256,182), localizations, and skill-distillation tooling ([distilly](https://github.com/titanwings/distilly), 24,616⭐). Skills are becoming the portable, cross-agent format.

**Token economics matured into a category.** [rtk](https://github.com/rtk-ai/rtk), [headroom](https://github.com/headroomlabs-ai/headroom), and [codeburn](https://github.com/getagentseal/codeburn) (10,959⭐) attack context cost from proxy, pre-compression, and accounting angles; 15–95% savings claims are now standard.

**New stacks appearing:** (1) multi-agent control planes — [cc-switch](https://github.com/farion1231/cc-switch) managing five harnesses side-by-side, [superset](https://github.com/superset-sh/superset) (14,079⭐) orchestrating 100+ agents, [OmniRoute](https://github.com/diegosouzapw/OmniRoute) unifying 352 providers; (2) MCP escaping the IDE — [pascalorg/editor](https://github.com/pascalorg/editor) (+83) ships MCP tools inside a 3D architecture editor; (3) deterministic AST knowledge graphs displacing vector stores; (4) post-RAG persistent wikis.

**Model-cycle connection:** READMEs and benchmarks reference DeepSeek-V4, Qwen3.6/3.8, GLM-5.x, Kimi-K2.6, GPT-5.4 — a frontier refresh driving model-native tooling ([DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix), 35,503⭐, optimizes DeepSeek prefix-cache stability) and cheap long-running loops that make self-evolving agents ([GenericAgent](https://github.com/lsdefine/GenericAgent), [CowAgent](https://github.com/zhayujie/CowAgent)) and agentic RL training practical.

---

## 4. Community Hot Spots

- **[obra/superpowers](https://github.com/obra/superpowers) (+732) and the skills ecosystem** — the fastest-compounding layer today; contributing portable skills (see [superpowers-zh](https://github.com/jnMetaCode/superpowers-zh), [distilly](https://github.com/titanwings/distilly)) offers outsized distribution for minimal code.
- **Token-cost stack: [rtk](https://github.com/rtk-ai/rtk) + [headroom](https://github.com/headroomlabs-ai/headroom) + [caveman](https://github.com/JuliusBrussee/caveman)** — immediately adoptable, measurable ROI (15–95% token savings); the safest productivity win on this list.
- **Post-RAG research curation: [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) + [hyperresearch](https://github.com/jordan-gibbs/hyperresearch) + [llm_wiki](https://github.com/nashsu/llm_wiki)** — three independent projects converging on persistent agent-maintained wikis the same week; watch this replace naive RAG for research workflows.
- **Deterministic code knowledge graphs: [graphify](https://github.com/Graphify-Labs/graphify) (116,877⭐) + [code-review-graph](https://github.com/tirth8205/code-review-graph)** — "no vector store, every edge explained" is a credible challenger to embedding-based code retrieval.
- **Autonomous finance agents: [CloddsBot](https://github.com/alsk1992/CloddsBot) + [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading)** — autonomous execution plus machine-to-machine payments is high-signal but high-risk; expect regulatory attention and fork churn.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*