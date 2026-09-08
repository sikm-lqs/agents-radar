# AI Open Source Trends 2026-09-08

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-08 11:30 UTC

---

# AI Open Source Trends Report — 2026-09-08

## Step 1 — AI Relevance Filter

**Excluded as non-AI** (general-purpose tools despite appearing in trending/topic lists): [MoonTechLab/LunaTV](https://github.com/MoonTechLab/LunaTV) (video streaming aggregator), [viarotel-org/escrcpy](https://github.com/viarotel-org/escrcpy) (Android screen mirroring), [Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide) (interview guide), [Developer-Y/cs-video-courses](https://github.com/Developer-Y/cs-video-courses) (CS course list), [medusajs/medusa](https://github.com/medusajs/medusa) (commerce platform, agent-friendly branding only), [netdata/netdata](https://github.com/netdata/netdata) (observability; MCP-adjacent but non-AI core).

**Deduplicated**: [affaan-m/ECC](https://github.com/affaan-m/ECC) and [browser-use/browser-use](https://github.com/browser-use/browser-use) appear on both lists — merged (total + today's delta).

---

## 1. Today's Highlights

Agent **"skills"** are today's runaway story: 9 of 16 trending repos are skill packs or harness configs, led by [affaan-m/ECC](https://github.com/affaan-m/ECC) (+1,897) and OpenAI's official [skills](https://github.com/openai/skills) catalog for Codex (+351), alongside [plugins](https://github.com/openai/plugins). Design-quality content *for* agents is surging — [diagram-design](https://github.com/cathrynlavery/diagram-design) (+1,070) and HeyGen's [hyperframes](https://github.com/heygen-com/hyperframes) (+474) treat agents as first-class render targets. The token/context-economy stack keeps compounding: [markitdown](https://github.com/microsoft/markitdown) (+886), [context-mode](https://github.com/mksglu/context-mode), [rtk](https://github.com/rtk-ai/rtk), [headroom](https://github.com/headroomlabs-ai/headroom). [AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) (+517) confirms finance as the hottest vertical for swarm agents, while a single [CLAUDE.md derived from Karpathy's LLM-pitfall observations](https://github.com/multica-ai/andrej-karpathy-skills) pulling +325 in a day shows thought-leader gravity is a distribution channel.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,451 | Local runtime for Kimi-K2.6, GLM-5.2, DeepSeek, gpt-oss, Qwen, Gemma. Still the default on-ramp for running open weights locally. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 131,680 | All-in-One desktop manager for Claude Code, Codex, OpenCode, OpenClaw, Grok Build & Hermes Agent. Its 131k stars quantify how mainstream multi-CLI agent setups have become. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,397 | Single-binary CLI proxy cutting LLM token use 60–90% on common dev commands. Anchor of the fast-growing "context economy" toolchain. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 70,486 | Compresses tool outputs, logs, files and RAG chunks before they reach the LLM (60–95% fewer tokens on JSON). Ships as library, proxy and MCP server. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,739 | Distributed AI compute engine plus libraries for accelerating ML workloads. The standard substrate for training/serving pipelines. |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,632 | High-performance serving framework for LLM and multimodal models. The inference-layer bet as open-model traffic scales. |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | — (+96 today) | Sandboxes tool output (98% reduction), persists session memory, and enforces routing across 17 platforms via MCP + hooks. Today's trending entry in context optimization. |
| [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser) | JavaScript | — (+135 today) | Stealth headless browser and drop-in Puppeteer/Playwright replacement that bypasses Cloudflare and bot detection for agents. Signals an agent-vs-anti-bot arms race. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 253,591 (+1,897) | Agent harness performance system covering skills, instincts, memory, security across Claude Code, Codex, Opencode, Cursor. Today's top gainer and the flagship of the skills wave. |
| [openai/skills](https://github.com/openai/skills) | Python | — (+351 today) | OpenAI's official Skills Catalog for Codex. First-party legitimation of the skills format; watch it as a de-facto packaging standard. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | — (+446 today) | Agentic skills framework and software development methodology "that works". The community reference implementation many skill packs build upon. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 113,046 (+330) | Makes websites accessible to AI agents for online automation. Trending again as agent browsing becomes the hottest interaction surface. |
| [titanwings/distilly](https://github.com/titanwings/distilly) | TypeScript | 24,432 | Distills "how they think" into reusable Skills for any agent or bot. 24k stars shows real appetite for skill authoring and transfer tooling. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 243,232 | "The agent that grows with you" via cumulative skills and memory. One of the largest agent repositories in open source. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,710 | Fair-code workflow automation with native AI and 400+ integrations. The bridge carrying agents into enterprise systems. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 145,926 | Self-described "agent engineering platform". Still the most-depended agent framework despite the skills upstart wave. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | — (+1,070 today) | 38 editorial diagram types as self-contained HTML+SVG for Claude Code, Codex and Pi ("no Mermaid slop"). Second-highest gainer today — agent-grade design assets are now a category. |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | — (+474 today) | Write HTML, render video — explicitly built for agents, from commercial video company HeyGen. A first serious "agent-native video pipeline" play. |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | JavaScript | — (+580 today) | Marketing skills (CRO, copywriting, SEO, analytics, growth) for Claude Code and AI agents. The template for verticalized skill packs. |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | — (+517 today) | Autonomous hedge fund in minutes using swarm intelligence for analysis, risk and execution. Confirms finance as today's hottest agentic vertical. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,306 | The default self-hosted LLM interface (Ollama/OpenAI-compatible). A steady anchor for the local-first AI movement. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,476 | One-click HD short-video generation from a topic via LLM workflows. The precursor to hyperframes-style agent media pipelines. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 52,979 | Turns documents or topics into native PowerPoint decks with charts, animations and narration. The document-generation vertical keeps compounding. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,506 | Local AI job search inside your coding CLI: scan portals, score listings, tailor CV, track applications. A model of the agent CLI as personal back office. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,981 | Model-definition framework for SOTA text, vision, audio and multimodal training/inference. The enduring substrate of open ML. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,808 | Local UI to run and train LLMs and diffusion models (GGUF, MLX, Qwen3.8, DeepSeek-V4, MiniMax-H3, FLUX). Consumer-GPU fine-tuning is now mainstream. |
| [bojieli/ai-agent-book](https://github.com/bojieli/ai-agent-book) | Python | 45,239 | Open book on AI-agent design principles and engineering practice with per-chapter code. 45k stars signals enormous education demand. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,223 | Open-source financial LLMs with released trained weights. Pairs directly with today's agentic-finance surge. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,027 | "The absolute trainer to light up AI agents" — RL training for agent workloads. The frontier is shifting from prompting agents to training them. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,427 | Evaluates 374 models (GPT-5.4, Gemini 3.1 Pro, Claude 4.6, Qwen3.6, DeepSeek-V4, GLM-5.1…) plus a 2M-instance defect library. The best single map of the current model landscape. |
| [wandb/wandb](https://github.com/wandb/wandb) | Python | 11,247 | Experiment tracking and fine-tuning management platform. The standard MLOps companion for training workflows. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,737 | The RL bridge for LLM-based agent applications. Small but directionally important alongside agent-lightning. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 177,847 | The context API to search, scrape and interact with the web at scale. The de-facto data front-end for RAG and agents. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 115,867 | Turns codebases, docs, SQL and PDFs into queryable knowledge graphs via a Claude Code/Cursor/Codex skill — deterministic AST parsing, no vector store. A striking graphs-over-vectors positioning at 115k stars. |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | — (+886 today) | Converts files and office documents to Markdown for LLM ingestion. Quietly indispensable — +886 stars today. |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 79,298 | Adaptive web scraping from a single request to a full-scale crawl. The resilient-crawler counterpart to firecrawl. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,232 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. Local knowledge plus agent access is a durable combination. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,022 | MCP toolkit giving agents semantic retrieval and editing over code — "the IDE for your agent". Retrieval is shifting from embeddings to semantic code understanding. |

*Note: trending-list rows show ⭐0 total in the source (display artifact); "— (+N)" indicates only today's delta is available.*

---

## 3. Trend Signal Analysis

**Explosive category: the agent-skills layer.** Nine of sixteen trending repos are skills packs, harness presets, or agent-behavior configs — ECC (+1,897), diagram-design (+1,070), marketingskills (+580), superpowers (+446), i-have-adhd (+422), openai/skills (+351), karpathy-skills (+325), hyperframes, context-mode. With OpenAI now publishing official skills and plugins repos for Codex, skills have become this cycle's plugin economy: tiny markdown/HTML artifacts that port capabilities across Claude Code, Codex, Cursor and Opencode, with low authoring cost driving extreme star velocity.

**New stacks appearing.** First, the context/token economy is consolidating into a measure→compress→route pipeline: codeburn (tracks spend across 37 tools), context-mode (98% tool-output reduction), rtk and headroom (60–95% compression), caveman (65% savings via output style), OmniRoute (352 providers). Second, agents as render targets: hyperframes (HTML→video) and diagram-design extend the ppt-master pattern into agent-native media production. Third, stealth agent browsing: camofox's anti-bot bypass alongside browser-use formalizes an arms race with anti-scraping vendors. Fourth, self-evolving agents (GenericAgent's skill trees, evolver's auditable gene/event evolution, hermes-agent) are graduating from demos to frameworks.

**Linkage to model releases.** Repo descriptions now routinely reference GPT-5.4, Gemini 3.1 Pro, Claude 4.6, DeepSeek-V4, Qwen3.6, GLM-5.x, Kimi-K2.6 and MiniMax-M2.7 — and multi-model tooling (cc-switch at 131k; OmniRoute's 1,200+ models) exists precisely because no single lab dominates. DeepSeek-Reasonix engineering around prefix-cache stability shows inference-cost characteristics directly shaping agent design. Meanwhile agent-RL projects (agent-lightning, AReaL) signal the next capability jump comes from training loops, not longer prompts.

---

## 4. Community Hot Spots

- **The skills "app store" race** — [openai/skills](https://github.com/openai/skills) (+351) vs [obra/superpowers](https://github.com/obra/superpowers) (+446) vs [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) (46,148; 2,100+ skills catalog). Whoever standardizes skill packaging wins agent distribution; [karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) shows methodology-as-skill is a viable genre.
- **Context economics** — [rtk](https://github.com/rtk-ai/rtk), [headroom](https://github.com/headroomlabs-ai/headroom), [context-mode](https://github.com/mksglu/context-mode), [codeburn](https://github.com/getagentseal/codeburn), [OmniRoute](https://github.com/diegosouzapw/OmniRoute): token measurement/compression/routing is becoming default CI for agent teams — and a business.
- **Stealth web access for agents** — [camofox-browser](https://github.com/jo-inc/camofox-browser) (+135) against [browser-use](https://github.com/browser-use/browser-use) (113,046), [AIHawk](https://github.com/feder-cr/AIHawk) (30,322), [firecrawl](https://github.com/firecrawl/firecrawl) and [Scrapling](https://github.com/D4Vinci/Scrapling). Expect escalating anti-bot countermeasures and compliance scrutiny.
- **Agentic finance** — [AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) (+517), [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) (33,032), [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) (64,777). Retail autonomous trading is compounding fast; risk-control maturity lags.
- **Self-evolving + localized agents** — [hermes-agent](https://github.com/NousResearch/hermes-agent) (243,232), [GenericAgent](https://github.com/lsdefine/GenericAgent) (14,142), [evolver](https://github.com/EvoMap/evolver) (9,101), [CowAgent](https://github.com/zhayujie/CowAgent) (46,829), with [superpowers-zh](https://github.com/jnMetaCode/superpowers-zh) (8,023) showing a parallel Chinese-language skills ecosystem forming.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*