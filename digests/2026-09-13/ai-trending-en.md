# AI Open Source Trends 2026-09-13

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-12 23:30 UTC

---

# AI Open Source Trends Report — 2026-09-13

**Filtering note (Step 1):** 9 of 16 trending repos were retained as AI-relevant. Excluded as non-AI: `gods-eye-view` (geospatial viz), `iloader`, `zapret-discord-youtube` (DPI bypass), `Sonarr` (PVR), `SmartTube`, `OpenFlux` (TCP tunnel), `armorpaint` (3D painting). From topic search, `medusa` (general commerce) and `cs-video-courses` (general CS education) were excluded as not AI-core.

---

## 1. Today's Highlights

The dominant story is the **"agent harness economy"**: the largest projects in today's dataset are not models but tools that *operate* coding agents — ECC (257,087⭐), cc-switch (132,529⭐), rtk (80,099⭐) and headroom (71,751⭐) — reflecting a land grab around optimizing Claude Code / Codex / Cursor-class agents. NousResearch's [hermes-agent](https://github.com/NousResearch/hermes-agent) (244,895⭐) is the single most-starred agent project, validating "personal agents that grow with you" as a mass category. Today's trending list skews toward **vertical autonomous agents and prompt archaeology**: an AI sales OS (DeskcommCRM, +505), an autonomous trading agent with machine-to-machine payments (CloddsBot, +377), and a system-prompt leak archive covering GPT-6-Astra, Claude Fable 5.1 and Gemini 3.8 (+357). YuE2 (+193) pushes generative music into agentic territory with symbolic planning and editing, while pentagi (+193) and Claude-Red (+99) put agents on both sides of offensive/defensive security.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 257,087 | Agent harness performance-optimization system bundling skills, instincts, memory and security for Claude Code, Codex, Opencode and Cursor. The most-starred project in today's entire dataset — optimizing existing agents now outdraws building new ones. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,759 | Local runtime for open-weight LLMs (Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek-V4, Qwen, Gemma). Its model roster reads like a Chinese open-weights leaderboard, making it the default on-ramp for local inference. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,529 | Cross-platform desktop all-in-one manager for Claude Code, Codex, OpenCode, OpenClaw, Grok Build & Hermes Agent. 132k⭐ confirms multi-agent configuration management has become a daily-driver category. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,099 | Single-binary CLI proxy cutting LLM token consumption 60–90% on common dev commands, zero dependencies. Flagship of today's fastest-rising infra theme: token economics. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,751 | Compresses tool outputs, logs, files and RAG chunks before they reach the LLM — 20% savings for coding agents, 60–95% for JSON. Ships as library, proxy and MCP server, so it slots into any harness. |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 65,296 | MIT AI gateway exposing 352 providers (150+ free) and 1,200+ models via one endpoint, with quota-aware fallback and built-in compression. Built by 550+ contributors — consolidation pressure on model routing is real. |
| [Hmbown/Codewhale](https://github.com/Hmbown/Codewhale) | Rust | 40,960 | Open-source terminal coding agent in Rust, on a community-driven improvement journey. Keeps Rust competitive in the coding-agent CLI race alongside qwen-code and kilocode. |
| [max-sixty/worktrunk](https://github.com/max-sixty/worktrunk) | Rust | — (+137)* | CLI for Git worktree management purpose-built for parallel AI agent workflows. Trending today — evidence that multi-agent development is reshaping even vanilla Git tooling. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | | 244,895 | "The agent that grows with you" — a long-lived personal agent from NousResearch. Largest pure-agent project in the dataset and a bellwether for persistent companions. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,108 | Fair-code workflow automation with native AI capabilities, 400+ integrations, self-host or cloud. MCP support cements it as the workflow backbone beneath agentic automation. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,289 | The original autonomous-agent platform, now repositioned as accessible AI building blocks. Still top-5 among agents three years after igniting the wave. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,546 | Collaborative workspace for agentic workflows and RAG pipelines with broad model/tool support across cloud, VPC and self-host. Remains the reference low-code agent builder. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,199 | The self-described "agent engineering platform." Its rebrand from chains to agents mirrors the ecosystem's direction of travel. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,377 | Library enabling agents to drive real browsers. Browser operation is now a default agent capability, not a novelty. |
| [Shubhamsaboo/awesome-llm-apps](https://github.com/Shubhamsaboo/awesome-llm-apps) | Python | — (+237)* | Curated collection of 100+ free, open-source AI agents, agent skills and RAG apps. +237 today — the skills-collection format keeps compounding. |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | — (+99)* | Curated library of offensive-security SKILL.md files priming Claude with expert methodology per attack surface (SQLi, EDR evasion, exploit dev). A striking signal of domain expertise being packaged as agent skills. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [f/prompts.chat](https://github.com/f/prompts.chat) | HTML | 170,143 | Community prompt library (f.k.a. Awesome ChatGPT Prompts), self-hostable. Prompt sharing remains a durable, evergreen category. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,787 | User-friendly self-hosted AI interface supporting Ollama, OpenAI-compatible APIs and more. The default local-chat front end for the Ollama ecosystem. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 122,830 | One-click HD short-video generation from a topic via LLM workflows. Content-generation apps still command massive adoption. |
| [melgarafael/DeskcommCRM](https://github.com/melgarafael/DeskcommCRM) | TypeScript | — (+505)* | Self-hosted AI sales OS — CRM with native AI agents + WhatsApp (WAHA), MCP-ready, multi-tenant, LGPD-compliant; open alternative to Kommo/Octadesk/Intercom. Strongest AI-app debut on today's list (+505). |
| [alsk1992/CloddsBot](https://github.com/alsk1992/CloddsBot) | TypeScript | — (+377)* | Autonomous trading agent across 1,000+ markets (Polymarket, Kalshi, Binance, Hyperliquid, Solana DEXs, 5 EVM chains) with an agent-commerce protocol for machine-to-machine payments. Rides both agentic trading and agent-payments narratives. |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | — (+357)* | Regularly updated archive of extracted system prompts from Claude (Fable 5.1, Opus 5, Claude Code), GPT-6-Astra/Codex, Gemini 3.8 Flash / 3.1 Pro / Antigravity, Grok, Kimi and Cursor. Prompt archaeology now tracks frontier releases in near real time. |
| [jihe520/MathModelAgent](https://github.com/jihe520/MathModelAgent) | Python | — (+264)* | Agent + skills that autonomously complete mathematical modeling and generate a submission-ready paper. Exemplifies agents that deliver end-to-end documents, not just answers. |
| [vxcontrol/pentagi](https://github.com/vxcontrol/pentagi) | Go | — (+193)* | Fully autonomous multi-agent system performing complex penetration-testing tasks. The defensive twin of Claude-Red in this week's security-agent momentum. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,209 | The model-definition framework for SOTA text/vision/audio/multimodal models, for inference and training. Still the gravitational center of open ML. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,073 | Local UI to run and train LLMs and diffusion models (GGUF, MLX, Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4, FLUX). Consumer-GPU fine-tuning has gone fully mainstream. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,785 | Distributed AI compute engine with a core runtime plus ML acceleration libraries. Underpins large-scale training and — via OpenRLHF — the agentic RL stack. |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,861 | High-performance serving framework for LLMs and multimodal models. Inference throughput remains a contested battleground. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,713 | Agent Reinforcement Trainer — on-the-job GRPO training for multi-step agents (Qwen3.6, GPT-OSS, Llama). "RL for agents" is emerging as its own discipline. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 9,997 | Scalable agentic RL framework (PPO, DAPO, REINFORCE++, VLM, vLLM, Ray, async). The reference open RL stack, approaching 10k⭐. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,751 | The RL bridge for LLM-based agent applications, "made simple & flexible." Closes the loop between agent frameworks and RL trainers. |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | — (+193)* | YuE2: frontier music generation with symbolic planning, zero-shot covers and agentic music editing. Generative media is absorbing the agent paradigm. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 179,576 | The context API to search, scrape and interact with the web at scale. Web data remains the moat for grounded agents. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,245 | Turns codebases, docs, SQL schemas and PDFs into queryable knowledge graphs via a skill for Claude Code/Cursor/Codex/Gemini CLI — deterministic AST parsing, no vector store. Graph-over-vectors is winning believers. |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 80,529 | Adaptive scraping framework handling everything from a single request to full-scale crawls. Feeds retrieval pipelines with resilient data collection. |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,931 | Up-to-date code documentation delivered to LLMs and AI code editors. Targets the stale-docs hallucination pain point everyone pays to kill. |
| [MemPalace/mempalace](https://github.com/MemPalace/mempalace) | Python | 59,022 | The best-benchmarked open-source AI memory system, free. Memory is splitting out as its own product layer. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,319 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. Strong bilingual (CN/EN) traction. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,361 | Local-first code intelligence graph for MCP/CLI that maps codebases so AI tools read only what matters, with benchmarked context reduction. Directly attacks the code-review token bill. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,227 | MCP toolkit giving agents semantic retrieval and editing — "the IDE for your agent." Symbolic code understanding over raw context stuffing. |

\* *Trending-list entries returned total=0 from the API; only today's delta is shown. Topic-search totals copied verbatim.*

---

## 3. Trend Signal Analysis

The clearest signal: **value has shifted from building agents to operating them**. The top of the ecosystem is no longer model repos but harness tooling — ECC (257,087⭐), cc-switch (132,529⭐), rtk (80,099⭐), headroom (71,751⭐) — which optimize, route, compress and configure existing coding agents rather than replace them. Token economics is the sub-theme: rtk claims 60–90% savings, headroom 60–95% on JSON, and half-joke skills like caveman (105,238⭐) and ponytail (136,596⭐) cut tokens by making agents laconic — proof that context *cost*, not capability, is the binding constraint.

Second, **skills are becoming a packaging standard**: SKILL.md libraries (Claude-Red, distilly at 24,659⭐, agentic-awesome-skills with 2,115+ skills) treat expertise as portable files across 26+ tools per superpowers-zh — a de facto plugin ecosystem.

Directions appearing with new names: **loop engineering** as a discipline (DeepCode, loop-engineering), Git worktree CLIs for **parallel agents** (worktrunk), **agent commerce** payment protocols (CloddsBot), **self-evolving agents** (GenericAgent, evolver, CowAgent), and memory as a standalone product (MemPalace, letta).

Linkage to releases is direct: system_prompts_leaks indexes Claude "Fable 5.1," GPT-6-Astra and Gemini 3.8 — each frontier drop triggers prompt archaeology (+357 today). Open-weights momentum is Chinese-lab-led (ollama ships Kimi-K2.6, GLM-5.2, DeepSeek-V4; chinese-llm-benchmark tracks 374 models with a 2M+ defect database). Finally, agentic RL (ART/AReaL/OpenRLHF) and security agents (pentagi, Claude-Red) show training and offense/defense both going agentic.

---

## 4. Community Hot Spots

- **[affaan-m/ECC](https://github.com/affaan-m/ECC)** — Highest-starred project in the dataset; its skills/instincts/memory/security bundle across Claude Code, Codex and Cursor is converging into a de facto harness-performance standard. Watch for cross-tool compatibility specs emerging here.
- **Skills economy** — [titanwings/distilly](https://github.com/titanwings/distilly) (24,659⭐), [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) (2,115+ skills) and [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) signal SKILL.md as the new package format; tooling for skill validation and security vetting is an open gap.
- **Token-cost stack** — [rtk-ai/rtk](https://github.com/rtk-ai/rtk) + [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) + [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) form a compression/routing layer; the aggressive savings claims (15–95%) deserve independent benchmarking, and the category will consolidate.
- **Memory layer** — [MemPalace/mempalace](https://github.com/MemPalace/mempalace) ("best-benchmarked" open memory) and [letta-ai/letta](https://github.com/letta-ai/letta) show memory becoming an independently benchmarked product every harness will need to integrate.
- **RL for agents** — [OpenPipe/ART](https://github.com/OpenPipe/ART) (GRPO on-the-job training), [areal-project/AReaL](https://github.com/areal-project/AReaL) and [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) are the most likely source of the next capability jump for open agents as reasoning models mature.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*