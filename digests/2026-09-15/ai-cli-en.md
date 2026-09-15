# AI CLI Tools Community Digest 2026-09-15

> Generated: 2026-09-15 11:30 UTC | Tools covered: 7

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

# AI CLI Tools Cross-Comparison Report — 2026-09-15

## 1. Ecosystem Overview

The AI CLI agent category has consolidated into three tiers: vendor-flagship tools bound to first-party models (Claude Code, Codex, Gemini CLI, Copilot CLI), open multi-provider clients (OpenCode, Qwen Code), and specialist-grade tools for power users (Pi). Despite different business models, all seven are converging on the same architectural battlegrounds — multi-agent orchestration, sandboxed execution, context/compaction management, and cost transparency — while Windows support lags uniformly. Release velocity remains extremely high across the board (nightlies, alphas, and hotfix cadences), but the nature of each tool's top issues reveals maturity differences: consumer-scale billing disputes at Claude Code versus adapter-level fidelity bugs at Pi. Community signal is increasingly shaped by users running *unattended, multi-day, multi-agent* workflows rather than interactive chat.

## 2. Activity Comparison

*Counts reflect what each digest surfaced in the 24h window (hot-issue lists are normalized to ~10 per digest), not absolute tracker totals.*

| Tool | Hot Issues Tracked | Top Engagement Signal | Active PRs (24h) | Discussions (24h) | Releases (24h) |
|---|---|---|---|---|---|
| **Claude Code** | 10 | #38335: 852 comments / 476 👍 | 3 (all listed) | — | 2 stable (v2.1.271–272) |
| **Codex** | 10 (+3 duplicate quota reports) | #25719: 397 👍 (open since June) | 10 | 5 (1 idea, 4 show-and-tell) | 4 alpha (v0.155.0 line; 6 in a week) |
| **Gemini CLI** | 10 | #22323: P1, 13 comments | 10 | — | 1 nightly (v0.61.0) |
| **Copilot CLI** | 10 (+6 runners-up) | #13 (vim mode): 76 👍, closed after ~1 yr | 0 (explicitly none) | — | 3 pre-release (v1.0.84-6/-7/-8) |
| **OpenCode** | 10 | #16017: 138 👍 (closed) | 10 | — | 1 stable hotfix (v1.18.31) |
| **Pi** | 10 | #8752: 6 comments / 5 👍 | 10 (several closed) | — | 0 |
| **Qwen Code** | 10 | #11500: P1, 15 comments | 10 | — | 5 (2 core incl. v0.23.4 + 3 CUA-driver packages) |

**Notes:** No repo in this set disables Issues/PRs upstream per the digests, so no "N/A" applies. "—" indicates no discussion-section activity surfaced today. Copilot CLI's 0-PR day is explicitly stated in its digest and, alongside closures of long-standing asks (#13, #54), suggests work occurring outside the public PR surface.

## 3. Shared Feature Directions

| Direction | Tools & Evidence | Underlying Need |
|---|---|---|
| **Per-call subagent control (model / effort / provider)** | Claude Code (#77298 effort, #72871 model), OpenCode (#6651, 80 👍 — top open request), Codex (#40858 — override silently dropped), Copilot (#4849/#4850) | Orchestrate cheap/strong models per child agent *without* authoring agent-definition files |
| **Cost & usage transparency** | Claude Code (#38335, 852 comments; #72994; #73305), OpenCode (#16017, 138 👍; #42776), Codex (Spark quota trio + #45602), Pi (#8752/#9210/#9457 billing correctness) | Programmatically visible quota/balance, accurate accounting, warnings before exhaustion |
| **Long-session stability & compaction safety** | Copilot (OOM cluster #4664/#4725/#4251; compaction loop #4780), Pi (#9482 destructive auto-compaction deleting ~400k tokens; `/forget` PR #9615), OpenCode (#47510 event-table GC; #36682 compaction injection), Claude Code (#72997 context re-injection), Gemini (#22745 AST-aware reads to cut 36k-token baseline) | Predictable, non-destructive, inspectable context management |
| **Sandboxing & safe execution** | Copilot (`/sandbox` host allow/deny), Qwen (#11887 ACP approval bypass; #11711 containerized subagents), Codex (Seatbelt fixes #45548/#45559), Gemini (#19873 zero-dep OS sandbox; #24246 tool-count ceiling), Claude Code (#71627 session-scoped host approvals) | Composable, policy-driven security replacing binary allow-all |
| **Editor/terminal-grade UX** | Copilot (#13 vim mode closed; #4843 themes), Codex (#17793 Backspace bug; #45612 math rendering), Claude Code (#71700 Kitty, #77452 rendering), Qwen (#11500 React crash), OpenCode (#48882 layout backlash) | CLI as daily-driver IDE replacement, not a thin REPL |
| **Windows parity** | All seven report Windows-specific regressions (Claude #92958/#94344, Codex Windows session cluster, Pi #9361, Qwen #11935, Copilot #1148/#4549) | First-class Windows support remains unclaimed territory |
| **MCP maturity** | Copilot (CIMD OAuth cluster #4793/#4800/#4525), Claude (#85018 BigQuery OAuth), OpenCode (#49151 tool listing; #48743 cold-start races), Qwen (AppImage env leaks into stdio MCP children) | MCP as stable default integration surface |
| **Trustworthy termination signals** | Gemini (#22323/#21983 false `GOAL` on MAX_TURNS/crash), Qwen (#11924 goal-turn persistence), Codex (#41566 rollout corruption), Claude (#77339 hallucinated tool calls) | Agents must not report success on interrupted work |

## 4. Differentiation Analysis

| Tool | Feature Focus | Target User | Technical Approach |
|---|---|---|---|
| **Claude Code** | Enterprise workflow: background agents, scheduled tasks, remote sessions, Cowork desktop, cloud connectors (BigQuery, Docs) | Max/Team-plan professional developers | Stable-release TypeScript harness over first-party models; broadest integration surface, weakest on billing trust |
| **Codex** | Safety/review infrastructure (Guardian reviewer, AgentControl consolidation), desktop app, browser control (Chrome) | OpenAI-stack developers, autonomous-run use cases | Rust core, alpha-heavy cadence (4 tags/24h); healthiest Discussions culture (Fishbowl, CoCo) |
| **Gemini CLI** | Auto Memory subsystem, subagent reliability, AST-aware context economy, native bash affinity | Gemini/Google Cloud developers, enterprise | Nightly automation with disciplined P1/P2 triage; coordinated hardening (policy-dir security PRs #29333/#29336) |
| **Copilot CLI** | GitHub-native convergence: VS Code parity (#54 closed), Agent Factory, sandbox policy granularity | GitHub-first developers already in the Copilot ecosystem | Pre-release stabilization; quiet PR surface but closing year-old asks; OOM cluster is the key liability |
| **OpenCode** | Provider-agnostic multi-routing, Go-plan usage economics, UI flexibility | Power users who switch models and want cost control | Hotfix-driven stability (same-day fix for the v1.18.30 full-breakage regression); community-responsive (138 👍 request closed) |
| **Pi** | Adapter fidelity and cost-accounting precision; session-file correctness (mid-conversation system messages, `/forget`) | Architects/tinkerers building atop agents | Small but deep community (mitsuhiko as direct contributor); zero releases but steady PR throughput |
| **Qwen Code** | Broadest surface build-out: VS Code companion, Web Shell, Tauri desktop, mesh multi-agent, container isolation, CUA driver binaries | VS Code users, Alibaba/Qwen ecosystem, multi-host teams | ACP protocol investment; operator-gated container execution (#11711); fastest breadth expansion of the set |

## 5. Community Momentum & Maturity

- **Raw engagement leader: Claude Code** — #38335 (852 comments / 476 👍) is the largest single thread across all trackers, a consumer-scale billing dispute that signals a very large installed base; Codex follows with #25719 (397 👍), though open since June on a critical perf bug.
- **Fastest iteration: Codex and Qwen Code** — 4 alpha tags and 5 releases (incl. 3 signed/notarized CUA driver packages) respectively; Copilot shipped 3 pre-releases focused on coherent ergonomics.
- **Highest signal-per-capita: OpenCode and Pi** — OpenCode closed its most-upvoted request (#16017, 138 👍) and shipped a same-day hotfix, at the cost of a regression that broke every prompt for macOS users (velocity over QA). Pi's 10 tightly-scoped PRs show the deepest per-PR technical density of the set.
- **Maturity markers:** Claude Code and Copilot are closing year-old UX asks (#72962, #13) — responsive but slow-burn. Gemini's labeled P1/P2 burst around Auto Memory indicates planned, coordinated hardening. Copilot's 0-PR day plus issue closures suggests internal-branch development typical of enterprise-backed repos.
- **Momentum caution flags:** Codex's top bug aging since June; OpenCode's CPU regression (#30086, 53 comments) unfixed; Copilot's OOM class recurring across five issues.

## 6. Trend Signals

1. **Multi-agent orchestration is the 2026 architectural battleground.** Per-call child-agent config, container isolation (Qwen #11711), reviewer layers (Codex Guardian), mesh collaboration (Qwen #11206), and agent factories (Copilot) all landed this cycle. Developers building on these tools should expect — and demand — per-invocation model/effort APIs.
2. **Cost accounting has become a product feature, not a nicety.** The loudest threads everywhere are billing-related; provider convention divergence (net-vs-gross input tokens, 5m-vs-1h cache TTL rates) leaks into every client. Any tool displaying costs must treat billing fidelity as core correctness.
3. **Compaction is simultaneously a reliability and a security boundary.** Destructive auto-compaction (Pi #9482), injection via compaction summaries (OpenCode #36682), and OOM/compaction loops (Copilot) point to an emerging consensus pattern: conservative compaction plus manual rollback (`/forget`).
4. **Cross-provider routing carries an abstraction tax.** `thoughtSignature` (Gemini), `encrypted_content` (Muse Spark), `reasoning_content` (DeepSeek), and schema combinators (Anthropic) all break silently on translation. Teams multi-routing models should budget for adapter-fidelity engineering — this is Pi's entire value proposition.
5. **Windows parity is an open differentiator.** All seven communities report Windows-specific regressions; no tool currently treats Windows as a first-class platform.
6. **Session files are becoming public interfaces.** Rollout viewers (Codex Fishbowl), transcript contracts (Qwen #9387), and replayable session semantics (Pi #9548) mean durable, documented session schemas are becoming a competitive moat — poorly-consumable formats now generate visible community friction.

---
*Sources: 2026-09-15 community digests for anthropics/claude-code, openai/codex, google-gemini/gemini-cli, github/copilot-cli, anomalyco/opencode, earendil-works/pi, QwenLM/qwen-code.*

---

## Per-Tool Reports

<details>
<summary><strong>Claude Code</strong> — <a href="https://github.com/anthropics/claude-code">anthropics/claude-code</a></summary>

## Claude Code Skills Highlights

> Source: [anthropics/skills](https://github.com/anthropics/skills)

# Claude Code Skills Community Highlights Report
*Data window: through 2026-09-15 — anthropics/skills repository*

---

## 1. Top Skills Ranking (Most-Discussed PRs)

Since per-PR comment counts were not exposed in the dataset, ranking is based on recent activity (Updated timestamps), substantive technical depth, and alignment with actively-tracked bugs in the Issues stream. All listed PRs are currently **OPEN**.

### 1) skill-creator reliability fixes — [PR #1298](https://github.com/anthropics/skills/pull/1298) & [#1769](https://github.com/anthropics/skills/pull/1769)
**Functionality:** Meta-skill for authoring new Skills. The two PRs address concurrent trigger-evaluation races on Windows (subprocess `select()` failure) and a critical bug where `run_loop` reports `precision=100% recall=0%` for every skill, silently producing misleading optimisation output.
**Discussion highlight:** Directly closes the loop on [#556](https://github.com/anthropics/skills/issues/556) (12 comments, 7 👍) and [#1721](https://github.com/anthropics/skills/issues/1721) — the most-upvoted triggering bug in the repo.
**Status:** OPEN, last updated 2026-09-15.

### 2) mcp-builder MCP-2 compatibility — [PR #1742](https://github.com/anthropics/skills/pull/1742)
**Functionality:** Updates `connections.py` for the `mcp>=2.0.0` rename of `streamablehttp_client` → `streamable_http_client` and the new `create_mcp_http_client`/`http_client` header-injection pattern.
**Discussion highlight:** High-priority because downstream consumers cannot construct MCP connections on the current API surface; closes [#1668](https://github.com/anthropics/skills/issues/1668).
**Status:** OPEN, updated 2026-09-13.

### 3) md2video-audio Skill — [PR #1703](https://github.com/anthropics/skills/pull/1703)
**Functionality:** Zero-cost Markdown → MP4 pipeline (Marp slides → TTS voiceover → video assembly), positioned as a content-creation primitive.
**Discussion highlight:** Represents the newest *category* of submitted skills (media synthesis); activity recency 2026-09-15 signals active review.
**Status:** OPEN, updated 2026-09-15.

### 4) mcp-builder evaluation harness hardening — [PR #1602](https://github.com/anthropics/skills/pull/1602) & [#1724](https://github.com/anthropics/skills/pull/1724)
**Functionality:** #1602 fixes `TextContent` non-serialisation in MCP results and benchmark-metric bugs; #1724 bumps the default eval model to `claude-sonnet-5`.
**Discussion highlight:** Directly addresses [#1390](https://github.com/anthropics/skills/issues/1390) (MCP evals scoring 0/N against real servers).
**Status:** OPEN.

### 5) Hivemind multi-agent orchestration — [PR #1628](https://github.com/anthropics/skills/pull/1628)
**Functionality:** Lets Claude Code delegate mechanical subtasks to headless `opencode` workers on free models while preserving Claude as planner/reviewer/merger — a cost-routing pattern.
**Discussion highlight:** Reflects community interest in *cost-aware orchestration* primitives rather than new domain skills.
**Status:** OPEN, updated 2026-08-24.

### 6) document-typography — [PR #514](https://github.com/anthropics/skills/pull/514)
**Functionality:** Typographic QA for AI-generated documents (orphan/widow control, numbering alignment). Claimed to affect "every document Claude generates."
**Discussion highlight:** Persistent low-comment but high-intent PR — has survived since March without rejection.
**Status:** OPEN (long-pending).

### 7) ODT / OpenDocument Skill — [PR #486](https://github.com/anthropics/skills/pull/486)
**Functionality:** Create, fill, and parse OpenDocument Format files (`.odt`/`.ods`) including template workflows — closes a long-standing gap left by the DOCX/PPTX/XLSX suite.
**Discussion highlight:** Demand also evidenced by [#1175](https://github.com/anthropics/skills/issues/1175) (SharePoint/ODF enterprise interest).
**Status:** OPEN, updated 2026-04-14.

### 8) frontend-design clarity pass — [PR #210](https://github.com/anthropics/skills/pull/210)
**Functionality:** Rewrites the existing `frontend-design` skill so every instruction is executable within one conversation; reduces hallucination surface.
**Discussion highlight:** Aligns with the [#202](https://github.com/anthropics/skills/issues/202) "skill-creator best practice" direction (now closed).
**Status:** OPEN.

---

## 2. Community Demand Trends (from Issues)

| Rank | Theme | Evidence | Signal |
|---|---|---|---|
| 1 | **Trust / namespace integrity** | [#492](https://github.com/anthropics/skills/issues/492) — 43 comments, 2 👍 | Highest-engagement issue in the repo: community skills impersonating `anthropic/` namespace |
| 2 | **Enterprise distribution** | [#228](https://github.com/anthropics/skills/issues/228) — 16 comments, **8 👍** | Org-wide skill sharing (highest like-to-comment ratio) |
| 3 | **Skill-triggering reliability** | [#556](https://github.com/anthropics/skills/issues/556) — 12 comments, 7 👍 | `run_eval.py` shows 0% trigger rate; blocks all skill-authoring workflows |
| 4 | **Skill lifecycle / persistence** | [#62](https://github.com/anthropics/skills/issues/62) — 10 comments | Skills silently disappearing — data-loss class concern |
| 5 | **Compact agent memory** | [#1329](https://github.com/anthropics/skills/issues/1329) — 9 comments | Symbolic-notation skill for long-running agent state |
| 6 | **Plugin deduplication** | [#189](https://github.com/anthropics/skills/issues/189) — 6 comments, **9 👍** | `document-skills` ∩ `example-skills` collision |
| 7 | **Context-window budgeting** | [#1487](https://github.com/anthropics/skills/issues/1487) — 4 comments | `claude-api` skill injects ~156k tokens per tool call |
| 8 | **Agent governance / safety** | [#412](https://github.com/anthropics/skills/issues/412) — 6 comments (closed) | Policy enforcement, audit trails for agent systems |
| 9 | **Skills ↔ MCP interop** | [#16](https://github.com/anthropics/skills/issues/16) — 4 comments | Expose skills through MCP protocol |
| 10 | **Reasoning QA pipelines** | [#1385](https://github.com/anthropics/skills/issues/1385) — 4 comments, 1 👍 | Pre-task calibration → adversarial review → delivery gates |

**Macro trend:** Demand is shifting from "add more skills" → "make the skill substrate trustworthy, reliable, and governable." Three of the top four issues are *meta*-concerns about the skills system itself rather than requests for new domain skills.

---

## 3. High-Potential Pending Skills (likely to land soon)

PRs with fresh review activity, clear scope, and no conflicting issues:

| Skill | PR | Why it's close to merge |
|---|---|---|
| **md2video-audio** | [#1703](https://github.com/anthropics/skills/pull/1703) | Active review as of 2026-09-15; fills an uncontested media-synthesis niche |
| **pyxel (retro game dev)** | [#525](https://github.com/anthropics/skills/pull/525) | Updated 2026-09-13; well-scoped MCP-server-backed skill |
| **Buffer API Agent Skill** | [#1627](https://github.com/anthropics/skills/pull/1627) | Updated 2026-09-05; portable skill spec, useful for social-automation demos |
| **scnet-hpc** | [#1615](https://github.com/anthropics/skills/pull/1615) | Clean profile-based SSH/Slurm wrapper; clear operator audience |
| **skill-quality-analyzer & skill-security-analyzer** | [#83](https://github.com/anthropics/skills/pull/83) | Direct response to [#492](https://github.com/anthropics/skills/issues/492) trust concerns; high strategic value |
| **document-typography** | [#514](https://github.com/anthropics/skills/pull/514) | Long-pending but uncontested; addresses a universal pain point |

---

## 4. Skills Ecosystem Insight

**The community's most concentrated demand at the Skills level is the construction of a trustworthy, reliable substrate for invoking skills** — manifesting as three converging asks: namespace/identity integrity ([#492](https://github.com/anthropics/skills/issues/492)), triggering correctness ([#556](https://github.com/anthropics/skills/issues/556), [#1769](https://github.com/anthropics/skills/pull/1769)), and context-window discipline ([#1487](https://github.com/anthropics/skills/issues/1487)). In short: *before more skills, fix the trust layer that lets users safely adopt the skills they already have.*

---

# Claude Code Community Digest — 2026-09-15

## Today's Highlights

Today's release train shipped two small but useful updates: **v2.1.272** with general reliability fixes and **v2.1.271**, which activates fast mode for Claude Code Remote sessions (cloud + self-hosted runners) and adds mouse-wheel scrolling to the fullscreen `/config` panel. On the issue side, the long-running **#38335** "Max plan session limits exhausted abnormally fast" report continues to dominate the conversation with 852 comments and 476 thumbs-ups, while the most technical focus this week sits on Windows + macOS regressions in Cowork/Plan9 (#92958) and the `/release-notes` TUI rendering (#77452). Community signal continues to skew toward **per-call Agent control** (effort, advisor, model) and **transparent cost/limit UX**.

---

## Releases

- **[v2.1.272](https://github.com/anthropics/claude-code/releases/tag/v2.1.272)** — Bug fixes and reliability improvements.
- **[v2.1.271](https://github.com/anthropics/claude-code/releases/tag/v2.1.271)** —
  - **Fast mode in Claude Code Remote sessions** (cloud and self-hosted runners): the host's `fast` setting or `/fast` typed in-session now applies wherever the org allows it.
  - **Mouse support for `/config` in fullscreen mode**: wheel scrolls settings.

---

## Hot Issues

1. **[#38335 — Max plan session limits exhausted abnormally fast since March 23, 2026](https://github.com/anthropics/claude-code/issues/38335)** (OPEN · 852 comments · 👍 476) — By far the most engaged thread of the quarter. Multiple Max plan users report their weekly session allowance being consumed far faster than the published rate, with no reproducible CLI-side cause. Marks as `[invalid]` but the comment volume indicates Anthropic is engaging heavily.
2. **[#92958 — Cowork Windows: September 2026 cumulative update breaks Plan9 share attach](https://github.com/anthropics/claude-code/issues/92958)** (OPEN · 54 comments · 👍 11) — KB5124012 (ARM64) and KB5124008 (x64) regress `device_bash` on Cowork; author A/B-tested rollback across 5 machines. Important for any team standardizing on Windows Cowork + shared runners.
3. **[#77298 — Per-call `effort` parameter for the Agent (Task) tool](https://github.com/anthropics/claude-code/issues/77298)** (OPEN · 5 comments · 👍 14) — High upvote-to-comment ratio signals clear community consensus. Today, switching effort for a single subagent requires authoring a full agent definition file.
4. **[#73197 — Disable background agents' auto-commit / auto-push / auto-PR (v2.1.198)](https://github.com/anthropics/claude-code/issues/73197)** (CLOSED · 4 comments · 👍 5) — Concerns teams running propose-only workflows where background agents now side-effect git by default.
5. **[#92958/#93382 — Windows PowerShell ~154s startup + macOS worktreeDepSeed 680k-file clone freeze](https://github.com/anthropics/claude-code/issues/94344)** (OPEN · 3 comments) — Headline performance regressions on the desktop app for both OSes; worth tracking if you depend on Cowork/desktop.
6. **[#73305 — Keep Claude Fable 5 included in the Max plan](https://github.com/anthropics/claude-code/issues/73305)** (CLOSED · 10 comments · 👍 3) — After the July 1 redeployment Fable 5 moved to usage-credits-only; users are pushing back on the pricing model.
7. **[#77339 — Opus 4.8 hallucinating tool calls, user messages, and system prompts](https://github.com/anthropics/claude-code/issues/77339)** (CLOSED · 10 comments · 👍 3) — Model reliability report; raises questions about prompt-injection surfaces that surface as "user messages."
8. **[#72997 — Harness re-injects identical context blocks (task-list, tool-schema deltas, skill bodies)](https://github.com/anthropics/claude-code/issues/72997)** (CLOSED · 4 comments) — Concrete token-economy analysis (~1.2M tokens measured) showing change-detection gaps in the harness.
9. **[#79782 — Scheduled task execution ignores UI-configured permission mode and model](https://github.com/anthropics/claude-code/issues/79782)** (OPEN · 3 comments) — Reliability bug for anyone using the `scheduled-tasks` MCP server in production.
10. **[#85018 — BigQuery connector: `redirect_uri_mismatch` and pasted OAuth Client ID appears unused](https://github.com/anthropics/claude-code/issues/85018)** (OPEN · 3 comments) — Re-opened three times (#43959/#48957/#62271), with a full repro this round; signal that Google Cloud connectors need deeper integration work.

---

## Key PR Progress

> Only 3 PRs were active in the last 24h. All listed.

- **[#94184 — mods/diff: pinned header with body-only scroll](https://github.com/anthropics/claude-code/pull/94184)** (CLOSED) — Aligns the docked `mods/diff` pane with the built-in `/diff` panel: pinned header, base line, and 8-row file list; wheel scrolls hunks 3 rows/tick or files 1/tick when over the list. Adds ctrl/opt+↑↓ and ctrl+x b passthrough from the prompt through Butter. Improves keyboard parity for users who drive diffs from the CLI.
- **[#71627 — docs(sandbox): note that prompt-approved hosts are session-scoped](https://github.com/anthropics/claude-code/pull/71627)** (OPEN) — One-bullet clarification in `examples/settings/README.md` distinguishing prompt-time approval (lost on resume) from declarative sandbox config. Small but useful for anyone writing long-lived sessions that resume.
- **[#83890 — Create pylint.yml](https://github.com/anthropics/claude-code/pull/83890)** (CLOSED) — Repository hygiene: adds a pylint configuration file. Indicates the repo is being opened up to wider static-analysis coverage.

---

## Feature Request Trends

Distilled from the top issues and enhancements on the board:

1. **Per-call control over subagents** — effort (#77298, #73072), model (#72871), and advisor — without authoring separate agent definition files.
2. **Cost/limit transparency** — configurable weekly-limit warnings (#72994), preserving model inclusion in plan tiers (#73305), and clearer accounting in #38335.
3. **TUI / terminal compatibility parity** — Kitty protocol by capability not by allow-list (#71700), mouse-tracking teardown on suspend (#77752), `/release-notes` markdown rendering (#77452), project identity in the prompt (#73162), voice-mode resume (#73313).
4. **Safer background-agent defaults** — opt-out from auto-commit/push/PR (#73197); per-routine permission + model override (#72871, #79782).
5. **MCP capability gap closure** — Google Docs in-place edit (#83942), BigQuery OAuth fix (#85018), richer GitHub-integration scoping (#72856).
6. **Harness efficiency** — change-detection / deduplication for re-injected context blocks (#72997).
7. **Better hook surfaces** — `SessionStart` firing on `/branch` (#73053).
8. **Restored UX conveniences** — bring back the `/agents` wizard (#72962).

---

## Developer Pain Points

- **Cost unpredictability on Max** — #38335 (852 comments) is the single loudest signal that session-limit accounting does not match user expectations; surrounding threads (#72994, #73305) reinforce the gap.
- **Platform regressions on Windows + macOS desktop** — Plan9 attach break (#92958), 154 s PowerShell startup (#94344), 30 s whole-app freeze per worktree (#93382), intermittent macOS git hangs (#75781). Heavy desktop/Cowork users are absorbing multiple parallel regressions.
- **TUI quirks across terminal emulators** — Kitty, Alacritty, and Ctrl-Z suspend all surface separate bugs; developers working in non-default terminals hit unexpected fallbacks (#71700, #77752, #77452).
- **Background-agent side effects** — the July 1 default of auto-commit/auto-push/auto-PR caught teams by surprise (#73197); permissions and model selection on scheduled tasks are also partially broken (#79782, #72871).
- **Harness-level token inefficiency** — verified re-injection of identical context blocks (#72997) inflates cost and dilutes signal in long sessions.
- **Model reliability concerns** — Opus 4.8 hallucinating tool calls / system prompts (#77339) and the classifier false-positive on legitimate Jira DELETE (#89557) both reduce trust in autonomous modes.
- **MCP capability gaps vs. competing agents** — Google Docs has no edit tool (#83942), BigQuery OAuth is broken (#85018), and the GitHub integration over-reaches repo scope (#72856).
- **Knowledge gaps about own tooling** — Claude itself recommending the wrong CLI flag (`-c` vs `-r`) for resume (#72946) is a self-referential UX problem worth highlighting.

</details>

<details>
<summary><strong>OpenAI Codex</strong> — <a href="https://github.com/openai/codex">openai/codex</a></summary>

# OpenAI Codex Community Digest — 2026-09-15

## Today's Highlights
The Codex project pushed four Rust alpha builds of v0.155.0 in the last 24 hours, with PR work focused heavily on consolidating the **Guardian reviewer** and **AgentControl** architecture (5 related PRs merged). Community pain is dominated by a long-standing **macOS CPU/memory runaway** (#25719, 397 👍) and a fresh cluster of **Windows desktop session bugs** that affect Send-button, recent-chat list, and project-context sync.

## Releases
Four alpha tags of the Rust 0.155.0 line shipped in the last 24h. No detailed changelog was attached, but the cadence (six alpha tags in under a week) signals an active stabilization cycle:
- [`rust-v0.155.0-alpha.6`](https://github.com/openai/codex) — [Release 0.155.0-alpha.6](https://github.com/openai/codex)
- [`rust-v0.155.0-alpha.5`](https://github.com/openai/codex) — [Release 0.155.0-alpha.5](https://github.com/openai/codex)
- [`rust-v0.155.0-alpha.4`](https://github.com/openai/codex) — [Release 0.155.0-alpha.4](https://github.com/openai/codex)
- [`rust-v0.155.0-alpha.2.4`](https://github.com/openai/codex) — [Release 0.155.0-alpha.2.4](https://github.com/openai/codex)

## Hot Issues

1. **[#25719 — macOS `syspolicyd`/`trustd` CPU & memory runaway](https://github.com/openai/codex/issues/25719)** (90 comments, 397 👍). The single most upvoted open bug. Codex Desktop on macOS triggers runaway CPU and memory consumption in Apple's system daemons. Critical perf regression that has been open since June.
2. **[#42215 — Windows ChatGPT Work: project context sync fails](https://github.com/openai/codex/issues/42215)** (33 comments). Project-based local chat in the ChatGPT Windows app fails at the filesystem stage, blocking an entire work pattern for Windows users.
3. **[#41566 — Paginated rollout emits duplicate ordinal, freezes thread history](https://github.com/openai/codex/issues/41566)** (33 comments). After an unfinished turn, the rollout can re-emit an ordinal and permanently corrupt the session projection — a data-loss-adjacent session bug.
4. **[#39855 — Windows Remote: malformed path fails trust verification](https://github.com/openai/codex/issues/39855)** (19 comments, 12 👍). Every new projectless remote chat fails trust checks due to a malformed path; gates the entire remote workflow.
5. **[#13270 — `invalid_request_error: string too long` on tool calls](https://github.com/openai/codex/issues/13270)** (19 comments). Long tool-call arguments (1.5MB+) hit the 1MB server cap and surface as opaque errors. Affects any agent doing large context edits.
6. **[#17793 — TUI Backspace deletes multiple characters](https://github.com/openai/codex/issues/17793)** (19 comments, 5 👍). A persistent TUI composer bug in Kitty (and others) where Backspace removes more than one char, making prompt editing unreliable.
7. **[#40858 — Native subagent ignores explicit `model_provider` override](https://github.com/openai/codex/issues/40858)** (18 comments, 12 👍). When `--model` is set on a subagent, `model_provider` is silently dropped. Blocks custom-provider workflows for multi-agent runs.
8. **[#44135 — Windows Chrome control: `nodeRepl.fetch request failed`](https://github.com/openai/codex/issues/44135)** (16 comments). Browser control via the Chrome extension fails on Windows even though tab listing works in-app — Edge fallback also broken.
9. **[#45119 — macOS 14.2 sandbox startup fails: `unbound variable TIOCSTI`](https://github.com/openai/codex/issues/45119)** (14 comments). Sandbox init fails before any model call on macOS 14.2 due to an unbound shell variable in the Seatbelt script.
10. **[#34349 — Feature Request: completely disable Pets](https://github.com/openai/codex/issues/34349)** (13 comments, 54 👍). Strong demand for a hard kill-switch that also removes the sidebar entry. Top-voted UX complaint in the backlog.

Also noteworthy: [#205 .codexignore](https://github.com/openai/codex/issues/205) (55 👍) closed after long-standing pressure for a `.gitignore`-style filter, and a **trio of identical reports** ([#38199](https://github.com/openai/codex/issues/38199), [#45613](https://github.com/openai/codex/issues/45613), [#45638](https://github.com/openai/codex/issues/45638)) on **GPT-5.3-Codex-Spark being absent from the model selector despite visible quota**.

## Key PR Progress

1. **[#45677 — Move Guardian review reporting & denial accounting into the extension](https://github.com/openai/codex/pull/45677)**. `SynchronousReview` now owns assessment events, telemetry, denial accounting, and evidence-recording decisions — a cleaner separation between review policy and action prep.
2. **[#45672 — Consolidate Guardian reviewer lifecycle ownership](https://github.com/openai/codex/pull/45672)**. Cancellation guards tie reusable reviewers and temporary forks to their lifetimes; cancelled reviewers are replaced before reuse, shared via `ReviewerTasks`.
3. **[#45676 — Move spawned-agent interruption rules into `AgentControl`](https://github.com/openai/codex/pull/45676)**. Extracts V2 interruption validation/dispatch into `AgentControl::interrupt_spawned_agent` with typed errors.
4. **[#45670 — Move V2 agent message delivery into `AgentControl`](https://github.com/openai/codex/pull/45670)**. Centralizes target validation, runtime reloading, and delivery; plaintext/structured payloads get unified handling.
5. **[#45669 — Centralize child agent configuration in the agent module](https://github.com/openai/codex/pull/45669)**. New `agent::child_config` and `prepare_agent_spawn_config` route both multi-agent versions through shared helpers, preserving per-version model precedence.
6. **[#45602 — Fix retry classification for throttling & quota errors](https://github.com/openai/codex/pull/45602)**. `slow_down` is now a retryable rate limit; exhausted credits and spend limits no longer fall through to generic retryable stream errors. Useful context for users hitting [#38199](https://github.com/openai/codex/issues/38199) et al.
7. **[#45612 — Render standalone display math in the TUI](https://github.com/openai/codex/pull/45612)**. Display equations get spatial layout (not just inline Unicode) and remain mutable while delimiters are still streaming.
8. **[#45580 — Explicit daemon package replacement from the CLI](https://github.com/openai/codex/pull/45580)**. Adds `codex app-server daemon update --from-cli` for safe (and reversible) daemon package swaps, including downgrades and local builds.
9. **[#45559 — Resume Windows sandbox registration refresh after service restarts](https://github.com/openai/codex/pull/45559)**. Re-runs provisioning when a service restart interrupted the response after readiness was revoked — fixes a class of stale Windows sandbox state.
10. **[#45548 — Honor prepared Unix socket permissions in Seatbelt](https://github.com/openai/codex/pull/45548)**. `ManagedNetworkSandboxContext` now uses the prepared `allow_unix_sockets`/`dangerously_allow_*` instead of inheriting broader permissions from a live proxy.

## Hot Discussions

**Ideas**
- **[#13287 — Use Cases for Long-Horizon, Multi-Session Development Support](https://github.com/openai/codex/discussions/13287)** (12 comments). Companion to issue #13241; community is shaping a concrete proposal for persistent, multi-session agent workflows — the most substantive open conversation on the project's long-running direction.

**Show and tell**
- **[#45392 — Fishbowl: reading Codex rollout files](https://github.com/openai/codex/discussions/45392)** (1 comment). A local read-only viewer for `~/.codex/sessions/.../rollout-*.jsonl`; the author flags that the Codex rollout schema has been harder to consume than Claude Code's.
- **[#45659 — Quota Reset Watch](https://github.com/openai/codex/discussions/45659)** (0 comments). A source-linked history of public Codex reset announcements — directly relevant given the current Spark quota complaints.
- **[#45486 — UI Design Agent Kit](https://github.com/openai/codex/discussions/45486)** (0 comments). A project-level workflow that forbids agents from freestyling UIs: research → frozen plan → design contract → browser-verified implementation.
- **[#45474 — CoCo (Codex Coordinator)](https://github.com/openai/codex/discussions/45474)** (0 comments). A local CLI + MCP interface that runs **parallel Codex agents** across terminals and repositories with isolated Git worktrees and Codex conversations per workspace.

## Feature Request Trends

- **Privacy/exclusion controls** — `.codexignore` (closed, presumably shipped) signals demand for

</details>

<details>
<summary><strong>Gemini CLI</strong> — <a href="https://github.com/google-gemini/gemini-cli">google-gemini/gemini-cli</a></summary>

# Gemini CLI Community Digest — 2026-09-15

## Today's Highlights

The nightly train shipped **v0.61.0-nightly.20260915.g9c1b0a610**, but the real movement on the issue tracker is around **subagent reliability and the Auto Memory subsystem**. A cluster of `area/agent` P1 bugs — most notably the generalist agent hanging (#21409) and subagents silently reporting `GOAL` after hitting `MAX_TURNS` (#22323) — dominated conversation, while a coordinated set of `Auto Memory` issues (#26516, #26522, #26523, #26525) signal that the memory pipeline is being hardened in earnest. On the PR side, **L4XB** alone delivered five targeted fixes spanning input handling, sandbox expansion, credential logging, and SDK shell options.

## Releases

- **v0.61.0-nightly.20260915.g9c1b0a610** — automated nightly version bump; no published changelog beyond the comparison link: [compare commits](https://github.com/google-gemini/gemini-cli/compare/v0.61.0-nightly.20260914.g9c1b0a610...v0.61.0-nightly.20260915.g9c1b0a610).

## Hot Issues

1. **[#22323](https://github.com/google-gemini/gemini-cli/issues/22323) — Subagent recovery after MAX_TURNS reports false `GOAL` success** *(P1, 13 comments)*. The `codebase_investigator` finishes mid-analysis after hitting its turn cap but the wrapper still reports `Termination Reason: "GOAL"` — a dangerous false-positive that hides interrupted work from the user.
2. **[#19873](https://github.com/google-gemini/gemini-cli/issues/19873) — Zero-Dependency OS Sandboxing & Post-Execution Intent Routing** *(P2, 9 comments)*. A long-term design EPIC asking the CLI to lean into Gemini 3's native bash affinity (`grep`/`sed`/`awk` chaining) under a proper OS sandbox instead of heavy custom tool scaffolding.
3. **[#21409](https://github.com/google-gemini/gemini-cli/issues/21409) — Generalist agent hangs indefinitely** *(P1, 8 comments, 👍 8)*. Trivial folder creations stall the generalist agent until the user force-cancels; disabling subagent delegation is the only known workaround. Highest community thumbs-up on the list.
4. **[#22745](https://github.com/google-gemini/gemini-cli/issues/22745) — EPIC: AST-aware file reads, search, and codebase mapping** *(P2, 7 comments)*. Tracking whether AST-aware tools (think `tilth`/`glyph`) can shrink the ~36k-token-per-turn baseline by emitting precise method bounds instead of firehose reads.
5. **[#21968](https://github.com/google-gemini/gemini-cli/issues/21968) — Gemini rarely invokes custom skills or sub-agents** *(P2, 6 comments)*. Users report they have to *force* the model to use their `gradle`/`git` skill packs, suggesting description/discovery ergonomics still need work.
6. **[#26525](https://github.com/google-gemini/gemini-cli/issues/26525) — Deterministic redaction & reduced Auto Memory logging** *(P2, 5 comments)*. Secrets currently travel to the extraction model *before* redaction, and skill content can leak via logs — a meaningful hardening gap for the Auto Memory pipeline.
7. **[#25166](https://github.com/google-gemini/gemini-cli/issues/25166) — Shell command "Waiting input" after command completes** *(P1, 4 comments, 👍 3)*. After a simple shell command finishes, the CLI stays parked on "Awaiting user input" — a recurring UX papercut.
8. **[#21983](https://github.com/google-gemini/gemini-cli/issues/21983) — Browser subagent fails on Wayland** *(P1, 4 comments)*. The browser subagent aborts under Wayland with the same misleading `GOAL` termination reason as #22323 — likely a shared root cause.
9. **[#22232](https://github.com/google-gemini/gemini-cli/issues/22232) — `browser_agent` resilience: session takeover & lock recovery** *(P3, 4 comments)*. Currently fail-fasts on a locked persistent profile instead of taking over the session.
10. **[#24246](https://github.com/google-gemini/gemini-cli/issues/24246) — 400 error when more than ~400 tools are registered** *(P2, 3 comments)*. Tool catalogs over a certain size blow up the request; needs smarter in-scope tool selection.

## Key PR Progress

1. **[#29335](https://github.com/google-gemini/gemini-cli/pull/29335) — Preserve `AgentLoopContext` properties across object spread** *(P1, core)*. The `Config` class was exposing context via prototype getters, which `...spread` silently dropped. Fixes a class of "tools mysteriously receive `undefined` config" bugs.
2. **[#29328](https://github.com/google-gemini/gemini-cli/pull/29328) — Honour `LOG_LEVEL` and redact credentials from A2A server logs** *(P1, security)*. The allow-list already pulled `LOG_LEVEL` into `process.env`, but the logger hardcoded `level: 'info'`; this PR also scrubs credentials from log output.
3. **[#29333](https://github.com/google-gemini/gemini-cli/pull/29333) — Vet permissions on all convention-based policy directories** *(P2, enterprise)*. `filterSecurePolicyDirectories` only ran `isDirectorySecure` against the system policy dir; user/workspace policy dirs were trusted by default. Closes a real supply-chain gap.
4. **[#29336](https://github.com/google-gemini/gemini-cli/pull/29336) — Secure non-system policy directories against write permissions** *(P2, enterprise, large)*. Companion to #29333: enforces current-user ownership on default, user, and workspace policy dirs across POSIX and Windows. *(Closes #29311.)*
5. **[#29332](https://github.com/google-gemini/gemini-cli/pull/29332) — Bound sandbox expansion recursion** *(P2, core)*. A tool that always answers `sandbox_expansion_required` previously recursed into itself until OOM. Now bounded.
6. **[#29330](https://github.com/google-gemini/gemini-cli/pull/29330) — Don't lose typed input while the logger is answering** *(P2, cli)*. Fixes a React StrictMode purity violation where `setPastSessionMessages` was called inside the `setCurrentSessionMessages` updater.
7. **[#29329](https://github.com/google-gemini/gemini-cli/pull/29329) — Pause stdin after truncation, and report when stdin is abandoned** *(P2, cli)*. Stops calling `process.stdin.destroy()` (which is irreversible), and surfaces a clear message when input is dropped.
8. **[#29327](https://github.com/google-gemini/gemini-cli/pull/29327) — Honour `AgentShellOptions.env` and `timeoutSeconds` in `SdkAgentShell.exec`** *(P2, agent/sdk)*. Both fields were parsed but never applied — `exec('sleep 30', { timeoutSeconds: 1 })` waited 30s.
9. **[#29304](https://github.com/google-gemini/gemini-cli/pull/29304) — Don't split UTF-16 surrogate pairs when truncating** *(core, small)*. Emojis on the truncation boundary were silently dropped; now the pair is preserved.
10. **[#29242](https://github.com/google-gemini/gemini-cli/pull/29242) — Stop substring-matching `'401'` in `isAuthenticationError`** *(P2, core)*. A port number `4012` or any error containing the digits `401` could trigger a spurious re-auth flow. Replaced with status-code-aware matching.

> Honorable mention: **[#29326](https://github.com/google-gemini/gemini-cli/pull/29326)** restores a missing `for` loop in the `unassign-inactive-assignees` workflow — a quiet but real fix to maintainer automation.

## Feature Request Trends

- **Agent self-awareness & discoverability.** Multiple issues (#21968, #21432) push for Gemini to *find and use* its own skills, sub-agents, flags, and hotkeys without explicit prompting.
- **Tactful, surgical context loading.** The AST-aware EPIC (#22745), the `Tactful Extraction` proposal (#19561), and the persistent task tracker (#18836, #21000) all share one goal: shrink the ~36k-token-per-turn baseline through precise reads and externalized state instead of in-context bloat.
- **Hardened Auto Memory pipeline.** A near-simultaneous burst (#26516, #26522, #26523, #26525) calls for deterministic secret redaction, bounded retries on low-signal sessions, and visibility into malformed inbox patches.
- **Safer shell / filesystem execution.** Destructive-command prevention (#22672), zero-dep OS sandboxing (#19873), and tighter tool-count scoping (#24246) are converging on a more disciplined execution model.
- **Browser agent maturity.** Resilience fixes (#22232, #22267), Wayland support (#21983), and trajectory sharing (#22598) point to the browser subagent graduating from prototype.

## Developer Pain Points

- **Misleading termination signals.** Subagents reporting `GOAL` after `MAX_TURNS` (#22323) or after crashing on Wayland (#21983) erode trust in the agent loop — users can't tell when work actually finished.
- **Hang conditions on simple operations.** The generalist-agent stall (#21409) and post-command "Waiting input" freeze (#25166) make the CLI feel unreliable even on trivial tasks.
- **Skill and sub-agent underutilization.** Despite an extensible skills/sub-agent system, the model frequently ignores them (#21968) unless nudged, undercutting the value of community-authored extensions.
- **Memory pipeline trust issues.** Auto Memory currently redacts *after* secrets hit model context and logs skill content in the clear (#26525), creating security review friction for enterprise users.
- **Tool catalog ceiling.** Hitting a 400 at ~400 tools (#24246) punishes power users who assemble large MCP/tool surfaces and forces manual scope curation.
- **CLI ergonomics quirks.** Symlinked agents being invisible (#20079), symlink/file-tool ergonomics, and inputs silently lost during truncation (#29330) all surface the friction between "power-user filesystem reality" and the CLI's expectations.

</details>

<details>
<summary><strong>GitHub Copilot CLI</strong> — <a href="https://github.com/github/copilot-cli">github/copilot-cli</a></summary>

# GitHub Copilot CLI Community Digest — 2026-09-15

## Today's Highlights

The 1.0.84 release wave landed with three pre-releases focused on developer ergonomics: a concise transcript view that groups tool activity into collapsible summaries, pause/resume for Agent Factory runs, and a new `/config` sidebar plus network host allow/deny rules for `/sandbox`. Meanwhile, the issue tracker is dominated by a cluster of long-running session stability bugs (multiple OOM-on-resume reports across Windows/Linux/macOS, compaction loops, stale session locks) and a surge of MCP/OAuth authentication failures — particularly around CIMD redirect URI handling and Azure registry validation. A long-standing community request for a vi/vim input mode (Issue #13, 76 👍) was finally closed after nearly a year.

## Releases

**v1.0.84-8** ([release](https://github.com/github/copilot-cli/releases/tag/v1.0.84-8))
- *Added:* `transcriptView: "concise"` collapses tool activity into expandable work summaries.
- *Improved:* `/factories` dialog supports pause/resume for Agent Factory runs.
- *Fixed:* Model lists refresh correctly after sign-in, account switch, and sign-out.

**v1.0.84-7** ([release](https://github.com/github/copilot-cli/releases/tag/v1.0.84-7))
- *Fixed:* Claude models classified as adaptive-only now stay adaptive; reasoning effort is capped at *high* when thinking is disabled instead of failing.
- *Fixed:* `sessionEnd` hooks now fire when `/clear` closes an active session.

**v1.0.84-6** ([release](https://github.com/github/copilot-cli/releases/tag/v1.0.84-6))
- *Added:* `/config` opens an in-CLI sidebar configuration screen.
- *Added:* `/sandbox` network host allow/deny rules that preserve existing upstream proxy config.
- *Improved:* Managed Edit/Write rules now apply to native shell redirections and supported in-place `sed` patterns.

## Hot Issues

1. **[#13] Add vi/vim input mode** — ([closed](https://github.com/github/copilot-cli/issues/13)) Long-running, highly upvoted feature request (76 👍, 13 comments) from modal-editor users. Closing this after ~12 months signals the team has prioritized keyboard-driven navigation in the interactive REPL.

2. **[#54] Integrate with VS Code Copilot Chat setup and capabilities** — ([closed](https://github.com/github/copilot-cli/issues/54)) Asked for the CLI to act as a batch/CLI interface to an existing VS Code Copilot Chat configuration. Closing suggests parity work is underway across the two surfaces.

3. **[#4664] CLI crashes with JavaScript heap OOM when resuming a long session** — ([open](https://github.com/github/copilot-cli/issues/4664)) V8 hits ~4 GB before the user can interact. Pairs with #4251, #4699, #4725, and #4780 — this is now a recurring class of bug, not an edge case.

4. **[#4725] Frequent JavaScript heap OOM on Linux** — ([open](https://github.com/github/copilot-cli/issues/4725)) Crash every few minutes with V8 allocation failures at ~4 GB. Affects unattended/automation workflows where reliability matters most.

5. **[#1148] CLI converts LF to CRLF on Windows** — ([open](https://github.com/github/copilot-cli/issues/1148), 8 👍) Edit/Write tools normalize line endings against the user's intent, breaking cross-platform repos and `git diff` hygiene.

6. **[#4525] MCP server receives legacy `initialize` after modern `server/discover`** — ([closed](https://github.com/github/copilot-cli/issues/4525)) 1.0.81-1 sent a duplicate legacy probe and tripped `-32022` errors against Python MCP SDK 2.0.0 servers. Closure indicates protocol negotiation was cleaned up.

7. **[#4251] Resume OOM regression in 1.0.74 vs 1.0.73** — ([open](https://github.com/github/copilot-cli/issues/4251)) A controlled A/B pinpoints the regression and reports ~3–4× memory growth. Useful as a bisect anchor for the OOM cluster.

8. **[#4699] OOM crash dumps dumped into the user's cwd** — ([open](https://github.com/github/copilot-cli/issues/4699)) Beyond the crash itself, Node diagnostics land in arbitrary working directories and pollute repositories — a second-order bug worth flagging.

9. **[#4849] Reduce latency in subagent workflows** — ([open](https://github.com/github/copilot-cli/issues/4849)) Calls out multi-minute startup and round-trip overhead in agent → review → fix loops. Direct ask for an architectural perf pass on the subagent runtime.

10. **[#4549] PowerShell console window flashes on every shell command (Windows)** — ([open](https://github.com/github/copilot-cli/issues/4549)) `conhost` is spawned visible (not hidden) per tool call, causing constant focus stealing during normal agent work.

*(Runners-up worth watching: [#4556](https://github.com/github/copilot-cli/issues/4556) silent plugin-marketplace auth bail, [#4639](https://github.com/github/copilot-cli/issues/4639) event-storage 500-event retry storm, [#4780](https://github.com/github/copilot-cli/issues/4780) compaction loop that permanently kills sessions, [#4793](https://github.com/github/copilot-cli/issues/4793) / [#4800](https://github.com/github/copilot-cli/issues/4800) CIMD OAuth redirect-port mismatch, [#4847](https://github.com/github/copilot-cli/issues/4847) managed-settings refresh breaks IDE MCP reload.)*

## Key PR Progress

No pull requests were updated in the last 24 hours, so this section is intentionally omitted.

## Feature Request Trends

Several themes recur across the recent issue wave:

- **Editor-quality interaction.** Vim input mode (#13), better plan-mode rendering (#4841), terminal-theme-aware colors (#4843), and less intrusive shell execution on Windows (#4549) point to a push toward treating the CLI as a daily-driver IDE replacement rather than a thin REPL.
- **Sandbox policy granularity.** New `/sandbox` host rules (1.0.84-6), `python` policy bypass (#4846), and a dedicated enterprise scope for `--yolo` (#4783) show the team fleshing out a richer, more composable security model.
- **Subagent ergonomics.** Lower latency (#4849), bounded subagent lifetimes (#4850), and better visibility into running review agents are a coherent stream — the multi-agent story is becoming a first-class workflow.
- **Setup portability.** #54 (reuse VS Code Copilot config) and #4845 (session lifecycle across machines) both ask for the CLI to feel like the same product as the editor experience.

## Developer Pain Points

- **Long-session reliability is the #1 friction.** OOMs on resume (#4664, #4725, #4251, #4699), compaction loops that brick sessions (#4780, #4506), watchdog force-compacting at 23% context (#4506), and stale `inuse.<pid>.lock` files (#4805) all hit the same user: someone running a multi-day session in their editor.
- **MCP/OAuth integration is fragile.** #4525 (closed), #4556, #4793, #4800, #4604, #4842, and #4851 collectively paint a picture of MCP auth edge cases (CIMD redirect URIs, GitHub token injection, concurrent 401 refresh, Azure registry validation) that are blocking real integrations.
- **Cross-platform correctness.** Windows CRLF corruption (#1148), Windows PowerShell flashing (#4549), and macOS Warp theme mismatch (#4843) keep cropping up — the CLI is still uneven across host platforms.
- **Managed-policy edge cases.** `--yolo` getting swallowed by pre-auth fail-closed posture (#4844), managed-settings refresh breaking `/allow-all` and IDE MCP reload (#4847), and the OAuth CIMD port mismatch (#4793, #4800) suggest the interaction between local flags, server policy, and refresh timing needs hardening.
- **UX clarity gaps.** #4848 ("Save feedback bundle" misread as submitting feedback) and #4841 (blank plan panel for custom agents) are small but erode trust in mature flows.

</details>

<details>
<summary><strong>OpenCode</strong> — <a href="https://github.com/anomalyco/opencode">anomalyco/opencode</a></summary>

# OpenCode Community Digest — 2026-09-15

## Today's Highlights

**v1.18.31 ships as a hotfix for the v1.18.30 regression** that broke every prompt with `TypeError: undefined is not an object (evaluating 'a.name')` on macOS and several Linux setups (#48645, #48811, #49158). The release restores ACP session boundaries lost in 1.18.30 and surfaces remote-config auth errors during startup. Meanwhile, a long-standing CPU regression (#30086) and the community's backlash against the new sidebar layout (#48882) remain top of mind for users.

## Releases

### v1.18.31 — Hotfix
- **Core:** Restored ACP session model, effort, mode, and reasoning chunk boundaries when loading/resuming/forking sessions (@JacobNWolf).
- **TUI:** Remote config authentication errors now surface during startup and exit with a failure status instead of failing silently.
- **Extensions:** Improvements (truncated in source).

→ [v1.18.31](https://github.com/anomalyco/opencode/releases/tag/v1.18.31)

---

## Hot Issues

**#30086 — High CPU usage in newer versions** *(53 comments, 29 👍)*
Users report OpenCode scaled from 10+ concurrent sessions to struggling with 3 after recent updates, with severe mouse-cursor lag. This is the most-discussed open performance regression in the project and directly impacts power users running parallel agent workflows.
→ [Issue #30086](https://github.com/anomalyco/opencode/issues/30086)

**#6651 — Dynamic model selection for subagents via Task tool** *(41 comments, 80 👍)*
Primary agents invoking the Task tool cannot pick which model subagents use. With 80 thumbs-up, this is the most-upvoted feature request and signals strong demand for cost/quality control over nested agent execution.
→ [Issue #6651](https://github.com/anomalyco/opencode/issues/6651)

**#16017 — Go plan usage/balance API endpoint** *(CLOSED, 35 comments, 138 👍)*
The most-upvoted issue in this digest. Go subscribers want rolling/weekly/monthly usage exposed programmatically so they can build external dashboards and budget alerts. Closure suggests this work has been picked up elsewhere.
→ [Issue #16017](https://github.com/anomalyco/opencode/issues/16017)

**#48741 — Zen critical errors on Muse Spark family with images/tool calls** *(27 comments, 6 👍)*
`reasoning encrypted_content was not issued to this caller` breaks Muse Spark on Zen whenever an image is processed or a tool call fires. Flagged as a 2.0 blocker; PR #48908 below directly closes it.
→ [Issue #48741](https://github.com/anomalyco/opencode/issues/48741)

**#39845 — DeepSeek V4 Flash suddenly requires "Enable models hosted in China"** *(23 comments, 27 👍)*
Mid-session failures forcing users to opt into China-hosted models are seen as a breaking behavior change without notice, and are blocking production workflows.
→ [Issue #39845](https://github.com/anomalyco/opencode/issues/39845)

**#48882 — Restore the legacy UI with persistent left sidebar** *(18 comments, 23 👍)*
Strong negative reaction to PR #20242's sidebar redesign: users want a config option to revert to the classic two-panel layout. Pairs with #38230 below for the Desktop toggle.
→ [Issue #48882](https://github.com/anomalyco/opencode/issues/48882)

**#48811 — macOS: every prompt fails with `undefined is not an object (evaluating 'a.name')`** *(9 comments, 36 👍)*
High-engagement macOS-only crash report pointing at `SystemPrompt.environment`. Confirmed to be a v1.18.30 regression resolved by v1.18.31.
→ [Issue #48811](https://github.com/anomalyco/opencode/issues/48811)

**#48645 — Regression in 1.18.30: every prompt crashes in SystemPrompt.environment** *(7 comments, 12 👍)*
The canonical regression ticket that v1.18.31 fixes. 1.18.18 confirmed working; 1.18.30 confirmed broken on first prompt with no tool calls.
→ [Issue #48645](https://github.com/anomalyco/opencode/issues/48645)

**#36682 — SECURITY: Compaction summary injects actionable instructions** *(4 comments)*
Auto-compaction summaries can contain "Next Move" plans the model then executes without consent — a prompt-injection vector if external content enters a session. Security-relevant and worth tracking even at low comment count.
→ [Issue #36682](https://github.com/anomalyco/opencode/issues/36682)

**#29094 — Reading chat history during LLM responses re-snaps the viewport** *(10 comments, 3 👍)*
Reopened after auto-close: scrolling up to read history mid-stream is impossible because the viewport snaps to the bottom on every token. UX regression for power users.
→ [Issue #29094](https://github.com/anomalyco/opencode/issues/29094)

---

## Key PR Progress

**#47510 — fix(core): compact superseded durable event snapshots**
Targets the unbounded growth of the `event` table by GC'ing superseded snapshots. Closes #47223 and consolidates several duplicate tickets (#47512, #47513, #33356, #46833, #47022). Important for long-lived sessions.
→ [PR #47510](https://github.com/anomalyco/opencode/pull/47510)

**#48908 — fix(session): recover from stale encrypted reasoning on provider rejection**
Directly closes #48741 — when resuming Responses-API model sessions, stale `encrypted_content` from a prior run causes rejections; PR clears or refreshes it instead of erroring out.
→ [PR #48908](https://github.com/anomalyco/opencode/pull/48908)

**#49145 — fix(build): allow --baseline to build only baseline target on macOS**
Fixes SIGILL crashes on non-AVX Intel Macs (Westmere, Xeon X5690) where the bundled bun-darwin-x64 uses AVX2. The `--baseline` flag now correctly produces a single compatible binary.
→ [PR #49145](https://github.com/anomalyco/opencode/pull/49145)

**#49155 — fix(app): ignore IME composition keys in question dock custom input**
Fixes #49154: Japanese/Chinese IME users could not confirm kana-kanji conversion in the Desktop question dock because Enter/Escape always committed/dismissed. Important accessibility/i18n fix.
→ [PR #49155](https://github.com/anomalyco/opencode/pull/49155)

**#49106 — fix(client): preserve inbox events during snapshot reads**
A delayed HTTP response was overwriting newer inbox events on reconnect, causing answered questions to appear pending again. Resolves ordering/race issues between server snapshots and client refetch.
→ [PR #49106](https://github.com/anomalyco/opencode/pull/49106)

**#49151 — feat(mcp): list tools exposed by MCP servers**
New CLI surface `opencode mcp tools` (and `... tools <name>` for descriptions). Closes #41499 and makes MCP introspection first-class — useful for debugging tool-heavy setups.
→ [PR #49151](https://github.com/anomalyco/opencode/pull/49151)

**#47999 — fix(tui): keep saved tabs separate by server**
Prevents a remote TUI from inheriting or overwriting a local user's saved tabs/selections when connecting to a server.
→ [PR #47999](https://github.com/anomalyco/opencode/pull/47999)

**#49061 — fix(session): retry an empty completion regardless of finish reason**
Builds on #40531 by also retrying `finish: "stop"` cases, not only `"unknown"`. Reduces flaky "Failed to send prompt" failures from providers that return empty completions with a normal stop reason.
→ [PR #49061](https://github.com/anomalyco/opencode/pull/49061)

**#49071 — fix(ai): use allowlist for openai prompt cache key**
Stops `packages/ai` from unconditionally lowering `promptCacheKey` to `prompt_cache_key`, which broke providers that don't accept that alias. Closes #45113.
→ [PR #49071](https://github.com/anomalyco/opencode/pull/49071)

**#38308 — feat(app): optional vertical tab rail**
Adds an opt-in vertical tab layout under Settings › General, resizable and collapsible. Horizontal tabs remain default. Closes #36942.
→ [PR #38308](https://github.com/anomalyco/opencode/pull/38308)

---

## Feature Request Trends

1. **Cost & usage visibility for Go plan** — Surface subscription usage/balance in TUI (#42776), via API (#16017, 138 👍), and as budget guards. The single most-requested capability area across the digest.
2. **Subagent / multi-agent control** — Dynamic model selection per Task invocation (#6651, 80 👍), agent-factory plugins (#49161), and richer Plan UI parity (#49135) point to a clear push toward first-class multi-agent orchestration.
3. **UI restoration & layout flexibility** — Legacy persistent sidebar (#48882), permanent Old/New UI toggle (#38230), optional vertical tab rail (#38308), unified Thinking/Patch indicator (#44164), and auto-collapsed response rows (#49088) all show users want more control over information density.
4. **Provider reach & onboarding** — New providers xKiro (#49157), QVAC (#35119), and Persian localization (#47783) indicate continued ecosystem expansion.
5. **MCP tooling maturity** — Tool listing CLI (#49151), warm-up/pre-spawn (#48743), and silent OAuth/RFC 8707 fixes (#46316) signal MCP is becoming a stable, primary integration surface rather than experimental.

---

## Developer Pain Points

- **v1.18.30 regression cascade** — A single `SystemPrompt.environment` TypeError broke every prompt for macOS and several Linux users (#48645, #48811, #49158). v1.18.31 ships as the immediate fix, but the incident highlights the cost of silent breakage in prompt pipelines.
- **Performance regressions are silent** — #30086 (CPU spike) has 53 comments and no clear fix yet, with users unable to run the workloads that worked a week ago.
- **Provider integration fragility** — A consistent stream of provider-side errors: Muse Spark `encrypted_content` (#48741), DeepSeek V4 Flash China hosting (#39845), Kimi K3 upstream failures (#37815), Mistral tool-call schema mismatches (#49139), Bedrock image field support (#48069), and LiteLLM proxy text-part loss (#25487).
- **Forced UI changes** — The new sidebar design drove #48882 and #38230; users want opt-out toggles rather than mandatory redesigns.
- **Compaction as a security boundary** — #36682 surfaces that compaction summaries are trusted as user input by the model, creating an injection vector when sessions contain untrusted content.
- **Session UX issues** — Mid-stream viewport snapping (#29094), jumps to latest message in CLI (#38692), and unanswered/pending inbox questions on reconnect (#49106) all degrade interactive agent workflows.
- **macOS build compatibility** — AVX2-incompatible binaries crash on older Intel Macs (#49145, #49150); Linux pacman users hit the prompt regression first.
- **MCP cold-start races** — Users running 14+ stdio MCPs see all marked `failed` at session start (#48743), forcing manual restarts.

---

*Digest generated from anomalyco/opencode activity for 2026-09-15. Items sorted by community engagement and maintainer relevance.*

</details>

<details>
<summary><strong>Pi</strong> — <a href="https://github.com/earendil-works/pi">earendil-works/pi</a></summary>

# Pi Community Digest — 2026-09-15

## Today's Highlights
Today's activity is dominated by **provider-consistency and cost-accounting bugs** across Bedrock, Anthropic-via-gateway, and Gemini-via-OpenAI surfaces, alongside a high-quality batch of small, focused PRs (schema fixes, `/forget`, new providers). The most concerning item is #9482: an empty-body 400 from an OpenAI-compatible gateway is being misclassified as context overflow and triggering **destructive auto-compaction that can delete ~400k tokens** of conversation history.

## Releases
*No new releases in the last 24 hours.*

## Hot Issues

1. **[#7010](https://github.com/earendil-works/pi/issues/7010) — Normalize optional object tool schemas for OpenAI-compatible providers** (8 comments)
   `@earendil-works/pi-ai@0.81.1` forwards raw `required` arrays into OpenAI-compatible chat-completions adapters, breaking tool calls when schemas are written in JSON-Schema-draft style. A foundational fix that affects every provider reusing `openai-completions`.

2. **[#8752](https://github.com/earendil-works/pi/issues/8752) — bedrock-converse: `usage.input` not normalized; false cache-miss notices, doubled input cost** (6 comments, 👍 5)
   Anthropic reports input *net of cache*, OpenAI-family reports *gross*. The Bedrock adapter copies `inputTokens` verbatim, producing inflated cost reporting and spurious cache-miss warnings. High community traction — wrong billing is a top motivator.

3. **[#9361](https://github.com/earendil-works/pi/issues/9361) — Windows: `settings.shellPath` non-deterministically ignored when extensions are loaded** (5 comments)
   Loading any extension silently bypasses a user's configured `shellPath` and falls through to `PATH`, which on Windows often lands on WSL's `bash.exe`. Non-deterministic + security-relevant (the wrong shell can read the wrong `~/.bashrc`).

4. **[#9306](https://github.com/earendil-works/pi/issues/9306) — Aborted/error turn leaves unmatched `toolCall` blocks; next `runAgentLoopContinue` rejected** (5 comments)
   After `stopReason: "error" | "aborted"`, streamed-but-unmatched tool calls stay in context and the next continuation call gets a provider-level rejection. Breaks resume-after-crash flows.

5. **[#9210](https://github.com/earendil-works/pi/issues/9210) — Vercel AI Gateway + Anthropic: `cacheWrite1h` never set; 1h writes billed at 5m rate** (5 comments)
   With `PI_CACHE_RETENTION=long`, the gateway honors 1h TTL but pi always records `cacheWrite1h: 0`, so `calculateCost` bills 1h writes at 1.25× instead of 2×. Same family as #8752 / #9457 — a pattern of cache-TTL accounting bugs.

6. **[#9391](https://github.com/earendil-works/pi/issues/9391) — After compaction, stale signed thinking blocks replay every turn** (4 comments, 👍 1)
   Anthropic drops the same 15 signed thinking blocks every request with `prefix_binding_mismatch`, producing noisy logs and presumably wasting tokens. Compaction is supposed to clean these up but doesn't.

7. **[#9444](https://github.com/earendil-works/pi/issues/9444) — `openai-completions` drops Gemini `thoughtSignature` on streamed `tool_calls`** (3 comments)
   A Gemini model behind an OpenAI-compatible gateway fails on the second turn with HTTP 400 because the thought signature is never persisted. Multi-turn tool use breaks — a regression for any user routing Gemini through an aggregator.

8. **[#9134](https://github.com/earendil-works/pi/issues/9134) — Anthropic adapter silently drops root `anyOf` from custom tool schemas** (3 comments) — *fixed by #9619*
   The model receives only `type` + `properties`, so runtime validation rejects calls the model made "correctly." Already resolved at the PR level — useful precedent for the schema-normalization cluster.

9. **[#9457](https://github.com/earendil-works/pi/issues/9457) — bedrock-converse: 1h cache writes bill at 5m rate** (3 comments, 👍 4)
   `bedrock-converse-stream` never maps `cacheDetails` to `cacheWrite1h`. Same cost-bug family as #9210; explicitly demonstrates the pricing discrepancy with a reproduction table.

10. **[#9482](https://github.com/earendil-works/pi/issues/9482) — Empty-body 400 misclassified as context overflow → destructive auto-compaction** (1 comment, severity: high)
    A transient HTTP 400 with empty body from `opencode-go/deepseek-v4-flash` is treated as overflow, skipping retry and auto-compacting up to ~400k tokens. The author flags it as "directly degrades pi's quality of work" — a data-loss class bug, not cosmetic.

## Key PR Progress

1. **[#9619](https://github.com/earendil-works/pi/pull/9619) — `fix(ai)`: keep root schema combinators visible to Anthropic** (closed)
   Stops the non-strict `anthropic-messages.ts` conversion from dropping `anyOf` / `oneOf` / `allOf` at tool-schema roots. Closes #9134. Anthropic returns 400 on these, so emitting them was masking valid combinations from the model.

2. **[#9615](https://github.com/earendil-works/pi/pull/9615) — `feat(coding-agent)`: `/forget` command for context rollback** (closed)
   A new slash command that removes the last N user turns from the model context, optionally from the session file too, with soft-vs-hard modes. Directly addresses long-session context pressure.

3. **[#9548](https://github.com/earendil-works/pi/pull/9548) — Mid-conversation system messages** (open, mitsuhiko)
   Makes system-prompt text and tool changes part of the transcript rather than silently rewriting the starting conditions. Enables proper replay on resume/branch and preserves cached prompt prefixes — a meaningful correctness improvement.

4. **[#8635](https://github.com/earendil-works/pi/pull/8635) — `fix(ai)`: preserve aborted stop reason during lazy setup** (open)
   Threads the request abort signal through lazy stream setup and reports setup failures as aborted when the signal is already fired. Adds a regression test for abort-during-tool-execution-before-next-auth-setup.

5. **[#9434](https://github.com/earendil-works/pi/pull/9434) — `feat(coding-agent)`: extensions can append to the session system prompt** (open)
   `session_start` handlers can return `systemPromptAppend` contributions that are folded into the base prompt across startup, session resume, and branches. Closes #9432 and rounds out the extension-API surface.

6. **[#9607](https://github.com/earendil-works/pi/pull/9607) — `fix(coding-agent)`: apply provider hooks to summarization streams** (closed)
   Direct compaction/branch-summary calls were bypassing `onPayload`, so `before_provider_request` extensions didn't run. Restores parity with normal agent turns.

7. **[#9605](https://github.com/earendil-works/pi/pull/9605) — `feat(ai)`: GMI Cloud provider** (closed)
   Adds `https://api.gmi-serving.com/v1` as a built-in OpenAI-Chat-Completions aggregator fronting many upstream vendors. Reuses `openai-completions`; no new transport code needed.

8. **[#9594](https://github.com/earendil-works/pi/pull/9594) — `feat(ai)`: Gemini-only Antigravity provider** (closed)
   Restores subscription-backed Gemini access via a first-class OAuth provider in `@earendil-works/pi-ai`, ported from the mariozechner/pi monorepo's earlier implementation.

9. **[#8732](https://github.com/earendil-works/pi/pull/8732) — `fix(ai)`: preserve `reasoning_content` on cross-model replay into DeepSeek-family endpoints** (closed)
   DeepSeek-family thinking endpoints reject requests when an assistant message that originally carried reasoning is replayed without it. Restores the field so cross-model branching into DeepSeek works again.

10. **[#8474](https://github.com/earendil-works/pi/pull/8474) — `feat(coding-agent)`: bundle Node runtime** (closed, mitsuhiko)
    Reduces the file count loaded at startup of `pi-coding-agent`, explicitly targeting Windows Defender / slow-IO startup pain. Aligns with the Windows shell-path complaints in #9361 — the Windows experience is getting coordinated attention.

## Feature Request Trends

- **Cache-cost fidelity.** Multiple issues (#8752, #9210, #9457) ask for one thing: bill what providers actually charge. A unified `cacheWrite1h` mapping across Bedrock / Vercel gateway / direct Anthropic is the most-requested accounting fix.
- **Schema round-tripping for tools.** #7010, #9134, #9444 all want tool schemas to survive provider translation losslessly (root combinators, `thoughtSignature`, `required` normalization).
- **Extension API depth.** #8791 (model runtime on `ExtensionContext`), #9434 (system-prompt append), #4807 (usage listener / `agentDir` context / working timer) show a clear demand for richer extension surfaces — observability, prompt control, and runtime access.
- **Session / compaction ergonomics.** #9051 (overflow retry), #9482 (auto-compaction data loss), #9476 (premature re-compaction), #9391 (stale signed thinking), and the `/forget` PR all cluster around "give me safer, more predictable context management."
- **Concurrency safety.** #9596 (two `pi -c` runs interleaving into one file) and #9610 (clipping on short terminals) are about robustness under real working conditions, not feature breadth.

## Developer Pain Points

- **Provider billing inconsistency is now the #1 frustration.** Bedrock's 5m-vs-1h cache write and Anthropic's net-vs-gross input token conventions produce visibly wrong costs. Users are losing trust in the usage display.
- **Multi-turn tool use breaks across model migrations.** `thoughtSignature` (Gemini) and `reasoning_content` (DeepSeek) are dropped on stream/replay, so switching providers mid-session silently corrupts subsequent turns.
- **Windows remains second-class.** Non-deterministic shell resolution (#9361), startup latency with antivirus (#8474), TUI rendering on short terminals (#9610) — Windows users are reporting more pain than macOS/Linux users combined.
- **Compaction is doing the wrong thing too often.** It's either destroying conversation (#9482), firing prematurely (#9476), leaving stale signed blocks (#9391), or skipping the immediate overflow retry (#9051). Users want conservative, predictable compaction with a way out (`/forget`).
- **Provider catalog drift.** #9616 (zai-coding-cn still lists 8 defunct GLM models) and the rush to add GMI / Antigravity highlight how manual model curation is becoming unsustainable as providers rotate lineups faster than the catalog can keep up.

</details>

<details>
<summary><strong>Qwen Code</strong> — <a href="https://github.com/QwenLM/qwen-code">QwenLM/qwen-code</a></summary>

# Qwen Code Community Digest — 2026-09-15

## Today's Highlights

Today's release of **v0.23.4** includes a notable breaking change that removes configurable message-prefix filtering from channels, streamlining how eligible messages flow through sender/group/mention/pairing policies. The community is actively tracking **P1 TUI stability** issues—particularly silent React error #185 crashes during background agent completion and ACP daemon permission-queue contention—while a flurry of Web Shell, VS Code companion, and subagent-containerization PRs signal a strong push toward robust multi-agent workflows.

## Releases

- **v0.23.4** — Removes configurable message-prefix filtering on channels; eligible messages now follow normal sender, group, mention, and pairing policies without a prefix override. ([#11571](https://github.com/QwenLM/qwen-code))
- **v0.23.4-nightly.20260914.f024b37689** — Includes test refinement for Windows inode gating (`#11853`) and a `fix(cua)` patch.
- **cua-driver-rs v0.20.9 / v0.20.8 / v0.20.7** — Qwen CUA Driver prebuilt binaries (vendored under `packages/cua-driver`); macOS universal binaries are codesigned + notarized, Linux builds are unsigned (glibc 2.31 floor), Windows delivers unsigned UIAccess workers + native SDK payload for x86_64 and arm64.

## Hot Issues

1. **[#11500](https://github.com/QwenLM/qwen-code/issues/11500) — TUI exits silently on React #185 (P1, 15 comments)**  
   Multiple background subagent completions trigger Ink `useBoxMetrics` layout-listener `setState` loops, crashing the TUI with "Maximum update depth exceeded." On resume, the CLI reports the prior session appears invalid. Critical because it affects every user running parallel background agents.
2. **[#2382](https://github.com/QwenLM/qwen-code/issues/2382) — VS Code Companion extension not working (closed, 9 comments)**  
   Regression from v0.12.2 → v0.12.3 breaks "Preparing Qwen Code…" indefinitely; rolling back the host VS Code does not resolve it.
3. **[#11556](https://github.com/QwenLM/qwen-code/issues/11556) — Remote-SSH webview stuck loading on 0.23.1 (P1, 7 comments)**  
   Companion extension's webview fails to load when VS Code client (1.133.0 linux-x64) connects to a 1.137.0 linux-arm64 server. Blocks SSH workflows on Apple Silicon / aarch64 remotes.
4. **[#11574](https://github.com/QwenLM/qwen-code/issues/11574) — Extension update hides all prior session history (P2, 7 comments)**  
   History dialog hardcodes `sourceType: "vscode"` filter; transcripts written before 0.23.x lack this metadata, so every legacy session disappears from the dialog after upgrade.
5. **[#11514](https://github.com/QwenLM/qwen-code/issues/11514) — Companion UI caps thinking effort at "Extra High" (P3, 5 comments)**  
   Backend supports Max thinking effort but the UI dropdown does not expose it.
6. **[#11887](https://github.com/QwenLM/qwen-code/issues/11887) — `--acp` ignores approval modes (P2, 5 comments)**  
   Restrictive modes still auto-execute file writes and shell commands without emitting `session/request_permission`, breaking ACP safety guarantees.
7. **[#9387](https://github.com/QwenLM/qwen-code/issues/9387) — Prevalidate shared chat transcript contract (P3, 5 comments)**  
   Request for a repeatable contract-prevalidation stage across Web/Qwen Server, Tauri Desktop, VS Code, and HTML Export hosts.
8. **[#9911](https://github.com/QwenLM/qwen-code/issues/9911) — Restore VS Code message edit/rewind (P2, 5 comments)**  
   WebShell cutover (#9811) deliberately omits legacy per-message edit/rewind; request is to reintroduce it via daemon snapshot APIs.
9. **[#11795](https://github.com/QwenLM/qwen-code/issues/11795) — Permission queue keyed on ACP connection (P1, 5 comments)**  
   One idle session's unanswered prompt blocks every other session on the daemon indefinitely and silently. Fix #3 (serialization scope) is in flight via [#11802](https://github.com/QwenLM/qwen-code/pull/11802).
10. **[#11936](https://github.com/QwenLM/qwen-code/issues/11936) — `USE_OPENAI_RESPONSES` leaks `${session_id}` literal & missing User-Agent (P2, 4 comments)**  
    `customHeaders` placeholders are not expanded on the Responses wire; identical bug-class as [#11947](https://github.com/QwenLM/qwen-code/pull/11947) PR below.

## Key PR Progress

1. **[#11947](https://github.com/QwenLM/qwen-code/pull/11947) — `fix(core): expand ${session_id} and stamp User-Agent on Responses wire**  
   Resolves placeholder expansion under the `allowDynamicHeaderValues` consent gate, adds a first-party `session_id` header for allowlisted gateways, and stamps `QwenCode/<version> (<platform>)` User-Agent.
2. **[#11946](https://github.com/QwenLM/qwen-code/pull/11946) — `refactor(vscode): remove unused token limit mirror**  
   Drops dead VS Code token-limit mirror; extension now relies on server-provided limits with a shared-core fallback.
3. **[#11206](https://github.com/QwenLM/qwen-code/pull/11206) — `feat(mesh): persistent shared-thread agent collaboration**  
   Workspace agent identities that collaborate on shared threads: assign work, address multiple agents, interject mid-run, inspect attributed results, cancel, resolve blockers, mark reviewed.
4. **[#11765](https://github.com/QwenLM/qwen-code/pull/11765) — `fix(core): read a backslash inside single quotes as literal when splitting**  
   Corrects shell-segment splitting so permission rules match real bash semantics (backslash inside `'…'` is literal, not an escape).
5. **[#11794](https://github.com/QwenLM/qwen-code/pull/11794) — `fix(cli): honor output language in stateless generation**  
   Stateless/workspace text generation now applies the user's output-language rule as a system instruction that overrides interface fallback language.
6. **[#11924](https://github.com/QwenLM/qwen-code/pull/11924) — `fix(core): persist Goal turn endings outside model history**  
   Structured end records enable recovery to recognize completed Goal turns and retry only later unanswered inputs, without polluting model messages.
7. **[#11940](https://github.com/QwenLM/qwen-code/pull/11940) — `feat(serve): reclaim idle ACP children when admission is full**  
   On-demand reclaim of idle ACP children so new connections can be admitted without forcing graceful termination of active sessions.
8. **[#11684](https://github.com/QwenLM/qwen-code/pull/11684) — `fix(core): keep reasoning and function_call items adjacent through Responses cleanup**  
   Treats a replayed reasoning item plus its immediately-following parallel tool group as a single unit during history rewriting, preventing orphan function-call drops.
9. **[#11711](https://github.com/QwenLM/qwen-code/pull/11711) — `feat(core): add container execution for subagents**  
   Operator-only `QWEN_AGENT_EXECUTION_BACKEND=docker|podman` requires containers for ordinary child dispatches; project env files and settings cannot override this gate.
10. **[#11904](https://github.com/QwenLM/qwen-code/pull/11904) — `feat(cli): reload hook registry when /hooks opens**  
    Re-reads user/workspace settings on dialog open, threads resolved hook fields into `Config` via `setHooksFromSettings`, and calls `HookSystem.reload()` so live hook edits actually show up.

## Feature Request Trends

- **ACP/daemon reliability & observability** — Approval-mode enforcement, permission-queue scoping, idle-child reclaim, machine-readable turn results, and survival of short observation disconnects ([#11887](https://github.com/QwenLM/qwen-code/issues/11887), [#11795](https://github.com/QwenLM/qwen-code/issues/11795), [#11940](https://github.com/QwenLM/qwen-code/pull/11940), [#11944](https://github.com/QwenLM/qwen-code/issues/11944)).
- **VS Code companion maturity** — Session-history migration for pre-0.23.x transcripts, Max thinking effort in the picker, restored per-message edit/rewind, stable transcript block identity, and ACP permission-slot concurrency fixes ([#11574](https://github.com/QwenLM/qwen-code/issues/11574), [#11514](https://github.com/QwenLM/qwen-code/issues/11514), [#9911](https://github.com/QwenLM/qwen-code/issues/9911), [#9726](https://github.com/QwenLM/qwen-code/issues/9726), [#11899](https://github.com/QwenLM/qwen-code/issues/11899)).
- **Multi-agent / mesh collaboration** — Persistent workspace agent identities, shared threads, container-isolated subagent execution, dimension-aware `/review` worktree pinning ([#11206](https://github.com/QwenLM/qwen-code/pull/11206), [#11711](https://github.com/QwenLM/qwen-code/pull/11711), [#11895](https://github.com/QwenLM/qwen-code/issues/11895)).
- **Web Shell as a first-class host** — Remote daemon connection, workspace git-remote management, Goal-turn recovery, shared transcript contract ([#11548](https://github.com/QwenLM/qwen-code/pull/11548), [#11163](https://github.com/QwenLM/qwen-code/pull/11163), [#11914](https://github.com/QwenLM/qwen-code/issues/11914), [#9387](https://github.com/QwenLM/qwen-code/issues/9387)).
- **Cross-platform packaging polish** — Windows Terminal DECSET 2026 support, PowerShell 7 auto-update coexistence, bigint-safe NTFS file identity, ICU preflight ([#11929](https://github.com/QwenLM/qwen-code/issues/11929), [#11935](https://github.com/QwenLM/qwen-code/issues/11935), [#11875](https://github.com/QwenLM/qwen-code/pull/11875), [#11753](https://github.com/QwenLM/qwen-code/pull/11753)).

## Developer Pain Points

- **Silent TUI crashes** during background-agent fan-out force users to lose interactive sessions with no rendered error; React error #185 keeps recurring even after guards land ([#11500](https://github.com/QwenLM/qwen-code/issues/11500), [#11858](https://github.com/QwenLM/qwen-code/issues/11858)).
- **VS Code extension is the integration bottleneck** — Remote-SSH failures, regression on minor bumps, hidden history, broken permission slots, and ARM64 host/server mismatches stack up ([#11556](https://github.com/QwenLM/qwen-code/issues/11556), [#2382](https://github.com/QwenLM/qwen-code/issues/2382), [#11574](https://github.com/QwenLM/qwen-code/issues/11574), [#11899](https://github.com/QwenLM/qwen-code/issues/11899)).
- **ACP safety guarantees are leaky** — Restrictive approval modes silently bypass prompts, oversized `available_commands_update` notifications tear down channels (`MAX_JSON_NODES`), and permission prompts block whole-daemon traffic ([#11887](https://github.com/QwenLM/qwen-code/issues/11887), [#11908](https://github.com/QwenLM/qwen-code/issues/11908), [#11795](https://github.com/QwenLM/qwen-code/issues/11795)).
- **Stateless/CLI generation ignores user settings** — Output-language rule, `${session_id}` placeholder expansion, and User-Agent stamping are all missing on certain wire formats, breaking OpenAI-compatible gateways and minimax-style endpoints ([#11794](https://github.com/QwenLM/qwen-code/pull/11794), [#11936](https://github.com/QwenLM/qwen-code/issues/11936), [#11905](https://github.com/QwenLM/qwen-code/issues/11905)).
- **Platform-specific footguns** — Windows Terminal streaming flicker, PowerShell 7 auto-update deadlocks, ICU-less Node runtime, and AppImage `PYTHONHOME`/`PYTHONPATH` leaking into stdio MCP children all surface repeatedly ([#11929](https://github.com/QwenLM/qwen-code/issues/11929), [#11935](https://github.com/QwenLM/qwen-code/issues/11935), [#11753](https://github.com/QwenLM/qwen-code/pull/11753), [#11789](https://github.com/QwenLM/qwen-code/pull/11789)).
- **Tool/prompt identity drift** — `tokenLimits` resolves DeepSeek V4's 1M/384k window incorrectly, `/review` agents ignore PR worktrees, and parameterless built-in tools get rejected with error 2013 — all symptoms of brittle string-matching identity layers ([#11894](https://github.com/QwenLM/qwen-code/issues/11894), [#11895](https://github.com/QwenLM/qwen-code/issues/11895), [#11905](https://github.com/QwenLM/qwen-code/issues/11905)).

</details>

---
*This digest is auto-generated by [agents-radar](https://github.com/sikm-lqs/agents-radar).*