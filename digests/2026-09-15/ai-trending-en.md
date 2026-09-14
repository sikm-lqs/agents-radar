# AI Open Source Trends 2026-09-15

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-14 23:30 UTC

---

# AI Open Source Trends Report — 2026-09-15

**Filtering note:** Excluded as non-AI from the trending list: [localsend](https://github.com/localsend/localsend), [vaultwarden](https://github.com/dani-garcia/vaultwarden), [ever-gauzy](https://github.com/ever-co/ever-gauzy), [opendisplay](https://github.com/peetzweg/opendisplay), [flowsint](https://github.com/reconurge/flowsint), and [project-nomad](https://github.com/Crosstalk-Solutions/project-nomad) (AI is optional add-on, not core). [cs-video-courses](https://github.com/Developer-Y/cs-video-courses) and [netdata](https://github.com/netdata/netdata) were excluded from topic results as AI-incidental. 88 AI-relevant projects retained.

---

## 1. Today's Highlights

The day's dominant story is **local-first AI**: [VoiceStudio](https://github.com/debpalash/VoiceStudio) (+2,774) and [colibri](https://github.com/JustVugg/colibri) (+2,233) — a fully-local ElevenLabs alternative and a pure-C MoE inference engine — are the top two AI gainers, both promising frontier capability with zero API fees. [Alibaba's open-code-review](https://github.com/alibaba/open-code-review) (+1,796) validates the **hybrid deterministic-rules + LLM-agent** architecture for enterprise code review. [system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) (+770) shows prompt intelligence on GPT-6-Astra, Claude Fable 5.1/Opus 5, and Gemini 3.8 becoming mainstream competitive research. Meanwhile the topic-search data reveals the **agent harness/skills economy** at massive scale: [ECC](https://github.com/affaan-m/ECC) (258k stars) and [hermes-agent](https://github.com/NousResearch/hermes-agent) (245k) anchor a layer where skills, memory, and token compression are the new battleground.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+2,233) | Pure-C, zero-dependency MoE inference engine that streams expert weights from disk to run frontier models on owned hardware. Today's #1 AI trending gainer — extreme local-first engineering. |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Go | 0 (+1,796) | Hybrid code-review platform pairing deterministic rule pipelines (NPE, XSS, SQLi) with an LLM agent for line-level comments; battle-tested at Alibaba scale. +1,796 today shows enterprise appetite for non-hallucinating LLM tooling. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,957 | De-facto local runtime for Kimi, GLM, MiniMax, DeepSeek, gpt-oss, Qwen, Gemma. Its model list confirms Chinese open weights as the local-stack default. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,847 | All-in-one desktop manager for Claude Code, Codex, OpenCode, OpenClaw, Grok Build & Hermes Agent. 132k stars signals poly-agent workflows are now mainstream. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,386 | Single-binary CLI proxy cutting LLM token use 60–90% on common dev commands. Token economics has become first-class infrastructure. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 72,135 | Compresses tool outputs, logs, and RAG chunks before they reach the LLM — 60–95% token reduction on JSON with "same answers." Ships as library, proxy, and MCP server. |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 66,169 | MIT AI gateway: 352 providers (150+ free), 1,200+ models, quota-aware auto-fallback, built by 550+ contributors. The anti-lock-in routing layer for coding agents. |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,956 | High-performance serving framework for large and multimodal models — the serving backbone beneath agentic RL and inference stacks. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 258,380 | Agent harness performance layer — skills, instincts, memory, security — spanning Claude Code, Codex, Opencode, Cursor. Highest star count in the entire dataset: the harness is where community value is accreting. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,508 | "The agent that grows with you" from the open-weights lab. Its plugin economy is live — [oh-my-hermes](https://github.com/rlaope/oh-my-hermes) (memory + workflow packs) is trending today (+52). |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,310 | Fair-code workflow automation with native AI and 400+ integrations, self-hostable. The bridge between classic automation and agentic workflows. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,728 | Agentic workflow + RAG pipeline builder with multi-model tool support across cloud/VPC/self-host. Prototype-to-production without stack rebuild. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,333 | Now self-described as "the agent engineering platform" — a telling repositioning from LLM framework to agent orchestration. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,626 | Agents that drive real browsers; the reference implementation for computer-use/web-agent capability. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 0 (+640) | One CLI giving agents read/search eyes on Twitter, Reddit, YouTube, GitHub, Bilibili, XiaoHongShu — zero API fees. +640 today reflects demand for cheap agent perception layers. |
| [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) | TypeScript | 0 (+506) | Secure, validated skill registry for Antigravity, Claude Code, Cursor, Copilot. +506 today — supply-chain trust is emerging as the skills economy's gating problem. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) | Python | 0 (+2,774) | Fully-local ElevenLabs alternative: cloning, voice design, video dubbing, dictation, audiobooks across 646 languages. Today's biggest AI gainer by a wide margin. |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | 0 (+770) | Regularly updated extraction of system prompts from Claude Fable 5.1/Opus 5, GPT-6-Astra/Codex, Gemini 3.8 Flash/3.1 Pro/Antigravity, Grok, Kimi. +770 — prompt archaeology as standard competitive intel. |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | 106,084 (+756) | Multi-agent LLM financial trading framework. Cross-listed in trending and topic search; finance remains the hottest agent vertical. |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | 0 (+606) | Curated offensive-security skills (SQLi → shellcode → EDR evasion) packaged as SKILL.md for Claude's skills system. +606 — security professionals are early adopters of the skill format. |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | 0 (+578) | YuE2 frontier music generation with symbolic planning, zero-shot covers, and agentic editing. Symbolic planning is a notable differentiator from end-to-end audio models. |
| [666ghj/MiroFish](https://github.com/666ghj/MiroFish) | Python | 0 (+524) | "Simple and universal swarm intelligence engine, predicting anything" — crowd-wisdom aggregation as a prediction service; an unusual collective-intelligence direction. |
| [ruvnet/RuView](https://github.com/ruvnet/RuView) | Rust | 0 (+370) | Turns commodity WiFi signals into spatial intelligence, vital-sign monitoring, and presence detection — no camera pixels. RF-sensing ML is a rare first appearance on the trending list. |
| [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) | Python | 0 (+204) | VoxCPM2: tokenizer-free multilingual TTS with creative voice design and lifelike cloning. Pairs with VoiceStudio to form a complete local speech stack. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,954 (+528) | The model-definition framework for SOTA text/vision/audio/multimodal training and inference. Still trending (+528) after all these years — the ecosystem's bedrock. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,167 | Local UI to run and train LLMs/diffusion (GGUF, MLX) with day-one support for Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4 — a reliable proxy for which open weights matter. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,800 | Distributed AI compute engine underlying training and serving stacks, including OpenRLHF. Quietly indispensable infrastructure. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,113 | Microsoft's "absolute trainer to light up AI agents" — a major-vendor bet on agentic RL post-training. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,718 | Agent Reinforcement Trainer applying GRPO to multi-step, on-the-job agent training across Qwen3.6, GPT-OSS, Llama. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 10,006 | Scalable agentic RL framework (PPO, DAPO, REINFORCE++, VLM) built on Ray + vLLM async pipelines. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,758 | The "RL bridge" connecting LLM agent applications to reinforcement learning — completes a notable four-project agentic-RL cluster. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,439 | ReLE eval covering 374 models (GPT-5.4, Gemini-3.1-pro, Claude-4.6, GLM-5.1, DeepSeek-V4) plus a 2M+ entry model-defect database for community research. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,738 | Turns codebases, docs, SQL schemas, and PDFs into queryable knowledge graphs for Claude Code/Cursor/Codex/Gemini CLI — deterministic AST parsing, every edge explained, explicitly **no vector store**. A 116k-star vote against embedding-only RAG. |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 62,021 | Delivers up-to-date code documentation directly to LLMs and AI editors, solving the stale-training-data problem at the source. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,350 | Privacy-first, self-hosted knowledge workspace designed for human–agent collaboration — personal knowledge management reimagined around agents. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,426 | Local-first code intelligence graph (MCP + CLI) so AI tools read only what matters, with benchmarked context reduction on large-repo reviews. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,330 | MCP toolkit giving agents semantic retrieval and editing over code — "the IDE for your agent." |

*\*Note: trending-list entries report total stars as "0" in the source feed; today's delta shown in parentheses. For repos appearing in both sources (transformers, TradingAgents), total and delta are merged verbatim.*

---

## 3. Trend Signal Analysis

**Explosive attention: local-first AI.** The day's top gainers — VoiceStudio (+2,774), colibri (+2,233), Agent-Reach ("zero API fees"), VoxCPM — share one thesis: frontier capability on hardware you own, with no subscription. Colibri's pure-C, disk-streamed MoE experts is the most technically aggressive expression, effectively commoditizing DeepSeek-style sparse architectures for consumer machines.

**The harness/skills economy is consolidating.** ECC (258k), hermes-agent (245k), cc-switch (132k), plus trending skill projects (agent-skills +506, Claude-Red +606, oh-my-hermes) show skills becoming the portable capability standard across Claude Code, Codex, Cursor, and Antigravity. Notably, the top new entrant frames itself around *security and validation* — a supply-chain problem statement for the skills layer.

**First-time directions:** (1) hybrid deterministic+LLM pipelines (Alibaba's +1,796); (2) knowledge-graph-over-vectors for code context (graphify at 116k explicitly rejects vector stores); (3) a distinct agentic-RL cluster (agent-lightning, ART, AReaL, OpenRLHF); (4) RF/wifi sensing (RuView).

**Model-release linkage:** system_prompts_leaks catalogs GPT-6-Astra, Claude Fable 5.1/Opus 5, and Gemini 3.8 prompts — frontier competition directly fuels prompt-intelligence demand. Chinese open models (DeepSeek-V4, Qwen3.8, Kimi K2.6, GLM-5.1, MiniMax-H3) are the default substrate across ollama, unsloth, and OmniRoute, explaining why MoE-local tooling like colibri is appearing now.

---

## 4. Community Hot Spots

- **Agent skills as the new plugin standard** — [ECC](https://github.com/affaan-m/ECC) (258k), [agent-skills](https://github.com/tech-leads-club/agent-skills), [Claude-Red](https://github.com/SnailSploit/Claude-Red), [distilly](https://github.com/titanwings/distilly): the SKILL.md format is going cross-agent; validation/security is the unsolved gap and an opportunity.
- **Token economics tooling** — [rtk](https://github.com/rtk-ai/rtk), [headroom](https://github.com/headroomlabs-ai/headroom), [OmniRoute](https://github.com/diegosouzapw/OmniRoute), [codeburn](https://github.com/getagentseal/codeburn): as agent loops multiply consumption 10–100×, compression and routing layers are high-leverage picks-and-shovels.
- **Local speech stack** — [VoiceStudio](https://github.com/debpalash/VoiceStudio) + [VoxCPM](https://github.com/OpenBMB/VoxCPM): a complete, free ElevenLabs replacement is assembling; watch colibri's disk-streamed-experts technique as the enabler for local MoE beyond text.
- **Agentic RL post-training** — [agent-lightning](https://github.com/microsoft/agent-lightning), [ART](https://github.com/OpenPipe/ART), [AReaL](https://github.com/areal-project/AReaL): Microsoft + startups converging on GRPO-style training for multi-step agents; likely the next framework war.
- **Graph-based code knowledge** — [graphify](https://github.com/Graphify-Labs/graphify), [code-review-graph](https://github.com/tirth8205/code-review-graph), [serena](https://github.com/oraios/serena): deterministic, explainable graphs are overtaking vector RAG for codebase context — a durable architectural shift.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*