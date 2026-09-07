# AI Open Source Trends 2026-09-08

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-07 16:38 UTC

---

# AI Open Source Trends Report — 2026-09-08

> **Filter note (Step 1):** Excluded as non-AI: `MoonTechLab/LunaTV` (video streaming), `BraveOPotato/FckSignups` (generic tool list), `pascalorg/editor` (3D architecture), `Developer-Y/cs-video-courses` (CS course list), `Snailclimb/JavaGuide` (Java interview guide), `netdata/netdata` (general observability), `medusajs/medusa` (commerce platform; agent mention is marketing-level only). `affaan-m/ECC` deduplicated across both data sources.

---

## 1. Today's Highlights

Agent-harness optimization dominates today: [ECC](https://github.com/affaan-m/ECC) leads the trending list with **+1,905 stars (252,502 total)**, while [OpenAI's official skills catalog](https://github.com/openai/skills) (+372) and [ByteDance's deer-flow](https://github.com/bytedance/deer-flow) confirm the harness/skills layer as the ecosystem's center of gravity. [Heygen's hyperframes](https://github.com/heygen-com/hyperframes) (+734) debuts an HTML-to-video rendering pipeline "built for agents" — the strongest new application-stack signal of the day. Token/context economics is consolidating into real products ([rtk](https://github.com/rtk-ai/rtk) at 79,238 stars, [headroom](https://github.com/headroomlabs-ai/headroom) at 69,498, [context-mode](https://github.com/mksglu/context-mode) trending). Agent web access is escalating into an arms race, with stealth browsers [camofox](https://github.com/jo-inc/camofox-browser) (+117) and [lightpanda](https://github.com/lightpanda-io/browser) (+116) trending as anti-bot bypass becomes explicit infrastructure.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,387 | Local runtime for Kimi-K2.6, GLM-5.2, DeepSeek, gpt-oss, Qwen, Gemma. Remains the default on-ramp for open-weight models and tracks each new release within days. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 131,525 | Cross-platform desktop control panel for Claude Code, Codex, OpenCode, Grok Build & Hermes Agent. Its 131K stars prove users now juggle multiple coding CLIs and need a switchboard. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,238 | CLI proxy that cuts LLM token consumption 60–90% on common dev commands as a single zero-dependency binary. Signals that token-cost control has become default agent plumbing. |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 62,365 | MIT AI gateway: one endpoint, 352 providers (150+ free), 1,200+ models, quota-aware fallback and 15–95% token compression, built by 550+ contributors. Aggressive commoditization of model access. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 28,957 | MCP toolkit providing semantic retrieval and editing — "the IDE for your agent." A stable anchor of the MCP-based coding stack. |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | N/A* (+771) | Converts Office/PDF files to Markdown for LLM ingestion. +771 today shows document-to-context pipeline demand is still accelerating. |
| [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser) | JavaScript | N/A* (+117) | Stealth headless browser bypassing Cloudflare and bot detection as a drop-in Puppeteer/Playwright replacement. Anti-bot evasion is now openly packaged as agent infrastructure. |
| [lightpanda-io/browser](https://github.com/lightpanda-io/browser) | Zig | N/A* (+116) | Headless browser purpose-built for AI and automation, written in Zig. The agent-serving stack is diversifying beyond Node/Chromium. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 252,502 (+1,905) | Agent harness performance system: skills, instincts, memory, security, and research-first development for Claude Code, Codex, Opencode, Cursor. Today's #1 trending repo overall. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 242,955 | "The agent that grows with you" — a personal agent from Nous Research. Sits near the very top of the entire agent category by stars. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 112,912 | Makes websites accessible to AI agents for online task automation. The de facto browser-automation layer beneath dozens of agent stacks. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 78,561 | CLI giving agents read/search over Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu with zero API fees. 78K stars shows data access is a top-tier agent need. |
| [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code) | TypeScript | 27,700 | Official Qwen terminal coding agent. Evidence that model vendors are shipping native harnesses to own the agentic workflow. |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | TypeScript | N/A* (+392) | "Agent meta-harness" deploying multi-player swarms with adaptive memory, self-learning, and RAG across Claude Code/Codex integrations. Meta-orchestration is stacking on top of existing harnesses. |
| [openai/skills](https://github.com/openai/skills) | Python | N/A* (+372) | Official Skills Catalog for Codex. First-party blessing of the skills pattern — the key thing to watch for a portable cross-agent skill standard. |
| [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | Python | N/A* (+188) | Long-horizon SuperAgent harness (sandboxes, memory, subagents, message gateway) for tasks lasting minutes to hours. ByteDance's bet on durable, long-running autonomy. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | N/A* (+734) | "Write HTML. Render video. Built for agents." Heygen's code-as-media pipeline is the day's strongest application-side signal and a new generative-video stack. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,307 | One-click HD short-video generation from a topic or keyword via LLM workflows. Evergreen content-automation demand at massive scale. |
| [koala73/worldmonitor](https://github.com/koala73/worldmonitor) | TypeScript | 85,764 | Real-time global intelligence dashboard: AI news aggregation, geopolitical monitoring, and infrastructure tracking in one situational-awareness UI. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,435 | Local AI job-search pipeline — scan portals, score listings (A–H, 1–5), tailor CVs, track applications — running inside Claude Code/Codex CLIs. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,742 | LLM-driven multi-market stock analysis with live news, decision dashboards, push notifications, and zero-cost scheduled runs. Huge traction in the Chinese retail-investor dev community. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 52,764 | Documents/topics → native PowerPoint decks with real shapes, charts, animations, and narration. Office-native output beats screenshot-style slide generation. |
| [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) | Python | 32,941 | "Your personal trading agent" from HKUDS. Academic labs are now shipping polished vertical agents at commercial-grade adoption. |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | N/A* (+541) | Autonomous hedge fund in minutes: swarm intelligence + agents for market analysis, risk management, and execution. +541 today shows finance autonomy still pulls hard. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,959 | The model-definition framework for SOTA text, vision, audio, and multimodal training/inference. Still the backbone of open ML. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,526 | Build a ChatGPT-like LLM in PyTorch step by step. Education demand remains enormous as practitioners move up the stack. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,758 | Local UI to run and train LLMs and diffusion models (GGUF, MLX, Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4, FLUX). Local fine-tuning keeps compounding. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,726 | AI compute engine: distributed runtime plus libraries for ML workloads. The substrate beneath the scaling-training wave. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,014 | "The absolute trainer to light up AI agents" — RL training for agent stacks. A signal that RL-for-agents is going mainstream. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,705 | Agent Reinforcement Trainer using GRPO for multi-step, real-world tasks on Qwen3.6, GPT-OSS, Llama. On-the-job RL for agents. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | — | 6,425 | Tracks 374 models (GPT-5.4, Gemini-3.1-Pro, Claude-4.6, ERNIE-5.0, Qwen3.6, DeepSeek-V4…) plus a 2M-entry defect database. The best window into the Chinese model race. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,733 | RL bridge for LLM-based agent applications, made simple and flexible. Simplifies a notoriously messy training layer. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 177,544 | The context API to search, scrape, and interact with the web at scale. Default web-data layer for both RAG pipelines and agents. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 115,599 | Turns codebases, docs, SQL, and PDFs into queryable knowledge graphs via a skill for Claude Code/Cursor/Codex/Gemini — deterministic AST parsing, every edge explained, no vector store. Graph-over-vectors is a serious rising alternative. |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 79,043 | Adaptive scraping framework from a single request to a full-scale crawl. Feeds the agent data appetite directly. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 69,498 | Compresses tool outputs, logs, files, and RAG chunks before they reach the LLM — 20% token cut for coding agents, 60–95% for JSON with same answers. Context economics as a standalone product. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,220 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. The human-in-the-loop knowledge base pattern. |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | N/A* (+147) | Context-window optimization for coding agents: sandboxes tool output (98% reduction), persists session memory, and enforces routing across 17 platforms via MCP + hooks. |

\* *Trending-list repos report today's gains only; total star counts were not present in the source data (shown as N/A). All numbers copied verbatim from input.*

---

## 3. Trend Signal Analysis

The dominant signal today is the **agent harness maturing into a product category**. ECC (+1,905 stars/day; 252,502 total) heads a cluster including deer-flow, ruflo, and OpenAI's official skills catalog — value is shifting from raw model access to the orchestration layer: skills, memory, instincts, security, and routing across Claude Code, Codex, and Cursor. A skills marketplace is forming in real time (marketingskills +602 today; agentic-awesome-skills at 46,104; superpowers-zh at 8,012 all package capabilities as portable agent modules).

Second, **token economics has hardened into infrastructure**. rtk (79,238), headroom (69,498), context-mode (+147), and codeburn (10,886) attack context burnout via proxies, compression, sandboxed tool output, and cost dashboards — "context ops" is becoming a standard budget line.

Third, **agent web access is escalating**: stealth browsers camofox and lightpanda trend alongside Agent-Reach (78,561), Scrapling (79,043), and firecrawl (177,544), marking an open arms race between agent data acquisition and site defenses.

Genuinely new directions: hyperframes (+734) establishes HTML-as-video for agents — code as a media substrate; "loop engineering" is being codified with dedicated CLIs; and RL-for-agents (agent-lightning, ART's GRPO trainer, AReaL) moves agent fine-tuning from papers into repos.

Timing tracks the model cycle referenced across the data — GPT-5.4, Gemini-3.1-Pro, Claude-4.6, DeepSeek-V4, Kimi-K2.6, GLM-5.2, Qwen3.6. Each frontier or open-weight release resets harness economics, spawning vendor-native agents (qwen-code, DeepSeek-Reasonix) and multi-provider gateways (OmniRoute's 352 providers), while the Chinese-language ecosystem compounds in parallel (superpowers-zh, CowAgent, daily_stock_analysis).

---

## 4. Community Hot Spots

- **[openai/skills](https://github.com/openai/skills) (+372)** — OpenAI's first-party skills catalog is the likeliest catalyst for a portable skill-pack standard across Claude Code, Codex, and beyond; the surrounding marketplace (marketingskills, agentic-awesome-skills, superpowers-zh) is already forming around it.
- **[affaan-m/ECC](https://github.com/affaan-m/ECC) (+1,905)** — fastest-moving repo today; its harness design (instincts, memory, security, research-first loops) is the reference playbook for anyone doing agent performance work.
- **Context-optimization stack: [rtk](https://github.com/rtk-ai/rtk) + [headroom](https://github.com/headroomlabs-ai/headroom) + [context-mode](https://github.com/mksglu/context-mode)** — combining proxy, compression, and sandboxed tool output can cut token spend 60–95% before you even switch models; highest-ROI area right now.
- **Agent data access: [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser) + [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach)** — stealth browsing plus free multi-platform reads form the emerging "eyes layer" for agents; watch the ToS/legal friction that will follow.
- **RL for agent loops: [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) + [OpenPipe/ART](https://github.com/OpenPipe/ART)** — GRPO-based training of multi-step agent behavior is the next lever once prompting and skills plateau.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*