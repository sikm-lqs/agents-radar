# AI Open Source Trends 2026-09-10

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-10 11:30 UTC

---

# AI Open Source Trends Report — 2026-09-10

*Filtering note: excluded as non-AI — `system-design-notes`, `armorpaint` (traditional graphics), `gods-eye-view` (geospatial visualization), `JavaGuide`, `cs-video-courses` (general interview/course lists). 78 AI-relevant projects retained.*

---

## 1. Today's Highlights

The **agent "skills" layer is having a breakout day**: `ayghri/i-have-adhd` (+4,650) is today's top AI gainer as a single-purpose skill that forces coding agents to surface answers directly, while `cathrynlavery/diagram-design` (+2,249), `obra/superpowers` (+688), and `vercel-labs/skills` (+125) confirm skills as the fastest-moving category. **Token economics is maturing into infrastructure**, with the multi-provider gateway `OmniRoute` (+591, 352 providers / 1,200+ models) trending alongside compression proxies like `rtk` (79.7k ⭐). **Local frontier inference** advances via `colibri`, a pure-C, zero-dependency MoE engine, paired with `llmfit` for hardware-model matching. Institutional players entered the CLI-agent space today — **Tencent's `teamai-cli`** (+556) and Tsinghua's **`OpenMAIC`** multi-agent classroom (+806) — while all-time lists are topped by agent-harness platforms (`ECC` 255.5k, `hermes-agent` 244k).

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,555 | Local runtime for Kimi-K2.6, GLM-5.2, DeepSeek, gpt-oss, Qwen and more. The anchor of the local-inference wave that today's `colibri` and `llmfit` extend. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,115 | Desktop all-in-one manager for Claude Code, Codex, OpenCode, Grok Build & Hermes Agent. Its 132k stars quantify how many developers now juggle multiple coding agents simultaneously. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,773 | Single-binary CLI proxy cutting LLM token consumption 60–90% on common dev commands. Flagship of the token-economics stack that dominates infrastructure today. |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 63,794 (+591) | MIT gateway unifying 352 providers (150+ free) and 1,200+ models behind one endpoint, with quota-aware fallback and 15–95% token compression. Trending on both lists today; built by 550+ contributors. |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | TypeScript | (+556) | Tencent's "Make Every Team AI Native" CLI. A major corp legitimizing the team-scale agent-CLI form factor is today's most strategically significant infrastructure signal. |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | (+417) | Local-first AI coding agent desktop (Electron + Rust host + plugin harness). Represents the migration of CLI coding agents into installable desktop form. |
| [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) | Rust | (+247) | One command to find which of hundreds of models actually runs on your hardware. Completes the "local-first" cluster alongside colibri and ollama. |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | (+157) | Pure-C, zero-dependency engine that streams MoE experts from disk to run frontier models on hardware you own. An extreme-minimalism counterpoint to heavyweight runtimes. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,532 | Agent-harness performance system: skills, instincts, memory, security across Claude Code, Codex, Cursor and beyond. The highest-starred repo in the dataset — harness optimization is now its own discipline. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,054 | "The agent that grows with you" — a personal agent that accumulates memory and self-improves. Massive adoption from a top open-model lab. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,913 | Fair-code workflow automation with native AI and 400+ integrations. The de facto backbone for production agentic automation. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,317 | Collaborative workspace for agentic workflows and RAG pipelines, cloud to self-hosted. Remains the default "agent app platform" at enterprise scale. |
| [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) | Python | 46,228 | Local, agent-first control plane over 2,115+ skills with CLI, MCP server, and Workbench. The catalog infrastructure of the skills economy. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | (+688) | Agentic skills framework and software development methodology. Now the canonical reference (its README claims 250k+ ⭐; Chinese fork alone has 8,049). |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | (+4,650) | A skill that stops coding agents from burying the answer — ADHD-friendly output. Today's #1 AI gainer, proving a single-purpose skill can out-star frameworks in a day. |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | TypeScript | (+125) | Vercel's `npx skills` open agent-skills tool. A major platform vendor moving into skills standardization. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | (+2,249) | 38 editorial diagram types as self-contained HTML/SVG for Claude Code, Codex, and Pi — "No Mermaid slop." Second-highest AI gain today; output-quality assets are now a category. |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | (+806) | Tsinghua's Open Multi-Agent Interactive Classroom — one-click immersive multi-agent learning. Multi-agent orchestration verticalized into education. |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | (+705) | 530+ cases, 20+ industrial templates, and reusable skills for GPT Image 2/2.5, with a same-prompt 2.5 comparison zone. A direct aftershock of OpenAI's image-model releases. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,106 | One-click HD short-video generation from a topic or keyword. Long-running proof of LLM+workflow automation at consumer scale. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,907 | Local AI job search: scans portals, scores listings A–H with 1–5 global rating, tailors CVs, tracks applications. Runs inside existing coding CLIs — a pragmatic vertical agent. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,877 | LLM-powered multi-market stock analysis with news, dashboards, and zero-cost scheduled runs. Anchor of the finance-agent cluster alongside today's trending CloddsBot. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,478 | Turns documents or topics into native PowerPoint decks with real shapes, transitions, charts, and narration. Document-to-deliverable remains a durable AI app pattern. |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | (+299) | Autonomous trading agent across 1,000+ markets (Polymarket, Kalshi, Binance, Solana DEXs) with an agent-commerce protocol for machine-to-machine payments, built on Claude. Agents now touch real money while you sleep. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,071 | The model-definition framework for text, vision, audio, and multimodal SOTA, training and inference alike. Ecosystem bedrock. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,975 | Local UI to run and train LLMs and diffusion models (GGUF, MLX, Qwen3.8, DeepSeek-V4, Gemma 4). Consumer-GPU fine-tuning is fully mainstream. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,232 | Open-source financial LLMs with trained weights on HuggingFace. Pairs directly with today's trading-agent momentum. |
| [wandb/wandb](https://github.com/wandb/wandb) | Python | 11,247 | Experiment tracking through fine-tuning to production model management. Standard instrumentation for the training stack. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,711 | Agent Reinforcement Trainer: GRPO-based training of multi-step agents for real-world tasks ("on-the-job training"). The clearest signal of agentic RL as the next fine-tuning frontier. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,990 | Scalable agentic RL framework (PPO, DAPO, REINFORCE++, VLM) on vLLM + Ray. Production-grade counterpart to ART's agent-first approach. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,749 | "The RL bridge for LLM-based agent applications." Third data point confirming RL-for-agents as an emerging stack, not a one-off. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,431 | Evaluates 374 models — GPT-5.4, Gemini 3.1 Pro, Claude 4.6, Kimi-K2.6, GLM-5.1, DeepSeek-V4, Qwen3.6 — plus a 2M+ defect library. Quantifies the frontier-model release churn driving today's tooling. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,545 | Turns codebases, docs, SQL, and PDFs into a queryable knowledge graph via a Claude Code/Cursor/Codex skill — deterministic AST parsing, every edge explained, **no vector store**. The leading expression of the post-RAG thesis. |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,833 | Up-to-date code documentation piped directly into LLMs and AI editors. Knowledge freshness delivered as a service. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuannote) — [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,252 | Privacy-first, self-hosted knowledge workspace where humans and agents collaborate. The local knowledge-base staple, now agent-native. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,307 | Persistent codebase map so AI coding tools read only what matters, with benchmarked context reductions. Context engineering for large repos. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,127 | MCP toolkit for semantic retrieval and editing — "the IDE for your agent." Bridges knowledge tooling into the MCP mainstream. |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | (+94) | Desktop app that incrementally builds and maintains a persistent wiki from your documents instead of retrieve-and-answer per query. Explicit anti-RAG positioning worth monitoring. |

---

## 3. Trend Signal Analysis

**Explosive category — single-purpose agent skills.** `i-have-adhd` gained 4,650 stars in one day — more than any framework — and `diagram-design` added 2,249 for what are essentially curated output templates. Skills (packaged behaviors installed into Claude Code/Codex-class agents) are having their "package-manager moment": catalogs already hold 2,115+ skills (`agentic-awesome-skills`), Vercel ships `npx skills`, and `superpowers` has spawned localization forks. Attention is shifting from building agents to *distributing capabilities into* agents.

**New stacks appearing for the first time.** (1) *Token-economics middleware*: `rtk` (60–90% savings), `headroom` (60–95% on JSON), and compression-flavored gateways (`OmniRoute`) turn cost control into a product layer. (2) *Minimalist local inference*: pure-C MoE streaming (`colibri`) plus hardware-model matching (`llmfit`) push frontier MoE models onto owned hardware. (3) *Named disciplines*: "agent harness" optimization (`ECC`, 255k) and "loop engineering" (`loop-engineering`, `DeepCode`) now have their own tooling and vocabularies. (4) *Agentic RL*: ART, OpenRLHF, and AReaL converge on training multi-step agents with GRPO — RL moving from chat models to agent behavior. (5) *Agent commerce*: CloddsBot's machine-to-machine payment protocol across 1,000+ markets is a first in this data.

**Connection to LLM releases.** The dataset references GPT Image 2/2.5, GPT-5.4, Gemini 3.1 Pro, Claude 4.6, Kimi-K2.6, GLM-5.x, DeepSeek-V4, Qwen3.6 — relentless model churn directly explains gateway sprawl (352 providers), agent-switchers (`cc-switch` at 132k), and benchmark fatigue (374 models tracked). The GPT Image 2.5 prompt library trending (+705) is a textbook release aftershock, and Claude Code's dominance is the substrate nearly every trending skills tool targets.

---

## 4. Community Hot Spots

- **[obra/superpowers](https://github.com/obra/superpowers) + skills ecosystem** — With `i-have-adhd`, `diagram-design`, and `vercel-labs/skills` all trending simultaneously, skills are the highest-velocity entry point for contributors; early skill authoring has outsized distribution leverage.
- **[diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) + [rtk-ai/rtk](https://github.com/rtk-ai/rtk)** — The token-cost layer has clear ROI (15–95% savings) and is consolidating gateway + compression + fallback into one product; expect this to become default infrastructure.
- **[Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify)** — 116k stars for "knowledge graph, no vector store" signals a genuine architectural reaction against embedding-first RAG; pairs naturally with coding agents needing repo context.
- **[OpenPipe/ART](https://github.com/OpenPipe/ART) + agentic RL cluster** — GRPO-based training of real task agents (with OpenRLHF/AReaL alongside) is the most technically consequential direction in today's data; skills plateau at behavior packaging, RL changes agent capability itself.
- **[JustVugg/colibri](https://github.com/JustVugg/colibri) + [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit)** — Pure-C MoE streaming and hardware-fit tooling mark a serious "own your inference" counter-trend to API dependence; worth watching as frontier MoE weights proliferate.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*