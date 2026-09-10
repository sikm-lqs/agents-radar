# AI Open Source Trends 2026-09-11

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-10 23:30 UTC

---

# 📊 AI Open Source Trends Report — September 11, 2026

> **Filtering note (Step 1):** 91 raw entries reviewed; ~80 retained as clearly AI/ML-related. Excluded as non-AI: `gods-eye-view` (geospatial 3D visualization, no ML), `armorpaint` (3D graphics tool), `system-design-notes`, `JavaGuide`, `cs-video-courses` (general interview/course content), `netdata` (observability), `medusa` (commerce platform), `Scrapling` (general scraping framework). `OmniRoute` (appears on both lists) is deduplicated with combined star data.

---

## 1. Today's Highlights

The day belongs to the **agent "skills" layer**: the top trending repo overall, `i-have-adhd` (+3,854), is not a framework but a packaged agent behavior — evidence that skills are becoming the dominant distribution format for agent capabilities. Institutional players made visible moves, with **Tencent's `teamai-cli` (+837)** pushing team-wide AI-native workflows and **Tsinghua's `OpenMAIC` (+806)** debuting multi-agent interactive classrooms. Local inference regained momentum via **`colibri`**, a pure-C MoE engine that streams experts from disk, and **`llmfit`**, a hardware-fit checker for hundreds of models. Meanwhile, the multi-provider gateway **`OmniRoute` (+591)** crossed today's list while its total sits at 64,211 stars. At the mega-scale end, **ECC (255,873)** and **hermes-agent (244,204)** confirm that the agent-harness category is consolidating around a few winner platforms.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,592 | The de facto local runtime for frontier open models, now supporting Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, and Gemma. Its model roster is a reliable proxy for which open weights matter right now. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,180 | Cross-platform desktop control center for Claude Code, Codex, OpenCode, OpenClaw, Grok Build, and Hermes Agent. Its 132k stars reflect how mainstream multi-agent-tool switching has become. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,366 | Compresses tool outputs, logs, files, and RAG chunks before they hit the LLM — 20% token savings for coding agents, 60–95% for JSON. A flagship of the fast-growing "token economics" tooling category. |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 64,211 (+591) | Free MIT AI gateway unifying 352 providers (150+ free) and 1,200+ models behind one endpoint, with quota-aware fallback and 15–95% token compression. Trending today on both the hot list and MCP topic search — strong dual-signal momentum. |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | TypeScript | 0 (+837) | Tencent's CLI to "Make Every Team AI Native," bringing agent workflows to group collaboration. A major Chinese tech entrant on the trending list signals enterprise push into team-scale agent tooling. |
| [vercel-labs/skills](https://github.com/vercel-labs/skills) | TypeScript | 0 (+175) | Vercel's official open agent-skills tool (`npx skills`) for installing portable skills into any agent. First-party backing from a major platform validates skills as a standard packaging format. |
| [AlexsJones/llmfit](https://github.com/AlexsJones/llmfit) | Rust | 0 (+247) | One Rust command to determine which of hundreds of models actually runs on your hardware. Solves the practical pain of the exploding open-model catalog — a nice companion to local runtimes. |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+130) | Pure-C, zero-dependency inference engine that streams MoE experts from disk to run frontier models on owned hardware. A minimalist counter-trend to heavy inference stacks; worth watching for consumer-GPU frontier MoE. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,873 | An agent-harness performance system adding skills, instincts, memory, security, and research-first development to Claude Code, Codex, OpenCode, and Cursor. The highest-starred repo in today's dataset — the harness layer is where value is consolidating. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 244,204 | Nous Research's personal agent that "grows with you," emphasizing long-term adaptation. 244k stars shows sustained appetite for persistent, personal agents beyond coding. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,952 | Fair-code workflow automation with native AI capabilities and 400+ integrations, self-hostable. Remains the default bridge between agent workflows and enterprise systems. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,356 | Collaborative workspace for building agentic workflows and RAG pipelines across cloud, VPC, or self-hosted deployment. Its steady scale reflects production-grade agent adoption beyond hobbyists. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,079 | The standard library for agents that operate a real browser. A foundational dependency for the web-automation and agentic-trading projects trending around it. |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | 0 (+3,854) | A skill that stops coding agents from burying the answer — ADHD-friendly, concise output. Today's #1 trending repo overall; proof that "agent output UX" is an unmet pain point with explosive demand. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | 0 (+731) | An agentic skills framework and software development methodology that works across coding agents. Its Chinese localization cites 250k+ original stars, making it a cornerstone of the skills ecosystem. |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | 0 (+636) | Local-first AI coding agent desktop combining Electron, a Rust host core, the pi agent harness, and user-installable plugins. Trending momentum shows demand for desktop-grade, privacy-preserving agent environments. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,566 | The user-friendly self-hosted AI interface supporting Ollama, OpenAI API, and more. Still the default front door for local model stacks. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,228 | Generates HD short videos from a single topic or keyword via automated LLM workflows. A long-running benchmark for AI content-generation apps, especially in the Chinese ecosystem. |
| [koala73/worldmonitor](https://github.com/koala73/worldmonitor) | TypeScript | 85,983 | Real-time global intelligence dashboard combining AI news aggregation, geopolitical monitoring, and infrastructure tracking. A notable example of agents applied to situational awareness rather than coding. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,138 | Open-source AI job search running locally in Claude Code, Codex, or OpenCode — scans portals, scores listings A–H, and tailors CVs. Representative of "personal ops" apps built on coding CLIs as runtimes. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | 0 (+1,287) | 38 editorial diagram types as self-contained HTML/SVG for Claude Code, Codex, and Pi — explicitly "no Mermaid slop." +1,287 today shows appetite for design-quality agent output assets. |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | 0 (+957) | Prompt-as-code library with 530+ cases, 20+ industrial templates, and a GPT Image 2 vs 2.5 comparison zone. Rides the GPT Image 2.5 release wave directly — image-prompt engineering is professionalizing. |
| [THU-MAIC/OpenMAIC](https://github.com/THU-MAIC/OpenMAIC) | TypeScript | 0 (+806) | Tsinghua's Open Multi-Agent Interactive Classroom delivering immersive multi-agent learning in one click. A credible academic entrant making education a visible agent vertical. |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | 0 (+299) | Autonomous AI trading agent operating across 1,000+ markets (Polymarket, Kalshi, Binance, Hyperliquid, Solana DEXs, 5 EVM chains) with an agent-commerce payment protocol. Built on Claude; the most aggressive "agent commerce" showcase on today's list. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,088 | The model-definition framework for state-of-the-art text, vision, audio, and multimodal models, for inference and training. Still the load-bearing wall of the open-model ecosystem. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,998 | Local UI to run and train LLMs and diffusion models, supporting GGUF/MLX, Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4, and FLUX. Fine-tuning has clearly moved to the desktop. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,770 | Distributed AI compute engine pairing a core runtime with libraries accelerating ML workloads. The substrate underneath most large-scale training stacks on this list. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,236 | Open-source financial LLMs with trained weights on HuggingFace. Pairs with today's agentic-trading momentum (CloddsBot, Vibe-Trading) as the model layer for finance. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,712 | Agent Reinforcement Trainer applying GRPO to multi-step agents — "on-the-job training" for Qwen3.6, GPT-OSS, and Llama. A clean signal that RL is shifting from chat models to agentic behavior. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,994 | Scalable, high-performance agentic RL framework (PPO, DAPO, REINFORCE++) built on Ray with vLLM and async execution. Approaching 10k stars as RL-training infrastructure standardizes. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,431 | Benchmarks 374 models — from GPT-5.4 and Gemini 3.1 Pro to Kimi-K2.6, DeepSeek-V4, and GLM-5.1 — plus a 2M+ sample model-defect database. Unusually valuable evaluation corpus for the Chinese model landscape. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,749 | The "RL Bridge" making reinforcement learning for LLM agent applications simple and flexible. Completes a visible cluster of agentic-RL tooling appearing across today's data. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 178,824 | The context API to search, scrape, and interact with the web at scale. Web retrieval remains the default grounding layer for agents despite the graph challengers below. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,711 | Turns any codebase (plus docs, SQL, PDFs) into a queryable knowledge graph via a `/graphify` skill for Claude Code, Cursor, Codex, and Gemini CLI — local AST parsing, every edge explained, no vector store. 116k stars makes it the flagship of the "graphs over embeddings" movement. |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,852 | Serves up-to-date code documentation directly to LLMs and AI editors. A quiet but critical fix for stale-training-data hallucinations in coding agents. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,275 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. A mature open alternative in the human+agent knowledge-tooling space. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,311 | Local-first code intelligence graph for MCP and CLI that builds a persistent codebase map so agents read only what matters, with benchmarked context reductions. Practical proof that graph context cuts review costs. |
| [nashsu/llm_wiki](https://github.com/nashsu/llm_wiki) | TypeScript | 0 (+94) | Desktop app that incrementally builds and maintains a persistent, interlinked wiki from your documents — explicitly positioning itself against per-query RAG. A "post-RAG" thesis worth tracking as it trends today. |

---

## 3. Trend Signal Analysis

**Agent skills are the breakout format of the cycle.** The day's hottest repo, `i-have-adhd` (+3,854), is not a framework but a packaged behavior — and it sits alongside `superpowers` (+731), `vercel-labs/skills`, and the 255k-star ECC. Skills are becoming a portable, tool-agnostic packaging standard across Claude Code, Codex, Cursor, and Gemini CLI — effectively the "npm moment" for agent capabilities, now with first-party Vercel validation.

**Token economics has matured into a product category.** As agent loops multiply spend, compression layers are scaling fast: headroom (71k stars, 60–95% JSON savings), rtk (79.8k, 60–90% on dev commands), caveman (104k, 65% via terse prompts), and OmniRoute's built-in 15–95% compression. Expect proxy-plus-skill combos to become default cost infrastructure.

**Local-first inference is resurging**, driven by frontier open weights (Kimi-K2.6, GLM-5.2, DeepSeek-V4, Qwen3.6): colibri's pure-C MoE engine with disk-streamed experts, llmfit's hardware-fit checks, and PI-Desktop's local agent harness all point to sovereignty over cloud.

**Genuinely new directions today:** agent commerce (CloddsBot's machine-to-machine payments across 1,000+ markets), knowledge-graph context displacing vector RAG (graphify at 116k), post-RAG persistent wikis (llm_wiki), and multi-agent education (Tsinghua's OpenMAIC).

**Model-release coupling is visible:** `awesome-gpt-image-2` (+957) rides the GPT Image 2/2.5 release, while the agentic-RL cluster (ART, OpenRLHF, AReaL) tracks the industry pivot to RL-trained agents on open weights.

---

## 4. Community Hot Spots

- **[vercel-labs/skills](https://github.com/vercel-labs/skills) + [obra/superpowers](https://github.com/obra/superpowers) — the skills standard.** With 26+ tools already supported (per superpowers-zh) and Vercel shipping an official installer, skills are the highest-leverage place to contribute or build distribution right now.
- **The token-efficiency stack — [headroom](https://github.com/headroomlabs-ai/headroom), [rtk](https://github.com/rtk-ai/rtk), [OmniRoute](https://github.com/diegosouzapw/OmniRoute).** Combined 15–95% documented savings across three complementary layers (compression library, CLI proxy, gateway). Immediate ROI for any heavy agent user; the category is consolidating quickly.
- **[JustVugg/colibri](https://github.com/JustVugg/colibri) — local MoE inference.** Pure C, zero deps, experts streamed from disk. If it delivers frontier MoE quality on consumer hardware, it resets local-inference economics; pair with [llmfit](https://github.com/AlexsJones/llmfit) for the full stack.
- **Graph-based context engineering — [graphify](https://github.com/Graphify-Labs/graphify) (116k) and [code-review-graph](https://github.com/tirth8205/code-review-graph) (31k).** Deterministic AST-derived graphs with explainable edges are winning developer trust over opaque vector retrieval; this is the most credible architectural challenge to mainstream RAG.
- **Agentic trading & agent commerce — [CloddsBot](https://github.com/alsk1992/CloddsBot), [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading), [FinGPT](https://github.com/AI4Finance-Foundation/FinGPT).** Autonomous execution plus machine-to-machine payments is a forward-looking but high-risk frontier; expect security and regulatory scrutiny to intensify before institutional adoption.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*