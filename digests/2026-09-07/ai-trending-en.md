# AI Open Source Trends 2026-09-07

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-07 01:51 UTC

---

# AI Open Source Trends Report — September 7, 2026

**Filter note:** 15 of 18 trending repos are AI-related. Excluded as non-AI/general-purpose: [llvm/llvm-project](https://github.com/llvm/llvm-project), [Stremio/stremio-web](https://github.com/Stremio/stremio-web), [BraveOPotato/FckSignups](https://github.com/BraveOPotato/FckSignups), plus from topic results [Developer-Y/cs-video-courses](https://github.com/Developer-Y/cs-video-courses), [Snailclimb/JavaGuide](https://github.com/Snailclimb/JavaGuide), [netdata/netdata](https://github.com/netdata/netdata), [medusajs/medusa](https://github.com/medusajs/medusa), [metalbear-co/mirrord](https://github.com/metalbear-co/mirrord), [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) — agent-adjacent, but not AI-native.

---

## 1. Today's Highlights

The agent **"skills economy" has effectively taken over GitHub trending**: 8 of the 15 AI-related trending repos are skill packs or harness optimizers, led by [mattpocock/skills](https://github.com/mattpocock/skills) at **+2,207 stars today**. Two behavior-shaping meta-layers — [affaan-m/ECC](https://github.com/affaan-m/ECC) (251,414 total, +1,485) and [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) (+1,539) — each pulled ~1.5K stars in a day by tuning how *existing* agents think rather than shipping new ones. [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) (242,574 stars) keeps climbing while [openai/skills](https://github.com/openai/skills) signals official vendor buy-in to the community skill format. Agentized finance resurged with [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) (+142), and [magnitudedev/magnitude](https://github.com/magnitudedev/magnitude) (+604) confirmed **local inference for agent CLIs** as a breakout direction.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,317 | The default local LLM runtime, now listing Kimi-K2.6, GLM-5.2, DeepSeek, gpt-oss, Qwen and Gemma support. It remains the on-ramp for the local-first agent tooling surging across today's list. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 131,368 | Cross-platform desktop hub managing Claude Code, Codex, OpenCode, OpenClaw, Grok Build and Hermes Agent configs. Its 131K scale reflects developers now juggling multiple coding agents daily. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,124 | A single-binary CLI proxy cutting LLM token consumption 60–90% on common dev commands. Anchors the fast-forming "token economics" stack. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 69,151 | Library/proxy/MCP server that compresses tool outputs, logs, files and RAG chunks before they reach the LLM (20% savings for coding agents, 60–95% for JSON). Directly attacks the context bottleneck of long-running agent loops. |
| [CopilotKit/CopilotKit](https://github.com/CopilotKit/CopilotKit) | TypeScript | 37,216 | The frontend stack for agents and generative UI (React, Angular, mobile, Slack), makers of the AG-UI protocol. Bridges agent backends to real product surfaces. |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,541 | High-performance serving framework for LLMs and multimodal models. Core plumbing as agentic workloads multiply inference demand. |
| [magnitudedev/magnitude](https://github.com/magnitudedev/magnitude) | TypeScript | — (+604) | Open-source inference server that auto-selects the best local models for your hardware and plugs into Pi, OpenCode, Hermes, Codex, Claude Code and Cline. +604 today shows local inference for agent clients is a breakout direction. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 28,906 | MCP toolkit giving coding agents semantic retrieval and editing — "the IDE for your agent." Represents the shift from grep-based to language-server-grade agent context. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 251,414 (+1,485) | Agent-harness performance system layering skills, "instincts," memory and security onto Claude Code, Codex, OpenCode and Cursor. +1,485 today on a 251K base confirms harness optimization is itself a star magnet. |
| [mattpocock/skills](https://github.com/mattpocock/skills) | Shell | — (+2,207) | Curated agent skills "for real engineers," published straight from Matt Pocock's `.agents` directory. Today's top gainer (+2,207) shows individual curators shipping agent extensions like content. |
| [DietrichGebert/ponytail](https://github.com/DietrichGebert/ponytail) | JavaScript | 129,457 (+1,539) | A skill that makes your agent "think like the laziest senior dev" — the best code is the code you never wrote. +1,539 today signals a counterculture pushback against over-generated code. |
| [ruvnet/ruflo](https://github.com/ruvnet/ruflo) | TypeScript | — (+276) | An "agent meta-harness" for multi-player swarms, autonomous workflow coordination, adaptive memory and RAG, integrating Claude Code, Codex and Hermes. Shows swarm orchestration converging with the skills movement. |
| [blader/humanizer](https://github.com/blader/humanizer) | Python | — (+748) | Agent skill that removes telltale signs of AI-generated writing from text. +748 on a single-purpose skill proves small, viral agent utilities can trend. |
| [anomalyco/opencode](https://github.com/anomalyco/opencode) | TypeScript | — (+551) | The open-source terminal coding agent. +551 today keeps it central to the Claude Code-alternative ecosystem most of today's skills target. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 242,574 (+520) | NousResearch's open personal agent "that grows with you," now natively supported across harness and switcher tools. A 242K total still adding +520 daily shows durable demand for self-improving personal agents. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,559 | Fair-code workflow automation with native AI, MCP support and 400+ integrations. The 200K-star incumbent being reshaped as agents absorb traditional automation. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,143 | Self-hosted AI interface supporting Ollama, OpenAI-compatible APIs and MCP. The default front door for local and self-hosted models. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 78,457 | One CLI giving agents read/search over Twitter, Reddit, YouTube, GitHub, Bilibili and XiaoHongShu — zero API fees. 78K stars show huge appetite for an open web-perception layer. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 70,340 | Local-first AI job-search pipeline: scan portals, grade listings (A–H, 1–5), tailor CVs, track applications inside Claude Code/Codex/OpenCode. A 70K-star "life-ops" agent signals personal vertical automation is mainstream. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,711 | LLM-driven multi-market stock analysis with live news, decision dashboards, push alerts and zero-cost scheduled runs. Anchors a strong China-origin agentized-finance cluster. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,523 | AI productivity studio with smart chat, autonomous agents, 300+ assistants and unified frontier-model access. The consumer-grade aggregation app keeps compounding. |
| [The-Swarm-Corporation/AutoHedge](https://github.com/The-Swarm-Corporation/AutoHedge) | Python | — (+142) | "Autonomous hedge fund in minutes" using swarm intelligence for analysis, risk management and execution. Trending today — the agent-trading cluster is hot, and high-risk. |
| [aipoch/open-science](https://github.com/aipoch/open-science) | TypeScript | — (+146) | Local-first, model-agnostic AI research workbench with scientific agents, Python/R notebooks, data connectors and reproducible provenance. Research is the newest vertical to get the agent treatment. |
| [OpenWhispr/openwhispr](https://github.com/OpenWhispr/openwhispr) | JavaScript | — (+121) | Privacy-first voice-to-text dictation with local Parakeet/Whisper or BYOK cloud models. Rides the local-first wave into everyday speech input. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 164,914 | The model-definition framework for SOTA text, vision, audio and multimodal models, for both training and inference. Still the gravitational center of open ML. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,481 | Step-by-step PyTorch implementation of a ChatGPT-like LLM. 104K stars show education demand stays enormous as engineers migrate into AI. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,736 | Local UI to run and train LLMs and diffusion models — GGUF, MLX, Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4, FLUX. Fine-tuning keeps shifting onto personal hardware. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,720 | AI compute engine pairing a distributed runtime with ML acceleration libraries. Backbone infrastructure as agent training and serving scale. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,216 | Open-source financial LLMs with trained weights on HuggingFace. Pairs naturally with today's AutoHedge and stock-analysis agent cluster. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,000 | Microsoft's RL trainer "to light up AI agents." An 18K-star big-tech bet that agent improvement moves from prompting to training. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,704 | Agent Reinforcement Trainer applying GRPO for on-the-job training of multi-step agents (Qwen3.6, GPT-OSS, Llama). RL for agents on open weights is going mainstream. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 177,301 | The "context API" for searching, scraping and interacting with the web at scale. The default web-data feeder for RAG pipelines and agent context. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 115,373 | A `/graphify` skill that turns codebases, docs, SQL and PDFs into queryable knowledge graphs via deterministic AST parsing — "every edge explained, no vector store." 115K stars signal structured graphs challenging embedding-based RAG. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,203 | Privacy-first, self-hosted knowledge workspace designed for human–agent collaboration. Note-taking tools are repositioning as agent memory. |

---

## 3. Trend Signal Analysis

Agent **skills are today's explosive category**. Eight of fifteen AI trending repos are skill packs or harness layers — mattpocock/skills (+2,207), ponytail (+1,539), ECC (+1,485), humanizer (+748), diagram-design (+620), humanlayer/skills (+451), marketingskills (+329) — plus OpenAI's official catalog. Skills are becoming the new dotfiles: portable, per-capability extensions that work across Claude Code, Codex, Cursor, OpenCode and Hermes simultaneously; magnitude alone advertises eight agent clients, confirming coding-agent market fragmentation.

Two directions are crystallizing as *named categories* for the first time: **"agent harness" engineering** (ECC, ruflo, strands-agents/harness-sdk, loop-engineering) productizes the scaffolding around models — memory, instincts, security, orchestration — and a **token-economics stack** (rtk's 60–90% cuts, headroom's 60–95% on JSON, codeburn's cost tracking) reflects context cost becoming a first-class engineering problem as agent loops run longer on premium models.

This connects directly to the model landscape. Ollama/Unsloth listings show an open-weight surge (Kimi-K2.6, GLM-5.2, DeepSeek-V4, Qwen3.6/3.8, MiniMax-H3, gpt-oss, Gemma 4) that powers magnitude's local-inference-for-agents play and makes GRPO-style agent RL (ART, agent-lightning, AReaL) practical — while benchmark repos tracking gpt-5.4, Claude-4.6 and Gemini-3.1 push developers toward model-agnostic harnesses. Counter-currents are equally telling: graphify's "no vector store," ponytail's minimalism, and humanizer's anti-slop stance show the community optimizing for *taste*, not just throughput.

---

## 4. Community Hot Spots

- **Skill portability → standardization race** — With [openai/skills](https://github.com/openai/skills), [mattpocock/skills](https://github.com/mattpocock/skills), [humanlayer/skills](https://github.com/humanlayer/skills) and [sickn33/agentic-awesome-skills](https://github.com/sickn33/agentic-awesome-skills) (2,100+ catalog), watch for a common skill spec across Claude Code/Codex/OpenCode. Whoever defines it builds the "npm of skills."
- **Measure-then-compress token toolchain** — Pair [getagentseal/codeburn](https://github.com/getagentseal/codeburn) (usage/cost tracking across 37 tools) with [rtk](https://github.com/rtk-ai/rtk) + [headroom](https://github.com/headroomlabs-ai/headroom) before scaling agent fleets; 60–90% savings are on the table.
- **Graphs over embeddings** — [graphify](https://github.com/Graphify-Labs/graphify)'s deterministic, auditable knowledge-graph retrieval is the most credible "post-vector-RAG" bet; worth trialing on large codebases.
- **Agent RL on open weights** — [ART](https://github.com/OpenPipe/ART) and [agent-lightning](https://github.com/microsoft/agent-lightning) shift agent improvement from prompt-tuning to weight-tuning via GRPO, and pair well with [unsloth](https://github.com/unslothai/unsloth) local training.
- **Local inference under agent CLIs** — [magnitude](https://github.com/magnitudedev/magnitude) + [ollama](https://github.com/ollama/ollama) running Kimi-K2.6/GLM-5.2-class models beneath Claude Code/Codex is the sovereignty-and-cost play; manage multi-agent setups with [cc-switch](https://github.com/farion1231/cc-switch).

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*