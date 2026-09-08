# AI Open Source Trends 2026-09-09

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-08 23:30 UTC

---

# AI Open Source Trends Report — 2026-09-09

**Scope & filter note:** From 16 trending + 83 topic-search repositories, 14 of 16 trending entries are AI-relevant. Excluded as non-AI: `MoonTechLab/LunaTV` (video streaming app), `viarotel-org/escrcpy` (Android mirroring), `Snailclimb/JavaGuide` (interview guide), `Developer-Y/cs-video-courses` (course list), `netdata/netdata` (general observability), `medusajs/medusa` (commerce platform). Duplicates across sources (ECC, browser-use) merged.

---

## 1. Today's Highlights

The agent-skills economy is today's dominant story: **seven of the fourteen AI-related trending repos are skill packs, CLAUDE.md presets, or harness configs** for Claude Code, Codex, Cursor and Opencode — headlined by [affaan-m/ECC](https://github.com/affaan-m/ECC) (+1,426), [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) (+1,020), and OpenAI's official [openai/skills](https://github.com/openai/skills) catalog (+490), signaling skills are becoming a platform primitive. [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) was the single hottest AI repo (+2,628), pushing "agents write HTML → render video" as a new generative-media stack. Microsoft's [markitdown](https://github.com/microsoft/markitdown) (+2,045) confirmed document-to-context preparation as durable infrastructure. Stealth browsing for agents ([camofox-browser](https://github.com/jo-inc/camofox-browser), +872) alongside [browser-use](https://github.com/browser-use/browser-use) shows the agent web-access arms race intensifying, while [AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) (+494) extends the agentic-finance wave.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) | TypeScript | 0 (+2,628)† | HeyGen's engine that renders HTML into video, designed to be driven by coding agents. Today's top AI gainer (+2,628), it positions video output as a first-class agent capability. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,480 | The default local runtime for open-weight and frontier models, now listing Kimi-K2.6, GLM-5.2, DeepSeek, gpt-oss, Qwen and Gemma. At 180k stars it is the on-ramp that re-accelerates with every model release. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 131,755 | Cross-platform desktop control panel for Claude Code, Codex, OpenCode, OpenClaw, Grok Build and Hermes Agent. 131k stars reflect the real pain of juggling multiple agent CLIs amid model churn. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,533 | Single-binary CLI proxy that cuts LLM token consumption 60–90% on common dev commands. 79.5k stars show token economics hardening into core agent infrastructure. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 70,787 | Compresses tool outputs, logs, files and RAG chunks before they reach the LLM — 20% token savings for coding agents, 60–95% for JSON. 70.7k stars position it as the middleware layer of context engineering. |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 62,983 | MIT-licensed AI gateway unifying 352 providers (150+ free) and 1,200+ models behind one endpoint, with quota-aware fallback plus RTK/Caveman compression. 63k stars and 550+ contributors signal community pushback against agent vendor lock-in. |
| [mksglu/context-mode](https://github.com/mksglu/context-mode) | TypeScript | 0 (+652)† | Sandboxes tool output (claims 98% context reduction), persists session memory and enforces routing across 17 agent platforms via MCP + hooks. +652 today as context-window management becomes a daily developer concern. |
| [openai/skills](https://github.com/openai/skills) | Python | 0 (+490)† | OpenAI's official Skills Catalog for Codex, standardizing packaged agent capabilities. +490 today, its arrival alongside community skill packs suggests skills are becoming an official platform primitive. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 254,259 (+1,426) | An agent-harness performance system layering skills, instincts, memory, security and research-first workflow onto Claude Code, Codex, Opencode and Cursor. The fastest-growing non-media repo today (+1,426) on a 254k base. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 243,437 | NousResearch's personal agent that "grows with you." 243k stars for a self-improving personal agent from an open-weights lab shows demand well beyond corporate harnesses. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,768 | Fair-code workflow automation with native AI capabilities and 400+ integrations. 203k stars make it the default visual substrate for agentic automation. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 113,462 (+320) | The leading library for making websites operable by AI agents. Still adding +320 daily on 113k stars — durable momentum for browser agents. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+1,020)† | 38 self-contained HTML/SVG editorial diagram types packaged as skills for Claude Code, Codex and Pi, with an explicitly anti-Mermaid stance. +1,020 today rides the skills boom. |
| [jo-inc/camofox-browser](https://github.com/jo-inc/camofox-browser) | JavaScript | 0 (+872)† | Stealth headless browser bypassing Cloudflare, bot detection and anti-scraping, as a drop-in Puppeteer/Playwright replacement. +872 today as agent web-access and site defenses harden into an arms race. |
| [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) | | 0 (+533)† | A single CLAUDE.md distilling Karpathy's observations on LLM coding pitfalls into agent behavior. +533 today on the strength of one curated file — proof that config-as-content is a viable distribution strategy. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+446)† | An agentic skills framework and software development methodology (116k+ stars per its Chinese localization). +446 today anchors the community skills ecosystem. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [f/prompts.chat](https://github.com/f/prompts.chat) | HTML | 169,708 | The canonical community prompt library (formerly Awesome ChatGPT Prompts), now self-hostable for organizations. 169k stars of accumulated prompt craft remain the long tail of the skills economy. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,379 | User-friendly self-hosted AI interface supporting Ollama, OpenAI API and more. 151k stars make it the default UI for local-model deployments. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,587 | One-click HD short-video generation from a topic via LLM-driven automated workflows. 121k stars show agent-generated media is a proven consumer category. |
| [koala73/worldmonitor](https://github.com/koala73/worldmonitor) | TypeScript | 85,845 | Real-time global intelligence dashboard combining AI news aggregation, geopolitical monitoring and infrastructure tracking. 85.8k stars for situational-awareness tooling built on the agent stack. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,626 | Local-first AI job search: scans portals, scores listings A–H, tailors CVs and tracks applications inside coding CLIs. 70.6k stars show coding agents repurposed as personal-ops automation. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,801 | LLM-powered multi-market stock analysis with real-time news, decision dashboards, push alerts and cost-free scheduled runs. 64.8k stars anchor the Chinese agentic-finance wave. |
| [sansan0/TrendRadar](https://github.com/sansan0/TrendRadar) | Python | 62,131 | AI-driven opinion/trend monitor aggregating multi-platform hot topics with RSS, smart alerts, MCP integration and multi-channel push. 62.1k stars show information-overload relief is a durable use case. |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | 0 (+494)† | Swarm-intelligence kit for building an autonomous hedge fund that automates analysis, risk management and execution. +494 today as autonomous finance agents move from demo to product. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,008 | The model-definition framework for SOTA text, vision, audio and multimodal models, for inference and training. 165k stars — still the trunk everything else branches from. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,862 | Local UI to run and train LLMs and diffusion models (GGUF, MLX, Qwen, DeepSeek, Gemma, FLUX). 75.8k stars as fine-tuning keeps migrating onto personal hardware. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,748 | Distributed AI compute engine combining a core runtime with AI libraries for accelerating ML workloads. 43.7k stars underpin scale-out training and serving. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,224 | Open-source financial LLMs with trained weights released on Hugging Face. 21.2k stars plus today's agentic-finance momentum give it fresh relevance. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,029 | Microsoft's trainer for AI agents — post-training of agent behavior as a discipline. 18k stars signals "agent gym" tooling as an emerging category. |
| [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) | Python | 12,500 | The standard API for single-agent RL environments (formerly Gym). 12.5k stars and renewed agent-RL activity (AReaL, agent-lightning) restore it to centrality. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,428 | Continuous Chinese-language LLM evaluation covering 374 models — GPT-5.4, Gemini 3.1 Pro, Claude 4.6, Kimi K2.6, DeepSeek-V4, Qwen3.6 — plus a 2M+ defect library. A rare public window into frontier model quality. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,738 | RL bridge purpose-built for LLM-based agent applications. 5.7k stars as the training side of the agent wave. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 178,018 | The "context API" to search, scrape and interact with the web at scale. 178k stars make it the default ingestion layer for RAG pipelines and agents. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,061 | Turns codebases, docs, SQL and PDFs into queryable knowledge graphs via a skill for Claude Code/Cursor/Codex/Gemini — deterministic AST parsing, no vector store. 116k stars for a no-embedding approach to codebase knowledge. |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 79,400 | Adaptive web-scraping framework covering everything from a single request to full-scale crawls. 79.4k stars riding agent-driven data demand. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,237 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. 46.2k stars as note-taking absorbs agentic AI. |
| [microsoft/markitdown](https://github.com/microsoft/markitdown) | Python | 0 (+2,045)† | Converts files and Office documents to Markdown for LLM ingestion. +2,045 today — the third-highest gainer — confirming context prep is everyday infrastructure. |

*† Trending-list entries report total stars as 0 in the source data; today's gain shown in parentheses.*

---

## 3. Trend Signal Analysis

Today's list is overwhelmingly the **agent-skills economy**. Seven of fourteen AI trending repos are skill packs, CLAUDE.md presets, or harness configs targeting Claude Code, Codex and Cursor — from diagram skills (+1,020) to marketing skill suites (coreyhaines31/marketingskills, +666) to an ADHD-friendly output skill (+422). OpenAI's official openai/skills (+490) trending alongside openai/plugins (+176) signals skills becoming a first-class platform primitive rather than community folklore.

The second explosive theme is **context/token economics**: markitdown (+2,045) for document ingestion, context-mode (+652) for sandboxing tool output (98% reduction), and across the 7-day window rtk (79.5k), headroom (70.8k), caveman (104k) and OmniRoute (63k) — a maturing "context engineering" stack of compress, route, and gate.

New directions visible for the first time: **agent-native media rendering** (hyperframes, +2,628 — HeyGen's HTML→video engine reframes video as agent output), **stealth browsing as agent infrastructure** (camofox, +872, alongside browser-use's 113k), and **harness optimization consolidating as a product category** (ECC +1,426; strands-agents/harness-sdk; HKUDS/DeepCode's "loop engineering").

Industry connection: the frontier release cycle — GPT-5.4, Gemini 3.1 Pro, Claude 4.6, Kimi K2.6, DeepSeek-V4, GLM-5.x, per ollama's model lineup and chinese-llm-benchmark's coverage — keeps flooding local runtimes and harnesses with new models, fueling demand for switchers (cc-switch, 131k), gateways and evaluation. Agentic finance (AutoHedge +494; daily_stock_analysis 64.8k; Vibe-Trading 33k) rides the same autonomy wave, while established platforms (AutoGPT 187k, LangChain 146k, Dify 155k) remain the stable backbone.

---

## 4. Community Hot Spots

- **[heygen-com/hyperframes](https://github.com/heygen-com/hyperframes)** (+2,628 today) — Highest velocity on the board; defines "HTML as a video DSL for agents." Watch for convergence between generative-media companies and coding agents.
- **[openai/skills](https://github.com/openai/skills) × [obra/superpowers](https://github.com/obra/superpowers) × [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design)** — The skills-standardization race. If OpenAI's Codex catalog and community Claude Code skills converge on a common format, early skill authors gain massive distribution.
- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** (254k, +1,426) — Harness-level optimization (memory, instincts, security, methodology) is emerging as the meta-layer above coding agents; the strongest single momentum signal in agents today.
- **Token/context cost control: [rtk-ai/rtk](https://github.com/rtk-ai/rtk), [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom), [mksglu/context-mode](https://github.com/mksglu/context-mode)** — As agent autonomy grows, context spend becomes the dominant unit cost; these measure and compress it (15–95% savings claims).
- **Agentic finance cluster: [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) (+494), [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) (64.8k), [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) (33k), [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT)** — A full open-source quant-agent stack (models → analysis → execution) is visibly forming; regulatory and reliability scrutiny will follow.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*