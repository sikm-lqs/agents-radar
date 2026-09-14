# AI Open Source Trends 2026-09-15

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-14 17:02 UTC

---

# AI Open Source Trends Report — 2026-09-15

**Methodology note:** From the 20 trending + 83 topic-search repos, 10 clearly non-AI projects were removed (localsend, vaultwarden, ever-gauzy, opendisplay, flowsint, cs-video-courses, etc.). Borderline cases **netdata**, **medusa**, and **RuView** (WiFi sensing) were excluded as AI-adjacent rather than AI-native. Trending-list entries show `⭐0` total in the source data (pipeline artifact) — today's delta is the reliable momentum signal and is shown verbatim.

---

## 1. Today's Highlights

**[debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)** takes today's top spot (+2,774) as a fully-local ElevenLabs alternative spanning cloning, dubbing, transcription and audiobooks in 646 languages, headlining a broader voice/speech surge alongside OpenBMB's tokenizer-free **VoxCPM2** and **YuE2**'s agentic music generation. **[JustVugg/colibri](https://github.com/JustVugg/colibri)** (+2,233) pushes local inference to its minimalist extreme — a pure-C, zero-dependency MoE engine that streams experts from disk. **[alibaba/open-code-review](https://github.com/alibaba/open-code-review)** (+1,796) open-sources an enterprise battle-tested hybrid reviewer pairing deterministic rule pipelines with an LLM agent. The agent-skills economy is highly visible: a validated skill registry (+506), offensive-security skill packs (Claude-Red, +606), and leaked system-prompt archives (+770). Agentic RL training frameworks and multi-agent finance (TradingAgents, +756) round out a day defined by efficiency, skills, and vertical depth.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+2,233) | Pure-C, zero-dependency inference engine that runs frontier MoE models on hardware you already own by streaming expert weights from disk. Today's #2 gainer signals real demand for minimalist local runtimes for MoE-era models. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,924 | The default way to run open-weight LLMs locally, now covering Kimi-K2.6, GLM-5.2, DeepSeek, gpt-oss, Qwen and Gemma. Remains the gateway for the local-AI wave that colibri and VoiceStudio extend. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,875 (+528) | The model-definition framework for SOTA text, vision, audio and multimodal models, for inference and training. Still gaining +528/day as the compounding model layer of the ecosystem. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,819 | Cross-platform desktop control center for Claude Code, Codex, OpenCode, OpenClaw, Grok Build & Hermes Agent. Its 132k stars quantify how mainstream managing multiple agent clients has become. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,333 | Single-binary Rust CLI proxy cutting LLM token consumption 60–90% on common dev commands. Anchors the fast-growing "token economics" niche alongside caveman (105,533) and headroom (72,079). |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,949 | High-performance serving framework for large language and multimodal models. The server-side counterpart to today's client-side efficiency obsession. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 0 (+640) | One CLI giving agents read/search access to Twitter, Reddit, YouTube, GitHub, Bilibili and XiaoHongShu with zero API fees. +640 today reflects strong appetite for free, unauthenticated context sources. |
| [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) | TypeScript | 0 (+506) | Secure, validated skill registry for Antigravity, Claude Code, Cursor, Copilot and other professional coding agents. Early signal of an "npm-for-skills" trust layer forming. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 258,213 | Agent harness performance optimization system — skills, instincts, memory, security and research-first development for Claude Code, Codex, OpenCode, Cursor and beyond. The highest-starred repo in the entire dataset. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,409 | "The agent that grows with you," now spawning its own plugin ecosystem (oh-my-hermes, +52 today). Massive community gravity around a non-lab agent runtime. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,273 | Fair-code workflow automation with native AI capabilities and 400+ integrations, self-host or cloud. The automation backbone steadily absorbing agent nodes. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,700 | Collaborative workspace for agentic workflows and RAG pipelines deployable on cloud, VPC or self-hosted. The default "agent app platform" pick for teams moving prototype-to-production. |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | 0 (+756) | Multi-agent LLM financial trading framework with analyst/researcher/trader role structure. +756 today leads an agentic-finance cluster including Vibe-Trading (33,433) and daily_stock_analysis (65,050). |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,599 | The standard library for agents that drive real browsers. Persistent fixture of the web-acting agent stack. |
| [666ghj/MiroFish](https://github.com/666ghj/MiroFish) | Python | 0 (+524) | "Simple and universal" swarm-intelligence engine for predicting anything. +524 today shows curiosity in swarm-style multi-agent prediction beyond chat paradigms. |
| [letta-ai/letta](https://github.com/letta-ai/letta) | | 24,736 | Platform for stateful agents with advanced memory that learns and self-improves over time. Memory remains the key differentiator as agent frameworks converge on similar tooling. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) | Python | 0 (+2,774) | Open-source, fully-local ElevenLabs alternative: cloning, voice design, dubbing, dictation, transcription and audiobooks in 646 languages. Today's top gainer by a wide margin — voice is the breakout app category of the day. |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Go | 0 (+1,796) | Hybrid code reviewer combining deterministic rule pipelines (NPE, thread-safety, XSS, SQLi) with an LLM agent for precise line-level comments; OpenAI/Anthropic-compatible. +1,796 today shows enterprise-grade AI code review arriving as open source. |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | 0 (+770) | Regularly updated archive of extracted system prompts from Claude (Fable 5.1, Opus 5, Claude Code), ChatGPT GPT-6-Astra, Codex, Gemini 3.8/Antigravity, Grok, Cursor and Kimi. +770 today signals sustained reverse-engineering of frontier-agent behavior. |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | 0 (+606) | Curated library of offensive-security skills (SKILL.md format) for the Claude skills system, from SQLi to EDR evasion. +606 today; doubles as a live case study in skill-format security content — handle with care. |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | 0 (+578) | YuE2: frontier music generation with symbolic planning, zero-shot covers and agentic music editing. A next-gen creative model release riding the multimodal wave. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 152,010 | User-friendly self-hosted AI interface supporting Ollama and OpenAI-compatible APIs. The de facto local chat frontend at massive scale. |
| [CherryHQ/cherry-studio](https://github.com/CherryHQ/cherry-studio) | TypeScript | 51,788 | AI productivity studio with smart chat, autonomous agents and 300+ assistants with unified frontier-LLM access. The consumer-grade aggregation layer keeps compounding. |
| [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) | Python | 0 (+204) | VoxCPM2: tokenizer-free TTS for multilingual speech generation, creative voice design and true-to-life cloning. Architecturally notable for removing the tokenizer from the speech pipeline entirely. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,151 | Local UI to run and train LLMs and diffusion models (GGUF, MLX; Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4, FLUX). The community standard for accessible fine-tuning. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,107 | "The absolute trainer to light up AI agents" — RL infrastructure purpose-built for agentic workloads. Headline member of a distinct agentic-RL cluster in today's data. |
| [DLR-RM/stable-baselines3](https://github.com/DLR-RM/stable-baselines3) | Python | 13,796 | Reliable PyTorch implementations of core RL algorithms. The classic backbone is still trending as agent-RL demand resurges. |
| [Farama-Foundation/Gymnasium](https://github.com/Farama-Foundation/Gymnasium) | Python | 12,531 | Standard API for RL environments (formerly Gym). The environment layer every agent-RL trainer depends on. |
| [wandb/wandb](https://github.com/wandb/wandb) | Python | 11,247 | AI developer platform for training, fine-tuning and managing models from experimentation to production. Cross-cuts the entire training stack. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,716 | Agent Reinforcement Trainer using GRPO for multi-step real-world tasks — "on-the-job training" for Qwen3.6, GPT-OSS, Llama and more. RL moving from chat benchmarks to deployed agents. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 10,004 | Easy-to-use, scalable agentic RL framework (PPO, DAPO, REINFORCE++, VLM, vLLM, Ray, async). Reference implementation for post-training pipelines. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,758 | The "RL bridge" for LLM-based agent applications, made simple and flexible. Confirms RL's shift from chat models toward long-horizon agent behavior. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,662 | Turns codebases, docs, SQL schemas and PDFs into a queryable knowledge graph via a /graphify skill for Claude Code, Cursor, Codex and Gemini CLI — local AST parsing, no vector store. Vector-free retrieval at 116k stars is a genuine counter-trend. |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 62,008 | Up-to-date code documentation injected into LLMs and AI code editors. The "fresh docs" context layer has become table stakes for coding agents. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuAn) | TypeScript | 46,343 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. Emblematic of note-taking tools pivoting into agent-ready knowledge bases. |
| [tirth8205/code-review-graph](https://github.com/tirth8205/code-review-graph) | Python | 31,412 | Local-first code intelligence graph for MCP and CLI so coding tools read only what matters, with benchmarked context reductions on reviews and large-repo workflows. Pairs naturally with today's token-economics theme. |
| [oraios/serena](https://github.com/oraios/serena) | Python | 29,316 | MCP toolkit giving coding agents semantic retrieval and editing — "the IDE for your agent." Strong traction in the coding-agent context-supply chain. |
| [Crosstalk-Solutions/project-nomad](https://github.com/Crosstalk-Solutions/project-nomad) | TypeScript | 0 (+26) | Offline-first knowledge and education server — Wikipedia, books, courses, maps plus optional local AI, no internet required. Small today, but a clear marker of the offline/resilience direction. |

---

## 3. Trend Signal Analysis

Community attention is exploding in three pockets. **Local-first voice/multimodal AI** leads: VoiceStudio (+2,774) replicates the full ElevenLabs product surface locally, while VoxCPM2's tokenizer-free TTS and YuE2's symbolically-planned music generation show model-layer novelty, not just app packaging. **Extreme-efficiency inference** follows: colibri's pure-C MoE engine with disk-streamed experts (+2,233) is only viable because 2026's open-weight frontier (DeepSeek-V4, Qwen3.8, Kimi-K2.6, GLM-5.x, MiniMax-H3 — all named across these repos) is uniformly MoE-heavy. The same economics power the token-cost tooling cluster: rtk (80,333), caveman (105,533), headroom (72,079), and codeburn (11,006).

A genuinely new structural layer is the **agent skills economy**: validated registries (agent-skills, +506), mega-collections (ECC at 258,213 — the dataset's top repo; agentic-awesome-skills with 2,115+ skills), and vertical packs (Claude-Red's offensive security; superpowers-zh's Chinese localization). Skills are becoming the package-manager layer for agents, and trust/vetting is the unsolved problem — note the tension between "secure, validated" registries and freely distributable attack-oriented packs.

Linkage to industry events is direct: leaked system prompts referencing Claude Fable 5.1/Opus 5, GPT-6-Astra, and Gemini 3.8/Antigravity (+770) show the community dissecting the newest frontier releases, while omnipresent references to Claude Code, Codex, Cursor, Antigravity, Grok Build and Hermes Agent confirm a portable, multi-client agent market. Finally, agentic RL (agent-lightning, ART, AReaL, OpenRLHF) and agentic finance (TradingAgents +756, Vibe-Trading, FinGPT) show training methods and verticals catching up to the agent wave.

---

## 4. Community Hot Spots

- **[JustVugg/colibri](https://github.com/JustVugg/colibri)** — Potentially the "llama.cpp moment" for MoE expert-streaming. Watch model compatibility breadth and memory benchmarks; if it sustains, it reshapes local-inference expectations.
- **[debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio)** — Consolidates cloning, dubbing, and audiobooks into one local suite; the 646-language claim and cloning quality deserve independent benchmarking against VoxCPM2.
- **Skills supply-chain security** — The contrast between [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) (validated registry) and [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) (offensive skills, +606) frames 2026's next big trust problem: who vets what agents execute.
- **Agentic finance cluster** — [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents), [HKUDS/Vibe-Trading](https://github.com/HKUDS/Vibe-Trading), and [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) are converging fast; high community energy, but evaluate rigor and risk controls before deployment.
- **Token economics tooling** — [rtk-ai/rtk](https://github.com/rtk-ai/rtk), [JuliusBrussee/caveman](https://github.com/JuliusBrussee/caveman), and [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) attack the same cost problem from proxy, prompt, and compression angles — measure ROI carefully, since aggressive compression can degrade answer quality.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*