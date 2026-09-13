# AI Open Source Trends 2026-09-13

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-13 11:31 UTC

---

# AI Open-Source Ecosystem Trends Report — 2026-09-13

**Filtering note (Step 1):** Of 19 trending repos, 13 are AI-relevant. Excluded as non-AI: ever-gauzy (ERP/CRM), gods-eye-view (geospatial visualization, no ML core), SmartTube, omniget, douyin-downloader (media downloaders), cool-retro-term (terminal emulator). From the 83 topic-search repos, cs-video-courses, netdata, and medusa were excluded as general-purpose tools despite AI-adjacent tags. Total-star values for trending-only repos are unavailable in the source (reported as 0); today's delta is shown instead.

---

## 1. Today's Highlights

[debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) posted **+2,546 stars today** — roughly 4x the next AI gainer — as a fully local, 646-language ElevenLabs alternative, underscoring surging demand for local-first replacements of closed AI SaaS. On the infrastructure side, [JustVugg/colibri](https://github.com/JustVugg/colibri) (+652), a zero-dependency pure-C engine that streams MoE experts from disk, speaks directly to a model landscape now dominated by open MoE weights (DeepSeek-V4, Kimi-K2.6, GLM-5.2, MiniMax-H3). Agentic vertical apps kept arriving: [DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) (+504) as an open AI sales OS, [OpenMontage](https://github.com/calesthio/OpenMontage) (+383) for agentic video production, and [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) (+452) for parallel research agents. Meanwhile the "skills economy" is institutionalizing — a validated multi-agent skill registry ([agent-skills](https://github.com/tech-leads-club/agent-skills), +215) and [ECC](https://github.com/affaan-m/ECC)'s 257k-star harness-optimization repo lead the topic charts — with a security-flavored undercurrent ([pentagi](https://github.com/vxcontrol/pentagi), [Claude-Red](https://github.com/SnailSploit/Claude-Red), [system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks)) rounding out the day.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | (+652 today) | Pure-C, zero-dependency inference engine that streams MoE experts from disk to run frontier models on hardware users already own. +652 stars today makes it the hottest infra entry, signaling appetite for radically lightweight runtimes as MoE becomes the default architecture. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,781 | The de-facto local LLM runtime; its current roster (Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma) doubles as a live snapshot of which open weights matter. Still the front door for consumer-grade local inference. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,605 | Cross-platform desktop control center managing Claude Code, Codex, OpenCode, OpenClaw, Grok Build and Hermes Agent in one place. 132k stars reflect acute tooling fatigue as agentic CLIs/IDEs proliferate. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,125 | Single-binary CLI proxy that trims 60–90% of LLM token consumption on common dev commands. It anchors a fast-emerging "token economics" infrastructure class. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,817 | Compresses tool outputs, logs, files and RAG chunks before they reach the LLM — 20% fewer tokens for coding agents, 60–95% for JSON at equivalent answer quality. Ships as library, proxy, or MCP server. |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 65,487 | MIT-licensed AI gateway unifying 352 providers (150+ free) and 1,200+ models with quota-aware fallback plus 15–95% token compression. Built by 550+ contributors — the community's answer to vendor lock-in and rising API costs. |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,884 | High-performance serving framework for large language and multimodal models. Remains the reference open stack for production inference throughput. |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Go | (+264 today) | Hybrid code review combining deterministic rule pipelines (NPE, thread-safety, XSS, SQLi) with an LLM agent for precise line-level comments, battle-tested at Alibaba scale. +264 today shows "rules + LLM" enterprise hybrids resonating. |

*Also active in this category: the terminal coding-agent cluster — Codewhale (40,962), CopilotKit (37,336), DeepSeek-Reasonix (35,522), qwen-code (27,812), kilocode (27,285), superset (14,136) — plus serena-style MCP toolkits and firecrawl/Scrapling data acquisition (179,709 / 80,635).*

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,391 | Agent-harness performance optimization system: skills, instincts, memory, security and research-first development for Claude Code, Codex, Opencode, Cursor and beyond. The single most-starred repo in today's entire dataset. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,018 | "The agent that grows with you" — Nous Research's personal agent. 245k stars cements it as the flagship consumer-facing agent, and it's already first-class in switcher tools like cc-switch. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,144 | Fair-code workflow automation with native AI capabilities, 400+ integrations, self-host or cloud. The practical bridge between classic automation and agentic workflows. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,294 | The original autonomous-agent project, still evolving toward accessible agent tooling. A historic momentum anchor for the category it created. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,576 | Collaborative workspace for agentic workflows and RAG pipelines, deployable on cloud, VPC, or self-hosted. Positioning as the prototype-to-production platform without stack rebuilds. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,427 | The standard library for agents that operate a browser. Foundation layer for scraping, testing, and computer-use automation stacks (see also AIHawk's stealth variant, 30,669). |
| [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) | Rust | (+452 today) | Run parallel research agents with any model. +452 today indicates that multi-agent research parallelization is striking a clear nerve. |
| [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) | TypeScript | (+215 today) | Secure, validated skill registry for professional coding agents across Antigravity, Claude Code, Cursor and Copilot. An early trust layer forming around the exploding skills ecosystem. |

*Security agents worth tracking: [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) (Go, +189 today) and [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) (Python, +113 today).*

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) | Python | (+2,546 today) | Open-source, fully local ElevenLabs alternative: voice cloning, voice design, video dubbing, dictation, transcription and audiobooks in 646 languages. Today's #1 AI gainer by ~4x — the strongest local-first signal of the day. |
| [melgarafael/DeskcommCRM](https://github.com/melgarafilar/DeskcommCRM) | TypeScript | (+504 today) | Self-hosted AI sales OS with native agents and WhatsApp (WAHA), positioned against Kommo, Octadesk and Intercom; MCP-ready, multi-tenant, LGPD-compliant. Confirms open-source vertical-SaaS replacement momentum in sales tech. |
| [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) → see Agents table | Rust | (+452 today) | — |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | (+383 today) | Billed as the first open-source agentic video production system: 12 pipelines, 100+ tools, 700+ agent skill and production-knowledge files. Turns a standard AI coding assistant into a full video studio. |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | (+262 today) | Agent plus skills that complete mathematical modeling end-to-end and generate submission-ready papers. A sharp example of agentic automation for a vertical academic workflow. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,829 | User-friendly AI interface supporting Ollama, OpenAI API and compatible backends. The default self-hosted front door for local models. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 123,018 | One-click HD short-video generation from a topic or keyword via automated LLM workflows. Long-running proof of sustained AI content-automation demand. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,990 | LLM-powered multi-market stock analysis with multi-source data, real-time news, dashboards and cost-free scheduled runs. 65k stars confirm finance as agents' killer vertical (see also Vibe-Trading, 33,340; FinGPT). |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,747 | AI productivity studio combining smart chat, autonomous agents and 300+ assistants with unified frontier-model access. A polished consumer-grade desktop entry point. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,257 (+102 today) | The model-definition framework for SOTA text, vision, audio and multimodal models, for inference and training. Still the ecosystem's gravitational center and back on the trending list today. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,088 | Local UI to run and train LLMs and diffusion models (GGUF, MLX; Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4, FLUX). Continues to democratize fine-tuning on consumer hardware. |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | (+210 today) | YuE2: frontier music generation with symbolic planning, zero-shot covers and agentic music editing. Generation models keep expanding well beyond text and images. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter | 21,243 | Open-source financial LLMs with trained weights released on HuggingFace. The exemplar of the domain-specific open-model trend. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,713 | Agent Reinforcement Trainer: GRPO-based on-the-job RL for multi-step agents (Qwen3.6, GPT-OSS, Llama). Post-training is visibly shifting from chat alignment to agentic task competence. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,998 | Easy-to-use, scalable agentic-RL framework (PPO, DAPO, REINFORCE++, VLM, vLLM, Ray, async). A backbone of the emerging agent-RL training stack. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,751 | The "RL bridge for LLM-based agent applications," built simple and flexible. Completes a clear agent-RL trio alongside ART and OpenRLHF. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,436 | Evaluates 374 models — GPT-5.4, Gemini-3.1-Pro, Claude-4.6, ERNIE-5.0, Qwen3.6, DeepSeek-V4, GLM-5.1 and more — plus a 2M+ entry model-defect database. Community-run evaluation at unusual scale. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [f/prompts.chat](https://github.com/f/prompts.chat) | HTML | 170,197 | The classic Awesome ChatGPT Prompts collection, now free and self-hostable for privacy. Still the largest community prompt-knowledge base in existence. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,323 | Turns any codebase — with docs, SQL schemas, configs and PDFs — into a queryable knowledge graph via a `/graphify` skill: deterministic AST parsing, every edge explained, no vector store. The flagship of the graph-over-vectors context movement. |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,947 | Up-to-date code documentation delivered into LLMs and AI code editors. Directly attacks the stale-context problem that degrades coding agents. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,322 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. Knowledge management explicitly repositioned for the agent era. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,367 | Local-first code-intelligence graph for MCP and CLI that builds a persistent codebase map with benchmarked context reductions. A concrete alternative to shoveling whole repos into context windows. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,252 | MCP toolkit providing semantic retrieval and editing capabilities — "the IDE for your agent." Pairs naturally with the graph-context stack above. |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | (+217 today) | Extracted system prompts from Claude (Fable 5.1, Opus 5, Claude Code/Design), GPT-6-Astra, Codex, Gemini 3.8 Flash / 3.1 Pro / Antigravity, Grok, Cursor and Kimi, updated regularly. +217 today shows prompt-transparency culture riding each new frontier release. |

---

## 3. Trend Signal Analysis

**Explosive attention: local-first, "own-your-stack" AI.** The day's biggest gainer, VoiceStudio (+2,546), is a fully local voice suite; DeskcommCRM (+504) is a self-hosted AI sales OS; colibri (+652) targets "hardware you already own." The pattern is consistent — open-source replacements for closed SaaS (ElevenLabs, Intercom/Kommo) with explicit data-sovereignty framing.

**New stacks appearing for the first time.** Three directions look structurally new: (1) **skills-as-packages** — SKILL.md-style registries (agent-skills, agentic-awesome-skills' 2,115+ catalog, distilly, Claude-Red) resemble an "npm moment" for agent capabilities, with security/validation becoming the differentiator; (2) **token economics as an infra layer** — rtk (60–90% cuts), headroom (60–95% on JSON), caveman (65%), codeburn (measurement) form a measure-then-compress workflow that didn't exist as a category a year ago; (3) **named disciplines** — "agent harness optimization" (ECC, 257k) and "loop engineering" (11k) signal professionalization of agent orchestration.

**Connections to LLM releases.** Frontier model names embedded throughout the data — GPT-6-Astra, Claude Opus 5 / Fable 5.1, Gemini 3.8 Flash / 3.1 Pro, Grok — explain system_prompts_leaks' +217 refresh cycle. MoE dominance (Kimi-K2.6, GLM-5.2, DeepSeek-V4, MiniMax-H3 across ollama/unsloth rosters) directly motivates colibri's expert-streaming design. IDE fragmentation (Antigravity, Grok Build, Codex, Claude Code, Cursor) is driving neutral middleware — cc-switch (132k), OmniRoute (352 providers), multi-client skill registries. Finally, the agent-RL trio (ART, OpenRLHF, AReaL) indicates post-training investment moving decisively toward agentic tasks.

*(~250 words)*

---

## 4. Community Hot Spots

- **[JustVugg/colibri](https://github.com/JustVugg/colibri)** — Expert-streaming MoE inference in pure C. If the disk-streaming approach sustains performance, it resets expectations for frontier-model inference on consumer GPUs; watch its model-support roadmap and memory-mapping strategy.
- **[debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)** — Today's runaway gainer consolidating the local voice stack (clone + design + dub + dictation, 646 languages). Expect governance debates around voice-cloning safety and model licensing to follow its growth.
- **The skills-registry race** — [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) (validated, security-focused) vs. community catalogs ([agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills), [superpowers-zh](https://github.com/jnMetaCode/superpowers-zh)). SKILL.md is becoming a portable package standard; the offensive-security subset ([Claude-Red](https://github.com/SnailSploit/Claude-Red), [pentagi](https://github.com/vxcontrol/pentagi)) raises both capability and policy questions.
- **Token-cost engineering** — Pair [codeburn](https://github.com/getagentseal/codeburn) (measure usage across 37 tools) with [rtk](https://github.com/rtk-ai/rtk)/[headroom](https://github.com/headroomlabs-ai/headroom)/[caveman](https://github.com/JuliusBrussee/caveman) (compress). Immediate ROI for any Claude Code/Codex-heavy team.
- **Graph-based context over vector RAG** — [graphify](https://github.com/Graphify-Labs/graphify), [code-review-graph](https://github.com/tirth8205/code-review-graph), [serena](https://github.com/oraios/serena): deterministic, auditable, edge-explained retrieval for code. Their anti-vector positioning and benchmark claims are worth independent validation.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*