# AI CLI Tools Community Digest 2026-09-12

> Generated: 2026-09-12 11:30 UTC | Tools covered: 7

- [Claude Code](https://github.com/anthropics/claude-code)
- [OpenAI Codex](https://github.com/openai/codex)
- [Gemini CLI](https://github.com/google-gemini/gemini-cli)
- [GitHub Copilot CLI](https://github.com/github/copilot-cli)
- [OpenCode](https://github.com/anomalyco/opencode)
- [Pi](https://github.com/earendil-works/pi)
- [Qwen Code](https://github.com/QwenLM/qwen-code)
- [Claude Code Skills](https://github.com/anthropics/skills)

---

## Cross-Tool Comparison

# AI CLI Tools Cross-Tool Comparison Report
**Date:** 2026-09-12 · **Scope:** Claude Code, OpenAI Codex, Gemini CLI, GitHub Copilot CLI, OpenCode, Pi, Qwen Code

---

## 1. Ecosystem Overview

The AI CLI coding-agent market has consolidated around seven actively maintained tools: five first-party vendor CLIs (Claude Code, Codex, Gemini CLI, Copilot CLI, Qwen Code) and two independent/provider-agnostic entrants (OpenCode, Pi). Competition has moved past core terminal-chat capability into ecosystem depth — plugin platforms, multi-agent orchestration, execution isolation, and metering transparency — while simultaneous new-model rollouts (GPT-6 Astra, Fable 5, Gemini 3, gpt-5.5) are stress-testing quota accounting and reliability across the board. Notably, desktop companion apps (not the CLI cores) are now the dominant source of hard regressions, and billing/quota trust incidents surfaced in four of seven communities in a single day. User switching costs are visibly dropping: communities openly benchmark tools against each other and demand feature parity (`/rewind`) and data portability.

---

## 2. Activity Comparison

| Tool | Issues (24h digest) | PRs (24h digest) | Discussions (24h) | Release status |
|---|---|---|---|---|
| **Claude Code** | 10 surfaced (top: 👍61; heavy stale-closing) | N/A¹ — no PR data returned | N/A¹ — none provided | ✅ v2.1.269 (`plugin eval`, `/output-style`) |
| **OpenAI Codex** | 10 surfaced (58/40/32-comment threads) | 10 (Command Center batch, personality retirement) | 10 (incl. 👍132 `/rewind` idea; 6 show-and-tell projects) | ✅ 2 releases (rust-v0.155.0-alpha.3.9/.10) |
| **Gemini CLI** | 10 surfaced (P1/P2 triaged) | 10 (security + reliability fixes) | N/A¹ — not in digest | ✅ v0.61.0-nightly (security-focused) |
| **GitHub Copilot CLI** | 21 updated (10 surfaced) | 0 — none updated (channel active) | N/A¹ — none provided | ✅ v1.0.84-5 (JSONL import, completions) |
| **OpenCode** | 10 surfaced (billing cluster) | 10 (7 open / 3 closed) | N/A¹ — not in digest | — none in 24h |
| **Pi** | 10 surfaced (incl. 78-comment thread) | 15 (10 + 5 honorable mentions) | 2 (show-and-tell; protocol gap) | — none in 24h |
| **Qwen Code** | 10 surfaced (priority-labeled) | 10 (features + fixes) | N/A¹ — not in digest | ✅ v0.23.3-nightly (refactor pass) |

> ¹ **N/A = channel disabled upstream or no data provided in the source digest — not counted as inactivity.** Counts reflect items surfaced in each 24h digest window, not full tracker totals. The only confirmed "true zero" is Copilot CLI's PR column ("no pull requests updated").

---

## 3. Shared Feature Directions

1. **Multi-agent orchestration — and its reliability debt** (5 tools). Codex is productizing it (Agent Command Center: token/credit estimates #44970, model grouping #44957, cross-app history #44969); OpenCode explicitly requests "Claude Code-style subagents" (#48612). But reliability lags: Gemini subagent hangs (#21409) and **false success after MAX_TURNS** (#22323), Qwen's TUI death on background-agent bursts (#11500), Claude Code's tmux orchestration blocked by safeguards (#84266).
2. **Persistent cross-session memory** (4 tools). OpenCode proposes first-class `/teach`//`/recall`//`/memory` (#48497); Copilot asks for cross-session context querying (#2436); Gemini ships Auto Memory but with secret-leakage (#26525) and retry-loop (#26522) hazards; Claude Code's persistent memory can be poisoned via localization (#85432). Redaction-before-context is the gating problem.
3. **Quota/cost transparency** (4 tools). Claude Code `cache_read` metering drift (#81234) and silent OAuth→Console-credit fallback (#86794); Codex's 👍161 request to permanently remove the 5-hour window (#34035) plus two-turn quota drain on GPT-6 Astra (#42987); OpenCode's broken payment-to-credit reconciliation (#37790, #48604); Copilot's Flex Tier cost-control ask (#4821).
4. **Plugin/extension platform maturity** (all 7). Claude Code ships reproducible **plugin eval with JSON/HTML reports**; Pi lands protocol-level extension mutation via mid-conversation system-message deltas (#9116/#9117); Qwen scopes extensions to workspace runtimes (#11086) and is **formally aligning its hook contract with Claude Code** (#11610); Codex grows SKILL.md→plugin converters (#44843); Copilot and OpenCode are still fixing basic skill/plugin semantics (#4438, #42409).
5. **MCP operational hardening** (5 tools). Dominant pain in Copilot CLI (OAuth redirect mismatch #4795, resume regression killing stdio connections #4753, missing cancellation #4759); OpenCode wants per-server TLS trust (#40111) and non-blocking discovery (#48630); Qwen's `.mcp.json` `${VAR}` non-expansion (#11499); Gemini enforces fail-closed MCP policy (#29200); Codex hit an MCP regression on a stable bump (#37567). Pattern: MCP is functional everywhere, operationally fragile everywhere.
6. **Windows/desktop parity** (4 tools). Codex's WSL project breakage is the day's top issue (#41290, 👍48); Claude Code's MSIX/GPU crashes; Pi's Windows meta-issue (#7547) plus shell-discovery fixes (#9501/#9504); Qwen's Windows MCP failure (#9693).
7. **Token-frugal context management** (4 tools). Gemini's surgical read hierarchy (~36.6k tokens/turn baseline today, #19561) and AST-aware tooling epic (#22745); Qwen's cache-preserving deferred tools (#10410) and manual compression (#11700); Claude Code's inconsistent compaction windows (#85205); Codex's context snapshot rendering unification (#44976).

---

## 4. Differentiation Analysis

- **Claude Code** — Deeper on **plugin QA as a product surface** (`claude plugin eval`) and output-style consistency across remote/cloud surfaces. Closed-source binary; the repo is an issue tracker. Weakest spots: Fable 5 safeguard false positives on legitimate security work (4+ issues), billing opacity, localization quality.
- **OpenAI Codex** — Highest internal engineering velocity; building an **agent operations dashboard** (Command Center) and deliberately *reducing* surface area (retiring Friendly/Pragmatic personalities in favor of literal instruction templates). Rust CLI with alpha churn; desktop app is its regression epicenter. Most exposed to quota-policy community pressure.
- **Gemini CLI** — The **security-first posture** tool: sandbox filesystem hardening across Docker/Podman/runsc/LXC/Seatbelt plus indirect prompt-injection defense shipped in one nightly. Research-driven context efficiency (AST epic). Open source with disciplined P1/P2 triage.
- **Copilot CLI** — Making the **interoperability bet**: semantic JSONL session/memory interchange for portable migration across tools — a potential standard play. Weakest 24h velocity (0 merged PRs visible); prereleases shipping faster than regressions are triaged (#4753, #4826).
- **OpenCode** — **Provider-agnostic multi-model** routing (Kimi K3, DeepSeek, Requesty, Zen) but monetization infrastructure is immature (billing reconciliation outage is the day's top cluster). A feature follower on subagents/memory; leads on accessibility (screen readers, RTL/Arabic).
- **Pi** — Deepest **protocol-level innovation**: mid-conversation system-message deltas solve what other tools hack around with full system-prompt rewrites; broadest provider abstraction (Bedrock Mantle, Vertex metadata, cache-key compat, cross-family usage normalization #9489). RPC mode is spawning third-party products (web-agent). Small but unusually high signal-to-noise, incl. stacked architectural PRs from an external core contributor.
- **Qwen Code** — Boldest architectural bet: **separating the agent harness from the execution environment** with credential isolation and a swappable executor backend (Alibaba Cloud reference, #11695–#11698). Explicit compatibility strategy toward Claude Code conventions (hook contract #11610). Multi-surface: daemon, web shell, Android companion, macOS Computer Use.

**Target-user split:** subscription-locked professional devs (Claude, Codex), enterprise/security-conscious OSS (Gemini), GitHub-native shops (Copilot), BYO-model/route-for-cost users (OpenCode, Pi, Qwen).

---

## 5. Community Momentum & Maturity

- **Engagement leaders:** **Codex** (👍161 quota issue, 👍132 `/rewind` discussion, 58-comment WSL thread, and the richest third-party ecosystem — 6 show-and-tell tools incl. `isitdone`, CoCo, Wayfinder) and **Claude Code** (issue IDs in the 93k range imply the largest cumulative tracker; today's top issue at 👍61).
- **Velocity leaders:** Codex (10 PRs + 2 releases/day), Gemini (10 PRs + security release), Qwen (10 PRs + nightly), Pi (15 PRs, incl. a stacked series from a notable external contributor).
- **Rapid iteration is near-universal** — nightly/alpha channels at Gemini, Qwen, Codex; Claude at v2.1.269 point-release cadence; Copilot on rapid prerelease dash-versions — but Copilot shows the risk of speed without triage capacity (two fresh regressions in consecutive prereleases).
- **Size ≠ trust:** the two largest communities (Claude, Codex) also carry the loudest trust complaints (billing, safeguards, quota). **Pi** is the smallest but most architecturally ambitious; **Qwen** shows the most structured governance (tracking umbrellas, priority labels, needs-discussion states); **OpenCode** has an engaged but currently alienated base (payment failures); **Copilot CLI** reads as support-load-driven with little visible community engineering output today.

---

## 6. Trend Signals

1. **Metering transparency becomes a purchase criterion.** Billing/quota incidents hit four tools in one day; Codex shipping per-task credit/USD estimates (#44970) signals dashboards becoming table stakes. *For devs: demand usage exports and reconciliation APIs before committing spend.*
2. **Safety classifiers need an "authorized security work" lane.** False positives on WAF code, credential rotation, and audit documentation (Claude Fable 5 cluster; Copilot #4065) are pushing security professionals to workarounds. Expect audit modes / policy profiles to emerge as a differentiator.
3. **Agent telemetry integrity now matters as much as capability.** False "success" reporting (Gemini #22323), silent crashes (Qwen #11500), and no-error hangs (Pi #4945, 78 comments) directly undermine autonomous-agent adoption; observability PRs are rising across Codex, Pi, and Copilot.
4. **Consolidation around Claude Code conventions + portability pressure.** Qwen formally aligning its hook contract (#11610), Codex users citing Claude/OpenCode for `/rewind`, and Copilot's JSONL interchange all lower switching costs — expect feature-parity pressure to intensify and interchange formats to become strategic.
5. **Execution isolation is the enterprise differentiator.** Gemini's multi-runtime sandbox hardening and Qwen's harness/executor split with credential isolation point to sandboxing as the 2027 procurement checkbox.
6. **Context economics drive architecture.** With quota amplification on new models, token-frugal reads (AST-awareness, surgical read hierarchies, prompt-cache preservation) are now cost engineering, not polish.
7. **New-model rollouts stress the CLIs, not just the models.** GPT-6 Astra's `invalid_prompt` on trivial inputs, Fable 5's over-strictness, and gpt-5.5 streaming hangs land in CLI issue trackers — CLI vendors increasingly wear the blame for model-side behavior.
8. **Desktop apps are the regression frontier; TUI cores are stabilizing** (worst TUI issues today are flicker-level; the hard crashes are Electron/MSIX/Tauri/AppImage surfaces).

**Bottom line for decision-makers:** evaluate on three axes — *interoperability* (interchange formats, hook/MCP contracts), *observability* (usage, telemetry, cost), and *isolation* (sandboxing, credential separation) — and avoid deep lock-in while these contracts are still consolidating.

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report

**Data source:** github.com/anthropics/skills (data as of 2026-09-12)
**Repository:** Official Claude Code Skills collection

---

## 1. Top Skills Ranking (Most-Watched PRs)

Although comment counts on PRs were not exposed in the data, ranking by cross-references to high-comment issues, recency, and topical reach yields the following most-watched Skill submissions:

### 1. skill-creator Reliability Fixes (PR #1298)
**Author:** MartinCajiao | Status: OPEN
**Functionality:** Patches the foundational `skill-creator` evaluation harness — `run_eval.py` was reporting 0% recall for every skill description due to broken trigger detection, missing artifact installation, and Windows stream-reading bugs.
**Discussion highlights:** Directly resolves the long-standing issue [#556](https://github.com/anthropics/skills/issues/556) with 10+ independent reproductions. Because `run_loop.py` and `improve_description.py` consume this signal, the entire description-optimization loop was optimizing against noise.
**Link:** https://github.com/anthropics/skills/pull/1298

### 2. Skill Quality & Security Analyzers (PR #83)
**Author:** eovidiu | Status: OPEN
**Functionality:** Two meta-skills that evaluate other skills across five dimensions (structure, security, performance, maintainability, usability). Adds a `skill-security-analyzer` covering prompt-injection, data exfiltration, and privilege-escalation patterns.
**Discussion highlights:** Among the earliest third-party meta-skills proposed; addresses the community's growing need for automated Skill vetting before publishing.
**Link:** https://github.com/anthropics/skills/pull/83

### 3. frontend-design Skill Rewrite (PR #210)
**Author:** justinwetch | Status: OPEN
**Functionality:** Rewrites the `frontend-design` skill to make every instruction concretely actionable within a single conversation, replacing aspirational guidance with executable steps.
**Discussion highlights:** Tackles one of the most-used skills in the official collection; represents a major clarity upgrade for high-traffic UI generation workflows.
**Link:** https://github.com/anthropics/skills/pull/210

### 4. document-typography Skill (PR #514)
**Author:** PGTBoos | Status: OPEN
**Functionality:** Typographic QC for AI-generated documents — prevents orphan word wrap (1–6 words spilling onto the next line), widow paragraphs, and numbering misalignment.
**Discussion highlights:** Targets a problem "every document Claude generates" suffers from; framed as a universal quality layer for any document-producing skill.
**Link:** https://github.com/anthropics/skills/pull/514

### 5. Hivemind — Multi-Agent Orchestration (PR #1628)
**Author:** Hanishchow | Status: OPEN
**Functionality:** Delegates mechanical work from Claude Code to headless opencode workers running on free models; Claude Code remains the sole planner, reviewer, and merger.
**Discussion highlights:** Reframes cost-model thinking around context as the scarce resource; positions orchestration as a first-class Skill category rather than a framework.
**Link:** https://github.com/anthropics/skills/pull/1628

### 6. self-audit Quality Gate (PR #1367)
**Author:** YuhaoLin2005 | Status: OPEN
**Functionality:** Two-stage output audit — mechanical file-existence verification first, then four-dimension reasoning audit in damage-severity priority order. Model- and stack-agnostic.
**Discussion highlights:** Follows proposal Issue [#1385](https://github.com/anthropics/skills/issues/1385); represents the community's emerging "delivery verification" pattern.
**Link:** https://github.com/anthropics/skills/pull/1367

### 7. ODT / OpenDocument Skill (PR #486)
**Author:** GitHubNewbie0 | Status: OPEN
**Functionality:** Creates, fills, reads, and converts OpenDocument files (.odt/.ods) including template filling and ODT→HTML conversion. Triggers on mentions of "ODT," "ODF," "LibreOffice document."
**Discussion highlights:** Fills a clear gap for ISO-standard / open-source document formats outside the Microsoft Office ecosystem.
**Link:** https://github.com/anthropics/skills/pull/486

### 8. scnet-hpc Skill (PR #1615)
**Author:** lql341 | Status: OPEN
**Functionality:** Profile-based SSH + Slurm workflows for SCNet HPC clusters — connection, partition, memory, module, and accelerator guidance plus automated job generation.
**Discussion highlights:** Example of domain-specific Skills targeting scientific-computing users; template for other HPC/cloud clusters.
**Link:** https://github.com/anthropics/skills/pull/1615

---

## 2. Community Demand Trends (from Issues)

Distilled from the 15 most-commented Issues:

| Theme | Evidence | Implication |
|---|---|---|
| **Trust & Security Boundaries** | [#492](https://github.com/anthropics/skills/issues/492) (43 comments) — community skills impersonating `anthropic/` namespace; [#1175](https://github.com/anthropics/skills/issues/1175) — permissions in SKILL.md | Strongest signal: needs a verified-publisher / namespace-isolation mechanism |
| **Org-level Distribution** | [#228](https://github.com/anthropics/skills/issues/228) (16 comments) — manual .skill-file sharing via Slack | Demand for native skill libraries / share links inside Claude.ai |
| **Reliability of skill-creator** | [#556](https://github.com/anthropics/skills/issues/556) (12 comments) — 0% trigger rate; [#62](https://github.com/anthropics/skills/issues/62) — skills disappearing | Eval harness must be production-trustworthy before self-improvement loops scale |
| **Memory & State Compaction** | [#1329](https://github.com/anthropics/skills/issues/1329) (9 comments) — symbolic notation for agent state | Long-running agent memory is a recognized gap |
| **Plugin Packaging Hygiene** | [#189](https://github.com/anthropics/skills/issues/189) — `document-skills` and `example-skills` ship identical content | Needs deduplication / clearer plugin partitioning |
| **Context-Efficient Skill Loading** | [#1487](https://github.com/anthropics/skills/issues/1487) — `claude-api` injects ~156k tokens in one call | Demand for lazy / on-demand loading of reference material |
| **Skills as MCP Servers** | [#16](https://github.com/anthropics/skills/issues/16) — expose skills via MCP protocol | Pattern convergence: Skills ↔ MCP unification |
| **Platform Compatibility** | [#29](https://github.com/anthropics/skills/issues/29) — Bedrock; [#1390](https://github.com/anthropics/skills/issues/1390) — MCP eval scores 0/N | Skills must reach beyond Claude Code's default runtime |
| **Quality-Gate Pipelines** | [#1385](https://github.com/anthropics/skills/issues/1385) — pre-task → adversarial review → delivery verification | Community is formalizing "reasoning quality" as a Skill category |

---

## 3. High-Potential Pending Skills (Active PRs likely to land)

These PRs are recent, address well-documented bugs referenced by popular Issues, and have clear scope:

| PR | Skill / Fix | Why it will likely merge | Link |
|---|---|---|---|
| **#1298** | skill-creator eval artifact install + Windows stream fix | Closes [#556](https://github.com/anthropics/skills/issues/556) and resolves a multi-platform blocker for description-optimization loops | https://github.com/anthropics/skills/pull/1298 |
| **#1742** | mcp-builder `mcp>=2` streamable_http_client + custom headers | Unblocks all users on the current MCP SDK version | https://github.com/anthropics/skills/pull/1742 |
| **#1724** | mcp-builder default model → claude-sonnet-5 | Routine freshness update for evaluation harness | https://github.com/anthropics/skills/pull/1724 |
| **#1734** | Detect orphaned DOCX comments | Small, scoped, correctness fix in high-traffic document skill | https://github.com/anthropics/skills/pull/1734 |
| **#1607** | Mark four retired Claude model IDs | Doc-only update tied to issue [#1603](https://github.com/anthropics/skills/issues/1603) | https://github.com/anthropics/skills/pull/1607 |
| **#538** | PDF case-sensitive file references | Trivial but breaks entire PDF skill on Linux | https://github.com/anthropics/skills/pull/538 |
| **#541** | DOCX tracked-change `w:id` collision | Prevents document corruption — high impact, clear root cause | https://github.com/anthropics/skills/pull/541 |
| **#539** | skill-creator YAML unquoted-description validation | Catches a class of silent failures; pre-parse hook is non-invasive | https://github.com/anthropics/skills/pull/539 |
| **#1099 / #1050** | skill-creator Windows subprocess + encoding | Restores Windows parity — required for non-Mac evaluation coverage | [#1099](https://github.com/anthropics/skills/pull/1099) · [#1050](https://github.com/anthropics/skills/pull/1050) |

---

## 4. Skills Ecosystem Insight

> **The community's most concentrated demand is for a trustworthy Skill lifecycle — verified publishing, namespace integrity, deterministic evaluation harnesses, and on-demand context loading — i.e. the "meta-Skills" plumbing that lets the rest of the catalog scale safely.**

---

### Methodology notes
- PR comment counts were not exposed in the source dataset (`Comments: undefined`); PR ranking therefore used issue cross-references, recency, and topical breadth as engagement proxies.
- Issue ranking used the 43 / 16 / 12 / 10 / 9 / 8 / 6 / 6 / 4 / 4 / 4 / 4 / 4 / 4 / 3 comment counts explicitly available.
- All status flags reflect the snapshot date 2026-09-12.

---

# Claude Code Community Digest — 2026-09-12

## Today's Highlights

Today's release **v2.1.269** ships two notable additions: a new `claude plugin eval` command for running reproducible plugin evaluation suites with JSON/HTML reports, and `/output-style [name]` for listing and switching output styles — including over Remote Control and in cloud environments. The issue tracker shows heavy activity around Windows Desktop stability, false-positive security safeguards, and recurring OAuth/quota metering concerns, while the top-voted open request (#48805) for terminal font customization in the desktop app signals continued demand for UI personalization.

---

## Releases

### [v2.1.269](https://github.com/anthropics/claude-code/releases/tag/v2.1.269)
- **`claude plugin eval`** — Run a plugin's eval suite against Claude Code and receive scored, reproducible results in JSON + HTML. See `claude plugin eval --help`.
- **`/output-style [name]`** — List and switch output styles, including over Remote Control and in cloud/ot... (truncated in source).

---

## Hot Issues

1. **[#48805] Terminal font family setting in desktop app** — *closed, enhancement*
   Highly upvoted (👍 61, 12 comments) feature request to let users customize the terminal font family inside the Code tab of Claude Desktop. The codebase already loads external fonts, so this is largely a settings-UI gap. ([link](https://github.com/anthropics/claude-code/issues/48805))

2. **[#66077] Claude in Chrome: save screenshots to local filesystem** — *open, enhancement*
   Currently screenshots are stuck in-browser; the request is to write them to disk during a session so they can be diffed, archived, or fed back into tools. (👍 14, 9 comments) ([link](https://github.com/anthropics/claude-code/issues/66077))

3. **[#81234] Max 20x weekly quota drained 53% in 2 days** — *closed, stale, bug*
   A Max 20x subscriber shows their weekly quota draining far faster than transcript accounting suggests, pointing at `cache_read` metering as the suspected cause. Useful case study on usage accounting transparency. (👍 2, 6 comments) ([link](https://github.com/anthropics/claude-code/issues/81234))

4. **[#93667] Keep IDE selection indicator in footer instead of inline prompt** — *open, enhancement*
   A direct response to the v2.1.268 footer refactor: the requester wants the previous footer location of the editor/`/diff` selection indicator restored as an option. (👍 8, 5 comments) ([link](https://github.com/anthropics/claude-code/issues/93667))

5. **[#86016] Session frozen after inter-session message send (Windows)** — *closed, stale, bug*
   After sending a message between sessions, the target session stays in `isRunning:true` and never responds. Distinct from other freezing reports. (5 comments) ([link](https://github.com/anthropics/claude-code/issues/86016))

6. **[#80751] Pluggable Context Manager with Intelligent Context Retrieval** — *closed, stale, enhancement*
   Proposes a pluggable context layer so long-running sessions can intelligently fetch/evict context rather than relying solely on compaction. Conceptually aligned with the `claude plugin eval` direction. (5 comments) ([link](https://github.com/anthropics/claude-code/issues/80751))

7. **[#85432] German-language Claude Code corrupts technical terminology** — *closed, stale, bug*
   Translation of canonical terms (Gate→Zaun, Policy→Politik, Root→Wurzel) breaks semantic drift and pollutes persistent memory. A reminder that localized mode still has rough edges for engineers. (4 comments) ([link](https://github.com/anthropics/claude-code/issues/85432))

8. **[#86794] Silent OAuth → legacy API credential fallback drains Console credits** — *closed, stale, bug*
   When claude.ai OAuth expires, Claude Code silently reverts to leftover legacy credentials and continues to bill Console credits — without prompting re-auth or warning the user. Cost/billing integrity concern. (3 comments) ([link](https://github.com/anthropics/claude-code/issues/86794))

9. **[#84266] `model_refusal_fallback` repeatedly fires on legitimate tmux orchestration** — *closed, stale, bug*
   The cyber classifier trips on innocuous tmux-based multi-session launches even with `switchModelsOnFlag: false`, blocking the coordinator session. Recurring pattern with the new Fable 5 safeguards. (3 comments) ([link](https://github.com/anthropics/claude-code/issues/84266))

10. **[#81320] `${CLAUDE_PLUGIN_ROOT}` doesn't resolve in plugin `settings.json`** — *open, documentation, reproduced*
    Plugins that ship a `subagentStatusLine` script cannot reference it from their own settings because `CLAUDE_PLUGIN_ROOT` isn't substituted inside plugin-merged settings. Documented behavior gap. (2 comments) ([link](https://github.com/anthropics/claude-code/issues/81320))

---

## Key PR Progress

*No pull request data was returned for the last 24h — section omitted.*

---

## Hot Discussions

*No discussion data was provided in this dataset — section omitted.*

---

## Feature Request Trends

1. **UI/TUI personalization** — Terminal font family (#48805), IDE selection indicator placement (#93667), Auto theme palette parity with explicit Light/Dark (#75586), macOS Finder drag-and-drop fidelity (#86833).
2. **Local-first file & screenshot output** — Claude-in-Chrome screenshots saved to disk (#66077); consistent theme rendering across surfaces.
3. **Plugin ecosystem maturity** — `claude plugin eval` (now shipping), `${CLAUDE_PLUGIN_ROOT}` substitution (#81320), pluggable context managers (#80751).
4. **Output-style control everywhere** — `/output-style` over Remote Control / cloud sessions (released in v2.1.269) reflects a broader ask for consistent customization across surfaces.
5. **Defensive-security & audit workflows** — Multiple requests for an explicit "this is a security audit / defensive work" mode so Fable 5's dual-use safeguards stop firing (#86804, #86835, #86820, #84266).
6. **Cross-platform parity** — Windows MSIX GPU crashes (#68049, #89525), WSL/Linux sandbox on Windows (#91028), Remote-SSH SSE rendering (#86854).

---

## Developer Pain Points

- **Security safeguard false positives on legitimate work** — The most clustered theme: WAF detection code, credential rotation, reverse-shell documentation, and even tmux orchestration are repeatedly misclassified, forcing model switches or session blocks. Fable 5 appears to be especially strict.
- **Session & state instability** — Sessions stuck in `isRunning:true` after cross-session messages, effort levels changing without user input (#86850), classifiers ignoring instructions (#86846). Erodes trust in long-running automation.
- **Cost/billing opacity** — Silent OAuth→legacy credential fallback draining Console credits (#86794), and `cache_read` accounting inconsistencies draining weekly quotas (#81234). Developers can't reconcile what they did with what they were billed for.
- **Windows Desktop pain** — ARM64 GPU crashes (#68049), 107s macOS keychain beachball (#76079), crash-dump destruction (#89525), Linux sandbox startup failures (#91028), and destructive sidebar-group writes (#86843). The MSIX bundle is the worst-affected surface.
- **Plugin & config ergonomics** — Unresolved variables in plugin settings (#81320), `CLAUDE_CONFIG_DIR` not isolating `~/.claude/CLAUDE.md` (#86837), `claude-api` payload duplication forcing compaction (#86817).
- **Localization quality** — German mode mistranslating canonical technical terms and poisoning persistent memory (#85432) suggests non-English dev workflows still hit rough edges.
- **Compaction-window inconsistencies** — Same `claude-opus-5[1m]` model id showing 150k vs 1M auto-compact windows across sessions (#85205), undermining predictable context behavior.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-12

## Today's Highlights
Activity in the `openai/codex` repository over the last 24 hours is dominated by **Windows Desktop regressions** (WSL project handling, `app-server` lifecycle, Computer Use staging) and a wave of **GPT-6 Astra reliability reports** ranging from prompt rejection to 5-hour quota drain in two turns. On the engineering side, an unusually dense batch of internal PRs advances the **Agent Command Center** (token/usage estimates, model grouping, cross-app read-only history) while formally retiring the **Friendly / Pragmatic personality selector** in favor of literal model instruction templates.

## Releases
Two consecutive alpha patches of the Rust CLI were published in the last 24 hours:

- **rust-v0.155.0-alpha.3.9** — [Release notes](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.9)
- **rust-v0.155.0-alpha.3.10** — [Release notes](https://github.com/openai/codex/releases/tag/rust-v0.155.0-alpha.3.10)

Release notes are minimal ("Release 0.155.0-alpha.3.x"), consistent with the Rust CLI's frequent alpha churn ahead of a stable 0.155.

## Hot Issues

1. **[#41290] [Windows][WSL] Project creation and removal fail after switching Agent Environment to WSL** — 58 comments, 👍 48. Highest-traffic issue of the day; users cannot create or remove projects after toggling WSL. [Link](https://github.com/openai/codex/issues/41290)
2. **[#34035] Make the temporary removal of the 5-hour usage limit permanent** — 28 comments, 👍 161. The most upvoted issue in the entire backlog; community strongly favors codifying the July 2026 suspension into a permanent change for Plus/Pro/Business. [Link](https://github.com/openai/codex/issues/34035)
3. **[#25271] Computer Use cannot determine Chrome URL on Windows, even on `chrome://newtab/`** — 40 comments, 👍 9. Long-standing browser-automation regression that continues to block Computer Use flows on Windows. [Link](https://github.com/openai/codex/issues/25271)
4. **[#44720] ChatGPT hit a snag bug reproduce** — 32 comments, 👍 6 (now closed). Renderer crash on `26.908.31457` affecting macOS Pro users. [Link](https://github.com/openai/codex/issues/44720)
5. **[#25744] Codex for macOS accumulates Computer Use / MCP helper processes and unreaped zombie children** — 23 comments, 👍 4. Resource leak causing HID lag and WindowServer/TCC stalls; a systemic macOS agent-runtime problem. [Link](https://github.com/openai/codex/issues/25744)
6. **[#42853] GPT-6 Astra missing from model picker for eligible ChatGPT Pro account** — 22 comments, 👍 4. Eligible Pro users cannot select the newest flagship model on Windows. [Link](https://github.com/openai/codex/issues/42853)
7. **[#42987] GPT-6 Astra Medium depleted 100% of Plus 5-hour quota in two short turns** — 18 comments, 👍 13. Concrete complaint illustrating the quota-amplification problem attached to the new model. [Link](https://github.com/openai/codex/issues/42987)
8. **[#42501] [Windows] 26.901.1978.0 fails to launch UI when `cua_node` staging cannot copy `node_repl.exe`** — 17 comments, 👍 3. Computer Use runtime packaging bug that silently breaks the Windows UI. [Link](https://github.com/openai/codex/issues/42501)
9. **[#44102] Windows Desktop 26.903.61454: follow-up messages cannot be sent after the first completed turn** — 13 comments. A critical UX regression rendering the desktop client unusable after one turn. [Link](https://github.com/openai/codex/issues/44102)
10. **[#40231] Windows: app-server killed with `STATUS_CONTROL_C_EXIT` (0xC000013A) mid command execution; regressed in 26.818.5229** — 12 comments. A previously-fixed shell-kill regression has reappeared; agent turns die minutes in. [Link](https://github.com/openai/codex/issues/40231)

## Key PR Progress

1. **[#44970] Show task tokens and usage estimates in the agent command center** — Adds input/output token counts plus estimated credits and USD to task details, with live totals preferred over breakdowns. [Link](https://github.com/openai/codex/pull/44970)
2. **[#44957] Add model grouping to the agent command center** — `Ctrl+S` now cycles grouping through project / status / model, surfacing the active grouping in the footer. [Link](https://github.com/openai/codex/pull/44957)
3. **[#44969] Open tasks managed elsewhere as read-only history in the command center** — Falls back to a frozen snapshot when a task belongs to another app server, unblocking cross-device history viewing. [Link](https://github.com/openai/codex/pull/44969)
4. **[#44976] Make context snapshot text rendering consistent** — Unifies instruction rendering between request settings and Responses Lite developer content; `rewrite_known_segments` now emits plain tags for known guidance. [Link](https://github.com/openai/codex/pull/44976)
5. **[#44946] Retire Friendly and Pragmatic personality selection** — Personality templates removed; bundled model presets now report `supports_personality: false`. [Link](https://github.com/openai/codex/pull/44946)
6. **[#44935] Remove personality selection from the TUI** — Drops the `/personality` command, popup, and persistence layer; turns no longer carry a personality override. [Link](https://github.com/openai/codex/pull/44935)
7. **[#44945] Route TUI Windows sandbox setup through the app server** — Switches to `windowsSandbox/setupStart` and gates the sandbox mode on app-server readiness. [Link](https://github.com/openai/codex/pull/44945)
8. **[#44944] Enforce managed provider requirements on existing app-server threads** — Re-validates retained `model_provider` against current managed requirements, preventing stale configs. [Link](https://github.com/openai/codex/pull/44944)
9. **[#44952] Keep voice captions visible across speaker updates and history handoff** — Fixes captions disappearing during queued history insertion and animation races between speakers. [Link](https://github.com/openai/codex/pull/44952)
10. **[#44942] Clarify the Windows Visual C++ runtime notice for voice packages** — Names `bin/vcruntime140.dll`, adds license/redistributable links and a dedicated section in release notes. [Link](https://github.com/openai/codex/pull/44942)

## Hot Discussions

**Ideas**
- **[#9618] How is there not a `/rewind` or `/revert` feature?** — 23 comments, 👍 132. The single most popular Codex discussion of the period; users explicitly compare the missing feature unfavorably to Claude Code and OpenCode and argue it is essential unless every change is committed. [Link](https://github.com/openai/codex/discussions/9618)
- **[#27754] Experiment: a Codex plugin for reusable project guidance maps in `AGENTS.md`** — A community plugin that generates and refreshes a compact action map for future Codex sessions. [Link](https://github.com/openai/codex/discussions/27754)

**General**
- **[#45013] Codex review DONT subscribe wasting money** — Fresh user report comparing Codex and Claude on the same real workflow; claims an ~8× larger conversation ran on Claude without quota frustration. [Link](https://github.com/openai/codex/discussions/45013)
- **[#40132] What are you building with Codex?** — Lightweight community thread for newcomers to share workflows and tips. [Link](https://github.com/openai/codex/discussions/40132)

**Show and tell**
- **[#44153] `isitdone`: Stop hook that blocks "done" until tests/typecheck/lint pass** — `npx isitdone init --agent codex` writes `.codex/hooks.json` and re-runs repo checks on the working tree before allowing Codex to stop. [Link](https://github.com/openai/codex/discussions/44153)
- **[#44643] CoCo: Codex Coordinator for parallel work across terminals and repositories** — Named workspaces, resume, and monitoring across multiple Codex runs. [Link](https://github.com/openai/codex/discussions/44643)
- **[#33807] Codebase Argus: a read-only Codex CLI review boundary on a real PR** — Deterministic checks and coding agents share the same PR evidence; demonstrates how a long review packet can inherit local user context. [Link](https://github.com/openai/codex/discussions/33807)
- **[#44618] Wayfinder: trace Codex work as a visual voyage map** — Local-first desktop app producing a visual history of how a project reached its result. [Link](https://github.com/openai/codex/discussions/44618)
- **[#44291] Brain Scanner: see what calls a shared helper before Codex changes it** — A project map Codex can query mid-session, with a worked example on `p-limit`. [Link](https://github.com/openai/codex/discussions/44291)
- **[#44843] SKILL.md → Codex plugin bundle converter (MIT, stdlib-only)** — Enforces the upload hard constraints (≤1024 description, reserved namespace) when packaging `SKILL.md` folders into Codex plugin manifests. [Link](https://github.com/openai/codex/discussions/44843)

## Feature Request Trends
- **Session-level undo**: `/rewind` or `/revert` is the clear leader, with 132 👍 and active comparison threads against Claude Code / OpenCode. ([#9618])
- **Permanent relaxation of the 5-hour usage window** for Plus/Pro/Business while preserving weekly allowance. ([#34035])
- **Safer TUI exit semantics**: double-press `Ctrl+C` confirmation mirroring Claude Code. ([#14708])
- **Evidence-backed completion reporting**: structured mapping from requirements → observable evidence at task end. ([#36718])
- **Reliable Computer Use on Windows**: URL detection, MCP/computer-use staging, and Chrome extension RPC keep re-regressing.
- **Subagent transparency**: per-agent model + reasoning effort in the Subagents panel. ([#32283])
- **Smarter quota accounting for GPT-6 Astra Medium**: prompts like "hi" are returning `invalid_prompt` and small sessions are draining full quotas. ([#43237], [#42987], [#44700])
- **Plugin / marketplace tooling**: manifest converters, marketplace indexes, and constrained `description` enforcement. ([#44843])

## Developer Pain Points
- **Windows Desktop instability**: The same root causes — `app-server` lifecycle, `cua_node` staging, sandbox elevation, World-writable scans, and WSL project creation — keep re-regressing across point releases (26.825 → 26.901 → 26.903). Affected issues: #41290, #42501, #42853, #42987, #43628, #44102, #40231, #44697, #34182.
- **GPT-6 Astra unpredictability**: Inconsistent prompt acceptance (`invalid_prompt` on trivial inputs), excessive quota consumption, and missing model entries on eligible Pro accounts. Affected issues: #42853, #42987, #43237, #44184, #44700.
- **macOS renderer / agent-runtime crashes**: `r is not a function` circular-import blank windows and long-running session zombie processes are the most-cited macOS pain. Affected issues: #25744, #36946, #44434, #44743.
- **Linux startup crash**: `AppRoutes TypeError: n is not a function` on Debian 13 with the 26.908.31748 package. ([#44785])
- **CLI reliability on Windows**: 63.8 MB image-history requests, WebSocket fallback that the idle watchdog still trips, and `STATUS_CONTROL_C_EXIT` mid-shell. Affected issues: #40231, #43015, #43022, #44884.
- **MCP regressions on stable bumps**: The Qonto MCP broke moving from 0.146.0 → 0.147.0 with no cached tools, signaling fragile init paths in shipped CLIs. ([#37567])
- **Quota-cost transparency**: Independent users report Codex Pro + review feel expensive relative to Claude; cost dashboards and per-task credit/USD estimates (now landing via #44970) are increasingly demanded. ([#45013])

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-12

## Today's Highlights

The 2026-09-12 nightly release `v0.61.0-nightly.20260912.g9c1b0a610` ships two critical security fixes: hardening sandbox filesystem boundaries (#29283/#29214) and preventing indirect prompt injection through build-file manipulation and untrusted flags (#29250). A flurry of recently merged PRs also addresses a long-standing terminal-flickering bug, MCP policy enforcement, OAuth credential persistence, and state-update re-entrancy — indicating the maintainers are tightening the reliability and security posture ahead of a stable 0.61 release.

## Releases

**v0.61.0-nightly.20260912.g9c1b0a610** ([#29291](https://github.com/google-gemini/gemini-cli/pull/29291))
- **Security (core)**: Prevent indirect prompt injection via build-file modifications and untrusted CLI flags. Refactors `shell`, `edit`, and `write_file` paths to validate against workspace boundaries under restricted-workspace mode. — [PR #29250](https://github.com/google-gemini/gemini-cli/pull/29250)
- **Sandbox**: Harden filesystem mount boundaries and isolate runtime state across Docker, Podman, runsc, LXC, and macOS Seatbelt; sandbox now runs with read-only config access and write-ephemeral runtime state. — [PR #29283](https://github.com/google-gemini/gemini-cli/pull/29283) / [PR #29214](https://github.com/google-gemini/gemini-cli/pull/29214)

## Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323)** — *Subagent recovery after MAX_TURNS reports as success (13 comments)*. P1 bug where `codebase_investigator` logs `status: "success"` / `Termination Reason: "GOAL"` even after hitting the turn limit, masking interruptions. High-impact because it breaks trust in agent telemetry and recovery logic.

2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873)** — *Zero-Dependency OS Sandboxing & Post-Execution Intent Routing (9 comments)*. P2 enhancement leveraging Gemini 3's native bash affinity (`grep`/`cat`/`sed`/`awk`) while preserving security UX. Strategic direction for model-aligned tooling.

3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409)** — *Generalist agent hangs indefinitely (8 comments, 👍8)*. P1 — deferring to the generalist subagent causes multi-hour hangs on simple tasks like folder creation. Users report instructing the model *not* to defer is the only workaround.

4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745)** — *AST-aware file reads, search, and mapping (7 comments)*. EPIC to evaluate whether AST tools (e.g., tilth, glyph) can reduce token noise and turn counts vs. blind `read_file`.

5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968)** — *Gemini rarely invokes skills or sub-agents autonomously (6 comments)*. Anecdotal but recurring complaint — explicit instructions work, otherwise the model ignores custom skills/agents.

6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525)** — *Add deterministic redaction to Auto Memory (5 comments)*. P2 security bug — secrets enter model context before the extraction agent can redact; skill content also leaks via logging.

7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166)** — *Shell stuck on "Waiting input" after command completes (4 comments, 👍3)*. P1 — TUI shell exec appears active even after the child process finishes, blocking further work.

8. **[#26522](https://github.com/google-gemini/gemini-cli/issues/26522)** — *Auto Memory retries low-signal sessions indefinitely (4 comments)*. Low-signal sessions are never marked processed and resurface repeatedly, wasting tokens.

9. **[#20079](https://github.com/google-gemini/gemini-cli/issues/20079)** — *Symlinks in `~/.gemini/agents/` not recognized (4 comments)*. P2 — common dotfiles-managed workflow silently fails agent discovery.

10. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983)** — *Browser subagent fails on Wayland (4 comments)*. P1 — Linux/Wayland users get `Termination Reason: GOAL` without actual work, reducing browser_agent utility outside X11.

## Key PR Progress

1. **[#29294](https://github.com/google-gemini/gemini-cli/pull/29294)** — *Fix terminal flickering from stdout contention and cursor focus*. Diagnoses Ink reconciler bottlenecks causing flicker during fast typing or background spinners; closes [#29295](https://github.com/google-gemini/gemini-cli/issues/29295).

2. **[#29208](https://github.com/google-gemini/gemini-cli/pull/29208)** — *Fall back to empty on malformed `agents.json`*. Validates shape on load — prevents `TypeError` crashes when `agents.json` is `null`, scalar, or array.

3. **[#29292](https://github.com/google-gemini/gemini-cli/pull/29292)** — *Validate checkpoint `history` is an array*. Prevents `/resume` from crashing on partially-written or corrupted checkpoint JSON.

4. **[#29205](https://github.com/google-gemini/gemini-cli/pull/29205)** — *Submit MCP prompt text without JSON encoding*. `McpPromptLoader` no longer wraps responses in JSON, preserving embedded quotes and newlines.

5. **[#29200](https://github.com/google-gemini/gemini-cli/pull/29200)** — *Enforce MCP policy consistently at runtime*. Treats empty `mcp.allowed` as fail-closed and normalizes whitespace/case in server-name matching.

6. **[#29217](https://github.com/google-gemini/gemini-cli/pull/29217)** — *Don't auto-rewrite explicit `gemini-2.5-flash`*. Stops `isFlashModel()`'s broad `endsWith('flash')` from silently upgrading user-pinned 2.5 Flash to 3.5 Flash.

7. **[#29211](https://github.com/google-gemini/gemini-cli/pull/29211)** — *Stop scheduling state updates inside a state updater*. Fixes a React anti-pattern in `useInputHistoryStore.addInput()` that nested `setState` calls.

8. **[#29201](https://github.com/google-gemini/gemini-cli/pull/29201)** — *Preserve approved shell commands across confirmation retries*. TOML custom commands with multiple `!{...}` injections no longer get stuck looping on confirmations.

9. **[#29203](https://github.com/google-gemini/gemini-cli/pull/29203)** — *Strip shell wrappers carrying extra flags*. `stripShellWrapper` now tolerates additional flags before `-c`/`-Command`, preventing policy-bypass via wrapped commands.

10. **[#29282](https://github.com/google-gemini/gemini-cli/pull/29282)** — *Persist OAuth credentials immediately after login*. Eliminates re-prompting the Google sign-in flow on subsequent sessions.

## Feature Request Trends

- **AST-aware tooling** is gaining real momentum: [#22745](https://github.com/google-gemini/gemini-cli/issues/22745) (EPIC) and [#22746](https://github.com/google-gemini/gemini-cli/issues/22746) explore `tilth`/`glyph` for read/search/mapping. Goal: cut token noise and misaligned reads.
- **Surgical, token-frugal reads**: [#19561](https://github.com/google-gemini/gemini-cli/issues/19561) proposes a `grep → read_file → full_read` hierarchy to replace "firehose" reads (currently ~36.6k tokens/turn baseline).
- **Native file tools for task tracker** ([#21000](https://github.com/google-gemini/gemini-cli/issues/21000)) — experiment with built-in file ops rather than bespoke task machinery.
- **Subagent observability**: trajectories via `/chat share` ([#22598](https://github.com/google-gemini/gemini-cli/issues/22598)) and richer context in `/bug` reports ([#21763](https://github.com/google-gemini/gemini-cli/issues/21763)).
- **Agent self-awareness** ([#21432](https://github.com/google-gemini/gemini-cli/issues/21432)) — accurate CLI flags, hotkeys, and self-execution guidance from the agent itself.
- **Zero-dependency OS-level sandboxing** ([#19873](https://github.com/google-gemini/gemini-cli/issues/19873)) — leverage Gemini 3's bash-native affinity instead of bespoke tools.
- **Browser agent resilience**: session takeover/lock recovery ([#22232](https://github.com/google-gemini/gemini-cli/issues/22232)) and Wayland support ([#21983](https://github.com/google-gemini/gemini-cli/issues/21983)).
- **Local Subagent Sprint 1** ([#20195](https://github.com/google-gemini/gemini-cli/issues/20195)) — first deliverable of a multi-sprint effort on local subagent capabilities.

## Developer Pain Points

- **Terminal flickering / tearing** during typing or while spinners run is the most-reported UX regression ([#29295](https://github.com/google-gemini/gemini-cli/issues/29295), [#21924](https://github.com/google-gemini/gemini-cli/issues/21924)) — PR [#29294](https://github.com/google-gemini/gemini-cli/pull/29294) should land soon.
- **Subagent reliability**: hang on generalist ([#21409](https://github.com/google-gemini/gemini-cli/issues/21409)), false success after MAX_TURNS ([#22323](https://github.com/google-gemini/gemini-cli/issues/22323)), and inconsistent use of skills/sub-agents ([#21968](https://github.com/google-gemini/gemini-cli/issues/21968)).
- **Auto Memory hazards**: secret leakage ([#26525](https://github.com/google-gemini/gemini-cli/issues/26525)), indefinite retries ([#26522](https://github.com/google-gemini/gemini-cli/issues/26522)), silent invalid-patch drop ([#26523](https://github.com/google-gemini/gemini-cli/issues/26523)) — cluster around [#26516](https://github.com/google-gemini/gemini-cli/issues/26516).
- **Shell exec stall** ([#25166](https://github.com/google-gemini/gemini-cli/issues/25166)) — "Waiting input" after the command actually finished, breaking interactive flows.
- **Tool-count limits**: 400+ tools → 400 error ([#24246](https://github.com/google-gemini/gemini-cli/issues/24246)); the agent needs smarter in-scope filtering.
- **Sandbox/security hardening** is a frequent complaint target — repeated issues around build-file injection, untrusted flags, and runtime-state leakage are driving the current security sprint.
- **Workspace hygiene**: scattered tmp scripts ([#23571](https://github.com/google-gemini/gemini-cli/issues/23571)) and destructive shell patterns ([#22672](https://github.com/google-gemini/gemini-cli/issues/22672)) frustrate users trying to keep clean commits.
- **Configuration drift**: `/compress` not persisted across resume ([#21335](https://github.com/google-gemini/gemini-cli/issues/21335)), Browser Agent ignores overrides ([#22267](https://github.com/google-gemini/gemini-cli/issues/22267)), agents.json crash on shape mismatch ([#29207](https://github.com/google-gemini/gemini-cli/issues/29207)).

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest
**Date:** 2026-09-12
**Repository:** [github/copilot-cli](https://github.com/github/copilot-cli)

---

## 1. Today's Highlights

The CLI shipped **v1.0.84-5**, adding import support for the semantic JSONL session/memory interchange format and unifying shell completions so root flags and subcommand options are generated from a single grammar — improving discoverability of `copilot <TAB>` completions. The 21 active issues updated in the last 24h show a strong cluster of MCP integration pain (OAuth, resume/relaunch handoff, stdio cancellation), alongside several agent-skills bugs around `disable-model-invocation` and a fresh Linux desktop UI repaint regression.

---

## 2. Releases

### [v1.0.84-5](https://github.com/github/copilot-cli/releases/tag/v1.0.84-5)
**Added**
- `session` and `memory` import commands for the **semantic JSONL interchange format**, enabling portable session/memory migration across tooling.

**Improved**
- Shell completions are now generated from the **same grammar the CLI parses with**, so:
  - `copilot <TAB>` shows root flags alongside subcommands.
  - Each subcommand offers only its own options (no noise from sibling commands).

---

## 3. Hot Issues

| # | Issue | Why it matters | Community |
|---|---|---|---|
| [#4438](https://github.com/github/copilot-cli/issues/4438) | `disable-model-invocation: true` makes a skill unreachable, not manual-only | Skills marked "manual-only" can't be invoked at all by the model, breaking the documented contract. | 👍 7 · 💬 5 |
| [#4753](https://github.com/github/copilot-cli/issues/4753) | Session resume cancels in-flight stdio MCP connections (~1s vs ~16s) | Regression in v1.0.83 silently makes MCP servers unavailable for the entire resumed session. | 👍 1 · 💬 4 |
| [#4795](https://github.com/github/copilot-cli/issues/4795) | Atlassian MCP OAuth callback URL mismatch | Random local port vs registered redirect breaks OAuth for a widely used MCP server. | 👍 3 · 💬 3 |
| [#4759](https://github.com/github/copilot-cli/issues/4759) *(CLOSED)* | Copilot CLI should send MCP cancellation requests | Currently a user-cancelled tool call leaves the upstream MCP server hanging on URL-mode elicitation. | 👍 0 · 💬 1 |
| [#4636](https://github.com/github/copilot-cli/issues/4636) | `--additional-mcp-config` servers removed during startup reconciliation (1.0.81-11) | A second reconciliation pass silently drops CLI-supplied MCP servers, emitting `session.mcp_server_removed`. | 👍 0 · 💬 1 |
| [#4637](https://github.com/github/copilot-cli/issues/4637) | Duplicate skill lookup for slash-invoked skills with `disable-model-invocation` | Successful slash invocation races with a failing lookup that pollutes the context with `Skill not found`. | 👍 0 · 💬 1 |
| [#2436](https://github.com/github/copilot-cli/issues/2436) | Cross-Session Context Querying | Long-standing ask for sessions to leverage prior sessions' accumulated understanding of a codebase. | 👍 1 · 💬 1 |
| [#4065](https://github.com/github/copilot-cli/issues/4065) | Exfiltration protection too aggressive — blocks legitimate spec content | False-positive blocking of docs containing `${env.AUTH_TOKEN}` style examples. | 👍 2 · 💬 1 |
| [#4826](https://github.com/github/copilot-cli/issues/4826) | Linux Desktop App (WebKitGTK/Tauri): UI does not repaint automatically | Fresh regression in v1.0.84-4 AppImage — UI only updates on focus/resize. | 👍 0 · 💬 0 |
| [#4825](https://github.com/github/copilot-cli/issues/4825) | Emit per-phase HydraFusion model/verdict/credit attributes to OpenTelemetry | Request to surface the multi-model routing decisions already present in `events.jsonl` to OTel for observability. | 👍 0 · 💬 0 |

---

## 4. Key PR Progress

**No pull requests were updated in the last 24 hours.** ([View open PRs →](https://github.com/github/copilot-cli/pulls))

---

## 5. Hot Discussions

*No GitHub Discussions data was provided for this digest. Section omitted.*

---

## 6. Feature Request Trends

Across the issues, several feature directions recur:

- **MCP reliability & lifecycle** — Multiple requests for graceful handling of MCP servers during session resume, `/clear`, and foreground handover (#4753, #4818, #4759, #4636). Pattern: the CLI tears down and rebuilds the MCP connection graph in ways that strand HTTP servers in `failed` states or cancel in-flight stdio handshakes.
- **Skill system correctness** — Several issues (#4438, #4637, #4823) ask for clearer semantics around `disable-model-invocation`, slash-invoked skills, and improved `/skills list` readability.
- **Observability & telemetry** — #4825 requests per-phase HydraFusion attributes in OpenTelemetry; aligns with broader appetite for routing/model transparency.
- **Cross-session memory** — #2436 keeps resurfacing; users want one session to query the accumulated context of prior sessions.
- **Hooks & extensibility** — #4820 requests an "end-of-session" hook for automated workflows before `/clear`.
- **Cost controls** — #4821 requests OpenAI Flex Tier (`service_tier: flex`) selection for ~50% token-cost savings on non-time-critical work.
- **Custom-instruction safety** — #4822 flags that `AGENTS.md` discovery walks every ancestor of resolved symlinks, leaking unrelated repos' instructions.

---

## 7. Developer Pain Points

- **MCP integration is the dominant source of friction**: OAuth scope/redirect mismatches (#4795, #4464), silent refresh failures against Entra ID, MCP servers stranded after `/clear` (#4818), servers dropped from `--additional-mcp-config` (#4636), and missing cancellation propagation (#4759). Together these paint MCP as functional but operationally fragile.
- **Skill semantics are inconsistent** with documentation: `disable-model-invocation: true` blocks explicit user invocation rather than only blocking model-invocation, and slash-invoked skills emit contradictory "Skill not found" noise (#4438, #4637).
- **Regressions are landing faster than they are triaged** — UI repaint regression in the Linux Desktop AppImage (#4826) and the v1.0.83 stdio MCP regression (#4753) both went out in recent pre-releases.
- **Installer hygiene**: #4816 reports the Windows installer corrupts `PATH` on systems where the path environment variable exceeds 2047 characters, leaving the CLI unusable.
- **Safety prompts over-fire on legitimate content** — exfiltration protection flags spec files containing placeholder variable syntax (#4065), forcing users to work around their own documentation.
- **Multiple-choice UX bugs** in `ask_user` (#4817) silently degrade into free-text prompts when tool-call parameters leak, which is a quality-of-life issue for any agentic workflow relying on structured user input.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-12

## Today's Highlights

The community focus today is dominated by **billing/payment synchronization bugs** affecting Console Go subscriptions — multiple users report successful Stripe/Alipay charges followed by persistent "Insufficient balance" errors, indicating a webhook-to-credit reconciliation failure. On the engineering side, **durable event table bloat** is being actively addressed, with a fix landing that eliminates redundant diff-payload writes in `SessionSummary.summarize`. A new round of accessibility regressions for screen readers on the Desktop app is also drawing attention.

## Releases

_No new releases in the last 24 hours._

## Hot Issues

1. **[#37790](https://github.com/anomalyco/opencode/issues/37790)** — **OpenCode Go subscription paid but workspace shows "Insufficient balance"** (20 comments). Critical billing bug: Stripe charges succeed but credits never post. This is the highest-traffic issue of the day and aligns with multiple sibling reports.

2. **[#37231](https://github.com/anomalyco/opencode/issues/37231)** — **Error from provider (Console Go): Upstream request failed** (10 comments, closed). Cross-surface outage affecting CLI, desktop app, and the OpenChamber VSCode extension — all Console Go models failing.

3. **[#37815](https://github.com/anomalyco/opencode/issues/37815)** — **Kimi K3 specifically throws upstream errors on Console Go** (9 comments, 9 👍). Well-liked because it isolates a model-specific failure rather than a blanket outage, helping triage.

4. **[#34087](https://github.com/anomalyco/opencode/issues/34087)** — **OpenCode not returning responses** (8 comments, 5 👍). High-impact functional regression — prompts reach the "thinking" phase but no final output ever streams. Reproduced across Go and Zen providers on v1.16.2.

5. **[#48604](https://github.com/anomalyco/opencode/issues/48604)** — **Payment deducted but credits not updated (Alipay, workspace `wrk_01KZRXBAM6RNF1HZX921YNQJWF`)** (4 comments). Same family as #37790 — credits endpoint returns `$0.00` after a successful Alipay charge, hinting at a multi-provider webhook gap.

6. **[#48497](https://github.com/anomalyco/opencode/issues/48497)** — **Long-term persistence memory system (`/teach`, `/recall`, `/learn`, `/memory`)** (4 comments). Most substantive feature request of the day — proposes a first-class persistent memory layer.

7. **[#40111](https://github.com/anomalyco/opencode/issues/40111)** — **Per-MCP-server trust configuration** (4 comments). Enterprises want to whitelist self-signed/private-CA certificates for MCP servers (OPNsense, Proxmox, Home Assistant, internal K8s).

8. **[#42409](https://github.com/anomalyco/opencode/issues/42409)** — **`tool.execute.before` hook cannot mutate `output.args.command`** (3 comments). Plugin-API contract bug on Windows/PowerShell — documented mutation is silently ignored by the shell tool.

9. **[#36288](https://github.com/anomalyco/opencode/issues/36288)** — **Unreachable local MCP server silently hides all file-based TUI commands** (3 comments). UX-affecting: a single failed MCP probe causes the `/command` palette to drop custom slash commands, with no error surfaced.

10. **[#48645](https://github.com/anomalyco/opencode/issues/48645)** — **Regression in 1.18.30: every prompt crashes with `TypeError` in `SystemPrompt.environment`** (1 comment). Brand-new breakage on first message of a fresh session — straightforward-looking but blocks all usage on the latest release.

## Key PR Progress

1. **[#48638](https://github.com/anomalyco/opencode/pull/48638)** — **fix(core): eliminate durable event write amplification from turn diffs** (open). Closes [#48641](https://github.com/anomalyco/opencode/issues/48641). Replaces per-turn immutable row churn with a more compact representation of the same conversation state.

2. **[#48630](https://github.com/anomalyco/opencode/pull/48630)** — **fix(opencode): list file commands without blocking on MCP connections** (open). Closes [#36288](https://github.com/anomalyco/opencode/issues/36288). Drops `/command` init latency from ~5.6s (9 MCP servers) to ~0.65s by not awaiting MCP connects before listing file-based commands.

3. **[#48600](https://github.com/anomalyco/opencode/pull/48600)** — **fix(app): stabilize mobile timeline touch scrolling** (open). Fixes a 544px finger-drift misalignment on iPhone caused by row-height reflow mid-scroll, with reading-anchor preservation across image batches.

4. **[#48632](https://github.com/anomalyco/opencode/pull/48632)** — **fix(tui): restore terminal capability detection over SSH** (open). Closes [#39923](https://github.com/anomalyco/opencode/issues/39923). opentui's auto remote detection mishandled Mac→Linux SSH sessions, breaking colors.

5. **[#28973](https://github.com/anomalyco/opencode/pull/28973)** — **feat(provider): add Requesty model discovery from `/v1/models`** (open, long-standing). Closes [#16344](https://github.com/anomalyco/opencode/issues/16344). Replaces the static snapshot with live Requesty-approved model + routing data.

6. **[#48646](https://github.com/anomalyco/opencode/pull/48646)** — **docs: add npm v11/v12 `--allow-scripts` note** (open). Documents install workaround for #39660 in the README troubleshooting section.

7. **[#48627](https://github.com/anomalyco/opencode/pull/48627)** — **fix: align skill slash defaults with docs** (closed, superseded). Follow-up to #48022/#48023 correcting the false premise — the actual diverging surfaces are mini TUI and ACP, not main/desktop.

8. **[#46562](https://github.com/anomalyco/opencode/pull/46562)** — **feat(tui): make the assistant-message footer a replaceable plugin** (open). Closes [#46268](https://github.com/anomalyco/opencode/issues/46268). Externalizes the `▣ mode · model · duration` line as a pluggable footer.

9. **[#48620](https://github.com/anomalyco/opencode/pull/48620)** — **fix(tools): clarify unavailable tool errors** (closed). Improves model feedback when it requests a tool not in the current registry — applies consistently across Core tool registry and AI tool dispatcher.

10. **[#43038](https://github.com/anomalyco/opencode/pull/43038)** — **fix(opencode): handle literal Windows archive paths** (closed). Routes Windows archive/destination paths via child-process env vars instead of PowerShell interpolation, avoiding backtick/quote breakage.

## Feature Request Trends

Distilled from the issues/PR backlog:

- **Memory & long-term context**: First-class persistence with explicit commands (`/teach`, `/recall`, `/learn`, `/memory`) for cross-session knowledge.
- **MCP operational maturity**: Per-server TLS trust configuration; non-blocking command discovery when MCP servers are slow/unreachable; clearer lifecycle of MCP subprocesses under `HttpApi`.
- **Multi-agent orchestration**: Subagents / "ultracode" mode à la Claude Code ([#48612](https://github.com/anomalyco/opencode/issues/48612)) — single-agent loop increasingly seen as insufficient.
- **Accessibility**: Real-time exposure of streaming/thinking/tool-call content to screen readers (NVDA) on Desktop — multiple concurrent reports ([#46396](https://github.com/anomalyco/opencode/issues/46396), [#41408](https://github.com/anomalyco/opencode/issues/41408)).
- **TUI ergonomics**: Browser-style tab history/recovery ([#48635](https://github.com/anomalyco/opencode/issues/48635)), prompt-draft recovery on Ctrl+C ([#48636](https://github.com/anomalyco/opencode/issues/48636)), external-editor launcher configuration ([#48648](https://github.com/anomalyco/opencode/issues/48648)), toggle-sidebar command ([#48614](https://github.com/anomalyco/opencode/pull/48614)).
- **i18n**: Native RTL/Arabic bidi support on `opencode2` beta — addresses 4 related issues ([#38524](https://github.com/anomalyco/opencode/issues/38524), [#40004](https://github.com/anomalyco/opencode/issues/40004), [#39525](https://github.com/anomalyco/opencode/issues/39525), [#32984](https://github.com/anomalyco/opencode/issues/32984)).
- **Privacy/control UI**: Unified Privacy & Control Center with a compact settings dashboard ([#48583](https://github.com/anomalyco/opencode/issues/48583)).

## Developer Pain Points

- **Billing reconciliation is broken for Console Go**: At least three distinct user-visible failure modes (Stripe, Alipay, generic workspace balance) all reduce to "payment succeeds, credits don't post." Top priority for trust recovery.
- **Console Go upstream instability**: Recurring "Upstream request failed" errors across multiple models are degrading confidence in the managed provider path.
- **Silent UX failures**: MCP probe failures and TUI crashes on null server responses fail loudly in the logs but quietly to the user — file commands vanish or the whole UI crashes.
- **Durable event table growth**: Each turn re-forking full git diffs into new immutable rows inflates storage far faster than conversation content warrants — now being fixed.
- **Accessibility regressions on Desktop**: Screen-reader users cannot follow streaming thinking/tool calls in real time — a barrier for a non-trivial user segment.
- **Install/docs friction**: npm v11/v12 lifecycle-script defaults silently breaking the install; PowerShell path handling for Windows archive targets; shell prompt prefixes being copied with `$ `. All small, all friction-heavy.
- **Cost accounting gaps**: DeepSeek peak/off-peak pricing is stored as off-peak only, so displayed cost under-reports during peak hours.
- **Thinking-block reuse across conversations**: API rejecting `signature` fields bound to the wrong conversation forces users to strip reasoning blocks manually ([#48637](https://github.com/anomalyco/opencode/issues/48637)).

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-12

## Today's Highlights
The most active thread continues to be [#4945](https://github.com/earendil-works/pi/issues/4945) on `openai-codex` / `gpt-5.5` connection reliability, where the TUI hangs on "Working…" with no streamed output (78 comments, 33 👍). A significant architectural shift landed in the PR stack from mitsuhiko: [#9116](https://github.com/earendil-works/pi/pull/9116) and [#9117](https://github.com/earendil-works/pi/pull/9117) introduce mid-conversation system messages so extensions can mutate prompts/tool loadouts without rewriting the top-level system prompt. Windows support also saw meaningful progress, with [#9501](https://github.com/earendil-works/pi/pull/9501) and [#9504](https://github.com/earendil-works/pi/pull/9504) unifying shell discovery.

## Releases
No new releases in the last 24h.

## Hot Issues

1. **[#4945 — openai-codex Connection Reliability Issues (78 comments, 33 👍)](https://github.com/earendil-works/pi/issues/4945)** — `gpt-5.5` via `openai-codex` frequently leaves the TUI stuck on "Working…" with no stream, no tool call, and no error. Only Escape recovers. Marked in-progress; this is the most-upvoted active bug.
2. **[#7547 — How do you use Pi on Windows? (62 comments)](https://github.com/earendil-works/pi/issues/7547)** — A meta-issue collecting the patchwork of Windows run/install paths to focus engineering effort. A canonical reference for anyone shipping Pi on Windows.
3. **[#9052 — Fullscreen mode wheel scrolling 3x slower (9 comments, 4 👍)](https://github.com/earendil-works/pi/issues/9052)** — Users migrating from regular TUI to fullscreen mode hit a 3× scroll-speed regression. Signals demand for the fullscreen layout to be first-class.
4. **[#5323 — Improve Vertex + GCP metadata server support (9 comments)](https://github.com/earendil-works/pi/issues/5323)** — `existsSync` on `GOOGLE_APPLICATION_CREDENTIALS` / gcloud config returns wrong auth state; needs a real metadata-server probe.
5. **[#8928 — Parallel pi startup reports "No API key found" for ~48s (7 comments)](https://github.com/earendil-works/pi/issues/8928)** — Multi-process startup with stale OAuth credentials for another provider blocks the active provider for almost a minute. Deterministic repro and timing data attached.
6. **[#5372 — Allow custom OAuth callback page rendering (5 comments)](https://github.com/earendil-works/pi/issues/5372)** — Extensions want to brand OAuth success/error pages instead of being stuck with the built-in `renderPage`.
7. **[#9311 — Fullscreen mouse selection survives session switch (5 comments)](https://github.com/earendil-works/pi/issues/9311)** — Selection state leaks across session switches in fullscreen TUI; should clear on switch.
8. **[#7321 — Multi-line paste broken on Termux (5 comments)](https://github.com/earendil-works/pi/issues/7321)** — Without bracketed-paste support, the first `\r` submits instead of inserting the pasted block. Limits Pi's reach on mobile Android terminals.
9. **[#6108 — `/reload` re-evaluates extension dependency side effects (5 comments)](https://github.com/earendil-works/pi/issues/6108)** — Linux release binary re-runs `@plannotator/pi-extension` → `@pierre/diffs` side effects on each reload, duplicating registered themes.
10. **[#5365 — Pi installed with bun uses node under the hood (CLOSED, 4 comments)](https://github.com/earendil-works/pi/issues/5365)** — Bun-installed Pi crashes in `undici`'s `cachestorage` because Node compatibility shims aren't fully applied. Closed but instructive for installation docs.

## Key PR Progress

1. **[#9116 — feat(ai): add mid-conversation system messages](https://github.com/earendil-works/pi/pull/9116)** — First layer of the #8998 split. Plumbs a new system-message role through pi-ai so mid-session changes don't require rewriting the top-level prompt.
2. **[#9117 — feat(coding-agent): deliver prompt and tool changes as system message deltas](https://github.com/earendil-works/pi/pull/9117)** — Stacked on #9116; rewires the coding agent to ship tool/prompt mutations as deltas instead of full-system overwrites.
3. **[#9488 — fix(ai): add canonical Codex turn attribution](https://github.com/earendil-works/pi/pull/9488)** — Adds provider-neutral `requestIdentity` so retries, steering, and compaction recovery can be tied together across tool continuations.
4. **[#9442 — fix(ai): allow prompt cache keys for compatible proxies](https://github.com/earendil-works/pi/pull/9442)** — `compat.supportsPromptCacheKey` lets compatible proxies receive `prompt_cache_key` under default short retention.
5. **[#8572 — feat(ai): amazon bedrock mantle](https://github.com/earendil-works/pi/pull/8572)** — New Mantle surface support for OpenAI-hosted models on Bedrock (addresses #5363). WIP awaiting API key perms.
6. **[#9489 — fix(bedrock-converse): normalize gross usage.input to net per model family](https://github.com/earendil-works/pi/pull/9489)** — Anthropic reports cache net; other families report gross. Aligns `usage.inputTokens` consistently (fixes #8752).
7. **[#8635 — fix(ai): preserve aborted stop reason during lazy setup](https://github.com/earendil-works/pi/pull/8635)** — Stop signals now survive lazy auth-stream setup; adds regression test for abort-during-tool-execution.
8. **[#9501 — fix(coding-agent): resolve Windows shells from installation directories](https://github.com/earendil-works/pi/pull/9501)** — Unifies and documents Windows shell discovery; closes the loop on the Windows meta-issue #7547.
9. **[#9504 — fix(coding-agent): accept Windows Store shell aliases](https://github.com/earendil-works/pi/pull/9504)** — Uses `accessSync(F_OK)` so runnable Store aliases aren't rejected by `existsSync`'s EACCES quirk.
10. **[#9517 — feat(tui): group long tool-call runs](https://github.com/earendil-works/pi/pull/9517)** — Collapses 6+ consecutive tool calls into a single transcript row with click-to-expand; failed calls retained.

(Honorable mentions in this batch: [#9505 samplingParams](https://github.com/earendil-works/pi/pull/9505), [#9514 configurable keybindings](https://github.com/earendil-works/pi/pull/9514), [#9503 light-theme warning contrast](https://github.com/earendil-works/pi/pull/9503), [#9523 ui_prompt spans for core dialogs](https://github.com/earendil-works/pi/pull/9523), [#8627 ctx.cwd for cwd-sensitive tools](https://github.com/earendil-works/pi/pull/8627).)

## Hot Discussions

**Show and tell**
- [#9525 — Thank you — `--mode rpc` is the backbone of a new open-source project](https://github.com/earendil-works/pi/discussions/9525) — kamilakis built [web-agent](https://github.com/kamilakis/web-agent), a phone dashboard plus Siri/Matrix bridges around a persistent Pi session. A nice validation of Pi's RPC extensibility.

**Ideas / Protocol gaps**
- [#9516 — openai-responses: tool-result images in function_call_output dropped by compatible gateways](https://github.com/earendil-works/pi/issues/9516) — Currently `function_call_output.output` uses `input_image`, which is valid Responses but rejected by some Chat-Completions-compatible gateways. Proposes dual-encoding so the same payload works on both surfaces.

## Feature Request Trends

1. **Windows as a first-class target.** Shell discovery (PRs #9501, #9504), PowerShell D:-drive fallback (#9490), Shift+Enter (#7175), `taskkill`/pipeline orphans (#9129), and Store shell aliases all show Windows users want parity, not exceptions.
2. **Extension API expansion.** Programmatic `auth.json` persistence (#7658), public OAuth render hooks (#5372, #6930), and `ctx.cwd` for cwd-sensitive tools (#8627) — extensions are becoming a serious surface area that needs stable contracts.
3. **Provider surface coverage.** Bedrock Mantle (#8572), prompt-cache-key opt-in for proxies (#9442), Vertex metadata server (#5323), Bedrock usage normalization (#9489), `model.samplingParams` (#9505) — providers are diverging faster than the abstraction can absorb.
4. **TUI polish and accessibility.** Configurable keybindings (#9514), PageUp/Down coverage (#7629), fullscreen scroll parity (#9052), bracketed-paste fallback (#7321), grouped tool runs (#9517).
5. **Reliability and observability.** Canonical turn attribution (#9488), automatic retry on `stream_read_error` (#9520), `ui_prompt_*` spans for native dialogs (#9522), non-racy notification surface (#9462).

## Developer Pain Points

- **Codex/OpenAI hangs.** The top complaint by a wide margin; users lose turns and have to Escape-recover with no error trace.
- **Multi-process startup stalls.** Stale `auth.json` credentials for inactive providers can block the active one for tens of seconds.
- **Windows-specific friction.** Inconsistent shell paths, missing PowerShell on non-`C:` installs, and bash-timeout orphan pipelines make Windows users hit a long tail of small-but-blocking bugs.
- **Terminal compatibility gaps.** Termux (no bracketed paste), iTerm2 inline images (#9519 — repaint path missing), Windows Terminal Shift+Enter.
- **Silent failures.** Prompt templates with bad frontmatter vanish without warning (#9354); user_bash routing exceptions fall through to host execution (#9068); false-positive cache-miss notices on local vLLM (#9013).

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-12

## 1. Today's Highlights

Today's activity is dominated by **stability hardening across the runtime boundaries**: a P1 TUI crash from concurrent background agents, a P1 cross-vendor metadata incompatibility (DashScope → non-Qwen models returning 400), and a closed-but-tracked privacy regression in telemetry export all landed on the same day. On the design side, an umbrella issue (#11695) plus three sub-issues (#11696/#11697/#11698) formalize a long-term architectural pivot: **separating the agent harness from the execution environment**, with credential isolation and a swappable execution backend.

## 2. Releases

**[v0.23.3-nightly.20260911.aaa6a32aae](https://github.com/QwenLM/qwen-code/releases/tag/v0.23.3-nightly.20260911.aaa6a32aae)** — Channel cleanup continues: removes obsolete background response aggregation from the DingTalk integration and continues a `feat(channels)!` removal pass. Refactor-level release; no user-facing feature flags.

## 3. Hot Issues

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — TUI exits silently with React #185 when background agents complete (P1)** — 8 comments. Multiple concurrent background sub-agents trigger an Ink `useBoxMetrics` setState loop that exceeds React's max update depth, drops to the shell with no error rendered, and corrupts the next session's "Previous session appears…" prompt. Highest-impact UX bug right now.
2. **[#11590](https://github.com/QwenLM/qwen-code/issues/11590) — `metadata` field breaks non-Qwen models routed via DashScope OpenAI-compatible gateway (P1)** — 4 comments. Removing one auto-inserted field restores functionality; the issue is essentially a request to gate vendor-specific metadata injection per-model. Cross-vendor compatibility is a recurring theme.
3. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556) — vscode-ide-companion 0.23.1 webview stuck loading under Remote-SSH (P1)** — 5 comments. AArch64 Linux Remote-SSH with VSCode 1.137 server reproduces reliably; the webview never finishes initialising. Affects an entire Remote-SSH-on-arm64 cohort.
4. **[#9693](https://github.com/QwenLM/qwen-code/issues/9693) — Qwen Desktop MCP `-32000 Connection closed` on Windows even when MCP is inactive (P2)** — 6 comments. Persistent since late August; the no-op MCP case still reports a connection failure, suggesting an unconditional startup probe.
5. **[#11665](https://github.com/QwenLM/qwen-code/issues/11665) — Responses cleanup can break reasoning/tool-call adjacency (P2)** — 5 comments. The OpenAI Responses pipeline can split a `reasoning`+`function_call` pair during cleanup, which on replay violates the API's adjacency invariant. Architectural follow-up to the recent Responses work.
6. **[#11657](https://github.com/QwenLM/qwen-code/issues/11657) — Fireworks Qwen3 tool-call continuation fails with 400 on mirrored `messages[].reasoning` (P1)** — 3 comments. First turn succeeds, second turn rejected; tied to the same `thoughtSignature` ownership gap that #9453 already closed in part.
7. **[#11577](https://github.com/QwenLM/qwen-code/issues/11577) — Goal checkpoint retries identical request on overflow until stall breaker trips (P2)** — 4 comments. Daemon-side issue; identical retries instead of an evidence-window adjustment cause three straight failures before the Goal aborts.
8. **[#11695](https://github.com/QwenLM/qwen-code/issues/11695) — Tracking: separate the agent harness from the execution environment (P2, needs-discussion)** — 4 comments. The umbrella issue for an architectural split (Track A/B/C under #11696/#11697/#11698). Defines a multi-quarter direction rather than a single fix.
9. **[#11710](https://github.com/QwenLM/qwen-code/issues/11710) — Virtual Viewport leaves terminal dirty on exit (P2)** — 3 comments. Exiting via Ctrl-D/Ctrl-C/`/exit`/`/quit` corrupts the alt-screen; subsequent `nano` runs emit `[ Unknown sequence ]`. Affects every terminal-emulator user on VP mode.
10. **[#11499](https://github.com/QwenLM/qwen-code/issues/11499) — `${VAR}` placeholders in `.mcp.json` are not expanded (P2)** — 4 comments. A documented `headers` example sends the literal `${MY_TOKEN}` string. Long-standing security-relevant UX gap.

## 4. Key PR Progress

1. **[#11670](https://github.com/QwenLM/qwen-code/pull/11670) — fix(telemetry): gate `request_text`/`response_text` on `logPrompts` (CLOSED)** — Closes the data-privacy regression reported in #11666; `LoggingContentGenerator` now omits both attributes when `logPrompts=false`, preventing OTLP export of conversation content.
2. **[#11610](https://github.com/QwenLM/qwen-code/issues/11610) — hooks: align the hook contract with Claude Code** — Tracking issue with three follow-ups (stop_hook_active semantics, 600s default timeout, plaintext stdout, matchers, common input). Hooks engine is described as structurally complete; this PR lines up the contract edges.
3. **[#11538](https://github.com/QwenLM/qwen-code/pull/11538) — feat: select the OpenAI API per model** — Adds `api: "chat-completions" | "responses"` at the model level under `modelProviders.openai`. Enables per-model routing to OpenAI Responses without changing the provider surface.
4. **[#11086](https://github.com/QwenLM/qwen-code/pull/11086) — feat(serve): scope extensions to workspace runtimes** — Reconciles the global extension catalog into live workspace runtimes, exposes workspace-qualified daemon and SDK access, updates `@`-menu and extension-management UX.
5. **[#11594](https://github.com/QwenLM/qwen-code/pull/11594) — feat(workflow): support prepared flows through native tools** — External callers can pre-prepare a flow script and let the agent execute it through the native Workflow tool, with provenance carried through results/snapshots/resume.
6. **[#10410](https://github.com/QwenLM/qwen-code/pull/10410) — feat(core): preserve prompt cache for deferred tools** — Replaces deferred-tool schema revelation with a `tool_search` / `tool_call` two-step bridge, keeping the declared tool list stable so prompt-cache hits survive across turns.
7. **[#11705](https://github.com/QwenLM/qwen-code/pull/11705) — feat(cua): add app-bound actions and compact native observations** — Adds macOS Computer-Use app handles (install identity, window selection, short element IDs) and collapses native AX observations into a compact shape, removing foreground/background choices from the model-facing API.
8. **[#11700](https://github.com/QwenLM/qwen-code/pull/11700) — feat(web-shell): improve context overview and add manual compression** — Token remaining/category breakdowns, snapshot labeling, and on-demand refresh make the Web Shell context surface actionable instead of decorative.
9. **[#10906](https://github.com/QwenLM/qwen-code/pull/10906) — feat(web-shell): show shell and monitor task output** — Persists Monitor stdout/stderr alongside Shell capture and adds a live-session-owner-scoped endpoint returning a sanitized tail of the buffer for the task detail panel.
10. **[#11562](https://github.com/QwenLM/qwen-code/pull/11562) — fix(cli): keep one-shot system reminders out of the user's own message** — One-shot reminders folded into a prompt no longer echo back in the transcript, ↑-recall history, or composer refill after a cancelled turn; small but meaningful UX correction.

## 5. Feature Request Trends

- **Harness/Executor separation** (#11695 umbrella → #11696/#11697/#11698). The most-amplified direction this cycle: a swappable execution backend (with a container reference impl), structural credential isolation for MCP/cloud secrets, and "execution environment as an addressable resource" with an Alibaba Cloud reference implementation.
- **Multi-platform surface expansion** — Android companion client over `qwen serve` (#11704); macOS app-bound Computer Use (#11705).
- **Web-search UX** — Real page titles so models can cite `[title](url)` as the tool description already requests (#11564).
- **Context control** — Manual compression and accurate remaining-capacity surfacing in Web Shell (#11700).
- **Per-model API selection** — Letting models under `modelProviders.openai` opt into the Responses endpoint without changing the provider surface (#11538 → #11538).
- **Hook contract parity with Claude Code** — A documented alignment checklist (#11610) covering stdout format, stop_hook_active, timeout unit, matchers, common input.

## 6. Developer Pain Points

- **Silent TUI death on background-agent bursts** — The single highest-traffic issue (#11500) reflects frustration that a "smoke-test" multi-agent run can corrupt the next session without any rendered error.
- **Cross-vendor breakage** — A Qwen-specific metadata field sent to non-Qwen backends via the DashScope OpenAI-compatible gateway causes a hard 400 (#11590); the same `thoughtSignature` ownership gap surfaced again on Fireworks (#11657).
- **Windows + Remote-SSH** — Two separate P1s (#9693 MCP, #11556 webview) hit Windows and Remote-SSH users, with no upstream repro path that surfaces in CI.
- **`.mcp.json` ergonomics** — Undocumented `${VAR}` non-expansion (#11499) sends literal placeholders, creating a quiet credential-leak shape that users would assume is supported.
- **Telemetry/privacy leakage** — `logPrompts=false` was honoured inconsistently (#11666, #11667), and #11670 fixed only the request/response path; broader debug-log redaction is still under audit.
- **Terminal-UX regressions** — VP-mode dirty-state on exit (#11710) and OpenTUI confirmation rendering under long payloads (#11658/#11659) keep the TUI/perf boundary brittle.
- **Daemon session-management correctness** — Pagination over equal `mtimeMs` permanently skips files (#11706); Live-task threads lack source attribution (#11707); `output-language` rule-file write crashes on read-only homes (#10455).
- **Hooks contract ambiguity** — Stop-hook block cap resets across tool round trips (#11673), and the proposed 600s default timeout can't land without a `MessageBus.request` deadline fix (#11688 → #11610).

---

*Digest generated from GitHub data for [QwenLM/qwen-code](https://github.com/QwenLM/qwen-code). P1/P2/P3 priorities reflect the project's own `priority/*` labels.*

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*