# AI Open Source Trends 2026-09-07

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-07 13:28 UTC

---

# AI Open Source Trends Report — 2026-09-07

**Filtering notes:** From the 14 trending repos, 3 were excluded as non-AI (`MoonTechLab/LunaTV` — video streaming, `BraveOPotato/FckSignups` — tool list, `pascalorg/editor` — 3D architecture). From topic search, `Snailclimb/JavaGuide` and `Developer-Y/cs-video-courses` were excluded as general education content. 11 of 14 trending repos and ~80 topic repos retained as AI-relevant.

---

## 1. Today's Highlights

The day belongs decisively to the **agent-harness layer**: [affaan-m/ECC](https://github.com/affaan-m/ECC) gained **+1,905 stars** (252K total) — roughly 2.5× the next AI gainer — and five more trending repos ([ruflo](https://github.com/ruvnet/ruflo), [deer-flow](https://github.com/bytedance/deer-flow), [marketingskills](https://github.com/coreyhaines31/marketingskills), [context-mode](https://github.com/mksglu/context-mode), [openai/skills](https://github.com/openai/skills)) target the same meta-layer above Claude Code/Codex/Cursor. OpenAI's official **Skills Catalog for Codex** trending signals that the skills format is being standardized at platform level. **Context engineering matured into its own product category**, with context-mode's "98% tool-output reduction" joining headroom and rtk in promising 60–98% token savings. Agent **web-access infrastructure** doubled down as two agent-grade browsers — [camofox-browser](https://github.com/jo-inc/camofox-browser) (stealth) and [lightpanda](https://github.com/lightpanda-io/browser) (Zig) — trended simultaneously. Meanwhile [markitdown](https://github.com/microsoft/markitdown)'s +771 reminds us that document→Markdown conversion remains core LLM plumbing.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | 0 (+771) | Microsoft's utility converting Office documents and files to Markdown for LLM ingestion. Today's largest AI infra gainer (+771), confirming document-to-context pipelines remain the workhorse of RAG and agent stacks. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,377 | Local runtime for open-weight models (Kimi-K2.6, GLM-5.2, DeepSeek, Qwen, gpt-oss, MiniMax). The default on-ramp for self-hosted agents — its README doubles as a live scoreboard of which open models matter. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 145,855 | Now repositioned as "the agent engineering platform." Still the reference framework layer beneath a large share of production agent builds. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 131,508 | Cross-platform desktop hub for configuring Claude Code, Codex, OpenCode, Grok Build & Hermes Agent. 131K stars is evidence users now run multiple harnesses in parallel and need a control plane. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,208 | Single-binary CLI proxy cutting LLM token consumption 60–90% on common dev commands. Token economics has clearly become a first-class infrastructure concern. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 69,294 | Compresses tool outputs, logs, and RAG chunks before they reach the context window (60–95% token cuts on JSON). Pairs with today's trending context-mode to mark context optimization as its own category. |
| [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser) | JavaScript | 0 (+117) | Stealth headless browser for AI agents that bypasses Cloudflare and bot detection as a Puppeteer/Playwright drop-in. +117 on trending-day visibility; note the legal/ToS gray zone of anti-detection tooling. |
| [lightpanda-io/browser](https://github.com/lightpanda-io/browser) | Zig | 0 (+116) | Headless browser purpose-built for AI and automation, written in Zig for performance. Two agent-browser projects trending the same day confirms web I/O as a genuine bottleneck category. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 252,363 (+1,905) | Agent-harness performance system layering skills, instincts, memory, and security onto Claude Code, Codex, OpenCode, and Cursor. +1,905 today is the single biggest AI signal in the dataset — harness optimization has exploded into a category. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 242,901 | "The agent that grows with you" — now among the most-starred agent projects anywhere. Cross-referenced as a first-class runtime by ruflo, cc-switch, and superpowers-zh. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,630 | Fair-code workflow automation with native AI and 400+ integrations, self-hostable. The workflow backbone a large share of real-world agent deployments actually run on. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 154,723 | Agentic workflow + RAG platform deployed on cloud, VPC, or self-hosted. Remains the default low-code path from agent prototype to production. |
| [openai/skills](https://github.com/openai/skills) | Python | 0 (+46) | OpenAI's official Skills Catalog for Codex. Vendor endorsement of the skills format is the strongest standardization signal in today's list. |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | TypeScript | 0 (+392) | "Agent meta-harness" for multi-player swarms with adaptive memory, self-learning, and RAG, integrating Claude Code/Codex/Hermes. +392 today — riding the same harness wave as ECC. |
| [coreyhaines31/marketingskills](https://github.com/coreyhaines31/marketingskills) | JavaScript | 0 (+329) | Vertical skill pack (CRO, copywriting, SEO, analytics, growth) for Claude Code and AI agents. +329 today shows skill distribution going domain-specific. |
| [bytedance/deer-flow](https://github.com/bytedance/deer-flow) | Python | 0 (+188) | ByteDance's long-horizon SuperAgent harness with sandboxes, memory, tools, skills, and subagents for minutes-to-hours tasks. A major big-tech entry in the harness race. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | 0 (+220) | "Write HTML. Render video. Built for agents" — HeyGen's agent-native video rendering pipeline. Top gainer in this category, extending generative-UI thinking into rendered media output. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,208 | Self-hosted AI interface supporting Ollama, OpenAI API, and more. The de facto front end of the local-LLM ecosystem. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,281 | One-click HD short-video generation from a topic via LLM-driven automated workflows. A long-running staple of the AI content-automation niche. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,414 | Local AI job-search agent running inside Claude Code/Codex/OpenCode CLIs — scans portals, grades listings A–H, tailors CVs. 70K stars signals AI coding CLIs becoming general-purpose app runtimes. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,737 | LLM-powered multi-market stock analysis with real-time news, decision dashboards, and zero-cost scheduled runs. Anchor of the hot agent-finance cluster (AutoHedge, Vibe-Trading, FinGPT). |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 52,719 | AI generates native PowerPoint decks with shapes, charts, narration, and custom .pptx templates. Office-file generation remains a top AI productivity vertical. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,542 | AI productivity studio with smart chat, autonomous agents, and 300+ assistants unified across frontier LLMs. A leading consumer-grade multi-model desktop app. |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | 0 (+142) | "Autonomous hedge fund in minutes" using swarm intelligence for market analysis, risk management, and trade execution. Trending today alongside Vibe-Trading (32,920) — autonomous finance agents are a sustained hot vertical. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,948 | The model-definition framework for SOTA text, vision, audio, and multimodal models, for training and inference. Still the substrate beneath nearly all fine-tuning work. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,518 | Build a ChatGPT-like LLM in PyTorch, step by step. 104K stars shows fundamentals education keeping pace with framework churn. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,753 | Local UI to run and train LLMs and diffusion models (GGUF, MLX, Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4). Tracks the open-weights frontier more closely than almost any tool. |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | Python | 52,722 | "Learn it. Build it. Ship it for others" — a full AI engineering curriculum. A second 50K+ education repo in this category indicates the talent pipeline is scaling aggressively. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,009 | "The absolute trainer to light up AI agents." Microsoft joining the post-training RL push for agents is a meaningful directional bet. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,705 | Agent Reinforcement Trainer applying GRPO to multi-step, on-the-job agent training (Qwen3.6, gpt-oss, Llama). Pairs with agent-lightning and AReaL to form a coherent agent-RL stack. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,425 | Evaluates 374 models — gpt-5.4, Gemini-3.1-Pro, Claude-4.6, Kimi-K2.6, DeepSeek-V4, Qwen3.6, GLM-5.1 — plus a 2M+ entry model-defect library. The most useful public map of the current model landscape. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,733 | "The RL Bridge for LLM-based Agent Applications," built simple and flexible. Completes today's agent-RL trio — training agents, not just prompting them, is the emerging frontier. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 177,491 | The "context API" to search, scrape, and interact with the web at scale. The dominant data-acquisition layer beneath modern agent and RAG stacks. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 115,545 | Turns codebases, docs, SQL, and PDFs into queryable knowledge graphs via a skill for Claude Code/Cursor/Codex/Gemini CLI — deterministic AST parsing, no vector store. A strong signal that graph-over-vectors retrieval is gaining mindshare. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 78,539 | One CLI giving agents read/search access to Twitter, Reddit, YouTube, GitHub, Bilibili, and XiaoHongShu with zero API fees. Social-web retrieval is emerging as its own context source. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuannote) | TypeScript | 46,217 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. Knowledge management tools are absorbing agent capabilities directly. |

*\*Total-star counts for trending-only repos read ⭐0 in the source feed; today's deltas are reported verbatim from input.*

---

## 3. Trend Signal Analysis

**Where attention is exploding.** Six of the eleven AI-related trending repos target the *harness layer* around existing coding agents rather than new models or end-user apps: [ECC](https://github.com/affaan-m/ECC) (+1,905, ~2.5× the next gainer), [ruflo](https://github.com/ruvnet/ruflo) (+392), [marketingskills](https://github.com/coreyhaines31/marketingskills) (+329), [deer-flow](https://github.com/bytedance/deer-flow) (+188), [context-mode](https://github.com/mksglu/context-mode) (+85), and [openai/skills](https://github.com/openai/skills) (+46). With [OmniRoute](https://github.com/diegosouzapw/OmniRoute) exposing 352 providers and 1,200+ models as a commodity routing layer, the community is betting value now accrues in orchestration — skills, memory, routing, security — not models.

**New stacks appearing.** First, *context engineering as a standalone category*: context-mode's 98% tool-output sandboxing echoes [headroom](https://github.com/headroomlabs-ai/headroom) (60–95% JSON compression) and [rtk](https://github.com/rtk-ai/rtk) (60–90% CLI token cuts) — the context window is being treated as a scarce, optimizable resource. Second, *agent-grade browsers*: [camofox](https://github.com/jo-inc/camofox-browser) (stealth) and [lightpanda](https://github.com/lightpanda-io/browser) (Zig performance) trending the same day marks web I/O as the agent bottleneck — though stealth tooling sits in a legal/ToS gray zone. Third, *agent-native media*: [hyperframes](https://github.com/heygen-com/hyperframes)' HTML→video pipeline extends generative-UI thinking into rendered output.

**Model-landscape connection.** Today's metadata references gpt-5.4, Gemini-3.1-Pro, and Claude-4.6 alongside first-class open weights (Kimi-K2.6, DeepSeek-V4, GLM-5.x, Qwen3.6, MiniMax) across ollama, unsloth, and the 374-model benchmark. DeepSeek-specific stacks are forming ([DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix)'s prefix-cache stability; [dsh-anchored-standard](https://github.com/xiaobright/dsh-anchored-standard)'s harness preset), and OpenAI plus ByteDance shipping official harness/skills repos signals platform vendors consolidating community-invented conventions.

---

## 4. Community Hot Spots

- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** — +1,905/day and 252K total makes harness optimization a product category, not a hack. Watch for consolidation and cross-harness compatibility plays (Claude Code / Codex / Cursor / OpenCode).
- **The skills economy** — [openai/skills](https://github.com/openai/skills) (official catalog) plus [marketingskills](https://github.com/coreyhaines31/marketingskills), [distilly](https://github.com/titanwings/distilly), and [agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) (2,100+ skills with a control plane). Portable, domain-specific skills look like the next plugin economy — building and curating them is a low-friction contribution path.
- **Token/context optimization trio** — [context-mode](https://github.com/mksglu/context-mode), [headroom](https://github.com/headroomlabs-ai/headroom), [rtk](https://github.com/rtk-ai/rtk): 60–98% measured token reductions with immediate ROI for any team running agents at scale.
- **Agent browser infrastructure** — [camofox-browser](https://github.com/jo-inc/camofox-browser) vs [lightpanda](https://github.com/lightpanda-io/browser) vs incumbents [browser-use](https://github.com/browser-use/browser-use) (112,873) and [Scrapling](https://github.com/D4Vinci/Scrapling) (78,987), plus [Agent-Reach](https://github.com/Panniantong/Agent-Reach) for social-web retrieval. Choose by compliance posture — stealth capabilities carry real ban/legal risk.
- **Agent RL training** — [agent-lightning](https://github.com/microsoft/agent-lightning), [ART](https://github.com/OpenPipe/ART) (GRPO), [AReaL](https://github.com/areal-project/AReaL): post-deployment RL improvement of agents is the emerging differentiator beyond harness tuning, and intersects with self-evolving agents like [GenericAgent](https://github.com/lsdefine/GenericAgent) and [evolver](https://github.com/EvoMap/evolver).

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*