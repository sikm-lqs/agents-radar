# AI Open Source Trends 2026-09-14

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-13 23:30 UTC

---

# AI Open Source Trends Report — 2026-09-14

**Filtering notes:** Of 19 trending repos, 13 are AI-relevant. Excluded: [ever-gauzy](https://github.com/ever-co/ever-gauzy) (ERP/CRM), [SmartTube](https://github.com/yuliskov/SmartTube), [omniget](https://github.com/tonhowtf/omniget) / [douyin-downloader](https://github.com/jiji262/douyin-downloader) (downloaders), [cool-retro-term](https://github.com/Swordfish90/cool-retro-term), [gods-eye-view](https://github.com/bilawalsidhu/gods-eye-view) (geospatial visualization, no ML core), and course/book repos (cs-video-courses, ai-engineering-from-scratch, ai-agent-book, machine-learning-for-trading, etc.). *Note: trending-feed totals read ⭐0 in the source; today's deltas are shown verbatim. [transformers](https://github.com/huggingface/transformers) total (165,486) taken from the topic feed after dedup.*

---

## 1. Today's Highlights

Local-first AI dominates today: [VoiceStudio](https://github.com/debpalash/VoiceStudio), a fully-local ElevenLabs alternative (cloning, dubbing, 646 languages), is the top AI gainer at **+2,546**, while [colibri](https://github.com/JustVugg/colibri) — a zero-dependency pure-C engine streaming frontier MoE experts from disk — added **+960**. Transparency and skills are the other flashpoints: a leaked system-prompt archive covering GPT-6-Astra, Claude Fable 5.1/Opus 5 and Gemini 3.8 pulled **+727**, and security-flavored agent skill packs ([Claude-Red](https://github.com/SnailSploit/Claude-Red) +507, [pentagi](https://github.com/vxcontrol/pentagi) +613) show the skills economy professionalizing fast. Vertical agents keep expanding — agentic video production ([OpenMontage](https://github.com/calesthio/OpenMontage) +383), music generation ([YuE](https://github.com/multimodal-art-projection/YuE) +500), AI sales ([DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) +444), research agents ([OpenResearch](https://github.com/alphaXiv/OpenResearch) +304). Topic data confirms the structural story: agent harness/meta tooling ([ECC](https://github.com/affaan-m/ECC) 257k, [hermes-agent](https://github.com/NousResearch/hermes-agent) 245k) and token-efficiency infrastructure ([rtk](https://github.com/rtk-ai/rtk) 80k, [headroom](https://github.com/headroomlabs-ai/headroom) 71k) are the highest-momentum layers of the stack.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+960) | Pure-C, zero-dependency inference engine that runs frontier MoE models by streaming experts from disk. Today's +960 makes it the second-hottest AI repo, signaling appetite for minimalist local inference of open-weight MoE models. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,486 (+102) | The model-definition framework for SOTA text/vision/audio/multimodal models, for inference and training. The ecosystem's bedrock — still adding +100/day after years. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,833 | One-command local runner for Kimi-K2.6, GLM-5.2, DeepSeek, gpt-oss, Qwen, Gemma. De-facto default for local LLM deployment; its catalog tracks open-weight MoE releases closely. |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,962 | "Context API" to search, scrape, and interact with the web at scale for LLMs. Massive adoption as the data-acquisition layer beneath agents and RAG pipelines. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,789 | Distributed AI compute engine with core runtime plus ML libraries. Underpins distributed RL/post-training stacks (e.g., OpenRLHF is built on Ray). |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,905 | High-performance serving framework for LLMs and multimodal models. A core production serving layer, increasingly embedded in RL training loops. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,186 | Single-binary CLI proxy cutting LLM token consumption 60–90% on common dev commands. Emblematic of the token-efficiency wave sweeping agent tooling. |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Go | 0 (+438) | Hybrid code review: deterministic rule pipelines (NPE, thread-safety, XSS, SQLi) plus an LLM agent with precise line-level comments. Battle-tested at Alibaba scale; +438 today shows enterprise LLM-hybrid dev tools trending. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,734 | Agent harness performance optimization — skills, instincts, memory, security, and research-first development for Claude Code, Codex, Cursor and beyond. Highest-starred repo in today's entire dataset; the meta-layer above coding agents is where community energy concentrates. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,158 | "The agent that grows with you" — a persistent personal agent from Nous Research. Second-largest repo overall and flagship of the self-improving personal-agent direction. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,191 | Fair-code workflow automation with native AI capabilities and 400+ integrations. The bridge between classic enterprise automation and agentic workflows. |
| [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) | Go | 0 (+613) | Fully autonomous agent system for complex penetration-testing tasks. +613 today; agentic offensive/defensive security is one of the fastest-moving verticals. |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | 0 (+507) | Curated library of offensive-security SKILL.md packs (SQLi → EDR evasion → exploit dev) for the Claude skills system. +507 today shows demand for expert-methodology skill packs — and raises skills supply-chain security questions. |
| [alphaXiv/OpenResearch](https://github.com/alphaXiv/OpenResearch) | Rust | 0 (+304) | Run parallel research agents with any model. Part of today's "agentic deep research" wave, from the alphaXiv team. |
| [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) | TypeScript | 0 (+215) | Secure, validated skill registry for Claude Code, Cursor, Copilot, Antigravity and more. Signals the skills ecosystem maturing from awesome-lists into curated, security-vetted package registries. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,512 | Library for agents that operate a real browser. The standard choice for web-acting agents, complementing scrapers and computer-use stacks. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) | Python | 0 (+2,546) | Open-source, fully-local ElevenLabs alternative — voice cloning, voice design, dubbing, dictation, audiobooks in 646 languages. Today's #1 AI gainer by a wide margin; local voice is having its Stable Diffusion moment. |
| [melgarafical/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | 0 (+444) | Self-hosted AI sales OS: CRM with native AI agents + WhatsApp (WAHA), MCP-ready, multi-tenant. +444 today as an open alternative to Kommo/Octadesk/Intercom for chat-driven sales. |
| [calesthio/OpenMontage](https://github.com/calesthio/OpenMontage) | Python | 0 (+383) | "World's first open-source agentic video production system" — 12 pipelines, 100+ tools, 700+ skill files. Extends the agent-skills paradigm from code into media production. |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | 0 (+268) | Agent + skills that automate mathematical modeling end-to-end and generate submission-ready papers. Strong pull in the Chinese academic/competition niche. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 123,240 | One-click HD short-video generation from a topic using LLM workflows. The reference open project for AI content automation at 123k stars. |
| [koala73/worldmonitor](https://github.com/koala73/worldmonitor) | TypeScript | 86,193 | Real-time global intelligence dashboard: AI news aggregation, geopolitical and infrastructure monitoring. Reflects growing demand for AI-curated situational awareness. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,471 | Local-first AI job search — scan portals, score listings, tailor CVs, track applications — running inside Claude Code/Codex CLIs. A notable example of coding CLIs becoming general app runtimes. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,758 | AI productivity studio with smart chat, autonomous agents, and 300+ assistants across frontier LLMs. A leading desktop client for unified multi-provider AI. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,115 | Local UI to run and train LLMs and diffusion models (GGUF, MLX, Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4, FLUX). The default consumer fine-tuning stack; its model list mirrors the latest open-weight MoE releases. |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | 0 (+727) | Archive of extracted system prompts from GPT-6-Astra, Claude Fable 5.1/Opus 5, Gemini 3.8/3.1 Pro, Grok, Cursor, Kimi. +727 today — prompt archaeology spikes with every frontier release; a primary source for agent-behavior research. |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | 0 (+500) | YuE2: frontier music generation with symbolic planning, zero-shot covers, and agentic music editing. +500 today; open generative media keeps expanding beyond image/text. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,247 | Open-source financial LLMs with released weights on HuggingFace. Anchor of the open AI-finance cluster (alongside daily_stock_analysis and Vibe-Trading). |
| [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) | Python | 13,791 | Reliable PyTorch implementations of core RL algorithms. Long-lived foundation now feeding the agentic-RL resurgence. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,712 | Agent Reinforcement Trainer: GRPO-based on-the-job RL for multi-step agents (Qwen3.6, GPT-OSS, Llama). The clearest signal that agentic RL has gone mainstream. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,999 | Easy-to-use, scalable agentic RL framework (PPO, DAPO, REINFORCE++, VLM) on Ray/vLLM. Approaching 10k as a standard for open post-training. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,752 | "The RL bridge for LLM-based agent applications." A third agentic-RL entry confirms a genuine training wave, not a one-off. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,422 | Turns codebases, docs, SQL schemas and PDFs into queryable knowledge graphs via local deterministic AST parsing — no vector store. 116k stars; leading the context-graph push against embedding-heavy RAG. |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,965 | Up-to-date documentation served to LLMs and AI code editors via MCP. Directly attacks stale-docs hallucination; widely embedded in coding agents. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,331 | Privacy-first, self-hosted knowledge workspace where humans and agents collaborate. Strong adoption for personal knowledge management plus AI. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,377 | Local-first code-intelligence graph for MCP/CLI with benchmarked context reductions on reviews and large-repo workflows. Codebase-mapping-as-a-service for agents. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,270 | MCP toolkit giving agents semantic retrieval and editing — "the IDE for your agent." A semantics-over-strings approach to code context. |
| [letta-ai/letta](https://github.com/letta-ai/letta) | | 24,724 | Platform for stateful agents with advanced memory that learn and self-improve. Memory management is emerging as its own infrastructure layer. |

---

## 3. Trend Signal Analysis

**Where attention is exploding.** Fully-local generative applications and micro-inference engines. [VoiceStudio](https://github.com/debpalash/VoiceStudio) (+2,546) and [colibri](https://github.com/JustVugg/colibri) (+960) top today's gains: the market wants frontier capabilities — voice cloning, MoE LLMs — on owned hardware with a zero-dependency footprint. Colibri's pure-C, disk-streamed MoE execution is a direct reaction to heavyweight Python serving stacks.

**New stacks appearing.** (1) The agent "skills economy" is consolidating: a validated registry ([agent-skills](https://github.com/tech-leads-club/agent-skills)), offensive skill packs ([Claude-Red](https://github.com/SnailSploit/Claude-Red)), and 2,115+ skill catalogs ([agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills), 46k ⭐) — SKILL.md extensibility for Claude Code/Codex/Cursor is having its "package manager" moment, with security validation as the differentiator. (2) Token economics is now first-class infrastructure: [rtk](https://github.com/rtk-ai/rtk) (80k ⭐, 60–90% cuts), [headroom](https://github.com/headroomlabs-ai/headroom) (71k ⭐), [codeburn](https://github.com/getagentseal/codeburn) — context is the new compute. (3) Deterministic knowledge graphs ([graphify](https://github.com/Graphify-Labs/graphify), [code-review-graph](https://github.com/tirth8205/code-review-graph)) are positioning against vector-store RAG. (4) "Loop engineering" and harness SDKs ([loop-engineering](https://github.com/cobusgreyling/loop-engineering), [harness-sdk](https://github.com/strands-agents/harness-sdk)) formalize agent orchestration as a discipline.

**Link to LLM releases.** [system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) (+727) references GPT-6-Astra, Claude Fable 5.1/Opus 5, and Gemini 3.8 — each frontier release triggers prompt archaeology and behavior imitation. Meanwhile Chinese open-weight MoE models (DeepSeek-V4, Qwen3.8, Kimi-K2.6, GLM-5.2, MiniMax-H3) are the default targets across [ollama](https://github.com/ollama/ollama), [OmniRoute](https://github.com/diegosouzapw/OmniRoute) and [unsloth](https://github.com/unslothai/unsloth), explaining the local-inference boom. Agentic RL tooling ([ART](https://github.com/OpenPipe/ART), [OpenRLHF](https://github.com/OpenRLHF/OpenRLHF), [AReaL](https://github.com/areal-project/AReaL)) shows GRPO-style training moving from labs into production agent teams.

---

## 4. Community Hot Spots

- **[VoiceStudio](https://github.com/debpalash/VoiceStudio)** — Today's biggest AI gainer (+2,546). Fully-local voice cloning/dubbing in 646 languages suggests voice models are commoditizing the way image models did post-Stable-Diffusion; expect an ecosystem of fine-tunes and integrations.
- **[colibri](https://github.com/JustVugg/colibri)** — Pure-C MoE runtime (+960). If momentum holds, watch for a minimalist-inference branch (C/Rust, expert streaming) targeting consumer GPUs/NPUs, paired with open-weight MoE releases like DeepSeek-V4 and Kimi-K2.6.
- **Skills supply chain** — [agent-skills](https://github.com/tech-leads-club/agent-skills) (+215), [Claude-Red](https://github.com/SnailSploit/Claude-Red) (+507), and [agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) together mark skills becoming "the npm of agents." Signing, auditing, and sandboxing skill packs is an open problem — and an opportunity.
- **Token-cost toolchain** — [rtk](https://github.com/rtk-ai/rtk) (80k ⭐), [headroom](https://github.com/headroomlabs-ai/headroom) (71k ⭐), and [codeburn](https://github.com/getagentseal/codeburn) deliver measurable 60–95% context savings; immediate ROI for any team running coding agents at scale.
- **Knowledge-graph context** — [graphify](https://github.com/Graphify-Labs/graphify) (116k ⭐) and [code-review-graph](https://github.com/tirth8205/code-review-graph) demonstrate deterministic AST graphs beating vector RAG for code understanding; worth trialing for large-repo agent workflows.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*