# AI Open Source Trends 2026-09-10

> Sources: GitHub Trending + GitHub Search API | Generated: 2026-09-09 23:30 UTC

---

# AI Open Source Trends Report — 2026-09-10

**Filter note (Step 1):** Excluded non-AI items despite topic tags or trending placement: `liquidslr/system-design-notes` (book notes), `Snailclimb/JavaGuide` (Java interview guide), `Developer-Y/cs-video-courses` (course list), `netdata/netdata` and `D4Vinci/Scrapling` (general infra/scraping), `medusajs/medusa` (commerce platform). ~85 AI-relevant projects retained; highest-momentum items selected per category below.

---

## 1. Today's Highlights

The day's biggest AI story is the **agent "skills" economy going mainstream**: [i-have-adhd](https://github.com/ayghri/i-have-adhd), a skill that stops coding agents from burying answers, is today's top AI gainer at +4,624 stars, followed by [diagram-design](https://github.com/cathrynlavery/diagram-design) at +2,286. [affaan-m/ECC](https://github.com/affaan-m/ECC), a self-described "agent harness performance optimization system," now sits at 255,144 total stars — the largest in the entire dataset — while still adding +1,151 today, with [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) (243,850) close behind. Official ecosystem moves landed too: [openai/plugins](https://github.com/openai/plugins) (+505) and Tencent's [teamai-cli](https://github.com/Tencent/teamai-cli) (+563) both trended. Finally, [awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) (+612) and the return of [TradingAgents](https://github.com/TauricResearch/TradingAgents) (+367) tie today's activity directly to the GPT-Image-2 launch and the heating agentic-finance vertical.

---

## 2. Top Projects by Category

### 🔧 AI Infrastructure

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [ollama/ollama](https://github.com/ollama/ollama) | Go | 180,531 | Local runtime for Kimi-K2.6, GLM-5.2, DeepSeek, gpt-oss, Qwen, Gemma and more. Still the default on-ramp for local LLMs; its model list is a live index of the open-weight frontier. |
| [huggingface/transformers](https://github.com/huggingface/transformers) | Python | 165,044 | The model-definition framework for SOTA text, vision, audio and multimodal training/inference. Bedrock dependency of the whole ecosystem. |
| [rtk-ai/rtk](https://github.com/rtk-ai/rtk) | Rust | 79,708 | Single-binary CLI proxy cutting LLM token consumption 60–90% on common dev commands, zero dependencies. Emblematic of the new "token economics" infra layer. |
| [headroomlabs-ai/headroom](https://github.com/headroomlabs-ai/headroom) | Python | 71,078 | Compresses tool outputs, logs, files and RAG chunks before they reach the LLM — 60–95% token cuts on JSON with same answers. Ships as library, proxy and MCP server. |
| [sgl-project/sglang](https://github.com/sgl-project/sglang) | Python | 35,713 | High-performance serving framework for large language and multimodal models. Serving throughput remains a key bottleneck as agent workloads scale. |
| [Tencent/teamai-cli](https://github.com/Tencent/teamai-cli) | TypeScript | — (+563) | Tencent's CLI for making engineering teams "AI native." A big-tech entrant in team-adoption tooling, trending on day one of visibility. |
| [openai/plugins](https://github.com/openai/plugins) | JavaScript | — (+505) | Official OpenAI plugins repository. First-party signal that plugin marketplaces are re-centralizing around vendor ecosystems. |
| [vastsa/PI-Desktop](https://github.com/vastsa/PI-Desktop) | TypeScript | — (+393) | Local-first AI coding agent desktop: Electron + Rust host core + "pi" agent harness + user-installable plugins. Trending today on the local-first/desktop-form-factor angle. |

### 🤖 AI Agents / Workflows

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [affaan-m/ECC](https://github.com/affaan-m/ECC) | JavaScript | 255,144 (+1,151) | Agent harness performance system bundling skills, instincts, memory and security for Claude Code, Codex, Opencode and Cursor. Highest star count in the dataset, still compounding 1k+/day. |
| [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) | Python | 243,850 | "The agent that grows with you" — a personal agent from Nous Research. Personal-agent framing is outperforming generic frameworks in raw stars. |
| [Significant-Gravitas/AutoGPT](https://github.com/Significant-Gravitas/AutoGPT) | Python | 187,238 | The original autonomous-agent project, repositioned as accessible AI tooling. Legacy gravity keeps it top-tier as focus shifts to harnesses. |
| [langgenius/dify](https://github.com/langgenius/dify) | TypeScript | 155,239 | Agentic workflows + RAG pipelines on one collaborative workspace, deployable cloud/VPC/self-host. The default visual agent-builder for product teams. |
| [langchain-ai/langchain](https://github.com/langchain-ai/langchain) | Python | 146,023 | Now billed as "the agent engineering platform." A successful reinvention from chain library to agent platform. |
| [browser-use/browser-use](https://github.com/browser-use/browser-use) | Python | 113,957 | Agents that operate real browsers. Browser control is now an assumed agent primitive, and this is the reference implementation. |
| [ayghri/i-have-adhd](https://github.com/ayghri/i-have-adhd) | Python | — (+4,624) | A skill that stops coding agents from burying the answer — ADHD-friendly output. Today's #1 AI gainer by a wide margin; proof the skills market rewards output-UX ideas. |
| [obra/superpowers](https://github.com/obra/superpowers) | Shell | — (+690) | Agentic skills framework plus a software development methodology "that works." Trending again as the skills pattern it popularizes goes mainstream. |

### 📦 AI Applications

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [n8n-io/n8n](https://github.com/n8n-io/n8n) | TypeScript | 203,876 | Fair-code workflow automation with native AI and 400+ integrations. The highest-starred application in the dataset — automation platforms are absorbing agentic AI. |
| [open-webui/open-webui](https://github.com/open-webui/open-webui) | Python | 151,474 | Self-hosted, user-friendly chat interface for Ollama/OpenAI-compatible APIs. The default front door for local models. |
| [harry0703/MoneyPrinterTurbo](https://github.com/harry0703/MoneyPrinterTurbo) | Python | 121,981 | One-click HD short-video generation from a topic via automated AI workflows. Massive Chinese-market content-automation traction. |
| [ZhuLinsen/daily_stock_analysis](https://github.com/ZhuLinsen/daily_stock_analysis) | Python | 64,847 | LLM-powered multi-market stock analysis with multi-source data, real-time news, dashboards and free scheduled runs. 64k stars signal strong retail appetite for LLM finance. |
| [hugohe3/ppt-master](https://github.com/hugohe3/ppt-master) | Python | 53,331 | Documents or topics → native PowerPoint decks with real shapes, transitions, charts and narration. Document-native generation beats export-style workflows. |
| [cathrynlavery/diagram-design](https://github.com/cathrynlavery/diagram-design) | HTML | — (+2,286) | 38 editorial diagram types for Claude Code, Codex and Pi as self-contained HTML/SVG — "no Mermaid slop." Second-highest AI gainer today: design-quality assets for agents. |
| [freestylefly/awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) | JavaScript | — (+612) | "Prompt as Code" — 530+ reverse-engineered GPT-Image-2 cases, 20+ industrial templates, distilled into skills. Rode today's list on the GPT-Image-2 release. |
| [TauricResearch/TradingAgents](https://github.com/TauricResearch/TradingAgents) | Python | — (+367) | Multi-agent LLM financial trading framework with specialized agent roles. Back on trending as agentic finance heats up. |

### 🧠 LLMs / Training

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [unslothai/unsloth](https://github.com/unslothai/unsloth) | Python | 75,950 | Local UI to run and train LLMs and diffusion models — GGUF/MLX, Qwen3.8, DeepSeek-V4, MiniMax-H3, Gemma 4, FLUX. Tracks every new open-weight release within days. |
| [ray-project/ray](https://github.com/ray-project/ray) | Python | 43,759 | Distributed AI compute engine plus acceleration libraries. The foundational layer under scaled training and serving. |
| [rohitg00/ai-engineering-from-scratch](https://github.com/rohitg00/ai-engineering-from-scratch) | Python | 53,662 (+382) | "Learn it. Build it. Ship it" curriculum covering the full AI engineering stack. Trending today — education demand is tracking the harness/skills wave. |
| [AI4Finance-Foundation/FinGPT](https://github.com/AI4Finance-Foundation/FinGPT) | Jupyter Notebook | 21,230 | Open-source financial LLMs with trained weights on HuggingFace. Pairs directly with today's agentic-trading momentum. |
| [OpenPipe/ART](https://github.com/OpenPipe/ART) | Python | 10,707 | Agent Reinforcement Trainer: GRPO-based RL for multi-step agents (Qwen3.6, GPT-OSS, Llama). RL-for-agents is the training frontier's hottest direction. |
| [NVlabs/Sana](https://github.com/NVlabs/Sana) | Python | 9,020 | NVIDIA's linear-diffusion-transformer for efficient high-resolution image synthesis. An efficiency-first generative architecture worth tracking. |
| [jeinlee1991/chinese-llm-benchmark](https://github.com/jeinlee1991/chinese-llm-benchmark) | | 6,428 | Evaluates 374 models — gpt-5.4, Gemini-3.1-Pro, Claude-4.6, GLM-5.1, DeepSeek-V4, Kimi-K2.6 — plus a 2M-entry model defect database. A practical barometer of the multi-frontier landscape. |
| [areal-project/AReaL](https://github.com/areal-project/AReaL) | Python | 5,744 | "The RL bridge" for LLM-based agent applications, made simple and flexible. A second RL-for-agents signal in a single day's data. |

### 🔍 RAG / Knowledge

| Project | Lang | Stars (total / today) | Summary |
| :--- | :--- | ---: | :--- |
| [firecrawl/firecrawl](https://github.com/firecrawl/firecrawl) | TypeScript | 178,389 | Context API to search, scrape and interact with the web at scale. Turning raw web data into clean LLM context is now core infrastructure. |
| [f/prompts.chat](https://github.com/f/prompts.chat) | HTML | 169,804 | The original community prompt library, self-hostable for organizations. Still the canonical prompt knowledge base. |
| [Graphify-Labs/graphify](https://github.com/Graphify-Labs/graphify) | Python | 116,389 | Turns codebases, docs, SQL and PDFs into queryable knowledge graphs — deterministic AST parsing, "no vector store." A loud signal of graph-over-vector RAG sentiment. |
| [punkpeye/awesome-mcp-servers](https://github.com/punkpeye/awesome-mcp-servers) | | 94,709 | The directory of MCP servers. As MCP becomes connective tissue for agents, this catalog is the de-facto ecosystem index. |
| [siyuan-note/siyuan](https://github.com/siyuan-note/siyuani) | TypeScript | 46,244 | Privacy-first, self-hosted knowledge workspace where humans and AI agents collaborate. Note-taking tools are repositioning as agent workspaces. |
| [titanwings/distilly](https://github.com/titanwings/distilly) | TypeScript | 24,525 | Distills "how they think" into reusable Skills for any agent or bot. Knowledge capture is shifting from documents to executable skills. |

*\*"—" = total star count unavailable in today's trending feed; parentheses show today's new stars.*

---

## 3. Trend Signal Analysis

The dominant signal today is the **explosion of the agent "skills" economy**. [i-have-adhd](https://github.com/ayghri/i-have-adhd) (+4,624) is the day's top AI gainer, [diagram-design](https://github.com/cathrynlavery/diagram-design) (+2,286) second, [superpowers](https://github.com/obra/superpowers) (+690) and [text-to-cad](https://github.com/earthtojake/text-to-cad) extend skills into CAD/CAE/CAM, and ECC (+1,151 at 255k total) bundles skills with memory and security. Skills — drop-in expertise files for Claude Code, Codex and Cursor — are now the lowest-friction, highest-virality contribution format, with meme-native branding ([caveman](https://github.com/JuliusBrussee/caveman), 104,553 stars: "why use many token when few token do trick") driving adoption.

Second, vocabulary is consolidating around **"agent harness" and "loop engineering"** as named disciplines: ECC, PI-Desktop's "pi Agent Harness," [strands-agents/harness-sdk](https://github.com/strands-agents/harness-sdk), [HKUDS/DeepCode](https://github.com/HKUDS/DeepCode), and [superset-sh/superset](https://github.com/superset-sh/superset) orchestrating 100+ agents in parallel. A matching **token-economics middleware layer** is forming: rtk (60–90% cuts), headroom (60–95% on JSON), caveman (65%), and [codeburn](https://github.com/getagentseal/codeburn) tracking spend across 37 tools.

Model releases are clearly fueling this. [awesome-gpt-image-2](https://github.com/freestylefly/awesome-gpt-image-2) (+612, 530+ reverse-engineered prompts) rides the GPT-Image-2 launch; ollama's README fronts Kimi-K2.6, GLM-5.2, DeepSeek-V4 and MiniMax; the Chinese benchmark tracks gpt-5.4, Gemini-3.1-Pro and Claude-4.6 across 374 models. This multi-frontier market pushes model-agnostic tooling — [OmniRoute](https://github.com/diegosouzapw/OmniRoute) (352 providers, 1,200+ models) and [cc-switch](https://github.com/farion1231/cc-switch) — while Tencent's teamai-cli signals the enterprise team-adoption race. Vertical agentic apps (trading, PPT, MCP-native CAD editors) show skills diffusing beyond code.

---

## 4. Community Hot Spots

- **[affaan-m/ECC](https://github.com/affaan-m/ECC) — the harness meta.** 255k stars and +1,151/day make it the fastest-compounding repo in the dataset; its skills/memory/security architecture is the reference design others (superpowers, gentle-ai, agentic-awesome-skills' 2,115+ skill catalog) are building around.
- **Skills authorship as a contribution path.** i-have-adhd (+4,624) and diagram-design (+2,286) prove single-purpose, well-crafted agent skills can out-trend frameworks. Lowest barrier to entry in the current ecosystem.
- **The token-cost stack.** rtk + headroom + caveman + codeburn form a measure-then-compress workflow claiming 60–95% savings — worth benchmarking before adopting; this is where agent ROI gets decided.
- **Agentic finance.** TradingAgents, daily_stock_analysis, Vibe-Trading and FinGPT now form a complete LLM trading stack — the most cohesive vertical cluster in today's data.
- **The Chinese-language ecosystem.** awesome-gpt-image-2, superpowers-zh, TrendRadar and daily_stock_analysis show a fast-moving parallel community; expect continued cross-pollination (localization, prompt-engineering methods) into English-language tooling.

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*