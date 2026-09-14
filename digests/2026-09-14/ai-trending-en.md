# AI Open Source Trends 2026-09-14

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-14 11:30 UTC

---

# AI Open Source Trends Report — 2026-09-14

**Sources:** GitHub Today's Trending (20 repos) + AI Topic Search (83 repos, deduplicated)

**Step 1 — Filter result:** 9 non-AI repos excluded from trending/topic data: [localsend](https://github.com/localsend/localsend), [vaultwarden](https://github.com/dani-garcia/vaultwarden), [ever-gauzy](https://github.com/ever-co/ever-gauzy), [opendisplay](https://github.com/peetzweg/opendisplay), [flowsint](https://github.com/reconurge/flowsint), [project-nomad](https://github.com/Crosstalk-Solutions/project-nomad), [cs-video-courses](https://github.com/Developer-Y/cs-video-courses), [netdata](https://github.com/netdata/netdata), [medusa](https://github.com/medusajs/medusa) (AI-adjacent branding, not substantively AI tools).

---

## 1. Today's Highlights

[VoiceStudio](https://github.com/debpalash/VoiceStudio) is today's runaway story at **+2,632 stars** — roughly 3.5× the next AI project — anchoring an unusual triple of voice/audio repos on one trending list alongside [VoxCPM](https://github.com/OpenBMB/VoxCPM) and [YuE](https://github.com/multimodal-art-projection/YuE). [colibri](https://github.com/JustVugg/colibri) (+868) pushes a minimalist counter-trend: frontier MoE models streamed from disk in pure C on hardware you already own. [system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) (+706) shows leak archaeology — GPT-6-Astra, Claude Fable 5.1, Gemini 3.8 — has become a standing community resource tracking frontier releases. A finance-agent cluster led by [TradingAgents](https://github.com/TauricResearch/TradingAgents) (+756) and the offensive-security skill library [Claude-Red](https://github.com/SnailSploit/Claude-Red) (+506) round out a day dominated by the agent-skills meta-layer, which also owns the dataset's largest cumulative stars ([ECC](https://github.com/affaan-m/ECC), 258,039).

---

## 2. Top Projects by Category

> ⚠️ Note: trending-source entries report total stars as `0` (API artifact); the today's-delta in parentheses is the reliable momentum signal.

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [JustVugg/colibri](https://github.com/JustVugg/colibri) | C | 0 (+868) | Pure-C, zero-dependency MoE inference engine that streams experts from disk to run frontier models on commodity hardware. Tops today's AI trending, signaling demand for maximalist models on minimalist runtimes. |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,881 | The default local LLM runtime, now supporting Kimi-K2.6, GLM-5.2, MiniMax, DeepSeek, gpt-oss, Qwen and Gemma. Its model lineup doubles as a live index of the open-weights frontier race. |
| [farion1231/cc-switch](https://github.com/farion1231/cc-switch) | Rust | 132,775 | Cross-platform desktop control center for Claude Code, Codex, OpenCode, OpenClaw, Grok Build & Hermes Agent. 132k stars show that juggling multiple coding-agent subscriptions has become a daily workflow problem. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 80,276 | Single-binary CLI proxy cutting LLM token consumption 60–90% on common dev commands. Anchors a fast-emerging "token economics" niche alongside headroom and caveman. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 72,013 | Compresses tool outputs, logs, files and RAG chunks before they reach the LLM — 20% fewer tokens for coding agents, 60–95% for JSON, same answers. Context compression has matured from hack to product-grade library/proxy/MCP server. |
| [diegosouzapw/OmniRoute](https://github.com/diegosouzapw/OmniRoute) | TypeScript | 65,917 | Free MIT AI gateway: one endpoint, 352 providers (150+ free), 1,200+ models, quota-aware auto-fallback. Built by 550+ contributors, with bundled RTK+Caveman compression claiming 15–95% token savings. |
| [alibaba/open-code-review](https://github.com/alibaba/open-code-review) | Go | 0 (+443) | Hybrid code review combining deterministic pipelines with an LLM agent for line-level comments on NPE, thread-safety, XSS and SQL injection. Battle-tested at Alibaba scale; a clean template for the deterministic-plus-LLM enterprise pattern. |
| [tech-leads-club/agent-skills](https://github.com/tech-leads-club/agent-skills) | TypeScript | 0 (+265) | Secure, validated skill registry for Antigravity, Claude Code, Cursor, Copilot and other coding agents. +265 today as the "skills supply chain" trust problem starts acquiring real infrastructure. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 258,039 | Agent-harness performance optimization layering skills, instincts, memory and research-first workflows onto Claude Code, Codex, Opencode and Cursor. The highest star count in the entire dataset — the augmentation layer above coding agents is where community energy concentrates. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 245,317 | "The agent that grows with you" — NousResearch's personal agent platform. Its plugin ecosystem is trending today via [oh-my-hermes](https://github.com/rlaope/oh-my-hermes) (+52), evidence of a platform-plus-plugin flywheel. |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 204,242 | Fair-code workflow automation with native AI capabilities and 400+ integrations. Remains the bridge between classic automation and agentic workflows. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,320 | The original autonomous-agent project, now positioned as an accessible AI toolkit foundation. 187k stars of enduring brand equity even as the center of gravity shifts to harnesses and skills. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,673 | Collaborative workspace for building agentic workflows and RAG pipelines across cloud, VPC or self-hosted. Still the default "agent app platform" pick for teams moving prototype → production. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 114,573 | Library enabling agents to drive real browsers. Browser control remains the highest-leverage general tool in the agent stack. |
| [lobehub/lobehub](https://github.com/lobehub/lobehub) | TypeScript | 82,465 | "Chief Agent Operator" that hires, schedules and reports on your AI team for 7×24 operations. Signals the shift from single agents to agent-team operations management. |
| [SnailSploit/Claude-Red](https://github.com/SnailSploit/Claude-Red) | Python | 0 (+506) | Curated library of offensive-security skills (SQLi to EDR evasion) packaged as SKILL.md files for Claude's skills system. +506 today — red-team methodology meeting the skills format is guaranteed to spark safety debates. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [debpalash/VoiceStudio](https://github.com/debpalash/VoiceStudio) | Python | 0 (+2,632) | Fully local ElevenLabs alternative: voice cloning, voice design, video dubbing, dictation, transcription and audiobooks in 646 languages. Today's runaway leader at nearly 4× the gain of any other AI repo. |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | 0 (+756) | Multi-agent LLM financial trading framework with specialized analyst/risk roles. Heads a broader finance cluster including [daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) (65,028) and [Vibe-Trading](https://github.com/HKUDS/Vibe-Trading) (33,414). |
| [666ghj/MiroFish](https://github.com/666ghj/MiroFish) | Python | 0 (+524) | "Simple and universal swarm intelligence engine" pitching prediction of anything via collective intelligence. +524 today on a maximal generality claim; worth watching for substance behind the hype. |
| [multimodal-art-projection/YuE](https://github.com/multimodal-art-projection/YuE) | Python | 0 (+487) | YuE2: frontier music generation with symbolic planning, zero-shot covers and agentic music editing. Completes an unusual same-day triple of audio/music repos on the trending list. |
| [ruvnet/RuView](https://github.com/ruvnet/RuView) | Rust | 0 (+370) | Turns commodity WiFi signals into spatial intelligence, vital-sign monitoring and presence detection — zero cameras. Represents non-LLM edge/sensing AI diversifying beyond the language-model stack. |
| [OpenBMB/VoxCPM](https://github.com/OpenBMB/VoxCPM) | Python | 0 (+204) | VoxCPM2: tokenizer-free TTS for multilingual speech, creative voice design and true-to-life cloning. Supplies the model layer beneath today's local-voice-app wave. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,962 | User-friendly self-hosted AI interface supporting Ollama, OpenAI API and more. The default chat front end for the local-first movement. |
| [career-ops-hq/career-ops](https://github.com/career-ops-hq/career-ops) | JavaScript | 71,553 | Local-first AI job-search agent that scores listings A–H, tailors CVs and tracks applications inside Claude Code/Codex/OpenCode. 71k stars show "personal ops" agents emerging as a breakout consumer vertical. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,787 (+152) | The model-definition framework for SOTA text/vision/audio/multimodal training and inference. Still the steady backbone (+152 today) beneath a fast-churning application layer. |
| [rasbt/LLMs-from-scratch](https://github.com/rasbt/LLMs-from-scratch) | Jupyter Notebook | 104,940 | Step-by-step PyTorch implementation of a ChatGPT-like LLM. Education demand keeps pace with model churn — fundamentals remain the durable asset. |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 76,142 | Local UI to run and train LLMs and diffusion models — GGUF, MLX, Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4, FLUX. Consistently first to support each open-weights frontier drop, making it a release-cycle bellwether. |
| [microsoft/agent-lightning](https://github.com/microsoft/agent-lightning) | Python | 18,094 | "The absolute trainer to light up AI agents" from Microsoft. Marks RL's migration from chat models to agent behavior as a first-class training target. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,712 | Agent Reinforcement Trainer applying GRPO to multi-step, real-world agent tasks. On-the-job RL for Qwen3.6, GPT-OSS and Llama — the post-SFT differentiator thesis in code. |
| [OpenRLHF/OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) | Python | 10,002 | Easy-to-use, scalable agentic RL framework (PPO, DAPO, REINFORCE++, VLM, vLLM, Ray, async). The shared substrate referenced by the wider agentic-RL stack. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,439 | ReLE evaluation covering 374 models from GPT-5.4 and Gemini 3.1 Pro to DeepSeek-V4, Kimi-K2.6 and GLM-5.1, plus a 2M+ defect library. Evaluation infrastructure tracking the open-weights race in near-real-time. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 180,200 | The context API to search, scrape and interact with the web at scale. Context acquisition has fully productized into infrastructure for agents and RAG pipelines. |
| [f/prompts.chat](https://github.com/f/prompts.chat) | HTML | 170,298 | The community prompt library (fka Awesome ChatGPT Prompts), self-hostable for organizations. Renewed relevance amid today's prompt-leak wave. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,586 | Turns codebases, docs, SQL and PDFs into queryable knowledge graphs via a Claude Code/Cursor skill — local AST parsing, every edge explained, no vector store. The flagship of the graphs-over-vectors challenge to embedding-centric RAG. |
| [D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) | Python | 80,859 | Adaptive scraping framework handling everything from a single request to full-scale crawls. Resilient data collection feeding agent contexts at scale. |
| [upstash/context7](https://github.com/upstash/context7) | TypeScript | 61,985 | Up-to-date code documentation delivered into LLMs and AI editors. Attacks stale-doc hallucinations at the source rather than at generation time. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuan) | TypeScript | 46,340 | Privacy-first, self-hosted knowledge workspace where humans and agents collaborate. Personal knowledge bases are becoming the habitat layer for agents. |
| [asgeirtj/system_prompts_leaks](https://github.com/asgeirtj/system_prompts_leaks) | JavaScript | 0 (+706) | Extracted system prompts from Claude Fable 5.1/Opus 5, GPT-6-Astra/Codex, Gemini 3.8 Flash/3.1 Pro, Grok, Cursor and Kimi, updated regularly. +706 today — leak archaeology doubling as a free prompt-engineering curriculum. |
| [Panniantong/Agent-Reach](https://github.com/Panniantong/Agent-Reach) | Python | 0 (+640) | One CLI giving agents read/search over Twitter, Reddit, YouTube, GitHub, Bilibili and XiaoHongShu — zero API fees. +640 today; scraping-first data access deliberately bypasses platform API economics. |

---

## 3. Trend Signal Analysis

**Voice/audio AI is today's explosion.** VoiceStudio's +2,632 is the largest single-day AI gain by ~3.5×, and it landed alongside VoxCPM2 (tokenizer-free TTS) and YuE2 (symbolic-planning music generation). Local voice is retracing local LLMs' path: model layer (VoxCPM) → engine → packaged consumer app (VoiceStudio).

**The agent-skills economy is consolidating.** The dataset's top star counts belong not to models but to harness augmentation: ECC (258,039) layers skills and memory onto coding agents, while today added Claude-Red (+506, offensive-security skills), agent-skills (+265, validated registry), and oh-my-hermes. Skills are becoming a supply chain — with curation, trust, and safety problems to match.

**Token economics matured into infrastructure.** [rtk](https://github.com/rtk-ai/rtk) (80,276), [headroom](https://github.com/headroomlabs-ai/headroom) (72,013), [caveman](https://github.com/JuliusBrussee/caveman) (105,480) and [codeburn](https://github.com/getagentseal/codeburn) (10,999) form a compression-plus-metering stack; gateways like OmniRoute now bundle them.

**First-time directions:** colibri's pure-C MoE engine streaming experts from disk pushes frontier models toward consumer hardware; RuView's camera-free WiFi sensing signals non-LLM edge AI; "loop engineering" ([loop-engineering](https://github.com/cobusgreyling/loop-engineering), 11,202) and "harness SDK" ([harness-sdk](https://github.com/strands-agents/harness-sdk), 7,239) are codifying as named disciplines.

**LLM-release linkage:** prompt-leak archives now track frontier cadence (GPT-6-Astra, Claude Fable 5.1, Gemini 3.8), while Ollama, unsloth and benchmark repos index the open-weights race (Kimi-K2.6, GLM-5.2, DeepSeek-V4, Qwen3.8) that fuels local-tool demand — including DeepSeek-prefix-cache-native coding CLIs like [DeepSeek-Reasonix](https://github.com/esengine/DeepSeek-Reasonix) (35,538). The finance-agent cluster (TradingAgents +756, daily_stock_analysis 65,028, Vibe-Trading 33,414) rides the same retail "vibe-trading" wave.

---

## 4. Community Hot Spots

- **Local voice stack** — [VoiceStudio](https://github.com/debpalash/VoiceStudio) (+2,632) + [VoxCPM](https://github.com/OpenBMB/VoxCPM) + [YuE](https://github.com/multimodal-art-projection/YuE) trending simultaneously is a category-creation event. Expect cloning-quality benchmarks, dubbing pipelines, and license/consent scrutiny to follow quickly.
- **Skills supply chain & security** — [ECC](https://github.com/affaan-m/ECC), [agent-skills](https://github.com/tech-leads-club/agent-skills) and [Claude-Red](https://github.com/SnailSploit/Claude-Red) together define the next battleground: who validates skills, and what happens when offensive-security skills ship as SKILL.md files. Safety-minded devs should read Claude-Red before deploying skill loaders.
- **Token-cost tooling ROI** — [rtk](https://github.com/rtk-ai/rtk) and [headroom](https://github.com/headroomlabs-ai/headroom) deliver measurable wins (20–95% reduction claims); pair with [codeburn](https://github.com/getagentseal/codeburn) for metering before/after. Lowest-friction cost fix in today's list.
- **colibri** — pure-C MoE inference with disk-streamed experts. If independent benchmarks hold, it redefines minimum hardware for frontier models; watch for forks and a GGUF-style format ecosystem.
- **Agentic RL** — [agent-lightning](https://github.com/microsoft/agent-lightning), [ART](https://github.com/OpenPipe/ART) and [OpenRLHF](https://github.com/OpenRLHF/OpenRLHF) versus skills-distillation approaches like [distilly](https://github.com/titanwings/distilly) (24,704) is the defining "how do agents improve" debate of the cycle.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*