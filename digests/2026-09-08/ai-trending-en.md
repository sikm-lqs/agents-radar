# AI Open Source Trends 2026-09-08

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-07 23:30 UTC

---

# AI Open Source Trends Report — 2026-09-08

> **Filter note:** Non-AI repos excluded: [MoonTechLab/LunaTV](https://github.com/MoonTechLab/LunaTV) (streaming), [BraveOPotato/FckSignups](https://github.com/BraveOPotato/FckSignups) (tool directory), [pascalorg/editor](https://github.com/pascalorg/editor) (3D architecture), [Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide) (interview guide), [Developer-Y/cs-video-courses](https://github.com/Developer-Y/cs-video-courses) (CS lectures), [netdata/netdata](https://github.com/netdata/netdata) (observability), [medusajs/medusa](https://github.com/medusajs/medusa) (commerce). Pure book/resource repos were AI-related but omitted from tables for space. ECC appears in both sources (merged). "—" = total stars unavailable in source (trending list reports today's gain only).

---

## 1. Today's Highlights

Agent **harness optimization** is today's runaway story: [affaan-m/ECC](https://github.com/affaan-m/ECC) gained **+1,905 stars** — roughly 2.5× the next AI repo — for a "skills, instincts, memory, security" layer that turbocharges Claude Code, Codex, OpenCode, and Cursor. Official ecosystem moves landed simultaneously: [openai/skills](https://github.com/openai/skills) (+372) standardizes a Codex skills catalog, while HeyGen open-sourced [hyperframes](https://github.com/heygen-com/hyperframes) (+734), an HTML-to-video engine explicitly "built for agents." A **context-engineering cluster** is trending — [markitdown](https://github.com/microsoft/markitdown) (+771), [context-mode](https://github.com/mksglu/context-mode), [rtk](https://github.com/rtk-ai/rtk) — all attacking token cost and context pollution as agents run longer. **Agent-native browsers** surged, with [camofox-browser](https://github.com/jo-inc/camofox-browser) (+285) and [lightpanda](https://github.com/lightpanda-io/browser) rebuilding web access for (and against) bots. Finance autonomy got loud: [AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) (+541) for swarm-driven hedge funds, alongside 60k+ starred [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis).

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 252,798 (+1,905) | Agent harness performance system adding skills, instincts, memory, and security to Claude Code, Codex, OpenCode, and Cursor. Today's biggest gainer by a wide margin, signaling demand for tuning existing agents rather than building new ones. |
| [openai/skills](https://github.com/openai/skills) | Python | — (+372) | Official OpenAI skills catalog for Codex, standardizing reusable agent capabilities. Strong day-one traction for a first-party repo, reinforcing "skills" as the emerging extension format for coding agents. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,414 | Local runtime for Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, and Gemma. Still the default on-ramp for local inference; its model list doubles as a snapshot of which open weights matter. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 177,642 | Web search/scrape "context API" turning pages into LLM-ready data at scale. A foundational layer for agent data access that consistently tops AI rankings. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 131,541 | Desktop hub managing Claude Code, Codex, OpenCode, OpenClaw, Grok Build, and Hermes Agent configs in one place. Its 131k stars reflect how many coding agents a single developer now juggles daily. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,306 | Single-binary CLI proxy cutting LLM token consumption 60–90% on common dev commands. Embodies the "context economy" — cost optimization as a first-class infrastructure concern (see also [headroom](https://github.com/headroomlabs-ai/headroom), 70,057). |
| [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser) | JavaScript | — (+285) | Stealth headless browser for AI agents that bypasses Cloudflare and bot detection as a drop-in Puppeteer/Playwright replacement. Trending as agent devs push against anti-bot walls; [lightpanda](https://github.com/lightpanda-io/browser) (Zig, +116) targets the same agent-browser niche. |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | — (+147) | Context-window optimization for coding agents — sandboxes tool output (98% reduction), persists session memory, and routes across 17 platforms via MCP + hooks. Small but emblematic of the context-engineering wave. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 243,040 | "The agent that grows with you" — NousResearch's flagship personal agent. Highest total star count in the dataset, showing personal-agent frameworks have fully mainstreamed. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,667 | Fair-code workflow automation with native AI and 400+ integrations. The reference point for visual agentic workflow building at production scale. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,185 | The original autonomous-agent project, now a broader platform. Remains a top-5 starred AI repo and a barometer for the autonomy hype cycle. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 154,849 | Collaborative workspace for agentic workflows and RAG pipelines with broad model/tool support. Continues to define the team-oriented "agent platform" category. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 145,883 | Now self-described as "the agent engineering platform," fully pivoted from LLM chaining to agents. Its repositioning mirrors the ecosystem-wide shift. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 112,938 | Makes websites operable by AI agents — the de facto browser-automation layer for agents. Pairs directly with today's agent-browser infrastructure momentum. |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | TypeScript | — (+392) | "Agent meta-harness" for multi-player swarms, autonomous workflows, adaptive memory, and RAG, integrating Claude Code/Codex/Hermes. +392 today shows appetite for orchestration layers above individual agents. |
| [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | Python | — (+188) | ByteDance's long-horizon "SuperAgent" harness combining sandboxes, memory, subagents, and a message gateway for tasks lasting minutes to hours. Big-lab validation of long-running agent architecture. |

*Long tail keeps growing: [agentscope](https://github.com/agentscope-ai/agentscope) (30,999), [nanobot](https://github.com/HKUDS/nanobot) (47,853), [CowAgent](https://github.com/zhayujie/CowAgent) (46,812), [AIHawk](https://github.com/feder-cr/AIHawk) (30,318), [lobehub](https://github.com/lobehub/lobehub) (82,298), plus terminal coding agents [Codewhale](https://github.com/Hmbown/Codewhale) (40,925), [DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) (35,440), [qwen-code](https://github.com/QwenLM/qwen-code) (27,700), [kilocode](https://github.com/Kilo-Org/kilocode) (27,219).*

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,256 | Self-hosted, user-friendly chat UI for Ollama/OpenAI-compatible APIs. The default front door for private LLM deployments. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,347 | One-click HD short-video generation from a topic via LLM workflows. Long-run traction proves AI content generation is a durable OSS category. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,460 | Local-first AI job-search pipeline — scans portals, scores listings A–H, tailors CVs, tracks applications inside Claude Code/Codex-style CLIs. Striking example of vertical apps shipping as agent skills rather than standalone products. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,745 | LLM-powered multi-market stock analysis with news, dashboards, and zero-cost scheduled runs. Anchor of a strong Chinese-community finance-agent cluster. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 52,785 | Turns documents/topics into native PowerPoint decks with real shapes, charts, transitions, and narration. Office-native output (not markdown slides) is the differentiator. |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | — (+734) | HeyGen's "write HTML, render video" engine built for agents. The strongest non-ECC debut today, marking agent-native video generation as a new output surface. |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | JavaScript | — (+602) | Marketing skill pack (CRO, copywriting, SEO, analytics, growth) for Claude Code and other agents. +602 today signals an emerging "skills economy" of vertical agent capabilities. |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | — (+541) | Build an autonomous hedge fund in minutes using swarm intelligence for analysis, risk, and execution. +541 today; finance autonomy is one of the day's loudest themes (see also [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading), 32,985). |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,963 | Model-definition framework for SOTA text/vision/audio/multimodal training and inference. The bedrock library of the open-model ecosystem. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,540 | Step-by-step PyTorch implementation of a ChatGPT-like LLM. Sustained 100k+ stars show education keeping pace with model releases. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,777 | Local UI to run/train LLMs and diffusion models (GGUF, MLX, Qwen3.8, DeepSeek-V4, Gemma 4). Go-to for consumer-GPU fine-tuning; its model list tracks the open-weights frontier. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,729 | Distributed AI compute engine plus libraries for ML workloads. The scaling substrate beneath much agent/LLM training infrastructure. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,222 | Open-source financial LLMs with trained weights on HuggingFace. Anchors the finance-LLM theme also visible in today's trending AutoHedge. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,015 | "The absolute trainer to light up AI agents" — RL-based agent training from Microsoft. Signals the shift from prompting agents to actually training them. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,705 | Agent Reinforcement Trainer applying GRPO to multi-step, on-the-job agent training (Qwen3.6, GPT-OSS, Llama). RL-for-agents is consolidating into its own sub-field. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,733 | RL bridge purpose-built for LLM-based agent applications. Small, but part of a consistent agent-RL cluster with agent-lightning and ART. |

*Classic RL stack remains active: [Gymnasium](https://github.com/Farama-Foundation/Gymnasium) (12,483), [stable-baselines3](https://github.com/DLR-RM/stable-baselines3) (13,776), [ml-agents](https://github.com/Unity-Technologies/ml-agents) (19,662); eval via [chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) (6,425, 374 models).*

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 115,690 | Turns codebases, docs, SQL, and PDFs into queryable knowledge graphs via a /graphify skill for Claude Code/Cursor/Codex/Gemini CLI. Notable for deterministic AST parsing and "no vector store" — a graph-first challenge to embedding-centric RAG. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 78,616 | One CLI giving agents read/search access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu with zero API fees. Real-time external retrieval is becoming standard agent equipment. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,224 | Privacy-first, self-hosted knowledge workspace explicitly built for human–agent collaboration. Representative of knowledge tools repositioning around agents. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 28,983 | MCP toolkit giving coding agents semantic retrieval and editing over code — "the IDE for your agent." Bridges retrieval techniques directly into the coding-agent toolchain. |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | — (+771) | Microsoft's converter from office documents and files to Markdown, the lingua franca of LLM context. +771 today — ingestion tooling trends as context quality becomes the bottleneck. |

---

## 3. Trend Signal Analysis

**The harness/skills layer is exploding.** ECC's +1,905 stars is nearly 2.5× the next AI repo today, and it's not alone: marketingskills (+602), OpenAI's official Codex skills catalog (+372), and [agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) (46,119 ⭐, 2,100+ skills) all point the same direction. The community's unit of work is shifting from "build an agent" to "optimize the harness" — skills, memory, instincts, security — layered over Claude Code, Codex, Cursor, and OpenCode. Supporting evidence: cc-switch exists purely to manage six-plus coding agents, and [codeburn](https://github.com/getagentseal/codeburn) tracks token spend across 37 tools; even persona tuning scales ([ponytail](https://github.com/DietrichGebert/ponytail), 130,920 ⭐).

**Context economics is a new infrastructure category.** rtk (60–90% token cuts), headroom (60–95% on JSON), context-mode (98% tool-output reduction), and [OmniRoute](https://github.com/diegosouzapw/OmniRoute) (compression inside the gateway) all attack the same bottleneck, with markitdown (+771) supplying clean ingestion.

**First-time directions with unusual density:** agent-native browsers including stealth anti-bot evasion (camofox +285, lightpanda, browser-use, [Scrapling](https://github.com/D4Vinci/Scrapling) 79,117); agent-native media formats (hyperframes' HTML→video, +734); vector-free knowledge-graph RAG (graphify); and RL training for deployed agents (agent-lightning, ART, AReaL).

**LLM-release linkage:** current leaderboard coverage (GPT-5.4, Gemini-3.1-Pro, Claude-4.6, DeepSeek-V4, Qwen3.6, Kimi-K2.6, GLM-5.x) matches the model lists in ollama and unsloth — Chinese open weights are the default local stack. DeepSeek-Reasonix's prefix-cache-stability design ties directly to DeepSeek's caching economics, while HeyGen and OpenAI open-sourcing agent-facing surfaces confirms major vendors actively courting this ecosystem.

---

## 4. Community Hot Spots

- **The skills economy** — [ECC](https://github.com/affaan-m/ECC), [openai/skills](https://github.com/openai/skills), [marketingskills](https://github.com/coreyhaines31/marketingskills), [superpowers-zh](https://github.com/jnMetaCode/superpowers-zh), [distilly](https://github.com/titanwings/distilly). Today's fastest velocity; skills are becoming the distribution unit for agent capabilities — an "npm moment" for agents, with first-mover authoring advantages.
- **Context & token engineering** — [rtk](https://github.com/rtk-ai/rtk), [headroom](https://github.com/headroomlabs-ai/headroom), [context-mode](https://github.com/mksglu/context-mode), [OmniRoute](https://github.com/diegosouzapw/OmniRoute), [codeburn](https://github.com/getagentseal/codeburn). As long-horizon agents ([deer-flow](https://github.com/bytedance/deer-flow)) run minutes-to-hours, context budget *is* the unit economics; tooling here compounds across every agent platform.
- **Agent "senses": browsers + data access** — [camofox-browser](https://github.com/jo-inc/camofox-browser), [lightpanda](https://github.com/lightpanda-io/browser), [browser-use](https://github.com/browser-use/browser-use), [Agent-Reach](https://github.com/Panniantong/Agent-Reach), [firecrawl](https://github.com/firecrawl/firecrawl). The largest unlocked surface area; note that stealth scraping raises ToS/legal questions worth monitoring.
- **RL for agents** — [agent-lightning](https://github.com/microsoft/agent-lightning), [ART](https://github.com/OpenPipe/ART), [AReaL](https://github.com/areal-project/AReaL). Post-deployment training is the credible path from brittle, prompted agents to reliable ones; early but high-leverage.
- **Vertical, outcome-complete agents** — [AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge), [career-ops](https://github.com/career-ops-hq/career-ops), [ppt-master](https://github.com/hugohe3/ppt-master), [hyperframes](https://github.com/heygen-com/hyperframes). Today's user growth is in domain-complete outcomes (a hedge fund, a job hunt, a deck, a video) rather than frameworks — with autonomous trading carrying the most regulatory risk.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*